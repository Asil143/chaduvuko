import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function PerformanceTuning() {
  return (
    <LearnLayout
      title="Performance Tuning"
      description="Micro-partition pruning, clustering keys, search optimization, reading a query profile, cache behavior, and warehouse sizing for real query performance work."
      section="Snowflake — Module 13"
      readTime="70 min"
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Performance Tuning', href: '/learn/snowflake/performance-tuning' },
      ]}
      prev={{ title: 'Dynamic Tables', href: '/learn/snowflake/dynamic-tables' }}
      next={{ title: 'Cost Optimization', href: '/learn/snowflake/cost-optimization' }}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The plain-English idea" />
        <SectionTitle>Tuning Means Reducing What a Query Has to Read, Not Buying More Compute</SectionTitle>
        <Para>
          The instinctive reaction to a slow Snowflake query is to make the warehouse bigger. Sometimes that
          helps. Often it does not, and the query stays just as slow while the bill grows. Real performance
          tuning starts from a different question: how much data did this query actually have to scan to
          produce its answer, and could it have scanned less? Snowflake stores data in immutable chunks
          called micro-partitions, each carrying metadata about the min and max value of every column inside
          it. A well-tuned query lets Snowflake skip the vast majority of those chunks before a single byte
          of data inside them is read. A poorly-tuned query forces Snowflake to open chunks it never needed.
        </Para>
        <Para>
          This lesson treats a warehouse as one variable in the tuning equation, not the first one to touch.
          The order that separates a senior engineer from a beginner is: look at what was scanned, understand
          why it was scanned, fix the query or the table design, and only then consider whether compute size
          was ever really the bottleneck.
        </Para>
        <HighlightBox>
          <Para>
            <strong>Plain-English definition:</strong> pruning is Snowflake using stored min/max metadata to
            skip reading micro-partitions that cannot contain rows matching your filter, without touching
            the actual data in them. It is the single biggest lever for large-table query speed, because the
            cheapest byte to scan is the one you never scan.
          </Para>
        </HighlightBox>
        <CodeBox label="Mental model">{`Query arrives
     |
     v
Optimizer plans the query
     |
     v
Pruning: which micro-partitions can be skipped based on min/max metadata?
     |
     v
Warehouse compute reads and processes the remaining partitions
     |
     v
Intermediate results may spill to local or remote disk if they don't fit in memory
     |
     v
Result returned (and cached for exact repeats)`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Micro-partition pruning in depth" />
        <SectionTitle>Pruning Works Off Column Min/Max Metadata Per Micro-Partition</SectionTitle>
        <Para>
          Every micro-partition — typically tens of megabytes of compressed data — stores, for every column,
          the minimum and maximum value present in that chunk. When a query filters on a column, Snowflake
          checks each partition's stored min/max range against the filter before deciding whether to open it.
          If the filter value cannot possibly fall inside that partition's range, the partition is skipped
          entirely — no decompression, no scan, no cost for that chunk.
        </Para>
        <CodeBox label="A pruning-friendly filter">{`SELECT customer_id, SUM(total_usd)
FROM GOLD.ORDERS
WHERE order_ts >= '2026-09-01'
  AND order_ts <  '2026-10-01'
GROUP BY customer_id;

-- If GOLD.ORDERS is naturally ordered by order_ts (e.g. loaded in
-- time order), most micro-partitions have a min/max range entirely
-- outside September, and Snowflake skips them without reading them.`}
        </CodeBox>
        <CodeBox label="A filter that defeats pruning">{`-- Wrapping the filtered column in a function hides its raw value from
-- the optimizer's min/max comparison, so pruning quality drops sharply.
SELECT customer_id, SUM(total_usd)
FROM GOLD.ORDERS
WHERE DATE(order_ts) = '2026-09-01'
GROUP BY customer_id;

-- Rewritten to compare the raw column directly:
SELECT customer_id, SUM(total_usd)
FROM GOLD.ORDERS
WHERE order_ts >= '2026-09-01' AND order_ts < '2026-09-02'
GROUP BY customer_id;`}
        </CodeBox>
        <Table
          headers={['Filter style', 'Pruning quality', 'Why']}
          rows={[
            ['Raw column compared to a literal or bind.', 'Good.', 'Optimizer can compare directly against stored min/max per partition.'],
            ['Column wrapped in a function (DATE(), CAST(), UPPER()).', 'Poor to none.', 'Stored min/max is for the raw column, not the transformed value.'],
            ['Range filter on a naturally-ordered column.', 'Very good.', 'Ranges align cleanly with how partitions were written over time.'],
            ['Filter on a column with little correlation to insertion order.', 'Poor regardless of function use.', 'Matching values are spread across most partitions no matter how the filter is written.'],
          ]}
        />
        <Callout title="Pruning quality is a property of the table, not just the query" color="#ef4444">
          Even a perfectly written filter cannot prune well if the filtered column's values are scattered
          randomly across every micro-partition. Pruning quality depends on both the query and how the
          underlying data is physically organized — which is what clustering addresses next.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Natural clustering" />
        <SectionTitle>Most Tables Cluster Well Naturally From How They Are Loaded</SectionTitle>
        <Para>
          A table's "natural clustering" is simply the order data ended up in across micro-partitions as it
          was loaded. If rows are inserted roughly in time order — the overwhelmingly common case for
          event, order, and log tables — the table is naturally well-clustered on a timestamp column with no
          extra work required. Most Snowflake tables never need an explicit clustering key; natural
          clustering from ordinary load patterns is good enough.
        </Para>
        <CodeBox label="Check natural clustering quality">{`SELECT SYSTEM$CLUSTERING_INFORMATION('GOLD.ORDERS', '(order_ts)');

-- The result includes an average_depth figure: roughly, how many
-- micro-partitions typically must be read to satisfy a query filtering
-- on this column. Lower is better; a value close to 1 means excellent
-- clustering, a large and growing value means pruning is degrading.`}
        </CodeBox>
        <Para>
          Clustering quality degrades over time for tables that receive out-of-order inserts, frequent
          updates that rewrite old partitions, or backfills that land old data alongside new data. A table
          that clustered beautifully on day one can silently degrade a year later purely from ordinary
          write patterns.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Explicit clustering keys" />
        <SectionTitle>CLUSTER BY Forces Reorganization — And Is Not Free</SectionTitle>
        <Para>
          When natural clustering is poor and pruning on a large, frequently-filtered column is bad enough to
          matter, you can define an explicit clustering key. Snowflake then performs background
          "reclustering" work to keep micro-partitions organized by that key over time, as new data lands and
          existing data drifts out of order.
        </Para>
        <CodeBox label="Adding a clustering key">{`ALTER TABLE GOLD.ORDERS CLUSTER BY (order_date);

-- For a table frequently filtered on two dimensions together:
ALTER TABLE GOLD.ORDERS CLUSTER BY (order_date, region);

-- Check whether a clustering key is already helping:
SELECT SYSTEM$CLUSTERING_INFORMATION('GOLD.ORDERS', '(order_date)');`}
        </CodeBox>
        <Callout title="Clustering maintenance is background compute you pay for">
          Reclustering is not a one-time cost. Snowflake continuously reorganizes micro-partitions to keep a
          clustered table sorted as new rows arrive and old rows change, and that background maintenance
          consumes credits on an ongoing basis — separate from your query warehouses. On a large table with
          heavy, constant write volume, the reclustering cost can rival or exceed the query savings it was
          meant to buy.
        </Callout>
        <Table
          headers={['Situation', 'Explicit clustering', 'Rationale']}
          rows={[
            ['Large table (100M+ rows), stable insert order, filtered on the same column constantly.', 'Often unnecessary.', 'Natural clustering already does the job — verify with SYSTEM$CLUSTERING_INFORMATION before adding a key.'],
            ['Large table with out-of-order backfills or heavy updates, filtered on a low-correlation column.', 'Worth evaluating.', 'Natural clustering is genuinely poor and unlikely to self-correct.'],
            ['Small or medium table.', 'Skip it.', 'Pruning barely matters at small scale; reclustering cost is pure waste.'],
            ['Table updated constantly across its full key range.', 'Be cautious.', 'Reclustering has to keep re-sorting data that keeps getting rewritten — ongoing cost may outweigh benefit.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Search optimization service" />
        <SectionTitle>Search Optimization Targets a Different Problem Than Clustering</SectionTitle>
        <Para>
          Clustering helps range and equality filters on the clustering key scan fewer partitions. It does
          not help a highly selective point lookup on a column that has no natural correlation with how the
          table is physically organized — for example, looking up one order by its UUID-style order_id
          inside a huge table, where matching rows for any given ID are scattered across nearly every
          partition no matter how the table is sorted. That is the specific problem the Search Optimization
          Service solves: it builds a separate search access structure so highly selective point lookups can
          find matching rows without scanning most of the table.
        </Para>
        <CodeBox label="Enabling search optimization for point lookups">{`ALTER TABLE GOLD.ORDERS ADD SEARCH OPTIMIZATION;

-- Or scoped to specific columns/expressions:
ALTER TABLE GOLD.ORDERS ADD SEARCH OPTIMIZATION ON EQUALITY(order_id);

-- Now this kind of lookup is what search optimization targets well:
SELECT * FROM GOLD.ORDERS WHERE order_id = 'ORD-9F3A21';`}
        </CodeBox>
        <Table
          headers={['Tool', 'Targets', 'Not the right tool for']}
          rows={[
            ['Clustering key', 'Range/equality filters on a column correlated with table organization.', 'Point lookups on scattered, high-cardinality columns.'],
            ['Search optimization service', 'Highly selective point lookups and some substring/equality searches on non-clustered columns.', 'Broad range scans or analytical aggregation queries.'],
            ['Neither', 'Full table scans, broad aggregations touching most of the table.', 'These are compute-bound, not scan-bound — warehouse sizing matters more here.'],
          ]}
        />
        <Callout title="Both cost credits to maintain">
          Search optimization, like clustering, has an ongoing maintenance cost as the table changes. Enable
          it for columns that genuinely receive frequent, highly selective point lookups — not as a default
          "make lookups faster" switch on every table.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Reading a query profile" />
        <SectionTitle>Query Profile Is the Evidence, Not a Guess</SectionTitle>
        <Para>
          Snowsight's Query Profile view is the single most useful tuning tool available, and the most
          underused. It shows the actual execution plan as a graph of operator nodes, with real numbers for
          bytes scanned, bytes pruned, rows processed, and time spent at each step — replacing intuition
          about what "should" be slow with evidence about what actually was slow.
        </Para>
        <BulletList
          items={[
            'Bytes scanned vs. partitions total — a high ratio of partitions scanned to partitions total means pruning failed; look at the filter and the table\'s clustering quality.',
            'Percentage of total query time attributed to each operator node — this tells you which step (a join, an aggregation, a table scan) is actually the bottleneck, not which one you assumed was slow.',
            'Bytes spilled to local storage — intermediate results overflowed the warehouse\'s memory and spilled to local SSD; often fixable with a larger warehouse or a less memory-hungry query shape.',
            'Bytes spilled to remote storage — a more severe version of the same problem; the warehouse ran out of local disk too, which is a strong signal the warehouse is meaningfully undersized for this specific query.',
            'Most expensive operator nodes — Query Profile highlights which nodes consumed the largest share of time, which is where rewriting effort should go first.',
          ]}
        />
        <CodeBox label="Find slow queries to open in Query Profile">{`SELECT
  query_id,
  query_text,
  total_elapsed_time / 1000 AS elapsed_sec,
  bytes_scanned,
  bytes_spilled_to_local_storage,
  bytes_spilled_to_remote_storage,
  warehouse_name
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE start_time >= DATEADD(day, -1, CURRENT_TIMESTAMP())
  AND total_elapsed_time > 30000
ORDER BY total_elapsed_time DESC
LIMIT 20;`}
        </CodeBox>
        <Table
          headers={['Signal in Query Profile', 'What it means', 'Typical fix']}
          rows={[
            ['High partitions scanned relative to total.', 'Poor pruning.', 'Rewrite filter to avoid wrapping columns; check clustering quality.'],
            ['Large spillage to local storage.', 'Warehouse memory undersized for this query.', 'Increase warehouse size, or reduce intermediate result size (fewer columns, earlier filters).'],
            ['Large spillage to remote storage.', 'Severe undersizing — even local disk overflowed.', 'Strong signal to resize up, or restructure the query to reduce working-set size.'],
            ['One join or aggregation node dominating time with low bytes scanned.', 'Compute-bound step, not I/O-bound.', 'A bigger warehouse can genuinely help here.'],
            ['Everything fast except queueing before the query even starts.', 'Concurrency problem, not a single-query problem.', 'Multi-cluster warehouse or workload isolation, not warehouse size.'],
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — The three caches, tuning-specific guidance" />
        <SectionTitle>Know Which Cache Is Helping Before You Credit a Fast Rerun to Your Tuning</SectionTitle>
        <Para>
          Snowflake's caches can make a poorly-tuned query look fast the second time you run it, which is a
          classic benchmarking trap. Before concluding a fix worked, understand which cache made the second
          run fast — otherwise you may ship a change that only helped because of a warm cache, not because
          the query itself improved.
        </Para>
        <Table
          headers={['Cache', 'What it does', 'Tuning-specific guidance']}
          rows={[
            ['Result cache', 'Returns the exact prior result for an identical query against unchanged data, without using warehouse compute at all.', 'Never benchmark tuning changes by rerunning the exact same SQL — you may just be hitting the result cache. Vary a literal, or use a comment, to force real execution.'],
            ['Warehouse (local disk) cache', 'A running warehouse keeps recently-scanned data cached locally, making repeat scans of the same partitions faster.', 'Benchmark on a warehouse that has been suspended and resumed (cold) as well as one that is already warm — production queries hit both states depending on traffic and auto-suspend settings.'],
            ['Metadata cache', 'Stores partition metadata used for planning and pruning decisions.', 'This cache being warm does not fix bad filters — it only speeds up planning, not a query that scans too much data regardless.'],
          ]}
        />
        <Callout title="Benchmark cold, not just warm">
          A query that looks instant right after you tune it may just be warm from your own testing.
          Re-test after a warehouse auto-suspend cycle, or on a freshly resumed warehouse, before declaring
          the fix worked in a realistic production scenario.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Warehouse sizing, correctly understood" />
        <SectionTitle>A Bigger Warehouse Only Helps a Compute-Bound Query</SectionTitle>
        <Para>
          This is the single most common misconception in Snowflake performance work: that increasing
          warehouse size is a general-purpose speed fix. Warehouse size controls how much compute and memory
          is available to execute a query — more CPU, more memory, more parallelism within a single query.
          It does nothing to reduce how much data the query has to scan in the first place. If a query is
          slow because it scanned ten times more data than it needed to due to poor pruning, doubling the
          warehouse size roughly halves the time spent processing that unnecessarily large scan — it does
          not fix the scan being unnecessarily large.
        </Para>
        <CodeBox label="Same query, three warehouse sizes, an I/O-bound case">{`-- If GOLD.ORDERS is poorly pruned on this filter, all three of these
-- runs still scan roughly the same excessive number of partitions.
-- A bigger warehouse processes that same excessive scan faster, but
-- the real fix is the filter/clustering, not the warehouse size.
USE WAREHOUSE WH_ANALYTICS_XS;
SELECT customer_id, SUM(total_usd) FROM GOLD.ORDERS WHERE DATE(order_ts) = '2026-09-01' GROUP BY 1;

USE WAREHOUSE WH_ANALYTICS_M;
SELECT customer_id, SUM(total_usd) FROM GOLD.ORDERS WHERE DATE(order_ts) = '2026-09-01' GROUP BY 1;

USE WAREHOUSE WH_ANALYTICS_L;
SELECT customer_id, SUM(total_usd) FROM GOLD.ORDERS WHERE DATE(order_ts) = '2026-09-01' GROUP BY 1;`}
        </CodeBox>
        <Table
          headers={['Bottleneck type', 'Symptom in Query Profile', 'Does a bigger warehouse help?']}
          rows={[
            ['I/O-bound (poor pruning).', 'Most partitions scanned regardless of filter selectivity.', 'Marginally — same excessive scan completes somewhat faster, cost per query still rises.'],
            ['Compute-bound (heavy joins/aggregations on well-pruned data).', 'Time concentrated in join/aggregate operator nodes, scan itself is small.', 'Yes — more CPU and memory directly reduces processing time.'],
            ['Memory-bound (spillage).', 'Bytes spilled to local or remote storage.', 'Yes, often significantly — more memory per node avoids the spill entirely.'],
            ['Concurrency-bound (queueing).', 'Query waits before execution even starts; execution itself is fast.', 'No — this needs a multi-cluster warehouse or workload separation, not a bigger single warehouse.'],
          ]}
        />
        <Callout title="Diagnose before resizing" color="#ef4444">
          Resizing a warehouse before reading Query Profile is guessing with real money. Confirm the
          bottleneck is actually compute, memory, or concurrency — not scan volume — before assuming a larger
          warehouse will fix anything.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Multi-cluster warehouses and concurrency" />
        <SectionTitle>Multi-Cluster Warehouses Solve Concurrency, Not Single-Query Speed</SectionTitle>
        <Para>
          A single warehouse, regardless of size, runs a limited number of concurrent queries efficiently
          before new queries start queueing. Multi-cluster warehouses add additional clusters of the same
          size to absorb concurrent load — this speeds up the system under many simultaneous users, but does
          nothing for the runtime of any one individual query. Confusing "many users are waiting" with "my
          query is slow" leads to the wrong fix every time.
        </Para>
        <CodeBox label="Multi-cluster warehouse for concurrency">{`ALTER WAREHOUSE WH_BI_M SET
  MIN_CLUSTER_COUNT = 1
  MAX_CLUSTER_COUNT = 4
  SCALING_POLICY = 'STANDARD';

-- Check whether queueing was actually the problem:
SELECT
  query_id,
  execution_status,
  queued_provisioning_time,
  queued_overload_time,
  total_elapsed_time
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE warehouse_name = 'WH_BI_M'
  AND start_time >= DATEADD(hour, -6, CURRENT_TIMESTAMP())
ORDER BY queued_overload_time DESC
LIMIT 20;`}
        </CodeBox>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Rewriting queries before resizing" />
        <SectionTitle>Cheap Fixes Usually Come Before Expensive Ones</SectionTitle>
        <Para>
          A large share of Snowflake performance problems are fixed entirely in SQL, at zero ongoing cost,
          before any warehouse or table-design change is needed. This is the cheapest tier of tuning and
          should always be attempted first.
        </Para>
        <Table
          headers={['Anti-pattern', 'Fix']}
          rows={[
            ['SELECT * on a wide table when only a few columns are needed.', 'Select only the columns actually used — Snowflake\'s columnar storage means unused columns cost nothing to skip.'],
            ['Filtering with DATE(order_ts) = ... or other function-wrapped columns.', 'Compare the raw column with a range filter instead.'],
            ['Filtering after a large join instead of before it.', 'Push filters as early as possible so less data flows into expensive joins.'],
            ['Repeating the same expensive subquery multiple times in one statement.', 'Use a CTE or intermediate table so the work happens once.'],
            ['Joining on mismatched or implicitly cast data types.', 'Match types explicitly so the optimizer can plan the join efficiently.'],
          ]}
        />
        <Callout title="Order of operations for a slow query">
          Read Query Profile, fix filters and column selection, check pruning and clustering quality, then —
          only if the bottleneck is genuinely compute, memory, or concurrency — adjust warehouse size or
          cluster count.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 11 — Anti-patterns" />
        <SectionTitle>Performance Tuning Anti-Patterns</SectionTitle>
        <Callout title="Avoid these" color="#ef4444">
          <BulletList
            items={[
              'Resizing the warehouse before opening Query Profile even once.',
              'Wrapping filtered columns in functions and wondering why pruning looks bad.',
              'Adding a clustering key to a small table that never needed one.',
              'Enabling search optimization on every column "just in case" instead of columns with real point-lookup traffic.',
              'Benchmarking a fix only on a warm cache and declaring victory.',
              'Treating multi-cluster warehouses as a fix for a single slow query.',
              'Optimizing a one-off query instead of the top recurring expensive queries that actually drive the bill.',
              'Never re-checking clustering quality on tables that grow and change for years.',
            ]}
          />
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 12 — Table design choices that affect performance" />
        <SectionTitle>Schema and File-Loading Decisions Set the Ceiling Before Any Query Runs</SectionTitle>
        <Para>
          Pruning and clustering quality do not start at query time — they are shaped by decisions made much
          earlier, when tables are designed and loaded. A table that is loaded in small, frequent, unordered
          batches from many sources will naturally cluster worse than one loaded in large, time-ordered
          batches, no matter how carefully queries against it are written later.
        </Para>
        <Table
          headers={['Design/load decision', 'Effect on later performance']}
          rows={[
            ['Loading data roughly in timestamp order.', 'Naturally clusters well on that timestamp with zero extra configuration.'],
            ['Frequent small trickle loads from many unordered sources.', 'Degrades natural clustering over time, hurting pruning even with good queries.'],
            ['Wide tables with many rarely-used columns.', 'Columnar storage limits the damage, but SELECT * still pays for every column materialized.'],
            ['Splitting one huge multi-purpose table into purpose-specific tables.', 'Smaller, more targeted tables often prune and scan better than one giant table serving every use case.'],
            ['Frequent full-table UPDATE or DELETE operations.', 'Rewrites large numbers of micro-partitions, actively working against clustering quality.'],
          ]}
        />
        <Callout title="Ingestion pattern is a performance decision, not just a loading detail">
          Choosing to batch-load in time order, or to route a high-churn dimension into its own smaller
          table, is a performance decision made at pipeline-design time — long before anyone writes the
          first analytical query against the result.
        </Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 13 — A performance tuning checklist" />
        <SectionTitle>A Repeatable Sequence for Any Slow Query</SectionTitle>
        <Para>
          Individual tools matter less than following them in a consistent order. This checklist is the
          practical distillation of everything above, in the sequence that avoids wasted effort and wasted
          credits.
        </Para>
        <BulletList
          items={[
            '1. Open Query Profile for the actual slow run, not a guess about what "should" be slow.',
            '2. Check partitions scanned vs. partitions total — is this a pruning problem?',
            '3. If pruning is poor, check the filter for function-wrapped columns before touching the table.',
            '4. If the filter is already clean, check SYSTEM$CLUSTERING_INFORMATION on the filtered column.',
            '5. Check for spillage to local or remote storage — a memory sizing problem, not a pruning one.',
            '6. Check queueing time separately from execution time — a concurrency problem needs a different fix than a slow single query.',
            '7. Only after 1-6, consider warehouse size or cluster count changes, and re-verify on a cold warehouse.',
            '8. Re-run the same diagnostic on the query\'s regular production schedule, not just once in isolation, to confirm the fix holds under real load.',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 14 — Choosing a clustering key on a real fact table" />
        <SectionTitle>Every Clustering Key Candidate Is a Trade Between Pruning Gain and Maintenance Cost</SectionTitle>
        <Para>
          Part 04 introduced CLUSTER BY and warned that reclustering is ongoing background compute, not a
          one-time action. That warning matters most on exactly the tables people are tempted to cluster: a
          multi-billion-row fact table that every dashboard filters. Picking the wrong key on a table that
          size can mean paying real, continuous reclustering credits for years to fix a problem a different
          key choice would have solved for free, or that natural clustering was already solving.
        </Para>
        <Para>
          Consider a `GOLD.FCT_ORDERS` table with 4 billion rows, ingested continuously from many regional
          sources, and queried three different ways by three different teams: finance filters by
          `order_date` for monthly close, support filters by `customer_id` for one-off lookups, and regional
          ops filters by `warehouse_region` and `order_date` together. Only one of these can realistically be
          the primary clustering key, because clustering optimizes physical layout for the columns it is
          defined on — it does not make every possible filter equally fast.
        </Para>
        <CodeBox label="Comparing candidate keys before committing to one">{`-- Check current clustering quality for each candidate independently
SELECT SYSTEM$CLUSTERING_INFORMATION('GOLD.FCT_ORDERS', '(order_date)');
SELECT SYSTEM$CLUSTERING_INFORMATION('GOLD.FCT_ORDERS', '(customer_id)');
SELECT SYSTEM$CLUSTERING_INFORMATION('GOLD.FCT_ORDERS', '(warehouse_region, order_date)');

-- average_depth close to 1 means that candidate is already well organized
-- for its filter pattern -- often true for order_date, since rows tend
-- to land in roughly time order even without an explicit key.
-- A high and rising average_depth on customer_id is expected: customer
-- activity is scattered across every day's data, uncorrelated with
-- insertion order, and clustering on it would fight the table's natural
-- time-ordered layout on every single load.`}
        </CodeBox>
        <Para>
          Also weigh the cardinality shape of each candidate, not just how it correlates with load order. A
          key with too few distinct values (a boolean flag, a two-value status column) gives the optimizer
          almost nothing to prune on even if it's perfectly maintained, because too many rows share the same
          min/max range inside every partition. A key with extremely high cardinality and no natural
          correlation to insertion order, like a UUID, clusters poorly no matter how much background
          reclustering runs, because there is no physical order to converge toward.
        </Para>
        <Table
          headers={['Candidate key', 'Matches natural load order?', 'Query pattern it serves', 'Verdict']}
          rows={[
            ['order_date', 'Yes — rows load in roughly time order already.', "Finance's monthly close filters.", 'Skip an explicit key; natural clustering already gives low average_depth.'],
            ['customer_id', 'No — customer activity is scattered across every day.', "Support's one-off point lookups.", 'Wrong tool entirely — this is a search optimization service problem (Part 05), not a clustering one.'],
            ['(warehouse_region, order_date)', 'Partially — region groups exist, but reclustering must maintain two dimensions at once.', "Regional ops' combined filter.", 'Worth it only if this query pattern is high-volume enough to justify ongoing reclustering cost.'],
          ]}
        />
        <Para>
          The reasoning pattern that generalizes: check `SYSTEM$CLUSTERING_INFORMATION` for every candidate
          before choosing one, match the key to the single highest-value query pattern rather than trying to
          serve all three teams with one key, and route the truly scattered high-cardinality lookup
          (`customer_id`) to search optimization instead of forcing clustering to solve a problem it is not
          suited for. On a 4-billion-row table ingesting continuously, an explicit key that fights natural
          load order can mean the reclustering background service is perpetually behind, which shows up as
          rising credit consumption with no corresponding query-speed improvement to show for it.
        </Para>
        <Callout title="Re-check clustering quality after choosing a key, not just before" color="#ef4444">
          A key that looked good in `SYSTEM$CLUSTERING_INFORMATION` on day one can still degrade under a load
          pattern the initial check didn't fully capture — a backfill, a new upstream source landing
          out-of-order data, or a change in how frequently rows are updated. Schedule a periodic re-check
          rather than assuming the initial choice holds forever.
        </Callout>
        <Para>
          The broader lesson generalizes past this one table: a clustering key decision is never really about
          "will this make queries faster" in isolation — it is a bet that a specific query pattern is valuable
          and stable enough to justify paying for its physical organization continuously, forever, as the
          table keeps changing. On a table that receives 4 billion rows and grows for years, that bet compounds.
          Revisit it on the same cadence as any other standing infrastructure cost, not just once at
          rollout time.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 15 — Warehouse contention and queueing" />
        <SectionTitle>A Query Waiting to Start Is a Different Problem Than a Query Running Slowly</SectionTitle>
        <Para>
          Part 08's bottleneck table already separated "concurrency-bound" from I/O-, compute-, and
          memory-bound cases, but queueing deserves its own treatment because it is the bottleneck most often
          misdiagnosed as "the warehouse is too small." A warehouse that is fully busy running other queries
          makes a new query wait before it even starts — that wait shows up in total elapsed time, but no
          amount of Query Profile tuning on the query itself will fix it, because the query hasn't started
          executing yet.
        </Para>
        <CodeBox label="Checking whether a warehouse is actually saturated">{`SELECT
  warehouse_name,
  start_time,
  avg_running,
  avg_queued_load,
  avg_queued_provisioning
FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_LOAD_HISTORY
WHERE warehouse_name = 'WH_BI_M'
  AND start_time >= DATEADD(day, -7, CURRENT_TIMESTAMP())
ORDER BY start_time DESC;

-- avg_running close to the warehouse's max concurrent-query capacity,
-- combined with avg_queued_load consistently above zero, means queries
-- are genuinely piling up waiting for a slot -- not just occasionally
-- overlapping.`}
        </CodeBox>
        <Table
          headers={['Pattern in WAREHOUSE_LOAD_HISTORY', 'What it means', 'Right fix']}
          rows={[
            ['avg_running high, avg_queued_load near zero.', 'Warehouse is busy but keeping up — no real queueing problem.', 'Nothing — this is healthy utilization, not contention.'],
            ['avg_running high, avg_queued_load consistently above zero.', 'More concurrent queries arrive than the warehouse can run at once.', 'Multi-cluster warehouse (adds capacity for concurrent load) or route a workload to a second, separate warehouse.'],
            ['avg_running low, individual queries still slow.', 'Not a concurrency problem — the queries themselves are slow once running.', 'Query Profile on the individual query (Part 06); a bigger single warehouse may genuinely help if compute-bound.'],
            ['avg_queued_provisioning high, avg_queued_load low.', 'Warehouse is cold-starting (auto-resume) rather than contending with other queries.', 'Consider a longer auto-suspend window or a always-on warehouse for latency-sensitive workloads.'],
          ]}
        />
        <Para>
          The choice between a bigger warehouse, a multi-cluster warehouse, and a second dedicated warehouse
          is really a choice about what kind of load is competing. If one BI dashboard's queries are
          individually slow but never overlap with other queries, resizing that single warehouse up is the
          right move — it is a compute problem. If dozens of analysts hit the same warehouse at 9 AM and
          queries queue behind each other despite each one being individually fast, that is concurrency, and
          the fix is `MAX_CLUSTER_COUNT` on that warehouse (Part 09), not a bigger warehouse size. If a
          scheduled transformation task and ad hoc BI queries are fighting over the same warehouse's slots at
          all hours, the fix is neither — it's giving the task pipeline its own dedicated warehouse so a
          heavy nightly load never queues out an analyst's dashboard refresh, and vice versa.
        </Para>
        <CodeBox label="Splitting contending workloads onto dedicated warehouses">{`-- Instead of one shared WH_ANALYTICS_M serving both BI and transform tasks:
CREATE WAREHOUSE IF NOT EXISTS WH_BI_M
  WAREHOUSE_SIZE = 'MEDIUM'
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE;

CREATE WAREHOUSE IF NOT EXISTS WH_TRANSFORM_M
  WAREHOUSE_SIZE = 'MEDIUM'
  AUTO_SUSPEND = 60
  AUTO_RESUME = TRUE;

-- Point scheduled tasks at WH_TRANSFORM_M and BI tools at WH_BI_M so a
-- heavy nightly MERGE never queues out a live dashboard query, and a
-- burst of dashboard traffic never delays a time-sensitive pipeline.`}
        </CodeBox>
        <Callout title="Diagnose the load pattern before picking a fix">
          `WAREHOUSE_LOAD_HISTORY` tells you which of these three situations you're actually in. Resizing,
          adding clusters, and splitting into separate warehouses solve three different problems — applying
          the wrong one wastes credits without fixing the queueing.
        </Callout>
        <Para>
          It is worth stating the failure mode plainly, because it is common: a team sees dashboards timing
          out at 9 AM, assumes the warehouse is "too slow," and doubles its size. Elapsed time drops a little
          because the few queries that do get a slot finish faster, but the queue barely shrinks, because the
          bottleneck was never any single query's compute — it was too many queries competing for too few
          concurrent slots. The credit bill roughly doubles for a problem that a `MAX_CLUSTER_COUNT` increase,
          costing nothing until it actually scales out, would have solved directly.
        </Para>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 16 — Hands-on lab" />
        <SectionTitle>Hands-On Lab: Diagnose and Fix a Slow Query</SectionTitle>
        <Para>
          This lab walks through the exact sequence a Snowflake engineer follows in production: find the
          slow query, read its profile, identify the real bottleneck, fix it, and re-verify on a cold
          warehouse.
        </Para>
        <CodeBox label="Step 1 — the slow query as originally written">{`-- Reported slow by a dashboard owner
SELECT o.customer_id, SUM(o.total_usd) AS revenue
FROM GOLD.ORDERS o
WHERE DATE(o.order_ts) = '2026-09-01'
GROUP BY o.customer_id
ORDER BY revenue DESC;`}
        </CodeBox>
        <CodeBox label="Step 2 — pull it from query history and inspect">{`SELECT
  query_id,
  total_elapsed_time / 1000 AS elapsed_sec,
  bytes_scanned,
  bytes_spilled_to_local_storage,
  bytes_spilled_to_remote_storage
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE query_text ILIKE '%DATE(o.order_ts) = ''2026-09-01''%'
ORDER BY start_time DESC
LIMIT 1;

-- Open this query_id in Snowsight Query Profile.
-- Finding: partitions scanned is nearly 100% of the table, despite
-- the filter matching only one day out of a multi-year table. No
-- spillage. The bottleneck is pruning, not compute or memory.`}
        </CodeBox>
        <CodeBox label="Step 3 — check clustering, then rewrite the filter">{`SELECT SYSTEM$CLUSTERING_INFORMATION('GOLD.ORDERS', '(order_ts)');
-- average_depth is low: the table is naturally well-clustered on
-- order_ts. The problem is purely that DATE(o.order_ts) hides the
-- raw column from pruning -- clustering was never the issue.

SELECT o.customer_id, SUM(o.total_usd) AS revenue
FROM GOLD.ORDERS o
WHERE o.order_ts >= '2026-09-01' AND o.order_ts < '2026-09-02'
GROUP BY o.customer_id
ORDER BY revenue DESC;`}
        </CodeBox>
        <CodeBox label="Step 4 — verify on a cold warehouse, not a warm cache">{`ALTER WAREHOUSE WH_ANALYTICS_S SUSPEND;
ALTER WAREHOUSE WH_ANALYTICS_S RESUME;

-- Re-run the rewritten query and re-check bytes_scanned and
-- elapsed_time in QUERY_HISTORY. Confirm partitions scanned dropped
-- close to the true selectivity of a single day out of years of data,
-- and that the improvement holds cold, not just from a warm cache.`}
        </CodeBox>
        <SubTitle>Lab questions</SubTitle>
        <BulletList
          items={[
            'Why did the original query scan nearly the whole table despite filtering to one day?',
            'Why did SYSTEM$CLUSTERING_INFORMATION rule out clustering as the problem here?',
            'Why is suspending and resuming the warehouse important before declaring the fix successful?',
            'If bytes_spilled_to_local_storage had been high instead, what would the fix have been instead of a filter rewrite?',
            'If this query had been fast to execute but slow to start, what would you check instead?',
          ]}
        />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 17 — Interview answer" />
        <SectionTitle>How to Explain Performance Tuning in an Interview</SectionTitle>
        <Para>
          A strong answer sounds like this: I start with Query Profile, not warehouse size, because it shows
          what actually happened — bytes scanned versus bytes pruned, spillage to local or remote storage,
          and which operator node consumed the most time. If pruning is poor, I check whether the filter
          wraps the column in a function that hides it from the optimizer, and I check natural clustering
          quality with SYSTEM$CLUSTERING_INFORMATION before considering an explicit clustering key, because
          clustering has an ongoing maintenance cost. For highly selective point lookups on non-clustered
          columns, I'd evaluate the search optimization service instead, since that is a different problem
          than range-filter pruning. I only resize the warehouse once I've confirmed the bottleneck is
          genuinely compute, memory spillage, or concurrency queueing — a bigger warehouse does not fix a
          query that is scanning too much data, it just processes that excess scan faster and more
          expensively. And I re-benchmark on a cold, freshly resumed warehouse, because result and warehouse
          caches can make an untuned query look fast on a rerun.
        </Para>
        <SubTitle>Questions you should answer out loud</SubTitle>
        <BulletList
          items={[
            'What is micro-partition pruning and why does it matter more than warehouse size for many slow queries?',
            'Why does wrapping a filtered column in a function hurt pruning?',
            'When would you add an explicit clustering key, and what does it cost on an ongoing basis?',
            'What problem does the search optimization service solve that clustering does not?',
            'What does bytes spilled to local vs. remote storage tell you in Query Profile?',
            'Why doesn\'t a bigger warehouse always make a slow query faster?',
            'What is the difference between a multi-cluster warehouse and a bigger single warehouse?',
          ]}
        />
      </section>

      <KeyTakeaways
        items={[
          'Micro-partition pruning — skipping partitions whose min/max metadata rules them out — is the biggest lever for large-table query speed, ahead of warehouse size.',
          'Filters that wrap a column in a function (DATE(), CAST(), etc.) hide the raw value from pruning; compare raw columns with range filters instead.',
          'Most tables cluster well naturally from ordinary load order; check SYSTEM$CLUSTERING_INFORMATION before adding an explicit CLUSTER BY key, which carries ongoing reclustering cost.',
          'The search optimization service targets a different problem than clustering: highly selective point lookups on non-clustered, high-cardinality columns.',
          'Query Profile is the evidence for tuning decisions — bytes scanned vs. pruned, spillage to local/remote storage, and the most expensive operator nodes tell you the real bottleneck.',
          'Result cache, warehouse cache, and metadata cache can all make a rerun look fast for reasons unrelated to your tuning fix — benchmark cold as well as warm.',
          'A bigger warehouse only helps a compute-, memory-, or concurrency-bound query; it does nothing for a query that is simply scanning too much data due to poor pruning.',
          'Multi-cluster warehouses solve concurrency (many simultaneous queries), not the runtime of any single query.',
        ]}
      />
    </LearnLayout>
  )
}
