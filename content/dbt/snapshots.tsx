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

export default function Snapshots() {
  return (
    <LearnLayout
      title="Snapshots: Type 2 Slowly Changing Dimensions"
      description="Why mutable source tables silently destroy history, how dbt snapshots build a permanent append-only record of change, the timestamp and check detection strategies, the dbt_valid_from/dbt_valid_to/dbt_scd_id columns, querying current and point-in-time state, and handling hard deletes."
      section="dbt — Module 13"
      readTime="65 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'Snapshots: Type 2 Slowly Changing Dimensions', href: '/learn/dbt/snapshots' },
      ]}
      prev={{ title: 'Seeds: Loading Static Reference Data', href: '/learn/dbt/seeds' }}
      next={{ title: 'Variables and Environments', href: '/learn/dbt/variables-and-environments' }}
    >
      {/* ── Part 01 — The problem ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why History Disappears" />
        <SectionTitle>A Mutable Source Table Only Ever Shows You Right Now</SectionTitle>

        <Para>
          Most operational source tables — the ones a production application writes to — are mutable.
          When a customer upgrades their subscription tier, the application runs an <code>UPDATE</code>
          against the row for that customer. The old tier value is overwritten. It does not move anywhere,
          it is not archived automatically, it is simply gone. The next time anything reads that row, the
          only value it can possibly see is the new one. This is completely correct behavior for the
          application itself — an app showing a customer's account page has no reason to care what tier
          they were on last year. But it is a serious problem the moment you need to answer a historical
          question.
        </Para>

        <Para>
          Consider a simple, extremely common analytics question: <em>what plan was this customer on when
          they made this purchase?</em> If your <code>customers</code> table only stores current state, and
          a customer has since changed plans, you cannot answer this question at all — not approximately,
          not with a clever query, not ever — because the information required to answer it was overwritten
          the moment the plan changed. The purchase record still exists, timestamped correctly, but the
          only version of "what plan were they on" you can join against is whatever plan they happen to be
          on today. Revenue-by-plan reporting, churn analysis segmented by historical tier, and any audit
          trail that needs to reconstruct "what did we know and when did we know it" are all quietly broken
          by this, usually without anyone noticing until a stakeholder asks a question the data literally
          cannot answer.
        </Para>

        <HighlightBox>
          <Para>
            <strong>The core problem in one sentence:</strong> a table that only stores current state has
            already destroyed the information needed to answer any question about the past, and no amount
            of clever SQL against that table can recover data that was overwritten before anyone thought to
            capture it. History has to be captured proactively, before the overwrite happens — not
            reconstructed after the fact.
          </Para>
        </HighlightBox>

        <Para>
          This is exactly the gap dbt snapshots exist to close. A snapshot is a mechanism for periodically
          comparing a mutable source table's current state against the last state you captured, and
          recording every change as a new, permanent row — building up a full history of every value a
          column has ever held, for every record, indexed by exactly when each version was true. Once that
          history exists, "what plan was this customer on when they made this purchase" becomes an ordinary
          join against a point in time, instead of an unanswerable question.
        </Para>

        <Table
          headers={['Table type', 'What it shows', 'Can answer historical questions?']}
          rows={[
            ['Mutable source table (e.g. customers)', 'Only the current value of every column, right now.', 'No — the previous value was overwritten and is gone.'],
            ['dbt snapshot of that source table', 'Every value a column has ever held, each tagged with exactly when it was valid.', 'Yes — you can ask "what was true as of any past date" directly.'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 02 — What a snapshot is ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — What a Snapshot Actually Is" />
        <SectionTitle>A Snapshot Is a Special .sql File dbt Runs on Its Own Schedule</SectionTitle>

        <Para>
          A dbt snapshot is a <code>.sql</code> file that lives in a <code>snapshots/</code> directory at
          the root of your project — a separate location from <code>models/</code>, because snapshots are
          not models in the ordinary sense. A model is re-run every time and its output is recomputed from
          scratch (or incrementally, per the incremental-models module). A snapshot is run on a recurring
          schedule via a dedicated command, <code>dbt snapshot</code>, and its job every time it runs is not
          to recompute anything — it is to compare the current state of a source query against the
          snapshot's own last-known state, and append rows for whatever changed.
        </Para>

        <Para>
          The result is a table that only ever grows. Nothing in a snapshot table is ever overwritten or
          deleted by dbt during normal operation (hard deletes are the one exception, covered in Part 07).
          Every run either finds nothing new to record, or appends new rows representing whatever changed
          since the last run. This growing, append-only table is what lets you answer "what did this record
          look like on any given date" — a query pattern known as <strong>Slowly Changing Dimension Type
          2</strong>, or SCD Type 2, a decades-old data warehousing pattern that dbt snapshots implement for
          you without hand-written merge logic.
        </Para>

        <CodeBox label="snapshots/customers_snapshot.sql — the minimal shape">
{`{% snapshot customers_snapshot %}

{{
    config(
      target_schema='snapshots',
      unique_key='customer_id',
      strategy='timestamp',
      updated_at='updated_at',
    )
}}

select
    customer_id,
    plan_tier,
    email,
    updated_at
from {{ source('app_db', 'customers') }}

{% endsnapshot %}`}
        </CodeBox>

        <Para>
          Notice the shape: the query inside a snapshot is an ordinary <code>SELECT</code> against a source
          or another model, exactly like a normal dbt model. What makes it a snapshot is the surrounding
          <code>{'{% snapshot %}'}</code> block and the <code>config()</code> call, which tells dbt how to
          detect changes (the <code>strategy</code>), which column uniquely identifies a record (the
          <code>unique_key</code>), and where to store the resulting history table (the
          <code>target_schema</code>).
        </Para>

        <SubTitle>Running a snapshot</SubTitle>

        <CodeBox label="Running snapshots">
{`dbt snapshot`}
        </CodeBox>

        <Output>{`Running 1 snapshot node

SNAPSHOT customers_snapshot ................................ [INSERT 12 in 0.84s]

Done. PASS=1 WARN=0 ERROR=0 SKIP=0 TOTAL=1`}</Output>

        <Para>
          <code>dbt snapshot</code> is a separate command from <code>dbt run</code> deliberately — models
          get rebuilt on every invocation, but a snapshot's entire value comes from its history being
          preserved across runs, so it would make no sense to fold it into the same command that rebuilds
          transformations from scratch. In production, <code>dbt snapshot</code> is typically scheduled to
          run before <code>dbt run</code>, on a cadence frequent enough to catch changes between runs — often
          hourly or on every scheduled job, so that no change to the source data happens and reverses (an
          upgrade followed immediately by a downgrade) entirely between two snapshot runs, which would leave
          that intermediate state uncaptured.
        </Para>

        <Callout title="A snapshot is not a materialization of a model — it is its own artifact type" color={K}>
          It is tempting to think of a snapshot as "just another materialization," alongside table, view,
          and incremental. It is not configured in the same place (<code>dbt_project.yml</code>'s
          <code>models:</code> section does not apply to it), it is not run by <code>dbt run</code>, and its
          entire purpose — accumulating history rather than representing current state — is fundamentally
          different from what any model materialization does. Treat it as its own first-class concept.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 — timestamp strategy ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The timestamp Strategy" />
        <SectionTitle>timestamp: Detecting Change via a Reliable updated_at Column</SectionTitle>

        <Para>
          dbt supports two strategies for detecting whether a row has changed since the last snapshot run.
          The <code>timestamp</code> strategy is the simpler and generally preferred one: it compares a
          designated <code>updated_at</code> column's value for each record against what was recorded on the
          previous snapshot run. If the timestamp is newer, dbt considers the row changed and records a new
          version. If the timestamp is unchanged, dbt considers the row unchanged and does nothing for it.
        </Para>

        <CodeBox label="Configuring the timestamp strategy">
{`{{
    config(
      target_schema='snapshots',
      unique_key='customer_id',
      strategy='timestamp',
      updated_at='updated_at',
    )
}}`}
        </CodeBox>

        <Para>
          This strategy has exactly one hard requirement: the source system must maintain a genuinely
          reliable <code>updated_at</code> column — one that is guaranteed to be bumped on every single
          write to a row, with no exceptions. If even one code path in the source application updates a row
          without touching <code>updated_at</code> (a bulk backfill script, a direct database migration, an
          admin panel that writes through a different code path than the main application), that change is
          completely invisible to a timestamp-strategy snapshot. dbt will compare the unchanged
          <code>updated_at</code> value, conclude nothing happened, and silently miss a real change to the
          row's other columns.
        </Para>

        <Table
          headers={['Requirement', 'Why it matters']}
          rows={[
            ['updated_at is bumped on every write, no exceptions', 'A snapshot only sees change through this one column — any write path that skips it is invisible to the snapshot.'],
            ['updated_at is monotonically increasing per row', 'A row whose updated_at ever moves backward (a bad clock, a restored backup) can confuse the comparison and cause a real change to be missed.'],
            ['updated_at has enough precision to distinguish rapid successive updates', 'A column truncated to whole days cannot distinguish two updates to the same row on the same day — only the fact that the day changed.'],
          ]}
        />

        <Callout title="This is the strategy to reach for first" color={K}>
          Most application databases already maintain a reliable <code>updated_at</code> or
          <code>modified_at</code> column for their own operational purposes — audit logging,
          cache-invalidation, sync jobs. When that column genuinely covers every write path, the
          <code>timestamp</code> strategy is simpler to reason about and cheaper to run than
          <code>check</code>, because it only has to compare one column's value rather than a whole list of
          them.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 — check strategy ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — The check Strategy" />
        <SectionTitle>check: Detecting Change by Comparing Columns Directly</SectionTitle>

        <Para>
          Not every source table has a trustworthy <code>updated_at</code> column. Some legacy systems never
          added one. Some have one that is unreliable for the reasons in Part 03. Some tables simply do not
          track when they were last modified at all. For all of these cases, dbt offers the
          <code>check</code> strategy: instead of trusting a single timestamp column to signal change, it
          directly compares the current value of a specified list of columns against the values recorded on
          the previous snapshot run. If any of those columns differ, the row is considered changed.
        </Para>

        <CodeBox label="Configuring the check strategy against specific columns">
{`{% snapshot customers_snapshot %}

{{
    config(
      target_schema='snapshots',
      unique_key='customer_id',
      strategy='check',
      check_cols=['plan_tier', 'email', 'billing_country'],
    )
}}

select
    customer_id,
    plan_tier,
    email,
    billing_country
from {{ source('app_db', 'customers') }}

{% endsnapshot %}`}
        </CodeBox>

        <Para>
          <code>check_cols</code> can also be set to the literal string <code>&quot;all&quot;</code>, which
          tells dbt to compare every column selected by the snapshot's query rather than an explicit list.
          This is convenient for a narrow table where you genuinely want any change at all to trigger a new
          snapshot row, but it comes with a real cost: adding a new column to the snapshot's query later, or
          having an upstream column's formatting change in a way that is not actually meaningful (whitespace,
          case), will trigger what looks like a change to every single row the next time the snapshot runs —
          a spurious explosion of new history rows that do not represent any real business change.
        </Para>

        <Table
          headers={['Aspect', 'timestamp strategy', 'check strategy']}
          rows={[
            ['What it compares', 'A single updated_at column\'s value.', 'The explicit values of one or more specified columns.'],
            ['Requires a reliable updated_at?', 'Yes — this is its one hard dependency.', 'No — it does not depend on any timestamp column existing at all.'],
            ['Cost per run', 'Cheap — one column comparison per row.', 'More expensive — every listed column is compared per row.'],
            ['Risk of missed changes', 'High if updated_at is not bumped on every write path.', 'Low — any actual change to a checked column is detected directly.'],
            ['Risk of spurious changes', 'Low.', 'Higher with check_cols="all" — cosmetic or irrelevant column changes register as real changes.'],
          ]}
        />

        <Callout title="Prefer timestamp; reach for check only when you have to" color={K}>
          The practical decision rule: use <code>timestamp</code> whenever the source genuinely maintains a
          trustworthy <code>updated_at</code> column across every write path. Use <code>check</code>,
          scoped to an explicit, deliberately chosen <code>check_cols</code> list rather than
          <code>&quot;all&quot;</code>, when no such column exists — and be specific about which columns
          actually matter for your history, rather than defaulting to comparing everything.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 — SCD Type 2 columns ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — The Columns dbt Adds Automatically" />
        <SectionTitle>dbt_valid_from, dbt_valid_to, and dbt_scd_id</SectionTitle>

        <Para>
          Every snapshot table dbt builds automatically gains three extra columns beyond whatever your
          <code>SELECT</code> query returned. These are the mechanics that make SCD Type 2 querying possible,
          and understanding exactly what each one means is the single most important thing to get right
          about snapshots — most snapshot bugs in practice come from querying these columns incorrectly.
        </Para>

        <Table
          headers={['Column', 'Meaning']}
          rows={[
            ['dbt_valid_from', 'The timestamp at which this specific version of the row became true — when it was first captured with these column values.'],
            ['dbt_valid_to', 'The timestamp at which this version stopped being true — when it was superseded by a newer version. NULL means this version is still current right now.'],
            ['dbt_scd_id', 'A unique surrogate key for this specific historical version of the row — distinct from unique_key, which identifies the underlying entity across all of its versions.'],
          ]}
        />

        <Para>
          The single most load-bearing fact here: <code>dbt_valid_to IS NULL</code> marks the
          <strong> current</strong> record for a given natural key — the one version of that key's row that
          is true right now, as of this moment. A non-null <code>dbt_valid_to</code> marks a
          <strong> historical, superseded</strong> record — one that used to be current but has since been
          replaced by a newer version. At any given moment, exactly one row per <code>unique_key</code> value
          should have a null <code>dbt_valid_to</code> (barring the hard-delete edge case covered in Part 07)
          — all of that key's other rows are history.
        </Para>

        <CodeBox label="What the snapshot table actually looks like after several changes">
{`customer_id | plan_tier | email                | dbt_valid_from       | dbt_valid_to         | dbt_scd_id
------------+-----------+----------------------+----------------------+----------------------+-----------
42          | free      | ana@example.com      | 2026-01-03 09:00:00  | 2026-04-11 14:22:00  | a1b2c3...
42          | pro       | ana@example.com      | 2026-04-11 14:22:00  | 2026-08-02 10:15:00  | d4e5f6...
42          | enterprise| ana@example.com      | 2026-08-02 10:15:00  | NULL                 | g7h8i9...

# Reading this row by row:
# - customer 42 signed up on "free" on Jan 3, and stayed there until Apr 11
# - on Apr 11, they upgraded to "pro" -- the free row's dbt_valid_to closes at that instant
# - on Aug 2, they upgraded again to "enterprise" -- the pro row's dbt_valid_to closes
# - the enterprise row's dbt_valid_to is NULL -- it is the current, still-active version`}
        </CodeBox>

        <Para>
          Every one of these three rows shares the same <code>customer_id</code> (the <code>unique_key</code>
          — it identifies the person), but each has a distinct <code>dbt_scd_id</code> (it identifies this
          specific version of that person's record at that specific point in time). Confusing these two keys
          — joining on <code>dbt_scd_id</code> when you meant the entity's natural key, or expecting
          <code>unique_key</code> alone to identify one row in the snapshot table — is one of the most common
          mistakes newcomers make querying a snapshot for the first time.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 — Querying ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Querying a Snapshot Correctly" />
        <SectionTitle>Current State vs Point-in-Time History</SectionTitle>

        <Para>
          A snapshot table supports two fundamentally different kinds of query, and picking the right one
          depends entirely on the question you are actually asking.
        </Para>

        <SubTitle>Question 1: "What is true right now?"</SubTitle>

        <Para>
          Filter for the row where <code>dbt_valid_to IS NULL</code>. This gives you exactly one row per
          <code>unique_key</code> — the current, still-active version of every entity, which is exactly what
          a normal current-state dimension table would show you.
        </Para>

        <CodeBox label="Current state — one row per customer, their latest values">
{`select
    customer_id,
    plan_tier,
    email
from {{ ref('customers_snapshot') }}
where dbt_valid_to is null`}
        </CodeBox>

        <SubTitle>Question 2: "What was true as of a specific past date?"</SubTitle>

        <Para>
          Filter for the row whose valid window contains the date you care about — where
          <code>dbt_valid_from</code> is on or before that date, and <code>dbt_valid_to</code> is either
          after that date or still null (meaning it was still current then and remains current now).
        </Para>

        <CodeBox label="Point-in-time — what plan was each customer on as of a given date">
{`select
    customer_id,
    plan_tier,
    email
from {{ ref('customers_snapshot') }}
where '2026-05-01' between dbt_valid_from and coalesce(dbt_valid_to, '9999-12-31')`}
        </CodeBox>

        <Para>
          The <code>coalesce(dbt_valid_to, '9999-12-31')</code> pattern is the key idiom here: it treats a
          currently-active row (null <code>dbt_valid_to</code>) as valid all the way out to a date far in the
          future, so the <code>BETWEEN</code> comparison correctly includes the current row for any date up
          to and including today, without needing a separate <code>OR dbt_valid_to IS NULL</code> clause.
        </Para>

        <SubTitle>Answering the original question: joining a fact table against a point-in-time snapshot</SubTitle>

        <Para>
          This is exactly what makes "what plan was this customer on when they made this purchase" answerable
          for the first time. Instead of comparing a fixed literal date, join each purchase's own timestamp
          against the snapshot's valid window.
        </Para>

        <CodeBox label="Joining purchases to the customer's plan at the moment of purchase">
{`select
    p.purchase_id,
    p.purchased_at,
    p.amount,
    cs.plan_tier as plan_tier_at_time_of_purchase
from {{ ref('fct_purchases') }} p
left join {{ ref('customers_snapshot') }} cs
  on p.customer_id = cs.customer_id
  and p.purchased_at between cs.dbt_valid_from and coalesce(cs.dbt_valid_to, '9999-12-31')`}
        </CodeBox>

        <Para>
          Without the snapshot, this join is not possible at all — there is no other place in the warehouse
          where "what plan_tier was true at this exact past instant" is recorded. This single join is the
          entire payoff of building a snapshot in the first place.
        </Para>

        <Callout title="Never filter a snapshot by dbt_valid_from alone for 'current'" color={K}>
          A common mistake is assuming the row with the most recent <code>dbt_valid_from</code> is always the
          current one, and filtering or sorting on that instead of checking <code>dbt_valid_to IS NULL</code>
          directly. In the overwhelming majority of cases these agree, but <code>dbt_valid_to IS NULL</code>
          is the actual contract dbt guarantees — it is the correct filter to reach for by default, not an
          equivalent shortcut.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 — invalidate_hard_deletes ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Handling Hard Deletes" />
        <SectionTitle>invalidate_hard_deletes: Closing Out History for Rows That Vanish</SectionTitle>

        <Para>
          Both the <code>timestamp</code> and <code>check</code> strategies detect change by comparing a
          value from the source query against the last snapshot run. But what happens when a row simply
          disappears from the source entirely — a customer account is hard-deleted from the application
          database, not soft-deleted with a flag? Neither strategy has anything to compare, because there is
          no longer a row in the source at all. Without additional configuration, that customer's last
          snapshot row is simply left open forever: <code>dbt_valid_to</code> stays null, silently implying
          that customer's last known plan is still "current," indefinitely, even though the customer no
          longer exists in the source system at all.
        </Para>

        <CodeBox label="config: invalidate_hard_deletes=True">
{`{% snapshot customers_snapshot %}

{{
    config(
      target_schema='snapshots',
      unique_key='customer_id',
      strategy='timestamp',
      updated_at='updated_at',
      invalidate_hard_deletes=True,
    )
}}

select
    customer_id,
    plan_tier,
    email,
    updated_at
from {{ source('app_db', 'customers') }}

{% endsnapshot %}`}
        </CodeBox>

        <Para>
          With <code>invalidate_hard_deletes=True</code>, dbt compares the full set of <code>unique_key</code>
          values currently present in the source query against the set of keys that currently have an open
          (<code>dbt_valid_to IS NULL</code>) row in the snapshot table. Any key present in the snapshot but
          missing from the source is treated as deleted: dbt closes out that row by setting its
          <code>dbt_valid_to</code> to the time of the snapshot run, and also sets a
          <code>dbt_is_deleted</code> flag column to <code>&#39;True&#39;</code> on that closed row, so
          downstream queries can distinguish "superseded by a newer version" from "the underlying record no
          longer exists in the source at all."
        </Para>

        <CodeBox label="Before and after a hard delete, with invalidate_hard_deletes on">
{`# Before: customer 99 has one open row, still active
customer_id | plan_tier | dbt_valid_from       | dbt_valid_to | dbt_is_deleted
------------+-----------+----------------------+--------------+---------------
99          | pro       | 2026-02-01 08:00:00  | NULL         | False

# Customer 99's account is hard-deleted from the source app_db.customers table
# on 2026-06-15. The next dbt snapshot run notices customer_id=99 is now
# missing from the source query entirely.

# After: the row is closed out, not deleted from the snapshot table itself
customer_id | plan_tier | dbt_valid_from       | dbt_valid_to         | dbt_is_deleted
------------+-----------+----------------------+----------------------+---------------
99          | pro       | 2026-02-01 08:00:00  | 2026-06-15 03:00:00  | True

# The snapshot table itself never loses this row -- it correctly records
# that this customer existed, was on the pro plan, and stopped existing
# in the source as of 2026-06-15. Nothing in the snapshot is ever deleted;
# a hard delete in the source is recorded as a closed, flagged row here.`}
        </CodeBox>

        <Para>
          The distinction to hold onto: <code>invalidate_hard_deletes</code> does not delete anything from
          the snapshot table. It closes out the open row for a key that has disappeared from the source, so
          the "current state" query in Part 06 (<code>dbt_valid_to IS NULL</code>) correctly stops returning
          a customer who no longer exists, while the full history — including the fact that they existed and
          what their last known values were — remains permanently intact in the snapshot table.
        </Para>

        <Callout title="Without this config, deleted source rows corrupt current-state queries silently" color={K}>
          If <code>invalidate_hard_deletes</code> is left off (the default is off) and your source table
          genuinely experiences hard deletes, every "current state" query built against
          <code>dbt_valid_to IS NULL</code> will keep returning rows for entities that no longer exist
          anywhere in the source system, with no error and no warning — the row just never gets closed. This
          is one of the most common ways a snapshot silently drifts out of sync with reality over time.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 — Worked example ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — A Complete Worked Example" />
        <SectionTitle>Snapshotting customers End to End, With a Plan Change Walkthrough</SectionTitle>

        <Para>
          Putting every prior part together: here is a complete, realistic snapshot of a
          <code>customers</code> source table using the <code>timestamp</code> strategy, followed by exactly
          what happens, row by row, across three consecutive snapshot runs as one customer changes plans.
        </Para>

        <CodeBox label="snapshots/customers_snapshot.sql — the complete file">
{`{% snapshot customers_snapshot %}

{{
    config(
      target_schema='snapshots',
      unique_key='customer_id',
      strategy='timestamp',
      updated_at='updated_at',
      invalidate_hard_deletes=True,
    )
}}

select
    customer_id,
    plan_tier,
    email,
    billing_country,
    updated_at
from {{ source('app_db', 'customers') }}

{% endsnapshot %}`}
        </CodeBox>

        <SubTitle>Run 1 — Monday, initial snapshot</SubTitle>

        <CodeBox label="Source table state on Monday, and the resulting snapshot row">
{`# source app_db.customers on Monday:
customer_id=42 | plan_tier=free | email=ana@example.com | updated_at=2026-01-03 09:00:00

# dbt snapshot run on Monday -- no prior snapshot row exists for customer 42,
# so this is a plain insert with an open dbt_valid_to

# snapshots.customers_snapshot after Run 1:
customer_id | plan_tier | dbt_valid_from       | dbt_valid_to
------------+-----------+----------------------+-------------
42          | free      | 2026-01-03 09:00:00  | NULL`}
        </CodeBox>

        <SubTitle>Run 2 — Thursday, the customer upgrades to pro</SubTitle>

        <Para>
          On Thursday, the customer upgrades from <code>free</code> to <code>pro</code> inside the
          application, which correctly bumps <code>updated_at</code> as part of that same write.
        </Para>

        <CodeBox label="Source table state on Thursday, and what the snapshot does">
{`# source app_db.customers on Thursday:
customer_id=42 | plan_tier=pro | email=ana@example.com | updated_at=2026-01-06 11:30:00

# dbt snapshot run on Thursday -- compares this row's updated_at
# (2026-01-06 11:30:00) against the value recorded on the open row from Run 1
# (2026-01-03 09:00:00). The timestamp is newer -- this is a change.

# dbt does two things in this one run:
# 1. closes the existing open row: sets its dbt_valid_to to the current
#    snapshot run's timestamp
# 2. inserts a brand new row with the new values, dbt_valid_from set to
#    this run's timestamp, and dbt_valid_to left NULL (it is now current)

# snapshots.customers_snapshot after Run 2:
customer_id | plan_tier | dbt_valid_from       | dbt_valid_to
------------+-----------+----------------------+----------------------
42          | free      | 2026-01-03 09:00:00  | 2026-01-06 11:30:00
42          | pro       | 2026-01-06 11:30:00  | NULL`}
        </CodeBox>

        <SubTitle>Run 3 — the following Monday, nothing changes</SubTitle>

        <CodeBox label="A snapshot run where the source row is unchanged">
{`# source app_db.customers the following Monday:
customer_id=42 | plan_tier=pro | email=ana@example.com | updated_at=2026-01-06 11:30:00

# dbt snapshot run compares this updated_at against the open row's
# recorded value -- they are identical. No change detected. Nothing happens.

# snapshots.customers_snapshot after Run 3 -- unchanged from Run 2:
customer_id | plan_tier | dbt_valid_from       | dbt_valid_to
------------+-----------+----------------------+----------------------
42          | free      | 2026-01-03 09:00:00  | 2026-01-06 11:30:00
42          | pro       | 2026-01-06 11:30:00  | NULL`}
        </CodeBox>

        <Para>
          After these three runs, both of the questions from Part 06 are now fully answerable for customer
          42. "What plan is this customer on right now?" filters to the pro row via
          <code>dbt_valid_to IS NULL</code>. "What plan were they on when they made a purchase on January
          4th?" joins the purchase's timestamp against the valid window and correctly lands on the
          <code>free</code> row, since January 4th falls between <code>2026-01-03 09:00:00</code> and
          <code>2026-01-06 11:30:00</code> — exactly the information that would have been permanently
          destroyed the moment the application's <code>UPDATE</code> ran, had nothing been snapshotting it.
        </Para>
      </section>

      <Divider />

      {/* ── Part 09 — Performance and retention at scale ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Snapshot Growth, Cost, and Retention" />
        <SectionTitle>A Snapshot Table Only Ever Grows — What That Means Years In</SectionTitle>

        <Para>
          Every earlier Part treats the growing, append-only nature of a snapshot table as a feature, and it
          is — that is precisely what makes point-in-time history possible at all. But "only ever grows" is
          also, unavoidably, a cost curve, and it is worth confronting directly before it becomes a surprise.
          A snapshot with a fine-grained change-detection strategy against a high-churn source, running for
          years without any retention policy, accumulates history at a rate that is easy to underestimate the
          first time you actually compute it.
        </Para>

        <CodeBox label="Working out the growth rate for a real, moderately busy snapshot">
{`# customers_snapshot: 2 million customers, timestamp strategy,
# snapshotted hourly, and roughly 3% of customers have some field
# change in a given day (plan changes, address updates, email changes)

2,000,000 customers × 3% changing per day  ≈ 60,000 new history rows / day
60,000 rows/day × 365 days                 ≈ 21,900,000 new rows / year

# After 5 years of continuous operation, with no pruning at all:
2,000,000 (original rows)
+ 5 × 21,900,000 (five years of accumulated change history)
≈ 111,500,000 total rows in customers_snapshot

# The table that started at 2 million rows is now 55x larger, and every
# one of Part 06's point-in-time queries -- and every dbt snapshot run
# itself, which has to scan the current open rows to compare against --
# is now scanning a table over fifty times its original size.`}
        </CodeBox>

        <Para>
          Two distinct costs grow from this, and they are easy to conflate. The first is storage cost, which
          is usually the smaller concern — cloud warehouse storage is cheap, and a hundred million narrow
          rows is not, by itself, an alarming number. The second, more consequential cost is query and
          maintenance cost: every <code>dbt snapshot</code> run has to identify the currently-open row per
          key to compare against (typically <code>dbt_valid_to IS NULL</code>), and every downstream query —
          including the "current state" query from Part 06, which should be cheap — pays a scan cost that
          grows with total accumulated history rather than staying proportional to the number of distinct
          entities being tracked.
        </Para>

        <Table
          headers={['Factor', 'How it drives snapshot table growth']}
          rows={[
            ['Source row count', 'More entities being tracked means more rows accumulate per change cycle, linearly.'],
            ['Change frequency', 'A source where rows change often (pricing migrations, frequent status updates) produces far more history rows per entity than a source that rarely changes.'],
            ['Snapshot cadence', 'Running dbt snapshot more frequently does not, by itself, add extra history rows for genuinely unchanged data — but a check strategy with check_cols="all" against a noisy source can turn cadence into a growth multiplier (Part 04).'],
            ['Strategy choice', 'A too-broad check_cols="all" configuration can register cosmetic, non-business changes as new history rows, inflating growth well beyond what real business change alone would produce.'],
          ]}
        />

        <SubTitle>Retention and pruning strategies teams actually use</SubTitle>

        <Para>
          dbt itself has no built-in retention or pruning mechanism for snapshot tables — a snapshot is
          deliberately designed to keep everything, forever, by default, since dbt cannot know which
          historical rows a given team's analytical needs will require years from now. Retention is something
          a team layers on top, deliberately, once the growth curve above starts to matter in practice.
        </Para>

        <CodeBox label="A common retention pattern: archive old history to cheaper storage, keep a bounded window hot">
{`-- A scheduled job (outside of dbt itself, e.g. a dbt post-hook or a
-- separate orchestrated task) that moves closed rows older than a
-- retention cutoff out of the actively-queried snapshot table:

create or replace table snapshots.customers_snapshot_archive as
select * from snapshots.customers_snapshot
where dbt_valid_to is not null
  and dbt_valid_to < dateadd('year', -3, current_date());

delete from snapshots.customers_snapshot
where dbt_valid_to is not null
  and dbt_valid_to < dateadd('year', -3, current_date());

-- Point-in-time queries needing more than 3 years back union the archive
-- back in explicitly; routine queries (current state, recent history)
-- only ever scan the smaller, hot snapshot table.`}
        </CodeBox>

        <Para>
          Whether a team needs this at all depends entirely on how far back real analytical questions
          actually reach. Some domains genuinely need unbounded history (regulatory audit trails, financial
          reporting that can be re-opened years later); others realistically never query further back than
          twelve to twenty-four months, in which case archiving anything older keeps the hot table small
          without losing anything anyone actually uses. The decision to prune should be a deliberate,
          business-driven one — never done reflexively just because the row count looks large, since deleting
          history that turns out to be needed later is unrecoverable in exactly the same way the original
          mutable-table overwrite from Part 01 was.
        </Para>

        <Callout title="Never delete open (currently-current) rows during a retention pass" color="#ef4444">
          Any pruning strategy must filter strictly on <code>dbt_valid_to IS NOT NULL</code> and a cutoff on
          <code>dbt_valid_to</code> itself, never on <code>dbt_valid_from</code> or on the row's presence
          alone. A retention job that accidentally sweeps up currently-open rows (those still representing
          live, current state) silently breaks every "current state" query in Part 06 the same way a missing
          <code>invalidate_hard_deletes</code> config does in Part 07 — except this time the row is gone
          entirely, not just stale.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 10 — Snapshots vs hand-rolled SCD2 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Snapshots vs. Hand-Rolled SCD Type 2" />
        <SectionTitle>Why Reach for dbt snapshot Instead of Building the Same Logic in an Incremental Model?</SectionTitle>

        <Para>
          Nothing about SCD Type 2 tracking is exclusive to dbt's snapshot feature — the underlying pattern
          (an <code>dbt_valid_from</code>/<code>dbt_valid_to</code>-style window per version of a row) is a
          decades-old data warehousing technique that predates dbt entirely, and it is entirely possible to
          hand-build the same behavior inside an ordinary incremental model using the mechanics from the
          incremental-models module: a <code>merge</code> strategy, a <code>unique_key</code>, and custom
          Jinja to open and close validity windows manually. Understanding why most teams reach for the
          built-in <code>dbt snapshot</code> mechanism instead of hand-rolling this is really a question about
          which parts of the problem are genuinely custom to your business versus which parts are pure,
          reusable mechanics that a well-tested built-in feature already handles correctly.
        </Para>

        <CodeBox label="A sketch of what hand-rolled SCD Type 2 logic looks like inside an incremental model">
{`{{
  config(
    materialized='incremental',
    unique_key='customer_id_version',
    incremental_strategy='merge'
  )
}}

with source_data as (
    select customer_id, plan_tier, email, updated_at
    from {{ source('app_db', 'customers') }}
),

-- Manually detect which rows changed since the last run by comparing
-- against the CURRENT open version already in this table...
current_versions as (
    select * from {{ this }} where dbt_valid_to is null
),

changed as (
    select s.*
    from source_data s
    left join current_versions c on s.customer_id = c.customer_id
    where c.customer_id is null                  -- brand new customer
       or s.plan_tier != c.plan_tier              -- or something changed
       or s.email != c.email
),

-- ...then hand-construct new open rows AND figure out which existing
-- open rows now need their valid_to closed -- this requires a second
-- statement, or careful UNION logic, that dbt's snapshot mechanism
-- already handles as one coherent operation.

final as (
    select
        customer_id,
        customer_id || '_' || updated_at as customer_id_version,
        plan_tier, email, updated_at as dbt_valid_from,
        cast(null as timestamp) as dbt_valid_to
    from changed
)

select * from final

-- Missing from this sketch entirely: actually closing out the PREVIOUS
-- open row's dbt_valid_to when a new version is inserted -- a MERGE
-- alone can't both close an old row AND insert a new one for the same
-- key in one statement the way dbt's snapshot materialization does.`}
        </CodeBox>

        <Para>
          That last comment is the crux of it: a real SCD Type 2 write is not one operation, it is two
          coupled operations that must happen together — close the previous open row's <code>dbt_valid_to</code>,
          and insert the new row's <code>dbt_valid_from</code> — and getting this coupling exactly right,
          for every edge case (a same-key row that changes twice in one batch, a row that reappears after a
          hard delete, an out-of-order arrival), is genuinely fiddly to hand-write correctly and easy to get
          subtly wrong in a way that does not show up until a point-in-time query returns a gap or an overlap
          months later.
        </Para>

        <Table
          headers={['', 'dbt snapshot (built-in)', 'Hand-rolled SCD2 in an incremental model']}
          rows={[
            ['Opening/closing validity windows correctly, including edge cases', 'Handled entirely by dbt\'s snapshot materialization, tested across dbt\'s own test suite and thousands of production projects.', 'You own writing and testing this logic yourself, including every edge case dbt has already encountered and fixed over years of real-world use.'],
            ['dbt_valid_from / dbt_valid_to / dbt_scd_id columns', 'Generated automatically, with a documented, stable contract (Part 05).', 'You define your own equivalent columns and naming — nothing prevents inconsistency with how the rest of your project (or dbt\'s own docs and tooling) expects a snapshot to look.'],
            ['Hard delete handling', 'invalidate_hard_deletes=True, one config flag (Part 07).', 'You write and maintain your own key-comparison logic to detect and close rows for vanished source keys.'],
            ['Where it\'s configured / run', 'Its own snapshots/ directory and dbt snapshot command — clearly separated from ordinary models (Part 02).', 'Lives in models/ alongside ordinary transformations, which can blur the distinction between "this represents current state" and "this represents accumulating history."'],
            ['When hand-rolling might still make sense', '—', 'A genuinely unusual SCD variant dbt\'s snapshot config can\'t express (e.g. a hybrid Type 2/Type 3 pattern tracking only specific prior values inline), or a warehouse-specific optimization the standard snapshot materialization doesn\'t generate.'],
          ]}
        />

        <Para>
          The practical rule most teams land on: reach for <code>dbt snapshot</code> by default for any
          standard SCD Type 2 need, precisely because the coupled open/close mechanics, the standard column
          contract, and hard-delete handling are exactly the kind of undifferentiated, easy-to-get-subtly-wrong
          logic that a mature, widely-used built-in feature is worth trusting over a custom reimplementation.
          Hand-rolling the same pattern inside an incremental model is worth it only when a project's actual
          requirement falls genuinely outside what <code>strategy</code>, <code>unique_key</code>,
          <code>check_cols</code>, and <code>invalidate_hard_deletes</code> can express together — a real but
          uncommon situation in practice.
        </Para>

        <Callout title="This is the same build-vs-use-the-primitive tradeoff as anywhere else in engineering" color={K}>
          The decision here is not really about SQL cleverness — a skilled engineer absolutely could
          hand-write correct SCD Type 2 logic. It is about which team owns fixing an edge-case bug in that
          logic five years from now, likely after the original author has moved on: dbt's own maintainers and
          a large user base for the built-in mechanism, or whoever on your team happens to inherit an
          unfamiliar custom implementation.
        </Callout>

        <SubTitle>Where hand-rolling genuinely wins: an example</SubTitle>

        <Para>
          One real situation where teams do deliberately step outside <code>dbt snapshot</code>: a Type 3
          slowly-changing pattern, where only the <em>immediately previous</em> value of a small number of
          columns needs to be visible, inline, on the current row itself — not a full growing history table.
          A support-ticketing analytics model that just needs "the customer's previous support tier, alongside
          their current one, on the same row" is a Type 3 need, not a Type 2 one, and forcing it through
          <code>dbt snapshot</code>'s full valid-from/valid-to history table is more machinery than the
          question actually requires.
        </Para>

        <CodeBox label="A Type 3 pattern — previous value inline, no separate history table — hand-rolled deliberately">
{`{{ config(materialized='table') }}

select
    customer_id,
    support_tier as current_support_tier,
    lag(support_tier) over (
        partition by customer_id order by updated_at
    ) as previous_support_tier
from {{ ref('stg_support_tier_changes') }}
qualify row_number() over (partition by customer_id order by updated_at desc) = 1

-- One row per customer, with exactly one column of "what it used to be"
-- inline. No growing history table, no dbt_valid_from/dbt_valid_to
-- bookkeeping -- because the actual business question here never asked
-- for the FULL history, only the single most recent prior value.`}
        </CodeBox>

        <Para>
          The decision test that generalizes from this example: if the real requirement is "show me the
          complete history of every value this ever held, queryable at any point in time," reach for
          <code>dbt snapshot</code> — that is exactly the problem it is built to solve well. If the real
          requirement is narrower — "just the previous value, inline, no need to reconstruct arbitrary past
          states" — a plain model with a window function is simpler, cheaper to maintain, and does not carry
          the unbounded growth curve from Part 09 for a need that never actually required it.
        </Para>

        <Table
          headers={['Signal', 'Points toward']}
          rows={[
            ['Need to answer "what was true as of any arbitrary past date"', 'dbt snapshot (full SCD Type 2)'],
            ['Need only "what was the value immediately before this one"', 'A plain model with lag() — SCD Type 3, no growing history table'],
            ['Source experiences hard deletes that must be reflected in history', 'dbt snapshot with invalidate_hard_deletes=True (Part 07) — a Type 3 pattern has no equivalent concept at all'],
            ['Compliance/audit requirement to prove exactly what was known and when', 'dbt snapshot — a Type 3 pattern discards everything but the single previous value, which will not satisfy an audit asking about three versions ago'],
          ]}
        />

        <Para>
          When genuinely unsure which pattern a new requirement calls for, default to <code>dbt snapshot</code>
          — the cost of a growing history table you end up querying only for "current" and "previous" is
          modest, while the cost of a hand-rolled Type 3 column that later turns out to need real point-in-time
          history is a full, retroactively-impossible rebuild of history that was never actually captured.
        </Para>
      </section>

      <Divider />

      {/* ── Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About dbt Snapshots</SectionTitle>

        {[
          {
            wrong: '"A snapshot is just another kind of materialization, like table or incremental"',
            right: 'A snapshot lives in its own snapshots/ directory, is configured with its own config() block rather than dbt_project.yml\'s models: section, and is run by a completely separate command, dbt snapshot, not dbt run. Its entire purpose — accumulating permanent history rather than representing current state — is fundamentally different from what any model materialization does (Part 02).',
          },
          {
            wrong: '"dbt Time Travel and dbt snapshots solve the same problem"',
            right: 'A warehouse feature like Snowflake Time Travel gives you point-in-time recovery of a table\'s own recent history, bounded by a limited retention window, for disaster-recovery and undo purposes. A dbt snapshot is a deliberate, permanent, growing history table you build for specific dimension tables, with no retention limit imposed by dbt itself, purpose-built for analytical point-in-time queries like "what plan was this customer on." They are complementary, not interchangeable.',
          },
          {
            wrong: '"dbt_valid_from being the most recent value tells you which row is current"',
            right: 'The only correct signal for "is this row current" is dbt_valid_to IS NULL, not the most recent dbt_valid_from. In the overwhelming majority of cases they agree, but dbt_valid_to IS NULL is the actual contract dbt guarantees, and is what invalidate_hard_deletes and the closing logic in Part 07 actually update (Part 05, Part 06).',
          },
          {
            wrong: '"The check strategy is always safer than timestamp, so it should be the default choice"',
            right: 'check compares explicit column values and does not depend on a timestamp column, but it is more expensive per run, and check_cols="all" in particular can register purely cosmetic or irrelevant changes as new history rows. timestamp is the simpler, cheaper, preferred default whenever the source genuinely maintains a reliable updated_at column across every write path (Part 03, Part 04).',
          },
          {
            wrong: '"If a source row is hard-deleted, the snapshot just stops updating it and that\'s fine"',
            right: 'Without invalidate_hard_deletes=True, a hard-deleted source row\'s snapshot entry is left open forever — dbt_valid_to stays NULL indefinitely, so every current-state query keeps returning a row for an entity that no longer exists anywhere in the source. This is exactly what invalidate_hard_deletes exists to close out (Part 07).',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: FONT_MONO }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Real-World Story ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// What This Looks Like at Work" />
        <SectionTitle>What This Looks Like on Day One</SectionTitle>

        <HighlightBox>
          <Para>
            <strong>At HubSpot:</strong> the revenue analytics team is asked why a churn-by-plan-tier report
            keeps showing customers under the plan tier they are on <em>today</em>, even for churn events that
            happened months ago while they were on a completely different tier. The root cause is that
            <code>dim_customers</code> was built directly from the application's mutable
            <code>customers</code> table, which only ever reflects current state. The fix is a
            <code>customers_snapshot</code> using the <code>timestamp</code> strategy against a reliable
            <code>updated_at</code> column already maintained by the application's own audit logging, letting
            the churn report join each churn event's timestamp against the plan tier that was actually valid
            at that moment, per Part 06.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <Para>
            <strong>At Klaviyo:</strong> a customer's email-marketing subscription tier changes several times
            in the same week during a pricing migration — a flurry of upgrades and downgrades as customers
            react to new pricing. The engineering team originally scheduled <code>dbt snapshot</code> to run
            once daily, and discovers that a customer who upgraded and then downgraded again within the same
            day had both changes collapsed into a single new row, since only one snapshot run happened between
            them — the intermediate state was never captured. Moving the schedule to run <code>dbt snapshot</code>
            on every hourly job, not once a day, closes the gap for future changes, though the missed
            same-day transition from before the fix cannot be recovered retroactively — exactly the risk Part
            02 describes when a snapshot cadence is too sparse relative to how often the source actually
            changes.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <Para>
            <strong>At Ramp:</strong> a card-issuing platform hard-deletes a small number of test accounts
            from its production customers table as part of routine data hygiene. Before
            <code>invalidate_hard_deletes</code> was enabled, the finance team's current-active-customers
            dashboard kept counting those deleted test accounts as still active indefinitely, because their
            snapshot rows were never closed out. Enabling <code>invalidate_hard_deletes=True</code>, per
            Part 07, means the next snapshot run correctly detects those keys vanished from the source and
            closes their open rows — and going forward, any real customer account that is hard-deleted is
            handled the same way automatically.
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
            q: 'Why can\'t you just query a mutable source table to answer a historical question like "what plan was this customer on last month"?',
            a: `Per Part 01, a mutable table only stores current state — when a row is updated, the previous value is overwritten and gone, not archived anywhere. There is no clever SQL that can recover a value that no longer exists in the table at all; the information required to answer the historical question was destroyed the moment the overwrite happened.

This is exactly the gap dbt snapshots close: a snapshot proactively captures every change as a new, permanent row before the next overwrite happens, so the history actually exists somewhere to be queried later. Without a snapshot running before the change occurred, the historical value is unrecoverable — snapshotting has to happen in advance of the question being asked, not in response to it.`,
          },
          {
            q: 'Explain what dbt_valid_from, dbt_valid_to, and dbt_scd_id each represent, and how they differ from unique_key.',
            a: `Per Part 05, dbt_valid_from is when a specific version of a row became true, and dbt_valid_to is when that version stopped being true — a NULL dbt_valid_to marks the current, still-active version. dbt_scd_id is a surrogate key unique to that one specific historical version of the row.

unique_key, by contrast, identifies the underlying entity across every version it has ever had — a customer_id, for example — and the same unique_key value appears on every historical row for that customer. Confusing dbt_scd_id with unique_key, or expecting unique_key alone to identify a single row in the snapshot table, is one of the most common mistakes when querying a snapshot for the first time; unique_key can and normally does appear on multiple rows in the same snapshot table, one per historical version.`,
          },
          {
            q: 'When would you choose the check strategy over timestamp, and what is the real cost of check_cols="all"?',
            a: `Per Part 03 and Part 04, timestamp is the simpler and cheaper default, but it has one hard dependency: a genuinely reliable updated_at column that is bumped on every single write path in the source system. If that guarantee doesn't hold — a legacy table with no such column, or one where some write paths skip it — timestamp will silently miss real changes, comparing an unchanged updated_at and concluding nothing happened.

check sidesteps that by comparing explicit column values directly rather than trusting a single timestamp, at the cost of comparing more data per run. check_cols="all" compares every selected column, which means a purely cosmetic change — whitespace, casing, or even adding a new column to the query later — can register as a change across every row, producing a spurious explosion of new history rows that don't represent any real business change. The safer approach is an explicit, deliberately chosen check_cols list scoped to columns that actually matter for the history you're building.`,
          },
          {
            q: 'Walk me through exactly how you would answer "what plan was this customer on when they made this specific purchase," given a customers_snapshot table.',
            a: `Per Part 06, this is a join between the purchase fact table and the snapshot, where the join condition compares the purchase's own timestamp against the snapshot's valid window, rather than joining on a fixed literal date: p.purchased_at BETWEEN cs.dbt_valid_from AND COALESCE(cs.dbt_valid_to, '9999-12-31').

The COALESCE is important — it treats a currently-active row (NULL dbt_valid_to) as valid out to a date far in the future, so a purchase made today still correctly matches the customer's current plan row without needing a separate OR dbt_valid_to IS NULL clause. Without a snapshot in place at all, this question is simply unanswerable, because there is no other place in the warehouse recording what plan_tier was true at that specific past instant — the snapshot is the only source of that information.`,
          },
          {
            q: 'What does invalidate_hard_deletes actually do, and what breaks if you leave it off on a source that experiences hard deletes?',
            a: `Per Part 07, with invalidate_hard_deletes=True, dbt compares the full set of unique_key values present in the current source query against the keys that currently have an open row in the snapshot. Any key that has disappeared from the source is treated as deleted: dbt closes its open row (sets dbt_valid_to to the run's timestamp) and flags it with dbt_is_deleted, without ever removing anything from the snapshot table itself.

Leave it off, and a hard-deleted row's snapshot entry stays open indefinitely — dbt_valid_to remains NULL forever, since nothing ever tells dbt the source row is gone. Every "current state" query filtering on dbt_valid_to IS NULL will keep returning that entity as if it still exists in the source, with no error or warning, which is exactly the kind of silent drift that eventually surfaces as a dashboard quietly overcounting active entities that were deleted months earlier.`,
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
        <SectionTitle>Five Mistakes That Corrupt a Snapshot's History</SectionTitle>

        {[
          {
            title: 'Trusting a timestamp strategy against an updated_at column that isn\'t bumped on every write path',
            detail: 'Per Part 03, any code path in the source application — a bulk backfill, a migration script, an admin tool — that writes without touching updated_at is completely invisible to a timestamp-strategy snapshot. Confirm the reliability of updated_at across every write path before choosing this strategy, not just the main application flow.',
          },
          {
            title: 'Filtering "current state" on the most recent dbt_valid_from instead of dbt_valid_to IS NULL',
            detail: 'These usually agree, but dbt_valid_to IS NULL is the actual contract dbt guarantees for "this is the current version" — it is what invalidate_hard_deletes and the closing logic update directly, per Part 05 and Part 06.',
          },
          {
            title: 'Running dbt snapshot too infrequently relative to how often the source actually changes',
            detail: 'If a value changes and changes back again entirely between two snapshot runs, that intermediate state is never captured and cannot be recovered retroactively — the schedule needs to be frequent enough to catch real change patterns, per Part 02 and the Klaviyo example above.',
          },
          {
            title: 'Leaving invalidate_hard_deletes off on a source table that experiences real hard deletes',
            detail: 'Per Part 07, this leaves deleted entities\' rows open forever, silently corrupting every current-state query built on dbt_valid_to IS NULL by continuing to count entities that no longer exist in the source at all.',
          },
          {
            title: 'Using check_cols="all" without considering what a cosmetic or irrelevant column change does to history',
            detail: 'Per Part 04, comparing every selected column means any change at all — including ones with no real business meaning, or a newly added column — registers as a new history row for every affected record, producing a lot of noise that dilutes the meaningful history you actually wanted to capture.',
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
        <SectionTitle>Snapshot Errors — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: 'Compilation Error: Snapshot "customers_snapshot" does not have a unique_key or is missing required config',
            cause: 'The config() block inside the snapshot is missing one of the required parameters for the chosen strategy — most commonly unique_key, or updated_at when strategy=\'timestamp\' is used without it.',
            fix: 'Check the config() block against the minimal shape in Part 02: target_schema, unique_key, and strategy are always required, plus updated_at for the timestamp strategy or check_cols for the check strategy.',
          },
          {
            error: 'A row that should have closed out (dbt_valid_to set) still shows dbt_valid_to as NULL after the source value clearly changed',
            cause: 'Almost always a timestamp-strategy snapshot where the source\'s updated_at was not actually bumped by whatever process changed the row — a backfill script or migration that wrote directly to the database, bypassing the application code path that normally maintains updated_at.',
            fix: 'Confirm updated_at genuinely changed for that row in the source at the time of the change; if it did not, either fix the write path to always bump it, or switch that table\'s snapshot to the check strategy, which doesn\'t depend on a timestamp column at all.',
          },
          {
            error: 'A hard-deleted customer still appears in every "current state" query built on dbt_valid_to IS NULL',
            cause: 'invalidate_hard_deletes was not enabled on the snapshot config, so dbt has no mechanism to detect that the key disappeared from the source, and the row\'s dbt_valid_to is left open indefinitely.',
            fix: 'Add invalidate_hard_deletes=True to the snapshot\'s config() block, per Part 07, and re-run dbt snapshot — it will retroactively close out any currently-open rows whose keys are no longer present in the source query.',
          },
          {
            error: 'The same unique_key value has two different rows both showing a NULL dbt_valid_to at the same time',
            cause: 'This should never happen under normal snapshot operation and usually indicates the snapshot table was manually edited outside of dbt snapshot, or a strategy/config change was made without accounting for existing history, leaving two "current" versions of the same entity.',
            fix: 'Investigate exactly how the snapshot table came to have two open rows for one key — check for manual DML against the snapshot table, or a strategy switch (e.g. timestamp to check) applied to a table with existing snapshot history without validating the transition first.',
          },
          {
            error: 'A point-in-time join using dbt_valid_from and dbt_valid_to returns zero matching rows for dates before the snapshot began running',
            cause: 'A snapshot can only ever record history starting from the moment it first ran — there is no way to retroactively reconstruct values from before the snapshot existed, since the underlying source table had already overwritten anything older by the time the snapshot started capturing changes.',
            fix: 'This is an inherent limitation, not a bug: accept that history before the snapshot\'s first run date is unrecoverable, and if historical questions further back are genuinely needed, look for another system (an application audit log, a backup, or a data warehouse export) that may have captured that period independently.',
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
          'A mutable source table only shows current state — the moment a value is overwritten, the previous value is gone forever, which is exactly what breaks historical questions like "what plan was this customer on when they made this purchase."',
          'A dbt snapshot is a special .sql file in snapshots/, run by its own dbt snapshot command, that compares current source data against the snapshot\'s last-known state and appends new rows for whatever changed — building a permanent, append-only SCD Type 2 history table.',
          'The timestamp strategy compares a reliable updated_at column and is the cheaper, preferred default; the check strategy compares explicit column values directly and is the fallback when no trustworthy updated_at exists.',
          'dbt automatically adds dbt_valid_from, dbt_valid_to, and dbt_scd_id — dbt_valid_to IS NULL is the one correct signal for "this is the current version," and dbt_scd_id (not unique_key) identifies one specific historical row.',
          'Query current state with dbt_valid_to IS NULL, and point-in-time history with a date BETWEEN dbt_valid_from AND COALESCE(dbt_valid_to, \'9999-12-31\') — the second pattern is what makes joining a fact table to historical dimension state possible at all.',
          'invalidate_hard_deletes=True closes out a snapshot row when its key disappears from the source entirely; without it, a hard-deleted entity\'s row is left open forever and silently corrupts every current-state query built against dbt_valid_to IS NULL.',
        ]}
      />
    </LearnLayout>
  )
}
