import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

const K = '#ff6b4a'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

const SectionTag = ({ text }: { text: string }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: FONT_MONO, marginBottom: 10 }}>{text}</div>
)
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: FONT_DISPLAY, lineHeight: 1.2 }}>{children}</h2>
)
const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 'clamp(17px, 2vw, 22px)', fontWeight: 800, letterSpacing: '-0.4px', color: 'var(--text)', margin: '30px 0 12px', fontFamily: FONT_DISPLAY }}>{children}</h3>
)
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.95, marginBottom: 20 }}>{children}</p>
)
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '54px 0' }} />
const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 26 }}>{children}</div>
)
const Callout = ({ title, children, color = K }: { title: string; children: React.ReactNode; color?: string }) => (
  <div style={{ background: `${color}0d`, border: `1px solid ${color}33`, borderLeft: `4px solid ${color}`, borderRadius: '0 12px 12px 0', padding: '18px 22px', margin: '26px 0' }}>
    <div style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: FONT_MONO, marginBottom: 8 }}>{title}</div>
    <div style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
)
const CodeBox = ({ label, children }: { label: string; children: string }) => (
  <div style={{ marginBottom: 26 }}>
    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: FONT_MONO }}>{label}</div>
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: FONT_MONO, margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const Output = ({ children }: { children: string }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: FONT_MONO, display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ opacity: 0.6 }}>▸</span> output
    </div>
    <pre style={{ background: 'transparent', border: '1px dashed var(--border)', borderRadius: 10, padding: '14px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8, color: 'var(--muted)', fontFamily: FONT_MONO, margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const BulletList = ({ items }: { items: string[] }) => (
  <ul style={{ display: 'grid', gap: 11, margin: '0 0 22px', paddingLeft: 0, listStyle: 'none' }}>
    {items.map(item => (
      <li key={item} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.8 }}>
        <span style={{ color: K, fontWeight: 900, marginTop: 2 }}>✓</span><span>{item}</span>
      </li>
    ))}
  </ul>
)
const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div style={{ overflowX: 'auto', marginBottom: 30 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
      <thead><tr>{headers.map(header => <th key={header} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: K, fontFamily: FONT_MONO, borderBottom: `2px solid ${K}55`, background: `${K}0d`, minWidth: 180 }}>{header}</th>)}</tr></thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.join('|')} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
            {row.map((cell, j) => <td key={j} style={{ padding: '12px 16px', color: j === 0 ? 'var(--text)' : 'var(--muted)', borderBottom: '1px solid var(--border)', verticalAlign: 'top', lineHeight: 1.7, fontWeight: j === 0 ? 700 : 400 }}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default function ProjectStructure() {
  return (
    <LearnLayout
      title="Project Structure and Layering"
      description="Staging, intermediate, and marts in real depth — one staging model per source, business logic isolated in intermediate, domain-organized marts, naming conventions, and how a project stays maintainable past 200 models."
      section="dbt — Module 16"
      readTime="65 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'Project Structure and Layering', href: '/learn/dbt/project-structure' },
      ]}
      prev={{ title: 'Hooks and Operations', href: '/learn/dbt/hooks-and-operations' }}
      next={{ title: 'Performance and Query Optimization in dbt', href: '/learn/dbt/performance-tuning-dbt' }}
    >
      {/* ── Part 01 — Why layering is the real subject ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Beyond the Beginner Picture" />
        <SectionTitle>Layering Is a Maintenance Strategy, Not a Folder Convention</SectionTitle>

        <Para>
          An earlier module introduced staging, intermediate, and marts as a beginner-level convention:
          staging cleans, intermediate combines, marts finalize. That description is correct as far as it
          goes, but it undersells what the layering is actually for. Layering is not primarily about tidy
          folders — it is a deliberate strategy for containing the blast radius of change in a project that
          will eventually have hundreds of models, dozens of contributors, and source systems that change
          their schemas without warning.
        </Para>

        <Para>
          The question this module is really answering is: when something upstream breaks — a column gets
          renamed in a source system, a business rule changes, a new join condition is discovered — how many
          files does a person have to touch, and how confident can they be that they found all of them? A
          well-layered project has a precise, small, predictable answer to that question for almost any kind
          of change. A poorly layered project has an answer that starts with "grep the entire models
          directory and hope."
        </Para>

        <HighlightBox>
          <Para>
            <strong>The organizing principle behind everything in this module:</strong> every model should
            have exactly one reason to change. A staging model changes only when its one raw source table's
            shape changes. An intermediate model changes only when the specific business logic it encodes
            changes. A mart changes only when the business-facing shape stakeholders consume needs to
            change. When a model has two or more of those reasons braided together, a change to one reason
            forces you to re-review logic that had nothing to do with the change — and that is exactly the
            situation this module's layering rules exist to prevent.
          </Para>
        </HighlightBox>

        <Para>
          This module assumes you're comfortable with the mechanics of a model — <code>ref()</code>,
          <code>source()</code>, materializations, the <code>config()</code> block — covered earlier in this
          track. What follows goes deep on the one topic those modules only sketched: exactly what belongs in
          each layer, why the boundaries are drawn where they are, how to name things so a project stays
          self-describing at 20 models and at 300, and a full worked example tying every rule to a realistic,
          multi-source project.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 — Staging in depth ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Staging Layer, in Depth" />
        <SectionTitle>One Staging Model per Source Table — Nothing More, Nothing Less</SectionTitle>

        <Para>
          The staging layer's job is narrower than it might first appear, and the narrowness is the entire
          point. A staging model exists to do exactly one thing: take one raw source table and produce a
          clean, renamed, correctly-typed version of it — with zero joins to any other table, and zero
          business logic of any kind. If you can describe what a staging model does without using the word
          "and," it's a staging model. The moment "and" creeps in — "renames columns <em>and</em> joins to
          customers" — the model has drifted out of the staging layer's job description.
        </Para>

        <Table
          headers={['Allowed in a staging model', 'Not allowed in a staging model']}
          rows={[
            ['Renaming a cryptic column to something self-explanatory (cust_id → customer_id)', 'Joining to any other staging model or source table'],
            ['Casting a column to an explicit, correct type (a string timestamp → a real timestamp type)', 'Computing a derived business metric (a discount rate, a lifetime value, a margin)'],
            ['Light, structural filtering (dropping QA test rows, dropping hard-deleted rows a source flags)', 'Any CASE expression encoding a business rule, not just a type normalization'],
            ['Normalizing surface-level inconsistency (lowercasing a status string, trimming whitespace)', 'Aggregation of any kind — a SUM, COUNT, or GROUP BY has no place in a staging model'],
            ['A 1:1 relationship with exactly one raw source table', 'Referencing a business concept that spans more than one source system'],
          ]}
        />

        <CodeBox label="models/staging/stripe/stg_stripe__payments.sql — a correctly scoped staging model">
{`with source as (

    select * from {{ source('stripe', 'payments') }}

),

renamed as (

    select
        id                                  as payment_id,
        order_id,
        amount_cents                        as amount_cents,
        lower(status)                       as payment_status,
        cast(created as timestamp)          as created_at,
        cast(updated as timestamp)          as updated_at

    from source
    where not _fivetran_deleted

)

select * from renamed`}
        </CodeBox>

        <Para>
          Notice everything this model deliberately does not do. It does not join to an
          <code>orders</code> table to check whether <code>order_id</code> is valid — that's a
          <code>relationships</code> test, not staging-layer logic. It does not compute whether the payment
          succeeded in a business sense beyond normalizing the raw status string — that belongs downstream,
          where "succeeded" might mean something more nuanced than one status value. The only judgment calls
          made here are structural: rename, cast, drop rows that shouldn't exist in a clean dataset at all.
        </Para>

        <Callout title="Why staging stays this thin, even when it feels like busywork" color={K}>
          A thin staging layer feels like overhead when a project is small — why not just join straight from
          <code>source()</code> calls and skip the extra file? The payoff only shows up once a raw source
          table's shape changes, which Part 05 covers in full. A thin, one-to-one staging model is the only
          layer that can absorb that kind of change by itself, without touching anything downstream.
        </Callout>

        <SubTitle>Staging models are almost always views, and that is deliberate</SubTitle>

        <Para>
          Staging models default to view materialization for a reason connected directly to their scope: they
          are thin, so recomputing them on every downstream query is cheap, and keeping them as views means
          they never go stale relative to the raw source — exactly what a cleanup layer that many other
          models build on should guarantee. A staging model materialized as a table introduces a lag between
          when raw data lands and when the cleaned version reflects it, which is rarely what you want this
          close to the source.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 — Intermediate in depth ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The Intermediate Layer, in Depth" />
        <SectionTitle>Where Joins and Business Logic Actually Live</SectionTitle>

        <Para>
          If staging is defined by what it must not do, intermediate is defined by what it exists to do:
          combine two or more staging models and apply the business logic that turns clean, independent
          tables into a single, coherent, business-meaningful shape. This is where a join between
          <code>stg_stripe__payments</code> and <code>stg_app__orders</code> happens. This is where a
          <code>CASE</code> expression deciding whether a payment counts as "successful" for revenue-reporting
          purposes lives. This is where a fan-out risk from a one-to-many join gets deliberately handled,
          rather than silently inherited by whatever mart references the model later.
        </Para>

        <CodeBox label="models/intermediate/finance/int_payments_joined_to_orders.sql">
{`{{ config(materialized='ephemeral') }}

with payments as (

    select * from {{ ref('stg_stripe__payments') }}

),

orders as (

    select * from {{ ref('stg_app__orders') }}

),

joined as (

    select
        payments.payment_id,
        payments.order_id,
        payments.amount_cents,
        payments.payment_status,
        orders.customer_id,
        orders.order_placed_at,
        -- business logic: what counts as a "successful" payment for
        -- revenue purposes is narrower than the raw Stripe status --
        -- a refunded-then-recaptured payment is still "succeeded" at
        -- the Stripe API level but should not double-count as revenue
        case
            when payments.payment_status = 'succeeded'
                 and payments.amount_cents > 0
            then true
            else false
        end as counts_as_revenue

    from payments
    left join orders
        on payments.order_id = orders.order_id

)

select * from joined`}
        </CodeBox>

        <Para>
          Two details in that file are worth naming explicitly. First,
          <code>materialized='ephemeral'</code> is a common, though not universal, choice for intermediate
          models — they are implementation details, stepping stones toward a mart, not something an analyst
          or a BI tool is ever meant to query directly. Making them ephemeral keeps the warehouse's schema
          browser free of clutter that nobody outside the dbt project itself should ever need to see. Second,
          the <code>counts_as_revenue</code> column is exactly the kind of business logic that has no business
          living in either <code>stg_stripe__payments</code> (which knows nothing about how this company
          defines revenue) or a downstream mart (which would then have to re-derive or duplicate this logic
          in every mart that needs it).
        </Para>

        <Table
          headers={['Signal a model belongs in intermediate', 'Signal a model does not belong in intermediate']}
          rows={[
            ['It joins two or more staging models together', 'It reads from exactly one staging model with no join — that is thin enough to just be part of a mart, or reconsidered as staging scope'],
            ['It encodes a business rule that more than one downstream mart will need', 'It is the final, dashboard-facing shape a BI tool queries directly — that is a mart\'s job, not intermediate\'s'],
            ['It is not meant to be queried directly by anyone outside the dbt project', 'It needs to be queried ad hoc by analysts — give it a mart\'s visibility instead'],
            ['Removing it would force the same join/logic to be duplicated across multiple marts', 'It is used by exactly one mart and the logic is trivial enough that inlining it there is clearer'],
          ]}
        />

        <Callout title="Not every mart needs an intermediate step" color={K}>
          A simple mart built from one or two staging models with a straightforward join often skips the
          intermediate layer entirely and joins directly in the mart file. Intermediate exists for when the
          join or business logic itself is complex enough, or reused widely enough, to deserve its own named,
          independently testable model — not as a mandatory layer every mart must pass through regardless of
          need.
        </Callout>

        <SubTitle>Intermediate models are also where reusable business logic gets consolidated</SubTitle>

        <Para>
          A frequent real-world pattern: two different marts both need "orders joined to their most recent
          payment status," but one mart is finance-facing (revenue reporting) and the other is
          operations-facing (fulfillment tracking). Without an intermediate layer, that join and its
          associated business logic get written twice, and the two copies drift apart over months as each
          team edits its own mart independently — a classic, hard-to-detect source of two dashboards
          disagreeing about numbers that should match. With an intermediate model sitting between staging and
          both marts, the join and its logic exist in exactly one place, and both marts build on the same,
          single source of truth for that specific piece of business logic.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 — Marts in depth ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — The Marts Layer, in Depth" />
        <SectionTitle>Marts Are Organized by Business Domain, Not by Source System</SectionTitle>

        <Para>
          The marts layer is the final, business-facing output of a dbt project — the tables a BI tool, an
          analyst's ad hoc query, or a downstream reverse-ETL sync actually reads. The single most important
          organizational decision at this layer, and the one beginners most often get backwards, is that
          marts are grouped by <strong>business domain</strong> — finance, marketing, product, operations —
          not by which raw source system fed them. A finance mart might combine data that originated from
          Stripe, an internal Postgres database, and a marketing platform; from a business user's perspective,
          none of that source-system provenance matters. What matters is that <code>finance/fct_revenue</code>
          answers a finance question completely, regardless of how many raw systems its inputs came from.
        </Para>

        <CodeBox label="Marts organized by domain, not by source">
{`models/marts/
├── finance/
│   ├── fct_revenue.sql
│   ├── fct_payments.sql
│   └── dim_invoices.sql
├── marketing/
│   ├── fct_attributed_conversions.sql
│   └── dim_campaigns.sql
└── product/
    ├── fct_feature_usage.sql
    └── dim_users.sql

-- NOT this (organizing marts by source system instead of business domain):
models/marts/
├── stripe/
│   └── fct_payments.sql       -- forces a finance analyst to know
├── postgres_app/                 which SOURCE fed a table, rather
│   └── fct_orders.sql            than which BUSINESS QUESTION it
└── marketing_platform/           answers -- the wrong organizing axis
    └── fct_campaigns.sql`}
        </CodeBox>

        <Para>
          The distinction between <code>fct_</code> and <code>dim_</code> models — fact tables and dimension
          tables — carries over from traditional dimensional modeling, and both live inside the same
          domain-scoped folders. A fact table records events or transactions with measures that get
          aggregated (an order's amount, a payment's value, a session's duration). A dimension table records
          descriptive attributes about an entity that facts reference (a customer's name and signup date, a
          product's category, a campaign's channel and budget).
        </Para>

        <Table
          headers={['Model type', 'Prefix', 'Grain', 'Example']}
          rows={[
            ['Fact table', 'fct_', 'One row per event, transaction, or measurable occurrence.', 'fct_payments — one row per payment, with amount_cents as a measure.'],
            ['Dimension table', 'dim_', 'One row per entity, describing its attributes, not measuring events.', 'dim_customers — one row per customer, with name, signup_date, region as attributes.'],
          ]}
        />

        <CodeBox label="models/marts/finance/fct_revenue.sql — a real marts-layer model">
{`{{
  config(
    materialized='table',
    tags=['finance', 'daily']
  )
}}

with payments as (

    select * from {{ ref('int_payments_joined_to_orders') }}
    where counts_as_revenue

),

final as (

    select
        payment_id,
        order_id,
        customer_id,
        amount_cents,
        order_placed_at,
        date_trunc('day', order_placed_at) as revenue_date

    from payments

)

select * from final`}
        </CodeBox>

        <Para>
          Notice this mart reads from <code>int_payments_joined_to_orders</code> — the intermediate model
          from Part 03 — and does very little beyond that: filter to rows that count as revenue, and shape
          the final columns a finance dashboard needs, including a convenience <code>revenue_date</code>
          column for daily rollups. All of the actual join and business-rule complexity already happened one
          layer up. This is what a well-layered mart looks like: thin, because the hard work was already done
          by staging and intermediate, and materialized as a <code>table</code> because it's the layer BI
          tools query constantly and repeatedly.
        </Para>

        <Callout title="A mart should read like a summary, not like an investigation" color={K}>
          If understanding a mart model requires tracing through several joins and CASE expressions inline,
          that logic should have been pushed into an intermediate model instead. A well-layered mart reads
          almost like a spec of what the final table contains, not like a puzzle you have to solve to
          understand what it computes.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 — why layering exists: blast radius ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The Payoff" />
        <SectionTitle>A Raw Schema Change Should Touch Exactly One File</SectionTitle>

        <Para>
          Here is the concrete scenario that makes every rule in Parts 02 through 04 worth the extra files
          and discipline: the team that owns the Stripe integration renames a column, or Stripe itself changes
          a field name in an API version bump, or an internal Postgres app database gets a column renamed
          during a migration. This happens to every real project, repeatedly, over its lifetime. The question
          is what has to change in the dbt project in response.
        </Para>

        <CodeBox label="Scenario: Stripe renames a raw column from 'amount_cents' to 'amount'">
{`-- BEFORE the source change:
-- raw.stripe.payments.amount_cents  (the column staging reads from)

-- AFTER the source change:
-- raw.stripe.payments.amount        (renamed upstream, outside dbt's control)

-- Without a staging layer -- every model that read directly from
-- {{ source('stripe', 'payments') }} and referenced amount_cents
-- breaks simultaneously: the intermediate join, every mart that
-- touched payment amounts, possibly a dozen files across the project.

-- With a staging layer -- exactly ONE file needs a one-line change:

-- models/staging/stripe/stg_stripe__payments.sql
select
    id                                  as payment_id,
    order_id,
    amount                              as amount_cents,   -- <-- only this line changes
    lower(status)                       as payment_status,
    cast(created as timestamp)          as created_at
from {{ source('stripe', 'payments') }}
where not _fivetran_deleted

-- Every downstream model -- int_payments_joined_to_orders, fct_revenue,
-- fct_payments -- still references stg_stripe__payments.amount_cents,
-- completely unaware that the raw column's name ever changed at all.`}
        </CodeBox>

        <Para>
          This is the entire economic case for the layering discipline in one example. The staging layer's
          sole job — one model per raw source, alias every column to a stable, dbt-side name — is precisely
          what makes it possible to absorb an upstream rename, a type change, or even a wholesale migration to
          a new source system, by touching one file instead of auditing the entire project for every place a
          raw column name might have leaked downstream.
        </Para>

        <Table
          headers={['Kind of upstream change', 'Files touched with proper layering', 'Files touched without it']}
          rows={[
            ['A raw column is renamed', 'One staging model — update the alias.', 'Every model, anywhere in the project, that ever referenced the raw column name directly.'],
            ['A raw column\'s type changes (string to real timestamp, say)', 'One staging model — update or remove a cast.', 'Every downstream model doing its own ad hoc casting or comparison against that column.'],
            ['A business rule for "what counts as revenue" changes', 'One intermediate model, if the logic was centralized there.', 'Every mart that independently re-implemented the same business rule inline.'],
            ['A whole source system is replaced (e.g. migrating off Stripe)', 'One staging model is rewritten against the new source; everything downstream is unaffected as long as the staging model\'s output shape stays the same.', 'The blast radius is effectively the entire project, because nothing insulates downstream models from the raw source\'s shape.'],
          ]}
        />

        <Callout title="This is the actual argument for the extra files, stated plainly" color="#22c55e">
          Every extra staging or intermediate model a team writes is, in effect, an insurance policy against a
          future change somewhere upstream that the team does not control and cannot predict the timing of.
          The layering isn't bureaucracy for its own sake — it is the mechanism by which a change in one raw
          source stays contained to one small, predictable, easy-to-review file instead of becoming a
          project-wide incident.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 — Naming conventions ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Naming Conventions" />
        <SectionTitle>A Model's Name Should Tell You Its Layer and Its Job, Without Opening the File</SectionTitle>

        <Para>
          Because a model's filename is its object name with no separate naming step, the naming convention a
          team adopts is not cosmetic — it is the single biggest lever for keeping a project navigable as it
          grows past the size where any one person remembers what every model does. The convention that has
          become close to a de facto industry standard follows a simple, layer-encoded pattern.
        </Para>

        <Table
          headers={['Layer', 'Pattern', 'Example', 'Reading the name']}
          rows={[
            ['Staging', 'stg_<source>__<table>', 'stg_stripe__payments', 'A staging model, sourced from Stripe, cleaning the payments table.'],
            ['Intermediate', 'int_<description>', 'int_payments_joined_to_orders', 'An intermediate model — the description itself states what it does, since there is no fixed suffix convention the way marts have fct_/dim_.'],
            ['Marts — fact', 'fct_<business_process>', 'fct_revenue, fct_payments', 'A fact table recording a business process or event, with measures.'],
            ['Marts — dimension', 'dim_<entity>', 'dim_customers, dim_campaigns', 'A dimension table describing an entity\'s attributes.'],
          ]}
        />

        <Para>
          The double underscore in <code>stg_stripe__payments</code> is deliberate, not a typo — it visually
          separates "which source system" from "which table within that source," which matters the moment a
          project has more than one source with an overlapping table name. <code>stg_stripe__payments</code>
          and <code>stg_app__payments</code> (an internal payments-adjacent table in the main application
          database, say) are unambiguous at a glance, whereas <code>stg_payments</code> and
          <code>stg_payments_2</code> tell you nothing about where either one actually comes from.
        </Para>

        <CodeBox label="Why the double underscore matters, concretely">
{`-- Two different source systems, each with a "subscriptions" table:

stg_stripe__subscriptions.sql    -- from Stripe's subscriptions API
stg_recurly__subscriptions.sql   -- from a legacy Recurly billing system
                                  -- still being migrated off of

-- Without the source prefix, both would collide on the same name,
-- or force an arbitrary disambiguator (stg_subscriptions_v2) that
-- carries no information about which source it actually is.`}
        </CodeBox>

        <Para>
          Intermediate models deliberately have no fixed suffix the way marts do, because what an intermediate
          model is <em>for</em> varies too much to compress into two or three prefix categories — it might be
          a join, a deduplication step, a pivot, a business-rule application. The convention instead leans on
          a clear, descriptive name: <code>int_payments_joined_to_orders</code>,
          <code>int_customer_orders_deduplicated</code>, <code>int_events_pivoted_by_type</code> — each name
          states the specific transformation happening in that one file, since a reader can't infer it from a
          fixed prefix the way they can with <code>stg_</code> or <code>fct_</code>.
        </Para>

        <Callout title="A useful test for any candidate model name" color={K}>
          Read the filename out loud, with no other context. Can you correctly guess the layer, and roughly
          what the model does, from the name alone? <code>stg_stripe__payments</code> passes this test
          instantly. <code>payments_v2_final</code> fails it completely — it tells you nothing about layer,
          source, or purpose, and is exactly the kind of name that becomes a liability the moment someone new
          joins the project.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 — Folder structure mirroring layering ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Folder Structure" />
        <SectionTitle>Folders Should Mirror the Layering, Down to the Source and Domain Level</SectionTitle>

        <Para>
          A folder structure that mirrors the layering conventions from Parts 02 through 04 is what makes the
          naming convention actually navigable rather than just theoretically parseable. Staging folders are
          typically subdivided by source system, since a new source system usually means a batch of new
          staging models arriving together. Marts folders are subdivided by business domain, per Part 04's
          reasoning. Intermediate folders are commonly subdivided by the domain they primarily serve, since
          most intermediate logic exists in service of one specific downstream mart area even if it's
          technically reusable elsewhere.
        </Para>

        <CodeBox label="A realistic folder structure at moderate project size">
{`models/
├── staging/
│   ├── stripe/
│   │   ├── stg_stripe__payments.sql
│   │   ├── stg_stripe__subscriptions.sql
│   │   └── stg_stripe__sources.yml
│   ├── app_postgres/
│   │   ├── stg_app__orders.sql
│   │   ├── stg_app__customers.sql
│   │   └── stg_app__sources.yml
│   └── marketing_platform/
│       ├── stg_marketing__campaigns.sql
│       ├── stg_marketing__ad_spend.sql
│       └── stg_marketing__sources.yml
├── intermediate/
│   ├── finance/
│   │   └── int_payments_joined_to_orders.sql
│   └── marketing/
│       └── int_campaigns_joined_to_conversions.sql
└── marts/
    ├── finance/
    │   ├── fct_revenue.sql
    │   ├── fct_payments.sql
    │   ├── dim_invoices.sql
    │   └── finance_models.yml
    └── marketing/
        ├── fct_attributed_conversions.sql
        ├── dim_campaigns.sql
        └── marketing_models.yml`}
        </CodeBox>

        <Para>
          Each source folder under <code>staging/</code> typically carries its own YAML file declaring that
          source's tables (per the <code>source()</code> mechanics covered earlier in this track), keeping a
          source's declaration physically next to the staging models that consume it rather than in one
          enormous, project-wide sources file that becomes unwieldy to navigate.
        </Para>

        <Table
          headers={['Folder level', 'Subdivided by', 'Why']}
          rows={[
            ['staging/', 'Source system', 'A new integration adds a self-contained batch of staging models; keeping them grouped makes it obvious what a given source contributes.'],
            ['intermediate/', 'The business domain the logic primarily serves', 'Most intermediate logic exists in service of a specific downstream area, even when technically reusable elsewhere.'],
            ['marts/', 'Business domain', 'This is the layer business users navigate; grouping by domain matches how they think about the data, per Part 04.'],
        ]}
        />

        <Callout title="dbt_project.yml materialization defaults should mirror this structure exactly" color={K}>
          Because directory path is how <code>dbt_project.yml</code> assigns default materializations, a
          folder structure that mirrors the layering isn't just for human navigation — it's what lets a
          single project-level config block set staging to <code>view</code>, intermediate to
          <code>ephemeral</code>, and marts to <code>table</code>, all in three lines, rather than configuring
          materialization per individual model.
        </Callout>

        <CodeBox label="dbt_project.yml — materialization defaults matching the folder layering">
{`models:
  my_project:
    staging:
      +materialized: view
    intermediate:
      +materialized: ephemeral
    marts:
      +materialized: table`}
        </CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Staying maintainable past 200 models ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Scaling to 200+ Models" />
        <SectionTitle>What Actually Breaks Down as a Project Grows, and How Layering Prevents It</SectionTitle>

        <Para>
          A project with twenty models can survive almost any amount of organizational sloppiness — a single
          contributor can hold the whole thing in their head, and a wrong turn is easy to spot and fix. A
          project with two hundred models cannot rely on any one person's memory, and the failure modes that
          show up at that scale are specific and predictable.
        </Para>

        <Table
          headers={['Failure mode at scale', 'How disciplined layering prevents it']}
          rows={[
            ['Duplicated business logic drifting apart across marts', 'Centralizing shared logic in intermediate models (Part 03) means it exists in exactly one place, so it cannot drift into two disagreeing versions.'],
            ['Nobody knows which of two similarly-named models is the "real" one', 'The stg_/int_/fct_/dim_ naming convention (Part 06), combined with domain-scoped folders (Part 07), makes a model\'s role and scope legible from its path and name alone.'],
            ['A schema change upstream causes a cascade of unrelated failures across the project', 'A thin staging layer (Part 02) absorbs the change in one file, per Part 05\'s worked scenario, instead of propagating it project-wide.'],
            ['New contributors are afraid to touch anything because they can\'t tell what depends on what', 'Consistent layering means a new contributor can predict, from a model\'s folder and prefix alone, roughly what touches it and what it touches — without reading the whole DAG.'],
            ['Marts become a dumping ground of one-off, inconsistent one-off logic', 'A clear rule for what belongs in marts versus intermediate (Part 03, Part 04) keeps marts thin summaries rather than a second copy of business logic.'],
          ]}
        />

        <Para>
          A second, less obvious scaling pressure is on the DAG itself: at 200+ models, the dependency graph
          between staging, intermediate, and marts becomes something a person can no longer trace by eye. This
          is exactly why the layering conventions matter more, not less, as a project grows — a predictable
          three-layer flow (source → staging → intermediate → marts, strictly in that direction, never
          backwards) is what keeps <code>dbt docs generate</code>'s dependency graph interpretable even at
          hundreds of nodes, because every edge in that graph is expected to point in one direction.
        </Para>

        <Callout title="A one-way rule worth stating explicitly" color="#ef4444">
          Data should only ever flow staging → intermediate → marts, never the reverse, and never sideways
          between two marts in different domains without an intermediate step doing the join. A mart that
          <code>ref()</code>s another mart directly, or a staging model that <code>ref()</code>s an
          intermediate model, is a sign the layering has been violated somewhere, and is worth catching in
          code review before it becomes a habit that's hard to unwind once dozens of models depend on the
          shortcut.
        </Callout>

        <Para>
          A useful heuristic for a growing team: whenever the same join or business rule is written for the
          second time across two different marts, that is the trigger to extract it into a shared
          intermediate model immediately, rather than waiting for a third or fourth duplicate to accumulate.
          Catching duplication at two copies, not four, is what keeps the intermediate layer doing its actual
          job — a small number of well-named, single-purpose models — instead of becoming a second staging
          layer with unclear boundaries of its own.
        </Para>
      </section>

      <Divider />

      {/* ── Part 09 — Worked example, multi-source project ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — A Full Worked Example" />
        <SectionTitle>A Realistic Multi-Source Project, End to End</SectionTitle>

        <Para>
          Bringing every rule in this module together: a project ingesting from three real source
          systems — Stripe for payments, a Postgres application database for orders and customers, and a
          marketing platform for campaign and spend data — flowing through staging, into intermediate, and
          landing in a finance mart and a marketing mart.
        </Para>

        <CodeBox label="The full folder structure for this worked example">
{`models/
├── staging/
│   ├── stripe/
│   │   ├── _stripe__sources.yml
│   │   └── stg_stripe__payments.sql
│   ├── app_postgres/
│   │   ├── _app__sources.yml
│   │   ├── stg_app__orders.sql
│   │   └── stg_app__customers.sql
│   └── marketing_platform/
│       ├── _marketing__sources.yml
│       ├── stg_marketing__campaigns.sql
│       └── stg_marketing__ad_spend.sql
├── intermediate/
│   ├── finance/
│   │   └── int_payments_joined_to_orders.sql
│   └── marketing/
│       └── int_orders_attributed_to_campaigns.sql
└── marts/
    ├── finance/
    │   ├── fct_revenue.sql
    │   └── dim_customers.sql
    └── marketing/
        └── fct_campaign_roi.sql`}
        </CodeBox>

        <Para>
          Follow one full chain from raw source to final mart. <code>stg_app__orders</code> and
          <code>stg_app__customers</code> each clean exactly one Postgres source table.
          <code>stg_stripe__payments</code> cleans the one Stripe source table. None of the three know
          anything about each other yet — that's intentional, per Part 02.
        </Para>

        <CodeBox label="models/staging/app_postgres/stg_app__orders.sql">
{`with source as (
    select * from {{ source('app_postgres', 'orders') }}
),
renamed as (
    select
        id                             as order_id,
        customer_id,
        campaign_id,
        cast(placed_at as timestamp)   as order_placed_at,
        lower(status)                  as order_status
    from source
)
select * from renamed`}
        </CodeBox>

        <Para>
          The finance-facing intermediate model, <code>int_payments_joined_to_orders</code>, is exactly the
          model built in Part 03 — it joins Stripe payments to Postgres orders and applies the
          "counts_as_revenue" business rule. A second, marketing-facing intermediate model performs a
          different join entirely, connecting orders to the campaign that is credited with driving them:
        </Para>

        <CodeBox label="models/intermediate/marketing/int_orders_attributed_to_campaigns.sql">
{`{{ config(materialized='ephemeral') }}

with orders as (
    select * from {{ ref('stg_app__orders') }}
),

campaigns as (
    select * from {{ ref('stg_marketing__campaigns') }}
),

attributed as (
    select
        orders.order_id,
        orders.customer_id,
        orders.order_placed_at,
        campaigns.campaign_id,
        campaigns.campaign_name,
        campaigns.channel
    from orders
    left join campaigns
        on orders.campaign_id = campaigns.campaign_id
)

select * from attributed`}
        </CodeBox>

        <Para>
          Notice this second intermediate model reuses <code>stg_app__orders</code> — the same staging model
          that feeds the finance-side intermediate model. This is exactly the payoff of a thin, reusable
          staging layer: one clean staging model serves two entirely different downstream domains, each with
          its own business logic, without either domain needing to re-clean the raw orders table itself.
        </Para>

        <CodeBox label="models/marts/marketing/fct_campaign_roi.sql — the final marketing mart">
{`{{ config(materialized='table', tags=['marketing']) }}

with attributed_orders as (
    select * from {{ ref('int_orders_attributed_to_campaigns') }}
),

ad_spend as (
    select * from {{ ref('stg_marketing__ad_spend') }}
),

revenue as (
    select * from {{ ref('int_payments_joined_to_orders') }}
    where counts_as_revenue
),

per_campaign_revenue as (
    select
        attributed_orders.campaign_id,
        sum(revenue.amount_cents) as attributed_revenue_cents
    from attributed_orders
    join revenue
        on attributed_orders.order_id = revenue.order_id
    group by 1
),

final as (
    select
        ad_spend.campaign_id,
        ad_spend.campaign_name,
        ad_spend.spend_cents,
        coalesce(per_campaign_revenue.attributed_revenue_cents, 0) as attributed_revenue_cents,
        coalesce(per_campaign_revenue.attributed_revenue_cents, 0) - ad_spend.spend_cents as roi_cents
    from ad_spend
    left join per_campaign_revenue
        on ad_spend.campaign_id = per_campaign_revenue.campaign_id
)

select * from final`}
        </CodeBox>

        <Para>
          This final mart is a striking illustration of the whole module's thesis: it reads from
          <em>two different intermediate models</em>, each encoding a different piece of business logic
          (revenue-counting rules, campaign attribution rules), themselves built from staging models spanning
          three unrelated raw source systems — and none of that layered history is visible in the mart's own
          SQL, which reads as a clean, short summary of "campaign spend versus attributed revenue." That
          readability is not an accident. It is the direct, designed consequence of every rule in Parts 02
          through 04 being followed correctly one layer at a time.
        </Para>
      </section>

      <Divider />

      {/* ── Part 10 — YAML organization alongside the folder structure ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Organizing YAML Alongside Models" />
        <SectionTitle>One schema.yml per Folder, Not One Giant File for the Whole Project</SectionTitle>

        <Para>
          Everything in Parts 06 through 08 addressed how <code>.sql</code> model files are named and
          organized. A parallel question, easy to overlook until a project has grown past a few dozen models,
          is how the YAML files declaring sources, tests, and descriptions should themselves be organized.
          The same layering logic applies here too: YAML should live physically close to the models it
          documents, split by folder rather than centralized into one enormous project-wide file.
        </Para>

        <Para>
          A single <code>schema.yml</code> at the root of <code>models/</code> containing every model's tests
          and descriptions across the entire project technically works — dbt does not require YAML to be
          split at all — but it becomes a genuine liability past a certain size. Every contributor editing any
          model's tests touches the same file, multiplying merge conflicts, and finding a specific model's
          test configuration means scrolling or searching through a file that has nothing to do with the
          folder structure the models themselves live in.
        </Para>

        <CodeBox label="YAML organized per folder, mirroring the model layering exactly">
{`models/
├── staging/
│   ├── stripe/
│   │   ├── _stripe__sources.yml       -- source() declarations for Stripe
│   │   ├── stg_stripe__payments.sql
│   │   └── stg_stripe__payments.yml   -- tests/descriptions for this one model
│   └── app_postgres/
│       ├── _app__sources.yml
│       ├── stg_app__orders.sql
│       └── stg_app__orders.yml
└── marts/
    └── finance/
        ├── fct_revenue.sql
        ├── fct_payments.sql
        └── _finance__models.yml       -- tests/descriptions for the whole domain`}
        </CodeBox>

        <Para>
          Two conventions are worth calling out in that layout. First, a leading underscore on files like
          <code>_stripe__sources.yml</code> is a common, purely cosmetic convention that sorts
          configuration-only files above the <code>.sql</code> files they describe in most file browsers and
          IDEs, making them easy to spot at a glance. Second, notice the granularity difference between
          staging and marts: staging YAML is often one file per model (<code>stg_stripe__payments.yml</code>
          sitting directly next to <code>stg_stripe__payments.sql</code>), while a mart-level domain folder
          more commonly consolidates several models' tests into one shared file
          (<code>_finance__models.yml</code> covering both <code>fct_revenue</code> and
          <code>fct_payments</code>), since mart-level models within one domain are usually reviewed and
          edited together anyway.
        </Para>

        <Table
          headers={['YAML organization approach', 'Merge-conflict risk', 'Discoverability']}
          rows={[
            ['One schema.yml for the entire project', 'High — every contributor touching any model\'s tests edits the same file.', 'Low past a few dozen models — finding one model\'s config means searching a huge, unstructured file.'],
            ['One YAML file per folder, mirroring model layering', 'Low — contributors working in different domains or sources rarely touch the same file.', 'High — a model\'s YAML lives in the same folder as the model itself, discoverable by browsing alone.'],
          ]}
        />

        <Callout title="This is the same principle as Part 07's folder structure, applied one level down" color={K}>
          Just as folders should mirror the staging/intermediate/marts layering so a model's role is legible
          from its path, YAML files should mirror that same structure so a model's tests and documentation are
          never more than one glance away from the model itself — and so that editing one domain's test
          coverage never requires touching a file shared by every other domain in the project.
        </Callout>

        <SubTitle>A concrete example: the per-model YAML for one staging model</SubTitle>

        <Para>
          To make this tangible, here is what <code>stg_stripe__payments.yml</code> actually contains, sitting
          directly beside <code>stg_stripe__payments.sql</code> in the same folder from Part 09's worked
          example. Everything a reader needs to understand this one model — its columns, its tests, its
          purpose — lives in exactly two files, next to each other, rather than being split across a
          model-specific SQL file and a project-wide YAML file that could be anywhere.
        </Para>

        <CodeBox label="models/staging/stripe/stg_stripe__payments.yml">
{`version: 2

models:
  - name: stg_stripe__payments
    description: >
      One row per Stripe payment attempt, cleaned and renamed from the
      raw Stripe payments source. No business logic -- see
      int_payments_joined_to_orders for revenue-counting rules.
    columns:
      - name: payment_id
        description: Primary key -- Stripe's payment id, renamed from the raw "id" column.
        tests:
          - unique
          - not_null
      - name: order_id
        description: Foreign key to the order this payment is associated with.
        tests:
          - not_null
      - name: payment_status
        description: Lowercased, normalized Stripe payment status.
        tests:
          - accepted_values:
              values: ['succeeded', 'pending', 'failed', 'refunded']`}
        </CodeBox>

        <Para>
          A new contributor looking for anything about this model — what it does, what's tested, what
          business logic to expect downstream — never needs to search the project. They open the
          <code>stripe/</code> folder and find both files sitting together, which is the entire practical
          payoff of organizing YAML this way rather than centralizing it.
        </Para>

        <Callout title="One caveat: don't split YAML so finely that it becomes its own kind of clutter" color="#ef4444">
          A one-model-per-YAML-file convention works well at the staging layer, where models are numerous but
          individually simple. Applying the same granularity to a marts folder with a handful of tightly
          related fact and dimension tables usually overcorrects — a shared <code>_finance__models.yml</code>
          covering the whole domain, as shown above, is often more useful there than four or five nearly-empty
          single-model YAML files that fragment a domain's documentation without buying any real benefit.
        </Callout>

        <Para>
          The underlying test in both directions is the same one this whole module keeps returning to: does
          splitting (or not splitting) reduce how many unrelated things a single file forces a contributor to
          touch or scroll past? One YAML file per staging model passes that test, since staging models are
          numerous and independent. One YAML file per mart model, in a domain where the marts are few and
          closely related, usually fails it — the split adds file-hopping overhead without actually isolating
          anything meaningfully unrelated.
        </Para>
      </section>

      <Divider />

      {/* ── Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About dbt Project Structure</SectionTitle>
        {[
          {
            wrong: '"Layering is just a style preference — a project that skips straight from source() to a mart works exactly as well"',
            right: 'It runs, but Part 05\'s worked scenario shows the real cost: without a staging layer absorbing raw schema changes, a single upstream rename cascades into every model that ever referenced the raw column directly, instead of being contained to one file.',
          },
          {
            wrong: '"Marts should be organized by which source system fed them, since that\'s how the data actually arrived"',
            right: 'Part 04 argues the opposite: marts are organized by business domain (finance, marketing, product) because that is the axis business users and analysts actually think along. A finance mart routinely combines data from several unrelated source systems, and that provenance is irrelevant to the person querying it.',
          },
          {
            wrong: '"Every mart needs a corresponding intermediate model — skipping straight from staging to a mart is always wrong"',
            right: 'Part 03 is explicit that intermediate is for joins or business logic complex or reused enough to deserve its own model. A simple mart built from one or two staging models with a trivial join can, and often should, skip the intermediate layer entirely.',
          },
          {
            wrong: '"A staging model can include a business-logic CASE expression as long as it\'s a small one"',
            right: 'Part 02\'s boundary is not about size, it\'s about kind: any CASE expression encoding a business rule (not a structural type normalization) belongs in intermediate or marts, no matter how short it looks. A one-line business rule inside staging still breaks the single-reason-to-change guarantee the whole layering scheme depends on.',
          },
          {
            wrong: '"The stg_<source>__<table> double underscore is just a stylistic flourish"',
            right: 'Part 06 shows it does real work: it disambiguates which source system a table came from, which matters the moment two different sources happen to have tables with the same name (two systems both having a "subscriptions" table, for instance) — a single underscore or no separator at all loses that distinction.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: FONT_MONO }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Real-World story ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// What This Looks Like at Work" />
        <SectionTitle>Three Companies, Three Layering Lessons</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>At Sonos:</strong> the analytics engineering team migrates a legacy order-management
            system to a new one over the course of a quarter. Because every downstream model reads from
            <code>stg_orders__legacy</code> and, later, <code>stg_orders__v2</code> rather than directly from
            either raw source, the migration is executed by swapping which staging model a handful of
            intermediate models point at — a change scoped to a handful of <code>ref()</code> calls — rather
            than rewriting the dozens of marts that ultimately depend on order data. Per Part 05, the staging
            layer is exactly what makes a wholesale source-system migration a contained, predictable change
            instead of a project-wide rewrite.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Angi:</strong> a reviewer rejects a pull request adding a new marketing mart because
            it duplicates, almost line for line, a campaign-attribution join that already exists inside a
            finance mart shipped the previous month. Per Part 03 and Part 08, the fix is not to let the
            duplicate ship and reconcile it later — it's to extract the shared join into an
            <code>int_orders_attributed_to_campaigns</code> model immediately, at the first sign of
            duplication, so both marts build on one shared definition of "which campaign gets credit for this
            order" instead of two definitions that will inevitably drift apart the next time either mart is
            edited.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Root Insurance:</strong> a new analytics engineer, two weeks into the job, is asked to
            investigate why a claims-processing mart shows a number that doesn't match a separate underwriting
            report. Because the project follows the naming and folder conventions from Part 06 and Part 07,
            they can trace the discrepancy by reading folder and file names alone — checking
            <code>marts/claims/fct_claims.sql</code>, then the specific
            <code>int_claims_joined_to_policies</code> intermediate model it depends on, then the underlying
            staging models — without needing a senior teammate to explain where anything lives. The
            self-describing structure is what makes that kind of independent debugging possible in someone's
            second week.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. Walk me through why a project uses a staging layer at all, rather than joining directly from source() calls in intermediate or marts models.',
            a: `Per Part 02 and Part 05, the staging layer's entire value is containing the blast radius of upstream change. A staging model does exactly one thing — clean one raw source table, with no joins and no business logic — which means it is the only layer that can absorb a raw schema change (a renamed column, a type change) by itself. Part 05's worked example makes this concrete: renaming a raw Stripe column requires touching exactly one staging model's alias, versus, without a staging layer, auditing and fixing every model across the project that ever referenced that column directly.

The deeper principle, from Part 01, is that every model should have exactly one reason to change. A staging model's one reason is "its one raw source table's shape changed." Bypassing staging and joining directly from source() calls means intermediate and mart models now have two reasons to change tangled together — the raw source's shape, and their own join/business logic — which defeats the entire point of layering.`,
          },
          {
            q: 'Q2. What specifically belongs in an intermediate model that does not belong in either staging or a mart?',
            a: `Per Part 03, intermediate is where joins across staging models happen and where business logic that more than one downstream mart needs gets centralized. It sits between a staging layer that must never join across sources (Part 02) and a marts layer that should read as a thin, business-facing summary rather than reimplementing complex logic inline (Part 04).

A concrete signal for whether something belongs in intermediate: if removing a candidate intermediate model would force the same join or business rule to be duplicated across two or more marts, it belongs in intermediate. Part 03's worked example — a payments-joined-to-orders model computing a "counts_as_revenue" business rule — is exactly this case: multiple marts might need "which payments count as revenue," and centralizing that logic in one intermediate model means all of them agree on the same definition, rather than each mart quietly encoding its own slightly different version.`,
          },
          {
            q: 'Q3. Explain the naming convention stg_<source>__<table> and why the double underscore matters.',
            a: `Per Part 06, stg_<source>__<table> encodes both the source system and the specific table within one filename, and since a filename is a model's object name with no separate naming step, this is what keeps a project self-describing at a glance rather than requiring someone to open a file to know where a staging model's data comes from.

The double underscore specifically disambiguates the source-name segment from the table-name segment. This matters concretely the moment two different source systems happen to have a table with the same name — stg_stripe__subscriptions and stg_recurly__subscriptions are unambiguous even though both tables are literally called "subscriptions" in their respective source systems, whereas a single underscore or no separator at all would produce ambiguous or colliding names.`,
          },
          {
            q: 'Q4. Why are marts organized by business domain (finance, marketing) rather than by source system, and what would go wrong with the source-system approach?',
            a: `Per Part 04, marts are the layer business users and analysts actually navigate and query, and they think in terms of business questions — "what was our revenue," "how did this campaign perform" — not in terms of which raw system happened to supply the underlying data. A finance mart routinely combines data that originated from a payments processor, an internal application database, and possibly a marketing platform; organizing marts by source system would force an analyst to somehow know which of several source-scoped folders contains "the revenue table," when the honest answer is that revenue draws from more than one source at once.

Organizing by domain instead means marts/finance/ contains everything a finance stakeholder needs, full stop, regardless of how many raw systems fed it — matching the way the people actually consuming marts think about the data, which is the entire justification for this layer existing as a distinct concept from staging and intermediate.`,
          },
          {
            q: 'Q5. A team\'s dbt project has grown to 250 models and new contributors say they\'re afraid to touch anything because they can\'t tell what depends on what. What structural changes would you recommend?',
            a: `Per Part 08, this is the classic scaling failure mode layering exists to prevent, and the fix is auditing the project against the same rules that should have been followed from the start rather than inventing something new. First, check whether staging models are genuinely thin (Part 02) — a staging model with joins or business logic creeping in is exactly what causes upstream changes to cascade unpredictably. Second, check whether business logic is duplicated across multiple marts rather than centralized in intermediate models (Part 03) — duplicated logic drifting apart across marts is one of the most common causes of "I can't tell what depends on what," since the same concept exists in multiple, subtly different forms.

Third, verify the naming and folder conventions from Part 06 and Part 07 are actually being followed consistently, since a project's navigability at scale depends entirely on being able to infer a model's layer, source or domain, and purpose from its path and name — a project that drifted from consistent naming as it grew loses exactly the property that made it navigable in the first place. Finally, per Part 08's one-way rule, check for any model referencing something in a "later" layer than itself (a staging model referencing an intermediate model, a mart referencing another mart directly) — these violations are usually where the DAG becomes genuinely hard to reason about, since they break the assumption that data only ever flows in one direction through the layers.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>The Structural Mistakes That Get Expensive Later</SectionTitle>
        {[
          {
            q: 'Letting a "quick" join or business-logic CASE expression creep into a staging model',
            a: 'Per Part 02, this is the single most damaging structural drift because it defeats the entire reason staging exists — the moment a staging model has more than one reason to change, an upstream schema change and a business-logic change can collide inside the same file, and the blast-radius containment from Part 05 no longer holds.',
          },
          {
            q: 'Duplicating a join or business rule across two marts instead of extracting it into an intermediate model at the first sign of repetition',
            a: 'Per Part 03 and Part 08, catching duplication at the second occurrence — not the third or fourth — is what keeps the intermediate layer serving its actual purpose. Waiting too long means two marts have already drifted into subtly different, disagreeing versions of "the same" logic.',
          },
          {
            q: 'Organizing marts by source system instead of business domain',
            a: 'Per Part 04, this forces business users to know internal data-provenance details that are irrelevant to the question they\'re actually asking, and it fights against how a finance or marketing mart naturally draws on multiple unrelated raw sources at once.',
          },
          {
            q: 'Using vague, non-descriptive model names like fct_data_final or stg_table2',
            a: 'Per Part 06, a name that doesn\'t encode layer, source, and purpose forces every reader to open the file just to understand what it is — defeating the self-describing property that naming conventions exist to provide, and becoming a real liability once a project has more than a handful of models.',
          },
          {
            q: 'Letting a mart reference another mart directly, or a staging model reference an intermediate model',
            a: 'Per Part 08\'s one-way rule, data should only ever flow staging → intermediate → marts. A reference that runs backwards or sideways between two marts in different domains breaks the predictable, one-directional DAG shape that keeps a large project\'s dependency graph interpretable.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Structural Problems You Will Hit — And Exactly Why They Happen</SectionTitle>
        {[
          {
            error: 'A schema change in a raw Stripe table breaks six different models across staging, intermediate, and marts simultaneously',
            cause: 'One or more downstream models are referencing {{ source(\'stripe\', ...) }} directly instead of going through a single staging model, per Part 02 — the raw column\'s shape has leaked into multiple layers instead of being absorbed at exactly one boundary.',
            fix: 'Route every downstream reference to that raw table through one staging model, per the pattern in Part 02 and the worked recovery in Part 05, so a future schema change is contained to that one file going forward.',
          },
          {
            error: 'Two marts show different revenue totals for what should be the same underlying business rule',
            cause: 'The "what counts as revenue" logic was implemented independently in each mart rather than centralized in a shared intermediate model, per Part 03 — the two copies were edited at different times and quietly drifted apart.',
            fix: 'Extract the shared logic into one intermediate model (following Part 03\'s int_payments_joined_to_orders pattern) and have both marts reference it, eliminating the possibility of the two copies disagreeing again.',
          },
          {
            error: 'dbt docs generate produces a dependency graph that is effectively unreadable at the project\'s current size',
            cause: 'Models are not consistently following the one-way staging → intermediate → marts flow from Part 08 — some marts reference other marts directly, or intermediate models are scattered without clear domain grouping (Part 07), producing a tangled rather than a layered graph.',
            fix: 'Audit for and remove any backwards or sideways references per Part 08\'s one-way rule, and reorganize folders per Part 07\'s domain-scoped structure so the graph\'s shape matches the intended one-directional flow.',
          },
          {
            error: 'A new team member cannot find "the" customers table because there are three similarly named candidates',
            cause: 'Naming has drifted from the stg_/int_/fct_/dim_ convention in Part 06 over time, likely through models added under deadline pressure without a naming review, leaving ambiguous names like customers_clean or customers_v2 alongside the properly named ones.',
            fix: 'Rename the drifted models to match the established convention (accepting the object-recreation cost from renaming a model file, covered in the earlier models-basics module) and add the naming convention to a PR review checklist so future models don\'t reintroduce the same drift.',
          },
          {
            error: 'An intermediate model is accidentally being queried directly by a BI dashboard, and nobody remembers approving that',
            cause: 'The model was materialized as a view instead of ephemeral, per Part 03, making it visible and queryable in the warehouse\'s schema browser even though it was never intended for anyone outside the dbt project to touch directly.',
            fix: 'Materialize genuinely internal intermediate models as ephemeral where reasonable, and where a view is needed for debugging purposes, use schema or grant configuration to keep it out of the schemas a BI tool\'s connection is scoped to browse.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: 'var(--red,#ff4757)', marginBottom: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '8px 12px', lineHeight: 1.5 }}>
              {item.error}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: FONT_MONO, letterSpacing: '.1em', textTransform: 'uppercase' }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', fontFamily: FONT_MONO, letterSpacing: '.1em', textTransform: 'uppercase' }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      <KeyTakeaways
        items={[
          'A staging model does exactly one thing: clean one raw source table, with no joins and no business logic — this narrow scope is what lets it absorb an upstream schema change in one file instead of cascading across the project.',
          'Intermediate models are where joins across staging models and shared business logic live; they are typically ephemeral, implementation details not meant to be queried directly, and exist to prevent the same logic from being duplicated and drifting across multiple marts.',
          'Marts are organized by business domain (finance, marketing, product), not by source system — a single domain-scoped mart routinely combines data that originated from several unrelated raw sources.',
          'The naming convention — stg_<source>__<table>, int_<description>, fct_<business_process>, dim_<entity> — makes a model\'s layer and purpose legible from its filename alone, which matters enormously once a project outgrows any one person\'s memory.',
          'Folder structure should mirror the layering: staging subdivided by source system, marts subdivided by business domain, and dbt_project.yml materialization defaults set per directory to match.',
          'Data should flow one way — staging → intermediate → marts — and a project stays maintainable past 200+ models specifically because this direction is never violated and shared logic is never duplicated across marts.',
        ]}
      />
    </LearnLayout>
  )
}
