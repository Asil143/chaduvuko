import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Data Governance — Lineage, Cataloging, Access Control, and Data Mesh | Chaduvuko',
  description:
    'Data governance from first principles — what it actually means in practice, data lineage implementation, cataloging with DataHub, column-level access control, GDPR and PII handling, and the data mesh organizational pattern.',
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
const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{children}</h4>
)
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)
const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const Output = ({ children }: { children: string }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ opacity: 0.6 }}>▸</span> output
    </div>
    <pre style={{ background: 'transparent', border: '1px dashed var(--border)', borderRadius: 10, padding: '14px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8, color: 'var(--muted)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>{children}</div>
)
const TryThis = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.25)', borderRadius: 10, padding: '16px 20px', marginBottom: 24, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
    <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.5 }}>⌨️</span>
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent2)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>Try this yourself</div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75 }}>{children}</div>
    </div>
  </div>
)

interface TableRow { [key: string]: string }
interface CompareTableProps { headers: { label: string; color?: string }[]; rows: TableRow[]; keys: string[] }
const CompareTable = ({ headers, rows, keys }: CompareTableProps) => (
  <div style={{ overflowX: 'auto', marginBottom: 28 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.6 }}>
      <thead><tr>{headers.map((h, i) => (
        <th key={h.label} style={{ padding: '10px 16px', textAlign: 'left', fontSize: i === 0 ? 10 : 11, fontWeight: 700, letterSpacing: i === 0 ? '.12em' : '.06em', textTransform: 'uppercase', color: h.color ?? 'var(--muted)', fontFamily: 'var(--font-mono)', borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)', background: h.color ? `${h.color}08` : 'var(--bg2)', minWidth: i === 0 ? 130 : 150 }}>{h.label}</th>
      ))}</tr></thead>
      <tbody>{rows.map((row, i) => (
        <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>{keys.map((k, ki) => (
          <td key={k} style={{ padding: '10px 16px', color: ki === 0 ? 'var(--muted)' : 'var(--text)', fontSize: ki === 0 ? 11 : 13, fontFamily: ki === 0 ? 'var(--font-mono)' : 'inherit', fontWeight: ki === 0 ? 700 : 400, textTransform: ki === 0 ? 'uppercase' : 'none', letterSpacing: ki === 0 ? '.06em' : 'normal', borderBottom: '1px solid var(--border)', borderLeft: ki > 0 && headers[ki]?.color ? `2px solid ${headers[ki].color}40` : ki > 0 ? '1px solid var(--border)' : 'none', verticalAlign: 'top' }}>{row[k]}</td>
        ))}</tr>
      ))}</tbody>
    </table>
  </div>
)

export default function DataGovernanceModule() {
  return (
    <LearnLayout
      title="Data Governance — Lineage, Cataloging, Access Control, and Data Mesh"
      description="What governance actually means in practice — lineage, cataloging, access control, GDPR, PII handling, and the data mesh organizational pattern."
      section="Data Engineering — Module 38"
      readTime="65 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 — What Governance Actually Is ─────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What Governance Actually Means" />
        <SectionTitle>Data Governance — The Engineering Discipline Behind Trust</SectionTitle>

        <Para>
          Data governance is the system of policies, processes, and technical
          controls that ensure data in a platform is discoverable, trustworthy,
          secure, and compliant. The word &ldquo;governance&rdquo; sounds administrative —
          policy documents, steering committees, approval workflows. The reality
          for a data engineer is much more concrete: implementing lineage tracking
          so that when a metric is wrong you can trace it back to its source in
          minutes, building a data catalog so analysts can find and understand
          tables without asking on Slack, enforcing access control so PII is
          never exposed to unauthorised users, and handling right-to-erasure
          requests without breaking the pipeline.
        </Para>

        <Para>
          Governance failures are expensive. An analyst uses the wrong table
          because the catalog has no descriptions. A GDPR audit finds that
          customer emails are visible to all analysts. A metric is wrong but
          nobody can trace which transformation introduced the error. A new hire
          spends three weeks understanding the data model that could have been
          documented. These are not abstract risks — they happen at every
          organisation that treats governance as optional.
        </Para>

        <HighlightBox>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
            The four pillars of practical data governance
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14 }}>
            {[
              { pillar: 'Discoverability', color: '#00e676', icon: '🔍', def: 'Analysts can find the right table. They know what each column means, who owns it, when it was last updated, and whether it is trustworthy.', tools: 'DataHub, Amundsen, dbt docs, Alation' },
              { pillar: 'Lineage', color: '#7b61ff', icon: '🔗', def: 'Every dataset\'s origin is traceable. When a metric is wrong, you can follow the chain from Gold back to the source system that introduced the error.', tools: 'OpenLineage, dbt lineage graph, Marquez, DataHub' },
              { pillar: 'Access Control', color: '#f97316', icon: '🔐', def: 'The right people see the right data. PII is masked or blocked for unauthorised users. Audit logs record who accessed what and when.', tools: 'Unity Catalog, Snowflake RBAC, AWS Lake Formation, column masking' },
              { pillar: 'Compliance', color: '#4285f4', icon: '📋', def: 'GDPR, CCPA, and internal retention policies are enforced. Right-to-erasure requests are fulfilled. Sensitive data is classified and protected accordingly.', tools: 'Data classification tags, masking policies, audit logs, retention pipelines' },
            ].map((item) => (
              <div key={item.pillar} style={{ background: 'var(--bg2)', border: `1px solid ${item.color}25`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '14px 16px' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 4 }}>{item.icon} {item.pillar}</div>
                <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6, marginBottom: 6 }}>{item.def}</div>
                <div style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)', lineHeight: 1.4 }}>{item.tools}</div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <TryThis>
          Pick any table you work with regularly and try to answer, without
          looking anything up: who owns it, when was it last updated, and what
          does each column actually mean? If you can&rsquo;t answer all three, that
          table has a governance gap — the kind this module exists to close.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 02 — Data Lineage ────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Data Lineage" />
        <SectionTitle>Data Lineage — Tracing Every Dataset Back to Its Source</SectionTitle>

        <Para>
          Data lineage is the record of how data moves through a platform —
          which source systems produced it, which transformations touched it,
          which downstream datasets depend on it. It answers two questions that
          come up in every data platform: &ldquo;where did this data come from?&rdquo; and
          &ldquo;if I change this table, what breaks?&rdquo;
        </Para>

        <SubSubTitle>Table-level vs. column-level lineage</SubSubTitle>

        <CodeBox label="Two granularities of lineage">{`TABLE-LEVEL LINEAGE:
  silver.orders ← bronze.orders (via dbt stg_orders)
  gold.daily_revenue ← silver.orders + silver.stores

COLUMN-LEVEL LINEAGE (more precise):
  gold.daily_revenue.net_revenue
    ← silver.orders.order_amount
    ← silver.orders.discount_amount
    (transformation: order_amount - discount_amount)

  gold.daily_revenue.store_region
    ← silver.stores.region
    ← silver.stores.state
    (transformation: CASE WHEN state IN (...) THEN 'South' ...)

Column-level lineage tells you:
  - Exactly which source column populated each Gold column
  - Which transformations were applied along the way
  - Impact analysis: if orders.order_amount definition changes,
    which Gold columns are affected?
  - Audit: prove to a regulator which source fields produced a reported metric`}</CodeBox>

        <SubSubTitle>Implementing lineage with OpenLineage</SubSubTitle>

        <Para>
          OpenLineage is an open standard (an LF AI & Data Foundation project)
          for lineage event emission. Any tool that implements it — Spark, dbt,
          Airflow, Flink — emits lineage events that any catalog can consume.
        </Para>

        <CodeBox label="An OpenLineage event — job and inputs">{`{
  "eventType": "COMPLETE",
  "eventTime": "2026-03-17T06:14:32.000Z",
  "run": {
    "runId": "d7c7a7b8-3e1a-4a2c-9b4d-...",
    "facets": {
      "nominalTime": {"nominalStartTime": "2026-03-17T06:00:00Z"}
    }
  },
  "job": {
    "namespace": "freshcart.dbt",
    "name": "silver.orders"
  },
  "inputs": [
    {
      "namespace": "freshcart.bronze",
      "name": "orders",
      "facets": {
        "schema": {
          "fields": [
            {"name": "order_id",   "type": "INTEGER"},
            {"name": "customer_id","type": "INTEGER"},
            {"name": "amount",     "type": "DECIMAL"}
          ]
        }
      }
    }
  ],`}</CodeBox>

        <CodeBox label="...continued — outputs and the column-lineage facet">{`  "outputs": [
    {
      "namespace": "freshcart.silver",
      "name": "orders",
      "facets": {
        "columnLineage": {
          "fields": {
            "order_id":   {"inputFields": [{"namespace":"freshcart.bronze","name":"orders","field":"order_id"}]},
            "net_revenue":{"inputFields": [
              {"namespace":"freshcart.bronze","name":"orders","field":"amount"},
              {"namespace":"freshcart.bronze","name":"orders","field":"discount_amount"}
            ]}
          }
        }
      }
    }
  ]
}`}</CodeBox>

        <SubSubTitle>Lineage backends and dbt&rsquo;s built-in lineage</SubSubTitle>

        <CodeBox label="Where lineage events get stored and browsed">{`LINEAGE BACKENDS:
  Marquez:      open source, stores OpenLineage events, REST API, simple UI
  DataHub:      comprehensive catalog + lineage, ingestion connectors for dbt/Spark/Airflow
  Atlan:        managed, deep dbt/Airflow integration
  OpenMetadata: open source alternative to DataHub

dbt LINEAGE (automatic, no extra setup):
  dbt generates a DAG of all models and their dependencies.
  dbt docs generate produces a browsable lineage graph:
    dbt docs generate && dbt docs serve
  Shows: every model, its SQL, its upstream models, its downstream models.
  Column-level lineage: dbt-column-lineage package adds column mapping.`}</CodeBox>

        <SubSubTitle>Lineage for impact analysis — the practical workflow</SubSubTitle>

        <Para>
          Say you need to change the Silver orders table: add a new
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> tip_amount</code> column,
          and change how <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>net_revenue</code> is
          calculated (previously <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>order_amount - discount_amount</code>,
          now adding <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>+ tip_amount</code>).
        </Para>

        <CodeBox label="Without lineage — the expensive way">{`You make the change, run dbt, and discover 4 Gold models break
because they all had column-specific assertions on net_revenue.
You also broke a dashboard that a non-dbt BI tool was using.
Investigation time: 3 hours.`}</CodeBox>

        <CodeBox label="With lineage — check downstream consumers first">{`Step 1: Query the dbt graph for all downstream consumers of silver.orders:
$ dbt ls --select +silver.orders+
  silver.orders
  gold.daily_revenue         ← depends on silver.orders
  gold.customer_ltv          ← depends on silver.orders
  gold.fct_orders_wide       ← depends on silver.orders
  gold.store_performance     ← depends on silver.orders

Step 2: Check which downstream models use net_revenue specifically —
  all four use SUM(net_revenue) or the raw column directly. All affected.

Step 3: Check for non-dbt consumers (BI tools, APIs, external queries) via
  DataHub catalog → silver.orders.net_revenue → "Downstream consumers" tab
  Shows: Metabase dashboard "Daily Revenue" — uses this column directly

Step 4: Plan the migration — add tip_amount first (non-breaking), update
  net_revenue backward-compatibly, notify the Metabase dashboard owner,
  update all 4 Gold models together, deploy Silver → Gold in one dbt run.`}</CodeBox>

        <Output>{`Total time with lineage:    30 minutes of planning, zero surprises.
Total time without lineage: 3 hours of debugging broken things after the fact.`}</Output>
      </section>

      <Divider />

      {/* ── Part 03 — Data Catalog ────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Data Catalog" />
        <SectionTitle>Data Catalog — Making Data Discoverable</SectionTitle>

        <Para>
          A data catalog is a searchable inventory of all data assets in the
          platform. Without one, analysts spend hours asking &ldquo;which table
          should I use for revenue?&rdquo; on Slack, use the wrong table, and make
          decisions on data they don&rsquo;t understand. With one, they search for
          &ldquo;revenue&rdquo;, find the canonical Gold table, read its description and
          owner, check when it was last updated, and start their analysis
          immediately.
        </Para>

        <SubSubTitle>DataHub — the open source enterprise catalog</SubSubTitle>

        <Para>
          DataHub is the most widely deployed open source data catalog in 2026.
          It has native ingestion connectors for dbt, Spark, Airflow, Snowflake,
          BigQuery, Redshift, Kafka, Looker, Tableau, and 40+ other tools.
        </Para>

        <CodeBox label="DataHub ingestion recipes — dbt and Snowflake sources">{`# datahub_recipes/dbt_freshcart.yml
source:
  type: dbt
  config:
    manifest_path:       /path/to/dbt/target/manifest.json
    catalog_path:        /path/to/dbt/target/catalog.json
    sources_path:        /path/to/dbt/target/sources.json
    target_platform:     snowflake
    include_column_lineage: true  # column-level lineage from dbt
    owner_extraction_pattern: "^Team:(?P<owner>.*)$"
sink:
  type: datahub-rest
  config:
    server: "http://datahub-gms:8080"

# datahub_recipes/snowflake_freshcart.yml
source:
  type: snowflake
  config:
    account_id:   freshcart.snowflake.com
    username:     datahub_service_account
    database:     freshcart_prod
    warehouse:    analyst_wh
    include_table_lineage: true    # query log-based lineage
    include_column_lineage: true
    include_usage_stats:   true    # who queried what and when

# RUN: datahub ingest -c datahub_recipes/dbt_freshcart.yml
# RUN: datahub ingest -c datahub_recipes/snowflake_freshcart.yml`}</CodeBox>

        <Output>{`WHAT DATAHUB PROVIDES AFTER INGESTION:
Search:       "net revenue" → finds gold.daily_revenue.net_revenue
Description:  "Net revenue after discounts. Source: silver.orders."
Owner:        data-team@freshcart.com
Lineage:      upstream: silver.orders, downstream: Metabase dashboard
Usage:        queried by priya@freshcart.com, 48 times in last 7 days
Quality:      last dbt test run: all 12 tests passed, 2026-03-17
Tags:         [PII-free, Gold, Finance, SLA-monitored]`}</Output>

        <CodeBox label="Making dbt descriptions flow into DataHub">{`# models/gold/_schema.yml
models:
  - name: daily_revenue
    description: >
      Pre-aggregated daily revenue by store and date.
      Updated daily at 06:30 ET. SLA: complete by 08:00 ET.
      Source of truth for Finance dashboard.
    meta:
      owner: data-team@freshcart.com
      sla: "08:00 ET daily"
      consumers: [finance-dashboard, cfo-report]
    columns:
      - name: net_revenue
        description: >
          Total order revenue after discounts.
          Calculation: SUM(order_amount - discount_amount)
          from silver.orders WHERE status = 'delivered'.
        meta:
          is_pii: false
          business_owner: finance@freshcart.com

# When dbt docs generate runs → DataHub ingestion picks up descriptions
# Descriptions become visible in DataHub search and table pages`}</CodeBox>

        <CodeBox label="Everyday governance workflow for a data engineer">{`EVERYDAY GOVERNANCE WORKFLOW FOR A DATA ENGINEER:
  Before adding a new Gold table:
    1. Create dbt model with complete description in schema.yml
    2. Add owner meta field (team email)
    3. Add column descriptions for all columns
    4. Add relevant tags (PII-free, Gold, team)
    5. Add to DataHub business glossary if it defines a new term

  After deployment:
    DataHub ingestion runs → table discoverable in catalog within 1 hour
    Analyst can find it, read the description, understand the grain
    Without Slack DMs to the data team`}</CodeBox>

        <SubSubTitle>Business glossary — defining terms once</SubSubTitle>

        <CodeBox label="The problem without a shared glossary">{`Finance:    "revenue" = sum of all order amounts including cancelled
Operations: "revenue" = delivered orders only
Product:    "revenue" = GMV (gross merchandise value, all statuses)
Three teams, three definitions, three different numbers in the same meeting.`}</CodeBox>

        <CodeBox label="A business glossary in DataHub">{`Term: "Net Revenue"
Definition: Sum of (order_amount - discount_amount) for orders with
            status = 'delivered'. Excludes cancelled and in-progress orders.
            Approved by: CFO on 2026-01-15.
Owners: finance@freshcart.com (business), data-team@freshcart.com (technical)
Linked assets: gold.daily_revenue.net_revenue, gold.customer_ltv.net_revenue

Term: "GMV (Gross Merchandise Value)"
Definition: Sum of order_amount for all orders regardless of status.
            Used for investor reporting. Does NOT subtract discounts.
Owners: product@freshcart.com
Linked assets: gold.investor_metrics.gmv

Once defined: every table column tagged with "Net Revenue" gets the
canonical definition. Analysts see it when they hover the column — the
SAME definition appears in every BI tool, in DataHub, and in dbt docs.`}</CodeBox>

        <CodeBox label="Creating a glossary term via the DataHub Python API">{`import datahub.emitter.mce_builder as builder
from datahub.emitter.mcp import MetadataChangeProposalWrapper
from datahub.metadata.schema_classes import GlossaryTermInfoClass

term_urn = builder.make_glossary_term_urn("NetRevenue")
term_info = GlossaryTermInfoClass(
    definition="Sum of (order_amount - discount_amount) for status='delivered'.",
    termSource="INTERNAL",
    sourceRef="Finance/MetricsDefinitions.pdf",
    sourceUrl="https://docs.freshcart.internal/metrics/net-revenue",
)
emitter.emit_mcp(MetadataChangeProposalWrapper(entityUrn=term_urn, aspect=term_info))`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Access Control ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Access Control" />
        <SectionTitle>Access Control — Who Can See What and Why</SectionTitle>

        <Para>
          Access control in a data platform operates at multiple levels:
          storage-level (S3 bucket policies), compute-level (warehouse roles),
          table-level (GRANT/REVOKE), and column-level (masking policies).
          Each level serves a different purpose. Getting access control right
          is not just a compliance requirement — it is operational safety.
          A data engineer who accidentally has write access to production Gold
          tables can corrupt them. An analyst with access to Bronze PII
          accidentally exfiltrates customer data.
        </Para>

        <SubSubTitle>Role hierarchy and grant statements (Snowflake)</SubSubTitle>

        <CodeBox label="Role hierarchy for a data platform">{`SYSADMIN
└── DATA_PLATFORM_ADMIN      ← full platform access (data engineering lead)
    ├── PIPELINE_ROLE         ← transformation pipelines (read bronze, write silver/gold)
    ├── ANALYST_ROLE          ← read silver/gold, no PII, no bronze
    ├── DATA_SCIENTIST_ROLE   ← read bronze/silver/gold, no PII columns
    ├── BI_SERVICE_ROLE       ← read gold only, used by Metabase service account
    ├── FINANCE_ROLE          ← read gold finance schema only
    └── OPERATIONS_ROLE       ← read gold operations schema only`}</CodeBox>

        <CodeBox label="Grant statements per role">{`-- PIPELINE_ROLE: runs dbt, reads bronze, writes silver and gold
GRANT USAGE ON DATABASE freshcart_prod TO ROLE pipeline_role;
GRANT USAGE ON SCHEMA freshcart_prod.bronze TO ROLE pipeline_role;
GRANT SELECT ON ALL TABLES IN SCHEMA freshcart_prod.bronze TO ROLE pipeline_role;
GRANT USAGE, CREATE TABLE ON SCHEMA freshcart_prod.silver TO ROLE pipeline_role;
GRANT USAGE, CREATE TABLE ON SCHEMA freshcart_prod.gold   TO ROLE pipeline_role;

-- ANALYST_ROLE: read silver and gold, no bronze (has raw PII), no write
GRANT USAGE ON DATABASE freshcart_prod TO ROLE analyst_role;
GRANT USAGE ON SCHEMA freshcart_prod.silver TO ROLE analyst_role;
GRANT USAGE ON SCHEMA freshcart_prod.gold   TO ROLE analyst_role;
GRANT SELECT ON ALL TABLES IN SCHEMA freshcart_prod.silver TO ROLE analyst_role;
GRANT SELECT ON ALL TABLES IN SCHEMA freshcart_prod.gold   TO ROLE analyst_role;
-- Explicitly block: no access to bronze (raw PII in landing/bronze)

-- BI_SERVICE_ROLE: Metabase service account, read gold only
GRANT USAGE ON SCHEMA freshcart_prod.gold TO ROLE bi_service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA freshcart_prod.gold TO ROLE bi_service_role;

-- FUTURE GRANTS: apply to tables created after the GRANT statement
GRANT SELECT ON FUTURE TABLES IN SCHEMA freshcart_prod.silver TO ROLE analyst_role;
GRANT SELECT ON FUTURE TABLES IN SCHEMA freshcart_prod.gold   TO ROLE analyst_role;
-- Without FUTURE GRANTS: every new Silver/Gold table must be manually granted`}</CodeBox>

        <SubSubTitle>Column-level masking with Dynamic Data Masking</SubSubTitle>

        <CodeBox label="Masking policy definition and column attachment">{`CREATE OR REPLACE MASKING POLICY mask_email_pii
AS (val STRING) RETURNS STRING ->
    CASE
        WHEN CURRENT_ROLE() IN ('DATA_PLATFORM_ADMIN', 'PIPELINE_ROLE')
        THEN val                              -- engineers see raw email
        WHEN CURRENT_ROLE() = 'DATA_SCIENTIST_ROLE'
        THEN SHA2(val, 256)                   -- scientists see hash
        ELSE '***MASKED***'                   -- everyone else sees mask
    END;

ALTER TABLE freshcart_prod.silver.customers
ALTER COLUMN customer_email
SET MASKING POLICY mask_email_pii;`}</CodeBox>

        <Output>{`Analyst queries silver.customers:        customer_email = '***MASKED***'
Data engineer queries silver.customers:  customer_email = 'priya@example.com'
Data scientist queries silver.customers: customer_email = 'sha256hash...'
All three query the SAME table — masking is transparent, no separate views.`}</Output>

        <SubSubTitle>Row-level security — filtering rows by user attributes</SubSubTitle>

        <CodeBox label="Row access policy — store managers see only their store">{`CREATE OR REPLACE ROW ACCESS POLICY store_data_isolation
AS (store_id VARCHAR) RETURNS BOOLEAN ->
    CURRENT_ROLE() IN ('DATA_PLATFORM_ADMIN', 'ANALYST_ROLE')   -- full access
    OR store_id = (
        SELECT assigned_store_id
        FROM governance.user_store_assignments
        WHERE username = CURRENT_USER()
    );

ALTER TABLE freshcart_prod.gold.store_performance
ADD ROW ACCESS POLICY store_data_isolation ON (store_id);
-- Store manager queries gold.store_performance:
-- automatically filtered to their assigned store only — no WHERE clause needed`}</CodeBox>

        <SubSubTitle>AWS Lake Formation — access control for S3 data lakes</SubSubTitle>

        <Para>
          Lake Formation sits on top of S3 and the Glue Catalog. It grants
          table, column, and row-level permissions on Glue catalog tables, and
          works with Athena, Redshift Spectrum, EMR, and Glue ETL.
        </Para>

        <CodeBox label="Column-level grant — excluding PII columns">{`import boto3
lf = boto3.client('lakeformation')

lf.grant_permissions(
    Principal={'DataLakePrincipalIdentifier': 'arn:aws:iam::123456:role/AnalystRole'},
    Resource={
        'TableWithColumns': {
            'DatabaseName': 'freshcart_silver',
            'Name': 'customers',
            'ColumnWildcard': {
                'ExcludedColumnNames': ['customer_email', 'phone_number', 'address']
            },
        }
    },
    Permissions=['SELECT'],
)`}</CodeBox>

        <CodeBox label="Row-level data filter">{`lf.create_data_cells_filter(
    TableData={
        'TableCatalogId': '123456789',
        'DatabaseName':   'freshcart_gold',
        'TableName':      'store_performance',
        'Name':           'south_region_filter',
        'RowFilter': {'FilterExpression': "store_region = 'South'"},
        'ColumnWildcard': {
            'ExcludedColumnNames': ['gross_margin_pct', 'operating_cost']
        },
    }
)`}</CodeBox>

        <CodeBox label="Audit log — every access recorded to CloudTrail">{`# Every SELECT on a Lake Formation-registered table generates a CloudTrail event.
# Query: which users accessed silver.customers in the last 30 days?
SELECT userIdentity.principalId, eventTime, requestParameters.tableName
FROM cloudtrail_logs
WHERE eventName = 'GetTable'
  AND requestParameters.tableName = 'customers'
  AND eventTime > CURRENT_DATE - 30`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — PII and GDPR ────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — PII, GDPR, and Compliance" />
        <SectionTitle>PII Classification, GDPR, and Right-to-Erasure</SectionTitle>

        <Para>
          GDPR (EU) and CCPA (California&rsquo;s Consumer Privacy Act, expanded by
          the CPRA in 2023) require that organisations know where personal data
          is stored, protect it with appropriate controls, and honour erasure
          requests within a statutory window — GDPR requires erasure requests be
          honoured within 30 days; CCPA/CPRA gives organisations 45 days,
          extendable to 90. For a data platform, this means classifying which
          columns contain PII, masking or removing PII at the Silver layer
          boundary, and implementing a right-to-erasure pipeline that can
          delete or anonymise a specific customer&rsquo;s data across all layers.
        </Para>

        <SubSubTitle>PII classification taxonomy</SubSubTitle>

        <CodeBox label="Four sensitivity levels">{`Level 1 — Direct identifiers (highest sensitivity):
  customer_email, phone_number, national_id (SSN), passport_number,
  bank_account_number, credit_card_number
Level 2 — Indirect identifiers (can identify combined with other data):
  full_name, address, date_of_birth, ip_address, device_id, GPS coordinates
Level 3 — Quasi-identifiers (alone not identifying, combined risky):
  city, gender, age_group, job_title, company_name
Level 4 — Non-PII (no restriction):
  order_amount, product_category, store_id, order_status`}</CodeBox>

        <SubSubTitle>Automated PII detection</SubSubTitle>

        <CodeBox label="Regex-based column scanning">{`import re
from dataclasses import dataclass

@dataclass
class PIIDetectionResult:
    column: str
    pii_level: int
    pii_type: str
    confidence: float

PATTERNS = {
    'email':    (1, re.compile(r'\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b')),
    'phone_us': (1, re.compile(r'\\b(?:\\+1[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}\\b')),
    'ssn':      (1, re.compile(r'\\b\\d{3}-?\\d{2}-?\\d{4}\\b')),
    'name':     (2, None),   # requires ML classifier — name detection is hard with regex
    'ip_addr':  (2, re.compile(r'\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b')),
}

def detect_pii_in_column(sample_values: list[str], column_name: str) -> PIIDetectionResult:
    hits = {'email': 0, 'phone_us': 0, 'ssn': 0, 'ip_addr': 0}
    total = len(sample_values)
    for val in sample_values:
        if not isinstance(val, str):
            continue
        for pii_type, (level, pattern) in PATTERNS.items():
            if pattern and pattern.search(val):
                hits[pii_type] += 1
    for pii_type, count in hits.items():
        confidence = count / total if total > 0 else 0
        if confidence > 0.3:    # > 30% of sampled values match
            level = PATTERNS[pii_type][0]
            return PIIDetectionResult(column=column_name, pii_level=level, pii_type=pii_type, confidence=round(confidence, 2))
    return PIIDetectionResult(column=column_name, pii_level=4, pii_type='none', confidence=1.0)`}</CodeBox>

        <Output>{`>>> detect_pii_in_column(['priya@example.com', 'raj@example.com', 'not-an-email'], 'contact_field')
PIIDetectionResult(column='contact_field', pii_level=1, pii_type='email', confidence=0.67)`}</Output>

        <SubSubTitle>Tagging PII in dbt schema.yml</SubSubTitle>

        <CodeBox label="models/bronze/_schema.yml">{`columns:
  - name: customer_email
    meta:
      pii_level: 1
      pii_type: email
      masking_required: true
      retain_in_layers: [bronze]   # raw email only in bronze
      transform_for_silver: "SHA2(customer_email, 256)"

  - name: phone_number
    meta:
      pii_level: 1
      pii_type: phone
      masking_required: true
      transform_for_silver: "REGEXP_REPLACE(phone_number, '[0-9]', 'X')"

# dbt macro that reads pii meta and generates masking transformations:
# {{ transform_pii_column('customer_email') }}
# Generates: SHA2(customer_email, 256) AS customer_email_hashed`}</CodeBox>

        <SubSubTitle>Right-to-erasure — the GDPR delete pipeline</SubSubTitle>

        <Para>
          The Medallion Architecture is designed for immutability — Bronze is
          append-only, so a right-to-erasure request cannot simply
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> DELETE</code> rows.
          The fix is to overwrite PII with a sentinel value while preserving
          non-PII facts (order counts, amounts) for statistical use.
        </Para>

        <CodeBox label="Step 1 — anonymising the Bronze layer">{`from datetime import date, datetime
import hashlib

DELETION_SENTINEL = 'GDPR_ERASED'

def process_erasure_request(customer_id: int, request_date: date, conn) -> dict:
    """Anonymise a customer's PII across all layers. Does NOT delete rows —
    replaces PII values with a sentinel. Preserves non-PII columns for
    statistical use."""
    results = {}

    # BRONZE is the raw layer. This is the ONLY time we UPDATE Bronze —
    # for legal compliance, overriding the append-only design principle.
    bronze_rows = conn.execute("""
        UPDATE bronze.customers
        SET customer_email  = %s,
            phone_number    = %s,
            full_name       = %s,
            ip_address      = %s,
            gdpr_erased     = TRUE,
            gdpr_erased_at  = %s
        WHERE customer_id = %s
        RETURNING customer_id
    """, (DELETION_SENTINEL, DELETION_SENTINEL, DELETION_SENTINEL,
          DELETION_SENTINEL, datetime.utcnow(), customer_id)).fetchall()

    results['bronze_rows_updated'] = len(bronze_rows)
    return results`}</CodeBox>

        <CodeBox label="Step 2 — anonymising Silver and Gold">{`    # SILVER already has masked columns (email_hashed) but may still have
    # quasi-identifiers like full_name or address.
    conn.execute("""
        UPDATE silver.customers
        SET customer_name  = %s,
            address        = %s,
            gdpr_erased    = TRUE
        WHERE customer_id = %s
    """, (DELETION_SENTINEL, DELETION_SENTINEL, customer_id))

    # Update SCD2 dim_customer — ALL versions:
    conn.execute("""
        UPDATE gold.dim_customer
        SET customer_name = %s
        WHERE customer_id = %s
    """, (DELETION_SENTINEL, customer_id))

    # GOLD aggregates (revenue by store, etc.) do NOT contain PII rows — no
    # update needed for most Gold tables. EXCEPTION: fct_orders_wide has
    # customer city + region at order level, which can be quasi-identifying.
    conn.execute("""
        UPDATE gold.fct_orders_wide
        SET customer_tier   = NULL,
            customer_city   = NULL,
            customer_region = NULL
        WHERE customer_id = %s
    """, (customer_id,))`}</CodeBox>

        <CodeBox label="Step 3 — recording the erasure and notifying downstream systems">{`    conn.execute("""
        INSERT INTO governance.erasure_requests
            (customer_id, request_date, completed_at, layers_updated, status)
        VALUES (%s, %s, %s, %s, 'completed')
    """, (customer_id, request_date, datetime.utcnow(), str(results)))
    conn.commit()

    # DOWNSTREAM SYSTEMS:
    # - ML models trained on this customer's data: log for retraining audit
    # - Kafka topics: publish an erasure event for downstream consumers
    # - Data Vault: update satellite records for this hub key
    # All systems subscribed to the erasure event must handle PII deletion.

    return results`}</CodeBox>

        <CodeBox label="GDPR compliance checklist for a data platform">{`✓ PII inventory: every column tagged with pii_level in schema.yml
✓ Masking at Silver boundary: PII replaced before analyst access
✓ Access control: Bronze (raw PII) not accessible to analysts
✓ Audit log: all accesses to PII-containing tables logged
✓ Erasure pipeline: tested, runs within 30 days of request
✓ Data retention: Bronze PII tables have lifecycle policies (max 2 years)
✓ Data residency: customer data stays in approved region (state law requirement)
✓ Consent log: when consent was given/revoked, stored in governance schema`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — Data Mesh ───────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Data Mesh" />
        <SectionTitle>Data Mesh — When to Decentralise Data Ownership</SectionTitle>

        <Para>
          Data mesh is an organisational and architectural pattern for data
          platforms at scale. It proposes that data ownership should be
          decentralised — domain teams (orders, payments, logistics) own and
          publish their data as &ldquo;data products,&rdquo; and a central platform team
          provides the infrastructure and standards. It is a response to the
          bottleneck that emerges at large organisations when a central data
          engineering team is the only team that can build data pipelines.
        </Para>

        <Para>
          Data mesh is frequently misunderstood as a technology choice. It is
          primarily an organisational decision. The four principles are:
          domain ownership, data as a product, self-serve infrastructure, and
          federated computational governance.
        </Para>

        <HighlightBox>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
            The four data mesh principles — what each means for a data engineer
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {[
              { principle: 'Domain Ownership', color: '#00e676', def: 'The Orders team owns orders data. The Payments team owns payments data. They build, maintain, and are responsible for the quality of their data products.', impact: 'A central DE team still exists — but provides infrastructure, not pipelines for every domain.' },
              { principle: 'Data as a Product', color: '#7b61ff', def: 'Data is treated like a software product: it has an owner, a schema contract, an SLA, quality guarantees, and documentation. Consumers can discover and use it reliably.', impact: 'Domain teams define and publish data products to an internal catalog. Central team sets quality standards.' },
              { principle: 'Self-Serve Infrastructure', color: '#f97316', def: 'Domain teams can build and deploy data pipelines without needing the central DE team for every step. Standard tooling, templates, and CI/CD for data.', impact: 'Central team builds dbt project templates, pipeline scaffolding, and catalog integration that domain teams use.' },
              { principle: 'Federated Governance', color: '#4285f4', def: 'Governance standards (access control, PII classification, quality thresholds) are defined centrally but enforced locally by each domain team.', impact: 'Central team defines the rules. Domain teams implement them in their own pipelines.' },
            ].map((item) => (
              <div key={item.principle} style={{ background: 'var(--bg2)', border: `1px solid ${item.color}25`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '14px 16px' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 6 }}>{item.principle}</div>
                <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6, marginBottom: 6 }}>{item.def}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, borderTop: '1px solid var(--border)', paddingTop: 6 }}>Engineering impact: {item.impact}</div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <SubSubTitle>Data mesh vs. centralised — the trade-off table</SubSubTitle>

        <CompareTable
          headers={[{ label: 'Dimension' }, { label: 'Centralised DE team', color: '#00e676' }, { label: 'Data Mesh', color: '#7b61ff' }]}
          keys={['dim', 'central', 'mesh']}
          rows={[
            { dim: 'Org size sweet spot', central: '< 50 engineers, 1-3 domain teams', mesh: '200+ engineers, 10+ domain teams' },
            { dim: 'Pipeline bottleneck', central: 'Central team becomes bottleneck at scale', mesh: 'Domain teams own their pipelines — no central bottleneck' },
            { dim: 'Data quality ownership', central: 'Central DE team owns quality for all domains', mesh: 'Domain teams own their data product quality' },
            { dim: 'Schema changes', central: 'Central team coordinates across all consumers', mesh: 'Domain team owns their schema, publishes contract' },
            { dim: 'Consistency', central: 'High — one team, one standard', mesh: 'Harder — federated teams with varying maturity' },
            { dim: 'Implementation complexity', central: 'Lower — one team, one repo, one approach', mesh: 'High — governance infrastructure, domain onboarding, contract standards' },
            { dim: 'When to choose', central: 'Most startups and mid-size companies', mesh: 'When central team is unable to serve all domain needs, and domains have DE capability' },
          ]}
        />

        <Callout type="tip">
          Data mesh is not about microservices for data, not about eliminating a
          central data team, and not about every team running their own warehouse.
          The central platform team still exists — it provides the infrastructure
          (dbt templates, CI/CD, catalog integration, governance standards) that
          domain teams use. The mesh is about distributing ownership, not
          distributing the infrastructure itself.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 — Governance Tooling Landscape ───────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Tooling Landscape" />
        <SectionTitle>The Governance Tooling Landscape — What Each Tool Does</SectionTitle>

        <CompareTable
          headers={[{ label: 'Tool' }, { label: 'Category', color: '#4285f4' }, { label: 'What it does', color: '#00e676' }, { label: 'Best for', color: '#7b61ff' }]}
          keys={['tool', 'cat', 'what', 'best']}
          rows={[
            { tool: 'DataHub', cat: 'Catalog + Lineage', what: 'Open source. Ingestion connectors for 40+ tools. Search, lineage graph, business glossary, data quality integration.', best: 'Enterprise open source catalog, strong dbt+Airflow integration' },
            { tool: 'OpenMetadata', cat: 'Catalog + Lineage', what: 'Open source alternative to DataHub. Newer, simpler setup, built-in data quality integration.', best: 'Teams that find DataHub too complex to operate' },
            { tool: 'Amundsen (Lyft)', cat: 'Catalog', what: 'Open source. Search-focused. Graph database backend. Less active development than DataHub.', best: 'Historically popular — DataHub has largely superseded it' },
            { tool: 'Alation', cat: 'Catalog', what: 'Enterprise managed. AI-powered search, data stewardship workflows, governance policies.', best: 'Large enterprises with budget and compliance needs' },
            { tool: 'Atlan', cat: 'Catalog + Governance', what: 'Managed. Deep Slack integration, persona-based views, automated PII tagging, dbt native.', best: 'Modern data teams, strong dbt shops' },
            { tool: 'OpenLineage', cat: 'Lineage standard', what: 'LF AI & Data Foundation open standard for lineage event emission. Not a tool — a protocol.', best: 'The standard to adopt — all tools should emit OpenLineage events' },
            { tool: 'Marquez', cat: 'Lineage backend', what: 'Open source OpenLineage event store with REST API and UI. From WeWork.', best: 'Simple open source lineage backend for OpenLineage events' },
            { tool: 'Unity Catalog', cat: 'Access + Governance', what: 'Databricks native. 3-level namespace, column masking, row security, auto lineage, audit logs.', best: 'Databricks lakehouse platforms' },
            { tool: 'AWS Lake Formation', cat: 'Access Control', what: 'AWS native. Fine-grained access on Glue catalog tables. Works with Athena, Redshift Spectrum, EMR.', best: 'AWS-native data lake platforms' },
            { tool: 'Elementary', cat: 'Data Observability', what: 'dbt-native anomaly detection and data observability. Auto-tracks row counts, null rates, distributions.', best: 'dbt-based platforms wanting low-friction observability' },
            { tool: 'Monte Carlo', cat: 'Data Observability', what: 'Managed data observability. ML-based anomaly detection across warehouse and pipelines.', best: 'Enterprise platforms willing to pay for managed observability' },
          ]}
        />
      </section>

      <Divider />

      {/* ── Misconceptions ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Data Governance</SectionTitle>

        {[
          {
            wrong: '"Governance is a compliance/legal concern — engineering just implements what legal asks for"',
            right: 'Part 02\'s impact-analysis workflow shows governance solving a purely engineering problem: without lineage, a routine column change takes 3 hours of reactive debugging; with it, 30 minutes of planning. Lineage, cataloging, and access control save engineering time on their own, independent of any compliance requirement.',
          },
          {
            wrong: '"Column-level access control means maintaining a separate view per role"',
            right: 'Part 04\'s masking-policy approach is specifically the alternative to that: one masking policy attached directly to the column serves every role transparently — the analyst, the data scientist, and the engineer all query the same silver.customers table and each sees the correct version of the value, with no per-role view to keep in sync.',
          },
          {
            wrong: '"GDPR erasure means deleting the customer\'s rows from every table"',
            right: 'Part 05 is explicit that rows are never deleted — PII values are overwritten with a sentinel (GDPR_ERASED) while non-PII facts (order counts, amounts) are preserved for statistical validity, and Bronze in particular is only ever UPDATEd for this one legally-mandated reason, not deleted from.',
          },
          {
            wrong: '"A data catalog is just a UI on top of a database schema browser"',
            right: 'Part 03\'s DataHub walkthrough shows a catalog carries information no schema browser has: business descriptions and glossary terms tied to columns, usage statistics showing who actually queries a table, data-quality status from the last dbt test run, and full lineage — none of which exists in the source database itself.',
          },
          {
            wrong: '"Data mesh is the natural next step for any team outgrowing a single data engineer"',
            right: 'Part 06 is direct about the actual threshold: data mesh only pays off past roughly 200 engineers and 10+ domains, and it requires each domain team to already have real data engineering capability — adopting it earlier, as Part 09\'s interview answer for Q5 spells out, produces inconsistent quality across domains rather than the coordination relief it promises.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 08 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 08 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A GDPR Audit Finds PII Exposed to Analysts — The Remediation</SectionTitle>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Scenario — FreshCart · Legal team requests GDPR audit, DPO finds issues
          </div>

          <Para>
            FreshCart&rsquo;s Data Protection Officer conducts a GDPR audit. They find
            that customer emails and phone numbers in silver.customers are directly
            accessible to 12 analysts, the data engineer who quit last year still
            has active Snowflake credentials, and there is no audit log of who
            accessed customer data. You are given two weeks to fix all three.
          </Para>

          <SubSubTitle>Finding 1 — PII accessible to all analysts</SubSubTitle>

          <CodeBox label="Fix — column masking policies for each PII column type">{`-- Current: GRANT SELECT ON ALL TABLES IN SCHEMA silver TO ROLE analyst_role;
-- silver.customers has: customer_email, phone_number, full_name, address

CREATE MASKING POLICY mask_email AS (v VARCHAR) RETURNS VARCHAR ->
    CASE WHEN CURRENT_ROLE() IN ('PIPELINE_ROLE','DATA_PLATFORM_ADMIN')
         THEN v ELSE SHA2(v, 256) END;

CREATE MASKING POLICY mask_phone AS (v VARCHAR) RETURNS VARCHAR ->
    CASE WHEN CURRENT_ROLE() IN ('PIPELINE_ROLE','DATA_PLATFORM_ADMIN')
         THEN v ELSE REGEXP_REPLACE(v, '.', 'X') END;

CREATE MASKING POLICY mask_name AS (v VARCHAR) RETURNS VARCHAR ->
    CASE WHEN CURRENT_ROLE() IN ('PIPELINE_ROLE','DATA_PLATFORM_ADMIN')
         THEN v ELSE LEFT(v, 1) || '***' END;   -- 'P***' (initial only)

ALTER TABLE silver.customers ALTER COLUMN customer_email SET MASKING POLICY mask_email;
ALTER TABLE silver.customers ALTER COLUMN phone_number SET MASKING POLICY mask_phone;
ALTER TABLE silver.customers ALTER COLUMN full_name SET MASKING POLICY mask_name;
-- No data model changes needed. No view required. Masking is transparent.`}</CodeBox>

          <Output>{`Analyst queries silver.customers:
customer_email = 'a3f4...sha256hash...'
phone_number   = 'XXXXXXXXXX'
full_name      = 'P***'`}</Output>

          <SubSubTitle>Finding 2 — departed employee still has active credentials</SubSubTitle>

          <CodeBox label="Fix — access review and automated offboarding">{`SELECT user_name, last_success_login, login_history
FROM snowflake.account_usage.users
WHERE disabled = FALSE
ORDER BY last_success_login DESC;
-- Found: former_employee@freshcart.com, last login 47 days ago

ALTER USER former_employee@freshcart.com SET DISABLED = TRUE;

-- Preventive: automate offboarding via HR system integration —
-- when HR marks an employee departed: disable Snowflake user, revoke all
-- role assignments, log the access review, notify the security team.`}</CodeBox>

          <SubSubTitle>Finding 3 — no audit log of customer data access</SubSubTitle>

          <CodeBox label="Fix — enable Snowflake access history for the DPO">{`-- Snowflake retains access_history for 365 days in ACCOUNT_USAGE. Always on.
GRANT SELECT ON SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY TO ROLE dpo_role;

-- DPO audit query: who accessed customer PII in the last 90 days?
SELECT user_name, query_start_time, query_text, base_objects_accessed
FROM snowflake.account_usage.access_history,
     LATERAL FLATTEN(base_objects_accessed) f
WHERE f.value:objectName::STRING ILIKE '%silver.customers%'
  AND query_start_time >= CURRENT_DATE - 90
ORDER BY query_start_time DESC;

-- Ongoing: schedule a weekly DPO report to governance.pii_access_log
-- for a permanent audit trail beyond Snowflake's 365-day retention.`}</CodeBox>

          <Output>{`OUTCOMES AFTER REMEDIATION:
PII masked for all analysts:            same-day fix via column masking
Departed employee disabled:             same day
Audit log available to DPO:             1 day (access grant + query setup)
Full PII inventory across all tables:   1 week (schema.yml audit)
Automated offboarding process:          2 weeks (HR integration)
GDPR compliance documentation updated:  2 weeks`}</Output>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is data lineage and why does it matter for a data engineering team?',
            a: `Data lineage is the record of how data moves through a platform — which source systems produced it, which transformations touched it, which downstream datasets depend on it. It answers two questions that arise constantly in production: "where did this data come from?" and "if I change this table, what breaks?"

The practical value is in two workflows. First, incident investigation: when a Gold metric is wrong, column-level lineage lets you trace the broken metric back through Gold model → Silver model → staging model → source table → source system, in minutes rather than hours. Without lineage, this investigation requires reading code in multiple repositories and asking other engineers what each transformation does.

Second, impact analysis: before changing the definition of a Silver column, lineage tells you exactly which downstream models and BI tools consume that column. You can see that changing net_revenue affects four Gold models and two Metabase dashboards. You notify the affected teams, update all downstream models together, and deploy without surprises. Without lineage, you deploy the change, something breaks, and you spend hours finding everything that was downstream.

Column-level lineage is more precise than table-level lineage. Table-level lineage says "gold.daily_revenue depends on silver.orders." Column-level lineage says "daily_revenue.net_revenue is computed from silver.orders.order_amount minus silver.orders.discount_amount." This is what lets you do precise impact analysis for a specific column change.

Tools: dbt provides lineage automatically for all dbt models. OpenLineage is the open standard for emitting lineage events from Spark, Airflow, and other tools. DataHub and Marquez are backends that store and visualise lineage. The dbt lineage graph is often sufficient for teams that run everything through dbt.`,
          },
          {
            q: 'Q2. How would you implement a data catalog for a data platform? What would you include and why?',
            a: `A data catalog is a searchable inventory of all data assets in the platform. Implementing one involves three things: capturing metadata, making it searchable, and keeping it current.

Capturing metadata starts with descriptions in dbt schema.yml files. Every model and every column in the Gold layer should have a description, an owner, and relevant tags. When dbt docs generate runs, these descriptions are machine-readable. DataHub or OpenMetadata ingests them via a connector that reads the dbt manifest.json file. This automatically populates the catalog with all dbt models, their columns, descriptions, and owners whenever dbt deploys.

The catalog should include: table and column descriptions (what the data means, not just what it is), the grain of each table, the owner team, the update schedule and SLA, links to downstream consumers, data quality status from the last test run, and usage statistics showing which tables are queried most and by whom. Usage statistics are particularly valuable — they show which tables are actually used and which are stale or redundant.

A business glossary is the other critical component. It defines business terms — "Net Revenue," "GMV," "Active Customer" — with canonical definitions approved by the business. Each Gold column is linked to its glossary term. When an analyst searches for "revenue," they find the canonical term, its definition, and the table columns that implement it. This eliminates the divergent definitions problem.

Keeping it current is the hardest part. Metadata captured once and never updated becomes misleading — a table marked "owner: data-team@freshcart.com" when the actual owner moved teams six months ago is worse than no metadata. Automate ingestion: run DataHub ingestion after every dbt deploy. Require description updates as part of the PR review for any new model. Include a "last verified" date that engineers update when they confirm metadata is still accurate.`,
          },
          {
            q: 'Q3. Explain column-level access control. How would you implement it in Snowflake and why is it better than creating separate views?',
            a: `Column-level access control restricts which columns a user or role can read, without restricting which table they can query. In Snowflake, this is implemented using Dynamic Data Masking policies — functions that return either the real value or a masked value based on the querying user's role.

A masking policy is defined as a SQL function that takes the column value and returns the appropriate version for the current role. A role-based email masking policy might return the raw email for the data_platform_admin role, a SHA-256 hash for the data_scientist role, and '***MASKED***' for the analyst role. The policy is attached to the specific column in the table definition. When any user queries the table, Snowflake evaluates the masking policy for their role and returns the appropriate value transparently.

This is superior to creating separate views with specific columns selected for several reasons. First, maintenance: a masking policy is attached to one column in one place. If you need to add a new role or change the masking logic, you update one policy. With views, you maintain a separate view per role (analyst_view, scientist_view, admin_view) and update all three whenever masking logic changes. For a table with ten PII columns and five roles, that is fifty separate column references in views to maintain.

Second, transparency: analysts always query silver.customers with no additional syntax. The masking is invisible to them — they get what they are authorised to see without knowing a masking policy exists. With views, analysts must know to query customer_analyst_view instead of customers, which is confusing and easy to get wrong.

Third, audit: Snowflake's access history log records every query against the table regardless of which role ran it. With views, you have to check access history for every view separately to reconstruct who accessed what column.

The same concept in AWS Lake Formation is implemented through column wildcards with excluded column names in the grant statement, achieving the same effect for S3-backed Glue tables.`,
          },
          {
            q: 'Q4. A customer submits a GDPR right-to-erasure request. Walk through how you would fulfil it in a Medallion Architecture platform.',
            a: `A GDPR right-to-erasure request (Article 17) requires that a customer's personal data be deleted or anonymised across all systems within 30 days. In a Medallion Architecture, this is complex because the Bronze layer is designed to be immutable — but legal compliance supersedes the immutability design principle.

The approach is to replace PII values with a sentinel (like 'GDPR_ERASED') rather than deleting rows, because deleting rows from the middle of an append-only Bronze table causes partition corruption in Delta Lake and breaks the audit trail of how many orders existed. Anonymisation preserves non-PII facts (order counts, amounts) for statistical validity while removing identifying information.

The process runs in order through all layers. Bronze first: UPDATE the customer's rows across all Bronze tables that contain PII — customer_email, phone_number, full_name, address — replacing them with the sentinel value. Set gdpr_erased=TRUE and gdpr_erased_at=NOW(). This is the only legitimate UPDATE to Bronze. Silver second: same approach, but Silver may have fewer raw PII fields since masking happened at ingestion. All versions of the SCD2 dimension rows for this customer_id are updated. Gold third: Gold aggregates generally do not contain PII (revenue by store is not personally identifying), but Gold wide tables like fct_orders_wide may have customer_city and customer_region that could be quasi-identifying — anonymise these too.

After processing: record the erasure in governance.erasure_requests with the timestamp and a list of all tables updated. Publish an erasure event to Kafka or a message queue so any downstream systems that consume from the platform can also process the deletion. ML models trained on this customer's data should be logged for the next scheduled model retraining, which will exclude the erased customer's data.

The entire process should be idempotent — running it twice for the same customer_id produces the same result. And it should complete within 25 days of receipt to leave buffer before the 30-day regulatory deadline.`,
          },
          {
            q: 'Q5. What is data mesh and when would you recommend it? What are the risks of adopting it too early?',
            a: `Data mesh is an organisational pattern for large data platforms where data ownership is decentralised to domain teams (orders team, payments team, logistics team) rather than centralised in a single data engineering team. Each domain team owns, builds, and is accountable for their own "data products." A central platform team provides the shared infrastructure, standards, and tooling that domain teams use.

The four principles are: domain ownership (orders team owns orders data), data as a product (each domain's data asset has an owner, SLA, schema contract, and documentation), self-serve infrastructure (domain teams can build pipelines without needing central DE for every request), and federated governance (quality standards and access control rules defined centrally, implemented locally).

Data mesh is appropriate when a central data engineering team has become a bottleneck — domain teams wait weeks for the central team to build pipelines for their data, and the central team cannot scale to serve all domains. This typically happens at organisations with more than 200 engineers and ten or more distinct product domains. Uber Eats, Amazon, and Venmo at scale face these bottlenecks.

The risks of adopting it too early are significant. Data mesh requires that domain teams have data engineering capability — they must be able to build and maintain pipelines, write dbt models, and manage data quality for their domain. Most domain teams do not have this capability without significant hiring or training. The result is inconsistent data quality across domains: the payments team produces excellent data products, the logistics team produces undocumented and untested tables that nobody trusts. Governance standards exist on paper but are not enforced because the central team no longer reviews every pipeline.

For most organisations — anything below 100-200 engineers or fewer than 5-10 distinct domains — a centralised data engineering team with good documentation, a data catalog, and data contracts produces better outcomes than attempting data mesh. The complexity of building the self-serve infrastructure alone (dbt project templates, CI/CD for pipelines, catalog integration, governance tooling) requires months of engineering work before a single domain team can adopt it.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Granting OWNERSHIP or ACCOUNTADMIN to an analyst role "just to unblock them faster"',
            a: 'Part 04\'s masking policies and this module\'s Error Library both note that masking silently stops applying to any role with OWNERSHIP or ACCOUNTADMIN — an elevated role doesn\'t just over-grant access, it bypasses PII protection entirely without any error or warning. Keep analyst roles strictly to SELECT on the schemas they need.',
          },
          {
            q: 'Treating a one-off SQL script in the warehouse as equivalent to a dbt model',
            a: 'This module\'s Error Library shows exactly what breaks: a table built by a manual script never appears in the dbt manifest, so DataHub\'s lineage graph shows it with no upstream at all — even though it was clearly built from another table. Every Gold table needs to go through dbt specifically so lineage and cataloging stay accurate automatically.',
          },
          {
            q: 'Assuming a GDPR erasure request means deleting rows from Bronze',
            a: 'Part 05 is explicit that Bronze is append-only by design, and the correct erasure pattern overwrites PII fields with a sentinel value in an UPDATE — the one deliberate exception to Bronze\'s immutability rule — rather than deleting rows, which would corrupt partition-level guarantees and audit counts.',
            },
          {
            q: 'Building column-level access control as a set of per-role SQL views',
            a: 'Part 04 walks through why this doesn\'t scale: a table with ten PII columns and five roles becomes fifty separate view-column references to keep in sync every time masking logic changes. A single masking policy attached to the column handles every role transparently and is the pattern this track uses everywhere.',
          },
          {
            q: 'Rolling out data mesh because the current data team feels overloaded',
            a: 'Part 06\'s trade-off table and Part 09\'s Q5 both point to the same threshold — data mesh only becomes the right call past roughly 200 engineers and 10+ domains, and only once domain teams already have real data engineering capability. Below that, the standard fix is better documentation, a catalog, and data contracts with a centralised team, not a governance model built for a much larger org.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `DataHub ingestion runs successfully but dbt model descriptions are not appearing in the catalog — models show up with no documentation`,
            cause: 'The DataHub ingestion recipe points to the dbt manifest.json but not to the catalog.json. The manifest.json contains the model graph and SQL but does not include compiled column-level metadata. The catalog.json (generated by dbt docs generate, not dbt run) contains column descriptions, data types, and statistics. Without catalog.json, DataHub can discover that the models exist but cannot display their column descriptions.',
            fix: 'Ensure the dbt pipeline runs dbt docs generate in addition to dbt run. This generates both target/manifest.json and target/catalog.json. Update the DataHub ingestion recipe to include catalog_path: /path/to/target/catalog.json. Re-run ingestion. Column descriptions from schema.yml will now appear in DataHub. Automate this: add dbt docs generate to the CI/CD pipeline so catalog.json is always fresh after deployment.',
          },
          {
            error: `Column masking policy is not working — analysts can still see raw email addresses despite the masking policy being applied`,
            cause: 'The analyst\'s Snowflake session is using a role that has OWNERSHIP privilege on the table, not the ANALYST_ROLE. Masking policies in Snowflake do not apply to roles with OWNERSHIP or ACCOUNTADMIN. The analyst was granted the wrong role — they inherited an older role assignment that has table ownership. The masking policy is correctly defined and attached but is bypassed by the privilege escalation.',
            fix: 'Check the analyst\'s current role: SELECT CURRENT_ROLE(). If it shows anything other than ANALYST_ROLE, the role assignment is wrong. Revoke the escalated role: REVOKE ROLE table_owner FROM USER analyst_priya. Assign the correct role: GRANT ROLE analyst_role TO USER analyst_priya. Then verify the masking works: USE ROLE analyst_role; SELECT customer_email FROM silver.customers LIMIT 1. Going forward: never grant OWNERSHIP or ACCOUNTADMIN to analyst users. Use the principle of least privilege — analysts should have SELECT only on the specific schemas they need.',
          },
          {
            error: `GDPR erasure pipeline ran successfully but the customer's email still appears in Silver query results two days later`,
            cause: 'The erasure pipeline updated silver.customers correctly, but Snowflake\'s result cache is returning the pre-erasure result. The cache stores the query result for 24 hours. The analyst ran the exact same query both before and after the erasure, and the second run returned the cached result from before the erasure was applied.',
            fix: 'Invalidate the result cache for the affected table after running an erasure: ALTER TABLE silver.customers SUSPEND RECLUSTER — this does not directly invalidate cache but combined with running a small UPDATE (set a harmless metadata column) will invalidate any cached results for that table. More reliably: after erasure, run a no-op update that touches the table version in Delta Lake — this forces cache invalidation. Long term: document that erasure confirmation queries should use SELECT /*+ NO_CACHE */ or run 30 minutes after erasure to allow cache expiry.',
          },
          {
            error: `Data lineage graph shows incorrect upstream dependencies — gold.daily_revenue appears to have no upstream, despite being built from silver.orders`,
            cause: 'The gold.daily_revenue model was not built through dbt — it was created as a one-time table using a raw SQL script run directly in Snowflake. DataHub\'s lineage comes from dbt manifest ingestion and Snowflake query log parsing. The one-off SQL script did not generate a dbt manifest entry, and the Snowflake query log is only processed for the past 24 hours by default. Since the table was created months ago, no query log entry was captured.',
            fix: 'Migrate the one-off SQL model to a dbt model immediately — create a dbt file for gold.daily_revenue with the same SQL, deploy it, and run DataHub dbt ingestion. This populates the lineage from dbt manifest. For the future: all Gold tables must be built through dbt, not manual SQL scripts. Add a governance rule: any table in the gold schema that does not appear in the dbt manifest triggers a warning in the DataHub quality check.',
          },
          {
            error: `An analyst accidentally dropped a Silver table — DROP TABLE silver.orders — and the pipeline cannot rebuild it because the role used by the pipeline also has DROP privilege`,
            cause: 'The pipeline service account role (PIPELINE_ROLE) was granted too many privileges. It has OWNERSHIP on the schema, which includes DROP TABLE permission. The analyst was also running under a role with elevated privileges. Granting CREATE TABLE on a schema to a role also grants DROP TABLE in most warehouse implementations.',
            fix: 'Immediate recovery: UNDROP TABLE silver.orders; — Snowflake\'s Time Travel retention window keeps a dropped table recoverable, and UNDROP restores it in place with a single statement (no version number needed, unlike Delta Lake\'s RESTORE TABLE ... TO VERSION AS OF syntax, which does not exist in Snowflake). Re-run dbt to verify the restore. Privilege remediation: PIPELINE_ROLE should have CREATE TABLE and INSERT privileges, but not OWNERSHIP or DROP TABLE. In Snowflake, create the schema under a privileged role, then grant only INSERT/SELECT/CREATE TABLE to PIPELINE_ROLE without transferring OWNERSHIP. For analysts: never grant any write or DDL privileges on production schemas. Separate pipelines and analysts into entirely different role hierarchies. Add a CI check that validates no analyst role has DROP TABLE capability on production.',
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
        'Data governance has four practical pillars: Discoverability (analysts find the right table without asking on Slack), Lineage (every dataset traceable back to its source), Access Control (right people see right data, PII protected), Compliance (GDPR erasure fulfilled, retention enforced, audit logs maintained).',
        'Column-level lineage is more valuable than table-level lineage. It tells you exactly which source column produced each Gold column. Use it for impact analysis before any schema change: check every downstream consumer of the column you are changing before deploying.',
        'DataHub is the leading open source data catalog. It ingests metadata from dbt (manifest.json + catalog.json), Snowflake query logs, Airflow, Spark, and 40+ other tools. Requires both manifest.json AND catalog.json for column descriptions. Run dbt docs generate in CI so catalog.json is always current.',
        'Business glossary centralises business term definitions. "Net Revenue," "GMV," and "Active Customer" each have one canonical definition approved by the business, linked to the column(s) that implement it. Eliminates the meeting where Finance and Product report different revenue numbers.',
        'Role-based access control: pipeline service account reads Bronze, writes Silver/Gold. Analyst role reads Silver/Gold only, never Bronze (which has raw PII). BI service account reads Gold only. Always use FUTURE GRANTS so new tables automatically inherit the correct permissions without manual grant statements.',
        'Column masking policies in Snowflake apply masking logic transparently based on the querying role — analysts always query silver.customers but see masked emails. Superior to maintaining separate views per role: one policy, one maintenance point, invisible to query writers. Masking does NOT apply to OWNERSHIP or ACCOUNTADMIN roles.',
        'PII classification levels: Level 1 (direct identifiers — email, phone, SSN), Level 2 (indirect — name, address, IP), Level 3 (quasi-identifiers — city, age), Level 4 (non-PII). Tag every column with its level in dbt schema.yml meta fields. Apply masking at Silver layer for Level 1 and Level 2.',
        'GDPR right-to-erasure: replace PII values with a sentinel (GDPR_ERASED) rather than deleting rows. Update Bronze → Silver → Gold in that order. This is the only legitimate UPDATE to the append-only Bronze layer — legal compliance supersedes the immutability design principle. Record the erasure in governance.erasure_requests. Publish an erasure event for downstream systems.',
        'Data mesh is an organisational pattern, not a technology choice. Appropriate when a central DE team is a bottleneck at scale (200+ engineers, 10+ domains). Domain teams own their data products. Central platform team provides infrastructure and standards. Adopting it too early produces inconsistent quality across domains because domain teams lack DE capability.',
        'Lineage for impact analysis workflow: before changing a model, run dbt ls --select +model_name+ to find all downstream models. Cross-check in DataHub for non-dbt consumers (BI tools, APIs). Update all downstream models together in one deployment. Never change a Gold column definition without knowing all downstream consumers — one unplanned downstream breakage erodes team trust more than any performance issue.',
      ]} />


      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 39 covers security and compliance — encryption at rest and in transit, PII handling, GDPR, and the CCPA — with practical patterns for building pipelines that are compliant by design.
        </p>
        <Link href="/learn/data-engineering/security-compliance" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 39 → Security and Compliance for Data Engineers
        </Link>
      </div>
    </LearnLayout>
  )
}
