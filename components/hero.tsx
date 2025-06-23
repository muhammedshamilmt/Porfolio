"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Code, Palette, Zap, Github, Linkedin, Mail } from "lucide-react"

export function Hero() {
  const [text, setText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const titles = ["Website Developer", "Frontend Expert", "UI/UX Designer", "Full Stack Developer"]

  useEffect(() => {
    const currentTitle = titles[currentIndex]
    let index = 0

    const timer = setInterval(() => {
      setText(currentTitle.slice(0, index))
      index++
      if (index > currentTitle.length) {
        clearInterval(timer)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % titles.length)
        }, 2000)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [currentIndex])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse floating-3d"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000 floating-3d"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400/3 rounded-full blur-3xl animate-pulse delay-2000 floating-3d"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-cyan-400 tilt-3d">
                <Code size={20} />
                <span className="text-sm font-medium tracking-wider uppercase animate-pulse">Hello, I'm</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight floating-3d">
                
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Muhammed Shamil MT</span>
              </h1>

              <div className="text-3xl lg:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 min-h-[3rem] tilt-3d">
                {text}
                <span className="animate-pulse">|</span>
              </div>

              <p className="text-xl text-gray-300 max-w-2xl leading-relaxed card-3d">
                I create stunning, responsive websites that combine beautiful design with powerful functionality.
                Specializing in modern web technologies to bring your digital vision to life.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: "⚛️", name: "React", color: "from-blue-400 to-cyan-400" },
                { icon: "🔷", name: "TypeScript", color: "from-blue-600 to-blue-400" },
                { icon: "🎨", name: "Tailwind", color: "from-cyan-400 to-teal-400" },
                { icon: "⚡", name: "Next.js", color: "from-gray-700 to-gray-900" },
                { icon: "🚀", name: "Node.js", color: "from-green-400 to-green-600" },
                { icon: "📱", name: "Mobile", color: "from-purple-400 to-pink-400" },
              ].map((tech, index) => (
                <div
                  key={tech.name}
                  className={`group flex items-center space-x-2 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-full px-4 py-2 hover:scale-105 hover:bg-gray-900/50 transition-all duration-300 cursor-pointer card-3d depth-shadow`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-lg group-hover:animate-bounce">{tech.icon}</span>
                  <span className="text-gray-300 text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("#projects")}
                className="group bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 tilt-3d depth-shadow"
              >
                <Zap className="mr-2 group-hover:animate-pulse" size={20} />
                View My Work
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("#contact")}
                className="group border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25 tilt-3d depth-shadow"
              >
                <Palette className="mr-2 group-hover:animate-pulse" size={20} />
                Let's Talk
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "#", label: "Email" },
              ].map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-gray-900/50 hover:scale-110 transition-all duration-300 card-3d depth-shadow"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div
              className="flex items-center space-x-2 text-gray-400 animate-bounce cursor-pointer tilt-3d"
              onClick={() => scrollToSection("#about")}
            >
              <ArrowDown size={20} />
              <span className="text-sm">Scroll to explore</span>
            </div>
          </div>

          {/* Right Side - Your Image */}
          <div className="relative animate-fade-in-right">
            <div className="relative z-10">
              <div className="w-full max-w-lg mx-auto">
                <div className="relative group tilt-3d">
                  {/* Glowing background effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500 floating-3d"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur opacity-30 group-hover:opacity-50 transition-all duration-500"></div>

                  {/* Image container */}
                  <div className="relative bg-black/80 backdrop-blur-sm rounded-full p-2 border border-gray-800 group-hover:border-gray-700 transition-all duration-500 depth-shadow">
                    <div className="relative overflow-hidden rounded-full">
                      <img
                        src="/shamil.png?height=600&width=500"
                        alt="Your Name - Website Developer"
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>

                    {/* Floating badges */}
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-400 to-cyan-500 text-black p-3 rounded-full animate-pulse shadow-lg shadow-cyan-400/50 floating-3d">
                      <Code size={24} />
                    </div>

                    <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-400 to-purple-500 text-black p-3 rounded-full animate-pulse delay-1000 shadow-lg shadow-purple-400/50 floating-3d">
                      <Palette size={24} />
                    </div>

                    <div className="absolute top-1/2 -right-6 bg-gradient-to-r from-pink-400 to-pink-500 text-black p-2 rounded-full animate-pulse delay-2000 shadow-lg shadow-pink-400/50 floating-3d">
                      <Zap size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute top-1/4 -right-8 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl animate-pulse floating-3d"></div>
            <div className="absolute bottom-1/4 -left-8 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000 floating-3d"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-pink-400/10 rounded-full blur-xl animate-pulse delay-2000 floating-3d"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
