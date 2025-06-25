"use client"

import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub", color: "hover:text-gray-400" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-cyan-400" },
    { icon: Mail, href: "#", label: "Email", color: "hover:text-green-400" },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800 relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-cyan-400/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-white mb-2">
              <span className="text-cyan-400">Muhammed Shamil</span>
            </div>
            <p className="text-gray-400 flex items-center justify-center md:justify-start">
              Made with <Heart className="mx-1 text-red-400" size={16} /> and lots of coffee
            </p>
          </div>

          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                aria-label={link.label}
                className={`w-12 h-12 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-full flex items-center justify-center text-gray-400 ${link.color} hover:bg-gray-900/50 hover:scale-110 transition-all duration-300 hover:shadow-lg`}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} Muhammed Shamil MT. All rights reserved.
          </p>

          <Button
            onClick={scrollToTop}
            variant="outline"
            size="sm"
            className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-105 bg-black/50"
          >
            <ArrowUp size={16} className="mr-1" />
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  )
}
