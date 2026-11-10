import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { DEWorkshop, WorkshopCode, WorkshopAnswer } from '@/components/content/DEWorkshop'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Reverse ETL and Operational Analytics | Chaduvuko',
  description: 'Activate governed warehouse data in operational systems with safe syncs, clear ownership, and measurable feedback loops.',
}

const SectionTag = ({ text }: { text: string }) => <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
const SectionTitle = ({ children }: { children: React.ReactNode }) => <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
const Para = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
const CodeBox = ({ children, language = 'text' }: { children: string; language?: string }) => <div style={{ marginBottom: 22 }}><div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>{language}</div><pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}><code>{children}</code></pre></div>
const Table = ({ rows }: { rows: string[][] }) => <div style={{ overflowX: 'auto', marginBottom: 24 }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}><thead><tr>{['Concern', 'Design question', 'Control'].map(x => <th key={x} style={{ textAlign: 'left', padding: 10, color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>{x}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} style={{ padding: 10, color: 'var(--text)', borderBottom: '1px solid var(--border)', verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody></table></div>

export default function ReverseETLModule() {
  return (
    <LearnLayout title="Reverse ETL and Operational Analytics" description="Activate governed warehouse data in operational systems with safe syncs, clear ownership, and measurable feedback loops." section="Data Engineering — Lesson 49" readTime="55 min">
      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 01 — From Analytics Back to Action" />
        <SectionTitle>Operationalize a Trusted Model Without Making the Warehouse a Side Door</SectionTitle>
        <Para>Prerequisites: understand warehouse models, incremental pipelines, idempotency, access control, and quality checks. Reverse ETL is the movement of modeled data from an analytical platform into operational tools where people or services take action: a support queue, sales workflow, notification service, or customer success application. The defining direction is from analytics back into operational systems—not a replacement for source ingestion and not a synonym for every API call made by a pipeline.</Para>
        <Para>Consider a subscription business that computes a daily account health score from product events, invoices, and support history. A support team wants the score and a short explanation visible on an account record. The warehouse provides a governed, reconciled view; a sync publishes a limited projection to the destination. The loop is useful only if the destination receives correct, timely, authorized data and teams measure whether the intervention helped.</Para>
        <Callout label="Learning objective" type="info">By the end, define an operational use case, specify a model and destination contract, design an incremental idempotent sync, protect sensitive fields, and monitor both delivery and business outcome.</Callout>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 02 — Qualify the Use Case" />
        <SectionTitle>Start with an Owner, Consumer, and Decision</SectionTitle>
        <Para>Before shipping data, identify who acts on it, what decision changes, how often the signal needs refreshing, and what happens when the signal is stale or absent. Select a model with a stable business key and a clear grain—one row per account, one row per eligible case, or one row per workflow action. A broad “send the customer table” request is not a use case and often sends fields the destination does not need.</Para>
        <Para>Agree on a freshness objective and a safe failure mode with the operational owner. A delayed score might remain available with a “last calculated at” timestamp; an incorrect permission flag might need a fail-closed behavior. Establish destination API limits and write semantics before setting the schedule. Some systems overwrite fields, some merge them, and some create duplicate activities when retried.</Para>
        <Table rows={[
          ['Decision', 'What action changes, and who owns it?', 'Named operational owner and measurable outcome.'],
          ['Grain/key', 'What uniquely identifies a destination record?', 'Stable key, uniqueness test, and no ambiguous fallback matching.'],
          ['Freshness', 'How old can the model be when a user acts?', 'Defined target, stale marker, and alert threshold.'],
          ['Field scope', 'Which exact values are required?', 'Least-data projection with classification and approved destination.'],
        ]} />
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 03 — Model the Outbound Contract" />
        <SectionTitle>Publish a Small, Versioned Projection</SectionTitle>
        <Para>Keep transformation logic and eligibility criteria in a reviewed model, not scattered across sync scripts. Expose a stable key, destination fields, model version, and computation timestamp. Include an explicit deletion or deactivation signal when a record stops qualifying. Define whether the destination is authoritative for any field; avoid two-way ownership unless conflict resolution is designed.</Para>
        <CodeBox language="sql">{`-- The model is deliberately narrow: one row per account and sync key.
SELECT
  account_id AS external_key,
  health_band,
  next_action,
  calculated_at,
  model_version
FROM analytics.account_health
WHERE is_active = TRUE
  AND eligible_for_support = TRUE;`}</CodeBox>
        <Para>Test the grain with a uniqueness check and validate that every destination key maps to the intended record. Avoid using email addresses as the sole key when a stable internal identifier is available; addresses can change or be shared. Validate enum values, maximum lengths, nullable fields, timestamp formats, and the destination's behavior for omitted fields.</Para>
        <Callout label="A model is a public interface" type="tip">Treat the outbound projection as a product contract. A changed field name or meaning can break a downstream workflow even if the source warehouse table remains valid.</Callout>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 04 — Incremental Sync and Idempotency" />
        <SectionTitle>Assume Retries and Replays Will Happen</SectionTitle>
        <Para>A robust sync reads a deterministic set of changed rows, writes by a stable external key, records progress only after the destination confirms the operation, and can safely retry an item. If the destination supports upsert by external key, repeated writes can converge to the same current state. If it only appends actions, add a deduplication identifier or a durable delivery ledger. A watermark alone is not safe if rows can be updated with older timestamps or if equal timestamps are skipped.</Para>
        <CodeBox>{`def sync_batch(rows, destination, delivery_log):
    for row in rows:
        event_key = (row["external_key"], row["model_version"], row["calculated_at"])
        if delivery_log.contains(event_key):
            continue
        payload = {
            "health_band": row["health_band"],
            "next_action": row["next_action"],
            "calculated_at": row["calculated_at"],
        }
        destination.upsert(row["external_key"], payload)
        delivery_log.mark_confirmed(event_key)

# A production adapter must define timeout, retry, and ambiguous-response behavior.`}</CodeBox>
        <Para>If the client times out after the destination applied a write, the caller cannot know from the timeout alone whether the update happened. Idempotent upsert makes retry safe for current-state fields. For irreversible actions, use an idempotency token accepted by the destination or reconcile by querying the resulting state before retrying. Keep progress state in durable storage and make its relationship to destination acknowledgement explicit.</Para>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 05 — Deletions, Backfills, and Rate Limits" />
        <SectionTitle>Define What “No Longer Eligible” Means</SectionTitle>
        <Para>A filter that removes a row from the outbound query does not remove its old value from the destination. Choose a lifecycle: send a tombstone or deactivation, clear only the fields owned by the sync, or retain historical state with an expiration policy. Confirm whether destination deletes cascade, affect users, or trigger notifications. Test the transition explicitly before enabling a broad backfill.</Para>
        <Para>Bound batch size and concurrency, respect published destination quotas, and use retry policies that distinguish retryable failures from permanent validation errors. Add jitter to avoid synchronized retries when many workers resume together. A large backfill should be separately planned and throttled; do not let it starve the regular freshness path. Track last successful sync time per partition or account range and keep a replayable manifest of the input set.</Para>
        <Table rows={[
          ['Timeout / ambiguous result', 'Could the destination have applied the write?', 'Retry with a stable idempotency key or reconcile state.'],
          ['Rate limit', 'How does the destination signal capacity limits?', 'Bound concurrency, honor retry timing, and expose backlog.'],
          ['Permanent invalid record', 'Can this one row block all progress?', 'Quarantine with reason and owner; continue only under the agreed policy.'],
          ['Removed from eligibility', 'How is the old destination value cleared?', 'Send an explicit tombstone or deactivate the owned fields.'],
        ]} />
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 06 — Security and Measurement" />
        <SectionTitle>Protect Data and Measure the Full Feedback Loop</SectionTitle>
        <Para>Send the minimum fields required for the action. Classify data, use an approved destination, limit credentials to required operations, encrypt transport through the platform's supported mechanisms, and avoid logging credentials or raw sensitive payloads. Define retention and deletion behavior across both the warehouse and destination. Treat a support tool or CRM as a separate access boundary, not as an extension of the warehouse's permissions.</Para>
        <Para>Operational metrics include source model freshness, rows selected, rows successfully upserted, retries, rejected records, destination latency, backlog age, deactivation count, and reconciliation difference. Business metrics should be chosen with the operational owner: response time, resolution rate, or another valid outcome. Track eligibility and exposure so the team can distinguish a sync failure from an intervention that simply had no effect.</Para>
        <ul style={{ paddingLeft: 22, color: 'var(--text)', lineHeight: 1.9 }}>
          <li>Give every sync an owner and an escalation path.</li>
          <li>Separate technical delivery success from business outcome.</li>
          <li>Alert on freshness and oldest pending record, not only task status.</li>
          <li>Reconcile a sample and an aggregate count after backfills or schema changes.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 56 }}>
        <SectionTag text="// Part 07 — Guided Sync Design" />
        <DEWorkshop title="Design an account health sync that can recover" objective="Choose a stable key and idempotent delivery behavior, then handle an account removed from eligibility." prerequisites="Know incremental extraction, deterministic keys, retries, and the distinction between an upsert and an append-only action.">
          <Para>A curated model has two current accounts. One destination write succeeds, the second times out after an ambiguous response, and an account from the previous run no longer appears in the model. Design the next run so it does not duplicate the successful write, does not blindly repeat an irreversible action, and clears stale destination state for the removed account.</Para>
          <WorkshopCode language="python" expectedOutput={'stable_key=account_id\nretry_safe=upsert_with_same_key\nremoved_account=send_deactivation\nprogress=advance_after_ack_or_reconciliation'}>{`design = {
    "stable_key": "account_id",
    "retry_safe": "upsert_with_same_key",
    "removed_account": "send_deactivation",
    "progress": "advance_after_ack_or_reconciliation",
}
for key, value in design.items():
    print(f"{key}={value}")`}</WorkshopCode>
          <WorkshopAnswer><Para>Use the stable account identifier, not a mutable display field. Retry the ambiguous update only if repeated upsert by that key converges to the same current values; otherwise reconcile the destination or use a destination-supported idempotency token. Send an explicit deactivation for the account that disappeared from eligibility. Advance the durable cursor only after confirmed delivery or reconciliation, and record unresolved rows for operator action.</Para></WorkshopAnswer>
        </DEWorkshop>
        <Para>Practice: document the sync contract; define what fields this process owns; sketch an idempotency key; write a test for a timeout after apply; design a deletion/tombstone path; and choose one technical SLO and one business outcome metric with the workflow owner.</Para>
      </section>

      <section style={{ marginBottom: 48 }}>
        <SectionTag text="// Part 08 — Key Takeaways" />
        <KeyTakeaways items={[
          'Reverse ETL activates a governed analytical model in an operational workflow; it does not replace source ingestion.',
          'Start with an owner, decision, grain, stable key, freshness objective, and minimum field set.',
          'Use idempotent upserts or destination-supported tokens to make retries safe.',
          'Model deactivation and deletion explicitly; filtering a row out does not clear a stale destination value.',
          'Protect destination credentials and data as a distinct access boundary.',
          'Measure both delivery health and whether the operational action achieved its intended outcome.',
        ]} />
        <Para>Next, build distributed data-processing foundations before combining batch and streaming in the capstone.</Para>
        <Link href="/learn/data-engineering/spark-fundamentals-pyspark" style={{ display: 'inline-block', background: '#14b8a6', color: '#000', fontSize: 13, fontWeight: 700, borderRadius: 8, padding: '10px 18px', textDecoration: 'none' }}>Lesson 50 → Spark Fundamentals with PySpark</Link>
      </section>
    </LearnLayout>
  )
}
