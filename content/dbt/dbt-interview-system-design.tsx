import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import Link from 'next/link'

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

export default function DbtInterviewSystemDesign() {
  return (
    <LearnLayout
      title="dbt Interview and System Design Guide"
      description="The capstone module for the dbt track: full worked system-design interview questions synthesizing project structure, testing, incremental models, CI/CD, and migration strategy, plus a complete vocabulary cheat sheet, common interview traps, and rapid-fire conceptual Q&A."
      section="dbt — Module 20"
      readTime="90 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'dbt Interview and System Design Guide', href: '/learn/dbt/dbt-interview-system-design' },
      ]}
      prev={{ title: 'Testing Strategy and Data Quality at Scale', href: '/learn/dbt/testing-strategy-at-scale' }}
    >
      {/* ── Opening ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// The Capstone Module" />
        <SectionTitle>You Have Completed All 19 Prior dbt Modules. Here Is How It Comes Together.</SectionTitle>
        <HighlightBox>
          <Para>
            <strong>This module is different from the previous 19.</strong> It does not introduce new dbt
            mechanics. It is a synthesis — a place where project structure, testing strategy, incremental
            models, snapshots, macros, CI/CD, and performance all show up together, the way they actually do
            in a real analytics-engineering system-design interview or a real architecture review, instead of
            one concept at a time.
          </Para>
          <Para>
            A dbt system-design interview almost never asks "what does <code>ref()</code> do." It asks
            "design a dbt project for a company with five source systems and three analytics teams," or "walk
            through debugging why an incremental model's row counts don't match a full refresh," and expects
            you to arrive at a layered <code>staging → intermediate → marts</code> structure, a specific
            testing strategy, and a specific incremental debugging methodology as the natural consequence of
            reasoning through the problem — not as a memorized fact recited on cue. That is the skill this
            module builds: taking everything from Modules 01 through 19 and using it to reason through a
            system from a cold start, out loud, the way an interviewer actually wants to see it happen.
          </Para>
          <Para>
            Work through the worked examples below the way you would in a real interview — read the prompt,
            pause, sketch your own answer before reading the walkthrough, then compare. The rapid-fire
            section and vocabulary table near the end are for cramming; the worked system-design parts are
            for genuinely practicing the reasoning.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Interview methodology ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Interview Methodology" />
        <SectionTitle>A Reusable Structure for Any dbt System-Design Prompt</SectionTitle>
        <Para>
          Every worked example in this module, from Part 01 through Part 12, follows the same structure
          deliberately, because that structure is itself the thing interviewers are evaluating — more than
          any single correct answer. Internalizing this shape means a genuinely unfamiliar prompt on
          interview day is still approachable, because the process for attacking it is the same one practiced
          repeatedly below.
        </Para>
        <Table
          headers={['Step', 'What to actually do', 'Why interviewers weight this step heavily']}
          rows={[
            ['1. Requirements gathering', 'Ask about team structure, source system count, data volume, freshness needs, and who consumes the output before proposing any folder or model.', 'A design built on assumed requirements that turn out wrong is a design for the wrong problem — interviewers are testing whether you ask, not whether you guess correctly.'],
            ['2. Layering and naming', 'Decide staging, intermediate, and marts boundaries, and justify why each model lives where it does.', 'The layering decision is the single choice with the most downstream consequences in almost any dbt project — interviewers listen closely for how it is justified, not just recited.'],
            ['3. Materialization strategy', 'Choose view, table, incremental, or ephemeral per model as a deliberate consequence of volume and freshness needs, not a default.', 'This is where "just make everything a table" gets tested directly — see this module\'s interview-traps section.'],
            ['4. Testing and CI strategy', 'Decide which tests matter most, where singular tests are needed over generic ones, and how CI validates a change before merge.', 'A design with no testing or CI story reads as incomplete even if the modeling layer is otherwise excellent.'],
            ['5. Trade-offs stated out loud', 'Name what the design gives up, not just what it achieves — a staleness window, a migration risk, an operational cost.', 'A design presented with no acknowledged weaknesses reads as either inexperienced or evasive; naming trade-offs unprompted is a strong, deliberately practiced signal.'],
          ]}
        />
        <Para>
          Notice this structure never starts with "here's the folder structure" — it starts with questions.
          Interviewers consistently report that the single most common mistake in a system-design interview,
          dbt-specific or otherwise, is a candidate leaping straight to a directory tree before establishing
          what problem that structure is actually meant to solve. Every worked example in this module opens
          with requirements gathering for exactly this reason, not as a formality.
        </Para>
        <Callout title="Practice narrating, not just solving" color={K}>
          A correct design reasoned through silently and then announced as a finished answer loses most of
          its interview value. The five-step structure above is meant to be spoken out loud, in order, as you
          work through it — the interviewer is evaluating the reasoning process at least as much as the final
          project layout, and a narrated process is the only way they can actually observe it.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 01 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Worked System Design" />
        <SectionTitle>Design a dbt Project Structure for a Company With 5 Source Systems and 3 Analytics Teams</SectionTitle>
        <SubTitle>Requirements gathering</SubTitle>
        <Para>
          Before touching a folder structure at all, a strong candidate asks clarifying questions, because
          the right layout depends entirely on the answers. For this prompt: what are the five source
          systems — a production application database, a payments processor, a marketing/ads platform, a
          support ticketing tool, and an HR system, say? Do the three analytics teams (finance, marketing,
          product) share any common entities, like a customer or an order? Does each team own and maintain
          its own marts, or does a central platform team own everything?
        </Para>
        <Para>
          Reasonable answers for this exercise: the five sources are a production Postgres app database, a
          Stripe payments export, a Google/Meta ads export, Zendesk, and Workday. Finance, marketing, and
          product all need a shared notion of "customer" and "order," but each also has team-specific metrics
          (finance needs revenue recognition, marketing needs attribution, product needs feature usage). A
          small central platform team owns shared models; each analytics team owns its own team-specific
          marts on top of those shared models.
        </Para>
        <SubTitle>Layering — staging, intermediate, and marts, exactly as the project-structure module frames it</SubTitle>
        <Para>
          One staging model per source table, each doing only light cleanup — renaming, type casting, no
          joins — living under <code>models/staging/&lt;source_system&gt;/</code>. This one-to-one mapping
          between a staging model and a source table is what keeps the base of the DAG traceable back to
          exactly where each column originated, and it is the layer every other model in the project
          ultimately depends on through <code>ref()</code>, never a raw table name directly.
        </Para>
        <CodeBox label="the folder structure">
{`models/
  staging/
    stripe/
      stg_stripe__charges.sql
      stg_stripe__customers.sql
    postgres_app/
      stg_app__orders.sql
      stg_app__customers.sql
    zendesk/
      stg_zendesk__tickets.sql
    ads/
      stg_ads__campaign_spend.sql
    workday/
      stg_workday__employees.sql

  intermediate/
    int_customers_unified.sql      -- owned by the platform team
    int_orders_with_charges.sql    -- owned by the platform team

  marts/
    finance/
      fct_revenue_recognition.sql
      dim_customers_finance.sql
    marketing/
      fct_campaign_attribution.sql
    product/
      fct_feature_usage.sql
    shared/
      dim_customers.sql            -- the shared, cross-team customer dimension
      dim_orders.sql`}
        </CodeBox>
        <Para>
          The <code>marts/shared/</code> subfolder is the key structural decision here: it holds the customer
          and order dimensions every team needs in common, owned by the platform team, while
          <code>marts/finance/</code>, <code>marts/marketing/</code>, and <code>marts/product/</code> hold
          each team's own metrics built on top of the shared layer. This mirrors exactly the layered
          dependency direction the project-structure module establishes — staging feeds intermediate, which
          feeds shared marts, which feed team marts — with no team mart ever bypassing the shared layer to
          join two staging models directly, which would silently create three different, possibly
          inconsistent definitions of "customer."
        </Para>
        <SubTitle>Ownership and access control across teams</SubTitle>
        <Table
          headers={['Layer', 'Who can modify it', 'Why']}
          rows={[
            ['staging/', 'Platform team, or the team closest to a given source system.', 'Changes here affect every downstream model across every team — highest blast radius, tightest review.'],
            ['intermediate/ and marts/shared/', 'Platform team only, PRs reviewed by platform.', 'A shared dimension used by three teams must have one owner making deliberate, coordinated changes, not three teams independently editing it.'],
            ['marts/finance/, marts/marketing/, marts/product/', 'The owning team, with platform review optional for cross-cutting concerns.', 'Team-specific logic changes frequently and should not require a platform team bottleneck for every iteration.'],
          ]}
        />
        <SubTitle>Trade-offs worth stating out loud in an interview</SubTitle>
        <Para>
          Centralizing the customer and order dimensions under platform-team ownership creates a single
          source of truth, but it also creates a bottleneck: a marketing analyst who needs one new column on
          <code>dim_customers</code> now depends on the platform team's review queue rather than shipping the
          change themselves. A strong answer names this trade-off explicitly and proposes a mitigation — a
          documented contribution process letting any team open a PR against the shared layer with mandatory
          platform review, rather than the platform team being the only one who can even propose a change.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Worked System Design" />
        <SectionTitle>How Would You Migrate a Legacy Stored-Procedure-Based Transformation Pipeline to dbt With Minimal Risk?</SectionTitle>
        <SubTitle>Requirements gathering — this prompt is about migration risk, not a clean-slate design</SubTitle>
        <Para>
          The critical difference from Part 01: this system already exists and already works, just as a
          tangle of nightly stored procedures nobody fully trusts to modify anymore. The interview is testing
          whether a candidate defaults to "rewrite everything in dbt at once" versus a lower-risk incremental
          migration. Key questions: how many stored procedures, and do they have clear boundaries or is
          business logic tangled across several of them? Who depends on the current output, and can that
          output be validated against a new pipeline before cutover?
        </Para>
        <Para>
          Reasonable answers: roughly 60 stored procedures, several with genuinely tangled, undocumented
          logic that the original author has since left the company. A handful of downstream BI dashboards
          and one exported finance report depend on the final tables. Nobody wants a single big-bang cutover
          given how poorly understood some of the procedures are.
        </Para>
        <SubTitle>The migration approach — strangler-fig, one leaf table at a time, validated in parallel</SubTitle>
        <Para>
          The right first move is not rewriting all 60 procedures into dbt models simultaneously — that
          concentrates all the migration risk into one moment and makes rollback nearly impossible if
          something is subtly wrong. The right approach is the strangler-fig pattern: pick the stored
          procedures with the fewest downstream dependents (the leaves of the dependency graph) first, port
          each to a dbt model, run both the old procedure and the new dbt model in parallel for a validation
          window, and only decommission the old procedure once outputs match consistently.
        </Para>
        <CodeBox label="the migration sequence">
{`Phase 1 (lowest-risk leaves first):
  Identify stored procedures with zero downstream dependents inside the
  legacy pipeline itself -- these are safest to port first because nothing
  else breaks if the port has a subtle bug, since nothing downstream
  consumes them within the legacy system.

Phase 2 (parallel run per ported model):
  Old stored procedure keeps running on its existing schedule, untouched.
  New dbt model (using ref()/source() from day one, not raw table names)
  builds into a separate validation schema on the same schedule.
  A validation query diffs row counts and key aggregate columns between
  the two outputs nightly.

Phase 3 (cutover, one model at a time):
  Once a specific ported model's outputs match consistently for an agreed
  window (two weeks is common), downstream consumers are repointed to the
  dbt-built table, and the corresponding stored procedure is disabled but
  not deleted yet.

Phase 4 (move up the dependency graph):
  Repeat for procedures whose only remaining dependents are already-
  migrated dbt models -- the dependency graph naturally determines the
  order, always migrating leaves before the procedures that feed them.

Phase 5 (decommission):
  Once every procedure has been ported and validated, the legacy
  scheduler and stored procedure code are removed entirely.`}
        </CodeBox>
        <Para>
          Migrating leaves first and moving up the dependency graph is the same underlying idea as the
          project-structure module's staging-before-marts layering principle, applied to a migration rather
          than a greenfield build: never migrate something before everything downstream of it (or, here,
          everything it depends on) is in a known state.
        </Para>
        <Callout title="Where snapshots matter during this specific migration" color={K}>
          If any of the legacy stored procedures depend on slowly-changing dimension logic — capturing how a
          customer's attributes looked at a point in time — that logic needs to be ported to a dbt snapshot,
          not a plain incremental model, per the snapshots module. A common migration bug is porting
          SCD-style stored-procedure logic into an ordinary model that only reflects current state, silently
          losing historical point-in-time accuracy the old system had.
        </Callout>
        <SubTitle>Trade-offs to state explicitly</SubTitle>
        <Para>
          Running two pipelines in parallel during validation roughly doubles compute cost for every model
          still mid-migration, and it takes real calendar time — pushing for a faster cutover trades away the
          exact safety net this approach is built around. A strong answer states this cost plainly rather than
          presenting the migration as free, and frames the validation window's length as a deliberate,
          negotiated risk tolerance rather than an arbitrary number.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Worked System Design" />
        <SectionTitle>Design a Testing and CI Strategy for a 300-Model dbt Project With a Small Platform Team</SectionTitle>
        <SubTitle>Requirements gathering</SubTitle>
        <Para>
          How many people maintain this project, and how many PRs merge per day? What is the cost of a
          silently wrong number reaching a dashboard versus the cost of tests being so slow or so noisy that
          engineers start ignoring failures? Are there specific tables (a revenue table, a customer PII
          table) where correctness matters more than others?
        </Para>
        <Para>
          Reasonable answers: a platform team of three people supports roughly 300 models with a dozen PRs
          merging most days. A wrong number reaching the finance revenue dashboard is a genuinely costly
          incident; a flaky test that fails intermittently for unrelated reasons is actively eroding trust in
          the whole test suite, per the testing-strategy-at-scale module's framing of alert fatigue.
        </Para>
        <SubTitle>Layered testing strategy — not "test everything the same amount"</SubTitle>
        <Table
          headers={['Model tier', 'Testing depth', 'Why']}
          rows={[
            ['Staging models', 'Generic tests only — not_null and unique on primary keys, relationships where a foreign key genuinely must resolve.', 'These are thin, mechanical transformations; the main risk is a source schema change, which generic tests catch cheaply.'],
            ['Shared intermediate/mart models (customer, order dimensions)', 'Generic tests plus singular tests for business rules that generic tests cannot express, e.g. "total order amount never exceeds a sane upper bound."', 'Every downstream model depends on these being correct — the cost of a bug here is the highest of any tier.'],
            ['Team-specific marts (a single team\'s revenue-recognition logic)', 'Singular tests encoding the specific business rule at stake, reviewed by someone who understands the domain, not just generic dbt tests.', 'Generic tests cannot express domain-specific correctness like revenue recognition timing; this needs custom, deliberately written assertions.'],
          ]}
        />
        <Para>
          A common mistake a weaker answer makes here is proposing the exact same test depth uniformly across
          all 300 models — either far too little (missing the business-rule bugs that matter most) or far too
          much (a platform team of three cannot maintain hundreds of exhaustive singular tests, and test
          maintenance burden becomes its own operational problem). Tiering test depth by blast radius and
          business criticality, not by applying one policy everywhere, is the answer interviewers are
          listening for.
        </Para>
        <SubTitle>CI strategy for a three-person platform team supporting a dozen PRs a day</SubTitle>
        <Para>
          At this PR volume, a full-project build on every PR is immediately disqualifying on cost and speed
          grounds alone — exactly the problem the cicd-for-dbt module's Slim CI pattern solves. Every PR
          triggers <code>dbt build --select state:modified+ --state ./prod-manifest --defer</code>, building
          only the changed models and their downstream dependents against a manifest published after the most
          recent production deploy, with unbuilt upstream models resolved to production via
          <code>--defer</code>.
        </Para>
        <CodeBox label="the CI gate for a small platform team supporting many daily PRs">
{`# Required status check, cannot be bypassed:
dbt build --select state:modified+ --state ./prod-manifest --defer --favor-state

# Additionally, for PRs touching marts/shared/ or marts/finance/ specifically,
# require an explicit platform-team review in addition to a green CI check --
# CI catches broken SQL and failing tests, but a second human reviewer is
# still the check for a business-logic error that compiles and passes tests
# while still being wrong.`}
        </CodeBox>
        <Para>
          With only three platform engineers, the highest-leverage additional investment is not more tests
          everywhere — it is making the required CI check fast and reliable enough that engineers trust it
          completely, and reserving scarce human review time specifically for the highest-blast-radius
          folders (<code>marts/shared/</code>) rather than spreading review attention evenly across all 300
          models regardless of risk.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Worked System Design" />
        <SectionTitle>Walk Through Debugging Why an Incremental Model's Row Counts Don't Match a Full Refresh</SectionTitle>
        <SubTitle>Framing the problem before touching any SQL</SubTitle>
        <Para>
          This prompt tests methodical debugging more than any single piece of dbt trivia. The naive response
          is guessing at the SQL immediately; the strong response states a hypothesis-elimination process out
          loud first, because an incremental-versus-full-refresh row count mismatch has a small, well-known
          set of actual causes, and working through them systematically is faster than guessing.
        </Para>
        <Table
          headers={['Hypothesis', 'How to check it', 'What confirms it']}
          rows={[
            ['The is_incremental() filter window is wrong (too narrow, missing late-arriving rows)', 'Compare max(updated_at) in the incremental table against the true max in the source.', 'The incremental table is missing rows the source genuinely has, specifically ones near the filter boundary.'],
            ['The incremental strategy silently duplicates rather than upserts (merge vs. append misconfiguration)', 'Check for duplicate unique_key values in the incremental table that do not exist in a fresh full-refresh build.', 'Row count is too HIGH, not too low, and specific keys appear more than once.'],
            ['A source system backfill or late update was not re-captured because it fell outside the incremental filter\'s lookback window', 'Check whether any source rows were updated after their original insert but before the incremental model\'s last run, filtered out because the filter only looks at the row\'s original timestamp.', 'The row exists but reflects stale (pre-update) values, not just a missing row.'],
            ['The unique_key config itself is wrong or composite when it should not be, causing the merge to match on the wrong grain', 'Check the model\'s unique_key config against the table\'s actual intended grain.', 'Rows that should be distinct are being merged together, or rows that should merge are producing duplicates.'],
          ]}
        />
        <SubTitle>The single fastest diagnostic — a full-refresh diff</SubTitle>
        <Para>
          Rather than reasoning abstractly about which hypothesis is correct, the fastest concrete step is
          running <code>dbt run --select model_name --full-refresh</code> into a separate comparison schema
          and directly diffing it against the existing incrementally-built table — exactly the diagnostic the
          incremental-models module recommends for exactly this situation.
        </Para>
        <CodeBox label="the diagnostic diff query">
{`-- Build a full-refresh copy into a scratch schema for comparison:
-- dbt run --select fct_orders --full-refresh --target scratch

SELECT
  incr.order_id,
  incr.total_amount AS incremental_amount,
  full.total_amount AS full_refresh_amount
FROM analytics.fct_orders incr
FULL OUTER JOIN scratch.fct_orders full
  ON incr.order_id = full.order_id
WHERE incr.order_id IS NULL          -- present in full refresh, missing incrementally
   OR full.order_id IS NULL          -- present incrementally, missing in full refresh (duplicate cause)
   OR incr.total_amount != full.total_amount   -- present in both, but stale in the incremental version`}
        </CodeBox>
        <Para>
          This single query answers which of the four hypotheses above is actually true: rows only missing
          from the incremental side point at the filter-window hypothesis; rows only present incrementally
          (duplicated) point at the merge-strategy hypothesis; rows present in both but with different values
          point at the late-arriving-update hypothesis. Rather than guessing, the diff tells you which
          direction to keep investigating.
        </Para>
        <Callout title="The general lesson behind this specific bug" color={K}>
          A full refresh is the ground truth an incremental model is always implicitly claiming to
          approximate faster. Any time an incremental model's correctness is in question, diffing it against
          a fresh full refresh is the fastest way to convert a vague "something's wrong" into a specific,
          falsifiable finding — this generalizes well beyond row-count mismatches to almost any suspected
          incremental-model bug.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Worked System Design" />
        <SectionTitle>Design a Slowly-Changing-Dimension Strategy for a Customer Table With Frequent Attribute Changes</SectionTitle>
        <SubTitle>Requirements gathering</SubTitle>
        <Para>
          What specifically changes on a customer record, and how often — an email address, a subscription
          tier, a billing address? Does any downstream analysis need to know what a customer's attributes
          were at a specific point in the past (e.g. "what tier was this customer on when they churned"), or
          is only the current value ever needed? What is the acceptable latency between a source change and
          that change being reflected?
        </Para>
        <Para>
          Reasonable answers: subscription tier and billing address change several times a month per active
          customer; email changes rarely. Finance specifically needs historical accuracy — "what tier was
          this customer on in the month a given invoice was generated" is a real, recurring business question,
          not a hypothetical. A few hours of latency on capturing a change is acceptable.
        </Para>
        <SubTitle>Why this needs a Type 2 snapshot, not just an incremental model</SubTitle>
        <Para>
          An ordinary incremental model, even a well-built one, only ever represents the current state of a
          row per key — updating a customer's tier in place when the source changes. That is the wrong tool
          the moment finance needs to ask what a customer's tier was in the past, because an update-in-place
          model has already destroyed that history by the time anyone asks the question. This is exactly the
          distinction the snapshots module draws: a Type 2 snapshot instead inserts a new row with a new
          validity window every time a tracked column changes, preserving every historical value rather than
          overwriting it.
        </Para>
        <CodeBox label="the snapshot configuration">
{`{% snapshot customers_snapshot %}

{{
    config(
      target_schema='snapshots',
      unique_key='customer_id',
      strategy='timestamp',
      updated_at='updated_at',
    )
}}

SELECT
  customer_id,
  email,
  subscription_tier,
  billing_address,
  updated_at
FROM {{ source('app', 'customers') }}

{% endsnapshot %}`}
        </CodeBox>
        <Para>
          Each snapshot run compares the current source row against the latest snapshotted version for that
          <code>customer_id</code>. If <code>subscription_tier</code> or any other tracked column differs, dbt
          closes out the previous row (setting its <code>dbt_valid_to</code>) and inserts a new row with
          <code>dbt_valid_from</code> set to now — giving every historical tier change a precise, queryable
          validity window, exactly the point-in-time query finance needs.
        </Para>
        <CodeBox label="answering finance's actual question against the snapshot">
{`SELECT s.subscription_tier
FROM snapshots.customers_snapshot s
WHERE s.customer_id = 4821
  AND '2026-06-15' >= s.dbt_valid_from
  AND ('2026-06-15' < s.dbt_valid_to OR s.dbt_valid_to IS NULL)`}
        </CodeBox>
        <SubTitle>Snapshot cadence and the trade-off it implies</SubTitle>
        <Para>
          Snapshots only capture a change if they happen to run while that change is the current value at
          snapshot time — a customer whose tier changes twice between two snapshot runs will have the first
          change silently missed, with the snapshot only ever recording the value present at each actual run.
          Given the "a few hours of latency is acceptable" requirement established up front, an hourly
          snapshot run is a reasonable trade-off; a customer changing tier twice within the same hour is rare
          enough to accept the small risk of missing an intermediate value, but this trade-off should be
          stated explicitly rather than left implicit.
        </Para>
        <Callout title="Where this connects back to project structure and testing" color={K}>
          The snapshot itself lives outside the normal staging/marts layering (in its own <code>snapshots/</code>
          top-level directory, per the project-structure module), and a downstream mart that needs current
          state rather than history simply filters the snapshot to <code>dbt_valid_to IS NULL</code>. A
          not_null test on <code>dbt_valid_from</code> and a test confirming no two rows for the same key have
          overlapping validity windows are the two tests worth adding specifically for a snapshot, beyond the
          usual staging-layer generic tests.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Worked System Design" />
        <SectionTitle>Design a dbt Project That Serves Both Fast-Moving Ad Hoc Analytics and a Stable, Audited Finance Reporting Layer</SectionTitle>
        <SubTitle>Requirements gathering</SubTitle>
        <Para>
          Do ad hoc analytics and finance reporting need the same underlying data, just consumed
          differently, or genuinely different data? How often does the ad hoc analytics team want to iterate
          on new metrics compared to how often the finance reporting layer can tolerate a definition changing?
          What auditability does finance actually require — a full change history of every model's definition,
          or just confidence that today's numbers are correct?
        </Para>
        <Para>
          Reasonable answers: both consume the same underlying order and revenue data, but ad hoc analytics
          wants to experiment with new metrics weekly, while finance's reporting definitions must stay stable
          for an entire fiscal quarter at a time and need every change reviewed and traceable. Finance
          specifically needs to be able to say, months later, exactly what logic produced a given historical
          number.
        </Para>
        <SubTitle>Separating "exploration" from "the audited source of truth" structurally, not just by convention</SubTitle>
        <Para>
          The wrong answer here is one shared marts layer that both teams edit with the same review bar — a
          fast-iterating analytics team will inevitably want to change a metric definition in a way that,
          however reasonable in isolation, silently breaks a number finance already reported to auditors. The
          right answer is a structural split: a stable, tightly-reviewed <code>marts/finance/</code> layer
          that only changes through a deliberate, documented process, and a separate, looser
          <code>marts/exploratory/</code> or similarly-named layer where ad hoc analytics can iterate freely.
        </Para>
        <CodeBox label="the layering and its governance">
{`marts/
  finance/                 -- stable, audited, quarter-locked definitions
    fct_revenue_recognized.sql
    dim_customers_finance.sql
  exploratory/              -- ad hoc analytics, iterates weekly, looser review
    metric_experiments/
      new_ltv_definition_v3.sql

Governance:
  marts/finance/* requires two reviewers, including one from the finance
  team itself, and any PR touching it must document exactly what changed
  and why in the PR description -- this becomes the audit trail finance needs.

  marts/exploratory/* requires one reviewer, any platform or analytics
  engineer, and is explicitly documented as "not guaranteed stable" in
  its own README so nobody builds a permanent dashboard on it by mistake.`}
        </CodeBox>
        <Para>
          Once a metric defined in <code>marts/exploratory/</code> proves useful and stable enough that
          finance wants to adopt it, it gets deliberately "promoted" — rebuilt or moved into
          <code>marts/finance/</code> under finance's stricter review process, rather than the exploratory
          version silently becoming load-bearing for an audited report while still living under the loose
          governance it was built under.
        </Para>
        <SubTitle>Where documentation and version control do the audit work</SubTitle>
        <Para>
          Git history on <code>marts/finance/</code> is itself the change-history audit trail finance needs
          — every change to a finance model is a reviewed, timestamped, attributed commit, exactly the kind
          of record an auditor asking "what logic produced Q2's revenue number" can be pointed at directly.
          Combining this with dbt's persisted column and model descriptions (per the documentation module)
          means finance's audit story is "read the git history and the generated docs for this specific
          model," not a separate audit system bolted on afterward.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Worked System Design" />
        <SectionTitle>A dbt Model Is Timing Out in Production but Runs Fine Locally — Diagnose and Fix It</SectionTitle>
        <SubTitle>Requirements gathering, even for a debugging prompt</SubTitle>
        <Para>
          What is different between the local run and the production run beyond just data volume — same
          warehouse size, same materialization, same data recency? Is this model incremental or a full table
          rebuild every run? Did this start happening suddenly, or has it been gradually getting slower?
        </Para>
        <Para>
          Reasonable answers: the model is a table materialization (not incremental), local development uses
          a small sampled subset of data via a dev-target row limit, and production runs against the full,
          multi-billion-row source table. The slowdown has been gradual over several months as the source
          table has grown, not sudden.
        </Para>
        <SubTitle>Why "runs fine locally" is close to meaningless here</SubTitle>
        <Para>
          A local dev run against a small sampled dataset validates that the SQL is logically correct — it
          says almost nothing about whether that SQL scales to production data volume. This is the single
          most common false signal in exactly this kind of prompt: a candidate who treats "it works locally"
          as evidence the SQL itself is fine is missing that the entire problem is likely a volume-scaling
          issue the local environment was never capable of surfacing in the first place.
        </Para>
        <SubTitle>The fix — convert to incremental, and specifically diagnose why the full rebuild got slow</SubTitle>
        <Para>
          Given a full table rebuild every run against ever-growing data, per the performance-tuning-dbt
          module's guidance, the model is very likely a strong candidate for converting from a
          <code>table</code> materialization to <code>incremental</code>, so each run only processes new or
          changed rows instead of reprocessing the entire growing history every single time.
        </Para>
        <CodeBox label="converting the model to incremental">
{`{{
  config(
    materialized='incremental',
    unique_key='event_id',
    incremental_strategy='merge',
    on_schema_change='append_new_columns',
  )
}}

SELECT *
FROM {{ source('app', 'events') }}

{% if is_incremental() %}
  WHERE updated_at > (SELECT max(updated_at) FROM {{ this }})
{% endif %}`}
        </CodeBox>
        <Para>
          Before finalizing this as the answer, a strong candidate also checks whether the underlying query
          itself has a scaling problem independent of materialization — an unfiltered join fanning out
          unexpectedly at higher volume, a missing partition filter on the source table forcing a full table
          scan, or a window function computed over the entire table instead of a bounded window. Converting
          to incremental fixes "reprocessing everything every run"; it does not fix a query that is
          fundamentally inefficient per row it does process, and both should be checked rather than assuming
          incrementality alone is the complete fix.
        </Para>
        <Callout title="Confirming the fix actually worked" color={K}>
          After converting to incremental, the diagnostic from Part 04 above — a full-refresh diff against
          the previous table materialization's output — is exactly the right validation step here too:
          confirming the incremental version produces identical results to the old full-table version before
          trusting it in production, not just confirming it runs faster.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Worked System Design" />
        <SectionTitle>Design a Macro and Package Strategy for a dbt Project Shared Across Three Business Units That Each Use a Different Warehouse</SectionTitle>
        <SubTitle>Requirements gathering</SubTitle>
        <Para>
          Do the three business units genuinely need different SQL per warehouse, or just the same logical
          transformation expressed portably? Is there existing duplicated logic across the three units'
          separate dbt projects today — the same surrogate-key generation, the same date-spine logic, each
          hand-rolled three separate times? Is the goal one unified project, or three still-separate projects
          that share a common macro library?
        </Para>
        <Para>
          Reasonable answers: one business unit runs on Snowflake, one on BigQuery, one on Redshift, each with
          its own dbt project and its own team, following an acquisition that never unified the data platforms.
          All three have independently reinvented near-identical surrogate-key and date-spine macros, with
          subtle bugs in two of the three versions. The near-term goal is a shared macro library, not a single
          unified project — a full platform consolidation is out of scope for this design.
        </Para>
        <SubTitle>Why a shared package, not copy-pasted macros, is the right structural answer</SubTitle>
        <Para>
          The instinct to copy a working macro from one project into the other two is the wrong move for
          exactly the reason it was a problem in the first place — three independent copies of the same logic
          drift the moment any one of them gets a bug fix nobody backports to the other two. The right
          structural answer is extracting the shared macros into their own standalone dbt package — a
          separate git repository containing only macros, no models — installed into each business unit's
          project via <code>packages.yml</code>, exactly the mechanism the packages module covers.
        </Para>
        <CodeBox label="the shared internal package, installed by all three projects">
{`# packages.yml, in each of the three business unit projects
packages:
  - git: "https://github.com/acme-corp/dbt-shared-macros.git"
    revision: v2.3.0

# Inside dbt-shared-macros itself:
# macros/generate_surrogate_key.sql
# macros/date_spine_portable.sql
# macros/tests/generic/test_positive_value.sql`}
        </CodeBox>
        <Para>
          Pinning a specific <code>revision</code> (a git tag, not a floating branch) in each project's
          <code>packages.yml</code> is the detail that keeps this safe across three independently-scheduled
          teams: a bug fix or breaking change in the shared package does not silently propagate into all
          three projects on their next <code>dbt deps</code> run — each team upgrades to a new revision
          deliberately, on its own schedule, after reviewing what changed.
        </Para>
        <SubTitle>Writing macros that are genuinely portable across three different warehouses</SubTitle>
        <Para>
          A macro shared across Snowflake, BigQuery, and Redshift cannot lean on any one warehouse's
          proprietary SQL dialect without branching internally — exactly the problem
          <code>dbt_utils</code> and adapter dispatch solve for the community at large, and the same technique
          applies to an internal shared package. dbt's adapter dispatch mechanism lets a macro definition vary
          by the active database adapter while callers invoke one consistent macro name.
        </Para>
        <CodeBox label="a warehouse-portable date-spine macro using adapter dispatch">
{`{% macro date_spine_portable(start_date, end_date) %}
  {{ return(adapter.dispatch('date_spine_portable', 'shared_macros')(start_date, end_date)) }}
{% endmacro %}

{% macro default__date_spine_portable(start_date, end_date) %}
  {{ dbt_utils.date_spine(datepart="day", start_date=start_date, end_date=end_date) }}
{% endmacro %}

{% macro bigquery__date_spine_portable(start_date, end_date) %}
  -- BigQuery-specific implementation if the default dbt_utils behavior
  -- needs an adapter-specific override for performance or dialect reasons
  {{ dbt_utils.date_spine(datepart="day", start_date=start_date, end_date=end_date) }}
{% endmacro %}`}
        </CodeBox>
        <Para>
          In practice, many macros need no adapter-specific override at all — leaning on <code>dbt_utils</code>
          itself, which already handles the cross-warehouse dialect differences internally, covers the large
          majority of cases. Adapter dispatch matters most for the minority of genuinely warehouse-specific
          logic (a Snowflake-specific semi-structured column function, say) that has no single portable SQL
          expression across all three targets.
        </Para>
        <SubTitle>Testing the shared package independently of any consuming project</SubTitle>
        <Para>
          Because the shared package is its own repository, it should have its own CI pipeline, testing its
          macros against a minimal, synthetic dbt project built specifically to exercise them, rather than
          only being implicitly tested whenever one of the three business unit projects happens to use them.
          A regression in a shared macro should fail the package's own CI before it is ever tagged as a new
          revision, not get discovered by a business unit team days after upgrading.
        </Para>
        <Callout title="Trade-off worth stating explicitly" color={K}>
          A shared package adds a genuine coordination cost: a bug fix that one business unit needs urgently
          now has to go through the package's own release and revision-bump process before that team can
          consume it, rather than being a same-day fix inside their own project. This is a deliberate trade
          — accepting slightly slower propagation of any single fix, in exchange for eliminating the
          three-way drift that caused the original problem — and a strong answer names this cost rather than
          presenting the shared package as free.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Worked System Design" />
        <SectionTitle>A Stakeholder Asks Why Yesterday's Revenue Dashboard Number Changed After the Fact — Design a System That Prevents This</SectionTitle>
        <SubTitle>Requirements gathering</SubTitle>
        <Para>
          Is the number changing because of a genuine, correct late-arriving update (a refund processed a day
          after the original charge), or because of an unintended side effect of how the model rebuilds? Does
          the business actually want historical numbers to stay frozen once reported, or does it want them to
          reflect the most current, corrected truth even retroactively? Who needs to be notified when a
          previously reported number changes, and how quickly?
        </Para>
        <Para>
          Reasonable answers: some of the change is genuine (late refunds, corrected charges) and some is an
          artifact of a table materialization being fully rebuilt nightly against a source system that itself
          allows backdated edits with no audit trail. Finance specifically wants a previously reported daily
          number to be immutable once published, with any subsequent correction shown as a separate, visible
          adjustment rather than silently overwriting history.
        </Para>
        <SubTitle>Why a plain nightly full-rebuild model cannot satisfy this requirement, structurally</SubTitle>
        <Para>
          A model that rebuilds from scratch every night, by definition, has no way to distinguish "today's
          rebuild produced a different number because new data legitimately arrived" from "today's rebuild
          produced a different number because a source row was silently edited in place." Both cases look
          identical to a full rebuild — it only ever sees the current source state, with no built-in memory of
          what a previous run computed. Satisfying finance's actual requirement needs an explicit historical
          record, not a smarter query against the same rebuild-from-scratch model.
        </Para>
        <SubTitle>The fix — a snapshot of the reported metric itself, not just the underlying source data</SubTitle>
        <Para>
          Part 05 of this module covers snapshotting a slowly-changing source table; this problem needs the
          same underlying idea applied one layer higher — snapshotting the daily reported output itself. A
          dedicated model, built once per day and never rebuilt afterward, freezes what was actually reported
          for that day. Any later change to the underlying source data flows into a new day's row, or an
          explicit adjustment row, rather than mutating a value finance already reported to stakeholders.
        </Para>
        <CodeBox label="an insert-only, append-based reporting model instead of a rebuild-from-scratch table">
{`{{
  config(
    materialized='incremental',
    incremental_strategy='append',
    -- no unique_key here on purpose: append has no matching/dedup step,
    -- so a unique_key would be inert -- report_date + is_adjustment is
    -- just documentation of the natural grain, not enforced by dbt
  )
}}

SELECT
  current_date AS report_date,
  false AS is_adjustment,
  SUM(amount) AS reported_revenue
FROM {{ ref('fct_orders') }}
WHERE order_date = current_date

{% if is_incremental() %}
-- append-only: never overwrites a prior day's already-reported row,
-- deliberately the opposite of a merge/upsert incremental strategy
{% endif %}`}
        </CodeBox>
        <Para>
          Using <code>incremental_strategy='append'</code> rather than the more common <code>merge</code> is
          the deliberate, load-bearing decision here: a merge strategy would update an existing day's row in
          place the moment underlying source data changed, which is exactly the behavior finance does not
          want. Append-only guarantees a once-written row for a given report date is never silently touched
          again — any later-discovered correction becomes a new row, explicitly flagged as an adjustment via
          the <code>is_adjustment</code> column, rather than an invisible mutation of history.
        </Para>
        <SubTitle>Surfacing the adjustment, not hiding it</SubTitle>
        <Para>
          A separate, explicitly-scheduled reconciliation job compares each already-reported day's frozen
          number against what the current source data would produce for that same date, and inserts an
          adjustment row (with a clear reason code and a link back to what changed) whenever a material
          difference is found — rather than either silently ignoring the drift or silently overwriting the
          original number. The finance dashboard then sums a report date's original value plus any adjustment
          rows for it, showing both the original figure and a visible, explained correction rather than one
          quietly-changed final number.
        </Para>
        <Callout title="This is the same principle as an accounting ledger, not a coincidence" color={K}>
          Never mutating a historical entry in place, and instead recording any correction as a new, separately
          visible entry, is exactly how financial accounting itself works — a general ledger does not edit a
          posted entry, it posts a reversing or adjusting entry. Recognizing that a stakeholder's "the number
          changed and I don't know why" complaint is really an append-only-versus-mutate-in-place design
          question, and reaching for the same discipline accounting already uses, is the specific insight this
          prompt is testing for.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 10 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Worked System Design" />
        <SectionTitle>How Would You Handle a Breaking Schema Change From an Upstream Source System With Zero Analyst-Facing Downtime?</SectionTitle>
        <SubTitle>Requirements gathering</SubTitle>
        <Para>
          What kind of breaking change specifically — a column renamed, a column dropped, a column's type or
          meaning silently changed (a currency field switching from dollars to cents, say)? Is there any
          advance notice from the upstream team, or does this show up as a surprise in a nightly run? Which
          downstream consumers would break, and how quickly does someone actually notice a broken dashboard
          versus a silently wrong number?
        </Para>
        <Para>
          Reasonable answers: the upstream application team is renaming <code>customer_status</code> to
          <code>lifecycle_stage</code> on the core customers table, with two weeks' notice before the change
          ships, but no guarantee the exact ship date won't slip. A dozen staging and downstream models
          reference the old column name. Finance's revenue dashboard depends transitively on this table, and a
          silently broken build would not be noticed until someone opens the dashboard, possibly a full day
          later.
        </Para>
        <SubTitle>Why the fix belongs entirely inside the staging layer, not scattered across the DAG</SubTitle>
        <Para>
          This is exactly the scenario the project-structure module's one-staging-model-per-source-table
          principle exists to contain. Because every downstream model reads <code>customer_status</code> only
          through <code>stg_app__customers</code>, and never by querying the raw source table directly, the
          rename needs to be absorbed in exactly one place — the staging model aliases the new column name back
          to the old one downstream models already expect, and nothing outside <code>staging/</code> needs to
          change at all.
        </Para>
        <CodeBox label="absorbing the rename entirely inside the staging model">
{`-- models/staging/postgres_app/stg_app__customers.sql

SELECT
  customer_id,
  lifecycle_stage AS customer_status,   -- old name preserved for every downstream consumer
  updated_at
FROM {{ source('app', 'customers') }}`}
        </CodeBox>
        <Para>
          This buys time to plan a proper, deliberate rename across the dozen downstream models later, on the
          platform team's own schedule, rather than being forced into an emergency multi-model fix the moment
          the upstream change actually ships. The staging layer's whole purpose — insulating the rest of the
          DAG from exactly this kind of upstream volatility — is what makes a same-day, one-file fix possible
          instead of a scramble across every affected mart.
        </Para>
        <SubTitle>Detecting the change before it breaks anything, not after</SubTitle>
        <Para>
          Waiting for the rename to actually ship and break a nightly run is the reactive version of this
          problem; a stronger design catches it before it does. A source freshness-style contract test —
          checking that <code>customer_status</code> still exists with the expected type on every run, failing
          loudly the moment it does not — turns a silent schema drift into an immediate, actionable CI or
          nightly-run failure instead of a quietly wrong dashboard discovered a day later.
        </Para>
        <CodeBox label="a schema contract test in the source's own YAML">
{`sources:
  - name: app
    tables:
      - name: customers
        columns:
          - name: customer_status
            data_tests:
              - not_null
          # a column-existence / type contract check, run every invocation,
          # fails fast the moment the upstream rename actually ships --
          # exactly when the two-week notice window runs out`}
        </CodeBox>
        <Para>
          Combining this with an explicit <code>on-run-start</code> hook or a scheduled, low-cost freshness
          check run independently of the main nightly job means the very first sign of the upstream change is a
          clear, attributable test failure with a specific column name in the error, not a vague "the finance
          number looks off" report from a stakeholder hours later.
        </Para>
        <Callout title="Why this generalizes beyond one rename" color={K}>
          The same staging-layer-as-buffer pattern applies to a dropped column (the staging model can compute
          a fallback or a null placeholder while the rest of the DAG is migrated off it) and to a silent
          type/meaning change (the staging model can convert cents back to dollars at the boundary, keeping
          every downstream consumer's assumed unit unchanged). The specific fix differs by change type, but the
          structural principle is identical every time: the staging layer absorbs upstream volatility so the
          other 90%+ of the DAG never has to know it happened.
        </Callout>
        <SubTitle>Trade-offs worth stating explicitly</SubTitle>
        <Para>
          Aliasing the new column back to its old name at the staging boundary is a deliberate, temporary
          shim, not a permanent solution — leaving <code>customer_status</code> as the name used across a dozen
          downstream models forever means new team members keep learning a name the source system itself no
          longer uses, a small but real ongoing cost. A strong answer schedules the deliberate downstream
          rename as a tracked follow-up task with an owner and a rough timeline, rather than treating the
          staging-layer shim as the finished, permanent answer.
        </Para>
      </section>

      <Divider />

      {/* ── Part 11 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Worked System Design" />
        <SectionTitle>Design a dbt Project to Support Both a Nightly Batch Refresh and a Near-Real-Time Dashboard Requirement From the Same Underlying Data</SectionTitle>
        <SubTitle>Requirements gathering</SubTitle>
        <Para>
          What does "near-real-time" actually mean here — sub-minute, or is a 15-minute lag genuinely
          acceptable? Does every metric need the fast path, or only a specific subset (an operations dashboard
          watching order volume right now, say, while a monthly cohort-retention report is fine staying on the
          nightly cadence)? What is the cost tolerance — is running part of the pipeline every few minutes,
          all day, an acceptable warehouse spend increase, or does that need to be minimized?
        </Para>
        <Para>
          Reasonable answers: an operations team wants order volume and fulfillment-delay metrics refreshed
          roughly every 10 minutes during business hours; every other metric in the project — finance,
          marketing attribution, cohort retention — is genuinely fine on the existing nightly cadence. Cost
          matters: the operations team's request should not multiply the compute bill for the entire 300-model
          project by running everything every 10 minutes.
        </Para>
        <SubTitle>Why this is a scoping problem before it is a scheduling problem</SubTitle>
        <Para>
          The naive answer is standing up a second, faster overall schedule for the whole project — this fails
          the stated cost constraint immediately, since the overwhelming majority of models genuinely do not
          need it, and it multiplies warehouse spend for zero benefit on the models that stay nightly. The
          right answer scopes the fast path down to exactly the handful of models operations actually needs
          fast, using dbt's node selection to run two schedules against the same project rather than
          maintaining two separate projects or duplicating models.
        </Para>
        <CodeBox label="tagging the specific models that need the fast path">
{`-- models/marts/ops/fct_order_volume_realtime.sql
{{ config(materialized='incremental', tags=['realtime']) }}
SELECT ...

-- models/marts/ops/fct_fulfillment_delay_realtime.sql
{{ config(materialized='incremental', tags=['realtime']) }}
SELECT ...

-- Two separate scheduled jobs against the same project:
-- Job A (every 10 min, business hours only):
--   dbt build --select tag:realtime+
-- Job B (nightly, full project):
--   dbt build --exclude tag:realtime`}
        </CodeBox>
        <Para>
          <code>tag:realtime+</code> selects the two tagged models plus everything downstream of them, keeping
          the fast job scoped to exactly the small slice of the DAG operations actually depends on; the nightly
          job excludes those same models so they are not needlessly rebuilt twice on the same cadence they
          were already just refreshed on. This is the same node-selection mechanism Slim CI's
          <code>state:modified+</code> already relies on, applied here to a scheduling problem instead of a
          change-detection one.
        </Para>
        <SubTitle>Where the two schedules can safely share upstream staging models, and where they cannot</SubTitle>
        <Para>
          Both the realtime and nightly paths ultimately read from the same <code>stg_app__orders</code>
          staging model, and that staging model itself needs to run on the faster cadence too — a realtime mart
          built on top of a staging model that only refreshes nightly is not actually realtime, it is nightly
          data wearing a realtime label. This is why the <code>+</code> in <code>tag:realtime+</code> matters:
          it is deliberately the two realtime models plus their full upstream lineage, not just the two leaf
          models in isolation, ensuring every model actually feeding the fast dashboard runs on the fast
          schedule too.
        </Para>
        <Table
          headers={['Layer', 'Refresh cadence', 'Reasoning']}
          rows={[
            ['stg_app__orders (shared staging model)', 'Every 10 minutes, business hours', 'Feeds the realtime marts directly — refreshing it only nightly would silently cap the realtime marts\' actual freshness at a full day regardless of their own schedule.'],
            ['fct_order_volume_realtime, fct_fulfillment_delay_realtime', 'Every 10 minutes, business hours', 'The two models operations actually consumes on the fast dashboard.'],
            ['Every other staging, intermediate, and mart model in the project', 'Nightly, unchanged', 'No stated requirement for faster refresh; running these more often is pure added cost with no corresponding benefit.'],
          ]}
        />
        <Para>
          Because <code>stg_app__orders</code> now runs on both schedules — once every 10 minutes for the
          realtime path and once nightly as part of the full project build — the nightly job's
          <code>--exclude tag:realtime</code> only needs to exclude the two realtime marts themselves, not the
          shared staging model beneath them; rebuilding that staging model once more as part of the full
          nightly run is cheap and harmless, and keeps the nightly build a complete, self-contained run that
          does not depend on the realtime job having succeeded earlier in the day.
        </Para>
        <Callout title="The incremental strategy matters even more on the fast path" color={K}>
          Running an incremental model every 10 minutes makes an inefficient <code>is_incremental()</code>
          filter or an overly broad lookback window far more costly than the same inefficiency would be on a
          once-nightly schedule, since the same overhead now compounds many times over a single business day.
          Part 04's full-refresh-diff diagnostic and a tightly scoped, well-tested filter window are worth
          double-checking specifically on any model added to the realtime path, not just assumed fine because
          it already worked acceptably on the nightly cadence.
        </Callout>
        <SubTitle>Trade-offs worth stating explicitly</SubTitle>
        <Para>
          Running the shared staging model on two overlapping schedules means it is genuinely possible for the
          10-minute job and the nightly job to overlap in the warehouse at the same time, which needs either a
          concurrency-safe incremental strategy (merge, not append, so a second concurrent run does not
          duplicate rows) or an explicit scheduling guard preventing true overlap. A strong answer names this
          concurrency risk directly rather than assuming two schedules against the same underlying models are
          automatically safe to run side by side.
        </Para>
      </section>

      <Divider />

      {/* ── Part 12 ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Worked System Design" />
        <SectionTitle>A New Analyst Keeps Accidentally Breaking Production Models — Design a System That Makes That Structurally Hard to Do</SectionTitle>
        <SubTitle>Requirements gathering</SubTitle>
        <Para>
          Is this a process problem (no review happening before merge) or a knowledge problem (reviews happen,
          but reviewers themselves miss the same class of mistake repeatedly)? What specifically keeps
          breaking — a renamed column downstream models still reference, a materialization change that quietly
          triggers an expensive full rebuild, a test someone deletes because it was "in the way"? How large is
          the team, and how experienced are the people actually merging changes?
        </Para>
        <Para>
          Reasonable answers: a team of two senior platform engineers and four newer analytics engineers who
          joined in the last six months. PRs are reviewed, but reviewers are themselves stretched thin across a
          300-model project and occasionally approve a change that compiles and passes the tests it touches
          while still silently breaking an unrelated downstream model the reviewer did not think to check.
        </Para>
        <SubTitle>Why "review harder" is not a scalable answer</SubTitle>
        <Para>
          Asking two senior engineers to review every PR more carefully does not scale as the team and project
          grow, and it is exactly the kind of fix that works for a week and quietly erodes once review fatigue
          sets back in. The stronger answer makes the failure mode structurally harder to hit in the first
          place — shifting weight from "a human remembers to check this" to "the system itself catches this
          automatically," which is the same underlying philosophy Part 03's CI design and this module's
          interview-traps section both apply to testing.
        </Para>
        <Table
          headers={['Recurring mistake', 'Structural fix, not a review reminder', 'Why it scales']}
          rows={[
            ['A column rename breaks a downstream model the author didn\'t know existed', 'Slim CI\'s state:modified+ already builds every downstream dependent of a change, so a broken reference fails the required check automatically, on every PR, without a reviewer having to manually trace the DAG.', 'The DAG traversal happens the same way whether the reviewer is an expert on that part of the project or has never seen it before.'],
            ['A materialization changed to table on a huge model, quietly tripling nightly run cost', 'A CI step that flags (not blocks) any PR changing a materialized config on a model above a defined row-count or historical-runtime threshold, surfacing it explicitly for reviewer attention.', 'Turns an easy-to-miss one-line diff into something the review tooling itself calls out, rather than relying on a reviewer noticing a subtle config change buried in a larger diff.'],
            ['A test gets deleted because it was "blocking" a PR', 'A CI check that fails if a PR\'s diff removes more test coverage (measured by test count per model) than it adds, without an explicit justification in the PR description.', 'Makes silently deleting an inconvenient test require a deliberate, visible justification instead of a quiet one-line removal nobody notices in review.'],
          ]}
        />
        <Para>
          None of these three fixes rely on a reviewer being more careful or more experienced — each one moves
          the check into the CI pipeline itself, so the newest analytics engineer on the team is protected by
          the exact same automated guardrail a ten-year veteran would be. This is the general shape of a strong
          answer to "how do you stop people from making the same mistake" in almost any system-design context,
          not just dbt specifically: prefer a structural, automatic check over asking people to individually
          remember more things.
        </Para>
        <SubTitle>What still genuinely requires human judgment, and should not be automated away</SubTitle>
        <Para>
          Not every failure mode reduces to an automatable check — whether a new metric's business logic is
          actually correct, for instance, is a judgment call no CI pipeline can make. The realistic answer is
          not "automate everything," it is drawing a clear line: mechanical, structural mistakes (a broken
          reference, an unreviewed cost spike, a silently deleted test) get an automated guardrail; business-
          logic correctness stays a human review responsibility, concentrated specifically on the
          highest-blast-radius folders per Part 03's tiered review policy, rather than spread thin evenly
          across every PR regardless of risk.
        </Para>
        <Callout title="Onboarding is part of this system too, not a separate concern" color={K}>
          A newer analytics engineer repeatedly hitting the same class of mistake is often a sign the
          project's own documentation and structure aren't teaching the right instincts yet, not solely a
          personal skill gap. A short, living "common PR mistakes and how CI catches them" doc, pointing
          directly at the guardrails above, turns a repeated review comment into a one-time onboarding read —
          reducing the number of times a senior engineer has to explain the same thing in review going forward.
        </Callout>
        <SubTitle>Trade-offs worth stating explicitly</SubTitle>
        <Para>
          Each new automated guardrail is itself a small piece of infrastructure that needs maintaining, and an
          overly aggressive one (flagging too many harmless changes) trains people to ignore its warnings
          entirely, which is worse than not having the check at all. A strong answer proposes starting with the
          highest-leverage, clearest-signal guardrail first — the state:modified+ downstream-breakage check,
          which has essentially no false positives — before adding the noisier, judgment-adjacent checks like
          the cost-threshold flag, rather than shipping all three simultaneously and risking alert fatigue on
          day one.
        </Para>
      </section>

      <Divider />

      {/* ── Part 13 — Vocabulary Cheat Sheet ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Reference" />
        <SectionTitle>dbt Vocabulary Cheat Sheet</SectionTitle>
        <Para>
          A dense, precise reference covering every major term used across the 20-module track — built for
          interview cramming, not first-time learning. If a definition here is unclear, the module it maps to
          covers it in full depth.
        </Para>
        <Table
          headers={['Term', 'Precise definition']}
          rows={[
            ['Model', 'A single SELECT statement saved as a .sql file that dbt compiles and materializes into the warehouse as a view, table, or incremental table.'],
            ['Source', 'A reference, declared in YAML, to a raw table that already exists in the warehouse and was not created by dbt itself — the entry point of the DAG.'],
            ['ref()', 'A Jinja function that resolves to another model\'s compiled, environment-aware table name, and is what builds dbt\'s dependency graph automatically.'],
            ['source()', 'A Jinja function that resolves to a declared raw source table, giving the same dependency-tracking benefit as ref() but for tables dbt did not build.'],
            ['Materialization', 'The strategy dbt uses to persist a model\'s SELECT statement in the warehouse: view, table, incremental, or ephemeral.'],
            ['Incremental model', 'A materialization that, on subsequent runs, only processes new or changed rows rather than rebuilding the entire table from scratch.'],
            ['is_incremental()', 'A Jinja macro that returns true only when a model is being incrementally run against an already-existing table, letting a model conditionally filter to new rows only in that case.'],
            ['Seed', 'A CSV file checked into the project and loaded into the warehouse via dbt seed — used for small, static reference data, not raw source ingestion.'],
            ['Snapshot', 'A mechanism for capturing Type 2 slowly-changing-dimension history: a new row per change, each with a validity window, rather than updating in place.'],
            ['Macro', 'A reusable, parameterized block of Jinja + SQL, defined once and invoked across many models — dbt\'s mechanism for avoiding repeated SQL.'],
            ['Jinja', 'The templating language dbt SQL files are written in, enabling macros, conditionals, loops, and variables inside otherwise-plain SQL.'],
            ['Generic test', 'A reusable, parameterized test (not_null, unique, accepted_values, relationships) applied to a column via YAML with no custom SQL.'],
            ['Singular test', 'A one-off, hand-written SQL query in the tests/ directory that fails the test if it returns any rows — used for business rules generic tests cannot express.'],
            ['DAG (Directed Acyclic Graph)', 'The dependency graph dbt builds from every ref()/source() call, determining build order and what state:modified+ selects downstream of a change.'],
            ['Slim CI', 'The pattern of building only models affected by a change (state:modified+) plus deferring unbuilt upstream models to production (--defer), instead of a full project build on every PR.'],
            ['--defer', 'A flag telling dbt to resolve ref()s to unbuilt models against an already-built reference environment (usually production) instead of failing.'],
            ['--state', 'A flag pointing dbt at a previous manifest.json to compare against, powering both state:modified selection and --defer resolution.'],
            ['manifest.json', 'dbt\'s compiled, structured representation of the entire project — every model, its resolved dependencies, and its config — used for state comparison and documentation.'],
            ['Hook (pre-hook / post-hook / on-run-start / on-run-end)', 'A SQL statement configured to run automatically before or after a model, or before/after an entire invocation, without being part of the model\'s own SELECT.'],
            ['run-operation', 'A dbt CLI command (dbt run-operation) that invokes a macro directly, outside the context of building any model — common for maintenance tasks like granting privileges.'],
            ['Package', 'A separate, reusable dbt project (macros, models, or both) installed into your project via packages.yml, most commonly dbt_utils or a source-specific package.'],
            ['dbt_utils', 'The most widely used community package, providing generic cross-database macros for things like surrogate key generation, date spines, and pivoting.'],
            ['Target', 'A named connection profile (dev, ci, prod) in profiles.yml specifying which warehouse, schema, and credentials a given dbt invocation uses.'],
            ['var()', 'A Jinja function reading a project-level variable, either from dbt_project.yml or passed at the CLI with --vars, for a value that changes per run rather than per environment.'],
            ['env_var()', 'A Jinja function reading an operating-system environment variable — the standard way to inject secrets and environment-specific values without hardcoding them.'],
            ['Exposure', 'A YAML-declared downstream consumer of dbt models (a dashboard, a report) that lets dbt track and document what depends on a given model outside the project itself.'],
            ['dbt Cloud CI job', 'A managed job type that implements the Slim CI pattern automatically, including manifest tracking and ephemeral schema creation, without custom pipeline code.'],
            ['Freshness (source freshness)', 'A configured threshold on a source table\'s loaded_at column that dbt checks to alert when upstream data has stopped arriving on schedule.'],
            ['Ephemeral model', 'A materialization that is never persisted to the warehouse at all — inlined as a CTE into whatever model references it via ref().'],
            ['Full refresh (--full-refresh)', 'A flag forcing an incremental model to rebuild entirely from scratch, ignoring its usual is_incremental() filtering — commonly used to fix drift or after a logic change.'],
            ['dbt_project.yml', 'The single required project-level config file declaring the project name, model paths, default materializations per folder, and other project-wide settings applied unless a model overrides them.'],
            ['profiles.yml', 'The connection config file (kept outside the project repo, usually in ~/.dbt/) mapping each named target (dev, ci, prod) to actual warehouse credentials and connection details.'],
            ['dbt debug', 'A CLI command that validates the current profile and connection — confirming dbt can actually reach the configured warehouse — before attempting to run or build anything.'],
            ['dbt clean', 'A CLI command that deletes the dbt_packages/ and target/ directories, used to force a clean re-install of packages or clear stale compiled artifacts.'],
            ['on-run-start / on-run-end', 'Hooks configured in dbt_project.yml that run once at the very start or end of an entire dbt invocation, rather than per model — used for things like grants or run-level logging.'],
            ['store_failures', 'A test config that, when true, persists a failing test\'s actual failing rows into a database table instead of only reporting a pass/fail count, making failures directly queryable for debugging.'],
            ['severity', 'A test config (error or warn) controlling whether a failing test fails the whole invocation or only surfaces as a non-blocking warning — used to tier test strictness per the layered testing strategy in Part 03.'],
            ['generate_schema_name', 'A macro dbt calls to compute a model\'s actual target schema, commonly overridden so a custom schema config appends to, rather than replaces, the target\'s base schema.'],
            ['dbt build', 'A CLI command that runs models, tests, snapshots, and seeds together in DAG order in one invocation, instead of requiring separate dbt run / dbt test / dbt snapshot commands run independently.'],
            ['Node selection (--select / --exclude / tag:)', 'The syntax for scoping a dbt invocation to a specific subset of the DAG — by model name, folder path, graph operator (+), or a tag applied in config — used throughout this module for both CI scoping and mixed-cadence scheduling.'],
            ['Contract (model-level data contract)', 'An explicit, enforced declaration of a model\'s expected column names and types, checked at build time — failing loudly if a model\'s actual output no longer matches what it promised, catching a schema drift before it silently reaches a downstream consumer.'],
            ['Grain', 'The level of uniqueness a single row in a model represents — one row per order, one row per customer per day, etc. — a mismatched grain assumption is a common, hard-to-spot source of silently duplicated or double-counted downstream aggregates.'],
            ['Idempotent (as applied to a dbt run)', 'A property where re-running the exact same model build against the same source data produces the same result every time, with no side effect that accumulates across repeated runs — a core assumption an append-only incremental strategy can violate if run twice against the same new data.'],
            ['Blast radius', 'How much of the downstream DAG is affected if a given model is wrong or breaks — the shared, most-depended-on layer has the largest blast radius, which is why Part 01 and Part 03 both tie ownership and review rigor to it directly.'],
            ['Strangler-fig pattern', 'A migration strategy that ports a legacy system to its replacement one bounded piece at a time, running both in parallel and validating before cutover, rather than a single big-bang rewrite — the approach behind Part 02\'s migration design.'],
            ['Schema contract test', 'A test asserting an upstream source or model still exposes an expected column with an expected type, failing fast the moment a silent upstream change would otherwise break something downstream unnoticed — the guardrail proposed in Part 10.'],
          ]}
        />
      </section>

      <Divider />

      {/* ── CLI quick reference ───────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Reference" />
        <SectionTitle>CLI Command Quick Reference</SectionTitle>
        <Para>
          A companion to the vocabulary table above, scoped specifically to the commands and flags this
          module's worked examples actually invoke — useful for translating a design discussion directly into
          the command an interviewer might ask you to type or explain.
        </Para>
        <Table
          headers={['Command', 'What it does in this module\'s worked examples']}
          rows={[
            ['dbt run', 'Builds models only, in DAG order — does not run tests or snapshots.'],
            ['dbt test', 'Runs generic and singular tests against already-built models, without rebuilding them.'],
            ['dbt build', 'Runs models, tests, snapshots, and seeds together in one DAG-ordered invocation — the command used in Part 03\'s CI gate and Part 11\'s two scheduled jobs.'],
            ['dbt run --select model_name --full-refresh', 'Forces one model to rebuild entirely from scratch, ignoring is_incremental() — the diagnostic move in Part 04 and the validation step in Part 07.'],
            ['dbt build --select state:modified+ --state ./prod-manifest --defer', 'The Slim CI pattern from Part 03: build only what changed and its downstream dependents, resolving unbuilt upstream refs against a previous production manifest.'],
            ['dbt build --select tag:realtime+', 'Builds a tagged subset of models plus everything downstream of them — the mixed-cadence scheduling technique from Part 11.'],
            ['dbt snapshot', 'Executes every configured snapshot, comparing current source state against the latest snapshotted row and inserting a new row per detected change — the mechanism behind Part 05 and Part 09.'],
            ['dbt run-operation macro_name', 'Invokes a macro directly outside the context of building any model — common for one-off maintenance tasks like a manual grants refresh.'],
            ['dbt deps', 'Installs the packages declared in packages.yml, including an internal shared macro package pinned to a specific git revision, as in Part 08.'],
            ['dbt docs generate', 'Compiles the project\'s manifest and catalog into the static documentation site, including any declared exposures.'],
            ['dbt debug', 'Validates the active profile and warehouse connection before attempting any build — the first command to reach for when a run fails with a connection error rather than a SQL error.'],
            ['dbt source freshness', 'Checks each declared source\'s loaded_at column against its configured freshness thresholds, surfacing an upstream data-arrival problem independently of whether any model actually failed to build.'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Common interview traps ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Interview Traps" />
        <SectionTitle>Wrong Answers Candidates Commonly Give, and Why They're Wrong</SectionTitle>
        {[
          {
            q: '"Just materialize everything as a table for speed" — stated as a complete answer with no caveats',
            a: 'This is a common overcorrection. Tables are fast to query but cost full rebuild time and warehouse compute on every run, and for a model that changes rarely or is queried infrequently, a view is often both cheaper and simpler. The strong answer ties materialization choice to query frequency, rebuild cost, and data volume per model — exactly Part 01 and Part 07\'s framing — rather than applying one materialization uniformly across the whole project.',
          },
          {
            q: '"Incremental models are always the right choice for a large table" — treating incrementality as a default rather than a decision',
            a: 'Incremental models add real complexity: a unique_key to get right, an is_incremental() filter that can silently miss late-arriving data, and an ongoing risk of drift from a full rebuild, as Part 04 covers directly. For a large but slow-changing dimension table, a full table rebuild on a reasonable schedule can be simpler and just as fast in practice. The decision should be driven by whether reprocessing the full table is actually too slow or too expensive, not by size alone.',
          },
          {
            q: '"A dbt snapshot and an incremental model are basically interchangeable for tracking history" — collapsing a real semantic difference',
            a: 'An incremental model, even a well-built one, represents current state per key — it updates or merges a row in place. A snapshot explicitly preserves every historical version of a row with validity windows, specifically because current-state models destroy history by design. Part 05 exists specifically to test this distinction — a candidate proposing an incremental model for a "what did this look like in the past" requirement has picked the wrong tool.',
          },
          {
            q: '"Slim CI means the test suite is smaller or less rigorous" — misunderstanding what state:modified+ actually narrows',
            a: 'Slim CI narrows which MODELS get built, based on what changed — it does not reduce which tests run against whatever gets built, or how strict those tests are. Every test on every selected model still runs in full, exactly as covered in the cicd-for-dbt module.',
          },
          {
            q: '"CI passing means the change is safe to merge, full stop" — treating a green check as a complete correctness guarantee',
            a: 'CI passing means the models that were built compiled and passed their tests against realistic data — a strong signal, not a guarantee. It cannot catch a plausible-looking but wrong business-logic change, or a case where test coverage itself was incomplete. This is exactly why Part 03\'s testing-and-CI design layers human review on top of CI for the highest-blast-radius folders rather than treating CI alone as sufficient.',
          },
          {
            q: '"For migrating a legacy pipeline, rewrite everything in dbt at once for a clean start" — ignoring migration risk entirely',
            a: 'A big-bang rewrite of a poorly understood legacy system concentrates all risk into one cutover moment with no way to isolate which part of the rewrite introduced a bug if something goes wrong. Part 02\'s strangler-fig approach — migrating and validating leaf dependencies first, one at a time, in parallel with the legacy system — is the answer that demonstrates actual migration experience rather than a fresh-start default.',
          },
          {
            q: '"Downstream models can just query the raw source table directly when it\'s more convenient" — bypassing staging "just this once"',
            a: 'The moment even one downstream model reads a source table directly instead of through its staging model, the staging layer stops being a reliable insulation boundary — exactly the property Part 10\'s upstream-schema-change design depends on entirely. A single bypass means an upstream rename or type change now has to be hunted down and fixed in two places instead of one, and that number only grows the more "just this once" exceptions accumulate.',
          },
          {
            q: '"A generic not_null/unique test on primary keys is enough test coverage for any model" — treating generic tests as sufficient by default',
            a: 'Generic tests catch mechanical breakage — a null primary key, a duplicate — but cannot express a business rule like "revenue recognized this month must not exceed total invoiced," which is exactly what a singular test exists for. Part 03\'s tiered testing strategy pairs generic tests on staging models with singular, business-rule-aware tests specifically on the shared and finance-facing layers, precisely because generic coverage alone leaves the costliest bugs uncaught.',
          },
          {
            q: '"Every schema change from an upstream source should be fixed wherever it happens to break first" — patching the DAG reactively, wherever the error surfaces',
            a: 'A downstream model failing on an upstream rename is a symptom, not the actual location the fix belongs. Part 10 covers this directly: the fix belongs in the one staging model standing between the raw source and everything downstream of it, not scattered across whichever marts happened to break first and get noticed. Fixing at the point of failure instead of the point of entry means the same underlying change has to be re-diagnosed and re-patched independently the next time a different downstream model finally notices it too.',
          },
          {
            q: '"A more experienced reviewer catching mistakes in PR review is a sufficient long-term quality strategy" — relying on review vigilance instead of structural guardrails',
            a: 'Review vigilance does not scale as a team and project grow, and it fails precisely when a reviewer is busiest or least familiar with the specific part of the DAG a change touches. Part 12\'s answer is to convert the recurring, mechanical failure modes into automated CI guardrails — a broken downstream reference, an unreviewed cost spike, a silently deleted test — reserving human judgment specifically for the business-logic correctness questions no automated check can answer.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Rapid-fire Interview Prep ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Rapid-Fire Interview Prep" />
        <SectionTitle>12 Quick-Recall Questions — Short, Complete Answers</SectionTitle>
        {[
          {
            q: 'Q1. What is the actual difference between ref() and source(), beyond syntax?',
            a: 'ref() points at another dbt model and resolves to that model\'s compiled, environment-aware table name, building a DAG edge between the two models. source() points at a raw table dbt did not create, declared in YAML with metadata like freshness thresholds — it is how tables outside dbt\'s control still participate in the dependency graph and get freshness-checked.',
          },
          {
            q: 'Q2. Why should a model never reference another table by its raw, hardcoded name instead of ref() or source()?',
            a: 'A hardcoded reference is invisible to dbt\'s dependency graph entirely — it breaks environment-aware compilation (the same code cannot correctly point at dev vs. prod schemas), and it creates a blind spot for state:modified+ selection in CI, since dbt cannot see a dependency it does not know about, silently missing downstream impact through that path.',
          },
          {
            q: 'Q3. What is the difference between a generic test and a singular test?',
            a: 'A generic test (not_null, unique, accepted_values, relationships, or a custom parameterized one) is reusable and applied via YAML with no custom SQL, ideal for mechanical checks. A singular test is a one-off SQL query in tests/ that fails if it returns any rows, used for business rules too specific to express as a reusable, parameterized test.',
          },
          {
            q: 'Q4. What does --defer actually do, and why is it needed alongside state:modified+?',
            a: 'state:modified+ selects which models to build; --defer, combined with --state, tells dbt to resolve any ref() to a model that was NOT selected (and therefore not built in this run) against an already-built reference environment, typically production, instead of failing because that table does not exist in the current run\'s schema. Without --defer, a CI run using state:modified+ would fail on any ref() to an unselected upstream model.',
          },
          {
            q: 'Q5. Why would you use a snapshot instead of just adding created_at/updated_at columns to a regular model?',
            a: 'Timestamp columns on a regular model tell you when a row was last touched, but a regular model still only stores the CURRENT value per key — the previous value is already gone by the time you look. A snapshot explicitly retains every historical version of a row with a validity window, which is what a genuine point-in-time query ("what was this value on date X") actually requires.',
          },
          {
            q: 'Q6. What is the practical risk of relying only on "it runs fine locally" to validate a model before merging?',
            a: 'Local development commonly runs against a small, sampled subset of data, which validates SQL correctness but says little about performance or correctness at true production volume — a join that fans out unexpectedly, or a full-table scan that is fine on a sample but far too slow in production, will not show up locally. Slim CI building against realistic (deferred-to-production) state is a stronger signal than a local run alone.',
          },
          {
            q: 'Q7. When would you choose an ephemeral materialization over a view?',
            a: 'An ephemeral model is inlined as a CTE into whatever references it and is never persisted or independently queryable in the warehouse at all — appropriate for a small, intermediate transformation step that exists purely to keep a downstream model\'s SQL readable, with nobody needing to query it directly. A view is appropriate when the intermediate result itself has standalone value for ad hoc querying or debugging.',
          },
          {
            q: 'Q8. How would you explain the trade-off dbt Cloud\'s CI job makes versus a self-hosted GitHub Actions Slim CI pipeline?',
            a: 'They implement the same underlying mechanism — state comparison, state:modified+, --defer — but dbt Cloud\'s version is managed (automatic manifest tracking, ephemeral schemas, PR status reporting) at the cost of a dbt Cloud plan and some platform lock-in, while a self-hosted pipeline requires building those pieces yourself but is fully portable and easier to extend with custom, organization-specific steps.',
          },
          {
            q: 'Q9. What does the severity config on a test actually change, and when would you use severity: warn instead of the default error?',
            a: 'severity: error (the default) fails the whole invocation when the test fails; severity: warn surfaces the failure in the run output without failing the build. warn is appropriate for a test that is informative but not yet trusted enough to block merges — a newly added test still being tuned for false positives, or a known, accepted, low-priority data quality issue that should stay visible without blocking every unrelated deploy.',
          },
          {
            q: 'Q10. Why does a schema rename on a source table only require a one-file fix if the project is structured correctly, but a much larger fix otherwise?',
            a: 'When every downstream model reads a source column only through its one staging model (never the raw source table directly), the staging model is the single place a column rename needs to be absorbed — it aliases the new name back to what downstream models already expect. If any downstream model bypasses staging and reads the source directly, as Part 10 and this module\'s interview-traps section both cover, the same rename now requires hunting down and fixing every one of those bypasses individually.',
          },
          {
            q: 'Q11. What is the difference between tag: selection and state:modified+ selection, and when would you reach for each?',
            a: 'tag: selects models by an explicit, author-assigned label in config — used when the grouping is a stable property of the model itself, like Part 11\'s realtime tag. state:modified+ selects models by comparing the current project against a previous manifest, used when the grouping is "whatever changed in this specific PR," which is different on every single run rather than a fixed, hand-assigned label.',
          },
          {
            q: 'Q12. Why can running the same incremental model twice against the same new data be unsafe with incremental_strategy=\'append\' but safe with \'merge\'?',
            a: 'append blindly inserts whatever the model\'s SELECT returns, with no check for whether a given key was already inserted by a previous run — running it twice against unchanged new data means genuine duplicate rows. merge deliberately checks unique_key and updates an existing matching row instead of inserting a second one, so re-running it against the same new data is idempotent. Part 09\'s append-only reporting model works specifically because it is deliberately guarded to only ever run once per report_date, not because append is generally safe to re-run.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 26px', marginBottom: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 12, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Closing synthesis ─────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Before You Walk Into the Room" />
        <SectionTitle>What All Twelve Worked Examples Actually Have in Common</SectionTitle>
        <Para>
          Read back over Parts 01 through 12 and a small set of recurring moves accounts for nearly all of
          them: push a boundary problem (an upstream rename, a legacy migration, a fast-versus-slow cadence
          split) down into the single layer built to absorb it, rather than letting it leak across the whole
          DAG; reach for a snapshot the instant a question needs point-in-time history a mutate-in-place model
          has already destroyed; scope any expensive operation — a CI build, a fast refresh schedule, a review
          — to the smallest correct blast radius instead of applying it uniformly; and state the resulting
          trade-off out loud instead of presenting a design as free. None of these are dbt-specific tricks —
          they are general systems-design instincts that happen to have a specific, idiomatic dbt expression in
          every one of these twelve prompts.
        </Para>
        <Para>
          That is also why cramming the vocabulary table and rapid-fire section alone, without working through
          at least a few of the worked examples by hand, tends to fall apart under a genuinely novel prompt on
          interview day. Vocabulary answers "what is this called"; the worked examples build the actual
          reasoning habit of reaching for the right one of these recurring moves when a new, unfamiliar
          combination of requirements shows up — which is the harder and more valuable skill this module, and
          this entire track, was built to leave you with.
        </Para>
      </section>

      <Divider />

      <KeyTakeaways items={[
        'A dbt system-design interview tests whether project layering, materialization strategy, testing depth, and migration risk emerge naturally from reasoning through requirements — not whether you can recite a definition on cue.',
        'The same underlying patterns recur across very different prompts: a layered staging/intermediate/marts structure for organizing ownership, a snapshot for anything genuinely needing point-in-time history, Slim CI for validating change cheaply, and a full-refresh diff for diagnosing any suspected incremental-model bug.',
        'Materialization, testing depth, and migration pace are deliberate trade-offs tied to actual business cost, never a uniform default — the right answer for a fast-moving analytics team is not the right answer for an audited finance layer, in the very same project.',
        'Some correctness questions are outside what an automated check alone can answer — CI passing is a strong signal, not a guarantee, and a snapshot\'s validity window is only as good as its run cadence — knowing exactly where the automated guarantee ends is what separates a strong answer from a memorized one.',
        'This 20-module track went from "what is dbt" to designing multi-team, audited, migration-aware analytics engineering systems from scratch — that arc is the actual skill being tested in a senior analytics engineering interview, and it is now yours to apply.',
        'When two numbers disagree, or a mistake keeps recurring, the strongest answer is a structural fix — a timing-aware diagnostic, a contract, an automated guardrail — over asking people to individually remember more, and this same instinct scales from a single incremental model up to a multi-project dbt Mesh rollout.',
      ]} />

      <Divider />

      {/* ── Completion ── */}
      <section style={{ marginBottom: 32 }}>
        <div style={{
          background: `linear-gradient(135deg, ${K}18, transparent)`,
          border: `1px solid ${K}44`, borderRadius: 14, padding: '32px 36px',
        }}>
          <p style={{
            fontSize: 10, color: K, letterSpacing: '.14em', textTransform: 'uppercase',
            fontFamily: FONT_MONO, fontWeight: 800, margin: '0 0 12px',
          }}>
            🎉 Track Complete — All 20 Modules
          </p>
          <h2 style={{
            fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 900, letterSpacing: '-1px',
            color: 'var(--text)', marginBottom: 16, fontFamily: FONT_DISPLAY, lineHeight: 1.2,
          }}>
            You've completed the full dbt track — from your first model to system design.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 24 }}>
            From what dbt is and how it compiles Jinja and SQL into a DAG, through models, sources, testing,
            incremental models, snapshots, macros, packages, documentation, hooks, variables and environments,
            performance tuning, CI/CD, and now full system-design synthesis — that is the complete arc of
            what a working analytics engineer actually needs, end to end. Revisit any module as a reference
            whenever a real project calls for it; the vocabulary table and worked examples in this module are
            built specifically to be reused before your next interview, not read once and forgotten.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/learn/dbt" style={{ background: K, color: '#fff', padding: '12px 26px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'inline-block' }}>
              ← Back to the dbt track overview
            </Link>
            <Link href="/learn" style={{ background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)', padding: '12px 26px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'inline-block' }}>
              Browse other tracks
            </Link>
          </div>
        </div>
      </section>
    </LearnLayout>
  )
}
