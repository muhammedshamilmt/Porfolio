"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search, Zap, Code, Palette } from "lucide-react"

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)

    // Glitch effect for 404 text
    const glitchInterval = setInterval(() => {
      const glitchChars = ["4", "0", "4", "█", "▓", "▒", "░", "▄", "▀"]
      const randomText = Array.from(
        { length: 3 },
        () => glitchChars[Math.floor(Math.random() * glitchChars.length)],
      ).join("")

      setGlitchText(randomText)
      setTimeout(() => setGlitchText("404"), 150)
    }, 3000)

    // Mouse tracking for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      clearInterval(glitchInterval)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const suggestions = [
    { title: "Home", href: "/", icon: Home, description: "Back to main portfolio" },
    { title: "Projects", href: "/projects", icon: Zap, description: "View my latest work" },
    { title: "Blog", href: "/blog", icon: Search, description: "Read my articles" },
    { title: "Showcase", href: "/showcase", icon: Palette, description: "Design gallery" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        {/* Large gradient orbs */}
        <div
          className="absolute w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse floating-3d"
          style={{
            top: `${10 + mousePosition.y * 0.05}%`,
            left: `${5 + mousePosition.x * 0.05}%`,
            transform: `translate(-50%, -50%)`,
          }}
        ></div>
        <div
          className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000 floating-3d"
          style={{
            bottom: `${15 + mousePosition.y * 0.03}%`,
            right: `${10 + mousePosition.x * 0.03}%`,
            transform: `translate(50%, 50%)`,
          }}
        ></div>

        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse"
            style={{
              top: `${particle.y}%`,
              left: `${particle.x}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}

        {/* Geometric shapes */}
        <div className="absolute top-20 left-20 w-8 h-8 border-2 border-cyan-400/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-purple-400/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-4 h-4 border-2 border-pink-400/30 animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-10 h-10 border border-cyan-400/20 rotate-12 animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* 404 Text with Advanced Glitch Effect */}
        <div className="relative mb-12">
          <div className="relative">
            <h1
              className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent select-none floating-3d"
              style={{
                textShadow: "0 0 50px rgba(6, 182, 212, 0.3)",
                filter: "drop-shadow(0 0 30px rgba(168, 85, 247, 0.2))",
              }}
            >
              {glitchText}
            </h1>
            {/* Glitch layers */}
            <div className="absolute inset-0 text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-red-500/20 animate-pulse -translate-x-1">
              404
            </div>
            <div className="absolute inset-0 text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-blue-500/20 animate-pulse translate-x-1">
              404
            </div>
          </div>

          {/* Scan line effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-2 animate-scan"></div>
        </div>

        {/* Error Message */}
        <div className="mb-16 max-w-3xl space-y-6">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 floating-3d">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Page Not Found
              </span>
            </h2>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-lg blur opacity-30"></div>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Oops! It seems like you've wandered into the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold">
              digital void
            </span>
            . The page you're looking for has been{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
              relocated to another dimension
            </span>{" "}
            or never existed in this reality.
          </p>

          <div className="flex items-center justify-center space-x-2 text-gray-500 font-mono text-sm">
            <Code size={16} />
            <span>ERROR_CODE: DIMENSION_NOT_FOUND_0x404</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mb-16">
          <Link href="/">
            <Button
              size="lg"
              className="relative bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <Home className="mr-3 group-hover:rotate-12 transition-transform duration-300" size={24} />
              <span className="relative z-10">Return Home</span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
            </Button>
          </Link>

          <Button
            onClick={() => window.history.back()}
            variant="outline"
            size="lg"
            className="relative border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-105 bg-black/50 px-10 py-4 rounded-xl group overflow-hidden backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-cyan-400/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
            <ArrowLeft className="mr-3 group-hover:-translate-x-2 transition-transform duration-300" size={24} />
            <span className="relative z-10">Go Back</span>
          </Button>
        </div>

        {/* Quick Navigation Cards */}
        <div className="w-full max-w-6xl">
          <h3 className="text-2xl font-bold text-white mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Or explore these sections:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestions.map((item, index) => (
              <Link key={index} href={item.href}>
                <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gradient-to-br hover:from-gray-800/80 hover:to-gray-700/80 transition-all duration-500 hover:scale-105 hover:border-cyan-400/50 card-3d depth-shadow overflow-hidden">
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Icon */}
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-16 text-center space-y-2">
          <p className="text-gray-500 text-sm font-mono">
            {"// Lost in the matrix? Don't worry, it happens to the best of us."}
          </p>
          <p className="text-gray-600 text-xs">If you believe this is an error, please contact the administrator.</p>
        </div>
      </div>

      {/* Floating geometric elements */}
      
    </div>
  )
}
