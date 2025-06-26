"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, ArrowLeft, Eye, MessageCircle, User, Share2, Heart, Bookmark, Send } from "lucide-react"
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

interface Comment {
  id: string
  author: string
  email: string
  content: string
  timestamp: string
  replies?: Comment[]
}

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params)
  const [post, setPost] = useState<BlogPost | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState({ author: "", email: "", content: "" })
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likes, setLikes] = useState(0)

  // Mock blog post data
  const mockPost: BlogPost = {
    id: unwrappedParams.id,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt:
      "Exploring the latest trends in web development including AI integration, serverless architecture, and the rise of micro-frontends.",
    content: `
# The Future of Web Development: Trends to Watch in 2024

Web development is evolving at an unprecedented pace, and 2024 promises to be a year of significant transformation. As we navigate through this digital revolution, several key trends are emerging that will shape how we build and interact with web applications.

## AI Integration: The Game Changer

Artificial Intelligence is no longer a futuristic concept—it's here, and it's revolutionizing web development. From AI-powered code completion tools like GitHub Copilot to intelligent chatbots and personalized user experiences, AI is becoming an integral part of the development process.

### Key AI Applications in Web Development:
- **Code Generation**: AI tools can now generate entire components and functions
- **Testing Automation**: Intelligent testing frameworks that adapt and learn
- **User Experience Personalization**: Dynamic content based on user behavior
- **Performance Optimization**: AI-driven performance monitoring and optimization

## Serverless Architecture: Scaling Without Limits

Serverless computing continues to gain momentum, offering developers the ability to build and deploy applications without managing server infrastructure. This trend is particularly appealing for its cost-effectiveness and scalability.

### Benefits of Serverless:
- **Cost Efficiency**: Pay only for what you use
- **Automatic Scaling**: Handle traffic spikes effortlessly
- **Reduced Maintenance**: Focus on code, not infrastructure
- **Faster Time to Market**: Deploy features quickly

## Micro-Frontends: Breaking Down Monoliths

The concept of micro-frontends is gaining traction as teams look for ways to scale their frontend development. This architectural approach allows different teams to work on different parts of a web application independently.

### Advantages of Micro-Frontends:
- **Team Independence**: Different teams can use different technologies
- **Incremental Upgrades**: Update parts of the application without affecting others
- **Fault Isolation**: Issues in one micro-frontend don't crash the entire app
- **Technology Diversity**: Use the best tool for each specific use case

## Progressive Web Apps (PWAs): Bridging the Gap

PWAs continue to evolve, offering native app-like experiences through web browsers. With improved offline capabilities and better performance, PWAs are becoming a viable alternative to native mobile apps.

## WebAssembly: Performance at Scale

WebAssembly (WASM) is enabling high-performance applications in the browser, allowing developers to run code written in languages like C++, Rust, and Go at near-native speeds.

## Conclusion

The future of web development is exciting and full of possibilities. As these trends continue to evolve, developers who stay ahead of the curve will be best positioned to create innovative, efficient, and user-friendly web applications.

What trends are you most excited about? Let me know in the comments below!
    `,
    author: "Your Name",
    publishDate: "2024-01-15",
    readTime: "5 min read",
    category: "Web Development",
    tags: ["React", "Next.js", "AI", "Trends", "Serverless", "PWA"],
    image: "/placeholder.svg?height=400&width=800",
    views: 1250,
    comments: 23,
    featured: true,
  }

  const mockComments: Comment[] = [
    {
      id: "1",
      author: "John Developer",
      email: "john@example.com",
      content:
        "Great insights! I'm particularly excited about AI integration in web development. It's already changing how I write code.",
      timestamp: "2024-01-16T10:30:00Z",
    },
    {
      id: "2",
      author: "Sarah Designer",
      email: "sarah@example.com",
      content:
        "The micro-frontends approach sounds interesting. Have you worked on any projects using this architecture?",
      timestamp: "2024-01-16T14:20:00Z",
    },
    {
      id: "3",
      author: "Mike Frontend",
      email: "mike@example.com",
      content:
        "PWAs are definitely the future. The offline capabilities are getting so much better. Thanks for the comprehensive overview!",
      timestamp: "2024-01-17T09:15:00Z",
    },
  ]

  useEffect(() => {
    // In a real app, you would fetch the post data based on the ID
    setPost(mockPost)
    setComments(mockComments)
    setLikes(Math.floor(Math.random() * 100) + 50)
  }, [unwrappedParams.id])

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.author || !newComment.email || !newComment.content) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: newComment.author,
      email: newComment.email,
      content: newComment.content,
      timestamp: new Date().toISOString(),
    }

    setComments([comment, ...comments])
    setNewComment({ author: "", email: "", content: "" })
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading post...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <section className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse floating-3d"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000 floating-3d"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <Link href="/blog">
              <Button
                variant="outline"
                className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-105 bg-black/50 tilt-3d"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back to Blog
              </Button>
            </Link>

            <div className="flex items-center space-x-3">
              <Button
                onClick={handleLike}
                variant="outline"
                size="sm"
                className={`${
                  isLiked ? "bg-red-500 border-red-500 text-white" : "border-gray-600 text-gray-300"
                } hover:scale-105 transition-all duration-300`}
              >
                <Heart className={`mr-1 ${isLiked ? "fill-current" : ""}`} size={16} />
                {likes}
              </Button>

              <Button
                onClick={() => setIsBookmarked(!isBookmarked)}
                variant="outline"
                size="sm"
                className={`${
                  isBookmarked ? "bg-yellow-500 border-yellow-500 text-black" : "border-gray-600 text-gray-300"
                } hover:scale-105 transition-all duration-300`}
              >
                <Bookmark className={`${isBookmarked ? "fill-current" : ""}`} size={16} />
              </Button>

              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:scale-105 transition-all duration-300"
              >
                <Share2 size={16} />
              </Button>
            </div>
          </div>

          {/* Post Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Badge variant="outline" className="border-cyan-400/50 text-cyan-400">
                {post.category}
              </Badge>
              <div className="flex items-center text-gray-400 text-sm">
                <Calendar size={14} className="mr-1" />
                {new Date(post.publishDate).toLocaleDateString()}
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Clock size={14} className="mr-1" />
                {post.readTime}
              </div>
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 floating-3d">{post.title}</h1>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center">
                <User size={14} className="mr-1" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Eye size={14} className="mr-1" />
                {post.views} views
              </div>
              <div className="flex items-center">
                <MessageCircle size={14} className="mr-1" />
                {comments.length} comments
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative overflow-hidden rounded-2xl mb-8 card-3d depth-shadow">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-64 lg:h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="bg-black/50 backdrop-blur-sm border-gray-800 mb-8">
                <CardContent className="p-8">
                  <div className="prose prose-invert prose-cyan max-w-none">
                    <div className="text-gray-300 leading-relaxed whitespace-pre-line">{post.content}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 transition-colors"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Comments Section */}
              <Card className="bg-black/50 backdrop-blur-sm border-gray-800">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <MessageCircle className="mr-3 text-cyan-400" />
                    Comments ({comments.length})
                  </h3>

                  {/* Comment Form */}
                  <form
                    onSubmit={handleCommentSubmit}
                    className="mb-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700"
                  >
                    <h4 className="text-lg font-semibold text-white mb-4">Leave a Comment</h4>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <Input
                        placeholder="Your Name"
                        value={newComment.author}
                        onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                        className="bg-black/50 border-gray-600 text-white"
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={newComment.email}
                        onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                        className="bg-black/50 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <Textarea
                      placeholder="Your comment..."
                      rows={4}
                      value={newComment.content}
                      onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                      className="bg-black/50 border-gray-600 text-white mb-4"
                      required
                    />
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                    >
                      <Send className="mr-2" size={16} />
                      Post Comment
                    </Button>
                  </form>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.map((comment) => (
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
                        </div>
                        <p className="text-gray-300 leading-relaxed">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Author Info */}
                <Card className="bg-black/50 backdrop-blur-sm border-gray-800">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">{post.author}</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Freelance Designer & Developer passionate about creating amazing digital experiences.
                    </p>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                    >
                      Follow
                    </Button>
                  </CardContent>
                </Card>

                {/* Related Posts */}
                <Card className="bg-black/50 backdrop-blur-sm border-gray-800">
                  <CardContent className="p-6">
                    <h4 className="text-white font-semibold mb-4">Related Posts</h4>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex space-x-3">
                          <img
                            src={`/placeholder.svg?height=60&width=80`}
                            alt="Related post"
                            className="w-20 h-15 object-cover rounded"
                          />
                          <div>
                            <h5 className="text-white text-sm font-medium line-clamp-2 mb-1">Related Post Title {i}</h5>
                            <p className="text-gray-400 text-xs">2 days ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
