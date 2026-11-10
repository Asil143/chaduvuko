import { LearnLayout } from '@/components/content/LearnLayout';
import { Callout } from '@/components/content/Callout';
import { KeyTakeaways } from '@/components/content/KeyTakeaways';
import Link from 'next/link';

const C = '#06b6d4';
const Part = ({ n, title }: { n: string; title: string }) => <div style={{ margin: '32px 0 16px' }}><p style={{ color: C, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, margin: '0 0 7px' }}>// Part {n}</p><h2 style={{ color: 'var(--text)', fontSize: 'clamp(20px,3vw,30px)', letterSpacing: '-1px', margin: 0 }}>{title}</h2></div>;
const P = ({ children }: { children: React.ReactNode }) => <p style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>;
const H = ({ children }: { children: React.ReactNode }) => <h3 style={{ color: 'var(--text)', fontSize: 17, margin: '28px 0 10px' }}>{children}</h3>;
const CodeBlock = ({ label, code }: { label: string; code: string }) => <div style={{ border: '1px solid var(--border)', borderRadius: 10, margin: '16px 0 24px', overflow: 'hidden' }}><div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 11, padding: '8px 14px' }}>{label}</div><pre style={{ background: 'var(--bg2)', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8, margin: 0, overflowX: 'auto', padding: '14px 16px', whiteSpace: 'pre' }}>{code}</pre></div>;
const Mistake = ({ title, fix }: { title: string; fix: string }) => <div style={{ background: 'rgba(255,71,87,.05)', border: '1px solid rgba(255,71,87,.2)', borderRadius: 9, margin: '12px 0', padding: '13px 16px' }}><p style={{ color: '#ff4757', fontSize: 13, fontWeight: 700, margin: '0 0 5px' }}>{title}</p><p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.8, margin: 0 }}>{fix}</p></div>;

export default function WindowFramesRunningTotals() {
  return <LearnLayout title="Window Frames — Running Totals and Moving Averages (ROWS / RANGE BETWEEN)" description="Choose the exact rows a window calculation sees, distinguish row-count windows from value ranges, and build correct cumulative and moving metrics." section="SQL — Lesson 53" readTime="16–22 min">
    <Part n="01" title="A window is a set; a frame is the slice you calculate over" />
    <P>In the previous lesson, <code>OVER (PARTITION BY ... ORDER BY ...)</code> defined a window around each row. A <strong>frame</strong> narrows that window to a subset relative to the current row. Frames are what make a cumulative sum or a moving average different from the same aggregate over the entire partition. They do not remove rows: they only change which rows feed the calculation for each output row.</P>
    <P>Imagine a delivery app asking for each merchant’s running daily sales, or the average of the last seven observed days. You need to make two decisions explicit: the order that establishes “before” and “after,” and whether the frame counts rows or spans values in the ordering column.</P>
    <Callout type="info">Prerequisites: <code>SUM</code>/<code>AVG</code>, <code>OVER</code>, <code>PARTITION BY</code>, and <code>ORDER BY</code> in a window function. Objective: select <code>ROWS</code> or <code>RANGE</code> deliberately and explain how peers and missing dates affect the result.</Callout>

    <Part n="02" title="The frame boundaries, in plain language" />
    <P>The frame is written after the window ordering: <code>ROWS BETWEEN start AND end</code> or <code>RANGE BETWEEN start AND end</code>. Common boundaries include <code>UNBOUNDED PRECEDING</code> (the first row/value), <code>n PRECEDING</code>, <code>CURRENT ROW</code>, <code>n FOLLOWING</code>, and <code>UNBOUNDED FOLLOWING</code>. The frame must describe a valid interval that includes the current row or otherwise follows the SQL engine’s boundary rules.</P>
    <div style={{ overflowX: 'auto', margin: '18px 0 26px' }}><table style={{ borderCollapse: 'collapse', color: 'var(--text)', fontSize: 13, width: '100%' }}><thead><tr>{['Frame', 'What it counts', 'Useful for'].map(x => <th key={x} style={{ borderBottom: `2px solid ${C}`, padding: 10, textAlign: 'left' }}>{x}</th>)}</tr></thead><tbody>{[
      ['ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW', 'Physical rows from partition start through this row', 'Stable running total when ordering is unique'],
      ['ROWS BETWEEN 6 PRECEDING AND CURRENT ROW', 'This row plus up to six earlier rows', 'Seven observed records, regardless of date gaps'],
      ['RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW', 'All ordering values up through the current value, including peers', 'Cumulative value where tied timestamps should share a result'],
      ["RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW", 'Values within six calendar days of the current date', 'Calendar-time lookback in PostgreSQL'],
    ].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ borderBottom: '1px solid var(--border)', lineHeight: 1.7, padding: 10, verticalAlign: 'top' }}>{cell}</td>)}</tr>)}</tbody></table></div>
    <Callout type="tip">If ordering values can tie, add a unique tie-breaker for deterministic <code>ROWS</code> results, such as <code>ORDER BY order_date, order_id</code>. For a <code>RANGE</code> offset frame, PostgreSQL requires a single compatible ordering expression; ties are peers by design.</Callout>

    <Part n="03" title="Running totals: make the frame and ordering explicit" />
    <P>First aggregate orders to one row per store per day. Then use an explicit row frame to cumulate the daily amount. This two-stage query prevents a same-day order from appearing as several indistinguishable date rows and makes the output grain easy to verify.</P>
    <CodeBlock label="PostgreSQL — cumulative store sales by date" code={`WITH daily_sales AS (
  SELECT store_id, order_date, SUM(total_amount) AS day_total
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY store_id, order_date
)
SELECT
  store_id,
  order_date,
  day_total,
  SUM(day_total) OVER (
    PARTITION BY store_id
    ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_sales
FROM daily_sales
ORDER BY store_id, order_date;`} />
    <P>With one row per <code>store_id, order_date</code>, date ordering is unique within each store if the data grain is enforced. If you skip the daily aggregation, several orders can share a date. A row-based running total will then move one order at a time; a range-based cumulative frame gives all orders on the same date the same cumulative result, because they are peers.</P>

    <Part n="04" title="ROWS versus RANGE: records versus ordering values" />
    <P><code>ROWS</code> counts physical rows in the sorted partition. A seven-row average means the current record and up to six preceding records, even if those records span weeks. <code>RANGE</code> groups equal ordering values as peers; with a value-offset range, it selects rows whose ordering value is inside that range. These are different business questions, not interchangeable syntax.</P>
    <CodeBlock label="Same data, different meaning: observed rows vs calendar interval" code={`-- Seven observations (not necessarily seven calendar days)
AVG(day_total) OVER (
  PARTITION BY store_id
  ORDER BY order_date
  ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
) AS avg_last_7_observed_days

-- PostgreSQL: current date and the preceding six calendar days
AVG(day_total) OVER (
  PARTITION BY store_id
  ORDER BY order_date
  RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW
) AS avg_last_7_calendar_days`} />
    <P>The second calculation only sees rows that exist in <code>daily_sales</code>. If a store had no orders on Tuesday, no Tuesday row exists, so the frame is not automatically padded with zero. For a true daily metric, generate a calendar series per store, left join the daily totals, and replace missing totals with zero before applying the frame.</P>
    <CodeBlock label="PostgreSQL — build a complete date spine before the RANGE frame" code={`WITH daily AS (
  SELECT store_id, order_date, SUM(total_amount) AS amount
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY store_id, order_date
), calendar AS (
  SELECT s.store_id, d.day::date AS order_date
  FROM stores AS s
  CROSS JOIN generate_series(
    DATE '2025-01-01', DATE '2025-01-31', INTERVAL '1 day'
  ) AS d(day)
), complete_daily AS (
  SELECT c.store_id, c.order_date, COALESCE(d.amount, 0) AS amount
  FROM calendar AS c
  LEFT JOIN daily AS d USING (store_id, order_date)
)
SELECT store_id, order_date, amount,
       AVG(amount) OVER (
         PARTITION BY store_id ORDER BY order_date
         RANGE BETWEEN INTERVAL '6 days' PRECEDING AND CURRENT ROW
       ) AS seven_day_average
FROM complete_daily;`} />

    <Part n="05" title="Default frames and dialect notes" />
    <P>Leaving out the frame can be a subtle bug. In PostgreSQL, when a window aggregate has <code>ORDER BY</code> and no explicit frame, the default is a range from the partition start through the current row’s peer group. Thus duplicate ordering values can receive the same cumulative result. For a strictly row-by-row running total, state <code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code> and use a deterministic ordering.</P>
    <P>Syntax support differs. PostgreSQL supports offset <code>RANGE</code> frames with a compatible single sort key, including date/time plus an interval. MySQL 8 supports frame clauses, but date-range offsets and expression requirements are version-sensitive; check the target server’s window-frame documentation. SQL Server’s <code>RANGE</code> support is more limited and does not provide PostgreSQL-style interval offsets; use <code>ROWS</code> where a row-count frame is intended. Snowflake supports <code>ROWS</code> and <code>RANGE</code>, with restrictions on offset types and ordering expressions. Do not copy a range-offset query across engines without testing it.</P>
    <Callout type="warning">A moving average over seven records is not automatically a seven-day average. Label the metric accurately, define treatment of missing dates, and test ties at the frame boundary.</Callout>

    <Part n="06" title="Common mistakes to catch in review" />
    <Mistake title="1. Using ROWS for a calendar duration" fix="ROWS 6 PRECEDING counts six records, not six days. Use a date-based RANGE frame or a date spine, depending on whether missing days should be excluded or treated as zero." />
    <Mistake title="2. Leaving ORDER BY non-unique for row-wise logic" fix="If two rows tie on the sort key, their row order can vary. Add a stable key such as order_id when a sequential row frame is the business requirement." />
    <Mistake title="3. Relying on the default frame without checking peers" fix="An ordered aggregate commonly defaults to a cumulative RANGE frame, so tied values share the same result. Write the intended frame explicitly." />
    <Mistake title="4. Treating absent dates as zero without a calendar" fix="A frame cannot include rows that are not in its input. Generate the expected date grain, left join observations, then decide whether NULL should become zero." />

    <Part n="07" title="Practice: choose a frame before writing the query" />
    <P>Use the FreshCart <code>orders</code> table. State the output grain and the frame semantics before coding each answer.</P>
    <ol style={{ color: 'var(--text)', fontSize: 14, lineHeight: 2, paddingLeft: 22 }}>
      <li>Compute each store’s daily delivered revenue and a row-by-row cumulative revenue using a unique date grain.</li>
      <li>Calculate the average of each store’s current and previous six observed daily rows. What changes if some dates are missing?</li>
      <li>Show why two rows with the same ordering timestamp may share a cumulative value under a peer-aware range frame.</li>
      <li>Design the date spine needed to calculate seven calendar days, including no-order days. State whether zero or NULL is appropriate for the business metric.</li>
      <li>Translate the running-total query to the engine you use and verify its default-frame and offset-RANGE support.</li>
    </ol>
    <KeyTakeaways items={['A frame selects the rows used for one window result; it does not collapse output rows.', 'ROWS counts physical records; RANGE reasons about ordering values and peer groups.', 'Specify frames explicitly for predictable running totals and moving averages.', 'A six-preceding ROWS frame means up to seven observations, not seven calendar days.', 'Missing dates require an explicit calendar spine if the metric is calendar-based.', 'Window-frame details and offset syntax vary across PostgreSQL, MySQL, SQL Server, and Snowflake.']} />
    <H>Next</H>
    <P>Continue with ranking functions, which use ordered window partitions but do not require aggregate frames.</P>
    <Link href="/learn/sql/ranking-functions" style={{ color: C, fontWeight: 700, textDecoration: 'none' }}>Lesson 54 → Ranking — ROW_NUMBER, RANK, DENSE_RANK</Link>
  </LearnLayout>;
}
