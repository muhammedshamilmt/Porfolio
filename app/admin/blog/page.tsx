"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Eye, Calendar, Clock, ArrowLeft, Filter, FileText, TrendingUp } from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"

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
  status: "published" | "draft" | "scheduled"
  featured: boolean
}

export default function AdminBlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])

  // Mock blog posts - in a real app, this would come from your backend
  const allPosts: BlogPost[] = [
    {
      id: "1",
      title: "The Future of Web Development: Trends to Watch in 2024",
      excerpt: "Exploring the latest trends in web development including AI integration, serverless architecture...",
      content: "Full blog content here...",
      author: "Shaz",
      publishDate: "2024-01-15",
      readTime: "5 min read",
      category: "Web Development",
      tags: ["React", "Next.js", "AI", "Trends"],
      image: "/placeholder.svg?height=300&width=500",
      views: 1250,
      comments: 23,
      status: "published",
      featured: true,
    },
    {
      id: "2",
      title: "Creating Stunning Logo Designs: A Designer's Guide",
      excerpt: "Learn the principles of effective logo design, from concept to final execution...",
      content: "Full blog content here...",
      author: "Shaz",
      publishDate: "2024-01-10",
      readTime: "8 min read",
      category: "Design",
      tags: ["Logo Design", "Branding", "Creative Process"],
      image: "/placeholder.svg?height=300&width=500",
      views: 890,
      comments: 15,
      status: "published",
      featured: false,
    },
    {
      id: "3",
      title: "Freelancing Success: Tips for New Designers and Developers",
      excerpt: "Essential advice for starting your freelance career, from finding clients to managing projects...",
      content: "Full blog content here...",
      author: "Shaz",
      publishDate: "2024-01-05",
      readTime: "6 min read",
      category: "Freelancing",
      tags: ["Freelancing", "Business", "Career"],
      image: "/placeholder.svg?height=300&width=500",
      views: 2100,
      comments: 45,
      status: "draft",
      featured: false,
    },
    {
      id: "4",
      title: "Advanced React Patterns for Modern Applications",
      excerpt: "Deep dive into advanced React patterns and best practices for scalable applications...",
      content: "Full blog content here...",
      author: "Shaz",
      publishDate: "2024-01-20",
      readTime: "12 min read",
      category: "Web Development",
      tags: ["React", "Patterns", "Advanced"],
      image: "/placeholder.svg?height=300&width=500",
      views: 0,
      comments: 0,
      status: "scheduled",
      featured: false,
    },
  ]

  const categories = ["All", "Web Development", "Design", "Freelancing"]
  const statuses = ["All", "published", "draft", "scheduled"]

  // Filter posts based on search, category, and status
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

    if (selectedStatus !== "All") {
      filtered = filtered.filter((post) => post.status === selectedStatus)
    }

    setFilteredPosts(filtered)
  }, [searchTerm, selectedCategory, selectedStatus])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "draft":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "scheduled":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const handleDelete = (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      // In a real app, you would make an API call to delete the post
      console.log("Deleting post:", postId)
    }
  }

  const stats = [
    {
      title: "Total Posts",
      value: allPosts.length.toString(),
      change: "+2 this month",
      icon: FileText,
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Published",
      value: allPosts.filter((p) => p.status === "published").length.toString(),
      change: "+1 this week",
      icon: Eye,
      color: "from-green-400 to-teal-500",
    },
    {
      title: "Total Views",
      value: allPosts.reduce((acc, post) => acc + post.views, 0).toLocaleString(),
      change: "+15% this month",
      icon: TrendingUp,
      color: "from-purple-400 to-pink-500",
    },
    {
      title: "Drafts",
      value: allPosts.filter((p) => p.status === "draft").length.toString(),
      change: "1 pending",
      icon: Edit,
      color: "from-yellow-400 to-orange-500",
    },
  ]

  return (
    <AuthGuard>
      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="bg-gray-950 border-b border-gray-800 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/admin/dashboard">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <ArrowLeft className="mr-2" size={16} />
                    Dashboard
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-white">Blog Management</h1>
                  <p className="text-gray-400 text-sm">Create and manage your blog posts</p>
                </div>
              </div>
              <Link href="/admin/blog/create">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                  <Plus className="mr-2" size={16} />
                  New Post
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 card-3d"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-green-400 text-sm">{stat.change}</p>
                    </div>
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Card className="bg-gray-900/50 border-gray-800 mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      className={`${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                          : "border-gray-700 text-gray-300 hover:bg-gray-800 bg-black/50"
                      }`}
                    >
                      <Filter className="mr-1" size={14} />
                      {category}
                    </Button>
                  ))}
                </div>

                {/* Status Filter */}
                <div className="flex gap-2">
                  {statuses.map((status) => (
                    <Button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      variant={selectedStatus === status ? "default" : "outline"}
                      size="sm"
                      className={`${
                        selectedStatus === status
                          ? "bg-gradient-to-r from-green-500 to-teal-500 text-white"
                          : "border-gray-700 text-gray-300 hover:bg-gray-800 bg-black/50"
                      }`}
                    >
                      {status === "All" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-12 text-center">
                  <FileText className="mx-auto mb-4 text-gray-600" size={48} />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No posts found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm || selectedCategory !== "All" || selectedStatus !== "All"
                      ? "Try adjusting your search or filters"
                      : "Create your first blog post to get started"}
                  </p>
                  <Link href="/admin/blog/create">
                    <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                      <Plus className="mr-2" size={16} />
                      Create First Post
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 transition-all duration-300 hover:scale-[1.01] card-3d"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4 flex-1">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">{post.title}</h3>
                              <p className="text-gray-300 text-sm line-clamp-2 mb-2">{post.excerpt}</p>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
                              {post.featured && (
                                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {new Date(post.publishDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              {post.readTime}
                            </div>
                            <div className="flex items-center">
                              <Eye size={14} className="mr-1" />
                              {post.views} views
                            </div>
                            <Badge variant="outline" className="border-cyan-400/30 text-cyan-400 text-xs">
                              {post.category}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                                #{tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                                +{post.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Link href={`/blog/${post.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300 hover:bg-gray-800"
                          >
                            <Eye size={14} />
                          </Button>
                        </Link>
                        <Link href={`/admin/blog/edit/${post.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300 hover:bg-gray-800"
                          >
                            <Edit size={14} />
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleDelete(post.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
