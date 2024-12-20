"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Eye, ThumbsUp, Calendar, AlertCircle } from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useSWR from 'swr'
import { getLatestVideos, type YouTubeVideo } from '@/lib/youtube'
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const FALLBACK_VIDEOS: YouTubeVideo[] = [
    {
        id: "example1",
        title: "Building AI Chatbots with Python and OpenAI",
        thumbnail: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a",
        views: "1.2K",
        likes: "156",
        publishedAt: "2 days ago"
    },
    {
        id: "example2",
        title: "Machine Learning Fundamentals Explained",
        thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
        views: "3.4K",
        likes: "245",
        publishedAt: "1 week ago"
    },
    {
        id: "example3",
        title: "Web Development with Next.js 13",
        thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
        views: "2.8K",
        likes: "198",
        publishedAt: "2 weeks ago"
    }
]

const fetcher = async () => {
    try {
        return await getLatestVideos()
    } catch (error) {
        console.error('Failed to fetch videos:', error)
        return FALLBACK_VIDEOS
    }
}

export function LatestVideo() {
    const { data: videos, error, isLoading } = useSWR<YouTubeVideo[]>('youtube-videos', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        dragFree: true,
        containScroll: "trimSnaps",
        align: "start",
    })

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

    useEffect(() => {
        if (emblaApi) {
            emblaApi.reInit()
        }
    }, [emblaApi, videos])

    const displayVideos = videos || []

    return (
        <section className="container mx-auto px-4 py-20 bg-white dark:bg-neutral-900">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Latest YouTube Videos</h2>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollPrev}
                        className="hidden md:flex"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollNext}
                        className="hidden md:flex"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        There was a problem loading the videos. Showing example content instead.
                    </AlertDescription>
                </Alert>
            )}

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="flex-[0_0_83.333333%] pl-4 md:flex-[0_0_40%] lg:flex-[0_0_30%]">
                                <Card className="h-full">
                                    <CardContent className="p-4">
                                        <Skeleton className="aspect-video w-full mb-4" />
                                        <Skeleton className="h-6 w-3/4 mb-4" />
                                        <div className="flex gap-4">
                                            <Skeleton className="h-4 w-16" />
                                            <Skeleton className="h-4 w-16" />
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))
                    ) : (
                        displayVideos.map((video) => (
                            <div key={video.id} className="flex-[0_0_83.333333%] pl-4 md:flex-[0_0_40%] lg:flex-[0_0_30%]">
                                <Card className="h-full">
                                    <CardContent className="p-4">
                                        <a
                                            href={`https://www.youtube.com/watch?v=${video.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block"
                                        >
                                            <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                                                <Image
                                                    src={video.thumbnail}
                                                    alt={video.title}
                                                    fill
                                                    className="object-cover transition-transform hover:scale-105"
                                                />
                                            </div>
                                            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
                                            <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                                                <div className="flex items-center gap-1">
                                                    <Eye className="w-4 h-4" />
                                                    <span>{video.views}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <ThumbsUp className="w-4 h-4" />
                                                    <span>{video.likes}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{video.publishedAt}</span>
                                                </div>
                                            </div>
                                        </a>
                                    </CardContent>
                                </Card>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}