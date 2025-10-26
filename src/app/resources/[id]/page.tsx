import { notFound } from "next/navigation"
import { getResourceById } from "@/lib/sheets"
import ResourceLanding from "@/components/sections/ResourceLanding"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const resource = await getResourceById(id)

  if (!resource) {
    return {
      title: "Resource Not Found",
    }
  }

  return {
    title: `${resource.title} - Free Resource`,
    openGraph: {
      title: resource.title,
      images: [resource.thumbnailUrl],
    },
  }
}

export default async function ResourcePage({ params }: PageProps) {
  const { id } = await params
  const resource = await getResourceById(id)

  if (!resource) {
    notFound()
  }

  return <ResourceLanding resource={resource} />
}
