import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SQL Cheat Sheet — All Syntax on One Page | Chaduvuko',
  description:
    'Complete SQL reference — SELECT, WHERE, JOINs, window functions, CTEs, and more. Bookmark this for interviews.',
};

const SQL_COLOR = '#06b6d4';

const Section = ({ title, color = SQL_COLOR, children }: { title: string; color?: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 36 }}>
    <div style={{
      fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
      textTransform: 'uppercase', color,
      fontFamily: 'var(--font-mono)',
      marginBottom: 12,
      paddingBottom: 8,
      borderBottom: `1px solid ${color}30`,
    }}>
      {title}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {children}
    </div>
  </div>
);

const Entry = ({ label, code, note }: { label: string; code: string; note?: string }) => (
  <div style={{
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    overflow: 'hidden',
  }}>
    <div style={{
      padding: '8px 12px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg2)',
    }}>
      <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 600 }}>{label}</span>
      {note && <span style={{ fontSize: 11, color: 'var(--muted)' }}>{note}</span>}
    </div>
    <pre style={{
      margin: 0,
      padding: '10px 12px',
      fontFamily: 'var(--font-mono, monospace)',
      fontSize: 12,
      lineHeight: 1.7,
      color: SQL_COLOR,
      overflowX: 'auto',
      whiteSpace: 'pre',
    }}>
      {code}
    </pre>
  </div>
);

export default function SQLCheatSheet() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <Link href="/learn/sql" style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none' }}>← Back to SQL Track</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20, marginBottom: 16 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: SQL_COLOR, fontFamily: 'var(--font-mono)' }}>
              Reference
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px,5vw,52px)',
            fontWeight: 900,
            letterSpacing: '-2px',
            margin: '0 0 12px',
          }}>
            SQL Cheat Sheet
          </h1>
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 500, margin: 0 }}>
            Every syntax pattern from all 62 modules, on one page. Bookmark this before your interview.
          </p>
        </div>

        {/* Two-column layout on wide screens */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 40 }}>

          {/* Column 1 */}
          <div>
            <Section title="Basic SELECT" color={SQL_COLOR}>
              <Entry label="Select all columns" code={`SELECT * FROM customers;`} />
              <Entry label="Select specific columns" code={`SELECT first_name, city\nFROM customers;`} />
              <Entry label="With alias" code={`SELECT first_name AS name,\n       unit_price AS price\nFROM products;`} />
              <Entry label="Distinct values" code={`SELECT DISTINCT city FROM customers;`} />
              <Entry label="Limit rows" code={`SELECT * FROM orders LIMIT 10;`} />
              <Entry label="Arithmetic" code={`SELECT product_name,\n       unit_price * 1.18 AS price_with_gst\nFROM products;`} />
            </Section>

            <Section title="Filtering — WHERE" color="#f97316">
              <Entry label="Basic filter" code={`SELECT * FROM orders\nWHERE order_status = 'Delivered';`} />
              <Entry label="AND / OR / NOT" code={`SELECT * FROM customers\nWHERE city = 'Bangalore'\n  AND loyalty_tier = 'Gold';`} />
              <Entry label="Comparison operators" code={`WHERE salary > 50000\nWHERE salary BETWEEN 40000 AND 70000\nWHERE joined_date >= '2023-01-01'`} />
              <Entry label="IN operator" code={`WHERE city IN ('Bangalore', 'Hyderabad', 'Mumbai')`} />
              <Entry label="LIKE / wildcards" code={`WHERE email LIKE '%@gmail.com'\nWHERE product_name LIKE 'Amul%'`} />
              <Entry label="NULL checks" code={`WHERE delivery_date IS NULL\nWHERE delivery_date IS NOT NULL`} />
            </Section>

            <Section title="Sorting & Grouping" color="#10b981">
              <Entry label="ORDER BY" code={`SELECT * FROM orders\nORDER BY total_amount DESC;\n\nORDER BY order_date ASC, total_amount DESC;`} />
              <Entry label="Aggregate functions" code={`SELECT COUNT(*) AS total_orders,\n       SUM(total_amount) AS revenue,\n       AVG(total_amount) AS avg_order,\n       MIN(total_amount) AS smallest,\n       MAX(total_amount) AS largest\nFROM orders;`} />
              <Entry label="GROUP BY" code={`SELECT city, COUNT(*) AS customer_count\nFROM customers\nGROUP BY city;`} />
              <Entry label="HAVING" code={`SELECT city, COUNT(*) AS count\nFROM customers\nGROUP BY city\nHAVING COUNT(*) > 2;`} note="Filters groups, not rows" />
              <Entry label="CASE WHEN" code={`SELECT product_name,\n  CASE\n    WHEN unit_price < 50  THEN 'Budget'\n    WHEN unit_price < 200 THEN 'Mid-range'\n    ELSE 'Premium'\n  END AS price_tier\nFROM products;`} />
            </Section>

            <Section title="CRUD Operations" color="#ef4444">
              <Entry label="CREATE TABLE" code={`CREATE TABLE categories (\n  category_id INTEGER PRIMARY KEY,\n  name        VARCHAR NOT NULL,\n  created_at  DATE DEFAULT CURRENT_DATE\n);`} />
              <Entry label="INSERT" code={`INSERT INTO categories (category_id, name)\nVALUES (1, 'Dairy'), (2, 'Staples');`} />
              <Entry label="UPDATE" code={`UPDATE products\nSET unit_price = 350\nWHERE product_id = 1;`} note="Always add WHERE!" />
              <Entry label="DELETE" code={`DELETE FROM orders\nWHERE order_status = 'Cancelled';`} note="Always add WHERE!" />
              <Entry label="ALTER TABLE" code={`ALTER TABLE customers\nADD COLUMN phone_verified BOOLEAN DEFAULT false;\n\nALTER TABLE customers\nDROP COLUMN phone_verified;`} />
              <Entry label="DROP / TRUNCATE" code={`DROP TABLE temp_data;          -- removes table\nTRUNCATE TABLE temp_data;      -- clears rows, keeps structure`} />
            </Section>
          </div>

          {/* Column 2 */}
          <div>
            <Section title="Joins" color="#8b5cf6">
              <Entry label="INNER JOIN" code={`SELECT c.first_name, o.order_date, o.total_amount\nFROM customers c\nINNER JOIN orders o ON c.customer_id = o.customer_id;`} note="Only matching rows" />
              <Entry label="LEFT JOIN" code={`SELECT c.first_name, o.order_id\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id;`} note="All customers, even without orders" />
              <Entry label="RIGHT JOIN" code={`SELECT c.first_name, o.order_id\nFROM customers c\nRIGHT JOIN orders o ON c.customer_id = o.customer_id;`} />
              <Entry label="FULL OUTER JOIN" code={`SELECT c.first_name, o.order_id\nFROM customers c\nFULL OUTER JOIN orders o ON c.customer_id = o.customer_id;`} />
              <Entry label="SELF JOIN" code={`SELECT e.first_name AS employee,\n       m.first_name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.employee_id;`} />
              <Entry label="Multi-table JOIN" code={`SELECT c.first_name, o.order_date, p.product_name\nFROM customers c\nJOIN orders o      ON c.customer_id = o.customer_id\nJOIN order_items i ON o.order_id = i.order_id\nJOIN products p    ON i.product_id = p.product_id;`} />
            </Section>

            <Section title="Subqueries & Set Ops" color="#ec4899">
              <Entry label="Subquery in WHERE" code={`SELECT * FROM products\nWHERE unit_price > (\n  SELECT AVG(unit_price) FROM products\n);`} />
              <Entry label="Subquery in FROM" code={`SELECT city, avg_spend\nFROM (\n  SELECT city, AVG(total_amount) AS avg_spend\n  FROM customers c\n  JOIN orders o ON c.customer_id = o.customer_id\n  GROUP BY city\n) AS city_stats\nWHERE avg_spend > 1000;`} />
              <Entry label="EXISTS" code={`SELECT first_name FROM customers c\nWHERE EXISTS (\n  SELECT 1 FROM orders o\n  WHERE o.customer_id = c.customer_id\n    AND o.total_amount > 2000\n);`} />
              <Entry label="UNION / UNION ALL" code={`SELECT city FROM customers\nUNION\nSELECT city FROM stores;`} note="UNION deduplicates; UNION ALL keeps all" />
              <Entry label="INTERSECT / EXCEPT" code={`SELECT city FROM customers\nINTERSECT\nSELECT city FROM stores;  -- cities with both`} />
            </Section>

            <Section title="Window Functions" color="#f59e0b">
              <Entry label="ROW_NUMBER" code={`SELECT first_name, city,\n  ROW_NUMBER() OVER (\n    PARTITION BY city ORDER BY joined_date\n  ) AS row_in_city\nFROM customers;`} />
              <Entry label="RANK / DENSE_RANK" code={`SELECT product_name, unit_price,\n  RANK() OVER (ORDER BY unit_price DESC) AS price_rank,\n  DENSE_RANK() OVER (ORDER BY unit_price DESC) AS dense_rank\nFROM products;`} />
              <Entry label="SUM OVER (running total)" code={`SELECT order_date, total_amount,\n  SUM(total_amount) OVER (\n    ORDER BY order_date\n  ) AS running_total\nFROM orders;`} />
              <Entry label="LAG / LEAD" code={`SELECT order_date, total_amount,\n  LAG(total_amount)  OVER (ORDER BY order_date) AS prev_order,\n  LEAD(total_amount) OVER (ORDER BY order_date) AS next_order\nFROM orders;`} />
            </Section>

            <Section title="CTEs & Advanced" color="#10b981">
              <Entry label="Basic CTE" code={`WITH bangalore_customers AS (\n  SELECT * FROM customers\n  WHERE city = 'Bangalore'\n)\nSELECT * FROM bangalore_customers\nWHERE loyalty_tier = 'Gold';`} />
              <Entry label="Multiple CTEs" code={`WITH\n  top_customers AS (\n    SELECT customer_id, SUM(total_amount) AS total\n    FROM orders\n    GROUP BY customer_id\n    HAVING SUM(total_amount) > 2000\n  ),\n  customer_details AS (\n    SELECT * FROM customers\n  )\nSELECT cd.first_name, tc.total\nFROM top_customers tc\nJOIN customer_details cd ON tc.customer_id = cd.customer_id;`} />
              <Entry label="Recursive CTE (hierarchy)" code={`WITH RECURSIVE emp_hierarchy AS (\n  -- Anchor: top-level managers\n  SELECT employee_id, first_name, manager_id, 1 AS level\n  FROM employees\n  WHERE manager_id IS NULL\n\n  UNION ALL\n\n  -- Recursive: each employee's reports\n  SELECT e.employee_id, e.first_name, e.manager_id, h.level + 1\n  FROM employees e\n  JOIN emp_hierarchy h ON e.manager_id = h.employee_id\n)\nSELECT * FROM emp_hierarchy ORDER BY level;`} />
            </Section>

            <Section title="Performance" color="#06b6d4">
              <Entry label="EXPLAIN" code={`EXPLAIN SELECT * FROM orders WHERE customer_id = 1;`} note="Shows query plan" />
              <Entry label="CREATE INDEX" code={`CREATE INDEX idx_orders_customer\nON orders (customer_id);\n\nCREATE INDEX idx_orders_date_status\nON orders (order_date, order_status);`} />
              <Entry label="Transaction" code={`BEGIN;\n  UPDATE products SET unit_price = 320 WHERE product_id = 1;\n  INSERT INTO orders VALUES (...);\nCOMMIT;  -- or ROLLBACK if something went wrong`} />
            </Section>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 48, padding: '20px 24px',
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Ready to go deeper?</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Start from Module 01 and learn every concept with real queries and the FreshMart database.</div>
          </div>
          <Link href="/learn/sql/what-is-a-database" style={{
            background: SQL_COLOR, color: '#000',
            padding: '10px 22px', borderRadius: 7,
            fontWeight: 700, fontSize: 13, textDecoration: 'none',
            display: 'inline-block', whiteSpace: 'nowrap',
          }}>
            Start Learning →
          </Link>
        </div>

      </div>
    </main>
  );
}