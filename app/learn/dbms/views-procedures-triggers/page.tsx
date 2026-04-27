import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Views, Stored Procedures & Triggers — Complete Guide | DBMS | Chaduvuko',
  description:
    'Complete guide to views, materialised views, stored procedures, functions, and triggers — creation, updatability rules, INSTEAD OF triggers, PL/pgSQL, security, performance, and every interview pattern with production examples.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)',
    fontWeight: 900, letterSpacing: '-1px',
    color: 'var(--text)', marginBottom: 18,
    fontFamily: 'Syne, sans-serif', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)',
    fontWeight: 700, letterSpacing: '-0.3px',
    color: 'var(--text)', marginBottom: 12,
  }}>{children}</h3>
)

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{
    fontSize: 15, fontWeight: 700,
    color: 'var(--text)', marginBottom: 10,
  }}>{children}</h4>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontSize: 15, color: 'var(--text)',
    lineHeight: 1.9, marginBottom: 20,
  }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 20 }}>
    {label && (
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        letterSpacing: '.1em', textTransform: 'uppercase',
        marginBottom: 6, fontFamily: 'var(--font-mono)',
      }}>{label}</div>
    )}
    <pre style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '18px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.9, color: 'var(--text2)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

export default function ViewsProceduresTriggers() {
  return (
    <LearnLayout
      title="Views, Stored Procedures & Triggers"
      description="The database's programmable layer — virtual tables that simplify complex queries, stored logic that runs inside the database engine, and event-driven code that fires automatically when data changes."
      section="DBMS"
      readTime="80–95 min"
      updatedAt="March 2026"
    >

      {/* ========================================
          PART 1 — VIEWS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 01 — Views" />
        <SectionTitle>Views — Virtual Tables That Simplify, Secure, and Stabilise</SectionTitle>

        <Para>
          A <strong style={{ color: 'var(--accent)' }}>view</strong> is a named query stored
          in the database catalog. It behaves like a table — you can SELECT from it,
          JOIN to it, and in some cases INSERT and UPDATE through it — but it stores no data
          of its own. Every time you query a view, the database executes the underlying
          query and returns the result as if it were a real table.
        </Para>

        <Para>
          Views serve three distinct purposes in production systems. As an abstraction layer,
          they hide complex multi-table joins behind a simple name — application code queries
          the view without needing to know the underlying schema. As a security mechanism,
          they expose only the rows and columns a user is permitted to see without
          changing the underlying tables. As a schema stability layer, they insulate
          application code from schema changes — rename a column in the base table,
          update the view definition, and all applications that use the view are unaffected.
        </Para>

        <SubTitle>Creating and Using Views</SubTitle>

        <CodeBox label="CREATE VIEW — syntax and every option">
{`-- BASIC VIEW: hide a complex join behind a simple name
CREATE VIEW order_summary AS
SELECT
    o.order_id,
    o.order_date,
    o.status,
    o.total_amount,
    c.name        AS customer_name,
    c.city        AS customer_city,
    r.name        AS restaurant_name,
    r.cuisine_type
FROM orders o
JOIN customers c   ON o.customer_id   = c.customer_id
JOIN restaurants r ON o.restaurant_id = r.restaurant_id;

-- Query the view exactly like a table:
SELECT customer_name, SUM(total_amount) AS total_spent
FROM order_summary
WHERE status = 'delivered'
GROUP BY customer_name
ORDER BY total_spent DESC;

-- The database internally rewrites this to:
-- SELECT c.name AS customer_name, SUM(o.total_amount) AS total_spent
-- FROM orders o JOIN customers c ON ... JOIN restaurants r ON ...
-- WHERE o.status = 'delivered'
-- GROUP BY c.name ORDER BY total_spent DESC;

-- SECURITY VIEW: expose only specific rows and columns
CREATE VIEW customer_own_orders AS
SELECT order_id, order_date, status, total_amount
FROM orders
WHERE customer_id = current_setting('app.current_customer_id')::INT;
-- Application sets: SET LOCAL app.current_customer_id = '42';
-- Each customer sees only their own orders through this view

-- COLUMN-MASKING VIEW: hide sensitive data
CREATE VIEW employee_public AS
SELECT employee_id, name, department, title, hire_date
FROM employees;
-- salary, bank_account, ssn_last4 columns are excluded
-- Grant SELECT on employee_public to reporting role — they never see salary

-- CREATE OR REPLACE: modify an existing view without dropping it
CREATE OR REPLACE VIEW order_summary AS
SELECT
    o.order_id,
    o.order_date,
    o.status,
    o.total_amount,
    o.delivery_fee,              -- added column
    c.name    AS customer_name,
    c.city    AS customer_city,
    r.name    AS restaurant_name,
    r.cuisine_type
FROM orders o
JOIN customers c   ON o.customer_id   = c.customer_id
JOIN restaurants r ON o.restaurant_id = r.restaurant_id;
-- Existing queries that use order_summary still work
-- New queries can additionally use delivery_fee

-- DROP a view:
DROP VIEW order_summary;
DROP VIEW IF EXISTS order_summary;               -- no error if it doesn't exist
DROP VIEW order_summary CASCADE;                 -- also drop dependent views
DROP VIEW order_summary RESTRICT;                -- fail if any dependent views exist`}
        </CodeBox>

        <SubTitle>How Views Are Executed — Query Rewriting</SubTitle>

        <Para>
          Views in PostgreSQL and most databases are implemented through
          <strong style={{ color: 'var(--accent)' }}> query rewriting</strong>.
          When a query references a view, the query rewriter substitutes the view's
          definition inline before the query reaches the optimiser. The optimiser then
          works with the fully expanded query — it can push predicates from the outer
          query into the view's definition, apply joins in the optimal order, and use
          indexes on the underlying tables. Views have essentially zero overhead compared
          to writing the equivalent query inline.
        </Para>

        <CodeBox label="View query rewriting — how the database expands views">
{`-- Your query:
SELECT customer_name, total_amount
FROM order_summary
WHERE customer_city = 'San Francisco'
  AND total_amount > 500;

-- AFTER QUERY REWRITING (what the optimiser actually sees):
SELECT c.name AS customer_name, o.total_amount
FROM orders o
JOIN customers c   ON o.customer_id   = c.customer_id
JOIN restaurants r ON o.restaurant_id = r.restaurant_id
WHERE c.city = 'San Francisco'          -- ← predicate pushed INTO the view's query
  AND o.total_amount > 500;          -- ← predicate pushed INTO the view's query

-- The optimiser can now:
-- 1. Use index on customers.city to filter San Francisco customers first
-- 2. Use index on orders.total_amount for the > 500 filter
-- 3. Choose optimal join order
-- Exactly the same plan as if you'd written the join yourself

-- VERIFY how PostgreSQL expands a view:
EXPLAIN SELECT * FROM order_summary WHERE customer_city = 'San Francisco';
-- The plan shows the underlying tables, not the view name
-- Confirms that query rewriting happened and predicates were pushed down`}
        </CodeBox>

        <SubTitle>Updatable Views — The Rules for DML Through Views</SubTitle>

        <Para>
          Under certain conditions, you can execute INSERT, UPDATE, and DELETE statements
          through a view — the database translates them into equivalent operations on
          the underlying base tables. However the conditions are strict and frequently
          misunderstood.
        </Para>

        <Para>
          A view is automatically updatable in PostgreSQL if it meets all of these conditions:
          it is defined on exactly one base table, it contains no DISTINCT, GROUP BY,
          HAVING, LIMIT, OFFSET, UNION, INTERSECT, or EXCEPT, no aggregate or window
          functions, no set-returning functions, and its FROM list contains exactly one
          table or updatable view with no subqueries.
        </Para>

        <CodeBox label="Updatable views — what works and what fails">
{`-- AUTOMATICALLY UPDATABLE VIEW (one table, no aggregates, no joins):
CREATE VIEW active_customers AS
SELECT customer_id, name, email, city
FROM customers
WHERE is_active = true;

-- These DML operations work automatically:
UPDATE active_customers SET city = 'San Francisco' WHERE customer_id = 42;
-- Translates to: UPDATE customers SET city = 'San Francisco' WHERE customer_id = 42

INSERT INTO active_customers (name, email, city)
VALUES ('New User', 'new@email.com', 'Boston');
-- Translates to: INSERT INTO customers (name, email, city) VALUES (...)
-- NOTE: is_active column not in view — inserted with its DEFAULT value

DELETE FROM active_customers WHERE customer_id = 42;
-- Translates to: DELETE FROM customers WHERE customer_id = 42

-- NON-UPDATABLE VIEW (join across multiple tables):
CREATE VIEW order_summary AS
SELECT o.order_id, c.name, o.total_amount
FROM orders o JOIN customers c ON o.customer_id = c.customer_id;

UPDATE order_summary SET name = 'New Name' WHERE order_id = 1;
-- ERROR: cannot update view "order_summary"
-- DETAIL: Views that do not select from a single table or view are not automatically updatable.

-- WITH CHECK OPTION: prevent updates that would make the row disappear from the view
CREATE VIEW high_value_orders AS
SELECT order_id, customer_id, total_amount
FROM orders
WHERE total_amount > 500
WITH CHECK OPTION;

UPDATE high_value_orders SET total_amount = 200 WHERE order_id = 1;
-- ERROR: new row violates check option for view "high_value_orders"
-- The update would change total_amount to 200 < 500 — the row would vanish from the view
-- WITH CHECK OPTION prevents this inconsistency

-- LOCAL vs CASCADED check option:
-- WITH LOCAL CHECK OPTION: check only this view's WHERE condition
-- WITH CASCADED CHECK OPTION: check this view AND all underlying views' conditions (default)`}
        </CodeBox>

        <SubTitle>INSTEAD OF Triggers — Making Non-Updatable Views Writable</SubTitle>

        <Para>
          For views that do not meet the automatic updatability rules (joins, aggregates,
          multiple tables), you can make them writable by defining
          <strong style={{ color: 'var(--accent)' }}> INSTEAD OF triggers</strong>.
          These triggers intercept the INSERT/UPDATE/DELETE on the view and execute
          custom PL/pgSQL code that updates the underlying base tables correctly.
        </Para>

        <CodeBox label="INSTEAD OF trigger — making a join view writable">
{`-- Non-updatable join view:
CREATE VIEW order_with_customer AS
SELECT
    o.order_id,
    o.total_amount,
    o.status,
    c.customer_id,
    c.name    AS customer_name,
    c.email   AS customer_email
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;

-- Define INSTEAD OF trigger for UPDATE:
CREATE OR REPLACE FUNCTION update_order_with_customer()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the orders table for order-specific columns
    IF NEW.total_amount IS DISTINCT FROM OLD.total_amount
    OR NEW.status       IS DISTINCT FROM OLD.status THEN
        UPDATE orders
        SET total_amount = NEW.total_amount,
            status       = NEW.status
        WHERE order_id = OLD.order_id;
    END IF;

    -- Update the customers table for customer-specific columns
    IF NEW.customer_name  IS DISTINCT FROM OLD.customer_name
    OR NEW.customer_email IS DISTINCT FROM OLD.customer_email THEN
        UPDATE customers
        SET name  = NEW.customer_name,
            email = NEW.customer_email
        WHERE customer_id = OLD.customer_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_order_with_customer
INSTEAD OF UPDATE ON order_with_customer
FOR EACH ROW EXECUTE FUNCTION update_order_with_customer();

-- Now this works:
UPDATE order_with_customer
SET status = 'delivered', customer_name = 'Rahul S.'
WHERE order_id = 1001;
-- Trigger fires: updates orders.status AND customers.name correctly`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 2 — MATERIALISED VIEWS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 02 — Materialised Views" />
        <SectionTitle>Materialised Views — Pre-Computed Query Results Stored on Disk</SectionTitle>

        <Para>
          A regular view re-executes its query every time it is accessed.
          For simple queries this is fine. For complex aggregations over millions of rows
          that run hundreds of times per day, it is wasteful — the same expensive
          computation runs over and over.
        </Para>

        <Para>
          A <strong style={{ color: 'var(--accent)' }}>materialised view</strong> stores
          the query result physically on disk like a real table. It is pre-computed once
          and then accessed directly — no query rewriting, no join execution, no aggregation
          at read time. The trade-off: the stored result may become stale as the underlying
          data changes. You must explicitly refresh it.
        </Para>

        <CodeBox label="Materialised views — creation, indexing, and refresh strategies">
{`-- CREATE MATERIALIZED VIEW:
CREATE MATERIALIZED VIEW restaurant_monthly_stats AS
SELECT
    r.restaurant_id,
    r.name                              AS restaurant_name,
    r.city,
    DATE_TRUNC('month', o.order_date)   AS month,
    COUNT(o.order_id)                   AS total_orders,
    SUM(o.total_amount)                 AS total_revenue,
    ROUND(AVG(o.total_amount), 2)       AS avg_order_value,
    COUNT(DISTINCT o.customer_id)       AS unique_customers
FROM restaurants r
JOIN orders o ON r.restaurant_id = o.restaurant_id
WHERE o.status = 'delivered'
GROUP BY r.restaurant_id, r.name, r.city, DATE_TRUNC('month', o.order_date);

-- QUERY the materialised view (fast — reads pre-computed data):
SELECT restaurant_name, city, total_revenue
FROM restaurant_monthly_stats
WHERE month = '2024-01-01'
ORDER BY total_revenue DESC
LIMIT 10;
-- Sub-millisecond: reads pre-computed rows, no joins executed

-- ADD INDEXES on the materialised view for even faster access:
CREATE INDEX idx_rmstats_month ON restaurant_monthly_stats(month);
CREATE INDEX idx_rmstats_city  ON restaurant_monthly_stats(city, month);
-- A materialised view is a real table — supports all index types

-- REFRESH: update the materialised view with current data
REFRESH MATERIALIZED VIEW restaurant_monthly_stats;
-- Blocks all reads during refresh (acquires ACCESS EXCLUSIVE lock)
-- Safe for less-busy periods

-- REFRESH CONCURRENTLY: refresh without blocking reads
REFRESH MATERIALIZED VIEW CONCURRENTLY restaurant_monthly_stats;
-- Requires: at least one UNIQUE index on the materialised view
CREATE UNIQUE INDEX idx_rmstats_unique
    ON restaurant_monthly_stats(restaurant_id, month);
-- Now concurrent refresh is possible:
REFRESH MATERIALIZED VIEW CONCURRENTLY restaurant_monthly_stats;
-- Builds new data in the background, swaps atomically — reads continue uninterrupted

-- SCHEDULE automatic refresh (using pg_cron extension):
SELECT cron.schedule(
    'refresh-restaurant-stats',    -- job name
    '0 2 * * *',                  -- cron expression: 2am every day
    'REFRESH MATERIALIZED VIEW CONCURRENTLY restaurant_monthly_stats'
);

-- CHECK when a materialised view was last refreshed:
SELECT schemaname, matviewname, ispopulated
FROM pg_matviews
WHERE matviewname = 'restaurant_monthly_stats';

-- DROP a materialised view:
DROP MATERIALIZED VIEW restaurant_monthly_stats;`}
        </CodeBox>

        <SubTitle>Regular View vs Materialised View — The Decision</SubTitle>

        <div style={{ overflowX: 'auto', marginBottom: 28 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Property', 'Regular View', 'Materialised View'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', color: 'var(--muted)', fontWeight: 700, fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Stores data on disk', '✗ No — query only', '✓ Yes — real table'],
                ['Query execution', 'Every access re-executes the query', 'Instant — reads stored rows'],
                ['Data freshness', 'Always current', 'Stale until refreshed'],
                ['Indexes supported', '✗ No', '✓ Yes — any index type'],
                ['Refresh required', '✗ Not needed', '✓ Manual or scheduled'],
                ['Best for', 'Simple queries, always-fresh data', 'Heavy aggregations, reporting, dashboards'],
                ['Write-through', 'Possible (with limitations)', '✗ Not supported — read-only'],
                ['Storage cost', 'None', 'Full copy of result set'],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{
                      padding: '12px 14px',
                      color: j === 0 ? 'var(--text)' : cell.includes('✓') ? 'var(--accent)' : cell.includes('✗') ? '#ff4757' : 'var(--text)',
                      fontWeight: j === 0 ? 600 : 400,
                      fontFamily: 'Inter, sans-serif', fontSize: 13,
                    }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================
          PART 3 — STORED PROCEDURES AND FUNCTIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 03 — Stored Procedures & Functions" />
        <SectionTitle>Stored Procedures and Functions — Logic That Lives Inside the Database</SectionTitle>

        <Para>
          A <strong style={{ color: 'var(--accent)' }}>stored procedure</strong> is a named,
          compiled block of SQL and procedural code stored in the database and executed
          by calling it by name. A <strong style={{ color: 'var(--accent)' }}>function</strong>
          is similar but always returns a value and can be used inside SQL expressions.
          Both live inside the database engine — closer to the data than application code,
          able to execute multiple SQL statements atomically, and callable from any
          application that connects to the database.
        </Para>

        <Para>
          The debate over stored procedures vs application logic has been ongoing for decades.
          Understanding the genuine trade-offs — not just picking a side — is what the
          interview question is really asking about.
        </Para>

        <SubTitle>PostgreSQL Functions in PL/pgSQL — Complete Reference</SubTitle>

        <CodeBox label="CREATE FUNCTION — every language feature">
{`-- BASIC FUNCTION: returns a scalar value
CREATE OR REPLACE FUNCTION get_customer_total_spent(p_customer_id INT)
RETURNS DECIMAL(12,2)
LANGUAGE plpgsql
AS $$
DECLARE
    v_total DECIMAL(12,2);  -- local variable
BEGIN
    SELECT SUM(total_amount)
    INTO v_total            -- assign query result to variable
    FROM orders
    WHERE customer_id = p_customer_id
      AND status = 'delivered';

    RETURN COALESCE(v_total, 0.00);  -- return 0 if no orders
END;
$$;

-- CALL THE FUNCTION:
SELECT get_customer_total_spent(42);
-- Returns: 1250.00

-- USE IN A QUERY:
SELECT customer_id, name, get_customer_total_spent(customer_id) AS lifetime_value
FROM customers
ORDER BY lifetime_value DESC;

-- ─────────────────────────────────────────────────────────────────
-- FUNCTION WITH MULTIPLE STATEMENTS AND CONTROL FLOW:
-- ─────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION assign_customer_tier(p_customer_id INT)
RETURNS VARCHAR(20)
LANGUAGE plpgsql
AS $$
DECLARE
    v_total_spent   DECIMAL(12,2);
    v_order_count   INT;
    v_tier          VARCHAR(20);
BEGIN
    -- Get customer statistics
    SELECT
        COALESCE(SUM(total_amount), 0),
        COUNT(*)
    INTO v_total_spent, v_order_count
    FROM orders
    WHERE customer_id = p_customer_id
      AND status = 'delivered';

    -- Determine tier using IF/ELSIF/ELSE
    IF v_total_spent >= 10000 THEN
        v_tier := 'Platinum';
    ELSIF v_total_spent >= 5000 THEN
        v_tier := 'Gold';
    ELSIF v_total_spent >= 1000 THEN
        v_tier := 'Silver';
    ELSIF v_order_count > 0 THEN
        v_tier := 'Bronze';
    ELSE
        v_tier := 'Inactive';
    END IF;

    -- Update the customer record
    UPDATE customers
    SET tier = v_tier, tier_updated_at = CURRENT_TIMESTAMP
    WHERE customer_id = p_customer_id;

    RETURN v_tier;
END;
$$;

-- ─────────────────────────────────────────────────────────────────
-- FUNCTION RETURNING A TABLE (set-returning function):
-- ─────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION get_top_customers(p_city VARCHAR, p_limit INT DEFAULT 10)
RETURNS TABLE(
    customer_id   INT,
    customer_name VARCHAR(100),
    total_spent   DECIMAL(12,2),
    order_count   BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.customer_id,
        c.name,
        SUM(o.total_amount)::DECIMAL(12,2),
        COUNT(o.order_id)
    FROM customers c
    LEFT JOIN orders o ON c.customer_id = o.customer_id
                      AND o.status = 'delivered'
    WHERE c.city = p_city
    GROUP BY c.customer_id, c.name
    ORDER BY SUM(o.total_amount) DESC NULLS LAST
    LIMIT p_limit;
END;
$$;

-- USE SET-RETURNING FUNCTION IN FROM CLAUSE:
SELECT * FROM get_top_customers('San Francisco', 5);
SELECT customer_name, total_spent
FROM get_top_customers('San Francisco')
WHERE total_spent > 500;`}
        </CodeBox>

        <SubTitle>Stored Procedures — Transactions and CALL Syntax</SubTitle>

        <Para>
          In PostgreSQL 11+, stored procedures (created with CREATE PROCEDURE) differ from
          functions in one important way: procedures can control their own transactions —
          they can COMMIT and ROLLBACK within the procedure body. Functions cannot
          commit or rollback; they always run within the caller's transaction.
        </Para>

        <CodeBox label="CREATE PROCEDURE — transaction control inside procedures">
{`-- STORED PROCEDURE: can COMMIT and ROLLBACK internally
CREATE OR REPLACE PROCEDURE process_order_batch(p_batch_size INT DEFAULT 100)
LANGUAGE plpgsql
AS $$
DECLARE
    v_order_id      INT;
    v_processed     INT := 0;
    v_failed        INT := 0;
    order_cursor    CURSOR FOR
        SELECT order_id FROM orders
        WHERE status = 'pending'
        ORDER BY order_date
        LIMIT p_batch_size;
BEGIN
    OPEN order_cursor;

    LOOP
        FETCH order_cursor INTO v_order_id;
        EXIT WHEN NOT FOUND;

        BEGIN
            -- Try to process this order
            UPDATE orders
            SET status = 'confirmed',
                confirmed_at = CURRENT_TIMESTAMP
            WHERE order_id = v_order_id;

            -- Decrement inventory for each item in this order
            UPDATE inventory i
            SET stock = i.stock - oi.quantity
            FROM order_items oi
            WHERE oi.order_id = v_order_id
              AND i.product_id = oi.item_id;

            -- Check for negative stock
            IF EXISTS (
                SELECT 1 FROM inventory WHERE stock < 0
            ) THEN
                RAISE EXCEPTION 'Inventory went negative for order %', v_order_id;
            END IF;

            v_processed := v_processed + 1;

            -- COMMIT each order individually (procedures can do this!)
            COMMIT;

        EXCEPTION WHEN OTHERS THEN
            -- Rollback just this order
            ROLLBACK;
            -- Log the failure
            INSERT INTO order_processing_errors(order_id, error_msg, failed_at)
            VALUES (v_order_id, SQLERRM, CURRENT_TIMESTAMP);
            v_failed := v_failed + 1;
        END;
    END LOOP;

    CLOSE order_cursor;

    RAISE NOTICE 'Processed: %, Failed: %', v_processed, v_failed;
END;
$$;

-- CALL a procedure (not SELECT — procedures don't return values):
CALL process_order_batch(50);
CALL process_order_batch();  -- uses default p_batch_size = 100

-- DIFFERENCE: FUNCTION vs PROCEDURE
-- Function: always within caller's transaction, returns a value, used in SELECT
-- Procedure: can manage own transactions, called with CALL, no return value`}
        </CodeBox>

        <SubTitle>Error Handling in PL/pgSQL — EXCEPTION Blocks</SubTitle>

        <CodeBox label="Exception handling — complete patterns">
{`-- EXCEPTION HANDLING in PL/pgSQL:
CREATE OR REPLACE FUNCTION safe_transfer(
    p_from_account INT,
    p_to_account   INT,
    p_amount       DECIMAL(12,2)
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
    -- Debit the sender
    UPDATE accounts
    SET balance = balance - p_amount
    WHERE account_id = p_from_account
      AND balance >= p_amount;  -- optimistic check

    -- Check if update actually happened
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Insufficient funds or account not found: %', p_from_account
            USING ERRCODE = 'P0001';  -- custom error code
    END IF;

    -- Credit the receiver
    UPDATE accounts
    SET balance = balance + p_amount
    WHERE account_id = p_to_account;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Destination account not found: %', p_to_account
            USING ERRCODE = 'P0002';
    END IF;

    RETURN true;

EXCEPTION
    WHEN SQLSTATE 'P0001' THEN
        -- Insufficient funds — log and return false
        INSERT INTO transfer_failures(from_acct, to_acct, amount, reason, failed_at)
        VALUES (p_from_account, p_to_account, p_amount, 'Insufficient funds', NOW());
        RETURN false;

    WHEN SQLSTATE 'P0002' THEN
        INSERT INTO transfer_failures(from_acct, to_acct, amount, reason, failed_at)
        VALUES (p_from_account, p_to_account, p_amount, 'Account not found', NOW());
        RETURN false;

    WHEN OTHERS THEN
        -- Unexpected error — re-raise to caller
        RAISE;
END;
$$;

-- COMMON EXCEPTION NAMES:
-- unique_violation    (SQLSTATE '23505'): duplicate key
-- foreign_key_violation (SQLSTATE '23503'): FK constraint
-- not_null_violation  (SQLSTATE '23502'): NULL in NOT NULL column
-- check_violation     (SQLSTATE '23514'): CHECK constraint
-- division_by_zero    (SQLSTATE '22012')
-- OTHERS: catches everything not matched above`}
        </CodeBox>

        <SubTitle>Stored Procedures — The Trade-off Debate</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 14 }}>Arguments For Stored Procedures</div>
            {[
              ['Performance', 'Pre-compiled — no repeated query planning. Network round-trips reduced. Data-intensive loops run inside the database without transferring data to application layer.'],
              ['Atomicity', 'Multi-step operations execute atomically within the database. No partial execution from application crashes between steps.'],
              ['Security', 'Users can be granted EXECUTE on a procedure without SELECT/UPDATE on the underlying tables. Fine-grained access control.'],
              ['Reuse', 'Called from any application, any language. Business logic is centralised — not duplicated across Python, Java, Node.js apps.'],
            ].map(([title, desc]) => (
              <div key={title as string} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>{title as string}</div>
                <Para>{desc as string}</Para>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: 10, padding: '20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#ff4757', marginBottom: 14 }}>Arguments Against Stored Procedures</div>
            {[
              ['Version control', 'Database code is harder to version control, test, and deploy than application code. Schema migrations become complex.'],
              ['Debugging', 'Debugging PL/pgSQL is much harder than debugging Python or Java — limited tooling, harder to unit test in isolation.'],
              ['Portability', 'PL/pgSQL is PostgreSQL-specific. Moving to MySQL or SQL Server requires rewriting all procedures.'],
              ['Scalability', 'Database is typically the hardest component to scale horizontally. Pushing logic into the DB concentrates computational load there.'],
            ].map(([title, desc]) => (
              <div key={title as string} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#ff4757', marginBottom: 4 }}>{title as string}</div>
                <Para>{desc as string}</Para>
              </div>
            ))}
          </div>
        </div>

        <Callout type="tip">
          <strong>The pragmatic production answer:</strong> Use stored procedures and functions
          for data-intensive operations where the logic genuinely belongs next to the data —
          complex aggregations, batch processing, integrity enforcement that SQL constraints
          cannot express. Use application code for business logic that involves external systems,
          requires sophisticated testing, or changes frequently with product requirements.
          Most production architectures use both.
        </Callout>
      </section>

      {/* ========================================
          PART 4 — TRIGGERS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 04 — Triggers" />
        <SectionTitle>Triggers — Code That Fires Automatically When Data Changes</SectionTitle>

        <Para>
          A <strong style={{ color: 'var(--accent)' }}>trigger</strong> is a stored function
          that the database automatically executes in response to a specific event on
          a specific table. Events include INSERT, UPDATE, DELETE, and TRUNCATE.
          Triggers enforce rules that cannot be expressed as simple constraints,
          maintain derived data, create audit logs, and replicate changes to other tables.
        </Para>

        <Para>
          Every trigger has three defining characteristics: the
          <strong style={{ color: 'var(--accent)' }}> event</strong> that fires it
          (INSERT/UPDATE/DELETE), the
          <strong style={{ color: 'var(--accent)' }}> timing</strong> relative to the event
          (BEFORE or AFTER), and the
          <strong style={{ color: 'var(--accent)' }}> granularity</strong>
          (FOR EACH ROW — once per modified row, or FOR EACH STATEMENT — once per SQL statement).
        </Para>

        <SubTitle>Trigger Timing — BEFORE vs AFTER</SubTitle>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid #0078d4', borderRadius: 10, padding: '18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0078d4', marginBottom: 10 }}>BEFORE Trigger</div>
            <Para>Fires before the operation executes. The trigger function can modify the NEW record (for INSERT/UPDATE) or return NULL to cancel the operation entirely. Used for: data validation, data transformation before storage, preventing invalid operations.</Para>
            <Para><strong style={{ color: 'var(--text)' }}>Can modify NEW:</strong> Yes — return NEW with modified values</Para>
            <Para><strong style={{ color: 'var(--text)' }}>Can cancel operation:</strong> Yes — return NULL</Para>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '3px solid var(--accent)', borderRadius: 10, padding: '18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 10 }}>AFTER Trigger</div>
            <Para>Fires after the operation has completed and the row has been modified. The change is already in the database (but not yet committed). Used for: audit logging, cascading updates to related tables, sending notifications, maintaining denormalised data.</Para>
            <Para><strong style={{ color: 'var(--text)' }}>Can modify NEW:</strong> No — the row is already written</Para>
            <Para><strong style={{ color: 'var(--text)' }}>Can cancel operation:</strong> No — but can raise exception to abort</Para>
          </div>
        </div>

        <SubTitle>Complete Trigger Examples — Every Common Use Case</SubTitle>

        <CodeBox label="BEFORE INSERT trigger — data normalisation and validation">
{`-- USE CASE: Automatically normalise data before storing
-- Trim whitespace from name, standardise email to lowercase, set default city

CREATE OR REPLACE FUNCTION normalise_customer_before_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Trim whitespace and normalise case
    NEW.name  := TRIM(INITCAP(NEW.name));   -- "  rahul sharma  " → "Rahul Sharma"
    NEW.email := LOWER(TRIM(NEW.email));    -- "  RAHUL@EMAIL.COM  " → "rahul@email.com"

    -- Set default city if not provided
    IF NEW.city IS NULL OR NEW.city = '' THEN
        NEW.city := 'Unknown';
    END IF;

    -- Validate phone format (must be 10 digits)
    IF NEW.phone IS NOT NULL AND NEW.phone !~ '^\d{10}$' THEN
        RAISE EXCEPTION 'Invalid phone format: %. Must be 10 digits.', NEW.phone
            USING ERRCODE = '22023';
    END IF;

    -- Set created_at if not provided
    NEW.created_at := COALESCE(NEW.created_at, CURRENT_TIMESTAMP);

    RETURN NEW;  -- Return modified NEW row — this is what gets stored
    -- If we returned NULL: the INSERT would be silently cancelled
END;
$$;

CREATE TRIGGER trg_normalise_customer
BEFORE INSERT ON customers
FOR EACH ROW
EXECUTE FUNCTION normalise_customer_before_insert();

-- TEST:
INSERT INTO customers (name, email, phone, city)
VALUES ('  rahul sharma  ', '  RAHUL@EMAIL.COM  ', '9876543210', NULL);
-- Stored as: ('Rahul Sharma', 'rahul@email.com', '9876543210', 'Unknown')`}
        </CodeBox>

        <CodeBox label="AFTER INSERT/UPDATE/DELETE trigger — audit log">
{`-- USE CASE: Complete audit trail — log every change to a sensitive table

-- Create audit table first:
CREATE TABLE orders_audit (
    audit_id       SERIAL        PRIMARY KEY,
    operation      CHAR(1)       NOT NULL CHECK (operation IN ('I', 'U', 'D')),
    -- I = Insert, U = Update, D = Delete
    order_id       INT,
    old_status     VARCHAR(20),
    new_status     VARCHAR(20),
    old_amount     DECIMAL(10,2),
    new_amount     DECIMAL(10,2),
    changed_by     TEXT,          -- database user
    changed_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    app_user_id    INT            -- application-level user (from session variable)
);

-- Trigger function:
CREATE OR REPLACE FUNCTION audit_orders()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    v_app_user_id INT;
BEGIN
    -- Get application user from session variable (set by app layer)
    BEGIN
        v_app_user_id := current_setting('app.current_user_id')::INT;
    EXCEPTION WHEN OTHERS THEN
        v_app_user_id := NULL;  -- gracefully handle if not set
    END;

    IF (TG_OP = 'INSERT') THEN
        INSERT INTO orders_audit(operation, order_id, new_status, new_amount, changed_by, app_user_id)
        VALUES ('I', NEW.order_id, NEW.status, NEW.total_amount, SESSION_USER, v_app_user_id);
        RETURN NEW;

    ELSIF (TG_OP = 'UPDATE') THEN
        -- Only log if something meaningful changed
        IF NEW.status IS DISTINCT FROM OLD.status
        OR NEW.total_amount IS DISTINCT FROM OLD.total_amount THEN
            INSERT INTO orders_audit(
                operation, order_id,
                old_status, new_status,
                old_amount, new_amount,
                changed_by, app_user_id
            )
            VALUES (
                'U', NEW.order_id,
                OLD.status, NEW.status,
                OLD.total_amount, NEW.total_amount,
                SESSION_USER, v_app_user_id
            );
        END IF;
        RETURN NEW;

    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO orders_audit(operation, order_id, old_status, old_amount, changed_by, app_user_id)
        VALUES ('D', OLD.order_id, OLD.status, OLD.total_amount, SESSION_USER, v_app_user_id);
        RETURN OLD;
    END IF;
END;
$$;

-- Create trigger for all three operations:
CREATE TRIGGER trg_audit_orders
AFTER INSERT OR UPDATE OR DELETE ON orders
FOR EACH ROW
EXECUTE FUNCTION audit_orders();

-- TG_OP: special variable containing 'INSERT', 'UPDATE', or 'DELETE'
-- NEW: the new row version (NULL for DELETE)
-- OLD: the old row version (NULL for INSERT)`}
        </CodeBox>

        <CodeBox label="AFTER UPDATE trigger — maintaining denormalised data">
{`-- USE CASE: When a restaurant's rating changes, update the denormalised
-- avg_rating column on the restaurants table after every review insert/update.

CREATE OR REPLACE FUNCTION update_restaurant_avg_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    v_restaurant_id INT;
    v_new_avg       DECIMAL(3,2);
BEGIN
    -- Determine which restaurant is affected
    -- TG_OP tells us the operation type
    IF TG_OP = 'DELETE' THEN
        v_restaurant_id := OLD.restaurant_id;
    ELSE
        v_restaurant_id := NEW.restaurant_id;
    END IF;

    -- Compute the new average from all current reviews
    SELECT ROUND(AVG(rating)::NUMERIC, 2)
    INTO v_new_avg
    FROM reviews
    WHERE restaurant_id = v_restaurant_id;

    -- Update the denormalised column
    UPDATE restaurants
    SET avg_rating = COALESCE(v_new_avg, 0),
        rating_count = (SELECT COUNT(*) FROM reviews WHERE restaurant_id = v_restaurant_id)
    WHERE restaurant_id = v_restaurant_id;

    RETURN NULL;  -- AFTER triggers on row level: return value is ignored but convention is NULL
END;
$$;

CREATE TRIGGER trg_update_restaurant_rating
AFTER INSERT OR UPDATE OF rating OR DELETE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_restaurant_avg_rating();
-- "UPDATE OF rating": only fires when the rating column is specifically updated
-- (not when comment is updated without changing rating)

-- TEST:
INSERT INTO reviews (customer_id, restaurant_id, order_id, rating)
VALUES (1, 5, 1001, 4);
-- Trigger fires automatically → restaurants.avg_rating for restaurant 5 is updated`}
        </CodeBox>

        <CodeBox label="BEFORE DELETE trigger — soft delete instead of hard delete">
{`-- USE CASE: Instead of permanently deleting records, mark them as deleted.
-- Any application DELETE statement on customers is intercepted and converted.

CREATE OR REPLACE FUNCTION soft_delete_customer()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Instead of deleting, mark as deleted
    UPDATE customers
    SET
        is_active  = false,
        deleted_at = CURRENT_TIMESTAMP,
        deleted_by = SESSION_USER
    WHERE customer_id = OLD.customer_id;

    RETURN NULL;  -- Returning NULL from BEFORE trigger CANCELS the DELETE
    -- The actual DELETE never happens — only our UPDATE was executed
END;
$$;

CREATE TRIGGER trg_soft_delete_customer
BEFORE DELETE ON customers
FOR EACH ROW
EXECUTE FUNCTION soft_delete_customer();

-- Application code: DELETE FROM customers WHERE customer_id = 42
-- What actually happens:
-- 1. BEFORE DELETE trigger fires
-- 2. UPDATE customers SET is_active=false, deleted_at=now() WHERE customer_id=42
-- 3. Trigger returns NULL → DELETE is cancelled
-- 4. Customer row remains but is marked inactive

-- Companion: views that always exclude deleted records
CREATE VIEW active_customers_view AS
SELECT * FROM customers WHERE is_active = true AND deleted_at IS NULL;`}
        </CodeBox>

        <SubTitle>FOR EACH STATEMENT vs FOR EACH ROW</SubTitle>

        <CodeBox label="Statement-level triggers — one execution per SQL statement">
{`-- FOR EACH ROW: fires once per affected row
-- FOR EACH STATEMENT: fires once per SQL statement regardless of rows affected

-- Statement-level trigger — log bulk operations:
CREATE OR REPLACE FUNCTION log_bulk_price_update()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO bulk_operation_log(operation, table_name, executed_by, executed_at)
    VALUES (TG_OP, TG_TABLE_NAME, SESSION_USER, CURRENT_TIMESTAMP);
    -- TG_TABLE_NAME: name of the table that fired the trigger
    -- Note: NEW and OLD are not available in statement-level triggers
    RETURN NULL;
END;
$$;

CREATE TRIGGER trg_log_menu_bulk_update
AFTER UPDATE ON menu_items
FOR EACH STATEMENT    -- fires ONCE even if 10,000 rows updated
EXECUTE FUNCTION log_bulk_price_update();

-- Comparison:
-- UPDATE menu_items SET price = price * 1.10 WHERE restaurant_id = 5;
-- Affects 47 rows.
-- FOR EACH ROW trigger: fires 47 times
-- FOR EACH STATEMENT trigger: fires 1 time

-- PERFORMANCE NOTE:
-- FOR EACH ROW: significant overhead for bulk operations (N trigger invocations)
-- FOR EACH STATEMENT: constant overhead regardless of rows affected
-- Use FOR EACH STATEMENT for audit-style logging of bulk operations
-- Use FOR EACH ROW when you need to access individual OLD/NEW values`}
        </CodeBox>

        <SubTitle>Trigger Pitfalls — What Goes Wrong in Production</SubTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[
            {
              pitfall: 'Recursive trigger loops',
              color: '#ff4757',
              desc: 'A trigger that fires on UPDATE on table T executes an UPDATE on table T inside its body. This fires the trigger again, which fires it again — infinite recursion until the stack overflows. Prevention: use a condition to break the loop (check if value already equals what you\'re setting), or use pg_trigger_depth() to detect recursion depth.',
              fix: 'IF pg_trigger_depth() > 1 THEN RETURN NEW; END IF; -- skip recursive calls',
            },
            {
              pitfall: 'Performance destruction on busy tables',
              color: '#f97316',
              desc: 'A BEFORE INSERT FOR EACH ROW trigger that runs a SELECT query executes that SELECT on every single INSERT. On a table receiving 10,000 inserts/second, the trigger SELECT runs 10,000 times/second. If the SELECT takes 1ms, the trigger adds 1ms to every insert — and inserts that were taking 0.1ms now take 1.1ms. Batch inserts are especially affected since row-level triggers fire per row.',
              fix: 'Profile trigger execution time. For performance-critical tables, consider alternative designs (constraints, application-layer validation).',
            },
            {
              pitfall: 'Mutating table error (mostly MySQL)',
              color: '#facc15',
              desc: 'In some databases (MySQL, Oracle), a row-level trigger on table T cannot query or modify table T within the same trigger execution (the "mutating table" error). PostgreSQL does not have this restriction for most cases, but be careful with recursive modifications.',
              fix: 'Use statement-level triggers or restructure the logic to avoid reading the table being modified.',
            },
            {
              pitfall: 'Hidden transaction scope',
              color: '#8b5cf6',
              desc: 'An AFTER trigger that raises an exception aborts the entire transaction — not just the triggering statement. If your application catches the error from a single UPDATE, it must re-begin the entire transaction. This surprises developers who expect only the one statement to fail.',
              fix: 'Document trigger exceptions clearly. Use RAISE EXCEPTION only when the entire transaction should abort. Use conditional logic or RETURN NEW with a warning when the operation should proceed with a logged warning.',
            },
          ].map((item) => (
            <div key={item.pitfall} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderLeft: `4px solid ${item.color}`, borderRadius: 10, padding: '16px 20px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{item.pitfall}</div>
              <Para>{item.desc}</Para>
              <div style={{ fontSize: 12, color: item.color, fontFamily: 'var(--font-mono)', background: `${item.color}0e`, border: `1px solid ${item.color}25`, borderRadius: 6, padding: '6px 12px', lineHeight: 1.7 }}>Fix: {item.fix}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          PART 5 — SECURITY WITH VIEWS AND PROCEDURES
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 05 — Security" />
        <SectionTitle>Database Security Using Views and Stored Procedures</SectionTitle>

        <Para>
          Views and stored procedures are the primary tools for implementing
          <strong style={{ color: 'var(--accent)' }}> least-privilege access</strong>
          in a database — the principle that each user or role should have access
          to exactly what they need and nothing more. This section covers the patterns
          used in every production multi-user database system.
        </Para>

        <CodeBox label="Row-level and column-level security using views">
{`-- ─────────────────────────────────────────────────────────────────
-- COLUMN-LEVEL SECURITY: hide sensitive columns via views
-- ─────────────────────────────────────────────────────────────────

-- Original table has sensitive columns:
CREATE TABLE employees (
    employee_id  INT PRIMARY KEY,
    name         VARCHAR(100),
    email        VARCHAR(150),
    salary       DECIMAL(12,2),   -- SENSITIVE
    ssn_last4   CHAR(10),        -- SENSITIVE
    department   VARCHAR(100),
    hire_date    DATE
);

-- Public view: excludes sensitive columns
CREATE VIEW employees_public AS
SELECT employee_id, name, email, department, hire_date
FROM employees;

-- Create role with access only to the view, NOT the base table:
CREATE ROLE hr_analyst;
GRANT SELECT ON employees_public TO hr_analyst;
-- hr_analyst can see employee_id, name, email, department, hire_date
-- hr_analyst CANNOT see salary or ssn_last4 (those columns don't exist in the view)

-- Payroll role: needs salary but not PAN
CREATE VIEW employees_payroll AS
SELECT employee_id, name, department, salary
FROM employees;

CREATE ROLE payroll_processor;
GRANT SELECT ON employees_payroll TO payroll_processor;

-- ─────────────────────────────────────────────────────────────────
-- ROW-LEVEL SECURITY: each user sees only their own data
-- ─────────────────────────────────────────────────────────────────

-- Approach 1: View using session variable
CREATE VIEW my_orders AS
SELECT * FROM orders
WHERE customer_id = current_setting('app.user_id')::INT;
-- Application sets: SET LOCAL app.user_id = '42'; before queries

-- Approach 2: PostgreSQL Row Level Security (more robust)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY customer_sees_own_orders ON orders
    FOR SELECT
    USING (customer_id = current_setting('app.user_id')::INT);

CREATE POLICY customer_inserts_own_orders ON orders
    FOR INSERT
    WITH CHECK (customer_id = current_setting('app.user_id')::INT);
-- Now every SELECT on orders automatically adds the WHERE clause
-- No special view needed — enforced at the table level

-- ─────────────────────────────────────────────────────────────────
-- STORED PROCEDURE SECURITY: SECURITY DEFINER
-- ─────────────────────────────────────────────────────────────────

-- SECURITY DEFINER: procedure runs with the privileges of its creator
-- (not the caller). Like Unix setuid.
CREATE OR REPLACE FUNCTION get_my_salary(p_employee_id INT)
RETURNS DECIMAL(12,2)
LANGUAGE plpgsql
SECURITY DEFINER  -- runs with creator's privileges
AS $$
DECLARE
    v_salary DECIMAL(12,2);
    v_caller_id INT;
BEGIN
    -- Get caller's employee_id from session variable
    v_caller_id := current_setting('app.employee_id')::INT;

    -- Only allow employees to see their own salary
    IF v_caller_id != p_employee_id THEN
        RAISE EXCEPTION 'Access denied: you can only view your own salary';
    END IF;

    SELECT salary INTO v_salary
    FROM employees
    WHERE employee_id = p_employee_id;

    RETURN v_salary;
END;
$$;

-- Grant EXECUTE to all authenticated users:
GRANT EXECUTE ON FUNCTION get_my_salary(INT) TO authenticated_role;
-- authenticated_role has NO SELECT on employees table
-- But CAN call get_my_salary — which runs as the superuser-level creator
-- and performs the SELECT on their behalf, with application-level auth check`}
        </CodeBox>
      </section>

      {/* ========================================
          PART 6 — WHAT THIS LOOKS LIKE AT WORK
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 06 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>💼 What This Looks Like at Work</div>
        <SectionTitle>Building a Complete Reporting Layer — Views, Materialised Views, and Procedures</SectionTitle>

        <Para>
          This is the exact architecture used by analytics teams at Indian tech companies
          to build fast, accurate, and secure reporting on top of live transactional data.
        </Para>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            DoorDash Ops Dashboard — Three-Layer Reporting Architecture
          </div>

          <CodeBox label="Layer 1 — Security views (what analysts actually query)">
{`-- Analysts use these views — they never touch base tables directly.
-- Views enforce column-level security and hide implementation details.

CREATE VIEW ops_order_view AS
SELECT
    o.order_id,
    o.order_date,
    o.status,
    o.total_amount,
    o.delivery_fee,
    c.city          AS customer_city,
    r.name          AS restaurant_name,
    r.city          AS restaurant_city,
    r.cuisine_type
    -- customer PII (name, email, phone) excluded from ops view
FROM orders o
JOIN customers   c ON o.customer_id   = c.customer_id
JOIN restaurants r ON o.restaurant_id = r.restaurant_id;

GRANT SELECT ON ops_order_view TO ops_analyst_role;`}
          </CodeBox>

          <CodeBox label="Layer 2 — Materialised views (pre-aggregated for dashboards)">
{`-- Pre-computed daily stats — refresh nightly at 2am
CREATE MATERIALIZED VIEW daily_city_stats AS
SELECT
    DATE(order_date)                AS order_day,
    customer_city,
    restaurant_city,
    COUNT(order_id)                 AS total_orders,
    COUNT(CASE WHEN status='delivered' THEN 1 END) AS delivered_orders,
    COUNT(CASE WHEN status='cancelled' THEN 1 END) AS cancelled_orders,
    SUM(CASE WHEN status='delivered' THEN total_amount ELSE 0 END) AS delivered_revenue,
    ROUND(
        COUNT(CASE WHEN status='delivered' THEN 1 END) * 100.0 / NULLIF(COUNT(*), 0),
        2
    ) AS delivery_success_rate
FROM ops_order_view
GROUP BY DATE(order_date), customer_city, restaurant_city;

CREATE UNIQUE INDEX idx_dcs_unique ON daily_city_stats(order_day, customer_city, restaurant_city);
CREATE INDEX idx_dcs_day ON daily_city_stats(order_day);

-- Dashboard query: sub-millisecond
SELECT order_day, customer_city, delivered_revenue
FROM daily_city_stats
WHERE order_day >= CURRENT_DATE - INTERVAL '30 days'
  AND customer_city = 'San Francisco'
ORDER BY order_day;`}
          </CodeBox>

          <CodeBox label="Layer 3 — Stored procedure for nightly refresh and alerting">
{`CREATE OR REPLACE PROCEDURE refresh_reporting_layer()
LANGUAGE plpgsql
AS $$
DECLARE
    v_start_time    TIMESTAMP := CURRENT_TIMESTAMP;
    v_rows_affected BIGINT;
BEGIN
    -- Refresh materialised views in dependency order
    RAISE NOTICE 'Starting reporting refresh at %', v_start_time;

    REFRESH MATERIALIZED VIEW CONCURRENTLY daily_city_stats;
    GET DIAGNOSTICS v_rows_affected = ROW_COUNT;
    RAISE NOTICE 'daily_city_stats refreshed: % rows', v_rows_affected;

    -- Check for anomalies and create alerts
    INSERT INTO ops_alerts (alert_type, message, severity, created_at)
    SELECT
        'low_delivery_rate',
        FORMAT('City %s: delivery rate dropped to %s%% on %s',
               customer_city, delivery_success_rate, order_day),
        'HIGH',
        CURRENT_TIMESTAMP
    FROM daily_city_stats
    WHERE order_day = CURRENT_DATE - 1
      AND delivery_success_rate < 85.0
      AND total_orders > 100;  -- only alert if meaningful volume

    -- Log the refresh
    INSERT INTO refresh_log(procedure_name, started_at, completed_at, status)
    VALUES ('refresh_reporting_layer', v_start_time, CURRENT_TIMESTAMP, 'SUCCESS');

    COMMIT;
    RAISE NOTICE 'Refresh complete in %', CURRENT_TIMESTAMP - v_start_time;

EXCEPTION WHEN OTHERS THEN
    INSERT INTO refresh_log(procedure_name, started_at, completed_at, status, error_msg)
    VALUES ('refresh_reporting_layer', v_start_time, CURRENT_TIMESTAMP, 'FAILED', SQLERRM);
    COMMIT;
    RAISE;
END;
$$;

-- Schedule via pg_cron:
SELECT cron.schedule('nightly-refresh', '0 2 * * *', 'CALL refresh_reporting_layer()');`}
          </CodeBox>
        </div>
      </section>

      {/* ========================================
          PART 7 — INTERVIEW QUESTIONS
          ======================================== */}
      <section style={{ marginBottom: 72 }}>
        <SectionTag text="// Part 07 — Interview Prep" />
        <SectionTitle>Views, Procedures, and Triggers Interview Questions — Complete Answers</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              q: 'What is a view and when would you use one?',
              color: '#0078d4',
              a: 'A view is a named query stored in the database catalog. It behaves like a table for SELECT purposes but stores no data — each access re-executes the underlying query. Use views for three main reasons. Abstraction: hide complex multi-table joins behind a simple name so application code is easier to write and read. Security: expose only specific rows and columns to specific roles without changing the underlying tables — a classic example is excluding salary from an employee view given to HR analysts. Schema stability: when base table schema changes, update the view definition and applications using the view are unaffected. Views have essentially zero performance overhead because the database rewrites them inline before optimisation — the optimiser sees the full expanded query and can use indexes and push predicates as if you wrote the join directly.',
            },
            {
              q: 'What is the difference between a view and a materialised view?',
              color: 'var(--accent)',
              a: 'A regular view is a stored query definition — it executes the query fresh on every access, always returning current data, but taking the full query execution time every time. A materialised view stores the query result physically on disk like a real table. Reading it is instant (reads pre-computed rows, uses indexes), but the data may be stale until explicitly refreshed. The trade-off: regular views give always-current data at query execution cost; materialised views give instant reads at the cost of potential staleness. Materialised views should be used for heavy aggregations that run frequently but where data doesn\'t need to be real-time — dashboards, reporting, analytics summaries. They support indexes (unlike regular views) which further accelerates access. REFRESH MATERIALIZED VIEW CONCURRENTLY allows refresh without blocking reads, requiring a unique index.',
            },
            {
              q: 'Under what conditions is a view updatable in PostgreSQL?',
              color: '#f97316',
              a: 'A view is automatically updatable in PostgreSQL if it meets ALL of these conditions simultaneously: defined on exactly one base table or updatable view (not a join), contains no DISTINCT, GROUP BY, HAVING, LIMIT, OFFSET, UNION, INTERSECT, or EXCEPT clauses, contains no aggregate functions, no window functions, no set-returning functions, and its FROM list has exactly one entry. If any condition is violated, the view is not automatically updatable. Non-updatable views can be made writable using INSTEAD OF triggers — a PL/pgSQL function that intercepts the INSERT/UPDATE/DELETE on the view and manually executes the appropriate operations on the underlying base tables. WITH CHECK OPTION on an updatable view prevents modifications that would cause the row to disappear from the view\'s WHERE condition.',
            },
            {
              q: 'What is the difference between a stored procedure and a function in PostgreSQL?',
              color: '#8b5cf6',
              a: 'In PostgreSQL, the key differences are: Functions always return a value and can be used inside SQL expressions (SELECT my_func(), WHERE col = my_func()). Procedures have no return value and are called with CALL. The most important practical difference is transaction control: procedures (PostgreSQL 11+) can execute COMMIT and ROLLBACK within their body, allowing them to manage their own transactions or commit partial work. Functions cannot — they always run entirely within the caller\'s transaction. SECURITY DEFINER on either one causes it to execute with the privileges of its creator rather than its caller, enabling controlled privilege escalation (a low-privilege user can call a SECURITY DEFINER function that accesses tables they don\'t have direct permission on).',
            },
            {
              q: 'Explain the difference between BEFORE and AFTER triggers. When would you use each?',
              color: '#facc15',
              a: 'A BEFORE trigger fires before the operation executes. For row-level triggers, it can modify the NEW record (by returning a modified NEW) or cancel the operation entirely (by returning NULL). Use BEFORE triggers for: data normalisation before storage (trim whitespace, lowercase email), data validation that should prevent the operation, and soft-delete patterns that intercept DELETE and convert it to an UPDATE. An AFTER trigger fires after the operation has completed but before the transaction commits. The row is already in the database at this point. It cannot modify what was stored or cancel the operation (though it can raise an exception to abort the transaction). Use AFTER triggers for: audit logging (recording what changed), maintaining denormalised or derived data (update avg_rating after a review is inserted), cascading changes to related tables. FOR EACH ROW fires once per affected row (access to OLD and NEW). FOR EACH STATEMENT fires once per SQL statement regardless of rows affected (better performance for bulk operations, but no access to individual row values).',
            },
            {
              q: 'What is the mutating table problem in triggers?',
              color: '#e879f9',
              a: 'The mutating table problem occurs when a row-level trigger on table T tries to query or modify table T. In MySQL and Oracle, this generates an explicit error ("table is mutating"). In PostgreSQL, this is generally allowed but can cause problems: if a BEFORE INSERT trigger on orders does a SELECT COUNT(*) FROM orders, it sees the table in its pre-insert state (the new row is not yet there). If an AFTER INSERT trigger on orders does an UPDATE on orders, it could theoretically cause infinite recursion if the update fires the trigger again. The standard solution in PostgreSQL is to check pg_trigger_depth() at the start of the trigger function — if it is greater than 1, the trigger is being called recursively and should return early. For Oracle/MySQL, the solution is to use statement-level triggers (FOR EACH STATEMENT) instead of row-level triggers, since statement-level triggers do not have access to individual row values and therefore have fewer restrictions on what they can access.',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderLeft: `4px solid ${item.color}`, borderRadius: 12, padding: '22px 26px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Q: {item.q}</div>
              <Para>{item.a}</Para>
            </div>
          ))}
        </div>
      </section>

      {/* ── KEY TAKEAWAYS ── */}
      <KeyTakeaways items={[
        'A view is a named stored query — no data stored, query re-executes on every access. Three purposes: abstraction (hide complex joins), security (expose only permitted rows/columns), schema stability (insulate apps from base table changes). Zero performance overhead due to query rewriting.',
        'Automatic view updatability requires: single base table, no joins, no DISTINCT/GROUP BY/HAVING/LIMIT, no aggregates or window functions. WITH CHECK OPTION prevents updates that would make the row invisible to the view. Non-updatable views become writable via INSTEAD OF triggers.',
        'Materialised views store query results physically on disk. Instant reads, supports indexes, but data may be stale. REFRESH MATERIALIZED VIEW (blocking) or REFRESH MATERIALIZED VIEW CONCURRENTLY (non-blocking, requires unique index). Use for heavy aggregations queried frequently.',
        'Stored functions return a value, can be used in SQL expressions, always run within caller\'s transaction. Stored procedures (PostgreSQL 11+) have no return value, called with CALL, can COMMIT and ROLLBACK within their body. SECURITY DEFINER makes either run with creator\'s privileges.',
        'PL/pgSQL key constructs: DECLARE block for variables, BEGIN/END for the body, IF/ELSIF/ELSE for branching, LOOP/EXIT for iteration, SELECT INTO for assignment, RAISE EXCEPTION/NOTICE for errors and logging, EXCEPTION block for error handling with WHEN OTHERS THEN catch-all.',
        'Trigger dimensions: Event (INSERT/UPDATE/DELETE/TRUNCATE), Timing (BEFORE/AFTER/INSTEAD OF), Granularity (FOR EACH ROW / FOR EACH STATEMENT). BEFORE triggers can modify NEW or cancel the operation (return NULL). AFTER triggers cannot cancel but can raise exceptions.',
        'Special trigger variables: TG_OP (operation type: INSERT/UPDATE/DELETE), TG_TABLE_NAME (table that fired trigger), NEW (new row version — NULL for DELETE), OLD (old row version — NULL for INSERT), pg_trigger_depth() (recursion depth — use to prevent infinite loops).',
        'INSTEAD OF triggers: the mechanism for making non-updatable views writable. Fire instead of the actual INSERT/UPDATE/DELETE on the view. The trigger function manually updates the underlying base tables. Essential for join views and aggregation views that need to support writes.',
        'Security patterns: column-level security via views (exclude sensitive columns), row-level security via views or PostgreSQL RLS policies, procedure-based access control using SECURITY DEFINER (caller gets procedure privileges without table-level grants). Least-privilege principle: roles should only access what they need.',
        'Trigger pitfalls: recursive loops (use pg_trigger_depth() check), performance destruction on high-write tables (FOR EACH ROW trigger on 10K inserts/second = 10K trigger executions/second), hidden transaction aborts (RAISE EXCEPTION in AFTER trigger aborts the entire transaction, not just the statement).',
      ]} />

    </LearnLayout>
  )
}