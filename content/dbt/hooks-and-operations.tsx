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

export default function HooksAndOperations() {
  return (
    <LearnLayout
      title="Hooks and Operations"
      description="What a dbt hook actually is, the four hook types and their exact config syntax, the classic post-hook grant pattern for keeping BI tools from silently losing access after every table rebuild, run-operation for standalone maintenance macros, and how hooks differ from on-demand macro invocation."
      section="dbt — Module 15"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'Hooks and Operations', href: '/learn/dbt/hooks-and-operations' },
      ]}
      prev={{ title: 'Variables and Environments', href: '/learn/dbt/variables-and-environments' }}
      next={{ title: 'Project Structure and Layering', href: '/learn/dbt/project-structure' }}
    >
      {/* ── Part 01 — What a hook is ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What a Hook Actually Is" />
        <SectionTitle>A Hook Is SQL That Runs at a Specific Point Around a Model's Execution</SectionTitle>

        <Para>
          Every dbt model, when it runs, executes as a specific sequence of SQL statements against your
          warehouse — a <code>CREATE OR REPLACE</code> of some kind, wrapping the <code>SELECT</code> you
          wrote. A hook is additional SQL you configure to run automatically at a specific point in that
          sequence, without touching the model's own <code>SELECT</code> statement at all. dbt supports
          hooks that fire immediately before a model builds, immediately after a model builds, once at the
          very start of an entire invocation, and once at the very end — four distinct attachment points,
          each solving a different class of problem.
        </Para>

        <Para>
          The core idea is worth internalizing precisely: a hook is not a separate step you run manually.
          It is configuration attached to a model (or to the whole project) that tells dbt "also run this
          SQL, at this exact moment, every time." You write the hook once, and it fires automatically on
          every subsequent <code>dbt run</code> or <code>dbt build</code>, with zero action required from
          whoever triggers that run.
        </Para>

        <HighlightBox>
          <Para>
            <strong>Why hooks exist at all:</strong> a model's own <code>SELECT</code> statement can only
            ever describe a query — it has no way to express "and also grant a role SELECT on this table
            afterward" or "and also log that this run started." Those are not transformations of data; they
            are side effects tied to the act of building. Hooks give you a place to put exactly that kind of
            SQL, without polluting the model file with statements that have nothing to do with the actual
            transformation logic.
          </Para>
        </HighlightBox>

        <Para>
          Hooks are ordinary SQL, but they are also Jinja-aware, exactly like model files — you can use{' '}
          <code>{'{{ this }}'}</code>, <code>ref()</code>, variables, and macros inside a hook's SQL string.
          This is what makes hooks genuinely useful rather than just a place to paste static SQL: a hook can
          reference the specific model it is attached to, or call a reusable macro, rather than hardcoding a
          table name that would break the moment that table is renamed.
        </Para>

        <Table
          headers={['Hook type', 'When it fires', 'Scope']}
          rows={[
            ['pre-hook', 'Immediately before a model\'s build statement executes.', 'One model (or applied to several via project-level config).'],
            ['post-hook', 'Immediately after a model\'s build statement executes successfully.', 'One model (or applied to several via project-level config).'],
            ['on-run-start', 'Once, before any model in the invocation starts building.', 'The entire dbt run / dbt build invocation, project-wide.'],
            ['on-run-end', 'Once, after every model in the invocation has finished (success or failure).', 'The entire dbt run / dbt build invocation, project-wide.'],
          ]}
        />

        <Para>
          Part 02 covers the exact configuration syntax for each of these four. Part 03 works through the
          single most common real-world hook use case in complete depth. Part 05 covers the alternative to a
          hook entirely — invoking a macro standalone, on demand, outside of any model's build.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 — the four hook types ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — The Four Hook Types" />
        <SectionTitle>pre-hook, post-hook, on-run-start, on-run-end — Exact Syntax</SectionTitle>

        <SubTitle>pre-hook — runs before a model builds</SubTitle>

        <Para>
          A <code>pre-hook</code> runs immediately before dbt executes the DDL that builds a model. A
          realistic use: temporarily disabling a constraint or dropping an index before a table rebuild that
          would otherwise conflict with it, then relying on the model's own build to recreate the table
          cleanly. It is configured either inline via <code>config()</code> at the top of a model file, or
          project-wide in <code>dbt_project.yml</code>.
        </Para>

        <CodeBox label="models/marts/fct_orders.sql — a pre-hook configured on one model">
{`{{
  config(
    pre_hook="alter table {{ this }} disable trigger orders_audit_trigger"
  )
}}

select
    order_id,
    customer_id,
    order_status,
    order_total_cents
from {{ ref('stg_orders') }}`}
        </CodeBox>

        <Para>
          Note that <code>{'{{ this }}'}</code> inside the hook string resolves to the current model's own
          fully qualified, compiled table name — the same name the model itself builds. This is what lets a
          hook reference "whatever table this model produces" without hardcoding a schema and table name
          that would silently go stale the moment the model is renamed or its target schema changes.
        </Para>

        <SubTitle>post-hook — runs after a model builds, the most common of the four</SubTitle>

        <Para>
          A <code>post-hook</code> runs immediately after a model's build statement completes successfully.
          This is, in practice, the hook type used constantly in real projects, because the single most
          common real-world need — re-granting SELECT permissions to a reporting role immediately after a
          table rebuild — has to happen after the new table exists, not before. Part 03 works through
          exactly why this specific use case is so common, in full depth.
        </Para>

        <CodeBox label="a post-hook granting SELECT after this model builds">
{`{{
  config(
    post_hook="grant select on {{ this }} to role bi_reader"
  )
}}

select
    order_id,
    customer_id,
    order_status,
    order_total_cents
from {{ ref('stg_orders') }}`}
        </CodeBox>

        <Para>
          Both <code>pre_hook</code> and <code>post_hook</code> also accept a list, not just a single
          string, if more than one statement needs to run at that point — dbt executes them in the order
          given.
        </Para>

        <CodeBox label="multiple post-hooks on one model, run in order">
{`{{
  config(
    post_hook=[
      "grant select on {{ this }} to role bi_reader",
      "grant select on {{ this }} to role finance_analyst"
    ]
  )
}}

select order_id, customer_id, order_status, order_total_cents
from {{ ref('stg_orders') }}`}
        </CodeBox>

        <SubTitle>on-run-start — runs once, project-wide, at the very beginning of an invocation</SubTitle>

        <Para>
          <code>on-run-start</code> is configured in <code>dbt_project.yml</code>, not in an individual
          model file, because it is not tied to any one model — it fires exactly once, before dbt starts
          building the first model of a <code>dbt run</code> or <code>dbt build</code> invocation, no matter
          how many models that invocation ultimately touches.
        </Para>

        <CodeBox label="dbt_project.yml — an on-run-start hook logging the start of every invocation">
{`on-run-start:
  - "insert into analytics.dbt_run_log (event, occurred_at) values ('run_started', current_timestamp())"`}
        </CodeBox>

        <SubTitle>on-run-end — runs once, project-wide, at the very end of an invocation</SubTitle>

        <Para>
          <code>on-run-end</code> is the mirror image, also configured in <code>dbt_project.yml</code>: it
          fires exactly once, after every model in the invocation has finished, whether that invocation
          succeeded or failed. A very common real use is audit logging — recording that a run completed and
          when — or maintaining a "last successful run" timestamp table that other systems can check to know
          how fresh the warehouse's dbt-built tables currently are.
        </Para>

        <CodeBox label="dbt_project.yml — an on-run-end hook recording a last-successful-run timestamp">
{`on-run-end:
  - "insert into analytics.dbt_last_run_status (run_completed_at, invocation_id) values (current_timestamp(), '{{ invocation_id }}')"`}
        </CodeBox>

        <Para>
          <code>on-run-end</code> hooks also have access to a special <code>schemas</code> and{' '}
          <code>results</code> Jinja variable describing every model that was part of the run and whether
          each one succeeded — enough to build a hook that only logs a completion row when every single
          model actually succeeded, rather than unconditionally.
        </Para>

        <CodeBox label="dbt_project.yml — a project-wide grant applied to every model that builds, via on-run-end">
{`on-run-end:
  - "{% for schema in schemas %}grant usage on schema {{ schema }} to role bi_reader;{% endfor %}"`}
        </CodeBox>

        <Table
          headers={['Hook', 'Configured where', 'Fires how many times per invocation']}
          rows={[
            ['pre-hook', 'config() block in a model file, or per-directory in dbt_project.yml', 'Once per model it is attached to, before that model builds.'],
            ['post-hook', 'config() block in a model file, or per-directory in dbt_project.yml', 'Once per model it is attached to, after that model builds.'],
            ['on-run-start', 'dbt_project.yml, top level', 'Exactly once, before the first model in the whole invocation builds.'],
            ['on-run-end', 'dbt_project.yml, top level', 'Exactly once, after every model in the whole invocation has finished.'],
          ]}
        />

        <Callout title="pre-hook and post-hook can also be set project-wide" color={K}>
          Just like <code>materialized</code>, <code>pre_hook</code> and <code>post_hook</code> can be set
          under the <code>models:</code> block in <code>dbt_project.yml</code>, applying to every model
          under a given directory path rather than requiring the same <code>config()</code> block to be
          copy-pasted into every individual model file. This is exactly how the grant pattern in Part 03 is
          usually applied in a real project — once, at the <code>marts/</code> directory level, rather than
          repeated per model.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 — the grant pattern, worked in depth ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The Post-Hook Grant Pattern" />
        <SectionTitle>Why CREATE OR REPLACE TABLE Silently Revokes Permissions — and the Fix</SectionTitle>

        <Para>
          This is the single most common real-world reason a team reaches for a hook at all, so it is worth
          understanding the underlying mechanism precisely rather than just copying the pattern.
        </Para>

        <Para>
          Every table materialization dbt builds runs some form of <code>CREATE OR REPLACE TABLE</code>{' '}
          against the warehouse. On many warehouses, including Snowflake, <code>CREATE OR REPLACE</code>{' '}
          does not modify the existing table in place — it drops the old object entirely and creates a
          brand-new object with the same name. A grant you issued against the old object — say,{' '}
          <code>grant select on analytics.fct_orders to role bi_reader</code> — was a permission attached to
          that specific, now-deleted object. The new object created by the next{' '}
          <code>CREATE OR REPLACE</code> is a different object as far as the warehouse's permission system is
          concerned, even though it has the identical name, and it starts with none of the grants the old one
          had.
        </Para>

        <CodeBox label="what actually happens across two dbt runs, without a post-hook">
{`-- Day 1: table is built, then manually granted
create or replace table analytics.fct_orders as (select ...);
grant select on analytics.fct_orders to role bi_reader;
-- BI tool queries fct_orders successfully all day

-- Day 2: dbt run rebuilds the same model
create or replace table analytics.fct_orders as (select ...);
-- ^ this DROPPED the Day 1 object and created a new one
--   the grant from Day 1 was attached to the OLD object -- it is gone
-- BI tool's next query fails with a permission error
-- nobody touched permissions on purpose -- the daily dbt run did this silently`}
        </CodeBox>

        <Para>
          This produces a genuinely confusing incident the first time a team hits it: nobody explicitly
          revoked anything, no one changed a role's permissions, and yet a BI tool that was working perfectly
          yesterday suddenly cannot read a table today. The actual cause is entirely mechanical — every
          single scheduled <code>dbt run</code> rebuilding that table is quietly wiping out the grant, and it
          will keep happening on every future run until something re-grants access after every rebuild,
          automatically, forever.
        </Para>

        <Callout title="This is not a Snowflake-specific quirk to shrug off" color="#ef4444">
          The exact mechanics vary slightly by warehouse — some engines preserve certain grants across a{' '}
          <code>CREATE OR REPLACE</code> in specific circumstances — but the safe, portable assumption for
          any table materialization is that a fresh rebuild may not carry forward previously granted
          privileges. Relying on grants surviving a rebuild is relying on undocumented, engine-specific
          behavior. A post-hook that re-grants unconditionally on every run is correct regardless of which
          warehouse you are on.
        </Callout>

        <SubTitle>The fix: a post-hook that re-grants on every single build</SubTitle>

        <Para>
          The fix is not to grant permissions once, manually, after the first build. It is to attach a{' '}
          <code>post-hook</code> to the model that re-issues the grant every time the model builds, so the
          grant is restored automatically within the same run that just dropped it — a BI tool never
          actually experiences a gap in access, because by the time <code>dbt run</code> finishes, the grant
          is already back in place.
        </Para>

        <CodeBox label="models/marts/fct_orders.sql — the complete, correct pattern">
{`{{
  config(
    materialized='table',
    post_hook="grant select on {{ this }} to role bi_reader"
  )
}}

select
    order_id,
    customer_id,
    order_status,
    order_total_cents,
    order_placed_at
from {{ ref('stg_orders') }}`}
        </CodeBox>

        <Para>
          <code>{'{{ this }}'}</code> is what makes this hook durable rather than fragile — it always
          resolves to whatever fully qualified name this specific model actually builds as, in whichever
          environment the run is happening in (<code>dev</code>, <code>staging</code>, <code>prod</code>).
          Hardcoding <code>analytics.fct_orders</code> directly into the hook string instead would silently
          grant permissions on the wrong table the moment this model is run in a different target schema, or
          would need to be manually updated if the model's name ever changes.
        </Para>

        <CodeBox label="what the compiled run actually executes, end to end">
{`-- dbt compiles and runs, in order, for this one model:
create or replace table dbt_asil.fct_orders as (
    select order_id, customer_id, order_status, order_total_cents, order_placed_at
    from dbt_asil.stg_orders
);
-- ^ the model's own build statement -- this is what dropped and recreated the table

grant select on dbt_asil.fct_orders to role bi_reader;
-- ^ the post-hook, firing immediately after, in the same dbt invocation
--   by the time this run finishes, the grant is already restored`}
        </CodeBox>

        <Para>
          Applied once, at the directory level in <code>dbt_project.yml</code>, this same pattern protects
          every mart-level model in a project with a single block of configuration rather than a{' '}
          <code>config()</code> line copy-pasted into every mart file — and it means a brand-new mart model
          added six months from now automatically inherits the same protection with zero extra effort from
          whoever writes it.
        </Para>

        <CodeBox label="dbt_project.yml — applying the grant post-hook to every model under marts/">
{`models:
  freshcart_analytics:
    marts:
      +post_hook: "grant select on {{ this }} to role bi_reader"`}
        </CodeBox>

        <Callout title="This is why the pattern belongs at the marts layer, specifically" color={K}>
          BI tools and dashboards query mart-level models, not staging or intermediate models — a BI role
          typically has no reason to ever read <code>stg_orders</code> directly. Applying the grant hook at
          the <code>marts/</code> directory level, rather than project-wide, means every model that a BI
          tool actually depends on gets automatically re-granted, without also granting a reporting role
          access to internal staging and intermediate models it was never meant to see.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 — combining with incremental models and multiple grants ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Extending the Pattern" />
        <SectionTitle>Multiple Roles, Conditional Hooks, and Why Incremental Models Change the Calculus</SectionTitle>

        <Para>
          Real projects rarely have exactly one reporting role. A finance mart might need to grant SELECT to
          both a BI tool's service account and a finance analyst's role; a marketing mart to a completely
          different pair of roles. The list form of <code>post_hook</code> covered in Part 02 handles this
          directly.
        </Para>

        <CodeBox label="granting to more than one role from the same post-hook config">
{`{{
  config(
    materialized='table',
    post_hook=[
      "grant select on {{ this }} to role bi_reader",
      "grant select on {{ this }} to role finance_analyst_reporting"
    ]
  )
}}

select
    order_id,
    customer_id,
    order_status,
    order_total_cents
from {{ ref('stg_orders') }}`}
        </CodeBox>

        <Para>
          It is worth being explicit about why incremental models change this calculus. An incremental model
          does not run <code>CREATE OR REPLACE TABLE</code> on every run — after its first build, it runs an{' '}
          <code>insert</code> or <code>merge</code> into the existing table, which does not drop and
          recreate the object at all. This means an incremental model's grants, once issued, generally
          survive every subsequent incremental run untouched — the permission problem described in Part 03
          is specifically a full-rebuild problem.
        </Para>

        <Table
          headers={['Materialization', 'Does a normal run drop and recreate the object?', 'Does the grant survive that run?']}
          rows={[
            ['table', 'Yes — every run is a fresh CREATE OR REPLACE TABLE.', 'No, on most warehouses — needs a post-hook to re-grant every run.'],
            ['view', 'Yes — every run is a fresh CREATE OR REPLACE VIEW.', 'No, for the same reason as table — a post-hook is still needed if the view is queried by a role other than the one that owns it.'],
            ['incremental (steady-state runs, after the first build)', 'No — subsequent runs insert or merge into the existing object.', 'Yes — the object itself was never dropped, so its grants are untouched.'],
            ['incremental, full-refresh run (--full-refresh)', 'Yes — a full-refresh explicitly rebuilds the table from scratch.', 'No — this specific run behaves exactly like a table rebuild, and needs the post-hook to fire.'],
          ]}
        />

        <Callout title="A post-hook still belongs on an incremental model, despite this" color={K}>
          Even though a normal incremental run does not drop the table, an occasional{' '}
          <code>dbt run --full-refresh</code> — used deliberately to rebuild an incremental model from
          scratch, say after a schema change — behaves exactly like a table rebuild and will still wipe
          grants on warehouses where <code>CREATE OR REPLACE</code> does. Leaving the post-hook attached to
          an incremental model costs nothing on the steady-state runs where it is a no-op-equivalent
          re-grant, and protects the one occasion a full refresh is triggered.
        </Callout>

        <Para>
          A conditional variant is also common in real projects: only issuing certain grants in specific
          environments, using a Jinja <code>{'{% if %}'}</code> inside the hook string itself, so a
          development target does not attempt to grant a production-only role that may not even exist in
          that environment.
        </Para>

        <CodeBox label="a post-hook that only grants in production, using target.name">
{`{{
  config(
    materialized='table',
    post_hook="{% if target.name == 'prod' %}grant select on {{ this }} to role bi_reader{% else %}select 1{% endif %}"
  )
}}

select order_id, customer_id, order_status, order_total_cents
from {{ ref('stg_orders') }}`}
        </CodeBox>

        <Para>
          The <code>select 1</code> fallback matters mechanically — a hook string must always compile to a
          valid, executable SQL statement, so an empty string or a comment-only branch would fail; a
          harmless no-op statement is the idiomatic way to make a conditional hook do genuinely nothing in
          branches where no action is wanted.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 — run-operation ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — run-operation" />
        <SectionTitle>run-operation — Invoking a Macro Directly, Outside Any Model's Build</SectionTitle>

        <Para>
          Everything in Parts 01 through 04 is a hook — SQL tied to a model's lifecycle or to a whole
          invocation, firing automatically every time that model or invocation runs. Sometimes you need the
          opposite: a one-off maintenance action, invoked manually from the command line, that is not tied
          to building any model at all. <code>dbt run-operation</code> is exactly this — it invokes a
          standalone macro directly, on demand, with no model build involved.
        </Para>

        <CodeBox label="a standalone macro, written to be called via run-operation">
{`{% macro grant_select(role) %}

  {% set relations = ['analytics.fct_orders', 'analytics.dim_customers'] %}

  {% for relation in relations %}
    {% set sql %}
      grant select on {{ relation }} to role {{ role }}
    {% endset %}
    {% do run_query(sql) %}
    {{ log("Granted select on " ~ relation ~ " to " ~ role, info=true) }}
  {% endfor %}

{% endmacro %}`}
        </CodeBox>

        <Para>
          Invoking it from the CLI, passing <code>role</code> as an argument, looks like this — no model is
          built, no <code>dbt run</code> or <code>dbt build</code> is involved, just the macro executing
          directly:
        </Para>

        <CodeBox label="invoking the macro directly from the CLI">
{`$ dbt run-operation grant_select --args '{role: bi_reader}'`}
        </CodeBox>

        <Output>
{`Running with dbt=1.8.3
Granted select on analytics.fct_orders to bi_reader
Granted select on analytics.dim_customers to bi_reader

Done. PASS=1 WARN=0 ERROR=0 SKIP=0 TOTAL=1`}
        </Output>

        <Para>
          Real use cases for <code>run-operation</code> tend to be one-off maintenance tasks rather than
          anything that needs to happen automatically on a schedule: manually re-granting permissions after
          a new role is created and needs to be caught up on existing tables, clearing out a specific
          table's contents without rebuilding the whole model, or running a cleanup macro that drops old,
          orphaned tables left behind by renamed models (exactly the kind of orphaned object described in
          the models-basics module's naming discussion).
        </Para>

        <CodeBox label="another realistic run-operation macro — clearing a table's rows for a manual re-load">
{`{% macro clear_table(table_name) %}
  {% set sql %}
    truncate table {{ table_name }}
  {% endset %}
  {% do run_query(sql) %}
  {{ log("Truncated " ~ table_name, info=true) }}
{% endmacro %}`}
        </CodeBox>

        <CodeBox label="invoking it once, manually, before a manual full reload">
{`$ dbt run-operation clear_table --args '{table_name: analytics.fct_orders}'`}
        </CodeBox>

        <Table
          headers={['', 'Hook (pre/post/on-run-start/on-run-end)', 'run-operation']}
          rows={[
            ['Tied to', 'A model\'s build lifecycle, or a full run/build invocation.', 'Nothing — invoked directly and independently of any model or run.'],
            ['Triggered', 'Automatically, every time the attached model or invocation runs.', 'Manually, only when someone runs the run-operation command.'],
            ['Good for', 'Recurring side effects that must happen every single time a model builds — grants, audit logging.', 'One-off maintenance actions — manual grant catch-up, clearing a table, cleanup scripts.'],
            ['Where it lives', 'config() in a model file, or dbt_project.yml.', 'A standalone macro in macros/, called from the CLI.'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 06 — hook vs run-operation, the decision ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Choosing Between Them" />
        <SectionTitle>The Real Decision: Does This Need to Happen Every Time, or Just Once, On Demand?</SectionTitle>

        <Para>
          The distinction from Part 05's table compresses into one practical question worth asking about
          any SQL side effect you're trying to automate: does this genuinely need to happen automatically,
          every single time a model (or the whole project) builds — or is this a one-off action a human
          decides to trigger occasionally?
        </Para>

        <Para>
          The grant pattern from Part 03 is the clearest possible example of the first case. A BI tool's
          access must never depend on someone remembering to run a manual command after today's scheduled
          dbt job — if it did, the very first day someone forgot, the BI tool would silently lose access
          again. That is exactly why it belongs as a <code>post_hook</code>, tied permanently to the model's
          own build, rather than as a <code>run-operation</code> a human has to remember to invoke.
        </Para>

        <Para>
          Catching a newly created role up on permissions for tables that already exist is the clearer
          example of the second case. This needs to happen exactly once, at the moment the new role is
          created — running it on every future <code>dbt run</code> forever, as a hook, would be needless
          overhead for something that is genuinely a one-time backfill.
        </Para>

        <CodeBox label="a five-second decision checklist">
{`Does this action need to happen automatically, every single time
this model (or the whole project) builds?

  YES -> it's a hook (pre-hook, post-hook, on-run-start, on-run-end)
         -- tie it to the model's config() or dbt_project.yml,
            so nobody has to remember to trigger it manually

  NO  -> it's a run-operation
         -- write it as a standalone macro, invoke it manually
            from the CLI exactly when the one-off need arises`}
        </CodeBox>

        <Callout title="A hook that only needs to run once is a maintenance liability" color="#ef4444">
          A hook that fires on every single run but only actually needed to do something once — like a
          historical data backfill — silently re-executes that logic on every future run forever, which is
          at best wasted warehouse compute and at worst dangerous if the hook's SQL is not safely
          idempotent. If an action genuinely only needs to happen once, invoke it once, manually, via{' '}
          <code>run-operation</code> — do not leave it wired in as a permanent hook out of convenience.
        </Callout>

        <Para>
          It is also worth noting these two mechanisms are not mutually exclusive within one project — a
          real dbt project commonly has both a permanent <code>post_hook</code> grant pattern on its mart
          models and a small library of maintenance macros in <code>macros/</code>, invoked occasionally via{' '}
          <code>run-operation</code> for the one-off tasks that come up as the project evolves.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — A Last-Successful-Run Audit Table" />
        <SectionTitle>Building an on-run-end Hook That Downstream BI Tools Can Query for Freshness</SectionTitle>

        <Para>
          One of the most useful real applications of <code>on-run-end</code>, beyond a simple log line, is a
          small audit table a BI tool or internal dashboard can query directly to answer a question end users
          ask constantly: "how fresh is this data right now?" Instead of a BI tool guessing, or a stakeholder
          asking the data team in Slack, the BI tool queries a single row this hook maintains automatically,
          on every invocation, without any model needing to know it exists.
        </Para>

        <Para>
          The key design decision is that this table should record a completed run only when the run actually
          succeeded — a naive version that writes a row unconditionally on every invocation would happily
          report "last successful run: 2 minutes ago" immediately after a run that failed halfway through,
          which is worse than not having the table at all, because it actively asserts freshness that isn't
          real. <code>on-run-end</code> hooks have access to a <code>results</code> Jinja variable listing
          every node in the invocation and its outcome, which is exactly what makes this check possible.
        </Para>

        <CodeBox label="dbt_project.yml — an on-run-end hook that only records success when every model succeeded">
{`on-run-end:
  - "{{ record_last_successful_run(results) }}"`}
        </CodeBox>

        <CodeBox label="macros/record_last_successful_run.sql — the actual conditional logic">
{`{% macro record_last_successful_run(results) %}

  {% set any_failures = false %}
  {% for result in results %}
    {% if result.status in ('error', 'fail') %}
      {% set any_failures = true %}
    {% endif %}
  {% endfor %}

  {% if not any_failures %}
    {% set sql %}
      insert into analytics.dbt_last_successful_run
          (invocation_id, completed_at, models_built)
      values
          ('{{ invocation_id }}', current_timestamp(), {{ results | length }})
    {% endset %}
    {% do run_query(sql) %}
    {{ log("Recorded successful run " ~ invocation_id, info=true) }}
  {% else %}
    {{ log("Run had failures -- last_successful_run NOT updated", info=true) }}
  {% endif %}

{% endmacro %}`}
        </CodeBox>

        <Para>
          A BI tool, or a lightweight internal dashboard, then needs only a single, trivial query against
          this table to answer the freshness question for an end user — no dbt internals, no access to CI
          logs, just a plain <code>SELECT</code> against a table that already has the answer.
        </Para>

        <CodeBox label="what a BI tool or dashboard queries to show freshness to an end user">
{`select
    completed_at,
    datediff('minute', completed_at, current_timestamp()) as minutes_since_last_success
from analytics.dbt_last_successful_run
order by completed_at desc
limit 1`}
        </CodeBox>

        <Output>{`COMPLETED_AT              MINUTES_SINCE_LAST_SUCCESS
2026-09-11 06:04:12          47

-- the dashboard renders: "Data current as of 47 minutes ago"
-- instead of end users guessing, or asking the data team directly`}</Output>

        <Para>
          This pattern composes directly with source freshness checks from the testing-strategy module: a{' '}
          <code>dbt source freshness</code> failure tells the platform team a source is stale before a build
          even starts, while this <code>on-run-end</code> table tells an end user, after the fact, whether
          the transformation layer they actually query kept up. Together they cover both ends of the same
          question — is the raw data recent, and did the pipeline that turns it into a reportable table
          actually finish successfully on top of it.
        </Para>

        <Callout title="Keep this table itself simple and append-only" color={K}>
          Resist the temptation to fold additional logic into this same hook — row counts per model, per-model
          timing, error detail. All of that belongs in a proper observability or logging table populated by
          its own mechanism, not crammed into the one hook a BI tool depends on for a single, simple freshness
          number. A hook an end-user-facing dashboard depends on should stay as small and as unlikely to break
          as possible.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Hook Ordering and Failure Behavior" />
        <SectionTitle>What Actually Happens When a pre-hook or post-hook Itself Fails</SectionTitle>

        <Para>
          Every example so far assumes a hook's SQL succeeds. It is worth being precise about what dbt
          actually does when a hook itself errors, because the answer is different depending on which of the
          four hook types fails, and getting this wrong is how a "harmless" logging hook ends up silently
          taking down an entire production run.
        </Para>

        <Table
          headers={['Hook', 'If it fails, what happens to the model it is attached to', 'What happens to the rest of the invocation']}
          rows={[
            ['pre-hook', 'The model\'s own build statement never runs at all — dbt treats the model itself as errored.', 'Everything downstream of that model is skipped, exactly as if the model\'s own SELECT had failed.'],
            ['post-hook', 'The model has already built successfully by the time its post-hook runs — the table or view exists with correct data — but dbt still marks the model as errored for this invocation because a configured post-hook failing counts as part of that model\'s result.', 'Everything downstream of that model is skipped, even though the model\'s own data is actually fine — only the post-hook step failed.'],
            ['on-run-start', 'Not tied to any single model.', 'No model in the invocation attempts to build at all — dbt fails the entire invocation immediately, before the first model.'],
            ['on-run-end', 'Not tied to any single model; by the time it runs, every model has already finished, successfully or not.', 'The invocation as a whole is marked as failed, but every model\'s own individual result (already recorded before on-run-end ran) is unaffected — the models themselves already succeeded or failed on their own merits.'],
          ]}
        />

        <Para>
          The post-hook row is the one that surprises engineers most often the first time they hit it: a
          model can build a perfectly correct table, with entirely correct data, and still show up as{' '}
          <code>ERROR</code> in the run's summary because its post-hook — say, a grant statement referencing
          a role that does not exist in this environment — failed after the real work was already done. The
          data is fine. The run output says otherwise. This is exactly why Part 04's environment-conditional
          hook pattern (only granting when <code>target.name == 'prod'</code>) matters beyond tidiness — an
          unconditional grant to a prod-only role, run in a dev environment where that role was never created,
          fails the model in dev for a reason that has nothing to do with the model's actual correctness.
        </Para>

        <CodeBox label="what a failed post-hook actually looks like in run output">
{`06:04:11  1 of 1 START sql table model marts.fct_orders ................ [RUN]
06:04:13  1 of 1 OK created sql table model marts.fct_orders ............ [SELECT 48213 in 2.1s]
06:04:13  Running hook: post-hook.fct_orders.0
06:04:13  Database Error in hook post-hook.fct_orders.0
  002003 (42S02): SQL compilation error: role 'BI_READER_STAGING' does not exist
06:04:13  1 of 1 ERROR creating sql table model marts.fct_orders ........ [ERROR in 0.15s]

-- the table itself built and has correct data (SELECT 48213 succeeded)
-- but the model is reported as ERROR because its post-hook failed
-- anything downstream of fct_orders will be SKIPPED, even though
-- fct_orders' own data is completely fine`}
        </CodeBox>

        <Para>
          The practical consequence worth internalizing: a downstream model getting skipped does not always
          mean upstream data is bad. It is worth checking, specifically, whether the failure that caused the
          skip was in the model's own <code>SELECT</code> or in one of its hooks, before assuming a data
          problem and starting to debug the transformation logic — the two failure modes look identical in a
          quick glance at a red run summary, but call for completely different fixes.
        </Para>

        <Callout title="A hook failure blocking downstream models is a feature, not a bug, in most cases" color="#ef4444">
          It is tempting to conclude from the above that hook failures should somehow be non-blocking by
          default, so a grant issue never stalls a downstream build. Resist that instinct for hooks doing
          anything security-relevant: a post-hook failing to grant access is itself important information —
          it means a BI role currently does <em>not</em> have access to this freshly rebuilt table, and
          silently continuing as if nothing happened would leave that broken-access state undetected until a
          BI tool's own query fails later, with far less context about why. The environment-conditional
          pattern from Part 04 is almost always the better fix than trying to suppress the failure.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Hooks vs. Macros vs. run-operation vs. Snowflake-Native" />
        <SectionTitle>Four Mechanisms for "Run This SQL Automatically" — and When Each One Actually Wins</SectionTitle>

        <Para>
          By this point in the module there are, in effect, four different ways to get SQL to execute without
          a person typing it manually each time: a dbt hook, a dbt macro called from a model, a{' '}
          <code>run-operation</code>, and — stepping outside dbt entirely — a warehouse-native scheduling
          mechanism like a Snowflake task or stream. Real projects, especially ones already running on
          Snowflake, end up choosing between these constantly, and the wrong choice tends to produce either
          something that should have been automatic staying manual, or something automated in dbt that the
          warehouse was always going to do more natively and more cheaply.
        </Para>

        <Table
          headers={['Mechanism', 'Tied to a dbt run?', 'Best for', 'Weak point']}
          rows={[
            ['pre-hook / post-hook', 'Yes — fires as part of one specific model\'s build, every time that model runs.', 'A side effect that must happen every time this exact model builds — the grant pattern from Part 03 is the canonical case.', 'Only fires when dbt actually runs this model; cannot run on any independent schedule of its own.'],
            ['on-run-start / on-run-end', 'Yes — fires once per whole dbt invocation, regardless of which models it touches.', 'Invocation-level bookkeeping — an audit log row, the last-successful-run table from Part 07.', 'Same limitation, one level up: it only fires when someone runs dbt at all, never independently.'],
            ['A macro invoked via run-operation', 'No — invoked manually and independently of any model build.', 'A one-off, human-triggered maintenance action — Part 05 and Part 06\'s backfill and cleanup cases.', 'Needs a human (or an external scheduler calling the CLI) to actually trigger it; nothing fires on its own.'],
            ['A Snowflake-native task + stream', 'No — runs entirely inside the warehouse, on the warehouse\'s own schedule, independent of dbt.', 'A genuinely warehouse-internal maintenance job with no dbt-modeled logic involved — purging old rows on a timer, monitoring a raw ingestion table for new rows to react to.', 'Lives outside the dbt project entirely — invisible to dbt\'s DAG, its docs, and anyone reading the project to understand what runs and when.'],
          ]}
        />

        <Para>
          The decision that trips people up most, coming from a Snowflake background specifically, is the
          last row: Snowflake tasks and streams can absolutely run scheduled SQL on their own, with no dbt
          involvement at all, so it is tempting to treat every recurring warehouse job as a task rather than a
          dbt hook. The distinction that actually matters is whether the job is <em>about a dbt model</em> or
          entirely independent of dbt's own DAG. The grant post-hook from Part 03 is fundamentally about a
          specific dbt model's own lifecycle — it needs to know precisely when that model rebuilds, which is
          exactly what a dbt hook is positioned to know and a Snowflake task is not, short of duplicating
          dbt's own run logic outside of dbt.
        </Para>

        <CodeBox label="a genuinely task-shaped job -- unrelated to any dbt model's build lifecycle">
{`-- this belongs as a Snowflake task, NOT a dbt hook: it runs on its
-- own fixed schedule, has nothing to do with any specific dbt model
-- rebuilding, and dbt would add nothing by wrapping it

create or replace task purge_stale_raw_events
  warehouse = transform_wh
  schedule = 'USING CRON 0 3 * * * UTC'
as
  delete from raw.events where _loaded_at < dateadd(day, -90, current_timestamp());`}
        </CodeBox>

        <Para>
          Conversely, a common mistake in the other direction is building an elaborate Snowflake task-and-stream
          pipeline to react to a dbt model's own output — say, a stream watching <code>fct_orders</code> for
          new rows to trigger a downstream notification — when a straightforward <code>post-hook</code> on{' '}
          that exact model would do the same job with far less moving infrastructure, and would show up
          directly in the dbt project where anyone reading the model's config can see it, rather than being
          invisible outside dbt entirely.
        </Para>

        <CodeBox label="the same notification need, done as a post-hook instead of a stream-triggered task">
{`{{
  config(
    materialized='table',
    post_hook="call analytics.notify_new_orders_batch({{ this }})"
  )
}}

select order_id, customer_id, order_status, order_total_cents
from {{ ref('stg_orders') }}

-- one line, visible in the model's own config, versus a separate
-- stream + task pair that has to be discovered by reading Snowflake's
-- own object list rather than the dbt project`}
        </CodeBox>

        <Callout title="A rule of thumb: if it's about a model, it's a dbt hook; if it's about the warehouse, it's a task" color={K}>
          A job whose entire reason for existing references a specific dbt model — grant its access back,
          record that it built, notify something once it has new rows — belongs inside dbt as a hook, because
          dbt is the system that already knows exactly when that model builds. A job with no meaningful tie
          to any one model's build — purging old raw data on a timer, monitoring an external stage for new
          files to load — belongs as a warehouse-native task, because forcing it into a dbt invocation gains
          nothing and adds an artificial dependency on dbt actually running for something that was never
          about a dbt model in the first place.
        </Callout>

        <Para>
          None of this is a strict either/or across an entire project — a healthy Snowflake-plus-dbt setup
          commonly runs all four mechanisms side by side: grant post-hooks on every mart model, an on-run-end
          audit table, a small library of run-operation macros for occasional maintenance, and a handful of
          genuinely warehouse-native tasks for jobs that were never dbt's concern to begin with. The skill is
          recognizing, for any given new automation need, which of the four it actually is.
        </Para>
      </section>

      <Divider />

      {/* ── Part 10 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Debugging a Hook in Practice" />
        <SectionTitle>Reading Hook Output When Something in the Chain Goes Wrong</SectionTitle>

        <Para>
          The failure-behavior table in Part 08 describes what dbt does structurally when a hook fails. In
          practice, the harder part is not knowing that a post-hook failure blocks downstream models — it is
          quickly telling, from a wall of run output, whether a given failure came from a model's own{' '}
          <code>SELECT</code> or from one of its hooks, especially when several models in the same invocation
          are failing at once for unrelated reasons.
        </Para>

        <Para>
          dbt's run output is deliberately explicit about this distinction if you know what to look for: a
          failure inside a model's own build statement is reported directly against that step, while a hook
          failure is reported against a separate, clearly labeled <code>hook</code> step that runs
          immediately after (for a post-hook) or before (for a pre-hook) the model's own compile step. The
          practical habit worth building: before assuming a model's transformation logic is broken, check
          whether the failing line in the log actually says <code>hook</code> or names the model's own
          materialization statement.
        </Para>

        <CodeBox label="two failures that look similar at a glance but require completely different fixes">
{`-- Failure #1: the model's own SELECT is broken
06:10:02  1 of 2 START sql table model marts.fct_orders ................ [RUN]
06:10:02  Database Error in model fct_orders (models/marts/fct_orders.sql)
  002003 (42S02): SQL compilation error: invalid identifier 'ORDR_ID'
06:10:02  1 of 2 ERROR creating sql table model marts.fct_orders ........ [ERROR in 0.09s]
-- fix: there is a real typo/bug in the model's own SELECT statement

-- Failure #2: the model built fine, its post-hook did not
06:11:40  2 of 2 START sql table model marts.dim_customers .............. [RUN]
06:11:42  2 of 2 OK created sql table model marts.dim_customers ......... [SELECT 91002 in 1.9s]
06:11:42  Running hook: post-hook.dim_customers.0
06:11:42  Database Error in hook post-hook.dim_customers.0
  002003 (42S02): SQL compilation error: role 'FINANCE_ANALYST_REPORTING' does not exist
06:11:42  2 of 2 ERROR creating sql table model marts.dim_customers ..... [ERROR in 0.11s]
-- fix: the grant target doesn't exist in this environment -- the
-- model itself, and its data, are completely fine`}
        </CodeBox>

        <Para>
          A second habit worth building specifically for project-wide hooks configured in{' '}
          <code>dbt_project.yml</code> rather than an individual model's <code>config()</code>: since the
          same hook string applies to every model under a given directory, a single bad hook (a typo in the
          grant SQL, a role name that only exists in one environment) can appear to fail many unrelated models
          at once, all with the identical error message. That repetition across otherwise-unrelated models is
          itself a strong signal the problem is the shared hook, not something wrong with each model
          individually.
        </Para>

        <CodeBox label="the tell: the same identical error across several unrelated models">
{`06:12:01  ERROR creating sql table model marts.fct_orders ....... [ERROR in 0.11s]
  role 'FINANCE_ANALYST_REPORTING' does not exist
06:12:03  ERROR creating sql table model marts.dim_customers ..... [ERROR in 0.10s]
  role 'FINANCE_ANALYST_REPORTING' does not exist
06:12:05  ERROR creating sql table model marts.dim_products ...... [ERROR in 0.09s]
  role 'FINANCE_ANALYST_REPORTING' does not exist

-- three completely different models, the exact same error --
-- this is the +post_hook config at the marts/ directory level in
-- dbt_project.yml, not three independent bugs in three models`}
        </CodeBox>

        <Callout title="Check the shared config before debugging each model individually" color={K}>
          Seeing the identical error repeated across several models that share nothing in common except a
          directory is a strong enough signal on its own to go straight to the project-wide{' '}
          <code>+post_hook</code> (or <code>+pre_hook</code>) config for that directory in{' '}
          <code>dbt_project.yml</code>, rather than opening each model file individually looking for a bug
          that almost certainly is not there. This single habit turns what looks like three or four separate
          incidents into one five-minute fix.
        </Callout>

        <Para>
          <code>dbt run --select fct_orders</code> re-running just the one affected model, after fixing the
          shared hook config, is the fastest way to confirm the fix worked without re-running the entire
          project — the model itself never needed rebuilding in the first place, since its own data was fine
          the whole time; only the hook needed to succeed.
        </Para>
      </section>

      <Divider />

      {/* ── Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About dbt Hooks and Operations</SectionTitle>
        {[
          {
            wrong: '"Grants issued once on a table survive future dbt runs automatically"',
            right: 'Part 03 covers the actual mechanism directly: most table and view materializations run a fresh CREATE OR REPLACE on every build, which on many warehouses drops the old object and creates a new one, taking previously issued grants with it. A post-hook that re-grants unconditionally on every run is the only reliable fix, not a one-time manual grant.',
          },
          {
            wrong: '"A hook is a separate step you have to remember to run after dbt run finishes"',
            right: 'The opposite is true, and it is the entire point of a hook per Part 01: it is configuration attached to the model or invocation itself, and it fires automatically as part of that same dbt run or dbt build — no separate manual step, no risk of someone forgetting.',
          },
          {
            wrong: '"run-operation and a hook are basically interchangeable ways to run extra SQL"',
            right: 'Part 05 and Part 06 draw the real distinction: a hook is tied to a model\'s build lifecycle or a full invocation and fires automatically every time; run-operation invokes a standalone macro on demand, independent of any model build, and only runs when a human explicitly triggers it from the CLI.',
          },
          {
            wrong: '"Incremental models need the same grant post-hook urgency as table models, for the same reason"',
            right: 'Part 04 shows this is more nuanced: a steady-state incremental run inserts or merges into the existing object rather than dropping it, so grants generally survive untouched — the grant post-hook mainly matters for incremental models when a --full-refresh run rebuilds the table from scratch, which behaves like a normal table materialization.',
          },
          {
            wrong: '"on-run-start and on-run-end are configured the same way as pre-hook and post-hook, inside a model\'s config() block"',
            right: 'Part 02 is explicit that on-run-start and on-run-end are project-wide, configured once at the top level of dbt_project.yml, because they fire exactly once per whole invocation rather than per model — they have no natural home inside an individual model file\'s config() at all.',
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
        <SectionTitle>What This Looks Like on Day One</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>At Sonos:</strong> the analytics team gets a recurring complaint every few weeks — a
            product dashboard in the BI tool intermittently fails with a permission error, always right
            after the overnight dbt job runs, and always on a table that was working fine the day before.
            Nobody had touched permissions manually. Per Part 03, the root cause turns out to be exactly the{' '}
            <code>CREATE OR REPLACE TABLE</code> mechanism — the nightly rebuild was silently dropping the
            BI service account's grant every single run. Adding a project-wide{' '}
            <code>post_hook</code> re-granting SELECT on every mart model, per Part 02's directory-level
            config pattern, ends the recurring incident permanently rather than requiring someone to manually
            re-grant it each time it happens.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Angi:</strong> a new data analyst role is created for a contractor team that needs
            read access to two years of historical marketing mart tables that already exist and are not
            rebuilt often. Rather than adding a permanent hook that would re-grant this role on every future
            run of models that mostly don't change, the platform engineer writes a small{' '}
            <code>grant_select</code> macro per Part 05 and runs it once via{' '}
            <code>dbt run-operation grant_select --args {"'{role: contractor_reporting}'"}</code> to catch
            the new role up immediately — a one-time backfill action, not a recurring hook.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para>
            <strong>At Root Insurance:</strong> during a project audit, an engineer notices an{' '}
            <code>on-run-end</code> hook in <code>dbt_project.yml</code> that inserts a row into an audit log
            table on every single invocation, including ones triggered by individual developers testing a
            single model locally with <code>dbt run --select my_model</code>. Per Part 06's decision
            framework, the team decides this genuinely does need to fire on every invocation — the audit log
            is meant to capture every build event, local or scheduled — so the hook stays as-is; it is
            deliberately not a run-operation, because relying on a human to manually log every local test run
            would defeat the purpose of an audit trail.
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
            q: 'Q1. Why does a BI tool sometimes lose access to a dbt-built table right after a scheduled dbt run, with nobody having touched permissions manually?',
            a: `Per Part 03, this is a mechanical consequence of how table (and view) materializations rebuild: dbt executes a fresh CREATE OR REPLACE on every run, and on many warehouses that statement drops the previous object entirely and creates a new one under the same name. A grant issued against the old object doesn't carry forward to the new one, even though the name is identical, because the warehouse's permission system tracks grants against the specific object, not the name.

The fix, covered in the same Part, is a post-hook configured on the model (or project-wide via dbt_project.yml, per Part 02) that re-issues the grant every single time the model builds, using {{ this }} to reference whatever the model actually compiles to. This closes the gap within the same dbt invocation that rebuilt the table, so the BI tool never experiences a real, ongoing outage — worst case, it fails momentarily mid-run.`,
          },
          {
            q: 'Q2. Walk through the difference between the four hook types dbt supports, and where each is configured.',
            a: `Per Part 02, pre-hook and post-hook are model-scoped: they fire immediately before or after one specific model's build statement, and are configured either inline in that model's config() block or, for many models at once, under a directory path in dbt_project.yml's models: block.

on-run-start and on-run-end are invocation-scoped rather than model-scoped: they fire exactly once per dbt run or dbt build invocation, regardless of how many models that invocation touches, and are therefore configured once, project-wide, at the top level of dbt_project.yml rather than inside any individual model file. on-run-start fires before the first model in the invocation starts building; on-run-end fires after every model has finished, success or failure.`,
          },
          {
            q: 'Q3. When would you use run-operation instead of a hook, and give a concrete example.',
            a: `Per Part 05 and Part 06, the deciding factor is whether the action needs to happen automatically, every time, or only once, on demand. A hook is permanent configuration tied to a model or invocation and fires every time that model or invocation runs. run-operation invokes a standalone macro directly from the CLI, independent of any model build, and only runs when a human explicitly triggers it.

A concrete example: catching a newly created role up on SELECT access to tables that already exist and rarely rebuild. This is a one-time backfill, not a recurring need, so it's a poor fit for a permanent post-hook that would re-run on every future build forever — instead, it's a standalone grant_select macro invoked once via dbt run-operation grant_select --args '{role: new_role}'.`,
          },
          {
            q: 'Q4. Does an incremental model need the same grant post-hook as a table model? Explain the nuance.',
            a: `Per Part 04, it's more nuanced than a blanket yes. A steady-state incremental run — the normal case after the model's first build — inserts or merges new rows into the existing table object rather than dropping and recreating it, so previously issued grants generally survive those runs untouched, unlike a full table rebuild.

Where the same risk reappears is a --full-refresh run, which deliberately rebuilds an incremental model from scratch and behaves exactly like a table materialization's normal CREATE OR REPLACE. Because a full-refresh can happen at any time — after a schema change, for instance — the pragmatic answer is to leave the post-hook attached to incremental models anyway: it's a harmless, cheap no-op-equivalent re-grant on normal incremental runs, and it protects the specific occasion a full refresh actually does drop the table.`,
          },
          {
            q: 'Q5. What is {{ this }} inside a hook, and why does using it matter more than hardcoding a table name?',
            a: `{{ this }} is a Jinja variable, available inside a model's own hooks, that resolves to that specific model's fully qualified, compiled table name — whatever object this exact model produces, in whichever environment (dev, staging, prod) the current run's target actually points at.

Per Part 03, using {{ this }} instead of hardcoding a schema and table name directly into the hook string is what makes the hook durable across environments and renames: the same model file can run against a developer's own dev schema or the shared prod schema, and the hook always grants against the correct object either way. A hardcoded name would either grant against the wrong schema entirely in a non-prod run, or silently stop matching anything the moment the model file is renamed — exactly the kind of stale reference models-basics warns about with renamed model files in general.`,
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
        <SectionTitle>The Mistakes That Make Hooks Unreliable</SectionTitle>
        {[
          {
            q: 'Granting permissions manually, once, after building a mart table, instead of via a post-hook',
            a: 'Per Part 03, this works exactly until the next scheduled dbt run rebuilds the table, at which point the manual grant is silently gone — the fix has to be automatic and tied to every future build, not a one-time manual action.',
          },
          {
            q: 'Hardcoding a schema and table name inside a hook instead of using {{ this }}',
            a: 'Part 03 and the Q5 interview answer both cover why this breaks across environments and renames — {{ this }} always resolves to the current model\'s own actual compiled name, in whatever target the run is using.',
          },
          {
            q: 'Wiring a one-off maintenance action in as a permanent hook instead of a run-operation',
            a: 'Per Part 06, a hook that only ever needed to run once keeps re-executing on every future run forever, wasting warehouse compute at best and risking non-idempotent side effects at worst. A genuinely one-time action belongs behind a manually invoked run-operation.',
          },
          {
            q: 'Forgetting that on-run-start and on-run-end are project-wide, not per-model',
            a: 'Per Part 02, trying to put these inside a single model\'s config() block is a category error — they belong at the top level of dbt_project.yml because they fire once per whole invocation, not once per model.',
          },
          {
            q: 'Assuming an incremental model never needs a grant post-hook because it doesn\'t rebuild fully',
            a: 'Part 04 shows this is only true for steady-state runs — a --full-refresh on that same incremental model rebuilds it exactly like a table materialization and will wipe grants the same way, so the post-hook is still worth keeping attached.',
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
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>
        {[
          {
            error: `A BI dashboard suddenly fails with "insufficient privileges" immediately after a scheduled dbt job, with no permissions changed by anyone`,
            cause: 'Per Part 03, the model\'s table materialization ran a fresh CREATE OR REPLACE TABLE, which dropped the previous object and its grants along with it, and no post-hook was configured to re-grant access on the new object.',
            fix: 'Add a post_hook re-granting SELECT to the affected role, using {{ this }}, either on the specific model or project-wide at the marts/ directory level in dbt_project.yml so every mart model is protected the same way.',
          },
          {
            error: `Compilation error referencing an undefined variable inside a post-hook string, e.g. "this" is undefined`,
            cause: 'The hook was written outside of a model\'s own config() block — for example pasted into dbt_project.yml under a directory-level +post_hook config where a stray discrepancy in quoting broke the Jinja, or the hook was mistakenly attached somewhere {{ this }} has no model context to resolve against, such as inside an on-run-end hook, which is not tied to any single model.',
            fix: 'Confirm the hook using {{ this }} is attached to a specific model, via that model\'s config() or a models: path in dbt_project.yml — not an on-run-start or on-run-end hook, which fire once per invocation and have no single "this" model to resolve.',
          },
          {
            error: `run-operation fails with "Encountered an error while running operation: 'grant_select' is undefined"`,
            cause: 'The macro name passed to run-operation does not exactly match a {% macro %} block\'s declared name anywhere in the project\'s macros/ directory — often a typo, or the macro file exists but was never actually saved with the matching macro name inside it.',
            fix: 'Search macros/ for the exact {% macro grant_select(...) %} declaration and confirm the name passed on the CLI matches character-for-character, including case.',
          },
          {
            error: `dbt build fails partway through with a hook's SQL erroring, e.g. "role BI_READER does not exist"`,
            cause: 'A post-hook grants to a role name that doesn\'t exist in the target environment — commonly because the hook was written and tested against production, where the role exists, but the same hook also runs unconditionally against a developer\'s local dev target, where that role was never created.',
            fix: 'Either create the referenced role in every environment the hook runs against, or make the hook conditional on target.name (per Part 04\'s example), so it only attempts the grant in environments where the role is guaranteed to exist.',
          },
          {
            error: `An on-run-end hook meant to log a "successful run" timestamp writes a row even when models in the run actually failed`,
            cause: 'on-run-end fires unconditionally after every invocation finishes, success or failure, per Part 02 — the hook\'s SQL itself didn\'t check the run\'s actual outcome before writing its log row.',
            fix: 'Use the results Jinja variable available inside on-run-end hooks to check whether every model actually succeeded before writing the "last successful run" row, rather than assuming the hook firing at all means the run was clean.',
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
          'A hook is SQL configured to run automatically at a specific point around a model\'s build (pre-hook, post-hook) or around a whole invocation (on-run-start, on-run-end) — it fires every time, with no manual step required.',
          'The single most common real hook use case is a post-hook re-granting SELECT to a BI role after every table rebuild, because CREATE OR REPLACE TABLE drops and recreates the object on many warehouses, taking previously issued grants with it.',
          'Using {{ this }} inside a hook, rather than a hardcoded schema and table name, is what makes the hook resolve correctly across environments and survive model renames.',
          'run-operation invokes a standalone macro directly from the CLI, independent of any model build — the right tool for a one-off maintenance action, not something that needs to happen automatically every run.',
          'The decision between a hook and a run-operation comes down to one question: does this need to happen automatically every single time, or only once, on demand — the former is a hook, the latter is a run-operation.',
          'Incremental models mostly avoid the grant-loss problem on steady-state runs (they insert/merge rather than rebuild), but a --full-refresh run behaves like a full table rebuild and still needs the post-hook to fire.',
        ]}
      />
    </LearnLayout>
  )
}
