import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'ETL vs ELT — History, Difference, When to Use Each — Data Engineering | Chaduvuko',
  description:
    'Why ETL dominated for 30 years, why ELT replaced it, the real technical differences between them, when each still belongs in a modern stack, and the tools each pattern uses.',
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

export default function ETLvsELTModule() {
  return (
    <LearnLayout
      title="ETL vs ELT — History, Difference, When to Use Each"
      description="Why ETL dominated for 30 years, why ELT replaced it, and when each still belongs in a modern stack."
      section="Data Engineering"
      readTime="50 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — Why This Distinction Matters ───────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why This Distinction Still Matters" />
        <SectionTitle>ETL vs ELT — More Than a Letter Swap</SectionTitle>

        <Para>
          The difference between ETL and ELT is not which letters appear in what
          order. It is a fundamental difference in where transformation logic lives,
          who can see and change it, what happens to the raw data, how the pipeline
          fails, and what tools are used to build and maintain it. Two teams that
          choose different patterns for the same data problem end up with architectures
          that look and behave completely differently five years later.
        </Para>

        <Para>
          Understanding this distinction deeply matters for three reasons. First, you
          will be asked about it in every data engineering interview. Second, you will
          inherit codebases built on both patterns and need to extend them intelligently.
          Third, you will make the choice yourself for new projects and the decision
          will compound in importance as the platform scales.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 16,
          }}>
            The one-sentence distinction
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ borderLeft: '3px solid #00e676', paddingLeft: 16 }}>
              <div style={{
                fontSize: 12, fontWeight: 700, color: '#00e676',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase', marginBottom: 6,
              }}>ETL</div>
              <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, marginBottom: 6 }}>
                Transform <strong>before</strong> loading — the pipeline shapes and cleans data
                in a processing engine, then writes ready-to-use data to the destination.
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic' }}>
                The destination only ever sees clean, typed, validated data.
              </div>
            </div>
            <div style={{ borderLeft: '3px solid #7b61ff', paddingLeft: 16 }}>
              <div style={{
                fontSize: 12, fontWeight: 700, color: '#7b61ff',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase', marginBottom: 6,
              }}>ELT</div>
              <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, marginBottom: 6 }}>
                Load <strong>before</strong> transforming — raw data lands in the destination first,
                then SQL/dbt transforms it in place inside the warehouse or lake.
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic' }}>
                The destination holds both raw and transformed data. Raw is always preserved.
              </div>
            </div>
          </div>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 02 — History ─────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — History" />
        <SectionTitle>Why ETL Dominated for 30 Years — And Why It No Longer Does</SectionTitle>

        <Para>
          ETL was not a design choice — it was a constraint. Understanding the
          constraint explains everything about why ETL looks the way it does and
          why ELT became possible only when specific infrastructure conditions changed.
        </Para>

        <SubTitle>The 1990s–2000s: storage was expensive, compute was centralised</SubTitle>

        <CodeBox label="The economic constraint that created ETL">{`ECONOMIC REALITY OF DATA WAREHOUSING IN 2000:

  On-premises warehouse hardware (Teradata, IBM Netezza, Oracle Exadata):
    Storage cost: $5,000 – $50,000 per terabyte
    Typical warehouse: 5–20 TB = $25,000 – $1,000,000 just for storage
    Hardware refresh: every 3–5 years, another $millions

  CONSEQUENCE: warehouse storage was precious
    You could NOT afford to store raw, unprocessed data in the warehouse.
    Every byte had to earn its place. Only clean, modelled, business-ready
    data was allowed through the warehouse door.

  THEREFORE: transformation MUST happen before loading (ETL)
    Extract from source systems (nightly, during off-peak hours)
    Transform on a separate processing server (ETL server)
      → clean, type, deduplicate, join, validate
      → discard raw data after transformation
    Load ONLY the clean data into the warehouse
      → warehouse stores only modelled, compressed, valuable data

  ETL tools of the era:
    IBM DataStage, Informatica PowerCenter, Oracle Data Integrator,
    Microsoft SSIS (SQL Server Integration Services), Talend
    → GUI-based, proprietary, $100k+ enterprise licences
    → Each transformation step configured in drag-and-drop interfaces
    → Version control was difficult; collaboration was harder
    → "ETL developers" were a separate job title from software engineers`}</CodeBox>

        <SubTitle>The 2010s: cloud storage changed the economics entirely</SubTitle>

        <CodeBox label="The infrastructure shift that made ELT possible">{`WHAT CHANGED IN THE 2010s:

  Amazon S3 launched 2006:
    Storage cost: $0.023 per GB per month ($23 per TB)
    Compare to on-premises warehouse hardware: $5,000–$50,000/TB
    Reduction: 99.5% cheaper
    → Suddenly affordable to store ALL raw data indefinitely

  Cloud data warehouses (Redshift 2012, BigQuery 2012, Snowflake 2014):
    Separated compute from storage
    Compute: pay-per-query or pay-per-warehouse-minute
    Storage: cheap (Snowflake ~$40/TB/month, BigQuery ~$20/TB/month)
    Massively parallel: 100s of nodes available on demand
    → Warehouse compute was no longer the bottleneck

  CONSEQUENCE: the ETL constraint evaporated
    You CAN afford to store raw data (S3 is nearly free)
    You CAN afford to transform inside the warehouse (cheap on-demand compute)
    You DO NOT need a separate ETL server (warehouse IS the compute engine)

  THEREFORE: transformation can happen AFTER loading (ELT)
    Extract from source and load raw to S3 or warehouse staging
    Transform inside the warehouse with SQL
    → Raw data preserved in S3 forever
    → No separate transformation server
    → SQL replaces GUI-based ETL tools
    → dbt (data build tool, launched 2016) codifies this with SQL + Git

  THE RESULT: ETL tools lost their purpose
    When the warehouse can run SQL on 100 nodes at $0.25/query,
    there is no reason to transform on a separate server first.
    The transformation logic belongs in SQL, in the warehouse, under version control.`}</CodeBox>

        <Para>
          This is not "ETL is dead" — it is "the reason ETL was necessary no longer
          exists for most workloads." ETL tools and patterns still serve specific
          purposes that ELT cannot, which we will cover in Part 05.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 — ETL In Depth ────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — ETL In Depth" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(0,230,118,0.12)', border: '2px solid #00e676',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#00e676',
            fontFamily: 'var(--font-mono)',
          }}>ETL</div>
          <h2 style={{
            fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>ETL — Extract, Transform, Load</h2>
        </div>

        <Para>
          In ETL, the transformation engine sits between the source and the destination.
          Data is extracted from the source, flows through a pipeline that applies
          all transformations, and the output — clean, typed, ready-to-use data —
          is loaded into the destination. The destination never sees the raw data.
        </Para>

        <SubTitle>ETL data flow</SubTitle>

        <CodeBox label="ETL flow — what happens at each stage">{`ETL DATA FLOW:

  SOURCE              ETL ENGINE (Python/Spark/Informatica)    DESTINATION
  ─────────────────────────────────────────────────────────────────────────
  PostgreSQL     →    [Extract]                                Snowflake
  orders table        SELECT * FROM orders                     silver.orders
                      WHERE updated_at > checkpoint

                      [Transform — all in pipeline code]
                      ├── Cast types (string → decimal)
                      ├── Deduplicate (ROW_NUMBER window)
                      ├── Normalise status (lowercase/trim)
                      ├── Join to customers (enrichment)
                      ├── Validate (amount > 0, status in set)
                      ├── Reject invalid rows to DLQ
                      └── Add ingested_at, pipeline_run_id

                      [Load]
                      INSERT INTO silver.orders
                      ON CONFLICT (order_id) DO UPDATE ...

  WHAT THE DESTINATION RECEIVES:
    Typed, validated, deduplicated, enriched rows only.
    Invalid rows never reach the destination.
    Raw source data is never stored in the destination.

  WHAT IS LOST:
    The original raw data is discarded after transformation.
    If a bug was introduced in the transformation:
      → Cannot reprocess raw data from the destination
      → Must re-extract from the source (if still available)
      → Or accept the incorrect data until a correction run

TYPICAL ETL TOOLS AND WHEN USED:
  Python + Pandas/PySpark:  Most common in modern pipelines
  Apache Spark:             Large-scale transformations
  Apache Flink:             Streaming transformations
  Informatica PowerCenter:  Legacy enterprise pipelines
  IBM DataStage:            Legacy enterprise, banking/finance
  Microsoft SSIS:           SQL Server ecosystem
  Talend:                   Open-source ETL alternative
  AWS Glue:                 Serverless Spark ETL on AWS`}</CodeBox>

        <SubTitle>When ETL is genuinely the right choice</SubTitle>

        {[
          {
            scenario: 'PII masking before data reaches any analytical system',
            detail: 'If data contains personal information (SSN numbers, phone numbers, email addresses) that must be masked or hashed before landing in any analytical layer, ETL is required. The raw data cannot be allowed to reach the warehouse — it must be masked in the pipeline before loading. ELT would land the raw PII in the warehouse first, creating a compliance violation.',
            example: 'A healthcare platform hashing patient IDs and masking phone numbers before loading to the analytics warehouse.',
          },
          {
            scenario: 'Complex Python/ML transformations unavailable in SQL',
            detail: 'Some transformations require capabilities that SQL does not provide: running an ML model to classify events, using NLP to extract entities from text, calling a third-party geocoding API to enrich addresses, or applying complex regex-based data parsing. These operations require Python code in the pipeline, not SQL in the warehouse.',
            example: 'Running a sentiment classifier on customer reviews before loading the sentiment scores into the warehouse.',
          },
          {
            scenario: 'Connecting two systems with incompatible schemas',
            detail: 'When integrating two systems where the source schema cannot be loaded into the destination at all without transformation — different column counts, different types, deeply nested JSON that must be flattened before the destination can accept it — ETL is natural. The transformation is structural, not analytical.',
            example: 'Flattening nested XML from a legacy ERP system before loading into a modern warehouse that only accepts tabular data.',
          },
          {
            scenario: 'Strict destination schema with no staging tables allowed',
            detail: 'Some regulated systems (banking core systems, legacy data marts) do not allow staging tables or schema evolution. Every load must be perfectly typed and validated before touching the destination. Sending raw data and transforming later is architecturally impossible.',
            example: 'Loading into a bank\'s core reporting system that has strict schema enforcement and no concept of a staging layer.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 10, padding: '16px 20px', marginBottom: 10,
            borderLeft: '3px solid #00e676',
          }}>
            <div style={{
              fontSize: 13, fontWeight: 800, color: '#00e676',
              fontFamily: 'var(--font-display)', marginBottom: 6,
            }}>{item.scenario}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 6 }}>
              {item.detail}
            </div>
            <div style={{
              fontSize: 12, color: '#00e676', fontStyle: 'italic',
              borderLeft: '2px solid rgba(0,230,118,0.3)', paddingLeft: 8,
            }}>Example: {item.example}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 04 — ELT In Depth ────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — ELT In Depth" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(123,97,255,0.12)', border: '2px solid #7b61ff',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#7b61ff',
            fontFamily: 'var(--font-mono)',
          }}>ELT</div>
          <h2 style={{
            fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>ELT — Extract, Load, Transform</h2>
        </div>

        <Para>
          In ELT, the extraction layer does as little as possible — it reads from the
          source and lands the data in the destination with minimal transformation.
          All meaningful transformation happens inside the destination using SQL,
          typically powered by dbt. The destination holds both the raw staging data
          and the transformed analytical tables.
        </Para>

        <SubTitle>ELT data flow</SubTitle>

        <CodeBox label="ELT flow — what happens at each stage">{`ELT DATA FLOW:

  SOURCE              EL LAYER (thin Python loader)     DESTINATION (warehouse/lake)
  ──────────────────────────────────────────────────────────────────────────────────
  PostgreSQL     →    [Extract]                          Snowflake
  orders table        SELECT * FROM orders               ├── raw.orders      (staging)
                      WHERE updated_at > checkpoint      ├── silver.orders   (cleaned)
                                                         └── gold.daily_rev  (aggregated)
                      [Load — minimal transformation]
                      INSERT INTO raw.orders             ← raw data lands here
                      (just type coercion for load compatibility)

                      ↓  (separate step, runs after load)

  dbt TRANSFORMS INSIDE THE WAREHOUSE:
  ├── silver/orders.sql:
  │     WITH source AS (SELECT * FROM raw.orders),
  │     deduped AS (... ROW_NUMBER ...),
  │     cleaned AS (... LOWER(status), DECIMAL cast, validated ...)
  │     SELECT * FROM cleaned
  │
  ├── gold/daily_revenue.sql:
  │     WITH orders AS (SELECT * FROM silver.orders)
  │     SELECT DATE(created_at), store_id, SUM(amount) ...
  │     FROM orders GROUP BY 1, 2
  │
  └── schema.yml (tests):
        - name: silver_orders
          columns:
            - name: order_id
              tests: [not_null, unique]
            - name: amount
              tests: [{dbt_utils.accepted_range: {min_value: 0}}]

  WHAT IS PRESERVED:
    raw.orders contains the original source data — always.
    If a bug is found in silver.orders 6 months later:
      → dbt run --select silver.orders --full-refresh
      → Reprocess from raw.orders in the same warehouse
      → No re-extraction from source needed

  WHAT THE DESTINATION CONTAINS:
    raw schema:    exact source data, typed minimally for load
    silver schema: cleaned, validated, deduplicated
    gold schema:   aggregated, business-ready metrics`}</CodeBox>

        <SubTitle>Why raw data preservation is ELT's most underappreciated advantage</SubTitle>

        <Para>
          The ability to reprocess from raw data without re-extracting from the
          source is transformative. In ETL, if a bug is discovered in a six-month-old
          transformation and the raw data was discarded, you need the source system
          to provide historical data again — which may be impossible if the source
          has deleted it, changed its schema, or has rate limits that make a six-month
          re-extraction impractical.
        </Para>

        <Para>
          In ELT, the raw data is in your warehouse (or S3). You fix the dbt model,
          run <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>dbt run --full-refresh</code>,
          and six months of correctly-transformed data is available in hours. This
          reprocessing capability compounds in value over time as bugs are inevitably
          discovered.
        </Para>

        <SubTitle>dbt — the tool that operationalises ELT</SubTitle>

        <CodeBox label="dbt — the transformation layer in modern ELT">{`dbt (data build tool) is the standard transformation layer for ELT pipelines.
It takes SQL SELECT statements and manages running them in the right order,
testing the outputs, and generating documentation — all from within the warehouse.

PROJECT STRUCTURE:
  freshmart_dbt/
  ├── models/
  │   ├── staging/         # stg_ models: raw → typed (thin layer)
  │   │   ├── stg_orders.sql
  │   │   └── _sources.yml    # define source tables here
  │   ├── intermediate/    # int_ models: joins, complex logic
  │   │   └── int_orders_with_customer.sql
  │   └── marts/
  │       ├── core/        # dim_ and fct_ models
  │       │   └── fct_orders.sql
  │       └── finance/     # domain-specific Gold models
  │           └── daily_revenue.sql
  ├── tests/
  ├── macros/
  └── dbt_project.yml

A SIMPLE dbt MODEL (models/staging/stg_orders.sql):
  -- Materialised as a table in staging schema
  -- {{ config(materialized='table') }}

  WITH source AS (
      SELECT * FROM {{ source('raw', 'orders') }}
  ),
  renamed AS (
      SELECT
          order_id::BIGINT                  AS order_id,
          customer_id::BIGINT               AS customer_id,
          amount::DECIMAL(10,2)             AS order_amount,
          LOWER(TRIM(status))               AS status,
          created_at::TIMESTAMPTZ           AS created_at
      FROM source
      WHERE order_id IS NOT NULL
  )
  SELECT * FROM renamed

dbt COMMANDS:
  dbt run                    # run all models
  dbt run -s stg_orders      # run one model
  dbt run -s +fct_orders     # run fct_orders and all its ancestors
  dbt test                   # run all data quality tests
  dbt docs generate          # generate documentation
  dbt docs serve             # view documentation in browser

dbt TESTS (schema.yml):
  models:
    - name: stg_orders
      columns:
        - name: order_id
          tests: [not_null, unique]
        - name: order_amount
          tests: [not_null, {dbt_utils.accepted_range: {min_value: 0}}]
        - name: status
          tests:
            - accepted_values:
                values: [placed, confirmed, delivering, delivered, cancelled]

HOW dbt FITS INTO ELT:
  1. Python/Fivetran/Airbyte: Extract + Load raw data to warehouse
  2. dbt: Transform raw → staging → intermediate → Gold (inside warehouse)
  3. BI tools (Metabase, Superset): Query Gold tables
  No separate compute engine. No code outside the warehouse for analytics logic.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Full Comparison ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Complete Comparison" />
        <SectionTitle>ETL vs ELT — Every Dimension</SectionTitle>

        <CompareTable
          headers={[
            { label: 'Dimension' },
            { label: 'ETL', color: '#00e676' },
            { label: 'ELT', color: '#7b61ff' },
          ]}
          keys={['dim', 'etl', 'elt']}
          rows={[
            { dim: 'Where transform happens', etl: 'In a separate processing engine before the destination', elt: 'Inside the destination (warehouse/lake) after loading' },
            { dim: 'Raw data preserved?', etl: 'No — raw data discarded after transformation', elt: 'Yes — raw data always in staging layer' },
            { dim: 'Reprocessing on bug fix', etl: 'Must re-extract from source (may be unavailable)', elt: 'Run dbt --full-refresh from raw already in warehouse' },
            { dim: 'Transformation language', etl: 'Python, Java, Scala, SQL, GUI tools', elt: 'SQL (dbt) — occasionally Python for complex logic' },
            { dim: 'Version control', etl: 'Varies — some GUI tools have poor git integration', elt: 'Native — dbt models are SQL files in git' },
            { dim: 'Testability', etl: 'Unit tests in Python, integration tests hard', elt: 'dbt tests built-in, run automatically in CI' },
            { dim: 'Compute location', etl: 'Separate ETL server/cluster', elt: 'Warehouse itself (Snowflake, BigQuery, Spark)' },
            { dim: 'PII handling', etl: '✓ Can mask/hash before data reaches destination', elt: 'Raw PII lands first — requires separate masking step' },
            { dim: 'Schema flexibility at load', etl: 'Low — must know schema before extraction', elt: 'High — raw lands with minimal schema, transform later' },
            { dim: 'Analyst access to logic', etl: 'Hard — transformation in Python/Java code', elt: 'Easy — transformation in SQL in the warehouse' },
            { dim: 'Suitable for semi-structured', etl: 'Yes — Python handles JSON natively', elt: 'Yes (Snowflake VARIANT, BigQuery JSON) but SQL is awkward for deep nesting' },
            { dim: 'Cost model', etl: 'ETL compute cost + warehouse storage', elt: 'Warehouse compute + storage (one platform)' },
            { dim: 'Best tools (2026)', etl: 'PySpark, Python/Pandas, AWS Glue, Flink', elt: 'dbt + Fivetran/Airbyte, Snowflake, BigQuery' },
            { dim: 'Dominant era', etl: '1990s–2015', elt: '2015–present' },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 06 — The Modern Hybrid ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The Modern Hybrid" />
        <SectionTitle>The Modern Stack — ELT by Default, ETL Where Necessary</SectionTitle>

        <Para>
          The framing of "ETL vs ELT" implies a binary choice. In practice, mature
          data platforms use both, each handling the workloads it is best suited for.
          The modern pattern is ELT by default, with ETL inserted for specific
          transformations that cannot or should not happen inside the warehouse.
        </Para>

        <CodeBox label="Modern hybrid architecture — where ETL and ELT each play">{`MODERN DATA PLATFORM ARCHITECTURE — BOTH PATTERNS IN USE:

  SOURCES
  ─────────────────────────────────────────────────────────────────────────
  PostgreSQL (orders, customers)
  Stripe API (payments)
  ShipFast API (deliveries)
  Internal customer review data (contains PII)
  ML pipeline (model predictions)

  INGESTION LAYER (thin EL — Python scripts / Fivetran / Airbyte)
  ─────────────────────────────────────────────────────────────────────────
  PostgreSQL CDC → raw.orders (EL — no transformation)
  Stripe API  → raw.payments (EL — minimal typing for load)
  ShipFast API  → raw.deliveries (EL — minimal typing for load)

  ETL EXCEPTIONS — Python pipelines that transform BEFORE loading:
  Customer reviews → [Python ETL: mask email, hash user_id, extract sentiment]
                   → raw.reviews (PII-free, sentiment_score added)
  ML predictions   → [Python ETL: parse model output, apply business rules]
                   → raw.risk_scores

  TRANSFORMATION LAYER (dbt — ELT inside Snowflake)
  ─────────────────────────────────────────────────────────────────────────
  raw.orders     → stg_orders (typed, deduplicated)
  raw.payments   → stg_payments (typed, validated)
  raw.deliveries → stg_deliveries (typed, validated)
  raw.reviews    → stg_reviews (already cleaned by ETL)

  stg_orders + stg_customers → int_orders_enriched (join)

  int_orders_enriched → fct_orders (Gold fact table)
  fct_orders          → daily_revenue (Gold aggregate)
  fct_orders          → customer_ltv (Gold aggregate)

  SERVING LAYER
  ─────────────────────────────────────────────────────────────────────────
  Metabase / Power BI → queries Gold tables in Snowflake
  FastAPI / GraphQL   → queries Silver tables for product features
  ML training         → reads raw.* tables in S3 directly (Spark)


DECISION RULE: ELT or ETL for each source?
  Ask: can the raw data touch the warehouse safely?
    Yes (no PII, no compliance issue, schema is loadable): ELT
    No (PII masking needed, complex Python transform, incompatible schema): ETL`}</CodeBox>

        <SubTitle>Commercial ELT tools — Fivetran, Airbyte, and the data movement layer</SubTitle>

        <Para>
          The EL part of ELT — the extraction and loading of raw data into the
          warehouse — has been largely commoditised by managed connector tools.
          These tools pre-build and maintain connectors to hundreds of data sources,
          handling authentication, pagination, incremental extraction, and schema
          evolution automatically.
        </Para>

        <CompareTable
          headers={[
            { label: 'Tool' },
            { label: 'Type', color: '#00e676' },
            { label: 'Best for', color: '#7b61ff' },
            { label: 'Trade-off', color: '#f97316' },
          ]}
          keys={['tool', 'type', 'best', 'tradeoff']}
          rows={[
            { tool: 'Fivetran', type: 'Managed, fully hosted', best: 'SaaS sources (Salesforce, HubSpot, Stripe, Google Analytics)', tradeoff: 'Expensive ($1/1000 rows in some plans). No customisation of connector logic.' },
            { tool: 'Airbyte', type: 'Open-source + managed cloud', best: 'When you need custom connectors or open-source flexibility', tradeoff: 'Self-hosted option requires Kubernetes management. Cloud version costs money.' },
            { tool: 'Stitch', type: 'Managed, mid-market', best: 'Smaller teams, simpler sources', tradeoff: 'Fewer connectors than Fivetran. Limited transformation options.' },
            { tool: 'dlt (data load tool)', type: 'Python library (open-source)', best: 'Custom API sources where you write the extraction code but want automatic schema management and loading', tradeoff: 'Requires Python code. No UI. More engineering than Fivetran.' },
            { tool: 'Custom Python', type: 'Hand-built', best: 'Sources with unusual auth, pagination, or data structures that managed tools cannot handle', tradeoff: 'Full maintenance burden — schema changes, auth refresh, pagination bugs are yours to fix.' },
          ]}
        />

        <Callout type="tip">
          <strong>The practical decision:</strong> use Fivetran or Airbyte for any
          source that has a maintained connector and where the cost is justified by
          engineering time saved. Build custom Python EL for proprietary APIs,
          internal databases, and sources where the managed connectors are inadequate.
          Use dbt for 100% of the T in ELT — SQL transformations inside the warehouse.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 — ELT Anti-Patterns ──────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Anti-Patterns" />
        <SectionTitle>ELT Anti-Patterns — Mistakes That Look Like ELT But Are Not</SectionTitle>

        <Para>
          ELT has specific failure modes that appear regularly in teams transitioning
          from ETL. These anti-patterns adopt the form of ELT — raw data in staging,
          dbt transformations — without the substance, producing platforms that are
          fragile despite looking modern.
        </Para>

        {[
          {
            antipattern: 'Transforming in the EL layer (secretly doing ETL)',
            description: 'The Python loader that is supposed to do minimal EL actually applies business logic — filtering rows, computing derived fields, joining to lookups. When this logic has a bug, the raw table does not contain the data needed to debug it. The staging table has already applied incorrect logic to it.',
            fix: 'The EL layer should do only what is necessary for the raw data to be loadable: type coercion for basic load compatibility, adding ingested_at and source metadata, and splitting large files. Never apply business logic in the EL layer. If you find yourself writing WHERE clauses that filter for business reasons, that logic belongs in a dbt model.',
          },
          {
            antipattern: 'Not preserving raw data (half-ELT)',
            description: 'The team uses dbt for transformations but the "raw" table is actually the Silver table — the EL pipeline already cleaned and validated the data before loading. When a bug is found in the transformation logic, there is no raw data to reprocess from. The raw/staging layer exists in name only.',
            fix: 'The raw/staging schema must contain exact source data with minimal transformation. At minimum, every column from the source should be present in raw. Add source metadata columns (ingested_at, pipeline_run_id) but do not remove or alter source columns. The Silver transformation — cleaning, deduplication, business logic — must happen in dbt, not in the loader.',
          },
          {
            antipattern: 'Monolithic dbt models (one 300-line SQL file)',
            description: 'A single dbt model performs extraction logic, joins five tables, applies 20 business rules, and computes three aggregations. When this model fails, it is impossible to determine which step failed. When the logic needs to change, every change risks breaking adjacent logic.',
            fix: 'Apply the single responsibility principle to dbt models. Each model should do one conceptual thing: stg_orders types and validates, int_orders_with_customers joins, fct_orders applies order-level business rules, daily_revenue aggregates. The CTE chain within one model is fine for related steps. Separate models for conceptually separate concerns.',
          },
          {
            antipattern: 'No tests on raw or staging models',
            description: 'Teams add dbt tests on Gold models but skip raw and staging. A bad batch of source data with duplicate primary keys or null required fields flows through staging untested, corrupts the Silver layer, and is detected only when the Gold metric is wrong — after the data has already been used in reports.',
            fix: 'Add tests at every layer. Raw: test that source_id is not null. Staging: test uniqueness on business key, not_null on required fields, accepted_values on categoricals. Silver: test relationship integrity (foreign keys exist). Gold: test value ranges. Test failures at raw or staging are caught before they propagate to Gold.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.2)',
            borderRadius: 10, padding: '18px 20px', marginBottom: 14,
            borderLeft: '3px solid #ff4757',
          }}>
            <div style={{
              fontSize: 13, fontWeight: 800, color: '#ff4757',
              fontFamily: 'var(--font-display)', marginBottom: 8,
            }}>⚠ Anti-pattern: {item.antipattern}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 10 }}>
              {item.description}
            </div>
            <div style={{
              fontSize: 12, color: 'var(--accent)', lineHeight: 1.6,
              borderTop: '1px solid var(--border)', paddingTop: 8,
            }}>
              <strong style={{ color: 'var(--accent)' }}>Fix:</strong> {item.fix}
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
        <SectionTitle>Migrating a Legacy ETL Pipeline to ELT — A Realistic Scenario</SectionTitle>

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
            Scenario — FreshCart · Modernising the data platform
          </div>

          <Para>
            FreshCart's original data platform was built in 2019. It uses a 500-line
            Informatica workflow that extracts from PostgreSQL, applies 40 transformation
            steps in a GUI-based ETL tool, and loads clean data into Redshift. The data
            team hates it: changes require opening the GUI, transformation logic is
            invisible to git, and when a bug is found, re-extraction from PostgreSQL
            takes 8 hours.
          </Para>

          <Para>
            You are asked to migrate this to a modern ELT architecture. Here is the
            approach a senior data engineer uses.
          </Para>

          <Para>
            <strong>Step 1 — Audit the existing ETL transformations.</strong> Export
            the Informatica workflow documentation and categorise every transformation:
          </Para>

          <CodeBox label="Transformation audit — categorise each step for migration">{`TRANSFORMATION AUDIT (from Informatica workflow):

Step 1:  Extract orders from PostgreSQL WHERE updated_at > checkpoint
         → Category: EXTRACTION — keep in Python EL layer

Step 2:  Cast amount from VARCHAR to DECIMAL
         → Category: TYPE CAST — move to stg_orders.sql (dbt staging model)

Step 3:  Lowercase and trim status field
         → Category: NORMALISE — move to stg_orders.sql

Step 4:  Filter rows where status = 'test_order'
         → Category: BUSINESS FILTER — move to stg_orders.sql

Step 5:  Join to customer lookup table for city enrichment
         → Category: ENRICHMENT JOIN — move to int_orders_with_customer.sql

Step 6:  Compute order_tier (high/mid/low) based on amount thresholds
         → Category: BUSINESS RULE — move to fct_orders.sql

Step 7:  Hash customer_phone for privacy
         → Category: PII MASKING — KEEP in ETL (Python), must happen BEFORE load

Step 8:  Compute daily revenue aggregates
         → Category: AGGREGATION — move to gold/daily_revenue.sql

Step 9:  Reject rows with NULL order_id to error file
         → Category: VALIDATION — add dbt test not_null on order_id in staging
                                   add Python DLQ for load-time rejections

Summary:
  8 of 9 steps → ELT (dbt models)
  1 of 9 steps → Stays ETL (PII masking before raw data reaches warehouse)
  This is the typical pattern — most logic migrates to dbt, PII stays in Python`}</CodeBox>

          <Para>
            <strong>Step 2 — Build the EL layer.</strong> Write a thin Python loader
            that extracts from PostgreSQL with incremental watermark, applies the PII
            masking (the one step that must stay ETL), and loads to Snowflake's raw
            schema with no other transformations.
          </Para>

          <Para>
            <strong>Step 3 — Build the dbt models.</strong> Create stg_orders.sql
            (type casting, normalisation, business filter), int_orders_with_customer.sql
            (enrichment join), fct_orders.sql (business rules), and daily_revenue.sql
            (aggregation). Add schema.yml tests at each layer.
          </Para>

          <Para>
            <strong>Step 4 — Run both in parallel and compare outputs.</strong> For
            two weeks, both the old Informatica pipeline and the new ELT pipeline run.
            Daily row counts, SUM(revenue), and a sample of individual rows are
            compared. When the outputs match, the old pipeline is decommissioned.
          </Para>

          <Para>
            <strong>The result after migration:</strong> transformation logic is 8 SQL
            files in git. Any engineer on the team can read, review, and change them.
            CI runs dbt tests on every PR. When a bug is found six months later, it
            is fixed in one SQL file and <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>dbt run --full-refresh</code> reprocesses
            from the preserved raw data in 40 minutes. The 8-hour re-extraction from
            PostgreSQL is gone forever.
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
            q: 'Q1. What is the difference between ETL and ELT and which does the industry prefer in 2026?',
            a: `ETL stands for Extract, Transform, Load. The transformation step happens in a separate processing engine before the data reaches the destination. Raw source data is extracted, shaped and cleaned in a pipeline, and only the transformed output is written to the destination. The destination never sees the raw data.

ELT stands for Extract, Load, Transform. The extraction layer does minimal processing and lands raw data directly in the destination first. The transformation step then runs inside the destination using SQL, typically powered by dbt. The destination holds both the raw staging data and the transformed analytical tables.

The industry strongly prefers ELT for most analytical workloads in 2026, for four reasons. First, modern cloud data warehouses (Snowflake, BigQuery, Redshift) have massive compute capacity and can run SQL transformations on terabytes in seconds — there is no performance advantage to transforming on a separate server first. Second, raw data preservation: since raw data lands first in ELT, you can always reprocess by re-running the transformation, which is impossible in ETL if the raw data was discarded and the source is unavailable or has changed. Third, version control and collaboration: dbt SQL models are text files that live in git, with built-in testing and documentation. ETL GUI tools have poor git integration and are hard for teams to collaborate on. Fourth, analyst accessibility: transformation logic in SQL is readable and modifiable by analysts and analytics engineers, not just data engineers with Python expertise.

ETL remains the correct choice when data must be masked or anonymised before touching any analytical system (PII compliance), when the transformation requires Python or ML capabilities unavailable in SQL, or when the destination has strict schema requirements that prevent landing raw data.`,
          },
          {
            q: 'Q2. Why was ETL the dominant pattern for 30 years and what changed?',
            a: `ETL dominated because of a simple economic constraint: warehouse storage was expensive. Traditional on-premises data warehouse hardware (Teradata, IBM Netezza, Oracle Exadata) cost $5,000 to $50,000 per terabyte. At that price, you could not afford to store raw, unprocessed data — every byte had to earn its place. Only clean, modelled, business-ready data was allowed into the warehouse. The transformation had to happen before loading, using dedicated ETL servers and proprietary tools like Informatica and DataStage.

Two changes in the 2010s made this constraint irrelevant. First, Amazon S3 reduced storage cost by 99.5% — from thousands of dollars per terabyte to $23 per terabyte per month. Suddenly affordable to store all raw data indefinitely. Second, cloud data warehouses (Redshift in 2012, BigQuery in 2012, Snowflake in 2014) separated compute from storage and made massively parallel SQL compute available on demand. Snowflake can run a transformation on terabytes in seconds for a few dollars. There is no longer any reason to use a separate ETL server when the warehouse can do the transformation faster and cheaper.

When storage became cheap enough to keep raw data and the warehouse became powerful enough to do the transformation itself, ELT became the natural architecture. dbt, launched in 2016, provided the tooling that operationalised ELT — version-controlled SQL transformations with automated testing and documentation, running entirely inside the warehouse.`,
          },
          {
            q: 'Q3. In an ELT architecture, what is the purpose of the staging layer and why should it never contain business logic?',
            a: `The staging layer in ELT is the set of tables (typically in a raw or staging schema) that hold the source data in near-original form after extraction and loading. Its purpose is to be the single source of truth for what the source system actually sent, with only the minimal transformations needed to make the data loadable.

The staging layer should contain: the original source columns, basic type coercions necessary for load compatibility (a string that must be cast to an integer so the column can exist), pipeline metadata added at load time (ingested_at timestamp, pipeline_run_id, source_system), and nothing else.

The staging layer should never contain business logic for three reasons. First, it breaks the reprocessing guarantee. The defining advantage of ELT over ETL is that bugs in transformation logic can be fixed by reprocessing from the raw staging data without re-extracting from the source. If business logic is applied in the loader before data reaches staging, then staging is not actually raw — it already has incorrect business logic applied. Reprocessing from staging will still produce wrong results until the loader is also fixed.

Second, it hides logic from review. Business logic in the dbt staging model is visible in a SQL file, version-controlled, and testable. Business logic in the Python loader is buried in code that runs before dbt, not part of the dbt lineage graph, not tested by dbt tests, and not visible to analysts.

Third, it violates separation of concerns. The loader's job is moving data. The transformer's job is shaping data. When both jobs are in the loader, debugging requires understanding both simultaneously.`,
          },
          {
            q: 'Q4. How does dbt fit into an ELT architecture and what problem does it solve?',
            a: `dbt (data build tool) is the transformation layer in an ELT architecture. It takes SQL SELECT statements written by data engineers and analysts, runs them against the data warehouse in the correct dependency order, tests the outputs, and generates documentation — all within the warehouse itself.

The problem dbt solves is the operational mess of ad-hoc SQL transformations. Before dbt, the T in ELT was done with a collection of stored procedures, scheduled SQL scripts, or Python scripts that ran SQL against the warehouse. These were hard to version control (stored procedures are not easily diff-able), had no built-in testing, generated no documentation, and created implicit dependencies that were not tracked anywhere.

dbt addresses all of these. dbt models are plain SQL SELECT statements in text files — they live in git and are diffed, reviewed, and merged like any other code. Dependencies between models are declared using the ref() macro (SELECT * FROM {{ ref('stg_orders') }}) and dbt builds the full dependency graph automatically, running models in the correct order. Schema tests (not_null, unique, accepted_values, relationships) run automatically as part of the dbt build, catching data quality issues before they reach analysts. Documentation is generated from schema.yml files and browsable in a local web server.

In practical terms: a data engineer writes a SQL file named fct_orders.sql, commits it to git, opens a PR, CI runs dbt compile (SQL is valid) and dbt test (data quality checks pass), the PR is merged, and the CI/CD pipeline runs dbt run --select fct_orders in production. The entire transformation lifecycle is software-engineered, not ad-hoc.`,
          },
          {
            q: 'Q5. A data engineer tells you "we should use ETL instead of ELT because ETL is more reliable — data in the warehouse is always clean." Is this correct?',
            a: `This reasoning confuses the mechanism of data quality enforcement with its effectiveness, and it omits a critical failure mode of ETL.

The claim that ETL is more reliable because the warehouse only receives clean data is partially true in the narrow sense — if the ETL pipeline succeeds, only transformed data reaches the warehouse. But this reliability is purchased at a cost that the statement does not acknowledge: if a transformation bug exists, the raw data needed to fix it is gone.

In ELT, a bug in a dbt model is discovered and the fix is: update the SQL, run dbt --full-refresh, and the corrected data replaces the incorrect data within hours. In ETL, a bug in the transformation pipeline means the warehouse has incorrect data that was transformed from raw data that was discarded. To fix it, you must either re-extract from the source (which may be unavailable, rate-limited, or have already changed) or accept that the historical data is wrong.

The ETL approach trades reprocessing capability for the appearance of cleanliness. ELT makes data quality explicit and testable: dbt tests on staging models catch the same quality issues the ETL pipeline would catch, but with the raw data still available for reprocessing when bugs slip through.

ELT with good dbt tests is more reliable than ETL with the same quality checks, because it additionally preserves the ability to recover from both known and unknown bugs by reprocessing from raw. The correct response to the data engineer is: both patterns can enforce data quality equally well — but only ELT preserves raw data for reprocessing, which is the more important reliability property over the lifetime of a pipeline.`,
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
            error: `dbt run failed: Compilation Error in model stg_orders — Database error: column "order_amount" does not exist — the source table has "amount" not "order_amount"`,
            cause: 'The source table column was renamed upstream (in the PostgreSQL source or the raw staging table) but the dbt staging model still references the old column name. In ELT, column renames in the source propagate into dbt models as compilation errors. The error is clear and immediate — no data was incorrectly processed.',
            fix: 'Update the column reference in the dbt model: amount AS order_amount instead of order_amount. Before deploying, add a source freshness check and a column existence assertion in the source definition. For ongoing protection: add the raw table schema to dbt sources with column definitions so dbt warns when expected columns are missing. Consider whether the source team should send a schema change notification before renaming columns.',
          },
          {
            error: `ELT pipeline: raw.orders row count = 48,234 but stg_orders row count = 31,847 — 16,387 rows missing with no error`,
            cause: 'The dbt staging model has a filter that is silently excluding rows. Common culprits: a WHERE clause that excludes rows with NULL in a column that recently started receiving NULLs, an INNER JOIN that drops unmatched rows when a LEFT JOIN was intended, or a QUALIFY/ROW_NUMBER deduplication that is over-aggressive.',
            fix: 'Add row count tests to dbt that compare staging to raw: a custom generic test that asserts stg_count >= raw_count * 0.95. Run dbt test immediately to surface the discrepancy before it reaches Gold. Audit every WHERE clause and JOIN in the staging model. Replace WHERE col IS NOT NULL with explicit handling: if the column should not be null, add a not_null test and send failures to a DLQ rather than silently filtering. Use LEFT JOIN where applicable and check is_inner_join for missing rows.',
          },
          {
            error: `Informatica ETL job: TRANSFORMATION ERROR row 47,291 — cannot cast "N/A" to DECIMAL — entire job aborted, zero rows loaded`,
            cause: 'Classic ETL all-or-nothing failure. A single invalid value in one row caused the entire transformation job to abort, loading zero rows into the destination. In ETL pipelines that do not have row-level error handling, one bad record brings down the entire batch.',
            fix: 'For Informatica (and similar ETL tools): configure the transformation to route invalid rows to a reject file rather than aborting the job. Set the error threshold to allow a percentage of failures before aborting. For Python ETL: add row-level try/except that sends bad rows to a DLQ and continues processing. For ELT (if migrating): this failure mode largely disappears — raw data is loaded with the bad value as a string, and the dbt staging model uses TRY_CAST or equivalent to handle invalid values gracefully.',
          },
          {
            error: `dbt Cloud scheduled run failed: Runtime Error — relation "raw.orders" does not exist — tables in the raw schema were dropped during a warehouse maintenance window`,
            cause: 'The EL pipeline that populates the raw schema failed or was not run, and the dbt transformation ran against an empty raw schema. In ELT, dbt depends on the raw tables being present and populated. If the upstream EL step fails, dbt has nothing to transform.',
            fix: 'Add explicit dependency management between the EL pipeline and dbt runs. In Airflow: make the dbt task depend on the EL extraction task — if EL fails, dbt does not run. In dbt Cloud: use dbt\'s source freshness checks to verify raw tables were updated recently before running: dbt source freshness will fail if raw.orders was not updated within the configured freshness threshold, preventing the dbt run from executing on stale or missing data.',
          },
          {
            error: `After migrating from ETL to ELT, a data quality issue was found that existed in the ETL pipeline for 6 months — the ETL had silently been incorrectly computing a metric with no tests to catch it`,
            cause: 'The ETL pipeline had no automated tests on transformation outputs. The incorrect computation passed through the ETL transformation, loaded into the warehouse, and was used in reports for 6 months. This is the classic ETL reliability risk: a bug in the transformation layer silently corrupts the warehouse, and without tests, nobody knows.',
            fix: 'This is not an error to fix — it is a lesson. The resolution for the historical data: in an ELT architecture, fix the dbt model and run dbt --full-refresh to reprocess from preserved raw data. In the old ETL architecture: re-extract 6 months of data from PostgreSQL (8 hours) and reprocess. Going forward: add tests at every dbt layer. The migration to ELT does not automatically fix bad data quality practices — you must also add tests to the dbt models as part of the migration.',
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
        'ETL transforms before loading — raw data is processed in a separate engine and only clean data reaches the destination. ELT loads raw data first and transforms inside the destination using SQL. The letters describe where transformation happens, which determines tool choice, raw data preservation, and reprocessing capability.',
        'ETL dominated for 30 years because warehouse storage was expensive ($5,000–$50,000/TB). You could not afford to store raw data, so it had to be cleaned before entering. Cloud storage ($23/TB on S3) and cloud warehouses (cheap on-demand SQL compute) eliminated this constraint, making ELT economically rational.',
        'ELT\'s defining advantage is raw data preservation. In ELT, the raw staging layer always contains the original source data. When a transformation bug is discovered months later, fix the dbt model and run --full-refresh. In ETL, if raw data was discarded, historical correction requires re-extraction from the source, which may be unavailable.',
        'ETL is still the right choice when: raw data contains PII that must be masked before touching any analytical system, transformations require Python or ML capabilities unavailable in SQL, or the destination has strict schema requirements that prevent landing raw data.',
        'dbt is the standard transformation layer in ELT. SQL SELECT statements in text files, version-controlled in git, with built-in testing (not_null, unique, accepted_values, relationships) and auto-generated documentation. dbt test runs in CI on every PR, catching data quality issues before they reach production.',
        'The modern pattern is ELT by default with targeted ETL exceptions. Most logic lives in dbt SQL models. Python ETL is used only for PII masking, ML inference, and complex transformations unavailable in SQL. This is not a binary choice — mature platforms use both.',
        'The staging layer in ELT must contain near-raw source data. Never apply business logic in the EL loader. Business logic belongs in dbt models where it is visible, version-controlled, tested, and independent of the loading mechanism. Applying business logic in the loader makes reprocessing from raw ineffective.',
        'Fivetran and Airbyte are managed EL tools that pre-build connectors to hundreds of SaaS sources. Use them for standard sources (Salesforce, Stripe, Google Analytics) to save engineering time. Build custom Python EL for proprietary APIs, internal databases, and sources with unusual authentication or pagination.',
        'The four ELT anti-patterns to avoid: transforming in the EL layer (secretly doing ETL), not preserving raw data (staging layer is already Silver), monolithic dbt models (one 300-line file doing everything), and no tests on raw or staging models (bugs propagate silently to Gold).',
        'When comparing ETL vs ELT for reliability: both can enforce data quality equally well with the same checks. But ELT additionally preserves the ability to recover from both known and unknown bugs by reprocessing from raw. Over the lifetime of a pipeline — typically years — this reprocessing capability is the more important reliability property.',
      ]} />

    </LearnLayout>
  )
}