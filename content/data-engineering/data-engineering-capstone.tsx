import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { DEWorkshop, WorkshopCode, WorkshopAnswer } from '@/components/content/DEWorkshop'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Data Engineering Capstone — End-to-End Batch + Streaming Pipeline | Chaduvuko',
  description: 'Design and build a reliable end-to-end data product combining batch history, streaming events, quality controls, and operational readiness.',
}

const SectionTag = ({ text }: { text: string }) => <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
const SectionTitle = ({ children }: { children: React.ReactNode }) => <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
const CodeBox = ({ children, language = 'text' }: { children: string; language?: string }) => <div style={{ marginBottom: 22 }}><div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>{language}</div><pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}><code>{children}</code></pre></div>
const Table = ({ rows }: { rows: string[][] }) => <div style={{ overflowX: 'auto', marginBottom: 24 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}><thead><tr>{['Area', 'Evidence', 'Points'].map(x => <th key={x} style={{ textAlign: 'left', padding: 10, color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>{x}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} style={{ padding: 10, color: 'var(--text)', borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody></table></div>

export default function DataEngineeringCapstoneModule() {
  return (
    <LearnLayout title="Data Engineering Capstone — End-to-End Batch + Streaming Pipeline" description="Design and build a reliable end-to-end data product combining batch history, streaming events, quality controls, and operational readiness." section="Data Engineering — Lesson 54" readTime="90 min">
      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 01 — Product Brief and Requirements" />
        <SectionTitle>Build a Trustworthy Order-Operations Data Product</SectionTitle>
        <Para>Prerequisites: batch ingestion, streaming and broker concepts, data contracts, dimensional modeling, orchestration, quality checks, and basic Python or SQL. A fictional multi-region delivery company wants daily sales reporting plus a near-real-time view of order state. Product teams need a stable order-level view; analysts need daily revenue by region; operations needs to detect stuck orders. The project is complete only when correctness, recovery, ownership, and observability are explained—not when a demo query returns rows.</Para>
        <Para>Functional requirements: ingest an order-history extract in batch, consume order events continuously, normalize both paths into a shared canonical schema, deduplicate by immutable event ID, preserve source event time, and publish an order-level current-state view plus daily aggregates. Non-functional requirements: replay a day, avoid double counting after retry, quarantine invalid events, meet an agreed freshness target, restrict sensitive fields, and reconcile source and output counts.</Para>
        <Callout label="Scope boundary" type="info">This capstone uses a local, dependency-free simulation for core logic. In a real deployment, replace the in-memory lists and dictionaries with durable object storage, a broker, a stream processor or micro-batch engine, a warehouse or lakehouse, and a scheduler selected for the workload.</Callout>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 02 — Architecture and Data Flow" />
        <SectionTitle>Two Ingestion Paths, One Contract, Explicit Serving Tables</SectionTitle>
        <Para>The batch path loads a bounded source extract into a raw landing zone with an extraction manifest. The streaming path consumes partitioned order events and records source offsets or equivalent progress. Both paths validate and map to a canonical event schema, then append to a durable raw event layer. A deterministic deduplication rule produces a cleaned event table. Curated transformations create current order state and daily measures. Orchestration handles scheduled backfills; the streaming runtime handles continuous input. Monitoring compares lag, invalid records, and reconciliation totals.</Para>
        <CodeBox language="text">{`Operational database ── snapshot + change capture ─┐
                                                   ├── Raw events ── validated/deduplicated
Order event topic ── stream consumer ─────────────┘                         │
                                                                            ├── Current orders
                                                                            ├── Daily region metrics
                                                                            └── Quality + freshness signals

Shared contract: event_id, order_id, event_type, event_time, region, amount_minor
Control data: source, ingestion_time, batch_id or topic/partition/offset`}</CodeBox>
        <Para>Use a stable event identifier for deduplication and a business key for current state. Preserve both the source's occurrence time and platform ingestion time; do not overwrite one with the other. The event type should be an explicit, constrained value such as `ORDER_PLACED`, `ORDER_PAID`, or `ORDER_CANCELLED`. Define which transitions are valid and how out-of-order transitions are resolved.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 03 — Define a Contract and Normalize" />
        <SectionTitle>Make Units, Nullability, and State Transitions Unambiguous</SectionTitle>
        <Para>Define a contract before writing transformations. In this example `amount_minor` is an integer in the currency's minor unit, `event_time` is an ISO-8601 UTC instant, and `event_id` is unique per source event. Each event includes a schema version. Unknown versions and invalid required fields go to quarantine with a failure reason; they do not get silently converted to zero. A real contract should also document currency, source ownership, privacy classification, retention, and supported evolution rules.</Para>
        <CodeBox>{`def validate_and_normalize(raw):
    required = ("event_id", "order_id", "event_type", "event_time", "region")
    missing = [field for field in required if not raw.get(field)]
    if missing:
        return None, "missing:" + ",".join(missing)
    if raw["event_type"] not in {"ORDER_PLACED", "ORDER_PAID", "ORDER_CANCELLED"}:
        return None, "unsupported_event_type"
    amount = raw.get("amount_minor")
    if amount is not None and (not isinstance(amount, int) or amount < 0):
        return None, "invalid_amount_minor"
    normalized = {key: raw.get(key) for key in required}
    normalized["amount_minor"] = amount
    normalized["schema_version"] = raw.get("schema_version", 1)
    return normalized, None`}</CodeBox>
        <Para>Normalization should be deterministic so the same source event yields the same canonical record whether it arrives in the batch file or broker. Keep source-specific parsing in adapters and business logic in a shared transformation layer. Test both adapters with the same event fixtures to detect semantic drift between batch and streaming.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 04 — Idempotent Processing" />
        <SectionTitle>Deduplicate Events Before Updating Derived State</SectionTitle>
        <Para>Retries are expected. The pipeline should produce the same result when an event is delivered more than once. Keep a durable set or table of processed event IDs, or use a merge/upsert keyed by event ID. A production dedupe retention period must cover the maximum replay and late-arrival horizon; deleting event IDs too soon can reintroduce duplicates during backfill. Do not confuse an event ID with an order ID: one order has multiple legitimate events.</Para>
        <CodeBox language="python">{`def apply_events(events):
    seen_event_ids = set()
    current_orders = {}
    accepted = []
    for event in events:
        event_id = event["event_id"]
        if event_id in seen_event_ids:
            continue
        seen_event_ids.add(event_id)
        accepted.append(event)
        current = current_orders.setdefault(event["order_id"], {"status": "UNKNOWN", "paid_minor": 0})
        if event["event_type"] == "ORDER_PLACED":
            current["status"] = "PLACED"
        elif event["event_type"] == "ORDER_PAID":
            current["status"] = "PAID"
            current["paid_minor"] = event.get("amount_minor") or 0
        elif event["event_type"] == "ORDER_CANCELLED":
            current["status"] = "CANCELLED"
    return accepted, current_orders`}</CodeBox>
        <Para>This deliberately small function processes events in input order and is suitable only for illustrating the boundary. It does not resolve out-of-order transitions, persist state, partition by key, or handle concurrent writers. In production, define event precedence with sequence numbers or source versions, make the sink update atomic or idempotent, and test duplicates across separate runs—not only within one input list.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 05 — Batch and Streaming Convergence" />
        <SectionTitle>Keep the Business Transform the Same; Make Progress Different</SectionTitle>
        <Para>Batch processing works over a bounded interval and can validate a manifest before publication. Streaming processes continuously and tracks offsets or checkpoints. Both should call the same normalization, contract validation, deduplication, and business-rule logic where practical. The incremental streaming aggregate may update often; the batch backfill may rebuild a bounded date range. Use comparable output keys and reconcile results so the two paths do not define different revenue.</Para>
        <CodeBox language="sql">{`-- Shared canonical events can feed either incremental or backfill models.
SELECT
  region,
  CAST(event_time AS DATE) AS event_date,
  COUNT(DISTINCT CASE WHEN event_type = 'ORDER_PLACED' THEN order_id END) AS orders_placed,
  SUM(CASE WHEN event_type = 'ORDER_PAID' THEN amount_minor ELSE 0 END) AS paid_minor
FROM curated.order_events
WHERE event_date >= :start_date AND event_date < :end_date
GROUP BY region, CAST(event_time AS DATE);`}</CodeBox>
        <Para>Exact date syntax and parameter binding depend on the warehouse. Define whether a cancellation reverses a previously counted order and whether a late payment restates a past date. A daily metric is a contract: its grain, timezone, inclusion rules, and correction behavior must be documented for consumers.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 06 — Quality, Testing, and Failure Scenarios" />
        <SectionTitle>Test More Than the Happy Path</SectionTitle>
        <Para>Unit tests cover normalization, amount validation, event transition rules, and duplicate handling. Integration tests exercise a real or representative source and sink boundary, including checkpoint restart. Data tests check event ID uniqueness, required fields, valid event types, non-negative amounts, and expected freshness. Reconciliation compares a source manifest or broker range to raw and curated counts, accounting for invalid and duplicate records.</Para>
        <ul style={{ paddingLeft: 22, color: 'var(--text)', lineHeight: 1.9 }}>
          <li>Duplicate delivery: replay the same event and verify aggregates do not change twice.</li>
          <li>Late event: add an older event after a newer one and verify the correction policy.</li>
          <li>Malformed payload: quarantine it with a reason and keep the good records moving.</li>
          <li>Partial publication: fail between writing output and advancing progress, then restart safely.</li>
          <li>Schema change: test old and new records during the supported compatibility period.</li>
          <li>Backfill overlap: rerun a completed date range and verify the destination is unchanged.</li>
        </ul>
        <Callout label="Never advance a cursor optimistically" type="warning">Persist source progress only after the output for that progress boundary is durable and recoverable. If source offsets advance before the sink commit, a crash can lose data; if sink writes commit but progress does not, a retry must be idempotent.</Callout>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 07 — Deployment and Operations" />
        <SectionTitle>Turn the Prototype into a Reproducible Service</SectionTitle>
        <Para>Keep configuration separate from code: source locations, topic names, checkpoint paths, batch intervals, and secret references belong in environment-specific configuration. Do not commit credentials. Define separate development and production identities with least privilege. Deploy transformations through version control and review; roll out a schema change using a compatibility plan. Pin runtime and connector dependencies according to the chosen platform's supported deployment process.</Para>
        <Para>Publish operational dashboards for input rate, output rate, source lag, oldest unprocessed event, invalid and duplicate counts, checkpoint duration, failed writes, and freshness. Set an owner and response runbook for each alert. A rollback should identify whether code, schema, checkpoint, or output state must be reverted or repaired. Document a safe replay procedure and run it in a non-production environment before it is needed at 2 AM.</Para>
        <CodeBox language="text">{`Release checklist
[ ] Contract and owners reviewed
[ ] Batch/stream parity tests pass
[ ] Duplicate and late-event tests pass
[ ] Backfill is bounded, repeatable, and reconciled
[ ] Secrets and least-privilege access configured
[ ] Checkpoint and sink recovery tested
[ ] Freshness, lag, quality, and failure alerts assigned
[ ] Rollback and replay steps reviewed`}</CodeBox>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 08 — Rubric and Extensions" />
        <SectionTitle>Assess the Data Product, Not Just the Demo</SectionTitle>
        <Table rows={[
          ['Correctness', 'Contract, units, event time, state transitions, and duplicates are handled explicitly.', '25'],
          ['Reliability', 'Progress/checkpoint boundaries, retries, backfills, and recovery are tested.', '20'],
          ['Data quality', 'Validation, quarantine, reconciliation, and freshness checks are measurable.', '15'],
          ['Architecture', 'Batch and streaming paths share semantics and have justified technology choices.', '15'],
          ['Operations', 'Configuration, access, observability, runbook, and rollback are documented.', '15'],
          ['Communication', 'Trade-offs, limitations, and consumer-facing metric definitions are clear.', '10'],
        ]} />
        <Para>Extension ideas: add a CDC source with delete handling; use a stream processor for event-time windows; publish a governed reverse-ETL projection for support; add schema compatibility checks in CI; model order history with a slowly changing dimension; or add cost and capacity estimates. Each extension must include a test and an operational consequence, not only a new tool.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 09 — Guided Capstone Review" />
        <DEWorkshop title="Prove a replay cannot double the daily total" objective="Build a tiny deterministic example that deduplicates event IDs before summing paid amounts." prerequisites="Know dictionaries, sets, event identifiers, idempotency, and the difference between duplicate events and multiple events for one order.">
          <Para>A batch backfill and a streaming replay overlap. Both contain the same payment event. The expected output is one payment amount, while a second distinct payment for another order must still count. Write down what key deduplicates events and what business key groups orders.</Para>
          <WorkshopCode language="python" expectedOutput={'unique_events=2\npaid_minor=5000\norders=2'}>{`events = [
    {"event_id": "pay-1", "order_id": "o-1", "amount_minor": 3000},
    {"event_id": "pay-1", "order_id": "o-1", "amount_minor": 3000},
    {"event_id": "pay-2", "order_id": "o-2", "amount_minor": 2000},
]
unique = {event["event_id"]: event for event in events}
paid_minor = sum(event["amount_minor"] for event in unique.values())
orders = {event["order_id"] for event in unique.values()}
print(f"unique_events={len(unique)}")
print(f"paid_minor={paid_minor}")
print(f"orders={len(orders)}")`}</WorkshopCode>
          <WorkshopAnswer><Para>Deduplicate by immutable `event_id`, not `order_id`: a single order may have separate placement, payment, and cancellation events. The output contains two unique events and totals 5,000 minor units across two order IDs. In production, persist the dedupe key or merge by it across runs, define retention against replay windows, and use an atomic or idempotent write boundary so retries after partial failure converge.</Para></WorkshopAnswer>
        </DEWorkshop>
        <Para>Submission checklist: architecture diagram, contract, reproducible code, representative fixtures, automated tests, sample output, data-quality report, dashboard or metric definitions, deployment notes, failure runbook, and a short explanation of decisions and trade-offs.</Para>
      </section>

      <section style={{ marginBottom: 48 }}>
        <SectionTag text="// Part 10 — Key Takeaways" />
        <KeyTakeaways items={[
          'Start with consumer decisions and measurable requirements before selecting tools.',
          'Use one canonical contract and transformation semantics for batch and streaming paths.',
          'Deduplicate by event identity, preserve source and ingestion times, and define event-order rules.',
          'Make sink writes idempotent and advance source progress only after durable output.',
          'Test retries, replay, late data, invalid records, schema changes, and partial failures.',
          'Operational readiness includes owners, access, freshness, lag, runbooks, and rollback.',
        ]} />
        <Para>The final two lessons apply the complete toolkit to system design and interview preparation.</Para>
        <Link href="/learn/data-engineering/system-design-de" style={{ display: 'inline-block', background: '#14b8a6', color: '#000', fontSize: 13, fontWeight: 700, borderRadius: 8, padding: '10px 18px', textDecoration: 'none' }}>Lesson 55 → Data Engineering System Design</Link>
      </section>
    </LearnLayout>
  )
}
