import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MouseTracker } from "@/components/mouse-tracker"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Your Portfolio - Website Developer",
  description: "Professional website developer portfolio showcasing modern web development projects and skills.",
  icons: [
    { rel: "icon", url: "/favicon.ico"},
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MouseTracker />
        {children}
      </body>
    </html>
  )
}
