// app/learn/data-engineering/de-interview-questions/page.tsx

import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Interview Prep — 60 Complete Answers | Data Engineering | Chaduvuko',
  description:
    '60 complete data engineering interview answers across Python, SQL, pipelines, Spark, Kafka, data modelling, warehousing, cloud, distributed systems, system design, and behavioural — written at senior engineer depth.',
}

/* ── Local components (Module 37 style) ─────────────────────────────────── */

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

const QA = ({
  n, q, children,
}: {
  n: number
  q: string
  children: React.ReactNode
}) => (
  <div style={{
    borderLeft: '3px solid var(--accent)',
    paddingLeft: 20,
    marginBottom: 40,
  }}>
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10,
    }}>
      <span style={{
        fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)',
        color: 'var(--accent)', background: 'rgba(0,230,118,0.1)',
        border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6,
        padding: '3px 8px', whiteSpace: 'nowrap', flexShrink: 0,
      }}>Q{String(n).padStart(2, '0')}</span>
      <div style={{
        fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.5,
      }}>{q}</div>
    </div>
    <div style={{ paddingLeft: 0 }}>{children}</div>
  </div>
)

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function DEInterviewQuestionsModule() {
  return (
    <LearnLayout
      title="Interview Prep — 60 Complete Answers"
      description="60 complete data engineering interview answers across Python, SQL, pipelines, Spark, Kafka, data modelling, warehousing, cloud, distributed systems, system design, and behavioural — written at senior engineer depth."
      section="Data Engineering · Phase 6"
      readTime="90 min"
      updatedAt="March 2026"
    >

      {/* ── How to use this module ───────────────────────────────────── */}
      <HighlightBox>
        <Para>
          <strong>How to use this module:</strong> Every answer here is written
          at the depth a senior engineer at Razorpay, Flipkart, Meesho, CRED,
          or a FAANG India team would expect. Do not memorise these answers —
          understand them. An interviewer who asks a follow-up question will
          immediately detect a memorised answer. Read an answer, close the page,
          explain it out loud as if to a colleague. That is the only way to
          internalise it.
        </Para>
        <Para>
          Questions are grouped by topic. Difficulty increases within each
          section. Questions marked with ★ are the ones most commonly asked
          in actual Indian DE interviews based on reported patterns.
        </Para>
      </HighlightBox>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SECTION 1 — PYTHON */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <SectionTag text="// Section 01 — Python for Data Engineering" />
      <SectionTitle>Python — 10 Questions</SectionTitle>

      <QA n={1} q="★ What is a generator in Python and why would you use one in a data pipeline?">
        <Para>
          A generator is a function that uses <code>yield</code> instead of
          <code>return</code>. When called, it returns a generator object —
          an iterator that produces values one at a time, on demand, without
          computing or storing the entire sequence in memory.
        </Para>
        <Para>
          In a data pipeline, this matters because pipelines often process
          files or database result sets that are too large to fit in RAM.
          A generator lets you process one record at a time — reading, transforming,
          and writing — without ever holding the full dataset in memory.
        </Para>
        <CodeBox label="generator vs list — memory difference">
{`# List approach — loads ALL rows into memory before processing
def read_all_orders(filepath):
    rows = []
    with open(filepath) as f:
        for line in f:
            rows.append(parse(line))
    return rows  # 10M rows × 500 bytes = 5 GB in RAM

# Generator approach — yields one row at a time
def stream_orders(filepath):
    with open(filepath) as f:
        for line in f:
            yield parse(line)  # caller gets one row, processes it, asks for next
            # Memory usage: ~500 bytes at any moment (one row)

# Usage — identical to the list version from the caller's perspective
for order in stream_orders('orders_2026_03.csv'):
    write_to_warehouse(order)

# Generator pipeline: chain multiple generators for a memory-efficient pipeline
def filter_valid(orders):
    for o in orders:
        if o['status'] == 'completed' and o['total_paise'] > 0:
            yield o

def enrich(orders, store_map):
    for o in orders:
        o['store_city'] = store_map.get(o['store_id'], 'unknown')
        yield o

# Each stage is lazy — no stage runs until the consumer asks for the next value
pipeline = enrich(filter_valid(stream_orders('orders.csv')), store_map)
for record in pipeline:
    write_to_parquet(record)`}
        </CodeBox>
        <Para>
          The follow-up the interviewer is likely to ask: "What is the
          difference between a generator and an iterator?" A generator is a
          specific way to create an iterator — using <code>yield</code>. Any
          object that implements <code>__iter__</code> and <code>__next__</code>
          is an iterator. Every generator is an iterator, but not every iterator
          is a generator.
        </Para>
      </QA>

      <QA n={2} q="★ Explain the difference between map, filter, and reduce. When would you use each?">
        <Para>
          All three are functional programming primitives that process collections
          without explicit loops. In data engineering, they appear constantly in
          transformation logic.
        </Para>
        <CodeBox label="map / filter / reduce — precise definitions with data examples">
{`from functools import reduce

orders = [
    {'order_id': 'O1', 'total_paise': 34900, 'status': 'completed', 'city': 'Hyderabad'},
    {'order_id': 'O2', 'total_paise': 0,     'status': 'cancelled', 'city': 'Bengaluru'},
    {'order_id': 'O3', 'total_paise': 12500, 'status': 'completed', 'city': 'Hyderabad'},
    {'order_id': 'O4', 'total_paise': 67000, 'status': 'completed', 'city': 'Mumbai'},
]

# MAP: transform every element — 1-in, 1-out
# Use when: you want to apply a function to every element
totals_inr = list(map(lambda o: o['total_paise'] / 100, orders))
# [349.0, 0.0, 125.0, 670.0]

# FILTER: keep elements that pass a predicate — 1-in, 0-or-1-out
# Use when: you want to remove records that do not meet a condition
completed = list(filter(lambda o: o['status'] == 'completed', orders))
# [O1, O3, O4] — O2 is removed

# REDUCE: collapse a collection to a single value — N-in, 1-out
# Use when: you need a cumulative aggregation
total_revenue = reduce(
    lambda acc, o: acc + o['total_paise'],
    filter(lambda o: o['status'] == 'completed', orders),
    0  # initial value
)
# 34900 + 12500 + 67000 = 114400 paise = ₹1,144

# In practice: prefer list comprehensions over map/filter for readability
completed_totals = [o['total_paise'] / 100 for o in orders if o['status'] == 'completed']

# And sum() over reduce() for simple aggregations
total_revenue_inr = sum(o['total_paise'] for o in orders if o['status'] == 'completed') / 100`}
        </CodeBox>
        <Para>
          In a Spark context, <code>map</code>, <code>filter</code>, and
          <code>reduce</code> are first-class DataFrame/RDD operations.
          Understanding the Python versions first makes the distributed
          versions intuitive — the semantics are identical, only the
          execution is distributed across a cluster.
        </Para>
      </QA>

      <QA n={3} q="What is the GIL in Python and how does it affect multithreaded data pipelines?">
        <Para>
          The GIL (Global Interpreter Lock) is a mutex in CPython that allows
          only one thread to execute Python bytecode at a time, even on
          multi-core machines. This means Python threads cannot achieve true
          CPU parallelism for CPU-bound work.
        </Para>
        <Para>
          In data pipelines, this matters differently depending on what the
          pipeline is doing. If the bottleneck is I/O — waiting for network
          responses, reading from disk, writing to a database — threads work
          perfectly because the GIL is released during I/O waits. If the
          bottleneck is CPU — parsing JSON, applying transformations, compressing
          data — threads give you no parallelism benefit. Use
          <code>multiprocessing</code> (separate processes, no shared GIL)
          or move the CPU work into a C extension (NumPy, pandas, PyArrow
          all release the GIL internally).
        </Para>
        <CodeBox label="GIL — when threads help and when they don't">
{`import threading
import multiprocessing

# Scenario 1: I/O-bound — downloading 20 files from S3
# Threads work — GIL is released while waiting for network
# Each thread blocks on network, other threads run Python code
def download_file(key):
    s3.download_file('bucket', key, f'/tmp/{key}')

threads = [threading.Thread(target=download_file, args=(k,)) for k in keys]
for t in threads: t.start()
for t in threads: t.join()
# 20 parallel downloads — actual speedup proportional to network concurrency

# Scenario 2: CPU-bound — parsing 20 large JSON files
# Threads DO NOT work — all threads share one GIL, effectively serial
# Processes DO work — each has its own interpreter and GIL
def parse_file(path):
    with open(path) as f:
        return [transform(line) for line in f]

with multiprocessing.Pool(processes=8) as pool:
    results = pool.map(parse_file, file_paths)
# 8 cores working in parallel — true CPU parallelism

# The modern answer for data engineering:
# Use async/await (asyncio) for I/O concurrency — more efficient than threads
# Use multiprocessing or ProcessPoolExecutor for CPU parallelism
# Use Spark or Dask for large-scale parallel processing — they handle this internally`}
        </CodeBox>
      </QA>

      <QA n={4} q="★ How do you handle missing or malformed data in a Python ingestion pipeline?">
        <Para>
          Missing and malformed data is not an edge case — it is a guarantee
          in production. Source systems send null fields, truncated strings,
          type misconfigurations, and encoding errors constantly. The question
          is not whether to handle it, but at which layer and with which strategy.
        </Para>
        <CodeBox label="malformed data handling — layered approach">
{`from dataclasses import dataclass
from typing import Optional
import logging

logger = logging.getLogger(__name__)

@dataclass
class OrderEvent:
    order_id: str
    customer_id: str
    total_paise: int
    store_id: str
    status: str
    city: Optional[str] = None   # nullable — not always present

class ParseResult:
    def __init__(self, record=None, error=None, raw=None):
        self.record = record   # OrderEvent if success
        self.error = error     # error message if failed
        self.raw = raw         # original raw data — always preserved

def parse_order_event(raw: dict) -> ParseResult:
    """
    Parse a raw dict into an OrderEvent.
    Never raises — always returns a ParseResult.
    Failed parses are routed to the dead letter queue, not dropped silently.
    """
    try:
        # Validate required fields exist
        required = ['order_id', 'customer_id', 'total_paise', 'store_id', 'status']
        missing = [f for f in required if f not in raw or raw[f] is None]
        if missing:
            return ParseResult(
                error=f"Missing required fields: {missing}",
                raw=raw
            )

        # Type coercion with explicit error capture
        try:
            total_paise = int(raw['total_paise'])
        except (ValueError, TypeError):
            return ParseResult(
                error=f"total_paise is not an integer: {raw['total_paise']!r}",
                raw=raw
            )

        if total_paise < 0:
            return ParseResult(
                error=f"total_paise is negative: {total_paise}",
                raw=raw
            )

        # Normalisation
        status = str(raw['status']).lower().strip()
        valid_statuses = {'placed', 'confirmed', 'shipped', 'delivered', 'cancelled'}
        if status not in valid_statuses:
            # Log as warning — do not reject the record
            logger.warning(f"Unknown status '{status}' for order {raw['order_id']}")
            status = 'unknown'

        return ParseResult(record=OrderEvent(
            order_id=str(raw['order_id']).strip(),
            customer_id=str(raw['customer_id']).strip(),
            total_paise=total_paise,
            store_id=str(raw['store_id']).strip(),
            status=status,
            city=raw.get('city'),   # Optional — None is fine
        ))

    except Exception as exc:
        # Catch-all: preserve the raw record, never lose data silently
        logger.error(f"Unexpected parse error: {exc} | raw={raw}")
        return ParseResult(error=str(exc), raw=raw)

# In the pipeline loop:
valid_records, failed_records = [], []
for raw in source_events:
    result = parse_order_event(raw)
    if result.record:
        valid_records.append(result.record)
    else:
        failed_records.append(result)
        # Write to DLQ — never silently drop

write_to_warehouse(valid_records)
write_to_dlq(failed_records)  # Inspect and replay after fixing the source`}
        </CodeBox>
      </QA>

      <QA n={5} q="What are decorators in Python? Give a data engineering example.">
        <Para>
          A decorator is a function that takes another function as input and
          returns a new function that wraps the original with additional
          behaviour — without modifying the original function's code.
          They use the <code>@</code> syntax.
        </Para>
        <CodeBox label="decorator — retry logic for flaky external API calls">
{`import time
import functools
import logging

logger = logging.getLogger(__name__)

def retry(max_attempts=3, delay_seconds=2, backoff=2, exceptions=(Exception,)):
    """
    Decorator that retries a function on failure with exponential backoff.
    Use on any function that calls an external API, database, or HTTP endpoint.
    """
    def decorator(func):
        @functools.wraps(func)   # preserves original function's __name__ and __doc__
        def wrapper(*args, **kwargs):
            attempt = 1
            current_delay = delay_seconds
            while attempt <= max_attempts:
                try:
                    return func(*args, **kwargs)
                except exceptions as exc:
                    if attempt == max_attempts:
                        logger.error(
                            f"{func.__name__} failed after {max_attempts} attempts: {exc}"
                        )
                        raise
                    logger.warning(
                        f"{func.__name__} attempt {attempt} failed: {exc}. "
                        f"Retrying in {current_delay}s..."
                    )
                    time.sleep(current_delay)
                    current_delay *= backoff
                    attempt += 1
        return wrapper
    return decorator

# Usage — decorate any fragile function
@retry(max_attempts=5, delay_seconds=1, backoff=2, exceptions=(ConnectionError, TimeoutError))
def fetch_store_metadata(store_id: str) -> dict:
    """Calls external store service — network may be flaky."""
    response = requests.get(f"https://stores.internal/api/v1/stores/{store_id}", timeout=5)
    response.raise_for_status()
    return response.json()

# Other useful DE decorators:
# @timer — logs execution time for performance monitoring
# @validate_schema — checks function input matches expected schema
# @log_calls — logs every call with arguments for audit trails`}
        </CodeBox>
      </QA>

      <QA n={6} q="How would you process a 50 GB CSV file in Python on a machine with 8 GB RAM?">
        <Para>
          The constraint rules out loading the file into memory (pandas
          <code>read_csv</code> on a 50 GB file requires ~200 GB RAM after
          type inflation). The solution is chunked processing — read and process
          the file in fixed-size chunks, writing results incrementally.
        </Para>
        <CodeBox label="chunked CSV processing — 50 GB on 8 GB RAM">
{`import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq

CHUNK_SIZE = 100_000   # rows per chunk — tune based on row width and available RAM

# Option 1: pandas chunked reader
def process_large_csv(input_path: str, output_path: str):
    writer = None
    schema = None

    for i, chunk in enumerate(pd.read_csv(input_path, chunksize=CHUNK_SIZE)):
        # Apply transformations to each chunk
        chunk['total_inr'] = chunk['total_paise'] / 100
        chunk['order_date'] = pd.to_datetime(chunk['created_at']).dt.date
        chunk = chunk[chunk['status'] == 'completed']   # filter

        # Write incrementally to Parquet
        table = pa.Table.from_pandas(chunk)
        if writer is None:
            schema = table.schema
            writer = pq.ParquetWriter(output_path, schema)
        writer.write_table(table)

        if i % 10 == 0:
            print(f"Processed chunk {i} — ~{i * CHUNK_SIZE:,} rows")

    if writer:
        writer.close()

# Memory usage at any point: ~100k rows × ~500 bytes = ~50 MB (well within 8 GB)

# Option 2: generator-based line-by-line for maximum memory efficiency
def stream_csv_to_parquet(input_path: str, output_path: str):
    """Process one row at a time — minimum memory footprint."""
    import csv

    buffer = []
    BUFFER_SIZE = 50_000   # accumulate before writing (small writes are expensive)

    with open(input_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            transformed = transform_row(row)
            if transformed:
                buffer.append(transformed)
            if len(buffer) >= BUFFER_SIZE:
                flush_to_parquet(buffer, output_path, append=True)
                buffer = []

    if buffer:
        flush_to_parquet(buffer, output_path, append=True)

# Follow-up the interviewer might ask:
# "What if it's 500 GB?" → Spark or Dask — distributed processing across a cluster
# "What if it's compressed?" → gzip.open() or lzma.open() — transparent decompression`}
        </CodeBox>
      </QA>

      <QA n={7} q="What is the difference between deepcopy and shallow copy? When does it matter in pipelines?">
        <Para>
          A shallow copy creates a new container object but references the same
          nested objects. A deep copy creates new copies of all nested objects
          recursively. In data pipelines, this matters when you transform a record
          and need the original to remain unchanged — for example, writing the
          original to a DLQ while also writing a transformed version to the warehouse.
        </Para>
        <CodeBox label="shallow vs deep copy — pipeline bug and fix">
{`import copy

original = {
    'order_id': 'O1234',
    'items': [
        {'product_id': 'P001', 'qty': 2, 'price_paise': 34900},
        {'product_id': 'P002', 'qty': 1, 'price_paise': 12500},
    ]
}

# SHALLOW COPY BUG:
shallow = original.copy()  # or dict(original)
shallow['order_id'] = 'MODIFIED'   # top-level field: original is unaffected ✓
shallow['items'][0]['qty'] = 999   # nested object: original IS modified ✗

print(original['order_id'])        # 'O1234' — unchanged ✓
print(original['items'][0]['qty']) # 999 — CORRUPTED ✗
# Both shallow and original point to the same list and the same dict inside it

# DEEP COPY FIX:
deep = copy.deepcopy(original)
deep['items'][0]['qty'] = 999      # nested object: original is unaffected ✓
print(original['items'][0]['qty']) # 2 — unchanged ✓

# In a pipeline:
for event in stream:
    raw_backup = copy.deepcopy(event)   # preserve for DLQ if transformation fails
    try:
        transformed = transform(event)   # transform modifies event in place
        write_to_warehouse(transformed)
    except Exception as e:
        write_to_dlq(raw_backup, error=str(e))  # raw_backup is truly unmodified

# Performance note: deepcopy is slower than shallow copy (O(n) of entire object graph)
# For high-throughput pipelines: prefer immutable data structures (tuples, frozensets)
# or reconstruct new dicts instead of copying`}
        </CodeBox>
      </QA>

      <QA n={8} q="How do you write unit tests for a data transformation function?">
        <CodeBox label="unit testing a transformation — pytest best practices">
{`# The function under test
def normalise_order(raw: dict) -> dict:
    """
    Normalise a raw order dict from the source API.
    Returns a cleaned dict ready for warehouse insertion.
    """
    return {
        'order_id':    str(raw['order_id']).strip().upper(),
        'total_paise': int(float(raw.get('total_paise', 0))),
        'status':      raw.get('status', 'unknown').lower().strip(),
        'city':        raw.get('city', '').strip() or None,
        'order_date':  raw['created_at'][:10],   # extract YYYY-MM-DD
    }

# Test file: test_normalise_order.py
import pytest
from transformations import normalise_order

class TestNormaliseOrder:

    def test_happy_path(self):
        raw = {
            'order_id': ' o1234 ',
            'total_paise': '34900',
            'status': 'COMPLETED',
            'city': 'Hyderabad',
            'created_at': '2026-03-20T14:23:11Z',
        }
        result = normalise_order(raw)
        assert result['order_id'] == 'O1234'       # stripped and uppercased
        assert result['total_paise'] == 34900       # coerced to int
        assert result['status'] == 'completed'      # lowercased
        assert result['city'] == 'Hyderabad'
        assert result['order_date'] == '2026-03-20' # extracted from ISO timestamp

    def test_missing_city_becomes_none(self):
        raw = {'order_id': 'O1', 'total_paise': 100, 'status': 'placed',
               'created_at': '2026-03-20T00:00:00Z'}
        result = normalise_order(raw)
        assert result['city'] is None

    def test_empty_city_string_becomes_none(self):
        raw = {'order_id': 'O1', 'total_paise': 100, 'status': 'placed',
               'city': '   ', 'created_at': '2026-03-20T00:00:00Z'}
        result = normalise_order(raw)
        assert result['city'] is None

    def test_float_total_paise_coerced_to_int(self):
        # Source system sometimes sends "349.00" as a float string
        raw = {'order_id': 'O1', 'total_paise': '349.00', 'status': 'placed',
               'created_at': '2026-03-20T00:00:00Z'}
        result = normalise_order(raw)
        assert result['total_paise'] == 349
        assert isinstance(result['total_paise'], int)

    def test_missing_total_paise_defaults_to_zero(self):
        raw = {'order_id': 'O1', 'status': 'placed', 'created_at': '2026-03-20T00:00:00Z'}
        result = normalise_order(raw)
        assert result['total_paise'] == 0

    def test_missing_order_id_raises(self):
        raw = {'total_paise': 100, 'status': 'placed', 'created_at': '2026-03-20T00:00:00Z'}
        with pytest.raises(KeyError):
            normalise_order(raw)

# Run: pytest test_normalise_order.py -v
# Rule: test the happy path, all null/missing combinations, type edge cases,
#       and every branch in your transformation logic`}
        </CodeBox>
      </QA>

      <QA n={9} q="What is the difference between multiprocessing and concurrent.futures in Python?">
        <Para>
          <code>multiprocessing</code> is the lower-level module — you manage
          processes, queues, and shared memory explicitly.
          <code>concurrent.futures</code> provides a higher-level abstraction
          (<code>ProcessPoolExecutor</code> and <code>ThreadPoolExecutor</code>)
          with a consistent interface for submitting work and collecting results.
          For most data engineering tasks, <code>concurrent.futures</code> is
          the right choice — it handles process lifecycle management and provides
          clean <code>Future</code> objects for result collection.
        </Para>
        <CodeBox label="concurrent.futures — parallel file processing">
{`from concurrent.futures import ProcessPoolExecutor, as_completed
import os

def process_store_file(filepath: str) -> dict:
    """CPU-bound: read, parse, aggregate one store's daily sales file."""
    records = read_parquet(filepath)
    return {
        'store_id':    extract_store_id(filepath),
        'total_sales': sum(r['total_paise'] for r in records),
        'order_count': len(records),
        'filepath':    filepath,
    }

def process_all_stores_parallel(data_dir: str) -> list[dict]:
    filepaths = [
        os.path.join(data_dir, f)
        for f in os.listdir(data_dir)
        if f.endswith('.parquet')
    ]

    results = []
    failed = []

    # ProcessPoolExecutor: each worker is a separate OS process — true CPU parallelism
    # max_workers: typically os.cpu_count() for CPU-bound work
    with ProcessPoolExecutor(max_workers=os.cpu_count()) as executor:
        # Submit all tasks upfront
        future_to_path = {
            executor.submit(process_store_file, fp): fp
            for fp in filepaths
        }
        # as_completed yields futures as they finish (not in submission order)
        for future in as_completed(future_to_path):
            path = future_to_path[future]
            try:
                result = future.result()
                results.append(result)
            except Exception as exc:
                failed.append({'filepath': path, 'error': str(exc)})

    if failed:
        logger.error(f"{len(failed)} files failed: {failed}")

    return results`}
        </CodeBox>
      </QA>

      <QA n={10} q="How does Python's asyncio work and when would you use it in a data pipeline?">
        <Para>
          <code>asyncio</code> is Python's single-threaded concurrency model.
          Instead of threads or processes, it uses a single event loop that
          switches between coroutines (functions defined with <code>async def</code>)
          whenever a coroutine awaits an I/O operation. While one coroutine waits
          for a network response, the event loop runs other coroutines.
        </Para>
        <Para>
          Use it in data pipelines when you have high I/O concurrency — calling
          many APIs simultaneously, making many database queries, or downloading
          many files — and threads would be too heavyweight (each thread uses
          ~1 MB of stack). Asyncio can run thousands of concurrent I/O operations
          with minimal memory overhead.
        </Para>
        <CodeBox label="asyncio — concurrent API enrichment">
{`import asyncio
import aiohttp   # async HTTP client

async def fetch_store_metadata(session: aiohttp.ClientSession, store_id: str) -> dict:
    """Fetch store metadata from internal API — I/O bound."""
    async with session.get(f"https://stores.internal/api/v1/{store_id}") as response:
        return await response.json()

async def enrich_all_stores(store_ids: list[str]) -> dict[str, dict]:
    """Fetch metadata for all stores concurrently."""
    async with aiohttp.ClientSession() as session:
        # asyncio.gather runs all coroutines concurrently on one thread
        tasks = [fetch_store_metadata(session, sid) for sid in store_ids]
        results = await asyncio.gather(*tasks, return_exceptions=True)

    store_map = {}
    for store_id, result in zip(store_ids, results):
        if isinstance(result, Exception):
            logger.error(f"Failed to fetch {store_id}: {result}")
        else:
            store_map[store_id] = result
    return store_map

# 10 stores: sequential would take 10 × 100ms = 1 second
# concurrent with asyncio: ~100ms total (all requests in flight simultaneously)

# Run from synchronous code:
store_map = asyncio.run(enrich_all_stores(['ST001', 'ST002', ..., 'ST010']))

# When NOT to use asyncio:
# CPU-bound work (parsing, compression, ML inference) — use multiprocessing
# Simple sequential scripts — overhead not justified
# Teams unfamiliar with async patterns — bugs are subtle and hard to debug`}
        </CodeBox>
      </QA>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SECTION 2 — SQL */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <SectionTag text="// Section 02 — SQL Advanced" />
      <SectionTitle>SQL — 10 Questions</SectionTitle>

      <QA n={11} q="★ What are window functions? Write a query to find the top-selling product in each city.">
        <Para>
          Window functions perform calculations across a set of rows related to
          the current row — without collapsing the result set like GROUP BY does.
          The window is defined by the <code>OVER</code> clause, which specifies
          partitioning, ordering, and frame boundaries.
        </Para>
        <CodeBox label="window function — top product per city">
{`-- Table: order_items(order_id, product_id, product_name, city, quantity, total_paise)

-- Step 1: aggregate revenue per product per city
WITH product_city_revenue AS (
    SELECT
        city,
        product_id,
        product_name,
        SUM(total_paise)  AS total_revenue_paise,
        SUM(quantity)     AS total_units_sold
    FROM order_items
    WHERE order_date = CURRENT_DATE - INTERVAL '30 days'
    GROUP BY city, product_id, product_name
),

-- Step 2: rank products within each city by revenue
ranked AS (
    SELECT
        city,
        product_id,
        product_name,
        total_revenue_paise,
        total_units_sold,
        RANK() OVER (
            PARTITION BY city          -- restart ranking for each city
            ORDER BY total_revenue_paise DESC
        ) AS revenue_rank
    FROM product_city_revenue
)

-- Step 3: keep only the top product per city
SELECT city, product_id, product_name, total_revenue_paise, total_units_sold
FROM ranked
WHERE revenue_rank = 1
ORDER BY total_revenue_paise DESC;

-- RANK vs DENSE_RANK vs ROW_NUMBER:
-- RANK():       ties get the same rank, next rank skips (1, 1, 3)
-- DENSE_RANK(): ties get the same rank, no skip      (1, 1, 2)
-- ROW_NUMBER(): every row gets a unique number       (1, 2, 3) — arbitrary for ties

-- If you want exactly ONE product per city even when tied, use ROW_NUMBER.
-- If you want all tied products, use RANK or DENSE_RANK with WHERE rank = 1.`}
        </CodeBox>
      </QA>

      <QA n={12} q="★ What is the difference between RANK, DENSE_RANK, and ROW_NUMBER? When does each produce different results?">
        <CodeBox label="rank vs dense_rank vs row_number — concrete example">
{`-- Scores for 5 students — two students tied at 85
WITH scores AS (
    SELECT 'Priya'   AS name, 92 AS score UNION ALL
    SELECT 'Arjun',              85 UNION ALL
    SELECT 'Sneha',              85 UNION ALL   -- tied with Arjun
    SELECT 'Rahul',              78 UNION ALL
    SELECT 'Divya',              71
)
SELECT
    name,
    score,
    RANK()       OVER (ORDER BY score DESC) AS rnk,
    DENSE_RANK() OVER (ORDER BY score DESC) AS dense_rnk,
    ROW_NUMBER() OVER (ORDER BY score DESC) AS row_num
FROM scores;

/*  name    score  rnk  dense_rnk  row_num
    Priya   92     1    1          1
    Arjun   85     2    2          2       ← Arjun and Sneha tied
    Sneha   85     2    2          3       ← same RANK and DENSE_RANK
    Rahul   78     4    3          4       ← RANK skips 3, DENSE_RANK does not
    Divya   71     5    4          5
*/

-- RANK:       Arjun=2, Sneha=2, Rahul=4 (3 is skipped — "2 people ranked above Rahul")
-- DENSE_RANK: Arjun=2, Sneha=2, Rahul=3 (no gap — just the distinct rank position)
-- ROW_NUMBER: Arjun=2, Sneha=3, Rahul=4 (arbitrary tie-breaking — no true guarantee which)

-- Use RANK when: you need to know "how many rows ranked above this one"
-- Use DENSE_RANK when: you need contiguous rank numbers (leaderboards)
-- Use ROW_NUMBER when: you need exactly one row per partition (top-N deduplication)`}
        </CodeBox>
      </QA>

      <QA n={13} q="★ Write a query to calculate 7-day rolling average order value per store.">
        <CodeBox label="rolling average — window frame specification">
{`-- Table: daily_store_sales(store_id, order_date, order_count, total_paise)
-- Goal: for each store, for each date, average of total_paise over the last 7 days

SELECT
    store_id,
    order_date,
    total_paise,
    ROUND(
        AVG(total_paise) OVER (
            PARTITION BY store_id
            ORDER BY order_date
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
            -- "the current row and the 6 rows before it = 7 rows total"
        ) / 100.0,
        2
    ) AS rolling_7d_avg_inr
FROM daily_store_sales
ORDER BY store_id, order_date;

-- ROWS BETWEEN vs RANGE BETWEEN:
-- ROWS BETWEEN 6 PRECEDING AND CURRENT ROW:
--   Exactly 6 physical rows before current row.
--   If dates have gaps (no sales on Sunday), those dates are simply absent — no nulls.

-- RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW:
--   All rows with order_date within 6 calendar days of current row's date.
--   If Sunday is missing, the 7-day window still spans 7 calendar days
--   but only counts the days with actual data.
--   Use this when gaps in dates mean something business-wise.

-- Note: in the first 6 rows for each store, the average is computed on fewer than 7 days.
-- If you need to exclude incomplete windows:
-- WHERE (SELECT COUNT(*) FROM ... WHERE store_id = s.store_id AND order_date
--        BETWEEN s.order_date - 6 AND s.order_date) = 7
-- Or: use a minimum periods check in Spark/pandas`}
        </CodeBox>
      </QA>

      <QA n={14} q="What is a CTE and how is it different from a subquery? When would you prefer each?">
        <CodeBox label="CTE vs subquery — readability and performance">
{`-- Subquery approach — nested, harder to read, repeated if referenced twice
SELECT city, AVG(order_count) AS avg_orders
FROM (
    SELECT city, DATE_TRUNC('week', order_date) AS week, COUNT(*) AS order_count
    FROM orders
    WHERE status = 'completed'
    GROUP BY city, week
) weekly_orders
GROUP BY city;

-- CTE approach — named, readable, reusable within the query
WITH weekly_orders AS (
    SELECT city, DATE_TRUNC('week', order_date) AS week, COUNT(*) AS order_count
    FROM orders
    WHERE status = 'completed'
    GROUP BY city, week
),
city_stats AS (
    SELECT city, AVG(order_count) AS avg_orders, MAX(order_count) AS peak_orders
    FROM weekly_orders    -- can reference the CTE twice without recomputing
    GROUP BY city
)
SELECT * FROM city_stats WHERE avg_orders > 100 ORDER BY avg_orders DESC;

-- Performance difference:
-- In PostgreSQL: a CTE is an "optimisation fence" — the planner treats it as
--   a materialised subquery. The result is computed once and stored.
--   Subqueries can be inlined and optimised with the outer query.
--   Since PostgreSQL 12, CTEs can be inlined with WITH ... AS NOT MATERIALIZED.

-- In Snowflake, BigQuery, Redshift: CTEs are almost always inlined — no difference.

-- Prefer CTE when:
-- The result is referenced more than once (avoids recomputation)
-- The query has multiple logical steps (readability)
-- You are building up a complex transformation incrementally (dbt models)

-- Prefer subquery when:
-- The result is used once and is simple
-- You need the planner to inline it for performance (PostgreSQL)
-- EXISTS/NOT EXISTS patterns (correlated subquery semantics)`}
        </CodeBox>
      </QA>

      <QA n={15} q="★ Write a query to identify customers who ordered in January but not in February (lapsed customers).">
        <CodeBox label="lapsed customers — three equivalent approaches">
{`-- Table: orders(order_id, customer_id, order_date, status)

-- Approach 1: NOT EXISTS (most readable, typically best performance)
SELECT DISTINCT customer_id
FROM orders
WHERE DATE_TRUNC('month', order_date) = '2026-01-01'
  AND status = 'completed'
  AND NOT EXISTS (
      SELECT 1 FROM orders o2
      WHERE o2.customer_id = orders.customer_id
        AND DATE_TRUNC('month', o2.order_date) = '2026-02-01'
        AND o2.status = 'completed'
  );

-- Approach 2: LEFT JOIN + IS NULL (explicit, easy to explain)
SELECT DISTINCT jan.customer_id
FROM (
    SELECT DISTINCT customer_id FROM orders
    WHERE DATE_TRUNC('month', order_date) = '2026-01-01' AND status = 'completed'
) jan
LEFT JOIN (
    SELECT DISTINCT customer_id FROM orders
    WHERE DATE_TRUNC('month', order_date) = '2026-02-01' AND status = 'completed'
) feb
ON jan.customer_id = feb.customer_id
WHERE feb.customer_id IS NULL;   -- no matching February row = lapsed

-- Approach 3: EXCEPT (cleanest syntax where supported)
SELECT DISTINCT customer_id FROM orders
WHERE DATE_TRUNC('month', order_date) = '2026-01-01' AND status = 'completed'
EXCEPT
SELECT DISTINCT customer_id FROM orders
WHERE DATE_TRUNC('month', order_date) = '2026-02-01' AND status = 'completed';

-- In an interview, state all three approaches and their trade-offs.
-- Explain which you would choose and why (typically NOT EXISTS or LEFT JOIN
-- because they make the intent explicitly readable and plan well on large tables).`}
        </CodeBox>
      </QA>

      <QA n={16} q="What is query plan analysis? How do you use EXPLAIN in PostgreSQL?">
        <Para>
          A query plan is the sequence of operations the database engine will
          execute to satisfy a query. <code>EXPLAIN</code> shows the plan without
          running it. <code>EXPLAIN ANALYZE</code> runs the query and shows
          actual vs estimated row counts — the gap between them reveals why
          the planner made suboptimal choices.
        </Para>
        <CodeBox label="EXPLAIN ANALYZE — reading a query plan">
{`EXPLAIN ANALYZE
SELECT o.order_id, c.customer_name, o.total_paise
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_date >= '2026-01-01' AND o.status = 'completed';

/*  Example output:
    Hash Join  (cost=1250.00..8420.00 rows=42000 width=48)
               (actual time=23.4..187.6 rows=38421 loops=1)
      Hash Cond: (o.customer_id = c.customer_id)
      ->  Seq Scan on orders o
               (cost=0..5200.00 rows=42000 width=32)
               (actual time=0.1..89.3 rows=38421 loops=1)
               Filter: (order_date >= '2026-01-01' AND status = 'completed')
               Rows Removed by Filter: 461579
      ->  Hash  (cost=820.00..820.00 rows=34400 width=24)
               (actual time=15.2..15.2 rows=34400 loops=1)
               ->  Seq Scan on customers c
                   (cost=0..820.00 rows=34400 width=24)
*/

-- What to look for:
-- "Seq Scan" on a large table with a Filter → missing index
--   Fix: CREATE INDEX ON orders(order_date, status)
--   → Bitmap Index Scan will replace Seq Scan (3× faster for selective queries)

-- "Hash Join" → good for large tables (no index required)
-- "Nested Loop" → good when one table is small; bad when both tables are large

-- Estimated vs actual rows:
-- Estimated: 42000 | Actual: 38421 → good estimate (within 10%)
-- Estimated: 42000 | Actual: 4 → bad estimate → planner chose wrong join strategy
-- Fix: ANALYZE orders (refreshes table statistics) → planner gets better estimates

-- "loops=1" → outer side of a Nested Loop → multiply cost by loops for true cost`}
        </CodeBox>
      </QA>

      <QA n={17} q="★ What is a recursive CTE? Write one to traverse a category hierarchy.">
        <CodeBox label="recursive CTE — category tree traversal">
{`-- Table: categories(category_id, category_name, parent_id)
-- Example: Electronics → Phones → Smartphones → 5G Smartphones
-- parent_id is NULL for root categories

WITH RECURSIVE category_tree AS (
    -- Anchor member: start from the root(s)
    SELECT
        category_id,
        category_name,
        parent_id,
        1 AS depth,
        category_name::TEXT AS full_path
    FROM categories
    WHERE parent_id IS NULL   -- root categories

    UNION ALL

    -- Recursive member: join with the previous iteration's result
    SELECT
        c.category_id,
        c.category_name,
        c.parent_id,
        ct.depth + 1,
        ct.full_path || ' → ' || c.category_name
    FROM categories c
    JOIN category_tree ct ON c.parent_id = ct.category_id
    -- Recursion terminates when no more children are found
)
SELECT category_id, category_name, depth, full_path
FROM category_tree
ORDER BY full_path;

/*  Result:
    category_id  category_name    depth  full_path
    1            Electronics      1      Electronics
    2            Phones           2      Electronics → Phones
    4            Smartphones      3      Electronics → Phones → Smartphones
    7            5G Smartphones   4      Electronics → Phones → Smartphones → 5G Smartphones
    3            Laptops          2      Electronics → Laptops
*/

-- Safety: add MAXDEPTH or a cycle detection guard for graphs that may have cycles
-- In PostgreSQL 14+: WITH RECURSIVE ... CYCLE category_id SET is_cycle USING path`}
        </CodeBox>
      </QA>

      <QA n={18} q="How would you deduplicate rows in SQL when you have no single unique key?">
        <CodeBox label="deduplication — ROW_NUMBER approach">
{`-- Scenario: Kafka → PostgreSQL staging table has duplicate events
-- No single unique key, but combination of (order_id, event_type, event_time) should be unique

-- Step 1: identify duplicates
SELECT order_id, event_type, event_time, COUNT(*) AS copies
FROM staging_order_events
GROUP BY order_id, event_type, event_time
HAVING COUNT(*) > 1;

-- Step 2: deduplicate using ROW_NUMBER + CTE
WITH ranked AS (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY order_id, event_type, event_time
            ORDER BY ingested_at DESC   -- keep the most recently ingested copy
        ) AS rn
    FROM staging_order_events
)
-- Option A: SELECT only rank=1 rows into a new table
SELECT * FROM ranked WHERE rn = 1;

-- Option B: DELETE duplicates in-place (PostgreSQL)
DELETE FROM staging_order_events
WHERE ctid NOT IN (
    SELECT MIN(ctid)
    FROM staging_order_events
    GROUP BY order_id, event_type, event_time
);

-- Option C: MERGE/UPSERT into target table (preferred for idempotent pipelines)
-- Write deduplicated data directly to the target using a composite natural key
-- ON CONFLICT (order_id, event_type, event_time) DO UPDATE SET ...
-- → Staging table never needs manual deduplication — target handles it`}
        </CodeBox>
      </QA>

      <QA n={19} q="What is predicate pushdown and why does it matter in distributed SQL engines?">
        <Para>
          Predicate pushdown is a query optimisation where a filter condition
          (predicate) is moved as close to the data source as possible —
          ideally applied before data is read into memory or transferred over
          the network. This reduces the amount of data that needs to be
          scanned, transmitted, and processed.
        </Para>
        <Para>
          In Spark reading Parquet files, predicate pushdown means the Parquet
          reader skips entire row groups (chunks of 128 MB) if the filter
          column's min/max statistics show the filter cannot match any row in
          that group. A query with <code>WHERE order_date = '2026-03-20'</code>
          on a 10 TB Parquet dataset might scan only 28 GB (one day) if the
          data is partitioned by date and Parquet statistics are accurate.
          Without pushdown, all 10 TB are read and then filtered in memory.
        </Para>
        <CodeBox label="predicate pushdown — Spark and Snowflake">
{`# Spark — predicate pushdown into Parquet
# The filter on order_date is pushed into the Parquet reader
# Parquet skips row groups where max(order_date) < '2026-03-20'
df = (spark.read.format('parquet')
      .load('abfss://gold@stfreshmartdev.dfs.core.windows.net/orders/')
      .filter("order_date = '2026-03-20'"))

# Check if pushdown happened: look for PushedFilters in the plan
df.explain()
# → "PushedFilters: [IsNotNull(order_date), EqualTo(order_date,2026-03-20)]" ✓

# What BLOCKS predicate pushdown in Spark:
# 1. Applying a Python UDF before the filter — UDFs are opaque to the optimizer
#    df.withColumn('derived', my_udf('col')).filter("derived = 'value'")
#    → Entire dataset is read, UDF applied, then filtered — no pushdown
#    Fix: filter on source columns before applying UDFs

# 2. Reading CSV (no statistics) instead of Parquet
#    CSV has no embedded min/max stats — full file scan always
#    Fix: convert CSV sources to Parquet on landing

# Snowflake — micro-partition pruning (equivalent to predicate pushdown)
# Snowflake stores min/max metadata for each micro-partition (50-500 MB chunks)
# WHERE order_date = '2026-03-20' → Snowflake skips micro-partitions where
# max(order_date) < '2026-03-20' OR min(order_date) > '2026-03-20'
# For well-clustered tables: scans 0.01% of total data for a single date filter`}
        </CodeBox>
      </QA>

      <QA n={20} q="★ Write a query to calculate month-over-month revenue growth percentage by city.">
        <CodeBox label="month-over-month growth — LAG window function">
{`WITH monthly_revenue AS (
    SELECT
        city,
        DATE_TRUNC('month', order_date)  AS month,
        SUM(total_paise) / 100.0         AS revenue_inr
    FROM orders
    WHERE status = 'completed'
    GROUP BY city, DATE_TRUNC('month', order_date)
),
with_previous AS (
    SELECT
        city,
        month,
        revenue_inr,
        LAG(revenue_inr, 1) OVER (
            PARTITION BY city
            ORDER BY month
        ) AS prev_month_revenue_inr
        -- LAG(col, 1) = value from the previous row within the partition
        -- LAG(col, 3) would give 3 months ago
    FROM monthly_revenue
)
SELECT
    city,
    TO_CHAR(month, 'YYYY-MM')     AS month,
    ROUND(revenue_inr, 2)         AS revenue_inr,
    ROUND(prev_month_revenue_inr, 2) AS prev_revenue_inr,
    CASE
        WHEN prev_month_revenue_inr IS NULL THEN NULL   -- first month has no prior
        WHEN prev_month_revenue_inr = 0     THEN NULL   -- avoid division by zero
        ELSE ROUND(
            (revenue_inr - prev_month_revenue_inr) / prev_month_revenue_inr * 100,
            2
        )
    END AS mom_growth_pct
FROM with_previous
ORDER BY city, month;

-- Companion: LEAD() looks forward instead of backward
-- LEAD(revenue_inr, 1) OVER (...) = next month's revenue
-- Useful for: "how much will the customer spend in the next period?" (prediction labels)`}
        </CodeBox>
      </QA>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SECTION 3 — PIPELINES */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <SectionTag text="// Section 03 — Pipeline Design" />
      <SectionTitle>Pipeline Design — 10 Questions</SectionTitle>

      <QA n={21} q="★ What is idempotency in pipelines and how do you implement it?">
        <Para>
          An idempotent pipeline produces the same output regardless of how
          many times it is run with the same input. This property is essential
          because pipelines fail and must be retried — without idempotency,
          a retry creates duplicate data. Three implementation patterns cover
          most cases.
        </Para>
        <CodeBox label="idempotency — three implementation patterns">
{`# Pattern 1: UPSERT on natural key (most common)
# If the row exists, update it. If not, insert it. Running twice = same result.
execute_sql("""
    INSERT INTO daily_store_stats (store_id, order_date, revenue_paise, order_count)
    VALUES (%s, %s, %s, %s)
    ON CONFLICT (store_id, order_date)
    DO UPDATE SET
        revenue_paise = EXCLUDED.revenue_paise,
        order_count   = EXCLUDED.order_count,
        updated_at    = NOW()
""", [store_id, order_date, revenue, count])

# Pattern 2: DELETE + INSERT with pipeline run ID
# Delete the previous run's output, insert fresh. Second run replaces, not appends.
with transaction():
    execute_sql(
        "DELETE FROM daily_store_stats WHERE order_date = %s AND store_id = %s",
        [order_date, store_id]
    )
    execute_sql(
        "INSERT INTO daily_store_stats VALUES (%s, %s, %s, %s)",
        [store_id, order_date, revenue, count]
    )

# Pattern 3: Partition overwrite (for Parquet/Delta on cloud storage)
# Overwrite the entire partition — second run replaces it atomically
(df.write
   .format('delta')
   .mode('overwrite')
   .option('replaceWhere', "order_date = '2026-03-20'")
   .save('abfss://gold@stfreshmartdev.dfs.core.windows.net/daily_store_stats/')
)
# replaceWhere: only overwrite the matching partition — other dates untouched
# Atomic at the Delta Lake transaction level — no partial state visible to readers

# What makes a pipeline NOT idempotent:
# → INSERT without ON CONFLICT → duplicate rows on retry
# → UPDATE SET total = total + X → accumulates on each run
# → APPEND mode without deduplication → grows on each run`}
        </CodeBox>
      </QA>

      <QA n={22} q="★ What is the difference between ETL and ELT? Which is better?">
        <Para>
          ETL (Extract, Transform, Load) transforms data before loading it
          into the destination. The transformation happens in a separate
          compute layer — historically a dedicated ETL server or tool.
          ELT (Extract, Load, Transform) loads raw data into the destination
          first, then transforms it using the destination's own compute engine.
        </Para>
        <Para>
          Neither is universally better — the right choice depends on the
          destination's compute capability, data volume, and transformation
          complexity. The shift to ELT was driven by cloud data warehouses
          (Snowflake, BigQuery, Redshift) becoming powerful enough to run
          complex transformations efficiently, making it cheaper to load raw
          data and transform in-warehouse than to run a separate transformation
          cluster.
        </Para>
        <CodeBox label="ETL vs ELT — decision criteria">
{`# ETL — transform BEFORE loading
# Use when:
# - Destination has limited compute (legacy on-premise data warehouse)
# - Raw data contains PII that must never land in the destination
# - Transformations are computationally expensive and the destination charges per query
# - Source data must be heavily filtered (1TB source → 1GB useful data)

# Example: Spark ETL job
raw_df = spark.read.parquet(source_path)
clean_df = (raw_df
    .filter("status = 'completed'")
    .withColumn('total_inr', col('total_paise') / 100)
    .drop('raw_payload', 'internal_flags')   # strip PII before loading
    .dropDuplicates(['order_id']))
clean_df.write.mode('overwrite').saveAsTable('warehouse.orders')

# ELT — load raw THEN transform in-warehouse
# Use when:
# - Destination has powerful compute (Snowflake, BigQuery, Databricks)
# - You need to iterate on transformation logic without re-ingesting data
# - Multiple teams need access to raw data for different purposes
# - dbt is your transformation layer (dbt runs SQL inside the warehouse)

# Step 1: load raw (Fivetran, Kafka Connect, Airbyte)
# → raw.orders (exact mirror of source, no changes)

# Step 2: transform with dbt inside Snowflake
# models/staging/stg_orders.sql:
#   SELECT
#     order_id,
#     TRIM(UPPER(customer_id)) AS customer_id,
#     total_paise::INT AS total_paise,
#     LOWER(status) AS status
#   FROM raw.orders
#   WHERE status != 'test'

# Advantage of ELT: if transformation logic was wrong, fix the dbt model and re-run.
# No re-ingestion from source needed — raw data is already in the warehouse.`}
        </CodeBox>
      </QA>

      <QA n={23} q="What is CDC (Change Data Capture) and how does it work in PostgreSQL?">
        <Para>
          CDC captures row-level changes (inserts, updates, deletes) as they
          happen in a source database and streams them to downstream systems
          in near real-time. Instead of querying the database periodically
          (polling), CDC reads the database's internal transaction log — in
          PostgreSQL, this is the WAL (Write-Ahead Log).
        </Para>
        <CodeBox label="CDC with PostgreSQL logical replication">
{`# PostgreSQL WAL-based CDC setup

# Step 1: Enable logical replication on PostgreSQL
# In postgresql.conf:
#   wal_level = logical
#   max_replication_slots = 4
#   max_wal_senders = 4

# Step 2: Create a replication slot (Debezium or Fivetran does this automatically)
# SELECT pg_create_logical_replication_slot('freshmart_cdc', 'pgoutput');

# Step 3: Grant replication privilege
# CREATE USER cdc_user WITH REPLICATION LOGIN PASSWORD 'secret';
# GRANT SELECT ON ALL TABLES IN SCHEMA public TO cdc_user;

# What CDC events look like (Debezium output format):
{
    "before": None,                          # INSERT: no previous state
    "after": {
        "order_id": "ORD-2026-887432",
        "customer_id": "C98765",
        "total_paise": 34900,
        "status": "placed",
        "updated_at": "2026-03-20T14:23:11Z"
    },
    "op": "c",                               # c=create, u=update, d=delete, r=read(snapshot)
    "ts_ms": 1742480591000,                  # when the change occurred in PostgreSQL
    "source": {
        "db": "freshmart_production",
        "schema": "public",
        "table": "orders",
        "lsn": 2847291648                    # Log Sequence Number — position in WAL
    }
}

# For an UPDATE, "before" contains the old row, "after" contains the new row
# This lets you compute what changed, not just what the new state is

# CDC advantages over polling:
# → Low latency: changes land in Kafka within milliseconds of the DB commit
# → No missed changes: polling might miss a row that was inserted and deleted between polls
# → No load on DB: reading WAL has minimal impact vs running SELECT COUNT(*) repeatedly
# → Complete picture: DELETE events are captured (polling can never see deleted rows)

# CDC operational concern:
# The replication slot holds WAL segments until a consumer reads them.
# If the CDC consumer is down for hours, WAL accumulates and can fill disk.
# Monitor: SELECT slot_name, pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn))
#          FROM pg_replication_slots;
# Alert if lag exceeds 5 GB.`}
        </CodeBox>
      </QA>

      <QA n={24} q="★ How do you handle schema evolution in a data pipeline without breaking downstream consumers?">
        <Para>
          Schema evolution — adding, removing, or changing columns — is
          inevitable in production systems. The goal is to evolve schemas
          in a way that does not break existing consumers or require
          coordinating simultaneous deployments across all systems.
        </Para>
        <CodeBox label="schema evolution — backward-compatible rules">
{`# Using Avro with Schema Registry (the standard approach for Kafka pipelines)

# Original schema (version 1):
schema_v1 = {
    "type": "record",
    "name": "OrderEvent",
    "fields": [
        {"name": "order_id",    "type": "string"},
        {"name": "customer_id", "type": "string"},
        {"name": "total_paise", "type": "int"},
        {"name": "status",      "type": "string"}
    ]
}

# Adding a new optional field (BACKWARD COMPATIBLE — old consumers can ignore it)
schema_v2 = {
    "type": "record",
    "name": "OrderEvent",
    "fields": [
        {"name": "order_id",       "type": "string"},
        {"name": "customer_id",    "type": "string"},
        {"name": "total_paise",    "type": "int"},
        {"name": "status",         "type": "string"},
        {"name": "payment_method", "type": ["null", "string"], "default": None}
        # ["null", "string"] = union type = nullable
        # default=None = backward compatible (old consumers that don't know this field
        #                will use the default when reading old messages)
    ]
}

# Schema registry enforces compatibility:
# BACKWARD: new schema can read messages written with old schema ✓
# FORWARD:  old schema can read messages written with new schema ✓
# FULL:     both backward and forward ✓
# NONE:     no compatibility check — dangerous in production

# Operations that are BACKWARD COMPATIBLE (safe):
# ✓ Add a new nullable field with a default value
# ✓ Remove a field that had a default value

# Operations that are NOT backward compatible (breaking changes):
# ✗ Remove a required field (old consumers that read new messages will fail)
# ✗ Change a field's type (int → string)
# ✗ Rename a field
# ✗ Add a required field without a default

# Breaking change strategy:
# 1. Create a new topic version: orders.v2 instead of orders.v1
# 2. Run both producers and consumers in parallel (dual-write)
# 3. Migrate consumers to v2 one by one
# 4. Deprecate v1 after all consumers migrated
# 5. This is the "expand and contract" or "parallel run" pattern`}
        </CodeBox>
      </QA>

      <QA n={25} q="What is data lineage and why does it matter operationally?">
        <Para>
          Data lineage is the documented record of where data came from, how
          it was transformed at each step, and where it ended up. Column-level
          lineage traces a specific field — for example, the
          <code>revenue_inr</code> column in the gold reporting table traces
          back through dbt model <code>mart_daily_revenue</code> →
          <code>stg_orders</code> → raw CDC table → source PostgreSQL column
          <code>total_paise</code> divided by 100.
        </Para>
        <Para>
          Operationally it matters in three concrete ways. First, impact
          analysis — if the source column <code>total_paise</code> changes
          its semantics (now includes taxes), lineage tells you every downstream
          report and model that will be affected. Without lineage, you discover
          these impacts one by one as consumers complain. Second, incident
          debugging — "why is this dashboard showing wrong numbers?" is answered
          in minutes with lineage (trace back to the source of corruption)
          vs hours without it. Third, regulatory compliance — GDPR and DPDP
          require proving where personal data flows. Lineage is that proof.
        </Para>
      </QA>

      <QA n={26} q="★ How do you implement SCD Type 2 in a data warehouse pipeline?">
        <CodeBox label="SCD Type 2 — MERGE implementation">
{`-- SCD Type 2: preserve the full history of dimension changes
-- When a customer changes their city, keep the old record (for historical orders)
-- and add a new record with the updated city

-- Dimension table structure:
-- customers_dim(customer_sk, customer_id, customer_name, city, tier,
--               valid_from, valid_to, is_current)

-- MERGE statement to handle SCD Type 2 in Snowflake/BigQuery
MERGE INTO customers_dim AS target
USING (
    -- source: latest state from the operational database (via CDC)
    SELECT customer_id, customer_name, city, tier FROM staging.customers_latest
) AS source
ON target.customer_id = source.customer_id AND target.is_current = TRUE

-- Case 1: new customer — insert fresh record
WHEN NOT MATCHED THEN INSERT (
    customer_sk, customer_id, customer_name, city, tier, valid_from, valid_to, is_current
) VALUES (
    uuid_generate_v4(), source.customer_id, source.customer_name,
    source.city, source.tier, CURRENT_DATE, '9999-12-31', TRUE
)

-- Case 2: existing customer, something changed — expire old, insert new
WHEN MATCHED AND (
    target.city != source.city OR
    target.tier != source.tier
) THEN UPDATE SET
    valid_to   = CURRENT_DATE - INTERVAL '1 day',
    is_current = FALSE;

-- After the MERGE, insert new current records for changed customers
INSERT INTO customers_dim (customer_sk, customer_id, customer_name, city, tier,
                           valid_from, valid_to, is_current)
SELECT
    uuid_generate_v4(), s.customer_id, s.customer_name, s.city, s.tier,
    CURRENT_DATE, '9999-12-31', TRUE
FROM staging.customers_latest s
JOIN customers_dim d ON s.customer_id = d.customer_id
WHERE d.valid_to = CURRENT_DATE - INTERVAL '1 day'
  AND d.is_current = FALSE
  AND d.valid_from < CURRENT_DATE;   -- just expired today

-- Querying with SCD Type 2:
-- "What city was customer C98765 in when they placed order ORD-001 on 2025-11-15?"
SELECT c.city
FROM orders o
JOIN customers_dim c ON o.customer_id = c.customer_id
WHERE o.order_id = 'ORD-001'
  AND o.order_date BETWEEN c.valid_from AND c.valid_to;
-- → Returns the city as it was in November 2025, not the current city`}
        </CodeBox>
      </QA>

      <QA n={27} q="What is a data contract and why are teams moving toward them?">
        <Para>
          A data contract is a formal, machine-readable agreement between a data
          producer (a team or service) and data consumers about what data will
          be produced, in what format, at what frequency, with what quality
          guarantees, and what the producer's SLA is. It is the data equivalent
          of an API contract.
        </Para>
        <Para>
          Teams are moving toward data contracts because the alternative —
          informal agreements, Slack messages, and tribal knowledge — consistently
          fails at scale. A producer changes a column name without announcement.
          Consumers break. Nobody knows who to call. The contract makes the
          agreement explicit, testable, and enforced at the pipeline level.
          Schema registries enforce the schema portion of the contract.
          Great Expectations or Soda Core can enforce the quality portion.
          The contract is checked on every pipeline run — violations are
          caught at the source, not discovered in a report two weeks later.
        </Para>
      </QA>

      <QA n={28} q="How do you handle late-arriving data in a batch pipeline that runs daily?">
        <CodeBox label="late-arriving data — watermark and reprocessing strategies">
{`# Problem: daily batch pipeline runs at 2 AM for "yesterday's" data
# Mobile app orders placed at 23:58 may not arrive in the data store until 00:10
# These orders are missing from the 2 AM run

# Strategy 1: delayed processing window
# Instead of processing for order_date = yesterday, process for order_date = 2 days ago
# Gives the system 24 hours to receive all late-arriving events
# Cost: reports are always 2 days stale

# Strategy 2: reprocessing window
# Run the daily job for yesterday, AND re-run for the previous 2 days
# Any late-arriving events from 2 days ago are now included
# Uses partition overwrite (idempotent) so re-running is safe

from datetime import date, timedelta

def run_daily_pipeline(processing_date: date):
    """Process one day's orders and overwrite the partition."""
    df = (spark.read.parquet(source_path)
          .filter(f"order_date = '{processing_date}'")
          .groupBy('store_id')
          .agg(sum('total_paise').alias('revenue_paise'), count('*').alias('orders')))
    (df.write.format('delta')
       .mode('overwrite')
       .option('replaceWhere', f"order_date = '{processing_date}'")
       .save(gold_path))

today = date.today()
# Process yesterday + previous 2 days (catching late arrivals)
for lag in [1, 2, 3]:
    run_daily_pipeline(today - timedelta(days=lag))

# Strategy 3: SLA-based cutoff with explicit late data tracking
# Define: events arriving > 48 hours late are "accepted but flagged"
# Add a column: is_late_arrival = (ingestion_time - event_time) > 48h
# Analytics team knows to treat flagged rows carefully in time-sensitive metrics

# Strategy 4: Lambda architecture (advanced)
# Batch layer: correct, complete, but delayed (2-3 days)
# Speed layer: real-time approximation (Kafka + Flink, seconds-fresh)
# Query layer: serves from speed layer for recent data, batch layer for older data
# Complexity: high — only justified when both low latency AND correction are required`}
        </CodeBox>
      </QA>

      <QA n={29} q="★ What is orchestration in data pipelines? What does Airflow do?">
        <Para>
          Orchestration is the scheduling and coordination of pipeline tasks —
          deciding what runs when, in what order, with what dependencies, and
          what to do when something fails. Without orchestration, pipelines
          are cron jobs that have no dependency awareness, no retry logic, no
          alerting, and no visibility into what ran and when.
        </Para>
        <Para>
          Apache Airflow is the most widely used open-source orchestration
          tool. Pipelines are defined as DAGs (Directed Acyclic Graphs) —
          Python code that specifies tasks, their dependencies, their schedule,
          and their failure handling. Airflow's scheduler triggers tasks when
          their dependencies complete and their schedule window opens. The
          web UI provides visibility into every DAG run, every task's log,
          and the history of successes and failures.
        </Para>
        <CodeBox label="Airflow DAG — FreshCart daily pipeline">
{`from airflow import DAG
from airflow.providers.apache.spark.operators.spark_submit import SparkSubmitOperator
from airflow.providers.postgres.operators.postgres import PostgresOperator
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

default_args = {
    'owner':            'data-team',
    'retries':          2,
    'retry_delay':      timedelta(minutes=5),
    'email_on_failure': True,
    'email':            ['data-alerts@freshmart.in'],
}

with DAG(
    dag_id='freshmart_daily_pipeline',
    default_args=default_args,
    schedule_interval='0 3 * * *',      # 3 AM IST daily
    start_date=datetime(2026, 1, 1),
    catchup=False,                       # don't backfill missed runs on startup
    max_active_runs=1,                   # don't allow parallel runs of this DAG
    tags=['freshmart', 'daily', 'gold'],
) as dag:

    # Task 1: validate raw data landed completely
    validate_raw = PythonOperator(
        task_id='validate_raw_completeness',
        python_callable=check_all_stores_landed,   # custom function
        op_kwargs={'expected_store_count': 10, 'date': '{{ ds }}'},
    )

    # Task 2: run Spark silver layer transformation
    silver_transform = SparkSubmitOperator(
        task_id='transform_to_silver',
        application='s3://freshmart-jobs/silver_transform.py',
        application_args=['--date', '{{ ds }}'],
        conf={'spark.executor.memory': '4g'},
    )

    # Task 3: run Spark gold layer aggregation
    gold_aggregate = SparkSubmitOperator(
        task_id='aggregate_to_gold',
        application='s3://freshmart-jobs/gold_aggregate.py',
        application_args=['--date', '{{ ds }}'],
    )

    # Task 4: validate gold output quality
    validate_gold = PostgresOperator(
        task_id='validate_gold_row_count',
        postgres_conn_id='freshmart_warehouse',
        sql="""
            SELECT CASE
                WHEN COUNT(*) < 10 THEN 1/0   -- division by zero = task failure
                ELSE 1
            END
            FROM gold.daily_store_stats WHERE order_date = '{{ ds }}'
        """,
    )

    # DAG dependency chain: validate_raw → silver → gold → validate_gold
    validate_raw >> silver_transform >> gold_aggregate >> validate_gold`}
        </CodeBox>
      </QA>

      <QA n={30} q="How do you monitor a production data pipeline? What metrics matter?">
        <CodeBox label="pipeline monitoring — the metrics that matter">
{`# The four categories of pipeline metrics

# 1. FRESHNESS — is the data up to date?
# Most important business-facing metric.
# "The dashboard shows yesterday's data" is a business impact, not just a technical issue.

freshness_query = """
    SELECT
        MAX(order_date)                               AS latest_date_in_warehouse,
        CURRENT_DATE - MAX(order_date)                AS days_stale,
        MAX(pipeline_completed_at)                    AS last_pipeline_run
    FROM gold.daily_store_stats
"""
# Alert: days_stale > 1 at 8 AM → pipeline failed overnight

# 2. VOLUME — did the expected amount of data arrive?
volume_query = """
    SELECT
        order_date,
        COUNT(*)                                      AS row_count,
        SUM(total_paise) / 1e7                        AS total_revenue_crore
    FROM gold.daily_store_stats
    WHERE order_date = CURRENT_DATE - 1
"""
# Alert: row_count < 8 (we expect 10 stores — if < 8, something is missing)
# Alert: total_revenue_crore < 50 (business floor — if below, likely a bug)
# Alert: total_revenue_crore > 500 (business ceiling — if above, likely a duplicate)

# 3. SCHEMA — did the source schema change unexpectedly?
# dbt tests catch this in the transformation layer:
# not_null on required columns, accepted_values on enum fields
# Run: dbt test --select gold.daily_store_stats

# 4. LATENCY — how long did the pipeline take?
# Measure wall-clock time per task and total DAG duration
# Alert: total pipeline duration > 2 hours (was < 30 minutes historically)
# → Something changed: data volume spike, slow query, resource contention

# Monitoring stack for a mid-size team:
# - Airflow: task-level success/failure/duration (built in)
# - Prometheus + Grafana: Spark metrics, Kafka consumer lag
# - dbt test results: data quality failures
# - PagerDuty: on-call alerting for critical pipeline failures
# - Slack: non-critical alerts, daily pipeline summary

# The most valuable single metric:
# Consumer lag (for streaming) = log_end_offset - committed_offset
# Pipeline completion time relative to SLA (for batch) = did it finish before 8 AM?`}
        </CodeBox>
      </QA>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SECTION 4 — SPARK & KAFKA */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <SectionTag text="// Section 04 — Spark and Kafka" />
      <SectionTitle>Spark and Kafka — 10 Questions</SectionTitle>

      <QA n={31} q="★ What is the difference between transformations and actions in Spark? What is lazy evaluation?">
        <Para>
          Spark operations are divided into transformations (which define a
          new DataFrame from existing ones — <code>filter</code>,
          <code>select</code>, <code>join</code>, <code>groupBy</code>) and
          actions (which trigger execution and return a result —
          <code>count</code>, <code>collect</code>, <code>write</code>,
          <code>show</code>). Transformations are lazy — they do not execute
          when called. They build up a logical plan. The plan executes only
          when an action is triggered.
        </Para>
        <CodeBox label="lazy evaluation — why it matters for performance">
{`# This code does NOT read any data or do any work:
df = spark.read.parquet('s3://freshmart/orders/')   # no read yet
filtered = df.filter("order_date = '2026-03-20'")  # no filter yet
joined = filtered.join(stores, 'store_id')          # no join yet
aggregated = joined.groupBy('city').agg(sum('total_paise'))  # no aggregation yet

# Spark has built up a logical plan in memory. No data movement has occurred.

# THIS triggers execution — Spark now compiles, optimises, and runs the entire plan:
result = aggregated.count()

# Why lazy evaluation is powerful:
# The Catalyst optimizer sees the ENTIRE logical plan before generating any code.
# It can:
# → Push the filter "order_date = '2026-03-20'" before the join
#   (reducing the join's left side from 1 year of data to 1 day)
# → Determine the join uses a small "stores" table → use broadcast join
# → Prune columns not needed in the final aggregation
# → Combine multiple operations into one physical stage

# If operations were executed eagerly (like pandas):
# → filter runs immediately on the full dataset
# → join runs on the filtered result
# → Optimizer cannot see that filter + join can be combined into a more efficient plan

# Practical implication:
# Don't cache intermediate results unless you use them multiple times
df.filter(...).cache()   # forces materialisation — breaks lazy optimisation
# Only cache when: the same DataFrame is used in 2+ separate actions`}
        </CodeBox>
      </QA>

      <QA n={32} q="★ What causes data skew in Spark and how do you fix it?">
        <Para>
          Data skew occurs when data is unevenly distributed across partitions
          — one or a few partitions have significantly more data than others.
          The Spark job takes as long as the slowest partition (the straggler).
          The most common cause is a JOIN key with highly non-uniform
          distribution — one key value appears millions of times while others
          appear hundreds of times.
        </Para>
        <CodeBox label="diagnosing and fixing data skew">
{`# DIAGNOSIS: Spark UI → Stages → Task Duration Histogram
# Healthy: all tasks take ~same time
# Skewed: most tasks finish in 30s, one takes 45 minutes

# Common causes:
# 1. JOIN key with dominant value (CRED: one large enterprise customer)
# 2. NULL join key (all NULLs hash to the same partition)
# 3. Partition key = low-cardinality column (payment_method: UPI = 80%)

# FIX 1: Broadcast join (when one side is small, < 10 MB)
from pyspark.sql.functions import broadcast
result = orders.join(broadcast(store_metadata), 'store_id')
# No shuffle at all — no skew possible

# FIX 2: Salting (when both sides are large)
from pyspark.sql.functions import col, concat_ws, lit, explode, array, expr

NUM_SALTS = 50

# Salt the large side with a random number
orders_salted = orders.withColumn(
    'salt', (expr('rand()') * NUM_SALTS).cast('int')
).withColumn('join_key', concat_ws('_', col('customer_id'), col('salt')))

# Explode the small side NUM_SALTS times to match all possible salts
customers_salted = customers.withColumn(
    'salt', explode(array([lit(i) for i in range(NUM_SALTS)]))
).withColumn('join_key', concat_ws('_', col('customer_id'), col('salt')))

result = orders_salted.join(customers_salted, 'join_key').drop('salt', 'join_key')
# customer C00001 which had ALL rows on 1 partition
# is now spread across 50 partitions (C00001_0 through C00001_49)

# FIX 3: Handle NULL keys explicitly
# NULLs in join keys never match — they all land in one partition
orders_clean = orders.fillna({'customer_id': 'UNKNOWN'})
# Or: filter out NULLs before joining, union back after`}
        </CodeBox>
      </QA>

      <QA n={33} q="What is the difference between repartition and coalesce in Spark?">
        <CodeBox label="repartition vs coalesce — when to use each">
{`# repartition(n): FULL SHUFFLE — redistributes data across n partitions
# - Can increase OR decrease partition count
# - Results in roughly equal-sized partitions (even distribution)
# - Expensive: triggers a full network shuffle
# - Use when: you need to change partition count AND the distribution matters
#             (before a groupBy/join on a specific key to avoid shuffle later)

# coalesce(n): NO SHUFFLE — combines existing partitions
# - Can ONLY decrease partition count (cannot increase)
# - Partitions may be unequal (just concatenates neighbouring partitions)
# - Cheap: no network transfer
# - Use when: reducing partition count after filtering (fewer rows, same partitions)

# Example: filtering reduced 1000 partitions down to 1M rows
# Without coalesce: writing 1M rows to 1000 Parquet files
# → 1000 small files, each ~1 KB → catastrophic for S3 (the small file problem)
df_filtered = df.filter("order_date = '2026-03-20'")   # 1M rows, still 1000 partitions
df_coalesced = df_filtered.coalesce(10)                  # 10 partitions, ~100k rows each
df_coalesced.write.parquet(output_path)
# → 10 Parquet files, ~100 MB each → optimal for downstream Spark reads

# When repartition IS better than coalesce:
# After coalesce, partitions can be very unequal if data was already skewed
# If you need equal-sized partitions for a downstream join:
df.repartition(200, 'store_id')   # shuffle on store_id — equal per store, sorted for join

# Rule of thumb:
# repartition → before expensive joins/aggregations to avoid downstream shuffle
# coalesce    → before writing to storage to reduce output file count`}
        </CodeBox>
      </QA>

      <QA n={34} q="★ What is a Kafka consumer group? What happens during a rebalance?">
        <Para>
          A consumer group is a set of consumers that collectively read a
          Kafka topic, with each partition assigned to exactly one consumer
          in the group at a time. This enables horizontal scaling — add
          consumers to handle more partitions in parallel.
        </Para>
        <Para>
          A rebalance is triggered when the group membership changes: a
          consumer joins, leaves, or fails to send a heartbeat within the
          session timeout. During a rebalance, the Kafka group coordinator
          broker revokes all partition assignments and redistributes them.
          In the default (eager) rebalance protocol, all consumers stop
          processing during rebalancing — a stop-the-world pause typically
          lasting 1–30 seconds. The incremental cooperative rebalancing
          protocol (available since Kafka 2.4) minimises this by only
          moving partitions that need to change owners, allowing other
          consumers to continue processing their unaffected partitions.
        </Para>
        <CodeBox label="consumer group — operational considerations">
{`# Causes of unexpected rebalances (common production issues):
# 1. Consumer takes too long to process one poll batch → misses heartbeat → kicked out
#    session.timeout.ms = 30000 (default 30s)
#    max.poll.interval.ms = 300000 (default 5 min — max time between polls)
#    Fix: reduce records per poll, or increase max.poll.interval.ms

# 2. Consumer GC pause longer than heartbeat interval
#    heartbeat.interval.ms = 3000 (default 3s — must be < session.timeout.ms / 3)
#    Fix: tune JVM heap, use G1GC with lower pause targets

# 3. Deploying a new version → old containers stop → rebalance → new containers start → rebalance
#    Fix: use rolling deployments with static group membership (group.instance.id)
#    Static membership: consumer re-joins with same instance ID → keeps its partitions
#    Broker waits session.timeout.ms before reassigning its partitions to another consumer

# Monitoring rebalances:
# Kafka metric: kafka.consumer:type=consumer-coordinator-metrics,
#               name=rebalance-rate-per-hour
# Alert: > 4 rebalances/hour → something is destabilising the consumer group

# What happens to in-flight messages during rebalance:
# All consumers stop polling. In-flight messages (fetched but not yet committed)
# are NOT committed. After rebalance, the new owner of that partition will re-fetch
# from the last committed offset → those messages are reprocessed.
# → at-least-once delivery — idempotent consumers handle this correctly.`}
        </CodeBox>
      </QA>

      <QA n={35} q="What is Spark's Catalyst optimizer and what does it actually do?">
        <Para>
          Catalyst is Spark SQL's query optimiser — it takes a logical plan
          (the sequence of DataFrame operations you wrote) and transforms it
          into an efficient physical execution plan before any computation
          starts. It does this through four phases.
        </Para>
        <CodeBox label="Catalyst optimizer — four phases">
{`# Phase 1: Analysis — resolve column names and types
# Your code: df.filter("order_date = '2026-03-20'")
# Catalyst resolves: order_date exists in df, it is a DateType, '2026-03-20' can be cast
# Unresolved logical plan → resolved logical plan

# Phase 2: Logical optimisation — rule-based rewrites
# Rules applied (in order, repeatedly until no more changes):
# → Predicate pushdown: move filters as close to the source as possible
#   BEFORE: Scan → Join → Filter(order_date = '2026-03-20')
#   AFTER:  Filter(order_date = '2026-03-20') → Scan → Join
#   Result: the join operates on 1 day of data, not 3 years

# → Column pruning: remove columns not needed in the final output
#   If you only SELECT order_id, total_paise, Catalyst removes all other columns
#   from the scan — Parquet only reads the needed columns (columnar advantage)

# → Constant folding: evaluate constant expressions at plan time
#   BEFORE: filter("YEAR(order_date) = 2025 AND MONTH(order_date) = 12")
#   AFTER:  filter("order_date BETWEEN '2025-12-01' AND '2025-12-31'")

# → Null propagation: simplify IS NULL / IS NOT NULL chains

# Phase 3: Physical planning — choose physical operators
# For each logical operation, choose the best physical implementation:
# → Join algorithm: BroadcastHashJoin (small table) or SortMergeJoin (both large)
# → Aggregation: HashAggregate (fits in memory) or SortAggregate (spill to disk)
# → File format: which Parquet columns to read, which row groups to skip

# Phase 4: Code generation (Whole-Stage CodeGen)
# Compile the physical plan into a single JVM bytecode function
# Instead of calling individual operator methods (each has overhead),
# the entire pipeline of operations runs as one tight loop in generated Java code
# This is why Spark is 10-100x faster than RDD-based MapReduce for SQL workloads

# To see all four stages:
df.filter("order_date = '2026-03-20'").join(stores, 'store_id').explain(extended=True)
# Prints: parsed plan → analysed plan → optimised plan → physical plan`}
        </CodeBox>
      </QA>

      <QA n={36} q="★ What is Kafka's log compaction and when would you use it?">
        <Para>
          Log compaction is a retention policy where Kafka keeps the most
          recent message for every key indefinitely, rather than deleting
          messages after a time period. Old messages with the same key as
          a newer message are garbage collected by the log cleaner. The
          result: a topic that functions as a durable, replayable key-value
          store — consumers can start from the beginning and get the current
          state of every key that has ever existed.
        </Para>
        <Para>
          Use compacted topics for changelog patterns — when your topic
          represents the current state of entities rather than a history
          of events. Product catalogue updates, user preference changes,
          configuration values, and feature store changelogs are all good
          candidates. A new consumer that starts from offset 0 will see
          the latest value for every product, user, and config key —
          effectively a full table snapshot that is always up to date.
        </Para>
      </QA>

      <QA n={37} q="What is Spark's execution model — jobs, stages, and tasks?">
        <CodeBox label="Spark execution hierarchy">
{`# HIERARCHY: Application → Job → Stage → Task

# APPLICATION: one SparkSession = one application
# Runs on a cluster, has a driver and a set of executors
# All your pipeline code runs within one application

# JOB: triggered by each ACTION in your code
# df.count() → 1 job
# df.write.parquet(...) → 1 job
# df.show() → 1 job
# An application can trigger many jobs sequentially or in parallel (parallel actions)

# STAGE: a group of tasks that can run without a shuffle
# Stage boundary = a shuffle (network transfer of data between executors)
# Spark splits the physical plan at shuffle boundaries into stages
# Example: groupBy creates a shuffle → 2 stages:
#   Stage 1: read + local aggregation (map side)
#   Stage 2: receive shuffled data + final aggregation (reduce side)

# TASK: the smallest unit of work — one task per partition per stage
# If the DataFrame has 200 partitions and the stage has 200 tasks,
# each task processes one partition on one executor core
# Tasks within a stage run in parallel (one per available core)

# Why this matters:
# If one task is slow (straggler), the entire stage waits for it
# → Data skew = one partition = one task = one straggler = slow stage

# Spark UI tells you:
# Job → which stages it contains and their status
# Stage → how many tasks, their distribution of durations (skew = wide distribution)
# Task → input size, shuffle read/write, spill (spill to disk = OOM risk)

# Key metric: task input size distribution
# Healthy: all tasks process ~similar input (200 MB ± 20%)
# Skewed: most tasks 50 MB, one task 20 GB → investigate that partition's key`}
        </CodeBox>
      </QA>

      <QA n={38} q="How does Kafka guarantee message ordering?">
        <Para>
          Kafka guarantees ordering within a single partition. Messages written
          to the same partition are delivered to consumers in exactly the order
          they were produced — this is backed by the sequential, append-only
          nature of the partition log. Ordering across partitions has no
          guarantee — messages from different partitions may be delivered in
          any order depending on consumer fetch timing and network conditions.
        </Para>
        <Para>
          The partition key is the mechanism that controls ordering. Events
          with the same partition key always go to the same partition (the
          key is hashed and modded by partition count). So if all events for
          order ORD-001 use <code>order_id</code> as the partition key,
          they all go to the same partition and are always delivered in
          order. Events for different orders may interleave — but each
          order's events are internally ordered.
        </Para>
        <Para>
          Two configurations on the producer can break ordering even within
          a partition if not set correctly: <code>max.in.flight.requests.per.connection</code>
          greater than 1 combined with retries can allow a later batch to
          land before an earlier one if the earlier batch needs to retry.
          Setting <code>enable.idempotence=true</code> fixes this — Kafka
          uses sequence numbers to detect and reorder out-of-order retries,
          making ordering safe even with multiple in-flight requests.
        </Para>
      </QA>

      <QA n={39} q="What is Delta Lake and what problems does it solve that plain Parquet does not?">
        <CodeBox label="Delta Lake vs plain Parquet — the gap">
{`# Problem 1: Parquet has no ACID transactions
# If a Spark job writing 100 Parquet files crashes after writing 60:
# → The output directory has 60 partial files
# → Readers may pick up partial data
# → No rollback — must manually delete the 60 files and re-run

# Delta Lake solution: transaction log (_delta_log/)
# Every write operation is recorded as a JSON commit file
# Readers only see files that are referenced in a committed transaction
# Partial writes are invisible until the transaction commits
# Failed write → no commit → readers see the previous state exactly

# Problem 2: Parquet has no MERGE / UPDATE / DELETE
# Cannot update a single row in a Parquet file — must rewrite the entire partition
# "Update order ORD-001's status from 'placed' to 'completed'"
# Parquet: read the whole partition, modify in-memory, write new partition file
# Delta Lake: same physical operation, but wrapped in a transaction with MERGE:
spark.sql("""
    MERGE INTO orders AS target
    USING (SELECT 'ORD-001' AS order_id, 'completed' AS status) AS source
    ON target.order_id = source.order_id
    WHEN MATCHED THEN UPDATE SET status = source.status
""")

# Problem 3: Parquet has no schema enforcement on write
# Any Spark job can write a Parquet file with wrong column names or types
# into your data lake — no validation, no error
# Delta Lake enforces schema on write:
# spark.conf.set("spark.databricks.delta.schema.autoMerge.enabled", "false")
# → Writing a file with an extra column raises an AnalysisException
# → Adding a new column requires an explicit ALTER TABLE ADD COLUMN

# Problem 4: Parquet has no time travel
# Delta Lake: every commit version is retained
spark.read.format('delta').option('versionAsOf', 5).load(path)   # version 5
spark.read.format('delta').option('timestampAsOf', '2026-03-15').load(path)
# Read the table as it was on March 15 — for debugging, audit, ML feature backfill`}
        </CodeBox>
      </QA>

      <QA n={40} q="★ How does Spark handle out-of-memory errors and how do you prevent them?">
        <CodeBox label="Spark OOM — causes and fixes">
{`# Spark memory is divided into:
# Heap memory = reserved (300 MB) + user memory + unified memory
# Unified memory = execution memory (shuffles, joins, sorts) + storage memory (caching)
# Default split: 60% of heap for unified, 40% for user

# CAUSE 1: Collecting too much data to the driver
# df.collect()    → brings ALL rows to the driver (single machine)
# df.toPandas()   → same issue
# Fix: never collect large DataFrames; use write to storage instead
# If you must sample: df.limit(1000).collect() or df.sample(0.001).toPandas()

# CAUSE 2: Skewed join / aggregation — one partition is huge
# 100 executors finish in 2 minutes, 1 executor runs for 45 minutes
# Eventually that executor OOMs because its partition is too large for its heap
# Fix: salting (covered in Q32), or broadcast join for the small side

# CAUSE 3: Caching too much data
# df.cache() materialises the entire DataFrame in unified storage memory
# If it doesn't fit: spills to disk (slow) or evicts other cached data (broken)
# Fix: cache only DataFrames used in 2+ actions; unpersist when done
# df.cache()
# result1 = df.count()
# result2 = df.groupBy('city').agg(sum('revenue'))
# df.unpersist()   # release memory immediately — don't wait for GC

# CAUSE 4: Wide transformation with insufficient shuffle partitions
# Default: spark.sql.shuffle.partitions = 200
# If your data is 100 GB and each partition is 100 GB / 200 = 500 MB → fine
# If your data is 10 TB and each partition is 10 TB / 200 = 50 GB → OOM
# Fix: increase shuffle partitions
spark.conf.set("spark.sql.shuffle.partitions", "2000")
# Or use Adaptive Query Execution (AQE) — Spark 3.0+:
spark.conf.set("spark.sql.adaptive.enabled", "true")
# AQE automatically coalesces shuffle partitions after measuring actual data sizes

# CAUSE 5: UDFs holding references to large objects
# A Python UDF that captures a large dict in its closure → that dict is on every executor
# Fix: broadcast the large object and access it inside the UDF via the broadcast handle`}
        </CodeBox>
      </QA>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SECTION 5 — DATA MODELLING & WAREHOUSING */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <SectionTag text="// Section 05 — Data Modelling and Warehousing" />
      <SectionTitle>Data Modelling and Warehousing — 8 Questions</SectionTitle>

      <QA n={41} q="★ What is a star schema? How does it differ from a snowflake schema?">
        <Para>
          A star schema has one central fact table surrounded by multiple
          dimension tables. The fact table holds measurements (revenue,
          quantity, count) and foreign keys to dimension tables. Dimension
          tables are denormalised — all attributes of a dimension are in
          a single flat table. The schema looks like a star: fact in the
          centre, dimensions radiating outward.
        </Para>
        <Para>
          A snowflake schema extends the star by normalising dimension tables —
          breaking them into sub-dimensions. Instead of a flat
          <code>stores</code> dimension with <code>city</code>,
          <code>state</code>, and <code>region</code> columns, a snowflake
          schema has a <code>stores</code> table, a <code>cities</code>
          table, a <code>states</code> table, and a <code>regions</code>
          table linked by foreign keys.
        </Para>
        <Para>
          In analytics workloads, star schemas are almost always preferred.
          The extra joins required in a snowflake schema add query complexity
          and latency. Storage savings from normalisation are trivial compared
          to fact table size. The only case for snowflake schemas in a warehouse
          is when dimension tables are very large and many queries access
          only a sub-dimension — but even then, modern columnar engines make
          this rare.
        </Para>
      </QA>

      <QA n={42} q="What is a surrogate key and why do data warehouses use them instead of natural keys?">
        <CodeBox label="surrogate key — purpose and implementation">
{`-- Natural key: the business identifier from the source system
-- customer_id = 'C98765' (assigned by the CRM)
-- product_id  = 'SKU-BIRYANI-1KG' (assigned by inventory system)

-- Problems with natural keys in a warehouse:
-- 1. Source systems can reuse IDs (customer deleted and recreated with same ID = collision)
-- 2. Cross-source joins are impossible (CRM uses 'C98765', loyalty uses 987654 for same person)
-- 3. Natural keys can change (company acquires a competitor — all their IDs conflict)
-- 4. String natural keys are slower to join than integer surrogate keys

-- Surrogate key: a meaningless integer generated by the warehouse
-- Generated once per entity record, never changes, never reused

-- Implementation:
CREATE TABLE customers_dim (
    customer_sk   BIGSERIAL PRIMARY KEY,  -- surrogate key: auto-increment integer
    customer_id   VARCHAR(20) NOT NULL,   -- natural key: business identifier (indexed)
    customer_name VARCHAR(100),
    city          VARCHAR(50),
    valid_from    DATE NOT NULL,
    valid_to      DATE NOT NULL DEFAULT '9999-12-31',
    is_current    BOOLEAN NOT NULL DEFAULT TRUE
);
-- customer_sk is what the fact table references (fast integer join)
-- customer_id is what business users search by

-- SCD Type 2 with surrogate keys:
-- Customer C98765 moves from Hyderabad to Bengaluru:
-- Old row: customer_sk=1001, customer_id='C98765', city='Hyderabad', is_current=FALSE
-- New row: customer_sk=1847, customer_id='C98765', city='Bengaluru', is_current=TRUE
-- Fact table rows from 2025 reference customer_sk=1001 (Hyderabad at the time)
-- Fact table rows from 2026 reference customer_sk=1847 (Bengaluru now)
-- Historical analysis is automatically correct — no additional logic needed`}
        </CodeBox>
      </QA>

      <QA n={43} q="★ What is the medallion architecture? What goes in Bronze, Silver, and Gold?">
        <Para>
          The medallion architecture is a layered data lake pattern that
          progressively refines data quality from raw ingestion to
          business-ready output. The three layers are named after metals
          in ascending order of value.
        </Para>
        <CodeBox label="medallion — what each layer contains and its rules">
{`# BRONZE — Raw, immutable, append-only
# Rule: land data exactly as it arrived from the source. Never transform. Never delete.
# Purpose: the source of truth for replay. If any downstream layer is corrupted,
#           you can always re-derive from Bronze.
# Format: Parquet or Delta (to enable schema evolution tracking)
# Schema: source schema, plus pipeline metadata columns:
#   _ingested_at TIMESTAMP  -- when your pipeline wrote this row
#   _source_file STRING     -- which file or Kafka offset it came from
#   _schema_version STRING  -- which version of the source schema produced this
# Example: Bronze orders = exactly what the Kafka consumer received, row by row

# SILVER — Cleaned, validated, joined, standardised
# Rules: deduplicated (no duplicates), typed correctly (dates are DateType not strings),
#        nulls handled (documented policy for each nullable field),
#        schema standardised (snake_case column names, consistent naming),
#        PII masked for non-production access
# NOT business logic yet — Silver is "technically correct", not "business correct"
# Example: Silver orders = deduplicated, typed, joined with stores for store_city,
#          invalid rows quarantined to a quarantine table with error reason

# GOLD — Business-level aggregations, use-case specific
# Rules: uses business terminology, contains only what the consumer needs,
#        pre-aggregated for performance, updated on a defined schedule with SLA
# Consumers: BI dashboards, ML training, product analytics, finance reporting
# Multiple Gold tables for different consumers — not one universal Gold table
# Example Gold tables:
#   mart_daily_store_revenue    -- finance team
#   mart_customer_cohort_metrics -- product team
#   feature_customer_velocity   -- ML team (feature store)

# The critical rule: data only flows FORWARD (Bronze → Silver → Gold)
# Gold never writes back to Silver. Silver never reads from Gold.
# Each layer has exactly one owner team responsible for its quality.`}
        </CodeBox>
      </QA>

      <QA n={44} q="What is a slowly changing dimension? Explain Types 1, 2, and 3.">
        <Para>
          A slowly changing dimension (SCD) is a dimension whose attributes
          change over time — slower than fact data but not static. How you
          handle these changes determines whether your historical analysis
          reflects what actually happened or what the world looks like today.
        </Para>
        <CodeBox label="SCD types 1, 2, 3 — comparison">
{`-- Scenario: customer Priya moves from Hyderabad to Bengaluru
-- We have historical orders from when she was in Hyderabad

-- SCD TYPE 1: Overwrite — no history preserved
-- UPDATE customers SET city = 'Bengaluru' WHERE customer_id = 'C98765'
-- After: customer city = 'Bengaluru' — Hyderabad is gone from the record
-- Historical orders: "what city were these orders from?" → Bengaluru (WRONG)
-- Use when: the old value was simply wrong (data correction), not a real change
-- Example: fixing a misspelled city name

-- SCD TYPE 2: Add new row — full history preserved (covered in Q26)
-- Old row stays: C98765, Hyderabad, valid_to=2026-03-19, is_current=FALSE
-- New row added: C98765, Bengaluru, valid_from=2026-03-20, is_current=TRUE
-- Historical orders reference old surrogate key → Hyderabad ✓
-- Use when: the history of changes matters for analysis (most common for dimensions)

-- SCD TYPE 3: Add new column — one version back
-- ALTER TABLE customers ADD COLUMN previous_city VARCHAR(50)
-- UPDATE customers
--   SET previous_city = city, city = 'Bengaluru'
--   WHERE customer_id = 'C98765'
-- After: customer has city='Bengaluru' and previous_city='Hyderabad'
-- Advantage: no row explosion for small dimensions with infrequent changes
-- Disadvantage: only tracks ONE previous value — cannot handle two changes
-- Use when: only one level of history is needed (e.g., "current vs previous tier")

-- In practice: SCD Type 2 is by far the most common in production warehouses.
-- SCD Type 1 is used for corrections.
-- SCD Type 3 is rare and usually replaced by Type 2 when the team grows.`}
        </CodeBox>
      </QA>

      <QA n={45} q="★ What is a fact table? Explain the difference between additive, semi-additive, and non-additive facts.">
        <Para>
          A fact table holds the measurable, quantitative data from business
          events — it is the centre of a star schema. Each row represents one
          event or measurement. Facts come in three types based on how they
          can be aggregated across dimensions.
        </Para>
        <CodeBox label="additive vs semi-additive vs non-additive">
{`-- Fact table: order_fact(date_sk, store_sk, customer_sk, order_count, revenue_paise, stock_level)

-- ADDITIVE FACTS: can be summed across ALL dimensions
-- revenue_paise: sum across stores, dates, customers — always meaningful
SELECT SUM(revenue_paise) FROM order_fact WHERE date_sk = 20260320   -- by day ✓
SELECT SUM(revenue_paise) FROM order_fact WHERE store_sk = 7          -- by store ✓
SELECT SUM(revenue_paise) FROM order_fact                             -- total ever ✓
-- order_count is also additive

-- SEMI-ADDITIVE FACTS: can be summed across SOME dimensions, not all
-- stock_level: makes sense to sum across stores (total stock in all stores)
--              does NOT make sense to sum across time (stock level on Monday +
--              stock level on Tuesday ≠ meaningful total)
SELECT SUM(stock_level) FROM order_fact WHERE date_sk = 20260320    -- by store on a day ✓
SELECT SUM(stock_level) FROM order_fact WHERE store_sk = 7          -- across time — WRONG ✗
-- Correct aggregation across time: use AVG or pick a specific snapshot date

-- NON-ADDITIVE FACTS: cannot be summed across ANY dimension
-- unit_price_paise: summing prices is meaningless
-- profit_margin_pct: summing percentages is meaningless
-- These should be COMPUTED on the fly from additive components:
SELECT SUM(revenue_paise) / NULLIF(SUM(order_count), 0) AS avg_order_value
FROM order_fact   -- average order value: derived from two additive facts ✓

-- Best practice: store only additive atomic facts in the fact table.
-- Compute ratios, percentages, and averages at query time from additive facts.
-- This ensures aggregations across any combination of dimensions are always correct.`}
        </CodeBox>
      </QA>

      <QA n={46} q="What is Snowflake's architecture and why is it different from traditional data warehouses?">
        <Para>
          Snowflake uses a multi-cluster shared data architecture. Storage and
          compute are completely separated — data lives in S3 (in Snowflake's
          managed cloud storage), and compute is provided by Virtual Warehouses
          (independently scalable clusters of compute nodes). Multiple virtual
          warehouses can query the same data simultaneously without contending
          for storage I/O. A virtual warehouse can be suspended (no running cost)
          when not in use and resumed in seconds.
        </Para>
        <Para>
          Traditional data warehouses (Teradata, Netezza) coupled storage and
          compute on the same machines — scaling compute meant buying more
          machines with more storage attached. Snowflake's separation means
          you can scale compute independently, run multiple workloads on the
          same data without isolation issues, and pay only for the compute you
          actually use. The three-layer architecture is: cloud services layer
          (metadata, query parsing, optimisation, access control) → compute layer
          (virtual warehouses) → storage layer (S3/Azure Blob/GCS with
          micro-partitions).
        </Para>
      </QA>

      <QA n={47} q="What is columnar storage and why is it faster for analytics?">
        <CodeBox label="row vs columnar storage — the analytics advantage">
{`# ROW-ORIENTED STORAGE (PostgreSQL, MySQL — OLTP optimised):
# Each row is stored contiguously on disk
# Row 1: [order_id=O1, customer_id=C1, total_paise=34900, status=completed, city=Hyderabad, ...]
# Row 2: [order_id=O2, customer_id=C2, total_paise=12500, status=cancelled, city=Bengaluru, ...]
# 
# Fast for: fetching ONE complete row (point lookup: "give me order O1 with all its columns")
# Slow for: reading ONE column across MANY rows (scan 1B rows × 10 columns to read 1 column)

# COLUMNAR STORAGE (Parquet, Snowflake, BigQuery, Redshift — OLAP optimised):
# Each column is stored contiguously on disk
# total_paise column: [34900, 12500, 67000, 0, 82300, ...]   (1B integers, back-to-back)
# status column:      ['completed', 'cancelled', 'completed', ...] (1B strings)
# 
# Fast for: analytical queries that read FEW columns across MANY rows
# "SELECT SUM(total_paise), COUNT(*) FROM orders WHERE status = 'completed'"
# → Reads ONLY total_paise and status columns — skips all others
# → For 10-column table: reads 20% of the data vs 100% for row storage

# THREE advantages of columnar storage for analytics:

# 1. Column pruning: read only needed columns
SELECT SUM(total_paise) FROM orders   -- reads 1 column out of 15
# Row storage: reads all 15 columns, extracts total_paise from each row (93% wasted I/O)
# Columnar: reads only total_paise column (0% wasted I/O)

# 2. Better compression: same-type values compress much better together
# total_paise column: all integers → dictionary encoding, delta encoding, bit packing
# status column: low cardinality string → dictionary encoding: 'completed'=1, 'cancelled'=2
# Parquet compression ratio: 5-10x vs row-oriented storage for typical analytics data

# 3. Vectorised execution: process a batch of column values as a single CPU instruction
# Modern CPUs have SIMD instructions that apply one operation to 8-32 values simultaneously
# SUM(total_paise): load 32 integers into AVX-512 register, add them in 1 CPU instruction
# Row-based: load 1 row, extract 1 integer, add it — repeat 1B times`}
        </CodeBox>
      </QA>

      <QA n={48} q="★ What is dbt and what problem does it solve?">
        <Para>
          dbt (data build tool) is a transformation framework that lets data
          engineers and analysts write transformations as SQL SELECT statements,
          and handles everything else — materialisation (running the SQL and
          saving the result), dependency resolution (running models in the
          right order based on <code>ref()</code> references), testing (running
          assertions on output data), documentation (generating a data catalogue
          from model comments), and lineage (visualising how models depend on
          each other).
        </Para>
        <Para>
          Before dbt, SQL transformations were either stored procedures in the
          database (no version control, no testing, no lineage), ad-hoc
          Spark jobs (over-engineered for SQL transformations), or large
          single SQL files that nobody could navigate. dbt brings software
          engineering practices — version control, modular code, automated
          testing, CI/CD — to the transformation layer.
        </Para>
        <CodeBox label="dbt — what a model looks like">
{`-- models/staging/stg_orders.sql
-- This model is a SELECT statement. dbt runs it and creates a table or view.

{{ config(
    materialized='incremental',       -- only process new rows on each run
    unique_key='order_id',            -- use this to detect and update changed rows
    on_schema_change='sync_all_columns'
) }}

SELECT
    order_id,
    TRIM(UPPER(customer_id))          AS customer_id,
    total_paise::INT                  AS total_paise,
    total_paise / 100.0               AS total_inr,
    LOWER(TRIM(status))               AS status,
    order_date::DATE                  AS order_date,
    CURRENT_TIMESTAMP                 AS dbt_updated_at
FROM {{ source('raw', 'orders') }}    -- reference to a source table (tracks lineage)

{% if is_incremental() %}
-- On incremental runs: only process rows newer than the max we've already processed
WHERE order_date > (SELECT MAX(order_date) FROM {{ this }})
{% endif %}

-- Companion test file: models/staging/stg_orders.yml
-- models:
--   - name: stg_orders
--     columns:
--       - name: order_id
--         tests: [not_null, unique]
--       - name: status
--         tests: [accepted_values: {values: ['placed','confirmed','shipped','delivered','cancelled']}]
--       - name: total_paise
--         tests: [not_null, dbt_utils.expression_is_true: {expression: ">= 0"}]

-- Run: dbt run --select stg_orders          (runs just this model)
-- Test: dbt test --select stg_orders        (runs all tests for this model)
-- Run all: dbt build                        (run + test all models in dependency order)`}
        </CodeBox>
      </QA>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SECTION 6 — SYSTEM DESIGN & ARCHITECTURE */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <SectionTag text="// Section 06 — System Design and Architecture" />
      <SectionTitle>System Design and Architecture — 7 Questions</SectionTitle>

      <QA n={49} q="★ How would you design a pipeline to process 100 million events per day with sub-second latency?">
        <Para>
          This question tests whether you know when streaming is justified and
          how to size and architect a real-time system. Sub-second latency
          eliminates batch approaches — the pipeline must be streaming.
        </Para>
        <CodeBox label="100M events/day streaming pipeline — design">
{`# Sizing:
# 100M events/day ÷ 86,400 seconds = 1,157 events/second average
# Assume 5x peak factor (bursty workload): 5,785 events/second at peak
# Average event size: 300 bytes compressed
# Peak Kafka throughput: 5,785 × 300 bytes = 1.7 MB/second — trivial for Kafka

# Architecture:
# Producer (application) → Kafka (12 partitions, RF=3) → Flink/Spark Streaming consumer
# → Enrichment (Redis lookups) → Output: Redis + Delta Lake

# Kafka sizing:
# 12 partitions: 5785 / 12 = 482 events/second per partition (well within limits)
# 3 brokers (MSK or Confluent Cloud), RF=3, acks=all, min.isr=2
# Retention: 7 days (allows consumer replay on failure)

# Consumer sizing for sub-second latency:
# Per-event processing target: < 10ms (leave 990ms headroom for Kafka overhead)
# Redis lookup: 0.5ms | ML inference: 3ms | Kafka write overhead: 2ms → ~6ms total
# Single thread: 1000ms / 6ms = 166 events/second
# Need: 5785 / 166 = 35 threads
# Deploy: 12 consumer instances × 3 threads each = 36 threads (aligned with 12 partitions)

# The sub-second SLA measurement:
# Metric: event_time (in payload) → decision_written_at (timestamp when output is committed)
# Alert: p99 latency > 800ms (leaves 200ms buffer before SLA breach)

# What makes this fail:
# Redis timeout (>50ms) → use connection pooling, circuit breaker
# Partition skew → monitor consumer lag per partition
# Consumer GC pause > 200ms → use G1GC with MaxGCPauseMillis=100`}
        </CodeBox>
      </QA>

      <QA n={50} q="★ Design a data pipeline that handles upstream API rate limits.">
        <CodeBox label="rate-limited API ingestion — design">
{`# Problem: source API allows 100 requests/minute. You need to fetch data for 10,000 entities.
# Naive approach: 10,000 requests / 100 per minute = 100 minutes. API ban risk if bursty.

import asyncio
import aiohttp
import time
from asyncio import Semaphore

class RateLimitedFetcher:
    def __init__(self, requests_per_minute: int = 100):
        self.rate = requests_per_minute
        self.semaphore = Semaphore(requests_per_minute)
        self.tokens_per_second = requests_per_minute / 60.0

    async def fetch(self, session: aiohttp.ClientSession, url: str, entity_id: str) -> dict:
        """Fetch one entity with rate limiting, retry, and error handling."""
        async with self.semaphore:   # at most N concurrent requests
            for attempt in range(3):
                try:
                    async with session.get(url, timeout=aiohttp.ClientTimeout(total=10)) as resp:
                        if resp.status == 429:   # Too Many Requests
                            retry_after = int(resp.headers.get('Retry-After', 60))
                            await asyncio.sleep(retry_after)
                            continue
                        resp.raise_for_status()
                        data = await resp.json()
                        return {'entity_id': entity_id, 'data': data, 'fetched_at': time.time()}
                except (aiohttp.ClientError, asyncio.TimeoutError) as e:
                    if attempt == 2:
                        return {'entity_id': entity_id, 'error': str(e)}
                    await asyncio.sleep(2 ** attempt)   # exponential backoff

async def fetch_all_entities(entity_ids: list[str]) -> list[dict]:
    fetcher = RateLimitedFetcher(requests_per_minute=90)  # stay under limit: 90 not 100
    async with aiohttp.ClientSession() as session:
        tasks = [
            fetcher.fetch(session, f"https://api.example.com/entities/{eid}", eid)
            for eid in entity_ids
        ]
        return await asyncio.gather(*tasks)

# Additional patterns for large-scale API ingestion:
# 1. Checkpointing: save progress every 1000 entities — resume after failure
# 2. Priority queue: high-value entities (large customers) fetched first
# 3. Caching: store results in Redis with TTL — skip re-fetching recently fetched entities
# 4. Webhook: if the API supports it, switch from polling to push — eliminates rate limit issue
# 5. Bulk endpoints: some APIs support batch requests (/entities?ids=A,B,C) — 1 request, N results`}
        </CodeBox>
      </QA>

      <QA n={51} q="How would you migrate a legacy ETL pipeline to a modern ELT architecture with minimal downtime?">
        <Para>
          Pipeline migrations are high-risk because they affect downstream
          consumers who depend on the current output. The right strategy
          is the expand-and-contract pattern: run old and new pipelines
          in parallel, validate outputs match, then cut over.
        </Para>
        <CodeBox label="ETL to ELT migration — parallel run strategy">
{`# Migration phases:

# Phase 1: Build the new pipeline alongside the old (2-4 weeks)
# - Set up ELT infrastructure (Fivetran for ingestion, dbt for transformation)
# - Write new pipeline writing to a SEPARATE output table: new_gold.daily_store_stats
# - Old pipeline continues writing to gold.daily_store_stats
# - No consumers are affected — old pipeline is still the source of truth

# Phase 2: Validation (1-2 weeks)
# Run comparison queries daily to detect discrepancies

validation_query = """
    SELECT
        o.order_date,
        o.store_id,
        o.revenue_paise          AS old_revenue,
        n.revenue_paise          AS new_revenue,
        ABS(o.revenue_paise - n.revenue_paise) AS abs_diff,
        ROUND(
            100.0 * ABS(o.revenue_paise - n.revenue_paise) / NULLIF(o.revenue_paise, 0),
            4
        )                        AS pct_diff
    FROM gold.daily_store_stats o
    FULL OUTER JOIN new_gold.daily_store_stats n
        ON o.order_date = n.order_date AND o.store_id = n.store_id
    WHERE ABS(o.revenue_paise - n.revenue_paise) > 100   -- flag > ₹1 difference
    ORDER BY abs_diff DESC
    LIMIT 100
"""
# Run this daily. Investigate every discrepancy. Fix the new pipeline until diffs = 0.

# Phase 3: Shadow mode (1 week)
# Point one non-critical consumer (internal analytics tool) to the new table
# Monitor: do they report any data quality issues?
# Keep old pipeline running — instant rollback if problems found

# Phase 4: Cutover
# During a maintenance window (e.g., Sunday 2 AM):
# 1. Stop the old pipeline
# 2. Rename new_gold.daily_store_stats → gold.daily_store_stats (atomic in most warehouses)
# 3. Update all consumers' connection configs
# 4. Monitor for 30 minutes
# 5. If problems: rename back — old data is intact (you never deleted it)

# Phase 5: Decommission (2 weeks later, after stability confirmed)
# Stop the old pipeline infrastructure
# Delete old tables`}
        </CodeBox>
      </QA>

      <QA n={52} q="★ What is the Lambda architecture? What are its advantages and problems?">
        <Para>
          Lambda architecture (coined by Nathan Marz) addresses the tension
          between latency and accuracy by running two parallel systems: a
          batch layer that produces complete, accurate results with high
          latency, and a speed layer that produces approximate, real-time
          results with low latency. A serving layer merges their outputs —
          queries served from the speed layer for recent data and from
          the batch layer for historical data.
        </Para>
        <Para>
          The fundamental problem is code duplication: the same business
          logic must be implemented twice — once in the batch system (Spark)
          and once in the streaming system (Flink or Kafka Streams). When the
          logic changes, both must be updated simultaneously. Bugs appear in
          one but not the other. Data reconciliation between the two outputs
          becomes a recurring operational task.
        </Para>
        <Para>
          The Kappa architecture (Jay Kreps, 2014) proposed the solution:
          a single streaming system handles both real-time and historical
          processing. For historical reprocessing, replay events from the
          beginning of the log with a new version of the consumer. No batch
          layer. One codebase. The tradeoff is that streaming systems are
          more complex to operate than batch and may be slower for very
          large historical reprocessing jobs.
        </Para>
      </QA>

      <QA n={53} q="How do you design for cost efficiency in a cloud data platform?">
        <CodeBox label="cost optimisation — the high-impact levers">
{`# The Pareto principle applies: 20% of decisions drive 80% of cloud costs.
# Focus on these in order:

# 1. COMPUTE SUSPENSION (highest impact, zero effort)
# Snowflake, Databricks, EMR Serverless all support auto-suspend
# A warehouse running idle 16 hours/day at $10/hour = $160/day wasted
# Auto-suspend after 5 minutes of inactivity: saves 95% of idle cost

# Snowflake:
ALTER WAREHOUSE analytics_wh SET AUTO_SUSPEND = 300;   -- suspend after 5 minutes
ALTER WAREHOUSE analytics_wh SET AUTO_RESUME = TRUE;    -- resume on next query

# 2. RIGHT-SIZING (match compute to workload, not to fear)
# Most teams provision for peak and leave it running at peak size 24/7
# Snowflake: XL warehouse for 10-minute daily job → switch to S for ad-hoc queries
# Spark: start with small cluster, use autoscaling rather than fixed large cluster
spark.conf.set("spark.dynamicAllocation.enabled", "true")
spark.conf.set("spark.dynamicAllocation.minExecutors", "2")
spark.conf.set("spark.dynamicAllocation.maxExecutors", "50")

# 3. STORAGE TIERING (automate, don't manually manage)
# S3 Intelligent-Tiering: automatically moves objects to cheaper tiers based on access
# Cost: Standard $0.023/GB → IA $0.0125/GB → Glacier $0.004/GB
# For a 10 TB data lake: $230/month (Standard) vs $40/month (properly tiered) = 83% saving

# S3 Lifecycle rule (Terraform):
resource "aws_s3_bucket_lifecycle_configuration" "orders_lifecycle" {
  rule {
    id = "archive-old-raw-data"
    transition { days = 90;  storage_class = "STANDARD_IA" }
    transition { days = 365; storage_class = "GLACIER"      }
    expiration { days = 2555 }   # 7 years (compliance requirement)
  }
}

# 4. QUERY EFFICIENCY (Snowflake credits / BigQuery slot hours)
# Most expensive queries: full table scans on large tables without clustering
# Fix: cluster key on the most common filter column
ALTER TABLE orders CLUSTER BY (order_date);
# → Automatic micro-partition pruning: a query for one day scans 1/365th of data

# 5. SMALL FILE PROBLEM (Spark job cost multiplier)
# 10,000 small Parquet files = 10,000 S3 PUT requests on write
#                            = 10,000 S3 GET requests on every subsequent Spark read
#                            = 10x slower reads + 10x more S3 API cost
# Fix: coalesce before writing (covered in Q33)
# Fix: Delta Lake OPTIMIZE command (compacts small files in place)
spark.sql("OPTIMIZE orders WHERE order_date >= '2026-01-01'")`}
        </CodeBox>
      </QA>

      <QA n={54} q="What is the difference between push-based and pull-based data ingestion?">
        <Para>
          In pull-based ingestion, the pipeline queries the source on a
          schedule — "give me everything new since the last time I checked."
          Polling is simple to implement but has inherent latency (data is
          as fresh as the polling interval), can miss deleted records, and
          adds query load to the source system at polling time.
        </Para>
        <Para>
          In push-based ingestion, the source system sends data to the
          pipeline when changes occur — via webhooks, CDC (reading the
          WAL), or Kafka producers. Push-based is lower latency (milliseconds
          vs minutes), captures deletes, and distributes the load more evenly.
          The trade-off is that the source must support push mechanisms and
          the ingestion system must be always available to receive data.
        </Para>
        <Para>
          In practice: use pull-based (incremental queries) for sources with
          no push capability and where minutes of latency is acceptable. Use
          CDC (WAL-based push) for operational databases where latency matters
          or deletes must be captured. Use webhooks for external SaaS APIs
          that support them. The cost of polling at high frequency eventually
          exceeds the cost of setting up CDC.
        </Para>
      </QA>

      <QA n={55} q="★ How do you approach capacity planning for a new data pipeline?">
        <Para>
          Capacity planning is the process of estimating the compute, storage,
          network, and cost requirements for a pipeline before it runs in
          production. The goal is to provision enough resources to handle peak
          load without significant over-provisioning that wastes money.
        </Para>
        <Para>
          The five-step approach: first, gather source data characteristics —
          row count, row size, growth rate, peak-to-average ratio, and
          retention requirement. Second, calculate storage requirements
          (daily volume × compression ratio × retention period × replication
          factor). Third, calculate compute requirements (peak events per
          second × processing time per event = threads required; total rows
          × scan speed = job duration). Fourth, estimate cost using cloud
          provider pricing (compute hours × hourly rate + storage GB ×
          monthly rate + data transfer). Fifth, add a 2x headroom buffer
          for growth and unexpected spikes — never provision for exact
          current requirements because data always grows.
        </Para>
      </QA>

      <Divider />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SECTION 7 — BEHAVIOURAL */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <SectionTag text="// Section 07 — Behavioural" />
      <SectionTitle>Behavioural — 5 Questions</SectionTitle>

      <QA n={56} q="★ Tell me about a time a pipeline you built failed in production. What happened and what did you do?">
        <Para>
          This question is about incident response, not about failure avoidance.
          Every production pipeline fails eventually. The interviewer is
          evaluating whether you take ownership, whether you have a systematic
          debugging process, and whether you learn from failures and implement
          preventive measures.
        </Para>
        <HighlightBox>
          <Para><strong>Framework: Situation → Impact → Response → Root Cause → Prevention</strong></Para>
          <Para>
            <strong>Example answer structure:</strong> "In my previous role at [company],
            our daily revenue reporting pipeline failed silently on a Friday night.
            [Situation] The dashboard was showing Thursday's numbers to the leadership
            team on Saturday morning during a board meeting. [Impact] I was alerted by
            a Slack message, immediately checked the Airflow logs, and found the pipeline
            had timed out when trying to read from a read replica that had fallen significantly
            behind the primary — the read replica lag was 8 hours, which caused our
            "order_date = yesterday" query to return incomplete data rather than failing.
            [Response] I manually triggered a run against the primary database (with read
            query safeguards to avoid impacting production write latency), which produced
            correct numbers within 15 minutes. [Root Cause] The root cause was that our
            pipeline had no validation on replication lag — it proceeded even with stale
            data. [Prevention] I added a replication lag check at the start of every
            pipeline run: if lag {'>'} 5 minutes, the pipeline fails immediately rather than
            producing incorrect output silently. I also added a data freshness alert in
            the dashboard that triggers if the displayed date doesn't match current date."
          </Para>
        </HighlightBox>
      </QA>

      <QA n={57} q="★ How do you handle a situation where the data you receive from an upstream team is consistently late or poor quality?">
        <Para>
          This tests communication, data contracts, and escalation judgment.
          The answer should cover: first, quantify the problem (how late, how
          often, what the downstream business impact is); second, approach the
          upstream team with data — not complaints — showing specific incidents,
          their frequency, and business impact; third, propose a data contract
          with agreed SLAs; fourth, implement defensive measures (quality checks
          at the boundary, DLQ for bad records, alerting on late arrival);
          fifth, escalate with data if the problem persists after repeated attempts
          to resolve it at the working level.
        </Para>
        <Para>
          The wrong answer is to silently absorb bad data and let incorrect
          reports reach business stakeholders. The also-wrong answer is to
          immediately escalate to management without first working with the
          upstream team directly. Data quality issues are often caused by
          lack of visibility — upstream teams frequently don't know their
          data is causing problems downstream.
        </Para>
      </QA>

      <QA n={58} q="How do you prioritise when you have three urgent pipeline requests and can only work on one?">
        <Para>
          Prioritisation requires criteria. The four dimensions I use:
          business impact (which request, if delayed, causes the most harm
          to a customer, a revenue goal, or a regulatory deadline?),
          time sensitivity (which has the hardest deadline?), effort-to-value
          ratio (which delivers the most value for the least effort?),
          and dependency blocking (which unblocks other teams if completed first?).
        </Para>
        <Para>
          Practically: communicate with all three requesters before choosing.
          "I can work on one of these this week. These are the three options
          and this is how I'm thinking about prioritisation — does this match
          your understanding of business impact?" Stakeholders often have
          context about urgency that you don't. Explicit communication about
          trade-offs prevents the common mistake of optimising for the
          loudest stakeholder rather than the most important work.
        </Para>
      </QA>

      <QA n={59} q="A senior engineer reviews your pipeline and suggests a completely different approach. How do you respond?">
        <Para>
          The right response starts with curiosity, not defensiveness. Ask
          the senior engineer to walk through the reasoning — what problem
          does their approach solve that yours doesn't, or what problem does
          yours create that you didn't see? In most cases, the senior engineer
          has encountered a failure mode in production that you haven't seen yet.
        </Para>
        <Para>
          Evaluate the suggestion on its merits: does it actually solve the
          stated problem, what are its own trade-offs, and what is the cost
          of switching? If after understanding it you believe your original
          approach is better for specific reasons (simpler to maintain,
          fits the team's existing skills, lower operational overhead),
          articulate those reasons clearly — not as resistance but as
          a counter-argument the senior engineer should be able to evaluate.
        </Para>
        <Para>
          The worst response is silent compliance (accepting without understanding,
          implementing something you don't understand). The second-worst is
          defensiveness ("I already thought of that, mine is better"). The
          right response is informed engagement — understand deeply, then decide.
        </Para>
      </QA>

      <QA n={60} q="★ Where do you see data engineering going in the next 3 years, and how are you preparing?">
        <Para>
          Three trends that are already underway and will accelerate. First,
          the table format wars are settling — Apache Iceberg is winning broad
          multi-engine support (Spark, Trino, Flink, BigQuery, Snowflake,
          Redshift all support it now or soon). The future of data lakes is
          open table formats, not proprietary storage, which means data
          engineers need deep Iceberg knowledge. Second, AI-assisted pipelines
          — not replacing data engineers, but changing the work. LLMs are
          already generating SQL, writing dbt model stubs, and suggesting
          schema designs. Data engineers who can direct AI tools effectively
          and validate their output will be more productive than those who
          resist them. Third, real-time is becoming the default — the cost of
          streaming infrastructure has dropped dramatically (managed Kafka,
          Flink Serverless, Delta streaming). Use cases that were batch-only
          5 years ago are now routinely streaming. Data engineers who only
          know batch pipelines will find themselves constrained.
        </Para>
        <Para>
          How to prepare: build something with Iceberg (not just Delta) to
          understand the differences. Learn to use LLM tools for pipeline
          generation and understand their failure modes. Build at least one
          end-to-end streaming pipeline — not just the concepts, but an actual
          deployed system. These three investments will keep a data engineer
          relevant through the next wave of platform changes.
        </Para>
      </QA>

      <KeyTakeaways items={[
        'Python generators are the correct tool for processing large files in memory-constrained pipelines — yield one record at a time rather than loading everything into memory. Chain generators for a fully lazy, memory-efficient pipeline.',
        'Window functions (RANK, DENSE_RANK, ROW_NUMBER, LAG, LEAD, AVG OVER) are the most commonly tested SQL feature in DE interviews. Know the difference between RANK (gaps) and DENSE_RANK (no gaps), and when ROWS BETWEEN vs RANGE BETWEEN matters.',
        'Idempotency is non-negotiable. Every pipeline write must produce the same result if run multiple times. The mechanism — UPSERT on natural key, partition overwrite, event_id deduplication — must be named explicitly in every design discussion.',
        'Data skew is the most common cause of unexpectedly slow Spark jobs. Diagnose via the Spark UI task duration histogram. Fix with broadcast joins (small table), salting (large-to-large join with hot key), or repartitioning on a better key.',
        'ETL vs ELT is a tool-capability question, not a philosophical preference. Use ELT when the destination (Snowflake, BigQuery) has sufficient compute for transformations. Use ETL when raw data contains PII that must never land in the destination.',
        'SCD Type 2 is the standard for dimension history in data warehouses. One row per version of an entity, with valid_from, valid_to, and is_current columns. Surrogate keys (not natural keys) are what fact tables reference.',
        'The medallion architecture (Bronze → Silver → Gold) is the standard lakehouse pattern. Bronze is raw and immutable. Silver is clean and typed. Gold is business-level and consumer-specific. Data only flows forward — never backward.',
        'CAP theorem in practice: CP systems (HBase, Kafka with acks=all) reject requests during partitions to stay consistent. AP systems (Cassandra, DynamoDB with eventual consistency) respond with potentially stale data. Financial data = CP. Analytics dashboards = AP is acceptable.',
        'In behavioural questions, the evaluator wants to see: systematic thinking under pressure, ownership of failures (not blame), data-driven decision-making, and proactive communication with stakeholders. Generic "team player" answers fail.',
        'The three trends to know going into 2026 interviews: Apache Iceberg as the open table format standard, AI-assisted pipeline development (know the tools and their limits), and streaming as the default for low-latency use cases that were previously batch-only.',
      ]} />

    </LearnLayout>
  )
}