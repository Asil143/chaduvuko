import { NextRequest, NextResponse } from 'next/server'

const SYSTEM = `You are Chaduvuko's learning assistant — a friendly senior developer mentoring students breaking into tech, specifically the US job market.

Personality: Warm, direct, encouraging — like a senior at DoorDash or Stripe helping a junior. Honest about timelines, not vague. Give concrete advice. Never use corporate chatbot language.

You help with:
1. Track recommendations: What to learn based on goal (Data Engineer, ML Engineer, Backend Dev, Full Stack, DevOps etc.)
2. Career advice: Indian salary ranges, companies to target, skills that matter for the Indian market
3. Error debugging: Azure ADF, Python, SQL, cloud errors — especially from Chaduvuko's projects
4. Site navigation: Which Chaduvuko track or project to start with based on the student's goal

Chaduvuko live content:
- 6 Azure Data Engineering projects: Copy CSV, ForEach loop, Parameterized pipeline, HTTP ingestion, File management, REST API weather data
- Data Engineering foundations, Azure tutorials, DSA, DBMS, SQL, Python foundations
- 40+ tracks coming: Python, Web Dev, ML, DevOps, Java, React, and more

Indian market salary context (Seattle, mid-level): Data Engineer 18-26 LPA product / 10-14 LPA service. ML Engineer 22-35 LPA. Full Stack 12-20 LPA. DevOps 14-22 LPA.

Keep responses concise — 2 to 4 short paragraphs, line breaks generously. Be specific when recommending tracks. If someone asks something unrelated to tech or careers, gently steer back.`

export async function POST(req: NextRequest) {
  try {
    const { messages, pageContext } = await req.json()

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return NextResponse.json({ reply: 'DEBUG: GROQ_API_KEY is missing from environment variables.' })
    }

    const systemWithContext = SYSTEM + (pageContext || '')

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 800,
        temperature: 0.7,
        messages: [
          { role: 'system', content: systemWithContext },
          ...messages,
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
