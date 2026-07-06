"use server"

import { randomBytes } from "node:crypto"
import { google } from "googleapis"
import { cache } from "react"
import { config, validateGoogleSheetsConfig } from "./config"
import { MARKETING_CONSENT_SOURCE, MARKETING_CONSENT_VERSION } from "./marketing"
import { convertGoogleDriveUrl } from "./utils"

const LEAD_HEADERS = [
  "Timestamp",
  "Name",
  "Email",
  "Resource ID",
  "Resource Title",
  "Marketing Consent",
  "Consent Timestamp",
  "Consent Source",
  "Consent Text Version",
]
const SUBSCRIBER_HEADERS = [
  "Email",
  "Name",
  "Status",
  "Subscribed At",
  "Unsubscribed At",
  "Consent Source",
  "Consent Text Version",
  "Updated At",
  "Unsubscribe Token",
  "Unsubscribe URL",
]

export interface Resource {
  id: string
  thumbnailUrl: string
  title: string
  codeUrl: string
  youtubeUrl: string
}

// Initialize Google Sheets API client
function getGoogleSheetsClient() {
  try {
    let credentials

    // Try to parse the credentials JSON
    try {
      credentials = JSON.parse(config.googleSheets.serviceAccountJson)
    } catch (parseError) {
      console.error("Failed to parse service account JSON:", parseError)
      throw new Error("Invalid service account JSON format")
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    return google.sheets({ version: "v4", auth })
  } catch (error) {
    console.error("Error initializing Google Sheets client:", error)
    throw error
  }
}

// Fetch all resources from Google Sheet
export const getAllResources = cache(async (): Promise<Resource[]> => {
  try {
    const { isValid, missingEnvVars } = validateGoogleSheetsConfig()

    if (!isValid) {
      throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`)
    }

    const sheets = getGoogleSheetsClient()
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: config.googleSheets.spreadsheetId,
      range: `${config.googleSheets.resourcesSheet}!A2:F`, // Skip header row
    })

    const rows = response.data.values || []

    return rows
      .map((row) => {
        const [thumbnailUrl = "", title = "", codeUrl = "", youtubeUrl = "", id = ""] = row

        return {
          thumbnailUrl: convertGoogleDriveUrl(String(thumbnailUrl)),
          title: String(title),
          codeUrl: String(codeUrl),
          youtubeUrl: String(youtubeUrl),
          id: String(id),
        }
      })
      .filter((resource) => resource.id)
      .reverse()
  } catch (error) {
    console.error("Error fetching resources from Google Sheets:", error)
    return []
  }
})

// Fetch a single resource by ID
export const getResourceById = cache(async (id: string): Promise<Resource | null> => {
  try {
    const resources = await getAllResources()
    return resources.find((resource) => resource.id === id) || null
  } catch (error) {
    console.error("Error fetching resource by ID:", error)
    return null
  }
})

// Save lead to Google Sheets
export async function saveLead(data: {
  name: string
  email: string
  resourceId: string
  resourceTitle: string
  marketingConsent: boolean
}): Promise<boolean> {
  try {
    const { isValid, missingEnvVars } = validateGoogleSheetsConfig()

    if (!isValid) {
      throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`)
    }

    const sheets = getGoogleSheetsClient()

    const timestamp = new Date().toISOString()
    const normalizedEmail = normalizeEmail(data.email)

    await ensureMarketingSheets(sheets)

    await sheets.spreadsheets.values.append({
      spreadsheetId: config.googleSheets.spreadsheetId,
      range: `${config.googleSheets.leadsSheet}!A:I`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[
          timestamp,
          data.name,
          normalizedEmail,
          data.resourceId,
          data.resourceTitle,
          data.marketingConsent,
          data.marketingConsent ? timestamp : "",
          MARKETING_CONSENT_SOURCE,
          MARKETING_CONSENT_VERSION,
        ]],
      },
    })

    if (data.marketingConsent) {
      await upsertSubscriber(sheets, {
        email: normalizedEmail,
        name: data.name,
        timestamp,
      })
    }

    return true
  } catch (error) {
    console.error("Error saving lead to Google Sheets:", error)
    return false
  }
}

export async function getSubscriberByToken(token: string): Promise<{
  maskedEmail: string
  status: "subscribed" | "unsubscribed"
} | null> {
  if (!isValidUnsubscribeToken(token)) {
    return null
  }

  try {
    validateSheetsConfiguration()
    const sheets = getGoogleSheetsClient()
    const subscriber = await findSubscriberByToken(sheets, token)

    if (!subscriber) {
      return null
    }

    return {
      maskedEmail: maskEmail(subscriber.email),
      status: subscriber.status,
    }
  } catch (error) {
    console.error("Error finding subscriber by token:", error)
    return null
  }
}

export async function unsubscribeByToken(token: string): Promise<{
  maskedEmail: string
  status: "unsubscribed"
} | null> {
  if (!isValidUnsubscribeToken(token)) {
    return null
  }

  validateSheetsConfiguration()
  const sheets = getGoogleSheetsClient()
  const subscriber = await findSubscriberByToken(sheets, token)

  if (!subscriber) {
    return null
  }

  if (subscriber.status !== "unsubscribed") {
    const timestamp = new Date().toISOString()
    const updatedRow = [...subscriber.row]

    while (updatedRow.length < SUBSCRIBER_HEADERS.length) {
      updatedRow.push("")
    }

    updatedRow[2] = "unsubscribed"
    updatedRow[4] = timestamp
    updatedRow[7] = timestamp

    await sheets.spreadsheets.values.update({
      spreadsheetId: config.googleSheets.spreadsheetId,
      range: `${config.googleSheets.subscribersSheet}!A${subscriber.rowNumber}:J${subscriber.rowNumber}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [updatedRow],
      },
    })
  }

  return {
    maskedEmail: maskEmail(subscriber.email),
    status: "unsubscribed",
  }
}

async function upsertSubscriber(
  sheets: ReturnType<typeof google.sheets>,
  data: { email: string; name: string; timestamp: string }
) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: config.googleSheets.spreadsheetId,
    range: `${config.googleSheets.subscribersSheet}!A2:J`,
  })
  const rows = response.data.values || []
  const existingIndex = rows.findIndex((row) => normalizeEmail(String(row[0] || "")) === data.email)
  const existingRow = existingIndex >= 0 ? rows[existingIndex] : null
  const token = String(existingRow?.[8] || "") || createUnsubscribeToken()
  const unsubscribeUrl = `${config.siteUrl}/unsubscribe?token=${encodeURIComponent(token)}`
  const values = [[
    data.email,
    data.name,
    "subscribed",
    data.timestamp,
    "",
    MARKETING_CONSENT_SOURCE,
    MARKETING_CONSENT_VERSION,
    data.timestamp,
    token,
    unsubscribeUrl,
  ]]

  if (existingIndex >= 0) {
    const rowNumber = existingIndex + 2
    await sheets.spreadsheets.values.update({
      spreadsheetId: config.googleSheets.spreadsheetId,
      range: `${config.googleSheets.subscribersSheet}!A${rowNumber}:J${rowNumber}`,
      valueInputOption: "RAW",
      requestBody: { values },
    })
    return
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: config.googleSheets.spreadsheetId,
    range: `${config.googleSheets.subscribersSheet}!A:J`,
    valueInputOption: "RAW",
    requestBody: { values },
  })
}

async function findSubscriberByToken(
  sheets: ReturnType<typeof google.sheets>,
  token: string
): Promise<{
  email: string
  status: "subscribed" | "unsubscribed"
  row: string[]
  rowNumber: number
} | null> {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: config.googleSheets.spreadsheetId,
    range: `${config.googleSheets.subscribersSheet}!A2:J`,
  })
  const rows = response.data.values || []
  const index = rows.findIndex((row) => String(row[8] || "") === token)

  if (index < 0) {
    return null
  }

  const row = rows[index].map((value) => String(value ?? ""))
  const status = row[2] === "unsubscribed" ? "unsubscribed" : "subscribed"

  return {
    email: normalizeEmail(row[0]),
    status,
    row,
    rowNumber: index + 2,
  }
}

async function ensureMarketingSheets(sheets: ReturnType<typeof google.sheets>) {
  const sheetDefinitions = [
    { title: config.googleSheets.leadsSheet, headers: LEAD_HEADERS },
    { title: config.googleSheets.subscribersSheet, headers: SUBSCRIBER_HEADERS },
  ]
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: config.googleSheets.spreadsheetId,
  })
  const existingTitles = new Set(
    spreadsheet.data.sheets
      ?.map((sheet) => sheet.properties?.title)
      .filter((title): title is string => Boolean(title)) || []
  )
  const missingSheets = sheetDefinitions.filter(({ title }) => !existingTitles.has(title))

  if (missingSheets.length > 0) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: config.googleSheets.spreadsheetId,
      requestBody: {
        requests: missingSheets.map(({ title }) => ({
          addSheet: {
            properties: {
              title,
            },
          },
        })),
      },
    })
  }

  await Promise.all(
    sheetDefinitions.map(({ title, headers }) =>
      sheets.spreadsheets.values.update({
        spreadsheetId: config.googleSheets.spreadsheetId,
        range: `${title}!A1:${getColumnLetter(headers.length)}1`,
        valueInputOption: "RAW",
        requestBody: {
          values: [headers],
        },
      })
    )
  )
}

function validateSheetsConfiguration() {
  const { isValid, missingEnvVars } = validateGoogleSheetsConfig()

  if (!isValid) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`)
  }
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function createUnsubscribeToken() {
  return randomBytes(32).toString("hex")
}

function isValidUnsubscribeToken(token: string) {
  return /^[a-f0-9]{64}$/.test(token)
}

function maskEmail(email: string) {
  const [localPart, domain] = email.split("@")

  if (!localPart || !domain) {
    return "your email address"
  }

  const visiblePrefix = localPart.slice(0, Math.min(2, localPart.length))
  const hiddenLength = Math.max(3, Math.min(8, localPart.length - visiblePrefix.length))

  return `${visiblePrefix}${"*".repeat(hiddenLength)}@${domain}`
}

function getColumnLetter(columnNumber: number) {
  let number = columnNumber
  let result = ""

  while (number > 0) {
    const remainder = (number - 1) % 26
    result = String.fromCharCode(65 + remainder) + result
    number = Math.floor((number - 1) / 26)
  }

  return result
}
