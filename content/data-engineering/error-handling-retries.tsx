import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Error Handling, Retries, and Dead Letter Queues — Data Engineering | Chaduvuko',
  description:
    'Classifying transient vs permanent errors, exponential backoff with jitter, circuit breakers, dead letter queue design, alerting strategy, and building pipelines that recover automatically from the failures that actually happen.',
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
              minWidth: i === 0 ? 140 : 160,
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

export default function ErrorHandlingRetriesModule() {
  return (
    <LearnLayout
      title="Error Handling, Retries, and Dead Letter Queues"
      description="Classifying errors, exponential backoff with jitter, circuit breakers, DLQ design, and building pipelines that recover automatically."
      section="Data Engineering"
      readTime="60 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — The Error Handling Gap ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Error Handling Gap" />
        <SectionTitle>The Gap Between a Pipeline That Works and One That Survives Production</SectionTitle>

        <Para>
          A pipeline that handles the happy path is not a production pipeline.
          Production has network timeouts at 3 AM, API rate limits during traffic
          spikes, one malformed row in a batch of 50,000, Snowflake warehouse
          auto-suspended when the pipeline starts, a source database that returns
          503 for 4 minutes during a deploy, and a vendor CSV that arrives with
          an entirely wrong schema once a month.
        </Para>

        <Para>
          The difference between a pipeline that handles these gracefully and one
          that pages you at 3 AM is a well-designed error handling strategy. This
          module covers every layer: how to classify errors, how to retry correctly,
          how to implement circuit breakers, how to design dead letter queues, and
          how to build alerting that surfaces real problems without crying wolf.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 14,
          }}>
            The error handling hierarchy
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { level: '1', name: 'Row-level errors', color: '#facc15', desc: 'Invalid data in individual rows — validate, reject to DLQ, continue processing the rest of the batch.' },
              { level: '2', name: 'Transient errors', color: '#f97316', desc: 'Temporary infrastructure failures — network timeout, 503, rate limit. Retry with backoff.' },
              { level: '3', name: 'Permanent errors', color: '#ff4757', desc: 'Structural problems — bad credentials, schema mismatch, wrong endpoint. Do NOT retry. Alert immediately.' },
              { level: '4', name: 'Batch-level errors', color: '#7b61ff', desc: 'An entire batch fails validation — quarantine the batch, run rest of pipeline without it.' },
              { level: '5', name: 'Pipeline-level errors', color: '#00e676', desc: 'The whole pipeline cannot proceed — checkpoint what was completed, alert, allow human intervention.' },
            ].map((item) => (
              <div key={item.level} style={{
                background: 'var(--bg2)', border: `1px solid ${item.color}30`,
                borderLeft: `3px solid ${item.color}`, borderRadius: 8,
                padding: '12px 14px',
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: item.color,
                  fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                  textTransform: 'uppercase', marginBottom: 4,
                }}>Level {item.level} — {item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 02 — Error Classification ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Error Classification" />
        <SectionTitle>Transient vs Permanent Errors — The Classification That Determines Everything</SectionTitle>

        <Para>
          The single most important decision in error handling is whether to retry.
          Retrying a transient error recovers the pipeline automatically. Retrying
          a permanent error wastes time, consumes resources, and delays the alert
          that would trigger human intervention. The classification of an error as
          transient or permanent determines the entire downstream response.
        </Para>

        <SubTitle>The error taxonomy for data pipelines</SubTitle>

        <CompareTable
          headers={[
            { label: 'Error type' },
            { label: 'Examples', color: '#f97316' },
            { label: 'Retry?', color: '#00e676' },
            { label: 'Action', color: '#7b61ff' },
          ]}
          keys={['type', 'examples', 'retry', 'action']}
          rows={[
            { type: 'Network timeout', examples: 'requests.Timeout, psycopg2.OperationalError, ConnectionResetError', retry: '✓ Yes — fixed interval or backoff', action: 'Retry up to N times. Alert if all retries exhausted.' },
            { type: 'Rate limit (429)', examples: 'HTTP 429 Too Many Requests', retry: '✓ Yes — after Retry-After delay', action: 'Read Retry-After header. Wait exact amount. Then retry.' },
            { type: 'Server error (5xx)', examples: 'HTTP 500, 502, 503, 504', retry: '✓ Yes — with exponential backoff', action: 'Backoff: 2s, 4s, 8s, 16s, 32s. Alert if 3+ consecutive 5xx.' },
            { type: 'Database lock/deadlock', examples: 'psycopg2.errors.DeadlockDetected', retry: '✓ Yes — immediately or short delay', action: 'Retry the transaction immediately (deadlocks resolve on retry).' },
            { type: 'Transient DB error', examples: 'could not connect, connection refused (temporary)', retry: '✓ Yes — exponential backoff', action: 'Backoff starting at 5s. Alert if source unreachable > 15 min.' },
            { type: 'Auth failure (401)', examples: 'HTTP 401 Unauthorized', retry: '✗ No — credentials are wrong', action: 'Alert immediately. Do not retry — credentials will not fix themselves.' },
            { type: 'Forbidden (403)', examples: 'HTTP 403 Forbidden', retry: '✗ No — permissions issue', action: 'Alert immediately. Investigate permissions.' },
            { type: 'Not found (404)', examples: 'HTTP 404 Not Found', retry: '✗ No — resource does not exist', action: 'Log warning. Skip this record. The resource was deleted.' },
            { type: 'Schema mismatch', examples: 'Column "order_amount" does not exist, unexpected type', retry: '✗ No — structural issue', action: 'Alert immediately. Pipeline cannot proceed without schema fix.' },
            { type: 'Bad credentials', examples: 'Authentication failed for user "pipeline"', retry: '✗ No — credentials invalid', action: 'Alert immediately. Rotate credentials.' },
            { type: 'Data validation failure', examples: 'NULL in required field, negative amount', retry: '✗ No — data is genuinely invalid', action: 'Write row to DLQ. Continue with rest of batch. Alert if DLQ rate high.' },
            { type: 'Disk full', examples: 'No space left on device', retry: '✗ No — environment problem', action: 'Alert immediately. Clean up before retrying.' },
            { type: 'OOM / memory error', examples: 'MemoryError, Container OOMKilled', retry: '⚡ Maybe — with smaller batch size', action: 'Reduce batch size. If still OOM: alert — resource issue.' },
          ]}
        />

        <CodeBox label="Error classifier — deterministic routing for every exception type">{`import requests
import psycopg2

class ErrorClassification:
    RETRY_IMMEDIATELY = 'retry_immediately'   # retry at once (deadlock)
    RETRY_BACKOFF     = 'retry_backoff'       # retry after exponential backoff
    RETRY_AFTER_DELAY = 'retry_after_delay'   # retry after specific delay (rate limit)
    PERMANENT_FAILURE = 'permanent_failure'   # do not retry, alert
    ROW_LEVEL_FAILURE = 'row_level_failure'   # reject row to DLQ, continue


def classify_error(exc: Exception, response=None) -> tuple[str, str]:
    """
    Classify an exception into a handling category.
    Returns (classification, human_readable_reason).
    """

    # ── HTTP response errors ───────────────────────────────────────────────────
    if response is not None:
        status = response.status_code
        if status == 429:
            retry_after = response.headers.get('Retry-After', '60')
            return ErrorClassification.RETRY_AFTER_DELAY, \
                   f'Rate limited — Retry-After: \${retry_after}s'
        if status in (500, 502, 503, 504):
            return ErrorClassification.RETRY_BACKOFF, \
                   f'Server error \${status} — transient'
        if status == 401:
            return ErrorClassification.PERMANENT_FAILURE, \
                   f'Authentication failed (401) — check credentials'
        if status == 403:
            return ErrorClassification.PERMANENT_FAILURE, \
                   f'Forbidden (403) — check permissions'
        if status == 404:
            return ErrorClassification.ROW_LEVEL_FAILURE, \
                   f'Resource not found (404) — skip this record'
        if 400 <= status < 500:
            return ErrorClassification.PERMANENT_FAILURE, \
                   f'Client error \${status} — fix request before retrying'

    # ── Network / connection errors ────────────────────────────────────────────
    if isinstance(exc, (requests.Timeout, requests.ConnectionError)):
        return ErrorClassification.RETRY_BACKOFF, \
               f'Network error: \${type(exc).__name__}'

    # ── PostgreSQL errors ──────────────────────────────────────────────────────
    if isinstance(exc, psycopg2.errors.DeadlockDetected):
        return ErrorClassification.RETRY_IMMEDIATELY, \
               'Deadlock detected — retry transaction'
    if isinstance(exc, psycopg2.OperationalError):
        msg = str(exc).lower()
        if 'connection' in msg or 'timeout' in msg:
            return ErrorClassification.RETRY_BACKOFF, f'DB connection error: \${exc}'
        return ErrorClassification.PERMANENT_FAILURE, f'DB operational error: \${exc}'

    # ── Data / schema errors ───────────────────────────────────────────────────
    if isinstance(exc, (ValueError, TypeError, KeyError)):
        return ErrorClassification.ROW_LEVEL_FAILURE, \
               f'Data error: \${type(exc).__name__}: \${exc}'

    if isinstance(exc, (AttributeError, ImportError, SyntaxError)):
        return ErrorClassification.PERMANENT_FAILURE, \
               f'Code error (not data): \${type(exc).__name__}: \${exc}'

    # ── Memory errors ──────────────────────────────────────────────────────────
    if isinstance(exc, MemoryError):
        return ErrorClassification.PERMANENT_FAILURE, \
               'Out of memory — reduce batch size'

    # ── Unknown errors — treat as permanent (fail safe) ───────────────────────
    return ErrorClassification.PERMANENT_FAILURE, \
           f'Unknown error: \${type(exc).__name__}: \${exc}'`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — Retry Strategies ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Retry Strategies" />
        <SectionTitle>Retry Strategies — From Fixed Interval to Exponential Backoff With Jitter</SectionTitle>

        <Para>
          Not all retries are equal. The naive approach — retry immediately three
          times — makes things worse when the source system is under load. All
          retrying clients resume simultaneously, creating a thundering herd that
          overwhelms the already-struggling service. Exponential backoff spaces
          retries out so the service has time to recover. Jitter breaks synchronisation
          between multiple parallel clients so they do not all retry at the same
          moment.
        </Para>

        <SubTitle>The retry decorator — production-grade implementation</SubTitle>

        <CodeBox label="Retry decorator — exponential backoff with jitter, all error types handled">{`import functools
import logging
import random
import time
from typing import Callable, Type

log = logging.getLogger(__name__)


def retry_with_backoff(
    max_attempts:   int   = 5,
    base_delay_s:   float = 1.0,
    max_delay_s:    float = 60.0,
    jitter_factor:  float = 0.25,
    retryable_exceptions: tuple[Type[Exception], ...] = (Exception,),
    non_retryable_exceptions: tuple[Type[Exception], ...] = (),
) -> Callable:
    """
    Decorator that retries a function on transient failures.

    Backoff formula:
      delay = min(base_delay * 2^attempt, max_delay) * (1 ± jitter_factor)

    Attempt 1: ~1s
    Attempt 2: ~2s
    Attempt 3: ~4s
    Attempt 4: ~8s
    Attempt 5: ~16s
    All with ±25% jitter to prevent thundering herd.
    """
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_exc = None

            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)

                except non_retryable_exceptions as exc:
                    # These exceptions must NOT be retried under any circumstances
                    log.error(
                        'Non-retryable error in \${s} (attempt \${d}/\${d}): \${s}',
                        func.__name__, attempt, max_attempts, str(exc),
                    )
                    raise

                except retryable_exceptions as exc:
                    last_exc = exc

                    if attempt == max_attempts:
                        log.error(
                            'All \${d} attempts exhausted for \${s}: \${s}',
                            max_attempts, func.__name__, str(exc),
                        )
                        raise

                    # Exponential backoff with full jitter
                    raw_delay = min(base_delay_s * (2 ** (attempt - 1)), max_delay_s)
                    jitter    = raw_delay * jitter_factor * (2 * random.random() - 1)
                    delay     = max(0, raw_delay + jitter)

                    log.warning(
                        '\${s} failed (attempt \${d}/\${d}): \${s}. Retrying in \${.2f}s',
                        func.__name__, attempt, max_attempts, str(exc), delay,
                    )
                    time.sleep(delay)

            raise last_exc  # should not reach here

        return wrapper
    return decorator


# ── USAGE ─────────────────────────────────────────────────────────────────────

# For API calls:
@retry_with_backoff(
    max_attempts=5,
    base_delay_s=2.0,
    max_delay_s=60.0,
    retryable_exceptions=(requests.Timeout, requests.ConnectionError),
    non_retryable_exceptions=(AuthenticationError, SchemaError),
)
def fetch_payments(from_ts: int, to_ts: int) -> dict:
    response = requests.get(
        'https://api.razorpay.com/v1/payments',
        params={'from': from_ts, 'to': to_ts},
        auth=HTTPBasicAuth(KEY_ID, KEY_SECRET),
        timeout=30,
    )
    if response.status_code == 429:
        wait = float(response.headers.get('Retry-After', 60))
        raise RateLimitError(f'Rate limited — wait \${wait}s')
    response.raise_for_status()
    return response.json()


# For database operations:
@retry_with_backoff(
    max_attempts=3,
    base_delay_s=0.5,
    retryable_exceptions=(psycopg2.errors.DeadlockDetected,
                          psycopg2.OperationalError),
)
def write_batch_to_db(rows: list[dict], conn) -> int:
    with conn:
        psycopg2.extras.execute_values(cur, UPSERT_SQL, rows)
    return len(rows)`}</CodeBox>

        <SubTitle>Rate limit handling — the Retry-After pattern</SubTitle>

        <CodeBox label="Rate limit handler — reading Retry-After and backing off correctly">{`import time
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime


def handle_rate_limit_response(response) -> float:
    """
    Extract the correct wait time from a 429 response.
    Returns seconds to wait before the next retry.

    Retry-After header can be:
      - An integer number of seconds: "Retry-After: 60"
      - An HTTP date string: "Retry-After: Wed, 18 Mar 2026 02:00:00 GMT"
    """
    retry_after = response.headers.get('Retry-After')

    if not retry_after:
        # No header — use conservative default
        return 30.0

    try:
        # Integer seconds
        return float(retry_after)
    except ValueError:
        pass

    try:
        # HTTP date string
        retry_dt = parsedate_to_datetime(retry_after)
        now_utc  = datetime.now(timezone.utc)
        wait     = (retry_dt - now_utc).total_seconds()
        return max(0.0, wait)
    except Exception:
        return 30.0   # parse failed — default


def api_call_with_rate_limit_handling(
    url: str,
    params: dict,
    auth,
    max_retries: int = 5,
) -> dict:
    """
    Make an API call, handling 429 rate limits with correct backoff.
    Distinguishes 429 (rate limit — controllable) from 5xx (server error).
    """
    for attempt in range(1, max_retries + 1):
        response = requests.get(url, params=params, auth=auth, timeout=30)

        if response.status_code == 200:
            return response.json()

        elif response.status_code == 429:
            wait = handle_rate_limit_response(response)
            # Add 10% jitter to avoid thundering herd across multiple pipeline instances
            wait *= (1.0 + random.uniform(0, 0.1))
            log.warning(
                'Rate limited (attempt \${d}/\${d}) — waiting \${.1f}s',
                attempt, max_retries, wait,
            )
            if attempt < max_retries:
                time.sleep(wait)
            else:
                response.raise_for_status()

        elif response.status_code in (500, 502, 503, 504):
            # Server error — exponential backoff
            wait = min(2 ** attempt, 60) * (1 + random.uniform(-0.2, 0.2))
            log.warning(
                'Server error \${d} (attempt \${d}/\${d}) — waiting \${.1f}s',
                response.status_code, attempt, max_retries, wait,
            )
            if attempt < max_retries:
                time.sleep(wait)
            else:
                response.raise_for_status()

        else:
            # 4xx client errors (except 429) — do not retry
            response.raise_for_status()`}</CodeBox>

        <SubTitle>Jitter patterns — why randomisation matters</SubTitle>

        <CodeBox label="Jitter patterns — preventing the thundering herd">{`# THE THUNDERING HERD PROBLEM:
# 100 pipeline instances all fail at T=0
# All retry with identical exponential backoff (no jitter):
#   Attempt 2: all 100 clients retry at T=2s  → server hit with 100 requests
#   Attempt 3: all 100 clients retry at T=4s  → server hit with 100 requests
# The synchronised retries make the server's recovery impossible.
# Jitter desynchronises the retries.

import random

def compute_backoff_delay(
    attempt:      int,
    base_s:       float = 1.0,
    max_s:        float = 60.0,
    strategy:     str   = 'full_jitter',
) -> float:
    """
    Compute the backoff delay for a given attempt number.

    Strategies:
      fixed:          base * 2^attempt  (no randomisation — thundering herd risk)
      equal_jitter:   half fixed + half random  (moderate desynchronisation)
      full_jitter:    random between 0 and cap  (maximum desynchronisation)
      decorrelated:   random between base and last*3  (AWS-recommended)
    """
    cap = min(base_s * (2 ** attempt), max_s)

    if strategy == 'fixed':
        return cap

    elif strategy == 'equal_jitter':
        return cap / 2 + random.uniform(0, cap / 2)

    elif strategy == 'full_jitter':
        # AWS recommended for high-concurrency scenarios
        # Each client independently chooses a random delay between 0 and cap
        # Result: retries spread evenly over the [0, cap] interval
        return random.uniform(0, cap)

    elif strategy == 'decorrelated':
        # Good for sequential retries from a single client
        # Each delay is random between base and 3× the previous delay
        # Prevents very fast retries while avoiding excessively long waits
        last_delay = getattr(compute_backoff_delay, '_last', base_s)
        delay = random.uniform(base_s, last_delay * 3)
        compute_backoff_delay._last = min(delay, max_s)
        return min(delay, max_s)

    return cap

# RECOMMENDATION: use full_jitter for multiple parallel pipeline instances
# Use decorrelated for a single client retrying a sequential operation

# EXAMPLE DELAYS (full_jitter, base=1s, max=60s):
# Attempt 1: random in [0,  2]s   → avg ~1s
# Attempt 2: random in [0,  4]s   → avg ~2s
# Attempt 3: random in [0,  8]s   → avg ~4s
# Attempt 4: random in [0, 16]s   → avg ~8s
# Attempt 5: random in [0, 32]s   → avg ~16s
# 100 clients: evenly distributed over the window — no thundering herd`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Circuit Breaker ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Circuit Breaker Pattern" />
        <SectionTitle>Circuit Breaker — Stop Hammering a Failing System</SectionTitle>

        <Para>
          Exponential backoff slows retries. A circuit breaker stops them entirely
          when a downstream system is clearly unavailable. The pattern comes from
          electrical engineering: when a circuit overloads, the breaker trips and
          cuts power to prevent damage. When a downstream API or database is failing
          consistently, the circuit breaker trips and rejects new requests immediately
          rather than queuing them up to fail.
        </Para>

        <Para>
          Without a circuit breaker, a pipeline calling a failing API keeps trying,
          blocking threads, consuming connection pool slots, and adding load to an
          already-struggling service. The circuit breaker lets the service recover
          by taking the pressure off, and automatically retests recovery with a
          probe request after a cooldown period.
        </Para>

        <CodeBox label="Circuit breaker — three states and the state machine">{`import threading
import time
from enum import Enum

class CircuitState(Enum):
    CLOSED    = 'closed'     # normal operation — requests flow through
    OPEN      = 'open'       # tripped — requests fail immediately (no call made)
    HALF_OPEN = 'half_open'  # testing recovery — one probe request allowed


class CircuitBreaker:
    """
    Circuit breaker for protecting downstream services.

    STATE MACHINE:
      CLOSED → (failure_threshold failures in window) → OPEN
      OPEN   → (cooldown_s elapsed) → HALF_OPEN
      HALF_OPEN → (probe succeeds) → CLOSED
      HALF_OPEN → (probe fails)    → OPEN

    CLOSED:    all requests pass through; failures counted
    OPEN:      all requests fail immediately; service gets breathing room
    HALF_OPEN: one probe request allowed; if it succeeds → CLOSED
    """

    def __init__(
        self,
        name:              str,
        failure_threshold: int   = 5,    # failures in window before tripping
        success_threshold: int   = 2,    # successes in half-open before closing
        window_s:          float = 60.0, # rolling window for failure counting
        cooldown_s:        float = 30.0, # time to wait in OPEN before half-open
    ):
        self.name               = name
        self.failure_threshold  = failure_threshold
        self.success_threshold  = success_threshold
        self.window_s           = window_s
        self.cooldown_s         = cooldown_s

        self._state             = CircuitState.CLOSED
        self._failure_times:    list[float] = []
        self._half_open_success = 0
        self._opened_at:        float | None = None
        self._lock              = threading.Lock()

    @property
    def state(self) -> CircuitState:
        with self._lock:
            if self._state == CircuitState.OPEN:
                # Check if cooldown has elapsed → transition to HALF_OPEN
                if self._opened_at and time.monotonic() - self._opened_at >= self.cooldown_s:
                    self._state = CircuitState.HALF_OPEN
                    self._half_open_success = 0
                    log.info('Circuit \${s}: OPEN → HALF_OPEN (cooldown elapsed)', self.name)
            return self._state

    def call(self, func, *args, **kwargs):
        """
        Execute func through the circuit breaker.
        Raises CircuitOpenError if the circuit is OPEN.
        """
        state = self.state

        if state == CircuitState.OPEN:
            raise CircuitOpenError(
                f'Circuit breaker \${self.name} is OPEN — '
                f'service unavailable, retry after cooldown'
            )

        try:
            result = func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as exc:
            self._on_failure()
            raise

    def _on_success(self) -> None:
        with self._lock:
            now = time.monotonic()
            if self._state == CircuitState.HALF_OPEN:
                self._half_open_success += 1
                if self._half_open_success >= self.success_threshold:
                    self._state        = CircuitState.CLOSED
                    self._failure_times = []
                    log.info('Circuit \${s}: HALF_OPEN → CLOSED (service recovered)', self.name)
            elif self._state == CircuitState.CLOSED:
                # Remove old failures outside the window
                self._failure_times = [t for t in self._failure_times
                                       if now - t < self.window_s]

    def _on_failure(self) -> None:
        with self._lock:
            now = time.monotonic()
            if self._state == CircuitState.HALF_OPEN:
                # Probe failed — back to OPEN
                self._state      = CircuitState.OPEN
                self._opened_at  = now
                log.warning('Circuit \${s}: HALF_OPEN → OPEN (probe failed)', self.name)
                return

            # Record failure time
            self._failure_times.append(now)
            # Remove failures outside window
            self._failure_times = [t for t in self._failure_times
                                   if now - t < self.window_s]

            if len(self._failure_times) >= self.failure_threshold:
                self._state     = CircuitState.OPEN
                self._opened_at = now
                log.error(
                    'Circuit \${s}: CLOSED → OPEN (\${d} failures in \${.0f}s window)',
                    self.name, len(self._failure_times), self.window_s,
                )


class CircuitOpenError(Exception):
    pass


# ── USAGE IN A DATA PIPELINE ──────────────────────────────────────────────────

# Create one circuit breaker per downstream service:
razorpay_circuit = CircuitBreaker(
    name              = 'razorpay_api',
    failure_threshold = 5,    # trip after 5 failures in 60 seconds
    cooldown_s        = 30.0, # test recovery after 30 seconds
)

def fetch_payments_safe(params: dict) -> dict:
    """Fetch payments, respecting the circuit breaker."""
    try:
        return razorpay_circuit.call(
            requests.get,
            'https://api.razorpay.com/v1/payments',
            params=params,
            auth=HTTPBasicAuth(KEY_ID, KEY_SECRET),
            timeout=30,
        )
    except CircuitOpenError:
        log.warning('Razorpay API circuit is OPEN — skipping payment fetch')
        # Return empty result or raise depending on pipeline logic
        return {'items': [], 'cursor': None}
    except Exception as exc:
        classification, reason = classify_error(exc)
        if classification == ErrorClassification.PERMANENT_FAILURE:
            raise   # let permanent failures propagate
        raise       # transient errors also propagate (circuit tracks them)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Dead Letter Queue Design ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Dead Letter Queue Design" />
        <SectionTitle>Dead Letter Queue — Not a Trash Can, a Quarantine</SectionTitle>

        <Para>
          A dead letter queue (DLQ) is where records go when they cannot be
          processed by the main pipeline. The word "queue" is intentional — the
          DLQ is not a trash can where records are discarded and forgotten. It is
          a quarantine: records are held with full context (the error, the original
          raw record, the timestamp) until a human can investigate and decide whether
          to fix and reprocess, discard, or escalate.
        </Para>

        <Para>
          The design of the DLQ determines how useful it is in practice. A DLQ
          that stores records with no context is useless. A DLQ that is never
          monitored accumulates indefinitely. A DLQ that has no reprocessing
          mechanism means every DLQ record is permanent data loss.
        </Para>

        <SubTitle>DLQ design — what to store and how to structure it</SubTitle>

        <CodeBox label="Dead Letter Queue — structured storage with full context">{`# ── DATABASE-BACKED DLQ (preferred for analytical pipelines) ─────────────────

CREATE TABLE pipeline.dead_letter_queue (
    id              BIGSERIAL   PRIMARY KEY,
    pipeline_name   VARCHAR(100) NOT NULL,
    run_id          UUID        NOT NULL,
    error_type      VARCHAR(100) NOT NULL,  -- 'validation', 'transform', 'schema'
    error_message   TEXT        NOT NULL,
    raw_record      JSONB       NOT NULL,   -- the original record that failed
    source_table    VARCHAR(100),
    source_key      VARCHAR(200),           -- primary key from source (for lookup)
    rejected_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reprocess_count INTEGER     NOT NULL DEFAULT 0,
    last_reprocess  TIMESTAMPTZ,
    status          VARCHAR(20) NOT NULL DEFAULT 'pending',
    --   pending:    not yet investigated
    --   reprocessed: successfully reprocessed
    --   discarded:  intentionally ignored
    --   escalated:  sent to data quality team
    resolution_note TEXT,                  -- why it was discarded or escalated
    CONSTRAINT chk_status CHECK (status IN ('pending','reprocessed','discarded','escalated'))
);

-- Index for monitoring queries:
CREATE INDEX idx_dlq_pipeline_status ON pipeline.dead_letter_queue
    (pipeline_name, status, rejected_at);

-- Index for reprocessing lookups:
CREATE INDEX idx_dlq_source_key ON pipeline.dead_letter_queue
    (source_key, status) WHERE status = 'pending';


# ── DLQ WRITER CLASS ──────────────────────────────────────────────────────────

import json
from datetime import datetime, timezone

class DLQWriter:
    """Writes rejected records to the dead letter queue with full context."""

    def __init__(
        self,
        pipeline_name: str,
        run_id:        str,
        dest_conn,
        source_table:  str | None = None,
    ):
        self.pipeline_name = pipeline_name
        self.run_id        = run_id
        self.dest_conn     = dest_conn
        self.source_table  = source_table
        self._count        = 0

    def write(
        self,
        raw_record:    dict,
        error_type:    str,
        error_message: str,
        source_key:    str | None = None,
    ) -> None:
        """Write one rejected record to the DLQ."""
        # Serialise record safely — convert non-JSON types to strings
        safe_record = {}
        for k, v in raw_record.items():
            try:
                json.dumps(v)
                safe_record[k] = v
            except (TypeError, ValueError):
                safe_record[k] = str(v)

        with self.dest_conn.cursor() as cur:
            cur.execute("""
                INSERT INTO pipeline.dead_letter_queue
                    (pipeline_name, run_id, error_type, error_message,
                     raw_record, source_table, source_key)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (
                self.pipeline_name,
                self.run_id,
                error_type,
                error_message,
                json.dumps(safe_record),
                self.source_table,
                source_key or str(raw_record.get('order_id') or raw_record.get('id', '')),
            ))
        self.dest_conn.commit()
        self._count += 1

        log.warning(
            'DLQ: \${s} — \${s} (total DLQ count: \${d})',
            error_type, error_message[:100], self._count,
        )

    @property
    def count(self) -> int:
        return self._count

    def rejection_rate(self, total_processed: int) -> float:
        if total_processed == 0:
            return 0.0
        return self._count / total_processed


# ── DLQ MONITORING QUERIES ─────────────────────────────────────────────────────

# Daily DLQ summary — how many records rejected per pipeline:
SELECT
    pipeline_name,
    DATE(rejected_at)   AS date,
    error_type,
    COUNT(*)            AS dlq_count,
    COUNT(*) FILTER (WHERE status = 'pending') AS pending_count
FROM pipeline.dead_letter_queue
WHERE rejected_at > NOW() - INTERVAL '7 days'
GROUP BY 1, 2, 3
ORDER BY 2 DESC, 4 DESC;

-- ALERT: if pending_count > 100 for any pipeline on today's date

# Find the most common rejection reasons today:
SELECT error_type, error_message, COUNT(*) AS count
FROM pipeline.dead_letter_queue
WHERE rejected_at::DATE = CURRENT_DATE
  AND status = 'pending'
GROUP BY 1, 2
ORDER BY 3 DESC
LIMIT 20;

# Records that need reprocessing — for the reprocessing job:
SELECT id, raw_record, source_key
FROM pipeline.dead_letter_queue
WHERE pipeline_name = 'orders_incremental'
  AND status = 'pending'
  AND error_type = 'validation'
ORDER BY rejected_at ASC;`}</CodeBox>

        <SubTitle>DLQ reprocessing — closing the loop</SubTitle>

        <CodeBox label="DLQ reprocessing job — fix and retry quarantined records">{`"""
dlq_reprocess.py — Reprocess records from the dead letter queue.

Run manually after fixing the root cause that caused rejections.
Example: vendor changed a status value — update VALID_STATUSES,
then reprocess all DLQ records with error_type='validation'.
"""

def reprocess_dlq_records(
    pipeline_name: str,
    error_type:    str,
    dest_conn,
    dry_run:       bool = True,   # default dry_run=True — must opt in to real run
) -> dict:
    """
    Fetch pending DLQ records, attempt to reprocess them,
    update status to 'reprocessed' or 'escalated'.
    """
    stats = {'attempted': 0, 'reprocessed': 0, 'failed_again': 0}

    with dest_conn.cursor() as cur:
        cur.execute("""
            SELECT id, raw_record, source_key
            FROM pipeline.dead_letter_queue
            WHERE pipeline_name = %s
              AND error_type     = %s
              AND status         = 'pending'
            ORDER BY rejected_at ASC
            LIMIT 10000
        """, (pipeline_name, error_type))
        records = cur.fetchall()

    log.info('Found \${d} DLQ records to reprocess (dry_run=\${s})',
             len(records), dry_run)

    for dlq_id, raw_record_json, source_key in records:
        stats['attempted'] += 1
        raw_record = json.loads(raw_record_json)

        try:
            # Re-run validation with current (presumably fixed) rules
            result = validate_row(raw_record)

            if not result.is_valid:
                # Still fails validation — escalate
                if not dry_run:
                    dest_conn.execute("""
                        UPDATE pipeline.dead_letter_queue
                        SET status = 'escalated',
                            resolution_note = %s,
                            last_reprocess = NOW(),
                            reprocess_count = reprocess_count + 1
                        WHERE id = %s
                    """, (f'Still fails validation: \${result.error}', dlq_id))
                    dest_conn.commit()
                stats['failed_again'] += 1
                continue

            # Validation passes — transform and load
            enriched  = enrich_order(result.row)
            projected = project_to_dest_schema(enriched)

            if not dry_run:
                upsert_to_silver([projected], dest_conn)
                dest_conn.execute("""
                    UPDATE pipeline.dead_letter_queue
                    SET status = 'reprocessed',
                        resolution_note = 'Successfully reprocessed after fix',
                        last_reprocess  = NOW(),
                        reprocess_count = reprocess_count + 1
                    WHERE id = %s
                """, (dlq_id,))
                dest_conn.commit()
            stats['reprocessed'] += 1

        except Exception as exc:
            log.error('Reprocessing failed for DLQ id \${d}: \${s}', dlq_id, str(exc))
            stats['failed_again'] += 1

    log.info(
        'DLQ reprocessing complete: attempted=\${d} reprocessed=\${d} failed=\${d}',
        stats['attempted'], stats['reprocessed'], stats['failed_again'],
    )
    return stats`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — Alerting Strategy ──────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Alerting Strategy" />
        <SectionTitle>Alerting — Signal, Not Noise</SectionTitle>

        <Para>
          Alerting is where error handling meets operations. An alert that fires
          on every transient error creates alert fatigue — engineers start ignoring
          alerts because most of them resolve themselves. An alert that fires only
          on complete pipeline failure misses degraded states where the pipeline
          is technically running but producing wrong data. The art is choosing
          thresholds that surface real problems early while suppressing noise.
        </Para>

        <SubTitle>What to alert on — the four-tier alerting model</SubTitle>

        {[
          {
            tier: 'P1 — Immediate (page someone)',
            color: '#ff4757',
            conditions: [
              'Pipeline has not completed by SLA deadline (data is stale for analysts)',
              'Permanent error: authentication failure, schema mismatch, disk full',
              'DLQ count > 5% of processed rows in a single run',
              'Replication slot lag > 10 GB (source database at risk)',
              'Silver/Gold table row count dropped > 20% vs same weekday last week',
            ],
          },
          {
            tier: 'P2 — Investigate within 1 hour',
            color: '#f97316',
            conditions: [
              'Pipeline failed and all retries exhausted — no automatic recovery',
              'DLQ count growing over multiple consecutive runs (systemic data quality issue)',
              'Run duration > 2× p95 historical duration (performance regression)',
              'Source system returning 5xx errors for > 5 consecutive minutes',
              'Consumer group Kafka lag > 10,000 messages or > 5 minutes',
            ],
          },
          {
            tier: 'P3 — Investigate within 24 hours',
            color: '#facc15',
            conditions: [
              'Individual run failed but recovered automatically on retry',
              'DLQ has new records (review tomorrow morning)',
              'Run duration 1.5× slower than usual (trend to watch)',
              'Any 4xx error from external API (credentials may need rotation soon)',
            ],
          },
          {
            tier: 'No alert — log only',
            color: '#00e676',
            conditions: [
              'Single transient error that resolved on first retry',
              'Rate limit hit but recovered within allowed retry budget',
              'Row count within expected range with no anomaly',
              'Heartbeat: pipeline ran successfully (log, do not alert)',
            ],
          },
        ].map((tier, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: `1px solid ${tier.color}30`,
            borderLeft: `3px solid ${tier.color}`, borderRadius: 10,
            padding: '16px 20px', marginBottom: 14,
          }}>
            <div style={{
              fontSize: 13, fontWeight: 800, color: tier.color,
              fontFamily: 'var(--font-display)', marginBottom: 10,
            }}>{tier.tier}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {tier.conditions.map((c, ci) => (
                <div key={ci} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{
                    fontSize: 12, color: tier.color, fontFamily: 'var(--font-mono)',
                    marginTop: 2, flexShrink: 0,
                  }}>→</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{c}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <SubTitle>Alert message quality — what a good alert contains</SubTitle>

        <CodeBox label="Alert message structure — what engineers need to act immediately">{`# BAD ALERT (what not to do):
# Subject: Pipeline Error
# Body: An error occurred in the orders pipeline.
# → No context. What failed? What impact? Where to look? No idea.

# GOOD ALERT (actionable immediately):
# Subject: [P1] orders_incremental pipeline FAILED — data stale since 06:00 UTC

ALERT BODY:
  Pipeline:   orders_incremental (FreshCart Silver Layer)
  Status:     FAILED
  Failed at:  2026-03-17 06:23:41 UTC
  Error:      psycopg2.OperationalError: could not connect to server
  Impact:     Silver orders table not updated since 2026-03-17 06:00:00 UTC
              Analytics dashboard showing stale data — SLA BREACHED

  Context:
    Run ID:           run-abc123
    Rows processed:   47,000 / 48,234 (97% complete before failure)
    Checkpoint:       2026-03-17 05:59:47 UTC (saved at row 47,000)
    DLQ count:        12 rows (0.025% rejection rate — normal)
    Duration:         14 min 32 sec (normal: 12-15 min)

  Diagnostic links:
    Airflow DAG run:    https://airflow.internal/dags/orders_pipeline/.../runs/...
    Snowflake history:  https://app.snowflake.com/...
    DLQ records:        SELECT * FROM pipeline.dead_letter_queue WHERE run_id='abc123'
    Source DB status:   https://grafana.internal/d/postgres-health

  Automated recovery:
    Airflow will retry in 2 minutes (attempt 2 of 3)
    If all retries fail: page on-call data engineer

  Resolution steps:
    1. Check source DB connectivity: psql \${SOURCE_DB_URL} -c "SELECT 1"
    2. If DB down: check pg_stat_activity on primary, check replica lag
    3. If network issue: check VPN/peering to replica subnet
    4. Manual run: python -m pipeline.main --date 2026-03-17

# IMPLEMENT WITH:
def format_alert(run: PipelineRun, error: Exception) -> str:
    return f"""
Pipeline: \${run.pipeline_name}
Status: FAILED
Error: \${type(error).__name__}: \${error}
Impact: Data stale since \${run.started_at.isoformat()} UTC
Run ID: \${run.run_id}
Rows: \${run.rows_written:,} written, \${run.rows_rejected:,} rejected
DLQ: \${run.dlq_count} records
Checkpoint: \${load_watermark().isoformat()}
See: https://airflow.internal/dags/\${run.pipeline_name}/
"""`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Error Handling in Airflow ──────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Airflow Error Handling" />
        <SectionTitle>Error Handling at the Orchestration Layer — Airflow</SectionTitle>

        <Para>
          The pipeline code handles row-level and request-level errors internally.
          The orchestration layer (Airflow) handles task-level and DAG-level
          failures — deciding when to retry, when to alert, and how to propagate
          failures between dependent tasks.
        </Para>

        <CodeBox label="Airflow error handling — retries, callbacks, and failure propagation">{`from datetime import timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.utils.email import send_email

# ── TASK-LEVEL RETRY CONFIGURATION ───────────────────────────────────────────
default_args = {
    'retries':           3,
    'retry_delay':       timedelta(minutes=2),
    'retry_exponential_backoff': True,    # delays: 2m, 4m, 8m
    'max_retry_delay':   timedelta(minutes=30),
    'execution_timeout': timedelta(minutes=15),   # kill if runs too long
    'email_on_failure':  True,
    'email_on_retry':    False,           # don't spam on expected retries
    'email':             ['data-team@freshmart.com'],
}

# ── SLA MISS CALLBACK ─────────────────────────────────────────────────────────
def sla_miss_callback(dag, task_list, blocking_task_list, slas, blocking_tis):
    """Called when a task misses its SLA — send a warning before it fully fails."""
    missed_tasks = [sla.task_id for sla in slas]
    send_slack_alert(
        channel='#data-alerts',
        message=f':warning: SLA MISS: tasks \${missed_tasks} in DAG \${dag.dag_id} '
                f'exceeded their SLA. Data may be stale soon.',
        urgency='warning',
    )

# ── ON-FAILURE CALLBACK ────────────────────────────────────────────────────────
def task_failure_callback(context):
    """
    Called when a task fails all retries.
    Sends a rich alert with context, impact, and diagnostic links.
    """
    dag_run  = context['dag_run']
    task     = context['task']
    ti       = context['task_instance']
    exc      = context.get('exception')

    # Pull metrics from XCom if the task published them before failing
    rows_written  = ti.xcom_pull(key='rows_written')  or 0
    rows_rejected = ti.xcom_pull(key='rows_rejected') or 0
    run_id        = ti.xcom_pull(key='pipeline_run_id') or 'unknown'

    message = f"""
*[P1] Pipeline FAILED — Manual Intervention Required*

*DAG:*      \${dag_run.dag_id}
*Task:*     \${task.task_id}
*Run:*      \${dag_run.run_id}
*Error:*    \${type(exc).__name__}: \${exc}
*Impact:*   Analytics data may be stale

*Progress before failure:*
  Rows written:   \${rows_written:,}
  Rows rejected:  \${rows_rejected:,}
  Pipeline run:   \${run_id}

*Actions:*
  • Check Airflow: \${ti.log_url}
  • Manual retry: python -m pipeline.main
  • DLQ: SELECT * FROM pipeline.dead_letter_queue WHERE run_id='\${run_id}'
"""
    send_slack_alert(channel='#data-oncall', message=message, urgency='critical')
    # Also create a PagerDuty incident if it's the primary SLA pipeline


# ── ON-SUCCESS CALLBACK (for SLA verification) ────────────────────────────────
def task_success_callback(context):
    """Verify data quality after successful task completion."""
    ti = context['task_instance']
    rows_written  = ti.xcom_pull(key='rows_written')  or 0
    rows_rejected = ti.xcom_pull(key='rows_rejected') or 0

    if rows_written + rows_rejected > 0:
        rejection_rate = rows_rejected / (rows_written + rows_rejected)
        if rejection_rate > 0.05:
            send_slack_alert(
                channel='#data-quality',
                message=f':warning: High DLQ rate in \${ti.dag_id}: '
                        f'\${rejection_rate:.1%} of rows rejected. '
                        f'Check: SELECT * FROM pipeline.dead_letter_queue',
                urgency='warning',
            )


# ── DAG DEFINITION WITH CALLBACKS ────────────────────────────────────────────
with DAG(
    dag_id          = 'orders_pipeline_incremental',
    default_args    = default_args,
    sla_miss_callback = sla_miss_callback,
    ...
) as dag:

    ingest = PythonOperator(
        task_id          = 'ingest_orders',
        python_callable  = run_pipeline,
        on_failure_callback = task_failure_callback,
        on_success_callback = task_success_callback,
        sla = timedelta(minutes=10),
    )`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Vendor File With 3% Bad Rows — Handling It Without Stopping the Pipeline</SectionTitle>

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
            Scenario — FreshCart · Weekly vendor reconciliation file
          </div>

          <Para>
            Every Monday, a logistics partner sends a CSV file containing 180,000
            delivery records for the previous week. This week's file has 5,400
            rows where the delivery_fee column contains the string "N/A" instead
            of a decimal value — a data entry issue on the vendor's side.
          </Para>

          <Para>
            Without proper error handling, the pipeline would crash on the first
            invalid row, process zero records, and page the on-call engineer at
            06:15 AM. Here is how the error handling hierarchy handles it correctly.
          </Para>

          <CodeBox label="Error handling in action — 3% bad rows, zero downtime">{`PIPELINE EXECUTION LOG (abbreviated):

06:00:12 INFO  Pipeline started: vendor_reconciliation run-def456
06:00:14 INFO  Loaded 180,000 rows from ShipFast weekly report
06:00:14 INFO  Beginning validation...

06:00:18 WARNING  Row-level validation failed:
                  error=non_numeric_delivery_fee: 'N/A'
                  source_key=shipfast_delivery_id=SFD_001847
                  → Written to DLQ (count: 1)

06:00:18 INFO  [continues processing without stopping]

06:04:22 INFO  Batch 1 complete: 5000 rows (47 rejected → DLQ)
06:04:22 INFO  Batch 2 complete: 5000 rows (53 rejected → DLQ)
...
06:18:44 INFO  Batch 36 complete: 5000 rows (150 rejected → DLQ)

06:18:47 WARNING  DLQ count: 5,400 rows (3.0% rejection rate)
                  Threshold: 5.0% — within acceptable range
                  DLQ file: /data/dlq/vendor_recon_run-def456.ndjson

06:18:48 INFO  Successfully loaded 174,600 of 180,000 rows
06:18:48 INFO  Checkpoint saved: 2026-03-17 23:59:59 UTC
06:18:49 INFO  Pipeline complete: duration=18m37s status=SUCCESS

# P3 alert sent (no P1 — below 5% threshold):
# 📋 [P3] vendor_reconciliation: 5,400 rows in DLQ (3.0%)
# Review: SELECT * FROM pipeline.dead_letter_queue
#          WHERE run_id = 'def456'
#          AND error_type = 'validation'

# Monday morning — data engineer reviews DLQ:
SELECT error_message, COUNT(*) AS count
FROM pipeline.dead_letter_queue
WHERE run_id = 'def456' AND status = 'pending'
GROUP BY 1;

# error_message                              count
# non_numeric_delivery_fee: 'N/A'            5,400

# Root cause: vendor sent "N/A" for NULL delivery fees (cash on delivery orders)
# Fix: treat "N/A" as 0 in the delivery_fee parser

# Update parser:
# def parse_delivery_fee(raw):
#     if raw in ('N/A', 'NA', 'null', 'NULL', ''):
#         return 0.0
#     return float(raw)

# Reprocess DLQ:
python dlq_reprocess.py \
    --pipeline vendor_reconciliation \
    --error-type validation \
    --dry-run false

# Output:
# DLQ reprocessing: attempted=5400 reprocessed=5400 failed=0
# All 5,400 rows successfully loaded to silver.vendor_deliveries

# Contact vendor to fix the source data for future files.
# Total impact: 174,600 rows loaded on time, 5,400 loaded Monday morning
# Analyst impact: delivery fee is NULL for COD orders until Monday reprocess
# Business impact: none (delivery fee not in Monday reporting)`}</CodeBox>

          <Para>
            The error handling hierarchy worked exactly as designed. Row-level
            validation errors went to the DLQ without stopping the pipeline.
            The 97% of valid rows were loaded on time. The DLQ count was below
            the P1 threshold so no one was paged at 6 AM. The root cause was
            identified in 3 minutes on Monday morning and reprocessed in 5 minutes.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. How do you decide whether to retry an error or fail immediately? Walk me through your classification system.',
            a: `The core principle is simple: transient errors should be retried, permanent errors should fail immediately and alert. The classification determines everything about how the pipeline responds.

Transient errors are failures where the same request would likely succeed if tried again — the underlying cause is temporary and will resolve without code changes. Network timeouts, HTTP 503 service unavailable, 502 bad gateway, database connection timeouts, and HTTP 429 rate limit responses all fall here. A Razorpay API returning 503 during a deploy will return 200 seconds later. A database returning a connection timeout during peak load will accept connections a minute later. For these, retry with exponential backoff and jitter.

Permanent errors are failures where retrying will produce the same failure — the cause requires a code change, configuration change, or external intervention to fix. HTTP 401 unauthorized means the credentials are wrong and will continue to be wrong until someone rotates them. HTTP 400 bad request means the pipeline is sending a malformed request. A schema mismatch means a column was renamed in the source. Data validation failures mean a specific record is genuinely invalid. For these, fail immediately, send an alert, and do not waste time retrying.

The practical implementation is an error classifier function that maps exception types and HTTP status codes to handling strategies. The key principle for unknown errors is to fail safe — treat them as permanent until proven transient. An unknown error that is retried repeatedly is less dangerous than a permanent error that retries indefinitely and delays the alert that would bring human attention.

A critical special case: 429 rate limit errors should be retried, but with a specific delay from the Retry-After header rather than generic exponential backoff. Using the server-specified delay respects the API's capacity planning and gives the best chance of success on retry.`,
          },
          {
            q: 'Q2. What is exponential backoff with jitter and why is jitter necessary?',
            a: `Exponential backoff is a retry strategy where the wait time between attempts grows exponentially: 1 second, 2 seconds, 4 seconds, 8 seconds, 16 seconds, up to a configured maximum. This gives the downstream system increasing time to recover between attempts rather than hammering it with immediate retries.

The formula is: delay = min(base_delay × 2^attempt, max_delay). Without jitter, every client that started retrying at the same time will retry at exactly the same delays — 1s, 2s, 4s, 8s — all in synchrony. This creates a thundering herd: a server that was briefly overloaded gets hit by 100 simultaneous retry requests at exactly T+1 second, then 100 more at T+2 seconds, then 100 more at T+4 seconds. The synchronised retries prevent the server from recovering.

Jitter introduces randomisation into the delay calculation. Full jitter selects a random value between 0 and the computed cap: delay = random(0, min(base × 2^attempt, max)). This desynchronises the retrying clients — each client independently chooses a random delay, so the 100 clients spread their retries evenly over the entire window rather than clustering at the same instant. The server receives a trickle of retries instead of a wave.

The practical impact is significant. Without jitter, 100 clients failing simultaneously create 100 requests at T+1s, T+2s, T+4s — peaks that can overwhelm a recovering service. With full jitter, those 100 retries are uniformly distributed over the window — the server sees roughly 50 requests per second instead of 100 requests at a single moment. Recovery becomes possible.

AWS's architecture blog originally popularised full jitter for distributed systems. For data engineering pipelines where multiple parallel consumers or pipeline instances might all hit the same API at the same time, full jitter is the correct strategy.`,
          },
          {
            q: 'Q3. What is a Dead Letter Queue, what should it contain, and how should it be monitored?',
            a: `A Dead Letter Queue is a quarantine for records that cannot be processed by the main pipeline — not a trash can, and not a permanent archive. The metaphor of quarantine is correct: records go there when they have a problem that prevents normal processing, but the intent is to investigate and resolve, not to permanently abandon them.

The DLQ should contain everything needed to understand why the record failed and to reprocess it correctly. That means the complete original raw record as received from the source, the specific error type and message that caused rejection, the pipeline name and run ID for correlation with pipeline logs, the source system's primary key to enable manual lookup in the source, the timestamp of rejection, and the reprocessing status (pending, reprocessed, discarded, escalated).

A database-backed DLQ table is better than a flat file for analytical pipelines because it is queryable. You can find the top rejection reasons, track DLQ counts over time, and run targeted reprocessing queries without parsing files.

Monitoring has two layers. First, per-run rate monitoring: calculate the rejection rate (DLQ count / total rows) after every pipeline run. Alert at a threshold — typically 5% rejection rate triggers a P1 alert, 1–5% triggers a P3 warning. A sudden spike in rejection rate often indicates a source schema change. Second, cumulative pending count monitoring: alert if the DLQ has more than a fixed number of unresolved pending records, which indicates a systemic issue that is not being addressed.

The closing of the loop is the most important part of DLQ design that is usually skipped. There must be a defined process: DLQ records are reviewed daily, root causes are identified, pipeline code or validation rules are updated to fix the root cause, and records are reprocessed using a dedicated reprocessing job. A DLQ that accumulates indefinitely without reprocessing is just delayed data loss.`,
          },
          {
            q: 'Q4. Describe the circuit breaker pattern. When would you use it in a data pipeline?',
            a: `A circuit breaker is a resilience pattern that stops sending requests to a failing downstream system when the failure rate exceeds a threshold. The name comes from electrical circuit breakers: when a circuit overloads, the breaker trips and cuts the circuit to prevent damage.

The circuit breaker has three states. Closed is normal operation — all requests pass through, failures are counted. Open is the tripped state — all requests fail immediately without even attempting the call, giving the downstream system time to recover without continued load pressure. Half-open is the test state — after a cooldown period, one probe request is allowed through. If the probe succeeds, the circuit closes and normal operation resumes. If it fails, the circuit opens again for another cooldown period.

In data engineering, circuit breakers are most valuable when a pipeline calls external services that can become temporarily unavailable: payment APIs, shipping APIs, geocoding services, CRM systems. Without a circuit breaker, a pipeline calling a temporarily down API keeps trying, consuming connection pool slots, creating timeout delays, and potentially cascading the failure to other parts of the pipeline. With a circuit breaker, once the API is clearly down, new requests fail immediately, the pipeline logs the circuit open state, and the circuit automatically tests recovery.

For internal services like databases, circuit breakers are less necessary because database connection pooling already provides similar protection. But for external third-party APIs where the pipeline has no visibility into the service's health — Razorpay, ShipFast, a vendor SFTP — a circuit breaker prevents 15 minutes of timeout waits from blocking an entire pipeline run.

The circuit breaker threshold should be tuned to the service's typical failure patterns. A service with occasional brief 503 errors during deploys should have a higher failure threshold (10 failures in 60 seconds) than a service with consistently high reliability where any failure is unusual.`,
          },
          {
            q: 'Q5. A pipeline processes 50,000 rows and one row causes an unhandled exception that crashes the entire pipeline. How do you redesign the error handling?',
            a: `The root cause is that the exception propagated from the row-processing logic all the way up to crash the pipeline. The correct redesign has three parts.

First, wrap row-level processing in a try-except that catches all expected error types and routes failures to the DLQ rather than propagating the exception. Instead of for row in rows: process(row) — which crashes on the first exception — the pattern is: for row in rows: try: result = process(row) except (ValueError, TypeError, KeyError) as e: dlq.write(row, str(e)); continue. The continue statement ensures processing resumes with the next row after a failure. The row goes to the DLQ with the full error context for later investigation.

Second, distinguish error types at the catch point. Data errors (ValueError, TypeError, KeyError, custom validation errors) should be caught at the row level and sent to the DLQ. Infrastructure errors (network timeouts, database connection failures) should propagate upward to be retried at the batch or pipeline level. Catching all exceptions at the row level and silently continuing would swallow infrastructure failures that indicate the entire pipeline needs to stop and retry.

Third, monitor the DLQ rate and set an appropriate circuit-breaking threshold. If 50% of rows are being sent to the DLQ, continuing to process the remaining 50% is not useful — the batch has a systemic problem (schema change, source data corruption) that requires investigation before any more processing. Add a check after each batch: if rejection_rate > 0.5, abort the pipeline and send a P1 alert rather than loading half-corrupted data to the destination.

The redesigned error flow: row-level data errors → DLQ (row processed, pipeline continues), infrastructure errors → retry with backoff (batch retried), high DLQ rate → abort and alert (pipeline stops, human investigates). This handles the three realistic failure scenarios correctly without either crashing on one bad row or silently continuing when the entire batch is corrupt.`,
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
            error: `Pipeline retries a 401 Unauthorized API response 5 times with exponential backoff — wastes 63 seconds before failing with the same error`,
            cause: 'The retry logic catches all HTTP errors without distinguishing transient from permanent. A 401 means the API credentials are wrong — this cannot be fixed by waiting and retrying. The credentials will be wrong on attempt 2, 3, 4, and 5 just as they were on attempt 1. Each retry just adds delay before the inevitable failure alert.',
            fix: 'Classify errors before retrying. 4xx errors (except 429) are permanent client errors that should fail immediately without retrying: if response.status_code in (400, 401, 403, 404, 405, 410, 422): response.raise_for_status() — no retry loop for these. Reserve retries for 429 (rate limit — wait and retry) and 5xx (server error — backoff and retry). The alert fires immediately on 401, an engineer rotates the credentials, and the pipeline resumes in minutes instead of wasting 63 seconds first.',
          },
          {
            error: `Circuit breaker never opens — service has been returning 503 for 10 minutes but the pipeline keeps creating new connections and timeouts`,
            cause: 'The circuit breaker is counting exceptions but the requests are timing out (requests.Timeout) rather than returning 503 responses. The circuit breaker was implemented to count only HTTP 503 status codes but not timeout exceptions. Timeouts never increment the failure counter.',
            fix: 'The circuit breaker must count all failure types, not just specific HTTP status codes. In the _on_failure method, count both HTTP error responses AND network exceptions (Timeout, ConnectionError). Alternatively, wrap the circuit breaker at a higher level that catches all exceptions from the function call rather than inside the HTTP response handling. Any exception that escapes the wrapped function increments the failure counter.',
          },
          {
            error: `DLQ file grows to 10 GB and fills the pipeline server disk — pipeline crashes with "No space left on device"`,
            cause: 'The DLQ is writing large raw records (each order row is ~2 KB including JSON serialisation) to a local NDJSON file. Over several weeks of accumulation — due to a recurring validation issue that was never investigated — 5 million rejected records fill the disk. The DLQ was designed as a file with no size limit, monitoring, or cleanup.',
            fix: 'Three changes: (1) Switch to a database-backed DLQ table — database storage is managed and monitored differently from local disk. (2) Add DLQ size monitoring: alert when pending_count > 100,000 records or when the DLQ table exceeds a size threshold. (3) Add automatic cleanup of resolved records: DELETE FROM pipeline.dead_letter_queue WHERE status IN (\'reprocessed\', \'discarded\') AND rejected_at < NOW() - INTERVAL \'30 days\'. For the immediate incident: free disk space with truncate -s 0 /data/dlq/*.ndjson (preserves the file but empties it) and fix the underlying validation issue.',
          },
          {
            error: `Retry logic creates duplicate records — the write succeeded on the first attempt but the response was not received due to a network timeout, causing the retry to insert the same row again`,
            cause: 'The write to the destination succeeded and committed, but the network connection was interrupted before the response was delivered to the pipeline. The pipeline saw a Timeout exception and retried the write, which inserted a second copy of the same row. This is the at-least-once delivery problem — timeouts on writes are ambiguous: the write may or may not have succeeded.',
            fix: 'Two complementary fixes. First, make the destination write idempotent: use ON CONFLICT (order_id) DO UPDATE so the retry upserts the same data as the first successful write rather than inserting a duplicate. Second, add a UNIQUE constraint on the business key so the conflict can actually be detected. With these in place, a timed-out write that is retried produces the same final state as a single successful write — the retry is harmless. For external API calls where idempotency keys are available, include the idempotency key in the request so the server also handles the duplicate gracefully.',
          },
          {
            error: `Alert fatigue — on-call engineers start ignoring Slack alerts because 90% of them resolve automatically within minutes`,
            cause: 'The alerting threshold is set to fire on every transient error, including ones that the retry logic handles successfully within 2 minutes. Engineers receive dozens of alerts per day that say "Pipeline Error" and then "Pipeline Recovered" immediately after. Over weeks, the alert channel becomes noise and real P1 alerts are missed in the flood.',
            fix: 'Implement tiered alerting. Only fire alerts for conditions that require human action: all retries exhausted and pipeline failed (not first retry), rejection rate exceeds threshold (systemic data quality issue), SLA deadline missed (data is actually stale for analysts), permanent errors like 401/403/schema mismatch (need human fix). Transient errors that resolve within the retry budget should be logged at WARNING level but not trigger alerts. Use a 5-minute resolution window: only alert if the condition persists for more than N minutes rather than alerting the instant it appears. This separates transient noise from real problems.',
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
        'Classify every error before deciding what to do: transient errors (network timeout, 5xx, 429, deadlock) should be retried with backoff. Permanent errors (401, 403, schema mismatch, disk full, bad credentials) should fail immediately and alert. Never retry a permanent error — it wastes time and delays the human intervention the error requires.',
        'Exponential backoff formula: delay = min(base × 2^attempt, max_delay). Attempt 1: ~1s, attempt 2: ~2s, attempt 3: ~4s, attempt 4: ~8s. Always add jitter. Full jitter selects a random value between 0 and the computed cap, spreading retries from multiple parallel clients evenly across the window and preventing thundering herds.',
        'Rate limit (429) responses require special handling: read the Retry-After header for the exact wait time instead of using exponential backoff. The API is telling you exactly how long to wait. Using a shorter generic backoff will result in another 429 immediately.',
        'The circuit breaker has three states: closed (normal operation), open (all requests fail immediately — service gets time to recover), half-open (one probe request allowed to test recovery). Use circuit breakers for external third-party APIs where repeated timeouts would waste pipeline execution time and add load to a failing service.',
        'A Dead Letter Queue is a quarantine, not a trash can. Store the complete raw record, the error type, the error message, the run ID, and the source key. Monitor pending DLQ counts. Alert at 5% rejection rate. Build a reprocessing job that can retry quarantined records after fixing the root cause.',
        'The DLQ rejection rate threshold determines alert urgency. Below 1%: normal DLQ activity, log only. 1–5%: P3 warning, investigate next business day. Above 5%: P1 alert, investigate immediately. Above 20%: abort the pipeline — the batch has a systemic problem.',
        'Handle errors at the right level. Row-level data errors (ValueError, invalid field) go to DLQ — catch them per row, continue processing. Infrastructure errors (connection timeout, 5xx) propagate up to the batch level for retry. High DLQ rate triggers pipeline abort rather than loading corrupted data.',
        'Alert quality is as important as alert quantity. A good alert contains: pipeline name and run ID, error message, data impact (how stale is the data), rows processed before failure, DLQ count, checkpoint position, diagnostic links to Airflow logs and Snowflake query history, and automated recovery status.',
        'Alert fatigue is a reliability risk. If engineers ignore alerts because 90% resolve automatically, real P1 incidents get missed. Only alert on conditions that require human action: all retries exhausted, SLA missed, permanent errors, high DLQ rate. Transient errors that resolve within the retry budget should be logged, not alerted.',
        'The four-tier alerting model: P1 (page immediately) — SLA breach, authentication failure, schema mismatch, 5% DLQ rate. P2 (investigate within 1 hour) — all retries exhausted, DLQ growing across consecutive runs. P3 (investigate within 24 hours) — single run failed but recovered, DLQ has new records. No alert — log only — transient errors that resolved, successful runs.',
      ]} />

    </LearnLayout>
  )
}