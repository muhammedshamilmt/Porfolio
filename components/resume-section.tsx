"use client"

import { Download, Printer, X, FileText, Mail, Share2, CheckCircle } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

const RESUME_PATH = "/resume.pdf"

interface DownloadOverlayProps {
  isOpen: boolean
  onClose: () => void
  downloadType: "pdf" | "print" | null
}

function DownloadOverlay({ isOpen, onClose, downloadType }: DownloadOverlayProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (isOpen && downloadType) {
      setProgress(0)
      setIsComplete(false)

      // Simulate download progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsComplete(true)
            clearInterval(interval)

            // Auto close after completion
            setTimeout(() => {
              onClose()
            }, 2000)

            return 100
          }
          return prev + Math.random() * 15 + 5
        })
      }, 200)

      return () => clearInterval(interval)
    }
  }, [isOpen, downloadType, onClose])

  if (!isOpen) return null

  const getDownloadInfo = () => {
    switch (downloadType) {
      case "pdf":
        return {
          title: "Downloading Resume",
          subtitle: "Preparing your PDF file...",
          icon: <FileText className="h-8 w-8" />,
          color: "from-cyan-500 to-blue-600",
        }
      case "print":
        return {
          title: "Preparing Print",
          subtitle: "Setting up print preview...",
          icon: <Printer className="h-8 w-8" />,
          color: "from-purple-500 to-pink-600",
        }
      default:
        return {
          title: "Processing",
          subtitle: "Please wait...",
          icon: <Download className="h-8 w-8" />,
          color: "from-cyan-500 to-purple-600",
        }
    }
  }

  const downloadInfo = getDownloadInfo()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="relative overflow-hidden rounded-2xl bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="h-4 w-4 text-white" />
          </button>

          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${downloadInfo.color} opacity-20 blur-3xl`}
            />
            <div
              className={`absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-tr ${downloadInfo.color} opacity-20 blur-3xl`}
            />
          </div>

          <div className="relative p-8 text-center">
            {/* Icon */}
            <div
              className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${downloadInfo.color} shadow-lg`}
            >
              <div className="text-white">{downloadInfo.icon}</div>
            </div>

            {/* Title */}
            <h3 className="mb-2 text-xl font-bold text-white">
              {isComplete ? "Download Complete!" : downloadInfo.title}
            </h3>

            <p className="mb-6 text-sm text-gray-300">{isComplete ? "Your resume is ready!" : downloadInfo.subtitle}</p>

            {/* Progress */}
            {!isComplete ? (
              <div className="mb-6">
                <div className="mb-2 flex justify-between text-sm text-gray-400">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-700">
                  <div
                    className={`h-full bg-gradient-to-r ${downloadInfo.color} transition-all duration-300 ease-out`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="mb-6 flex justify-center">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            )}

            {/* Actions */}
            {isComplete && (
              <div className="flex gap-3 justify-center">
                <Button variant="outline" size="sm" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
                <Button variant="outline" size="sm" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            )}

            {/* File info */}
            <div className="mt-6 rounded-lg bg-white/5 p-3 text-left">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">File:</span>
                <span className="text-white">Shaz_Resume.pdf</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-gray-300">Size:</span>
                <span className="text-white">2.4 MB</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-gray-300">Format:</span>
                <span className="text-white">PDF Document</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ResumeSection() {
  const [downloadOverlay, setDownloadOverlay] = useState<{
    isOpen: boolean
    type: "pdf" | "print" | null
  }>({
    isOpen: false,
    type: null,
  })

  const handleDownload = (type: "pdf" | "print") => {
    setDownloadOverlay({ isOpen: true, type })

    // Trigger actual download after a delay
    setTimeout(() => {
      if (type === "pdf") {
        // Create a temporary link and trigger download
        const link = document.createElement("a")
        link.href = RESUME_PATH
        link.download = "Shaz_Resume.pdf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else if (type === "print") {
        window.print()
      }
    }, 2000)
  }

  const closeOverlay = () => {
    setDownloadOverlay({ isOpen: false, type: null })
  }

  return (
    <>
      <section
        id="resume"
        className={cn(
          "relative mx-auto my-24 w-full max-w-6xl rounded-3xl bg-white/5 p-10 backdrop-blur-lg",
          "shadow-[0_15px_40px_-10px_rgba(0,0,0,0.6)] ring-1 ring-white/10",
        )}
      >
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-gentle opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
          </div>
        ))}

        {/* floating gradient blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -left-10 h-56 w-56 rounded-full bg-gradient-to-tr from-cyan-500 via-fuchsia-500 to-purple-600 opacity-30 blur-3xl animate-pulse-slow"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-500 opacity-20 blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />

        <h2 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          <span className="bg-gradient-to-tr from-cyan-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent animate-text-glow">
            Grab my&nbsp;
          </span>
          Resume
        </h2>

        {/* preview & actions */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* preview */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 tilt-3d">
            <Image
              src="/placeholder.svg?height=900&width=675"
              alt="Resume preview"
              fill
              className="object-cover object-top opacity-90"
            />
            <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />

            {/* Preview overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="rounded-lg bg-white/10 backdrop-blur-sm p-3">
                <p className="text-sm text-white font-medium">Professional Resume</p>
                <p className="text-xs text-gray-300">Updated December 2024</p>
              </div>
            </div>
          </div>

          {/* download card */}
          <div className="flex flex-col items-start justify-center space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Professional Resume
                </span>
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Get a comprehensive overview of my experience, skills, and achievements. Available in multiple formats
                for your convenience.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => handleDownload("pdf")}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Download className="mr-2 h-5 w-5" />
                Download PDF
              </Button>

              <Button
                variant="outline"
                onClick={() => handleDownload("print")}
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Printer className="mr-2 h-5 w-5" />
                Print Resume
              </Button>
            </div>

            {/* quick facts */}
            <div className="w-full">
              <h4 className="mb-4 text-lg font-semibold text-white">Quick Facts</h4>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Years Experience", value: "3+", color: "from-cyan-500 to-blue-600" },
                  { label: "Projects", value: "50+", color: "from-purple-500 to-pink-600" },
                  { label: "Satisfied Clients", value: "100%", color: "from-green-500 to-emerald-600" },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className="group rounded-xl bg-white/5 p-4 text-center ring-1 ring-inset ring-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 tilt-3d"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`mx-auto mb-2 h-8 w-8 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center`}
                    >
                      <span className="text-white text-sm font-bold">{item.value.charAt(0)}</span>
                    </div>
                    <p className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm text-gray-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional info */}
            <div className="w-full rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Professional Format</p>
                  <p className="text-xs text-gray-400">ATS-friendly • Modern Design • 2 Pages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Overlay */}
      <DownloadOverlay isOpen={downloadOverlay.isOpen} onClose={closeOverlay} downloadType={downloadOverlay.type} />
    </>
  )
}
