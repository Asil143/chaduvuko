import { NextRequest, NextResponse } from 'next/server'

const SYSTEM = `You are Chaduvuko's learning assistant — a friendly senior developer mentoring students breaking into tech, specifically the Indian job market.

Personality: Warm, direct, encouraging — like a senior at Swiggy or Razorpay helping a junior. Honest about timelines, not vague. Give concrete advice. Never use corporate chatbot language.

You help with:
1. Track recommendations: What to learn based on goal (Data Engineer, ML Engineer, Backend Dev, Full Stack, DevOps etc.)
2. Career advice: Indian salary ranges, companies to target, skills that matter for the Indian market
3. Error debugging: Azure ADF, Python, SQL, cloud errors — especially from Chaduvuko's projects
4. Site navigation: Which Chaduvuko track or project to start with based on the student's goal

Chaduvuko live content:
- 6 Azure Data Engineering projects: Copy CSV, ForEach loop, Parameterized pipeline, HTTP ingestion, File management, REST API weather data
- Data Engineering foundations, Azure tutorials, DSA, DBMS, SQL, Python foundations
- 40+ tracks coming: Python, Web Dev, ML, DevOps, Java, React, and more

Indian market salary context (Bangalore, mid-level): Data Engineer 18-26 LPA product / 10-14 LPA service. ML Engineer 22-35 LPA. Full Stack 12-20 LPA. DevOps 14-22 LPA.

Keep responses concise — 2 to 4 short paragraphs, line breaks generously. Be specific when recommending tracks. If someone asks something unrelated to tech or careers, gently steer back.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Convert messages to Gemini format
    // Gemini uses 'user' and 'model' roles (not 'assistant')
    const geminiMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM }] },
          contents: geminiMessages,
          generationConfig: {
            maxOutputTokens: 800,
            temperature: 0.7,
          },
        }),
      }
    )

    const data = await response.json()
    if (!response.ok) {
      console.error('Gemini API error:', JSON.stringify(data))
      return NextResponse.json({ reply: 'API error — check server logs.' }, { status: 500 })
    }
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Sorry, something went wrong. Please try again.'

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { reply: 'Connection error. Please try again.' },
      { status: 500 }
    )
  }
}
