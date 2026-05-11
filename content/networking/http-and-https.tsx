'use client'

import { useState } from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const N = '#10b981'

const Part = ({ n, title }: { n: string; title: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: N, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// Part {n}</p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
)
const P = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
const H = ({ children }: { children: React.ReactNode }) => <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
const Hl = ({ children }: { children: React.ReactNode }) => <strong style={{ color: N }}>{children}</strong>
const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />
const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${N}08`, border: `1px solid ${N}20`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
)
const IQ = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ background: `${N}10`, border: `1px solid ${N}25`, borderRadius: '8px 8px 0 0', padding: '14px 18px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)
const Term = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
    <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '3px 8px', borderRadius: 5, flexShrink: 0, marginTop: 2 }}>{t}</code>
    <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{children}</span>
  </div>
)

const statusCodes = [
  { range: '1xx', name: 'Informational', color: '#6b7280', codes: [{ code: 100, desc: 'Continue — server received headers, client should proceed with body' }, { code: 101, desc: 'Switching Protocols — upgrading to WebSocket or HTTP/2' }] },
  { range: '2xx', name: 'Success', color: N, codes: [{ code: 200, desc: 'OK — request succeeded' }, { code: 201, desc: 'Created — resource created (POST/PUT)' }, { code: 204, desc: 'No Content — success, no response body' }, { code: 206, desc: 'Partial Content — range request fulfilled (video seeking)' }] },
  { range: '3xx', name: 'Redirection', color: '#f59e0b', codes: [{ code: 301, desc: 'Moved Permanently — update bookmarks; search engines follow' }, { code: 302, desc: 'Found — temporary redirect; keep original URL' }, { code: 304, desc: 'Not Modified — use cached version (ETag/Last-Modified matched)' }, { code: 307, desc: 'Temporary Redirect — like 302 but method must not change' }, { code: 308, desc: 'Permanent Redirect — like 301 but method must not change' }] },
  { range: '4xx', name: 'Client Error', color: '#ef4444', codes: [{ code: 400, desc: 'Bad Request — malformed syntax or invalid request' }, { code: 401, desc: 'Unauthorized — authentication required' }, { code: 403, desc: 'Forbidden — authenticated but not authorized' }, { code: 404, desc: 'Not Found — resource doesn\'t exist' }, { code: 405, desc: 'Method Not Allowed — HTTP method not supported' }, { code: 429, desc: 'Too Many Requests — rate limited; check Retry-After header' }] },
  { range: '5xx', name: 'Server Error', color: '#8b5cf6', codes: [{ code: 500, desc: 'Internal Server Error — unhandled exception or crash' }, { code: 502, desc: 'Bad Gateway — upstream server returned invalid response' }, { code: 503, desc: 'Service Unavailable — server overloaded or in maintenance' }, { code: 504, desc: 'Gateway Timeout — upstream server didn\'t respond in time' }] },
]

function HTTPStatusExplorer() {
  const [selected, setSelected] = useState<string | null>('2xx')
  const group = statusCodes.find(s => s.range === selected)

  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, margin: '32px 0' }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '.1em' }}>HTTP Status Code Reference</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {statusCodes.map(s => (
          <button key={s.range} onClick={() => setSelected(s.range)} style={{ background: selected === s.range ? s.color : 'var(--bg)', color: selected === s.range ? '#fff' : 'var(--text)', border: `1px solid ${selected === s.range ? s.color : 'var(--border)'}`, borderRadius: 6, padding: '7px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{s.range} {s.name}</button>
        ))}
      </div>
      {group && (
        <div>
          {group.codes.map(c => (
            <div key={c.code} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)', alignItems: 'flex-start' }}>
              <code style={{ fontSize: 13, fontWeight: 700, color: group.color, fontFamily: 'var(--font-mono)', flexShrink: 0, width: 36 }}>{c.code}</code>
              <span style={{ fontSize: 14, color: 'var(--text)' }}>{c.desc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function HTTPAndHTTPSModule() {
  return (
    <LearnLayout
      title="HTTP and HTTPS"
      description="HTTP is the language of the web. Every API call, every page load, every webhook is an HTTP transaction. Understanding it at the protocol level makes you a significantly better developer."
      section="Networking Fundamentals"
      readTime="22 min"
      updatedAt="May 2026"
    >
      <Part n="01" title="HTTP: The Protocol of the Web" />
      <P>
        <Hl>HTTP (HyperText Transfer Protocol)</Hl> is a request-response protocol for transferring hypermedia documents and data. It is stateless — each request is independent, with no memory of previous requests (cookies and sessions are application-level constructs layered on top). HTTP operates at Layer 7 (Application), running over TCP (or QUIC for HTTP/3).
      </P>
      <P>
        An HTTP message consists of a <Hl>start line</Hl> (request line or status line), <Hl>headers</Hl> (key:value metadata), an empty line (CRLF), and optionally a <Hl>body</Hl>. Headers and body are separated by a blank line. This text-based format (in HTTP/1.1) was intentionally human-readable. HTTP/2 uses binary framing; HTTP/3 uses QUIC streams.
      </P>

      <H>HTTP Methods</H>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 24 }}>
          <thead>
            <tr>{['Method', 'Idempotent?', 'Safe?', 'Has Body?', 'Use Case'].map(h => <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--muted)', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)' }}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {[
              { method: 'GET', idempotent: '✓', safe: '✓', body: '—', use: 'Retrieve a resource' },
              { method: 'POST', idempotent: '—', safe: '—', body: '✓', use: 'Create a resource; non-idempotent operations' },
              { method: 'PUT', idempotent: '✓', safe: '—', body: '✓', use: 'Replace a resource completely' },
              { method: 'PATCH', idempotent: '—', safe: '—', body: '✓', use: 'Partially update a resource' },
              { method: 'DELETE', idempotent: '✓', safe: '—', body: '—', use: 'Delete a resource' },
              { method: 'HEAD', idempotent: '✓', safe: '✓', body: '—', use: 'Get headers only (check existence, cache validation)' },
              { method: 'OPTIONS', idempotent: '✓', safe: '✓', body: '—', use: 'CORS preflight; discover allowed methods' },
            ].map(r => (
              <tr key={r.method} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '8px 12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: N }}>{r.method}</td>
                <td style={{ padding: '8px 12px', color: r.idempotent === '✓' ? N : 'var(--muted)' }}>{r.idempotent}</td>
                <td style={{ padding: '8px 12px', color: r.safe === '✓' ? N : 'var(--muted)' }}>{r.safe}</td>
                <td style={{ padding: '8px 12px', color: r.body === '✓' ? 'var(--text)' : 'var(--muted)' }}>{r.body}</td>
                <td style={{ padding: '8px 12px', color: 'var(--muted)', fontSize: 12 }}>{r.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HTTPStatusExplorer />

      <HR />
      <Part n="02" title="HTTP/1.1, HTTP/2, and HTTP/3 Compared" />

      <H>HTTP/1.1 (1997): Keep-Alive and Pipelining</H>
      <P>
        HTTP/1.0 opened a new TCP connection for every request. HTTP/1.1 added <Hl>persistent connections</Hl> (keep-alive by default) and <Hl>pipelining</Hl> (send multiple requests without waiting for each response). Pipelining suffered from head-of-line blocking at the HTTP level — if the first response was slow, all subsequent responses queued. Browsers worked around this by opening 6 parallel connections per domain (a hack). HTTP/1.1 headers are sent as plaintext on every request — no compression.
      </P>

      <H>HTTP/2 (2015): Binary, Multiplexed, Compressed</H>
      <P>
        HTTP/2 is a binary protocol — frames instead of text. It introduced <Hl>multiplexing</Hl> (multiple request/response streams over one TCP connection, no head-of-line blocking at HTTP level), <Hl>header compression</Hl> via HPACK (headers sent incrementally; repeated headers reference a shared table — drastically reducing overhead for cookie-heavy requests), and <Hl>server push</Hl> (the server can proactively send resources before the client requests them). One TCP connection per domain replaced the browser's 6-connection workaround. The primary weakness: TCP-level head-of-line blocking (addressed by HTTP/3).
      </P>

      <H>HTTP/3 (2022): Over QUIC</H>
      <P>
        HTTP/3 runs over QUIC instead of TCP+TLS. Eliminates TCP head-of-line blocking — each stream is independent. 1 RTT connection establishment (vs TCP+TLS 1.2's 3 RTTs). Connection migration. We covered this in detail in the QUIC module.
      </P>

      <HR />
      <Part n="03" title="Key HTTP Headers" />
      <P>
        Headers control caching, authentication, content negotiation, security, and connection behavior. Critical headers every engineer must know:
      </P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12, margin: '16px 0 24px' }}>
        {[
          { name: 'Content-Type', ex: 'application/json; charset=utf-8', desc: 'Media type of the request/response body. Missing or wrong Content-Type causes parsing failures.' },
          { name: 'Authorization', ex: 'Bearer eyJhbGci...', desc: 'Credentials: Basic (base64 user:pass), Bearer token, OAuth. Sent on every request — use HTTPS or credentials travel in plaintext.' },
          { name: 'Cache-Control', ex: 'max-age=3600, must-revalidate', desc: 'Caching directives. no-cache = revalidate before use; no-store = never cache; max-age = cache for N seconds.' },
          { name: 'ETag', ex: '"abc123"', desc: 'Entity tag for cache validation. Client sends If-None-Match: "abc123" — server returns 304 if unchanged.' },
          { name: 'Accept-Encoding', ex: 'gzip, br', desc: 'Client advertises supported compression. Server responds with Content-Encoding: gzip. Brotli (br) achieves ~20% better compression than gzip.' },
          { name: 'Strict-Transport-Security', ex: 'max-age=31536000; includeSubDomains', desc: 'HSTS — tells browser to always use HTTPS for this domain. Prevents SSL stripping attacks.' },
          { name: 'X-Content-Type-Options', ex: 'nosniff', desc: 'Prevents MIME type sniffing — browser must use declared Content-Type, not guess from content.' },
          { name: 'Content-Security-Policy', ex: "default-src 'self'", desc: 'Restricts which resources the browser can load. Primary defense against XSS attacks.' },
        ].map(h => (
          <div key={h.name} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: N, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{h.name}</div>
            <code style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 6 }}>{h.ex}</code>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{h.desc}</div>
          </div>
        ))}
      </div>

      <ProTip>
        Use <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>curl -v https://api.example.com/endpoint</code> to see full request and response headers. <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>curl -I</code> does a HEAD request (headers only). <code style={{ fontSize: 12, background: `${N}15`, color: N, padding: '2px 5px', borderRadius: 4 }}>curl --http2 --http3</code> forces specific versions. Browser DevTools Network tab shows all headers, timing breakdown (DNS/TCP/TLS/Request/Response), and protocol version.
      </ProTip>

      <HR />
      <Part n="04" title="Interview Questions" />

      <IQ q="What's the difference between 401 Unauthorized and 403 Forbidden?">
        401 Unauthorized means authentication is required but not provided or invalid — the client needs to authenticate (provide credentials). The response includes a WWW-Authenticate header specifying the authentication scheme. 403 Forbidden means the request was authenticated (the server knows who you are) but the authenticated user is not authorized to access the resource. "You proved who you are, but you're not allowed." A key distinction: 401 suggests you might be able to retry with valid credentials; 403 means your credentials are fine but access is denied regardless.
      </IQ>

      <IQ q="Explain the difference between idempotent and safe HTTP methods.">
        A safe method has no side effects — it doesn't change server state (GET, HEAD, OPTIONS). An idempotent method produces the same state regardless of how many times it's called — calling it once or 100 times results in the same outcome (GET, HEAD, PUT, DELETE, OPTIONS). POST is neither safe nor idempotent — posting an order twice may create two orders. DELETE is idempotent but not safe — first DELETE removes the resource; subsequent DELETEs either return 404 or succeed with the same result (resource is absent). Idempotency matters for retry logic: retrying an idempotent request on timeout is safe; retrying a POST may create duplicates.
      </IQ>

      <IQ q="How does HTTP caching work with ETags and Cache-Control?">
        On first request, the server responds with the resource plus ETag: "abc123" (a hash of the content) and Cache-Control: max-age=3600. The client caches the response for 3600 seconds. On subsequent requests within the TTL, the browser serves from cache without going to the server. After TTL expires, the browser sends a conditional request: If-None-Match: "abc123". If the resource hasn't changed, the server returns 304 Not Modified (no body) — the browser uses its cached copy. If the resource changed, the server returns 200 with the new content and a new ETag. This conditional request mechanism saves bandwidth while ensuring freshness.
      </IQ>

      <HR />
      <Part n="05" title="Key Terminology" />
      <Term t="REST">Representational State Transfer — architectural style using HTTP methods semantically: GET (read), POST (create), PUT (replace), DELETE (remove).</Term>
      <Term t="Idempotent">Multiple identical requests have the same effect as one. GET, PUT, DELETE are idempotent. POST is not.</Term>
      <Term t="ETag">Entity Tag — opaque string identifying a version of a resource. Used for conditional requests (If-None-Match) to enable caching.</Term>
      <Term t="CORS">Cross-Origin Resource Sharing — browser security policy; OPTIONS preflight requests check if cross-origin API calls are allowed.</Term>
      <Term t="Keep-Alive">HTTP/1.1 persistent connections — reuse TCP connection for multiple requests instead of closing after each.</Term>
      <Term t="HPACK/QPACK">HTTP/2 / HTTP/3 header compression — dramatically reduces overhead from repeated headers like Cookie and Authorization.</Term>

      <KeyTakeaways items={[
        'HTTP is stateless request-response over TCP; HTTPS adds TLS for encryption, integrity, and server authentication.',
        'HTTP methods: GET (safe+idempotent), POST (neither), PUT (idempotent), DELETE (idempotent), PATCH (neither).',
        'Status codes: 2xx success, 3xx redirect, 4xx client error, 5xx server error. 401 = auth needed; 403 = auth OK but no access.',
        'HTTP/2 adds binary framing, multiplexing, and HPACK header compression over one TCP connection.',
        'HTTP/3 uses QUIC instead of TCP — eliminates TCP head-of-line blocking and reduces connection setup to 1 RTT.',
        'ETag + Cache-Control + 304 Not Modified enable efficient caching — clients only download when content changes.',
      ]} />
    </LearnLayout>
  )
}
