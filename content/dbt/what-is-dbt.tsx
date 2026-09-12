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

const MythCard = ({ wrong, right }: { wrong: string; right: string }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 18 }}>
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
      <span style={{ color: '#ff4757', fontWeight: 900, fontSize: 15, flexShrink: 0 }}>✕</span>
      <span style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.8, fontStyle: 'italic' }}>{wrong}</span>
    </div>
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 8, padding: '12px 16px' }}>
      <span style={{ color: '#00e676', fontWeight: 900, fontSize: 15, flexShrink: 0 }}>✓</span>
      <span style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.8 }}>{right}</span>
    </div>
  </div>
)

const MYTHS = [
  {
    wrong: '"dbt extracts data from our production databases and loads it into the warehouse."',
    right: 'dbt never touches source systems. It only runs SQL against data that is already sitting in your warehouse. Extraction and loading are a separate job, handled by tools like Fivetran, Airbyte, or a custom ingestion pipeline — see Part 03 for the exact scope boundary.',
  },
  {
    wrong: '"dbt is a database. My tables live inside dbt."',
    right: 'dbt has no storage of its own. Every table and view dbt creates lives in your actual warehouse — Snowflake, BigQuery, Redshift, Databricks. dbt is a compiler and orchestrator that generates and runs SQL there. Delete your dbt project and your warehouse tables are untouched, as explained in Part 03.',
  },
  {
    wrong: '"You need to learn a whole new proprietary query language to use dbt."',
    right: 'You write ordinary SQL SELECT statements. dbt adds a thin templating layer (Jinja) on top for referencing other models and reusing logic, but the core skill is still SQL you likely already know — covered in Part 04.',
  },
  {
    wrong: '"ETL and ELT are basically the same thing, just different letters."',
    right: 'They describe two different architectures for where transformation happens — before loading (ETL) versus after loading (ELT) — and the shift from one to the other is the entire reason dbt exists. Part 02 walks through why this distinction matters.',
  },
  {
    wrong: '"dbt Cloud and dbt Core are two totally different products with different capabilities."',
    right: 'dbt Core is the open-source command-line engine that does the actual compiling and running of models; dbt Cloud is a hosted product built around that same engine, adding a scheduler, UI, and hosted docs. The underlying transformation logic is the same — see Part 06.',
  },
]

const INTERVIEW_QA = [
  {
    q: 'What is dbt, and what problem does it solve that plain SQL scripts don\'t?',
    a: (
      <>
        <Para>
          dbt (data build tool) is a command-line framework that lets analytics engineers write data
          transformations as version-controlled SQL SELECT statements, called models, and gives them
          dependency management, testing, and documentation on top. As Part 03 covers, dbt's actual job is
          narrow: it compiles your SQL (resolving Jinja templating like <code>ref()</code> and{' '}
          <code>source()</code>), figures out in what order models must run based on their dependencies, and
          executes each one against the warehouse as a <code>CREATE TABLE AS SELECT</code> or{' '}
          <code>CREATE VIEW AS</code> statement.
        </Para>
        <Para>
          What it solves, compared to a folder of hand-run SQL scripts, is everything software engineers take
          for granted and analysts historically didn't have: your transformation logic lives in git, so you
          get code review, a commit history, and the ability to revert a bad change. You get automated tests
          that fail your pipeline if a primary key turns out to have duplicates or a foreign key points
          nowhere. You get documentation and a dependency graph generated from the code itself, not a
          wiki page that goes stale. Part 05 covers why this bundle of practices gave rise to the
          "analytics engineer" title as its own discipline.
        </Para>
      </>
    ),
  },
  {
    q: 'Walk me through ETL versus ELT and why the order matters.',
    a: (
      <>
        <Para>
          ETL — extract, transform, load — was the standard architecture when warehouses had fixed, expensive
          compute. You extracted from source systems, ran transformations on a separate processing server
          (or inside the ETL tool itself) to shape the data into its final form, and only then loaded the
          finished, clean tables into the warehouse. The transform step happened outside the warehouse because
          the warehouse's compute was too limited and too costly to spend on transformation work.
        </Para>
        <Para>
          ELT — extract, load, transform — flips the last two steps. Raw data is loaded into the warehouse
          essentially as-is, immediately after extraction, and transformation happens afterward, inside the
          warehouse, using the warehouse's own compute. This became viable once cloud warehouses like
          Snowflake, BigQuery, and Redshift made compute cheap, elastic, and separately scalable from storage.
          Part 02 goes through this shift in detail — it's the single most important piece of context for why
          dbt exists at all: dbt is built specifically to be the "T" in ELT, run natively as SQL inside the
          warehouse rather than in some external transformation engine.
        </Para>
      </>
    ),
  },
  {
    q: 'Does dbt replace tools like Fivetran or Airbyte?',
    a: (
      <>
        <Para>
          No, and conflating them is one of the most common mistakes beginners make, which is why Part 03
          spends real time on dbt's scope boundary. Fivetran and Airbyte are ingestion tools — they handle
          the "EL" of ELT, connecting to source systems (a production Postgres database, a Salesforce API, a
          Stripe account) and landing raw data into the warehouse. dbt starts only after that raw data is
          already there. It has no connectors to source systems and no concept of extraction.
        </Para>
        <Para>
          In a real stack, these tools sit side by side: Fivetran lands raw <code>stripe.charges</code> and{' '}
          <code>salesforce.opportunities</code> tables into a raw schema on a schedule, and dbt then reads
          those raw tables and builds the cleaned, joined, aggregated models on top. Neither tool can do the
          other's job.
        </Para>
      </>
    ),
  },
  {
    q: 'Why did the industry start using the term "analytics engineer," and how does it relate to dbt?',
    a: (
      <>
        <Para>
          Before dbt, there was a gap between data engineers (who built pipelines and infrastructure, usually
          in Python/Scala/Spark, and often didn't want to own business logic) and data analysts (who wrote SQL
          to answer business questions but usually weren't given the tools or expectation to apply software
          engineering practices to that SQL — no version control, no tests, no CI). Transformation logic ended
          up either bottlenecked on data engineers who had bandwidth for pipeline work, not business logic, or
          scattered across analysts' personal scripts with no shared standard.
        </Para>
        <Para>
          dbt gave the SQL-transformation layer its own tooling — version control, testing, documentation,
          modularity via <code>ref()</code> — which meant it could become its own discipline, distinct from
          both data engineering and analysis: analytics engineering, covered in Part 05. The job exists largely
          because dbt (and tools like it) made treating SQL with engineering discipline practical and
          expected, not because the underlying work itself is new.
        </Para>
      </>
    ),
  },
  {
    q: 'A stakeholder asks you to "just connect dbt to our Salesforce instance." How do you respond?',
    a: (
      <>
        <Para>
          This is a direct test of the scope boundary from Part 03. The accurate answer is that dbt cannot
          connect to Salesforce, or to any source system, at all — it has no extraction capability. What the
          stakeholder actually needs is an ingestion tool (Fivetran, Airbyte, or a similar connector-based
          product) configured to pull Salesforce data into the warehouse on a schedule; only once that raw
          data exists in the warehouse does it become something a dbt model could reference with{' '}
          <code>source()</code> and build on top of.
        </Para>
        <Para>
          The stronger version of this answer doesn't just correct the misconception — it explains why the
          separation is useful: ingestion and transformation genuinely are different problems (one deals with
          authenticating to external APIs and handling their specific rate limits and schemas, the other deals
          with reshaping data that's already landed), and keeping them as separate tools means each can be
          swapped or scaled independently, exactly as Part 01's three-layer model lays out.
        </Para>
      </>
    ),
  },
  {
    q: 'What are dbt\'s main alternatives, and when might a team choose something else?',
    a: (
      <>
        <Para>
          Part 07 covers this landscape in more depth, but at a high level there are three categories. First,
          hand-rolled SQL scripts with no framework — the simplest option, viable for a very small team with
          few models, but it scales poorly: no dependency tracking, no tests, no documentation, and easy to
          silently break downstream tables when you change an upstream one. Second, GUI-based ETL/ELT tools
          that do transformation inside a drag-and-drop interface — approachable for less SQL-fluent teams,
          but the transformation logic is locked inside the tool's proprietary format, which makes version
          control, code review, and portability harder.
        </Para>
        <Para>
          Third, Dataform, Google's product with essentially the same core idea as dbt — SQL models, a{' '}
          <code>ref()</code>-style dependency graph, tests — and now integrated into BigQuery specifically.
          Teams already committed to BigQuery sometimes pick Dataform for that native integration; teams that
          are warehouse-agnostic or already using Snowflake/Redshift/Databricks default to dbt, partly because
          of its broader adoption and ecosystem. Neither is categorically "better" — the honest answer in an
          interview is that the choice usually comes down to warehouse fit and existing team familiarity, not
          a decisive feature gap.
        </Para>
      </>
    ),
  },
]

const MISTAKES = [
  {
    title: 'Assuming dbt can pull data out of a production application database',
    body: 'A new user sometimes tries to point dbt directly at an operational Postgres database expecting it to "sync" data into the warehouse. dbt has no extraction capability at all — it only runs SQL against tables already present in the warehouse it is connected to. You need an ingestion tool (Fivetran, Airbyte, Stitch, a custom script) to land the raw data first. See Part 03.',
  },
  {
    title: 'Thinking a dbt model is a table dbt "owns" and manages state for',
    body: 'A dbt model is just a SELECT statement in a .sql file. Every time dbt runs, it re-executes that SELECT and rebuilds (or updates) the corresponding table or view in the warehouse. dbt does not maintain a separate copy of your data anywhere — the warehouse is the only place your data actually lives. Confusing this leads people to look for their data "inside dbt," which does not exist. See Part 03.',
  },
  {
    title: 'Writing all transformation logic in one enormous SQL query out of habit',
    body: 'Coming from a background of writing one huge nested-subquery SQL script, beginners often try to cram an entire pipeline into one dbt model instead of splitting it into small, layered models (staging → intermediate → mart) that reference each other with ref(). This throws away most of dbt\'s value — modularity, reusability, and a readable dependency graph. See Part 04 and Part 05.',
  },
  {
    title: 'Believing dbt Cloud and dbt Core are unrelated products with different transformation engines',
    body: 'They share the same underlying compilation and execution logic — dbt Cloud is dbt Core plus a hosted scheduler, browser IDE, and hosted documentation site. A model that works in dbt Core will produce the same compiled SQL in dbt Cloud. See Part 06.',
  },
  {
    title: 'Treating "dbt adoption" as purely a tooling decision with no process change',
    body: 'Teams sometimes install dbt and expect the "analytics engineering" benefits automatically, without adopting the surrounding practices — code review on model changes, actually writing tests, keeping documentation current. dbt makes those practices possible and convenient, it does not enforce them by itself. See Part 05.',
  },
]

const ERRORS = [
  {
    title: '`Compilation Error: Model \'stg_orders\' depends on a node named \'orders\' which was not found`',
    body: 'This happens when a ref(\'orders\') call points at a model name that either has a typo, was renamed, or was never created. dbt resolves ref() calls at compile time by matching against the models it has actually discovered in your project — it does not guess. Check the exact filename (minus .sql) of the model you meant to reference.',
  },
  {
    title: '`Database Error: Table "RAW_DB"."RAW_SCHEMA"."ORDERS" does not exist`',
    body: 'This is a source() problem, not a ref() problem — it means the raw table your source() call points to genuinely does not exist yet in the warehouse under that database/schema/table name. Usually the ingestion tool hasn\'t landed it yet, the name is misspelled in your sources YAML, or you\'re pointed at the wrong environment (dev vs. prod raw schema).',
  },
  {
    title: '`Runtime Error: Parser Error: syntax error at or near "AS"` (or similar SQL syntax errors)',
    body: 'This means the SQL dbt generated after resolving your Jinja is not valid SQL for your warehouse. The fastest way to debug it is dbt compile, then open the corresponding file under target/compiled/ and read the actual generated SQL — it is often a stray comma, a mismatched Jinja {% if %}/{% endif %}, or a warehouse-specific SQL dialect difference.',
  },
  {
    title: '`Warning: Nothing to do. Try checking your model configs and model specification args` (empty run)',
    body: 'dbt ran successfully but selected zero models — almost always because a --select flag or a model selector syntax typo excluded everything, or because the project has no models defined yet in the folder dbt is looking at.',
  },
  {
    title: '`Encountered an error: Could not find profile named \'my_project\'`',
    body: 'dbt could not find a matching profile in profiles.yml for the profile name declared in dbt_project.yml. This is a connection-configuration issue, not a modeling issue — check that the profile name in both files matches exactly and that profiles.yml exists in the expected directory (usually ~/.dbt/).',
  },
]

export default function WhatIsDbt() {
  return (
    <LearnLayout
      title="What is dbt?"
      description="What dbt actually is, the ETL-to-ELT shift that created the need for it, its exact scope boundary against ingestion tools, why it exists, and how it compares to hand-rolled SQL, GUI ETL tools, and Dataform."
      section="dbt — Module 01"
      readTime="60 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'dbt', href: '/learn/dbt' },
        { label: 'What is dbt?', href: '/learn/dbt/what-is-dbt' },
      ]}
      next={{ title: 'How dbt Works: Compile, Run, and the DAG', href: '/learn/dbt/how-dbt-works' }}
    >
      {/* Part 01 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Transformation Layer" />
        <SectionTitle>What a "Transformation Layer" Even Is</SectionTitle>
        <Para>
          Before you can understand what dbt is, you need to understand the gap in a data stack that it
          fills. Picture a modern company — call it a mid-size grocery delivery startup, FreshCart. FreshCart
          has a production Postgres database recording every order, a Salesforce instance tracking sales
          leads, a Stripe account processing payments, and a mobile app sending click events. None of that
          data lives together, none of it is shaped for answering business questions, and most of it is
          structured for the needs of the application that produced it, not for analysis.
        </Para>
        <Para>
          Getting from "data exists somewhere, in whatever shape the source system produced it" to "a clean
          table an analyst can query to answer 'what was our revenue by region last month'" requires three
          distinct kinds of work. First, the data has to be extracted from each source system. Second, it has
          to be loaded somewhere central — a data warehouse. Third, it has to be transformed: cleaned,
          renamed, joined across sources, deduplicated, aggregated, and reshaped into tables that actually
          answer business questions rather than just mirroring whatever an application's internal database
          schema happened to look like.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Beginner model:</strong> "Data engineering" is one big undifferentiated blob of moving
            data around.
          </Para>
          <Para>
            <strong>Production model:</strong> a modern data stack is layered — an ingestion layer extracts
            and loads raw data, a transformation layer reshapes it into analytics-ready tables, and a
            business intelligence layer (Looker, Tableau, Mode) sits on top querying those finished tables.
            dbt's entire job is that middle layer, and nothing else.
          </Para>
        </HighlightBox>
        <Para>
          That transformation layer is not a nice-to-have step you could skip. Raw data straight from a
          production database is usually unusable directly for analysis: it might have technical column names
          like <code>usr_stat_cd</code> instead of <code>user_status</code>, it might spread related facts
          across a dozen normalized tables that need joining, it might contain soft-deleted rows that should
          be filtered out, duplicate records from a flaky sync process, or nested JSON blobs that need to be
          flattened into columns. Someone — or something — has to do that reshaping work before a business
          question can be answered reliably. That "someone" is the transformation layer, and dbt is the tool
          built specifically to be that layer.
        </Para>
        <Table
          headers={['Layer', 'Job', 'Typical tools']}
          rows={[
            ['Ingestion (extract + load)', 'Pull data out of source systems and land it into the warehouse, largely as-is.', 'Fivetran, Airbyte, Stitch, custom scripts'],
            ['Transformation', 'Clean, join, dedupe, and aggregate raw warehouse tables into analytics-ready models.', 'dbt, Dataform, hand-written SQL'],
            ['Consumption / BI', 'Query the finished, transformed tables to build dashboards and reports.', 'Looker, Tableau, Mode, Metabase'],
          ]}
        />
        <Callout title="Why this matters before anything else" color={K}>
          Almost every confusion beginners have about dbt traces back to not having this three-layer picture
          clearly in mind. If you remember one thing from this Part, remember that dbt lives in the middle
          layer only — it never touches the first layer (extraction/loading) and it is not the third layer
          (dashboards). Part 03 makes this scope boundary explicit and unambiguous.
        </Callout>
        <SubTitle>A concrete before-and-after, in one table</SubTitle>
        <Para>
          It helps to see the raw-versus-transformed contrast side by side, using the same FreshCart orders
          data. The left column below is roughly what a row looks like fresh out of the production database.
          The right column is what an analyst actually wants to query.
        </Para>
        <CodeBox label="raw row, as landed by ingestion (one row from raw.freshcart_raw.orders)">
{`ord_id | cust_id | ord_stat | ord_placed_ts          | amt_cents | is_deleted
78341  | 9042    | 3        | 2026-03-11T14:02:33Z   | 4599      | false`}
        </CodeBox>
        <CodeBox label="transformed row, after dbt's staging model (analytics.stg_orders)">
{`order_id | customer_id | order_status | order_placed_at      | amount_usd
78341    | 9042        | completed    | 2026-03-11 14:02:33  | 45.99`}
        </CodeBox>
        <Para>
          Notice everything that changed between the two: cryptic column names became readable ones, a
          numeric status code (<code>3</code>) became a human-readable label (<code>completed</code>),
          cents became dollars, and the soft-deleted flag was used to filter the row rather than exposed as a
          column an analyst has to remember to check every time. None of that is exotic engineering — it's
          exactly the kind of mechanical, repetitive cleanup that used to live scattered across dozens of
          individual analysts' personal SQL scripts before a shared transformation layer existed.
        </Para>
      </section>

      <Divider />

      {/* Part 02 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — ETL vs ELT" />
        <SectionTitle>ETL vs ELT — The Shift That Created the Need for dbt</SectionTitle>
        <Para>
          If you take away only one piece of context from this entire module, make it this one: dbt exists
          because the data industry moved from ETL to ELT, and dbt is purpose-built to be the "T" in that new
          order. Understanding why that shift happened tells you why dbt looks the way it does.
        </Para>
        <SubTitle>ETL — transform before loading</SubTitle>
        <Para>
          For a long time, the standard architecture was extract, transform, load. Data was extracted from
          source systems, piped through a separate transformation engine or ETL tool (Informatica, Talend,
          SSIS) running on its own dedicated servers, and only the final, cleaned, business-ready tables were
          loaded into the data warehouse. The warehouse itself was treated as a precious, expensive resource —
          on-premises warehouses had fixed hardware, licensing costs tied to server capacity, and limited,
          hard-to-scale compute. You did not want to waste that scarce warehouse compute on the "dirty work"
          of transformation; you did that work elsewhere and only loaded the finished product.
        </Para>
        <SubTitle>ELT — load first, transform where the data lives</SubTitle>
        <Para>
          Cloud data warehouses changed the economics entirely. Snowflake, BigQuery, and Redshift decoupled
          storage from compute and made compute elastic — you can spin up more processing power for the
          duration of a transformation job and pay only for what you used, rather than provisioning a fixed
          server for peak load year-round. Storage itself also became cheap enough that landing raw,
          unprocessed data and keeping it around indefinitely was no longer wasteful.
        </Para>
        <Para>
          Once compute is cheap, elastic, and lives inside the warehouse itself, there is no longer a reason
          to transform data on a separate system before loading it. It becomes simpler and more flexible to
          load raw data into the warehouse immediately after extraction, and then run transformations as SQL
          queries against the warehouse's own compute — extract, load, transform. This has real practical
          advantages beyond just cost: raw data is preserved in the warehouse in its original form, so if a
          transformation turns out to be wrong, you can fix the SQL and simply re-run it against the still-intact
          raw data, rather than having to re-extract from the source system.
        </Para>
        <CodeBox label="ETL vs ELT — where transformation compute happens">
{`ETL (older model):
  source system --extract--> ETL server/tool --transform--> warehouse
                                    ^
                            transformation happens HERE,
                            on a separate system, before loading

ELT (current model, what dbt is built for):
  source system --extract--> warehouse (raw data lands as-is)
                                  |
                                  v
                          dbt runs SQL transformations
                          HERE, inside the warehouse itself,
                          using the warehouse's own compute`}
        </CodeBox>
        <Table
          headers={['', 'ETL', 'ELT']}
          rows={[
            ['Where transformation runs', 'A separate processing engine, before the warehouse', 'Inside the warehouse, using its own compute'],
            ['When it made sense', 'On-premise warehouses with fixed, expensive compute', 'Cloud warehouses with cheap, elastic compute'],
            ['Raw data preserved?', 'Often not — only the transformed output is kept', 'Yes — raw data lands and stays, transformations are re-runnable'],
            ['Where dbt fits', 'Does not apply — dbt has nothing to plug into', 'This is exactly the "T" step dbt is built to run'],
          ]}
        />
        <Callout title="Common confusion" color="#ff4757">
          Do not think of ETL and ELT as two names for the same process. They describe genuinely different
          architectures with different tools at each step, and the shift from one to the other — driven by
          cheap warehouse compute — is the direct reason a tool like dbt could exist at all. Without cheap,
          elastic warehouse compute, running heavy SQL transformations directly in the warehouse the way dbt
          does would not have been practical or affordable.
        </Callout>
        <SubTitle>Why "transform where the data already lives" is not just a cost story</SubTitle>
        <Para>
          The cost argument is the headline reason ELT became viable, but there is a second, quieter benefit
          that turned out to matter just as much in practice: keeping raw data around, untouched, inside the
          warehouse. Under classic ETL, once the transformation server produced its final output and that
          intermediate raw data was discarded or archived elsewhere, discovering that a transformation step
          three years ago dropped a column you now need meant re-extracting from the source system — which
          might no longer even exist in the same form, or at all.
        </Para>
        <Para>
          Under ELT, the raw <code>freshcart_raw.orders</code> table sits in the warehouse indefinitely (or
          for as long as retention policy allows), completely unaffected by any bug in a dbt model built on
          top of it. If a staging model turns out to have miscalculated a column, you fix the SQL and simply
          re-run dbt — the raw source data needed to recompute the correct answer never went anywhere. This
          re-runnability is a direct, practical consequence of the ELT ordering, not a separate feature dbt
          had to build.
        </Para>
        <Table
          headers={['Question', 'Under ETL', 'Under ELT (dbt\'s world)']}
          rows={[
            ['If a transformation bug is found later, can you recompute from scratch?', 'Only if the raw extract was separately archived — often it wasn\'t', 'Yes — raw data is sitting right there in the warehouse'],
            ['Where does transformation compute get billed?', 'A separately provisioned ETL server, sized for peak load year-round', 'The warehouse itself, scaled elastically only while a job runs'],
            ['Can a new use case reuse the same raw data differently?', 'Only by re-extracting, since the raw form usually wasn\'t kept', 'Yes — write a new model against the same already-loaded raw table'],
          ]}
        />
      </section>

      <Divider />

      {/* Part 03 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — What dbt Actually Is" />
        <SectionTitle>What dbt Actually Is, and Its Exact Scope Boundary</SectionTitle>
        <Para>
          At its core, dbt is a command-line tool and framework that lets you write data transformations as
          SQL SELECT statements — called models — and handles everything around turning those SELECT
          statements into real tables and views in your warehouse: figuring out the order to run them in based
          on their dependencies, running automated data quality tests against them, and generating
          documentation and a visual dependency graph from the same codebase.
        </Para>
        <Para>
          Concretely, a dbt model is a single <code>.sql</code> file containing one SELECT statement. You do
          not write <code>CREATE TABLE</code> or <code>INSERT</code> statements yourself — dbt wraps your
          SELECT in the appropriate DDL/DML automatically, based on how you've configured that model
          (typically as a table or a view). You reference other models not by hardcoding a schema and table
          name, but through a function called <code>ref()</code>, which dbt resolves at compile time and uses
          to build a dependency graph automatically — covered in full mechanical detail in the next module.
        </Para>
        <CodeBox label="a minimal dbt model — models/stg_orders.sql">
{`select
    order_id,
    customer_id,
    order_status,
    cast(order_placed_at as timestamp) as order_placed_at,
    amount_cents / 100.0 as amount_usd
from {{ source('freshcart_raw', 'orders') }}
where order_status is not null`}
        </CodeBox>
        <Para>
          Running <code>dbt run</code> takes that file, resolves the <code>source()</code> call into the
          actual raw table name, and executes the equivalent of <code>CREATE OR REPLACE VIEW stg_orders AS
          &lt;that SELECT&gt;</code> against your warehouse. That is the entire mechanic, at a beginner level
          — the deep mechanics of compilation and execution order are the subject of Module 02.
        </Para>
        <SubTitle>The critical scope boundary: dbt does not extract or load data</SubTitle>
        <Para>
          This is the single most common misunderstanding beginners bring to dbt, so it's worth stating as
          plainly as possible: dbt has no functionality whatsoever for connecting to source systems like a
          production application database, a SaaS API, or a file drop. It cannot pull data out of Postgres,
          Salesforce, or Stripe. Its only interaction with the world is running SQL against a warehouse it is
          already connected to, on data that is already sitting there.
        </Para>
        <HighlightBox>
          <Para><strong>What dbt does:</strong></Para>
          <BulletList
            items={[
              'Compiles SQL models (resolving Jinja templating and ref()/source() calls)',
              'Determines the order to run models in, based on their dependencies',
              'Executes compiled SQL against the warehouse to create/update tables and views',
              'Runs automated data quality tests against those tables',
              'Generates documentation and a visual dependency graph from the project',
            ]}
          />
          <Para><strong>What dbt does NOT do:</strong></Para>
          <BulletList
            items={[
              'Extract data from source systems (production databases, SaaS APIs, files)',
              'Load raw data into the warehouse for the first time',
              'Store any data itself — everything lives in the warehouse, not in dbt',
              'Serve as a BI or dashboarding tool for end users',
            ]}
          />
        </HighlightBox>
        <Callout title="Where dbt sits in a real stack" color={K}>
          A typical stack looks like: Fivetran extracts raw <code>orders</code>, <code>customers</code>, and{' '}
          <code>payments</code> tables from FreshCart's production Postgres database and lands them into a{' '}
          <code>raw</code> schema in Snowflake, on a schedule, completely independent of dbt. dbt then reads
          those raw tables and builds staging, intermediate, and mart models on top of them. Looker then
          queries the finished mart tables to power dashboards. dbt only ever touches the middle step.
        </Callout>
        <SubTitle>A quick self-check: is this dbt's job or not?</SubTitle>
        <Para>
          Because the scope boundary is so frequently misunderstood, it's worth running through a few concrete
          requests and sorting which layer each one actually belongs to.
        </Para>
        <Table
          headers={['Request', 'Is this dbt\'s job?', 'Why']}
          rows={[
            ['"Pull new rows from our Salesforce account every hour."', 'No', 'This is extraction — an ingestion tool\'s job, not dbt\'s'],
            ['"Join orders and customers into one clean revenue table."', 'Yes', 'This is transformation of data already in the warehouse — exactly dbt\'s job'],
            ['"Build a dashboard showing revenue by region."', 'No', 'This is consumption/BI — a tool like Looker or Tableau queries dbt\'s finished output'],
            ['"Make sure order_id is always unique in our orders table."', 'Yes', 'This is a data quality test, one of dbt\'s core features (Part 04)'],
            ['"Load a CSV of sales territory mappings maintained by hand."', 'Partially', 'dbt can load small, static reference files as "seeds," but this is not its role for large or frequently-changing raw data'],
          ]}
        />
      </section>

      <Divider />

      {/* Part 04 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Models, Tests, and Docs" />
        <SectionTitle>The Three Pillars: Models, Tests, and Documentation</SectionTitle>
        <Para>
          dbt's value comes from bundling three things that used to live separately (if they existed at all)
          into one workflow built around the same codebase: the transformation logic itself, automated checks
          on that logic's output, and documentation describing what everything means.
        </Para>
        <SubTitle>Models — SQL as version-controlled code</SubTitle>
        <Para>
          A model is just a SELECT statement saved as a <code>.sql</code> file inside a dbt project, which is
          itself an ordinary git repository. This single fact is what unlocks everything else: because your
          transformation logic is plain text in version control, you get pull requests, code review, diffs
          that show exactly what changed in a model, a full history of who changed what and why, and the
          ability to revert a bad change in seconds. None of that is possible when transformation logic lives
          as ad hoc scripts on someone's laptop or buried inside a GUI tool's proprietary project file.
        </Para>
        <SubTitle>Tests — catching bad data before it reaches a dashboard</SubTitle>
        <Para>
          dbt lets you declare tests against your models directly alongside the model definitions — for
          example, asserting that <code>order_id</code> is unique and never null, or that every{' '}
          <code>customer_id</code> in the orders table actually exists in the customers table. Running{' '}
          <code>dbt test</code> executes these as SQL queries that should return zero failing rows; if they
          return any rows, the test fails and you know immediately, rather than an analyst noticing a
          dashboard number looks wrong three weeks later.
        </Para>
        <CodeBox label="a simple dbt test declaration — models/schema.yml">
{`models:
  - name: stg_orders
    columns:
      - name: order_id
        tests:
          - unique
          - not_null
      - name: customer_id
        tests:
          - not_null
          - relationships:
              to: ref('stg_customers')
              field: customer_id`}
        </CodeBox>
        <Output>{`$ dbt test
Running with dbt=1.8.0
Found 2 models, 3 tests

1 of 3 START test unique_stg_orders_order_id ................. [RUN]
1 of 3 PASS unique_stg_orders_order_id ....................... [PASS in 0.41s]
2 of 3 START test not_null_stg_orders_order_id ............... [RUN]
2 of 3 PASS not_null_stg_orders_order_id ..................... [PASS in 0.38s]
3 of 3 START test relationships_stg_orders_customer_id ....... [RUN]
3 of 3 FAIL 4 relationships_stg_orders_customer_id ........... [FAIL 4 in 0.52s]

Completed with 1 error and 0 warnings:
  Failure in test relationships_stg_orders_customer_id (models/schema.yml)
  Got 4 results, configured to fail if != 0`}</Output>
        <Para>
          That failing test just caught four orders referencing a customer_id that doesn't exist in the
          customers table — a real data quality problem, caught automatically, before anyone built a
          dashboard on top of bad data.
        </Para>
        <SubTitle>Documentation — generated from the same source of truth</SubTitle>
        <Para>
          Because models, their columns, and their tests are all declared in the project, dbt can generate a
          searchable documentation site and a visual DAG (directed acyclic graph, covered in depth in Module
          02) directly from that same code — no separate wiki to keep in sync, no diagram that goes stale the
          moment someone adds a model.
        </Para>
        <CodeBox label="adding a description — models/schema.yml">
{`models:
  - name: stg_orders
    description: >
      One row per order, cleaned and standardized from the raw
      orders table. Soft-deleted (test) orders are filtered out.
    columns:
      - name: order_id
        description: Primary key. Unique identifier for an order.
      - name: amount_usd
        description: Order total, converted from cents to dollars.`}
        </CodeBox>
        <Para>
          Running <code>dbt docs generate</code> followed by <code>dbt docs serve</code> reads all of this —
          model descriptions, column descriptions, declared tests, and the dependency graph built from{' '}
          <code>ref()</code> calls — and produces a browsable, searchable site automatically. Anyone on the
          team can look up what <code>amount_usd</code> means, which tests run against it, and which models
          depend on it, without asking the person who wrote it or hunting through old Slack threads.
        </Para>
        <SubTitle>The kinds of tests you'll actually reach for</SubTitle>
        <Para>
          dbt ships a small set of built-in "generic" tests that cover the overwhelming majority of everyday
          data quality checks, and the community and dbt Labs both maintain packages of additional ones for
          more specific situations.
        </Para>
        <Table
          headers={['Test', 'What it checks', 'Example use']}
          rows={[
            ['unique', 'No duplicate values in a column', 'order_id should never repeat'],
            ['not_null', 'A column never contains a null', 'customer_id should always be populated'],
            ['accepted_values', 'A column only contains values from an allowed list', 'order_status should only be one of: pending, completed, cancelled, refunded'],
            ['relationships', 'Every value in a column exists in a referenced column elsewhere (referential integrity)', 'Every customer_id in orders should exist in the customers table'],
          ]}
        />
        <Para>
          Beyond these built-ins, teams commonly write custom "singular" tests — a plain SQL query saved
          under a tests folder that should return zero rows if the data is healthy, for business rules too
          specific for a generic test to express, like "refunded orders should never have a positive revenue
          amount."
        </Para>
        <CodeBox label="a custom singular test — tests/assert_refunds_are_never_positive.sql">
{`-- This test fails if it returns any rows at all
select
    order_id,
    amount_usd
from {{ ref('stg_orders') }}
where order_status = 'refunded'
  and amount_usd > 0`}
        </CodeBox>
      </section>

      <Divider />

      {/* Part 05 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Why Companies Adopted dbt" />
        <SectionTitle>Why Companies Adopted dbt — and the Rise of "Analytics Engineering"</SectionTitle>
        <Para>
          Before tools like dbt existed, transformation logic tended to live in one of two uncomfortable
          places. Either it lived in data engineers' pipeline code — Python or Spark jobs maintained by people
          whose primary job was infrastructure, not business logic, creating a bottleneck whenever a business
          question needed a new metric or a new join — or it lived in individual analysts' personal SQL
          scripts, copy-pasted and slightly modified from person to person, with no shared version history, no
          tests, and no way to know if changing one query would break someone else's downstream report.
        </Para>
        <Para>
          dbt gave the SQL transformation layer the same tooling that software engineers had taken for granted
          for years: version control, code review, automated testing, CI/CD, and documentation generated from
          code. That combination let a new discipline take shape — analytics engineering — sitting between
          data engineering and data analysis. An analytics engineer owns the transformation layer: turning raw
          ingested data into clean, tested, documented models that analysts and BI tools can trust and query
          directly.
        </Para>
        <Table
          headers={['Role', 'Primary focus', 'Typical tools']}
          rows={[
            ['Data engineer', 'Building and maintaining pipelines, infrastructure, ingestion', 'Python, Spark, Airflow, cloud infrastructure'],
            ['Analytics engineer', 'Transforming raw warehouse data into clean, tested, documented models', 'dbt, SQL, git'],
            ['Data analyst', 'Answering business questions and building reports on top of clean models', 'SQL, Looker, Tableau, Mode'],
          ]}
        />
        <Callout title="Why this job title exists" color={K}>
          "Analytics engineer" is not a rebrand of "data analyst who knows more SQL." It specifically reflects
          someone applying software-engineering discipline — version control, testing, modularity, CI — to
          the transformation layer. That discipline is only practical at scale because dbt (and tools like it)
          made it convenient and standard, rather than something each team had to invent for itself.
        </Callout>
        <Para>
          The business case companies made for adopting dbt typically comes down to trust and speed: trust,
          because tested and documented models catch data quality problems before they reach an executive
          dashboard; speed, because a well-organized dbt project with modular, reusable models lets a team
          answer a new business question by composing existing models rather than starting a transformation
          from scratch every time.
        </Para>
        <SubTitle>What changed day-to-day for the people doing the work</SubTitle>
        <Para>
          It's worth being concrete about what adopting dbt actually changes for an analyst or engineer's
          daily workflow, rather than leaving it abstract. Before, a typical change — say, fixing a
          miscalculated revenue metric — might mean finding whichever personal SQL script or dashboard query
          computed that metric, editing it in place, and hoping no one else's separate copy of similar logic
          needed the same fix. There was often no reliable way to know who else depended on that logic, and no
          record of why the number had changed if someone asked next quarter.
        </Para>
        <Para>
          After adopting dbt, the same fix is made once, in one model, as a pull request. Anyone who depends
          on that model — tracked explicitly through <code>ref()</code>, as later modules cover — is
          automatically affected the next time the project runs, with no separate copies to hunt down. The
          change has a commit message, an author, a timestamp, and (ideally) a reviewer, forming a durable
          record of exactly what changed and why, which is precisely the kind of change-tracking software
          engineers have relied on for decades and which analytics work mostly lacked before this generation
          of tooling.
        </Para>
        <Table
          headers={['Aspect of the job', 'Before a shared transformation layer', 'After adopting dbt']}
          rows={[
            ['Where logic lives', 'Scattered across personal scripts, BI tool queries, ad hoc notebooks', 'One version-controlled project, in git'],
            ['Reviewing a change', 'Rarely happened — often no formal review step existed', 'Pull request review, same as application code'],
            ['Knowing who depends on a query', 'Usually unknown — tribal knowledge, if anyone remembered', 'Explicit via the dependency graph (ref())'],
            ['Catching a broken metric', 'Someone notices a dashboard number looks wrong', 'An automated test fails before the bad data reaches anyone'],
          ]}
        />
      </section>

      <Divider />

      {/* Part 06 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Where the Name Comes From, and a Short History" />
        <SectionTitle>Why "dbt" Stands for "Data Build Tool" — and a Short, Accurate History</SectionTitle>
        <Para>
          dbt is short for "data build tool" — a deliberately literal, unglamorous name reflecting what the
          tool does: it builds your data (models) the way a build tool like Make or Maven builds software,
          resolving dependencies and running steps in the right order.
        </Para>
        <Para>
          dbt was created inside a consulting company called Fishtown Analytics, founded by Tristan Handy and
          Drew Banin, who were doing analytics consulting work for clients and kept reinventing the same
          SQL-organization patterns project after project — dbt began as an internal tool to standardize that
          work before being open-sourced. As dbt grew into its own product and business, Fishtown Analytics
          renamed itself dbt Labs to reflect that dbt had become the company's core focus rather than a
          side tool supporting consulting work.
        </Para>
        <SubTitle>dbt Core vs dbt Cloud</SubTitle>
        <Para>
          dbt Core is the open-source command-line engine — the actual compiler and executor that reads your
          project, resolves Jinja and <code>ref()</code>/<code>source()</code> calls, builds the dependency
          graph, and runs SQL against your warehouse. It is free, runs anywhere you can run a terminal, and is
          what most of the mechanics in this track describe.
        </Para>
        <Para>
          dbt Cloud is dbt Labs' commercial, hosted product built around that same dbt Core engine. It adds a
          browser-based IDE for writing and running models, a built-in job scheduler so you don't need to wire
          up your own cron or Airflow trigger just to run dbt on a schedule, hosted documentation, and
          collaboration features aimed at teams. The underlying transformation logic — the SQL, the
          compilation, the DAG — is the same engine either way; dbt Cloud is infrastructure and convenience
          wrapped around dbt Core, not a different transformation language or a different set of capabilities.
        </Para>
        <Table
          headers={['', 'dbt Core', 'dbt Cloud']}
          rows={[
            ['What it is', 'Open-source CLI engine', 'Hosted product built on dbt Core'],
            ['Cost', 'Free', 'Commercial, has a free tier for small teams'],
            ['Scheduling', 'You wire up your own (cron, Airflow, CI)', 'Built-in scheduler'],
            ['Where you write models', 'Any text editor / local machine', 'Browser-based IDE (or still locally, and sync via git)'],
            ['Underlying transformation logic', 'Same engine', 'Same engine'],
          ]}
        />
        <SubTitle>A brief, accurate timeline</SubTitle>
        <Para>
          dbt's early versions in the mid-2010s were used internally at Fishtown Analytics for consulting
          engagements before being released as an open-source project. Adoption grew steadily through the
          later 2010s as more data teams moved onto cloud warehouses and needed exactly the kind of in-warehouse
          transformation tool dbt provided. dbt Labs later introduced dbt Cloud as a commercial product
          layered on top of the same open-source engine, and the company has continued to expand the core
          engine's capabilities (incremental models, more materializations, a growing package ecosystem)
          alongside dbt Cloud's own feature set.
        </Para>
        <Callout title="Keep the history honest" color="#ff4757">
          It's easy to overstate or misremember specific dates and version numbers for a fast-moving open
          source project. The reliable facts worth holding onto are the ones in this Part: Fishtown Analytics
          created dbt, later renamed itself dbt Labs as dbt became the company's core product, dbt Core stayed
          open source throughout, and dbt Cloud is a hosted product built around that same open-source engine
          — not a rewrite or a different transformation model.
        </Callout>
      </section>

      <Divider />

      {/* Part 07 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — dbt vs Alternatives" />
        <SectionTitle>dbt vs. Its Alternatives — A Fair Comparison</SectionTitle>
        <Para>
          dbt is not the only way to solve the transformation problem, and it's worth understanding its real
          alternatives honestly rather than assuming it's an obviously correct default in every situation.
        </Para>
        <SubTitle>Hand-written SQL scripts, no framework</SubTitle>
        <Para>
          The simplest possible approach: a folder of <code>.sql</code> files, run manually or via a basic
          cron job, with no dependency tracking, no built-in testing, and no documentation generation. This is
          genuinely fine for a very small team with a handful of models and low complexity. It stops scaling
          quickly once you have dozens of interdependent models, because nothing tracks which models depend on
          which, nothing warns you when a change to one query breaks a downstream one, and there's no
          standardized way to test data quality.
        </Para>
        <SubTitle>GUI-based ETL/ELT tools</SubTitle>
        <Para>
          Tools with drag-and-drop transformation canvases let you build pipelines visually rather than in
          SQL files. This can be more approachable for teams with less SQL fluency, and some of these tools
          bundle ingestion and transformation together. The trade-off is that the transformation logic usually
          lives inside the tool's own proprietary project format rather than as portable, plain-text SQL,
          which makes version control, code review, and migrating away from the tool harder.
        </Para>
        <SubTitle>Dataform — Google's similar product</SubTitle>
        <Para>
          Dataform is conceptually very close to dbt: SQL-based models, a dependency graph built from{' '}
          <code>ref()</code>-style references, and built-in testing. Google acquired Dataform and integrated it
          directly into BigQuery, so it has a natural advantage for teams already standardized on BigQuery. dbt
          is warehouse-agnostic and has a larger, longer-established open-source community and ecosystem of
          packages. Neither tool has a decisive technical advantage over the other for most use cases — the
          practical deciding factor is usually which warehouse a team is on and which tool the team already
          knows, not a meaningful gap in capability.
        </Para>
        <Table
          headers={['Option', 'Strength', 'Trade-off']}
          rows={[
            ['Hand-written SQL scripts', 'Zero learning curve, no new tool to adopt', 'No dependency tracking, testing, or docs at scale'],
            ['GUI ETL/ELT tool', 'Approachable for less SQL-fluent teams', 'Logic locked in a proprietary format, harder to version control'],
            ['Dataform', 'Tight native integration with BigQuery', 'Smaller ecosystem outside the BigQuery/Google Cloud world'],
            ['dbt', 'Warehouse-agnostic, large ecosystem and community', 'Still requires SQL fluency and a modeling discipline to pay off'],
          ]}
        />
        <SubTitle>A realistic decision scenario</SubTitle>
        <Para>
          Consider a hypothetical 12-person data team at a mid-size subscription business, currently
          maintaining about 40 hand-written SQL scripts that build their reporting tables, run via a single
          cron job on a shared server. Two engineers recently left, and no one else fully understands the
          dependency order those 40 scripts need to run in — the order was tribal knowledge those two
          engineers carried in their heads. A change to script 12 recently broke script 31 downstream, and
          nobody noticed for two weeks because there was no test that would have caught it.
        </Para>
        <Para>
          This is close to the textbook scenario dbt was built for: the team is already firmly on a cloud
          warehouse (so ELT compute economics apply), the transformation logic already exists as SQL (so the
          migration is organizational, not a rewrite into a new language), and the pain points — unclear
          dependency order, no tests, tribal knowledge walking out the door — are exactly what a dependency
          graph, automated tests, and version control solve. A team in this position adopting dbt is not
          choosing it over a meaningfully better alternative in the abstract; they're choosing it because
          their actual, concrete problems match what dbt is built to address.
        </Para>
        <Para>
          Contrast that with a two-person startup with three simple reporting queries and no reporting
          complexity to speak of yet. Introducing dbt there has a real cost — a new tool, a new project
          structure, a new deployment step — for a problem (uncoordinated, poorly-tested SQL at scale) that
          doesn't exist yet at that size. This is exactly why "should we adopt dbt" is not a yes/no question
          with one universal answer — it depends on whether the team's actual pain points match what the tool
          solves, the same honest evaluation this Part has tried to walk through rather than assert.
        </Para>
        <Callout title="Take away a fair picture, not a sales pitch" color={K}>
          This module is not trying to convince you dbt is the only correct choice. It's trying to make sure
          you understand precisely what problem it solves (the transformation layer of ELT), what it doesn't
          do (extraction, loading, dashboarding), and where it sits relative to genuinely reasonable
          alternatives — so that when you do use it, you understand why.
        </Callout>
      </section>

      <Divider />

      {/* Part 08 */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Who Actually Uses dbt, Day to Day" />
        <SectionTitle>Who Actually Uses dbt, and What a Normal Day Looks Like</SectionTitle>
        <Para>
          It helps to ground all of this in what using dbt actually looks like for the people who do it daily,
          rather than leaving the whole module at the level of architecture diagrams. The primary users of dbt
          are analytics engineers, though data analysts and data engineers both interact with dbt projects
          regularly too, just with different emphasis.
        </Para>
        <Table
          headers={['Role', 'How they typically use dbt']}
          rows={[
            ['Analytics engineer', 'Writes and maintains the bulk of models, tests, and documentation; owns the overall project structure and conventions'],
            ['Data analyst', 'Often writes simpler mart models for their own reporting needs, and consumes staging/intermediate models others built rather than starting from raw sources'],
            ['Data engineer', 'Owns the ingestion tools feeding raw data into the warehouse and the orchestration (Part 05 of Module 02) that triggers dbt runs, without necessarily writing many models themselves'],
          ]}
        />
        <Para>
          A typical day for an analytics engineer working in dbt involves picking up a request — a new metric,
          a bug in an existing model, a data quality alert from a failed test — checking out a branch,
          editing or adding a <code>.sql</code> model file (and its accompanying YAML for tests and
          documentation), running dbt locally against a personal development schema to verify the change
          works and doesn't break downstream models, and opening a pull request for review before merging.
          None of this requires touching a warehouse console directly or writing raw DDL by hand — the whole
          workflow happens through SQL files and git, exactly the way software engineers work with application
          code.
        </Para>
        <Callout title="This is the practical payoff of everything in this module" color={K}>
          Every concept covered so far — ELT, the transformation-layer scope boundary, models/tests/docs,
          analytics engineering as a discipline — converges on this one everyday workflow: editing a SQL file
          in a code editor, running it locally, and merging it through a pull request, the same rhythm a
          backend engineer would recognize, applied to data transformations instead of application features.
        </Callout>
        <SubTitle>What this means for how you should learn dbt from here</SubTitle>
        <Para>
          Because the daily workflow is fundamentally "edit a SQL file, run it, check the result," the most
          effective way to build real fluency with dbt is not to memorize every configuration option up
          front, but to get a small project running locally as early as possible and start making small,
          concrete changes to it — exactly the sequence the next module in this track walks through, moving
          from this conceptual foundation into the mechanical details of compilation, the dependency graph,
          and execution order.
        </Para>
      </section>

      <Divider />

      {/* Misconceptions */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Common Misconceptions About dbt</SectionTitle>
        <Para>
          Five beliefs that trip up almost everyone new to dbt — each one traces back to a specific Part
          above where the correction is explained in full.
        </Para>
        {MYTHS.map(m => <MythCard key={m.wrong} wrong={m.wrong} right={m.right} />)}
      </section>

      <Divider />

      {/* Real world story */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Real-World Stories" />
        <SectionTitle>Why This Actually Matters — Three Real Scenarios</SectionTitle>
        <HighlightBox>
          <Para><strong>At Notion:</strong></Para>
          <Para>
            An analytics engineer joining Notion's data team inherits a warehouse where dozens of dashboards
            all define "active workspace" slightly differently — some count any workspace with a login in 30
            days, others require at least one page edit. Without a shared transformation layer, each analyst
            had been writing their own version of that logic directly into their BI tool's queries. Migrating
            that logic into a single dbt model — <code>dim_active_workspaces</code> — with a tested,
            documented definition means every downstream dashboard references the same <code>ref()</code> and
            the same number, permanently ending the "whose number is right" debates in every metrics review.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para><strong>At Faire:</strong></Para>
          <Para>
            A finance stakeholder at Faire asks for a new metric — gross merchandise volume by wholesale
            brand cohort — that requires joining order data, brand signup dates, and a currency conversion
            table. Because the raw orders and brands tables were already modeled as clean, tested dbt staging
            models from previous work, the analytics engineer builds the new metric as a mart model that
            references those existing staging models with <code>ref()</code>, rather than re-writing the
            underlying cleaning and joining logic from scratch. The new report ships in an afternoon instead
            of a week, because the transformation layer had already done the hard, reusable work once.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para><strong>In a system design / analytics-engineering interview:</strong></Para>
          <Para>
            A candidate is asked to design a data platform for a hypothetical subscription business. A weak
            answer jumps straight to "we'd use dbt" without explaining why. A strong answer first lays out the
            ELT architecture — ingestion tool lands raw data, warehouse stores it cheaply, transformation
            layer builds it into analytics-ready tables — and only then names dbt specifically as the tool
            that fills the transformation layer, explaining that it would not replace the ingestion tool and
            would not itself power the dashboards. That framing (Part 01, Part 03) is exactly what
            interviewers are listening for — precise scope, not tool-name-dropping.
          </Para>
        </HighlightBox>
        <HighlightBox>
          <Para><strong>At Warby Parker:</strong></Para>
          <Para>
            A newly hired data analyst is asked why the company's "customer lifetime value" number differs
            between the finance team's spreadsheet and the marketing team's dashboard. Tracing both back, they
            find finance's number comes from a manually maintained SQL query last edited eight months ago, and
            marketing's comes from a different query built independently by a contractor who has since left.
            Neither definition is documented anywhere, and neither team knows the other's number exists.
            Consolidating both into a single dbt model — with the definition written once, tested, and
            documented — doesn't just fix the immediate discrepancy; it removes the possibility of the same
            drift happening again, because every downstream consumer now references the one model instead of
            maintaining its own copy of the logic.
          </Para>
        </HighlightBox>
      </section>

      <Divider />

      {/* Interview Prep */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Interview Prep" />
        <SectionTitle>Interview Questions You Should Be Able to Answer</SectionTitle>
        {INTERVIEW_QA.map((item, i) => (
          <div key={item.q} style={{ marginBottom: 34 }}>
            <SubTitle>{i + 1}. {item.q}</SubTitle>
            {item.a}
          </div>
        ))}
      </section>

      <Divider />

      {/* Common Mistakes */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Common Mistakes Beginners Make</SectionTitle>
        {MISTAKES.map(m => (
          <div key={m.title} style={{ marginBottom: 22 }}>
            <SubTitle>{m.title}</SubTitle>
            <Para>{m.body}</Para>
          </div>
        ))}
      </section>

      <Divider />

      {/* Error Library */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors and Mix-Ups You'll Actually Hit</SectionTitle>
        <Para>
          Module 01 is largely conceptual, so most of the "errors" a true beginner runs into are not
          stack traces from dbt itself yet — they're the mix-ups and false starts that come from applying the
          wrong mental model before you've run dbt for real. The list below mixes those early conceptual
          errors with the first genuine tool errors most learners hit in their first week.
        </Para>
        {ERRORS.map(e => (
          <div key={e.title} style={{ marginBottom: 22 }}>
            <CodeBox label="error / symptom">{e.title}</CodeBox>
            <Para>{e.body}</Para>
          </div>
        ))}
        <SubTitle>A sixth error, common in the first real run: a missing or misconfigured profile</SubTitle>
        <CodeBox label="error">{'Runtime Error\n  Could not run dbt\n  ProfileConfigError: The profile \'freshcart\' in profiles.yml has invalid keys'}</CodeBox>
        <Para>
          A dbt project's <code>dbt_project.yml</code> declares which profile (a named connection
          configuration — warehouse type, account, credentials) it expects to use, and the actual connection
          details live in a separate <code>profiles.yml</code> file, deliberately kept outside the git-tracked
          project so credentials never end up committed to version control. This error means the profile name
          was found but something inside it doesn't match what dbt's adapter for that warehouse expects —
          usually a typo'd key name copied from an example for a different warehouse type (a BigQuery example
          field pasted into a Snowflake profile, for instance).
        </Para>
        <SubTitle>A seventh, very common early symptom: "I don't see my data anywhere"</SubTitle>
        <Para>
          A learner installs dbt, connects it to a warehouse, and runs their first model successfully — dbt
          reports success — but then can't find "their data" when they look around, because they were
          expecting to find it inside dbt somewhere rather than in the warehouse itself. This isn't a dbt
          error at all; it's the scope-boundary misconception from Part 03 showing up as a support question.
          The fix is simply to look in the actual warehouse (the schema dbt was configured to build into),
          where the table or view genuinely was created.
        </Para>
      </section>

      <KeyTakeaways
        items={[
          'dbt is a command-line framework that turns version-controlled SQL SELECT statements ("models") into tables and views in your warehouse, and handles dependency ordering, testing, and documentation on top.',
          'dbt is the "T" in ELT — the industry shifted from transforming data before loading it (ETL) to transforming it after loading it (ELT) once cloud warehouses made compute cheap and elastic, and dbt is purpose-built to run that transformation step inside the warehouse.',
          'dbt does not extract data from source systems and does not load raw data into the warehouse — that is the job of ingestion tools like Fivetran and Airbyte. dbt only ever operates on data already sitting in the warehouse.',
          'dbt Core is the free, open-source engine; dbt Cloud is dbt Labs\' hosted product built around that same engine, adding a scheduler, browser IDE, and hosted docs — not a different transformation language.',
          'The bundling of version control, automated testing, and generated documentation around SQL transformations is what gave rise to "analytics engineering" as its own discipline.',
          'dbt is not the only option — hand-written SQL scripts and GUI ETL tools remain reasonable for some teams, and Dataform is a close, credible alternative, especially for BigQuery-native teams.',
        ]}
      />
    </LearnLayout>
  )
}
