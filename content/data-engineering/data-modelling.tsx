import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Data Modelling — Dimensional Modelling, Star Schema, Facts and Dimensions | Chaduvuko',
  description: 'Data modelling for analytics — dimensional modelling from first principles, star schema, fact table types, dimension attributes, surrogate keys, conformed dimensions, and the modern wide-table pattern.',
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
  <div style={{ marginBottom: 24 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)

const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />

const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>{children}</div>
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
            <th key={h.label} style={{ padding: '10px 16px', textAlign: 'left', fontSize: i === 0 ? 10 : 11, fontWeight: 700, letterSpacing: i === 0 ? '.12em' : '.06em', textTransform: 'uppercase', color: h.color ?? 'var(--muted)', fontFamily: 'var(--font-mono)', borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)', background: h.color ? `${h.color}08` : 'var(--bg2)', minWidth: i === 0 ? 130 : 160 }}>{h.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
            {keys.map((k, ki) => (
              <td key={k} style={{ padding: '10px 16px', color: ki === 0 ? 'var(--muted)' : 'var(--text)', fontSize: ki === 0 ? 11 : 13, fontFamily: ki === 0 ? 'var(--font-mono)' : 'inherit', fontWeight: ki === 0 ? 700 : 400, textTransform: ki === 0 ? 'uppercase' : 'none', letterSpacing: ki === 0 ? '.06em' : 'normal', borderBottom: '1px solid var(--border)', borderLeft: ki > 0 && headers[ki]?.color ? `2px solid ${headers[ki].color}40` : ki > 0 ? '1px solid var(--border)' : 'none', verticalAlign: 'top' }}>{row[k]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default function DataModellingModule() {
  return (
    <LearnLayout
      title="Data Modelling — Dimensional Modelling, Star Schema, Facts and Dimensions"
      description="Dimensional modelling from first principles — grain, fact types, dimension design, surrogate keys, conformed dimensions, and the modern wide-table pattern."
      section="Data Engineering"
      readTime="65 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why the Model Determines Everything Downstream" />
        <SectionTitle>Data Modelling — The Design Decision That Compounds</SectionTitle>

        <Para>
          Data modelling is the discipline of organising data into structures that
          serve analytical questions efficiently and accurately. A poorly modelled
          Gold layer means analysts write complex SQL for simple questions, BI tools
          are slow, metrics disagree across reports, and the platform accrues
          technical debt that compounds every quarter. A well-modelled Gold layer
          means analysts answer new questions with familiar patterns, dashboards
          load in milliseconds, and the same metric always returns the same answer.
        </Para>

        <Para>
          This module covers dimensional modelling — the dominant approach for
          analytical data modelling since Ralph Kimball formalised it in the 1990s
          and still the most relevant framework for data engineers in 2026. It
          also covers the modern wide-table pattern that has emerged as a practical
          complement or replacement for star schemas in lakehouse architectures.
        </Para>

        <HighlightBox>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
            The three foundational concepts of dimensional modelling
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { concept: 'Facts', color: '#00e676', def: 'Measurements of business events — revenue, quantity, duration. Numeric. Stored in fact tables at the grain of one row per event.', example: 'One row per order. Columns: order_amount, discount_amount, delivery_fee.' },
              { concept: 'Dimensions', color: '#7b61ff', def: 'The context around a fact — who, what, where, when, why. Descriptive attributes joined to the fact table.', example: 'dim_customer: customer_id, name, city, tier. dim_store: store_id, name, city, region.' },
              { concept: 'Grain', color: '#f97316', def: 'The precise definition of what one row in the fact table represents. The most important design decision — all others follow from it.', example: '"One row per order line item" is a different grain from "one row per order."' },
            ].map((item) => (
              <div key={item.concept} style={{ background: 'var(--bg2)', border: `1px solid ${item.color}30`, borderTop: `3px solid ${item.color}`, borderRadius: 10, padding: '16px 18px' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 6 }}>{item.concept}</div>
                <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6, marginBottom: 8 }}>{item.def}</div>
                <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', borderTop: '1px solid var(--border)', paddingTop: 8 }}>e.g. {item.example}</div>
              </div>
            ))}
          </div>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 02 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Grain" />
        <SectionTitle>Grain — The Most Important Decision in Dimensional Modelling</SectionTitle>

        <Para>
          The grain of a fact table is the precise definition of what one row
          represents. Declaring the grain before any other design decision is the
          first and most critical step. Every column must be true at that grain.
          Violating the grain — mixing measurements at different levels of
          granularity — is the most common modelling mistake and the hardest to fix.
        </Para>

        <CodeBox label="Grain examples — declaring what one row represents">{`GRAIN EXAMPLES FOR A FOOD DELIVERY PLATFORM:

OPTION A: One row per order
  Grain declaration: "Each row represents one order placed by a customer"
  Valid fact columns at this grain:
    order_amount     ← total for this order ✓
    discount_amount  ← discount applied to this order ✓
    delivery_fee     ← delivery charge for this order ✓
    num_items        ← count of items in this order ✓
  Valid dimension FKs at this grain:
    customer_sk, store_sk, order_date_sk, payment_method_sk

  VIOLATES this grain:
    product_id  ✗ — an order has many products (that is the line-item grain)
    promo_code  ✗ — an order might have multiple promos

OPTION B: One row per order line item
  Grain declaration: "Each row represents one product line within one order"
  Valid facts: line_quantity, line_amount, line_discount
  Valid FKs:   order_sk, product_sk, customer_sk, store_sk, date_sk

  VIOLATES this grain:
    delivery_fee  ✗ — delivery applies to the whole order, not each line

OPTION C: One row per delivery event
  Grain: "Each row represents one delivery attempt for one order"
  Valid facts: delivery_duration_mins, distance_km, driver_rating

CHOOSING THE GRAIN:
  Ask: what business questions must be answered at the most atomic level?
  "What is total revenue by store per day?" → order grain ✓
  "Which products sell most?" → line item grain ✓

  RULE: declare the atomic grain first. Higher-level summaries are derived
  by aggregating. You CANNOT disaggregate — a sum at order level cannot
  tell you which product within the order contributed what.

  Common mistake: choosing order grain then adding product_id "sometimes."
  Adding product_id forces multiple rows per order → secretly changes grain
  to line-item without declaring it → SUM(order_amount) double-counts.
  Declare the grain explicitly and keep every column honest to it.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Fact Table Types" />
        <SectionTitle>Fact Tables — Four Types, Each for a Different Use Case</SectionTitle>

        <Para>
          Fact tables are not all alike. Kimball identified four distinct fact
          table types based on the nature of the business process being measured.
          Choosing the wrong type produces models that cannot answer the questions
          the business actually asks.
        </Para>

        <CodeBox label="The four fact table types — definitions and examples">{`FACT TABLE TYPE 1: TRANSACTION FACT TABLE (most common)
  One row per business transaction event.
  Immutable — once written, never updated.
  Row count grows with business volume.

  fct_orders:
    order_sk, customer_sk, store_sk, order_date_sk, payment_method_sk
    order_amount DECIMAL, discount_amount DECIMAL, delivery_fee DECIMAL
    num_items INT, is_first_order BOOLEAN

  Use when: measuring events that occurred — orders, payments, clicks.


FACT TABLE TYPE 2: PERIODIC SNAPSHOT FACT TABLE
  One row per entity per time period — state at regular intervals.
  Appends new snapshot for each period — does NOT replace old rows.
  Row count = entities × time periods.

  fct_daily_inventory:
    snapshot_date_sk INT, product_sk BIGINT, store_sk BIGINT
    units_on_hand INT, units_received INT, units_sold INT
    days_of_supply DECIMAL

  Use when: tracking ongoing state — inventory levels, account balances,
            open tickets. "How many?" questions at a specific point in time.


FACT TABLE TYPE 3: ACCUMULATING SNAPSHOT FACT TABLE
  One row per business process instance — updated as process progresses.
  Tracks lifecycle through multiple stages.
  Row count = number of process instances (not events).

  fct_order_fulfillment:
    order_sk BIGINT
    placed_date_sk INT, confirmed_date_sk INT
    picked_up_date_sk INT, delivered_date_sk INT, cancelled_date_sk INT
    current_status VARCHAR(20)
    confirm_lag_minutes DECIMAL, pickup_lag_minutes DECIMAL
    delivery_minutes DECIMAL, total_fulfillment_minutes DECIMAL

  Use when: tracking multi-step processes — order fulfillment, loan approvals.
  Rows are UPDATED as stages complete — unlike transaction facts.
  Multiple date FKs — one per stage.


FACT TABLE TYPE 4: FACTLESS FACT TABLE
  No numeric facts — just dimension FKs recording that an event occurred.

  fct_promotional_coverage:
    promo_date_sk INT, product_sk BIGINT
    store_sk BIGINT, promotion_sk BIGINT
    (no numeric columns — the ROW EXISTING is the fact)

  Use when: "Did this product run this promotion at this store on this date?"
            Bridge tables for many-to-many relationships between dimensions.
  Query: "which promoted products had zero sales?"
    LEFT JOIN fct_orders WHERE fct_orders.order_sk IS NULL`}</CodeBox>

        <SubTitle>Additive, semi-additive, and non-additive facts</SubTitle>

        <CodeBox label="Fact additivity — which facts can be summed across which dimensions">{`ADDITIVE: can be summed across ALL dimensions
  order_amount:  SUM across stores ✓  SUM across dates ✓  SUM across customers ✓
  delivery_fee:  fully additive
  Most numeric business measures are additive.
  Store atomic values — do NOT pre-aggregate in the fact table.

SEMI-ADDITIVE: can be summed across SOME dimensions (not time)
  units_on_hand (inventory):
    SUM across stores ✓ (total inventory across all stores on one day)
    SUM across dates  ✗ (Mon + Tue + Wed inventory is meaningless)
    For time dimension: use AVG, MAX, or MIN — never SUM.

  account_balance:
    SUM across accounts ✓, SUM across months ✗ (snapshot, not flows)

NON-ADDITIVE: cannot be meaningfully summed across ANY dimension
  is_first_order (boolean):    COUNT(WHERE is_first_order = TRUE)
  cancellation_rate (ratio):   compute from numerator/denominator at query time
  avg_order_value:             store order_amount + num_orders, compute AVG at query

  RULE: never store derived ratios or percentages in fact tables.
  Store components (numerator, denominator) and compute ratios at query time.
  Storing cancellation_rate = 0.12 is correct today, wrong if denominator changes.
  Storing cancellation_count=12 and order_count=100 is always correct.

DEGENERATE DIMENSIONS:
  A dimension with only one attribute (the key itself), no descriptive context.
  Store it directly in the fact table — no separate dimension table needed.
  Examples: order_number, invoice_number, transaction_id.
  fct_orders.order_number VARCHAR(50) — no dim_order_number table.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Dimension Tables" />
        <SectionTitle>Dimension Tables — The Context That Makes Facts Meaningful</SectionTitle>

        <Para>
          A fact without context is just a number. ₹380 has no analytical value
          until you know it was an order from a premium customer in Bangalore at
          a FreshCart store on a weekday evening. Dimension tables provide that
          context. Understanding what belongs in dimensions, how to structure them,
          and how surrogate keys work is essential for building models analysts can
          use intuitively.
        </Para>

        <CodeBox label="Dimension table design — attributes, hierarchies, and surrogate keys">{`DIMENSION TABLE: dim_customer

CREATE TABLE gold.dim_customer (
    customer_sk         BIGINT      NOT NULL PRIMARY KEY,  -- surrogate key
    customer_id         BIGINT      NOT NULL,              -- natural key
    customer_name       VARCHAR(200),
    email_hashed        VARCHAR(64) NOT NULL,   -- PII masked
    phone_masked        VARCHAR(20),
    registration_date   DATE,
    city                VARCHAR(100),
    state               VARCHAR(50),
    region              VARCHAR(50),            -- hierarchy: city → state → region
    tier                VARCHAR(20),            -- standard/silver/gold/platinum
    acquisition_channel VARCHAR(50),
    -- SCD Type 2 tracking:
    valid_from          DATE        NOT NULL,
    valid_to            DATE,                   -- NULL = current version
    is_current          BOOLEAN     NOT NULL DEFAULT TRUE,
    dim_updated_at      TIMESTAMPTZ NOT NULL
);


DIMENSION TABLE: dim_date (always pre-built, shared across all fact tables)

CREATE TABLE gold.dim_date (
    date_sk        INT  NOT NULL PRIMARY KEY,  -- integer YYYYMMDD: 20260317
    full_date      DATE NOT NULL,
    day_of_week    INT  NOT NULL,   -- 1=Monday, 7=Sunday
    day_name       VARCHAR(10),
    day_of_month   INT,
    week_of_year   INT,
    month_number   INT,
    month_name     VARCHAR(10),
    quarter        INT,
    year           INT,
    fiscal_year    INT,
    fiscal_quarter INT,
    is_weekday     BOOLEAN,
    is_weekend     BOOLEAN,
    is_holiday     BOOLEAN,
    holiday_name   VARCHAR(100),   -- 'Diwali', 'Independence Day', ...
    is_sale_day    BOOLEAN,
    season         VARCHAR(20)     -- 'festive', 'regular', 'summer'
);
-- Generate 2000-01-01 through 2030-12-31 (11,000 rows — tiny table)
-- dbt: {{ dbt_utils.date_spine(datepart="day", start_date="'2020-01-01'",
--         end_date="'2030-12-31'") }}


DIMENSION TABLE: dim_store (hierarchy embedded — denormalised)

CREATE TABLE gold.dim_store (
    store_sk       BIGINT      NOT NULL PRIMARY KEY,
    store_id       VARCHAR(10) NOT NULL,   -- natural key: 'ST001'
    store_name     VARCHAR(200),
    store_type     VARCHAR(50),            -- 'dark_store', 'franchise', 'owned'
    city           VARCHAR(100),
    city_tier      VARCHAR(10),            -- 'tier1', 'tier2', 'tier3'
    state          VARCHAR(50),
    region         VARCHAR(50),            -- hierarchy all in ONE table (not snowflaked)
    latitude       DECIMAL(9,6),
    longitude      DECIMAL(9,6),
    opening_date   DATE,
    is_active      BOOLEAN,
    city_population BIGINT,
    city_metro_area VARCHAR(100)
);

HIERARCHY DESIGN NOTE:
  dim_store embeds city, state, and region directly (denormalised).
  Do NOT create a separate dim_city table and join dim_store → dim_city.
  That is "snowflaking" — adds join complexity for negligible benefit.
  Analysts filter by dim_store.region — no extra join needed.`}</CodeBox>

        <SubTitle>Surrogate keys vs natural keys — why surrogates are non-negotiable</SubTitle>

        <CodeBox label="Surrogate keys — why they exist and how they protect the model">{`NATURAL KEY: identifier from the source system
  customer_id = 4201938  (from PostgreSQL application DB)
  store_id    = 'ST001'  (from store management system)

SURROGATE KEY: warehouse-generated integer, one per dimension row
  customer_sk = 1  (first row in dim_customer — Bangalore version)
  customer_sk = 2  (second row — same customer after moving to Hyderabad)

WHY SURROGATE KEYS ARE REQUIRED:

REASON 1: SCD Type 2 — each historical version needs a unique key
  Customer 4201938 moved from Bangalore to Hyderabad on 2026-02-01.
  dim_customer has two rows:
    customer_sk=1, customer_id=4201938, city='Bangalore', valid_from=2024-01-15, valid_to=2026-01-31
    customer_sk=2, customer_id=4201938, city='Hyderabad', valid_from=2026-02-01, valid_to=NULL

  Fact table stores customer_sk at load time:
    ORDER 9284751 placed 2026-01-10: stored customer_sk=1 → city='Bangalore' ✓
    ORDER 9284755 placed 2026-03-01: stored customer_sk=2 → city='Hyderabad' ✓

  Without surrogates: join on customer_id matches BOTH dimension rows.
  With is_current=TRUE filter: ALL orders show 'Hyderabad' — historically wrong.
  Surrogates are the only correct solution for point-in-time accuracy.

REASON 2: Source system independence
  Source migrates customer_id from integer to UUID in 2027.
  WITHOUT surrogate keys: must update millions of fact table FK columns.
  WITH surrogate keys: customer_sk=1 remains valid, unchanged.
  Only dim_customer.customer_id column changes — fact table untouched.

REASON 3: Multiple source system integration
  FreshCart acquires a competitor. Both had customer_id = 4201938.
  Surrogate keys: assign unique customer_sk per entity — no collision.
  Without surrogates: manual prefix/remap of all customer IDs — painful.

REASON 4: Join performance
  INTEGER FK joins faster than VARCHAR or UUID.
  Integer equality: O(1). VARCHAR: character-by-character comparison.

SURROGATE KEY GENERATION in dbt:
  {{ dbt_utils.generate_surrogate_key(['customer_id', 'valid_from']) }}
  Returns a deterministic hash — same input always produces same key.
  Enables idempotent dimension loads — safe to rerun without creating duplicates.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Star Schema" />
        <SectionTitle>Star Schema — The Centrepiece of Dimensional Modelling</SectionTitle>

        <Para>
          A star schema places one fact table at the centre, surrounded by
          dimension tables connected to it via foreign keys. The shape resembles
          a star. It is the standard structure for analytical models because it
          is queryable with simple, predictable SQL patterns and explains itself
          visually to analysts who are not data engineers.
        </Para>

        <CodeBox label="FreshCart orders star schema — structure and query pattern">{`STAR SCHEMA (ASCII diagram):

                        dim_date
                       (date_sk PK)
                            │ order_date_sk FK
                            │
dim_customer ── customer_sk FK ── fct_orders ── store_sk FK ── dim_store
(customer_sk PK)               ┌──────────────┐             (store_sk PK)
                               │ order_sk  PK │
               payment_sk FK──┤ customer_sk  │
                    │          │ store_sk     │
dim_payment_method │          │ date_sk      │
 (payment_sk PK) ──┘          │ payment_sk   │
                               │ order_amount │ ← FACTS
                               │ discount_amt │
                               │ delivery_fee │
                               │ num_items    │
                               └──────────────┘


CANONICAL STAR SCHEMA QUERY PATTERN:
SELECT
    d.year,
    d.month_name,
    s.city,
    s.region,
    c.tier                                   AS customer_tier,
    SUM(f.order_amount)                      AS gross_revenue,
    SUM(f.discount_amount)                   AS total_discount,
    SUM(f.order_amount - f.discount_amount)  AS net_revenue,
    COUNT(DISTINCT f.order_sk)               AS order_count,
    COUNT(DISTINCT f.customer_sk)            AS unique_customers
FROM gold.fct_orders f
JOIN gold.dim_date           d  ON f.order_date_sk    = d.date_sk
JOIN gold.dim_store          s  ON f.store_sk          = s.store_sk
JOIN gold.dim_customer       c  ON f.customer_sk       = c.customer_sk
JOIN gold.dim_payment_method p  ON f.payment_method_sk = p.payment_sk
WHERE d.year     = 2026
  AND d.quarter  = 1
  AND s.region   = 'South India'
  AND c.is_current = TRUE
GROUP BY 1, 2, 3, 4, 5
ORDER BY 1, 2;

WHY STAR SCHEMA QUERIES ARE FAST:
  1. Fact table has only integer FKs and numeric facts — narrow, fast to scan.
  2. Dimension joins use integer equality — fastest join type.
  3. Filter on dim attributes prunes dimensions first:
     WHERE s.region = 'South India' → 2 store rows → only their fact rows scanned.
  4. Aggregations operate on pre-filtered fact subsets — small, fast.
  5. Columnar storage: only joined FK columns + aggregate columns read from disk.

STAR VS SNOWFLAKE SCHEMA:
  3NF (snowflaked): store → city → state → region (3 extra joins for region)
  Star (correct):   region is a column in dim_store (0 extra joins)

  VERDICT: always star. Snowflake schemas add join complexity for negligible benefit.
  Dimension tables are small — redundant city names in dim_store cost bytes, not GBs.
  Use snowflake schema only when the dimension itself has millions of rows.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Conformed Dimensions" />
        <SectionTitle>Conformed Dimensions — The Integration Layer</SectionTitle>

        <Para>
          A conformed dimension is shared across multiple fact tables with identical
          structure and meaning. When dim_customer is used in both fct_orders and
          fct_payments with the same surrogate keys and the same attributes, it is
          conformed. This enables drilling across fact tables — comparing order
          metrics to payment metrics for the same customer in the same query.
        </Para>

        <CodeBox label="Conformed dimensions — enabling cross-process analysis">{`CONFORMED DIMENSION: dim_customer shared across two fact tables

  fct_orders                    fct_payments
  ┌──────────────┐             ┌──────────────┐
  │ customer_sk ─┼──────┐ ┌───┼─ customer_sk │
  │ order_amount │      │ │   │ payment_amt  │
  └──────────────┘      ▼ ▼   └──────────────┘
                   ┌─────────────┐
                   │ dim_customer│ ← CONFORMED: same table, same SK, same meaning
                   │ customer_sk │   used by BOTH fact tables
                   │ tier, city  │
                   └─────────────┘

CROSS-PROCESS QUERY:
  -- Payment success rate by customer tier:
  SELECT
      c.tier,
      COUNT(DISTINCT o.order_sk)       AS total_orders,
      COUNT(DISTINCT p.payment_sk)     AS successful_payments,
      ROUND(COUNT(DISTINCT p.payment_sk)::NUMERIC
          / COUNT(DISTINCT o.order_sk), 3) AS payment_success_rate
  FROM gold.fct_orders o
  JOIN gold.dim_customer c USING (customer_sk)
  LEFT JOIN gold.fct_payments p ON o.order_sk = p.order_sk
  WHERE p.status = 'captured' OR p.status IS NULL
  GROUP BY c.tier;
  -- Works ONLY because customer_sk=1 means the same customer in BOTH marts.

WHAT BREAKS CROSS-PROCESS ANALYSIS:
  Each mart builds its own customer dimension with different SK numbering:
    customer_sk=1 in orders mart = customer 4201938
    customer_sk=1 in payments mart = customer 4201939 ← DIFFERENT CUSTOMER
  Cross-mart join produces nonsense silently.

CONFORMED dim_date: ALWAYS conformed. Every fact table uses the same dim_date.
  Never build a separate date dimension per fact table.
  date_sk=20260317 means March 17, 2026 everywhere.

JUNK DIMENSIONS:
  Low-cardinality flags that do not belong in any existing dimension:
    is_promo_order (Y/N), is_late_delivery (Y/N), is_first_order (Y/N)
  Consolidate into a single "junk dimension" table:

  CREATE TABLE gold.dim_order_flags (
      order_flags_sk   INT  PRIMARY KEY,  -- pre-built all combinations
      is_promo_order   BOOLEAN,
      is_late_delivery BOOLEAN,
      is_first_order   BOOLEAN,
      is_weekend_order BOOLEAN
  );
  -- 16 rows for 4 boolean flags (2^4)
  -- Fact table: one FK order_flags_sk → replaces 4 individual columns`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Wide Table Pattern" />
        <SectionTitle>Wide Tables — The Practical Alternative to Star Schemas</SectionTitle>

        <Para>
          The star schema was designed for row-oriented databases where joins
          were expensive. Columnar lakehouse engines (Spark, BigQuery, Databricks)
          are efficient at joins — but they excel even more at scanning wide tables
          because column pruning eliminates unused column I/O. This has led to the
          wide table (One Big Table / OBT) pattern as a practical complement or
          replacement for star schemas.
        </Para>

        <CodeBox label="Wide table pattern — design, queries, and trade-offs">{`WIDE TABLE (OBT — One Big Table):
  All dimension attributes denormalised into a single, very wide fact table.
  No joins required at query time.

  fct_orders_wide (80 columns, no joins needed):
  ┌──────────────────────────────────────────────────────────────────┐
  │ ORDER: order_id, order_amount, discount_amount, delivery_fee,   │
  │        num_items, status, created_at, order_date, order_tier    │
  │ CUSTOMER: customer_id, customer_tier, customer_city, region,    │
  │           acquisition_channel                                    │
  │ STORE: store_id, store_name, store_city, store_type, store_region│
  │ PAYMENT: payment_method, payment_status, captured_at            │
  │ DELIVERY: delivery_minutes, delivery_partner, driver_rating      │
  └──────────────────────────────────────────────────────────────────┘

WIDE TABLE QUERY:
  SELECT store_region, customer_tier, SUM(order_amount) AS revenue
  FROM gold.fct_orders_wide
  WHERE order_date = '2026-03-17'
  GROUP BY 1, 2;
  -- ZERO joins. Columnar storage: only the 4 columns above read from disk.

WHEN WIDE TABLES WIN:
  ✓ Non-technical analysts / auto-generated BI SQL — no joins to learn
  ✓ Columnar lakehouse engines — wide scans are efficient
  ✓ Moderate data volume (< 100M rows) — storage duplication acceptable
  ✓ Attributes change slowly — SCD2 in a wide table is complex

WHEN STAR SCHEMA WINS:
  ✓ Attributes change frequently — SCD2 simpler with separate dim tables
  ✓ Multiple fact tables at different grains — cannot embed all into one table
  ✓ Very large fact tables (billions of rows) — redundant attributes cost storage
  ✓ Complex cross-process analysis via conformed dimensions

THE PRAGMATIC HYBRID (2026 recommendation):
  Build star schema for the canonical model (SCD2, conformed dimensions).
  Derive a wide table for BI tool consumption:

  -- models/gold/fct_orders_wide.sql
  SELECT
      f.*,
      c.tier AS customer_tier, c.city AS customer_city, c.region AS customer_region,
      s.store_name, s.store_region,
      p.payment_method
  FROM gold.fct_orders f
  JOIN gold.dim_customer       c ON f.customer_sk       = c.customer_sk
  JOIN gold.dim_store          s ON f.store_sk          = s.store_sk
  JOIN gold.dim_payment_method p ON f.payment_method_sk = p.payment_sk
  -- Analysts query fct_orders_wide.
  -- Modelling rigour lives in the star schema.
  -- Best of both worlds.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — dbt for Dimensional Modelling" />
        <SectionTitle>Implementing Dimensional Models in dbt</SectionTitle>

        <CodeBox label="dbt dimensional model — dim_customer with SCD2 and surrogate keys">{`-- snapshots/customers_snapshot.sql
{% snapshot customers_snapshot %}
{{ config(
    target_schema = 'snapshots',
    unique_key    = 'customer_id',
    strategy      = 'check',
    check_cols    = ['city', 'state', 'tier', 'acquisition_channel'],
    invalidate_hard_deletes = True,
) }}
SELECT customer_id, customer_name, email_hashed, city, state, tier,
       acquisition_channel, registration_date, updated_at
FROM {{ source('silver', 'customers') }}
WHERE is_current = TRUE
{% endsnapshot %}


-- models/gold/dims/dim_customer.sql
{{ config(materialized='table', unique_key='customer_sk') }}

WITH snapshot AS (SELECT * FROM {{ ref('customers_snapshot') }})
SELECT
    {{ dbt_utils.generate_surrogate_key(['customer_id', 'dbt_valid_from']) }}
        AS customer_sk,
    customer_id,
    INITCAP(TRIM(customer_name))        AS customer_name,
    email_hashed,
    LOWER(TRIM(city))                   AS city,
    LOWER(TRIM(state))                  AS state,
    CASE
        WHEN state IN ('Karnataka','Tamil Nadu','Kerala','Andhra Pradesh','Telangana') THEN 'South'
        WHEN state IN ('Maharashtra','Gujarat','Goa') THEN 'West'
        WHEN state IN ('Delhi','Uttar Pradesh','Haryana','Punjab','Rajasthan') THEN 'North'
        ELSE 'East'
    END                                 AS region,
    tier,
    acquisition_channel,
    registration_date,
    dbt_valid_from                      AS valid_from,
    dbt_valid_to                        AS valid_to,
    CASE WHEN dbt_valid_to IS NULL THEN TRUE ELSE FALSE END AS is_current,
    CURRENT_TIMESTAMP()                 AS dim_updated_at
FROM snapshot


-- models/gold/facts/fct_orders.sql
{{ config(
    materialized='incremental',
    unique_key='order_sk',
    incremental_strategy='merge',
    file_format='delta',
) }}

WITH orders AS (
    SELECT * FROM {{ ref('silver_orders') }}
    {% if is_incremental() %}
        WHERE updated_at > (SELECT MAX(order_updated_at) FROM {{ this }})
    {% endif %}
)
SELECT
    {{ dbt_utils.generate_surrogate_key(['o.order_id']) }} AS order_sk,
    -- Dimension surrogate keys (looked up at load time):
    c.customer_sk,
    s.store_sk,
    d.date_sk                                              AS order_date_sk,
    COALESCE(p.payment_sk, -1)                             AS payment_method_sk,
    -- Degenerate dimension:
    o.order_id,
    -- Additive facts:
    o.order_amount,
    o.discount_amount,
    o.delivery_fee,
    o.num_items,
    o.order_amount - o.discount_amount                     AS net_revenue,
    -- Non-additive flags:
    o.is_first_order,
    o.has_promo,
    -- Audit:
    o.created_at    AS order_created_at,
    o.updated_at    AS order_updated_at,
    CURRENT_TIMESTAMP() AS fact_loaded_at
FROM orders o
JOIN {{ ref('dim_date') }}     d ON DATE(o.created_at) = d.full_date
JOIN {{ ref('dim_customer') }} c ON o.customer_id = c.customer_id
                                 AND o.created_at BETWEEN c.valid_from
                                 AND COALESCE(c.valid_to, '9999-12-31')
JOIN {{ ref('dim_store') }}    s ON o.store_id = s.store_id
LEFT JOIN {{ ref('dim_payment_method') }} p ON o.payment_method = p.payment_method_name`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 09 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Two Dashboards, Same Month, Different Revenue — The Modelling Root Cause</SectionTitle>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Scenario — FreshCart · Finance and Operations report different March revenue
          </div>

          <Para>
            Finance reports March revenue as ₹4.21 crore. Operations reports ₹3.87 crore.
            Same company, same month — ₹34 lakh difference. The CEO asks for an explanation.
          </Para>

          <CodeBox label="Diagnosing the metrics disagreement">{`-- Finance dashboard SQL (Metabase auto-generated):
SELECT SUM(order_amount) FROM fct_orders
WHERE order_date >= '2026-03-01' AND order_date < '2026-04-01';
-- Returns: 4.21 crore

-- Operations dashboard SQL (analyst hand-written):
SELECT SUM(order_amount) FROM fct_orders f
JOIN dim_date d ON f.order_date_sk = d.date_sk
WHERE d.month_name = 'March' AND d.year = 2026
  AND f.status = 'delivered';
-- Returns: 3.87 crore

-- TWO DIFFERENCES FOUND:
-- 1. Finance includes ALL statuses. Operations filters to 'delivered' only.
-- 2. Are the date ranges identical?

-- Check status breakdown:
SELECT status, SUM(order_amount) AS revenue
FROM fct_orders
WHERE order_date >= '2026-03-01' AND order_date < '2026-04-01'
GROUP BY 1 ORDER BY 2 DESC;
-- placed:     0.12 crore  ← Finance includes (not yet delivered)
-- confirmed:  0.08 crore  ← Finance includes
-- delivering: 0.06 crore  ← Finance includes
-- delivered:  3.87 crore  ← Operations reports only this ✓
-- cancelled:  0.08 crore  ← Finance includes CANCELLED orders!

-- Root cause: both queries are "correct" — they measure different things.
-- Finance: GMV (all orders placed)
-- Operations: completed revenue (delivered only)
-- But BOTH are labelled "March revenue" — that is the problem.

-- MODELLING FIX: define canonical metric in dbt, one place:
-- models/gold/metrics/mrt_monthly_revenue.sql
SELECT
    d.year, d.month_number, d.month_name,
    SUM(CASE WHEN f.status = 'delivered' THEN f.order_amount ELSE 0 END)
        AS delivered_revenue,
    SUM(CASE WHEN f.status != 'cancelled' THEN f.order_amount ELSE 0 END)
        AS gross_order_value,
    SUM(CASE WHEN f.status = 'cancelled' THEN f.order_amount ELSE 0 END)
        AS cancelled_value
FROM fct_orders f
JOIN dim_date d USING (order_date_sk)
GROUP BY 1, 2, 3;

-- Both Finance and Operations now query mrt_monthly_revenue.
-- Finance: SELECT delivered_revenue + in_progress_value AS gmv
-- Operations: SELECT delivered_revenue
-- The SAME number. The disagreement is eliminated structurally.`}</CodeBox>

          <Para>
            The root cause was not a data quality issue — it was a missing canonical
            metric definition. Centralising business logic in a dbt Gold model
            eliminated the disagreement. No pipeline work would have fixed this —
            it required a modelling decision.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is a star schema? How does it differ from a normalised 3NF model and why is it preferred for analytics?',
            a: `A star schema is a dimensional modelling design that places one fact table at the centre, surrounded by dimension tables connected via foreign key relationships. Each dimension table contains all attributes related to one business entity fully denormalised — store, customer, product, date each in their own wide flat table.

A normalised 3NF model eliminates all data redundancy by decomposing tables so each non-key attribute depends only on the primary key. A customer's city is stored once in a city table, referenced by the customer table, referenced by the fact table — requiring three joins to get from an order to the customer's city. 3NF is optimal for OLTP where writes and data integrity are critical.

For analytics, the star schema wins for three reasons. First, query simplicity: a star schema query has a predictable pattern — fact table joined to dimension tables — that any analyst can learn in an hour. The same question in 3NF might require 8-12 joins across normalised tables. Second, performance: joining the fact table to four wide dimension tables via integer foreign keys is fast in a columnar warehouse. Joining through 12 normalised tables with multiple conditions is significantly slower. Third, analyst usability: BI tools like Tableau and Power BI work best with flat, wide dimension tables.

The trade-off is storage — dimension tables store redundant data. In columnar storage with compression, city names with dictionary encoding cost bytes, not megabytes. The analytical benefit far exceeds the minimal storage cost.`,
          },
          {
            q: 'Q2. What is the grain of a fact table and why must it be declared before any other design decision?',
            a: `The grain is the precise declaration of what one row represents — "each row represents one order line item placed by one customer at one store on one date." This definition must be unambiguous and stated before any column is chosen.

The grain must come first because every subsequent decision depends on it. Every dimension added must have a single value at the declared grain. If grain is "one row per order" and you add product_id, you face an immediate problem — one order has multiple products. Adding product_id forces multiple rows per order, secretly changing the grain to "one row per order line item." This corrupts all aggregations: SUM(order_amount) double-counts revenue.

The grain also determines which facts are valid. At order grain, order_amount and delivery_fee are valid single values per order. At line-item grain, line_amount and line_quantity are valid, but delivery_fee is not — delivery applies to the whole order.

Practically, I write the grain declaration as a comment at the top of every dbt fact model before writing any SQL. This prevents grain drift as new columns are added — anyone proposing a new column must verify it is true at the declared grain.`,
          },
          {
            q: 'Q3. Why are surrogate keys used in dimensional models instead of natural keys from source systems?',
            a: `Surrogate keys are warehouse-generated integers assigned to each row in a dimension table. They are required for four reasons.

First and most important, SCD Type 2 support. When a dimension attribute changes and historical accuracy is required, the dimension table stores multiple rows for the same natural key — one per version. Customer 4201938 lived in Bangalore, then moved to Hyderabad — dim_customer has two rows, one per city. Without surrogate keys, the fact table cannot distinguish which version of the customer a historical order should join to. With surrogate keys (customer_sk=1 for Bangalore, customer_sk=2 for Hyderabad), orders placed in Bangalore join to customer_sk=1 and correctly show Bangalore. Point-in-time accuracy is only possible with surrogates.

Second, source system independence. If the source migrates customer_id from integer to UUID, only dim_customer.customer_id changes. The surrogate key and all fact table foreign keys are unaffected — no millions of fact rows to update.

Third, multiple source system integration. When two companies merge and both had customer_id=1, surrogate keys assign unique warehouse-generated identifiers to each, preventing collisions.

Fourth, join performance. Integer foreign keys join faster than VARCHARs or UUIDs — smaller index pages, O(1) equality comparison.`,
          },
          {
            q: 'Q4. What is a conformed dimension and why does it matter for enterprise analytics?',
            a: `A conformed dimension is shared across multiple fact tables with identical structure and identical meaning. dim_date is the canonical example — every fact table uses the same dim_date, and date_sk=20260317 means March 17, 2026 in the orders fact table, the payments fact table, the inventory fact table, and every other.

The importance is that conformed dimensions enable cross-process analysis — comparing metrics from different business processes in a single query. If an analyst wants the payment success rate by customer tier for orders in Q1, they must join fct_orders to fct_payments through a common customer dimension. This works correctly only if both fact tables use the same customer_sk values from the same dim_customer. If each data mart built its own customer dimension with its own surrogate key numbering, customer_sk=1 would mean different customers in different marts — a cross-process join produces nonsense.

In Kimball's terminology, conformed dimensions are what make a collection of star schemas into a "data warehouse bus architecture" — a coherent enterprise analytical platform rather than disconnected data marts.

In practice, conformance requires discipline. dim_customer is owned by one team, one pipeline, one definition. Any team building a new fact table involving customers uses the conformed dim_customer — they do not build their own. The cost is coordination. The benefit is correct cross-process analysis that is otherwise impossible.`,
          },
          {
            q: 'Q5. When would you use a wide table (OBT) instead of a star schema? What are the trade-offs?',
            a: `A wide table (One Big Table) embeds all dimension attributes directly alongside fact columns, eliminating joins at query time. A 80-column table containing all order, customer, store, and payment attributes replaces a fact table joined to four dimension tables.

I would choose a wide table in four situations. First, when the primary consumers are non-technical analysts or BI tools that generate SQL automatically — many tools cannot generate correct multi-join SQL but always generate correct GROUP BY on a single table. Second, when the workload is primarily self-service analytics on a columnar engine: Spark, BigQuery, Databricks read only the queried columns, so a 40-column table queried on 5 columns reads 5 columns worth of data regardless of the width. Third, when data volumes are moderate and duplication cost is acceptable — storing store_region on every order row costs storage but saves query complexity. Fourth, when attributes change slowly — SCD Type 2 in a wide table requires updating every order row when a customer changes city, which is complex.

The star schema wins when attributes change frequently and historical accuracy requires SCD Type 2 (much simpler with a separate dim_customer), when multiple fact tables at different grains need cross-querying through shared conformed dimensions, when data volume is very large (redundant dimension attributes across billions of fact rows has real cost), or when the team has strong dimensional modelling expertise to maintain.

The pragmatic 2026 approach is a hybrid: build the canonical model as a star schema for SCD2 support and modelling rigour, then derive a wide table for BI tool consumption using a dbt model that joins all dimensions. Analysts query the wide table. The model is maintained through the star schema. You get the rigour of dimensional modelling and the simplicity of wide table queries.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
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
            error: `Revenue dashboard shows 3× expected value — COUNT(order_id) returns 2,847,291 but COUNT(DISTINCT order_id) returns 48,234 on the same fact table`,
            cause: 'The fct_orders dbt model joins to a dimension table that has multiple rows per natural key — most likely dim_customer or dim_payment_method with SCD Type 2 rows — and the join uses the natural key without filtering to is_current = TRUE. Each fact row now matches multiple dimension rows (one per historical version), creating fan-out. Three versions of a customer dimension row means three fact rows per order, tripling revenue.',
            fix: 'Always join fact tables to SCD Type 2 dimensions using the surrogate key (customer_sk), not the natural key (customer_id). The surrogate key stored in the fact table at load time uniquely identifies exactly one dimension version — no fan-out possible. Fix the load process to look up the correct surrogate at fact load time using the date-range join: JOIN dim_customer c ON o.customer_id = c.customer_id AND o.order_date BETWEEN c.valid_from AND COALESCE(c.valid_to, \'9999-12-31\'). Add a dbt test: assert COUNT(DISTINCT order_id) = COUNT(*) on fct_orders to catch this immediately.',
          },
          {
            error: `Point-in-time join fails — all orders show the customer\'s current city even for orders placed years ago when the customer lived in a different city`,
            cause: 'The fct_orders model joins to dim_customer using the natural key customer_id and filters WHERE c.is_current = TRUE. This always joins to the current version of each customer, so all historical orders — even those placed five years ago — show the customer\'s current city. The point-in-time accuracy that SCD Type 2 is designed to provide is completely lost.',
            fix: 'The fact table must store the customer_sk (surrogate key) at load time, not the customer_id. The surrogate key lookup at load time uses the date-range join to find the active version: the customer_sk stored in the fact table for a 2021 order is the surrogate that was valid in 2021. At query time, join simply on customer_sk — no date range, no is_current filter — and you get the historically correct customer version automatically.',
          },
          {
            error: `Finance and Operations both query "revenue" but return different numbers for the same month — one shows ₹4.21 crore, the other ₹3.87 crore`,
            cause: 'There is no single canonical definition of "revenue" in the data model. Finance queries SUM(order_amount) with no status filter, including placed, cancelled, and in-progress orders. Operations queries only delivered orders. Both are using fct_orders but applying different business rules — neither is technically wrong, but the metric name "revenue" has two different definitions across two teams.',
            fix: 'Create a canonical dbt metrics layer that defines each business metric exactly once. A Gold dbt model mrt_monthly_revenue defines delivered_revenue (status=\'delivered\'), gross_order_value (all non-cancelled), and cancelled_value explicitly. Both Finance and Operations query the canonical model — they choose the appropriate column for their use case but can no longer accidentally define the metric differently. This is a modelling fix, not a pipeline fix.',
          },
          {
            error: `dbt snapshot is not capturing dimension changes — dim_customer always shows original values, never reflects updates to customer city or tier`,
            cause: 'The dbt snapshot is correctly configured with check_cols=[\'city\', \'tier\'] but the source Silver customers table does not update when customers change these attributes. The application updates a separate customer_addresses table and a customer_tiers table, but not the main customers table that the snapshot reads from. Since the source view never changes, the snapshot never creates new version rows.',
            fix: 'Update the Silver source view that feeds the dbt snapshot to JOIN customers with customer_addresses and customer_tiers, exposing the current values from the correct source tables. When a customer updates their address, the combined source view now reflects the change, and the snapshot detects it and creates a new SCD2 version row with the updated city. The snapshot configuration does not change — only the source it reads from.',
          },
          {
            error: `Star schema query that used to run in 30 seconds now takes 12 minutes after new analysts were given access — the query plan shows a Cartesian product`,
            cause: 'An analyst wrote a cross-mart query that forgot the JOIN condition between fct_orders and dim_customer. Without ON f.customer_sk = c.customer_sk, the query produces a Cartesian product: every order row × every customer row. With 48,000 orders and 10,000 customers, the result is 480,000,000 rows before any filter. The missing JOIN condition is a classic SQL error that becomes catastrophic at scale.',
            fix: 'Always specify every JOIN condition explicitly. For complex multi-table queries, add a data quality gate: after the join, assert that row count matches the fact table row count before any filters. In dbt: use the not_null and relationships tests to catch FK violations before they reach production. For the Cartesian product incident: add a query timeout and row count limit at the warehouse level (Snowflake: STATEMENT_TIMEOUT_IN_SECONDS, BigQuery: maximum bytes billed) to prevent runaway queries from consuming all compute budget.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)', marginBottom: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '8px 12px', lineHeight: 1.5 }}>{item.error}</div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'Dimensional modelling organises analytical data into facts (measurements of business events — numeric) and dimensions (context — who, what, where, when). The grain declares exactly what one row in the fact table represents and must be declared before any other design decision.',
        'Declare the grain first and keep every column honest to it. Every fact column must be a single value at the declared grain. Every dimension FK must apply at that grain. Mixing measurements at different granularities in the same fact table corrupts aggregations and is the hardest modelling error to fix after the fact.',
        'Four fact table types: Transaction (one row per business event — immutable), Periodic Snapshot (one row per entity per period — appended, tracks state over time), Accumulating Snapshot (one row per process lifecycle — updated as stages complete, multiple date FKs), Factless (no numeric facts — records that an event occurred or a relationship exists).',
        'Additive facts sum across all dimensions. Semi-additive facts sum across some dimensions but not time (inventory levels — use AVG for time periods). Non-additive facts cannot be summed at all (ratios, booleans). Store component numerators and denominators, compute ratios at query time — never store pre-computed percentages in fact tables.',
        'Surrogate keys (warehouse-generated integers) are required for: SCD Type 2 point-in-time joins (each historical dimension version needs a unique key), source system independence (source key changes don\'t propagate to fact FKs), multiple source integration (no natural key collisions), and join performance (integer equality is fastest).',
        'Star schema: fact table at the centre, denormalised dimension tables connected via integer FKs. All hierarchy levels in one dimension table row. Simple, predictable SQL. Snowflake schemas (normalised dimensions) add join complexity for negligible benefit — avoid them for analytical Gold layers.',
        'Conformed dimensions are shared across multiple fact tables with identical structure and meaning. dim_date is always conformed. Conformed dimensions enable cross-process analysis — comparing orders to payments for the same customer correctly. Non-conformed dimensions make cross-mart queries produce wrong results silently.',
        'Wide tables (OBT) embed all dimension attributes into a single table — zero joins at query time. Best for self-service analysts, BI tools, and columnar engines. Star schemas are better for SCD Type 2, multiple fact tables at different grains, and very large fact tables. The hybrid approach: star schema for canonical model + derived wide table for BI consumption.',
        'In dbt: use dbt_utils.generate_surrogate_key() for deterministic hash-based surrogate keys, dbt snapshots with strategy="check" for SCD Type 2 dimension tables, incremental materialisation with merge strategy for large fact tables, and the date-range join for point-in-time fact-to-dimension lookups.',
        'Centralise business logic in dbt Gold models. A "revenue" metric disagreement between Finance and Operations (₹4.21 crore vs ₹3.87 crore) is always a missing canonical definition problem, not a data quality problem. One dbt model defines delivered_revenue, gross_order_value, and cancelled_value — both teams query the canonical model and can no longer accidentally apply different filters to the same metric name.',
      ]} />

    </LearnLayout>
  )
}