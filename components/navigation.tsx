"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-black/20 backdrop-blur-xl  shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-lg shadow-black/10">
              <div className="flex space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group px-3 py-2 rounded-full"
                  >
                    {item.name}

                    {/* Hover background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>

                    {/* Hover underline */}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full rounded-full"></span>

                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex justify-center items-center w-full">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-cyan-400 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-full transition-all duration-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 max-w-[90vw] bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-black/20 overflow-hidden">
            <div className="py-4">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left py-3 px-6 text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-all duration-300 relative group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}

                  {/* Mobile hover effect */}
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Glassmorphism overlay for better effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-purple-400/5 pointer-events-none"></div>
    </nav>
  )
}
