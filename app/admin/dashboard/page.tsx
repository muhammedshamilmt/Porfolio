"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Mail,
  Eye,
  MessageSquare,
  TrendingUp,
  Calendar,
  Settings,
  LogOut,
  Plus,
  ImageIcon,
  FileText,
  Palette,
  Globe,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthGuard } from "@/components/auth-guard"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminEmail, setAdminEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("adminAuth")
    const email = localStorage.getItem("adminEmail")

    if (auth === "authenticated" && email) {
      setIsAuthenticated(true)
      setAdminEmail(email)
    } else {
      router.push("/auth/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    localStorage.removeItem("adminEmail")
    router.push("/")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Mock data - in a real app, this would come from your backend
  const stats = [
    {
      title: "Total Views",
      value: "12,543",
      change: "+12%",
      icon: Eye,
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Messages",
      value: "23",
      change: "+5",
      icon: Mail,
      color: "from-green-400 to-teal-500",
    },
    {
      title: "Showcase Items",
      value: "18",
      change: "+3",
      icon: ImageIcon,
      color: "from-purple-400 to-pink-500",
    },
    {
      title: "Blog Posts",
      value: "12",
      change: "+2",
      icon: FileText,
      color: "from-yellow-400 to-orange-500",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "message",
      title: "New contact message from John Smith",
      time: "2 hours ago",
      icon: Mail,
      color: "text-green-400",
    },
    {
      id: 2,
      type: "showcase",
      title: "New showcase item uploaded",
      time: "5 hours ago",
      icon: ImageIcon,
      color: "text-purple-400",
    },
    {
      id: 3,
      type: "blog",
      title: "Blog post published: Web Development Trends",
      time: "1 day ago",
      icon: FileText,
      color: "text-blue-400",
    },
    {
      id: 4,
      type: "view",
      title: "Portfolio viewed 50+ times today",
      time: "2 days ago",
      icon: Eye,
      color: "text-cyan-400",
    },
  ]

  const quickActions = [
    {
      title: "View Messages",
      description: "Check contact messages",
      href: "/admin/messages",
      icon: MessageSquare,
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Manage Showcase",
      description: "Edit existing showcase items",
      href: "/admin/showcase",
      icon: Palette,
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Manage Blog",
      description: "Create and edit blog posts",
      href: "/admin/blog",
      icon: FileText,
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "Visit Portfolio",
      description: "View public portfolio",
      href: "/",
      icon: Globe,
      color: "from-yellow-500 to-orange-500",
    },
  ]

  return (
    <AuthGuard>
      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="bg-gray-950 border-b border-gray-800 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-400 text-sm">Welcome back, {adminEmail}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Link href="/admin/showcase/add">
                  <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
                    <Plus className="mr-2" size={16} />
                    Add Content
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <LogOut className="mr-2" size={16} />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
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
                      <div className="flex items-center mt-1">
                        <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                        <span className="text-green-400 text-sm">{stat.change}</span>
                      </div>
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

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-900/50 border-gray-800 mb-8">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Settings className="mr-2 text-cyan-400" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <Link key={index} href={action.href}>
                        <Card className="bg-black/50 border-gray-700 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 cursor-pointer group">
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                              >
                                <action.icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                                  {action.title}
                                </h3>
                                <p className="text-gray-400 text-sm">{action.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Analytics Chart Placeholder */}
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="mr-2 text-cyan-400" />
                    Portfolio Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-800/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">Analytics chart would go here</p>
                      <p className="text-gray-500 text-sm">Integration with analytics service needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="mr-2 text-cyan-400" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-3 p-3 bg-black/30 rounded-lg border border-gray-700"
                      >
                        <div
                          className={`w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center ${activity.color}`}
                        >
                          <activity.icon size={16} />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{activity.title}</p>
                          <p className="text-gray-400 text-xs">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card className="bg-gray-900/50 border-gray-800 mt-6">
                <CardHeader>
                  <CardTitle className="text-white">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Portfolio Status</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Last Backup</span>
                      <span className="text-gray-400 text-sm">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Storage Used</span>
                      <span className="text-gray-400 text-sm">2.3 GB / 10 GB</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full"
                        style={{ width: "23%" }}
                      ></div>
                    </div>
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
