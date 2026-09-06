import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Working with APIs — REST, Auth, Pagination, Rate Limits — Data Engineering | Chaduvuko',
  description:
    'How APIs work under the hood, every authentication pattern a data engineer encounters, all three pagination styles, rate limit handling, webhooks vs polling, and building reliable API ingestion pipelines.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
    letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18,
    fontFamily: 'var(--font-display)', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700,
    letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12,
    fontFamily: 'var(--font-display)',
  }}>{children}</h3>
)

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{children}</h4>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 16 }}>
    {label && (
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        letterSpacing: '.1em', textTransform: 'uppercase',
        marginBottom: 6, fontFamily: 'var(--font-mono)',
      }}>{label}</div>
    )}
    <pre style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '18px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.9, color: 'var(--text)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

// A visually distinct block for a realistic API response / terminal output —
// separated from the request itself so "thing you send" and "thing you get
// back" are never commingled inside one code-commented wall of text.
const Output = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{
      fontSize: 10, fontWeight: 700, color: 'var(--muted)',
      letterSpacing: '.1em', textTransform: 'uppercase',
      marginBottom: 6, fontFamily: 'var(--font-mono)',
      display: 'flex', alignItems: 'center', gap: 6,
    }}>
      <span style={{ opacity: 0.6 }}>▸</span> {label ?? 'response'}
    </div>
    <pre style={{
      background: 'transparent', border: '1px dashed var(--border)',
      borderRadius: 10, padding: '14px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.8, color: 'var(--muted)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
)

const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '24px 28px', marginBottom: 24,
  }}>
    {children}
  </div>
)

const TryThis = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.25)',
    borderRadius: 10, padding: '16px 20px', marginBottom: 24,
    display: 'flex', gap: 12, alignItems: 'flex-start',
  }}>
    <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.5 }}>⌨️</span>
    <div>
      <div style={{
        fontSize: 10, fontWeight: 700, color: 'var(--accent2)',
        letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6,
        fontFamily: 'var(--font-mono)',
      }}>Try this yourself</div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75 }}>{children}</div>
    </div>
  </div>
)

interface TableRow { [key: string]: string }
interface CompareTableProps {
  headers: { label: string; color?: string }[]
  rows: TableRow[]
  keys: string[]
}

const CompareTable = ({ headers, rows, keys }: CompareTableProps) => (
  <div style={{ overflowX: 'auto', marginBottom: 28 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.6 }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={h.label} style={{
              padding: '10px 16px', textAlign: 'left',
              fontSize: i === 0 ? 10 : 11, fontWeight: 700,
              letterSpacing: i === 0 ? '.12em' : '.06em',
              textTransform: 'uppercase',
              color: h.color ?? 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)',
              background: h.color ? `${h.color}08` : 'var(--bg2)',
              minWidth: i === 0 ? 130 : 160,
            }}>{h.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
            {keys.map((k, ki) => (
              <td key={k} style={{
                padding: '10px 16px',
                color: ki === 0 ? 'var(--muted)' : 'var(--text)',
                fontSize: ki === 0 ? 11 : 13,
                fontFamily: ki === 0 ? 'var(--font-mono)' : 'inherit',
                fontWeight: ki === 0 ? 700 : 400,
                textTransform: ki === 0 ? 'uppercase' : 'none',
                letterSpacing: ki === 0 ? '.06em' : 'normal',
                borderBottom: '1px solid var(--border)',
                borderLeft: ki > 0 && headers[ki]?.color
                  ? `2px solid ${headers[ki].color}40`
                  : ki > 0 ? '1px solid var(--border)' : 'none',
                verticalAlign: 'top',
              }}>{row[k]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const inlineCode = { fontFamily: 'var(--font-mono)', fontSize: 13 } as const

export default function WorkingWithAPIsModule() {
  return (
    <LearnLayout
      title="Working with APIs — REST, Auth, Pagination, Rate Limits"
      description="How APIs work, every auth pattern, all pagination styles, rate limits, and webhooks vs polling — built as one real payment-ingestion pipeline, not a wall of unrelated snippets."
      section="Data Engineering — Module 18"
      readTime="75 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 — Why APIs Matter ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — APIs Are Everywhere in Data Engineering" />
        <SectionTitle>Why Every Data Engineer Must Be Fluent with APIs</SectionTitle>

        <Para>
          A data engineer who cannot work confidently with APIs is blocked from
          half the data sources they will encounter. Payment processors, CRM
          systems, marketing platforms, logistics partners — none of them hand
          you a database connection string. They hand you an API key and a
          documentation URL.
        </Para>

        <Para>
          This module is built around one real, ongoing example: FreshCart needs
          a pipeline that pulls transaction data from its payment gateway into
          the warehouse. Every technique below — auth, pagination, rate limits,
          webhooks — is a piece of that one pipeline, built up incrementally, not
          a disconnected reference for eight unrelated topics. Near the end, the
          Real World section applies the exact same process to onboarding a
          second, completely different vendor, so you see the pattern generalise.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 14,
          }}>
            Seven areas this module covers
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {[
              { num: '01', name: 'HTTP and REST fundamentals', desc: 'Methods, status codes, headers, request/response anatomy.' },
              { num: '02', name: 'Authentication patterns', desc: 'API keys, Bearer tokens, OAuth 2.0, HMAC, JWT — each in depth.' },
              { num: '03', name: 'Pagination', desc: 'Offset, cursor, and next-URL — trade-offs and real implementations.' },
              { num: '04', name: 'Rate limiting', desc: 'Detecting limits, backoff strategies, proactive throttling.' },
              { num: '05', name: 'Webhooks vs polling', desc: 'When to use each, security verification, reliability patterns.' },
              { num: '06', name: 'Schema challenges', desc: 'Handling breaking changes, versioning, optional fields safely.' },
              { num: '07', name: 'Production pipeline design', desc: 'Idempotency, checkpointing, error classification, DLQs.' },
            ].map((item) => (
              <div key={item.num} style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '12px 14px',
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                  textTransform: 'uppercase', marginBottom: 4,
                }}>{item.num} — {item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 02 — HTTP and REST Fundamentals ─────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — HTTP and REST Fundamentals" />
        <SectionTitle>HTTP and REST — What Actually Happens When You Call an API</SectionTitle>

        <Para>
          Every API call is an HTTP request. Understanding its anatomy — method,
          headers, status code, body — lets you diagnose problems instantly and
          write code that handles every response correctly, instead of only the
          happy path.
        </Para>

        <SubSubTitle>What your code actually sends</SubSubTitle>

        <CodeBox label="A real request to the FreshCart payment gateway">{`GET /v1/payments?from=1710633000&to=1710719400&count=100 HTTP/1.1
Host: api.payment-gateway.example.com
Authorization: Bearer sk_live_xxxxxxxxxxxx
Accept: application/json
User-Agent: FreshCart-Pipeline/1.0`}</CodeBox>

        <Para>
          Five pieces make up every request: the <strong>method</strong> (GET —
          read without side effects), the <strong>path</strong> (the resource
          being accessed), the <strong>query string</strong> (filter and
          pagination parameters), <strong>headers</strong> (metadata about the
          request), and a <strong>body</strong> — empty here, since GET requests
          don't carry one.
        </Para>

        <SubSubTitle>What comes back</SubSubTitle>

        <Output label="response">{`HTTP/1.1 200 OK
Content-Type: application/json
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 847
X-RateLimit-Reset: 1710720000

{
  "count": 100,
  "items": [ ... ],
  "cursor": "eyJpZCI6InBheV94eHh4In0="
}`}</Output>

        <Para>
          The status line tells you at a glance whether the request succeeded;
          the rate-limit headers (Part 05) and the <code style={inlineCode}>cursor</code>{' '}
          field (Part 04) are both things this module comes back to build real
          logic around — they are not just decorative metadata.
        </Para>

        <SubSubTitle>HTTP methods — what each one means</SubSubTitle>

        <CompareTable
          headers={[
            { label: 'Method' },
            { label: 'Meaning', color: '#00e676' },
            { label: 'Has body?', color: '#7b61ff' },
            { label: 'Idempotent?', color: '#f97316' },
          ]}
          keys={['method', 'meaning', 'body', 'idempotent']}
          rows={[
            { method: 'GET', meaning: 'Read a resource — no side effects', body: 'No', idempotent: 'Yes — same result every time' },
            { method: 'POST', meaning: 'Create a new resource or trigger an action', body: 'Yes', idempotent: 'No — creates something new each call' },
            { method: 'PUT', meaning: 'Replace a resource entirely', body: 'Yes', idempotent: 'Yes — replaces to the same state' },
            { method: 'PATCH', meaning: 'Partially update specific fields', body: 'Yes', idempotent: 'Usually yes' },
            { method: 'DELETE', meaning: 'Delete a resource', body: 'Rarely', idempotent: 'Yes — deleting twice still succeeds' },
          ]}
        />

        <SubSubTitle>Status codes and what your pipeline should do with each</SubSubTitle>

        <CompareTable
          headers={[
            { label: 'Code' },
            { label: 'Meaning', color: '#00e676' },
            { label: 'Pipeline action', color: '#ff4757' },
          ]}
          keys={['code', 'meaning', 'action']}
          rows={[
            { code: '200 / 201', meaning: 'Success — data in the response body', action: 'Process the data' },
            { code: '202 Accepted', meaning: 'Request received, processing async', action: 'Poll for the result' },
            { code: '400 Bad Request', meaning: 'Your request is malformed', action: 'Log and send to DLQ — do not retry' },
            { code: '401 Unauthorized', meaning: 'Credentials missing or invalid', action: 'Alert — do not retry' },
            { code: '404 Not Found', meaning: 'Resource does not exist', action: 'Log a warning, may have been deleted' },
            { code: '429 Too Many Requests', meaning: 'Rate limit exceeded', action: 'Back off and retry (Part 05)' },
            { code: '5xx', meaning: "Something failed on their end", action: 'Retry with exponential backoff' },
          ]}
        />

        <Callout type="tip">
          The single most useful line in that table is the split between 4xx and
          5xx: a 4xx means <em>your</em> request is wrong and retrying the exact
          same request will fail identically every time — fix the request
          instead. A 5xx means the problem is on their end and is usually
          transient — retrying with backoff is the correct response.
        </Callout>

        <SubSubTitle>REST vs GraphQL vs gRPC</SubSubTitle>

        <Para>
          Most vendor APIs a data engineer ingests from are REST. Recognising the
          other two prevents confusion when a documentation page doesn't look
          like standard REST at all.
        </Para>

        <CompareTable
          headers={[
            { label: 'Aspect' },
            { label: 'REST', color: '#00e676' },
            { label: 'GraphQL', color: '#7b61ff' },
            { label: 'gRPC', color: '#f97316' },
          ]}
          keys={['aspect', 'rest', 'graphql', 'grpc']}
          rows={[
            { aspect: 'Request shape', rest: 'HTTP GET/POST per resource', graphql: 'One POST endpoint, query in the body', grpc: 'Binary Protobuf over HTTP/2' },
            { aspect: 'Over-fetching', rest: 'Common — returns all fields', graphql: 'None — you specify exact fields', grpc: 'None — schema defines exact fields' },
            { aspect: 'Common examples', rest: 'Stripe, Salesforce, GitHub REST', graphql: 'Shopify Admin, GitHub GraphQL v4', grpc: 'Google Cloud APIs' },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 03 — Authentication ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Authentication Patterns" />
        <SectionTitle>Authentication — Every Pattern a Data Engineer Encounters</SectionTitle>

        <Para>
          Any API that is not fully public requires proof your code is allowed
          to access it. Four patterns cover almost everything you'll meet in
          practice — recognising which one an API uses on sight is most of the
          battle.
        </Para>

        <SubSubTitle>Pattern 1 — API Key</SubSubTitle>

        <Para>
          The simplest pattern: a static string, sent with every request.
        </Para>

        <CodeBox label="Command — the standard way, an Authorization header">{`import os, requests

API_KEY = os.environ['GATEWAY_API_KEY']   # never hardcode

response = requests.get(
    'https://api.payment-gateway.example.com/v1/payments',
    headers={'Authorization': f'Bearer {API_KEY}'},
)`}</CodeBox>

        <Para>
          Some APIs use their own header name instead of the standard{' '}
          <code style={inlineCode}>Authorization</code>, and a rarer, less secure
          option puts the key directly in the URL:
        </Para>

        <CodeBox label="Command — two other forms you'll still encounter">{`# A custom header (check the vendor's docs for the exact name):
requests.get(url, headers={'X-API-Key': API_KEY})

# Query parameter — avoid when you have a choice: keys end up in
# server access logs and browser history, not just request headers:
requests.get(url, params={'api_key': API_KEY})`}</CodeBox>

        <Callout type="warning">
          Six habits worth building permanently around any API key: never
          hardcode it (always read from environment variables), never commit it
          (keep <code style={inlineCode}>.env</code> in{' '}
          <code style={inlineCode}>.gitignore</code>), use different keys per
          environment, rotate periodically, restrict the key's permissions to
          only what the pipeline actually needs (read-only where possible), and
          watch the provider's usage dashboard for anything unexpected.
        </Callout>

        <SubSubTitle>Pattern 2 — OAuth 2.0</SubSubTitle>

        <Para>
          OAuth 2.0 is the standard for delegated authorisation — your pipeline
          gets a limited, time-boxed token instead of ever seeing a real
          password. It's required for APIs serving user-specific data:
          Salesforce, Google Analytics, HubSpot. The variant a data pipeline
          uses most is <strong>Client Credentials</strong> — server-to-server,
          no human involved.
        </Para>

        <CodeBox label="Step 1 — request a token">{`import requests, time

def fetch_token(token_url, client_id, client_secret, scope=''):
    response = requests.post(
        token_url,
        data={
            'grant_type': 'client_credentials',
            'client_id': client_id,
            'client_secret': client_secret,
            'scope': scope,
        },
        timeout=30,
    )
    response.raise_for_status()
    return response.json()`}</CodeBox>

        <Output label="response">{`{
  "access_token": "eyJhbGciOiJSUzI1NiIs...",
  "expires_in": 3600,
  "token_type": "Bearer"
}`}</Output>

        <Para>
          <code style={inlineCode}>expires_in</code> is seconds until the token
          goes stale — 3600 here, one hour. Requesting a fresh token on every
          single API call would work, but wastes a full network round trip each
          time. A small manager class caches the token and only refreshes it
          once it's actually close to expiring:
        </Para>

        <CodeBox label="Step 2 — cache the token, refresh only when needed">{`class OAuth2ClientCredentials:
    def __init__(self, token_url, client_id, client_secret, scope=''):
        self.token_url, self.client_id = token_url, client_id
        self.client_secret, self.scope = client_secret, scope
        self._token = None
        self._expires_at = 0

    def get_token(self):
        if self._token and time.time() < self._expires_at - 60:
            return self._token          # cached, with a 60s safety buffer

        data = fetch_token(self.token_url, self.client_id, self.client_secret, self.scope)
        self._token = data['access_token']
        self._expires_at = time.time() + data.get('expires_in', 3600)
        return self._token

    def auth_header(self):
        return {'Authorization': f'Bearer {self.get_token()}'}`}</CodeBox>

        <Para>
          The 60-second buffer matters: without it, a token could expire
          mid-request — between the check and the API actually receiving it —
          causing an intermittent 401 that's hard to reproduce.
        </Para>

        <Para>
          The other OAuth variant, <strong>Authorization Code</strong>, is for
          accessing a specific <em>user's</em> data and needs a browser in the
          loop once: the user logs in and approves access, your app receives a
          code, and exchanges it for an access token plus a long-lived{' '}
          <strong>refresh token</strong>. The part your pipeline actually
          automates is using that refresh token to get new access tokens
          indefinitely, with no user involved again:
        </Para>

        <CodeBox label="Refreshing an access token from a stored refresh token">{`def refresh_access_token(refresh_token, client_id, client_secret):
    response = requests.post(
        'https://auth.salesforce.com/services/oauth2/token',
        data={
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'client_id': client_id,
            'client_secret': client_secret,
        },
    )
    response.raise_for_status()
    return response.json()   # a new access_token (sometimes a new refresh_token too)`}</CodeBox>

        <SubSubTitle>Pattern 3 — HMAC Signature</SubSubTitle>

        <Para>
          HMAC signs each request with a shared secret instead of sending a
          token at all — the server recomputes the signature and compares. Used
          by AWS, and by most providers for verifying <em>incoming</em> webhooks
          (Part 06).
        </Para>

        <CodeBox label="Signing an outgoing request">{`import hmac, hashlib, time

def sign_request(method, path, body, secret):
    timestamp = str(int(time.time()))
    string_to_sign = f'{timestamp}\\n{method.upper()}\\n{path}\\n{body}'

    signature = hmac.new(
        secret.encode('utf-8'), string_to_sign.encode('utf-8'), hashlib.sha256,
    ).hexdigest()

    return {'X-Timestamp': timestamp, 'X-Signature': signature}`}</CodeBox>

        <Para>
          Verifying an <em>incoming</em> signature (what you do inside a webhook
          handler) uses the same math in reverse:
        </Para>

        <CodeBox label="Verifying an incoming webhook signature">{`def verify_webhook_signature(payload_body: bytes, signature_header: str, secret: str) -> bool:
    expected = hmac.new(secret.encode('utf-8'), payload_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header)`}</CodeBox>

        <Callout type="warning">
          Use <code style={inlineCode}>hmac.compare_digest</code>, never{' '}
          <code style={inlineCode}>expected == signature_header</code>. A plain
          equality check exits the moment it finds the first mismatched
          character — which means the exact time the comparison takes leaks
          information about how much of the signature was correct. An attacker
          measuring response times can use that to guess a valid signature one
          byte at a time. <code style={inlineCode}>compare_digest</code> always
          takes the same time no matter where (or whether) the strings differ.
        </Callout>

        <SubSubTitle>Pattern 4 — JWT (JSON Web Tokens)</SubSubTitle>

        <Para>
          A JWT is a self-contained token — three base64 pieces joined by dots
          (<code style={inlineCode}>header.payload.signature</code>) that encode
          claims like user ID and expiry directly in the token itself, no
          server-side lookup needed to check them.
        </Para>

        <CodeBox label="Reading the expiry claim out of a JWT, without verifying its signature">{`import base64, json, time

def decode_jwt_payload(token):
    parts = token.split('.')
    payload_b64 = parts[1] + '=' * (4 - len(parts[1]) % 4)   # restore stripped base64 padding
    return json.loads(base64.urlsafe_b64decode(payload_b64))

def is_jwt_expired(token, buffer_seconds=60):
    exp = decode_jwt_payload(token).get('exp')
    return exp is not None and time.time() > (exp - buffer_seconds)`}</CodeBox>

        <TryThis>
          Paste any JWT you have (or generate a throwaway one at jwt.io) into{' '}
          <code style={inlineCode}>decode_jwt_payload</code> above and print the
          result. Seeing the claims come out as a plain dict — no library, no
          server call — makes the "self-contained token" idea click immediately.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 04 — Pagination ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Pagination" />
        <SectionTitle>Pagination — Three Styles, and Which One to Actually Use</SectionTitle>

        <Para>
          No API returns a million records in one response. Every data engineer
          who pulls from APIs meets all three pagination styles, and they fail
          in genuinely different ways — worth understanding before you pick one.
        </Para>

        <SubSubTitle>Style 1 — Offset/limit</SubSubTitle>

        <CodeBox label="Command — page by position">{`# ?page=3&limit=100  ==  SELECT * FROM payments LIMIT 100 OFFSET 200`}</CodeBox>

        <Para>
          Simple to reason about, and it's the only style that lets you jump
          straight to "page 50 of 100." It has two real problems on a live
          dataset, though. First, <strong>performance</strong>: an{' '}
          <code style={inlineCode}>OFFSET 50000</code> forces the database to
          read and discard 50,000 rows just to reach your page — pages get
          slower the deeper you go. Second, and more dangerous,{' '}
          <strong>correctness</strong>: if a new record is inserted while you're
          mid-pagination, every offset after it silently shifts by one, and a
          record that would have been on page 2 quietly disappears from your
          results with no error at all.
        </Para>

        <CodeBox label="A minimal offset-paginated fetch loop">{`def fetch_all_offset(base_url, headers, limit=100):
    page = 1
    while True:
        resp = requests.get(base_url, headers=headers, params={'page': page, 'limit': limit})
        resp.raise_for_status()
        items = resp.json().get('items', [])
        if not items:
            break
        yield from items
        if len(items) < limit:
            break
        page += 1`}</CodeBox>

        <Callout type="tip">
          Reach for offset pagination only for small, largely static datasets,
          or when an API simply doesn't offer anything better. For anything
          large or actively changing, cursor pagination (next) is the correct
          default.
        </Callout>

        <SubSubTitle>Style 2 — Cursor pagination</SubSubTitle>

        <Para>
          Instead of a position, the API hands back an opaque cursor pointing at
          a specific record — typically its ID or timestamp, base64-encoded.
          The next request sends that cursor back, and the API executes
          something closer to <code style={inlineCode}>WHERE id {'>'} cursor_value
          ORDER BY id LIMIT 100</code> — an index lookup, not a scan-and-discard.
          Both of offset's problems disappear: a new insertion elsewhere in the
          table doesn't shift where your cursor points, and the lookup stays
          fast no matter how deep you are.
        </Para>

        <CodeBox label="A cursor-paginated fetch loop, with a checkpoint you'll extend in Part 08">{`def fetch_all_cursor(url, headers, params, checkpoint_path=None):
    cursor = load_checkpoint(checkpoint_path)   # None on a fresh start

    while True:
        request_params = {**params, **({'cursor': cursor} if cursor else {})}
        resp = requests.get(url, headers=headers, params=request_params, timeout=30)
        resp.raise_for_status()
        data = resp.json()

        items = data.get('items', [])
        yield from items

        cursor = data.get('cursor')
        save_checkpoint(checkpoint_path, cursor)   # survives a mid-run crash

        if not cursor or not items:
            break`}</CodeBox>

        <Para>
          That checkpoint save is what makes cursor pagination genuinely
          resumable, not just faster: if the process crashes on page 4,000,
          the next run reads the saved cursor and picks up exactly there —
          it does not silently restart from page 1 and re-fetch everything.
        </Para>

        <SubSubTitle>Style 3 — Next-URL / Link header</SubSubTitle>

        <Para>
          Some APIs (GitHub, most Django REST Framework services) hand you the{' '}
          <em>entire next request</em> as a ready-made URL, either in the body
          or in a standardised <code style={inlineCode}>Link</code> header —
          you don't construct the next request at all, you just follow it.
        </Para>

        <CodeBox label="Following whichever form the API uses">{`import re

def parse_link_header(link_header):
    if not link_header:
        return {}
    return dict(re.findall(r'<([^>]+)>;\\s*rel="([^"]+)"', link_header))

def fetch_all_next_url(start_url, headers):
    url = start_url
    while url:
        resp = requests.get(url, headers=headers, timeout=30)
        resp.raise_for_status()
        data = resp.json()

        yield from data.get('items', [])

        url = data.get('next') or parse_link_header(resp.headers.get('Link')).get('next')`}</CodeBox>

        <Table3 />
      </section>

      <Divider />

      {/* ── Part 05 — Rate Limiting ───────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Rate Limiting" />
        <SectionTitle>Rate Limiting — Staying Under Quota Instead of Just Reacting to 429</SectionTitle>

        <Para>
          Every production API caps how many requests you can make per second,
          minute, or day. The right approach is two layers: proactive
          throttling that stays under the limit, and reactive handling for the
          occasional 429 that gets through anyway.
        </Para>

        <SubSubTitle>Reading what the API is already telling you</SubSubTitle>

        <Para>
          Recall the response headers from Part 02 —{' '}
          <code style={inlineCode}>X-RateLimit-Remaining</code> is not just
          informational, it's the input to a real decision:
        </Para>

        <CodeBox label="Slowing down before you actually get rate-limited">{`def check_rate_limit_headers(response):
    limit = response.headers.get('X-RateLimit-Limit')
    remaining = response.headers.get('X-RateLimit-Remaining')
    reset = response.headers.get('X-RateLimit-Reset')

    if limit and remaining and int(remaining) < int(limit) * 0.1:
        wait = max(0, int(reset) - int(time.time())) if reset else 5
        print(f'Approaching rate limit — waiting {wait}s for window reset')
        time.sleep(wait + 1)`}</CodeBox>

        <SubSubTitle>Handling a 429 that happens anyway</SubSubTitle>

        <CodeBox label="Reading how long to wait from the response itself">{`def handle_rate_limit_response(response):
    retry_after = response.headers.get('Retry-After')
    if retry_after:
        try:
            return float(retry_after)          # most common: seconds
        except ValueError:
            from email.utils import parsedate_to_datetime
            from datetime import datetime, timezone
            retry_dt = parsedate_to_datetime(retry_after)   # rarer: an HTTP date
            return max(0, (retry_dt - datetime.now(timezone.utc)).total_seconds())
    return 5.0   # no header at all — a sane default`}</CodeBox>

        <SubSubTitle>Proactive throttling — a token bucket</SubSubTitle>

        <Para>
          Reacting to 429s is a safety net, not a strategy — a well-behaved
          pipeline should rarely trigger one at all. A <strong>token
          bucket</strong> smooths this out: a bucket holds a fixed number of
          tokens, refills at a steady rate, and every call consumes one token,
          waiting if none are available.
        </Para>

        <CodeBox label="A minimal token bucket limiter">{`import threading

class TokenBucketRateLimiter:
    def __init__(self, calls_per_second, burst_size=None):
        self.rate = calls_per_second
        self.capacity = burst_size or int(calls_per_second)
        self.tokens = float(self.capacity)
        self.last_refill = time.monotonic()
        self._lock = threading.Lock()

    def acquire(self):
        while True:
            with self._lock:
                now = time.monotonic()
                self.tokens = min(self.capacity, self.tokens + (now - self.last_refill) * self.rate)
                self.last_refill = now
                if self.tokens >= 1.0:
                    self.tokens -= 1.0
                    return
            time.sleep(1.0 / self.rate / 2)`}</CodeBox>

        <Para>
          Call <code style={inlineCode}>limiter.acquire()</code> immediately
          before every API request. If tokens are available it returns
          instantly; if not, it blocks just long enough for the bucket to
          refill — the pipeline naturally paces itself to the rate you configured,
          instead of firing requests as fast as possible and hoping.
        </Para>

        <TryThis>
          Set <code style={inlineCode}>calls_per_second=2</code> and call{' '}
          <code style={inlineCode}>acquire()</code> in a tight loop 10 times
          with a timestamp printed each time. You'll see the calls naturally
          space themselves roughly 0.5s apart — the bucket enforcing the rate
          without you writing any explicit <code style={inlineCode}>sleep</code>{' '}
          logic yourself.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 06 — Webhooks vs Polling ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Webhooks vs Polling" />
        <SectionTitle>Webhooks vs Polling — And Why Production Systems Use Both</SectionTitle>

        <Para>
          Polling means your pipeline regularly asks "anything new?" Webhooks
          mean the API calls <em>you</em> the moment something happens.
        </Para>

        <CompareTable
          headers={[{ label: 'Dimension' }, { label: 'Polling', color: '#7b61ff' }, { label: 'Webhooks', color: '#00e676' }]}
          keys={['dim', 'polling', 'webhooks']}
          rows={[
            { dim: 'Latency', polling: 'Minutes to hours, depending on interval', webhooks: 'Near-real-time — seconds' },
            { dim: 'Reliability', polling: 'You control exactly when you pull', webhooks: 'Delivery is not guaranteed by the provider' },
            { dim: 'Effort', polling: 'A scheduled script', webhooks: 'A public HTTPS endpoint you must run' },
            { dim: 'Best for', polling: 'Batch pipelines, no webhook support', webhooks: 'Real-time events like payment confirmations' },
          ]}
        />

        <SubSubTitle>A production webhook handler, one requirement at a time</SubSubTitle>

        <Para>A real webhook receiver has four jobs, in this exact order:</Para>

        <CodeBox label="1 — Verify the signature before trusting anything in the body">{`if not verify_webhook_signature(body, signature, WEBHOOK_SECRET):
    raise HTTPException(status_code=401)`}</CodeBox>

        <Para>
          Your endpoint is a public URL anyone can send a request to. Skipping
          this step means a malicious actor can send a fake{' '}
          <code style={inlineCode}>payment.captured</code> event and have your
          pipeline treat an unpaid order as paid.
        </Para>

        <CodeBox label="2 — Check whether you've already processed this exact event">{`if event_id in processed_event_ids:
    return {'status': 'already_processed'}   # still 200 — do not reprocess`}</CodeBox>

        <Para>
          This matters because of requirement 3 below: providers retry
          deliveries, so the same event can arrive more than once, by design.
        </Para>

        <CodeBox label="3 — Respond 200 immediately, process afterward">{`background_tasks.add_task(process_event, event)
return {'status': 'accepted'}`}</CodeBox>

        <Callout type="warning">
          This ordering is not a style preference. Most providers retry a
          webhook if they don't receive a 200 within 5–10 seconds. If your
          handler does real work — a database write, a downstream API call —{' '}
          <em>before</em> responding, and that work takes longer than the
          provider's timeout, you will receive the same event a second time
          while the first one is still running. Respond first, then process in
          the background — which is exactly why the idempotency check in
          step 2 is not optional.
        </Callout>

        <CodeBox label="4 — the actual processing, run as a background task">{`def process_event(event):
    if event.get('event') == 'payment.captured':
        write_payment_to_db(event['payload']['payment']['entity'])
    elif event.get('event') == 'order.paid':
        update_order_status(event['payload']['order']['entity'])`}</CodeBox>

        <SubSubTitle>The hybrid pattern — webhooks are not enough alone</SubSubTitle>

        <Para>
          Webhook delivery is not guaranteed — if your server was down during a
          provider's retry window, that event is simply gone. The production
          pattern pairs webhooks (for low latency) with an hourly reconciliation
          poll (for completeness):
        </Para>

        <CodeBox label="An hourly job that catches anything a webhook missed">{`def reconcile_missed_payments(lookback_hours=2):
    from_ts = int(time.time()) - lookback_hours * 3600
    to_ts = int(time.time())

    new_count = 0
    for payment in fetch_all_cursor(f'{API_BASE}/payments', auth_header(), {'from': from_ts, 'to': to_ts}):
        if upsert_payment(payment):   # upsert returns True only for a genuinely new row
            new_count += 1

    print(f'Reconciliation: {new_count} payments recovered')`}</CodeBox>

        <Para>
          Because <code style={inlineCode}>upsert_payment</code> is idempotent
          (Part 07 covers exactly why), running this on a 2-hour lookback every
          hour is safe even though it re-checks payments the webhook path
          already processed — anything already recorded is a no-op update, not
          a duplicate.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 — Schema Challenges ──────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Schema Challenges" />
        <SectionTitle>Writing a Parser That Survives the API Changing Under You</SectionTitle>

        <Para>
          APIs evolve. Providers add fields, rename them, and occasionally
          change a field's type entirely. A pipeline that works today can break
          silently next month when a vendor ships a new version — unless the
          parser was written defensively from the start.
        </Para>

        <CompareTable
          headers={[{ label: 'Versioning' }, { label: 'Looks like', color: '#00e676' }, { label: 'Impact', color: '#f97316' }]}
          keys={['s', 'l', 'i']}
          rows={[
            { s: 'URL (/v1/, /v2/)', l: '/v1/payments vs /v2/payments', i: 'Old URL keeps working until deprecated — you control migration timing' },
            { s: 'Header', l: 'API-Version: 2026-03-01', i: 'Must send it explicitly; omitting it silently uses a default that can change' },
            { s: 'No versioning', l: 'One URL, "backward compatible" changes', i: 'Riskiest — a provider can add a field safely or change a type unsafely' },
          ]}
        />

        <Para>
          The specific field that trips up almost every real payment
          integration is the amount: some providers return integer cents,
          others return a float in dollars, and some return either depending on
          payment method. Handle it once, in one place:
        </Para>

        <CodeBox label="A parser that accepts every format a real API actually sends">{`from decimal import Decimal, InvalidOperation

def parse_amount(raw):
    if raw is None:
        return None
    try:
        if isinstance(raw, int):
            value = Decimal(raw) / 100        # integer cents → dollars
        else:
            value = Decimal(str(raw).replace(',', '.'))  # float, string, or European comma
        return value.quantize(Decimal('0.01'))  # always 2 decimal places, whatever format came in
    except InvalidOperation:
        return None`}</CodeBox>

        <CodeBox label="Command">{`>>> parse_amount(3800)      # Stripe-style integer cents
Decimal('38.00')
>>> parse_amount(38.00)     # a float already in dollars
Decimal('38.00')
>>> parse_amount("38,00")   # a European-formatted string
Decimal('38.00')`}</CodeBox>

        <Para>
          Timestamps have the same problem — Unix seconds, Unix milliseconds,
          and ISO 8601 strings are all common, sometimes from the very same
          API depending on the endpoint:
        </Para>

        <CodeBox label="One function, every format">{`from datetime import datetime, timezone

def parse_timestamp(raw):
    if raw is None:
        return None
    if isinstance(raw, (int, float)):
        ts = raw / 1000 if raw > 1e10 else raw   # >1e10 means milliseconds, not seconds
        return datetime.fromtimestamp(ts, tz=timezone.utc)
    if isinstance(raw, str) and ('T' in raw or 'Z' in raw):
        return datetime.fromisoformat(raw.replace('Z', '+00:00'))
    return None`}</CodeBox>

        <Para>
          With both helpers in place, the actual record parser reads as a flat,
          honest mapping — every field handled defensively, nothing assumed:
        </Para>

        <CodeBox label="Combining both into one record parser">{`def parse_payment(raw):
    return {
        'payment_id': raw.get('id') or raw.get('payment_id'),
        'amount': parse_amount(raw.get('amount')),
        'currency': raw.get('currency', 'USD'),
        'status': (raw.get('status') or '').lower() or None,
        'created_at': parse_timestamp(raw.get('created_at') or raw.get('created')),
        '_raw': raw,   # keep the original — never silently discard unknown data
    }`}</CodeBox>

        <Para>
          That last field, <code style={inlineCode}>_raw</code>, is a habit
          worth keeping even once a pipeline feels stable: when the provider
          eventually adds a field you'll want later, it's already sitting in
          every historical row, instead of lost forever from records ingested
          before you noticed.
        </Para>

        <CodeBox label="A lightweight tripwire for a schema change you didn't expect">{`def detect_schema_changes(sample, expected_fields):
    seen_fields = {k for record in sample for k in record}
    new_fields = seen_fields - expected_fields
    if new_fields:
        print(f'WARNING: API is returning new fields not in schema: {new_fields}')`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Building the Production Pipeline ────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Building the Production Pipeline" />
        <SectionTitle>Assembling Everything Into One Real Ingestion Pipeline</SectionTitle>

        <Para>
          Every piece so far has been in isolation. Now they combine into the
          actual FreshCart payment-ingestion pipeline this module has been
          building toward — five properties stacked in order: authenticated,
          rate-limited, resumable, defensive, and idempotent.
        </Para>

        <SubSubTitle>Step 1 — configuration and structured logging</SubSubTitle>

        <CodeBox label="payment_ingestion.py — setup">{`import os, json, time, logging, uuid
import psycopg2
from pathlib import Path
from datetime import datetime, timezone, timedelta

API_BASE = 'https://api.payment-gateway.example.com/v1'
DLQ_PATH = Path('/data/dlq/payments.ndjson')
RUN_ID = str(uuid.uuid4())

logging.basicConfig(level=logging.INFO)
log = logging.getLogger('payment_ingestion')`}</CodeBox>

        <Para>
          <code style={inlineCode}>RUN_ID</code> gets attached to every log line
          for this run — when three pipeline runs overlap in a shared log file
          at 2 AM, this is what lets you filter to just the one that failed.
        </Para>

        <SubSubTitle>Step 2 — an authenticated fetch with retry, rate limiting, and backoff</SubSubTitle>

        <CodeBox label="Combining Part 03's auth, Part 05's limiter, and status-code handling from Part 02">{`limiter = TokenBucketRateLimiter(calls_per_second=8)   # stay under a 10/s API limit

def api_get(path, params, max_retries=5):
    url = f'{API_BASE}{path}'

    for attempt in range(1, max_retries + 1):
        limiter.acquire()
        resp = requests.get(url, headers=auth_header(), params=params, timeout=30)

        if resp.status_code == 200:
            check_rate_limit_headers(resp)
            return resp.json()
        elif resp.status_code == 429:
            time.sleep(handle_rate_limit_response(resp))
        elif resp.status_code in (500, 502, 503, 504):
            time.sleep(min(60, 2 ** attempt))
        else:
            resp.raise_for_status()   # a 4xx — do not retry, something is genuinely wrong

    raise RuntimeError(f'API call failed after {max_retries} attempts')`}</CodeBox>

        <Para>
          Notice this function is really just Part 02's status-code decision
          table, Part 03's <code style={inlineCode}>auth_header()</code>, and
          Part 05's rate limiting and backoff — expressed as code, nothing new.
        </Para>

        <SubSubTitle>Step 3 — paginated fetch with a checkpoint</SubSubTitle>

        <CodeBox label="The exact cursor-pagination pattern from Part 04, now checkpointed to a real file">{`def fetch_payments(from_ts, to_ts):
    checkpoint_file = Path(f'/data/checkpoints/payments_{from_ts}_{to_ts}.json')
    cursor = json.loads(checkpoint_file.read_text())['cursor'] if checkpoint_file.exists() else None

    while True:
        params = {'from': from_ts, 'to': to_ts, 'count': 100, **({'cursor': cursor} if cursor else {})}
        data = api_get('/payments', params)

        yield from data.get('items', [])

        cursor = data.get('cursor')
        if cursor:
            checkpoint_file.write_text(json.dumps({'cursor': cursor}))
        if not cursor or not data.get('items'):
            break

    checkpoint_file.unlink(missing_ok=True)   # clean up only on a full, successful run`}</CodeBox>

        <SubSubTitle>Step 4 — parse defensively, route failures to a dead-letter queue</SubSubTitle>

        <CodeBox label="Every bad record gets logged, not silently dropped and not crashing the run">{`def parse_payment_safe(raw):
    try:
        record = parse_payment(raw)   # from Part 07
        if record['amount'] is None or record['amount'] < 0:
            raise ValueError(f"invalid amount: {raw.get('amount')}")
        return record
    except Exception as e:
        with open(DLQ_PATH, 'a') as f:
            f.write(json.dumps({'error': str(e), 'record': raw}) + '\\n')
        log.warning('Record sent to DLQ: %s', e)
        return None`}</CodeBox>

        <Para>
          The dead-letter queue is what makes a bad record a Tuesday-afternoon
          investigation instead of a failed pipeline run at 6 AM — one
          malformed row gets logged and skipped, and the other 47,999 good
          rows still load on schedule.
        </Para>

        <SubSubTitle>Step 5 — idempotent writes</SubSubTitle>

        <CodeBox label="An upsert, keyed on the provider's own ID — the whole idempotency story in one query">{`from psycopg2.extras import execute_values

def upsert_batch(records, conn):
    rows = [(r['payment_id'], float(r['amount']), r['currency'], r['status'], r['created_at']) for r in records]
    with conn.cursor() as cur:
        execute_values(cur, """
            INSERT INTO silver.payments (payment_id, amount, currency, status, created_at)
            VALUES %s
            ON CONFLICT (payment_id) DO UPDATE SET status = EXCLUDED.status, updated_at = NOW()
        """, rows)
    conn.commit()
    return len(rows)`}</CodeBox>

        <Para>
          <code style={inlineCode}>ON CONFLICT (payment_id) DO UPDATE</code> is
          the entire idempotency guarantee in one line: running this pipeline
          twice for the same date, or hitting the same record via both the
          webhook path and the reconciliation poll, produces the same end
          state either way — never a duplicate row.
        </Para>

        <SubSubTitle>Step 6 — put it together, with a fixed (not relative) time window</SubSubTitle>

        <CodeBox label="The main entry point">{`def run(run_date):
    log.info('Pipeline started for %s (run_id=%s)', run_date, RUN_ID)
    dt = datetime.strptime(run_date, '%Y-%m-%d').replace(tzinfo=timezone.utc)
    from_ts, to_ts = int(dt.timestamp()), int((dt + timedelta(days=1)).timestamp())

    loaded, skipped, batch = 0, 0, []

    with psycopg2.connect(os.environ['DATABASE_URL']) as conn:
        for raw in fetch_payments(from_ts, to_ts):
            parsed = parse_payment_safe(raw)
            if parsed is None:
                skipped += 1
                continue
            batch.append(parsed)
            if len(batch) >= 5000:
                loaded += upsert_batch(batch, conn)
                batch = []
        if batch:
            loaded += upsert_batch(batch, conn)

    log.info('Pipeline complete: loaded=%d skipped=%d', loaded, skipped)`}</CodeBox>

        <Callout type="tip">
          <code style={inlineCode}>from_ts</code>/<code style={inlineCode}>to_ts</code>{' '}
          are computed from the <code style={inlineCode}>run_date</code>{' '}
          argument, not from "right now." That single choice is what makes the
          whole pipeline idempotent at the extraction level too — running it
          three times for <code style={inlineCode}>2026-03-17</code> always
          asks the API for exactly the same window, whether it's 6 AM or 6 PM
          when you run it.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 09 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Onboarding a Second Vendor — From Documentation to Production</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Scenario — FreshCart · Onboarding a new logistics API, ShipFast
          </div>

          <Para>
            FreshCart has just signed with a new delivery partner, ShipFast, and
            you're asked to ingest their daily delivery performance data. The
            payment pipeline just built is not reusable code here — it's a
            reusable <em>process</em>, applied to an entirely different API.
          </Para>

          <SubSubTitle>Step 1 — read the docs with a DE lens</SubSubTitle>
          <Para>
            Auth: API key in a header — simple. Rate limit: 500 requests per
            minute — comfortable. Pagination: cursor-based — good, the same
            pattern from Part 04. Webhooks: available, for status changes.
          </Para>

          <SubSubTitle>Step 2 — test with curl before writing any code</SubSubTitle>
          <CodeBox label="Manual exploration, before any pipeline code exists">{`curl -s -H "X-API-Key: $SHIPFAST_API_KEY" \\
     "https://api.shipfast.io/v2/deliveries?date=2026-03-17&limit=5"`}</CodeBox>
          <Output label="response">{`{
  "data": [ ... ],
  "pagination": { "cursor": "eyJpZCI6MTI...", "has_more": true, "total": 48234 }
}`}</Output>
          <Para>
            One request, and three of Part 04's exact concepts are already
            confirmed: cursor-based, a <code style={inlineCode}>total</code>{' '}
            field for validating counts, and a shape close enough to the
            payment API that the same <code style={inlineCode}>fetch_all_cursor</code>{' '}
            pattern applies with almost no changes.
          </Para>

          <SubSubTitle>Step 3 — identify the data quality risks</SubSubTitle>
          <Para>
            The <code style={inlineCode}>amount</code> field is sometimes an
            integer, sometimes a float, exactly like Part 07's{' '}
            <code style={inlineCode}>parse_amount</code> was built to handle.{' '}
            <code style={inlineCode}>delivered_at</code> is null for
            undelivered orders. <code style={inlineCode}>agent_id</code> refers
            to ShipFast's internal IDs, not FreshCart's — three things the
            parser handles defensively, reusing Part 07's exact helpers.
          </Para>

          <SubSubTitle>Steps 4–6 — build small, backfill, then layer on webhooks</SubSubTitle>
          <Para>
            Run for one day first, and compare the API's <code style={inlineCode}>total</code>{' '}
            against rows actually written — any mismatch means a pagination or
            parsing bug, caught immediately rather than in production. Backfill
            90 days of history with the same checkpointed loop from Part 08's
            Step 3, so a crash on day 47 resumes from day 47, not day 1.
            Finally, register a webhook endpoint for status changes, reusing
            Part 06's four-step handler (verify, dedupe, respond, process) and
            Part 06's hourly reconciliation job to catch anything missed.
          </Para>

          <Para>
            Total time from task assignment to production: about two days.
            Every step reused a pattern already built for the payment pipeline
            — only the field names, endpoint URLs, and specific quirks changed.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Misconceptions ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 10 — Misconceptions" />
        <SectionTitle>Five Misconceptions About Working with APIs</SectionTitle>

        {[
          {
            wrong: '"Cursor pagination is just a fancier, unnecessary version of offset pagination"',
            right: 'On a live, actively-changing dataset, offset pagination can silently skip or duplicate records when rows are inserted mid-pagination — with no error raised anywhere. Cursor pagination is not a nicety; on production data it is frequently the difference between correct and silently wrong results.',
          },
          {
            wrong: '"If an API call fails, the safe default is to just retry it"',
            right: 'Only for 429 and 5xx responses. A 4xx means your own request is malformed or unauthorized — retrying the identical request produces the identical failure every time. Blindly retrying every failure wastes time and can mask a real bug as a transient one.',
          },
          {
            wrong: '"Webhooks are more reliable than polling because they\'re real-time"',
            right: 'Real-time and reliable are different properties. Webhook delivery is not guaranteed — if your endpoint is briefly down during a provider\'s retry window, that event is gone. Production systems pair webhooks (for latency) with periodic reconciliation polling (for completeness) precisely because neither alone is sufficient.',
          },
          {
            wrong: '"Responding 200 to a webhook only after your database write completes is the safer, more correct order"',
            right: 'It is the opposite: most providers retry if they don\'t receive 200 within 5-10 seconds, so slow synchronous processing before responding causes duplicate deliveries of the same event. Respond 200 immediately, then process in the background, with an idempotency check to safely absorb the resulting duplicates.',
          },
          {
            wrong: '"Once a pipeline works against an API, it will keep working unless you change your own code"',
            right: 'APIs change on their own timeline — providers add fields, rename them, or change a type. A parser that assumes a fixed, unchanging shape breaks the moment the vendor ships an unrelated update. Defensive parsing (Part 07) is not paranoia, it is planning for something that reliably happens to every long-lived integration eventually.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
              ✕ &quot;{item.wrong}&quot;
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 11 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 11 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is the difference between cursor pagination and offset pagination? When would you use each?',
            a: `Offset pagination specifies where to start by a number: give me 100 records starting from position 500. The API executes this as LIMIT and OFFSET, which requires the database to read and discard the first 500 rows before returning the 100 you need — fast at small scale, but a deep offset (position 50,000 in a 10-million-row table) forces scanning and discarding 50,000 rows just to reach your page.

The more critical problem is correctness on a live dataset. If new records are inserted while you're paginating, offsets shift underneath you — a record at position 100 moves to 101, and your next request (still asking for "position 101-200" from before the shift) skips it entirely, with no error.

Cursor pagination returns an opaque cursor encoding the last record's ID or timestamp. The next request sends it back, and the API executes something like WHERE id > cursor_value ORDER BY id LIMIT 100 — an index range scan, fast regardless of depth, and unaffected by insertions elsewhere in the table because the cursor points at a specific record, not a position.

Use offset for small, static datasets or when an API simply doesn't offer cursor pagination. Use cursor pagination for everything else — it's the correct default for production ingestion of any dataset that's large or actively changing.`,
          },
          {
            q: 'Q2. An API you\'re ingesting from starts returning 429 responses. Walk me through your handling strategy.',
            a: `429 means the rate limit is exceeded. My handling has three layers.

First, react correctly to the 429 itself: read the Retry-After header if present, add 10-20% random jitter to avoid synchronized retries across pipeline instances, and sleep that long before retrying the same request. Without a Retry-After header, fall back to exponential backoff — 2s, 4s, 8s, up to a cap — with the same jitter.

Second, and more important, prevent most 429s from happening at all: a proactive rate limiter (a token bucket) paces requests below the API's stated limit, and I check X-RateLimit-Remaining on every successful response, slowing down further if it drops below roughly 10% of the total.

Third, treat frequent 429s as a signal to fix the configuration, not just the retry logic — if they're common, my limiter's target rate is set too high for this API, or my pipeline may be sharing a rate-limit bucket with another process using the same key, which needs coordinating separately.`,
          },
          {
            q: 'Q3. How do you verify the authenticity of incoming webhooks and why does it matter?',
            a: `A webhook endpoint is a public HTTPS URL — anyone on the internet can send it a request. Without verification, an attacker could send a fake payment.captured event and have your pipeline treat an unpaid order as paid.

Most providers sign the raw request body with HMAC-SHA256 using a secret only you and the provider know, and include the resulting signature in a header. To verify: read the raw body as bytes before any JSON parsing, compute the same HMAC-SHA256 over it with your secret, and compare that to the signature header.

The comparison must use hmac.compare_digest, not a plain equality check. A naive comparison returns as soon as it finds the first mismatched character, and that timing difference leaks information about how much of the signature was correct — an attacker measuring response times could reconstruct a valid signature byte by byte. compare_digest takes constant time regardless of where the strings diverge, closing that channel. If the signature doesn't match, return 401 immediately without processing anything in the body.`,
          },
          {
            q: 'Q4. How would you design an API ingestion pipeline to be idempotent?',
            a: `Idempotent means running the pipeline once or a hundred times against the same input produces the same result — essential, because failures and reruns are a normal operational reality, not an edge case.

Three things make that true. First, idempotent writes: upsert on the API's own business key (ON CONFLICT (payment_id) DO UPDATE) instead of a plain INSERT, so reprocessing a record updates it in place rather than duplicating it. Second, idempotent extraction: compute the time window from the run_date parameter, not from "now" — a fixed window like "2026-03-17 means midnight to midnight UTC" fetches identically no matter when the pipeline actually executes, whereas a relative window like "last 24 hours" fetches a different range every retry. Third, checkpoint-based resumability: save the pagination cursor after every successfully processed page, so a crash partway through resumes from the last checkpoint instead of reprocessing everything from page one — the upsert would make that safe anyway, but resuming correctly is far more efficient.`,
          },
          {
            q: 'Q5. What is OAuth 2.0, and when would a pipeline use it instead of a simple API key?',
            a: `OAuth 2.0 grants limited, time-boxed access without ever sharing a real password — a token represents a specific set of permissions instead.

A pipeline reaches for it in two situations. The first is accessing user-specific data on a third-party platform — Salesforce, Google Analytics, HubSpot — where the data belongs to a specific user's account and the platform requires their explicit consent. The Authorization Code grant handles this: a one-time browser flow issues a long-lived refresh token, and the pipeline uses that refresh token indefinitely afterward to obtain short-lived access tokens with no further user interaction.

The second is server-to-server access to your own organization's resources — Google Cloud APIs, Salesforce connected apps — where the Client Credentials grant issues tokens directly from a client ID and secret, no user involved at all. This is more secure than a static API key specifically because the token expires quickly (often one hour), so a leaked token has a much smaller window of exposure than a leaked key that's valid indefinitely.

The practical cost: an API-key pipeline sends the same string forever, while an OAuth pipeline must track token expiry and refresh proactively — more moving parts, but required whenever the API mandates it.`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Using a relative time window ("last 24 hours") for incremental extraction',
            a: 'A retry or rerun at a different time of day fetches a different range than the original run, so the pipeline produces different row counts every time it executes for what was supposed to be "the same" period. Always compute a fixed window from the run_date parameter, never from the current time.',
          },
          {
            q: 'Calling response.json() without checking the status code first',
            a: 'A 429 or 5xx response is often an HTML error page or a CDN maintenance page, not JSON — .json() throws a confusing JSONDecodeError that hides the real problem. Check response.status_code (or call raise_for_status()) before ever attempting to parse the body as JSON.',
          },
          {
            q: 'Treating all failed requests the same way and retrying everything',
            a: 'A 4xx means your request itself is wrong — retrying the identical request produces the identical failure every time and just wastes time. Only 429 (rate limited) and 5xx (their problem, usually transient) are worth retrying; a 4xx needs the request fixed, not repeated.',
          },
          {
            q: 'Processing a webhook synchronously before returning a response',
            a: "Providers retry if they don't get a 200 within a few seconds — slow synchronous processing (a database write, a downstream call) routinely causes the same event to be delivered twice. Respond 200 immediately, then process asynchronously, with an idempotency check to safely handle the resulting duplicate.",
          },
          {
            q: 'Assuming a field will always be present and always be the same type',
            a: 'A field that\'s always an integer today can become a string tomorrow after a vendor "improvement," and a field that\'s always present can become optional. Every field access should have an explicit fallback (.get() with a default), and numeric/date fields specifically should handle the 2-3 formats real APIs actually send.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1`,
            cause: 'The API returned a non-JSON body: an HTML error page from a 429/5xx, a maintenance page from a CDN, or a redirect to a login page after the session expired. The network call succeeded, but the body is not JSON.',
            fix: 'Always call response.raise_for_status() (or check status_code) before response.json(). Wrap the parse in try/except ValueError and log response.text[:500] on failure — it often contains the real error from a proxy or CDN.',
          },
          {
            error: `Pagination returns the same payment_id twice`,
            cause: "Almost always offset pagination on a live dataset — a new record was inserted between page 1 and page 2, shifting every subsequent offset, and the same record is served again. Less commonly, a cursor wasn't saved correctly and a page was re-fetched after a retry.",
            fix: 'Switch to cursor pagination if the API supports it. If offset is unavoidable, add a UNIQUE constraint on the business key and upsert (ON CONFLICT DO UPDATE) so a duplicate becomes a no-op update instead of a duplicate row.',
          },
          {
            error: `requests.exceptions.SSLError: [SSL: CERTIFICATE_VERIFY_FAILED]`,
            cause: "The server is using a self-signed or internal-CA certificate not in Python's trusted certificate store — common with internal APIs behind a corporate proxy.",
            fix: 'Obtain the CA bundle from IT and pass it explicitly: requests.get(url, verify="/path/to/ca-bundle.crt"). Never set verify=False in production — it disables all certificate checking, not just this one issue.',
          },
          {
            error: `The same pipeline run produces different row counts each time — 48,234 then 48,891`,
            cause: 'A relative time window ("last 24 hours") instead of a fixed one, combined with late-arriving data at the source — records timestamped before midnight but processed by the vendor after it.',
            fix: 'Compute a fixed window from the run_date parameter (e.g. exactly midnight to midnight UTC for that date), and run with a 6-12 hour delay after the period ends so most late-arriving data is already settled; use upserts so anything still late updates correctly on the next run.',
          },
          {
            error: `The same payment.captured webhook event creates two rows`,
            cause: "Your handler processed synchronously and took longer than the provider's delivery timeout, so it retried while the first attempt was still running — both completed, both inserted.",
            fix: 'Return 200 immediately, before processing. Check an idempotency table/set keyed by event_id before doing any real work, and skip (returning 200 unchanged) if it\'s already been seen.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)',
              marginBottom: 12, background: 'rgba(255,71,87,0.08)',
              border: '1px solid rgba(255,71,87,0.2)',
              borderRadius: 6, padding: '8px 12px', lineHeight: 1.5,
            }}>{item.error}</div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'Every API call is an HTTP request. 2xx means success, 4xx means your request is wrong (do not retry as-is), 5xx means retry with backoff. 429 specifically means back off and retry using the Retry-After header.',
        'API keys are static strings from environment variables, never hardcoded. OAuth 2.0 Client Credentials is for server-to-server access; Authorization Code is for user-specific data via a third party. HMAC signs requests with a shared secret and is how you verify incoming webhooks.',
        'Cursor pagination is the correct default for production: stable under concurrent writes, fast at any depth, and genuinely resumable via a saved checkpoint. Offset pagination degrades on both performance and correctness as a live dataset grows.',
        'Rate limiting needs two layers: a proactive token bucket that paces requests below the limit, and reactive handling (Retry-After, exponential backoff, jitter) for the 429s that get through anyway.',
        'Webhooks are low-latency but not guaranteed — always pair them with periodic reconciliation polling. A webhook handler must verify the signature (hmac.compare_digest), respond 200 immediately, and only then process, with an idempotency check to absorb the resulting duplicate deliveries.',
        'Write defensive parsers: .get() with defaults for every field, and explicit handling for every real-world format a field might arrive in (integer cents vs float dollars, Unix seconds vs milliseconds vs ISO 8601). Keep the raw record alongside the parsed one — it is what saves you when a field you need shows up after the fact.',
        'A production pipeline is idempotent (upserts on a business key), resumable (a saved pagination checkpoint), and computes its time window from the run date, never from "now" — that one choice is what makes reruns produce identical results instead of silently different ones.',
        'Always test a new API with curl before writing a line of pipeline code — confirm auth works, read the pagination style and rate-limit headers, and inspect a real sample response. Ten minutes here prevents hours of debugging a misunderstood API later.',
      ]} />

      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 19 covers working with files at scale — partitioning strategies, compression trade-offs, the small file problem, and how columnar formats like Parquet store and retrieve data internally.
        </p>
        <Link href="/learn/data-engineering/files-at-scale" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 19 → Working with Files at Scale
        </Link>
      </div>
    </LearnLayout>
  )
}

function Table3() {
  return (
    <CompareTable
      headers={[{ label: 'Style' }, { label: 'Best for', color: '#00e676' }, { label: 'Watch out for', color: '#ff4757' }]}
      keys={['style', 'best', 'watch']}
      rows={[
        { style: 'Offset/limit', best: 'Small, static datasets; jumping to a specific page', watch: 'Slow at deep pages; skips/duplicates on live data' },
        { style: 'Cursor', best: 'Large or actively-changing datasets — the default choice', watch: 'Cannot jump to an arbitrary page; cursors may expire' },
        { style: 'Next-URL / Link header', best: 'APIs that hand you the whole next request already-built', watch: 'Format varies — body field vs Link header, check the docs' },
      ]}
    />
  )
}
