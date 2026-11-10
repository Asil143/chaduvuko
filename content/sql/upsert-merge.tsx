import { LearnLayout } from '@/components/content/LearnLayout';
import { Callout } from '@/components/content/Callout';
import { KeyTakeaways } from '@/components/content/KeyTakeaways';
import Link from 'next/link';

const C = '#06b6d4';
const Part = ({ n, title }: { n: string; title: string }) => <div style={{ margin: '32px 0 16px' }}><p style={{ color: C, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, margin: '0 0 7px' }}>// Part {n}</p><h2 style={{ color: 'var(--text)', fontSize: 'clamp(20px,3vw,30px)', letterSpacing: '-1px', margin: 0 }}>{title}</h2></div>;
const P = ({ children }: { children: React.ReactNode }) => <p style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>;
const CodeBlock = ({ label, code }: { label: string; code: string }) => <div style={{ border: '1px solid var(--border)', borderRadius: 10, margin: '16px 0 24px', overflow: 'hidden' }}><div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 11, padding: '8px 14px' }}>{label}</div><pre style={{ background: 'var(--bg2)', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8, margin: 0, overflowX: 'auto', padding: '14px 16px', whiteSpace: 'pre' }}>{code}</pre></div>;

export default function UpsertMerge() {
  return <LearnLayout title="UPSERT and MERGE" description="Synchronize incoming records with existing rows using PostgreSQL conflict handling, MERGE, and the equivalent patterns in MySQL, SQL Server, and Snowflake." section="SQL — Lesson 58" readTime="16–22 min">
    <Part n="01" title="Make repeated loads safe" />
    <P>A daily import often contains both familiar business keys and new ones. A plain <code>INSERT</code> fails on a duplicate unique key; a separate “check, then insert or update” has a race because another transaction can change the row between the check and the write. An <strong>upsert</strong> means “insert this row, or update the conflicting row.” <code>MERGE</code> matches a source set to a target set and can perform different actions for matched and unmatched rows.</P>
    <P>Example: an inventory feed contains a merchant SKU, the latest quantity, and the feed timestamp. Make the SKU unique, then merge incoming data against that key. The database constraint—not an earlier application query—defines what counts as a conflict.</P>
    <Callout type="info">Prerequisites: <code>INSERT</code>, <code>UPDATE</code>, unique constraints, and transactions. Objective: select a conflict key, write a repeatable synchronization statement, and recognize engine-specific syntax.</Callout>

    <Part n="02" title="PostgreSQL UPSERT with ON CONFLICT" />
    <P>PostgreSQL’s <code>INSERT ... ON CONFLICT</code> handles a uniqueness conflict in one statement. The conflict target names a unique constraint or its columns. <code>DO NOTHING</code> ignores a duplicate; <code>DO UPDATE</code> updates the conflicting target row. The proposed row is available through the <code>EXCLUDED</code> pseudo-table.</P>
    <CodeBlock label="PostgreSQL — insert or update a merchant’s inventory snapshot" code={`CREATE TABLE inventory_snapshot (
  merchant_sku text PRIMARY KEY,
  quantity integer NOT NULL CHECK (quantity >= 0),
  source_updated_at timestamptz NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO inventory_snapshot (
  merchant_sku, quantity, source_updated_at
)
VALUES ('RICE-5KG', 42, TIMESTAMPTZ '2026-11-09 16:00:00-08')
ON CONFLICT (merchant_sku) DO UPDATE
SET quantity = EXCLUDED.quantity,
    source_updated_at = EXCLUDED.source_updated_at,
    updated_at = now()
WHERE EXCLUDED.source_updated_at > inventory_snapshot.source_updated_at;`} />
    <P>The final <code>WHERE</code> prevents an older delayed feed row from overwriting newer state. When it evaluates false, PostgreSQL skips the update for that conflict. The uniqueness constraint still arbitrates competing inserts atomically. Use a target constraint that reflects the true identity of the row; email or SKU may not be unique unless the schema says so.</P>
    <CodeBlock label="Variants: ignore a duplicate, or target a named constraint" code={`-- Idempotently accept the first event for an external ID
INSERT INTO imported_events (external_id, payload)
VALUES ('evt-2048', '{"status":"paid"}'::jsonb)
ON CONFLICT (external_id) DO NOTHING;

-- A named unique constraint can be the target instead
INSERT INTO inventory_snapshot (merchant_sku, quantity, source_updated_at)
VALUES ('TEA-250G', 18, now())
ON CONFLICT ON CONSTRAINT inventory_snapshot_pkey DO UPDATE
SET quantity = EXCLUDED.quantity,
    source_updated_at = EXCLUDED.source_updated_at;`} />

    <Part n="03" title="MERGE: match a source set to a target set" />
    <P><code>MERGE</code> is useful when a batch has several records and different actions are required for matched and unmatched keys. PostgreSQL supports <code>MERGE</code> beginning with version 15. Use a staging table or a <code>VALUES</code> source, and make sure the source contains at most one row per target key—otherwise one target row can be matched more than once, which is an error or ambiguous business logic depending on the engine.</P>
    <CodeBlock label="PostgreSQL 15+ — insert missing SKUs and update matched ones" code={`MERGE INTO inventory_snapshot AS target
USING (
  VALUES
    ('RICE-5KG'::text, 45, TIMESTAMPTZ '2026-11-09 17:00:00-08'),
    ('TEA-250G'::text, 18, TIMESTAMPTZ '2026-11-09 17:00:00-08')
) AS source(merchant_sku, quantity, source_updated_at)
ON target.merchant_sku = source.merchant_sku
WHEN MATCHED AND source.source_updated_at > target.source_updated_at THEN
  UPDATE SET quantity = source.quantity,
             source_updated_at = source.source_updated_at,
             updated_at = now()
WHEN NOT MATCHED THEN
  INSERT (merchant_sku, quantity, source_updated_at)
  VALUES (source.merchant_sku, source.quantity, source.source_updated_at);`} />
    <P>A <code>MERGE</code> source can be a staging table or a query result. Validate and deduplicate that source before the merge, and decide whether target rows missing from the source should remain untouched or be deleted. Deleting unmatched rows is a separate, potentially destructive business rule—not an automatic part of synchronization.</P>
    <Callout type="warning">UPSERT is not a synonym for “replace the whole table.” Define which columns may change, how stale events are handled, whether absent rows are retained, and what happens when two writers race.</Callout>

    <Part n="04" title="Dialect map: similar goal, different syntax" />
    <div style={{ overflowX: 'auto', margin: '18px 0 26px' }}><table style={{ borderCollapse: 'collapse', color: 'var(--text)', fontSize: 13, width: '100%' }}><thead><tr>{['Database', 'Common form', 'Important consideration'].map(x => <th key={x} style={{ borderBottom: `2px solid ${C}`, padding: 10, textAlign: 'left' }}>{x}</th>)}</tr></thead><tbody>{[
      ['PostgreSQL', 'INSERT ... ON CONFLICT (...) DO UPDATE / DO NOTHING; MERGE on newer supported versions', 'Use EXCLUDED for proposed values; the conflict target must match a unique constraint/index.'],
      ['MySQL', 'INSERT ... ON DUPLICATE KEY UPDATE', 'Any conflicting unique key may trigger the update; be explicit about which unique keys can collide.'],
      ['SQL Server', 'MERGE, or separate UPDATE/INSERT logic inside a transaction', 'Review concurrency behavior and the target SQL Server guidance; test under realistic concurrent writes.'],
      ['Snowflake', 'MERGE INTO target USING source ON ... WHEN MATCHED / NOT MATCHED', 'Deduplicate source rows by match key before merging; define matched updates and insert columns explicitly.'],
    ].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ borderBottom: '1px solid var(--border)', lineHeight: 1.7, padding: 10, verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody></table></div>
    <P>MySQL’s update clause is not PostgreSQL’s <code>ON CONFLICT</code>. In current MySQL syntax, an inserted-row alias can be used to refer to incoming values; older examples using <code>VALUES(column)</code> may be deprecated in newer releases. SQL Server and Snowflake support <code>MERGE</code> with their own exact syntax and semantics. Treat the table as a map, not copy-paste SQL; check the deployed engine and version.</P>
    <CodeBlock label="MySQL-style example — verify the exact version syntax" code={`CREATE TABLE inventory_snapshot_mysql (
  merchant_sku VARCHAR(64) PRIMARY KEY,
  quantity INT NOT NULL,
  source_updated_at DATETIME NOT NULL
);

INSERT INTO inventory_snapshot_mysql
  (merchant_sku, quantity, source_updated_at)
VALUES ('RICE-5KG', 45, CURRENT_TIMESTAMP)
AS incoming
ON DUPLICATE KEY UPDATE
  quantity = incoming.quantity,
  source_updated_at = incoming.source_updated_at;`} />

    <Part n="05" title="Design for idempotency, constraints, and concurrency" />
    <P>An idempotent load can be retried without creating duplicate business records or corrupting state. A unique key is the foundation, but it does not define whether “last write wins,” whether the newest source timestamp wins, or whether an event should be applied once. Store a stable source event ID for event ingestion, and use a monotonic version or source timestamp when delayed data can arrive.</P>
    <P>Keep the transaction boundary around related work. An upsert of one row is atomic as a statement, but a workflow that updates inventory and writes an audit record may need a transaction so both changes succeed or fail together. Inspect row counts and returned values as appropriate, and ensure the application distinguishes inserted, updated, ignored, and stale records if that matters operationally.</P>
    <CodeBlock label="PostgreSQL — stage a batch and keep only the newest row per key" code={`WITH newest_per_sku AS (
  SELECT DISTINCT ON (merchant_sku)
         merchant_sku, quantity, source_updated_at
  FROM incoming_inventory
  ORDER BY merchant_sku, source_updated_at DESC
)
INSERT INTO inventory_snapshot AS target
  (merchant_sku, quantity, source_updated_at)
SELECT merchant_sku, quantity, source_updated_at
FROM newest_per_sku
ON CONFLICT (merchant_sku) DO UPDATE
SET quantity = EXCLUDED.quantity,
    source_updated_at = EXCLUDED.source_updated_at,
    updated_at = now()
WHERE EXCLUDED.source_updated_at > target.source_updated_at;`} />
    <P><code>DISTINCT ON</code> is PostgreSQL-specific. In another engine, rank staged rows with <code>ROW_NUMBER()</code> partitioned by key and keep row 1. This is not cosmetic: a source containing multiple versions for one key must be reduced to the one row the business rule wants before a merge.</P>

    <Part n="06" title="Common mistakes in upsert workflows" />
    <div style={{ background: 'rgba(255,71,87,.05)', border: '1px solid rgba(255,71,87,.2)', borderRadius: 9, margin: '12px 0', padding: '13px 16px' }}><p style={{ color: '#ff4757', fontSize: 13, fontWeight: 700, margin: '0 0 5px' }}>1. Checking then inserting in separate statements</p><p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>Two concurrent sessions can both observe “missing” and then race to insert. Put the unique constraint in the database and use an atomic conflict-aware write.</p></div>
    <div style={{ background: 'rgba(255,71,87,.05)', border: '1px solid rgba(255,71,87,.2)', borderRadius: 9, margin: '12px 0', padding: '13px 16px' }}><p style={{ color: '#ff4757', fontSize: 13, fontWeight: 700, margin: '0 0 5px' }}>2. Updating every column blindly</p><p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>An import may not own every target field. Update only fields managed by that source, and use a timestamp/version guard to reject stale data.</p></div>
    <div style={{ background: 'rgba(255,71,87,.05)', border: '1px solid rgba(255,71,87,.2)', borderRadius: 9, margin: '12px 0', padding: '13px 16px' }}><p style={{ color: '#ff4757', fontSize: 13, fontWeight: 700, margin: '0 0 5px' }}>3. Merging duplicate source keys</p><p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>Deduplicate or rank the staging data before matching. Decide which version wins instead of depending on accidental row order.</p></div>
    <div style={{ background: 'rgba(255,71,87,.05)', border: '1px solid rgba(255,71,87,.2)', borderRadius: 9, margin: '12px 0', padding: '13px 16px' }}><p style={{ color: '#ff4757', fontSize: 13, fontWeight: 700, margin: '0 0 5px' }}>4. Assuming nulls and unique keys behave alike everywhere</p><p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>NULL uniqueness semantics and which key triggers an update differ by engine. Prefer non-null business keys and read the engine-specific constraint rules.</p></div>

    <Part n="07" title="Practice: make the load safe to rerun" />
    <P>Use a hypothetical incoming table with <code>merchant_sku</code>, <code>quantity</code>, and <code>source_updated_at</code>. Write down the unique key and stale-data policy before writing SQL.</P>
    <ol style={{ color: 'var(--text)', fontSize: 14, lineHeight: 2, paddingLeft: 22 }}>
      <li>Write a PostgreSQL statement that inserts a new SKU or updates its quantity when the incoming timestamp is newer.</li>
      <li>Change the conflict action to ignore duplicate event IDs without modifying an existing row.</li>
      <li>Stage two updates for the same SKU and deduplicate them by source timestamp before loading.</li>
      <li>Sketch a <code>MERGE</code> for a batch. Which action handles matched rows? Which handles new rows? What if the source has duplicate keys?</li>
      <li>Translate the simple upsert to MySQL or your engine, then verify the exact syntax and unique-key behavior in its documentation.</li>
    </ol>
    <KeyTakeaways items={['A unique constraint defines conflict identity; application-side check-then-insert is race-prone.', 'PostgreSQL ON CONFLICT is an atomic insert-or-update mechanism; EXCLUDED refers to proposed values.', 'MERGE expresses actions for matched and unmatched source rows, but source keys must be unambiguous.', 'Use timestamps or versions to avoid overwriting newer data with stale arrivals.', 'Update only the columns the feed owns and keep related writes in a transaction.', 'MySQL, SQL Server, and Snowflake differ in syntax and edge cases; test against the production engine.']} />
    <h3 style={{ color: 'var(--text)', fontSize: 17, margin: '28px 0 10px' }}>Next</h3>
    <P>Next, extend grouped reports beyond one level of totals with <code>ROLLUP</code>, <code>CUBE</code>, and <code>GROUPING SETS</code>.</P>
    <Link href="/learn/sql/rollup-cube-grouping-sets" style={{ color: C, fontWeight: 700, textDecoration: 'none' }}>Lesson 59 → ROLLUP, CUBE and GROUPING SETS</Link>
  </LearnLayout>;
}
