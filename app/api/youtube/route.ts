import { NextResponse } from "next/server"

// Cache interface
interface CacheEntry {
  data: any
  timestamp: number
}

// In-memory cache (for Vercel, this will be per-instance)
let cache: CacheEntry | null = null
const CACHE_DURATION = 3 * 60 * 60 * 1000 // 3 hours in milliseconds

// Function to check if cache is valid
function isCacheValid(): boolean {
  if (!cache) return false
  const now = Date.now()
  return (now - cache.timestamp) < CACHE_DURATION
}

// Function to get cached data
function getCachedData(): any | null {
  if (isCacheValid()) {
    return cache!.data
  }
  return null
}

// Function to set cache
function setCacheData(data: any): void {
  cache = {
    data,
    timestamp: Date.now()
  }
}

interface YouTubeChannelResponse {
  items: Array<{
    statistics: {
      viewCount: string
      subscriberCount: string
      videoCount: string
      commentCount?: string
    }
    snippet: {
      title: string
      description: string
      thumbnails: {
        high: {
          url: string
        }
        default: {
          url: string
        }
        medium: {
          url: string
        }
      }
    }
  }>
}

interface YouTubeVideo {
  id: {
    videoId: string
  }
  snippet: {
    title: string
    description: string
    thumbnails: {
      high: {
        url: string
      }
      maxres?: {
        url: string
      }
    }
    publishedAt: string
    liveBroadcastContent: string
  }
}

interface YouTubeVideosResponse {
  items: Array<{
    id: string
    statistics: {
      viewCount: string
      likeCount: string
      commentCount: string
    }
    snippet: {
      title: string
      description: string
      thumbnails: {
        high: {
          url: string
        }
        maxres?: {
          url: string
        }
      }
      publishedAt: string
      liveBroadcastContent: string
    }
  }>
}

interface YouTubeSearchResponse {
  items: YouTubeVideo[]
}

interface YouTubeAnalyticsResponse {
  rows: Array<Array<string | number>>
}

export async function GET() {
  try {
    // Check cache first
    const cachedData = getCachedData()
    if (cachedData) {
      return NextResponse.json(cachedData)
    }

    const apiKey = process.env.YOUTUBE_API_KEY
    const channelId = "UCLubOgcZY59EYBTKXNTPgbA"

    if (!apiKey || apiKey === "your-youtube-api-key-here") {
      // Return mock data when API key is not configured
      const mockData = {
        subscribers: 1250,
        views: 45000,
        videos: 28,
        likes: 3200,
        comments: 890,
        watchTime: 2100,
        latestVideo: {
          id: "dQw4w9WgXcQ",
          title: "Último Vídeo - Desenvolvimento Web Moderno",
          thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
          publishedAt: "2024-01-15T10:00:00Z",
          viewCount: 15420,
          isLive: false
        },
        popularVideos: [
          {
            id: "dQw4w9WgXcQ",
            title: "Tutorial Completo de React.js",
            thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            viewCount: 45230,
            publishedAt: "2023-12-10T14:30:00Z"
          },
          {
            id: "jNQXAC9IVRw",
            title: "Next.js 14 - Novidades e Features",
            thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
            viewCount: 38750,
            publishedAt: "2023-11-25T16:45:00Z"
          },
          {
            id: "9bZkp7q19f0",
            title: "TypeScript para Iniciantes",
            thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
            viewCount: 32100,
            publishedAt: "2023-10-15T12:20:00Z"
          },
          {
            id: "2Xc9gXyf2G4",
            title: "CSS Grid vs Flexbox",
            thumbnail: "https://img.youtube.com/vi/2Xc9gXyf2G4/maxresdefault.jpg",
            viewCount: 28900,
            publishedAt: "2023-09-30T09:15:00Z"
          },
          {
            id: "kJQP7kiw5Fk",
            title: "JavaScript ES2024 Features",
            thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
            viewCount: 25600,
            publishedAt: "2023-08-20T11:30:00Z"
          },
          {
            id: "DyFUGgetQtg",
            title: "Tailwind CSS Masterclass",
            thumbnail: "https://img.youtube.com/vi/DyFUGgetQtg/maxresdefault.jpg",
            viewCount: 22400,
            publishedAt: "2023-07-10T15:45:00Z"
          }
        ]
      }
      // Cache mock data as well
      setCacheData(mockData)
      return NextResponse.json(mockData)
    }

    // Get channel statistics and snippet (for thumbnail)
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${apiKey}`
    )

    if (!channelResponse.ok) {
      throw new Error(`Channel API error: ${channelResponse.status}`)
    }

    const channelData: YouTubeChannelResponse = await channelResponse.json()

    if (!channelData.items || channelData.items.length === 0) {
      throw new Error("Channel not found")
    }

    const stats = channelData.items[0].statistics

    // Get recent videos for additional stats
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&order=date&type=video&key=${apiKey}`
    )

    if (!videosResponse.ok) {
      throw new Error(`Videos API error: ${videosResponse.status}`)
    }

    const videosData: YouTubeSearchResponse = await videosResponse.json()
    const videoIds = videosData.items.map((item) => item.id.videoId).join(",")

    // Get video statistics for likes and comments
    const videoStatsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${apiKey}`
    )

    if (!videoStatsResponse.ok) {
      throw new Error(`Video stats API error: ${videoStatsResponse.status}`)
    }

    const videoStatsData: YouTubeVideosResponse = await videoStatsResponse.json()

    // Calculate total likes and comments from recent videos
    let totalLikes = 0
    let totalComments = 0

    videoStatsData.items.forEach((video) => {
      totalLikes += parseInt(video.statistics.likeCount || "0")
      totalComments += parseInt(video.statistics.commentCount || "0")
    })

    // Get latest video (first in the list)
    const latestVideo = videoStatsData.items[0]
    const latestVideoData = {
      id: latestVideo.id,
      title: latestVideo.snippet.title,
      thumbnail: latestVideo.snippet.thumbnails.maxres?.url || latestVideo.snippet.thumbnails.high.url,
      publishedAt: latestVideo.snippet.publishedAt,
      viewCount: parseInt(latestVideo.statistics.viewCount || "0"),
      isLive: latestVideo.snippet.liveBroadcastContent === "live"
    }

    // Get popular videos (sorted by view count)
    const popularVideos = videoStatsData.items
      .sort((a, b) => parseInt(b.statistics.viewCount || "0") - parseInt(a.statistics.viewCount || "0"))
      .slice(0, 6)
      .map(video => ({
        id: video.id,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url,
        viewCount: parseInt(video.statistics.viewCount || "0"),
        publishedAt: video.snippet.publishedAt
      }))

    // For watch time, we'll use a placeholder since it requires YouTube Analytics API
    // which needs OAuth2 authentication
    const watchTimeHours = Math.floor(parseInt(stats.viewCount) / 1000) // Rough estimation

    const channelSnippet = channelData.items[0].snippet
    
    const result = {
      subscribers: parseInt(stats.subscriberCount),
      views: parseInt(stats.viewCount),
      videos: parseInt(stats.videoCount),
      likes: totalLikes,
      comments: totalComments,
      watchTime: watchTimeHours,
      channelThumbnail: channelSnippet.thumbnails.high.url,
      latestVideo: latestVideoData,
      popularVideos: popularVideos,
    }

    // Cache the result before returning
    setCacheData(result)
    return NextResponse.json(result)
  } catch (error) {
    console.error("YouTube API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch YouTube data" },
      { status: 500 }
    )
  }
}