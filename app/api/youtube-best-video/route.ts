import { NextRequest, NextResponse } from 'next/server'

const QUERY_SYSTEM = `Convert the student's learning goal into a concise, effective YouTube search query (3-8 words) that would surface the best tutorial video on the topic. Reply with ONLY the search query, nothing else — no quotes, no explanation.`

const DAY = 60 * 60 * 24
const REVALIDATE = DAY * 30

type YouTubeVideo = {
  id: string
  title: string
  channelTitle: string
  thumbnailUrl: string
  viewCount: number
  likeCount: number
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
        model: 'llama-3.3-70b-versatile',
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

function parseDurationSeconds(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0
  const hours = parseInt(match[1] || '0')
  const minutes = parseInt(match[2] || '0')
  const seconds = parseInt(match[3] || '0')
  return hours * 3600 + minutes * 60 + seconds
}

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json()

    if (!topic || typeof topic !== 'string' || !topic.trim()) {
      return NextResponse.json({ video: null, debug: 'DEBUG: no topic provided.' })
    }

    const apiKey = process.env.YOUTUBE_API_KEY
    if (!apiKey) {
      return NextResponse.json({ video: null, debug: 'DEBUG: YOUTUBE_API_KEY is missing from environment variables.' })
    }

    const query = await deriveSearchQuery(topic)

    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=relevance&safeSearch=strict&maxResults=15&q=${encodeURIComponent(query)}&key=${apiKey}`
    const searchRes = await fetch(searchUrl, { next: { revalidate: REVALIDATE } })
    const searchData = await searchRes.json()

    if (!searchRes.ok) {
      return NextResponse.json({ video: null, debug: `DEBUG YouTube search error ${searchRes.status}: ${JSON.stringify(searchData?.error?.message || searchData)}` })
    }

    const videoIds: string[] = (searchData.items || [])
      .map((item: { id?: { videoId?: string } }) => item.id?.videoId)
      .filter(Boolean)

    if (videoIds.length === 0) {
      return NextResponse.json({ video: null, debug: 'DEBUG: no candidate videos found for this topic.' })
    }

    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds.join(',')}&key=${apiKey}`
    const detailsRes = await fetch(detailsUrl, { next: { revalidate: REVALIDATE } })
    const detailsData = await detailsRes.json()

    if (!detailsRes.ok) {
      return NextResponse.json({ video: null, debug: `DEBUG YouTube videos error ${detailsRes.status}: ${JSON.stringify(detailsData?.error?.message || detailsData)}` })
    }

    type RawItem = {
      id: string
      snippet: { title: string; channelTitle: string; thumbnails?: { high?: { url: string }; medium?: { url: string }; default?: { url: string } } }
      statistics: { viewCount?: string; likeCount?: string }
      contentDetails: { duration: string }
    }

    const candidates = (detailsData.items || []) as RawItem[]

    let best: { video: YouTubeVideo; score: number } | null = null

    for (const item of candidates) {
      const durationSeconds = parseDurationSeconds(item.contentDetails.duration)
      if (durationSeconds < 120) continue

      const viewCount = Number(item.statistics.viewCount || 0)
      const likeCount = Number(item.statistics.likeCount || 0)
      const score = Math.log10(viewCount + 10) * (1 + (likeCount / Math.max(viewCount, 1)) * 20)

      if (!best || score > best.score) {
        best = {
          score,
          video: {
            id: item.id,
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || '',
            viewCount,
            likeCount,
            url: `https://www.youtube.com/watch?v=${item.id}`,
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
