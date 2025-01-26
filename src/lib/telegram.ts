"use server"

import { validateConfig, config } from "./config"

interface TelegramResponse {
    ok: boolean
    result?: {
        message_id: number
        chat: {
            id: number
            type: string
        }
        date: number
        text: string
    }
    description?: string
}

export const sendTelegramMessage = async (message: string): Promise<{ status: boolean, message: string }> => {
    const { isValid, missingEnvVars } = validateConfig()
    if (!isValid) {
        console.error("Missing Telegram API key.")
        console.log(missingEnvVars)
        return {
            status: false,
            message: "We are facing an issue sending the message."
        }
    }
    const apiUrl = `https://api.telegram.org/bot${config.telegram.botToken}/sendMessage`
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: config.telegram.chatId,
                text: message,
                parse_mode: "Markdown"
            }),
        })
        const result: TelegramResponse = (await response.json()) as TelegramResponse
        if (!response.ok || !result.ok) {
            return {
                status: false,
                message: "We are facing an issue sending the message."
            }
        }
        if (!response.ok) {
            return {
                status: false,
                message: "We are facing an issue sending the message."
            }
        }
        return {
            status: true,
            message: "Message sent successfully."
        }
    } catch (error) {
        console.error("Error sending telegram message:", error)
        return {
            status: false,
            message: "We are facing an issue sending the message."
        }
    }
}
