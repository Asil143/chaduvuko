import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
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

export default function IdempotencyAtomicityModule() {
  return (
    <LearnLayout
      title="Idempotency, Atomicity, and Pipeline Restartability"
      description="The three properties that separate reliable pipelines from fragile ones — precise definitions, implementation at every layer, and automatic failure recovery."
      section="Data Engineering — Module 26"
      readTime="70 min"
      updatedAt="August 2026"
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
          always produces the same correct output. Atomicity means each unit of
          work either completes fully or not at all. Restartability means a
          pipeline that fails at any point can resume from exactly where it
          stopped. This module builds all three around FreshCart&rsquo;s orders pipeline.
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

        <TryThis>
          Ask of any pipeline you&rsquo;ve written: &ldquo;what happens if this runs twice for
          the exact same input, back to back?&rdquo; If you don&rsquo;t know the answer with
          certainty, that pipeline isn&rsquo;t idempotent yet — it just hasn&rsquo;t been
          rerun in a way that exposed it.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 02 — Idempotency In Depth ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Idempotency" />
        <SectionTitle>Idempotency — Every Form It Takes in Data Engineering</SectionTitle>

        <Para>
          In mathematics, a function f is idempotent if f(f(x)) = f(x) — applying
          it twice gives the same result as applying it once. An idempotent
          pipeline run produces the same destination state whether it executes
          once or twenty times for the same input parameters.
        </Para>

        <SubSubTitle>Form 1 — write-layer idempotency: upserts and UNIQUE constraints</SubSubTitle>

        <CodeBox label="Plain INSERT vs upsert — the difference a rerun exposes">{`-- BAD: plain INSERT — NOT idempotent
INSERT INTO silver.orders (order_id, status, amount)
VALUES (9284751, 'delivered', 380.00);
-- run this twice → two rows with order_id = 9284751

-- GOOD: upsert — idempotent
INSERT INTO silver.orders (order_id, status, amount, updated_at)
VALUES (9284751, 'delivered', 380.00, '2026-03-17 20:14:32')
ON CONFLICT (order_id) DO UPDATE SET
    status = EXCLUDED.status, amount = EXCLUDED.amount, updated_at = EXCLUDED.updated_at
WHERE silver.orders.updated_at < EXCLUDED.updated_at;
-- the WHERE clause stops a replayed OLDER record from overwriting a newer one
-- REQUIRES a UNIQUE constraint or PK on order_id — verify it exists:
SELECT constraint_name FROM information_schema.table_constraints
WHERE table_name = 'orders' AND constraint_type IN ('PRIMARY KEY', 'UNIQUE');`}</CodeBox>

        <Output>{`>>> run pipeline for 2026-03-17, twice in a row
SELECT COUNT(*) FROM silver.orders WHERE order_date = '2026-03-17';
-- 48,234  (identical after both runs — upsert did its job)`}</Output>

        <SubSubTitle>Form 2 — extraction-layer idempotency: fixed windows, not relative ones</SubSubTitle>

        <CodeBox label="A relative window changes on rerun; a fixed one never does">{`-- BAD: relative window — NOT idempotent
SELECT * FROM orders WHERE updated_at > NOW() - INTERVAL '15 minutes';
-- a run at 06:00 extracts from 05:45; a rerun at 06:10 extracts from 05:55 —
-- rows between 05:45 and 05:55 are silently missed on the rerun

-- GOOD: fixed window, upper bound stored at run start
SELECT * FROM orders
WHERE updated_at > '2026-03-17 05:45:00'   -- from checkpoint
  AND updated_at <= '2026-03-17 06:00:00'; -- fixed at run start, not re-computed on retry`}</CodeBox>

        <SubSubTitle>Form 3 — file-output idempotency: overwrite, not append</SubSubTitle>

        <CodeBox label="Append duplicates on rerun; overwrite never does">{`# BAD: append — NOT idempotent (rerun adds duplicate rows to the same file)
# with open('s3://bucket/orders/2026-03-17.csv', 'a') as f: f.write(new_rows)

# GOOD: overwrite the partition — idempotent
df.write.mode('overwrite').partitionBy('order_date').parquet('s3://freshcart-lake/silver/orders')
# rerunning for 2026-03-17 overwrites the date=2026-03-17 partition —
# output is identical no matter how many times it runs`}</CodeBox>

        <SubSubTitle>Idempotency keys — for APIs and message systems</SubSubTitle>

        <Para>
          When a pipeline calls an external API or writes to a queue, the
          operation may be delivered more than once (at-least-once delivery).
          An idempotency key stops the duplicate from having a second real effect.
        </Para>

        <CodeBox label="A deterministic key from the operation's own inputs">{`import hashlib

def create_payment_idempotency_key(payment_id: str, amount: float, ts: str) -> str:
    """Same inputs → same key every time → API recognises and ignores the duplicate."""
    payload = f'{payment_id}:{amount}:{ts}'
    return hashlib.sha256(payload.encode()).hexdigest()[:32]

key = create_payment_idempotency_key('pay_xxx', 380.00, '2026-03-17T20:14:32Z')
response = requests.post('https://api.stripe.com/v1/payments',
    headers={'X-Idempotency-Key': key, 'Authorization': f'Bearer {api_key}'},
    json={'amount': 38000, 'currency': 'USD'})
# a retry with the same key returns the SAME response — the payment is not duplicated`}</CodeBox>

        <SubSubTitle>Consumer-side deduplication — Redis and a database table</SubSubTitle>

        <CodeBox label="Tracking which event IDs have already been processed">{`# Distributed dedup — Redis SET NX (atomic, safe for concurrent consumers)
def is_duplicate(event_id: str, redis_client) -> bool:
    result = redis_client.set(f'processed:{event_id}', '1', nx=True, ex=86400)
    return result is None   # None = key already existed = duplicate

# Database-level, for pipelines that must guarantee exactly-once:
CREATE TABLE IF NOT EXISTS pipeline.processed_events (
    event_id VARCHAR(100) PRIMARY KEY, processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO pipeline.processed_events (event_id) VALUES ('evt_xxx')
ON CONFLICT (event_id) DO NOTHING RETURNING event_id;
-- returns a row  → first time seeing this event → process it
-- returns nothing → duplicate → skip it`}</CodeBox>

        <Output>{`>>> INSERT ... ON CONFLICT (event_id) DO NOTHING RETURNING event_id  (2nd delivery of evt_xxx)
(0 rows)
# empty result set — the consumer knows to skip processing entirely`}</Output>
      </section>

      <Divider />

      {/* ── Part 03 — Atomicity In Depth ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Atomicity" />
        <SectionTitle>Atomicity — No Partial States, Ever</SectionTitle>

        <Para>
          Atomicity means each logical unit of work either completes fully or
          leaves no trace — never half a batch, never a truncated table that
          lost its data, never a file that was 60% written when the process died.
        </Para>

        <SubSubTitle>Transaction batching — the difference a crash exposes</SubSubTitle>

        <CodeBox label="Auto-commit per row vs one transaction per batch">{`# BAD: auto-commit per row — NOT atomic
conn.autocommit = True
for row in rows:
    cur.execute("INSERT INTO silver.orders ...", row)
# crash after row 23,000 of 50,000 → 23,000 rows in, 27,000 missing, no clean restart point

# GOOD: one transaction per batch — atomic
conn.autocommit = False
with conn:   # commits on exit, rolls back on exception
    for row in rows:
        cur.execute("INSERT INTO silver.orders ...", row)
    # crash mid-loop: the ENTIRE batch rolls back — destination unchanged, rerun is correct

# BETTER: bulk insert, 10-100× faster than a row loop
with conn:
    psycopg2.extras.execute_values(cur,
        "INSERT INTO silver.orders (order_id, status, amount) VALUES %s "
        "ON CONFLICT (order_id) DO UPDATE SET status = EXCLUDED.status",
        [(r['order_id'], r['status'], r['amount']) for r in rows], page_size=5000)`}</CodeBox>

        <SubSubTitle>Staging table swap — zero-downtime full reload</SubSubTitle>

        <CodeBox label="The old table serves queries until the exact instant of swap">{`with conn:
    cur.execute("CREATE TABLE silver.store_master_new AS SELECT * FROM source.stores")
    cur.execute("ALTER TABLE silver.store_master RENAME TO store_master_old")
    cur.execute("ALTER TABLE silver.store_master_new RENAME TO store_master")
    # ↑ from this line, ALL queries see new data — zero window of empty/partial data
    cur.execute("DROP TABLE silver.store_master_old")
# COMMIT: rename becomes permanent

-- Snowflake equivalent (atomic DDL):
ALTER TABLE silver.store_master SWAP WITH silver.store_master_new;   -- instant, no downtime`}</CodeBox>

        <Output>{`Readers, at every instant during the swap:
before commit:  store_master_old (old data, via MVCC)
after commit:   store_master (new data)
NEVER visible:  an empty table, a partially-loaded table, or two tables at once`}</Output>

        <SubSubTitle>File-level atomicity — write-then-rename and S3</SubSubTitle>

        <CodeBox label="write_parquet_atomically() — readers never see a partial file">{`from pathlib import Path

def write_parquet_atomically(df, final_path: str) -> None:
    final, tmp = Path(final_path), Path(final_path).with_suffix('.tmp.parquet')
    try:
        df.to_parquet(tmp, compression='zstd', index=False)   # potentially slow
        tmp.rename(final)   # atomic on POSIX — readers see old OR new, never partial
    except Exception:
        if tmp.exists():
            tmp.unlink()
        raise

# S3: a single PUT is atomic (object exists fully or not at all).
# Use a distinct temp prefix for in-progress writes, then copy to final:
#   write to:  s3://bucket/tmp/run-{run_id}/part-001.parquet
#   copy to:   s3://bucket/bronze/orders/date=2026-03-17/part-001.parquet
#   delete:    s3://bucket/tmp/run-{run_id}/part-001.parquet
# downstream readers only scan the bronze/ prefix — never see in-progress tmp/ files`}</CodeBox>

        <Callout type="tip">
          Delta Lake solves multi-file atomicity: writes go to the table
          directory first (invisible), then a single JSON entry in{' '}
          <code>_delta_log/</code> atomically makes all new files visible at once.
          If the process dies before that log entry is written, the orphaned
          Parquet files are simply invisible until <code>VACUUM</code> cleans them up.
        </Callout>

        <SubSubTitle>Pipeline-level atomicity — write, validate, then promote</SubSubTitle>

        <Para>
          A single write being atomic isn&rsquo;t enough if the pipeline itself has
          multiple steps. The write-validate-commit pattern: write to staging,
          validate, then atomically promote — if validation fails, production is
          never touched at all.
        </Para>

        <CodeBox label="Phase 1 and 2 — write to staging, then validate before touching production">{`def write_with_validation(rows: list[dict], dest_conn, run_id: str) -> None:
    staging_table = f'silver.orders_staging_{run_id.replace("-", "_")}'
    try:
        # Phase 1: write to staging — can fail, production is unaffected
        with dest_conn:
            dest_conn.execute(f'CREATE TABLE {staging_table} AS SELECT * FROM silver.orders WHERE 1=0')
            psycopg2.extras.execute_values(dest_conn.cursor(),
                f'INSERT INTO {staging_table} VALUES %s', [tuple(r.values()) for r in rows])

        # Phase 2: validate staging BEFORE it ever touches production
        with dest_conn.cursor() as cur:
            cur.execute(f'SELECT COUNT(*) FROM {staging_table} WHERE order_amount < 0')
            if cur.fetchone()[0] > 0:
                raise ValueError('Staging has negative order amounts')

            cur.execute("SELECT AVG(daily_count) FROM (SELECT DATE(ingested_at) d, COUNT(*) daily_count "
                        "FROM silver.orders WHERE ingested_at > NOW() - INTERVAL '7 days' GROUP BY 1) c")
            avg_daily = cur.fetchone()[0] or 0
            if avg_daily > 0 and abs(len(rows) - avg_daily) / avg_daily > 0.5:
                raise ValueError(f'Staging row count {len(rows)} deviates >50% from 7-day average {avg_daily:.0f}')`}</CodeBox>

        <CodeBox label="Phase 3 — promote, and always clean up staging either way">{`        # Phase 3: validation passed — atomically promote staging to production
        with dest_conn:
            dest_conn.execute(f"""
                INSERT INTO silver.orders SELECT * FROM {staging_table}
                ON CONFLICT (order_id) DO UPDATE SET status = EXCLUDED.status,
                    order_amount = EXCLUDED.order_amount, updated_at = EXCLUDED.updated_at
                WHERE silver.orders.updated_at < EXCLUDED.updated_at
            """)
    except Exception:
        raise   # staging still exists for inspection, production is unchanged
    finally:
        try:
            dest_conn.execute(f'DROP TABLE IF EXISTS {staging_table}')
            dest_conn.commit()
        except Exception:
            pass   # best-effort cleanup`}</CodeBox>

        <Output>{`>>> write_with_validation(rows_with_one_negative_amount, conn, run_id)
ValueError: Staging has negative order amounts
# production silver.orders: untouched, still showing yesterday's correct data
# the staging table is dropped in the finally block regardless`}</Output>
      </section>

      <Divider />

      {/* ── Part 04 — Restartability In Depth ────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Restartability" />
        <SectionTitle>Restartability — Automatic Recovery From Any Failure Point</SectionTitle>

        <Para>
          A restartable pipeline picks up exactly where it left off after any
          failure, with no human involvement. Restartability requires two
          things: a checkpoint that records progress accurately, and idempotent
          writes that make re-processing safe.
        </Para>

        <SubSubTitle>Checkpoint granularity — how much work is lost on failure</SubSubTitle>

        <CodeBox label="Coarse vs medium-grained checkpointing">{`COARSE (one checkpoint at end of run):
  Fails on row 9,847 of 10,000 → next run re-processes ALL 10,000 from scratch.
  Cost: O(run_size) lost. Complexity: low. Use for: fast runs (< 5 min).

MEDIUM (checkpoint after each batch):
  Fails on batch 8 of 10 → next run re-processes only batches 8-10 (3,000 rows).
  Cost: O(batch_size) lost. Complexity: medium. Use for: long runs (> 10 min).

  batch_watermark = since
  for batch in extract_batches(since, until):
      transform_and_load(batch)
      batch_watermark = batch[-1]['updated_at']
      save_watermark(batch_watermark)   # checkpoint after EACH batch`}</CodeBox>

        <Output>{`FreshCart's silver_orders pipeline: 10,000 rows, batch_size=1,000, fails on batch 8
Coarse:  next run re-extracts and re-processes 10,000 rows (~12 min)
Medium:  next run re-extracts and re-processes 3,000 rows (~4 min)
Both produce the identical final row count — medium is just faster to recover`}</Output>

        <SubSubTitle>Designing for restartability — the checklist</SubSubTitle>

        {[
          {
            check: 'Fixed extraction windows — upper bound set at run start',
            detail: 'Store the run\'s upper bound (source_now) in the run record or pass it as a parameter. Retried runs use the same upper bound as the original run, not a new "now."',
            code: `run_upper_bound = get_source_now(conn)   # source DB time at run start
run_record.store('upper_bound', run_upper_bound.isoformat())
# on retry: load from run_record instead of re-computing`,
          },
          {
            check: 'Idempotent destination writes — upsert, not INSERT',
            detail: 'Every write uses ON CONFLICT DO UPDATE, combined with a WHERE updated_at < EXCLUDED.updated_at condition, so out-of-order re-processing is also safe.',
            code: `INSERT INTO silver.orders (order_id, status, updated_at) VALUES (%s, %s, %s)
ON CONFLICT (order_id) DO UPDATE SET status = EXCLUDED.status, updated_at = EXCLUDED.updated_at
WHERE silver.orders.updated_at < EXCLUDED.updated_at;`,
          },
          {
            check: 'Atomic checkpoint advancement — checkpoint saved after write',
            detail: 'The checkpoint is saved after the destination write succeeds. If the write fails, the checkpoint does not advance and the next run re-processes the same data.',
            code: `write_to_destination(rows)      # Step 1: durable write
save_checkpoint(new_watermark)  # Step 2: advance checkpoint — only if step 1 succeeded`,
          },
          {
            check: 'Resumable file operations — in-progress files in a temp location',
            detail: 'Files being written go to a temporary prefix. Completed files move atomically to the final location. A crashed mid-write leaves a temp file the next run simply overwrites.',
            code: `tmp_path = f's3://bucket/tmp/run-{run_id}/part-001.parquet'
df.to_parquet(tmp_path)
s3.copy_object(src=tmp_path, dst=final_path)
s3.delete_object(tmp_path)`,
          },
          {
            check: 'Idempotent file writes — overwrite, not append',
            detail: 'File writes use overwrite mode. A rerun overwrites the previous attempt\'s output instead of appending duplicate files.',
            code: `df.write.mode('overwrite').partitionBy('order_date').parquet(path)
# NOT mode('append') — append + rerun = duplicate data in the partition`,
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
          Non-idempotent patterns are often not obvious — they look reasonable
          on first read. The test is always: what happens if this pipeline runs
          twice for the same input? If the answer is &ldquo;different from running it
          once,&rdquo; the pattern is non-idempotent.
        </Para>

        <CompareTable
          headers={[
            { label: 'Anti-pattern' },
            { label: 'What goes wrong on rerun', color: '#ff4757' },
            { label: 'The fix', color: '#00e676' },
          ]}
          keys={['ap', 'wrong', 'fix']}
          rows={[
            { ap: 'Plain INSERT without ON CONFLICT', wrong: 'Duplicate rows in destination. COUNT(*) doubles on every rerun.', fix: 'Add ON CONFLICT (pk) DO UPDATE plus a UNIQUE constraint on the business key.' },
            { ap: 'TRUNCATE then INSERT in separate transactions', wrong: 'A failure between the two leaves the table empty. Queries see zero rows.', fix: 'Use staging table swap — atomic rename in one transaction.' },
            { ap: "Relative time windows (NOW() - INTERVAL '15 min')", wrong: 'A rerun at a different time extracts a different window. Rows are missed or double-processed.', fix: 'Store the extraction window\'s upper bound at run start; reuse it on retry.' },
            { ap: 'Append mode file writes', wrong: 'Each rerun adds new files to the partition — N reruns means N copies of the same data.', fix: 'Use overwrite mode per partition. Output is always exactly one copy.' },
            { ap: 'Saving checkpoint before write', wrong: 'If the write fails after the checkpoint advances, unwritten rows are permanently skipped.', fix: 'Write first, checkpoint second. Upsert semantics handle the resulting duplicates safely.' },
            { ap: 'Side effects in transformation (email, payment, webhook)', wrong: 'A rerun re-triggers the side effect — customers get duplicate notifications.', fix: 'Record intent in an outbox table; a separate idempotent consumer sends with deduplication.' },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 06 — Idempotency Across System Boundaries ───────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Idempotency Across System Boundaries" />
        <SectionTitle>Idempotency Across System Boundaries — The Hardest Case</SectionTitle>

        <Para>
          Idempotency within a single database is straightforward — ON CONFLICT
          handles it. Across multiple systems it&rsquo;s harder: a step that writes to
          a database AND publishes to Kafka AND calls an API has no single
          transaction coordinator spanning all three.
        </Para>

        <CodeBox label="The unsafe version — any retry after any step risks a duplicate">{`def complete_order_UNSAFE(order_id: int, conn, kafka_producer, api_client):
    conn.execute("UPDATE silver.orders SET status='completed' WHERE order_id=%s", (order_id,))
    conn.commit()                                          # committed
    kafka_producer.produce('orders.completed', key=str(order_id), value={...})
    kafka_producer.flush()                                 # if this fails: DB done, Kafka not
    api_client.notify_delivery_service(order_id)           # if this fails: both above done
    # any retry now = duplicate Kafka message, or worse, a duplicate charge to the merchant`}</CodeBox>

        <CodeBox label="The safe version — every external call carries its own idempotency guard">{`def complete_order_SAFE(order_id: int, run_id: str, conn, kafka_producer, api_client):
    conn.execute("""
        INSERT INTO silver.orders (order_id, status, completed_at) VALUES (%s, 'completed', NOW())
        ON CONFLICT (order_id) DO UPDATE SET status = 'completed', completed_at = EXCLUDED.completed_at
        WHERE silver.orders.status != 'completed'
    """, (order_id,))
    conn.commit()

    # enable.idempotence=True on the Kafka producer: retries never produce duplicates
    kafka_producer.produce('orders.completed', key=str(order_id),
        value={'order_id': order_id, 'idempotency_key': f'{run_id}:{order_id}'})

    idempotency_key = f'order-complete-{order_id}-{run_id[:8]}'
    api_client.notify_delivery_service(order_id=order_id, headers={'X-Idempotency-Key': idempotency_key})`}</CodeBox>

        <SubSubTitle>The saga pattern — tracking which steps already completed</SubSubTitle>

        <CodeBox label="Skip already-done steps on retry, instead of re-doing the whole sequence">{`CREATE TABLE pipeline.order_completion_sagas (
    order_id BIGINT PRIMARY KEY, run_id VARCHAR(36) NOT NULL,
    db_updated BOOLEAN NOT NULL DEFAULT FALSE, kafka_published BOOLEAN NOT NULL DEFAULT FALSE,
    api_notified BOOLEAN NOT NULL DEFAULT FALSE, completed_at TIMESTAMPTZ
);

def complete_order_with_saga(order_id: int, run_id: str, ...):
    saga = load_or_create_saga(order_id, run_id)
    if not saga.db_updated:
        update_db(order_id); mark_saga_step(order_id, 'db_updated')
    if not saga.kafka_published:
        publish_kafka(order_id); mark_saga_step(order_id, 'kafka_published')
    if not saga.api_notified:
        notify_api(order_id); mark_saga_step(order_id, 'api_notified')
    mark_saga_complete(order_id)`}</CodeBox>

        <Output>{`>>> complete_order_with_saga(9284751, run_id, ...)   # retried after step 2 failed
# db_updated=True already → skipped
# kafka_published=False → publishes now
# api_notified=False → notifies now
# no duplicate DB update, no duplicate charge — each step ran exactly once`}</Output>
      </section>

      <Divider />

      {/* ── Part 07 — Testing Idempotency ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Testing for Idempotency" />
        <SectionTitle>How to Test That Your Pipeline Is Actually Idempotent</SectionTitle>

        <Para>
          Claiming a pipeline is idempotent is easy. Verifying it requires
          specific tests — these belong in every pipeline&rsquo;s CI suite, run before
          every production deployment.
        </Para>

        <SubSubTitle>Test 1 — run twice, expect an identical row count</SubSubTitle>

        <CodeBox label="test_double_run_produces_same_row_count">{`def test_double_run_produces_same_row_count(self, test_db, test_dest):
    run_date = '2026-03-17'
    run_pipeline(run_date, source_conn=test_db, dest_conn=test_dest)
    count_after_run1 = test_dest.execute("SELECT COUNT(*) FROM silver.orders").fetchone()[0]

    run_pipeline(run_date, source_conn=test_db, dest_conn=test_dest)
    count_after_run2 = test_dest.execute("SELECT COUNT(*) FROM silver.orders").fetchone()[0]

    assert count_after_run1 == count_after_run2, (
        f'Row count changed on second run: {count_after_run1} → {count_after_run2}')`}</CodeBox>

        <SubSubTitle>Test 2 — a source update between runs should still land correctly</SubSubTitle>

        <CodeBox label="test_rerun_after_source_update_uses_latest_values">{`def test_rerun_after_source_update_uses_latest_values(self, test_db, test_dest):
    run_pipeline('2026-03-17', source_conn=test_db, dest_conn=test_dest)
    assert get_status(test_dest, 9284751) == 'placed'

    test_db.execute("UPDATE orders SET status='delivered', updated_at=NOW() WHERE order_id=9284751")
    reset_checkpoint_to_before_run1()

    run_pipeline('2026-03-17', source_conn=test_db, dest_conn=test_dest)
    assert get_status(test_dest, 9284751) == 'delivered'`}</CodeBox>

        <SubSubTitle>Test 3 — simulate a mid-batch crash, verify recovery is exact</SubSubTitle>

        <CodeBox label="test_pipeline_recovers_correctly_after_mid_run_failure">{`def test_pipeline_recovers_correctly_after_mid_run_failure(self, test_db, test_dest):
    insert_test_orders(test_db, count=10_000)

    call_count = 0
    def upsert_that_fails_on_batch_4(rows, conn):
        nonlocal call_count
        call_count += 1
        if call_count == 4:
            raise RuntimeError('Simulated failure on batch 4')
        return original_upsert(rows, conn)

    with pytest.raises(RuntimeError):
        with patch('pipeline.load.upsert_batch', side_effect=upsert_that_fails_on_batch_4):
            run_pipeline('2026-03-17', source_conn=test_db, dest_conn=test_dest)

    count_after_failure = row_count(test_dest)
    assert 0 < count_after_failure < 10_000   # some batches landed, not all

    run_pipeline('2026-03-17', source_conn=test_db, dest_conn=test_dest)   # recovery run
    assert row_count(test_dest) == 10_000     # no duplicates, no gaps`}</CodeBox>

        <SubSubTitle>Test 4 — the most direct test: ten runs, one result</SubSubTitle>

        <CodeBox label="test_ten_runs_same_result">{`def test_ten_runs_same_result(self, test_db, test_dest):
    results = []
    for i in range(10):
        reset_checkpoint_for_run('2026-03-17')
        run_pipeline('2026-03-17', source_conn=test_db, dest_conn=test_dest)
        count = row_count(test_dest)
        checksum = test_dest.execute("SELECT SUM(order_amount) FROM silver.orders").fetchone()[0]
        results.append((count, checksum))

    assert len(set(results)) == 1, (
        f'Pipeline is NOT idempotent — 10 runs produced {len(set(results))} different results')`}</CodeBox>

        <Output>{`$ pytest tests/test_idempotency.py -v
test_double_run_produces_same_row_count PASSED
test_rerun_after_source_update_uses_latest_values PASSED
test_pipeline_recovers_correctly_after_mid_run_failure PASSED
test_ten_runs_same_result PASSED
========================== 4 passed in 3.82s ===========================`}</Output>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Five Misconceptions About Idempotency and Atomicity</SectionTitle>

        {[
          {
            wrong: '"ON CONFLICT DO UPDATE automatically makes a write idempotent, no other setup needed"',
            right: 'ON CONFLICT has nothing to conflict ON without a UNIQUE constraint or primary key on the target column — this module\'s Error Library has the exact failure mode where PostgreSQL silently inserts a duplicate instead of updating, because the constraint was never added. Always verify the constraint exists before trusting the upsert.',
          },
          {
            wrong: '"Wrapping writes in a database transaction is the same as making the pipeline idempotent"',
            right: 'Part 03\'s distinction is precise: a transaction gives you atomicity (all-or-nothing for ONE execution), not idempotency (safe repetition across MULTIPLE executions). A plain INSERT wrapped in a transaction is perfectly atomic and still creates duplicates the second time it runs.',
          },
          {
            wrong: '"Saving the checkpoint as soon as a batch is written is safer than waiting"',
            right: 'It\'s the opposite — Part 04\'s restartability checklist and this module\'s Interview Prep Q3 both show that a checkpoint advanced before the write is durable risks silently skipping data forever if the write then fails. Write first, checkpoint second, every time.',
          },
          {
            wrong: '"Idempotency only matters for database writes — API calls and file writes are a separate concern"',
            right: 'Part 02\'s three forms (write-layer, extraction-layer, file-output) and Part 06\'s cross-system saga pattern all exist because every kind of side effect — a row, a file, an API call, a Kafka message — needs its own idempotency mechanism. A pipeline with a perfectly idempotent database write can still double-charge a customer through a non-idempotent API call in the same run.',
          },
          {
            wrong: '"If a pipeline has passed code review and works in staging, it\'s idempotent enough"',
            right: 'Idempotency is specifically the kind of property that looks fine until the exact rerun scenario that breaks it actually happens — this module\'s Real World incident is a pipeline that worked perfectly for months until someone manually re-triggered it for an already-processed date. Part 07\'s explicit test suite is what catches this before production, not code review by itself.',
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
            Scenario — FreshCart · Finance team reports double revenue
          </div>

          <Para>
            At 07:15 AM, the finance team reports yesterday&rsquo;s revenue figure shows
            $8,423,000 — exactly double the $4,211,500 expected from manual bank
            reconciliation. The data engineering team begins investigating.
          </Para>

          <CodeBox label="Diagnosis — from the symptom to the exact line of SQL responsible">{`-- Step 1: when did the doubling occur?
SELECT DATE(ingested_at), COUNT(*) row_count, SUM(order_amount) revenue
FROM silver.orders WHERE order_date = '2026-03-17' GROUP BY 1 ORDER BY 1;
-- 48,234 rows, $4,211,500 (morning load — correct)
-- 96,468 rows, $8,423,000 (evening — doubled!)

-- Step 2: duplicate order IDs?
SELECT order_id, COUNT(*) copies FROM silver.orders
WHERE order_date = '2026-03-17' GROUP BY order_id HAVING COUNT(*) > 1;
-- 48,234 rows returned — every single order_id has exactly 2 copies

-- Step 3: Airflow run history
SELECT dag_run_id, start_date, state FROM airflow.dag_run
WHERE dag_id = 'orders_pipeline_incremental' AND start_date::DATE = '2026-03-17';
-- shows TWO full-load runs at 18:00 and 18:15 — someone triggered a manual backfill

-- Step 4: the actual INSERT statement
SELECT query_text FROM snowflake.account_usage.query_history
WHERE query_text ILIKE '%INSERT INTO silver.orders%' AND start_time::DATE = '2026-03-17';
-- "INSERT INTO silver.orders SELECT * FROM orders_staging" — plain INSERT, no ON CONFLICT`}</CodeBox>

          <CodeBox label="Immediate fix, then the permanent one">{`-- IMMEDIATE: deduplicate
CREATE TABLE silver.orders_deduped AS
SELECT DISTINCT ON (order_id) * FROM silver.orders ORDER BY order_id, ingested_at DESC;
ALTER TABLE silver.orders RENAME TO orders_duplicated_backup;
ALTER TABLE silver.orders_deduped RENAME TO orders;

-- PERMANENT:
-- 1. INSERT → INSERT ... ON CONFLICT DO UPDATE
-- 2. ALTER TABLE silver.orders ADD CONSTRAINT uq_order_id UNIQUE (order_id);
-- 3. Add an idempotency test to CI (Part 07) that fails if a rerun changes row count
-- 4. max_active_runs=1, and require code review for manual backfills`}</CodeBox>

          <Output>{`SELECT COUNT(*), SUM(order_amount) FROM silver.orders WHERE order_date = '2026-03-17';
-- 48,234 rows, $4,211,500 ← correct

Total impact: 07:15 alert → 07:52 fully resolved (37 minutes).
Finance report delayed 52 minutes past SLA. Correct in production by 08:00 AM.`}</Output>

          <Para>
            The incident happened because one failure mode — a manual trigger of
            the pipeline for an already-processed date — was never considered.
            The plain INSERT that worked fine for the first run created
            duplicates on the second. Adding <code>ON CONFLICT DO UPDATE</code> and
            a UNIQUE constraint took 15 minutes. The idempotency test would have
            caught this before the first production deployment.
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

For write APIs (sending a notification, charging a payment, creating a record in a CRM), the API call has a real-world effect that must not be duplicated. The pattern is idempotency keys: generate a deterministic key from the operation's inputs (hash of order_id + action + run_date), include it in the API request header (X-Idempotency-Key). When the API receives a second request with the same key, it returns the same response as the first without executing the action again. Most payment APIs (Stripe, Stripe) and modern SaaS APIs support this.

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

      {/* ── Common Mistakes ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Assuming ON CONFLICT works without checking the UNIQUE constraint actually exists',
            a: 'This is the single most common gap in this module — Part 02, the Real World incident, and the Error Library all circle back to it. ON CONFLICT (order_id) with no matching constraint on order_id doesn\'t error, it just silently behaves like a plain INSERT. Verify the constraint with information_schema.table_constraints before trusting the upsert.',
          },
          {
            q: 'Treating "wrapped in a transaction" and "idempotent" as the same guarantee',
            a: 'Part 03 and this module\'s Misconceptions both address this directly: a transaction gives you atomicity for one run, not safety across reruns. A perfectly atomic plain INSERT still duplicates every row the second time it executes.',
          },
          {
            q: 'Using TRUNCATE + INSERT as two separate statements instead of a staging swap',
            a: 'The table is genuinely empty for the entire gap between the two statements — any query or dashboard reading during that window sees zero rows, not an error. Part 03\'s staging-table-rename pattern closes this window down to the duration of an atomic rename.',
          },
          {
            q: 'Reaching for a relative time window ("last 15 minutes") because it\'s simpler to write',
            a: 'It\'s simpler until the exact moment it\'s rerun at a different time of day than originally scheduled — Part 02 shows precisely how this silently drops or duplicates rows on retry. Store the window\'s upper bound once, at run start, and never recompute it.',
          },
          {
            q: 'Adding idempotency as a fix after an incident instead of testing for it up front',
            a: 'Part 07\'s four tests exist specifically so idempotency is verified before the first production deployment, not discovered via a finance team complaint at 7 AM (this module\'s Real World section). Run the double-run and ten-run tests in CI on every pipeline before it ships.',
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


      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 27 covers error handling and retries — the categories of pipeline failures, exponential backoff patterns, dead letter queues, and how to build alerting that pages the right person at the right time.
        </p>
        <Link href="/learn/data-engineering/error-handling-retries" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 27 → Error Handling, Retries and Dead Letter Queues
        </Link>
      </div>
    </LearnLayout>
  )
}
