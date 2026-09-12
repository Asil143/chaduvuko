import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function CostOptimization() {
  return (
    <LearnLayout
      title="Cost Optimization"
      description="Credit-based billing, auto-suspend/auto-resume, warehouse sizing trade-offs, multi-cluster scaling, resource monitors, account usage views, anti-patterns, and chargeback."
      section="Snowflake — Module 14"
      readTime="65 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Cost Optimization', href: '/learn/snowflake/cost-optimization' },
      ]}
      prev={{ title: 'Performance Tuning', href: '/learn/snowflake/performance-tuning' }}
      next={{ title: 'Advanced Security and Governance', href: '/learn/snowflake/advanced-security-governance' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The plain-English idea" />
        <SectionTitle>Snowflake Cost Is Mostly a Compute Story</SectionTitle>
        <Para>
          Snowflake bills you for three broad things: compute (virtual warehouse credits), storage (the data
          you keep, priced per TB per month), and a small amount of cloud services compute for things like
          query compilation and metadata operations. For almost every team, compute credits dominate the bill.
          Storage is comparatively cheap and predictable; compute is the part that can quietly spiral because
          it is controlled by human decisions made every day — warehouse sizes, auto-suspend settings, query
          patterns, and how many warehouses exist.
        </Para>
        <Para>
          Cost optimization is not about being cheap for its own sake. It is about making sure the credits you
          spend are buying something — faster dashboards, fresher pipelines, more concurrent analysts — rather
          than paying for a warehouse that sat idle overnight, or a query that scanned ten times more data than
          it needed to.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Plain-English definition:</strong> credits are Snowflake's currency for compute. A
            warehouse burns credits every second it is running, whether or not it is doing useful work. Cost
            optimization means making sure warehouses run only when there is real work, sized only as large as
            the work actually needs, with guardrails that catch runaway spend before finance does.
          </Para>
        </HighlightBox>
        <CodeBox label="Mental model">{`Credits = electricity
Warehouse = a machine that consumes electricity while switched on
Warehouse size = how many appliances are plugged in (bigger = faster, costs more per second)
Auto-suspend = the light switch that turns the machine off when nobody is using it
Resource monitor = the circuit breaker that trips before the bill gets out of hand`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — How compute billing actually works" />
        <SectionTitle>Per-Second Billing With a 60-Second Minimum</SectionTitle>
        <Para>
          A virtual warehouse consumes credits only while it is in the "started" state. The moment it resumes,
          Snowflake begins charging. Billing is per-second, but every resume carries a 60-second minimum
          charge — even if the warehouse only ran a 2-second query before suspending again. This detail matters
          a lot for workloads that resume and suspend frequently: a warehouse that wakes up, runs one quick
          query, and goes back to sleep is still billed for a full minute each time.
        </Para>
        <Table
          headers={['Billing fact', 'What it means', 'Why it matters']}
          rows={[
            ['Per-second billing.', 'After the first 60 seconds, you pay only for seconds actually used.', 'Long-running warehouses are billed precisely, not rounded up hourly.'],
            ['60-second minimum per resume.', 'Every resume costs at least one minute of credits.', 'Frequent resume/suspend cycles for tiny queries add up.'],
            ['Credits consumed only while running.', 'A suspended warehouse costs nothing in compute credits.', 'Auto-suspend is the single biggest lever against idle waste.'],
            ['Credit price varies by cloud, region, and edition.', 'The same workload can cost more or less depending on account setup.', 'Compare warehouse credit consumption, not just row counts, when tuning.'],
            ['Storage billed separately.', 'Storage is a flat per-TB-per-month rate, independent of compute.', 'Do not confuse a big table with a big bill — it is usually the queries against it that cost money.'],
          ]}
        />
        <Callout title="Credits, not dollars, is the unit that matters">
          Snowflake meters everything in credits. The dollar cost of a credit depends on your contract, cloud
          provider, region, and edition. When you are optimizing, think in credits first — dollar conversion
          is a finance detail layered on top, and credit counts are portable across that conversation.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Auto-suspend and auto-resume" />
        <SectionTitle>The Single Biggest Lever Against Idle Waste</SectionTitle>
        <Para>
          A warehouse that stays resumed with nobody querying it is the most common way Snowflake accounts
          overspend. `AUTO_SUSPEND` tells Snowflake how many seconds of inactivity to wait before suspending the
          warehouse automatically. `AUTO_RESUME` tells Snowflake to wake the warehouse back up the instant a new
          query arrives. Together, they let a warehouse behave like it is "always on" from the user's
          perspective, while actually running — and billing — only when there is real work.
        </Para>
        <CodeBox label="Setting sane defaults">{`CREATE OR REPLACE WAREHOUSE WH_BI_S
  WAREHOUSE_SIZE = SMALL
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE
  INITIALLY_SUSPENDED = TRUE;

ALTER WAREHOUSE WH_ADHOC_ANALYST SET
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE;`}
        </CodeBox>
        <Table
          headers={['AUTO_SUSPEND setting', 'Effect', 'When it makes sense']}
          rows={[
            ['60 seconds.', 'Suspends almost immediately after the last query finishes.', 'Ad hoc analyst warehouses, dev/test warehouses, most BI warehouses.'],
            ['5–10 minutes.', 'Keeps the warehouse warm for a bursty sequence of queries.', 'Interactive dashboards where repeated resume/suspend cycles would waste the 60-second minimum.'],
            ['Hours (or left at a large default).', 'Warehouse rarely suspends during the business day.', 'Rarely correct — usually an accident, not a decision.'],
          ]}
        />
        <Callout title="A warehouse left running with AUTO_SUSPEND too high burns credits doing nothing" color="#ef4444">
          A warehouse with `AUTO_SUSPEND = 3600` that one analyst queries once in the morning will sit resumed
          for the rest of the hour, charging credits every second, even though no query is running. This is the
          single most common Snowflake cost bug, and it is invisible unless someone checks warehouse metering
          history. Audit every warehouse's `AUTO_SUSPEND` value; there is rarely a good reason for it to be
          more than a few minutes.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Warehouse sizing trade-offs" />
        <SectionTitle>Bigger Is Not Automatically More Expensive</SectionTitle>
        <Para>
          Each warehouse size doubles the compute — and doubles the credit consumption rate — of the size
          below it: XSMALL, SMALL, MEDIUM, LARGE, and so on. A LARGE warehouse burns roughly 8x the credits
          per second of an XSMALL warehouse. The intuitive conclusion is "bigger warehouses are more
          expensive," but that is only half the story. A bigger warehouse may finish the same query in a
          fraction of the time, so the real question is not "how much does this warehouse cost per second" but
          "how much does this warehouse cost to complete this query."
        </Para>
        <CodeBox label="Cost-per-query-completed, not just size">{`-- XSMALL warehouse: 1 credit/hour, query takes 8 minutes
-- Cost = 1 credit/hour * (8/60) hour ≈ 0.133 credits

-- MEDIUM warehouse (4x XSMALL rate): 4 credits/hour, same query takes 2.5 minutes
-- Cost = 4 credits/hour * (2.5/60) hour ≈ 0.167 credits

-- The bigger warehouse is only slightly more expensive here,
-- and it returns the result over 3x faster.
-- If this query blocks an analyst or a pipeline SLA, the bigger warehouse may be the cheaper real choice.`}
        </CodeBox>
        <Table
          headers={['Sizing mistake', 'What actually happens', 'Better approach']}
          rows={[
            ['Sizing down to "save money."', 'Query takes much longer; if it does not scale linearly, total cost can rise, and users wait.', 'Compare cost-per-completed-query at two or three sizes before deciding.'],
            ['Sizing up "just in case."', 'Warehouse costs more per second for work that did not need it, especially on small queries.', 'Size for the typical workload, not the rare worst case; use a separate larger warehouse for occasional heavy jobs.'],
            ['One shared warehouse for everything.', 'Small interactive queries queue behind a huge batch job, or a huge warehouse runs trivial queries at full price.', 'Split by workload: a small warehouse for BI, a right-sized warehouse for transforms, a larger one for heavy batch.'],
          ]}
        />
        <Callout title="The real optimization target">
          Do not optimize warehouse size in isolation. Optimize cost-per-query-completed for the workload that
          matters, and treat warehouse size as one input alongside query efficiency, clustering, and schedule.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Multi-cluster warehouses" />
        <SectionTitle>Multi-Cluster Warehouses Scale Concurrency, Not Query Speed</SectionTitle>
        <Para>
          A multi-cluster warehouse can automatically start additional clusters of the same size to absorb
          concurrent query load, and shut them back down when demand drops. This is a common point of
          confusion: people expect multi-cluster to make a single slow query run faster. It does not. Adding
          clusters does nothing for one query's execution time — each cluster is a separate copy of the same
          warehouse size, and one query only ever runs on one cluster.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Common confusion worth correcting directly:</strong> multi-cluster auto-scaling exists to
            handle many users running many queries at the same time without queuing — for example, forty
            analysts hitting a BI warehouse at 9am. If you have one slow query, the fix is warehouse size,
            query tuning, or clustering keys — not adding more clusters.
          </Para>
        </HighlightBox>
        <CodeBox label="Multi-cluster for concurrency, not speed">{`CREATE OR REPLACE WAREHOUSE WH_BI_MULTI
  WAREHOUSE_SIZE = SMALL
  MIN_CLUSTER_COUNT = 1
  MAX_CLUSTER_COUNT = 4
  SCALING_POLICY = STANDARD
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE;

-- When query queuing rises, Snowflake starts additional SMALL clusters.
-- Each cluster still runs at SMALL speed; you get more parallel capacity, not a faster single query.`}
        </CodeBox>
        <Table
          headers={['Symptom', 'Right fix', 'Wrong fix']}
          rows={[
            ['One query is slow.', 'Bigger warehouse size, better clustering, query rewrite.', 'Adding more clusters to a multi-cluster warehouse.'],
            ['Many concurrent users are queued.', 'Multi-cluster warehouse with a higher MAX_CLUSTER_COUNT.', 'Making the warehouse bigger (helps each query but not queuing directly).'],
            ['Occasional concurrency spikes at predictable times.', 'SCALING_POLICY = STANDARD with a modest MAX_CLUSTER_COUNT.', 'Permanently running a huge single-cluster warehouse to absorb rare spikes.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Resource monitors" />
        <SectionTitle>Resource Monitors Are Guardrails, Not Optimization</SectionTitle>
        <Para>
          A resource monitor tracks credit usage against a quota over a defined frequency (daily, weekly,
          monthly, or never-reset) and fires actions when usage crosses percentage thresholds. Resource
          monitors do not make anything cheaper by themselves — they exist to stop a runaway situation before
          it becomes a surprise bill: a broken loop, a forgotten warehouse, or an unexpectedly expensive
          backfill.
        </Para>
        <CodeBox label="Resource monitor syntax">{`CREATE OR REPLACE RESOURCE MONITOR BI_MONTHLY_MONITOR
  WITH
    CREDIT_QUOTA = 500
    FREQUENCY = MONTHLY
    START_TIMESTAMP = IMMEDIATELY
  TRIGGERS
    ON 75 PERCENT DO NOTIFY
    ON 90 PERCENT DO NOTIFY
    ON 100 PERCENT DO SUSPEND
    ON 110 PERCENT DO SUSPEND_IMMEDIATE;

ALTER WAREHOUSE WH_BI_S SET RESOURCE_MONITOR = BI_MONTHLY_MONITOR;`}
        </CodeBox>
        <Table
          headers={['Trigger action', 'Behavior', 'Use for']}
          rows={[
            ['DO NOTIFY', 'Sends an alert; warehouses keep running.', 'Early warning at 75–90% so someone can investigate before a hard stop.'],
            ['DO SUSPEND', 'Lets running queries finish, then suspends the warehouse and blocks new queries.', 'Soft limit — a firm quota that still respects in-flight work.'],
            ['DO SUSPEND_IMMEDIATE', 'Cancels running queries and suspends immediately.', 'Hard limit for a true budget ceiling, accepting that in-flight work is interrupted.'],
          ]}
        />
        <Callout title="A monitor can be attached to one or many warehouses">
          A single resource monitor can govern several warehouses, or an account-level monitor can cap total
          account spend. Scope monitors the way you scope budgets: per team, per environment, or per critical
          workload, so a breach points at an owner.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Finding waste with account usage views" />
        <SectionTitle>QUERY_HISTORY and WAREHOUSE_METERING_HISTORY Are Your First Stop</SectionTitle>
        <Para>
          Snowflake exposes account usage views under the `SNOWFLAKE.ACCOUNT_USAGE` schema. Two are essential
          for cost investigation: `WAREHOUSE_METERING_HISTORY` shows credits consumed per warehouse over time,
          and `QUERY_HISTORY` shows every query's warehouse, duration, bytes scanned, and whether it was
          queued. Together they answer "which warehouse is expensive" and "which queries inside it are the
          reason."
        </Para>
        <CodeBox label="Top credit-consuming warehouses this month">{`SELECT
  warehouse_name,
  SUM(credits_used) AS total_credits,
  SUM(credits_used_compute) AS compute_credits,
  SUM(credits_used_cloud_services) AS cloud_services_credits
FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
WHERE start_time >= DATEADD(month, -1, CURRENT_TIMESTAMP())
GROUP BY warehouse_name
ORDER BY total_credits DESC;`}
        </CodeBox>
        <CodeBox label="Longest and heaviest queries on a warehouse">{`SELECT
  query_id,
  user_name,
  warehouse_name,
  total_elapsed_time / 1000 AS elapsed_seconds,
  bytes_scanned / POWER(1024, 3) AS gb_scanned,
  execution_status,
  query_text
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE warehouse_name = 'WH_TRANSFORM_M'
  AND start_time >= DATEADD(day, -7, CURRENT_TIMESTAMP())
ORDER BY total_elapsed_time DESC
LIMIT 25;`}
        </CodeBox>
        <Table
          headers={['View', 'What it shows', 'Question it answers']}
          rows={[
            ['WAREHOUSE_METERING_HISTORY', 'Credits consumed per warehouse per hour.', 'Which warehouse is burning the most credits, and when?'],
            ['QUERY_HISTORY', 'Per-query duration, bytes scanned, queuing, warehouse.', 'Which specific queries are expensive or wasteful?'],
            ['WAREHOUSE_LOAD_HISTORY', 'Queued vs. running query load over time.', 'Is a warehouse undersized for its concurrency?'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Common cost anti-patterns" />
        <SectionTitle>The Same Mistakes Show Up in Almost Every Account</SectionTitle>
        <Para>
          Cost problems are rarely exotic. The same handful of patterns explain most unnecessary spend, and
          each one is easy to spot once you know to look for it.
        </Para>
        <Callout title="Watch for these" color="#ef4444">
          <BulletList
            items={[
              'A warehouse sized way bigger than needed "just in case," running trivial queries at LARGE prices.',
              'SELECT * on huge tables when the query only needs a handful of columns — Snowflake still has to scan and transfer every selected column.',
              'Forgetting to suspend dev/test warehouses, which sit resumed all day for occasional use.',
              'Unnecessarily high target lag on dynamic tables, which forces near-constant background refresh compute even when the business only needs hourly freshness.',
              'Dashboards that auto-refresh every minute regardless of whether anyone is viewing them.',
              'No owner for a shared warehouse, so nobody notices when its AUTO_SUSPEND or size drifts.',
              'Running the same expensive transformation in multiple pipelines because nobody realized it already existed.',
            ]}
          />
        </Callout>
        <CodeBox label="SELECT * vs. targeted columns">{`-- Wasteful: scans and returns every column on a 400-column event table
SELECT * FROM RAW.EVENTS WHERE event_date = CURRENT_DATE();

-- Better: only the columns the report actually needs
SELECT event_id, event_type, occurred_at, user_id
FROM RAW.EVENTS
WHERE event_date = CURRENT_DATE();`}
        </CodeBox>
        <CodeBox label="Dynamic table target lag and cost">{`-- Refreshes almost continuously — appropriate only if the business truly needs near-real-time freshness
CREATE OR REPLACE DYNAMIC TABLE GOLD.LIVE_ORDERS
  TARGET_LAG = '1 minute'
  WAREHOUSE = WH_TRANSFORM_M
AS SELECT * FROM SILVER.ORDERS;

-- Same table, appropriate lag for an hourly dashboard — far less background compute
CREATE OR REPLACE DYNAMIC TABLE GOLD.HOURLY_ORDERS
  TARGET_LAG = '1 hour'
  WAREHOUSE = WH_TRANSFORM_M
AS SELECT * FROM SILVER.ORDERS;`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Query design and cost" />
        <SectionTitle>Query Efficiency Is a Cost Lever, Not Just a Performance One</SectionTitle>
        <Para>
          Every second a warehouse spends scanning unnecessary data is a second of billed credits. Pruning
          via clustering keys, filtering early, avoiding unnecessary joins before aggregation, and using
          result caching for repeated identical queries all reduce the compute-seconds a query consumes —
          which is the same thing as reducing its cost.
        </Para>
        <Table
          headers={['Technique', 'Cost effect', 'Notes']}
          rows={[
            ['Result cache reuse.', 'Repeated identical queries can return from cache with no warehouse required.', 'Cache is per-account and expires after a period of inactivity or underlying data change.'],
            ['Partition pruning via clustering.', 'Fewer micro-partitions scanned per query.', 'Only worth the maintenance overhead for very large, frequently filtered tables.'],
            ['Filtering before joining.', 'Reduces rows carried through expensive join steps.', 'Push WHERE clauses as early as possible in the query plan.'],
            ['Materializing expensive intermediate results.', 'Avoids recomputing the same heavy aggregation repeatedly.', 'Trade storage and freshness lag for saved compute.'],
          ]}
        />
        <Callout title="Cheap queries compound">
          A single query that scans 10x too much data might cost fractions of a credit. Run it every five
          minutes for a year across a dashboard used by fifty people, and that fraction becomes a real line
          item. Query efficiency reviews are worth doing on your highest-frequency queries first.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Workload isolation" />
        <SectionTitle>Separate Warehouses by Workload, Not Just by Team</SectionTitle>
        <Para>
          Sharing one warehouse across loading, transformation, ad hoc analysis, and BI dashboards is a common
          early-stage shortcut that becomes expensive later. A heavy nightly transform can keep a warehouse
          resumed and large all day, and every small BI query riding along pays the same size's credit rate.
          Splitting by workload lets each warehouse be sized, scheduled, and monitored for what it actually
          does.
        </Para>
        <CodeBox label="Workload-isolated warehouse layout">{`WH_LOAD_XS       -- ingestion, small and frequent
WH_TRANSFORM_M    -- scheduled dbt/task merges, sized for batch work
WH_BI_S           -- dashboards and BI tools, short auto-suspend
WH_ADHOC_ANALYST  -- exploratory analyst queries, short auto-suspend
WH_HEAVY_BACKFILL -- occasional large backfills, resumed only when needed`}
        </CodeBox>
        <Table
          headers={['Benefit of isolation', 'Why it saves money']}
          rows={[
            ['Right-sized warehouses per workload.', 'A dashboard warehouse does not pay LARGE prices for a batch job it never runs.'],
            ['Clear cost attribution.', 'Metering history maps directly to a workload, not a blended mystery number.'],
            ['Independent auto-suspend tuning.', 'BI warehouses can suspend in 60 seconds; batch warehouses can stay warm longer if that is cheaper overall.'],
            ['No noisy-neighbor queuing.', 'A heavy backfill does not force a dashboard warehouse to scale out just to keep up.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Storage costs" />
        <SectionTitle>Storage Is Usually the Smaller Line Item, But Not Always Negligible</SectionTitle>
        <Para>
          Storage is billed per TB per month, calculated on compressed data, and includes Time Travel and
          Fail-safe retained data in addition to active table storage. For most analytics workloads, compute
          dominates the bill, but storage can become significant with very large historical tables, aggressive
          Time Travel retention on frequently rewritten tables, or many redundant clones and staging copies
          that never get cleaned up.
        </Para>
        <Table
          headers={['Storage cost driver', 'Why it adds up', 'Mitigation']}
          rows={[
            ['Long Time Travel retention on high-churn tables.', 'Every changed micro-partition is retained for the full retention window.', 'Lower DATA_RETENTION_TIME_IN_DAYS on staging/scratch tables that do not need long history.'],
            ['Forgotten zero-copy clones.', 'Clones share storage with the source until data diverges, but diverging data still adds up.', 'Periodically audit and drop unused clones.'],
            ['Unused or duplicate tables.', 'Old pipeline versions or one-off exports left in place.', 'Regular schema audits; drop what nothing reads.'],
            ['Fail-safe on large mutable tables.', 'A fixed extra 7-day retention window on top of Time Travel for permanent tables.', 'Use TRANSIENT tables for data that does not need Fail-safe protection.'],
          ]}
        />
        <Callout title="Do not optimize storage pennies while compute dollars burn">
          It is tempting to focus on storage because it is easy to see in a dashboard as a single growing
          number. For most accounts, an hour spent right-sizing a warehouse or fixing auto-suspend saves far
          more than an hour spent shrinking storage retention. Check compute first.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Chargeback and showback" />
        <SectionTitle>Attribute Cost to Teams So Someone Is Accountable</SectionTitle>
        <Para>
          Cost optimization tends to stall when nobody owns the number. Chargeback (billing a team's budget
          for its actual usage) and showback (simply reporting usage per team without moving money) both rely
          on the same mechanism: tagging warehouses, and sometimes individual queries or sessions, so
          consumption can be grouped by team, environment, or project.
        </Para>
        <CodeBox label="Tagging warehouses for attribution">{`CREATE TAG IF NOT EXISTS COST_CENTER;
CREATE TAG IF NOT EXISTS TEAM_OWNER;

ALTER WAREHOUSE WH_TRANSFORM_M SET TAG COST_CENTER = 'DATA_ENGINEERING';
ALTER WAREHOUSE WH_TRANSFORM_M SET TAG TEAM_OWNER = 'analytics-eng';

ALTER WAREHOUSE WH_BI_S SET TAG COST_CENTER = 'BI_AND_REPORTING';
ALTER WAREHOUSE WH_BI_S SET TAG TEAM_OWNER = 'business-intelligence';`}
        </CodeBox>
        <CodeBox label="Per-warehouse cost report using metering history plus tags">{`SELECT
  wmh.warehouse_name,
  SUM(wmh.credits_used) AS total_credits,
  ANY_VALUE(t.tag_value) AS cost_center
FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY wmh
LEFT JOIN SNOWFLAKE.ACCOUNT_USAGE.TAG_REFERENCES t
  ON t.object_name = wmh.warehouse_name
  AND t.tag_name = 'COST_CENTER'
WHERE wmh.start_time >= DATEADD(month, -1, CURRENT_TIMESTAMP())
GROUP BY wmh.warehouse_name
ORDER BY total_credits DESC;`}
        </CodeBox>
        <Table
          headers={['Pattern', 'What it does', 'When to use']}
          rows={[
            ['Showback', 'Reports usage per team without moving budget.', 'Early stage — build visibility and habits before enforcing budgets.'],
            ['Chargeback', 'Bills a team\'s cost center for its actual usage.', 'Mature organizations where teams control their own warehouse decisions.'],
            ['Per-warehouse tagging.', 'Simplest attribution — one warehouse, one owner, one tag.', 'Most teams; works well when workloads are already isolated by warehouse.'],
            ['Query-level attribution via QUERY_TAG.', 'Attributes cost within a shared warehouse by session or job.', 'When workloads must share a warehouse but still need per-project cost visibility.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Edition and tier cost differences" />
        <SectionTitle>Your Account Edition Sets the Price Floor Before You Optimize Anything</SectionTitle>
        <Para>
          Everything covered so far — auto-suspend, sizing, multi-cluster, resource monitors, query
          efficiency — happens inside a given account edition. But the edition itself is a cost decision made
          once, upstream of all of that, and it changes the credit price for every warehouse in the account.
          Snowflake sells four editions — Standard, Enterprise, Business Critical, and Virtual Private
          Snowflake (VPS) — and each step up adds real capability, at a real price increase per credit.
        </Para>
        <Table
          headers={['Edition', 'What it adds over the tier below', 'Typical fit']}
          rows={[
            ['Standard', 'Core Snowflake: storage/compute separation, standard warehouses, basic Time Travel (1 day), standard security.', 'Small teams, early-stage projects, workloads without compliance requirements.'],
            ['Enterprise', 'Multi-cluster warehouses, up to 90 days of Time Travel, materialized views, column-level security (dynamic data masking, row access policies).', 'Most mid-size and larger data teams — this is where multi-cluster concurrency scaling, covered in Part 05, actually becomes available.'],
            ['Business Critical', 'Everything in Enterprise, plus HIPAA/PCI-DSS-eligible compliance support, customer-managed encryption keys (Tri-Secret Secure), and stronger network/failover controls.', 'Healthcare, finance, and other regulated workloads that must meet a specific compliance standard.'],
            ['Virtual Private Snowflake (VPS)', 'A fully isolated Snowflake deployment, separate from the multi-tenant service used by every other edition.', 'The most security-sensitive organizations — rare, and priced accordingly.'],
          ]}
        />
        <Callout title="Multi-cluster warehouses require Enterprise or above" color="#ef4444">
          This connects directly back to Part 05: <code>MAX_CLUSTER_COUNT &gt; 1</code> is an Enterprise-and-
          above feature. A Standard-edition account cannot scale out for concurrency at all, no matter how the
          warehouse is configured — the only lever available on Standard is warehouse size and workload
          isolation across separate single-cluster warehouses.
        </Callout>
        <Para>
          The edition decision affects the credit price itself, not just which features exist. Higher editions
          cost more per credit — commonly cited industry figures put Enterprise around 1.5x the Standard
          credit price, and Business Critical higher still — so the same warehouse running the same workload
          for the same number of seconds costs more on a higher edition. This is why "just use Business
          Critical everywhere to be safe" is a real cost anti-pattern: paying the compliance premium on every
          warehouse in the account, including ones that touch no regulated data at all, inflates every single
          credit consumed anywhere in Parts 02 through 12 above.
        </Para>
        <Table
          headers={['Decision', 'Why it matters for cost']}
          rows={[
            ['Choosing Enterprise only because you want multi-cluster.', 'Reasonable — but confirm you actually have a concurrency problem (Part 05) before paying the higher per-credit rate account-wide.'],
            ['Choosing Business Critical for one regulated dataset.', 'Consider whether that dataset can live in an isolated account of its own rather than raising the credit price for every other workload.'],
            ['Staying on Standard indefinitely to save on credit price.', 'Can backfire if it forces workarounds — like running many single-cluster warehouses to fake concurrency scaling — that cost more in total than the Enterprise premium would have.'],
          ]}
        />
        <Para>
          Time Travel retention is another place edition quietly interacts with cost. Standard caps
          <code> DATA_RETENTION_TIME_IN_DAYS</code> at 1 day; Enterprise and above allow up to 90 days on
          permanent tables. Longer retention is valuable for recovering from mistakes, but it is also a
          storage cost lever from Part 11 — every changed micro-partition on a high-churn table is kept for
          the full window you configure, up to whatever your edition allows. An Enterprise account that
          defaults every table to 90-day retention "because it's available" pays for a lot of Time Travel
          storage nobody will ever query.
        </Para>
        <CodeBox label="Setting retention deliberately, not by edition default">{`-- A frequently-rewritten staging table: short retention is enough, regardless of edition ceiling
ALTER TABLE STAGING.RAW_EVENTS SET DATA_RETENTION_TIME_IN_DAYS = 1;

-- A financially important table where a longer recovery window is worth the storage cost
ALTER TABLE GOLD.DAILY_REVENUE SET DATA_RETENTION_TIME_IN_DAYS = 30;`}
        </CodeBox>
        <Para>
          The same logic applies to Business Critical's other headline features, like customer-managed
          encryption keys. These are real, valuable controls for the workload that actually needs them, but
          they are account-level settings once enabled — you cannot selectively apply Business Critical
          encryption to one schema while leaving the rest of the account on Enterprise pricing. That
          all-or-nothing property is exactly why the scoping question above (which data actually needs this?)
          has to be asked before the upgrade, not after the first invoice arrives.
        </Para>
        <Table
          headers={['Feature', 'Granularity it actually offers', 'Implication for cost scoping']}
          rows={[
            ['Multi-cluster warehouses (Enterprise+)', 'Per warehouse — only warehouses you configure with MAX_CLUSTER_COUNT > 1 scale out.', 'You can enable it selectively per warehouse without touching others.'],
            ['Extended Time Travel (Enterprise+)', 'Per table via DATA_RETENTION_TIME_IN_DAYS.', 'Selective — set it high only on tables that truly need the longer recovery window.'],
            ['Customer-managed keys / compliance controls (Business Critical)', 'Account-wide once the edition is set.', 'Not selective — the edition premium applies to every warehouse in the account regardless of use.'],
          ]}
        />
        <Callout title="Edition is an org-level decision, revisit it like one">
          Most engineers never choose the account edition — it is usually set once, early, by whoever
          provisioned the account, and then forgotten. When you are diagnosing a cost spike or reviewing an
          annual contract, it is worth asking explicitly which edition the account is on and whether every
          workload on it actually needs what that edition costs — not just tuning the warehouses running
          inside it.
        </Callout>
        <Para>
          A useful mental exercise before ever raising an edition is separating "features we would use" from
          "features that justify the price everywhere." A team that wants Enterprise purely for multi-cluster
          warehouses on one BI workload does not need the whole account upgraded to Enterprise pricing if
          Snowflake's account structure allows isolating that workload — the real question to bring to a
          platform or finance conversation is which workloads specifically require the higher tier, not
          whether the organization overall might someday benefit from it.
        </Para>
        <Table
          headers={['Question to ask before upgrading edition', 'Why it matters']}
          rows={[
            ['Which specific feature do we need — multi-cluster, longer Time Travel, or a compliance control?', 'Each maps to a different edition threshold; naming the feature avoids paying for the whole bundle by accident.'],
            ['Which warehouses or workloads actually need that feature?', 'An account-wide upgrade raises the credit price for every warehouse, including ones that never touch the feature.'],
            ['Could isolating the workload into its own account avoid raising the price for everything else?', 'Sometimes cheaper overall, though it trades off centralized governance and cross-account query convenience.'],
            ['Have we measured the actual concurrency or compliance need, or are we guessing "just in case"?', 'The same "size for measured need, not imagined worst case" discipline from Part 04 applies to edition choice too.'],
          ]}
        />
        <Callout title="Compliance is not optional, but scope it precisely">
          Business Critical is not a "nice to have" tier when a regulator genuinely requires HIPAA- or
          PCI-eligible controls — in that case the premium is simply the cost of being allowed to operate at
          all. The optimization opportunity is in scoping which data and which warehouses actually fall under
          that requirement, rather than defaulting every workload in the account to the highest tier because
          one dataset needs it. Treat the edition decision the same way you would treat a warehouse size
          decision: name the specific requirement, measure it, and choose the smallest tier that satisfies it.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Worked example: diagnosing a cost spike" />
        <SectionTitle>Walking Through a Real Investigation</SectionTitle>
        <Para>
          Suppose finance flags that this month's Snowflake bill is 40% higher than last month. Here is the
          investigation, step by step, using only account usage views.
        </Para>
        <CodeBox label="Step 1 — which warehouse grew?">{`SELECT
  warehouse_name,
  DATE_TRUNC('month', start_time) AS month,
  SUM(credits_used) AS total_credits
FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
WHERE start_time >= DATEADD(month, -2, CURRENT_TIMESTAMP())
GROUP BY warehouse_name, month
ORDER BY warehouse_name, month;

-- Result: WH_TRANSFORM_M jumped from 320 credits to 610 credits month over month.`}
        </CodeBox>
        <CodeBox label="Step 2 — what changed inside that warehouse?">{`SELECT
  DATE_TRUNC('day', start_time) AS day,
  COUNT(*) AS query_count,
  SUM(total_elapsed_time) / 1000 / 60 AS total_minutes,
  AVG(bytes_scanned) / POWER(1024, 3) AS avg_gb_scanned
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE warehouse_name = 'WH_TRANSFORM_M'
  AND start_time >= DATEADD(month, -1, CURRENT_TIMESTAMP())
GROUP BY day
ORDER BY day;

-- Result: avg_gb_scanned roughly doubled starting on the 14th.`}
        </CodeBox>
        <CodeBox label="Step 3 — find the specific query">{`SELECT
  query_id,
  query_text,
  bytes_scanned / POWER(1024, 3) AS gb_scanned,
  total_elapsed_time / 1000 AS elapsed_seconds,
  start_time
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE warehouse_name = 'WH_TRANSFORM_M'
  AND start_time >= '2026-08-14'
ORDER BY bytes_scanned DESC
LIMIT 10;

-- Result: a dynamic table's TARGET_LAG was tightened from '1 hour' to '5 minute'
-- during a deploy on the 14th, so it refreshes far more often for no business reason.`}
        </CodeBox>
        <Para>
          The fix in this scenario: revert the target lag to match the actual business SLA, add a resource
          monitor on `WH_TRANSFORM_M` so the next unreviewed change trips an alert at 75% of the historical
          baseline, and tag the warehouse so the owning team sees this in their own showback report going
          forward.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — Hands-on lab" />
        <SectionTitle>Hands-On Lab: Build Cost Guardrails for a Warehouse</SectionTitle>
        <Para>
          This lab creates a warehouse with proper auto-suspend, attaches a resource monitor, tags it for
          attribution, and writes the queries you would actually run to check it.
        </Para>
        <CodeBox label="Lab setup">{`USE ROLE SYSADMIN;

CREATE OR REPLACE WAREHOUSE WH_COST_LAB
  WAREHOUSE_SIZE = XSMALL
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE
  INITIALLY_SUSPENDED = TRUE;

CREATE TAG IF NOT EXISTS COST_CENTER;
ALTER WAREHOUSE WH_COST_LAB SET TAG COST_CENTER = 'COST_LAB_TEAM';

CREATE OR REPLACE RESOURCE MONITOR COST_LAB_MONITOR
  WITH
    CREDIT_QUOTA = 10
    FREQUENCY = MONTHLY
    START_TIMESTAMP = IMMEDIATELY
  TRIGGERS
    ON 75 PERCENT DO NOTIFY
    ON 100 PERCENT DO SUSPEND;

ALTER WAREHOUSE WH_COST_LAB SET RESOURCE_MONITOR = COST_LAB_MONITOR;`}
        </CodeBox>
        <CodeBox label="Lab investigation queries">{`-- Run a few queries, wait for them to complete, then check consumption
SELECT warehouse_name, SUM(credits_used) AS credits
FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
WHERE warehouse_name = 'WH_COST_LAB'
GROUP BY warehouse_name;

SHOW RESOURCE MONITORS LIKE 'COST_LAB_MONITOR';
SHOW WAREHOUSES LIKE 'WH_COST_LAB';`}
        </CodeBox>
        <SubTitle>Lab questions</SubTitle>
        <BulletList
          items={[
            'If AUTO_SUSPEND were set to 3600 instead of 60, what would happen to credit consumption between queries?',
            'What triggers would you add if this warehouse needed a hard stop instead of just a notification at 100%?',
            'How would you find out whether this warehouse needs a bigger size instead of just tighter auto-suspend?',
            'How would you attribute this warehouse\'s cost to a specific team in a monthly report?',
            'If WAREHOUSE_METERING_HISTORY showed a spike, what is the next view you would query to find the cause?',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 16 — Interview answer" />
        <SectionTitle>How to Explain Snowflake Cost Optimization in an Interview</SectionTitle>
        <Para>
          A strong answer sounds like this: Snowflake compute is billed per-second with a 60-second minimum
          per resume, and only while a warehouse is running, so `AUTO_SUSPEND` and `AUTO_RESUME` are the first
          lever against idle waste. Warehouse sizing is a trade-off, not a pure cost knob — I evaluate
          cost-per-completed-query, not just credits-per-second, since a bigger warehouse that finishes faster
          can be cheaper overall. Multi-cluster warehouses scale for concurrent query load, not for making one
          query faster — that is a common misunderstanding worth correcting. Resource monitors give hard and
          soft guardrails using `CREDIT_QUOTA` and `TRIGGERS`. I would investigate cost spikes using
          `WAREHOUSE_METERING_HISTORY` to find which warehouse changed, and `QUERY_HISTORY` to find which
          queries inside it are responsible. Common anti-patterns are oversized "just in case" warehouses,
          `SELECT *` on wide tables, forgetting to suspend dev warehouses, and dynamic tables set to an
          unnecessarily tight target lag. Finally, cost needs an owner: tagging warehouses for chargeback or
          showback turns a vague bill into something a specific team can act on.
        </Para>
        <SubTitle>Questions you should answer out loud</SubTitle>
        <BulletList
          items={[
            'How is Snowflake compute billed, and what is the 60-second minimum?',
            'What is the single biggest lever against idle-warehouse waste?',
            'Why is a bigger warehouse not automatically a more expensive choice?',
            'What is the common confusion about multi-cluster warehouses, and what do they actually scale?',
            'What syntax and thresholds does a resource monitor use, and what is the difference between SUSPEND and SUSPEND_IMMEDIATE?',
            'Which account usage views would you query first to diagnose a cost spike?',
            'Name three cost anti-patterns and how you would catch each one.',
            'How would you set up chargeback or showback for a team?',
            'What does the Snowflake edition (Standard/Enterprise/Business Critical) actually control, and why does it affect cost account-wide?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'Compute is billed per-second with a 60-second minimum per resume, and only while a warehouse is running — storage is billed separately and usually smaller.',
          'AUTO_SUSPEND and AUTO_RESUME are the single biggest lever against idle-warehouse waste; audit every warehouse\'s AUTO_SUSPEND value.',
          'The real optimization target is cost-per-completed-query, not warehouse size alone — a bigger warehouse can be the cheaper choice.',
          'Multi-cluster warehouses scale out for concurrent query load, not to make one query run faster.',
          'Resource monitors (CREDIT_QUOTA, TRIGGERS, NOTIFY/SUSPEND/SUSPEND_IMMEDIATE) are guardrails against runaway spend, not optimizations by themselves.',
          'WAREHOUSE_METERING_HISTORY and QUERY_HISTORY are the first two account usage views to check when investigating a cost spike.',
          'Common anti-patterns: oversized "just in case" warehouses, SELECT * on wide tables, forgotten dev/test warehouses, and unnecessarily tight dynamic table target lag.',
          'Tagging warehouses for chargeback or showback gives cost an owner, which is usually the difference between a report and an actual fix.',
          'Account edition (Standard/Enterprise/Business Critical/VPS) sets the credit price for every warehouse in the account, and gates features like multi-cluster warehouses (Enterprise+) and compliance controls (Business Critical+) — choose it deliberately, not by default to "be safe".',
        ]}
      />
    </LearnLayout>
  )
}
