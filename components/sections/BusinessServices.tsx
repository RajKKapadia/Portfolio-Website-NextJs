import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, Code2, Globe, Headset, MessageSquare, Server } from "lucide-react"
import Link from "next/link"

const offerings = [
  {
    title: "Website / Landing Page Setup",
    description: "Fast, mobile-friendly pages designed to convert local traffic into leads.",
    icon: Globe,
  },
  {
    title: "Domain + Hosting Management",
    description: "End-to-end domain and hosting setup with reliable launch support.",
    icon: Server,
  },
  {
    title: "WhatsApp Lead Button Integration",
    description: "Direct WhatsApp entry points so customers can contact you in one tap.",
    icon: MessageSquare,
  },
  {
    title: "Unlimited Updates & Support",
    description: "Ongoing content, copy, and site updates with active maintenance support.",
    icon: Headset,
  },
  {
    title: "Custom Feature Development",
    description: "Tailored workflows and features based on your specific business process.",
    icon: Code2,
  },
  {
    title: "AI Chatbot for Website + WhatsApp",
    description: "Automated responses and lead qualification across web and WhatsApp.",
    icon: Bot,
  },
]

const proofStats = [
  { label: "Years of Experience", value: "7+" },
  { label: "Chatbots Delivered", value: "100+" },
]

export function BusinessServices() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold mb-3">Local Business Website & AI Growth Stack</h2>
        <p className="text-muted-foreground text-lg">
          One partner for your website, hosting, lead capture, updates, and AI automation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {offerings.map((offering) => (
          <Card key={offering.title}>
            <CardContent className="pt-6">
              <offering.icon className="h-6 w-6 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{offering.title}</h3>
              <p className="text-muted-foreground">{offering.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-2">
        <CardContent className="pt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Transparent pricing</p>
            <h3 className="text-2xl font-semibold">Setup: INR 5,999 | Monthly: INR 1,499</h3>
            <p className="text-muted-foreground mt-2">
              Custom development and advanced AI automation can be added as needed.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg">
              <Link href="/#contact">Discuss Requirements</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {proofStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
