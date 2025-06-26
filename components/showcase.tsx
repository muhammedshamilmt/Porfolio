"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  Heart,
  MessageCircle,
  ArrowRight,
  Palette,
  ImageIcon,
  Award,
  Zap,
  X,
  ExternalLink,
  Download,
  Share2,
  Bookmark,
  ThumbsUp,
} from "lucide-react"
import Link from "next/link"

interface ShowcaseItem {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  image: string
  gallery: string[]
  likes: number
  views: number
  comments: number
  featured: boolean
  client?: string
  year: string
  tools: string[]
  projectUrl?: string
}

export function Showcase() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
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

  // Mock showcase data
  const showcaseItems: ShowcaseItem[] = [
    {
      id: "1",
      title: "Modern Tech Startup Logo",
      description: "Clean and minimalist logo design for a technology startup focusing on AI solutions.",
      category: "Logo Design",
      tags: ["Logo", "Branding", "Tech", "Minimalist"],
      image: "/placeholder.svg?height=400&width=600",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      likes: 124,
      views: 2340,
      comments: 18,
      featured: true,
      client: "TechFlow AI",
      year: "2024",
      tools: ["Adobe Illustrator", "Figma"],
      projectUrl: "https://example.com",
    },
    {
      id: "2",
      title: "Music Festival Poster",
      description: "Vibrant and energetic poster design for a summer music festival featuring multiple artists.",
      category: "Poster Design",
      tags: ["Poster", "Music", "Festival", "Colorful"],
      image: "/placeholder.svg?height=400&width=600",
      gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      likes: 89,
      views: 1560,
      comments: 12,
      featured: true,
      client: "Summer Beats Festival",
      year: "2024",
      tools: ["Photoshop", "Illustrator"],
    },
    {
      id: "3",
      title: "Restaurant Brand Identity",
      description:
        "Complete brand identity package for an upscale Italian restaurant including logo, menu design, and signage.",
      category: "Branding",
      tags: ["Branding", "Restaurant", "Identity", "Luxury"],
      image: "/placeholder.svg?height=400&width=600",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      likes: 156,
      views: 2890,
      comments: 25,
      featured: false,
      client: "Bella Vista Restaurant",
      year: "2023",
      tools: ["Illustrator", "InDesign", "Photoshop"],
    },
    {
      id: "4",
      title: "E-commerce App UI Design",
      description: "Modern and user-friendly mobile app interface design for an e-commerce platform.",
      category: "UI Design",
      tags: ["UI", "Mobile", "E-commerce", "App"],
      image: "/placeholder.svg?height=400&width=600",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      likes: 203,
      views: 3450,
      comments: 31,
      featured: true,
      client: "ShopEasy",
      year: "2024",
      tools: ["Figma", "Sketch", "Principle"],
    },
    {
      id: "5",
      title: "Corporate Event Poster",
      description: "Professional poster design for a corporate technology conference and networking event.",
      category: "Poster Design",
      tags: ["Poster", "Corporate", "Event", "Professional"],
      image: "/placeholder.svg?height=400&width=600",
      gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      likes: 67,
      views: 1230,
      comments: 8,
      featured: false,
      client: "TechConnect Conference",
      year: "2023",
      tools: ["Illustrator", "Photoshop"],
    },
    {
      id: "6",
      title: "Fitness Brand Logo",
      description: "Dynamic and energetic logo design for a fitness and wellness brand targeting young professionals.",
      category: "Logo Design",
      tags: ["Logo", "Fitness", "Health", "Dynamic"],
      image: "/placeholder.svg?height=400&width=600",
      gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      likes: 98,
      views: 1780,
      comments: 14,
      featured: false,
      client: "FitLife Pro",
      year: "2024",
      tools: ["Illustrator", "After Effects"],
    },
  ]

  const categories = ["All", "Logo Design", "Poster Design", "Branding", "UI Design"]

  const filteredItems =
    selectedCategory === "All" ? showcaseItems : showcaseItems.filter((item) => item.category === selectedCategory)

  const openModal = (item: ShowcaseItem) => {
    setSelectedItem(item)
    setCurrentImageIndex(0)
    setIsModalOpen(true)
    setIsLiked(false)
    setIsBookmarked(false)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
    setCurrentImageIndex(0)
    document.body.style.overflow = "unset"
  }

  const nextImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev === selectedItem.gallery.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedItem.gallery.length - 1 : prev - 1))
    }
  }

  return (
    <>
      <section id="showcase" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-400/3 rounded-full blur-3xl floating-3d"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-400/3 rounded-full blur-3xl floating-3d"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 floating-3d">
              Design{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Showcase
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A collection of my latest design work including logos, posters, and brand identities
            </p>
          </div>

          {/* Category Filter */}
          <div
            className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                    : "border-gray-700 text-gray-300 hover:bg-gray-800 bg-black/50"
                } transition-all duration-300 hover:scale-105 tilt-3d`}
              >
                {category === "Logo Design" && <Award className="mr-2" size={16} />}
                {category === "Poster Design" && <ImageIcon className="mr-2" size={16} />}
                {category === "Branding" && <Palette className="mr-2" size={16} />}
                {category === "UI Design" && <Zap className="mr-2" size={16} />}
                {category === "All" && <Eye className="mr-2" size={16} />}
                {category}
              </Button>
            ))}
          </div>

          {/* Showcase Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className={`group bg-black/50 backdrop-blur-sm border-gray-800 hover:bg-gray-900/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/10 overflow-hidden cursor-pointer card-3d depth-shadow ${
                  item.featured ? "ring-2 ring-cyan-400/20" : ""
                } ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => openModal(item)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {item.featured && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-bold">
                      <Award size={12} className="mr-1" />
                      Featured
                    </Badge>
                  )}

                  <Badge className="absolute top-3 right-3 bg-black/70 text-white border-gray-600">
                    {item.category}
                  </Badge>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full font-medium">
                      View Details
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">{item.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs border-cyan-400/30 text-cyan-400">
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                        +{item.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Eye size={12} className="mr-1" />
                        {item.views}
                      </div>
                      <div className="flex items-center">
                        <Heart size={12} className="mr-1" />
                        {item.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle size={12} className="mr-1" />
                        {item.comments}
                      </div>
                    </div>
                    <span>{item.year}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Button */}
          <div
            className={`text-center transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Link href="/showcase">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 tilt-3d depth-shadow bg-black/50"
              >
                <Palette className="mr-2" size={20} />
                View Full Showcase
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Behance-style Showcase Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 bg-white modal-backdrop" onClick={closeModal}>
          <div className="h-full overflow-y-auto">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={closeModal}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <X size={20} className="text-gray-600" />
                  </button>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">{selectedItem.title}</h1>
                    <p className="text-sm text-gray-600">by Shaz</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                      isLiked ? "bg-red-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <ThumbsUp size={16} className={isLiked ? "fill-current" : ""} />
                    <span>{selectedItem.likes + (isLiked ? 1 : 0)}</span>
                  </button>

                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isBookmarked ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <Bookmark size={16} className={isBookmarked ? "fill-current" : ""} />
                  </button>

                  <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <Share2 size={16} className="text-gray-700" />
                  </button>

                  {selectedItem.projectUrl && (
                    <a
                      href={selectedItem.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <ExternalLink size={16} className="text-gray-700" />
                    </a>
                  )}
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8" onClick={(e) => e.stopPropagation()}>
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Image Gallery */}
                  <div className="space-y-6">
                    {selectedItem.gallery.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${selectedItem.title} - Image ${index + 1}`}
                          className="w-full rounded-lg shadow-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Project Info */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Project Details</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Description</h4>
                        <p className="text-gray-600 leading-relaxed">{selectedItem.description}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Category</h4>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{selectedItem.category}</Badge>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Tools Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.tools.map((tool, index) => (
                            <Badge key={index} className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {selectedItem.client && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-1">Client</h4>
                          <p className="text-gray-600">{selectedItem.client}</p>
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Year</h4>
                        <p className="text-gray-600">{selectedItem.year}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Project Stats</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{selectedItem.views}</div>
                        <div className="text-xs text-gray-600">Views</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-500">{selectedItem.likes + (isLiked ? 1 : 0)}</div>
                        <div className="text-xs text-gray-600">Likes</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-500">{selectedItem.comments}</div>
                        <div className="text-xs text-gray-600">Comments</div>
                      </div>
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">About the Creator</h3>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Shaz</h4>
                        <p className="text-sm text-gray-600">Creative Developer & Designer</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                      Passionate about creating digital experiences that push boundaries and exceed expectations.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <MessageCircle className="mr-2" size={16} />
                      Contact for Project
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2" size={16} />
                      Download Assets
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
