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

export default function TestingStrategyAtScale() {
  return (
    <LearnLayout
      title="Testing Strategy and Data Quality at Scale"
      description="Why 'add tests everywhere' fails at scale, tiering tests by DAG position and severity, store_failures for real debugging, freshness SLAs as team agreements, and building a data-quality culture instead of a pile of assertions nobody owns."
      section="dbt — Module 19"
      readTime="65 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'Testing Strategy and Data Quality at Scale', href: '/learn/dbt/testing-strategy-at-scale' },
      ]}
      prev={{ title: 'CI/CD for dbt Projects', href: '/learn/dbt/cicd-for-dbt' }}
      next={{ title: 'dbt Interview and System Design Guide', href: '/learn/dbt/dbt-interview-system-design' }}
    >
      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Problem With 'Just Add Tests Everywhere'" />
        <SectionTitle>More Tests Is Not the Same Thing as Better Data Quality</SectionTitle>

        <Para>
          Module 08 covered <code>unique</code>, <code>not_null</code>, <code>accepted_values</code>, and
          <code>relationships</code>, plus custom generic and singular tests, and where in the DAG a test
          belongs. Everything in that module is correct in isolation. But a real dbt project with 200 or 300
          models, run daily by a small platform team, cannot simply apply every one of those tests to every
          column of every model and call it a strategy. At that scale, "test everything" is not a stronger
          version of good testing — it is a different failure mode entirely.
        </Para>

        <Para>
          Picture a project that has grown to roughly 5,000 individual test instances across its models —
          the sum of every <code>unique</code>, <code>not_null</code>, <code>accepted_values</code>, and
          <code>relationships</code> test on every column anyone thought might be worth checking. On a normal
          day, some small percentage of those tests fail — a source system briefly emits a null it shouldn't,
          a rarely-populated optional field trips an <code>accepted_values</code> list that was written too
          strictly. None of these individual failures is severe. But multiplied across 5,000 tests, "some
          small percentage failing on a normal day" becomes dozens of red test results in every single
          <code>dbt build</code>, every single day, most of which nobody investigates because investigating
          all of them is not a full-time job anyone was assigned.
        </Para>

        <HighlightBox>
          <Para>
            <strong>Alert fatigue is the actual cost of untiered testing, and it is worse than having no
            tests at all.</strong> An engineer who has learned that most test failures in this project are
            noise starts skimming past the red output instead of reading it. Once that habit sets in, a
            genuinely critical failure — a broken foreign key about to corrupt a revenue dashboard — is
            sitting in the same undifferentiated wall of red as forty low-value failures nobody has looked at
            in months, and it gets skimmed past exactly the same way. A project with zero tests at least
            forces someone to notice a wrong number manually. A project with 5,000 untiered tests trains its
            own engineers to stop looking, which is strictly worse: it creates the appearance of safety
            without the substance of it.
          </Para>
        </HighlightBox>

        <Para>
          The fix is not fewer tests for the sake of fewer tests. It is a deliberate strategy: which tests
          matter enough to block a pipeline, which are worth a human's attention without blocking anything,
          where in the DAG a given risk actually lives, and who is responsible for looking at a failure when
          it happens. The rest of this module builds that strategy piece by piece, building directly on the
          testing mechanics from Module 08 rather than re-explaining them.
        </Para>

        <Callout title="This module assumes Module 08's mechanics" color={K}>
          If <code>unique</code>, <code>not_null</code>, generic vs. singular tests, or how a generic test
          compiles to a plain <code>SELECT</code> are unfamiliar, that is Module 08's territory
          (Testing: Generic and Singular Tests). This module is about deciding <em>which</em> tests to write,
          <em>where</em> to put them, and <em>how severely</em> to treat a failure — not about the test
          syntax itself.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Tiering by DAG Position" />
        <SectionTitle>Source and Staging Tests Are High Leverage; Mart Tests Are High Visibility</SectionTitle>

        <Para>
          Module 08's Part 07 already introduced the idea that a test's position in the DAG changes what
          kind of problem it catches. At scale, this distinction becomes the backbone of an entire test
          strategy, not just a debugging convenience. Two different DAG positions earn tests for two
          genuinely different reasons, and a mature strategy invests deliberately in both rather than
          treating "add a test" as one undifferentiated action everywhere.
        </Para>

        <SubTitle>Source and staging tests: highest leverage</SubTitle>

        <Para>
          A test on a source table or a thin staging model catches a problem before a single downstream
          model has built on top of it. This is the highest-leverage place to test, in the literal
          engineering sense of leverage: one test, placed as early as possible in the DAG, prevents an entire
          downstream fan of models — every intermediate model and mart that eventually <code>ref()</code>s
          this source, directly or transitively — from silently inheriting bad data. A single
          <code>not_null</code> test on a source table's primary key can protect dozens of downstream models
          that were never individually tested for that specific failure, simply because they all sit
          downstream of the one place it was actually caught.
        </Para>

        <SubTitle>Mart tests: highest visibility, highest cost of failure</SubTitle>

        <Para>
          A test on a mart-level fact or dimension table catches a different, later class of problem — one
          introduced by the transformation logic itself, not by the raw data — but it catches it at the point
          of maximum consequence: right before a BI tool queries that table, or a stakeholder opens a
          dashboard built on top of it. A mart-level test failing means the absolute last line of defense
          caught something; anything a mart-level test misses is what a stakeholder sees next, which is why
          mart-level test failures deserve the fastest, most senior attention even though they are
          structurally the "last" tests to run in the DAG, not the first.
        </Para>

        <Table
          headers={['Tier', 'Why it earns a test', 'What a strategy invests in here']}
          rows={[
            ['Source', 'Protects every downstream model at once — the single highest test-to-protection ratio in the whole DAG.', 'Freshness checks and structural tests (unique, not_null) on every column anything downstream depends on being correct.'],
            ['Staging', 'Catches problems introduced by light renaming/casting, still before any real business logic runs.', 'The same structural tests as source, applied post-cast, to catch a casting or renaming bug specifically.'],
            ['Intermediate', 'Localizes exactly which join or aggregation step introduced a fan-out or miscount.', 'Narrow, targeted tests only on the specific risk that model introduces — not blanket coverage.'],
            ['Marts', 'The last checkpoint before a human or a BI tool sees the number — highest cost if wrong.', 'Business-logic assertions (accepted_values on status fields, relationships on every foreign key that feeds a report) and the tests most worth paging someone over.'],
          ]}
        />

        <Para>
          A useful way to say this out loud in a design review: source and staging tests are about
          <em>preventing propagation</em>, and mart tests are about <em>catching what still got through</em>.
          A strategy that only invests in one of these leaves a real gap — all source tests and no mart tests
          means a transformation bug introduced entirely within the DAG (a bad join, a miscounted aggregation)
          sails through to the dashboard with nothing to catch it; all mart tests and no source tests means
          every downstream model pays the cost of processing bad data before the one test at the very end
          finally flags it, several models later than necessary.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Severity: warn vs error" />
        <SectionTitle>Not Every Test Failure Should Block a dbt build</SectionTitle>

        <Para>
          Module 08 mentioned <code>severity</code> briefly; at scale it becomes one of the most important
          levers a test strategy has. Every generic and singular test accepts a <code>severity</code> config
          of <code>error</code> (the default) or <code>warn</code>. This single setting is what separates a
          test that is worth writing from a test that is worth writing <em>and</em> having block the entire
          pipeline when it fails — two genuinely different questions that get conflated when every test
          defaults to <code>error</code> without a second thought.
        </Para>

        <CodeBox label="models/marts/schema.yml — deliberate severity choices">
{`models:
  - name: fct_orders
    columns:
      - name: order_id
        tests:
          - unique
          - not_null
          # no severity override -- default error is correct here.
          # a duplicate or missing order_id is never acceptable.

      - name: customer_id
        tests:
          - relationships:
              to: ref('dim_customers')
              field: customer_id
              config:
                severity: error
                # a broken foreign key on the mart's core join key is a
                # hard stop -- downstream revenue reporting depends on it

      - name: shipping_notes
        tests:
          - not_null:
              config:
                severity: warn
                # a missing shipping note is a real but soft signal --
                # worth a human noticing, not worth blocking the whole
                # fct_orders build and everything that depends on it`}
        </CodeBox>

        <Para>
          The question every test's severity should answer, explicitly, at the time the test is written: if
          this fails, is it acceptable for <code>dbt build</code> to keep going and build everything
          downstream anyway, with a human reviewing the warning later? Or does a failure here mean something
          downstream is now provably untrustworthy, in which case the build must stop? A soft data-quality
          signal — an optional field's fill rate dropping, a slightly-out-of-range but plausible value —
          usually warrants <code>warn</code>. A broken primary key or a foreign key a report's join depends on
          usually warrants <code>error</code>.
        </Para>

        <Table
          headers={['Severity', 'Effect on dbt build', 'When it is the right call']}
          rows={[
            ['error (default)', 'Stops the failing model and anything downstream of it from building further in this run.', 'A structural guarantee something downstream genuinely cannot tolerate being wrong — a duplicate key, a broken required foreign key.'],
            ['warn', 'Reported clearly in run output; build continues, including everything downstream.', 'A soft signal worth a human\'s attention later — an optional field\'s null rate, a plausible-but-unusual value — that does not itself invalidate downstream data.'],
          ]}
        />

        <Callout title="warn is not 'a weaker test' — it is a deliberate trust decision" color={K}>
          Treating every <code>warn</code>-severity test as a lesser or half-finished test misses the point.
          A <code>warn</code> test is a fully real assertion that is being deliberately kept from blocking the
          pipeline, because someone decided the cost of a false stop outweighs the cost of a slightly delayed
          human review. Choosing <code>warn</code> is a real engineering decision, not a placeholder for
          "upgrade to error later" — some tests should stay <code>warn</code> permanently.
        </Callout>

        <SubTitle>error_if and warn_if — thresholds instead of a binary pass/fail</SubTitle>

        <Para>
          For tests where a handful of failures is expected and tolerable but a large number is not, dbt's
          <code>error_if</code> and <code>warn_if</code> configs let a test specify numeric thresholds instead
          of failing on any single returned row.
        </Para>

        <CodeBox label="Thresholds instead of a strict zero-rows contract">
{`models:
  - name: fct_orders
    columns:
      - name: customer_id
        tests:
          - relationships:
              to: ref('dim_customers')
              field: customer_id
              config:
                error_if: ">100"
                warn_if: ">10"
                # fewer than 10 unmatched customer_ids -- ignored entirely,
                # a normal amount of timing lag between two source systems
                # 10-100 unmatched -- reported as a warning, worth a look
                # more than 100 unmatched -- treated as a genuine break,
                # build stops`}
        </CodeBox>

        <Para>
          This matters specifically for relationships-style tests where a small number of failures is a
          known, expected artifact of timing (a customer record that arrived a few minutes after their first
          order, in a system with no strict transactional guarantee across two source tables) rather than a
          genuine break. Without a threshold, that small and expected timing lag fails the test daily, on
          every run, contributing directly to the alert fatigue problem from Part 01.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — store_failures at scale" />
        <SectionTitle>Persisting Failing Rows Is What Makes a Failure Debuggable, Not Just Visible</SectionTitle>

        <Para>
          Module 08 introduced <code>store_failures: true</code> as a way to persist a failing test's result
          set to a real table. At scale, this stops being a nice-to-have and becomes close to mandatory for
          any test whose failure needs to be investigated by more than one person, or investigated more than
          a few minutes after the run finished. Console output from a <code>dbt build</code> that ran overnight
          is, in practice, gone by the time anyone on a platform team looks at it the next morning — the CI
          job's log may still technically exist, but nobody opens a build log to hand-copy forty failing
          customer IDs out of scrollback.
        </Para>

        <CodeBox label="dbt_project.yml — a project-wide default for tests worth persisting">
{`tests:
  +store_failures: true
  +schema: dbt_test_failures

  my_dbt_project:
    staging:
      +store_failures: false
      # high-volume, low-severity staging tests -- persisting every
      # failure here would create enormous storage churn for little
      # value; console output is enough at this tier
    marts:
      +store_failures: true
      # mart-level test failures are exactly the ones worth a
      # queryable, persistent record`}
        </CodeBox>

        <Para>
          This configuration is itself a tiering decision, consistent with Part 02's DAG-position framing:
          high-volume staging tests, where a failure usually just means "re-run the test, look at the live
          data," do not need a persisted failure table. Mart-level tests, where a failure is rarer, more
          consequential, and more likely to need a second engineer's eyes days later, are exactly where
          <code>store_failures</code> earns its storage cost.
        </Para>

        <Output>{`FAIL relationships_fct_orders_customer_id__customer_id__ref_dim_customers_
  Got 63 results, configured to fail if != 0 ...................... [FAIL 63 in 1.4s]

  -- persisted at analytics.dbt_test_failures.relationships_fct_orders_...
  -- an on-call engineer the next morning queries this table directly,
  -- filters by customer_id, and joins back to source system logs --
  -- without needing to re-run the test or dig through a CI log at all`}</Output>

        <Para>
          The practical difference this makes at scale: a persisted failure table turns "re-run the query by
          hand to see what broke" into "query the table that already has the answer," which is the difference
          between a five-minute investigation and a fifteen-minute one repeated by every engineer who later
          needs to look at the same failure. Multiplied across a project with hundreds of mart-level tests,
          that time saved compounds directly into whether test failures actually get investigated at all,
          rather than being waved off because investigating them is annoying.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Freshness SLAs" />
        <SectionTitle>Source Freshness Is a Team Agreement, Not an Arbitrary Number</SectionTitle>

        <Para>
          A structural test like <code>not_null</code> checks whether the data that arrived is well-formed.
          It says nothing about whether the data arrived <em>on time</em>. A source table can pass every
          structural test in the project while being six hours stale, and every downstream model built on top
          of it will look perfectly healthy — clean, well-formed, and quietly wrong because it reflects
          yesterday's world instead of today's. Freshness checks close this gap.
        </Para>

        <CodeBox label="models/staging/_sources.yml — freshness thresholds">
{`sources:
  - name: raw_ecommerce
    tables:
      - name: orders
        loaded_at_field: _loaded_at
        freshness:
          warn_after: {count: 6, period: hour}
          error_after: {count: 24, period: hour}

      - name: payments
        loaded_at_field: _loaded_at
        freshness:
          warn_after: {count: 1, period: hour}
          error_after: {count: 3, period: hour}
          # payments data feeds fraud and reconciliation checks that
          # cannot tolerate the same staleness window orders can`}
        </CodeBox>

        <Para>
          <code>warn_after</code> and <code>error_after</code> are checked by <code>dbt source freshness</code>
          (typically run as its own step before <code>dbt build</code>, so a stale source is caught before
          the pipeline wastes time transforming data that is already known to be too old). The specific
          numbers chosen here are not a technical fact about the data — they are a documented agreement
          between the data platform team and whoever consumes this data about what "acceptably fresh" means
          for this specific source, and different sources legitimately deserve very different thresholds, as
          the orders-versus-payments contrast above shows.
        </Para>

        <Callout title="An undocumented freshness threshold is really just a guess" color={K}>
          A <code>warn_after</code> value picked without asking "who actually depends on this being fresh, and
          how stale can it get before their use case breaks" is not meaningfully better than no freshness
          check at all — it will either alert constantly on normal, acceptable delays, training the team to
          ignore it (the same alert-fatigue failure mode from Part 01), or it will stay silent through a
          staleness window that actually does matter to someone. The number itself should be traceable to a
          specific stated business requirement, not a default copied from another source's config.
        </Callout>

        <SubTitle>Freshness as an early-warning system, not just a compliance check</SubTitle>

        <Para>
          The highest-leverage placement for freshness checks is on the sources feeding the models with the
          tightest downstream latency requirements — exactly the kind of prioritization Part 02 argues for at
          the structural-test level, applied here to timeliness instead of correctness. A freshness check on
          the <code>payments</code> source failing an hour into a staleness window gives the platform team an
          hour's head start on investigating a broken upstream extract, well before any downstream model's own
          tests would have a chance to fail from data simply not being there yet.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Culture, Not Just Assertions" />
        <SectionTitle>A Pile of Tests Nobody Owns Is Not a Testing Strategy</SectionTitle>

        <Para>
          Everything covered so far in this module — tiering, severity, thresholds, persisted failures,
          freshness SLAs — is mechanical. None of it matters if a test failing in production has no defined
          next step. A mature data-quality practice is as much an operational and cultural commitment as it
          is a set of YAML configs, and the questions below are the ones an actual team needs answered, in
          writing, before a critical test failure happens for the first time in production rather than during
          the incident itself.
        </Para>

        <Table
          headers={['Question', 'Why it has to be answered in advance']}
          rows={[
            ['Who gets paged when a critical, error-severity, mart-level test fails in production?', 'Deciding this during the incident means precious time spent figuring out ownership instead of investigating the actual failure.'],
            ['Is a warn-severity failure reviewed on any cadence, or does it just accumulate silently?', 'A warn test nobody ever reviews is functionally identical to no test at all — it was written for a reason, and that reason is wasted if nobody looks.'],
            ['What is the triage path from "a test failed" to "this is fixed" — who investigates, who decides if it is a real incident?', 'Without a defined path, every failure gets an ad hoc response, and response quality becomes a function of who happens to notice first.'],
            ['When a test consistently fails and gets ignored for months, who has the authority to delete it or fix its threshold?', 'A test nobody owns tends to just accumulate as permanent, ignored noise rather than being fixed or retired — exactly the alert-fatigue failure mode from Part 01, but for one specific test rather than the whole suite.'],
          ]}
        />

        <Para>
          The anti-pattern worth naming explicitly: a test that was added by an engineer who has since left
          the team, that nobody currently on the team fully understands the business reasoning behind, that
          fails intermittently, and that everyone has learned to re-run rather than investigate. This test is
          strictly worse than no test — it costs CI time and cognitive load on every failure, and its
          continued presence gives a false sense that "this business rule is being checked" when in practice
          nobody would actually notice if the rule were silently violated, because the failure output is never
          read closely anymore.
        </Para>

        <Callout title="Assign an owner at the moment a test is written, not after it starts failing" color={K}>
          The cheapest time to answer "who looks at this when it fails, and what do they do" is the same
          pull request that adds the test — usually as a one-line comment in the YAML or a linked runbook —
          not three months later when the test has already failed a dozen times with no response. Teams that
          treat test ownership as an afterthought consistently end up with the ignored-test anti-pattern
          described above.
        </Callout>

        <SubTitle>Trust is built by what gets caught before a stakeholder sees it, not by test count</SubTitle>

        <Para>
          A data team's credibility with the business is not a function of how many tests exist in the
          project — a stakeholder never sees the YAML files. It is a function of a much simpler, harder-won
          track record: does this team's data consistently turn out to be right, or does a stakeholder
          periodically discover a wrong number on their own and have to come ask why? Every test tiered
          correctly by DAG position, given the right severity, with a real owner for its failures, is a small
          contribution to that track record. A pile of 5,000 untiered, unowned tests that nobody reads is not
          — it can coexist with a team that still gets caught by a stakeholder finding the bug first, because
          volume of tests was never actually the thing determining whether problems get caught before they
          are seen.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Worked Example" />
        <SectionTitle>Designing a Tiered Test Strategy for a Multi-Source Analytics Project</SectionTitle>

        <Para>
          Consider a project with three source systems feeding one analytics warehouse: a Postgres
          application database (<code>orders</code>, <code>customers</code>), a third-party payments
          processor's API extract (<code>payments</code>), and a marketing platform's ad-spend export
          (<code>ad_spend</code>). A small, two-person platform team owns the dbt project and is on call for
          it. Below is the tiering decision for each layer, worked through the way Part 02 and Part 03
          together would suggest.
        </Para>

        <CodeBox label="stg_orders and stg_customers — high-leverage, error severity, no thresholds needed">
{`models:
  - name: stg_orders
    columns:
      - name: order_id
        tests: [unique, not_null]
      - name: customer_id
        tests: [not_null]

  - name: stg_customers
    columns:
      - name: customer_id
        tests: [unique, not_null]

# Reasoning: these are the two highest-traffic, most-depended-on
# staging models in the project. A break here propagates to nearly
# every downstream mart. Default error severity, no thresholds --
# a duplicate or missing key at this layer is never acceptable.`}
        </CodeBox>

        <CodeBox label="stg_payments — error on structure, warn + threshold on a known timing gap">
{`models:
  - name: stg_payments
    columns:
      - name: payment_id
        tests: [unique, not_null]
      - name: order_id
        tests:
          - relationships:
              to: ref('stg_orders')
              field: order_id
              config:
                warn_if: ">5"
                error_if: ">50"

# Reasoning: the payments API extract runs on a slightly different
# schedule than the orders sync, so a handful of payments referencing
# an order_id that hasn't landed yet is expected and NOT a real break
# -- hence a threshold instead of a strict zero-rows contract, matching
# Part 03's error_if/warn_if pattern.`}
        </CodeBox>

        <CodeBox label="stg_ad_spend — lower stakes, warn severity throughout">
{`models:
  - name: stg_ad_spend
    columns:
      - name: campaign_id
        tests:
          - not_null:
              config:
                severity: warn
      - name: spend_amount
        tests:
          - dbt_utils.accepted_range:
              min_value: 0
              config:
                severity: warn

# Reasoning: ad spend data feeds marketing-reporting dashboards, not
# revenue-critical pipelines. A malformed row here is worth a human's
# attention on a weekly review, not worth paging anyone or blocking
# fct_orders and everything downstream of the two higher-stakes
# source systems above.`}
        </CodeBox>

        <CodeBox label="fct_orders (mart layer) — the highest-stakes tests in the project, store_failures on">
{`models:
  - name: fct_orders
    columns:
      - name: order_id
        tests:
          - unique:
              config: { severity: error, store_failures: true }
          - not_null:
              config: { severity: error }
      - name: customer_id
        tests:
          - relationships:
              to: ref('dim_customers')
              field: customer_id
              config: { severity: error, store_failures: true }
      - name: order_status
        tests:
          - accepted_values:
              values: ['placed', 'shipped', 'delivered', 'cancelled', 'refunded']
              config: { severity: error, store_failures: true }

# Reasoning: fct_orders feeds the company's primary revenue dashboard.
# Every test here is error severity with store_failures on -- this is
# the last checkpoint before a stakeholder sees the number, and any
# failure here is worth a persisted, queryable record per Part 04.`}
        </CodeBox>

        <Para>
          Notice the shape of the whole strategy: severity and persistence increase, and thresholds tighten,
          the closer a model sits to something a stakeholder will actually look at, while the earliest,
          highest-leverage layer (<code>stg_orders</code>, <code>stg_customers</code>) gets strict but simple
          error-severity structural tests with no thresholds, because a break that early is never something a
          small threshold should tolerate. Freshness thresholds, from Part 05, would be layered on top of this
          same reasoning — a tighter <code>warn_after</code>/<code>error_after</code> on <code>payments</code>
          than on <code>ad_spend</code>, matching exactly the same stakes-based prioritization used for
          severity above.
        </Para>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Triaging a Failure Backlog" />
        <SectionTitle>Inheriting 40 Failing Tests: Fix, Downgrade, or Delete</SectionTitle>

        <Para>
          Everything so far assumes a project where tests are tiered and owned from the start. In practice,
          a platform engineer is far more likely to inherit a project that has been accumulating failures for
          months — a CI dashboard showing 40 tests currently in a failing state, nobody quite sure which ones
          matter, and a backlog too large to investigate one at a time before doing anything else. This is
          the single most common real starting point for a testing-strategy cleanup, and it deserves its own
          worked method rather than "just go fix them," which is not a plan a small team can actually execute
          against 40 items.
        </Para>

        <Para>
          The instinct to open the oldest failure and start debugging is usually the wrong first move. With
          40 unowned failures accumulated over months, the highest-value first pass is not fixing anything —
          it is triage: sorting all 40 into a small number of buckets so effort gets spent on the failures
          that actually matter, instead of being spent in whatever order the CI dashboard happens to list
          them.
        </Para>

        <Table
          headers={['Bucket', 'What belongs here', 'Action']}
          rows={[
            ['Fix now', 'A mart-level or otherwise high-stakes test, failing on a real, currently-live data problem that would embarrass the team if a stakeholder found it first.', 'Investigate and fix the underlying data or model issue immediately — this is Part 01\'s alert-fatigue risk in its most acute form.'],
            ['Downgrade to warn', 'A test that is technically correct and catching something real, but the failure is a known, tolerable, low-stakes condition — an optional field\'s fill rate, a staging-layer test whose failures never actually block anything useful downstream.', 'Add severity: warn (Part 03) and, if the failure count is stable, an error_if/warn_if threshold calibrated to the observed baseline, so it stops contributing false urgency.'],
            ['Deprecate entirely', 'A test asserting a business rule that no longer holds — the rule changed eighteen months ago and nobody removed the test that checked the old version of it.', 'Delete the test outright, with a one-line note in the PR explaining which business rule it was checking and why that rule no longer applies.'],
            ['Needs an owner before any of the above', 'A test nobody on the current team can explain the original intent of, and no linked documentation exists.', 'Assign someone to spend 15 minutes finding out what it was for before deciding which of the first three buckets it belongs in — never leave a test in this bucket indefinitely.'],
          ]}
        />

        <Para>
          A practical way to run this triage across 40 items without it becoming its own multi-week project:
          spend one focused afternoon sorting every failure into a bucket using only the test's name, the
          model it is attached to, and its DAG tier — not yet its root cause. A <code>relationships</code>{' '}
          test on a staging model with a stable, small failure count for the last six months is very likely a
          "downgrade to warn" candidate on inspection alone, without opening a single row of failing data. A{' '}
          <code>not_null</code> test on a mart's primary key that has apparently been failing for three weeks
          is very likely a "fix now" candidate the moment it is spotted, precisely because nobody should have
          let it sit that long.
        </Para>

        <CodeBox label="a triage pass, recorded directly in the schema.yml as it happens">
{`models:
  - name: stg_ad_campaigns
    columns:
      - name: campaign_name
        tests:
          - not_null:
              config:
                severity: warn
                # TRIAGE 2026-09: was error, failing ~8% of rows for
                # 4 months on a legacy campaign type nobody backfilled.
                # downgraded rather than fixed -- see PR #2291 for the
                # full triage pass across all 40 inherited failures

  - name: fct_orders
    columns:
      - name: order_id
        tests:
          - unique
          # TRIAGE 2026-09: fix-now bucket -- this had been silently
          # failing for 3 weeks due to a duplicate-insert bug in an
          # upstream ETL job, now fixed at the source (see JIRA-4471)`}
        </CodeBox>

        <Para>
          Note what this triage pass deliberately does not do: it does not fix the underlying data problem
          behind every "fix now" test in the same afternoon. It separates the sorting decision (which bucket
          does this belong in) from the fixing work (actually resolving the root cause), because conflating
          the two is exactly what makes a 40-test backlog feel unmanageable in the first place. Sorting 40
          items into four buckets is an afternoon's work; fixing the handful that land in "fix now" is real
          engineering work that deserves its own time, prioritized like any other bug.
        </Para>

        <Callout title="A downgrade is not a defeat" color={K}>
          Moving a test from <code>error</code> to <code>warn</code> during a triage pass can feel like
          giving up on a standard the team once held. It usually is not — it is correcting a severity that
          was wrong from the start, or that stopped being right once the business rule behind it changed.
          The failure mode to actually worry about is the opposite one: leaving a test at <code>error</code>{' '}
          purely out of reluctance to "weaken" it, while the whole team has quietly learned to re-run{' '}
          <code>dbt build</code> past its failure without reading it, which is a far worse outcome than an
          honestly-labeled <code>warn</code>.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 09 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Communicating Status to Stakeholders" />
        <SectionTitle>Turning Test Results Into Something a Non-Technical Stakeholder Can Actually Read</SectionTitle>

        <Para>
          Part 06 argued that a data team's credibility comes from a track record, not from test count. That
          track record is invisible to stakeholders by default — nobody outside the data team reads YAML
          files or a raw <code>dbt build</code> log, and "we have good tests" is not a claim a finance or
          product stakeholder has any way to verify on their own. Closing that gap means translating test
          results into a small, regularly-updated summary a non-technical reader can actually use, rather than
          assuming trust will accumulate on its own.
        </Para>

        <Para>
          The three numbers that matter most to a stakeholder are simpler than the full YAML strategy behind
          them: is the data fresh enough to trust right now, what percentage of tests passed on the most
          recent run, and — the number that actually matters most — is anything currently broken that this
          stakeholder specifically depends on. A useful digest reports exactly these three things and nothing
          more; a stakeholder does not need to know the difference between <code>warn</code> and{' '}
          <code>error</code> severity to understand "3 tests are currently failing on the revenue mart."
        </Para>

        <CodeBox label="a run-operation macro that posts a daily digest to Slack">
{`{% macro post_test_digest() %}

  {% set query %}
    select
        count(*) as total_tests,
        sum(case when status = 'pass' then 1 else 0 end) as passed,
        sum(case when status = 'fail' and severity = 'error' then 1 else 0 end)
            as critical_failures
    from analytics.dbt_test_results
    where run_date = current_date
  {% endset %}

  {% set results = run_query(query) %}
  {% set row = results.rows[0] %}
  {% set pass_rate = (row['passed'] / row['total_tests'] * 100) | round(1) %}

  {% set message %}
Daily Data Quality Digest -- {{ run_started_at.strftime('%Y-%m-%d') }}
Pass rate: {{ pass_rate }}% ({{ row['passed'] }}/{{ row['total_tests'] }})
Critical failures (error severity): {{ row['critical_failures'] }}
Source freshness: see #data-freshness-alerts for any active warnings
  {% endset %}

  {{ log(message, info=true) }}
  {% do run_query("call analytics.post_to_slack('#data-quality', '" ~ message ~ "')") %}

{% endmacro %}`}
        </CodeBox>

        <Para>
          This is deliberately a <code>run-operation</code>-style macro rather than a hook, scheduled once a
          day outside of every individual <code>dbt build</code> — the digest is a reporting action, not a
          side effect that needs to fire on every developer's local test run. It reads from a
          <code>dbt_test_results</code> table populated the same way <code>store_failures</code> populates a
          failure table in Part 04, aggregated into the handful of numbers a stakeholder actually needs.
        </Para>

        <Output>{`Daily Data Quality Digest -- 2026-09-11
Pass rate: 99.1% (438/442)
Critical failures (error severity): 1
Source freshness: see #data-freshness-alerts for any active warnings`}</Output>

        <Para>
          A single number like "1 critical failure" posted to a channel finance and product stakeholders
          already read is worth more, in trust terms, than a perfect internal test suite nobody outside the
          data team ever hears about. It also creates a useful discipline in the other direction: a data team
          that has committed to posting this digest daily has a strong incentive to keep the critical-failure
          count near zero, because the number is now visible to the exact people the team's credibility
          depends on.
        </Para>

        <Table
          headers={['Audience', 'What they need to see', 'What to leave out']}
          rows={[
            ['A finance or product stakeholder', 'Pass rate, critical (error-severity) failure count, whether anything they specifically depend on is currently broken.', 'Individual test names, severity config syntax, DAG tier terminology — none of it is actionable to them.'],
            ['A platform/data engineering team lead', 'The same digest, plus a trend over time — is the critical-failure count trending down after a triage pass, or drifting back up.', 'Nothing — this audience benefits from more detail, not less, including the full failing-test list from the store_failures tables.'],
            ['A new stakeholder evaluating whether to trust a new mart', 'A specific answer to "what tests protect this exact table" and how often they have caught something real.', 'A generic claim that "the whole project is well tested" without anything tying that claim to the specific table they care about.'],
          ]}
        />

        <Callout title="A dashboard nobody looks at is the same failure as an unowned test" color={K}>
          Building a data-quality dashboard or Slack digest and never revisiting whether anyone actually reads
          it repeats the exact anti-pattern from Part 06, one level up: a status report with no owner and no
          feedback loop tends to go stale — a pass-rate number frozen from months ago, quietly wrong, doing
          more harm than no dashboard at all because it creates false confidence. Treat the digest itself as
          something with an owner, checked periodically for whether it is still accurate and still being read.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 10 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Business-Rule Tests With dbt_utils" />
        <SectionTitle>Beyond Generic Tests: Encoding an Actual Business Rule as a First-Class Assertion</SectionTitle>

        <Para>
          <code>unique</code>, <code>not_null</code>, <code>accepted_values</code>, and{' '}
          <code>relationships</code> check structural properties of a column in isolation — is it present, is
          it one of a fixed list, does it point somewhere real. A large category of genuine data-quality
          problems has nothing to do with any single column, though: they are relationships <em>between</em>{' '}
          columns, or arithmetic that should always hold across a row, and none of the four built-in generic
          tests can express that on their own. <code>dbt_utils.expression_is_true</code> is the step up: it
          lets a test assert any SQL boolean expression against every row, which means a real business rule —
          not just a structural shape — becomes a first-class, named, tiered, owned test exactly like any
          other.
        </Para>

        <CodeBox label="a business rule generic tests genuinely cannot express">
{`models:
  - name: fct_orders
    tests:
      - dbt_utils.expression_is_true:
          expression: "order_total_cents = subtotal_cents + tax_cents + shipping_cents"
          config:
            severity: error
            store_failures: true

# no combination of unique/not_null/accepted_values/relationships can
# check that four separate columns are internally arithmetically
# consistent with each other on every row -- this is a genuine
# business rule about how an order's total is composed, and it
# deserves to be tested as directly and explicitly as a foreign key`}
        </CodeBox>

        <Para>
          This example is deliberately mundane, which is the point: a mismatch here almost always means a
          real bug in the transformation logic that computes <code>order_total_cents</code> — a rounding
          error, a discount applied twice, a shipping fee dropped during a refactor — and it is exactly the
          kind of bug that a column-by-column <code>not_null</code> check would never catch, because every
          individual column still holds a perfectly valid, non-null number. The problem only exists in the
          relationship between them.
        </Para>

        <CodeBox label="a second common shape -- a conditional business rule, not just an arithmetic one">
{`models:
  - name: fct_subscriptions
    tests:
      - dbt_utils.expression_is_true:
          expression: "case when status = 'cancelled' then cancelled_at is not null else true end"
          config:
            severity: error

# the actual business rule: "a cancelled subscription must have a
# cancellation timestamp." not_null on cancelled_at alone would be
# wrong -- an active subscription is SUPPOSED to have a null
# cancelled_at. the rule is conditional, and expression_is_true is
# what lets that conditional logic be expressed directly.`}
        </CodeBox>

        <Para>
          Reaching for a custom singular test, instead, is still the right call when the underlying SQL
          needed to express a rule genuinely requires a join, a window function, or an aggregation —{' '}
          <code>expression_is_true</code> is deliberately limited to a single boolean expression evaluated
          per row of one model, with no <code>JOIN</code> of its own. The practical dividing line: if the
          rule can be written as one <code>CASE</code> expression or comparison referencing only columns
          already present on the row, <code>expression_is_true</code> is the more direct match than reaching
          for a full custom singular test; anything requiring its own subquery or join is still singular-test
          territory.
        </Para>

        <Table
          headers={['Mechanism', 'What it can express', 'When it is the right tool']}
          rows={[
            ['Built-in generic tests (unique, not_null, accepted_values, relationships)', 'A single column\'s structural shape, or a reference to another table.', 'Structural correctness — the vast majority of a project\'s test volume, per Part 02.'],
            ['dbt_utils.expression_is_true', 'A boolean expression over columns already present on the same row — arithmetic consistency, conditional relationships between fields.', 'A genuine business rule expressible as one row-level comparison, without needing a join or aggregation of its own.'],
            ['A custom singular test', 'Any arbitrary SQL query, including joins, window functions, and aggregations.', 'A business rule that genuinely needs to look across rows or join to another model to be checked at all.'],
          ]}
        />

        <Callout title="A business-rule test is worth documenting its reasoning inline, more than a structural one" color={K}>
          A <code>not_null</code> test is self-explanatory from its name alone. An{' '}
          <code>expression_is_true</code> test encoding a specific business rule is not — six months later,
          nobody should have to reverse-engineer what <code>order_total_cents = subtotal_cents + tax_cents +
          shipping_cents</code> was actually protecting against. A short YAML comment stating the business
          reasoning, right next to the test, is what keeps a business-rule test from becoming exactly the
          kind of unexplained, eventually-ignored test described in Part 06.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 11 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Rolling Out expression_is_true Without Breaking CI" />
        <SectionTitle>Introducing a New Business-Rule Test to an Existing, Already-Dirty Model</SectionTitle>

        <Para>
          A detail worth planning for before adding a <code>dbt_utils.expression_is_true</code> test to a
          mart that has been in production for a long time: the very first run after adding it is very
          likely to fail, immediately, on historical rows that predate the business rule being enforced
          consistently. Treating that first failure as a reason to abandon the test, or as a sign something
          is wrong with the test itself, is the wrong read — it usually means the test is doing exactly its
          job, surfacing a real, pre-existing inconsistency the team simply never had a way to see before.
        </Para>

        <CodeBox label="a staged rollout -- warn first, confirm the failure count is understood, then tighten to error">
{`models:
  - name: fct_orders
    tests:
      - dbt_utils.expression_is_true:
          expression: "order_total_cents = subtotal_cents + tax_cents + shipping_cents"
          config:
            severity: warn
            store_failures: true
            # STAGED ROLLOUT 2026-09: added as warn first specifically
            # because this model has 6 years of historical orders and
            # an old pricing engine that predates tax being tracked as
            # its own column. upgrade to error once the historical
            # failure count is understood and either backfilled or
            # explicitly scoped out via a WHERE clause below.`}
        </CodeBox>

        <Para>
          Once the initial <code>warn</code>-severity run reveals how many rows actually fail, and roughly
          why, there are two honest paths forward, and the choice between them should be made deliberately
          rather than defaulting to whichever is less work: either the historical data genuinely gets fixed
          (a backfill correcting the old rows), or the rule is scoped to only apply going forward, with that
          scoping made explicit in the test itself rather than left as an unexplained gap.
        </Para>

        <CodeBox label="scoping the rule explicitly to rows created after the pricing engine changed">
{`models:
  - name: fct_orders
    tests:
      - dbt_utils.expression_is_true:
          expression: "order_total_cents = subtotal_cents + tax_cents + shipping_cents"
          config:
            severity: error
            store_failures: true
          # scoped via the test's own where clause, not a silent
          # exclusion buried in the model's SELECT
          where: "order_placed_at >= '2024-01-01'"
# using the test's own where config, instead of silently filtering
# inside the model's SELECT, keeps the scope decision visible right
# next to the test itself -- anyone reading schema.yml sees both the
# rule and its documented boundary in the same place`}
        </CodeBox>

        <Para>
          Using the test's own <code>where</code> clause rather than a filter buried inside the model's{' '}
          <code>SELECT</code> keeps this decision honest and visible. A silent <code>WHERE order_placed_at
          {'>='} '2024-01-01'</code> hidden somewhere in the model file's business logic looks, to the next
          engineer reading it, like ordinary transformation logic rather than a deliberate scoping decision
          made specifically to accommodate a known historical gap — exactly the kind of undocumented
          judgment call that turns into a confusing surprise later.
        </Para>

        <Callout title="A first-run failure on a new business-rule test is information, not a bug in the test" color={K}>
          The instinct to treat a newly added test's immediate failure as proof the test is wrong is worth
          resisting specifically for business-rule tests added to old data. Structural tests like{' '}
          <code>not_null</code> rarely surprise anyone this way, because most projects already assume columns
          should be populated. A business-rule test encoding logic that was never previously checked is far
          more likely to surface a real, long-standing gap the moment it is turned on — treat that first
          failure count as the actual finding, not as a reason to delete the test.
        </Callout>
      </section>

      <Divider />

      {/* ── Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About Testing Strategy at Scale</SectionTitle>

        {[
          {
            wrong: '"More tests always means better data quality"',
            right: 'Past a certain point, more untiered tests produce alert fatigue — engineers learn to skim past a wall of red results, and a genuinely critical failure gets the same ignored treatment as forty low-value ones (Part 01). Data quality comes from tiering, ownership, and severity decisions, not raw test count.',
          },
          {
            wrong: '"severity: warn means the test is less important or half-finished"',
            right: 'warn is a deliberate decision that a real, fully-written assertion should not block the pipeline when it fails — a soft signal worth a human\'s attention on its own schedule, not a downgrade. Choosing warn over error is an engineering call, not a placeholder (Part 03).',
          },
          {
            wrong: '"A freshness threshold like warn_after is just a technical setting, pick something reasonable"',
            right: 'A freshness threshold is a team agreement about acceptable staleness for a specific business need, not an arbitrary number. Picked without asking who depends on the data and how stale it can get, it either alerts constantly on normal delays or stays silent through staleness that genuinely matters (Part 05).',
          },
          {
            wrong: '"Testing at the source layer and the mart layer is redundant duplication"',
            right: 'Source/staging tests are the highest-leverage place to catch a problem, because they protect every downstream model at once, before propagation. Mart tests are the highest-visibility place, catching what still got through right before a stakeholder sees it. They catch different failure classes and both are worth investing in deliberately (Part 02).',
          },
          {
            wrong: '"Once a test is written and passing in CI, the job is done"',
            right: 'A test with no defined owner, no triage path, and no review cadence for its warn-severity failures tends to become permanent, ignored noise the moment it starts failing intermittently — strictly worse than no test, because it still costs attention on every run while providing none of the protection anyone assumes it does (Part 06).',
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
        <SectionTitle>Three Companies That Learned Testing Strategy the Hard Way</SectionTitle>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Calendly — scheduling platform, alert fatigue on the analytics team
          </div>
          <Para>
            Calendly's analytics engineering team had grown its dbt test suite organically for two years,
            adding a test nearly every time a bug was found, with every single test left at the default
            <code>error</code> severity and no distinction between a staging model and a mart. By the time the
            suite reached several thousand tests, a typical <code>dbt build</code> produced 15-30 failures on
            an ordinary day, almost none of which anyone had time to investigate individually.
          </Para>
          <Para>
            A genuine break — a foreign key failure on the mart feeding the company's core usage-billing
            report — sat unnoticed in the run output for four days, indistinguishable from the routine noise
            around it, until a finance stakeholder flagged a billing discrepancy directly. The team's
            subsequent fix was exactly the tiering exercise in Part 07: every test was re-classified by DAG
            layer and business stakes, most staging-layer structural tests kept <code>error</code>, most
            optional-field checks moved to <code>warn</code>, and every mart-level test touching a
            revenue-facing report got <code>store_failures</code> and an assigned on-call owner.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Webflow — website builder, freshness SLA as a stakeholder-negotiated agreement
          </div>
          <Para>
            Webflow's data team originally set a blanket <code>warn_after: 12 hours</code> freshness threshold
            on every source table in the warehouse, copied from one early source's config into every
            <code>_sources.yml</code> file that followed. A finance stakeholder relying on a daily revenue
            reconciliation report was, without anyone realizing it, working from data that could legitimately
            be stale for up to half a day under that blanket threshold — well past what the reconciliation
            process actually needed to stay trustworthy.
          </Para>
          <Para>
            After the gap was found (during a reconciliation mismatch traced back to a source that had, in
            fact, been stale for nine hours — inside the 12-hour threshold and therefore silent), the team
            replaced the copied blanket setting with per-source thresholds negotiated directly with each
            source's actual stakeholders, exactly the practice described in Part 05: the billing-adjacent
            source got a 2-hour <code>error_after</code>, while a low-stakes internal-tooling source kept a
            much looser 24-hour window.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Gusto — payroll platform, ownership fixed an ignored test
          </div>
          <Para>
            A <code>relationships</code> test on a payroll-adjacent mart at Gusto had been failing
            intermittently for months, generating a small number of unmatched rows on most runs. No specific
            engineer had ever been assigned to it, and it had quietly become the team's most-ignored test —
            every engineer who saw it fail assumed someone else had already looked into it.
          </Para>
          <Para>
            A new platform-team lead, instituting the ownership practice from Part 06, assigned every
            existing mart-level test an explicit owner and a documented expected-failure-rate baseline as part
            of a test-audit sprint. Investigating this specific test under that new ownership surfaced a real,
            previously undiagnosed timing race between two source systems — exactly the kind of finding
            Part 03's <code>warn_if</code>/<code>error_if</code> thresholds are designed to handle cleanly,
            which is precisely what the team added once the root cause was understood, rather than continuing
            to let the test fail unowned indefinitely.
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
            q: 'Why can adding more tests to a dbt project actually make data quality worse, and how would you fix a project that has fallen into this trap?',
            a: 'Past a certain volume, untiered tests all defaulting to error severity produce a wall of red output on every run, most of it low-stakes noise an engineer has learned to skim past — which means a genuinely critical failure gets the same ignored treatment as everything around it (Part 01). The fix is not deleting tests, it is tiering: re-classify every test by DAG position (Part 02) and business stakes, moving soft signals to warn severity, adding error_if/warn_if thresholds where a small number of failures is expected and known (Part 03), and assigning store_failures plus an explicit owner to the handful of tests that actually matter most (Part 04, Part 06).',
          },
          {
            q: 'Explain the difference in purpose between a test on a staging model and the same conceptual test on a mart-level model, using a real example.',
            a: 'A unique test on a staging model\'s primary key protects every downstream model that transitively depends on it — the highest-leverage place to catch a problem, because it prevents propagation entirely (Part 02). The same unique test on a mart-level fact table catches a different, later class of bug — one introduced by the transformation logic itself, like a join that fanned out between staging and the mart — and it catches it at the point of maximum consequence, right before a dashboard or stakeholder sees the number. Both are worth having; a strategy investing in only one leaves either a propagation gap or a last-line-of-defense gap.',
          },
          {
            q: 'When would you use severity: warn instead of the default severity: error on a dbt test, and is a warn-severity test a weaker test?',
            a: 'warn is the right call when a failure is a genuine, real signal worth a human noticing, but not itself proof that anything downstream has become untrustworthy — an optional field\'s fill rate, a plausible-but-unusual value. It is not a weaker or unfinished test; it is a deliberate decision that this specific assertion should not have the power to stop dbt build for everything downstream (Part 03). Treating warn tests as an afterthought is exactly how they turn into permanently ignored noise (Part 06) — a warn test still needs an owner and a review cadence, same as an error test.',
          },
          {
            q: 'What is store_failures actually for, and why does it matter more as a project scales up?',
            a: 'store_failures persists a failing test\'s actual result set to a real table in the warehouse instead of leaving it only visible transiently in console output (Part 04). At small scale this is a nice-to-have; at scale, where a CI run\'s console log is effectively inaccessible by the next morning and a failure might need investigating by more than one engineer, a persisted, queryable failure table is often the difference between a five-minute investigation and re-running the underlying query by hand every single time someone needs to look at it. It is worth reserving for the tests where a failure is rare and consequential enough to justify the storage cost — typically mart-level tests, not high-volume staging tests.',
          },
          {
            q: 'Why should a freshness SLA like warn_after or error_after be treated as a negotiated agreement rather than a technical default?',
            a: 'A freshness threshold picked without asking who actually depends on the data and how stale it can get before their specific use case breaks is functionally a guess (Part 05) — it will either fire constantly on normal, harmless delays, training the team to ignore it exactly the way untiered structural tests do (Part 01), or it will stay silent through a staleness window that genuinely does matter to someone, as in the reconciliation-report example where a copied blanket threshold masked a real problem. The right threshold is traceable to a specific stated business requirement for that specific source, not copied from another source\'s config.',
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
        <SectionTitle>Five Mistakes Teams Make Building a Test Strategy at Scale</SectionTitle>

        {[
          {
            title: 'Leaving every test at the default error severity regardless of what it actually checks',
            detail: 'Not every real assertion deserves the power to stop the whole pipeline. A soft signal left at error severity either gets a false-positive block that trains the team to distrust the build, or gets quietly excepted in ways that erode the meaning of error entirely.',
          },
          {
            title: 'Copying a freshness threshold from one source\'s config into every other source without asking who depends on it',
            detail: 'A blanket warn_after/error_after applied everywhere is a guess dressed up as a technical setting. Different sources genuinely deserve different thresholds based on what actually consumes them and how stale they can tolerably be.',
          },
          {
            title: 'Adding a test with no plan for who looks at it when it fails',
            detail: 'A test written without an assigned owner or triage path tends to become permanently ignored noise the first time it fails intermittently — worse than no test, because it still costs attention on every run.',
          },
          {
            title: 'Treating store_failures as an all-or-nothing project-wide setting instead of tiering it',
            detail: 'Turning it on for every test, including high-volume low-severity staging checks, creates storage churn with little payoff. Turning it on nowhere means a rare, critical mart-level failure has to be investigated by hand every single time. Tier it the same way severity is tiered.',
          },
          {
            title: 'Measuring the health of a testing strategy by test count instead of by what gets caught before a stakeholder sees it',
            detail: 'A project with thousands of untiered tests can still let a real problem reach a dashboard, while a project with far fewer, deliberately tiered and owned tests can reliably catch what actually matters. Test count is not the metric that predicts stakeholder trust.',
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
        <SectionTitle>Testing-at-Scale Errors — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: 'dbt build reports 20+ test failures on a routine daily run, and nobody on the team can say which ones are actually new',
            cause: 'Tests were added over time without tiering by severity or DAG position, so routine, expected, low-stakes failures sit in the same undifferentiated output as anything genuinely new — the exact alert-fatigue failure mode from Part 01.',
            fix: 'Run a tiering audit: reclassify every failing test\'s severity based on DAG position and business stakes (Part 02, Part 03), and add error_if/warn_if thresholds to any test with a known, tolerable baseline failure rate so routine noise stops appearing as a failure at all.',
          },
          {
            error: 'A relationships test on a fast-moving source pair fails every single day with a small, stable number of unmatched rows',
            cause: 'Two source systems sync on slightly different schedules, so a handful of rows referencing a not-yet-arrived record is an expected timing artifact, not a real data quality break, and a strict zero-rows test cannot express that distinction.',
            fix: 'Add warn_if/error_if thresholds calibrated to the known, observed baseline count (Part 03), so the test only fires as a real signal once the count genuinely exceeds what routine timing lag explains.',
          },
          {
            error: 'source freshness reports stale on a source that everyone agrees is actually fine at that staleness level',
            cause: 'The warn_after/error_after threshold was copied from another source\'s config rather than set based on this specific source\'s actual downstream requirements — a technical-looking number that was never actually agreed on with the people depending on this data.',
            fix: 'Ask the stakeholders who actually consume this source what staleness genuinely breaks their use case, and set warn_after/error_after to match that answer specifically, per Part 05 — not a value copied from an unrelated source.',
          },
          {
            error: 'A test has been failing intermittently for months and nobody has ever investigated the root cause',
            cause: 'The test has no assigned owner and no defined triage path, so every engineer who sees it fail assumes someone else already knows about it — the ignored-test anti-pattern from Part 06.',
            fix: 'Assign an explicit owner and a documented expected-failure baseline to the test as part of a deliberate audit, and investigate the actual root cause once, rather than continuing to let it fail unowned indefinitely.',
          },
          {
            error: 'A critical relationships test failure on a revenue-facing mart is discovered by a stakeholder before the on-call engineer notices it',
            cause: 'The test was left at a severity and visibility level indistinguishable from dozens of lower-stakes tests failing in the same run, so it did not stand out enough in practice to get the fast attention its actual business stakes warranted.',
            fix: 'Reserve error severity plus store_failures plus an explicit on-call owner specifically for the small set of tests that sit closest to what a stakeholder directly sees (Part 04, Part 07), so a failure there is unmistakably distinct from routine, lower-stakes noise elsewhere in the suite.',
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
        'Past a certain volume, untiered tests produce alert fatigue that is worse than having no tests at all — a genuinely critical failure gets skimmed past along with routine noise.',
        'Source and staging tests are the highest-leverage place to test, protecting every downstream model at once; mart-level tests are the highest-visibility, last-checkpoint place, catching what still got through right before a stakeholder sees it.',
        'severity: warn is a deliberate decision, not a weaker test — use error only for failures that genuinely mean downstream data cannot be trusted, and pair error_if/warn_if thresholds with any test that has a known, tolerable baseline failure rate.',
        'store_failures persists the actual failing rows to a queryable table — essential for any test whose failure needs investigating by more than one person or more than a few minutes after the run finished.',
        'A freshness SLA (warn_after/error_after) is a negotiated agreement with actual data consumers about acceptable staleness, not a number copied from another source\'s config.',
        'A testing strategy is a cultural commitment as much as a mechanical one: every test needs an owner, a triage path, and a review cadence, or it degrades into permanently ignored noise.',
        'A team\'s credibility is built by consistently catching bad data before a stakeholder does — a function of tiering, ownership, and severity decisions, not raw test count.',
      ]} />
    </LearnLayout>
  )
}
