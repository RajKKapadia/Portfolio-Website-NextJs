"use server"

import { formatDistanceToNow } from "date-fns"
import { cache } from "react"
import { config, validateYouTubeConfig } from "./config"
import { formatViewCount } from "./utils"

export interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  views: string
  likes: string
  publishedAt: string
}

interface YouTubeChannelResponse {
  items?: Array<{
    contentDetails?: {
      relatedPlaylists?: {
        uploads?: string
      }
    }
  }>
}

interface YouTubePlaylistItem {
  snippet: {
    publishedAt: string
    title: string
    resourceId: {
      videoId: string
    }
    thumbnails: {
      high?: {
        url: string
      }
      default?: {
        url: string
      }
    }
  }
}

interface YouTubePlaylistResponse {
  items?: YouTubePlaylistItem[]
}

interface YouTubeStatsResponse {
  items?: Array<{
    statistics?: {
      viewCount?: string
      likeCount?: string
    }
  }>
}

const YOUTUBE_REVALIDATE_SECONDS = 60 * 60

function getYouTubeRequestHeaders() {
  if (!config.youtube.apiReferer) {
    return undefined
  }

  const referer = config.youtube.apiReferer.endsWith("/")
    ? config.youtube.apiReferer
    : `${config.youtube.apiReferer}/`

  return {
    Referer: referer,
  }
}

async function fetchYouTubeJson<T>(url: string, errorLabel: string): Promise<T> {
  const response = await fetch(url, {
    headers: getYouTubeRequestHeaders(),
    next: { revalidate: YOUTUBE_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(5000),
  })

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: { message: response.statusText } }))

    throw new Error(
      `Failed to fetch ${errorLabel}: ${error.error?.message || response.statusText}`
    )
  }

  return response.json() as Promise<T>
}

async function getChannelUploadsPlaylistId() {
  const data = await fetchYouTubeJson<YouTubeChannelResponse>(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${config.youtube.channelId}&key=${config.youtube.apiKey}`,
    "channel data"
  )

  const uploadsPlaylistId = data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads

  if (!uploadsPlaylistId) {
    throw new Error("Channel uploads playlist not found")
  }

  return uploadsPlaylistId
}

async function getPlaylistVideos(playlistId: string) {
  return fetchYouTubeJson<YouTubePlaylistResponse>(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${config.youtube.maxResults}&key=${config.youtube.apiKey}`,
    "playlist videos"
  )
}

async function getVideoStats(videoIds: string[]) {
  return fetchYouTubeJson<YouTubeStatsResponse>(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds.join(",")}&key=${config.youtube.apiKey}`,
    "video statistics"
  )
}

export const getLatestVideos = cache(async (): Promise<YouTubeVideo[]> => {
  try {
    const { isValid, missingEnvVars } = validateYouTubeConfig()

    if (!isValid) {
      throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`)
    }

    const uploadsPlaylistId = await getChannelUploadsPlaylistId()
    const videosData = await getPlaylistVideos(uploadsPlaylistId)

    if (!videosData.items?.length) {
      throw new Error("No videos found in the playlist")
    }

    const videoIds = videosData.items.map((item) => item.snippet.resourceId.videoId)
    const statsData = await getVideoStats(videoIds)

    if (!statsData.items?.length) {
      throw new Error("Failed to fetch video statistics")
    }

    return videosData.items.map((item, index) => {
      const stats = statsData.items?.[index]?.statistics ?? {
        viewCount: "0",
        likeCount: "0",
      }
      const publishedAt = new Date(item.snippet.publishedAt)

      return {
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high?.url ?? item.snippet.thumbnails.default?.url ?? "",
        views: formatViewCount(stats.viewCount ?? "0"),
        likes: formatViewCount(stats.likeCount ?? "0"),
        publishedAt: formatDistanceToNow(publishedAt, { addSuffix: true }),
      }
    })
  } catch (error) {
    console.error("Error fetching YouTube videos:", error)
    throw error
  }
})
