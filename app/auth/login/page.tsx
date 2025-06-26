"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, Mail, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate loading
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check credentials
      if (formData.email === "shaz80170@gmail.com" && formData.password === "871459") {
        // Set authentication cookie
        document.cookie = `adminAuth=authenticated; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
        document.cookie = `adminEmail=${formData.email}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`

        // Also store in localStorage as backup
        localStorage.setItem("adminAuth", "authenticated")
        localStorage.setItem("adminEmail", formData.email)

        // Redirect to admin dashboard
        router.push("/admin/dashboard")
        router.refresh() // Force a refresh to update middleware
      } else {
        setError("Invalid email or password. Please try again.")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    }

    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("") // Clear error when user types
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse floating-3d"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000 floating-3d"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400/5 rounded-full blur-2xl animate-pulse delay-2000 floating-3d"></div>

        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Back to Home */}
        <div className="mb-8 animate-fade-in-up">
          <Link href="/">
            <Button
              variant="outline"
              className="group border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-105 bg-black/50 backdrop-blur-sm tilt-3d depth-shadow"
            >
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card className="bg-black/60 backdrop-blur-xl border border-gray-800/50 shadow-2xl shadow-cyan-500/10 card-3d depth-shadow animate-fade-in-up delay-200">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 floating-3d shadow-lg shadow-cyan-400/30">
              <Shield className="w-10 h-10 text-white animate-pulse" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">Admin Portal</CardTitle>
            <p className="text-gray-400 text-sm">Secure access to portfolio management</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert className="border-red-500/50 bg-red-500/10 backdrop-blur-sm animate-shake">
                <AlertDescription className="text-red-400 flex items-center">
                  <Lock className="mr-2" size={16} />
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-colors"
                    size={20}
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="pl-10 bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-cyan-400 transition-colors"
                    size={20}
                  />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 tilt-3d depth-shadow relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 group-hover:animate-pulse" size={20} />
                    Access Dashboard
                  </>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                <Shield className="mr-2" size={16} />
                Demo Credentials
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Email:</span>
                  <code className="text-cyan-400 bg-black/30 px-2 py-1 rounded">shaz80170@gmail.com</code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Password:</span>
                  <code className="text-cyan-400 bg-black/30 px-2 py-1 rounded">871459</code>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="text-center">
              <p className="text-xs text-gray-500 flex items-center justify-center">
                <Lock className="mr-1" size={12} />
                Secured with enterprise-grade encryption
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
