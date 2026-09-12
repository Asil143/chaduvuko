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

export default function Documentation() {
  return (
    <LearnLayout
      title="Documentation: Descriptions, Doc Blocks, and dbt Docs"
      description="Model and column descriptions in schema.yml, reusable doc blocks with the doc() function, generating and serving the dbt docs site, the auto-generated DAG lineage graph, meta fields and tags, and documentation as a team habit instead of an afterthought."
      section="dbt — Module 09"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'Documentation: Descriptions, Doc Blocks, and dbt Docs', href: '/learn/dbt/documentation' },
      ]}
      prev={{ title: 'Testing: Generic and Singular Tests', href: '/learn/dbt/testing-basics' }}
      next={{ title: 'Jinja and Macros: Templating SQL', href: '/learn/dbt/jinja-and-macros' }}
    >
      {/* ── Part 01 — Why Documentation Is a First-Class dbt Feature ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Documentation as Infrastructure" />
        <SectionTitle>dbt Treats Documentation as Compiled Output, Not a Side Note</SectionTitle>

        <Para>
          In most data warehouses, documentation lives somewhere other than the code that produces the
          data — a wiki page, a spreadsheet, a Confluence doc someone wrote once during onboarding and
          nobody has updated since. The moment a model changes, that external documentation is already
          stale, and nothing forces anyone to go update it. Six months later, a new analyst reads the wiki
          page, trusts it, and builds a report on assumptions that stopped being true three model changes
          ago.
        </Para>

        <Para>
          dbt takes a different approach. Descriptions live in the same YAML files that already configure
          your tests, right next to the model and column they describe. Documentation is not a separate
          artifact maintained on a separate schedule — it is compiled, alongside your models and the
          dependency graph itself, into a browsable website with <code>dbt docs generate</code>. Because
          the descriptions sit in version control next to the SQL, a pull request that changes a model's
          logic is the same pull request that should update its description — the two changes travel
          together instead of drifting apart.
        </Para>

        <HighlightBox>
          <Para>
            <strong>What dbt's documentation system actually produces:</strong> a static website with one
            page per model and per source, each showing its compiled SQL, its column list with descriptions,
            its tests, and its exact position in the dependency graph — plus an interactive, zoomable diagram
            of the entire DAG that is generated automatically from your project's actual <code>ref()</code>
            and <code>source()</code> calls, not drawn by hand.
          </Para>
        </HighlightBox>

        <Para>
          This module covers three layers of dbt documentation: descriptions written directly in
          <code>schema.yml</code> at the model and column level (Part 02), doc blocks for longer,
          reusable prose that would be unwieldy to repeat inline (Part 03), and the generated docs site
          itself — including the DAG visualization, which is arguably the single most valuable piece of
          automatically generated documentation in the entire tool (Part 04 and Part 05).
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 — Descriptions in schema.yml ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Descriptions in schema.yml" />
        <SectionTitle>Model-Level and Column-Level Descriptions</SectionTitle>

        <Para>
          The simplest and most common form of dbt documentation is a plain <code>description:</code> field
          added directly under a model or one of its columns in <code>schema.yml</code> — the exact same
          file where you already declare tests. There is no separate documentation file to maintain for
          this level of detail; you are adding one more key to YAML you are likely editing anyway.
        </Para>

        <CodeBox label="models/marts/schema.yml — model and column descriptions">
{`version: 2

models:
  - name: fct_orders
    description: >
      One row per completed customer order. Grain is order_id. Built from
      stg_orders joined to stg_order_items (aggregated to order level) and
      dim_customers. Refreshed hourly via an incremental materialization —
      see the Incremental Models module for the exact strategy.
    columns:
      - name: order_id
        description: Primary key. Unique identifier for a single customer order.
        tests:
          - unique
          - not_null

      - name: customer_id
        description: Foreign key to dim_customers.customer_id.
        tests:
          - not_null
          - relationships:
              to: ref('dim_customers')
              field: customer_id

      - name: order_total_cents
        description: >
          Sum of all line item prices in cents, after discounts and before
          tax. Does not include shipping. Always a positive integer —
          refunded orders are represented as separate negative-value orders,
          not as a mutated original row.

      - name: order_status
        description: >
          Current lifecycle state of the order. One of: placed, packed,
          shipped, delivered, cancelled, refunded. See the accepted_values
          test on this column for the authoritative list.`}
        </CodeBox>

        <Para>
          Descriptions accept plain text or, using the YAML block scalar <code>&gt;</code> (folds newlines
          into spaces) or <code>|</code> (preserves newlines), multi-line prose. They also accept Markdown —
          a description can include a bullet list, a bolded term, or an inline code span, and the generated
          docs site renders it as formatted HTML rather than showing raw asterisks and backticks.
        </Para>

        <SubTitle>Sources get descriptions too</SubTitle>

        <Para>
          Documentation is not limited to models you build. Sources — the raw tables dbt reads via
          <code>source()</code> — take the same <code>description:</code> field at both the source and
          table level, which matters because sources are frequently the least-understood part of a
          project: a raw table named <code>orders_v2</code> in a production application database tells a
          new analyst nothing about what changed between v1 and v2 without a description explaining it.
        </Para>

        <CodeBox label="models/staging/_sources.yml — describing raw source tables">
{`version: 2

sources:
  - name: shopify
    description: Raw tables replicated from the Shopify production database via Fivetran, every 15 minutes.
    tables:
      - name: orders
        description: >
          Raw orders table. One row per order as it existed at the last
          sync. Note: this table is mutated in place by the source system,
          so historical states of an order are not preserved here — see
          stg_orders for the cleaned, deduplicated version this project
          actually builds on.
        columns:
          - name: id
            description: Shopify's internal order ID. Renamed to order_id in stg_orders.`}
        </CodeBox>

        <Callout title="Descriptions do not change what a model does" color={K}>
          A <code>description:</code> field is purely metadata. It has zero effect on compiled SQL, on
          materialization, or on test execution. This means it is completely safe to add, edit, or remove
          at any time without touching the model's actual behavior — which is exactly why there is no
          excuse for leaving it blank. Adding a description carries none of the risk of changing logic.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 — Doc Blocks ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Doc Blocks" />
        <SectionTitle>Doc Blocks — Reusable, Long-Form Documentation</SectionTitle>

        <Para>
          Inline <code>description:</code> fields work well for a sentence or a short paragraph. They break
          down for two situations: prose long enough to clutter the YAML file, and prose that needs to be
          shared identically across many models or columns. Repeating the same three-paragraph explanation
          of what <code>customer_id</code> means, verbatim, on twelve different columns across eight
          different models is exactly the kind of duplication that goes stale — someone updates it on four
          of the twelve and the other eight are now subtly wrong.
        </Para>

        <Para>
          A doc block solves this. It is a named, reusable chunk of Markdown, written once in a
          <code>.md</code> file anywhere inside your <code>models/</code> directory, and referenced from
          any <code>description:</code> field using the <code>{'{{ doc(\'block_name\') }}'}</code>
          function. dbt resolves the reference at compile time and substitutes the full text.
        </Para>

        <CodeBox label="models/staging/staging_docs.md — a doc block definition">
{`{% docs customer_id %}
The unique identifier for a customer in the core customer table
(dim_customers). This ID is stable for the customer's entire lifetime,
even if their email address, name, or shipping address changes.

Do not confuse this with the source system's own customer identifier —
Shopify, Stripe, and the support ticketing system each have their own
internal customer IDs. dim_customers.customer_id is dbt's own generated
surrogate key, built as a hash of the Shopify customer ID during staging,
so that a future migration away from Shopify would not require rebuilding
every downstream fact table's join key from scratch.
{% enddocs %}

{% docs order_status_lifecycle %}
Orders move through a fixed set of lifecycle states, in this order:

- **placed** — the order was submitted and payment authorized.
- **packed** — warehouse staff have picked and boxed the items.
- **shipped** — the carrier has taken possession of the package.
- **delivered** — the carrier's tracking API confirmed delivery.
- **cancelled** — the customer or support cancelled before shipment.
- **refunded** — a completed order was later refunded, in part or in full.

An order can move from placed directly to cancelled, skipping packed and
shipped entirely. An order cannot move backward — a delivered order that
is refunded gets order_status = refunded, it does not revert to delivered.
{% enddocs %}`}
        </CodeBox>

        <Para>
          Any model's <code>schema.yml</code> can now reference either block by name, and the full text
          above is substituted in wherever the reference appears — in the compiled documentation site, not
          in the SQL itself, since doc blocks never touch compiled model logic.
        </Para>

        <CodeBox label="referencing a doc block from schema.yml">
{`models:
  - name: fct_orders
    columns:
      - name: customer_id
        description: '{{ doc("customer_id") }}'

      - name: order_status
        description: '{{ doc("order_status_lifecycle") }}'

  - name: dim_customers
    columns:
      - name: customer_id
        description: '{{ doc("customer_id") }}'
        tests:
          - unique
          - not_null`}
        </CodeBox>

        <Para>
          Both <code>fct_orders.customer_id</code> and <code>dim_customers.customer_id</code> now show the
          identical, complete explanation on the docs site — updated in exactly one place, the
          <code>.md</code> file, the next time the definition needs to change. This is the same DRY
          principle Part 04 of the next module applies to SQL logic via macros, applied here to
          documentation text instead.
        </Para>

        <Table
          headers={['Approach', 'Where it lives', 'Best for']}
          rows={[
            ['Inline description:', 'Directly in schema.yml, next to the field', 'A short, one-off sentence specific to a single model or column'],
            ['Doc block ({% docs %})', 'A separate .md file, referenced via doc()', 'Long-form prose reused across multiple models or columns, or text long enough to clutter YAML'],
          ]}
        />

        <Callout title="Doc block names are project-wide and must be unique" color="#38bdf8">
          Every <code>{'{% docs name %}'}</code> block shares one flat namespace across the entire project,
          regardless of which <code>.md</code> file it is defined in. Two blocks named <code>customer_id</code>
          in two different files is a compile error, not a silent override — a useful safety net, but it
          also means a naming convention (prefixing by domain, e.g. <code>orders_status_lifecycle</code>) is
          worth adopting early in a growing project.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 — Generating and Serving the Docs Site ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Generating and Serving Docs" />
        <SectionTitle>dbt docs generate and dbt docs serve</SectionTitle>

        <Para>
          Writing descriptions and doc blocks is only half the story — they have to be compiled into
          something browsable. <code>dbt docs generate</code> is the command that does this. It runs
          through every model, source, seed, and macro in the project, resolves every
          <code>{'{{ doc() }}'}</code> reference, pulls in test configuration, and writes out a static
          documentation website as JSON and HTML artifacts inside the <code>target/</code> directory.
        </Para>

        <CodeBox label="generating and serving the docs site">
{`$ dbt docs generate
Running with dbt=1.8.0
Found 42 models, 6 sources, 18 tests, 3 seeds, 2 macros

Concurrency: 4 threads (target='dev')
Generating catalog.json
Catalog written to target/catalog.json
Generating manifest.json
Manifest written to target/manifest.json

$ dbt docs serve
Serving docs at 0.0.0.0:8080
To access from your browser, navigate to: http://localhost:8080`}
        </CodeBox>

        <Para>
          <code>dbt docs generate</code> produces two key artifacts. <code>manifest.json</code> is the
          project's full compiled state — every model's SQL, its config, its columns, its description, and
          crucially its dependency edges (which models <code>ref()</code> or <code>source()</code> which
          others). <code>catalog.json</code> adds the actual warehouse metadata — the real column types and
          row counts dbt gets back by querying <code>information_schema</code> in your warehouse. Together
          they are what the docs website renders. <code>dbt docs serve</code> then starts a small local web
          server, purely for convenience during local development — most teams instead publish the
          generated site somewhere persistent and shared, since a docs site only useful on one engineer's
          laptop defeats the purpose of team-wide documentation.
        </Para>

        <SubTitle>Hosting the docs site for the whole team</SubTitle>

        <Para>
          A locally served docs site disappears the moment you close the terminal. In practice, teams
          generate the docs site as part of their production dbt job (on dbt Cloud, this is usually a
          checkbox on the production job; on self-hosted orchestration, it is one more step in the same
          CI/CD pipeline that runs <code>dbt build</code>) and publish the resulting static files somewhere
          durable — an internal web server, an S3 bucket served through CloudFront, or dbt Cloud's own
          built-in hosted docs URL. The goal is that any analyst on the team can open one bookmarked link
          and see documentation that reflects the state of production, not whatever was on someone's laptop
          the last time they happened to run <code>dbt docs serve</code>.
        </Para>

        <Callout title="Regenerate docs on every production deploy, not on a schedule" color={K}>
          Because <code>manifest.json</code> is compiled from the project's actual current state, docs go
          stale the instant a model changes without a corresponding <code>dbt docs generate</code>. The
          reliable pattern is to run <code>dbt docs generate</code> as a step in the same CI/CD job that
          deploys model changes to production — so the published docs site and the deployed models are
          always the same commit, never out of sync by however long it has been since the last scheduled
          docs build.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 — The Auto-Generated DAG / Lineage Graph ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The Lineage Graph" />
        <SectionTitle>The DAG Visualization — dbt's Most Valuable Documentation Feature</SectionTitle>

        <Para>
          Every dbt docs site includes an interactive, zoomable graph showing every model, source, and seed
          as a node, connected by arrows representing dependencies. This is not a diagram someone drew in a
          whiteboarding tool and uploaded — it is generated directly from <code>manifest.json</code>'s
          dependency edges, which are themselves derived from the actual <code>ref()</code> and
          <code>source()</code> calls inside your compiled SQL.
        </Para>

        <CodeBox label="how the lineage graph is derived — not hand-drawn">
{`-- models/marts/fct_orders.sql
select
    o.order_id,
    o.customer_id,
    c.customer_segment,
    sum(oi.line_total_cents) as order_total_cents
from {{ ref('stg_orders') }} o
join {{ ref('dim_customers') }} c on o.customer_id = c.customer_id
join {{ ref('stg_order_items') }} oi on o.order_id = oi.order_id
group by 1, 2, 3

-- dbt parses these three ref() calls at compile time and records:
--   fct_orders depends on stg_orders
--   fct_orders depends on dim_customers
--   fct_orders depends on stg_order_items
--
-- The lineage graph draws exactly these three arrows into fct_orders.
-- There is no separate diagram to keep in sync — the arrows ARE the ref() calls.`}
        </CodeBox>

        <Para>
          This is the single most important property of the lineage graph: it is always accurate. A
          hand-maintained architecture diagram in Lucidchart or a wiki page is correct on the day it is
          drawn and starts drifting from reality the moment anyone adds a join, removes a dependency, or
          builds a new model — and nothing forces the diagram to be updated when that happens. dbt's graph
          cannot drift, because it is not drawn independently of the code; it is a direct rendering of the
          code's own dependency declarations. If the graph is wrong, the models are wrong in exactly the
          same way, because they are the same source of truth.
        </Para>

        <Table
          headers={['Property', 'Hand-drawn architecture diagram', "dbt's generated lineage graph"]}
          rows={[
            ['Source of truth', 'A person\'s memory of how the pipeline works, at the time it was drawn', 'Actual ref() and source() calls compiled from the real project'],
            ['Goes stale when a model changes?', 'Yes — nothing forces an update, drift is silent and invisible', 'No — regenerating docs after any change reflects the new dependencies automatically'],
            ['Shows the real current state?', 'Only if someone remembered to update it recently', 'Always, as of the last dbt docs generate'],
            ['Effort to keep accurate', 'Manual, ongoing, easy to skip under deadline pressure', 'Zero — accuracy is a byproduct of the code itself, not separate effort'],
          ]}
        />

        <Para>
          Beyond accuracy, the graph is genuinely useful for day-to-day work. Clicking a node highlights its
          full upstream and downstream lineage, instantly answering "what does this model actually depend
          on?" and "what would break if I changed this model's schema?" — questions that, without the
          graph, require manually grepping through every SQL file in the project for <code>ref()</code>
          calls. New team members use the graph to build a mental map of an unfamiliar project far faster
          than reading SQL files one at a time in an arbitrary order.
        </Para>

        <Callout title="This is why ref() and source() are non-negotiable" color="#38bdf8">
          The lineage graph's accuracy is entirely dependent on models using <code>{'{{ ref() }}'}</code>
          and <code>{'{{ source() }}'}</code> rather than hardcoded table names. A model that writes
          <code>from analytics.stg_orders</code> directly, instead of <code>from {'{{ ref(\'stg_orders\') }}'}</code>,
          is invisible to the dependency graph — dbt has no way to know that dependency exists, because it
          only ever looks like a plain string in the compiled SQL, and that model's lineage will simply be
          missing an arrow it should have.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 — Meta Fields and Tags ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Meta and Tags" />
        <SectionTitle>Meta Fields and Tags — Organizing Models Beyond Description Text</SectionTitle>

        <Para>
          Descriptions and doc blocks explain what a model means to a human reading the docs site. Meta
          fields and tags serve a different purpose: they attach structured, machine-usable metadata to a
          model that other tooling — including dbt's own selector syntax — can filter and query on.
        </Para>

        <SubTitle>meta: — structured ownership and classification data</SubTitle>

        <Para>
          <code>meta:</code> accepts an arbitrary key-value dictionary, most commonly used for ownership
          (which team or person is responsible for this model), a Slack channel to page when something
          breaks, or a data domain classification. Unlike free-text descriptions, <code>meta</code> values
          are structured enough that other systems — an internal ownership dashboard, an alerting tool that
          reads <code>manifest.json</code> — can programmatically look them up.
        </Para>

        <CodeBox label="meta: fields for ownership and classification">
{`models:
  - name: fct_orders
    description: One row per completed customer order.
    meta:
      owner: data-platform-team
      slack_channel: '#data-platform-alerts'
      domain: commerce
      contains_pii: false

  - name: dim_customers
    description: One row per customer, current attributes only.
    meta:
      owner: data-platform-team
      slack_channel: '#data-platform-alerts'
      domain: commerce
      contains_pii: true
      pii_fields: [email, shipping_address, phone_number]`}
        </CodeBox>

        <Para>
          A team-wide convention around <code>meta.owner</code> pays off the moment a project grows past
          one team. When <code>fct_orders</code> starts failing its <code>unique</code> test at 3 AM, an
          on-call engineer who has never seen this model before can open its docs page, read
          <code>meta.owner</code> and <code>meta.slack_channel</code>, and know exactly who to page — instead
          of guessing from a commit history or asking around in a general channel.
        </Para>

        <SubTitle>tags: — flexible grouping for selection and filtering</SubTitle>

        <Para>
          <code>tags:</code> is a simpler, flatter mechanism — a list of short labels attached to a model,
          most commonly used to group models for selective builds. Unlike <code>meta</code>, tags are
          directly usable in dbt's command-line selector syntax, so they double as an operational grouping
          tool, not just documentation.
        </Para>

        <CodeBox label="tags: for ETL grouping and selective runs">
{`models:
  - name: fct_orders
    tags: ['finance', 'hourly']

  - name: fct_marketing_attribution
    tags: ['marketing', 'daily']

  - name: dim_customers
    tags: ['core', 'hourly']`}
        </CodeBox>

        <CodeBox label="using tags to run a specific subset of models">
{`# Run only the models tagged 'hourly' — for example, from an hourly Airflow DAG
$ dbt build --select tag:hourly

# Run only 'finance' models — for example, triggered by a finance team's own schedule
$ dbt build --select tag:finance

# Combine a tag with the graph operator to build a tagged model plus its downstream dependents
$ dbt build --select tag:core+`}
        </CodeBox>

        <Table
          headers={['Mechanism', 'Shape', 'Used for']}
          rows={[
            ['meta:', 'Arbitrary key-value dictionary', 'Ownership, alerting contacts, PII classification, domain — structured facts about a model'],
            ['tags:', 'Flat list of short string labels', 'Grouping models for selective dbt run/build commands, e.g. by schedule frequency or by team'],
          ]}
        />

        <Callout title="A shared meta schema, not ad-hoc keys per model" color={K}>
          <code>meta</code> is schemaless — dbt does not enforce which keys exist. Left ungoverned, one
          model ends up with <code>owner</code> and another with <code>team</code> meaning the same thing,
          and no tool can reliably query across the whole project. Agree on a small, documented set of
          standard <code>meta</code> keys (owner, slack_channel, domain, contains_pii, at minimum) as a team
          convention before the project has fifty models each with a slightly different vocabulary.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 — Documentation as a Team Habit ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Documentation as a Habit" />
        <SectionTitle>Documentation Debt Accumulates Faster Than Most Teams Expect</SectionTitle>

        <Para>
          A project with ten models and one author rarely needs much documentation — the author holds the
          context in their head, and anyone with a question just asks them directly. That same project at
          two hundred models and six contributors is a completely different situation. No single person
          holds the full context anymore, the original author of a given model may have left the team, and
          "just ask" stops being a viable strategy at exactly the scale where documentation matters most.
        </Para>

        <Para>
          The failure mode is rarely a single dramatic incident. It is a slow accumulation: a new model
          ships without a description because the deadline was tight and "I'll add it later." Six more
          models ship the same way over the next quarter. A new hire joins, opens the docs site expecting
          to understand what <code>fct_subscription_events</code> means, finds an empty description field,
          and has to either guess from the SQL, ping someone on Slack and wait for a reply, or — the
          quietly dangerous option — build on top of an assumption about the model that turns out to be
          wrong. Multiply that by every undocumented model in a two-hundred-model project and the team is
          now spending a meaningful fraction of every week re-deriving context that a two-sentence
          description would have made instantly available.
        </Para>

        <HighlightBox>
          <Para>
            <strong>The concrete cost, stated plainly:</strong> in a growing project, every undocumented
            model becomes a recurring tax paid by whoever touches it next — read the SQL from scratch,
            trace <code>ref()</code> calls by hand to reconstruct what a hand-drawn diagram or a two-line
            description would have said instantly, or interrupt a teammate who happens to remember. That tax
            is paid repeatedly, by different people, for as long as the model exists undocumented. A five
            minute description written once, by the person who has the most context — right when the model
            is built — is paid once.
          </Para>
        </HighlightBox>

        <Para>
          The practical fix is not a documentation sprint every few months — those inevitably fall behind
          again within weeks. It is making descriptions part of the same pull request that introduces or
          changes a model, the same way tests are expected in that PR. Some teams enforce this with a CI
          check that fails a build if a new model has no <code>description:</code> field at all; others rely
          on code review convention. Either way, the goal is the same: documentation debt is cheapest to
          pay off at the moment the model is written, when the author still has full context in their head,
          and most expensive to pay off months later, when someone else has to reconstruct that context from
          scratch.
        </Para>

        <Callout title="Undocumented is a choice made once, paid for repeatedly" color="#ef4444">
          Skipping a description saves the original author perhaps two minutes. Every future reader who
          needed that description pays for the skip in full — reading SQL from scratch, guessing at
          business logic, or blocking on a Slack reply. On a team with real turnover, the original author
          may not even be around to answer by the time the cost comes due.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 — Worked Example: Fully Documenting a Mart Model ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Worked Example" />
        <SectionTitle>Fully Documenting fct_subscriptions From Scratch</SectionTitle>

        <Para>
          Putting every piece of this module together: a mart-layer model, fully documented, with a
          model-level description, column-level descriptions, a reused doc block from a related staging
          model, and a <code>meta</code> ownership tag.
        </Para>

        <CodeBox label="models/staging/staging_docs.md — the doc block being reused">
{`{% docs subscription_id %}
Surrogate key for a subscription, generated during staging as a hash of
the billing provider's own subscription ID and the billing provider name
(stripe, chargebee). Stable for the subscription's entire lifetime,
including plan upgrades, downgrades, and pauses — a plan change does not
create a new subscription_id, it updates the existing row's plan_name and
mrr_cents.
{% enddocs %}`}
        </CodeBox>

        <CodeBox label="models/marts/schema.yml — fct_subscriptions, fully documented">
{`version: 2

models:
  - name: fct_subscriptions
    description: >
      One row per active or historical subscription. Grain is
      subscription_id. Combines stg_stripe_subscriptions and
      stg_chargebee_subscriptions into one unified subscription model,
      since the company migrated billing providers mid-year and both
      still have active subscriptions. Refreshed hourly, incremental on
      updated_at — see the Incremental Models module for the exact
      merge strategy used here.
    meta:
      owner: billing-team
      slack_channel: '#billing-data-alerts'
      domain: revenue
      contains_pii: false
    tags: ['billing', 'hourly']
    columns:
      - name: subscription_id
        description: '{{ doc("subscription_id") }}'
        tests:
          - unique
          - not_null

      - name: customer_id
        description: '{{ doc("customer_id") }}'
        tests:
          - not_null
          - relationships:
              to: ref('dim_customers')
              field: customer_id

      - name: billing_provider
        description: >
          Which billing system this subscription originates from. One of:
          stripe (legacy, pre-migration subscriptions still on Stripe
          billing), chargebee (all subscriptions created after the
          migration date). Both are unified into this single model so
          downstream revenue reporting does not need to know which
          provider any given subscription came from.
        tests:
          - accepted_values:
              values: ['stripe', 'chargebee']

      - name: plan_name
        description: Current subscription plan tier — starter, growth, or enterprise.

      - name: mrr_cents
        description: >
          Monthly recurring revenue attributable to this subscription, in
          cents, at its current plan tier. Annual plans are normalized to
          a monthly figure by dividing by 12 — see the mrr_normalization
          macro covered in the next module for exactly how this
          normalization is computed.

      - name: subscription_status
        description: Current lifecycle state — trialing, active, past_due, cancelled.
        tests:
          - accepted_values:
              values: ['trialing', 'active', 'past_due', 'cancelled']`}
        </CodeBox>

        <Para>
          Notice what each piece contributes. The model-level description tells a reader what the grain is
          and why two billing providers are unified into one model — context that isn't visible from the
          SQL alone, since the SQL itself just contains a <code>union all</code> with no explanation of why
          it exists. The <code>meta</code> block tells an on-call engineer who to page. The reused
          <code>subscription_id</code> and <code>customer_id</code> doc blocks stay identical to their
          definitions elsewhere in the project, so this model's docs never silently drift from
          <code>dim_customers</code>'s explanation of the same concept. And every column with a non-obvious
          meaning — <code>billing_provider</code>, <code>mrr_cents</code> — gets enough inline description
          that a new analyst reading the generated docs site, not the SQL, could still correctly write a
          query against this table without asking anyone a single question.
        </Para>

        <Callout title="Documentation completeness is itself testable" color="#38bdf8">
          Some teams use the dbt package <code>dbt_meta_testing</code> or a custom macro to assert, as part
          of CI, that every model in the mart layer has a non-empty <code>description</code> and every
          column has at least one test. Treating documentation coverage as a checkable property — the same
          way test coverage is checkable — is a strong lever against the slow accumulation described in
          Part 07.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 — Exposures ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Exposures" />
        <SectionTitle>exposures: — Declaring What Actually Consumes a Model's Output</SectionTitle>

        <Para>
          Everything so far in this module documents the project's own internals — models, sources, and the
          dependencies between them. The lineage graph in Part 05 is complete on the input side: it shows
          every upstream table a model reads from. It says nothing at all about the output side — what
          actually consumes <code>fct_orders</code> once dbt is done building it. A Looker dashboard, a
          Python notebook a data scientist runs weekly, a reverse-ETL sync pushing a model into Salesforce —
          none of that lives inside the dbt project's own DAG, because none of it is built by dbt. Without a
          way to declare it, that entire downstream half of the picture is invisible from inside the project
          itself.
        </Para>

        <Para>
          An <code>exposures:</code> block in a YAML file closes exactly this gap. It declares a downstream
          consumer — a dashboard, a notebook, an application, an ML feature pipeline — as a first-class node
          in the project, explicitly listing which models it depends on via <code>depends_on</code>. Once
          declared, that consumer appears in the lineage graph as a terminal node, and the same selector
          syntax used everywhere else in dbt can target it directly.
        </Para>

        <CodeBox label="models/marts/_exposures.yml — declaring a downstream dashboard">
{`version: 2

exposures:
  - name: executive_revenue_dashboard
    label: Executive Revenue Dashboard
    type: dashboard
    maturity: high
    url: https://mycompany.looker.com/dashboards/482
    description: >
      Weekly executive dashboard showing revenue, order volume, and churn
      trends. Reviewed live in the Monday leadership meeting — treat any
      breaking change to its underlying models as release-blocking, not
      a routine schema update.
    depends_on:
      - ref('fct_orders')
      - ref('fct_subscriptions')
      - ref('dim_customers')
    owner:
      name: Data Platform Team
      email: data-platform@mycompany.com

  - name: churn_prediction_notebook
    label: Churn Prediction Feature Notebook
    type: ml
    maturity: medium
    description: >
      A data scientist's weekly notebook that pulls fct_subscriptions and
      dim_customers to build features for a churn prediction model. Not
      a formal pipeline yet -- run manually, but its output does inform
      real retention-campaign targeting decisions.
    depends_on:
      - ref('fct_subscriptions')
      - ref('dim_customers')
    owner:
      name: Data Science Team
      email: data-science@mycompany.com`}
        </CodeBox>

        <Para>
          The <code>type</code> field (<code>dashboard</code>, <code>notebook</code>, <code>application</code>,
          <code>ml</code>, or <code>analysis</code>) and <code>maturity</code> (<code>low</code>,
          <code>medium</code>, <code>high</code>) are pure metadata — they do not change dbt's behavior, but
          they render on the docs site and let a team triage which exposures are genuinely critical versus
          exploratory. <code>maturity: high</code> on the executive dashboard above is a signal to future
          contributors: breaking a model this exposure depends on is not a routine change to wave through in
          review.
        </Para>

        <SubTitle>Validating an exposure's full dependency chain before a release</SubTitle>

        <Para>
          Because an exposure's <code>depends_on</code> list is ordinary <code>ref()</code> syntax, it
          participates in dbt's graph selectors exactly like a model would. This makes it possible to
          validate, before merging a change, that every model a specific dashboard actually depends on still
          builds and passes its tests — not just the model you directly edited, but its entire upstream
          chain, scoped precisely to what that one dashboard needs.
        </Para>

        <CodeBox label="Building and testing everything one exposure depends on, and nothing more">
{`# Rebuild and test only the models feeding executive_revenue_dashboard,
# following every upstream dependency back to raw sources:

dbt build --select +exposure:executive_revenue_dashboard

# Useful specifically in CI on a PR that touches a shared upstream model
# (e.g. stg_orders) -- this confirms every exposure that transitively
# depends on it still builds cleanly, without rebuilding the entire
# project.`}
        </CodeBox>

        <Para>
          This is a materially different and more targeted check than Part 04's slim-CI-style "did anything
          break" validation — <code>+exposure:name</code> answers a specific, business-framed question:
          "if I ship this change, does the dashboard the CEO looks at every Monday still work?" rather than
          the more generic "did any test anywhere fail." Teams with a small number of genuinely
          high-stakes, well-known downstream consumers get outsized value from declaring exactly those as
          exposures, even if they don't bother declaring every minor internal analysis someone ran once.
        </Para>

        <Table
          headers={['Without exposures', 'With exposures declared']}
          rows={[
            ['The lineage graph ends at the last dbt model — what actually consumes it is invisible to the project.', 'The graph extends one more hop to show real downstream consumers as named, owned nodes.'],
            ['A model change\'s "blast radius" is whatever a person happens to remember or manually check.', '+exposure:name selects exactly the models a specific downstream consumer needs, mechanically, not from memory.'],
            ['No structured way to flag "this specific dashboard is business-critical, be careful."', 'maturity and description on the exposure itself carry that signal directly into the docs site and PR review.'],
            ['A downstream owner is tracked in a spreadsheet or someone\'s memory, if at all.', 'owner.name / owner.email lives in the same version-controlled YAML as everything else the project documents.'],
          ]}
        />

        <Callout title="An exposure does not make dbt build or manage the downstream thing itself" color={K}>
          Declaring <code>executive_revenue_dashboard</code> as an exposure does not mean dbt refreshes the
          Looker dashboard, runs the notebook, or has any operational control over it whatsoever. An exposure
          is purely a documentation and dependency-tracking declaration — it tells dbt (and anyone reading the
          docs site) that this consumer exists and what it depends on, so the project's own picture of its
          blast radius is complete, without dbt taking on any responsibility for the consumer's own execution.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 10 — Hosting the docs site in production ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Hosting the Docs Site in Production" />
        <SectionTitle>Where the Generated Site Actually Lives, and Who Can See It</SectionTitle>

        <Para>
          Part 04 established that <code>dbt docs serve</code> is a local-only convenience and that a real
          team publishes the generated site somewhere durable instead. What that actually looks like in
          practice varies more than it might seem, and the choice carries real tradeoffs around cost,
          maintenance burden, and — critically, since a docs site can expose column names, business logic,
          and sometimes sensitive metadata — who is allowed to view it at all.
        </Para>

        <Table
          headers={['Hosting option', 'What it involves', 'Access control']}
          rows={[
            ['dbt Cloud\'s built-in docs hosting', 'Enabled with one setting on a dbt Cloud job; dbt Cloud serves the generated site itself, no separate infrastructure to run.', 'Inherits dbt Cloud\'s own project permissions — anyone with access to the dbt Cloud project can view docs; no separate access system to configure.'],
            ['Static hosting: S3 + CloudFront (or GCS + Cloud CDN)', 'The CI/CD job that runs dbt docs generate uploads target/ to a bucket after every production deploy; a CDN serves it as a plain static site.', 'Bucket and distribution can be locked to a VPN, an IP allowlist, or fronted with an auth proxy (e.g. an OAuth-gated CloudFront function) — full control, but you build and maintain that layer yourself.'],
            ['An internal web server (nginx serving target/ directly)', 'Simplest self-hosted option for a team already running internal infrastructure — copy the generated static files to a directory nginx serves.', 'Whatever the internal network and any auth already in front of that server provides — often just "must be on the company VPN."'],
            ['A generic static-site host (Netlify, Vercel, GitHub Pages)', 'Convenient for a small team with no existing cloud infrastructure; a CI step deploys target/ on every merge to main.', 'Varies by provider — some offer password-gating or SSO on paid tiers; a public GitHub Pages site is genuinely public unless the repo itself is private.'],
          ]}
        />

        <Para>
          The access-control question deserves more attention than it usually gets, because a compiled docs
          site is not harmless to expose broadly. It typically includes every model's full compiled SQL,
          every column name and description (which can include business logic, internal terminology, or
          hints about how revenue or fraud detection works), and — if <code>meta.contains_pii</code> and
          similar fields are used per Part 06 — an explicit map of exactly which tables and columns carry
          sensitive data. That last part is genuinely double-edged: it is extremely useful for a team's own
          governance work, and exactly the kind of map you do not want reachable by anyone outside the
          company.
        </Para>

        <CodeBox label="A CI/CD step publishing docs to S3 behind access control, after a successful prod deploy">
{`# .github/workflows/deploy.yml (illustrative) -- runs only after
# dbt build succeeds against production in the same job

- name: Generate docs
  run: dbt docs generate --target prod

- name: Publish docs to S3
  run: aws s3 sync target/ s3://mycompany-dbt-docs/ --delete

- name: Invalidate CDN cache so the new docs are served immediately
  run: aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*"

# The S3 bucket and CloudFront distribution are themselves configured,
# outside of this pipeline, to require either VPN-only access or an
# authentication layer in front of the distribution -- dbt has no
# involvement in or awareness of that access-control layer at all.`}
        </CodeBox>

        <Para>
          A useful default posture, regardless of which hosting option a team picks: never rely on
          "obscurity" (an unlisted URL nobody happens to have shared) as the actual access control. An
          unlisted static site URL is trivially discoverable — through browser history, a shared Slack link,
          or a search engine that happened to crawl it — so genuine access control means an actual
          authentication or network boundary in front of the site, not merely the hope that nobody stumbles
          onto the link.
        </Para>

        <Callout title="dbt Cloud's built-in hosting trades control for convenience" color={K}>
          Using dbt Cloud's own docs hosting means never building or maintaining a publishing pipeline at
          all — genuinely valuable for a small team. The tradeoff is that access control is whatever dbt
          Cloud's own project permission model provides; a team with a more specific requirement (a docs site
          visible to certain stakeholders but not others, independent of dbt Cloud seat access) needs one of
          the self-hosted options instead, where that finer-grained control has to be built deliberately.
        </Callout>

        <SubTitle>A quick decision guide</SubTitle>

        <Table
          headers={['Team situation', 'Reasonable default choice']}
          rows={[
            ['Already on dbt Cloud, no unusual access requirement', "dbt Cloud's built-in docs hosting — lowest effort, and permissions already match who has dbt Cloud project access."],
            ['Self-hosted dbt, existing cloud infrastructure (AWS/GCP), sensitive data in the schema', 'S3/GCS + CDN behind an internal auth layer — more setup, but access control matches internal security requirements.'],
            ['Small team, no existing cloud infrastructure at all, low sensitivity in what docs expose', 'A generic static-site host with password gating on a paid tier — fastest to stand up without new cloud accounts.'],
            ['Regulated data, strict need-to-know on which columns are PII', 'Self-hosted behind VPN or SSO, never a public static host regardless of how convenient it looks.'],
          ]}
        />

        <Para>
          Whichever option a team picks, the one universal requirement is that <code>dbt docs generate</code>
          runs as an automated step immediately after every successful production deploy, not as a manual,
          occasionally-remembered task — a stale docs site that silently drifted from what production actually
          runs is arguably worse than no docs site at all, since it actively misleads a reader who reasonably
          assumes it reflects current reality.
        </Para>

        <Callout title="Treat docs-site access control as a data-governance decision, not just an infra choice" color="#ef4444">
          The question "who can view the compiled docs site" is really the question "who can see every
          column name, every model's SQL logic, and every meta.contains_pii flag across the whole
          warehouse" — decided once, by whoever picks the hosting option, often without looping in whoever
          owns data governance for the company. Loop that person in before the choice is made, not after an
          access review flags it.
        </Callout>
      </section>

      <Divider />

      {/* ── Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About dbt Documentation</SectionTitle>

        {[
          {
            wrong: '"dbt docs generate produces documentation from comments in the SQL files"',
            right: 'It compiles descriptions from schema.yml (and doc() references resolved from .md files), plus warehouse metadata it queries directly via information_schema — not from SQL comments, which dbt does not parse for documentation purposes at all (Part 02, Part 04).',
          },
          {
            wrong: '"The DAG graph on the docs site is just a diagram someone configured or drew"',
            right: 'It is generated automatically from the actual ref() and source() calls compiled out of every model\'s SQL — there is no separate diagram to draw or keep in sync, which is exactly why it cannot go stale the way a hand-drawn architecture diagram does (Part 05).',
          },
          {
            wrong: '"dbt docs serve is how you share documentation with your team"',
            right: 'dbt docs serve starts a local server on one machine for local development convenience only — it disappears when that terminal closes. Sharing documentation with a team means publishing the generated static site somewhere persistent, typically as a step in the same CI/CD job that deploys production models (Part 04).',
          },
          {
            wrong: '"meta and tags are basically the same feature with two names"',
            right: 'meta is an arbitrary key-value dictionary meant for structured facts like ownership and PII classification; tags is a flat list of short labels specifically usable in dbt\'s command-line selector syntax (--select tag:hourly) for grouping models into selective runs. They serve different purposes and are commonly used together, not interchangeably (Part 06).',
          },
          {
            wrong: '"Documentation can always be added later, once there\'s time"',
            right: 'Documentation is cheapest to write at the moment a model is created, when the author has full context in their head, and progressively more expensive every month afterward, as context fades and the original author may no longer even be on the team. "Later" is when the cost is highest, not lowest (Part 07).',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', marginBottom: 8, fontFamily: FONT_MONO }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Real-World Story ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: FONT_MONO }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Three Ways Real Teams Have Used dbt Documentation to Prevent Incidents</SectionTitle>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Squarespace — website builder, subscription billing
          </div>
          <Para>
            An analyst at Squarespace is asked to build a churn dashboard and starts from
            <code>fct_subscriptions</code>, assuming <code>subscription_status = &apos;cancelled&apos;</code>
            means the customer left. The model&apos;s docs page — specifically a description someone wrote
            months earlier while implementing a grace-period feature — explains that a cancelled
            subscription still bills through the end of its current period and does not represent an
            immediate churn event; the actual churn flag lives on a separate <code>churned_at</code> column
            set only once the grace period expires.
          </Para>
          <Para>
            Reading that one paragraph on the docs page, before writing a single line of SQL, avoids
            shipping a churn dashboard that would have overcounted churn by roughly the length of every
            customer&apos;s grace period — a bug that historically took weeks to notice through a mismatch
            against finance&apos;s own churn numbers, before this model had a documented explanation of its
            own status field.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Rippling — HR and payroll platform, ownership routing
          </div>
          <Para>
            A payroll calculation model starts failing its tests during an overnight run at Rippling. The
            on-call data engineer, who has never touched this specific model, has no idea who normally owns
            it — the person who built it works on a different team entirely. Opening the model&apos;s docs
            page shows <code>meta.owner: payroll-eng</code> and <code>meta.slack_channel: &apos;#payroll-eng-oncall&apos;</code>,
            set months earlier when the model was first built.
          </Para>
          <Para>
            The on-call engineer pages the right channel within two minutes of the failure instead of
            posting in a general data-team channel and waiting for someone to recognize the model name — a
            direct payoff of the <code>meta.owner</code> convention this team adopted specifically because
            their dbt project had grown past the point where every engineer recognized every model on sight.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Gusto — payroll and benefits, onboarding new hires
          </div>
          <Para>
            A newly hired analytics engineer at Gusto is handed a two-hundred-model dbt project in their
            first week, with no single teammate available to walk them through the whole thing in detail.
            Instead of reading SQL files in an arbitrary order, they open the dbt docs site&apos;s lineage
            graph, find <code>fct_payroll_runs</code> — the model they&apos;ve been asked to modify — and
            click it to highlight its full upstream dependency chain back to raw sources.
          </Para>
          <Para>
            Within the graph they can see exactly which staging models feed the model they need to change,
            and reading each one&apos;s description along the way builds a working mental model of the
            payroll domain in an afternoon — a task that, without accurate, generated lineage, would have
            meant grepping through dozens of SQL files by hand trying to reconstruct which model depended on
            which, with no guarantee of finding every dependency.
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
            q: 'Where does dbt store model and column descriptions, and how does that placement change the way documentation gets maintained compared to an external wiki?',
            a: 'Descriptions live directly in schema.yml, the same file where tests are already configured for that model (Part 02). Because the description sits in version control right next to the code it describes, a pull request that changes a model\'s logic is the natural place to also update its description — the two changes are reviewed together in the same diff, rather than living in a separate system (a wiki, a spreadsheet) on a separate update schedule that nothing forces to stay in sync with the code.',
          },
          {
            q: 'Explain what a doc block is, how it differs from an inline description, and give a concrete reason you would reach for one instead of the other.',
            a: 'A doc block is a named, reusable chunk of Markdown defined once in a {% docs name %}...{% enddocs %} block inside a .md file, referenced from any schema.yml description field via {{ doc(\'name\') }} (Part 03). An inline description is written directly and only applies to that one field. You reach for a doc block when the same explanation needs to appear on multiple models or columns — for example customer_id meaning the same thing on both dim_customers and fct_orders — because maintaining that explanation in one place and referencing it twice is safer than keeping two independent copies in sync by hand.',
          },
          {
            q: 'Why is the auto-generated lineage graph considered more trustworthy than a hand-drawn architecture diagram, mechanically?',
            a: 'The lineage graph is derived directly from ref() and source() calls that dbt parses out of each model\'s actual compiled SQL when building manifest.json (Part 05) — it is not drawn independently of the code, it is a rendering of the code\'s own dependency declarations. A hand-drawn diagram is correct only as of whenever someone last updated it, and nothing forces that update when a model\'s dependencies change; the generated graph cannot have that class of staleness, because regenerating docs after any change automatically reflects the new dependency edges.',
          },
          {
            q: 'What is the practical difference between meta: and tags: in schema.yml, and when would you use each?',
            a: 'meta is an arbitrary key-value dictionary for structured facts about a model — ownership, an alerting Slack channel, PII classification (Part 06). tags is a flat list of short string labels, and unlike meta, tags are directly consumable by dbt\'s own command-line selector syntax, e.g. dbt build --select tag:hourly to run only models tagged for an hourly schedule. Use meta for descriptive, lookup-style metadata a human or dashboard reads; use tags when you specifically need to group models for selective dbt run or build commands.',
          },
          {
            q: 'Why does documentation debt tend to compound in a growing dbt project, and what is the standard mitigation?',
            a: 'A small project with one or two authors rarely needs much written documentation, because the authors hold the context in their heads and can just be asked directly (Part 07). That stops scaling once a project grows past the point where any one person holds full context — new models ship undocumented under deadline pressure, and every future reader of that model pays a repeated cost in re-deriving what a two-sentence description would have said instantly, sometimes from an author who has since left the team. The standard mitigation is treating a description as an expected part of the same pull request that introduces or changes a model — the same review discipline already applied to tests — sometimes enforced with a CI check that fails a build introducing an undocumented model, rather than relying on periodic documentation sprints that inevitably fall behind again.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Five Mistakes Teams Make Documenting dbt Projects</SectionTitle>

        {[
          {
            title: 'Leaving new models undocumented under deadline pressure, planning to "add it later"',
            detail: 'Later almost never comes, and the cost only grows — the original author\'s context fades and other engineers may need this model in the meantime with nothing to go on but the raw SQL.',
          },
          {
            title: 'Copy-pasting the same long explanation across many models\' schema.yml descriptions instead of using a doc block',
            detail: 'Every copy is a place that can silently drift when the underlying concept\'s explanation needs to change — a doc block referenced with {{ doc() }} keeps it in exactly one place.',
          },
          {
            title: 'Treating dbt docs serve as a way to share documentation with the team',
            detail: 'It only serves locally and disappears when the terminal closes. Publishing the generated static site somewhere persistent, as part of the production deploy pipeline, is what actually makes docs available to everyone.',
          },
          {
            title: 'Hardcoding a table name instead of using ref() or source(), breaking the lineage graph',
            detail: 'The graph can only show a dependency it can see in a ref() or source() call — a hardcoded table reference is invisible to it, leaving a gap in the DAG that looks like the dependency simply doesn\'t exist.',
          },
          {
            title: 'Never agreeing on a standard set of meta: keys across the project',
            detail: 'Without a shared convention, one model uses meta.owner and another uses meta.team for the same concept, and no tool or dashboard can reliably query ownership across the whole project consistently.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 10 }}>{item.title}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.detail}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>dbt Documentation Errors — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: 'Compilation Error: doc \'customer_id\' not found in package',
            cause: 'A schema.yml field references {{ doc(\'customer_id\') }} but no {% docs customer_id %}...{% enddocs %} block with that exact name exists anywhere in the project\'s models/ directory, or it was defined in a .md file outside the models/ folder where dbt does not look for doc blocks.',
            fix: 'Confirm the doc block is defined in a .md file inside models/ (anywhere under it is fine) and that the name after {% docs %} matches the doc() reference exactly, including case.',
          },
          {
            error: 'Two doc blocks with the same name compile error: doc name \'order_status\' is defined in multiple places',
            cause: 'Doc block names share one flat namespace across the entire project — two .md files, even in completely different subdirectories, both defined a block with the same name.',
            fix: 'Rename one of the two blocks to something more specific (a domain prefix like billing_order_status vs shipping_order_status), then update every {{ doc() }} reference pointing at the one you renamed.',
          },
          {
            error: 'dbt docs generate succeeds but the generated site shows no column types or row counts',
            cause: 'catalog.json, which carries actual warehouse metadata via information_schema queries, was not generated — this happens if dbt docs generate was run without an active connection to the warehouse, or with a profile pointing at the wrong environment.',
            fix: 'Confirm dbt debug succeeds against the intended target, then re-run dbt docs generate with a valid warehouse connection so it can query information_schema for real column types and stats.',
          },
          {
            error: 'A model appears in the docs site but its expected upstream dependency is missing from the lineage graph',
            cause: 'The model\'s SQL references that upstream table using a hardcoded schema.table_name string instead of {{ ref(\'model_name\') }} or {{ source(...) }} — dbt has no way to detect a dependency it cannot see as a ref() or source() call.',
            fix: 'Replace the hardcoded reference with the appropriate ref() or source() call, then re-run dbt docs generate; the missing arrow will appear in the regenerated graph.',
          },
          {
            error: 'dbt docs serve starts but the browser shows a blank page or a stale version of the docs',
            cause: 'The browser is showing a cached version of the docs site from an earlier dbt docs generate, or docs generate was never actually re-run after the most recent model changes, so target/manifest.json is out of date.',
            fix: 'Re-run dbt docs generate to refresh the compiled artifacts, then hard-refresh the browser tab (or open a private window) to bypass any cached version of the page.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: 'var(--red)', marginBottom: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '8px 12px', lineHeight: 1.5 }}>{item.error}</div>
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

      <KeyTakeaways items={[
        'Descriptions live directly in schema.yml, right next to the tests already configured for the same model or column — documentation is compiled from version-controlled YAML, not maintained in a separate external system.',
        'Doc blocks ({% docs name %}...{% enddocs %} in a .md file, referenced via {{ doc(\'name\') }}) let long-form or repeated prose be written once and reused across many models and columns without drifting out of sync.',
        'dbt docs generate compiles manifest.json (project structure and dependencies) and catalog.json (real warehouse metadata) into a static docs site; dbt docs serve is for local viewing only — publish the generated site as part of your production deploy pipeline to share it with the team.',
        'The auto-generated lineage graph is derived directly from ref() and source() calls in compiled SQL, which is exactly why it cannot drift out of sync the way a hand-drawn architecture diagram inevitably does.',
        'meta: attaches structured, arbitrary key-value facts (ownership, PII classification, alerting channel); tags: attaches flat labels directly usable in dbt\'s --select syntax for grouping models into selective runs.',
        'Documentation is cheapest to write the moment a model is created, while the author still has full context, and grows more expensive every month it is deferred — treating it as part of the same PR as the model change is the standard mitigation.',
      ]} />
    </LearnLayout>
  )
}
