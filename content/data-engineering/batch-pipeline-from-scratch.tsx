import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Building a Batch Pipeline From Scratch — Data Engineering | Chaduvuko',
  description:
    'Build a complete, production-grade batch pipeline from zero — requirements to deployment. Schema validation, chunked extraction, transformation logic, upserts, observability, testing, and scheduling.',
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

export default function BatchPipelineFromScratchModule() {
  return (
    <LearnLayout
      title="Building a Batch Pipeline From Scratch"
      description="From requirements to production deployment — schema validation, chunked extraction, transformation, upserts, observability, testing, and scheduling."
      section="Data Engineering — Module 25"
      readTime="85 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 — What We Are Building ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What We Are Building" />
        <SectionTitle>A Complete Pipeline, Built the Right Way</SectionTitle>

        <Para>
          Previous modules covered the theory — ingestion patterns, design principles,
          idempotency, observability. This module applies all of it to one concrete
          task: building a production-grade incremental pipeline for FreshCart&rsquo;s
          orders table, from scratch, one module at a time, explaining every decision
          along the way.
        </Para>

        <Para>
          By the end of this module you will have a complete, deployable pipeline
          with chunked extraction, schema validation, row-level error handling, upsert
          loading, structured observability, a test suite, and a cron/Airflow schedule.
          Every component is explained — not just shown.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 14,
          }}>
            The pipeline we will build
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { label: 'Source', value: 'PostgreSQL replica — FreshCart orders table (500M rows)', color: '#4285f4' },
              { label: 'Pattern', value: 'Incremental high-watermark — updated_at based', color: '#7b61ff' },
              { label: 'Schedule', value: 'Every 15 minutes via Airflow', color: '#f97316' },
              { label: 'Destination', value: 'Snowflake — silver.orders table', color: '#00add4' },
              { label: 'Load mode', value: 'Upsert — MERGE (order_id) WHEN MATCHED THEN UPDATE', color: '#00e676' },
              { label: 'SLA', value: 'Data no older than 20 minutes at all times', color: '#facc15' },
            ].map((item) => (
              <div key={item.label} style={{
                borderLeft: `3px solid ${item.color}`,
                paddingLeft: 12,
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: item.color,
                  fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                  textTransform: 'uppercase', marginBottom: 3,
                }}>{item.label}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <CodeBox label="Project structure — everything we will build">{`orders_pipeline/
├── pipeline/
│   ├── __init__.py
│   ├── config.py           # Configuration — loaded from env vars
│   ├── extract.py          # Extraction — chunked, watermark-based
│   ├── transform.py        # Transformation — pure functions, no I/O
│   ├── validate.py         # Validation — schema + business rules
│   ├── load.py             # Loading — upsert to Snowflake
│   ├── checkpoint.py       # Checkpoint — atomic read/write
│   ├── observability.py    # Logging + metrics + run table writes
│   └── main.py             # Entrypoint — orchestrates everything
├── tests/
│   ├── test_transform.py   # Unit tests — pure function coverage
│   ├── test_validate.py    # Unit tests — validation logic
│   └── test_integration.py # Integration tests — with test DB
├── dags/
│   └── orders_pipeline_dag.py  # Airflow DAG definition
├── requirements.txt
└── Dockerfile`}</CodeBox>

        <TryThis>
          Before reading any further, sketch your own version of this file tree for
          a pipeline you&rsquo;ve worked with (or one you can imagine — a weather API
          into a warehouse, a CSV drop into a lake). Naming one file per
          responsibility, before writing a line of code, is what keeps a pipeline
          maintainable a year later.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 02 — Configuration ───────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Configuration" />
        <SectionTitle>Configuration — From Environment, Validated at Startup</SectionTitle>

        <Para>
          Configuration is the first thing to get right. Every value that differs
          between environments (dev, staging, production) must come from an
          environment variable — never hardcoded. Pydantic validates the config
          at startup, ensuring the pipeline fails immediately with a clear error
          if a required variable is missing, rather than failing mid-run with a
          cryptic attribute error.
        </Para>

        <CodeBox label="pipeline/config.py — validated configuration from environment">{`from pydantic_settings import BaseSettings
from pydantic import Field, field_validator
from typing import Literal
from pathlib import Path


class PipelineConfig(BaseSettings):
    """All configuration loaded from environment variables.
    Pydantic validates types and required fields at import time."""

    # ── Source database ────────────────────────────────────────────────────────
    source_db_url: str = Field(..., description='PostgreSQL connection string — read replica only')
    source_schema: str = Field(default='public')
    source_table:  str = Field(default='orders')

    # ── Destination ────────────────────────────────────────────────────────────
    dest_db_url:    str = Field(..., description='Snowflake connection string')
    dest_schema:    str = Field(default='silver')
    dest_table:     str = Field(default='orders')

    # ── Extraction ─────────────────────────────────────────────────────────────
    batch_size:          int = Field(default=50_000,  ge=1_000, le=500_000)
    overlap_minutes:     int = Field(default=5,       ge=0,     le=60)
    # overlap_minutes: extend the lower bound back by this many minutes
    # to catch rows that arrive late in the source due to clock skew.

    # ── Checkpoint / DLQ / Observability ──────────────────────────────────────
    checkpoint_dir:     Path = Field(default=Path('/data/checkpoints'))
    dlq_dir:            Path = Field(default=Path('/data/dlq'))
    log_level:          Literal['DEBUG', 'INFO', 'WARNING', 'ERROR'] = 'INFO'
    pipeline_run_table: str  = Field(default='monitoring.pipeline_runs')
    environment:        Literal['development', 'staging', 'production'] = 'development'

    @field_validator('source_db_url')
    @classmethod
    def must_not_be_primary(cls, v: str) -> str:
        # Guard against accidentally connecting to the primary
        if 'primary' in v.lower() and 'replica' not in v.lower():
            raise ValueError(
                'source_db_url appears to point to a primary. '
                'Connect to a read replica to protect production performance.'
            )
        return v

    @field_validator('checkpoint_dir', 'dlq_dir')
    @classmethod
    def ensure_dir_exists(cls, v: Path) -> Path:
        v.mkdir(parents=True, exist_ok=True)
        return v

    class Config:
        env_prefix = 'ORDERS_PIPELINE_'
        # ORDERS_PIPELINE_SOURCE_DB_URL=postgresql://...
        # ORDERS_PIPELINE_DEST_DB_URL=snowflake://...
        # ORDERS_PIPELINE_BATCH_SIZE=100000


config = PipelineConfig()   # singleton — imported by every pipeline module`}</CodeBox>

        <Output>{`$ python -m pipeline.main --date 2026-08-20
pydantic_core._pydantic_core.ValidationError: 1 validation error for PipelineConfig
source_db_url
  Field required [type=missing, input_value={...}, input_type=dict]

# fails on the very first line, naming the exact missing variable —
# not three functions deep during the 2 AM run`}</Output>

        <Callout type="tip">
          The <code>must_not_be_primary</code> validator is a small but real guard
          rail: a data engineer who copy-pastes the wrong connection string into
          <code>ORDERS_PIPELINE_SOURCE_DB_URL</code> finds out at startup, in plain
          English, instead of finding out from a page from the on-call DBA an hour
          later.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 — Checkpoint ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Checkpoint" />
        <SectionTitle>Checkpoint — Atomic, Crash-Safe Watermark Persistence</SectionTitle>

        <Para>
          The checkpoint is the pipeline&rsquo;s memory of where it left off. It must
          be written atomically — a crash during checkpoint write should leave
          the previous checkpoint intact, not a corrupted half-written file.
          It must be read defensively — a missing or corrupt checkpoint should
          start from a safe default, not crash the pipeline.
        </Para>

        <SubSubTitle>Loading the watermark — defensively</SubSubTitle>

        <CodeBox label="pipeline/checkpoint.py — reading the watermark">{`import json
import logging
from datetime import datetime, timezone
from pathlib import Path

from .config import config

log = logging.getLogger(__name__)
CHECKPOINT_FILE = config.checkpoint_dir / 'orders_watermark.json'


def load_watermark() -> datetime:
    """Load the watermark from the last successful run.
    Returns a safe default if no checkpoint exists or it is corrupt."""
    if not CHECKPOINT_FILE.exists():
        default = datetime(2020, 1, 1, tzinfo=timezone.utc)
        log.info('No checkpoint found — starting from default: %s', default.isoformat())
        return default

    try:
        data = json.loads(CHECKPOINT_FILE.read_text())
        wm = datetime.fromisoformat(data['watermark'])
        log.info('Loaded watermark: %s', wm.isoformat())
        return wm
    except (json.JSONDecodeError, KeyError, ValueError) as e:
        # Corrupt checkpoint — do not crash, start fresh and alert
        log.warning('Corrupt checkpoint file: %s — starting from default', str(e))
        _archive_corrupt_checkpoint()
        return datetime(2020, 1, 1, tzinfo=timezone.utc)`}</CodeBox>

        <Output>{`INFO Loaded watermark: 2026-08-20T02:45:00+00:00
# on a fresh deploy with no checkpoint file yet:
INFO No checkpoint found — starting from default: 2020-01-01T00:00:00+00:00`}</Output>

        <SubSubTitle>Saving the watermark — atomically, and archiving corruption</SubSubTitle>

        <CodeBox label="pipeline/checkpoint.py — writing the watermark">{`def save_watermark(watermark: datetime) -> None:
    """Save the watermark using write-then-rename.
    If the process is killed mid-write, the previous checkpoint is preserved."""
    payload = {
        'watermark': watermark.isoformat(),
        'saved_at':  datetime.now(timezone.utc).isoformat(),
        'pipeline':  'orders_incremental',
    }
    tmp = CHECKPOINT_FILE.with_suffix('.tmp')
    tmp.write_text(json.dumps(payload, indent=2))
    tmp.rename(CHECKPOINT_FILE)   # atomic on POSIX; near-atomic on Windows
    log.info('Checkpoint saved: %s', watermark.isoformat())


def _archive_corrupt_checkpoint() -> None:
    """Move a corrupt checkpoint to a dated archive rather than deleting it."""
    stamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    archive_path = CHECKPOINT_FILE.with_suffix(f'.corrupt.{stamp}')
    CHECKPOINT_FILE.rename(archive_path)
    log.warning('Archived corrupt checkpoint to: %s', str(archive_path))`}</CodeBox>

        <Output>{`INFO Checkpoint saved: 2026-08-20T03:00:12+00:00
# if the process is killed between tmp.write_text() and tmp.rename():
# CHECKPOINT_FILE still contains the PREVIOUS valid watermark —
# the half-written .tmp file is simply ignored on the next run`}</Output>
      </section>

      <Divider />

      {/* ── Part 04 — Extraction ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Extraction" />
        <SectionTitle>Extraction — Chunked, Memory-Safe, Source-Respectful</SectionTitle>

        <Para>
          A 500-million-row orders table receives around 200,000 updates per
          day. Each 15-minute incremental run extracts roughly 2,000 rows.
          But on a bad day — pipeline down for 3 hours, source writes catching up —
          a single run might need to process 40,000 rows. The extraction layer
          must handle both cases without blowing memory or holding long-lived
          database connections.
        </Para>

        <SubSubTitle>Reading the clock from the source, never the pipeline server</SubSubTitle>

        <CodeBox label="pipeline/extract.py — connection and clock helpers">{`import logging
from datetime import datetime, timezone, timedelta
from typing import Iterator

import psycopg2
import psycopg2.extras

from .config import config
from .checkpoint import load_watermark

log = logging.getLogger(__name__)

EXTRACT_COLUMNS = [
    'order_id', 'customer_id', 'store_id', 'restaurant_id',
    'order_amount', 'delivery_fee', 'discount_amount',
    'status', 'payment_method', 'payment_status',
    'created_at', 'updated_at', 'delivered_at', 'cancelled_at',
    'cancellation_reason', 'promo_code', 'notes',
]

EXTRACT_SQL = f"""
    SELECT {', '.join(EXTRACT_COLUMNS)}
    FROM {config.source_schema}.{config.source_table}
    WHERE updated_at > %s AND updated_at <= %s
    ORDER BY updated_at ASC, order_id ASC
"""


def get_source_now(conn) -> datetime:
    """Get current time from the SOURCE database, not this server —
    prevents clock skew between the pipeline host and the source DB."""
    with conn.cursor() as cur:
        cur.execute("SELECT NOW() AT TIME ZONE 'UTC'")
        return cur.fetchone()[0].replace(tzinfo=timezone.utc)


def get_source_connection():
    """Read-only connection with a query timeout — never touches the primary.

    autocommit is deliberately OFF. extract_changed_rows() below opens a
    NAMED (server-side) cursor, and psycopg2 named cursors are transaction-
    scoped — the implicit DECLARE CURSOR needs an open transaction to stay
    alive across repeated fetchmany() calls. Under autocommit=True that
    transaction closes immediately, and the cursor is gone before the next
    fetchmany() runs (surfaces as "cursor does not exist")."""
    conn = psycopg2.connect(
        config.source_db_url,
        options='-c statement_timeout=300000',   # 5-minute statement timeout
    )
    conn.set_session(readonly=True, autocommit=False)
    return conn`}</CodeBox>

        <SubSubTitle>Streaming changed rows with a server-side cursor</SubSubTitle>

        <CodeBox label="pipeline/extract.py — the chunked extraction generator">{`def extract_changed_rows(conn) -> Iterator[tuple[list[dict], datetime, datetime]]:
    """Extract rows changed since the last watermark, in batches.
    Yields (batch_rows, batch_since, batch_until) tuples.

    A server-side cursor means PostgreSQL streams rows to us in batches —
    the full result set is never loaded into memory at once. Total memory
    usage is O(batch_size) regardless of how many rows actually changed."""
    since_raw = load_watermark()
    until     = get_source_now(conn)
    since     = since_raw - timedelta(minutes=config.overlap_minutes)

    log.info('Extracting rows updated %s → %s (overlap: %d min)',
             since.isoformat(), until.isoformat(), config.overlap_minutes)

    cursor_name = 'orders_extract_cursor'
    with conn.cursor(cursor_name, cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute(EXTRACT_SQL, (since, until))

        batch_num, total_rows = 0, 0
        while True:
            rows = cur.fetchmany(config.batch_size)
            if not rows:
                break
            batch_num  += 1
            batch       = [dict(row) for row in rows]
            total_rows += len(batch)
            log.info('Extracted batch %d: %d rows (total so far: %d)',
                      batch_num, len(batch), total_rows)
            yield batch, since_raw, until

    log.info('Extraction complete: %d batches, %d total rows', batch_num, total_rows)`}</CodeBox>

        <Output>{`INFO Extracting rows updated 2026-08-20T02:40:00+00:00 → 2026-08-20T03:00:12+00:00 (overlap: 5 min)
INFO Extracted batch 1: 1,842 rows (total so far: 1,842)
INFO Extraction complete: 1 batches, 1,842 rows`}</Output>

        <TryThis>
          Change <code>config.overlap_minutes</code> from 5 to 60 in your head and
          predict what happens to <code>rows_extracted</code> on the very next run.
          The Error Library at the end of this module has an entry for exactly this
          misconfiguration — check your prediction against it.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 05 — Validation ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Validation" />
        <SectionTitle>Validation — Catch Bad Data Before It Reaches the Warehouse</SectionTitle>

        <Para>
          Validation runs on every row before transformation. Invalid rows go
          to the Dead Letter Queue — a file where they can be inspected, fixed,
          and reprocessed — rather than crashing the pipeline or silently
          corrupting the destination. The validation logic is a pure function
          with no I/O: easy to unit test exhaustively.
        </Para>

        <SubSubTitle>The row-level validation function</SubSubTitle>

        <CodeBox label="pipeline/validate.py — validate_row()">{`import json
import logging
from datetime import datetime, timezone
from decimal import Decimal, InvalidOperation
from typing import NamedTuple

log = logging.getLogger(__name__)

VALID_STATUSES = frozenset({
    'placed', 'confirmed', 'preparing', 'ready',
    'picked_up', 'delivering', 'delivered', 'cancelled',
})
VALID_PAYMENT_METHODS = frozenset({
    'credit_card', 'debit_card', 'paypal', 'apple_pay', 'gift_card',
})


class ValidationResult(NamedTuple):
    is_valid: bool
    row:      dict | None   # cleaned row if valid, None if invalid
    error:    str | None    # error description if invalid


def validate_row(raw: dict) -> ValidationResult:
    """Validate and lightly normalise one order row.
    Pure function: no I/O, fully deterministic, easy to test."""

    if not raw.get('order_id'):
        return ValidationResult(False, None, 'missing_order_id')
    if not raw.get('customer_id'):
        return ValidationResult(False, None, f'missing_customer_id for order {raw["order_id"]}')

    raw_amount = raw.get('order_amount')
    if raw_amount is None:
        return ValidationResult(False, None, f'null_order_amount for order {raw["order_id"]}')
    try:
        amount = Decimal(str(raw_amount))
    except InvalidOperation:
        return ValidationResult(False, None,
            f'non_numeric_order_amount: {raw_amount!r} for order {raw["order_id"]}')
    if amount < 0:
        return ValidationResult(False, None,
            f'negative_order_amount: {amount} for order {raw["order_id"]}')
    if amount > Decimal('500000'):
        return ValidationResult(False, None,
            f'suspiciously_large_amount: {amount} for order {raw["order_id"]}')

    raw_status = raw.get('status', '')
    status = str(raw_status).lower().strip() if raw_status else ''
    if status not in VALID_STATUSES:
        return ValidationResult(False, None,
            f'invalid_status: {raw_status!r} for order {raw["order_id"]}')

    created_at = raw.get('created_at')
    updated_at = raw.get('updated_at')
    if not created_at or not updated_at:
        return ValidationResult(False, None, f'missing_timestamp for order {raw["order_id"]}')
    if hasattr(updated_at, 'tzinfo') and hasattr(created_at, 'tzinfo'):
        if updated_at < created_at:
            return ValidationResult(False, None,
                f'updated_at before created_at for order {raw["order_id"]}')

    payment_method = raw.get('payment_method')
    if payment_method is not None:
        norm_method = str(payment_method).lower().strip()
        if norm_method not in VALID_PAYMENT_METHODS:
            # Non-fatal: log but accept the row (new payment methods get added)
            log.warning('Unknown payment_method %r for order %s', payment_method, raw['order_id'])
            norm_method = 'unknown'
    else:
        norm_method = None

    clean = {
        'order_id':            int(raw['order_id']),
        'customer_id':         int(raw['customer_id']),
        'store_id':            str(raw.get('store_id') or ''),
        'restaurant_id':       raw.get('restaurant_id'),
        # Money stays Decimal all the way to storage — converting to float
        # here would silently reintroduce the binary floating-point rounding
        # error this function just parsed order_amount as Decimal to avoid.
        # (See Part 07: the destination column is NUMBER(10,2), not FLOAT,
        # specifically so this precision survives into Snowflake.)
        'order_amount':        amount,
        'delivery_fee':        Decimal(str(raw.get('delivery_fee') or 0)),
        'discount_amount':     Decimal(str(raw.get('discount_amount') or 0)),
        'status':              status,
        'payment_method':      norm_method,
        'payment_status':      (raw.get('payment_status') or '').lower() or None,
        'created_at':          created_at,
        'updated_at':          updated_at,
        'delivered_at':        raw.get('delivered_at'),
        'cancelled_at':        raw.get('cancelled_at'),
        'cancellation_reason': raw.get('cancellation_reason'),
        'promo_code':          raw.get('promo_code'),
        'ingested_at':         datetime.now(timezone.utc),
    }
    return ValidationResult(True, clean, None)`}</CodeBox>

        <Output>{`>>> validate_row({'order_id': 9284751, 'customer_id': 4201938, 'order_amount': '380.00',
...               'status': 'DELIVERED ', 'created_at': ..., 'updated_at': ...})
ValidationResult(is_valid=True, row={'order_id': 9284751, ..., 'status': 'delivered'}, error=None)

>>> validate_row({'order_id': 9284752, 'customer_id': 1, 'order_amount': -50.0, ...})
ValidationResult(is_valid=False, row=None, error='negative_order_amount: -50.0 for order 9284752')`}</Output>

        <SubSubTitle>Dead letter queue and batch-level validation</SubSubTitle>

        <CodeBox label="pipeline/validate.py — DLQWriter and validate_batch()">{`from pathlib import Path
from .config import config

class DLQWriter:
    """Writes invalid rows to a NDJSON dead letter queue file."""

    def __init__(self, run_id: str):
        self.path = config.dlq_dir / f'orders_{run_id}.ndjson'
        self._count = 0

    def write(self, raw_row: dict, error: str) -> None:
        with open(self.path, 'a') as f:
            f.write(json.dumps({
                'error':       error,
                'row':         {k: str(v) for k, v in raw_row.items()},
                'rejected_at': datetime.now(timezone.utc).isoformat(),
            }) + '\\n')
        self._count += 1

    @property
    def count(self) -> int:
        return self._count


def validate_batch(raw_rows: list[dict], dlq: DLQWriter) -> list[dict]:
    """Validate a batch. Returns only valid rows. Writes invalid rows to the DLQ.
    Never raises — every error is handled per-row."""
    valid_rows = []
    for raw in raw_rows:
        result = validate_row(raw)
        if result.is_valid:
            valid_rows.append(result.row)
        else:
            dlq.write(raw, result.error)

    rejection_rate = 1 - len(valid_rows) / max(len(raw_rows), 1)
    if rejection_rate > 0.05:
        log.warning('High rejection rate: %.1f%% (%d of %d rows rejected)',
                     rejection_rate * 100, dlq.count, len(raw_rows))

    return valid_rows`}</CodeBox>

        <Output>{`WARNING High rejection rate: 12.3% (34 of 277 rows rejected)
# 12.3% clears the 5% alert threshold — this is exactly the alert
# diagnosed in this module's Real World section below`}</Output>
      </section>

      <Divider />

      {/* ── Part 06 — Transformation ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Transformation" />
        <SectionTitle>Transformation — Pure Functions, No Side Effects</SectionTitle>

        <Para>
          Transformation logic lives in pure functions — they take data in and
          return data out, with no database calls, no file writes, no external
          state. This design constraint makes every transformation trivially
          unit-testable and completely debuggable without running the full pipeline.
        </Para>

        <CodeBox label="pipeline/transform.py — enrich_order()">{`def enrich_order(row: dict) -> dict:
    """Apply business enrichment to a validated order row.
    Pure function: same input always produces same output."""
    enriched = row.copy()

    # Total value: order + delivery - discount
    # All three inputs are Decimal (validate_row keeps money as Decimal end
    # to end, never float), so this arithmetic is exact — no binary
    # floating-point rounding error to worry about.
    enriched['total_value'] = round(
        row['order_amount'] + row['delivery_fee'] - row['discount_amount'], 2)

    # Value tier
    amount = row['order_amount']
    if amount >= 2000:
        enriched['order_tier'] = 'premium'
    elif amount >= 500:
        enriched['order_tier'] = 'standard'
    else:
        enriched['order_tier'] = 'economy'

    # Date parts for partitioning and reporting
    created = row.get('created_at')
    if created and hasattr(created, 'date'):
        enriched['order_date']  = created.date()
        enriched['order_hour']  = created.hour
        enriched['order_month'] = created.strftime('%Y-%m')
    else:
        enriched['order_date'] = enriched['order_hour'] = enriched['order_month'] = None

    # Delivery duration
    delivered_at = row.get('delivered_at')
    if created and delivered_at and hasattr(delivered_at, 'date'):
        enriched['delivery_minutes'] = round((delivered_at - created).total_seconds() / 60, 1)
    else:
        enriched['delivery_minutes'] = None

    # Cancellation classification
    reason = row.get('cancellation_reason') or ''
    if row['status'] == 'cancelled':
        system_reasons = {'payment_failed', 'restaurant_closed', 'no_rider_available'}
        enriched['cancellation_type'] = 'system' if reason.lower() in system_reasons else 'customer'
    else:
        enriched['cancellation_type'] = None

    enriched['has_promo'] = bool(row.get('promo_code'))
    return enriched


def transform_batch(rows: list[dict]) -> list[dict]:
    return [enrich_order(row) for row in rows]`}</CodeBox>

        <Output>{`>>> enrich_order({'order_amount': 380.0, 'delivery_fee': 40.0, 'discount_amount': 20.0,
...               'status': 'delivered', 'created_at': ..., 'delivered_at': ..., ...})
{'total_value': 400.0, 'order_tier': 'economy', 'delivery_minutes': 55.0,
 'cancellation_type': None, 'has_promo': False, ...}`}</Output>

        <CodeBox label="pipeline/transform.py — schema projection for the destination">{`DEST_COLUMNS = [
    'order_id', 'customer_id', 'store_id', 'restaurant_id',
    'order_amount', 'delivery_fee', 'discount_amount', 'total_value',
    'status', 'payment_method', 'payment_status',
    'order_tier', 'order_date', 'order_hour', 'order_month',
    'delivery_minutes', 'cancellation_type', 'cancellation_reason',
    'has_promo', 'promo_code',
    'created_at', 'updated_at', 'delivered_at', 'cancelled_at', 'ingested_at',
]

def project_to_dest_schema(row: dict) -> dict:
    """Keep only destination columns — drops anything extra from enrichment."""
    return {col: row.get(col) for col in DEST_COLUMNS}`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Loading ─────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Loading" />
        <SectionTitle>Loading — Batch Upsert to Snowflake</SectionTitle>

        <Para>
          Loading is the most operationally sensitive step. A bad write pattern —
          one INSERT per row, no connection pooling, no transaction batching —
          can make a 2,000-row load take 10 minutes instead of 10 seconds.
          The production pattern uses bulk staging: load to a temporary table
          via <code>write_pandas</code>, then MERGE to the destination in one
          atomic SQL statement.
        </Para>

        <SubSubTitle>Staging and merging</SubSubTitle>

        <CodeBox label="pipeline/load.py — the MERGE and the upsert function">{`import logging
import snowflake.connector
from snowflake.connector.pandas_tools import write_pandas
import pandas as pd

from .config import config
from .transform import DEST_COLUMNS

log = logging.getLogger(__name__)

MERGE_SQL = f"""
MERGE INTO {config.dest_schema}.{config.dest_table} AS target
USING (SELECT * FROM {config.dest_schema}.orders_staging) AS source
ON target.order_id = source.order_id
WHEN MATCHED AND target.updated_at < source.updated_at THEN UPDATE SET
    {', '.join(f'{col} = source.{col}' for col in DEST_COLUMNS if col != 'order_id')}
WHEN NOT MATCHED THEN
    INSERT ({', '.join(DEST_COLUMNS)})
    VALUES ({', '.join(f'source.{col}' for col in DEST_COLUMNS)});
"""


def upsert_batch(rows: list[dict], conn) -> int:
    """Upsert via staging table merge — 10-100× faster than row-by-row upserts."""
    if not rows:
        return 0

    df = pd.DataFrame(rows, columns=DEST_COLUMNS)

    success, nchunks, nrows, output = write_pandas(
        conn=conn, df=df, table_name='orders_staging', schema=config.dest_schema,
        overwrite=True, auto_create_table=True,
        use_logical_type=True,   # required for the Decimal money columns to land as NUMBER, not FLOAT
    )
    if not success:
        raise RuntimeError(f'write_pandas failed: {output}')
    log.info('Staged %d rows in %d chunks', nrows, nchunks)

    with conn.cursor() as cur:
        cur.execute(MERGE_SQL)
        result        = cur.fetchone()
        rows_inserted = result[0] if result else 0
        rows_updated  = result[1] if result and len(result) > 1 else 0
    log.info('Merge complete: %d inserted, %d updated', rows_inserted, rows_updated)

    with conn.cursor() as cur:
        cur.execute(f'DROP TABLE IF EXISTS {config.dest_schema}.orders_staging')

    return nrows`}</CodeBox>

        <Output>{`INFO Staged 1,842 rows in 1 chunks
INFO Merge complete: 1,690 inserted, 152 updated`}</Output>

        <SubSubTitle>Creating the destination table — idempotently</SubSubTitle>

        <CodeBox label="pipeline/load.py — ensure_dest_table_exists()">{`def get_dest_connection():
    return snowflake.connector.connect(
        connection_string=config.dest_db_url, network_timeout=120, login_timeout=60)


def ensure_dest_table_exists(conn) -> None:
    """Create the destination table if missing. Safe to call on every start."""
    create_sql = f"""
    CREATE TABLE IF NOT EXISTS {config.dest_schema}.{config.dest_table} (
        order_id BIGINT NOT NULL, customer_id BIGINT NOT NULL,
        store_id VARCHAR(50), restaurant_id BIGINT,
        -- NUMBER(10,2), not FLOAT: money needs exact decimal precision, and
        -- the pipeline carries order_amount/delivery_fee/discount_amount as
        -- Python Decimal end to end (see validate.py) specifically so it can
        -- land here without floating-point rounding error.
        order_amount NUMBER(10,2) NOT NULL, delivery_fee NUMBER(10,2) NOT NULL DEFAULT 0,
        discount_amount NUMBER(10,2) NOT NULL DEFAULT 0, total_value NUMBER(10,2),
        status VARCHAR(30) NOT NULL, payment_method VARCHAR(30), payment_status VARCHAR(30),
        order_tier VARCHAR(20), order_date DATE, order_hour INTEGER, order_month VARCHAR(7),
        delivery_minutes FLOAT, cancellation_type VARCHAR(20), cancellation_reason VARCHAR(500),
        has_promo BOOLEAN DEFAULT FALSE, promo_code VARCHAR(100),
        created_at TIMESTAMP_TZ NOT NULL, updated_at TIMESTAMP_TZ NOT NULL,
        delivered_at TIMESTAMP_TZ, cancelled_at TIMESTAMP_TZ, ingested_at TIMESTAMP_TZ NOT NULL,
        CONSTRAINT pk_orders PRIMARY KEY (order_id)
    )
    CLUSTER BY (order_date, store_id);
    """
    with conn.cursor() as cur:
        cur.execute(create_sql)
    log.info('Destination table verified: %s.%s', config.dest_schema, config.dest_table)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Observability ───────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Observability" />
        <SectionTitle>Observability — Structured Logging and Run Metrics</SectionTitle>

        <Para>
          Observability is what separates a pipeline you can operate from one
          you can only hope works. Every run writes a row to a monitoring table.
          Every stage logs structured JSON. Row counts, durations, and rejection
          rates are captured per run. The monitoring table becomes a queryable
          history of every pipeline execution.
        </Para>

        <SubSubTitle>Structured JSON logging</SubSubTitle>

        <CodeBox label="pipeline/observability.py — StructuredFormatter and setup">{`import json, logging, sys, time, uuid
from datetime import datetime, timezone
from .config import config


class StructuredFormatter(logging.Formatter):
    """Emit logs as single-line JSON for easy parsing by log aggregators."""
    def format(self, record: logging.LogRecord) -> str:
        log_data = {
            'ts': datetime.now(timezone.utc).isoformat(), 'level': record.levelname,
            'logger': record.name, 'msg': record.getMessage(),
            'pipeline': 'orders_incremental', 'env': config.environment,
        }
        if record.exc_info:
            log_data['exception'] = self.formatException(record.exc_info)
        return json.dumps(log_data)


def setup_logging() -> None:
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(StructuredFormatter())
    root = logging.getLogger()
    root.setLevel(config.log_level)
    root.addHandler(handler)`}</CodeBox>

        <Output>{`{"ts": "2026-08-20T03:00:12Z", "level": "INFO", "logger": "pipeline_run", "msg": "Pipeline run started", "pipeline": "orders_incremental", "env": "production"}`}</Output>

        <SubSubTitle>Tracking one run&rsquo;s lifecycle</SubSubTitle>

        <CodeBox label="pipeline/observability.py — PipelineRun">{`class PipelineRun:
    """Tracks state for one execution. complete()/fail() log the final outcome."""

    def __init__(self, run_date: str):
        self.run_id          = str(uuid.uuid4())
        self.run_date        = run_date
        self.started_at      = datetime.now(timezone.utc)
        self.rows_extracted  = 0
        self.rows_written    = 0
        self.rows_rejected   = 0
        self.batches         = 0
        self.status          = 'running'
        self.error_message: str | None = None
        self._start_time     = time.monotonic()
        self.log              = logging.getLogger('pipeline_run')
        self.log.info('Pipeline run started', extra={'run_id': self.run_id, 'run_date': run_date})

    @property
    def duration_seconds(self) -> float:
        return round(time.monotonic() - self._start_time, 2)

    @property
    def rejection_rate(self) -> float:
        return (self.rows_rejected / self.rows_extracted) if self.rows_extracted > 0 else 0.0

    def complete(self) -> None:
        self.status = 'success'
        self.log.info(
            'Pipeline run complete: extracted=%d written=%d rejected=%d duration=%.1fs',
            self.rows_extracted, self.rows_written, self.rows_rejected, self.duration_seconds,
        )

    def fail(self, error: Exception) -> None:
        self.status        = 'failed'
        self.error_message  = f'{type(error).__name__}: {error}'
        self.log.error('Pipeline run FAILED after %.1fs: %s', self.duration_seconds, self.error_message)

    def to_record(self) -> dict:
        return {
            'run_id': self.run_id, 'pipeline_name': 'orders_incremental', 'run_date': self.run_date,
            'started_at': self.started_at.isoformat(), 'finished_at': datetime.now(timezone.utc).isoformat(),
            'status': self.status, 'rows_extracted': self.rows_extracted, 'rows_written': self.rows_written,
            'rows_rejected': self.rows_rejected, 'duration_seconds': self.duration_seconds,
            'error_message': self.error_message, 'environment': config.environment,
        }`}</CodeBox>

        <Output>{`INFO Pipeline run complete: extracted=1842 written=1808 rejected=34 duration=12.4s
ERROR Pipeline run FAILED after 301.2s: QueryCanceled: canceling statement due to statement timeout`}</Output>

        <CodeBox label="pipeline/observability.py — writing the run record">{`def write_run_record(run: 'PipelineRun', dest_conn) -> None:
    """Upsert this run's row into the monitoring table.

    dest_conn is a Snowflake connection (see load.py's get_dest_connection),
    and Snowflake has no ON CONFLICT — that is Postgres-only syntax. MERGE is
    the Snowflake equivalent, and it is the same construct load.py's
    MERGE_SQL already uses to upsert the orders table itself."""
    record = run.to_record()
    cols   = list(record.keys())

    select_exprs = ', '.join(f'%({c})s AS {c}' for c in cols)
    update_set   = ', '.join(f'{c} = source.{c}' for c in cols if c != 'run_id')
    insert_cols  = ', '.join(cols)
    insert_vals  = ', '.join(f'source.{c}' for c in cols)

    sql = f"""
        MERGE INTO {config.pipeline_run_table} AS target
        USING (SELECT {select_exprs}) AS source
        ON target.run_id = source.run_id
        WHEN MATCHED THEN UPDATE SET {update_set}
        WHEN NOT MATCHED THEN
            INSERT ({insert_cols}) VALUES ({insert_vals})
    """
    with dest_conn.cursor() as cur:
        cur.execute(sql, record)
    dest_conn.commit()`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 09 — Main Entrypoint ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — The Main Entrypoint" />
        <SectionTitle>Putting It Together — The Pipeline Entrypoint</SectionTitle>

        <Para>
          The main module is the orchestration layer. It calls the other modules
          in order, handles the inter-step handoff, manages the checkpoint (saving
          only after a successful write), and handles failures by recording them
          in the monitoring table without swallowing exceptions.
        </Para>

        <CodeBox label="pipeline/main.py — run_pipeline()">{`import logging, sys
from .checkpoint    import save_watermark
from .config        import config
from .extract       import extract_changed_rows, get_source_connection
from .load          import get_dest_connection, upsert_batch, ensure_dest_table_exists
from .observability  import PipelineRun, setup_logging, write_run_record
from .transform      import transform_batch, project_to_dest_schema
from .validate       import DLQWriter, validate_batch

setup_logging()
log = logging.getLogger('main')


def run_pipeline(run_date_str: str) -> PipelineRun:
    run = PipelineRun(run_date=run_date_str)
    source_conn = dest_conn = None

    try:
        log.info('Connecting to source and destination...')
        source_conn = get_source_connection()
        dest_conn   = get_dest_connection()
        ensure_dest_table_exists(dest_conn)

        dlq = DLQWriter(run_id=run.run_id)
        last_successful_until = None

        for raw_batch, since, until in extract_changed_rows(source_conn):
            run.batches        += 1
            run.rows_extracted += len(raw_batch)

            valid_rows = validate_batch(raw_batch, dlq)
            run.rows_rejected += len(raw_batch) - len(valid_rows)
            if not valid_rows:
                log.warning('Batch %d: all %d rows rejected — skipping load', run.batches, len(raw_batch))
                continue

            enriched  = transform_batch(valid_rows)
            projected = [project_to_dest_schema(row) for row in enriched]
            run.rows_written += upsert_batch(projected, dest_conn)
            last_successful_until = until

        # Advance checkpoint ONLY after all batches successfully wrote
        if last_successful_until is not None:
            save_watermark(last_successful_until)
        else:
            log.info('No rows extracted — checkpoint unchanged')

        if run.rejection_rate > 0.05:
            log.warning(f'Rejection rate {run.rejection_rate:.1%} exceeds 5% threshold — '
                        f'investigate DLQ: {dlq.path}')

        run.complete()

    except Exception as exc:
        run.fail(exc)
        raise   # re-raise so Airflow/cron marks the run as failed

    finally:
        if dest_conn:
            try:
                write_run_record(run, dest_conn)
            except Exception as e:
                log.error('Failed to write run record: %s', str(e))
            finally:
                dest_conn.close()
        if source_conn:
            # autocommit=False (see get_source_connection) means the named-
            # cursor extraction left an open transaction on this connection.
            # It is read-only — nothing to persist — so roll back explicitly
            # rather than relying on close() to discard it implicitly.
            source_conn.rollback()
            source_conn.close()

    return run`}</CodeBox>

        <Output>{`INFO Connecting to source and destination...
INFO Destination table verified: silver.orders
INFO Extracting rows updated 2026-08-20T02:40:00+00:00 → 2026-08-20T03:00:12+00:00 (overlap: 5 min)
INFO Extracted batch 1: 1,842 rows (total so far: 1,842)
INFO Staged 1,808 rows in 1 chunks
INFO Merge complete: 1,656 inserted, 152 updated
INFO Checkpoint saved: 2026-08-20T03:00:12+00:00
INFO Pipeline run complete: extracted=1842 written=1808 rejected=34 duration=12.4s`}</Output>

        <CodeBox label="pipeline/main.py — CLI entrypoint">{`def main() -> None:
    import argparse
    from datetime import date
    parser = argparse.ArgumentParser(description='Orders incremental pipeline')
    parser.add_argument('--date', default=date.today().isoformat())
    args = parser.parse_args()

    run = run_pipeline(args.date)
    sys.exit(0 if run.status == 'success' else 1)


if __name__ == '__main__':
    main()`}</CodeBox>

        <TryThis>
          Trace through <code>run_pipeline</code> and find the one line that decides
          whether the checkpoint advances. Now imagine <code>upsert_batch</code> raises
          halfway through the <code>for</code> loop on batch 3 of 5 — which rows get
          re-processed on the next run, and why is that safe given the load step uses
          upsert semantics?
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 10 — Testing ─────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Testing" />
        <SectionTitle>Testing — Unit Tests for Every Transformation and Validation Rule</SectionTitle>

        <Para>
          Pure functions are a gift to testing. Because <code>validate_row</code> and{' '}
          <code>enrich_order</code> take data in and return data out with no side
          effects, they can be tested exhaustively with zero mocking and zero
          infrastructure. The full suite in this pipeline covers every validation
          rule and every transformation branch — shown below is a representative
          slice from each category.
        </Para>

        <CodeBox label="tests/test_validate.py — representative cases">{`import pytest
from datetime import datetime, timezone
from pipeline.validate import validate_row


def valid_order(**overrides) -> dict:
    base = {
        'order_id': 9284751, 'customer_id': 4201938, 'store_id': 'ST001',
        'restaurant_id': None, 'order_amount': 380.00, 'delivery_fee': 40.00,
        'discount_amount': 0.00, 'status': 'delivered', 'payment_method': 'debit_card',
        'payment_status': 'captured',
        'created_at': datetime(2026, 8, 20, 14, 0, 0, tzinfo=timezone.utc),
        'updated_at': datetime(2026, 8, 20, 14, 32, 0, tzinfo=timezone.utc),
        'delivered_at': datetime(2026, 8, 20, 14, 55, 0, tzinfo=timezone.utc),
        'cancelled_at': None, 'cancellation_reason': None, 'promo_code': None, 'notes': None,
    }
    return {**base, **overrides}


# ── Happy path ────────────────────────────────────────────────────────────────
def test_valid_order_passes():
    result = validate_row(valid_order())
    assert result.is_valid is True
    assert result.row['order_id'] == 9284751

def test_status_is_lowercased_and_trimmed():
    result = validate_row(valid_order(status='  DELIVERED  '))
    assert result.row['status'] == 'delivered'

def test_amount_as_string_accepted():
    result = validate_row(valid_order(order_amount='380.00'))
    assert result.row['order_amount'] == 380.00

# ── Required-field failures ───────────────────────────────────────────────────
def test_missing_order_id_fails():
    result = validate_row(valid_order(order_id=None))
    assert result.is_valid is False and 'missing_order_id' in result.error

def test_missing_customer_id_fails():
    result = validate_row(valid_order(customer_id=None))
    assert 'missing_customer_id' in result.error

# ── Amount validation ──────────────────────────────────────────────────────────
def test_negative_amount_fails():
    result = validate_row(valid_order(order_amount=-1.00))
    assert 'negative_order_amount' in result.error

def test_zero_amount_passes():
    # Zero-amount orders are valid — free promo orders
    assert validate_row(valid_order(order_amount=0.00)).is_valid is True

def test_suspiciously_large_amount_fails():
    result = validate_row(valid_order(order_amount=600_000))
    assert 'suspiciously_large_amount' in result.error

# ── Status validation ──────────────────────────────────────────────────────────
@pytest.mark.parametrize('status', ['placed', 'delivered', 'cancelled', 'preparing'])
def test_known_statuses_pass(status):
    assert validate_row(valid_order(status=status)).is_valid is True

def test_unknown_status_fails():
    result = validate_row(valid_order(status='refunded'))
    assert 'invalid_status' in result.error

# ── Timestamp validation ───────────────────────────────────────────────────────
def test_updated_before_created_fails():
    created = datetime(2026, 8, 20, 14, 0, 0, tzinfo=timezone.utc)
    updated = datetime(2026, 8, 20, 13, 0, 0, tzinfo=timezone.utc)  # earlier!
    result  = validate_row(valid_order(created_at=created, updated_at=updated))
    assert 'updated_at before created_at' in result.error`}</CodeBox>

        <CodeBox label="tests/test_transform.py — representative cases">{`from datetime import datetime, timezone
from pipeline.transform import enrich_order

def base_row(**overrides) -> dict:
    row = {
        'order_id': 9284751, 'order_amount': 380.00, 'delivery_fee': 40.00, 'discount_amount': 20.00,
        'status': 'delivered', 'promo_code': None,
        'created_at':   datetime(2026, 8, 20, 14,  0, 0, tzinfo=timezone.utc),
        'delivered_at': datetime(2026, 8, 20, 14, 55, 0, tzinfo=timezone.utc),
        'cancellation_reason': None,
    }
    return {**row, **overrides}

def test_total_value_computed_correctly():
    row = enrich_order(base_row(order_amount=380, delivery_fee=40, discount_amount=20))
    assert row['total_value'] == 400.00

def test_premium_order_tier():
    assert enrich_order(base_row(order_amount=2500))['order_tier'] == 'premium'

def test_delivery_minutes_computed():
    row = enrich_order(base_row())
    assert row['delivery_minutes'] == 55.0

def test_system_cancellation_classified():
    row = enrich_order(base_row(status='cancelled', cancellation_reason='payment_failed'))
    assert row['cancellation_type'] == 'system'

def test_promo_flag_true_when_code_present():
    assert enrich_order(base_row(promo_code='SAVE10'))['has_promo'] is True`}</CodeBox>

        <Output>{`$ pytest tests/ -v
tests/test_validate.py::test_valid_order_passes PASSED
tests/test_validate.py::test_status_is_lowercased_and_trimmed PASSED
tests/test_validate.py::test_missing_order_id_fails PASSED
tests/test_validate.py::test_negative_amount_fails PASSED
tests/test_validate.py::test_unknown_status_fails PASSED
tests/test_transform.py::test_total_value_computed_correctly PASSED
tests/test_transform.py::test_premium_order_tier PASSED
tests/test_transform.py::test_system_cancellation_classified PASSED
========================== 21 passed in 0.09s ===========================`}</Output>
      </section>

      <Divider />

      {/* ── Part 11 — Scheduling ──────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Scheduling" />
        <SectionTitle>Scheduling — Airflow DAG for 15-Minute Incremental Runs</SectionTitle>

        <Para>
          The pipeline runs every 15 minutes via an Airflow DAG. The DAG is
          intentionally minimal — Airflow&rsquo;s job is scheduling and monitoring,
          not business logic. All pipeline logic stays in the pipeline package;
          the DAG just invokes it.
        </Para>

        <CodeBox label="dags/orders_pipeline_dag.py — DAG shell and default args">{`from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.empty  import EmptyOperator

default_args = {
    'owner': 'data-team', 'depends_on_past': False,
    'email_on_failure': True, 'email_on_retry': False,
    'email': ['data-team@freshcart.com'],
    'retries': 2, 'retry_delay': timedelta(minutes=2),
    'retry_exponential_backoff': True,
    'execution_timeout': timedelta(minutes=10),   # kill if it exceeds 10 min
}

with DAG(
    dag_id='orders_pipeline_incremental', default_args=default_args,
    description='FreshCart orders incremental ingestion (every 15 min)',
    schedule='*/15 * * * *', start_date=datetime(2026, 3, 1),
    catchup=False, max_active_runs=1,
    tags=['orders', 'ingestion', 'incremental', 'silver'],
) as dag:
    start = EmptyOperator(task_id='start')`}</CodeBox>

        <CodeBox label="dags/orders_pipeline_dag.py — the two task functions">{`def run_pipeline(**context):
    from pipeline.main import run_pipeline as _run
    run_date = context['logical_date'].strftime('%Y-%m-%d')
    result   = _run(run_date)

    context['ti'].xcom_push(key='rows_written',   value=result.rows_written)
    context['ti'].xcom_push(key='rows_rejected',  value=result.rows_rejected)

    if result.status != 'success':
        raise RuntimeError(f'Pipeline run failed: {result.error_message}')

ingest = PythonOperator(task_id='ingest_orders', python_callable=run_pipeline,
                         sla=timedelta(minutes=8))


def check_row_count(**context):
    """Alert if the rejection rate is anomalous."""
    ti = context['ti']
    written  = ti.xcom_pull(task_ids='ingest_orders', key='rows_written')
    rejected = ti.xcom_pull(task_ids='ingest_orders', key='rows_rejected')
    if rejected and written:
        rate = rejected / (written + rejected)
        if rate > 0.05:
            raise ValueError(f'Rejection rate {rate:.1%} exceeds 5% threshold. Check DLQ: /data/dlq/')

quality_check = PythonOperator(task_id='quality_check', python_callable=check_row_count)
end = EmptyOperator(task_id='end')

start >> ingest >> quality_check >> end`}</CodeBox>

        <Output>{`Airflow UI — orders_pipeline_incremental — run 2026-08-20T03:00:00
✓ start            0.1s
✓ ingest_orders   12.4s
✓ quality_check    0.3s
✓ end              0.1s
Total duration: 12.9s (SLA: 8 min — not breached)`}</Output>
      </section>

      <Divider />

      {/* ── Part 12 — Misconceptions ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 12 — Misconceptions" />
        <SectionTitle>Five Misconceptions About Building Production Pipelines</SectionTitle>

        {[
          {
            wrong: '"Idempotent just means the pipeline can\'t create duplicates"',
            right: 'That is one consequence of idempotency, not its definition. Idempotent means running the same operation twice produces the same end state as running it once — for this pipeline, upsert semantics achieve that specifically because the MERGE\'s WHEN MATCHED clause only updates when the source is actually newer. An upsert that blindly overwrote on every match would avoid duplicates but would NOT be idempotent against out-of-order replays.',
          },
          {
            wrong: '"As long as I use ON CONFLICT / MERGE, the order operations run in doesn\'t matter"',
            right: 'One correction before the real point: ON CONFLICT and MERGE are not two names for one universal mechanism — ON CONFLICT is Postgres-specific syntax, while MERGE is the equivalent upsert construct on Snowflake (and most other warehouses). This pipeline uses MERGE exclusively because the destination is Snowflake, which does not support ON CONFLICT at all. Whichever construct your database gives you, operation order still matters enormously for the checkpoint. Part 09\'s ordering — extract, validate, transform, load, THEN save the watermark — is load-bearing. Save the watermark before the load and a failed write silently skips data forever, upsert or not. The upsert protects you from re-processing after a crash; it does nothing to protect you from advancing past data that was never written.',
          },
          {
            wrong: '"A pipeline that has never failed in production is a well-designed pipeline"',
            right: 'It might just mean it has never been tested by real failure conditions yet. This module\'s Part 03 checkpoint, Part 04 statement timeout, and Part 05 dead letter queue exist specifically because failures are assumed to be inevitable — a pipeline with no failure-handling code that "has never failed" is one bad day away from silently corrupting the destination table with no way to detect it happened.',
          },
          {
            wrong: '"Adding more Airflow retries makes a flaky pipeline safer"',
            right: 'Retries only help if the underlying failure is transient AND the operation being retried is safe to repeat. Retrying a step that partially wrote data without idempotent semantics compounds the damage instead of fixing it. Part 07\'s upsert pattern is what makes retries (and the Part 11 DAG\'s retries=2) actually safe here — the retry mechanism and the idempotent design are two separate decisions that both have to be made correctly.',
          },
          {
            wrong: '"Once the pipeline passes all its unit tests, it\'s production ready"',
            right: 'Part 10\'s unit tests prove the pure functions (validate_row, enrich_order) behave correctly in isolation — they say nothing about the source database timing out, the Snowflake warehouse being suspended, or the Airflow scheduler triggering a second concurrent run. Those are exactly the three real first-week issues in this module\'s Real World section, and none of them would have been caught by a unit test.',
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

      {/* ── Part 13 — Real World ──────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 13 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>The First Week With a New Pipeline — Common Early Problems</SectionTitle>

        <Para>
          The pipeline is deployed and running. The first three days surface three
          classic first-production-week issues. Here is how each one is diagnosed
          and fixed using the observability layer built into the pipeline.
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
            Day 1, 09:00 — rejection rate alert fires at 12.3%
          </div>

          <CodeBox label="Diagnosis and fix — Issue 1">{`# Airflow alert: quality_check task failed with "Rejection rate 12.3%"

# Diagnosis — check the DLQ file referenced in the alert:
$ head -5 /data/dlq/orders_run-abc123.ndjson | python3 -m json.tool
# {"error": "invalid_status: 'test_payment' for order 9284891", "row": {...}}
# {"error": "invalid_status: 'test_payment' for order 9284892", "row": {...}}
# → a load test is running against the orders system, and 'test_payment'
#   is a status our validator correctly rejects

# Fix — do NOT add 'test_payment' to VALID_STATUSES. Filter it at the source:
#   In extract.py, add to EXTRACT_SQL:
#   AND NOT (notes ILIKE '%test%' OR status LIKE 'test_%')
#   Test orders do not belong in the silver layer at all.

# Verification:
$ python -m pipeline.main --date 2026-08-20
# Rejection rate: 0.0%`}</CodeBox>

          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', margin: '28px 0 20px', letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Day 2, 06:15 — SLA breach, run took 14 minutes instead of 10
          </div>

          <CodeBox label="Diagnosis and fix — Issue 2">{`-- Diagnosis — query the monitoring table:
SELECT run_id, rows_extracted, rows_written, duration_seconds
FROM monitoring.pipeline_runs
WHERE pipeline_name = 'orders_incremental' AND started_at::DATE = '2026-08-20'
ORDER BY started_at;

-- 06:00 run: rows_extracted=48,000   duration_seconds=847  (14 minutes)
-- typical run: rows_extracted=2,000   duration_seconds=45s
-- → the 00:00–05:45 runs all failed silently (Snowflake maintenance window)
--   06:00 processed 5.75 hours of backlog → expected to be slow

-- Fix — this was not a bug, the pipeline correctly recovered the backlog.
-- The SLA itself was wrong for a backfill run. Two changes:
--   1. execution_timeout=timedelta(minutes=30) for backfill scenarios
--   2. a consecutive-failure alert that catches the maintenance window EARLIER:
SELECT COUNT(*) FROM monitoring.pipeline_runs
WHERE pipeline_name = 'orders_incremental' AND status = 'failed'
  AND started_at > NOW() - INTERVAL '2 hours';
-- alert if > 3 consecutive failures`}</CodeBox>

          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', margin: '28px 0 20px', letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Day 3, 11:30 — Snowflake costs spike to 3× expected
          </div>

          <CodeBox label="Diagnosis and fix — Issue 3">{`-- Diagnosis — check Snowflake query history:
SELECT query_text, total_elapsed_time/1000 AS seconds, credits_used_cloud_services
FROM snowflake.account_usage.query_history
WHERE start_time > DATEADD('day', -1, CURRENT_TIMESTAMP) AND warehouse_name = 'PIPELINE_WH'
ORDER BY credits_used_cloud_services DESC LIMIT 10;

-- Top query: the MERGE, running 96 times/day (every 15 min).
-- Each MERGE's ON condition scans the entire silver.orders table (500M rows)
-- to find the matching order_id — 96 full scans a day is expensive.

-- Fix — add a partition filter to the MERGE ON condition:
MERGE INTO silver.orders AS target
USING orders_staging AS source
ON target.order_id = source.order_id
   AND target.order_date >= DATEADD('day', -7, CURRENT_DATE)  -- ← added
...
-- orders are almost never updated more than 7 days after creation, so this
-- restricts the scan to the last 7 days of partitions:
-- result — 96% micro-partition pruning, 25× reduction in compute cost`}</CodeBox>
        </div>
      </section>

      <Divider />

      {/* ── Part 14 — Interview Prep ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 14 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. Walk me through how you would design a production batch pipeline from scratch.',
            a: `I start by understanding the requirements before writing any code. What is the source system and can I use a read replica? What is the extraction pattern — full load or incremental? What is the destination and what load pattern is required — append, upsert, or full replace? What is the latency SLA? What happens when individual rows are invalid?

With those answers, I structure the pipeline into single-responsibility modules: config (validated from environment variables at startup), checkpoint (atomic read/write of watermark), extract (chunked server-side cursor, never SELECT *), validate (pure functions, no I/O), transform (pure functions, enrichment logic), load (batch upsert, staging table merge pattern), and observability (structured JSON logging, run metadata table).

The extract module uses a PostgreSQL server-side cursor so the result set is never fully loaded into memory — it streams in batches of 50k rows regardless of how many total rows matched. The validate module is a pure function that returns ValidationResult tuples — valid rows continue, invalid rows go to a DLQ file for inspection and reprocessing.

The checkpoint is written atomically using write-then-rename and only after a successful write to the destination. If the pipeline crashes mid-run, the next run reprocesses from the last confirmed watermark. The overlap window (5 minutes) in the extraction query catches rows that arrived late due to application-side delays, with upsert semantics handling the re-processed duplicates.

Finally I wrap this in an Airflow DAG with max_active_runs=1 to prevent concurrent executions, execution_timeout set to 2× the expected duration, and a quality check task that alerts on high rejection rates.`,
          },
          {
            q: 'Q2. Why should the checkpoint be saved AFTER the destination write, not before it?',
            a: `The checkpoint records where the pipeline should start from on its next run — specifically, the maximum watermark timestamp of the data successfully written to the destination.

If the checkpoint is saved before the destination write, and the write then fails (network error, Snowflake timeout, schema mismatch), the next run starts from the advanced checkpoint — after the data that should have been written. The rows that were extracted but not successfully written are skipped forever. The destination has a permanent gap.

If the checkpoint is saved after the destination write, and the checkpoint save fails or the process is killed between the write and the save, the next run starts from the previous checkpoint — before the data that was just written. It re-extracts and re-processes those rows. Because the destination uses upsert semantics (a MERGE — Snowflake's equivalent of Postgres's ON CONFLICT DO UPDATE), re-processing rows that already exist updates them to the same values — no duplicates, no corruption. This is exactly the idempotency principle: safe to rerun.

The only safe invariant is: the checkpoint must only advance to a watermark when data up to that watermark has been durably written to the destination. Any other ordering risks permanent data loss.

This also means the checkpoint file must be written atomically — using write-then-rename rather than direct file write. If the process is killed mid-write to the checkpoint file, write-then-rename ensures the old checkpoint file is untouched (the rename never happened), not a partially-written corrupt file.`,
          },
          {
            q: 'Q3. How do you prevent a batch pipeline from harming the production source database?',
            a: `There are four concrete measures I apply.

First, connect to a read replica rather than the production primary. A full table scan on a 500-million-row orders table fills PostgreSQL's buffer pool with pages from the scan, evicting the hot pages the application is actively using. This degrades application response times for 30–60 minutes after the scan. A read replica has its own buffer pool — analytical scans on the replica do not affect the primary at all.

Second, use a statement timeout on the extraction query. A query that is supposed to take 2 minutes but runs 45 minutes due to a database anomaly holds a connection and a lock. Adding options="-c statement_timeout=300000" to the connection string kills any query that exceeds 5 minutes, ensuring the pipeline fails fast rather than holding resources indefinitely.

Third, add a read-only session mode: conn.set_session(readonly=True). This prevents the pipeline from accidentally issuing a write operation against the source — a bug that would be catastrophic on a production primary and should be impossible even on a replica.

Fourth, schedule heavy extraction outside peak hours. For daily full-load pipelines that must run against tables without replicas, schedule them at 2–4 AM when application traffic is lowest. Use pg_stat_activity to verify no application queries are blocked by the pipeline.

A fifth consideration for APIs: stay within rate limits with a proactive token bucket rate limiter and monitor the X-RateLimit-Remaining header to slow down before hitting the limit rather than receiving 429s reactively.`,
          },
          {
            q: 'Q4. What is a Dead Letter Queue in a pipeline context and how should it be implemented?',
            a: `A Dead Letter Queue is a separate destination for records that fail processing — records that cannot be parsed, fail validation, or cause an error during transformation. Instead of two bad options (crash the entire pipeline on one bad row, or silently drop the bad row), the DLQ provides a third option: quarantine the bad record with its error context, continue processing the rest of the batch, and provide a way to inspect and reprocess the quarantined records later.

In a batch pipeline, the DLQ is typically a NDJSON file (one JSON object per line) written to a known directory. Each entry contains the original raw record, the error that caused rejection, and the timestamp. The file name includes the pipeline run ID so it can be correlated to the run's monitoring record.

The DLQ implementation has two parts. The writer is called with the raw record and an error string — it appends a line to the file and increments a counter. The counter is checked after every batch and at the end of the run. If more than 5% of rows are rejected, an alert fires.

The DLQ is not a final resting place — it is a queue. Someone should monitor it and have a defined process for investigation and reprocessing. For a well-run pipeline: DLQ files are reviewed daily. If the rejection reason is a known transient issue (source system bug now fixed), the DLQ records are re-submitted for processing. If it is a schema change (new status value), the validation rules are updated and the records are reprocessed.

The DLQ should never be confused with the final destination. Records in the DLQ have NOT been loaded to the warehouse. The pipeline run record should include the DLQ count so analysts know exactly how many records are missing from the warehouse and where to find them.`,
          },
          {
            q: 'Q5. How do you test a data pipeline without running it end-to-end against real databases?',
            a: `The key is structuring the pipeline so that the logic that can be tested in isolation is isolated from the I/O that cannot.

The most valuable tests are unit tests on pure functions. The transformation module's enrich_order function takes a dict and returns a dict — no database calls, no file writes. I can call it with any input and assert on the output. Similarly, validate_row takes a dict and returns a ValidationResult — fully deterministic, no infrastructure. These functions can have 50+ test cases covering every validation rule, every edge case, every branch — and they run in milliseconds.

For the extraction and loading modules, I use test databases. For PostgreSQL extraction tests: spin up a PostgreSQL container using pytest-docker or testcontainers, insert known test rows, and verify the extract module returns exactly the rows it should. For Snowflake loading tests: use the Snowflake trial account or mock the write_pandas call with unittest.mock.patch.

The most pragmatic approach for the loading test is to test the SQL logic in isolation — run the MERGE SQL against a local SQLite or PostgreSQL test database with a small fixture. The SQL is the business logic; testing whether write_pandas successfully calls Snowflake is an integration concern that can be verified in a staging environment.

The checkpoint module tests verify atomic write-then-rename behaviour and corrupt file handling — these use tempfile and are trivially fast with no external dependencies.

The overall philosophy: write pure functions wherever possible (transformation, validation, business rules), unit test them exhaustively with pytest, and reserve integration tests for the few modules that genuinely require database connections (extraction, loading). The ratio should be approximately 80% unit tests, 20% integration tests.`,
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
            q: 'Using SELECT * instead of explicit column projection in the extraction query',
            a: 'When the source table gets a new column added upstream, SELECT * silently starts pulling it through the whole pipeline with no validation rule and no destination column for it — the load step either errors or silently drops it. Part 04\'s EXTRACT_COLUMNS list makes new source columns an explicit, visible decision instead of a surprise.',
          },
          {
            q: 'Skipping the read-only session flag because "the query is just a SELECT anyway"',
            a: 'A read-only flag is not there to catch queries you wrote on purpose — it catches the accidental one: a copy-pasted snippet, a debugging UPDATE left in a notebook cell, a bug in a shared helper function. conn.set_session(readonly=True) turns a potential production incident into an immediate, obvious error at the exact line that caused it.',
          },
          {
            q: 'Assuming a MERGE\'s WHEN MATCHED clause is automatically idempotent',
            a: 'A MERGE that updates on every match regardless of timestamps will happily overwrite a newer row with an older one if a delayed batch is replayed. Part 07\'s ON condition includes target.updated_at < source.updated_at specifically so an out-of-order replay can never regress data — check every MERGE you write for this same guard.',
          },
          {
            q: 'Writing unit tests only for the happy path and skipping the edge cases',
            a: 'The validation function in Part 05 exists entirely to handle malformed data — a test suite that only checks valid_order() passing never proves the function does its actual job. Part 10\'s tests deliberately hit negative amounts, unknown statuses, and out-of-order timestamps because those are exactly the inputs that show up in production and never in a demo.',
          },
          {
            q: 'Picking a schedule interval without checking how fast the source data actually changes',
            a: 'A 15-minute schedule on a table that batches writes once an hour just means 3 of every 4 runs process zero rows for no reason, burning compute and cluttering the monitoring table. A schedule slower than the source\'s actual write cadence, on the other hand, silently violates the SLA. Check the source\'s real update frequency before picking a cron interval, don\'t assume it.',
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
            error: `psycopg2.errors.QueryCanceled: ERROR: canceling statement due to statement timeout — extraction query killed after 5 minutes`,
            cause: 'The pipeline connects with statement_timeout=300000 (5 minutes). The extraction query on the orders table took longer than 5 minutes — likely because the watermark gap was very large (long outage period creating a large backlog), table statistics are stale causing a bad query plan, or the read replica is under load from other queries.',
            fix: 'For a large backlog: temporarily increase statement_timeout for the first run after a long outage, or split the backlog into hourly chunks with a loop. For bad query plan: run ANALYZE orders on the source to refresh statistics. Verify the extraction query uses the index on updated_at: EXPLAIN ANALYZE the query — it should show "Index Scan using idx_orders_updated_at" not "Seq Scan". If no index exists: CREATE INDEX CONCURRENTLY idx_orders_updated_at ON orders (updated_at) — CONCURRENTLY builds without locking the table.',
          },
          {
            error: `Pydantic ValidationError: ORDERS_PIPELINE_SOURCE_DB_URL — field required — pipeline exits immediately at startup`,
            cause: 'The required environment variable ORDERS_PIPELINE_SOURCE_DB_URL is not set. Pydantic BaseSettings raises ValidationError at import time when a required field has no value. The pipeline exits before processing any data.',
            fix: 'Set the missing environment variable: export ORDERS_PIPELINE_SOURCE_DB_URL="postgresql://user:pass@replica:5432/db". For production: ensure the variable is defined in the Kubernetes secret, Airflow connection, or .env file loaded before the process starts. The Pydantic validation is a feature — it catches missing config before the pipeline starts, not mid-run. Add a deployment check that verifies all required env vars are set before deploying.',
          },
          {
            error: `Snowflake ProgrammingError: 002003 (42S02): SQL compilation error: Table SILVER.ORDERS_STAGING does not exist — MERGE fails`,
            cause: 'The write_pandas call that was supposed to create the staging table failed silently (returned success=False but the exception was not raised), and the MERGE SQL ran against a non-existent staging table. This can happen when the Snowflake warehouse is suspended and auto-resume takes longer than the write_pandas timeout.',
            fix: 'Check the success, nchunks, nrows, output tuple returned by write_pandas — raise an explicit RuntimeError if success is False (Part 07 already does this). Add a retry: if the staging table does not exist after write_pandas, retry once with a fresh connection. Also configure the Snowflake warehouse with AUTO_RESUME = TRUE and AUTO_SUSPEND = 60 (1 minute idle) to ensure it is available for the pipeline runs.',
          },
          {
            error: `Pipeline runs complete successfully but Silver table row count grows unexpectedly — ~24k new rows per run instead of expected 2k`,
            cause: 'The overlap_minutes configuration is set to 60 minutes instead of 5 minutes — a 12× larger extraction window (60 ÷ 5 = 12). Every 15-minute run is re-extracting the last 60 minutes of data instead of just the last 5 minutes plus a small overlap. The upsert semantics prevent duplicates, but the pipeline is now extracting roughly 24k rows per run (12× the expected ~2k), re-processing about 22k rows that were already correctly loaded on a previous run.',
            fix: 'Set overlap_minutes=5 (or at most 10 for tables with high clock skew risk). Re-check the monitoring table: if rows_extracted is consistently ~12× higher than the historical baseline for that run cadence, the overlap window is larger than necessary. The correct size for overlap_minutes is the 99th percentile data lateness for the source table — typically 1–5 minutes for well-maintained application code.',
          },
          {
            error: `Airflow DAG max_active_runs=1 is not preventing concurrent runs — two pipeline instances are running simultaneously`,
            cause: 'The Airflow scheduler is configured with parallelism settings that override individual DAG max_active_runs limits, or the DAG was manually triggered while a scheduled run was already executing and the manual trigger bypassed the limit. In some Airflow versions, external triggers ignore max_active_runs.',
            fix: 'Add an explicit lock file as a secondary guard within the pipeline itself: check for /tmp/orders_pipeline.lock at startup and write the current PID; remove it at exit using a finally block. If the lock file exists and the PID is still running, exit immediately. This prevents concurrent runs regardless of how the pipeline was triggered.',
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
        'Structure a pipeline into single-responsibility modules: config, checkpoint, extract, validate, transform, load, observability, main. Each module has one job. This makes every module independently testable, independently replaceable, and independently debuggable.',
        'Validate configuration with Pydantic BaseSettings at startup. Every missing required variable raises an error before any work starts — not mid-run with a cryptic attribute error. Use env_prefix to namespace variables. Add field validators for business constraints (no primary database URL).',
        'Write checkpoints atomically using write-then-rename. Save the checkpoint only after the destination write succeeds. Never before. An atomic checkpoint that is saved after a successful write makes the pipeline safe to rerun at any time — re-processing with upsert semantics is always correct.',
        'Extract with server-side cursors (PostgreSQL named cursors). The full result set is never loaded into memory — rows stream in batches of BATCH_SIZE. Total memory usage is O(BATCH_SIZE) regardless of how many rows changed. Apply an overlap window (5 minutes) and use upsert to handle the re-processed rows from the overlap.',
        'Write validation and transformation logic as pure functions with no I/O. Pure functions are trivially unit-testable — no mocking, no infrastructure, no database. Bad rows go to a DLQ file, not the destination and not into a crash. Alert when the DLQ rejection rate exceeds 5%.',
        'Use the staging-table MERGE pattern for Snowflake loads. Write rows to a temporary staging table via write_pandas (bulk upload), then MERGE staging into the destination in one atomic SQL statement. Add a partition filter to the MERGE ON condition to enable micro-partition pruning and avoid full table scans.',
        'Write structured JSON logs from the start — not print statements. Structured logs are queryable by log aggregators (Datadog, CloudWatch, Loki). Include run_id, pipeline_name, environment, and row counts in every log line. Write a run record to a monitoring table on every run.',
        'Set max_active_runs=1 on the Airflow DAG. Add an execution_timeout set to 2× the expected run duration. Add a quality_check task after the load that alerts on high rejection rates. Use SLA miss callbacks to detect runs that succeed but take too long.',
        'The Airflow DAG is a thin wrapper — all pipeline logic lives in the pipeline package. The DAG calls one function and pushes XCom metrics. This means the pipeline can be tested, run, and debugged independently of Airflow — python -m pipeline.main --date 2026-08-20.',
        'The three most common first-week issues: (1) unexpected rejections from unknown status values — inspect the DLQ, add source filter or update valid set; (2) slow runs from large backlogs after outages — add consecutive-failure monitoring to catch outages early; (3) unexpected Snowflake compute costs from MERGE full-table scans — add partition filter to the MERGE ON condition.',
      ]} />


      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 26 covers idempotency and atomicity — the two properties that separate toy pipelines from production ones — and exactly how to make pipelines safe to restart after any failure at any stage.
        </p>
        <Link href="/learn/data-engineering/idempotency-atomicity" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 26 → Idempotency, Atomicity and Pipeline Restartability
        </Link>
      </div>
    </LearnLayout>
  )
}
