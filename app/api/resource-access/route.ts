import { NextRequest, NextResponse } from "next/server"
import { saveLead } from "@/lib/sheets"
import { z } from "zod"

const requestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(320),
  resourceId: z.string().trim().min(1).max(200),
  resourceTitle: z.string().trim().min(1).max(500),
  marketingConsent: z.boolean(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const validation = requestSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: "Invalid request data" },
        { status: 400 }
      )
    }

    const { name, email, resourceId, resourceTitle, marketingConsent } = validation.data

    // Save lead to Google Sheets
    const success = await saveLead({
      name,
      email,
      resourceId,
      resourceTitle,
      marketingConsent,
    })

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Access granted! You can now view the resource.",
      })
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to save your information. Please try again." },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Error processing resource access request:", error)
    return NextResponse.json(
      { success: false, message: "An error occurred. Please try again later." },
      { status: 500 }
    )
  }
}
