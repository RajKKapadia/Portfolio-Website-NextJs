"use client"

import { Card, CardContent } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BriefcaseBusiness, Calendar, Factory, Mail, Send } from "lucide-react"
import { useTransition } from "react"
import { YoutubeIcno } from "../icons"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { toast } from "@/hooks/use-toast"
import { sendTelegramMessage } from "@/lib/telegram"

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
      const telegramMessage = `**Name:** ${values.name}
**Email:** ${values.email}
**Subject:** ${values.subject}
**Message:** ${values.message}`
      const data = await sendTelegramMessage(telegramMessage)
      if (data.status) {
        toast({
          title: "Success",
          description: data.message,
          variant: "default"
        })
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive"
        })
      }
    })
    form.reset()
  }

  const contactLinks = [
    {
      icon: Mail,
      href: "mailto:raajforyou@gmail.com",
      text: "raajforyou@gmail.com"
    },
    {
      icon: YoutubeIcno,
      href: "https://www.youtube.com/channel/UCOT01XvBSj12xQsANtTeAcQ",
      text: "YouTube Channel"
    },
    {
      icon: BriefcaseBusiness,
      href: "https://www.upwork.com/freelancers/~0176aeacfcff7f1fc2?viewMode=1",
      text: "Upwork Profile"
    },
    {
      icon: Factory,
      href: "https://www.fiverr.com/rajkkapadia",
      text: "Fiverr Profile"
    },
    {
      icon: Calendar,
      href: "https://project-easy-meet.vercel.app/book/user_2rWmQLgVF13473zu2Mir3l0Yefx/fcf110c4-d28f-44d4-9d40-6e35f2a7f070",
      text: "Book Appointment"
    }
  ]

  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="order-2 md:order-1">
          <CardContent className="pt-6">
            {contactLinks.map((link) => (
              <div key={link.href} className="flex items-center gap-4 mb-4 last:mb-0">
                <link.icon className="h-6 w-6" />
                <a
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="text-lg hover:underline"
                >
                  {link.text}
                </a>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="order-1 md:order-2">
          <CardContent className="pt-6">
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
                        <Input {...field} placeholder="Your valid email address"></Input>
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
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
