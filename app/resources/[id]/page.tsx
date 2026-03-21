import { notFound } from "next/navigation"
import { getAllResources, getResourceById } from "@/lib/sheets"
import ResourceLanding from "@/components/sections/ResourceLanding"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export const revalidate = 3600

export async function generateStaticParams() {
  const resources = await getAllResources()

  return resources.map((resource) => ({
    id: resource.id,
  }))
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
