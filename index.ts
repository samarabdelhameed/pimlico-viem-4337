import dotenv from "dotenv"
import { getAccountNonce } from "permissionless"
import {
  UserOperation,
  bundlerActions,
  getSenderAddress,
  getUserOperationHash,
  waitForUserOperationReceipt,
  GetUserOperationReceiptReturnType
} from "permissionless"
import {
  pimlicoBundlerActions,
  pimlicoPaymasterActions
} from "permissionless/actions/pimlico"
import {
  Address,
  Hash,
  concat,
  createClient,
  createPublicClient,
  encodeFunctionData,
  http,
  Hex
} from "viem"
import {
  generatePrivateKey,
  privateKeyToAccount,
  signMessage
} from "viem/accounts"
import { sepolia } from "viem/chains"

dotenv.config()

const apiKey = process.env.PIMLICO_API_KEY
const privateKey = process.env.PRIVATE_KEY

const ENTRY_POINT_ADDRESS = "0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789"

// ✅ استخدمي RPC سريع على شبكة Sepolia
const publicClient = createPublicClient({
  transport: http("https://ethereum-sepolia.publicnode.com"),
  chain: sepolia
})

console.log(publicClient)

// ✅ عدلنا اسم الشبكة لـ sepolia بدلاً من linea-testnet
const chain = "sepolia"

const bundlerClient = createClient({
  transport: http(`https://api.pimlico.io/v1/${chain}/rpc?apikey=${apiKey}`),
  chain: sepolia
})
  .extend(bundlerActions)
  .extend(pimlicoBundlerActions)

console.log(bundlerClient)

const paymasterClient = createClient({
  transport: http(`https://api.pimlico.io/v2/${chain}/rpc?apikey=${apiKey}`),
  chain: sepolia
}).extend(pimlicoPaymasterActions)

console.log(paymasterClient)

// GENERATE THE INITCODE
const SIMPLE_ACCOUNT_FACTORY_ADDRESS = "0x23adcfF090C9244672114d3fB89D28a018F528FE"

const ownerPrivateKey = privateKey
const owner = privateKeyToAccount(ownerPrivateKey)

console.log("Generated wallet with private key:", ownerPrivateKey)

const initCode = concat([
  SIMPLE_ACCOUNT_FACTORY_ADDRESS,
  encodeFunctionData({
    abi: [
      {
        inputs: [
          { name: "owner", type: "address" },
          { name: "salt", type: "uint256" }
        ],
        name: "createAccount",
        outputs: [{ name: "ret", type: "address" }],
        stateMutability: "nonpayable",
        type: "function"
      }
    ],
    args: [owner.address, 0n]
  })
])

console.log("Generated initCode:", initCode)
console.log("no send initCode yet....")

const senderAddress = await getSenderAddress(publicClient, {
  initCode,
  entryPoint: ENTRY_POINT_ADDRESS
})

console.log("Counterfactual sender address:", senderAddress)
