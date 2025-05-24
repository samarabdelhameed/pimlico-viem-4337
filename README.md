# 🔐 AA Wallet – Account Abstraction Wallet with Pimlico SDK + Viem (Sepolia)

> A lightweight, minimal smart wallet implementation using [EIP-4337](https://eips.ethereum.org/EIPS/eip-4337), powered by **Pimlico Bundler SDK**, built using **Viem**, and deployed on **Sepolia** testnet.

---

## 👀 Overview

This repository implements the **core logic of an Account Abstraction wallet**, including:

- ERC-4337 Entry Point integration
- Smart account deployment via factory contract
- Counterfactual wallet address generation (`initCode`)
- Native ETH transfer via `execute()` UserOp call
- UserOperation signing with viem + broadcast via Pimlico bundler
- Successfully submitted and executed transaction

> This is a backend-only demo to simulate and test the UserOperation lifecycle.

---

## ⚙️ Architecture

```mermaid
flowchart TD
    A[Generate Wallet + initCode] --> B[getSenderAddress()]
    B --> C[Create UserOperation]
    C --> D[Sign userOpHash]
    D --> E[Send via Pimlico Bundler]
    E --> F[EntryPoint handles execution]
    F --> G[ETH Transferred to Receiver]
```

---

## 📂 Folder Structure

```
.
├── index.ts               # Main script for sending a UserOperation
├── .env.example           # Sample env with required keys
├── .env                   # (Git-ignored) actual API keys & private key
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies
├── README.md              # This documentation
```

---

## 🛠 Tech Stack

| Layer      | Library/Tool        | Purpose                          |
| ---------- | ------------------- | -------------------------------- |
| 🧠 Logic   | EIP-4337            | Account abstraction standard     |
| ⚙️ Client  | Viem                | RPC client & signature utilities |
| ⚡ Bundler | Pimlico SDK         | Bundler & Paymaster APIs         |
| 🔐 Wallet  | LightAccountFactory | Smart wallet contract creation   |
| 🧪 Chain   | Sepolia             | Ethereum testnet                 |

---

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/samarabdelhameed/pimlico-viem-4337.git
cd pimlico-viem-4337
npm install
```

### 2. Add Your `.env` File

```env
PIMLICO_API_KEY=your_pimlico_api_key
PRIVATE_KEY=your_wallet_private_key
```

### 3. Run the Script

```bash
npm start
```

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

You can verify the transaction on [Sepolia Etherscan](https://sepolia.etherscan.io/tx/0xdb141b6a8116579ab286d9b0c20243ade7b4658c090ab27bff53d910e47598ba)

---

## 🔗 Contract References

| Contract     | Address                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| EntryPoint   | `0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789`                                                                                         |
| Smart Wallet | `0xc272ee5f1635680d6599d694564828943C701cEb` (Deployed on Sepolia)                                                                   |
| Factory      | [`0x23adcfF090C9244672114d3fB89D28a018F528FE`](https://sepolia.etherscan.io/address/0x23adcfF090C9244672114d3fB89D28a018F528FE#code) |

---

## 🧠 Implemented

- [x] Viem client with Pimlico bundler
- [x] Full EIP-4337 UserOp generation
- [x] Signed and executed native ETH transfer
- [x] Working transaction on-chain
- [x] No frontend required for testing

---

## 📌 Roadmap

- [ ] WebAuthn (Passkey-based Login)
- [ ] React frontend interface
- [ ] Gas sponsorship with Paymaster (v2)
- [ ] Multi-user wallet support
- [ ] Dashboard for UserOps insights

---

## 📚 References

- [Pimlico Docs](https://docs.pimlico.io)
- [Viem Docs](https://viem.sh)
- [EIP-4337 Spec](https://eips.ethereum.org/EIPS/eip-4337)
- [Sepolia Etherscan](https://sepolia.etherscan.io)

---

## 👩‍💻 Author

**Samar Abdelhameed**
Smart Contract Engineer & Auditor
🔗 [Twitter](https://twitter.com/SamarAbdelhmeed) | [GitHub](https://github.com/samarabdelhameed)

---

> This repo is a fork of [mingder78/pimlico-viem-4337](https://github.com/mingder78/pimlico-viem-4337), extended to support live UserOperation execution on Sepolia testnet.

---
