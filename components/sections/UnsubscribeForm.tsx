"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, MailX } from "lucide-react"
import { toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

interface UnsubscribeFormProps {
  token: string | null
  maskedEmail: string | null
  initialStatus: "subscribed" | "unsubscribed" | "invalid"
}

export function UnsubscribeForm({
  token,
  maskedEmail,
  initialStatus,
}: UnsubscribeFormProps) {
  const [status, setStatus] = useState(initialStatus)
  const [errorMessage, setErrorMessage] = useState("")
  const [isPending, startTransition] = useTransition()

  function handleUnsubscribe() {
    if (!token) {
      return
    }

    setErrorMessage("")
    startTransition(async () => {
      try {
        const response = await fetch("/api/unsubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        })
        const data = await response.json()

        if (!response.ok || !data.success) {
          setErrorMessage(data.message || "Unable to unsubscribe right now. Please try again.")
          return
        }

        setStatus("unsubscribed")
        toast.success("Unsubscribed", {
          description: "You will no longer receive promotional emails.",
        })
      } catch {
        setErrorMessage("Unable to unsubscribe right now. Please try again.")
      }
    })
  }

  return (
    <Card className="w-full max-w-lg border-border/70 p-0 shadow-lg">
      <CardContent className="p-6 sm:p-8">
        {status === "invalid" ? (
          <Empty className="p-0">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MailX />
              </EmptyMedia>
              <EmptyTitle className="text-2xl">Invalid unsubscribe link</EmptyTitle>
              <EmptyDescription className="text-base leading-7">
                This link is invalid or has expired. Please use the unsubscribe link from your
                most recent email.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">
                  <ArrowLeft className="size-4" />
                  Return home
                </Link>
              </Button>
            </EmptyContent>
          </Empty>
        ) : status === "unsubscribed" ? (
          <Empty className="p-0" aria-live="polite">
            <EmptyHeader>
              <EmptyMedia variant="icon" className="size-14 rounded-full text-primary">
                <CheckCircle2 className="size-8" />
              </EmptyMedia>
              <EmptyTitle className="text-2xl">You&apos;re unsubscribed</EmptyTitle>
              <EmptyDescription className="text-base leading-7">
                {maskedEmail || "Your email address"} will no longer receive promotional emails
                from Raj Kapadia.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">
                  <ArrowLeft className="size-4" />
                  Return home
                </Link>
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <div className="space-y-6">
            <Badge className="size-12 rounded-md p-0">
              <MailX className="size-6" />
            </Badge>
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-700 dark:text-teal-400">
                Email preferences
              </p>
              <h1 className="text-2xl font-semibold">Unsubscribe from promotional emails?</h1>
              <p className="leading-7 text-muted-foreground">
                Confirm that you no longer want occasional resources, tutorials, and service
                updates sent to {maskedEmail || "your email address"}.
              </p>
            </div>

            {errorMessage && (
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Button
                type="button"
                variant="destructive"
                className="w-full"
                size="lg"
                disabled={isPending}
                onClick={handleUnsubscribe}
              >
                {isPending ? "Unsubscribing..." : "Unsubscribe"}
              </Button>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/">Keep me subscribed</Link>
              </Button>
            </div>

            <p className="text-center text-xs leading-5 text-muted-foreground">
              This only affects promotional emails and does not remove your resource access.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
