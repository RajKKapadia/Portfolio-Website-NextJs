export const config = {
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY || "",
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

export function validateConfig() {
  const missingEnvVars: string[] = []

  if (!config.youtube.apiKey) {
    missingEnvVars.push("YOUTUBE_API_KEY")
  }

  if (!config.telegram.botToken) {
    missingEnvVars.push("TELEGRAM_BOT_TOKEN")
  }

  if (!config.telegram.chatId) {
    missingEnvVars.push("CHAT_ID")
  }

  if (!config.googleSheets.spreadsheetId) {
    missingEnvVars.push("GOOGLE_SHEET_ID")
  }

  if (!config.googleSheets.serviceAccountJson) {
    missingEnvVars.push("GCP_SERVICE_ACCOUNT_JSON")
  }

  return {
    isValid: missingEnvVars.length === 0,
    missingEnvVars
  }
}
