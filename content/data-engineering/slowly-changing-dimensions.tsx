import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Slowly Changing Dimensions (SCD) — Data Engineering | Chaduvuko',
  description:
    'Every SCD type in depth — Type 0 through Type 7, when each is the right choice, full SQL implementations, dbt snapshot patterns, and the operational pitfalls nobody warns you about.',
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
            <th key={h.label} style={{ padding: '10px 16px', textAlign: 'left', fontSize: i === 0 ? 10 : 11, fontWeight: 700, letterSpacing: i === 0 ? '.12em' : '.06em', textTransform: 'uppercase', color: h.color ?? 'var(--muted)', fontFamily: 'var(--font-mono)', borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)', background: h.color ? `${h.color}08` : 'var(--bg2)', minWidth: i === 0 ? 120 : 140 }}>{h.label}</th>
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

export default function SlowlyChangingDimensionsModule() {
  return (
    <LearnLayout
      title="Slowly Changing Dimensions (SCD)"
      description="Every SCD type in depth — when each is the right choice, full SQL implementations, dbt snapshot patterns, and the operational pitfalls."
      section="Data Engineering"
      readTime="60 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — The Core Problem ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Core Problem" />
        <SectionTitle>The Problem SCD Solves — When Dimension Attributes Change</SectionTitle>

        <Para>
          Dimension tables describe business entities — customers, stores, products,
          employees. These entities are not static. A customer moves from Bangalore
          to Hyderabad. A store changes its manager. A product gets recategorised
          from "snacks" to "premium snacks." A salesperson moves from one region
          to another.
        </Para>

        <Para>
          When a dimension attribute changes, you face a design question: what
          should happen to the historical facts that reference the old value? Should
          past orders show the customer's old city or their new city? Should
          historical sales reports show the product in its old category or its
          new one? The answer depends on the business question being answered —
          and "slowly changing dimension" patterns are the formalised set of answers.
        </Para>

        <HighlightBox>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
            The seven SCD types — one-line summary each
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { type: 'Type 0', color: '#888888', summary: 'Fixed — attribute never changes once set.' },
              { type: 'Type 1', color: '#00e676', summary: 'Overwrite — update in place, no history kept.' },
              { type: 'Type 2', color: '#7b61ff', summary: 'Add row — full history preserved via multiple rows.' },
              { type: 'Type 3', color: '#f97316', summary: 'Add column — keep one level of history in a separate column.' },
              { type: 'Type 4', color: '#4285f4', summary: 'History table — separate table for all historical versions.' },
              { type: 'Type 6', color: '#ffd700', summary: 'Hybrid (1+2+3) — current and historical in the same row.' },
              { type: 'Type 7', color: '#ff4757', summary: 'Dual key — both current and historical access via two FKs.' },
            ].map((item) => (
              <div key={item.type} style={{ background: 'var(--bg2)', border: `1px solid ${item.color}30`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 4 }}>{item.type}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{item.summary}</div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <Callout type="tip">
          Type 5 is not listed — it was defined in some Kimball texts as a
          "mini-dimension" pattern but is rarely used in practice and not in
          the standard Kimball curriculum. Types 0, 1, 2, 3, 4, 6, and 7 are
          the canonical set. Types 1, 2, and 6 cover the vast majority of
          real-world use cases.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 — SCD Type 0 and 1 ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Type 0 and Type 1" />
        <SectionTitle>Type 0 — Fixed, and Type 1 — Overwrite</SectionTitle>

        <SubTitle>SCD Type 0 — Fixed attributes</SubTitle>

        <Para>
          Type 0 attributes never change after initial load. They represent
          immutable facts about the entity. If a value arrives that differs
          from what is already stored, it is ignored — the original value is
          the correct one by definition.
        </Para>

        <CodeBox label="SCD Type 0 — immutable attributes, no update ever">{`TYPE 0 EXAMPLES:
  customer.registration_date    ← when the customer first registered (never changes)
  customer.original_city        ← city where the customer first signed up (immutable)
  store.opening_date            ← when the store opened (historical fact, fixed)
  product.sku                   ← product identifier (never reassigned)
  employee.hire_date            ← when they joined the company

TYPE 0 IMPLEMENTATION:
  On dimension load: INSERT new rows, NEVER update Type 0 columns.

  -- dbt Silver model for customers:
  INSERT INTO silver.customers (customer_id, registration_date, ...)
  VALUES (...)
  ON CONFLICT (customer_id) DO UPDATE SET
      -- Type 0 columns NOT in the update list:
      -- registration_date = EXCLUDED.registration_date  ← omitted intentionally
      -- Type 1 columns in the update list:
      city    = EXCLUDED.city,
      tier    = EXCLUDED.tier,
      updated_at = EXCLUDED.updated_at
  ;
  -- registration_date is never overwritten even if source sends a different value.

  -- Verification: confirm no Type 0 column was ever changed
  SELECT customer_id, COUNT(DISTINCT registration_date) AS date_versions
  FROM dimension_history_table
  GROUP BY customer_id
  HAVING COUNT(DISTINCT registration_date) > 1;
  -- Returns: 0 rows — if any rows returned, a Type 0 column was changed incorrectly.`}</CodeBox>

        <SubTitle>SCD Type 1 — Overwrite</SubTitle>

        <Para>
          Type 1 overwrites the existing value with the new value. No history
          is preserved — the dimension always shows the current state. Historical
          fact rows that were loaded when the old value was active now show the
          new value when joined to the dimension.
        </Para>

        <CodeBox label="SCD Type 1 — overwrite in place, no history kept">{`TYPE 1 EXAMPLES:
  customer.phone_number         ← updated when customer changes phone
  customer.email                ← updated when customer updates email
  store.manager_name            ← current manager (past manager irrelevant to most reports)
  product.description           ← updated when product copy is revised
  store.is_active               ← current operational status

TYPE 1 WHEN TO USE:
  ✓ The old value was genuinely wrong (data correction)
  ✓ History is not needed — reports always want current value
  ✓ The attribute has no analytical significance historically
  ✗ When historical accuracy matters for past events
    (then use Type 2 instead)

TYPE 1 IMPLEMENTATION:
  -- Upsert that overwrites changed attributes:
  INSERT INTO dim_store
      (store_sk, store_id, store_name, manager_name, is_active, updated_at)
  VALUES
      (1, 'ST001', 'FreshCart Koramangala', 'Rahul Sharma', TRUE, NOW())
  ON CONFLICT (store_id)
  DO UPDATE SET
      manager_name = EXCLUDED.manager_name,   -- Type 1: always overwrite
      is_active    = EXCLUDED.is_active,       -- Type 1: always overwrite
      updated_at   = EXCLUDED.updated_at
  ;

  EFFECT ON HISTORICAL FACT ROWS:
    Before update: manager = 'Priya Nair'
    After update:  manager = 'Rahul Sharma' (overwritten)

    fct_orders joined to dim_store WHERE store_id = 'ST001':
    ALL historical orders now show manager_name = 'Rahul Sharma'
    — even orders placed when Priya Nair was the manager.

    This is the correct behaviour for Type 1.
    If you want historical orders to show who the manager was at the time,
    you need Type 2 — Type 1 explicitly gives up that capability.

TYPE 1 IN dbt:
  -- Silver models use incremental merge with no special SCD logic:
  {{ config(materialized='incremental', unique_key='store_id',
            incremental_strategy='merge') }}
  -- All tracked columns are in the merge update set.
  -- No valid_from, valid_to, or is_current needed for Type 1.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — SCD Type 2 ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — SCD Type 2 (the most important)" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{ background: 'rgba(123,97,255,0.12)', border: '2px solid #7b61ff', borderRadius: 10, padding: '6px 14px', fontSize: 13, fontWeight: 900, color: '#7b61ff', fontFamily: 'var(--font-mono)' }}>TYPE 2</div>
          <h2 style={{ fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', margin: 0, fontFamily: 'var(--font-display)' }}>SCD Type 2 — Full History Preserved</h2>
        </div>

        <Para>
          SCD Type 2 is the most important and most widely used SCD pattern.
          When a tracked attribute changes, a new row is inserted for the new
          version, and the old row is expired with a valid_to date. The dimension
          table accumulates one row per version per entity. The surrogate key
          uniquely identifies each version, enabling fact tables to join to the
          exact version that was active at the time of the fact.
        </Para>

        <SubTitle>Type 2 — the complete data model and change mechanics</SubTitle>

        <CodeBox label="SCD Type 2 — full implementation with version tracking">{`DIM_CUSTOMER WITH SCD TYPE 2:

Initial state — customer 4201938 registered from Bangalore:
  customer_sk  customer_id  city        tier      valid_from   valid_to    is_current
  ───────────────────────────────────────────────────────────────────────────────────
  1            4201938      Bangalore   silver    2024-01-15   NULL        TRUE

Customer places order 9284751 on 2024-06-10:
  fct_orders: order_sk=..., customer_sk=1, order_amount=380  ← joins to row 1

Customer moves to Hyderabad, updates profile on 2026-02-01:

CHANGE OPERATION:
  -- Step 1: expire the current row
  UPDATE dim_customer
  SET valid_to   = '2026-01-31',
      is_current = FALSE
  WHERE customer_id = 4201938
    AND is_current  = TRUE;

  -- Step 2: insert the new version
  INSERT INTO dim_customer
      (customer_sk, customer_id, city, tier, valid_from, valid_to, is_current)
  VALUES
      (2, 4201938, 'Hyderabad', 'silver', '2026-02-01', NULL, TRUE);

RESULTING TABLE STATE:
  customer_sk  customer_id  city        tier    valid_from   valid_to    is_current
  ────────────────────────────────────────────────────────────────────────────────
  1            4201938      Bangalore   silver  2024-01-15   2026-01-31  FALSE  ← expired
  2            4201938      Hyderabad   silver  2026-02-01   NULL        TRUE   ← current

Customer places order 9284755 on 2026-03-01:
  fct_orders: order_sk=..., customer_sk=2, order_amount=460  ← joins to row 2

POINT-IN-TIME QUERIES:

-- What city was customer 4201938 in when they placed order 9284751 (2024-06-10)?
SELECT c.city
FROM fct_orders f
JOIN dim_customer c ON f.customer_sk = c.customer_sk
WHERE f.order_sk = <order_sk_for_9284751>;
-- Returns: 'Bangalore' ← correct — the fact stored customer_sk=1 at load time

-- What is customer 4201938's current city?
SELECT city FROM dim_customer
WHERE customer_id = 4201938 AND is_current = TRUE;
-- Returns: 'Hyderabad' ← correct

-- Revenue by customer city, historically accurate:
SELECT c.city, SUM(f.order_amount)
FROM fct_orders f
JOIN dim_customer c ON f.customer_sk = c.customer_sk
GROUP BY c.city;
-- order_sk from 2024: joins to customer_sk=1 → Bangalore
-- order_sk from 2026: joins to customer_sk=2 → Hyderabad
-- Both cities get credit for orders placed when the customer was there ✓

WRONG APPROACH (joining on natural key with is_current):
  JOIN dim_customer c ON f.customer_id = c.customer_id AND c.is_current = TRUE
  -- This joins ALL orders (including 2024 ones) to the CURRENT version
  -- The 2024 Bangalore order now shows 'Hyderabad' — historically wrong ✗`}</CodeBox>

        <SubTitle>Type 2 — choosing which attributes to track</SubTitle>

        <Para>
          Not every dimension attribute should be Type 2. Applying Type 2 to
          all attributes creates excessive historical versions and makes queries
          complex. The decision rule is simple: does a change in this attribute
          affect the interpretation of historical facts?
        </Para>

        {[
          { attr: 'customer.city', type2: 'Yes', reason: 'Revenue attribution by city requires knowing where the customer was when they ordered. A customer who moved from Bangalore to Hyderabad should have their Bangalore-period orders counted in Bangalore\'s revenue.' },
          { attr: 'customer.tier', type2: 'Yes', reason: 'Customer tier at the time of purchase drives cohort analysis. Was this order placed when they were a silver or gold customer? The answer affects churn and upgrade analysis.' },
          { attr: 'store.manager_name', type2: 'Maybe', reason: 'If the business asks "how did each manager perform during their tenure?" — Type 2. If historical manager accuracy is never needed — Type 1.' },
          { attr: 'customer.phone_number', type2: 'No', reason: 'Contact information — reports never ask "what was the customer\'s phone number when they placed that order?" Type 1 is correct.' },
          { attr: 'product.price', type2: 'Careful', reason: 'Product dimension should NOT store price — price changes so frequently it belongs in the fact table as a measured amount, not a dimension attribute.' },
          { attr: 'store.is_active', type2: 'No', reason: 'Operational flag. Historical orders from a closed store are still valid historical data. Type 1 is fine — the store\'s current active status does not affect the historical analysis.' },
        ].map((row, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto 2fr', gap: 12, padding: '10px 16px', background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)', borderRadius: 6, marginBottom: 4, alignItems: 'start' }}>
            <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>{row.attr}</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: row.type2 === 'Yes' ? '#7b61ff' : row.type2 === 'No' ? 'var(--muted)' : '#f97316', fontFamily: 'var(--font-mono)' }}>{row.type2}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{row.reason}</div>
          </div>
        ))}

        <div style={{ marginTop: 24 }}>
          <SubTitle>Type 2 — handling multiple changes in one load</SubTitle>
        </div>

        <CodeBox label="Type 2 — the full load procedure for production pipelines">{`# PRODUCTION TYPE 2 LOAD PROCEDURE (Python):
# Handles: new entities, Type 2 tracked changes, Type 1 changes

def load_dim_customer_scd2(
    source_rows: list[dict],
    dest_conn,
    type2_columns: list[str],   # ['city', 'tier']
    type1_columns: list[str],   # ['phone_masked', 'email_hashed']
) -> dict:
    """
    Load dimension with SCD Type 2 for tracked columns.
    Type 2 columns: expire old row + insert new row on change.
    Type 1 columns: update in-place on current row (no new row).
    """
    stats = {'new': 0, 'type2_change': 0, 'type1_change': 0, 'unchanged': 0}

    for row in source_rows:
        customer_id = row['customer_id']

        # Find existing current row:
        existing = dest_conn.execute("""
            SELECT * FROM dim_customer
            WHERE customer_id = %s AND is_current = TRUE
        """, (customer_id,)).fetchone()

        if existing is None:
            # New entity — insert first version:
            sk = generate_surrogate_key(customer_id, row['updated_at'])
            dest_conn.execute("""
                INSERT INTO dim_customer
                    (customer_sk, customer_id, city, tier, phone_masked,
                     valid_from, valid_to, is_current)
                VALUES (%s, %s, %s, %s, %s, %s, NULL, TRUE)
            """, (sk, customer_id, row['city'], row['tier'],
                  row['phone_masked'], row['updated_at'].date()))
            stats['new'] += 1
            continue

        # Check Type 2 columns for changes:
        type2_changed = any(
            row[col] != existing[col] for col in type2_columns
        )

        if type2_changed:
            # Expire old row:
            dest_conn.execute("""
                UPDATE dim_customer
                SET valid_to = %s, is_current = FALSE
                WHERE customer_sk = %s
            """, (row['updated_at'].date() - timedelta(days=1), existing['customer_sk']))

            # Insert new version:
            sk = generate_surrogate_key(customer_id, row['updated_at'])
            dest_conn.execute("""
                INSERT INTO dim_customer
                    (customer_sk, customer_id, city, tier, phone_masked,
                     valid_from, valid_to, is_current)
                VALUES (%s, %s, %s, %s, %s, %s, NULL, TRUE)
            """, (sk, customer_id, row['city'], row['tier'],
                  row['phone_masked'], row['updated_at'].date()))
            stats['type2_change'] += 1

        else:
            # No Type 2 change — check Type 1:
            type1_changed = any(
                row[col] != existing[col] for col in type1_columns
            )
            if type1_changed:
                # Update in place (no new row, no expiry):
                dest_conn.execute("""
                    UPDATE dim_customer
                    SET phone_masked = %s, dim_updated_at = NOW()
                    WHERE customer_sk = %s
                """, (row['phone_masked'], existing['customer_sk']))
                stats['type1_change'] += 1
            else:
                stats['unchanged'] += 1

    dest_conn.commit()
    return stats`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — SCD Type 2 in dbt ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Type 2 in dbt" />
        <SectionTitle>SCD Type 2 in dbt — Snapshots</SectionTitle>

        <Para>
          dbt provides first-class support for SCD Type 2 through its snapshot
          feature. A dbt snapshot monitors a source query for changes to specified
          columns and automatically manages the valid_from, valid_to, and
          is_current columns. It is the standard way to implement Type 2 dimensions
          in a dbt-based platform.
        </Para>

        <CodeBox label="dbt snapshot — complete Type 2 implementation with both strategies">{`-- STRATEGY 1: timestamp — detects changes via an updated_at column
-- Use when: source table has a reliable updated_at timestamp

-- snapshots/customers_snapshot.sql
{% snapshot customers_snapshot %}
{{ config(
    target_database = 'freshmart_prod',
    target_schema   = 'snapshots',
    unique_key      = 'customer_id',
    strategy        = 'timestamp',
    updated_at      = 'updated_at',      -- column dbt monitors for changes
    invalidate_hard_deletes = True,      -- expire rows when source row disappears
) }}
SELECT
    customer_id,
    customer_name,
    email_hashed,
    city,
    state,
    tier,
    acquisition_channel,
    registration_date,
    updated_at
FROM {{ source('silver', 'customers') }}
WHERE is_current = TRUE
{% endsnapshot %}

-- dbt adds these columns automatically:
--   dbt_scd_id       VARCHAR  — unique ID per version (hash of key + dbt_valid_from)
--   dbt_updated_at   TIMESTAMP — when dbt last processed this row
--   dbt_valid_from   TIMESTAMP — when this version became active
--   dbt_valid_to     TIMESTAMP — when this version expired (NULL = current)


-- STRATEGY 2: check — compares column values directly
-- Use when: no reliable updated_at, or when you need to track specific columns only

{% snapshot customers_snapshot %}
{{ config(
    target_schema  = 'snapshots',
    unique_key     = 'customer_id',
    strategy       = 'check',
    check_cols     = ['city', 'tier'],   -- ONLY these columns trigger a new version
    -- Changing phone_masked does NOT create a new version (Type 1 for that column)
    invalidate_hard_deletes = True,
) }}
SELECT * FROM {{ source('silver', 'customers') }}
{% endsnapshot %}


-- HOW dbt SNAPSHOT RUNS:
-- dbt snapshot reads the source query
-- For each row, checks if any check_cols changed since last run
-- If changed: expires old row (sets dbt_valid_to = NOW())
--             inserts new row (dbt_valid_from = NOW(), dbt_valid_to = NULL)
-- If unchanged: no action
-- If row disappeared from source AND invalidate_hard_deletes=True:
--   expires the current row (marks it as deleted)


-- BUILDING dim_customer FROM THE SNAPSHOT:
-- models/gold/dims/dim_customer.sql
{{ config(materialized='table') }}

WITH snapshot AS (
    SELECT * FROM {{ ref('customers_snapshot') }}
)
SELECT
    {{ dbt_utils.generate_surrogate_key(['customer_id', 'dbt_valid_from']) }}
        AS customer_sk,
    customer_id,
    customer_name,
    email_hashed,
    city,
    CASE
        WHEN state IN ('Karnataka','Tamil Nadu','Kerala','Andhra Pradesh','Telangana')
        THEN 'South'
        WHEN state IN ('Maharashtra','Gujarat','Goa') THEN 'West'
        WHEN state IN ('Delhi','Uttar Pradesh','Haryana','Punjab','Rajasthan') THEN 'North'
        ELSE 'East'
    END                                    AS region,
    tier,
    acquisition_channel,
    registration_date,
    CAST(dbt_valid_from AS DATE)           AS valid_from,
    CAST(dbt_valid_to AS DATE)             AS valid_to,
    CASE WHEN dbt_valid_to IS NULL THEN TRUE ELSE FALSE END AS is_current
FROM snapshot


-- RUNNING SNAPSHOTS:
-- dbt snapshot                     ← run all snapshots
-- dbt snapshot -s customers_snapshot  ← run one snapshot

-- IMPORTANT: dbt snapshot should run MORE FREQUENTLY than dbt run.
-- If a customer changes city twice in one day and snapshot only runs nightly:
--   the intermediate city is never captured — only the final day-end state.
-- For high-change dimensions: run snapshot every 15-30 minutes.`}</CodeBox>

        <SubTitle>Snapshot backfill — what to do when deploying Type 2 to an existing table</SubTitle>

        <CodeBox label="dbt snapshot initial deploy — backfilling history">{`CHALLENGE: you are deploying SCD Type 2 on the customers dimension for the
first time. The dimension currently exists as a Type 1 table (no history).
You need to populate the snapshot with the existing customer data.

OPTION A: full-refresh (simplest, loses any history that existed)
  dbt snapshot --full-refresh
  This drops and recreates the snapshot table from scratch.
  All existing customers get one row with:
    dbt_valid_from = NOW()
    dbt_valid_to   = NULL
    is_current     = TRUE
  Result: going forward, all changes are captured. Past history: lost.
  Acceptable when: no meaningful historical changes existed before this point.

OPTION B: seed historical versions from a separate data source
  If you have an audit log, CDC history in Bronze, or source system history:
  Build a seed file or staging model with historical versions:
    customer_id  city         tier    updated_at
    4201938      Bangalore    silver  2024-01-15  ← original registration
    4201938      Hyderabad    silver  2026-02-01  ← after move

  Manually insert these into the snapshot table in the correct format
  BEFORE running dbt snapshot for the first time.
  Then dbt snapshot manages all future changes.

OPTION C: change_cols detection requires source data to carry history
  If the Silver customers table has change history (via CDC + Bronze):
    Create a staging model that produces one row per version:
    SELECT customer_id, city, tier,
           change_timestamp AS updated_at
    FROM silver.customers_cdc_history
    ORDER BY customer_id, change_timestamp
  Point the dbt snapshot at this staging model.
  dbt snapshot processes each row, creating version rows as they appear.
  Result: full historical SCD2 table built from CDC history.

MONITORING SNAPSHOT HEALTH:
  -- Check how many version rows exist per customer:
  SELECT customer_id, COUNT(*) AS version_count
  FROM customers_snapshot
  GROUP BY customer_id
  ORDER BY version_count DESC
  LIMIT 20;
  -- If max versions > 50: investigate — rapid changes may indicate bad data

  -- Check for gaps in valid_from/valid_to continuity:
  SELECT customer_id
  FROM customers_snapshot
  WHERE dbt_valid_to IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM customers_snapshot s2
        WHERE s2.customer_id = customers_snapshot.customer_id
          AND s2.dbt_valid_from = customers_snapshot.dbt_valid_to
    )
  -- Returns rows where an expired version has no successor — data gap`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — SCD Type 3 ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — SCD Type 3" />
        <SectionTitle>SCD Type 3 — Previous Value in a Separate Column</SectionTitle>

        <Para>
          Type 3 adds a column to store the previous value of a tracked attribute,
          alongside the current value. It captures exactly one change — the current
          value and the immediately preceding value. It sacrifices full history for
          simplicity and the ability to query both current and previous values from
          a single row without any joins.
        </Para>

        <CodeBox label="SCD Type 3 — implementation and limitations">{`TYPE 3 TABLE STRUCTURE:
  dim_customer:
    customer_sk       BIGINT PRIMARY KEY
    customer_id       BIGINT
    city              VARCHAR(100)         ← CURRENT city
    previous_city     VARCHAR(100)         ← PREVIOUS city (one level back)
    city_changed_at   DATE                 ← when the city last changed
    tier              VARCHAR(20)          ← CURRENT tier
    previous_tier     VARCHAR(20)          ← PREVIOUS tier
    ...

INITIAL STATE:
  customer_sk  customer_id  city        previous_city  tier    previous_tier
  1            4201938      Bangalore   NULL           silver  NULL

CUSTOMER MOVES TO HYDERABAD (2026-02-01):
  UPDATE dim_customer
  SET previous_city    = city,          -- save current → previous
      city             = 'Hyderabad',   -- new current
      city_changed_at  = '2026-02-01'
  WHERE customer_id = 4201938;

RESULTING ROW:
  customer_sk  customer_id  city         previous_city  tier    previous_tier
  1            4201938      Hyderabad    Bangalore      silver  NULL

QUERIES ENABLED BY TYPE 3:
  -- Revenue from customers who recently moved to each city:
  SELECT
      city                                    AS current_city,
      SUM(CASE WHEN f.order_date > c.city_changed_at THEN f.order_amount ELSE 0 END)
          AS revenue_after_move,
      previous_city                           AS came_from
  FROM fct_orders f
  JOIN dim_customer c USING (customer_sk)
  WHERE c.city_changed_at IS NOT NULL   -- only customers who have moved
  GROUP BY 1, 3;

TYPE 3 LIMITATIONS:
  ✗ Only one level of history (current + previous)
     If customer moves again (Hyderabad → Mumbai):
       previous_city becomes Hyderabad (Bangalore is LOST)
  ✗ No point-in-time accuracy for fact table joins
     All orders always join to the same single row — no version control
     A 2024 order in Bangalore and a 2026 order in Hyderabad both join
     to the same row (current city = Mumbai eventually)
  ✗ Works only when the change trajectory is: old → new (two states)
     Not suitable for attributes that change frequently

TYPE 3 WHEN TO USE:
  ✓ When you need a simple "compare current vs previous" view
  ✓ When the attribute changes at most once or twice in the entity's lifetime
  ✓ When simplicity is more important than full history
  ✓ Common use case: sales territory reassignment
     salesperson.territory: shows current territory + previous territory
     "How did revenue change after the territory reshuffle?"

TYPE 3 IS RARELY THE BEST CHOICE:
  Type 1: history not needed
  Type 2: full point-in-time history needed
  Type 3: somewhere between — often superseded by Type 6 (hybrid)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — SCD Type 4 and 6 ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Type 4 and Type 6" />
        <SectionTitle>Type 4 — History Table, and Type 6 — The Hybrid</SectionTitle>

        <SubTitle>SCD Type 4 — separate history table</SubTitle>

        <Para>
          Type 4 keeps the current dimension table small and fast by separating
          all historical versions into a separate history table. The main
          dimension always contains only the current version. The history table
          contains all previous versions. This pattern is useful when the main
          dimension table is queried frequently for current values and must remain
          as lean as possible.
        </Para>

        <CodeBox label="SCD Type 4 — current table plus separate history table">{`TYPE 4 STRUCTURE:

dim_customer (current versions only — lean table):
  customer_sk  customer_id  city       tier    updated_at
  ──────────────────────────────────────────────────────
  1            4201938      Hyderabad  silver  2026-02-01

dim_customer_history (all historical versions):
  customer_history_sk  customer_id  city       tier    valid_from   valid_to
  ────────────────────────────────────────────────────────────────────────────
  100                  4201938      Bangalore  silver  2024-01-15   2026-01-31
  101                  4201938      Hyderabad  silver  2026-02-01   NULL

BENEFITS:
  dim_customer stays small → fast for current-state queries
  dim_customer_history contains full history → available for audit / time travel

WHEN TYPE 4 IS USEFUL:
  ✓ Very large dimension tables where adding version rows slows down current queries
  ✓ When 95% of queries only need current values and the history table is rarely joined
  ✓ Compliance / audit use cases where a separate history table is required by policy

LIMITATION:
  More complex to query — must choose between dim_customer (current) and
  dim_customer_history (full history) depending on use case.
  Most teams prefer Type 2 — the version rows in one table is simpler.`}</CodeBox>

        <SubTitle>SCD Type 6 — the hybrid (Type 1 + Type 2 + Type 3)</SubTitle>

        <Para>
          Type 6 combines Types 1, 2, and 3 in a single row. It preserves full
          historical accuracy (Type 2) while also making the current value of
          a tracked attribute available in every row (Type 1 overwrite) and
          storing the previous value in a separate column (Type 3). The result
          is a dimension that supports both historical analysis and simple
          current-state queries without joins to the current row.
        </Para>

        <CodeBox label="SCD Type 6 — the hybrid approach in practice">{`TYPE 6 TABLE STRUCTURE:

dim_customer (Type 6 — history + current value in every row):
  customer_sk      BIGINT PK      ← unique per version (surrogate)
  customer_id      BIGINT         ← natural key
  city             VARCHAR        ← city AS OF THIS VERSION (historical accuracy)
  current_city     VARCHAR        ← current city for all versions (Type 1 overwrite)
  previous_city    VARCHAR        ← previous city (Type 3)
  tier             VARCHAR        ← tier AS OF THIS VERSION
  current_tier     VARCHAR        ← current tier for all versions
  valid_from       DATE           ← when this version became active
  valid_to         DATE           ← when this version expired (NULL = current)
  is_current       BOOLEAN

TABLE STATE (customer moved Bangalore → Hyderabad):
  customer_sk  customer_id  city       current_city  valid_from   valid_to    is_current
  ──────────────────────────────────────────────────────────────────────────────────────
  1            4201938      Bangalore  Hyderabad     2024-01-15   2026-01-31  FALSE
  2            4201938      Hyderabad  Hyderabad     2026-02-01   NULL        TRUE

NOTE: current_city = 'Hyderabad' in BOTH rows, even the historical row.
      city        = 'Bangalore' in the historical row (point-in-time accurate).

QUERIES ENABLED BY TYPE 6:
  -- Historical revenue by city (point-in-time accurate):
  SELECT c.city AS historical_city, SUM(f.order_amount)
  FROM fct_orders f JOIN dim_customer c ON f.customer_sk = c.customer_sk
  GROUP BY c.city;
  -- Uses c.city (the version-specific city) ← historically correct ✓

  -- Current revenue by city (where customers ARE TODAY):
  SELECT c.current_city, SUM(f.order_amount)
  FROM fct_orders f JOIN dim_customer c ON f.customer_sk = c.customer_sk
  GROUP BY c.current_city;
  -- Uses c.current_city ← all orders attributed to Hyderabad (where customer is now) ✓
  -- No need to join only to is_current=TRUE rows — current_city is in every row

  -- Both queries from ONE fact table join — no separate dim query needed.
  -- This is Type 6's key advantage over Type 2 alone.

UPDATE PROCEDURE (when city changes):
  -- Step 1: update current_city in ALL existing rows for this customer:
  UPDATE dim_customer
  SET current_city = 'Hyderabad'    -- Type 1 overwrite on all versions
  WHERE customer_id = 4201938;

  -- Step 2: expire the current row + insert new version (Type 2):
  UPDATE dim_customer
  SET valid_to = '2026-01-31', is_current = FALSE
  WHERE customer_id = 4201938 AND is_current = TRUE;

  INSERT INTO dim_customer
      (customer_sk, customer_id, city, current_city, valid_from, valid_to, is_current)
  VALUES (2, 4201938, 'Hyderabad', 'Hyderabad', '2026-02-01', NULL, TRUE);

  dbt SNAPSHOT does NOT natively support Type 6.
  Type 6 requires a custom dbt macro or a Python pipeline.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — SCD Type 7 ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — SCD Type 7" />
        <SectionTitle>SCD Type 7 — Dual Foreign Keys in the Fact Table</SectionTitle>

        <Para>
          Type 7 solves the same problem as Type 6 — enabling both historical
          and current-state queries — but using two foreign keys in the fact table
          rather than redundant columns in the dimension. The fact table stores
          both a history_customer_sk (the surrogate key for the version active at
          the time of the fact) and a current_customer_sk (always pointing to
          the is_current=TRUE row). This keeps the dimension table pure Type 2
          without any Type 1 overwrite columns.
        </Para>

        <CodeBox label="SCD Type 7 — dual FK in the fact table">{`SCD TYPE 7 TABLE STRUCTURE:

dim_customer (pure Type 2 — no current_city column needed):
  customer_sk  customer_id  city       tier    valid_from   valid_to    is_current
  ───────────────────────────────────────────────────────────────────────────────
  1            4201938      Bangalore  silver  2024-01-15   2026-01-31  FALSE
  2            4201938      Hyderabad  silver  2026-02-01   NULL        TRUE

fct_orders (with DUAL surrogate keys):
  order_sk  history_customer_sk  current_customer_sk  order_amount  order_date
  ─────────────────────────────────────────────────────────────────────────────
  100       1                    2                    380.00        2024-06-10
  101       2                    2                    460.00        2026-03-01

  history_customer_sk: the SK active at order time (stored at fact load time)
  current_customer_sk: the SK of the current version (updated when customer changes)

QUERIES:

  -- Historical revenue by city (point-in-time accurate):
  SELECT c.city, SUM(f.order_amount)
  FROM fct_orders f
  JOIN dim_customer c ON f.history_customer_sk = c.customer_sk
  GROUP BY c.city;
  -- Order 100: joins to SK=1 → city='Bangalore'
  -- Order 101: joins to SK=2 → city='Hyderabad' ✓ historically accurate

  -- Current revenue by city (where customers are TODAY):
  SELECT c.city, SUM(f.order_amount)
  FROM fct_orders f
  JOIN dim_customer c ON f.current_customer_sk = c.customer_sk
  WHERE c.is_current = TRUE
  GROUP BY c.city;
  -- Both orders join to SK=2 → city='Hyderabad'
  -- "How much revenue came from customers who are NOW in Hyderabad?" ✓

TYPE 7 COMPLEXITY:
  Requires updating current_customer_sk in the fact table when
  a customer's current version changes — this means updating fact rows,
  which is expensive for large fact tables.
  Most teams avoid this unless the use case specifically requires it.
  Type 6 is more common in practice (current_city column in the dimension
  row is cheaper to maintain than updating millions of fact table rows).`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Comparison and Decision ────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Complete Comparison and Decision Framework" />
        <SectionTitle>Choosing the Right SCD Type — The Decision Framework</SectionTitle>

        <CompareTable
          headers={[
            { label: 'SCD Type' },
            { label: 'History preserved', color: '#00e676' },
            { label: 'Point-in-time joins', color: '#7b61ff' },
            { label: 'Current-state queries', color: '#f97316' },
            { label: 'Complexity', color: '#4285f4' },
            { label: 'Best for', color: '#facc15' },
          ]}
          keys={['type', 'history', 'pit', 'current', 'complexity', 'best']}
          rows={[
            { type: 'Type 0 (Fixed)', history: 'N/A — never changes', pit: 'N/A', current: '✓ Simple', complexity: 'Lowest', best: 'Immutable attributes: registration date, original city, hire date' },
            { type: 'Type 1 (Overwrite)', history: '✗ No history', pit: '✗ No — joins always to current', current: '✓ Simple — one row', complexity: 'Low', best: 'Corrections, contact info, flags where history irrelevant' },
            { type: 'Type 2 (Add Row)', history: '✓ Full', pit: '✓ Yes — via surrogate key at load time', current: 'Need is_current=TRUE filter', complexity: 'Medium', best: 'Most tracked attributes — customer city/tier, product category' },
            { type: 'Type 3 (Add Column)', history: '✓ One level only', pit: '✗ No — one row, no version control', current: '✓ Current column', complexity: 'Low–Medium', best: 'Attributes that change once: territory reassignment, store type upgrade' },
            { type: 'Type 4 (History Table)', history: '✓ Full (in history table)', pit: '✓ Via history table join', current: '✓ Fast via main table', complexity: 'Medium–High', best: 'Very large dimensions where current queries must be fast' },
            { type: 'Type 6 (1+2+3)', history: '✓ Full', pit: '✓ Via city column', current: '✓ Via current_city column (no filter)', complexity: 'High', best: 'When BOTH historical and current queries are equally important and frequent' },
            { type: 'Type 7 (Dual FK)', history: '✓ Full', pit: '✓ Via history_sk FK', current: '✓ Via current_sk FK', complexity: 'Highest', best: 'Rare — when Type 6 overhead in dimension table is unacceptable' },
          ]}
        />

        <CodeBox label="The decision tree — which SCD type for which situation">{`DECISION TREE:

Does the attribute change?
  No → Type 0 (fixed)
  Yes → Does historical accuracy matter for analysis?
    No → Type 1 (overwrite)
    Yes → How many historical states do you need?
      "Just current and previous" → Type 3
      "Full history required" → Continue...
        Do you need both historical and current queries from the same join?
          No  → Type 2 (standard — use is_current filter when needed)
          Yes → Type 6 (add current_city column to dimension)
        Is the dimension table very large (10M+ rows)?
          Yes → Consider Type 4 (separate history table)


PRACTICAL GUIDANCE (2026):
  80% of use cases: TYPE 2 (with dbt snapshot)
  15% of use cases: TYPE 1 (for corrections and non-analytical attributes)
   5% of use cases: TYPE 6, 3, or 4 (special requirements)
  TYPE 7: almost never needed — Type 6 handles the same use case more simply

REAL EXAMPLES FROM FOOD DELIVERY PLATFORMS:
  customer.city:                 Type 2 (revenue attribution changes with location)
  customer.tier:                 Type 2 (LTV and cohort analysis by acquisition tier)
  customer.phone_masked:         Type 1 (contact info — never needed historically)
  customer.registration_date:    Type 0 (immutable — when they first joined)
  store.manager_name:            Type 1 (most reports — manager history not tracked)
  store.region:                  Type 2 (if region changes affect territory reporting)
  product.category:              Type 2 (if sales reporting by category matters)
  product.price:                 NOT in dimension — put price in fact table as a fact`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 09 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Discovering That a Key Dimension Was Never Type 2 — The Revenue Attribution Fix</SectionTitle>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Scenario — FreshCart · City revenue attribution is wrong
          </div>

          <Para>
            The growth team presents a report showing Hyderabad revenue growing
            50% in Q1 2026. The Bangalore team disputes the numbers — several
            major customers they know personally appear to be attributed to
            Hyderabad. You are asked to investigate.
          </Para>

          <CodeBox label="SCD investigation — finding the Type 1 where Type 2 was needed">{`-- Step 1: Check the customer dimension for suspected customers
SELECT customer_id, city, valid_from, valid_to, is_current
FROM dim_customer
WHERE customer_id IN (4201938, 4201939, 4201940, 4201941)
ORDER BY customer_id;

-- Returns only ONE row per customer:
-- 4201938  Hyderabad  2024-01-15  NULL  TRUE
-- 4201939  Hyderabad  2024-03-02  NULL  TRUE
-- etc.

-- Only one row per customer — no version history.
-- is_current = TRUE for all (only one version exists).
-- valid_from = their registration date (no type 2 tracking).
-- dim_customer was built with Type 1 (overwrite) — not Type 2.

-- Step 2: Check Bronze CDC history for actual customer location changes
SELECT customer_id, city, updated_at, _change_type
FROM bronze.customers_cdc
WHERE customer_id = 4201938
ORDER BY updated_at;
-- Returns:
-- 4201938  Bangalore  2024-01-15  insert  ← registered in Bangalore
-- 4201938  Hyderabad  2026-02-01  update  ← moved to Hyderabad

-- Confirmed: customer 4201938 was in Bangalore until 2026-02-01.
-- The dim_customer table overwrote 'Bangalore' with 'Hyderabad' (Type 1).
-- ALL historical orders from 2024 and 2025 now show city = 'Hyderabad'.
-- This is why Hyderabad revenue looks inflated and Bangalore looks deflated.

-- Step 3: Estimate the impact
SELECT
    c.city AS wrong_city,
    DATE_PART('year', f.order_date) AS year,
    COUNT(*) AS affected_orders,
    SUM(f.order_amount) AS misattributed_revenue
FROM fct_orders f
JOIN dim_customer c ON f.customer_sk = c.customer_sk
JOIN bronze.customers_cdc cdc ON f.customer_id = cdc.customer_id
    AND f.order_date < '2026-02-01'   -- orders placed before the move
WHERE c.city = 'Hyderabad'           -- currently attributed to Hyderabad
  AND cdc.city = 'Bangalore'         -- but were actually in Bangalore
  AND cdc._change_type = 'insert'    -- initial registration city
GROUP BY 1, 2;
-- Shows: 18,234 orders, ₹1.47 crore misattributed from Bangalore to Hyderabad

-- MIGRATION PLAN:
-- 1. Build SCD Type 2 snapshot from Bronze CDC history
-- 2. Rebuild dim_customer with version rows from CDC
-- 3. Reload fct_orders — re-lookup customer_sk using the date-range join
-- 4. Rebuild Gold revenue models
-- Full migration: 4 days of engineering, 1 day of validation

-- PREVENTION:
-- dbt snapshot runs every hour on the silver.customers source
-- strategy = 'check', check_cols = ['city', 'tier', 'state']
-- Future city changes create a new version row automatically`}</CodeBox>

          <Para>
            This is one of the most common SCD incidents in production — a dimension
            was built with Type 1 when the business question required Type 2. The
            data engineer who built it did not ask "do historical facts need to
            reflect the value that was true at the time?" Revenue attribution by
            city requires exactly that. The fix required rebuilding the dimension
            from the preserved Bronze CDC history — which is why preserving raw
            Bronze data is so valuable.
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
            q: 'Q1. What is a Slowly Changing Dimension? Explain Type 1 and Type 2 and when you would use each.',
            a: `A Slowly Changing Dimension (SCD) describes how to handle changes to dimension attributes over time. Business entities — customers, stores, products — change their attributes periodically. When a customer moves cities, a store changes managers, or a product is recategorised, the question is: what should happen to the historical fact rows that joined to the old attribute value?

Type 1 overwrites the existing value with the new value. No history is preserved. The dimension table always shows the current state. All historical fact rows joined to this dimension now show the current attribute, even if they were created when the old value was true. Use Type 1 when history is genuinely not needed — contact information (phone numbers, email addresses), correction of wrong data, or attributes that have no analytical significance historically. An analyst asking "which city is this customer in right now?" is satisfied by Type 1.

Type 2 preserves full history by adding a new row for each version of the entity. The old row is expired with a valid_to date and is_current set to FALSE. A new row is inserted with the new attribute values, valid_from set to today, valid_to NULL, and is_current TRUE. Surrogate keys uniquely identify each version — the fact table stores the surrogate key of the version active at the time of the fact, enabling point-in-time accurate queries.

Use Type 2 when historical accuracy matters for analysis. If the business asks "how much revenue came from customers in Bangalore?" — they mean Bangalore at the time of the order, not their current city. A customer who moved from Bangalore to Hyderabad should have their Bangalore-period orders counted in Bangalore. Type 2 enables this. Type 1 would reassign all their historical orders to Hyderabad as soon as they moved.

The practical rule: if a business analyst would be confused by the historical numbers changing when a dimension attribute changes, you need Type 2. If the historical numbers are irrelevant and only current state matters, Type 1 is simpler and correct.`,
          },
          {
            q: 'Q2. How does dbt implement SCD Type 2 with snapshots? What are the two strategies and when would you choose each?',
            a: `dbt implements SCD Type 2 through its snapshot feature. A dbt snapshot is a special model type that monitors a source query for changes and automatically manages the valid_from, valid_to, and is_current (as dbt_valid_from, dbt_valid_to, and derived is_current) columns. It adds one row per version per entity, creating the full Type 2 history automatically.

The two strategies are timestamp and check. The timestamp strategy uses an updated_at column from the source to detect changes. When dbt snapshot runs, it compares the source row's updated_at value to the dbt_updated_at value in the snapshot table. If updated_at is more recent, a new version row is created. Use timestamp when the source table has a reliable updated_at timestamp that the application maintains correctly on every write — this is the most efficient strategy since it doesn't need to compare column values.

The check strategy compares the values of specified columns directly. Configure it with check_cols=['city', 'tier'] to tell dbt which columns trigger a new version. On each snapshot run, dbt compares the current values of those columns to what is stored. If any differ, a new version row is created. Use check when there is no reliable updated_at column, or when you want to track only specific columns — other columns can change without creating a new version. For example, if you track city and tier but not phone_masked, the check strategy with check_cols=['city', 'tier'] will not create a new version when only the phone changes.

An important operational detail: the snapshot should run more frequently than the dbt run that builds the Gold dimension from it. If a customer changes city twice in one day and the snapshot only runs nightly, the intermediate city is never captured — only the end-of-day state is recorded. For high-change dimensions, run the snapshot every 15-30 minutes.

The snapshot also supports invalidate_hard_deletes=True, which expires a snapshot row when the corresponding source row disappears. This handles the case where customers are deactivated or records are hard-deleted from the source.`,
          },
          {
            q: 'Q3. What is SCD Type 6 and how does it differ from Type 2? When would you use it?',
            a: `SCD Type 6 is a hybrid of Types 1, 2, and 3. It preserves full historical accuracy like Type 2 (multiple version rows with valid_from/valid_to), but also stores the current value of tracked attributes in every row — including historical rows — as a separate column.

In Type 2, a query for "revenue by city where customers are currently" requires filtering dim_customer WHERE is_current = TRUE and joining only current rows. Historical orders cannot show what city their customer is in today without a separate lookup. In Type 6, a current_city column is maintained in all rows via Type 1 overwrite — when a customer changes city, current_city is updated to the new city in every row (past and current versions). The city column still contains the historically accurate value for each version.

This enables two different queries from the same fact-to-dimension join without needing separate lookups. Using city gives historically accurate attribution — a Bangalore-period order shows Bangalore. Using current_city gives current-state attribution — the same Bangalore-period order shows Hyderabad (where the customer is now). Both are useful for different analytical questions.

Use Type 6 when you genuinely need both historical and current-state city queries with equal frequency and you want to serve both from a single join. The trade-off is complexity: updating current_city across all version rows when a customer changes city is an additional operation, and the column is denormalised in the dimension table.

Most teams use Type 2 as their default and handle the "where is the customer now?" question by filtering to is_current = TRUE in a separate query. Type 6 is appropriate when the business runs frequent reports that need both historical and current attribution in the same output — for example, a customer migration analysis that shows where customers came from and where they are now in a single query.`,
          },
          {
            q: 'Q4. A product was miscategorised as "beverages" for 6 months before the error was discovered. It should have been "snacks" all along. How should you handle this in the dimension?',
            a: `This is a data correction scenario, and the answer depends on the business interpretation of the error.

First, establish whether this is a genuine correction (the category was always wrong — a data entry error) or a legitimate historical state (the product really was categorised as beverages, but the categorisation policy changed). This distinction determines the SCD type.

If it is a genuine correction — someone typed "beverages" when they meant "snacks" and the product was always intended to be in snacks — then use Type 1 (overwrite). Correct the dimension table: UPDATE dim_product SET category = 'snacks' WHERE product_id = ... The historical period of incorrect categorisation does not represent a real business state. All historical reports showing this product in "beverages" were wrong. After the Type 1 fix, all reports will correctly show it in "snacks," which reflects what was always true. This is the appropriate response for a data correction.

If, however, the categorisation was a legitimate business decision for 6 months (the product was considered a beverage, then reclassified), it depends on whether historical accuracy matters. If historical revenue reports by category need to show the product in "beverages" for that 6-month period and "snacks" thereafter, use Type 2. The expired row preserves the "beverages" classification for the historical period, and the new row shows "snacks" going forward. Analysts can then accurately see that "beverages" revenue included this product until the reclassification date.

If the decision is Type 1 (correction), also consider whether the Medallion Architecture's Bronze layer still has the original data. Bronze preserves raw source data — the corrected source data can flow through to Silver and Gold, overwriting the wrong categorisation in all downstream models after a dbt run. If analytics reports for that 6-month period have already been distributed, a correction notice to stakeholders may be appropriate.`,
          },
          {
            q: 'Q5. What are the risks of running a dbt snapshot too infrequently? What operational problems does this cause?',
            a: `Running dbt snapshots infrequently introduces three specific operational problems.

First and most serious: intermediate states are lost. A customer changes city from Bangalore to Hyderabad on Monday and then moves to Mumbai on Wednesday. If the snapshot only runs weekly on Sunday, both changes happen between runs. When Sunday arrives, the snapshot detects a change from Bangalore to Mumbai and creates one new version row. The intermediate Hyderabad state is never captured. Any orders placed while the customer was in Hyderabad (Monday through Wednesday) will never have a correct historical city — there is no "Hyderabad version" to join to. The dbt timestamp strategy only detects that something changed between runs — not all the intermediate changes.

Second: version rows have incorrect valid_from dates. The timestamp strategy sets dbt_valid_from to when the snapshot ran, not when the change occurred in the source. If the snapshot runs weekly and a customer changed city on Tuesday, the new version row will show valid_from as Sunday (when snapshot ran) rather than Tuesday (when the change actually happened). This means orders placed between Tuesday and Sunday are joined to the wrong version — orders before Sunday appear to predate the move even though the move already happened.

Third: analysis using the snapshot is stale. If the customer dimension is used in Gold models that answer "how many customers are in each tier today?", and the snapshot runs only daily, a tier upgrade that happened this morning is not visible until tomorrow's snapshot run. For time-sensitive business metrics, this staleness may be unacceptable.

The fix is to run snapshots frequently — every 15-30 minutes for dimensions that change often and where change capture timing matters for analysis. Pair the snapshot with a source table that tracks the actual change timestamp (updated_at from the source application) rather than using the snapshot run time as the valid_from. Use the timestamp strategy where possible with the source's own updated_at, which gives accurate valid_from dates independent of snapshot frequency.`,
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
            error: `Revenue by city looks wrong — customers who moved cities have ALL their historical orders attributed to their new city, not the city they were in when they placed the order`,
            cause: 'The customer dimension was built with SCD Type 1 (overwrite). When a customer changed city, their single dimension row was updated to the new city. Because the fact table joins on customer_id (natural key) with is_current=TRUE filter — or even via a surrogate key that pointed to the single updated row — all historical orders now show the current city. Type 1 sacrifices historical accuracy for simplicity.',
            fix: 'Migrate to SCD Type 2. Rebuild dim_customer as a Type 2 dimension using the Bronze CDC history to reconstruct historical versions. Re-run the fact table load process using the date-range join to assign the correct surrogate key (the one active at order time) to each fact row. This requires: building historical versions from Bronze CDC → rebuilding dim_customer → reloading fct_orders with correct customer_sk values → rebuilding Gold models. Prevent recurrence by implementing the dbt snapshot on the Silver customers source.',
          },
          {
            error: `dbt snapshot creates a new version row every run — dim_customer has hundreds of version rows per customer despite no real changes`,
            cause: 'The snapshot uses strategy="timestamp" but the source table\'s updated_at column is being updated on every pipeline run (the Silver pipeline sets updated_at = NOW() on every upsert, including rows that did not actually change). Since updated_at is always more recent than dbt_updated_at, every snapshot run thinks every row has changed and creates a new version.',
            fix: 'Fix the Silver pipeline to only update updated_at when actual column values change, not on every pipeline run. Alternatively, switch the snapshot to strategy="check" with check_cols listing only the columns that should trigger a new version: check_cols=["city", "tier"]. The check strategy compares the actual column values, not the timestamp — it creates a new version only when a tracked column value actually differs, regardless of how many times the pipeline touched the row.',
          },
          {
            error: `Point-in-time join returns NULL for customer_sk — some fact rows have no matching dimension row even though the customer exists`,
            cause: 'The fact table load process uses a date-range join to find the correct SCD Type 2 version: JOIN dim_customer c ON f.customer_id = c.customer_id AND f.order_date BETWEEN c.valid_from AND COALESCE(c.valid_to, \'9999-12-31\'). Some orders have an order_date before the customer\'s earliest valid_from date in the dimension. This happens when the snapshot was deployed after orders already existed — the historical dimension state before the snapshot was deployed is missing.',
            fix: 'Backfill the dimension history by sourcing historical versions from Bronze CDC events (if available) or by setting the earliest version\'s valid_from to the customer\'s registration_date rather than the snapshot deployment date. For orders that still have no matching SK after backfill: use a COALESCE to a default "Unknown Customer" row (customer_sk = -1) rather than allowing NULLs, and investigate the specific orders to understand why their dates precede all dimension versions.',
          },
          {
            error: `dbt snapshot returns error: "Cannot use strategy 'check' — existing snapshot table was created with strategy 'timestamp'"`,
            cause: 'A dbt snapshot was initially deployed with strategy="timestamp" and accumulated version history over time. The team now wants to switch to strategy="check" to track specific columns rather than the timestamp. dbt does not allow changing snapshot strategies on an existing snapshot table — the metadata dbt uses to determine changes differs between the two strategies.',
            fix: 'Create a new snapshot with a different name and the desired check strategy. Manually migrate the existing snapshot data into the new table with a one-time INSERT. Going forward, run the new snapshot instead of the old one. Update all downstream models that ref() the old snapshot to ref() the new one. If strategy migration is frequent, document the decision when initially choosing a strategy — timestamp is simpler but less flexible; check is more explicit about which columns matter.',
          },
          {
            error: `Type 6 dimension update procedure creates duplicate current rows — two rows have is_current = TRUE for the same customer after a city change`,
            cause: 'The Type 6 update procedure runs the "expire old row + insert new row" step but the step that updates current_city in all existing rows either ran twice (due to a retry) or ran after the new row was already inserted, creating a situation where both the old expired row and the new current row have current_city updated but the is_current flag on the old row was not properly set to FALSE.',
            fix: 'Wrap the entire Type 6 update in a single database transaction: BEGIN → UPDATE all rows (set current_city) → UPDATE current row (set valid_to + is_current=FALSE) → INSERT new row → COMMIT. If any step fails, the whole transaction rolls back — no partial state. Add a UNIQUE constraint or CHECK constraint that only one row per customer_id can have is_current = TRUE: CREATE UNIQUE INDEX uq_customer_current ON dim_customer(customer_id) WHERE is_current = TRUE. This forces a constraint violation if two current rows are ever created for the same customer, surfacing the bug immediately.',
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
        'SCD patterns answer the question: when a dimension attribute changes, what should happen to the historical facts that referenced the old value? The answer depends entirely on whether historical accuracy matters for the business questions being answered.',
        'Type 0 (fixed) — attribute never changes. Type 1 (overwrite) — update in place, no history kept. Type 2 (add row) — new row per version, full history. Type 3 (add column) — current + one previous value. Type 4 (history table) — separate table for history. Type 6 (hybrid) — full history + current value in every row. Type 7 (dual FK) — two surrogate keys in the fact table.',
        'Type 2 is the most important and most widely used SCD pattern. When a tracked attribute changes: expire the current row (set valid_to, is_current=FALSE) and insert a new version row (valid_from=today, valid_to=NULL, is_current=TRUE). Surrogate keys uniquely identify each version, enabling point-in-time fact joins.',
        'The key to correct Type 2 joins: the fact table must store the surrogate key at load time (the SK of the version active when the fact occurred). At query time, join on f.customer_sk = c.customer_sk — not on customer_id with is_current filter. The latter assigns all historical orders to the current version, destroying historical accuracy.',
        'dbt snapshots implement Type 2 automatically. Two strategies: timestamp (uses updated_at column to detect changes — efficient but depends on accurate source timestamps) and check (compares listed column values directly — more explicit, works without a reliable updated_at). Run snapshots more frequently than dbt runs for high-change dimensions.',
        'Not every attribute should be Type 2. Attribute needs Type 2 when: changing it would make historical fact analysis wrong. customer.city → Type 2 (revenue by city requires historical accuracy). customer.phone → Type 1 (no analytical use for historical phone). store.manager → depends on whether "performance by manager" is a business question.',
        'Type 3 adds a previous_value column alongside the current value. Supports exactly one level of history. Useful for territory reassignments and once-in-a-lifetime changes. Unsuitable for frequently changing attributes or when full point-in-time accuracy is required.',
        'Type 6 (hybrid 1+2+3) stores the current_city value in EVERY version row via Type 1 overwrite, while preserving the historically accurate city value for each version. Enables both "where was the customer when they ordered?" (use city column) and "where is the customer today?" (use current_city column) from the same join without extra filtering.',
        'dbt snapshot operational pitfalls: running too infrequently loses intermediate states and causes valid_from dates to be set to snapshot run time rather than actual change time. Running too frequently (every minute on large tables) adds significant metadata table load. The right frequency matches the business\'s tolerance for staleness and the frequency of actual attribute changes.',
        'The most common SCD incident in production: a dimension built with Type 1 when the business question required Type 2. Revenue attribution, cohort analysis, and territory performance all depend on historical accuracy. When diagnosed, the fix requires rebuilding the dimension from Bronze CDC history and reloading fact table surrogate keys. This is why Bronze CDC history preservation is so valuable.',
      ]} />

    </LearnLayout>
  )
}