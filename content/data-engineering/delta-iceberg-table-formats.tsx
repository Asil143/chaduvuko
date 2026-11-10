import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { DEWorkshop, WorkshopCode, WorkshopAnswer } from '@/components/content/DEWorkshop'

export const metadata: Metadata = {
  title: 'Delta Lake and Apache Iceberg Table Formats | Data Engineering | Chaduvuko',
  description: 'Understand transactional lakehouse tables and practice time travel, schema evolution, MERGE, compaction, and format selection.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
)
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
)
const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12, fontFamily: 'var(--font-display)' }}>{children}</h3>
)
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)
const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 20 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}><code>{children}</code></pre>
  </div>
)

export default function DeltaIcebergTableFormatsModule() {
  return (
    <LearnLayout title="Delta Lake and Apache Iceberg Table Formats" description="Compare transactional table concepts and apply time travel, schema evolution, MERGE, and compaction safely." section="Data Engineering — Lesson 51" readTime="40 min">
      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 01 — Files Are Not a Table Contract" />
        <SectionTitle>Why a Lake Needs Metadata Above Its Data Files</SectionTitle>
        <Para>Parquet files store columnar data, but a directory of Parquet objects alone does not define a reliable mutable table. If a reader lists files while a writer is replacing a partition, it may observe an incomplete set. If a job retries an append, it may add duplicate rows. A schema change can leave old and new files with incompatible columns. Deleting a row is not the same as removing a single line from a text file. Analytics needs a consistent view of which files belong to a committed table state and how that state changed over time.</Para>
        <Para>Lakehouse table formats add a metadata and commit protocol around data files. Delta Lake and Apache Iceberg both support table snapshots and transactional operations through their respective metadata models, but their protocols, catalogs, feature sets, engine integrations, and concurrency semantics are not interchangeable. The terms “ACID,” “open,” or “multi-engine” are not enough to prove that a particular reader and writer can safely interoperate. Validate exact table features and engine/catalog combinations for the workload.</Para>
        <Para>A fictional Bengaluru retailer can use a table to manage daily order events and a curated customer-order view. A writer prepares new files, then publishes metadata that identifies the committed table state. Readers use a consistent snapshot rather than treating every object in the storage prefix as live data. The table metadata also carries information needed to interpret deletes, schema changes, partition evolution, and prior snapshots when supported by the format and the engines involved.</Para>
        <Callout label="A table is more than Parquet" type="info">Read and write through a compatible table-aware engine and catalog. Scanning every object in a table directory can include obsolete files or ignore delete and snapshot metadata, producing incorrect results.</Callout>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 02 — ACID Commits and Snapshots" />
        <SectionTitle>Publish a New State Without Exposing Half a Write</SectionTitle>
        <Para>A table write commonly has two broad phases: write candidate data files, then commit metadata that makes the intended files part of a new table state. The commit protocol coordinates competing writers and ensures readers can resolve a consistent snapshot under the supported concurrency model. Data files written by an attempt that never commits may be orphaned and require safe cleanup. The table's commit is not automatically a transaction across unrelated tables, a message queue, an API call, or an external notification.</Para>
        <Para>Delta Lake records table changes in its transaction log and uses log actions to describe the table state, including data-file additions and removals. Iceberg tracks table state through metadata such as snapshots and manifests, with a catalog coordinating the current metadata reference. These are high-level descriptions: exact behavior and storage operations depend on implementation, catalog, engine, and configured protocol features. Do not assume one object-store write or rename has identical atomicity everywhere.</Para>
        <Para>Optimistic concurrency commonly means a writer works from a known version or snapshot and validates whether intervening commits conflict with its planned operation before publishing. A conflicting writer may need to retry after re-reading the current state; blindly replaying a stale commit can corrupt assumptions. Different operations can have different conflict behavior. Two disjoint appends may be compatible in a configuration where overlapping updates are not, but validate the actual protocol and operation semantics rather than relying on a slogan.</Para>
        <Para>ACID should be scoped to the table operations and readers that participate in the protocol. It does not guarantee that an upstream extraction and a downstream notification commit atomically with the table. Use orchestration, idempotency keys, an outbox or manifest, and reconciliation to coordinate broader workflows. A table snapshot also cannot restore a file that has been physically removed by lifecycle rules or cleanup.</Para>
        <CodeBox label="Conceptual commit timeline">{`Writer A reads snapshot S
Writer B reads snapshot S

A writes candidate files -> validates against current table -> commits S+1
B writes candidate files -> detects table advanced -> checks for conflict

If B's operation conflicts: re-read/recompute or fail for controlled retry.
If it is compatible: the format/catalog/engine may allow a validated commit.
Uncommitted files are not automatically valid table rows; cleanup is separate.`}</CodeBox>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 03 — Time Travel and Retention" />
        <SectionTitle>Snapshots Help Explain and Reproduce, While They Exist</SectionTitle>
        <Para>Time travel queries an earlier table state by version, snapshot, or timestamp using the syntax and capabilities available in the chosen engine. It helps compare an output before and after a load, investigate an unexpected change, or reproduce an analysis against a known snapshot. A snapshot reference is useful only if the required metadata and data files have not been expired or removed and the query engine still supports the relevant operation.</Para>
        <Para>Retention has at least two concerns: metadata history and the underlying data files needed to answer historical queries. Snapshot expiration or log cleanup and physical file removal are related but not identical operations. A retention policy must account for active readers, long-running jobs, recovery objectives, legal or business retention requirements, and storage costs. Do not schedule destructive cleanup until you understand the platform's safety checks and the impact on time travel and concurrent readers.</Para>
        <Para>Time travel is not a substitute for an independent backup or disaster-recovery strategy. It may not protect against a malicious or accidental table-wide deletion if cleanup later removes the historical files, and it does not restore credentials, catalogs, external source data, or cross-table consistency. Define recovery objectives, protect critical metadata and data according to platform capabilities, test restoration, and keep an audit trail of who performed maintenance.</Para>
        <Para>When a report changes unexpectedly, record the table identifier, snapshot/version, query, input interval, engine, and relevant code revision. Compare row counts, key sets, and aggregates at the two snapshots. If a job read “latest” at different points in a multi-step workflow, its inputs may not represent one consistent business cut. Pin a snapshot or use a reproducible manifest where supported.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 04 — Schema Evolution" />
        <SectionTitle>Change the Contract Deliberately, Not by Surprise</SectionTitle>
        <Para>Schema evolution is the controlled change of a table's shape over time. Adding a nullable column may be compatible with some readers; renaming, dropping, changing a type, or reinterpreting a field can break consumers or alter meaning. A field named <code>amount</code> that once meant paise but now means rupees is not made safe by metadata. Document units, nullability, ownership, and compatibility requirements alongside the schema.</Para>
        <Para>Delta Lake and Iceberg have different schema metadata and evolution capabilities. Iceberg uses field identity in its schema model, which helps interpret columns across certain renames and reorders; Delta's behavior and features depend on its protocol and engine support. Do not generalize a capability from one engine's documentation to all readers and writers. Test the exact schema change against every required engine and catalog path, including older consumers and streaming readers.</Para>
        <Para>Prefer explicit migrations: add a field with a clear meaning, populate or backfill it, validate values, update consumers, and only then deprecate the old field. Decide whether schema merge or automatic evolution is enabled for a write. Automatically accepting any incoming columns can turn a typo or upstream payload drift into an unreviewed production contract change. Conversely, strict rejection can stop an intentional change; define who reviews and approves the migration.</Para>
        <CodeBox label="Schema-change review questions">{`CHANGE: add settlement_reference

- Is the new field nullable, and for which historical rows?
- What is its type, meaning, owner, and sensitivity classification?
- Does it identify a payment, batch, or external request?
- Which writers and readers must be upgraded, and in what order?
- Does a backfill need to rewrite data or can consumers derive it?
- Are schema evolution and protocol features supported by every engine?
- What tests prove old and new snapshots remain readable?
- What is the rollback or compatibility plan?`}</CodeBox>
        <Para>For India-first examples, a settlement timestamp may need a clearly documented timezone and business cut-off, while a monetary value should name its unit and precision. Avoid adding personal identifiers “for convenience” if an aggregated reference is sufficient. Schema reviews are also privacy and governance reviews: classify the field, restrict access, and establish retention before it spreads to derived tables.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 05 — MERGE, Upserts, and Correctness" />
        <SectionTitle>Make Incremental Corrections Explicit</SectionTitle>
        <Para><code>MERGE</code> combines source rows with a target table using a match condition and defined actions for matched or unmatched rows. It is often used for upserts and change-data processing, but syntax and behavior vary by engine and table format. First define the target grain and a stable business key. If the source has multiple rows for one key, determine which event wins or aggregate deliberately before merging. Otherwise, a merge can be ambiguous, fail, or produce incorrect results depending on the implementation.</Para>
        <Para>For an order-status table, the source may contain repeated changes for the same order. Deduplicate using a documented ordering such as source sequence or event time plus a deterministic tie-breaker, and account for late events. Do not assume event arrival order equals business order. Preserve deletion semantics, handle null keys explicitly, and reconcile source and target counts after applying the operation. A merge should be idempotent under the source replay policy.</Para>
        <CodeBox label="Illustrative SQL — verify syntax for your engine and format">{`MERGE INTO curated.orders AS target
USING staged.latest_order_changes AS source
ON target.order_id = source.order_id
WHEN MATCHED AND source.source_sequence > target.source_sequence THEN
  UPDATE SET
    status = source.status,
    source_sequence = source.source_sequence,
    updated_at = source.updated_at
WHEN NOT MATCHED THEN
  INSERT (order_id, status, source_sequence, updated_at)
  VALUES (source.order_id, source.status,
          source.source_sequence, source.updated_at);`}</CodeBox>
        <Para>This teaching query assumes there is one chosen source row per key and a comparable sequence. Those are preconditions to prove, not guaranteed by the statement. A production merge should define how tombstones work, whether a late older change can arrive, how null keys behave, and what to do when two events have the same ordering value. Test duplicate input, replay, out-of-order events, and concurrent writers.</Para>
        <Para>Delta and Iceberg both have merge-like workflows in supported engines, but supported clauses, performance, delete representation, and concurrent-write behavior can vary. A reader must understand the table's protocol features to interpret the resulting rows. Run a small integration test with the actual catalog and engine, then verify the committed snapshot rather than trusting that the SQL parser accepted the command.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 06 — Compaction and Maintenance" />
        <SectionTitle>Rewrite Small Files Carefully and Keep Readers Safe</SectionTitle>
        <Para>Frequent small writes create many small files. Readers then spend disproportionate time listing metadata, opening files, scheduling tasks, and processing per-file overhead. Compaction rewrites data into a more useful file layout and commits a new table state, typically replacing references to old files. It can improve read efficiency but consumes compute and storage, creates another committed version, and may conflict with concurrent writes if the touched data overlaps.</Para>
        <Para>Compaction is not the same as changing table partitions, vacuuming orphan files, expiring snapshots, or changing the table's clustering strategy. Each operation has distinct semantics and safety requirements. A compaction job should use a bounded scope, respect active readers and writers, validate row counts and key uniqueness, and publish through the table protocol. Do not manually delete files based on an age threshold without understanding the metadata and reader-retention guarantees.</Para>
        <Para>Choose a maintenance cadence based on observed file counts, sizes, query patterns, write frequency, and the platform's built-in optimization behavior. A compacted layout that helps one scan may hurt another workload. Measure before and after, and include concurrent reads, streaming consumers, time travel needs, and storage costs. Where an engine supports clustering or file skipping statistics, test its impact on representative predicates rather than treating it as a universal substitute for partition design.</Para>
        <Callout label="Maintenance changes history" type="tip">Compaction and cleanup can change which files are active or available to older snapshots. Review retention and reader policies before destructive cleanup, and test time travel after maintenance in a non-production table.</Callout>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 07 — Delta, Iceberg, and Platform Choice" />
        <SectionTitle>Evaluate the Whole Stack, Not Just the Format Name</SectionTitle>
        <Para>Compare Delta Lake and Apache Iceberg against actual requirements: supported engines and catalog, read/write compatibility, transaction and concurrency needs, schema and partition evolution, deletes, change-data consumption, streaming behavior, governance, identity, observability, and operational skill. An open table specification does not automatically make catalogs, permissions, compute services, or every feature portable. “One copy of the data” is an architectural goal, not a guarantee of every consumer's behavior.</Para>
        <Para>Ask the vendor or platform team for a feature matrix tied to the exact deployed versions, and run interoperability tests against the required combinations. Test append, update, delete, merge, schema changes, partition evolution, concurrent writers, time travel, and table maintenance. Verify what happens when a consumer reads through the supported catalog and what happens if someone bypasses it and scans storage directly. Test authentication, row/column controls, audit logs, and retention too.</Para>
        <Para>A managed warehouse may be the better choice when it meets the latency, governance, and workload needs with less operational burden. A lakehouse can be valuable when multiple compute patterns need shared object storage and the team can operate the table protocols and catalog correctly. Make the decision from measured cost, reliability, portability, and skills—not from a claim that one format is universally superior.</Para>
      </section>

      <DEWorkshop title="Reason about a table snapshot and a safe correction" objective="Explain why a committed table snapshot differs from a directory listing, and design an idempotent correction that respects schema and retention." prerequisites="Parquet files, transaction commits, stable merge keys, and the distinction between metadata history and physical file retention.">
        <p>This pure-standard-library model represents a table as immutable snapshots and applies one deterministic correction. It is not a Delta or Iceberg implementation; it makes the idea of querying an older committed state explicit without requiring a lakehouse engine.</p>
        <WorkshopCode language="python" expectedOutput={"snapshot=1 total_paise=15800 rows=2\nsnapshot=2 total_paise=16300 rows=2\ntime_travel_snapshot=1 total_paise=15800 rows=2\nreplay_is_idempotent=True"}>{`snapshots = {
    1: {
        "schema": ("order_id", "status", "amount_paise"),
        "rows": {
            "ORD-101": ("PAID", 12500),
            "ORD-102": ("PAID", 3300),
        },
    }
}

# A deterministic source change updates an existing key and adds no duplicate.
source_change = {"order_id": "ORD-102", "status": "PAID", "amount_paise": 3800}
current = snapshots[1]
updated_rows = dict(current["rows"])
updated_rows[source_change["order_id"]] = (
    source_change["status"], source_change["amount_paise"])
snapshots[2] = {"schema": current["schema"], "rows": updated_rows}

def summary(snapshot):
    rows = snapshot["rows"]
    total = sum(value[1] for value in rows.values())
    return f"total_paise={total} rows={len(rows)}"

print(f"snapshot=1 {summary(snapshots[1])}")
print(f"snapshot=2 {summary(snapshots[2])}")
print(f"time_travel_snapshot=1 {summary(snapshots[1])}")

# Replaying the same keyed update does not add another row.
replayed = dict(snapshots[2]["rows"])
replayed[source_change["order_id"]] = (
    source_change["status"], source_change["amount_paise"])
print(f"replay_is_idempotent={replayed == snapshots[2]['rows']}")`}</WorkshopCode>
        <p>The simulation assumes a stable key and replaces the same record on replay. A real commit must also validate concurrent changes, schema compatibility, source ordering, catalog state, and physical file retention. Its snapshot is not queryable if the engine or maintenance policy has removed required metadata or files.</p>
        <h3>Practice: a reader reports a missing historical result</h3>
        <p>A report queried last week's table snapshot successfully yesterday but fails today after a maintenance window. The directory still contains many Parquet files. What would you inspect before restoring data?</p>
        <WorkshopAnswer>
          <p>Identify the table and snapshot/version, engine and catalog used, exact query, and the maintenance actions performed. Check snapshot metadata, expiration policy, the data files referenced by that snapshot, retention rules, and whether the reader has permission to access them. A raw directory listing does not prove that the correct historical file set remains available or that delete metadata is being applied.</p>
          <p>Check whether cleanup removed files needed by active readers or time travel, and follow the platform's documented recovery process rather than manually copying or deleting objects. If the data is no longer retained, restore from an independent backup or rebuild from a reproducible source if available. Then test maintenance and retention against the required recovery window before repeating the cleanup.</p>
        </WorkshopAnswer>
        <p>References: <a href="https://docs.delta.io/">Delta Lake documentation</a> and <a href="https://iceberg.apache.org/docs/latest/">Apache Iceberg documentation</a>. Feature support and syntax vary by engine, catalog, and deployed version; validate the exact combination in use.</p>
      </DEWorkshop>

      <KeyTakeaways items={[
        'A transactional table format manages the relationship between data files and committed table snapshots; a directory listing alone is not the table contract.',
        'Delta Lake and Iceberg both support snapshot-oriented table workflows but have different metadata models, protocols, catalogs, and compatibility details.',
        'Scope ACID claims to table-aware operations; separate writes to other tables and external systems need their own coordination.',
        'Time travel requires the referenced metadata and data files to remain available; it is not automatically an independent backup.',
        'Schema changes need compatibility, type, meaning, privacy, and rollout decisions—not just an automatic schema-merge switch.',
        'A MERGE needs a stable key, deterministic source row per key, explicit late-event and deletion rules, and replay tests.',
        'Compaction rewrites table layout; retention cleanup and orphan-file removal are separate operations with distinct safety risks.',
        'Select a format by tested engine/catalog interoperability, operational needs, governance, and workload evidence rather than by label.',
      ]} />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 24, marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>Continue your Data Engineering path</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>You have completed the Spark, Airflow, and lakehouse table-format section. Consolidate the full track with the Data Engineering interview questions and system-design review.</p>
        <Link href="/learn/data-engineering/de-interview-questions" style={{ background: '#14b8a6', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>Continue → Data Engineering Interview Prep</Link>
      </div>
    </LearnLayout>
  )
}
