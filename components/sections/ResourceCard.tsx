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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <div key={resource.id} className="h-full">
          <Link href={`/resources/${resource.id}`} className="block h-full">
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={resource.thumbnailUrl}
                  alt={resource.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-4 line-clamp-2 flex-1">
                  {resource.title}
                </h3>
                <span
                  className={buttonVariants({
                    className: "w-full transform transition-transform duration-200 group-hover:scale-[1.02]",
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
