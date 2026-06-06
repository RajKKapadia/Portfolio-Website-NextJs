import { Button } from "@/components/ui/button"
import { projects } from "@/lib/data/projects"
import { ArrowUpRight, CheckCircle2, Layers3 } from "lucide-react"

export function Projects() {
  const featuredProjects = projects.slice(0, 4)
  const additionalProjects = projects.slice(4)

  return (
    <section className="border-y border-border/70 bg-muted/25">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="mb-10 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-700 dark:text-teal-400">
              Selected work
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
              Applied AI systems, not slideware.
            </h2>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
            A sample of agent, chatbot, LLM, NLP, computer vision, and bot products that show how Raj turns model capability into usable software.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <article
              key={project.id}
              className="group flex h-full flex-col rounded-lg border border-border/70 bg-background p-5 shadow-sm transition-colors hover:border-foreground/20"
            >
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-emerald-600/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  {project.category}
                </span>
                {index === 0 && (
                  <span className="rounded-md bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
                    Featured
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-semibold tracking-normal">{project.title}</h3>
                <p className="leading-7 text-muted-foreground">{project.description}</p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Problem
                  </p>
                  <p className="mt-2 leading-7">{project.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Outcome
                  </p>
                  <p className="mt-2 leading-7">{project.outcome}</p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                {project.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 text-teal-700 dark:text-teal-400" />
                    {highlight}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-4 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Layers3 className="mt-0.5 size-4 shrink-0 text-foreground" />
                  <span>{project.technology}</span>
                </div>
                <Button asChild variant="outline" className="sm:shrink-0">
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    View build
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {additionalProjects.length > 0 && (
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {additionalProjects.map((project) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border/70 bg-background p-4 shadow-sm transition-colors hover:border-foreground/20"
              >
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {project.category}
                </p>
                <h3 className="mt-3 font-semibold leading-6">{project.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {project.outcome}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
