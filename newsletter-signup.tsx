"use client"

import type React from "react"
import { useState } from "react"
import "./newsletter-signup.css"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubscribed(true)
    setIsSubmitting(false)

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false)
      setEmail("")
    }, 3000)
  }

  return (
    <div className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h1 className="newsletter-title">Never miss a story</h1>

          <p className="newsletter-subtitle">Stay updated about Thoughtwin news as it happens</p>

          {isSubscribed ? (
            <div className="success-message">Thank you for subscribing!</div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="email-input"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className={`subscribe-button ${isSubmitting || !email.trim() ? "disabled" : ""}`}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
