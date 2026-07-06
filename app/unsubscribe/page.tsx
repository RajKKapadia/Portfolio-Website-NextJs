import type { Metadata } from "next"
import { UnsubscribeForm } from "@/components/sections/UnsubscribeForm"
import { getSubscriberByToken } from "@/lib/sheets"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Unsubscribe - Raj Kapadia",
  description: "Manage your promotional email preferences.",
}

interface UnsubscribePageProps {
  searchParams: Promise<{
    token?: string | string[]
  }>
}

export default async function UnsubscribePage({ searchParams }: UnsubscribePageProps) {
  const params = await searchParams
  const token = typeof params.token === "string" ? params.token : null
  const subscriber = token ? await getSubscriberByToken(token) : null

  return (
    <main className="min-h-screen bg-background pt-16">
      <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <UnsubscribeForm
          token={subscriber ? token : null}
          maskedEmail={subscriber?.maskedEmail || null}
          initialStatus={subscriber?.status || "invalid"}
        />
      </div>
    </main>
  )
}
