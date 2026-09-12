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

export default function PackagesModule() {
  return (
    <LearnLayout
      title="Packages and dbt_utils"
      description="What a dbt package actually is, packages.yml syntax, dbt deps, why version pinning matters, and the dbt_utils macros worth knowing cold — surrogate_key, date_spine, pivot, and unique_combination_of_columns."
      section="dbt — Module 11"
      readTime="55 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'Packages and dbt_utils', href: '/learn/dbt/packages' },
      ]}
      prev={{ title: 'Jinja and Macros: Templating SQL', href: '/learn/dbt/jinja-and-macros' }}
      next={{ title: 'Seeds: Loading Static Reference Data', href: '/learn/dbt/seeds' }}
    >
      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What a Package Actually Is" />
        <SectionTitle>A dbt Package Is a Shareable dbt Project</SectionTitle>

        <Para>
          Every dbt project you have built so far in this track has been self-contained: models, macros,
          tests, and seeds all living inside one repository, written by your own team. A dbt package breaks
          that assumption. A package is itself a complete dbt project — with its own macros, models, and
          tests — that is packaged up so it can be installed into a different dbt project and used there,
          the same way a Python library gets installed with pip or an npm library gets installed with
          npm install. Someone else wrote it, tested it, and published it. You pull it in and use its
          macros and models as if you had written them yourself.
        </Para>

        <Para>
          This is a different distribution unit than anything covered in the earlier modules in this track.
          A macro (covered in the previous module) is something you write once inside your own project and
          call repeatedly within that project. A package is something someone else wrote, in an entirely
          separate project, that you install as a dependency of your project. The macros inside an installed
          package become callable from your own models exactly like your own project's macros — dbt does not
          meaningfully distinguish "a macro I wrote" from "a macro a package I installed provides," once it
          has been installed and compiled into your project's macro namespace.
        </Para>

        <HighlightBox>
          <Para>
            <strong>The mental model that clicks fastest:</strong> a dbt package is to a dbt project what an
            npm package is to a JavaScript project, or what a pip package is to a Python project. It is
            reusable code, written and maintained by someone else (a vendor, an open-source community, or
            even another team at your own company), that you declare as a dependency and pull down into
            your own project's dependency folder before you can use it.
          </Para>
        </HighlightBox>

        <Para>
          Why does this exist at all? Because an enormous amount of what teams write in their macros/
          directory is not actually specific to their business — it is general-purpose SQL-generation logic
          that thousands of other dbt users also need. Generating a surrogate key by hashing several columns
          together. Building a complete calendar date dimension from a start date to an end date. Pivoting a
          long, narrow table into a wide one. These are not FreshCart-specific or Compass-specific problems —
          they are generic SQL engineering problems that come up on nearly every analytics engineering team,
          and writing the correct, edge-case-hardened version of that macro from scratch on every team, at
          every company, is a waste of engineering time that a shared package eliminates.
        </Para>

        <Callout title="A package is code, not a service" color={K}>
          It is worth being precise about what installing a package does NOT do. It does not connect your
          warehouse to some external system. It does not run anything automatically. Installing a package
          only downloads its macros and models as files onto your machine (into a folder called
          dbt_packages/) so that dbt can find and compile them alongside your own project's files the next
          time you run dbt. Nothing happens until you actually reference something the package defines.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — packages.yml" />
        <SectionTitle>Declaring Dependencies in packages.yml</SectionTitle>

        <Para>
          A dbt project declares which packages it depends on in a file named packages.yml, sitting at the
          root of the project alongside dbt_project.yml. This file is a list of package declarations. dbt
          supports two main ways of declaring where a package comes from: by referencing its name on
          dbt Hub, the public registry of dbt packages, or by pointing directly at a git repository URL.
        </Para>

        <SubTitle>Installing from dbt Hub — the common case</SubTitle>

        <Para>
          Most well-known community packages, including dbt_utils itself, are published to dbt Hub. Hub
          installs are the simplest form — you give the package name and a version constraint, and dbt
          resolves and downloads the matching release.
        </Para>

        <CodeBox label="packages.yml — installing from dbt Hub">
{`packages:
  - package: dbt-labs/dbt_utils
    version: [">=1.1.0", "<2.0.0"]

  - package: dbt-labs/codegen
    version: [">=0.12.0", "<0.13.0"]`}
        </CodeBox>

        <Para>
          The version field is a range, not a single pin — but notice the range is still tight: it allows
          any patch or minor release that satisfies "at least 1.1.0, but strictly less than 2.0.0." This is
          the recommended pattern from dbt Labs itself, and it is doing real work: it lets you pick up
          bug fixes and small improvements automatically within the 1.x line, while refusing to silently
          jump to 2.x, where a major version bump could change macro behavior or remove something you
          depend on. Part 03 goes deeper into exactly why this range discipline matters.
        </Para>

        <SubTitle>Installing directly from a git repository</SubTitle>

        <Para>
          Not every package worth using is on dbt Hub — a package a coworker wrote and pushed to your
          company's internal GitHub, or a fork of a public package with a small patch applied, is installed
          by pointing directly at the git URL instead.
        </Para>

        <CodeBox label="packages.yml — installing from a git URL">
{`packages:
  - git: "https://github.com/dbt-labs/dbt-audit-helper.git"
    revision: "0.12.0"

  - git: "https://github.com/your-company/internal-dbt-macros.git"
    revision: "main"
    warn-unpinned: false`}
        </CodeBox>

        <Para>
          The revision field for a git install is doing the same conceptual job as version does for a Hub
          install — it pins exactly which commit, tag, or branch gets downloaded. Pinning revision to a tag
          like "0.12.0" behaves like a versioned release. Pinning it to a branch name like "main" means every
          dbt deps run downloads whatever the latest commit on that branch happens to be at that moment —
          which is exactly the loosely-pinned pattern Part 03 explains is a real production risk.
        </Para>

        <Table
          headers={['Field', 'Used with', 'What it does']}
          rows={[
            ['package', 'Hub installs', 'The package\'s namespace/name on dbt Hub, e.g. dbt-labs/dbt_utils.'],
            ['version', 'Hub installs', 'A version string or range constraining which published release gets installed.'],
            ['git', 'Git installs', 'The full clone URL of the repository hosting the package.'],
            ['revision', 'Git installs', 'A tag, commit SHA, or branch name specifying exactly what to check out.'],
            ['warn-unpinned', 'Git installs', 'Suppresses the CLI warning dbt prints when a git install has no pinned revision at all.'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — dbt deps and Why Pinning Matters" />
        <SectionTitle>dbt deps and the Real Risk of Loose Version Pins</SectionTitle>

        <Para>
          Declaring a package in packages.yml does not install anything by itself — it is only a manifest of
          intent. The command that actually does the work is dbt deps. Running it reads packages.yml,
          resolves each declared package against the version constraints given, downloads the matching
          release (or git revision), and writes the result into a folder named dbt_packages/ at the root of
          your project.
        </Para>

        <CodeBox label="dbt deps — downloading declared packages">
{`$ dbt deps

Installing dbt-labs/dbt_utils
Installed from version 1.1.1
  Updated version available: 1.3.0
Installing dbt-labs/codegen
Installed from version 0.12.1
  Up to date!

Installed 2 packages in 3.41s`}
        </CodeBox>

        <Para>
          After this runs, your project has a new top-level directory: dbt_packages/dbt_utils/ and
          dbt_packages/codegen/, each containing that package's full source — its macros/, models/, and any
          other files it ships. dbt treats these as part of the project's compiled context. A macro defined
          inside dbt_packages/dbt_utils/macros/ becomes callable from your own model files as
          dbt_utils.some_macro(...), and it is worth noting explicitly: dbt_packages/ is a generated
          directory, not something you hand-edit or commit meaningful custom logic into — most teams add it
          to .gitignore, exactly like node_modules in a JavaScript project, and rely on packages.yml plus a
          lockfile to reproduce it.
        </Para>

        <SubTitle>The real risk: an unpinned or loosely-pinned package changing under you</SubTitle>

        <Para>
          This is the single most important operational fact in this module. dbt deps is not a one-time
          action — it is re-run constantly: on every developer's laptop when they clone the project fresh,
          in CI on every pull request, and in the production job that runs your scheduled dbt build. If a
          package's version constraint is loose — a floating range with no upper bound, or a git revision
          pinned to a branch name instead of a tag or commit SHA — then two different runs of dbt deps,
          days or weeks apart, can silently pull down two different versions of that package's code, with
          no change to your own project's files at all.
        </Para>

        <CodeBox label="the loose-pin failure mode, concretely">
{`# packages.yml with a genuinely dangerous, unbounded pin:
packages:
  - package: dbt-labs/dbt_utils
    version: [">=1.0.0"]      # no upper bound at all

# Monday: dbt deps resolves this to dbt_utils 1.1.1 — everything works.
# A production model calls dbt_utils.surrogate_key(['customer_id', 'order_id']).

# Three weeks later, dbt_utils releases 2.0.0 with a breaking change:
# surrogate_key's underlying hashing macro is renamed and restructured
# as part of the 2.x major-version cleanup.

# Thursday: a completely unrelated PR touches a different model.
# CI runs "dbt deps" as part of its normal setup step.
# dbt deps silently resolves dbt_utils to the new 2.0.0 release,
# because ">=1.0.0" is satisfied by 2.0.0 too.

# The unrelated PR's CI run now fails on a macro compilation error
# in a model nobody touched — because the dependency moved underneath it.
# This is exactly the kind of failure that looks like "CI is flaky"
# until someone actually reads the compile error and finds the real cause.`}
        </CodeBox>

        <Para>
          Notice that nothing in the team's own codebase changed between the two dbt deps runs. The break
          was entirely caused by the dependency itself moving, on a routine, automatic dbt deps invocation
          that nobody thought of as a risky operation. This is why dbt Labs' own documentation, and every
          production dbt project worth trusting, pins package versions to a bounded range — typically
          allowing patch and minor upgrades within a major version, but never crossing a major version
          boundary automatically.
        </Para>

        <Table
          headers={['Pinning style', 'Example', 'Risk level']}
          rows={[
            ['Unbounded range', 'version: [">=1.0.0"]', 'High — any future major release, including breaking ones, is silently installed on the next dbt deps.'],
            ['Bounded range within a major version', 'version: [">=1.1.0", "<2.0.0"]', 'Low — picks up bug fixes and safe improvements, refuses to cross a breaking major version boundary.'],
            ['Exact pin', 'version: "1.1.1"', 'Lowest — fully deterministic, but requires a manual bump to ever receive fixes.'],
            ['Git revision pinned to a branch name', 'revision: "main"', 'High — equivalent to an unbounded range; every dbt deps can pull a different, unreviewed commit.'],
            ['Git revision pinned to a tag or commit SHA', 'revision: "v0.12.0"', 'Low — deterministic, same guarantee as an exact version pin on a Hub package.'],
          ]}
        />

        <Callout title="package-lock.yml gives you a reproducibility net" color={K}>
          dbt also generates a package-lock.yml file the first time dbt deps resolves your packages.yml,
          recording the exact resolved version of every package. Committing this lockfile alongside
          packages.yml means every clone of the project resolves to the identical set of package versions
          until someone deliberately re-runs dbt deps with an updated packages.yml — closing the gap even
          further between "what I intended to pin" and "what actually got installed."
        </Callout>

        <Para>
          The practical rule that follows from all of this: every package declaration in a production
          packages.yml should have an upper bound, and every git-based package declaration should point at
          an immutable reference — a tag or a commit SHA, never a branch name. Upgrading a package's version
          should always be a deliberate, reviewed change to packages.yml, committed and tested like any other
          code change — never something that happens as an unnoticed side effect of a routine dbt deps.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — dbt_utils, the Flagship Package" />
        <SectionTitle>dbt_utils — the Package Nearly Every dbt Project Installs</SectionTitle>

        <Para>
          dbt-labs/dbt_utils is maintained by dbt Labs itself and is, by a wide margin, the most widely
          installed community package in the entire dbt ecosystem. It is a grab-bag of genuinely useful,
          battle-tested macros covering SQL generation problems that come up across nearly every warehouse
          and nearly every project: generating surrogate keys, building date spines, pivoting data, testing
          composite-key uniqueness, and dozens of smaller cross-database compatibility helpers. The next four
          Parts walk through the specific macros worth knowing cold.
        </Para>

        <Para>
          Part of why dbt_utils earns the "install it in nearly every project" recommendation, where most
          other packages do not, is cross-warehouse portability. Several of its macros exist specifically to
          paper over syntax differences between Snowflake, BigQuery, Redshift, Postgres, and Databricks —
          writing a date-manipulation expression or a hashing function that behaves identically no matter
          which warehouse compiles it. Writing that portability layer yourself, correctly, across every
          warehouse dialect you might ever run on, is a much bigger undertaking than it looks from the
          outside.
        </Para>

        <BulletList
          items={[
            'dbt_utils.surrogate_key() — hashes multiple columns into one deterministic composite key.',
            'dbt_utils.date_spine() — generates a complete, gapless calendar/date dimension between two dates.',
            'dbt_utils.pivot() — turns long, narrow data into a wide table, generating the CASE WHEN logic for you.',
            'dbt_utils.unique_combination_of_columns — a generic test asserting a set of columns together forms a unique key.',
            'Dozens of smaller helpers — date_trunc-style cross-warehouse date functions, star() for selecting columns dynamically, and type-casting helpers.',
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — surrogate_key" />
        <SectionTitle>dbt_utils.surrogate_key() — Hashing a Composite Key</SectionTitle>

        <Para>
          A surrogate key is a synthetic, warehouse-generated identifier for a row, as opposed to a natural
          key made of business columns that already exist in the source data. Many source systems don't
          provide a single clean primary key column for every table you need one for — an events table might
          only be uniquely identified by the combination of user_id, event_type, and event_timestamp
          together, with no single column serving as a key on its own. dbt_utils.surrogate_key() solves this
          by hashing a list of columns together into one deterministic string value.
        </Para>

        <CodeBox label="dbt_utils.surrogate_key() — basic usage in a model">
{`-- models/staging/stg_events.sql

select
    {{ dbt_utils.generate_surrogate_key(['user_id', 'event_type', 'event_timestamp']) }}
        as event_pk,
    user_id,
    event_type,
    event_timestamp,
    event_payload
from {{ source('app', 'raw_events') }}`}
        </CodeBox>

        <Para>
          Note the macro name is generate_surrogate_key in current dbt_utils versions (surrogate_key was the
          name in older, now-deprecated releases — another concrete reason the version-pinning discipline
          from Part 03 matters, since a major-version bump can rename the exact macro your models depend
          on). What it compiles to, conceptually, is a hash function applied to the concatenation of the
          given columns, with each column first cast to a string and null-coalesced to a consistent
          placeholder so that a null column doesn't silently break the hash or make two genuinely different
          rows hash identically.
        </Para>

        <CodeBox label="what generate_surrogate_key compiles to, conceptually">
{`-- Simplified compiled SQL (actual output uses a warehouse-specific hash function,
-- e.g. MD5 on most warehouses):

md5(
    coalesce(cast(user_id as varchar), '_dbt_utils_surrogate_key_null_') || '-' ||
    coalesce(cast(event_type as varchar), '_dbt_utils_surrogate_key_null_') || '-' ||
    coalesce(cast(event_timestamp as varchar), '_dbt_utils_surrogate_key_null_')
) as event_pk`}
        </CodeBox>

        <Para>
          The resulting hash is deterministic — the same three input values always produce the same
          event_pk, on every run, on every warehouse. This determinism is exactly what makes it usable as a
          real primary key: it can be tested with a unique generic test, joined on, and referenced from
          downstream models, all without ever storing the three source columns' combined value as anything
          other than this one hashed column.
        </Para>

        <Callout title="Order and column list matter — treat them as part of the contract" color={K}>
          generate_surrogate_key(['user_id', 'event_type', 'event_timestamp']) and
          generate_surrogate_key(['event_type', 'user_id', 'event_timestamp']) produce different hashes for
          the same row, because the column order changes the concatenated string being hashed. Changing
          either the column list or its order in an existing model is a breaking change for anything
          downstream that has already stored or joined on the old key values — treat the argument list to
          generate_surrogate_key on an established model the same way you would treat a primary key
          migration, not a casual refactor.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — date_spine" />
        <SectionTitle>dbt_utils.date_spine() — Generating a Complete Calendar Dimension</SectionTitle>

        <Para>
          A date spine is a table with exactly one row per calendar day (or week, or month) across some
          range, with no gaps — even for days that have zero activity in your actual source data. This is
          foundational for a huge class of reporting problems: "orders per day, including days with zero
          orders," "active users per day," or any chart where a missing day should show up as a visible zero
          rather than simply not appearing on the x-axis at all. Building this by hand means writing a
          recursive CTE or a numbers-table cross join — dbt_utils.date_spine() generates that for you.
        </Para>

        <CodeBox label="dbt_utils.date_spine() — building a full daily calendar">
{`-- models/marts/dim_date_spine.sql

with spine as (

    {{ dbt_utils.date_spine(
        datepart="day",
        start_date="cast('2023-01-01' as date)",
        end_date="cast(current_date() as date)"
    ) }}

)

select
    date_day,
    extract(year from date_day)   as year,
    extract(month from date_day)  as month,
    extract(dow from date_day)    as day_of_week
from spine`}
        </CodeBox>

        <Para>
          The generated spine gives you exactly one row per day from 2023-01-01 through today, with a column
          named date_day, and nothing else — you then join your actual fact data onto this spine using a
          left join from the spine, which is what guarantees every date appears in the output regardless of
          whether any real activity happened on it.
        </Para>

        <CodeBox label="using a date spine to fill gaps in a daily orders report">
{`-- models/marts/fct_daily_orders.sql

with spine as (
    select date_day from {{ ref('dim_date_spine') }}
),

orders as (
    select
        cast(order_placed_at as date) as order_date,
        count(*) as order_count
    from {{ ref('fct_orders') }}
    group by 1
)

select
    spine.date_day,
    coalesce(orders.order_count, 0) as order_count
from spine
left join orders
    on spine.date_day = orders.order_date
order by spine.date_day`}
        </CodeBox>

        <Output>{`date_day    | order_count
2026-03-01  | 412
2026-03-02  | 389
2026-03-03  | 0      <- a real zero-order day, visible instead of missing entirely
2026-03-04  | 501`}</Output>

        <Para>
          Without the spine, 2026-03-03 would simply not appear in the query result at all — a group by on
          the orders table alone only produces rows for dates that actually had orders. Whether that missing
          row reads as "zero orders" or "a bug in the dashboard" to whoever is looking at the chart is
          exactly the difference date_spine is built to eliminate.
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — pivot and unique_combination_of_columns" />
        <SectionTitle>pivot() for Wide Data, and a Composite-Key Uniqueness Test</SectionTitle>

        <SubTitle>dbt_utils.pivot() — turning long data wide</SubTitle>

        <Para>
          Long, narrow data — one row per entity per attribute — is usually the right shape for storage and
          transformation, but reporting tools and stakeholders frequently want the opposite shape: one row
          per entity, with each distinct attribute value as its own column. Writing that transformation by
          hand means a CASE WHEN expression per distinct value, which gets tedious and error-prone once there
          are more than a handful of values. dbt_utils.pivot() generates that CASE WHEN block for you from a
          list of values.
        </Para>

        <CodeBox label="dbt_utils.pivot() — long order-status counts to one wide row per day">
{`-- Input shape (long): one row per order_date per status
-- order_date  | status      | order_count
-- 2026-03-01  | placed      | 320
-- 2026-03-01  | cancelled   | 18
-- 2026-03-01  | refunded    | 6

select
    order_date,
    {{ dbt_utils.pivot(
        column='status',
        values=['placed', 'cancelled', 'refunded'],
        agg='sum',
        then_value='order_count',
        else_value='0'
    ) }}
from {{ ref('stg_daily_order_status_counts') }}
group by order_date`}
        </CodeBox>

        <CodeBox label="what pivot() compiles to, and the resulting wide shape">
{`-- Compiled SQL (simplified):
select
    order_date,
    sum(case when status = 'placed'    then order_count else 0 end) as placed,
    sum(case when status = 'cancelled' then order_count else 0 end) as cancelled,
    sum(case when status = 'refunded'  then order_count else 0 end) as refunded
from stg_daily_order_status_counts
group by order_date

-- Output shape (wide): one row per order_date
-- order_date  | placed | cancelled | refunded
-- 2026-03-01  | 320    | 18        | 6`}
        </CodeBox>

        <SubTitle>dbt_utils.unique_combination_of_columns — testing a composite key</SubTitle>

        <Para>
          Module 09's testing content covered the built-in unique test, which only checks a single column.
          A great many real primary keys are composite — no single column is unique on its own, but the
          combination of several columns together is. dbt_utils ships a generic test,
          unique_combination_of_columns, specifically for this case, applied through the same YAML tests:
          block used for every other generic test in this track.
        </Para>

        <CodeBox label="unique_combination_of_columns — schema.yml">
{`# models/staging/_staging.yml

models:
  - name: stg_order_line_items
    tests:
      - dbt_utils.unique_combination_of_columns:
          combination_of_columns:
            - order_id
            - line_item_number`}
        </CodeBox>

        <Para>
          This test compiles to a SQL query that groups by both columns together and asserts the count of
          rows per (order_id, line_item_number) pair never exceeds one — the composite-key equivalent of the
          plain unique test's single-column GROUP BY ... HAVING COUNT(*) &gt; 1 pattern. Reaching for this
          generic test from dbt_utils is a much better default than writing an equivalent singular test by
          hand every time a new model needs a composite-key check, precisely because it is exactly the kind
          of small, genuinely reusable logic Part 08 argues is worth pulling in as a dependency rather than
          reimplementing.
        </Para>
      </section>

      <Divider />

      {/* ── Part 08 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Other Well-Known Packages" />
        <SectionTitle>codegen and audit_helper — Two More Packages Worth Knowing Exist</SectionTitle>

        <SubTitle>dbt-labs/codegen — generating source YAML boilerplate</SubTitle>

        <Para>
          Writing the sources: block in a schema.yml file by hand — listing every table in a source system
          and every column in each table — is exactly the kind of repetitive, mechanical task a macro
          should do for you instead. codegen provides operations you run from the command line
          (via dbt run-operation) that introspect an actual database schema and print out ready-to-paste YAML
          for you, rather than a macro you call inside a model.
        </Para>

        <CodeBox label="codegen — generating a sources YAML block from an existing schema">
{`$ dbt run-operation generate_source \\
    --args '{"schema_name": "raw_freshcart", "database_name": "analytics"}'

# Prints a complete, ready-to-paste sources: YAML block to the console,
# with every table and column codegen found in raw_freshcart already listed —
# turning what would be an hour of manual typing into a copy-paste-and-review step.`}
        </CodeBox>

        <SubTitle>dbt-labs/audit_helper — comparing two tables row by row</SubTitle>

        <Para>
          audit_helper solves a specific, high-value problem: you are refactoring an existing model — maybe
          rewriting a gnarly legacy SQL query into cleaner incremental logic — and you need to prove the new
          version produces identical output to the old one before you cut over. Manually eyeballing two large
          tables for differences does not scale. audit_helper's compare_relations macro generates a query
          that reports exactly which rows and columns differ between two relations.
        </Para>

        <CodeBox label="audit_helper — comparing an old model to its rewritten replacement">
{`-- analysis/compare_fct_orders_rewrite.sql

{% set old_etl_relation = source('legacy', 'fct_orders_old') %}
{% set new_dbt_relation = ref('fct_orders') %}

{{ audit_helper.compare_relations(
    a_relation=old_etl_relation,
    b_relation=new_dbt_relation,
    primary_key="order_id"
) }}`}
        </CodeBox>

        <Output>{`column_name    | perc_matching  | perc_diff
order_id       | 100.0%         | 0.0%
customer_id    | 100.0%         | 0.0%
order_total    | 99.94%         | 0.06%    <- rounding difference to investigate
order_status   | 100.0%         | 0.0%`}</Output>

        <Para>
          A 99.94% match on order_total, rather than a flat 100%, is exactly the kind of signal that would
          be nearly impossible to catch by spot-checking a handful of rows manually, but that audit_helper
          surfaces automatically across the entire table — telling you precisely which column, and roughly
          how much of it, still needs investigation before the rewritten model can safely replace the old
          one in production.
        </Para>
      </section>

      <Divider />

      {/* ── Part 09 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Package vs Your Own Macro" />
        <SectionTitle>When a Package Is Worth the Dependency, and When It Isn't</SectionTitle>

        <Para>
          Every package you install is a dependency risk, exactly as Part 03 laid out — it is code you did
          not write, maintained on someone else's schedule, that can change underneath your project on a
          routine dbt deps if pinning discipline slips. That risk is not a reason to avoid packages
          altogether; it is a reason to be deliberate about when pulling one in is actually worth it versus
          when writing three lines of your own macro is the better call.
        </Para>

        <Table
          headers={['Signal', 'Favors a package', 'Favors your own macro']}
          rows={[
            ['How general is the logic?', 'Genuinely generic — hashing columns, date spines, pivoting — the same problem every dbt team has.', 'Specific to your business — a FreshCart-specific discount calculation nobody else needs.'],
            ['How much testing has it had?', 'A widely-used package like dbt_utils has been exercised across thousands of real projects and warehouses.', 'A one-off macro you write today has been tested by exactly your own test suite, if that.'],
            ['How much code is actually saved?', 'Saves real, nontrivial SQL generation — a pivot macro replaces dozens of hand-written CASE WHEN lines.', 'A three-line macro wrapping one small expression saves almost nothing versus the dependency risk of installing a whole package for it.'],
            ['How often does it change?', 'Stable, mature packages with infrequent, well-communicated major versions.', 'Logic that is still actively evolving alongside your own business rules — better to iterate in your own repo.'],
          ]}
        />

        <Para>
          A useful rule of thumb: reach for dbt_utils, or another well-known package, when the thing you need
          is a solved problem that thousands of other teams have already solved and battle-tested — a hashed
          composite key, a date dimension, a pivot. Write your own macro when the thing you need is small,
          specific to your own project's business logic, and would not meaningfully benefit from someone
          else's testing, because nobody else's project has the same rule to test against in the first place.
        </Para>

        <Callout title="Don't reach for a package before checking if dbt_utils already has it" color={K}>
          A surprising number of "I should write a custom macro for this" moments turn out to already be
          solved inside dbt_utils under a name that doesn't immediately suggest it — surrogate key
          generation, safe division that returns null instead of erroring on a divide-by-zero, cross-database
          date truncation. Skimming the dbt_utils macro list before writing a new macro from scratch is a
          cheap five minutes that regularly saves reinventing something already hardened across thousands of
          production projects.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 10 — Worked Example ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Worked Example" />
        <SectionTitle>Worked Example: Installing dbt_utils and Using surrogate_key in a Staging Model</SectionTitle>

        <Para>
          Putting the whole workflow together end to end: declaring the dependency, installing it, and using
          one of its macros in a real staging model, exactly the sequence you would follow on a real project
          the first time you need a composite key.
        </Para>

        <CodeBox label="step 1 — declare dbt_utils in packages.yml, with a bounded pin">
{`# packages.yml

packages:
  - package: dbt-labs/dbt_utils
    version: [">=1.1.0", "<2.0.0"]`}
        </CodeBox>

        <CodeBox label="step 2 — install it">
{`$ dbt deps

Installing dbt-labs/dbt_utils
Installed from version 1.3.0
  Up to date!

Installed 1 package in 1.87s`}
        </CodeBox>

        <Para>
          At this point, dbt_packages/dbt_utils/ exists locally with the package's full source, and every
          macro it defines — including generate_surrogate_key — is now callable from any model in the
          project, namespaced as dbt_utils.macro_name(...).
        </Para>

        <CodeBox label="step 3 — use generate_surrogate_key in a staging model">
{`-- models/staging/stg_thumbtack_reviews.sql

with source as (
    select * from {{ source('thumbtack', 'raw_reviews') }}
),

renamed as (
    select
        {{ dbt_utils.generate_surrogate_key(['pro_id', 'customer_id', 'review_submitted_at']) }}
            as review_pk,
        pro_id,
        customer_id,
        review_submitted_at,
        star_rating,
        review_text
    from source
)

select * from renamed`}
        </CodeBox>

        <Para>
          Thumbtack's raw review events have no single natural primary key — the same pro_id and customer_id
          pair could legitimately submit more than one review over time, so review_submitted_at has to join
          the key to disambiguate them. Rather than concatenating and hashing those three columns by hand
          with a warehouse-specific MD5 expression, generate_surrogate_key handles the null-coalescing,
          casting, and hashing consistently, and the result — review_pk — can now be tested with a plain
          unique generic test in schema.yml, joined on safely from downstream models, and trusted as a real
          primary key.
        </Para>

        <CodeBox label="step 4 — test the generated key like any other primary key">
{`# models/staging/_staging.yml

models:
  - name: stg_thumbtack_reviews
    columns:
      - name: review_pk
        tests:
          - unique
          - not_null`}
        </CodeBox>

        <Para>
          This is the complete loop: a dependency declared with a safe version range, installed with dbt
          deps, used inside a model through its namespaced macro call, and validated with the same testing
          patterns covered in Module 09 — no different, from the model author's point of view, than if the
          hashing logic had been written by hand inside the project's own macros/ directory.
        </Para>
      </section>

      <Divider />

      {/* ── Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About dbt Packages</SectionTitle>

        {[
          {
            wrong: '"Installing a package connects my project to some external service"',
            right: 'Installing a package (dbt deps) only downloads files — macros and models — onto disk, into dbt_packages/. Nothing runs, nothing connects to anything, until you actually reference something the package defines from your own project files (Part 01).',
          },
          {
            wrong: '"A loose version range like >=1.0.0 with no upper bound is basically the same as pinning to a range"',
            right: 'An unbounded range is exactly as risky as no pin at all — the next dbt deps, run for a completely unrelated reason, can silently install a major version with breaking changes. A safe pin always has an upper bound stopping it at the current major version (Part 03).',
          },
          {
            wrong: '"dbt_utils macros are dbt built-ins, part of dbt core itself"',
            right: 'dbt_utils is a community package maintained by dbt Labs, installed the same way any other package is installed via packages.yml and dbt deps. It ships alongside dbt core in popularity, not inside it — a fresh dbt project has zero dbt_utils macros available until it is explicitly declared and installed (Part 04).',
          },
          {
            wrong: '"You should always reach for a package instead of writing your own macro, since someone else already solved it"',
            right: 'A package is worth its dependency risk for genuinely reusable, well-tested, general-purpose logic. A three-line macro wrapping one small, project-specific expression does not need a whole package dependency pulled in for it (Part 09).',
          },
          {
            wrong: '"dbt_packages/ should be committed to version control like the rest of the project"',
            right: 'dbt_packages/ is a generated, reproducible artifact of running dbt deps against packages.yml (and its lockfile) — most teams .gitignore it entirely, the same way node_modules is gitignored in a JavaScript project, and rely on packages.yml plus package-lock.yml to regenerate it identically anywhere (Part 03).',
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
        <SectionTitle>Three Ways Real Teams Actually Use dbt Packages</SectionTitle>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Compass — real estate, agent-listing composite keys
          </div>
          <Para>
            Compass ingests property listing data from dozens of regional MLS (Multiple Listing Service)
            feeds, each with its own schema quirks. No single column across these feeds reliably identifies a
            unique listing — the combination of mls_id, listing_source, and listed_at is what actually makes
            a row unique, and that combination differs feed to feed.
          </Para>
          <Para>
            Rather than hand-writing a hashing expression per feed's staging model, the analytics engineering
            team standardizes on dbt_utils.generate_surrogate_key(['mls_id', 'listing_source', 'listed_at'])
            across every staging model that ingests a new feed. Because it is the same macro call every
            time, onboarding a new MLS feed's staging model becomes a copy-paste-and-adjust-column-names task
            rather than a from-scratch SQL problem each time.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Zillow — real estate, filling gaps in a daily pricing history
          </div>
          <Para>
            Zillow's Zestimate pricing history table only contains a row for a given property on days the
            estimate actually changed — most days, most properties have no row at all. A dashboard tracking
            "average estimate by day across a metro area" needs a value for every single day, not just the
            days a change happened to occur.
          </Para>
          <Para>
            The team builds a dim_date_spine model using dbt_utils.date_spine() covering several years back
            from the current date, then left-joins the pricing history onto that spine and forward-fills the
            last known estimate for days with no explicit change row — turning a sparse changelog into a
            genuinely gapless daily series, exactly the join pattern shown in Part 06.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Thumbtack — marketplace, auditing a warehouse migration rewrite
          </div>
          <Para>
            Thumbtack migrates a legacy Redshift-based ETL job for pro-review aggregates into dbt, rewriting
            years-old, hand-tuned SQL as a clean incremental dbt model. Before cutting dashboards over to the
            new model, the team needs confidence the rewrite produces identical numbers to the legacy job
            it is replacing.
          </Para>
          <Para>
            They install dbt-labs/audit_helper and run compare_relations between the legacy Redshift table
            and the new dbt model, keyed on pro_id, exactly as shown in Part 08 — surfacing a small
            percentage mismatch in average_rating traced back to the legacy job silently excluding
            zero-star reviews, a bug the rewrite had actually fixed rather than introduced, which the audit
            made visible before launch rather than after an executive dashboard changed unexpectedly.
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
            q: 'What is a dbt package, and how is it different from a macro you write inside your own project?',
            a: 'A dbt package is itself a complete dbt project — macros, models, tests — packaged so it can be installed as a dependency of a different project, analogous to an npm or pip package (Part 01). A macro you write in your own project\'s macros/ directory is authored and maintained by your own team, inside your own repository, and called only within that project. A package\'s macros are authored elsewhere, downloaded into dbt_packages/ via dbt deps, and become callable from your project exactly like your own macros once installed — the distinction is entirely about who owns and maintains the code, not about how it behaves once compiled.',
          },
          {
            q: 'Walk through exactly what happens when you run dbt deps, and why dbt_packages/ is usually gitignored.',
            a: 'dbt deps reads packages.yml, resolves each declared package against its version or revision constraint, downloads the matching release or git commit, and writes the result into dbt_packages/ (Part 03). Because this is fully reproducible from packages.yml (and its accompanying package-lock.yml, which records the exact resolved versions), most teams treat dbt_packages/ the same way a JavaScript project treats node_modules: a generated build artifact, not source code, excluded from version control and regenerated identically by dbt deps wherever the project is cloned.',
          },
          {
            q: 'Why is an unpinned or loosely-pinned package version a real production risk, and how do you fix it?',
            a: 'dbt deps is re-run constantly — on every fresh clone, in every CI run, in every scheduled production job — not just once at project setup. If a package\'s version constraint has no upper bound, or a git-based package is pinned to a branch name rather than a tag or commit SHA, two dbt deps runs days apart can resolve to genuinely different package code with zero change to your own project\'s files (Part 03). This has caused real production breaks where an unrelated PR\'s CI run fails because a dependency silently moved underneath it. The fix is a version range with an explicit upper bound that never crosses a major version boundary, and git revisions pinned to immutable references, with any deliberate package upgrade treated as its own reviewed change to packages.yml.',
          },
          {
            q: 'Explain what dbt_utils.generate_surrogate_key() actually does under the hood, and why column order matters.',
            a: 'It casts each given column to a string, coalesces nulls to a consistent placeholder so a null value doesn\'t break or collide the hash, concatenates the results with a delimiter, and hashes the concatenation — typically with MD5 — into one deterministic value (Part 05). Because the macro concatenates columns in the exact order given in its argument list, generate_surrogate_key([\'a\', \'b\']) and generate_surrogate_key([\'b\', \'a\']) produce different hashes for the same row. Changing the column list or its order on an established model changes every already-stored key value, which is why that argument list should be treated as part of a primary key\'s contract, not a casual refactor.',
          },
          {
            q: 'When would you install a package like dbt_utils rather than writing your own three-line macro, and vice versa?',
            a: 'The deciding factors are how generic the logic is, how much real testing it has already had across other projects and warehouses, and how much code is actually saved (Part 09). Genuinely generic, well-tested, nontrivial logic — hashing composite keys, generating a full calendar dimension, pivoting long data wide — is worth the dependency risk of a package, because thousands of other teams have already exercised the same code against the same class of problem. A small, project-specific expression that would take three lines to write yourself gains almost nothing from being pulled in as a whole external dependency, while still carrying the same version-pinning discipline burden from Part 03 — not a good trade for something that small.',
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
        <SectionTitle>Five Mistakes Engineers Make Working With Packages</SectionTitle>

        {[
          {
            title: 'Leaving a package\'s version constraint unbounded',
            detail: 'version: [">=1.0.0"] with no upper bound is exactly as risky as pinning nothing at all — the next dbt deps, run for an unrelated reason, can install a breaking major release with no warning.',
          },
          {
            title: 'Pinning a git-based package to a branch name instead of a tag or commit SHA',
            detail: 'revision: "main" means every dbt deps can pull down a different, unreviewed commit than the last run — the git equivalent of an unbounded version range, and just as capable of breaking CI without any change to your own project files.',
          },
          {
            title: 'Writing a custom hashing or date-spine macro from scratch before checking if dbt_utils already has it',
            detail: 'A meaningful share of "I need a custom macro for this" problems are already solved, tested across thousands of projects, and shipped inside dbt_utils under generate_surrogate_key, date_spine, pivot, and similar names — worth a five-minute check before reinventing them.',
          },
          {
            title: 'Committing dbt_packages/ to version control',
            detail: 'It is a generated, reproducible artifact of packages.yml plus package-lock.yml, not source code — committing it bloats the repository and invites drift between what packages.yml declares and what got committed at some earlier point in time.',
          },
          {
            title: 'Changing the column list or order passed to generate_surrogate_key on an established model without realizing it changes every existing key value',
            detail: 'The macro concatenates columns in the exact order given — reordering or adding a column changes the hash for every row, silently breaking anything downstream that joined on or stored the old key values.',
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
        <SectionTitle>Package Errors — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: 'Compilation Error: \'dbt_utils.generate_surrogate_key\' is undefined',
            cause: 'dbt_utils was referenced in a model before dbt deps was ever run — dbt_packages/ does not exist yet, or was deleted (e.g. by a clean operation) without a follow-up dbt deps to regenerate it.',
            fix: 'Run dbt deps before dbt run or dbt build whenever dbt_packages/ might be missing — most CI pipelines and onboarding docs should have dbt deps as an explicit, unconditional first step, not something assumed to already exist.',
          },
          {
            error: 'Could not find a version matching \'>=1.1.0, <2.0.0\' for package dbt-labs/dbt_utils',
            cause: 'The declared version range in packages.yml genuinely has no published release that satisfies it — often a typo in the range, or a range written before the first qualifying version was actually published to dbt Hub.',
            fix: 'Check the package\'s actual release history on dbt Hub or its GitHub releases page, and adjust the range to genuinely bracket an existing published version.',
          },
          {
            error: 'Dependency conflict for package dbt-labs/dbt_utils: package-a requires >=1.0.0,<1.2.0, package-b requires >=1.2.0,<2.0.0',
            cause: 'Two different installed packages each declare their own dbt_utils version requirement as a sub-dependency, and those two ranges do not overlap at all — dbt cannot resolve a single version satisfying both.',
            fix: 'Check each conflicting package\'s own required dbt_utils range (visible in its packages.yml on GitHub) and either upgrade the older package to a release compatible with the newer range, or pin your own project\'s dbt_utils version explicitly to a value both can accept if one exists.',
          },
          {
            error: 'Runtime Error: Encountered an error while running operation: cannot pivot on more than 100 distinct values',
            cause: 'dbt_utils.pivot() was called with a values list (or dynamically fetched distinct values) far larger than realistically makes sense for a wide table — a config safeguard against accidentally generating a query with hundreds of CASE WHEN columns.',
            fix: 'Confirm the column actually needs every one of those distinct values as its own output column — often this signals the column chosen for pivoting has much higher cardinality than the reporting need actually requires, and a smaller, curated values list is the right fix rather than raising the limit.',
          },
          {
            error: 'dbt_utils.unique_combination_of_columns test fails and lists rows that look identical across every listed column',
            cause: 'The combination_of_columns list is missing a column that actually varies between the "duplicate" rows — the columns being checked genuinely repeat, but some other column not included in the test (like a timestamp or a surrogate line-item number) is what actually makes each row distinct.',
            fix: 'Add the missing disambiguating column to combination_of_columns, or reconsider whether the model itself has an unexpected fan-out introducing genuine duplicates that the test correctly caught.',
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
        'A dbt package is itself a full dbt project — macros, models, tests — installed as a dependency of your own project via packages.yml and dbt deps, analogous to an npm or pip package.',
        'dbt deps downloads declared packages into dbt_packages/, a generated directory that is regenerated from packages.yml (plus package-lock.yml) and typically gitignored, never hand-edited.',
        'An unbounded or loosely-pinned package version (or a git revision pinned to a branch instead of a tag/SHA) is a real production risk — a routine dbt deps can silently install a breaking change with no edit to your own project files.',
        'dbt_utils is the flagship community package: generate_surrogate_key() hashes composite keys, date_spine() builds gapless calendar dimensions, pivot() turns long data wide, and unique_combination_of_columns tests composite-key uniqueness.',
        'codegen auto-generates source YAML boilerplate from an existing schema; audit_helper compares two relations row-by-row and column-by-column — invaluable when verifying a model refactor produces identical output.',
        'Pull in a package for genuinely reusable, well-tested, nontrivial logic; write your own small macro for a one-off, project-specific expression that would gain little from someone else\'s testing and only add dependency risk.',
      ]} />
    </LearnLayout>
  )
}
