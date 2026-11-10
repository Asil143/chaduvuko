import { LearnLayout } from '@/components/content/LearnLayout';
import { Callout } from '@/components/content/Callout';
import { KeyTakeaways } from '@/components/content/KeyTakeaways';
import Link from 'next/link';

const C = '#06b6d4';
const Part = ({ n, title }: { n: string; title: string }) => <div style={{ margin: '32px 0 16px' }}><p style={{ color: C, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, margin: '0 0 7px' }}>// Part {n}</p><h2 style={{ color: 'var(--text)', fontSize: 'clamp(20px,3vw,30px)', letterSpacing: '-1px', margin: 0 }}>{title}</h2></div>;
const P = ({ children }: { children: React.ReactNode }) => <p style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>;
const CodeBlock = ({ label, code }: { label: string; code: string }) => <div style={{ border: '1px solid var(--border)', borderRadius: 10, margin: '16px 0 24px', overflow: 'hidden' }}><div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 11, padding: '8px 14px' }}>{label}</div><pre style={{ background: 'var(--bg2)', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8, margin: 0, overflowX: 'auto', padding: '14px 16px', whiteSpace: 'pre' }}>{code}</pre></div>;

export default function JsonInSql() {
  return <LearnLayout title="Working with JSON in SQL" description="Store and query semi-structured attributes with PostgreSQL jsonb, extract scalars and arrays, update documents, and compare other database dialects." section="SQL — Lesson 60" readTime="18–24 min">
    <Part n="01" title="Relational columns and JSON have different jobs" />
    <P>Relational columns are ideal for fields that drive joins, constraints, reporting, and frequent filtering. JSON is useful when an entity has a small, evolving set of optional or source-specific attributes. A delivery order, for example, might have stable columns for order ID, customer, amount, and status, plus a JSON document for a partner’s evolving delivery metadata.</P>
    <P>JSON support does not remove the need for a schema. You still need to decide which keys are required, what types they hold, whether missing values are allowed, and which paths need indexes. Keep high-value relationships and frequently queried business fields as normal columns.</P>
    <Callout type="info">Prerequisites: tables, constraints, <code>SELECT</code>, and basic filtering. Objective: model a bounded JSON use case, query it safely, and identify when a value belongs in a typed relational column instead.</Callout>

    <Part n="02" title="PostgreSQL JSON and JSONB" />
    <P>PostgreSQL offers <code>json</code> and <code>jsonb</code>. Both validate JSON syntax on input. <code>json</code> preserves the input text representation, while <code>jsonb</code> stores a decomposed representation suited to efficient processing and indexing. For most application query workloads, <code>jsonb</code> is the practical default.</P>
    <CodeBlock label="PostgreSQL — define a JSONB column with a bounded document contract" code={`CREATE TABLE delivery_orders (
  order_id bigint PRIMARY KEY,
  customer_id bigint NOT NULL,
  status text NOT NULL,
  total_amount numeric(12, 2) NOT NULL,
  attributes jsonb NOT NULL DEFAULT '{}'::jsonb,
  CHECK (jsonb_typeof(attributes) = 'object')
);

INSERT INTO delivery_orders (
  order_id, customer_id, status, total_amount, attributes
)
VALUES (
  9001, 42, 'in_transit', 1249.50,
  '{"delivery":{"zone":"south","slot":"evening"},
    "partner":"courier-a"}'::jsonb
);`} />
    <P>The check requires the top-level value to be an object; it does not validate every nested key or business rule. Use normal columns and constraints for fields that must be strongly typed and relational. JSON input must be valid JSON—single quotes are SQL string delimiters, while JSON keys and string values use double quotes.</P>
    <Callout type="tip">A JSON document is not a license to store arbitrary user input. Validate shape and allowed values at the application boundary, and constrain important invariants in the database where practical.</Callout>

    <Part n="03" title="Extract values and filter documents" />
    <P>In PostgreSQL, <code>-&gt;</code> returns a JSON value, and <code>-&gt;&gt;</code> returns text. The <code>#&gt;</code> and <code>#&gt;&gt;</code> operators follow a nested path. Text extraction is convenient for comparison, but cast explicitly when numeric or date semantics matter. Missing paths generally produce SQL NULL, so normal NULL rules apply.</P>
    <CodeBlock label="PostgreSQL — read nested keys and filter by a JSON value" code={`SELECT
  order_id,
  attributes -> 'delivery' AS delivery_object,
  attributes -> 'delivery' ->> 'zone' AS delivery_zone,
  attributes #>> '{delivery,slot}' AS delivery_slot
FROM delivery_orders
WHERE attributes ->> 'partner' = 'courier-a';

-- Cast extracted text when doing numeric comparisons
SELECT order_id,
       (attributes ->> 'attempt_count')::integer AS attempts
FROM delivery_orders
WHERE COALESCE((attributes ->> 'attempt_count')::integer, 0) > 1;`} />
    <P>For containment, <code>@&gt;</code> asks whether the left JSONB value contains the right JSONB structure. It is often easier to read than several nested path predicates for exact key/value structure. Use <code>jsonb_exists</code> or the <code>?</code> operator to test a top-level key. Be deliberate about whether a condition should match an absent key, JSON null, or a SQL NULL result.</P>
    <CodeBlock label="PostgreSQL — containment and key presence" code={`-- Orders whose document contains this nested structure
SELECT order_id
FROM delivery_orders
WHERE attributes @> '{"delivery":{"zone":"south"}}'::jsonb;

-- Top-level key exists (even if its value is JSON null)
SELECT order_id
FROM delivery_orders
WHERE attributes ? 'partner';

-- SQL NULL (missing path) is different from JSON null
SELECT order_id
FROM delivery_orders
WHERE attributes -> 'delivery' -> 'instructions' = 'null'::jsonb;`} />

    <Part n="04" title="Expand arrays into rows" />
    <P>When a JSON array needs analysis, expand it into relational rows. PostgreSQL’s <code>jsonb_array_elements</code> returns each element; use a lateral join so the function can reference the current source row. For an array of objects, extract fields from each element and cast carefully.</P>
    <CodeBlock label="PostgreSQL — one result row per item in a JSON array" code={`-- Example attributes value:
-- {"items":[{"sku":"RICE-5KG","qty":2},
--           {"sku":"TEA-250G","qty":1}]}
SELECT d.order_id,
       item ->> 'sku' AS sku,
       (item ->> 'qty')::integer AS quantity
FROM delivery_orders AS d
CROSS JOIN LATERAL jsonb_array_elements(
  d.attributes -> 'items'
) AS expanded(item);`} />
    <P>Array expansion changes the output grain: one order may produce several rows. If you aggregate those rows back to an order, verify that each item appears once and that the array actually exists and is an array. A defensive query may filter with <code>jsonb_typeof(attributes -&gt; 'items') = 'array'</code> before expanding.</P>

    <Part n="05" title="Update a path and index query patterns" />
    <P>Use <code>jsonb_set</code> to update a nested value without replacing the entire document. The path is a text array, and the new value must be JSONB. The final flag controls whether missing path elements should be created. Build the new JSON value with <code>to_jsonb</code> for a SQL text value, rather than hand-building JSON strings.</P>
    <CodeBlock label="PostgreSQL — set one nested value and create a missing key" code={`UPDATE delivery_orders
SET attributes = jsonb_set(
  attributes,
  '{delivery,zone}',
  to_jsonb('central'::text),
  true
)
WHERE order_id = 9001;`} />
    <P>A JSONB GIN index can accelerate containment and key-existence patterns. A general GIN index supports many operators; <code>jsonb_path_ops</code> can be smaller and efficient for containment-focused workloads but does not support every operator supported by the default operator class. If the application repeatedly filters on one scalar path, a targeted expression index may be more appropriate.</P>
    <CodeBlock label="PostgreSQL — choose an index for the predicate you actually use" code={`-- General-purpose index for several JSONB operators
CREATE INDEX delivery_orders_attributes_gin
  ON delivery_orders USING GIN (attributes);

-- Alternative containment-focused operator class
CREATE INDEX delivery_orders_attributes_path_gin
  ON delivery_orders USING GIN (attributes jsonb_path_ops);

-- Targeted index for a frequently filtered text path
CREATE INDEX delivery_orders_partner_idx
  ON delivery_orders ((attributes ->> 'partner'));`} />
    <P>Do not add all three indexes by default. Indexes add storage and write cost. Check representative queries with <code>EXPLAIN (ANALYZE, BUFFERS)</code> and compare plans before choosing. A normal typed column may be simpler and faster if a JSON path becomes a core part of the application’s data model.</P>

    <Part n="06" title="JSON across SQL engines" />
    <div style={{ overflowX: 'auto', margin: '18px 0 26px' }}><table style={{ borderCollapse: 'collapse', color: 'var(--text)', fontSize: 13, width: '100%' }}><thead><tr>{['Engine', 'Typical representation', 'Common query tools'].map(x => <th key={x} style={{ borderBottom: `2px solid ${C}`, padding: 10, textAlign: 'left' }}>{x}</th>)}</tr></thead><tbody>{[
      ['PostgreSQL', 'json / jsonb types', '->, ->>, #>>, @>, jsonb_array_elements; GIN and expression indexes'],
      ['MySQL', 'JSON column type', 'JSON_EXTRACT, ->, ->>, JSON_TABLE for relational row projection'],
      ['SQL Server', 'JSON text commonly held in character columns', 'JSON_VALUE, JSON_QUERY, OPENJSON; JSON_MODIFY updates a path'],
      ['Snowflake', 'VARIANT semi-structured type', 'PARSE_JSON, colon/dot path access, FLATTEN to expand arrays'],
    ].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ borderBottom: '1px solid var(--border)', lineHeight: 1.7, padding: 10, verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody></table></div>
    <P>These are conceptual equivalents, not interchangeable syntax. SQL Server’s <code>JSON_VALUE</code> extracts a scalar while <code>JSON_QUERY</code> returns an object or array; <code>OPENJSON</code> projects properties into rows. MySQL’s <code>JSON_TABLE</code> turns a document into a typed relational projection. Snowflake stores semi-structured data in <code>VARIANT</code> and uses <code>FLATTEN</code> for arrays. Verify null handling, path behavior, type conversion, and index options in your engine’s documentation.</P>
    <Callout type="warning">JSON paths often return text or variant values, not the type your report expects. Cast explicitly, handle missing keys and malformed values, and test the behavior on the database engine you deploy.</Callout>

    <Part n="07" title="Mistakes, practice, and next steps" />
    <div style={{ background: 'rgba(255,71,87,.05)', border: '1px solid rgba(255,71,87,.2)', borderRadius: 9, margin: '12px 0', padding: '13px 16px' }}><p style={{ color: '#ff4757', fontSize: 13, fontWeight: 700, margin: '0 0 5px' }}>1. Putting relational keys inside an opaque document</p><p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>If a field is used for joins, foreign keys, core constraints, or frequent reporting, model it as a typed column instead of burying it in JSON.</p></div>
    <div style={{ background: 'rgba(255,71,87,.05)', border: '1px solid rgba(255,71,87,.2)', borderRadius: 9, margin: '12px 0', padding: '13px 16px' }}><p style={{ color: '#ff4757', fontSize: 13, fontWeight: 700, margin: '0 0 5px' }}>2. Comparing text to a number without casting</p><p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>Text extraction does not make the value numeric. Cast to the expected type and account for missing or invalid values.</p></div>
    <div style={{ background: 'rgba(255,71,87,.05)', border: '1px solid rgba(255,71,87,.2)', borderRadius: 9, margin: '12px 0', padding: '13px 16px' }}><p style={{ color: '#ff4757', fontSize: 13, fontWeight: 700, margin: '0 0 5px' }}>3. Confusing JSON null, missing key, and SQL NULL</p><p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>Check each state intentionally. Missing paths commonly yield SQL NULL, while an explicit JSON null remains a JSON value.</p></div>
    <div style={{ background: 'rgba(255,71,87,.05)', border: '1px solid rgba(255,71,87,.2)', borderRadius: 9, margin: '12px 0', padding: '13px 16px' }}><p style={{ color: '#ff4757', fontSize: 13, fontWeight: 700, margin: '0 0 5px' }}>4. Indexing the entire document without a workload</p><p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>Choose a general or targeted index from actual predicates, measure query plans, and account for write overhead.</p></div>
    <P>Practice tasks:</P>
    <ol style={{ color: 'var(--text)', fontSize: 14, lineHeight: 2, paddingLeft: 22 }}>
      <li>Create a table with a JSONB object column, a default empty object, and a top-level object check.</li>
      <li>Extract a nested city as text, and filter for a specific partner using both a path predicate and containment.</li>
      <li>Expand an array of line items into one row per item, then state the resulting row grain.</li>
      <li>Update one nested key with <code>jsonb_set</code> and explain what the create-missing flag does.</li>
      <li>Pick one predicate and propose a GIN or expression index. Explain what you would inspect in its query plan.</li>
    </ol>
    <KeyTakeaways items={['Use JSON for flexible attributes, not as a substitute for core relational data design.', 'PostgreSQL jsonb validates and stores queryable JSON in a decomposed form; -> returns JSON and ->> returns text.', 'Expand arrays with a set-returning function and remember that this changes result grain.', 'Use jsonb_set for a path update and select indexes based on the predicates you actually run.', 'Missing paths, JSON null, and SQL NULL are different states.', 'MySQL, SQL Server, and Snowflake use different JSON types, path syntax, and row-expansion functions.']} />
    <h3 style={{ color: 'var(--text)', fontSize: 17, margin: '28px 0 10px' }}>Next</h3>
    <P>Next, combine ordering and window functions to detect consecutive runs, missing periods, and other classic analytical patterns.</P>
    <Link href="/learn/sql/gaps-and-islands" style={{ color: C, fontWeight: 700, textDecoration: 'none' }}>Lesson 61 → Gaps and Islands and Other Classic Patterns</Link>
  </LearnLayout>;
}
