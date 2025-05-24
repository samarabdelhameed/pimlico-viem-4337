# 🔐 AA Wallet – Account Abstraction Wallet with Pimlico SDK + Viem (Sepolia)

> A lightweight, minimal smart wallet implementation using [EIP-4337](https://eips.ethereum.org/EIPS/eip-4337), powered by **Pimlico Bundler & Paymaster SDK**, built using **Viem** and deployed on **Sepolia** testnet.

---

## 👀 Overview

This repository implements the **core logic of an Account Abstraction wallet**. The project includes:

- ERC-4337 Entry Point integration
- Counterfactual wallet address generation (`initCode`)
- Viem-based client and bundler setup
- Bundler and Paymaster connection via Pimlico SDK
- Ready to integrate **WebAuthn/Passkey Login**

> This is a base repo to test and simulate UserOps flow without frontend yet.

---

## ⚙️ Architecture

```mermaid
flowchart TD
    A[User or dApp] --> B[Generate initCode]
    B --> C[Simulate getSenderAddress()]
    C --> D[Send UserOperation via Pimlico Bundler]
    D --> E[EntryPoint executes the UserOp]
    E --> F[Counterfactual Wallet Deployed]
```

---

## 📂 Folder Structure

```
.
├── index.ts               # Main execution logic
├── .env.example           # Sample environment file
├── .env                   # (Ignored) contains API keys and private key
├── tsconfig.json          # TypeScript config
├── package.json           # Dependencies
├── README.md              # This file
```

---

## 🛠 Tech Stack

| Layer         | Library/Tool          | Purpose                         |
| ------------- | --------------------- | ------------------------------- |
| 🧠 Core Logic | EIP-4337 / EntryPoint | Account abstraction standard    |
| ⚙️ Client     | Viem                  | JSON-RPC client & simulation    |
| ⚡ Bundler    | Pimlico SDK           | Bundler & Paymaster integration |
| 🔐 Account    | Smart Wallet Factory  | Light Account implementation    |
| 🔧 Chain      | Sepolia               | Ethereum testnet                |

---

## 🚀 Getting Started

### 1. Clone the project

```bash
git clone https://github.com/samarabdelhameed/pimlico-viem-4337.git
cd pimlico-viem-4337
npm install
```

### 2. Add your `.env` file

```env
PIMLICO_API_KEY=your_pimlico_api_key
PRIVATE_KEY=your_private_key
```

### 3. Run the script

```bash
npm start
```

---

## ✅ Output (Expected)

```bash
Generated wallet with private key: 0x...
Generated initCode: 0x...
Counterfactual sender address: 0x...
```

This means everything is wired up successfully.

---

## 📌 EntryPoint + Factory References

- **EntryPoint (Sepolia)**: `0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789`
- **LightAccountFactory (Sepolia)**: [`0x23adcfF090C9244672114d3fB89D28a018F528FE`](https://sepolia.etherscan.io/address/0x23adcfF090C9244672114d3fB89D28a018F528FE#code)

---

## 🧠 Implemented

- [x] Viem Client Setup
- [x] Pimlico Bundler v1 & Paymaster v2 integration
- [x] Generated `initCode` for counterfactual wallet
- [x] `getSenderAddress()` logic tested on Sepolia
- [x] Working `.env` environment

---

## 📌 Roadmap (Next steps)

- [ ] Integrate WebAuthn (Passkey login)
- [ ] Add frontend (React/Vite or React Native)
- [ ] Simulate full UserOp submission & signature flow
- [ ] Add Paymaster sponsor mode (Gasless UX)
- [ ] Dashboard to monitor UserOps + balances

---

## 📚 Resources

- [Pimlico Docs](https://docs.pimlico.io)
- [EIP-4337 Spec](https://eips.ethereum.org/EIPS/eip-4337)
- [Viem Docs](https://viem.sh)
- [Ethereum Sepolia Explorer](https://sepolia.etherscan.io)

---

## 👩‍💻 Author

**Samar Abdelhameed**
Smart Contract Engineer & Auditor
🔗 [Twitter](https://twitter.com/SamarAbdelhmeed) | [GitHub](https://github.com/samarabdelhameed)

---

> This repository is a fork of [mingder78/pimlico-viem-4337](https://github.com/mingder78/pimlico-viem-4337), updated with working AA Wallet logic and Sepolia support.

```

```
