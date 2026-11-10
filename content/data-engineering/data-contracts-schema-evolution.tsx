import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { DEWorkshop, WorkshopCode, WorkshopAnswer } from '@/components/content/DEWorkshop'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Data Contracts and Schema Evolution | Chaduvuko',
  description: 'Design producer-consumer expectations, validate data at boundaries, and roll out compatible schema changes safely.',
}

const SectionTag = ({ text }: { text: string }) => <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
const SectionTitle = ({ children }: { children: React.ReactNode }) => <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
const CodeBox = ({ children, language = 'text' }: { children: string; language?: string }) => <div style={{ marginBottom: 22 }}><div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>{language}</div><pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}><code>{children}</code></pre></div>
const Table = ({ rows }: { rows: string[][] }) => <div style={{ overflowX: 'auto', marginBottom: 24 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}><thead><tr>{['Change', 'Consumer impact', 'Safer rollout'].map(x => <th key={x} style={{ textAlign: 'left', padding: 10, color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>{x}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} style={{ padding: 10, color: 'var(--text)', borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody></table></div>

export default function DataContractsModule() {
  return (
    <LearnLayout title="Data Contracts and Schema Evolution" description="Design producer-consumer expectations, validate data at boundaries, and roll out compatible schema changes safely." section="Data Engineering — Lesson 41" readTime="55 min">
      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 01 — Make Expectations Explicit" />
        <SectionTitle>A Data Contract Is an Agreement, Not Just a Schema File</SectionTitle>
        <Para>Prerequisites: understand tables, schemas, keys, data quality, and the difference between a producer and a consumer. A data contract makes the expectations between them explicit: what a record means, its fields and types, valid constraints, event-time semantics, delivery expectations, ownership, and how changes are communicated. A schema captures structure, but it does not by itself state that an amount is in paise, that a timestamp is UTC, or that a record represents a settled payment rather than an attempted one.</Para>
        <Para>For a fictional payment pipeline, a producer could publish a payment event while analytics and fraud consumers read it independently. If the producer changes `amount` from integer paise to decimal rupees without coordination, both payloads remain syntactically valid but produce wrong totals. The contract should capture units, currency, nullability, identifiers, event meaning, and the supported evolution process.</Para>
        <Callout label="Learning objective" type="info">By the end, you should be able to write a small contract, classify a schema change by consumer impact, plan a backward-compatible rollout, and describe how to validate, observe, and retire versions.</Callout>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 02 — Contract Surface" />
        <SectionTitle>Include Semantics, Quality, and Ownership</SectionTitle>
        <Para>Useful contract fields are stable identifiers, data types, required/optional status, units, enumerations or ranges where meaningful, event-time meaning, allowed lateness, privacy classification, producer and consumer owners, freshness expectations, and change-notification rules. Define which elements are enforced by machines and which require review. Keep business definitions close to the data so a table name does not become the only documentation.</Para>
        <CodeBox language="json">{`{
  "name": "payments.settled",
  "version": 1,
  "owner": "payments-platform",
  "event_time": {"field": "occurred_at", "timezone": "UTC"},
  "fields": {
    "payment_id": {"type": "string", "required": true, "meaning": "stable business identifier"},
    "amount_minor": {"type": "integer", "required": true, "meaning": "amount in currency minor units"},
    "currency": {"type": "string", "required": true},
    "customer_id": {"type": "string", "required": false, "classification": "restricted"}
  },
  "delivery": {"duplicates_possible": true, "consumer_must_deduplicate": true}
}`}</CodeBox>
        <Para>This is an illustrative contract document, not a standard format. A contract may be represented in a schema registry, repository file, catalog, or platform API. The important part is that code review, validation, ownership, and consumer communication use the same source of expectations instead of maintaining conflicting copies.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 03 — Compatibility Is Directional" />
        <SectionTitle>Ask Which Readers and Writers Must Continue to Work</SectionTitle>
        <Para>Backward compatibility asks whether a newer reader can interpret older data. Forward compatibility asks whether an older reader can handle data written by a newer producer. Full compatibility is stricter and depends on the schema format and its rules. These labels are not interchangeable. The critical question is which old and new producer-consumer versions must coexist during deployment and replay.</Para>
        <Table rows={[
          ['Add an optional field with a defined default or null policy', 'Often safe for old readers if unknown fields are ignored; verify actual deserializers.', 'Deploy readers that understand it, then have producers populate it.'],
          ['Remove or rename a required field', 'Can break readers and historical replay.', 'Introduce a replacement, dual-write, migrate consumers, then deprecate after evidence.'],
          ['Change a field type or unit', 'May parse but silently change meaning or overflow.', 'Use a new field/version and explicit conversion with dual-read/write period.'],
          ['Tighten allowed values or nullability', 'Previously valid records can fail validation.', 'Measure existing data first, communicate, then stage enforcement.'],
        ]} />
        <Callout label="Compatibility is not only syntax" type="warning">Changing a field from “gross amount” to “net amount” can be a breaking semantic change even if the type remains numeric. Maintain meaning and units as carefully as the structural schema.</Callout>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 04 — Safe Evolution Pattern" />
        <SectionTitle>Expand, Migrate, Contract</SectionTitle>
        <Para>A conservative rollout expands the contract first, updates consumers to accept both old and new forms, deploys producers that populate the new representation, backfills history if needed, verifies parity, and only then removes the old field or behavior. During the overlap, define precedence when both fields exist and detect disagreement. Plan rollback before the irreversible step; if a consumer has already discarded old semantics, reverting the producer alone may not restore the previous behavior.</Para>
        <CodeBox language="sql">{`-- Phase 1: expose a nullable replacement; do not drop the old column.
ALTER TABLE analytics.payment_events
  ADD COLUMN amount_minor BIGINT;

-- Phase 2: backfill only after confirming the old unit and currency rules.
UPDATE analytics.payment_events
SET amount_minor = legacy_amount_paise
WHERE amount_minor IS NULL;

-- Phase 3: validate parity and migrate readers before retiring the legacy field.
SELECT COUNT(*) AS missing_new_amount
FROM analytics.payment_events
WHERE amount_minor IS NULL;`}</CodeBox>
        <Para>DDL varies by engine, and a table alteration can have operational effects such as locks, rewrites, or metadata changes. Check the target engine's behavior on representative data. A migration is not complete because the DDL succeeded; prove that consumers read the intended field and that backfill reconciliation is acceptable.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 05 — Validate at Boundaries" />
        <SectionTitle>Reject or Quarantine Contract Violations with Context</SectionTitle>
        <Para>Validate records where ownership crosses a boundary: source ingestion, topic publication, landing tables, and curated model publication. The check should report the failed rule, source, event or partition identifier, and contract version. Decide whether a violation blocks the batch, goes to quarantine, or is tolerated with an alert based on impact. Do not silently coerce invalid values into plausible defaults.</Para>
        <CodeBox>{`def validate_payment(row):
    errors = []
    if not row.get("payment_id"):
        errors.append("payment_id is required")
    if not isinstance(row.get("amount_minor"), int):
        errors.append("amount_minor must be an integer")
    if row.get("currency") not in {"INR", "USD"}:
        errors.append("currency is not in the supported set")
    if row.get("occurred_at") is None:
        errors.append("occurred_at is required")
    return errors

record = {"payment_id": "p-17", "amount_minor": 12500, "currency": "INR", "occurred_at": "2026-10-12T10:00:00Z"}
print("valid" if not validate_payment(record) else "quarantine")`}</CodeBox>
        <Para>The example is a small boundary check, not a complete schema validator. Production validation also needs careful timestamp parsing, numeric range checks, version handling, field classification, and a policy for unknown fields. Metrics should show invalid counts and rates; avoid putting sensitive raw payloads into broadly accessible logs.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 06 — Governance and Lifecycle" />
        <SectionTitle>Contracts Need Owners and a Retirement Process</SectionTitle>
        <Para>Assign a producer owner accountable for publishing accurate meaning and a consumer contact for impact review. Keep a compatibility test in CI for known consumers or representative schemas. Announce breaking changes through a durable channel and include a migration guide, deprecation date or milestone, sample records, and a way to ask questions. Record which consumers still depend on the old form; a deadline without dependency evidence is a guess.</Para>
        <Para>Track the contract version with each published record or dataset when versions can coexist. For immutable events, do not rewrite history to make old records appear to have the latest shape; use explicit version-aware readers or a normalization layer. For tables, a catalog entry and migration history can provide context. In either case, replay and backfill workflows must be able to interpret older data.</Para>
        <ul style={{ paddingLeft: 22, color: 'var(--text)', lineHeight: 1.9 }}>
          <li>Breaking change: new version or coordinated migration, consumer inventory, and a tested compatibility window.</li>
          <li>Non-breaking addition: validate old readers tolerate unknown or optional fields before rollout.</li>
          <li>Semantic change: treat it as a new meaning even if the physical type is unchanged.</li>
          <li>Retirement: confirm traffic and replay no longer require the old form, then remove it through a reviewed change.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 07 — Guided Contract Review" />
        <DEWorkshop title="Classify a proposed payment schema change" objective="Identify a safe migration sequence when amount units change and a new optional source field is introduced." prerequisites="Know nullable fields, integer units, consumer compatibility, and the expand-migrate-contract rollout pattern.">
          <Para>A producer currently emits `amount` as a whole number of paise and wants to rename it to `amount_rupees` with a decimal value. At the same time it plans to add `settled_at`. Multiple consumer teams may deploy on different schedules. Decide which aspect is structural, which is semantic, and how to avoid changing historic meaning.</Para>
          <WorkshopCode language="python" expectedOutput={'breaking_semantic_change=True\noptional_addition=True\nold_readers_ready=False'}>{`old_field = {"name": "amount", "unit": "paise", "required": True}
new_amount = {"name": "amount_rupees", "unit": "rupees", "required": True}
new_timestamp = {"name": "settled_at", "required": False}
breaking_semantic_change = old_field["unit"] != new_amount["unit"]
optional_addition = not new_timestamp["required"]
old_readers_ready = False
print(f"breaking_semantic_change={breaking_semantic_change}")
print(f"optional_addition={optional_addition}")
print(f"old_readers_ready={old_readers_ready}")`}</WorkshopCode>
          <WorkshopAnswer><Para>The amount change is semantic and structural: both the field name and the unit change. Introduce the new field without removing the old one, document conversion and rounding rules, and let consumers migrate with a period of dual-read or dual-write plus reconciliation. Adding an optional timestamp may be compatible only if every reader handles an absent or unknown field as expected. Before removal, verify consumer adoption, historical replay requirements, and parity across a representative sample.</Para></WorkshopAnswer>
        </DEWorkshop>
        <Para>Practice: write a contract for a shipment event; mark required, optional, and restricted fields; define one compatibility test; design a dual-write validation query; and draft a deprecation announcement with consumer owner, sample payload, and migration steps.</Para>
      </section>

      <section style={{ marginBottom: 48 }}>
        <SectionTag text="// Part 08 — Key Takeaways" />
        <KeyTakeaways items={[
          'A contract captures meaning, quality, timing, ownership, and operational expectations—not just field types.',
          'Compatibility is directional and depends on the producer-consumer deployment and replay matrix.',
          'A type-stable change can still break consumers if units or business meaning changes.',
          'Expand, migrate, validate, and contract only after consumers and historic data are accounted for.',
          'Validate at boundaries with a deliberate block, quarantine, or alert policy.',
          'Keep ownership, compatibility checks, communication, and retirement evidence with the contract lifecycle.',
        ]} />
        <Para>Next, learn how data teams observe pipeline health and detect quality failures in production.</Para>
        <Link href="/learn/data-engineering/monitoring-observability" style={{ display: 'inline-block', background: '#ff4757', color: '#000', fontSize: 13, fontWeight: 700, borderRadius: 8, padding: '10px 18px', textDecoration: 'none' }}>Lesson 42 → Data Observability — Metrics, Logging and Anomaly Detection</Link>
      </section>
    </LearnLayout>
  )
}
