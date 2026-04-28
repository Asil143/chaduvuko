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

export default function SelfJoin() {
  return (
    <LearnLayout
      title="SELF JOIN"
      description="Join a table to itself — manager-employee hierarchies, comparing rows within the same table, finding duplicates, and every pattern where two rows of the same table need to be compared"
      section="SQL — Module 34"
      readTime="12–16 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What a SELF JOIN Is and Why You Need It" />

      <P>Every JOIN you have written so far combines two <Hl>different</Hl> tables. A SELF JOIN joins a table <Hl>to itself</Hl> — the same table appears twice in the FROM clause under two different aliases. The database treats each alias as an independent copy of the table, allowing rows within the same table to be compared or related to each other.</P>

      <P>This sounds unusual but it solves a class of problems that no other SQL construct handles cleanly:</P>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '20px 0 32px' }}>
        {[
          { icon: '👤', title: 'Hierarchical relationships', desc: 'An employee\'s manager is also an employee in the same table. The only way to retrieve both the employee\'s data and their manager\'s data in one row is to join employees to itself.' },
          { icon: '🔍', title: 'Row-to-row comparison', desc: 'Finding orders placed by the same customer on the same day, products in the same price range, or employees hired on the same date — all require comparing rows within the same table.' },
          { icon: '🔄', title: 'Duplicate detection', desc: 'Finding rows that share the same values across multiple columns requires joining the table to itself and comparing each pair.' },
          { icon: '📊', title: 'Sequential analysis', desc: 'Comparing each row to the previous or next row — price changes, order sequences, event timelines — uses SELF JOIN with an inequality condition.' },
        ].map(item => (
          <div key={item.title} style={{ display: 'flex', gap: 14, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Syntax — Aliases Make SELF JOIN Possible" />

      <P>A SELF JOIN requires two aliases for the same table. Without aliases, the database cannot distinguish which copy of the table each column reference belongs to. The aliases are what make the table appear as two independent sources.</P>

      <CodeBlock
        label="SELF JOIN syntax — aliases are mandatory"
        code={`-- Self join: same table, two aliases
SELECT
  a.column1  AS col_from_left_copy,
  b.column2  AS col_from_right_copy
FROM table_name AS a
JOIN table_name AS b ON a.key = b.other_key;

-- The database sees this as joining two independent tables
-- 'a' is one copy, 'b' is another copy
-- Any JOIN type works: INNER, LEFT, RIGHT, FULL OUTER

-- Mandatory: descriptive alias names
-- BAD:  employees AS e1, employees AS e2  (not descriptive)
-- GOOD: employees AS emp, employees AS mgr  (tells you the role of each copy)`}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Manager-Employee Hierarchy — The Classic SELF JOIN" />

      <P>The most common SELF JOIN use case is an organisational hierarchy stored in a single table. The employees table has a manager_id column that references the employee_id of another employee in the same table. To get both the employee's details and their manager's name in one row, you join employees to itself.</P>

      <H>Basic manager lookup</H>

      <SQLPlayground
        initialQuery={`-- Each employee with their manager's name
-- emp = the employee row
-- mgr = the manager row (same table, different alias)
SELECT
  emp.employee_id,
  emp.first_name || ' ' || emp.last_name    AS employee,
  emp.role,
  emp.salary,
  mgr.first_name || ' ' || mgr.last_name   AS manager_name,
  mgr.role                                  AS manager_role
FROM employees AS emp
JOIN employees AS mgr ON emp.manager_id = mgr.employee_id
ORDER BY emp.salary DESC;`}
        height={205}
        showSchema={true}
      />

      <H>Including employees with no manager — LEFT SELF JOIN</H>
      <P>INNER SELF JOIN excludes employees with no manager (manager_id IS NULL — top-level employees). Use LEFT JOIN to include them with NULL in the manager columns.</P>

      <SQLPlayground
        initialQuery={`-- All employees including top-level (no manager)
-- TOP-LEVEL employees: manager columns will be NULL
SELECT
  emp.employee_id,
  emp.first_name || ' ' || emp.last_name    AS employee,
  emp.role,
  emp.salary,
  emp.store_id,
  COALESCE(
    mgr.first_name || ' ' || mgr.last_name,
    'No manager (top level)'
  )                                         AS manager_name
FROM employees AS emp
LEFT JOIN employees AS mgr ON emp.manager_id = mgr.employee_id
ORDER BY mgr.employee_id NULLS FIRST, emp.salary DESC;`}
        height={215}
        showSchema={false}
      />

      <H>Three-level hierarchy — employee, manager, and manager's manager</H>

      <SQLPlayground
        initialQuery={`-- Three-level hierarchy in one query
-- Chain: emp → direct_manager → senior_manager
SELECT
  emp.first_name || ' ' || emp.last_name         AS employee,
  emp.role                                        AS employee_role,
  mgr.first_name || ' ' || mgr.last_name         AS direct_manager,
  mgr.role                                        AS manager_role,
  senior.first_name || ' ' || senior.last_name   AS senior_manager,
  senior.role                                     AS senior_role
FROM employees AS emp
LEFT JOIN employees AS mgr    ON emp.manager_id = mgr.employee_id
LEFT JOIN employees AS senior ON mgr.manager_id = senior.employee_id
ORDER BY senior.employee_id NULLS LAST,
         mgr.employee_id    NULLS LAST,
         emp.salary DESC;`}
        height={230}
        showSchema={false}
      />

      <Callout type="info">
        The three-level hierarchy query with explicit JOINs works well for shallow trees (2-3 levels). For trees of arbitrary depth — organisational charts, file systems, category hierarchies — you need recursive CTEs (covered in Module 48). Self JOIN handles a fixed known depth; recursive CTE handles unlimited depth.
      </Callout>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Finding Direct Reports — Who Manages Whom" />

      <SQLPlayground
        initialQuery={`-- For each manager: list their direct reports
SELECT
  mgr.employee_id                             AS manager_id,
  mgr.first_name || ' ' || mgr.last_name      AS manager_name,
  mgr.role                                    AS manager_role,
  COUNT(emp.employee_id)                      AS direct_reports,
  GROUP_CONCAT(
    emp.first_name || ' ' || emp.last_name,
    ', '
  )                                           AS report_names
FROM employees AS mgr
JOIN employees AS emp ON emp.manager_id = mgr.employee_id
GROUP BY mgr.employee_id, mgr.first_name, mgr.last_name, mgr.role
ORDER BY direct_reports DESC;`}
        height={230}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Managers whose direct reports earn more than them on average
SELECT
  mgr.employee_id,
  mgr.first_name || ' ' || mgr.last_name    AS manager,
  mgr.salary                                AS manager_salary,
  ROUND(AVG(emp.salary), 0)                 AS avg_report_salary,
  COUNT(emp.employee_id)                    AS report_count
FROM employees AS mgr
JOIN employees AS emp ON emp.manager_id = mgr.employee_id
GROUP BY mgr.employee_id, mgr.first_name, mgr.last_name, mgr.salary
HAVING AVG(emp.salary) > mgr.salary
ORDER BY avg_report_salary DESC;`}
        height={215}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Row-to-Row Comparison — Comparing Rows Within the Same Table" />

      <P>SELF JOIN with an inequality condition pairs each row with every other row that satisfies a condition — enabling comparisons, difference calculations, and relationship detection between rows of the same table.</P>

      <H>Customers in the same city</H>

      <SQLPlayground
        initialQuery={`-- Pairs of customers in the same city
-- a.customer_id < b.customer_id prevents duplicate pairs (A,B) and (B,A)
SELECT
  a.customer_id                             AS customer_a_id,
  a.first_name || ' ' || a.last_name        AS customer_a,
  b.customer_id                             AS customer_b_id,
  b.first_name || ' ' || b.last_name        AS customer_b,
  a.city
FROM customers AS a
JOIN customers AS b
  ON a.city = b.city
  AND a.customer_id < b.customer_id   -- prevent duplicate pairs and self-match
ORDER BY a.city, a.customer_id;`}
        height={215}
        showSchema={true}
      />

      <H>Products in the same price range</H>

      <SQLPlayground
        initialQuery={`-- Pairs of products in the same category with similar prices
-- (within ₹20 of each other)
SELECT
  a.product_name                            AS product_a,
  b.product_name                            AS product_b,
  a.category,
  a.unit_price                              AS price_a,
  b.unit_price                              AS price_b,
  ABS(a.unit_price - b.unit_price)          AS price_difference
FROM products AS a
JOIN products AS b
  ON a.category = b.category
  AND a.product_id < b.product_id          -- no duplicates or self-match
  AND ABS(a.unit_price - b.unit_price) <= 20
ORDER BY a.category, price_difference;`}
        height={220}
        showSchema={false}
      />

      <H>Orders placed by the same customer on the same day</H>

      <SQLPlayground
        initialQuery={`-- Customers who placed multiple orders on the same day
-- (potential duplicate order alert)
SELECT
  a.customer_id,
  a.order_id                                AS order_a,
  b.order_id                                AS order_b,
  a.order_date,
  a.total_amount                            AS amount_a,
  b.total_amount                            AS amount_b,
  a.payment_method                          AS method_a,
  b.payment_method                          AS method_b
FROM orders AS a
JOIN orders AS b
  ON a.customer_id = b.customer_id
  AND a.order_date = b.order_date
  AND a.order_id < b.order_id              -- prevent duplicates
ORDER BY a.customer_id, a.order_date;`}
        height={225}
        showSchema={false}
      />

      <H>The pair-deduplication rule</H>
      <P>When comparing all pairs within a table, always add a.id <Hl>&lt;</Hl> b.id to the ON condition. Without this, every pair (A, B) also appears as (B, A) — doubling the result. It also prevents rows from matching themselves (A, A). The less-than condition keeps only the canonical ordering of each pair.</P>

      <CodeBlock
        label="Pair deduplication — why a.id < b.id is essential"
        code={`-- WITHOUT deduplication:
-- Customer 1 and Customer 2 in Seattle appear as:
-- (1, 2, Seattle) ← pair
-- (2, 1, Seattle) ← duplicate of the same pair
-- (1, 1, Seattle) ← self-match (same customer!)
-- Total: 3 rows for 1 unique pair

-- WITH a.customer_id < b.customer_id:
-- Only (1, 2, Seattle) survives — unique, no self-match
-- Total: 1 row for 1 unique pair

-- Use < for unordered pairs (A,B same as B,A)
-- Use <> to exclude self-matches but keep both directions`}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Duplicate Detection Using SELF JOIN" />

      <P>SELF JOIN is a classic approach for finding duplicate records — rows that share the same values in key columns but have different primary keys. It is useful after bulk imports or when investigating data quality issues.</P>

      <SQLPlayground
        initialQuery={`-- Find customers with the same email address
-- (should not exist with UNIQUE constraint, but useful post-migration check)
SELECT
  a.customer_id                             AS id_a,
  b.customer_id                             AS id_b,
  a.first_name || ' ' || a.last_name        AS name_a,
  b.first_name || ' ' || b.last_name        AS name_b,
  a.email,
  a.joined_date                             AS joined_a,
  b.joined_date                             AS joined_b
FROM customers AS a
JOIN customers AS b
  ON a.email = b.email
  AND a.customer_id < b.customer_id         -- one pair per duplicate set
ORDER BY a.email;`}
        height={215}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Find employees with identical salary AND same role
-- Could indicate cloned records from bulk import
SELECT
  a.employee_id                             AS emp_a,
  b.employee_id                             AS emp_b,
  a.first_name || ' ' || a.last_name        AS name_a,
  b.first_name || ' ' || b.last_name        AS name_b,
  a.role,
  a.salary,
  a.hire_date                               AS hired_a,
  b.hire_date                               AS hired_b
FROM employees AS a
JOIN employees AS b
  ON a.role   = b.role
  AND a.salary = b.salary
  AND a.employee_id < b.employee_id
ORDER BY a.role, a.salary;`}
        height={225}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Sequential Comparison — Each Row vs the Previous" />

      <P>SELF JOIN with inequality conditions on an ordered column (like a date or ID) pairs each row with adjacent rows — allowing you to compute differences, detect sequences, and identify consecutive events.</P>

      <H>Compare each order to the customer's previous order</H>

      <SQLPlayground
        initialQuery={`-- Each customer's order compared to their immediately previous order
-- Shows order-to-order growth/decline per customer
SELECT
  curr.customer_id,
  curr.order_id                             AS current_order,
  curr.order_date                           AS current_date,
  curr.total_amount                         AS current_amount,
  prev.order_id                             AS previous_order,
  prev.order_date                           AS previous_date,
  prev.total_amount                         AS previous_amount,
  ROUND(curr.total_amount - prev.total_amount, 2) AS amount_change
FROM orders AS curr
JOIN orders AS prev
  ON curr.customer_id = prev.customer_id
  AND prev.order_date = (
    -- The most recent previous order date for this customer
    SELECT MAX(o2.order_date)
    FROM orders AS o2
    WHERE o2.customer_id = curr.customer_id
      AND o2.order_date < curr.order_date
  )
WHERE curr.order_status = 'Delivered'
  AND prev.order_status = 'Delivered'
ORDER BY curr.customer_id, curr.order_date;`}
        height={265}
        showSchema={false}
      />

      <H>Finding the next higher-paid employee in the same role</H>

      <SQLPlayground
        initialQuery={`-- For each employee: find the next person in their role with a higher salary
SELECT
  emp.first_name || ' ' || emp.last_name    AS employee,
  emp.role,
  emp.salary,
  next_up.first_name || ' ' || next_up.last_name AS next_higher,
  next_up.salary                            AS next_salary,
  next_up.salary - emp.salary               AS salary_gap
FROM employees AS emp
JOIN employees AS next_up
  ON emp.role = next_up.role
  AND next_up.salary = (
    SELECT MIN(e2.salary)
    FROM employees AS e2
    WHERE e2.role = emp.role
      AND e2.salary > emp.salary
  )
ORDER BY emp.role, emp.salary;`}
        height={240}
        showSchema={false}
      />

      <ProTip>
        Sequential row comparison with SELF JOIN works but can be verbose — especially when finding "the immediately next row." Window functions (LAG and LEAD, Module 46) are the modern, cleaner solution for this pattern. SELF JOIN is worth knowing for databases that do not support window functions and for situations where the "next row" definition is complex enough that a subquery is clearer than a window expression.
      </ProTip>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Salary Comparison — SELF JOIN for Benchmarking" />

      <SQLPlayground
        initialQuery={`-- Employees earning more than the average salary in their department
-- Using SELF JOIN to compute department average
SELECT
  emp.employee_id,
  emp.first_name || ' ' || emp.last_name    AS employee,
  emp.role,
  emp.salary,
  dept_avg.avg_dept_salary,
  ROUND(emp.salary - dept_avg.avg_dept_salary, 0) AS above_avg_by
FROM employees AS emp
JOIN (
  SELECT
    department,
    ROUND(AVG(salary), 0)  AS avg_dept_salary
  FROM employees
  GROUP BY department
) AS dept_avg ON emp.department = dept_avg.department
WHERE emp.salary > dept_avg.avg_dept_salary
ORDER BY above_avg_by DESC;`}
        height={240}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Employees earning less than their manager
SELECT
  emp.first_name || ' ' || emp.last_name    AS employee,
  emp.role                                  AS emp_role,
  emp.salary                                AS emp_salary,
  mgr.first_name || ' ' || mgr.last_name   AS manager,
  mgr.salary                                AS mgr_salary,
  mgr.salary - emp.salary                   AS salary_gap
FROM employees AS emp
JOIN employees AS mgr ON emp.manager_id = mgr.employee_id
WHERE emp.salary < mgr.salary
ORDER BY salary_gap DESC;`}
        height={215}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="SELF JOIN for Network and Relationship Analysis" />

      <P>SELF JOIN enables relationship analysis — finding all pairs of entities that share a property, are connected, or should be grouped together. This is the SQL equivalent of a graph adjacency traversal at one hop.</P>

      <H>Customers who share the same loyalty tier and city</H>

      <SQLPlayground
        initialQuery={`-- Customer peer groups: same loyalty tier AND same city
-- Groups customers who could be targeted with identical campaigns
SELECT
  a.city,
  a.loyalty_tier,
  COUNT(*) OVER (PARTITION BY a.city, a.loyalty_tier) AS group_size,
  a.customer_id                             AS customer_a,
  a.first_name || ' ' || a.last_name        AS name_a,
  b.customer_id                             AS customer_b,
  b.first_name || ' ' || b.last_name        AS name_b
FROM customers AS a
JOIN customers AS b
  ON a.city = b.city
  AND a.loyalty_tier = b.loyalty_tier
  AND a.customer_id < b.customer_id
ORDER BY a.loyalty_tier, a.city, a.customer_id
LIMIT 15;`}
        height={235}
        showSchema={true}
      />

      <H>Products that always appear together in orders</H>

      <SQLPlayground
        initialQuery={`-- Product co-occurrence: which products are ordered together?
-- Join order_items to itself on order_id to find co-purchased pairs
SELECT
  p1.product_name                           AS product_a,
  p2.product_name                           AS product_b,
  COUNT(DISTINCT oi1.order_id)              AS orders_together
FROM order_items AS oi1
JOIN order_items AS oi2
  ON oi1.order_id = oi2.order_id
  AND oi1.product_id < oi2.product_id       -- no duplicates
JOIN products AS p1 ON oi1.product_id = p1.product_id
JOIN products AS p2 ON oi2.product_id = p2.product_id
GROUP BY p1.product_name, p2.product_name
HAVING COUNT(DISTINCT oi1.order_id) >= 2
ORDER BY orders_together DESC;`}
        height={240}
        showSchema={false}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="What This Looks Like at Work" />

      <P>You are a people analytics engineer at DoorDash. The HR team needs an org chart report for a performance review cycle. They need: each employee listed with their direct manager, the manager's manager, how many peers (colleagues with the same manager) each employee has, and whether they earn more or less than their manager. Everything from a single self-referencing employees table.</P>

      <TimeBlock time="2:00 PM" label="Requirements arrive">
        Org chart with four data points per employee: manager name, manager's manager name, peer count, and salary comparison vs manager.
      </TimeBlock>

      <TimeBlock time="2:20 PM" label="You break it into two parts">
        Part 1: three-alias self join for employee + manager + senior manager. Part 2: peer count subquery or aggregation. Combine with CTE.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Full org chart report: employee, manager, senior manager,
-- peer count, and salary comparison
WITH hierarchy AS (
  SELECT
    emp.employee_id,
    emp.first_name || ' ' || emp.last_name    AS employee_name,
    emp.role,
    emp.department,
    emp.salary                                AS emp_salary,
    mgr.employee_id                           AS manager_id,
    mgr.first_name || ' ' || mgr.last_name   AS manager_name,
    mgr.salary                                AS mgr_salary,
    senior.first_name || ' ' || senior.last_name AS senior_manager_name
  FROM employees AS emp
  LEFT JOIN employees AS mgr    ON emp.manager_id = mgr.employee_id
  LEFT JOIN employees AS senior ON mgr.manager_id = senior.employee_id
),
peer_counts AS (
  SELECT
    manager_id,
    COUNT(*) AS peer_count
  FROM employees
  WHERE manager_id IS NOT NULL
  GROUP BY manager_id
)
SELECT
  h.employee_name,
  h.role,
  h.department,
  h.emp_salary,
  COALESCE(h.manager_name, 'No manager')    AS manager,
  COALESCE(h.senior_manager_name, '—')      AS senior_manager,
  COALESCE(p.peer_count, 0)                 AS peers_same_manager,
  CASE
    WHEN h.mgr_salary IS NULL       THEN 'Top level'
    WHEN h.emp_salary > h.mgr_salary THEN 'Earns more than manager'
    WHEN h.emp_salary = h.mgr_salary THEN 'Same as manager'
    ELSE 'Earns less than manager'
  END                                       AS salary_vs_manager
FROM hierarchy AS h
LEFT JOIN peer_counts AS p ON h.manager_id = p.manager_id
ORDER BY h.department, h.mgr_salary DESC NULLS LAST, h.emp_salary DESC;`}
        height={340}
        showSchema={true}
      />

      <TimeBlock time="2:55 PM" label="Report delivered">
        One query — three self-join aliases, one peer-count CTE, one salary comparison CASE. The HR team gets a complete org chart view with all requested data points. The query runs in under 100ms on the employee table.
      </TimeBlock>

      <ProTip>
        When writing multi-level self joins (employee → manager → senior manager), always use LEFT JOIN not INNER JOIN between levels. INNER JOIN excludes employees whose manager has no manager — which would drop every second-level employee from a two-level tree. LEFT JOIN preserves all employees at every level, with NULL for levels that do not exist for that person.
      </ProTip>

      <HR />

      {/* ── PART 11 — Interview Prep ── */}
      <Part n="11" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is a SELF JOIN and when would you use it?">
        <p style={{ margin: '0 0 14px' }}>A SELF JOIN joins a table to itself — the same table appears twice in the FROM clause under two different aliases. The database treats each alias as an independent copy, allowing rows within the same table to be related to or compared with each other. Without aliases, the database cannot distinguish which "copy" of the table each column reference belongs to, so aliases are mandatory.</p>
        <p style={{ margin: '0 0 14px' }}>The most common use case is hierarchical data stored in a single table — organisational charts where an employees table has a manager_id that references another row in the same table. To retrieve an employee alongside their manager's name, you join employees AS emp to employees AS mgr on emp.manager_id = mgr.employee_id. Both references go to the same physical table, but the aliases create two logical copies.</p>
        <p style={{ margin: 0 }}>Other use cases: row-to-row comparison within the same table (finding customers in the same city by joining customers to itself on city = city and customer_id &lt; customer_id), duplicate detection (same email or same name), product co-occurrence analysis (which products appear together in orders by joining order_items to itself on order_id), and sequential row comparison (comparing each order to the previous order for the same customer). The pattern to reach for: whenever you need to compare two rows of the same table, or when a foreign key in a table references the same table's primary key, SELF JOIN is the tool.</p>
      </IQ>

      <IQ q="How do you prevent duplicate pairs when using SELF JOIN for comparison?">
        <p style={{ margin: '0 0 14px' }}>When joining a table to itself to compare all pairs of rows, each pair (A, B) would appear twice — once as (A, B) and once as (B, A) — plus each row would match itself (A, A). Adding a.primary_key &lt; b.primary_key to the ON condition eliminates both problems in one constraint.</p>
        <p style={{ margin: '0 0 14px' }}>The less-than condition works because it enforces that the left alias always has a smaller ID than the right alias. For any two rows 1 and 2: only (1, 2) survives — (2, 1) is excluded because 2 &lt; 1 is false. Self-matches (1, 1) are excluded because 1 &lt; 1 is false. The result contains each unique pair exactly once.</p>
        <p style={{ margin: 0 }}>Choose the condition based on what you need: use a.id &lt; b.id to get each unordered pair once — use this when (A,B) and (B,A) represent the same pair and you only need one row. Use a.id &lt;&gt; b.id to exclude self-matches but keep both directions — use this when order matters, such as "find all pairs where employee A earns more than employee B" (A earns more than B is different from B earns more than A). Use a.id &lt; b.id for symmetric relationships (same city, same salary, same category); use a.id &lt;&gt; b.id for directional relationships (earns more than, reports to).</p>
      </IQ>

      <IQ q="How do you write a query to find an employee and their manager's name from a self-referencing table?">
        <p style={{ margin: '0 0 14px' }}>Use a SELF JOIN on the employees table with two aliases — one for the employee row and one for the manager row. The join condition connects the employee's manager_id foreign key to the manager row's employee_id primary key: FROM employees AS emp JOIN employees AS mgr ON emp.manager_id = mgr.employee_id.</p>
        <p style={{ margin: '0 0 14px' }}>SELECT emp.employee_id, emp.first_name AS employee_name, emp.role, mgr.first_name AS manager_name, mgr.role AS manager_role FROM employees AS emp JOIN employees AS mgr ON emp.manager_id = mgr.employee_id ORDER BY emp.employee_id. This INNER JOIN returns only employees who have a manager — employees with NULL manager_id are excluded.</p>
        <p style={{ margin: 0 }}>To include employees with no manager (top-level executives), change INNER JOIN to LEFT JOIN: FROM employees AS emp LEFT JOIN employees AS mgr ON emp.manager_id = mgr.employee_id. Employees with no manager appear with NULL in all manager columns. Use COALESCE(mgr.first_name, 'No manager') to display a meaningful label. For a three-level hierarchy, add a third alias: LEFT JOIN employees AS senior ON mgr.manager_id = senior.employee_id. Each additional level adds one more alias and one more LEFT JOIN. For unlimited depth, use recursive CTEs (WITH RECURSIVE) instead of fixed-depth self joins.</p>
      </IQ>

      <IQ q="What is the difference between using a self join and a subquery for the manager lookup?">
        <p style={{ margin: '0 0 14px' }}>A self join retrieves manager data as additional columns in the same result row — you get employee columns and manager columns side by side. A correlated subquery in SELECT retrieves one value per employee row — useful for fetching a single manager attribute but not for fetching multiple manager attributes cleanly.</p>
        <p style={{ margin: '0 0 14px' }}>Self join for multiple attributes: SELECT emp.name, mgr.name AS manager, mgr.salary AS mgr_salary, mgr.role AS mgr_role FROM employees AS emp LEFT JOIN employees AS mgr ON emp.manager_id = mgr.employee_id. This fetches name, salary, and role from the manager row in one join. Clean and efficient — one table scan per alias.</p>
        <p style={{ margin: 0 }}>Subquery for a single attribute: SELECT emp.name, (SELECT mgr.name FROM employees AS mgr WHERE mgr.employee_id = emp.manager_id) AS manager_name FROM employees AS emp. This is a correlated subquery — it executes once per employee row, which is O(n) subquery executions. For fetching one attribute it is readable, but for fetching multiple manager attributes it requires multiple correlated subqueries (one per attribute), each executing O(n) times — significantly less efficient than a single self join. The self join is the preferred approach for any query that needs more than one column from the related row. Use a correlated subquery only when you need one specific value and the join would be complex or unintuitive.</p>
      </IQ>

      <IQ q="How would you find all pairs of customers who placed orders on the same day?">
        <p style={{ margin: '0 0 14px' }}>This requires comparing orders rows within the same table — specifically joining orders to itself on both customer conditions and date equality. The self join: FROM orders AS a JOIN orders AS b ON a.order_date = b.order_date AND a.customer_id &lt;&gt; b.customer_id AND a.order_id &lt; b.order_id.</p>
        <p style={{ margin: '0 0 14px' }}>The three ON conditions serve different purposes. a.order_date = b.order_date finds orders on the same day. a.customer_id &lt;&gt; b.customer_id ensures we are comparing different customers — not the same customer's two orders (though you might want those too if the question is about same-customer same-day). a.order_id &lt; b.order_id deduplicates pairs so (order 5, order 8) appears once, not as both (5,8) and (8,5).</p>
        <p style={{ margin: 0 }}>The full query: SELECT a.customer_id AS customer_a, b.customer_id AS customer_b, a.order_date, a.order_id AS order_a, b.order_id AS order_b, a.total_amount AS amount_a, b.total_amount AS amount_b FROM orders AS a JOIN orders AS b ON a.order_date = b.order_date AND a.customer_id &lt;&gt; b.customer_id AND a.order_id &lt; b.order_id ORDER BY a.order_date, customer_a. This can then be joined to the customers table using both customer_a and customer_b IDs to retrieve customer names. This pattern — cross-table pair detection through a junction table self join — also underlies product co-occurrence analysis (which products appear in the same order) by joining order_items to itself on order_id with product_id deduplication.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="12" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="SELF JOIN returns n² rows — every row matched with every other row"
        cause="The ON condition is missing or too broad. Without a selective join condition, every row in alias 'a' matches every row in alias 'b' — producing a Cartesian product. With 20 employees, this gives 400 rows (20×20) instead of the expected 20. Forgetting the primary key deduplication condition (a.id < b.id) when doing pair comparison also inflates results by 2x."
        fix="Add the correct join condition. For hierarchy: ON emp.manager_id = mgr.employee_id — this is highly selective (each employee has at most one manager). For pair comparison: ON a.shared_column = b.shared_column AND a.id < b.id — both the shared value and the deduplication condition are required. Run SELECT COUNT(*) first to detect unexpected row counts before fetching all results."
      />

      <Err
        msg="Column reference is ambiguous — both aliases have the same column name"
        cause="Without table alias prefixes, the database cannot determine which copy of the table a column belongs to. In a self join, both aliases share all the same column names. SELECT employee_id without a prefix is ambiguous between emp.employee_id and mgr.employee_id."
        fix="Prefix every column reference with its alias: emp.employee_id, mgr.employee_id. In a self join, every single column reference must be prefixed — there are no unambiguous columns because both sides have identical column names. Use descriptive aliases (emp/mgr not e1/e2) so the prefix communicates meaning: mgr.salary is immediately clear; e2.salary is not."
      />

      <Err
        msg="SELF JOIN for hierarchy excludes top-level employees — missing C-suite or senior managers"
        cause="INNER JOIN on the manager relationship excludes employees whose manager_id is NULL (employees with no manager). Top-level executives, founders, or any employee without a manager record are silently dropped from the result. This is a common mistake — the intent is to see all employees with their manager, but the result is only employees who have a manager."
        fix="Use LEFT JOIN instead of INNER JOIN: FROM employees AS emp LEFT JOIN employees AS mgr ON emp.manager_id = mgr.employee_id. All employees appear; manager columns are NULL for top-level employees. Wrap manager columns with COALESCE: COALESCE(mgr.first_name || ' ' || mgr.last_name, 'No manager') for clean display."
      />

      <Err
        msg="Three-level self join drops employees at certain hierarchy levels"
        cause="INNER JOIN between the manager and senior manager aliases excludes all employees whose manager has no manager. In a two-level organisation where most managers report to a top-level executive, INNER JOIN on the third level drops everyone whose manager is top-level (manager.manager_id IS NULL). The deeper the hierarchy chain with INNER JOINs, the more rows are dropped."
        fix="Use LEFT JOIN for every level beyond the first: LEFT JOIN employees AS mgr ON emp.manager_id = mgr.employee_id AND LEFT JOIN employees AS senior ON mgr.manager_id = senior.employee_id. INNER JOIN only the first level if the relationship is mandatory (every employee must have a manager). LEFT JOIN all subsequent levels so employees at the top of each sub-hierarchy are preserved with NULLs in the missing level columns."
      />

      <Err
        msg="Product co-occurrence self join on order_items is extremely slow"
        cause="The self join on order_items compares every (item, item) pair within the same order. With 100 orders each containing 5 items, there are 500 item rows. The self join on order_id produces 500×500 = 250,000 candidate pairs, filtered down to 1,000 unique pairs per order (5×4/2 = 10 pairs × 100 orders). On a real e-commerce table with millions of order items, this becomes billions of candidate pairs — too expensive."
        fix="Limit the scope with WHERE before the self join: restrict to a specific time window (order_date >= '2024-01-01'), a specific category, or a specific store. This reduces the order_items rows before the self join multiplies them. Also ensure order_id is indexed — the join ON oi1.order_id = oi2.order_id must use an index. For production co-occurrence analysis at scale, pre-aggregate pairs into a summary table using a batch job rather than computing them on the fly."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Write two queries using SELF JOIN: (1) A hierarchy query showing each employee's name, role, salary, their direct manager's name and salary, and a 'salary_relationship' column showing 'Higher than manager', 'Lower than manager', 'Same as manager', or 'No manager' as appropriate. Include all employees. Sort by department then salary descending. (2) A pair comparison query finding all pairs of products in the same category where both products are in stock and their price difference is less than ₹50. Show product_a name, product_b name, category, price_a, price_b, and price_difference. Sort by category and price_difference ascending."
        hint="Query 1: LEFT JOIN employees AS emp to employees AS mgr. CASE on salary comparison — check mgr IS NULL first. Query 2: JOIN products AS a to products AS b on category match AND both in_stock AND a.id < b.id AND ABS(price diff) < 50."
        answer={`-- Query 1: Employee hierarchy with salary comparison
SELECT
  emp.employee_id,
  emp.first_name || ' ' || emp.last_name    AS employee_name,
  emp.role,
  emp.department,
  emp.salary                                AS emp_salary,
  COALESCE(
    mgr.first_name || ' ' || mgr.last_name,
    'No manager'
  )                                         AS manager_name,
  mgr.salary                                AS mgr_salary,
  CASE
    WHEN mgr.employee_id IS NULL   THEN 'No manager'
    WHEN emp.salary > mgr.salary   THEN 'Higher than manager'
    WHEN emp.salary < mgr.salary   THEN 'Lower than manager'
    ELSE                                'Same as manager'
  END                                       AS salary_relationship
FROM employees AS emp
LEFT JOIN employees AS mgr ON emp.manager_id = mgr.employee_id
ORDER BY emp.department, emp.salary DESC;

-- Query 2: Product pairs with similar prices in same category
SELECT
  a.product_name                            AS product_a,
  b.product_name                            AS product_b,
  a.category,
  a.unit_price                              AS price_a,
  b.unit_price                              AS price_b,
  ROUND(ABS(a.unit_price - b.unit_price), 2) AS price_difference
FROM products AS a
JOIN products AS b
  ON a.category    = b.category
  AND a.in_stock   = true
  AND b.in_stock   = true
  AND a.product_id < b.product_id
  AND ABS(a.unit_price - b.unit_price) < 50
ORDER BY a.category, price_difference;`}
        explanation="Query 1 uses LEFT JOIN so all employees appear including those with no manager (top-level). The CASE checks mgr.employee_id IS NULL first — if NULL, no manager exists regardless of salary values. Salary comparisons come after. The mgr.salary column may be NULL for top-level employees — CASE handles this correctly because NULL comparisons evaluate to NULL (not TRUE), so they fall through to no matching WHEN and 'No manager' is caught by the first condition. Query 2 uses three ON conditions: category match for same-category pairs, a.product_id < b.product_id for deduplication (prevents (A,B) and (B,A) duplicates and self-matches), and ABS price difference under ₹50. The in_stock filters could go in WHERE (they are on the same table) — but putting them in ON is also correct for INNER JOIN and slightly more explicit about which rows participate. ROUND(ABS(...), 2) ensures clean decimal display of the difference."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'SELF JOIN joins a table to itself using two different aliases. The database treats each alias as an independent copy, enabling row-to-row comparisons within the same table.',
          'Aliases are mandatory in SELF JOIN — without them the database cannot distinguish which "copy" of the table each column reference belongs to. Use descriptive aliases (emp/mgr, not e1/e2).',
          'The classic use case: manager-employee hierarchy where manager_id is a FK to employee_id in the same table. JOIN employees AS emp to employees AS mgr on emp.manager_id = mgr.employee_id.',
          'Use LEFT JOIN not INNER JOIN for hierarchy queries — INNER JOIN silently excludes employees with no manager (NULL manager_id), dropping top-level employees from the result.',
          'For pair comparison: add a.id < b.id to the ON condition. This prevents duplicate pairs (A,B) and (B,A) and self-matches (A,A). Use <> instead of < when direction matters.',
          'Three-level hierarchy: chain three aliases with LEFT JOINs — emp → mgr → senior. Use LEFT JOIN at every level to preserve employees at the top of each sub-hierarchy.',
          'Product co-occurrence: JOIN order_items AS oi1 to order_items AS oi2 on order_id AND oi1.product_id < oi2.product_id. Then join each alias to products to get names. This finds which products are purchased together.',
          'SELF JOIN for sequential comparison (comparing each row to its predecessor) is verbose. Window functions LAG and LEAD (Module 46) are the cleaner modern solution for this pattern.',
          'Duplicate detection: JOIN table AS a to itself AS b on the columns that define a duplicate AND a.id < b.id. Rows that match on those columns are potential duplicates.',
          'For arbitrary-depth hierarchies (unknown number of levels), SELF JOIN with fixed aliases handles only known depth. Recursive CTEs (Module 48) handle unlimited depth.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 35</strong>, you learn CROSS JOIN — generating all combinations, calendar tables, test data grids, and the scenarios where the Cartesian product is intentional and powerful.
        </p>
        <Link href="/learn/sql/cross-join" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 35 → CROSS JOIN
        </Link>
      </div>

    </LearnLayout>
  );
}