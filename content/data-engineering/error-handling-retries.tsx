import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
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
      section="Data Engineering — Module 27"
      readTime="70 min"
      updatedAt="August 2026"
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
          module builds every layer of it — classification, retries, circuit
          breakers, dead letter queues, and alerting — around one running
          example: FreshCart&rsquo;s payments ingestion pipeline.
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
          that would trigger human intervention.
        </Para>

        <SubSubTitle>The error taxonomy for data pipelines</SubSubTitle>

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
            { type: 'Auth failure (401)', examples: 'HTTP 401 Unauthorized', retry: '✗ No — credentials are wrong', action: 'Alert immediately. Do not retry — credentials will not fix themselves.' },
            { type: 'Forbidden (403)', examples: 'HTTP 403 Forbidden', retry: '✗ No — permissions issue', action: 'Alert immediately. Investigate permissions.' },
            { type: 'Not found (404)', examples: 'HTTP 404 Not Found', retry: '✗ No — resource does not exist', action: 'Log warning. Skip this record. The resource was deleted.' },
            { type: 'Schema mismatch', examples: 'Column "order_amount" does not exist, unexpected type', retry: '✗ No — structural issue', action: 'Alert immediately. Pipeline cannot proceed without schema fix.' },
            { type: 'Data validation failure', examples: 'NULL in required field, negative amount', retry: '✗ No — data is genuinely invalid', action: 'Write row to DLQ. Continue with rest of batch. Alert if DLQ rate high.' },
            { type: 'OOM / memory error', examples: 'MemoryError, Container OOMKilled', retry: '⚡ Maybe — with smaller batch size', action: 'Reduce batch size. If still OOM: alert — resource issue.' },
          ]}
        />

        <SubSubTitle>One classifier function, used everywhere</SubSubTitle>

        <CodeBox label="errors.py — classify_error() routes every exception to a handling strategy">{`import requests
import psycopg2

class ErrorClassification:
    RETRY_IMMEDIATELY = 'retry_immediately'   # retry at once (deadlock)
    RETRY_BACKOFF     = 'retry_backoff'       # retry after exponential backoff
    RETRY_AFTER_DELAY = 'retry_after_delay'   # retry after specific delay (rate limit)
    PERMANENT_FAILURE = 'permanent_failure'   # do not retry, alert
    ROW_LEVEL_FAILURE = 'row_level_failure'   # reject row to DLQ, continue


def classify_error(exc: Exception, response=None) -> tuple[str, str]:
    """Classify an exception into a handling category. Returns (classification, reason)."""

    if response is not None:
        status = response.status_code
        if status == 429:
            retry_after = response.headers.get('Retry-After', '60')
            return ErrorClassification.RETRY_AFTER_DELAY, f'Rate limited — Retry-After: {retry_after}s'
        if status in (500, 502, 503, 504):
            return ErrorClassification.RETRY_BACKOFF, f'Server error {status} — transient'
        if status == 401:
            return ErrorClassification.PERMANENT_FAILURE, 'Authentication failed (401) — check credentials'
        if status == 403:
            return ErrorClassification.PERMANENT_FAILURE, 'Forbidden (403) — check permissions'
        if status == 404:
            return ErrorClassification.ROW_LEVEL_FAILURE, 'Resource not found (404) — skip this record'
        if 400 <= status < 500:
            return ErrorClassification.PERMANENT_FAILURE, f'Client error {status} — fix request before retrying'

    if isinstance(exc, (requests.Timeout, requests.ConnectionError)):
        return ErrorClassification.RETRY_BACKOFF, f'Network error: {type(exc).__name__}'

    if isinstance(exc, psycopg2.errors.DeadlockDetected):
        return ErrorClassification.RETRY_IMMEDIATELY, 'Deadlock detected — retry transaction'
    if isinstance(exc, psycopg2.OperationalError):
        msg = str(exc).lower()
        if 'connection' in msg or 'timeout' in msg:
            return ErrorClassification.RETRY_BACKOFF, f'DB connection error: {exc}'
        return ErrorClassification.PERMANENT_FAILURE, f'DB operational error: {exc}'

    if isinstance(exc, (ValueError, TypeError, KeyError)):
        return ErrorClassification.ROW_LEVEL_FAILURE, f'Data error: {type(exc).__name__}: {exc}'

    if isinstance(exc, (AttributeError, ImportError, SyntaxError)):
        return ErrorClassification.PERMANENT_FAILURE, f'Code error (not data): {type(exc).__name__}: {exc}'

    if isinstance(exc, MemoryError):
        return ErrorClassification.PERMANENT_FAILURE, 'Out of memory — reduce batch size'

    # Unknown errors — fail safe, treat as permanent until proven transient
    return ErrorClassification.PERMANENT_FAILURE, f'Unknown error: {type(exc).__name__}: {exc}'`}</CodeBox>

        <Output>{`>>> classify_error(requests.Timeout())
('retry_backoff', 'Network error: Timeout')

>>> classify_error(ValueError('negative_order_amount: -50.0'))
('row_level_failure', 'Data error: ValueError: negative_order_amount: -50.0')

>>> classify_error(None, response=<Response [401]>)
('permanent_failure', 'Authentication failed (401) — check credentials')`}</Output>

        <TryThis>
          Add one more branch to <code>classify_error</code> for{' '}
          <code>json.JSONDecodeError</code> — is a response that fails to parse as
          JSON a row-level failure, a transient error, or a permanent one? Justify
          your answer before checking the Error Library at the end of this module.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 03 — Retry Strategies ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Retry Strategies" />
        <SectionTitle>Retry Strategies — From Fixed Interval to Exponential Backoff With Jitter</SectionTitle>

        <Para>
          Not all retries are equal. Retrying immediately, three times, makes
          things worse when the source system is under load — every retrying
          client resumes simultaneously, creating a thundering herd that
          overwhelms the already-struggling service. Exponential backoff spaces
          retries out; jitter desynchronises multiple parallel clients so they
          don&rsquo;t all retry at the same moment.
        </Para>

        <SubSubTitle>A reusable retry decorator</SubSubTitle>

        <CodeBox label="retry.py — exponential backoff with full jitter">{`import functools, logging, random, time
from typing import Callable, Type

log = logging.getLogger(__name__)

def retry_with_backoff(
    max_attempts: int = 5, base_delay_s: float = 1.0, max_delay_s: float = 60.0,
    jitter_factor: float = 0.25,
    retryable_exceptions: tuple[Type[Exception], ...] = (Exception,),
    non_retryable_exceptions: tuple[Type[Exception], ...] = (),
) -> Callable:
    """delay = min(base_delay * 2^attempt, max_delay) * (1 ± jitter_factor)"""
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except non_retryable_exceptions as exc:
                    log.error('Non-retryable error in %s (attempt %d/%d): %s',
                              func.__name__, attempt, max_attempts, str(exc))
                    raise
                except retryable_exceptions as exc:
                    if attempt == max_attempts:
                        log.error('All %d attempts exhausted for %s: %s',
                                  max_attempts, func.__name__, str(exc))
                        raise
                    raw_delay = min(base_delay_s * (2 ** (attempt - 1)), max_delay_s)
                    delay = max(0, raw_delay + raw_delay * jitter_factor * (2 * random.random() - 1))
                    log.warning('%s failed (attempt %d/%d): %s. Retrying in %.2fs',
                                func.__name__, attempt, max_attempts, str(exc), delay)
                    time.sleep(delay)
        return wrapper
    return decorator`}</CodeBox>

        <CodeBox label="Applying the decorator to an API call and a database write">{`@retry_with_backoff(
    max_attempts=5, base_delay_s=2.0,
    retryable_exceptions=(requests.Timeout, requests.ConnectionError),
    non_retryable_exceptions=(AuthenticationError, SchemaError),
)
def fetch_payments(from_ts: int, to_ts: int) -> dict:
    response = requests.get('https://api.stripe.com/v1/payments',
                             params={'from': from_ts, 'to': to_ts},
                             auth=HTTPBasicAuth(KEY_ID, KEY_SECRET), timeout=30)
    if response.status_code == 429:
        wait = float(response.headers.get('Retry-After', 60))
        raise RateLimitError(f'Rate limited — wait {wait}s')
    response.raise_for_status()
    return response.json()

@retry_with_backoff(max_attempts=3, base_delay_s=0.5,
    retryable_exceptions=(psycopg2.errors.DeadlockDetected, psycopg2.OperationalError))
def write_batch_to_db(rows: list[dict], conn) -> int:
    with conn:
        psycopg2.extras.execute_values(cur, UPSERT_SQL, rows)
    return len(rows)`}</CodeBox>

        <Output>{`WARNING fetch_payments failed (attempt 1/5): Timeout. Retrying in 2.14s
WARNING fetch_payments failed (attempt 2/5): Timeout. Retrying in 3.87s
INFO    fetch_payments succeeded on attempt 3`}</Output>

        <SubSubTitle>Rate limit handling — the Retry-After pattern</SubSubTitle>

        <CodeBox label="rate_limit.py — reading Retry-After correctly">{`from datetime import datetime, timezone
from email.utils import parsedate_to_datetime

def handle_rate_limit_response(response) -> float:
    """Retry-After can be an integer ("60") or an HTTP date string."""
    retry_after = response.headers.get('Retry-After')
    if not retry_after:
        return 30.0   # no header — conservative default
    try:
        return float(retry_after)
    except ValueError:
        pass
    try:
        wait = (parsedate_to_datetime(retry_after) - datetime.now(timezone.utc)).total_seconds()
        return max(0.0, wait)
    except Exception:
        return 30.0`}</CodeBox>

        <CodeBox label="Distinguishing 429 (controllable) from 5xx (server error) in one loop">{`def api_call_with_rate_limit_handling(url: str, params: dict, auth, max_retries: int = 5) -> dict:
    for attempt in range(1, max_retries + 1):
        response = requests.get(url, params=params, auth=auth, timeout=30)

        if response.status_code == 200:
            return response.json()
        elif response.status_code == 429:
            wait = handle_rate_limit_response(response) * (1.0 + random.uniform(0, 0.1))
            log.warning('Rate limited (attempt %d/%d) — waiting %.1fs', attempt, max_retries, wait)
            if attempt < max_retries:
                time.sleep(wait)
            else:
                response.raise_for_status()
        elif response.status_code in (500, 502, 503, 504):
            wait = min(2 ** attempt, 60) * (1 + random.uniform(-0.2, 0.2))
            log.warning('Server error %d (attempt %d/%d) — waiting %.1fs',
                        response.status_code, attempt, max_retries, wait)
            if attempt < max_retries:
                time.sleep(wait)
            else:
                response.raise_for_status()
        else:
            response.raise_for_status()   # 4xx other than 429 — do not retry`}</CodeBox>

        <Output>{`WARNING Rate limited (attempt 1/5) — waiting 61.8s
INFO    fetch_payments succeeded on attempt 2 after Retry-After delay`}</Output>

        <SubSubTitle>Jitter strategies — why randomisation matters</SubSubTitle>

        <Para>
          Without jitter, 100 pipeline instances failing at the same moment all
          retry at exactly the same delays — a wave of 100 requests at T+2s, then
          another wave at T+4s — making the recovering service&rsquo;s job harder, not
          easier. Jitter spreads the same 100 retries evenly across the window.
        </Para>

        <CodeBox label="Four jitter strategies compared">{`def compute_backoff_delay(attempt: int, base_s: float = 1.0, max_s: float = 60.0, strategy: str = 'full_jitter') -> float:
    cap = min(base_s * (2 ** attempt), max_s)
    if strategy == 'fixed':
        return cap                                    # no randomisation — thundering herd risk
    elif strategy == 'equal_jitter':
        return cap / 2 + random.uniform(0, cap / 2)   # moderate desynchronisation
    elif strategy == 'full_jitter':
        return random.uniform(0, cap)                 # AWS-recommended — max desynchronisation
    elif strategy == 'decorrelated':
        last = getattr(compute_backoff_delay, '_last', base_s)
        delay = min(random.uniform(base_s, last * 3), max_s)
        compute_backoff_delay._last = delay
        return delay
    return cap`}</CodeBox>

        <Output>{`100 clients, all failing at T=0, retrying with base=1s, max=60s:

fixed (no jitter):    all 100 retry at exactly T+2s, then all 100 at T+4s — a wave each time
full_jitter:          retries land uniformly across [0,2s], then [0,4s] — ~50 req/s, not 100 at once`}</Output>

        <Callout type="tip">
          Use <code>full_jitter</code> for multiple parallel pipeline instances
          hitting the same API. Use <code>decorrelated</code> for a single client
          retrying one sequential operation.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 — Circuit Breaker ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Circuit Breaker Pattern" />
        <SectionTitle>Circuit Breaker — Stop Hammering a Failing System</SectionTitle>

        <Para>
          Exponential backoff slows retries. A circuit breaker stops them entirely
          once a downstream system is clearly unavailable — like an electrical
          breaker that trips to cut power rather than let a circuit keep drawing
          current into a fault. Without one, a pipeline calling a failing API
          keeps trying, blocking threads and adding load to an already-struggling
          service.
        </Para>

        <SubSubTitle>Three states, one state machine</SubSubTitle>

        <CodeBox label="circuit_breaker.py — CLOSED → OPEN → HALF_OPEN → CLOSED">{`import threading, time
from enum import Enum

class CircuitState(Enum):
    CLOSED    = 'closed'     # normal operation — requests flow through
    OPEN      = 'open'       # tripped — requests fail immediately, no call made
    HALF_OPEN = 'half_open'  # testing recovery — one probe request allowed

class CircuitBreaker:
    def __init__(self, name: str, failure_threshold: int = 5, success_threshold: int = 2,
                 window_s: float = 60.0, cooldown_s: float = 30.0):
        self.name, self.failure_threshold, self.success_threshold = name, failure_threshold, success_threshold
        self.window_s, self.cooldown_s = window_s, cooldown_s
        self._state = CircuitState.CLOSED
        self._failure_times: list[float] = []
        self._half_open_success = 0
        self._opened_at: float | None = None
        self._lock = threading.Lock()

    @property
    def state(self) -> CircuitState:
        with self._lock:
            if self._state == CircuitState.OPEN:
                if self._opened_at and time.monotonic() - self._opened_at >= self.cooldown_s:
                    self._state, self._half_open_success = CircuitState.HALF_OPEN, 0
                    log.info('Circuit %s: OPEN → HALF_OPEN (cooldown elapsed)', self.name)
            return self._state`}</CodeBox>

        <SubSubTitle>Calling through the breaker, and recording the outcome</SubSubTitle>

        <CodeBox label="circuit_breaker.py — call(), _on_success(), _on_failure()">{`    def call(self, func, *args, **kwargs):
        if self.state == CircuitState.OPEN:
            raise CircuitOpenError(f'Circuit breaker {self.name} is OPEN — service unavailable')
        try:
            result = func(*args, **kwargs)
            self._on_success()
            return result
        except Exception:
            self._on_failure()
            raise

    def _on_success(self) -> None:
        with self._lock:
            if self._state == CircuitState.HALF_OPEN:
                self._half_open_success += 1
                if self._half_open_success >= self.success_threshold:
                    self._state, self._failure_times = CircuitState.CLOSED, []
                    log.info('Circuit %s: HALF_OPEN → CLOSED (service recovered)', self.name)
            elif self._state == CircuitState.CLOSED:
                now = time.monotonic()
                self._failure_times = [t for t in self._failure_times if now - t < self.window_s]

    def _on_failure(self) -> None:
        with self._lock:
            now = time.monotonic()
            if self._state == CircuitState.HALF_OPEN:
                self._state, self._opened_at = CircuitState.OPEN, now
                log.warning('Circuit %s: HALF_OPEN → OPEN (probe failed)', self.name)
                return
            self._failure_times = [t for t in self._failure_times if now - t < self.window_s] + [now]
            if len(self._failure_times) >= self.failure_threshold:
                self._state, self._opened_at = CircuitState.OPEN, now
                log.error('Circuit %s: CLOSED → OPEN (%d failures in %.0fs window)',
                          self.name, len(self._failure_times), self.window_s)

class CircuitOpenError(Exception):
    pass`}</CodeBox>

        <Output>{`ERROR Circuit stripe_api: CLOSED → OPEN (5 failures in 60s window)
# every call for the next 30s raises CircuitOpenError immediately — no network call made
INFO  Circuit stripe_api: OPEN → HALF_OPEN (cooldown elapsed)
INFO  Circuit stripe_api: HALF_OPEN → CLOSED (service recovered)`}</Output>

        <SubSubTitle>Wiring it into the pipeline</SubSubTitle>

        <CodeBox label="One circuit breaker per downstream service">{`stripe_circuit = CircuitBreaker(name='stripe_api', failure_threshold=5, cooldown_s=30.0)

def fetch_payments_safe(params: dict) -> dict:
    try:
        return stripe_circuit.call(requests.get, 'https://api.stripe.com/v1/payments',
                                    params=params, auth=HTTPBasicAuth(KEY_ID, KEY_SECRET), timeout=30)
    except CircuitOpenError:
        log.warning('Stripe API circuit is OPEN — skipping payment fetch this run')
        return {'items': [], 'cursor': None}`}</CodeBox>

        <Callout type="tip">
          Circuit breakers matter most for external third-party APIs where the
          pipeline has no visibility into the service&rsquo;s health — Stripe, a
          shipping API, a vendor SFTP. Internal database connections are usually
          already protected by connection pooling.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 — Dead Letter Queue Design ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Dead Letter Queue Design" />
        <SectionTitle>Dead Letter Queue — Not a Trash Can, a Quarantine</SectionTitle>

        <Para>
          A DLQ is where records go when they cannot be processed. The word
          &ldquo;queue&rdquo; is intentional — records are held with full context until a
          human investigates and decides whether to fix and reprocess, discard,
          or escalate. A DLQ with no context is useless; one nobody monitors
          accumulates forever; one with no reprocessing path is just delayed data loss.
        </Para>

        <SubSubTitle>The table — what to store</SubSubTitle>

        <CodeBox label="schema.sql — a queryable, database-backed DLQ">{`CREATE TABLE pipeline.dead_letter_queue (
    id              BIGSERIAL   PRIMARY KEY,
    pipeline_name   VARCHAR(100) NOT NULL,
    run_id          UUID        NOT NULL,
    error_type      VARCHAR(100) NOT NULL,   -- 'validation', 'transform', 'schema'
    error_message   TEXT        NOT NULL,
    raw_record      JSONB       NOT NULL,    -- the original record that failed
    source_key      VARCHAR(200),            -- primary key from source, for lookup
    rejected_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reprocess_count INTEGER     NOT NULL DEFAULT 0,
    status          VARCHAR(20) NOT NULL DEFAULT 'pending',
    -- pending | reprocessed | discarded | escalated
    resolution_note TEXT,
    CONSTRAINT chk_status CHECK (status IN ('pending','reprocessed','discarded','escalated'))
);

CREATE INDEX idx_dlq_pipeline_status ON pipeline.dead_letter_queue (pipeline_name, status, rejected_at);`}</CodeBox>

        <SubSubTitle>The writer</SubSubTitle>

        <CodeBox label="dlq.py — DLQWriter, with safe JSON serialisation">{`import json
from datetime import datetime, timezone

class DLQWriter:
    def __init__(self, pipeline_name: str, run_id: str, dest_conn):
        self.pipeline_name, self.run_id, self.dest_conn = pipeline_name, run_id, dest_conn
        self._count = 0

    def write(self, raw_record: dict, error_type: str, error_message: str, source_key: str | None = None) -> None:
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
                    (pipeline_name, run_id, error_type, error_message, raw_record, source_key)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (self.pipeline_name, self.run_id, error_type, error_message,
                  json.dumps(safe_record), source_key or str(raw_record.get('order_id', ''))))
        self.dest_conn.commit()
        self._count += 1
        log.warning('DLQ: %s — %s (total DLQ count: %d)', error_type, error_message[:100], self._count)

    @property
    def count(self) -> int:
        return self._count`}</CodeBox>

        <Output>{`WARNING DLQ: non_numeric_delivery_fee — 'N/A' (total DLQ count: 1)
WARNING DLQ: non_numeric_delivery_fee — 'N/A' (total DLQ count: 2)
...
WARNING DLQ: non_numeric_delivery_fee — 'N/A' (total DLQ count: 5400)`}</Output>

        <SubSubTitle>Monitoring queries</SubSubTitle>

        <CodeBox label="Daily summary and the most common rejection reasons">{`-- Daily DLQ summary per pipeline
SELECT pipeline_name, DATE(rejected_at) date, error_type,
       COUNT(*) dlq_count, COUNT(*) FILTER (WHERE status = 'pending') pending_count
FROM pipeline.dead_letter_queue
WHERE rejected_at > NOW() - INTERVAL '7 days'
GROUP BY 1, 2, 3 ORDER BY 2 DESC, 4 DESC;
-- ALERT: if pending_count > 100 for any pipeline today

-- Most common rejection reasons today
SELECT error_type, error_message, COUNT(*) count
FROM pipeline.dead_letter_queue
WHERE rejected_at::DATE = CURRENT_DATE AND status = 'pending'
GROUP BY 1, 2 ORDER BY 3 DESC LIMIT 20;`}</CodeBox>

        <SubSubTitle>Reprocessing — closing the loop</SubSubTitle>

        <Para>
          Run manually after fixing the root cause that caused the rejections —
          for example, a vendor changed a status value, so <code>VALID_STATUSES</code>{' '}
          was updated, and now every quarantined record needs a second attempt.
        </Para>

        <CodeBox label="dlq_reprocess.py — fetch, retry, and re-mark status">{`def reprocess_dlq_records(pipeline_name: str, error_type: str, dest_conn, dry_run: bool = True) -> dict:
    stats = {'attempted': 0, 'reprocessed': 0, 'failed_again': 0}

    with dest_conn.cursor() as cur:
        cur.execute("""
            SELECT id, raw_record FROM pipeline.dead_letter_queue
            WHERE pipeline_name = %s AND error_type = %s AND status = 'pending'
            ORDER BY rejected_at ASC LIMIT 10000
        """, (pipeline_name, error_type))
        records = cur.fetchall()
    log.info('Found %d DLQ records to reprocess (dry_run=%s)', len(records), dry_run)

    for dlq_id, raw_record_json in records:
        stats['attempted'] += 1
        raw_record = json.loads(raw_record_json)
        try:
            result = validate_row(raw_record)   # re-run with current (fixed) rules
            if not result.is_valid:
                if not dry_run:
                    mark_dlq(dlq_id, 'escalated', f'Still fails validation: {result.error}', dest_conn)
                stats['failed_again'] += 1
                continue
            if not dry_run:
                upsert_to_silver([project_to_dest_schema(enrich_order(result.row))], dest_conn)
                mark_dlq(dlq_id, 'reprocessed', 'Successfully reprocessed after fix', dest_conn)
            stats['reprocessed'] += 1
        except Exception as exc:
            log.error('Reprocessing failed for DLQ id %d: %s', dlq_id, str(exc))
            stats['failed_again'] += 1

    log.info('DLQ reprocessing complete: attempted=%d reprocessed=%d failed=%d',
             stats['attempted'], stats['reprocessed'], stats['failed_again'])
    return stats`}</CodeBox>

        <Output>{`$ python dlq_reprocess.py --pipeline vendor_reconciliation --error-type validation --dry-run false
INFO Found 5400 DLQ records to reprocess (dry_run=False)
INFO DLQ reprocessing complete: attempted=5400 reprocessed=5400 failed=0`}</Output>
      </section>

      <Divider />

      {/* ── Part 06 — Alerting Strategy ──────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Alerting Strategy" />
        <SectionTitle>Alerting — Signal, Not Noise</SectionTitle>

        <Para>
          An alert that fires on every transient error creates fatigue —
          engineers start ignoring alerts because most resolve themselves. An
          alert that fires only on complete pipeline failure misses degraded
          states where the pipeline runs but produces wrong data. The art is
          choosing thresholds that surface real problems while suppressing noise.
        </Para>

        <SubSubTitle>The four-tier alerting model</SubSubTitle>

        {[
          {
            tier: 'P1 — Immediate (page someone)',
            color: '#ff4757',
            conditions: [
              'Pipeline has not completed by SLA deadline (data is stale for analysts)',
              'Permanent error: authentication failure, schema mismatch, disk full',
              'DLQ count > 5% of processed rows in a single run',
              'Silver/Gold table row count dropped > 20% vs same weekday last week',
            ],
          },
          {
            tier: 'P2 — Investigate within 1 hour',
            color: '#f97316',
            conditions: [
              'Pipeline failed and all retries exhausted — no automatic recovery',
              'DLQ count growing over multiple consecutive runs (systemic issue)',
              'Run duration > 2× p95 historical duration (performance regression)',
              'Source system returning 5xx errors for > 5 consecutive minutes',
            ],
          },
          {
            tier: 'P3 — Investigate within 24 hours',
            color: '#facc15',
            conditions: [
              'Individual run failed but recovered automatically on retry',
              'DLQ has new records (review tomorrow morning)',
              'Run duration 1.5× slower than usual (trend to watch)',
            ],
          },
          {
            tier: 'No alert — log only',
            color: '#00e676',
            conditions: [
              'Single transient error that resolved on first retry',
              'Rate limit hit but recovered within allowed retry budget',
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

        <SubSubTitle>What separates a useless alert from an actionable one</SubSubTitle>

        <CodeBox label="A bad alert vs a good one">{`BAD:  Subject: Pipeline Error
      Body: An error occurred in the orders pipeline.
      → no context: what failed, what's the impact, where do I even look?

GOOD: Subject: [P1] orders_incremental pipeline FAILED — data stale since 06:00 UTC
      Pipeline:  orders_incremental (FreshCart Silver Layer)
      Error:     psycopg2.OperationalError: could not connect to server
      Impact:    Silver orders not updated since 06:00 UTC — SLA BREACHED
      Progress:  47,000 / 48,234 rows processed (97% complete before failure)
      Checkpoint: 05:59:47 UTC (saved at row 47,000)
      DLQ count: 12 rows (0.025% — normal)
      Links:     Airflow run · Snowflake history · DLQ query
      Next step: Airflow retries in 2 min (attempt 2 of 3); pages on-call if that fails too`}</CodeBox>

        <CodeBox label="format_alert() — generating the good version automatically">{`def format_alert(run: 'PipelineRun', error: Exception) -> str:
    return f"""
Pipeline: {run.pipeline_name}
Status: FAILED
Error: {type(error).__name__}: {error}
Impact: Data stale since {run.started_at.isoformat()} UTC
Run ID: {run.run_id}
Rows: {run.rows_written:,} written, {run.rows_rejected:,} rejected
DLQ: {run.dlq_count} records
Checkpoint: {load_watermark().isoformat()}
See: https://airflow.internal/dags/{run.pipeline_name}/
"""`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Error Handling in Airflow ──────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Airflow Error Handling" />
        <SectionTitle>Error Handling at the Orchestration Layer — Airflow</SectionTitle>

        <Para>
          The pipeline code handles row-level and request-level errors
          internally. The orchestration layer handles task-level and DAG-level
          failures — deciding when to retry, when to alert, and how failures
          propagate between dependent tasks.
        </Para>

        <SubSubTitle>Retry configuration and the SLA-miss callback</SubSubTitle>

        <CodeBox label="dags/orders_pipeline.py — default_args and an early warning before full failure">{`from datetime import timedelta

default_args = {
    'retries': 3, 'retry_delay': timedelta(minutes=2),
    'retry_exponential_backoff': True,           # delays: 2m, 4m, 8m
    'max_retry_delay': timedelta(minutes=30),
    'execution_timeout': timedelta(minutes=15),
    'email_on_failure': True, 'email_on_retry': False,   # don't spam on expected retries
    'email': ['data-team@freshcart.com'],
}

def sla_miss_callback(dag, task_list, blocking_task_list, slas, blocking_tis):
    """Fires when a task misses its SLA — a warning before it fully fails."""
    missed_tasks = [sla.task_id for sla in slas]
    send_slack_alert(channel='#data-alerts',
        message=f':warning: SLA MISS: tasks {missed_tasks} in DAG {dag.dag_id} exceeded their SLA.',
        urgency='warning')`}</CodeBox>

        <SubSubTitle>The failure callback — a rich, actionable Slack message</SubSubTitle>

        <CodeBox label="task_failure_callback() — pulls context from XCom before the alert">{`def task_failure_callback(context):
    dag_run, task, ti, exc = context['dag_run'], context['task'], context['task_instance'], context.get('exception')
    rows_written  = ti.xcom_pull(key='rows_written')  or 0
    rows_rejected = ti.xcom_pull(key='rows_rejected') or 0
    run_id        = ti.xcom_pull(key='pipeline_run_id') or 'unknown'

    message = f"""
*[P1] Pipeline FAILED — Manual Intervention Required*
*DAG:*  {dag_run.dag_id}   *Task:* {task.task_id}   *Run:* {dag_run.run_id}
*Error:* {type(exc).__name__}: {exc}

*Progress before failure:*
  Rows written:  {rows_written:,}
  Rows rejected: {rows_rejected:,}

*Actions:*
  • Check Airflow: {ti.log_url}
  • DLQ: SELECT * FROM pipeline.dead_letter_queue WHERE run_id='{run_id}'
"""
    send_slack_alert(channel='#data-oncall', message=message, urgency='critical')`}</CodeBox>

        <SubSubTitle>The success callback — catching a degraded state that still &ldquo;succeeded&rdquo;</SubSubTitle>

        <CodeBox label="task_success_callback() — a run can succeed and still deserve a warning">{`def task_success_callback(context):
    ti = context['task_instance']
    rows_written  = ti.xcom_pull(key='rows_written')  or 0
    rows_rejected = ti.xcom_pull(key='rows_rejected') or 0

    if rows_written + rows_rejected > 0:
        rejection_rate = rows_rejected / (rows_written + rows_rejected)
        if rejection_rate > 0.05:
            send_slack_alert(channel='#data-quality',
                message=f':warning: High DLQ rate in {ti.dag_id}: {rejection_rate:.1%} of rows rejected.',
                urgency='warning')

# Wired onto the task:
ingest = PythonOperator(
    task_id='ingest_orders', python_callable=run_pipeline,
    on_failure_callback=task_failure_callback,
    on_success_callback=task_success_callback,
    sla=timedelta(minutes=10),
)`}</CodeBox>

        <Output>{`# a run that "succeeds" but rejected 8% of rows still gets flagged:
WARNING High DLQ rate in orders_pipeline_incremental: 8.0% of rows rejected.
# the task shows green in the Airflow UI — this Slack message is the only
# signal that something's actually degraded`}</Output>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Five Misconceptions About Error Handling</SectionTitle>

        {[
          {
            wrong: '"Retrying more times is always safer than retrying fewer"',
            right: 'More attempts only help for genuinely transient failures — Part 02\'s classifier exists specifically because retrying a 401 five times just delays the alert five times longer while producing the identical failure each time. The number of attempts matters far less than getting the retry/no-retry decision right in the first place.',
          },
          {
            wrong: '"A circuit breaker and a retry decorator solve the same problem, so you only need one"',
            right: 'They operate at different scopes: retry logic decides what to do with ONE call\'s failure; a circuit breaker tracks failures ACROSS many calls over time and stops making new calls entirely once a threshold is crossed. Part 03 and Part 04 are meant to be layered — the circuit breaker\'s OPEN state is what actually protects a failing service from a fleet of individually-retrying clients.',
          },
          {
            wrong: '"If the pipeline logs the error, that counts as handling it"',
            right: 'A logged-and-swallowed exception with no DLQ write and no re-raise is indistinguishable, later, from data that was silently dropped — Part 05 exists because a log line nobody is actively watching is not a recovery mechanism, and this module\'s Common Mistakes below has the exact except: pass pattern that causes this.',
          },
          {
            wrong: '"Once alerting exists, more alerts is strictly better than fewer"',
            right: 'Part 06\'s four-tier model is built around the opposite idea: alerting on every transient error (Part 03\'s retries handle those automatically) trains engineers to ignore the alert channel, which is exactly the alert-fatigue failure documented in this module\'s Error Library. An alert that fires and nobody reads is worse than no alert at all.',
          },
          {
            wrong: '"A 500 error and a 400 error are both just \'the request failed\' — handle them the same way"',
            right: 'A 500 is the server\'s problem and often resolves on its own; a 400 is the request\'s problem and will fail identically forever until the request itself changes. Part 02\'s taxonomy exists precisely because collapsing these into one "request failed" bucket is what causes Q1 of this module\'s Interview Prep and the very first Error Library entry.',
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

      {/* ── Part 09 — Real World ──────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 09 — Real World" />
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
            Every Monday, a logistics partner sends a CSV with 180,000 delivery
            records for the previous week. This week&rsquo;s file has 5,400 rows where{' '}
            <code>delivery_fee</code> contains the string &ldquo;N/A&rdquo; instead of a
            decimal — a data entry issue on the vendor&rsquo;s side. Without proper
            error handling, the pipeline would crash on the first invalid row and
            page the on-call engineer at 06:15 AM.
          </Para>

          <CodeBox label="Execution log — 3% bad rows, zero downtime">{`06:00:14 INFO  Loaded 180,000 rows from ShipFast weekly report
06:00:18 WARNING  non_numeric_delivery_fee: 'N/A' (source_key=SFD_001847) → DLQ (count: 1)
06:00:18 INFO  [continues processing without stopping]
06:04:22 INFO  Batch 1 complete: 5000 rows (47 rejected → DLQ)
...
06:18:44 INFO  Batch 36 complete: 5000 rows (150 rejected → DLQ)
06:18:47 WARNING  DLQ count: 5,400 rows (3.0%) — threshold 5.0% — within range
06:18:49 INFO  Pipeline complete: 174,600/180,000 loaded, duration=18m37s, SUCCESS

# P3 alert sent (no P1 — below the 5% threshold):
📋 [P3] vendor_reconciliation: 5,400 rows in DLQ (3.0%)`}</CodeBox>

          <CodeBox label="Monday morning — root cause found and reprocessed in minutes">{`-- Data engineer reviews the DLQ:
SELECT error_message, COUNT(*) FROM pipeline.dead_letter_queue
WHERE run_id = 'def456' AND status = 'pending' GROUP BY 1;
-- non_numeric_delivery_fee: 'N/A'   5,400

# Root cause: vendor sends "N/A" for NULL delivery fees (cash-on-delivery orders)
# Fix: treat "N/A" as 0 in the delivery_fee parser, then reprocess:
$ python dlq_reprocess.py --pipeline vendor_reconciliation --error-type validation --dry-run false`}</CodeBox>

          <Output>{`DLQ reprocessing complete: attempted=5400 reprocessed=5400 failed=0
All 5,400 rows successfully loaded to silver.vendor_deliveries`}</Output>

          <Para>
            Row-level validation errors went to the DLQ without stopping the
            pipeline. 97% of valid rows loaded on time. The DLQ count stayed
            below the P1 threshold, so no one was paged at 6 AM — the root cause
            was found and reprocessed inside ten minutes on Monday morning.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Interview Prep ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. How do you decide whether to retry an error or fail immediately? Walk me through your classification system.',
            a: `The core principle is simple: transient errors should be retried, permanent errors should fail immediately and alert. The classification determines everything about how the pipeline responds.

Transient errors are failures where the same request would likely succeed if tried again — the underlying cause is temporary and will resolve without code changes. Network timeouts, HTTP 503 service unavailable, 502 bad gateway, database connection timeouts, and HTTP 429 rate limit responses all fall here. A Stripe API returning 503 during a deploy will return 200 seconds later. A database returning a connection timeout during peak load will accept connections a minute later. For these, retry with exponential backoff and jitter.

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

For internal services like databases, circuit breakers are less necessary because database connection pooling already provides similar protection. But for external third-party APIs where the pipeline has no visibility into the service's health — Stripe, ShipFast, a vendor SFTP — a circuit breaker prevents 15 minutes of timeout waits from blocking an entire pipeline run.

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

      {/* ── Common Mistakes ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Catching every exception at the row level with except Exception: pass',
            a: 'This swallows infrastructure failures — a database connection drop looks identical to one bad row, so the pipeline silently "succeeds" while quietly failing to write most of its data. Part 02\'s classifier exists so row-level and infrastructure-level exceptions are caught separately and handled differently, never with one blanket except.',
          },
          {
            q: 'Retrying without any backoff — just calling the function again in a tight loop',
            a: 'A tight retry loop against a struggling service is the thundering-herd problem at its worst — no time given for recovery, and CPU spent spinning instead of waiting. Part 03\'s retry_with_backoff exists specifically to replace "try again immediately" with a delay that actually gives the downstream system a chance.',
          },
          {
            q: 'Writing to the DLQ but never actually looking at it',
            a: 'A DLQ nobody queries is functionally the same as silently dropping the data — Part 05\'s entire "closing the loop" section exists because the reprocessing step is the part that\'s usually skipped. Set up the daily monitoring query before the first record ever lands in the table.',
          },
          {
            q: 'Setting an alert threshold once and never revisiting it as the pipeline\'s scale changes',
            a: 'A 5% DLQ threshold tuned for a 2,000-row pipeline means 100 bad rows trip a P1 page; the same threshold on a pipeline that grew to 500,000 rows means 25,000 bad rows before anyone is paged. Revisit alert thresholds whenever the underlying data volume changes meaningfully.',
          },
          {
            q: 'Assuming a circuit breaker replaces the need for retries, or vice versa',
            a: 'They solve different problems at different scopes — retries handle one call\'s transient failure, the circuit breaker stops an entire fleet of calls once a service is clearly down. Part 04\'s pattern is meant to wrap calls that are ALSO individually retried; using only one of the two leaves a gap the other was built to cover.',
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


      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 28 covers pipeline orchestration — what a scheduler actually does, how DAGs model dependencies, what backfill means and why it is hard, and the design decisions that determine how maintainable an orchestration layer is.
        </p>
        <Link href="/learn/data-engineering/pipeline-orchestration" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 28 → Pipeline Orchestration — What a Scheduler Does
        </Link>
      </div>
    </LearnLayout>
  )
}
