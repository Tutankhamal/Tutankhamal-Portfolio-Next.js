"use client"

import { useEffect, useRef, useState } from "react"
import { Code, Bot, Cloud, ShoppingCart, Server, Palette } from "lucide-react"
import { type Locale, getTranslations } from "@/lib/i18n"

interface SkillsProps {
  locale?: Locale
}

export default function Skills({ locale = "pt" }: SkillsProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const t = getTranslations(locale)

  const skills = [
    {
      icon: Code,
      title: t.skills.items.frontend.title,
      description: t.skills.items.frontend.description,
      progress: 98,
    },
    {
      icon: Server,
      title: t.skills.items.backend.title,
      description: t.skills.items.backend.description,
      progress: 95,
    },
    {
      icon: Bot,
      title: t.skills.items.discord.title,
      description: t.skills.items.discord.description,
      progress: 100,
    },
    {
      icon: Cloud,
      title: t.skills.items.devops.title,
      description: t.skills.items.devops.description,
      progress: 85,
    },
    {
      icon: ShoppingCart,
      title: t.skills.items.ecommerce.title,
      description: t.skills.items.ecommerce.description,
      progress: 95,
    },
    {
      icon: Palette,
      title: t.skills.items.design.title,
      description: t.skills.items.design.description,
      progress: 95,
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleItems((prev) => [...prev, index])
          }
        })
      },
      { threshold: 0.1 },
    )

    const skillCards = sectionRef.current?.querySelectorAll(".skill-card")
    skillCards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-[#111111] relative overflow-hidden">
      <div className="cyber-grid opacity-30"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl lg:text-5xl font-bold text-white mb-6 glitch-matrix glitch-scanlines" data-text={t.skills.title}>{t.skills.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00ffff] to-[#8b5cf6] mx-auto"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              data-index={index}
              className={`skill-card cyber-card rounded-2xl p-8 text-center transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] group ${
                visibleItems.includes(index) ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              {/* Icon */}
              <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center border-2 border-[#00ffff] rounded-full bg-[#00ffff]/10 group-hover:bg-[#00ffff]/20 transition-all duration-300">
                <skill.icon size={32} className="text-[#00ffff]" />
                <div className="absolute inset-0 rounded-full bg-[#00ffff] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00ffff] transition-colors duration-300">
                {skill.title}
              </h3>
              <p className="text-[#cccccc] mb-6 leading-relaxed">{skill.description}</p>

              {/* Progress Bar */}
              <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00ffff] to-[#8b5cf6] transition-all duration-1000 ease-out"
                  style={{
                    width: visibleItems.includes(index) ? `${skill.progress}%` : "0%",
                  }}
                ></div>
              </div>
              <div className="text-right mt-2">
                <span className="text-[#00ffff] text-sm font-medium">{skill.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
