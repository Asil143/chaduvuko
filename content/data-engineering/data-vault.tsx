import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Data Vault 2.0 — Data Engineering | Chaduvuko',
  description: 'Data Vault 2.0 from first principles — hubs, links, and satellites, hash keys, loading patterns, Business Vault, PIT tables, and when Data Vault beats dimensional modelling.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
)
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
)
const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 'clamp(16px,1.8vw,20px)', fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12, fontFamily: 'var(--font-display)' }}>{children}</h3>
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
interface CompareTableProps { headers: { label: string; color?: string }[]; rows: TableRow[]; keys: string[] }
const CompareTable = ({ headers, rows, keys }: CompareTableProps) => (
  <div style={{ overflowX: 'auto', marginBottom: 28 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.6 }}>
      <thead><tr>{headers.map((h, i) => (
        <th key={h.label} style={{ padding: '10px 16px', textAlign: 'left', fontSize: i === 0 ? 10 : 11, fontWeight: 700, letterSpacing: i === 0 ? '.12em' : '.06em', textTransform: 'uppercase', color: h.color ?? 'var(--muted)', fontFamily: 'var(--font-mono)', borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)', background: h.color ? `${h.color}08` : 'var(--bg2)', minWidth: i === 0 ? 120 : 140 }}>{h.label}</th>
      ))}</tr></thead>
      <tbody>{rows.map((row, i) => (
        <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>{keys.map((k, ki) => (
          <td key={k} style={{ padding: '10px 16px', color: ki === 0 ? 'var(--muted)' : 'var(--text)', fontSize: ki === 0 ? 11 : 13, fontFamily: ki === 0 ? 'var(--font-mono)' : 'inherit', fontWeight: ki === 0 ? 700 : 400, textTransform: ki === 0 ? 'uppercase' : 'none', letterSpacing: ki === 0 ? '.06em' : 'normal', borderBottom: '1px solid var(--border)', borderLeft: ki > 0 && headers[ki]?.color ? `2px solid ${headers[ki].color}40` : ki > 0 ? '1px solid var(--border)' : 'none', verticalAlign: 'top' }}>{row[k]}</td>
        ))}</tr>
      ))}</tbody>
    </table>
  </div>
)

export default function DataVaultModule() {
  return (
    <LearnLayout
      title="Data Vault 2.0"
      description="Hubs, links, and satellites from first principles — hash keys, loading patterns, Business Vault, PIT tables, and when to choose Data Vault over dimensional modelling."
      section="Data Engineering"
      readTime="60 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What Data Vault Is and Why It Exists" />
        <SectionTitle>Data Vault 2.0 — Built for Auditability and Multi-Source Integration</SectionTitle>

        <Para>
          Data Vault is a data modelling methodology invented by Dan Linstedt in
          the early 2000s and formalised as version 2.0 in 2013. It was designed
          for enterprise integration — loading data from multiple heterogeneous
          source systems, adapting to frequent source schema changes without
          remodelling, and producing a fully auditable historical record of every
          fact ever loaded from every source.
        </Para>

        <Para>
          Data Vault is not a replacement for dimensional modelling. It occupies
          a separate layer: the Raw Vault stores everything that arrived from
          sources in a highly normalised, INSERT-only form. The Business Vault
          applies business rules. The Information Mart (dimensional model) serves
          analytical consumers. Data Vault is the integration layer between raw
          ingestion and analytical delivery.
        </Para>

        <HighlightBox>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
            The three problems Data Vault solves that dimensional modelling handles poorly
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {[
              { problem: 'Multiple sources with conflicting keys', color: '#4285f4', detail: 'customer_id=4201938 in System A and customer_id=4201938 in System B are different customers. Data Vault\'s hash key plus record_source handles this natively — dimensional modelling has no clean answer.' },
              { problem: 'Frequent source schema changes', color: '#7b61ff', detail: 'A new source attribute gets a new satellite column. Other satellites, all hubs, all links are untouched. Dimensional ETL pipelines break on schema changes — Data Vault does not.' },
              { problem: 'Complete auditability', color: '#f97316', detail: 'Every row records when it was loaded, which source sent it, and the raw key. Nothing is ever overwritten. The complete history of every value from every source is preserved forever.' },
            ].map((item) => (
              <div key={item.problem} style={{ background: 'var(--bg2)', border: `1px solid ${item.color}25`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '14px 16px' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 6 }}>{item.problem}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <Callout type="info">
          Data Vault is dominant in financial services, insurance, government, and
          regulated industries. It is rarely the right choice for a startup or
          single-source analytical platform. Understanding it is essential for
          interviews at banks, telecoms, and large enterprises.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Three Table Types" />
        <SectionTitle>Hubs, Links, and Satellites — The Building Blocks</SectionTitle>

        <Para>
          Every table in a Raw Vault is exactly one of three types. Each has a
          specific purpose, required columns, and strict rules. Violating these
          rules breaks auditability and parallelism.
        </Para>

        <CodeBox label="The three Data Vault table types — rules and structure">{`DATA VAULT TABLE TYPE 1: HUB
  Purpose:  Records the existence of a business concept.
            Stores the unique business key from source systems.
  Rule:     ONLY contains the business key and metadata. No descriptive attributes.
  Columns:  hub_[entity]_hk   CHAR(32) PK   ← MD5 hash of business key
            [entity]_bk       VARCHAR       ← the business key from source
            load_dts          TIMESTAMPTZ   ← when first loaded (INSERT ONLY)
            record_source     VARCHAR       ← which source system

  HUB_CUSTOMER:
    hub_customer_hk         customer_bk  load_dts                  record_source
    MD5('4201938')          '4201938'    2026-03-17 06:00 UTC      freshmart_orders_db
    MD5('USR-42019')        'USR-42019'  2026-03-17 07:00 UTC      loyalty_app
  Note: these two may be the same real customer — resolved in Business Vault via SAL.
  The hub just records that each key was seen from its source.


DATA VAULT TABLE TYPE 2: LINK
  Purpose:  Records the relationship between two or more entities.
  Rule:     ONLY hub hash keys + metadata. No descriptive attributes.
  Columns:  lnk_[rel]_hk       CHAR(32) PK   ← hash of combined hub HKs
            hub_[entity_1]_hk  CHAR(32)      ← FK to hub 1
            hub_[entity_2]_hk  CHAR(32)      ← FK to hub 2
            load_dts           TIMESTAMPTZ
            record_source      VARCHAR

  LNK_ORDER_CUSTOMER:
    lnk_hk            hub_order_hk      hub_customer_hk    load_dts
    MD5(hk1||hk2)     MD5('9284751')    MD5('4201938')     2026-03-17 ...


DATA VAULT TABLE TYPE 3: SATELLITE
  Purpose:  Stores descriptive attributes + full history of changes.
  Rule:     ONLY attributes from ONE source. If two sources describe the same
            customer differently: TWO separate satellites, one per source.
  Columns:  hub_[entity]_hk   CHAR(32)      ← FK to parent hub (part of PK)
            load_dts           TIMESTAMPTZ   ← when this version loaded (part of PK)
            load_end_dts       TIMESTAMPTZ   ← when superseded (NULL = current)
            hash_diff          CHAR(32)      ← hash of all attributes (change detect)
            record_source      VARCHAR
            [descriptive attributes]

  SAT_CUSTOMER_ORDERS_DB (from orders database):
    hub_customer_hk  load_dts          load_end_dts      city       tier
    MD5('4201938')   2024-01-15 06:00  2026-02-01 06:00  Seattle  silver  ← expired
    MD5('4201938')   2026-02-01 06:00  NULL              Austin  silver  ← current

  SAT_CUSTOMER_LOYALTY_APP (from loyalty app — separate satellite):
    hub_customer_hk  load_dts          city       loyalty_points
    MD5('4201938')   2024-03-01 09:00  Seattle  4200

  TWO satellites for the same customer: both raw versions preserved for audit.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Hash Keys" />
        <SectionTitle>Hash Keys — The Standard That Enables Parallel Loading</SectionTitle>

        <Para>
          Hash keys are deterministic — computed entirely from the business key
          string with no shared state, no sequence generator, no locks. Any
          process that has the source business key can independently compute
          the identical hash. This enables all hub, link, and satellite tables
          to load in complete parallel from the same source data.
        </Para>

        <CodeBox label="Hash key computation — the complete standard">{`ALGORITHM: MD5 (128-bit) or SHA-256 (256-bit)
  Choose one algorithm per vault — never mix within a vault.
  Enterprise/regulated: SHA-256. General purpose: MD5.

NORMALISATION (mandatory before hashing):
  ALWAYS uppercase and trim: hash_key = MD5(UPPER(TRIM(business_key)))
  'ST001', 'st001', ' ST001 ' must all produce the SAME hash.
  Different source systems may deliver the same key with different casing.

COMPOSITE KEY (for links — hash of multiple hub HKs):
  link_hk = MD5(hub_customer_hk || '||' || hub_order_hk)
  Use '||' separator to prevent collision: ('abc','def') vs ('ab','cdef').

NULL HANDLING:
  Replace NULL with sentinel: COALESCE(UPPER(TRIM(customer_id)), 'N/A')
  Ensures NULL from different sources produces the same hash.

HASH DIFF (for satellites — change detection):
  hash_diff = MD5(UPPER(TRIM(city)) || '||' || UPPER(TRIM(tier)) || '||' ...)
  If hash_diff changes between loads: insert new satellite row.
  If unchanged: skip (no new row needed).
  NEVER include pipeline timestamps (ingested_at, load_dts) in hash_diff.

PYTHON IMPLEMENTATION:
  import hashlib

  def hub_hk(business_key: str) -> str:
      return hashlib.md5(
          str(business_key).upper().strip().encode('utf-8')
      ).hexdigest()

  def link_hk(*hub_hks: str) -> str:
      combined = '||'.join(hk.upper() for hk in hub_hks)
      return hashlib.md5(combined.encode('utf-8')).hexdigest()

  def sat_hashdiff(**attrs) -> str:
      parts = []
      for k in sorted(attrs.keys()):   # sort for determinism
          v = str(attrs[k]).upper().strip() if attrs[k] is not None else 'N/A'
          parts.append(v)
      return hashlib.md5('||'.join(parts).encode('utf-8')).hexdigest()

WHY PARALLEL LOADING WORKS:
  Hub, link, and satellite all compute their hash keys from the SAME source columns.
  No table needs to wait for another. No lock, no sequence, no coordination.

  Simultaneously (all from stg_orders):
    hub_customer:      hub_hk = MD5(UPPER(TRIM(customer_id)))
    lnk_order_cust:    lnk_hk = MD5(hub_order_hk || '||' || hub_customer_hk)
    sat_order_details: hub_hk = MD5(UPPER(TRIM(order_id))), hash_diff computed
  All three can start and complete independently at the same instant.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Loading Patterns" />
        <SectionTitle>Loading Hubs, Links, and Satellites — The Exact Patterns</SectionTitle>

        <CodeBox label="Hub loading — INSERT IF NOT EXISTS only">{`HUB LOADING RULES:
  1. INSERT ONLY — never UPDATE, never DELETE.
  2. If hub_hk already exists: skip (INSERT IF NOT EXISTS).
  3. load_dts records FIRST SEEN date — never updated.

  INSERT INTO raw_vault.hub_customer
      (hub_customer_hk, customer_bk, load_dts, record_source)
  SELECT DISTINCT
      MD5(UPPER(TRIM(customer_id::VARCHAR))),
      customer_id::VARCHAR,
      CURRENT_TIMESTAMP(),
      'freshmart_orders_db'
  FROM staging.stg_orders
  ON CONFLICT (hub_customer_hk) DO NOTHING;  -- skip silently if exists ✓`}</CodeBox>

        <CodeBox label="Link loading — relationships, INSERT ONLY">{`LINK LOADING RULES:
  1. INSERT ONLY — never UPDATE, never DELETE.
  2. Compute hub hash keys from source data directly (not via join to hub table).
  3. ON CONFLICT DO NOTHING if relationship already recorded.

  INSERT INTO raw_vault.lnk_order_customer
      (lnk_order_customer_hk, hub_order_hk, hub_customer_hk, load_dts, record_source)
  SELECT DISTINCT
      MD5(MD5(UPPER(TRIM(order_id::VARCHAR))) || '||' || MD5(UPPER(TRIM(customer_id::VARCHAR)))),
      MD5(UPPER(TRIM(order_id::VARCHAR))),
      MD5(UPPER(TRIM(customer_id::VARCHAR))),
      CURRENT_TIMESTAMP(),
      'freshmart_orders_db'
  FROM staging.stg_orders
  ON CONFLICT (lnk_order_customer_hk) DO NOTHING;

EFFECTIVITY SATELLITE (for relationship end dates):
  When a relationship ends (employee moves to a new department):
  Do NOT delete the link row. Insert into an effectivity satellite:

  SAT_EMP_DEPT_EFFECTIVITY:
    lnk_hk   load_dts      load_end_dts   is_active
    HK_1     2024-01-01    2026-02-28     FALSE    ← ended
    HK_1     2026-03-01    NULL           TRUE     ← new assignment
  Full history preserved — link never deleted.`}</CodeBox>

        <CodeBox label="Satellite loading — hash_diff change detection">{`SATELLITE LOADING RULES:
  1. INSERT ONLY (except updating load_end_dts on the row being expired).
  2. New row inserted ONLY when hash_diff changes.
  3. Expire previous current row: UPDATE SET load_end_dts = NOW().
  4. One satellite per source system — never mix source attributes.

  -- Step 1: compute hash_diff in staging, identify changed rows
  WITH staged AS (
      SELECT
          MD5(UPPER(TRIM(customer_id::VARCHAR)))  AS hub_customer_hk,
          city, tier, phone_masked,
          MD5(
              UPPER(TRIM(COALESCE(city,   'N/A'))) || '||' ||
              UPPER(TRIM(COALESCE(tier,   'N/A'))) || '||' ||
              UPPER(TRIM(COALESCE(phone_masked, 'N/A')))
          )                                       AS hash_diff,
          CURRENT_TIMESTAMP()                     AS load_dts,
          'freshmart_orders_db'                   AS record_source
      FROM staging.stg_customers
  ),
  -- Step 2: only rows where hash_diff changed or entity is new
  changed AS (
      SELECT s.*
      FROM staged s
      LEFT JOIN (
          SELECT DISTINCT ON (hub_customer_hk) hub_customer_hk, hash_diff
          FROM raw_vault.sat_customer_orders_db
          WHERE load_end_dts IS NULL
          ORDER BY hub_customer_hk, load_dts DESC
      ) cur ON s.hub_customer_hk = cur.hub_customer_hk
      WHERE cur.hub_customer_hk IS NULL      -- new entity
         OR s.hash_diff != cur.hash_diff     -- attribute changed
  )
  -- Step 3: expire previous current rows
  UPDATE raw_vault.sat_customer_orders_db
  SET load_end_dts = NOW()
  WHERE hub_customer_hk IN (SELECT hub_customer_hk FROM changed)
    AND load_end_dts IS NULL;

  -- Step 4: insert new version rows
  INSERT INTO raw_vault.sat_customer_orders_db
      (hub_customer_hk, load_dts, load_end_dts, hash_diff, record_source,
       city, tier, phone_masked)
  SELECT hub_customer_hk, load_dts, NULL, hash_diff, record_source,
         city, tier, phone_masked
  FROM changed;`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The Full Architecture" />
        <SectionTitle>The Four Layers — Raw Vault, Business Vault, Information Mart</SectionTitle>

        <CodeBox label="Data Vault 2.0 full four-layer architecture">{`DATA VAULT 2.0 ARCHITECTURE:

  SOURCE SYSTEMS
  ────────────────────────────────────────────────────────────────────────
  FreshCart Orders DB    Loyalty App    Finance System    Logistics Partner

  ▼ Extract → Stage (typed landing, hash keys pre-computed, record_source set)

  STAGING AREA (not persistent — rebuilt each load)
  ────────────────────────────────────────────────────────────────────────
  stg_orders_db    stg_loyalty_app    stg_finance    stg_logistics

  ▼ Parallel load (all tables simultaneously)

  RAW VAULT (persistent, immutable, auditable)
  ────────────────────────────────────────────────────────────────────────
  Hubs:        HUB_CUSTOMER, HUB_ORDER, HUB_STORE, HUB_PRODUCT
  Links:       LNK_ORDER_CUSTOMER, LNK_ORDER_STORE, LNK_ORDER_PRODUCT
  Satellites:  SAT_CUSTOMER_ORDERS_DB, SAT_CUSTOMER_LOYALTY_APP
               SAT_ORDER_ORDERS_DB, SAT_STORE_LOGISTICS

  Rules: no business rules applied, INSERT ONLY, full audit trail.
  THIS IS THE SOURCE OF TRUTH.

  ▼ Business rules applied

  BUSINESS VAULT (derived, still historical)
  ────────────────────────────────────────────────────────────────────────
  Point-in-time (PIT) tables:   pre-join snapshots of satellites
  Bridge tables:                traversal helpers for complex paths
  Computed satellites (CSAT):   business-derived attributes
  Same-as-links (SAL):          link two hub records = same real entity

  Rules: business rules applied (reconcile conflicting sources),
         INSERT-only / history-preserving, not exposed directly to analysts.

  ▼ Dimensional transform

  INFORMATION MART (volatile, consumer-specific)
  ────────────────────────────────────────────────────────────────────────
  Standard dimensional model: fct_orders, dim_customer, dim_store, etc.
  Rules: rebuilt from Business Vault / Raw Vault at any time.
         NOT the source of truth. The Raw Vault is.`}</CodeBox>

        <SubTitle>Point-in-time (PIT) tables — the Business Vault query accelerator</SubTitle>

        <CodeBox label="PIT tables — making Raw Vault data fast to query">{`PROBLEM:
  To get a customer's current attributes from the Raw Vault you need:
    JOIN hub → satellite with complex date range filters → repeat for each satellite
  At scale (billions of satellite rows): slow and complex.

PIT TABLE SOLUTION:
  Pre-computed snapshot: for each entity at each snapshot date,
  records the load_dts of the relevant satellite row at that moment.

  PIT_CUSTOMER (daily snapshots):
  hub_customer_hk   snapshot_dts          sat_ord_ldts           sat_loy_ldts
  MD5('4201938')    2026-03-17 23:59:59   2026-02-01 06:00:00    2024-03-01 09:00:00
  MD5('4201938')    2026-03-16 23:59:59   2024-01-15 06:00:00    2024-03-01 09:00:00

  QUERY with PIT (equality join — fast):
  SELECT sc.city, sc.tier, sl.loyalty_points
  FROM pit_customer p
  JOIN sat_customer_orders_db sc
       ON p.hub_customer_hk = sc.hub_customer_hk
      AND p.sat_ord_ldts    = sc.load_dts        -- equality join via PIT
  JOIN sat_customer_loyalty_app sl
       ON p.hub_customer_hk = sl.hub_customer_hk
      AND p.sat_loy_ldts    = sl.load_dts
  WHERE p.snapshot_dts = '2026-03-17 23:59:59'
    AND p.hub_customer_hk = MD5('4201938');
  -- PIT eliminates the expensive date-range satellite scan.
  -- Fast indexed equality joins replace slow range queries.

SAME-AS-LINK (SAL):
  Two hub records represent the same real entity:
    customer_bk='4201938' (orders_db) = customer_bk='USR-42019' (loyalty_app)
  SAL_CUSTOMER records this equivalence:
    hub_customer_hk_1   hub_customer_hk_2   confidence   load_dts
    MD5('4201938')      MD5('USR-42019')    0.98         2026-01-01 ...
  Business Vault resolves which key to use as "master" for reporting.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Data Vault vs Dimensional Modelling" />
        <SectionTitle>Choosing Between Data Vault and Dimensional Modelling</SectionTitle>

        <CompareTable
          headers={[
            { label: 'Dimension' },
            { label: 'Data Vault 2.0', color: '#4285f4' },
            { label: 'Dimensional (Kimball)', color: '#7b61ff' },
          ]}
          keys={['dim', 'dv', 'kimball']}
          rows={[
            { dim: 'Primary use case', dv: 'Multi-source enterprise integration, regulated industries', kimball: 'Single/few sources, analytical reporting, BI dashboards' },
            { dim: 'Schema change impact', dv: 'Low — new attribute = new satellite column, nothing else changes', kimball: 'High — may require ETL remodelling and pipeline changes' },
            { dim: 'Source system count', dv: 'Designed for 10+ heterogeneous sources', kimball: 'Best with 1-5 well-understood sources' },
            { dim: 'Auditability', dv: 'Complete — every row has load_dts + record_source, nothing ever deleted', kimball: 'Partial — SCD Type 2 preserves history, no per-row source audit' },
            { dim: 'Analyst query complexity', dv: 'High — Raw Vault not queryable directly; needs information mart layer', kimball: 'Low — star schema queries are simple and predictable' },
            { dim: 'Load performance', dv: 'Excellent — parallel loading, INSERT ONLY, no locks', kimball: 'Good — sequential SCD2 logic, dependency between tables' },
            { dim: 'Business rule handling', dv: 'Separated into Business Vault — raw vault contains no rules', kimball: 'Applied in ETL — mixed with transformation' },
            { dim: 'Regulatory compliance', dv: 'Superior — immutable history, source tracking, zero-trust', kimball: 'Adequate — SCD2 provides history but not full auditability' },
            { dim: 'Implementation complexity', dv: 'High — more table types, hash standards, PIT tables, SALs', kimball: 'Medium — widely understood, standard SQL' },
            { dim: 'Best for', dv: 'Banks, insurance, telecom, government, healthcare', kimball: 'SaaS, e-commerce, startups, analytics-first companies' },
          ]}
        />

        <Callout type="tip">
          The modern enterprise pattern: Data Vault for the integration layer
          (Raw Vault + Business Vault), dimensional model for the delivery layer
          (Information Mart). Auditability and schema resilience from the vault,
          analytical simplicity from dimensional modelling.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — dbt for Data Vault" />
        <SectionTitle>Implementing Data Vault in dbt — AutomateDV</SectionTitle>

        <CodeBox label="AutomateDV macros — hub, link, satellite in dbt">{`# STAGING MODEL (stg_orders.sql) — pre-compute all hash keys first:
{{ config(materialized='view') }}
SELECT
    {{ automate_dv.hash('customer_id', 'MD5') }}                    AS hub_customer_hk,
    {{ automate_dv.hash('order_id',    'MD5') }}                    AS hub_order_hk,
    {{ automate_dv.hash(['order_id', 'customer_id'], 'MD5') }}      AS lnk_order_customer_hk,
    {{ automate_dv.hash(['status', 'amount', 'delivery_fee'],'MD5') }} AS order_hashdiff,
    order_id, customer_id, status, amount, delivery_fee,
    CURRENT_TIMESTAMP()   AS load_dts,
    'freshmart_orders_db' AS record_source
FROM {{ source('staging', 'orders') }}


# HUB MODEL (hub_customer.sql):
{{ config(materialized='incremental', unique_key='hub_customer_hk') }}
{{- automate_dv.hub(
    src_pk       = 'hub_customer_hk',
    src_nk       = 'customer_id',
    src_ldts     = 'load_dts',
    src_source   = 'record_source',
    source_model = 'stg_orders',
) -}}


# LINK MODEL (lnk_order_customer.sql):
{{ config(materialized='incremental', unique_key='lnk_order_customer_hk') }}
{{- automate_dv.link(
    src_pk       = 'lnk_order_customer_hk',
    src_fk       = ['hub_order_hk', 'hub_customer_hk'],
    src_ldts     = 'load_dts',
    src_source   = 'record_source',
    source_model = 'stg_orders',
) -}}


# SATELLITE MODEL (sat_order_details.sql):
{{ config(materialized='incremental', unique_key=['hub_order_hk','load_dts']) }}
{{- automate_dv.sat(
    src_pk       = 'hub_order_hk',
    src_hashdiff = 'order_hashdiff',
    src_payload  = ['status', 'amount', 'delivery_fee'],
    src_ldts     = 'load_dts',
    src_eff      = 'load_end_dts',
    src_source   = 'record_source',
    source_model = 'stg_orders',
) -}}


# dbt project structure:
freshmart_vault/
├── models/
│   ├── staging/         ← hash key pre-computation (views)
│   ├── raw_vault/
│   │   ├── hubs/        ← hub_customer.sql, hub_order.sql ...
│   │   ├── links/       ← lnk_order_customer.sql ...
│   │   └── sats/        ← sat_customer_orders_db.sql ...
│   ├── business_vault/
│   │   ├── pit/         ← pit_customer.sql ...
│   │   └── bridges/
│   └── marts/
│       ├── dims/        ← dim_customer.sql (from PIT + SAT joins)
│       └── facts/       ← fct_orders.sql`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — When NOT to Use Data Vault" />
        <SectionTitle>When Data Vault Is Overkill — The Honest Assessment</SectionTitle>

        {[
          { avoid: 'Single source system', reason: 'Data Vault\'s value is integrating multiple heterogeneous sources with conflicting keys. With one source, there are no conflicting keys — you pay the complexity cost without any benefit.', better: 'Medallion Architecture with dimensional Gold layer.' },
          { avoid: 'Stable, well-understood schema', reason: 'Schema-change resilience is valuable when schemas change frequently and unpredictably. If your schema has been stable for 3 years, this benefit is theoretical.', better: 'Dimensional model — simpler, faster, easier to query.' },
          { avoid: 'Small team without Data Vault expertise', reason: 'Data Vault requires understanding of hub/link/satellite patterns, hash standards, PIT tables, and SALs. A team new to vault will take 3-6 months to reach productivity.', better: 'dbt + dimensional modelling — widely understood, shallower learning curve.' },
          { avoid: 'Analytics-first company (SaaS, startup)', reason: 'Analysts need to query data directly. A Raw Vault is not queryable — it requires an information mart on top. Building two layers for a 10-person analytics team is rarely justified.', better: 'Direct Medallion Architecture → dbt dimensional model.' },
          { avoid: 'When sub-second query performance is critical', reason: 'The Raw Vault requires multi-table joins via PIT tables for current state. A dimensional model served directly from the lake has fewer layers to optimise.', better: 'Snowflake or BigQuery with dimensional model and result caching.' },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.2)', borderLeft: '3px solid #ff4757', borderRadius: 10, padding: '16px 20px', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#ff4757', fontFamily: 'var(--font-display)', marginBottom: 6 }}>⚠ Avoid Data Vault when: {item.avoid}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 8 }}>{item.reason}</div>
            <div style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>Better: {item.better}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 09 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>FreshCart Acquires QuickBasket — Why the Vault Handles Integration Cleanly</SectionTitle>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Scenario — FreshCart acquires QuickBasket and must integrate their data
          </div>

          <Para>
            QuickBasket has customer_id range 1–500,000 (overlapping with FreshCart),
            different customer attributes (preferred_store), and a different order schema
            (basket_value not order_amount). Integration must complete in 6 weeks without
            disrupting existing analytics.
          </Para>

          <CodeBox label="Multi-source integration — Data Vault vs dimensional model">{`DIMENSIONAL MODEL APPROACH (painful):
  1. Re-assign all QuickBasket customer_ids to avoid collision (prefix 'QB-')
  2. Add preferred_store to dim_customer (schema change — affects ALL existing queries)
  3. Map basket_value → order_amount in ETL (business rule decision)
  4. Reload all QuickBasket history into existing fact tables
  Duration: 4-6 weeks, high risk to existing analytics.

DATA VAULT APPROACH (additive, zero breaking changes):

  Day 1: New staging area for QuickBasket
    stg_quickbasket_customers, stg_quickbasket_orders
    record_source = 'quickbasket_orders_db'
    Key prefix to guarantee uniqueness: MD5('QB_' || UPPER(TRIM(customer_id)))

  Day 2: Load QuickBasket customers into existing HUB_CUSTOMER
    INSERT INTO hub_customer (hub_customer_hk, customer_bk, load_dts, record_source)
    SELECT MD5('QB_' || UPPER(TRIM(customer_id))), 'QB_' || customer_id,
           CURRENT_TIMESTAMP(), 'quickbasket_orders_db'
    FROM stg_quickbasket_customers
    ON CONFLICT DO NOTHING;
    ← Existing FreshCart hub rows: UNTOUCHED

  Day 3: New satellite for QuickBasket-specific attributes
    SAT_CUSTOMER_QUICKBASKET — new table, never touches SAT_CUSTOMER_ORDERS_DB
    Columns: hub_customer_hk, load_dts, preferred_store, loyalty_tier, ...
    ← EXISTING ANALYTICS UNAFFECTED — existing sats unchanged

  Days 4-5: QuickBasket orders into existing links
    LNK_ORDER_CUSTOMER accepts QuickBasket orders — record_source distinguishes them.

  Weeks 2-4: Same-as-link for identity resolution
    Match QuickBasket customers to FreshCart customers via email/phone/name.
    SAL_CUSTOMER records matched pairs.
    Business Vault resolves "master" identity.

  Weeks 5-6: Information Mart rebuilt to include QuickBasket
    dim_customer query reads from BOTH satellites (Business Vault resolves conflicts).
    fct_orders includes QuickBasket orders.
    Existing FreshCart-only metrics: filter by record_source='freshmart_orders_db'.

RESULT: Zero breaking changes to existing analytics.
  QuickBasket data added in parallel new satellites.
  The Raw Vault INSERT-ONLY design made this structurally safe.`}</CodeBox>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is Data Vault 2.0? What are the three table types and what does each store?',
            a: `Data Vault 2.0 is a data modelling methodology designed for enterprise data integration. It separates business keys, relationships, and descriptive attributes into three distinct table types, optimised for parallel loading, complete auditability, and resilience to source schema changes.

Hubs store the existence of a business concept — specifically, the unique business key from a source system. A hub row says "this business key was seen, from this source, at this time." Hubs contain only the hash key (primary key), the original business key, the load timestamp, and the record source. No descriptive attributes — a customer hub contains the customer ID, not the customer's name or city.

Links store relationships between business concepts. A link records that two or more hub entities were associated at a point in time. The order-customer link records that order 9284751 was placed by customer 4201938, from a specific source, at a specific time. Links contain only the hash keys of the related hubs, a link-level hash key, the load timestamp, and the record source. No descriptive attributes.

Satellites store the descriptive attributes and their full history. A customer satellite contains city, tier, phone. Each source system gets its own separate satellite — if both the orders database and the loyalty app provide customer attributes, there are two satellites, one per source. This preserves the raw data from each source independently. When an attribute changes, a new row is inserted with the new values and a load timestamp; the previous row's load_end_dts is set. Nothing is ever overwritten.

The combination gives Data Vault its core properties: hubs and links load in parallel from any source using hash keys, and the complete history of every attribute from every source is preserved in satellites.`,
          },
          {
            q: 'Q2. Why does Data Vault use hash keys instead of sequence-generated surrogate keys?',
            a: `Hash keys enable parallel loading — Data Vault's primary performance advantage — by eliminating the need for a sequence generator or any shared state between loading processes.

With sequence-generated surrogate keys, loading a hub requires a read lock to find the current maximum key value before assigning the next one. No table that depends on the hub's surrogate keys can load until the hub finishes and the new surrogate values are known. This serialises loading.

Hash keys are computed entirely from the business key string — MD5(UPPER(TRIM(business_key))). Any process that has the source business key can independently compute the identical hash key without any coordination. A hub, a link, and a satellite can all compute their respective hash keys from the same source data and load in complete parallel. No hub needs to finish before the link starts.

The hash key also solves cross-source integration. Two source systems both referencing customer 4201938 both compute MD5('4201938') — the same hash. The hub receives both inserts and keeps exactly one row via ON CONFLICT DO NOTHING. Both sources automatically share the same hub record, integrating the customer concept without any explicit joining or ID reconciliation.

The standard requires normalisation before hashing — always uppercase and trim — to ensure 'ST001', 'st001', and ' ST001 ' all produce the same hash regardless of which source system sent them.`,
          },
          {
            q: 'Q3. What is a Point-in-Time (PIT) table and why is it needed?',
            a: `A Point-in-Time table is a pre-computed snapshot that, for a given hub entity at specific time intervals, records the load timestamps of the most recent satellite rows as of each snapshot time. It is the primary mechanism for making Raw Vault data queryable efficiently.

Without a PIT table, retrieving a customer's attributes as of March 17 requires querying each satellite with a complex date-range filter: WHERE load_dts <= '2026-03-17' AND (load_end_dts > '2026-03-17' OR load_end_dts IS NULL). For a customer with attributes across three satellites, this is a four-table query with complex range conditions — expensive and difficult to optimise at scale.

A PIT table pre-computes the answer to "which satellite row was current at each snapshot date?" For snapshot_dts = '2026-03-17', the PIT contains a single row with the exact load_dts values for each satellite that was current at that time. The analytical query then becomes simple equality joins: satellite.load_dts = pit.sat_customer_ldts. Much faster and much simpler.

PIT tables are part of the Business Vault layer — computed from the Raw Vault and stored persistently to avoid recomputation. They are rebuilt at the analytical interval (daily or weekly). In practice, PIT tables are what make Data Vault viable for information mart construction. Without them, querying the Raw Vault is so complex that building dimensional models from it is impractical.`,
          },
          {
            q: 'Q4. How does Data Vault handle a new source system being added? What changes and what does not?',
            a: `Adding a new source system is one of Data Vault's strongest demonstrations of value. The changes are minimal and strictly additive — existing tables and processes are not touched.

For a new source (QuickBasket) added to a vault that already has FreshCart data: create a new staging area for QuickBasket with its own staging tables. Add QuickBasket business keys to existing hubs by inserting new rows with record_source='quickbasket_orders_db'. The existing hub columns accommodate this with no schema change. Add QuickBasket relationships to existing link tables as new rows. Create new satellites specifically for QuickBasket attributes that are unique to that source.

Nothing in the existing Raw Vault is modified. Existing FreshCart hub rows are unchanged. Existing FreshCart satellite rows are unchanged. Existing ETL processes continue loading FreshCart data without modification. Existing information marts continue producing correct FreshCart-only results — they filter by record_source implicitly through the Business Vault.

The only changes visible to analysts come in the Information Mart layer, where Business Vault rules are updated to integrate QuickBasket data. This is additive SQL — new satellite joins, source resolution rules in computed satellites — not schema changes.

Contrast this with dimensional modelling, where adding a new source often requires adding columns to existing dimension tables, modifying ETL pipelines, potentially reloading historical data, and risking broken queries during migration. Data Vault's satellite-per-source design and INSERT-only semantics prevent this cascade entirely.`,
          },
          {
            q: 'Q5. When would you recommend a dimensional model over Data Vault, and vice versa?',
            a: `The choice depends on four platform characteristics: source system count, schema stability, auditability requirements, and team expertise.

Dimensional modelling is right when the platform integrates one to three well-understood source systems with stable schemas, the primary consumers are SQL analysts using BI tools, regulatory requirements are met by SCD Type 2 history without per-row source tracking, and the team has standard data engineering knowledge. This covers the vast majority of analytics platforms at technology companies, e-commerce businesses, and startups. Dimensional modelling delivers faster time-to-value, simpler analyst queries, and lower operational overhead.

Data Vault is right when the platform integrates many heterogeneous source systems with potentially conflicting business keys, source schemas change frequently (adding a new attribute should never break existing analytics), regulatory requirements demand complete auditability with source-level tracking and immutable history, and the organisation has or can build Data Vault expertise. Financial services, insurance, government, telecommunications, and healthcare fit this profile. In banking, proving exactly what data came from which system on which date is a regulatory requirement.

The hybrid approach is increasingly common at large enterprises: Data Vault for the integration layer and dimensional modelling for the delivery layer. Analysts query star schema information marts. The Data Vault underneath provides the governance foundation. Both methodologies contribute what they do best.

The critical mistake is choosing Data Vault because it sounds more enterprise-grade. The complexity cost is real — it takes longer to build, requires specialist knowledge, and produces a system that analysts cannot query directly. For a ten-person analytics team with one primary data source, Data Vault is almost certainly wrong regardless of its reputation.`,
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
            error: `Hub has duplicate rows — same business key produces two different hash keys from different loading processes, splitting entity across two hub records`,
            cause: 'Hash key computation was inconsistent. One loading process used MD5(customer_id) without normalisation; another used MD5(UPPER(TRIM(customer_id))). A source that sent customer_id with whitespace or mixed case produced a different hash. The hub now has two rows for the same conceptual entity.',
            fix: 'Enforce normalisation in a single reusable dbt macro: hash_bk(col) → MD5(UPPER(TRIM(col::VARCHAR))). All staging models use this macro exclusively — never compute hash keys inline. Audit existing hubs for duplicates: find business keys with more than one hash key, consolidate to the canonical hash, update link FKs. Add a test: assert COUNT(DISTINCT customer_bk) = COUNT(DISTINCT hub_customer_hk) on every hub.',
          },
          {
            error: `Satellite creates a new version row on every pipeline run — thousands of versions per entity with seconds between them`,
            cause: 'The hash_diff computation includes a pipeline-generated timestamp column (processing_timestamp, ingested_at) that changes on every run. Since this column always has a new value, hash_diff always differs from the previous row, and a new version is inserted every run even when actual business attributes are unchanged.',
            fix: 'Remove all pipeline-generated metadata columns from hash_diff. Include only source business attributes: city, tier, phone_masked. Never include ingested_at, load_dts, or any timestamp computed at load time. Recompute hash_diff correctly. Clean up duplicate rows by keeping one row per distinct attribute set, expiring the redundant versions.',
          },
          {
            error: `Link table is missing rows — some order-customer relationships never loaded even though both entities exist in their hubs`,
            cause: 'The link load process used an INNER JOIN to hub_customer to resolve customer hash keys, rather than computing them directly from source data. New customers not yet in hub_customer when the link ran caused the JOIN to silently drop those order rows.',
            fix: 'Links must compute hub hash keys directly from source business keys — the same MD5(UPPER(TRIM(customer_id))) computation used by the hub. Never join to the hub table to "look up" hash keys. This eliminates the loading dependency and enables true parallel loading. Hub and link can load simultaneously from the same staging data with zero coordination.',
          },
          {
            error: `PIT table queries are 10× slower than expected — full satellite table scans despite equality joins`,
            cause: 'Satellite tables are not indexed on (hub_customer_hk, load_dts). The PIT query joins on an exact load_dts value — an equality join — but without a composite index on these two columns, the database performs a full satellite scan per PIT row.',
            fix: 'Add composite indexes on every satellite: CREATE INDEX idx_sat_customer_hk_ldts ON sat_customer(hub_customer_hk, load_dts). For Snowflake: use CLUSTER BY (hub_customer_hk, load_dts). Also verify the PIT table itself is clustered or indexed on snapshot_dts so analytical date filters can prune effectively.',
          },
          {
            error: `Information Mart gives different results for the same customer metric depending on which satellite is joined — source conflict not resolved`,
            cause: 'The information mart SQL joins directly to SAT_CUSTOMER_ORDERS_DB but the business team considers the loyalty app tier as authoritative. When the two satellites disagree on tier, the mart picks the wrong source — silently showing incorrect customer segmentation.',
            fix: 'Never let information mart models join raw satellites directly. Create a computed satellite (CSAT) in the Business Vault layer that applies the agreed precedence rule: COALESCE(loyalty_app.tier, orders_db.tier) AS tier. Document the rule in code with the decision date and owner. All marts join only the CSAT — the business rule is centralised, auditable, and consistent.',
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
        'Data Vault 2.0 has three table types: Hubs (store business keys — the existence of an entity), Links (store relationships between hubs), and Satellites (store descriptive attributes with full version history per source). Every table in a Raw Vault is exactly one of these three types.',
        'Hash keys (MD5 or SHA-256 of UPPER(TRIM(business_key))) are deterministic and computable from source data alone — no shared state, no sequence generator, no locks. This enables all hub, link, and satellite tables to load in complete parallel from the same source data simultaneously.',
        'Every satellite row has: hub_hk (FK to parent), load_dts (when loaded), load_end_dts (when expired — NULL if current), hash_diff (hash of all business attributes), and record_source. A new row is inserted only when hash_diff changes. Never include pipeline-generated timestamps in hash_diff.',
        'Each source system gets its own satellite. If two sources describe the same customer, there are two separate satellites. This preserves both versions for audit. Business Vault computed satellites (CSAT) apply the agreed source resolution rules for reporting — marts never join raw satellites directly.',
        'Point-in-Time (PIT) tables pre-compute which satellite row was current at each snapshot date, transforming expensive date-range satellite scans into fast equality joins. PIT tables are the primary query interface for building Information Marts from the vault.',
        'The four-layer architecture: Source → Staging (hash keys pre-computed) → Raw Vault (INSERT-only, no business rules, the source of truth) → Business Vault (PIT tables, SALs, source resolution) → Information Mart (dimensional model for analysts). Information Marts are rebuilt views — the Raw Vault is the source of truth.',
        'Adding a new source system changes nothing in the existing Raw Vault. New hub rows are added with a new record_source. New satellites are created for new attributes. Existing satellites, hubs, and links are completely untouched. Existing analytics continue working unchanged.',
        'Data Vault beats dimensional modelling for: 10+ heterogeneous sources with conflicting keys, frequent schema changes, and regulatory auditability requirements. Dimensional modelling beats Data Vault for: single sources, stable schemas, analytics-first teams, and when sub-second query performance is critical.',
        'AutomateDV (dbtvault) provides dbt macros — hub(), link(), sat(), pit() — that generate correct vault SQL from configuration. The staging model pre-computes all hash keys. All vault models call the macros. Business Vault computed satellites apply source resolution rules.',
        'The hybrid enterprise pattern: Data Vault for integration (Raw Vault + Business Vault), dimensional model for delivery (Information Mart). Never choose Data Vault because it sounds more enterprise-grade — the complexity cost is real and must be justified by specific multi-source integration and auditability requirements.',
      ]} />

    </LearnLayout>
  )
}