import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function SnowflakeArchitecture() {
  return (
    <LearnLayout
      title="Snowflake Architecture"
      description="Storage, virtual warehouses, cloud services, micro-partitions, warehouse sizing, the three caches, and why Snowflake scales reads and writes independently."
      section="Snowflake — Module 02"
      readTime="75 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Architecture', href: '/learn/snowflake/architecture' },
      ]}
      prev={{ title: 'What is Snowflake?', href: '/learn/snowflake/what-is-snowflake' }}
      next={{ title: 'Setup and SQL Basics', href: '/learn/snowflake/setup-and-sql-basics' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Three-layer architecture" />
        <SectionTitle>Snowflake Has Storage, Compute, and Cloud Services</SectionTitle>
        <Para>
          Snowflake's architecture is usually described as three layers. The storage layer holds data. The
          compute layer runs queries through virtual warehouses. The cloud services layer coordinates
          metadata, optimization, access control, transactions, and query planning. This split is the
          foundation for nearly every Snowflake feature you use.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Plain-English definition:</strong> think of the three layers as a warehouse building
            (storage), the workers who fetch and process boxes inside it (compute), and the office staff who
            know where everything is, who is allowed in, and how to route each request (cloud services). The
            building does not move when you hire more workers, and workers do not need to know where anything
            physically sits — the office staff handle that.
          </Para>
        </HighlightBox>
        <Table
          headers={['Layer', 'What it does', 'What can go wrong']}
          rows={[
            ['Storage', 'Stores compressed columnar data and metadata in cloud object storage.', 'Bad retention, large unmodeled tables, poor data lifecycle, sensitive clones.'],
            ['Compute', 'Virtual warehouses execute SQL, loads, transformations, and some maintenance.', 'Over-sized warehouses, warehouses left running, workload contention.'],
            ['Cloud services', 'Optimizer, metadata, auth, governance, transactions, query compilation.', 'Bad grants, metadata-heavy anti-patterns, account-level governance gaps.'],
          ]}
        />
        <CodeBox label="Architecture mental model">{`Shared storage:
  RAW.ORDERS
  SILVER.ORDERS
  GOLD.DAILY_REVENUE

Independent compute:
  WH_LOAD_XS      -> file loads
  WH_TRANSFORM_M  -> dbt / ELT
  WH_BI_S         -> dashboard queries
  WH_ADHOC_XS     -> analyst exploration

Cloud services:
  SQL parser + optimizer
  metadata catalog
  access control
  transaction manager
  query history`}
        </CodeBox>
        <Callout title="Read reads and writes independently">
          Because these layers are decoupled, Snowflake can scale reads (add more BI warehouses) and writes
          (add more loading/transform warehouses) completely independently of each other, and independently
          of how much data is stored — a theme this whole module keeps coming back to.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Storage layer" />
        <SectionTitle>The Storage Layer Owns the Data, Not Any Warehouse</SectionTitle>
        <Para>
          When you load data into Snowflake, it is stored in Snowflake's own managed cloud storage —
          conceptually similar to object storage like S3, though you never interact with it directly the way
          you would with an S3 bucket. Snowflake compresses the data, organizes it into micro-partitions
          (covered in Part 04), and tracks metadata about it. This storage exists independently of any
          virtual warehouse. If every warehouse in your account were dropped and recreated tomorrow, the
          stored data itself would be untouched — warehouses are temporary compute that attaches to durable
          storage, not the other way around.
        </Para>
        <Para>
          This is the practical meaning of "storage and compute are separated": data does not live inside a
          warehouse, and a warehouse does not own any data. Any warehouse with the right access privileges can
          read or write any table in the account, because the table lives in shared storage, not inside a
          particular compute cluster.
        </Para>
        <Table
          headers={['Traditional coupled model', 'Snowflake decoupled model']}
          rows={[
            ['Data lives on the same disks as the compute that serves it.', 'Data lives in independent managed storage.'],
            ['Adding compute usually means adding a bigger or additional machine that also holds data.', 'Adding compute means spinning up a warehouse that attaches to existing storage.'],
            ['One workload\'s heavy query can degrade another workload sharing the same disks/CPU.', 'Separate warehouses read the same storage with zero contention between them.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Virtual warehouses" />
        <SectionTitle>Virtual Warehouses Are Independent Compute Clusters, Not Data Containers</SectionTitle>
        <Para>
          A virtual warehouse is the compute engine that runs SQL — it is a cluster of compute resources
          Snowflake provisions for you on demand. It is not where your tables live. You can query the same
          table from a small BI warehouse, a medium transformation warehouse, or a large backfill warehouse,
          and all three see the exact same data, because none of them own it.
        </Para>
        <Para>
          This is where storage/compute separation becomes concrete and pays off in production. A data
          loading job can run on one warehouse while analysts query the same tables from a different
          warehouse, at the same moment. The loading workload and the dashboard workload never compete for
          the same CPU, because they are running on entirely separate compute clusters. Multiple warehouses
          can query the same data simultaneously with zero contention between them — something that is
          structurally difficult on a single shared cluster.
        </Para>
        <Table
          headers={['Warehouse setting', 'Meaning', 'Production guidance']}
          rows={[
            ['WAREHOUSE_SIZE', 'Amount of compute per cluster.', 'Start small, scale based on measured query time and queueing.'],
            ['AUTO_SUSPEND', 'Seconds of inactivity before compute stops.', 'Use short values for learning/ad hoc warehouses.'],
            ['AUTO_RESUME', 'Start automatically when a query arrives.', 'Usually true for user-facing warehouses.'],
            ['MIN_CLUSTER_COUNT', 'Minimum clusters in multi-cluster mode.', 'Keep low unless concurrency requires more.'],
            ['MAX_CLUSTER_COUNT', 'Maximum clusters for concurrency scaling.', 'Useful for many simultaneous queries, not single-query speed.'],
          ]}
        />
        <CodeBox label="Warehouse examples">{`CREATE WAREHOUSE WH_BI_S
  WAREHOUSE_SIZE = SMALL
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE
  INITIALLY_SUSPENDED = TRUE;

CREATE WAREHOUSE WH_TRANSFORM_M
  WAREHOUSE_SIZE = MEDIUM
  AUTO_SUSPEND = 300
  AUTO_RESUME = TRUE
  INITIALLY_SUSPENDED = TRUE;

-- Same data, isolated compute, running at the same time:
USE WAREHOUSE WH_TRANSFORM_M;
MERGE INTO SILVER.ORDERS ...;

USE WAREHOUSE WH_BI_S;
SELECT SUM(total_usd) FROM SILVER.ORDERS WHERE order_date = CURRENT_DATE();`}
        </CodeBox>
        <Callout title="Scaling up vs scaling out">
          Increasing warehouse size (X-Small toward 6X-Large) helps a single heavy query get more compute per
          query — "scaling up." Multi-cluster warehouses help concurrency when many separate queries run at
          once by spinning up additional clusters of the same size — "scaling out." A slow single query is
          not fixed by adding more clusters, and high concurrency queueing is not fixed by making one cluster
          bigger. Do not confuse the two.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Warehouse sizing" />
        <SectionTitle>Warehouse Sizes Roughly Double Compute at Each Step</SectionTitle>
        <Para>
          Snowflake warehouse sizes run from X-Small through 6X-Large: X-Small, Small, Medium, Large,
          X-Large, 2X-Large, 3X-Large, 4X-Large, 5X-Large, 6X-Large. Each step up roughly doubles the compute
          resources available to the warehouse compared to the step below it, and roughly doubles the credit
          consumption rate per hour of runtime. A Medium warehouse is roughly twice the compute of a Small,
          and an X-Large is roughly twice a Large.
        </Para>
        <Table
          headers={['Size', 'Relative compute', 'Typical fit']}
          rows={[
            ['X-Small', '1x (baseline)', 'Learning, light ad hoc queries, small scheduled tasks.'],
            ['Small / Medium', '2x / 4x', 'Standard BI dashboards, routine dbt transform runs.'],
            ['Large / X-Large', '8x / 16x', 'Heavier transform jobs, larger concurrent BI workloads.'],
            ['2X-Large and above', '32x and up', 'Large backfills, heavy one-off historical reprocessing.'],
          ]}
        />
        <Para>
          Bigger is not automatically faster for every query. Doubling warehouse size only helps if the query
          can actually use the extra parallel compute — a query that is bottlenecked by scanning far more
          data than it needs (a missing filter, no pruning benefit, a bad join) will often just finish the
          same wasted work faster and more expensively on a bigger warehouse, rather than get fundamentally
          more efficient. This is why query design and micro-partition pruning (Part 05) usually matter more
          than warehouse size for cost efficiency.
        </Para>
        <Callout title="Size for the query, not for comfort" color="#ef4444">
          A common anti-pattern is defaulting every warehouse to Large "to be safe." This burns credits on
          queries that would run fine on an X-Small. Measure actual query time and queueing in query history
          before resizing up.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Micro-partitions" />
        <SectionTitle>Micro-Partitions Are the Physical Storage Unit Behind Snowflake Performance</SectionTitle>
        <Para>
          Snowflake automatically splits every table's data into micro-partitions: compressed, immutable
          chunks of roughly 50–100 MB of uncompressed data each. You do not create or manage micro-partitions
          yourself — Snowflake does this transparently as data is loaded. Each micro-partition stores its
          data in a columnar format, and Snowflake keeps metadata about each micro-partition, including the
          minimum and maximum value for every column within that chunk, along with counts and other
          statistics.
        </Para>
        <Para>
          That min/max metadata is what makes pruning possible. When a query filters on a column — say,
          <code> WHERE order_ts &gt;= '2026-09-01'</code> — Snowflake's cloud services layer can check each
          micro-partition's stored min/max range for that column before reading any actual data. If a
          micro-partition's date range cannot possibly contain a matching row, Snowflake skips it entirely
          without scanning it. Pruning is the reason a query can filter a table with billions of rows down to
          a fraction of a second of actual data scanned, without needing a traditional index at all.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Important:</strong> Snowflake does not rely on normal user-created B-tree indexes like
            PostgreSQL for typical analytical queries. The main performance story is columnar storage,
            automatic micro-partitioning, min/max metadata pruning, query optimization, caching, warehouse
            compute, and — for specific advanced cases — clustering keys or search optimization, which are
            covered in a later performance-tuning module rather than exhausted here.
          </Para>
        </HighlightBox>
        <CodeBox label="Pruning-friendly filters">{`-- Better for pruning: Snowflake can compare '2026-09-01' directly
-- against each micro-partition's stored min/max for order_ts.
SELECT *
FROM SILVER.ORDERS
WHERE order_ts >= '2026-09-01'
  AND order_ts <  '2026-10-01';

-- Often worse because the filter wraps the column in a function:
-- Snowflake would need to evaluate DATE_TRUNC per row/partition
-- rather than compare stored min/max ranges directly.
SELECT *
FROM SILVER.ORDERS
WHERE DATE_TRUNC('month', order_ts) = '2026-09-01';`}
        </CodeBox>
        <Table
          headers={['Micro-partition property', 'Why it matters']}
          rows={[
            ['Immutable', 'An UPDATE or DELETE does not edit bytes in place; Snowflake writes new micro-partitions and marks old ones inactive — this is also what powers Time Travel.'],
            ['~50–100 MB uncompressed each', 'Small enough for fine-grained pruning, large enough to keep metadata overhead manageable.'],
            ['Columnar within each partition', 'A query touching 3 of 40 columns can skip reading the other 37 entirely.'],
            ['Automatic', 'No manual partitioning scheme to design or maintain, unlike traditional partitioned tables.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Cloud services layer" />
        <SectionTitle>The Cloud Services Layer Is the Brain Coordinating Everything</SectionTitle>
        <Para>
          The cloud services layer is a set of Snowflake-managed services that sit above storage and compute
          and coordinate the whole platform. It is not a warehouse you size or pay for directly the way you
          pay for virtual warehouse compute — it is the always-on coordination layer that makes the other two
          layers work correctly together.
        </Para>
        <Table
          headers={['Cloud services job', 'What it actually does']}
          rows={[
            ['Query optimization', 'Parses SQL, builds an execution plan, decides which micro-partitions can be pruned before any warehouse touches data.'],
            ['Metadata management', 'Tracks table structure, micro-partition statistics, table history for Time Travel, and object definitions.'],
            ['Security and authentication', 'Handles login, role-based access control, grants, and enforces who can see or touch which objects.'],
            ['Result caching', 'Stores the result of a completed query so an identical later query can be served without using warehouse compute at all.'],
            ['Transaction management', 'Coordinates ACID transaction guarantees across the platform.'],
            ['Infrastructure management', 'Provisions and manages the underlying compute resources behind virtual warehouses.'],
          ]}
        />
        <Para>
          Because query optimization and metadata live in cloud services rather than inside any one
          warehouse, a warehouse does not need to "learn" a table's structure from scratch — the plan and the
          pruning decisions are already informed by metadata cloud services maintains centrally. This is also
          why suspending and resuming a warehouse is cheap and fast: the warehouse is disposable compute, but
          the metadata and query intelligence about your data persist outside of it.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — The three caches" />
        <SectionTitle>Snowflake Has Three Distinct Caches — Know What Each One Does</SectionTitle>
        <Para>
          "Snowflake caching" is not one thing. There are three separate caches that live in different
          layers, persist for different lengths of time, and get invalidated by different events. Confusing
          them is a common source of wrong assumptions about why a query was fast or slow.
        </Para>
        <Table
          headers={['Cache', 'Lives in', 'What it stores', 'How long it persists']}
          rows={[
            ['Result cache', 'Cloud services layer.', 'The full result set of a previously run query.', 'Up to 24 hours, and can be extended by repeated use up to Snowflake\'s maximum retention; invalidated if the underlying data or the SQL text changes.'],
            ['Warehouse local disk cache', 'The virtual warehouse\'s own compute nodes.', 'Raw table data recently read from storage, kept on local SSD for fast re-access.', 'Only while the warehouse stays running; suspending the warehouse clears it, and it rebuilds on next use.'],
            ['Metadata cache', 'Cloud services layer.', 'Micro-partition statistics (min/max, counts) used for pruning and query planning.', 'Maintained continuously by cloud services as data changes; not something you can suspend away.'],
          ]}
        />
        <Para>
          The result cache is the most dramatic: if you run the exact same SQL text against unchanged
          underlying data, Snowflake can return the stored result almost instantly without spinning up or
          touching a warehouse at all — meaning the query can cost effectively nothing in warehouse compute.
          But it only applies to an identical query against identical data; changing a filter, an alias, or
          the data itself invalidates the match.
        </Para>
        <Para>
          The warehouse's local disk cache is different: it speeds up repeated access to the same underlying
          data from the same running warehouse, even across different queries, but it lives on the warehouse's
          own compute nodes and disappears when the warehouse suspends. A warehouse that keeps auto-suspending
          after every short idle period will "lose" this cache more often than one that stays up longer —
          which is one of the real tradeoffs behind picking an AUTO_SUSPEND value, not just a cost knob.
        </Para>
        <Para>
          The metadata cache is the quiet one: it is what actually enables micro-partition pruning (Part 05)
          to work quickly. It is maintained by the cloud services layer as data is loaded and changed, and you
          generally do not think about managing it directly — but it is the reason a well-filtered query can
          plan efficiently even on a table with a huge number of micro-partitions.
        </Para>
        <Callout title="Cache is not a design strategy">
          Snowflake can reuse persisted query results when the exact query and underlying data have not
          changed, and warehouses cache data locally while running. These caches can make repeated queries
          very fast, but you should not design a production dashboard that only performs acceptably when
          cache happens to be warm. Measure cold-cache performance too.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — How the layers combine to scale reads and writes independently" />
        <SectionTitle>Putting It Together: Independent Scaling of Reads and Writes</SectionTitle>
        <Para>
          Here is the full loop across all three layers. Storage holds compressed, pruning-friendly
          micro-partitioned tables, completely independent of any compute. The cloud services layer maintains
          metadata about those micro-partitions and plans queries against them, independent of which warehouse
          eventually executes the plan. Virtual warehouses are disposable, resizable, isolated compute that
          attach to that shared storage on demand, running whatever workload they are assigned.
        </Para>
        <Para>
          The direct consequence is that reads and writes scale independently along two separate axes. Want
          faster or more concurrent reads (more dashboards, more analysts)? Add or resize BI warehouses —
          storage and write pipelines are untouched. Want faster or heavier writes (bigger ingestion volume, a
          large backfill)? Resize or add loading/transform warehouses — read-side warehouses see no
          disruption, because they are entirely separate compute attached to the same durable storage.
        </Para>
        <CodeBox label="Independent scaling in one account">{`-- Read-heavy scaling: more BI concurrency, no effect on writes
ALTER WAREHOUSE WH_BI_S SET MAX_CLUSTER_COUNT = 4;

-- Write-heavy scaling: bigger backfill, no effect on BI warehouses
ALTER WAREHOUSE WH_TRANSFORM_M SET WAREHOUSE_SIZE = 'X-LARGE';
CREATE OR REPLACE TABLE SILVER.ORDERS_BACKFILL AS
SELECT * FROM RAW.ORDERS_HISTORICAL;
ALTER WAREHOUSE WH_TRANSFORM_M SET WAREHOUSE_SIZE = 'MEDIUM';

-- WH_BI_S never queued, never slowed down, never resized
-- during the entire backfill above.`}
        </CodeBox>
        <Callout title="This is the whole point of the architecture">
          Every other Snowflake feature you will learn — Time Travel, zero-copy cloning, streams and tasks,
          secure data sharing — is easier to reason about once you internalize that storage, compute, and
          coordination are three independently scalable layers rather than one bundled system.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Clustering and search optimization, briefly" />
        <SectionTitle>When Automatic Pruning Is Not Enough</SectionTitle>
        <Para>
          Micro-partitioning and pruning happen automatically and work well for most tables, especially when
          data is naturally loaded in roughly the order it is queried (for example, loading orders in the
          order they occur, then filtering by date). But some tables get queried on a column whose values are
          scattered unpredictably across many micro-partitions — for example, filtering a huge table by
          customer_id when rows for any given customer are spread across the entire load history rather than
          clustered together.
        </Para>
        <Para>
          For that situation, Snowflake offers clustering keys, which tell Snowflake to periodically
          reorganize a table's micro-partitions so that values of the clustering column are grouped together,
          improving pruning for queries that filter on it. There is also search optimization service, aimed at
          highly selective point lookups on columns that do not naturally cluster well, such as needle-in-a-
          haystack equality lookups on a UUID or a rarely-filtered text field. Both of these are deliberately
          introduced only briefly here — they are real, non-default tools that cost additional
          maintenance/service credits, and choosing when to reach for them is the subject of a dedicated
          performance-tuning module later in this track.
        </Para>
        <Table
          headers={['Tool', 'Helps with', 'Cost consideration']}
          rows={[
            ['Automatic micro-partition pruning', 'Most range/date filters on naturally-ordered data.', 'Free — always on, no configuration.'],
            ['Clustering keys', 'Large tables filtered on a column whose values are scattered across load history.', 'Background reclustering consumes credits; only worth it on genuinely large, frequently-filtered tables.'],
            ['Search optimization service', 'Highly selective point lookups that clustering does not help with well.', 'Ongoing service credits; targeted at specific lookup-heavy patterns, not a general-purpose switch.'],
          ]}
        />
        <Callout title="Do not reach for these by default">
          Most tables never need a manual clustering key or search optimization. Enable them only after
          confirming, with Query Profile and query history, that pruning is genuinely failing on a large,
          frequently-queried table — not as a first response to "queries feel slow."
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Compute billing and idle warehouses" />
        <SectionTitle>Compute Is Billed Per Second a Warehouse Runs</SectionTitle>
        <Para>
          Because compute and storage are billed separately, warehouse credit consumption is driven purely by
          how long a warehouse is running and at what size — not by how much data it touches or how much
          data exists in storage. A warehouse that sits resumed and idle for hours burns credits exactly as if
          it were running real queries the whole time.
        </Para>
        <Table
          headers={['Setting', 'Effect on cost', 'Recommendation for a learning/dev account']}
          rows={[
            ['AUTO_SUSPEND = 60', 'Warehouse stops billing 60 seconds after the last query finishes.', 'Good default for ad hoc and learning warehouses.'],
            ['AUTO_SUSPEND disabled or very long', 'Warehouse can keep billing for hours with nobody querying it.', 'Avoid outside of workloads with truly constant back-to-back queries.'],
            ['Larger size "just in case"', 'Every second of runtime costs proportionally more credits.', 'Size to the workload you have measured, not the workload you imagine.'],
          ]}
        />
        <CodeBox label="Checking warehouse credit usage">{`SELECT
  warehouse_name,
  DATE_TRUNC('day', start_time) AS usage_day,
  SUM(credits_used) AS credits_used
FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
WHERE start_time >= DATEADD('day', -14, CURRENT_TIMESTAMP())
GROUP BY 1, 2
ORDER BY 2 DESC, 3 DESC;`}
        </CodeBox>
        <Para>
          This is the architecture idea from Part 08 showing up directly in a bill: because a warehouse is
          disposable, isolated compute rather than a shared always-on cluster, the cost of a workload is
          almost entirely a function of how that one workload's warehouse is sized and scheduled — not a
          shared number every team on the account has to negotiate over.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Architecture mistakes" />
        <SectionTitle>Common Architecture Mistakes</SectionTitle>
        <BulletList
          items={[
            'Using one shared warehouse for every workload, causing dashboards, ELT, and ad hoc work to interfere.',
            'Leaving warehouses running all day because auto-suspend was not configured.',
            'Scaling a warehouse up to fix a query that is actually scanning too much data because of poor pruning.',
            'Assuming Snowflake has traditional B-tree indexes and tuning it like PostgreSQL.',
            'Treating clones as harmless even when they expose production-sensitive data.',
            'Building real-time serving APIs directly on Snowflake query latency.',
            'Assuming the result cache will always save cost without checking whether queries actually match.',
            'Wrapping filter columns in functions, defeating micro-partition pruning without realizing it.',
          ]}
        />
        <Callout title="Senior design rule" color="#ef4444">
          Separate workloads first, measure query history second, resize warehouses third. Guessing warehouse
          size before reading query history is how teams burn credits without fixing the real bottleneck.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Immutability's other payoffs: Time Travel and cloning" />
        <SectionTitle>Why Micro-Partition Immutability Enables Time Travel and Zero-Copy Cloning</SectionTitle>
        <Para>
          Part 05 mentioned that micro-partitions are immutable — an UPDATE or DELETE never rewrites bytes in
          place, it writes new micro-partitions and marks the old ones as no longer part of the table's
          current state. That single design decision is also the physical foundation for two features you
          will use constantly once you get hands-on with Snowflake: Time Travel and zero-copy cloning. Both
          are architecture consequences, not separate bolted-on features, which is why they belong in this
          module even though they get their own deeper treatment later in the track.
        </Para>
        <Para>
          Because old micro-partitions are not deleted immediately, just marked inactive for the current table
          state, Snowflake can keep them around for a configurable retention window and let you query or
          restore the table as it existed at a past point in time — that is Time Travel. Zero-copy cloning
          uses the same underlying idea: cloning a table, schema, or database creates a new object that
          initially points at the exact same micro-partitions as the original, copying no data at all. Only
          when either the original or the clone changes does Snowflake write new micro-partitions for the
          side that changed — so a clone is nearly instant and nearly free at creation time, regardless of how
          large the source table is.
        </Para>
        <Table
          headers={['Feature', 'What it lets you do', 'Why it is cheap/fast']}
          rows={[
            ['Time Travel', 'Query or restore a table as of a past timestamp, within a retention window.', 'Old micro-partitions are retained rather than deleted, up to the retention period.'],
            ['Zero-copy cloning', 'Create a full copy of a table/schema/database almost instantly.', 'The clone shares the source\'s existing micro-partitions until either side diverges.'],
          ]}
        />
        <CodeBox label="Time Travel and cloning in practice">{`-- Query a table as it looked 2 hours ago
SELECT *
FROM SILVER.ORDERS
AT (OFFSET => -60*60*2);

-- Restore a table dropped by accident, within retention
UNDROP TABLE SILVER.ORDERS;

-- Instantly clone a whole schema for safe experimentation
CREATE SCHEMA SILVER_DEV CLONE SILVER;`}
        </CodeBox>
        <Callout title="Clones are not automatically harmless">
          A clone is cheap to create, but it is a full logical copy with its own access grants to configure —
          cloning a schema containing sensitive customer data into a less-governed dev environment can create
          a real security gap even though no bytes were copied at clone time.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — Contrast with traditional database architectures" />
        <SectionTitle>Why This Is Different: Shared-Disk and Shared-Nothing, Side by Side</SectionTitle>
        <Para>
          Everything in this module makes more sense once you can name what Snowflake is not. Most databases
          a beginner has used — a single PostgreSQL or MySQL server, for instance — use a "shared-everything"
          model: one machine holds the data on its own disks and runs every query through its own single
          compute engine (CPU and memory). There is nothing to separate, because storage and compute were
          never two different things to begin with. If ten teams query that one server at once, they are all
          competing for the same CPU cycles and the same disk I/O, whether they know it or not.
        </Para>
        <Para>
          Bigger traditional systems try to fix that competition problem in one of two ways, and both leave a
          real scar that Snowflake's design avoids. A <strong>shared-disk</strong> architecture (classic
          Oracle RAC is the textbook example) lets multiple compute nodes attach to the same shared storage —
          which sounds like Snowflake, but those nodes must constantly coordinate a shared cache and shared
          locks across the cluster, so as you add more nodes, the coordination overhead between them grows and
          eventually limits how far you can scale. A <strong>shared-nothing</strong> architecture (classic
          on-premise Teradata, or a manually sharded database) avoids that coordination cost by giving each
          node its own private slice of both storage and compute — but now the data itself is physically
          partitioned across nodes, so adding compute means physically rebalancing data across the cluster,
          and a node's local disk failure can mean losing the data that lived only on it.
        </Para>
        <Table
          headers={['Architecture', 'Storage/compute relationship', 'What breaks as you scale']}
          rows={[
            ['Shared-everything (a single traditional DB server)', 'One machine owns both; there is no separation at all.', 'Every workload competes for the same CPU and disk; the only fix is a bigger single machine.'],
            ['Shared-disk (e.g. Oracle RAC)', 'Multiple compute nodes share one storage system.', 'Nodes must coordinate locks/cache with each other constantly; coordination overhead grows with cluster size.'],
            ['Shared-nothing (e.g. sharded/on-prem MPP)', 'Each node owns its own private storage and compute slice.', 'Data is physically partitioned; adding compute means rebalancing data across nodes, and a node failure can mean data loss for its shard.'],
            ['Snowflake', 'Storage is one shared, durable layer; compute is many independent, disposable warehouses that all read/write the same storage with no cross-warehouse coordination needed.', 'Adding a warehouse for a new team requires no data movement and no coordination with existing warehouses at all.'],
          ]}
        />
        <Para>
          The concrete beginner-facing version of this: in a traditional shared-everything database, ten teams
          each running heavy queries against the same tables means ten teams competing for one compute engine
          — someone's dashboard slows down because someone else kicked off a big batch job. In Snowflake, ten
          teams can each spin up their own warehouse — <code>WH_TEAM_A</code>, <code>WH_TEAM_B</code>, and so
          on — pointed at the exact same underlying tables in shared storage, and none of them notices the
          others exist from a performance standpoint, because each warehouse is its own isolated compute
          cluster with its own CPU and memory. That is the concrete payoff of everything Parts 01–03 described
          in the abstract.
        </Para>
        <CodeBox label="The same scenario in two architectures">{`-- Traditional shared-everything server: one engine, all workloads compete
-- Team A's heavy batch job and Team B's dashboard query fight for the same CPU/disk.
-- (No warehouse concept exists — there is only "the database.")

-- Snowflake: isolated compute, shared storage, zero contention
CREATE WAREHOUSE WH_TEAM_A WAREHOUSE_SIZE = MEDIUM AUTO_SUSPEND = 60;
CREATE WAREHOUSE WH_TEAM_B WAREHOUSE_SIZE = SMALL  AUTO_SUSPEND = 60;

USE WAREHOUSE WH_TEAM_A;
CALL OPS.RUN_HEAVY_NIGHTLY_BATCH();      -- runs on its own dedicated compute

USE WAREHOUSE WH_TEAM_B;
SELECT * FROM SILVER.ORDERS WHERE order_date = CURRENT_DATE();  -- untouched by Team A's batch job`}
        </CodeBox>
        <Callout title="This is the answer to 'why not just use Postgres at scale?'">
          A beginner asking why Snowflake exists at all, when a traditional database also "stores and queries
          data," should walk away with this: a traditional server ties storage and compute together, so
          scaling either one means fighting over the other, or manually engineering around the coordination
          and data-movement costs above. Snowflake's layered design (Parts 01–03) removes that tradeoff by
          construction, not by clever configuration.
        </Callout>
        <Para>
          It is worth being precise about what Snowflake gives up to get this, because nothing is free. A
          shared-nothing system with data intentionally co-located with the compute that processes it can, in
          some workloads, avoid network trips a fully disaggregated system cannot. Snowflake's answer to that
          gap is the warehouse local disk cache from Part 07 — a running warehouse pulls table data from
          storage once and keeps a local copy on its own compute nodes, so repeated access within a session
          approaches the speed of co-located data without ever giving up the independence of shared storage.
          The tradeoff is explicit rather than hidden: cold-cache performance (a warehouse that just resumed)
          is genuinely different from warm-cache performance, which is exactly why Part 07 warned against
          designing a dashboard that only works well when the cache happens to be warm.
        </Para>
        <Table
          headers={['Question a beginner asks', 'Traditional shared-disk/shared-nothing answer', 'Snowflake answer']}
          rows={[
            ['What happens if I need more compute for one workload?', 'Add a node — which means rebalancing data (shared-nothing) or adding coordination overhead (shared-disk).', 'Create or resize a warehouse; no data moves, no other warehouse is affected.'],
            ['What happens if a node/warehouse dies mid-query?', 'On shared-nothing, you may lose the shard that lived only on that node until it recovers.', 'The warehouse is disposable compute with no data of its own; resume a new one and the same shared storage is still there.'],
            ['Do two teams querying the same table interfere with each other?', 'Yes, in shared-everything and shared-disk to varying degrees — they compete for the same engine or coordinate over the same locks.', 'No — each team\'s warehouse is an independent cluster with its own CPU and memory.'],
            ['What happens if I stop paying for compute overnight?', 'The server (or cluster) either keeps running or the data becomes unavailable with it.', 'Warehouses auto-suspend and stop billing; the data in storage is completely unaffected either way.'],
          ]}
        />
        <Para>
          None of this means shared-disk or shared-nothing designs were built by people who missed something
          obvious — both were reasonable answers to the hardware and network constraints of their era, when
          moving data over a network was slow and expensive relative to local disk access. Cloud object
          storage and cloud networking changed that calculus enough that a fully disaggregated design became
          practical at analytical-query speed, which is the specific bet Snowflake's architecture makes. Naming
          that tradeoff explicitly — rather than treating "Snowflake is just faster" as a given — is what
          separates a memorized fact from an answer that holds up under a follow-up question in an interview.
        </Para>
        <Callout title="One-line version to keep ready">
          If asked to contrast the two in thirty seconds: traditional architectures make you choose between
          data locality (fast, but coupled to one node's storage) and coordination overhead (flexible, but
          expensive to keep nodes in sync); Snowflake avoids that choice by keeping storage and compute
          genuinely separate and using caching, not co-location, to keep repeated access fast — and it is this
          one design decision that every later feature in this track (Time Travel, cloning, streams and
          tasks, secure data sharing) ultimately builds on top of.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Hands-on lab" />
        <SectionTitle>Hands-On Lab: Observe Storage/Compute Separation and Pruning Yourself</SectionTitle>
        <Para>
          This lab walks through creating two independent warehouses against one shared table, then observing
          pruning-friendly versus pruning-unfriendly filters using the query history and profile.
        </Para>
        <CodeBox label="Lab setup: shared storage, two independent warehouses">{`CREATE OR REPLACE DATABASE ARCH_LAB;
CREATE OR REPLACE SCHEMA ARCH_LAB.CORE;

CREATE OR REPLACE TABLE ARCH_LAB.CORE.ORDERS (
  order_id STRING,
  customer_id STRING,
  order_ts TIMESTAMP_NTZ,
  total_usd NUMBER(12,2)
);

INSERT INTO ARCH_LAB.CORE.ORDERS
SELECT
  'O-' || SEQ4(),
  'C-' || MOD(SEQ4(), 500),
  DATEADD('second', SEQ4(), '2026-01-01'::TIMESTAMP_NTZ),
  UNIFORM(5, 500, RANDOM())
FROM TABLE(GENERATOR(ROWCOUNT => 2000000));

CREATE OR REPLACE WAREHOUSE WH_LAB_LOAD WAREHOUSE_SIZE = XSMALL AUTO_SUSPEND = 60;
CREATE OR REPLACE WAREHOUSE WH_LAB_BI   WAREHOUSE_SIZE = XSMALL AUTO_SUSPEND = 60;`}
        </CodeBox>
        <CodeBox label="Lab step: compare pruning-friendly vs unfriendly filters">{`USE WAREHOUSE WH_LAB_BI;

-- Pruning-friendly: run this, then check Query Profile for partitions scanned vs total.
SELECT COUNT(*)
FROM ARCH_LAB.CORE.ORDERS
WHERE order_ts >= '2026-06-01' AND order_ts < '2026-06-02';

-- Pruning-unfriendly: same logical result, function wraps the column.
SELECT COUNT(*)
FROM ARCH_LAB.CORE.ORDERS
WHERE DATE_TRUNC('day', order_ts) = '2026-06-01';

-- Result cache check: run the first query again unchanged and compare execution time.
SELECT COUNT(*)
FROM ARCH_LAB.CORE.ORDERS
WHERE order_ts >= '2026-06-01' AND order_ts < '2026-06-02';`}
        </CodeBox>
        <SubTitle>Lab questions</SubTitle>
        <BulletList
          items={[
            'In Query Profile, how many micro-partitions were scanned for the pruning-friendly filter versus the DATE_TRUNC version?',
            'Why did the third query (identical to the first) run faster, and which cache explains that?',
            'If you suspended WH_LAB_BI and ran the first query again, which cache would you lose, and which would you keep?',
            'Could WH_LAB_LOAD insert new rows into ORDERS at the same time WH_LAB_BI queries it? Why?',
            'If you resized WH_LAB_BI to Small, would you expect the pruning-friendly query to get much faster? Why or why not?',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — Interview answer" />
        <SectionTitle>How to Explain Snowflake's Architecture Clearly</SectionTitle>
        <Para>
          A strong answer sounds like this: Snowflake has three layers — storage, compute, and cloud
          services. Storage holds data in Snowflake-managed cloud storage, automatically split into
          compressed, immutable micro-partitions of roughly 50–100 MB each, with metadata like per-column
          min/max values that the cloud services layer uses for pruning. Compute is provided by virtual
          warehouses, independent resizable clusters that attach to the same shared storage — so a loading
          warehouse and a BI warehouse can hit the same tables simultaneously with zero contention, and reads
          and writes scale independently of each other and of storage. Warehouse sizes run X-Small through
          6X-Large, each step roughly doubling compute and credit cost, and you scale up for a single heavy
          query versus scaling out with multi-cluster warehouses for concurrency. Cloud services handles
          optimization, metadata, security, transactions, and the result cache. There are three separate
          caches — result cache in cloud services, local disk cache on the warehouse itself, and the metadata
          cache behind pruning — and each persists differently, so you shouldn't rely on cache as a
          substitute for good query and warehouse design.
        </Para>
        <SubTitle>Questions you should answer out loud</SubTitle>
        <BulletList
          items={[
            'What are Snowflake\'s three architectural layers, and what does each one own?',
            'What is a micro-partition, and how does its metadata enable pruning?',
            'What is a virtual warehouse, and why is it not a data container?',
            'How do warehouse sizes relate to each other, from X-Small to 6X-Large?',
            'What is the difference between scaling a warehouse up versus scaling out with multi-cluster?',
          'What are the three Snowflake caches, and how long does each persist?',
            'How does this architecture let Snowflake scale reads and writes independently?',
            'How does Snowflake\'s architecture differ from a shared-disk system like Oracle RAC or a shared-nothing sharded database?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'Snowflake has three layers: storage, compute (virtual warehouses), and cloud services.',
          'Virtual warehouses are independent, resizable compute clusters, not data containers — storage is shared and compute is isolated.',
          'Micro-partitions are immutable ~50–100 MB compressed chunks with per-column min/max metadata that drive pruning.',
          'Warehouse sizes from X-Small to 6X-Large roughly double compute and cost at each step; scale up for one heavy query, scale out for concurrency.',
          'The cloud services layer handles optimization, metadata, security, transactions, and result caching.',
          'There are three distinct caches — result, warehouse local disk, and metadata — each living in a different layer with a different lifetime.',
          'This layered design is what lets Snowflake scale reads and writes independently, and is the foundation for Time Travel, cloning, and streams/tasks covered later.',
          'Unlike shared-disk (nodes coordinating over shared storage) or shared-nothing (data physically partitioned across nodes) architectures, Snowflake gives every warehouse its own isolated compute with zero cross-warehouse coordination or data movement.',
        ]}
      />
    </LearnLayout>
  )
}
