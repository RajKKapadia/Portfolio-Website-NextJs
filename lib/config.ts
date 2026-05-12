export const config = {
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY || "",
    apiReferer:
      process.env.YOUTUBE_API_REFERER ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
      "http://localhost:3000",
    channelId: "UCOT01XvBSj12xQsANtTeAcQ",
    maxResults: 10
  },
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || "",
    chatId: process.env.CHAT_ID || ""
  },
  googleSheets: {
    spreadsheetId: process.env.GOOGLE_SHEET_ID || "",
    serviceAccountJson: process.env.GCP_SERVICE_ACCOUNT_JSON || "",
    resourcesSheet: "Code Data",
    leadsSheet: "Leads"
  }
} as const

function createValidationResult(missingEnvVars: string[]) {
  return {
    isValid: missingEnvVars.length === 0,
    missingEnvVars,
  }
}

export function validateYouTubeConfig() {
  const missingEnvVars: string[] = []

  if (!config.youtube.apiKey) {
    missingEnvVars.push("YOUTUBE_API_KEY")
  }

  return createValidationResult(missingEnvVars)
}

export function validateTelegramConfig() {
  const missingEnvVars: string[] = []

  if (!config.telegram.botToken) {
    missingEnvVars.push("TELEGRAM_BOT_TOKEN")
  }

  if (!config.telegram.chatId) {
    missingEnvVars.push("CHAT_ID")
  }

  return createValidationResult(missingEnvVars)
}

export function validateGoogleSheetsConfig() {
  const missingEnvVars: string[] = []

  if (!config.googleSheets.spreadsheetId) {
    missingEnvVars.push("GOOGLE_SHEET_ID")
  }

  if (!config.googleSheets.serviceAccountJson) {
    missingEnvVars.push("GCP_SERVICE_ACCOUNT_JSON")
  }

  return createValidationResult(missingEnvVars)
}
