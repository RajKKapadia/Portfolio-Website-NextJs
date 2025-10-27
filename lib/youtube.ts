"use server"

import { formatDistanceToNow } from "date-fns"
import { config, validateConfig } from "./config"
import { formatViewCount } from "./utils"

export interface YouTubeVideo {
    id: string
    title: string
    thumbnail: string
    views: string
    likes: string
    publishedAt: string
}

async function getChannelUploadsPlaylistId() {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${config.youtube.channelId}&key=${config.youtube.apiKey}`
    )

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: { message: response.statusText } }))
        throw new Error(`Failed to fetch channel data: ${error.error?.message || response.statusText}`)
    }

    const data = await response.json()
    if (!data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads) {
        throw new Error("Channel uploads playlist not found")
    }

    return data.items[0].contentDetails.relatedPlaylists.uploads
}

async function getPlaylistVideos(playlistId: string) {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${config.youtube.maxResults}&key=${config.youtube.apiKey}`
    )

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: { message: response.statusText } }))
        throw new Error(`Failed to fetch playlist videos: ${error.error?.message || response.statusText}`)
    }

    return await response.json()
}

async function getVideoStats(videoIds: string[]) {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds.join(",")}&key=${config.youtube.apiKey}`
    )

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: { message: response.statusText } }))
        throw new Error(`Failed to fetch video statistics: ${error.error?.message || response.statusText}`)
    }

    return await response.json()
}

export async function getLatestVideos(): Promise<YouTubeVideo[]> {
    try {
        const { isValid, missingEnvVars } = validateConfig()
        if (!isValid) {
            throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`)
        }

        const uploadsPlaylistId = await getChannelUploadsPlaylistId()
        const videosData = await getPlaylistVideos(uploadsPlaylistId)

        if (!videosData.items?.length) {
            throw new Error("No videos found in the playlist")
        }

        const videoIds = videosData.items.map((item: any) => item.snippet.resourceId.videoId)
        const statsData = await getVideoStats(videoIds)

        if (!statsData.items?.length) {
            throw new Error("Failed to fetch video statistics")
        }

        return videosData.items.map((item: any, index: number) => {
            const stats = statsData.items[index]?.statistics || { viewCount: "0", likeCount: "0" }
            const publishedAt = new Date(item.snippet.publishedAt)

            return {
                id: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
                views: formatViewCount(stats.viewCount),
                likes: formatViewCount(stats.likeCount),
                publishedAt: formatDistanceToNow(publishedAt, { addSuffix: true })
            }
        })
    } catch (error) {
        console.error("Error fetching YouTube videos:", error)
        throw error
    }
}
