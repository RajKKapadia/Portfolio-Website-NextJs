export const config = {
  youtube: {
    apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || "",
    channelId: "UCOT01XvBSj12xQsANtTeAcQ",
    maxResults: 10
  },
  telegram: {
    botToken: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "",
    chatId: process.env.NEXT_PUBLIC_CHAT_ID || ""
  }
} as const

export function validateConfig() {
  const missingEnvVars: string[] = []

  if (!config.youtube.apiKey) {
    missingEnvVars.push("NEXT_PUBLIC_YOUTUBE_API_KEY")
  }

  if (!config.youtube.apiKey) {
    missingEnvVars.push("NEXT_PUBLIC_TELEGRAM_BOT_TOKEN")
  }

  if (!config.youtube.apiKey) {
    missingEnvVars.push("CHAT_ID")
  }

  return {
    isValid: missingEnvVars.length === 0,
    missingEnvVars
  }
}
