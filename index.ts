import dotenv from "dotenv"
import {
  getAccountNonce,
  getUserOperationHash,
  UserOperation,
  bundlerActions,
} from "permissionless"
import {
  pimlicoBundlerActions
} from "permissionless/actions/pimlico"
import {
  createClient,
  createPublicClient,
  encodeFunctionData,
  parseEther,
  http,
} from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { sepolia } from "viem/chains"

dotenv.config()

const apiKey = process.env.PIMLICO_API_KEY!
const privateKey = process.env.PRIVATE_KEY!
const ENTRY_POINT_ADDRESS = "0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789"
const RECEIVER = "0x1d58afB3a049DAd98Ab5219fb1FF768E1E3B2ED3"
const SENDER_ADDRESS = "0xc272ee5f1635680d6599d694564828943C701cEb"

const publicClient = createPublicClient({
  transport: http("https://ethereum-sepolia.publicnode.com"),
  chain: sepolia,
})

const bundlerClient = createClient({
  transport: http(`https://api.pimlico.io/v1/sepolia/rpc?apikey=${apiKey}`),
  chain: sepolia,
})
  .extend(bundlerActions)
  .extend(pimlicoBundlerActions)

const owner = privateKeyToAccount(privateKey)

console.log("Using deployed sender address:", SENDER_ADDRESS)

const nonce = await getAccountNonce(publicClient, {
  sender: SENDER_ADDRESS,
  entryPoint: ENTRY_POINT_ADDRESS,
})

console.log("Nonce:", nonce)

const callData = encodeFunctionData({
  abi: [
    {
      name: "execute",
      type: "function",
      stateMutability: "payable",
      inputs: [
        { name: "dest", type: "address" },
        { name: "value", type: "uint256" },
        { name: "func", type: "bytes" },
      ],
      outputs: [],
    },
  ],
  args: [RECEIVER, parseEther("0.001"), "0x"],
})

const userOperation: UserOperation = {
  sender: SENDER_ADDRESS,
  nonce,
  initCode: "0x", // تم النشر بالفعل
  callData,
  callGasLimit: 100000n,
  verificationGasLimit: 100000n,
  preVerificationGas: 21000n,
  maxFeePerGas: 30_000_000_000n,
  maxPriorityFeePerGas: 30_000_000_000n,
  paymasterAndData: "0x",
  signature: "0x",
}

console.log("UserOperation:", userOperation)

const userOpHash = await getUserOperationHash({
  userOperation,
  entryPoint: ENTRY_POINT_ADDRESS,
  chainId: await publicClient.getChainId(),
})

const signature = await owner.signMessage({ message: { raw: userOpHash } })
userOperation.signature = signature

const userOpHashSent = await bundlerClient.sendUserOperation({
  userOperation,
  entryPoint: ENTRY_POINT_ADDRESS,
})

console.log("UserOperation sent! Hash:", userOpHashSent)

const receipt = await bundlerClient.waitForUserOperationReceipt({
  hash: userOpHashSent,
})

console.log("Tx Receipt:", receipt)
