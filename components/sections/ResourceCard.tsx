import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { Resource } from "@/lib/sheets"

interface ResourceCardGridProps {
  resources: Resource[]
}

export function ResourceCardGrid({ resources }: ResourceCardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <Button
          asChild
          key={resource.id}
          variant="ghost"
          className="block h-full w-full whitespace-normal p-0 text-left hover:bg-transparent"
        >
          <Link href={`/resources/${resource.id}`} className="block h-full">
            <Card className="group flex h-full flex-col overflow-hidden border-border/70 bg-muted/25 p-0 shadow-sm transition-colors hover:border-foreground/20">
              <AspectRatio ratio={16 / 9} className="relative overflow-hidden">
                <Image
                  src={resource.thumbnailUrl}
                  alt={resource.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </AspectRatio>
              <CardContent className="flex flex-1 flex-col p-5">
                <Badge variant="outline" className="mb-3 uppercase tracking-[0.14em] text-muted-foreground">
                  Free resource
                </Badge>
                <h3 className="mb-5 line-clamp-2 flex-1 text-lg font-semibold leading-7">
                  {resource.title}
                </h3>
                <Badge className="h-9 w-full rounded-md">
                  Get Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Badge>
              </CardContent>
            </Card>
          </Link>
        </Button>
      ))}
    </div>
  )
}
