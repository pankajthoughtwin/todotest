"use client"

import NewsletterSignup from "./newsletter-signup"

export default function Component() {
  return (
    <div>
      {/* Demo content above */}
      <div style={{ padding: "40px", textAlign: "center", backgroundColor: "white" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px", color: "#333" }}>Newsletter Signup Component Demo</h2>
        <p style={{ color: "#666", marginBottom: "40px" }}>
          This component now uses separate CSS classes for better maintainability
        </p>
      </div>

      {/* Newsletter signup component */}
      <NewsletterSignup />

      {/* Demo content below */}
      <div style={{ padding: "40px", textAlign: "center", backgroundColor: "white" }}>
        <p style={{ color: "#666" }}>The CSS is now separated into its own file for easier customization</p>
      </div>
    </div>
  )
}
