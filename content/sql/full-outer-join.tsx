import { LearnLayout } from '@/components/content/LearnLayout';
import { Callout } from '@/components/content/Callout';
import { KeyTakeaways } from '@/components/content/KeyTakeaways';
import SQLPlayground from '@/components/sql/SQLPlayground';
import TryItChallenge from '@/components/sql/TryItChallenge';
import Link from 'next/link';

const C = '#06b6d4';

const Part = ({ n, title }: { n: string; title: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// Part {n}</p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
);

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
);

const Hl = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: C }}>{children}</strong>
);

const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />;

const IQ = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ background: `${C}10`, border: `1px solid ${C}25`, borderRadius: '8px 8px 0 0', padding: '14px 18px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
);

const Err = ({ msg, cause, fix }: { msg: string; cause: string; fix: string }) => (
  <div style={{ marginBottom: 24, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
    <div style={{ background: 'rgba(255,71,87,0.09)', borderBottom: '1px solid var(--border)', padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#ff4757', wordBreak: 'break-all', lineHeight: 1.6 }}>{msg}</div>
    <div style={{ padding: '14px 16px' }}>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 8px' }}><strong style={{ color: 'var(--text)' }}>Cause: </strong>{cause}</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}><strong style={{ color: '#00e676' }}>Fix: </strong>{fix}</p>
    </div>
  </div>
);

const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${C}08`, border: `1px solid ${C}20`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>🎯 Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
);

const TimeBlock = ({ time, label, children }: { time: string; label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
    <div style={{ flexShrink: 0, textAlign: 'right', width: 95 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)' }}>{time}</div>
    </div>
    <div style={{ flex: 1, borderLeft: `2px solid ${C}30`, paddingLeft: 20, paddingBottom: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{children}</div>
    </div>
  </div>
);

const CodeBlock = ({ label, code }: { label: string; code: string }) => (
  <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', margin: '16px 0 24px' }}>
    <div style={{ padding: '8px 14px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>{label}</span>
    </div>
    <pre style={{ margin: 0, padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.8, color: 'var(--text)', overflowX: 'auto', whiteSpace: 'pre' }}>{code}</pre>
  </div>
);

export default function FullOuterJoin() {
  return (
    <LearnLayout
      title="FULL OUTER JOIN"
      description="Keep all rows from both tables — reconciliation reports, symmetric difference queries, gap analysis across two data sources, and every pattern where neither side can be dropped"
      section="SQL — Module 33"
      readTime="10–14 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What FULL OUTER JOIN Does" />

      <P>INNER JOIN keeps only matched rows. LEFT JOIN keeps all left rows plus matched right rows. RIGHT JOIN keeps all right rows plus matched left rows. <Hl>FULL OUTER JOIN</Hl> keeps everything — all rows from both tables, whether or not they match.</P>

      <P>For rows that match, both sides are populated normally. For left rows with no right match, right-side columns are NULL. For right rows with no left match, left-side columns are NULL. No row from either table is ever discarded.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['JOIN type', 'Matched rows', 'Left-only rows', 'Right-only rows', 'Use when'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['INNER JOIN', '✅ included', '❌ excluded', '❌ excluded', 'Only matched data matters'],
              ['LEFT JOIN', '✅ included', '✅ included', '❌ excluded', 'All left rows, optional right data'],
              ['RIGHT JOIN', '✅ included', '❌ excluded', '✅ included', 'All right rows, optional left data'],
              ['FULL OUTER JOIN', '✅ included', '✅ included', '✅ included', 'All rows from both, gaps visible'],
            ].map(([type, matched, leftOnly, rightOnly, use], i) => (
              <tr key={type} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: i === 3 ? '#8b5cf6' : C, borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{type}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{matched}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{leftOnly}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{rightOnly}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Basic Syntax and Behaviour" />

      <CodeBlock
        label="FULL OUTER JOIN syntax"
        code={`-- FULL OUTER JOIN (OUTER keyword is optional)
SELECT columns
FROM   left_table  AS l
FULL OUTER JOIN right_table AS r ON l.key = r.key;

-- Result structure:
-- Matched rows:      l.col populated,  r.col populated
-- Left-only rows:    l.col populated,  r.col = NULL
-- Right-only rows:   l.col = NULL,     r.col populated`}
      />

      <SQLPlayground
        initialQuery={`-- FULL OUTER JOIN: all customers AND all orders
-- Shows matched pairs, customers with no orders, and
-- orders with no matching customer (data quality issue)
SELECT
  c.customer_id,
  c.first_name,
  c.loyalty_tier,
  o.order_id,
  o.order_date,
  o.total_amount,
  CASE
    WHEN c.customer_id IS NULL THEN 'Order — no customer'
    WHEN o.order_id    IS NULL THEN 'Customer — no orders'
    ELSE 'Matched'
  END AS match_status
FROM customers AS c
FULL OUTER JOIN orders AS o ON c.customer_id = o.customer_id
ORDER BY match_status, c.customer_id NULLS LAST
LIMIT 20;`}
        height={260}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Count rows by match status after FULL OUTER JOIN
SELECT
  CASE
    WHEN c.customer_id IS NULL THEN 'Order with no customer'
    WHEN o.order_id    IS NULL THEN 'Customer with no orders'
    ELSE 'Matched'
  END                          AS match_status,
  COUNT(*)                     AS row_count
FROM customers AS c
FULL OUTER JOIN orders AS o ON c.customer_id = o.customer_id
GROUP BY match_status
ORDER BY match_status;`}
        height={195}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Reconciliation — The Primary Use Case" />

      <P>The most common production use of FULL OUTER JOIN is <Hl>reconciliation</Hl> — comparing two data sources that should contain the same records and identifying discrepancies. One source may have records the other is missing, both may have records the other lacks, and some records exist in both but with different values.</P>

      <H>Reconciling two versions of the same data</H>

      <CodeBlock
        label="Reconciliation pattern — compare two data sources"
        code={`-- Example: reconcile orders from two systems
-- system_a_orders: orders recorded in the main system
-- system_b_orders: orders recorded in the backup/external system
SELECT
  COALESCE(a.order_id, b.order_id)       AS order_id,
  a.total_amount                          AS amount_in_system_a,
  b.total_amount                          AS amount_in_system_b,
  CASE
    WHEN a.order_id IS NULL               THEN 'Missing in System A'
    WHEN b.order_id IS NULL               THEN 'Missing in System B'
    WHEN a.total_amount <> b.total_amount THEN 'Amount mismatch'
    ELSE 'Match'
  END                                     AS reconciliation_status
FROM system_a_orders AS a
FULL OUTER JOIN system_b_orders AS b ON a.order_id = b.order_id
WHERE a.order_id IS NULL
   OR b.order_id IS NULL
   OR a.total_amount <> b.total_amount
ORDER BY reconciliation_status, order_id;`}
      />

      <H>Reconciling product catalogue vs sales data</H>

      <SQLPlayground
        initialQuery={`-- Reconcile products catalogue against actual sales
-- Shows: products that sold, products never sold, and
-- (hypothetically) sales records for non-existent products
SELECT
  COALESCE(p.product_id, oi_agg.product_id)  AS product_id,
  p.product_name,
  p.category,
  p.unit_price,
  COALESCE(oi_agg.times_ordered, 0)          AS times_ordered,
  COALESCE(oi_agg.total_revenue, 0)          AS total_revenue,
  CASE
    WHEN p.product_id     IS NULL THEN 'Sales but no product record'
    WHEN oi_agg.product_id IS NULL THEN 'Product never sold'
    ELSE 'Active product'
  END                                        AS status
FROM products AS p
FULL OUTER JOIN (
  SELECT
    product_id,
    COUNT(DISTINCT order_id)  AS times_ordered,
    ROUND(SUM(line_total), 2) AS total_revenue
  FROM order_items
  GROUP BY product_id
) AS oi_agg ON p.product_id = oi_agg.product_id
ORDER BY status, total_revenue DESC NULLS LAST;`}
        height={280}
        showSchema={true}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Symmetric Difference — Rows Unique to Each Side" />

      <P>The <Hl>symmetric difference</Hl> is all rows that appear in exactly one of the two tables — neither in both. This is FULL OUTER JOIN with a WHERE that keeps only the unmatched rows from both sides simultaneously.</P>

      <CodeBlock
        label="Symmetric difference — rows with no match on either side"
        code={`-- Symmetric difference:
-- rows in left with no right match + rows in right with no left match
SELECT *
FROM table_a AS a
FULL OUTER JOIN table_b AS b ON a.key = b.key
WHERE a.key IS NULL          -- right-only rows
   OR b.key IS NULL;         -- left-only rows

-- This keeps everything EXCEPT the matched rows
-- Equivalent to: (LEFT JOIN IS NULL) UNION ALL (RIGHT JOIN IS NULL)`}
      />

      <SQLPlayground
        initialQuery={`-- Symmetric difference: employees vs stores
-- Employees with no store + stores with no employees
SELECT
  COALESCE(CAST(e.employee_id AS TEXT), '—')  AS employee_id,
  COALESCE(e.first_name || ' ' || e.last_name, '—') AS employee_name,
  COALESCE(s.store_id, '—')                  AS store_id,
  COALESCE(s.city, '—')                      AS store_city,
  CASE
    WHEN e.employee_id IS NULL THEN 'Store has no employees'
    WHEN s.store_id    IS NULL THEN 'Employee has no store'
  END                                        AS gap_type
FROM employees AS e
FULL OUTER JOIN stores AS s ON e.store_id = s.store_id
WHERE e.store_id IS NULL      -- employees without store
   OR s.store_id IS NULL      -- stores without employees
ORDER BY gap_type, store_city NULLS LAST;`}
        height={245}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="COALESCE with FULL OUTER JOIN — Merging Both Sides" />

      <P>When both sides may have values for the same column (or different columns representing the same concept), COALESCE merges them into a single non-NULL value. This is essential for producing clean output from a FULL OUTER JOIN where either side may be NULL.</P>

      <SQLPlayground
        initialQuery={`-- Merge: use whichever side has the value
-- COALESCE(left_val, right_val) — left if available, right as fallback
SELECT
  COALESCE(c.customer_id, o.customer_id)      AS customer_id,
  COALESCE(c.first_name, 'Unknown')           AS first_name,
  COALESCE(c.city, 'Unknown city')            AS city,
  COUNT(o.order_id)                           AS order_count,
  COALESCE(ROUND(SUM(o.total_amount), 2), 0)  AS total_spend
FROM customers AS c
FULL OUTER JOIN orders AS o ON c.customer_id = o.customer_id
GROUP BY
  COALESCE(c.customer_id, o.customer_id),
  COALESCE(c.first_name, 'Unknown'),
  COALESCE(c.city, 'Unknown city')
ORDER BY total_spend DESC NULLS LAST
LIMIT 12;`}
        height={240}
        showSchema={true}
      />

      <H>Comparing two monthly snapshots</H>

      <CodeBlock
        label="Month-over-month comparison using FULL OUTER JOIN"
        code={`-- Compare store revenue: January vs February
-- FULL OUTER JOIN ensures stores that appear in one month but not the other
-- are still included in the comparison
WITH jan AS (
  SELECT store_id, ROUND(SUM(total_amount), 2) AS revenue
  FROM orders
  WHERE order_status = 'Delivered'
    AND order_date BETWEEN '2024-01-01' AND '2024-01-31'
  GROUP BY store_id
),
feb AS (
  SELECT store_id, ROUND(SUM(total_amount), 2) AS revenue
  FROM orders
  WHERE order_status = 'Delivered'
    AND order_date BETWEEN '2024-02-01' AND '2024-02-29'
  GROUP BY store_id
)
SELECT
  COALESCE(j.store_id, f.store_id)            AS store_id,
  COALESCE(j.revenue, 0)                      AS jan_revenue,
  COALESCE(f.revenue, 0)                      AS feb_revenue,
  COALESCE(f.revenue, 0) - COALESCE(j.revenue, 0) AS change,
  CASE
    WHEN j.store_id IS NULL THEN 'New in Feb'
    WHEN f.store_id IS NULL THEN 'No Feb data'
    WHEN f.revenue > j.revenue THEN 'Growth'
    WHEN f.revenue < j.revenue THEN 'Decline'
    ELSE 'Flat'
  END                                         AS trend
FROM jan AS j
FULL OUTER JOIN feb AS f ON j.store_id = f.store_id
ORDER BY change DESC NULLS LAST;`}
      />

      <SQLPlayground
        initialQuery={`-- Simulated month-over-month using FULL OUTER JOIN
-- Compare stores active in Jan 2024 vs Feb 2024
WITH jan AS (
  SELECT store_id, ROUND(SUM(total_amount), 2) AS revenue
  FROM orders
  WHERE order_status = 'Delivered'
    AND strftime('%m', order_date) = '01'
    AND strftime('%Y', order_date) = '2024'
  GROUP BY store_id
),
feb AS (
  SELECT store_id, ROUND(SUM(total_amount), 2) AS revenue
  FROM orders
  WHERE order_status = 'Delivered'
    AND strftime('%m', order_date) = '02'
    AND strftime('%Y', order_date) = '2024'
  GROUP BY store_id
)
SELECT
  COALESCE(j.store_id, f.store_id)            AS store_id,
  COALESCE(j.revenue, 0)                      AS jan_revenue,
  COALESCE(f.revenue, 0)                      AS feb_revenue,
  ROUND(COALESCE(f.revenue, 0) - COALESCE(j.revenue, 0), 2) AS change,
  CASE
    WHEN j.store_id IS NULL THEN 'New in Feb'
    WHEN f.store_id IS NULL THEN 'No Feb sales'
    WHEN f.revenue > j.revenue THEN 'Growth'
    WHEN f.revenue < j.revenue THEN 'Decline'
    ELSE 'Flat'
  END                                         AS trend
FROM jan AS j
FULL OUTER JOIN feb AS f ON j.store_id = f.store_id
ORDER BY change DESC NULLS LAST;`}
        height={285}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="FULL OUTER JOIN for Gap Analysis" />

      <P>Gap analysis uses FULL OUTER JOIN to identify where data is missing in a time series or expected dimension. If you expect data for every store every month but some combinations are absent, FULL OUTER JOIN against a complete reference set reveals the gaps.</P>

      <H>Generate the complete expected grid, then find gaps</H>

      <SQLPlayground
        initialQuery={`-- Generate all (store, month) combinations that SHOULD exist
-- Then FULL OUTER JOIN against actual data to find gaps
WITH expected AS (
  -- Every store × every observed month combination
  SELECT
    s.store_id,
    months.order_month
  FROM stores AS s
  CROSS JOIN (
    SELECT DISTINCT CAST(strftime('%m', order_date) AS INTEGER) AS order_month
    FROM orders
    WHERE strftime('%Y', order_date) = '2024'
  ) AS months
),
actual AS (
  SELECT
    store_id,
    CAST(strftime('%m', order_date) AS INTEGER)  AS order_month,
    COUNT(*)                                     AS order_count,
    ROUND(SUM(total_amount), 2)                  AS revenue
  FROM orders
  WHERE order_status = 'Delivered'
    AND strftime('%Y', order_date) = '2024'
  GROUP BY store_id, strftime('%m', order_date)
)
SELECT
  e.store_id,
  e.order_month,
  COALESCE(a.order_count, 0)        AS order_count,
  COALESCE(a.revenue, 0)            AS revenue,
  CASE WHEN a.store_id IS NULL THEN '⚠ Gap' ELSE '✓ OK' END AS status
FROM expected AS e
FULL OUTER JOIN actual AS a
  ON e.store_id = a.store_id
  AND e.order_month = a.order_month
ORDER BY e.store_id, e.order_month;`}
        height={310}
        showSchema={true}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Simulating FULL OUTER JOIN with UNION ALL" />

      <P>MySQL does not support FULL OUTER JOIN syntax. The workaround is to combine a LEFT JOIN and a RIGHT JOIN (or two LEFT JOINs) using UNION ALL — this produces an equivalent result.</P>

      <CodeBlock
        label="FULL OUTER JOIN simulation — MySQL compatible"
        code={`-- MySQL workaround: LEFT JOIN UNION ALL anti-right-join
-- Produces identical result to FULL OUTER JOIN

-- Part 1: LEFT JOIN — all left rows + matched right rows
SELECT
  c.customer_id,
  c.first_name,
  o.order_id,
  o.total_amount
FROM customers AS c
LEFT JOIN orders AS o ON c.customer_id = o.customer_id

UNION ALL

-- Part 2: RIGHT-only rows — orders with no customer match
-- (equivalent to: all right rows MINUS the matched ones)
SELECT
  c.customer_id,
  c.first_name,
  o.order_id,
  o.total_amount
FROM customers AS c
RIGHT JOIN orders AS o ON c.customer_id = o.customer_id
WHERE c.customer_id IS NULL;  -- keep only right-only rows

-- UNION ALL is correct here:
-- Part 1 has all matched + left-only rows
-- Part 2 has right-only rows (WHERE c.customer_id IS NULL)
-- Together: matched + left-only + right-only = FULL OUTER JOIN`}
      />

      <SQLPlayground
        initialQuery={`-- FULL OUTER JOIN simulation with UNION ALL
-- Equivalent to FULL OUTER JOIN customers FULL OUTER JOIN orders
SELECT
  c.customer_id  AS customer_id,
  c.first_name,
  o.order_id     AS order_id,
  o.total_amount,
  'Left join part'   AS source
FROM customers AS c
LEFT JOIN orders AS o ON c.customer_id = o.customer_id

UNION ALL

SELECT
  c.customer_id  AS customer_id,
  c.first_name,
  o.order_id     AS order_id,
  o.total_amount,
  'Right-only part'  AS source
FROM customers AS c
RIGHT JOIN orders AS o ON c.customer_id = o.customer_id
WHERE c.customer_id IS NULL
ORDER BY customer_id NULLS LAST, order_id NULLS LAST;`}
        height={265}
        showSchema={false}
      />

      <Callout type="info">
        DuckDB (this playground) and PostgreSQL both support FULL OUTER JOIN natively. MySQL added limited FULL JOIN support only recently — for production MySQL queries, the UNION ALL approach is safer and more portable across MySQL versions.
      </Callout>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="When to Use FULL OUTER JOIN — Decision Guide" />

      <P>FULL OUTER JOIN is specialised and less common than INNER or LEFT JOIN. Reaching for it reflexively is usually wrong — most business questions are answered by INNER or LEFT JOIN. Use FULL OUTER JOIN specifically when the business question genuinely requires seeing gaps on <Hl>both</Hl> sides simultaneously.</P>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '20px 0 32px' }}>
        {[
          {
            q: 'I need orders with customer details. Unordered customers irrelevant.',
            answer: 'INNER JOIN',
            color: C,
            why: 'Only matched rows matter — INNER JOIN is correct and most efficient.',
          },
          {
            q: 'I need all customers including those who never ordered.',
            answer: 'LEFT JOIN',
            color: '#00e676',
            why: 'All left rows, optional right data — LEFT JOIN is the right tool.',
          },
          {
            q: 'I need to compare two sources and find records missing from either.',
            answer: 'FULL OUTER JOIN',
            color: '#8b5cf6',
            why: 'Gaps on both sides need to be visible — this is the FULL OUTER JOIN use case.',
          },
          {
            q: 'I need all stores even if they have no orders, plus revenue where available.',
            answer: 'LEFT JOIN',
            color: '#00e676',
            why: 'One-sided preservation — stores is the anchor, orders is optional enrichment.',
          },
          {
            q: 'I need to reconcile Jan vs Feb data and some stores only appear in one month.',
            answer: 'FULL OUTER JOIN',
            color: '#8b5cf6',
            why: 'Stores exclusive to either month must both appear — FULL OUTER JOIN.',
          },
          {
            q: 'I need customers who have never ordered (no order record).',
            answer: 'LEFT JOIN + IS NULL',
            color: '#f97316',
            why: 'Anti-join — LEFT JOIN with IS NULL filter. Not FULL OUTER JOIN.',
          },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, background: 'var(--surface)', border: `1px solid ${item.color}20`, borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic', marginBottom: 6 }}>"{item.q}"</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{item.why}</div>
            </div>
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'flex-start', paddingTop: 2 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: item.color, background: `${item.color}15`, padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>{item.answer}</span>
            </div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="What This Looks Like at Work" />

      <P>You are a data engineer at HDFC Bank's digital banking division. Every night, the transaction processing system writes payment records to two databases: the primary OLTP database and an independent audit database. The compliance team runs a daily reconciliation to ensure both databases agree. Any transaction present in one but absent in the other — or present in both but with different amounts — must be flagged for investigation.</P>

      <TimeBlock time="6:00 AM" label="Nightly reconciliation job starts">
        The reconciliation query runs against both databases. Adapted here using FreshCart's two monthly snapshots as the two systems being compared.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Reconciliation: compare Jan and Feb order records
-- In production: compare primary_db.orders vs audit_db.orders
WITH primary_orders AS (
  -- "Primary system": orders placed in Jan 2024
  SELECT order_id, store_id, total_amount, order_status
  FROM orders
  WHERE strftime('%m', order_date) = '01'
    AND strftime('%Y', order_date) = '2024'
),
audit_orders AS (
  -- "Audit system": orders placed in Feb 2024 (simulating second source)
  SELECT order_id, store_id, total_amount, order_status
  FROM orders
  WHERE strftime('%m', order_date) = '02'
    AND strftime('%Y', order_date) = '2024'
)
SELECT
  COALESCE(p.order_id, a.order_id)         AS order_id,
  COALESCE(p.store_id, a.store_id)         AS store_id,
  p.total_amount                           AS primary_amount,
  a.total_amount                           AS audit_amount,
  CASE
    WHEN p.order_id IS NULL                THEN '⚠ Missing in primary'
    WHEN a.order_id IS NULL                THEN '⚠ Missing in audit'
    WHEN p.total_amount <> a.total_amount  THEN '⚠ Amount mismatch'
    ELSE '✓ Match'
  END                                      AS reconciliation_status
FROM primary_orders  AS p
FULL OUTER JOIN audit_orders AS a ON p.order_id = a.order_id
ORDER BY reconciliation_status DESC, order_id
LIMIT 15;`}
        height={305}
        showSchema={true}
      />

      <TimeBlock time="6:15 AM" label="Discrepancies flagged and routed">
        The query flags three categories: records missing in the primary system, records missing in the audit system, and records with mismatched amounts. Each category routes to a different team: missing records go to the data pipeline team, amount mismatches go to the fraud investigation team. The reconciliation completes in under 2 minutes for 500,000 daily transactions.
      </TimeBlock>

      <ProTip>
        FULL OUTER JOIN is the correct tool for any reconciliation job. The reason: you do not know in advance which records are missing from which side — that is exactly what you are trying to discover. LEFT JOIN would miss records in the right-side-only bucket. RIGHT JOIN would miss records in the left-side-only bucket. Only FULL OUTER JOIN guarantees that all discrepancies on both sides are visible in one query.
      </ProTip>

      <HR />

      {/* ── PART 10 — Interview Prep ── */}
      <Part n="10" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is FULL OUTER JOIN and when would you use it?">
        <p style={{ margin: '0 0 14px' }}>FULL OUTER JOIN returns all rows from both tables. For rows where the join condition is satisfied, columns from both sides are populated. For left-table rows with no match in the right table, right-side columns are NULL. For right-table rows with no match in the left table, left-side columns are NULL. No row from either table is ever excluded — it is the union of LEFT JOIN and RIGHT JOIN.</p>
        <p style={{ margin: '0 0 14px' }}>The defining use case is reconciliation — comparing two data sources that should contain the same records and surfacing discrepancies on both sides simultaneously. A payment reconciliation between a primary OLTP database and an audit database needs to find: transactions in the primary but missing in audit, transactions in audit but missing in the primary, and transactions in both but with different amounts. Only FULL OUTER JOIN reveals all three categories in one query.</p>
        <p style={{ margin: 0 }}>Other legitimate uses: month-over-month comparison where some stores only appear in one month (FULL OUTER JOIN ensures both months' data appears even when a store has no activity in one of them), gap analysis against a complete reference grid, symmetric difference queries (rows unique to either side), and data migration validation where records from an old system are being compared against a new system. FULL OUTER JOIN is specialised — most analytical questions are answered by INNER or LEFT JOIN. Reach for FULL OUTER JOIN specifically when gaps on both sides simultaneously need to be visible.</p>
      </IQ>

      <IQ q="How do you simulate FULL OUTER JOIN in MySQL, which does not support it natively?">
        <p style={{ margin: '0 0 14px' }}>MySQL does not support FULL OUTER JOIN syntax (or supported it only very limitedly in older versions). The standard workaround is to combine a LEFT JOIN and the right-only portion of a RIGHT JOIN using UNION ALL.</p>
        <p style={{ margin: '0 0 14px' }}>The pattern: Part 1 — LEFT JOIN gives all left rows and matched right rows (left-only + matched). Part 2 — RIGHT JOIN with WHERE left.key IS NULL gives only the right rows that had no left match (right-only). UNION ALL combines both parts. Together: left-only + matched + right-only = FULL OUTER JOIN.</p>
        <p style={{ margin: 0 }}>The critical detail: use UNION ALL not UNION. UNION deduplicates rows, which can incorrectly remove legitimate duplicate rows. UNION ALL preserves all rows from both parts — the two parts are designed to be disjoint (Part 1 has no right-only rows, Part 2 has only right-only rows) so deduplication is unnecessary and harmful. The resulting query is slightly more verbose than FULL OUTER JOIN but produces identical results and works on all MySQL versions. In PostgreSQL, DuckDB, SQL Server, and Oracle, FULL OUTER JOIN is directly supported and the UNION ALL workaround is unnecessary.</p>
      </IQ>

      <IQ q="What is the symmetric difference in SQL and how do you find it?">
        <p style={{ margin: '0 0 14px' }}>The symmetric difference of two sets is the collection of elements that appear in exactly one set but not both — the elements unique to each side. In relational terms, it is all rows from table A that have no match in table B, plus all rows from table B that have no match in table A. Rows that appear in both are excluded.</p>
        <p style={{ margin: '0 0 14px' }}>The SQL pattern is FULL OUTER JOIN with a WHERE that keeps only the unmatched rows: SELECT COALESCE(a.key, b.key) FROM table_a AS a FULL OUTER JOIN table_b AS b ON a.key = b.key WHERE a.key IS NULL OR b.key IS NULL. The WHERE condition keeps rows where either side is NULL — which are exactly the rows with no match on one side. Rows where both sides are non-NULL are the matched rows — excluded by the OR IS NULL filter.</p>
        <p style={{ margin: 0 }}>Use cases for symmetric difference in production: finding records that exist in a staging table but not in the production table after a migration (and vice versa), identifying customers who are in a CRM but not in the transaction database (and vice versa), finding discrepancies between two snapshots of the same data taken at different times. The symmetric difference gives you a complete picture of all anomalies in one query — both "in A but not B" and "in B but not A" simultaneously. In set theory terms, it is A XOR B or (A ∪ B) − (A ∩ B).</p>
      </IQ>

      <IQ q="How do you use FULL OUTER JOIN for month-over-month comparison when some entities only appear in one period?">
        <p style={{ margin: '0 0 14px' }}>The pattern: aggregate each period into a CTE separately, then FULL OUTER JOIN the two CTEs on the shared dimension key (like store_id or product_id). COALESCE handles the cases where an entity appears in one period but not the other.</p>
        <p style={{ margin: '0 0 14px' }}>Example for store revenue Jan vs Feb: WITH jan AS (SELECT store_id, SUM(revenue) AS revenue FROM orders WHERE month = 1 GROUP BY store_id), feb AS (SELECT store_id, SUM(revenue) AS revenue FROM orders WHERE month = 2 GROUP BY store_id) SELECT COALESCE(j.store_id, f.store_id) AS store_id, COALESCE(j.revenue, 0) AS jan, COALESCE(f.revenue, 0) AS feb, COALESCE(f.revenue, 0) - COALESCE(j.revenue, 0) AS change FROM jan AS j FULL OUTER JOIN feb AS f ON j.store_id = f.store_id.</p>
        <p style={{ margin: 0 }}>The COALESCE(j.store_id, f.store_id) for the key column handles both cases: if the store only appears in January, j.store_id is populated and f.store_id is NULL — COALESCE returns j.store_id. If the store only appears in February, j.store_id is NULL — COALESCE falls back to f.store_id. COALESCE(j.revenue, 0) and COALESCE(f.revenue, 0) convert NULLs to 0 so the arithmetic change calculation works correctly for new or disappearing stores. A CASE WHEN can classify each store as 'New', 'Churned', 'Growth', 'Decline', or 'Flat' based on which side is NULL and whether revenue went up or down.</p>
      </IQ>

      <IQ q="What is the difference between FULL OUTER JOIN and UNION ALL?">
        <p style={{ margin: '0 0 14px' }}>FULL OUTER JOIN and UNION ALL both combine data from two sources, but they operate differently and produce different result structures. FULL OUTER JOIN is a horizontal combination — it combines columns from two tables side by side based on a join condition, producing a result with columns from both tables. UNION ALL is a vertical combination — it stacks rows from two queries on top of each other, producing a result with the same columns as each query (which must match in count and compatible types).</p>
        <p style={{ margin: '0 0 14px' }}>FULL OUTER JOIN requires a join condition (ON clause) that defines how rows from both sides relate. Matched rows appear with all columns populated; unmatched rows appear with NULLs on the missing side. UNION ALL has no join condition — it simply concatenates rows. Both queries must return the same number of columns in the same order. It produces duplicate rows if they exist in both queries (unlike UNION which deduplicates).</p>
        <p style={{ margin: 0 }}>They serve fundamentally different purposes: FULL OUTER JOIN is for matching related data between two tables with a defined relationship and seeing where gaps exist. UNION ALL is for combining the same type of data from different sources or time periods into one result set. The FULL OUTER JOIN simulation for MySQL uses UNION ALL internally — it combines a LEFT JOIN result with a right-only result to reproduce FULL OUTER JOIN's output. But the UNION ALL in the simulation is an implementation detail, not a conceptual equivalent. FULL OUTER JOIN is structurally a JOIN (horizontal); UNION ALL is structurally a set operation (vertical).</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="11" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="FULL OUTER JOIN returns far more rows than expected"
        cause="A many-to-many relationship between the two tables is creating a row explosion. If table A has 1,000 rows and table B has 1,000 rows, but many rows in A match multiple rows in B and vice versa, the FULL OUTER JOIN result can be much larger than either table. Additionally, NULL values in the join key columns create unexpected groups — NULL joins to NULL only in GROUP BY, not in JOIN conditions, so NULL rows on both sides each appear as separate unmatched rows."
        fix="Verify each table's cardinality independently: SELECT COUNT(*), COUNT(DISTINCT join_key) FROM each_table. If COUNT(*) >> COUNT(DISTINCT join_key), there are many duplicates — pre-aggregate or deduplicate before joining. Check for NULLs in join key columns: SELECT COUNT(*) FROM table WHERE join_key IS NULL. NULL join keys create unmatched rows on each side. Either filter NULLs before joining or handle them explicitly in the ON clause with COALESCE."
      />

      <Err
        msg="FULL OUTER JOIN not supported — syntax error in MySQL"
        cause="MySQL does not support FULL OUTER JOIN (or has very limited support in older versions). Writing FULL OUTER JOIN in MySQL produces a syntax error: 'You have an error in your SQL syntax near FULL OUTER JOIN'."
        fix="Use the UNION ALL workaround: combine LEFT JOIN (all left rows + matched right rows) with a second query using RIGHT JOIN WHERE left.key IS NULL (right-only rows). The two parts together are disjoint and cover all three cases of FULL OUTER JOIN. Use UNION ALL not UNION to avoid deduplication. For PostgreSQL, DuckDB, SQL Server, and Oracle, FULL OUTER JOIN is supported natively."
      />

      <Err
        msg="COALESCE on key column returns wrong value — shows right-side key when left key is present"
        cause="The COALESCE argument order is wrong. COALESCE(right.key, left.key) would return the right-side key even when the left-side key is available (non-NULL). The correct pattern is COALESCE(left.key, right.key) — use the left key first (it is available for matched rows and left-only rows), fall back to right key only when left key is NULL (right-only rows)."
        fix="Use COALESCE(left_table.key, right_table.key) — left first, right as fallback. This produces the correct combined key: for matched rows, left key is non-NULL and is returned. For left-only rows, left key is non-NULL and is returned. For right-only rows, left key is NULL and right key is returned as the fallback. Verify: SELECT l.key, r.key, COALESCE(l.key, r.key) AS combined FROM... — confirm combined equals l.key when l.key is not NULL and r.key when l.key is NULL."
      />

      <Err
        msg="Reconciliation query misses amount mismatches — only shows missing rows"
        cause="The CASE WHEN for amount mismatch checks a.amount <> b.amount but both columns may be NULL for matched rows if the amount value itself is NULL. NULL <> NULL evaluates to NULL (not TRUE) in SQL, so NULL amounts in either system do not trigger the mismatch condition. Additionally, floating-point comparison issues may cause a.amount = b.amount to evaluate to FALSE for amounts that are theoretically equal but differ by a tiny rounding error."
        fix="Use a NULL-safe comparison for the mismatch check: WHEN a.amount IS DISTINCT FROM b.amount THEN 'Mismatch'. IS DISTINCT FROM treats NULL as a value — NULL IS DISTINCT FROM NULL is FALSE (they are equal), and NULL IS DISTINCT FROM 5 is TRUE (they differ). This catches NULLs correctly. For floating-point amounts, use ABS(a.amount - b.amount) > 0.01 instead of direct inequality — comparing rounded decimal values avoids floating-point precision issues."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="FreshCart's operations team wants to compare store performance between two months. Write a query using FULL OUTER JOIN that compares delivered order revenue per store between January 2024 and February 2024. Show: store_id, jan_orders, jan_revenue, feb_orders, feb_revenue, revenue_change (feb minus jan, 0 if either month has no data), and a trend column: 'New store' if no Jan data, 'Went quiet' if no Feb data, 'Growth' if Feb > Jan, 'Decline' if Feb < Jan, 'Flat' if equal. Use CTEs for each month. Sort by revenue_change descending."
        hint="Two CTEs — one per month, each with COUNT(*) and SUM(total_amount). FULL OUTER JOIN on store_id. COALESCE for the key column and for the numeric columns. CASE WHEN for trend. revenue_change = COALESCE(feb, 0) - COALESCE(jan, 0)."
        answer={`WITH jan AS (
  SELECT
    store_id,
    COUNT(*)                     AS order_count,
    ROUND(SUM(total_amount), 2)  AS revenue
  FROM orders
  WHERE order_status = 'Delivered'
    AND strftime('%m', order_date) = '01'
    AND strftime('%Y', order_date) = '2024'
  GROUP BY store_id
),
feb AS (
  SELECT
    store_id,
    COUNT(*)                     AS order_count,
    ROUND(SUM(total_amount), 2)  AS revenue
  FROM orders
  WHERE order_status = 'Delivered'
    AND strftime('%m', order_date) = '02'
    AND strftime('%Y', order_date) = '2024'
  GROUP BY store_id
)
SELECT
  COALESCE(j.store_id, f.store_id)                     AS store_id,
  COALESCE(j.order_count, 0)                           AS jan_orders,
  COALESCE(j.revenue, 0)                               AS jan_revenue,
  COALESCE(f.order_count, 0)                           AS feb_orders,
  COALESCE(f.revenue, 0)                               AS feb_revenue,
  ROUND(COALESCE(f.revenue, 0) - COALESCE(j.revenue, 0), 2) AS revenue_change,
  CASE
    WHEN j.store_id IS NULL          THEN 'New store'
    WHEN f.store_id IS NULL          THEN 'Went quiet'
    WHEN f.revenue  > j.revenue      THEN 'Growth'
    WHEN f.revenue  < j.revenue      THEN 'Decline'
    ELSE                                  'Flat'
  END                                                  AS trend
FROM jan AS j
FULL OUTER JOIN feb AS f ON j.store_id = f.store_id
ORDER BY revenue_change DESC NULLS LAST;`}
        explanation="The two CTEs each aggregate delivered orders for their respective months — filtering before GROUP BY for efficiency. FULL OUTER JOIN on store_id is the key: if a store only had January activity, f.store_id is NULL (trend = 'Went quiet'). If it only had February activity, j.store_id is NULL (trend = 'New store'). Matched stores have data on both sides and get Growth/Decline/Flat. COALESCE(j.store_id, f.store_id) produces the correct store_id regardless of which side is NULL. COALESCE(revenue, 0) turns NULLs into 0 so the revenue_change arithmetic works for all cases — a store that disappeared has 0 Feb revenue, so its change equals 0 - Jan_revenue (a negative decline). The CASE order matters: check for NULL sides first, then compare values — if you checked revenue comparison first for a NULL-revenue store, the comparison would evaluate to NULL and fall through to 'Flat' incorrectly."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'FULL OUTER JOIN keeps all rows from both tables. Matched rows have both sides populated. Unmatched rows have NULLs on the missing side. No row from either table is ever discarded.',
          'The primary use case is reconciliation — comparing two data sources to find records missing from either side and value discrepancies in records that appear in both.',
          'Symmetric difference: FULL OUTER JOIN + WHERE left.key IS NULL OR right.key IS NULL — keeps only rows with no match on one side, excluding matched rows.',
          'COALESCE(left.key, right.key) produces a unified key column that is non-NULL regardless of which side has the data. Always put the preferred side first.',
          'Month-over-month and period comparison: FULL OUTER JOIN two aggregated CTEs on the dimension key. COALESCE converts NULLs to 0 for arithmetic comparisons.',
          'Gap analysis: CROSS JOIN a complete reference grid with actual data, then FULL OUTER JOIN to find which expected combinations are missing in actuals.',
          'MySQL does not support FULL OUTER JOIN natively. Simulate with LEFT JOIN UNION ALL (RIGHT JOIN WHERE left.key IS NULL). Use UNION ALL not UNION.',
          'Use FULL OUTER JOIN selectively — most questions need INNER JOIN or LEFT JOIN. Reach for FULL OUTER JOIN only when gaps on both sides simultaneously need to be visible.',
          'IS DISTINCT FROM is safer than <> for reconciliation value comparisons — it handles NULLs correctly. NULL IS DISTINCT FROM NULL = FALSE (they match); NULL IS DISTINCT FROM 5 = TRUE (they differ).',
          'FULL OUTER JOIN + CASE WHEN gives a complete reconciliation report in one query: matched rows, left-only rows, right-only rows, and value mismatches all labelled and sortable.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 34</strong>, you learn SELF JOIN — joining a table to itself, the technique for hierarchical queries, adjacency list traversal, and comparing rows within the same table.
        </p>
        <Link href="/learn/sql/self-join" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 34 → SELF JOIN
        </Link>
      </div>

    </LearnLayout>
  );
}