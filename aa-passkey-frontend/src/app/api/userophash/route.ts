import { NextRequest } from "next/server"

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json()
    const { message, signature } = body

    if (!message || !signature) {
      return new Response("Message and signature are required", {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      })
    }

    // ✅ لاحقًا: استخدم الـ signature للتحقق أو التوقيع على userOp
    console.log("🧾 Received message:", message)
    console.log("✍️ Received signature:", signature)

    return new Response(
      JSON.stringify({
        status: "✅ Signature received",
        message,
        signature
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
  } catch (err) {
    console.error("❌ Error in /api/userophash:", err)
    return new Response("❌ Internal Server Error", {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
}
