import { NextRequest, NextResponse } from 'next/server'
import { YouTube } from 'youtube-sr'

const QUERY_SYSTEM = `Convert the student's learning goal into a concise, effective YouTube search query (3-8 words) that would surface the best tutorial video on the topic. Reply with ONLY the search query, nothing else — no quotes, no explanation.`

const REVALIDATE = 60 * 60 * 24 * 30

type YouTubeVideo = {
  id: string
  title: string
  channelTitle: string
  thumbnailUrl: string
  viewCount: number
  url: string
}

async function deriveSearchQuery(topic: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) return topic.slice(0, 80)

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        max_tokens: 20,
        temperature: 0.3,
        messages: [
          { role: 'system', content: QUERY_SYSTEM },
          { role: 'user', content: topic },
        ],
      }),
      next: { revalidate: REVALIDATE },
    })
    const data = await response.json()
    const query = data.choices?.[0]?.message?.content?.trim()
    return query || topic.slice(0, 80)
  } catch {
    return topic.slice(0, 80)
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function searchWithRetry(query: string, attempts = 3) {
  let lastError: unknown
  for (let i = 0; i < attempts; i++) {
    try {
      return await YouTube.search(query, { limit: 15, type: 'video', safeSearch: true })
    } catch (err) {
      lastError = err
      if (i < attempts - 1) await sleep(600 * (i + 1))
    }
  }
  throw lastError
}

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json()

    if (!topic || typeof topic !== 'string' || !topic.trim()) {
      return NextResponse.json({ video: null, debug: 'DEBUG: no topic provided.' })
    }

    const query = await deriveSearchQuery(topic)

    const results = await searchWithRetry(query)

    let best: { video: YouTubeVideo; views: number } | null = null

    for (const item of results) {
      if (item.type !== 'video' || item.live) continue
      const durationSeconds = (item.duration || 0) / 1000
      if (durationSeconds < 120) continue

      const views = item.views || 0
      if (!best || views > best.views) {
        best = {
          views,
          video: {
            id: item.id || '',
            title: item.title || '',
            channelTitle: item.channel?.name || 'Unknown channel',
            thumbnailUrl: item.thumbnail?.url || '',
            viewCount: views,
            url: item.url || `https://www.youtube.com/watch?v=${item.id}`,
          },
        }
      }
    }

    if (!best) {
      return NextResponse.json({ video: null, debug: 'DEBUG: no suitable long-form video found for this topic.' })
    }

    return NextResponse.json({ video: best.video })

  } catch (error) {
    return NextResponse.json({ video: null, debug: `DEBUG exception: ${String(error)}` })
  }
}
