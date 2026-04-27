import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Query Processing & Optimization — Complete Guide | DBMS | Chaduvuko',
  description:
    'How a database turns your SQL into a result — parsing, query trees, relational algebra transformations, cost estimation, join algorithms, the query optimiser, execution plans, and how to read and improve EXPLAIN output in production.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)',
    fontWeight: 900, letterSpacing: '-1px',
    color: 'var(--text)', marginBottom: 18,
    fontFamily: 'Syne, sans-serif', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)',
    fontWeight: 700, letterSpacing: '-0.3px',
    color: 'var(--text)', marginBottom: 12,
  }}>{children}</h3>
)

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{
    fontSize: 15, fontWeight: 700,
    color: 'var(--text)', marginBottom: 10,
  }}>{children}</h4>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontSize: 15, color: 'var(--text)',
    lineHeight: 1.9, marginBottom: 20,
  }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 20 }}>
    {label && (
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        letterSpacing: '.1em', textTransform: 'uppercase',
        marginBottom: 6, fontFamily: 'var(--font-mono)',
      }}>{label}</div>
    )}
    <pre style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '18px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.9, color: 'var(--text2)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

export default function QueryProcessing() {
  return (
    <LearnLayout
      title="Query Processing & Optimization"
      description="What actually happens between typing a SQL query and seeing results — parsing, algebra transformation, cost estimation, join algorithms, and how the database chooses the fastest execution plan."
      section="DBMS"
      readTime="85–100 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — THE PIPELINE
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — The Pipeline" />
        <SectionTitle>What Happens When You Run a SQL Query — The Complete Pipeline</SectionTitle>

        <Para>
          You type a SQL query and press Enter. In less than a millisecond, the database
          returns thousands of rows sorted, filtered, joined, and aggregated exactly as
          you asked. What happened in that millisecond is a remarkably sophisticated process
          involving parsing, semantic analysis, algebraic transformation, cost estimation,
          physical plan selection, and execution. Understanding this pipeline is what
          separates engineers who write SQL from engineers who understand why some
          SQL queries are fast and others are catastrophically slow.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 28 }}>
          {[
            {
              step: '01',
              name: 'Parser',
              color: '#0078d4',
              input: 'SQL text string',
              output: 'Parse tree (abstract syntax tree)',
              what: 'Checks SQL syntax using a formal grammar. Produces a tree structure representing the query structure. Fails here on syntax errors — misspelled keywords, missing commas, unmatched parentheses.',
            },
            {
              step: '02',
              name: 'Semantic Analyser',
              color: '#0078d4',
              input: 'Parse tree',
              output: 'Annotated parse tree / query tree',
              what: 'Checks semantic correctness against the database catalog: do the referenced tables exist? Do the columns exist in those tables? Are the data types compatible? Does the user have permission? Fails here on "table not found" or "column does not exist" errors.',
            },
            {
              step: '03',
              name: 'Query Rewriter',
              color: 'var(--accent)',
              input: 'Query tree',
              output: 'Rewritten query tree',
              what: 'Applies rule-based transformations that are always beneficial: expand views to their underlying queries, apply integrity constraints, unnest subqueries where possible, apply predicate pushdown as a mandatory step.',
            },
            {
              step: '04',
              name: 'Query Optimiser',
              color: 'var(--accent)',
              input: 'Rewritten query tree',
              output: 'Optimal physical execution plan',
              what: 'The heart of query processing. Considers thousands of possible execution plans (different join orders, different algorithms for each operation, different index choices). Uses cost models and statistics to estimate the cost of each plan. Selects the plan with the lowest estimated cost.',
            },
            {
              step: '05',
              name: 'Execution Engine',
              color: '#f97316',
              input: 'Physical execution plan',
              output: 'Query result rows',
              what: 'Executes the chosen plan. Reads data pages from the buffer pool or disk, applies operators (scan, filter, join, sort, aggregate) in the plan order, and streams results back to the client.',
            },
          ].map((item, i) => (
            <div key={item.step} style={{
              display: 'flex', gap: 0,
              borderBottom: i < 4 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{
                background: `${item.color}10`, borderRight: '1px solid var(--border)',
                padding: '16px 14px', minWidth: 60,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 900, color: item.color }}>{item.step}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', textAlign: 'center', lineHeight: 1.3 }}>{item.name}</span>
              </div>
              <div style={{ padding: '16px 20px', flex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto 1fr', gap: '4px 12px', marginBottom: 8, fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>In:</span>
                  <span style={{ color: item.color }}>{item.input}</span>
                  <span style={{ color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Out:</span>
                  <span style={{ color: item.color }}>{item.output}</span>
                </div>
                <Para>{item.what}</Para>
              </div>
            </div>
          ))}
        </div>

        <Para>
          The most important stage by far is the Query Optimiser — step 04.
          The difference between the fastest and slowest plan for a complex query
          can be five or six orders of magnitude: 2 milliseconds vs 30 minutes.
          The optimiser's job is to find the fast plan. Understanding how it works
          lets you write queries that are easy for the optimiser to handle — and
          diagnose when it makes a suboptimal choice.
        </Para>
      </section>

      {/* ========================================
          PART 2 — RELATIONAL ALGEBRA
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — Relational Algebra" />
        <SectionTitle>Relational Algebra — The Internal Language of Query Processing</SectionTitle>

        <Para>
          SQL is a declarative language — you specify what you want, not how to get it.
          Internally, the database translates SQL into
          <strong style={{ color: 'var(--accent)' }}> relational algebra</strong> — a procedural
          language of set operations where each operator takes one or two relations as
          input and produces a relation as output. Unlike SQL, relational algebra expressions
          specify a precise order of operations. The query optimiser manipulates relational
          algebra expressions to find the most efficient ordering.
        </Para>

        <SubTitle>The Core Relational Algebra Operators</SubTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
          {[
            {
              symbol: 'σ',
              name: 'Selection (σ)',
              color: '#0078d4',
              sql: 'WHERE clause',
              definition: 'Filters rows. σ_condition(R) returns all rows from relation R where the condition is true.',
              example: 'σ_{city=\'San Francisco\'}(customers) — all customers in San Francisco',
              cost: 'O(n) — must examine every row unless an index exists. With index on the selection attribute: O(log n + k) where k = matching rows.',
              algebraic: 'σ_{A=v}(R)',
            },
            {
              symbol: 'π',
              name: 'Projection (π)',
              color: 'var(--accent)',
              sql: 'SELECT column list',
              definition: 'Selects specific columns. π_{col1,col2,...}(R) returns only the specified columns from all rows.',
              example: 'π_{name, city}(customers) — only name and city columns',
              cost: 'O(n) — must process every row. If DISTINCT is required, additional sort or hash step: O(n log n).',
              algebraic: 'π_{A1,A2,...}(R)',
            },
            {
              symbol: '⋈',
              name: 'Natural Join (⋈)',
              color: '#f97316',
              sql: 'JOIN ... ON (equality on common attributes)',
              definition: 'Combines rows from two relations where values of common attributes match. Automatically joins on all attributes with the same name.',
              example: 'orders ⋈ customers — join on customer_id (common attribute)',
              cost: 'Depends on algorithm: O(n²) naive, O(n+m) hash join, O(n log m) sort-merge join.',
              algebraic: 'R ⋈ S',
            },
            {
              symbol: '×',
              name: 'Cartesian Product (×)',
              color: '#ff4757',
              sql: 'CROSS JOIN or comma-separated FROM without condition',
              definition: 'Returns every combination of rows from two relations. If R has m rows and S has n rows, R × S has m×n rows.',
              example: 'customers × restaurants — every customer-restaurant pair',
              cost: 'O(m×n) — exponentially expensive. A join with predicate is always preferred.',
              algebraic: 'R × S',
            },
            {
              symbol: '∪',
              name: 'Union (∪)',
              color: '#8b5cf6',
              sql: 'UNION',
              definition: 'Returns all rows from either relation, eliminating duplicates. Both relations must have the same schema.',
              example: 'active_customers ∪ premium_customers',
              cost: 'O(m+n) for union all; O((m+n) log(m+n)) for union with deduplication.',
              algebraic: 'R ∪ S',
            },
            {
              symbol: '−',
              name: 'Difference (−)',
              color: '#facc15',
              sql: 'EXCEPT',
              definition: 'Returns rows in the first relation that are not in the second.',
              example: 'all_customers − customers_with_orders',
              cost: 'O((m+n) log(m+n)) with sort; O(m+n) with hash.',
              algebraic: 'R − S',
            },
            {
              symbol: 'ρ',
              name: 'Rename (ρ)',
              color: '#e879f9',
              sql: 'AS alias',
              definition: 'Renames a relation or its attributes. Necessary when self-joining a table to give each copy a distinct name.',
              example: 'ρ_{mgr}(employees) — rename employees to mgr for the manager copy',
              cost: 'O(1) — purely a metadata operation, no data movement.',
              algebraic: 'ρ_{new_name}(R)',
            },
          ].map((item) => (
            <div key={item.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '18px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: item.color, fontFamily: 'serif', lineHeight: 1, minWidth: 30 }}>{item.symbol}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', marginTop: 2 }}>SQL equivalent: {item.sql}</div>
                </div>
                <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 13, color: item.color, background: `${item.color}0e`, border: `1px solid ${item.color}25`, borderRadius: 6, padding: '4px 10px' }}>{item.algebraic}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 10 }}>
                {[
                  ['Definition', item.definition],
                  ['Example', item.example],
                  ['Cost', item.cost],
                ].map(([label, value]) => (
                  <div key={label} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 7, padding: '10px 14px' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: item.color, marginBottom: 5, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{label}</div>
                    <Para>{value}</Para>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <SubTitle>SQL to Relational Algebra — The Translation</SubTitle>

        <CodeBox label="SQL query → relational algebra expression">
{`-- SQL QUERY:
SELECT c.name, o.total_amount
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE c.city = 'San Francisco'
  AND o.status = 'delivered'
ORDER BY o.total_amount DESC;

-- NAIVE RELATIONAL ALGEBRA TRANSLATION (what a simple parser produces):
π_{c.name, o.total_amount} (
  σ_{order_by: total_amount DESC} (
    σ_{c.city='San Francisco' AND o.status='delivered'} (
      customers ⋈_{c.customer_id=o.customer_id} orders
    )
  )
)

-- This reads:
-- 1. Form the join of customers and orders (EXPENSIVE — all rows combined first)
-- 2. Filter by city AND status (filter happens AFTER the expensive join)
-- 3. Project to name and total_amount
-- 4. Sort by total_amount DESC

-- OPTIMISED RELATIONAL ALGEBRA (what the optimiser produces):
π_{c.name, o.total_amount} (
  sort_{total_amount DESC} (
    σ_{city='San Francisco'}(customers)
    ⋈_{customer_id=customer_id}
    σ_{status='delivered'}(orders)
  )
)

-- This reads:
-- 1. Filter customers to only San Francisco customers FIRST (reduces rows from 10M to 50K)
-- 2. Filter orders to only delivered FIRST (reduces rows from 50M to 20M)
-- 3. Join the two reduced relations (much smaller input to the join)
-- 4. Project to name and total_amount
-- 5. Sort the result

-- The key optimisation: PREDICATE PUSHDOWN
-- Push filters (σ) as close to the data source as possible.
-- Reduces the size of intermediate results at every step.`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 3 — QUERY OPTIMISATION RULES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — Algebraic Equivalences" />
        <SectionTitle>Algebraic Equivalences — The Rules the Optimiser Uses to Transform Queries</SectionTitle>

        <Para>
          The query optimiser applies algebraic equivalences to transform a query tree
          into an equivalent but cheaper form. Two relational algebra expressions are
          equivalent if they produce exactly the same result for every valid database
          instance. These equivalences are the mathematical foundation of query optimisation —
          the optimiser applies them systematically to search the space of equivalent plans.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
          {[
            {
              rule: 'Predicate Pushdown (Selection Pushdown)',
              color: 'var(--accent)',
              importance: 'THE most impactful optimisation',
              description: 'Selections can be pushed through joins. Apply filters as early as possible — before the join — to reduce the number of rows that the join must process.',
              equivalence: 'σ_{condition}(R ⋈ S) ≡ σ_{condition_on_R}(R) ⋈ S  (when condition only involves R\'s attributes)',
              impact: 'Reducing customers from 10M rows to 50K before joining with orders reduces the join input by 200x.',
              sqlExample: '-- Before pushdown: join all rows, then filter\nSELECT * FROM orders o JOIN customers c ON o.customer_id = c.customer_id\nWHERE c.city = \'San Francisco\';\n-- After pushdown (done automatically by optimiser):\n-- Filter customers first → join smaller set',
            },
            {
              rule: 'Projection Pushdown',
              color: '#0078d4',
              importance: 'Reduces row width early',
              description: 'Projections can be pushed through joins when the projected columns are not needed by the join condition. Carrying fewer columns through intermediate results reduces memory and I/O.',
              equivalence: 'π_{A1,A2}(R ⋈ S) ≡ π_{A1,A2}(π_{A1,join_col}(R) ⋈ π_{A2,join_col}(S))',
              impact: 'If a row is 500 bytes and you only need 50 bytes of it, pushing projection reduces intermediate result size by 10x.',
              sqlExample: '-- Only need name and total_amount, but join requires customer_id\n-- Optimiser projects each table to only needed columns before joining',
            },
            {
              rule: 'Join Commutativity',
              color: '#f97316',
              importance: 'Enables join reordering',
              description: 'Joins are commutative — R ⋈ S = S ⋈ R. The optimiser uses this to try the smaller relation first, placing it in the "build" phase of a hash join for better memory usage.',
              equivalence: 'R ⋈ S ≡ S ⋈ R',
              impact: 'Always build the hash table from the smaller relation. For a 100-row and 10M-row join, always hash the 100-row table.',
              sqlExample: '-- The order of tables in FROM/JOIN does not determine execution order\n-- The optimiser chooses the better order based on statistics',
            },
            {
              rule: 'Join Associativity',
              color: '#8b5cf6',
              importance: 'Enables multi-join reordering',
              description: 'Joins are associative — (R ⋈ S) ⋈ T = R ⋈ (S ⋈ T). For n tables, there are (2n-2)!/(n-1)! possible join orderings. The optimiser searches this space for the cheapest.',
              equivalence: '(R ⋈ S) ⋈ T ≡ R ⋈ (S ⋈ T)',
              impact: 'For 5 tables: 120 possible join orders. For 10 tables: 1.7 million. Optimiser uses dynamic programming to find the best without exhaustive search.',
              sqlExample: '-- 4-table join: 24 possible orderings\n-- Optimiser picks cheapest based on cardinality estimates',
            },
            {
              rule: 'Selection Splitting',
              color: '#facc15',
              importance: 'Enables partial predicate use',
              description: 'A selection with a conjunction (AND) can be split into a cascade of individual selections. This allows each part of the condition to be pushed to where it is most effective.',
              equivalence: 'σ_{A AND B}(R) ≡ σ_A(σ_B(R)) ≡ σ_B(σ_A(R))',
              impact: 'WHERE city=\'San Francisco\' AND age>30 AND is_active=true can use three separate indexes if available, combining their results.',
              sqlExample: '-- WHERE city=\'San Francisco\' AND status=\'delivered\' AND amount>500\n-- Each condition can be pushed to its respective table independently',
            },
            {
              rule: 'Join-Selection Combination',
              color: '#e879f9',
              importance: 'Enables theta-join optimisation',
              description: 'A selection on a Cartesian product can be converted to a join with that condition as the join predicate. The join uses the condition to filter during combination rather than after.',
              equivalence: 'σ_{R.A=S.B}(R × S) ≡ R ⋈_{A=B} S',
              impact: 'Avoids materialising the full Cartesian product (m×n rows) before filtering. The join directly combines matching rows.',
              sqlExample: '-- A SELECT with WHERE that combines two tables is a join, not a cross product\n-- The optimiser always converts σ(R×S) to R⋈S form',
            },
          ].map((item) => (
            <div key={item.rule} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '18px 22px' }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)' }}>{item.rule}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}30`, borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.07em' }}>{item.importance}</span>
              </div>
              <Para>{item.description}</Para>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 7, padding: '10px 14px', marginBottom: 10, fontFamily: 'var(--font-mono)', fontSize: 13, color: item.color }}>{item.equivalence}</div>
              <Para><strong style={{ color: 'var(--text)' }}>Impact:</strong> {item.impact}</Para>
              <CodeBox>{item.sqlExample}</CodeBox>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 4 — COST ESTIMATION
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — Cost Estimation" />
        <SectionTitle>Cost Estimation — How the Optimiser Predicts Plan Cost Without Running It</SectionTitle>

        <Para>
          After generating candidate execution plans using algebraic transformations,
          the optimiser must choose the cheapest one. It cannot run all plans and
          pick the fastest — that would defeat the purpose. Instead it uses a
          <strong style={{ color: 'var(--accent)' }}> cost model</strong> to estimate
          the cost of each plan without executing it. The accuracy of cost estimation
          is the single most important factor in optimiser quality.
        </Para>

        <SubTitle>What "Cost" Means — The Cost Model Components</SubTitle>

        <Para>
          The cost model estimates the total resources consumed by a plan. In disk-based
          systems, I/O cost (number of page reads from disk) dominates and is the primary
          metric. CPU cost (number of operations like comparisons and hash computations)
          is secondary. Memory cost (how much buffer pool space the plan requires) is also
          tracked because running out of memory forces expensive disk-spill operations.
        </Para>

        <CodeBox label="Cost model components — what the optimiser estimates">
{`-- COST MODEL INPUTS (what PostgreSQL tracks in pg_class and pg_statistic):

-- 1. TABLE STATISTICS (updated by ANALYZE):
SELECT relname, reltuples, relpages
FROM pg_class
WHERE relname IN ('customers', 'orders');
-- reltuples: estimated row count (cardinality)
-- relpages: number of 8KB pages the table occupies

-- 2. COLUMN STATISTICS (updated by ANALYZE):
SELECT attname, n_distinct, correlation, most_common_vals, histogram_bounds
FROM pg_stats
WHERE tablename = 'orders';
-- n_distinct: number of distinct values (positive = exact, negative = fraction of rows)
-- correlation: how well column order matches physical storage order (1.0 = perfectly correlated)
-- most_common_vals: array of most frequent values and their frequencies
-- histogram_bounds: bucket boundaries for estimating range predicates

-- 3. COST PARAMETERS (in postgresql.conf):
SHOW seq_page_cost;       -- cost of reading a page in a sequential scan (default: 1.0)
SHOW random_page_cost;    -- cost of reading a page via random access (default: 4.0)
-- random_page_cost > seq_page_cost because sequential disk reads are faster
-- For SSDs: set random_page_cost = 1.1 (almost same as sequential)
SHOW cpu_tuple_cost;      -- cost of processing one row (default: 0.01)
SHOW cpu_index_tuple_cost; -- cost of processing one index entry (default: 0.005)
SHOW cpu_operator_cost;   -- cost of a comparison or function call (default: 0.0025)

-- COST FORMULA for sequential scan:
-- cost = relpages * seq_page_cost + reltuples * cpu_tuple_cost
-- For orders table: 6250 pages * 1.0 + 50000 rows * 0.01 = 6250 + 500 = 6750

-- COST FORMULA for index scan:
-- cost = (index pages read) * random_page_cost + (matching rows) * cpu_index_tuple_cost
--        + (matching rows) * random_page_cost (heap fetches)
-- For highly selective index (1% selectivity): far cheaper than full scan
-- For low-selectivity index (50% of table): more expensive than full scan!`}
        </CodeBox>

        <SubTitle>Cardinality Estimation — Predicting Row Counts Through Operations</SubTitle>

        <Para>
          The most critical and most error-prone part of cost estimation is predicting
          how many rows each operation will produce. These row count estimates
          (called <strong style={{ color: 'var(--accent)' }}>cardinality estimates</strong>)
          propagate through the query plan — an error early in the plan compounds
          into large errors in later stages.
        </Para>

        <CodeBox label="Cardinality estimation formulas — how the optimiser guesses row counts">
{`-- SELECTIVITY: fraction of rows that satisfy a condition
-- = (estimated output rows) / (total input rows)

-- EQUALITY CONDITION: col = value
-- selectivity = 1 / n_distinct(col)
-- Example: city = 'San Francisco', n_distinct(city) = 10 cities
-- selectivity = 1/10 = 0.1 = 10% of rows
-- If customers has 1M rows: estimated output = 1M * 0.1 = 100,000 rows

-- RANGE CONDITION: col BETWEEN a AND b
-- Uses histogram: count buckets that fall within [a,b] / total buckets
-- Example: salary BETWEEN 50000 AND 80000
-- Histogram: [20K, 40K, 60K, 80K, 100K, 150K] — 2 of 5 buckets → selectivity ≈ 0.4

-- CONJUNCTION (AND): multiply selectivities (assumes independence)
-- P(A AND B) ≈ P(A) * P(B)
-- WHERE city='San Francisco' AND status='delivered'
-- selectivity = 0.1 * 0.2 = 0.02 = 2% of rows
-- PROBLEM: if city and status are correlated (San Francisco users place more delivered orders),
-- the independence assumption underestimates the true selectivity → wrong plan

-- DISJUNCTION (OR): 1 - (1-P(A)) * (1-P(B))
-- WHERE city='San Francisco' OR status='delivered'
-- selectivity = 1 - (1-0.1) * (1-0.2) = 1 - 0.9*0.8 = 1 - 0.72 = 0.28

-- JOIN CARDINALITY ESTIMATE:
-- |R ⋈_{R.A=S.B} S| ≈ |R| * |S| / max(n_distinct(R.A), n_distinct(S.B))
-- Assumes uniform distribution of join attribute values
-- customers ⋈ orders on customer_id:
-- |customers| = 100K, |orders| = 5M, n_distinct(customer_id) = 100K (same)
-- Estimated join output: 100K * 5M / 100K = 5M rows
-- (Each customer has ~50 orders on average → total 5M order rows, correct)

-- STALE STATISTICS = BAD PLANS:
-- If ANALYZE hasn't been run recently:
-- The optimiser thinks the table has the OLD row count
-- Might choose a full scan instead of an index scan (or vice versa)
-- Always run: VACUUM ANALYZE table_name; after large data loads

-- CHECK if statistics are stale:
SELECT relname, n_live_tup, n_dead_tup, last_analyze, last_autoanalyze
FROM pg_stat_user_tables
ORDER BY last_analyze NULLS FIRST;`}
        </CodeBox>

        <SubTitle>When Statistics Fail — Multi-Column Correlation</SubTitle>

        <Para>
          The independence assumption in cardinality estimation (multiply selectivities
          for AND conditions) fails when columns are correlated. PostgreSQL 10+ introduced
          <strong style={{ color: 'var(--accent)' }}> extended statistics</strong> to address this.
        </Para>

        <CodeBox label="Extended statistics — fixing correlated column estimates">
{`-- PROBLEM: city and state are correlated (city='New York' always means state='Maharashtra')
-- Bad estimate: P(city='New York' AND state='Maharashtra') = P(city) * P(state)
--              = 0.05 * 0.1 = 0.005  (only 0.5% of rows)
-- Actual:       30% of all rows (New York is a major city in Maharashtra — high correlation)
-- Optimiser makes wrong plan based on the bad estimate

-- SOLUTION: Create extended statistics for correlated columns
CREATE STATISTICS stat_city_state ON city, state FROM customers;
ANALYZE customers;
-- PostgreSQL now tracks the joint distribution of city and state together
-- Selectivity estimates for conditions on both columns are far more accurate

-- VIEW extended statistics:
SELECT stxname, stxkeys, stxkind
FROM pg_statistic_ext
WHERE stxrelid = 'customers'::regclass;
-- stxkind: d = n_distinct, f = functional dependencies, m = MCV (most common values)

-- Extended statistics types:
-- DEPENDENCIES: one column functionally determines another (zip → city)
-- MCV: track most common combinations of values
-- NDISTINCT: track distinct combinations

CREATE STATISTICS stat_zip_city (dependencies)
ON zip_code, city FROM addresses;
-- Now optimiser knows: given zip_code='400001', city is always 'New York'`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 5 — JOIN ALGORITHMS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — Join Algorithms" />
        <SectionTitle>Join Algorithms — The Three Ways Databases Execute Joins</SectionTitle>

        <Para>
          The join operation is the most computationally expensive operation in most SQL queries.
          The algorithm chosen for each join in a query plan significantly impacts performance.
          There are three main join algorithms. The optimiser chooses among them based on
          the size of the inputs, available memory, and available indexes.
        </Para>

        {/* NESTED LOOP JOIN */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ height: 3, background: '#f97316' }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>Nested Loop Join (NLJ)</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>O(n×m) naive · O(n log m) with index</span>
            </div>
            <Para>
              The simplest join algorithm. For each row in the outer (left) relation,
              scan the entire inner (right) relation looking for matching rows.
              Conceptually a doubly nested for-loop.
            </Para>
            <CodeBox label="Nested loop join — algorithm and when it wins">
{`// NESTED LOOP JOIN ALGORITHM:
for each row r in outer_relation R:
    for each row s in inner_relation S:
        if r.join_key == s.join_key:
            output (r, s)

// NAIVE COST: O(|R| × |S|) page reads
// For R=1000 pages, S=500 pages: 1000 × 500 = 500,000 page reads

// INDEX NESTED LOOP JOIN: if an index exists on S.join_key
for each row r in outer_relation R:
    use index on S.join_key to find matching rows in S
    output (r, matching rows from S)

// COST: O(|R| × index lookup cost) ≈ O(|R| × log|S|)
// For R=1000 rows, S=500K rows with index: 1000 × 20 = 20,000 operations
// DRAMATICALLY better than naive when outer relation is small

// WHEN NLJ WINS:
// 1. Outer relation is very small (few rows — the outer loop runs few times)
// 2. Index exists on the inner relation's join key (turns inner scan into O(log n))
// 3. Join is on a non-equality condition (only NLJ supports theta-joins natively)
// 4. Very selective outer filter: if WHERE on outer table returns 10 rows,
//    10 index lookups on inner table is extremely fast

// EXAMPLE WHERE NLJ IS CHOSEN:
-- Find orders for the 5 VIP customers:
SELECT o.* FROM vip_customers v JOIN orders o ON v.customer_id = o.customer_id;
-- v = 5 rows (outer). o = 5M rows (inner) with index on customer_id.
-- NLJ: 5 index lookups → finds all matching orders in 5 × O(log 5M) ≈ 115 ops
-- Hash join would build a hash table of 5 VIP customers (very cheap)
-- Both are fast here — but NLJ with index wins for very small outer tables`}
            </CodeBox>
          </div>
        </div>

        {/* SORT-MERGE JOIN */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ height: 3, background: '#8b5cf6' }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>Sort-Merge Join (SMJ)</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>O(n log n + m log m) sort · O(n+m) merge</span>
            </div>
            <Para>
              Sort both relations on the join key, then merge them in a single linear pass.
              Once both relations are sorted, matching rows are adjacent — the merge step
              is essentially a linear scan through both sorted lists simultaneously.
            </Para>
            <CodeBox label="Sort-merge join — algorithm and when it wins">
{`// SORT-MERGE JOIN ALGORITHM:
// Phase 1: Sort both relations on the join key
sort R on R.join_key  → sorted_R
sort S on S.join_key  → sorted_S

// Phase 2: Merge — one linear pass through both sorted lists
i = 0, j = 0
while i < |sorted_R| and j < |sorted_S|:
    if sorted_R[i].key == sorted_S[j].key:
        output all matching pairs
        advance i and j past all matching values
    elif sorted_R[i].key < sorted_S[j].key:
        i++  // advance the smaller pointer
    else:
        j++  // advance the smaller pointer

// COST:
// Sort phase: O(|R| log|R| + |S| log|S|) — can use external merge sort for large tables
// Merge phase: O(|R| + |S|) — single pass through both sorted lists
// Total: O((|R|+|S|) log(|R|+|S|))

// WHEN SMJ WINS:
// 1. Both relations are LARGE — hash join may not fit in memory, SMJ spills gracefully
// 2. Data is ALREADY SORTED on the join key (clustered index on join column → sort is free!)
// 3. Query also needs ORDER BY on the join key — sort is needed anyway, merge is free
// 4. Result needs to be sorted — SMJ produces sorted output inherently

// EXAMPLE WHERE SMJ IS CHOSEN:
SELECT o.order_id, o.order_date, c.name
FROM orders o JOIN customers c ON o.customer_id = c.customer_id
ORDER BY o.customer_id;
-- Result needs ORDER BY customer_id = the join key
-- SMJ: sort both on customer_id, merge, output is already sorted
-- No separate sort step needed after the join
-- PostgreSQL will choose SMJ here when both tables are large`}
            </CodeBox>
          </div>
        </div>

        {/* HASH JOIN */}
        <div style={{ background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ height: 3, background: 'var(--accent)' }} />
          <div style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>Hash Join</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em' }}>O(n+m) — the default for large joins</span>
            </div>
            <Para>
              Build a hash table from the smaller relation, then probe it with every row
              from the larger relation. Hash lookups are O(1) average, making the overall
              algorithm O(n+m). This is the most commonly chosen algorithm for large joins
              in modern databases.
            </Para>
            <CodeBox label="Hash join — algorithm, memory management, and when it wins">
{`// HASH JOIN ALGORITHM:
// Phase 1: BUILD — hash the smaller relation
for each row s in smaller_relation S:
    insert into hash_table on key s.join_key

// Phase 2: PROBE — scan the larger relation and lookup in hash table
for each row r in larger_relation R:
    if hash_table.contains(r.join_key):
        output (r, hash_table.get(r.join_key))

// COST: O(|S| + |R|) = linear in total input size
// BUILD: read all of S once, O(|S|)
// PROBE: read all of R once, O(|R|) with O(1) hash lookups
// MEMORY: must hold entire hash table of S in memory (work_mem)

// GRACE HASH JOIN: when S doesn't fit in memory
// Phase 1: Partition both R and S by hash(join_key) into B buckets
//          Rows with the same hash go to the same bucket
//          Each bucket pair (R_i, S_i) fits in memory
// Phase 2: For each bucket pair, do in-memory hash join
// Cost: O(|R| + |S|) with 3 passes over data (2 writes + 1 read per partition)
// Degrades gracefully to external sort for very large relations

-- WHEN HASH JOIN WINS:
-- 1. Both relations are large (NLJ would be O(n×m))
-- 2. Smaller relation fits in work_mem (no grace partitioning needed)
-- 3. No sort needed in the output (unlike SMJ which produces sorted output)
-- 4. Equality join condition only (hash joins only work for = conditions)

-- TUNING HASH JOINS in PostgreSQL:
SHOW work_mem;  -- default: 4MB — often too small for large joins
-- Each hash join uses work_mem for its hash table
-- If hash table doesn't fit: grace hash join (slower, spills to disk)
-- Increase for sessions running complex analytical queries:
SET work_mem = '256MB';
-- WARNING: work_mem applies PER SORT/HASH operation PER query
-- A query with 5 hash joins uses 5 × work_mem = 5 × 256MB = 1.28GB
-- Set globally with caution: max_connections × work_mem must fit in RAM`}
            </CodeBox>
          </div>
        </div>

        <SubTitle>Join Algorithm Selection Summary</SubTitle>

        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Algorithm', 'Best When', 'Cost', 'Memory', 'Supports Non-Equi'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: 'var(--muted)', fontWeight: 700, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Nested Loop', 'Outer is tiny OR index on inner', 'O(n×m) → O(n log m) with index', 'Very low', '✓ Yes'],
                ['Sort-Merge', 'Both large + already sorted + ORDER BY needed', 'O(n log n + m log m)', 'Medium (sort buffers)', '✗ Equality only'],
                ['Hash', 'Both large, equality join, fits in work_mem', 'O(n+m)', 'High (hash table)', '✗ Equality only'],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '12px 14px', color: j === 0 ? 'var(--accent)' : 'var(--text)', fontFamily: j === 0 ? 'var(--font-mono)' : 'Inter, sans-serif', fontSize: 13, fontWeight: j === 0 ? 700 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================
          PART 6 — READING QUERY PLANS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — Execution Plans" />
        <SectionTitle>Reading Execution Plans — Understanding Every Node in EXPLAIN Output</SectionTitle>

        <Para>
          The execution plan is the optimiser's output — a tree of physical operators
          that the execution engine will run. Reading plans fluently is a production skill.
          Every time a query is slow, the first step is reading its plan.
        </Para>

        <SubTitle>Plan Structure — Trees and Data Flow</SubTitle>

        <Para>
          A query plan is a tree. Data flows from the leaf nodes (table scans)
          upward through intermediate nodes (joins, sorts, aggregations) to the root
          (which produces the final result). At each node, the optimiser estimates
          the startup cost (time to produce the first row) and total cost (time to
          produce all rows).
        </Para>

        <CodeBox label="Complete EXPLAIN ANALYZE output — every line decoded">
{`-- QUERY:
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT c.name, r.name AS restaurant, COUNT(o.order_id) AS order_count,
       SUM(o.total_amount) AS total_spent
FROM customers c
JOIN orders o        ON c.customer_id   = o.customer_id
JOIN restaurants r   ON o.restaurant_id = r.restaurant_id
WHERE c.city = 'San Francisco'
  AND o.status = 'delivered'
GROUP BY c.customer_id, c.name, r.restaurant_id, r.name
HAVING COUNT(o.order_id) >= 3
ORDER BY total_spent DESC
LIMIT 10;

-- EXAMPLE OUTPUT (annotated):
Sort  (cost=8234.56..8234.59 rows=10 width=68)
      (actual time=45.123..45.127 rows=10 loops=1)
  Sort Key: (sum(o.total_amount)) DESC
  Sort Method: top-N heapsort  Memory: 25kB
  Buffers: shared hit=3240, read=127
  ->  HashAggregate  (cost=8100.00..8200.00 rows=847 width=68)
                     (actual time=44.001..44.890 rows=847 loops=1)
        Group Key: c.customer_id, c.name, r.restaurant_id, r.name
        Filter: (count(o.order_id) >= 3)
        Rows Removed by Filter: 12341
        Buffers: shared hit=3240, read=127
        ->  Hash Join  (cost=312.00..7500.00 rows=24000 width=52)
                       (actual time=5.456..38.234 rows=23188 loops=1)
              Hash Cond: (o.restaurant_id = r.restaurant_id)
              Buffers: shared hit=3240, read=127
              ->  Hash Join  (cost=145.00..6800.00 rows=24000 width=32)
                             (actual time=2.123..31.456 rows=23188 loops=1)
                    Hash Cond: (o.customer_id = c.customer_id)
                    ->  Seq Scan on orders o
                              (cost=0.00..6200.00 rows=48000 width=20)
                              (actual time=0.025..24.678 rows=47921 loops=1)
                          Filter: ((status)::text = 'delivered')
                          Rows Removed by Filter: 2079
                    ->  Hash  (cost=120.00..120.00 rows=2000 width=16)
                               (actual time=1.987..1.987 rows=1952 loops=1)
                          Buckets: 2048  Batches: 1  Memory Usage: 112kB
                          ->  Seq Scan on customers c
                                    (cost=0.00..120.00 rows=2000 width=16)
                                    (actual time=0.013..1.456 rows=1952 loops=1)
                                Filter: ((city)::text = 'San Francisco')
                                Rows Removed by Filter: 8048
              ->  Hash  (cost=80.00..80.00 rows=500 width=24)
                         (actual time=1.234..1.234 rows=500 loops=1)
                    Buffers: shared hit=5
                    ->  Seq Scan on restaurants r
                              (cost=0.00..80.00 rows=500 width=24)
                              (actual time=0.009..0.789 rows=500 loops=1)
Planning Time: 2.456 ms
Execution Time: 45.234 ms

-- ─────────────────────────────────────────────────────────────────
-- DECODING EVERY ELEMENT:
-- ─────────────────────────────────────────────────────────────────

-- cost=X..Y: X = startup cost (first row), Y = total cost (all rows)
-- cost units are arbitrary but relative: higher = more expensive
-- estimated vs actual: if they differ greatly → stale statistics

-- actual time=X..Y rows=Z loops=N:
-- X = milliseconds to first row, Y = milliseconds total
-- Z = actual rows output by this node
-- N = how many times this node was executed (inner side of NLJ runs many times)

-- Buffers: shared hit=X read=Y:
-- hit = pages found in buffer pool (fast, RAM)
-- read = pages read from disk (slow)
-- A high read count on a leaf node = candidate for an index

-- "Rows Removed by Filter: 12341" on HashAggregate → HAVING filtered 12K groups
-- "Rows Removed by Filter: 2079" on Seq Scan → WHERE filtered some rows
-- Large numbers here = predicate pushdown didn't fire or no index available

-- The PLAN TREE reads bottom-up:
-- Deepest indented nodes run FIRST (leaf nodes)
-- Root node (Sort) runs LAST and produces the final output`}
        </CodeBox>

        <SubTitle>Diagnosing Bad Plans — The Five Most Common Problems</SubTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
          {[
            {
              problem: 'Seq Scan on a large table with a selective WHERE clause',
              color: '#ff4757',
              symptom: 'Seq Scan on orders (rows=5000000) ... Rows Removed by Filter: 4987654',
              diagnosis: 'A sequential scan is reading 5M rows to find 12K matches. This is 99.75% waste.',
              fix: 'Add an index on the filtered column. CREATE INDEX idx_orders_status ON orders(status) WHERE status != \'delivered\' — or a composite/partial index matching the exact query predicate.',
            },
            {
              problem: 'Estimated rows wildly different from actual rows',
              color: '#f97316',
              symptom: '(cost=... rows=15) (actual time=... rows=48234 loops=1)',
              diagnosis: 'Estimated 15 rows, got 48K. The optimiser made catastrophically wrong plan choices based on these bad estimates — it probably chose NLJ when it should have chosen hash join.',
              fix: 'Run VACUUM ANALYZE on the relevant tables. Check for column correlation (use extended statistics). Check for non-uniform distributions that histograms miss.',
            },
            {
              problem: 'Hash Batches > 1 (hash join spilling to disk)',
              color: '#facc15',
              symptom: 'Hash  (cost=... Buckets: 1024 Batches: 8 Memory Usage: 512kB)',
              diagnosis: 'Batches: 8 means the hash table didn\'t fit in work_mem and spilled to disk 8 times. This is dramatically slower than an in-memory hash join.',
              fix: 'Increase work_mem for this session: SET work_mem = \'256MB\'. Or reduce the size of the build side (push more filters earlier to reduce input rows).',
            },
            {
              problem: 'Sort spilling to disk',
              color: '#8b5cf6',
              symptom: 'Sort Method: external merge  Disk: 45678kB',
              diagnosis: 'The sort couldn\'t fit in work_mem and had to merge-sort from disk. Dramatically slower.',
              fix: 'Increase work_mem. Or add an index on the sort column — if the data is already in index order, no separate sort is needed (index scan returns pre-sorted data).',
            },
            {
              problem: 'NLJ with high loops count on the inner side',
              color: '#e879f9',
              symptom: 'Index Scan on orders (actual time=0.02..0.05 rows=3 loops=84523)',
              diagnosis: 'The inner side of a nested loop ran 84,523 times — once per outer row. Even though each lookup is fast (0.05ms), 84K × 0.05ms = 4.2 seconds total.',
              fix: 'If both sides are large, a hash join or sort-merge join would process each side once. This NLJ choice might indicate stale statistics (outer side estimated too small). Run ANALYZE.',
            },
          ].map((item) => (
            <div key={item.problem} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '18px 22px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{item.problem}</div>
              <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 14px', marginBottom: 10, fontFamily: 'var(--font-mono)', fontSize: 12, color: '#ff4757' }}>{item.symptom}</div>
              <Para><strong style={{ color: 'var(--text)' }}>Diagnosis:</strong> {item.diagnosis}</Para>
              <Para><strong style={{ color: item.color }}>Fix:</strong> {item.fix}</Para>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 7 — THE OPTIMISER IN DEPTH
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — The Optimiser" />
        <SectionTitle>Inside the Query Optimiser — How PostgreSQL Chooses a Plan</SectionTitle>

        <Para>
          The query optimiser is one of the most sophisticated components in any software system.
          For a query joining 5 tables, there are over 100 possible join orderings alone —
          and for each ordering, multiple algorithm choices at every node. The search space
          is enormous. Understanding the optimiser's strategy explains both when it works
          brilliantly and when it fails.
        </Para>

        <SubTitle>Dynamic Programming — The Standard Join Ordering Algorithm</SubTitle>

        <Para>
          PostgreSQL uses dynamic programming (Selinger algorithm) to find the optimal
          join order for queries with up to <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>join_collapse_limit</code>
          tables (default 8). The algorithm builds up optimal solutions for subsets of tables
          incrementally — the optimal plan for joining {'{A,B,C}'} is built from the optimal
          plan for {'{A,B}'} plus C, or {'{A,C}'} plus B, or {'{B,C}'} plus A. Taking the
          minimum cost across all these options gives the globally optimal plan.
        </Para>

        <CodeBox label="Join ordering — why order matters and how the optimiser chooses">
{`-- 3-TABLE JOIN: customers, orders, restaurants
-- Possible join orderings:
-- (customers ⋈ orders) ⋈ restaurants
-- (customers ⋈ restaurants) ⋈ orders   ← cross join! no direct predicate between these two
-- (orders ⋈ restaurants) ⋈ customers

-- DYNAMIC PROGRAMMING APPROACH:
-- Step 1: Cost of single-table access (scan or index):
--   cost(customers) = 120 pages * 1.0 = 120
--   cost(orders)    = 6250 pages * 1.0 = 6250
--   cost(restaurants) = 5 pages * 1.0 = 5

-- Step 2: Cost of all 2-table joins:
--   cost(customers ⋈ orders) via hash join = 120 + 6250 + 120(build) = ~6490
--     output: 5M rows (each customer has ~50 orders)
--   cost(orders ⋈ restaurants) via hash join = 6250 + 5 + 5(build) = ~6260
--     output: 5M rows (each order has one restaurant)
--   cost(customers ⋈ restaurants) = cross join: not applicable (no join predicate)

-- Step 3: Best 3-table join options:
--   Option A: (customers ⋈ orders) ⋈ restaurants
--     = cost 6490 + join 5M rows with 500 rows via hash = 6490 + 5000 = ~11490
--   Option B: (orders ⋈ restaurants) ⋈ customers
--     = cost 6260 + join 5M rows with 10K customers via hash = 6260 + 5000 = ~11260
--   Option B is slightly cheaper → CHOSEN

-- With predicate pushdown applied first:
--   After filtering customers WHERE city='San Francisco': 1952 rows (not 100K)
--   After filtering orders WHERE status='delivered': 48K rows (not 5M)
-- Option B revisited: (filtered_orders ⋈ restaurants) ⋈ filtered_customers
--   = 6260(scan+filter) + small hash join = much cheaper
-- This is why predicate pushdown is applied before join ordering decisions.

-- GEQO (Genetic Query Optimization): for queries > join_collapse_limit tables
-- Uses genetic algorithm instead of exhaustive DP
-- Finds near-optimal but not guaranteed optimal solution
-- Faster than exhaustive search for very large join counts
SHOW geqo_threshold;  -- default 12: use GEQO for joins with > 12 tables
SHOW join_collapse_limit;  -- default 8: use DP for ≤ 8 tables`}
        </CodeBox>

        <SubTitle>Hints and Optimiser Control — When the Optimiser Gets It Wrong</SubTitle>

        <Para>
          The optimiser makes wrong choices when its statistics are stale or when the data
          has unusual distributions that the statistics model poorly. PostgreSQL does not
          support query hints natively (unlike Oracle's <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>/*+ INDEX(table, idx) */</code>).
          Instead, it provides configuration parameters to guide the optimiser.
        </Para>

        <CodeBox label="Forcing optimiser choices — when statistics are wrong">
{`-- DISABLE specific join types (force the optimiser away from bad choices):
SET enable_nestloop = off;    -- disable NLJ (force hash or merge join)
SET enable_hashjoin = off;    -- disable hash join
SET enable_mergejoin = off;   -- disable sort-merge join
SET enable_seqscan = off;     -- disable sequential scans (force index scans)
-- WARNING: these are session-level settings. Restore after debugging.
-- Also: disabling an operator doesn't mean it's never used —
-- if no alternative exists, the disabled operator is used anyway.

-- FORCE a specific index:
-- PostgreSQL doesn't have direct index hints.
-- Workaround: use SET enable_seqscan = off temporarily,
-- OR rewrite the query to be more index-friendly.

-- UPDATE STATISTICS when the optimiser is using stale estimates:
ANALYZE customers;          -- update stats for one table
ANALYZE;                    -- update stats for all tables
VACUUM ANALYZE orders;      -- clean dead tuples AND update stats

-- CHECK why the optimiser chose a plan:
EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT ...;
-- VERBOSE: shows which index was considered and rejected, output column lists

-- pg_hint_plan extension: provides Oracle-style hints for PostgreSQL
-- After installing: /*+ IndexScan(orders idx_orders_customer) */ in query
-- Not built-in — requires extension installation

-- SET STATISTICS: increase histogram precision for problem columns
ALTER TABLE orders ALTER COLUMN total_amount SET STATISTICS 500;
-- Default: 100 histogram buckets
-- For columns with complex distributions: increase to 500
ANALYZE orders (total_amount);
-- Now the histogram for total_amount has 500 buckets → better range estimates`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 8 — WHAT THIS LOOKS LIKE AT WORK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 08 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <SectionTitle>The Performance Debugging Session — Taking a 45-Second Query to 80ms</SectionTitle>

        <Para>
          This is the full realistic workflow of diagnosing and fixing a slow query in production.
          Every step uses concepts from this module.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#f97316', background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            DoorDash Analytics — Monthly restaurant performance report query running 45 seconds
          </div>

          <CodeBox label="The original slow query">
{`-- Business requirement: monthly restaurant performance report for operations team
SELECT
    r.name                              AS restaurant_name,
    r.city,
    r.cuisine_type,
    COUNT(DISTINCT o.customer_id)       AS unique_customers,
    COUNT(o.order_id)                   AS total_orders,
    SUM(o.total_amount)                 AS gross_revenue,
    AVG(o.total_amount)                 AS avg_order_value,
    COUNT(rev.review_id)                AS review_count,
    AVG(rev.rating)                     AS avg_rating
FROM restaurants r
LEFT JOIN orders o
       ON r.restaurant_id = o.restaurant_id
      AND o.order_date >= '2024-01-01'
      AND o.order_date <  '2024-02-01'
      AND o.status = 'delivered'
LEFT JOIN reviews rev
       ON o.order_id = rev.order_id
GROUP BY r.restaurant_id, r.name, r.city, r.cuisine_type
ORDER BY gross_revenue DESC NULLS LAST;
-- Runtime: 45 seconds on a 50M row orders table`}
          </CodeBox>

          <CodeBox label="Step 1 — Read the EXPLAIN ANALYZE output">
{`EXPLAIN (ANALYZE, BUFFERS)
-- [query above]

-- RELEVANT PARTS OF OUTPUT:
Sort  (actual time=44823.456..44825.234 rows=843 loops=1)
  ->  HashAggregate  (actual time=44820.123..44822.456 rows=843 loops=1)
        ->  Hash Left Join (actual time=312.456..44810.234 rows=48234567 loops=1)
              Hash Cond: (o.order_id = rev.order_id)
              ->  Hash Left Join (actual time=5.234..38452.123 rows=48234567 loops=1)
                    Hash Cond: (r.restaurant_id = o.restaurant_id)
                    ->  Seq Scan on restaurants r (rows=843 loops=1)
                    ->  Hash (actual time=4.123..4.123 rows=847 loops=1)
                          ->  Seq Scan on orders o
                                (actual time=0.025..34521.234 rows=48234567 loops=1)
                                Filter: (order_date >= '2024-01-01' AND order_date < '2024-02-01'
                                         AND status = 'delivered')
                                Rows Removed by Filter: 1765432
-- KEY OBSERVATIONS:
-- 1. Seq Scan on orders reading 48M+ rows in 34 seconds → MASSIVE bottleneck
-- 2. No index on order_date + status → full scan every time
-- 3. Hash Left Join on reviews producing 48M intermediate rows → too many rows in join`}
          </CodeBox>

          <CodeBox label="Step 2 — Apply fixes and verify">
{`-- FIX 1: Add composite index matching the filter (date range + status)
CREATE INDEX CONCURRENTLY idx_orders_date_status
ON orders(order_date, status)
WHERE status = 'delivered';
-- Partial index: only delivered orders (most relevant for reporting)
-- order_date is the range column — leftmost in composite for range scans

-- FIX 2: Add index on reviews for the join
CREATE INDEX CONCURRENTLY idx_reviews_order
ON reviews(order_id)
INCLUDE (rating);
-- INCLUDE rating → covering index for the LEFT JOIN + AVG(rating) operation

-- FIX 3: Rewrite to use CTE for clarity and optimiser hints
WITH delivered_jan AS (
    SELECT
        restaurant_id,
        order_id,
        customer_id,
        total_amount
    FROM orders
    WHERE order_date >= '2024-01-01'
      AND order_date <  '2024-02-01'
      AND status = 'delivered'  -- uses new partial index
)
SELECT
    r.name, r.city, r.cuisine_type,
    COUNT(DISTINCT d.customer_id) AS unique_customers,
    COUNT(d.order_id) AS total_orders,
    SUM(d.total_amount) AS gross_revenue,
    AVG(d.total_amount) AS avg_order_value,
    COUNT(rev.review_id) AS review_count,
    AVG(rev.rating) AS avg_rating
FROM restaurants r
LEFT JOIN delivered_jan d ON r.restaurant_id = d.restaurant_id
LEFT JOIN reviews rev ON d.order_id = rev.order_id
GROUP BY r.restaurant_id, r.name, r.city, r.cuisine_type
ORDER BY gross_revenue DESC NULLS LAST;

-- AFTER FIXES — EXPLAIN output:
-- Index Scan on orders using idx_orders_date_status
--   (actual time=0.123..234.567 rows=48234 loops=1)   ← 48K not 48M rows!
-- Hash Left Join (actual time=...)  rows=48234 loops=1  ← 1000x fewer rows
-- Total Execution Time: 82.456 ms   ← from 45,000ms to 82ms = 548x faster`}
          </CodeBox>

          <Para>
            The optimisation process was: identify the bottleneck (sequential scan on orders),
            understand why (missing index on date + status), add the right index (partial
            composite covering the filter), and verify with EXPLAIN that the plan changed.
            The result is a 548× improvement — from a query that times out API requests
            to one that completes in 82 milliseconds. This exact workflow applies to
            every slow query in production.
          </Para>
        </div>
      </section>

      {/* ========================================
          PART 9 — INTERVIEW QUESTIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>Query Processing Interview Questions — Complete Answers</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              q: 'What is predicate pushdown and why is it the most important query optimisation?',
              color: '#0078d4',
              a: 'Predicate pushdown moves filter conditions (WHERE clauses) as close to the data source as possible — ideally before any join operation. It is the most impactful optimisation because intermediate result sizes have a multiplicative effect on query cost. A join between two 10M-row tables produces up to 100 trillion row combinations in the worst case. Filtering each table to 10K rows before joining reduces the join input to at most 100M combinations — a million times less work. In relational algebra: σ_{condition}(R ⋈ S) is rewritten to σ_{R_condition}(R) ⋈ σ_{S_condition}(S). Modern optimisers apply this automatically for any condition that only references one table\'s attributes. The application-level implication: always put the most selective WHERE conditions on individual tables, not on derived tables or CTEs if possible, to help the optimiser push them down.',
            },
            {
              q: 'When would the optimiser choose a nested loop join over a hash join?',
              color: 'var(--accent)',
              a: 'The optimiser chooses nested loop join when: (1) The outer relation is very small — if the outer side has 10 rows, the loop runs only 10 times regardless of the inner table size. With an index on the inner table\'s join column, 10 index lookups is extremely cheap. (2) An index exists on the inner table\'s join column — this turns each inner "scan" into an O(log n) index lookup, making the total cost O(outer_size × log(inner_size)). (3) The join condition is non-equality (theta join) — hash joins only work for equality conditions. Sort-merge join can handle some inequalities but nested loop is the general solution. (4) The query optimizer estimates the inner side is tiny after applying filters. Hash joins win when both sides are large and fit in work_mem. Sort-merge wins when data is already sorted on the join key or when output ordering is needed.',
            },
            {
              q: 'What is the difference between a query\'s logical plan and physical plan?',
              color: '#f97316',
              a: 'A logical plan expresses the query in terms of relational algebra operations — selection, projection, join, aggregation — without specifying how each operation will be physically executed. It describes what data to retrieve and how it relates, in an implementation-independent way. A physical plan specifies the exact algorithms for each operation: which specific scan type (sequential scan, index scan, bitmap index scan), which join algorithm (nested loop, hash join, sort-merge), how sorting will be done (in-memory quicksort, external merge sort, using an existing index). The logical plan is the output of the query rewriter. The optimiser transforms the logical plan into the optimal physical plan by assigning physical algorithms to each logical operation based on cost estimation. EXPLAIN shows the physical plan — the actual algorithms the execution engine will run.',
            },
            {
              q: 'Why can two queries that return identical results have drastically different performance?',
              color: '#8b5cf6',
              a: 'SQL is declarative — multiple SQL expressions can describe the same result. The database produces correct results for all of them but the execution plans differ dramatically. Example: EXISTS vs IN vs JOIN can all find customers who have orders, but the execution plan for each differs: EXISTS stops at the first match (short-circuit), IN may materialise the entire subquery result, JOIN may build a hash table. Another example: correlated subquery vs window function — both compute row-level aggregates, but the correlated subquery re-executes once per row (O(n²)) while the window function makes one pass (O(n)). Filter placement also matters: WHERE on an indexed column uses the index; applying the same filter inside a subquery or CTE may prevent index use. The key principle: the same logical result can be expressed with wildly different execution costs. Understanding query plans tells you which expression the optimiser can execute most efficiently.',
            },
            {
              q: 'The optimiser is choosing a sequential scan when an index exists. Why might this happen?',
              color: '#facc15',
              a: 'The optimiser chooses a sequential scan over an index scan in several legitimate cases: (1) Low selectivity — if the query returns more than ~15-20% of the table rows, a sequential scan is actually cheaper. Fetching many random pages via an index generates lots of random I/O, while a sequential scan reads all pages in order (fast sequential I/O). (2) Small table — if the table fits in a few pages, a sequential scan reads those pages in one operation. An index scan would add the overhead of traversing the index tree plus fetching the same pages. (3) Stale statistics — if ANALYZE hasn\'t been run recently, the optimiser may believe the table is small or the condition is not selective, leading it to choose a scan. Solution: VACUUM ANALYZE. (4) Correlation near 0 — if the indexed column\'s physical order is random relative to its values, index scans generate random I/O. The optimiser\'s correlation statistic models this. Solution: CLUSTER the table or increase random_page_cost weight.',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: '22px 26px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Q: {item.q}</div>
              <Para>{item.a}</Para>
            </div>
          ))}
        </div>
      </section>

      {/* ── KEY TAKEAWAYS ── */}
      <KeyTakeaways items={[
        'Query processing pipeline: Parser (syntax check) → Semantic Analyser (validate tables/columns/permissions) → Query Rewriter (rule-based transforms) → Optimiser (cost-based plan selection) → Execution Engine (run the plan). The optimiser is where most of the intelligence lives.',
        'Relational algebra is the internal representation of queries. Seven core operators: σ (selection/WHERE), π (projection/SELECT columns), ⋈ (join), × (cartesian product), ∪ (union), − (difference/EXCEPT), ρ (rename/alias). Each takes relations as input and produces a relation as output.',
        'Predicate pushdown is the most impactful query optimisation: apply WHERE filters before joins to reduce intermediate result sizes. The optimiser does this automatically, but writing queries with explicit per-table filters helps the optimiser and makes intent clear.',
        'The cost model estimates I/O (page reads), CPU (comparisons), and memory (buffer usage) for each plan node. random_page_cost (default 4.0) > seq_page_cost (default 1.0) reflects that sequential I/O is faster. On SSDs, set random_page_cost = 1.1.',
        'Cardinality estimation (predicting row counts) is the most error-prone part of optimisation. The independence assumption (P(A AND B) = P(A)×P(B)) fails for correlated columns. Use extended statistics (CREATE STATISTICS) to capture correlations. Stale statistics produce wrong estimates — run VACUUM ANALYZE regularly.',
        'Three join algorithms: Nested Loop (best for small outer + index on inner), Sort-Merge (best for large + already sorted + ORDER BY needed), Hash Join (best for large equality joins that fit in work_mem). The optimiser chooses based on input sizes and index availability.',
        'Hash join with Batches > 1 means work_mem was too small and the hash table spilled to disk. Increase work_mem (SET work_mem = \'256MB\') for analytical queries. Sort with "external merge" also means disk spill — same fix.',
        'EXPLAIN ANALYZE is the primary diagnostic tool. Key metrics: actual rows vs estimated rows (large difference = stale statistics), Rows Removed by Filter (large = index opportunity), Buffers read (large = index or memory issue), loops count on inner side of NLJ (large = potential hash join candidate).',
        'PostgreSQL uses dynamic programming (Selinger algorithm) for join ordering with ≤ 8 tables, genetic algorithm for more. It finds the plan with minimum estimated cost among all join orderings and algorithm combinations. Cannot use hints natively — guide via ANALYZE, SET enable_xxx = off, or CREATE STATISTICS.',
        'A 548× improvement (45 seconds → 82ms) from adding one index is not unusual. The workflow is always: find the slow query, run EXPLAIN ANALYZE, identify the bottleneck node (usually a Seq Scan with many rows removed), understand why (no index, stale stats, wrong join order), apply the fix, verify the plan changed.',
      ]} />

    </LearnLayout>
  )
}