"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Briefcase,
  Clock,
  Star,
  Users,
  Globe,
  Zap,
  Award,
  TrendingUp,
  CheckCircle,
  DollarSign,
  Target,
} from "lucide-react"

export function Occupation() {
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

  const freelancerStats = [
    { icon: Briefcase, label: "Projects Completed", value: "150+", color: "from-cyan-400 to-blue-500" },
    { icon: Users, label: "Happy Clients", value: "80+", color: "from-green-400 to-teal-500" },
    { icon: Star, label: "Average Rating", value: "4.9/5", color: "from-yellow-400 to-orange-500" },
    { icon: Globe, label: "Countries Served", value: "25+", color: "from-purple-400 to-pink-500" },
  ]

  const services = [
    {
      title: "Web Development",
      description: "Full-stack web applications with modern technologies",
      price: "Starting at $500",
      duration: "1-4 weeks",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Mobile First"],
      icon: Globe,
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Logo & Brand Design",
      description: "Professional logos and complete brand identity packages",
      price: "Starting at $150",
      duration: "3-7 days",
      features: ["Multiple Concepts", "Vector Files", "Brand Guidelines", "Unlimited Revisions"],
      icon: Award,
      color: "from-purple-400 to-pink-500",
    },
    {
      title: "Poster Design",
      description: "Eye-catching posters for events, marketing, and promotions",
      price: "Starting at $75",
      duration: "1-3 days",
      features: ["Print Ready", "High Resolution", "Multiple Formats", "Quick Turnaround"],
      icon: Target,
      color: "from-green-400 to-teal-500",
    },
    {
      title: "UI/UX Design",
      description: "User-centered design for web and mobile applications",
      price: "Starting at $300",
      duration: "1-2 weeks",
      features: ["User Research", "Wireframing", "Prototyping", "Design System"],
      icon: Zap,
      color: "from-yellow-400 to-orange-500",
    },
  ]

  const workingProcess = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "Understanding your requirements, goals, and target audience",
      icon: Target,
    },
    {
      step: "02",
      title: "Design & Development",
      description: "Creating mockups, prototypes, and developing the solution",
      icon: Zap,
    },
    {
      step: "03",
      title: "Review & Refinement",
      description: "Client feedback, revisions, and perfecting the final product",
      icon: CheckCircle,
    },
    {
      step: "04",
      title: "Delivery & Support",
      description: "Final delivery with documentation and ongoing support",
      icon: Award,
    },
  ]

  return (
    <section id="occupation" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/3 rounded-full blur-3xl floating-3d"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/3 rounded-full blur-3xl floating-3d"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 floating-3d">
            Freelance{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Designer & Developer
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Bringing your digital vision to life with creative design and cutting-edge development
          </p>
        </div>

        {/* Freelancer Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {freelancerStats.map((stat, index) => (
            <Card
              key={index}
              className={`group bg-black/50 backdrop-blur-sm border-gray-800 hover:bg-gray-900/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/10 card-3d depth-shadow ${
                isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 floating-3d`}
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

        {/* Services */}
        <div
          className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Services</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`group bg-black/50 backdrop-blur-sm border-gray-800 hover:bg-gray-900/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/10 card-3d depth-shadow ${
                  isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 floating-3d`}
                    >
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 font-bold text-lg">{service.price}</div>
                      <div className="text-gray-400 text-sm flex items-center">
                        <Clock size={12} className="mr-1" />
                        {service.duration}
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-gray-300 mb-4 leading-relaxed">{service.description}</p>

                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-400">
                        <CheckCircle size={14} className="text-green-400 group-hover:animate-pulse" />
                        <span className="group-hover:text-gray-300 transition-colors">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Working Process */}
        <div
          className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            How I{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Work</span>
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workingProcess.map((process, index) => (
              <Card
                key={index}
                className={`group bg-black/50 backdrop-blur-sm border-gray-800 hover:bg-gray-900/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/10 card-3d depth-shadow ${
                  isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: `${(index + 8) * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 floating-3d">
                      <process.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {process.step}
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {process.title}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{process.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="bg-gradient-to-r from-cyan-400/10 to-purple-400/10 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's discuss your ideas and create something amazing together. I'm available for both short-term projects
              and long-term collaborations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 tilt-3d depth-shadow"
              >
                <DollarSign className="mr-2" size={20} />
                Get Quote
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-semibold rounded-full transition-all duration-300 hover:scale-105 tilt-3d depth-shadow"
              >
                <TrendingUp className="mr-2" size={20} />
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
