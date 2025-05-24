"use client"

import { useState } from "react"
import { createPasskey, loginWithPasskey } from "./lib/webauthn"

export default function Home() {
  const [message, setMessage] = useState("")

  const handleRegister = async () => {
    try {
      const userId = "user123"
      const username = "samar@example.com"
      const credential = await createPasskey(userId, username)
      setMessage("✅ Registered Passkey!")
      console.log("🧠 Credential:", credential)
    } catch (err) {
      console.error("❌ Registration error:", err)
      setMessage("❌ Registration failed")
    }
  }

  const handleLogin = async () => {
    try {
      const assertion = await loginWithPasskey()
      console.log("🧠 Assertion:", assertion)

      const response = (assertion as PublicKeyCredential).response as AuthenticatorAssertionResponse
      const signature = new Uint8Array(response.signature)
      const hexSignature = `0x${Buffer.from(signature).toString("hex")}`

      // Placeholder message (replace later with actual userOpHash)
      const userOpHash = "sign this for login"

      const res = await fetch("/api/userophash", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userOpHash,
          signature: hexSignature
        })
      })

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(`API error: ${errText}`)
      }

      const result = await res.json()

      setMessage("✅ Logged in with Passkey!")
      console.log("🔏 Signature from API:", result.signature)
    } catch (err) {
      console.error("❌ Login error:", err)
      setMessage("❌ Login failed")
    }
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>🔐 AA Wallet – Passkey Login</h1>
      <button onClick={handleRegister}>Register with Passkey</button>
      <button onClick={handleLogin} style={{ marginLeft: 20 }}>
        Login with Passkey
      </button>
      <p style={{ marginTop: 20 }}>{message}</p>
    </main>
  )
}
