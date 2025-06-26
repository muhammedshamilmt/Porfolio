"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight, Eye, MessageCircle, Tag, TrendingUp, BookOpen } from "lucide-react"
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

export function Blog() {
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

  // Mock blog posts - in a real app, this would come from a CMS or database
  const blogPosts: BlogPost[] = [
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
  ]

  const categories = ["All", "Web Development", "Design", "Freelancing"]
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts =
    selectedCategory === "All" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)

  const featuredPost = blogPosts.find((post) => post.featured)
  const recentPosts = blogPosts.filter((post) => !post.featured).slice(0, 3)

  return (
    <section id="blog" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-950">
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
            Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Blog Posts
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on design, development, and freelancing
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
              <Tag className="mr-2" size={16} />
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div
            className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Card className="group bg-black/50 backdrop-blur-sm border-gray-800 hover:bg-gray-900/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-400/10 overflow-hidden card-3d depth-shadow">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <img
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-bold">
                    <TrendingUp size={12} className="mr-1" />
                    Featured
                  </Badge>
                </div>

                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge variant="outline" className="border-cyan-400/50 text-cyan-400">
                      {featuredPost.category}
                    </Badge>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar size={14} className="mr-1" />
                      {new Date(featuredPost.publishDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock size={14} className="mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{featuredPost.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Eye size={14} className="mr-1" />
                        {featuredPost.views}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle size={14} className="mr-1" />
                        {featuredPost.comments}
                      </div>
                    </div>

                    <Link href={`/blog/${featuredPost.id}`}>
                      <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
                        Read More
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        )}

        {/* Recent Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recentPosts.map((post, index) => (
            <Card
              key={post.id}
              className={`group bg-black/50 backdrop-blur-sm border-gray-800 hover:bg-gray-900/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/10 overflow-hidden card-3d depth-shadow ${
                isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
              }`}
              style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <Badge className="absolute top-3 left-3 bg-black/70 text-white border-gray-600">{post.category}</Badge>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3 text-xs text-gray-400">
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
                    <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-white hover:bg-cyan-400/10">
                      Read More
                      <ArrowRight className="ml-1" size={14} />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Posts Button */}
        <div
          className={`text-center transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Link href="/blog">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 tilt-3d depth-shadow bg-black/50"
            >
              <BookOpen className="mr-2" size={20} />
              View All Posts
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
