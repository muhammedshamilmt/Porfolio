"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Zap, Code2, Database, Cloud, Palette, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TechItem {
  name: string
  icon: string
  description: string
  category: string
  color: string
}

export function TechStack() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const techStacks = [
    [
      {
        name: "React",
        icon: "⚛️",
        description: "Frontend Library",
        category: "Frontend",
        color: "from-cyan-400 to-blue-500",
      },
      {
        name: "Next.js",
        icon: "▲",
        description: "React Framework",
        category: "Frontend",
        color: "from-gray-600 to-gray-800",
      },
      {
        name: "TypeScript",
        icon: "🔷",
        description: "Type Safety",
        category: "Frontend",
        color: "from-blue-500 to-blue-700",
      },
      {
        name: "Tailwind",
        icon: "🎨",
        description: "CSS Framework",
        category: "Frontend",
        color: "from-teal-400 to-cyan-500",
      },
      {
        name: "Vue.js",
        icon: "💚",
        description: "Progressive Framework",
        category: "Frontend",
        color: "from-green-400 to-emerald-500",
      },
    ],
    [
      {
        name: "Node.js",
        icon: "🟢",
        description: "JavaScript Runtime",
        category: "Backend",
        color: "from-green-500 to-green-700",
      },
      {
        name: "Express",
        icon: "🚀",
        description: "Backend Framework",
        category: "Backend",
        color: "from-purple-500 to-purple-700",
      },
      {
        name: "Python",
        icon: "🐍",
        description: "Programming Language",
        category: "Backend",
        color: "from-yellow-400 to-orange-500",
      },
      {
        name: "MongoDB",
        icon: "🍃",
        description: "NoSQL Database",
        category: "Database",
        color: "from-green-500 to-teal-600",
      },
      {
        name: "PostgreSQL",
        icon: "🐘",
        description: "SQL Database",
        category: "Database",
        color: "from-blue-600 to-indigo-700",
      },
    ],
    [
      {
        name: "AWS",
        icon: "☁️",
        description: "Cloud Platform",
        category: "Cloud",
        color: "from-orange-400 to-red-500",
      },
      {
        name: "Docker",
        icon: "🐳",
        description: "Containerization",
        category: "DevOps",
        color: "from-blue-500 to-cyan-600",
      },
      {
        name: "Figma",
        icon: "🎭",
        description: "Design Tool",
        category: "Design",
        color: "from-purple-400 to-pink-500",
      },
      {
        name: "Git",
        icon: "🌿",
        description: "Version Control",
        category: "Tools",
        color: "from-orange-500 to-red-600",
      },
      {
        name: "Vercel",
        icon: "▲",
        description: "Deployment Platform",
        category: "Cloud",
        color: "from-gray-700 to-black",
      },
    ],
  ]

  const totalSlides = techStacks.length

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 5000)

    return () => clearInterval(interval)
  }, [totalSlides])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const categoryIcons = {
    Frontend: Code2,
    Backend: Database,
    Database: Database,
    Cloud: Cloud,
    Design: Palette,
    Tools: Settings,
    DevOps: Settings,
  }

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-950"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div
          className="absolute w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl floating-3d"
          style={{
            left: `${20 + (mousePosition.x / window.innerWidth) * 10}%`,
            top: `${10 + (mousePosition.y / window.innerHeight) * 10}%`,
          }}
        ></div>
        <div
          className="absolute w-96 h-96 bg-purple-400/10 rounded-full blur-3xl floating-3d"
          style={{
            right: `${15 + (mousePosition.x / window.innerWidth) * 8}%`,
            bottom: `${15 + (mousePosition.y / window.innerHeight) * 8}%`,
          }}
        ></div>

        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float-loop"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          ></div>
        ))}

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4 floating-3d">
            Tech{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-text-glow">
              Arsenal
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powered by <span className="text-cyan-400 font-semibold">15+</span> cutting-edge technologies
          </p>
        </div>

        {/* Main Container */}
        <div
          className={`glass-card-enhanced rounded-3xl p-8 lg:p-12 relative transition-all duration-1000 depth-shadow ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Navigation Arrows */}
          <Button
            onClick={prevSlide}
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-white hover:bg-cyan-400/20 z-20 glass-effect border border-cyan-400/30 tilt-3d"
          >
            <ChevronLeft size={24} />
          </Button>

          <Button
            onClick={nextSlide}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-white hover:bg-cyan-400/20 z-20 glass-effect border border-cyan-400/30 tilt-3d"
          >
            <ChevronRight size={24} />
          </Button>

          {/* Tech Stack Carousel */}
          <div className="relative overflow-hidden mb-8">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {techStacks.map((stack, stackIndex) => (
                <div key={stackIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {stack.map((tech, techIndex) => {
                      const IconComponent = categoryIcons[tech.category as keyof typeof categoryIcons] || Code2
                      return (
                        <div
                          key={tech.name}
                          className={`group glass-card rounded-2xl p-6 text-center hover:glass-card-enhanced transition-all duration-500 hover:scale-105 card-3d depth-shadow border border-gray-700/50 hover:border-cyan-400/30 ${
                            isVisible ? "animate-fade-in-up" : "opacity-0"
                          }`}
                          style={{
                            animationDelay: `${stackIndex * 200 + techIndex * 100}ms`,
                          }}
                        >
                          {/* Tech Icon */}
                          <div className="relative mb-4">
                            <div
                              className={`w-16 h-16 mx-auto bg-gradient-to-r ${tech.color} rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-all duration-300 floating-3d shadow-lg`}
                            >
                              {tech.icon}
                            </div>
                            <div className="absolute -top-1 -right-1">
                              <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                                <IconComponent size={12} className="text-white" />
                              </div>
                            </div>
                          </div>

                          {/* Tech Name */}
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                            {tech.name}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-3">
                            {tech.description}
                          </p>

                          {/* Category Badge */}
                          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 border border-cyan-400/30 text-xs text-cyan-400 font-medium">
                            {tech.category}
                          </div>

                          {/* Hover Glow Effect */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 to-purple-400/0 group-hover:from-cyan-400/5 group-hover:to-purple-400/5 transition-all duration-500 pointer-events-none"></div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-4 mb-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse-glow"
                    : "w-3 h-3 bg-gray-600 hover:bg-gray-500 rounded-full hover:scale-125"
                }`}
              >
                {index === currentSlide && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-sm opacity-50"></div>
                )}
              </button>
            ))}
          </div>

          {/* Description */}
          <div className="text-center">
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Crafting digital experiences with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold">
                cutting-edge technologies
              </span>
              <br />
              and their transformative capabilities.
            </p>
          </div>

          {/* Background Decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl floating-3d"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/5 rounded-full blur-2xl floating-3d"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/3 to-purple-400/3 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`mt-16 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card rounded-2xl p-6 text-center border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 card-3d depth-shadow">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                15+
              </div>
              <div className="text-gray-300 text-sm">Technologies</div>
            </div>

            <div className="glass-card rounded-2xl p-6 text-center border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 card-3d depth-shadow">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
                6
              </div>
              <div className="text-gray-300 text-sm">Categories</div>
            </div>

            <div className="glass-card rounded-2xl p-6 text-center border border-green-400/20 hover:border-green-400/40 transition-all duration-300 card-3d depth-shadow">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 mb-2">
                4+
              </div>
              <div className="text-gray-300 text-sm">Years Experience</div>
            </div>

            <div className="glass-card rounded-2xl p-6 text-center border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 card-3d depth-shadow">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
                50+
              </div>
              <div className="text-gray-300 text-sm">Projects Built</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="glass-card-enhanced rounded-3xl p-8 border border-cyan-400/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Build Something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Extraordinary?
              </span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's combine these powerful technologies to create your next digital masterpiece.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 tilt-3d depth-shadow"
              >
                <Zap className="mr-2" size={20} />
                Start Project
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-3 glass-effect border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-semibold rounded-full transition-all duration-300 hover:scale-105 tilt-3d depth-shadow"
              >
                <Code2 className="mr-2" size={20} />
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
