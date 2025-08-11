"use client"

import { useState, useEffect } from "react"
import { type Locale, getTranslations } from "@/lib/i18n"

interface LoadingScreenProps {
  locale?: Locale
}

export default function LoadingScreen({ locale = "pt" }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const t = getTranslations(locale)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-[10000] transition-opacity duration-500">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-transparent border-t-[#00ffff] border-r-[#ff00ff] rounded-full animate-spin mx-auto mb-6"></div>
        <div className="font-orbitron text-sm tracking-[3px] text-[#cccccc] animate-pulse">{t.loading}</div>
      </div>
    </div>
  )
}
