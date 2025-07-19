import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Todo App - Manage Your Tasks",
    template: "%s | Todo App",
  },
  description:
    "A modern todo application built with Next.js, PostgreSQL, and Prisma. Manage your tasks efficiently with CRUD operations.",
  keywords: ["todo", "task management", "productivity", "nextjs", "prisma", "postgresql"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  publisher: "Todo App",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Todo App - Manage Your Tasks",
    description: "A modern todo application built with Next.js, PostgreSQL, and Prisma.",
    siteName: "Todo App",
  },
  twitter: {
    card: "summary_large_image",
    title: "Todo App - Manage Your Tasks",
    description: "A modern todo application built with Next.js, PostgreSQL, and Prisma.",
    creator: "@yourusername",
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-gray-900">Todo App</h1>
            </div>
          </header>
          <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
        </div>
      </body>
    </html>
  )
}
