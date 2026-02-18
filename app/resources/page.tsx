import { getAllResources } from "@/lib/sheets"
import { ResourceCardGrid } from "@/components/sections/ResourceCard"
import { PackageOpen } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Resources - Raj Kapadia",
  description:
    "Browse and download free resources including source code, project files, and tutorial assets.",
}

export default async function ResourcesPage() {
  const resources = await getAllResources()

  return (
    <main className="min-h-screen bg-linear-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 pt-16">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-2">Resources</h1>
        <p className="text-muted-foreground mb-8">
          Free source code, project files, and tutorial assets. Click on any
          resource to get instant access.
        </p>

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
      </div>
    </main>
  )
}
