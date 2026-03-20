import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Idempotency, Atomicity, and Pipeline Restartability — Data Engineering | Chaduvuko',
  description:
    'The three properties that separate reliable pipelines from fragile ones — what idempotency and atomicity mean precisely, how to implement them at every layer, and how to design pipelines that recover automatically from any failure.',
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

export default function IdempotencyAtomicityModule() {
  return (
    <LearnLayout
      title="Idempotency, Atomicity, and Pipeline Restartability"
      description="The three properties that separate reliable pipelines from fragile ones — precise definitions, implementation at every layer, and automatic failure recovery."
      section="Data Engineering"
      readTime="60 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — Why These Three Properties ─────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Properties That Define Reliability" />
        <SectionTitle>Why These Three Properties Define the Difference Between a Pipeline and a Liability</SectionTitle>

        <Para>
          A pipeline that works is not the same as a pipeline that is reliable.
          A pipeline that runs successfully 95% of the time is not a pipeline — it
          is a source of data corruption and operational anxiety. The 5% of runs
          that fail are not just an inconvenience; they produce incomplete, partial,
          or duplicated data that analysts act on and decisions are made from.
        </Para>

        <Para>
          Three properties distinguish a reliable pipeline from a fragile one.
          Idempotency means running the pipeline multiple times with the same input
          always produces the same correct output — no duplicates, no data loss.
          Atomicity means each unit of work either completes fully or not at all —
          no partial states that leave the destination in an inconsistent condition.
          Restartability means a pipeline that fails at any point can resume from
          exactly where it stopped — no reprocessing data already written, no
          skipping data not yet written.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 16,
          }}>
            The three properties in one table
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              {
                name: 'Idempotency',
                color: '#00e676',
                question: 'Can I run this again safely?',
                guarantee: 'Running N times = running once. Same input always produces same correct output.',
                mechanism: 'Upserts + UNIQUE constraints + fixed extraction windows',
                violated: 'Plain INSERT without conflict handling → duplicates on rerun',
              },
              {
                name: 'Atomicity',
                color: '#7b61ff',
                question: 'Is the destination ever in a half-written state?',
                guarantee: 'Each unit of work either fully commits or fully rolls back. No partial writes visible to readers.',
                mechanism: 'Database transactions + staging table swap + write-then-rename for files',
                violated: 'Loop of individual INSERTs auto-committed → partial batch on crash',
              },
              {
                name: 'Restartability',
                color: '#f97316',
                question: 'If this fails at 3 AM, does it recover automatically?',
                guarantee: 'A failed pipeline resumes from exactly where it stopped — not from the beginning, not skipping ahead.',
                mechanism: 'Atomic checkpoints + idempotent writes + per-unit progress tracking',
                violated: 'No checkpoint → restart processes everything from scratch on every failure',
              },
            ].map((item) => (
              <div key={item.name} style={{
                background: 'var(--bg2)', border: `1px solid ${item.color}30`,
                borderTop: `3px solid ${item.color}`, borderRadius: 10, padding: '16px 18px',
              }}>
                <div style={{
                  fontSize: 14, fontWeight: 800, color: item.color,
                  fontFamily: 'var(--font-display)', marginBottom: 8,
                }}>{item.name}</div>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: 'var(--muted)',
                  fontFamily: 'var(--font-mono)', marginBottom: 4,
                }}>{item.question}</div>
                <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6, marginBottom: 8 }}>
                  {item.guarantee}
                </div>
                <div style={{ fontSize: 11, color: item.color, marginBottom: 6, fontFamily: 'var(--font-mono)' }}>
                  ✓ {item.mechanism}
                </div>
                <div style={{ fontSize: 11, color: '#ff4757', fontFamily: 'var(--font-mono)' }}>
                  ✗ {item.violated}
                </div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <Callout type="info">
          These three properties are not independent. Idempotency enables
          restartability — if reruns are safe, a failed pipeline can restart from
          any checkpoint without risk. Atomicity supports idempotency — atomic
          commits prevent partial states that make reruns produce different results.
          Together they form the correctness foundation of every production pipeline.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 — Idempotency In Depth ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Idempotency" />
        <SectionTitle>Idempotency — Every Form It Takes in Data Engineering</SectionTitle>

        <Para>
          In mathematics, a function f is idempotent if f(f(x)) = f(x) — applying
          it twice gives the same result as applying it once. In data engineering,
          an idempotent pipeline run produces the same destination state whether it
          executes once or twenty times for the same input parameters. This property
          is not optional — it is the difference between a pipeline that can be
          operated and one that requires a human to babysit every rerun.
        </Para>

        <SubTitle>The three forms of idempotency a pipeline needs</SubTitle>

        <CodeBox label="Idempotency at the write layer — upserts and UNIQUE constraints">{`# ── FORM 1: WRITE-LAYER IDEMPOTENCY ─────────────────────────────────────────
# Every write operation to the destination must be idempotent.
# The mechanism: upsert (INSERT with conflict handling) + UNIQUE constraint.

# BAD: plain INSERT — NOT idempotent
INSERT INTO silver.orders (order_id, status, amount)
VALUES (9284751, 'delivered', 380.00);
-- Run this twice → two rows with order_id = 9284751
-- Run after a failure and partial write → inconsistent duplicates

# GOOD: upsert — idempotent
INSERT INTO silver.orders (order_id, status, amount, updated_at, ingested_at)
VALUES (9284751, 'delivered', 380.00, '2026-03-17 20:14:32', NOW())
ON CONFLICT (order_id)
DO UPDATE SET
    status     = EXCLUDED.status,
    amount     = EXCLUDED.amount,
    updated_at = EXCLUDED.updated_at,
    ingested_at = NOW()
WHERE silver.orders.updated_at < EXCLUDED.updated_at;
-- The WHERE clause prevents overwriting newer data with older data.
-- Run this N times → exactly one row, always with the latest values.
-- REQUIRES: UNIQUE constraint or PRIMARY KEY on order_id.

-- Without the UNIQUE constraint, ON CONFLICT has nothing to conflict on:
-- PostgreSQL silently inserts a duplicate instead of updating.
-- Always verify:
SELECT constraint_name, constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'orders' AND constraint_type IN ('PRIMARY KEY', 'UNIQUE');


# ── FORM 2: EXTRACTION-LAYER IDEMPOTENCY ──────────────────────────────────────
# The extraction query must produce the same result for the same parameters.
# Fixed time windows, not relative windows.

# BAD: relative window — NOT idempotent
SELECT * FROM orders WHERE updated_at > NOW() - INTERVAL '15 minutes';
-- A run at 06:00 extracts data from 05:45.
-- A rerun at 06:10 extracts data from 05:55 — DIFFERENT DATA.
-- Rows between 05:45 and 05:55 are missed on the rerun.

# GOOD: fixed window from checkpoint — idempotent
# checkpoint = '2026-03-17 05:45:00'
# source_now  = '2026-03-17 06:00:00' (fixed at run start, stored in run record)
SELECT * FROM orders
WHERE updated_at > '2026-03-17 05:45:00'
  AND updated_at <= '2026-03-17 06:00:00';
-- Run this at 06:00 or 06:10 or 06:30 — always extracts the same rows.
-- The upper bound is fixed when the run starts, not re-computed on retry.


# ── FORM 3: FILE-OUTPUT IDEMPOTENCY ────────────────────────────────────────────
# Writing files to S3 or a data lake must be idempotent.

# BAD: append to existing file — NOT idempotent
# with open('s3://bucket/orders/2026-03-17.csv', 'a') as f:
#     f.write(new_rows)   # rerun appends duplicate rows to same file

# GOOD: overwrite partition — idempotent
df.write \
    .mode('overwrite') \             # replace the partition, never append
    .partitionBy('order_date') \
    .parquet('s3://freshmart-lake/silver/orders')
# Rerunning for 2026-03-17 overwrites the date=2026-03-17 partition.
# The output is identical regardless of how many times it runs.

# GOOD: include run_id in filename — idempotent per run
# output_path = f's3://bucket/orders/date=2026-03-17/run-{run_id}.parquet'
# If run succeeds: file exists with correct data.
# If run reruns (new run_id): new file written, old cleaned up by compaction.
# Downstream reads the partition (all files in date=2026-03-17/) — correct.`}</CodeBox>

        <SubTitle>Idempotency keys — the pattern for APIs and message systems</SubTitle>

        <CodeBox label="Idempotency keys — preventing duplicate processing in event-driven pipelines">{`# When a pipeline calls an external API or writes to a message queue,
# the operation may be delivered more than once (at-least-once delivery).
# Idempotency keys prevent the duplicate from having side effects.

# ── SENDING TO AN API WITH IDEMPOTENCY KEY ────────────────────────────────────
import hashlib, json, requests

def create_payment_idempotency_key(payment_id: str, amount: float, ts: str) -> str:
    """
    Generate a deterministic idempotency key from the operation's unique inputs.
    Same inputs → same key every time → API recognises duplicate and ignores it.
    """
    payload = f'\${payment_id}:\${amount}:\${ts}'
    return hashlib.sha256(payload.encode()).hexdigest()[:32]

idempotency_key = create_payment_idempotency_key('pay_xxx', 380.00, '2026-03-17T20:14:32Z')

response = requests.post(
    'https://api.razorpay.com/v1/payments',
    headers={
        'X-Idempotency-Key': idempotency_key,
        'Authorization':     f'Bearer \${api_key}',
    },
    json={'amount': 38000, 'currency': 'INR'},
)
# If this request is retried with the same idempotency key:
# Razorpay returns the SAME response as the first successful call.
# The payment is NOT created twice. ✓


# ── CONSUMER-SIDE IDEMPOTENCY — TRACKING PROCESSED EVENT IDs ─────────────────
# When consuming from Kafka or a webhook, the same event may arrive twice.
# Track processed event IDs to detect and skip duplicates.

# Simple in-memory set (for single-process consumers):
processed_ids: set[str] = set()

def process_event(event: dict) -> None:
    event_id = event['event_id']  # or source.lsn for CDC events

    if event_id in processed_ids:
        log.info('Duplicate event \${s} — skipping', event_id)
        return

    # Process the event
    upsert_to_silver(event)
    processed_ids.add(event_id)

# Distributed in-memory (Redis SET NX — for multi-process consumers):
def is_duplicate(event_id: str, redis_client) -> bool:
    """
    Returns True if this event was already processed.
    SET NX: set if not exists — atomic, safe for concurrent consumers.
    """
    # nx=True: only set if key does not exist
    # ex=86400: expire after 24 hours (events older than 24h assumed unique)
    result = redis_client.set(
        f'processed:\${event_id}',
        '1',
        nx=True,
        ex=86400,
    )
    return result is None   # None = key already existed = duplicate


# ── DATABASE-LEVEL IDEMPOTENCY TRACKING ───────────────────────────────────────
# For pipelines that must guarantee exactly-once processing:
# Record processed event IDs in the destination database.

CREATE TABLE IF NOT EXISTS pipeline.processed_events (
    event_id    VARCHAR(100) PRIMARY KEY,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    pipeline     VARCHAR(100) NOT NULL
);

-- Before processing each event:
INSERT INTO pipeline.processed_events (event_id, pipeline)
VALUES ('evt_xxx', 'orders_cdc')
ON CONFLICT (event_id) DO NOTHING
RETURNING event_id;
-- If returns a row: first time seeing this event → process it
-- If returns nothing: duplicate → skip it`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — Atomicity In Depth ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Atomicity" />
        <SectionTitle>Atomicity — No Partial States, Ever</SectionTitle>

        <Para>
          Atomicity in a pipeline means each logical unit of work either completes
          fully or leaves no trace. The destination never contains partial results
          that represent an incomplete operation — never half a batch, never a
          truncated table that lost its data, never a file that was 60% written
          when the process was killed.
        </Para>

        <Para>
          The challenge is that most pipeline operations span multiple steps.
          Truncating a table and reloading it are two steps. Writing a Parquet
          file and moving it to the final location are two steps. Updating a row
          and recording the event are two steps. Atomicity is about making these
          multi-step operations appear as a single indivisible unit.
        </Para>

        <SubTitle>Atomicity at the database layer</SubTitle>

        <CodeBox label="Database atomicity — transactions, batch inserts, and staging swaps">{`# ── TRANSACTION BATCHING ───────────────────────────────────────────────────────
# Every write to a relational database should be batched in a transaction.
# Without transactions, each row auto-commits individually.

# BAD: auto-commit per row — NOT atomic
conn.autocommit = True   # default in many drivers
for row in rows:
    cur.execute("INSERT INTO silver.orders ...", row)
# If process crashes after row 23,000 of 50,000:
# 23,000 rows in destination, 27,000 missing. No way to know where to restart.

# GOOD: batch transaction — atomic
conn.autocommit = False   # explicit transaction management
with conn:   # context manager: commits on exit, rolls back on exception
    for row in rows:
        cur.execute("INSERT INTO silver.orders ...", row)
    # If crash: entire batch rolled back. Destination unchanged. Rerun = correct.

# EVEN BETTER: executemany for bulk insert (10-100× faster than row loop):
with conn:
    psycopg2.extras.execute_values(
        cur,
        "INSERT INTO silver.orders (order_id, status, amount) VALUES %s "
        "ON CONFLICT (order_id) DO UPDATE SET "
        "status = EXCLUDED.status, amount = EXCLUDED.amount",
        [(row['order_id'], row['status'], row['amount']) for row in rows],
        page_size=5000,   # rows per INSERT statement
    )

# SNOWFLAKE: every statement is auto-committed unless inside explicit transaction
# For multi-statement atomicity in Snowflake:
conn.execute("BEGIN")
conn.execute("INSERT INTO silver.orders_staging ...")
conn.execute("MERGE INTO silver.orders USING silver.orders_staging ...")
conn.execute("DROP TABLE silver.orders_staging")
conn.execute("COMMIT")
# On any error: conn.execute("ROLLBACK")


# ── STAGING TABLE SWAP — zero-downtime full reload ─────────────────────────────
# For full-load pipelines: write to new table, then atomically swap.
# The OLD table serves queries until the instant of swap.

# PostgreSQL (DDL is transactional — rare among databases):
with conn:
    # Step 1: load new data into staging (queries still hit old table)
    cur.execute("CREATE TABLE silver.store_master_new AS "
                "SELECT * FROM source.stores")

    # Step 2: atomic swap — both renames in same transaction
    cur.execute("ALTER TABLE silver.store_master RENAME TO store_master_old")
    cur.execute("ALTER TABLE silver.store_master_new RENAME TO store_master")
    # ↑ From this line forward, ALL queries see new data.
    # Zero window where the table is empty or has partial data.

    # Step 3: drop old (still in same transaction — safe)
    cur.execute("DROP TABLE silver.store_master_old")
# COMMIT: rename becomes permanent. Readers see clean transition.

# What readers see:
# Before transaction commits: store_master_old (old data)
# After transaction commits:  store_master (new data)
# During transaction:         store_master_old (due to MVCC)
# NEVER: empty table, partial table, two tables simultaneously

# Snowflake equivalent (atomic DDL):
conn.execute("CREATE TABLE silver.store_master_new AS SELECT * FROM source.stores")
conn.execute("ALTER TABLE silver.store_master SWAP WITH silver.store_master_new")
# SWAP is atomic in Snowflake — instant switch, no downtime
conn.execute("DROP TABLE silver.store_master_new")`}</CodeBox>

        <SubTitle>Atomicity for file operations</SubTitle>

        <CodeBox label="File-level atomicity — write-then-rename and staged writes">{`# Files cannot be partially written and remain consistent.
# A file being written can be observed in an incomplete state
# by other processes unless atomicity is enforced explicitly.

# ── WRITE-THEN-RENAME (the standard pattern) ──────────────────────────────────
import os
from pathlib import Path

def write_parquet_atomically(df, final_path: str) -> None:
    """
    Write a DataFrame to Parquet atomically.
    Other processes never see a partial file.
    """
    final = Path(final_path)
    tmp   = final.with_suffix('.tmp.parquet')

    try:
        # Write to temporary location (potentially slow)
        df.to_parquet(tmp, compression='zstd', index=False)

        # Rename to final location (atomic on POSIX filesystems)
        # On local filesystems: guaranteed atomic if same filesystem
        tmp.rename(final)
        # ↑ This is atomic: readers either see the old file or the new file.
        # They NEVER see a partial write.

    except Exception:
        # Clean up incomplete temp file on failure
        if tmp.exists():
            tmp.unlink()
        raise


# ── S3 ATOMIC WRITES ──────────────────────────────────────────────────────────
# S3 PUT operations are atomic for a single object — either the full
# object exists or it does not. S3 does not expose partial uploads.
# However, multipart uploads (> 5 MB) have a non-atomic assembly step.

# SAFE: write complete file in one PUT (< 5 MB):
import boto3
s3 = boto3.client('s3')
s3.put_object(Bucket='freshmart-lake', Key='bronze/orders/part-001.parquet', Body=data)
# Atomic: readers see old key value or new key value, never partial content.

# SAFE: multipart upload with explicit completion:
# boto3 TransferManager handles multipart automatically and atomically.
# The CompleteMultipartUpload API call is atomic — file becomes visible
# only when ALL parts are committed.

# IMPORTANT: use a distinct temporary prefix for in-progress writes:
# Write to: s3://bucket/tmp/run-{run_id}/part-001.parquet
# Then copy: s3://bucket/bronze/orders/date=2026-03-17/part-001.parquet
# Then delete: s3://bucket/tmp/run-{run_id}/part-001.parquet
# Downstream readers only scan bronze/orders/date=2026-03-17/ — they
# never see partial in-progress files from the tmp/ prefix.


# ── DELTA LAKE ATOMICITY ───────────────────────────────────────────────────────
# Delta Lake uses a transaction log for atomic multi-file commits.
# Every Delta write is an atomic transaction at the table level.

# Writing 3 Parquet files to a Delta table:
# 1. Write all 3 Parquet files to the table directory (not yet visible)
# 2. Write a new entry to _delta_log/000000000000000042.json
#    containing references to all 3 files
# 3. The log entry is written atomically (single file PUT to S3)
# Once the log entry exists: ALL 3 files become visible simultaneously.
# If step 1 completes but step 2 fails: the 3 Parquet files exist
# but are invisible to readers (not referenced in any log entry).
# Next successful write: Delta VACUUM cleans up the unreferenced files.
# Result: no partial state ever visible to readers.`}</CodeBox>

        <SubTitle>Atomicity at the pipeline level — the two-phase pattern</SubTitle>

        <CodeBox label="Pipeline-level atomicity — write-validate-commit pattern">{`# A multi-step pipeline needs atomicity at the pipeline level, not just
# at individual writes. The write-validate-commit pattern achieves this.

# PATTERN: Write to staging → validate → atomically promote to production
# If validation fails: staging is deleted, production is unchanged.
# Readers always see either the old production data or the new production data.

def write_with_validation(
    rows: list[dict],
    dest_conn,
    run_id: str,
) -> None:
    """
    Write rows to production only if validation passes.
    Production table is never modified if validation fails.
    """
    staging_table = f'silver.orders_staging_{run_id.replace("-", "_")}'

    try:
        # ── Phase 1: Write to staging (can fail — production unaffected) ──────
        with dest_conn:
            dest_conn.execute(f'CREATE TABLE {staging_table} AS '
                              f'SELECT * FROM silver.orders WHERE 1=0')  # empty table, same schema
            psycopg2.extras.execute_values(
                dest_conn.cursor(),
                f'INSERT INTO {staging_table} VALUES %s',
                [tuple(row.values()) for row in rows],
            )

        # ── Phase 2: Validate staging data ────────────────────────────────────
        with dest_conn.cursor() as cur:
            # Check: no negative amounts
            cur.execute(f'SELECT COUNT(*) FROM {staging_table} WHERE order_amount < 0')
            if cur.fetchone()[0] > 0:
                raise ValueError('Staging has negative order amounts')

            # Check: no NULL required fields
            cur.execute(f'SELECT COUNT(*) FROM {staging_table} '
                        f'WHERE order_id IS NULL OR customer_id IS NULL')
            if cur.fetchone()[0] > 0:
                raise ValueError('Staging has NULL required fields')

            # Check: row count is reasonable (within 10% of last 7 days average)
            cur.execute("""
                SELECT AVG(daily_count) FROM (
                    SELECT DATE(ingested_at) AS day, COUNT(*) AS daily_count
                    FROM silver.orders
                    WHERE ingested_at > NOW() - INTERVAL '7 days'
                    GROUP BY 1
                ) counts
            """)
            avg_daily = cur.fetchone()[0] or 0
            staging_count = len(rows)
            if avg_daily > 0 and abs(staging_count - avg_daily) / avg_daily > 0.5:
                raise ValueError(
                    f'Staging row count \${staging_count} deviates >50%% from '
                    f'7-day average \${avg_daily:.0f}'
                )

        # ── Phase 3: Atomically promote staging to production ─────────────────
        with dest_conn:
            dest_conn.execute(f"""
                INSERT INTO silver.orders
                SELECT * FROM {staging_table}
                ON CONFLICT (order_id) DO UPDATE SET
                    status     = EXCLUDED.status,
                    order_amount = EXCLUDED.order_amount,
                    updated_at = EXCLUDED.updated_at,
                    ingested_at = EXCLUDED.ingested_at
                WHERE silver.orders.updated_at < EXCLUDED.updated_at
            """)

    except Exception:
        # Validation or promotion failed — staging still exists, production unchanged
        raise

    finally:
        # Always clean up staging regardless of success or failure
        try:
            dest_conn.execute(f'DROP TABLE IF EXISTS {staging_table}')
            dest_conn.commit()
        except Exception:
            pass   # best effort cleanup`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Restartability In Depth ────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Restartability" />
        <SectionTitle>Restartability — Automatic Recovery From Any Failure Point</SectionTitle>

        <Para>
          A restartable pipeline picks up exactly where it left off after any
          failure — at any point in the pipeline, at any time, with any reason
          for failure. No human involvement needed to determine what was processed,
          what was not, and what needs to be re-run. The pipeline figures this out
          automatically.
        </Para>

        <Para>
          Restartability requires two things: a checkpoint that records progress
          accurately, and idempotent writes that make re-processing safe. Without
          idempotency, restartability cannot be achieved — if re-running already-written
          data creates duplicates, you cannot restart from a checkpoint that includes
          any already-written data.
        </Para>

        <SubTitle>Granularity of checkpointing — coarse vs fine-grained</SubTitle>

        <CodeBox label="Checkpoint granularity — matching the cost of reprocessing">{`CHECKPOINT GRANULARITY: how much work is lost on failure and restarted?

COARSE-GRAINED (one checkpoint per full run):
  Save checkpoint at the END of the entire run.
  If run processes 10,000 rows and fails on row 9,847:
    → Checkpoint still shows the watermark from before this run started
    → Next run re-processes all 10,000 rows from scratch
  Cost: O(run_size) work lost on failure
  Complexity: low — one checkpoint write per run
  Use when: runs are fast (< 5 minutes), reprocessing is cheap

  from checkpoint import save_watermark
  # Inside run():
  extract_rows()
  transform_rows()
  load_rows()
  save_watermark(until)   # save only at end — all or nothing

MEDIUM-GRAINED (one checkpoint per batch):
  Save checkpoint after each batch of BATCH_SIZE rows.
  If run processes 10,000 rows in 10 batches and fails on batch 8:
    → Checkpoint shows end of batch 7 (7,000 rows processed)
    → Next run re-processes only batches 8-10 (3,000 rows)
  Cost: O(BATCH_SIZE) work lost on failure
  Complexity: medium — N checkpoint writes per run
  Use when: runs are long (> 10 minutes), batches are large

  batch_watermark = since   # start of this run
  for batch in extract_batches(since, until):
      transform_and_load(batch)
      batch_watermark = batch[-1]['updated_at']   # max updated_at in this batch
      save_watermark(batch_watermark)             # checkpoint after each batch
  # On failure during batch 8: checkpoint shows end of batch 7 watermark

FINE-GRAINED (one checkpoint per row group or file):
  Save checkpoint after writing each Parquet file or row group.
  If run fails mid-file:
    → Checkpoint shows last successfully written file
    → Next run continues from that file
  Cost: O(file_size) work lost on failure
  Complexity: high — many checkpoint writes, must track file inventory
  Use when: files are large (500 MB+), each file takes minutes to write

  # Used by Spark Structured Streaming automatically
  # checkpointLocation stores last committed offset after each trigger

SPARK CHECKPOINT SEMANTICS:
  Spark Structured Streaming saves checkpoint state after every trigger.
  If Spark crashes mid-trigger: the trigger is re-executed from its start.
  The trigger is the atomic unit — writes within one trigger are either
  all committed (if writeStream uses Delta with MERGE) or all rolled back.
  checkpointLocation stores:
    - Last committed Kafka offsets (where to resume reading from)
    - Aggregation state (for stateful streaming operations)
    - Metadata about the last committed batch`}</CodeBox>

        <SubTitle>Designing for restartability — the checklist</SubTitle>

        {[
          {
            check: 'Fixed extraction windows — upper bound set at run start',
            detail: 'Store the run\'s upper bound (source_now) in the run record or pass it as a parameter. Retried runs use the same upper bound as the original run, not a new "now." This ensures the extraction window is identical across attempts.',
            code: `# Store run parameters — reuse on retry
run_upper_bound = get_source_now(conn)   # source DB time at run start
run_record.store('upper_bound', run_upper_bound.isoformat())
# On retry: load from run_record instead of re-computing`,
          },
          {
            check: 'Idempotent destination writes — upsert, not INSERT',
            detail: 'Every write to the destination uses ON CONFLICT DO UPDATE so that re-processing already-written rows updates them to the same values rather than inserting duplicates. Combined with the WHERE target.updated_at < EXCLUDED.updated_at condition, even out-of-order re-processing is safe.',
            code: `# Upsert: safe to process the same row N times
INSERT INTO silver.orders (order_id, status, updated_at)
VALUES (%s, %s, %s)
ON CONFLICT (order_id) DO UPDATE SET
    status = EXCLUDED.status,
    updated_at = EXCLUDED.updated_at
WHERE silver.orders.updated_at < EXCLUDED.updated_at;`,
          },
          {
            check: 'Atomic checkpoint advancement — checkpoint saved after write',
            detail: 'The checkpoint is saved after the destination write succeeds. If the write fails, the checkpoint does not advance. The next run re-processes the same data. Atomic write (write-then-rename) ensures no corrupt checkpoint state.',
            code: `# CORRECT ORDER: write first, checkpoint second
write_to_destination(rows)      # Step 1: durable write
save_checkpoint(new_watermark)  # Step 2: advance checkpoint
# If step 1 fails: step 2 never runs → checkpoint unchanged → rerun is safe
# If step 2 fails: data was written but checkpoint not advanced
#   → next run re-processes already-written rows
#   → upsert handles duplicates correctly`,
          },
          {
            check: 'Resumable file operations — in-progress files in temp location',
            detail: 'Files being written go to a temporary prefix or directory. Completed files are moved atomically to the final location. A crashed mid-write leaves a temp file that the next run overwrites. Final location only contains complete files.',
            code: `# Write to tmp, move to final when complete
tmp_path = f's3://bucket/tmp/run-\${run_id}/part-001.parquet'
final_path = f's3://bucket/silver/orders/date=2026-03-17/part-001.parquet'
df.to_parquet(tmp_path)    # write to temp
s3.copy_object(src=tmp_path, dst=final_path)   # atomic copy to final
s3.delete_object(tmp_path)  # clean up temp`,
          },
          {
            check: 'Idempotent file writes — overwrite, not append',
            detail: 'File writes use overwrite mode, not append mode. A rerun overwrites the output from the previous attempt. Append mode would create duplicate files on rerun.',
            code: `# Overwrite the partition — idempotent
df.write.mode('overwrite').partitionBy('order_date').parquet(path)
# NOT: df.write.mode('append').partitionBy('order_date').parquet(path)
# Append mode + rerun = duplicate data in partition`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, overflow: 'hidden', marginBottom: 14,
          }}>
            <div style={{ height: 3, background: 'var(--accent)', opacity: 0.5 }} />
            <div style={{ padding: '16px 20px' }}>
              <div style={{
                fontSize: 13, fontWeight: 800, color: 'var(--accent)',
                fontFamily: 'var(--font-display)', marginBottom: 6,
              }}>✓ {item.check}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 10 }}>
                {item.detail}
              </div>
              <pre style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '12px 14px', fontSize: 12,
                color: 'var(--text)', fontFamily: 'var(--font-mono)',
                margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.7,
              }}><code>{item.code}</code></pre>
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 05 — Non-Idempotent Patterns ────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Anti-Patterns" />
        <SectionTitle>Non-Idempotent Patterns — Recognising and Fixing Them</SectionTitle>

        <Para>
          Non-idempotent pipeline patterns are often not obvious — they look
          reasonable on first read. The test is always: what happens if this
          pipeline runs twice for the same input? If the answer is "different
          from running it once," the pattern is non-idempotent.
        </Para>

        <CompareTable
          headers={[
            { label: 'Anti-pattern' },
            { label: 'What goes wrong on rerun', color: '#ff4757' },
            { label: 'The fix', color: '#00e676' },
          ]}
          keys={['ap', 'wrong', 'fix']}
          rows={[
            {
              ap: 'Plain INSERT without ON CONFLICT',
              wrong: 'Duplicate rows in destination. COUNT(*) doubles on every rerun. All downstream aggregations are wrong.',
              fix: 'Add ON CONFLICT (pk) DO UPDATE. Add UNIQUE constraint on business key. Every rerun produces the same row count.',
            },
            {
              ap: 'TRUNCATE then INSERT in separate transactions',
              wrong: 'A failure after TRUNCATE but before INSERT leaves the table empty. Queries see zero rows. Next run starts from an empty table — correct, but downstream was served empty data.',
              fix: 'Use staging table swap: load new data into a staging table, then atomically rename staging to production in one transaction. Readers always see either old or new, never empty.',
            },
            {
              ap: 'Relative time windows (NOW() - INTERVAL \'15 min\')',
              wrong: 'A rerun at a different time of day extracts a different window. Rows between the original run\'s window and the rerun\'s window are either missed or double-processed.',
              fix: 'Store the extraction window\'s upper bound at run start. On retry, reuse the stored upper bound. Run parameters are immutable once set.',
            },
            {
              ap: 'Append mode file writes',
              wrong: 'Each rerun appends new files to the partition. After N reruns, the partition has N copies of the same data. Queries return N× too many rows.',
              fix: 'Use overwrite mode per partition. Rerun overwrites the partition entirely. The output is always exactly one copy of the data regardless of rerun count.',
            },
            {
              ap: 'Saving checkpoint before write',
              wrong: 'If the write fails after the checkpoint advances, the next run starts from after the failed data. The unwritten rows are permanently skipped. Silent data loss.',
              fix: 'Write to destination first, save checkpoint second. If write fails, checkpoint does not advance. Next run re-processes same data. Upsert semantics handle duplicates.',
            },
            {
              ap: 'Side effects in transformation (email, payment, webhook)',
              wrong: 'Transformation sends an email notification per row. On rerun, every row triggers a duplicate email. Customers receive duplicate notifications.',
              fix: 'Separate side effects from transformation. Record the intent to send (write to an outbox table) rather than sending directly. A separate idempotent consumer processes the outbox with deduplication.',
            },
            {
              ap: 'Auto-increment sequence used as business key',
              wrong: 'On rerun, new rows get new auto-increment IDs even though they represent the same business event. Downstream joins by ID fail to match. Aggregations count same events twice.',
              fix: 'Use the source system\'s business key (order_id from the source) as the UNIQUE constraint for conflict detection, not the destination\'s auto-increment surrogate key.',
            },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 06 — Transactional Outbox Revisited ─────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Idempotency Across System Boundaries" />
        <SectionTitle>Idempotency Across System Boundaries — The Hardest Case</SectionTitle>

        <Para>
          Idempotency within a single database is straightforward — ON CONFLICT
          handles it. Idempotency across multiple systems is fundamentally harder
          because there is no single transaction coordinator. A pipeline step that
          writes to a database AND sends a Kafka message AND calls an API cannot
          use a single transaction — each system has its own commit protocol.
        </Para>

        <CodeBox label="Cross-system idempotency — the saga pattern and idempotency keys">{`# SCENARIO: Order completion pipeline
# Must: 1) Update silver.orders (Snowflake)
#        2) Publish event to Kafka
#        3) Call delivery service API
# If ANY step fails: must be safe to retry entire sequence

# ── THE PROBLEM ───────────────────────────────────────────────────────────────
def complete_order_UNSAFE(order_id: int, conn, kafka_producer, api_client):
    # Step 1: Update DB
    conn.execute("UPDATE silver.orders SET status='completed' WHERE order_id=%s",
                 (order_id,))
    conn.commit()   # committed

    # Step 2: Publish event (network error here?)
    kafka_producer.produce('orders.completed', key=str(order_id), value={...})
    kafka_producer.flush()   # if this fails: DB is committed, Kafka not

    # Step 3: Call API (timeout here?)
    api_client.notify_delivery_service(order_id)   # if this fails: both above done

    # ANY STEP FAILING AND RETRYING = inconsistent state
    # Step 1 retry: duplicate DB update (idempotent if using upsert — OK)
    # Step 2 retry: duplicate Kafka message
    # Step 3 retry: duplicate API call — may charge the merchant twice!


# ── THE FIX: idempotency at every external call ────────────────────────────────
def complete_order_SAFE(order_id: int, run_id: str, conn, kafka_producer, api_client):

    # Step 1: Upsert (idempotent DB write)
    conn.execute("""
        INSERT INTO silver.orders (order_id, status, completed_at)
        VALUES (%s, 'completed', NOW())
        ON CONFLICT (order_id) DO UPDATE SET
            status = 'completed',
            completed_at = EXCLUDED.completed_at
        WHERE silver.orders.status != 'completed'
    """, (order_id,))
    conn.commit()

    # Step 2: Kafka publish with idempotent producer config
    # enable.idempotence=True: Kafka guarantees exactly-once delivery
    # within a single producer session (retries do not produce duplicates)
    kafka_producer.produce(
        'orders.completed',
        key=str(order_id),
        value={'order_id': order_id, 'idempotency_key': f'\${run_id}:\${order_id}'},
        # Consumer-side: check idempotency_key before processing
    )

    # Step 3: API call with idempotency key
    idempotency_key = f'order-complete-\${order_id}-\${run_id[:8]}'
    api_client.notify_delivery_service(
        order_id=order_id,
        headers={'X-Idempotency-Key': idempotency_key},
        # If API supports idempotency keys: second call with same key is a no-op
    )


# ── SAGA PATTERN: track state across multi-step operations ────────────────────
# For long multi-step pipelines where each step calls an external system:
# Record the completion of each step, and skip already-completed steps on retry.

CREATE TABLE pipeline.order_completion_sagas (
    order_id        BIGINT      PRIMARY KEY,
    run_id          VARCHAR(36) NOT NULL,
    db_updated      BOOLEAN     NOT NULL DEFAULT FALSE,
    kafka_published BOOLEAN     NOT NULL DEFAULT FALSE,
    api_notified    BOOLEAN     NOT NULL DEFAULT FALSE,
    completed_at    TIMESTAMPTZ,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

def complete_order_with_saga(order_id: int, run_id: str, ...):
    saga = load_or_create_saga(order_id, run_id)

    if not saga.db_updated:
        update_db(order_id)
        mark_saga_step(order_id, 'db_updated')

    if not saga.kafka_published:
        publish_kafka(order_id)
        mark_saga_step(order_id, 'kafka_published')

    if not saga.api_notified:
        notify_api(order_id)
        mark_saga_step(order_id, 'api_notified')

    mark_saga_complete(order_id)
    # On retry: already-completed steps are skipped entirely`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Testing Idempotency ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Testing for Idempotency" />
        <SectionTitle>How to Test That Your Pipeline Is Actually Idempotent</SectionTitle>

        <Para>
          Claiming a pipeline is idempotent is easy. Verifying it is idempotent
          requires specific tests. These tests should be part of every pipeline's
          integration test suite — run them before production deployment, after
          any significant change, and as part of the CI pipeline.
        </Para>

        <CodeBox label="Idempotency test suite — the three tests every pipeline needs">{`"""
tests/test_idempotency.py
Tests that the pipeline produces correct results when run multiple times.
Requires: test PostgreSQL + test Snowflake (or SQLite equivalent)
"""

import pytest
from datetime import datetime, timezone
from pipeline.main import run_pipeline


class TestIdempotency:
    """
    Tests that verify the pipeline is idempotent:
    running it N times produces the same result as running it once.
    """

    def test_double_run_produces_same_row_count(self, test_db, test_dest):
        """Running the pipeline twice must not duplicate rows."""
        run_date = '2026-03-17'

        # Run 1
        result1 = run_pipeline(run_date, source_conn=test_db, dest_conn=test_dest)
        count_after_run1 = test_dest.execute(
            "SELECT COUNT(*) FROM silver.orders"
        ).fetchone()[0]

        # Run 2 (same date, same data)
        result2 = run_pipeline(run_date, source_conn=test_db, dest_conn=test_dest)
        count_after_run2 = test_dest.execute(
            "SELECT COUNT(*) FROM silver.orders"
        ).fetchone()[0]

        assert count_after_run1 == count_after_run2, (
            f'Row count changed on second run: '
            f'\${count_after_run1} → \${count_after_run2} (duplicates created?)'
        )

    def test_rerun_after_source_update_uses_latest_values(self, test_db, test_dest):
        """If source data changes between runs, destination reflects latest."""
        run_date = '2026-03-17'

        # Run 1: order 9284751 has status='placed'
        run_pipeline(run_date, source_conn=test_db, dest_conn=test_dest)
        status_after_run1 = test_dest.execute(
            "SELECT status FROM silver.orders WHERE order_id = 9284751"
        ).fetchone()[0]
        assert status_after_run1 == 'placed'

        # Source updates order status
        test_db.execute(
            "UPDATE orders SET status='delivered', updated_at=NOW() "
            "WHERE order_id = 9284751"
        )
        # Reset checkpoint to before run1's window
        reset_checkpoint_to_before_run1()

        # Run 2: should pick up the update
        run_pipeline(run_date, source_conn=test_db, dest_conn=test_dest)
        status_after_run2 = test_dest.execute(
            "SELECT status FROM silver.orders WHERE order_id = 9284751"
        ).fetchone()[0]
        assert status_after_run2 == 'delivered'

    def test_pipeline_recovers_correctly_after_mid_run_failure(self, test_db, test_dest):
        """
        Simulates a failure after writing half the batches.
        The next run should complete correctly without duplicates.
        """
        # Insert 10,000 test orders
        insert_test_orders(test_db, count=10_000)

        # Patch the load function to fail after batch 3
        call_count = 0
        original_upsert = pipeline.load.upsert_batch

        def upsert_that_fails_on_batch_4(rows, conn):
            nonlocal call_count
            call_count += 1
            if call_count == 4:
                raise RuntimeError('Simulated failure on batch 4')
            return original_upsert(rows, conn)

        with pytest.raises(RuntimeError, match='Simulated failure'):
            with patch('pipeline.load.upsert_batch', side_effect=upsert_that_fails_on_batch_4):
                run_pipeline('2026-03-17', source_conn=test_db, dest_conn=test_dest)

        count_after_failure = test_dest.execute(
            "SELECT COUNT(*) FROM silver.orders"
        ).fetchone()[0]
        # Some batches were written before the failure
        assert 0 < count_after_failure < 10_000

        # Recovery run: complete the pipeline
        run_pipeline('2026-03-17', source_conn=test_db, dest_conn=test_dest)
        count_after_recovery = test_dest.execute(
            "SELECT COUNT(*) FROM silver.orders"
        ).fetchone()[0]

        # Should have exactly 10,000 rows — no duplicates, no gaps
        assert count_after_recovery == 10_000

    def test_ten_runs_same_result(self, test_db, test_dest):
        """The most direct idempotency test: run 10 times, same result."""
        run_date = '2026-03-17'
        results = []

        for i in range(10):
            reset_checkpoint_for_run(run_date)
            run_pipeline(run_date, source_conn=test_db, dest_conn=test_dest)
            count = test_dest.execute(
                "SELECT COUNT(*) FROM silver.orders"
            ).fetchone()[0]
            checksum = test_dest.execute(
                "SELECT SUM(order_amount) FROM silver.orders"
            ).fetchone()[0]
            results.append((count, checksum))

        # All runs should produce identical results
        assert len(set(results)) == 1, (
            f'Pipeline is NOT idempotent — 10 runs produced \${len(set(results))} '
            f'different results: \${results}'
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
        <SectionTitle>A Non-Idempotent Pipeline, a 3 AM Incident, and the Fix</SectionTitle>

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
            Scenario — FreshMart · Finance team reports double revenue
          </div>

          <Para>
            At 07:15 AM, the finance team reports that yesterday's revenue figure
            in the dashboard shows ₹84,23,000 — exactly double the ₹42,11,500
            expected from manual bank reconciliation. The data engineering team
            begins investigating.
          </Para>

          <CodeBox label="Incident investigation — root cause and recovery">{`# Step 1: Check when the doubling occurred
SELECT DATE(ingested_at), COUNT(*) AS row_count, SUM(order_amount) AS revenue
FROM silver.orders
WHERE order_date = '2026-03-17'
GROUP BY 1
ORDER BY 1;

# Output:
# 2026-03-17  →  48,234 rows  →  ₹42,11,500  (morning load — correct)
# 2026-03-17  →  96,468 rows  →  ₹84,23,000  (evening — doubled!)

# Step 2: Check for duplicate order IDs
SELECT order_id, COUNT(*) AS copies
FROM silver.orders
WHERE order_date = '2026-03-17'
GROUP BY order_id
HAVING COUNT(*) > 1
LIMIT 10;
# Returns 48,234 rows — every single order_id has exactly 2 copies

# Step 3: Check Airflow run history
SELECT dag_run_id, start_date, end_date, state
FROM airflow.dag_run
WHERE dag_id = 'orders_pipeline_incremental'
  AND start_date::DATE = '2026-03-17'
ORDER BY start_date;

# Output shows two FULL LOAD runs at 18:00 and 18:15
# (someone had triggered a "backfill" from the Airflow UI that ran full load mode)

# Step 4: Check the Silver table's INSERT statement
SELECT query_text FROM snowflake.account_usage.query_history
WHERE query_text ILIKE '%INSERT INTO silver.orders%'
  AND start_time::DATE = '2026-03-17'
LIMIT 5;
# Query: "INSERT INTO silver.orders SELECT * FROM orders_staging"
# → Plain INSERT, NO ON CONFLICT — not idempotent!

# Root cause:
# 1. The pipeline used plain INSERT without ON CONFLICT
# 2. A manual backfill ran the pipeline twice for the same date
# 3. Each run inserted all rows again → 2× duplicates

# IMMEDIATE FIX: deduplicate the table
CREATE TABLE silver.orders_deduped AS
SELECT DISTINCT ON (order_id) *
FROM silver.orders
ORDER BY order_id, ingested_at DESC;

ALTER TABLE silver.orders RENAME TO orders_duplicated_backup;
ALTER TABLE silver.orders_deduped RENAME TO orders;

# VERIFY:
SELECT COUNT(*), SUM(order_amount) FROM silver.orders
WHERE order_date = '2026-03-17';
# Returns: 48,234 rows, ₹42,11,500 ← correct

# PERMANENT FIX: make the pipeline idempotent
# 1. Change INSERT to INSERT ... ON CONFLICT DO UPDATE
# 2. Add UNIQUE constraint: ALTER TABLE silver.orders ADD CONSTRAINT uq_order_id UNIQUE (order_id);
# 3. Add idempotency test to CI that fails if running twice increases row count
# 4. Enable Airflow max_active_runs=1 and require code review for manual backfills

# TOTAL IMPACT:
# Duration: 07:15 AM alert → 07:52 AM fully resolved (37 minutes)
# Finance report delayed: 52 minutes past SLA
# Revenue reports for the day: correct in production by 08:00 AM`}</CodeBox>

          <Para>
            The incident happened because one failure mode — a manual trigger of
            the pipeline for an already-processed date — was never considered.
            The plain INSERT that worked fine for the first run created duplicates
            on the second. Adding ON CONFLICT DO UPDATE and a UNIQUE constraint
            took 15 minutes. The idempotency test would have caught this before
            the first production deployment.
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
            q: 'Q1. What does it mean for a data pipeline to be idempotent? Give a concrete example of a non-idempotent pipeline and how you would fix it.',
            a: `An idempotent pipeline produces the same correct output whether it runs once or ten times for the same input parameters. Running it twice does not create duplicate rows, running it after a failure does not produce different results from a successful single run, and there is no external state that accumulates with each execution.

A classic non-idempotent pipeline is one that uses plain INSERT statements without conflict handling. Consider a pipeline that extracts yesterday's orders from PostgreSQL and inserts them into Snowflake. The first run inserts 48,000 rows correctly. If the pipeline is rerun — due to a failure, a manual trigger, or an Airflow bug that runs the same DAG interval twice — it inserts another 48,000 rows. The destination now has 96,000 rows representing 48,000 actual orders. Every downstream metric doubles: total revenue, order count, average order value. This is silent — no error fires, the pipeline "succeeds" both times.

The fix has two parts. First, change plain INSERT to upsert: INSERT ... ON CONFLICT (order_id) DO UPDATE SET status = EXCLUDED.status, amount = EXCLUDED.amount WHERE silver.orders.updated_at < EXCLUDED.updated_at. This ensures re-inserting a row that already exists updates it to the correct values rather than creating a duplicate. Second, add a UNIQUE constraint on order_id: ALTER TABLE silver.orders ADD CONSTRAINT uq_order_id UNIQUE (order_id). Without this constraint, ON CONFLICT has nothing to conflict on and inserts a duplicate anyway.

The third part of the fix is making the extraction window fixed: use a stored upper bound rather than NOW() so that retried runs extract exactly the same data as the original run, not a different time window.`,
          },
          {
            q: 'Q2. What is the difference between idempotency and atomicity in a pipeline context?',
            a: `Idempotency and atomicity are related but distinct properties that address different failure modes.

Atomicity addresses what happens during a single operation: does each unit of work either complete fully or leave no trace? An atomic write either commits all rows in a batch or commits none. If the process crashes mid-batch, an atomic operation rolls back to the pre-operation state. Readers never see a partial batch — never 23,000 of 50,000 rows, never a truncated table. Atomicity is about the integrity of a single execution.

Idempotency addresses what happens across multiple executions: does running the operation N times produce the same result as running it once? An idempotent write operation produces the same destination state regardless of how many times it is applied. Idempotency is about the safety of repetition.

The two properties interact: atomicity supports idempotency. If writes are atomic, a failed run leaves the destination in a known consistent state (either the new batch was committed or the old state is intact), making it safe to retry. Without atomicity, a failed run might leave a partial state that makes retry produce incorrect results.

A pipeline can have atomicity without idempotency: wrapping a plain INSERT in a transaction makes the batch atomic (all or nothing), but running the same batch twice still creates duplicates. A pipeline can have idempotency without perfect atomicity: upserts on individual rows are idempotent but each row auto-commits, leaving partial batches visible during execution.

The correct production pattern requires both: batch transactions for atomicity (all-or-nothing per batch), upserts for idempotency (safe to rerun any batch).`,
          },
          {
            q: 'Q3. A pipeline fails after writing 30,000 of 50,000 rows in a batch. How should it behave on restart?',
            a: `The correct behaviour on restart depends on whether the pipeline uses coarse or fine-grained checkpointing, but the critical invariant in both cases is that the final state after recovery is exactly the same as if the original run had completed successfully.

With coarse-grained checkpointing (checkpoint saved only at end of run): the checkpoint still reflects the watermark from before this run started. The restarted pipeline re-extracts the entire batch — all 50,000 rows — and re-processes them. The 30,000 rows that were already written are re-processed via upsert, which updates them to the same values (no change, since they were already correct). The remaining 20,000 rows are written for the first time. The result: 50,000 rows in the destination, correctly. The upsert semantics make re-processing the 30,000 already-written rows safe.

With fine-grained checkpointing (checkpoint saved after each batch): the checkpoint records that batches 1 through some number were successfully committed. The restarted pipeline begins from the first uncommitted batch — it skips the already-written rows entirely. It processes only the remaining rows. This is more efficient (re-processes fewer rows) but requires more careful checkpoint management.

The failure case that must not happen: the pipeline saves the checkpoint after writing 30,000 rows (before the run completes), then crashes on the remaining 20,000. On restart, the checkpoint shows the 30,000-row watermark as the starting point. The pipeline skips the remaining 20,000 rows. The destination permanently has only 30,000 rows — a silent 20,000-row gap.

This is why checkpoints must only advance to a watermark after all data up to that watermark has been successfully written. Checkpoint advancement and write completion must be ordered correctly.`,
          },
          {
            q: 'Q4. How do you achieve atomicity when writing to a data lake (S3/ADLS) where database transactions are not available?',
            a: `Object stores do not support multi-object transactions — you cannot atomically write five Parquet files and have them all appear simultaneously. Three patterns achieve atomic-equivalent behaviour.

First, write-then-rename for single files. Write the Parquet file to a temporary key (s3://bucket/tmp/run-abc123/part-001.parquet). When the write is complete, copy it to the final key (s3://bucket/silver/orders/date=2026-03-17/part-001.parquet) and delete the temporary key. S3 PUT operations for a single object are atomic — readers see either the old object or the new object, never a partial upload. The copy operation is effectively atomic because S3 only makes the new key visible after the complete content is committed. Readers scanning the final prefix never see in-progress writes from the tmp prefix.

Second, Delta Lake's transaction log. Delta Lake adds a transaction log on top of S3 — each table modification writes Parquet files to the data directory and then atomically commits a new JSON entry to the _delta_log/ directory listing all new files. The log entry is a single S3 PUT (atomic). Readers see a new set of files only when the log entry exists. If the process crashes after writing the Parquet files but before writing the log entry, the files are invisible to readers and get cleaned up by VACUUM. This gives full ACID transactions on S3.

Third, partition overwrite for batch loads. Instead of appending files to a partition, overwrite the entire partition in one Spark write operation. Spark writes new Parquet files, then atomically updates the partition metadata. Old files are removed by Spark's cleanup phase. The partition transitions from old-data to new-data in a way that Spark's write protocol makes atomic at the partition level.

For the highest correctness, Delta Lake is the recommended approach for any data lake that requires ACID semantics.`,
          },
          {
            q: 'Q5. Your pipeline calls an external API as part of its processing — for example, calling a geocoding API to enrich addresses before loading. How do you make this step idempotent?',
            a: `API calls are challenging to make idempotent because they have side effects outside the pipeline's control. The approach depends on the type of API call.

For read-only enrichment calls (geocoding, currency conversion, address validation), the API call itself is naturally idempotent — calling it twice with the same input returns the same result. The idempotency concern is about not paying the API cost twice and not being rate-limited by duplicate calls. The solution is caching: store the API response in a lookup table alongside the row's input parameters. Before calling the API, check the cache. If the result is already cached, use the cached value. This makes reruns free from a cost and rate-limit perspective.

For write APIs (sending a notification, charging a payment, creating a record in a CRM), the API call has a real-world effect that must not be duplicated. The pattern is idempotency keys: generate a deterministic key from the operation's inputs (hash of order_id + action + run_date), include it in the API request header (X-Idempotency-Key). When the API receives a second request with the same key, it returns the same response as the first without executing the action again. Most payment APIs (Stripe, Razorpay) and modern SaaS APIs support this.

If the external API does not support idempotency keys, the pipeline must track which records have had the API call successfully completed. A processed_api_calls table with the record ID and call timestamp, plus an ON CONFLICT DO NOTHING insert before each call, ensures each record is processed exactly once across any number of pipeline reruns. On retry, records that were already processed are skipped.

The broader principle: the pipeline should have no externally-visible side effects that are not tracked in its own database. Any side effect that is tracked becomes idempotent via the ON CONFLICT pattern.`,
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
            error: `Revenue dashboard shows exactly 2× expected value after a pipeline was manually re-triggered — no error was raised`,
            cause: 'The pipeline uses plain INSERT without ON CONFLICT handling. The first run inserted all rows. The manual re-trigger ran a second time and inserted all rows again. Both runs succeeded (no constraint to violate). The destination now has two identical copies of every order. Revenue metrics double silently.',
            fix: 'Add ON CONFLICT (order_id) DO UPDATE to every INSERT. Add a UNIQUE constraint: ALTER TABLE silver.orders ADD CONSTRAINT uq_order_id UNIQUE (order_id). For the immediate cleanup: deduplicate with SELECT DISTINCT ON (order_id) ... ORDER BY order_id, ingested_at DESC. Add an idempotency integration test that fails if running the pipeline twice increases the row count. This test would have caught this before the first deployment.',
          },
          {
            error: `Table is empty for 45 minutes after a nightly full-load pipeline runs — analysts query during the load and see no data`,
            cause: 'The pipeline uses TRUNCATE followed by INSERT in separate statements with autocommit=True. The TRUNCATE committed immediately. The INSERT is in progress. Concurrent read queries see the committed TRUNCATE result — an empty table — for the entire duration of the INSERT (45 minutes for a large table). This is not a transaction failure; it is a design failure.',
            fix: 'Switch to the staging table swap pattern. Create a new table (silver.store_master_new), load it completely, then use ALTER TABLE RENAME in a single transaction to swap new for old. In PostgreSQL, DDL is transactional — the rename is atomic. In Snowflake, ALTER TABLE ... SWAP WITH is atomic. Queries see old data until the swap commits, then immediately see new data. The zero-downtime window between old and new is milliseconds, not 45 minutes.',
          },
          {
            error: `Pipeline fails on batch 7 of 20, restarts from batch 7, but destination has rows from batch 7 twice — upsert did not prevent duplicates`,
            cause: 'The upsert uses ON CONFLICT DO UPDATE but the destination table is missing the UNIQUE constraint on order_id. Without the constraint, PostgreSQL has no index to detect the conflict. INSERT ... ON CONFLICT (order_id) silently inserts a duplicate row as if there were no conflict clause at all.',
            fix: 'Add the missing constraint: ALTER TABLE silver.orders ADD CONSTRAINT uq_order_id UNIQUE (order_id). After adding the constraint, clean up existing duplicates: DELETE FROM silver.orders WHERE ctid NOT IN (SELECT MIN(ctid) FROM silver.orders GROUP BY order_id). Verify the constraint exists before deploying: query information_schema.table_constraints for the table. Add this verification to the pipeline startup checks — ensure_constraints_exist() called before processing begins.',
          },
          {
            error: `A rerun for 2026-03-17 extracts different rows than the original run — some rows from the original run are missing, some new rows appear`,
            cause: 'The extraction query uses a relative time window: WHERE updated_at > NOW() - INTERVAL \'15 minutes\'. A rerun at a different time of day evaluates NOW() differently, producing a different window. Rows that were in the original 06:00–06:15 window are not in the 14:30–14:45 rerun window. New rows updated between 14:30 and 14:45 appear in the rerun but were not in the original.',
            fix: 'Fix the extraction to use fixed windows. At run start, capture the source database\'s current time: source_now = get_source_now(conn). Store this in the run record. On retry, use the same stored source_now as the upper bound. The lower bound is always loaded from the checkpoint file. This ensures every attempt for the same pipeline run uses exactly the same extraction window.',
          },
          {
            error: `Spark job writing to S3: job appears to succeed, but downstream queries see partial data — only 3 of 10 Parquet files are visible`,
            cause: 'The Spark job used mode("append") and failed partway through writing the 10 files. Spark does not roll back already-written files on failure when using append mode to plain S3. The 3 files that were written before the failure are visible to downstream queries. The remaining 7 were never written.',
            fix: 'Switch to Delta Lake for the destination — Delta\'s transaction log makes multi-file writes atomic. The log entry is only written after all Parquet files are complete; if the job fails before the log entry, the written Parquet files are invisible (unreferenced) and cleaned up by VACUUM. Alternatively, write to a temporary S3 prefix during the Spark job and copy the entire prefix to the final location only after the job succeeds. The final location copy is not atomic for multiple files — Delta is the correct solution for production data lakes requiring atomicity.',
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
        'Idempotency means running a pipeline N times produces the same result as running it once. The three mechanisms: upserts (ON CONFLICT DO UPDATE) with UNIQUE constraints for database writes, fixed extraction windows (not relative NOW() windows) for extraction, and overwrite mode (not append) for file writes.',
        'Atomicity means each unit of work either completes fully or leaves no trace. For databases: wrap each batch in a transaction. For table swaps: use ALTER TABLE RENAME in a single transaction (PostgreSQL DDL is transactional) or ALTER TABLE SWAP WITH (Snowflake). For files: write to temp then rename; use Delta Lake for multi-file atomicity.',
        'Restartability requires both idempotency and correct checkpoint ordering. Save the checkpoint after the destination write succeeds, never before. A checkpoint that advances before the write succeeds causes permanent data loss on failure. A checkpoint that stays at the pre-write position allows safe restart.',
        'The staging table swap pattern eliminates the empty-table window of truncate-and-reload. Load new data into a staging table completely, then atomically rename staging to production in one transaction. Readers see old data until the instant of swap, then new data — zero window of empty or partial data.',
        'Idempotency keys solve the duplicate-call problem for external APIs and message queues. Generate a deterministic key from the operation\'s inputs (hash of order_id + action). Include it in the request header. APIs that support idempotency keys treat duplicate requests with the same key as no-ops.',
        'The UNIQUE constraint is required for ON CONFLICT to work. Without it, INSERT ... ON CONFLICT (order_id) silently inserts a duplicate as if the clause were not present. Always verify the constraint exists: query information_schema.table_constraints before assuming ON CONFLICT will protect against duplicates.',
        'Non-idempotent patterns to recognise: plain INSERT (duplicates on rerun), TRUNCATE in separate transaction from INSERT (empty-table window), relative time windows (different data on rerun), append mode file writes (duplicate files on rerun), checkpoint saved before write (data loss on failure), side effects in transformation (duplicate emails/charges on rerun).',
        'Idempotency across system boundaries requires tracking each step\'s completion. The saga pattern records which steps have been executed, and skips already-completed steps on retry. Each external call uses an idempotency key derived from the operation\'s unique inputs.',
        'Test idempotency explicitly: run the pipeline twice and assert row counts are identical, run after a simulated mid-batch failure and assert complete correct data, run ten times and assert results are unchanged. These tests belong in CI and should run before every production deployment.',
        'The root cause of most data quality incidents is non-idempotent pipelines combined with a trigger that causes a rerun: manual backfill, Airflow bug, infrastructure restart, or test run in production. The defence is making every pipeline idempotent by default — not as an afterthought when the incident happens.',
      ]} />

    </LearnLayout>
  )
}