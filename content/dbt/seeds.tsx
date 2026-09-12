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

export default function Seeds() {
  return (
    <LearnLayout
      title="Seeds: Loading Static Reference Data"
      description="What a dbt seed actually is, the CSV-in-warehouse-out model, what seeds are genuinely good for versus what they are not, column type overrides with seed-column-types, dbt seed versus dbt seed --full-refresh, and a full worked country-region lookup example."
      section="dbt — Module 12"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'Seeds: Loading Static Reference Data', href: '/learn/dbt/seeds' },
      ]}
      prev={{ title: 'Packages and dbt_utils', href: '/learn/dbt/packages' }}
      next={{ title: 'Snapshots: Type 2 Slowly Changing Dimensions', href: '/learn/dbt/snapshots' }}
    >
      {/* ── Part 01 — What a seed is ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What a Seed Actually Is" />
        <SectionTitle>The One dbt Object That Starts as a File, Not a SELECT</SectionTitle>

        <Para>
          Every other object in a dbt project — a model, a snapshot, an ephemeral CTE — starts life as a
          <code>SELECT</code> statement over data that already exists somewhere in the warehouse. A
          <strong> seed</strong> breaks that pattern entirely: it is a plain <code>.csv</code> file, living in
          the <code>seeds/</code> directory of your project, checked into version control right alongside
          your models, that dbt loads directly into the warehouse as a real table via the
          <code>dbt seed</code> command. There is no upstream source table for a seed to <code>SELECT</code>
          from — the CSV file itself <em>is</em> the source of truth.
        </Para>

        <CodeBox label="seeds/country_region_mapping.csv — a seed file, exactly as it lives in the repo">
{`country_code,country_name,region
US,United States,north_america
CA,Canada,north_america
MX,Mexico,north_america
GB,United Kingdom,europe
DE,Germany,europe
FR,France,europe
JP,Japan,asia_pacific
AU,Australia,asia_pacific
BR,Brazil,south_america`}
        </CodeBox>

        <Para>
          Running <code>dbt seed</code> reads every <code>.csv</code> file in <code>seeds/</code>, infers a
          schema from the file's contents, and creates (or replaces) one table per file in the warehouse —
          the table name matches the file name by default, so
          <code>seeds/country_region_mapping.csv</code> becomes a table literally called
          <code>country_region_mapping</code>. Once that table exists, it can be referenced from any model
          using <code>{'{{ ref(\'country_region_mapping\') }}'}</code>, exactly the same <code>ref()</code>
          call used for any other model — a seed participates in the DAG, gets picked up by
          <code>dbt docs generate</code>, and can even carry its own <code>schema.yml</code> tests, all
          identically to a model.
        </Para>

        <CodeBox label="Loading and then referencing a seed">
{`$ dbt seed
Running with dbt=1.8.0
Found 1 seed file
1 of 1 START seed file analytics.country_region_mapping ... [RUN]
1 of 1 OK loaded seed file analytics.country_region_mapping ... [INSERT 9 in 0.41s]
Done. PASS=1 WARN=0 ERROR=0 TOTAL=1`}
        </CodeBox>

        <CodeBox label="models/marts/fct_orders.sql — referencing the seed exactly like a model">
{`select
    o.order_id,
    o.customer_id,
    c.country_code,
    r.region
from {{ ref('stg_orders') }} o
join {{ ref('dim_customers') }} c on o.customer_id = c.customer_id
left join {{ ref('country_region_mapping') }} r on c.country_code = r.country_code`}
        </CodeBox>

        <HighlightBox>
          <Para>
            <strong>The mental model to hold onto:</strong> a seed is dbt's answer to "I need a small table
            of values that doesn't come from any operational system, and I want to manage it the same way I
            manage everything else in this project — version controlled, code reviewed, and referenced with
            <code>ref()</code>." It is the one deliberate exception to "every dbt object is a transformation
            over existing data," and that exception exists specifically for data that has no natural upstream
            source to transform in the first place.
          </Para>
        </HighlightBox>

        <SubTitle>The seed table's name comes from the file name, and that name is not trivial to change later</SubTitle>

        <Para>
          Because a seed table's name defaults directly to its CSV file's name, renaming
          <code>country_region_mapping.csv</code> to <code>country_to_region.csv</code> later does not
          rename the existing warehouse table — it creates a brand-new one under the new name on the next
          <code>dbt seed</code>, and leaves the old table sitting in the warehouse until someone manually
          drops it, since dbt has no way to know the new file is meant to replace the old table rather than
          exist alongside it. Every model that referenced the seed by its old name via <code>ref()</code>
          also needs updating in the same change, exactly as it would if a model file were renamed.
        </Para>

        <CodeBox label="A seed rename, done correctly, is a coordinated three-part change">
{`1. rename seeds/country_region_mapping.csv to seeds/country_to_region.csv
2. update every ref('country_region_mapping') call to ref('country_to_region')
3. after the next dbt run/build, manually drop the old, now-orphaned
   country_region_mapping table -- dbt does not do this automatically,
   since it has no way to know the old table is meant to be retired
   rather than a second, unrelated seed`}
        </CodeBox>

        <Para>
          This is worth knowing before it happens by surprise: an orphaned table left behind by a seed
          rename looks, to anyone browsing the warehouse later, like a real table that might still matter,
          and cleaning it up requires someone to notice it is no longer referenced by <code>ref()</code>
          anywhere in the project at all — exactly the kind of quiet warehouse clutter that a habit of
          checking <code>dbt docs generate</code>'s lineage graph (covered in the documentation module) for
          orphaned nodes helps catch.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 — What seeds are good for ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — What Seeds Are Genuinely Good For" />
        <SectionTitle>Small, Mostly-Static, Manually-Curated Reference Data</SectionTitle>

        <Para>
          Seeds earn their place for exactly one category of data: small lookup or reference tables that
          change rarely, aren't produced by any of the company's own operational systems, and are naturally
          maintained by a human editing a spreadsheet or CSV rather than by an application writing rows into
          a database. The country-to-region mapping from Part 01 is the canonical example — nobody's
          production application generates that mapping; a person decided it once, and it changes maybe once
          or twice a year, if that.
        </Para>

        <Table
          headers={['Good seed candidate', 'Why it fits']}
          rows={[
            ['Country code → region mapping', 'A fixed, small, human-curated list — dozens to low hundreds of rows, changes essentially never.'],
            ['A manually curated list of company holiday dates', 'Decided by HR or ops once a year, has no natural source system, and needs to be reviewable in a pull request like any other business logic.'],
            ['A marketing-team-maintained list of UTM campaign categories', 'The marketing team, not an application, decides what counts as "paid_social" versus "affiliate" — a spreadsheet-shaped decision that seeds turn into a queryable table.'],
            ['A small mapping of internal product SKU codes to human-readable names', 'Low cardinality, rarely changes, and having it in version control means a rename is code-reviewed like any other change to reporting logic.'],
          ]}
        />

        <Para>
          The common thread across every good seed candidate: the data's <em>source of truth is a decision a
          person made</em>, not an event a system recorded. A country-to-region mapping isn't measured or
          observed anywhere — someone decided Mexico counts as North America for this company's reporting
          purposes, wrote that decision down, and a seed is exactly the right place for a decision like that
          to live, because it puts the decision in version control, subject to the same pull request review
          as everything else in the project, rather than buried in a spreadsheet nobody remembers exists.
        </Para>

        <Callout title="Seeds and version control are the actual point" color={K}>
          A seed's CSV file lives in the same git repository as your models. A change to the country-region
          mapping — adding a new country, reclassifying one — goes through a pull request, gets reviewed, and
          is visible in the file's git history exactly like a change to a model's SQL. This is the concrete
          advantage a seed has over "just query a spreadsheet somewhere" or a manually maintained table
          nobody remembers how to update: the mapping's entire change history is auditable, and updating it
          is exactly as disciplined a process as changing anything else in the project.
        </Callout>

        <Callout title="A useful gut check: could this list survive being read aloud in a planning meeting?" color="#38bdf8">
          Data genuinely suited to a seed tends to read like a decision a team made together — "we're
          grouping these countries this way," "these are our official holiday dates this year." Data that
          reads more like an operational log — timestamps, per-event records, anything with a row for every
          individual transaction — is a strong signal it belongs behind a real ingestion pipeline instead,
          no matter how small today's export happens to be.
        </Callout>

        <SubTitle>Size and change frequency are the two dials that matter</SubTitle>

        <Para>
          There's no hard row-count limit dbt enforces on a seed, but in practice, seeds are meant for small
          data — typically well under a few thousand rows. This isn't an arbitrary style preference: a seed
          is loaded in full, from a plain text file, on every <code>dbt seed</code> run, and a CSV file large
          enough to strain that process (megabytes of data, tens of thousands of rows) is almost always a
          sign the data actually belongs in a real ingestion pipeline instead, which Part 03 covers directly.
        </Para>
      </section>

      <Divider />

      {/* ── Part 03 — What seeds are NOT for ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — What Seeds Are Not For" />
        <SectionTitle>The Single Most Important Scope Boundary: Large or Frequently-Changing Data</SectionTitle>

        <Para>
          This is the single most important thing to get right about seeds, because getting it wrong doesn't
          fail loudly — it just quietly turns your dbt project into an accidental, poorly-suited data pipeline.
          Seeds are not for large datasets, and they are not for data that changes on any kind of regular
          operational cadence. If data is measured in tens of thousands of rows, or updates daily, hourly, or
          in real time, it does not belong in <code>seeds/</code> — it belongs behind an actual ingestion tool
          (Fivetran, Airbyte, a custom extract-load process, a streaming connector) landing in a raw table
          that dbt then reads via <code>source()</code>, exactly like every other piece of source data in the
          project.
        </Para>

        <Table
          headers={['Bad seed candidate', 'Why it does not fit, and what to use instead']}
          rows={[
            ['A daily export of all customer orders', 'Not static, not small, and it already has a natural source system — the orders database itself. This belongs behind a real ingestion pipeline and a source(), not a seed.'],
            ['A weekly product catalog export with 50,000 SKUs', 'Row count and update frequency both disqualify it — a seed reloaded weekly by hand, at that size, is a manual process standing in for what an actual scheduled ingestion job should be doing.'],
            ['Customer records exported from a CRM', 'Has a real, authoritative source system (the CRM) that should be the thing dbt ingests from directly, not a CSV snapshot someone remembers to re-export.'],
            ['Anything containing PII at meaningful scale', 'A CSV in a git repository has none of the access controls, encryption, or audit logging a real data platform applies to sensitive data at the ingestion layer.'],
          ]}
        />

        <Para>
          The failure mode to watch for is subtle: a seed that starts out genuinely small and static — a
          country list with 50 rows, unlikely to ever change — is the right call. The same seed six months
          later, after someone has been quietly appending new rows to it by hand every week because "it was
          already a seed, so I just added rows," is now standing in for a real ingestion pipeline without
          anyone having made that decision on purpose. The tell is change frequency creeping upward without
          anyone re-evaluating whether a seed is still the right tool — worth actively watching for, not just
          a one-time judgment call made when the seed was first created.
        </Para>

        <Callout title="A seed can always graduate into a real ingestion source later" color="#38bdf8">
          Starting cautiously with a seed and migrating to a real ingestion pipeline once the data outgrows
          it is a perfectly reasonable path, and cheaper than the reverse. Migrating a wrongly-scoped seed
          later mostly means standing up an ingestion connector and swapping every <code>ref()</code> to it
          for a <code>source()</code> — a mechanical, bounded change. The Zillow example later in this
          module walks through exactly this kind of migration once a seed had clearly outgrown its original
          scope.
        </Callout>

        <Callout title="Ask this before adding a new seed" color="#ef4444">
          Two questions settle almost every case: does this data have a real operational source system
          somewhere (a database, an API, a CRM), and will a person need to update this file more than a
          handful of times a year? A yes to the first question means it belongs behind a source() and a real
          ingestion pipeline, not a seed. A yes to the second means even data with no natural source system
          is outgrowing what a manually maintained CSV in a git repo should be responsible for.
        </Callout>

        <SubTitle>Why this boundary matters more than it might seem</SubTitle>

        <Para>
          Getting this scope wrong has a specific, recurring cost: every seed lives in version control and is
          rebuilt from a flat file on every <code>dbt seed</code> run, which means every update to that data
          requires someone to manually edit a CSV, open a pull request, get it reviewed, and merge it — a
          reasonable amount of ceremony for a country list that changes twice a year, and a genuinely painful,
          unscalable process for anything that needs to be updated on any kind of regular schedule. Real
          ingestion tools exist precisely to automate the "get external data into the warehouse reliably and
          on schedule" problem; reaching for a seed instead reintroduces manual toil that ingestion tooling
          was built to eliminate.
        </Para>
      </section>

      <Divider />

      {/* ── Part 04 — Running dbt seed ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Running dbt seed" />
        <SectionTitle>dbt seed vs dbt seed --full-refresh</SectionTitle>

        <Para>
          <code>dbt seed</code>, run with no flags, loads every CSV in <code>seeds/</code> into the warehouse.
          By default, this behaves like a full replace each time — dbt drops (or truncates, depending on the
          adapter) and recreates each seed table from the current contents of its CSV file on every run,
          which means a row you deleted from the CSV since the last run is genuinely gone from the table
          after the next <code>dbt seed</code>, not left behind as a stale row.
        </Para>

        <CodeBox label="Loading all seeds, and scoping to just one">
{`# Load every CSV in seeds/
$ dbt seed

# Load just one seed file, by its resulting table name
$ dbt seed --select country_region_mapping`}
        </CodeBox>

        <Para>
          <code>dbt seed --full-refresh</code> exists for a slightly different, more forceful case: rebuilding
          the seed table completely from scratch, including recreating it if its column types are being
          changed via <code>seed-column-types</code> (Part 05) after the table already exists. On most
          adapters, a plain <code>dbt seed</code> already fully replaces the table's contents, so
          <code>--full-refresh</code> is most useful specifically when a column's configured type has changed
          and the existing table's schema needs to be dropped and recreated to match, not merely have its rows
          replaced.
        </Para>

        <CodeBox label="Forcing a full schema rebuild after changing a seed-column-types config">
{`# After adding or changing a seed-column-types override for a column,
# force dbt to drop and recreate the table with the new column type,
# rather than assuming the existing table's schema is still correct
$ dbt seed --full-refresh --select country_region_mapping`}
        </CodeBox>

        <Table
          headers={['Command', 'What it does', 'When to use it']}
          rows={[
            ['dbt seed', 'Loads every CSV in seeds/, replacing each table\'s contents with the CSV\'s current rows.', 'The routine, default way to load or refresh seed data — covers the large majority of everyday seed updates.'],
            ['dbt seed --select <name>', 'Loads just one specific seed file.', 'Iterating on a single seed without waiting for every other seed in the project to reload.'],
            ['dbt seed --full-refresh', 'Forces a full drop-and-recreate of seed tables, ensuring schema changes (like a new seed-column-types override) actually take effect.', 'After changing a column\'s configured type, or when you suspect a seed table\'s schema has drifted from its current config.'],
          ]}
        />

        <Callout title="Seeds still need to be built before models that reference them" color={K}>
          A model calling <code>{'{{ ref(\'country_region_mapping\') }}'}</code> depends on that seed exactly
          like it would depend on another model — dbt's DAG treats seeds as first-class nodes. Running
          <code>dbt build</code> (rather than <code>dbt run</code> plus a separate <code>dbt seed</code>) picks
          this up automatically, loading seeds in the correct dependency order alongside models, tests, and
          snapshots, the same way <code>dbt build</code> orders everything else in the project.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 — seed-column-types ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Column Type Overrides" />
        <SectionTitle>seed-column-types: When dbt's Automatic Type Inference Gets It Wrong</SectionTitle>

        <Para>
          When dbt loads a CSV, it has to decide a column type for every column, since a flat text file has no
          type information of its own — every value in a CSV is, at the file format level, just text. dbt
          infers types by inspecting the actual values in each column: a column where every value looks like a
          whole number becomes an integer type, a column where every value looks like a decimal becomes a
          float or numeric type, and anything else becomes a string.
        </Para>

        <Para>
          This inference is usually right, and usually invisible — most seed columns are exactly what they
          look like. It goes wrong in one specific, common, and genuinely damaging way: a column of United
          States ZIP codes, where some values have a leading zero (Massachusetts and other New England zip
          codes commonly start with <code>0</code>, like <code>02134</code>), gets inferred as an integer
          column because every value in it does look like a whole number to dbt's type inference — and an
          integer has no concept of a leading zero. The moment that column is loaded as an integer,
          <code>02134</code> silently becomes <code>2134</code>, and the data is now wrong in a way that isn't
          obvious from looking at row counts or a quick sanity check.
        </Para>

        <CodeBox label="seeds/zip_code_reference.csv — the exact case that breaks without an override">
{`zip_code,city,state
02134,Boston,MA
90210,Beverly Hills,CA
00501,Holtsville,NY
73301,Austin,TX`}
        </CodeBox>

        <CodeBox label="What happens with no type override — leading zeros silently vanish">
{`-- dbt infers zip_code as an integer column, since every value
-- looks numeric. The loaded table actually contains:

zip_code | city           | state
---------|----------------|------
2134     | Boston         | MA
90210    | Beverly Hills  | CA
501      | Holtsville     | NY
73301    | Austin         | TX

-- 02134 and 00501 have silently lost their leading zeros --
-- a join against this column using a properly formatted 5-digit
-- zip code string will now simply fail to match those rows`}
        </CodeBox>

        <Para>
          <code>seed-column-types</code>, configured in <code>dbt_project.yml</code> (or per-seed in
          <code>schema.yml</code> using <code>column_types</code>), tells dbt to skip inference for a
          specific column and force a specific warehouse type instead — forcing <code>zip_code</code> to a
          string type preserves it exactly as written in the CSV, leading zeros included.
        </Para>

        <CodeBox label="dbt_project.yml — forcing zip_code to a string type for one seed">
{`seeds:
  my_project:
    zip_code_reference:
      +column_types:
        zip_code: varchar(5)`}
        </CodeBox>

        <CodeBox label="An alternative: configuring the same override in the seed's own schema.yml">
{`seeds:
  - name: zip_code_reference
    config:
      column_types:
        zip_code: varchar(5)
    columns:
      - name: zip_code
        description: US ZIP code. Forced to varchar(5) to preserve leading zeros lost by automatic type inference.
        tests:
          - unique
          - not_null`}
        </CodeBox>

        <Para>
          Note that this second form also demonstrates something worth remembering: a seed's
          <code>schema.yml</code> entry looks exactly like a model's — it can carry a <code>description</code>
          and <code>tests</code> the same way, since a seed is a full first-class dbt node once loaded, not a
          second-class object with reduced capabilities.
        </Para>

        <CodeBox label="After the override — dbt seed --full-refresh to apply the new column type">
{`$ dbt seed --full-refresh --select zip_code_reference

-- the recreated table now correctly contains:

zip_code | city           | state
---------|----------------|------
02134    | Boston         | MA
90210    | Beverly Hills  | CA
00501    | Holtsville     | NY
73301    | Austin         | TX`}
        </CodeBox>

        <Callout title="--full-refresh is required after changing a column type" color={K}>
          Adding or changing a <code>seed-column-types</code> override and then running a plain
          <code>dbt seed</code> is a common mistake — on many adapters, this only reloads rows into the
          table's existing schema rather than altering the column's type, so the fix appears to do nothing.
          <code>dbt seed --full-refresh</code>, exactly as shown above, forces the table to be dropped and
          recreated with the newly configured type, which is what actually applies the fix.
        </Callout>

        <Table
          headers={['Symptom', 'Likely cause', 'Fix']}
          rows={[
            ['A ZIP code, phone number, or ID column loses leading zeros', 'dbt inferred an integer type from all-numeric-looking string values.', 'Force the column to a string type (varchar) via seed-column-types, then dbt seed --full-refresh.'],
            ['A column of small whole numbers loaded as a floating-point type', 'A stray decimal value somewhere in the column (even one row) causes dbt to infer a float type for the whole column.', 'Force the column to an integer type explicitly, or clean the offending value in the CSV.'],
            ['A boolean-looking column (TRUE/FALSE, yes/no) loaded as text instead of a real boolean', 'dbt\'s inference did not recognize the specific text values used as boolean literals for your warehouse.', 'Force the column to boolean via seed-column-types, or standardize the CSV\'s literal values to ones your warehouse recognizes natively.'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 06 — Other seed configuration ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Other Seed Configuration Worth Knowing" />
        <SectionTitle>Custom Schemas, Delimiters, and Quoted Column Names</SectionTitle>

        <Para>
          Beyond <code>seed-column-types</code>, a handful of other seed-specific configs come up regularly
          enough in real projects to be worth knowing before you hit them for the first time. None of these
          are exotic — they mirror the same configuration patterns already familiar from models, applied to
          the one part of a seed's behavior that is genuinely different: how it interprets and loads a flat
          file.
        </Para>

        <SubTitle>+schema — building seeds into their own dedicated schema</SubTitle>

        <Para>
          By default, a seed builds into the same schema as the rest of the project's models. Many teams
          prefer to keep reference-data seeds visibly separate from transformed models, so an analyst
          browsing the warehouse can immediately tell "this table is a maintained lookup, not a computed
          output" just from its schema. A <code>+schema</code> config, set in <code>dbt_project.yml</code>
          under the <code>seeds:</code> key, does exactly this — and it follows the same
          <code>generate_schema_name</code> macro behavior covered in the Jinja and macros module, so a
          custom seed schema still gets the same dev/prod naming treatment as a custom model schema would.
        </Para>

        <CodeBox label="dbt_project.yml — building all seeds into a dedicated schema">
{`seeds:
  my_project:
    +schema: reference_data`}
        </CodeBox>

        <SubTitle>quote_columns — handling column names that need quoting</SubTitle>

        <Para>
          Some CSV files, especially ones exported from a spreadsheet tool or another system, have column
          headers that don't match the target warehouse's default identifier rules — a header with a space,
          a reserved SQL keyword used as a column name, or mixed case on a warehouse that otherwise
          lowercases identifiers by default. <code>quote_columns</code> tells dbt whether to wrap each
          column name in quotes when generating the DDL to create the seed table, preserving it exactly as
          written in the CSV header rather than letting the warehouse's default identifier normalization
          silently reshape it.
        </Para>

        <CodeBox label="dbt_project.yml — quoting column names for one seed with unusual headers">
{`seeds:
  my_project:
    campaign_category_mapping:
      +quote_columns: true`}
        </CodeBox>

        <Para>
          Without this, a header like <code>Campaign Category</code> (with a space) can fail to load
          cleanly, or load successfully but under a warehouse-mangled column name nobody expected, which then
          silently breaks any model referencing that column by its original name.
        </Para>

        <SubTitle>delimiter — for seed files that aren't comma-separated</SubTitle>

        <Para>
          Despite the name CSV (comma-separated values), not every flat file dbt needs to load actually uses
          a comma as its separator — a file exported from certain legacy systems, or one that intentionally
          uses a different delimiter because the data itself contains commas, might use a tab, a pipe, or a
          semicolon instead. The <code>delimiter</code> config tells dbt which character actually separates
          columns in that specific seed file.
        </Para>

        <CodeBox label="dbt_project.yml — a pipe-delimited seed file">
{`seeds:
  my_project:
    legacy_region_codes:
      +delimiter: "|"`}
        </CodeBox>

        <CodeBox label="seeds/legacy_region_codes.csv — the pipe-delimited file this config applies to">
{`region_code|region_name|active
NA1|North America|true
EU1|Europe|true
AP1|Asia Pacific|true`}
        </CodeBox>

        <Table
          headers={['Config', 'What it controls', 'Typical reason to set it']}
          rows={[
            ['+column_types', 'Force a specific column to a specific warehouse type instead of relying on inference.', 'Preserving leading zeros, forcing a numeric-looking column to stay a string, or fixing an incorrectly inferred float/boolean (Part 05).'],
            ['+schema', 'Which schema the seed builds into.', 'Keeping reference-data seeds visibly separate from computed models in the warehouse.'],
            ['+quote_columns', 'Whether column names are quoted in the generated DDL, preserving exact casing/spacing.', 'CSV headers with spaces, reserved keywords, or casing that would otherwise be silently normalized.'],
            ['+delimiter', 'Which character separates columns in the file.', 'A source file that is tab-, pipe-, or semicolon-delimited instead of comma-delimited, despite the .csv extension.'],
          ]}
        />

        <Callout title="These configs follow the exact same nesting pattern as model configs" color={K}>
          Every one of these lives under the <code>seeds:</code> key in <code>dbt_project.yml</code>,
          nested by project name and then by seed name, exactly the way model configs nest under
          <code>models:</code>. A seed-level override always takes precedence over a project-wide default set
          higher up the same nesting structure — the identical override-by-specificity behavior models
          already follow.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 07 — Seeds vs sources vs snapshots ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Seeds vs Sources vs Snapshots" />
        <SectionTitle>Three Ways dbt Deals With Data It Didn't Compute, and When Each One Fits</SectionTitle>

        <Para>
          Seeds are one of three distinct dbt mechanisms for dealing with data that isn't produced by a
          <code>SELECT</code> over another dbt model, and it is easy to reach for the wrong one simply
          because they can look superficially similar — all three end up as queryable tables in the
          warehouse, all three can be <code>ref()</code>'d or <code>source()</code>'d from a model. The
          right choice depends entirely on where the data actually comes from and how it changes over time,
          not on which one happens to be most familiar or easiest to set up first.
        </Para>

        <Table
          headers={['Mechanism', 'Where the data originates', 'How it changes over time', 'Right fit']}
          rows={[
            ['Seed', 'A file you write and commit yourself — no upstream system produces it.', 'Rarely, and only when a person deliberately edits the file.', 'Small, static, human-curated reference data (Part 02).'],
            ['Source', 'An external system\'s own tables, landed into the warehouse by a separate ingestion tool.', 'Whenever the ingestion tool runs — often continuously or on a tight schedule.', 'Any data an operational system already owns and produces on its own.'],
            ['Snapshot', 'An existing dbt source or model, captured over time to preserve its history.', 'Every time the snapshot runs, recording what changed since the last capture.', 'Tracking how a mutable table\'s rows changed over time — the concern of the next module in this track.'],
          ]}
        />

        <Para>
          The distinguishing question for seeds versus sources is almost always "does an operational system
          already own this data?" A country-region mapping has no operational owner — no application's
          database has a table for it, because it isn't the kind of fact an application transaction would
          ever produce. A customer's shipping address, by contrast, is owned by the e-commerce platform's own
          database, and even though it might occasionally be exported as a one-off CSV for a specific
          analysis, its real, authoritative home is that operational system — which is exactly why it should
          be ingested as a source, not committed as a seed.
        </Para>

        <CodeBox label="The same decision, worked through concretely for three examples">
{`Is there an operational system that owns this data?

1. "Which US states count as the Northeast region for our reporting?"
   -> No operational owner. This is our own business decision.
   -> SEED.

2. "What is every customer's current shipping address?"
   -> Yes -- the e-commerce platform's own customers table owns this.
   -> SOURCE, ingested from the operational database.

3. "What was each customer's shipping address on the day of each
    historical order, even after they later moved?"
   -> The current source table only has TODAY's address. Capturing
      how it changed over time is a different problem.
   -> SNAPSHOT, built on top of the source from case 2.`}
        </CodeBox>

        <Para>
          Snapshots deserve one further clarification here, because seeds and snapshots are sometimes
          confused simply for both being "not quite a normal model." A snapshot never originates data — it
          always builds on top of an existing source or model and adds change-tracking on top of it. A seed,
          by contrast, is the actual origin of its data; there is no earlier dbt object a seed is derived
          from. If you find yourself wanting to "snapshot" a seed to track how its rows changed over time,
          that is usually itself a sign the underlying data has started changing often enough that Part 03's
          scope boundary is worth revisiting — genuinely static reference data has no meaningful history to
          snapshot in the first place.
        </Para>

        <Callout title="When in doubt, ask where the data would go if this project didn't exist" color={K}>
          A useful test: if your dbt project vanished tomorrow, would this data still exist somewhere,
          produced by some other system, waiting to be ingested again? If yes, it's a source. If the honest
          answer is "no, that mapping lives nowhere except this CSV, because we made the decision ourselves,"
          it's a seed. The test rarely leaves genuine ambiguity once it's actually asked.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 — Seeds in CI and deployment ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Seeds in CI, Deployment, and Team Workflow" />
        <SectionTitle>Treating a Seed Change Like Any Other Code Change</SectionTitle>

        <Para>
          Because a seed's CSV lives in the same repository as every model, a change to it flows through
          exactly the same review and deployment process as a change to any model's SQL — which is a real
          advantage over a spreadsheet or an ad hoc manually maintained table, but only if the team actually
          treats seed changes with the same discipline as any other change, rather than as a special,
          lower-stakes category of edit that doesn't need the same scrutiny.
        </Para>

        <SubTitle>What a pull request touching a seed should include</SubTitle>

        <Para>
          A well-reviewed seed change looks like any other well-reviewed dbt change: the diff shows exactly
          which rows were added, removed, or changed (git's line-level diffing works on a CSV the same way it
          works on SQL), the accompanying <code>schema.yml</code> tests still make sense against the new
          data, and — critically — a reviewer actually checks whether the change is still within a seed's
          appropriate scope from Part 03, rather than rubber-stamping "just a data file" changes without
          the same scrutiny a logic change would get.
        </Para>

        <CodeBox label="A representative seed pull request diff">
{`--- a/seeds/country_region_mapping.csv
+++ b/seeds/country_region_mapping.csv
@@ -8,3 +8,4 @@ BR,Brazil,south_america
 AR,Argentina,south_america
+NZ,New Zealand,asia_pacific
+CL,Chile,south_america`}
        </CodeBox>

        <Para>
          A reviewer looking at this diff should be checking the same things they'd check on any change
          touching business logic: does adding New Zealand to <code>asia_pacific</code> match how the
          business actually wants it categorized (some companies group Australia and New Zealand as their
          own "oceania" bucket instead), and does the existing <code>accepted_values</code> test on the
          <code>region</code> column still cover every value now in use. A seed change that silently
          introduces a new region value with no corresponding update to that test is a real gap — the test
          would need to be updated in the same pull request, not treated as someone else's problem to notice
          later.
        </Para>

        <SubTitle>CI runs dbt seed exactly like any other node</SubTitle>

        <Para>
          A CI pipeline running <code>dbt build</code> against a pull request's changes rebuilds seeds
          alongside models automatically, in dependency order — there's no special CI step required for
          seeds beyond what already runs for the rest of the project. This matters because it means a seed
          change is validated against the exact same tests, and against models that actually join against it,
          in the same CI run that validates everything else — a broken <code>accepted_values</code> test
          from the New Zealand example above would fail the same CI check that catches a broken test on any
          model.
        </Para>

        <CodeBox label="A CI job's dbt build output showing a seed and a downstream model built together">
{`1 of 3 START seed file analytics_ci.country_region_mapping ... [RUN]
1 of 3 OK loaded seed file analytics_ci.country_region_mapping ... [INSERT 16 in 0.38s]
2 of 3 START test accepted_values_country_region_mapping_region ... [RUN]
2 of 3 PASS accepted_values_country_region_mapping_region ......... [PASS in 0.22s]
3 of 3 START sql view model analytics_ci.fct_revenue_by_region ... [RUN]
3 of 3 OK created sql view model analytics_ci.fct_revenue_by_region [SELECT 4 in 0.51s]

Done. PASS=2 WARN=0 ERROR=0 FAIL=0 TOTAL=2`}
        </CodeBox>

        <Para>
          One operational detail worth planning for deliberately: because <code>dbt seed</code> replaces a
          seed table's contents on every run, a seed built as part of a CI job against an ephemeral or
          shared CI schema behaves exactly like it would in any other environment — nothing special happens
          just because it's CI. The only thing worth double-checking is that whatever schema CI builds into
          is genuinely isolated from production, the same requirement that applies to every other node dbt
          builds during CI, not something unique to seeds.
        </Para>

        <Table
          headers={['Team practice', 'Why it matters for seeds specifically']}
          rows={[
            ['Require a reviewer on any seed CSV change', 'A seed encodes a real business decision — a country\'s regional classification, a campaign category — and deserves the same scrutiny as a change to the SQL implementing similar logic.'],
            ['Keep accepted_values tests in sync with the seed\'s actual contents', 'A seed change that introduces a new categorical value with no matching test update creates a silent gap where the test no longer reflects the seed\'s true set of valid values.'],
            ['Re-run dbt build (not just dbt seed) in CI', 'Confirms not just that the seed loads, but that every model and test depending on it still behaves correctly against the changed data.'],
            ['Periodically audit seed row counts and update frequency', 'The concrete, actionable version of Part 03\'s scope-boundary check — a rising row count or update frequency is the measurable signal that a seed may be outgrowing its intended scope.'],
          ]}
        />
      </section>

      <Divider />

      {/* ── Part 09 — Worked example: using the seed as a lookup ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Worked Example" />
        <SectionTitle>country_region_mapping End to End: CSV, Config, and a Mart Join</SectionTitle>

        <Para>
          Putting the whole module together: a small, genuinely static reference seed, its
          <code>schema.yml</code> configuration including a forced column type and tests, and a mart model
          that joins against it exactly the way it would join against any other model.
        </Para>

        <CodeBox label="seeds/country_region_mapping.csv — the full reference file">
{`country_code,country_name,region
US,United States,north_america
CA,Canada,north_america
MX,Mexico,north_america
GB,United Kingdom,europe
DE,Germany,europe
FR,France,europe
ES,Spain,europe
IT,Italy,europe
JP,Japan,asia_pacific
AU,Australia,asia_pacific
IN,India,asia_pacific
SG,Singapore,asia_pacific
BR,Brazil,south_america
AR,Argentina,south_america`}
        </CodeBox>

        <CodeBox label="seeds/schema.yml — documenting and testing the seed, and forcing country_code's type">
{`version: 2

seeds:
  - name: country_region_mapping
    description: >
      Static country-to-region mapping used across marketing and finance
      reporting. Maintained by the data platform team; updates go through
      a normal pull request against this CSV file. Not sourced from any
      operational system — this mapping is a business decision, not an
      observed fact.
    config:
      column_types:
        country_code: varchar(2)
    columns:
      - name: country_code
        description: ISO 3166-1 alpha-2 country code. Forced to varchar(2) so a code like "US" is never misinterpreted by type inference.
        tests:
          - unique
          - not_null
      - name: country_name
        description: Full country name, for display purposes.
        tests:
          - not_null
      - name: region
        description: The region this company's reporting groups this country into. Not a standard geographic classification — this is our own internal grouping.
        tests:
          - not_null
          - accepted_values:
              values: ['north_america', 'europe', 'asia_pacific', 'south_america']`}
        </CodeBox>

        <CodeBox label="models/marts/fct_revenue_by_region.sql — a mart model joining against the seed">
{`with orders as (
    select
        order_id,
        customer_id,
        total_amount_cents
    from {{ ref('fct_orders') }}
),

customers as (
    select
        customer_id,
        country_code
    from {{ ref('dim_customers') }}
),

regions as (
    select
        country_code,
        region
    from {{ ref('country_region_mapping') }}
)

select
    regions.region,
    count(distinct orders.order_id) as order_count,
    sum(orders.total_amount_cents) / 100.0 as total_revenue_dollars
from orders
join customers on orders.customer_id = customers.customer_id
left join regions on customers.country_code = regions.country_code
group by regions.region`}
        </CodeBox>

        <Para>
          Every piece here does real work. The seed itself holds the actual mapping decision, in a file any
          engineer can open and read directly. The <code>schema.yml</code> config forces
          <code>country_code</code> to a fixed-width string, which matters less for leading zeros here than
          for the more general principle — any code-like column benefits from an explicit type rather than
          leaving it to inference, since a future addition to the CSV (say, a numeric-looking country code
          from a different classification system) could otherwise silently change the inferred type for
          everyone. The <code>accepted_values</code> test on <code>region</code> guards against a typo in a
          future CSV edit — someone fat-fingering <code>"europe "</code> with a trailing space, or
          <code>"Europe"</code> with different casing, fails the test immediately on the next
          <code>dbt build</code> rather than silently producing an ungrouped row in the revenue report. And
          the mart model itself treats the seed exactly like any other <code>ref()</code>'d table, with no
          special syntax required anywhere in the join.
        </Para>

        <Callout title="A left join against the seed, not an inner join, is a deliberate choice" color={K}>
          Notice <code>fct_revenue_by_region</code> uses a <code>left join</code> against
          <code>country_region_mapping</code>, not an inner join. If a customer's country code isn't yet
          present in the seed — a new market the company just started operating in, before someone has added
          it to the CSV — an inner join would silently drop that customer's orders out of the report
          entirely. A left join keeps the order visible, with a null <code>region</code>, which is a far
          easier problem to notice and fix than orders quietly disappearing from a revenue total.
        </Callout>

        <SubTitle>Closing the loop: a singular test that catches an unmapped country before the left join hides it</SubTitle>

        <Para>
          The left join in <code>fct_revenue_by_region</code> is the right defensive choice for the report
          itself, but "the report doesn't crash" and "we noticed a country is missing from the mapping" are
          two different outcomes, and a left join alone only guarantees the first one. A null
          <code>region</code> sitting quietly in a <code>group by</code> result is easy to miss in practice —
          it just looks like one more row in a dashboard, not an alert. Closing that gap for real means
          adding an explicit check that a country actually being used in orders is not silently missing from
          the seed at all.
        </Para>

        <CodeBox label="tests/assert_all_order_countries_are_mapped.sql — a singular test over the seed join">
{`-- Fails if any customer's country_code, actually referenced by a
-- real order, has no matching row in country_region_mapping.
-- This is the check that turns a silent null region into a
-- visible, actionable test failure.

select distinct
    customers.country_code
from {{ ref('fct_orders') }} orders
join {{ ref('dim_customers') }} customers
    on orders.customer_id = customers.customer_id
left join {{ ref('country_region_mapping') }} regions
    on customers.country_code = regions.country_code
where regions.country_code is null`}
        </CodeBox>

        <Para>
          This is a cross-model check exactly of the shape the testing module's singular tests cover — it
          cannot be expressed as a column-level generic test, because it needs to join the seed against
          actual usage in the orders data, not just check the seed's own columns in isolation. Running this
          as part of <code>dbt build</code> means the very first order placed from a newly launched market
          fails this test immediately, with the specific missing <code>country_code</code> value right there
          in the failure output — rather than that market's revenue quietly sitting uncategorized in
          <code>fct_revenue_by_region</code> until someone happens to notice the numbers look a little off.
        </Para>

        <Table
          headers={['Defense', 'What it catches', 'What it does not catch']}
          rows={[
            ['Left join in the mart model', 'Prevents orders from an unmapped country from disappearing entirely.', 'Does not alert anyone that a country is unmapped — the null region is silent unless someone looks for it.'],
            ['accepted_values test on region', 'Catches a typo or unexpected value already present in the seed itself.', 'Does not catch a country_code that is missing from the seed altogether, since there is no row to check a value against.'],
            ['Singular test joining orders against the seed', 'Actively fails when a country_code actually in use has no matching seed row at all.', 'Nothing — this is the check that closes the gap the other two leave open.'],
          ]}
        />

        <SubTitle>A short checklist for the moment before you add a new seed</SubTitle>

        <Para>
          Putting the whole module together into something usable in the moment a new reference-data need
          comes up: before creating a new file in <code>seeds/</code>, it is worth running through a handful
          of quick questions, most of which are just Part 03's scope boundary and Part 07's origin-of-data
          test restated as a concrete pre-flight list.
        </Para>

        <BulletList
          items={[
            'Does any operational system already own this data? If yes, it belongs behind a source(), not a seed.',
            'Is it genuinely small — comfortably a few hundred to low thousands of rows, not tens of thousands?',
            'Will a person realistically update it only a handful of times a year, not on any kind of regular schedule?',
            'Does any column contain values where leading zeros, exact casing, or a fixed width actually matter? If so, plan the seed-column-types override up front rather than discovering the bug after the fact.',
            'Does the seed need at least a unique/not_null test on whatever functions as its natural key, and an accepted_values test on any column with a fixed, known set of valid values?',
          ]}
        />

        <Para>
          A "no" to the first question and comfortable "yes"es to the rest is the profile of a seed that will
          age well — reviewed occasionally, rarely touched, and never a source of surprise. A seed that
          fails more than one of these checks at the moment it's created is worth a second look before the
          file is even committed, since the cost of correcting a wrongly-scoped seed only grows the longer it
          sits in production being quietly relied upon by downstream models.
        </Para>
      </section>

      <Divider />

      {/* ── Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About dbt Seeds</SectionTitle>

        {[
          {
            wrong: '"Seeds are just a convenient way to bulk-load any CSV data into the warehouse"',
            right: 'Seeds are specifically for small, mostly-static, human-curated reference data with no natural operational source system. Large or frequently-changing data — even if it happens to arrive as a CSV — belongs behind a real ingestion pipeline and a source(), not a seed (Part 02, Part 03).',
          },
          {
            wrong: '"dbt automatically gets column types right when loading a CSV"',
            right: 'dbt infers types purely by inspecting the values in each column, which fails in specific, common ways — most notably a ZIP-code-style column with leading zeros getting inferred as an integer and silently losing them. seed-column-types exists precisely to override this inference when it gets it wrong (Part 05).',
          },
          {
            wrong: '"dbt seed and dbt seed --full-refresh do the same thing"',
            right: 'A plain dbt seed already replaces a seed table\'s row contents from the CSV on most adapters. --full-refresh matters specifically when a column\'s configured type has changed — it forces the table to be dropped and recreated with the new schema, which a routine dbt seed does not reliably do (Part 04).',
          },
          {
            wrong: '"A seed is a lesser or second-class dbt object compared to a model"',
            right: 'A seed is a first-class node in the DAG exactly like a model — it gets its own schema.yml with descriptions and tests, appears in dbt docs generate\'s lineage graph, and is referenced with the exact same ref() function any model would use (Part 01, Part 06).',
          },
          {
            wrong: '"Once something is a seed, it should stay a seed no matter how it grows"',
            right: 'A seed that starts genuinely small and static can quietly grow into something updated weekly with hundreds of hand-added rows — at that point it is standing in for a real ingestion pipeline nobody deliberately built, and the scope boundary from Part 03 should be re-checked, not assumed settled forever.',
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
        <SectionTitle>Three Ways Real Teams Have Used — and Almost Misused — Seeds</SectionTitle>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Compass — real estate platform, ZIP-code-based market definitions
          </div>
          <Para>
            Compass maintains a seed mapping ZIP codes to the internal "market" names its business teams use
            for reporting — a genuinely static, human-curated list with no natural source system, exactly the
            kind of data seeds are meant for. The seed initially had no column type override, and a handful of
            Northeast ZIP codes with leading zeros silently lost them on load, causing those specific ZIP
            codes to fail every downstream join against the properly formatted 5-digit ZIP codes stored
            elsewhere in the warehouse.
          </Para>
          <Para>
            The fix was exactly the pattern in Part 05: forcing the ZIP code column to <code>varchar(5)</code>
            via <code>seed-column-types</code> and running <code>dbt seed --full-refresh</code> to apply the
            corrected schema. A handful of Massachusetts and Rhode Island markets, which had been quietly
            underreporting for weeks because their ZIP codes never matched anything, immediately started
            joining correctly.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Zillow — real estate marketplace, a seed that outgrew its scope
          </div>
          <Para>
            A Zillow analytics team started a seed listing manually curated "premium market" designations for
            about 40 metro areas — a small, deliberate business decision, a textbook seed candidate. Over
            about a year, as the company expanded its premium tier, the same CSV grew to nearly 2,000 rows,
            with analysts adding new entries by hand almost every week as new markets launched, sourced from
            an internal planning spreadsheet that had effectively become the real source of truth.
          </Para>
          <Para>
            The team eventually recognized this had quietly crossed the boundary from Part 03: a weekly-updated,
            near-2,000-row file being manually edited by several different people was no longer "small and
            mostly static," it was standing in for a real ingestion process. They moved the underlying
            planning data into an actual internal tool with its own database table, added a source() pointing
            at a proper extract of it, and reduced the seed back down to a genuinely small, rarely-changing
            table of only the handful of top-level tier definitions that really were fixed business decisions.
          </Para>
        </HighlightBox>

        <HighlightBox>
          <div style={{ fontSize: 11, fontWeight: 700, color: K, background: `${K}1a`, border: `1px solid ${K}33`, borderRadius: 6, padding: '4px 10px', fontFamily: FONT_MONO, display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Thumbtack — services marketplace, UTM campaign categorization
          </div>
          <Para>
            Thumbtack's marketing analytics team needed a way to group dozens of specific UTM campaign
            values into a small number of consistent categories — paid_social, affiliate, organic_search,
            referral — for reporting, a categorization decided entirely by the marketing team itself with no
            natural home in any operational system. They built exactly the seed pattern from Part 06: a
            small CSV mapping raw UTM values to categories, with schema.yml tests asserting the category
            column only ever contains the agreed-upon fixed list of values.
          </Para>
          <Para>
            When a new ad platform integration started generating a UTM value nobody had added to the seed
            yet, the <code>accepted_values</code> test on the category seed's downstream usage — not the seed
            table itself, but a mart model joining against it — flagged the gap the same day the new campaign
            went live, rather than that traffic silently landing in an "uncategorized" bucket for weeks before
            anyone in marketing happened to notice a discrepancy in a channel performance report.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        <Para>
          These five questions cover what an interviewer is actually checking when they ask about seeds:
          not just "can you name the command," but whether you understand the scope boundary that keeps
          seeds useful, and can reason concretely about a type-inference bug that has bitten real projects.
        </Para>

        {[
          {
            q: 'What makes a seed fundamentally different from every other object in a dbt project, and what mechanism actually loads it into the warehouse?',
            a: 'Every other dbt object — a model, a snapshot — starts as a SELECT statement over data that already exists in the warehouse. A seed starts as a plain .csv file checked into the seeds/ directory of the project, with no upstream table to select from at all (Part 01). dbt seed reads that file, infers a schema from its contents, and creates or replaces a table in the warehouse named after the file. Once loaded, the seed is a first-class DAG node — referenced with ref() exactly like a model, and it can carry its own schema.yml descriptions and tests.',
          },
          {
            q: 'What is the single most important scope boundary for when to use a seed, and what is the risk of getting it wrong?',
            a: 'Seeds are for small, mostly-static, human-curated data with no natural operational source system — a country-region mapping, a manually maintained list of campaign categories (Part 02). They are not for large or frequently-changing data, which belongs behind a real ingestion pipeline and a source() instead (Part 03). Getting this wrong doesn\'t fail loudly: a seed that starts small and rarely-changing can quietly grow into something updated weekly with thousands of rows, at which point it has become an ad hoc, manually operated substitute for a real ingestion pipeline that nobody deliberately decided to build — exactly what happened in the Zillow example, where a 40-row seed grew to nearly 2,000 rows over a year before the team caught it.',
          },
          {
            q: 'Walk through the classic leading-zero problem with seed column type inference, and explain exactly why it happens.',
            a: 'dbt infers a seed column\'s type by inspecting the actual values in the CSV — a column where every value looks like a whole number gets inferred as an integer. A US ZIP code column containing values like 02134 looks entirely numeric to that inference, so it gets loaded as an integer, and an integer has no concept of a leading zero — 02134 silently becomes 2134 in the loaded table (Part 05). The fix is a seed-column-types (or per-seed column_types) override forcing that specific column to a string type like varchar(5), which preserves the value exactly as written in the CSV, followed by dbt seed --full-refresh to actually apply the new schema to the existing table.',
          },
          {
            q: 'Why does dbt seed --full-refresh sometimes matter even though a plain dbt seed already reloads a seed table\'s data?',
            a: 'A plain dbt seed replaces a seed table\'s row contents from its current CSV on most adapters, but that is not the same as changing the table\'s underlying schema. If you change a seed-column-types override — for example forcing a column from an inferred integer to an explicit varchar — a routine dbt seed run may not reliably alter an existing column\'s type on every adapter (Part 04, Part 05). dbt seed --full-refresh forces the table to be dropped and recreated entirely, which is what actually applies a changed column type rather than leaving the previously created, incorrectly-typed table in place.',
          },
          {
            q: 'In the worked country_region_mapping example, why does the mart model use a left join against the seed instead of an inner join, and what would go wrong with an inner join?',
            a: 'A left join preserves every order even when its customer\'s country_code has no matching row yet in the seed — for example a brand-new market the company just started operating in, before anyone has added it to the CSV (Part 06). An inner join would silently drop those orders out of the revenue-by-region report entirely, with no error and no obvious symptom beyond a revenue total that is quietly lower than it should be. The left join instead surfaces the gap as a visible null region, which is a far easier problem to notice, investigate, and fix than orders disappearing without a trace — exactly the same reasoning that makes relationships tests (covered in the testing module) prefer surfacing a broken join explicitly rather than silently filtering it out.',
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
        <SectionTitle>Five Mistakes Engineers Make Working With Seeds</SectionTitle>

        {[
          {
            title: 'Using a seed for data that already has a real operational source system',
            detail: 'If a database, API, or CRM already produces the data, that system should be ingested through a real pipeline and a source() — reaching for a seed instead means manually re-exporting and re-committing a CSV that a proper ingestion tool should be keeping in sync automatically.',
          },
          {
            title: 'Never overriding a seed column\'s inferred type, then being surprised when leading zeros or precision silently disappear',
            detail: 'dbt\'s type inference is a reasonable default, not a guarantee — any code-like column (ZIP codes, phone numbers, certain ID formats) is worth explicitly forcing to a string type via seed-column-types rather than trusting inference by default.',
          },
          {
            title: 'Changing a seed-column-types override and running a plain dbt seed instead of dbt seed --full-refresh',
            detail: 'On many adapters, a routine dbt seed only reloads rows into the existing table schema — it does not reliably alter an already-created column\'s type. The fix silently appears to do nothing until --full-refresh actually rebuilds the table with the corrected schema.',
          },
          {
            title: 'Letting a genuinely small, static seed grow into a large, frequently-updated one without re-evaluating it',
            detail: 'A seed that made sense at 40 rows updated twice a year can quietly become an ad hoc substitute for a real pipeline at 2,000 rows updated weekly — the scope boundary in Part 03 is worth revisiting periodically, not just applying once at creation time.',
          },
          {
            title: 'Skipping tests and descriptions on a seed because "it\'s just a CSV"',
            detail: 'A seed is a first-class dbt node — schema.yml tests (unique, not_null, accepted_values) and a clear description apply to it exactly as they would to a model, and are just as valuable for catching a typo or an out-of-range value introduced in a future edit to the CSV.',
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
        <SectionTitle>dbt Seed Errors — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: 'Database Error: Could not convert value \'02134\' into type INT64',
            cause: 'A column has an explicit seed-column-types override forcing it to a numeric type, but the actual CSV contains a value that is not cleanly numeric — for example a stray blank cell, a value with a leading "+", or inconsistent formatting somewhere in the column.',
            fix: 'Open the CSV and check every value in that column for anything non-numeric, including blank or whitespace-only cells; either clean the data or reconsider whether the column should actually be a string type instead.',
          },
          {
            error: 'A seed table loads successfully, but a downstream join against it silently returns fewer matches than expected',
            cause: 'A column dbt inferred as a numeric type (often a ZIP code, phone number, or ID column with leading zeros) lost those leading characters on load, so it no longer matches the properly formatted string values it is being joined against elsewhere.',
            fix: 'Add a seed-column-types override forcing the affected column to a string type, then run dbt seed --full-refresh so the corrected schema and data actually take effect.',
          },
          {
            error: 'dbt seed reports success but an existing column\'s type never actually changes in the warehouse',
            cause: 'A seed-column-types override was added or changed, but only a plain dbt seed was run afterward — on many adapters this reloads rows into the table\'s existing schema without altering an already-created column\'s type.',
            fix: 'Run dbt seed --full-refresh (optionally scoped with --select to just the affected seed) to force the table to be dropped and recreated with the newly configured column type.',
          },
          {
            error: 'Compilation Error: Seed file \'country_region_mapping\' not found — but the CSV exists in seeds/',
            cause: 'The seed file exists but was never actually loaded with dbt seed, so no table exists yet for ref() to resolve to — this is a distinct step from having the CSV present in the repository.',
            fix: 'Run dbt seed (or dbt build, which includes seeds) before running or testing any model that references the seed with ref().',
          },
          {
            error: 'A team member reports the seed table has stale data even after they pulled the latest CSV changes from version control',
            cause: 'Pulling the latest CSV file changes the file on disk, but does not by itself update the corresponding warehouse table — that only happens the next time dbt seed is actually run.',
            fix: 'Confirm dbt seed (or dbt build) was re-run after pulling the CSV changes; a seed file being current in git does not mean the loaded table in the warehouse is current until the load step actually runs again.',
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
        'A seed is a .csv file in seeds/ that dbt seed loads into the warehouse as a real table — the one dbt object type that starts as a flat file instead of a SELECT statement, but otherwise participates in the DAG exactly like a model.',
        'Seeds are for small, mostly-static, human-curated reference data with no natural operational source system — a country-region mapping, a campaign category list. Large or frequently-changing data belongs behind a real ingestion pipeline and a source(), not a seed.',
        'dbt infers seed column types from CSV values, which reliably fails for columns like ZIP codes with leading zeros — seed-column-types forces the correct type, and dbt seed --full-refresh is required afterward to actually rebuild the table\'s schema.',
        'dbt seed replaces a seed table\'s row contents from the current CSV on most adapters; dbt seed --full-refresh additionally forces a schema rebuild, which matters specifically after changing a column\'s configured type.',
        'A seed gets its own schema.yml with descriptions and tests exactly like a model, and is referenced from any model with the same ref() function — it is a first-class dbt node, not a lesser one.',
        'The scope boundary between "seed" and "should be a real ingestion pipeline" is worth periodically re-checking — a seed that starts genuinely small and static can quietly grow past that boundary over time without anyone deciding it should.',
      ]} />
    </LearnLayout>
  )
}
