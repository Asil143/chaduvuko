import { NextRequest, NextResponse } from 'next/server'

const MENTOR_SYSTEM = `You are Chaduvuko's code mentor — a friendly senior developer glancing over a student's shoulder right after they ran their code in the playground. Personality: warm, direct, encouraging — like a senior dev doing a quick, kind code review. Never use corporate chatbot language, never use headers or bullet points.

Given the student's code, the language, and what it printed (or the error it threw), respond with plain conversational text covering three things in a natural flow: one line noting whether it worked and why, one specific and concrete improvement they could make to the code, and one short line of encouragement. Keep the whole reply to 100-150 words. Do not repeat the code back to them.`

export async function POST(req: NextRequest) {
  try {
    const { code, language, stdout, stderr } = await req.json()

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return NextResponse.json({ reply: 'DEBUG: GROQ_API_KEY is missing from environment variables.' })
    }

    const userMessage = `Language: ${language}\n\nCode:\n${code}\n\nOutput:\n${stdout || '(none)'}\n\nErrors:\n${stderr || '(none)'}`

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        max_tokens: 300,
        temperature: 0.7,
        messages: [
          { role: 'system', content: MENTOR_SYSTEM },
          { role: 'user', content: userMessage },
        ],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ reply: `DEBUG Groq error ${response.status}: ${JSON.stringify(data?.error?.message || data)}` })
    }

    const reply = data.choices?.[0]?.message?.content || 'No reply from Groq.'
    return NextResponse.json({ reply })

  } catch (error) {
    return NextResponse.json({ reply: `DEBUG exception: ${String(error)}` })
  }
}
