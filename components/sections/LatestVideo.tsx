import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getLatestVideos, type YouTubeVideo } from "@/lib/youtube"
import { AlertCircle, ArrowUpRight, Calendar, Eye, ThumbsUp } from "lucide-react"
import Image from "next/image"
import { profile } from "@/lib/data/profile"

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
    <section className="border-y border-border/70 bg-muted/25">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 pt-16 sm:flex-row sm:items-end sm:justify-between lg:pt-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-rose-700 dark:text-rose-400">
              Teaching and walkthroughs
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
              Recent AI and chatbot tutorials.
            </h2>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-muted-foreground">
              Practical implementation videos that show the same applied engineering style used in client work.
            </p>
          </div>
          <Button asChild variant="outline">
            <a
              href={profile.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Channel
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </div>

        {usedFallback && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
            <AlertCircle className="size-4 shrink-0" />
            <span>Live YouTube data was unavailable, so example content is shown for now.</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 pb-16 md:grid-cols-2 xl:grid-cols-3 lg:pb-20">
          {displayVideos.map((video) => (
            <Card key={video.id} className="h-full overflow-hidden border-border/70 bg-background p-0 shadow-sm">
              <CardContent className="p-0">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="mb-4 line-clamp-2 text-lg font-semibold">{video.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Eye className="size-4" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ThumbsUp className="size-4" />
                        <span>{video.likes}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-4" />
                        <span>{video.publishedAt}</span>
                      </div>
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
