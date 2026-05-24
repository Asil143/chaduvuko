'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const G = '#10b981'
const Chapter = ({ n }: { n: number }) => (
  <p style={{ fontSize: 11, color: G, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 6px', letterSpacing: '.12em', textTransform: 'uppercase' }}>// Chapter {n}</p>
)
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
const H2 = ({ children }: { children: React.ReactNode }) => <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', margin: '0 0 20px' }}>{children}</h2>
const H3 = ({ children }: { children: React.ReactNode }) => <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '28px 0 12px' }}>{children}</h3>
const Accent = ({ children }: { children: React.ReactNode }) => <strong style={{ color: G }}>{children}</strong>
const Code = ({ children }: { children: React.ReactNode }) => <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--code-bg)', padding: '2px 6px', borderRadius: 4, color: G }}>{children}</code>
const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', overflowX: 'auto', margin: '20px 0', lineHeight: 1.7, color: 'var(--text)' }}>{children}</pre>
)
const StoryBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${G}08`, border: `1px solid ${G}22`, borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>Story</p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)
const WowBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#8b5cf608', border: '1px solid #8b5cf630', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#8b5cf6', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>Wow</p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)
const Warn = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#f59e0b08', border: '1px solid #f59e0b30', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>Caution</p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)
const Err = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: '#ef444408', border: '1px solid #ef444430', borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>Misconception — {title}</p>
    <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
  </div>
)
const IQ = ({ level, children }: { level: 'Beginner' | 'Intermediate' | 'Senior' | 'PhD'; children: React.ReactNode }) => {
  const colors: Record<string, string> = { Beginner: '#10b981', Intermediate: '#3b82f6', Senior: '#8b5cf6', PhD: '#f97316' }
  const c = colors[level]
  return (
    <div style={{ background: `${c}08`, border: `1px solid ${c}30`, borderRadius: 12, padding: '20px 24px', margin: '24px 0' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: c, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 10px' }}>IQ — {level}</p>
      <div style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85 }}>{children}</div>
    </div>
  )
}

// ── Component 1: HTTP Message Inspector ───────────────────────────────────────
interface MsgLine { part: string; value: string; note: string }
interface HttpMsg { id: string; label: string; lines: MsgLine[] }
const HTTP_MESSAGES: HttpMsg[] = [
  {
    id: 'get', label: 'GET Request',
    lines: [
      { part: 'Request Line', value: 'GET /api/users/42 HTTP/1.1', note: 'Method + path + version. GET is safe (no side effects) and idempotent. Never has a body.' },
      { part: 'Host', value: 'Host: api.example.com', note: 'Required in HTTP/1.1 — enables virtual hosting (many domains on one IP). Also the basis for SNI in TLS.' },
      { part: 'Accept', value: 'Accept: application/json, text/html;q=0.9', note: 'Content negotiation — client preference list with quality factors. Server picks the best supported format.' },
      { part: 'Authorization', value: 'Authorization: Bearer eyJhbGc...', note: 'Bearer token (JWT) for API auth. Base64-encoded, NOT encrypted — send only over HTTPS.' },
      { part: 'Cache-Control', value: 'Cache-Control: no-cache', note: 'Revalidate with server before using cached response. Different from no-store (which prevents caching entirely).' },
      { part: 'Blank Line', value: '(CRLF \\r\\n)', note: 'Empty line separates headers from body. Required — missing blank line is a malformed request.' },
    ],
  },
  {
    id: 'post', label: 'POST Request',
    lines: [
      { part: 'Request Line', value: 'POST /api/users HTTP/1.1', note: 'POST creates a resource at a server-chosen URL. Not idempotent — two identical POSTs create two resources.' },
      { part: 'Host', value: 'Host: api.example.com', note: 'Required in HTTP/1.1' },
      { part: 'Content-Type', value: 'Content-Type: application/json', note: 'Required for requests with a body — tells the server how to parse it. Missing Content-Type often causes 400/415 errors.' },
      { part: 'Content-Length', value: 'Content-Length: 47', note: 'Byte count of request body. Allows server to know when body ends on persistent connections.' },
      { part: 'Blank Line', value: '(CRLF)', note: 'Separates headers from body' },
      { part: 'Body', value: '{"name":"Alice","email":"alice@example.com"}', note: 'Request body — must be exactly Content-Length bytes.' },
    ],
  },
  {
    id: 'ok', label: '200 OK Response',
    lines: [
      { part: 'Status Line', value: 'HTTP/1.1 200 OK', note: 'Protocol version + numeric status code + reason phrase. Only the numeric code matters to machines.' },
      { part: 'Content-Type', value: 'Content-Type: application/json; charset=utf-8', note: 'MIME type + character encoding. Always include charset for text content to prevent encoding errors.' },
      { part: 'Content-Length', value: 'Content-Length: 89', note: 'Enables keep-alive — client knows where this response ends and the next begins on the same TCP connection.' },
      { part: 'Cache-Control', value: 'Cache-Control: max-age=300, private', note: 'Cache in browser only (private) for 300s. Private = user-specific data, not shared CDN cache.' },
      { part: 'ETag', value: 'ETag: "a3f2e8d9"', note: 'Opaque version token. Client sends If-None-Match: "a3f2e8d9" on next request; server returns 304 if unchanged, no body.' },
      { part: 'Body', value: '{"id":42,"name":"Alice","email":"alice@example.com"}', note: 'Response body matching Content-Type and Content-Length.' },
    ],
  },
  {
    id: 'redir', label: '301 Redirect',
    lines: [
      { part: 'Status Line', value: 'HTTP/1.1 301 Moved Permanently', note: '301 = permanent redirect. Browsers and search engines update their records. Cached indefinitely by default.' },
      { part: 'Location', value: 'Location: https://www.example.com/new-path', note: 'The URL to redirect to. Absolute URL required for cross-origin redirects.' },
      { part: 'Cache-Control', value: 'Cache-Control: max-age=31536000', note: '301 redirects are cached forever unless explicitly limited. Always set an explicit cache duration.' },
    ],
  },
]

function HttpMessageInspector() {
  const [msgId, setMsgId] = useState('get')
  const [selLine, setSelLine] = useState<string | null>(null)
  const msg = HTTP_MESSAGES.find(m => m.id === msgId)!
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px', margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 18px' }}>HTTP Message Inspector — click any line</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
        {HTTP_MESSAGES.map(m => (
          <button key={m.id} onClick={() => { setMsgId(m.id); setSelLine(null) }}
            style={{ padding: '7px 14px', borderRadius: 8, border: `1px solid ${msgId === m.id ? G : 'var(--border)'}`, background: msgId === m.id ? `${G}15` : 'transparent', color: msgId === m.id ? G : 'var(--text)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            {m.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
        {msg.lines.map(line => (
          <div key={line.part} onClick={() => setSelLine(selLine === line.part ? null : line.part)}
            style={{ display: 'flex', gap: 10, padding: '8px 12px', borderRadius: 8, border: `1px solid ${selLine === line.part ? G : 'var(--border)'}`, background: selLine === line.part ? `${G}08` : 'transparent', cursor: 'pointer', transition: 'all 0.15s', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.05em', minWidth: 100, flexShrink: 0, paddingTop: 2 }}>{line.part}</span>
            <code style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: G, flex: 1, lineHeight: 1.5, wordBreak: 'break-all' }}>{line.value}</code>
          </div>
        ))}
      </div>
      {selLine && (() => {
        const line = msg.lines.find(l => l.part === selLine)!
        return (
          <div style={{ background: `${G}08`, border: `1px solid ${G}22`, borderRadius: 10, padding: '14px 16px' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 6px' }}>{line.part}</p>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{line.note}</p>
          </div>
        )
      })()}
    </div>
  )
}

// ── Component 2: Status Code Explorer ────────────────────────────────────────
interface StatusCode { code: number; text: string; cat: string; description: string; example: string }
const STATUS_CODES: StatusCode[] = [
  { code: 200, text: 'OK', cat: '2xx', description: 'Request succeeded. Body contains the resource or result.', example: 'GET /users/42 → 200 with JSON body' },
  { code: 201, text: 'Created', cat: '2xx', description: 'Resource created. Location header points to the new resource URI.', example: 'POST /users → 201 + Location: /users/43' },
  { code: 204, text: 'No Content', cat: '2xx', description: 'Success but no response body. Used for DELETE or actions with no return value.', example: 'DELETE /users/42 → 204 (no body)' },
  { code: 301, text: 'Moved Permanently', cat: '3xx', description: 'Permanent redirect. Browsers and crawlers update their records. Cached forever by default.', example: 'HTTP → HTTPS redirect for entire domain' },
  { code: 302, text: 'Found (Temporary)', cat: '3xx', description: 'Temporary redirect. Historically browsers changed method to GET on redirect. Not cached.', example: 'Post-login redirect back to original URL' },
  { code: 304, text: 'Not Modified', cat: '3xx', description: 'Conditional GET: resource unchanged. No body — use the cached copy.', example: 'Browser sends If-None-Match; server returns 304' },
  { code: 400, text: 'Bad Request', cat: '4xx', description: 'Malformed request — invalid JSON, missing required field, bad query parameter.', example: 'POST /users with invalid JSON → 400' },
  { code: 401, text: 'Unauthorized', cat: '4xx', description: 'Authentication required or invalid. Despite the name, means "unauthenticated." Requires WWW-Authenticate header.', example: 'API call without valid Bearer token → 401' },
  { code: 403, text: 'Forbidden', cat: '4xx', description: 'Authenticated but not authorized. Server understood but refuses the request.', example: 'Regular user accessing /admin → 403' },
  { code: 404, text: 'Not Found', cat: '4xx', description: 'Resource does not exist at this URL. May be intentionally vague to hide resource structure.', example: 'GET /users/99999 (nonexistent) → 404' },
  { code: 429, text: 'Too Many Requests', cat: '4xx', description: 'Rate limit exceeded. Retry-After header indicates when to retry.', example: 'Exceeding 100 req/min API limit → 429 + Retry-After: 60' },
  { code: 500, text: 'Internal Server Error', cat: '5xx', description: 'Unhandled server exception. Generic catch-all for server bugs.', example: 'Uncaught exception in request handler → 500' },
  { code: 502, text: 'Bad Gateway', cat: '5xx', description: 'Proxy/LB received invalid response from upstream. Upstream is down or returned garbage.', example: 'Nginx reverse proxy: upstream app crashed → 502' },
  { code: 503, text: 'Service Unavailable', cat: '5xx', description: 'Server temporarily unavailable (overload or maintenance). Retry-After hints when to retry.', example: 'Server pool fully saturated → 503 + Retry-After: 30' },
]
const CATS = ['2xx', '3xx', '4xx', '5xx']
const catColor = (cat: string) => cat === '2xx' ? G : cat === '3xx' ? '#3b82f6' : cat === '4xx' ? '#f59e0b' : '#ef4444'

function StatusCodeExplorer() {
  const [filter, setFilter] = useState('2xx')
  const [sel, setSel] = useState<number | null>(200)
  const filtered = STATUS_CODES.filter(s => s.cat === filter)
  const active = STATUS_CODES.find(s => s.code === sel)
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px', margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 18px' }}>HTTP Status Code Explorer</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {CATS.map(cat => (
          <button key={cat} onClick={() => { setFilter(cat); setSel(null) }}
            style={{ padding: '6px 16px', borderRadius: 8, border: `1px solid ${filter === cat ? catColor(cat) : 'var(--border)'}`, background: filter === cat ? `${catColor(cat)}15` : 'transparent', color: filter === cat ? catColor(cat) : 'var(--text)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>
            {cat}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 18 }}>
        {filtered.map(s => (
          <div key={s.code} onClick={() => setSel(sel === s.code ? null : s.code)}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 8, border: `1px solid ${sel === s.code ? catColor(s.cat) : 'var(--border)'}`, background: sel === s.code ? `${catColor(s.cat)}08` : 'transparent', cursor: 'pointer', transition: 'all 0.15s' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: catColor(s.cat), fontFamily: 'var(--font-mono)', minWidth: 36 }}>{s.code}</span>
            <span style={{ fontSize: 13, color: 'var(--text)' }}>{s.text}</span>
          </div>
        ))}
      </div>
      {active && (
        <div style={{ background: `${catColor(active.cat)}08`, border: `1px solid ${catColor(active.cat)}28`, borderRadius: 10, padding: '14px 16px' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: catColor(active.cat), fontFamily: 'var(--font-mono)', margin: '0 0 8px' }}>{active.code} {active.text}</p>
          <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.65, margin: '0 0 8px' }}>{active.description}</p>
          <p style={{ fontSize: 12, color: '#6b7280', fontFamily: 'var(--font-mono)', margin: 0 }}>{active.example}</p>
        </div>
      )}
    </div>
  )
}

// ── Component 3: Cache-Control Scenarios ─────────────────────────────────────
interface CacheScenario { id: string; header: string; label: string; behavior: string; verdict: string; color: string }
const CACHE_SCENARIOS: CacheScenario[] = [
  { id: 'private', header: 'Cache-Control: max-age=300, private', label: 'Browser only', behavior: 'Stored in browser cache for 300 seconds. Not stored in CDN or shared proxy. Re-used without contacting server within the window.', verdict: 'Browser cache only (5 min)', color: G },
  { id: 'public', header: 'Cache-Control: max-age=86400, public', label: 'CDN + browser', behavior: 'Stored in browser AND CDN/shared caches for 1 day. All users hitting the same CDN edge receive the cached response.', verdict: 'CDN + browser (1 day)', color: G },
  { id: 'no_cache', header: 'Cache-Control: no-cache', label: 'Store but revalidate', behavior: 'Response is stored, but must be revalidated with origin before serving. Client sends If-None-Match / If-Modified-Since; server returns 304 if unchanged. Does NOT prevent caching.', verdict: 'Stored — revalidate before use', color: '#f59e0b' },
  { id: 'no_store', header: 'Cache-Control: no-store', label: 'Never cached', behavior: 'Response must NOT be stored anywhere. Every request goes to origin. For sensitive data: banking pages, auth responses, medical records.', verdict: 'Never cached (every request = origin)', color: '#ef4444' },
  { id: 'swr', header: 'Cache-Control: max-age=60, stale-while-revalidate=300', label: 'Stale + background refresh', behavior: 'Fresh for 60s. For the next 300s: serve stale immediately while revalidating in background. After 360s total: block on revalidation. Eliminates revalidation latency spikes.', verdict: 'Serve stale + async refresh', color: '#3b82f6' },
  { id: 'immutable', header: 'Cache-Control: max-age=31536000, immutable', label: 'Permanent (versioned assets)', behavior: 'Browser never sends conditional requests during max-age — content guaranteed immutable. Used for hash-versioned assets (bundle.abc123.js). If content changes, filename changes.', verdict: 'Cache forever, zero revalidation', color: '#8b5cf6' },
]

function HttpCachingExplorer() {
  const [sel, setSel] = useState('private')
  const active = CACHE_SCENARIOS.find(s => s.id === sel)!
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px', margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: G, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 18px' }}>HTTP Cache-Control Scenarios</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 20 }}>
        {CACHE_SCENARIOS.map(s => (
          <div key={s.id} onClick={() => setSel(s.id)}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 8, border: `1px solid ${sel === s.id ? s.color : 'var(--border)'}`, background: sel === s.id ? `${s.color}08` : 'transparent', cursor: 'pointer', transition: 'all 0.15s' }}>
            <code style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: G, flex: 1 }}>{s.header}</code>
            <span style={{ fontSize: 11, fontWeight: 700, color: s.color, fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{s.label}</span>
          </div>
        ))}
      </div>
      <div style={{ background: `${active.color}08`, border: `1px solid ${active.color}28`, borderRadius: 10, padding: '16px 18px' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: active.color, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 8px' }}>{active.verdict}</p>
        <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{active.behavior}</p>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HttpAndHttpsPage() {
  return (
    <LearnLayout
      title="HTTP and HTTPS"
      description="The application protocol that powers the web — from HTTP/0.9's single-line request to HTTP/3's multiplexed, encrypted, QUIC-based streams handling billions of requests per second."
      section="Networking Fundamentals — Module 26"
      readTime="28–38 min"
      updatedAt="May 2026"
    >

      <Chapter n={1} />
      <H2>The Protocol That Built the Web</H2>

      <StoryBox>
        <Para>1991. Tim Berners-Lee is a physicist at CERN who wants colleagues to share documents without emailing attachments. He invents three things simultaneously: HTML (markup for documents), URLs (addresses for documents), and HTTP (a protocol for fetching documents). The first version of HTTP has one method (GET), no headers, no status codes, and no version field. The entire request is one line: <Code>GET /page.html</Code>. The entire response is the file contents. No framing, no metadata, no negotiation. From this trivial beginning, the entire modern web was built.</Para>
        <Para>Today HTTP is architecturally unrecognizable from its origin. HTTP/3 runs over QUIC, multiplexes 100+ concurrent request/response pairs, uses binary framing with header compression, and mandates TLS 1.3 encryption. Yet the semantic model — resources identified by URLs, verbs expressing intent, status codes classifying outcomes, headers carrying metadata — is the same design Berners-Lee sketched in 1991. This conceptual stability beneath radical implementation evolution is HTTP's most remarkable engineering achievement.</Para>
      </StoryBox>

      <Para>HTTP (HyperText Transfer Protocol) is a <Accent>stateless, request/response, application-layer protocol</Accent>. A client sends a request with a method, URL, headers, and optional body. A server returns a response with a status code, headers, and optional body. No connection state persists between requests — each carries all information needed to process it independently.</Para>

      <WowBox>
        <Para>HTTP is the most widely implemented protocol in history. Every web browser, web server, mobile app, IoT device, microservice, and API client implements HTTP. W3C estimates HTTP carries over 5 billion requests per second globally. The entire digital economy — e-commerce, banking, streaming, social media — runs on HTTP. The core protocol spec (RFC 9110–9114 for HTTP semantics through HTTP/3) describes a remarkably small, coherent design that scales from a 1991 physics lab document server to a trillion-request-per-day global infrastructure.</Para>
      </WowBox>

      <Divider />

      <Chapter n={2} />
      <H2>HTTP Methods: The Verbs</H2>

      <Para>HTTP methods describe the intent of a request. They are case-sensitive and conventionally uppercase. Two critical properties define method semantics: <Accent>safe</Accent> (no observable side effects — reading only) and <Accent>idempotent</Accent> (repeating produces the same state as doing it once).</Para>

      <H3>The Core Methods</H3>
      <Para>• <Accent>GET</Accent>: Retrieve a resource. Safe + idempotent. No request body. Responses are cacheable by default.</Para>
      <Para>• <Accent>POST</Accent>: Submit data to create a resource or trigger an action. Neither safe nor idempotent. Has a request body. Responses not cacheable by default.</Para>
      <Para>• <Accent>PUT</Accent>: Replace a resource entirely at the specified URL. Idempotent — two identical PUT requests produce the same final state. Body contains the complete replacement resource.</Para>
      <Para>• <Accent>PATCH</Accent>: Partially update a resource. Not necessarily idempotent (depends on patch semantics — "increment counter" is not idempotent; "set name to X" is). Body contains only the changes.</Para>
      <Para>• <Accent>DELETE</Accent>: Remove a resource. Idempotent — deleting an already-deleted resource is a no-op (returns 404, not an error in terms of state).</Para>
      <Para>• <Accent>HEAD</Accent>: Same as GET but no response body — headers only. Used to check existence or metadata without downloading content.</Para>
      <Para>• <Accent>OPTIONS</Accent>: Returns allowed methods for a resource. Foundation of CORS preflight — browsers use it to ask permission before cross-origin requests.</Para>

      <H3>Idempotency in Production Systems</H3>
      <Para>Idempotency is critical for distributed system reliability. If a POST creates an order and the network drops the response, the client doesn't know if it succeeded. Retrying creates a duplicate order. Solutions: use PUT with a client-generated UUID (PUT /orders/uuid123 is idempotent by definition), or implement idempotency keys — send a unique ID in a header, and the server deduplicates. Stripe's API uses <Code>Idempotency-Key: uuid</Code> headers on all payment endpoints for exactly this purpose.</Para>

      <Warn>
        <Para>Never use GET for state-changing operations. GET is considered safe and may be automatically executed by web accelerators, browser pre-fetchers, security scanners, and link preview generators. If a user shares a URL like <Code>/admin/delete-account</Code>, link preview services may trigger the deletion without the user clicking. This is a real vulnerability class — the "Logout CSRF" and "CSRF via GET" attacks exploit exactly this. Use POST/DELETE for mutations, always.</Para>
      </Warn>

      <Divider />

      <Chapter n={3} />
      <H2>HTTP Messages: Requests and Responses</H2>

      <Para>HTTP/1.1 messages are human-readable text. A request starts with a request line (method + path + version), followed by header lines (name: value), a blank line, and an optional body. A response starts with a status line (version + code + reason phrase), headers, blank line, and optional body. HTTP/2 and HTTP/3 use binary framing for efficiency — identical semantics, better performance.</Para>

      <HttpMessageInspector />

      <H3>Content Negotiation</H3>
      <Para>HTTP supports server-driven content negotiation. The client sends <Code>Accept</Code> (MIME types), <Code>Accept-Language</Code>, <Code>Accept-Encoding</Code> (gzip/br/deflate), listing supported formats with preference weights (q-values, 0.0–1.0). The server selects the best match and responds with the corresponding <Code>Content-Type</Code>, <Code>Content-Language</Code>, <Code>Content-Encoding</Code>. The <Code>Vary</Code> response header tells caches which request headers must match for a cached response to be reused — <Code>Vary: Accept-Encoding</Code> means separate cache entries for gzip and non-gzip.</Para>

      <H3>Chunked Transfer Encoding</H3>
      <Para>When the server doesn't know the response size in advance (streaming responses, dynamic content), it uses <Code>Transfer-Encoding: chunked</Code>. Each chunk is prefixed with its hexadecimal size. A zero-size chunk (<Code>0\r\n\r\n</Code>) terminates the body. This enables streaming responses without buffering the entire body. HTTP/2 makes this obsolete — DATA frames carry length implicitly in the QUIC/H2 frame header.</Para>

      <Divider />

      <Chapter n={4} />
      <H2>HTTP Status Codes</H2>

      <Para>Status codes are 3-digit integers organized into five classes by their first digit. Clients can safely treat any 2xx as success and any 5xx as server error, even without recognizing the specific code — forward compatibility is built into the design.</Para>

      <StatusCodeExplorer />

      <H3>The 401 vs 403 Distinction</H3>
      <Para>401 means "who are you? — authenticate first." It must include <Code>WWW-Authenticate</Code> describing how. 403 means "I know who you are, but you don't have permission." Confusing them breaks clients: browsers show an auth dialog on 401 but not 403. Security-conscious APIs sometimes return 404 for forbidden resources to avoid confirming their existence (resource enumeration prevention) — a deliberate information hiding trade-off.</Para>

      <H3>307 vs 308: Method-Preserving Redirects</H3>
      <Para>Historical 302/301 redirects allowed browsers to silently change POST to GET on redirect — widespread but non-standard behavior. RFC 7238 added 307 (Temporary Redirect) and 308 (Permanent Redirect) which mandate method preservation. A POST to a 307-redirected URL must POST to the new URL, not GET. This matters for API clients submitting data: always use 307/308 when redirecting POST endpoints.</Para>

      <Divider />

      <Chapter n={5} />
      <H2>HTTP Headers: The Metadata Layer</H2>

      <Para>HTTP headers are case-insensitive name: value pairs that carry metadata about the request or response. Modern HTTP has 200+ defined headers, though most requests use under 20.</Para>

      <H3>Security Headers</H3>
      <Para>• <Accent>Strict-Transport-Security (HSTS)</Accent>: <Code>max-age=31536000; includeSubDomains; preload</Code> — browser refuses HTTP for 1 year. Prevents SSL stripping.</Para>
      <Para>• <Accent>Content-Security-Policy (CSP)</Accent>: Controls which resources may load. <Code>script-src 'nonce-abc123'</Code> allows only scripts with the matching nonce — mitigates XSS.</Para>
      <Para>• <Accent>X-Frame-Options: DENY</Accent>: Prevents iframe embedding — clickjacking mitigation. Superseded by CSP <Code>frame-ancestors 'none'</Code>.</Para>
      <Para>• <Accent>X-Content-Type-Options: nosniff</Accent>: Browser must trust Content-Type, not guess from content bytes. Prevents MIME sniffing attacks.</Para>
      <Para>• <Accent>Referrer-Policy</Accent>: Controls how much of the referring URL is sent in the Referer header. <Code>strict-origin-when-cross-origin</Code> is the modern recommended default.</Para>
      <Para>• <Accent>Permissions-Policy</Accent>: Replaces Feature-Policy. Controls access to powerful browser APIs (camera, microphone, geolocation) per origin.</Para>

      <H3>Caching Headers</H3>
      <Para>• <Accent>Cache-Control</Accent>: Primary caching directive — supersedes Pragma and Expires.</Para>
      <Para>• <Accent>ETag</Accent>: Opaque resource version token. Enables conditional requests via <Code>If-None-Match</Code>.</Para>
      <Para>• <Accent>Last-Modified</Accent>: Resource modification timestamp. Enables conditional requests via <Code>If-Modified-Since</Code>.</Para>
      <Para>• <Accent>Vary</Accent>: Which request headers create distinct cache entries. <Code>Vary: Accept-Encoding</Code> creates separate entries for gzip vs non-gzip responses.</Para>

      <Divider />

      <Chapter n={6} />
      <H2>HTTP Caching</H2>

      <StoryBox>
        <Para>A CDN serves 1 billion requests per day for a major news site. Without caching, every request hits origin servers — gigantic infrastructure cost and latency. With proper Cache-Control headers, 99%+ of requests are served from CDN edge nodes milliseconds away, at a fraction of the cost. HTTP caching is not an optimization — it is the economic and performance foundation the web is built on. Every major site spends more time thinking about cache invalidation than almost any other performance problem.</Para>
      </StoryBox>

      <HttpCachingExplorer />

      <H3>Conditional Requests and Validation</H3>
      <Para>When a cached response has expired (max-age elapsed), the browser can make a <Accent>conditional request</Accent> — including the ETag or Last-Modified from the cached response. If the resource hasn't changed, the server returns <Code>304 Not Modified</Code> with no body — saving bandwidth while confirming freshness. If changed, it returns <Code>200 OK</Code> with the new content. This is the "revalidation" that <Code>no-cache</Code> triggers on every request regardless of age.</Para>

      <Warn>
        <Para>The most common caching mistake: not setting Cache-Control on API responses. Without explicit directives, browsers apply heuristic caching based on Last-Modified timestamps. An API returning user data with a two-year-old Last-Modified header may be cached for months — the browser applies a 10% freshness lifetime heuristic. Always explicitly set <Code>Cache-Control: no-store</Code> for private data, or <Code>Cache-Control: no-cache</Code> for data that should always revalidate. Never rely on heuristic caching defaults for correctness.</Para>
      </Warn>

      <Divider />

      <Chapter n={7} />
      <H2>HTTPS: HTTP over TLS</H2>

      <Para>HTTPS is HTTP running over a TLS connection. All HTTP semantics are identical — methods, headers, status codes, bodies — TLS adds confidentiality (encrypted), integrity (tamper-evident), and authentication (server identity verified via certificate). HTTPS uses port 443 by default (HTTP uses 80).</Para>

      <H3>The Web's HTTPS Transition</H3>
      <Para>In 2010, fewer than 10% of web page loads were HTTPS. By 2024, over 95% are. Forcing factors: Let's Encrypt (free automated TLS certificates since 2016), Chrome marking HTTP as "Not Secure" (2018), Google search ranking penalizing HTTP sites, browser security features (Service Workers, Push, geolocation) restricted to secure origins. The web transitioned to HTTPS in under a decade — one of the fastest security improvements in internet history.</Para>

      <H3>HSTS: HTTP Strict Transport Security</H3>
      <Para>Once a browser receives <Code>Strict-Transport-Security: max-age=31536000; includeSubDomains</Code>, it refuses to make HTTP connections to that domain for 1 year — even if the user types "http://". This prevents SSL stripping attacks, where an attacker on the network intercepts the initial HTTP request before the HTTPS redirect can occur. HSTS preloading hardcodes your domain in Chrome/Firefox/Safari's built-in list — HTTPS is enforced on first visit, before any HTTP connection is possible.</Para>

      <CodeBlock>{`# HTTP → HTTPS redirect + HSTS (nginx)
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    ssl_certificate     /etc/ssl/cert.pem;
    ssl_certificate_key /etc/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options DENY always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'nonce-{$nonce}'" always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
}`}</CodeBlock>

      <Divider />

      <Chapter n={8} />
      <H2>CORS: Cross-Origin Resource Sharing</H2>

      <Para>Browsers enforce the <Accent>Same-Origin Policy</Accent>: JavaScript from <Code>app.example.com</Code> cannot make fetch/XHR calls to <Code>api.other.com</Code>. Origins are defined by scheme + host + port — all three must match. This prevents malicious scripts from silently making authenticated requests to other sites on behalf of users. Modern web architecture requires cross-origin requests, so CORS provides a controlled relaxation mechanism.</Para>

      <H3>Simple vs Preflighted Requests</H3>
      <Para><Accent>Simple requests</Accent> (GET/HEAD, or POST with only basic headers): browser sends the request with an <Code>Origin</Code> header. Server responds with <Code>Access-Control-Allow-Origin</Code>. If they match (or server returns <Code>*</Code>), browser allows the response. No extra round trip.</Para>
      <Para><Accent>Preflighted requests</Accent> (PUT/PATCH/DELETE, custom headers, JSON Content-Type): browser sends an OPTIONS preflight first. Server responds with CORS permission headers. If approved, browser sends the real request. One additional RTT per non-simple cross-origin request — <Code>Access-Control-Max-Age</Code> caches the preflight to amortize this cost.</Para>

      <CodeBlock>{`# CORS middleware (Express.js)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://app.example.com')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Max-Age', '86400')   // cache preflight 24h
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

# Test CORS preflight:
curl -X OPTIONS https://api.example.com/users \\
  -H "Origin: https://app.example.com" \\
  -H "Access-Control-Request-Method: DELETE" \\
  -H "Access-Control-Request-Headers: Authorization" -v`}</CodeBlock>

      <Warn>
        <Para><Code>Access-Control-Allow-Origin: *</Code> cannot be combined with <Code>Access-Control-Allow-Credentials: true</Code>. Allowing credentials with a wildcard origin would let any malicious website make authenticated requests on behalf of users — the entire point of SOP would be defeated. For credentialed cross-origin requests, reflect the specific allowed origin dynamically. Never use wildcard + credentials.</Para>
      </Warn>

      <Divider />

      <Chapter n={9} />
      <H2>Cookies and Session Management</H2>

      <Para>HTTP is stateless — each request is independent. Cookies are the primary mechanism for maintaining state across requests. The server sets a cookie with <Code>Set-Cookie</Code>; the browser stores it and sends it automatically with every subsequent request to that origin.</Para>

      <H3>Cookie Security Attributes</H3>
      <Para>• <Accent>Secure</Accent>: Cookie sent only over HTTPS. Essential for authentication cookies on any production system.</Para>
      <Para>• <Accent>HttpOnly</Accent>: JavaScript cannot read this cookie (<Code>document.cookie</Code> excluded). Prevents XSS-based session theft — the most important security attribute for session cookies.</Para>
      <Para>• <Accent>SameSite=Lax</Accent>: Cookie sent in top-level navigations (GET) but not in cross-site AJAX/fetch POST requests. Prevents CSRF while maintaining SSO compatibility. The browser default since Chrome 80.</Para>
      <Para>• <Accent>SameSite=Strict</Accent>: Cookie never sent in any cross-site context. Maximum CSRF protection but breaks most OAuth/SSO flows.</Para>
      <Para>• <Accent>SameSite=None; Secure</Accent>: Cookie sent in all contexts including third-party. Required for cross-site cookies (embedded widgets, OAuth redirects). Must be Secure.</Para>

      <Para>Modern secure session cookie: <Code>Set-Cookie: session=abc; Secure; HttpOnly; SameSite=Lax; Path=/; Max-Age=86400</Code>.</Para>

      <Divider />

      <Chapter n={10} />
      <H2>HTTP Performance</H2>

      <H3>Content Compression</H3>
      <Para>The client announces compression support with <Code>Accept-Encoding: gzip, br</Code>. The server compresses the body and responds with <Code>Content-Encoding: gzip</Code> (or <Code>br</Code> for Brotli). Compression reduces text body size by 60–90%. Brotli achieves 15–25% better compression than gzip for web content (uses a static dictionary optimized for HTTP). Both achieve decompression speeds of hundreds of MB/s — the CPU cost is negligible compared to the bandwidth savings.</Para>

      <H3>Persistent Connections (Keep-Alive)</H3>
      <Para>HTTP/1.0 opened a new TCP connection for every request — SYN + TLS handshake overhead per request. HTTP/1.1 defaults to persistent connections — the same TCP+TLS connection serves multiple sequential requests. <Code>Connection: close</Code> signals teardown after the response. HTTP/2 takes this further — multiple concurrent requests over one TCP connection. HTTP/3 over QUIC multiplexes streams with no HoL blocking.</Para>

      <H3>Preloading and Early Hints (103)</H3>
      <Para>HTTP 103 Early Hints allows the server to send response headers before it has finished generating the full response. The browser can start fetching linked CSS/JS resources while the server is still computing the HTML. A 103 response with <Code>Link: preload</Code> headers fires before the 200 response arrives — shaving 100–300ms from page load times for content-heavy pages.</Para>

      <CodeBlock>{`# Check HTTP version and compression
curl -o /dev/null -s -w "HTTP: %{http_version}\\nTime: %{time_total}s\\n" https://example.com
curl -H 'Accept-Encoding: br' -v https://example.com 2>&1 | grep -i "content-encoding"

# HTTP/2 server push (nginx — deprecated but still deployed)
location / { http2_push /styles/main.css; }

# Early hints (103) configuration
# Supported in nginx 1.25+ and Cloudflare
add_header Link "</styles/main.css>; rel=preload; as=style" always;

# SecurityHeaders.com audit
curl -I https://example.com | grep -iE "strict-transport|x-frame|csp|x-content"`}</CodeBlock>

      <Divider />

      <Chapter n={11} />
      <H2>REST APIs and HTTP Semantics</H2>

      <Para>REST (Representational State Transfer), defined by Roy Fielding in his 2000 dissertation, is an architectural style that maps application operations to HTTP's native semantics: resources identified by URLs, operations expressed as HTTP methods, stateless requests, cacheable responses, and a layered system. In practice, "REST API" usually means CRUD operations over JSON using HTTP methods — a subset of the full REST architecture (HATEOAS is almost universally skipped).</Para>

      <H3>REST Method Semantics</H3>
      <Para>• <Code>GET /users</Code>: list all users (200 + array)</Para>
      <Para>• <Code>GET /users/42</Code>: get user 42 (200 + object, or 404)</Para>
      <Para>• <Code>POST /users</Code>: create user (201 + Location header + created object)</Para>
      <Para>• <Code>PUT /users/42</Code>: replace user 42 entirely (200 or 204)</Para>
      <Para>• <Code>PATCH /users/42</Code>: partial update (200 + updated fields)</Para>
      <Para>• <Code>DELETE /users/42</Code>: delete (204 no body)</Para>

      <H3>GraphQL vs REST</H3>
      <Para>REST's practical limitations: over-fetching (getting unneeded fields) and under-fetching (multiple requests to assemble a view). GraphQL addresses both with a query language — the client specifies exactly which fields it needs. Trade-offs: GraphQL is harder to cache (all queries are POST to one URL, defeating HTTP GET caching), requires more tooling, and has a steeper learning curve. REST's strengths: HTTP caching compatibility, universal tooling, simplicity, and debuggability. For most APIs, REST with well-designed endpoints is the pragmatic choice.</Para>

      <Divider />

      <Chapter n={12} />
      <H2>HTTP Security Attack Patterns</H2>

      <H3>HTTP Request Smuggling</H3>
      <Para>Front-end proxies and back-end servers may disagree on where one HTTP request ends and the next begins — specifically when both <Code>Content-Length</Code> and <Code>Transfer-Encoding: chunked</Code> are present in the same request. An attacker crafts a request that the front-end sees as one request but the back-end processes as two, prepending a malicious prefix to the next user's request. PortSwigger's James Kettle documented this class extensively. Mitigations: reject requests with both CL and TE headers, upgrade to HTTP/2 (binary framing eliminates text ambiguity), normalize request parsing at the load balancer.</Para>

      <H3>HTTP/2 Rapid Reset (CVE-2023-44487)</H3>
      <Para>Discovered in 2023: an attacker sends a stream of HEADERS frames immediately followed by RST_STREAM frames, never completing any request. Each pair opens and immediately resets a stream. Since stream IDs increment and the server must track state per stream, this exhausts server concurrency limits and CPU without completing any request. The attack generated record-breaking DDoS floods exceeding 398 million requests per second. Mitigations: limit RST_STREAM rate per connection, implement server-side concurrency limits, and update HTTP/2 implementations.</Para>

      <H3>Cache Poisoning via Web Cache Deception</H3>
      <Para>An attacker tricks a cache into storing a user-specific (authenticated) response under a URL that will be served to all users. Example: a CDN caches the response to <Code>/account/profile/style.css</Code> (which returns the user's profile page, not CSS). Another user visits the same URL and receives the first user's profile data from cache. Mitigations: never allow caching of authenticated responses without <Code>private</Code> or <Code>no-store</Code> directives; configure CDN to strip authentication headers from cached responses.</Para>

      <Divider />

      <Chapter n={13} />
      <H2>Common Misconceptions</H2>

      <Err title="HTTP is stateful — the server remembers previous requests">
        <Para>HTTP is stateless by design. Each request is completely independent — the server has no built-in memory of previous interactions with the same client. State is maintained through explicit mechanisms: cookies (client-side storage sent with each request), server-side sessions (database/memory keyed by a session cookie), or JWTs (client-side signed tokens). Statelessness is a feature: it makes servers horizontally scalable — any server can handle any request because no request depends on server state from previous requests.</Para>
      </Err>

      <Err title="POST and PUT do the same thing">
        <Para>POST creates a resource at a server-chosen URL and is not idempotent — two identical POST requests create two resources. PUT replaces (or creates) a resource at a client-specified URL and is idempotent — two identical PUT requests leave the same final state. The distinction matters for distributed systems: PUT is safe to retry; POST requires idempotency keys to avoid duplicates. PATCH is a partial update to an existing resource (not a full replacement like PUT).</Para>
      </Err>

      <Err title="Cache-Control: no-cache disables caching">
        <Para>Despite the misleading name, <Code>no-cache</Code> does not prevent storage — it mandates revalidation before serving a cached response. The cache stores the response but must check with the origin server (via If-None-Match/If-Modified-Since) before using it. If unchanged, the server returns 304 and the cached version is served. The directive that actually prevents storage is <Code>no-store</Code>. This confusion is one of the most common HTTP misconfiguration categories in production systems.</Para>
      </Err>

      <Err title="HTTPS guarantees the website is trustworthy">
        <Para>HTTPS guarantees: the connection is encrypted, the data wasn't modified in transit, and the server's identity was verified by a CA. It does not guarantee the server is trustworthy, legitimate, or non-malicious. Phishing sites routinely obtain valid TLS certificates automatically from Let's Encrypt. The padlock means "encrypted connection to a server that owns this certificate" — not "safe website." Attackers get HTTPS certificates too. Always verify domain names carefully; the certificate only proves you're connected to <em>that</em> server, not that you should trust it.</Para>
      </Err>

      <Err title="401 and 403 are interchangeable 'access denied' codes">
        <Para>They encode different semantic states. 401 Unauthorized means "authentication is required — provide credentials." The response must include a <Code>WWW-Authenticate</Code> header. Browsers show an authentication dialog on 401. 403 Forbidden means "I know who you are (or it doesn't matter), but this is not allowed." No auth dialog. Mixing them up breaks HTTP clients that interpret 401 as a signal to retry with credentials, causing unnecessary authentication prompts or infinite retry loops.</Para>
      </Err>

      <Divider />

      <Chapter n={14} />
      <H2>IQ Depth Check</H2>

      <IQ level="Beginner">
        <Para>HTTP is the protocol that loads web pages. You type a URL, your browser sends an HTTP request to a server, the server sends back a response. HTTPS is the secure version — it encrypts the connection. Status codes tell you what happened: 200 (success), 404 (not found), 500 (server error). Cookies let websites remember you between visits. Headers are metadata attached to requests and responses. GET gets data; POST sends data to create something new.</Para>
      </IQ>

      <IQ level="Intermediate">
        <Para>HTTP methods: GET (safe+idempotent), POST (neither), PUT (idempotent replace), PATCH (partial update), DELETE (idempotent remove). Status families: 2xx success, 3xx redirect, 4xx client error, 5xx server error. Cache-Control: max-age, private/public, no-cache (revalidate), no-store (never cache), immutable (no revalidation). CORS: SOP prevents cross-origin requests; Access-Control-Allow-Origin opts in; preflighted OPTIONS adds one RTT. Cookies: Secure + HttpOnly + SameSite=Lax for session security. HSTS prevents SSL stripping. Brotli and gzip compress bodies 60–90%. HTTP/2 multiplexes over TCP; HTTP/3 uses QUIC.</Para>
      </IQ>

      <IQ level="Senior">
        <Para>HTTP semantics are version-agnostic; framing differs between HTTP/1.1 (text CRLF), HTTP/2 (binary HPACK frames with stream IDs), HTTP/3 (QPACK over QUIC streams). Idempotency keys (Stripe pattern): client generates UUID, sends in header, server deduplicates on database-level unique constraint. Vary header creates separate cache entries per request header value — Vary: Accept-Encoding is required for correct compression caching (otherwise gzip response is served to non-gzip clients). SameSite=Lax prevents CSRF for cross-site POST but permits cross-site navigations (GET link clicks) — breaks nothing except CSRF attacks. HTTP request smuggling: CL.TE (front-end parses by Content-Length, back-end by Transfer-Encoding) allows injecting prefix to next user's request; mitigated by H2 upgrade. Cache poisoning via web cache deception: attacker appends /nonexistent.css to an authenticated URL, CDN caches it as cacheable static asset, serving private data to all requesters. CSP nonce-based script-src eliminates XSS without allowlisting all inline scripts; nonce must be per-request, unguessable, and not exposed via referrer or cache.</Para>
      </IQ>

      <IQ level="PhD">
        <Para>Roy Fielding's original REST constraints in his 2000 dissertation include: client-server separation, statelessness, cacheability, uniform interface, layered system, and optional code-on-demand. The "uniform interface" constraint includes HATEOAS (Hypermedia as the Engine of Application State) — responses include links to available state transitions, decoupling clients from URL structure. Virtually no production API implements HATEOAS, meaning virtually no production API is architecturally REST. HTTP/2 HPACK static table (61 entries) + dynamic table (SETTINGS_HEADER_TABLE_SIZE negotiated, default 4KB); HPACK uses a fixed Huffman code table with ~30% compression improvement over ASCII. HTTP/2 CONTINUATION frames (unlimited, must be sent to completion): CVE-2023-44487 "HTTP/2 Rapid Reset" exploited the cost of stream state creation and RST_STREAM processing to generate 398M req/s DDoS; fixed by per-connection RST_STREAM rate limiting. Timing-based cache side-channel attacks (Heist, BREACH) exploit HTTP compression as an oracle to recover secrets — HTTP body compression should never combine secret data with attacker-controlled data. Web Cache Deception attack surface: any CDN that caches based on URL extension rather than Cache-Control headers is vulnerable to path confusion; mitigations require Content-Disposition header for unexpected MIME type responses and strict URL-based caching rules. Open research: formal security models for HTTP/3 vs HTTP/2 under active network adversaries; interaction of HTTP Signed Exchanges (SXG) with cache poisoning; HTTP Query Method (proposed) for GET-like semantics with request body for long query strings.</Para>
      </IQ>

      <Divider />

      <KeyTakeaways items={[
        'HTTP is stateless and request/response: each request carries all information needed to process it; no server session state is maintained between requests.',
        'HTTP methods define intent: GET (safe+idempotent), POST (neither), PUT (idempotent replace), PATCH (partial update), DELETE (idempotent remove).',
        'Status code families: 2xx success, 3xx redirect, 4xx client error, 5xx server error. 401=unauthenticated; 403=unauthorized.',
        'Cache-Control directives control caching behavior: no-cache (store but revalidate) vs no-store (never cache). The naming is confusing but critical to get right.',
        'HTTPS is HTTP over TLS — provides confidentiality, integrity, and server authentication. Over 95% of web traffic is HTTPS as of 2024.',
        'HSTS prevents SSL stripping by instructing browsers to refuse HTTP connections for a domain for up to 1 year, even before receiving any server response.',
        'CORS selectively relaxes the Same-Origin Policy via Access-Control-Allow-Origin headers; non-simple requests require a preflight OPTIONS round trip.',
        'Cookie security requires Secure (HTTPS only) + HttpOnly (no JS access) + SameSite=Lax (CSRF prevention) for authentication cookies.',
        'Content-Encoding (gzip/Brotli) compresses bodies 60–90%; Vary: Accept-Encoding ensures compressed and uncompressed variants are cached separately.',
        'HTTP request smuggling exploits CL/TE header parsing desynchronization between proxy and server; HTTP/2 binary framing eliminates the ambiguity entirely.',
      ]} />
    </LearnLayout>
  )
}
