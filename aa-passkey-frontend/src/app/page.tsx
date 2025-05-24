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

      // ⚠️ Placeholder message — استبدليها لاحقاً بالـ userOpHash الفعلي
      const userOpHash = "0x82ad715fb1cb2d5009b8af3ad73b4e358d40da9f00910af3d860d62e8722e75f"

      const response = (assertion as PublicKeyCredential).response as AuthenticatorAssertionResponse
      const signatureBytes = new Uint8Array(response.signature)
      const hexSignature = `0x${Buffer.from(signatureBytes).toString("hex")}`

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
      console.log("🔏 Signature from API:", result.signature)
      setMessage("✅ Logged in with Passkey!")
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
