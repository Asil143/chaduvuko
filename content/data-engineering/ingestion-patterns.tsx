import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Data Ingestion Patterns — Full Load, Incremental, CDC — Data Engineering | Chaduvuko',
  description:
    'The three ingestion patterns every data engineer must know — full load, incremental with high watermarks, and Change Data Capture — when each is correct, how each fails, and how to choose.',
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

export default function IngestionPatternsModule() {
  return (
    <LearnLayout
      title="Data Ingestion Patterns — Full Load, Incremental, CDC"
      description="The three patterns that cover every source — when each is correct, how each fails, and how to choose."
      section="Data Engineering"
      readTime="60 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Three Patterns That Cover Everything" />
        <SectionTitle>Every Ingestion Problem Falls Into One of Three Patterns</SectionTitle>

        <Para>
          A data engineer's first job with any new source system is answering one
          question: how do I get data out of this reliably, completely, and without
          harming it? The answer is almost always a variant of one of three ingestion
          patterns. Recognising which pattern fits which source — and understanding
          precisely why — is one of the most fundamental skills in the discipline.
        </Para>

        <Para>
          The three patterns exist on a spectrum from simple-but-expensive to
          complex-but-efficient. The simplest pattern reads everything every time.
          The most complex pattern reads only what changed, down to the individual
          database operation level. The right choice depends on the source's
          characteristics, the data's update frequency, the destination's freshness
          requirement, and the source system's tolerance for load.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 16,
          }}>
            The three ingestion patterns
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              {
                num: '01', name: 'Full Load', color: '#00e676',
                def: 'Read every row from the source on every run. Truncate destination and reload. Simple, correct, expensive.',
                when: 'Small tables, reference data, no reliable change tracking.',
              },
              {
                num: '02', name: 'Incremental (High-Watermark)', color: '#7b61ff',
                def: 'Read only rows created or modified since the last run, tracked by a timestamp or ID watermark.',
                when: 'Large tables with a reliable updated_at column. Cannot detect hard deletes.',
              },
              {
                num: '03', name: 'Change Data Capture (CDC)', color: '#f97316',
                def: 'Read the database transaction log to capture every insert, update, and delete as it happens, in real time.',
                when: 'Any table where deletes matter, low-latency requirement, or high change velocity.',
              },
            ].map((item) => (
              <div key={item.num} style={{
                background: 'var(--bg2)', border: `1px solid ${item.color}30`,
                borderTop: `3px solid ${item.color}`, borderRadius: 10, padding: '16px 18px',
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: item.color,
                  fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                  textTransform: 'uppercase', marginBottom: 6,
                }}>{item.num} — {item.name}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 8 }}>
                  {item.def}
                </div>
                <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)' }}>
                  Use when: {item.when}
                </div>
              </div>
            ))}
          </div>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 02 — Full Load ───────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Pattern One: Full Load" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(0,230,118,0.12)', border: '2px solid #00e676',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#00e676',
            fontFamily: 'var(--font-mono)',
          }}>FULL LOAD</div>
          <h2 style={{
            fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Full Load — Read Everything, Every Time</h2>
        </div>

        <Para>
          Full load is the simplest ingestion pattern. Every run reads the complete
          source table and replaces the destination's content entirely. No watermarks,
          no change tracking, no complexity. For small tables that change frequently
          in hard-to-track ways, it is often the correct and permanent choice.
        </Para>

        <SubTitle>How full load works</SubTitle>

        <CodeBox label="Full load — the pattern and its two implementation variants">{`FULL LOAD PATTERN:
  Every run:
    1. Read ALL rows from source
    2. Truncate destination (or write to staging)
    3. Insert all rows into destination
    4. Done — destination is an exact copy of source at run time

VARIANT A: Truncate and reload (simple, destination empty during load)
  BEGIN;
  TRUNCATE TABLE silver.store_master;
  INSERT INTO silver.store_master
  SELECT
      store_id, store_name, city, region, is_active, manager_id
  FROM source.stores;
  COMMIT;
  -- Atomically: destination is empty for the duration of the transaction
  -- Other queries see either all-old or all-new, never empty (due to MVCC)

VARIANT B: Staging table swap (zero-downtime, destination always available)
  -- Step 1: load to staging table
  CREATE TABLE silver.store_master_new AS
  SELECT store_id, store_name, city, region, is_active, manager_id
  FROM source.stores;

  -- Step 2: atomic rename (milliseconds)
  BEGIN;
  ALTER TABLE silver.store_master RENAME TO store_master_old;
  ALTER TABLE silver.store_master_new RENAME TO store_master;
  COMMIT;

  -- Step 3: drop old table
  DROP TABLE silver.store_master_old;
  -- During load: store_master_old serves queries
  -- After rename: store_master (new) serves queries
  -- Zero seconds where table is empty or has partial data

PYTHON IMPLEMENTATION (full load with staging swap):
  def full_load_with_swap(source_conn, dest_conn, table: str) -> int:
      df = pd.read_sql(f"SELECT * FROM \${table}", source_conn)
      staging = f"\${table}_staging"
      df.to_sql(staging, dest_conn, if_exists='replace', index=False)
      with dest_conn.cursor() as cur:
          cur.execute(f"ALTER TABLE \${table} RENAME TO \${table}_old")
          cur.execute(f"ALTER TABLE \${staging} RENAME TO \${table}")
          cur.execute(f"DROP TABLE \${table}_old")
      dest_conn.commit()
      return len(df)`}</CodeBox>

        <SubTitle>When full load is genuinely the right choice</SubTitle>

        {[
          {
            scenario: 'Small reference / dimension tables',
            detail: 'Product categories, store master, currency exchange rates, postal code mappings — these tables are small (< 100,000 rows), change occasionally, and must always reflect the current state. Full load is simpler than tracking changes and is fast enough that performance is not a concern.',
          },
          {
            scenario: 'Tables with no reliable change tracking column',
            detail: 'Some legacy source tables have no updated_at or created_at column and no auto-increment primary key. Without a reliable watermark, incremental extraction is impossible without CDC. Full load is often the only viable option.',
          },
          {
            scenario: 'Tables where deletes are frequent and important',
            detail: 'If rows are regularly hard-deleted and you need to reflect those deletions in the destination, incremental extraction misses the deletes. Full load naturally reflects them — if a row is gone from source, it will be gone after the next full load. CDC is the other option, but full load is simpler.',
          },
          {
            scenario: 'Nightly snapshot tables (SCD Type 1 overwrites)',
            detail: 'Some dimension tables are intentionally reloaded nightly to capture the current state — no history needed, just the current view. Full load is the natural pattern here.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 10, padding: '14px 18px', marginBottom: 10,
            borderLeft: '3px solid #00e676',
          }}>
            <div style={{
              fontSize: 13, fontWeight: 800, color: '#00e676',
              fontFamily: 'var(--font-display)', marginBottom: 6,
            }}>{item.scenario}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.detail}</div>
          </div>
        ))}

        <SubTitle>When full load breaks down</SubTitle>

        <CodeBox label="Full load failure modes — when the pattern stops working">{`FAILURE MODE 1: Table grows too large for full extraction
  Table: orders (FreshMart) — 500 million rows after 3 years
  Full load time: 6 hours
  Pipeline SLA: complete by 6 AM
  Pipeline runtime on a bad day: started 11 PM, finishes 5 AM next day
  → Barely fits. One slow query and the SLA is breached.
  → After year 4: 700 million rows → 8.5 hours → SLA breach guaranteed.
  Signal to switch: full load duration > 20% of run interval.

FAILURE MODE 2: Source load during extraction
  Full extraction reads every row via a full table scan.
  On a production PostgreSQL database:
    → Fills the buffer pool (evicts hot pages)
    → Application queries slow down for 30–60 minutes after
    → If source cannot provide a read replica, this causes harm
  Solution: extract from a read replica, not the primary.

FAILURE MODE 3: Destination inconsistency window
  Between TRUNCATE and INSERT completion, destination is empty.
  If a query runs during this window, it sees no data.
  Solution: staging table swap (Variant B above) eliminates this window.

FAILURE MODE 4: Reload overwrites late-arriving data
  If a row was manually corrected in the destination (a data fix),
  the next full load overwrites it with the uncorrected source value.
  This is expected behaviour for full load — but teams get surprised by it.
  If you need to preserve destination edits: use incremental or CDC instead.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — Incremental / High-Watermark ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Pattern Two: Incremental (High-Watermark)" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(123,97,255,0.12)', border: '2px solid #7b61ff',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#7b61ff',
            fontFamily: 'var(--font-mono)',
          }}>INCREMENTAL</div>
          <h2 style={{
            fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Incremental — Only What Changed</h2>
        </div>

        <Para>
          Incremental ingestion reads only the rows that were created or modified
          since the previous run. A high-watermark column — typically an
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> updated_at</code> timestamp
          or an auto-incrementing ID — tracks progress. The pipeline records the
          maximum watermark value it saw on the last run, and uses it as the lower
          bound for the next run's extraction query.
        </Para>

        <Para>
          This pattern scales to arbitrarily large tables. A 1-billion-row orders
          table that receives 100,000 new or updated orders per day only requires
          reading 100,000 rows per run, not 1 billion. The extraction time is
          proportional to the change volume, not the total table size.
        </Para>

        <SubTitle>Complete incremental implementation</SubTitle>

        <CodeBox label="Incremental ingestion — complete production implementation">{`import json
import logging
from datetime import datetime, timezone, timedelta
from pathlib import Path

import psycopg2
import pandas as pd

log = logging.getLogger('incremental_ingestion')

CHECKPOINT_FILE = Path('/data/checkpoints/orders_watermark.json')

# ── Watermark management ───────────────────────────────────────────────────────

def load_watermark() -> datetime:
    """Load the last successfully processed watermark."""
    if CHECKPOINT_FILE.exists():
        data = json.loads(CHECKPOINT_FILE.read_text())
        wm = datetime.fromisoformat(data['watermark'])
        log.info('Loaded watermark: \${s}', wm.isoformat())
        return wm
    # First run — use a safe historical start
    default = datetime(2020, 1, 1, tzinfo=timezone.utc)
    log.info('No checkpoint found — starting from \${s}', default.isoformat())
    return default


def save_watermark(watermark: datetime) -> None:
    """Save watermark atomically — write temp then rename."""
    tmp = CHECKPOINT_FILE.with_suffix('.tmp')
    tmp.write_text(json.dumps({'watermark': watermark.isoformat()}))
    tmp.rename(CHECKPOINT_FILE)   # atomic on POSIX filesystems


# ── Extraction ─────────────────────────────────────────────────────────────────

def extract_changed_orders(
    conn,
    since: datetime,
    until: datetime,
) -> pd.DataFrame:
    """
    Extract orders modified between since and until.
    Uses a closed lower bound (>) to avoid re-processing the boundary row.
    Uses a closed upper bound (<=) to include rows modified at exactly until.
    """
    query = """
        SELECT
            order_id, customer_id, store_id,
            order_amount, status, created_at, updated_at
        FROM orders
        WHERE updated_at > %s
          AND updated_at <= %s
        ORDER BY updated_at ASC
    """
    df = pd.read_sql(query, conn, params=(since, until))
    log.info('Extracted \${d} rows (updated \${s} to \${s})',
             len(df), since.isoformat(), until.isoformat())
    return df


# ── Loading ────────────────────────────────────────────────────────────────────

def upsert_orders(df: pd.DataFrame, dest_conn) -> int:
    """Upsert orders into Silver layer — idempotent."""
    if df.empty:
        return 0
    with dest_conn.cursor() as cur:
        for _, row in df.iterrows():
            cur.execute("""
                INSERT INTO silver.orders
                    (order_id, customer_id, store_id, order_amount, status,
                     created_at, updated_at, ingested_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, NOW())
                ON CONFLICT (order_id) DO UPDATE SET
                    status      = EXCLUDED.status,
                    order_amount = EXCLUDED.order_amount,
                    updated_at  = EXCLUDED.updated_at,
                    ingested_at = NOW()
                WHERE silver.orders.updated_at < EXCLUDED.updated_at
            """, (row.order_id, row.customer_id, row.store_id,
                  row.order_amount, row.status, row.created_at, row.updated_at))
    dest_conn.commit()
    return len(df)


# ── Main pipeline ──────────────────────────────────────────────────────────────

def run_incremental(source_conn, dest_conn) -> dict:
    """Run one incremental ingestion cycle."""
    since = load_watermark()
    # Use source DB's NOW() as upper bound to avoid clock skew:
    until = pd.read_sql("SELECT NOW() AT TIME ZONE 'UTC'",
                        source_conn).iloc[0, 0].to_pydatetime()

    df = extract_changed_orders(source_conn, since, until)

    if df.empty:
        log.info('No changes since last watermark')
        return {'rows_processed': 0, 'new_watermark': since.isoformat()}

    written = upsert_orders(df, dest_conn)
    # Only advance watermark AFTER successful write:
    save_watermark(until)

    return {
        'rows_processed': written,
        'new_watermark':  until.isoformat(),
        'max_source_ts':  df['updated_at'].max().isoformat() if not df.empty else None,
    }`}</CodeBox>

        <SubTitle>The critical pitfalls of incremental ingestion</SubTitle>

        <CodeBox label="Incremental ingestion pitfalls — what breaks and how to handle it">{`PITFALL 1: HARD DELETES ARE INVISIBLE
  Scenario: order_id 9284751 is deleted from the source PostgreSQL table.
  Incremental query: SELECT * FROM orders WHERE updated_at > checkpoint
  What happens: the deleted row produces no result in the query.
  Destination: still has order_id 9284751 from the previous ingestion run.
  Impact: destination data diverges from source silently. Metrics wrong.

  Solutions:
  A) Use CDC instead (CDC captures DELETE operations explicitly)
  B) Use a soft-delete column: deleted_at TIMESTAMPTZ or is_deleted BOOLEAN
     Soft deletes update updated_at → appear in incremental query
     Pipeline handles is_deleted=TRUE by marking destination row as deleted
  C) Periodic full load to reconcile (run full load weekly on top of incremental)
     Full load will overwrite destination to match source — deletes reconciled
     Use when: deletions are rare, weekly reconciliation is acceptable

PITFALL 2: MISSING updated_at COLUMN
  Many legacy tables have only created_at (immutable).
  Solution A: use max(primary_key_id) as watermark if PK is auto-increment
    SELECT * FROM orders WHERE order_id > last_max_id
    Works when: rows are insert-only (orders are never updated after creation)
    Breaks when: rows are updated (updates do not change the ID)
  Solution B: use CDC (does not depend on application-managed timestamps)
  Solution C: full load if the table is small enough

PITFALL 3: CLOCK SKEW BETWEEN SOURCE AND PIPELINE SERVER
  Pipeline server clock: 06:00:00 UTC
  Source DB clock:       06:00:02 UTC (2 seconds ahead)
  Watermark saved after last run: 06:00:00 UTC (pipeline server time)
  Next query: WHERE updated_at > '06:00:00'
  Row inserted at 05:59:59 on source clock? INCLUDED (correct)
  Row inserted at 06:00:01 on source clock? EXCLUDED (source says future)
  Row inserted between 06:00:00 and 06:00:02? POTENTIALLY MISSED

  Fix: always use the SOURCE DATABASE's NOW() as the upper bound:
    SELECT NOW() FROM source_db  -- source time, not pipeline server time
    Query: WHERE updated_at > last_checkpoint AND updated_at <= source_now
  Or: overlap the extraction window by 5 minutes:
    since = last_watermark - timedelta(minutes=5)
    until = source_now
    Use upsert at destination to handle re-processed rows idempotently.

PITFALL 4: BACKFILL AND LATE-ARRIVING UPDATES
  Row updated_at: 2026-03-17 11:58:00
  Pipeline checkpoint at: 2026-03-17 12:00:00
  Row arrives in source DB at: 2026-03-17 12:03:00 (application retry delayed)
  Next pipeline run query: WHERE updated_at > 12:00:00
  Row's updated_at (11:58:00) < checkpoint (12:00:00) → MISSED

  Fix: use an overlap window that extends the lower bound back by a safe margin
    since = last_checkpoint - timedelta(minutes=30)  # 30-minute lookback
  Upsert handles duplicates from the overlap idempotently.
  Cost: ~30 minutes of re-processed rows per run (small if update volume is moderate)`}</CodeBox>

        <SubTitle>Watermark column selection — the decision matters</SubTitle>

        <CompareTable
          headers={[
            { label: 'Watermark type' },
            { label: 'How to query', color: '#00e676' },
            { label: 'Works for updates?', color: '#7b61ff' },
            { label: 'Works for deletes?', color: '#f97316' },
            { label: 'Notes', color: '#4285f4' },
          ]}
          keys={['wm', 'query', 'updates', 'deletes', 'notes']}
          rows={[
            { wm: 'updated_at (TIMESTAMPTZ)', query: 'WHERE updated_at > checkpoint', updates: '✓ Yes', deletes: '✗ No', notes: 'Best option. Requires the application to maintain updated_at correctly.' },
            { wm: 'created_at only', query: 'WHERE created_at > checkpoint', updates: '✗ No — updates not captured', deletes: '✗ No', notes: 'Only correct for append-only tables (logs, events, immutable facts).' },
            { wm: 'Auto-increment PK', query: 'WHERE order_id > max_id', updates: '✗ No — updates not captured', deletes: '✗ No', notes: 'Only for insert-only tables. Breaks if records are inserted out of ID order.' },
            { wm: 'Combination (created OR updated)', query: 'WHERE created_at > cp OR updated_at > cp', updates: '✓ Yes', deletes: '✗ No', notes: 'Handle tables with separate created_at and updated_at columns carefully.' },
            { wm: 'None — use CDC', query: 'Read WAL directly', updates: '✓ Yes', deletes: '✓ Yes', notes: 'When no reliable timestamp exists. Most complete but most complex.' },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 04 — CDC ─────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Pattern Three: Change Data Capture" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(249,115,22,0.12)', border: '2px solid #f97316',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#f97316',
            fontFamily: 'var(--font-mono)',
          }}>CDC</div>
          <h2 style={{
            fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Change Data Capture — The Complete Picture</h2>
        </div>

        <Para>
          Change Data Capture reads the database's own transaction log — the
          Write-Ahead Log (WAL) in PostgreSQL, the binlog in MySQL — and converts
          every insert, update, and delete into a structured event that the pipeline
          can consume. CDC captures everything the database records, which includes
          operations that are invisible to any query-based approach: hard deletes,
          multi-table transactions, and changes happening faster than the query
          polling interval.
        </Para>

        <SubTitle>How CDC works at the database level</SubTitle>

        <CodeBox label="CDC internals — from database operation to pipeline event">{`HOW POSTGRESQL WAL-BASED CDC WORKS:

  APPLICATION writes to PostgreSQL:
    BEGIN;
    UPDATE orders SET status = 'delivered' WHERE order_id = 9284751;
    INSERT INTO delivery_logs (order_id, delivered_at) VALUES (9284751, NOW());
    COMMIT;

  POSTGRESQL WAL records (binary format, simplified):
    {LSN: 0/1A3F2B8, txn: 847291, op: UPDATE, table: orders,
     old: {order_id: 9284751, status: 'confirmed'},
     new: {order_id: 9284751, status: 'delivered'}}
    {LSN: 0/1A3F2BC, txn: 847291, op: INSERT, table: delivery_logs,
     new: {order_id: 9284751, delivered_at: '2026-03-17T20:14:32Z'}}
    {LSN: 0/1A3F2C0, txn: 847291, op: COMMIT}

  DEBEZIUM reads WAL via PostgreSQL's logical replication protocol:
    Decodes binary WAL records into structured JSON events
    Publishes to Kafka topic: 'prod.public.orders'

  KAFKA MESSAGE (what the pipeline consumer receives):
    {
      "before": {"order_id": 9284751, "status": "confirmed"},
      "after":  {"order_id": 9284751, "status": "delivered"},
      "op":     "u",          // u=update, c=create, r=read/snapshot, d=delete
      "ts_ms":  1710698072847,
      "source": {
        "db":    "production",
        "table": "orders",
        "lsn":   28437128,     // log sequence number — position in WAL
        "txId":  847291
      }
    }

  For a DELETE:
    {
      "before": {"order_id": 9284751, "status": "delivered"},
      "after":  null,
      "op":     "d"            // delete — before image available, after is null
    }

  CDC CAPTURES EVERYTHING:
  ✓ INSERT  → op: "c", before: null, after: {new row}
  ✓ UPDATE  → op: "u", before: {old values}, after: {new values}
  ✓ DELETE  → op: "d", before: {deleted row}, after: null
  ✓ Schema changes (with schema registry) → schema evolution events
  ✓ Transaction boundaries → group multi-table operations atomically`}</CodeBox>

        <SubTitle>Setting up CDC with Debezium on PostgreSQL</SubTitle>

        <CodeBox label="PostgreSQL CDC setup — step by step">{`# STEP 1: Configure PostgreSQL for logical replication
# Edit postgresql.conf:
wal_level = logical           # must be 'logical' (not 'replica' or 'minimal')
max_replication_slots = 10    # number of CDC consumers allowed
max_wal_senders = 10          # parallel WAL streaming connections

# Restart PostgreSQL after changing wal_level.

# STEP 2: Create a dedicated replication user
CREATE USER debezium_user REPLICATION LOGIN PASSWORD 'strong_password';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO debezium_user;
GRANT USAGE ON SCHEMA public TO debezium_user;

# STEP 3: Create a logical replication slot (tracks CDC position)
-- Run in psql:
SELECT pg_create_logical_replication_slot('debezium_slot', 'pgoutput');
-- pgoutput is the built-in PostgreSQL logical replication plugin

# STEP 4: Configure Debezium connector (JSON config posted to Kafka Connect REST API)
# POST http://kafka-connect:8083/connectors
{
  "name": "freshmart-orders-cdc",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "database.hostname":      "postgres-primary",
    "database.port":          "5432",
    "database.user":          "debezium_user",
    "database.password":      "strong_password",
    "database.dbname":        "freshmart_prod",
    "database.server.name":   "freshmart",
    "table.include.list":     "public.orders,public.customers,public.payments",
    "plugin.name":            "pgoutput",
    "slot.name":              "debezium_slot",
    "publication.name":       "dbz_publication",
    "snapshot.mode":          "initial",
    "topic.prefix":           "freshmart.cdc",
    "key.converter":          "org.apache.kafka.connect.json.JsonConverter",
    "value.converter":        "org.apache.kafka.connect.json.JsonConverter",
    "transforms":             "unwrap",
    "transforms.unwrap.type": "io.debezium.transforms.ExtractNewRecordState",
    "transforms.unwrap.drop.tombstones": "false"
  }
}

# Debezium creates Kafka topics:
#   freshmart.cdc.public.orders
#   freshmart.cdc.public.customers
#   freshmart.cdc.public.payments

# STEP 5: Consume CDC events in your pipeline
from confluent_kafka import Consumer
import json

consumer = Consumer({
    'bootstrap.servers': 'kafka:9092',
    'group.id':          'freshmart-cdc-pipeline',
    'auto.offset.reset': 'earliest',
    'enable.auto.commit': False,   # manual commit — at-least-once delivery
})
consumer.subscribe(['freshmart.cdc.public.orders'])

while True:
    msg = consumer.poll(timeout=1.0)
    if msg is None or msg.error():
        continue

    event = json.loads(msg.value())
    op    = event.get('op')         # 'c', 'u', 'd', 'r'
    after = event.get('after')      # new row values (null for deletes)
    before = event.get('before')    # old row values (null for inserts)

    if op in ('c', 'u', 'r'):       # insert, update, or read (snapshot)
        upsert_to_silver(after)
    elif op == 'd':                  # delete
        soft_delete_in_silver(before['order_id'])

    consumer.commit()               # commit after successful processing`}</CodeBox>

        <SubTitle>CDC initial snapshot — handling the bootstrap problem</SubTitle>

        <Para>
          When you first set up CDC, you need to copy the existing table data before
          the CDC stream begins. This is the initial snapshot — Debezium handles it
          automatically with <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>snapshot.mode: initial</code>.
          It reads the entire table once at startup, emitting each row as an
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> op: "r"</code> (read)
          event, then switches to streaming WAL changes. The pipeline sees a seamless
          sequence: snapshot rows first, then real-time changes.
        </Para>

        <CodeBox label="CDC snapshot modes — choosing the right bootstrap strategy">{`SNAPSHOT MODES (Debezium configuration):

snapshot.mode = initial (default)
  → On first start: read entire table as "r" events (consistent snapshot)
  → After snapshot: stream WAL changes
  → Use when: you need historical data AND going forward changes
  → Note: snapshot can take hours for large tables

snapshot.mode = never
  → No snapshot — start streaming from current WAL position
  → Use when: you already populated the destination from a separate bulk load
              and only need forward changes
  → Danger: you will miss changes that occurred before the CDC connector started

snapshot.mode = schema_only
  → Capture table schema but no data rows
  → Only stream going-forward changes
  → Use when: destination is pre-populated (e.g., restored from backup)

snapshot.mode = always
  → Full snapshot on every connector restart
  → Only use in development/testing — very expensive in production

PRACTICAL BOOTSTRAP STRATEGY FOR LARGE TABLES:
  For a 500M row orders table, Debezium snapshot takes 8+ hours.
  Better approach:
    1. pg_dump → S3 (parallel, fast: 1-2 hours)
    2. Bulk load S3 dump to destination
    3. Start Debezium with snapshot.mode=schema_only from the WAL LSN
       at the time the dump was taken
    4. Apply WAL events from that LSN forward (catches up during/after bulk load)
  This reduces bootstrap from 8 hours to 2 hours for large tables.`}</CodeBox>

        <SubTitle>CDC operational considerations</SubTitle>

        <CodeBox label="CDC in production — operational concerns every DE must know">{`CONCERN 1: REPLICATION SLOT BLOAT
  A PostgreSQL replication slot retains WAL segments until the consumer
  has confirmed reading them. If the CDC consumer is down or slow,
  WAL accumulates indefinitely on the source database.
  A slow consumer can fill the source disk and crash the database.

  Monitoring: SELECT slot_name, pg_wal_lsn_diff(pg_current_wal_lsn(),
              restart_lsn) AS lag_bytes FROM pg_replication_slots;
  Alert when lag_bytes > 10 GB.
  Action: if consumer is stuck, DROP the replication slot (accepts data loss)
          rather than let the source database fill up.

CONCERN 2: SLOT LAG GROWING
  pg_stat_replication shows the gap between source WAL and consumer position.
  Lag grows when: high write volume, consumer processing is slow,
                  network between source and consumer is slow.
  Monitor: set up Datadog/Prometheus alert when replication lag > 5 minutes.

CONCERN 3: TABLE SCHEMA CHANGES (DDL events)
  Adding a column to the source table mid-stream:
  → Events before the column addition have the old schema
  → Events after have the new schema
  → Debezium (with Schema Registry) handles this automatically
  → Without Schema Registry: your consumer may fail to parse new event schema
  ALWAYS use Confluent Schema Registry with Debezium in production.

CONCERN 4: AT-LEAST-ONCE DELIVERY
  Debezium + Kafka provides at-least-once delivery — the same event
  may be delivered more than once during consumer restarts or failures.
  Destination must handle idempotently: upsert on primary key, not INSERT.
  Never use CDC with a plain INSERT at destination.

CONCERN 5: INITIAL SNAPSHOT SIZE
  For tables > 100M rows, initial snapshot is expensive.
  Use the pg_dump + schema_only approach described above.
  Always monitor snapshot progress: Debezium metrics show rows snapshotted.

CDC LATENCY BENCHMARKS (Debezium + Kafka + consumer):
  Source write to Kafka event: 50–200ms
  Kafka event to consumer processing: 10–100ms
  Consumer to destination write: 50–500ms
  Total end-to-end (typical): 200ms – 1 second
  This is suitable for: near-real-time dashboards, data lake freshness
  NOT suitable for: synchronous application flow (too slow for user-facing)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Full Comparison ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Complete Comparison" />
        <SectionTitle>Full Load vs Incremental vs CDC — Every Dimension</SectionTitle>

        <CompareTable
          headers={[
            { label: 'Dimension' },
            { label: 'Full Load', color: '#00e676' },
            { label: 'Incremental', color: '#7b61ff' },
            { label: 'CDC', color: '#f97316' },
          ]}
          keys={['dim', 'full', 'incremental', 'cdc']}
          rows={[
            { dim: 'What is read', full: 'Every row, every run', incremental: 'Only rows with updated_at > checkpoint', cdc: 'Every database operation from WAL' },
            { dim: 'Captures inserts', full: '✓ Yes', incremental: '✓ Yes (via updated_at or created_at)', cdc: '✓ Yes (op: c)' },
            { dim: 'Captures updates', full: '✓ Yes (overwrites)', incremental: '✓ Yes (if updated_at maintained)', cdc: '✓ Yes (op: u, with before/after)' },
            { dim: 'Captures hard deletes', full: '✓ Yes (row absent after reload)', incremental: '✗ No (deleted rows invisible to query)', cdc: '✓ Yes (op: d, with before image)' },
            { dim: 'Source load', full: 'Full table scan every run — high', incremental: 'Index scan on watermark column — low', cdc: 'WAL streaming — minimal (async read)' },
            { dim: 'Latency', full: 'Run interval (minutes to hours)', incremental: 'Run interval (minutes to hours)', cdc: 'Near-real-time (seconds)' },
            { dim: 'Before image available', full: '✗ No', incremental: '✗ No', cdc: '✓ Yes — previous values before change' },
            { dim: 'Complexity', full: 'Low', incremental: 'Medium', cdc: 'High' },
            { dim: 'Infrastructure required', full: 'Source DB + destination', incremental: 'Source DB + destination + checkpoint', cdc: 'WAL logical replication + Kafka + Debezium + destination' },
            { dim: 'Requires source config', full: 'No', incremental: 'No (read-only query)', cdc: 'Yes — wal_level=logical, replication slot' },
            { dim: 'Recovery from failure', full: 'Re-run full load', incremental: 'Re-run from last checkpoint', cdc: 'Resume from last committed Kafka offset' },
            { dim: 'Best for', full: 'Small tables, reference data, no change tracking', incremental: 'Large append-heavy tables with updated_at', cdc: 'Any table with deletes, financial data, low latency' },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 06 — Decision Framework ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Decision Framework" />
        <SectionTitle>How to Choose the Right Pattern for Any Source Table</SectionTitle>

        <Para>
          The choice between the three patterns is never arbitrary — it is determined
          by the source table's characteristics. Answer these four questions in order
          and the right pattern becomes clear.
        </Para>

        <CodeBox label="Ingestion pattern decision framework">{`QUESTION 1: What is the table's approximate row count and growth rate?
  < 1 million rows AND grows slowly?    → Full Load is viable (fast, simple)
  > 1 million rows OR grows quickly?    → Incremental or CDC required

QUESTION 2: Does the table have a reliable updated_at column?
  Yes (maintained by application on every write):
    → Incremental is viable. Continue to Question 3.
  No (only created_at, or no timestamp at all):
    → If table is insert-only: use created_at or auto-increment PK
    → If table has updates/deletes: CDC or Full Load (no other option)

QUESTION 3: Are hard deletes important for the destination?
  No (deletes are rare, destination can lag on deletions, or soft deletes used):
    → Incremental is sufficient.
  Yes (deletes must be captured accurately and promptly):
    → CDC required. Incremental cannot see hard deletes.

QUESTION 4: What is the latency requirement?
  > 15 minutes acceptable:
    → Incremental with periodic schedule is fine.
  < 15 minutes required:
    → CDC (near-real-time) or micro-batch incremental (5-minute interval).
  < 1 minute required:
    → CDC only.

PRACTICAL ROUTING TABLE:
  product_categories    (500 rows, rarely changes)               → Full Load
  store_master          (10 rows, updated monthly)               → Full Load
  orders                (500M rows, updated frequently)          → Incremental
  customers             (10M rows, hard deletes for GDPR)        → CDC
  payment_transactions  (1B rows, financial accuracy critical)   → CDC
  delivery_events       (append-only, no deletes)                → Incremental
  inventory             (updates + deletes frequently)           → CDC
  promo_codes           (small, full correctness needed)         → Full Load
  audit_logs            (append-only, insert-only)               → Incremental (created_at)
  user_sessions         (frequent updates, deletes on logout)    → CDC`}</CodeBox>

        <SubTitle>The mixed-pattern architecture — most production platforms use all three</SubTitle>

        <CodeBox label="FreshMart ingestion architecture — all three patterns in use">{`FRESHMART DATA PLATFORM — INGESTION PATTERN BY TABLE:

  FULL LOAD (nightly, fast):
    reference.store_master          10 rows    → Replaces nightly
    reference.product_categories    850 rows   → Replaces nightly
    reference.city_tier_mapping     500 rows   → Replaces nightly
    reference.store_manager         10 rows    → Replaces nightly

  INCREMENTAL (every 15 minutes, updated_at watermark):
    orders                          500M rows  → updated_at watermark
    delivery_events                 2B rows    → created_at (append-only)
    customer_reviews                50M rows   → created_at (append-only)
    inventory_snapshots             daily      → full date partition replace

  CDC (continuous, sub-second latency):
    customers          (GDPR deletes must be captured)
    payments           (financial, every operation matters)
    merchant_accounts  (balance changes, fraud patterns)
    inventory_live     (real-time stock for flash sales)

  INGESTION PIPELINE SCHEDULE:
    00:00 UTC: Full load — all reference tables (5 minutes total)
    Every 15 min: Incremental — orders, delivery_events, reviews
    Continuous: CDC stream — customers, payments, merchants, inventory

  TOTAL INFRASTRUCTURE:
    Full Load: 2 cron jobs, no special infrastructure
    Incremental: 3 scheduled Airflow tasks
    CDC: 1 Debezium connector, 4 Kafka topics, 1 Kafka consumer group
    → Most data volume handled by incremental
    → Most operational complexity in CDC (but only for 4 tables)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Diagnosing Missing Data — Tracing It to the Ingestion Pattern</SectionTitle>

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
            Scenario — FreshMart · Data quality incident
          </div>

          <Para>
            The customer success team reports that cancelled orders are still showing
            up as "active" on the customer analytics dashboard. Orders that customers
            cancelled yesterday are appearing as "placed" in the Silver layer.
            You are assigned to investigate.
          </Para>

          <CodeBox label="Diagnosis — tracing missing updates to ingestion pattern">{`-- Step 1: confirm the discrepancy
-- Check order 9284751 (reported as wrong)
SELECT order_id, status, updated_at FROM production.orders
WHERE order_id = 9284751;
-- Returns: {order_id: 9284751, status: 'cancelled', updated_at: '2026-03-17 14:32:00'}

SELECT order_id, status, updated_at FROM silver.orders
WHERE order_id = 9284751;
-- Returns: {order_id: 9284751, status: 'placed', updated_at: '2026-03-17 08:14:00'}

-- Silver shows 'placed' from the morning run.
-- Source shows 'cancelled' since 14:32.
-- 6-hour gap. Why didn't the 15-minute incremental pick it up?

-- Step 2: check the watermark checkpoint
-- File: /data/checkpoints/orders_watermark.json
-- Contents: {"watermark": "2026-03-17T08:00:00+00:00"}
-- Watermark is from this MORNING! Has not advanced in 6 hours.

-- Step 3: check the incremental pipeline logs
tail -100 /var/log/airflow/orders_incremental_20260317.log | grep ERROR
-- 2026-03-17 08:15:42 ERROR Connection to source database timed out
-- 2026-03-17 08:15:42 ERROR Pipeline failed — checkpoint NOT advanced
-- (All subsequent runs also failed — Airflow retried but same DB issue)
-- 2026-03-17 14:00:00 INFO Database connection restored
-- 2026-03-17 14:00:02 INFO Loaded watermark: 2026-03-17T08:00:00+00:00
-- 2026-03-17 14:00:03 INFO Extracted 284,721 rows (updated 08:00 to 14:00)
-- 2026-03-17 14:00:47 INFO 284,721 rows upserted successfully
-- 2026-03-17 14:00:47 INFO Saved watermark: 2026-03-17T14:00:00+00:00

-- The pipeline recovered at 14:00 and processed the 6-hour backlog.
-- But the dashboard was still stale when the report was checked at 14:15
-- because the pipeline had just caught up and the analyst ran the query
-- while it was still processing.

-- Step 4: verify the fix
SELECT order_id, status FROM silver.orders WHERE order_id = 9284751;
-- Returns: {order_id: 9284751, status: 'cancelled'}  ← correct now

-- Root cause: 6-hour DB connectivity failure → incremental fell behind
-- The incremental pattern correctly recovered using the saved watermark.
-- The 6-hour gap was recovered exactly — no data was missed, no duplicates.
-- This is checkpointing working correctly.`}</CodeBox>

          <Para>
            The incident was not a bug in the ingestion pattern — it was a 6-hour
            source database outage. The incremental pattern with checkpointing
            recovered perfectly: it resumed exactly where it stopped, processed
            the backlog, and the Silver layer was correct within minutes of the
            database recovering.
          </Para>

          <Para>
            This is the correct behaviour. A full load pattern would have required
            a full table scan after recovery (6 hours). A CDC pattern would have
            required WAL catch-up (fast, but Kafka retention must have covered the
            6-hour gap). The incremental pattern recovered with no special handling
            — just the next scheduled run.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 08 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What are the three main data ingestion patterns and when would you use each?',
            a: `The three ingestion patterns are full load, incremental (high-watermark), and Change Data Capture.

Full load reads every row from the source and replaces the destination on every run. It is the simplest pattern — no watermark tracking, no change detection. Use it for small reference tables (product categories, store master, currency mappings) where the table is small enough that reading everything is fast, and where all three types of changes (inserts, updates, deletes) need to be reflected in the destination.

Incremental ingestion reads only rows that changed since the last run, tracked by a high-watermark column — typically updated_at. This scales to arbitrarily large tables because extraction time is proportional to change volume rather than total table size. Use it for large tables that have a reliable updated_at timestamp and where hard deletes are either not important or handled via soft deletes.

Change Data Capture reads the database transaction log (WAL in PostgreSQL, binlog in MySQL) to capture every insert, update, and delete as a structured event. It captures hard deletes (which both full load and incremental cannot do without source cooperation), provides sub-second latency, and includes the before-image of the row for updates. Use it for financial tables where every operation matters, any table where hard deletes must be reflected accurately, and any use case requiring near-real-time freshness.

Most production platforms use all three simultaneously: full load for reference tables, incremental for large transaction tables with soft deletes, and CDC for financial and customer tables where deletes matter.`,
          },
          {
            q: 'Q2. Why can\'t incremental ingestion detect hard deletes? What are the solutions?',
            a: `Incremental ingestion works by querying rows where updated_at is greater than the last checkpoint. A hard delete removes the row from the source table. There is no row to return from the query — the deleted row simply does not exist in the result set. The incremental pipeline has no visibility into what was there before.

This is a fundamental structural limitation. No matter how frequently you run the incremental query, deleted rows are invisible to it. The pipeline sees the world through a lens of "what rows exist now and were modified recently." Deletion is the absence of a row, and SQL queries return rows, not absences.

Three solutions exist. First, use CDC: the WAL contains a DELETE operation record with the before image of the deleted row. CDC can capture this and emit a delete event to the pipeline. This is the most complete solution but requires WAL-level access and additional infrastructure. Second, use soft deletes: instead of deleting rows, the source application sets a deleted_at timestamp or is_deleted flag and the row stays in the table. Soft deletes update the updated_at column, which the incremental query sees. The pipeline propagates the deletion flag to the destination. This requires the source application to be modified but is operationally simpler than CDC. Third, periodic full load reconciliation: run the incremental pattern daily for efficiency and run a weekly full load that overwrites the destination with the current source state, catching any accumulated deletions. Use upsert semantics in the daily incremental and full overwrite in the weekly reconciliation. The trade-off is that deletions are reflected with up to one week of lag.`,
          },
          {
            q: 'Q3. What is a WAL and why is it the basis for CDC?',
            a: `The Write-Ahead Log (WAL) is the mechanism by which databases guarantee durability and enable crash recovery. Every change a database makes — every INSERT, UPDATE, and DELETE — is written to the WAL before the actual data pages are modified. The WAL is sequential and append-only. On crash recovery, the database replays the WAL to apply any changes that were committed but not yet written to data pages.

CDC is based on the WAL because the WAL already contains an exact, ordered, complete record of every database operation. It is already maintained by the database for its own purposes — CDC just reads it. This gives CDC properties that no query-based approach can match: completeness (every operation, including deletes), ordering (WAL records are ordered by Log Sequence Number), and atomicity (multi-table transactions are represented as atomic groups in the WAL).

PostgreSQL exposes WAL content through a logical replication protocol. Debezium connects to PostgreSQL as a logical replication client, receives WAL records, decodes them from binary format into structured JSON, and publishes them to Kafka. The position in the WAL is tracked by Log Sequence Number — the consumer commits the LSN it has processed, and Debezium resumes from that position on restart.

The WAL-based approach has one critical operational requirement: PostgreSQL must be configured with wal_level=logical (not the default replica). This must be set before CDC is needed — it requires a database restart and cannot be changed on the fly. It also requires a replication slot, which retains WAL segments until the consumer acknowledges them. An unmonitored replication slot on a high-write database can fill the disk if the consumer falls behind.`,
          },
          {
            q: 'Q4. An orders table has 800 million rows and no updated_at column — only created_at. How would you design the ingestion?',
            a: `This scenario is common with tables that were designed for insert-only use cases but later had updates added without schema changes. The absence of updated_at means incremental by timestamp is not directly possible for updated rows.

I would first understand the table's actual usage pattern. Are orders ever updated after creation? If orders progress through status changes (placed → confirmed → delivered), there must be updates somewhere — either to this table or to a separate order_status table.

If the table is genuinely insert-only — orders are never modified, only created — then the created_at column works perfectly as an incremental watermark. Query WHERE created_at > checkpoint. This is efficient because created_at is typically indexed, the query returns only new rows, and since rows are never modified there is no risk of missing updates.

If the table has updates (status changes) but only exposes created_at, I have two options. First, add updated_at to the source table — work with the application team to add the column and backfill it from the database's internal row modification time (xmax or ctid in PostgreSQL can approximate this). This is the cleanest solution but requires source schema change. Second, use CDC — CDC reads the WAL and captures both INSERTs and UPDATEs regardless of whether the table has an application-maintained timestamp. CDC does not depend on the application schema at all.

A third pragmatic option for 800 million rows: use incremental on created_at for new orders (most of the volume), and layer a small periodic full reconciliation for a recent window (last 30 days) where order status changes are most likely. Most orders reach a final status within days. This gives 99.9% accuracy with the simplicity of incremental, with CDC reserved as a future upgrade when the operational investment is justified.`,
          },
          {
            q: 'Q5. What is a Debezium replication slot and what happens if you forget to monitor it?',
            a: `A PostgreSQL replication slot is a server-side object that tracks how far a logical replication consumer has read in the WAL. When Debezium creates a replication slot, PostgreSQL promises to retain all WAL segments from that slot's last confirmed position forward — it will not delete them for log rotation, even if disk space is running out.

The replication slot stores one critical piece of information: the LSN (Log Sequence Number) of the last WAL record the consumer acknowledged. PostgreSQL uses this to know which WAL segments are still needed. Before the consumer's LSN: WAL can be cleaned up. After it: WAL must be retained.

If you forget to monitor a replication slot, the consequence is potentially catastrophic. If the Debezium connector stops consuming — due to a bug, a network partition, or being deliberately stopped — the replication slot continues to mark WAL as "needed." The source database writes new data, accumulates WAL, and cannot clean it up. On a high-write database that produces gigabytes of WAL per hour, this can fill the server's disk in hours or days. A full disk on a PostgreSQL server crashes the database — not just the CDC pipeline, but the production application that depends on it.

The correct monitoring setup: query pg_replication_slots regularly and alert when the lag (pg_current_wal_lsn() - confirmed_flush_lsn) exceeds a threshold — typically 10 GB or 30 minutes of WAL. Also alert on inactive slots: any slot that has not advanced in more than a configured period should be investigated. If a slot is stale and cannot be recovered, the correct action is to drop it (pg_drop_replication_slot) rather than let it fill the disk — accept the data loss and re-snapshot from the current database state. This is a painful recovery but less painful than a full disk crash.`,
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
            error: `Incremental ingestion: Silver table has 20% fewer rows than source — rows silently missing with no pipeline error`,
            cause: 'The source table has rows that were hard-deleted since the last full reconciliation. The incremental pattern cannot detect these deletions — it only sees rows with updated_at greater than the watermark. Deleted rows have no updated_at at all. Over time, the gap between source and destination grows as more rows are deleted from source without being removed from destination.',
            fix: 'Immediate: count distinct primary keys in both source and destination, identify the specific missing/extra keys, and reconcile manually. Long-term: switch to CDC if deletes must be reflected promptly, or add a soft-delete pattern to the source (is_deleted column updated on deletion, which incremental can then detect). For periodic reconciliation: run a weekly full load that completely replaces the destination from source, using the destination\'s staging swap pattern to avoid downtime.',
          },
          {
            error: `Debezium connector error: ERROR: replication slot "debezium_slot" already exists — cannot start CDC connector`,
            cause: 'A previous Debezium connector instance created the replication slot and the connector was restarted (or a new instance was deployed) without the old slot being cleaned up. PostgreSQL prevents creating a duplicate slot name. If the old connector is still running, two consumers would compete for the same slot.',
            fix: 'Check if another Debezium connector is actively using the slot: SELECT * FROM pg_replication_slots WHERE slot_name = \'debezium_slot\'. If active=true and it is a stale/orphaned slot, drop it: SELECT pg_drop_replication_slot(\'debezium_slot\'). Then restart the connector — it will recreate the slot and begin a fresh snapshot. If you want to resume from where the old slot left off, do NOT drop it — configure the new connector to use the existing slot (Debezium supports this with the correct slot.name configuration).',
          },
          {
            error: `Full load pipeline: destination table is empty during business hours — queries return zero rows for 45 minutes`,
            cause: 'The full load pipeline used TRUNCATE followed by INSERT within the same transaction, but the INSERT took 45 minutes to complete. During this window, other sessions using READ COMMITTED isolation saw the table as empty — TRUNCATE committed but INSERT had not. MVCC in PostgreSQL means each statement in READ COMMITTED sees the latest committed state, and the latest committed state was the empty table after TRUNCATE.',
            fix: 'Use the staging table swap pattern instead of truncate-and-reload. Load into a new staging table: CREATE TABLE silver.store_master_new AS SELECT... then atomically rename: ALTER TABLE silver.store_master RENAME TO old; ALTER TABLE store_master_new RENAME TO store_master. The rename is instantaneous. Queries see either all-old or all-new, never empty. Alternatively, wrap TRUNCATE and INSERT in a single explicit transaction — queries using REPEATABLE READ or SERIALIZABLE will see the pre-truncate state until commit, but READ COMMITTED queries (the default) will still see empty during the window.',
          },
          {
            error: `CDC pipeline: same event processed twice — duplicate rows in destination despite ON CONFLICT clause`,
            cause: 'The Kafka consumer committed its offset before the destination write completed, or the consumer crashed after writing to the destination but before committing the Kafka offset. On restart, the consumer replayed the uncommitted event, processed it again, and the ON CONFLICT clause should have handled it — but the destination table is missing the UNIQUE constraint on order_id that the ON CONFLICT clause requires.',
            fix: 'Add the missing UNIQUE constraint: ALTER TABLE silver.orders ADD CONSTRAINT uq_order_id UNIQUE (order_id). Without this constraint, ON CONFLICT has nothing to conflict on and inserts a second row. For the immediate fix: deduplicate with DELETE FROM silver.orders WHERE ctid NOT IN (SELECT MIN(ctid) FROM silver.orders GROUP BY order_id). Also ensure Kafka offset is committed AFTER the destination write completes, not before — set enable.auto.commit=false and call consumer.commitSync() after confirming the write.',
          },
          {
            error: `Incremental pipeline: watermark not advancing despite successful runs — Silver table shows no new data after 3 hours`,
            cause: 'The pipeline extracted rows but the checkpoint file write failed silently (disk full, permissions error), or the checkpoint save code runs before the write to destination is confirmed. The pipeline reports success but the watermark stays at the old value. On the next run, it re-extracts the same rows it already processed.',
            fix: 'Always save the checkpoint AFTER confirming the destination write succeeded, never before. Wrap checkpoint save in explicit error handling: try: save_checkpoint(new_watermark) except Exception as e: log.error("Failed to save checkpoint: %s", e); raise. Check the checkpoint file exists and has the correct timestamp: cat /data/checkpoints/orders_watermark.json. Add a monitoring check: if the watermark has not advanced in 2× the run interval, alert. Also verify disk space: df -h /data/checkpoints before every write.',
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
        'Three ingestion patterns cover every source: Full Load (read everything, replace destination), Incremental High-Watermark (read only changed rows since last checkpoint), and CDC (read the database transaction log for every operation). Every source table fits one of these three.',
        'Full load is the right choice for small reference tables (under 1 million rows), tables with no reliable change tracking, and tables where deletes must be reflected and CDC is too complex. Use the staging table swap variant to avoid the empty-table window that truncate-and-reload creates.',
        'Incremental ingestion scales to billions of rows because extraction time is proportional to change volume, not total table size. It requires a reliable high-watermark column (updated_at is ideal). It cannot detect hard deletes — deleted rows are invisible to any query-based extraction.',
        'CDC reads the database transaction log (WAL in PostgreSQL) to capture every INSERT, UPDATE, and DELETE as a structured event. It is the only pattern that captures hard deletes with the before-image of the deleted row. It requires wal_level=logical on PostgreSQL and a replication slot.',
        'Watermark columns: updated_at (best — works for updates), created_at (only for insert-only tables), auto-increment PK (only for insert-only tables with sequential inserts). When none is available: CDC or full load.',
        'The four incremental ingestion pitfalls: hard deletes are invisible, missing updated_at forces full load or CDC, clock skew between source and pipeline server can skip rows (fix: use source DB\'s NOW() as upper bound), and late-arriving updates miss the window (fix: overlap the lower bound by 30 minutes and upsert).',
        'CDC infrastructure requires: wal_level=logical in postgresql.conf (requires DB restart), a dedicated replication user with REPLICATION privilege, a replication slot, and a Debezium connector publishing to Kafka. Always use Schema Registry with Debezium.',
        'Replication slot monitoring is critical. An unmonitored slot on a high-write database can fill the server disk and crash the production database. Alert when lag exceeds 10 GB or 30 minutes. If a slot is stale and unrecoverable, drop it rather than risk disk full.',
        'CDC provides at-least-once delivery — the same event can be delivered more than once on consumer restart. The destination must handle this idempotently with upserts and UNIQUE constraints on the business key. Never use plain INSERT with CDC.',
        'Most production platforms use all three patterns simultaneously: full load for reference tables (nightly, fast), incremental for large transaction tables (every 15 minutes), and CDC for financial and customer tables where deletes matter (continuous). Match the pattern to the table\'s characteristics, not to a personal preference.',
      ]} />

    </LearnLayout>
  )
}