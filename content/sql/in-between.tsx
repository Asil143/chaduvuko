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

export default function InBetween() {
  return (
    <LearnLayout
      title="IN and BETWEEN Operators"
      description="Clean shorthand for multiple OR conditions and range checks — how IN and BETWEEN work, their equivalents, NULL behaviour, and every production pattern"
      section="SQL — Module 15"
      readTime="25 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The Problem They Solve" />

      <P>You have already learned AND and OR from Module 07. They work perfectly — but they get verbose quickly. Consider finding all orders with one of four possible statuses:</P>

      <CodeBlock
        label="The verbose OR version — works but noisy"
        code={`-- Five conditions, four OR keywords, lots of repetition
WHERE order_status = 'Delivered'
   OR order_status = 'Processing'
   OR order_status = 'Cancelled'
   OR order_status = 'Returned'`}
      />

      <P>Now consider finding orders within a price range:</P>

      <CodeBlock
        label="The verbose range version — works but error-prone"
        code={`-- Easy to forget whether the boundaries are inclusive
WHERE total_amount >= 500
  AND total_amount <= 2000`}
      />

      <P>Both work. But SQL provides two operators specifically designed to make these patterns cleaner, more readable, and less error-prone: <Hl>IN</Hl> for matching against a list of values, and <Hl>BETWEEN</Hl> for matching a range. Every professional SQL writer uses both constantly.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="IN — Match Against a List of Values" />

      <P>The IN operator checks whether a column value matches any value in a specified list. It is exactly equivalent to multiple OR conditions with = — just far more readable.</P>

      <CodeBlock
        label="IN syntax"
        code={`-- Syntax:
column IN (value1, value2, value3, ...)

-- Equivalent to:
column = value1 OR column = value2 OR column = value3 ...

-- Examples:
WHERE city IN ('Bangalore', 'Hyderabad', 'Mumbai')
WHERE order_status IN ('Cancelled', 'Returned')
WHERE loyalty_tier IN ('Gold', 'Platinum')
WHERE product_id IN (1, 5, 9, 17, 21)`}
      />

      <H>IN with text values</H>

      <SQLPlayground
        initialQuery={`-- Customers in metro cities
-- Much cleaner than: city = 'Bangalore' OR city = 'Hyderabad' OR city = 'Mumbai'
SELECT first_name, last_name, city, loyalty_tier
FROM customers
WHERE city IN ('Bangalore', 'Hyderabad', 'Mumbai')
ORDER BY city, last_name;`}
        height={130}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Gold and Platinum loyalty tier customers
SELECT first_name, last_name, city, loyalty_tier, joined_date
FROM customers
WHERE loyalty_tier IN ('Gold', 'Platinum')
ORDER BY loyalty_tier, joined_date DESC;`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Problem orders — either cancelled or returned
SELECT order_id, customer_id, order_date,
       order_status, payment_method, total_amount
FROM orders
WHERE order_status IN ('Cancelled', 'Returned')
ORDER BY total_amount DESC;`}
        height={140}
        showSchema={false}
      />

      <H>IN with numeric values</H>

      <SQLPlayground
        initialQuery={`-- Specific products by ID
-- Useful when an application passes a known set of IDs
SELECT product_id, product_name, brand, unit_price
FROM products
WHERE product_id IN (1, 5, 9, 15, 21)
ORDER BY product_id;`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Orders from specific stores
SELECT order_id, store_id, order_date, total_amount, order_status
FROM orders
WHERE store_id IN ('ST001', 'ST005', 'ST008')
ORDER BY store_id, order_date DESC;`}
        height={130}
        showSchema={false}
      />

      <H>IN with dates</H>

      <SQLPlayground
        initialQuery={`-- Orders placed on specific dates
SELECT order_id, customer_id, order_date, total_amount
FROM orders
WHERE order_date IN ('2024-01-05', '2024-01-15', '2024-02-14')
ORDER BY order_date;`}
        height={120}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="NOT IN — Excluding a List of Values" />

      <P>NOT IN is the inverse of IN â€” it returns rows where the column value does NOT match any value in the list. Equivalent to multiple &lt;&gt; conditions combined with AND.</P>

      <CodeBlock
        label="NOT IN syntax"
        code={`-- Syntax:
column NOT IN (value1, value2, value3, ...)

-- Equivalent to:
column <> value1 AND column <> value2 AND column <> value3 ...

-- Examples:
WHERE city NOT IN ('Bangalore', 'Mumbai')
WHERE order_status NOT IN ('Cancelled', 'Returned')
WHERE loyalty_tier NOT IN ('Bronze')`}
      />

      <SQLPlayground
        initialQuery={`-- Customers NOT in the two largest metros
SELECT first_name, last_name, city, loyalty_tier
FROM customers
WHERE city NOT IN ('Bangalore', 'Mumbai')
ORDER BY city, last_name;`}
        height={120}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Successfully completed orders only
-- Exclude Cancelled and Returned — keep everything else
SELECT order_id, customer_id, order_date,
       order_status, total_amount
FROM orders
WHERE order_status NOT IN ('Cancelled', 'Returned')
ORDER BY order_date DESC;`}
        height={140}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Products NOT from the major national brands
-- Local and niche brands only
SELECT product_name, brand, category, unit_price
FROM products
WHERE brand NOT IN ('Amul', 'Tata', 'Nestle', 'Britannia', 'P&G', 'HUL', 'Parle')
ORDER BY brand, unit_price;`}
        height={140}
        showSchema={false}
      />

      <Callout type="warning">
        NOT IN has a critical NULL trap — the same one covered in Module 11. If the IN list contains even one NULL value, NOT IN returns zero rows for the entire query. This is because NOT IN expands to col &lt;&gt; val1 AND col &lt;&gt; val2 AND col &lt;&gt; NULL, and col &lt;&gt; NULL evaluates to NULL (not TRUE), making the entire condition NULL for every row. Always verify your IN list has no NULLs, or use NOT EXISTS instead when the list comes from a subquery.
      </Callout>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="IN with a Subquery — Dynamic Lists" />

      <P>The most powerful use of IN is with a <Hl>subquery</Hl> — instead of a hardcoded list, the list of values is dynamically computed by another SELECT. This is called a subquery or inner query. You will learn subqueries fully in Module 36, but here is the pattern so you can use it now.</P>

      <CodeBlock
        label="IN with subquery syntax"
        code={`-- Syntax:
WHERE column IN (SELECT column FROM another_table WHERE condition)

-- The subquery runs first and produces the list
-- The outer query then checks each row against that list`}
      />

      <SQLPlayground
        initialQuery={`-- Customers who have placed at least one order
-- The subquery returns all customer_ids that appear in orders
-- IN then checks if each customer's ID is in that list
SELECT customer_id, first_name, last_name, city, loyalty_tier
FROM customers
WHERE customer_id IN (
  SELECT DISTINCT customer_id
  FROM orders
)
ORDER BY last_name;`}
        height={170}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Products that have been ordered at least once
-- Subquery gets all product_ids from order_items
SELECT product_id, product_name, brand, unit_price
FROM products
WHERE product_id IN (
  SELECT DISTINCT product_id
  FROM order_items
)
ORDER BY product_name;`}
        height={160}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Stores that had at least one cancelled order
SELECT store_id, store_name, city, manager_name
FROM stores
WHERE store_id IN (
  SELECT DISTINCT store_id
  FROM orders
  WHERE order_status = 'Cancelled'
)
ORDER BY city;`}
        height={160}
        showSchema={false}
      />

      <ProTip>
        When using IN with a subquery, the subquery must return exactly one column — the column you are comparing against. If the subquery returns multiple columns, SQL throws an error. Also add DISTINCT to the subquery when possible: SELECT DISTINCT customer_id FROM orders returns fewer rows for the IN check to process, which improves performance on large tables.
      </ProTip>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="BETWEEN — Match a Range (Inclusive)" />

      <P>BETWEEN checks whether a value falls within a range â€” inclusive of both endpoints. It is equivalent to &gt;= lower_bound AND &lt;= upper_bound, but cleaner and less error-prone (no risk of accidentally mixing &gt; and &gt;= or forgetting which end is inclusive).</P>

      <CodeBlock
        label="BETWEEN syntax"
        code={`-- Syntax:
column BETWEEN lower_bound AND upper_bound

-- Equivalent to:
column >= lower_bound AND column <= upper_bound

-- IMPORTANT: BETWEEN is INCLUSIVE on BOTH ends
-- Both lower_bound and upper_bound ARE included in the result

-- Examples:
WHERE unit_price BETWEEN 50 AND 200
WHERE total_amount BETWEEN 500 AND 2000
WHERE order_date BETWEEN '2024-01-01' AND '2024-01-31'
WHERE salary BETWEEN 30000 AND 60000`}
      />

      <H>BETWEEN with numbers</H>

      <SQLPlayground
        initialQuery={`-- Products priced between ₹50 and ₹200 (inclusive)
-- Same as: WHERE unit_price >= 50 AND unit_price <= 200
SELECT product_name, brand, category, unit_price
FROM products
WHERE unit_price BETWEEN 50 AND 200
ORDER BY unit_price;`}
        height={130}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Mid-range orders — between ₹300 and ₹1000
SELECT order_id, customer_id, order_date,
       order_status, total_amount
FROM orders
WHERE total_amount BETWEEN 300 AND 1000
ORDER BY total_amount DESC;`}
        height={140}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Employees with salary between ₹30,000 and ₹60,000
SELECT first_name, last_name, role, salary, department
FROM employees
WHERE salary BETWEEN 30000 AND 60000
ORDER BY salary DESC;`}
        height={130}
        showSchema={false}
      />

      <H>BETWEEN with dates</H>

      <SQLPlayground
        initialQuery={`-- Orders placed in January 2024
-- BETWEEN on dates is inclusive: Jan 1 to Jan 31 inclusive
SELECT order_id, customer_id, order_date,
       order_status, total_amount
FROM orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-01-31'
ORDER BY order_date;`}
        height={140}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Customers who joined in 2022
SELECT first_name, last_name, city, loyalty_tier, joined_date
FROM customers
WHERE joined_date BETWEEN '2022-01-01' AND '2022-12-31'
ORDER BY joined_date;`}
        height={130}
        showSchema={false}
      />

      <H>BETWEEN with text — alphabetical range</H>
      <P>BETWEEN works on text columns too — it checks alphabetical order. This is less commonly used but valid.</P>

      <SQLPlayground
        initialQuery={`-- Products whose name falls alphabetically between 'A' and 'M'
-- Text BETWEEN uses lexicographic (dictionary) order
SELECT product_name, brand, unit_price
FROM products
WHERE product_name BETWEEN 'A' AND 'M'
ORDER BY product_name;`}
        height={120}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="NOT BETWEEN — Excluding a Range" />

      <P>NOT BETWEEN is the inverse — it returns rows where the value falls <Hl>outside</Hl> the specified range (strictly less than the lower bound OR strictly greater than the upper bound).</P>

      <CodeBlock
        label="NOT BETWEEN syntax"
        code={`-- Syntax:
column NOT BETWEEN lower_bound AND upper_bound

-- Equivalent to:
column < lower_bound OR column > upper_bound

-- Note: the endpoints themselves are EXCLUDED from the NOT BETWEEN result
-- (since BETWEEN is inclusive, NOT BETWEEN excludes the endpoints too)`}
      />

      <SQLPlayground
        initialQuery={`-- Products NOT in the mid-range price band
-- Either very cheap (under ₹50) or very expensive (over ₹200)
SELECT product_name, brand, category, unit_price
FROM products
WHERE unit_price NOT BETWEEN 50 AND 200
ORDER BY unit_price;`}
        height={120}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Orders outside the standard value range
-- Either very small (under ₹200) or very large (over ₹1500)
SELECT order_id, order_date, order_status,
       payment_method, total_amount
FROM orders
WHERE total_amount NOT BETWEEN 200 AND 1500
ORDER BY total_amount DESC;`}
        height={140}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="BETWEEN and Date Ranges — The Timestamp Trap" />

      <P>BETWEEN with dates has a critical gotcha when your column stores timestamps (date + time) rather than plain dates. This is one of the most common bugs in analytics queries.</P>

      <H>The timestamp boundary problem</H>

      <CodeBlock
        label="The timestamp trap with BETWEEN"
        code={`-- If order_date is a DATE column — works correctly:
WHERE order_date BETWEEN '2024-01-01' AND '2024-01-31'
-- Returns all orders from Jan 1 through Jan 31 inclusive ✓

-- If created_at is a TIMESTAMP column — MISSES the last day:
WHERE created_at BETWEEN '2024-01-01' AND '2024-01-31'
-- '2024-01-31' is interpreted as '2024-01-31 00:00:00'
-- Any record created AFTER midnight on Jan 31 is EXCLUDED ✗
-- A record at 2024-01-31 14:30:00 is NOT between
-- '2024-01-31 00:00:00' and '2024-01-31 00:00:00'

-- CORRECT for timestamp columns — use >= and < :
WHERE created_at >= '2024-01-01'
  AND created_at <  '2024-02-01'   -- strictly less than first day of next month
-- This captures ALL of January, including 2024-01-31 23:59:59 ✓`}
      />

      <P>In FreshCart, order_date is a DATE column so BETWEEN works correctly. But in any system where timestamps are stored (most production systems log exact timestamps), always use <Hl>&gt;= start AND &lt; day_after_end</Hl> instead of BETWEEN for date range filtering.</P>

      <Callout type="warning">
        The professional standard for date range filtering in production SQL: never use BETWEEN for timestamp columns. Always use: WHERE timestamp_col &gt;= '2024-01-01' AND timestamp_col &lt; '2024-02-01'. This is unambiguous, captures the full month including the last day up to midnight, and works identically whether the column is DATE or TIMESTAMP.
      </Callout>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Combining IN and BETWEEN in the Same Query" />

      <P>IN and BETWEEN combine with AND, OR, and NOT exactly like any other WHERE condition. Real queries often use both together.</P>

      <SQLPlayground
        initialQuery={`-- Delivered or Processing orders in a price range from specific stores
SELECT
  o.order_id,
  o.store_id,
  o.order_date,
  o.order_status,
  o.payment_method,
  o.total_amount
FROM orders AS o
WHERE o.order_status IN ('Delivered', 'Processing')
  AND o.total_amount BETWEEN 500 AND 2000
  AND o.store_id IN ('ST001', 'ST005', 'ST008', 'ST009')
ORDER BY o.total_amount DESC;`}
        height={190}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Mid-range products from specific categories
SELECT product_name, category, brand, unit_price
FROM products
WHERE category IN ('Dairy', 'Beverages', 'Packaged Food')
  AND unit_price BETWEEN 20 AND 150
  AND in_stock = true
ORDER BY category, unit_price;`}
        height={150}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- High-value customers from tier cities who joined in 2021-2022
SELECT
  first_name || ' ' || last_name  AS customer,
  city,
  loyalty_tier,
  joined_date
FROM customers
WHERE loyalty_tier IN ('Gold', 'Platinum')
  AND city NOT IN ('Bangalore', 'Mumbai', 'Delhi')
  AND joined_date BETWEEN '2021-01-01' AND '2022-12-31'
ORDER BY loyalty_tier, joined_date;`}
        height={170}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Employees in a salary band from specific stores
SELECT
  e.first_name || ' ' || e.last_name  AS employee,
  e.role,
  e.salary,
  e.store_id
FROM employees AS e
WHERE e.salary BETWEEN 40000 AND 70000
  AND e.store_id IN ('ST001', 'ST002', 'ST005')
ORDER BY e.salary DESC;`}
        height={160}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Performance — IN vs OR and BETWEEN vs >= AND <=" />

      <H>IN vs multiple OR conditions</H>
      <P>For most databases, IN (value1, value2, ...) and the equivalent OR conditions produce identical execution plans — the query optimiser converts them to the same internal representation. There is no performance difference between them for a hardcoded list. Choose IN for readability when you have more than two or three values.</P>

      <P>For IN with a subquery, performance depends on the subquery's complexity and size. The database executes the subquery first, builds the result set, then uses it for the IN check. On large subquery results, this can be slower than a JOIN — you will learn how to convert IN subqueries to JOINs in Module 31.</P>

      <H>BETWEEN vs &gt;= AND &lt;=</H>
      <P>BETWEEN and the equivalent &gt;= AND &lt;= conditions are identical in execution â€” the optimiser converts BETWEEN to the range comparison internally. Both can use B-tree indexes for range scans equally well. Choose BETWEEN when both endpoints are known and it makes the query more readable. Choose explicit &gt;= AND &lt;= when one endpoint is open (no lower bound, or no upper bound), or when dealing with timestamps where the boundary precision matters.</P>

      <H>IN with large lists</H>
      <P>IN with a very large hardcoded list (hundreds or thousands of values) can be slow because the database must check each value against the list. For large value sets, a JOIN to a temporary table or a subquery is more efficient. As a rule of thumb: IN with fewer than 100 values is fine; above that, consider an alternative approach.</P>

      <ProTip>
        When you find yourself writing IN with a long list of IDs that came from another query, that is almost always a sign you should be writing a JOIN instead. Instead of WHERE customer_id IN (SELECT customer_id FROM orders WHERE ...), write the JOIN directly: FROM customers JOIN orders ON customers.customer_id = orders.customer_id WHERE .... The JOIN is typically faster and more readable. You will learn to make this conversion naturally from Module 30 onwards.
      </ProTip>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="NULL Behaviour — IN, NOT IN, and BETWEEN" />

      <H>NULL in the IN list</H>
      <P>If NULL is in the IN list, it does not affect the result for the rows that match other values. NULL simply cannot match anything — so it adds nothing to the result.</P>

      <CodeBlock
        label="NULL in IN list — harmless for IN, dangerous for NOT IN"
        code={`-- IN: NULL in the list is ignored for matching
-- 'Delivered' still matches correctly
WHERE status IN ('Delivered', NULL)
-- Same as: WHERE status = 'Delivered' OR status = NULL
-- The second condition (status = NULL) always returns NULL, not TRUE
-- So rows where status = 'Delivered' still appear

-- NOT IN: NULL in the list DESTROYS the result
WHERE status NOT IN ('Cancelled', NULL)
-- Expands to: status <> 'Cancelled' AND status <> NULL
-- status <> NULL = NULL (always), so entire condition = NULL
-- ZERO ROWS RETURNED — even if 'Delivered' rows exist`}
      />

      <H>NULL in the column being tested with IN</H>
      <P>If the column itself is NULL, IN returns NULL (not TRUE), so NULL rows are excluded. NOT IN also returns NULL for NULL column values — same exclusion behaviour.</P>

      <SQLPlayground
        initialQuery={`-- Demonstrate: NULL delivery_date is excluded from IN
-- The IN check for delivery_date = '2024-01-07' OR '2024-02-03' etc.
-- Rows with NULL delivery_date are simply excluded (NULL IN (...) = NULL)
SELECT order_id, delivery_date, order_status
FROM orders
WHERE delivery_date IN ('2024-01-07', '2024-01-24', '2024-02-03')
ORDER BY delivery_date;`}
        height={120}
        showSchema={false}
      />

      <H>BETWEEN and NULL</H>
      <P>BETWEEN with a NULL column also returns NULL — the row is excluded. BETWEEN with NULL as a bound always returns NULL for every row (since any comparison with NULL is NULL).</P>

      <CodeBlock
        label="BETWEEN and NULL behaviour"
        code={`-- Column is NULL: excluded (NULL BETWEEN x AND y = NULL)
WHERE delivery_date BETWEEN '2024-01-01' AND '2024-01-31'
-- Rows where delivery_date IS NULL are silently excluded

-- NULL as a bound: returns nothing useful
WHERE unit_price BETWEEN NULL AND 200
-- (unit_price >= NULL AND unit_price <= 200) = (NULL AND ...) = NULL
-- Zero rows returned — avoid this pattern`}
      />

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are an analyst at Razorpay's merchant analytics team. The merchant success team needs three different reports for their quarterly business review. All three need to be ready within an hour.</P>

      <TimeBlock time="2:00 PM" label="Report 1 — Merchant tier segmentation">
        The growth team wants to see merchants segmented by monthly transaction volume into three bands: small (under ₹1 lakh), medium (₹1 lakh to ₹10 lakh), and large (above ₹10 lakh). They want the count per tier. Adapted for FreshCart: orders segmented by amount bands.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Order value segmentation
SELECT
  CASE
    WHEN total_amount BETWEEN 0    AND 499   THEN 'Small (< ₹500)'
    WHEN total_amount BETWEEN 500  AND 1499  THEN 'Medium (₹500-1499)'
    WHEN total_amount >= 1500               THEN 'Large (₹1500+)'
  END                             AS order_tier,
  COUNT(*)                        AS order_count,
  ROUND(SUM(total_amount), 2)     AS total_revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY order_tier
ORDER BY total_revenue DESC;`}
        height={200}
        showSchema={true}
      />

      <TimeBlock time="2:20 PM" label="Report 2 — Active payment methods excluding cash">
        The product team wants to know which digital payment methods are used for high-value orders — specifically UPI, Card, and NetBanking (not COD) for orders above ₹800.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Digital payment methods for high-value orders
SELECT
  payment_method,
  COUNT(*)                   AS order_count,
  ROUND(AVG(total_amount), 2) AS avg_order_value,
  SUM(total_amount)          AS total_revenue
FROM orders
WHERE payment_method IN ('UPI', 'Card', 'NetBanking')
  AND total_amount > 800
  AND order_status = 'Delivered'
GROUP BY payment_method
ORDER BY total_revenue DESC;`}
        height={180}
        showSchema={false}
      />

      <TimeBlock time="2:40 PM" label="Report 3 — Q1 performance by store">
        The operations director wants to compare store performance specifically for Q1 2024 (January through March), excluding stores that had no delivered orders in that period.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Q1 2024 store performance
SELECT
  o.store_id,
  s.city,
  COUNT(o.order_id)           AS total_orders,
  SUM(o.total_amount)         AS q1_revenue,
  ROUND(AVG(o.total_amount), 2) AS avg_order
FROM orders AS o
JOIN stores AS s ON o.store_id = s.store_id
WHERE o.order_date BETWEEN '2024-01-01' AND '2024-03-31'
  AND o.order_status = 'Delivered'
GROUP BY o.store_id, s.city
ORDER BY q1_revenue DESC;`}
        height={190}
        showSchema={false}
      />

      <TimeBlock time="2:58 PM" label="All three delivered with 2 minutes to spare">
        Three reports, three different filter patterns — IN for category lists, BETWEEN for value ranges, combined in the third. Each query took under 5 minutes to write. The operations director opens the Q1 store report in the meeting and immediately asks: "Can we see which stores had the highest average order value instead of total revenue?" You change ORDER BY q1_revenue DESC to ORDER BY avg_order DESC and re-run. Done in 10 seconds.
      </TimeBlock>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What does the IN operator do and what is it equivalent to?">
        <p style={{ margin: '0 0 14px' }}>IN checks whether a column value matches any value in a specified list. WHERE city IN ('Bangalore', 'Hyderabad', 'Mumbai') returns rows where city is any of the three cities. It is exactly equivalent to multiple OR conditions using equality: WHERE city = 'Bangalore' OR city = 'Hyderabad' OR city = 'Mumbai'. The query optimiser typically converts IN to OR internally, so they produce identical execution plans and have identical performance for hardcoded lists.</p>
        <p style={{ margin: '0 0 14px' }}>IN is preferred over multiple OR conditions for three reasons. First, readability â€” IN lists the values once, clearly, without repeating the column name before every value. With five values, OR requires writing the column name and = operator five times. IN writes it once. Second, maintainability â€” adding a new value to an IN list requires adding one value inside the parentheses. Adding a value to OR conditions requires adding a full new OR clause. Third, correctness â€” IN with many values is harder to accidentally miswrite than a long chain of OR conditions, which requires careful attention to whether each uses = (not &lt;&gt; or &gt;= by mistake).</p>
        <p style={{ margin: 0 }}>IN also accepts a subquery instead of a hardcoded list: WHERE customer_id IN (SELECT customer_id FROM orders WHERE ...). This is dynamic IN — the list of values is computed by the subquery at runtime rather than hardcoded in the query. The subquery must return exactly one column. This pattern is a simpler alternative to JOIN for existence checks, though JOINs are often preferred for performance on large datasets.</p>
      </IQ>

      <IQ q="What is BETWEEN and are its boundaries inclusive or exclusive?">
        <p style={{ margin: '0 0 14px' }}>BETWEEN checks whether a value falls within a range. BETWEEN lower AND upper is exactly equivalent to column &gt;= lower AND column &lt;= upper. Both boundaries are inclusive â€” the lower bound and the upper bound are included in the result set. A row where unit_price = 50 is returned by WHERE unit_price BETWEEN 50 AND 200, and so is a row where unit_price = 200.</p>
        <p style={{ margin: '0 0 14px' }}>BETWEEN works on numeric, date, and text columns. For numbers and dates, the range semantics are intuitive. For text columns, BETWEEN uses lexicographic (dictionary) order — WHERE name BETWEEN 'A' AND 'M' returns names that fall alphabetically between A and M inclusive. This is valid but less commonly used.</p>
        <p style={{ margin: 0 }}>NOT BETWEEN is the inverse: NOT BETWEEN lower AND upper returns rows where the value is strictly less than lower OR strictly greater than upper — the boundaries are excluded from NOT BETWEEN results, consistent with the inclusive definition of BETWEEN itself.</p>
      </IQ>

      <IQ q="Why is BETWEEN potentially wrong for timestamp columns and what should you use instead?">
        <p style={{ margin: '0 0 14px' }}>BETWEEN is inclusive on both ends. When the column is a DATE type, '2024-01-31' means the entire day of January 31st, so BETWEEN '2024-01-01' AND '2024-01-31' correctly captures all of January. When the column is a TIMESTAMP or DATETIME type, '2024-01-31' is interpreted as '2024-01-31 00:00:00.000' — midnight at the start of January 31st. Any timestamp from 2024-01-31 00:00:01 to 2024-01-31 23:59:59 is greater than '2024-01-31 00:00:00' and therefore NOT between the two bounds. Records created during January 31st (except at exactly midnight) are silently excluded.</p>
        <p style={{ margin: '0 0 14px' }}>The impact in practice: if you use BETWEEN '2024-01-01' AND '2024-01-31' on a timestamp column for a January monthly report, you get all of January except orders placed on January 31st after midnight — which is most of January 31st. The report shows January 1-30 plus the very first second of January 31st. The discrepancy is subtle and can go unnoticed until someone cross-checks totals.</p>
        <p style={{ margin: 0 }}>The correct approach for timestamp columns is always: WHERE timestamp_col &gt;= '2024-01-01' AND timestamp_col &lt; '2024-02-01'. The &gt;= captures everything from the very start of January 1st. The strictly less than '2024-02-01' captures everything up to but not including the first moment of February â€” which is the entire last second of January 31st. This pattern works identically for DATE and TIMESTAMP columns and is unambiguous about what it includes. Adopt this as a strict professional standard: use &gt;= and &lt; for date range filtering, BETWEEN only when you are certain the column is DATE (not TIMESTAMP) and you need both ends inclusive.</p>
      </IQ>

      <IQ q="What happens when NULL appears in a NOT IN list?">
        <p style={{ margin: '0 0 14px' }}>When NULL appears in a NOT IN list, the entire NOT IN condition returns NULL for every row in the outer query — resulting in zero rows in the output. This is one of the most dangerous silent bugs in SQL.</p>
        <p style={{ margin: '0 0 14px' }}>The mechanism: NOT IN (val1, NULL) expands to: column &lt;&gt; val1 AND column &lt;&gt; NULL. The second condition — column &lt;&gt; NULL — always evaluates to NULL because any comparison with NULL returns NULL in three-valued logic. NOT NULL = NULL. Since WHERE discards rows where the condition is NULL, every single row is discarded regardless of what the column contains. The query returns zero rows with no error message.</p>
        <p style={{ margin: 0 }}>This becomes a real problem when the NOT IN list comes from a subquery that might return NULLs: WHERE customer_id NOT IN (SELECT customer_id FROM orders). If any order has a NULL customer_id (which it might if customer_id is nullable), the entire NOT IN fails silently. The safe alternatives: use NOT EXISTS instead of NOT IN for subqueries — NOT EXISTS handles NULL correctly because it checks for the presence or absence of rows, not value equality. Or add WHERE customer_id IS NOT NULL to the subquery. As a professional rule: never use NOT IN with a subquery unless you are absolutely certain the subquery cannot return NULL. Default to NOT EXISTS for all subquery-based exclusion checks.</p>
      </IQ>

      <IQ q="When would you use IN with a subquery versus a JOIN?">
        <p style={{ margin: '0 0 14px' }}>IN with a subquery and a JOIN can often express the same logical operation but have different performance characteristics and readability trade-offs. IN with a subquery is readable and semantically clear: WHERE customer_id IN (SELECT customer_id FROM orders WHERE ...) clearly communicates "find customers whose ID appears in this set." It is a good choice for simple existence checks on small to medium tables where readability matters more than micro-optimisation.</p>
        <p style={{ margin: '0 0 14px' }}>A JOIN is typically preferred over IN with a subquery for three reasons. Performance: most query optimisers convert IN subqueries to semi-joins internally, but explicit JOINs give the optimiser more flexibility to choose the most efficient join algorithm (hash join, merge join, nested loop) based on table statistics. For large tables, an explicit JOIN with proper indexing almost always outperforms IN with a subquery. Flexibility: a JOIN allows you to SELECT columns from both tables in the result. IN subquery only filters based on the subquery result — you cannot include columns from the subquery in the outer SELECT. Clarity for complex logic: multi-table queries with multiple IN subqueries become difficult to read and maintain, while the same logic expressed as JOINs with clear ON conditions and aliases is more organised.</p>
        <p style={{ margin: 0 }}>Use IN with a subquery when: the query is simple and the subquery is small, you want to express an existence check without adding JOIN complexity, or you are writing a quick ad-hoc query. Use a JOIN when: tables are large and performance matters, you need columns from both tables in the result, or the query is complex enough that explicit JOIN structure aids maintainability. For production code in a team environment, explicit JOINs are the professional standard — they make the data flow visible and are easier to optimise with EXPLAIN ANALYZE.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="NOT IN returns zero rows — expected many rows but got nothing"
        cause="The IN list or subquery for NOT IN contains at least one NULL value. NOT IN (val1, NULL) expands to col &lt;&gt; val1 AND col &lt;&gt; NULL. Since col &lt;&gt; NULL is always NULL (not TRUE), the entire condition evaluates to NULL for every row — and WHERE discards NULL results. The query returns zero rows silently, with no error message. This happens most often when the NOT IN list comes from a subquery that has nullable columns."
        fix="Replace NOT IN with NOT EXISTS: SELECT * FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id). NOT EXISTS is always NULL-safe. Alternatively, add IS NOT NULL to the subquery: WHERE customer_id NOT IN (SELECT customer_id FROM orders WHERE customer_id IS NOT NULL). To diagnose: run the subquery alone and check: SELECT COUNT(*) FROM orders WHERE customer_id IS NULL — if this returns any rows, NOT IN will fail."
      />

      <Err
        msg="BETWEEN misses the last day — monthly report is missing Jan 31 data"
        cause="The column is a TIMESTAMP type but the BETWEEN boundary '2024-01-31' is interpreted as '2024-01-31 00:00:00'. Records created on January 31st after midnight — which is the entire working day — have timestamps greater than '2024-01-31 00:00:00', so they fall outside the BETWEEN range. The report silently excludes most of the last day."
        fix="Replace BETWEEN with >= and <: WHERE created_at >= '2024-01-01' AND created_at < '2024-02-01'. The strict less-than on the end captures all timestamps up to but not including the first moment of February — which includes all of January 31st. This pattern works correctly for both DATE and TIMESTAMP columns. Make this the team standard for all date range queries on timestamp columns."
      />

      <Err
        msg="ERROR: operator does not exist for IN — WHERE price IN ('100', '200') on numeric column"
        cause="Type mismatch between the column type and the IN list values. If price is an INTEGER or DECIMAL column and you provide string values ('100', '200') with quotes, PostgreSQL raises a type error. MySQL silently coerces the strings to numbers, which can produce unexpected results. The IN list values must match the column's data type."
        fix="Remove quotes from numeric values in the IN list: WHERE price IN (100, 200). Keep single quotes only for text values: WHERE status IN ('Delivered', 'Cancelled'). For dates, use ISO format strings: WHERE order_date IN ('2024-01-05', '2024-01-15'). If you are building IN lists dynamically in application code, use parameterised queries — the database driver handles type conversion correctly."
      />

      <Err
        msg="BETWEEN returns unexpected results — WHERE salary BETWEEN 60000 AND 40000 returns nothing"
        cause="The lower and upper bounds in BETWEEN are reversed. BETWEEN requires the lower bound first and the upper bound second. BETWEEN 60000 AND 40000 is interpreted as salary >= 60000 AND salary <= 40000, which is always FALSE for any real salary value (no number can simultaneously be >= 60000 and <= 40000). The query returns zero rows."
        fix="Always write BETWEEN with the smaller value first: WHERE salary BETWEEN 40000 AND 60000. This is equivalent to salary >= 40000 AND salary <= 60000. Some databases (like MySQL) automatically swap reversed BETWEEN bounds, but PostgreSQL does not — zero rows are returned silently. If you are unsure of the order, use explicit >= and <= instead: WHERE salary >= 40000 AND salary <= 60000 — the order of the conditions does not matter."
      />

      <Err
        msg="IN with subquery errors — subquery returns multiple columns"
        cause="The subquery inside IN returns more than one column. IN requires the subquery to return exactly one column — the value to compare against. SELECT customer_id, first_name FROM customers returns two columns, so WHERE customer_id IN (SELECT customer_id, first_name FROM customers) fails with an error like 'subquery must return only one column'."
        fix="Select only the column needed for the comparison: WHERE customer_id IN (SELECT customer_id FROM customers WHERE ...). If you accidentally included extra columns, remove them. If you need data from multiple columns, use a JOIN or EXISTS instead of IN. EXISTS does not require a single-column subquery: WHERE EXISTS (SELECT 1 FROM customers c WHERE c.customer_id = o.customer_id AND c.city = 'Bangalore') — the 1 is a placeholder, EXISTS only cares whether any row exists."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="The FreshCart weekly operations report needs three things from one combined query: Show all orders where (1) the store is one of the Bangalore or Hyderabad stores (ST001, ST002, ST003, ST004), AND (2) the total_amount is between ₹400 and ₹1,500, AND (3) the order_status is NOT one of 'Cancelled' or 'Returned'. Show order_id, store_id, order_date, order_status, payment_method, and total_amount. Sort by total_amount descending."
        hint="Three conditions: store_id IN (...), total_amount BETWEEN 400 AND 1500, order_status NOT IN ('Cancelled', 'Returned'). All three connected with AND."
        answer={`SELECT
  order_id,
  store_id,
  order_date,
  order_status,
  payment_method,
  total_amount
FROM orders
WHERE store_id IN ('ST001', 'ST002', 'ST003', 'ST004')
  AND total_amount BETWEEN 400 AND 1500
  AND order_status NOT IN ('Cancelled', 'Returned')
ORDER BY total_amount DESC;`}
        explanation="This query uses all three filter operators from this module together. IN for the store list — cleaner than four OR conditions. BETWEEN for the amount range — inclusive on both ends (₹400 and ₹1,500 are included). NOT IN for the status exclusion — works safely here because the order_status column is NOT NULL (it has a NOT NULL constraint and a CHECK constraint limiting it to specific values), so the NOT IN null trap does not apply. All three are connected with AND — all conditions must be true for a row to appear. This is the standard multi-criteria operational filter pattern used in every business dashboard."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'IN checks whether a column value matches any value in a list. WHERE city IN (\'Bangalore\', \'Hyderabad\') is equivalent to WHERE city = \'Bangalore\' OR city = \'Hyderabad\' — just cleaner.',
          'NOT IN excludes rows matching any value in the list. It is equivalent to multiple &lt;&gt; conditions combined with AND.',
          'BETWEEN checks for an inclusive range. WHERE price BETWEEN 50 AND 200 includes both 50 and 200. It is equivalent to WHERE price >= 50 AND price <= 200.',
          'NOT BETWEEN excludes the range. It is equivalent to column &lt; lower OR column > upper — the boundary values themselves are excluded from NOT BETWEEN results.',
          'BETWEEN requires the lower bound first. BETWEEN 200 AND 50 (reversed) always returns zero rows — no value is simultaneously >= 200 and <= 50.',
          'BETWEEN on TIMESTAMP columns has a critical bug: \'2024-01-31\' is interpreted as \'2024-01-31 00:00:00\', missing the entire last day. Use >= \'2024-01-01\' AND < \'2024-02-01\' instead for timestamps.',
          'NOT IN is dangerous when the list contains NULL — it returns zero rows for the entire query. Use NOT EXISTS for subquery-based exclusions to avoid this trap.',
          'IN with a subquery (WHERE col IN (SELECT col FROM table)) dynamically computes the list at runtime. The subquery must return exactly one column.',
          'For large IN lists from subqueries, consider a JOIN instead — it gives the optimiser more flexibility and is often faster on large tables.',
          'IN and BETWEEN combine with AND, OR, and NOT like any other WHERE condition. Use parentheses when mixing with OR to ensure correct precedence.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 16</strong>, you learn CASE WHEN — the SQL equivalent of an if-else statement. It lets you create conditional columns, build custom categories, and handle complex branching logic directly inside a query.
        </p>
        <Link href="/learn/sql/case-when" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 16 → CASE WHEN — Conditional Logic
        </Link>
      </div>

    </LearnLayout>
  );
}
