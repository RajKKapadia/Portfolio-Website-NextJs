import { NextRequest, NextResponse } from "next/server"
import { unsubscribeByToken } from "@/lib/sheets"
import { z } from "zod"

const requestSchema = z.object({
  token: z.string().regex(/^[a-f0-9]{64}$/),
})

export async function POST(request: NextRequest) {
  try {
    const validation = requestSchema.safeParse(await request.json())

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: "This unsubscribe link is invalid." },
        { status: 400 }
      )
    }

    const result = await unsubscribeByToken(validation.data.token)

    if (!result) {
      return NextResponse.json(
        { success: false, message: "This unsubscribe link is invalid or has expired." },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "You have been unsubscribed from promotional emails.",
      subscriber: result,
    })
  } catch (error) {
    console.error("Error processing unsubscribe request:", error)
    return NextResponse.json(
      { success: false, message: "Unable to unsubscribe right now. Please try again." },
      { status: 500 }
    )
  }
}
