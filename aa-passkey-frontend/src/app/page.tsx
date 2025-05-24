"use client"

import { useState } from "react"
import { createPasskey, loginWithPasskey } from "./lib/webauthn"
import { signWithPasskey } from "./lib/passkeySigner"

export default function Home() {
  const [message, setMessage] = useState("")

  const handleRegister = async () => {
    try {
      const userId = "user123"
      const username = "samar@example.com"
      const credential = await createPasskey(userId, username)
      setMessage("✅ Registered Passkey!")
      console.log("Credential:", credential)
    } catch (err) {
      console.error(err)
      setMessage("❌ Registration failed")
    }
  }

  const handleLogin = async () => {
    try {
      const assertion = await loginWithPasskey()
      const signature = await signWithPasskey("sign this for login")
      setMessage("✅ Logged in with Passkey!")
      console.log("Assertion:", assertion)
      console.log("Signature:", signature)
    } catch (err) {
      console.error(err)
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
