"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft, Search, Eye, MessageCircle, User, TrendingUp, Filter } from "lucide-react"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishDate: string
  readTime: string
  category: string
  tags: string[]
  image: string
  views: number
  comments: number
  featured: boolean
}

export default function BlogPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
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

  // Mock blog posts - in a real app, this would come from a CMS or database
  const allPosts: BlogPost[] = [
    {
      id: "1",
      title: "The Future of Web Development: Trends to Watch in 2024",
      excerpt:
        "Exploring the latest trends in web development including AI integration, serverless architecture, and the rise of micro-frontends.",
      content: "Full blog content here...",
      author: "Your Name",
      publishDate: "2024-01-15",
      readTime: "5 min read",
      category: "Web Development",
      tags: ["React", "Next.js", "AI", "Trends"],
      image: "/placeholder.svg?height=300&width=500",
      views: 1250,
      comments: 23,
      featured: true,
    },
    {
      id: "2",
      title: "Creating Stunning Logo Designs: A Designer's Guide",
      excerpt:
        "Learn the principles of effective logo design, from concept to final execution, with real-world examples and case studies.",
      content: "Full blog content here...",
      author: "Your Name",
      publishDate: "2024-01-10",
      readTime: "8 min read",
      category: "Design",
      tags: ["Logo Design", "Branding", "Creative Process"],
      image: "/placeholder.svg?height=300&width=500",
      views: 890,
      comments: 15,
      featured: true,
    },
    {
      id: "3",
      title: "Freelancing Success: Tips for New Designers and Developers",
      excerpt:
        "Essential advice for starting your freelance career, from finding clients to managing projects and building a sustainable business.",
      content: "Full blog content here...",
      author: "Your Name",
      publishDate: "2024-01-05",
      readTime: "6 min read",
      category: "Freelancing",
      tags: ["Freelancing", "Business", "Career"],
      image: "/placeholder.svg?height=300&width=500",
      views: 2100,
      comments: 45,
      featured: false,
    },
    {
      id: "4",
      title: "Responsive Design Best Practices for Modern Websites",
      excerpt:
        "Master the art of responsive design with practical tips, code examples, and testing strategies for all device types.",
      content: "Full blog content here...",
      author: "Your Name",
      publishDate: "2023-12-28",
      readTime: "7 min read",
      category: "Web Development",
      tags: ["Responsive Design", "CSS", "Mobile First"],
      image: "/placeholder.svg?height=300&width=500",
      views: 1680,
      comments: 32,
      featured: false,
    },
    {
      id: "5",
      title: "Color Theory in Digital Design: A Complete Guide",
      excerpt:
        "Understanding color psychology, harmony, and application in digital design projects for maximum impact.",
      content: "Full blog content here...",
      author: "Your Name",
      publishDate: "2023-12-20",
      readTime: "9 min read",
      category: "Design",
      tags: ["Color Theory", "Design Principles", "Psychology"],
      image: "/placeholder.svg?height=300&width=500",
      views: 1420,
      comments: 28,
      featured: false,
    },
    {
      id: "6",
      title: "Building Your First E-commerce Website: A Step-by-Step Guide",
      excerpt:
        "Complete tutorial on creating an e-commerce website from scratch, including payment integration and security considerations.",
      content: "Full blog content here...",
      author: "Your Name",
      publishDate: "2023-12-15",
      readTime: "12 min read",
      category: "Web Development",
      tags: ["E-commerce", "Tutorial", "Payment Integration"],
      image: "/placeholder.svg?height=300&width=500",
      views: 3200,
      comments: 67,
      featured: false,
    },
  ]

  const categories = ["All", "Web Development", "Design", "Freelancing"]

  // Filter posts based on search and category
  useEffect(() => {
    let filtered = allPosts

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    setFilteredPosts(filtered)
  }, [searchTerm, selectedCategory])

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
              Blog{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Posts</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Insights, tutorials, and thoughts on design, development, and freelancing
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search posts..."
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
                  <Filter className="mr-2" size={16} />
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section ref={sectionRef} className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length === 0 ? (
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-12 text-center">
                <Search className="mx-auto mb-4 text-gray-600" size={48} />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No posts found</h3>
                <p className="text-gray-500">
                  {searchTerm || selectedCategory !== "All"
                    ? "Try adjusting your search or filters"
                    : "No blog posts available yet"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className={`group bg-black/50 backdrop-blur-sm border-gray-800 hover:bg-gray-900/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/10 overflow-hidden card-3d depth-shadow ${
                    post.featured ? "ring-2 ring-cyan-400/20" : ""
                  } ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {post.featured && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-bold">
                        <TrendingUp size={12} className="mr-1" />
                        Featured
                      </Badge>
                    )}

                    <Badge className="absolute top-3 right-3 bg-black/70 text-white border-gray-600">
                      {post.category}
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3 text-xs text-gray-400">
                      <div className="flex items-center">
                        <User size={12} className="mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {new Date(post.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs border-cyan-400/30 text-cyan-400">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                          +{post.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-gray-400">
                        <div className="flex items-center">
                          <Eye size={12} className="mr-1" />
                          {post.views}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle size={12} className="mr-1" />
                          {post.comments}
                        </div>
                      </div>

                      <Link href={`/blog/${post.id}`}>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
                        >
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
