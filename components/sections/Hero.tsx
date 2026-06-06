import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, FileDown, Sparkles } from "lucide-react"
import Image from "next/image"
import avatarImage from "@/public/avatar.jpeg"
import { GithubIcon } from "../icons"
import { profile, proofStats } from "@/lib/data/profile"

export function Hero() {
    return (
        <section className="relative isolate overflow-hidden border-b border-border/70 bg-background">
            <Image
                src={avatarImage}
                alt="Raj Kapadia portrait"
                fill
                className="pointer-events-none -z-10 object-cover object-[70%_32%] opacity-15 dark:opacity-10"
                sizes="100vw"
                priority
                placeholder="blur"
            />
            <div className="absolute inset-0 -z-10 bg-linear-to-r from-background via-background/90 to-background/50" />
            <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-transparent to-background" />

            <div className="container mx-auto grid min-h-[calc(100svh-9rem)] content-center px-4 py-14 sm:py-20">
                <div className="max-w-5xl space-y-8">
                    <div className="inline-flex items-center gap-2 rounded-md border border-border/80 bg-background/70 px-3 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
                        <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400" />
                        AI consulting for founders, product teams, and automation-heavy businesses
                    </div>

                    <div className="space-y-5">
                        <h1 className="max-w-4xl text-5xl font-semibold tracking-normal text-balance sm:text-6xl lg:text-7xl">
                            Raj Kapadia
                        </h1>
                        <p className="max-w-3xl text-xl font-medium text-foreground sm:text-2xl">
                            Senior AI/LLM engineer building agents, chatbots, and full-stack AI products that survive real users.
                        </p>
                        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                            I help teams turn AI prototypes into reliable workflows across WhatsApp, Telegram, web apps, databases, and cloud infrastructure.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button asChild size="lg">
                            <a href={profile.bookingUrl} target="_blank" rel="noopener noreferrer">
                                <Calendar className="size-5" />
                                Book consulting call
                                <ArrowRight className="size-4" />
                            </a>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
                                <GithubIcon className="size-5" />
                                View GitHub
                            </a>
                        </Button>
                        <Button asChild size="lg" variant="ghost">
                            <a href={profile.resumePath} download="RajKapadia-Resume.pdf">
                                <FileDown className="size-5" />
                                Resume
                            </a>
                        </Button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {proofStats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-lg border border-border/70 bg-background/75 p-4 shadow-sm backdrop-blur"
                            >
                                <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
                                <p className="mt-1 text-sm leading-5 text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
