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
import { toast } from "@/hooks/use-toast"
import { Resource } from "@/lib/sheets"
import { CheckCircle2, Code2 } from "lucide-react"
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
          toast({
            title: "Success!",
            description: "You now have access to the resource.",
            variant: "default",
          })
        } else {
          toast({
            title: "Error",
            description: data.message || "Failed to process your request.",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Thumbnail */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
              <Image
                src={resource.thumbnailUrl}
                alt={resource.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Title & Description */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {resource.title}
              </h1>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Get instant access to:</h2>
              <div className="space-y-2">
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

          {/* Right Side - Form */}
          <div className="lg:sticky lg:top-8">
            <Card className="border-2">
              <CardContent className="pt-6">
                {!isSubmitted ? (
                  <>
                    <div className="mb-6 space-y-2">
                      <h3 className="text-2xl font-bold">Get Free Access</h3>
                      <p className="text-sm text-muted-foreground">
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
                      <h3 className="text-2xl font-bold">Access Granted!</h3>
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
