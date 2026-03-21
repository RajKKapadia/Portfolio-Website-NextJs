import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getLatestVideos, type YouTubeVideo } from "@/lib/youtube"
import { AlertCircle, Calendar, Eye, ThumbsUp } from "lucide-react"
import Image from "next/image"

const FALLBACK_VIDEOS: YouTubeVideo[] = [
  {
    id: "example1",
    title: "Building AI Chatbots with Python and OpenAI",
    thumbnail: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a",
    views: "1.2K",
    likes: "156",
    publishedAt: "2 days ago",
  },
  {
    id: "example2",
    title: "Machine Learning Fundamentals Explained",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    views: "3.4K",
    likes: "245",
    publishedAt: "1 week ago",
  },
  {
    id: "example3",
    title: "Web Development with Next.js and TypeScript",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
    views: "2.8K",
    likes: "198",
    publishedAt: "2 weeks ago",
  },
]

export async function LatestVideo() {
  let displayVideos = FALLBACK_VIDEOS
  let usedFallback = false

  try {
    const videos = await getLatestVideos()
    if (videos.length > 0) {
      displayVideos = videos.slice(0, 6)
    } else {
      usedFallback = true
    }
  } catch {
    usedFallback = true
  }

  return (
    <section className="bg-white py-20 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold">Latest YouTube Videos</h2>
            <p className="mt-2 text-muted-foreground">
              Recent tutorials and walkthroughs from Raj Kapadia&apos;s channel.
            </p>
          </div>
          <Button asChild variant="outline">
            <a
              href="https://www.youtube.com/channel/UCOT01XvBSj12xQsANtTeAcQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Channel
            </a>
          </Button>
        </div>

        {usedFallback && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
            <AlertCircle className="size-4 shrink-0" />
            <span>Live YouTube data was unavailable, so example content is shown for now.</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {displayVideos.map((video) => (
            <Card key={video.id} className="h-full">
              <CardContent className="p-4">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-lg font-semibold">{video.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center gap-1">
                      <Eye className="size-4" />
                      <span>{video.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="size-4" />
                      <span>{video.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="size-4" />
                      <span>{video.publishedAt}</span>
                    </div>
                  </div>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
