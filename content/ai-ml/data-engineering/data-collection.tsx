import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Data Collection — APIs, SQL, Files and Scraping — Chaduvuko',
  description:
    'Where ML data actually comes from. Pull data reliably from REST APIs, SQL databases, Parquet files, and web scraping — with error handling, pagination, and rate limiting built in.',
}

const S = {
  tag: {
    fontSize: 11, fontWeight: 700 as const, letterSpacing: '0.1em',
    textTransform: 'uppercase' as const, color: 'var(--accent)',
    fontFamily: 'var(--font-mono)', display: 'block' as const, marginBottom: 10,
  },
  h2: {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)',
    fontWeight: 900 as const, letterSpacing: '-1.2px',
    color: 'var(--text)', marginBottom: 14, lineHeight: 1.15,
  },
  h3: {
    fontFamily: 'var(--font-display)', fontSize: 17,
    fontWeight: 700 as const, letterSpacing: '-0.4px',
    color: 'var(--text)', marginBottom: 10, marginTop: 28,
  },
  p: { fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 16 },
  ps: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 10 },
  sec: { paddingBottom: 56, paddingTop: 8, borderBottom: '1px solid var(--border)' },
  code: {
    fontFamily: 'var(--font-mono)', fontSize: 12,
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: 4, padding: '1px 6px', color: 'var(--accent)',
  },
}

function Div() { return <div style={{ height: 56 }} /> }

function HBox({ children, color = 'var(--accent)' }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderLeft: `3px solid ${color}`, borderRadius: 8,
      padding: '13px 17px', marginBottom: 20,
    }}>
      {children}
    </div>
  )
}

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, overflow: 'hidden', marginBottom: 24,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 16px', borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
      }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
        }}>
          {label ?? 'python'}
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
      </div>
      <pre style={{
        padding: '18px 20px', margin: 0, overflowX: 'auto',
        fontFamily: 'var(--font-mono)', fontSize: 13,
        lineHeight: 1.75, color: 'var(--text)',
      }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

function VisualBox({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: 10,
      overflow: 'hidden', marginBottom: 24,
    }}>
      <div style={{
        padding: '8px 14px', background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        fontFamily: 'var(--font-mono)', letterSpacing: '0.07em',
        textTransform: 'uppercase' as const,
      }}>
        {label}
      </div>
      <div style={{ padding: '20px', background: 'var(--bg2)' }}>
        {children}
      </div>
    </div>
  )
}

function ErrorBlock({ error, cause, fix }: { error: string; cause: string; fix: string }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 8, overflow: 'hidden', marginBottom: 12,
    }}>
      <div style={{
        padding: '9px 14px', background: 'rgba(226,75,74,0.08)',
        borderBottom: '1px solid var(--border)',
        fontFamily: 'var(--font-mono)', fontSize: 12,
        color: '#ff4757', fontWeight: 600,
      }}>
        {error}
      </div>
      <div style={{ padding: '12px 14px' }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
          textTransform: 'uppercase' as const, color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', marginBottom: 4,
        }}>
          Why it happens
        </div>
        <p style={{ ...S.ps, marginBottom: 10 }}>{cause}</p>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
          textTransform: 'uppercase' as const, color: '#00e676',
          fontFamily: 'var(--font-mono)', marginBottom: 4,
        }}>
          Fix
        </div>
        <p style={{ ...S.ps, marginBottom: 0 }}>{fix}</p>
      </div>
    </div>
  )
}

export default function DataCollectionPage() {
  return (
    <LearnLayout
      title="Data Collection — APIs, SQL, Files and Scraping"
      description="Where ML data actually comes from and how to pull it reliably. REST APIs with pagination, SQL queries at scale, Parquet pipelines, and scraping — all with production-grade error handling."
      section="Data Engineering"
      readTime="55–65 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section='data-engineering' topic='data-collection' />

      {/* ══ SECTION 1 — HOOK ═══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The reality of ML data</span>
        <h2 style={S.h2}>
          Nobody hands you a clean CSV. Data has to be pulled, negotiated with, and earned.
        </h2>

        <p style={S.p}>
          Every ML tutorial starts with a dataset already loaded — iris.csv,
          mnist, titanic. The real world does not. At Swiggy, the order data
          lives in a PostgreSQL database behind an internal API.
          At Razorpay, transaction records are in a Redshift warehouse
          partitioned by date. At Zepto, inventory data is a stream of events
          in Kafka. At a startup, it might be a Google Sheet someone exports manually.
        </p>

        <p style={S.p}>
          Before you can train a model, you have to collect the data.
          This means making HTTP requests to APIs, running SQL queries,
          reading from cloud storage, and sometimes scraping a website
          when there is no API. Each source has its own format, its own
          failure modes, its own rate limits, and its own quirks.
        </p>

        <p style={S.p}>
          This module covers every major data source an ML engineer encounters —
          with real error handling, pagination, retry logic, and performance
          patterns that make the difference between a pipeline that works once
          and one that runs reliably every day.
        </p>

        <HBox color="#1D9E75">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              What this module covers:
            </span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[
              'HTTP and REST APIs — requests, authentication, headers',
              'Pagination — fetching all pages of a large API response',
              'Rate limiting — respect limits without slowing down',
              'Retry logic — handle transient failures automatically',
              'SQL data collection — queries, chunking, connection pooling',
              'Reading from data warehouses — BigQuery, Redshift, Snowflake',
              'File-based sources — CSV, JSON, Parquet from local and cloud',
              'Cloud storage — S3, GCS, Azure Blob with Python',
              'Web scraping — BeautifulSoup and Playwright for dynamic pages',
              'Streaming data — reading from Kafka with kafka-python',
              'Building a reusable data collection pipeline',
              'Storing and caching collected data efficiently',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: '#1D9E75', flexShrink: 0, marginTop: 7,
                }} />
                <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </HBox>

        <Callout type="tip">
          Install the libraries used in this module before starting:
          {' '}<span style={S.code as React.CSSProperties}>pip install requests httpx pandas sqlalchemy
          pyarrow boto3 google-cloud-storage beautifulsoup4 playwright kafka-python</span>.
          You don't need real API credentials to follow along — every example
          uses public APIs or simulated responses you can run locally.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — HTTP AND REST APIS ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most common data source</span>
        <h2 style={S.h2}>REST APIs — pulling data over HTTP</h2>

        <p style={S.p}>
          A REST API is the most common way to get data from any modern service.
          You send an HTTP request — GET, POST, PUT, DELETE — to a URL.
          The server returns JSON. You parse it into a DataFrame or dictionary.
          The Python <span style={S.code as React.CSSProperties}>requests</span> library
          handles this in 3 lines. The hard parts are authentication,
          pagination, rate limiting, and handling failures gracefully.
        </p>

        <VisualBox label="Anatomy of an HTTP request — what every API call looks like">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.2 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 6 }}>
              <span style={{ color: '#00e676', minWidth: 80 }}>Method</span>
              <span style={{ color: 'var(--muted)' }}>GET / POST / PUT / DELETE</span>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 6 }}>
              <span style={{ color: '#378ADD', minWidth: 80 }}>URL</span>
              <span style={{ color: 'var(--muted)' }}>https://api.example.com/v1/orders?page=1&limit=100</span>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 6 }}>
              <span style={{ color: '#D85A30', minWidth: 80 }}>Headers</span>
              <span style={{ color: 'var(--muted)' }}>Authorization: Bearer &lt;token&gt; | Content-Type: application/json</span>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 6 }}>
              <span style={{ color: '#7F77DD', minWidth: 80 }}>Body</span>
              <span style={{ color: 'var(--muted)' }}>JSON payload (POST/PUT only) — query filters, options</span>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ color: '#BA7517', minWidth: 80 }}>Response</span>
              <span style={{ color: 'var(--muted)' }}>200 OK + JSON body | 429 Rate limited | 401 Unauthorized | 500 Server error</span>
            </div>
          </div>
        </VisualBox>

        <h3 style={S.h3}>Basic GET request — the foundation</h3>

        <CodeBlock code={`import requests
import pandas as pd
import json
import time
from typing import Optional

# ── The simplest possible API call ────────────────────────────────────
# Using the Open-Meteo weather API — free, no key needed
response = requests.get(
    'https://api.open-meteo.com/v1/forecast',
    params={
        'latitude':  12.9716,     # Bangalore
        'longitude': 77.5946,
        'daily':     'temperature_2m_max,temperature_2m_min,precipitation_sum',
        'timezone':  'Asia/Kolkata',
        'forecast_days': 7,
    },
    timeout=10,   # ALWAYS set a timeout — never block forever
)

# Check the status code before parsing
print(f"Status: {response.status_code}")   # 200 = success

if response.status_code == 200:
    data = response.json()   # parse JSON → Python dict
    print(f"Keys in response: {list(data.keys())}")
    print(f"Daily data: {list(data['daily'].keys())}")

    # Convert to DataFrame
    df_weather = pd.DataFrame(data['daily'])
    df_weather['date'] = pd.to_datetime(df_weather['time'])
    df_weather = df_weather.drop(columns=['time'])
    print(df_weather)
else:
    print(f"Request failed: {response.status_code} — {response.text[:200]}")

# ── HTTP status codes you will encounter ──────────────────────────────
status_meanings = {
    200: "OK — success",
    201: "Created — POST succeeded, new resource created",
    204: "No content — success but empty response",
    400: "Bad request — your request has a syntax error",
    401: "Unauthorized — missing or wrong API key",
    403: "Forbidden — authenticated but not permitted",
    404: "Not found — endpoint or resource doesn't exist",
    422: "Unprocessable — valid syntax, invalid data (wrong types etc.)",
    429: "Too many requests — rate limited, slow down",
    500: "Internal server error — bug on the server side",
    503: "Service unavailable — server overloaded or down",
}
for code, meaning in status_meanings.items():
    print(f"  {code}: {meaning}")`} />

        <h3 style={S.h3}>Authentication — API keys, Bearer tokens, OAuth</h3>

        <CodeBlock code={`import requests
import os

# ── Method 1: API key in query parameters ─────────────────────────────
# Some APIs accept the key as a URL parameter
response = requests.get(
    'https://api.example.com/v1/data',
    params={
        'api_key': os.environ.get('MY_API_KEY'),   # NEVER hardcode keys
        'city':    'Bangalore',
    }
)

# ── Method 2: Bearer token in Authorization header ─────────────────────
# Most modern APIs use this — get token from login, include in every request
token = os.environ.get('API_TOKEN')   # store in environment variable

response = requests.get(
    'https://api.example.com/v1/orders',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type':  'application/json',
        'Accept':        'application/json',
    }
)

# ── Method 3: Basic authentication ────────────────────────────────────
response = requests.get(
    'https://api.example.com/v1/data',
    auth=('username', 'password'),   # requests handles base64 encoding
)

# ── Method 4: Use a Session for repeated requests ─────────────────────
# A Session reuses the TCP connection and stores headers/auth for every call
# Much faster than creating a new connection for every request

session = requests.Session()
session.headers.update({
    'Authorization': f'Bearer {token}',
    'Content-Type':  'application/json',
    'User-Agent':    'Chaduvuko-ML-Pipeline/1.0',
})

# Now every request from this session includes the headers automatically
r1 = session.get('https://api.example.com/v1/orders')
r2 = session.get('https://api.example.com/v1/restaurants')
r3 = session.post('https://api.example.com/v1/query', json={'city': 'Mumbai'})

# ── Loading credentials safely ─────────────────────────────────────────
# NEVER do this:
# API_KEY = "sk-abc123xyz"  ← hardcoded in source code → security breach

# DO this: use environment variables
# In terminal: export OPENAI_API_KEY="sk-abc123xyz"
# In Python:
api_key = os.environ.get('OPENAI_API_KEY')
if api_key is None:
    raise EnvironmentError(
        "OPENAI_API_KEY not set. "
        "Run: export OPENAI_API_KEY='your-key-here'"
    )

# Or use a .env file with python-dotenv (never commit .env to git!)
# pip install python-dotenv
from dotenv import load_dotenv
load_dotenv()   # reads .env file, sets environment variables
api_key = os.environ.get('OPENAI_API_KEY')`} />

        <h3 style={S.h3}>Retry logic — handle transient failures automatically</h3>

        <p style={S.p}>
          APIs fail. Networks drop. Servers restart. A data collection pipeline
          that crashes on the first 503 response is not production-ready.
          You need automatic retry with exponential backoff — wait longer after
          each failure to avoid hammering a struggling server.
          The <span style={S.code as React.CSSProperties}>requests</span> library's
          <span style={S.code as React.CSSProperties}> HTTPAdapter</span> with
          <span style={S.code as React.CSSProperties}> Retry</span> handles this cleanly.
        </p>

        <CodeBlock code={`import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
import time
import logging

logger = logging.getLogger(__name__)

# ── Production-grade session with automatic retry ─────────────────────

def make_session(
    retries:       int   = 3,
    backoff_factor: float = 1.0,
    status_forcelist: tuple = (429, 500, 502, 503, 504),
    timeout:        int   = 30,
) -> requests.Session:
    """
    Create a requests Session with automatic retry and backoff.

    Retry behaviour:
      Attempt 1: immediate
      Attempt 2: wait 1 × backoff_factor seconds
      Attempt 3: wait 2 × backoff_factor seconds
      Attempt 4: wait 4 × backoff_factor seconds  (exponential)
    """
    session = requests.Session()
    retry   = Retry(
        total=retries,
        backoff_factor=backoff_factor,
        status_forcelist=status_forcelist,
        allowed_methods=['GET', 'POST', 'PUT'],
        raise_on_status=False,   # don't raise — let us handle the response
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('http://',  adapter)
    session.mount('https://', adapter)
    session.request_timeout = timeout   # store for use in each call
    return session

# ── Manual retry with exponential backoff — more control ──────────────

def fetch_with_retry(
    url:            str,
    params:         dict = None,
    headers:        dict = None,
    max_retries:    int  = 5,
    base_delay:     float = 1.0,
    max_delay:      float = 60.0,
) -> dict:
    """
    Fetch a URL with exponential backoff retry.
    Respects Retry-After header when rate limited (HTTP 429).
    """
    for attempt in range(1, max_retries + 1):
        try:
            response = requests.get(
                url, params=params, headers=headers, timeout=30
            )

            # Success
            if response.status_code == 200:
                return response.json()

            # Rate limited — respect the server's Retry-After header
            if response.status_code == 429:
                retry_after = int(response.headers.get('Retry-After', base_delay * attempt))
                logger.warning(f"Rate limited. Waiting {retry_after}s before retry {attempt}/{max_retries}")
                time.sleep(retry_after)
                continue

            # Server error — retry with backoff
            if response.status_code >= 500:
                delay = min(base_delay * (2 ** (attempt - 1)), max_delay)
                logger.warning(f"Server error {response.status_code}. Retry {attempt}/{max_retries} in {delay:.1f}s")
                time.sleep(delay)
                continue

            # Client error — don't retry (your request is wrong)
            if 400 <= response.status_code < 500:
                raise ValueError(
                    f"Client error {response.status_code}: {response.text[:300]}"
                )

        except requests.Timeout:
            delay = min(base_delay * (2 ** (attempt - 1)), max_delay)
            logger.warning(f"Timeout on attempt {attempt}. Retrying in {delay:.1f}s")
            time.sleep(delay)

        except requests.ConnectionError as e:
            delay = min(base_delay * (2 ** (attempt - 1)), max_delay)
            logger.warning(f"Connection error: {e}. Retrying in {delay:.1f}s")
            time.sleep(delay)

    raise RuntimeError(f"All {max_retries} attempts failed for {url}")

# Usage
data = fetch_with_retry(
    'https://api.open-meteo.com/v1/forecast',
    params={'latitude': 12.9716, 'longitude': 77.5946,
            'daily': 'temperature_2m_max', 'forecast_days': 7,
            'timezone': 'Asia/Kolkata'},
)
print(f"Fetched {len(data['daily']['time'])} days of weather data")`} />

        <h3 style={S.h3}>Pagination — fetching all pages of a large dataset</h3>

        <p style={S.p}>
          Most APIs don't return all records at once — they paginate.
          You get page 1 (100 records), then request page 2, then page 3,
          until there are no more pages. There are three pagination styles
          in the wild, and you'll encounter all of them.
        </p>

        <VisualBox label="Three pagination styles — know which one the API uses">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                style: 'Offset/limit pagination',
                color: '#378ADD',
                params: '?page=2&limit=100  or  ?offset=200&limit=100',
                how: 'Increment page number or offset until results are empty.',
                issue: 'New records inserted mid-pagination can cause duplicates or skips.',
              },
              {
                style: 'Cursor-based pagination',
                color: '#1D9E75',
                params: '?cursor=eyJpZCI6MTIzfQ==',
                how: 'Response includes a next_cursor — pass it as cursor in the next request.',
                issue: 'Most reliable — cursor points to exact position in the dataset.',
              },
              {
                style: 'Link header pagination',
                color: '#D85A30',
                params: 'Link: <https://api.example.com/data?page=3>; rel="next"',
                how: 'Response headers contain the full URL for the next page. Follow it.',
                issue: 'Common in GitHub API. Parse response.headers["Link"] to find next URL.',
              },
            ].map((item) => (
              <div key={item.style} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}30`,
                borderRadius: 8, padding: '12px 15px',
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 5 }}>
                  {item.style}
                </div>
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--muted)', marginBottom: 6 }}>
                  {item.params}
                </div>
                <p style={{ ...S.ps, marginBottom: 4 }}>{item.how}</p>
                <p style={{ ...S.ps, marginBottom: 0, color: '#BA7517' }}>Note: {item.issue}</p>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import requests
import pandas as pd
import time
from typing import Generator

# ── Offset/limit pagination — fetch all pages ─────────────────────────

def paginate_offset(
    base_url:   str,
    params:     dict,
    headers:    dict,
    page_size:  int = 100,
    data_key:   str = 'results',      # key in JSON that holds the list
    total_key:  str = 'total_count',  # key that tells us total records
    delay:      float = 0.1,          # polite delay between requests
) -> Generator:
    """Fetch all pages from an offset-paginated API. Yields one page at a time."""
    page = 1
    fetched = 0

    while True:
        response = requests.get(
            base_url,
            params={**params, 'page': page, 'limit': page_size},
            headers=headers,
            timeout=30,
        )
        response.raise_for_status()
        data = response.json()

        records = data.get(data_key, [])
        if not records:
            break   # empty page → done

        yield records
        fetched += len(records)

        # Check if we have all records
        total = data.get(total_key)
        if total and fetched >= total:
            break

        page += 1
        time.sleep(delay)   # be a good citizen — don't hammer the API

    print(f"Fetched {fetched} records total across {page} pages")

# ── Cursor-based pagination ───────────────────────────────────────────

def paginate_cursor(
    base_url:      str,
    params:        dict,
    headers:       dict,
    cursor_key:    str = 'next_cursor',   # key in response that holds next cursor
    data_key:      str = 'data',
    delay:         float = 0.1,
) -> Generator:
    """Fetch all pages from a cursor-paginated API."""
    cursor = None

    while True:
        request_params = {**params}
        if cursor:
            request_params['cursor'] = cursor

        response = requests.get(base_url, params=request_params,
                                headers=headers, timeout=30)
        response.raise_for_status()
        data = response.json()

        records = data.get(data_key, [])
        if not records:
            break

        yield records

        cursor = data.get(cursor_key)   # None if last page
        if not cursor:
            break

        time.sleep(delay)

# ── Link header pagination (GitHub-style) ─────────────────────────────
import re

def paginate_link_header(
    start_url: str,
    headers:   dict,
    delay:     float = 0.2,
) -> Generator:
    """Follow Link: rel='next' headers until no next page."""
    url = start_url

    while url:
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        yield response.json()

        # Parse Link header: <url>; rel="next", <url>; rel="last"
        link_header = response.headers.get('Link', '')
        next_url = None
        for part in link_header.split(','):
            if 'rel="next"' in part:
                match = re.search(r'<(.+?)>', part)
                if match:
                    next_url = match.group(1)
                    break

        url = next_url
        if url:
            time.sleep(delay)

# ── Collecting all pages into a single DataFrame ──────────────────────

def collect_all_pages(paginator) -> pd.DataFrame:
    """Collect all pages from any paginator into one DataFrame."""
    all_records = []
    for page_records in paginator:
        all_records.extend(page_records)
        print(f"  Collected {len(all_records)} records so far...", end='\r')
    print()   # newline after the progress counter
    return pd.DataFrame(all_records)

# Example: collect all pages from a hypothetical order API
session = make_session()
paginator = paginate_offset(
    base_url='https://api.example.com/v1/orders',
    params={'city': 'Bangalore', 'status': 'delivered'},
    headers={'Authorization': 'Bearer token'},
    page_size=100,
    data_key='orders',
)
# df_all = collect_all_pages(paginator)  # uncomment with real API`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — SQL ════════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most common internal data source</span>
        <h2 style={S.h2}>SQL — querying databases for ML data</h2>

        <p style={S.p}>
          Most company data lives in a relational database — PostgreSQL, MySQL,
          SQLite, or a cloud warehouse like BigQuery, Redshift, or Snowflake.
          For ML, you typically need to write a SQL query that joins multiple tables,
          filters by date range, and aggregates features — then load the result
          into a Pandas DataFrame. SQLAlchemy is the standard Python library
          for database connections, and it works with every database.
        </p>

        <CodeBlock code={`import pandas as pd
import sqlalchemy as sa
from sqlalchemy import text
import sqlite3

# ── SQLite — local, no server needed, great for development ───────────

# Create an in-memory SQLite database with sample Swiggy data
conn_sqlite = sqlite3.connect(':memory:')   # ':memory:' = in-RAM, no file

# Create and populate tables
conn_sqlite.executescript("""
CREATE TABLE orders (
    order_id       TEXT PRIMARY KEY,
    restaurant_id  INTEGER,
    customer_id    INTEGER,
    city           TEXT,
    distance_km    REAL,
    order_value    REAL,
    delivery_time  REAL,
    is_late        INTEGER,
    created_at     TEXT
);

CREATE TABLE restaurants (
    restaurant_id  INTEGER PRIMARY KEY,
    name           TEXT,
    cuisine_type   TEXT,
    avg_prep_min   REAL,
    is_chain       INTEGER
);

INSERT INTO restaurants VALUES
    (1, 'Pizza Hut',   'Italian', 18.0, 1),
    (2, 'Biryani Blues','Indian', 22.0, 0),
    (3, 'McDonald\\'s', 'American', 10.0, 1),
    (4, 'KFC',         'American', 10.0, 1),
    (5, 'Haldiram\\'s', 'Indian',  15.0, 1);
""")

import numpy as np
np.random.seed(42)
n = 10_000
rows = []
for i in range(n):
    rest_id = np.random.randint(1, 6)
    dist = abs(np.random.normal(4, 2))
    prep = abs(np.random.normal(15, 5))
    traffic = np.random.randint(1, 11)
    delivery = 8.6 + 7.3*dist + 0.8*prep + 1.5*traffic + np.random.randn()*4
    rows.append((
        f'SW{i:06d}', rest_id, np.random.randint(1, 1001),
        np.random.choice(['Bangalore','Mumbai','Delhi','Hyderabad']),
        round(dist, 2), round(abs(np.random.normal(350, 150)), 0),
        round(delivery, 1), int(delivery > 45),
        f'2024-{np.random.randint(1,13):02d}-{np.random.randint(1,29):02d}',
    ))
conn_sqlite.executemany(
    "INSERT INTO orders VALUES (?,?,?,?,?,?,?,?,?)", rows
)
conn_sqlite.commit()

# ── Query with pandas.read_sql ────────────────────────────────────────
df = pd.read_sql("""
    SELECT
        o.order_id,
        o.city,
        o.distance_km,
        o.order_value,
        o.delivery_time,
        o.is_late,
        r.name           AS restaurant_name,
        r.cuisine_type,
        r.avg_prep_min,
        r.is_chain
    FROM orders o
    JOIN restaurants r ON o.restaurant_id = r.restaurant_id
    WHERE o.delivery_time IS NOT NULL
      AND o.distance_km > 0
    ORDER BY o.created_at DESC
""", con=conn_sqlite)

print(f"Loaded {len(df):,} rows from SQL join")
print(df.head(3).to_string())

# ── SQLAlchemy — the production way ───────────────────────────────────
# Works with PostgreSQL, MySQL, SQLite, Redshift, BigQuery etc.
# Connection string format:
#   SQLite:     sqlite:///path/to/db.sqlite
#   PostgreSQL: postgresql://user:password@host:5432/dbname
#   MySQL:      mysql+pymysql://user:password@host:3306/dbname
#   Redshift:   redshift+redshift_connector://user:pw@host:5439/db

engine = sa.create_engine('sqlite://', connect_args={'check_same_thread': False})

# Create tables from DataFrame (useful for prototyping)
df.to_sql('orders_enriched', engine, if_exists='replace', index=False)

# Query with SQLAlchemy
with engine.connect() as conn:
    result = conn.execute(text("""
        SELECT
            city,
            AVG(delivery_time)  AS avg_delivery,
            AVG(is_late)        AS late_rate,
            COUNT(*)            AS n_orders
        FROM orders_enriched
        GROUP BY city
        ORDER BY avg_delivery DESC
    """))
    city_stats = pd.DataFrame(result.fetchall(), columns=result.keys())

print(city_stats.round(3))`} />

        <h3 style={S.h3}>Chunked reading — large tables that don't fit in RAM</h3>

        <CodeBlock code={`import pandas as pd
import sqlalchemy as sa

engine = sa.create_engine('sqlite://')

# For tables with millions of rows, read in chunks
def read_table_chunked(
    query:      str,
    engine:     sa.Engine,
    chunk_size: int = 50_000,
    transform_fn = None,
) -> pd.DataFrame:
    """
    Read a large SQL query in chunks, optionally transform each chunk.
    Avoids loading the entire result set into memory at once.
    """
    chunks = []
    total  = 0

    for chunk in pd.read_sql(query, engine, chunksize=chunk_size):
        if transform_fn:
            chunk = transform_fn(chunk)
        chunks.append(chunk)
        total += len(chunk)
        print(f"  Read {total:,} rows...", end='\r')

    print(f"\nDone: {total:,} total rows")
    return pd.concat(chunks, ignore_index=True)

# Transformation applied to each chunk
def feature_engineering_chunk(chunk: pd.DataFrame) -> pd.DataFrame:
    chunk['log_distance'] = np.log1p(chunk['distance_km'])
    chunk['high_value']   = chunk['order_value'] > 500
    return chunk

# Usage
df_large = read_table_chunked(
    "SELECT * FROM orders_enriched",
    engine,
    chunk_size=2000,
    transform_fn=feature_engineering_chunk,
)
print(f"Final shape: {df_large.shape}")

# ── Parameterised queries — prevent SQL injection ──────────────────────
# WRONG — never do string formatting into SQL
city = "Bangalore"
# bad_query = f"SELECT * FROM orders WHERE city = '{city}'"  # ← injection risk

# CORRECT — use parameters
with engine.connect() as conn:
    # SQLAlchemy bindparams
    result = conn.execute(
        text("SELECT * FROM orders_enriched WHERE city = :city AND is_late = :late"),
        {'city': 'Bangalore', 'late': 1}
    )
    late_bangalore = pd.DataFrame(result.fetchall(), columns=result.keys())

print(f"Late orders in Bangalore: {len(late_bangalore):,}")

# ── Connection pooling — reuse connections efficiently ─────────────────
# For applications making many queries, pooling prevents connection overhead
engine_pooled = sa.create_engine(
    'sqlite://',
    pool_size=5,           # keep 5 connections open
    max_overflow=10,       # allow up to 10 additional connections
    pool_timeout=30,       # wait max 30s for a connection
    pool_recycle=3600,     # recycle connections after 1 hour
    pool_pre_ping=True,    # test connection before use (detects dropped connections)
)`} />

        <h3 style={S.h3}>Cloud warehouses — BigQuery, Redshift, Snowflake</h3>

        <CodeBlock code={`# ── Google BigQuery ───────────────────────────────────────────────────
# pip install google-cloud-bigquery pandas-gbq

from google.cloud import bigquery
import pandas as pd

# Authenticate: set GOOGLE_APPLICATION_CREDENTIALS env var to path of service account JSON
client = bigquery.Client(project='your-gcp-project-id')

# Run a query and return a DataFrame
query = """
    SELECT
        city,
        DATE_TRUNC(created_at, MONTH) AS month,
        AVG(delivery_time_minutes)    AS avg_delivery_min,
        COUNTIF(is_late = TRUE)       AS late_orders,
        COUNT(*)                      AS total_orders
    FROM \`your-project.swiggy_dataset.orders\`
    WHERE DATE(created_at) >= DATE_SUB(CURRENT_DATE(), INTERVAL 90 DAY)
    GROUP BY 1, 2
    ORDER BY 2 DESC, 1
"""

# Use pandas-gbq (simpler) or BigQuery client (more control)
import pandas_gbq
df_bq = pandas_gbq.read_gbq(query, project_id='your-gcp-project-id')
print(df_bq.head())

# ── AWS Redshift / Redshift Serverless ────────────────────────────────
# pip install redshift-connector sqlalchemy-redshift

import redshift_connector
import os

conn_rs = redshift_connector.connect(
    host=os.environ['REDSHIFT_HOST'],
    database='swiggy_dw',
    user=os.environ['REDSHIFT_USER'],
    password=os.environ['REDSHIFT_PASSWORD'],
    port=5439,
)

with conn_rs.cursor() as cur:
    cur.execute("""
        SELECT
            r.restaurant_name,
            AVG(o.delivery_time)    AS avg_delivery,
            COUNT(*)                AS n_orders,
            SUM(o.gmv)              AS total_gmv
        FROM fact_orders o
        JOIN dim_restaurants r USING (restaurant_id)
        WHERE o.order_date >= DATEADD(day, -30, GETDATE())
        GROUP BY 1
        HAVING COUNT(*) > 100
        ORDER BY 4 DESC
    """)
    df_rs = pd.DataFrame(cur.fetchall(), columns=[d[0] for d in cur.description])

conn_rs.close()

# ── Snowflake ─────────────────────────────────────────────────────────
# pip install snowflake-connector-python snowflake-sqlalchemy

import snowflake.connector
import os

conn_sf = snowflake.connector.connect(
    account   = os.environ['SNOWFLAKE_ACCOUNT'],
    user      = os.environ['SNOWFLAKE_USER'],
    password  = os.environ['SNOWFLAKE_PASSWORD'],
    warehouse = 'COMPUTE_WH',
    database  = 'SWIGGY_DB',
    schema    = 'PUBLIC',
    role      = 'ML_READER',   # use least-privilege role
)

cur = conn_sf.cursor()
cur.execute("""
    SELECT * FROM ORDERS_FEATURES
    WHERE ORDER_DATE >= DATEADD(day, -90, CURRENT_DATE())
    LIMIT 500000
""")
df_sf = cur.fetch_pandas_all()   # native Pandas integration
cur.close()
conn_sf.close()
print(f"Snowflake: loaded {len(df_sf):,} rows")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — FILES AND CLOUD STORAGE ═══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>File-based data</span>
        <h2 style={S.h2}>Reading files — local, S3, GCS and Azure Blob</h2>

        <p style={S.p}>
          In many companies, data is deposited into cloud storage as files —
          CSV exports from operational databases, Parquet files from data pipelines,
          JSON dumps from event systems. Cloud storage (S3, GCS, Azure Blob)
          is cheap, scalable, and Python can read from it almost as easily as
          from local disk.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np
from pathlib import Path
import json
import pyarrow.parquet as pq

# ── Local file formats ─────────────────────────────────────────────────

# CSV — universal but slow for large files
df_csv = pd.read_csv(
    'orders.csv',
    dtype={
        'order_id':  str,
        'is_late':   bool,
        'city':      'category',   # use category dtype for repeated strings
    },
    parse_dates=['created_at'],
    usecols=['order_id','city','distance_km','delivery_time','is_late'],
    chunksize=None,   # set to 50_000 for large files
)

# Parquet — fast, columnar, compressed — prefer this for ML data
df_pq = pd.read_parquet(
    'orders.parquet',
    columns=['order_id','city','distance_km','delivery_time'],  # column pruning
    filters=[('city', '==', 'Bangalore'), ('delivery_time', '<', 60)],  # row filtering
)

# JSON lines (jsonl) — one JSON object per line
records = []
with open('orders.jsonl', 'r') as f:
    for line in f:
        records.append(json.loads(line.strip()))
df_jsonl = pd.DataFrame(records)

# Reading a directory of Parquet files (common in partitioned data lakes)
import pyarrow.dataset as ds
dataset = ds.dataset(
    'data/orders/',              # directory with part-000.parquet, part-001.parquet etc.
    format='parquet',
    partitioning='hive',         # handles city=Bangalore/year=2024/part-0.parquet
)
df_partitioned = dataset.to_table(
    filter=ds.field('city').isin(['Bangalore', 'Mumbai']),
    columns=['order_id', 'distance_km', 'delivery_time'],
).to_pandas()

# ── AWS S3 ────────────────────────────────────────────────────────────
# pip install boto3

import boto3
import io
import os

s3 = boto3.client(
    's3',
    aws_access_key_id     = os.environ['AWS_ACCESS_KEY_ID'],
    aws_secret_access_key = os.environ['AWS_SECRET_ACCESS_KEY'],
    region_name           = 'ap-south-1',   # Mumbai region
)

bucket = 'swiggy-ml-data'

# Read a CSV directly from S3 into DataFrame
obj = s3.get_object(Bucket=bucket, Key='features/orders_2024.csv')
df_s3_csv = pd.read_csv(io.BytesIO(obj['Body'].read()))

# Read Parquet from S3
obj_pq = s3.get_object(Bucket=bucket, Key='features/orders_2024.parquet')
df_s3_pq = pd.read_parquet(io.BytesIO(obj_pq['Body'].read()))

# List all files in a prefix (like ls on a directory)
def list_s3_files(bucket: str, prefix: str, suffix: str = '') -> list:
    paginator = s3.get_paginator('list_objects_v2')
    files = []
    for page in paginator.paginate(Bucket=bucket, Prefix=prefix):
        for obj in page.get('Contents', []):
            key = obj['Key']
            if key.endswith(suffix):
                files.append(key)
    return files

parquet_files = list_s3_files(bucket, prefix='features/', suffix='.parquet')
print(f"Found {len(parquet_files)} parquet files in S3")

# Read ALL parquet files in a prefix into one DataFrame
dfs = []
for key in parquet_files:
    obj = s3.get_object(Bucket=bucket, Key=key)
    dfs.append(pd.read_parquet(io.BytesIO(obj['Body'].read())))
df_all_s3 = pd.concat(dfs, ignore_index=True)

# ── Google Cloud Storage ──────────────────────────────────────────────
from google.cloud import storage

gcs = storage.Client()
bucket_gcs = gcs.bucket('swiggy-ml-bucket')

# Download to temp file and read
blob = bucket_gcs.blob('features/orders_2024.parquet')
blob.download_to_filename('/tmp/orders_2024.parquet')
df_gcs = pd.read_parquet('/tmp/orders_2024.parquet')

# Or read directly into memory
import io
data = blob.download_as_bytes()
df_gcs_mem = pd.read_parquet(io.BytesIO(data))

# ── Writing back to cloud storage ─────────────────────────────────────
# Save processed DataFrame back to S3
buffer = io.BytesIO()
df_all_s3.to_parquet(buffer, index=False, engine='pyarrow', compression='snappy')
buffer.seek(0)
s3.put_object(
    Bucket=bucket,
    Key='processed/orders_features_v2.parquet',
    Body=buffer.getvalue(),
)
print("Saved processed data back to S3")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — WEB SCRAPING ═══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>When there is no API</span>
        <h2 style={S.h2}>Web scraping — extracting data from HTML pages</h2>

        <p style={S.p}>
          Some data sources have no API — competitor pricing, job listings,
          salary data, product reviews, public datasets published as web tables.
          Web scraping extracts structured data from HTML.
          Always check the site's <span style={S.code as React.CSSProperties}>robots.txt</span>{' '}
          and Terms of Service before scraping. Scrape politely — add delays,
          use session caching, and never scrape faster than a human would browse.
        </p>

        <h3 style={S.h3}>BeautifulSoup — static HTML pages</h3>

        <CodeBlock code={`import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

# ── Scraping a static HTML table ──────────────────────────────────────
# Example: scraping a publicly available table from Wikipedia

def scrape_wikipedia_table(url: str, table_index: int = 0) -> pd.DataFrame:
    """Scrape a table from a Wikipedia page."""
    headers = {
        'User-Agent': 'Mozilla/5.0 (educational scraper — contact: you@email.com)',
    }
    response = requests.get(url, headers=headers, timeout=15)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, 'html.parser')
    tables = soup.find_all('table', class_='wikitable')

    if not tables:
        raise ValueError("No wikitable found on this page")

    # pandas can parse HTML tables directly
    df = pd.read_html(str(tables[table_index]))[0]
    return df

# Scrape list of Indian cities by population
df_cities = scrape_wikipedia_table(
    'https://en.wikipedia.org/wiki/List_of_cities_in_India_by_population',
)
print(df_cities.head(5))

# ── Custom HTML parsing with BeautifulSoup ────────────────────────────
def scrape_job_listings(search_url: str) -> list:
    """
    Scrape job listings from a page.
    Pattern works for any site with repeated card-style listings.
    """
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(search_url, headers=headers, timeout=15)
    soup = BeautifulSoup(response.text, 'html.parser')

    listings = []
    # Find all job card elements (inspect element → copy class name)
    cards = soup.find_all('div', class_='job-card')

    for card in cards:
        try:
            listing = {
                'title':    card.find('h2', class_='job-title').text.strip(),
                'company':  card.find('span', class_='company').text.strip(),
                'location': card.find('span', class_='location').text.strip(),
                'salary':   card.find('span', class_='salary').text.strip()
                           if card.find('span', class_='salary') else None,
                'url':      card.find('a')['href'],
            }
            listings.append(listing)
        except (AttributeError, TypeError):
            continue   # skip malformed cards

    return listings

# ── Multi-page scraping with politeness ──────────────────────────────
def scrape_all_pages(
    base_url:    str,
    n_pages:     int,
    scrape_fn,
    delay_min:   float = 1.0,
    delay_max:   float = 3.0,
) -> pd.DataFrame:
    """Scrape multiple pages with random delay between requests."""
    import random
    all_records = []

    for page in range(1, n_pages + 1):
        url = f"{base_url}?page={page}"
        try:
            records = scrape_fn(url)
            all_records.extend(records)
            print(f"Page {page}/{n_pages}: {len(records)} records")
        except Exception as e:
            print(f"Page {page} failed: {e}")

        # Random delay — polite scraping
        time.sleep(random.uniform(delay_min, delay_max))

    return pd.DataFrame(all_records)`} />

        <h3 style={S.h3}>Playwright — JavaScript-rendered dynamic pages</h3>

        <p style={S.p}>
          Many modern sites render content with JavaScript — the HTML you get
          from <span style={S.code as React.CSSProperties}>requests.get()</span> is
          just a shell with no data. You need a real browser.
          Playwright controls a real Chromium browser from Python,
          waits for JavaScript to load, then extracts the rendered HTML.
        </p>

        <CodeBlock code={`# pip install playwright
# playwright install chromium  (downloads Chromium browser)

from playwright.sync_api import sync_playwright
import pandas as pd
import time

def scrape_dynamic_page(url: str, wait_selector: str = None) -> str:
    """
    Load a JavaScript-rendered page and return the full HTML
    after the page has finished loading.
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)   # invisible browser
        page    = browser.new_page()

        # Set a realistic user agent
        page.set_extra_http_headers({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        })

        page.goto(url, wait_until='networkidle', timeout=30_000)

        # Wait for a specific element if needed
        if wait_selector:
            page.wait_for_selector(wait_selector, timeout=10_000)

        html = page.content()   # full rendered HTML
        browser.close()
        return html

def scrape_salary_data() -> pd.DataFrame:
    """
    Example: scrape salary data from a dynamic listing page.
    Adapt the selectors to the actual site's HTML structure.
    """
    records = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page    = browser.new_page()

        page.goto('https://www.example-salaries.com/data-engineer/india',
                  wait_until='networkidle')

        # Extract data using page.evaluate() — runs JavaScript in the browser
        # Useful for sites that store data in JS variables or React state
        data = page.evaluate("""
            () => {
                const rows = document.querySelectorAll('.salary-row');
                return Array.from(rows).map(row => ({
                    role:       row.querySelector('.role')?.textContent?.trim(),
                    company:    row.querySelector('.company')?.textContent?.trim(),
                    city:       row.querySelector('.city')?.textContent?.trim(),
                    experience: row.querySelector('.experience')?.textContent?.trim(),
                    salary_lpa: row.querySelector('.salary')?.textContent?.trim(),
                }));
            }
        """)
        records.extend(data)

        # Click "Load more" button until it disappears
        while True:
            try:
                page.click('button.load-more', timeout=3000)
                page.wait_for_timeout(1500)   # wait for content to load
                new_data = page.evaluate("() => /* same selector */ []")
                records.extend(new_data)
            except Exception:
                break   # button gone → all data loaded

        browser.close()

    return pd.DataFrame(records)

# ── Caching scraped pages locally — avoid re-scraping ─────────────────
import hashlib
from pathlib import Path

CACHE_DIR = Path('/tmp/scrape_cache')
CACHE_DIR.mkdir(exist_ok=True)

def scrape_with_cache(url: str, ttl_hours: int = 24) -> str:
    """Cache scraped HTML to avoid repeated requests during development."""
    import time as time_module

    # Create a unique cache key from the URL
    cache_key  = hashlib.md5(url.encode()).hexdigest()
    cache_file = CACHE_DIR / f"{cache_key}.html"

    # Check if cache exists and is fresh
    if cache_file.exists():
        age_hours = (time_module.time() - cache_file.stat().st_mtime) / 3600
        if age_hours < ttl_hours:
            print(f"Cache hit: {url[:60]}...")
            return cache_file.read_text(encoding='utf-8')

    # Cache miss — scrape and save
    print(f"Scraping: {url[:60]}...")
    html = scrape_dynamic_page(url)
    cache_file.write_text(html, encoding='utf-8')
    return html`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — STREAMING DATA ═════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Real-time data</span>
        <h2 style={S.h2}>Kafka — reading streaming event data for ML</h2>

        <p style={S.p}>
          High-throughput ML systems — fraud detection, real-time recommendations,
          delivery ETA prediction — often need to consume data as it streams in,
          not from batch queries. Apache Kafka is the standard event streaming
          platform. For ML, you typically read from a Kafka topic, process events,
          extract features, and either update a model or score against one.
        </p>

        <CodeBlock code={`# pip install kafka-python

from kafka import KafkaConsumer, KafkaProducer
import json
import pandas as pd
from collections import deque
from datetime import datetime

# ── Basic Kafka consumer ──────────────────────────────────────────────
consumer = KafkaConsumer(
    'swiggy.orders.placed',      # topic name
    bootstrap_servers=['kafka.internal:9092'],
    group_id='ml-feature-pipeline',     # consumer group for load balancing
    auto_offset_reset='latest',          # 'latest' = only new messages, 'earliest' = all history
    value_deserializer=lambda m: json.loads(m.decode('utf-8')),
    enable_auto_commit=True,
    auto_commit_interval_ms=1000,
    max_poll_records=100,                # process up to 100 messages per poll
    session_timeout_ms=30_000,
)

def process_order_event(event: dict) -> dict:
    """Extract ML features from a raw order event."""
    return {
        'order_id':       event['order_id'],
        'restaurant_id':  event['restaurant']['id'],
        'distance_km':    event['delivery']['distance_metres'] / 1000,
        'hour_of_day':    datetime.fromisoformat(event['created_at']).hour,
        'order_value':    event['payment']['total_amount'],
        'n_items':        len(event['items']),
        'has_promo':      event.get('promo_code') is not None,
    }

# ── Windowed micro-batch processing ───────────────────────────────────
# For ML: accumulate events into a mini-batch, then score as a batch

BATCH_SIZE     = 50     # process 50 events at a time
MAX_WAIT_SEC   = 5      # or after 5 seconds, whichever comes first

batch   = []
last_ts = datetime.now()

print("Consuming events from Kafka... (Ctrl+C to stop)")
try:
    for message in consumer:
        event = message.value
        features = process_order_event(event)
        batch.append(features)

        elapsed = (datetime.now() - last_ts).total_seconds()

        if len(batch) >= BATCH_SIZE or elapsed >= MAX_WAIT_SEC:
            df_batch = pd.DataFrame(batch)

            # Score the batch against a loaded model
            # predictions = model.predict(df_batch[FEATURE_COLS])
            # publish_predictions(predictions)

            print(f"Processed batch of {len(df_batch)} events")
            batch   = []
            last_ts = datetime.now()

except KeyboardInterrupt:
    print("Stopped consuming")
finally:
    consumer.close()

# ── Producing events (for testing) ────────────────────────────────────
producer = KafkaProducer(
    bootstrap_servers=['kafka.internal:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
    acks='all',              # wait for all replicas to confirm
    retries=3,
    linger_ms=10,            # batch messages within 10ms window
)

test_event = {
    'order_id':    'SW999999',
    'restaurant':  {'id': 1, 'name': 'Pizza Hut'},
    'delivery':    {'distance_metres': 3200},
    'created_at':  datetime.now().isoformat(),
    'payment':     {'total_amount': 450.0},
    'items':       [{'id': 1}, {'id': 2}],
}
producer.send('swiggy.orders.placed', value=test_event)
producer.flush()   # ensure message is sent before exiting`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — PIPELINE ═══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Putting it all together</span>
        <h2 style={S.h2}>A reusable data collection pipeline</h2>

        <p style={S.p}>
          Production data collection is not one-off scripts — it's a pipeline
          that runs on a schedule, handles failures, logs progress, and stores
          results in a consistent location. Here's the structure every
          ML data pipeline follows.
        </p>

        <CodeBlock code={`import requests
import pandas as pd
import logging
import hashlib
import json
from pathlib import Path
from datetime import datetime, timedelta
from dataclasses import dataclass, field
from typing import Optional

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s  %(levelname)s  %(name)s  %(message)s',
)
logger = logging.getLogger('data_collection')

@dataclass
class CollectionConfig:
    """Configuration for a data collection job."""
    source_name:   str
    output_dir:    Path
    date_from:     datetime
    date_to:       datetime
    batch_size:    int   = 1000
    max_retries:   int   = 3
    delay_seconds: float = 0.5
    output_format: str   = 'parquet'   # 'csv' | 'parquet' | 'jsonl'


class DataCollector:
    """
    Base class for all data collectors.
    Handles: progress tracking, caching, storage, and error logging.
    """

    def __init__(self, config: CollectionConfig):
        self.config = config
        self.config.output_dir.mkdir(parents=True, exist_ok=True)
        self._failed_batches: list = []

    def collect(self) -> pd.DataFrame:
        """Override this method to implement collection logic."""
        raise NotImplementedError

    def _save(self, df: pd.DataFrame, suffix: str = '') -> Path:
        """Save DataFrame in configured format with timestamp."""
        ts   = datetime.now().strftime('%Y%m%d_%H%M%S')
        name = f"{self.config.source_name}_{ts}{suffix}"
        path = self.config.output_dir / name

        if self.config.output_format == 'parquet':
            df.to_parquet(f"{path}.parquet", index=False, compression='snappy')
            output = Path(f"{path}.parquet")
        elif self.config.output_format == 'csv':
            df.to_csv(f"{path}.csv", index=False)
            output = Path(f"{path}.csv")
        else:
            df.to_json(f"{path}.jsonl", orient='records', lines=True)
            output = Path(f"{path}.jsonl")

        logger.info(f"Saved {len(df):,} rows → {output}")
        return output

    def _checkpoint(self, batch_id: int, df: pd.DataFrame):
        """Save an intermediate checkpoint to avoid losing progress."""
        self._save(df, suffix=f'_checkpoint_{batch_id:04d}')

    def run(self) -> Optional[pd.DataFrame]:
        """Run the collection job with full error handling."""
        logger.info(
            f"Starting collection: {self.config.source_name} "
            f"({self.config.date_from.date()} → {self.config.date_to.date()})"
        )
        start = datetime.now()
        try:
            df = self.collect()
            path = self._save(df)
            elapsed = (datetime.now() - start).total_seconds()
            logger.info(
                f"Collection complete: {len(df):,} rows in {elapsed:.1f}s "
                f"({len(df)/elapsed:.0f} rows/sec)"
            )
            if self._failed_batches:
                logger.warning(f"Failed batches: {self._failed_batches}")
            return df
        except Exception as e:
            logger.error(f"Collection failed: {e}", exc_info=True)
            raise


class WeatherAPICollector(DataCollector):
    """Collects weather data from Open-Meteo for Indian cities."""

    CITIES = {
        'Bangalore': (12.9716, 77.5946),
        'Mumbai':    (19.0760, 72.8777),
        'Delhi':     (28.6139, 77.2090),
        'Hyderabad': (17.3850, 78.4867),
        'Chennai':   (13.0827, 80.2707),
    }

    def collect(self) -> pd.DataFrame:
        all_records = []
        session = requests.Session()
        session.headers['User-Agent'] = 'ML-Pipeline/1.0'

        for city, (lat, lon) in self.CITIES.items():
            for attempt in range(1, self.config.max_retries + 1):
                try:
                    resp = session.get(
                        'https://api.open-meteo.com/v1/forecast',
                        params={
                            'latitude':     lat,
                            'longitude':    lon,
                            'daily':        ['temperature_2m_max',
                                             'temperature_2m_min',
                                             'precipitation_sum',
                                             'windspeed_10m_max'],
                            'start_date':   self.config.date_from.strftime('%Y-%m-%d'),
                            'end_date':     self.config.date_to.strftime('%Y-%m-%d'),
                            'timezone':     'Asia/Kolkata',
                        },
                        timeout=15,
                    )
                    resp.raise_for_status()
                    data = resp.json()['daily']

                    for i, date in enumerate(data['time']):
                        all_records.append({
                            'city':             city,
                            'date':             date,
                            'temp_max':         data['temperature_2m_max'][i],
                            'temp_min':         data['temperature_2m_min'][i],
                            'precipitation_mm': data['precipitation_sum'][i],
                            'wind_kmph':        data['windspeed_10m_max'][i],
                        })
                    logger.info(f"  {city}: {len(data['time'])} days collected")
                    break   # success

                except Exception as e:
                    if attempt == self.config.max_retries:
                        self._failed_batches.append(city)
                        logger.error(f"  {city} failed after {attempt} attempts: {e}")
                    else:
                        import time
                        time.sleep(self.config.delay_seconds * attempt)

        return pd.DataFrame(all_records)


# ── Run the pipeline ──────────────────────────────────────────────────
config = CollectionConfig(
    source_name   = 'weather_india',
    output_dir    = Path('/tmp/data/weather'),
    date_from     = datetime.now() - timedelta(days=30),
    date_to       = datetime.now(),
    output_format = 'parquet',
)

collector = WeatherAPICollector(config)
df_weather = collector.run()

if df_weather is not None:
    print(f"\nCollected weather for {df_weather['city'].nunique()} cities")
    print(df_weather.groupby('city')[['temp_max','precipitation_mm']].mean().round(2))`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — ERRORS ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common data collection error — explained and fixed</h2>

        <ErrorBlock
          error="requests.exceptions.SSLError: HTTPSConnectionPool — CERTIFICATE_VERIFY_FAILED"
          cause="The server's SSL certificate cannot be verified. This happens with self-signed certificates on internal company APIs, or when your machine's CA bundle is outdated. It also occurs when corporate proxies intercept HTTPS traffic and re-sign with their own certificate."
          fix="For company internal APIs: requests.get(url, verify='/path/to/company-ca.crt') using the company's CA certificate. Never use verify=False in production — it disables all SSL verification and exposes you to man-in-the-middle attacks. Update your certifi bundle: pip install --upgrade certifi."
        />

        <ErrorBlock
          error="requests.exceptions.ConnectionError: Failed to establish a new connection: [Errno -2] Name or service not known"
          cause="DNS resolution failed — the hostname doesn't exist, the network is down, or a VPN is required to reach an internal service. The error 'Name or service not known' specifically means the hostname couldn't be resolved to an IP address."
          fix="Verify the URL is correct. Check if the API requires a VPN connection. Test with: import socket; socket.gethostbyname('api.example.com'). For internal services, ensure you're connected to the company network or VPN before running the pipeline."
        />

        <ErrorBlock
          error="json.JSONDecodeError: Expecting value: line 1 column 1 (char 0)"
          cause="The API returned an empty response or HTML (like a login page or error page) instead of JSON. This happens when authentication fails, when the endpoint returns a redirect, or when the server is returning an HTML error page that your code tries to parse as JSON."
          fix="Print response.status_code and response.text[:500] before calling response.json(). Check that your authentication headers are correct. Handle non-200 responses explicitly before parsing: if response.status_code != 200: raise ValueError(f'Unexpected response: {response.text[:200]}')."
        />

        <ErrorBlock
          error="OperationalError: (sqlite3.OperationalError) too many SQL variables"
          cause="You're using an IN clause with more values than SQLite's limit (999 by default). For example: WHERE order_id IN (list of 5000 IDs). This limit exists in SQLite but not in PostgreSQL or other databases."
          fix="Split the list into chunks and run multiple queries: for chunk in np.array_split(ids, ceil(len(ids)/900)): df = pd.read_sql(f'SELECT * FROM orders WHERE order_id IN ({','.join(chunk)})', conn). Or use a temporary table: INSERT the IDs into a temp table then JOIN against it."
        />

        <ErrorBlock
          error="kafka.errors.NoBrokersAvailable: NoBrokersAvailable"
          cause="The Kafka consumer cannot connect to any broker in the bootstrap_servers list. Either the broker addresses are wrong, the brokers are down, or a firewall is blocking port 9092."
          fix="Verify broker addresses and port: telnet kafka.internal 9092 should connect. Check if you need to be on the company VPN. Try adding security_protocol='SASL_SSL' and sasl settings if the cluster requires authentication. Check Kafka broker logs for connection errors."
        />
      </div>

      <Div />

      {/* ══ SECTION 9 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can now pull data from any source a real ML project will encounter.
        </h2>

        <p style={S.p}>
          APIs with pagination and retry logic. SQL databases with chunked reading
          and parameterised queries. Cloud storage on S3 and GCS. Dynamic web pages
          with Playwright. Kafka event streams. A reusable pipeline class that
          handles failures, logging, and checkpointing. These are the building
          blocks every ML data engineer uses.
        </p>

        <p style={S.p}>
          Module 16 moves to data cleaning and validation — the step that comes
          after collection. Raw data from any of these sources will have nulls,
          wrong types, duplicate records, schema drift, and outliers.
          Cleaning it systematically — with validation rules that catch problems
          before they reach the model — is what separates a reliable pipeline
          from a fragile one.
        </p>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '16px 20px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 14,
        }}>
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase' as const, color: '#1D9E75',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Module 16 · Data Engineering
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Data Cleaning and Validation
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Schema validation, duplicate detection, type coercion, outlier
              handling, and building validation rules that run automatically
              every time new data arrives.
            </p>
          </div>
          <div style={{
            fontSize: 12, color: 'var(--muted)',
            border: '1px solid var(--border)',
            padding: '7px 14px', borderRadius: 6,
            fontFamily: 'var(--font-mono)',
          }}>
            coming soon
          </div>
        </div>
      </div>

      <KeyTakeaways
        items={[
          'Always set a timeout on every HTTP request — requests.get(url, timeout=30). A missing timeout can block a pipeline indefinitely. Use a requests.Session for repeated calls to the same host — it reuses the TCP connection and stores headers.',
          'Retry logic is not optional for production pipelines. Use exponential backoff: delay = min(base * 2^attempt, max_delay). Always respect the Retry-After header on HTTP 429 responses — it tells you exactly how long to wait.',
          'Three pagination styles exist: offset/limit (increment page number), cursor-based (use next_cursor from response), and link header (follow rel="next" URL). Always check the API docs to identify which style before writing pagination code.',
          'Use SQLAlchemy for database connections — it works with every database using the same interface. Always use parameterised queries (text() with bind params) — never format Python variables directly into SQL strings.',
          'For large SQL tables, use chunksize in pd.read_sql() to process in batches. This prevents MemoryError on multi-million row tables and lets you apply transformations incrementally.',
          'BeautifulSoup works for static HTML. Playwright is required when content is rendered by JavaScript. Always add delays between requests, check robots.txt, and cache scraped HTML locally during development to avoid re-scraping.',
          'Wrap every production data collection job in a class with logging, retry tracking, checkpointing, and consistent output format. A pipeline that silently fails and produces empty output is worse than one that fails loudly.',
        ]}
      />
    </LearnLayout>
  )
}