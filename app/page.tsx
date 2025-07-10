"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock, Sparkles } from "lucide-react"

export default function ComingSoonPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-950 via-black to-purple-950 px-4 relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400/10 rounded-full blur-2xl animate-pulse delay-2000"></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full px-6 py-2 mb-6">
          <Sparkles className="text-cyan-400 animate-bounce" size={20} />
          <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">Work in Progress</span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
          Coming <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Soon</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          This page is under construction and will be available soon. I'm working hard to bring you something amazing!
        </p>
        <Clock className="mx-auto text-cyan-400 animate-spin mb-8" size={48} />
        <Link href="/">
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25">
            Back to Home
          </Button>
        </Link>
      </div>
    </section>
  )
} 
