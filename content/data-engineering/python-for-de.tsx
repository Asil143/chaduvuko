import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Python for Data Engineering — Data Engineering | Chaduvuko',
  description:
    'Not Python 101. Python for pipelines — file I/O at scale, REST API calls with retries, error handling, structured logging, generators for memory efficiency, and writing testable pipeline code.',
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

export default function PythonForDEModule() {
  return (
    <LearnLayout
      title="Python for Data Engineering"
      description="File I/O at scale, REST APIs with retries, error handling, logging, generators, and testable code."
      section="Data Engineering"
      readTime="90 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — What DE Python Looks Like ──────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — This Is Not Python 101" />
        <SectionTitle>What Python for Data Engineering Actually Looks Like</SectionTitle>

        <Para>
          Python for data engineering is not the same as Python for web development,
          data science, or automation scripting. The patterns, the error handling
          discipline, the memory management requirements, and the testing approach are
          all different. A data scientist's Python notebook that works perfectly for
          exploration becomes a production disaster when run as a scheduled pipeline
          at 3 AM on 50 GB of data.
        </Para>

        <Para>
          This module covers the specific Python skills a data engineer uses daily —
          not syntax basics, not algorithms, not machine learning. If you can already
          write Python functions and use loops, you are ready for this. What you will
          learn here is how to write Python that runs reliably in production, handles
          failures gracefully, processes data without running out of memory, and
          fails loudly and clearly when something goes wrong.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 14,
          }}>
            The six skills this module builds
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {[
              { num: '01', name: 'File I/O at scale', desc: 'Reading and writing large files without loading everything into memory.' },
              { num: '02', name: 'REST API calls', desc: 'Fetching data from APIs with pagination, auth, and rate limit handling.' },
              { num: '03', name: 'Error handling & retries', desc: 'Distinguishing transient from permanent failures, retrying correctly.' },
              { num: '04', name: 'Structured logging', desc: 'Writing logs that are searchable, parseable, and useful at 3 AM.' },
              { num: '05', name: 'Generators', desc: 'Processing arbitrarily large data with constant memory.' },
              { num: '06', name: 'Testable code', desc: 'Writing pipeline logic that can be unit tested without a live database.' },
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

        <Callout type="info">
          <strong>Prerequisites:</strong> Basic Python — you can write functions,
          use loops, work with lists and dictionaries, and understand what an
          exception is. You do not need to be a Python expert. Everything in this
          module is built from that foundation.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 — File I/O at Scale ──────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — File I/O at Scale" />
        <SectionTitle>File I/O at Scale — Processing Large Files Without Breaking</SectionTitle>

        <Para>
          The first thing most beginners do when they need to read a file in Python
          is load the entire thing into memory. For a 1 KB config file, this is fine.
          For a 10 GB CSV of order data, this crashes the process with an out-of-memory
          error — or worse, slows the machine to a crawl as it swaps memory to disk.
        </Para>

        <Para>
          Production data engineering deals with files that are larger than available
          RAM. The solution is always the same: read in chunks, process chunk by chunk,
          never hold more than one chunk in memory at a time. Python has excellent
          built-in support for this through lazy file reading and the Pandas chunking API.
        </Para>

        <SubTitle>Reading large CSV files — the right and wrong way</SubTitle>

        <CodeBox label="CSV reading — naive (crashes on large files) vs correct (constant memory)">{`# ─── WRONG: loads entire file into memory ───────────────────────────────────
import pandas as pd

def load_orders_wrong(filepath: str) -> pd.DataFrame:
    df = pd.read_csv(filepath)   # 10 GB file → 10+ GB in RAM → crash or swap
    return df

# ─── CORRECT: chunked reading ────────────────────────────────────────────────
from typing import Iterator
import pandas as pd

def process_orders_in_chunks(filepath: str, chunk_size: int = 100_000) -> None:
    """Process a large CSV file in memory-efficient chunks."""
    chunks_processed = 0
    rows_processed = 0

    # read_csv with chunksize returns a TextFileReader iterator — lazy, not loaded yet
    chunk_iter = pd.read_csv(
        filepath,
        chunksize=chunk_size,
        dtype={
            'order_id':    'int64',
            'customer_id': 'int64',
            'amount':      'float64',    # use Decimal for production money handling
            'status':      'string',
        },
        parse_dates=['created_at'],
        encoding='utf-8',
        na_values=['', 'NULL', 'N/A', 'n/a', '-'],  # normalise nulls
        on_bad_lines='warn',     # log bad lines instead of crashing
    )

    for chunk in chunk_iter:
        # chunk is a DataFrame of at most chunk_size rows
        # Memory: only one chunk (100k rows) in RAM at a time
        chunk = clean_chunk(chunk)
        write_chunk_to_db(chunk)
        chunks_processed += 1
        rows_processed += len(chunk)

    print(f"Processed {rows_processed:,} rows in {chunks_processed} chunks")


def clean_chunk(df: pd.DataFrame) -> pd.DataFrame:
    """Apply cleaning transformations to one chunk."""
    df = df.drop_duplicates(subset=['order_id'])
    df = df[df['amount'] > 0]
    df = df[df['status'].isin(['placed', 'confirmed', 'delivered', 'cancelled'])]
    df['created_at'] = pd.to_datetime(df['created_at'], utc=True)
    return df`}</CodeBox>

        <SubTitle>Reading and writing Parquet files</SubTitle>

        <Para>
          Parquet is the standard format for data lake storage. Python's
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> pyarrow</code> library
          is the fastest way to read and write Parquet. It supports reading only
          the columns you need (columnar projection) and only the row groups that
          match a filter (predicate pushdown) — drastically reducing I/O on large files.
        </Para>

        <CodeBox label="Parquet reading and writing with PyArrow — production patterns">{`import pyarrow as pa
import pyarrow.parquet as pq
import pyarrow.dataset as ds
from pathlib import Path
import pandas as pd

# ── WRITING Parquet ───────────────────────────────────────────────────────────

def write_orders_to_parquet(df: pd.DataFrame, output_path: str) -> None:
    """Write a DataFrame to a Parquet file with explicit schema."""
    schema = pa.schema([
        pa.field('order_id',     pa.int64(),   nullable=False),
        pa.field('customer_id',  pa.int64(),   nullable=False),
        pa.field('amount',       pa.decimal128(10, 2), nullable=False),
        pa.field('status',       pa.string(),  nullable=False),
        pa.field('created_at',   pa.timestamp('us', tz='UTC'), nullable=False),
    ])

    table = pa.Table.from_pandas(df, schema=schema, preserve_index=False)

    pq.write_table(
        table,
        output_path,
        compression='snappy',         # fast compress/decompress, good ratio
        row_group_size=100_000,        # ~100k rows per row group (tunable)
        write_statistics=True,         # enables predicate pushdown on read
    )


# ── READING Parquet — column projection + predicate pushdown ──────────────────

def read_recent_orders(parquet_dir: str, since_date: str) -> pd.DataFrame:
    """Read only needed columns and only recent partitions."""
    dataset = ds.dataset(
        parquet_dir,
        format='parquet',
        partitioning='hive',   # reads date=YYYY-MM-DD partition folders
    )

    # Predicate pushdown: only read files where date >= since_date
    # PyArrow pushes this filter to the file level → skips irrelevant files
    table = dataset.to_table(
        columns=['order_id', 'customer_id', 'amount', 'status'],  # projection
        filter=(
            ds.field('date') >= since_date                    # partition filter
            & ds.field('status') == 'delivered'               # row group filter
        ),
    )
    return table.to_pandas()


# ── WRITING partitioned Parquet (Hive-style) ──────────────────────────────────

def write_partitioned_parquet(df: pd.DataFrame, base_path: str) -> None:
    """Write Parquet files partitioned by date — standard data lake pattern."""
    table = pa.Table.from_pandas(df, preserve_index=False)

    pq.write_to_dataset(
        table,
        root_path=base_path,
        partition_cols=['date'],       # creates .../date=2026-03-17/part-0.parquet
        compression='snappy',
        existing_data_behavior='overwrite_or_ignore',
    )`}</CodeBox>

        <SubTitle>Working with cloud storage (S3 / ADLS)</SubTitle>

        <CodeBox label="Reading and writing files on S3 and Azure Data Lake">{`import boto3
import pandas as pd
from io import BytesIO, StringIO
from pathlib import PurePosixPath

# ── AMAZON S3 ─────────────────────────────────────────────────────────────────

s3 = boto3.client('s3')

def read_csv_from_s3(bucket: str, key: str) -> pd.DataFrame:
    """Read a CSV file directly from S3 into a DataFrame."""
    response = s3.get_object(Bucket=bucket, Key=key)
    body = response['Body'].read()
    return pd.read_csv(BytesIO(body), encoding='utf-8')


def write_parquet_to_s3(df: pd.DataFrame, bucket: str, key: str) -> None:
    """Write a DataFrame as Parquet directly to S3."""
    buffer = BytesIO()
    df.to_parquet(buffer, engine='pyarrow', compression='snappy', index=False)
    buffer.seek(0)
    s3.put_object(Bucket=bucket, Key=key, Body=buffer.getvalue())


def list_s3_files(bucket: str, prefix: str) -> list[str]:
    """List all files in an S3 prefix (handles pagination automatically)."""
    keys = []
    paginator = s3.get_paginator('list_objects_v2')
    for page in paginator.paginate(Bucket=bucket, Prefix=prefix):
        for obj in page.get('Contents', []):
            keys.append(obj['Key'])
    return keys


# ── USING fsspec (works for S3, ADLS, GCS with same API) ─────────────────────
import fsspec

def read_parquet_from_any_cloud(path: str) -> pd.DataFrame:
    """
    Read Parquet from any cloud storage using fsspec.
    path examples:
      s3://bucket/path/file.parquet
      abfs://container@account.dfs.core.windows.net/path/file.parquet
      gs://bucket/path/file.parquet
    """
    with fsspec.open(path, 'rb') as f:
        return pd.read_parquet(f)


# ── FILE EXISTENCE AND METADATA ───────────────────────────────────────────────

def s3_file_exists(bucket: str, key: str) -> bool:
    """Check if a file exists in S3 without downloading it."""
    try:
        s3.head_object(Bucket=bucket, Key=key)
        return True
    except s3.exceptions.NoSuchKey:
        return False
    except s3.exceptions.ClientError as e:
        if e.response['Error']['Code'] == '404':
            return False
        raise`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — REST API Calls ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — REST API Calls" />
        <SectionTitle>REST API Calls — Pagination, Authentication, and Rate Limits</SectionTitle>

        <Para>
          Every data engineer spends significant time writing code that pulls data
          from REST APIs. The naive approach — one
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> requests.get()</code> call —
          works for fetching a single object. Production API ingestion requires handling
          four things the naive approach ignores: authentication, pagination, rate
          limiting, and transient failures.
        </Para>

        <SubTitle>Authentication patterns</SubTitle>

        <CodeBox label="API authentication — the three common patterns">{`import os
import requests
from requests.auth import HTTPBasicAuth

# ── PATTERN 1: API Key (most common) ─────────────────────────────────────────
# Never hardcode API keys in source code. Always read from environment.

API_KEY = os.environ['RAZORPAY_API_KEY']  # set in deployment environment

# As query parameter:
response = requests.get(
    'https://api.example.com/v1/payments',
    params={'api_key': API_KEY, 'from': '2026-03-01'},
)

# As header (more common and more secure):
response = requests.get(
    'https://api.example.com/v1/payments',
    headers={'Authorization': f'Bearer {API_KEY}'},
)

# As HTTP Basic Auth:
response = requests.get(
    'https://api.example.com/v1/payments',
    auth=HTTPBasicAuth(API_KEY, ''),  # Stripe-style: key_id as user, empty pass
)


# ── PATTERN 2: OAuth 2.0 Client Credentials ──────────────────────────────────
def get_oauth_token(client_id: str, client_secret: str, token_url: str) -> str:
    """Get an OAuth access token using client credentials flow."""
    response = requests.post(
        token_url,
        data={
            'grant_type':    'client_credentials',
            'client_id':     client_id,
            'client_secret': client_secret,
            'scope':         'read:orders',
        },
    )
    response.raise_for_status()
    return response.json()['access_token']

# Cache the token and refresh only when it expires:
from datetime import datetime, timedelta

_token_cache: dict = {}

def get_cached_token() -> str:
    now = datetime.utcnow()
    if 'token' not in _token_cache or _token_cache['expires_at'] <= now:
        token = get_oauth_token(
            os.environ['CLIENT_ID'],
            os.environ['CLIENT_SECRET'],
            'https://auth.example.com/token',
        )
        _token_cache['token'] = token
        _token_cache['expires_at'] = now + timedelta(seconds=3500)  # 1h - buffer
    return _token_cache['token']`}</CodeBox>

        <SubTitle>Pagination — the three patterns you will encounter</SubTitle>

        <CodeBox label="Pagination patterns — offset, cursor, and next-URL">{`from typing import Iterator
import requests

BASE_URL = 'https://api.example.com/v1'
HEADERS  = {'Authorization': f'Bearer {os.environ["API_TOKEN"]}'}


# ── PATTERN 1: Offset/Limit (simplest, but problems at large scale) ───────────
def fetch_all_orders_offset(start_date: str) -> Iterator[dict]:
    """Fetch all orders using offset pagination."""
    page   = 1
    limit  = 200    # items per page
    total_fetched = 0

    while True:
        response = requests.get(
            f'{BASE_URL}/orders',
            headers=HEADERS,
            params={'from': start_date, 'page': page, 'limit': limit},
        )
        response.raise_for_status()
        data = response.json()

        orders = data.get('items', [])
        if not orders:
            break                     # no more pages

        for order in orders:
            yield order               # yield one item at a time
            total_fetched += 1

        if len(orders) < limit:
            break                     # last page (partial)

        page += 1


# ── PATTERN 2: Cursor pagination (most reliable for large datasets) ───────────
def fetch_all_payments_cursor(start_date: str) -> Iterator[dict]:
    """Fetch all payments using cursor pagination."""
    cursor = None                     # start from beginning

    while True:
        params = {'from': start_date, 'count': 100}
        if cursor:
            params['cursor'] = cursor     # continue from last position

        response = requests.get(
            f'{BASE_URL}/payments',
            headers=HEADERS,
            params=params,
        )
        response.raise_for_status()
        data = response.json()

        items = data.get('items', [])
        for item in items:
            yield item

        # Cursor from response tells us where to start next page
        cursor = data.get('next_cursor')
        if not cursor or not items:
            break                     # no more pages


# ── PATTERN 3: Next URL (Salesforce, GitHub, many REST APIs) ─────────────────
def fetch_all_accounts_next_url() -> Iterator[dict]:
    """Fetch using next URL returned in response."""
    url = f'{BASE_URL}/accounts'

    while url:
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()
        data = response.json()

        for account in data.get('records', []):
            yield account

        url = data.get('nextRecordsUrl')  # None when no more pages


# ── CHECKPOINTING: save progress to resume on failure ────────────────────────
import json
from pathlib import Path

def fetch_with_checkpoint(
    checkpoint_file: str,
    start_date: str,
) -> Iterator[dict]:
    """Fetch with cursor checkpointing — resume from where we left off."""
    checkpoint_path = Path(checkpoint_file)

    # Load previous checkpoint if it exists
    if checkpoint_path.exists():
        checkpoint = json.loads(checkpoint_path.read_text())
        cursor = checkpoint.get('last_cursor')
        print(f"Resuming from cursor: {cursor}")
    else:
        cursor = None
        print("Starting from beginning")

    while True:
        params = {'from': start_date, 'count': 100}
        if cursor:
            params['cursor'] = cursor

        response = requests.get(f'{BASE_URL}/payments', headers=HEADERS, params=params)
        response.raise_for_status()
        data = response.json()

        items = data.get('items', [])
        for item in items:
            yield item

        cursor = data.get('next_cursor')

        # Save checkpoint after each successful page
        if cursor:
            checkpoint_path.write_text(json.dumps({'last_cursor': cursor}))

        if not cursor or not items:
            checkpoint_path.unlink(missing_ok=True)  # clean up on completion
            break`}</CodeBox>

        <SubTitle>Rate limiting — respecting API limits without failing</SubTitle>

        <CodeBox label="Rate limiting — detecting and handling API rate limit responses">{`import time
import requests
from datetime import datetime

def make_api_request(
    url: str,
    headers: dict,
    params: dict | None = None,
    max_retries: int = 5,
) -> requests.Response:
    """
    Make an API request that handles rate limiting correctly.
    Most APIs return 429 Too Many Requests when you exceed limits.
    """
    for attempt in range(max_retries):
        response = requests.get(url, headers=headers, params=params, timeout=30)

        if response.status_code == 200:
            return response

        elif response.status_code == 429:  # Too Many Requests
            # Check for Retry-After header (many APIs provide this)
            retry_after = response.headers.get('Retry-After')
            if retry_after:
                wait_seconds = int(retry_after)
            else:
                # Exponential backoff: 1s, 2s, 4s, 8s, 16s
                wait_seconds = 2 ** attempt

            print(f"Rate limited. Waiting {wait_seconds}s before retry {attempt+1}")
            time.sleep(wait_seconds)
            continue

        elif response.status_code in (500, 502, 503, 504):  # Server errors
            wait_seconds = 2 ** attempt
            print(f"Server error {response.status_code}. Waiting {wait_seconds}s")
            time.sleep(wait_seconds)
            continue

        else:
            # Client errors (400, 401, 403, 404) — do NOT retry
            response.raise_for_status()

    raise RuntimeError(f"Failed after {max_retries} attempts. Last status: {response.status_code}")


# ── TOKEN BUCKET RATE LIMITER (proactive limiting before hitting API limit) ───
class RateLimiter:
    """Simple rate limiter: ensures max N requests per second."""

    def __init__(self, calls_per_second: float):
        self.min_interval = 1.0 / calls_per_second
        self.last_call_time = 0.0

    def wait(self) -> None:
        now = time.monotonic()
        elapsed = now - self.last_call_time
        if elapsed < self.min_interval:
            time.sleep(self.min_interval - elapsed)
        self.last_call_time = time.monotonic()


# Usage:
limiter = RateLimiter(calls_per_second=10)  # max 10 requests/second

for page_params in generate_pages():
    limiter.wait()   # ensures we never exceed 10/s
    response = make_api_request(url, headers, params=page_params)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Error Handling and Retries ─────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Error Handling and Retries" />
        <SectionTitle>Error Handling — Distinguishing Transient from Permanent Failures</SectionTitle>

        <Para>
          The most important error handling concept in data engineering is the
          distinction between transient and permanent failures. A transient failure
          is one that will likely succeed if retried — a database connection timeout,
          an API returning 503 Service Unavailable, a network blip. A permanent
          failure is one that will never succeed no matter how many times you retry —
          a malformed row, an invalid API key, a constraint violation.
        </Para>

        <Para>
          Retrying a transient failure is correct. Retrying a permanent failure is
          wasteful at best and dangerous at worst — it can exhaust resources, cause
          rate limit bans, and delay the pipeline from making progress on other work.
          Your error handling code must distinguish between the two.
        </Para>

        <CodeBox label="Error classification — transient vs permanent">{`# ── TRANSIENT ERRORS: retry with exponential backoff ────────────────────────
TRANSIENT_ERRORS = {
    # Network issues
    requests.exceptions.ConnectionError,
    requests.exceptions.Timeout,
    requests.exceptions.ChunkedEncodingError,

    # Database connection issues
    psycopg2.OperationalError,          # DB server unavailable, connection reset
    psycopg2.errors.SerializationFailure,   # serializable conflict — safe to retry
    sqlalchemy.exc.OperationalError,

    # API rate limits and server errors
    # (detected by HTTP status code in the calling code)
}

# ── PERMANENT ERRORS: fail immediately, do not retry ─────────────────────────
PERMANENT_ERRORS = {
    # Data validation failures
    ValueError,                          # bad data format
    psycopg2.errors.CheckViolation,      # CHECK constraint failed
    psycopg2.errors.NotNullViolation,    # NOT NULL violated
    psycopg2.errors.ForeignKeyViolation, # FK constraint violated
    psycopg2.errors.UniqueViolation,     # duplicate key (if not handled by upsert)

    # Authentication / authorisation
    PermissionError,
    # (HTTP 401, 403 detected by status code)

    # Configuration errors
    KeyError,                            # missing required config
    FileNotFoundError,                   # input file does not exist
}`}</CodeBox>

        <CodeBox label="Exponential backoff with jitter — the correct retry pattern">{`import time
import random
import logging
from functools import wraps
from typing import Callable, TypeVar, Any

logger = logging.getLogger(__name__)

T = TypeVar('T')


def with_retry(
    max_attempts:   int   = 5,
    base_delay_s:   float = 1.0,
    max_delay_s:    float = 60.0,
    backoff_factor: float = 2.0,
    jitter:         bool  = True,
) -> Callable:
    """
    Decorator that retries a function on transient errors.
    Uses exponential backoff with optional jitter.

    Jitter: adds random variation to retry delays.
    Without jitter: all retrying clients fire at the same moment after
                    a server recovers, causing a thundering herd.
    With jitter:    retries spread out, reducing load spike on recovery.
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs) -> Any:
            last_exception = None

            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)

                except (psycopg2.OperationalError,
                        requests.exceptions.ConnectionError,
                        requests.exceptions.Timeout) as e:
                    # Transient — retry with backoff
                    last_exception = e
                    if attempt == max_attempts:
                        break

                    delay = min(base_delay_s * (backoff_factor ** (attempt - 1)), max_delay_s)
                    if jitter:
                        delay *= (0.5 + random.random() * 0.5)  # 50–100% of delay

                    logger.warning(
                        "Transient error on attempt %d/%d. Retrying in %.1fs. Error: %s",
                        attempt, max_attempts, delay, e,
                    )
                    time.sleep(delay)

                except (ValueError, psycopg2.errors.CheckViolation,
                        psycopg2.errors.NotNullViolation) as e:
                    # Permanent — fail immediately
                    logger.error("Permanent error — will not retry: %s", e)
                    raise

            logger.error("All %d attempts failed. Last error: %s", max_attempts, last_exception)
            raise last_exception

        return wrapper
    return decorator


# ── USAGE ─────────────────────────────────────────────────────────────────────

@with_retry(max_attempts=5, base_delay_s=2.0, jitter=True)
def fetch_orders_page(cursor: str | None) -> dict:
    """Fetch one page of orders from the API — retried on transient failures."""
    response = requests.get(
        'https://api.example.com/orders',
        headers={'Authorization': f'Bearer {os.environ["API_TOKEN"]}'},
        params={'cursor': cursor, 'count': 100},
        timeout=30,
    )
    response.raise_for_status()
    return response.json()


@with_retry(max_attempts=3, base_delay_s=1.0)
def write_to_database(rows: list[dict], conn) -> None:
    """Write rows to database — retried on connection errors."""
    with conn.cursor() as cur:
        cur.executemany(
            "INSERT INTO silver.orders VALUES %s ON CONFLICT (order_id) DO UPDATE ...",
            [tuple(r.values()) for r in rows],
        )
    conn.commit()`}</CodeBox>

        <SubTitle>Dead letter queues — what to do with records that always fail</SubTitle>

        <CodeBox label="Dead letter pattern — capturing failed records for investigation">{`import json
from pathlib import Path
from datetime import datetime
from typing import Any

class DeadLetterQueue:
    """
    A file-based dead letter queue for records that failed processing.
    Failed records are written here for manual inspection and reprocessing.
    """

    def __init__(self, dlq_path: str):
        self.dlq_path = Path(dlq_path)
        self.dlq_path.parent.mkdir(parents=True, exist_ok=True)

    def write(
        self,
        record: Any,
        error: Exception,
        context: dict | None = None,
    ) -> None:
        """Write a failed record to the dead letter queue with error context."""
        entry = {
            'failed_at':       datetime.utcnow().isoformat(),
            'error_type':      type(error).__name__,
            'error_message':   str(error),
            'record':          record,
            'context':         context or {},
        }
        # Append to NDJSON file (one JSON object per line)
        with open(self.dlq_path, 'a', encoding='utf-8') as f:
            f.write(json.dumps(entry) + '\n')

        logger.error(
            "Record sent to dead letter queue. Error: %s: %s",
            type(error).__name__, error,
        )


# ── USAGE IN A PIPELINE ───────────────────────────────────────────────────────

dlq = DeadLetterQueue('/data/dlq/orders_pipeline.ndjson')

for batch in read_batches_from_source():
    for record in batch:
        try:
            process_and_write(record)
        except (ValueError, psycopg2.errors.CheckViolation) as e:
            # Permanent failure — write to DLQ and continue
            dlq.write(record, e, context={'pipeline': 'orders', 'run_id': RUN_ID})
            continue   # skip this record, keep processing the rest
        except Exception as e:
            # Unexpected error — write to DLQ and re-raise
            dlq.write(record, e, context={'pipeline': 'orders', 'run_id': RUN_ID})
            raise`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Structured Logging ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Structured Logging" />
        <SectionTitle>Structured Logging — Writing Logs That Help at 3 AM</SectionTitle>

        <Para>
          A pipeline that logs "processing started" and "processing finished" is
          not observable. When it fails silently at 3 AM and you arrive at 9 AM
          to find wrong data, those logs tell you nothing useful.
        </Para>

        <Para>
          Structured logging means every log entry is a machine-readable JSON object
          with defined fields — timestamp, level, pipeline name, run ID, message,
          and any relevant metrics. Structured logs can be searched, aggregated,
          and alerted on by log management tools (Datadog, Grafana Loki,
          CloudWatch Logs Insights). Plain text logs cannot.
        </Para>

        <CodeBox label="Structured logging setup — the correct way to configure Python logging">{`import logging
import json
import sys
import uuid
from datetime import datetime
from typing import Any


class StructuredFormatter(logging.Formatter):
    """Formats log records as JSON for machine-readable output."""

    def __init__(self, pipeline_name: str, run_id: str):
        super().__init__()
        self.pipeline_name = pipeline_name
        self.run_id = run_id

    def format(self, record: logging.LogRecord) -> str:
        log_entry = {
            'timestamp':     datetime.utcnow().isoformat() + 'Z',
            'level':         record.levelname,
            'pipeline':      self.pipeline_name,
            'run_id':        self.run_id,
            'module':        record.module,
            'function':      record.funcName,
            'line':          record.lineno,
            'message':       record.getMessage(),
        }

        # Include any extra fields passed via the 'extra' parameter
        for key, value in record.__dict__.items():
            if key not in logging.LogRecord.__dict__ and not key.startswith('_'):
                if key not in log_entry:
                    log_entry[key] = value

        # Include exception info if present
        if record.exc_info:
            log_entry['exception'] = self.formatException(record.exc_info)

        return json.dumps(log_entry, default=str)


def setup_pipeline_logging(pipeline_name: str) -> tuple[logging.Logger, str]:
    """
    Configure structured logging for a pipeline run.
    Returns (logger, run_id).
    """
    run_id = str(uuid.uuid4())

    logger = logging.getLogger(pipeline_name)
    logger.setLevel(logging.DEBUG)
    logger.handlers.clear()

    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(StructuredFormatter(pipeline_name, run_id))
    logger.addHandler(handler)

    return logger, run_id


# ── USAGE — logging with structured context ───────────────────────────────────

logger, RUN_ID = setup_pipeline_logging('orders_ingestion')

# Basic message
logger.info("Pipeline started")

# With extra structured fields — these become searchable fields in log tools
logger.info(
    "Batch completed",
    extra={
        'rows_processed':  10_000,
        'rows_rejected':   47,
        'duration_seconds': 12.4,
        'source_file':     'orders_2026_03_17_batch_001.csv',
    },
)

# Output (formatted as JSON):
# {"timestamp": "2026-03-17T08:14:32Z", "level": "INFO",
#  "pipeline": "orders_ingestion", "run_id": "f8a3b2...",
#  "message": "Batch completed", "rows_processed": 10000,
#  "rows_rejected": 47, "duration_seconds": 12.4, ...}

logger.warning(
    "Row rejected — failed status validation",
    extra={
        'order_id':    9284751,
        'status':      'deliverd',      # typo in source
        'valid_values': ['placed', 'confirmed', 'delivered', 'cancelled'],
    },
)

logger.error("Connection failed", extra={'host': 'db-prod-01', 'port': 5432})
logger.exception("Unhandled exception")  # automatically includes stack trace`}</CodeBox>

        <SubTitle>Logging best practices — what to log and when</SubTitle>

        <CodeBox label="What to log at each level — the practical guide">{`# DEBUG — detailed information for diagnosing problems
#         not logged in production by default (too verbose)
logger.debug("Fetching page %d with cursor %s", page_num, cursor)
logger.debug("Row data: %s", row)  # never log PII in production

# INFO — confirmation that things are working as expected
#        logged in production, should be meaningful and not too frequent
logger.info("Pipeline started", extra={'source': 'razorpay', 'date': '2026-03-17'})
logger.info("Chunk %d complete", chunk_num, extra={'rows': len(chunk), 'elapsed_s': elapsed})
logger.info("Pipeline finished", extra={'total_rows': total, 'duration_s': duration})

# WARNING — something unexpected but the pipeline continued
#           should be investigated but did not cause failure
logger.warning("Row skipped — unexpected status value",
               extra={'order_id': order_id, 'status': status})
logger.warning("API returned empty page unexpectedly — may indicate end of data")
logger.warning("Retry %d/%d after connection error", attempt, max_attempts)

# ERROR — a failure that requires attention
#         pipeline may have continued but something went wrong
logger.error("Dead letter: row failed all retries",
             extra={'order_id': order_id, 'error': str(e)})
logger.error("Batch %d failed — rolling back", batch_num)

# CRITICAL — a severe failure that stops the pipeline
logger.critical("Cannot connect to database after %d attempts — aborting", max_retries)
logger.critical("Disk full — cannot write output files")

# ── WHAT NOT TO LOG ──────────────────────────────────────────────────────────
# ✗ Never log passwords, API keys, tokens
# ✗ Never log PII (customer names, emails, phone numbers, PAN)
# ✗ Never log entire large DataFrames at INFO level — too verbose
# ✗ Never use print() in pipeline code — use logger instead
#   (print() bypasses log level filtering, structured formatting, and
#    log management tools)

# ── TIMING DECORATOR ─────────────────────────────────────────────────────────
import time
from functools import wraps

def log_timing(func):
    """Decorator to log the execution time of a function."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.monotonic()
        try:
            result = func(*args, **kwargs)
            duration = time.monotonic() - start
            logger.info(
                "%s completed in %.2fs",
                func.__name__, duration,
                extra={'function': func.__name__, 'duration_seconds': round(duration, 3)},
            )
            return result
        except Exception as e:
            duration = time.monotonic() - start
            logger.error(
                "%s failed after %.2fs: %s",
                func.__name__, duration, e,
                extra={'function': func.__name__, 'duration_seconds': round(duration, 3)},
            )
            raise
    return wrapper`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — Generators ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Generators" />
        <SectionTitle>Generators — Processing Arbitrarily Large Data with Constant Memory</SectionTitle>

        <Para>
          A generator is a Python function that uses
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> yield</code> instead
          of <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>return</code>.
          Instead of computing all results and returning them at once, it produces
          one result at a time, pausing after each
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> yield</code> and
          resuming when the caller asks for the next value. This lazy evaluation is
          the key to processing datasets that are larger than available memory.
        </Para>

        <Para>
          Generators are one of the most underused Python features in data engineering
          pipelines. They transform memory-intensive batch operations into constant-memory
          streaming operations with minimal code changes.
        </Para>

        <CodeBox label="Generator vs list — the memory difference">{`# ── LIST: entire result computed and stored in memory ────────────────────────

def read_all_orders_as_list(filepath: str) -> list[dict]:
    orders = []
    with open(filepath) as f:
        for line in f:
            orders.append(json.loads(line))   # 10M rows → 10M dicts in RAM
    return orders   # returns when ALL rows are read

all_orders = read_all_orders_as_list('orders.ndjson')
# Memory: 10M rows × ~500 bytes/dict = 5 GB RAM just for the list
# If machine has 4 GB RAM → MemoryError


# ── GENERATOR: one item at a time, constant memory ───────────────────────────

def read_orders_from_file(filepath: str):  # no type hint on return — it's a generator
    """Yield one order at a time from an NDJSON file."""
    with open(filepath, encoding='utf-8') as f:
        for line_num, line in enumerate(f, start=1):
            line = line.strip()
            if not line:
                continue
            try:
                yield json.loads(line)
            except json.JSONDecodeError as e:
                logger.warning("Skipping invalid JSON on line %d: %s", line_num, e)
                continue

# Memory: only ONE dict in RAM at a time regardless of file size
for order in read_orders_from_file('orders.ndjson'):
    process_order(order)   # process and discard before reading next
    # 10M rows, 4 GB file → uses ~1 KB RAM throughout`}</CodeBox>

        <SubTitle>Generator pipelines — chaining transformations lazily</SubTitle>

        <CodeBox label="Chaining generators — a complete lazy pipeline">{`from typing import Iterator
import json

# Each function is a generator that transforms a stream of records

def read_ndjson(filepath: str) -> Iterator[dict]:
    """Source: yield one record at a time from NDJSON file."""
    with open(filepath, encoding='utf-8') as f:
        for line in f:
            if line.strip():
                yield json.loads(line)


def validate_orders(records: Iterator[dict]) -> Iterator[dict]:
    """Filter: yield only valid records."""
    for record in records:
        if record.get('order_id') and record.get('amount', 0) > 0:
            yield record
        else:
            logger.warning("Invalid record skipped", extra={'record_id': record.get('order_id')})


def transform_orders(records: Iterator[dict]) -> Iterator[dict]:
    """Transform: yield records with normalised fields."""
    for record in records:
        yield {
            'order_id':    int(record['order_id']),
            'customer_id': int(record['customer_id']),
            'amount':      round(float(record['amount']), 2),
            'status':      record['status'].lower().strip(),
            'created_at':  pd.Timestamp(record['created_at']).tz_localize('UTC'),
        }


def batch_records(records: Iterator[dict], batch_size: int = 10_000) -> Iterator[list[dict]]:
    """Batch: collect records into batches for efficient bulk insert."""
    batch = []
    for record in records:
        batch.append(record)
        if len(batch) >= batch_size:
            yield batch
            batch = []
    if batch:          # yield the final partial batch
        yield batch


def write_batch(batch: list[dict], conn) -> None:
    """Sink: write one batch to the database."""
    with conn.cursor() as cur:
        values = [(r['order_id'], r['customer_id'], r['amount'],
                   r['status'], r['created_at']) for r in batch]
        cur.executemany(
            "INSERT INTO silver.orders VALUES (%s,%s,%s,%s,%s) "
            "ON CONFLICT (order_id) DO UPDATE SET status=EXCLUDED.status",
            values,
        )
    conn.commit()


# ── FULL PIPELINE — chain all generators together ─────────────────────────────

def run_pipeline(filepath: str, conn) -> None:
    """End-to-end pipeline using a chain of generators."""
    # Build the pipeline chain — nothing runs yet (all lazy)
    raw       = read_ndjson(filepath)
    valid     = validate_orders(raw)
    cleaned   = transform_orders(valid)
    batched   = batch_records(cleaned, batch_size=10_000)

    # Execution begins here — driven by the for loop
    for batch_num, batch in enumerate(batched, start=1):
        write_batch(batch, conn)
        logger.info("Batch %d written", batch_num, extra={'rows': len(batch)})

# Memory usage: constant ~10k records in RAM at any time
# regardless of how many total records are in the file`}</CodeBox>

        <SubTitle>Generator expressions — one-line generators</SubTitle>

        <CodeBox label="Generator expressions — concise single-line generators">{`# List comprehension: builds entire list in memory
squares_list = [x**2 for x in range(10_000_000)]   # ~80 MB

# Generator expression: produces one value at a time
squares_gen  = (x**2 for x in range(10_000_000))   # ~200 bytes

# Use generator expression when you only need to iterate once:
total = sum(x**2 for x in range(10_000_000))        # no list built

# Filter with generator expression:
valid_amounts = (
    row['amount']
    for row in read_orders_from_file('orders.ndjson')
    if row['status'] == 'delivered' and row['amount'] > 0
)

revenue = sum(valid_amounts)    # sum the entire file with constant memory

# Chain multiple generator expressions:
pipeline = (
    transform(record)
    for record in (
        validate(raw)
        for raw in read_ndjson('input.ndjson')
    )
    if transform(record) is not None
)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Environment Variables and Config ───────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Config Management" />
        <SectionTitle>Environment Variables and Configuration — Never Hardcode Secrets</SectionTitle>

        <Para>
          Credentials — database passwords, API keys, cloud storage secrets —
          must never appear in source code. Source code is committed to Git,
          shared with colleagues, and sometimes accidentally made public. A single
          hardcoded secret in a commit history can compromise an entire system.
        </Para>

        <CodeBox label="Configuration management — the correct patterns">{`import os
from dataclasses import dataclass
from typing import Optional
from pathlib import Path

# ── PATTERN 1: os.environ with explicit missing key handling ─────────────────

DATABASE_URL = os.environ['DATABASE_URL']        # raises KeyError if missing
API_KEY      = os.environ.get('API_KEY', '')     # returns '' if missing (silent — BAD)
API_KEY      = os.environ['API_KEY']             # always prefer this — fail loud if missing


# ── PATTERN 2: Pydantic settings (production standard) ───────────────────────
# pip install pydantic-settings

from pydantic_settings import BaseSettings

class PipelineConfig(BaseSettings):
    """
    All config values read from environment variables.
    Pydantic validates types and raises clear errors on missing required values.
    """
    # Database
    db_host:     str
    db_port:     int   = 5432
    db_name:     str
    db_user:     str
    db_password: str   # reads from DB_PASSWORD env var

    # Source API
    api_base_url: str
    api_key:      str           # reads from API_KEY env var
    api_timeout:  int = 30

    # Pipeline behaviour
    batch_size:       int   = 10_000
    max_retries:      int   = 5
    enable_dlq:       bool  = True
    output_s3_bucket: str

    # Optional with defaults
    log_level: str = 'INFO'

    class Config:
        env_file = '.env'           # load from .env file in development
        env_file_encoding = 'utf-8'
        case_sensitive = False      # DB_HOST and db_host both work


config = PipelineConfig()   # fails with clear error if any required var is missing

# Usage:
conn_string = (
    f"postgresql://{config.db_user}:{config.db_password}"
    f"@{config.db_host}:{config.db_port}/{config.db_name}"
)


# ── .env FILE (for local development only — NEVER commit to Git) ─────────────

# .env (add to .gitignore):
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=orders_dev
# DB_USER=pipeline_user
# DB_PASSWORD=localdevpassword123
# API_KEY=test_key_for_development
# API_BASE_URL=https://api.example.com
# OUTPUT_S3_BUCKET=dev-data-lake


# ── SECRETS IN PRODUCTION: cloud secret managers ─────────────────────────────

# AWS Secrets Manager:
import boto3
import json

def get_secret(secret_name: str, region: str = 'ap-south-1') -> dict:
    client = boto3.client('secretsmanager', region_name=region)
    response = client.get_secret_value(SecretId=secret_name)
    return json.loads(response['SecretString'])

# Azure Key Vault:
from azure.keyvault.secrets import SecretClient
from azure.identity import DefaultAzureCredential

def get_azure_secret(vault_url: str, secret_name: str) -> str:
    client = SecretClient(vault_url=vault_url, credential=DefaultAzureCredential())
    return client.get_secret(secret_name).value`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Writing Testable Code ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Writing Testable Pipeline Code" />
        <SectionTitle>Testable Code — Writing Pipelines That Can Be Unit Tested</SectionTitle>

        <Para>
          Pipeline code that cannot be unit tested is pipeline code that gets deployed
          with bugs. The most common reason pipeline code is untestable is that
          business logic is mixed with I/O — the transformation logic that should be
          testable is entangled with database connections, file reads, and API calls
          that require external services to run.
        </Para>

        <Para>
          The solution is pure functions for business logic. A pure function takes
          input values and returns output values. It has no side effects — no file
          reads, no database writes, no network calls. Pure functions are trivially
          testable. You call them with known inputs and assert the output.
        </Para>

        <CodeBox label="Untestable vs testable — separating logic from I/O">{`# ── UNTESTABLE: business logic mixed with I/O ────────────────────────────────

def process_orders():                           # no inputs — depends on external state
    conn = psycopg2.connect(os.environ['DB'])   # I/O in the function
    df = pd.read_csv('orders.csv')             # I/O in the function

    # Business logic entangled with I/O:
    df = df[df['amount'] > 0]
    df['status'] = df['status'].str.lower()
    df['created_at'] = pd.to_datetime(df['created_at'], utc=True)

    df.to_sql('orders', conn, if_exists='append')  # I/O in the function
    conn.close()

# Cannot test this without: a database, a file on disk, env vars set
# Cannot test edge cases (what if amount is 0? what if created_at is null?)


# ── TESTABLE: pure transformation functions separated from I/O ────────────────

# Pure function — can be tested with just Python, no external dependencies
def clean_orders(df: pd.DataFrame) -> pd.DataFrame:
    """
    Clean and validate orders DataFrame.
    Pure function: takes DataFrame, returns DataFrame.
    No I/O, no side effects.
    """
    df = df.copy()

    # Remove rows with invalid amount
    initial_count = len(df)
    df = df[df['amount'] > 0]
    removed = initial_count - len(df)
    if removed > 0:
        logger.warning("Removed %d rows with amount <= 0", removed)

    # Normalise status to lowercase
    df['status'] = df['status'].str.lower().str.strip()

    # Validate status values
    valid_statuses = {'placed', 'confirmed', 'delivered', 'cancelled'}
    invalid_mask = ~df['status'].isin(valid_statuses)
    if invalid_mask.any():
        invalid_values = df[invalid_mask]['status'].unique()
        logger.warning("Invalid status values found: %s", invalid_values)
        df = df[~invalid_mask]

    # Normalise timestamps to UTC
    df['created_at'] = pd.to_datetime(df['created_at'], utc=True, errors='coerce')
    df = df.dropna(subset=['created_at'])   # drop rows where timestamp could not be parsed

    return df


# I/O functions — thin wrappers around data sources/sinks
def load_orders_from_csv(filepath: str) -> pd.DataFrame:
    """Read orders CSV. Only I/O — no business logic."""
    return pd.read_csv(filepath, dtype={'order_id': 'int64', 'amount': 'float64'})

def write_orders_to_db(df: pd.DataFrame, conn) -> None:
    """Write orders to database. Only I/O — no business logic."""
    df.to_sql('silver_orders', conn, if_exists='append', index=False)


# Orchestration — thin function that wires I/O and logic together
def run_orders_pipeline(filepath: str, conn) -> None:
    raw = load_orders_from_csv(filepath)
    clean = clean_orders(raw)                # pure function — testable
    write_orders_to_db(clean, conn)


# ── UNIT TESTS ────────────────────────────────────────────────────────────────
import pytest
import pandas as pd

def test_clean_orders_removes_negative_amounts():
    input_df = pd.DataFrame({
        'order_id': [1, 2, 3],
        'amount':   [380.0, -50.0, 0.0],
        'status':   ['delivered', 'placed', 'cancelled'],
        'created_at': ['2026-03-17', '2026-03-17', '2026-03-17'],
    })
    result = clean_orders(input_df)
    assert len(result) == 1
    assert result.iloc[0]['order_id'] == 1

def test_clean_orders_normalises_status():
    input_df = pd.DataFrame({
        'order_id': [1],
        'amount':   [380.0],
        'status':   ['  DELIVERED  '],    # uppercase with whitespace
        'created_at': ['2026-03-17'],
    })
    result = clean_orders(input_df)
    assert result.iloc[0]['status'] == 'delivered'

def test_clean_orders_removes_invalid_status():
    input_df = pd.DataFrame({
        'order_id': [1, 2],
        'amount':   [380.0, 220.0],
        'status':   ['delivered', 'deliverd'],  # typo in second
        'created_at': ['2026-03-17', '2026-03-17'],
    })
    result = clean_orders(input_df)
    assert len(result) == 1   # typo row removed

def test_clean_orders_drops_unparseable_timestamps():
    input_df = pd.DataFrame({
        'order_id': [1, 2],
        'amount':   [380.0, 220.0],
        'status':   ['delivered', 'placed'],
        'created_at': ['2026-03-17', 'not-a-date'],
    })
    result = clean_orders(input_df)
    assert len(result) == 1`}</CodeBox>

        <SubTitle>Mocking external dependencies</SubTitle>

        <CodeBox label="Mocking — testing pipeline code without real databases or APIs">{`from unittest.mock import patch, MagicMock, call
import pytest
import requests

# ── MOCK AN API CALL ──────────────────────────────────────────────────────────

def fetch_order_from_api(order_id: int) -> dict:
    """Fetch order details from external API."""
    response = requests.get(
        f'https://api.example.com/orders/{order_id}',
        headers={'Authorization': f'Bearer {os.environ["API_TOKEN"]}'},
        timeout=30,
    )
    response.raise_for_status()
    return response.json()


@patch('requests.get')     # replaces requests.get with a mock during this test
def test_fetch_order_success(mock_get):
    # Configure the mock to return a specific response
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = {
        'order_id': 9284751, 'amount': 380.00, 'status': 'delivered'
    }
    mock_get.return_value = mock_response

    result = fetch_order_from_api(9284751)

    assert result['order_id'] == 9284751
    assert result['amount'] == 380.00
    mock_get.assert_called_once()    # verify it was called exactly once


@patch('requests.get')
def test_fetch_order_handles_timeout(mock_get):
    mock_get.side_effect = requests.exceptions.Timeout("Connection timed out")

    with pytest.raises(requests.exceptions.Timeout):
        fetch_order_from_api(9284751)


# ── MOCK A DATABASE CONNECTION ────────────────────────────────────────────────

@patch('psycopg2.connect')
def test_pipeline_writes_to_database(mock_connect):
    mock_conn    = MagicMock()
    mock_cursor  = MagicMock()
    mock_connect.return_value.__enter__ = lambda s: mock_conn
    mock_conn.cursor.return_value.__enter__ = lambda s: mock_cursor

    df = pd.DataFrame({
        'order_id': [1, 2],
        'amount': [380.0, 220.0],
        'status': ['delivered', 'placed'],
    })

    write_orders_to_db(df, mock_conn)

    # Verify the cursor was used for writing
    assert mock_cursor.execute.called or mock_cursor.executemany.called`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 09 — Type Hints and Dataclasses ─────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Type Hints and Data Validation" />
        <SectionTitle>Type Hints and Pydantic — Catching Bugs Before Runtime</SectionTitle>

        <Para>
          Python is dynamically typed — variables do not have declared types.
          This flexibility becomes a liability in data pipelines where a function
          that receives the wrong type silently produces wrong results instead of
          failing loudly. Type hints and validation libraries catch these problems
          at development time rather than 3 AM in production.
        </Para>

        <CodeBox label="Type hints and Pydantic validation — production-grade data models">{`from __future__ import annotations
from typing import Optional, Iterator
from datetime import datetime
from decimal import Decimal
from enum import Enum
from pydantic import BaseModel, validator, Field
import pandas as pd


# ── TYPE HINTS: document what functions expect and return ─────────────────────

def process_batch(
    records:    list[dict],             # list of dicts
    batch_size: int = 10_000,
) -> Iterator[list[dict]]:              # returns an iterator of lists
    ...


def fetch_page(
    cursor:     str | None,             # str or None (Python 3.10+ syntax)
    start_date: str,
) -> tuple[list[dict], str | None]:    # returns (records, next_cursor)
    ...


# ── PYDANTIC: validate and parse data at the boundary ─────────────────────────
# pip install pydantic

class OrderStatus(str, Enum):
    PLACED    = 'placed'
    CONFIRMED = 'confirmed'
    DELIVERED = 'delivered'
    CANCELLED = 'cancelled'


class Order(BaseModel):
    """Validated order model — Pydantic raises ValidationError on invalid data."""
    order_id:    int                 = Field(..., gt=0)        # required, > 0
    customer_id: int                 = Field(..., gt=0)
    amount:      Decimal             = Field(..., gt=0, decimal_places=2)
    status:      OrderStatus                                   # must be valid enum
    promo_code:  Optional[str]       = None                    # optional
    created_at:  datetime                                      # parsed from string

    @validator('amount', pre=True)
    def coerce_amount(cls, v):
        """Accept string amounts and convert to Decimal."""
        if isinstance(v, str):
            v = v.replace('₹', '').replace(',', '').strip()
        return Decimal(str(v))

    @validator('created_at', pre=True)
    def parse_timestamp(cls, v):
        """Accept multiple timestamp formats."""
        if isinstance(v, datetime):
            return v
        try:
            return pd.Timestamp(v).to_pydatetime()
        except Exception:
            raise ValueError(f"Cannot parse timestamp: {v!r}")


# Usage:
try:
    order = Order(
        order_id=9284751,
        customer_id=4201938,
        amount='₹3,80.00',          # messy real-world format — coerced by validator
        status='delivered',
        created_at='2026-03-17T20:14:32+05:30',
    )
    # order.amount == Decimal('380.00')
    # order.status == OrderStatus.DELIVERED
    # order.created_at == datetime(2026, 3, 17, 20, 14, 32, ...)

except ValueError as e:
    logger.error("Validation failed: %s", e)
    dlq.write(raw_record, e)


# VALIDATE A BATCH:
def parse_orders(raw_records: list[dict]) -> tuple[list[Order], list[dict]]:
    """Parse and validate a batch. Returns (valid_orders, failed_records)."""
    valid, failed = [], []
    for raw in raw_records:
        try:
            valid.append(Order(**raw))
        except ValueError as e:
            failed.append({'record': raw, 'error': str(e)})
    return valid, failed`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 10 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Complete Production-Grade API Ingestion Pipeline</SectionTitle>

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
            Complete pipeline — Stripe payments ingestion
          </div>

          <Para>
            Here is what a real production-quality API ingestion pipeline looks like
            when all the patterns from this module are applied together. This pipeline
            fetches payments from the Stripe API, validates them, and loads them
            into a PostgreSQL Silver layer table.
          </Para>

          <CodeBox label="Complete production pipeline — all patterns combined">{`"""
Stripe Payments Ingestion Pipeline
Fetches payments from API → validates → loads to PostgreSQL silver layer
"""
import os
import json
import time
import logging
import uuid
from decimal import Decimal
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterator

import requests
import psycopg2
from psycopg2.extras import execute_values
from pydantic import BaseModel, validator, Field
from pydantic_settings import BaseSettings


# ── Configuration ──────────────────────────────────────────────────────────────
class Config(BaseSettings):
    razorpay_key_id:     str
    razorpay_key_secret: str
    db_url:              str
    batch_size:          int = 5_000
    max_retries:         int = 5
    dlq_path:            str = '/data/dlq/payments.ndjson'

    class Config:
        env_file = '.env'

config = Config()
RUN_ID = str(uuid.uuid4())


# ── Logging ────────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format='{"ts":"%(asctime)s","level":"%(levelname)s","run_id":"' + RUN_ID + '","msg":"%(message)s"}',
)
logger = logging.getLogger('razorpay_ingestion')


# ── Data Model ─────────────────────────────────────────────────────────────────
class Payment(BaseModel):
    payment_id:   str
    merchant_id:  str
    amount:       Decimal = Field(..., gt=0)
    currency:     str     = 'INR'
    status:       str
    method:       str
    captured_at:  datetime | None = None

    @validator('amount', pre=True)
    def coerce_paise_to_rupees(cls, v):
        return Decimal(str(v)) / 100   # Stripe sends amounts in paise


# ── Dead Letter Queue ─────────────────────────────────────────────────────────
dlq_path = Path(config.dlq_path)
dlq_path.parent.mkdir(parents=True, exist_ok=True)

def send_to_dlq(record: dict, error: Exception) -> None:
    entry = {'ts': datetime.utcnow().isoformat(), 'error': str(error), 'record': record}
    with open(dlq_path, 'a') as f:
        f.write(json.dumps(entry) + '\n')


# ── API Fetching ───────────────────────────────────────────────────────────────
def fetch_payments(
    from_timestamp: int,
    to_timestamp: int,
) -> Iterator[dict]:
    """Fetch all payments in time range using cursor pagination with retries."""
    cursor = None
    page   = 0

    while True:
        params = {'from': from_timestamp, 'to': to_timestamp, 'count': 100}
        if cursor:
            params['cursor'] = cursor

        # Retry loop for transient failures
        for attempt in range(1, config.max_retries + 1):
            try:
                resp = requests.get(
                    'https://api.razorpay.com/v1/payments',
                    auth=(config.razorpay_key_id, config.razorpay_key_secret),
                    params=params,
                    timeout=30,
                )
                if resp.status_code == 429:
                    wait = int(resp.headers.get('Retry-After', 2 ** attempt))
                    logger.warning("Rate limited, waiting %ds", wait)
                    time.sleep(wait)
                    continue
                resp.raise_for_status()
                break
            except requests.exceptions.Timeout:
                if attempt == config.max_retries:
                    raise
                time.sleep(2 ** attempt)

        data  = resp.json()
        items = data.get('items', [])
        page += 1
        logger.info("Fetched page %d: %d payments", page, len(items))

        for item in items:
            yield item

        cursor = data.get('cursor')
        if not cursor or not items:
            break


# ── Transformation ─────────────────────────────────────────────────────────────
def transform_payments(raw: Iterator[dict]) -> Iterator[Payment]:
    """Validate and transform raw API records."""
    for record in raw:
        try:
            yield Payment(**record)
        except Exception as e:
            send_to_dlq(record, e)
            logger.warning("Record sent to DLQ: %s", e)


# ── Loading ────────────────────────────────────────────────────────────────────
def batch_and_load(
    payments: Iterator[Payment],
    conn,
) -> tuple[int, int]:
    """Batch payments and upsert into PostgreSQL. Returns (loaded, dlq_count)."""
    loaded = dlq_count = 0
    batch: list[Payment] = []

    def flush_batch(b: list[Payment]) -> int:
        rows = [(
            p.payment_id, p.merchant_id, float(p.amount),
            p.currency, p.status, p.method, p.captured_at,
        ) for p in b]
        with conn.cursor() as cur:
            execute_values(cur, """
                INSERT INTO silver.payments
                    (payment_id, merchant_id, amount, currency, status, method, captured_at)
                VALUES %s
                ON CONFLICT (payment_id) DO UPDATE SET
                    status = EXCLUDED.status,
                    captured_at = EXCLUDED.captured_at
            """, rows)
        conn.commit()
        return len(rows)

    for payment in payments:
        batch.append(payment)
        if len(batch) >= config.batch_size:
            loaded += flush_batch(batch)
            logger.info("Batch loaded: %d total rows written", loaded)
            batch = []

    if batch:
        loaded += flush_batch(batch)

    return loaded, dlq_count


# ── Main ───────────────────────────────────────────────────────────────────────
def run(from_ts: int, to_ts: int) -> None:
    logger.info("Pipeline started", )
    start = time.monotonic()

    with psycopg2.connect(config.db_url) as conn:
        raw      = fetch_payments(from_ts, to_ts)
        valid    = transform_payments(raw)
        loaded, dlq_count = batch_and_load(valid, conn)

    duration = time.monotonic() - start
    logger.info(
        "Pipeline complete | loaded=%d dlq=%d duration=%.1fs",
        loaded, dlq_count, duration,
    )`}</CodeBox>
        </div>
      </section>

      <Divider />

      {/* ── Part 11 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. How would you process a 50 GB CSV file in Python without running out of memory?',
            a: `The key is to never load the entire file into memory at once. Instead, read and process the file in chunks.

Pandas provides a chunksize parameter to read_csv that returns a TextFileReader iterator. When you iterate over it, each iteration yields a DataFrame containing at most chunk_size rows — the file is read lazily, page by page, rather than all at once. The memory usage at any point is proportional to one chunk, not the total file size.

For a 50 GB file, I would set chunk_size to around 100,000 rows, which typically consumes 50–200 MB of RAM per chunk depending on the data width. Within each chunk, I apply transformations and write the results to the destination (database or Parquet file) before loading the next chunk. At the end, only one chunk is in memory.

For even more memory efficiency, I would convert the CSV to Parquet first using PyArrow's CSV-to-Parquet conversion which streams through the file in a single pass, then read the Parquet file using PyArrow's dataset API which supports columnar projection (read only the columns needed) and predicate pushdown (skip row groups that do not match filters).

The deeper principle is the generator pattern: rather than building a complete in-memory collection and then processing it, use lazy iterators that produce one item at a time. Every stage of the pipeline — read, validate, transform, write — passes one record or one batch at a time, keeping memory usage constant regardless of input file size.`,
          },
          {
            q: 'Q2. What is exponential backoff with jitter and why does data engineering use it for retries?',
            a: `Exponential backoff is a retry strategy where each successive retry waits longer than the previous one, with the wait time growing exponentially — typically doubling each time. If the first retry waits 1 second, the second waits 2 seconds, the third waits 4 seconds, and so on up to a configured maximum.

The rationale is that if a request failed, the failure is likely due to the remote system being overloaded or temporarily unavailable. Retrying immediately often hits the same overloaded system and fails again. Waiting progressively longer gives the remote system time to recover before the next attempt.

Jitter adds random variation to each retry delay. Without jitter, if 100 pipeline instances all fail at the same moment — say, during a database maintenance window — they all enter exponential backoff simultaneously. When the maintenance window ends, all 100 retry at exactly the same time (1s, then 2s, then 4s), creating a thundering herd that immediately re-overloads the system. With jitter, each instance waits a slightly different amount — 0.8s, 1.3s, 0.6s — spreading the retry load over time.

In data engineering, exponential backoff with jitter is important because pipeline failures are often correlated — many pipeline instances run on the same schedule, connect to the same source systems, and fail for the same reasons simultaneously. Jitter prevents the retry storm that would otherwise follow a shared failure.`,
          },
          {
            q: 'Q3. Why should business logic be separated from I/O in pipeline code?',
            a: `Separating business logic from I/O is the single change that makes pipeline code testable. The problem with mixing them is that I/O operations — database connections, file reads, API calls — require external systems to be running in order to test anything. You cannot run a unit test for a transformation function if it also reads from a database, because you need the database to be available, populated with test data, and accessible from the test environment.

When business logic is in pure functions — functions that take input data and return output data with no side effects — testing is trivial. You create a small DataFrame with known values, call the function, and assert the output. No database, no files, no network. The test runs in milliseconds and can be run by any developer on any machine.

The practical pattern is three layers. Pure transformation functions contain all business logic: filter out invalid records, normalise text fields, calculate derived values, apply business rules. These are unit-tested exhaustively. I/O functions are thin wrappers that read from sources and write to destinations — they contain no logic, just the mechanics of the I/O operation. These are integration-tested separately. Orchestration functions wire the I/O and transformation layers together — they call the reader, pass the result to the transformer, and pass the transformed result to the writer.

This pattern also makes it easy to swap out the I/O layer without changing the business logic. When you need to change from reading a CSV file to reading from an API, only the reader function changes — the transformation logic is untouched.`,
          },
          {
            q: 'Q4. What is the difference between logging at DEBUG, INFO, WARNING, and ERROR levels? Give an example of each from a pipeline.',
            a: `Log levels represent the severity and intended audience of each log message.

DEBUG is the most detailed level — messages about the internal state of the program that are useful when diagnosing a specific problem but would be too verbose to log in production. Examples: "Fetching page 47 with cursor abc123", "Row data: {order_id: 9284751, amount: 380.00}". Debug logs are typically disabled in production (set log level to INFO) and enabled temporarily when investigating an issue.

INFO confirms that normal operations are proceeding as expected. These messages should be meaningful and not too frequent. Examples: "Pipeline started for date 2026-03-17", "Batch 15 of 42 completed: 10,000 rows written in 2.3s", "Pipeline finished: 420,000 total rows in 94.7 seconds". INFO logs are what you read to understand what a pipeline did during a run.

WARNING signals something unexpected happened but the pipeline recovered and continued. Examples: "Row skipped — status value 'deliverd' is not in the valid set", "Rate limited by API, waiting 15 seconds before retry", "Retry attempt 2 of 5 after connection timeout". Warnings should be investigated — they often indicate data quality issues or system instability that will eventually cause failures.

ERROR indicates a failure that requires attention. The pipeline may have continued by writing the failed record to a dead letter queue, or it may have aborted. Examples: "Record could not be processed after 5 retries, sent to dead letter queue: {order_id: 9284751}", "Database constraint violation: CHECK constraint chk_order_amount failed". Errors must be investigated and resolved.`,
          },
          {
            q: 'Q5. How would you handle an API that returns a different number of records on the same request when retried? How do you ensure your data is complete?',
            a: `This behaviour — different record counts on the same request — indicates the API is returning real-time data or has eventual consistency. There are two common causes: the API is returning live data that changes between requests, so new records were added between the first and second call; or the API has a bug where its pagination is not stable.

For a data ingestion pipeline, this means a simple "retry if count does not match" strategy will never terminate on a live API. Instead, I would use a different approach based on the nature of the data.

If the data is append-only and time-bounded — like transaction events — I would use a fixed time window for each pipeline run. Request all records where created_at is between 00:00:00 and 23:59:59 for yesterday UTC. This window is fixed — even if the API returns slightly different counts across retries due to in-progress transactions, the window closes at midnight and the count stabilises. I would run the pipeline with a small delay (6–12 hours) after the day ends to allow all in-progress transactions to settle.

If the API supports cursor-based pagination, I would rely on the cursor position rather than total record counts. Each page is fetched until no more cursors are returned. If a retry starts from a saved cursor, it continues from that position, not from the beginning — avoiding both missing data and duplicates.

For completeness verification, I would reconcile against an authoritative total after ingestion. Many financial APIs provide a summary endpoint that returns the total count or sum for a time period. After ingesting, I compare my count against this summary. If they differ, I log a warning and potentially re-fetch the affected time window. In the destination table, I add a UNIQUE constraint on the external ID so duplicate records from retries are handled by ON CONFLICT DO NOTHING rather than creating duplicates.`,
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
            error: `MemoryError: Unable to allocate 48.3 GiB for array — pd.read_csv('orders.csv') on a 50 GB file`,
            cause: 'pd.read_csv() without a chunksize argument loads the entire file into memory at once. On a machine with less RAM than the file size, Python requests more virtual memory than the OS can provide and raises MemoryError. Even if the machine has enough RAM, loading the entire file may evict other processes\' memory pages and cause system-wide slowdown.',
            fix: 'Use pd.read_csv(filepath, chunksize=100_000) which returns a TextFileReader iterator. Iterate over it, processing and discarding each chunk before the next is loaded. Maximum RAM usage becomes proportional to one chunk size (~100MB) rather than the total file size. For even better performance on repeated reads, convert the CSV to Parquet first — Parquet supports columnar projection and predicate pushdown, reducing I/O significantly.',
          },
          {
            error: `requests.exceptions.JSONDecodeError: Expecting value: line 1 column 1 (char 0) — response.json() after a requests.get() call`,
            cause: 'The API returned a non-JSON response — likely an HTML error page, a plain text error message, or an empty response body. This commonly happens when the API returns a 5xx server error with an HTML error page, when a rate limit is hit and the API returns a plain text "too many requests" message, or when the request timed out and the response body is empty.',
            fix: 'Always check response.status_code before calling response.json(). Use response.raise_for_status() to raise an HTTPError for 4xx and 5xx responses before attempting to parse. If you need to inspect the response body on error: print(response.text) to see the actual content. Add defensive parsing: try: data = response.json() except ValueError: logger.error("Non-JSON response: %s", response.text[:500]); raise.',
          },
          {
            error: `StopIteration: generator raised StopIteration inside a generator function`,
            cause: 'A generator function contains a call to next() on another iterator without a default value, and that iterator is exhausted. In Python 3.7+, a StopIteration raised inside a generator is converted to a RuntimeError. This often happens when manually calling next() inside generator code instead of using a for loop.',
            fix: 'Replace manual next() calls inside generators with for loops: instead of value = next(some_iterator), use for value in some_iterator. If you genuinely need to get the next item once and stop, use: value = next(some_iterator, None) with a sentinel default, then check if value is None. Alternatively, wrap the next() call in a try/except StopIteration block.',
          },
          {
            error: `json.decoder.JSONDecodeError: Extra data: line 2 column 1 (char 47) — when parsing a JSON file`,
            cause: 'The file contains multiple JSON objects written one after another without a containing array — this is valid NDJSON (one object per line) but not valid JSON. json.loads() expects a single complete JSON document. Trying to parse an NDJSON file as a single JSON document fails because there is "extra data" after the first complete object.',
            fix: 'NDJSON files must be parsed line by line: with open(filepath) as f: for line in f: record = json.loads(line.strip()). Do not use json.load(f) or json.loads(f.read()) on NDJSON files. Alternatively, use pandas: pd.read_json(filepath, lines=True) reads NDJSON files correctly. Always clarify whether a .json file is a single JSON document or NDJSON before choosing the parsing approach.',
          },
          {
            error: `WARNING: No handlers could be found for logger "pipeline_name" — log messages are silently dropped`,
            cause: 'A logger was created with logging.getLogger() but no handlers were added to it, and no root logger handler exists. Without a handler, log records are created internally but have nowhere to go — they are silently discarded. This often happens when logging.basicConfig() was not called or was called after the first log message was emitted.',
            fix: 'Call logging.basicConfig() at the start of the script before any logging calls: logging.basicConfig(level=logging.INFO, stream=sys.stdout). Or add a handler explicitly to the logger: handler = logging.StreamHandler(); logger.addHandler(handler). In production pipelines, set up logging in a dedicated setup_logging() function called at the very start of main(). Verify logging is working by adding a test message immediately after setup and confirming it appears in the output.',
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
        'Never load large files entirely into memory. Use pd.read_csv(chunksize=100_000) to process in chunks, or use PyArrow datasets for columnar projection and predicate pushdown. Memory usage should be constant regardless of file size.',
        'REST API ingestion requires handling three things beyond a simple GET call: pagination (offset, cursor, or next-URL patterns), authentication (API keys or OAuth tokens read from environment variables, never hardcoded), and rate limiting (detect 429 responses, respect Retry-After headers, use proactive rate limiters).',
        'Distinguish transient from permanent errors before deciding whether to retry. Transient errors (timeouts, 503, connection reset) should be retried with exponential backoff and jitter. Permanent errors (validation failures, 401, 404) should fail immediately — retrying wastes time and can cause harm.',
        'Exponential backoff with jitter prevents thundering herds: multiple pipeline instances that fail simultaneously retry at slightly different times, spreading load instead of all hitting the recovered system at once.',
        'Structured logging (JSON output with defined fields) makes logs searchable and alertable in log management tools. Every log entry should include run_id, pipeline name, and relevant metrics. Never log PII or secrets. Never use print() in pipeline code.',
        'Generators (functions using yield) process arbitrarily large data with constant memory. Each item is produced on demand and discarded after processing. Chain multiple generators together to build a lazy pipeline where data flows one record at a time from source to sink.',
        'Separate business logic from I/O. Pure transformation functions take data in, return data out, with no file reads or database connections. These are trivially unit-testable. I/O functions are thin wrappers. Orchestration wires them together. This structure makes the most critical code — the transformation logic — testable without any external dependencies.',
        'Read secrets from environment variables or cloud secret managers. Never hardcode passwords, API keys, or connection strings in source code. Use Pydantic BaseSettings to validate all configuration at startup — fail loudly on missing required config rather than failing mysteriously at runtime.',
        'Pydantic models validate and parse data at the boundary between external systems and your pipeline. Define explicit data models with type constraints, validators for messy real-world formats, and clear error messages. Validation failures go to the dead letter queue, not to the database.',
        'Dead letter queues are essential for production pipelines. When a record fails all retries, write it to a DLQ file with the error context and continue processing the rest. Never silently discard failed records and never halt an entire pipeline because one record is bad.',
      ]} />

    </LearnLayout>
  )
}