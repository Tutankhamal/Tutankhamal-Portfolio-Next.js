import { NextResponse } from "next/server"

interface YouTubeChannelResponse {
  items: Array<{
    statistics: {
      viewCount: string
      subscriberCount: string
      videoCount: string
      commentCount?: string
    }
  }>
}

interface YouTubeVideosResponse {
  items: Array<{
    statistics: {
      likeCount: string
      commentCount: string
    }
  }>
}

interface YouTubeAnalyticsResponse {
  rows: Array<Array<string | number>>
}

export async function GET() {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY
    const channelId = "UCLubOgcZY59EYBTKXNTPgbA"

    if (!apiKey) {
      return NextResponse.json(
        { error: "YouTube API key not configured" },
        { status: 500 }
      )
    }

    // Get channel statistics
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
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

    const videosData = await videosResponse.json()
    const videoIds = videosData.items.map((item: any) => item.id.videoId).join(",")

    // Get video statistics for likes and comments
    const videoStatsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${apiKey}`
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

    // For watch time, we'll use a placeholder since it requires YouTube Analytics API
    // which needs OAuth2 authentication
    const watchTimeHours = Math.floor(parseInt(stats.viewCount) / 1000) // Rough estimation

    const result = {
      subscribers: parseInt(stats.subscriberCount),
      views: parseInt(stats.viewCount),
      videos: parseInt(stats.videoCount),
      likes: totalLikes,
      comments: totalComments,
      watchTime: watchTimeHours,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("YouTube API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch YouTube data" },
      { status: 500 }
    )
  }
}