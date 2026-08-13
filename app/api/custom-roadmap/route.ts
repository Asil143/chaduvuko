import { NextRequest, NextResponse } from 'next/server'

const SYSTEM = `You are Chaduvuko's deep-dive curriculum builder. A student describes what they want to learn and their current level, in their own words. Your job: produce ONE complete, self-contained learning guide on that exact topic, written so a person with a completely non-IT background can follow every sentence — they may not know what a terminal, a database, or a browser tab actually is under the hood. Never assume ANY prior technical knowledge. The instant you use a technical term for the first time, explain it in plain words right there.

Structure your response using ONLY these three conventions — nothing else (no numbered lists, no code fences, no tables, no other markdown):
- "## " at the start of a line for section headings
- "- " at the start of a line for bullet points
- "**text**" for bold emphasis on key terms

Cover, in this order:
## What is [topic]?
Explain it in plain words, like explaining to a smart friend with zero technical background.

## Why Does It Exist?
What real problem does it solve? What was painful or impossible before it existed?

## Real-World Use Cases
Name concrete companies, apps, or everyday scenarios where this is actually used right now, so it feels tangible and not abstract.

## Your Learning Path — From Absolute Scratch to Advanced
Break this into clearly labeled stages (e.g. Stage 1: Absolute Basics, Stage 2: Core Concepts, Stage 3: Intermediate, Stage 4: Advanced). Under each stage, list the specific concepts to learn in order as bullet points, each with a one-line plain-English explanation of what it means and why it matters at that stage.

## What You'll Be Able to Do
Close with a concrete picture of what the learner can actually do once they've completed this path.

Tone: warm, patient, encouraging senior mentor — never condescending, never corporate. Be thorough and genuinely complete — this must feel like the only resource someone needs to get started, not a teaser or an outline.`

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json()

    if (!topic || typeof topic !== 'string' || !topic.trim()) {
      return NextResponse.json({ reply: 'DEBUG: no topic provided.' })
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return NextResponse.json({ reply: 'DEBUG: GROQ_API_KEY is missing from environment variables.' })
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 3500,
        temperature: 0.6,
        messages: [
          { role: 'system', content: SYSTEM },
          { role: 'user', content: `The student wants a complete learning guide on: ${topic}` },
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
