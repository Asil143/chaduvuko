import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
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

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
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

export default function WorkingWithAPIsModule() {
  return (
    <LearnLayout
      title="Working with APIs — REST, Auth, Pagination, Rate Limits"
      description="How APIs work, every auth pattern, all pagination styles, rate limits, and webhooks vs polling."
      section="Data Engineering"
      readTime="70 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — Why APIs Matter ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — APIs Are Everywhere in Data Engineering" />
        <SectionTitle>Why Every Data Engineer Must Be Fluent with APIs</SectionTitle>

        <Para>
          A data engineer who cannot work confidently with APIs is blocked from
          half the data sources they will encounter. Payment processors, CRM
          systems, marketing platforms, weather services, logistics APIs,
          government data portals — none of them hand you a database connection
          string. They hand you an API key and a documentation URL.
        </Para>

        <Para>
          Module 14 covered the Python mechanics of making API calls. This module
          goes deeper: how HTTP and REST actually work under the hood, every
          authentication pattern in production use, all three pagination styles
          with their trade-offs, rate limiting strategies both reactive and
          proactive, webhooks vs polling and when to choose each, and how to
          design API ingestion pipelines that are reliable, resumable, and
          production-safe.
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
              { num: '02', name: 'Authentication patterns', desc: 'API keys, Bearer tokens, OAuth 2.0, HMAC — each in depth.' },
              { num: '03', name: 'Pagination', desc: 'Offset, cursor, and next-URL — trade-offs and implementation.' },
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
          Every API call is an HTTP request. Understanding the anatomy of that
          request and response — methods, headers, status codes, body — lets you
          diagnose API problems instantly, understand what a vendor's documentation
          is telling you, and write code that handles every response correctly.
        </Para>

        <SubTitle>The anatomy of an HTTP request and response</SubTitle>

        <CodeBox label="HTTP request and response — every component explained">{`HTTP REQUEST (what your code sends):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GET /v1/payments?from=1710633000&to=1710719400&count=100 HTTP/1.1
Host: api.razorpay.com
Authorization: Basic cnpwX2xpdmVfeHh4Ong=      ← base64(key_id:key_secret)
Content-Type: application/json
Accept: application/json
User-Agent: FreshCart-Pipeline/1.0
X-Request-ID: f8a3b2c4-1234-5678-abcd-ef0123456789

[body — empty for GET, JSON payload for POST/PUT/PATCH]

Components:
  Method:   GET — read data without side effects
  Path:     /v1/payments — the resource being accessed
  Query:    ?from=...&to=...&count=100 — filter/pagination parameters
  Headers:  key-value metadata about the request
  Body:     data sent to the server (POST/PUT/PATCH only)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HTTP RESPONSE (what the server sends back):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HTTP/1.1 200 OK
Content-Type: application/json
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 847
X-RateLimit-Reset: 1710720000
Retry-After: (only present on 429 responses)

{
  "entity": "collection",
  "count": 100,
  "items": [...],
  "cursor": "eyJpZCI6InBheV94eHh4In0="
}

Response components:
  Status line: HTTP version + status code + reason phrase
  Headers:     metadata (content type, rate limit info, pagination)
  Body:        the actual data (usually JSON for REST APIs)`}</CodeBox>

        <SubTitle>HTTP methods — what each one means</SubTitle>

        <CompareTable
          headers={[
            { label: 'Method' },
            { label: 'Meaning', color: '#00e676' },
            { label: 'Has body?', color: '#7b61ff' },
            { label: 'Idempotent?', color: '#f97316' },
            { label: 'DE use case', color: '#4285f4' },
          ]}
          keys={['method', 'meaning', 'body', 'idempotent', 'use']}
          rows={[
            { method: 'GET', meaning: 'Read a resource — no side effects', body: 'No', idempotent: 'Yes — same result every time', use: 'Fetch payments, list orders, get customer' },
            { method: 'POST', meaning: 'Create a new resource or trigger an action', body: 'Yes', idempotent: 'No — creates a new resource each call', use: 'Submit a batch, trigger a report export, send a webhook' },
            { method: 'PUT', meaning: 'Replace a resource entirely with the payload', body: 'Yes', idempotent: 'Yes — replaces to the same state', use: 'Update a configuration, replace a record fully' },
            { method: 'PATCH', meaning: 'Partially update a resource (only specified fields)', body: 'Yes', idempotent: 'Usually yes', use: 'Update one field of a record' },
            { method: 'DELETE', meaning: 'Delete a resource', body: 'Rarely', idempotent: 'Yes — deleting something already deleted still succeeds', use: 'Rarely used in DE ingestion' },
          ]}
        />

        <SubTitle>HTTP status codes — what every data engineer must memorise</SubTitle>

        <CodeBox label="Status codes — the complete DE reference">{`2xx — SUCCESS
  200 OK              Standard success — request processed, data in body
  201 Created         Resource was created (POST responses)
  202 Accepted        Request received but processing async — poll for result
  204 No Content      Success but no body (DELETE responses often)

3xx — REDIRECTION
  301 Moved Permanently   Resource at a new URL — update your endpoint
  302 Found / Temporary   Temporary redirect — follow but do not update
  304 Not Modified        Resource unchanged since If-Modified-Since — use cache

4xx — CLIENT ERROR (your code is wrong — do NOT retry automatically)
  400 Bad Request         Malformed request — wrong parameters, invalid JSON
  401 Unauthorized        Missing or invalid authentication credentials
  403 Forbidden           Authenticated but not authorised for this resource
  404 Not Found           Resource does not exist
  405 Method Not Allowed  Using GET where POST is required (or vice versa)
  409 Conflict            Request conflicts with current state (duplicate)
  410 Gone                Resource permanently deleted (stop trying)
  422 Unprocessable       Request understood but semantically invalid
  429 Too Many Requests   Rate limit exceeded — MUST back off and retry

5xx — SERVER ERROR (their problem — retry with backoff)
  500 Internal Server Error  Something crashed on their end — transient usually
  502 Bad Gateway            Upstream server error — transient
  503 Service Unavailable    Server overloaded or in maintenance — transient
  504 Gateway Timeout        Upstream timeout — transient

PIPELINE DECISION:
  2xx  → process the data
  3xx  → follow redirect (requests library does this automatically)
  400  → log error, send to DLQ — your request is malformed
  401  → alert — credentials are wrong or expired, do not retry
  403  → alert — check permissions, do not retry
  404  → log warning — resource may have been deleted
  429  → back off and retry (check Retry-After header)
  5xx  → retry with exponential backoff`}</CodeBox>

        <SubTitle>REST vs GraphQL vs gRPC — knowing which you are dealing with</SubTitle>

        <Para>
          Most public APIs and vendor APIs that data engineers ingest from are REST.
          Some internal APIs at larger companies use GraphQL (Facebook, Shopify admin)
          or gRPC (Google Cloud services). Understanding the difference prevents
          confusion when a documentation page does not look like standard REST.
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
            { aspect: 'Request format', rest: 'HTTP GET/POST to specific URL per resource', graphql: 'HTTP POST to single endpoint with query in body', grpc: 'Binary Protobuf over HTTP/2' },
            { aspect: 'Response format', rest: 'JSON (usually)', graphql: 'JSON, exactly the fields you requested', grpc: 'Binary Protobuf (fast, compact)' },
            { aspect: 'Versioning', rest: 'URL (/v1/, /v2/) or header', graphql: 'Schema evolution (add fields, deprecate)', grpc: 'Protobuf schema versioning' },
            { aspect: 'Over-fetching', rest: 'Common — API returns all fields even if you need 2', graphql: 'None — you specify exact fields needed', grpc: 'None — schema defines exact fields' },
            { aspect: 'DE tooling support', rest: 'Universal — every tool, every language', graphql: 'Good — Python gql library, Fivetran support', grpc: 'Good for Google Cloud APIs' },
            { aspect: 'Common examples', rest: 'Stripe, Stripe, Salesforce, GitHub, most vendor APIs', graphql: 'Shopify Admin, GitHub v4, Supabase', grpc: 'Google Cloud Storage, BigQuery, Pub/Sub' },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 03 — Authentication Patterns ────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Authentication Patterns" />
        <SectionTitle>Authentication — Every Pattern a Data Engineer Encounters</SectionTitle>

        <Para>
          Every API that is not public requires authentication — proof that your
          code is allowed to access the data. There are five authentication patterns
          in widespread use. A data engineer who recognises each pattern on sight
          can implement any new API integration without confusion.
        </Para>

        <SubTitle>Pattern 1 — API Key</SubTitle>

        <CodeBox label="API Key authentication — the most common pattern">{`# An API key is a static string that identifies your application.
# Sent with every request — either as a header or query parameter.

import os
import requests

API_KEY = os.environ['RAZORPAY_API_KEY']   # NEVER hardcode

# Method A: Authorization header (most secure, most common)
response = requests.get(
    'https://api.example.com/v1/payments',
    headers={
        'Authorization': f'Bearer \${API_KEY}',
        'Content-Type': 'application/json',
    },
)

# Method B: Custom header (some APIs use their own header name)
response = requests.get(
    'https://api.example.com/v1/payments',
    headers={'X-API-Key': API_KEY},
)

# Method C: Query parameter (least secure — key appears in logs and URLs)
response = requests.get(
    'https://api.example.com/v1/payments',
    params={'api_key': API_KEY},
)

# Stripe uses HTTP Basic Auth with key_id as username, key_secret as password:
from requests.auth import HTTPBasicAuth

response = requests.get(
    'https://api.razorpay.com/v1/payments',
    auth=HTTPBasicAuth(
        os.environ['RAZORPAY_KEY_ID'],
        os.environ['RAZORPAY_KEY_SECRET'],
    ),
)

# SECURITY RULES FOR API KEYS:
# 1. Never hardcode — always read from environment variables
# 2. Never commit to git (add .env to .gitignore)
# 3. Use different keys per environment (dev key, prod key)
# 4. Rotate periodically (every 90 days is common)
# 5. Restrict key permissions to only what the pipeline needs (read-only)
# 6. Monitor for unusual usage — most providers have usage dashboards`}</CodeBox>

        <SubTitle>Pattern 2 — OAuth 2.0</SubTitle>

        <Para>
          OAuth 2.0 is the standard for delegated authorisation — it allows your
          pipeline to access data on behalf of a user or organisation without
          ever seeing that user's password. It is more complex than API keys but
          required for APIs that serve user-specific data: Google Analytics,
          Salesforce, HubSpot, QuickBooks.
        </Para>

        <CodeBox label="OAuth 2.0 — the four grant types a DE encounters">{`# OAuth 2.0 GRANT TYPES — choose based on the use case:

# ── CLIENT BrexENTIALS (for server-to-server, no user involved) ───────────────
# Use for: your pipeline accessing your own organisation's data
# Examples: Google Cloud APIs, internal company APIs, Salesforce connected apps

import requests, os, time

class OAuth2ClientCredentials:
    """Manages OAuth 2.0 client credentials tokens with automatic refresh."""

    def __init__(self, token_url: str, client_id: str, client_secret: str, scope: str = ''):
        self.token_url = token_url
        self.client_id = client_id
        self.client_secret = client_secret
        self.scope = scope
        self._token: str | None = None
        self._expires_at: float = 0

    def get_token(self) -> str:
        if self._token and time.time() < self._expires_at - 60:
            return self._token          # return cached token (with 60s buffer)

        response = requests.post(
            self.token_url,
            data={
                'grant_type':    'client_credentials',
                'client_id':     self.client_id,
                'client_secret': self.client_secret,
                'scope':         self.scope,
            },
            timeout=30,
        )
        response.raise_for_status()
        data = response.json()

        self._token      = data['access_token']
        self._expires_at = time.time() + data.get('expires_in', 3600)
        return self._token

    def auth_header(self) -> dict:
        return {'Authorization': f'Bearer \${self.get_token()}'}


# Usage:
auth = OAuth2ClientCredentials(
    token_url     = 'https://auth.example.com/oauth/token',
    client_id     = os.environ['CLIENT_ID'],
    client_secret = os.environ['CLIENT_SECRET'],
    scope         = 'read:payments read:orders',
)

response = requests.get(
    'https://api.example.com/v1/payments',
    headers=auth.auth_header(),
)


# ── AUTHORIZATION CODE (user grants permission — requires browser) ─────────────
# Use for: accessing a specific user's data in Salesforce, Google Analytics, etc.
# Flow:
#   1. Redirect user to provider's auth URL with your client_id
#   2. User logs in and approves access
#   3. Provider redirects back to your callback URL with a code
#   4. Exchange code for access_token + refresh_token
#   5. Use access_token for API calls
#   6. When access_token expires, use refresh_token to get a new one
#      (refresh_tokens are long-lived — store securely)

# Step 6: Token refresh (the part you automate in your pipeline)
def refresh_access_token(refresh_token: str) -> dict:
    response = requests.post(
        'https://auth.salesforce.com/services/oauth2/token',
        data={
            'grant_type':    'refresh_token',
            'refresh_token': refresh_token,
            'client_id':     os.environ['SF_CLIENT_ID'],
            'client_secret': os.environ['SF_CLIENT_SECRET'],
        },
    )
    response.raise_for_status()
    return response.json()   # contains new access_token (and sometimes new refresh_token)


# ── IMPLICIT and PASSWORD GRANT ───────────────────────────────────────────────
# Implicit grant: deprecated — do not use for new integrations
# Password grant: use username/password directly — avoid if possible (security risk)
#                 Some legacy internal APIs still use this`}</CodeBox>

        <SubTitle>Pattern 3 — HMAC Signature</SubTitle>

        <CodeBox label="HMAC signature authentication — request signing">{`# HMAC (Hash-based Message Authentication Code) signs each request
# with a shared secret. The server recomputes the signature and compares.
# Used by: AWS Signature v4, Shopify webhooks, Stripe webhooks,
#          some payment gateway APIs.

import hmac
import hashlib
import time
import base64

def sign_request(
    method: str,
    path: str,
    body: str,
    secret: str,
    timestamp: str | None = None,
) -> dict:
    """
    Create HMAC-SHA256 signature for a request.
    Returns headers to include with the request.
    """
    timestamp = timestamp or str(int(time.time()))

    # Build the string to sign (format varies by API — check their docs)
    string_to_sign = f'\${timestamp}\n\${method.upper()}\n\${path}\n\${body}'

    # Compute HMAC-SHA256
    signature = hmac.new(
        secret.encode('utf-8'),
        string_to_sign.encode('utf-8'),
        hashlib.sha256,
    ).hexdigest()

    return {
        'X-Timestamp': timestamp,
        'X-Signature': signature,
        'Content-Type': 'application/json',
    }


# Usage:
import json
payload = {'from': 1710633000, 'to': 1710719400}
body    = json.dumps(payload)

headers = sign_request(
    method = 'POST',
    path   = '/v1/payments/bulk',
    body   = body,
    secret = os.environ['API_SECRET'],
)

response = requests.post(
    'https://api.example.com/v1/payments/bulk',
    headers=headers,
    data=body,
)


# VERIFYING INCOMING HMAC SIGNATURES (for webhooks):
# When an API sends you a webhook, verify it before processing:

def verify_webhook_signature(
    payload_body: bytes,
    signature_header: str,
    secret: str,
) -> bool:
    """Verify an incoming webhook's HMAC signature."""
    expected = hmac.new(
        secret.encode('utf-8'),
        payload_body,
        hashlib.sha256,
    ).hexdigest()

    # Use hmac.compare_digest to prevent timing attacks
    return hmac.compare_digest(expected, signature_header)


# In your webhook handler (Flask/FastAPI):
# body = request.get_data()
# signature = request.headers.get('X-Signature')
# if not verify_webhook_signature(body, signature, SECRET):
#     return 401`}</CodeBox>

        <SubTitle>Pattern 4 — JWT (JSON Web Tokens)</SubTitle>

        <CodeBox label="JWT — reading and using JSON Web Tokens">{`# JWT (JSON Web Token) is a self-contained token that encodes claims
# (user ID, roles, expiry) in a signed JSON structure.
# Format: header.payload.signature (base64url-encoded, dot-separated)

import base64, json, time

def decode_jwt_payload(token: str) -> dict:
    """Decode JWT payload WITHOUT verifying signature (for inspection only)."""
    parts = token.split('.')
    if len(parts) != 3:
        raise ValueError(f'Invalid JWT format: expected 3 parts, got \${len(parts)}')

    # Add padding if needed (base64url omits = padding)
    payload_b64 = parts[1] + '=' * (4 - len(parts[1]) % 4)
    payload = json.loads(base64.urlsafe_b64decode(payload_b64))
    return payload


def is_jwt_expired(token: str, buffer_seconds: int = 60) -> bool:
    """Check if a JWT token has expired (or will expire within buffer_seconds)."""
    payload = decode_jwt_payload(token)
    exp = payload.get('exp')
    if exp is None:
        return False   # no expiry claim — token does not expire
    return time.time() > (exp - buffer_seconds)


# Token management for APIs that use JWT:
class JWTTokenManager:
    """Manages a JWT token with automatic refresh when approaching expiry."""

    def __init__(self, token_url: str, credentials: dict):
        self.token_url   = token_url
        self.credentials = credentials
        self._token: str | None = None

    def get_valid_token(self) -> str:
        if self._token and not is_jwt_expired(self._token, buffer_seconds=120):
            return self._token

        # Fetch new token
        response = requests.post(
            self.token_url,
            json=self.credentials,
            timeout=30,
        )
        response.raise_for_status()
        self._token = response.json()['token']
        return self._token

    def auth_header(self) -> dict:
        return {'Authorization': f'Bearer \${self.get_valid_token()}'}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Pagination ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Pagination" />
        <SectionTitle>Pagination — Three Styles, Their Trade-offs, and Complete Implementations</SectionTitle>

        <Para>
          No API returns a million records in one response. Pagination is how
          APIs split large result sets into pages. Every data engineer who fetches
          data from APIs must understand all three pagination styles because each
          works differently, has different failure modes, and requires different
          code to handle correctly.
        </Para>

        <SubTitle>Style 1 — Offset/Limit (page-based)</SubTitle>

        <CodeBox label="Offset pagination — implementation, problems, and when to use">{`# Offset pagination: specify where to start (offset) and how many to return (limit)
# API parameters: ?page=3&limit=100  OR  ?offset=200&limit=100

# ── HOW IT WORKS ──────────────────────────────────────────────────────────────
# Page 1: SELECT * FROM payments LIMIT 100 OFFSET 0    → rows 1-100
# Page 2: SELECT * FROM payments LIMIT 100 OFFSET 100  → rows 101-200
# Page 3: SELECT * FROM payments LIMIT 100 OFFSET 200  → rows 201-300

from typing import Iterator
import requests, os, time

def fetch_all_offset(base_url: str, headers: dict, params: dict) -> Iterator[dict]:
    """Fetch all records using offset/page pagination."""
    page = 1
    limit = params.get('limit', 100)

    while True:
        response = requests.get(
            base_url,
            headers=headers,
            params={**params, 'page': page, 'limit': limit},
            timeout=30,
        )
        response.raise_for_status()
        data = response.json()

        # APIs signal end of results differently — handle common patterns:
        items = (
            data.get('items') or
            data.get('data') or
            data.get('results') or
            data                    # some APIs return the array directly
        )
        if isinstance(items, dict):
            items = []   # unexpected format

        if not items:
            break        # no more items — we are done

        for item in items:
            yield item

        # Check total count if provided:
        total = data.get('total') or data.get('count')
        if total and page * limit >= total:
            break        # fetched all records

        if len(items) < limit:
            break        # partial page — last page

        page += 1
        time.sleep(0.1)   # light throttle to avoid rate limiting


# ── PROBLEMS WITH OFFSET PAGINATION ───────────────────────────────────────────
# 1. SKIPPING: if new records are inserted during pagination, pages shift
#    Page 1 fetches records 1-100.
#    Someone inserts a new record at position 50.
#    Page 2 now starts at the OLD record 101, but that is now record 102.
#    Record 101 (old) is now record 100+1=101, shifted — you miss it.

# 2. PERFORMANCE: OFFSET N is slow at large N
#    SELECT * FROM payments ORDER BY created_at OFFSET 50000 LIMIT 100
#    The database must read and discard 50,000 rows to get to offset 50,000.
#    At page 1000 with limit 100, it discards 100,000 rows. Very slow.

# WHEN TO USE OFFSET:
# → Small datasets (< 100k records)
# → Static datasets that do not change during pagination
# → APIs that do not offer cursor pagination
# → When you need to jump to a specific page (e.g., page 50 of 100)`}</CodeBox>

        <SubTitle>Style 2 — Cursor pagination (keyset pagination)</SubTitle>

        <CodeBox label="Cursor pagination — the correct approach for large, live datasets">{`# Cursor pagination: API returns an opaque cursor representing your position.
# Next request sends the cursor, API returns the next page from that position.
# The cursor typically encodes the last record's ID or timestamp.

# ── HOW IT WORKS ──────────────────────────────────────────────────────────────
# Under the hood, cursor = base64({"id": "pay_xxxxxxxx", "ts": 1710633047})
# API executes: SELECT * FROM payments WHERE id > 'pay_xxxxxxxx' ORDER BY id LIMIT 100
# This is O(log n) via index seek — fast regardless of dataset size.

import json
from pathlib import Path

def fetch_all_cursor(
    url: str,
    headers: dict,
    params: dict,
    checkpoint_path: str | None = None,
) -> Iterator[dict]:
    """
    Fetch all records using cursor pagination.
    Saves checkpoint after each page — resumes safely on failure.
    """
    checkpoint = Path(checkpoint_path) if checkpoint_path else None
    cursor = None

    # Load previous checkpoint if it exists
    if checkpoint and checkpoint.exists():
        saved = json.loads(checkpoint.read_text())
        cursor = saved.get('cursor')
        print(f'Resuming from cursor: \${cursor[:20]}...' if cursor else 'Starting fresh')

    total_fetched = 0

    while True:
        request_params = {**params}
        if cursor:
            request_params['cursor'] = cursor   # or 'after', 'page_token', etc.

        response = requests.get(url, headers=headers, params=request_params, timeout=30)
        response.raise_for_status()
        data = response.json()

        items = data.get('items') or data.get('data') or []

        for item in items:
            yield item

        total_fetched += len(items)

        # Get next cursor — different APIs use different field names:
        cursor = (
            data.get('cursor') or
            data.get('next_cursor') or
            data.get('page_info', {}).get('end_cursor') or  # Shopify
            data.get('paging', {}).get('cursors', {}).get('after') or  # Facebook
            None
        )

        # Save checkpoint after each successful page
        if checkpoint and cursor:
            checkpoint.write_text(json.dumps({'cursor': cursor, 'fetched': total_fetched}))

        # Stop conditions:
        has_more = data.get('has_more') or data.get('has_next_page')
        if not cursor or not items or (has_more is False):
            break

        time.sleep(0.05)   # small delay between pages

    # Clean up checkpoint on successful completion
    if checkpoint and checkpoint.exists():
        checkpoint.unlink()

    print(f'Total fetched: \${total_fetched:,}')


# ── CURSOR PAGINATION ADVANTAGES ──────────────────────────────────────────────
# 1. No skipping: cursor points to a specific record, not a position
#    New inserts during pagination do not affect already-fetched pages
# 2. Performance: O(log n) index lookup vs O(n) offset scan
# 3. Resumable: save cursor after each page, resume after failure
# 4. Consistent: reads the same data even if pagination takes hours

# ── CURSOR LIMITATIONS ─────────────────────────────────────────────────────────
# Cannot jump to a specific page (no "page 50 of 100")
# Cursor is opaque — you cannot construct one yourself
# Cursor may expire after some time (check API docs for TTL)`}</CodeBox>

        <SubTitle>Style 3 — Link header / next URL</SubTitle>

        <CodeBox label="Next-URL pagination — following the Link header">{`# Some APIs (GitHub, many REST frameworks) return the next page URL
# directly in the response — either in the body or in the Link header.

# Link header format (RFC 5988):
# Link: <https://api.github.com/repos/org/repo/commits?page=2>; rel="next",
#       <https://api.github.com/repos/org/repo/commits?page=10>; rel="last"

import re

def parse_link_header(link_header: str | None) -> dict[str, str]:
    """Parse RFC 5988 Link header into a dict of {rel: url}."""
    if not link_header:
        return {}

    links = {}
    for match in re.finditer(r'<([^>]+)>;\s*rel="([^"]+)"', link_header):
        url, rel = match.group(1), match.group(2)
        links[rel] = url
    return links   # e.g. {'next': 'https://...', 'last': 'https://...'}


def fetch_all_next_url(
    start_url: str,
    headers: dict,
) -> Iterator[dict]:
    """Fetch all records by following next URLs from response."""
    url: str | None = start_url

    while url:
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()

        # Items may be in body or the response might BE the list:
        data = response.json()
        items = data if isinstance(data, list) else data.get('items', [])

        for item in items:
            yield item

        # Find next URL — check body first, then Link header:
        next_url_in_body = (
            data.get('next') if isinstance(data, dict) else None
        )

        if next_url_in_body:
            url = next_url_in_body
        else:
            # Check Link header:
            links = parse_link_header(response.headers.get('Link'))
            url = links.get('next')   # None if no more pages

        time.sleep(0.05)


# APIs that use next-URL pagination:
# GitHub API:     Link header with rel="next"
# Salesforce:     body: {"nextRecordsUrl": "/services/data/v57.0/query/..."}
# Django REST:    body: {"next": "http://api.example.com/items/?page=2"}
# DRF pagination: body: {"next": "...", "previous": "...", "results": [...]}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Rate Limiting ───────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Rate Limiting" />
        <SectionTitle>Rate Limiting — Staying Within API Quotas Without Failing</SectionTitle>

        <Para>
          Every production API imposes rate limits — caps on how many requests
          you can make per second, per minute, or per day. Exceeding them results
          in 429 Too Many Requests responses that block your pipeline. The correct
          approach to rate limiting is two-layered: proactive throttling that
          stays below the limit, and reactive handling that backs off correctly
          when a 429 is returned.
        </Para>

        <SubTitle>Reading rate limit headers</SubTitle>

        <CodeBox label="Rate limit headers — what they tell you and how to use them">{`# Most APIs communicate rate limit state via response headers.
# Header names vary by API — here are the most common patterns:

# Stripe / Stripe / SendGrid style:
response.headers['X-RateLimit-Limit']      # your total limit (e.g. 1000/min)
response.headers['X-RateLimit-Remaining']  # requests remaining this window
response.headers['X-RateLimit-Reset']      # Unix timestamp when window resets

# GitHub style:
response.headers['x-ratelimit-limit']      # same, lowercase
response.headers['x-ratelimit-used']       # requests used (not remaining)
response.headers['x-ratelimit-reset']      # reset timestamp

# Retry-After header (sent with 429 responses):
response.headers['Retry-After']            # seconds to wait (integer)
                                           # OR HTTP date string


def check_rate_limit_headers(response: requests.Response) -> None:
    """Log rate limit state from response headers."""
    limit     = response.headers.get('X-RateLimit-Limit')
    remaining = response.headers.get('X-RateLimit-Remaining')
    reset     = response.headers.get('X-RateLimit-Reset')

    if limit and remaining:
        pct_used = 100 * (1 - int(remaining) / int(limit))
        print(f'Rate limit: \${remaining}/\${limit} remaining (\${pct_used:.0f}% used)')

        # Proactive slowdown when approaching the limit:
        if int(remaining) < int(limit) * 0.1:   # less than 10% remaining
            if reset:
                wait = max(0, int(reset) - int(time.time()))
                print(f'Approaching rate limit — waiting \${wait}s for window reset')
                time.sleep(wait + 1)


def handle_rate_limit_response(response: requests.Response) -> float:
    """
    Extract the wait time from a 429 response.
    Returns seconds to wait before retrying.
    """
    retry_after = response.headers.get('Retry-After')

    if retry_after:
        try:
            # Integer: seconds to wait
            return float(retry_after)
        except ValueError:
            # HTTP date string: parse it
            from email.utils import parsedate_to_datetime
            retry_dt = parsedate_to_datetime(retry_after)
            return max(0, (retry_dt - datetime.now(timezone.utc)).total_seconds())

    # No Retry-After header — use exponential backoff:
    return 5.0   # default minimum wait`}</CodeBox>

        <SubTitle>Proactive rate limiting — the token bucket approach</SubTitle>

        <CodeBox label="Token bucket rate limiter — proactive throttling before hitting the limit">{`import time
import threading

class TokenBucketRateLimiter:
    """
    Token bucket rate limiter for API calls.

    Theory: a bucket holds up to 'capacity' tokens.
    Tokens are added at 'rate' per second.
    Each API call consumes one token.
    If no tokens are available, wait until one is added.

    This smooths out request bursts and prevents hitting the API's own limits.
    """

    def __init__(self, calls_per_second: float, burst_size: int | None = None):
        self.rate     = calls_per_second
        self.capacity = burst_size or int(calls_per_second)
        self.tokens   = float(self.capacity)
        self.last_refill = time.monotonic()
        self._lock    = threading.Lock()

    def _refill(self) -> None:
        now = time.monotonic()
        elapsed = now - self.last_refill
        self.tokens = min(self.capacity, self.tokens + elapsed * self.rate)
        self.last_refill = now

    def acquire(self) -> None:
        """Block until a token is available."""
        while True:
            with self._lock:
                self._refill()
                if self.tokens >= 1.0:
                    self.tokens -= 1.0
                    return
            # Not enough tokens — sleep a bit and try again
            time.sleep(1.0 / self.rate / 2)


# Practical rate limiter for common API limits:
class APIRateLimiter:
    """Combined proactive + reactive rate limiting."""

    def __init__(
        self,
        calls_per_second: float = 10.0,
        calls_per_minute: int   = 500,
        max_retries: int        = 5,
    ):
        self.per_second = TokenBucketRateLimiter(calls_per_second)
        self.per_minute = TokenBucketRateLimiter(calls_per_minute / 60.0, burst_size=calls_per_minute)
        self.max_retries = max_retries

    def call(self, func, *args, **kwargs):
        """Call a function with rate limiting and retry on 429."""
        for attempt in range(1, self.max_retries + 1):
            self.per_second.acquire()
            self.per_minute.acquire()

            try:
                response = func(*args, **kwargs)

                if response.status_code == 200:
                    check_rate_limit_headers(response)
                    return response

                elif response.status_code == 429:
                    wait = handle_rate_limit_response(response)
                    # Add jitter: random fraction of the wait time
                    wait *= (0.8 + 0.4 * __import__('random').random())
                    print(f'Rate limited (attempt \${attempt}/\${self.max_retries}). Waiting \${wait:.1f}s')
                    time.sleep(wait)
                    continue

                elif response.status_code in (500, 502, 503, 504):
                    wait = min(60, 2 ** attempt)
                    print(f'Server error \${response.status_code} (attempt \${attempt}). Waiting \${wait}s')
                    time.sleep(wait)
                    continue

                else:
                    response.raise_for_status()

            except requests.exceptions.Timeout:
                wait = min(30, 2 ** attempt)
                print(f'Timeout (attempt \${attempt}). Waiting \${wait}s')
                time.sleep(wait)

        raise RuntimeError(f'All \${self.max_retries} attempts failed')


# Usage — wrap your API calls with the rate limiter:
limiter = APIRateLimiter(
    calls_per_second=8,    # stay under 10/s limit
    calls_per_minute=450,  # stay under 500/min limit
)

response = limiter.call(
    requests.get,
    'https://api.razorpay.com/v1/payments',
    auth=HTTPBasicAuth(KEY_ID, KEY_SECRET),
    params={'from': from_ts, 'to': to_ts, 'count': 100},
    timeout=30,
)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — Webhooks vs Polling ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Webhooks vs Polling" />
        <SectionTitle>Webhooks vs Polling — When to Use Each and How to Use Both Reliably</SectionTitle>

        <Para>
          Polling means your pipeline regularly asks an API "do you have new data?"
          Webhooks mean the API calls your endpoint when new data is available.
          Both patterns are in widespread use and serve different needs. A data
          engineer must know which to use for each situation and how to implement
          both reliably.
        </Para>

        <CompareTable
          headers={[
            { label: 'Dimension' },
            { label: 'Polling', color: '#7b61ff' },
            { label: 'Webhooks', color: '#00e676' },
          ]}
          keys={['dim', 'polling', 'webhooks']}
          rows={[
            { dim: 'How it works', polling: 'Your pipeline calls the API on a schedule, fetches new records since last run', webhooks: 'API sends HTTP POST to your endpoint when an event occurs' },
            { dim: 'Latency', polling: 'Depends on poll interval — minutes to hours', webhooks: 'Near-real-time — seconds after the event' },
            { dim: 'API load', polling: 'Repeated calls regardless of whether data changed', webhooks: 'API calls you only when there is something to send' },
            { dim: 'Implementation effort', polling: 'Simple — a scheduled Python script', webhooks: 'Requires a publicly accessible HTTPS endpoint' },
            { dim: 'Reliability', polling: 'Reliable — you control when you pull', webhooks: 'Delivery not guaranteed — must handle retries from provider and missing events' },
            { dim: 'Good for', polling: 'Batch pipelines, simple scheduled ingestion, APIs that do not offer webhooks', webhooks: 'Real-time event processing, payment notifications, order status updates' },
            { dim: 'Bad for', polling: 'High-frequency events (too much polling), APIs with strict rate limits', webhooks: 'Bulk historical backfill, simple infrastructure that cannot expose HTTPS endpoints' },
          ]}
        />

        <SubTitle>Reliable webhook handling</SubTitle>

        <CodeBox label="Production webhook receiver — security, idempotency, async processing">{`# A production webhook handler has four requirements:
# 1. Verify the signature (security)
# 2. Respond 200 immediately (reliability)
# 3. Process asynchronously (performance)
# 4. Handle duplicates idempotently (correctness)

# FastAPI webhook endpoint:
from fastapi import FastAPI, Request, HTTPException, BackgroundTasks
import hmac, hashlib, json
from datetime import datetime, timezone

app = FastAPI()

# In-memory set for deduplication (use Redis in production):
processed_event_ids: set[str] = set()

def verify_signature(body: bytes, signature: str, secret: str) -> bool:
    """Verify HMAC-SHA256 webhook signature."""
    expected = 'sha256=' + hmac.new(
        secret.encode(),
        body,
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, signature)


def process_event(event: dict) -> None:
    """Background task — actual processing happens here."""
    event_type = event.get('event')
    payload    = event.get('payload', {})

    if event_type == 'payment.captured':
        payment = payload.get('payment', {}).get('entity', {})
        # Write to database, publish to Kafka, etc.
        write_payment_to_db(payment)

    elif event_type == 'order.paid':
        order = payload.get('order', {}).get('entity', {})
        update_order_status(order)

    else:
        print(f'Unhandled event type: \${event_type}')


@app.post('/webhooks/razorpay')
async def razorpay_webhook(
    request: Request,
    background_tasks: BackgroundTasks,
):
    body = await request.body()

    # ── 1. VERIFY SIGNATURE ────────────────────────────────────────────────────
    signature = request.headers.get('X-Stripe-Signature', '')
    if not verify_signature(body, signature, RAZORPAY_WEBHOOK_SECRET):
        raise HTTPException(status_code=401, detail='Invalid signature')

    event = json.loads(body)

    # ── 2. RESPOND 200 IMMEDIATELY ─────────────────────────────────────────────
    # Webhook providers retry if they do not get 200 quickly.
    # Do not wait for processing to complete before returning.
    # If processing takes 10 seconds and the provider times out at 5s,
    # you will receive the same event multiple times.

    # ── 3. IDEMPOTENCY CHECK ───────────────────────────────────────────────────
    event_id = event.get('account_id', '') + ':' + event.get('payload', {}).get('payment', {}).get('entity', {}).get('id', '')
    if event_id in processed_event_ids:
        return {'status': 'already_processed'}   # still return 200

    processed_event_ids.add(event_id)

    # ── 4. PROCESS IN BACKGROUND ───────────────────────────────────────────────
    background_tasks.add_task(process_event, event)

    return {'status': 'accepted'}   # return 200 immediately


# PRODUCTION CONSIDERATIONS FOR WEBHOOKS:
# - Use Redis SET with NX (set if not exists) for distributed idempotency
# - Store events in a queue (Kafka, SQS, RabbitMQ) before processing
# - Log every received event with timestamp and event_id before processing
# - Monitor webhook delivery: most providers show delivery success rates
# - Implement a reconciliation job that polls the API to catch missed webhooks
# - Set up alerting if webhook delivery rate drops below 95%`}</CodeBox>

        <SubTitle>The hybrid pattern — webhooks plus periodic reconciliation</SubTitle>

        <Para>
          Webhooks are not guaranteed to be delivered. Providers retry on failure,
          but if your server was down during the retry window, events are lost.
          The production-grade pattern uses webhooks for low-latency event
          processing combined with periodic polling to reconcile any gaps.
        </Para>

        <CodeBox label="Hybrid pattern — webhook primary, polling for gap reconciliation">{`# Primary path: webhook receives events in near-real-time
# Reconciliation path: hourly poll fills in any missed events

# Reconciliation job (runs every hour):
def reconcile_missed_payments(lookback_hours: int = 2) -> int:
    """
    Fetch all payments from the last N hours and upsert them.
    Catches any webhook deliveries that failed.
    """
    from_ts = int(time.time()) - (lookback_hours * 3600)
    to_ts   = int(time.time())

    fetched = upserted = 0

    for payment in fetch_all_cursor(
        url     = 'https://api.razorpay.com/v1/payments',
        headers = auth_header(),
        params  = {'from': from_ts, 'to': to_ts, 'count': 100},
    ):
        fetched += 1
        # Upsert: update if exists, insert if new
        was_new = upsert_payment(payment)
        if was_new:
            upserted += 1

    print(f'Reconciliation: fetched=\${fetched}, new=\${upserted}')
    return upserted


# Schedule with cron:
# 0 * * * * python3 /pipelines/reconcile_payments.py

# This pattern guarantees:
# - Low latency for most events (webhook path)
# - 100% completeness (reconciliation catches missed webhooks)
# - At-most-once processing per event (upsert idempotency)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — API Schema Challenges ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Schema Challenges" />
        <SectionTitle>API Schema Challenges — Versioning, Breaking Changes, and Optional Fields</SectionTitle>

        <Para>
          APIs change over time. Providers add fields, rename things, change types,
          and deprecate endpoints. A data pipeline that works perfectly today can
          break silently next month when a vendor ships a new API version.
          Understanding how to handle API evolution defensively is what separates
          fragile pipelines from robust ones.
        </Para>

        <SubTitle>API versioning — what each strategy means for your pipeline</SubTitle>

        <CompareTable
          headers={[
            { label: 'Strategy' },
            { label: 'How it looks', color: '#00e676' },
            { label: 'Impact on pipelines', color: '#f97316' },
          ]}
          keys={['strategy', 'looks', 'impact']}
          rows={[
            { strategy: 'URL versioning', looks: '/v1/payments, /v2/payments', impact: 'Old URL keeps working until explicitly deprecated. You control when to migrate. Most common and most DE-friendly.' },
            { strategy: 'Header versioning', looks: 'API-Version: 2026-03-01', impact: 'Must send version header on every request. If omitted, gets default (may change). Always specify explicitly.' },
            { strategy: 'Query param versioning', looks: '?version=2', impact: 'Easy to forget. Parameter is in URL logs. Otherwise similar to URL versioning.' },
            { strategy: 'No versioning (semver)', looks: 'Single URL, changes are "backward compatible"', impact: 'Most dangerous for pipelines. Provider may add fields (safe) or change types (breaking). Monitor API changelogs.' },
          ]}
        />

        <SubTitle>Writing defensive code that handles API changes gracefully</SubTitle>

        <CodeBox label="Defensive API parsing — handling optional fields and type changes">{`# ── PRINCIPLE: be liberal in what you accept ──────────────────────────────────
# Do not assume a field exists. Do not assume a field has the same type forever.
# Write code that handles the common variations without crashing.

from decimal import Decimal, InvalidOperation
from datetime import datetime, timezone
from typing import Any

def safe_get(obj: dict, *keys: str, default=None) -> Any:
    """Safely navigate a nested dict without KeyError."""
    for key in keys:
        if not isinstance(obj, dict):
            return default
        obj = obj.get(key, default)
        if obj is default:
            return default
    return obj


def parse_amount(raw: Any) -> Decimal | None:
    """
    Parse monetary amount from various formats APIs use:
    - Integer paise: 38000 (Stripe)
    - Float rupees:  380.00
    - String:        "380.00" or "380,00" (European comma)
    - None/missing:  return None
    """
    if raw is None:
        return None
    try:
        if isinstance(raw, int):
            return Decimal(raw) / 100    # paise to rupees
        raw_str = str(raw).replace(',', '.')  # normalise European comma
        return Decimal(raw_str)
    except InvalidOperation:
        return None


def parse_timestamp(raw: Any) -> datetime | None:
    """
    Parse timestamp from various formats:
    - Unix seconds: 1710633047
    - Unix milliseconds: 1710633047000
    - ISO 8601: "2026-03-17T20:14:32+05:30"
    - Date only: "2026-03-17"
    """
    if raw is None:
        return None
    try:
        if isinstance(raw, (int, float)):
            # Detect milliseconds vs seconds
            ts = raw / 1000 if raw > 1e10 else raw
            return datetime.fromtimestamp(ts, tz=timezone.utc)
        if isinstance(raw, str):
            if 'T' in raw or '+' in raw or 'Z' in raw:
                return datetime.fromisoformat(raw.replace('Z', '+00:00'))
            # Date-only
            return datetime.strptime(raw, '%Y-%m-%d').replace(tzinfo=timezone.utc)
    except (ValueError, OSError):
        return None
    return None


def parse_payment(raw: dict) -> dict:
    """
    Parse a raw API payment record defensively.
    Handles field renames, type changes, and optional fields across API versions.
    """
    return {
        # Primary field with fallback to old field name:
        'payment_id':   raw.get('id') or raw.get('payment_id'),

        # Amount: handle int (paise) or float (rupees) or string:
        'amount':       parse_amount(raw.get('amount')),

        # Currency: default to INR if missing:
        'currency':     raw.get('currency', 'INR'),

        # Status: normalise to lowercase:
        'status':       (raw.get('status') or '').lower() or None,

        # Nested field with safe navigation:
        'method':       safe_get(raw, 'method') or safe_get(raw, 'payment_method', 'type'),

        # Timestamp: handle multiple formats:
        'created_at':   parse_timestamp(raw.get('created_at') or raw.get('created')),
        'captured_at':  parse_timestamp(raw.get('captured_at')),

        # Optional fields: None if missing:
        'vpa':          raw.get('vpa') or raw.get('upi_id'),
        'bank':         raw.get('bank'),
        'wallet':       raw.get('wallet'),
        'description':  raw.get('description') or raw.get('notes', {}).get('description'),

        # Preserve unknown fields for debugging (do not silently discard):
        '_raw':         raw,
    }


# ── MONITORING FOR API CHANGES ────────────────────────────────────────────────
def detect_schema_changes(sample: list[dict], expected_fields: set[str]) -> None:
    """
    Detect when the API starts returning unexpected new fields.
    Log a warning so engineers can decide whether to capture them.
    """
    if not sample:
        return

    all_fields = set()
    for record in sample:
        all_fields.update(record.keys())

    new_fields = all_fields - expected_fields
    missing_fields = expected_fields - all_fields

    if new_fields:
        print(f'WARNING: API returning new fields not in schema: \${new_fields}')
        # Alert: consider whether these fields contain useful data

    if missing_fields:
        print(f'WARNING: Expected fields missing from API response: \${missing_fields}')
        # Alert: API may have renamed or removed fields`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Complete Ingestion Pipeline Design ──────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Production Pipeline Design" />
        <SectionTitle>Designing a Production-Grade API Ingestion Pipeline</SectionTitle>

        <Para>
          The individual skills — authentication, pagination, rate limiting —
          combine into a coherent pipeline design. A production API ingestion
          pipeline has five architectural properties: it is idempotent (safe to
          rerun), resumable (survives failures mid-run), observable (logs its
          state clearly), defensive (handles API changes without crashing), and
          respectful (stays within rate limits without hammering the API).
        </Para>

        <CodeBox label="Complete production API ingestion pipeline — all patterns combined">{`"""
FreshCart Payment Gateway Ingestion Pipeline
Fetches payments from payment API → validates → upserts to PostgreSQL
Architecture: idempotent, resumable, rate-limited, defensive
"""

import os, json, time, logging, uuid
from decimal import Decimal
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import Iterator

import requests
from requests.auth import HTTPBasicAuth
import psycopg2
from psycopg2.extras import execute_values

# ── Configuration ──────────────────────────────────────────────────────────────
API_BASE       = 'https://api.payment-gateway.example.com/v1'
KEY_ID         = os.environ['GATEWAY_KEY_ID']
KEY_SECRET     = os.environ['GATEWAY_KEY_SECRET']
DB_URL         = os.environ['DATABASE_URL']
CHECKPOINT_DIR = Path('/data/checkpoints')
DLQ_PATH       = Path('/data/dlq/payments.ndjson')
RUN_ID         = str(uuid.uuid4())

CHECKPOINT_DIR.mkdir(parents=True, exist_ok=True)
DLQ_PATH.parent.mkdir(parents=True, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format=f'{{"ts":"%(asctime)s","level":"%(levelname)s","run_id":"{RUN_ID}","msg":"%(message)s"}}',
)
log = logging.getLogger('payment_ingestion')


# ── Rate limiter ───────────────────────────────────────────────────────────────
class SimpleRateLimiter:
    def __init__(self, rps: float):
        self.interval = 1.0 / rps
        self.last     = 0.0

    def wait(self):
        now     = time.monotonic()
        elapsed = now - self.last
        if elapsed < self.interval:
            time.sleep(self.interval - elapsed)
        self.last = time.monotonic()

limiter = SimpleRateLimiter(rps=8.0)  # 8 req/s, API limit is 10


# ── Fetch with retry and rate limiting ────────────────────────────────────────
def api_get(path: str, params: dict, max_retries: int = 5) -> dict:
    """Make an authenticated GET request with retry logic."""
    url = f'\${API_BASE}\${path}'

    for attempt in range(1, max_retries + 1):
        limiter.wait()   # proactive rate limiting
        try:
            resp = requests.get(
                url,
                auth=HTTPBasicAuth(KEY_ID, KEY_SECRET),
                params=params,
                timeout=30,
            )

            if resp.status_code == 200:
                return resp.json()

            elif resp.status_code == 429:
                wait = float(resp.headers.get('Retry-After', 2 ** attempt))
                log.warning('Rate limited. Waiting %.1fs (attempt \${d}/\${d})', wait, attempt, max_retries)
                time.sleep(wait)

            elif resp.status_code in (500, 502, 503, 504):
                wait = min(60, 2 ** attempt)
                log.warning('Server error \${d}. Waiting %.1fs', resp.status_code, wait)
                time.sleep(wait)

            else:
                resp.raise_for_status()   # 4xx — do not retry

        except requests.exceptions.Timeout:
            wait = min(30, 2 ** attempt)
            log.warning('Timeout (attempt \${d}/\${d}). Waiting %.1fs', attempt, max_retries, wait)
            time.sleep(wait)

    raise RuntimeError(f'API call failed after \${max_retries} attempts')


# ── Paginated fetch with checkpoint ───────────────────────────────────────────
def fetch_payments(from_ts: int, to_ts: int) -> Iterator[dict]:
    """Fetch all payments in time range with cursor checkpointing."""
    checkpoint_file = CHECKPOINT_DIR / f'payments_\${from_ts}_\${to_ts}.json'
    cursor = None

    if checkpoint_file.exists():
        saved = json.loads(checkpoint_file.read_text())
        cursor = saved.get('cursor')
        log.info('Resuming fetch from checkpoint cursor')

    pages = 0
    while True:
        params = {'from': from_ts, 'to': to_ts, 'count': 100}
        if cursor:
            params['cursor'] = cursor

        data   = api_get('/payments', params)
        items  = data.get('items', [])
        pages += 1

        log.info('Page \${d}: \${d} payments', pages, len(items))
        for item in items:
            yield item

        cursor = data.get('cursor')
        if cursor:
            checkpoint_file.write_text(json.dumps({'cursor': cursor}))

        if not cursor or not items:
            break

    checkpoint_file.unlink(missing_ok=True)


# ── Parse defensively ─────────────────────────────────────────────────────────
def parse_payment(raw: dict) -> dict | None:
    try:
        amount_raw = raw.get('amount')
        amount = Decimal(str(amount_raw)) / 100 if isinstance(amount_raw, int) else \
                 Decimal(str(amount_raw)) if amount_raw is not None else None

        if amount is None or amount < 0:
            raise ValueError(f'Invalid amount: \${amount_raw}')

        ts_raw = raw.get('created_at')
        created_at = datetime.fromtimestamp(ts_raw / 1000 if ts_raw > 1e10 else ts_raw,
                                             tz=timezone.utc) if ts_raw else None

        return {
            'payment_id': raw['id'],
            'amount':     amount,
            'currency':   raw.get('currency', 'INR'),
            'status':     (raw.get('status') or '').lower(),
            'method':     raw.get('method'),
            'created_at': created_at,
        }
    except Exception as e:
        with open(DLQ_PATH, 'a') as f:
            f.write(json.dumps({'error': str(e), 'record': raw}) + '\n')
        log.warning('Record sent to DLQ: \${s}', str(e))
        return None


# ── Upsert batch ──────────────────────────────────────────────────────────────
def upsert_batch(records: list[dict], conn) -> int:
    rows = [
        (r['payment_id'], float(r['amount']), r['currency'],
         r['status'], r['method'], r['created_at'])
        for r in records
    ]
    with conn.cursor() as cur:
        execute_values(cur, """
            INSERT INTO silver.payments
                (payment_id, amount, currency, status, method, created_at)
            VALUES %s
            ON CONFLICT (payment_id) DO UPDATE SET
                status     = EXCLUDED.status,
                amount     = EXCLUDED.amount,
                updated_at = NOW()
        """, rows)
    conn.commit()
    return len(rows)


# ── Main ───────────────────────────────────────────────────────────────────────
def run(run_date: str) -> None:
    log.info('Pipeline started for date: \${s}', run_date)
    dt = datetime.strptime(run_date, '%Y-%m-%d').replace(tzinfo=timezone.utc)
    from_ts = int(dt.timestamp())
    to_ts   = int((dt + timedelta(days=1)).timestamp())

    loaded = skipped = 0
    batch: list[dict] = []

    with psycopg2.connect(DB_URL) as conn:
        for raw in fetch_payments(from_ts, to_ts):
            parsed = parse_payment(raw)
            if parsed is None:
                skipped += 1
                continue

            batch.append(parsed)
            if len(batch) >= 5000:
                loaded += upsert_batch(batch, conn)
                log.info('Batch upserted: total=\${d}', loaded)
                batch = []

        if batch:
            loaded += upsert_batch(batch, conn)

    log.info('Pipeline complete: loaded=\${d} skipped=\${d}', loaded, skipped)


if __name__ == '__main__':
    import sys
    run(sys.argv[1] if len(sys.argv) > 1 else
        (datetime.now(timezone.utc) - timedelta(days=1)).strftime('%Y-%m-%d'))`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 09 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Onboarding a New Vendor API — From Documentation to Production</SectionTitle>

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
            Scenario — FreshCart · Onboarding a new logistics API
          </div>

          <Para>
            FreshCart has just signed with a new last-mile delivery partner,
            ShipFast. You are asked to build a pipeline that ingests daily
            delivery performance data from ShipFast's API into the warehouse.
            Here is the actual process a senior data engineer follows.
          </Para>

          <Para>
            <strong>Step 1 — Read the documentation with a DE lens.</strong> The
            first things you look for: authentication method (API key in header —
            simple), rate limits (500 requests per minute — comfortable), pagination
            style (cursor-based — good), available endpoints (deliveries, routes,
            agents), and whether they offer webhooks (yes, for status changes).
          </Para>

          <Para>
            <strong>Step 2 — Test with curl before writing any code.</strong>
          </Para>

          <CodeBox label="Manual API exploration before building the pipeline">{`# First test: can we authenticate and get any data?
curl -s -H "X-API-Key: \${SHIPFAST_API_KEY}" \
     "https://api.shipfast.io/v2/deliveries?date=2026-03-17&limit=5" \
     | python3 -m json.tool

# Output reveals the data structure:
# {
#   "data": [...],
#   "pagination": {
#     "cursor": "eyJpZCI6MTI...",
#     "has_more": true,
#     "total": 48234
#   }
# }

# Second test: what does a delivery record look like?
# Note the field names and types — write them down before coding

# Third test: check rate limit headers on the response:
curl -s -I -H "X-API-Key: \${SHIPFAST_API_KEY}" \
     "https://api.shipfast.io/v2/deliveries?date=2026-03-17&limit=1" \
     | grep -i "x-rate"
# X-RateLimit-Limit: 500
# X-RateLimit-Remaining: 499
# X-RateLimit-Reset: 1710720060`}</CodeBox>

          <Para>
            <strong>Step 3 — Identify the data quality risks.</strong> The delivery
            records have an <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>amount</code> field
            that is sometimes an integer (paise) and sometimes a float (rupees) depending
            on whether the delivery had COD. There is a{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>delivered_at</code> field
            that is null for undelivered orders. The{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>agent_id</code> field
            refers to ShipFast's internal agent IDs, not FreshCart's. These are the
            three things you handle defensively in the parser.
          </Para>

          <Para>
            <strong>Step 4 — Build, test with a small date range, verify counts.</strong>
            Run the pipeline for one day, compare the count returned by the API's{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>total</code> field
            against the rows written to the database. They must match. Any discrepancy
            means your pagination logic has a bug or your parser is silently dropping records.
          </Para>

          <Para>
            <strong>Step 5 — Backfill historical data.</strong> ShipFast has data
            from 90 days ago. Run the pipeline with a date range loop, one day at a
            time, with checkpointing so if it fails on day 47 it resumes from day 47.
          </Para>

          <Para>
            <strong>Step 6 — Set up webhooks for real-time status updates.</strong>
            Register your endpoint URL in the ShipFast dashboard. Implement the
            signature verification, the idempotency check, and the background
            processor. Schedule the hourly reconciliation job to catch any missed
            webhook deliveries.
          </Para>

          <Para>
            Total time from task assignment to production: typically two days for
            a straightforward API. The framework above covers every step — the
            patterns do not change, only the specific field names and endpoint URLs.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is the difference between cursor pagination and offset pagination? When would you use each?',
            a: `Offset pagination specifies where to start in a result set by a number: give me 100 records starting from position 500. The API executes this as a database query with LIMIT and OFFSET, which requires the database to read and skip over the first 500 rows before returning the 100 you need. At small scales this is fast. At large scales — offset 50,000 in a table of 10 million rows — the database must scan 50,000 rows just to discard them, making deep pages slow.

The more critical problem with offset pagination is correctness. If new records are inserted into the dataset while you are paginating, the offsets shift. Records that were at position 100 are now at position 101. Your page 2 request, which asks for rows 101-200, skips the record that shifted into position 100. Data engineers using offset pagination on live, changing datasets frequently miss records or see duplicates in the output.

Cursor pagination returns an opaque cursor (usually encoding the ID or timestamp of the last returned record) alongside each page. The next request sends this cursor back, and the API executes a query like SELECT * FROM deliveries WHERE id > cursor_value ORDER BY id LIMIT 100. This is an index range scan — O(log n) regardless of how deep into the dataset you are. New records do not affect already-fetched pages because the cursor points to a specific record, not a position.

Use offset pagination for small static datasets where simplicity matters more than performance, or when the API does not offer cursor pagination. Use cursor pagination for everything else — large datasets, live changing data, and any dataset where you need reliable resumability after a failure. Cursor-based pagination is the correct default choice for production API ingestion.`,
          },
          {
            q: 'Q2. An API you are ingesting from starts returning 429 responses. Walk me through your handling strategy.',
            a: `A 429 response means rate limit exceeded — the API will not serve your requests until you slow down. My handling has three layers.

The first response to a 429 is to read the Retry-After header. Most production APIs include this header on 429 responses, specifying exactly how many seconds to wait before the rate limit window resets. I extract this value, add a small random jitter of 10-20% to avoid synchronised retries across multiple pipeline instances, and sleep for that duration before retrying the exact same request.

If there is no Retry-After header, I fall back to exponential backoff: wait 2 seconds after the first 429, 4 seconds after the second, 8 seconds after the third, up to a maximum of 60 seconds. I add jitter to each wait to prevent the thundering herd problem where all retrying clients resume simultaneously.

The second layer is proactive rate limiting before hitting the limit at all. I check the X-RateLimit-Remaining header on every successful response. When remaining requests drop below 10% of the limit, I proactively slow down — either by increasing the sleep time between requests or by pausing entirely until the window resets according to X-RateLimit-Reset. This prevents 429s from occurring rather than just handling them reactively.

The third layer is monitoring and alerting. If 429s are occurring frequently, it means my pipeline's default pace is too fast for the API's limits. I would permanently reduce the requests-per-second target in my rate limiter configuration. Frequent 429s also suggest my pipeline may be competing with other users of the same API key, which would require coordinating rate limits across instances.`,
          },
          {
            q: 'Q3. How do you verify the authenticity of incoming webhooks and why is this important?',
            a: `Webhook authenticity verification is essential because your webhook endpoint is a public HTTPS URL that anyone on the internet can send requests to. Without verification, a malicious actor could send fake payment confirmation webhooks to your endpoint, causing your pipeline to process orders that were never actually paid for or triggering other business actions based on fraudulent data.

Most webhook providers use HMAC-SHA256 signatures. The provider computes a signature by hashing the raw request body using a shared secret key (which only you and the provider know) and a specific algorithm. They include this signature in a request header — Stripe uses Stripe-Signature, Stripe uses X-Stripe-Signature, Shopify uses X-Shopify-Hmac-Sha256.

To verify the webhook: read the raw request body as bytes (before any JSON parsing), read the signature from the header, compute the expected HMAC signature using the same algorithm (HMAC-SHA256) with your secret key and the raw body, and compare the expected signature to the received one.

There is one critical implementation detail: use hmac.compare_digest for the comparison, not a simple equality check. A naive string comparison exits early when it finds the first non-matching character, which leaks information about how much of the signature matched through timing differences. hmac.compare_digest always takes the same time regardless of where the strings differ, preventing timing attacks.

If the signature does not match, return HTTP 401 immediately without processing the payload. Never skip verification in production — the performance cost is negligible (one HMAC computation per request) and the security benefit is significant.`,
          },
          {
            q: 'Q4. How would you design an API ingestion pipeline to be idempotent?',
            a: `An idempotent pipeline produces the same result whether it runs once or a hundred times against the same input. This property is essential for data pipelines because failures and reruns are not exceptional — they are expected operational events.

Idempotency in an API ingestion pipeline has three components.

The first is idempotent writes. Instead of INSERT, use upsert operations: INSERT ... ON CONFLICT (unique_key) DO UPDATE. This ensures that re-inserting a record that already exists updates it to the correct state rather than creating a duplicate. The unique key is the API's own identifier for the record — payment_id, order_id, event_id. Every table in the pipeline should have a UNIQUE constraint on this business key.

The second is idempotent extraction. For time-based incremental extraction, always use a fixed time window determined by the run date parameter rather than relative windows like "last 24 hours." Relative windows change their meaning depending on when the pipeline runs — a retry at 2 PM fetches different data than the original run at 6 AM. Fixed windows like "date=2026-03-17 means from midnight to midnight UTC" fetch the same data every time they are run for the same date.

The third is checkpoint-based resumability. For large paginated extractions, save the cursor position after each successfully processed page. On failure, restart from the last saved cursor rather than from the beginning. This means a pipeline that processes 500 of 1,000 pages before failing will resume from page 500 on the next run, not re-process pages 1-499 again. While the upsert semantics would handle re-processing correctly, avoiding it is more efficient.`,
          },
          {
            q: 'Q5. What is OAuth 2.0 and when would a data pipeline use it instead of a simple API key?',
            a: `OAuth 2.0 is an authorisation framework that allows an application to obtain limited access to data in another service without directly handling that service's user credentials. Instead of sharing a password, OAuth provides a time-limited access token that represents a specific set of permissions.

A data pipeline uses OAuth 2.0 instead of a simple API key in two scenarios.

The first is when accessing user-specific data in a third-party platform. Salesforce, Google Analytics, HubSpot, and QuickBooks all require OAuth because the data belongs to a specific user's account and the platform needs explicit user consent before your pipeline can access it. The user authorises your pipeline through a browser flow, the platform issues a refresh token that your pipeline stores securely, and your pipeline uses the refresh token to obtain short-lived access tokens automatically. A simple API key cannot work here because these platforms have no concept of a static key that accesses one user's account.

The second is for server-to-server authorisation using the Client Credentials grant. When your pipeline accesses your own organisation's Google Cloud APIs, internal company APIs, or Salesforce connected apps configured for automated access, the Client Credentials flow issues tokens without user interaction. Your pipeline authenticates with a client ID and client secret, receives a short-lived access token, and includes it in API requests. This is more secure than a long-lived API key because the token expires quickly — typically in one hour — and a compromised token cannot be used for long.

The practical difference in implementation: API key pipelines send the same static string with every request forever. OAuth pipelines must periodically obtain new access tokens as old ones expire, which requires storing the refresh token securely and building token refresh logic into the pipeline. This is more complexity but required when the API mandates it.`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
              {item.a}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 — after response.json() on what should be a JSON API`,
            cause: 'The API returned a non-JSON response. Common causes: a 429 or 5xx error with an HTML error page as the body, a maintenance page intercepted by a CDN, a redirect to a login page when the session expired, or a network proxy returning its own error message. The response looked like a success at the network level but the body is not JSON.',
            fix: 'Always check response.status_code before calling response.json(). Use response.raise_for_status() to raise an exception for 4xx/5xx before attempting JSON parse. Add a defensive try/except: try: data = response.json() except ValueError: logger.error("Non-JSON response body: %s", response.text[:500]); raise. Log the raw response text on failure — it often contains the actual error message from a proxy or CDN.',
          },
          {
            error: `Pagination returns duplicate records — the same payment_id appears twice in the ingested data`,
            cause: 'Most likely caused by offset pagination on a live dataset. New records were inserted into the API\'s database between page 1 and page 2, shifting the offset. A record that was at position 100 is now at position 101. When page 2 requests offset=100, it receives the shifted record again. Alternatively, a cursor was not saved correctly and a page was fetched twice after a retry.',
            fix: 'Switch to cursor pagination if the API supports it — cursors are stable regardless of insertions. If offset pagination is unavoidable, add a UNIQUE constraint on payment_id in the destination table and use ON CONFLICT DO UPDATE (upsert). Duplicates from offset drift become idempotent updates rather than duplicate rows. Add deduplication in the Silver transformation layer as a safety net.',
          },
          {
            error: `requests.exceptions.SSLError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed — when calling an internal API`,
            cause: 'The API server is using a self-signed SSL certificate or an internal CA certificate that is not in Python\'s trusted certificate store. This commonly occurs with internal APIs running behind a corporate proxy or in a private network environment using an internal PKI.',
            fix: 'For internal APIs with corporate CA certificates: obtain the CA certificate file from your IT team and pass it: requests.get(url, verify="/path/to/corporate-ca-bundle.crt"). For development with a known-safe self-signed cert: requests.get(url, verify=False) — but add a warning because this disables all SSL verification and should never be used in production. The correct production fix is always to install the proper CA certificate. Never set verify=False in production code.',
          },
          {
            error: `Pipeline produces different row counts on reruns — 48,234 on first run, 48,891 on second run for the same date`,
            cause: 'The pipeline uses a relative time window ("last 24 hours") rather than a fixed date window. The two runs executed at different times, so "last 24 hours" covers different time ranges. Additionally, late-arriving data at the API (payments that were processed after midnight but timestamped before midnight) may appear in a later run but not the first.',
            fix: 'Always use a fixed, deterministic time window for each pipeline run: "date=2026-03-17 means from 2026-03-17T00:00:00Z to 2026-03-18T00:00:00Z." Pass the date as a parameter, compute the exact timestamp boundaries in the code, and always use those same boundaries regardless of when the pipeline runs. For late-arriving data: run the pipeline with a 6–12 hour delay after the period ends (the 2026-03-17 run executes at 06:00 on 2026-03-18) and use upserts so late-arriving records update existing rows correctly.',
          },
          {
            error: `Webhook events being processed multiple times — the same payment.captured event creates duplicate records`,
            cause: 'The webhook provider is retrying delivery because your endpoint took too long to respond and timed out. Most webhook providers retry if they do not receive a 200 response within 5–10 seconds. If your handler does processing synchronously (database writes, external API calls) that takes more than the timeout, the provider retries while the first processing is still running. Both runs complete, creating duplicates.',
            fix: 'Return HTTP 200 immediately upon receiving the webhook, before doing any processing. Store the raw event in a queue (database table, Redis, SQS) and process asynchronously in a background task. Add idempotency: before processing any event, check whether its event_id has already been processed (using a processed_events table or a Redis SET). If already processed, return 200 without processing again. Use hmac.compare_digest for signature verification — if using a slow verification method, move signature verification before the 200 response but keep actual business logic async.',
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
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'Every API call is an HTTP request. The method (GET/POST/PUT/PATCH/DELETE) describes the intent. Status codes 2xx mean success, 4xx mean your code is wrong (do not retry), 5xx mean the server has a problem (retry with backoff). 429 means rate limit exceeded — always back off and retry.',
        'API keys are static strings — always read from environment variables, never hardcode. OAuth 2.0 Client Credentials is for server-to-server access without user interaction. OAuth Authorization Code is for accessing user-specific data in third-party platforms. HMAC signatures sign each request with a shared secret to prove the sender.',
        'Cursor pagination is almost always better than offset pagination for production pipelines. Cursors are stable — new insertions during pagination do not shift positions and cause skipped or duplicated records. Offsets are position-based and break on live changing datasets. Always prefer cursor pagination when the API offers it.',
        'Rate limiting requires two layers: proactive (a token bucket limiter that stays below the limit) and reactive (detecting 429 responses, reading Retry-After headers, and backing off with jitter). Jitter — random variation in backoff times — prevents thundering herds where multiple retrying clients all resume simultaneously.',
        'Webhooks deliver events in near-real-time but are not guaranteed. Always verify the HMAC signature before processing (use hmac.compare_digest to prevent timing attacks). Return 200 immediately and process asynchronously to avoid retry storms. Implement idempotency checks using the event ID. Schedule hourly reconciliation polling to catch any missed webhook deliveries.',
        'Write defensive API parsers. Use .get() with defaults for every field access. Handle multiple formats for amounts (integer paise vs float rupees vs string), timestamps (Unix seconds vs milliseconds vs ISO 8601), and status values (lowercase normalisation). Log schema changes when unexpected new fields appear.',
        'The production pipeline design has five properties: idempotent (upserts not inserts, unique constraints on business keys), resumable (cursor checkpointing that survives failures), observable (structured logging with run_id), defensive (safe field parsing that never crashes on unexpected data), and respectful (proactive rate limiting that stays within API quotas).',
        'Use fixed time windows for incremental extraction — not relative windows. "date=2026-03-17 means from midnight to midnight UTC" produces the same result regardless of when the pipeline runs. Relative windows ("last 24 hours") produce different results on reruns, making the pipeline non-idempotent.',
        'The hybrid pattern — webhooks for real-time plus periodic polling for reconciliation — is the production-grade solution for event-driven ingestion. Neither alone is sufficient: webhooks alone miss events during downtime, polling alone adds latency and wastes API quota.',
        'Always test a new API manually with curl before writing code. Check authentication works, understand the response structure, read the rate limit headers, confirm the pagination style, and download a small sample to inspect field names and types. Ten minutes with curl prevents hours of debugging misunderstood API behaviour.',
      ]} />

    </LearnLayout>
  )
}