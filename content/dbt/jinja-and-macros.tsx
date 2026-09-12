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

export default function JinjaAndMacros() {
  return (
    <LearnLayout
      title="Jinja and Macros: Templating SQL"
      description="What Jinja is and why dbt uses it, control flow inside a model with if and for, writing reusable macros, a worked cents_to_dollars macro and the generate_schema_name override, whitespace control, debugging with dbt compile, and the anti-pattern of over-templated SQL."
      section="dbt — Module 10"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'Jinja and Macros: Templating SQL', href: '/learn/dbt/jinja-and-macros' },
      ]}
      prev={{ title: 'Documentation: Descriptions, Doc Blocks, and dbt Docs', href: '/learn/dbt/documentation' }}
      next={{ title: 'Packages and dbt_utils', href: '/learn/dbt/packages' }}
    >
      {/* ── Part 01 — What Jinja is ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What Jinja Actually Is" />
        <SectionTitle>A Templating Language Living Inside Your SQL Files</SectionTitle>

        <Para>
          Every <code>.sql</code> file in a dbt project is not plain SQL. It is a template written in
          <strong> Jinja</strong>, a general-purpose Python templating language, and dbt's job before ever
          sending anything to your warehouse is to <em>compile</em> that template down into ordinary SQL.
          You have already been using Jinja since the first model you wrote — <code>{'{{ ref(\'stg_orders\') }}'}</code>
          is Jinja. <code>{'{{ source(\'shopify\', \'orders\') }}'}</code> is Jinja. Every one of those calls is a
          Jinja expression that dbt evaluates at compile time and replaces with a literal string before your
          warehouse ever sees the file.
        </Para>

        <Para>
          Jinja gives you two kinds of syntax inside a SQL file. <code>{'{{ }}'}</code> (double curly braces)
          wraps an <strong>expression</strong> — something that evaluates to a value and gets substituted
          directly into the compiled SQL, like <code>{'{{ ref(\'stg_orders\') }}'}</code> becoming
          <code>analytics.stg_orders</code>. <code>{'{% %}'}</code> (curly brace plus percent) wraps a
          <strong> statement</strong> — control flow like <code>if</code>, <code>for</code>, macro
          definitions, and set assignments, none of which produce output directly but which control what
          Jinja generates around them.
        </Para>

        <HighlightBox>
          <Para>
            <strong>The one-sentence mental model:</strong> a dbt model is a program that writes SQL, not
            SQL itself. Jinja is the programming language, and the SQL that comes out the other end — after
            dbt resolves every <code>{'{{ }}'}</code> and executes every <code>{'{% %}'}</code> block — is
            just the output of running that program once, at compile time, for whatever target and variables
            are active for that run.
          </Para>
        </HighlightBox>

        <Para>
          Why bother with any of this instead of writing static SQL directly? Because static SQL cannot
          express things that depend on runtime context — which environment you're building for, what values
          exist in a list, how many columns a table has, or logic that would otherwise have to be
          copy-pasted nearly identically across dozens of models. Jinja turns SQL from a fixed string into
          something that can be generated dynamically, branch on conditions, loop over data, and be reused
          as a callable unit — the same reasons any other codebase reaches for a real programming language
          instead of only ever hardcoding literal values.
        </Para>

        <CodeBox label="The same model, before and after dbt compiles it">
{`-- Written in the model file (Jinja source):
select
    order_id,
    customer_id,
    total_amount
from {{ ref('stg_orders') }}
where order_date >= '{{ var("start_date") }}'

-- What dbt actually sends to the warehouse (compiled SQL), with
-- start_date set to '2026-01-01' in dbt_project.yml or --vars:
select
    order_id,
    customer_id,
    total_amount
from analytics.stg_orders
where order_date >= '2026-01-01'`}
        </CodeBox>

        <Para>
          Nothing about this compiled output is special or magical — it is exactly the SQL you would have
          written by hand if you already knew the target schema name and the exact date to filter on. Jinja
          is only doing the work of filling those specifics in for you, from context dbt already knows,
          instead of you hardcoding them and having to edit the file by hand every time either one changes.
        </Para>

        <Table
          headers={['Syntax', 'Name', 'What it does']}
          rows={[
            ['{{ expression }}', 'Expression / output block', 'Evaluates to a value and is substituted directly into the compiled SQL.'],
            ['{% statement %}', 'Statement / control block', 'Runs control flow — if, for, macro definitions, set — that produces no output of its own but shapes what surrounds it.'],
            ['{# comment #}', 'Jinja comment', 'Removed entirely at compile time — never appears in the compiled SQL, unlike a SQL -- comment which does.'],
          ]}
        />

        <Callout title="Every dbt model already runs through Jinja, whether or not it uses any macros" color={K}>
          Even a model containing zero Jinja syntax of its own still gets compiled — dbt's compilation step
          runs unconditionally on every model, it just happens to have nothing to resolve when a file
          contains no <code>{'{{ }}'}</code> or <code>{'{% %}'}</code> blocks at all. This is worth knowing
          because it means reaching for Jinja is never an opt-in step that changes how a model is processed
          — it is always available, and a plain SQL file is simply the trivial case of a Jinja template with
          no dynamic content in it.
        </Callout>

        <Callout title="Jinja comments vs SQL comments are not the same thing" color={K}>
          A <code>{'{# ... #}'}</code> block is stripped out during compilation and never reaches the
          warehouse at all — useful for notes to future maintainers about the Jinja logic itself. A plain SQL
          <code>-- comment</code> survives compilation and shows up in the compiled file dbt actually runs,
          which is where a comment explaining the resulting query, rather than the templating logic that
          produced it, belongs.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 — if control flow ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Conditional Logic with {% if %}" />
        <SectionTitle>Branching a Model's SQL Based on Runtime Context</SectionTitle>

        <Para>
          <code>{'{% if %}'}</code> lets a model's compiled SQL differ depending on a condition evaluated at
          compile time — most commonly which environment dbt is running against, or a variable passed in
          from the command line. The most frequent real use is limiting how much data a development run
          processes, so an engineer iterating on a model locally isn't scanning a multi-terabyte production
          table on every save.
        </Para>

        <CodeBox label="models/staging/stg_events.sql — a conditional WHERE clause by environment">
{`select
    event_id,
    user_id,
    event_type,
    event_timestamp
from {{ source('app', 'events') }}

{% if target.name == 'dev' %}
-- only scan the last 3 days of data in development, to keep
-- local iteration fast and cheap
where event_timestamp >= dateadd('day', -3, current_date)
{% endif %}`}
        </CodeBox>

        <Para>
          <code>target</code> is a Jinja object dbt exposes automatically, describing the currently active
          connection profile — <code>target.name</code> is the profile target name (<code>dev</code>,
          <code>prod</code>, whatever your <code>profiles.yml</code> defines), and it is available in every
          model without any setup. Compiled against a <code>dev</code> target, the <code>where</code> clause
          appears in the output; compiled against <code>prod</code>, the whole block, condition and all,
          simply disappears from the compiled SQL — not commented out, genuinely absent.
        </Para>

        <CodeBox label="What this compiles to under each target">
{`-- target.name == 'dev' compiles to:
select
    event_id,
    user_id,
    event_type,
    event_timestamp
from raw.app.events
where event_timestamp >= dateadd('day', -3, current_date)

-- target.name == 'prod' compiles to:
select
    event_id,
    user_id,
    event_type,
    event_timestamp
from raw.app.events
-- no WHERE clause at all -- the {% if %} block produced zero output`}
        </CodeBox>

        <Para>
          A second common pattern is branching on a variable passed with <code>--vars</code> at the command
          line, which is how a single model can support an ad hoc backfill mode without needing a second,
          nearly-duplicate model file.
        </Para>

        <CodeBox label="Branching on a --vars flag for an ad hoc full-history backfill">
{`{{ config(materialized='incremental') }}

select
    order_id,
    customer_id,
    total_amount,
    updated_at
from {{ ref('stg_orders') }}

{% if is_incremental() and not var('full_refresh_backfill', false) %}
where updated_at > (select max(updated_at) from {{ this }})
{% endif %}`}
        </CodeBox>

        <CodeBox label="Running the model normally vs triggering the backfill branch">
{`# normal incremental run -- only new/updated rows since the last run
dbt run --select fct_orders

# ad hoc full-history backfill -- var() makes the WHERE clause disappear
dbt run --select fct_orders --full-refresh --vars '{"full_refresh_backfill": true}'`}
        </CodeBox>

        <Para>
          <code>var('full_refresh_backfill', false)</code> reads a variable named
          <code>full_refresh_backfill</code> if one was passed with <code>--vars</code>, and falls back to
          <code>false</code> if it wasn't — the second argument to <code>var()</code> is always a default,
          which matters because a model referencing a variable nobody ever passes should not fail to compile
          entirely; it should fall back to sensible default behavior.
        </Para>

        <Callout title="if/else/elif work exactly as they read" color={K}>
          Jinja's conditional syntax mirrors Python almost exactly: <code>{'{% if condition %}'}</code>,
          optional <code>{'{% elif other_condition %}'}</code> branches, an optional <code>{'{% else %}'}</code>,
          and a closing <code>{'{% endif %}'}</code>. There is no special dbt-specific conditional syntax to
          learn beyond the objects and functions (<code>target</code>, <code>var()</code>,
          <code>is_incremental()</code>) that dbt exposes for the condition itself to reference.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 — for loops ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Generating Repetitive SQL with {% for %}" />
        <SectionTitle>Looping Over a List to Generate a CASE WHEN or a Column List</SectionTitle>

        <Para>
          <code>{'{% for %}'}</code> loops over a Jinja list and repeats the SQL inside the loop body once
          per item, substituting the loop variable each time. The single most common real use is generating
          a <code>CASE WHEN</code> expression from a list of values instead of typing out one
          <code>when</code> line per value by hand — useful the moment that list is long, or likely to grow,
          or already defined once elsewhere and worth reusing rather than retyping.
        </Para>

        <CodeBox label="models/marts/fct_orders.sql — generating a CASE WHEN from a Jinja list">
{`{% set regions = ['northeast', 'southeast', 'midwest', 'southwest', 'west'] %}

select
    order_id,
    state_code,
    case
    {% for region in regions %}
        when state_code in (select state_code from {{ ref('dim_state_regions') }} where region = '{{ region }}')
            then '{{ region }}'
    {% endfor %}
        else 'unknown'
    end as order_region
from {{ ref('stg_orders') }}`}
        </CodeBox>

        <CodeBox label="What the for loop compiles to, for the five regions above">
{`select
    order_id,
    state_code,
    case
        when state_code in (select state_code from analytics.dim_state_regions where region = 'northeast')
            then 'northeast'
        when state_code in (select state_code from analytics.dim_state_regions where region = 'southeast')
            then 'southeast'
        when state_code in (select state_code from analytics.dim_state_regions where region = 'midwest')
            then 'midwest'
        when state_code in (select state_code from analytics.dim_state_regions where region = 'southwest')
            then 'southwest'
        when state_code in (select state_code from analytics.dim_state_regions where region = 'west')
            then 'west'
        else 'unknown'
    end as order_region
from analytics.stg_orders`}
        </CodeBox>

        <Para>
          Notice what changed and what didn't: adding a sixth region to the <code>regions</code> list adds a
          sixth <code>when</code> clause to the compiled output automatically, with zero changes to the SQL
          structure around the loop. Without the loop, adding a region means manually writing one more
          <code>when</code> line, in the right place, with the right syntax, every single time — a small task
          that becomes a real source of copy-paste bugs across a dozen models that all need the same list.
        </Para>

        <SubTitle>{'{% set %}'} — assigning a Jinja variable inside a model</SubTitle>

        <Para>
          <code>{'{% set name = value %}'}</code> assigns a Jinja variable, scoped to the file (or the macro)
          it's declared in. It is how the <code>regions</code> list above got defined before the loop used
          it, and it works for any Jinja value — a list, a string, a number, or the result of another Jinja
          expression.
        </Para>

        <CodeBox label="A second for-loop pattern: generating a pivoted column list">
{`{% set payment_methods = ['credit_card', 'paypal', 'gift_card', 'store_credit'] %}

select
    order_id,
    {% for method in payment_methods %}
    sum(case when payment_method = '{{ method }}' then amount_cents else 0 end) as {{ method }}_amount_cents{{ ',' if not loop.last }}
    {% endfor %}
from {{ ref('stg_payments') }}
group by order_id`}
        </CodeBox>

        <Para>
          <code>loop.last</code> is a Jinja loop variable available inside any <code>{'{% for %}'}</code>
          block, true only on the final iteration — used here specifically to avoid a trailing comma after
          the last generated column, which would otherwise be a SQL syntax error. Jinja also exposes
          <code>loop.first</code>, <code>loop.index</code> (1-based position), and <code>loop.index0</code>
          (0-based position), all useful for the same kind of "generate valid SQL punctuation around a
          repeated block" problem.
        </Para>

        <Table
          headers={['Loop variable', 'What it gives you']}
          rows={[
            ['loop.index', 'The current iteration\'s 1-based position (1, 2, 3, ...).'],
            ['loop.index0', 'The current iteration\'s 0-based position (0, 1, 2, ...).'],
            ['loop.first', 'True only on the first iteration — useful for omitting a leading comma or AND.'],
            ['loop.last', 'True only on the final iteration — useful for omitting a trailing comma.'],
          ]}
        />

        <Callout title="A generated list still has to be valid SQL once compiled" color={K}>
          It is easy to write a Jinja loop that compiles cleanly for one input list and breaks the moment
          the list changes shape — an empty list, a list with one item, or a value containing a character
          that breaks a naive string interpolation. Running <code>dbt compile</code> (Part 06) after changing
          anything that feeds a loop is the reliable way to catch this before it becomes a runtime SQL error.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 — Macros ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Macros: Reusable Jinja Functions" />
        <SectionTitle>A Macro Is a Function That Returns SQL</SectionTitle>

        <Para>
          Everything in Parts 02 and 03 lived inside one model file — useful, but not reusable across other
          models without copy-pasting the same Jinja. A <strong>macro</strong> is dbt's answer to that: a
          named, reusable block of Jinja, defined once in a <code>.sql</code> file inside the
          <code>macros/</code> directory using <code>{'{% macro name(args) %}'}</code> ...
          <code>{'{% endmacro %}'}</code>, and callable from any model, any test, or any other macro via
          <code>{'{{ name(args) }}'}</code> — the exact same mechanism you've already been using with
          <code>ref()</code> and <code>source()</code>, both of which are themselves macros, just ones dbt
          ships with rather than ones you write.
        </Para>

        <CodeBox label="macros/cents_to_dollars.sql — a small, widely reused macro">
{`{% macro cents_to_dollars(column_name, decimal_places=2) %}
    round({{ column_name }} / 100.0, {{ decimal_places }})
{% endmacro %}`}
        </CodeBox>

        <Para>
          This macro takes a column name and an optional number of decimal places (defaulting to 2 if the
          caller doesn't specify one), and returns the Jinja text that, once compiled, divides that column by
          100 and rounds it — the standard conversion for a monetary amount stored as an integer number of
          cents, which is itself a common practice specifically because integer cents avoid the floating-
          point rounding errors that storing dollar amounts as a decimal can introduce.
        </Para>

        <CodeBox label="Calling cents_to_dollars from three different financial models">
{`-- models/marts/fct_orders.sql
select
    order_id,
    order_total_cents,
    {{ cents_to_dollars('order_total_cents') }} as order_total_dollars
from {{ ref('stg_orders') }}

-- models/marts/fct_refunds.sql
select
    refund_id,
    refund_amount_cents,
    {{ cents_to_dollars('refund_amount_cents') }} as refund_amount_dollars
from {{ ref('stg_refunds') }}

-- models/marts/fct_payouts.sql -- overriding the default decimal_places
select
    payout_id,
    payout_amount_cents,
    {{ cents_to_dollars('payout_amount_cents', 4) }} as payout_amount_dollars
from {{ ref('stg_payouts') }}`}
        </CodeBox>

        <CodeBox label="What each call compiles to">
{`-- fct_orders.sql compiles to:
select
    order_id,
    order_total_cents,
    round(order_total_cents / 100.0, 2) as order_total_dollars
from analytics.stg_orders

-- fct_payouts.sql compiles to (decimal_places=4 overriding the default):
select
    payout_id,
    payout_amount_cents,
    round(payout_amount_cents / 100.0, 4) as payout_amount_dollars
from analytics.stg_payouts`}
        </CodeBox>

        <Para>
          This is the entire payoff of a macro, stated plainly: the cents-to-dollars conversion logic exists
          in exactly one place. If the business ever needs to change how that conversion works — switching to
          banker's rounding, say, or adding a currency-aware divisor for a model with non-USD amounts — that
          change happens once, in <code>macros/cents_to_dollars.sql</code>, and every model calling the macro
          picks up the new behavior automatically the next time it's compiled. Without the macro, the same
          fix means finding and editing every model that independently wrote out its own
          <code>round(column / 100.0, 2)</code> expression, with no guarantee every copy was found.
        </Para>

        <Table
          headers={['', 'Copy-pasted SQL logic', 'A macro']}
          rows={[
            ['Defined', 'Independently, in every model that needs it', 'Once, in macros/, callable everywhere'],
            ['A bug fix or logic change', 'Must be found and applied in every copy — easy to miss one', 'Applied in one file; every caller picks it up on next compile'],
            ['Readability at the call site', 'The full logic is visible inline, for better or worse', 'A short, named call — the logic itself lives one file away'],
            ['Best fit', 'A genuinely one-off expression used in exactly one model', 'Logic reused across two or more models, or complex enough to name and hide behind an abstraction'],
          ]}
        />

        <SubTitle>Macros can take multiple parameters, including ones with defaults</SubTitle>

        <Para>
          <code>cents_to_dollars(column_name, decimal_places=2)</code> already showed a default parameter
          value — any macro argument can have one, using ordinary Jinja/Python-style
          <code>parameter=default</code> syntax, and callers can omit it entirely (falling back to the
          default) or override it positionally or by name, exactly like a function call in most general-
          purpose languages.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 — generate_schema_name override ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — A Real dbt Macro Override: generate_schema_name" />
        <SectionTitle>Controlling How dbt Names Custom Schemas</SectionTitle>

        <Para>
          dbt ships with a number of macros that control its own internal behavior, and one of the most
          commonly customized is <code>generate_schema_name</code> — the macro dbt calls to decide the
          actual schema a model materializes into, whenever that model's config sets a custom
          <code>schema:</code> value. Understanding it is a genuinely useful worked example of a macro doing
          real, structural work rather than just a small text-substitution helper.
        </Para>

        <Para>
          By default, when a model sets <code>{'{{ config(schema=\'marketing\') }}'}</code>, dbt does not
          simply build the model into a schema literally named <code>marketing</code>. It <em>concatenates</em>
          the target's configured schema with the custom schema name — for example
          <code>analytics_marketing</code> — specifically so that two different developers running the same
          project against their own personal dev schemas don't collide with each other or with production by
          all writing to one literal schema named <code>marketing</code> at once.
        </Para>

        <CodeBox label="dbt's built-in default behavior for generate_schema_name, roughly">
{`{% macro generate_schema_name(custom_schema_name, node) %}

    {%- set default_schema = target.schema -%}
    {%- if custom_schema_name is none -%}

        {{ default_schema }}

    {%- else -%}

        {{ default_schema }}_{{ custom_schema_name | trim }}

    {%- endif -%}

{% endmacro %}`}
        </CodeBox>

        <Para>
          Many teams find this default awkward in production — they want a model configured with
          <code>schema: marketing</code> to build into a schema literally called <code>marketing</code> in
          production, not <code>analytics_marketing</code>, while still keeping the concatenated,
          collision-safe behavior for developers' own dev environments. Because <code>generate_schema_name</code>
          is just a macro, it can be overridden by defining a macro with the exact same name in your own
          project's <code>macros/</code> directory — dbt uses your project's version instead of its built-in
          default the moment one exists.
        </Para>

        <CodeBox label="macros/generate_schema_name.sql — a common production override">
{`{% macro generate_schema_name(custom_schema_name, node) %}

    {%- set default_schema = target.schema -%}

    {%- if target.name == 'prod' and custom_schema_name is not none -%}

        {{ custom_schema_name | trim }}

    {%- elif custom_schema_name is none -%}

        {{ default_schema }}

    {%- else -%}

        {{ default_schema }}_{{ custom_schema_name | trim }}

    {%- endif -%}

{% endmacro %}`}
        </CodeBox>

        <Para>
          With this override in place, a model tagged <code>schema: marketing</code> builds into the schema
          literally named <code>marketing</code> when run against the <code>prod</code> target, but still
          falls back to the collision-safe <code>dev_alice_marketing</code>-style concatenation for any
          developer's own dev target — exactly the behavior most teams actually want, achieved entirely by
          overriding one built-in macro rather than by any special dbt configuration flag.
        </Para>

        <Callout title="Overriding a built-in macro is invisible unless you know to look for it" color="#38bdf8">
          A project-defined <code>generate_schema_name</code> can be easy to miss when reading a model in
          isolation, since nothing in the model itself signals that schema naming has been customized — the
          override lives entirely in <code>macros/</code>. This is a real reason to keep a project's macro
          overrides well documented (Part 09) and to check <code>macros/</code> for any file overriding a
          built-in macro name before assuming dbt's documented default schema-naming behavior is what a
          given project actually does.
        </Callout>

        <Callout title="This is one of a handful of dbt macros meant to be overridden" color={K}>
          <code>generate_schema_name</code>, along with its siblings <code>generate_database_name</code> and
          <code>generate_alias_name</code>, are deliberately designed as override points — dbt calls whichever
          version exists in your own project if one is defined, falling back to its built-in default
          otherwise. This is a genuinely useful pattern to recognize: dbt's own internal behavior is itself
          implemented as macros, which is exactly why a sufficiently motivated project can customize pieces
          of it without forking dbt itself.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 — dbt compile for debugging ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Debugging Jinja with dbt compile" />
        <SectionTitle>dbt compile: See the Actual SQL Before It Runs</SectionTitle>

        <Para>
          Every code example so far has shown a "compiles to" block, and that is not incidental — it is the
          single most useful habit for working with Jinja-heavy models. <code>dbt compile</code> resolves
          every <code>{'{{ }}'}</code> and executes every <code>{'{% %}'}</code> block in a model, exactly as
          <code>dbt run</code> would, but stops short of actually sending anything to the warehouse. The
          resulting plain SQL file is written to <code>target/compiled/&lt;project&gt;/models/.../model_name.sql</code>,
          fully resolved and readable.
        </Para>

        <CodeBox label="Compiling one model and inspecting the output">
{`$ dbt compile --select fct_orders

Running with dbt=1.8.0
Concurrency: 4 threads (target='dev')

Compiled node 'fct_orders' is:
  target/compiled/my_project/models/marts/fct_orders.sql`}
        </CodeBox>

        <Para>
          This single command answers the question that otherwise takes real guesswork to answer: "what SQL
          is this Jinja actually going to produce?" A <code>{'{% for %}'}</code> loop with an off-by-one
          comma, an <code>{'{% if %}'}</code> branch that silently evaluates the wrong way for a given
          target, a macro call passing arguments in the wrong order — every one of these is far easier to
          spot by reading the compiled SQL directly than by staring at the Jinja source trying to mentally
          simulate what it will produce, or worse, only discovering the problem when <code>dbt run</code>
          fails with a warehouse-level syntax error that points at a line number in the compiled file, not
          the Jinja file you actually edited.
        </Para>

        <CodeBox label="A concrete Jinja bug that dbt compile catches instantly">
{`-- The Jinja source (a subtle bug: trailing comma on the last column)
select
    order_id,
    {% for method in payment_methods %}
    sum(case when payment_method = '{{ method }}' then amount_cents else 0 end) as {{ method }}_amount_cents,
    {% endfor %}
from {{ ref('stg_payments') }}
group by order_id

-- dbt compile reveals the actual problem immediately:
select
    order_id,
    sum(case when payment_method = 'credit_card' then amount_cents else 0 end) as credit_card_amount_cents,
    sum(case when payment_method = 'paypal' then amount_cents else 0 end) as paypal_amount_cents,
    sum(case when payment_method = 'gift_card' then amount_cents else 0 end) as gift_card_amount_cents,
from analytics.stg_payments
group by order_id

-- the trailing comma before "from" is now plainly visible --
-- dbt run would have failed with a warehouse syntax error near "from",
-- but dbt compile shows exactly why, without ever touching the warehouse`}
        </CodeBox>

        <Para>
          <code>dbt compile</code> also compiles the whole project by default if run with no
          <code>--select</code> flag, which is useful for a final check before a deploy, but scoping it to
          one model with <code>--select</code> during active development keeps the feedback loop tight —
          compile the one model you're editing, read the output, adjust, repeat, without waiting on the rest
          of the project or spending a warehouse query on a model you already know has a Jinja problem.
        </Para>

        <Table
          headers={['Command', 'What it does', 'When to reach for it']}
          rows={[
            ['dbt compile', 'Resolves all Jinja, writes plain SQL to target/compiled/, sends nothing to the warehouse.', 'Debugging a Jinja/macro issue, or sanity-checking a model before running it.'],
            ['dbt compile --select model_name', 'Compiles just one model.', 'Fast iteration while actively editing that model\'s Jinja.'],
            ['dbt run', 'Compiles, then actually executes the compiled SQL against the warehouse.', 'Once you\'re confident the compiled SQL (checked via dbt compile) is correct.'],
          ]}
        />

        <Callout title="Compile early, compile often, especially around macros" color={K}>
          A model that only calls <code>ref()</code> and <code>source()</code> rarely needs this habit — the
          Jinja is simple enough to read directly. The moment a model uses a custom macro, a loop, or a
          conditional, compiling it before running it is the fastest way to build real confidence in what it
          does, and it costs nothing — no warehouse credits, no waiting on a query, just reading a plain SQL
          file dbt already generated for you.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 — Whitespace control ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Whitespace Control" />
        <SectionTitle>{'{%- -%}'} — Trimming the Blank Lines Jinja Leaves Behind</SectionTitle>

        <Para>
          Jinja's default behavior leaves the raw whitespace and newlines surrounding every
          <code>{'{% %}'}</code> tag exactly as written in the source file, even though those tags themselves
          produce no SQL output. Across a file with several control blocks, this reliably produces compiled
          SQL riddled with blank lines and stray indentation — cosmetically ugly, and genuinely harder to
          read when you're using <code>dbt compile</code> from Part 06 to debug something, since the noise
          makes the actual generated SQL harder to scan.
        </Para>

        <CodeBox label="Default whitespace behavior — extra blank lines in the compiled output">
{`select
    order_id
    {% if include_customer_name %}
    , customer_name
    {% endif %}
from {{ ref('stg_orders') }}

-- compiles to (note the blank lines where the tags used to be):
select
    order_id

    , customer_name

from analytics.stg_orders`}
        </CodeBox>

        <Para>
          Adding a hyphen to either side of a Jinja tag — <code>{'{%-'}</code> to trim whitespace before the
          tag, <code>{'-%}'}</code> to trim whitespace after it — tells Jinja to strip the surrounding
          whitespace at that spot rather than preserving it. This is purely cosmetic; it changes nothing
          about what the compiled SQL logically does, only how many blank lines and how much stray
          indentation surround it.
        </Para>

        <CodeBox label="The same block with whitespace control applied">
{`select
    order_id
    {%- if include_customer_name %}
    , customer_name
    {%- endif %}
from {{ ref('stg_orders') }}

-- compiles to, cleanly:
select
    order_id
    , customer_name
from analytics.stg_orders`}
        </CodeBox>

        <Para>
          The <code>generate_schema_name</code> override in Part 05 already used this throughout —
          <code>{'{%- set default_schema = target.schema -%}'}</code> and every <code>{'{%- if -%}'}</code> /
          <code>{'{%- elif -%}'}</code> / <code>{'{%- else -%}'}</code> / <code>{'{%- endif -%}'}</code> in
          that macro trims whitespace on both sides, which is exactly why that macro's compiled output is a
          single clean schema name with no stray blank lines or leading spaces mixed in — a real, practical
          concern there, since the macro's entire output gets used directly as a literal schema name in
          generated DDL.
        </Para>

        <Table
          headers={['Tag written as', 'Effect']}
          rows={[
            ['{% if x %}', 'No trimming — whitespace before and after the tag is preserved exactly as written.'],
            ['{%- if x %}', 'Trims whitespace immediately before the tag only.'],
            ['{% if x -%}', 'Trims whitespace immediately after the tag only.'],
            ['{%- if x -%}', 'Trims whitespace on both sides of the tag.'],
          ]}
        />

        <Callout title="Whitespace control is cosmetic, not a source of correctness bugs — mostly" color={K}>
          In the overwhelming majority of models, blank lines in compiled SQL are harmless — most warehouse
          SQL parsers don't care. The two situations worth actually using <code>{'{%- -%}'}</code> for are a
          macro whose entire output becomes a literal value used elsewhere (like a schema or column name,
          where stray whitespace could actually corrupt the value), and any file you're actively debugging
          via <code>dbt compile</code>, where readable output makes the debugging session faster.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 — Over-templating anti-pattern ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — The Over-Templating Anti-Pattern" />
        <SectionTitle>When Jinja Makes SQL Harder to Read, Not Easier</SectionTitle>

        <Para>
          Everything in this module is a genuine capability, and every capability can be overused. The
          specific failure mode worth naming directly: a model wrapped in so many nested loops, conditionals,
          and macro calls that a new team member opening the file cannot tell what SQL actually runs without
          mentally executing the Jinja first — effectively reverse-engineering a small interpreter by eye
          before they can even start reasoning about the business logic the model is supposed to express.
        </Para>

        <CodeBox label="An over-templated model — technically working, practically unreadable">
{`{% set metric_configs = get_metric_configs() %}
{% set dimensions = get_active_dimensions(exclude=['deprecated', 'internal']) %}

select
    {% for dim in dimensions %}
    {{ dim.column_expression }} as {{ dim.alias }}{{ ',' if not loop.last or metric_configs }}
    {% endfor %}
    {% for metric in metric_configs %}
    {% if metric.requires_dedup %}
    {{ dedup_aggregate(metric.column, metric.agg_type, metric.partition_keys) }} as {{ metric.alias }}{{ ',' if not loop.last }}
    {% else %}
    {{ metric.agg_type }}({{ metric.column }}) as {{ metric.alias }}{{ ',' if not loop.last }}
    {% endif %}
    {% endfor %}
from {{ get_source_model(metric_configs) }}
{% if should_apply_filters() %}
where {{ build_filter_clause() }}
{% endif %}
group by {{ generate_group_by_list(dimensions) }}`}
        </CodeBox>

        <Para>
          Nothing here is individually wrong — every construct is a legitimate feature from this module.
          Stacked together, though, none of the actual business logic is visible in the file at all: what
          columns this model produces, what it filters on, and how it aggregates are all deferred to other
          macros and functions the reader has to go find and read separately, several layers deep, before
          they know what this model actually does. Debugging it means running <code>dbt compile</code>
          (Part 06) just to find out what SQL exists at all — not as an optional best practice, but as the
          only realistic way to understand the file.
        </Para>

        <Table
          headers={['Signal', 'Healthy use of Jinja', 'Over-templating']}
          rows={[
            ['Can a new hire read the file directly?', 'Yes — the SQL structure is visible, with a handful of Jinja calls filling in specific values.', 'No — most of the actual logic lives in macros the reader has to chase down separately.'],
            ['What dbt compile is used for', 'Confirming a specific value or edge case compiles as expected.', 'The only way to find out what the model does at all.'],
            ['Number of macro layers to understand one model', 'Usually one or two — a config macro, maybe one shared calculation.', 'Several nested macros calling other macros, each hiding another layer of the real logic.'],
            ['Why the Jinja exists', 'Concretely reduces duplication that was actually observed across real models.', 'Templated preemptively, in case it might be reused someday, for logic that in practice appears in only one place.'],
          ]}
        />

        <Callout title="The test: could a competent SQL-only engineer read this file?" color="#ef4444">
          A useful gut check before adding another layer of Jinja: could someone who knows SQL well but has
          never seen this codebase's macros open this file and understand, in a couple of minutes, roughly
          what it produces? If the honest answer is "not without reading four other files first," that is a
          sign the templating has outgrown its actual justification — genuine, observed duplication across
          real models — and has started optimizing for a hypothetical future reuse at the direct cost of
          today's readability.
        </Callout>

        <Para>
          The practical fix is rarely "remove all Jinja" — it is usually "inline the SQL that is genuinely
          specific to this one model, and reserve macros for the pieces that are demonstrably reused
          elsewhere," the same discipline Part 04's <code>cents_to_dollars</code> example followed: one
          small, clearly named macro for one clearly reused calculation, called from ordinary, readable SQL
          around it — not a model whose entire structure is generated from configuration objects a reader
          has to trace through several files to reconstruct.
        </Para>
      </section>

      <Divider />

      {/* ── Part 09 — Documenting and organizing macros ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Documenting and Organizing Macros" />
        <SectionTitle>Macros Deserve the Same Documentation Discipline as Models</SectionTitle>

        <Para>
          A macro that grows past a couple of lines is exactly the kind of thing a future maintainer needs
          explained, and dbt supports documenting macro arguments the same way it supports documenting model
          columns — through <code>schema.yml</code>, using a dedicated <code>macros:</code> key. This is
          easy to skip specifically because a macro is not a model and doesn't show up in the same places a
          missing model description would, but an undocumented macro carries the exact same cost described in
          the documentation module: whoever calls it next either has to read the macro's Jinja source
          directly to understand its arguments, or guess.
        </Para>

        <CodeBox label="macros/schema.yml — documenting cents_to_dollars' arguments">
{`version: 2

macros:
  - name: cents_to_dollars
    description: >
      Converts an integer cents column into a rounded dollar amount.
      Used across every financial model that stores monetary values as
      integer cents to avoid floating-point rounding errors.
    arguments:
      - name: column_name
        type: string
        description: The column, as a string, holding the integer cents value to convert.
      - name: decimal_places
        type: integer
        description: How many decimal places to round the resulting dollar amount to. Defaults to 2.`}
        </CodeBox>

        <Para>
          This documentation shows up on the generated dbt docs site exactly like a model or column
          description would, and it is picked up automatically the next time <code>dbt docs generate</code>
          runs — no separate step, no separate tooling, just one more entry in the same YAML-driven
          documentation system covered in depth in the previous module.
        </Para>

        <SubTitle>Where macros live in a growing project</SubTitle>

        <Para>
          A small project can keep every macro directly in <code>macros/</code> with no further structure.
          Once a project accumulates more than a handful of macros, most teams organize them into
          subdirectories by purpose — a common convention is separating generic-test macros (from the
          testing module), utility macros like <code>cents_to_dollars</code>, and dbt-internal overrides like
          <code>generate_schema_name</code> into their own subfolders, purely for the benefit of a human
          browsing the project trying to find a specific macro quickly.
        </Para>

        <CodeBox label="A common macros/ organization convention in a larger project">
{`macros/
  utils/
    cents_to_dollars.sql
    pivot_column_list.sql
  overrides/
    generate_schema_name.sql
  tests/generic/
    test_positive_value.sql
    test_value_within_range.sql`}
        </CodeBox>

        <Para>
          None of this structure changes how a macro is called — <code>{'{{ cents_to_dollars(column) }}'}</code>
          works identically no matter which subdirectory the macro's file physically lives in, since dbt
          discovers macros by name across the entire <code>macros/</code> tree rather than by file path. The
          subdirectory structure exists purely for human navigability, the same reasoning that motivates
          organizing <code>models/</code> into <code>staging/</code>, <code>intermediate/</code>, and
          <code>marts/</code> even though dbt itself does not require any particular models directory
          layout to function correctly.
        </Para>

        <Callout title="A macro name still has to be unique across the whole project" color={K}>
          Unlike file paths, which can be nested arbitrarily for organization, a macro's callable name shares
          one flat namespace project-wide, the same way doc block names do (covered in the documentation
          module). Two macros named <code>cents_to_dollars</code> defined in two different subdirectories is
          a compile error, not a silent override — reorganizing macros into subfolders for readability never
          changes this underlying constraint.
        </Callout>

        <SubTitle>A short checklist for the moment you're about to write a new macro</SubTitle>

        <Para>
          Before adding a new macro, a quick set of questions mostly restates Part 04's DRY reasoning and
          Part 08's over-templating warning as a concrete pre-flight check, worth running through before the
          file is even created.
        </Para>

        <BulletList
          items={[
            'Does this logic actually appear, or is it about to appear, in two or more models — not just hypothetically someday?',
            'Would a competent SQL-only reader still understand the calling model\'s SQL with this logic replaced by a named macro call?',
            'Does the macro have a clear, specific name describing what it computes, not a vague one like helper or util?',
            'Are the macro\'s arguments documented in macros/schema.yml, especially any argument with a default value?',
            'If the macro will be called often, has it been checked with dbt compile against at least one real model to confirm the generated SQL is actually correct?',
          ]}
        />

        <Para>
          A macro that clears all five is doing exactly the job Part 04 describes: removing genuine
          duplication while staying readable at the call site. A macro that only clears the first
          question — "yes it's used twice" — but fails the second is worth a second look, since Part 08's
          entire warning is that reuse alone doesn't justify hiding logic behind an abstraction if the result
          is a model nobody can read without chasing the macro down first.
        </Para>
      </section>

      <Divider />

      {/* ── Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Jinja and Macros in dbt</SectionTitle>

        {[
          {
            wrong: '"Jinja is a dbt-specific templating syntax"',
            right: 'Jinja is a general-purpose Python templating language used well beyond dbt (Flask and Ansible both use it too). dbt did not invent it — dbt embeds it as the templating layer for SQL files, and exposes a handful of its own objects and functions (ref, source, var, target, is_incremental) for models to call inside that existing language (Part 01).',
          },
          {
            wrong: '"{{ }} and {% %} are interchangeable ways to write Jinja"',
            right: '{{ }} is for an expression that produces a value substituted into the compiled SQL. {% %} is for a statement — control flow like if, for, or a macro definition — that produces no output of its own. Using the wrong one is a compile error, not a stylistic choice (Part 01).',
          },
          {
            wrong: '"ref() and source() are special dbt syntax, unrelated to macros"',
            right: 'ref() and source() are themselves macros — the same {{ name(args) }} calling convention used for any custom macro in Part 04. They just happen to be built into dbt rather than defined in your own macros/ directory. Understanding this demystifies both: a custom macro is not a lesser version of ref(), it is the exact same mechanism.',
          },
          {
            wrong: '"A model wrapped in more Jinja logic is always a more maintainable model"',
            right: 'Templating pays off specifically when it removes genuine, observed duplication. Templating a model so heavily that its actual SQL logic is no longer visible without chasing several macro layers is a real anti-pattern (Part 08) — the goal is readable, correct SQL, not maximal use of Jinja\'s features for their own sake.',
          },
          {
            wrong: '"You have to trace through the Jinja source by eye to know what SQL a model will run"',
            right: 'dbt compile resolves every {{ }} and executes every {% %} block and writes the actual, plain SQL to target/compiled/ — reading that file directly is faster and more reliable than mentally simulating the template, and is the standard debugging habit for anything beyond a trivial model (Part 06).',
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
        <SectionTitle>Three Ways Jinja and Macros Show Up in Real dbt Projects</SectionTitle>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Squarespace — website builder, financial reporting models
          </div>
          <Para>
            Squarespace's finance data team has dozens of models reporting on subscription revenue, refunds,
            and payouts, every one of which stores raw amounts as integer cents to avoid floating-point
            rounding drift. Before a shared macro existed, six different models each wrote their own inline
            <code>round(amount_cents / 100.0, 2)</code> expression, and a rounding-precision fix requested by
            finance — moving from 2 to 4 decimal places for one specific payout report — required finding and
            editing all six independently, missing one on the first attempt.
          </Para>
          <Para>
            The team extracts a <code>cents_to_dollars(column_name, decimal_places=2)</code> macro, exactly
            like Part 04's worked example, and every model is updated to call it instead of writing the
            conversion inline. The next time a rounding change is needed, it happens in one file, and every
            calling model picks up the change automatically the next time it's built — no repeated find-and-
            fix exercise across the project.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Rippling — HR and payroll platform, schema naming discipline
          </div>
          <Para>
            Rippling's data platform team runs a large dbt project with dozens of developers, each building
            against their own personal dev schema. Early on, a handful of models configured with a custom
            <code>schema:</code> value built into production schemas with an inconsistent naming convention —
            some concatenated, some not — because different engineers had each patched dbt's default
            behavior locally in slightly different ways.
          </Para>
          <Para>
            The platform team standardizes this by writing one project-wide <code>generate_schema_name</code>
            override, exactly like Part 05's worked example — concatenated schemas in dev to avoid collisions
            between developers, literal schema names in production for a clean, predictable warehouse
            layout. Every model in the project now gets consistent schema naming for free, without any model
            author needing to think about it, because the override lives in exactly one macro file rather
            than being reimplemented ad hoc per model.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Gusto — payroll and benefits, catching a templating bug before it shipped
          </div>
          <Para>
            An engineer at Gusto adds a new payment method to a Jinja list feeding a pivoted
            <code>{'{% for %}'}</code> loop, similar to Part 03's worked example, generating one summed column
            per payment method. The change looks correct in the diff — one new line added to a list — but the
            new payment method's name happens to contain an apostrophe (a partner integration named
            something like "Store's Credit"), which breaks the naive string interpolation inside the loop's
            generated SQL string literal.
          </Para>
          <Para>
            Rather than discovering this from a warehouse-level syntax error during <code>dbt run</code>, the
            engineer runs <code>dbt compile --select</code> on just the affected model first, as a matter of
            habit before opening a pull request, and immediately sees the malformed SQL string in the
            compiled output — catching and fixing the escaping issue in the same sitting, well before it ever
            reached a shared branch or a scheduled production run.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        <Para>
          These five questions cover the ground an interviewer actually probes when checking real dbt
          fluency around templating: not whether you can recite Jinja syntax, but whether you understand
          what dbt is doing with it at compile time, and where the line sits between reasonable reuse and
          an over-engineered model.
        </Para>

        {[
          {
            q: 'What is Jinja\'s role in a dbt project, and what is the practical relationship between a model\'s .sql file and the SQL that actually gets sent to the warehouse?',
            a: 'Every dbt model file is a Jinja template, not raw SQL. dbt compiles it — resolving every {{ expression }} and executing every {% statement %} — into plain SQL before ever running it against the warehouse (Part 01). ref() and source(), which look like special dbt syntax, are actually ordinary Jinja macro calls dbt ships built in. This is why dbt compile (Part 06) is such a reliable debugging tool: it shows you exactly what the templating layer produced, with zero ambiguity about what will actually execute.',
          },
          {
            q: 'Walk through how a {% for %} loop over a Jinja list changes what happens when that list is extended, compared to hand-written repetitive SQL.',
            a: 'A {% for %} loop repeats its body once per item in the list at compile time, substituting the loop variable each iteration (Part 03) — for example generating one CASE WHEN clause per region, or one summed column per payment method. Adding an item to the underlying list (a {% set %} variable, or one fed from a macro) automatically produces one more repetition in the compiled output on the next build, with zero changes needed to the surrounding SQL structure. Hand-written repetitive SQL requires manually adding the new clause in the right place with the right syntax every time the underlying list changes, which is exactly the kind of copy-paste risk loops eliminate.',
          },
          {
            q: 'What is a macro, mechanically, and why does the cents_to_dollars example matter beyond just "don\'t repeat yourself"?',
            a: 'A macro is a named, reusable block of Jinja defined once via {% macro name(args) %}...{% endmacro %} in macros/, callable from any model via {{ name(args) }} (Part 04). cents_to_dollars(column_name, decimal_places=2) demonstrates the real payoff: when six financial models each inline their own round(amount / 100.0, 2) expression, a rounding-precision change requires finding and editing every copy correctly. Extracting the logic into one macro means the fix happens once, and every calling model picks up the new behavior the next time it compiles — the same reasoning that motivates extracting a repeated function in any other codebase, applied to SQL generation.',
          },
          {
            q: 'Explain what generate_schema_name does and why it is a useful example of dbt\'s own internal behavior being customizable.',
            a: 'generate_schema_name is the macro dbt calls to decide the actual schema a model builds into whenever its config sets a custom schema: value — by default it concatenates the target\'s configured schema with the custom name (e.g. analytics_marketing) to prevent collisions between developers\' own dev environments (Part 05). Because it is just a macro, not a hardcoded internal behavior, a project can override it by defining a macro with the exact same name in its own macros/ directory — dbt calls the project\'s version instead of its built-in default the moment one exists. This is a good illustration that dbt\'s own behavior is implemented in the same macro system available to any project, which is why several of dbt\'s own generation macros (generate_schema_name, generate_database_name, generate_alias_name) are specifically designed as override points.',
          },
          {
            q: 'What is the over-templating anti-pattern, and how would you recognize it in a code review?',
            a: 'It is a model so wrapped in nested {% for %} loops, {% if %} branches, and layered macro calls that its actual SQL logic — what columns it produces, what it filters, how it aggregates — is no longer visible in the file itself, forcing a reader to trace through several other macro files just to reconstruct what the model does (Part 08). A useful review signal: could a competent SQL-only engineer, unfamiliar with this codebase\'s macros, read the file and understand roughly what it produces in a couple of minutes? If understanding the model requires running dbt compile just to find out what SQL exists at all — not as an optional debugging step, but as the only realistic way to know — that is a sign the templating has grown beyond genuine, observed duplication and started optimizing for hypothetical future reuse at real cost to today\'s readability.',
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
        <SectionTitle>Five Mistakes Engineers Make Writing Jinja and Macros</SectionTitle>

        {[
          {
            title: 'Copy-pasting the same Jinja logic into two or more models instead of extracting a macro',
            detail: 'The moment the same templating logic appears in a second model, it is a candidate for a macro (Part 04) — leaving it duplicated means a future fix has to be applied correctly in every copy, with no guarantee every one gets found.',
          },
          {
            title: 'Never running dbt compile before dbt run on a Jinja-heavy model',
            detail: 'A loop or conditional bug that would be immediately obvious in the compiled SQL instead surfaces as a warehouse-level syntax error during an actual run — harder to diagnose, and it costs a real query against the warehouse to discover (Part 06).',
          },
          {
            title: 'Templating a model preemptively, for reuse that hasn\'t actually happened yet',
            detail: 'Adding loops, conditionals, and macro calls for a hypothetical future need, rather than an observed, current duplication, trades away today\'s readability for a benefit that may never materialize (Part 08).',
          },
          {
            title: 'Forgetting that {% if %} blocks with no matching data produce zero output, not an empty but present clause',
            detail: 'A {% for %} loop over an empty list, or an {% if %} branch that evaluates false, doesn\'t leave behind a harmless blank line of SQL — it can remove an entire clause, occasionally producing invalid SQL if the surrounding query assumed that clause would always be present in some form.',
          },
          {
            title: 'Ignoring whitespace control entirely on a macro whose output becomes a literal value',
            detail: 'For most models, stray blank lines in compiled SQL are cosmetic. For a macro like generate_schema_name, whose entire output becomes a literal schema name, untrimmed whitespace can actually corrupt the resulting value rather than just looking untidy (Part 07).',
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
        <SectionTitle>Jinja and Macro Errors — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: "Compilation Error: 'regions' is undefined",
            cause: 'A Jinja variable was referenced (in a {% for %} loop, an {% if %} condition, or a {{ expression }}) before it was ever set with {% set %}, or it was set inside a different scope — for example inside one macro or one if-block — that does not extend to where it is being read.',
            fix: 'Confirm the variable is set with {% set %} before it is used, in a scope that actually covers the code referencing it — a variable set inside a macro or an if-block is not automatically visible outside that block.',
          },
          {
            error: "Compilation Error: macro 'cents_to_dollars' takes not more than 2 argument(s)",
            cause: 'A macro was called with more positional arguments than it accepts — often after the macro\'s signature changed (an argument was removed) but not every call site was updated to match.',
            fix: 'Check the macro\'s current {% macro name(args) %} signature in macros/ and update the call site to match exactly, including argument order if calling positionally rather than by name.',
          },
          {
            error: 'Compiled SQL has a syntax error near a trailing or missing comma, but the Jinja source looks correct at a glance',
            cause: 'A {% for %} loop generating a comma-separated list did not correctly use loop.last (or loop.first) to omit a trailing (or leading) comma on the boundary iteration, or the condition checking it was inverted.',
            fix: 'Run dbt compile (Part 06) on the affected model and read the actual compiled SQL directly — the missing or extra comma is immediately visible there, even when the Jinja source looks fine on its own.',
          },
          {
            error: 'A model behaves differently in dev than in prod, with no apparent code difference',
            cause: 'The model (or a macro it calls, such as an overridden generate_schema_name) branches on target.name or var() with a default value, and the two environments genuinely compile to different SQL by design — this is correct behavior, not a bug, if the branching was intentional.',
            fix: 'Run dbt compile against both targets (dbt compile --target dev and dbt compile --target prod) and diff the two compiled outputs directly to confirm the difference is the one that was actually intended.',
          },
          {
            error: "Compilation Error: expected token 'end of print statement', got '-'",
            cause: 'A Jinja expression or tag has mismatched or malformed delimiters — a stray {{ without a closing }}, a {%- with no matching -%} on the same logical block, or a macro call missing a closing parenthesis.',
            fix: 'Check the exact line dbt reports for balanced {{ }} and {% %} delimiters, and confirm every {% if %}/{% for %}/{% macro %} has its corresponding {% endif %}/{% endfor %}/{% endmacro %}.',
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
        'Every dbt model is a Jinja template, not raw SQL: {{ }} wraps an expression substituted into the compiled output, {% %} wraps control flow that produces no output itself — ref() and source() are themselves ordinary macros dbt ships built in.',
        '{% if %} lets compiled SQL branch on runtime context like target.name or a var() value; {% for %} repeats a block of SQL once per item in a Jinja list, using loop.first/loop.last to handle comma placement correctly.',
        'A macro ({% macro name(args) %}...{% endmacro %} in macros/, called via {{ name(args) }}) is a reusable Jinja function — the standard fix once the same templating logic would otherwise be copy-pasted across two or more models.',
        'generate_schema_name is a real, commonly-overridden dbt macro controlling custom schema naming — proof that dbt\'s own internal behavior is implemented in the same macro system available to any project.',
        'dbt compile resolves every {{ }} and {% %} into plain SQL written to target/compiled/, without touching the warehouse — the single most reliable habit for debugging Jinja and macro issues before they surface as a runtime SQL error.',
        'Templating pays for itself only when it removes genuine, observed duplication — a model so layered in loops, conditionals, and macro calls that its real logic is invisible without chasing several files is an anti-pattern, not a sign of sophistication.',
      ]} />
    </LearnLayout>
  )
}
