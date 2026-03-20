import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Medallion Architecture — Bronze, Silver, Gold — Data Engineering | Chaduvuko',
  description:
    'The Medallion Architecture in depth — what belongs in each layer, the exact transformations at each boundary, how dbt and Spark fit in, SCD handling per layer, late-arriving data, and governing a three-tier lakehouse.',
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

export default function MedallionArchitectureModule() {
  return (
    <LearnLayout
      title="Medallion Architecture — Bronze, Silver, Gold"
      description="What belongs in each layer, the exact transformations at each boundary, dbt and Spark integration, SCD handling, and governing a three-tier lakehouse."
      section="Data Engineering"
      readTime="65 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — What the Medallion Architecture Is ──────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Pattern and Why It Matters" />
        <SectionTitle>The Medallion Architecture — Three Layers, One Principle</SectionTitle>

        <Para>
          The Medallion Architecture is the dominant data organisation pattern
          in modern data lakehouses. It structures data into three progressively
          refined layers — Bronze (raw), Silver (cleaned and trusted), and Gold
          (business-ready aggregates) — with each layer building on the previous
          one through well-defined transformation steps. Every layer has a specific
          contract: what data it accepts, what it guarantees, and who can use it.
        </Para>

        <Para>
          The pattern was popularised by Databricks and is now the standard for
          any platform using Delta Lake or Iceberg. Its value is not the three-layer
          count — it is the principle each layer embodies: each successive layer
          makes stronger guarantees about data quality, structure, and fitness for
          analytical use. Moving data from Bronze to Silver is not just renaming
          a folder; it is a transformation that adds a contractual guarantee.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 16,
          }}>
            The three layers — what each guarantees
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              {
                medal: '🥉 Bronze',
                color: '#cd7f32',
                tagline: 'Raw and preserved',
                guarantees: [
                  'Data exists exactly as it arrived from the source',
                  'Nothing was discarded — all history preserved',
                  'Ingestion metadata added (ingested_at, source, run_id)',
                  'Format standardised to Parquet',
                  'NOT a guarantee of correctness, completeness, or freshness',
                ],
                who: 'Pipeline engineers, ML engineers (raw training data)',
              },
              {
                medal: '🥈 Silver',
                color: '#aaa9ad',
                tagline: 'Trusted and typed',
                guarantees: [
                  'Every column has the correct type',
                  'Required fields are never NULL',
                  'Deduplication has been applied',
                  'Values are within expected business ranges',
                  'PII is masked or removed',
                  'The data matches the source — no business logic applied yet',
                ],
                who: 'Analysts, analytics engineers, ML engineers',
              },
              {
                medal: '🥇 Gold',
                color: '#ffd700',
                tagline: 'Business-ready',
                guarantees: [
                  'Business logic has been applied',
                  'Metrics are pre-computed for performance',
                  'Dimensions are joined for denormalised access',
                  'Data is shaped for a specific consumer (finance, operations)',
                  'Rebuilt from Silver — Silver is always the source of truth',
                ],
                who: 'Analysts, BI tools, dashboards, downstream APIs',
              },
            ].map((item) => (
              <div key={item.medal} style={{
                background: 'var(--bg2)',
                border: `1px solid ${item.color}40`,
                borderTop: `3px solid ${item.color}`,
                borderRadius: 10, padding: '16px 18px',
              }}>
                <div style={{
                  fontSize: 15, fontWeight: 800, color: item.color,
                  fontFamily: 'var(--font-display)', marginBottom: 4,
                }}>{item.medal}</div>
                <div style={{
                  fontSize: 11, color: item.color, fontStyle: 'italic',
                  marginBottom: 10, fontFamily: 'var(--font-mono)',
                }}>{item.tagline}</div>
                <div style={{ marginBottom: 10 }}>
                  {item.guarantees.map((g, gi) => (
                    <div key={gi} style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                      <div style={{ color: item.color, fontSize: 11, marginTop: 2, flexShrink: 0 }}>✓</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{g}</div>
                    </div>
                  ))}
                </div>
                <div style={{
                  fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)',
                  borderTop: '1px solid var(--border)', paddingTop: 8,
                }}>For: {item.who}</div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <Callout type="info">
          The three-tier naming (Bronze/Silver/Gold) is a convention, not a
          requirement. Some teams use Raw/Curated/Aggregated, or Landing/Refined/Served,
          or L0/L1/L2. The names matter less than the principle: each layer makes
          progressively stronger guarantees, transformations at each boundary are
          well-defined, and each layer is independently queryable.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 — Bronze Layer In Depth ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Bronze Layer In Depth" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(205,127,50,0.15)', border: '2px solid #cd7f32',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#cd7f32',
            fontFamily: 'var(--font-mono)',
          }}>BRONZE</div>
          <h2 style={{
            fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Bronze Layer — Raw Data, Preserved Forever</h2>
        </div>

        <Para>
          The Bronze layer is the truth of what the source system actually sent.
          If a vendor CSV had wrong data on 2026-03-15, the Bronze layer still
          has that wrong data. This is not a failure — it is a feature. When the
          vendor sends a corrected file, you can prove what the original said and
          when the correction arrived. When a bug is found in the Silver
          transformation, Bronze is the raw material for reprocessing.
        </Para>

        <SubTitle>What the Bronze layer does — and does not do</SubTitle>

        <CodeBox label="Bronze layer contract — the exact transformations performed">{`BRONZE LAYER CONTRACT:
  Accepts:  Any data from the landing zone
  Produces: Parquet files partitioned by ingestion date
  Guarantees: Format standardised, ingestion metadata added

TRANSFORMATIONS PERFORMED IN BRONZE:
  ✓ Format conversion: JSON/CSV/XML → Parquet
  ✓ Hive-style partitioning: adds date= partition column
  ✓ Ingestion metadata: adds ingested_at, source_system, pipeline_run_id
  ✓ Light type coercion: minimum changes to make data loadable as Parquet
      (e.g., parse timestamps to TimestampType for Parquet compatibility)
  ✓ Schema capture: record the schema seen from the source in catalog

TRANSFORMATIONS NOT PERFORMED IN BRONZE:
  ✗ Business validation (valid statuses, amount ranges) — Silver's job
  ✗ Deduplication — Silver's job
  ✗ NULL handling — Silver's job
  ✗ Join to other tables — Silver's job
  ✗ Business rule application (tier classification, etc.) — Gold's job
  ✗ Dropping columns — preserve everything, even columns you don't use yet

THE BRONZE IMMUTABILITY RULE:
  Bronze data is append-only via CDC / incremental ingestion.
  Once written, a Bronze row is never modified.
  If the source sends a correction: append the corrected row.
  Silver deduplication will keep the latest version.
  This preserves the complete change history — invaluable for audits.

BRONZE DATA VOLUME REALITY:
  Bronze retains all CDC events — every INSERT, UPDATE, DELETE.
  For a table with 10M rows and 5% daily update rate:
    Daily CDC events: 500,000 inserts + 500,000 updates = 1M events/day
    After 1 year: 365M Bronze rows for 10M current rows in source
  This is expected and correct — Bronze is the event log, Silver is the state.`}</CodeBox>

        <SubTitle>Bronze implementation — Spark and Python patterns</SubTitle>

        <CodeBox label="Bronze layer pipeline — format conversion with schema preservation">{`"""
Bronze pipeline: landing JSON → Bronze Parquet (Delta Lake)
Preserves all source fields, adds ingestion metadata.
"""

from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.types import TimestampType
from delta.tables import DeltaTable
from datetime import date

spark = SparkSession.builder \
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \
    .getOrCreate()

BRONZE_PATH = "s3://freshmart-data-lake-prod/bronze/payments"
LANDING_PATH = "s3://freshmart-data-lake-prod/landing/razorpay"

def load_to_bronze(run_date: date) -> dict:
    """
    Load raw Razorpay JSON from landing to Bronze Delta Lake.
    Converts to Parquet, adds metadata, preserves all source fields.
    """
    landing_file = f"\${LANDING_PATH}/payments_\${run_date.strftime('%Y%m%d')}.json"

    # Read raw JSON — schema inferred from source (schema-on-read at Bronze)
    raw = spark.read.json(landing_file)

    # Only transformations allowed at Bronze:
    bronze = raw \
        .withColumn("_ingested_at",    F.current_timestamp()) \
        .withColumn("_source_system",  F.lit("razorpay")) \
        .withColumn("_pipeline_run_id", F.lit(run_id)) \
        .withColumn("_source_date",    F.lit(str(run_date))) \
        .withColumn("_bronze_date",    F.to_date(F.current_timestamp()))
    # Note: _ prefix on all metadata columns to distinguish from source columns

    # Write to Delta Lake with date partition:
    bronze.write \
        .format("delta") \
        .mode("append") \                  # Bronze is APPEND ONLY
        .partitionBy("_bronze_date") \
        .option("mergeSchema", "true") \   # allow new source columns to flow through
        .save(BRONZE_PATH)

    # Register in Glue catalog if partition is new:
    row_count = bronze.count()
    return {
        "rows_written": row_count,
        "path": BRONZE_PATH,
        "partition": str(run_date),
    }


# BRONZE SCHEMA EVOLUTION STRATEGY:
# mergeSchema=true: if source adds a new column, Bronze accepts it
# automatically. Silver must handle the new column explicitly.
# When Silver fails because of an unexpected Bronze column:
#   1. The Bronze data is safe (mergeSchema preserved it)
#   2. Update Silver model to handle the new column
#   3. Reprocess Silver from Bronze — no re-ingestion from source needed

# WHAT TO DO WITH SCHEMA CHANGES:
# Source adds new column "refund_amount":
#   Bronze: mergeSchema=true → new column appears in Parquet automatically
#   Silver: update stg_payments.sql to SELECT refund_amount
#   Gold:   update downstream models that need refund_amount
# No re-ingestion from source. No data loss. Controlled migration.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — Silver Layer In Depth ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Silver Layer In Depth" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(170,169,173,0.15)', border: '2px solid #aaa9ad',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#aaa9ad',
            fontFamily: 'var(--font-mono)',
          }}>SILVER</div>
          <h2 style={{
            fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Silver Layer — Trusted, Typed, Deduplicated</h2>
        </div>

        <Para>
          Silver is where raw data becomes trustworthy. An analyst can query
          a Silver table and know that every column has the right type, every
          required field is populated, the data has been deduplicated, and the
          values are within expected business ranges. Silver is the single source
          of truth for the current state of every entity in the platform.
        </Para>

        <Para>
          The critical Silver contract: Silver contains entity state, not event
          history. The Bronze layer has every INSERT, UPDATE, and DELETE that
          happened over three years. The Silver layer has one row per order_id —
          the current state of that order, updated whenever Bronze receives a change.
          Silver answers "what does the order look like now?" Bronze answers
          "what happened to this order and when?"
        </Para>

        <SubTitle>The Silver transformation checklist</SubTitle>

        {[
          {
            step: '1. Type casting — every column to its correct type',
            detail: 'Bronze stores everything as strings (or inferred types) for maximum compatibility. Silver casts every column to its authoritative type: amounts to DECIMAL(10,2), timestamps to TIMESTAMPTZ, IDs to BIGINT. Type mismatches are rejected to the DLQ with a clear error.',
            sql: `-- models/silver/stg_payments.sql
WITH source AS (SELECT * FROM \${ ref('bronze_payments') })
SELECT
    payment_id::BIGINT               AS payment_id,
    order_id::BIGINT                 AS order_id,
    amount::DECIMAL(10,2)            AS amount,
    currency                         AS currency,
    LOWER(TRIM(status))              AS status,
    created_at::TIMESTAMPTZ          AS created_at,
    _ingested_at                     AS bronze_ingested_at
FROM source
WHERE TRY_CAST(payment_id AS BIGINT) IS NOT NULL   -- reject if PK unparseable`,
          },
          {
            step: '2. Deduplication — one row per business key',
            detail: 'Bronze is append-only and may have multiple rows for the same entity. Silver deduplicates using ROW_NUMBER() partitioned by the business key, keeping the row with the most recent updated_at. This collapses the event history into current state.',
            sql: `WITH deduplicated AS (
    SELECT *,
        ROW_NUMBER() OVER (
            PARTITION BY payment_id
            ORDER BY updated_at DESC, _ingested_at DESC
        ) AS rn
    FROM stg_payments
)
SELECT * EXCLUDE (rn)
FROM deduplicated
WHERE rn = 1`,
          },
          {
            step: '3. Null handling — enforce NOT NULL on required fields',
            detail: 'Required fields (primary keys, mandatory amounts, required foreign keys) must never be NULL in Silver. Rows with NULL required fields are rejected to the DLQ. Optional fields (promo_code, notes) are allowed NULL — COALESCE is only applied where a business default makes sense.',
            sql: `-- Hard rejection for NULL primary key:
WHERE payment_id IS NOT NULL

-- Soft handling for optional fields:
COALESCE(delivery_fee, 0)     AS delivery_fee,
COALESCE(promo_code, '')      AS promo_code,   -- only if empty string is valid business default
notes                          AS notes          -- leave NULL as NULL — NULL has meaning here`,
          },
          {
            step: '4. Value validation — business range checks',
            detail: 'Amounts must be non-negative. Statuses must be in the known set. Timestamps must be in a reasonable range (not in 1970, not in 2099). Rows that fail business validation go to the DLQ, not Silver.',
            sql: `WHERE amount >= 0                          -- reject negative amounts
  AND status IN ('pending','captured','failed','refunded')
  AND created_at > '2020-01-01'::TIMESTAMPTZ
  AND created_at < NOW() + INTERVAL '1 day'  -- reject future timestamps`,
          },
          {
            step: '5. PII masking — protect personal data before analyst access',
            detail: 'Fields containing personal information (phone numbers, email addresses, full names, IP addresses) are masked or hashed in Silver. Analysts who query Silver cannot access raw PII. The Bronze layer still has unmasked PII — access to Bronze is restricted to pipeline engineers only.',
            sql: `SHA2(customer_email, 256)     AS customer_email_hashed,
REGEXP_REPLACE(phone, '[0-9]', 'X', 1, -1, 'i')
                              AS phone_masked,   -- +91-XXXXXXXX-XX
-- Raw fields NOT included in Silver SELECT — they stay in Bronze only`,
          },
          {
            step: '6. Referential validation — foreign keys exist',
            detail: 'A payment must reference a valid order_id that exists in silver.orders. Orphaned records (payment with no matching order) are flagged — either rejected to DLQ or written with a is_orphan flag depending on business policy.',
            sql: `-- dbt relationship test (schema.yml):
-- - name: order_id
--   tests:
--     - relationships:
--         to: ref('silver_orders')
--         field: order_id
--         severity: warn   -- warn not error: some payments may arrive before orders`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid rgba(170,169,173,0.3)',
            borderRadius: 10, padding: '16px 20px', marginBottom: 14,
            borderLeft: '3px solid #aaa9ad',
          }}>
            <div style={{
              fontSize: 13, fontWeight: 800, color: '#aaa9ad',
              fontFamily: 'var(--font-display)', marginBottom: 8,
            }}>{item.step}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 10 }}>
              {item.detail}
            </div>
            <pre style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '10px 14px', fontSize: 12,
              color: 'var(--text)', fontFamily: 'var(--font-mono)',
              margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.7,
            }}><code>{item.sql}</code></pre>
          </div>
        ))}

        <SubTitle>Silver as Delta Lake — MERGE for idempotent upserts</SubTitle>

        <CodeBox label="Silver incremental materialisation — Delta MERGE via dbt">{`-- Silver layer in dbt uses the 'incremental' materialisation with Delta MERGE.
-- This is more efficient than full refresh for large tables.

-- models/silver/payments.sql
{{ config(
    materialized  = 'incremental',
    unique_key    = 'payment_id',
    incremental_strategy = 'merge',   -- Delta MERGE INTO
    file_format   = 'delta',
    merge_update_columns = [          -- only update these columns on match
        'status', 'amount', 'refund_amount', 'updated_at', 'silver_updated_at'
    ],
) }}

WITH source AS (
    SELECT * FROM {{ ref('stg_payments') }}
    {% if is_incremental() %}
        -- On incremental runs: only process new/changed Bronze rows
        WHERE bronze_ingested_at > (
            SELECT MAX(silver_updated_at) FROM {{ this }}
        )
    {% endif %}
),
deduplicated AS (
    SELECT *,
        ROW_NUMBER() OVER (
            PARTITION BY payment_id
            ORDER BY updated_at DESC
        ) AS rn
    FROM source
),
final AS (
    SELECT
        payment_id, order_id, amount, currency, status,
        refund_amount, created_at, updated_at,
        CURRENT_TIMESTAMP() AS silver_updated_at
    FROM deduplicated
    WHERE rn = 1
      AND payment_id IS NOT NULL
      AND amount >= 0
      AND status IN ('pending','captured','failed','refunded')
)
SELECT * FROM final

-- What dbt generates under the hood:
-- MERGE INTO silver.payments AS target
-- USING new_rows AS source
-- ON target.payment_id = source.payment_id
-- WHEN MATCHED THEN UPDATE SET status=..., amount=...
-- WHEN NOT MATCHED THEN INSERT (payment_id, order_id, ...) VALUES (...)

-- IMPORTANT: merge_update_columns prevents overwriting
-- columns like created_at that should never change once set.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Gold Layer In Depth ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Gold Layer In Depth" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{
            background: 'rgba(255,215,0,0.12)', border: '2px solid #ffd700',
            borderRadius: 10, padding: '6px 14px',
            fontSize: 13, fontWeight: 900, color: '#ffd700',
            fontFamily: 'var(--font-mono)',
          }}>GOLD</div>
          <h2 style={{
            fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 900,
            letterSpacing: '-1px', color: 'var(--text)', margin: 0,
            fontFamily: 'var(--font-display)',
          }}>Gold Layer — Business Logic Applied, Ready to Serve</h2>
        </div>

        <Para>
          Gold is not a copy of Silver with aggregations on top. It is a
          purpose-built layer — each Gold model is designed for a specific
          analytical consumer. The daily revenue model exists because the finance
          team needs it. The customer LTV model exists because the product team
          needs it. Gold is the translation layer between "what the data says"
          (Silver) and "what the business asks" (dashboards, reports, APIs).
        </Para>

        <SubTitle>The Gold layer design principles</SubTitle>

        <CodeBox label="Gold layer design — three patterns for three use cases">{`GOLD PATTERN 1: PRE-AGGREGATED METRICS (most common)
────────────────────────────────────────────────────────────
Purpose: Replace expensive on-the-fly aggregations with pre-computed results.
         A query that joins 500M orders, 10M customers, and 10M payments
         in real time takes 4 minutes. Pre-aggregated Gold: < 1 second.

Example — daily store revenue:
-- models/gold/daily_store_revenue.sql
SELECT
    DATE(o.created_at AT TIME ZONE 'Asia/Kolkata')  AS order_date,
    o.store_id,
    s.store_name,
    s.city,
    COUNT(DISTINCT o.order_id)                       AS order_count,
    SUM(o.order_amount)                              AS gross_revenue,
    SUM(o.discount_amount)                           AS total_discount,
    SUM(o.order_amount - o.discount_amount)          AS net_revenue,
    AVG(o.order_amount)                              AS avg_order_value,
    COUNT(DISTINCT o.customer_id)                    AS unique_customers,
    SUM(CASE WHEN o.status = 'cancelled' THEN 1 ELSE 0 END) AS cancellations,
    ROUND(SUM(CASE WHEN o.status = 'cancelled' THEN 1 ELSE 0 END)
          / COUNT(o.order_id) * 100, 2)              AS cancellation_rate_pct
FROM {{ ref('silver_orders') }} o
JOIN {{ ref('silver_stores') }} s USING (store_id)
WHERE o.status IN ('delivered', 'cancelled')
GROUP BY 1, 2, 3, 4
ORDER BY 1 DESC, 6 DESC


GOLD PATTERN 2: WIDE DENORMALISED FACT TABLE (for BI tools)
────────────────────────────────────────────────────────────
Purpose: Join multiple Silver tables into one wide flat table.
         BI tools (Metabase, Tableau, Looker) work best with single flat tables.
         Analysts should not need to join — Gold does it for them.

Example — fct_orders (the "order 360"):
-- models/gold/fct_orders.sql
SELECT
    o.order_id, o.order_amount, o.status, o.created_at,
    -- Customer attributes (from silver.customers at order time):
    c.customer_id, c.city AS customer_city, c.tier AS customer_tier,
    -- Store attributes:
    s.store_id, s.store_name, s.store_city,
    -- Payment attributes:
    p.payment_method, p.payment_status, p.captured_at,
    -- Delivery attributes:
    d.delivery_minutes, d.delivery_partner,
    -- Derived metrics:
    CASE WHEN o.order_amount >= 2000 THEN 'premium'
         WHEN o.order_amount >= 500  THEN 'standard'
         ELSE 'economy' END                           AS order_tier,
    CASE WHEN p.captured_at IS NOT NULL THEN TRUE
         ELSE FALSE END                               AS is_paid
FROM {{ ref('silver_orders') }}   o
LEFT JOIN {{ ref('silver_customers') }} c USING (customer_id)
LEFT JOIN {{ ref('silver_stores') }}    s USING (store_id)
LEFT JOIN {{ ref('silver_payments') }}  p USING (order_id)
LEFT JOIN {{ ref('silver_deliveries') }} d USING (order_id)


GOLD PATTERN 3: ENTITY SNAPSHOTS (for historical analysis)
────────────────────────────────────────────────────────────
Purpose: Capture the state of an entity (customer, product) at a specific
         point in time for cohort analysis and trend reporting.

Example — daily customer snapshot:
-- models/gold/customer_daily_snapshot.sql
SELECT
    snapshot_date,
    customer_id,
    tier,
    total_lifetime_orders,
    total_lifetime_spend,
    days_since_last_order,
    CASE WHEN days_since_last_order <= 30 THEN 'active'
         WHEN days_since_last_order <= 90 THEN 'at_risk'
         ELSE 'churned' END                           AS lifecycle_status
FROM {{ ref('silver_customers') }}
CROSS JOIN (
    SELECT DISTINCT DATE(created_at) AS snapshot_date
    FROM {{ ref('silver_orders') }}
    WHERE created_at >= CURRENT_DATE - 365
) dates
-- One row per (customer, date) — track how the customer changed over time`}</CodeBox>

        <SubTitle>Gold layer governance — who defines business logic</SubTitle>

        <Para>
          One of the most important governance questions in a data platform is:
          who owns the Gold layer? Business logic (how to calculate customer tier,
          what counts as a completed order, how to attribute revenue) should not
          be scattered across BI tool calculated fields, Excel files, and
          individual analyst queries. Gold centralises business logic so that
          every consumer gets the same answer to the same question.
        </Para>

        <CodeBox label="Gold layer ownership — the data contract pattern">{`# ANTI-PATTERN: Business logic scattered across consumers
# BI Tool A: customer_tier = order_amount > 1000 THEN 'premium'
# BI Tool B: customer_tier = order_amount > 1500 THEN 'premium'
# Analyst C: customer_tier = lifetime_spend > 10000 THEN 'premium'
# → Three different answers to "how many premium customers do we have"
# → Finance, product, and marketing each have different numbers

# CORRECT PATTERN: Business logic in Gold, one definition
# models/gold/customer_segments.sql:
# customer_tier =
#   CASE WHEN lifetime_spend >= 50000 THEN 'platinum'
#        WHEN lifetime_spend >= 10000 THEN 'gold'
#        WHEN lifetime_spend >= 2000  THEN 'silver'
#        ELSE 'standard'
#   END
# This definition is in git, tested, reviewed, and versioned.
# Every dashboard that queries customer_tier gets the same answer.

# THE DATA CONTRACT:
# Gold models have explicit consumers listed in their documentation:
# - Finance dashboard: uses daily_store_revenue, customer_ltv
# - Operations dashboard: uses fct_orders, store_performance
# - Product analytics: uses customer_daily_snapshot, feature_adoption

# Before changing a Gold model, check all downstream consumers.
# Breaking changes require:
#   1. Announcing the change to all consumer teams
#   2. Adding the new column alongside the old (backward-compatible)
#   3. Migration period for consumers to update
#   4. Removing the old column only after all consumers have migrated

# dbt docs generate creates a lineage graph showing all downstream models.
# Use it before any Gold model modification.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Layer Comparison Table ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Complete Layer Comparison" />
        <SectionTitle>Bronze vs Silver vs Gold — Every Dimension</SectionTitle>

        <CompareTable
          headers={[
            { label: 'Dimension' },
            { label: '🥉 Bronze', color: '#cd7f32' },
            { label: '🥈 Silver', color: '#aaa9ad' },
            { label: '🥇 Gold', color: '#ffd700' },
          ]}
          keys={['dim', 'bronze', 'silver', 'gold']}
          rows={[
            { dim: 'Purpose', bronze: 'Preserve raw source data exactly', silver: 'Trusted, typed, current entity state', gold: 'Pre-computed business-ready metrics' },
            { dim: 'Data model', bronze: 'Append-only event log', silver: 'Current state (one row per entity)', gold: 'Aggregates and denormalised facts' },
            { dim: 'Schema model', bronze: 'Schema-on-read (mergeSchema=true)', silver: 'Schema enforced at MERGE', gold: 'Explicit, stable, consumer-specific' },
            { dim: 'Transformations', bronze: 'Format conversion, metadata only', silver: 'Types, dedup, nulls, validation, PII mask', gold: 'Joins, aggregations, business rules' },
            { dim: 'Update semantics', bronze: 'APPEND only (CDC events)', silver: 'MERGE (upsert on business key)', gold: 'Full rebuild or incremental MERGE' },
            { dim: 'Table format', bronze: 'Delta Lake (mergeSchema)', silver: 'Delta Lake (ACID, time travel)', gold: 'Delta Lake (small, fast queries)' },
            { dim: 'dbt model type', bronze: 'Not in dbt (Python/Spark pipeline)', silver: 'incremental (merge strategy)', gold: 'table or incremental' },
            { dim: 'Retention', bronze: '1-3 years (reprocessing source)', silver: '2-5 years', gold: '1-2 years (rebuilt from Silver)' },
            { dim: 'Row count ratio', bronze: '10-50× Silver (all history)', silver: '1× (current state)', gold: '0.001-0.1× (aggregated)' },
            { dim: 'Access', bronze: 'Engineers, ML scientists only', silver: 'All engineers + analysts (PII masked)', gold: 'Everyone + BI tools + APIs' },
            { dim: 'Contains PII', bronze: 'Yes — raw data unmasked', silver: 'No — masked/hashed in transformation', gold: 'No — derived from masked Silver' },
            { dim: 'Source of truth', bronze: 'For raw historical data', silver: 'For current entity state', gold: 'Never — always rebuilt from Silver' },
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 06 — dbt in the Medallion Architecture ──────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — dbt in the Medallion Architecture" />
        <SectionTitle>Where dbt Fits — And Where It Does Not</SectionTitle>

        <Para>
          dbt is the standard transformation tool for the Silver and Gold layers.
          It handles the Bronze-to-Silver and Silver-to-Gold transformations with
          version-controlled SQL, automated testing, lineage documentation, and
          CI/CD integration. Understanding where dbt belongs — and where Python
          or Spark is more appropriate — is what produces a well-structured platform.
        </Para>

        <CodeBox label="dbt layer mapping — which transformations belong where">{`dbt PROJECT STRUCTURE FOR MEDALLION ARCHITECTURE:

freshmart_dbt/
├── models/
│   ├── staging/                ← Bronze → Silver staging (one-to-one source mapping)
│   │   ├── _sources.yml        ← define Bronze tables as dbt sources
│   │   ├── stg_payments.sql    ← cast types, rename, light cleaning
│   │   ├── stg_orders.sql
│   │   └── stg_customers.sql
│   │
│   ├── intermediate/           ← optional layer: complex joins / business prep
│   │   └── int_orders_with_payment.sql
│   │
│   ├── silver/                 ← Silver layer (trusted, current state)
│   │   ├── _silver.yml         ← schema.yml with tests
│   │   ├── orders.sql          ← materialised='incremental', merge
│   │   ├── customers.sql
│   │   └── payments.sql
│   │
│   └── gold/                   ← Gold layer (business metrics)
│       ├── finance/
│       │   ├── daily_revenue.sql
│       │   └── customer_ltv.sql
│       ├── operations/
│       │   └── store_performance.sql
│       └── product/
│           └── customer_segments.sql
│
├── tests/
│   └── generic/                ← custom dbt tests
│       └── assert_positive_revenue.sql
│
└── macros/
    └── generate_schema_name.sql  ← route models to correct schemas

MATERIALISATION STRATEGY BY LAYER:
  staging models:       materialised='view'      (no storage cost, always fresh)
  intermediate:         materialised='view' or 'ephemeral'
  silver models:        materialised='incremental', incremental_strategy='merge'
  gold aggregates:      materialised='table'     (full rebuild, small size)
  gold large facts:     materialised='incremental', merge on business key


dbt DOES WELL:
  ✓ Bronze → Silver staging (SQL type casting, renaming, light cleaning)
  ✓ Silver → Gold joins and aggregations
  ✓ Incremental MERGE updates (via Delta Lake connector)
  ✓ Test automation (not_null, unique, relationships, custom)
  ✓ Documentation and lineage graphs
  ✓ CI/CD integration (dbt test on every PR)

dbt DOES NOT DO WELL (use Python/Spark instead):
  ✗ File format conversion (CSV → Parquet) — use Spark
  ✗ Large-scale deduplication on billions of rows — use Spark
  ✗ ML feature engineering — use Python/Spark
  ✗ Complex JSON flattening with nested arrays — Spark handles better
  ✗ Real-time/streaming transformations — use Flink or Spark Streaming
  ✗ PII masking with custom encryption libraries — use Python

THE BOUNDARY RULE:
  If the transformation can be expressed as a SQL SELECT and runs within
  Snowflake/Databricks SQL Warehouse in reasonable time → use dbt.
  If it requires Python libraries, non-SQL operations, or Spark's distributed
  execution for scale → use a Python/Spark pipeline that writes to Bronze,
  then let dbt handle Bronze → Silver → Gold from there.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Late-Arriving Data Across Layers ───────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Late-Arriving Data" />
        <SectionTitle>Late-Arriving Data — Handling Corrections Across All Three Layers</SectionTitle>

        <Para>
          Late-arriving data — records that are delivered to the platform after
          their logical timestamp — is handled differently at each layer. The
          Medallion Architecture's layer separation makes late data handling
          tractable: Bronze appends it, Silver merges it, Gold rebuilds or
          corrects it.
        </Para>

        <CodeBox label="Late-arriving data flow — how it propagates through all three layers">{`SCENARIO:
  An order was placed on 2026-03-17.
  The mobile app was offline and synced late on 2026-03-19.
  The event arrives in the landing zone on 2026-03-19 at 14:00 UTC.
  The event's event_time is 2026-03-17 22:15 UTC (when it actually happened).

LAYER 1 — BRONZE: appended with current ingestion date
  The Bronze pipeline runs on 2026-03-19.
  Row written to: bronze/orders/_bronze_date=2026-03-19/
  Row has:
    event_time:   2026-03-17 22:15 UTC  (from the event — the real time)
    _bronze_date: 2026-03-19            (partition — when we received it)
    _ingested_at: 2026-03-19 14:02 UTC  (when the pipeline ran)
  → Bronze correctly stores it in the 2026-03-19 partition (when received)
  → Bronze DOES NOT retroactively write to the 2026-03-17 partition
  → Both the event time and ingestion time are preserved

LAYER 2 — SILVER: merged using event_time as the business key basis
  The Silver pipeline runs with a 30-minute overlap window.
  The overlap catches late-arriving Bronze rows.
  The MERGE on order_id updates the Silver row if:
    source.updated_at > target.updated_at   (conditional update)

  If the order existed in Silver already:
    → The MERGE updates to the latest state (if source is newer)
  If the order did NOT exist in Silver yet (was truly new):
    → The MERGE inserts the row with event_time as created_at

  Silver.orders for order_id 9284751 now has:
    created_at: 2026-03-17 22:15 UTC  (correct business time)
    updated_at: 2026-03-19 14:02 UTC  (when we last saw it)
    silver_updated_at: 2026-03-19 14:07 UTC

LAYER 3 — GOLD: correction depends on Gold model type
  CASE A: Gold built from Silver with incremental MERGE
    Silver has the correct state for order_id 9284751.
    The next Gold dbt run sees the Silver row changed.
    Gold is updated via MERGE — the 2026-03-17 aggregate is updated.
    The order now appears in the 2026-03-17 daily revenue correctly.

  CASE B: Gold built with full date-partition rebuild
    The Gold model selects from Silver WHERE order_date = 2026-03-17.
    After Silver has the late-arriving order, the next full rebuild
    of the 2026-03-17 partition includes it correctly.

  CASE C: Gold aggregate has ALREADY been used in finance report
    Finance saw ₹42,11,500 for 2026-03-17 in Monday's report.
    After the late arrival, the correct total is ₹42,12,380.
    Decision: does the business want the correction to appear?
    If yes: rebuild 2026-03-17 Gold partition, send correction notice.
    If no:  accept the lag as a known data characteristic.
    The key: the CAPABILITY to correct exists because Silver is correct.

OVERLAP WINDOW CONFIGURATION:
  The Silver incremental model uses an overlap to catch late Bronze rows:
  {% if is_incremental() %}
      WHERE bronze_ingested_at > (
          SELECT MAX(silver_updated_at) - INTERVAL '30 minutes' FROM {{ this }}
      )
  {% endif %}
  30 minutes catches most late-arriving Bronze rows without expensive reprocessing.
  For data that can be days late: use a larger overlap (24h) + weekly full refresh.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — SCD in the Medallion Architecture ──────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — SCD Handling Across Layers" />
        <SectionTitle>Slowly Changing Dimensions — How Each Layer Handles Them</SectionTitle>

        <Para>
          Module 15 covered SCD patterns in SQL. In the Medallion Architecture,
          SCDs manifest differently at each layer. Bronze has the complete event
          history including all changes. Silver has the current state. Gold may
          need point-in-time state for historical analysis. The three-layer model
          makes all three representations possible from the same raw data.
        </Para>

        <CodeBox label="SCD handling in Medallion — which layer handles which SCD type">{`BRONZE LAYER — Complete change history (all SCD types possible)
  Bronze is append-only CDC events. Every change is stored:
    order_id=9284751, status='placed',    created_at=2026-03-17 14:00, op='c'
    order_id=9284751, status='confirmed', updated_at=2026-03-17 14:02, op='u'
    order_id=9284751, status='delivered', updated_at=2026-03-17 15:30, op='u'
  Bronze effectively stores all history needed for any SCD type.

SILVER LAYER — Current state (SCD Type 1 equivalent)
  Silver MERGE keeps one row per order_id — the most recent state.
  This is SCD Type 1: overwrite. No history in Silver itself.
  Silver.orders for order_id=9284751:
    order_id=9284751, status='delivered', created_at=2026-03-17 14:00
  If you need history: query Bronze directly.

SCD TYPE 2 IN SILVER — for entities that need historical state
  Some entities genuinely need SCD Type 2 in Silver.
  Example: customers change city and we need to know their city at order time.

  customers_scd2 table (Silver):
    customer_sk    ← surrogate key (unique per version)
    customer_id    ← business key (same across versions)
    city           ← tracked attribute
    valid_from     ← when this version became active
    valid_to       ← when this version was superseded (NULL = current)
    is_current     ← boolean flag for easy filtering

  dbt snapshot generates SCD2 automatically:
    -- snapshots/customers_snapshot.sql
    {% snapshot customers_snapshot %}
    {{ config(
        target_schema  = 'silver',
        unique_key     = 'customer_id',
        strategy       = 'check',
        check_cols     = ['city', 'tier'],   -- track changes to these columns
        invalidate_hard_deletes = True,
    ) }}
    SELECT customer_id, city, tier, updated_at
    FROM {{ source('silver', 'customers') }}
    {% endsnapshot %}
  dbt runs the snapshot, compares to current state, and:
    - If city changed: expires old row (sets valid_to = today)
                      inserts new row (valid_from = today, valid_to = NULL)
    - If unchanged: does nothing

GOLD LAYER — Point-in-time joins using SCD2
  The fct_orders model needs to know the customer's city
  AT THE TIME OF THE ORDER, not the current city.

  -- models/gold/fct_orders.sql
  SELECT
      o.order_id,
      o.customer_id,
      c.city            AS customer_city_at_order_time,
      o.order_amount,
      o.created_at
  FROM {{ ref('silver_orders') }} o
  -- SCD2 join: find the version of the customer active at order time
  JOIN {{ ref('customers_snapshot') }} c
    ON  o.customer_id = c.customer_id
    AND o.created_at BETWEEN c.valid_from
                         AND COALESCE(c.valid_to, '9999-12-31')

  This gives historically accurate customer city for every order.
  If Priya moved from Bangalore to Hyderabad on 2026-02-01:
    Orders before 2026-02-01: city = 'Bangalore'
    Orders from 2026-02-01:   city = 'Hyderabad'

IMPLEMENTATION DECISION TREE:
  Does the entity change over time?
    No:  SCD Type 1 in Silver (MERGE overwrite) — simplest
    Yes: Does the business need history?
      No:  SCD Type 1 in Silver — overwrite, no history needed
      Yes: Does Gold need point-in-time join accuracy?
        No:  Silver has current state, that's sufficient for reporting
        Yes: dbt snapshot → SCD Type 2 in Silver, Gold uses dated join`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 09 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Tracing a Wrong Revenue Number Back to the Root Cause</SectionTitle>

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
            Scenario — FreshMart · Finance team reports wrong revenue for March 15
          </div>

          <Para>
            The finance team reports that March 15th revenue in the dashboard
            shows ₹41,83,000 but the bank statement shows ₹42,15,400. The
            difference is ₹32,400 — 12 orders worth. You are asked to trace it.
          </Para>

          <CodeBox label="Layer-by-layer trace — finding the root cause">{`STEP 1: Check Gold — is the dashboard reading the right table?
SELECT SUM(net_revenue) FROM gold.daily_store_revenue
WHERE order_date = '2026-03-15';
-- Returns: ₹41,83,000  (confirms dashboard is reading correct Gold table)

STEP 2: Check Silver — does Silver match Gold?
SELECT SUM(order_amount - discount_amount) AS silver_net
FROM silver.orders
WHERE DATE(created_at AT TIME ZONE 'Asia/Kolkata') = '2026-03-15'
  AND status IN ('delivered', 'cancelled');
-- Returns: ₹41,83,000  (Gold and Silver agree)
-- Root cause is upstream of Gold — it is in Silver or Bronze.

STEP 3: Compare Silver row count to expected
SELECT COUNT(*) FROM silver.orders
WHERE DATE(created_at AT TIME ZONE 'Asia/Kolkata') = '2026-03-15';
-- Returns: 9,847 orders

SELECT COUNT(DISTINCT order_id) FROM source.orders
WHERE DATE(created_at AT TIME ZONE 'Asia/Kolkata') = '2026-03-15';
-- Returns: 9,859 orders  ← 12 orders missing in Silver!

-- The 12 missing orders × avg ₹2,700 = ₹32,400 — matches the gap exactly.

STEP 4: Identify the missing orders
SELECT s.order_id
FROM source.orders s
LEFT JOIN silver.orders sv USING (order_id)
WHERE DATE(s.created_at AT TIME ZONE 'Asia/Kolkata') = '2026-03-15'
  AND sv.order_id IS NULL;
-- Returns 12 order_ids. All have status='refunded'.

STEP 5: Check Silver validation rule
SELECT * FROM silver.orders
WHERE order_id IN (9284891, 9284892, ...)   -- the 12 missing ones
-- Returns nothing — they were rejected from Silver.

-- Check DLQ:
SELECT error_message, COUNT(*) FROM pipeline.dead_letter_queue
WHERE pipeline_name = 'orders_incremental'
  AND run_date = '2026-03-15'
  AND status = 'pending'
GROUP BY 1;
-- Returns:
-- invalid_status: 'refunded'  → 12 rows

-- Root cause found: the Silver validation rule has:
--   status IN ('placed','confirmed','delivered','cancelled')
-- 'refunded' was added to the source system on 2026-03-10
-- but was never added to the Silver validation allowlist.
-- 12 orders with status='refunded' were silently rejected to DLQ.

STEP 6: Fix
-- 1. Add 'refunded' to VALID_STATUSES in pipeline/validate.py
-- 2. Reprocess DLQ records for 2026-03-15:
python dlq_reprocess.py --pipeline orders_incremental --run-date 2026-03-15
-- 3. Silver is updated via MERGE — 12 new rows inserted.
-- 4. dbt run --select gold.daily_store_revenue --full-refresh (2026-03-15 partition)
-- 5. Dashboard now shows ₹42,15,400

TOTAL TIME: 24 minutes from investigation to resolved.
KEY ENABLER: The DLQ preserved the rejected records with their error reason.
Without DLQ: the 12 orders would have been silently lost with no trace.`}</CodeBox>

          <Para>
            The Medallion Architecture made this diagnosis possible. Bronze had
            the raw data. Silver had a clear rejection record in the DLQ. Gold
            was rebuilt from corrected Silver without re-extracting from source.
            The three-layer separation gave precise control over exactly which
            layer had the problem and exactly what to fix.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. Explain the Medallion Architecture. What belongs in each layer and why?',
            a: `The Medallion Architecture organises a data lakehouse into three progressively refined layers: Bronze, Silver, and Gold. Each layer makes stronger guarantees about data quality and fitness for use than the previous.

Bronze is the raw layer — it stores data exactly as it arrived from the source, with minimal transformation. The only operations are format conversion (JSON/CSV to Parquet), Hive-style partitioning for query efficiency, and adding ingestion metadata (ingested_at, source_system, pipeline_run_id). Bronze is append-only and immutable: once written, Bronze rows are never modified. It serves as the audit trail and the raw material for reprocessing. If a bug is found in the Silver transformation, Bronze provides the input to reprocess from.

Silver is the trusted layer — it contains the current state of every entity with quality guarantees. Transformations at the Bronze-to-Silver boundary include type casting every column to its authoritative type, deduplication (one row per business key, keeping the most recent), NULL enforcement on required fields, business value validation, and PII masking. Silver answers "what does this entity look like right now?" It uses MERGE semantics via Delta Lake so that late-arriving updates from Bronze are correctly reflected.

Gold is the business-ready layer — it contains pre-computed metrics, aggregations, and denormalised fact tables shaped for specific analytical consumers. All business logic (customer tier calculation, revenue attribution, cancellation rate) lives in Gold. Gold is built from Silver via dbt models and is rebuilt when Silver changes. Gold is never the source of truth — Silver always is.

The separation provides two key operational benefits: when data is wrong, the layer boundary localises where the problem is, making diagnosis fast. When a transformation bug is found months later, reprocessing from Bronze through Silver to Gold is possible without re-extracting from the source.`,
          },
          {
            q: 'Q2. Why is Silver "current state" while Bronze is "event history"? What does this mean practically?',
            a: `Bronze is append-only and stores every event that was ever sent about an entity — every INSERT, UPDATE, and DELETE from CDC, every version of a row that arrived. For an order that was placed, confirmed, and delivered, Bronze has three rows: the INSERT for placed, the UPDATE for confirmed, and the UPDATE for delivered.

Silver, in contrast, stores one row per business key — the current state of that entity. The three Bronze events for the order are collapsed by the Silver MERGE into a single row with status='delivered'. Silver answers the question "what is this order's current state?" Bronze answers "what happened to this order and in what sequence?"

Practically, this means Bronze table row counts are an order of magnitude higher than Silver. Bronze for a two-year-old platform might have 500 million rows representing 10 million current orders — the difference is all the UPDATE events accumulated over time. This is expected and correct.

The practical consequences are several. First, analysts always query Silver (and Gold), never Bronze. Bronze is too large and the update semantics are complex — you would need to deduplicate yourself. Second, when you need historical analysis (what was this customer's tier on 2026-01-01?), you query Bronze with an event_time filter or you use Silver's SCD Type 2 snapshot if one was configured. Third, reprocessing: if Silver has a bug that introduced wrong data over the last 30 days, you fix the transformation and re-run Silver from Bronze. The last 30 days of Bronze data re-flows through the corrected transformation without needing to re-extract from the source.

The architecture is specifically designed so that Bronze never needs to be regenerated from source — it is too expensive and often impossible (sources have their own retention policies). Bronze is the foundation that all higher layers are built on.`,
          },
          {
            q: 'Q3. How does dbt fit into the Medallion Architecture? What does it handle and what does it not handle?',
            a: `dbt handles the transformation layers — Bronze to Silver (staging models) and Silver to Gold (analytical models). It does not handle Bronze ingestion.

At the Bronze to Silver boundary, dbt staging models perform type casting, renaming, and light cleaning. Each staging model corresponds to one Bronze source table and applies only type coercions and normalisation — no joins, no aggregations. These models are typically materialised as views since they are always derived from Bronze.

Silver models proper use dbt's incremental materialisation with the merge strategy. The dbt model defines what constitutes a valid Silver row using SQL — the types, null checks, deduplication logic. dbt generates MERGE statements that update Silver from the staging view, handling new rows and updates via ON CONFLICT logic at the Delta Lake level.

Gold models use dbt table or incremental materialisations that join Silver tables and compute business metrics. The entire transformation chain from Silver to Gold — joins, aggregations, business rules, window functions — is expressed as SQL SELECT statements in dbt model files, version-controlled in git, testable with dbt test, and documented with lineage in dbt docs.

What dbt does not handle is the Bronze ingestion layer. Format conversion from JSON/CSV to Parquet, Hive-style partitioning, handling large-scale deduplication on billions of raw events, and PII encryption with custom Python libraries all require Spark or Python pipelines. The practical rule: if the transformation is a SQL SELECT that the warehouse can execute in reasonable time, use dbt. If it requires Python libraries, distributed compute for scale, or non-SQL operations, use a Spark/Python pipeline that writes to Bronze, and let dbt handle everything from Bronze onward.`,
          },
          {
            q: 'Q4. A Gold metric is wrong. Walk me through how the Medallion Architecture helps you diagnose and fix it.',
            a: `The Medallion Architecture makes diagnosis systematic by allowing layer-by-layer verification, isolating which layer has the problem.

First, I verify the Gold layer is reading the right source and producing the right calculation. I query the Gold table directly with the same filter and compare to the expected value. If Gold matches the expected value, the problem is in the downstream consumer (the BI tool's filter, a cached result, a wrong metric definition in the dashboard). If Gold is wrong, the problem is in the data itself.

Second, I check whether Silver agrees with Gold. I run the equivalent aggregation on Silver directly. If Silver matches Gold, the Gold transformation is correct and the bug is in Silver or Bronze. If Silver disagrees with Gold, the Gold transformation has a bug — a wrong join, an incorrect aggregation, a missing filter.

Third, if the problem is in Silver, I compare Silver row counts to the source. A lower count in Silver than source indicates rows were rejected. I check the DLQ — the rejection reason tells me exactly which validation rule is too strict. A higher count indicates duplicates — the deduplication logic has a gap.

Fourth, once I know which layer has the problem, the fix is localised. A Gold transformation bug: fix the dbt model, run dbt for the affected date range. A Silver validation bug: fix the validation rule, reprocess DLQ records with the corrected rule, run Silver MERGE to incorporate them. A Bronze ingestion bug: fix the Bronze pipeline, re-ingest from source, reprocess Bronze through Silver through Gold.

The key enabler in every case is the DLQ. Records rejected from Silver are not lost — they are in the DLQ with their error reason, timestamp, and the original raw record. This transforms "why are 12 records missing?" from a multi-hour investigation into a 5-minute DLQ query.`,
          },
          {
            q: 'Q5. How do you handle a new column added to the source system in a Medallion Architecture?',
            a: `A new source column propagates through the layers in a controlled way that the architecture is specifically designed to support.

At the Bronze layer, the new column is automatically captured if Bronze uses mergeSchema=true on Delta Lake writes. The Bronze pipeline reads the source data with schema inference, sees the new column, and Delta Lake accepts it via schema evolution. No Bronze pipeline code needs to change. The new column appears in Bronze from the first run after the source adds it.

At the Silver layer, the new column does not appear automatically. The dbt staging model explicitly selects columns — SELECT payment_id, amount, status FROM source. The new column is not in this SELECT, so it does not flow into Silver. This is intentional: Silver has an explicit, reviewed schema. Adding a new column to Silver requires a deliberate decision: what is this column, is it needed, should it be validated, does it contain PII that needs masking?

The process is: data engineer reviews the new Bronze column, decides whether to add it to Silver, updates the staging model SELECT to include it, adds appropriate tests to schema.yml (not_null if required, accepted_values if categorical), and opens a PR. The PR goes through code review. After merge and dbt run, Silver has the new column.

At the Gold layer, the new column is available once Silver has it. Gold models that need it are updated to include it in their SELECT or aggregation. If the column is not relevant to a Gold model, it is simply not selected.

This controlled propagation is why the architecture separates Bronze, Silver, and Gold. Bronze accepts any source schema change automatically, preserving raw data. Silver enforces a deliberate schema through code review. Gold only includes what is needed for each specific consumer. A schema change in the source never silently breaks Silver or Gold — it either flows through automatically (Bronze) or requires explicit code to flow further.`,
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
            error: `dbt incremental run fails — AnalysisException: cannot resolve 'refund_amount' given input columns — after source added a new column`,
            cause: 'A new column (refund_amount) was added to the source table and Bronze automatically captured it via mergeSchema=true. However, the dbt Gold model references refund_amount but the Silver model has not yet been updated to pass it through. dbt cannot resolve the column because it does not exist in Silver at query time.',
            fix: 'The correct sequence when a source adds a column: (1) Verify Bronze has it: SELECT refund_amount FROM bronze.payments LIMIT 1. (2) Update the Silver staging model (stg_payments.sql) to include refund_amount in the SELECT. (3) Add a dbt test in schema.yml for the new column. (4) Run dbt run --select stg_payments silver.payments to materialise Silver with the new column. (5) Then run the Gold model that references it. This controlled propagation — Bronze accepts automatically, Silver requires explicit code — is a feature, not a bug.',
          },
          {
            error: `Silver table has 300M rows but source only has 10M rows — Bronze-to-Silver pipeline seems to be appending instead of merging`,
            cause: 'The dbt Silver incremental model is configured with incremental_strategy="append" instead of incremental_strategy="merge". Every dbt run appended new rows rather than merging (upserting) on the business key. Over hundreds of runs, every order was inserted multiple times. The table now has 30× duplicates.',
            fix: 'Verify the config block: it must have incremental_strategy="merge" and unique_key="order_id". Correct it and run dbt run --select silver.orders --full-refresh to rebuild the Silver table from scratch using the merge strategy. The full-refresh rewrites the entire table from the stg_orders view, applying deduplication. After the fix, verify row count matches source count. Add an idempotency test to CI: run dbt twice and assert row count is unchanged.',
          },
          {
            error: `Gold daily revenue model shows different totals on different runs for the same date — results are not deterministic`,
            cause: 'The Gold model joins silver.orders to silver.customers and silver.customers is being updated between Gold model runs (new Silver pipeline runs between two consecutive Gold runs). The non-deterministic issue is that the customer dimension join is time-sensitive — a customer record that changed between runs produces different join results. The Gold model is reading "current" Silver state, which changes between runs.',
            fix: 'Gold models that compute historical aggregates (daily revenue for past dates) should not re-join to mutable dimension tables on every run. Two options: (1) Use a Silver SCD2 snapshot for the customer dimension join, so historical orders join to the customer state that was active at order time. (2) Include all necessary customer attributes in the Silver orders fact table at write time (denormalise into Silver). For Gold models computing current-period aggregates, the changing customer state is expected and correct — ensure the model has a clear definition of "current" vs "as-of" and document it.',
          },
          {
            error: `Bronze Delta OPTIMIZE takes 4 hours and holds a write lock — Silver pipeline cannot merge during the optimisation`,
            cause: 'OPTIMIZE runs a compaction job that rewrites files. In Delta Lake, OPTIMIZE acquires a write lock on the table while running. If OPTIMIZE is scheduled to run concurrently with the Silver pipeline that reads and merges from Bronze, Silver reads are blocked during the lock window. A 4-hour OPTIMIZE on a large Bronze table blocks Silver for 4 hours.',
            fix: 'Schedule OPTIMIZE during a maintenance window when no downstream pipelines are reading Bronze. Alternatively, use Delta Lake\'s OPTIMIZE with a specific date filter to compact only older partitions rather than the entire table: OPTIMIZE delta.`s3://bucket/bronze/orders` WHERE _bronze_date < CURRENT_DATE - 7. This compacts older partitions (not recently written ones) in a shorter window. Also consider increasing the Spark cluster size for OPTIMIZE to reduce its duration — a larger cluster runs compaction faster and holds the lock for less time.',
          },
          {
            error: `A Gold model is rebuilt every dbt run even though it is configured as incremental — every run says "23M rows written" rather than the expected delta`,
            cause: 'The incremental filter in the Gold model uses is_incremental() correctly but the condition filters on a column that is being updated on every Silver run (for example, silver_updated_at which changes for every row touched by any Silver MERGE). When Silver runs daily and updates 50,000 rows, the Gold model\'s incremental filter sees 50,000 rows as "new/changed" even though their Gold-relevant columns (order_date, revenue) have not changed.',
            fix: 'Refine the incremental filter to only select rows where the Gold-relevant columns have actually changed. Instead of WHERE silver_updated_at > last_gold_run, use WHERE order_amount_changed OR status_changed — track only the columns that affect Gold metrics. Alternatively, use a full rebuild (materialized="table") for Gold aggregate models that are small enough — if the Gold table is a few million rows, full rebuild takes seconds and is simpler than managing incremental state. Reserve incremental Gold for genuinely large fact tables (100M+ rows).',
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
        'The Medallion Architecture organises data into three layers with increasing quality guarantees. Bronze: raw and preserved. Silver: trusted, typed, deduplicated. Gold: business logic applied, ready to serve. Each layer has a contract — what it accepts, what it guarantees, who can use it.',
        'Bronze is append-only and immutable. It stores data exactly as received from the source. The only transformations are format conversion (to Parquet), Hive-style partitioning, and adding ingestion metadata. Never apply business logic, validation, or deduplication in Bronze.',
        'Silver is current entity state (one row per business key). Bronze is event history (all changes over time). The Silver MERGE collapses Bronze events into current state. For complete change history, query Bronze. For current state, query Silver. This separation is fundamental to the architecture.',
        'The Silver transformation checklist: type casting, deduplication with ROW_NUMBER(), NULL enforcement on required fields, business value validation, PII masking, referential validation. Rows that fail any check go to the DLQ — not to Silver, not silently discarded.',
        'Gold is built from Silver and is never the source of truth — Silver always is. When Gold is wrong, fix Silver and rebuild Gold. Gold serves specific consumers (finance dashboard, operations dashboard) — each Gold model is purpose-built, not a generic copy of Silver with aggregations.',
        'dbt handles Bronze→Silver staging and Silver→Gold transformations. Bronze ingestion (format conversion, partitioning) uses Spark/Python. Silver uses incremental materialisation with merge strategy. Gold uses table or incremental materialisation. The rule: SQL SELECT that fits in the warehouse → dbt. Python libraries, distributed compute, streaming → Spark/Python first.',
        'Late-arriving data is handled differently per layer. Bronze: append to current ingestion partition (preserve event_time from source). Silver: overlap window catches late Bronze rows, MERGE updates entity state. Gold: rebuild or merge on the affected date partition. The correct historical metric is restored without re-extracting from source.',
        'SCD handling in Medallion: Bronze has all history (any SCD type derivable). Silver defaults to SCD Type 1 (current state via MERGE). For dimensions that need history (customer city at order time), use dbt snapshots to create SCD Type 2 in Silver. Gold joins to the snapshot with date-range conditions for historically accurate point-in-time queries.',
        'Schema changes propagate in controlled steps. Bronze accepts new columns automatically (mergeSchema=true). Silver requires explicit code change (update the staging model SELECT, add tests, code review). Gold includes only what each consumer needs. A source schema change never silently breaks Silver or Gold — it is either automatic (Bronze) or requires deliberate code.',
        'The DLQ is the most valuable diagnostic tool in the Medallion Architecture. When Silver has fewer rows than expected, the DLQ shows exactly which rows were rejected and why. When a metric is wrong, the DLQ often contains the missing records with the validation error that explains the discrepancy. Without DLQ, missing data is invisible. With DLQ, it is queryable.',
      ]} />

    </LearnLayout>
  )
}