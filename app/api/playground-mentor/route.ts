import { NextRequest, NextResponse } from 'next/server'
import { groqComplete } from '@/lib/groq'

const MENTOR_SYSTEM = `You are Chaduvuko's code mentor — a friendly senior developer glancing over a student's shoulder right after they ran their code in the playground. Personality: warm, direct, encouraging — like a senior dev doing a quick, kind code review. Never use corporate chatbot language, never use headers or bullet points.

Given the student's code, the language, and what it printed (or the error it threw), respond with plain conversational text covering three things in a natural flow: one line noting whether it worked and why, one specific and concrete improvement they could make to the code, and one short line of encouragement. Keep the whole reply to 100-150 words. Do not repeat the code back to them.`

const FALLBACK_REPLY = "Sorry, I'm having trouble reviewing this right now — try again in a moment."

export async function POST(req: NextRequest) {
  try {
    const { code, language, stdout, stderr } = await req.json()
    const userMessage = `Language: ${language}\n\nCode:\n${code}\n\nOutput:\n${stdout || '(none)'}\n\nErrors:\n${stderr || '(none)'}`

    const result = await groqComplete(
      process.env.GROQ_API_KEY,
      [{ role: 'system', content: MENTOR_SYSTEM }, { role: 'user', content: userMessage }],
      { maxTokens: 300, temperature: 0.7 }
    )

    if (!result.ok) return NextResponse.json({ reply: FALLBACK_REPLY })
    return NextResponse.json({ reply: result.reply })
  } catch (error) {
    console.error('POST /api/playground-mentor: exception', error)
    return NextResponse.json({ reply: FALLBACK_REPLY })
  }
}
