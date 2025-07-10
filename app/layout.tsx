import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "@/components/client-layout"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Muhammed Shamil MT",
  description: "Muhammed Shamil MT - Professional Freelance website developer in Palakkad.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  verification: {
    google: "Ze2aFW-vR3x1r3GPnpbNKpvC_6GDSnO4l3MzolqzzWs",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
{/*         <ClientLayout> */}
          {children}
{/*         </ClientLayout> */}
      </body>
    </html>
  )
}
