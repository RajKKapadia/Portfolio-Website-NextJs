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
