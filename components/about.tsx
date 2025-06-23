"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { User, Award, Coffee, Heart, Code2, Palette, Zap, Globe } from "lucide-react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
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

  const stats = [
    { icon: Award, label: "Projects Completed", value: "50+", color: "from-cyan-400 to-blue-500" },
    { icon: User, label: "Happy Clients", value: "30+", color: "from-purple-400 to-pink-500" },
    { icon: Coffee, label: "Cups of Coffee", value: "1000+", color: "from-orange-400 to-red-500" },
    { icon: Heart, label: "Years Experience", value: "5+", color: "from-green-400 to-teal-500" },
  ]

  const skills = [
    { icon: Code2, name: "Frontend Development", level: 45, color: "bg-cyan-400" },
    { icon: Palette, name: "UI/UX Design", level: 88, color: "bg-purple-400" },
    { icon: Zap, name: "Performance Optimization", level: 92, color: "bg-yellow-400" },
    { icon: Globe, name: "Full Stack Development", level: 85, color: "bg-green-400" },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Me</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate about creating digital experiences that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div
            className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a dedicated website developer with a passion for creating beautiful, functional, and user-friendly
              websites. With expertise in modern web technologies, I help businesses and individuals establish their
              online presence through custom web solutions.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              My approach combines technical excellence with creative design thinking. I believe that great websites
              should not only look amazing but also provide exceptional user experiences and drive real business
              results.
            </p>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white">Skills & Expertise:</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <skill.icon className="w-5 h-5 text-cyan-400" />
                        <span className="text-gray-300">{skill.name}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${skill.color} transition-all duration-1000 delay-${(index + 1) * 200}`}
                        style={{ width: isVisible ? `${skill.level}%` : "0%" }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className={`group bg-black/50 backdrop-blur-sm border-gray-800 hover:bg-gray-900/50 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/10 card-3d depth-shadow ${isVisible ? "animate-fade-in-up" : ""}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse floating-3d`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
