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

const TruthTable = ({ rows, headers }: { rows: (string | boolean)[][]; headers: string[] }) => (
  <div style={{ overflowX: 'auto', margin: '16px 0 24px' }}>
    <table style={{ borderCollapse: 'collapse', fontSize: 13 }}>
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
              const isResult = j === row.length - 1;
              const color = cell === 'TRUE' ? '#00e676' : cell === 'FALSE' ? '#ff4757' : cell === 'NULL' ? '#f59e0b' : 'var(--text)';
              return (
                <td key={j} style={{ padding: '10px 20px', textAlign: 'center', borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: 13, color: isResult || cell === 'TRUE' || cell === 'FALSE' || cell === 'NULL' ? color : 'var(--text)', fontWeight: isResult ? 700 : 400 }}>
                  {String(cell)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function AndOrNot() {
  return (
    <LearnLayout
      title="Multiple Conditions — AND, OR, NOT"
      description="Combine WHERE filters to answer complex business questions — precedence rules, truth tables, and every pattern you will use in production"
      section="SQL — Module 07"
      readTime="35 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why One Condition Is Never Enough" />

      <P>In Module 06 you learned to filter rows with a single WHERE condition. Real business questions almost never have a single condition. They sound like this:</P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', margin: '20px 0 28px' }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.08em' }}>Real questions from real teams</div>
        {[
          { team: 'Growth', q: '"Show me Gold and Platinum customers from Bangalore who joined after January 2022."' },
          { team: 'Finance', q: '"Find all UPI orders above ₹1,000 that are either Cancelled or Returned."' },
          { team: 'Ops', q: '"Which products are out of stock AND priced above ₹200?"' },
          { team: 'HR', q: '"Employees in the Management department earning above ₹50,000 OR any Store Manager regardless of salary."' },
        ].map(item => (
          <div key={item.team} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', paddingTop: 3, flexShrink: 0, width: 60 }}>{item.team}</span>
            <span style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, fontStyle: 'italic' }}>{item.q}</span>
          </div>
        ))}
      </div>

      <P>Every one of these questions requires combining multiple conditions. SQL provides three logical operators to do this: <Hl>AND</Hl>, <Hl>OR</Hl>, and <Hl>NOT</Hl>. Together they let you express any combination of conditions — no matter how complex — in a single WHERE clause.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="AND — Both Conditions Must Be True" />

      <P>AND combines two conditions and returns TRUE only when <Hl>both</Hl> conditions are true. If either condition is false, the row is excluded. Think of AND as narrowing your results — every AND you add makes the filter more restrictive.</P>

      <H>Truth table for AND</H>

      <TruthTable
        headers={['Condition A', 'Condition B', 'A AND B']}
        rows={[
          ['TRUE',  'TRUE',  'TRUE'],
          ['TRUE',  'FALSE', 'FALSE'],
          ['FALSE', 'TRUE',  'FALSE'],
          ['FALSE', 'FALSE', 'FALSE'],
          ['TRUE',  'NULL',  'NULL'],
          ['FALSE', 'NULL',  'FALSE'],
          ['NULL',  'NULL',  'NULL'],
        ]}
      />

      <P>The NULL rows are important — if either condition is NULL (unknown), AND cannot determine a definitive TRUE result unless the other condition is definitively FALSE.</P>

      <H>AND in practice — FreshMart examples</H>

      <SQLPlayground
        initialQuery={`-- Gold customers from Bangalore only
-- BOTH conditions must be true
SELECT first_name, last_name, city, loyalty_tier, joined_date
FROM customers
WHERE loyalty_tier = 'Gold'
  AND city = 'Bangalore';`}
        height={130}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Delivered orders paid by UPI above ₹500
-- Three conditions — all must be true
SELECT order_id, customer_id, order_date,
       payment_method, total_amount, order_status
FROM orders
WHERE order_status = 'Delivered'
  AND payment_method = 'UPI'
  AND total_amount > 500
ORDER BY total_amount DESC;`}
        height={160}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Expensive products that are OUT of stock
-- High priority for the procurement team to reorder
SELECT product_name, category, brand, unit_price
FROM products
WHERE unit_price > 200
  AND in_stock = false;`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Employees hired between 2020 and 2021 earning above ₹40,000
SELECT first_name, last_name, role, salary, hire_date
FROM employees
WHERE hire_date >= '2020-01-01'
  AND hire_date <  '2022-01-01'
  AND salary > 40000
ORDER BY salary DESC;`}
        height={130}
        showSchema={false}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="OR — At Least One Condition Must Be True" />

      <P>OR combines two conditions and returns TRUE when <Hl>at least one</Hl> condition is true. If both are true, the row is still included. Think of OR as broadening your results — every OR you add makes the filter more permissive, potentially returning more rows.</P>

      <H>Truth table for OR</H>

      <TruthTable
        headers={['Condition A', 'Condition B', 'A OR B']}
        rows={[
          ['TRUE',  'TRUE',  'TRUE'],
          ['TRUE',  'FALSE', 'TRUE'],
          ['FALSE', 'TRUE',  'TRUE'],
          ['FALSE', 'FALSE', 'FALSE'],
          ['TRUE',  'NULL',  'TRUE'],
          ['FALSE', 'NULL',  'NULL'],
          ['NULL',  'NULL',  'NULL'],
        ]}
      />

      <P>Notice that OR with NULL can still return TRUE if the other condition is TRUE. This is different from AND — when one condition is TRUE and the other is NULL, OR returns TRUE because one known TRUE is enough.</P>

      <H>OR in practice — FreshMart examples</H>

      <SQLPlayground
        initialQuery={`-- Customers from either Bangalore OR Hyderabad
-- OR broadens: returns rows matching EITHER city
SELECT first_name, last_name, city, loyalty_tier
FROM customers
WHERE city = 'Bangalore'
   OR city = 'Hyderabad'
ORDER BY city;`}
        height={130}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Orders that were either Cancelled OR Returned
-- The problem orders — ops team investigates these
SELECT order_id, customer_id, order_date,
       order_status, payment_method, total_amount
FROM orders
WHERE order_status = 'Cancelled'
   OR order_status = 'Returned'
ORDER BY order_date DESC;`}
        height={150}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Products in Staples OR Beverages category
-- Weekend promotion eligibility check
SELECT product_name, category, brand, unit_price
FROM products
WHERE category = 'Staples'
   OR category = 'Beverages'
ORDER BY category, unit_price;`}
        height={130}
        showSchema={false}
      />

      <Callout type="tip">
        When you find yourself writing multiple OR conditions on the same column — WHERE city = 'Bangalore' OR city = 'Hyderabad' OR city = 'Mumbai' — there is a cleaner way: the IN operator. WHERE city IN ('Bangalore', 'Hyderabad', 'Mumbai'). You will learn IN in Module 15. For now, OR works perfectly and understanding it deeply makes IN intuitive when you get there.
      </Callout>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="NOT — Reverse the Condition" />

      <P>NOT reverses the result of a condition. A condition that was TRUE becomes FALSE, and a condition that was FALSE becomes TRUE. It is the SQL equivalent of saying <Hl>"everything except this."</Hl></P>

      <H>Truth table for NOT</H>

      <TruthTable
        headers={['Condition', 'NOT Condition']}
        rows={[
          ['TRUE',  'FALSE'],
          ['FALSE', 'TRUE'],
          ['NULL',  'NULL'],
        ]}
      />

      <P>Important: NOT NULL is still NULL — the absence of a value reversed is still unknown. This is why NOT IN behaves surprisingly when the list contains NULL values — you will see this in Module 15.</P>

      <H>NOT in practice — FreshMart examples</H>

      <SQLPlayground
        initialQuery={`-- All customers NOT in Bangalore
-- NOT reverses the = condition
SELECT first_name, last_name, city, loyalty_tier
FROM customers
WHERE NOT city = 'Bangalore'
ORDER BY city;`}
        height={120}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- More commonly written as <> (not equal)
-- Both produce identical results
SELECT first_name, last_name, city, loyalty_tier
FROM customers
WHERE city <> 'Bangalore'
ORDER BY city;`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Products that are NOT in the Staples or Dairy categories
-- NOT with OR — exclude multiple values
SELECT product_name, category, unit_price
FROM products
WHERE NOT (category = 'Staples' OR category = 'Dairy')
ORDER BY category;`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Delivered orders that did NOT use UPI
-- Finding orders paid by Card, COD, or NetBanking
SELECT order_id, order_date, payment_method, total_amount
FROM orders
WHERE order_status = 'Delivered'
  AND NOT payment_method = 'UPI'
ORDER BY total_amount DESC;`}
        height={130}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Operator Precedence — The Order SQL Evaluates Conditions" />

      <P>When you combine AND, OR, and NOT in the same WHERE clause, the order in which they are evaluated matters enormously. SQL does not evaluate conditions left to right — it follows a <Hl>precedence order</Hl>, just like arithmetic (multiplication before addition).</P>

      <P>The precedence order for logical operators is:</P>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '20px 0 28px' }}>
        {[
          { rank: '1st', op: 'NOT', desc: 'Evaluated first — applies to the immediately following condition', color: '#8b5cf6' },
          { rank: '2nd', op: 'AND', desc: 'Evaluated second — binds conditions tightly', color: C },
          { rank: '3rd', op: 'OR', desc: 'Evaluated last — loosely connects groups of conditions', color: '#f97316' },
        ].map(item => (
          <div key={item.op} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', paddingTop: 3, flexShrink: 0, width: 28 }}>{item.rank}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: item.color, flexShrink: 0, width: 40 }}>{item.op}</span>
            <span style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6 }}>{item.desc}</span>
          </div>
        ))}
      </div>

      <H>The classic precedence mistake</H>

      <P>This is the most common AND/OR bug in SQL. The query <em>looks</em> correct but returns wrong results because AND binds before OR:</P>

      <CodeBlock
        label="The precedence trap — this query has a bug"
        code={`-- INTENTION: Find Gold or Platinum customers from Bangalore
-- ACTUAL: Find ALL Platinum customers + Gold customers from Bangalore

SELECT first_name, city, loyalty_tier
FROM customers
WHERE loyalty_tier = 'Gold'
   OR loyalty_tier = 'Platinum'
  AND city = 'Bangalore';

-- What the database actually evaluates (AND runs first):
-- WHERE loyalty_tier = 'Gold'
--    OR (loyalty_tier = 'Platinum' AND city = 'Bangalore')

-- This returns ALL Gold customers from ANY city
-- plus only Platinum customers from Bangalore
-- Not what was intended!`}
      />

      <SQLPlayground
        initialQuery={`-- Run this to see the bug in action
-- Notice Gold customers from Hyderabad, Mumbai etc. are included
-- Even though we only wanted Bangalore customers
SELECT first_name, city, loyalty_tier
FROM customers
WHERE loyalty_tier = 'Gold'
   OR loyalty_tier = 'Platinum'
  AND city = 'Bangalore'
ORDER BY loyalty_tier, city;`}
        height={140}
        showSchema={true}
      />

      <H>The fix — always use parentheses with OR</H>

      <P>Parentheses override precedence completely. Anything inside parentheses is evaluated first, just like in math. When combining AND and OR, use parentheses to make your intent explicit and unambiguous.</P>

      <SQLPlayground
        initialQuery={`-- CORRECT: parentheses make the intent explicit
-- First evaluate the OR (Gold OR Platinum)
-- Then apply AND (must also be from Bangalore)
SELECT first_name, city, loyalty_tier
FROM customers
WHERE (loyalty_tier = 'Gold' OR loyalty_tier = 'Platinum')
  AND city = 'Bangalore'
ORDER BY loyalty_tier;`}
        height={130}
        showSchema={false}
      />

      <Callout type="warning">
        The AND-before-OR precedence bug is one of the most common silent data quality issues in SQL. The query runs without error and returns results — just the wrong results. Always use parentheses when mixing AND and OR. Even when precedence would give the right answer, explicit parentheses make your intent clear to anyone reading the query.
      </Callout>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Combining All Three — AND, OR, NOT Together" />

      <P>Complex business questions require all three operators together. The key is always: <Hl>use parentheses to make evaluation order explicit</Hl>. Never rely on precedence rules alone when your query mixes AND and OR.</P>

      <SQLPlayground
        initialQuery={`-- High-value problem orders:
-- (Cancelled OR Returned) AND total above ₹500
-- These are the ones finance needs to investigate for refunds
SELECT order_id, customer_id, store_id,
       order_date, order_status, payment_method, total_amount
FROM orders
WHERE (order_status = 'Cancelled' OR order_status = 'Returned')
  AND total_amount > 500
ORDER BY total_amount DESC;`}
        height={160}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Premium products in a specific price range
-- NOT a staple AND priced between ₹100 and ₹350
SELECT product_name, category, brand, unit_price, in_stock
FROM products
WHERE NOT category = 'Staples'
  AND unit_price >= 100
  AND unit_price <= 350
ORDER BY unit_price;`}
        height={150}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Store managers OR employees with salary above ₹60,000
-- Either condition qualifies for the leadership report
SELECT first_name, last_name, role, salary, store_id
FROM employees
WHERE role = 'Store Manager'
   OR salary > 60000
ORDER BY salary DESC;`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Complex multi-condition query:
-- Bangalore Platinum customers OR Hyderabad Gold customers
-- who joined after 2021 — for a targeted regional campaign
SELECT first_name, last_name, city, loyalty_tier, joined_date
FROM customers
WHERE (
    (city = 'Bangalore' AND loyalty_tier = 'Platinum')
    OR
    (city = 'Hyderabad' AND loyalty_tier = 'Gold')
  )
  AND joined_date >= '2022-01-01'
ORDER BY city, loyalty_tier;`}
        height={170}
        showSchema={false}
      />

      <P>The last query demonstrates nested parentheses — the inner parentheses group the city-tier pairs, the outer AND then applies the date filter to whichever city-tier combination matched. Reading complex WHERE clauses from the inside out (innermost parentheses first) is the most reliable way to understand what they do.</P>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="AND, OR, NOT with NULL — The Surprising Behaviour" />

      <P>NULL values interact with AND, OR, and NOT in ways that surprise beginners. The truth tables from Parts 02–04 showed the full picture — here are the practical consequences you need to know.</P>

      <H>AND with NULL</H>
      <P>If one condition is NULL and the other is FALSE, AND returns FALSE. If one condition is NULL and the other is TRUE, AND returns NULL (which means the row is excluded). This means a NULL condition on the AND side can cause rows to silently disappear from your results.</P>

      <H>OR with NULL</H>
      <P>If one condition is NULL and the other is TRUE, OR returns TRUE. This is the one place where NULL does not cause a row to disappear — the TRUE condition is enough for OR. If one condition is NULL and the other is FALSE, OR returns NULL (row excluded).</P>

      <H>NOT with NULL</H>
      <P>NOT NULL is still NULL. This has a major practical consequence: if you write WHERE NOT city = 'Bangalore', rows where city IS NULL will <Hl>not</Hl> be included in the results — even though logically you might expect "not Bangalore" to include "unknown city." NULL propagates through NOT unchanged.</P>

      <SQLPlayground
        initialQuery={`-- Demonstrate NULL behaviour with AND/OR
-- Orders where delivery_date IS NULL (not delivered)
-- AND order_status is NOT 'Cancelled'
-- These are genuinely pending orders
SELECT order_id, order_date, order_status, total_amount
FROM orders
WHERE delivery_date IS NULL
  AND order_status <> 'Cancelled'
ORDER BY order_date;`}
        height={140}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Employees with no manager (NULL manager_id)
-- OR employees who ARE a Store Manager
-- The top of the org chart
SELECT employee_id, first_name, last_name, role, manager_id
FROM employees
WHERE manager_id IS NULL
   OR role = 'Store Manager'
ORDER BY role;`}
        height={140}
        showSchema={false}
      />

      <ProTip>
        Whenever you write a WHERE clause that combines conditions, mentally ask: "What happens if any of the columns in my conditions contain NULL?" If a NULL value in the data would cause a row to silently disappear from your results when you expect it to be included, add an explicit IS NULL or IS NOT NULL check. Silent data loss from NULL propagation is one of the hardest bugs to spot because the query runs without error.
      </ProTip>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Writing Readable Multi-Condition WHERE Clauses" />

      <P>As conditions multiply, WHERE clauses can become hard to read. Professional SQL follows consistent formatting conventions that make complex conditions readable at a glance.</P>

      <CodeBlock
        label="Formatting conventions for multi-condition WHERE"
        code={`-- Each condition on its own line
-- AND/OR at the START of the line (not the end)
-- This makes it easy to comment out individual conditions

SELECT *
FROM orders
WHERE order_status = 'Delivered'    -- primary filter
  AND payment_method = 'UPI'        -- secondary filter
  AND total_amount > 1000           -- threshold filter
  AND order_date >= '2024-01-01';   -- date filter

-- When mixing AND and OR — always use parentheses
-- Group related conditions with matching indentation

SELECT *
FROM orders
WHERE (order_status = 'Cancelled'
       OR order_status = 'Returned')
  AND total_amount > 500
  AND order_date >= '2024-01-01';

-- Complex conditions — each group on its own indented block

SELECT *
FROM customers
WHERE (
    (city = 'Bangalore' AND loyalty_tier IN ('Gold', 'Platinum'))
    OR
    (city = 'Mumbai'    AND loyalty_tier = 'Platinum')
  )
  AND joined_date >= '2022-01-01';`}
      />

      <P>The convention of putting AND/OR at the beginning of lines (not the end) makes it easy to comment out individual conditions during debugging — just add -- in front of the line without breaking the query syntax.</P>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Real Business Scenarios — Complete Examples" />

      <P>Here are the four business questions from Part 01 — now answered with complete queries.</P>

      <H>Growth team — high-value customers in specific cities</H>

      <SQLPlayground
        initialQuery={`-- "Gold and Platinum customers from Bangalore who joined after January 2022"
SELECT
  first_name, last_name, city,
  loyalty_tier, joined_date, email
FROM customers
WHERE (loyalty_tier = 'Gold' OR loyalty_tier = 'Platinum')
  AND city = 'Bangalore'
  AND joined_date >= '2022-01-01'
ORDER BY loyalty_tier, joined_date DESC;`}
        height={160}
        showSchema={true}
      />

      <H>Finance team — UPI orders that failed</H>

      <SQLPlayground
        initialQuery={`-- "All UPI orders above ₹1,000 that are Cancelled or Returned"
SELECT
  order_id, customer_id,
  order_date, order_status,
  payment_method, total_amount
FROM orders
WHERE payment_method = 'UPI'
  AND total_amount > 1000
  AND (order_status = 'Cancelled' OR order_status = 'Returned')
ORDER BY total_amount DESC;`}
        height={160}
        showSchema={false}
      />

      <H>Operations team — stock and price analysis</H>

      <SQLPlayground
        initialQuery={`-- "Products out of stock AND priced above ₹200"
-- Procurement needs to know what expensive items to reorder
SELECT
  product_name, category, brand,
  unit_price, cost_price
FROM products
WHERE in_stock = false
  AND unit_price > 200
ORDER BY unit_price DESC;`}
        height={140}
        showSchema={false}
      />

      <H>HR team — leadership compensation review</H>

      <SQLPlayground
        initialQuery={`-- "Management dept above ₹50,000 OR any Store Manager"
SELECT
  first_name, last_name, role,
  department, salary, store_id
FROM employees
WHERE (department = 'Management' AND salary > 50000)
   OR role = 'Store Manager'
ORDER BY salary DESC;`}
        height={140}
        showSchema={false}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="What This Looks Like at Work" />

      <P>You are a data analyst at CRED, a Bangalore-based fintech that rewards credit card users. The growth team calls an urgent meeting — they are preparing a targeted cashback campaign and need a segmented customer list by end of day.</P>

      <TimeBlock time="3:00 PM" label="Campaign brief arrives">
        The growth manager explains three segments for the cashback campaign. Segment A: high-spending users in metro cities (Delhi, Bangalore, Mumbai) who have been active in the last 60 days. Segment B: users in Tier 2 cities who have a credit score above 750 but have been inactive for more than 30 days — the reactivation target. Segment C: new users (joined in the last 90 days) who have already completed at least one high-value transaction. Each segment needs a separate list with user IDs, cities, and relevant metrics.
      </TimeBlock>

      <TimeBlock time="3:15 PM" label="You translate the brief into WHERE conditions">
        Segment A requires: city IN metro list AND last_active_date within 60 days. Segment B requires: city NOT IN metro list AND credit_score greater than 750 AND last_active_date more than 30 days ago. Segment C requires: joined_date within 90 days AND at least one transaction above ₹5,000. Each segment becomes a separate WHERE clause. You build them one at a time, verifying row counts before sharing.
      </TimeBlock>

      <CodeBlock
        label="Segment A — Metro high-spenders (adapted for FreshMart data)"
        code={`-- Adapt to FreshMart: Gold/Platinum customers in metro cities
-- with recent orders (Feb 2024 or later)
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name  AS customer_name,
  c.city,
  c.loyalty_tier
FROM customers c
WHERE (c.city = 'Bangalore'
    OR c.city = 'Delhi'
    OR c.city = 'Mumbai')
  AND (c.loyalty_tier = 'Gold'
    OR c.loyalty_tier = 'Platinum')
ORDER BY c.city;`}
      />

      <TimeBlock time="4:30 PM" label="Three lists delivered, 90 minutes early">
        You run three separate queries, export each to a sheet tab, and share the Google Sheet link. The growth manager adds it directly to the campaign tool. "This is exactly what we needed — and the segmentation logic is right there in the SQL comments so I can adjust it next time." Your queries are not just answers — they are documented, reproducible, adjustable analysis.
      </TimeBlock>

      <ProTip>
        Always add comments to complex WHERE clauses explaining what business segment or rule each condition represents. The SQL itself shows WHAT is being filtered. The comments explain WHY — which campaign, which definition of "high-value," which date range and why. A query with good comments is a self-documenting piece of business logic that your team can run, verify, and adjust without asking you.
      </ProTip>

      <HR />

      {/* ── PART 11 — Interview Prep ── */}
      <Part n="11" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is operator precedence in SQL and why does it matter for AND and OR?">
        <p style={{ margin: '0 0 14px' }}>Operator precedence determines the order in which SQL evaluates logical operators when multiple operators appear in the same WHERE clause. In SQL, NOT has the highest precedence, AND has the second highest, and OR has the lowest. This means SQL evaluates NOT conditions first, then AND conditions, and finally OR conditions — regardless of the order they appear in the query text.</p>
        <p style={{ margin: '0 0 14px' }}>This matters because mixing AND and OR without parentheses can produce results that differ from what was intended. For example: WHERE tier = 'Gold' OR tier = 'Platinum' AND city = 'Bangalore' is evaluated as WHERE tier = 'Gold' OR (tier = 'Platinum' AND city = 'Bangalore') — because AND binds before OR. This returns all Gold customers from any city plus Platinum customers from Bangalore only, rather than Gold and Platinum customers from Bangalore as the author likely intended.</p>
        <p style={{ margin: 0 }}>The correct approach is always to use parentheses when combining AND and OR: WHERE (tier = 'Gold' OR tier = 'Platinum') AND city = 'Bangalore'. Parentheses override precedence completely — expressions inside parentheses are always evaluated first. Even when precedence would naturally produce the correct result, writing explicit parentheses makes intent clear to anyone reading the query and prevents bugs when conditions are added or modified later.</p>
      </IQ>

      <IQ q="What is the difference between AND and OR? When would you use each?">
        <p style={{ margin: '0 0 14px' }}>AND returns TRUE only when both conditions are true — it narrows results by requiring all conditions to be satisfied simultaneously. Every additional AND condition makes the filter more restrictive. OR returns TRUE when at least one condition is true — it broadens results by accepting rows that satisfy any of the conditions. Every additional OR condition makes the filter more permissive.</p>
        <p style={{ margin: '0 0 14px' }}>Use AND when you need rows that satisfy multiple criteria simultaneously: orders that are both delivered AND paid by UPI AND above ₹1,000. All three characteristics must be present in the same row. Use OR when you need rows that match any of several alternative criteria: customers from Bangalore OR Hyderabad OR Mumbai. A customer matching any one city qualifies.</p>
        <p style={{ margin: 0 }}>A practical test: if you read the question with "AND" and "OR" literally, the answer is usually correct. "Give me customers from Bangalore AND with Gold tier" — AND. "Give me customers from Bangalore OR Hyderabad" — OR. "Give me Gold or Platinum customers from Bangalore" — the "or" applies to tier, so OR for tier, then AND for the city: WHERE (tier = 'Gold' OR tier = 'Platinum') AND city = 'Bangalore'.</p>
      </IQ>

      <IQ q="How does NOT work and what are its limitations with NULL?">
        <p style={{ margin: '0 0 14px' }}>NOT reverses the logical result of a condition. A condition that evaluates to TRUE becomes FALSE, and a condition that evaluates to FALSE becomes TRUE. NOT NULL, however, is still NULL — the unknown reversed is still unknown. This is the fundamental limitation of NOT with nullable columns.</p>
        <p style={{ margin: '0 0 14px' }}>The practical consequence: WHERE NOT city = 'Bangalore' returns rows where city is any value other than 'Bangalore' but does NOT return rows where city IS NULL. Rows with a null city silently disappear from the results. If you want to include null values in a NOT condition, you must explicitly add them: WHERE (city &lt;&gt; 'Bangalore' OR city IS NULL).</p>
        <p style={{ margin: 0 }}>NOT is most commonly used in two forms: NOT LIKE (does not match a pattern), NOT IN (value not in a list), and NOT EXISTS (no matching rows in a subquery). The NOT IN form has a particularly dangerous NULL interaction — if the IN list contains even one NULL value, NOT IN returns zero rows for the entire query, which is almost never what was intended. This is why NOT EXISTS is often preferred over NOT IN for correlated subqueries. You will learn this in Module 38.</p>
      </IQ>

      <IQ q="Given the query: WHERE status = 'Delivered' OR status = 'Returned' AND amount > 1000 — what does it actually return?">
        <p style={{ margin: '0 0 14px' }}>Due to operator precedence (AND before OR), this query is evaluated as: WHERE status = 'Delivered' OR (status = 'Returned' AND amount &gt; 1000). It returns two groups of rows: all rows where status is 'Delivered' regardless of amount (every delivered order, whether ₹10 or ₹100,000), plus rows where status is 'Returned' AND amount is greater than 1,000.</p>
        <p style={{ margin: '0 0 14px' }}>This is almost certainly not what was intended. The author likely wanted all Delivered or Returned orders with amount above 1,000. The correct query uses parentheses: WHERE (status = 'Delivered' OR status = 'Returned') AND amount &gt; 1000. The parentheses force the OR to be evaluated first, grouping the two status values, and then AND applies the amount threshold to the combined group.</p>
        <p style={{ margin: 0 }}>This type of bug is particularly insidious because the query runs without error and returns results — just wrong results. The only way to catch it is to understand precedence rules and verify results against expected counts. Always run a SELECT COUNT(*) to verify the row count makes sense before using the results for any decision. If Delivered orders are 18 of your 30 orders, a query returning 22 rows for "delivered or returned above 1000" should immediately prompt a precedence check.</p>
      </IQ>

      <IQ q="How would you write a WHERE clause to find customers who are NOT from the top three cities?">
        <p style={{ margin: '0 0 14px' }}>There are several correct approaches with different trade-offs. The most readable approach uses NOT with an OR group: WHERE NOT (city = 'Bangalore' OR city = 'Hyderabad' OR city = 'Mumbai'). This is evaluated as: exclude rows where city is any of the three. By De Morgan's law, this is equivalent to: WHERE city &lt;&gt; 'Bangalore' AND city &lt;&gt; 'Hyderabad' AND city &lt;&gt; 'Mumbai'.</p>
        <p style={{ margin: '0 0 14px' }}>A more concise and equally readable approach uses NOT IN: WHERE city NOT IN ('Bangalore', 'Hyderabad', 'Mumbai'). This is cleaner for more than two or three values. Both approaches are semantically identical and produce the same results.</p>
        <p style={{ margin: 0 }}>The critical caveat: if the city column can contain NULL values, neither NOT with OR nor NOT IN will include rows where city is NULL — they will silently exclude them. If you want to include customers with an unknown city alongside those from non-top-three cities, add an explicit NULL check: WHERE (city NOT IN ('Bangalore', 'Hyderabad', 'Mumbai') OR city IS NULL). In the FreshMart customers table, city is defined NOT NULL, so this is not an issue — but in any table where nullable city is possible, the NULL case must be handled explicitly.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="12" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="Query returns more rows than expected — WHERE city = 'Bangalore' OR city = 'Hyderabad' AND loyalty_tier = 'Gold'"
        cause="Operator precedence bug — AND evaluates before OR. The query is actually evaluated as: WHERE city = 'Bangalore' OR (city = 'Hyderabad' AND loyalty_tier = 'Gold'). This returns ALL Bangalore customers regardless of tier, plus only Gold customers from Hyderabad. If the intention was Gold customers from both cities, the result includes non-Gold Bangalore customers which should not be there."
        fix="Always use parentheses when combining AND and OR: WHERE (city = 'Bangalore' OR city = 'Hyderabad') AND loyalty_tier = 'Gold'. To debug, run SELECT COUNT(*) with each version and compare to expected counts. If your table has 8 Bangalore customers and 4 Hyderabad-Gold customers, the buggy query returns 12. The fixed query returns only the Bangalore-Gold plus Hyderabad-Gold count."
      />

      <Err
        msg="ERROR: syntax error at or near 'AND' — WHERE AND city = 'Bangalore'"
        cause="AND and OR must connect two complete conditions — they cannot appear at the start of a WHERE clause with nothing before them, and they cannot appear between a condition and nothing. This error happens when a condition is accidentally deleted leaving only the AND/OR connector, or when copying and pasting conditions in the wrong order."
        fix="Ensure AND and OR always connect exactly two complete conditions. Each side of AND/OR must be a valid condition: column operator value, or a parenthesised group of conditions. Check that you have not accidentally deleted the first condition in the pair. In editors that highlight syntax, AND/OR at the start of a clause (with nothing before it) is visually obvious as a red highlight."
      />

      <Err
        msg="WHERE NOT in ('Cancelled', 'Returned') returns zero rows"
        cause="NOT IN returns zero rows when the list contains even one NULL value. If order_status can be NULL and any row has a NULL status, NOT IN internally evaluates to: status <> 'Cancelled' AND status <> 'Returned' AND status <> NULL. Since any comparison with NULL returns NULL (not TRUE), the entire condition becomes NULL for every row — and the WHERE clause discards all NULL results. Even if your list has no explicit NULLs, if the column itself has NULL values, NOT IN behaves unexpectedly."
        fix="Use NOT EXISTS or an explicit exclusion with IS NOT NULL: WHERE order_status IS NOT NULL AND order_status NOT IN ('Cancelled', 'Returned'). Or rewrite using NOT and OR: WHERE NOT (order_status = 'Cancelled' OR order_status = 'Returned') AND order_status IS NOT NULL. In production, always check whether the column can contain NULLs before using NOT IN — SELECT COUNT(*) FROM orders WHERE order_status IS NULL; if this returns any rows, NOT IN is dangerous."
      />

      <Err
        msg="Query is correct but very slow — WHERE LOWER(city) = 'bangalore' OR LOWER(city) = 'hyderabad'"
        cause="Applying a function to the column side of OR conditions (LOWER(city)) prevents the database from using an index on the city column. The index stores raw city values ('Bangalore', 'Hyderabad') — not their lowercase equivalents. When LOWER() is applied, the database cannot use the index and must scan every row, applying LOWER() to each one. On a table with millions of rows, this causes a full table scan that is orders of magnitude slower than an index lookup."
        fix="Two approaches. First, standardise data at insertion time — store all city values in consistent case ('Bangalore' not 'bangalore') and use case-sensitive comparison: WHERE city = 'Bangalore' OR city = 'Hyderabad'. This allows index usage. Second, if consistent casing cannot be guaranteed, create a functional index on LOWER(city): CREATE INDEX idx_customers_city_lower ON customers (LOWER(city)); — then WHERE LOWER(city) = 'bangalore' OR LOWER(city) = 'hyderabad' can use this index. For performance-critical queries, always check whether index usage is possible with EXPLAIN ANALYZE (covered in Module 57)."
      />

      <Err
        msg="Unexpected results — NOT city = 'Bangalore' excludes NULL city rows"
        cause="NOT condition propagates NULL. Rows where city IS NULL evaluate NOT NULL = NULL (not FALSE, and not TRUE) — and the WHERE clause discards NULL results. If you intended WHERE NOT city = 'Bangalore' to mean 'all customers not specifically in Bangalore — including those with no city recorded,' the query silently excludes the NULL-city rows without any error or warning."
        fix="Explicitly include NULL rows: WHERE city <> 'Bangalore' OR city IS NULL. The OR city IS NULL clause captures rows that were being silently excluded. This pattern — adding OR column IS NULL — is the standard fix whenever you need a NOT condition to include rows with null values. Run SELECT COUNT(*) FROM customers WHERE city IS NULL before and after to confirm whether NULL rows are present and whether your fix captures them."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="The FreshMart finance team needs two separate reports. Report 1: All orders from store ST001 OR ST008 that were delivered AND paid by either Card or NetBanking — sorted by total_amount descending. Report 2: All orders that are NOT delivered (any other status) AND have a total_amount above ₹400. Write both queries."
        hint="Report 1 needs parentheses for the store OR and the payment method OR, then AND for the status and connecting the groups. Report 2 uses order_status <> 'Delivered' (or NOT order_status = 'Delivered') AND total_amount > 400."
        answer={`-- Report 1: Specific stores, delivered, card/netbanking
SELECT order_id, store_id, order_date,
       payment_method, total_amount
FROM orders
WHERE (store_id = 'ST001' OR store_id = 'ST008')
  AND order_status = 'Delivered'
  AND (payment_method = 'Card' OR payment_method = 'NetBanking')
ORDER BY total_amount DESC;

-- Report 2: Non-delivered orders above ₹400
SELECT order_id, store_id, order_date,
       order_status, total_amount
FROM orders
WHERE order_status <> 'Delivered'
  AND total_amount > 400
ORDER BY total_amount DESC;`}
        explanation="Report 1 uses parentheses around the OR groups to ensure the correct precedence — without them, AND would bind to one of the OR conditions and produce wrong results. The pattern (A OR B) AND C AND (D OR E) is one of the most common real-world WHERE patterns. Report 2 uses <> to exclude delivered orders — equivalent to NOT order_status = 'Delivered'. Both queries show how AND narrows results within groups defined by OR."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'AND returns TRUE only when both conditions are true — it narrows results. Every AND makes the filter more restrictive.',
          'OR returns TRUE when at least one condition is true — it broadens results. Every OR makes the filter more permissive.',
          'NOT reverses a condition: TRUE becomes FALSE, FALSE becomes TRUE. NOT NULL is still NULL — rows with null values are silently excluded by NOT conditions.',
          'Operator precedence: NOT first, AND second, OR last. SQL evaluates AND before OR in the same WHERE clause regardless of left-to-right reading order.',
          'Always use parentheses when mixing AND and OR — even when precedence would give the correct result. Explicit parentheses prevent bugs and make intent clear.',
          'The classic precedence bug: WHERE tier = \'Gold\' OR tier = \'Platinum\' AND city = \'Bangalore\' is not "Gold or Platinum customers from Bangalore." AND binds first, making it: Gold (any city) OR (Platinum AND Bangalore). Fix: (tier = \'Gold\' OR tier = \'Platinum\') AND city = \'Bangalore\'.',
          'NOT IN returns zero rows if the list or the column contains any NULL values — because any comparison with NULL returns NULL, not FALSE. Use NOT EXISTS or add IS NOT NULL explicitly when NULL rows are possible.',
          'Applying functions to the column side of conditions (LOWER(city) = \'bangalore\') prevents index usage — a full table scan results. Standardise data on insert and use direct comparison instead.',
          'When a NOT condition must include NULL rows, explicitly add OR column IS NULL: WHERE (city <> \'Bangalore\' OR city IS NULL).',
          'Format multi-condition WHERE clauses with one condition per line, AND/OR at the start of each line. This makes commenting out individual conditions easy during debugging.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 08</strong>, you control the order your results come back in using ORDER BY — ascending, descending, multiple columns, and how sorting interacts with NULL values.
        </p>
        <Link href="/learn/sql/order-by" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 08 → Sorting Results — ORDER BY
        </Link>
      </div>

    </LearnLayout>
  );
}