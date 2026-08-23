const PRIMARY_MODEL = 'openai/gpt-oss-120b'
const FALLBACK_MODEL = 'openai/gpt-oss-20b'

// Groq has deprecated production models with little notice before
// (llama-3.3-70b-versatile and llama-3.1-8b-instant both went away on
// 2026-08-16), so treat "model doesn't exist" the same as "model is busy":
// don't fail the whole request, just retry against the fallback model.
function shouldRetryWithFallback(status: number, data: unknown): boolean {
  if (status === 429 || status === 404) return true
  const code = (data as { error?: { code?: string; type?: string } })?.error?.code
  const type = (data as { error?: { code?: string; type?: string } })?.error?.type
  return code === 'rate_limit_exceeded' || type === 'rate_limit_exceeded'
    || code === 'model_not_found' || code === 'model_decommissioned'
}

type GroqMessage = { role: 'system' | 'user' | 'assistant'; content: string }

async function callGroq(apiKey: string, model: string, messages: GroqMessage[], opts: { maxTokens: number; temperature: number }) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: opts.maxTokens,
      temperature: opts.temperature,
      messages,
    }),
  })
  const data = await response.json()
  return { response, data }
}

export type GroqResult =
  | { ok: true; reply: string; usedFallback?: boolean }
  | { ok: false }

// Shared by every Groq-backed route (chat, custom-roadmap, playground-mentor).
// Retries once against a fallback model on rate-limit/decommission, and never
// surfaces raw provider error details to the caller — those get logged
// server-side instead, so a Groq outage shows a friendly message to the user
// rather than a "DEBUG: ..." string leaking internals into the chat reply.
export async function groqComplete(
  apiKey: string | undefined,
  messages: GroqMessage[],
  opts: { maxTokens: number; temperature: number }
): Promise<GroqResult> {
  if (!apiKey) {
    console.error('groqComplete: GROQ_API_KEY is not set')
    return { ok: false }
  }

  try {
    let { response, data } = await callGroq(apiKey, PRIMARY_MODEL, messages, opts)
    let usedFallback = false

    if (!response.ok && shouldRetryWithFallback(response.status, data)) {
      usedFallback = true
      ;({ response, data } = await callGroq(apiKey, FALLBACK_MODEL, messages, opts))
    }

    if (!response.ok) {
      console.error('groqComplete: Groq API error', response.status, data)
      return { ok: false }
    }

    const reply = data.choices?.[0]?.message?.content
    if (!reply) {
      console.error('groqComplete: empty reply from Groq', data)
      return { ok: false }
    }
    return { ok: true, reply, ...(usedFallback ? { usedFallback: true } : {}) }
  } catch (error) {
    console.error('groqComplete: exception calling Groq', error)
    return { ok: false }
  }
}
