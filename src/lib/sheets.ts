"use server"

import { google } from "googleapis"
import { config } from "./config"
import { convertGoogleDriveUrl } from "./utils"

export interface Resource {
  id: string
  thumbnailUrl: string
  title: string
  description: string
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
      console.error("Raw JSON string:", config.googleSheets.serviceAccountJson?.substring(0, 100))
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
export async function getAllResources(): Promise<Resource[]> {
  try {
    const sheets = getGoogleSheetsClient()
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: config.googleSheets.spreadsheetId,
      range: `${config.googleSheets.resourcesSheet}!A2:F`, // Skip header row
    })

    const rows = response.data.values || []

    return rows.map((row) => ({
      thumbnailUrl: convertGoogleDriveUrl(row[0] || ""),
      title: row[1] || "",
      description: row[2] || "",
      codeUrl: row[3] || "",
      youtubeUrl: row[4] || "",
      id: row[5] || "",
    }))
  } catch (error) {
    console.error("Error fetching resources from Google Sheets:", error)
    return []
  }
}

// Fetch a single resource by ID
export async function getResourceById(id: string): Promise<Resource | null> {
  try {
    const resources = await getAllResources()
    return resources.find((resource) => resource.id === id) || null
  } catch (error) {
    console.error("Error fetching resource by ID:", error)
    return null
  }
}

// Save lead to Google Sheets
export async function saveLead(data: {
  name: string
  email: string
  resourceId: string
  resourceTitle: string
}): Promise<boolean> {
  try {
    const sheets = getGoogleSheetsClient()

    // Check if Leads sheet exists, if not create it
    await ensureLeadsSheetExists(sheets)

    const timestamp = new Date().toISOString()

    await sheets.spreadsheets.values.append({
      spreadsheetId: config.googleSheets.spreadsheetId,
      range: `${config.googleSheets.leadsSheet}!A:E`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[timestamp, data.name, data.email, data.resourceId, data.resourceTitle]],
      },
    })

    return true
  } catch (error) {
    console.error("Error saving lead to Google Sheets:", error)
    return false
  }
}

// Ensure Leads sheet exists
async function ensureLeadsSheetExists(sheets: ReturnType<typeof google.sheets>) {
  try {
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: config.googleSheets.spreadsheetId,
    })

    const sheetExists = spreadsheet.data.sheets?.some(
      (sheet) => sheet.properties?.title === config.googleSheets.leadsSheet
    )

    if (!sheetExists) {
      // Create Leads sheet with headers
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: config.googleSheets.spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: config.googleSheets.leadsSheet,
                },
              },
            },
          ],
        },
      })

      // Add headers
      await sheets.spreadsheets.values.update({
        spreadsheetId: config.googleSheets.spreadsheetId,
        range: `${config.googleSheets.leadsSheet}!A1:E1`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [["Timestamp", "Name", "Email", "Resource ID", "Resource Title"]],
        },
      })
    }
  } catch (error) {
    console.error("Error ensuring Leads sheet exists:", error)
  }
}
