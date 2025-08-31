"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Users, Eye, Video, MessageCircle, ThumbsUp, Clock } from "lucide-react"
import { type Locale, getTranslations } from "@/lib/i18n"

interface YouTubeProps {
  locale?: Locale
}

interface YouTubeStats {
  subscribers: number
  views: number
  videos: number
  likes: number
  comments: number
  watchTime: number
}

export default function YouTube({ locale = "pt" }: YouTubeProps) {
  const [stats, setStats] = useState<YouTubeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visibleStats, setVisibleStats] = useState<number[]>([])
  const [animatedValues, setAnimatedValues] = useState<number[]>(new Array(6).fill(0))
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

  useEffect(() => {
    if (!stats) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            if (!visibleStats.includes(index)) {
              setVisibleStats((prev) => [...prev, index])
              const statValues = [
                stats.subscribers,
                stats.views,
                stats.videos,
                stats.likes,
                stats.comments,
                stats.watchTime,
              ]
              animateCounter(index, statValues[index])
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    const statItems = sectionRef.current?.querySelectorAll(".stat-item")
    statItems?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [stats, visibleStats])

  const animateCounter = (index: number, target: number) => {
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(timer)
      }

      setAnimatedValues((prev) => {
        const newValues = [...prev]
        newValues[index] = Math.floor(current)
        return newValues
      })
    }, 16)
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  const formatWatchTime = (hours: number): string => {
    if (hours >= 1000) {
      return (hours / 1000).toFixed(1) + "K"
    }
    return hours.toString()
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

  const statsData = [
    {
      icon: Users,
      value: animatedValues[0],
      label: t.youtube.stats.subscribers,
      formatter: formatNumber,
      color: "text-[#ff0000]",
    },
    {
      icon: Eye,
      value: animatedValues[1],
      label: t.youtube.stats.views,
      formatter: formatNumber,
      color: "text-[#00ffff]",
    },
    {
      icon: Video,
      value: animatedValues[2],
      label: t.youtube.stats.videos,
      formatter: (num: number) => num.toString(),
      color: "text-[#ff00ff]",
    },
    {
      icon: ThumbsUp,
      value: animatedValues[3],
      label: t.youtube.stats.likes,
      formatter: formatNumber,
      color: "text-[#00ff00]",
    },
    {
      icon: MessageCircle,
      value: animatedValues[4],
      label: t.youtube.stats.comments,
      formatter: formatNumber,
      color: "text-[#ffff00]",
    },
    {
      icon: Clock,
      value: animatedValues[5],
      label: t.youtube.stats.watchTime,
      formatter: formatWatchTime,
      color: "text-[#ff8800]",
    },
  ]

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#0a0a0a] py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-orbitron text-4xl lg:text-6xl font-bold text-white mb-4 glow-text">
            {t.youtube.title}
          </h1>
          <p className="text-xl text-[#cccccc] mb-2">{t.youtube.subtitle}</p>
          <p className="text-[#888888] max-w-2xl mx-auto">{t.youtube.description}</p>
        </div>

        {/* YouTube Channel Preview */}
        <div className="mb-16 text-center">
          <div className="cyber-card rounded-xl p-8 mb-8 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-300">
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#ff0000] to-[#cc0000] rounded-full flex items-center justify-center mr-6">
                <Play className="text-white text-3xl" fill="white" />
              </div>
              <div className="text-left">
                <h2 className="font-orbitron text-2xl font-bold text-white mb-2">TUTANKHAMAL</h2>
                <p className="text-[#cccccc]">{formatNumber(stats?.subscribers || 0)} {t.youtube.stats.subscribers}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-button bg-[#ff0000] hover:bg-[#cc0000] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,0,0.5)]"
              >
                {t.youtube.buttons.subscribe}
              </a>
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-button border-2 border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] px-8 py-3 rounded-lg font-medium transition-all duration-300"
              >
                {t.youtube.buttons.visitChannel}
              </a>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={index}
                data-index={index}
                className="stat-item cyber-card rounded-xl p-6 text-center hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <IconComponent className={`text-4xl ${stat.color}`} size={48} />
                </div>
                <div className={`font-orbitron text-3xl lg:text-4xl font-bold mb-2 glow-text ${stat.color}`}>
                  {stat.formatter(stat.value)}
                </div>
                <div className="text-[#cccccc] text-sm font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

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