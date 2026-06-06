"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import type { Resource } from "@/lib/sheets"
import { ArrowRight, CheckCircle2, Code2, LockKeyhole } from "lucide-react"
import { YoutubeIcno } from "../icons"

interface ResourceLandingProps {
  resource: Resource
}

const leadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
})

export default function ResourceLanding({ resource }: ResourceLandingProps) {
  const [isPending, startTransition] = useTransition()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof leadFormSchema>>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
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
    <div className="min-h-screen bg-background pt-16">
      <div className="border-b border-border/70 bg-muted/25">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-700 dark:text-teal-400">
            Free resource
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-normal sm:text-4xl lg:text-5xl">
            {resource.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-8">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
              <Image
                src={resource.thumbnailUrl}
                alt={resource.title}
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>

            <div className="rounded-lg border border-border/70 bg-muted/25 p-5 sm:p-6">
              <h2 className="text-2xl font-semibold">What you get</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Complete source code</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Step-by-step implementation guide</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Video tutorial walkthrough</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">All project assets and configurations</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <Card className="border-border/70 p-0 shadow-lg">
              <CardContent className="p-5 sm:p-6">
                {!isSubmitted ? (
                  <>
                    <div className="mb-6 space-y-2">
                      <div className="mb-4 grid size-11 place-items-center rounded-md bg-primary text-primary-foreground">
                        <LockKeyhole className="size-5" />
                      </div>
                      <h3 className="text-2xl font-semibold">Get free access</h3>
                      <p className="leading-7 text-muted-foreground">
                        Enter your details below to access the source code and resources
                      </p>
                    </div>

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

                        <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                          {isPending ? "Processing..." : "Get Instant Access"}
                          {!isPending && <ArrowRight className="size-4" />}
                        </Button>
                      </form>
                    </Form>

                    <div className="mt-6 pt-6 border-t">
                      <p className="text-xs text-center text-muted-foreground">
                        By submitting this form, you agree to receive occasional updates about new resources and tutorials.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6 py-8">
                    <div className="flex justify-center">
                      <div className="rounded-full bg-primary/10 p-3">
                        <CheckCircle2 className="h-12 w-12 text-primary" />
                      </div>
                    </div>

                    <div className="space-y-2 text-center">
                      <h3 className="text-2xl font-semibold">Access granted</h3>
                      <p className="text-muted-foreground">
                        You can now access all the resources for this project.
                      </p>
                    </div>

                    <div className="space-y-3">
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
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
