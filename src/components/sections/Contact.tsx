"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Youtube, FileText, Mail, Send } from "lucide-react"
import { useState, FormEvent } from "react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const contactLinks = [
    {
      icon: Mail,
      href: "mailto:rajkkapadia@gmail.com",
      text: "rajkkapadia@gmail.com"
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/channel/UCOT01XvBSj12xQsANtTeAcQ",
      text: "YouTube Channel"
    },
    {
      icon: FileText,
      href: "https://www.upwork.com/freelancers/~0176aeacfcff7f1fc2?viewMode=1",
      text: "Upwork Profile"
    },
    {
      icon: FileText,
      href: "https://www.fiverr.com/rajkkapadia",
      text: "Fiverr Profile"
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  className="min-h-[150px] resize-none"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
