import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
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
      section="Data Engineering — Module 23"
      readTime="65 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Three Patterns That Cover Everything" />
        <SectionTitle>Every Ingestion Problem Falls Into One of Three Patterns</SectionTitle>

        <Para>
          A data engineer&rsquo;s first job with any new source system is answering one
          question: how do I get data out of this reliably, completely, and
          without harming it? The answer is almost always a variant of one of
          three ingestion patterns.
        </Para>

        <Para>
          The three patterns exist on a spectrum from simple-but-expensive to
          complex-but-efficient. This module builds all three around FreshCart&rsquo;s
          actual table inventory — reference data, the orders table, and the
          tables where a missed delete is a real problem.
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

        <TryThis>
          Name one table you&rsquo;ve worked with and answer, honestly: how would you
          know if a row was deleted from the source? If the answer is &ldquo;I
          wouldn&rsquo;t,&rdquo; that table is probably ingested incrementally when it
          shouldn&rsquo;t be — keep that in mind through Part 03.
        </TryThis>
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
          Every run reads the complete source table and replaces the
          destination&rsquo;s content entirely. No watermarks, no change tracking.
          For small tables that change frequently in hard-to-track ways, this
          is often the correct and permanent choice.
        </Para>

        <SubSubTitle>Two implementation variants</SubSubTitle>

        <CodeBox label="Variant A — truncate and reload (simple, empty during the transaction)">{`BEGIN;
TRUNCATE TABLE silver.store_master;
INSERT INTO silver.store_master
SELECT store_id, store_name, city, region, is_active, manager_id FROM source.stores;
COMMIT;
-- other queries see either all-old or all-new, never empty (MVCC) — but only
-- while this single transaction is what they're reading against`}</CodeBox>

        <CodeBox label="Variant B — staging table swap (zero-downtime, always available)">{`CREATE TABLE silver.store_master_new AS
SELECT store_id, store_name, city, region, is_active, manager_id FROM source.stores;

BEGIN;
ALTER TABLE silver.store_master RENAME TO store_master_old;
ALTER TABLE silver.store_master_new RENAME TO store_master;
COMMIT;

DROP TABLE silver.store_master_old;
-- during load: store_master_old serves queries. after rename: store_master (new) does.
-- zero seconds where the table is empty or has partial data`}</CodeBox>

        <CodeBox label="The same pattern in Python">{`def full_load_with_swap(source_conn, dest_conn, table: str) -> int:
    df = pd.read_sql(f"SELECT * FROM {table}", source_conn)
    staging = f"{table}_staging"
    df.to_sql(staging, dest_conn, if_exists='replace', index=False)
    with dest_conn.cursor() as cur:
        cur.execute(f"ALTER TABLE {table} RENAME TO {table}_old")
        cur.execute(f"ALTER TABLE {staging} RENAME TO {table}")
        cur.execute(f"DROP TABLE {table}_old")
    dest_conn.commit()
    return len(df)`}</CodeBox>

        <Output>{`>>> full_load_with_swap(source_conn, dest_conn, 'store_master')
40
# 40 stores reloaded, zero downtime — analysts querying store_master mid-swap
# saw either the complete old table or the complete new one`}</Output>

        <SubSubTitle>When full load is genuinely the right choice</SubSubTitle>

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

        <SubSubTitle>When full load breaks down</SubSubTitle>

        <CodeBox label="Four failure modes, and the signal that tells you it's time to switch">{`1. TABLE GROWS TOO LARGE
   orders: 500M rows, full load takes 6h, SLA is 6 AM → barely fits.
   Signal to switch: full load duration > 20% of the run interval.

2. SOURCE LOAD DURING EXTRACTION
   A full table scan fills the buffer pool, evicting hot pages —
   the application slows down for 30-60 min afterward.
   Fix: extract from a read replica, never the primary.

3. DESTINATION INCONSISTENCY WINDOW
   TRUNCATE-then-INSERT (Variant A) leaves the table empty mid-transaction
   for any query outside that transaction. Fix: staging swap (Variant B).

4. RELOAD OVERWRITES LATE-ARRIVING CORRECTIONS
   A manual data fix in the destination gets silently overwritten by the
   next full load. Expected behavior — but teams get surprised by it.
   If destination edits must survive: use incremental or CDC instead.`}</CodeBox>
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
          A high-watermark column — typically <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>updated_at</code> — tracks
          progress. A 1-billion-row orders table receiving 100,000 changes a
          day only requires reading 100,000 rows per run, not 1 billion.
        </Para>

        <SubSubTitle>Checkpoint management — load and save, atomically</SubSubTitle>

        <CodeBox label="checkpoint.py">{`import json, logging
from datetime import datetime, timezone
from pathlib import Path

log = logging.getLogger('incremental_ingestion')
CHECKPOINT_FILE = Path('/data/checkpoints/orders_watermark.json')

def load_watermark() -> datetime:
    if CHECKPOINT_FILE.exists():
        wm = datetime.fromisoformat(json.loads(CHECKPOINT_FILE.read_text())['watermark'])
        log.info('Loaded watermark: %s', wm.isoformat())
        return wm
    default = datetime(2020, 1, 1, tzinfo=timezone.utc)
    log.info('No checkpoint found — starting from %s', default.isoformat())
    return default

def save_watermark(watermark: datetime) -> None:
    tmp = CHECKPOINT_FILE.with_suffix('.tmp')
    tmp.write_text(json.dumps({'watermark': watermark.isoformat()}))
    tmp.rename(CHECKPOINT_FILE)   # atomic on POSIX`}</CodeBox>

        <SubSubTitle>Extraction and loading</SubSubTitle>

        <CodeBox label="extract.py and load.py">{`def extract_changed_orders(conn, since: datetime, until: datetime) -> pd.DataFrame:
    """since is exclusive, until is inclusive — no boundary row re-processed or skipped."""
    df = pd.read_sql("""
        SELECT order_id, customer_id, store_id, order_amount, status, created_at, updated_at
        FROM orders WHERE updated_at > %s AND updated_at <= %s ORDER BY updated_at ASC
    """, conn, params=(since, until))
    log.info('Extracted %d rows (updated %s to %s)', len(df), since.isoformat(), until.isoformat())
    return df

def upsert_orders(df: pd.DataFrame, dest_conn) -> int:
    if df.empty:
        return 0
    with dest_conn.cursor() as cur:
        for _, row in df.iterrows():
            cur.execute("""
                INSERT INTO silver.orders (order_id, customer_id, store_id, order_amount, status, created_at, updated_at, ingested_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, NOW())
                ON CONFLICT (order_id) DO UPDATE SET status = EXCLUDED.status, updated_at = EXCLUDED.updated_at, ingested_at = NOW()
                WHERE silver.orders.updated_at < EXCLUDED.updated_at
            """, (row.order_id, row.customer_id, row.store_id, row.order_amount, row.status, row.created_at, row.updated_at))
    dest_conn.commit()
    return len(df)`}</CodeBox>

        <SubSubTitle>Wiring it together</SubSubTitle>

        <CodeBox label="run_incremental() — the whole cycle">{`def run_incremental(source_conn, dest_conn) -> dict:
    since = load_watermark()
    until = pd.read_sql("SELECT NOW() AT TIME ZONE 'UTC'", source_conn).iloc[0, 0].to_pydatetime()

    df = extract_changed_orders(source_conn, since, until)
    if df.empty:
        return {'rows_processed': 0, 'new_watermark': since.isoformat()}

    written = upsert_orders(df, dest_conn)
    save_watermark(until)   # only AFTER the write succeeded
    return {'rows_processed': written, 'new_watermark': until.isoformat()}`}</CodeBox>

        <Output>{`INFO Loaded watermark: 2026-03-17T05:45:00+00:00
INFO Extracted 1,842 rows (updated 2026-03-17T05:45:00+00:00 to 2026-03-17T06:00:00+00:00)
>>> run_incremental(source_conn, dest_conn)
{'rows_processed': 1842, 'new_watermark': '2026-03-17T06:00:00+00:00'}`}</Output>

        <SubSubTitle>The four pitfalls that break incremental in production</SubSubTitle>

        <CodeBox label="Hard deletes and a missing updated_at column">{`# PITFALL 1: HARD DELETES ARE INVISIBLE
# A deleted row produces no result from 'WHERE updated_at > checkpoint' —
# there's nothing left to return. Destination silently diverges from source.
# Fix A: use CDC (captures DELETE explicitly)
# Fix B: soft-delete column (deleted_at / is_deleted) — updates updated_at, so it's seen
# Fix C: periodic full-load reconciliation (weekly) if deletes are rare

# PITFALL 2: NO updated_at COLUMN
# Fix A: use max(primary_key) as watermark — ONLY safe if rows are insert-only
# Fix B: CDC (doesn't depend on an application-maintained timestamp)
# Fix C: full load, if the table is small enough`}</CodeBox>

        <CodeBox label="Clock skew and late-arriving updates">{`# PITFALL 3: CLOCK SKEW BETWEEN SOURCE AND PIPELINE SERVER
# pipeline clock 06:00:00, source clock 06:00:02 (2s ahead) —
# a row inserted at 06:00:01 on the source's clock looks like "the future" and gets excluded
# Fix: always use the SOURCE database's NOW() as the upper bound, never the pipeline server's

# PITFALL 4: LATE-ARRIVING UPDATES
# row.updated_at = 11:58:00, but it doesn't actually reach the source table until
# 12:03:00 (a delayed application retry) — by then the checkpoint has already moved past 12:00:00
# Fix: extend the LOWER bound back by a safe margin (e.g. 30 min) and rely on
# upsert to make the resulting re-processed overlap rows harmless`}</CodeBox>

        <SubSubTitle>Watermark column selection — the decision matters</SubSubTitle>

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
            { wm: 'created_at only', query: 'WHERE created_at > checkpoint', updates: '✗ No', deletes: '✗ No', notes: 'Only correct for append-only tables (logs, events, immutable facts).' },
            { wm: 'Auto-increment PK', query: 'WHERE order_id > max_id', updates: '✗ No', deletes: '✗ No', notes: 'Only for insert-only tables. Breaks if rows insert out of ID order.' },
            { wm: 'None — use CDC', query: 'Read WAL directly', updates: '✓ Yes', deletes: '✓ Yes', notes: 'When no reliable timestamp exists. Most complete, most complex.' },
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
          CDC reads the database&rsquo;s own transaction log — the Write-Ahead Log in
          PostgreSQL — and converts every insert, update, and delete into a
          structured event. This captures what no query-based approach can:
          hard deletes, multi-table transactions, and changes faster than any
          polling interval.
        </Para>

        <SubSubTitle>From a database operation to a Kafka message</SubSubTitle>

        <CodeBox label="One UPDATE, traced from SQL to WAL to the event a consumer receives">{`-- Application writes:
UPDATE orders SET status = 'delivered' WHERE order_id = 9284751;

-- PostgreSQL WAL records (simplified):
-- {LSN: 0/1A3F2B8, op: UPDATE, table: orders,
--  old: {order_id: 9284751, status: 'confirmed'}, new: {..., status: 'delivered'}}

-- Debezium decodes the WAL and publishes to Kafka topic 'prod.public.orders':
{
  "before": {"order_id": 9284751, "status": "confirmed"},
  "after":  {"order_id": 9284751, "status": "delivered"},
  "op": "u",   // c=create, u=update, d=delete, r=read/snapshot
  "source": {"lsn": 28437128, "txId": 847291}
}

-- A DELETE looks like: {"before": {...}, "after": null, "op": "d"}`}</CodeBox>

        <Output>{`CDC captures everything:
✓ INSERT → op: "c"   ✓ UPDATE → op: "u" (before+after)   ✓ DELETE → op: "d" (before image)
✓ Schema changes (with schema registry)   ✓ Transaction boundaries (atomic groups)`}</Output>

        <SubSubTitle>Setting up Debezium on PostgreSQL</SubSubTitle>

        <CodeBox label="Step 1-3 — the source database side">{`# postgresql.conf — must restart PostgreSQL after this
wal_level = logical
max_replication_slots = 10
max_wal_senders = 10

CREATE USER debezium_user REPLICATION LOGIN PASSWORD 'strong_password';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO debezium_user;

SELECT pg_create_logical_replication_slot('debezium_slot', 'pgoutput');`}</CodeBox>

        <CodeBox label="Step 4 — the Debezium connector config">{`// POST http://kafka-connect:8083/connectors
{
  "name": "freshcart-orders-cdc",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "database.hostname": "postgres-primary",
    "database.dbname": "freshcart_prod",
    "table.include.list": "public.orders,public.customers,public.payments",
    "plugin.name": "pgoutput",
    "slot.name": "debezium_slot",
    "snapshot.mode": "initial",
    "topic.prefix": "freshcart.cdc"
  }
}
// creates Kafka topics: freshcart.cdc.public.{orders,customers,payments}`}</CodeBox>

        <CodeBox label="Step 5 — consuming the events">{`consumer = Consumer({'bootstrap.servers': 'kafka:9092', 'group.id': 'freshcart-cdc-pipeline',
                      'enable.auto.commit': False})   # manual commit — at-least-once
consumer.subscribe(['freshcart.cdc.public.orders'])

while True:
    msg = consumer.poll(timeout=1.0)
    if msg is None or msg.error():
        continue
    event = json.loads(msg.value())
    if event['op'] in ('c', 'u', 'r'):
        upsert_to_silver(event['after'])
    elif event['op'] == 'd':
        soft_delete_in_silver(event['before']['order_id'])
    consumer.commit()   # only after the write succeeds`}</CodeBox>

        <SubSubTitle>The initial snapshot — bootstrapping a large table</SubSubTitle>

        <Para>
          The first time CDC starts, it needs the existing data too, not just
          future changes. <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>snapshot.mode: initial</code> reads
          the entire table as <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>&quot;r&quot;</code> events
          before switching to streaming — but for 500M rows that snapshot alone can take 8+ hours.
        </Para>

        <CodeBox label="A faster bootstrap for large tables">{`# snapshot.mode options: initial (default, full read then stream) | never (stream only,
# misses everything before connector start) | schema_only (schema only, no data) | always (dev only)

# PRACTICAL BOOTSTRAP for a 500M-row table:
# 1. pg_dump → S3 (parallel, 1-2 hours)
# 2. Bulk load the S3 dump into the destination
# 3. Start Debezium with snapshot.mode=schema_only, from the WAL LSN at dump time
# 4. Apply WAL events from that LSN forward — catches up during/after the bulk load
# → reduces bootstrap from 8 hours to ~2 hours`}</CodeBox>

        <SubSubTitle>Operational concerns every DE must know</SubSubTitle>

        <CodeBox label="Replication slot bloat and lag — the two things that page you">{`-- A stuck consumer means WAL accumulates on the SOURCE forever until it's read.
-- Monitor:
SELECT slot_name, pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn) AS lag_bytes
FROM pg_replication_slots;
-- Alert when lag_bytes > 10 GB. If the consumer is unrecoverable: DROP the slot
-- (accepting data loss) rather than let the source disk fill and crash the database.`}</CodeBox>

        <Output>{`CDC LATENCY (Debezium + Kafka + consumer), end to end:
Source write → Kafka event:        50-200ms
Kafka event → consumer processing:  10-100ms
Consumer → destination write:       50-500ms
Total: 200ms - 1s — fine for near-real-time dashboards, NOT for synchronous app flow`}</Output>

        <Callout type="warning">
          CDC + Kafka is at-least-once delivery — the same event can arrive
          twice on consumer restart. The destination write must be a genuine
          upsert on a UNIQUE business key. A plain INSERT with CDC will
          eventually double a row.
        </Callout>
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
            { dim: 'Captures hard deletes', full: '✓ Yes (row absent after reload)', incremental: '✗ No (invisible to query)', cdc: '✓ Yes (op: d, with before image)' },
            { dim: 'Source load', full: 'Full table scan every run — high', incremental: 'Index scan on watermark — low', cdc: 'WAL streaming — minimal (async)' },
            { dim: 'Latency', full: 'Run interval', incremental: 'Run interval', cdc: 'Near-real-time (seconds)' },
            { dim: 'Before image available', full: '✗ No', incremental: '✗ No', cdc: '✓ Yes — previous values' },
            { dim: 'Complexity', full: 'Low', incremental: 'Medium', cdc: 'High' },
            { dim: 'Requires source config', full: 'No', incremental: 'No', cdc: 'Yes — wal_level=logical, replication slot' },
            { dim: 'Recovery from failure', full: 'Re-run full load', incremental: 'Re-run from checkpoint', cdc: 'Resume from last Kafka offset' },
            { dim: 'Best for', full: 'Small tables, reference data', incremental: 'Large append-heavy tables', cdc: 'Deletes, financial data, low latency' },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 06 — Decision Framework ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Decision Framework" />
        <SectionTitle>How to Choose the Right Pattern for Any Source Table</SectionTitle>

        <Para>
          The choice is never arbitrary — it&rsquo;s determined by the source
          table&rsquo;s characteristics. Answer these four questions in order and the
          right pattern becomes clear.
        </Para>

        <CodeBox label="Four questions, in order">{`1. Row count and growth rate?
   < 1M rows, grows slowly  → Full Load is viable
   > 1M rows or grows fast  → Incremental or CDC required

2. Reliable updated_at column?
   Yes → Incremental is viable, continue to Q3
   No, insert-only → use created_at or auto-increment PK
   No, has updates/deletes → CDC or Full Load only

3. Do hard deletes matter for the destination?
   No (rare, or soft-deleted) → Incremental is sufficient
   Yes → CDC required — incremental cannot see hard deletes

4. Latency requirement?
   > 15 min acceptable → Incremental on a schedule
   < 15 min           → CDC, or 5-minute micro-batch incremental
   < 1 min             → CDC only`}</CodeBox>

        <CodeBox label="Practical routing, FreshCart's own tables">{`product_categories    (500 rows, rarely changes)             → Full Load
orders                (500M rows, updated frequently)        → Incremental
customers             (10M rows, hard deletes for GDPR)      → CDC
payment_transactions  (1B rows, financial accuracy critical) → CDC
delivery_events       (append-only, no deletes)              → Incremental (created_at)
inventory             (updates + deletes frequently)         → CDC`}</CodeBox>

        <SubSubTitle>Most production platforms use all three at once</SubSubTitle>

        <CodeBox label="FreshCart's actual ingestion schedule">{`FULL LOAD (nightly, 5 min total):
  reference.store_master, reference.product_categories, reference.city_tier_mapping

INCREMENTAL (every 15 min, updated_at watermark):
  orders (500M rows), delivery_events (2B rows, created_at), customer_reviews (created_at)

CDC (continuous, sub-second latency):
  customers (GDPR deletes), payments (financial), merchant_accounts, inventory_live

TOTAL INFRASTRUCTURE:
  Full load: 2 cron jobs. Incremental: 3 Airflow tasks.
  CDC: 1 Debezium connector, 4 Kafka topics, 1 consumer group.
  → Most data volume is incremental. Most operational complexity is CDC — for only 4 tables.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Misconceptions ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 07 — Misconceptions" />
        <SectionTitle>Five Misconceptions About Ingestion Patterns</SectionTitle>

        {[
          {
            wrong: '"Incremental ingestion is strictly better than full load — always prefer it"',
            right: 'Part 02 lists real cases where full load is the correct, permanent choice: small reference tables, tables with no reliable timestamp, and tables where deletes matter but CDC is more infrastructure than the table is worth. Incremental adds real complexity (checkpoints, watermark pitfalls) that isn\'t worth paying for on a 500-row table.',
          },
          {
            wrong: '"If a table has an updated_at column, incremental ingestion captures everything that matters"',
            right: 'It captures every UPDATE, but Part 03\'s Pitfall 1 is specific: a hard DELETE produces no row for the query to return at all, regardless of how good updated_at is. An updated_at column solves the update problem, not the delete problem — those are two separate risks.',
          },
          {
            wrong: '"CDC is just a faster version of incremental ingestion"',
            right: 'The difference isn\'t speed, it\'s what\'s structurally visible — Part 04\'s before/after image and explicit delete events come from reading the WAL directly, something no polling query at any frequency can produce. A CDC pipeline running once an hour still captures deletes that a 1-minute incremental poll cannot.',
          },
          {
            wrong: '"A replication slot is just Debezium\'s internal bookkeeping — nothing to actively monitor"',
            right: 'This module\'s Error Library and Part 04\'s operational concerns both treat this as a genuine production risk: an unmonitored, stuck slot causes PostgreSQL to retain WAL indefinitely, and on a high-write table that fills the source disk and crashes the PRODUCTION database, not just the CDC pipeline.',
          },
          {
            wrong: '"Once you pick full load, incremental, or CDC for a table, that\'s a permanent architectural decision"',
            right: 'Part 06\'s FreshCart routing table shows all three patterns coexisting across different tables in the same platform, and Part 02\'s "signal to switch" (full load duration exceeding 20% of the run interval) is specifically meant to trigger re-evaluating that decision as a table grows — the right pattern for a table today may not be the right one in a year.',
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

      {/* ── Part 08 — Real World ──────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 08 — Real World" />
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
            Scenario — FreshCart · Data quality incident
          </div>

          <Para>
            The customer success team reports that cancelled orders are still
            showing up as &ldquo;active&rdquo; on the dashboard. Orders customers cancelled
            yesterday appear as &ldquo;placed&rdquo; in the Silver layer.
          </Para>

          <CodeBox label="Diagnosis — confirming the gap and finding the checkpoint">{`SELECT order_id, status, updated_at FROM production.orders WHERE order_id = 9284751;
-- {status: 'cancelled', updated_at: '2026-03-17 14:32:00'}
SELECT order_id, status, updated_at FROM silver.orders WHERE order_id = 9284751;
-- {status: 'placed', updated_at: '2026-03-17 08:14:00'}   ← 6-hour gap

-- checkpoint file: {"watermark": "2026-03-17T08:00:00+00:00"} — hasn't moved in 6 hours

$ tail -100 /var/log/airflow/orders_incremental_20260317.log | grep ERROR
08:15:42 ERROR Connection to source database timed out
08:15:42 ERROR Pipeline failed — checkpoint NOT advanced
14:00:00 INFO  Database connection restored`}</CodeBox>

          <Output>{`14:00:02 INFO Loaded watermark: 2026-03-17T08:00:00+00:00
14:00:03 INFO Extracted 284,721 rows (updated 08:00 to 14:00)
14:00:47 INFO 284,721 rows upserted successfully
14:00:47 INFO Saved watermark: 2026-03-17T14:00:00+00:00

SELECT status FROM silver.orders WHERE order_id = 9284751;
-- 'cancelled' ← correct now`}</Output>

          <Para>
            This was not a bug in the ingestion pattern — it was a 6-hour source
            database outage. The incremental pattern with checkpointing
            recovered perfectly: it resumed exactly where it stopped, processed
            the backlog, and Silver was correct within minutes of the database
            recovering. A full load would have needed a full 6-hour table scan
            to recover the same ground; CDC would have needed Kafka retention
            to have covered the whole 6-hour gap. Incremental just needed its
            next scheduled run.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Interview Prep ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 09 — Interview Prep" />
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

      {/* ── Common Mistakes ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Choosing incremental for a table without checking whether hard deletes actually happen there',
            a: 'A table that looks append-heavy today can start receiving deletes later (GDPR requests, a new "remove account" feature) with nobody revisiting the ingestion pattern — Part 03\'s Pitfall 1 becomes a silent, growing data gap. Ask specifically about deletes, not just updates, before picking incremental.',
          },
          {
            q: 'Using the pipeline server\'s clock instead of the source database\'s clock for the extraction upper bound',
            a: 'Even a few seconds of clock skew between the pipeline host and the source database can silently exclude rows right at the boundary — Part 03\'s Pitfall 3 is exactly this. Always fetch NOW() from the source connection itself, never from the pipeline\'s local system clock.',
          },
          {
            q: 'Setting up a Debezium connector without a monitoring alert on the replication slot',
            a: 'Part 04 and this module\'s Error Library both treat this as one of the highest-severity operational gaps in data engineering — an unmonitored slot doesn\'t just slow the CDC pipeline down, it can fill the SOURCE database\'s disk and crash production. Wire the lag alert before the connector goes live, not after an incident.',
          },
          {
            q: 'Saving the checkpoint before confirming the destination write succeeded',
            a: 'If the write then fails, the watermark has already advanced — the unwritten rows are silently skipped forever on the next run. Part 03\'s run_incremental() saves the watermark as the LAST step specifically to avoid this, matching the same rule taught in this track\'s idempotency module.',
          },
          {
            q: 'Treating a stale prod reference table as evidence full load "isn\'t needed anymore" for it',
            a: 'A rarely-changing table is exactly the case where full load is still correct and simplest — see Part 02\'s scenario list. Switching a 500-row reference table to incremental or CDC adds real operational complexity (checkpoints, replication slots) for a table that never needed it.',
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


      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 24 goes deep on Change Data Capture — log-based, trigger-based, and query-based CDC from the inside, including production gotchas around replication lag, schema changes, and log retention.
        </p>
        <Link href="/learn/data-engineering/change-data-capture" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 24 → Change Data Capture (CDC) — How It Works Under the Hood
        </Link>
      </div>
    </LearnLayout>
  )
}
