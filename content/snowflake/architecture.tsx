import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function SnowflakeArchitecture() {
  return (
    <LearnLayout
      title="Snowflake Architecture"
      description="Storage, virtual warehouses, cloud services, micro-partitions, metadata, caching, scaling, and why Snowflake behaves differently from older warehouses."
      section="Snowflake — Module 02"
      readTime="65 min"
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
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Virtual warehouses" />
        <SectionTitle>Virtual Warehouses Are Compute, Not Data Containers</SectionTitle>
        <Para>
          A virtual warehouse is the compute engine that runs SQL. It is not where your tables live. You can
          query the same table from a small BI warehouse, a medium transformation warehouse, or a large
          backfill warehouse. The data stays in storage; the warehouse provides temporary compute.
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
  INITIALLY_SUSPENDED = TRUE;`}
        </CodeBox>
        <Callout title="Scaling up vs scaling out">
          Increasing warehouse size helps a heavy query get more compute. Multi-cluster warehouses help
          concurrency when many queries run at once. Do not confuse the two.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Micro-partitions" />
        <SectionTitle>Micro-Partitions Are the Storage Unit Behind Snowflake Performance</SectionTitle>
        <Para>
          Snowflake stores table data in immutable compressed columnar micro-partitions. Each micro-partition
          carries metadata such as value ranges and null counts. When your query filters on a column,
          Snowflake can use this metadata to skip micro-partitions that cannot match. This is called
          pruning.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Important:</strong> Snowflake does not rely on normal user-created B-tree indexes like
            PostgreSQL for typical analytical queries. The main performance story is columnar storage,
            micro-partition pruning, query optimization, caching, warehouse compute, and sometimes
            clustering/search optimization.
          </Para>
        </HighlightBox>
        <CodeBox label="Pruning-friendly filters">{`-- Better for pruning:
SELECT *
FROM SILVER.ORDERS
WHERE order_ts >= '2026-09-01'
  AND order_ts <  '2026-10-01';

-- Often worse because the filter wraps the column:
SELECT *
FROM SILVER.ORDERS
WHERE DATE_TRUNC('month', order_ts) = '2026-09-01';`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Caching" />
        <SectionTitle>Snowflake Has Multiple Caches, But Cache Is Not a Design Strategy</SectionTitle>
        <Para>
          Snowflake can reuse persisted query results when the exact query and underlying data have not
          changed. Warehouses also cache data locally while running. These caches can make repeated queries
          very fast, but you should not design a production dashboard that only performs acceptably when
          cache happens to be warm.
        </Para>
        <Table
          headers={['Cache', 'What it helps', 'What not to assume']}
          rows={[
            ['Result cache', 'Exact repeated query results.', 'Different SQL text or changed data may not reuse it.'],
            ['Warehouse cache', 'Recently accessed data on a running warehouse.', 'Suspending a warehouse can remove local cache.'],
            ['Metadata cache', 'Planning and pruning decisions.', 'Bad filters can still scan too much data.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Architecture mistakes" />
        <SectionTitle>Common Architecture Mistakes</SectionTitle>
        <BulletList
          items={[
            'Using one shared warehouse for every workload, causing dashboards, ELT, and ad hoc work to interfere.',
            'Leaving warehouses running all day because auto-suspend was not configured.',
            'Scaling a warehouse up to fix a query that is actually scanning too much data.',
            'Assuming Snowflake has traditional indexes and tuning it like PostgreSQL.',
            'Treating clones as harmless even when they expose production-sensitive data.',
            'Building real-time serving APIs directly on Snowflake query latency.',
          ]}
        />
        <Callout title="Senior design rule" color="#ef4444">
          Separate workloads first, measure query history second, resize warehouses third. Guessing warehouse
          size before reading query history is how teams burn credits without fixing the real bottleneck.
        </Callout>
      </section>

      <KeyTakeaways
        items={[
          'Snowflake has three layers: storage, compute, and cloud services.',
          'Virtual warehouses are compute engines, not data containers.',
          'Storage is shared while compute can be isolated by workload.',
          'Micro-partition pruning is central to performance.',
          'Caching helps, but good modeling and query design still matter.',
        ]}
      />
    </LearnLayout>
  )
}
