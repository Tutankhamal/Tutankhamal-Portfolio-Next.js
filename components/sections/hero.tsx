"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { type Locale, getTranslations } from "@/lib/i18n"

interface HeroProps {
  locale?: Locale
}

export default function Hero({ locale = "pt" }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)
  const t = getTranslations(locale)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const codeLines = [
    "const developer = {",
    "  name: 'Tutankhamal',",
    "  skills: ['React', 'Next.js'],",
    "  passion: 'Innovation'",
    "};",
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 sm:pt-28 md:pt-32 lg:pt-20"
      style={{
        background: "radial-gradient(ellipse at center, rgba(0, 255, 255, 0.1) 0%, transparent 70%), #0a0a0a",
      }}
    >
      {/* Cyber Grid Background */}
      <div className="cyber-grid"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className={`text-center lg:text-left ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6">
              <span className="block text-white glow-text">{t.hero.title}</span>
              <span className="block text-gradient">{t.hero.subtitle}</span>
            </h1>

            <p className="text-xl sm:text-2xl text-[#cccccc] mb-6 font-light tracking-wide">{t.hero.role}</p>

            <p className="text-lg text-[#888888] mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">{t.hero.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-transparent border-2 border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] transition-all duration-300 hover:-translate-y-1 font-semibold tracking-wide"
                style={{ boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)" }}
                onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t.hero.viewProjects}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] transition-all duration-300 hover:-translate-y-1 font-semibold tracking-wide bg-transparent"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t.hero.contact}
              </Button>
            </div>
          </div>

          {/* Visual Content */}
          <div className={`flex justify-center ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <div
                className="w-full h-full border-2 border-[#00ffff] rounded-2xl overflow-hidden animate-pulse-border"
                style={{
                  background: "rgba(0, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="w-full h-full flex items-center justify-center p-8">
                  <div className="font-mono text-[#00ffff] text-left text-sm lg:text-base leading-relaxed">
                    {codeLines.map((line, index) => (
                      <div
                        key={index}
                        className="opacity-0 animate-typewriter"
                        style={{ animationDelay: `${0.5 + index * 0.5}s` }}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[#888888] animate-bounce-slow">
        <span className="text-xs tracking-widest mb-2">{t.hero.scroll}</span>
        <ChevronDown size={20} />
      </div>
    </section>
  )
}
