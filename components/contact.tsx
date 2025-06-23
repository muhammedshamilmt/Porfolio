"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      // Store message in localStorage for the admin panel
      const message = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toISOString(),
        status: "new",
        priority: "medium",
      }

      // Get existing messages from localStorage
      const existingMessages = JSON.parse(localStorage.getItem("portfolioMessages") || "[]")
      const updatedMessages = [message, ...existingMessages]
      localStorage.setItem("portfolioMessages", JSON.stringify(updatedMessages))

      // Simple mailto fallback solution that always works
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`)
      const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from your portfolio contact form
      `)

      const mailtoLink = `mailto:shaz80170@gmail.com?subject=${subject}&body=${body}`

      // Open default email client
      window.open(mailtoLink, "_blank")

      setSubmitStatus({
        type: "success",
        message: "Your default email client should open with the message pre-filled. Please send it from there!",
      })

      // Reset form after a delay
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" })
      }, 2000)
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus({
        type: "error",
        message: "Unable to open email client. Please copy the message and send it manually to shaz80170@gmail.com",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDirectEmail = () => {
    const mailtoLink = `mailto:shaz80170@gmail.com?subject=Portfolio Inquiry`
    window.open(mailtoLink, "_blank")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Clear status message after 8 seconds
  useEffect(() => {
    if (submitStatus.type) {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: "" })
      }, 8000)
      return () => clearTimeout(timer)
    }
  }, [submitStatus])

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "shaz80170@gmail.com",
      description: "Send me an email anytime!",
      color: "from-cyan-400 to-blue-500",
      action: handleDirectEmail,
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm",
      color: "from-green-400 to-teal-500",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Your City, Your Country",
      description: "Available for remote work",
      color: "from-purple-400 to-pink-500",
    },
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to start your next project? Let's discuss how I can help bring your vision to life
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <MessageCircle className="mr-3 text-cyan-400" />
                Let's Talk
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                I'm always excited to work on new projects and help businesses grow their online presence. Whether you
                need a brand new website or want to improve your existing one, I'm here to help.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className={`group bg-black/50 backdrop-blur-sm border-gray-800 hover:bg-gray-900/50 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/10 ${
                    info.action ? "cursor-pointer" : ""
                  } ${isVisible ? "animate-fade-in-up" : ""}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={info.action}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-lg group-hover:text-cyan-400 transition-colors flex items-center">
                          {info.title}
                          {info.action && (
                            <ExternalLink
                              size={16}
                              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          )}
                        </h4>
                        <p className="text-cyan-400 font-medium">{info.value}</p>
                        <p className="text-gray-400 text-sm">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="text-cyan-400" size={20} />
                <h4 className="text-white font-semibold">Response Time</h4>
              </div>
              <p className="text-gray-300">
                I typically respond to all inquiries within 24 hours. For urgent projects, feel free to call me
                directly.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <Card className="bg-black/50 backdrop-blur-sm border-gray-800 hover:bg-gray-900/50 transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Send className="mr-3 text-cyan-400" />
                  Send Message
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Fill out the form below and it will open your email client with the message pre-filled.
                </p>
              </CardHeader>
              <CardContent>
                {/* Status Message */}
                {submitStatus.type && (
                  <div
                    className={`mb-6 p-4 rounded-lg border flex items-start space-x-3 ${
                      submitStatus.type === "success"
                        ? "bg-green-500/10 border-green-500/30 text-green-400"
                        : "bg-red-500/10 border-red-500/30 text-red-400"
                    }`}
                  >
                    {submitStatus.type === "success" ? (
                      <CheckCircle size={20} className="mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                    )}
                    <p className="text-sm leading-relaxed">{submitStatus.message}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 transition-colors"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 transition-colors"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 transition-colors"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 resize-none focus:border-cyan-400 transition-colors"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Opening Email Client...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2" size={20} />
                          Send via Email Client
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleDirectEmail}
                      className="w-full border-2 border-gray-400 text-gray-300 hover:bg-gray-400 hover:text-black font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      <Mail className="mr-2" size={20} />
                      Direct Email
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
