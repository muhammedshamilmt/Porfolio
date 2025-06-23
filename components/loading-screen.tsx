"use client"

import { useState, useEffect } from "react"

export function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  if (!loading) return null

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-32 h-32 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-8"></div>

        <h2 className="text-3xl font-bold text-white mb-4">Loading 3D Portfolio...</h2>

        <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto mb-4">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-gray-400">{Math.round(progress)}% Complete</p>
      </div>
    </div>
  )
}
