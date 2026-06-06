import { getAllResources } from "@/lib/sheets"
import { ResourceCardGrid } from "@/components/sections/ResourceCard"
import { PackageOpen } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Resources - Raj Kapadia",
  description:
    "Browse and download free resources including source code, project files, and tutorial assets.",
}

export const revalidate = 3600

export default async function ResourcesPage() {
  const resources = await getAllResources()

  return (
    <main className="min-h-screen bg-background pt-16">
      <section className="border-b border-border/70 bg-muted/25">
        <div className="container mx-auto px-4 py-16 lg:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-700 dark:text-teal-400">
            Free implementation resources
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-normal sm:text-5xl">
            Source code and project files from applied AI tutorials.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            Browse free resources, tutorials, and starter assets. Click any item to unlock the related code and walkthrough links.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 lg:py-16">
        {resources.length > 0 ? (
          <ResourceCardGrid resources={resources} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <PackageOpen className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No resources yet</h2>
            <p className="text-muted-foreground">
              Check back soon — new resources are added regularly.
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
