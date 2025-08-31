"use client"

import { useEffect, useRef, useState } from "react"
import { type Locale, getTranslations } from "@/lib/i18n"

interface StatsProps {
  locale?: Locale
}

export default function Stats({ locale = "pt" }: StatsProps) {
  const [visibleStats, setVisibleStats] = useState<number[]>([])
  const [animatedValues, setAnimatedValues] = useState<number[]>(new Array(4).fill(0))
  const sectionRef = useRef<HTMLElement>(null)
  const t = getTranslations(locale)

  const stats = [
    { number: 50, label: t.stats.projects, suffix: "+" },
    { number: 15, label: t.stats.experience, suffix: "+" },
    { number: 20, label: t.stats.clients, suffix: "+" },
    { number: 99, label: t.stats.success, suffix: "%" },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            if (!visibleStats.includes(index)) {
              setVisibleStats((prev) => [...prev, index])
              animateCounter(index, stats[index].number)
            }
          }
        })
      },
      { threshold: 0.5 },
    )

    const statItems = sectionRef.current?.querySelectorAll(".stat-item")
    statItems?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [visibleStats]) // Removed stats from dependencies

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

  return (
    <section ref={sectionRef} className="py-16 bg-[#0a0a0a] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              data-index={index}
              className="stat-item text-center p-6 cyber-card rounded-xl hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all duration-300"
            >
              <div className="font-orbitron text-3xl lg:text-4xl font-bold text-[#00ffff] mb-2">
                {animatedValues[index]}
                {stat.suffix}
              </div>
              <div className="text-[#cccccc] text-sm font-medium tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
