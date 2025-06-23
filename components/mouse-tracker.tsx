"use client"

import { useEffect, useState } from "react"

export function MouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    window.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <>
      {/* Main cursor tracker - follows mouse */}
      <div
        className={`fixed pointer-events-none z-50 transition-all duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isClicking ? "scale-75" : "scale-100"}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Inner dot */}
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
      </div>

      {/* Outer ring tracker */}
      <div
        className={`fixed pointer-events-none z-40 transition-all duration-300 ease-out ${
          isVisible ? "opacity-60 scale-100" : "opacity-0 scale-50"
        } ${isClicking ? "scale-150" : "scale-100"}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Outer ring */}
        <div className="w-8 h-8 border-2 border-cyan-400/60 rounded-full animate-spin-slow"></div>
      </div>

      {/* Large glow effect */}
      <div
        className={`fixed pointer-events-none z-30 transition-all duration-500 ease-out ${
          isVisible ? "opacity-20 scale-100" : "opacity-0 scale-75"
        } ${isClicking ? "scale-125" : "scale-100"}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Glow ring */}
        <div className="w-16 h-16 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-full blur-md animate-pulse-slow"></div>
      </div>

      {/* Trail effect */}
      <div
        className={`fixed pointer-events-none z-20 transition-all duration-700 ease-out ${
          isVisible ? "opacity-15 scale-100" : "opacity-0 scale-90"
        }`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Trail ring */}
        <div className="w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-lg animate-float-gentle"></div>
      </div>

      {/* Click ripple effect */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-45 animate-ping"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-6 h-6 bg-cyan-400/40 rounded-full"></div>
        </div>
      )}
    </>
  )
}
