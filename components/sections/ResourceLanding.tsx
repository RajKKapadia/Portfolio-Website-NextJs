"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { toast } from "sonner"
import type { Resource } from "@/lib/sheets"
import { MARKETING_CONSENT_COPY } from "@/lib/marketing"
import { ArrowRight, CheckCircle2, Code2, LockKeyhole } from "lucide-react"
import { YoutubeIcno } from "../icons"

interface ResourceLandingProps {
  resource: Resource
}

const RESOURCE_BENEFITS = [
  "Complete source code",
  "Step-by-step implementation guide",
  "Video tutorial walkthrough",
  "All project assets and configurations",
]

const leadFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(320),
  marketingConsent: z.boolean(),
})

export default function ResourceLanding({ resource }: ResourceLandingProps) {
  const [isPending, startTransition] = useTransition()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof leadFormSchema>>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      marketingConsent: true,
    },
  })

  async function onSubmit(values: z.infer<typeof leadFormSchema>) {
    startTransition(async () => {
      try {
        const response = await fetch("/api/resource-access", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            resourceId: resource.id,
            resourceTitle: resource.title,
            marketingConsent: values.marketingConsent,
          }),
        })

        const data = await response.json()

        if (data.success) {
          setIsSubmitted(true)
          toast.success("Success!", {
            description: "You now have access to the resource.",
          })
        } else {
          toast.error(data.message || "Failed to process your request.",)
        }
      } catch {
        toast.error("Something went wrong. Please try again.",)
      }
    })
  }

  return (
    <main className="min-h-screen bg-background pt-16">
      <section className="border-b border-border/70 bg-muted/25">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-700 dark:text-teal-400">
            Free resource
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-normal sm:text-4xl lg:text-5xl">
            {resource.title}
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-8">
            <AspectRatio ratio={16 / 9} className="relative overflow-hidden rounded-lg border">
              <Image
                src={resource.thumbnailUrl}
                alt={resource.title}
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </AspectRatio>

            <Card className="gap-0 border-border/70 bg-muted/25 py-0">
              <CardHeader className="p-5 pb-0 sm:p-6 sm:pb-0">
                <CardTitle>
                  <h2 className="text-2xl">What you get</h2>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
                {RESOURCE_BENEFITS.map((benefit) => (
                  <Item key={benefit} size="sm" className="items-start p-0">
                    <ItemMedia>
                      <CheckCircle2 className="mt-0.5 size-5 text-primary" />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className="font-normal text-muted-foreground">
                        {benefit}
                      </ItemTitle>
                    </ItemContent>
                  </Item>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:sticky lg:top-24">
            <Card className="gap-0 border-border/70 p-0 shadow-lg">
              {!isSubmitted ? (
                <>
                  <CardHeader className="gap-2 p-5 pb-0 sm:p-6 sm:pb-0">
                    <Badge className="mb-2 size-11 rounded-md p-0">
                      <LockKeyhole className="size-5" />
                    </Badge>
                    <CardTitle>
                      <h3 className="text-2xl">Get free access</h3>
                    </CardTitle>
                    <CardDescription className="text-base leading-7">
                      Enter your details below to access the source code and resources
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-5 sm:p-6">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Your full name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" placeholder="your.email@example.com" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="marketingConsent"
                          render={({ field }) => (
                            <FormItem className="rounded-md border border-border/70 bg-muted/25 p-4">
                              <div className="flex items-start gap-3">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(checked) => field.onChange(checked === true)}
                                    aria-describedby="marketing-consent-description"
                                  />
                                </FormControl>
                                <div className="space-y-1">
                                  <FormLabel className="cursor-pointer leading-5 font-normal">
                                    {MARKETING_CONSENT_COPY}
                                  </FormLabel>
                                  <p
                                    id="marketing-consent-description"
                                    className="text-xs leading-5 text-muted-foreground"
                                  >
                                    Optional. You can unsubscribe at any time.
                                  </p>
                                </div>
                              </div>
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                          {isPending ? "Processing..." : "Get Instant Access"}
                          {!isPending && <ArrowRight className="size-4" />}
                        </Button>
                      </form>
                    </Form>

                    <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
                      Email updates are optional and do not affect access to this resource.
                    </p>
                  </CardContent>
                </>
              ) : (
                <CardContent className="p-5 sm:p-6">
                  <Empty className="p-3 sm:p-6">
                    <EmptyHeader>
                      <EmptyMedia variant="icon" className="size-14 rounded-full text-primary">
                        <CheckCircle2 className="size-8" />
                      </EmptyMedia>
                      <EmptyTitle className="text-2xl">Access granted</EmptyTitle>
                      <EmptyDescription>
                        You can now access all the resources for this project.
                      </EmptyDescription>
                    </EmptyHeader>
                    <div className="w-full space-y-3">
                      <Button asChild className="w-full" size="lg">
                        <a href={resource.codeUrl} target="_blank" rel="noopener noreferrer">
                          <Code2 className="mr-2 h-5 w-5" />
                          Access Source Code
                        </a>
                      </Button>

                      {resource.youtubeUrl && (
                        <Button asChild variant="outline" className="w-full" size="lg">
                          <a href={resource.youtubeUrl} target="_blank" rel="noopener noreferrer">
                            <YoutubeIcno className="mr-2 h-5 w-5" />
                            Watch Tutorial
                          </a>
                        </Button>
                      )}
                    </div>
                  </Empty>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
