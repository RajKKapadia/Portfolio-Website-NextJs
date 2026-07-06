import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"
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
            <Card
              key={project.id}
              role="article"
              className="group h-full gap-0 border-border/70 bg-background py-0 transition-colors hover:border-foreground/20"
            >
              <CardHeader className="gap-5 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="text-emerald-700 dark:text-emerald-300">
                  {project.category}
                  </Badge>
                  {index === 0 && (
                    <Badge variant="secondary" className="text-amber-700 dark:text-amber-300">
                    Featured
                    </Badge>
                  )}
                </div>
                <div className="space-y-3">
                  <CardTitle>
                    <h3 className="text-2xl tracking-normal">{project.title}</h3>
                  </CardTitle>
                  <CardDescription className="text-base leading-7">
                    {project.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-6 p-5 pt-0">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Item size="sm" className="items-start p-0">
                    <ItemContent>
                      <ItemTitle className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        Problem
                      </ItemTitle>
                      <p className="mt-1 leading-7">{project.problem}</p>
                    </ItemContent>
                  </Item>
                  <Item size="sm" className="items-start p-0">
                    <ItemContent>
                      <ItemTitle className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        Outcome
                      </ItemTitle>
                      <p className="mt-1 leading-7">{project.outcome}</p>
                    </ItemContent>
                  </Item>
                </div>

                <div className="grid gap-2">
                {project.highlights.map((highlight) => (
                    <Item key={highlight} size="sm" className="p-0 text-muted-foreground">
                      <ItemMedia>
                        <CheckCircle2 className="size-4 text-teal-700 dark:text-teal-400" />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle className="font-normal">{highlight}</ItemTitle>
                      </ItemContent>
                    </Item>
                ))}
                </div>
              </CardContent>

              <Separator />
              <CardFooter className="flex flex-col items-stretch gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
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
              </CardFooter>
            </Card>
          ))}
        </div>

        {additionalProjects.length > 0 && (
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {additionalProjects.map((project) => (
              <Button
                asChild
                key={project.id}
                variant="ghost"
                className="group block h-full w-full whitespace-normal p-0 text-left hover:bg-transparent"
              >
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  <Card className="h-full gap-3 border-border/70 bg-background p-4 py-4 transition-colors group-hover:border-foreground/20">
                    <Badge variant="outline">{project.category}</Badge>
                    <CardTitle>
                      <h3 className="leading-6">{project.title}</h3>
                    </CardTitle>
                    <CardDescription className="line-clamp-2 leading-6">
                      {project.outcome}
                    </CardDescription>
                  </Card>
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
