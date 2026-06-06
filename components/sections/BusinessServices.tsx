import { Button } from "@/components/ui/button"
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
              <article
                key={service.title}
                className="flex h-full flex-col rounded-lg border border-border/70 bg-muted/25 p-5 shadow-sm transition-colors hover:border-foreground/20 hover:bg-background"
              >
                <Icon className="mb-5 size-7 text-teal-700 dark:text-teal-400" />
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 flex-1 leading-7 text-muted-foreground">{service.description}</p>
                <p className="mt-5 border-t border-border/70 pt-4 text-sm font-medium text-foreground">
                  {service.proof}
                </p>
              </article>
            )
          })}
        </div>

        <div className="mt-8 rounded-lg border border-border/70 bg-muted/25 p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ShieldCheck className="size-4" />
              Ways to work together
            </div>
            <Button asChild size="lg" className="w-full sm:w-auto sm:shrink-0">
              <a href={profile.bookingUrl} target="_blank" rel="noopener noreferrer">
                Book a fit call
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {engagementModes.map((mode) => (
              <div key={mode.title} className="rounded-md border border-border/70 bg-background px-4 py-3">
                <h3 className="text-sm font-semibold text-foreground">{mode.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{mode.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
