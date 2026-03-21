import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/data/projects"
import { ArrowUpRight, Cpu, Globe } from "lucide-react"

const previewGradients = [
  "from-sky-500/20 via-cyan-500/10 to-transparent",
  "from-emerald-500/20 via-teal-500/10 to-transparent",
  "from-amber-500/20 via-orange-500/10 to-transparent",
  "from-rose-500/20 via-pink-500/10 to-transparent",
]

function ProjectPreview({
  title,
  technology,
  index,
}: {
  title: string
  technology: string
  index: number
}) {
  const gradient = previewGradients[index % previewGradients.length]

  return (
    <div className={`relative aspect-video overflow-hidden bg-linear-to-br ${gradient}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_38%),linear-gradient(135deg,rgba(10,10,10,0.12),rgba(10,10,10,0.4))]" />
      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-center justify-between">
          <div className="rounded-full border border-white/20 bg-white/10 p-2 text-white/90 backdrop-blur-sm">
            <Globe className="size-5" />
          </div>
          <div className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
            Featured Build
          </div>
        </div>
        <div className="space-y-3">
          <p className="max-w-[18rem] text-lg font-semibold leading-tight text-white">
            {title}
          </p>
          <p className="line-clamp-2 text-sm text-white/75">{technology}</p>
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Projects</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Production work across AI agents, chatbots, NLP systems, and full-stack applications.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <Card
            key={project.id}
            className="group flex h-full flex-col overflow-hidden border-2 border-transparent transition-shadow duration-300 hover:shadow-lg"
          >
            <ProjectPreview
              title={project.title}
              technology={project.technology}
              index={index}
            />
            <CardContent className="flex flex-1 flex-col p-6">
              <h3 className="mb-2 line-clamp-2 text-xl font-semibold">{project.title}</h3>
              <p className="mb-4 line-clamp-3 text-muted-foreground">{project.description}</p>
              <div className="mb-4 flex items-start gap-2 text-sm text-muted-foreground">
                <Cpu className="mt-0.5 size-4 shrink-0" />
                <span>{project.technology}</span>
              </div>
              <Button asChild className="mt-auto w-full">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  Check it out
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
