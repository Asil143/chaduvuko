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

export default function TestingBasics() {
  return (
    <LearnLayout
      title="Testing: Generic and Singular Tests"
      description="Generic tests versus singular tests, the four built-in generic tests and their exact YAML syntax, how a generic test actually works as a parameterized SQL query, writing custom generic and singular tests, and where in the DAG to place each kind of test."
      section="dbt — Module 08"
      readTime="65 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'Testing: Generic and Singular Tests', href: '/learn/dbt/testing-basics' },
      ]}
      prev={{ title: 'Incremental Models in Depth', href: '/learn/dbt/incremental-models' }}
      next={{ title: 'Documentation: Descriptions, Doc Blocks, and dbt Docs', href: '/learn/dbt/documentation' }}
    >
      {/* ── Part 01 — Why Tests ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why dbt Tests Exist" />
        <SectionTitle>A dbt Model Is an Assertion Until Something Tests It</SectionTitle>

        <Para>
          A dbt model is just a <code>SELECT</code> statement. It compiles, it runs, and it produces a
          table or view — none of which tells you anything about whether the data in that table is
          actually correct. A model can run successfully every single day for months while quietly
          producing duplicate primary keys, unexpected null values, or foreign keys that point nowhere,
          because "the SQL executed without error" and "the resulting data is correct" are completely
          different claims. dbt's testing framework exists to close that gap — to let you write down, in
          SQL or in YAML, the assumptions your models depend on, and have dbt check them automatically
          every time the models run.
        </Para>

        <Para>
          Without tests, data quality problems are discovered downstream — by an analyst noticing a
          dashboard number looks wrong, or a stakeholder asking why a report doesn't match another one.
          With tests, the same problems are caught at the source, immediately after the model that
          introduced them runs, with a clear failure pointing at exactly which model and which assumption
          broke.
        </Para>

        <HighlightBox>
          <Para>
            <strong>The mental model for every dbt test, generic or singular:</strong> a test is a SQL
            query that is expected to return zero rows. If it returns any rows at all, the test fails, and
            each returned row represents one specific record that violated the assertion. This single idea
            — "zero rows means passing, any rows means failing, and each row is a concrete example of the
            failure" — is the entire testing framework. Everything else is convenience built on top of it.
          </Para>
        </HighlightBox>

        <Para>
          dbt draws a line between two kinds of tests: <strong>generic tests</strong>, which are reusable
          and parameterized and get applied to models and columns declaratively through YAML, and
          <strong> singular tests</strong>, which are one-off, fully custom SQL files written for a specific
          business rule that doesn't generalize. Part 02 covers generic tests in depth; Part 04 covers
          singular tests.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 — Generic Tests ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Generic Tests" />
        <SectionTitle>Generic Tests: Reusable, Parameterized, Defined Once</SectionTitle>

        <Para>
          A generic test is a parameterized assertion you define once and apply to as many columns and
          models as you like, through YAML rather than by writing SQL every time. dbt ships with four
          built-in generic tests that cover the large majority of everyday data quality checks:
          <code>unique</code>, <code>not_null</code>, <code>accepted_values</code>, and
          <code>relationships</code>.
        </Para>

        <SubTitle>unique — no column value appears more than once</SubTitle>

        <CodeBox label="models/marts/schema.yml — unique">
{`models:
  - name: fct_orders
    columns:
      - name: order_id
        tests:
          - unique`}
        </CodeBox>

        <Para>
          This asserts that every value in <code>order_id</code> appears in the <code>fct_orders</code>
          table at most once. It is the single most common test in any dbt project, because almost every
          model has some column — a primary key, a surrogate key — that is supposed to uniquely identify
          each row, and a duplicate there usually means an upstream join fanned out unexpectedly.
        </Para>

        <SubTitle>not_null — no null values in this column</SubTitle>

        <CodeBox label="models/marts/schema.yml — not_null">
{`models:
  - name: fct_orders
    columns:
      - name: order_id
        tests:
          - unique
          - not_null
      - name: customer_id
        tests:
          - not_null`}
        </CodeBox>

        <Para>
          <code>unique</code> and <code>not_null</code> are almost always applied together on a primary
          key column — <code>unique</code> alone would still pass on a column full of nulls, since null
          values are not considered duplicates of each other by most warehouses' uniqueness semantics, so
          <code>not_null</code> closes that gap.
        </Para>

        <SubTitle>accepted_values — this column can only ever contain values from a fixed list</SubTitle>

        <CodeBox label="models/marts/schema.yml — accepted_values">
{`models:
  - name: fct_orders
    columns:
      - name: order_status
        tests:
          - accepted_values:
              values: ['placed', 'shipped', 'delivered', 'cancelled', 'refunded']`}
        </CodeBox>

        <Para>
          This is the right test for any column backed by a fixed, known set of states — an order status,
          a subscription tier, a shipping method. If the source system ever introduces a new status value
          that this model's downstream logic doesn't yet account for (a common real occurrence when an
          upstream team adds a new enum value without telling anyone), this test starts failing
          immediately rather than the new value silently falling through uncategorized in a dashboard.
        </Para>

        <SubTitle>relationships — a foreign-key-style referential integrity check</SubTitle>

        <CodeBox label="models/marts/schema.yml — relationships">
{`models:
  - name: fct_orders
    columns:
      - name: customer_id
        tests:
          - relationships:
              to: ref('dim_customers')
              field: customer_id`}
        </CodeBox>

        <Para>
          This asserts that every <code>customer_id</code> value in <code>fct_orders</code> also exists as
          a <code>customer_id</code> value in <code>dim_customers</code> — the referential-integrity
          guarantee a traditional relational database would enforce with an actual foreign key constraint,
          re-created here as a dbt test because most analytical warehouses don't enforce foreign keys at
          the database level at all.
        </Para>

        <Table
          headers={['Generic test', 'What it asserts', 'Typical column']}
          rows={[
            ['unique', 'No value in this column appears more than once.', 'Primary keys, surrogate keys.'],
            ['not_null', 'No value in this column is null.', 'Primary keys, required foreign keys, required business fields.'],
            ['accepted_values', 'Every value in this column is one of a fixed, listed set.', 'Status fields, categorical/enum-style columns.'],
            ['relationships', 'Every value in this column exists as a value in another model\'s column.', 'Foreign keys — customer_id, product_id, order_id references.'],
          ]}
        />

        <Callout title="All four tests can be combined on one column" color={K}>
          It is completely normal, and common, for one column — especially a foreign key like
          <code>customer_id</code> — to carry two or three tests at once: <code>not_null</code> plus
          <code>relationships</code> is a frequent pairing, asserting both that the value is always present
          and that whenever it is present, it points to something real.
        </Callout>

        <SubTitle>accepted_range and unique_combination_of_columns — the well-known package extensions</SubTitle>

        <Para>
          The four generic tests covered above ship with dbt itself and need no extra installation. Beyond
          them, the widely used <code>dbt_utils</code> package (a common addition to almost every real
          project, covered in a later module on packages) adds several more generic tests that fill common
          gaps — most notably <code>accepted_range</code>, for asserting a numeric column falls within a
          min/max bound, and <code>unique_combination_of_columns</code>, for asserting that a combination
          of several columns together is unique even though no single one of them is.
        </Para>

        <CodeBox label="Two dbt_utils generic tests, for context (covered in the packages module)">
{`models:
  - name: fct_orders
    columns:
      - name: total_amount
        tests:
          - dbt_utils.accepted_range:
              min_value: 0
              max_value: 100000

  - name: fct_order_line_items
    tests:
      - dbt_utils.unique_combination_of_columns:
          combination_of_columns:
            - order_id
            - line_item_id`}
        </CodeBox>

        <Para>
          These are worth knowing about even before covering the packages module in depth, because
          <code>unique_combination_of_columns</code> in particular is the standard way to express a
          composite uniqueness assertion — the built-in <code>unique</code> test only ever checks a single
          column, and a line-item level fact table's real primary key is almost always a combination of two
          or more columns rather than one.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 — How a generic test works under the hood ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — How a Generic Test Actually Works" />
        <SectionTitle>Every Generic Test Is Just a Parameterized SQL Query</SectionTitle>

        <Para>
          The YAML syntax in Part 02 can make generic tests feel like a special declarative feature
          disconnected from SQL. They are not. Under the hood, each one is a Jinja macro that compiles down
          to an ordinary <code>SELECT</code> statement, and dbt runs that statement and checks whether it
          returned any rows. Understanding this demystifies testing entirely — there is no magic, just SQL
          you would otherwise have had to write by hand, generated for you from a couple of YAML lines.
        </Para>

        <Para>
          <code>not_null</code> is the clearest example: it is, quite literally,
          <code>SELECT * FROM model WHERE column IS NULL</code>. If that query returns zero rows, no
          column value was null, and the test passes. If it returns any rows, those are the exact rows
          with a null value, and the test fails.
        </Para>

        <CodeBox label="What not_null compiles to, roughly">
{`-- tests:
--   - not_null
-- applied to fct_orders.customer_id compiles to approximately:

select *
from analytics.fct_orders
where customer_id is null

-- Zero rows returned -> test PASSES
-- Any rows returned  -> test FAILS, and each returned row is a
--                        concrete example of a record with a null customer_id`}
        </CodeBox>

        <CodeBox label="What unique compiles to, roughly">
{`-- tests:
--   - unique
-- applied to fct_orders.order_id compiles to approximately:

select order_id
from analytics.fct_orders
where order_id is not null
group by order_id
having count(*) > 1

-- Zero rows returned -> every order_id appears at most once -> PASSES
-- Any rows returned  -> those order_id values appear more than once -> FAILS`}
        </CodeBox>

        <CodeBox label="What accepted_values compiles to, roughly">
{`-- tests:
--   - accepted_values:
--       values: ['placed', 'shipped', 'delivered', 'cancelled', 'refunded']
-- applied to fct_orders.order_status compiles to approximately:

select order_status
from analytics.fct_orders
where order_status not in ('placed', 'shipped', 'delivered', 'cancelled', 'refunded')

-- Any row returned is a value that snuck outside the accepted list`}
        </CodeBox>

        <CodeBox label="What relationships compiles to, roughly">
{`-- tests:
--   - relationships:
--       to: ref('dim_customers')
--       field: customer_id
-- applied to fct_orders.customer_id compiles to approximately:

select fct_orders.customer_id
from analytics.fct_orders
left join analytics.dim_customers
  on fct_orders.customer_id = dim_customers.customer_id
where fct_orders.customer_id is not null
  and dim_customers.customer_id is null

-- Any row returned is a customer_id in fct_orders with no match in dim_customers`}
        </CodeBox>

        <Para>
          Once this clicks, a generic test stops looking like a special dbt-only concept and starts
          looking like exactly what it is: a SQL query you would have written anyway to sanity-check your
          data, wrapped in a small amount of Jinja so it can be parameterized by column name and reused
          across every model in the project without retyping the query each time.
        </Para>

        <Callout title="dbt test failure output shows you the actual failing rows" color={K}>
          Because every test is fundamentally "run this SELECT and show me what it returns," a failing test
          in <code>dbt test</code> output isn't just a pass/fail flag — dbt can show you a sample of the
          actual rows that violated the assertion, which is usually enough to diagnose the root cause
          without writing a single additional debugging query.
        </Callout>

        <SubTitle>severity — not every failure needs to block a build</SubTitle>

        <Para>
          Every generic test also accepts a <code>severity</code> config, either <code>error</code> (the
          default) or <code>warn</code>. An <code>error</code>-severity test that fails causes
          <code>dbt build</code> to stop downstream models from building on top of it, exactly as covered in
          Part 06. A <code>warn</code>-severity test that fails is reported clearly in the run output but
          does not block anything downstream — useful for a check that is genuinely worth surfacing to a
          human but is not, on its own, severe enough to halt a production pipeline.
        </Para>

        <CodeBox label="Configuring severity on a generic test">
{`models:
  - name: fct_orders
    columns:
      - name: shipping_address
        tests:
          - not_null:
              config:
                severity: warn
                # a missing shipping address is worth flagging,
                # but should not block fct_orders itself, or
                # anything downstream, from building`}
        </CodeBox>

        <Para>
          A useful default heuristic: <code>error</code> for anything a broken downstream model or
          dashboard genuinely cannot tolerate — a duplicate primary key, a broken foreign key relationship
          — and <code>warn</code> for a data quality signal that is worth a human's attention but does not,
          by itself, invalidate everything built on top of the model.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 — Singular tests ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Singular Tests" />
        <SectionTitle>Singular Tests: One-Off SQL for Rules That Don't Generalize</SectionTitle>

        <Para>
          Not every business rule fits the generic-test mold of "check one column against one condition,
          reusable everywhere." Some assertions are specific to one model and one rule — "no order should
          ever have a negative total," "a subscription's end date should never be before its start date."
          These are singular tests: plain <code>.sql</code> files placed directly in the project's
          <code>tests/</code> directory, each one a self-contained query that follows the exact same
          contract as a generic test — if it returns any rows, the test fails.
        </Para>

        <CodeBox label="tests/assert_no_negative_order_totals.sql">
{`-- A singular test: no filename-specific YAML wiring needed.
-- dbt discovers every .sql file in tests/ automatically and
-- runs it as a test. Failing means "this returned rows."

select
    order_id,
    total_amount
from {{ ref('fct_orders') }}
where total_amount < 0`}
        </CodeBox>

        <Para>
          There is no YAML required for a singular test at all — dbt automatically picks up every
          <code>.sql</code> file inside <code>tests/</code> and treats it as a test named after the file.
          This one is named <code>assert_no_negative_order_totals</code>, and it will appear under that
          name in <code>dbt test</code> output.
        </Para>

        <CodeBox label="tests/assert_subscription_dates_are_ordered.sql — a second example">
{`-- Business rule specific to fct_subscriptions: end_date must never
-- be earlier than start_date. This rule doesn't generalize to any
-- other model in the project, so a singular test is the right fit
-- rather than trying to force it into a generic test.

select
    subscription_id,
    start_date,
    end_date
from {{ ref('fct_subscriptions') }}
where end_date < start_date`}
        </CodeBox>

        <Table
          headers={['', 'Generic test', 'Singular test']}
          rows={[
            ['Defined', 'Once, as a macro; applied via YAML to many columns/models.', 'Once, as a single .sql file for one specific rule.'],
            ['Reusable', 'Yes — the same test (e.g. not_null) applies across the whole project.', 'No — each file is a one-off, tied to one model\'s specific business rule.'],
            ['Configuration', 'Declared in schema.yml under a model\'s columns.', 'No YAML needed — dbt auto-discovers every .sql file in tests/.'],
            ['Good for', 'Structural checks: uniqueness, nullability, allowed values, foreign keys.', 'Cross-column or cross-row business logic that doesn\'t generalize: date ordering, sign checks, multi-column consistency.'],
          ]}
        />

        <Callout title="Both kinds obey the exact same zero-rows contract" color={K}>
          A singular test is not a fundamentally different mechanism from a generic test — it is the same
          "return zero rows to pass" contract from Part 01, just written as a standalone SQL file instead
          of generated from a YAML-configured macro. If you can express a business rule as "rows where this
          bad condition holds," it can be a singular test.
        </Callout>

        <SubTitle>A cross-model consistency check — a case singular tests handle well</SubTitle>

        <Para>
          Singular tests are also the natural fit for assertions that span more than one model — a
          comparison a generic test's single-model, single-column shape cannot express at all. A common real
          example: asserting that a fact table's total revenue for a period matches an independently
          computed total from a separate finance-reported summary table, catching a transformation bug that
          would never show up as a null, a duplicate, or an out-of-range value within either table alone.
        </Para>

        <CodeBox label="tests/assert_revenue_matches_finance_summary.sql">
{`-- Cross-model consistency check: dbt-computed daily revenue must
-- match the independently maintained finance summary table, within
-- a small rounding tolerance.

with dbt_computed as (
    select
        order_date,
        sum(total_amount) as dbt_revenue
    from {{ ref('fct_orders') }}
    group by 1
),

finance_reported as (
    select
        report_date as order_date,
        reported_revenue
    from {{ source('finance', 'daily_revenue_summary') }}
)

select
    dbt_computed.order_date,
    dbt_computed.dbt_revenue,
    finance_reported.reported_revenue,
    abs(dbt_computed.dbt_revenue - finance_reported.reported_revenue) as discrepancy
from dbt_computed
join finance_reported using (order_date)
where abs(dbt_computed.dbt_revenue - finance_reported.reported_revenue) > 1.00`}
        </CodeBox>

        <Para>
          No generic test could express this rule declaratively — it needs to join two entirely different
          models together and compare an aggregate across both, which is exactly the kind of one-off,
          cross-model logic singular tests exist for. This is also a good illustration of why singular
          tests are not a lesser or fallback option compared to generic tests — some genuinely important
          business rules can only be expressed this way.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 — Custom generic tests ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Writing a Custom Generic Test" />
        <SectionTitle>Building Your Own Reusable Generic Test as a Macro</SectionTitle>

        <Para>
          The four built-in generic tests cover the most common structural checks, but real projects
          regularly need a reusable assertion the built-ins don't cover — "this column must always be
          positive," "this timestamp column must never be in the future." When the same rule needs to
          apply to more than one column or model, writing it as a custom generic test avoids copy-pasting
          the same singular-test SQL over and over with only the column name changed.
        </Para>

        <Para>
          A custom generic test is a macro following the naming convention <code>test_&lt;name&gt;</code>,
          placed in <code>tests/generic/</code>. It takes two implicit arguments provided by dbt for every
          generic test — <code>model</code> (the relation the test is applied to) and
          <code>column_name</code> (the specific column, when the test is applied at the column level) —
          plus any additional parameters you define.
        </Para>

        <CodeBox label="tests/generic/test_positive_value.sql">
{`{% test positive_value(model, column_name) %}

select
    {{ column_name }}
from {{ model }}
where {{ column_name }} <= 0

{% endtest %}`}
        </CodeBox>

        <Para>
          Once this macro exists, <code>positive_value</code> can be applied to any column in any model,
          exactly like a built-in generic test:
        </Para>

        <CodeBox label="models/marts/schema.yml — using the custom generic test">
{`models:
  - name: fct_orders
    columns:
      - name: total_amount
        tests:
          - positive_value
  - name: fct_payments
    columns:
      - name: amount_paid
        tests:
          - positive_value`}
        </CodeBox>

        <Para>
          The same macro is reused across two different models and columns with zero duplication of the
          underlying SQL — precisely the payoff generic tests are built for. A more advanced custom
          generic test can accept additional configuration parameters beyond the implicit
          <code>model</code> and <code>column_name</code>, the same way <code>accepted_values</code>
          accepts a <code>values:</code> list.
        </Para>

        <CodeBox label="tests/generic/test_value_within_range.sql — a parameterized custom test">
{`{% test value_within_range(model, column_name, min_value, max_value) %}

select
    {{ column_name }}
from {{ model }}
where {{ column_name }} < {{ min_value }}
   or {{ column_name }} > {{ max_value }}

{% endtest %}`}
        </CodeBox>

        <CodeBox label="Using value_within_range with its parameters">
{`models:
  - name: stg_reviews
    columns:
      - name: star_rating
        tests:
          - value_within_range:
              min_value: 1
              max_value: 5`}
        </CodeBox>

        <Callout title="Reach for a custom generic test the moment you'd copy-paste a singular test" color={K}>
          If you find yourself writing the same singular-test SQL twice with only a column name changed,
          that is the exact signal to promote it into a custom generic test instead — the same reasoning
          that drives extracting a repeated block of application code into a function.
        </Callout>

        <SubTitle>Custom generic tests can reference other models too, not just the current column</SubTitle>

        <Para>
          The <code>model</code> and <code>column_name</code> arguments are just Jinja variables inside the
          macro — the query body can do anything a normal dbt model's SQL can do, including joining out to
          other tables via <code>ref()</code>. A common real pattern is a custom generic test checking a
          column's value against an aggregate computed from a separate model entirely, something none of
          the four built-in generic tests can express.
        </Para>

        <CodeBox label="tests/generic/test_not_exceeding_daily_average.sql — referencing another model">
{`{% test not_exceeding_daily_average(model, column_name, factor) %}

with stats as (
    select avg({{ column_name }}) as avg_value
    from {{ model }}
)

select
    {{ column_name }}
from {{ model }}, stats
where {{ column_name }} > stats.avg_value * {{ factor }}

{% endtest %}`}
        </CodeBox>

        <CodeBox label="Using it — flag any single order more than 10x the average order value">
{`models:
  - name: fct_orders
    columns:
      - name: total_amount
        tests:
          - not_exceeding_daily_average:
              factor: 10`}
        </CodeBox>

        <Para>
          This kind of statistical outlier check is a genuinely useful complement to the four built-in
          structural tests — it does not catch a broken key or a null value, but it does catch a plausible
          but suspicious value, like an order total that is off by a decimal-place error upstream, that
          would otherwise sail through every structural test cleanly.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 — Running tests ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Running Tests" />
        <SectionTitle>dbt test, dbt build, and Scoping to One Model</SectionTitle>

        <Para>
          <code>dbt test</code> runs every test defined in the project — every generic test declared in
          YAML and every singular test file in <code>tests/</code> — and reports a pass/fail result for
          each one. This is the command a CI pipeline typically runs after <code>dbt run</code> to validate
          that everything just built is actually trustworthy.
        </Para>

        <CodeBox label="Running the full test suite">
{`dbt test`}
        </CodeBox>

        <Output>{`Running 14 tests
PASS unique_fct_orders_order_id ................................ [PASS in 0.42s]
PASS not_null_fct_orders_order_id .............................. [PASS in 0.31s]
PASS not_null_fct_orders_customer_id ............................ [PASS in 0.29s]
FAIL relationships_fct_orders_customer_id__customer_id__ref_dim_customers_
  Got 3 results, configured to fail if != 0 ....................... [FAIL 3 in 0.55s]
PASS accepted_values_fct_orders_order_status .................... [PASS in 0.38s]
...
Done. PASS=13 WARN=0 ERROR=0 FAIL=1 TOTAL=14`}</Output>

        <Para>
          <code>dbt test --select model_name</code> scopes the run to only the tests attached to one
          specific model, which is useful while actively developing or debugging a single model instead of
          waiting for the entire project's test suite to run.
        </Para>

        <CodeBox label="Scoping tests to one model">
{`dbt test --select fct_orders`}
        </CodeBox>

        <SubTitle>dbt build — models and their tests together, in dependency order</SubTitle>

        <Para>
          <code>dbt run</code> builds models. <code>dbt test</code> tests them. <code>dbt build</code> does
          both together, and — critically — in dependency order: it builds a model, immediately tests it,
          and only proceeds to build a downstream model if its upstream dependency's tests passed. This
          matters because a test failure on an upstream model should stop downstream models from building
          on top of data that has already been shown to be wrong.
        </Para>

        <CodeBox label="Why ordering matters: dbt run + dbt test vs dbt build">
{`# dbt run, then dbt test, as two separate steps:
# 1. dbt run builds EVERY model, including downstream ones,
#    even if an upstream model's data is actually broken
# 2. dbt test runs afterward and reports the failure --
#    but downstream models already built on top of the bad data

# dbt build, as one command:
# 1. builds stg_orders
# 2. tests stg_orders -- if this fails, dbt build stops here
#    for everything that depends on stg_orders
# 3. only if stg_orders' tests pass, proceeds to build fct_orders
# 4. tests fct_orders
# 5. only if fct_orders' tests pass, proceeds to models that ref() it

dbt build`}
        </CodeBox>

        <Para>
          This is the meaningful practical difference: <code>dbt run</code> followed by <code>dbt test</code>
          will happily build every downstream model on top of upstream data that later turns out to have
          failed a test, because the test doesn't run until everything is already built. <code>dbt build</code>
          catches the failure at the point it happens and prevents anything downstream from compounding on
          bad data in the same invocation.
        </Para>

        <Table
          headers={['Command', 'What it does', 'When to use it']}
          rows={[
            ['dbt run', 'Builds models only — no tests are run.', 'Local iteration when you specifically only want to rebuild, not validate.'],
            ['dbt test', 'Runs tests only — assumes models are already built.', 'Re-validating data quality without rebuilding anything, or CI validation after a separate build step.'],
            ['dbt build', 'Builds and tests every model, in dependency order, stopping downstream builds on an upstream test failure.', 'The default choice for CI and production scheduled runs — the safest way to run the whole project.'],
          ]}
        />

        <Callout title="dbt build is the production default for a reason" color={K}>
          Most teams run <code>dbt build</code>, not <code>dbt run</code>, as their scheduled production
          job specifically because of the stop-on-failure ordering guarantee — it is the difference between
          catching a bad upstream row before it reaches a dashboard and finding out about it only after a
          stakeholder has already seen wrong numbers.
        </Callout>

        <SubTitle>store_failures — keeping a queryable record of exactly what failed</SubTitle>

        <Para>
          By default, a failed test's result set is only shown transiently in the run's console output — it
          is not persisted anywhere. <code>store_failures</code> tells dbt to additionally write the failing
          rows to a real table in the warehouse, which is invaluable for a test that fails intermittently or
          whose failing rows are too numerous to usefully read from console output.
        </Para>

        <CodeBox label="Persisting failing rows for later investigation">
{`models:
  - name: fct_orders
    columns:
      - name: customer_id
        tests:
          - relationships:
              to: ref('dim_customers')
              field: customer_id
              config:
                store_failures: true
                schema: dbt_test_failures`}
        </CodeBox>

        <Output>{`FAIL relationships_fct_orders_customer_id__customer_id__ref_dim_customers_
  Got 47 results, configured to fail if != 0 ...................... [FAIL 47 in 1.2s]

  -- the 47 failing customer_id values are now persisted at:
  -- analytics.dbt_test_failures.relationships_fct_orders_customer_id__...
  -- queryable directly with ordinary SQL, no need to re-run the test`}</Output>

        <Para>
          <code>store_failures</code> can be set project-wide in <code>dbt_project.yml</code> for every
          test, or scoped to just the tests worth the extra storage cost — typically the tests on the
          highest-traffic mart models, where a failure needs to be investigated by more than one person and
          a persisted, queryable record saves everyone from re-running the test just to see what broke.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 — Where in the DAG to test ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Where in the DAG to Put Which Tests" />
        <SectionTitle>Testing Near the Source vs Testing at the Mart</SectionTitle>

        <Para>
          Tests are not free to write or free to run, and not every test belongs at every layer of the DAG.
          Where a test lives changes what kind of problem it catches, and how early it catches it.
        </Para>

        <SubTitle>Source and staging-level tests — catching bad raw data early</SubTitle>

        <Para>
          Tests placed on sources and staging models catch structural problems in raw data as close to its
          origin as possible — a source table's primary key becoming non-unique, a required field starting
          to arrive null, a foreign key from an upstream system pointing at something that no longer
          exists. Catching this here means the problem is flagged before a single downstream model has had
          a chance to build on top of it.
        </Para>

        <CodeBox label="models/staging/schema.yml — testing close to the source">
{`sources:
  - name: raw_ecommerce
    tables:
      - name: orders
        columns:
          - name: order_id
            tests:
              - unique
              - not_null

models:
  - name: stg_orders
    columns:
      - name: order_id
        tests:
          - unique
          - not_null`}
        </CodeBox>

        <SubTitle>Mart-level tests — catching business-logic bugs before they reach a dashboard</SubTitle>

        <Para>
          Tests placed on mart-level models — the fact and dimension tables that dashboards and reports
          actually query — catch a different category of problem: bugs introduced by the transformation
          logic itself, not by the raw source data. A join that fans out unexpectedly, an aggregation that
          double-counts a row, a business rule that was implemented slightly wrong — none of these would
          show up as a problem in the raw source data; they only appear once the model's own logic runs.
        </Para>

        <CodeBox label="models/marts/schema.yml — testing at the mart level">
{`models:
  - name: fct_orders
    columns:
      - name: order_id
        tests:
          - unique
          - not_null
      - name: customer_id
        tests:
          - not_null
          - relationships:
              to: ref('dim_customers')
              field: customer_id
      - name: order_status
        tests:
          - accepted_values:
              values: ['placed', 'shipped', 'delivered', 'cancelled', 'refunded']`}
        </CodeBox>

        <Para>
          The <code>unique</code> test on <code>order_id</code> at the staging layer and the same test
          again at the mart layer are not redundant — they catch different failure modes. A duplicate at
          staging means the raw source itself has a data quality problem. A duplicate that only appears at
          the mart layer, despite staging being clean, means a join inside the transformation logic between
          staging and the mart fanned out and created duplicates that didn't exist in the source at all.
        </Para>

        <Table
          headers={['DAG layer', 'What a failure there tells you', 'Example test']}
          rows={[
            ['Source', 'The raw data landing from the upstream system is itself broken.', 'not_null on a source table\'s required column.'],
            ['Staging', 'The raw data is broken, or a light staging transformation (renaming, casting) introduced a problem.', 'unique on a staging model\'s primary key.'],
            ['Marts (facts/dimensions)', 'The transformation logic itself — joins, aggregations, business rules — introduced a problem the raw data didn\'t have.', 'relationships or accepted_values on a fact table\'s foreign key or status column.'],
          ]}
        />

        <Callout title="This connects to source freshness and a fuller test strategy" color={K}>
          Beyond structural tests on columns, a mature dbt project also checks source freshness — whether
          raw data is arriving on the schedule it's supposed to, not just whether it's structurally valid
          once it arrives. Building a complete, layered test strategy across an entire project — deciding
          exactly which tests belong at which layer, and how to triage a large volume of test failures — is
          its own discipline, covered in a later module in this track.
        </Callout>

        <SubTitle>Intermediate-layer tests — a middle ground, used more sparingly</SubTitle>

        <Para>
          Between staging and marts, many projects have an intermediate layer of models — joins and
          aggregations that aren't yet the final, dashboard-facing fact or dimension table, but are more
          than a thin staging rename. Testing at this layer is usually more selective than at staging or
          marts: rather than testing every column, teams typically test only the specific transformation
          this intermediate model is responsible for, to pinpoint exactly which join or aggregation step
          introduced a problem when a downstream mart-level test eventually fails.
        </Para>

        <CodeBox label="models/intermediate/schema.yml — a narrower, targeted test">
{`models:
  - name: int_orders_joined_to_items
    columns:
      - name: order_id
        tests:
          - unique
          # Only testing uniqueness here, specifically because this is
          # the exact model where an order_items join could fan out an
          # order_id into multiple rows. Not every column needs a test
          # at every layer -- test where a specific risk actually lives.`}
        </CodeBox>

        <Para>
          This targeted approach avoids two failure modes at once: testing nothing at all in the middle of
          the DAG (which means a fan-out bug is only caught once it reaches the mart, with less precision
          about which step caused it), and testing every column at every layer (which multiplies the number
          of tests to maintain without a proportional increase in how quickly a real bug gets localized).
        </Para>

        <Table
          headers={['Signal', 'Where it usually points']}
          rows={[
            ['staging-layer unique test fails', 'The raw source itself has duplicate rows — a source system bug, not a dbt transformation bug.'],
            ['intermediate-layer unique test fails, staging passed', 'A specific join at the intermediate layer fanned out unexpectedly — the exact model to inspect is identified directly by which test failed.'],
            ['mart-layer unique test fails, intermediate passed', 'A later aggregation or join, between the intermediate layer and the final mart, introduced the fan-out.'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About dbt Testing</SectionTitle>

        {[
          {
            wrong: '"Generic tests and singular tests are fundamentally different mechanisms in dbt"',
            right: 'Both obey the exact same contract: a SQL query that is expected to return zero rows, with any returned row representing one failing record. A generic test just gets that SQL generated from a reusable, parameterized macro applied through YAML, while a singular test is the same idea written directly as a one-off .sql file (Part 01, Part 03, Part 04).',
          },
          {
            wrong: '"Passing dbt test means the data is correct"',
            right: 'Passing dbt test means the data satisfies whichever assertions were actually written down — nothing more. A model with zero tests configured will always pass trivially, and even a well-tested model can have real data quality problems that nobody thought to write a test for. Tests only catch violations of rules someone explicitly encoded.',
          },
          {
            wrong: '"dbt run and dbt build do essentially the same thing"',
            right: 'dbt run only builds models, with no testing at all. dbt build builds AND tests every model in dependency order, stopping downstream models from being built on top of an upstream model whose tests just failed (Part 06) — a meaningfully different guarantee, not just a convenience wrapper.',
          },
          {
            wrong: '"unique alone is enough to guarantee a column has no problems"',
            right: 'unique only checks for duplicates among non-null values on most warehouses\' semantics — a column full of nulls can pass a unique test while being completely useless as a key. unique is almost always paired with not_null specifically to close this gap (Part 02).',
          },
          {
            wrong: '"Testing only needs to happen at the mart level, since that\'s what dashboards actually query"',
            right: 'Testing only at the mart level means a bug is caught after transformation logic has already run, and gives no way to distinguish "the raw source data was bad" from "the transformation logic introduced the problem." Testing at both the source/staging layer and the mart layer catches different failure modes and localizes exactly where a problem was introduced (Part 07).',
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
        <SectionTitle>Three Test Failures That Caught Real Bugs Before They Reached a Dashboard</SectionTitle>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Instacart — grocery delivery, order fact table
          </div>
          <Para>
            A new join is added to <code>fct_orders</code> at Instacart to bring in a promotions table,
            attaching promo codes to orders. The join key, <code>order_id</code>, is assumed to be unique
            on the promotions side — but a subset of orders had two promo codes stacked, which the
            promotions table represented as two separate rows per order.
          </Para>
          <Para>
            The <code>unique</code> test on <code>fct_orders.order_id</code>, already sitting in
            <code>schema.yml</code> from before the promotions join was added, fails on the very first
            <code>dbt build</code> after the change — flagging exactly which order IDs now appeared twice.
            Because the test lives at the mart layer, it immediately localizes the bug to the newly added
            join rather than the raw orders data, which was untouched and still passed its own staging-level
            <code>unique</code> test cleanly.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Toast — restaurant point-of-sale, refund handling
          </div>
          <Para>
            An engineer at Toast writes a singular test asserting that no transaction's
            <code>net_amount</code> (the charged amount minus any refunded amount) should ever be negative
            — a refund should never exceed the original charge. The test passes for months, until a partial
            refund workflow is changed to allow a manager to apply a "goodwill credit" refund on top of an
            already-fully-refunded transaction, which the new code path did not guard against.
          </Para>
          <Para>
            <code>dbt build</code> catches a handful of transactions with negative <code>net_amount</code>
            the same day the new refund workflow ships. Because this rule — "a refund-adjusted amount must
            never go negative" — is specific to <code>fct_pos_transactions</code> and doesn't generalize to
            any other model in the project, it stays a singular test rather than being promoted into a
            custom generic test; there is nowhere else in the project it would apply.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Samsara — IoT vehicle telemetry, sensor value ranges
          </div>
          <Para>
            Samsara's telemetry pipeline ingests engine temperature readings from vehicle hardware. The
            team writes a custom generic test, <code>value_within_range</code>, exactly like the one built
            in Part 05, and applies it to every sensor-reading column across several fact tables — engine
            temperature, fuel level percentage, tire pressure — each with its own physically sensible
            min/max bounds.
          </Para>
          <Para>
            When a firmware update on one vehicle model starts reporting engine temperature in Fahrenheit
            instead of the expected Celsius, the <code>value_within_range</code> test on that column fails
            immediately with values far outside the configured bounds — catching a unit-conversion bug at
            the data layer within a day of the firmware rollout, rather than an engineer eventually noticing
            engine temperature dashboards for that vehicle model looked implausibly high weeks later.
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
            q: 'What is the fundamental contract every dbt test follows, and how does that explain what a "failure" actually means?',
            a: 'Every dbt test, generic or singular, is a SQL query expected to return zero rows — that is the entire contract (Part 01). If the query returns any rows at all, the test fails, and each returned row is a concrete example of a record that violated the assertion. This is why dbt test output can show you actual sample failing rows rather than just a pass/fail flag: the "failure" is literally the result set of a SELECT, and dbt is just checking whether that result set is empty.',
          },
          {
            q: 'Explain, mechanically, what the not_null and unique generic tests actually compile down to.',
            a: 'not_null compiles to roughly SELECT * FROM model WHERE column IS NULL — any row returned had a null value in that column. unique compiles to roughly SELECT column FROM model WHERE column IS NOT NULL GROUP BY column HAVING COUNT(*) > 1 — any row returned is a value that appears more than once (Part 03). Neither is a special dbt-internal mechanism; they are ordinary SQL queries generated from a parameterized macro so the same query doesn\'t have to be retyped for every column and model that needs the same check.',
          },
          {
            q: 'When would you write a singular test instead of a custom generic test, and how do you decide?',
            a: 'The deciding factor is reuse. If a business rule applies to exactly one model and one specific condition — no negative order totals, subscription end dates never preceding start dates — a singular .sql file in tests/ is simpler and needs no YAML wiring at all (Part 04). The moment the same rule, or a parameterized version of it, would apply to more than one column or model, that is the signal to promote it into a custom generic test macro instead (Part 05), so the underlying SQL is written once and reused via YAML rather than copy-pasted across multiple singular test files.',
          },
          {
            q: 'What is the practical difference between running dbt run followed by dbt test, versus running dbt build?',
            a: 'dbt run followed by dbt test as two separate steps builds every model first — including downstream ones — and only checks for test failures afterward, so a downstream model can already be built on top of upstream data that a test later reveals was broken. dbt build interleaves building and testing in dependency order: it builds a model, tests it immediately, and only proceeds to build models that depend on it if those tests passed (Part 06). This is why dbt build, not dbt run, is the standard choice for production scheduled jobs and CI — it stops bad data from propagating further down the DAG within the same run, rather than just reporting the failure after the fact.',
          },
          {
            q: 'Why would the same unique test on a primary key exist at both the staging layer and the mart layer, rather than just once at the mart level where dashboards actually query the data?',
            a: 'The same test at two different layers catches two different failure modes and localizes exactly where a problem was introduced (Part 07). A uniqueness failure at the staging layer means the raw source data itself already contains duplicates. A uniqueness failure at the mart layer, when staging passed cleanly, means a join or aggregation inside the transformation logic between staging and the mart fanned out and created duplicates that did not exist in the source — a completely different class of bug requiring a different fix, in a different place, and testing only at the mart layer would conflate the two.',
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
        <SectionTitle>Five Mistakes Engineers Make Writing Their First dbt Tests</SectionTitle>

        {[
          {
            title: 'Using unique without not_null on a primary key',
            detail: 'A column that is entirely null can pass a unique test on most warehouses, since null is not typically treated as a duplicate of another null. A primary key needs both tests together to actually guarantee "every row has a real, distinct identifier."',
          },
          {
            title: 'Copy-pasting the same singular test SQL for multiple columns or models instead of writing a custom generic test',
            detail: 'The moment a business rule needs to apply to more than one column or model, maintaining several nearly-identical singular test files becomes a maintenance burden — a custom generic test macro (Part 05) expresses the same rule once and reuses it declaratively through YAML.',
          },
          {
            title: 'Running dbt run and dbt test as separate scheduled jobs instead of dbt build',
            detail: 'This ordering lets every downstream model build on top of upstream data before that data\'s own tests have even run, defeating the stop-on-failure guarantee that makes testing valuable in production pipelines in the first place.',
          },
          {
            title: 'Only testing at the mart layer, never at staging or the source',
            detail: 'A test failure only at the mart layer can\'t distinguish "the raw source data was already broken" from "the transformation logic introduced the problem" — testing at both layers is what actually localizes the bug\'s origin.',
          },
          {
            title: 'Treating a passing dbt test suite as proof the data has no problems at all',
            detail: 'A model with no tests configured trivially passes an empty test suite. Tests only catch violations of rules someone actually wrote down — a clean dbt test run means the encoded assumptions held, not that every possible data quality issue was checked for.',
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
        <SectionTitle>dbt Testing Errors — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: 'Got 3 results, configured to fail if != 0 — relationships_fct_orders_customer_id__customer_id__ref_dim_customers_',
            cause: 'Three customer_id values in fct_orders have no matching row in dim_customers — either dim_customers is missing recently added customers because it ran before fct_orders in the DAG, or fct_orders references a customer_id that was deleted or never existed in the source.',
            fix: 'Check the run order first (dbt build respects DAG dependencies automatically, but a manually staged dbt run of just one model can build it out of order), then check the source data directly for the specific customer_id values dbt reports as failing.',
          },
          {
            error: 'Compilation Error: Test \'positive_value\' is not defined',
            cause: 'A custom generic test macro was referenced in schema.yml YAML before it was actually created in tests/generic/, or the file exists but the {% test name(...) %} block\'s name doesn\'t exactly match what YAML references.',
            fix: 'Confirm the file exists at tests/generic/test_positive_value.sql (or wherever your project\'s generic test directory is configured) and that the {% test positive_value(model, column_name) %} declaration\'s name matches the YAML reference exactly.',
          },
          {
            error: 'A singular test file in tests/ never runs, even though dbt test reports other tests passing',
            cause: 'The file is not a valid standalone SELECT statement — for example it has a trailing semicolon, is missing the ref()/source() Jinja needed to resolve the model, or is not saved with a .sql extension.',
            fix: 'Confirm the file compiles as valid SQL on its own (try dbt compile and inspect the compiled output in target/compiled), uses {{ ref(\'model_name\') }} rather than a hardcoded table name, and ends in .sql.',
          },
          {
            error: 'accepted_values test fails immediately after a routine deploy, with no code changes to the model itself',
            cause: 'An upstream source system started emitting a new categorical value that was never added to the accepted_values values: list — a common occurrence when another team adds a new order status or subscription tier without coordinating with the analytics team.',
            fix: 'Confirm with the upstream team whether the new value is a legitimate addition; if so, add it to the values: list. If not, it may indicate a genuine upstream data quality bug worth flagging back to that team.',
          },
          {
            error: 'dbt build stops partway through, and several models never get built even though their own tests were never reached',
            cause: 'This is dbt build working as designed, not a bug: an upstream model\'s test failed, and every model that depends on it (directly or transitively through ref()) is correctly skipped rather than being built on top of data already shown to violate an assertion.',
            fix: 'Fix the root failing test\'s underlying cause first — do not attempt to re-run only the downstream models in isolation until the upstream test passes again, or you will be knowingly building on top of unvalidated data.',
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
        'Every dbt test — generic or singular — follows the same contract: a SQL query expected to return zero rows, where any returned row is a concrete example of a failing record.',
        'The four built-in generic tests cover most structural checks: unique, not_null, accepted_values (with a values: list), and relationships (a foreign-key-style check with to: and field:).',
        'not_null is literally SELECT * FROM model WHERE column IS NULL under the hood — understanding this compilation demystifies every generic test as ordinary SQL wrapped in a reusable macro.',
        'Singular tests are one-off .sql files in tests/ for business rules that don\'t generalize across models; custom generic tests are macros in tests/generic/ following the test_<name> convention, for rules that do generalize.',
        'dbt test runs the whole suite (or --select model_name for one model); dbt build builds and tests every model in dependency order, stopping downstream builds when an upstream model\'s tests fail — the reason it is the standard choice for production and CI.',
        'Source and staging tests catch bad raw data early; mart-level tests catch bugs introduced by the transformation logic itself — the same test at both layers localizes exactly where a problem originated.',
      ]} />
    </LearnLayout>
  )
}
