"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Users, Eye, Video, MessageCircle, ThumbsUp, Clock } from "lucide-react"
import { type Locale, getTranslations } from "@/lib/i18n"

interface YouTubeProps {
  locale?: Locale
}

interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  viewCount: number
  publishedAt: string
  isLive?: boolean
}

interface YouTubeStats {
  subscribers: number
  views: number
  videos: number
  likes: number
  comments: number
  watchTime: number
  latestVideo: YouTubeVideo
  popularVideos: YouTubeVideo[]
}

export default function YouTube({ locale = "pt" }: YouTubeProps) {
  const [stats, setStats] = useState<YouTubeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const t = getTranslations(locale)

  const channelId = "UCLubOgcZY59EYBTKXNTPgbA"
  const channelUrl = `https://www.youtube.com/channel/${channelId}`

  useEffect(() => {
    const fetchYouTubeData = async () => {
      try {
        const response = await fetch("/api/youtube")
        if (!response.ok) {
          throw new Error("Failed to fetch YouTube data")
        }
        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchYouTubeData()
  }, [])



  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#00ffff] mx-auto mb-4"></div>
          <p className="text-[#cccccc] text-lg">{t.youtube.loading}</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-[#cccccc] text-lg">{t.youtube.error}</p>
          <p className="text-red-400 text-sm mt-2">{error}</p>
        </div>
      </section>
    )
  }



  return (
    <section ref={sectionRef} className="min-h-screen bg-[#0a0a0a] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-orbitron text-4xl lg:text-6xl font-bold text-white mb-4 glow-text">
            {t.youtube.title}
          </h1>
          <p className="text-xl text-[#cccccc] mb-2">{t.youtube.subtitle}</p>
          <p className="text-[#888888] max-w-2xl mx-auto">{t.youtube.description}</p>
        </div>

        {/* YouTube Channel Info */}
        <div className="mb-12 text-center">
          <div className="cyber-card rounded-xl p-6 mb-8 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-300">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#ff0000] to-[#cc0000] rounded-full flex items-center justify-center mr-4">
                <Play className="text-white text-2xl" fill="white" />
              </div>
              <div className="text-left">
                <h2 className="font-orbitron text-xl font-bold text-white mb-1">TUTANKHAMAL</h2>
                <p className="text-[#cccccc]">{formatNumber(stats?.subscribers || 0)} {t.youtube.stats.subscribers}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-button bg-[#ff0000] hover:bg-[#cc0000] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,0,0.5)]"
              >
                {t.youtube.buttons.subscribe}
              </a>
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-button border-2 border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] px-6 py-2 rounded-lg font-medium transition-all duration-300"
              >
                {t.youtube.buttons.visitChannel}
              </a>
            </div>
          </div>
        </div>

        {/* Latest Video Player */}
        {stats?.latestVideo && (
          <div className="mb-16">
            <h2 className="font-orbitron text-2xl lg:text-3xl font-bold text-white mb-8 text-center">
              {stats.latestVideo.isLive 
                ? (locale === "pt" ? "🔴 AO VIVO" : "🔴 LIVE NOW")
                : (locale === "pt" ? "📺 Último Vídeo" : "📺 Latest Video")
              }
            </h2>
            <div className="cyber-card rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-300">
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${stats.latestVideo.id}?autoplay=0&rel=0`}
                  title={stats.latestVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <h3 className="font-orbitron text-xl font-bold text-white mb-2">
                  {stats.latestVideo.title}
                </h3>
                <div className="flex items-center justify-between text-[#cccccc] text-sm">
                  <span className="flex items-center">
                    <Eye className="mr-2" size={16} />
                    {formatNumber(stats.latestVideo.viewCount)} {locale === "pt" ? "visualizações" : "views"}
                  </span>
                  <span>{formatDate(stats.latestVideo.publishedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Popular Videos Grid */}
        {stats?.popularVideos && stats.popularVideos.length > 0 && (
          <div>
            <h2 className="font-orbitron text-2xl lg:text-3xl font-bold text-white mb-8 text-center">
              {locale === "pt" ? "🔥 Vídeos Mais Populares" : "🔥 Most Popular Videos"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.popularVideos.map((video, index) => (
                <div
                  key={video.id}
                  className="cyber-card rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all duration-300 cursor-pointer"
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank')}
                >
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <Play className="text-white text-4xl" fill="white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-white mb-2 line-clamp-2 text-sm">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-[#cccccc] text-xs">
                      <span className="flex items-center">
                        <Eye className="mr-1" size={12} />
                        {formatNumber(video.viewCount)}
                      </span>
                      <span>{formatDate(video.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-[#cccccc] mb-6 text-lg">
            {locale === "pt" 
              ? "Gostou do conteúdo? Inscreva-se no canal para não perder nenhum vídeo!"
              : "Enjoyed the content? Subscribe to the channel to not miss any videos!"}
          </p>
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cyber-button bg-gradient-to-r from-[#ff0000] to-[#cc0000] hover:from-[#cc0000] hover:to-[#990000] text-white px-12 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] transform hover:scale-105"
          >
            🔔 {t.youtube.buttons.subscribe}
          </a>
        </div>
      </div>
    </section>
  )
}