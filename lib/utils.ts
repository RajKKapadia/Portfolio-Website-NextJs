import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatViewCount(viewCount: string): string {
  const count = parseInt(viewCount)
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return viewCount
}

const YOUTUBE_VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/

export function getYouTubeVideoId(url: string): string | null {
  if (!url.trim()) return null

  try {
    const parsedUrl = new URL(url)
    const hostname = parsedUrl.hostname.toLowerCase()
    let videoId = ""

    if (hostname === "youtu.be" || hostname.endsWith(".youtu.be")) {
      videoId = parsedUrl.pathname.split("/").filter(Boolean)[0] ?? ""
    } else if (
      hostname === "youtube.com" ||
      hostname.endsWith(".youtube.com") ||
      hostname === "youtube-nocookie.com" ||
      hostname.endsWith(".youtube-nocookie.com")
    ) {
      const pathParts = parsedUrl.pathname.split("/").filter(Boolean)

      if (pathParts[0] === "watch") {
        videoId = parsedUrl.searchParams.get("v") ?? ""
      } else if (["embed", "live", "shorts"].includes(pathParts[0])) {
        videoId = pathParts[1] ?? ""
      }
    }

    return YOUTUBE_VIDEO_ID_PATTERN.test(videoId) ? videoId : null
  } catch {
    return null
  }
}

/**
 * Converts a Google Drive sharing URL to a direct image URL
 * @param url - Google Drive sharing URL (e.g., https://drive.google.com/file/d/FILE_ID/view?usp=sharing)
 * @returns Direct image URL (e.g., https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000)
 */
export function convertGoogleDriveUrl(url: string): string {
  if (!url) return url

  // Check if it's a Google Drive URL with file ID
  const fileIdMatch = url.match(/\/file\/d\/([^/]+)/)

  if (fileIdMatch && fileIdMatch[1]) {
    const fileId = fileIdMatch[1]
    // Keep the source asset large enough for desktop layouts without always
    // pulling the original, oversized Drive image.
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`
  }

  // Return original URL if it's not a Google Drive sharing link
  return url
}
