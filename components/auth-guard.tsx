"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check both localStorage and cookies
        const localAuth = localStorage.getItem("adminAuth")
        const cookieAuth = document.cookie
          .split("; ")
          .find((row) => row.startsWith("adminAuth="))
          ?.split("=")[1]

        const isAuth = localAuth === "authenticated" || cookieAuth === "authenticated"

        setIsAuthenticated(isAuth)

        if (!isAuth) {
          // Clear any stale data
          localStorage.removeItem("adminAuth")
          localStorage.removeItem("adminEmail")
          document.cookie = "adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
          document.cookie = "adminEmail=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"

          // Redirect to login
          router.push("/auth/login")
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setIsAuthenticated(false)
        router.push("/auth/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="flex items-center justify-center space-x-2 text-white">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Verifying access...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return <>{children}</>
}
