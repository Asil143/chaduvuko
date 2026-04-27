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

const NullTable = ({ rows, headers }: { rows: string[][]; headers: string[] }) => (
  <div style={{ overflowX: 'auto', margin: '16px 0 24px' }}>
    <table style={{ borderCollapse: 'collapse', fontSize: 13, minWidth: 400 }}>
      <thead>
        <tr>
          {headers.map(h => (
            <th key={h} style={{ padding: '10px 20px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'center', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', fontFamily: 'var(--font-mono)' }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
            {row.map((cell, j) => {
              const color = cell === 'TRUE' ? '#00e676' : cell === 'FALSE' ? '#ff4757' : cell === 'NULL' ? '#f59e0b' : 'var(--text)';
              const isResult = j === row.length - 1;
              return (
                <td key={j} style={{ padding: '10px 20px', textAlign: 'center', borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: 13, color: (cell === 'TRUE' || cell === 'FALSE' || cell === 'NULL') ? color : 'var(--text)', fontWeight: isResult ? 700 : 400 }}>
                  {cell}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function NullValues() {
  return (
    <LearnLayout
      title="Working with NULL Values"
      description="NULL is not zero, not empty, not false — it is the absence of data. Master three-valued logic, IS NULL, COALESCE, NULLIF, and every NULL trap in SQL"
      section="SQL — Module 11"
      readTime="35 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What NULL Actually Is — The Concept That Breaks Beginners" />

      <P>NULL is the single most misunderstood concept in SQL. Most beginners assume NULL means zero, or empty string, or false. It means none of those things. NULL means <Hl>the absence of a value</Hl> — the information is unknown, missing, or not applicable.</P>

      <P>Think of it this way. You are filling out a form and a field asks for your middle name. If you have no middle name, you write "N/A" or leave it blank. If you do not know whether you have a middle name (unlikely, but humour the example), the field is genuinely unknown. In a database, both situations — not applicable and unknown — are represented by NULL. The field contains no value. Not an empty value. No value at all.</P>

      <P>In FreshCart's orders table, the delivery_date column is NULL for orders that have not been delivered yet. It is not that the delivery date is unknown — it is that the delivery has not happened, so the date <Hl>does not exist yet</Hl>. The employees table has manager_id as NULL for store managers who report to nobody in this dataset. Not an unknown manager — no manager relationship applies.</P>

      <SQLPlayground
        initialQuery={`-- See NULL in action — orders without a delivery date
-- These are not delivered yet: delivery_date is NULL
SELECT order_id, order_date, delivery_date, order_status
FROM orders
WHERE delivery_date IS NULL
ORDER BY order_date;`}
        height={130}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Employees with no manager — top of the org chart
-- manager_id IS NULL means no manager relationship exists
SELECT employee_id, first_name, last_name, role, manager_id
FROM employees
WHERE manager_id IS NULL;`}
        height={120}
        showSchema={false}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Three-Valued Logic — Why NULL Breaks Normal Comparisons" />

      <P>In everyday life, every statement is either true or false. SQL uses <Hl>three-valued logic</Hl>: TRUE, FALSE, and NULL (unknown). This is the root cause of every NULL surprise you will ever encounter.</P>

      <P>When you compare any value with NULL using a standard comparison operator, the result is <Hl>always NULL — never TRUE, never FALSE</Hl>. This is because comparing something known to something unknown cannot produce a definitive answer. "Is Bangalore equal to unknown?" — we cannot know. The answer is unknown (NULL), not false.</P>

      <CodeBlock
        label="NULL comparisons always return NULL — never TRUE or FALSE"
        code={`-- Every one of these returns NULL, not FALSE:
NULL = NULL        -- NULL (not TRUE!)
NULL = 'Bangalore' -- NULL
NULL <> NULL       -- NULL
NULL > 0           -- NULL
NULL < 100         -- NULL
NULL = 0           -- NULL
NULL = ''          -- NULL (NULL is not an empty string)
NULL = false       -- NULL (NULL is not false)`}
      />

      <P>The WHERE clause discards rows where the condition evaluates to NULL — only TRUE rows are kept. This means <Hl>any WHERE condition involving NULL silently discards the row</Hl>. This is the source of the most common SQL data quality bugs: rows disappearing from results because a NULL value caused a condition to return NULL instead of TRUE.</P>

      <H>Demonstrating the NULL trap</H>

      <SQLPlayground
        initialQuery={`-- WRONG: trying to find orders with no delivery date using =
-- Returns zero rows even though NULL delivery dates exist
SELECT order_id, order_status
FROM orders
WHERE delivery_date = NULL;`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- CORRECT: IS NULL is the only way to check for NULL
SELECT order_id, order_status
FROM orders
WHERE delivery_date IS NULL;`}
        height={100}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- WRONG: trying to find orders that DO have a delivery date
-- <> NULL also returns NULL for every row — zero results
SELECT order_id, order_status
FROM orders
WHERE delivery_date <> NULL;`}
        height={100}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- CORRECT: IS NOT NULL
SELECT order_id, order_status
FROM orders
WHERE delivery_date IS NOT NULL;`}
        height={100}
        showSchema={false}
      />

      <Callout type="warning">
        NULL = NULL is NULL, not TRUE. This is the most surprising behaviour in SQL and the source of countless bugs. The only correct way to test for NULL is IS NULL and IS NOT NULL. Never use = NULL or {'<>'} NULL â€” they silently return no rows.
      </Callout>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="NULL in Arithmetic — How NULL Propagates Through Calculations" />

      <P>NULL propagates through arithmetic. Any calculation that involves NULL produces NULL as the result. This is mathematically consistent — if one input is unknown, the output must also be unknown.</P>

      <CodeBlock
        label="NULL arithmetic — NULL in, NULL out"
        code={`NULL + 100        -- NULL
NULL - 50         -- NULL
NULL * 3          -- NULL
NULL / 2          -- NULL
100 + NULL        -- NULL
unit_price + NULL -- NULL (if unit_price is not null, result is still NULL)
NULL + NULL       -- NULL`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate NULL propagation in arithmetic
-- delivery_date - order_date is NULL when delivery_date is NULL
SELECT
  order_id,
  order_date,
  delivery_date,
  delivery_date - order_date   AS days_to_deliver
FROM orders
ORDER BY order_id
LIMIT 10;
-- Rows where delivery_date is NULL show NULL for days_to_deliver`}
        height={160}
        showSchema={true}
      />

      <P>This propagation means that aggregate functions like SUM, AVG, MIN, and MAX all ignore NULL values — they only operate on non-NULL values. This is usually the correct behaviour, but it can produce surprising results if you are not aware of it.</P>

      <SQLPlayground
        initialQuery={`-- AVG ignores NULL values — only averages non-NULL rows
-- delivery_date - order_date is NULL for undelivered orders
-- AVG only includes the delivered orders in its calculation
SELECT
  COUNT(*)                                          AS total_orders,
  COUNT(delivery_date)                              AS delivered_orders,
  AVG(delivery_date - order_date)                   AS avg_days_delivered
FROM orders;`}
        height={140}
        showSchema={false}
      />

      <Callout type="info">
        Aggregate functions (SUM, AVG, MIN, MAX, COUNT(column)) all silently ignore NULL values. COUNT(*) is the exception — it counts every row regardless of NULLs. This difference is why COUNT(*) and COUNT(column) can return different numbers for the same table.
      </Callout>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="NULL in Logical Operations — AND, OR, NOT with NULL" />

      <P>NULL in logical operations produces results that follow three-valued logic. You saw the truth tables for AND, OR, and NOT in Module 07. Here is a focused review of how NULL interacts with each:</P>

      <H>AND with NULL</H>
      <NullTable
        headers={['A', 'B', 'A AND B']}
        rows={[
          ['TRUE',  'NULL',  'NULL'],
          ['FALSE', 'NULL',  'FALSE'],
          ['NULL',  'NULL',  'NULL'],
        ]}
      />
      <P>Key insight: FALSE AND NULL = FALSE. If one side is definitely false, the AND result is false regardless of the unknown. But TRUE AND NULL = NULL — a known true combined with an unknown gives an unknown result.</P>

      <H>OR with NULL</H>
      <NullTable
        headers={['A', 'B', 'A OR B']}
        rows={[
          ['TRUE',  'NULL',  'TRUE'],
          ['FALSE', 'NULL',  'NULL'],
          ['NULL',  'NULL',  'NULL'],
        ]}
      />
      <P>Key insight: TRUE OR NULL = TRUE. If one side is definitely true, the OR result is true regardless of the unknown. But FALSE OR NULL = NULL — a known false combined with an unknown gives an unknown result.</P>

      <H>NOT with NULL</H>
      <NullTable
        headers={['A', 'NOT A']}
        rows={[
          ['TRUE',  'FALSE'],
          ['FALSE', 'TRUE'],
          ['NULL',  'NULL'],
        ]}
      />
      <P>NOT NULL = NULL. Reversing an unknown still gives an unknown. This is why WHERE NOT city = 'Bangalore' does not include rows where city is NULL.</P>

      <SQLPlayground
        initialQuery={`-- NOT NULL behaviour — city IS NULL rows are excluded
-- Even though NOT 'Bangalore' should logically include "any other city"
-- NULL city rows are neither Bangalore NOR not-Bangalore
SELECT first_name, city
FROM customers
WHERE NOT city = 'Bangalore';
-- Compare the count to: SELECT COUNT(*) FROM customers`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- To include NULL city rows alongside non-Bangalore cities:
SELECT first_name, city
FROM customers
WHERE city <> 'Bangalore'
   OR city IS NULL
ORDER BY city;`}
        height={110}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="IS NULL and IS NOT NULL — The Correct Way to Filter NULL" />

      <P>IS NULL and IS NOT NULL are the only operators that correctly handle NULL. They are specifically designed for three-valued logic — they return TRUE or FALSE, never NULL.</P>

      <CodeBlock
        label="IS NULL and IS NOT NULL — always return TRUE or FALSE"
        code={`NULL IS NULL         -- TRUE
NULL IS NOT NULL     -- FALSE
'Bangalore' IS NULL  -- FALSE
'Bangalore' IS NOT NULL -- TRUE
0 IS NULL            -- FALSE (0 is not NULL)
'' IS NULL           -- FALSE (empty string is not NULL)`}
      />

      <H>Finding rows with NULL in specific columns</H>

      <SQLPlayground
        initialQuery={`-- Orders pending delivery — delivery_date is NULL
SELECT order_id, customer_id, order_date, order_status, total_amount
FROM orders
WHERE delivery_date IS NULL
ORDER BY order_date;`}
        height={130}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Top-level employees — no manager above them
SELECT employee_id, first_name, last_name, role, store_id, salary
FROM employees
WHERE manager_id IS NULL
ORDER BY salary DESC;`}
        height={120}
        showSchema={false}
      />

      <H>Combining IS NULL with other conditions</H>

      <SQLPlayground
        initialQuery={`-- High-value orders that are still pending (no delivery date)
-- AND above ₹800 total
SELECT order_id, customer_id, order_date,
       order_status, total_amount
FROM orders
WHERE delivery_date IS NULL
  AND total_amount > 800
ORDER BY total_amount DESC;`}
        height={140}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Delivered orders only — delivery_date IS NOT NULL
-- AND placed in February 2024
SELECT order_id, order_date, delivery_date,
       delivery_date - order_date  AS days_taken,
       total_amount
FROM orders
WHERE delivery_date IS NOT NULL
  AND order_date >= '2024-02-01'
  AND order_date <  '2024-03-01'
ORDER BY days_taken DESC;`}
        height={160}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="COALESCE — Replace NULL with a Default Value" />

      <P>COALESCE is one of the most useful functions in SQL. It takes two or more arguments and returns the <Hl>first non-NULL value</Hl> from the list. If all arguments are NULL, it returns NULL.</P>

      <CodeBlock
        label="COALESCE syntax"
        code={`COALESCE(value1, value2, value3, ...)
-- Returns the first value that is NOT NULL
-- If all are NULL, returns NULL

COALESCE(NULL, 'default')         -- returns 'default'
COALESCE(NULL, NULL, 'fallback')  -- returns 'fallback'
COALESCE('hello', 'default')      -- returns 'hello' (not NULL)
COALESCE(NULL, NULL, NULL)        -- returns NULL`}
      />

      <H>COALESCE for displaying NULL as a readable value</H>

      <SQLPlayground
        initialQuery={`-- Replace NULL delivery_date with a readable message
-- Instead of showing NULL, show 'Not yet delivered'
SELECT
  order_id,
  order_date,
  COALESCE(CAST(delivery_date AS VARCHAR), 'Not yet delivered')  AS delivery_date,
  order_status
FROM orders
ORDER BY order_date DESC
LIMIT 10;`}
        height={160}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Replace NULL manager_id with 'No manager' for display
SELECT
  first_name || ' ' || last_name                AS employee,
  role,
  COALESCE(CAST(manager_id AS VARCHAR), 'No manager')  AS reports_to
FROM employees
ORDER BY manager_id NULLS LAST;`}
        height={140}
        showSchema={false}
      />

      <H>COALESCE for default values in calculations</H>

      <SQLPlayground
        initialQuery={`-- If discount_pct is NULL, treat it as 0 for the calculation
-- COALESCE ensures the arithmetic never produces NULL
SELECT
  item_id,
  product_id,
  quantity,
  unit_price,
  COALESCE(discount_pct, 0)                               AS discount_pct,
  unit_price * quantity * (1 - COALESCE(discount_pct, 0) / 100)  AS calculated_total
FROM order_items
LIMIT 10;`}
        height={170}
        showSchema={false}
      />

      <H>COALESCE for fallback column chains</H>
      <P>COALESCE shines when you have a priority chain: use the first value if it exists, fall back to the second, then the third. This is common when merging data from multiple sources.</P>

      <CodeBlock
        label="COALESCE fallback chain — real pattern"
        code={`-- Use preferred_phone if set, fall back to mobile, then home
SELECT
  customer_id,
  COALESCE(preferred_phone, mobile_phone, home_phone, 'No contact')
    AS best_contact
FROM customers;

-- Use the most recent updated_price if set, otherwise use list_price
SELECT
  product_id,
  COALESCE(updated_price, list_price) AS effective_price
FROM products;`}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="NULLIF — Turn a Value Into NULL" />

      <P>NULLIF is the inverse of COALESCE. It takes two arguments and returns NULL if they are equal, otherwise returns the first argument. This is most useful for <Hl>preventing division by zero</Hl> and for treating sentinel values (like empty string or zero) as NULL.</P>

      <CodeBlock
        label="NULLIF syntax"
        code={`NULLIF(value1, value2)
-- Returns NULL if value1 = value2
-- Returns value1 if they are different

NULLIF(5, 0)         -- returns 5
NULLIF(0, 0)         -- returns NULL
NULLIF('', '')       -- returns NULL
NULLIF('hello', '')  -- returns 'hello'`}
      />

      <H>NULLIF to prevent division by zero</H>

      <SQLPlayground
        initialQuery={`-- Calculate margin percentage safely
-- If unit_price = cost_price (zero margin), NULLIF returns NULL
-- Dividing by NULL returns NULL instead of causing an error
SELECT
  product_name,
  unit_price,
  cost_price,
  unit_price - cost_price                                          AS margin,
  ROUND(
    (unit_price - cost_price) / NULLIF(unit_price, 0) * 100
  , 1)                                                             AS margin_pct
FROM products
ORDER BY margin_pct DESC NULLS LAST;`}
        height={180}
        showSchema={true}
      />

      <H>NULLIF to treat empty strings as NULL</H>
      <P>In many systems, empty string and NULL are used interchangeably for "no value." NULLIF lets you normalise them.</P>

      <CodeBlock
        label="NULLIF to normalise empty strings"
        code={`-- Treat empty string the same as NULL for display
SELECT
  customer_id,
  COALESCE(NULLIF(middle_name, ''), 'No middle name') AS middle_name
FROM customers;
-- If middle_name is '' → NULLIF returns NULL → COALESCE returns 'No middle name'
-- If middle_name is NULL → NULLIF returns NULL → COALESCE returns 'No middle name'
-- If middle_name is 'Kumar' → NULLIF returns 'Kumar' → COALESCE returns 'Kumar'`}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="NULL in ORDER BY, GROUP BY, and DISTINCT" />

      <H>NULL in ORDER BY</H>
      <P>You learned this in Module 08: in PostgreSQL and DuckDB, NULLs sort last in ASC and first in DESC. Use NULLS FIRST or NULLS LAST to control this. NULL values are treated as a special sort value — not greater than or less than any real value, but consistently placed by the database.</P>

      <SQLPlayground
        initialQuery={`-- NULLs last in ASC (PostgreSQL/DuckDB default)
-- Delivered orders (real dates) come before undelivered (NULL)
SELECT order_id, order_date, delivery_date
FROM orders
ORDER BY delivery_date ASC NULLS LAST;`}
        height={120}
        showSchema={false}
      />

      <H>NULL in GROUP BY</H>
      <P>NULL is treated as a distinct grouping value in GROUP BY — all NULL rows are grouped together into a single NULL group. This is one of the few places where NULL = NULL is TRUE in SQL's practical behaviour.</P>

      <SQLPlayground
        initialQuery={`-- GROUP BY treats all NULL delivery_dates as one group
-- The NULL group represents all undelivered orders
SELECT
  delivery_date,
  COUNT(*)         AS order_count,
  SUM(total_amount) AS total_revenue
FROM orders
GROUP BY delivery_date
ORDER BY delivery_date NULLS LAST;`}
        height={150}
        showSchema={false}
      />

      <H>NULL in DISTINCT</H>
      <P>DISTINCT also treats NULL as a single distinct value — multiple NULL rows collapse into one NULL in the DISTINCT result. Even though NULL ≠ NULL in comparisons, DISTINCT deduplication treats all NULLs as equivalent.</P>

      <SQLPlayground
        initialQuery={`-- DISTINCT treats all NULLs as equivalent — one NULL in result
SELECT DISTINCT delivery_date
FROM orders
ORDER BY delivery_date NULLS LAST;`}
        height={110}
        showSchema={false}
      />

      <H>NULL in UNIQUE constraints</H>
      <P>UNIQUE constraints have a special NULL behaviour: multiple rows can have NULL in a UNIQUE column. Since NULL ≠ NULL (comparisons always return NULL), no two NULLs are considered equal — so they do not violate uniqueness. This is consistent with three-valued logic but surprises many people.</P>

      <CodeBlock
        label="UNIQUE allows multiple NULLs"
        code={`-- This succeeds — multiple NULL emails are allowed by UNIQUE
INSERT INTO customers (email) VALUES (NULL);
INSERT INTO customers (email) VALUES (NULL);  -- succeeds!
INSERT INTO customers (email) VALUES (NULL);  -- succeeds!

-- This fails — duplicate non-NULL value
INSERT INTO customers (email) VALUES ('test@gmail.com');
INSERT INTO customers (email) VALUES ('test@gmail.com');  -- ERROR!`}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="NOT IN and NULL — The Dangerous Combination" />

      <P>This is one of the most dangerous NULL traps in SQL. If you use NOT IN with a subquery or list that contains even one NULL value, the entire query returns zero rows — silently, with no error.</P>

      <H>Why NOT IN fails with NULL</H>
      <P>NOT IN (val1, val2, NULL) is internally expanded to: NOT (col = val1 OR col = val2 OR col = NULL). The col = NULL part always evaluates to NULL. Since any OR involving NULL (when the other conditions are FALSE) evaluates to NULL, and NOT NULL = NULL, every row in the table evaluates to NULL and is discarded by WHERE.</P>

      <CodeBlock
        label="NOT IN with NULL — the silent bug"
        code={`-- Suppose we want customers NOT in a list of IDs
-- And that list comes from a subquery that might return NULL

-- DANGEROUS: if any customer_id in orders is NULL,
-- this returns ZERO rows for the entire query
SELECT * FROM customers
WHERE customer_id NOT IN (
  SELECT customer_id FROM orders
  -- If any order has NULL customer_id, entire result is empty
);

-- SAFE: use NOT EXISTS instead
SELECT * FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.customer_id
);

-- SAFE: or filter NULLs from the subquery
SELECT * FROM customers
WHERE customer_id NOT IN (
  SELECT customer_id FROM orders
  WHERE customer_id IS NOT NULL  -- explicitly exclude NULLs
);`}
      />

      <SQLPlayground
        initialQuery={`-- Safe approach: NOT EXISTS to find customers with no orders
-- This correctly handles any potential NULLs
SELECT c.customer_id, c.first_name, c.last_name, c.city
FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.customer_id
);`}
        height={140}
        showSchema={true}
      />

      <Callout type="warning">
        Never use NOT IN with a subquery unless you are absolutely certain the subquery cannot return NULL. Use NOT EXISTS instead — it handles NULL correctly and is often faster on large datasets. This is one of the most important SQL safety rules to memorise.
      </Callout>

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Complete NULL Handling Toolkit" />

      <P>Here is every NULL-related function and operator you need, in one reference section.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Function / Operator', 'What it does', 'Example', 'Result'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['IS NULL', 'Check if a value is NULL', 'WHERE delivery_date IS NULL', 'TRUE for NULL rows'],
              ['IS NOT NULL', 'Check if a value is not NULL', 'WHERE delivery_date IS NOT NULL', 'TRUE for non-NULL rows'],
              ['COALESCE(a, b, c)', 'Return first non-NULL value', "COALESCE(discount_pct, 0)", '0 if discount_pct is NULL'],
              ['NULLIF(a, b)', 'Return NULL if a equals b', 'NULLIF(unit_price, 0)', 'NULL if price is 0'],
              ['IS DISTINCT FROM', 'NULL-safe equality check', 'a IS DISTINCT FROM b', 'FALSE if both NULL'],
              ['IS NOT DISTINCT FROM', 'NULL-safe inequality check', 'a IS NOT DISTINCT FROM b', 'TRUE if both NULL'],
            ].map(([fn, what, example, result], i) => (
              <tr key={fn} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{fn}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{what}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{example}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>IS DISTINCT FROM — NULL-safe comparison</H>
      <P>Standard equality (=) returns NULL when either side is NULL. IS DISTINCT FROM is a NULL-safe comparison that treats NULL as a known value — NULL IS DISTINCT FROM NULL returns FALSE (they are the same), and value IS DISTINCT FROM NULL returns TRUE (they are different).</P>

      <CodeBlock
        label="IS DISTINCT FROM vs = for NULL-safe comparison"
        code={`-- Standard equality — fails with NULL
NULL = NULL             -- NULL (not TRUE)
'Bangalore' = NULL      -- NULL (not FALSE)

-- NULL-safe equality
NULL IS NOT DISTINCT FROM NULL   -- TRUE (both are NULL — they are the same)
'Bangalore' IS NOT DISTINCT FROM NULL  -- FALSE (they are different)
NULL IS DISTINCT FROM 'Bangalore'      -- TRUE (they are different)

-- Use case: compare two nullable columns
WHERE col1 IS NOT DISTINCT FROM col2
-- Returns TRUE when both are NULL (unlike col1 = col2 which returns NULL)`}
      />

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are a data engineer at HDFC Bank. The compliance team runs monthly reports on loan applications. They discover that some loan application records have NULL values in fields that should always have data — specifically the annual_income field. A NULL income in a loan application is a critical data quality issue that could cause incorrect risk scoring.</P>

      <TimeBlock time="9:00 AM" label="Identify the scope of the problem">
        First, understand how many records have NULL income and what percentage of total applications that represents.
      </TimeBlock>

      <CodeBlock
        label="Step 1 — scope the NULL problem"
        code={`-- How many applications have NULL annual_income?
-- And what percentage is that?
SELECT
  COUNT(*)                                   AS total_applications,
  COUNT(annual_income)                       AS with_income,
  COUNT(*) - COUNT(annual_income)            AS null_income_count,
  ROUND(
    (COUNT(*) - COUNT(annual_income))::DECIMAL
    / COUNT(*) * 100, 2
  )                                          AS null_pct
FROM loan_applications;`}
      />

      <TimeBlock time="9:20 AM" label="Find the source of NULLs">
        Next, understand where the NULLs come from — are they concentrated in a specific branch, application channel, or time period?
      </TimeBlock>

      <CodeBlock
        label="Step 2 — identify the source pattern"
        code={`-- Are NULLs concentrated in specific branches or channels?
SELECT
  application_channel,
  branch_code,
  COUNT(*)                         AS total,
  SUM(CASE WHEN annual_income IS NULL THEN 1 ELSE 0 END) AS null_count
FROM loan_applications
GROUP BY application_channel, branch_code
HAVING SUM(CASE WHEN annual_income IS NULL THEN 1 ELSE 0 END) > 0
ORDER BY null_count DESC;`}
      />

      <TimeBlock time="10:00 AM" label="Produce a safe report with NULLs handled">
        The compliance team needs a report that shows all applications — including those with NULL income. Use COALESCE to replace NULL with a flag value, and IS NULL for clear filtering.
      </TimeBlock>

      <CodeBlock
        label="Step 3 — safe report with NULL handling"
        code={`-- Report with explicit NULL handling
-- NULLs shown clearly, not hidden or silently excluded
SELECT
  application_id,
  applicant_name,
  COALESCE(CAST(annual_income AS VARCHAR), 'DATA MISSING')  AS annual_income,
  COALESCE(CAST(credit_score AS VARCHAR), 'DATA MISSING')   AS credit_score,
  application_date,
  CASE
    WHEN annual_income IS NULL OR credit_score IS NULL
    THEN 'INCOMPLETE — REQUIRES REVIEW'
    ELSE 'COMPLETE'
  END                                                        AS data_status
FROM loan_applications
ORDER BY data_status DESC, application_date;`}
      />

      <TimeBlock time="10:30 AM" label="Fix the root cause — add NOT NULL constraint">
        Once the source of NULLs is identified (a specific branch's data entry system skipping the income field), the engineering team adds a NOT NULL constraint to prevent future occurrences. You write the migration script.
      </TimeBlock>

      <CodeBlock
        label="Step 4 — prevent future NULLs with a constraint"
        code={`-- First, fix existing NULLs with verified data (from the branch's paper records)
UPDATE loan_applications
SET annual_income = 350000   -- example: verified from paper form
WHERE application_id IN (12847, 12901, 13022)
  AND annual_income IS NULL;

-- Then add the constraint to prevent future NULLs
ALTER TABLE loan_applications
ALTER COLUMN annual_income SET NOT NULL;`}
      />

      <ProTip>
        In any system that handles financial, medical, or legal data — always make critical fields NOT NULL in the database schema. Application-level validation can be bypassed. A database NOT NULL constraint is the last line of defence and cannot be bypassed by any application, script, or bulk import. Design your schema with the assumption that application code will sometimes have bugs.
      </ProTip>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is NULL in SQL and how is it different from zero or empty string?">
        <p style={{ margin: '0 0 14px' }}>NULL in SQL represents the complete absence of a value — it means the information is unknown, missing, or not applicable for that row. It is fundamentally different from zero, empty string, or false. Zero is a known numeric value. Empty string is a known string of zero length. False is a known boolean value. NULL is the absence of any known value.</p>
        <p style={{ margin: '0 0 14px' }}>The distinction matters enormously in queries. WHERE salary = 0 finds employees with a salary explicitly set to zero — perhaps interns or volunteers. WHERE salary IS NULL finds employees whose salary has not been recorded — perhaps newly added rows or data entry errors. These are completely different sets of rows. Similarly, WHERE name = '' finds rows where name is an empty string — someone entered nothing but submitted the form. WHERE name IS NULL finds rows where the name field was never touched at all.</p>
        <p style={{ margin: 0 }}>In FreshCart's orders table, delivery_date IS NULL means the delivery has not happened yet — not that the delivery date is unknown, but that it does not exist because the event has not occurred. This is the "not applicable" use of NULL, distinct from the "unknown" use. Both are represented identically in SQL, which is why understanding what NULL means in context is important before writing queries that filter on nullable columns.</p>
      </IQ>

      <IQ q="What is three-valued logic and why does it exist in SQL?">
        <p style={{ margin: '0 0 14px' }}>Three-valued logic extends standard two-valued (TRUE/FALSE) boolean logic by adding a third value: NULL (unknown). SQL uses three-valued logic because relational databases store real-world information that is sometimes incomplete or unknown. Forcing every value into TRUE or FALSE when the information is genuinely unknown would produce incorrect results — treating "unknown" as either "yes" or "no" introduces false precision.</p>
        <p style={{ margin: '0 0 14px' }}>The rules of three-valued logic follow from the meaning of NULL as "unknown." Any comparison with NULL returns NULL, because comparing a known value to an unknown value cannot produce a definitive TRUE or FALSE answer. TRUE AND NULL = NULL (true combined with unknown is still uncertain). FALSE AND NULL = FALSE (false combined with anything is false). TRUE OR NULL = TRUE (true combined with anything is true). FALSE OR NULL = NULL (false combined with unknown is uncertain). NOT NULL = NULL (reversing unknown is still unknown).</p>
        <p style={{ margin: 0 }}>The practical consequence: the WHERE clause discards rows where the condition evaluates to NULL — only rows where the condition is definitely TRUE are included. This is the correct behaviour logically, but it means developers must be explicit about NULL handling. A condition intended to match "anything that is not Bangalore" written as WHERE city {'<>'} 'Bangalore' silently excludes rows where city is NULL, because NULL {'<>'} 'Bangalore' evaluates to NULL, not TRUE. The correct version that includes NULL cities is WHERE city {'<>'} 'Bangalore' OR city IS NULL.</p>
      </IQ>

      <IQ q="What does COALESCE do and give a real-world example of when you would use it?">
        <p style={{ margin: '0 0 14px' }}>COALESCE(value1, value2, ..., valueN) evaluates its arguments left to right and returns the first non-NULL value. If all arguments are NULL, it returns NULL. It is the standard SQL function for providing default values when a column might be NULL and for implementing fallback logic when multiple columns might supply a value.</p>
        <p style={{ margin: '0 0 14px' }}>Real-world example 1 — default values in calculations: when calculating the discounted price of a product, if discount_pct is NULL (no discount applies), multiplying by NULL produces NULL for the entire calculation. COALESCE(discount_pct, 0) replaces NULL with 0 so the calculation works correctly: unit_price * (1 - COALESCE(discount_pct, 0) / 100). The result is the original unit_price when no discount applies, rather than NULL.</p>
        <p style={{ margin: 0 }}>Real-world example 2 — contact information fallback: a CRM might have preferred_email, work_email, and personal_email as separate columns. To get the best available contact: COALESCE(preferred_email, work_email, personal_email, 'No email on file'). This returns the preferred email if set, falls back to work email, then personal email, and finally a literal string if none are available. This fallback chain pattern is extremely common in data integration and reporting where data comes from multiple sources with varying completeness.</p>
      </IQ>

      <IQ q="Why is NOT IN dangerous when the subquery might return NULL?">
        <p style={{ margin: '0 0 14px' }}>NOT IN with a subquery that contains NULL values causes the entire WHERE clause to return NULL for every row — resulting in zero rows in the output. This happens silently with no error message, making it one of the most dangerous NULL traps in SQL.</p>
        <p style={{ margin: '0 0 14px' }}>The mechanism: NOT IN (val1, val2, NULL) is internally equivalent to NOT (col = val1 OR col = val2 OR col = NULL). For any row in the outer query, col = NULL always evaluates to NULL (from three-valued logic). When the final OR combines a NULL result with the other conditions, and those conditions are also NULL or FALSE, the OR produces NULL. NOT NULL = NULL. The WHERE clause sees NULL and discards the row. This happens for every single row in the outer table — returning zero results.</p>
        <p style={{ margin: 0 }}>The safe alternatives are: NOT EXISTS (SELECT 1 FROM subquery WHERE subquery.col = outer.col) — this correctly handles NULL because EXISTS checks for the presence of rows, not value equality. Or, filter NULLs from the subquery explicitly: NOT IN (SELECT col FROM table WHERE col IS NOT NULL). In practice, NOT EXISTS is almost always preferable to NOT IN for correlated lookups because it handles NULL correctly, often performs better on large datasets, and its intent is clearer. This is a rule worth memorising: when you mean "no matching row exists," write NOT EXISTS, not NOT IN.</p>
      </IQ>

      <IQ q="What is NULLIF and when would you use it?">
        <p style={{ margin: '0 0 14px' }}>NULLIF(value1, value2) returns NULL if value1 equals value2, otherwise returns value1. It is the inverse of COALESCE — where COALESCE replaces NULL with a value, NULLIF converts a specific value into NULL. The most common use case is preventing division-by-zero errors by converting a zero denominator into NULL before division.</p>
        <p style={{ margin: '0 0 14px' }}>Division by zero example: calculating profit margin as (unit_price - cost_price) / unit_price would error if unit_price is zero. With NULLIF: (unit_price - cost_price) / NULLIF(unit_price, 0). If unit_price is zero, NULLIF returns NULL, and dividing by NULL returns NULL instead of raising an error. The result row shows NULL for the margin, which correctly communicates "this calculation is not applicable" rather than crashing the query.</p>
        <p style={{ margin: 0 }}>Second use case — treating sentinel values as NULL: some legacy systems use 0 or empty string as a "no value" indicator instead of NULL. COALESCE(NULLIF(phone, ''), 'No phone') handles both cases — if phone is '' (empty string), NULLIF converts it to NULL, then COALESCE replaces NULL with 'No phone'. If phone is already NULL, NULLIF leaves it NULL and COALESCE replaces it. If phone is '+91-9876543210', NULLIF leaves it as-is and COALESCE returns it. The combination of NULLIF and COALESCE is a standard pattern for normalising data from sources that mix NULL and empty string to represent "no value."</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="Query returns zero rows — WHERE column = NULL returns nothing"
        cause="You used = to compare a column to NULL. NULL = NULL evaluates to NULL (not TRUE), and the WHERE clause discards all NULL-result rows. This is the single most common NULL mistake. The query runs without error and returns zero rows — silently incorrect behaviour that can be very hard to debug if you do not know three-valued logic."
        fix="Replace = NULL with IS NULL: WHERE delivery_date IS NULL. Replace <> NULL with IS NOT NULL: WHERE delivery_date IS NOT NULL. These are the only correct operators for NULL checks. Most SQL editors have a linting feature that flags = NULL and <> NULL as potential bugs — enable it in your editor settings."
      />

      <Err
        msg="NOT IN returns zero rows — query returns nothing when subquery has NULLs"
        cause="The NOT IN subquery returned at least one NULL value. NOT IN (val1, NULL) internally includes a col = NULL comparison which always evaluates to NULL. Since NOT NULL = NULL, every row in the outer query evaluates to NULL and is discarded by WHERE. This happens even if only one row in the subquery has a NULL value — one NULL poisons the entire NOT IN result."
        fix="Replace NOT IN with NOT EXISTS: WHERE NOT EXISTS (SELECT 1 FROM table WHERE table.col = outer.col). Or add WHERE col IS NOT NULL to the subquery: WHERE col NOT IN (SELECT col FROM table WHERE col IS NOT NULL). To diagnose: run the subquery alone and check for NULLs: SELECT COUNT(*) FROM subquery_table WHERE col IS NULL. If this returns any rows, NOT IN will fail."
      />

      <Err
        msg="AVG() returns a higher number than expected — NULL values excluded from average"
        cause="AVG() ignores NULL values — it only averages the non-NULL rows. If you have 30 orders but 12 have NULL delivery dates (undelivered), AVG(delivery_date - order_date) averages only the 18 delivered orders. The result is the average delivery time for delivered orders, not for all orders. If you expected the average across all orders with NULL counted as some value (like 0 or today's date), the result will be higher than expected."
        fix="Make the NULL handling explicit: AVG(COALESCE(delivery_date - order_date, 0)) — this replaces NULL with 0 days before averaging. Or use a CASE expression: AVG(CASE WHEN delivery_date IS NOT NULL THEN delivery_date - order_date END) — which produces the same result as plain AVG but makes the NULL exclusion explicit and self-documenting. Always document in comments whether your average intentionally excludes NULLs or whether COALESCE should be used."
      />

      <Err
        msg="Calculation returns NULL — expected a number but got NULL in result column"
        cause="One of the columns in your calculation contains NULL for that row, and NULL propagates through arithmetic. unit_price * NULL = NULL, NULL + 100 = NULL. Any calculation that touches a NULL column produces NULL for that row's result. This commonly happens with optional columns like discount_pct or bonus_amount that are NULL when not applicable."
        fix="Wrap nullable columns in COALESCE with an appropriate default before using them in calculations: unit_price * (1 - COALESCE(discount_pct, 0) / 100). Salary + COALESCE(bonus, 0). The default value should be whatever makes mathematical sense — 0 for additive values, 1 for multiplicative factors, the column itself for no-op operations. Check which column is NULL by running SELECT * FROM table WHERE the_nullable_column IS NULL LIMIT 5 to confirm the source of the NULL."
      />

      <Err
        msg="UNIQUE constraint allows duplicate emails — multiple rows with same email inserted"
        cause="The email column allows NULL, and NULL values are exempt from UNIQUE constraint enforcement because NULL IS NOT DISTINCT FROM NULL is false in standard SQL comparison — each NULL is considered distinct from every other NULL. A UNIQUE constraint on email prevents duplicate non-null emails but allows any number of NULL emails. If multiple users are inserted without an email address, all of them get NULL and all pass the UNIQUE check."
        fix="If NULL emails should not be allowed, add NOT NULL to the email column: ALTER TABLE customers ALTER COLUMN email SET NOT NULL. If NULL emails are valid but only one NULL should be allowed, this cannot be enforced with standard UNIQUE — it requires a filtered unique index. In PostgreSQL: CREATE UNIQUE INDEX idx_customers_email ON customers (email) WHERE email IS NOT NULL — this enforces uniqueness on non-null emails while allowing multiple NULLs. In MySQL, the standard UNIQUE already allows multiple NULLs and there is no filtered index syntax for this specific case."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="The FreshCart operations team wants a delivery performance report. Write a query that shows all orders with: order_id, order_date, a delivery_status column that shows 'Delivered' if delivery_date IS NOT NULL or 'Pending' if delivery_date IS NULL, the actual delivery_date (show 'Not yet delivered' if NULL), and days_taken (the number of days between order_date and delivery_date — show NULL for pending orders). Sort by order_date descending."
        hint="Use CASE WHEN delivery_date IS NOT NULL THEN 'Delivered' ELSE 'Pending' END for the status. Use COALESCE(CAST(delivery_date AS VARCHAR), 'Not yet delivered') for the date display. Use delivery_date - order_date for days_taken (it will naturally be NULL for undelivered orders)."
        answer={`SELECT
  order_id,
  order_date,
  CASE
    WHEN delivery_date IS NOT NULL THEN 'Delivered'
    ELSE 'Pending'
  END                                                       AS delivery_status,
  COALESCE(CAST(delivery_date AS VARCHAR), 'Not yet delivered')  AS delivery_date,
  delivery_date - order_date                                AS days_taken
FROM orders
ORDER BY order_date DESC;`}
        explanation="This query uses three NULL handling techniques together. CASE WHEN delivery_date IS NOT NULL uses IS NOT NULL (never = or <>) to correctly check for NULL. COALESCE replaces NULL with a readable string for display purposes. The days_taken column uses no NULL handling at all — delivery_date - order_date naturally produces NULL when delivery_date is NULL, which is the correct behaviour (pending orders have no delivery time yet). The CAST(delivery_date AS VARCHAR) converts the date to a string so COALESCE can compare it with the string 'Not yet delivered' — both must be the same type for COALESCE to work correctly."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'NULL means the absence of a value — unknown, missing, or not applicable. It is not zero, not empty string, not false. It is the complete absence of any known value.',
          'SQL uses three-valued logic: TRUE, FALSE, and NULL. Any comparison with NULL using standard operators (=, <>, >, <) returns NULL — never TRUE or FALSE.',
          'The WHERE clause discards rows where the condition evaluates to NULL. This means NULL conditions silently exclude rows — the most common source of invisible data quality bugs in SQL.',
          'The only correct operators for checking NULL are IS NULL and IS NOT NULL. Never use = NULL or <> NULL — they return zero rows, always.',
          'NULL propagates through arithmetic: any calculation involving NULL returns NULL. SUM, AVG, MIN, MAX all ignore NULL values. COUNT(*) counts all rows; COUNT(column) counts only non-NULL values.',
          'COALESCE(a, b, c) returns the first non-NULL value. Use it to replace NULL with default values in calculations and display — COALESCE(discount_pct, 0), COALESCE(delivery_date, \'Not yet delivered\').',
          'NULLIF(a, b) returns NULL if a equals b, otherwise returns a. Use it to prevent division by zero: value / NULLIF(denominator, 0).',
          'NOT IN with a subquery that returns any NULL value produces zero rows silently. Always use NOT EXISTS instead, or add WHERE col IS NOT NULL to the subquery.',
          'UNIQUE constraints allow multiple NULL values — each NULL is considered distinct from every other NULL in standard SQL.',
          'GROUP BY and DISTINCT both treat NULL as a single distinct value — all NULL rows form one NULL group, and multiple NULLs collapse into one in DISTINCT results.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 12</strong>, you learn column calculations and arithmetic expressions — doing math directly inside SQL, working with operator precedence, and building computed columns that power real analytics.
        </p>
        <Link href="/learn/sql/arithmetic-expressions" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 12 → Column Calculations — Arithmetic
        </Link>
      </div>

    </LearnLayout>
  );
}
