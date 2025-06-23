"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Monitor, Smartphone, ShoppingCart, Zap, Palette, Search } from "lucide-react"

export function Services() {
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

  const services = [
    {
      icon: Monitor,
      title: "Website Development",
      description: "Custom websites built with modern technologies, optimized for performance and user experience.",
      features: ["Responsive Design", "Fast Loading", "SEO Optimized"],
      color: "from-cyan-400 to-blue-500",
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Websites that look and work perfectly on all devices, from smartphones to desktops.",
      features: ["Mobile Responsive", "Touch Friendly", "Cross-Browser"],
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description: "Complete online stores with secure payment processing and inventory management.",
      features: ["Payment Integration", "Product Management", "Order Tracking"],
      color: "from-green-400 to-teal-500",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed up your existing website with advanced optimization techniques and best practices.",
      features: ["Speed Optimization", "Core Web Vitals", "Caching Solutions"],
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that provide exceptional user experiences.",
      features: ["User Research", "Wireframing", "Prototyping"],
      color: "from-pink-400 to-red-500",
    },
    {
      icon: Search,
      title: "SEO & Analytics",
      description: "Improve your search rankings and track your website's performance with detailed analytics.",
      features: ["SEO Optimization", "Google Analytics", "Performance Reports"],
      color: "from-indigo-400 to-purple-500",
    },
  ]

  return (
    <section id="services" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-400/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-400/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive web development solutions to bring your ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group bg-black/50 backdrop-blur-sm border-gray-800 hover:bg-gray-900/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/10 card-3d depth-shadow ${
                isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse floating-3d`}
                >
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-400">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full group-hover:animate-pulse"></span>
                      <span className="group-hover:text-gray-300 transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
