"use client"

import { X, Copy, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface BlogModalProps {
  showGeneratedBlogModal: boolean
  setShowGeneratedBlogModal: (show: boolean) => void
  generatedBlogContent: string
}

export default function BlogModal({
  showGeneratedBlogModal,
  setShowGeneratedBlogModal,
  generatedBlogContent,
}: BlogModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedBlogContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([generatedBlogContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "generated-blog.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (!showGeneratedBlogModal) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: "transparent",
        pointerEvents: "none",
      }}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-xl mx-auto"
        style={{
          pointerEvents: "auto",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-medium">Generated Blog</h2>
          <button
            onClick={() => setShowGeneratedBlogModal(false)}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area with Bootstrap Scrolling */}
        <div className="flex-1 overflow-auto p-4" style={{ maxHeight: "calc(80vh - 130px)" }}>
          <pre
            className="whitespace-pre-wrap font-sans text-sm text-gray-700"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              lineHeight: "1.6",
            }}
          >
            {generatedBlogContent}
          </pre>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-200 bg-gray-50">
          <Button variant="outline" size="sm" onClick={handleCopy} className="flex items-center gap-1.5">
            <Copy className="w-4 h-4" />
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload} className="flex items-center gap-1.5">
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button onClick={() => setShowGeneratedBlogModal(false)} size="sm">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
