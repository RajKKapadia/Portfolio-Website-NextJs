import { expertiseGroups } from "@/lib/data/profile"
import { Boxes, Cloud, Cpu, Workflow } from "lucide-react"

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
                            <article key={category.title} className="rounded-lg border border-border/70 bg-muted/25 p-5">
                                <Icon className="mb-4 size-6 text-foreground" />
                                <h3 className="text-xl font-semibold">{category.title}</h3>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-md border border-border/70 bg-background px-2.5 py-1.5 text-sm text-muted-foreground"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
