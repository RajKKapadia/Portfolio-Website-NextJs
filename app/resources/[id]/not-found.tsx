import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ResourceNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Empty className="w-full max-w-md border">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="text-destructive">
            <AlertCircle />
          </EmptyMedia>
          <EmptyTitle>Resource not found</EmptyTitle>
          <EmptyDescription>
                The resource you&apos;re looking for doesn&apos;t exist or has been removed.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
            <Button asChild className="w-full">
            <Link href="/">Return home</Link>
            </Button>
        </EmptyContent>
      </Empty>
    </main>
  )
}
