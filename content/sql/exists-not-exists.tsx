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

const TimeBlock = ({ time, label, children }: { time: string; label: string; children?: React.ReactNode }) => (
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

export default function ExistsNotExists() {
  return (
    <LearnLayout
      title="EXISTS and NOT EXISTS"
      description="The cleanest existence check in SQL — how EXISTS works, when it beats IN and LEFT JOIN IS NULL, every anti-join pattern, NULL safety, and performance at scale"
      section="SQL — Module 38"
      readTime="30 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What EXISTS Does — True or False, Nothing Else" />

      <P>EXISTS is a predicate — it returns TRUE or FALSE. It takes a subquery as its argument and returns TRUE if the subquery produces at least one row, FALSE if it produces zero rows. That is its entire job. The subquery's column values are completely irrelevant — only whether the subquery returns any rows matters.</P>

      <P>This simplicity is its strength. EXISTS answers one question and one question only: <Hl>does at least one matching row exist?</Hl> The moment the database finds the first matching row, it stops scanning — it does not need to find all matches, count them, or return their values. This short-circuit behaviour makes EXISTS uniquely efficient for existence checks.</P>

      <CodeBlock
        label="EXISTS — the mechanics"
        code={`-- EXISTS returns TRUE if subquery returns >= 1 row
-- EXISTS returns FALSE if subquery returns 0 rows
-- The SELECT list inside EXISTS is irrelevant — SELECT 1, SELECT *, SELECT NULL all work

-- Common convention: SELECT 1 (signals intent — result not used)
WHERE EXISTS (SELECT 1 FROM orders WHERE customer_id = c.customer_id)

-- Equivalent but unconventional:
WHERE EXISTS (SELECT * FROM orders WHERE customer_id = c.customer_id)
WHERE EXISTS (SELECT order_id FROM orders WHERE customer_id = c.customer_id)
WHERE EXISTS (SELECT NULL FROM orders WHERE customer_id = c.customer_id)

-- All four produce identical results
-- SELECT 1 is the universal convention — it communicates "I only care about existence"

-- NOT EXISTS inverts the result:
-- TRUE if subquery returns 0 rows
-- FALSE if subquery returns >= 1 row`}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Basic EXISTS — Finding Rows With Related Data" />

      <SQLPlayground
        initialQuery={`-- Customers who have placed at least one order
-- EXISTS: TRUE as soon as one matching order is found
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.city,
  c.loyalty_tier
FROM customers AS c
WHERE EXISTS (
  SELECT 1
  FROM orders AS o
  WHERE o.customer_id = c.customer_id   -- correlated link
)
ORDER BY c.loyalty_tier, c.customer_id;`}
        height={210}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Stores that have at least one delivered order
SELECT
  s.store_id,
  s.store_name,
  s.city,
  s.monthly_target
FROM stores AS s
WHERE EXISTS (
  SELECT 1
  FROM orders AS o
  WHERE o.store_id      = s.store_id
    AND o.order_status  = 'Delivered'
)
ORDER BY s.city;`}
        height={200}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Products that have been ordered at least once
SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.unit_price
FROM products AS p
WHERE EXISTS (
  SELECT 1
  FROM order_items AS oi
  WHERE oi.product_id = p.product_id
)
ORDER BY p.category, p.unit_price DESC;`}
        height={195}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="NOT EXISTS — The Anti-Join" />

      <P>NOT EXISTS finds rows in the outer table that have <Hl>no</Hl> matching row in the subquery — the anti-join. It is the safest, most semantically clear way to ask "which X has no Y?" It correctly handles NULLs, unlike NOT IN.</P>

      <H>Customers who have never ordered</H>

      <SQLPlayground
        initialQuery={`-- Customers with NO orders at all
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.email,
  c.city,
  c.joined_date
FROM customers AS c
WHERE NOT EXISTS (
  SELECT 1
  FROM orders AS o
  WHERE o.customer_id = c.customer_id
)
ORDER BY c.joined_date DESC;`}
        height={205}
        showSchema={true}
      />

      <H>Products never sold</H>

      <SQLPlayground
        initialQuery={`-- Products with zero sales history
SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.brand,
  p.unit_price,
  p.in_stock
FROM products AS p
WHERE NOT EXISTS (
  SELECT 1
  FROM order_items AS oi
  WHERE oi.product_id = p.product_id
)
ORDER BY p.category, p.unit_price DESC;`}
        height={200}
        showSchema={false}
      />

      <H>Employees with no store assignment</H>

      <SQLPlayground
        initialQuery={`-- Employees who are not assigned to any store
SELECT
  e.employee_id,
  e.first_name || ' ' || e.last_name  AS employee,
  e.role,
  e.department,
  e.salary
FROM employees AS e
WHERE NOT EXISTS (
  SELECT 1
  FROM stores AS s
  WHERE s.store_id = e.store_id
)
ORDER BY e.department, e.salary DESC;`}
        height={200}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="EXISTS with Multiple Conditions — Precise Existence Checks" />

      <P>The subquery inside EXISTS can have any WHERE conditions — combining multiple filters to check for a very specific kind of related row. This is where EXISTS becomes more powerful than a simple JOIN or IN check.</P>

      <H>Customers with at least one large delivered order</H>

      <SQLPlayground
        initialQuery={`-- Customers who have at least one delivered order above ₹1,000
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier
FROM customers AS c
WHERE EXISTS (
  SELECT 1
  FROM orders AS o
  WHERE o.customer_id  = c.customer_id
    AND o.order_status = 'Delivered'
    AND o.total_amount > 1000
)
ORDER BY c.loyalty_tier, c.customer_id;`}
        height={205}
        showSchema={true}
      />

      <H>Stores that have sold Dairy products</H>

      <SQLPlayground
        initialQuery={`-- Stores that have at least one delivered order containing a Dairy product
SELECT
  s.store_id,
  s.store_name,
  s.city
FROM stores AS s
WHERE EXISTS (
  SELECT 1
  FROM orders      AS o
  JOIN order_items AS oi ON o.order_id    = oi.order_id
  JOIN products    AS p  ON oi.product_id = p.product_id
  WHERE o.store_id     = s.store_id
    AND o.order_status = 'Delivered'
    AND p.category     = 'Dairy'
)
ORDER BY s.city;`}
        height={225}
        showSchema={false}
      />

      <H>Products ordered by Platinum customers</H>

      <SQLPlayground
        initialQuery={`-- Products that have been ordered by at least one Platinum customer
SELECT
  p.product_id,
  p.product_name,
  p.category
FROM products AS p
WHERE EXISTS (
  SELECT 1
  FROM order_items AS oi
  JOIN orders      AS o  ON oi.order_id   = o.order_id
  JOIN customers   AS c  ON o.customer_id = c.customer_id
  WHERE oi.product_id   = p.product_id
    AND c.loyalty_tier  = 'Platinum'
    AND o.order_status  = 'Delivered'
)
ORDER BY p.category, p.product_name;`}
        height={225}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="NOT EXISTS vs NOT IN vs LEFT JOIN IS NULL" />

      <P>Three approaches solve the anti-join problem — finding rows with no match. They produce the same results for non-NULL data, but differ critically in NULL handling, readability, and performance.</P>

      <H>The NULL trap in NOT IN</H>

      <CodeBlock
        label="Why NOT IN fails with NULLs"
        code={`-- Scenario: product_id 99 is in products but NOT in order_items
-- order_items.product_id has no NULL values (NOT NULL column)

-- NOT IN works correctly here:
SELECT product_name FROM products
WHERE product_id NOT IN (SELECT product_id FROM order_items);
-- Returns: products never ordered

-- But if order_items had a NULL product_id:
-- NOT IN (1, 2, 3, NULL) evaluates as:
-- NOT (pid=1 OR pid=2 OR pid=3 OR pid=NULL)
-- = NOT (FALSE OR FALSE OR FALSE OR NULL)
-- = NOT NULL = NULL  (not TRUE!)
-- Result: ZERO rows returned — completely wrong

-- NOT EXISTS is immune:
-- It checks row by row whether a match exists
-- NULL in the inner table simply means "this row has no product_id"
-- NOT EXISTS still correctly identifies products with no matches`}
      />

      <H>All three approaches — same result on clean data</H>

      <SQLPlayground
        initialQuery={`-- Method 1: NOT EXISTS (preferred — NULL-safe, semantic)
SELECT product_id, product_name
FROM products AS p
WHERE NOT EXISTS (
  SELECT 1 FROM order_items AS oi
  WHERE oi.product_id = p.product_id
)
ORDER BY product_id;`}
        height={145}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Method 2: NOT IN (works here — order_items.product_id is NOT NULL)
SELECT product_id, product_name
FROM products
WHERE product_id NOT IN (
  SELECT product_id FROM order_items
  -- Safe: product_id is NOT NULL in order_items
  -- Would break if product_id could be NULL
)
ORDER BY product_id;`}
        height={150}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Method 3: LEFT JOIN IS NULL
SELECT p.product_id, p.product_name
FROM products AS p
LEFT JOIN order_items AS oi ON p.product_id = oi.product_id
WHERE oi.item_id IS NULL
ORDER BY p.product_id;`}
        height={130}
        showSchema={false}
      />

      <H>Comparison table</H>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Approach', 'NULL safe?', 'Short-circuits?', 'Can select right-side cols?', 'Best when'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['NOT EXISTS', '✅ Always', '✅ First match found', '❌ No — subquery not projected', 'Default anti-join — clearest semantics'],
              ['NOT IN', '❌ Fails with NULLs', '❌ Must build full list', '❌ No', 'Only when 100% sure no NULLs in subquery'],
              ['LEFT JOIN IS NULL', '✅ Always', '❌ Processes all rows', '✅ Yes — right cols accessible', 'When you also need right-side data or already in a JOIN chain'],
            ].map(([approach, nulls, short, cols, when], i) => (
              <tr key={approach} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{approach}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: nulls.startsWith('✅') ? '#00e676' : '#ff4757', borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{nulls}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: short.startsWith('✅') ? '#00e676' : 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{short}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: cols.startsWith('✅') ? '#00e676' : 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{cols}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="warning">
        The NOT IN NULL trap is one of the most common silent correctness bugs in SQL. If a developer adds a row with NULL product_id to order_items, a previously working NOT IN query silently starts returning zero rows — with no error, no warning, and no visible indication that anything changed. NOT EXISTS never has this problem. Default to NOT EXISTS for all anti-join queries.
      </Callout>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="EXISTS vs IN — The Semi-Join Comparison" />

      <P>Both EXISTS and IN implement the semi-join — finding outer rows that have at least one match in the inner table. They produce the same result for non-NULL data. The choice between them is about semantics, performance, and NULL safety.</P>

      <H>EXISTS vs IN — equivalent results, different mechanics</H>

      <SQLPlayground
        initialQuery={`-- IN: collects all matching customer_ids, then filters
SELECT order_id, total_amount, order_status
FROM orders
WHERE customer_id IN (
  SELECT customer_id
  FROM customers
  WHERE city = 'Bangalore'
)
ORDER BY total_amount DESC
LIMIT 8;`}
        height={165}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- EXISTS: checks one customer at a time, stops at first match
SELECT o.order_id, o.total_amount, o.order_status
FROM orders AS o
WHERE EXISTS (
  SELECT 1
  FROM customers AS c
  WHERE c.customer_id = o.customer_id
    AND c.city = 'Bangalore'
)
ORDER BY o.total_amount DESC
LIMIT 8;`}
        height={175}
        showSchema={false}
      />

      <H>When EXISTS is faster than IN</H>
      <P>EXISTS short-circuits — it stops as soon as one matching row is found. IN builds the complete list first, then checks membership. When the inner table is large and matches are common, EXISTS does dramatically less work.</P>

      <CodeBlock
        label="Performance mechanics — EXISTS vs IN"
        code={`-- Scenario: checking if any of 1,000,000 orders belongs to Bangalore customers

-- IN approach:
-- 1. Scan customers table: collect ALL Bangalore customer_ids → 5,000 IDs
-- 2. For each of 1,000,000 orders: check if customer_id is in the 5,000-ID set
-- Total: 1,005,000 rows processed + list membership check per order

-- EXISTS approach:
-- For each of 1,000,000 orders:
--   1. Look up customer_id in customers table (index lookup)
--   2. Check if city = 'Bangalore'
--   3. If YES → stop immediately (short-circuit), include order
--   4. If NO → exclude order
-- Total: 1,000,000 index lookups (typically fast with index on customer_id)

-- On most modern optimisers:
-- Both are converted to the same JOIN plan internally
-- The logical difference matters most for complex subqueries
-- that the optimiser cannot simplify`}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="EXISTS with Aggregates — Conditional Existence" />

      <P>The subquery inside EXISTS can contain aggregates, GROUP BY, and HAVING — making it possible to check existence based on aggregate conditions, not just row-level conditions.</P>

      <SQLPlayground
        initialQuery={`-- Customers who have placed more than 2 delivered orders
-- EXISTS + HAVING: checks existence of the aggregate condition
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier
FROM customers AS c
WHERE EXISTS (
  SELECT 1
  FROM orders AS o
  WHERE o.customer_id  = c.customer_id
    AND o.order_status = 'Delivered'
  GROUP BY o.customer_id
  HAVING COUNT(*) > 2
)
ORDER BY c.loyalty_tier;`}
        height={215}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Stores that have at least one product category with 3+ orders
-- Multi-table EXISTS with aggregation
SELECT
  s.store_id,
  s.city
FROM stores AS s
WHERE EXISTS (
  SELECT 1
  FROM orders      AS o
  JOIN order_items AS oi ON o.order_id    = oi.order_id
  JOIN products    AS p  ON oi.product_id = p.product_id
  WHERE o.store_id     = s.store_id
    AND o.order_status = 'Delivered'
  GROUP BY p.category
  HAVING COUNT(DISTINCT o.order_id) >= 3
)
ORDER BY s.city;`}
        height={235}
        showSchema={false}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Double NOT EXISTS — Relational Division" />

      <P><Hl>Relational division</Hl> asks "which X has done ALL of Y?" — customers who have ordered every product in a category, employees who have completed every required training, stores that have sold every product. This is one of the hardest patterns in SQL, cleanly solved by double NOT EXISTS.</P>

      <H>The logic of double NOT EXISTS</H>

      <CodeBlock
        label="Relational division — the double NOT EXISTS pattern"
        code={`-- GOAL: find customers who have ordered EVERY product in the Dairy category
-- Read as: customers for whom there does NOT EXIST a Dairy product
--          that they have NOT ordered

SELECT c.customer_id, c.first_name
FROM customers AS c
WHERE NOT EXISTS (
  -- Is there a Dairy product...
  SELECT 1
  FROM products AS p
  WHERE p.category = 'Dairy'
    AND NOT EXISTS (
      -- ...that this customer has NOT ordered?
      SELECT 1
      FROM order_items AS oi
      JOIN orders AS o ON oi.order_id = o.order_id
      WHERE oi.product_id  = p.product_id
        AND o.customer_id  = c.customer_id  -- correlated to outer customer
        AND o.order_status = 'Delivered'
    )
)
-- Logic:
-- Outer NOT EXISTS: no Dairy product satisfies the inner condition
-- Inner NOT EXISTS: the customer has NOT ordered this product
-- Together: no Dairy product exists that the customer hasn't ordered
--           = customer has ordered ALL Dairy products`}
      />

      <SQLPlayground
        initialQuery={`-- Customers who have ordered at least one product from EVERY category
-- Double NOT EXISTS — relational division
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier
FROM customers AS c
WHERE NOT EXISTS (
  -- Is there a category...
  SELECT 1
  FROM (SELECT DISTINCT category FROM products) AS cats
  WHERE NOT EXISTS (
    -- ...that this customer has NOT ordered from?
    SELECT 1
    FROM order_items AS oi
    JOIN orders      AS o  ON oi.order_id   = o.order_id
    JOIN products    AS p  ON oi.product_id = p.product_id
    WHERE o.customer_id  = c.customer_id    -- correlated
      AND o.order_status = 'Delivered'
      AND p.category     = cats.category   -- correlated to outer category
  )
)
ORDER BY c.customer_id;`}
        height={270}
        showSchema={true}
      />

      <ProTip>
        Double NOT EXISTS (relational division) is one of the few SQL problems that has no clean equivalent using JOINs or window functions. It is the canonical solution for "find X that has done ALL of Y" queries. The nested logic reads inside-out: for a customer to qualify, there must NOT EXIST any category for which it is true that the customer has NOT ordered from that category. Read it slowly, inside-out, and it becomes clear.
      </ProTip>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="EXISTS in UPDATE and DELETE — Conditional DML" />

      <P>EXISTS is not limited to SELECT queries. It appears in UPDATE and DELETE statements to conditionally modify rows based on whether related data exists.</P>

      <H>UPDATE rows where related data exists</H>

      <CodeBlock
        label="EXISTS in UPDATE — conditional modification"
        code={`-- Mark customers as 'Gold' if they have placed 3+ delivered orders
-- Only update customers who currently are 'Silver'
UPDATE customers AS c
SET loyalty_tier = 'Gold'
WHERE c.loyalty_tier = 'Silver'
  AND EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id  = c.customer_id
      AND o.order_status = 'Delivered'
    GROUP BY o.customer_id
    HAVING COUNT(*) >= 3
  );

-- Preview the change before running:
SELECT customer_id, first_name, loyalty_tier
FROM customers AS c
WHERE loyalty_tier = 'Silver'
  AND EXISTS (
    SELECT 1 FROM orders AS o
    WHERE o.customer_id = c.customer_id AND o.order_status = 'Delivered'
    GROUP BY o.customer_id HAVING COUNT(*) >= 3
  );`}
      />

      <H>DELETE rows where related data does NOT exist</H>

      <CodeBlock
        label="NOT EXISTS in DELETE — orphan cleanup"
        code={`-- Delete order_items that reference non-existent orders
-- (data quality cleanup after migration)
DELETE FROM order_items AS oi
WHERE NOT EXISTS (
  SELECT 1
  FROM orders AS o
  WHERE o.order_id = oi.order_id
);

-- Always preview with SELECT before DELETE:
SELECT oi.item_id, oi.order_id
FROM order_items AS oi
WHERE NOT EXISTS (
  SELECT 1 FROM orders AS o
  WHERE o.order_id = oi.order_id
);`}
      />

      <SQLPlayground
        initialQuery={`-- Preview: which customers would get a loyalty upgrade?
-- EXISTS in UPDATE simulation — show affected rows without changing data
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.loyalty_tier                       AS current_tier,
  'Gold'                               AS would_become,
  (
    SELECT COUNT(*)
    FROM orders AS o
    WHERE o.customer_id  = c.customer_id
      AND o.order_status = 'Delivered'
  )                                    AS delivered_orders
FROM customers AS c
WHERE c.loyalty_tier = 'Bronze'
  AND EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id  = c.customer_id
      AND o.order_status = 'Delivered'
    GROUP BY o.customer_id
    HAVING COUNT(*) >= 2
  )
ORDER BY c.customer_id;`}
        height={265}
        showSchema={true}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Performance Deep Dive — How EXISTS Executes" />

      <P>EXISTS performance depends on the database's ability to use indexes on the correlated column and how quickly the first matching row is found. Understanding the execution model helps you write EXISTS queries that run fast at any scale.</P>

      <H>Index usage with EXISTS</H>

      <CodeBlock
        label="EXISTS performance — index usage"
        code={`-- FAST: EXISTS with indexed join column
-- orders.customer_id is a FK — should be indexed
WHERE EXISTS (
  SELECT 1 FROM orders AS o
  WHERE o.customer_id = c.customer_id   -- index lookup on customer_id
)
-- For each customer: one index lookup into orders
-- Cost: O(customers) × O(log orders) = very fast

-- SLOW: EXISTS without index on join column
WHERE EXISTS (
  SELECT 1 FROM orders AS o
  WHERE o.payment_method = 'COD'        -- payment_method may not be indexed
    AND o.customer_id = c.customer_id
)
-- For each customer: index lookup on customer_id, then filter payment_method
-- If customer_id index exists, still fast
-- If no index at all: full table scan per customer = O(n²)

-- Rule: the correlated column in EXISTS must be indexed in the inner table
-- Check: SELECT indexname FROM pg_indexes WHERE tablename = 'orders'`}
      />

      <H>EXISTS vs COUNT(*) {'>'} 0 — always prefer EXISTS</H>

      <CodeBlock
        label="EXISTS vs COUNT — why EXISTS wins"
        code={`-- WRONG pattern: use COUNT to check existence
WHERE (SELECT COUNT(*) FROM orders WHERE customer_id = c.customer_id) > 0
-- This scans ALL matching rows and counts them before comparing to 0
-- Wasted work: the count after 1 is irrelevant

-- RIGHT pattern: use EXISTS
WHERE EXISTS (SELECT 1 FROM orders WHERE customer_id = c.customer_id)
-- Stops immediately on finding the first row
-- No counting needed

-- Performance difference:
-- Customer with 10,000 orders:
--   COUNT approach: scans all 10,000 rows to count them
--   EXISTS approach: scans 1 row and stops
-- At scale this is the difference between seconds and milliseconds`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate: EXISTS stops at first match
-- Both return same customers but EXISTS is faster at scale

-- EXISTS version
SELECT c.customer_id, c.first_name
FROM customers AS c
WHERE EXISTS (
  SELECT 1
  FROM orders AS o
  WHERE o.customer_id = c.customer_id
    AND o.order_status = 'Delivered'
    AND o.total_amount > 500
)
ORDER BY c.customer_id;`}
        height={185}
        showSchema={true}
      />

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are a backend engineer at Swiggy. The marketing team is planning three campaign segments and needs the customer lists. Each segment uses a different existence condition — perfect for EXISTS and NOT EXISTS queries. The lists must be mutually exclusive and exhaustive.</P>

      <TimeBlock time="3:00 PM" label="Three segment definitions">
        Segment A: customers who have placed at least one order above ₹1,500 (high-value ever). Segment B: customers who have placed orders but never one above ₹500 (consistent low-value). Segment C: customers who have never placed any delivered order (dormant). Adapted for FreshMart data.
      </TimeBlock>

      <TimeBlock time="3:20 PM" label="Segment A — high value customers">
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Segment A: customers with at least one delivered order above ₹1,000
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.city,
  c.loyalty_tier,
  'Segment A: High Value'             AS segment
FROM customers AS c
WHERE EXISTS (
  SELECT 1 FROM orders AS o
  WHERE o.customer_id  = c.customer_id
    AND o.order_status = 'Delivered'
    AND o.total_amount > 1000
)
ORDER BY c.loyalty_tier, c.customer_id;`}
        height={210}
        showSchema={true}
      />

      <TimeBlock time="3:35 PM" label="Segment B — consistent low-value customers">
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Segment B: customers who have ordered but NEVER above ₹500
-- Has orders (EXISTS) BUT has no large order (NOT EXISTS)
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.city,
  c.loyalty_tier,
  'Segment B: Low Value'              AS segment
FROM customers AS c
WHERE EXISTS (
  -- Has at least one delivered order
  SELECT 1 FROM orders AS o
  WHERE o.customer_id  = c.customer_id
    AND o.order_status = 'Delivered'
)
AND NOT EXISTS (
  -- But never had one above ₹500
  SELECT 1 FROM orders AS o
  WHERE o.customer_id  = c.customer_id
    AND o.order_status = 'Delivered'
    AND o.total_amount > 500
)
ORDER BY c.customer_id;`}
        height={240}
        showSchema={false}
      />

      <TimeBlock time="3:50 PM" label="Segment C — dormant customers">
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Segment C: customers with NO delivered orders at all
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer,
  c.city,
  c.loyalty_tier,
  c.joined_date,
  'Segment C: Dormant'                AS segment
FROM customers AS c
WHERE NOT EXISTS (
  SELECT 1 FROM orders AS o
  WHERE o.customer_id  = c.customer_id
    AND o.order_status = 'Delivered'
)
ORDER BY c.joined_date DESC;`}
        height={205}
        showSchema={false}
      />

      <TimeBlock time="4:05 PM" label="All three segments delivered in 45 minutes">
        Three EXISTS/NOT EXISTS queries — each clean, readable, and correct. The marketing team gets three mutually exclusive lists. Combining EXISTS and NOT EXISTS in Segment B (ordered at least once but never above ₹500) is the clearest way to express that exact business logic — no JOIN or GROUP BY alternative would be as direct.
      </TimeBlock>

      <ProTip>
        Combining EXISTS and NOT EXISTS in the same WHERE clause is the natural SQL expression for "has done X but never done Y" — a compound existence condition. This pattern appears constantly in retention and segmentation analytics: customers who churned (ordered before but not recently), users who started but never completed, employees who are assigned but have not performed. Build the EXISTS + NOT EXISTS compound pattern into your analytics toolkit.
      </ProTip>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="How does EXISTS work and why does it use SELECT 1 inside the subquery?">
        <p style={{ margin: '0 0 14px' }}>EXISTS evaluates a correlated subquery and returns TRUE if the subquery produces at least one row, FALSE if it produces zero rows. It does not examine the values returned by the subquery — only whether any rows exist. The database stops evaluating the subquery as soon as the first matching row is found (short-circuit behaviour), making it efficient for existence checks.</p>
        <p style={{ margin: '0 0 14px' }}>SELECT 1 inside EXISTS is a universal convention that signals intent: "I only care whether rows exist, not what values they contain." The 1 is a constant — it carries no information. Writing SELECT 1 rather than SELECT * or SELECT column_name communicates to any reader that the subquery's output is irrelevant and the purpose is purely an existence check. This convention is widely recognised and expected in professional SQL code.</p>
        <p style={{ margin: 0 }}>Technically, SELECT *, SELECT column, SELECT NULL, and SELECT 1 all produce equivalent results inside EXISTS. The database optimiser ignores the SELECT list entirely when evaluating EXISTS — it only cares whether the WHERE conditions inside the subquery are satisfied for at least one row. SELECT 1 is the standard precisely because it makes this intent explicit. Using SELECT * inside EXISTS can mislead readers into thinking the column values matter, and in older database versions, SELECT * could cause unnecessary column retrieval overhead (though modern optimisers eliminate this).</p>
      </IQ>

      <IQ q="Why is NOT EXISTS safer than NOT IN for anti-join queries?">
        <p style={{ margin: '0 0 14px' }}>NOT IN fails silently when the subquery contains NULL values, returning zero rows for every comparison — a critical correctness bug with no error message. The mechanism: NOT IN (1, 2, NULL) is evaluated as NOT (col = 1 OR col = 2 OR col = NULL). Since col = NULL evaluates to NULL in SQL's three-valued logic (not FALSE), the entire OR expression can evaluate to NULL for any col value, and NOT NULL = NULL (still not TRUE). WHERE discards all NULL-result rows, returning zero results for the entire query — even when non-NULL unmatched rows clearly exist.</p>
        <p style={{ margin: '0 0 14px' }}>NOT EXISTS is immune to this problem. It evaluates row-by-row whether a matching row exists. A NULL value in the inner table's column means "this particular row has no value for this column" — it does not affect whether other rows match. The existence check for the outer row is independent of NULLs in non-matching rows.</p>
        <p style={{ margin: 0 }}>The silent failure mode of NOT IN makes it particularly dangerous in production. A schema change that adds a nullable foreign key column, a bulk import that inserts a row with NULL in the join column, or a data quality issue that introduces unexpected NULLs — any of these can cause a previously working NOT IN query to silently start returning zero rows with no error, warning, or any visible indication that the query's behaviour changed. NOT EXISTS never exhibits this behaviour. Professional SQL standards at most companies mandate NOT EXISTS (or LEFT JOIN IS NULL) for all anti-join queries, with NOT IN only permitted when a NOT NULL constraint on the join column is verified and documented.</p>
      </IQ>

      <IQ q="What is relational division and how do you implement it with double NOT EXISTS?">
        <p style={{ margin: '0 0 14px' }}>Relational division finds entities that satisfy all members of a set — "which customers have ordered every product in the Dairy category?", "which employees have completed all required trainings?", "which stores have sold every product?" It is the relational equivalent of universal quantification: for all Y in the required set, X has done Y.</p>
        <p style={{ margin: '0 0 14px' }}>The double NOT EXISTS pattern implements this by expressing the condition logically: "find X for which there does NOT EXIST a required Y that X has NOT completed." This translates to two nested NOT EXISTS: the outer NOT EXISTS checks "is there a required item (Y)?", the inner NOT EXISTS checks "has X done Y?" If the outer NOT EXISTS is satisfied — no required item exists that X has not done — then X has done all required items.</p>
        <p style={{ margin: 0 }}>SQL implementation: SELECT * FROM customers AS c WHERE NOT EXISTS (SELECT 1 FROM products AS p WHERE p.category = 'Dairy' AND NOT EXISTS (SELECT 1 FROM order_items AS oi JOIN orders AS o ON oi.order_id = o.order_id WHERE oi.product_id = p.product_id AND o.customer_id = c.customer_id AND o.order_status = 'Delivered')). Read inside-out: the innermost subquery asks "has this customer ordered this Dairy product?" The middle NOT EXISTS makes it "is there a Dairy product this customer has NOT ordered?" The outer NOT EXISTS makes it "is there NO Dairy product this customer hasn't ordered?" — which is TRUE only when the customer has ordered all Dairy products. This is the only clean SQL implementation of relational division; JOIN-based alternatives are more complex and fragile.</p>
      </IQ>

      <IQ q="When would you combine EXISTS and NOT EXISTS in the same WHERE clause?">
        <p style={{ margin: '0 0 14px' }}>Combining EXISTS and NOT EXISTS in WHERE expresses compound existence conditions — "has done X but never done Y", "is active but has not completed Z", "was created but has not been processed." These are very common in analytics and CRM segmentation.</p>
        <p style={{ margin: '0 0 14px' }}>The pattern: WHERE EXISTS (...has the required condition...) AND NOT EXISTS (...lacks the disqualifying condition...). Examples: customers who have placed at least one order (EXISTS) but have never cancelled one (NOT EXISTS) — loyal customers. Employees who are assigned to a store (EXISTS) but have never managed a project (NOT EXISTS) — candidates for project lead rotation. Products that have been sold (EXISTS) but never returned (NOT EXISTS) — reliable products for promotion.</p>
        <p style={{ margin: 0 }}>The compound pattern is more readable than the JOIN alternative. WHERE EXISTS (...) AND NOT EXISTS (...) reads almost like English — "customers who have ordered AND have not cancelled." The equivalent with JOINs requires careful outer join construction and NULL checking, which is less immediately clear. Use EXISTS + NOT EXISTS whenever a business question involves multiple independent existence conditions that combine with AND — each condition naturally maps to one EXISTS or NOT EXISTS clause.</p>
      </IQ>

      <IQ q="How does the performance of EXISTS compare to a JOIN for the same query?">
        <p style={{ margin: '0 0 14px' }}>For most queries on modern databases, EXISTS and the equivalent JOIN produce the same query plan — the optimiser recognises the semi-join pattern and converts both to the same execution strategy. The logical difference (EXISTS short-circuits, JOIN processes all rows) is typically erased by the optimiser's plan selection.</p>
        <p style={{ margin: '0 0 14px' }}>Where EXISTS has a genuine performance advantage over JOIN: when the subquery's early exit (short-circuit) is preserved by the optimiser and matches are very common. If 90% of customers have orders, EXISTS finds one order per customer and stops — processing on average ~1.1 inner rows per outer row. A JOIN processes all matching orders per customer, which could be 5, 10, or 100 rows per customer. For large tables with many matches per outer row, this can be significant.</p>
        <p style={{ margin: 0 }}>Where JOIN can be faster: when the JOIN uses a hash join with a small build side — the optimiser builds a hash table from the inner table and probes it for each outer row in O(1) per probe. For EXISTS on large tables with complex subqueries that the optimiser cannot convert to a hash join, the correlated execution (one subquery per outer row) can be slower. The practical guidance: both approaches are equivalent for most production queries on indexed tables. Use EXISTS when existence semantics are the intent (clearest code), use JOIN when you need columns from the right table (EXISTS cannot project them). If performance matters, measure both with EXPLAIN ANALYZE on realistic data volumes.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="NOT EXISTS returns all rows — the filter appears to have no effect"
        cause="The correlated condition inside NOT EXISTS is missing. NOT EXISTS (SELECT 1 FROM orders) without a WHERE clause linking to the outer query checks whether the orders table has any rows at all — which is always TRUE when the table is non-empty. NOT TRUE = FALSE for every outer row, so no customers are excluded. The subquery needs to be correlated to the current outer row."
        fix="Add the correlated WHERE condition: WHERE NOT EXISTS (SELECT 1 FROM orders AS o WHERE o.customer_id = c.customer_id). The inner WHERE must reference the outer alias (c.customer_id) to make the check specific to the current outer row. Verify by testing the inner query manually: SELECT 1 FROM orders WHERE customer_id = 1 — this should return rows for customers who have ordered and no rows for those who have not."
      />

      <Err
        msg="NOT EXISTS returns zero rows — expected to find some customers with no orders"
        cause="The NOT EXISTS subquery has a condition that is always satisfied or references the wrong column. A common mistake: NOT EXISTS (SELECT 1 FROM orders WHERE customer_id IS NOT NULL) — this checks whether any order exists with a non-NULL customer_id, which is almost always TRUE, making NOT EXISTS always FALSE and returning zero rows. Another cause: missing the correlated link so it tests a global condition."
        fix="Verify the correlated condition specifically links to the outer row: WHERE NOT EXISTS (SELECT 1 FROM orders AS o WHERE o.customer_id = c.customer_id). Test by temporarily changing NOT EXISTS to EXISTS — it should return the rows you want to exclude. If EXISTS returns the expected rows, NOT EXISTS should return the complement. Also check whether the outer table has any rows that genuinely have no matches in the inner table — NOT EXISTS correctly returns zero rows if all outer rows do have matches."
      />

      <Err
        msg="EXISTS subquery runs very slowly — takes minutes on a large table"
        cause="The correlated column in the EXISTS subquery's WHERE is not indexed in the inner table. Without an index, each outer row evaluation requires a full scan of the inner table. For N outer rows, total cost is N × full_table_scan — O(n²). With 100,000 customers and 1,000,000 orders, this means 100,000 full scans of 1,000,000 rows = 100 billion row comparisons."
        fix="Create an index on the correlated column in the inner table: CREATE INDEX idx_orders_customer_id ON orders(customer_id). With this index, each EXISTS check is one index lookup — O(log n) instead of O(n). Also add indexes on any additional filter columns used inside the subquery: CREATE INDEX idx_orders_status_customer ON orders(order_status, customer_id) for EXISTS queries that filter on both status and customer_id. Use EXPLAIN ANALYZE to verify the index is being used after creation."
      />

      <Err
        msg="Double NOT EXISTS (relational division) returns no rows — expected some results"
        cause="The double NOT EXISTS logic is inverted or the correlated conditions reference the wrong tables. The outer NOT EXISTS should reference the required set (e.g., Dairy products), and the inner NOT EXISTS should reference the action table (e.g., order_items). Common mistake: both NOT EXISTS reference the same table, making the logic wrong. Another cause: the required set is empty — if no Dairy products exist, NOT EXISTS (SELECT 1 FROM products WHERE category = 'Dairy' AND NOT EXISTS (...)) is vacuously TRUE for all customers."
        fix="Read the double NOT EXISTS inside-out to verify logic: inner NOT EXISTS should ask 'has this customer ordered this product?', outer NOT EXISTS should ask 'does a product exist that the customer has NOT ordered?'. Trace through one specific customer manually: pick a customer_id, run the inner NOT EXISTS subquery for each Dairy product and verify it correctly returns rows when the customer hasn't ordered that product. Also verify the required set is non-empty: SELECT COUNT(*) FROM products WHERE category = 'Dairy'."
      />

      <Err
        msg="EXISTS in UPDATE modifies too many rows — more than expected"
        cause="The EXISTS subquery is not specific enough — it matches rows that should not be included in the update. A missing filter condition in the subquery, or a correlated condition that is too broad, causes EXISTS to return TRUE for outer rows that should not be updated."
        fix="Always preview an EXISTS UPDATE as a SELECT first: convert UPDATE table SET col = val WHERE EXISTS (...) to SELECT * FROM table WHERE EXISTS (...) and verify exactly which rows would be affected. The SELECT shows you the scope before any modification. If the SELECT returns unexpected rows, tighten the EXISTS subquery's WHERE conditions. Add AND o.order_status = 'Delivered' or other filters to make the existence check more specific. Only run the UPDATE after the SELECT confirms the exact expected rows."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write three queries using EXISTS and NOT EXISTS: (1) Find all stores that have at least one employee AND at least one delivered order worth more than ₹800. Show store_id, city, and store_name. (2) Find all customers who have placed at least one delivered order but have NEVER used COD (Cash on Delivery) as a payment method. Show customer_id, full name, city, and loyalty_tier. (3) Find all products that exist in the products table but have never appeared in any delivered order. Then also find products that appear in delivered orders but have a unit_price below ₹30 AND have been ordered more than once. Combine both using UNION ALL with a 'reason' column labelling each set."
        hint="Query 1: EXISTS for employees AND EXISTS for large orders — two separate EXISTS. Query 2: EXISTS for any delivered order AND NOT EXISTS for COD delivered orders. Query 3: NOT EXISTS for no delivered orders; EXISTS with HAVING for low-price frequent products. UNION ALL with literal reason strings."
        answer={`-- Query 1: Stores with employees AND large orders
SELECT
  s.store_id,
  s.city,
  s.store_name
FROM stores AS s
WHERE EXISTS (
  SELECT 1 FROM employees AS e
  WHERE e.store_id = s.store_id
)
AND EXISTS (
  SELECT 1 FROM orders AS o
  WHERE o.store_id     = s.store_id
    AND o.order_status = 'Delivered'
    AND o.total_amount > 800
)
ORDER BY s.city;

-- Query 2: Customers who ordered but never used COD
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS full_name,
  c.city,
  c.loyalty_tier
FROM customers AS c
WHERE EXISTS (
  SELECT 1 FROM orders AS o
  WHERE o.customer_id  = c.customer_id
    AND o.order_status = 'Delivered'
)
AND NOT EXISTS (
  SELECT 1 FROM orders AS o
  WHERE o.customer_id   = c.customer_id
    AND o.order_status  = 'Delivered'
    AND o.payment_method = 'COD'
)
ORDER BY c.loyalty_tier, c.customer_id;

-- Query 3: Never delivered + cheap but frequent — combined
SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.unit_price,
  'Never in delivered order' AS reason
FROM products AS p
WHERE NOT EXISTS (
  SELECT 1
  FROM order_items AS oi
  JOIN orders AS o ON oi.order_id = o.order_id
  WHERE oi.product_id  = p.product_id
    AND o.order_status = 'Delivered'
)

UNION ALL

SELECT
  p.product_id,
  p.product_name,
  p.category,
  p.unit_price,
  'Cheap but frequently ordered' AS reason
FROM products AS p
WHERE p.unit_price < 30
  AND EXISTS (
    SELECT 1
    FROM order_items AS oi
    JOIN orders AS o ON oi.order_id = o.order_id
    WHERE oi.product_id  = p.product_id
      AND o.order_status = 'Delivered'
    GROUP BY oi.product_id
    HAVING COUNT(DISTINCT o.order_id) > 1
  )
ORDER BY reason, category, unit_price;`}
        explanation="Query 1 uses two separate EXISTS conditions connected with AND — both must be TRUE for a store to qualify. Each EXISTS independently checks a different relationship (employees vs orders). Query 2 is the EXISTS + NOT EXISTS compound pattern: EXISTS confirms the customer has delivered orders, NOT EXISTS confirms they have never used COD. Both use the same correlated column (customer_id) but different filter conditions. Query 3 combines NOT EXISTS (for never-delivered products) with EXISTS + HAVING (for low-price frequent products) using UNION ALL. The EXISTS with HAVING uses GROUP BY inside the subquery to count distinct orders — a valid pattern that checks whether an aggregate condition is satisfied for the correlated row. The literal string 'reason' column labels each set. UNION ALL (not UNION) is correct here — the two sets are logically distinct and there should be no overlap between 'never ordered' and 'frequently ordered' products."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'EXISTS returns TRUE if the subquery produces at least one row, FALSE if it produces zero rows. It short-circuits — stops scanning on the first match. Column values inside the subquery are irrelevant.',
          'SELECT 1 inside EXISTS is the universal convention — it signals that only existence matters, not the subquery\'s output. SELECT *, SELECT NULL, and SELECT 1 all produce identical results inside EXISTS.',
          'NOT EXISTS is the safest anti-join — it correctly handles NULLs. NOT IN fails silently when the subquery contains NULL values, returning zero rows with no error.',
          'The correlated condition inside EXISTS must link to the outer query\'s current row. WITHOUT EXISTS (SELECT 1 FROM orders WHERE customer_id = c.customer_id) — missing this link makes EXISTS a global check, not a per-row check.',
          'EXISTS + NOT EXISTS combined in WHERE expresses compound existence: "has done X but never done Y". This is the SQL pattern for segmentation conditions like "ordered but never cancelled."',
          'Double NOT EXISTS implements relational division — "find X that has done ALL of Y." Read inside-out: outer NOT EXISTS checks for missing required items, inner NOT EXISTS checks if the specific item was done.',
          'EXISTS in UPDATE and DELETE enables conditional DML — update rows that have related data, delete orphaned rows that reference missing parents.',
          'Always preview EXISTS-based UPDATE and DELETE as SELECT first — convert to SELECT * WHERE EXISTS (...) and verify the exact rows affected before running the modification.',
          'For performance: index the correlated column in the inner table. Without an index, EXISTS is O(n²). With an index, it is O(n log n). Use EXPLAIN ANALYZE to verify index usage.',
          'EXISTS vs COUNT(*) > 0: always use EXISTS. COUNT scans all matching rows before comparing. EXISTS stops at the first match. COUNT(*) > 0 is always slower and semantically misleading.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 39</strong>, you learn UNION, INTERSECT, and EXCEPT — set operations that combine result sets vertically, with every deduplication, ordering, and column-matching rule you need.
        </p>
        <Link href="/learn/sql/union-intersect-except" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 39 → UNION, INTERSECT, and EXCEPT
        </Link>
      </div>

    </LearnLayout>
  );
}