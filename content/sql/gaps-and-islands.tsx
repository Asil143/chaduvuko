import { LearnLayout } from '@/components/content/LearnLayout';
import { Callout } from '@/components/content/Callout';
import { KeyTakeaways } from '@/components/content/KeyTakeaways';
import Link from 'next/link';

const C = '#06b6d4';
const Part = ({ n, title }: { n: string; title: string }) => <div style={{ margin: '32px 0 16px' }}><p style={{ color: C, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, margin: '0 0 7px' }}>// Part {n}</p><h2 style={{ color: 'var(--text)', fontSize: 'clamp(20px,3vw,30px)', letterSpacing: '-1px', margin: 0 }}>{title}</h2></div>;
const P = ({ children }: { children: React.ReactNode }) => <p style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>;
const CodeBlock = ({ label, code }: { label: string; code: string }) => <div style={{ border: '1px solid var(--border)', borderRadius: 10, margin: '16px 0 24px', overflow: 'hidden' }}><div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 11, padding: '8px 14px' }}>{label}</div><pre style={{ background: 'var(--bg2)', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8, margin: 0, overflowX: 'auto', padding: '14px 16px', whiteSpace: 'pre' }}>{code}</pre></div>;

export default function GapsAndIslands() {
  return <LearnLayout title="Gaps and Islands and Other Classic Patterns" description="Use window functions, row-number offsets, anti-joins, and date generation to find consecutive runs, missing periods, sessions, and latest records." section="SQL — Lesson 61" readTime="18–24 min">
    <Part n="01" title="Turn ordered rows into meaningful runs" />
    <P>Analytical SQL often asks questions that are not simple totals: Which dates form a consecutive streak? Where are the missing sequence numbers? When did a user’s activity session start and end? These are commonly called <strong>islands and gaps</strong>. An island is a consecutive run; a gap is a missing interval between observed values.</P>
    <P>The key steps are: define the entity and ordering, remove duplicate observations at the chosen grain, identify where continuity breaks, then aggregate each run. A good query states its assumptions—for example, whether one activity row per user per day is expected, what counts as a missing day, and how equal timestamps are ordered.</P>
    <Callout type="info">Prerequisites: <code>ROW_NUMBER</code>, <code>LAG</code>, CTEs, date arithmetic, and grouping. Objective: find consecutive date islands, missing dates, and event sessions with explicit boundaries.</Callout>

    <Part n="02" title="Consecutive date islands with the row-number offset" />
    <P>For distinct consecutive dates, subtract the row number from each date. Within a consecutive run, the difference is constant: January 10 minus row 1 and January 11 minus row 2 produce the same key. A break in the dates changes that key, so grouping by it identifies each island. Partition by the entity whose streaks you are finding.</P>
    <CodeBlock label="PostgreSQL — group each user’s consecutive active days" code={`WITH active_days AS (
  SELECT DISTINCT customer_id, order_date AS active_date
  FROM orders
  WHERE order_status = 'Delivered'
), numbered AS (
  SELECT customer_id,
         active_date,
         active_date - ROW_NUMBER() OVER (
           PARTITION BY customer_id ORDER BY active_date
         )::integer AS island_key
  FROM active_days
)
SELECT customer_id,
       MIN(active_date) AS streak_start,
       MAX(active_date) AS streak_end,
       COUNT(*) AS consecutive_days
FROM numbered
GROUP BY customer_id, island_key
ORDER BY customer_id, streak_start;`} />
    <P>The <code>DISTINCT</code> step is important: multiple delivered orders on the same date should not count as multiple consecutive days. The result’s grain is one row per customer streak. Add <code>HAVING COUNT(*) &gt;= 3</code> to keep streaks of at least three dates.</P>
    <Callout type="tip">This date-minus-row-number technique works when a day is the unit of continuity. For consecutive integer IDs, use <code>id - ROW_NUMBER()</code>. For workdays, business calendars, or irregular schedules, define continuity against the appropriate calendar rather than assuming every calendar date is expected.</Callout>

    <Part n="03" title="Find gaps by generating the expected sequence" />
    <P>To find missing dates, first define the expected date range and entity set, then compare that expected grid with observed rows. PostgreSQL’s <code>generate_series</code> can make a date spine. A left anti-join (<code>NOT EXISTS</code>) returns expected dates with no matching activity.</P>
    <CodeBlock label="PostgreSQL — dates with no delivered orders" code={`WITH expected_days AS (
  SELECT d::date AS expected_date
  FROM generate_series(
    DATE '2026-01-01', DATE '2026-01-31', INTERVAL '1 day'
  ) AS series(d)
), observed_days AS (
  SELECT DISTINCT order_date
  FROM orders
  WHERE order_status = 'Delivered'
)
SELECT e.expected_date
FROM expected_days AS e
WHERE NOT EXISTS (
  SELECT 1
  FROM observed_days AS o
  WHERE o.order_date = e.expected_date
)
ORDER BY e.expected_date;`} />
    <P>For per-store gaps, cross join the date spine with the stores in scope, then compare on both <code>store_id</code> and date. Limit the range before constructing the grid: if there are many entities and years of dates, the expected combinations can become very large. An alternative is to compare each observed date with its successor using <code>LEAD</code> and report only gaps between observations.</P>
    <CodeBlock label="PostgreSQL — report gaps between observed dates without a full calendar" code={`WITH observed_days AS (
  SELECT DISTINCT order_date
  FROM orders
  WHERE order_status = 'Delivered'
), neighbors AS (
  SELECT order_date,
         LEAD(order_date) OVER (ORDER BY order_date) AS next_date
  FROM observed_days
)
SELECT order_date + 1 AS gap_start,
       next_date - 1 AS gap_end,
       next_date - order_date - 1 AS missing_days
FROM neighbors
WHERE next_date > order_date + 1
ORDER BY gap_start;`} />

    <Part n="04" title="Sessionization: islands separated by a time gap" />
    <P>For clickstreams, an island may be a session rather than a run of dates. Sort each user’s events, use <code>LAG</code> to compare the current timestamp with the previous event, mark the first event or a gap above the chosen inactivity threshold, then cumulatively sum those markers to assign a session number.</P>
    <CodeBlock label="PostgreSQL — start a new session after 30 minutes of inactivity" code={`WITH ordered_events AS (
  SELECT user_id, event_id, occurred_at,
         LAG(occurred_at) OVER (
           PARTITION BY user_id
           ORDER BY occurred_at, event_id
         ) AS previous_at
  FROM user_events
), marked AS (
  SELECT *,
         CASE
           WHEN previous_at IS NULL
             OR occurred_at - previous_at > INTERVAL '30 minutes'
           THEN 1 ELSE 0
         END AS starts_session
  FROM ordered_events
), labeled AS (
  SELECT *,
         SUM(starts_session) OVER (
           PARTITION BY user_id
           ORDER BY occurred_at, event_id
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
         ) AS session_number
  FROM marked
)
SELECT user_id, session_number,
       MIN(occurred_at) AS session_start,
       MAX(occurred_at) AS session_end,
       COUNT(*) AS event_count
FROM labeled
GROUP BY user_id, session_number
ORDER BY user_id, session_start;`} />
    <P>The threshold is a product definition, not a universal SQL constant. Include a stable tie-breaker such as <code>event_id</code> when timestamps match. If events arrive late, a session boundary can change after recalculation; streaming systems may need a lateness policy and a reprocessing window.</P>

    <Part n="05" title="Other classic patterns: latest row and deduplication" />
    <P>Many “one row per group” problems are not solved safely with <code>MAX(timestamp)</code> alone: that gives the timestamp but not the other columns from the same row. Rank rows within each business key and retain rank 1, adding a deterministic tie-breaker.</P>
    <CodeBlock label="PostgreSQL — keep the latest status event for each order" code={`WITH ranked AS (
  SELECT order_id, status, changed_at, event_id,
         ROW_NUMBER() OVER (
           PARTITION BY order_id
           ORDER BY changed_at DESC, event_id DESC
         ) AS rn
  FROM order_status_history
)
SELECT order_id, status, changed_at
FROM ranked
WHERE rn = 1
ORDER BY order_id;`} />
    <P>For duplicate cleanup, first identify the true business key and define which row wins. Preview the ranked rows before deleting anything. If a business key is nullable, decide whether NULL values should be treated as equal; SQL’s ordinary equality does not match NULL to NULL, while uniqueness rules also vary by engine and constraint definition.</P>
    <CodeBlock label="Preview potential duplicates before deciding what to keep" code={`WITH ranked AS (
  SELECT customer_id, email, created_at, customer_record_id,
         ROW_NUMBER() OVER (
           PARTITION BY lower(email)
           ORDER BY created_at, customer_record_id
         ) AS duplicate_rank
  FROM customer_import
  WHERE email IS NOT NULL
)
SELECT *
FROM ranked
WHERE duplicate_rank > 1
ORDER BY lower(email), duplicate_rank;`} />

    <Part n="06" title="Dialect notes and validating assumptions" />
    <div style={{ overflowX: 'auto', margin: '18px 0 26px' }}><table style={{ borderCollapse: 'collapse', color: 'var(--text)', fontSize: 13, width: '100%' }}><thead><tr>{['Task', 'PostgreSQL', 'Other engines'].map(x => <th key={x} style={{ borderBottom: `2px solid ${C}`, padding: 10, textAlign: 'left' }}>{x}</th>)}</tr></thead><tbody>{[
      ['Date spine', 'generate_series(start, stop, interval)', 'SQL Server has date-series options in some versions; MySQL can use a recursive CTE or calendar table; Snowflake commonly uses a generated sequence/date table.'],
      ['Date minus row number', 'date - integer returns a date', 'Use each engine’s date arithmetic and cast rules; a calendar dimension is often the clearest option.'],
      ['Session threshold', 'timestamp - timestamp compared with INTERVAL', 'MySQL uses timestamp/date functions, SQL Server uses DATEDIFF-style logic, and Snowflake has its own date/time functions.'],
      ['Latest row', 'ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)', 'The window pattern is broadly supported; explicit deterministic tie-breakers remain essential.'],
    ].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ borderBottom: '1px solid var(--border)', lineHeight: 1.7, padding: 10, verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody></table></div>
    <P>Before choosing a pattern, write down the input grain, the expected output grain, the continuity rule, and the tie policy. Check duplicate rows, NULLs, boundary dates, and an entity with no events. Test on a tiny hand-worked dataset first, then compare counts and boundary cases on production-like data.</P>
    <Callout type="warning">A gaps-and-islands query is only as correct as its definition of “consecutive.” Calendar days, business days, increasing IDs, and events within a time threshold each need a different continuity rule.</Callout>

    <Part n="07" title="Common mistakes, practice, and next lesson" />
    <div style={{ background: 'rgba(255,71,87,.05)', border: '1px solid rgba(255,71,87,.2)', borderRadius: 9, margin: '12px 0', padding: '13px 16px' }}><p style={{ color: '#ff4757', fontSize: 13, fontWeight: 700, margin: '0 0 5px' }}>1. Forgetting to deduplicate to the intended grain</p><p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>Several orders on one date can inflate a daily streak. Reduce to one row per entity and date before assigning row numbers.</p></div>
    <div style={{ background: 'rgba(255,71,87,.05)', border: '1px solid rgba(255,71,87,.2)', borderRadius: 9, margin: '12px 0', padding: '13px 16px' }}><p style={{ color: '#ff4757', fontSize: 13, fontWeight: 700, margin: '0 0 5px' }}>2. Omitting the entity partition</p><p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>Without partitioning by customer or account, one user’s rows can join another user’s sequence and create false islands.</p></div>
    <div style={{ background: 'rgba(255,71,87,.05)', border: '1px solid rgba(255,71,87,.2)', borderRadius: 9, margin: '12px 0', padding: '13px 16px' }}><p style={{ color: '#ff4757', fontSize: 13, fontWeight: 700, margin: '0 0 5px' }}>3. Leaving tied rows unordered</p><p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>Use a stable unique tie-breaker so row numbering, latest-record selection, and event sessions are reproducible.</p></div>
    <div style={{ background: 'rgba(255,71,87,.05)', border: '1px solid rgba(255,71,87,.2)', borderRadius: 9, margin: '12px 0', padding: '13px 16px' }}><p style={{ color: '#ff4757', fontSize: 13, fontWeight: 700, margin: '0 0 5px' }}>4. Building an unbounded expected grid</p><p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>A cross join of every entity and every date can explode in size. Bound the date range, filter entities, or use neighbor comparisons where appropriate.</p></div>
    <P>Practice tasks:</P>
    <ol style={{ color: 'var(--text)', fontSize: 14, lineHeight: 2, paddingLeft: 22 }}>
      <li>Find each customer’s consecutive delivered-order dates after deduplicating to one date per customer.</li>
      <li>Return all missing dates between two observed order dates. State whether the range endpoints are inclusive.</li>
      <li>Assign event session numbers with a configurable inactivity threshold and a stable event tie-breaker.</li>
      <li>Return the latest row per order from a status-history table, including ties on timestamp.</li>
      <li>For each query, describe one edge case involving NULL, duplicates, or an entity with no observations.</li>
    </ol>
    <KeyTakeaways items={['Islands are consecutive runs; gaps are missing intervals relative to an explicit expected sequence.', 'The row-number offset groups consecutive dates or integer values into stable runs.', 'Deduplicate to the intended grain before applying consecutive-day logic.', 'LAG plus a boundary flag and cumulative SUM is a general sessionization pattern.', 'ROW_NUMBER with deterministic ordering selects a complete latest row, not just its maximum timestamp.', 'Date generation and arithmetic are dialect-specific; test edge cases and bound expected grids.']} />
    <h3 style={{ color: 'var(--text)', fontSize: 17, margin: '28px 0 10px' }}>Next</h3>
    <P>Continue into query-plan reading and performance tuning so you can evaluate how these analytical queries run on larger datasets.</P>
    <Link href="/learn/sql/explain-analyze" style={{ color: C, fontWeight: 700, textDecoration: 'none' }}>Lesson 62 → EXPLAIN &amp; EXPLAIN ANALYZE</Link>
  </LearnLayout>;
}
