import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Structured, Semi-Structured and Unstructured Data — Data Engineering | Chaduvuko',
  description:
    'The three categories every data engineer works with daily — what makes each one different, how each is stored, and what each demands from your pipeline and architecture.',
}

// ── Local components ────────────────────────────────────────────────────────

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

// ── Page ────────────────────────────────────────────────────────────────────

export default function DataTypesStructuredModule() {
  return (
    <LearnLayout
      title="Structured, Semi-Structured and Unstructured Data"
      description="The three categories every data engineer works with — what each demands from your pipeline."
      section="Data Engineering"
      readTime="45 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — Why the Categories Matter ──────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why These Categories Matter" />
        <SectionTitle>The Three Categories — Why Every Data Engineer Must Know Them</SectionTitle>

        <Para>
          Walk into any data engineering interview and say "I can handle all types of
          data" — you will be asked to prove it immediately. Because the three categories
          of data require fundamentally different storage systems, different parsing
          approaches, different transformation techniques, and different infrastructure
          choices. Confusing them in a pipeline causes silent bugs. Choosing the wrong
          storage for a category creates performance problems that cannot be fixed without
          rebuilding.
        </Para>

        <Para>
          Every data source you will ever encounter belongs to one of three categories.
          The moment you identify which category a new data source belongs to, you know
          which tools to reach for, which ingestion approach to use, and which
          complications to expect. That pattern recognition is what this module builds.
        </Para>

        <HighlightBox>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              {
                type: 'Structured',
                color: '#00e676',
                oneline: 'Data with a rigid, predefined schema — rows and columns where every value has a known type and position.',
                examples: 'PostgreSQL tables, CSV files, Excel sheets',
                pct: '~20% of all enterprise data',
              },
              {
                type: 'Semi-Structured',
                color: '#7b61ff',
                oneline: 'Data with some organisation but no rigid schema — self-describing format where structure can vary between records.',
                examples: 'JSON, XML, Avro, Parquet, log files',
                pct: '~40% of all enterprise data',
              },
              {
                type: 'Unstructured',
                color: '#f97316',
                oneline: 'Data with no predefined schema and no inherent organisation — raw content that requires interpretation to extract meaning.',
                examples: 'Images, audio, video, free-text, PDFs, emails',
                pct: '~80% of all data generated globally',
              },
            ].map((item) => (
              <div key={item.type} style={{
                borderLeft: `3px solid ${item.color}`,
                paddingLeft: 16,
              }}>
                <div style={{
                  fontSize: 15, fontWeight: 800, color: item.color,
                  fontFamily: 'var(--font-display)', marginBottom: 6,
                }}>{item.type}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 8 }}>
                  {item.oneline}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                  e.g. {item.examples}
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: item.color,
                  fontFamily: 'var(--font-mono)',
                }}>{item.pct}</div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <Callout type="info">
          <strong>The percentage paradox:</strong> Structured data is only 20% of enterprise
          data but accounts for 80% of what gets analysed, because it is the easiest to
          query. Unstructured data is 80% of all data generated but most organisations
          cannot use it without specialised ML models. As a data engineer, you will spend
          the most time on structured and semi-structured data — but understanding
          unstructured data is increasingly critical as AI workloads grow.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 — Structured Data ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Category One" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
            background: 'rgba(0,230,118,0.12)', border: '2px solid #00e676',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
          }}>📋</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
            letterSpacing: '-1px', color: '#00e676', margin: 0,
            fontFamily: 'var(--font-display)', lineHeight: 1.2,
          }}>Structured Data</h2>
        </div>

        <Para>
          Structured data has a fixed, predefined schema. Every record has exactly the
          same fields, every field has a known data type, and every value occupies a
          known position. This rigidity is what makes structured data easy to query,
          easy to validate, and easy to analyse — but also what makes it break when
          reality does not fit neatly into rows and columns.
        </Para>

        <SubTitle>What makes it "structured"</SubTitle>

        <Para>
          Structure means: before you read a single row of data, you know exactly
          what you will find. A relational database table defining orders has columns
          named <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>order_id</code>, <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>customer_id</code>, <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>order_amount</code>,
          and <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>created_at</code>. Every row has exactly these four fields. <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>order_id</code> is
          always an integer. <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>order_amount</code> is always a decimal. <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>created_at</code> is always
          a timestamp. The schema is the contract, and the database enforces it.
        </Para>

        <CodeBox label="Structured data — a relational table with strict schema">{`Table: orders (PostgreSQL)

Schema (the contract):
  order_id      BIGINT       NOT NULL PRIMARY KEY
  customer_id   BIGINT       NOT NULL
  restaurant_id INTEGER      NOT NULL
  order_amount  DECIMAL(10,2) NOT NULL
  status        VARCHAR(20)  NOT NULL CHECK (status IN ('placed','confirmed','delivered','cancelled'))
  created_at    TIMESTAMP    NOT NULL DEFAULT NOW()

Row 1: [9284751, 4201938, 7823, 380.00, 'delivered', '2026-03-17 20:14:32']
Row 2: [9284752, 1092847, 2341, 220.00, 'cancelled', '2026-03-17 20:15:01']
Row 3: [9284753, 8374621, 7823, 540.00, 'confirmed', '2026-03-17 20:15:12']

Properties:
  ✓ Every row has exactly the same columns
  ✓ Each column has a fixed data type enforced by the database
  ✓ Invalid data is REJECTED — try inserting order_amount='abc' and it fails
  ✓ NULL constraints prevent missing required fields
  ✓ CHECK constraints enforce business rules (valid status values)

This predictability is what makes SQL queries fast and reliable.
A query engine knows exactly where each field is without parsing.`}</CodeBox>

        <SubTitle>Where structured data lives</SubTitle>

        <Para>
          Structured data primarily lives in relational databases — PostgreSQL, MySQL,
          SQL Server, Oracle — and in structured file formats like CSV (Comma-Separated
          Values) and TSV (Tab-Separated Values). Columnar formats like Parquet and ORC
          are also structured — they have a defined schema — but they store data in a
          columnar layout optimised for analytics rather than the row-oriented layout
          of operational databases.
        </Para>

        <SubTitle>What structured data demands from your pipeline</SubTitle>

        {[
          {
            demand: 'Schema change handling',
            detail: `When a developer adds a new column to a production database, your ingestion pipeline must handle it. If you are doing full-load ingestion, the new column appears automatically. If you are doing incremental ingestion by querying specific columns, you miss it until you update the query. Schema changes are the most common cause of pipeline failures in structured data ingestion. Always have a monitoring layer that detects when source schema differs from your expected schema.`,
          },
          {
            demand: 'Type fidelity',
            detail: `The data type in the source must be preserved correctly in the destination. A DECIMAL(10,2) amount column in PostgreSQL must not be loaded as FLOAT in the warehouse — floating point precision loss in financial data is a serious bug. A TIMESTAMP WITH TIME ZONE column must carry timezone information through the pipeline, not be silently converted to a naive datetime. Every type conversion in a pipeline is a potential data quality issue.`,
          },
          {
            demand: 'NULL semantics',
            detail: `NULL in a relational database has specific semantics: the value is unknown, not absent, not zero, not empty string. Different systems handle NULLs differently. A NULL in PostgreSQL, stored as CSV (where it becomes an empty field), loaded into Snowflake can behave differently in WHERE clauses and aggregations. Test your NULL handling explicitly — do not assume it passes through correctly.`,
          },
          {
            demand: 'Incremental extraction',
            detail: `Structured databases are usually OLTP systems under active transactional load. Extracting all data every run (full load) is acceptable for small tables but becomes too slow and too resource-intensive as tables grow. Incremental extraction — pulling only rows created or modified since the last run — requires a reliable high-watermark column (usually a timestamp or auto-incrementing ID). Not all tables have one, which forces you to use CDC instead.`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 10, padding: '16px 20px', marginBottom: 12,
          }}>
            <div style={{
              fontSize: 13, fontWeight: 800, color: '#00e676',
              fontFamily: 'var(--font-display)', marginBottom: 6,
            }}>{item.demand}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
              {item.detail}
            </div>
          </div>
        ))}

        <SubTitle>The CSV trap — structured format, unstructured reality</SubTitle>

        <Para>
          CSV files look like structured data — they have rows and columns, often with
          a header row that names the columns. But CSV has no schema enforcement. Nothing
          stops a row from having more or fewer columns than the header. Nothing enforces
          data types — everything is text. Nothing prevents nulls from appearing in any
          field. A data engineer who treats CSV as reliably structured has not yet
          encountered a CSV file from a vendor, a finance team, or an ERP export.
        </Para>

        <CodeBox label="CSV — what looks structured but is not enforced">{`"correct" CSV file:
order_id,customer_id,amount,status
9284751,4201938,380.00,delivered
9284752,1092847,220.00,cancelled

Reality of vendor-supplied CSV files:
  Row with wrong column count:
    9284753,8374621,540.00,confirmed,extra_column_nobody_warned_you_about

  Row with wrong data type:
    9284754,4201938,N/A,delivered    ← amount is text, not decimal

  Row with ambiguous null:
    9284755,,380.00,delivered         ← customer_id is empty — null or 0?

  Row with embedded delimiter:
    9284756,4201938,"1,380.00",delivered  ← amount contains a comma
                                            needs quoting — did the exporter handle it?

  Row with encoding issue:
    9284757,4201938,380.00,délivré     ← accented character — what encoding?

  Header row missing entirely:
    9284758,4201938,540.00,confirmed   ← is row 1 data or headers?

Pipeline rule: always validate CSV structure before processing.
Never assume a CSV is well-formed because it came from a "reliable" source.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — Semi-Structured Data ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Category Two" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
            background: 'rgba(123,97,255,0.12)', border: '2px solid #7b61ff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
          }}>🔀</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
            letterSpacing: '-1px', color: '#7b61ff', margin: 0,
            fontFamily: 'var(--font-display)', lineHeight: 1.2,
          }}>Semi-Structured Data</h2>
        </div>

        <Para>
          Semi-structured data has some organisation — fields have names, values have
          types — but the structure is not enforced by an external schema. The data
          carries its structure within itself. This "self-describing" property is both
          its greatest strength and its greatest source of engineering complexity.
        </Para>

        <Para>
          The strength: semi-structured formats can represent hierarchical, nested, and
          variable-length data that relational tables cannot. A single JSON object can
          represent an order with a nested array of items, a nested customer object, and
          optional fields that only appear for some order types — all in one document
          without needing six related tables.
        </Para>

        <Para>
          The complexity: because the structure is self-declared rather than enforced,
          it can change at any time. A field that was always present in past records
          can be absent in new ones. A field that was always a string becomes an array.
          A new nested object appears. None of these changes cause an error at the source
          — but all of them can silently break your downstream pipeline.
        </Para>

        <SubTitle>JSON — the dominant semi-structured format</SubTitle>

        <Para>
          JSON (JavaScript Object Notation) is the most common data format a data engineer
          encounters. Every REST API returns JSON. Every modern event stream carries JSON
          payloads. Every NoSQL database stores JSON documents. Understanding JSON deeply
          is not optional.
        </Para>

        <CodeBox label="JSON — structure, nesting, and the engineering challenges it creates">{`A single DoorDash order as JSON — what an API actually returns:

{
  "order_id": 9284751,
  "created_at": "2026-03-17T20:14:32+05:30",
  "customer": {
    "id": 4201938,
    "name": "Priya Sharma",
    "phone": "+91-9876543210",
    "address": {
      "flat": "4B",
      "building": "Prestige Meridian",
      "area": "Koramangala",
      "city": "Seattle",
      "zip_code": "560034",
      "lat": 12.9352,
      "lng": 77.6245
    }
  },
  "restaurant": {
    "id": 7823,
    "name": "Punjabi Dhaba",
    "city": "Seattle"
  },
  "items": [
    {
      "id": "MI-001",
      "name": "Butter Chicken",
      "quantity": 1,
      "unit_price": 320.00,
      "customisations": ["extra gravy"]
    },
    {
      "id": "MI-002",
      "name": "Garlic Naan",
      "quantity": 2,
      "unit_price": 30.00,
      "customisations": []
    }
  ],
  "payment": {
    "method": "UPI",
    "upi_id": "priya@ybl",
    "amount": 380.00,
    "status": "captured"
  },
  "delivery": {
    "agent_id": 83921,
    "estimated_time_mins": 35,
    "actual_time_mins": 42
  },
  "promo_code": null
}

Engineering challenges this single JSON creates:

1. NESTING — customer.address.city is 3 levels deep.
   To get city into a flat table you must flatten the hierarchy.
   SQL: customer['address']['city'] or JSON_EXTRACT()

2. ARRAYS — items is a list of variable length.
   1 order = 1 JSON object but potentially many items rows.
   Must EXPLODE/UNNEST the array to get one row per item.

3. OPTIONAL FIELDS — promo_code is null here.
   Other orders might not have the promo_code key at all.
   Code that does order['promo_code'] crashes on those.
   Code that does order.get('promo_code') handles it.

4. TYPE INCONSISTENCY — actual_time_mins might be null
   for orders still in progress. Your pipeline must handle
   both integer and null for the same field.

5. TIMESTAMP FORMAT — "2026-03-17T20:14:32+05:30"
   is ISO 8601 with timezone. Some records might have
   "2026-03-17 20:14:32" (no timezone). Parse explicitly.`}</CodeBox>

        <SubTitle>The flattening problem — from nested JSON to flat tables</SubTitle>

        <Para>
          Relational databases and data warehouses store data in flat tables — rows and
          columns with no nesting. JSON is hierarchical. The process of converting
          nested JSON into flat table rows is called <strong>flattening</strong> or
          <strong>normalisation</strong>, and it is one of the most common transformation
          tasks in data engineering.
        </Para>

        <CodeBox label="Flattening a nested JSON order into relational tables">{`Input: 1 JSON order object (as shown above)

Output: multiple flat table rows

Table: orders (one row per order)
  order_id | created_at          | customer_id | restaurant_id | total_amount | payment_method | promo_code
  9284751  | 2026-03-17 20:14:32 | 4201938     | 7823          | 380.00       | UPI            | NULL

Table: order_items (one row per item — EXPLODED from items array)
  order_id | item_id | item_name      | quantity | unit_price | customisations
  9284751  | MI-001  | Butter Chicken | 1        | 320.00     | extra gravy
  9284751  | MI-002  | Garlic Naan    | 2        | 30.00      | (empty)

Table: customers (one row per customer — EXTRACTED from nested customer object)
  customer_id | name          | phone           | city      | zip_code | lat     | lng
  4201938     | Priya Sharma  | +91-9876543210  | Seattle | 560034  | 12.9352 | 77.6245

Table: deliveries (one row per delivery)
  order_id | agent_id | estimated_mins | actual_mins
  9284751  | 83921    | 35             | 42

Key decision: how deep to flatten?
  Deep flatten: extract every nested field into its own column
    → Easy for analysts to query, but breaks when nested structure changes
  Shallow flatten: keep some nesting as JSON column in warehouse
    → More resilient to schema changes, but requires JSON functions to query
  
Most teams use a hybrid: flatten the top-level fields you know you need,
keep rarely-needed deep nesting as a JSON column for flexibility.`}</CodeBox>

        <SubTitle>XML — the older semi-structured format</SubTitle>

        <Para>
          XML (Extensible Markup Language) predates JSON and is more verbose — the same
          data takes roughly 3–4× more bytes to represent. But XML is still heavily used
          in enterprise systems, government data exchanges, healthcare (HL7 FHIR), and
          financial data (SWIFT, FIX protocol). If you work with legacy enterprise clients
          or government data sources, you will encounter XML regularly.
        </Para>

        <CodeBox label="The same order data in XML — more verbose, same engineering challenges">{`<?xml version="1.0" encoding="UTF-8"?>
<order id="9284751">
  <created_at>2026-03-17T20:14:32+05:30</created_at>
  <customer id="4201938">
    <name>Priya Sharma</name>
    <address>
      <city>Seattle</city>
      <zip_code>560034</zip_code>
    </address>
  </customer>
  <items>
    <item id="MI-001">
      <name>Butter Chicken</name>
      <quantity>1</quantity>
      <unit_price>320.00</unit_price>
    </item>
    <item id="MI-002">
      <name>Garlic Naan</name>
      <quantity>2</quantity>
      <unit_price>30.00</unit_price>
    </item>
  </items>
  <payment method="UPI" amount="380.00" status="captured"/>
</order>

XML-specific engineering challenges:
  → Namespaces: <ns0:order xmlns:ns0="http://schema.example.com/orders">
    Different XML documents use namespace prefixes differently.
    Always strip or normalise namespaces before parsing.

  → Attributes vs elements: both <amount>380</amount> and
    <payment amount="380"/> are valid XML for the same data.
    Your parser must handle both.

  → CDATA sections: text content that may contain special characters
    is wrapped in <![CDATA[...]]> — must be unwrapped before use.

  → Large XML files cannot be loaded into memory entirely.
    Use streaming parsers (SAX in Python) for files > a few MB.`}</CodeBox>

        <SubTitle>Log files — semi-structured but barely</SubTitle>

        <Para>
          Application log files are technically semi-structured — each line has a
          timestamp, a severity, and a message — but the structure is inconsistently
          applied and the message content is free text. Log files are the most
          challenging form of semi-structured data because the "schema" is defined
          by developers writing log statements, not by a formal specification.
        </Para>

        <CodeBox label="Log file — semi-structured but requiring careful parsing">{`Raw application log (what you receive):
2026-03-17 20:14:32.847 INFO  [OrderService] Order 9284751 placed by customer 4201938
2026-03-17 20:14:33.012 INFO  [PaymentService] Payment captured: ₹380.00 via UPI
2026-03-17 20:14:33.241 DEBUG [RestaurantService] Notifying restaurant 7823
2026-03-17 20:15:02.119 WARN  [OrderService] Delivery estimate exceeding threshold: order 9284751
2026-03-17 20:16:41.003 ERROR [PaymentService] Refund failed for order 9284754: timeout after 3s

Parsing this requires:
  1. Regex to extract timestamp, level, service, message
  2. Further parsing of message field to extract IDs and values
  3. Handling log lines that span multiple lines (stack traces)
  4. Handling encoding variations (₹ symbol)
  5. Dealing with log rotation and multiple log files per hour

Pattern:
  ^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3})\s+
  (INFO|DEBUG|WARN|ERROR)\s+
  \[([^\]]+)\]\s+(.+)$

Structured log (what modern applications emit — much easier):
  {"timestamp":"2026-03-17T20:14:32.847Z","level":"INFO",
   "service":"OrderService","event":"order_placed",
   "order_id":9284751,"customer_id":4201938}

If you have influence over how your company's services log —
always push for structured JSON logging. It eliminates regex.`}</CodeBox>

        <SubTitle>What semi-structured data demands from your pipeline</SubTitle>

        {[
          {
            demand: 'Schema inference and evolution',
            detail: 'Semi-structured data has no enforced schema. When a new field is added at the source, your pipeline should ideally detect and handle it automatically, not crash. Use schema inference tools (Spark\'s inferSchema, BigQuery\'s autodetect) for flexibility, but validate inferred schemas against expectations. When a field type changes — a price that was a string becomes a number — your pipeline must handle both for a transition period.',
          },
          {
            demand: 'Explosion of arrays',
            detail: 'When a JSON document contains an array (like the items array in an order), you often need one database row per array element, not one row per document. This explosion is done with UNNEST (SQL), explode() (PySpark), or equivalent functions. Always check whether the explosion is appropriate for the use case — sometimes you want to keep arrays as a JSON column rather than exploding into many rows.',
          },
          {
            demand: 'Handling missing fields gracefully',
            detail: 'In a JSON document, a field can be missing entirely (different from null). Your code must distinguish between field_not_present and field_is_null — they mean different things. Use .get() with a default in Python rather than direct key access. In SQL, use JSON_EXTRACT_SCALAR with a NULL default rather than assuming the key exists.',
          },
          {
            demand: 'Depth decisions — flatten or preserve',
            detail: 'Not every nested field needs to be flattened into its own column. Flatten the fields your analysts query most frequently. Keep rarely-accessed deep nesting as a JSON column that analysts can query with JSON functions when needed. This balance between accessibility and schema flexibility is one of the most important architectural decisions in semi-structured data pipelines.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid rgba(123,97,255,0.2)',
            borderRadius: 10, padding: '16px 20px', marginBottom: 12,
          }}>
            <div style={{
              fontSize: 13, fontWeight: 800, color: '#7b61ff',
              fontFamily: 'var(--font-display)', marginBottom: 6,
            }}>{item.demand}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
              {item.detail}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 04 — Unstructured Data ──────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Category Three" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
            background: 'rgba(249,115,22,0.12)', border: '2px solid #f97316',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
          }}>🌊</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
            letterSpacing: '-1px', color: '#f97316', margin: 0,
            fontFamily: 'var(--font-display)', lineHeight: 1.2,
          }}>Unstructured Data</h2>
        </div>

        <Para>
          Unstructured data has no predefined schema and no inherent organisation that
          a machine can automatically interpret. It is raw content — the bytes of an
          image, the waveform of an audio file, the free text of a customer review,
          the pages of a PDF contract. 80% of all data generated in the world is
          unstructured.
        </Para>

        <Para>
          For most of data engineering history, unstructured data was stored but largely
          ignored — too difficult to process at scale without the ML tools to interpret it.
          That has changed dramatically in the past three years. Every major Indian tech
          company now has projects that extract structured signals from unstructured data:
          sentiment from customer reviews, fraud signals from transaction descriptions,
          product categories from listing images, insights from call recordings.
        </Para>

        <SubTitle>Types of unstructured data and where they appear</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 28 }}>
          {[
            {
              type: 'Images',
              examples: 'Product photos (Amazon), KYC documents (fintechs), food photos (Uber Eats), satellite imagery (agricultural analytics)',
              pipeline: 'Store as-is in object storage. Extract metadata (dimensions, format, size). ML models extract structure (product category, face detection, OCR for document text).',
            },
            {
              type: 'Audio and Video',
              examples: 'Customer service call recordings, video KYC sessions, platform content (YouTube, streaming)',
              pipeline: 'Store compressed in object storage. Extract duration, format, bitrate as metadata. Speech-to-text models produce structured transcripts for analysis.',
            },
            {
              type: 'Free Text',
              examples: 'Customer reviews, support tickets, social media comments, email content, chatbot conversations',
              pipeline: 'Store raw text. NLP models extract sentiment, topic, intent, named entities. Output is structured (sentiment: positive, topic: delivery, entity: [Koramangala]).',
            },
            {
              type: 'PDFs and Documents',
              examples: 'Contracts, invoices, bank statements, regulatory filings, research papers',
              pipeline: 'Extract text with PDF parsers (pdfplumber, PyMuPDF). For scanned PDFs, OCR first. Structure extraction identifies tables, headers, and key fields.',
            },
            {
              type: 'Binary Files',
              examples: 'Proprietary formats, CAD files, medical imaging (DICOM), sensor binary streams',
              pipeline: 'Requires format-specific parsers. Store raw, extract what metadata is possible (file size, creation date, format version).',
            },
            {
              type: 'Emails',
              examples: 'Customer communications, vendor invoices, internal business correspondence',
              pipeline: 'Parse headers (from, to, date, subject) as structured fields. Body and attachments remain unstructured. NLP for classification and entity extraction.',
            },
          ].map((item) => (
            <div key={item.type} style={{
              background: 'var(--surface)', border: '1px solid rgba(249,115,22,0.2)',
              borderRadius: 10, padding: '16px 18px',
            }}>
              <div style={{
                fontSize: 13, fontWeight: 800, color: '#f97316',
                fontFamily: 'var(--font-display)', marginBottom: 6,
              }}>{item.type}</div>
              <div style={{
                fontSize: 12, color: 'var(--muted)', lineHeight: 1.6,
                marginBottom: 8, fontStyle: 'italic',
              }}>{item.examples}</div>
              <div style={{
                fontSize: 11, color: 'var(--muted)', lineHeight: 1.6,
                borderTop: '1px solid var(--border)', paddingTop: 8,
              }}>{item.pipeline}</div>
            </div>
          ))}
        </div>

        <SubTitle>How data engineers handle unstructured data</SubTitle>

        <Para>
          A data engineer's relationship with unstructured data has three distinct
          responsibilities, each requiring different skills and tools.
        </Para>

        <CodeBox label="The three DE responsibilities with unstructured data">{`RESPONSIBILITY 1: Store and Organise
  Unstructured data must be stored in object storage (S3, ADLS, GCS)
  with a clear organisation scheme so it can be found and processed.

  Bad:  s3://company-data/uploads/file1.jpg
  Good: s3://company-data/raw/product-images/category=electronics/
          sku=SKU-00283741/2026-03-17/image_001.jpg

  Good organisation includes:
    → Meaningful key prefix (not random UUIDs)
    → Partition by date for time-range access
    → Partition by category/type for selective processing
    → Consistent naming convention

RESPONSIBILITY 2: Extract Metadata
  Even before ML processing, extract the metadata that IS structured:

  For images:    file_size, format (JPEG/PNG), dimensions (width×height),
                 creation_date, source_system, associated_entity_id
  For audio:     file_size, format (MP3/WAV), duration_seconds, sample_rate,
                 call_id, agent_id, customer_id, call_timestamp
  For documents: file_size, page_count, creation_date, author (if available),
                 document_type, associated_case_id

  This metadata is structured and immediately useful for filtering,
  capacity planning, and processing queue management.

RESPONSIBILITY 3: Build Processing Pipelines
  Orchestrate the ML models or transformation tools that convert
  unstructured content into structured signals.

  Image pipeline:
    Raw image → resize/normalise → ML model → structured output
    {sku: "SKU-283741", category: "electronics", has_watermark: false,
     background: "white", product_visible: true, quality_score: 0.94}

  Customer review pipeline:
    Raw text → clean/normalise → NLP model → structured output
    {review_id: 8734, sentiment: "negative", score: 0.23,
     topics: ["delivery", "packaging"], entities: ["Seattle"],
     urgency: "high", requires_response: true}

  Call recording pipeline:
    Audio file → speech-to-text → transcript → NLP → structured output
    {call_id: "CALL-83921", duration_secs: 247, transcript: "...",
     sentiment_overall: "frustrated", resolution: "refund_initiated",
     agent_empathy_score: 0.78}`}</CodeBox>

        <SubTitle>The data lakehouse for unstructured data</SubTitle>

        <Para>
          Unstructured data cannot live in a data warehouse — warehouses store tables,
          not images or audio files. Object storage (S3, ADLS, GCS) is the only viable
          storage at scale for unstructured data. The data engineer's job is to build
          a metadata layer that makes the unstructured data discoverable and processable
          alongside the structured and semi-structured data.
        </Para>

        <Para>
          The practical pattern: store raw unstructured data in object storage, extract
          metadata into a structured table, and store ML model outputs as structured
          data in the warehouse. The warehouse contains the derived structured signals;
          the raw unstructured data lives in the lake. Analysts query the warehouse;
          ML engineers query the lake directly.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 — Side-by-Side Comparison ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Direct Comparison" />
        <SectionTitle>All Three Categories — The Complete Comparison</SectionTitle>

        <div style={{ overflowX: 'auto', marginBottom: 28 }}>
          <table style={{
            width: '100%', borderCollapse: 'collapse',
            fontSize: 13, lineHeight: 1.6,
          }}>
            <thead>
              <tr>
                <th style={{
                  padding: '10px 16px', textAlign: 'left',
                  fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
                  textTransform: 'uppercase', color: 'var(--muted)',
                  fontFamily: 'var(--font-mono)',
                  borderBottom: '1px solid var(--border)',
                  background: 'var(--bg2)',
                  minWidth: 140,
                }}>Dimension</th>
                {[
                  { label: 'Structured', color: '#00e676' },
                  { label: 'Semi-Structured', color: '#7b61ff' },
                  { label: 'Unstructured', color: '#f97316' },
                ].map((col) => (
                  <th key={col.label} style={{
                    padding: '10px 16px', textAlign: 'left',
                    fontSize: 11, fontWeight: 800, color: col.color,
                    fontFamily: 'var(--font-mono)', letterSpacing: '.06em',
                    borderBottom: `2px solid ${col.color}`,
                    background: `${col.color}08`,
                    minWidth: 180,
                  }}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  dimension: 'Schema',
                  structured: 'Fixed, enforced by external system',
                  semi: 'Self-describing, flexible — carried within the data',
                  unstructured: 'None — no inherent organisation',
                },
                {
                  dimension: 'Examples',
                  structured: 'SQL tables, CSV with headers, Excel',
                  semi: 'JSON, XML, Avro, Parquet, log files',
                  unstructured: 'Images, audio, video, free text, PDFs, emails',
                },
                {
                  dimension: 'Primary storage',
                  structured: 'Relational DB, Data Warehouse',
                  semi: 'Object store (S3/ADLS) + document store',
                  unstructured: 'Object store only (S3/ADLS/GCS)',
                },
                {
                  dimension: 'Query method',
                  structured: 'SQL',
                  semi: 'SQL + JSON functions',
                  unstructured: 'ML models only — cannot SQL-query raw pixels',
                },
                {
                  dimension: 'Schema change',
                  structured: 'Hard — breaks pipelines',
                  semi: 'Flexible — new fields just appear',
                  unstructured: 'N/A — no schema to change',
                },
                {
                  dimension: 'Best for',
                  structured: 'Transactional data, reporting, analytics',
                  semi: 'Events, APIs, configs, logs, hierarchical data',
                  unstructured: 'Content, media, documents, sensor raw streams',
                },
                {
                  dimension: 'Transformation',
                  structured: 'SQL CTEs, dbt models',
                  semi: 'Flatten, explode, parse, normalise',
                  unstructured: 'OCR, speech-to-text, image classification, NLP, embedding',
                },
                {
                  dimension: 'Warehouse ready?',
                  structured: 'Yes — native table storage',
                  semi: 'Needs flattening first',
                  unstructured: 'No — store outputs of ML processing',
                },
                {
                  dimension: 'Compression',
                  structured: 'Moderate (columnar storage 5–10×)',
                  semi: 'Very high (repetitive keys compress well)',
                  unstructured: 'Format-dependent (images: 10–20×, audio: 5–10×)',
                },
                {
                  dimension: 'Pipeline failures',
                  structured: 'Schema drift, type mismatches, NULL propagation',
                  semi: 'Missing fields, type changes, array explosion',
                  unstructured: 'Model drift, storage costs, processing time',
                },
              ].map((row, i) => (
                <tr key={row.dimension} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--bg2)' }}>
                  <td style={{
                    padding: '10px 16px', fontWeight: 700,
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    color: 'var(--muted)', letterSpacing: '.06em',
                    borderBottom: '1px solid var(--border)',
                  }}>{row.dimension}</td>
                  {[
                    { val: row.structured, color: '#00e676' },
                    { val: row.semi, color: '#7b61ff' },
                    { val: row.unstructured, color: '#f97316' },
                  ].map((cell) => (
                    <td key={cell.color} style={{
                      padding: '10px 16px', fontSize: 13,
                      color: 'var(--text)', lineHeight: 1.6,
                      borderBottom: '1px solid var(--border)',
                      borderLeft: `2px solid ${cell.color}20`,
                    }}>{cell.val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Divider />

      {/* ── Part 06 — Storage Implications ───────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Storage Decisions" />
        <SectionTitle>Storage Implications — Which Category Goes Where</SectionTitle>

        <Para>
          The category of data determines which storage system is appropriate. Choosing
          the wrong storage for a data category does not cause an immediate error —
          you can technically store anything anywhere. But the wrong choice creates
          query performance problems, cost inefficiencies, and maintenance nightmares
          that compound over months and years.
        </Para>

        {[
          {
            storage: 'Relational Databases',
            color: '#00e676',
            best: 'Structured data for operational workloads',
            works: 'Small semi-structured data (PostgreSQL supports JSONB columns)',
            avoid: 'Large semi-structured data, unstructured data, analytics at scale',
            why: 'Relational databases are optimised for fast individual record access with ACID transactions. They enforce schema. They handle thousands of concurrent writes. They are not designed for scanning millions of rows for analytics or storing large binary files.',
          },
          {
            storage: 'Data Warehouses (Snowflake, BigQuery, Redshift)',
            color: '#7b61ff',
            best: 'Structured data for analytics, flattened semi-structured data',
            works: 'JSON/semi-structured data stored in VARIANT/JSON columns with JSON functions',
            avoid: 'Raw unstructured data (images, audio), extremely high-cardinality semi-structured with frequent schema changes',
            why: 'Warehouses are columnar SQL engines. They excel at scanning millions of structured rows. Modern warehouses (Snowflake VARIANT, BigQuery JSON) handle semi-structured data well with JSON-aware functions. They cannot store or query binary files meaningfully.',
          },
          {
            storage: 'Object Storage (S3, ADLS, GCS)',
            color: '#f97316',
            best: 'All three categories at scale — the universal storage layer',
            works: 'Everything from raw CSV to Parquet to images to audio to video',
            avoid: 'Low-latency random access (millisecond response queries)',
            why: 'Object storage is cheap, infinite, and accepts any format. It is the foundation of the modern data lake. With table formats (Delta Lake, Iceberg) on top, it handles structured and semi-structured data with ACID semantics. For unstructured data it is the only viable option at scale.',
          },
          {
            storage: 'Document Databases (MongoDB, Firestore, DynamoDB)',
            color: '#facc15',
            best: 'Semi-structured data for operational workloads with flexible schemas',
            works: 'Product catalogues (variable attributes per product), user profiles, CMS content',
            avoid: 'Analytics and reporting (no native SQL aggregations), strongly relational data, large files',
            why: 'Document databases store JSON documents natively. Each document can have a different structure. Fast for reading and writing individual documents. Not designed for cross-document aggregations that analytics requires. Often serve as source systems that data engineers ingest from.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, overflow: 'hidden', marginBottom: 16,
          }}>
            <div style={{ height: 3, background: item.color, opacity: 0.8 }} />
            <div style={{ padding: '20px 24px' }}>
              <div style={{
                fontSize: 14, fontWeight: 800, color: item.color,
                fontFamily: 'var(--font-display)', marginBottom: 12,
              }}>{item.storage}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 12 }}>
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: '#00e676',
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>Best for</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{item.best}</div>
                </div>
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: '#facc15',
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>Also works</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{item.works}</div>
                </div>
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: '#ff4757',
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>Avoid for</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{item.avoid}</div>
                </div>
              </div>
              <div style={{
                fontSize: 12, color: 'var(--muted)', lineHeight: 1.7,
                borderTop: '1px solid var(--border)', paddingTop: 12,
                fontStyle: 'italic',
              }}>{item.why}</div>
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 07 — Real Company Examples ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Real World Examples" />
        <SectionTitle>How Indian Companies Handle All Three Types</SectionTitle>

        <Para>
          Every major Indian tech company deals with all three data categories
          simultaneously. Here is what that looks like in practice at three
          different types of organisations.
        </Para>

        {[
          {
            company: 'Amazon — E-commerce',
            color: '#f97316',
            structured: [
              'Orders table: order_id, customer_id, product_id, quantity, price, status, created_at',
              'Inventory table: sku, warehouse_id, quantity_available, reorder_threshold',
              'Pricing table: sku, price, discount_pct, valid_from, valid_to',
              'Seller settlements: seller_id, settlement_amount, bank_account, settlement_date',
            ],
            semi: [
              'Product catalogue: JSON documents with variable attributes per category (electronics have RAM/storage, clothing has size/color/fabric)',
              'User behaviour events: JSON events from the app (page_viewed, product_clicked, add_to_cart, search_query)',
              'Seller API responses: JSON from third-party seller systems with inconsistent schemas',
              'Search logs: semi-structured text with query, results, and click data',
            ],
            unstructured: [
              'Product images: 100M+ SKU images stored in S3, classified by ML models for search ranking',
              'Customer review text: free-text reviews, NLP models extract sentiment and topic',
              'Seller onboarding documents: PDFs of GST certificates, PAN cards — OCR extracts structured fields',
            ],
          },
          {
            company: 'Venmo — Fintech',
            color: '#7b61ff',
            structured: [
              'Transaction table: txn_id, sender_id, receiver_id, amount, type, status, timestamp',
              'UPI mandate table: mandate_id, customer_id, merchant_id, amount_limit, frequency',
              'Settlement table: settlement_id, bank_id, amount, settlement_time, status',
              'Fraud labels: txn_id, is_fraud, fraud_type, reviewed_by, review_timestamp',
            ],
            semi: [
              'Transaction metadata: JSON blob with payment rail details, device fingerprint, session context',
              'Bank API responses: JSON responses from 200+ bank APIs, each with slightly different schema',
              'Push notification events: JSON events tracking delivery, opens, clicks per notification',
              'Compliance logs: structured + semi-structured audit trail of every system action',
            ],
            unstructured: [
              'Video KYC recordings: stored in S3, ML models verify liveness and identity document authenticity',
              'Customer support call recordings: speech-to-text, then NLP for intent classification and resolution tagging',
              'Dispute document uploads: images and PDFs of transaction receipts for chargeback handling',
            ],
          },
          {
            company: 'Apollo Hospitals — Healthcare',
            color: '#00e676',
            structured: [
              'Patient table: patient_id, name, DOB, blood_group, allergies, primary_doctor_id',
              'Appointment table: appointment_id, patient_id, doctor_id, scheduled_at, status',
              'Billing table: bill_id, patient_id, total_amount, insurance_claimed, paid_amount',
              'Lab results table: result_id, patient_id, test_type, value, unit, reference_range, abnormal_flag',
            ],
            semi: [
              'EHR (Electronic Health Records): HL7 FHIR format — XML/JSON documents with nested clinical observations',
              'Prescription data: semi-structured drug names, dosages, and instructions — inconsistent across doctors',
              'Medical device outputs: JSON streams from monitoring equipment (ECG, blood pressure monitors)',
            ],
            unstructured: [
              'X-rays and MRI scans: DICOM format images, AI models assist in radiology interpretation',
              'Doctor notes: free-text clinical notes, NLP extracts diagnoses, medications, and procedures for coding',
              'Pathology report PDFs: scanned and digital, OCR extracts test results into structured records',
            ],
          },
        ].map((company) => (
          <div key={company.company} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, overflow: 'hidden', marginBottom: 20,
          }}>
            <div style={{ height: 3, background: company.color }} />
            <div style={{ padding: '20px 24px' }}>
              <div style={{
                fontSize: 14, fontWeight: 800, color: company.color,
                fontFamily: 'var(--font-display)', marginBottom: 16,
              }}>{company.company}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                {[
                  { label: 'Structured', color: '#00e676', items: company.structured },
                  { label: 'Semi-Structured', color: '#7b61ff', items: company.semi },
                  { label: 'Unstructured', color: '#f97316', items: company.unstructured },
                ].map((cat) => (
                  <div key={cat.label}>
                    <div style={{
                      fontSize: 10, fontWeight: 700, color: cat.color,
                      fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                      textTransform: 'uppercase', marginBottom: 8,
                    }}>{cat.label}</div>
                    {cat.items.map((item, i) => (
                      <div key={i} style={{
                        fontSize: 12, color: 'var(--muted)', lineHeight: 1.6,
                        marginBottom: 6, paddingLeft: 10,
                        borderLeft: `2px solid ${cat.color}40`,
                      }}>{item}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
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
        <SectionTitle>Designing a Pipeline That Handles All Three Types at Once</SectionTitle>

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
            Scenario — Insurance Tech Startup · New Data Pipeline Task
          </div>

          <Para>
            Your manager gives you a task: "Build a pipeline that ingests all data
            from our new claim processing workflow and makes it available for
            analysis. The workflow generates a claim record in PostgreSQL, a
            JSON event payload from the mobile app, and a scanned PDF of the
            supporting document."
          </Para>

          <Para>
            One business process, three data types. Here is how you approach it.
          </Para>

          <Para>
            <strong>Step 1 — Classify each source:</strong> The PostgreSQL claim
            record is structured — fixed schema, enforced types, reliable. The
            JSON event from the app is semi-structured — self-describing but
            potentially inconsistent across app versions. The scanned PDF is
            unstructured — binary content requiring OCR before any fields
            can be extracted.
          </Para>

          <Para>
            <strong>Step 2 — Design separate ingestion paths for each type:</strong>
            The PostgreSQL record goes through standard incremental SQL extraction
            into the Bronze layer as Parquet. The JSON event goes through a
            Kafka consumer that reads the event stream and lands raw JSON files in
            the Bronze layer. The PDF goes through an S3 PUT event trigger that
            fires an OCR pipeline when a new document is uploaded.
          </Para>

          <Para>
            <strong>Step 3 — Design converging transformation:</strong> In the
            Silver layer, all three inputs transform into structured tables.
            The PostgreSQL data cleans directly into a claims_silver table.
            The JSON event is flattened — claim_id, device_type, app_version,
            GPS coordinates, timestamp — into a claim_events_silver table.
            The OCR output extracts document_type, issue_date, insured_name,
            and document_verified flag into a claim_documents_silver table.
          </Para>

          <Para>
            <strong>Step 4 — Join in Gold:</strong> A single Gold table joins
            all three Silver tables on claim_id, giving analysts one row per
            claim with all structured fields from all three sources.
            The raw PDF is linked via a URL column pointing to S3 for
            auditors who need to view the original document.
          </Para>

          <Para>
            <strong>The lesson:</strong> A data engineer who only knows one data
            type is blocked at step one. A data engineer who understands all
            three can design the architecture, identify the tools needed for
            each path, and deliver a unified output that hides the complexity
            from the analyst who just sees a clean SQL table.
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
            q: 'Q1. What is the difference between structured and semi-structured data? Give an example of each from a real application.',
            a: `Structured data has a fixed, predefined schema enforced by an external system. Every record has the same fields in the same positions with the same types. Nothing can be stored that violates the schema — the system rejects it. A relational database table is the canonical example: a PostgreSQL orders table defines exactly which columns exist and their types. Every row must conform.

Semi-structured data is self-describing — the structure is carried within the data itself rather than enforced externally. Fields can be added, removed, or changed without a schema migration. The data is organised but not uniformly so. A JSON event payload from a mobile app is a clear example: the app might include a promo_code field when a promo was applied and omit it entirely when there was none. The JSON still parses correctly in both cases.

From a Stripe context: the transaction table in their operational database is structured — txn_id, sender_id, amount, status, timestamp are fixed columns enforced by the database. The transaction_metadata field stored alongside it is semi-structured — a JSON blob containing the payment rail details, device fingerprint, and UPI reference that varies by transaction type and changes as new payment methods are added. Both coexist in the same system serving different needs.`,
          },
          {
            q: 'Q2. You receive a JSON file from a vendor where some records have a nested address object and some records have the address fields at the top level. How do you handle this?',
            a: `This is a schema inconsistency problem — two different record layouts in the same dataset — and it needs to be handled explicitly at the ingestion or transformation stage rather than assumed away.

My first step is to understand the scope: how many records have each format? If 95% have one format and 5% have another, the minority format is likely a legacy format from an older API version. I would confirm with the vendor whether the inconsistency is intentional (transitioning between formats) or a bug on their end.

For the transformation logic, I write code that checks which format each record uses and normalises both to the same structure. In Python:

city = record.get('address', {}).get('city') or record.get('city')

This uses the nested path first, falls back to the flat path if the nested structure is absent. In SQL (Snowflake):

COALESCE(JSON_EXTRACT_SCALAR(payload, '$.address.city'), JSON_EXTRACT_SCALAR(payload, '$.city'))

I also add a validation check that flags records where neither path resolves to a non-null value — those are records with genuinely missing city data that need to be investigated separately.

Long term, I document this dual-format handling and include it in the data contract with the vendor, requesting they standardise to one format. The normalisation logic becomes a maintenance liability if it persists indefinitely.`,
          },
          {
            q: 'Q3. How would you approach building a pipeline to process customer reviews (free text) and make the sentiment available for analysis?',
            a: `This is an unstructured-to-structured pipeline — raw text as input, structured sentiment scores as output. I would design it in three stages.

Stage one is ingestion and storage. Customer reviews come from the product database as raw text strings. I ingest them into the Bronze layer as-is, along with the structured metadata I already have: review_id, product_id, customer_id, rating (1–5 stars), timestamp, and language. The raw text is stored alongside its structured context.

Stage two is processing. I build a processing pipeline that reads unreviewed records from Bronze, runs them through a sentiment model — either a pre-trained model like a fine-tuned BERT variant for product reviews, or the OpenAI API for simpler use cases — and produces structured output per review: sentiment_label (positive/neutral/negative), sentiment_score (0–1 continuous), primary_topic (delivery/product_quality/customer_service/pricing extracted by topic modelling), and language_detected.

Stage three is storage in Silver and Gold. The structured model output joins with the original structured metadata in the Silver layer: one row per review with all fields. In the Gold layer, I aggregate: daily sentiment scores per product category, weekly trending topics, sentiment correlation with star rating to validate model quality, and alert thresholds for sudden sentiment drops on a product.

The key engineering decisions are: how to handle the processing cost (run in batch nightly rather than in real-time unless live monitoring is needed), how to version the model so re-processing with a new model is possible, and how to handle multilingual reviews (Tamil, Hindi, Kannada alongside English) which may require different model versions.`,
          },
          {
            q: 'Q4. A new column is added to a source database table without notifying the data team. How does this break your pipeline and how do you prevent it?',
            a: `The impact of an unannounced schema change depends entirely on how the ingestion was designed.

If the ingestion uses SELECT * to read all columns and writes everything to a schema-on-read destination like S3 Parquet or a Snowflake VARIANT column, the new column appears automatically in new data without breaking anything. This is the most resilient approach for sources that change frequently.

If the ingestion uses an explicit column list — SELECT order_id, customer_id, amount, status FROM orders — the new column is silently ignored. No error, no data, just a missing field. This is the most common form of silent data loss in structured ingestion pipelines.

If the ingestion writes to a strict destination schema (a relational database with defined columns) and the source schema does not match the destination, the pipeline either fails with a column mismatch error or succeeds but drops the new column depending on the tool configuration.

Prevention requires two mechanisms. First, schema comparison monitoring: on each pipeline run, compare the source schema against the last known schema and alert when they differ. This can be as simple as storing the column list from the previous run and comparing it to the current run. Tools like Great Expectations support schema validation natively.

Second, a data contract with the source team: any schema change to a table that data engineering ingests must be communicated and reviewed before deployment. This is a process control, not a technical one, but it is the most effective prevention because it catches changes before they reach production.`,
          },
          {
            q: 'Q5. What is JSON flattening and when would you choose NOT to flatten a nested JSON field?',
            a: `JSON flattening is the process of converting a hierarchical nested JSON structure into a flat relational table structure — extracting nested fields into their own columns so analysts can query them with simple SQL without using JSON functions.

For example, a customer.address.city nested field gets flattened into a top-level city column. An items array containing multiple items gets exploded into multiple rows — one per item — joined to the parent order via order_id. The result is a structure that looks like a traditional relational table and can be queried with basic SQL.

I would choose not to flatten in four situations.

First, when the nested structure is deeply hierarchical and rarely queried. If a JSON payload contains a nested configuration object accessed only by one report per quarter, flattening it into 30 columns that are mostly NULL adds schema clutter without proportionate analytical value. Keep it as a JSON column, accessible to those who need it via JSON functions.

Second, when the schema changes frequently. If a vendor changes their JSON structure every few weeks, maintaining a flattening transformation that tracks every change is expensive. Storing as JSON and letting analysts access fields they need with JSON_EXTRACT is more resilient.

Third, when the array explosion multiplies rows in a way that distorts aggregations. If an order has 20 items and you explode into item rows, any aggregation at the order level requires de-duplication or GROUP BY. Keeping the items array as a JSON column and using UNNEST only when needed prevents this distortion in the main orders table.

Fourth, when storage cost of the repeated keys is a concern. JSON stores keys with every record. At very high scale, the repeated key names in JSON use significant storage. But at most companies this is not a primary concern compared to query convenience.`,
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
            error: `KeyError: 'promo_code' — when processing JSON events from the mobile app`,
            cause: 'The code accesses a JSON field with direct key syntax: event["promo_code"]. This works for events where the key exists but raises a KeyError for events where promo_code was never included in the payload — because the order had no promo applied. Semi-structured data allows optional fields; direct key access assumes all fields are always present.',
            fix: 'Use .get() with a default: event.get("promo_code") returns None if the key is absent instead of raising an error. For nested fields: event.get("customer", {}).get("address", {}).get("city"). In SQL: use JSON_EXTRACT_SCALAR with COALESCE to handle missing keys. Document which fields are always present (required) and which are optional in your pipeline specification.',
          },
          {
            error: `PySpark AnalysisException: cannot resolve 'items' given input columns — after exploding a JSON array`,
            cause: 'The column name used in the explode() call does not match the actual field name in the JSON schema after parsing. This happens when JSON keys use camelCase (orderItems) but the code expects snake_case (order_items), or when the JSON structure was nested differently than expected and the array is inside another object.',
            fix: 'Print the schema of the parsed DataFrame before writing transformation code: df.printSchema(). This shows the exact field names and nesting as Spark sees them. Match your column references exactly to this schema. If the schema varies between records, use schema inference with a sample of records and validate the result before processing the full dataset.',
          },
          {
            error: `ValueError: could not convert string to float: 'N/A' — when processing a CSV from a vendor`,
            cause: 'The vendor uses "N/A" as their null indicator instead of an empty field. When Pandas or Spark tries to cast the amount column to float, "N/A" is not a valid float representation. This is a CSV format irregularity — the vendor did not follow the convention of leaving the field empty for null values.',
            fix: `Specify the null value indicator when reading the CSV: pd.read_csv("file.csv", na_values=["N/A", "NULL", "null", "-", "n/a"]). In Spark: spark.read.option("nullValue", "N/A").csv("path"). Investigate all the null representations the vendor uses (ask them, or inspect a sample of the file) and include all of them in the na_values list. Validate after loading that null percentages are within expected ranges.`,
          },
          {
            error: `Pipeline produces 3× more rows than expected after joining orders to product_catalogue`,
            cause: 'The product catalogue is stored as a JSON document store (MongoDB) where each product has multiple variant documents — size S, M, L of the same SKU each have their own document. When joined to orders on product_id, each order row matches three catalogue rows, tripling the output. This is a fan-out join caused by not understanding the cardinality of the semi-structured source.',
            fix: 'Always check the cardinality of your join keys before writing a JOIN in a pipeline. Run SELECT product_id, COUNT(*) FROM product_catalogue GROUP BY product_id HAVING COUNT(*) > 1 to identify multi-row keys. For this case: pre-aggregate the catalogue to one row per product_id (selecting the active or default variant) before joining to orders. Or join on a more specific key (product_id + variant_id) if that data is available in the orders table.',
          },
          {
            error: `OCR pipeline extracts garbled text from scanned PDFs — characters appear as symbols or wrong letters`,
            cause: 'The scanned PDFs have low resolution (below 150 DPI), were scanned at an angle, or contain printed fonts that the OCR engine was not trained on. OCR (Optical Character Recognition) quality degrades significantly with image quality — a 72 DPI mobile phone photo of a document produces far worse results than a 300 DPI flatbed scanner output.',
            fix: 'Add image pre-processing before OCR: deskew the image (correct rotation), enhance contrast, upscale to 300 DPI if below threshold. Use image quality scoring to reject documents that are below a confidence threshold and route them to manual review rather than storing garbled text as if it were reliable data. Log the OCR confidence score alongside the extracted text so downstream consumers know the reliability of the data.',
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
            }}>
              {item.error}
            </div>
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
        'Every data source belongs to one of three categories: Structured (fixed schema, enforced), Semi-Structured (self-describing, flexible), or Unstructured (no schema, requires interpretation). Identifying the category immediately tells you which tools, storage systems, and transformation approaches to use.',
        'Structured data has a rigid schema enforced externally — relational databases, CSVs with headers. It is easy to query with SQL but breaks pipelines when the schema changes. Always monitor source schema and handle changes explicitly.',
        'CSV looks structured but is not enforced — nothing prevents wrong column counts, wrong types, or inconsistent null representations. Always validate CSV structure before processing. Never assume vendor CSVs are well-formed.',
        'Semi-structured data is self-describing — JSON, XML, Avro, log files. Its strength is flexibility; its risk is that the structure can change at any time without warning. Use .get() with defaults in Python, COALESCE in SQL, and always validate schema against expectations.',
        'JSON arrays must be explicitly exploded (one row per array element) when relational representation is needed. Always check join cardinality before exploding — unexpected fan-out multiplies rows and corrupts aggregations.',
        'Unstructured data (images, audio, video, free text, PDFs) has no queryable schema. Data engineers store it in object storage, extract available metadata as structured fields, and build processing pipelines that use ML models to produce structured outputs.',
        'The correct storage for each category: structured data for analytics goes to data warehouses; semi-structured and all raw data goes to object storage (S3/ADLS); operational structured data goes to relational databases; unstructured data always goes to object storage.',
        'The flattening decision for nested JSON: flatten frequently-queried fields into columns, keep rarely-accessed deep nesting as JSON columns. Flatten too much and schema maintenance becomes burdensome. Flatten too little and analysts cannot query data without JSON functions.',
        'Schema change monitoring is mandatory for structured and semi-structured sources. Compare source schema against the last known schema on every pipeline run. Alert when they differ. Never let a schema change silently drop data.',
        'Real companies handle all three data types simultaneously. Amazon has structured order tables, semi-structured product catalogue JSON, and unstructured product images — all flowing through different pipeline paths that converge in the Gold layer. A data engineer must be fluent in all three.',
      ]} />

    </LearnLayout>
  )
}