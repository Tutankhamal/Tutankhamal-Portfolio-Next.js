"use client"

import { useEffect, useRef } from "react"

export default function ParticleSystem() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createParticle = () => {
      const particle = document.createElement("div")
      particle.className = "particle"

      // Random position
      particle.style.position = "absolute"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.width = "2px"
      particle.style.height = "2px"
      particle.style.borderRadius = "50%"
      particle.style.pointerEvents = "none"

      // Random color
      const colors = ["#00ffff", "#ff00ff", "#ffff00", "#0080ff"]
      particle.style.background = colors[Math.floor(Math.random() * colors.length)]

      // Animation
      particle.style.animation = `float ${Math.random() * 3 + 3}s ease-in-out infinite`
      particle.style.animationDelay = Math.random() * 2 + "s"

      container.appendChild(particle)

      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      }, 8000)
    }

    // Create particles periodically
    const interval = setInterval(createParticle, 300)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" style={{ overflow: "hidden" }} />
}
