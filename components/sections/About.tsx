import { BadgeCheck, GraduationCap, UsersRound } from "lucide-react"
import { credibilityNotes } from "@/lib/data/profile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function About() {
    const pillars = [
        {
            icon: UsersRound,
            label: "Team lead delivery",
            value: "Led AI/ML teams building enterprise LLM, text-to-SQL, image search, and deep learning systems.",
        },
        {
            icon: BadgeCheck,
            label: "Client-ready systems",
            value: "Delivered chatbots, APIs, automations, and AI products for global freelance and direct clients.",
        },
        {
            icon: GraduationCap,
            label: "Teaching depth",
            value: "6+ years as an Assistant Professor plus ongoing YouTube and course content for applied AI builders.",
        },
    ]

    return (
        <section className="border-b border-border/70 bg-muted/25">
            <div className="container mx-auto px-4 py-16 lg:py-20">
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <div className="max-w-2xl space-y-4">
                        <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                            Why bring Raj in
                        </p>
                        <h2 className="text-3xl font-semibold tracking-normal sm:text-4xl">
                            Practical AI engineering for teams that need more than a demo.
                        </h2>
                        <p className="text-lg leading-8 text-muted-foreground">
                            Raj combines LLM application development, chatbot delivery, full-stack engineering, and applied ML leadership to build systems that can be deployed, maintained, and explained.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {credibilityNotes.map((note) => (
                            <Card key={note} className="border-border/70 bg-background py-0">
                                <CardContent className="p-5">
                                    <p className="leading-7 text-muted-foreground">{note}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                    {pillars.map((pillar) => (
                        <Card key={pillar.label} className="gap-0 border-border/70 bg-background py-0">
                            <CardHeader className="gap-4 p-5 pb-0">
                                <pillar.icon className="size-6 text-teal-700 dark:text-teal-400" />
                                <CardTitle>
                                    <h3 className="text-lg">{pillar.label}</h3>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 pt-2">
                                <p className="leading-7 text-muted-foreground">{pillar.value}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
