import { NextResponse } from "next/server"

const fallbackMessage = "Hi Raj"

export async function GET(request: Request) {
  const whatsappUrl = process.env.WHATSAPP_REDIRECT_URL
  const whatsappNumber = process.env.WHATSAPP_NUMBER

  if (whatsappUrl) {
    return NextResponse.redirect(whatsappUrl)
  }

  if (whatsappNumber) {
    const number = whatsappNumber.replace(/\D/g, "")
    const message = encodeURIComponent(process.env.WHATSAPP_DEFAULT_MESSAGE ?? fallbackMessage)
    const url = `https://wa.me/${number}?text=${message}`
    return NextResponse.redirect(url)
  }

  return NextResponse.redirect(new URL("/#contact", request.url))
}
