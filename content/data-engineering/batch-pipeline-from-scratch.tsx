import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
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

export default function BatchPipelineFromScratchModule() {
  return (
    <LearnLayout
      title="Building a Batch Pipeline From Scratch"
      description="From requirements to production deployment — schema validation, chunked extraction, transformation, upserts, observability, testing, and scheduling."
      section="Data Engineering"
      readTime="75 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — What We Are Building ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What We Are Building" />
        <SectionTitle>A Complete Pipeline, Built the Right Way</SectionTitle>

        <Para>
          Previous modules covered the theory — ingestion patterns, design principles,
          idempotency, observability. This module applies all of it to a single
          concrete task: building a production-grade daily batch pipeline from scratch,
          one piece at a time, explaining every decision along the way.
        </Para>

        <Para>
          By the end of this module you will have a complete, deployable pipeline
          with chunked extraction, schema validation, row-level error handling, upsert
          loading, structured observability, a test suite, and a cron schedule. Every
          component is explained — not just shown.
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
              { label: 'Source', value: 'PostgreSQL replica — FreshMart orders table (500M rows)', color: '#4285f4' },
              { label: 'Pattern', value: 'Incremental high-watermark — updated_at based', color: '#7b61ff' },
              { label: 'Schedule', value: 'Every 15 minutes via Airflow', color: '#f97316' },
              { label: 'Destination', value: 'Snowflake — silver.orders table', color: '#00add4' },
              { label: 'Load mode', value: 'Upsert — ON CONFLICT (order_id) DO UPDATE', color: '#00e676' },
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
    """
    All configuration loaded from environment variables.
    Pydantic validates types and required fields at import time.
    Missing required variables raise a clear error before any work starts.
    """

    # ── Source database ────────────────────────────────────────────────────────
    source_db_url: str = Field(
        ...,
        description='PostgreSQL connection string — read replica only',
    )
    source_schema: str = Field(default='public')
    source_table:  str = Field(default='orders')

    # ── Destination ────────────────────────────────────────────────────────────
    dest_db_url:    str = Field(..., description='Snowflake connection string')
    dest_schema:    str = Field(default='silver')
    dest_table:     str = Field(default='orders')

    # ── Extraction ─────────────────────────────────────────────────────────────
    batch_size:          int   = Field(default=50_000,  ge=1_000, le=500_000)
    overlap_minutes:     int   = Field(default=5,       ge=0,     le=60)
    # overlap_minutes: extend the lower bound back by this many minutes
    # to catch rows that arrive late in the source due to clock skew.

    # ── Checkpoint ─────────────────────────────────────────────────────────────
    checkpoint_dir: Path = Field(default=Path('/data/checkpoints'))

    # ── Dead Letter Queue ──────────────────────────────────────────────────────
    dlq_dir: Path = Field(default=Path('/data/dlq'))

    # ── Observability ──────────────────────────────────────────────────────────
    log_level:       Literal['DEBUG', 'INFO', 'WARNING', 'ERROR'] = 'INFO'
    pipeline_run_table: str = Field(default='monitoring.pipeline_runs')

    # ── Environment ────────────────────────────────────────────────────────────
    environment: Literal['development', 'staging', 'production'] = 'development'

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
        # All env vars use this prefix:
        # ORDERS_PIPELINE_SOURCE_DB_URL=postgresql://...
        # ORDERS_PIPELINE_DEST_DB_URL=snowflake://...
        # ORDERS_PIPELINE_BATCH_SIZE=100000


# Singleton — imported by all pipeline modules
config = PipelineConfig()`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — Checkpoint ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Checkpoint" />
        <SectionTitle>Checkpoint — Atomic, Crash-Safe Watermark Persistence</SectionTitle>

        <Para>
          The checkpoint is the pipeline's memory of where it left off. It must
          be written atomically — a crash during checkpoint write should leave
          the previous checkpoint intact, not a corrupted half-written file.
          It must be read defensively — a missing or corrupt checkpoint should
          start from a safe default, not crash the pipeline.
        </Para>

        <CodeBox label="pipeline/checkpoint.py — atomic checkpoint read and write">{`import json
import logging
from datetime import datetime, timezone
from pathlib import Path

from .config import config

log = logging.getLogger(__name__)

CHECKPOINT_FILE = config.checkpoint_dir / f'orders_watermark.json'


def load_watermark() -> datetime:
    """
    Load the watermark from the last successful run.
    Returns a safe default (far in the past) if no checkpoint exists.
    Handles corrupt files by returning the default and logging a warning.
    """
    if not CHECKPOINT_FILE.exists():
        default = datetime(2020, 1, 1, tzinfo=timezone.utc)
        log.info('No checkpoint found — starting from default: \${s}', default.isoformat())
        return default

    try:
        data = json.loads(CHECKPOINT_FILE.read_text())
        wm = datetime.fromisoformat(data['watermark'])
        log.info('Loaded watermark: \${s}', wm.isoformat())
        return wm
    except (json.JSONDecodeError, KeyError, ValueError) as e:
        # Corrupt checkpoint — do not crash, start fresh and alert
        log.warning('Corrupt checkpoint file: \${s} — starting from default', str(e))
        default = datetime(2020, 1, 1, tzinfo=timezone.utc)
        _archive_corrupt_checkpoint()
        return default


def save_watermark(watermark: datetime) -> None:
    """
    Save the watermark atomically using write-then-rename.
    If the process is killed mid-write, the previous checkpoint is preserved.
    """
    payload = {
        'watermark':   watermark.isoformat(),
        'saved_at':    datetime.now(timezone.utc).isoformat(),
        'pipeline':    'orders_incremental',
    }
    # Write to temp file first, then atomically rename
    tmp = CHECKPOINT_FILE.with_suffix('.tmp')
    tmp.write_text(json.dumps(payload, indent=2))
    tmp.rename(CHECKPOINT_FILE)   # atomic on POSIX; near-atomic on Windows
    log.info('Checkpoint saved: \${s}', watermark.isoformat())


def _archive_corrupt_checkpoint() -> None:
    """Move corrupt checkpoint to a dated archive rather than deleting it."""
    archive_path = CHECKPOINT_FILE.with_suffix(
        f'.corrupt.\${datetime.now().strftime("%Y%m%d_%H%M%S")}'
    )
    CHECKPOINT_FILE.rename(archive_path)
    log.warning('Archived corrupt checkpoint to: \${s}', str(archive_path))`}</CodeBox>
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

        <CodeBox label="pipeline/extract.py — chunked server-side cursor extraction">{`import logging
from datetime import datetime, timezone, timedelta
from typing import Iterator

import psycopg2
import psycopg2.extras

from .config import config
from .checkpoint import load_watermark

log = logging.getLogger(__name__)

# Columns we extract — explicit projection, never SELECT *
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
    WHERE updated_at > %s
      AND updated_at <= %s
    ORDER BY updated_at ASC, order_id ASC
"""


def get_source_now(conn) -> datetime:
    """
    Get current time from the SOURCE database, not from this server.
    Prevents clock skew between pipeline server and source DB.
    Always use this as the extraction upper bound.
    """
    with conn.cursor() as cur:
        cur.execute("SELECT NOW() AT TIME ZONE 'UTC'")
        result = cur.fetchone()[0]
        return result.replace(tzinfo=timezone.utc)


def extract_changed_rows(conn) -> Iterator[tuple[list[dict], datetime, datetime]]:
    """
    Extract rows changed since the last watermark in batches.
    Yields (batch_rows, batch_since, batch_until) tuples.

    Uses a PostgreSQL server-side cursor so the entire result set
    is NOT loaded into memory at once — each batch fetches BATCH_SIZE rows.
    Total memory usage: O(BATCH_SIZE) regardless of total result size.

    Applies an overlap window (overlap_minutes) extending the lower bound
    back to catch rows that arrived late due to application-side delays.
    """
    since_raw = load_watermark()
    until     = get_source_now(conn)

    # Apply overlap: extend lower bound back to catch late arrivals
    since = since_raw - timedelta(minutes=config.overlap_minutes)

    log.info(
        'Extracting rows updated \${s} → \${s} (overlap: \${d} min)',
        since.isoformat(), until.isoformat(), config.overlap_minutes,
    )

    # Server-side cursor: PostgreSQL streams rows to us in batches
    # rather than loading the full result into memory
    cursor_name = 'orders_extract_cursor'
    with conn.cursor(cursor_name, cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute(EXTRACT_SQL, (since, until))

        batch_num   = 0
        total_rows  = 0

        while True:
            rows = cur.fetchmany(config.batch_size)
            if not rows:
                break

            batch_num  += 1
            total_rows += len(rows)
            batch = [dict(row) for row in rows]

            log.info(
                'Extracted batch \${d}: \${d} rows (total so far: \${d})',
                batch_num, len(batch), total_rows,
            )
            yield batch, since_raw, until

    log.info(
        'Extraction complete: \${d} batches, \${d} total rows',
        batch_num, total_rows,
    )


def get_source_connection():
    """
    Create a read-only PostgreSQL connection with a query timeout.
    query timeout prevents runaway queries from holding connections.
    """
    conn = psycopg2.connect(
        config.source_db_url,
        options='-c statement_timeout=300000',  # 5-minute statement timeout
    )
    conn.set_session(readonly=True, autocommit=True)
    return conn`}</CodeBox>
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

        <CodeBox label="pipeline/validate.py — row-level validation with DLQ routing">{`import json
import logging
from datetime import datetime, timezone
from decimal import Decimal, InvalidOperation
from pathlib import Path
from typing import NamedTuple

from .config import config

log = logging.getLogger(__name__)

VALID_STATUSES = frozenset({
    'placed', 'confirmed', 'preparing', 'ready',
    'picked_up', 'delivering', 'delivered', 'cancelled',
})

VALID_PAYMENT_METHODS = frozenset({
    'upi', 'card', 'netbanking', 'wallet', 'cod', 'emi',
})


class ValidationResult(NamedTuple):
    is_valid: bool
    row:      dict | None   # cleaned row if valid, None if invalid
    error:    str | None    # error description if invalid


def validate_row(raw: dict) -> ValidationResult:
    """
    Validate and lightly normalise one order row.
    Pure function: no I/O, fully deterministic, easy to test.

    Returns ValidationResult(is_valid=True, row=clean_row) on success.
    Returns ValidationResult(is_valid=False, error=reason) on failure.
    """
    # ── Required field checks ───────────────────────────────────────────────────
    if not raw.get('order_id'):
        return ValidationResult(False, None, 'missing_order_id')

    if not raw.get('customer_id'):
        return ValidationResult(False, None, f'missing_customer_id for order \${raw["order_id"]}')

    # ── Amount validation ────────────────────────────────────────────────────────
    raw_amount = raw.get('order_amount')
    if raw_amount is None:
        return ValidationResult(False, None, f'null_order_amount for order \${raw["order_id"]}')

    try:
        amount = Decimal(str(raw_amount))
    except InvalidOperation:
        return ValidationResult(False, None,
            f'non_numeric_order_amount: \${raw_amount!r} for order \${raw["order_id"]}')

    if amount < 0:
        return ValidationResult(False, None,
            f'negative_order_amount: \${amount} for order \${raw["order_id"]}')

    if amount > Decimal('500000'):   # ₹5 lakh — suspiciously large
        return ValidationResult(False, None,
            f'suspiciously_large_amount: \${amount} for order \${raw["order_id"]}')

    # ── Status validation ────────────────────────────────────────────────────────
    raw_status = raw.get('status', '')
    status = str(raw_status).lower().strip() if raw_status else ''
    if status not in VALID_STATUSES:
        return ValidationResult(False, None,
            f'invalid_status: \${raw_status!r} for order \${raw["order_id"]}')

    # ── Timestamp validation ─────────────────────────────────────────────────────
    created_at = raw.get('created_at')
    updated_at = raw.get('updated_at')

    if not created_at or not updated_at:
        return ValidationResult(False, None,
            f'missing_timestamp for order \${raw["order_id"]}')

    # updated_at must be >= created_at
    if hasattr(updated_at, 'tzinfo') and hasattr(created_at, 'tzinfo'):
        if updated_at < created_at:
            return ValidationResult(False, None,
                f'updated_at before created_at for order \${raw["order_id"]}')

    # ── Payment method (optional but validated if present) ──────────────────────
    payment_method = raw.get('payment_method')
    if payment_method is not None:
        norm_method = str(payment_method).lower().strip()
        if norm_method not in VALID_PAYMENT_METHODS:
            # Non-fatal: log but accept the row (new payment methods get added)
            log.warning('Unknown payment_method \${s!r} for order \${s}',
                        payment_method, raw['order_id'])
            norm_method = 'unknown'
    else:
        norm_method = None

    # ── Build clean row ──────────────────────────────────────────────────────────
    clean = {
        'order_id':           int(raw['order_id']),
        'customer_id':        int(raw['customer_id']),
        'store_id':           str(raw.get('store_id') or ''),
        'restaurant_id':      raw.get('restaurant_id'),
        'order_amount':       float(amount),
        'delivery_fee':       float(Decimal(str(raw.get('delivery_fee') or 0))),
        'discount_amount':    float(Decimal(str(raw.get('discount_amount') or 0))),
        'status':             status,
        'payment_method':     norm_method,
        'payment_status':     (raw.get('payment_status') or '').lower() or None,
        'created_at':         created_at,
        'updated_at':         updated_at,
        'delivered_at':       raw.get('delivered_at'),
        'cancelled_at':       raw.get('cancelled_at'),
        'cancellation_reason': raw.get('cancellation_reason'),
        'promo_code':         raw.get('promo_code'),
        'ingested_at':        datetime.now(timezone.utc),
    }

    return ValidationResult(True, clean, None)


class DLQWriter:
    """Writes invalid rows to a NDJSON dead letter queue file."""

    def __init__(self, run_id: str):
        self.path = config.dlq_dir / f'orders_\${run_id}.ndjson'
        self._count = 0

    def write(self, raw_row: dict, error: str) -> None:
        with open(self.path, 'a') as f:
            f.write(json.dumps({
                'error':      error,
                'row':        {k: str(v) for k, v in raw_row.items()},
                'rejected_at': datetime.now(timezone.utc).isoformat(),
            }) + '\n')
        self._count += 1

    @property
    def count(self) -> int:
        return self._count


def validate_batch(
    raw_rows: list[dict],
    dlq: DLQWriter,
) -> list[dict]:
    """
    Validate a batch of rows.
    Returns only valid, cleaned rows.
    Writes invalid rows to the DLQ.
    Never raises — handles all errors per-row.
    """
    valid_rows = []
    for raw in raw_rows:
        result = validate_row(raw)
        if result.is_valid:
            valid_rows.append(result.row)
        else:
            dlq.write(raw, result.error)

    rejection_rate = 1 - len(valid_rows) / max(len(raw_rows), 1)
    if rejection_rate > 0.05:   # Alert if > 5% rejected
        log.warning(
            'High rejection rate: \${:.1%} (\${d} of \${d} rows rejected)',
            rejection_rate, dlq.count, len(raw_rows),
        )

    return valid_rows`}</CodeBox>
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

        <CodeBox label="pipeline/transform.py — pure transformation functions">{`from datetime import datetime, timezone
from decimal import Decimal


def enrich_order(row: dict) -> dict:
    """
    Apply business enrichment to a validated order row.
    Pure function: same input always produces same output.
    No I/O, no external calls.
    """
    enriched = row.copy()

    # ── Compute total value (order + delivery - discount) ──────────────────────
    enriched['total_value'] = round(
        row['order_amount'] + row['delivery_fee'] - row['discount_amount'],
        2,
    )

    # ── Classify order value tier ──────────────────────────────────────────────
    amount = row['order_amount']
    if amount >= 2000:
        enriched['order_tier'] = 'premium'
    elif amount >= 500:
        enriched['order_tier'] = 'standard'
    else:
        enriched['order_tier'] = 'economy'

    # ── Extract date parts for partitioning and reporting ─────────────────────
    created = row.get('created_at')
    if created and hasattr(created, 'date'):
        enriched['order_date']  = created.date()
        enriched['order_hour']  = created.hour
        enriched['order_month'] = created.strftime('%Y-%m')
    else:
        enriched['order_date']  = None
        enriched['order_hour']  = None
        enriched['order_month'] = None

    # ── Compute delivery duration in minutes ───────────────────────────────────
    delivered_at = row.get('delivered_at')
    if created and delivered_at and hasattr(delivered_at, 'date'):
        delta = delivered_at - created
        enriched['delivery_minutes'] = round(delta.total_seconds() / 60, 1)
    else:
        enriched['delivery_minutes'] = None

    # ── Classify cancellation as customer vs system ────────────────────────────
    reason = row.get('cancellation_reason') or ''
    if row['status'] == 'cancelled':
        system_reasons = {'payment_failed', 'restaurant_closed', 'no_rider_available'}
        enriched['cancellation_type'] = (
            'system' if reason.lower() in system_reasons else 'customer'
        )
    else:
        enriched['cancellation_type'] = None

    # ── Promo flag ─────────────────────────────────────────────────────────────
    enriched['has_promo'] = bool(row.get('promo_code'))

    return enriched


def transform_batch(rows: list[dict]) -> list[dict]:
    """Apply enrichment to every row in a batch."""
    return [enrich_order(row) for row in rows]


# ── Destination schema — what columns land in Snowflake ──────────────────────
DEST_COLUMNS = [
    'order_id', 'customer_id', 'store_id', 'restaurant_id',
    'order_amount', 'delivery_fee', 'discount_amount', 'total_value',
    'status', 'payment_method', 'payment_status',
    'order_tier', 'order_date', 'order_hour', 'order_month',
    'delivery_minutes', 'cancellation_type', 'cancellation_reason',
    'has_promo', 'promo_code',
    'created_at', 'updated_at', 'delivered_at', 'cancelled_at',
    'ingested_at',
]


def project_to_dest_schema(row: dict) -> dict:
    """
    Ensure only destination columns are included.
    Drops any extra columns from the transformation layer.
    Returns None for any missing destination columns.
    """
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
          via COPY, then MERGE to the destination in one atomic SQL statement.
        </Para>

        <CodeBox label="pipeline/load.py — staging table merge pattern for Snowflake">{`import csv
import io
import logging
import tempfile
from typing import Sequence

import snowflake.connector
from snowflake.connector.pandas_tools import write_pandas
import pandas as pd

from .config import config
from .transform import DEST_COLUMNS

log = logging.getLogger(__name__)

# ── Upsert SQL: MERGE staging → destination ────────────────────────────────────
MERGE_SQL = f"""
MERGE INTO {config.dest_schema}.{config.dest_table} AS target
USING (SELECT * FROM {config.dest_schema}.orders_staging) AS source
ON target.order_id = source.order_id
WHEN MATCHED
  AND target.updated_at < source.updated_at   -- only update if source is newer
THEN UPDATE SET
    {', '.join(
        f'{col} = source.{col}'
        for col in DEST_COLUMNS
        if col != 'order_id'
    )}
WHEN NOT MATCHED THEN
    INSERT ({', '.join(DEST_COLUMNS)})
    VALUES ({', '.join(f'source.{col}' for col in DEST_COLUMNS)});
"""


def get_dest_connection():
    """Create Snowflake connection with reasonable defaults."""
    return snowflake.connector.connect(
        connection_string=config.dest_db_url,
        network_timeout=120,
        login_timeout=60,
    )


def upsert_batch(rows: list[dict], conn) -> int:
    """
    Upsert a batch of rows into silver.orders via staging table merge.

    Strategy:
      1. Write rows to a Snowflake temporary staging table using write_pandas
         (fast bulk load via Snowflake's PUT + COPY INTO)
      2. MERGE staging → destination (atomic, one SQL statement)
      3. Drop staging table

    This is 10-100× faster than row-by-row upserts for large batches.
    write_pandas uses Snowflake's internal stage for fast bulk upload.
    """
    if not rows:
        return 0

    df = pd.DataFrame(rows, columns=DEST_COLUMNS)

    # ── Step 1: bulk load to staging ───────────────────────────────────────────
    # write_pandas creates the staging table automatically from DataFrame schema
    success, nchunks, nrows, output = write_pandas(
        conn        = conn,
        df          = df,
        table_name  = 'orders_staging',
        schema      = config.dest_schema,
        overwrite   = True,      # replace staging on every call
        auto_create_table = True,
        use_logical_type  = True,
    )

    if not success:
        raise RuntimeError(f'write_pandas failed: \${output}')

    log.info('Staged \${d} rows in \${d} chunks', nrows, nchunks)

    # ── Step 2: MERGE staging → destination ────────────────────────────────────
    with conn.cursor() as cur:
        cur.execute(MERGE_SQL)
        # Snowflake MERGE returns affected rows in query result
        result      = cur.fetchone()
        rows_inserted = result[0] if result else 0
        rows_updated  = result[1] if result and len(result) > 1 else 0

    log.info('Merge complete: \${d} inserted, \${d} updated', rows_inserted, rows_updated)

    # ── Step 3: cleanup staging ────────────────────────────────────────────────
    with conn.cursor() as cur:
        cur.execute(f'DROP TABLE IF EXISTS {config.dest_schema}.orders_staging')

    return nrows


def ensure_dest_table_exists(conn) -> None:
    """
    Create the destination table if it does not exist.
    Idempotent — safe to call on every pipeline start.
    """
    create_sql = f"""
    CREATE TABLE IF NOT EXISTS {config.dest_schema}.{config.dest_table} (
        order_id            BIGINT        NOT NULL COMMENT 'Primary key from source',
        customer_id         BIGINT        NOT NULL,
        store_id            VARCHAR(50),
        restaurant_id       BIGINT,
        order_amount        FLOAT         NOT NULL,
        delivery_fee        FLOAT         NOT NULL DEFAULT 0,
        discount_amount     FLOAT         NOT NULL DEFAULT 0,
        total_value         FLOAT,
        status              VARCHAR(30)   NOT NULL,
        payment_method      VARCHAR(30),
        payment_status      VARCHAR(30),
        order_tier          VARCHAR(20),
        order_date          DATE,
        order_hour          INTEGER,
        order_month         VARCHAR(7),
        delivery_minutes    FLOAT,
        cancellation_type   VARCHAR(20),
        cancellation_reason VARCHAR(500),
        has_promo           BOOLEAN       DEFAULT FALSE,
        promo_code          VARCHAR(100),
        created_at          TIMESTAMP_TZ  NOT NULL,
        updated_at          TIMESTAMP_TZ  NOT NULL,
        delivered_at        TIMESTAMP_TZ,
        cancelled_at        TIMESTAMP_TZ,
        ingested_at         TIMESTAMP_TZ  NOT NULL,
        CONSTRAINT pk_orders PRIMARY KEY (order_id)
    )
    CLUSTER BY (order_date, store_id);
    """
    with conn.cursor() as cur:
        cur.execute(create_sql)
    log.info('Destination table verified: \${s}.\${s}',
             config.dest_schema, config.dest_table)`}</CodeBox>
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

        <CodeBox label="pipeline/observability.py — structured logging and run tracking">{`import json
import logging
import sys
import time
import uuid
from datetime import datetime, timezone
from typing import Any

from .config import config


# ── Structured JSON logging ────────────────────────────────────────────────────

class StructuredFormatter(logging.Formatter):
    """Emit logs as single-line JSON for easy parsing by log aggregators."""

    def format(self, record: logging.LogRecord) -> str:
        log_data = {
            'ts':        datetime.now(timezone.utc).isoformat(),
            'level':     record.levelname,
            'logger':    record.name,
            'msg':       record.getMessage(),
            'pipeline':  'orders_incremental',
            'env':       config.environment,
        }
        if record.exc_info:
            log_data['exception'] = self.formatException(record.exc_info)
        return json.dumps(log_data)


def setup_logging() -> None:
    """Configure structured JSON logging for the pipeline."""
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(StructuredFormatter())
    root = logging.getLogger()
    root.setLevel(config.log_level)
    root.addHandler(handler)


# ── Pipeline run context ───────────────────────────────────────────────────────

class PipelineRun:
    """
    Tracks state for one pipeline execution.
    Used as a context manager — automatically records start/end to monitoring table.
    """

    def __init__(self, run_date: str):
        self.run_id        = str(uuid.uuid4())
        self.run_date      = run_date
        self.started_at    = datetime.now(timezone.utc)
        self.rows_extracted = 0
        self.rows_written  = 0
        self.rows_rejected = 0
        self.batches       = 0
        self.status        = 'running'
        self.error_message: str | None = None
        self._start_time   = time.monotonic()
        self.log           = logging.getLogger('pipeline_run')

        self.log.info(
            'Pipeline run started',
            extra={'run_id': self.run_id, 'run_date': run_date}
        )

    @property
    def duration_seconds(self) -> float:
        return round(time.monotonic() - self._start_time, 2)

    @property
    def rejection_rate(self) -> float:
        total = self.rows_extracted
        return (self.rows_rejected / total) if total > 0 else 0.0

    def complete(self) -> None:
        self.status = 'success'
        self.log.info(
            'Pipeline run complete: extracted=\${d} written=\${d} '
            'rejected=\${d} duration=\${.1f}s',
            self.rows_extracted, self.rows_written,
            self.rows_rejected, self.duration_seconds,
        )

    def fail(self, error: Exception) -> None:
        self.status        = 'failed'
        self.error_message = f'\${type(error).__name__}: \${error}'
        self.log.error(
            'Pipeline run FAILED after \${.1f}s: \${s}',
            self.duration_seconds, self.error_message,
        )

    def to_record(self) -> dict:
        return {
            'run_id':          self.run_id,
            'pipeline_name':   'orders_incremental',
            'run_date':        self.run_date,
            'started_at':      self.started_at.isoformat(),
            'finished_at':     datetime.now(timezone.utc).isoformat(),
            'status':          self.status,
            'rows_extracted':  self.rows_extracted,
            'rows_written':    self.rows_written,
            'rows_rejected':   self.rows_rejected,
            'duration_seconds': self.duration_seconds,
            'error_message':   self.error_message,
            'environment':     config.environment,
        }


def write_run_record(run: PipelineRun, dest_conn) -> None:
    """Write pipeline run metadata to the monitoring table."""
    record = run.to_record()
    columns = ', '.join(record.keys())
    placeholders = ', '.join(f'%({k})s' for k in record.keys())
    sql = f"""
        INSERT INTO {config.pipeline_run_table} ({columns})
        VALUES ({placeholders})
        ON CONFLICT (run_id) DO UPDATE SET
            finished_at     = EXCLUDED.finished_at,
            status          = EXCLUDED.status,
            rows_extracted  = EXCLUDED.rows_extracted,
            rows_written    = EXCLUDED.rows_written,
            rows_rejected   = EXCLUDED.rows_rejected,
            duration_seconds = EXCLUDED.duration_seconds,
            error_message   = EXCLUDED.error_message
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

        <CodeBox label="pipeline/main.py — the complete pipeline entrypoint">{`"""
orders_pipeline/pipeline/main.py

Daily incremental ingestion: PostgreSQL orders → Snowflake silver.orders
Schedule: every 15 minutes via Airflow
Run: python -m pipeline.main [--date YYYY-MM-DD]
"""

import logging
import sys
from datetime import date, datetime, timezone, timedelta

from .checkpoint    import load_watermark, save_watermark
from .config        import config
from .extract       import extract_changed_rows, get_source_connection
from .load          import get_dest_connection, upsert_batch, ensure_dest_table_exists
from .observability import PipelineRun, setup_logging, write_run_record
from .transform     import transform_batch, project_to_dest_schema
from .validate      import DLQWriter, validate_batch

setup_logging()
log = logging.getLogger('main')


def run_pipeline(run_date_str: str) -> PipelineRun:
    """
    Execute one pipeline run for run_date_str.
    Returns the PipelineRun object with final stats.
    """
    run = PipelineRun(run_date=run_date_str)
    source_conn = None
    dest_conn   = None

    try:
        # ── Setup connections ─────────────────────────────────────────────────
        log.info('Connecting to source and destination...')
        source_conn = get_source_connection()
        dest_conn   = get_dest_connection()
        ensure_dest_table_exists(dest_conn)

        dlq = DLQWriter(run_id=run.run_id)

        # ── Extract → validate → transform → load ─────────────────────────────
        last_successful_until = None

        for raw_batch, since, until in extract_changed_rows(source_conn):
            run.batches      += 1
            run.rows_extracted += len(raw_batch)

            # Validate (send bad rows to DLQ)
            valid_rows = validate_batch(raw_batch, dlq)
            run.rows_rejected += len(raw_batch) - len(valid_rows)

            if not valid_rows:
                log.warning('Batch \${d}: all \${d} rows rejected — skipping load',
                            run.batches, len(raw_batch))
                continue

            # Transform (pure — no I/O)
            enriched = transform_batch(valid_rows)
            projected = [project_to_dest_schema(row) for row in enriched]

            # Load (upsert to Snowflake)
            written = upsert_batch(projected, dest_conn)
            run.rows_written += written

            # Track the furthest 'until' we successfully processed
            last_successful_until = until

        # ── Advance checkpoint ONLY after all batches successfully written ────
        if last_successful_until is not None:
            save_watermark(last_successful_until)
        else:
            log.info('No rows extracted — checkpoint unchanged')

        # ── Post-run validation ────────────────────────────────────────────────
        if run.rejection_rate > 0.05:
            log.warning(
                'Rejection rate \${:.1%} exceeds 5%% threshold — investigate DLQ: \${s}',
                run.rejection_rate, str(dlq.path),
            )

        run.complete()

    except Exception as exc:
        run.fail(exc)
        raise   # re-raise so Airflow/cron marks the run as failed

    finally:
        # ── Always record the run, always close connections ───────────────────
        if dest_conn:
            try:
                write_run_record(run, dest_conn)
            except Exception as e:
                log.error('Failed to write run record: \${s}', str(e))
            finally:
                dest_conn.close()

        if source_conn:
            source_conn.close()

    return run


def main() -> None:
    """CLI entrypoint: python -m pipeline.main [run_date]"""
    import argparse
    parser = argparse.ArgumentParser(description='Orders incremental pipeline')
    parser.add_argument(
        '--date',
        default=date.today().isoformat(),
        help='Run date in YYYY-MM-DD format (default: today)',
    )
    args = parser.parse_args()

    run = run_pipeline(args.date)
    sys.exit(0 if run.status == 'success' else 1)


if __name__ == '__main__':
    main()`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 10 — Testing ─────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Testing" />
        <SectionTitle>Testing — Unit Tests for Every Transformation and Validation Rule</SectionTitle>

        <Para>
          Pure functions are a gift to testing. Because validate_row and
          enrich_order take data in and return data out with no side effects,
          they can be tested exhaustively with zero mocking and zero infrastructure.
          The test suite should cover every validation rule, every edge case, and
          every branch of the transformation logic.
        </Para>

        <CodeBox label="tests/test_validate.py — exhaustive unit tests for validation">{`"""Unit tests for pipeline/validate.py — run with: pytest tests/test_validate.py"""

import pytest
from datetime import datetime, timezone
from pipeline.validate import validate_row


# ── Fixtures ──────────────────────────────────────────────────────────────────

def valid_order(**overrides) -> dict:
    """Return a valid order row, optionally overriding specific fields."""
    base = {
        'order_id':       9284751,
        'customer_id':    4201938,
        'store_id':       'ST001',
        'restaurant_id':  None,
        'order_amount':   380.00,
        'delivery_fee':   40.00,
        'discount_amount': 0.00,
        'status':         'delivered',
        'payment_method': 'upi',
        'payment_status': 'captured',
        'created_at':     datetime(2026, 3, 17, 14, 0, 0, tzinfo=timezone.utc),
        'updated_at':     datetime(2026, 3, 17, 14, 32, 0, tzinfo=timezone.utc),
        'delivered_at':   datetime(2026, 3, 17, 14, 55, 0, tzinfo=timezone.utc),
        'cancelled_at':   None,
        'cancellation_reason': None,
        'promo_code':     None,
        'notes':          None,
    }
    return {**base, **overrides}


# ── Happy path ────────────────────────────────────────────────────────────────

def test_valid_order_passes():
    result = validate_row(valid_order())
    assert result.is_valid is True
    assert result.error is None
    assert result.row is not None
    assert result.row['order_id'] == 9284751
    assert result.row['status'] == 'delivered'


def test_status_is_lowercased():
    result = validate_row(valid_order(status='DELIVERED'))
    assert result.is_valid is True
    assert result.row['status'] == 'delivered'


def test_status_whitespace_trimmed():
    result = validate_row(valid_order(status='  delivered  '))
    assert result.is_valid is True
    assert result.row['status'] == 'delivered'


def test_amount_as_string_accepted():
    result = validate_row(valid_order(order_amount='380.00'))
    assert result.is_valid is True
    assert result.row['order_amount'] == 380.00


# ── Required field failures ───────────────────────────────────────────────────

def test_missing_order_id_fails():
    result = validate_row(valid_order(order_id=None))
    assert result.is_valid is False
    assert 'missing_order_id' in result.error


def test_zero_order_id_fails():
    result = validate_row(valid_order(order_id=0))
    assert result.is_valid is False


def test_missing_customer_id_fails():
    result = validate_row(valid_order(customer_id=None))
    assert result.is_valid is False
    assert 'missing_customer_id' in result.error


# ── Amount validation failures ────────────────────────────────────────────────

def test_null_amount_fails():
    result = validate_row(valid_order(order_amount=None))
    assert result.is_valid is False
    assert 'null_order_amount' in result.error


def test_negative_amount_fails():
    result = validate_row(valid_order(order_amount=-1.00))
    assert result.is_valid is False
    assert 'negative_order_amount' in result.error


def test_zero_amount_passes():
    # Zero-amount orders are valid (free promo orders)
    result = validate_row(valid_order(order_amount=0.00))
    assert result.is_valid is True


def test_non_numeric_amount_fails():
    result = validate_row(valid_order(order_amount='N/A'))
    assert result.is_valid is False
    assert 'non_numeric_order_amount' in result.error


def test_suspiciously_large_amount_fails():
    result = validate_row(valid_order(order_amount=600_000))
    assert result.is_valid is False
    assert 'suspiciously_large_amount' in result.error


# ── Status validation ─────────────────────────────────────────────────────────

@pytest.mark.parametrize('status', [
    'placed', 'confirmed', 'preparing', 'ready',
    'picked_up', 'delivering', 'delivered', 'cancelled',
])
def test_all_valid_statuses_pass(status):
    result = validate_row(valid_order(status=status))
    assert result.is_valid is True


def test_unknown_status_fails():
    result = validate_row(valid_order(status='refunded'))
    assert result.is_valid is False
    assert 'invalid_status' in result.error


def test_empty_status_fails():
    result = validate_row(valid_order(status=''))
    assert result.is_valid is False


# ── Timestamp validation ──────────────────────────────────────────────────────

def test_missing_created_at_fails():
    result = validate_row(valid_order(created_at=None))
    assert result.is_valid is False
    assert 'missing_timestamp' in result.error


def test_updated_before_created_fails():
    created = datetime(2026, 3, 17, 14, 0, 0, tzinfo=timezone.utc)
    updated = datetime(2026, 3, 17, 13, 0, 0, tzinfo=timezone.utc)  # earlier!
    result  = validate_row(valid_order(created_at=created, updated_at=updated))
    assert result.is_valid is False
    assert 'updated_at before created_at' in result.error`}</CodeBox>

        <CodeBox label="tests/test_transform.py — unit tests for transformation logic">{`"""Unit tests for pipeline/transform.py — run with: pytest tests/test_transform.py"""

import pytest
from datetime import datetime, timezone
from pipeline.transform import enrich_order


def base_row(**overrides) -> dict:
    row = {
        'order_id':       9284751,
        'customer_id':    4201938,
        'store_id':       'ST001',
        'restaurant_id':  None,
        'order_amount':   380.00,
        'delivery_fee':   40.00,
        'discount_amount': 20.00,
        'status':         'delivered',
        'payment_method': 'upi',
        'payment_status': 'captured',
        'created_at':     datetime(2026, 3, 17, 14, 0, 0, tzinfo=timezone.utc),
        'updated_at':     datetime(2026, 3, 17, 14, 32, 0, tzinfo=timezone.utc),
        'delivered_at':   datetime(2026, 3, 17, 14, 55, 0, tzinfo=timezone.utc),
        'cancelled_at':   None,
        'cancellation_reason': None,
        'promo_code':     None,
        'ingested_at':    datetime(2026, 3, 17, 15, 0, 0, tzinfo=timezone.utc),
    }
    return {**row, **overrides}


def test_total_value_computed_correctly():
    row = enrich_order(base_row(order_amount=380, delivery_fee=40, discount_amount=20))
    assert row['total_value'] == 400.00   # 380 + 40 - 20


def test_premium_order_tier():
    row = enrich_order(base_row(order_amount=2500))
    assert row['order_tier'] == 'premium'


def test_standard_order_tier():
    row = enrich_order(base_row(order_amount=750))
    assert row['order_tier'] == 'standard'


def test_economy_order_tier():
    row = enrich_order(base_row(order_amount=200))
    assert row['order_tier'] == 'economy'


def test_order_date_extracted():
    row = enrich_order(base_row())
    import datetime as dt
    assert row['order_date'] == dt.date(2026, 3, 17)


def test_order_hour_extracted():
    row = enrich_order(base_row())
    assert row['order_hour'] == 14  # 2 PM


def test_delivery_minutes_computed():
    created    = datetime(2026, 3, 17, 14,  0, 0, tzinfo=timezone.utc)
    delivered  = datetime(2026, 3, 17, 14, 55, 0, tzinfo=timezone.utc)
    row = enrich_order(base_row(created_at=created, delivered_at=delivered))
    assert row['delivery_minutes'] == 55.0


def test_delivery_minutes_none_when_not_delivered():
    row = enrich_order(base_row(delivered_at=None))
    assert row['delivery_minutes'] is None


def test_customer_cancellation_classified():
    row = enrich_order(base_row(status='cancelled', cancellation_reason='changed_mind'))
    assert row['cancellation_type'] == 'customer'


def test_system_cancellation_classified():
    row = enrich_order(base_row(
        status='cancelled',
        cancellation_reason='payment_failed',
    ))
    assert row['cancellation_type'] == 'system'


def test_non_cancelled_has_no_cancellation_type():
    row = enrich_order(base_row(status='delivered'))
    assert row['cancellation_type'] is None


def test_promo_flag_true_when_code_present():
    row = enrich_order(base_row(promo_code='SAVE10'))
    assert row['has_promo'] is True


def test_promo_flag_false_when_no_code():
    row = enrich_order(base_row(promo_code=None))
    assert row['has_promo'] is False`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 11 — Airflow DAG ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Scheduling" />
        <SectionTitle>Scheduling — Airflow DAG for 15-Minute Incremental Runs</SectionTitle>

        <Para>
          The pipeline runs every 15 minutes via an Airflow DAG. The DAG is
          intentionally minimal — Airflow's job is scheduling and monitoring,
          not business logic. All pipeline logic stays in the pipeline package.
          The DAG just invokes it.
        </Para>

        <CodeBox label="dags/orders_pipeline_dag.py — Airflow DAG definition">{`"""
Airflow DAG: orders_pipeline_incremental
Schedule: every 15 minutes
SLA: each run must complete within 10 minutes
Owner: data-team@freshmart.com
"""

from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.empty  import EmptyOperator
from airflow.utils.dates      import days_ago

# ── DAG default arguments ─────────────────────────────────────────────────────
default_args = {
    'owner':             'data-team',
    'depends_on_past':   False,     # each run is independent
    'email_on_failure':  True,
    'email_on_retry':    False,
    'email':             ['data-team@freshmart.com'],
    'retries':           2,
    'retry_delay':       timedelta(minutes=2),
    'retry_exponential_backoff': True,
    'execution_timeout': timedelta(minutes=10),   # kill if exceeds 10 min
}

# ── DAG definition ────────────────────────────────────────────────────────────
with DAG(
    dag_id             = 'orders_pipeline_incremental',
    default_args       = default_args,
    description        = 'FreshMart orders incremental ingestion (every 15 min)',
    schedule           = '*/15 * * * *',   # every 15 minutes
    start_date         = datetime(2026, 3, 1),
    catchup            = False,     # do not run missed intervals on deploy
    max_active_runs    = 1,         # prevent concurrent runs
    tags               = ['orders', 'ingestion', 'incremental', 'silver'],
) as dag:

    start = EmptyOperator(task_id='start')

    def run_pipeline(**context):
        """
        Invoke the pipeline package.
        context['logical_date'] is available but we use watermark-based
        extraction, not date-based — the DAG date is just for logging.
        """
        from pipeline.main import run_pipeline as _run
        run_date = context['logical_date'].strftime('%Y-%m-%d')
        result = _run(run_date)

        # Push stats to XCom for monitoring/alerting tasks
        context['ti'].xcom_push(key='rows_extracted', value=result.rows_extracted)
        context['ti'].xcom_push(key='rows_written',   value=result.rows_written)
        context['ti'].xcom_push(key='rows_rejected',  value=result.rows_rejected)
        context['ti'].xcom_push(key='duration_s',     value=result.duration_seconds)

        if result.status != 'success':
            raise RuntimeError(f'Pipeline run failed: \${result.error_message}')

    ingest = PythonOperator(
        task_id         = 'ingest_orders',
        python_callable = run_pipeline,
        sla             = timedelta(minutes=8),   # warn if exceeds 8 min
    )

    def check_row_count(**context):
        """Alert if row count is anomalous."""
        ti             = context['ti']
        rows_written   = ti.xcom_pull(task_ids='ingest_orders', key='rows_written')
        rows_rejected  = ti.xcom_pull(task_ids='ingest_orders', key='rows_rejected')

        if rows_rejected and rows_written:
            rejection_rate = rows_rejected / (rows_written + rows_rejected)
            if rejection_rate > 0.05:
                raise ValueError(
                    f'Rejection rate \${rejection_rate:.1%} exceeds 5%% threshold. '
                    f'Check DLQ: /data/dlq/'
                )

    quality_check = PythonOperator(
        task_id         = 'quality_check',
        python_callable = check_row_count,
    )

    end = EmptyOperator(task_id='end')

    start >> ingest >> quality_check >> end`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 12 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>The First Week With a New Pipeline — Common Early Problems</SectionTitle>

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
            Scenario — First week in production
          </div>

          <Para>
            The pipeline is deployed and running. The first three days surface three
            classic first-production-week issues. Here is how each one is diagnosed
            and fixed using the observability layer built into the pipeline.
          </Para>

          <CodeBox label="Three common first-week issues — diagnosis and fix">{`ISSUE 1 (Day 1, 09:00): Rejection rate alert fires — 12% rejection rate
  Airflow alert: quality_check task failed with "Rejection rate 12.3%"

  Diagnosis:
  # Check the DLQ file referenced in the alert:
  head -5 /data/dlq/orders_run-abc123.ndjson | python3 -m json.tool
  # Output:
  # {"error": "invalid_status: 'test_payment' for order 9284891", "row": {...}}
  # {"error": "invalid_status: 'test_payment' for order 9284892", "row": {...}}
  # → A load test is running against the orders system
  #   and 'test_payment' is a status that our validator rejects

  Fix:
  # Add 'test_payment' to VALID_STATUSES? No — these should be filtered.
  # Add a source-side filter to exclude test orders:
  # In extract.py, modify EXTRACT_SQL to add:
  #   AND NOT (notes ILIKE '%test%' OR status LIKE 'test_%')
  # Or: accept test_payment as a valid status but exclude from Gold models
  # Chosen: add source filter — test orders do not belong in silver layer

  Verification:
  # Re-run the pipeline manually:
  python -m pipeline.main --date 2026-03-17
  # Rejection rate: 0.0% ✓


ISSUE 2 (Day 2, 06:15): Pipeline SLA breach — took 14 minutes instead of SLA 10 min
  Airflow SLA miss email received.

  Diagnosis:
  # Query monitoring table:
  SELECT run_id, rows_extracted, rows_written, duration_seconds
  FROM monitoring.pipeline_runs
  WHERE pipeline_name = 'orders_incremental'
    AND started_at::DATE = '2026-03-18'
  ORDER BY started_at;

  # Results show 06:00 run:
  # rows_extracted=182,000  duration_seconds=847  (14 minutes!)
  # vs typical run: rows_extracted=2,000  duration_seconds=45s

  # 182k rows in one run → overnight backlog
  # The 00:00 – 05:45 runs all failed silently (found later: Snowflake maintenance window)
  # 06:00 run processed 5.75 hours of backlog → expected to be slow

  Fix:
  # Not a bug — the pipeline correctly recovered the backlog.
  # But the SLA was wrong: set execution_timeout=timedelta(minutes=30) for backfill runs
  # AND add a monitoring query that alerts on consecutive failures:
  SELECT COUNT(*) FROM monitoring.pipeline_runs
  WHERE pipeline_name = 'orders_incremental'
    AND status = 'failed'
    AND started_at > NOW() - INTERVAL '2 hours';
  # Alert if > 3 consecutive failures (catches the maintenance window earlier)


ISSUE 3 (Day 3, 11:30): Snowflake costs spike — 3× expected warehouse credits
  Finance Slack alert: "Snowflake costs higher than expected"

  Diagnosis:
  # Check Snowflake query history:
  SELECT query_text, total_elapsed_time/1000 AS seconds, credits_used_cloud_services
  FROM snowflake.account_usage.query_history
  WHERE start_time > DATEADD('day', -1, CURRENT_TIMESTAMP)
    AND warehouse_name = 'PIPELINE_WH'
  ORDER BY credits_used_cloud_services DESC
  LIMIT 10;

  # Top query: the MERGE SQL — running 96 times (every 15 minutes × 24 hours)
  # Each MERGE scans the entire silver.orders table for the ON condition match
  # silver.orders has 500M rows — full table scan 96 times/day = expensive

  Fix:
  # Add a micro-partition filter to the MERGE:
  # The MERGE condition must include a partition column filter to prune
  MERGE INTO silver.orders AS target
  USING orders_staging AS source
  ON target.order_id = source.order_id
     AND target.order_date >= DATEADD('day', -7, CURRENT_DATE)  -- ← ADD THIS
  ...
  # This restricts the MERGE scan to the last 7 days of partitions
  # (orders are almost never updated more than 7 days after creation)
  # Result: 96% micro-partition pruning → 25× reduction in compute cost`}</CodeBox>
        </div>
      </section>

      <Divider />

      {/* ── Part 13 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Interview Prep" />
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

If the checkpoint is saved after the destination write, and the checkpoint save fails or the process is killed between the write and the save, the next run starts from the previous checkpoint — before the data that was just written. It re-extracts and re-processes those rows. Because the destination uses upsert semantics (ON CONFLICT DO UPDATE), re-processing rows that already exist updates them to the same values — no duplicates, no corruption. This is exactly the idempotency principle: safe to rerun.

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

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
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
            fix: 'Check the success, nchunks, nrows, output tuple returned by write_pandas — raise an explicit RuntimeError if success is False. Add a retry: if the staging table does not exist after write_pandas, retry once with a fresh connection. Also configure the Snowflake warehouse with AUTO_RESUME = TRUE and AUTO_SUSPEND = 60 (1 minute idle) to ensure it is available for the pipeline runs. Add a pre-pipeline health check: verify the warehouse is running before starting extraction.',
          },
          {
            error: `Pipeline runs complete successfully but Silver table row count grows unexpectedly — 500k new rows per run instead of expected 2k`,
            cause: 'The overlap_minutes configuration is set to 60 minutes instead of 5 minutes. Every 15-minute run is re-extracting the last 60 minutes of data instead of just the last 5 minutes plus a small overlap. The upsert semantics prevent duplicates but the pipeline is doing 12× more work than necessary, re-processing 48k rows that were already correctly loaded.',
            fix: 'Set overlap_minutes=5 (or at most 10 for tables with high clock skew risk). Re-check the monitoring table: if rows_extracted is consistently 12× higher than rows_written minus rows_rejected, the overlap window is larger than necessary. The correct size for overlap_minutes is the 99th percentile data lateness for the source table — typically 1–5 minutes for well-maintained application code. Never set it to 60 minutes without justification.',
          },
          {
            error: `Airflow DAG max_active_runs=1 is not preventing concurrent runs — two pipeline instances are running simultaneously`,
            cause: 'The Airflow scheduler is configured with parallelism settings that override individual DAG max_active_runs limits, or the DAG was manually triggered while a scheduled run was already executing and the manual trigger bypassed the limit. In some Airflow versions, external triggers ignore max_active_runs.',
            fix: 'Add an explicit lock file as a secondary guard within the pipeline itself: check for /tmp/orders_pipeline.lock at startup and write the current PID; remove it at exit using a finally block. If the lock file exists and the PID is still running, exit immediately. This prevents concurrent runs regardless of how the pipeline was triggered. Also verify Airflow scheduler configuration: core.max_active_runs_per_dag should not override individual DAG settings.',
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
        'The Airflow DAG is a thin wrapper — all pipeline logic lives in the pipeline package. The DAG calls one function and pushes XCom metrics. This means the pipeline can be tested, run, and debugged independently of Airflow — python -m pipeline.main --date 2026-03-17.',
        'The three most common first-week issues: (1) unexpected rejections from unknown status values — inspect the DLQ, add source filter or update valid set; (2) slow runs from large backlogs after outages — add consecutive-failure monitoring to catch outages early; (3) unexpected Snowflake compute costs from MERGE full-table scans — add partition filter to the MERGE ON condition.',
      ]} />

    </LearnLayout>
  )
}