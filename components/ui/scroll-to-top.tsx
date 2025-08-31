"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 bg-transparent border-2 border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] p-3 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:scale-110 shadow-lg"
      style={{ boxShadow: "0 0 15px rgba(0, 255, 255, 0.4)" }}
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  )
}