"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Eye, Upload, X, Calendar, Clock, Tag, FileText, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"

export default function CreateBlogPost() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [] as string[],
    image: "",
    featured: false,
    status: "draft" as "draft" | "published" | "scheduled",
    publishDate: new Date().toISOString().split("T")[0],
    readTime: "",
  })
  const [newTag, setNewTag] = useState("")
  const [isPreview, setIsPreview] = useState(false)

  const categories = ["Web Development", "Design", "Freelancing", "Tutorial", "Opinion"]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const handleSave = (status: "draft" | "published") => {
    const postData = {
      ...formData,
      status,
      id: Date.now().toString(),
      author: "Shaz",
      views: 0,
      comments: 0,
    }

    // In a real app, you would make an API call to save the post
    console.log("Saving post:", postData)

    // Redirect to blog management
    router.push("/admin/blog")
  }

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  // Auto-update read time when content changes
  const handleContentChange = (content: string) => {
    handleInputChange("content", content)
    handleInputChange("readTime", estimateReadTime(content))
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="bg-gray-950 border-b border-gray-800 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/admin/blog">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <ArrowLeft className="mr-2" size={16} />
                    Back to Blog
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-white">Create New Post</h1>
                  <p className="text-gray-400 text-sm">Write and publish your blog post</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => setIsPreview(!isPreview)}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Eye className="mr-2" size={16} />
                  {isPreview ? "Edit" : "Preview"}
                </Button>
                <Button
                  onClick={() => handleSave("draft")}
                  variant="outline"
                  className="border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-black"
                >
                  <Save className="mr-2" size={16} />
                  Save Draft
                </Button>
                <Button
                  onClick={() => handleSave("published")}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                >
                  <FileText className="mr-2" size={16} />
                  Publish
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {!isPreview ? (
                <div className="space-y-6">
                  {/* Title */}
                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <FileText className="mr-2 text-cyan-400" />
                        Post Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="title" className="text-gray-300">
                          Title *
                        </Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          placeholder="Enter post title..."
                          className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <Label htmlFor="excerpt" className="text-gray-300">
                          Excerpt *
                        </Label>
                        <Textarea
                          id="excerpt"
                          value={formData.excerpt}
                          onChange={(e) => handleInputChange("excerpt", e.target.value)}
                          placeholder="Brief description of your post..."
                          rows={3}
                          className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <Label htmlFor="image" className="text-gray-300">
                          Featured Image URL
                        </Label>
                        <div className="flex space-x-2">
                          <Input
                            id="image"
                            value={formData.image}
                            onChange={(e) => handleInputChange("image", e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400"
                          />
                          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                            <Upload size={16} />
                          </Button>
                        </div>
                        {formData.image && (
                          <div className="mt-2">
                            <img
                              src={formData.image || "/placeholder.svg"}
                              alt="Preview"
                              className="w-full h-32 object-cover rounded-lg"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg?height=128&width=256"
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Content */}
                  <Card className="bg-gray-900/50 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={formData.content}
                        onChange={(e) => handleContentChange(e.target.value)}
                        placeholder="Write your blog post content here... (Supports Markdown)"
                        rows={20}
                        className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 font-mono"
                      />
                      <div className="mt-2 text-sm text-gray-400">
                        {formData.content.trim().split(/\s+/).length} words • {formData.readTime}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                /* Preview */
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-invert max-w-none">
                      {formData.image && (
                        <img
                          src={formData.image || "/placeholder.svg"}
                          alt={formData.title}
                          className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                      )}
                      <h1 className="text-3xl font-bold text-white mb-4">{formData.title || "Untitled Post"}</h1>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {new Date(formData.publishDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {formData.readTime}
                        </div>
                        {formData.category && (
                          <Badge variant="outline" className="border-cyan-400/30 text-cyan-400">
                            {formData.category}
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-300 text-lg mb-6">{formData.excerpt}</p>
                      <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                        {formData.content || "Start writing your content..."}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Post Settings */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Settings className="mr-2 text-cyan-400" />
                    Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="category" className="text-gray-300">
                      Category
                    </Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      className="w-full mt-1 bg-black/50 border border-gray-700 text-white rounded-md px-3 py-2 focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="publishDate" className="text-gray-300">
                      Publish Date
                    </Label>
                    <Input
                      id="publishDate"
                      type="date"
                      value={formData.publishDate}
                      onChange={(e) => handleInputChange("publishDate", e.target.value)}
                      className="bg-black/50 border-gray-700 text-white focus:border-cyan-400"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured" className="text-gray-300">
                      Featured Post
                    </Label>
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleInputChange("featured", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Tag className="mr-2 text-cyan-400" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Add tag..."
                      className="bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400"
                    />
                    <Button
                      onClick={addTag}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-cyan-400/30 text-cyan-400 flex items-center space-x-1"
                      >
                        <span>#{tag}</span>
                        <button onClick={() => removeTag(tag)} className="ml-1 hover:text-red-400 transition-colors">
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Word Count:</span>
                    <span className="text-white">{formData.content.trim().split(/\s+/).length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Read Time:</span>
                    <span className="text-white">{formData.readTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Characters:</span>
                    <span className="text-white">{formData.content.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tags:</span>
                    <span className="text-white">{formData.tags.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
