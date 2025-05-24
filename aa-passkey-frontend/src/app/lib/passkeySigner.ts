export async function signWithPasskey(message: string): Promise<string | null> {
  try {
    const challenge = Uint8Array.from(message, (c) => c.charCodeAt(0))

    const publicKey: PublicKeyCredentialRequestOptions = {
      challenge,
      timeout: 60000,
      allowCredentials: [],
      userVerification: "preferred"
    }

    const credential = await navigator.credentials.get({ publicKey })

    if (!credential) {
      console.warn("❗ No credential received from navigator.credentials.get")
      return null
    }

    const response = (credential as PublicKeyCredential).response as AuthenticatorAssertionResponse

    const signature = new Uint8Array(response.signature)

    // Return as hex string prefixed with 0x
    return `0x${Buffer.from(signature).toString("hex")}`
  } catch (error) {
    console.error("❌ Failed to sign with passkey:", error)
    return null
  }
}
