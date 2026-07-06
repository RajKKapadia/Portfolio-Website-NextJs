import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"
import { services, profile } from "@/lib/data/profile"
import { ArrowRight, Bot, BrainCircuit, Code2, MessageSquare, Network, ShieldCheck } from "lucide-react"
import Link from "next/link"

const serviceIcons = [Network, BrainCircuit, MessageSquare, Code2]

const engagementModes = [
  {
    title: "Prototype-to-production audit",
    description: "Review the architecture, failure points, and launch path before you invest in a full rebuild.",
  },
  {
    title: "End-to-end AI product build",
    description: "Design and ship the agent logic, APIs, frontend, deployment flow, and handoff documentation.",
  },
  {
    title: "Webhook and chatbot systems",
    description: "Build WhatsApp, Telegram, Dialogflow, Gemini, and worker-backed automations that handle real traffic.",
  },
  {
    title: "LLM workflow rescue",
    description: "Stabilize unreliable prompts, tool calls, retrieval flows, background jobs, and product UX.",
  },
]

export function BusinessServices() {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400">
              Consulting services
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
              Build AI workflows your team can actually operate.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              From prototype cleanup to full product delivery, the focus is reliable agent behavior, practical integrations, and user-facing software that makes AI useful.
            </p>
          </div>
          <Button asChild variant="outline" size="lg">
            <Link href="/#contact">
              Discuss a project
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = serviceIcons[index] ?? Bot

            return (
              <Card
                key={service.title}
                role="article"
                className="h-full gap-0 border-border/70 bg-muted/25 py-0 transition-colors hover:border-foreground/20 hover:bg-background"
              >
                <CardHeader className="p-5 pb-0">
                  <Icon className="mb-3 size-7 text-teal-700 dark:text-teal-400" />
                  <CardTitle>
                    <h3 className="text-xl">{service.title}</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 p-5 pt-3">
                  <CardDescription className="text-base leading-7">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <Separator />
                <CardFooter className="p-5 pt-4 text-sm font-medium">
                  {service.proof}
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <Card className="mt-8 gap-0 border-border/70 bg-muted/25 py-0">
          <CardHeader className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="size-4" />
              Ways to work together
            </CardTitle>
            <Button asChild size="lg" className="w-full sm:w-auto sm:shrink-0">
              <a href={profile.bookingUrl} target="_blank" rel="noopener noreferrer">
                Book a fit call
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </CardHeader>
          <CardContent className="grid gap-3 p-5 pt-0 sm:grid-cols-2 sm:p-6 sm:pt-0">
            {engagementModes.map((mode) => (
              <Item key={mode.title} variant="outline" size="sm" className="bg-background">
                <ItemContent>
                  <ItemTitle>
                    <h3>{mode.title}</h3>
                  </ItemTitle>
                  <ItemDescription className="line-clamp-none leading-6">
                    {mode.description}
                  </ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
