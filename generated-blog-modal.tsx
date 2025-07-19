"use client"

import { X, Copy, Download } from "lucide-react"
import { useState } from "react"

interface GeneratedBlogModalProps {
  show: boolean
  onHide: () => void
  generatedBlogContent: string
}

export default function GeneratedBlogModal({ show, onHide, generatedBlogContent }: GeneratedBlogModalProps) {
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

  if (!show) return null

  return (
    <>
      {/* Custom Modal Overlay */}
      <div
        className="modal-backdrop-custom"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1050,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={onHide}
      >
        <div
          className="modal-content-custom"
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "700px",
            maxWidth: "90vw",
            maxHeight: "90vh",
            overflow: "hidden",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h4 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#1f2937" }}>Generated Blog</h4>
            <button
              onClick={onHide}
              style={{
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#6b7280",
                padding: "4px",
              }}
            >
              ×
            </button>
          </div>

          {/* Modal Body */}
          <div
            style={{
              padding: "24px",
              flex: 1,
              overflow: "auto",
              maxHeight: "calc(90vh - 140px)",
            }}
          >
            <pre
              style={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#374151",
                margin: 0,
                padding: "16px",
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
              }}
            >
              {generatedBlogContent}
            </pre>
          </div>

          {/* Modal Footer */}
          <div
            style={{
              padding: "20px 24px",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              backgroundColor: "#f9fafb",
            }}
          >
            <button
              type="button"
              onClick={handleCopy}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                backgroundColor: "white",
                color: "#374151",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <Copy size={16} />
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                backgroundColor: "white",
                color: "#374151",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <Download size={16} />
              Download
            </button>
            <button
              type="button"
              onClick={onHide}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                backgroundColor: "#4f46e5",
                color: "white",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <X size={16} />
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
