"use client"

import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown, Home, User, Briefcase, FolderOpen, Mail } from "lucide-react"

interface UI3DProps {
  currentSection: number
  setCurrentSection: (section: number) => void
}

export function UI3D({ currentSection, setCurrentSection }: UI3DProps) {
  const sections = [
    { name: "Home", icon: Home },
    { name: "About", icon: User },
    { name: "Services", icon: Briefcase },
    { name: "Projects", icon: FolderOpen },
    { name: "Contact", icon: Mail },
  ]

  const scrollToSection = (index: number) => {
    setCurrentSection(index)
  }

  return (
    <>
      {/* Navigation */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-6 py-3">
          <div className="flex space-x-6">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
                  currentSection === index ? "bg-cyan-400 text-black" : "text-white hover:text-cyan-400"
                }`}
              >
                <section.icon size={16} />
                <span className="hidden md:inline">{section.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col space-y-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollToSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="bg-black/20 backdrop-blur-md border-white/10 text-white hover:bg-white/10"
          >
            <ChevronUp size={20} />
          </Button>

          <div className="flex flex-col space-y-2">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSection === index ? "bg-cyan-400" : "bg-white/30"
                }`}
                onClick={() => scrollToSection(index)}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollToSection(Math.min(sections.length - 1, currentSection + 1))}
            disabled={currentSection === sections.length - 1}
            className="bg-black/20 backdrop-blur-md border-white/10 text-white hover:bg-white/10"
          >
            <ChevronDown size={20} />
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-lg p-4 text-white text-sm">
          <p className="mb-2">
            🖱️ <strong>Mouse:</strong> Rotate & Zoom
          </p>
          <p className="mb-2">
            ⌨️ <strong>Navigation:</strong> Use top menu or arrows
          </p>
          <p>
            🎯 <strong>Interact:</strong> Click on 3D elements
          </p>
        </div>
      </div>
    </>
  )
}
