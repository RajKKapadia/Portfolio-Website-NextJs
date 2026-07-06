import { expertiseGroups } from "@/lib/data/profile"
import { Boxes, Cloud, Cpu, Workflow } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Skills() {
    const icons = [Workflow, Cpu, Cloud, Boxes]

    return (
        <section className="bg-background">
            <div className="container mx-auto px-4 py-16 lg:py-20">
                <div className="mb-10 max-w-3xl">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-700 dark:text-sky-400">
                        Technical depth
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
                        A stack built for AI products that need frontend, backend, and model fluency.
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {expertiseGroups.map((category, index) => {
                        const Icon = icons[index] ?? Boxes

                        return (
                            <Card key={category.title} role="article" className="gap-0 border-border/70 bg-muted/25 py-0">
                                <CardHeader className="gap-4 p-5 pb-0">
                                    <Icon className="size-6 text-foreground" />
                                    <CardTitle>
                                        <h3 className="text-xl">{category.title}</h3>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-wrap gap-2 p-5">
                                    {category.skills.map((skill) => (
                                        <Badge key={skill} variant="outline" className="bg-background py-1.5 text-muted-foreground">
                                            {skill}
                                        </Badge>
                                    ))}
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
