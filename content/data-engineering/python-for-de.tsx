import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Python for Data Engineering — Data Engineering | Chaduvuko',
  description:
    'Not Python 101. Python for pipelines — file I/O at scale, REST API calls, error handling, structured logging, generators for memory efficiency, config management, and writing testable pipeline code.',
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

const Output = ({ children }: { children: string }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{
      fontSize: 10, fontWeight: 700, color: 'var(--muted)',
      letterSpacing: '.1em', textTransform: 'uppercase',
      marginBottom: 6, fontFamily: 'var(--font-mono)',
      display: 'flex', alignItems: 'center', gap: 6,
    }}>
      <span style={{ opacity: 0.6 }}>▸</span> output
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

const Table = ({ head, rows }: { head: string[]; rows: string[][] }) => (
  <div style={{ overflowX: 'auto', marginBottom: 24 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
      <thead>
        <tr>
          {head.map((h, i) => (
            <th key={i} style={{
              textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 700,
              color: 'var(--muted)', letterSpacing: '.06em', textTransform: 'uppercase',
              borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)',
            }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} style={{ borderBottom: ri < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
            {row.map((cell, ci) => (
              <td key={ci} style={{
                padding: '10px 14px', color: ci === 0 ? 'var(--text)' : 'var(--muted)',
                fontFamily: ci === 0 ? 'var(--font-mono)' : 'inherit',
                fontWeight: ci === 0 ? 600 : 400, lineHeight: 1.6, verticalAlign: 'top',
              }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default function PythonForDEModule() {
  return (
    <LearnLayout
      title="Python for Data Engineering"
      description="File I/O at scale, error handling, structured logging, generators, config management, and writing testable pipeline code — built around one running pipeline."
      section="Data Engineering — Module 14"
      readTime="80 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 — This Is Not Python 101 ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — This Is Not Python 101" />
        <SectionTitle>What Python for Data Engineering Actually Looks Like</SectionTitle>

        <Para>
          Python for data engineering is not the same as Python for web development,
          data science, or automation scripting. The patterns, the error-handling
          discipline, the memory constraints, and the testing approach are all
          different. A data scientist&rsquo;s notebook that works perfectly for exploring
          a sample becomes a 3 AM production disaster when it runs unattended against
          the full 50 GB dataset.
        </Para>

        <Para>
          This module is built around one running example: <strong>FreshCart</strong>,
          the same 40-store grocery chain from the Linux and Working with APIs
          modules. Every night, each store&rsquo;s point-of-sale system drops an orders
          export into blob storage — anywhere from 50 MB on a slow Tuesday to 6 GB on
          the Saturday before Thanksgiving. Your job is to build the Python that reads
          those files, cleans them, and loads them into the warehouse — reliably,
          every single night, without anyone watching it run.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 14,
          }}>
            The six skills this module builds — all inside one pipeline
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {[
              { num: '01', name: 'File I/O at scale', desc: 'Reading FreshCart’s 6 GB store exports without loading them entirely into memory.' },
              { num: '02', name: 'REST API calls', desc: 'A light touch on auth, pagination, and rate limits — Module 18 goes deep on this.' },
              { num: '03', name: 'Error handling & retries', desc: 'Distinguishing transient from permanent failures, retrying correctly.' },
              { num: '04', name: 'Structured logging', desc: 'Writing logs that are searchable, parseable, and useful at 3 AM.' },
              { num: '05', name: 'Generators', desc: 'Chaining read → validate → transform → load with constant memory.' },
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
          exception is. You do not need to be a Python expert. By the end of this
          module you will have built, piece by piece, a pipeline that could actually
          run in production.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 — File I/O at Scale ──────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — File I/O at Scale" />
        <SectionTitle>File I/O at Scale — Reading FreshCart&rsquo;s Store Exports</SectionTitle>

        <Para>
          The first thing most beginners do when they need to read a file in Python
          is load the entire thing into memory. For a 1 KB config file, that is fine.
          For a 6 GB CSV of Saturday&rsquo;s orders across 40 stores, it crashes the
          process — or worse, doesn&rsquo;t crash, and instead slows the whole machine to a
          crawl as the OS starts swapping memory to disk.
        </Para>

        <SubSubTitle>The naive read — and why it breaks on the big nights</SubSubTitle>

        <CodeBox label="orders_reader.py — loads the whole file at once">{`import pandas as pd

def load_orders_wrong(filepath: str) -> pd.DataFrame:
    df = pd.read_csv(filepath)   # reads the ENTIRE file into RAM before returning
    return df

load_orders_wrong('/data/freshcart/store_014_2026-03-21.csv')`}</CodeBox>

        <Output>{`Traceback (most recent call last):
  ...
MemoryError: Unable to allocate 5.8 GiB for an array with shape (48_200_000,) and data type object`}</Output>

        <Para>
          This works fine on a quiet Tuesday when the file is 50 MB. It fails the
          exact night it matters most — the Saturday before a holiday, when order
          volume (and file size) is highest and the business most needs the data on
          time. The fix is always the same: read in chunks, process chunk by chunk,
          and never hold more than one chunk in memory at once.
        </Para>

        <SubSubTitle>Chunked reading — constant memory regardless of file size</SubSubTitle>

        <CodeBox label="orders_reader.py — reads in fixed-size chunks">{`import pandas as pd

def process_orders_in_chunks(filepath: str, chunk_size: int = 100_000) -> None:
    """Process a large CSV file in memory-efficient chunks."""
    # chunksize turns read_csv into a lazy TextFileReader iterator —
    # nothing is read from disk until you iterate over it.
    chunk_iter = pd.read_csv(
        filepath,
        chunksize=chunk_size,
        dtype={'order_id': 'int64', 'store_id': 'int64', 'amount': 'float64', 'status': 'string'},
        parse_dates=['created_at'],
        na_values=['', 'NULL', 'N/A', '-'],
        on_bad_lines='warn',   # log malformed rows instead of crashing the whole run
    )

    rows_seen = 0
    for i, chunk in enumerate(chunk_iter, start=1):
        rows_seen += len(chunk)
        print(f"chunk {i}: {len(chunk):,} rows (running total: {rows_seen:,})")
        # ... clean, validate, write this chunk before the next one loads ...

process_orders_in_chunks('/data/freshcart/store_014_2026-03-21.csv')`}</CodeBox>

        <Output>{`chunk 1: 100,000 rows (running total: 100,000)
chunk 2: 100,000 rows (running total: 200,000)
chunk 3: 100,000 rows (running total: 300,000)
...
chunk 482: 40,120 rows (running total: 48,200,000)`}</Output>

        <Para>
          At any point in that loop, memory usage is proportional to one 100,000-row
          chunk — roughly 40&ndash;80 MB depending on column width — never the full 5.8 GB
          file. The same code handles a 50 MB file and a 6 GB file identically.
        </Para>

        <SubSubTitle>Parquet — when a store&rsquo;s export is too big for CSV to be practical</SubSubTitle>

        <Para>
          CSV chunking solves the memory problem, but it still means scanning every
          byte of the file even if you only need three of its twenty columns. Parquet
          is a columnar format: it stores each column separately with its own
          statistics, so a reader can skip whole sections of the file it doesn&rsquo;t need.
        </Para>

        <CodeBox label="orders_parquet.py — writing and reading with PyArrow">{`import pyarrow as pa
import pyarrow.parquet as pq
import pyarrow.dataset as ds

# Write partitioned by store and date — this is what makes later reads fast
table = pa.Table.from_pandas(orders_df)
pq.write_to_dataset(
    table,
    root_path='/data/freshcart/orders_parquet',
    partition_cols=['store_id', 'order_date'],
)

# Read back with COLUMN PROJECTION + PREDICATE PUSHDOWN:
# only 'order_id' and 'amount' are read off disk, and only for store 014
dataset = ds.dataset('/data/freshcart/orders_parquet', format='parquet', partitioning='hive')
table = dataset.to_table(
    columns=['order_id', 'amount'],
    filter=(ds.field('store_id') == 14) & (ds.field('order_date') == '2026-03-21'),
)
print(table.to_pandas().head())`}</CodeBox>

        <Output>{`   order_id  amount
0   9284751  380.00
1   9284752   45.50
2   9284753  112.75
3   9284754   28.00
4   9284755  205.30

# Read 2.1 MB off disk instead of the full 5.8 GB file —
# partition pruning skipped 39 stores, column projection skipped 18 columns.`}</Output>

        <SubSubTitle>Reading straight from cloud storage</SubSubTitle>

        <Para>
          FreshCart&rsquo;s store exports don&rsquo;t land on a local disk — they land in an S3
          bucket (or ADLS Gen2 container). Both <code>boto3</code> and the higher-level{' '}
          <code>fsspec</code>/<code>s3fs</code> libraries let you stream a remote file
          the same way you&rsquo;d stream a local one, without downloading the whole thing
          first.
        </Para>

        <CodeBox label="orders_s3.py — streaming a remote file in chunks">{`import boto3
import pandas as pd

s3 = boto3.client('s3')

def stream_orders_from_s3(bucket: str, key: str, chunk_size: int = 100_000):
    """Stream a CSV directly from S3 without downloading it to local disk first."""
    response = s3.get_object(Bucket=bucket, Key=key)
    body = response['Body']   # a botocore StreamingBody — file-like, reads lazily

    for chunk in pd.read_csv(body, chunksize=chunk_size):
        yield chunk

# Same pattern with fsspec — works across S3, ADLS, and GCS with one API:
import pandas as pd
df_iter = pd.read_csv('s3://freshcart-orders/store_014_2026-03-21.csv', chunksize=100_000)`}</CodeBox>

        <TryThis>
          Take any CSV file you have locally and run <code>pd.read_csv(path,
          chunksize=1000)</code> in a loop, printing <code>len(chunk)</code> each time.
          Then remove <code>chunksize</code> entirely and compare — for a small file
          there&rsquo;s no visible difference, which is exactly why this bug doesn&rsquo;t show up
          until the file that matters is big enough to break it.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 03 — REST API Calls (light touch) ───────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — REST API Calls" />
        <SectionTitle>Calling APIs From a Pipeline — The Short Version</SectionTitle>

        <Para>
          FreshCart&rsquo;s orders file tells you what was sold. It doesn&rsquo;t tell you which
          of those orders were later refunded — that lives in a separate payments API
          your pipeline needs to call for enrichment. This section covers just enough
          to make that call correctly. Auth, pagination, and rate limiting each get a
          full, much deeper treatment in{' '}
          <Link href="/learn/data-engineering/working-with-apis" style={{ color: 'var(--accent)' }}>
            Module 18 — Working with APIs
          </Link>{' '}
          — this is the light version you need before you get there.
        </Para>

        <SubSubTitle>Authenticating the request</SubSubTitle>

        <CodeBox label="refunds_api.py — reading credentials from the environment, never hardcoded">{`import os
import requests

def fetch_refund(order_id: int) -> dict:
    response = requests.get(
        f'https://payments.freshcart.internal/v1/refunds/{order_id}',
        headers={'Authorization': f'Bearer {os.environ["PAYMENTS_API_TOKEN"]}'},
        timeout=15,
    )
    response.raise_for_status()
    return response.json()`}</CodeBox>

        <Output>{`>>> fetch_refund(9284751)
{'order_id': 9284751, 'refunded': False, 'refund_amount': None}`}</Output>

        <SubSubTitle>Paging through results</SubSubTitle>

        <CodeBox label="refunds_api.py — following a cursor until the API stops giving you one">{`def fetch_all_refunds(store_id: int) -> list[dict]:
    """Follow cursor-based pagination until the API returns no next cursor."""
    refunds, cursor = [], None

    while True:
        params = {'store_id': store_id, 'limit': 200}
        if cursor:
            params['cursor'] = cursor

        resp = requests.get(
            'https://payments.freshcart.internal/v1/refunds',
            headers={'Authorization': f'Bearer {os.environ["PAYMENTS_API_TOKEN"]}'},
            params=params, timeout=15,
        )
        resp.raise_for_status()
        page = resp.json()

        refunds.extend(page['items'])
        cursor = page.get('next_cursor')
        if not cursor:
            break

    return refunds`}</CodeBox>

        <Output>{`>>> len(fetch_all_refunds(store_id=14))
340
# fetched across 2 pages of 200 + 1 page of 140 — the loop above followed
# next_cursor automatically until the API returned None`}</Output>

        <SubSubTitle>Respecting rate limits</SubSubTitle>

        <CodeBox label="refunds_api.py — backing off when the API says slow down">{`import time

def fetch_refund_with_retry(order_id: int, max_attempts: int = 4) -> dict:
    for attempt in range(1, max_attempts + 1):
        resp = requests.get(f'https://payments.freshcart.internal/v1/refunds/{order_id}',
                             headers={'Authorization': f'Bearer {os.environ["PAYMENTS_API_TOKEN"]}'},
                             timeout=15)
        if resp.status_code == 429:
            wait = int(resp.headers.get('Retry-After', 2 ** attempt))
            time.sleep(wait)
            continue
        resp.raise_for_status()
        return resp.json()

    raise RuntimeError(f"Gave up fetching refund {order_id} after {max_attempts} attempts")`}</CodeBox>

        <Callout type="tip">
          Everything above is the minimum viable version. Module 18 builds a real
          OAuth2 client-credentials flow with token caching, four different
          pagination styles (offset, cursor, next-URL, checkpointed), and a
          production-grade token-bucket rate limiter. Come back to it once this
          pipeline is working end to end and you want to make the API layer
          production-hardened.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 — Error Handling and Retries ─────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Error Handling and Retries" />
        <SectionTitle>Error Handling and Retries — Not Every Failure Deserves a Retry</SectionTitle>

        <Para>
          The refunds API call from Part 03 will fail sometimes — a timeout, a
          dropped connection, a 503 while the payments team deploys. The instinct
          is to wrap every API call in a retry loop. That instinct is half right:
          some failures should be retried, and some should never be retried at all.
        </Para>

        <SubSubTitle>Transient vs permanent — the classification that matters</SubSubTitle>

        <CodeBox label="errors.py — deciding what's worth retrying">{`# Transient: the same request will probably succeed if you just try again
TRANSIENT_ERRORS = {
    'ConnectionError', 'Timeout', 'ChunkedEncodingError',
}
TRANSIENT_STATUS_CODES = {429, 500, 502, 503, 504}

# Permanent: retrying the identical request produces the identical failure
PERMANENT_STATUS_CODES = {400, 401, 403, 404, 422}

def is_retryable(exc: Exception | None, status_code: int | None) -> bool:
    if status_code in PERMANENT_STATUS_CODES:
        return False
    if status_code in TRANSIENT_STATUS_CODES:
        return True
    return type(exc).__name__ in TRANSIENT_ERRORS`}</CodeBox>

        <Output>{`>>> is_retryable(None, 401)     # bad token — retrying changes nothing
False
>>> is_retryable(None, 503)     # payments API mid-deploy — will recover
True`}</Output>

        <SubSubTitle>Exponential backoff with jitter</SubSubTitle>

        <Para>
          A retry that fires immediately after a failure usually hits the same
          overloaded system and fails again. Waiting progressively longer between
          attempts — and adding a small random offset (jitter) — gives the system
          time to recover and stops every failing pipeline from retrying at exactly
          the same instant.
        </Para>

        <CodeBox label="retry.py — a reusable retry decorator">{`import time
import random
import functools
import logging

logger = logging.getLogger('freshcart_pipeline')

def with_retry(max_attempts: int = 5, base_delay: float = 1.0, max_delay: float = 60.0):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts:
                        logger.error("Giving up after %d attempts: %s", max_attempts, e)
                        raise
                    delay = min(base_delay * (2 ** (attempt - 1)), max_delay)
                    delay += random.uniform(0, delay * 0.25)   # jitter: up to +25%
                    logger.warning("Attempt %d/%d failed (%s), retrying in %.1fs",
                                   attempt, max_attempts, e, delay)
                    time.sleep(delay)
        return wrapper
    return decorator


@with_retry(max_attempts=4)
def fetch_refund(order_id: int) -> dict:
    resp = requests.get(f'https://payments.freshcart.internal/v1/refunds/{order_id}', timeout=15)
    resp.raise_for_status()
    return resp.json()`}</CodeBox>

        <Output>{`WARNING attempt 1/4 failed (HTTPError 503), retrying in 1.2s
WARNING attempt 2/4 failed (HTTPError 503), retrying in 2.3s
INFO    refund 9284751 fetched successfully on attempt 3`}</Output>

        <SubSubTitle>Dead letter queue — what happens after the last retry</SubSubTitle>

        <Para>
          A record that still fails after every retry cannot be allowed to crash the
          whole pipeline — 39 stores&rsquo; worth of good data shouldn&rsquo;t be lost because
          one store&rsquo;s file has one bad row. Instead, write the failed record and the
          reason it failed to a dead letter queue, and keep going.
        </Para>

        <CodeBox label="dlq.py — a minimal dead letter queue">{`import json
from datetime import datetime, timezone
from pathlib import Path

class DeadLetterQueue:
    def __init__(self, path: str):
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)

    def write(self, record: dict, error: Exception) -> None:
        entry = {
            'ts': datetime.now(timezone.utc).isoformat(),
            'error': str(error),
            'error_type': type(error).__name__,
            'record': record,
        }
        with open(self.path, 'a') as f:
            f.write(json.dumps(entry) + '\\n')   # NDJSON — one failure per line

dlq = DeadLetterQueue('/data/dlq/freshcart_orders.ndjson')

for order in orders:
    try:
        process_order(order)
    except Exception as e:
        dlq.write(order, e)
        continue   # the rest of the batch still gets processed`}</CodeBox>

        <TryThis>
          Write a function that always raises <code>ValueError</code> and wrap it
          with <code>@with_retry(max_attempts=3)</code>. Watch the delays it prints —
          then change <code>base_delay</code> and see how the wait times scale.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 05 — Structured Logging ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Structured Logging" />
        <SectionTitle>Structured Logging — Writing Logs You Can Actually Search at 3 AM</SectionTitle>

        <Para>
          <code>print()</code> statements disappear the moment the terminal closes.
          When FreshCart&rsquo;s nightly pipeline runs unattended on a schedule, the only
          record of what happened is whatever got logged — and a wall of unstructured
          text is nearly useless when you&rsquo;re trying to find one failed store among
          forty at 3 AM.
        </Para>

        <SubSubTitle>Structured JSON logging — one setup, used everywhere</SubSubTitle>

        <CodeBox label="logging_setup.py — every log line is a parseable JSON object">{`import logging
import json
import uuid
from datetime import datetime, timezone

class StructuredFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        payload = {
            'ts':      datetime.now(timezone.utc).isoformat(),
            'level':   record.levelname,
            'logger':  record.name,
            'msg':     record.getMessage(),
            'run_id':  getattr(record, 'run_id', None),
        }
        if record.exc_info:
            payload['exception'] = self.formatException(record.exc_info)
        return json.dumps(payload)

def setup_pipeline_logging(run_id: str) -> logging.Logger:
    logger = logging.getLogger('freshcart_pipeline')
    logger.setLevel(logging.INFO)

    handler = logging.StreamHandler()
    handler.setFormatter(StructuredFormatter())
    logger.addHandler(handler)

    # Bind run_id onto every record automatically
    old_factory = logging.getLogRecordFactory()
    def factory(*args, **kwargs):
        record = old_factory(*args, **kwargs)
        record.run_id = run_id
        return record
    logging.setLogRecordFactory(factory)

    return logger

RUN_ID = str(uuid.uuid4())
logger = setup_pipeline_logging(RUN_ID)
logger.info("Pipeline started")`}</CodeBox>

        <Output>{`{"ts": "2026-08-22T03:00:04.112Z", "level": "INFO", "logger": "freshcart_pipeline", "msg": "Pipeline started", "run_id": "a1f9-..."}
{"ts": "2026-08-22T03:00:06.884Z", "level": "INFO", "logger": "freshcart_pipeline", "msg": "store_014: 48,200,000 rows read", "run_id": "a1f9-..."}
{"ts": "2026-08-22T03:00:41.203Z", "level": "WARNING", "logger": "freshcart_pipeline", "msg": "store_027: 12 rows sent to DLQ (invalid status)", "run_id": "a1f9-..."}`}</Output>

        <Para>
          Every line is now one JSON object — filterable by <code>run_id</code> in
          any log platform, greppable with <code>jq</code> on the command line, and
          alertable on (page someone whenever <code>level == "ERROR"</code> appears).
          A wall of plain text can&rsquo;t do any of that.
        </Para>

        <SubSubTitle>What to log at each level</SubSubTitle>

        <Table
          head={['Level', 'When to use it', 'FreshCart example']}
          rows={[
            ['DEBUG', 'Verbose internal state, disabled in production', '"Row 40219: raw amount field = \'$12.50\'"'],
            ['INFO', 'Normal operation, confirms progress', '"store_014: batch 3 of 12 loaded, 300,000 rows"'],
            ['WARNING', 'Recovered automatically, but worth a look', '"store_027: 12 rows sent to DLQ"'],
            ['ERROR', 'Requires a human — pipeline failed or aborted', '"store_009: connection to warehouse lost after 5 retries"'],
          ]}
        />

        <Callout type="warning">
          Never log the raw request body of the refunds API call, a customer&rsquo;s full
          card number, or the <code>PAYMENTS_API_TOKEN</code> itself — even at DEBUG
          level. Logs get shipped to third-party platforms and kept for months;
          treat them as no more private than a public support ticket.
        </Callout>

        <TryThis>
          Run the <code>StructuredFormatter</code> above with a deliberately raised
          exception inside a <code>try/except</code>, calling{' '}
          <code>logger.error(&quot;failed&quot;, exc_info=True)</code>. Confirm the full
          traceback shows up inside the JSON <code>exception</code> field, not as
          separate unstructured lines.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 06 — Generators ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Generators" />
        <SectionTitle>Generators — Chaining the Whole Pipeline With Constant Memory</SectionTitle>

        <Para>
          Part 02 solved memory for reading one file. But a real pipeline is read
          &rarr; validate &rarr; transform &rarr; write, and if any one of those steps
          builds a full list before passing it to the next, you&rsquo;re back to holding
          the entire file in memory — just one step later than before. Generators
          fix this for the whole chain, not just the read.
        </Para>

        <SubSubTitle>List vs generator — the memory difference, made visible</SubSubTitle>

        <CodeBox label="generators_demo.py">{`import sys

def orders_as_list(n: int) -> list[dict]:
    return [{'order_id': i, 'amount': i * 1.5} for i in range(n)]

def orders_as_generator(n: int):
    for i in range(n):
        yield {'order_id': i, 'amount': i * 1.5}

big_list = orders_as_list(1_000_000)
big_gen  = orders_as_generator(1_000_000)

print(f"list:      {sys.getsizeof(big_list):,} bytes")
print(f"generator: {sys.getsizeof(big_gen):,} bytes")`}</CodeBox>

        <Output>{`list:      8,448,728 bytes
generator: 200 bytes`}</Output>

        <Para>
          The generator is 200 bytes regardless of whether <code>n</code> is a
          thousand or a billion — it holds only its current position, not the data.
          The list holds every item, all at once, for as long as it exists.
        </Para>

        <SubSubTitle>Chaining generators into one lazy pipeline</SubSubTitle>

        <CodeBox label="pipeline_chain.py — each stage pulls one record at a time from the last">{`def read_ndjson(filepath: str):
    with open(filepath) as f:
        for line in f:
            yield json.loads(line)

def validate_orders(records):
    for r in records:
        if r.get('amount', 0) > 0 and r.get('status') in VALID_STATUSES:
            yield r
        else:
            dlq.write(r, ValueError('failed validation'))

def transform_orders(records):
    for r in records:
        r['amount'] = round(float(r['amount']), 2)
        r['status'] = r['status'].strip().lower()
        yield r

def batch_records(records, batch_size: int = 5_000):
    batch = []
    for r in records:
        batch.append(r)
        if len(batch) >= batch_size:
            yield batch
            batch = []
    if batch:
        yield batch

def run_pipeline(filepath: str):
    raw       = read_ndjson(filepath)
    valid     = validate_orders(raw)
    clean     = transform_orders(valid)
    for batch in batch_records(clean):
        write_batch_to_warehouse(batch)
        logger.info("Batch written: %d rows", len(batch))`}</CodeBox>

        <Output>{`INFO Batch written: 5000 rows
INFO Batch written: 5000 rows
INFO Batch written: 3120 rows
# at no point did the process hold more than one 5,000-row batch in memory —
# not the raw file, not the validated set, not the transformed set`}</Output>

        <Para>
          Nothing runs until <code>write_batch_to_warehouse</code> actually pulls a
          batch — at that point, one record flows through <code>read_ndjson</code>{' '}
          &rarr; <code>validate_orders</code> &rarr; <code>transform_orders</code> &rarr;
          into the current batch, then the next record does the same. The chain is
          lazy end to end.
        </Para>

        <SubSubTitle>Generator expressions — the same idea, inline</SubSubTitle>

        <CodeBox label="generator_expressions.py">{`# List comprehension — builds the whole list immediately
amounts_list = [o['amount'] for o in orders]

# Generator expression — identical syntax, but lazy (note: no brackets)
amounts_gen = (o['amount'] for o in orders)

total = sum(o['amount'] for o in orders if o['status'] == 'delivered')
# sum() pulls one amount at a time — the filtered sequence never fully materialises`}</CodeBox>

        <TryThis>
          Take the <code>run_pipeline</code> function above and add a{' '}
          <code>print()</code> inside <code>validate_orders</code> right before each{' '}
          <code>yield</code>. Run it against a small file and watch the print
          statements interleave with the &quot;Batch written&quot; logs — proof that
          validation, transformation, and writing are all happening one record at a
          time, not in separate complete passes.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 07 — Environment Variables and Config ───────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Environment Variables and Config" />
        <SectionTitle>Configuration — Never Hardcode a Secret Into a Pipeline File</SectionTitle>

        <Para>
          The <code>PAYMENTS_API_TOKEN</code> used back in Part 03 has to come from
          somewhere. Hardcoding it directly in the script means it ends up in Git
          history the moment the file is committed — recoverable forever, even after
          you delete the line. Every credential and every environment-specific value
          belongs outside the code.
        </Para>

        <SubSubTitle>The manual way — and why it fails quietly</SubSubTitle>

        <CodeBox label="config_manual.py — works, but fails silently on typos">{`import os

db_url = os.environ.get('DB_URL')          # returns None if missing — no error!
batch_size = int(os.environ.get('BATCH_SIZE', '5000'))

# A typo like DB_URl instead of DB_URL doesn't raise anything —
# db_url is just None, and the failure shows up much later, confusingly,
# wherever db_url is first used.`}</CodeBox>

        <Output>{`>>> db_url
None
# no error here — the crash happens minutes later inside psycopg2.connect(None),
# far from where the actual mistake was made`}</Output>

        <SubSubTitle>Pydantic settings — fail loudly, at startup, with a clear message</SubSubTitle>

        <CodeBox label="config.py — validated configuration">{`from pydantic_settings import BaseSettings

class Config(BaseSettings):
    db_url:            str
    payments_api_token: str
    batch_size:        int = 5_000
    max_retries:       int = 5
    dlq_path:          str = '/data/dlq/freshcart_orders.ndjson'

    class Config:
        env_file = '.env'

config = Config()   # raises immediately if a required field is missing`}</CodeBox>

        <Output>{`pydantic_core._pydantic_core.ValidationError: 1 validation error for Config
db_url
  field required (type=value_error.missing)
# fails in the first line of the script, with the exact missing field named —
# not three functions deep at 3 AM`}</Output>

        <SubSubTitle>Secrets managers — one step further for production</SubSubTitle>

        <Para>
          Environment variables are a good default, but they still mean the secret
          is sitting in plaintext somewhere (a <code>.env</code> file, a CI
          variable). Cloud secret managers store it encrypted and log every access:
        </Para>

        <CodeBox label="secrets.py — AWS Secrets Manager and Azure Key Vault">{`import boto3
import json

def get_secret_aws(secret_name: str) -> dict:
    client = boto3.client('secretsmanager')
    response = client.get_secret_value(SecretId=secret_name)
    return json.loads(response['SecretString'])

from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient

def get_secret_azure(vault_url: str, secret_name: str) -> str:
    credential = DefaultAzureCredential()
    client = SecretClient(vault_url=vault_url, credential=credential)
    return client.get_secret(secret_name).value`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Writing Testable Pipeline Code ─────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Writing Testable Pipeline Code" />
        <SectionTitle>Testable Code — Separating Business Logic From I/O</SectionTitle>

        <Para>
          Pipeline code that can&rsquo;t be unit tested is pipeline code that gets deployed
          with bugs. The usual reason it can&rsquo;t be tested is that the business
          logic — the actual rules about what makes an order valid — is entangled
          with the I/O: the database connection, the file read, the API call.
        </Para>

        <SubSubTitle>Untestable vs testable — the same logic, restructured</SubSubTitle>

        <CodeBox label="orders_clean.py — untestable version">{`def process_orders():                           # no inputs — depends on external state
    conn = psycopg2.connect(os.environ['DB'])   # I/O
    df = pd.read_csv('orders.csv')              # I/O

    df = df[df['amount'] > 0]
    df['status'] = df['status'].str.lower()

    df.to_sql('orders', conn, if_exists='append')  # I/O

# Cannot test this without: a real database, a file on disk, env vars set.
# Cannot test edge cases without touching all three.`}</CodeBox>

        <CodeBox label="orders_clean.py — testable version: pure function, thin I/O wrappers">{`def clean_orders(df: pd.DataFrame) -> pd.DataFrame:
    """Pure function: DataFrame in, DataFrame out. No I/O, no side effects."""
    df = df.copy()
    df = df[df['amount'] > 0]
    df['status'] = df['status'].str.lower().str.strip()

    valid_statuses = {'placed', 'confirmed', 'delivered', 'cancelled'}
    df = df[df['status'].isin(valid_statuses)]
    return df

def load_orders_from_csv(filepath: str) -> pd.DataFrame:      # I/O only
    return pd.read_csv(filepath)

def write_orders_to_db(df: pd.DataFrame, conn) -> None:       # I/O only
    df.to_sql('silver_orders', conn, if_exists='append', index=False)

def run_orders_pipeline(filepath: str, conn) -> None:          # orchestration only
    raw   = load_orders_from_csv(filepath)
    clean = clean_orders(raw)      # the one line that matters, and it's testable
    write_orders_to_db(clean, conn)`}</CodeBox>

        <SubSubTitle>Unit tests — no database, no file, just Python</SubSubTitle>

        <CodeBox label="test_orders_clean.py">{`import pandas as pd

def test_clean_orders_removes_negative_amounts():
    input_df = pd.DataFrame({
        'order_id': [1, 2, 3], 'amount': [380.0, -50.0, 0.0],
        'status':   ['delivered', 'placed', 'cancelled'],
    })
    result = clean_orders(input_df)
    assert len(result) == 1
    assert result.iloc[0]['order_id'] == 1

def test_clean_orders_removes_invalid_status():
    input_df = pd.DataFrame({
        'order_id': [1, 2], 'amount': [380.0, 220.0],
        'status':   ['delivered', 'deliverd'],   # typo in second row
    })
    result = clean_orders(input_df)
    assert len(result) == 1`}</CodeBox>

        <Output>{`$ pytest test_orders_clean.py -v
test_orders_clean.py::test_clean_orders_removes_negative_amounts PASSED
test_orders_clean.py::test_clean_orders_removes_invalid_status PASSED
============================== 2 passed in 0.04s ==============================`}</Output>

        <SubSubTitle>Mocking — testing the I/O layer without a real API or database</SubSubTitle>

        <CodeBox label="test_refunds_api.py — mocking requests.get">{`from unittest.mock import patch, MagicMock

@patch('requests.get')
def test_fetch_refund_success(mock_get):
    mock_response = MagicMock()
    mock_response.json.return_value = {'order_id': 9284751, 'refunded': False}
    mock_get.return_value = mock_response

    result = fetch_refund(9284751)

    assert result['order_id'] == 9284751
    mock_get.assert_called_once()

@patch('requests.get')
def test_fetch_refund_handles_timeout(mock_get):
    mock_get.side_effect = requests.exceptions.Timeout("Connection timed out")
    with pytest.raises(requests.exceptions.Timeout):
        fetch_refund(9284751)`}</CodeBox>

        <TryThis>
          Take the untestable <code>process_orders()</code> above and split it into
          a pure function plus two thin I/O wrappers yourself, before scrolling back
          up to see how this module did it. The exercise is in noticing which lines
          are &ldquo;business rule&rdquo; and which are &ldquo;talks to something external&rdquo;.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 09 — Type Hints and Pydantic ────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Type Hints and Data Validation" />
        <SectionTitle>Type Hints and Pydantic — Catching Bad Data at the Boundary</SectionTitle>

        <Para>
          Python is dynamically typed — a function that expects an integer and
          receives a string does not fail immediately, it fails later, wherever that
          string first gets used in a way integers behave differently. Type hints
          document intent; Pydantic actually enforces it, at the exact point data
          enters your pipeline.
        </Para>

        <SubSubTitle>Type hints — documentation a reader (and a linter) can check</SubSubTitle>

        <CodeBox label="types_example.py">{`from typing import Iterator

def process_batch(records: list[dict], batch_size: int = 10_000) -> Iterator[list[dict]]:
    ...

def fetch_page(cursor: str | None, start_date: str) -> tuple[list[dict], str | None]:
    ...`}</CodeBox>

        <SubSubTitle>Pydantic — validated models that reject bad data on the way in</SubSubTitle>

        <CodeBox label="models.py — an Order model that coerces and validates real-world input">{`from decimal import Decimal
from datetime import datetime
from enum import Enum
from pydantic import BaseModel, validator, Field

class OrderStatus(str, Enum):
    PLACED = 'placed'; CONFIRMED = 'confirmed'
    DELIVERED = 'delivered'; CANCELLED = 'cancelled'

class Order(BaseModel):
    order_id:   int      = Field(..., gt=0)
    store_id:   int      = Field(..., gt=0)
    amount:     Decimal  = Field(..., gt=0, decimal_places=2)
    status:     OrderStatus
    created_at: datetime

    @validator('amount', pre=True)
    def coerce_amount(cls, v):
        if isinstance(v, str):
            v = v.replace('$', '').replace(',', '').strip()
        return Decimal(str(v))`}</CodeBox>

        <Output>{`>>> Order(order_id=9284751, store_id=14, amount='$380.00',
...       status='delivered', created_at='2026-03-21T20:14:32-04:00')
Order(order_id=9284751, store_id=14, amount=Decimal('380.00'),
      status=<OrderStatus.DELIVERED: 'delivered'>, created_at=datetime(...))

>>> Order(order_id=-5, store_id=14, amount='380.00', status='delivered', created_at='2026-03-21')
pydantic.error_wrappers.ValidationError: 1 validation error for Order
order_id
  ensure this value is greater than 0 (type=value_error.number.not_gt)`}</Output>

        <CodeBox label="models.py — validating a whole batch, splitting valid from failed">{`def parse_orders(raw_records: list[dict]) -> tuple[list[Order], list[dict]]:
    valid, failed = [], []
    for raw in raw_records:
        try:
            valid.append(Order(**raw))
        except ValueError as e:
            failed.append({'record': raw, 'error': str(e)})
    return valid, failed`}</CodeBox>
      </section>

      <Divider />

      {/* ── Misconceptions ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Python for Data Engineering</SectionTitle>

        {[
          {
            wrong: '"pd.read_csv() is always the right way to read a CSV in a pipeline"',
            right: 'It is the right default for small-to-medium files, but without chunksize it loads the entire file into memory — the exact bug that opened Part 02. For files that consistently exceed a few hundred MB, chunked reads or a columnar format like Parquet are the correct starting point, not an optimisation to add later.',
          },
          {
            wrong: '"More retries always means a more reliable pipeline"',
            right: 'Retrying a permanent failure (a 401, a malformed request) just delays the inevitable failure while wasting time and API quota. Part 04’s classification step — deciding what is actually retryable before entering the retry loop — matters more than how many attempts you configure.',
          },
          {
            wrong: '"print() debugging is fine because I’ll delete it before deploying"',
            right: 'The print statements that matter are usually the ones left in deliberately — and a scheduled pipeline running unattended at 3 AM has no terminal for print() to write to. If it isn’t going through a logger, it doesn’t exist when you actually need it.',
          },
          {
            wrong: '"Type hints enforce types at runtime, the same way a compiled language would"',
            right: 'Python does not check type hints when the code runs — they are read by editors, linters, and tools like mypy for static analysis, but a function hinted to take an int will still happily run if you pass it a string. Pydantic is what actually enforces types at runtime, by validating and coercing data as it enters your models.',
          },
          {
            wrong: '"Generators only matter for really huge files"',
            right: 'The memory benefit is the most visible reason to use them, but the bigger one is composability: chaining small generator functions (Part 06) is how you build a pipeline that’s easy to test and extend one stage at a time, regardless of file size. A 10 MB file processed as a generator chain is just as maintainable as a 10 GB one.',
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

      {/* ── Real World ────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Assembling the Complete FreshCart Nightly Orders Pipeline</SectionTitle>

        <Para>
          Every part of this module built one piece. Here is what it looks like
          assembled into the pipeline that actually runs at 2 AM against all 40
          stores — config and logging from Parts 05 and 07, the chunked reader from
          Part 02, the generator chain from Part 06, validation from Part 09, and
          retry-protected DLQ handling from Part 04.
        </Para>

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
            Step 1 of 4 — config and logging
          </div>

          <CodeBox label="freshcart_pipeline.py — setup">{`import os, uuid, logging
from pydantic_settings import BaseSettings

class Config(BaseSettings):
    db_url:      str
    batch_size:  int = 5_000
    max_retries: int = 5
    dlq_path:    str = '/data/dlq/freshcart_orders.ndjson'
    class Config:
        env_file = '.env'

config = Config()          # fails loudly here if anything required is missing
RUN_ID = str(uuid.uuid4())
logger = setup_pipeline_logging(RUN_ID)   # from Part 05`}</CodeBox>

          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', margin: '28px 0 20px', letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Step 2 of 4 — the generator chain (read → validate → transform)
          </div>

          <CodeBox label="freshcart_pipeline.py — the lazy chain from Part 06, validating with Part 09's model">{`dlq = DeadLetterQueue(config.dlq_path)   # from Part 04

def read_store_export(filepath: str):
    for chunk in pd.read_csv(filepath, chunksize=100_000):
        for record in chunk.to_dict('records'):
            yield record

def validate_and_parse(records):
    for r in records:
        try:
            yield Order(**r)     # Pydantic model from Part 09
        except ValueError as e:
            dlq.write(r, e)`}</CodeBox>

          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', margin: '28px 0 20px', letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Step 3 of 4 — batching and load, protected by retry
          </div>

          <CodeBox label="freshcart_pipeline.py — batch + load with the retry decorator from Part 04">{`@with_retry(max_attempts=config.max_retries)
def write_batch(batch: list[Order], conn) -> None:
    rows = [(o.order_id, o.store_id, float(o.amount), o.status.value, o.created_at) for o in batch]
    with conn.cursor() as cur:
        execute_values(cur, """
            INSERT INTO silver.orders (order_id, store_id, amount, status, created_at)
            VALUES %s ON CONFLICT (order_id) DO UPDATE SET status = EXCLUDED.status
        """, rows)
    conn.commit()

def batch_and_load(orders, conn) -> int:
    batch, loaded = [], 0
    for order in orders:
        batch.append(order)
        if len(batch) >= config.batch_size:
            write_batch(batch, conn)
            loaded += len(batch)
            logger.info("Batch loaded: %d total rows written", loaded)
            batch = []
    if batch:
        write_batch(batch, conn)
        loaded += len(batch)
    return loaded`}</CodeBox>

          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', margin: '28px 0 20px', letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Step 4 of 4 — main, run against all 40 stores
          </div>

          <CodeBox label="freshcart_pipeline.py — entry point">{`def run(store_files: list[str]) -> None:
    logger.info("Pipeline started for %d stores", len(store_files))
    start = time.monotonic()
    total_loaded = 0

    with psycopg2.connect(config.db_url) as conn:
        for filepath in store_files:
            raw     = read_store_export(filepath)
            valid   = validate_and_parse(raw)
            loaded  = batch_and_load(valid, conn)
            total_loaded += loaded
            logger.info("%s: %d rows loaded", filepath, loaded)

    duration = time.monotonic() - start
    logger.info("Pipeline complete | total_loaded=%d duration=%.1fs", total_loaded, duration)

if __name__ == '__main__':
    run(store_files=glob.glob('/data/freshcart/store_*.csv'))`}</CodeBox>

          <Output>{`{"level": "INFO", "msg": "Pipeline started for 40 stores", "run_id": "a1f9-..."}
{"level": "INFO", "msg": "/data/freshcart/store_001.csv: 812,400 rows loaded"}
{"level": "WARNING", "msg": "store_027: 12 rows sent to DLQ (invalid status)"}
...
{"level": "INFO", "msg": "Pipeline complete | total_loaded=31,840,220 duration=642.8s"}`}</Output>
        </div>
      </section>

      <Divider />

      {/* ── Interview Prep ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
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

Jitter adds random variation to each retry delay. Without jitter, if 40 pipeline instances — one per FreshCart store — all fail at the same moment during a payments API deploy, they all enter exponential backoff simultaneously. When the deploy finishes, all 40 retry at exactly the same time, creating a thundering herd that immediately re-overloads the system. With jitter, each instance waits a slightly different amount, spreading the retry load over time.

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

DEBUG is the most detailed level — messages about the internal state of the program that are useful when diagnosing a specific problem but would be too verbose to log in production. Examples: "Fetching page 3 of refunds for store 014", "Row data: {order_id: 9284751, amount: 380.00}". Debug logs are typically disabled in production (set log level to INFO) and enabled temporarily when investigating an issue.

INFO confirms that normal operations are proceeding as expected. These messages should be meaningful and not too frequent. Examples: "Pipeline started for 40 stores", "store_014: 812,400 rows loaded", "Pipeline complete: 31,840,220 total rows in 642.8 seconds". INFO logs are what you read to understand what a pipeline did during a run.

WARNING signals something unexpected happened but the pipeline recovered and continued. Examples: "store_027: 12 rows sent to DLQ (invalid status)", "Rate limited by refunds API, waiting 15 seconds before retry", "Retry attempt 2 of 4 after connection timeout". Warnings should be investigated — they often indicate data quality issues or system instability that will eventually cause failures.

ERROR indicates a failure that requires attention. The pipeline may have continued by writing the failed record to a dead letter queue, or it may have aborted. Examples: "store_009: connection to warehouse lost after 5 retries", "Database constraint violation on silver.orders". Errors must be investigated and resolved.`,
          },
          {
            q: 'Q5. How would you handle an API that returns a different number of records on the same request when retried? How do you ensure your data is complete?',
            a: `This behaviour — different record counts on the same request — indicates the API is returning real-time data or has eventual consistency. There are two common causes: the API is returning live data that changes between requests, so new records were added between the first and second call; or the API has a bug where its pagination is not stable.

For a data ingestion pipeline, this means a simple "retry if count does not match" strategy will never terminate on a live API. Instead, I would use a different approach based on the nature of the data.

If the data is append-only and time-bounded — like FreshCart's refund events — I would use a fixed time window for each pipeline run. Request all records where created_at is between 00:00:00 and 23:59:59 for yesterday UTC. This window is fixed — even if the API returns slightly different counts across retries due to in-progress transactions, the window closes at midnight and the count stabilises. I would run the pipeline with a small delay (6–12 hours) after the day ends to allow all in-progress transactions to settle.

If the API supports cursor-based pagination, I would rely on the cursor position rather than total record counts. Each page is fetched until no more cursors are returned. If a retry starts from a saved cursor, it continues from that position, not from the beginning — avoiding both missing data and duplicates.

For completeness verification, I would reconcile against an authoritative total after ingestion. Many APIs provide a summary endpoint that returns the total count or sum for a time period. After ingesting, I compare my count against this summary. If they differ, I log a warning and potentially re-fetch the affected time window. In the destination table, I add a UNIQUE constraint on the external ID so duplicate records from retries are handled by ON CONFLICT DO NOTHING rather than creating duplicates.`,
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

      {/* ── Common Mistakes ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Using a bare except: that swallows every exception, including the ones you need to see',
            a: 'A bare except: catches KeyboardInterrupt and SystemExit along with real bugs, and silently hides errors you actually needed to know about. Always catch specific exception types, and if you must catch broadly, use except Exception (not except:) and log the full exception before continuing.',
          },
          {
            q: 'Using a mutable default argument like def add_record(record, cache={})',
            a: 'The dict literal is created once, when the function is defined, and reused across every call — so cache silently accumulates records from unrelated calls instead of starting empty each time. Use cache: dict | None = None and create the dict inside the function body when it is None.',
          },
          {
            q: 'Opening files without a context manager and forgetting to close them',
            a: 'f = open(path); data = f.read() leaves the file handle open if an exception happens before f.close() runs, and a pipeline that opens thousands of files a night will eventually hit "too many open files". Always use with open(path) as f: — the file is closed automatically even if the block raises.',
          },
          {
            q: 'Comparing money values with float equality (amount == 380.00)',
            a: 'Floats cannot represent most decimal fractions exactly, so a computed amount can come out as 379.99999999999994 and silently fail an equality check that should have passed. Use the decimal.Decimal type for any monetary value, as Part 09’s Order model does, and never compare floats with ==.',
          },
          {
            q: 'Catching an exception and doing nothing with it (except Exception: pass)',
            a: 'This makes a real failure invisible — the pipeline appears to succeed while quietly dropping data. Every except block should either re-raise, write to a dead letter queue with the error (Part 04), or log at WARNING/ERROR with enough context to explain what happened.',
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

      {/* ── Error Library ─────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `MemoryError: Unable to allocate 5.8 GiB for array — pd.read_csv('store_014.csv') on a 6 GB file`,
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
            error: `WARNING: No handlers could be found for logger "freshcart_pipeline" — log messages are silently dropped`,
            cause: 'A logger was created with logging.getLogger() but no handlers were added to it, and no root logger handler exists. Without a handler, log records are created internally but have nowhere to go — they are silently discarded. This often happens when logging.basicConfig() was not called or was called after the first log message was emitted.',
            fix: 'Call setup_pipeline_logging() (Part 05) at the very start of the script, before any logging calls. Or add a handler explicitly: handler = logging.StreamHandler(); logger.addHandler(handler). Verify logging is working by adding a test message immediately after setup and confirming it appears in the output before doing anything else.',
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
        'API calls need three things beyond a simple GET: authentication read from environment variables (never hardcoded), pagination that follows the API’s cursor or next-URL, and rate-limit handling that respects 429 responses. This module covers the minimum version — Module 18 covers all three in much more depth.',
        'Distinguish transient from permanent errors before deciding whether to retry. Transient errors (timeouts, 503, connection reset) should be retried with exponential backoff and jitter. Permanent errors (validation failures, 401, 404) should fail immediately — retrying wastes time and can cause harm.',
        'Exponential backoff with jitter prevents thundering herds: multiple pipeline instances that fail simultaneously retry at slightly different times, spreading load instead of all hitting the recovered system at once.',
        'Structured logging (JSON output with defined fields) makes logs searchable and alertable in log management tools. Every log entry should include a run_id and relevant metrics. Never log PII or secrets. Never use print() in pipeline code.',
        'Generators (functions using yield) process arbitrarily large data with constant memory. Chain multiple generators together to build a lazy pipeline where data flows one record at a time from source to sink — this matters for maintainability, not just for huge files.',
        'Read secrets from environment variables or cloud secret managers, validated through a settings class like Pydantic’s BaseSettings. Fail loudly on missing required config at startup, rather than failing mysteriously deep inside the pipeline later.',
        'Separate business logic from I/O. Pure transformation functions take data in, return data out, with no file reads or database connections. These are trivially unit-testable. I/O functions are thin wrappers. Orchestration wires them together.',
        'Pydantic models validate and parse data at the boundary between external systems and your pipeline. Type hints alone document intent but do not enforce it at runtime — Pydantic (or an equivalent) is what actually rejects bad data on the way in.',
        'Dead letter queues are essential for production pipelines. When a record fails all retries or validation, write it to a DLQ file with the error context and keep processing the rest. Never silently discard failed records and never halt an entire pipeline because one record is bad.',
      ]} />


      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 15 covers SQL at the data engineering level — window functions, complex CTEs, deduplication patterns, and the advanced queries that every real DE interview actually tests.
        </p>
        <Link href="/learn/data-engineering/sql-for-de" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 15 → SQL for Data Engineers — Beyond the Basics
        </Link>
      </div>
    </LearnLayout>
  )
}
