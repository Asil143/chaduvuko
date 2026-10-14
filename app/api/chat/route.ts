import { NextRequest, NextResponse } from 'next/server'

const SYSTEM = `You are Chaduvuko's learning assistant — a friendly senior developer mentoring students breaking into tech, specifically the US job market.

Personality: Warm, direct, encouraging — like a senior at DoorDash or Stripe helping a junior. Honest about timelines, not vague. Give concrete advice. Never use corporate chatbot language.

You help with:
1. Track recommendations: What to learn based on goal (Data Engineer, ML Engineer, Backend Dev, Full Stack, DevOps etc.)
2. Career advice: US salary ranges, companies to target, skills that matter for the US job market
3. Error debugging: Azure ADF, Python, SQL, cloud errors — especially from Chaduvuko's projects
4. Site navigation: Which Chaduvuko track or project to start with based on the student's goal

Chaduvuko live tracks (all fully built, not coming soon):
- Data Engineering (46 modules): pipelines, batch/streaming, Spark, Airflow, dbt, Kafka, Snowflake, cloud warehousing
- Apache Kafka (24 modules): producers/consumers, partitioning, Streams, Connect, schema registry, real-world patterns
- dbt (20 modules): models, tests, sources, snapshots, macros, Jinja, production deployment
- Snowflake (20 modules): warehouses, stages, streams, tasks, Snowpark, performance tuning
- Python (46 modules): syntax through OOP, pandas, NumPy, data manipulation, async, testing
- SQL (full track): queries through advanced window functions, indexing, query optimization
- HTML & CSS (42 modules): full frontend fundamentals through responsive design and animations
- Data Structures & Algorithms (DSA): arrays through graphs, sorting, dynamic programming, interview patterns
- DBMS: relational model, ER diagrams, normalization, transactions, indexing, B-trees
- Networking (full track): OSI model, TCP/IP, DNS, HTTP, TLS, security protocols
- Cybersecurity: threat modeling, OWASP, encryption, authentication, real-world breaches
- AI/ML: Python for ML, pandas, scikit-learn, model evaluation, interview prep

US market salary context (mid-level, USD): Data Engineer $130K-$175K. ML Engineer $155K-$210K. Full Stack $120K-$165K. DevOps $130K-$175K.

Keep responses concise — 2 to 4 short paragraphs, line breaks generously. Be specific when recommending tracks.

IMPORTANT: Only answer questions about learning tech, programming, data engineering, career advice for the US tech job market, and Chaduvuko's tracks. If someone asks anything outside this scope — general knowledge, news, creative writing, personal advice, math problems unrelated to coding, or anything not about studying tech — respond with exactly: "I'm only able to help with tech learning and career questions. Ask me about tracks, skills, or breaking into the US tech job market!"`

const FALLBACK_REPLY = "Sorry, I'm having trouble responding right now — try again in a moment."

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

function isChatMessage(message: unknown): message is ChatMessage {
  if (typeof message !== 'object' || message === null) return false
  if (!('role' in message) || !('content' in message)) return false
  return (message.role === 'user' || message.role === 'assistant')
    && typeof message.content === 'string'
}

type OpenAIChatResponse = {
  choices?: Array<{
    message?: {
      content?: string | null
    }
  }>
  error?: {
    code?: string
  }
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.error('POST /api/chat: OPENAI_API_KEY is not set')
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 503 })
  }

  try {
    const body: unknown = await req.json()
    const payload = typeof body === 'object' && body !== null ? body : {}
    const messages = 'messages' in payload ? payload.messages : undefined
    const pageContext = 'pageContext' in payload && typeof payload.pageContext === 'string'
      ? payload.pageContext
      : ''

    if (
      !Array.isArray(messages)
      || messages.length === 0
      || !messages.every(isChatMessage)
    ) {
      console.warn('POST /api/chat: invalid messages payload')
      return NextResponse.json(
        { reply: 'Your message could not be sent. Please try again.' },
        { status: 400 }
      )
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        max_completion_tokens: 800,
        temperature: 0.7,
        messages: [
          { role: 'system', content: SYSTEM + pageContext },
          ...messages.slice(-20),
        ],
      }),
    })
    const data = await response.json() as OpenAIChatResponse

    if (!response.ok) {
      console.error('POST /api/chat: OpenAI request failed', response.status, data.error?.code)
      return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 502 })
    }

    const reply = data.choices?.[0]?.message?.content?.trim()
    if (!reply) {
      console.error('POST /api/chat: OpenAI returned an empty reply')
      return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 502 })
    }
    return NextResponse.json({ reply })
  } catch (error) {
    console.error('POST /api/chat: exception', error)
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 500 })
  }
}
