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

const JoinCard = ({ type, color, returns, analogy, use }: {
  type: string; color: string; returns: string; analogy: string; use: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}30`, borderRadius: 12, overflow: 'hidden', marginBottom: 14 }}>
    <div style={{ padding: '12px 16px', background: `${color}10`, borderBottom: `1px solid ${color}20` }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color }}>{type}</span>
    </div>
    <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Returns</p>
        <p style={{ fontSize: 13, color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>{returns}</p>
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Think of it as</p>
        <p style={{ fontSize: 13, color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>{analogy}</p>
      </div>
      <div>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>Use when</p>
        <p style={{ fontSize: 13, color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>{use}</p>
      </div>
    </div>
  </div>
);

export default function JoinsIntro() {
  return (
    <LearnLayout
      title="Introduction to JOINs"
      description="Combine data from multiple tables — what JOINs are, why relational databases need them, the four JOIN types, ON vs USING, table aliases, and every foundational pattern you will build on"
      section="SQL — Module 30"
      readTime="40 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why JOINs Exist — The Relational Model's Core Idea" />

      <P>Every query you have written so far touches one table at a time. But the FreshCart database has six tables — customers, orders, order_items, products, stores, and employees — and the most valuable information lives across the boundaries between them. An order row knows its customer_id but not the customer's name. An order_items row knows the product_id but not the product's name. A store row knows the city but not the orders placed there.</P>

      <P>This is not a design flaw — it is the relational model working exactly as intended. Normalisation (Module 26) taught you to store each fact once in the right table. JOINs are how you <Hl>reassemble</Hl> those facts at query time — combining columns from multiple tables based on matching values, producing a result that looks like it came from one wide table but was stored efficiently in several narrow ones.</P>

      <P>Without JOINs you cannot answer any cross-table question:</P>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '20px 0 32px' }}>
        {[
          { q: 'Which customers placed the most orders?', tables: 'customers + orders' },
          { q: 'What products were in each order?', tables: 'orders + order_items + products' },
          { q: 'Which store city generates the most revenue?', tables: 'orders + stores' },
          { q: 'What is each employee\'s store location?', tables: 'employees + stores' },
          { q: 'Which customers have never placed an order?', tables: 'customers + orders (LEFT JOIN)' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px' }}>
            <div style={{ flex: 1, fontSize: 14, color: 'var(--text)' }}>{item.q}</div>
            <div style={{ flexShrink: 0, fontSize: 11, fontFamily: 'var(--font-mono)', color: C, background: `${C}12`, padding: '3px 8px', borderRadius: 4 }}>{item.tables}</div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="How a JOIN Works — The Matching Mechanism" />

      <P>A JOIN combines rows from two tables by matching values in specified columns. For every row in the left table, the database looks for rows in the right table where the join condition is true. When a match is found, the columns from both rows are combined into a single output row.</P>

      <H>The anatomy of a JOIN</H>

      <CodeBlock
        label="JOIN syntax — every part explained"
        code={`SELECT   t1.col_a, t1.col_b, t2.col_c, t2.col_d
FROM     table1 AS t1          -- left table (with alias)
JOIN     table2 AS t2          -- right table (with alias)
  ON     t1.key = t2.key;      -- join condition: how rows match

-- The ON clause is the matching rule:
-- For each row in table1, find rows in table2 where t1.key = t2.key
-- Combine matched rows into one output row

-- Real FreshCart example:
SELECT   o.order_id, o.order_date, c.first_name, c.city
FROM     orders    AS o
JOIN     customers AS c
  ON     o.customer_id = c.customer_id;
-- For each order: find the customer whose customer_id matches
-- Return the combined columns from both tables`}
      />

      <SQLPlayground
        initialQuery={`-- First JOIN: orders with customer names
-- The ON clause matches customer_id in both tables
SELECT
  o.order_id,
  o.order_date,
  o.total_amount,
  c.first_name || ' ' || c.last_name   AS customer_name,
  c.city                               AS customer_city
FROM orders AS o
JOIN customers AS c
  ON o.customer_id = c.customer_id
ORDER BY o.order_date DESC
LIMIT 8;`}
        height={205}
        showSchema={true}
      />

      <P>The result looks like one wide table — order columns alongside customer columns — but the data was stored in two separate tables and assembled by the JOIN at query time. This is the relational model's power: store once, join on demand.</P>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="The Four JOIN Types" />

      <P>SQL has four fundamental JOIN types. Each answers a slightly different question about what to do when rows in one table have no match in the other.</P>

      <JoinCard
        type="INNER JOIN"
        color={C}
        returns="Only rows where the join condition matches in BOTH tables. Unmatched rows from either table are excluded."
        analogy="The intersection — only what both tables have in common."
        use="When you only care about rows that have related data in both tables. Orders with known customers. Order items with known products."
      />
      <JoinCard
        type="LEFT JOIN (LEFT OUTER JOIN)"
        color="#00e676"
        returns="All rows from the left table, plus matching rows from the right. Right-side columns are NULL when no match exists."
        analogy="Keep everything from the left — add right-side data where available."
        use="When you need all left-table rows regardless of match. All customers including those with no orders. All products including unsold ones."
      />
      <JoinCard
        type="RIGHT JOIN (RIGHT OUTER JOIN)"
        color="#f97316"
        returns="All rows from the right table, plus matching rows from the left. Left-side columns are NULL when no match exists."
        analogy="Keep everything from the right — add left-side data where available."
        use="Rare — usually rewritten as a LEFT JOIN with tables swapped. Included for completeness."
      />
      <JoinCard
        type="FULL OUTER JOIN"
        color="#8b5cf6"
        returns="All rows from both tables. NULL fills any side that has no match."
        analogy="Keep everything from both sides — NULL where no match."
        use="When you need all data from both tables regardless of matches. Reconciliation reports. Finding gaps on either side."
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="INNER JOIN — The Most Common JOIN" />

      <P>INNER JOIN returns only rows where the join condition is satisfied in both tables. It is the default JOIN type — writing JOIN without a qualifier means INNER JOIN. Use it when you only want rows that have a match on both sides.</P>

      <H>Two-table INNER JOIN</H>

      <SQLPlayground
        initialQuery={`-- Orders with store details — INNER JOIN
-- Only orders that match a store (all should, due to FK)
SELECT
  o.order_id,
  o.order_date,
  o.order_status,
  o.total_amount,
  s.store_name,
  s.city          AS store_city
FROM orders AS o
INNER JOIN stores AS s
  ON o.store_id = s.store_id
ORDER BY o.order_date DESC
LIMIT 8;`}
        height={205}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Products with order line details
-- Each order_items row joined to its product info
SELECT
  oi.order_id,
  oi.quantity,
  oi.unit_price,
  oi.line_total,
  p.product_name,
  p.category,
  p.brand
FROM order_items AS oi
JOIN products AS p
  ON oi.product_id = p.product_id
ORDER BY oi.order_id, p.category
LIMIT 10;`}
        height={200}
        showSchema={false}
      />

      <H>Three-table INNER JOIN — chaining JOINs</H>
      <P>Multiple JOINs chain together — each JOIN adds another table to the result. The order of JOINs generally does not affect correctness (the query optimiser reorders them for efficiency) but it does affect readability. Join in a logical sequence that follows the data's relationships.</P>

      <SQLPlayground
        initialQuery={`-- Orders with customer AND store details — three tables
SELECT
  o.order_id,
  o.order_date,
  o.total_amount,
  o.order_status,
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier,
  s.city                              AS store_city
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
JOIN stores    AS s ON o.store_id    = s.store_id
WHERE o.order_status = 'Delivered'
ORDER BY o.total_amount DESC
LIMIT 8;`}
        height={215}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Full order detail: orders + customers + order_items + products
-- Four tables joined together
SELECT
  o.order_id,
  c.first_name || ' ' || c.last_name  AS customer,
  p.product_name,
  p.category,
  oi.quantity,
  oi.unit_price,
  oi.line_total
FROM orders      AS o
JOIN customers   AS c  ON o.customer_id  = c.customer_id
JOIN order_items AS oi ON o.order_id    = oi.order_id
JOIN products    AS p  ON oi.product_id = p.product_id
ORDER BY o.order_id, p.product_name
LIMIT 12;`}
        height={225}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="LEFT JOIN — Keeping All Left-Table Rows" />

      <P>LEFT JOIN returns every row from the left table. For rows that have a match in the right table, the right-side columns are populated. For rows with no match, the right-side columns are NULL. The left table is never filtered — every row appears exactly once in the result.</P>

      <H>The classic use case — finding rows with no match</H>

      <SQLPlayground
        initialQuery={`-- All customers, including those with NO orders
-- INNER JOIN would exclude customers with no orders
-- LEFT JOIN keeps all customers, NULLs for unordered ones
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.city,
  c.loyalty_tier,
  o.order_id,
  o.order_date,
  o.total_amount
FROM customers AS c
LEFT JOIN orders AS o
  ON c.customer_id = o.customer_id
ORDER BY c.customer_id, o.order_date;`}
        height={210}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Find customers who have NEVER placed an order
-- Pattern: LEFT JOIN + WHERE right-side IS NULL
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.email,
  c.city,
  c.joined_date,
  c.loyalty_tier
FROM customers AS c
LEFT JOIN orders AS o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL    -- NULL means no matching order exists
ORDER BY c.joined_date;`}
        height={200}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- All stores with their order counts — including stores with no orders
SELECT
  s.store_id,
  s.store_name,
  s.city,
  COUNT(o.order_id)              AS total_orders,
  COALESCE(ROUND(SUM(o.total_amount), 2), 0) AS total_revenue
FROM stores AS s
LEFT JOIN orders AS o ON s.store_id = o.store_id
GROUP BY s.store_id, s.store_name, s.city
ORDER BY total_revenue DESC;`}
        height={185}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- All products, with sales data where available
-- Products never ordered will show NULL for sales metrics
SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.unit_price,
  COUNT(oi.item_id)              AS times_ordered,
  COALESCE(SUM(oi.quantity), 0)  AS total_units_sold,
  COALESCE(ROUND(SUM(oi.line_total), 2), 0) AS total_revenue
FROM products AS p
LEFT JOIN order_items AS oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name, p.category, p.unit_price
ORDER BY total_revenue DESC;`}
        height={210}
        showSchema={false}
      />

      <Callout type="tip">
        The LEFT JOIN + WHERE right_table.id IS NULL pattern is the standard SQL idiom for finding rows in the left table that have no corresponding row in the right table. It answers "which X has no Y?" — customers with no orders, products never sold, stores with no employees. This is one of the most frequently used patterns in production analytics.
      </Callout>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="RIGHT JOIN and FULL OUTER JOIN" />

      <H>RIGHT JOIN</H>
      <P>RIGHT JOIN is the mirror of LEFT JOIN — it keeps all rows from the right table and NULLs where the left has no match. In practice, RIGHT JOIN is almost always rewritten as a LEFT JOIN with the tables swapped — the result is identical and LEFT JOIN is more natural to read (most developers scan queries left-to-right and expect the "anchor" table on the left).</P>

      <CodeBlock
        label="RIGHT JOIN — almost always rewritable as LEFT JOIN"
        code={`-- RIGHT JOIN: keep all orders, left-side customer NULLs if no match
SELECT c.first_name, o.order_id, o.total_amount
FROM customers AS c
RIGHT JOIN orders AS o ON c.customer_id = o.customer_id;

-- Equivalent LEFT JOIN (preferred — easier to read):
SELECT c.first_name, o.order_id, o.total_amount
FROM orders AS o
LEFT JOIN customers AS c ON o.customer_id = c.customer_id;

-- Both produce identical results
-- The LEFT JOIN version is preferred by convention`}
      />

      <H>FULL OUTER JOIN</H>
      <P>FULL OUTER JOIN returns all rows from both tables. Rows with matches have data on both sides. Rows with no match have NULLs on the missing side. Use it when you need a complete picture of both tables regardless of whether they match.</P>

      <SQLPlayground
        initialQuery={`-- FULL OUTER JOIN: all customers AND all orders
-- Rows appear even if one side has no match
-- Useful for reconciliation: finding gaps on either side
SELECT
  c.customer_id,
  c.first_name,
  o.order_id,
  o.total_amount,
  CASE
    WHEN c.customer_id IS NULL THEN 'Order with no customer'
    WHEN o.order_id    IS NULL THEN 'Customer with no order'
    ELSE 'Matched'
  END AS match_status
FROM customers AS c
FULL OUTER JOIN orders AS o ON c.customer_id = o.customer_id
ORDER BY match_status, c.customer_id;`}
        height={230}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Table Aliases — Essential for Multi-Table Queries" />

      <P>Table aliases (AS t) are short names given to tables in a query. They are technically optional but practically required for any query that involves more than one table. Without aliases, column references become verbose and ambiguous.</P>

      <H>Why aliases are essential</H>

      <CodeBlock
        label="With and without table aliases"
        code={`-- WITHOUT aliases: verbose and potentially ambiguous
SELECT
  orders.order_id,
  orders.order_date,
  customers.first_name,
  customers.last_name,
  customers.city,
  stores.store_name,
  stores.city          -- AMBIGUOUS: customers.city and stores.city both exist
FROM orders
JOIN customers ON orders.customer_id = customers.customer_id
JOIN stores    ON orders.store_id    = stores.store_id;

-- WITH aliases: concise and unambiguous
SELECT
  o.order_id,
  o.order_date,
  c.first_name,
  c.last_name,
  c.city             AS customer_city,   -- disambiguated with alias
  s.store_name,
  s.city             AS store_city       -- disambiguated with alias
FROM orders    AS o
JOIN customers AS c ON o.customer_id = c.customer_id
JOIN stores    AS s ON o.store_id    = s.store_id;`}
      />

      <H>Alias conventions</H>

      <CodeBlock
        label="Standard alias conventions"
        code={`-- Common single-letter aliases for FreshCart tables:
orders       AS o
customers    AS c
products     AS p
stores       AS s
employees    AS e
order_items  AS oi

-- When joining a table to itself (self-join), use descriptive aliases:
employees AS mgr    -- the manager
employees AS emp    -- the subordinate

-- For derived tables and CTEs, use descriptive names:
(SELECT ...) AS monthly_summary
(SELECT ...) AS top_customers`}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="ON vs USING — Two Ways to Specify the Join Condition" />

      <H>ON — the universal join condition</H>
      <P>ON supports any boolean expression as the join condition — equality, inequality, ranges, expressions. It is the most flexible and most common syntax.</P>

      <CodeBlock
        label="ON clause — flexible conditions"
        code={`-- Standard equality join (most common)
JOIN customers AS c ON o.customer_id = c.customer_id

-- Non-equality join (less common but valid)
JOIN salary_bands AS sb ON e.salary BETWEEN sb.min_salary AND sb.max_salary

-- Multiple conditions in ON
JOIN stores AS s
  ON o.store_id = s.store_id
  AND s.city = 'Seattle'       -- additional filter in the join condition

-- Expression in ON
JOIN products AS p
  ON oi.product_id = p.product_id
  AND oi.unit_price < p.unit_price  -- ordered at a discount`}
      />

      <H>USING — shorthand when column names match</H>
      <P>USING is a shorthand for the common case where both tables have the same column name for the join key. USING (customer_id) is equivalent to ON left.customer_id = right.customer_id, but the resulting column appears only once in the output.</P>

      <CodeBlock
        label="USING clause — shorthand for matching column names"
        code={`-- ON version:
JOIN customers AS c ON o.customer_id = c.customer_id

-- USING version (identical result, shorter syntax):
JOIN customers AS c USING (customer_id)

-- USING with multiple columns:
JOIN order_items USING (order_id, product_id)

-- USING deduplicates the join column — it appears once in SELECT *
-- ON keeps both columns — o.customer_id and c.customer_id both appear

-- When NOT to use USING:
-- When column names differ between tables (must use ON)
-- When you need to distinguish which table's column you are referencing
-- When joining on an expression rather than a raw column`}
      />

      <SQLPlayground
        initialQuery={`-- USING example — identical result to ON but shorter
SELECT
  o.order_id,
  o.order_date,
  o.total_amount,
  c.first_name,
  c.city
FROM orders AS o
JOIN customers AS c USING (customer_id)
ORDER BY o.order_date DESC
LIMIT 6;`}
        height={175}
        showSchema={true}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="The WHERE Clause with JOINs — Filtering After Joining" />

      <P>WHERE filters rows from the joined result — it sees all the columns from all joined tables and filters by any of them. The full join executes first, then WHERE discards non-matching rows.</P>

      <SQLPlayground
        initialQuery={`-- Delivered orders with customer and store details
-- WHERE filters the joined result by order_status and city
SELECT
  o.order_id,
  o.order_date,
  o.total_amount,
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier,
  s.city                              AS store_city
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
JOIN stores    AS s ON o.store_id    = s.store_id
WHERE o.order_status = 'Delivered'
  AND s.city = 'Seattle'
ORDER BY o.total_amount DESC;`}
        height={220}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Platinum customers' large orders from UPI payment
SELECT
  o.order_id,
  o.order_date,
  o.total_amount,
  o.payment_method,
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
WHERE c.loyalty_tier = 'Platinum'
  AND o.payment_method = 'UPI'
  AND o.total_amount > 500
ORDER BY o.total_amount DESC;`}
        height={205}
        showSchema={false}
      />

      <H>ON condition vs WHERE — a subtle difference with OUTER JOINs</H>
      <P>For INNER JOINs, putting a filter in ON or WHERE produces the same result. For OUTER JOINs, the placement matters — a condition in ON is applied before the outer join adds NULLs for unmatched rows. A condition in WHERE is applied after, which can accidentally convert a LEFT JOIN back into an INNER JOIN.</P>

      <CodeBlock
        label="ON vs WHERE with LEFT JOIN — critical difference"
        code={`-- GOAL: all customers, plus only their DELIVERED orders

-- WRONG: filter in WHERE converts LEFT JOIN to INNER JOIN
-- Customers with no delivered orders are excluded
SELECT c.customer_id, c.first_name, o.order_id, o.order_status
FROM customers AS c
LEFT JOIN orders AS o ON c.customer_id = o.customer_id
WHERE o.order_status = 'Delivered';  -- excludes NULL rows (no-order customers)

-- RIGHT: filter in ON — applied before NULL rows are added
-- Customers with no delivered orders appear with NULL order columns
SELECT c.customer_id, c.first_name, o.order_id, o.order_status
FROM customers AS c
LEFT JOIN orders AS o
  ON c.customer_id = o.customer_id
  AND o.order_status = 'Delivered';  -- filter within the join
-- All customers returned; order columns NULL if no delivered order`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate ON filter vs WHERE filter with LEFT JOIN

-- RIGHT: filter in ON — all customers returned
-- order columns NULL for customers with no delivered orders
SELECT
  c.customer_id,
  c.first_name,
  COUNT(o.order_id)              AS delivered_orders
FROM customers AS c
LEFT JOIN orders AS o
  ON c.customer_id = o.customer_id
  AND o.order_status = 'Delivered'   -- in ON: keeps all customers
GROUP BY c.customer_id, c.first_name
ORDER BY delivered_orders DESC;`}
        height={210}
        showSchema={false}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Cross Join and Cartesian Products" />

      <P>A CROSS JOIN (or Cartesian product) joins every row from the left table with every row from the right table — no join condition. The result has left_count × right_count rows. With 20 customers and 30 products, a CROSS JOIN produces 600 rows.</P>

      <CodeBlock
        label="CROSS JOIN — every row with every row"
        code={`-- Every store paired with every product category
SELECT s.city, p.category
FROM stores AS s
CROSS JOIN (SELECT DISTINCT category FROM products) AS categories;
-- 10 stores × N categories = 10N rows

-- CROSS JOIN is used for:
-- Generating all possible combinations (e.g., store × time period for reports)
-- Calendar generation (dates × stores)
-- Test data generation

-- Implicit CROSS JOIN (old syntax — avoid in new code):
SELECT * FROM table1, table2;  -- comma-separated = CROSS JOIN
-- This is the source of accidental Cartesian products when ON is forgotten`}
      />

      <Callout type="warning">
        A missing ON clause in a JOIN (in older SQL syntax using commas) accidentally creates a CROSS JOIN — multiplying every row with every other row. On two 10,000-row tables, this produces 100,000,000 rows and can crash a database. Always verify JOIN results with a COUNT(*) before fetching all rows if something seems off.
      </Callout>

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="Joining on Multiple Columns — Composite Keys" />

      <P>Some tables have composite primary keys — where two or more columns together uniquely identify a row. Joining on composite keys requires matching all key columns in the ON clause.</P>

      <SQLPlayground
        initialQuery={`-- order_items has a composite key: (order_id, product_id)
-- Join on both columns to get exact matches
SELECT
  oi.order_id,
  oi.product_id,
  oi.quantity,
  oi.unit_price,
  oi.line_total,
  p.product_name,
  p.category,
  o.order_date,
  o.order_status
FROM order_items AS oi
JOIN products AS p ON oi.product_id = p.product_id
JOIN orders   AS o ON oi.order_id   = o.order_id
WHERE o.order_status = 'Delivered'
ORDER BY oi.order_id, p.category
LIMIT 10;`}
        height={225}
        showSchema={true}
      />

      <HR />

      {/* ── PART 12 ── */}
      <Part n="12" title="What This Looks Like at Work" />

      <P>You are a data analyst at Amazon. The customer success team asks for a report: all orders placed in the last quarter with customer details, product details, and store details — everything in one flat result for their CRM import. This is the most common real-world JOIN task: assembling a flat report from a normalised schema.</P>

      <TimeBlock time="10:00 AM" label="Request received">
        The team needs: order_id, order_date, customer full name, customer email, customer city, loyalty tier, product name, product category, quantity, line total, store city, order status. All in one result — one row per order line item.
      </TimeBlock>

      <TimeBlock time="10:15 AM" label="You identify the tables and relationships">
        orders → customers (via customer_id), orders → stores (via store_id), orders → order_items (via order_id), order_items → products (via product_id). Four tables, three join paths.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Complete order detail report — four table JOIN
-- One row per order line item with all relevant details
SELECT
  o.order_id,
  o.order_date,
  o.order_status,
  c.first_name || ' ' || c.last_name  AS customer_name,
  c.email                             AS customer_email,
  c.city                              AS customer_city,
  c.loyalty_tier,
  p.product_name,
  p.category,
  oi.quantity,
  oi.unit_price,
  oi.line_total,
  s.city                              AS store_city
FROM orders      AS o
JOIN customers   AS c  ON o.customer_id  = c.customer_id
JOIN stores      AS s  ON o.store_id     = s.store_id
JOIN order_items AS oi ON o.order_id     = oi.order_id
JOIN products    AS p  ON oi.product_id  = p.product_id
WHERE o.order_date >= '2024-01-01'
  AND o.order_status = 'Delivered'
ORDER BY o.order_id, p.category;`}
        height={265}
        showSchema={true}
      />

      <TimeBlock time="10:35 AM" label="Report complete">
        The query returns every delivered order line from Q1 2024 with all requested columns — assembled from four tables, delivered as one flat result. The CRM team can import it directly. You save the query to the shared analytics library for the team to rerun next quarter.
      </TimeBlock>

      <ProTip>
        The four-table JOIN above — orders, customers, stores, order_items, products — is the FreshCart "master join" that you will use as the foundation for dozens of reports. Once you have this base query working, you add WHERE filters, GROUP BY dimensions, and HAVING thresholds to build any specific report. Build your base JOIN first, verify the row count and a sample of results, then add the analytical layer on top.
      </ProTip>

      <HR />

      {/* ── PART 13 — Interview Prep ── */}
      <Part n="13" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is a JOIN in SQL and why is it needed?">
        <p style={{ margin: '0 0 14px' }}>A JOIN is a SQL operation that combines rows from two or more tables based on a related column — typically a primary key in one table matching a foreign key in another. JOINs are needed because the relational model stores data in normalised form — each entity in its own table — and JOINs are the mechanism for reassembling that data at query time.</p>
        <p style={{ margin: '0 0 14px' }}>Without JOINs, you could only query one table at a time. You could retrieve an order's customer_id from the orders table, but not the customer's name — that lives in the customers table. JOINs bridge the tables: SELECT o.order_id, c.first_name FROM orders AS o JOIN customers AS c ON o.customer_id = c.customer_id retrieves both the order data and the customer's name in a single query by matching the customer_id foreign key in orders with the customer_id primary key in customers.</p>
        <p style={{ margin: 0 }}>JOINs are the relational model's answer to data integration. Data is stored normalised — each fact in one place — and JOINs combine it at query time without duplicating storage. This design means updating a customer's name requires changing one row in one table, and every query that joins to that customer automatically reflects the update. Without JOINs (or their equivalent), you would need to store customer names redundantly in every table that references customers — reintroducing all the update anomalies that normalisation was designed to eliminate.</p>
      </IQ>

      <IQ q="What is the difference between INNER JOIN and LEFT JOIN?">
        <p style={{ margin: '0 0 14px' }}>INNER JOIN returns only rows where the join condition is satisfied in both tables. If a customer has no orders, they do not appear in the result of customers INNER JOIN orders. If an order references a customer_id that does not exist in the customers table, that order does not appear either. INNER JOIN is the intersection — only the rows that have a match on both sides.</p>
        <p style={{ margin: '0 0 14px' }}>LEFT JOIN returns every row from the left table, whether or not it has a match in the right table. Rows from the left table that have no match in the right table appear with NULL values for all right-table columns. LEFT JOIN is "keep everything from the left, add right-side data where available." A customer with no orders appears with NULL for all order columns. A customer with three orders appears three times — once per order.</p>
        <p style={{ margin: 0 }}>The practical choice: use INNER JOIN when you only care about rows that have related data on both sides — orders with known customers, order items with known products. Use LEFT JOIN when you need all rows from one table regardless of whether they have matches — all customers including those who have never ordered, all products including those never sold, all stores including those with no employees. The LEFT JOIN + WHERE right_table.id IS NULL pattern specifically finds the rows with no match — customers who have never ordered, products never sold — which is one of the most common analytical queries.</p>
      </IQ>

      <IQ q="What happens if you forget the ON clause in a JOIN?">
        <p style={{ margin: '0 0 14px' }}>If you use the old comma-separated table syntax (FROM table1, table2) without a WHERE condition connecting them, you get a Cartesian product — every row from table1 combined with every row from table2. With 1,000 customers and 10,000 orders, the result is 10,000,000 rows. On production tables with millions of rows, a Cartesian product can generate billions of rows and crash the database by exhausting memory or disk.</p>
        <p style={{ margin: '0 0 14px' }}>In modern JOIN syntax (FROM table1 JOIN table2 ON ...), forgetting the ON clause is a syntax error in most databases — the query fails to parse. This is one of the safety advantages of explicit JOIN syntax over the older comma syntax. Some databases allow JOIN without ON (treating it as CROSS JOIN), but this requires the CROSS JOIN keyword to be explicit in well-written SQL.</p>
        <p style={{ margin: 0 }}>The safeguard: after writing any JOIN query, check the result row count before fetching all rows. SELECT COUNT(*) first. If a join of a 100-row table and a 200-row table returns 20,000 rows, something is wrong — either a missing ON condition or a one-to-many relationship you did not account for. Expected row count for an INNER JOIN should be at most min(left_rows, right_rows) × the fan-out factor of the relationship. A result vastly exceeding this is the sign of a missing or incorrect join condition.</p>
      </IQ>

      <IQ q="When would you use a LEFT JOIN instead of an INNER JOIN?">
        <p style={{ margin: '0 0 14px' }}>Use LEFT JOIN whenever the absence of a match on the right side carries meaning and should appear in the result rather than being silently excluded. The three most common scenarios: finding rows with no related data (customers with no orders), reporting on all items regardless of activity (all products including unsold, all stores including empty), and optional relationships where the right-side data may or may not exist.</p>
        <p style={{ margin: '0 0 14px' }}>The "find no-match rows" pattern: LEFT JOIN followed by WHERE right_table.primary_key IS NULL returns only the left-table rows that have no match. This is the SQL idiom for "which X has no Y?" — customers who have never ordered, employees without a store assignment, products that have never been sold. An INNER JOIN cannot return these rows because they have no match — they are excluded by the intersection logic.</p>
        <p style={{ margin: 0 }}>The "keep all with optional enrichment" pattern: reporting on all stores including those with no orders. SELECT s.store_id, s.city, COUNT(o.order_id) AS order_count FROM stores AS s LEFT JOIN orders AS o ON s.store_id = o.store_id GROUP BY s.store_id, s.city returns all stores with 0 for those with no orders. An INNER JOIN would exclude stores with no orders — making them invisible in the report, which misrepresents the data. The choice between INNER and LEFT JOIN is fundamentally a question: "do I want to see rows with no match?" If yes, LEFT JOIN. If no, INNER JOIN.</p>
      </IQ>

      <IQ q="What is the difference between putting a filter in ON vs WHERE when using a LEFT JOIN?">
        <p style={{ margin: '0 0 14px' }}>With LEFT JOIN, the placement of a filter condition — in the ON clause versus the WHERE clause — produces different results and this difference is one of the most common sources of subtle bugs in SQL queries.</p>
        <p style={{ margin: '0 0 14px' }}>A condition in the ON clause is applied during the join itself, before the outer join adds NULLs for unmatched rows. A condition in the WHERE clause is applied after the outer join, to the full result including the NULL rows. This difference matters because WHERE NULL conditions evaluate to NULL (not TRUE), so WHERE filters that reference right-table columns exclude the NULL rows — effectively converting the LEFT JOIN into an INNER JOIN for those rows.</p>
        <p style={{ margin: 0 }}>Concrete example: FROM customers AS c LEFT JOIN orders AS o ON c.customer_id = o.customer_id AND o.order_status = 'Delivered' — the ON filter means "join only to delivered orders; customers with no delivered orders appear with NULL order columns." FROM customers AS c LEFT JOIN orders AS o ON c.customer_id = o.customer_id WHERE o.order_status = 'Delivered' — the WHERE filter means "after joining, keep only rows where order_status is Delivered; customers with no delivered orders are excluded because their order_status is NULL, which is not equal to Delivered." The first version is a true LEFT JOIN that preserves all customers. The second is effectively an INNER JOIN that loses customers with no delivered orders. Use ON for conditions that define the join relationship; use WHERE for conditions that filter the overall result. When you want to filter which rows from the right table participate in the join while keeping all left rows, put the filter in ON.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="14" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: column reference 'city' is ambiguous"
        cause="Two or more joined tables have a column with the same name — in FreshCart, both customers and stores have a city column. When SELECT references city without a table alias prefix, the database cannot determine which table's city column you mean and throws an ambiguity error."
        fix="Prefix every column reference with the table alias: SELECT c.city AS customer_city, s.city AS store_city. Always use table aliases in multi-table queries and qualify every column reference with its table alias. If you see an ambiguity error, search your SELECT list for every column name that exists in more than one of the joined tables and add the alias prefix."
      />

      <Err
        msg="JOIN returns many more rows than expected — millions of rows for a small table"
        cause="A missing ON clause (accidentally creating a CROSS JOIN), an incorrect ON condition that matches too broadly, or a one-to-many relationship you did not account for. If orders JOIN order_items returns more rows than orders, that is correct — each order can have multiple items. But if customers JOIN customers returns customers_count² rows, a CROSS JOIN or bad ON condition is the cause."
        fix="Always run SELECT COUNT(*) on the JOIN result before fetching all rows. Compare the count to your expectation. For a one-to-one relationship, the result should have at most as many rows as the smaller table. For a one-to-many, the result has more rows than the parent table — one per child row. If the count is far larger than expected, examine the ON clause: is it correct? Are both columns actually the right join keys? Add LIMIT 5 and inspect the actual rows to see what the JOIN is matching."
      />

      <Err
        msg="LEFT JOIN returns INNER JOIN results — customers with no orders are missing"
        cause="A WHERE condition on the right-table column (e.g., WHERE o.order_status = 'Delivered') is filtering out the NULL rows that LEFT JOIN adds for unmatched left-table rows. WHERE NULL = 'Delivered' evaluates to NULL (not TRUE), so those rows are discarded. The LEFT JOIN correctly produces NULLs for unmatched rows, but WHERE immediately removes them."
        fix="Move the right-table filter from WHERE to the ON clause: LEFT JOIN orders AS o ON c.customer_id = o.customer_id AND o.order_status = 'Delivered'. This applies the filter within the join, before NULLs are added for unmatched rows. The result: all customers appear; for customers with no delivered orders, the order columns are NULL. If you specifically want to exclude unmatched rows, use INNER JOIN instead of LEFT JOIN — be explicit about your intent."
      />

      <Err
        msg="Aggregate query after JOIN returns inflated totals — SUM is too high"
        cause="A one-to-many join multiplied the rows before aggregation. If orders are joined to order_items (one order has multiple items), orders.total_amount is repeated once per item. SUM(orders.total_amount) adds the total_amount multiple times — once per item — inflating the result. This is the fan-out bug."
        fix="Aggregate at the correct granularity. For order-level metrics, aggregate orders before joining to order_items. For item-level metrics, aggregate order_items. Use CTEs: WITH order_totals AS (SELECT order_id, SUM(line_total) AS total FROM order_items GROUP BY order_id) then join order_totals to orders. Or use COUNT(DISTINCT o.order_id) instead of COUNT(*) when one order appears multiple times due to a one-to-many join. Always verify aggregates by cross-checking totals against known values before trusting the result."
      />

      <Err
        msg="ON condition references wrong column — join returns zero rows or wrong matches"
        cause="The ON clause references the wrong columns — either two columns from the same table (t1.id = t1.id always matches), two unrelated columns (o.total_amount = c.customer_id), or swapped foreign key references (o.store_id = c.customer_id). These produce either zero rows (no genuine matches), wrong matches (different entities accidentally matching), or all rows (column = itself)."
        fix="Trace each join condition carefully: the ON clause should match the foreign key column in the child table to the primary key column in the parent table. o.customer_id (FK) = c.customer_id (PK). If the join returns zero rows when data clearly exists in both tables, run each table SELECT separately to confirm the values, then manually check whether any values overlap: SELECT DISTINCT customer_id FROM orders INTERSECT SELECT customer_id FROM customers — if this is empty, the join columns do not match."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write two queries: (1) An INNER JOIN query that shows each delivered order's full details — order_id, order_date, customer full name, customer loyalty_tier, store city, total_amount, and payment_method. Only include orders from 2024. (2) A LEFT JOIN query that shows all customers with a count of their delivered orders — customer_id, full name, city, loyalty_tier, and delivered_order_count (0 for customers with no delivered orders). Sort the second query by delivered_order_count descending."
        hint="Query 1: JOIN orders to customers and stores. WHERE order_status = 'Delivered' AND order_date >= '2024-01-01'. Query 2: LEFT JOIN customers to orders with order_status filter in ON (not WHERE). GROUP BY customer columns. COUNT(o.order_id) — not COUNT(*) — so unmatched customers count as 0."
        answer={`-- Query 1: INNER JOIN — delivered orders with full details
SELECT
  o.order_id,
  o.order_date,
  c.first_name || ' ' || c.last_name  AS customer_name,
  c.loyalty_tier,
  s.city                              AS store_city,
  o.total_amount,
  o.payment_method
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
JOIN stores    AS s ON o.store_id    = s.store_id
WHERE o.order_status = 'Delivered'
  AND o.order_date >= '2024-01-01'
ORDER BY o.order_date DESC;

-- Query 2: LEFT JOIN — all customers with delivered order count
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer_name,
  c.city,
  c.loyalty_tier,
  COUNT(o.order_id)                   AS delivered_order_count
FROM customers AS c
LEFT JOIN orders AS o
  ON c.customer_id = o.customer_id
  AND o.order_status = 'Delivered'    -- filter in ON, not WHERE
GROUP BY
  c.customer_id,
  c.first_name,
  c.last_name,
  c.city,
  c.loyalty_tier
ORDER BY delivered_order_count DESC;`}
        explanation="Query 1 uses INNER JOIN — only orders with matching customers and stores appear, which is correct since all delivered orders should have valid FK references. The 2024 filter goes in WHERE since it is a row-level condition on orders. Query 2 uses LEFT JOIN with the order_status filter in ON — not WHERE. If the filter were in WHERE, customers with no delivered orders would have NULL order_status, which WHERE would discard, converting the LEFT JOIN to an INNER JOIN and losing zero-order customers. COUNT(o.order_id) counts non-NULL order_ids — customers with no matching orders have NULL order_id so COUNT returns 0 for them. COUNT(*) would return 1 even for unmatched rows because it counts the row itself."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'JOINs combine rows from multiple tables based on matching column values. They are the mechanism for reassembling normalised data at query time — store once, join on demand.',
          'INNER JOIN returns only rows where the join condition matches in both tables. Unmatched rows from either side are excluded. Use for relationships where you only care about matched data.',
          'LEFT JOIN returns all rows from the left table. Right-side columns are NULL for rows with no match. Use when you need all left-table rows regardless of whether a match exists.',
          'RIGHT JOIN is the mirror of LEFT JOIN — almost always rewritten as LEFT JOIN with tables swapped. FULL OUTER JOIN keeps all rows from both sides with NULLs where no match.',
          'The LEFT JOIN + WHERE right_table.id IS NULL pattern finds rows with no match — customers who never ordered, products never sold. This is one of the most frequently used analytical patterns.',
          'Always use table aliases in multi-table queries. Prefix every column reference with its table alias to avoid ambiguity errors when the same column name exists in multiple tables.',
          'ON supports any boolean condition. USING (column_name) is shorthand when both tables share the same column name — the join column appears once in SELECT *.',
          'For LEFT JOINs: filters in ON apply before NULLs are added for unmatched rows. Filters in WHERE apply after — and will exclude NULL rows, converting the LEFT JOIN to an INNER JOIN.',
          'A missing or incorrect ON clause can create a Cartesian product — every row combined with every row. Always verify row counts after writing a JOIN before fetching all results.',
          'The fan-out bug: one-to-many JOINs multiply rows. SUM after a one-to-many JOIN double-counts values from the "one" side. Pre-aggregate the many side first, then join.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 31</strong>, you learn INNER JOIN in depth — every pattern, every pitfall, multi-table chains, joining on expressions, and the full suite of INNER JOIN use cases you will encounter in production analytics.
        </p>
        <Link href="/learn/sql/inner-join" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 31 → INNER JOIN
        </Link>
      </div>

    </LearnLayout>
  );
}