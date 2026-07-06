"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUpRight, BriefcaseBusiness, Calendar, Factory, Mail, Send } from "lucide-react"
import { useTransition } from "react"
import { YoutubeIcno } from "../icons"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { toast } from "sonner"
import { sendTelegramMessage } from "@/lib/telegram"
import { profile } from "@/lib/data/profile"

export const inquiryFormSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email().min(1, "Required"),
  subject: z.string(),
  message: z.string().optional()
})

export function Contact() {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof inquiryFormSchema>>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  })

    function onSubmit(values: z.infer<typeof inquiryFormSchema>) {
        startTransition(async () => {
            const telegramMessage = `*Name:* ${values.name}\n*Email:* ${values.email}\n*Subject:* ${values.subject || "No subject"}\n*Message:* ${values.message || "No message"}`
            const data = await sendTelegramMessage({ message: telegramMessage })
            if (data.status) {
                toast.success("Success", {
                    description: data.message,
                })
                form.reset()
            } else {
                toast.error("Message failed", {
                    description: data.message,
                })
            }
        })
    }

    const contactLinks = [
        {
            icon: Mail,
            href: `mailto:${profile.email}`,
            text: "Send Email"
        },
        {
            icon: YoutubeIcno,
            href: profile.youtubeUrl,
            text: "YouTube Channel"
        },
        {
            icon: BriefcaseBusiness,
            href: profile.upworkUrl,
            text: "Upwork Profile"
        },
        {
            icon: Factory,
            href: profile.fiverrUrl,
            text: "Fiverr Profile"
        },
        {
            icon: Calendar,
            href: profile.bookingUrl,
            text: "Book Consulting Call"
        }
    ]

    return (
    <section className="border-t border-border/70 bg-muted/25">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-700 dark:text-teal-400">
              Start a project
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
              Bring a messy AI idea, prototype, or integration problem.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
            The fastest path is a short call. Use the form if you already have project context, constraints, or links to share.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr]">
          <Card className="order-2 border-border/70 bg-background shadow-sm md:order-1">
            <CardContent className="p-5 sm:p-6">
              <Button asChild size="lg" className="mb-6 w-full">
                <a href={profile.bookingUrl} target="_blank" rel="noopener noreferrer">
                  <Calendar className="size-5" />
                  Book consulting call
                </a>
              </Button>
              <div className="grid gap-3">
                {contactLinks.map((link) => (
                  <Item
                    asChild
                    key={link.href}
                    variant="outline"
                    size="sm"
                    className="bg-muted/25"
                  >
                    <a
                      href={link.href}
                      target={link.href.startsWith("mailto") ? undefined : "_blank"}
                      rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    >
                      <ItemMedia>
                        <link.icon className="size-5" />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{link.text}</ItemTitle>
                      </ItemContent>
                      <ItemActions>
                        <ArrowUpRight className="size-4" />
                      </ItemActions>
                    </a>
                  </Item>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="order-1 border-border/70 bg-background text-foreground shadow-lg md:order-2">
            <CardContent className="p-5 sm:p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your name"></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="Your valid email address"></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="What is the matter?"></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="resize-none h-32" placeholder="Any message for me?"></Textarea>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                ></FormField>

                <Button type="submit" className="w-full" disabled={isPending}>
                  <Send className="size-4" />
                  {isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      </div>
    </section>
  )
}
