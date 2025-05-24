export async function createPasskey(userId: string, username: string) {
    const challenge = crypto.randomUUID()
  
    const publicKey: PublicKeyCredentialCreationOptions = {
      challenge: Uint8Array.from(challenge, c => c.charCodeAt(0)),
      rp: {
        name: "AA Wallet App",
      },
      user: {
        id: Uint8Array.from(userId, c => c.charCodeAt(0)),
        name: username,
        displayName: username,
      },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 },
        { type: "public-key", alg: -257 },
      ],
      timeout: 60000,
      attestation: "none",
    }
  
    const credential = await navigator.credentials.create({ publicKey })
    return credential
  }
  
  export async function loginWithPasskey() {
    const challenge = crypto.randomUUID()
  
    const publicKey: PublicKeyCredentialRequestOptions = {
      challenge: Uint8Array.from(challenge, c => c.charCodeAt(0)),
      timeout: 60000,
      allowCredentials: [],
      userVerification: "preferred"
    }
  
    const assertion = await navigator.credentials.get({ publicKey })
    return assertion
  }
  