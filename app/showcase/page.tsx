"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Search,
  Eye,
  Heart,
  MessageCircle,
  Award,
  Palette,
  ImageIcon,
  Zap,
  X,
  ChevronLeft,
  ChevronRight,
  Send,
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
  comments: Comment[]
  featured: boolean
  client?: string
  year: string
  tools: string[]
}

interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
  likes: number
}

export default function ShowcasePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredItems, setFilteredItems] = useState<ShowcaseItem[]>([])
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [newComment, setNewComment] = useState({ author: "", content: "" })
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set())
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

  // Mock showcase data with comments
  const allItems: ShowcaseItem[] = [
    {
      id: "1",
      title: "Modern Tech Startup Logo",
      description:
        "Clean and minimalist logo design for a technology startup focusing on AI solutions. The design emphasizes innovation and trust through geometric shapes and a modern color palette.",
      category: "Logo Design",
      tags: ["Logo", "Branding", "Tech", "Minimalist", "AI"],
      image: "/placeholder.svg?height=400&width=600",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      likes: 124,
      views: 2340,
      comments: [
        {
          id: "1",
          author: "Design Lover",
          content: "Amazing work! The minimalist approach really works well for a tech company.",
          timestamp: "2024-01-15T10:30:00Z",
          likes: 5,
        },
        {
          id: "2",
          author: "Creative Mind",
          content: "Love the color choice and typography. Very professional!",
          timestamp: "2024-01-16T14:20:00Z",
          likes: 3,
        },
      ],
      featured: true,
      client: "TechFlow AI",
      year: "2024",
      tools: ["Adobe Illustrator", "Figma"],
    },
    {
      id: "2",
      title: "Music Festival Poster",
      description:
        "Vibrant and energetic poster design for a summer music festival featuring multiple artists. The design captures the excitement and energy of live music.",
      category: "Poster Design",
      tags: ["Poster", "Music", "Festival", "Colorful", "Event"],
      image: "/placeholder.svg?height=400&width=600",
      gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      likes: 89,
      views: 1560,
      comments: [
        {
          id: "3",
          author: "Music Fan",
          content: "This poster makes me want to attend the festival! Great energy.",
          timestamp: "2024-01-10T09:15:00Z",
          likes: 8,
        },
      ],
      featured: true,
      client: "Summer Beats Festival",
      year: "2024",
      tools: ["Photoshop", "Illustrator"],
    },
    {
      id: "3",
      title: "Restaurant Brand Identity",
      description:
        "Complete brand identity package for an upscale Italian restaurant including logo, menu design, and signage. Elegant and sophisticated design reflecting the restaurant's premium positioning.",
      category: "Branding",
      tags: ["Branding", "Restaurant", "Identity", "Luxury", "Italian"],
      image: "/placeholder.svg?height=400&width=600",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      likes: 156,
      views: 2890,
      comments: [
        {
          id: "4",
          author: "Restaurant Owner",
          content: "Perfect branding for our restaurant. Customers love the new identity!",
          timestamp: "2023-12-20T16:45:00Z",
          likes: 12,
        },
        {
          id: "5",
          author: "Brand Expert",
          content: "Excellent work on the brand consistency across all touchpoints.",
          timestamp: "2023-12-22T11:30:00Z",
          likes: 7,
        },
      ],
      featured: false,
      client: "Bella Vista Restaurant",
      year: "2023",
      tools: ["Illustrator", "InDesign", "Photoshop"],
    },
    {
      id: "4",
      title: "E-commerce App UI Design",
      description:
        "Modern and user-friendly mobile app interface design for an e-commerce platform. Focus on intuitive navigation and seamless shopping experience.",
      category: "UI Design",
      tags: ["UI", "Mobile", "E-commerce", "App", "UX"],
      image: "/placeholder.svg?height=400&width=600",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      likes: 203,
      views: 3450,
      comments: [
        {
          id: "6",
          author: "UX Designer",
          content: "Great user flow and clean interface. Love the attention to detail!",
          timestamp: "2024-01-05T13:20:00Z",
          likes: 15,
        },
      ],
      featured: true,
      client: "ShopEasy",
      year: "2024",
      tools: ["Figma", "Sketch", "Principle"],
    },
    {
      id: "5",
      title: "Corporate Event Poster",
      description:
        "Professional poster design for a corporate technology conference and networking event. Clean and corporate aesthetic with modern typography.",
      category: "Poster Design",
      tags: ["Poster", "Corporate", "Event", "Professional", "Conference"],
      image: "/placeholder.svg?height=400&width=600",
      gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      likes: 67,
      views: 1230,
      comments: [],
      featured: false,
      client: "TechConnect Conference",
      year: "2023",
      tools: ["Illustrator", "Photoshop"],
    },
    {
      id: "6",
      title: "Fitness Brand Logo",
      description:
        "Dynamic and energetic logo design for a fitness and wellness brand targeting young professionals. The design conveys strength, movement, and vitality.",
      category: "Logo Design",
      tags: ["Logo", "Fitness", "Health", "Dynamic", "Wellness"],
      image: "/placeholder.svg?height=400&width=600",
      gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      likes: 98,
      views: 1780,
      comments: [
        {
          id: "7",
          author: "Fitness Enthusiast",
          content: "This logo perfectly captures the energy of fitness! Well done.",
          timestamp: "2024-01-08T08:45:00Z",
          likes: 6,
        },
      ],
      featured: false,
      client: "FitLife Pro",
      year: "2024",
      tools: ["Illustrator", "After Effects"],
    },
  ]

  const categories = ["All", "Logo Design", "Poster Design", "Branding", "UI Design"]

  // Filter items based on search and category
  useEffect(() => {
    let filtered = allItems

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.client && item.client.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    setFilteredItems(filtered)
  }, [searchTerm, selectedCategory])

  const openModal = (item: ShowcaseItem) => {
    setSelectedItem(item)
    setCurrentImageIndex(0)
    setIsModalOpen(true)
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

  const handleLike = (itemId: string) => {
    setLikedItems((prev) => {
      const newLiked = new Set(prev)
      if (newLiked.has(itemId)) {
        newLiked.delete(itemId)
      } else {
        newLiked.add(itemId)
      }
      return newLiked
    })
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.author || !newComment.content || !selectedItem) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: newComment.author,
      content: newComment.content,
      timestamp: new Date().toISOString(),
      likes: 0,
    }

    // Update the selected item's comments
    const updatedItem = {
      ...selectedItem,
      comments: [comment, ...selectedItem.comments],
    }
    setSelectedItem(updatedItem)
    setNewComment({ author: "", content: "" })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Logo Design":
        return <Award size={16} />
      case "Poster Design":
        return <ImageIcon size={16} />
      case "Branding":
        return <Palette size={16} />
      case "UI Design":
        return <Zap size={16} />
      default:
        return <Eye size={16} />
    }
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <section className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse floating-3d"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000 floating-3d"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <Button
                variant="outline"
                className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-105 bg-black/50 tilt-3d"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 floating-3d">
              Design{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Showcase
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore my complete collection of design work including logos, posters, branding, and UI designs
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search designs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 transition-colors card-3d"
              />
            </div>

            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                      : "border-gray-700 text-gray-300 hover:bg-gray-900/50 bg-black/50"
                  } transition-all duration-300 hover:scale-105 tilt-3d`}
                >
                  {getCategoryIcon(category)}
                  <span className="ml-2">{category}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Grid */}
      <section ref={sectionRef} className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          {filteredItems.length === 0 ? (
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-12 text-center">
                <Search className="mx-auto mb-4 text-gray-600" size={48} />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No designs found</h3>
                <p className="text-gray-500">
                  {searchTerm || selectedCategory !== "All"
                    ? "Try adjusting your search or filters"
                    : "No showcase items available yet"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
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
                      <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-2 rounded-full font-medium text-sm">
                        View Details
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed line-clamp-2">{item.description}</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.slice(0, 2).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs border-cyan-400/30 text-cyan-400">
                          {tag}
                        </Badge>
                      ))}
                      {item.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                          +{item.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleLike(item.id)
                          }}
                          className={`flex items-center hover:text-red-400 transition-colors ${
                            likedItems.has(item.id) ? "text-red-400" : ""
                          }`}
                        >
                          <Heart size={12} className={`mr-1 ${likedItems.has(item.id) ? "fill-current" : ""}`} />
                          {item.likes + (likedItems.has(item.id) ? 1 : 0)}
                        </button>
                        <div className="flex items-center">
                          <Eye size={12} className="mr-1" />
                          {item.views}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle size={12} className="mr-1" />
                          {item.comments.length}
                        </div>
                      </div>
                      <span>{item.year}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Showcase Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onClick={closeModal}>
          <div
            className={`bg-black/95 backdrop-blur-md border border-gray-800 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto modal-content depth-shadow ${isModalOpen ? "show" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <div className="relative h-96 overflow-hidden rounded-t-3xl">
                <img
                  src={selectedItem.gallery[currentImageIndex] || "/placeholder.svg"}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>

                {/* Image Navigation */}
                {selectedItem.gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/80 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-all duration-300"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/80 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-all duration-300"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {selectedItem.gallery.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {selectedItem.gallery.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? "bg-cyan-400" : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                )}

                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/80 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-all duration-300 tilt-3d"
                >
                  <X size={20} />
                </button>

                <div className="absolute bottom-4 left-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedItem.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <Badge className="bg-cyan-400/20 text-cyan-400 border-cyan-400/30">{selectedItem.category}</Badge>
                    <span>{selectedItem.year}</span>
                    {selectedItem.client && <span>Client: {selectedItem.client}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Project Description</h3>
                <p className="text-gray-300 leading-relaxed">{selectedItem.description}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">{selectedItem.views}</div>
                  <div className="text-gray-400 text-sm">Views</div>
                </div>
                <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                  <div className="text-2xl font-bold text-red-400 mb-1">
                    {selectedItem.likes + (likedItems.has(selectedItem.id) ? 1 : 0)}
                  </div>
                  <div className="text-gray-400 text-sm">Likes</div>
                </div>
                <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-400 mb-1">{selectedItem.comments.length}</div>
                  <div className="text-gray-400 text-sm">Comments</div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="border-cyan-400/30 text-cyan-400">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tools Used */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Tools Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tools.map((tool, index) => (
                    <Badge key={index} className="bg-purple-400/20 text-purple-400 border-purple-400/30">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <MessageCircle className="mr-2 text-cyan-400" />
                  Comments ({selectedItem.comments.length})
                </h3>

                {/* Comment Form */}
                <form
                  onSubmit={handleCommentSubmit}
                  className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700"
                >
                  <h4 className="text-lg font-semibold text-white mb-3">Leave a Comment</h4>
                  <div className="space-y-3">
                    <Input
                      placeholder="Your Name"
                      value={newComment.author}
                      onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                      className="bg-black/50 border-gray-600 text-white"
                      required
                    />
                    <Textarea
                      placeholder="Your comment..."
                      rows={3}
                      value={newComment.content}
                      onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                      className="bg-black/50 border-gray-600 text-white"
                      required
                    />
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                    >
                      <Send className="mr-2" size={16} />
                      Post Comment
                    </Button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {selectedItem.comments.map((comment) => (
                    <div key={comment.id} className="p-4 bg-gray-900/30 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {comment.author.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-white font-medium">{comment.author}</div>
                            <div className="text-gray-400 text-xs">
                              {new Date(comment.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Heart size={12} className="mr-1" />
                          {comment.likes}
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{comment.content}</p>
                    </div>
                  ))}

                  {selectedItem.comments.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                      <p>No comments yet. Be the first to comment!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
