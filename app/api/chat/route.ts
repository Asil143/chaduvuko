import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ reply: 'DEBUG: GEMINI_API_KEY is missing from environment variables.' })
    }

    const geminiMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: 'You are a helpful learning assistant for Chaduvuko, a tech learning platform.' }] },
          contents: geminiMessages,
          generationConfig: { maxOutputTokens: 800, temperature: 0.7 },
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ reply: `DEBUG Gemini error ${response.status}: ${JSON.stringify(data?.error?.message || data)}` })
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No reply from Gemini.'
    return NextResponse.json({ reply })

  } catch (error) {
    return NextResponse.json({ reply: `DEBUG exception: ${String(error)}` })
  }
}
