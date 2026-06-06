import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { Resource } from "@/lib/sheets"

interface ResourceCardGridProps {
  resources: Resource[]
}

export function ResourceCardGrid({ resources }: ResourceCardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <div key={resource.id} className="h-full">
          <Link href={`/resources/${resource.id}`} className="block h-full">
            <Card className="group flex h-full flex-col overflow-hidden border-border/70 bg-muted/25 p-0 shadow-sm transition-colors hover:border-foreground/20">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={resource.thumbnailUrl}
                  alt={resource.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <CardContent className="flex flex-1 flex-col p-5">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Free resource
                </p>
                <h3 className="mb-5 line-clamp-2 flex-1 text-lg font-semibold leading-7">
                  {resource.title}
                </h3>
                <span
                  className={buttonVariants({
                    className: "w-full transition-colors",
                  })}
                >
                  Get Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </CardContent>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  )
}
