"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsVisible(false), 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-4xl font-orbitron font-bold text-cyan-400 mb-4">
            TUTANKHAMAL
          </div>
          <div className="text-lg text-gray-400">Loading...</div>
        </div>
        
        <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-4 text-cyan-400 font-mono">
          {progress}%
        </div>
      </div>
    </div>
  )
}