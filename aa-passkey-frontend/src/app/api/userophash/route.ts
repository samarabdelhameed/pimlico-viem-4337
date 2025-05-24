import { NextRequest } from "next/server"

export async function POST(request: NextRequest): Promise<Response> {
  try {
    // 🧠 قراءة الـ body بصيغة JSON
    const body = await request.json()

    // 🧾 استخراج القيم
    const message: string | undefined = body?.message
    const signature: string | undefined = body?.signature

    // ⚠️ تحقق من وجود و نوع البيانات المطلوبة
    if (!message || !signature || typeof message !== "string" || typeof signature !== "string") {
      console.warn("⚠️ Invalid request:", body)
      return new Response(
        JSON.stringify({
          status: "❌ Invalid input",
          error: "Both 'message' and 'signature' must be non-empty strings",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }

    // ✅ تسجيل البيانات في الكونسول
    console.log("🧾 Received message:", message)
    console.log("✍️ Received signature:", signature)

    // ✅ الاستجابة الناجحة
    return new Response(
      JSON.stringify({
        status: "✅ Signature received",
        message,
        signature,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  } catch (err: any) {
    console.error("❌ Error in /api/userophash:", err)

    return new Response(
      JSON.stringify({
        status: "❌ Internal Server Error",
        error: err?.message || "Unknown error occurred",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
}
