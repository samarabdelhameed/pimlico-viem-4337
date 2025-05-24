# 🔐 AA Wallet – Account Abstraction Wallet with Pimlico SDK + Viem + Passkey (Sepolia)

> A full-stack smart wallet implementation using [EIP-4337](https://eips.ethereum.org/EIPS/eip-4337), powered by **Pimlico Bundler SDK**, built with **Viem**, and extended with **Passkey (WebAuthn)** login. Deployed on the **Sepolia** testnet.

---

## 👀 Overview

This repository implements the **core logic of an Account Abstraction wallet**, including:

- ERC-4337 Entry Point integration
- Smart account deployment via factory contract
- Counterfactual wallet address generation (`initCode`)
- Native ETH transfer via `execute()` UserOp call
- UserOperation signing with Viem and Passkey
- Integration with **Passkey / WebAuthn** login using browser-native credentials
- Fully working backend and frontend demo

> This repo is a full simulation from account creation to biometric login and transaction signing

---

## ⚙️ Architecture

```mermaid
flowchart TD
    A[Generate Wallet + initCode] --> B[getSenderAddress()]
    B --> C[Create UserOperation]
    C --> D[Sign userOpHash via Viem or Passkey]
    D --> E[Send via Pimlico Bundler]
    E --> F[EntryPoint handles execution]
    F --> G[ETH Transferred to Receiver]
```

---

## 📂 Folder Structure

```
.
├── index.ts                        # Backend logic: send UserOperation
├── aa-passkey-frontend            # Frontend: Passkey registration & login
│   └── src/app                    # Pages and components
│       └── lib                    # Passkey logic
│           ├── webauthn.ts       # WebAuthn creation & login functions
│           └── passkeySigner.ts  # Signature logic using passkey
├── .env.example                   # Sample environment file
├── .env                           # (Git-ignored) API key + private key
├── tsconfig.json / package.json  # Config and dependencies
├── README.md                      # This documentation
```

---

## 🛠 Tech Stack

| Layer       | Library/Tool        | Purpose                      |
| ----------- | ------------------- | ---------------------------- |
| 🧠 Logic    | EIP-4337            | Account abstraction standard |
| ⚙️ Client   | Viem                | RPC & signature generation   |
| ⚡ Bundler  | Pimlico SDK         | UserOperation bundling       |
| 🔐 Wallet   | LightAccountFactory | Deploys smart wallet         |
| 🔏 Auth     | WebAuthn (Passkey)  | Secure biometric login       |
| 💻 Frontend | Next.js + Tailwind  | UI & integration             |
| 🧪 Chain    | Sepolia             | Ethereum testnet             |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/samarabdelhameed/pimlico-viem-4337.git
cd pimlico-viem-4337
npm install
```

### 2. Add Environment Variables

```env
PIMLICO_API_KEY=your_pimlico_api_key
PRIVATE_KEY=your_wallet_private_key
```

### 3. Run Backend Script

```bash
npm start
```

### 4. Run Frontend with Passkey Login

```bash
cd aa-passkey-frontend
npm install
npm run dev
```

Then visit: [http://localhost:3000](http://localhost:3000)

---

## ✅ Last Successful Execution

```bash
Using deployed sender address: 0xc272ee5f1635680d6599d694564828943C701cEb
Nonce: 2n
UserOperation sent! Hash: 0x93b8fe9f58321bc4ac9ef96197df264c039b6d8381195716000d865fb2518c1c
Tx Receipt:
- Tx Hash: 0xdb141b6a8116579ab286d9b0c20243ade7b4658c090ab27bff53d910e47598ba
- Success: ✅ true
- Gas Used: 72020
- Receiver: 0x1d58afB3a049DAd98Ab5219fb1FF768E1E3B2ED3
- Amount: 0.001 ETH
```

🔗 [View on Sepolia Etherscan](https://sepolia.etherscan.io/tx/0xdb141b6a8116579ab286d9b0c20243ade7b4658c090ab27bff53d910e47598ba)

---

## 🔐 WebAuthn (Passkey Login) Module

- Users can register a biometric passkey (via FaceID / fingerprint)
- Login verifies user identity with built-in WebAuthn browser APIs
- Signature returned from Passkey can be used to sign `userOpHash`

### 📁 `src/app/lib/webauthn.ts`

```ts
export async function createPasskey(userId: string, username: string) { ... }
export async function loginWithPasskey() { ... }
```

### 📁 `src/app/lib/passkeySigner.ts`

```ts
export async function signWithPasskey(data: string): Promise<ArrayBuffer | null> { ... }
```

### ✅ Sample Flow Console Output

```ts
Assertion: { id: "Y0fg...", type: "public-key" }
Signature: 0x3044...c9b
```

---

## 🔗 Contract References

| Contract     | Address                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| EntryPoint   | `0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789`                                                                                         |
| Smart Wallet | `0xc272ee5f1635680d6599d694564828943C701cEb`                                                                                         |
| Factory      | [`0x23adcfF090C9244672114d3fB89D28a018F528FE`](https://sepolia.etherscan.io/address/0x23adcfF090C9244672114d3fB89D28a018F528FE#code) |

---

## 🧠 Implemented

- [x] Viem + Pimlico Bundler integration
- [x] EIP-4337 UserOperation logic
- [x] ETH transfer with signature
- [x] Biometric login via Passkey
- [x] Working UI with React + Tailwind

---

## 📌 Roadmap

- [ ] Gasless UX with Pimlico Paymaster
- [ ] Multi-chain wallet explorer
- [ ] Dashboard for UserOps insights
- [ ] Integration with Etherscan APIs

---

## 📚 References

- [Pimlico Docs](https://docs.pimlico.io)
- [EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Viem Docs](https://viem.sh)
- [WebAuthn Guide](https://webauthn.guide/)
- [Next.js Docs](https://nextjs.org/docs)

---

## 👩‍💻 Author

**Samar Abdelhameed**  
Smart Contract Engineer & Auditor  
🔗 [Twitter](https://twitter.com/SamarAbdelhmeed) | [GitHub](https://github.com/samarabdelhameed)

---

> This repo is a fork of [mingder78/pimlico-viem-4337](https://github.com/mingder78/pimlico-viem-4337), extended with full E2E support for Passkey-based secure login and EIP-4337 execution.
