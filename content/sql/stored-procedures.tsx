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

const CompareCard = ({ title, color, points }: { title: string; color: string; points: string[] }) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}25`, borderRadius: 10, overflow: 'hidden', flex: 1, minWidth: 220 }}>
    <div style={{ padding: '10px 14px', background: `${color}10`, borderBottom: `1px solid ${color}20` }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color }}>{title}</span>
    </div>
    <ul style={{ margin: 0, padding: '12px 16px 12px 28px' }}>
      {points.map((p, i) => (
        <li key={i} style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 4 }}>{p}</li>
      ))}
    </ul>
  </div>
);

export default function StoredProcedures() {
  return (
    <LearnLayout
      title="Stored Procedures"
      description="Reusable named programs stored inside the database — parameters, variables, control flow, exception handling, and when database-side logic beats application-layer logic"
      section="SQL — Module 48"
      readTime="14–20 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What a Stored Procedure Is" />

      <P>A stored procedure is a <Hl>named, reusable program stored inside the database</Hl>. It is written in a procedural extension of SQL (PL/pgSQL in PostgreSQL, T-SQL in SQL Server, PL/SQL in Oracle) and can contain variables, conditional logic, loops, exception handling, and multiple SQL statements — all executed server-side in a single round trip.</P>

      <P>Unlike a view (which is a saved SELECT) or a function (which returns a value), a stored procedure is called with CALL and performs actions — it can INSERT, UPDATE, DELETE, manage transactions, and modify database state. The procedure runs entirely inside the database engine, with no data transferred to the application until the procedure finishes.</P>

      <CodeBlock
        label="Stored procedure anatomy — PostgreSQL PL/pgSQL"
        code={`-- Create a stored procedure
CREATE OR REPLACE PROCEDURE procedure_name(
  param1  data_type,
  param2  data_type DEFAULT default_value,
  INOUT  result_param data_type DEFAULT NULL  -- INOUT for output values
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_variable   data_type;           -- local variable declaration
  v_another    data_type := 0;      -- with initial value
BEGIN
  -- SQL statements
  SELECT col INTO v_variable FROM table WHERE condition;

  -- Control flow
  IF v_variable > 100 THEN
    UPDATE table SET col = col * 1.1;
  ELSE
    RAISE NOTICE 'Value is %', v_variable;   -- log message
  END IF;

  -- Exception handling
  EXCEPTION
    WHEN unique_violation THEN
      RAISE EXCEPTION 'Duplicate entry: %', SQLERRM;
    WHEN OTHERS THEN
      RAISE;   -- re-raise any other exception
END;
$$;

-- Call a stored procedure
CALL procedure_name(arg1, arg2);`}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Stored Procedure vs Function vs View — The Differences" />

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '20px 0 32px' }}>
        <CompareCard
          title="Stored Procedure"
          color={C}
          points={[
            'Called with CALL',
            'Returns nothing (or INOUT params)',
            'Can COMMIT / ROLLBACK inside',
            'Can modify database state (DML)',
            'Cannot be used in SELECT or WHERE',
            'Best for: batch jobs, business workflows, multi-step operations',
          ]}
        />
        <CompareCard
          title="Function"
          color="#10b981"
          points={[
            'Called with SELECT or inline',
            'Must return a value or table',
            'Cannot manage transactions',
            'Can modify state (but discouraged)',
            'Usable inside SELECT, WHERE, JOIN',
            'Best for: computations, transformations, derived values',
          ]}
        />
        <CompareCard
          title="View"
          color="#8b5cf6"
          points={[
            'Queried with SELECT',
            'Returns rows (read-only)',
            'No procedural logic',
            'Cannot modify state',
            'Usable anywhere a table is',
            'Best for: saved queries, access control, abstraction',
          ]}
        />
      </div>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Your First Stored Procedure — Variables and Basic Logic" />

      <CodeBlock
        label="Procedure: upgrade customer loyalty tier"
        code={`-- Procedure: calculate and upgrade a customer's loyalty tier
-- based on their delivered order history
CREATE OR REPLACE PROCEDURE sp_upgrade_loyalty_tier(
  p_customer_id  INTEGER
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_lifetime_value  NUMERIC;
  v_current_tier    TEXT;
  v_new_tier        TEXT;
BEGIN
  -- Step 1: get current tier and lifetime value
  SELECT
    c.loyalty_tier,
    COALESCE(SUM(o.total_amount), 0)
  INTO
    v_current_tier,
    v_lifetime_value
  FROM customers AS c
  LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
    AND o.order_status = 'Delivered'
  WHERE c.customer_id = p_customer_id
  GROUP BY c.loyalty_tier;

  -- Step 2: determine the earned tier
  v_new_tier := CASE
    WHEN v_lifetime_value >= 5000 THEN 'Platinum'
    WHEN v_lifetime_value >= 2000 THEN 'Gold'
    WHEN v_lifetime_value >= 500  THEN 'Silver'
    ELSE 'Bronze'
  END;

  -- Step 3: update only if tier changed
  IF v_new_tier != v_current_tier THEN
    UPDATE customers
    SET loyalty_tier = v_new_tier
    WHERE customer_id = p_customer_id;

    RAISE NOTICE 'Customer % upgraded: % → %',
      p_customer_id, v_current_tier, v_new_tier;
  ELSE
    RAISE NOTICE 'Customer % tier unchanged: %',
      p_customer_id, v_current_tier;
  END IF;
END;
$$;

-- Call it:
CALL sp_upgrade_loyalty_tier(1);
CALL sp_upgrade_loyalty_tier(42);`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate what sp_upgrade_loyalty_tier computes for each customer
-- (showing the logic inline since playground doesn't persist procedures)
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name         AS customer,
  c.loyalty_tier                              AS current_tier,
  COALESCE(ROUND(SUM(o.total_amount), 2), 0) AS lifetime_value,
  CASE
    WHEN COALESCE(SUM(o.total_amount), 0) >= 5000 THEN 'Platinum'
    WHEN COALESCE(SUM(o.total_amount), 0) >= 2000 THEN 'Gold'
    WHEN COALESCE(SUM(o.total_amount), 0) >= 500  THEN 'Silver'
    ELSE 'Bronze'
  END                                         AS earned_tier,
  CASE
    WHEN c.loyalty_tier !=
      CASE
        WHEN COALESCE(SUM(o.total_amount), 0) >= 5000 THEN 'Platinum'
        WHEN COALESCE(SUM(o.total_amount), 0) >= 2000 THEN 'Gold'
        WHEN COALESCE(SUM(o.total_amount), 0) >= 500  THEN 'Silver'
        ELSE 'Bronze'
      END
    THEN '⬆ Would upgrade'
    ELSE '✓ Unchanged'
  END                                         AS action
FROM customers AS c
LEFT JOIN orders AS o
  ON c.customer_id   = o.customer_id
  AND o.order_status = 'Delivered'
GROUP BY c.customer_id, c.first_name, c.last_name, c.loyalty_tier
ORDER BY lifetime_value DESC;`}
        height={295}
        showSchema={true}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Parameters — IN, OUT, and INOUT" />

      <CodeBlock
        label="Parameter modes — IN, OUT, INOUT"
        code={`-- IN (default): value passed into the procedure — read-only inside
-- OUT: value returned from the procedure — write-only inside
-- INOUT: both passed in AND returned — readable and writable

-- Example: procedure that returns computed values via INOUT/OUT
CREATE OR REPLACE PROCEDURE sp_get_store_stats(
  p_store_id      TEXT,                 -- IN: which store
  INOUT p_orders  INTEGER DEFAULT 0,    -- OUT: order count
  INOUT p_revenue NUMERIC DEFAULT 0     -- OUT: total revenue
)
LANGUAGE plpgsql
AS $$
BEGIN
  SELECT
    COUNT(*),
    ROUND(SUM(total_amount), 2)
  INTO
    p_orders,
    p_revenue
  FROM orders
  WHERE store_id     = p_store_id
    AND order_status = 'Delivered';
END;
$$;

-- Call and read the INOUT outputs:
DO $$
DECLARE
  v_orders  INTEGER;
  v_revenue NUMERIC;
BEGIN
  CALL sp_get_store_stats('ST001', v_orders, v_revenue);
  RAISE NOTICE 'ST001 — Orders: %, Revenue: ₹%', v_orders, v_revenue;
END;
$$;

-- Note: in PostgreSQL, functions are often preferred over procedures
-- when returning values — functions work naturally in SELECT queries
-- Procedures with INOUT are useful when transaction control is also needed`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate sp_get_store_stats for all stores
-- Shows the output values the procedure would return per store
SELECT
  store_id                               AS p_store_id,
  COUNT(*)                               AS p_orders,
  ROUND(SUM(total_amount), 2)            AS p_revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY store_id
ORDER BY p_revenue DESC;`}
        height={155}
        showSchema={true}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Control Flow — IF, CASE, Loops" />

      <H>IF / ELSIF / ELSE</H>

      <CodeBlock
        label="IF / ELSIF / ELSE in PL/pgSQL"
        code={`CREATE OR REPLACE PROCEDURE sp_apply_discount(
  p_order_id  INTEGER,
  p_tier      TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_discount  NUMERIC;
  v_original  NUMERIC;
BEGIN
  -- Get original amount
  SELECT total_amount INTO v_original
  FROM orders WHERE order_id = p_order_id;

  -- Determine discount by loyalty tier
  IF p_tier = 'Platinum' THEN
    v_discount := 0.20;
  ELSIF p_tier = 'Gold' THEN
    v_discount := 0.15;
  ELSIF p_tier = 'Silver' THEN
    v_discount := 0.10;
  ELSE
    v_discount := 0.05;
  END IF;

  -- Apply discount
  UPDATE orders
  SET total_amount = ROUND(v_original * (1 - v_discount), 2)
  WHERE order_id = p_order_id;

  RAISE NOTICE 'Order %: ₹% → ₹% (% discount applied)',
    p_order_id,
    v_original,
    ROUND(v_original * (1 - v_discount), 2),
    (v_discount * 100)::TEXT || '%';
END;
$$;`}
      />

      <H>LOOP, WHILE, and FOR loops</H>

      <CodeBlock
        label="Loop constructs in PL/pgSQL"
        code={`CREATE OR REPLACE PROCEDURE sp_batch_upgrade_all_customers()
LANGUAGE plpgsql
AS $$
DECLARE
  v_customer   RECORD;        -- holds one row at a time
  v_count      INTEGER := 0;
BEGIN
  -- FOR loop over a query result — iterate every customer
  FOR v_customer IN
    SELECT customer_id FROM customers ORDER BY customer_id
  LOOP
    -- Call the upgrade procedure for each customer
    CALL sp_upgrade_loyalty_tier(v_customer.customer_id);
    v_count := v_count + 1;
  END LOOP;

  RAISE NOTICE 'Processed % customers', v_count;
END;
$$;

-- WHILE loop example:
CREATE OR REPLACE PROCEDURE sp_retry_failed_payments(p_max_attempts INTEGER)
LANGUAGE plpgsql
AS $$
DECLARE
  v_attempt INTEGER := 0;
  v_pending INTEGER;
BEGIN
  LOOP
    -- Count remaining failed payments
    SELECT COUNT(*) INTO v_pending
    FROM payment_log WHERE status = 'failed';

    EXIT WHEN v_pending = 0 OR v_attempt >= p_max_attempts;

    -- Process one batch of retries
    UPDATE payment_log SET status = 'retrying'
    WHERE status = 'failed'
    LIMIT 100;

    v_attempt := v_attempt + 1;
    RAISE NOTICE 'Retry attempt %, remaining: %', v_attempt, v_pending;
  END LOOP;
END;
$$;`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate batch upgrade logic using a set-based approach
-- (equivalent to the FOR LOOP in sp_batch_upgrade_all_customers)
WITH customer_tiers AS (
  SELECT
    c.customer_id,
    c.loyalty_tier                              AS current_tier,
    COALESCE(ROUND(SUM(o.total_amount), 2), 0)  AS lifetime_value,
    CASE
      WHEN COALESCE(SUM(o.total_amount), 0) >= 5000 THEN 'Platinum'
      WHEN COALESCE(SUM(o.total_amount), 0) >= 2000 THEN 'Gold'
      WHEN COALESCE(SUM(o.total_amount), 0) >= 500  THEN 'Silver'
      ELSE 'Bronze'
    END                                         AS earned_tier
  FROM customers AS c
  LEFT JOIN orders AS o
    ON c.customer_id = o.customer_id
    AND o.order_status = 'Delivered'
  GROUP BY c.customer_id, c.loyalty_tier
)
SELECT
  COUNT(*) FILTER (WHERE current_tier != earned_tier)  AS would_upgrade,
  COUNT(*) FILTER (WHERE current_tier  = earned_tier)  AS unchanged,
  COUNT(*)                                             AS total_processed
FROM customer_tiers;`}
        height={235}
        showSchema={true}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Exception Handling — RAISE and EXCEPTION Blocks" />

      <P>Stored procedures handle errors through exception blocks. When a statement raises an error, execution jumps to the EXCEPTION section. You can catch specific error types, log them, and either recover gracefully or re-raise to the caller.</P>

      <CodeBlock
        label="Exception handling — RAISE and EXCEPTION"
        code={`CREATE OR REPLACE PROCEDURE sp_place_order(
  p_customer_id  INTEGER,
  p_store_id     TEXT,
  p_product_id   INTEGER,
  p_quantity     INTEGER
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_unit_price   NUMERIC;
  v_in_stock     BOOLEAN;
  v_order_id     INTEGER;
BEGIN
  -- Validate product
  SELECT unit_price, in_stock
  INTO   v_unit_price, v_in_stock
  FROM   products
  WHERE  product_id = p_product_id;

  -- Not found: FOUND is FALSE if SELECT INTO returned no rows
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Product % does not exist', p_product_id
      USING ERRCODE = 'P0001';   -- custom error code
  END IF;

  IF NOT v_in_stock THEN
    RAISE EXCEPTION 'Product % is out of stock', p_product_id
      USING ERRCODE = 'P0002';
  END IF;

  -- Insert order
  INSERT INTO orders (customer_id, store_id, order_date, order_status, total_amount)
  VALUES (p_customer_id, p_store_id, CURRENT_DATE, 'Processing',
          v_unit_price * p_quantity)
  RETURNING order_id INTO v_order_id;

  -- Insert order item
  INSERT INTO order_items (order_id, product_id, quantity, unit_price, line_total)
  VALUES (v_order_id, p_product_id, p_quantity, v_unit_price,
          v_unit_price * p_quantity);

  RAISE NOTICE 'Order % placed successfully for customer %', v_order_id, p_customer_id;

EXCEPTION
  WHEN foreign_key_violation THEN
    RAISE EXCEPTION 'Invalid customer_id or store_id: %', SQLERRM;
  WHEN unique_violation THEN
    RAISE EXCEPTION 'Duplicate order detected: %', SQLERRM;
  WHEN OTHERS THEN
    -- Log the error and re-raise
    RAISE NOTICE 'Unexpected error in sp_place_order: %', SQLERRM;
    RAISE;   -- re-raises the original exception
END;
$$;`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate the validation logic in sp_place_order
-- Shows which orders would succeed vs fail validation
SELECT
  p.product_id,
  p.product_name,
  p.unit_price,
  p.in_stock,
  CASE
    WHEN NOT p.in_stock       THEN '✗ Out of stock — RAISE EXCEPTION'
    ELSE '✓ Valid — would proceed'
  END                         AS procedure_outcome,
  -- Simulated order total for quantity = 2
  CASE WHEN p.in_stock
    THEN ROUND(p.unit_price * 2, 2)::TEXT
    ELSE 'N/A'
  END                         AS simulated_order_total
FROM products AS p
ORDER BY p.in_stock DESC, p.unit_price DESC
LIMIT 8;`}
        height={195}
        showSchema={true}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Transaction Control Inside Procedures" />

      <P>In PostgreSQL, stored procedures (not functions) can contain COMMIT and ROLLBACK statements — something functions cannot do. This makes procedures the right tool for multi-step batch jobs where each step should commit independently rather than waiting for the entire batch to finish.</P>

      <CodeBlock
        label="Transaction control inside a procedure"
        code={`-- Procedure that processes orders in batches
-- Each batch commits independently — no single giant transaction
CREATE OR REPLACE PROCEDURE sp_process_pending_orders(
  p_batch_size  INTEGER DEFAULT 100
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_order       RECORD;
  v_processed   INTEGER := 0;
  v_failed      INTEGER := 0;
BEGIN
  FOR v_order IN
    SELECT order_id, customer_id, total_amount
    FROM orders
    WHERE order_status = 'Processing'
    ORDER BY order_date
    LIMIT p_batch_size
  LOOP
    BEGIN
      -- Try to process each order
      UPDATE orders
      SET order_status = 'Confirmed'
      WHERE order_id = v_order.order_id;

      INSERT INTO processing_log (order_id, processed_at, status)
      VALUES (v_order.order_id, NOW(), 'success');

      v_processed := v_processed + 1;

      -- COMMIT each order individually — not waiting for the whole batch
      COMMIT;

    EXCEPTION WHEN OTHERS THEN
      -- One order failing does not stop the batch
      ROLLBACK;
      v_failed := v_failed + 1;

      INSERT INTO error_log (order_id, error_msg, logged_at)
      VALUES (v_order.order_id, SQLERRM, NOW());
      COMMIT;   -- commit the error log entry
    END;
  END LOOP;

  RAISE NOTICE 'Batch complete: % processed, % failed', v_processed, v_failed;
END;
$$;

-- Note: COMMIT/ROLLBACK inside procedures is PostgreSQL 11+
-- MySQL stored procedures also support COMMIT/ROLLBACK
-- Cannot use COMMIT/ROLLBACK inside PostgreSQL FUNCTIONS`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate the batch processing logic
-- Shows what each order's fate would be
SELECT
  order_id,
  customer_id,
  total_amount,
  order_status,
  order_date,
  CASE order_status
    WHEN 'Processing' THEN '→ Would be updated to Confirmed'
    WHEN 'Delivered'  THEN '— Already delivered, skipped'
    WHEN 'Cancelled'  THEN '— Cancelled, skipped'
    ELSE '— Other status'
  END                      AS batch_action
FROM orders
ORDER BY order_date
LIMIT 10;`}
        height={195}
        showSchema={true}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Stored Functions vs Stored Procedures" />

      <P>PostgreSQL uses <Hl>functions</Hl> for computations that return values and <Hl>procedures</Hl> for actions. Functions can be called inside SQL queries (SELECT, WHERE, JOIN). Procedures cannot. Functions cannot COMMIT or ROLLBACK. Procedures can. In practice, many teams use functions for most database-side logic and procedures only when transaction control is needed.</P>

      <CodeBlock
        label="Function vs procedure — when to use each"
        code={`-- FUNCTION: returns a value — usable in SELECT/WHERE/JOIN
CREATE OR REPLACE FUNCTION fn_customer_lifetime_value(
  p_customer_id INTEGER
) RETURNS NUMERIC
LANGUAGE plpgsql
AS $$
DECLARE
  v_total NUMERIC;
BEGIN
  SELECT COALESCE(SUM(total_amount), 0)
  INTO   v_total
  FROM   orders
  WHERE  customer_id   = p_customer_id
    AND  order_status  = 'Delivered';
  RETURN v_total;
END;
$$;

-- Function is callable in any SQL context:
SELECT customer_id, fn_customer_lifetime_value(customer_id) AS ltv
FROM customers;

WHERE fn_customer_lifetime_value(customer_id) > 1000

-- PROCEDURE: performs actions — called with CALL only
CREATE OR REPLACE PROCEDURE sp_upgrade_all_tiers()
LANGUAGE plpgsql AS $$
BEGIN
  UPDATE customers AS c
  SET loyalty_tier = CASE
    WHEN fn_customer_lifetime_value(c.customer_id) >= 5000 THEN 'Platinum'
    WHEN fn_customer_lifetime_value(c.customer_id) >= 2000 THEN 'Gold'
    WHEN fn_customer_lifetime_value(c.customer_id) >= 500  THEN 'Silver'
    ELSE 'Bronze'
  END;
  -- Can COMMIT here (procedure can manage transactions)
END;
$$;

CALL sp_upgrade_all_tiers();`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate fn_customer_lifetime_value for all customers
-- This is exactly what the function would compute per customer_id
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name        AS customer,
  c.loyalty_tier,
  COALESCE(ROUND(SUM(o.total_amount), 2), 0) AS lifetime_value
FROM customers AS c
LEFT JOIN orders AS o
  ON c.customer_id   = o.customer_id
  AND o.order_status = 'Delivered'
GROUP BY c.customer_id, c.first_name, c.last_name, c.loyalty_tier
ORDER BY lifetime_value DESC;`}
        height={195}
        showSchema={true}
      />

      <H>Table-valued functions — return a result set</H>

      <CodeBlock
        label="Table-valued function — returns rows like a table"
        code={`-- Function that returns a table (like a parameterised view)
CREATE OR REPLACE FUNCTION fn_store_report(
  p_store_id TEXT,
  p_from     DATE DEFAULT '2024-01-01',
  p_to       DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  order_date     DATE,
  order_count    INTEGER,
  daily_revenue  NUMERIC,
  avg_order      NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    o.order_date,
    COUNT(*)::INTEGER,
    ROUND(SUM(o.total_amount), 2),
    ROUND(AVG(o.total_amount), 2)
  FROM orders AS o
  WHERE o.store_id     = p_store_id
    AND o.order_status = 'Delivered'
    AND o.order_date BETWEEN p_from AND p_to
  GROUP BY o.order_date
  ORDER BY o.order_date;
END;
$$;

-- Call exactly like a table:
SELECT * FROM fn_store_report('ST001');
SELECT * FROM fn_store_report('ST001', '2024-01-01', '2024-01-31');

-- Join to other tables:
SELECT s.city, r.daily_revenue
FROM fn_store_report('ST001') AS r
JOIN stores AS s ON s.store_id = 'ST001';`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate fn_store_report('ST001') inline
SELECT
  order_date,
  COUNT(*)::INTEGER                    AS order_count,
  ROUND(SUM(total_amount), 2)          AS daily_revenue,
  ROUND(AVG(total_amount), 2)          AS avg_order
FROM orders
WHERE store_id     = 'ST001'
  AND order_status = 'Delivered'
GROUP BY order_date
ORDER BY order_date;`}
        height={175}
        showSchema={false}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Managing Procedures — List, View, Alter, Drop" />

      <CodeBlock
        label="Procedure DDL — lifecycle management"
        code={`-- List all procedures in the current database (PostgreSQL)
SELECT
  routine_name,
  routine_type,
  data_type AS return_type,
  external_language AS language
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_type IN ('PROCEDURE', 'FUNCTION')
ORDER BY routine_type, routine_name;

-- View a procedure's definition
SELECT prosrc
FROM pg_proc
WHERE proname = 'sp_upgrade_loyalty_tier';

-- Or use pg_get_functiondef:
SELECT pg_get_functiondef(oid)
FROM pg_proc
WHERE proname = 'sp_upgrade_loyalty_tier';

-- Update a procedure (CREATE OR REPLACE — no DROP needed)
CREATE OR REPLACE PROCEDURE sp_upgrade_loyalty_tier(p_customer_id INTEGER)
LANGUAGE plpgsql AS $$
BEGIN
  -- ... updated logic ...
END;
$$;

-- Drop a procedure
DROP PROCEDURE sp_upgrade_loyalty_tier(INTEGER);
DROP PROCEDURE IF EXISTS sp_upgrade_loyalty_tier(INTEGER);

-- Drop with CASCADE (also drops dependent triggers/rules)
DROP PROCEDURE sp_upgrade_loyalty_tier(INTEGER) CASCADE;

-- Procedure permissions
GRANT EXECUTE ON PROCEDURE sp_upgrade_loyalty_tier(INTEGER) TO app_role;
REVOKE EXECUTE ON PROCEDURE sp_upgrade_loyalty_tier(INTEGER) FROM PUBLIC;`}
      />

      <SQLPlayground
        initialQuery={`-- List all routines in the FreshCart database
SELECT
  routine_name,
  routine_type,
  external_language   AS language,
  created             AS created_at
FROM information_schema.routines
WHERE routine_schema NOT IN ('pg_catalog', 'information_schema')
ORDER BY routine_type, routine_name
LIMIT 15;`}
        height={160}
        showSchema={false}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="When to Use Stored Procedures vs Application Logic" />

      <P>The debate between database-side logic (stored procedures) and application-side logic has no universal answer. Both have legitimate use cases. The decision depends on what the logic does, who needs to call it, and how the organisation maintains code.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Scenario', 'Recommended approach', 'Why'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Batch job processing millions of rows', 'Stored procedure', 'Set-based updates in the database avoid transferring millions of rows to the app layer and back'],
              ['Business logic called from multiple apps (mobile, web, admin)', 'Stored procedure', 'Single implementation in the DB enforces consistency — no risk of apps implementing rules differently'],
              ['Complex validation before INSERT/UPDATE', 'Stored procedure or trigger', 'Validation runs server-side regardless of which client is writing data'],
              ['Simple CRUD for a single application', 'Application code', 'ORMs and application frameworks handle this cleanly; stored procedures add overhead'],
              ['Business rules that change frequently', 'Application code', 'Stored procedure changes require DB migrations — slower to deploy than app deploys'],
              ['Multi-step atomic workflow (order → payment → inventory)', 'Stored procedure', 'Single CALL wraps entire workflow in one transaction with proper rollback'],
              ['Reporting and analytics queries', 'Views or application layer', 'Views provide the abstraction; application layer has better tooling for complex report logic'],
              ['Access control — prevent direct table access', 'Stored procedure + GRANT', 'Grant EXECUTE only on the procedure; revoke direct table access — only the procedure can write'],
            ].map(([scenario, approach, why], i) => (
              <tr key={scenario} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{scenario}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, color: C, borderBottom: '1px solid var(--border)', fontWeight: 700, whiteSpace: 'nowrap' }}>{approach}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are a backend engineer at Shopify. Every night at 2 AM a batch job runs to: (1) calculate every seller's monthly revenue, (2) update their seller_tier based on thresholds, (3) credit loyalty cashback to high-tier sellers, and (4) log the run. Previously this was application code that fetched sellers one by one, computed in Python, and issued individual UPDATEs — 50,000 sellers took 25 minutes. You migrate it to a stored procedure that does everything server-side — the same job runs in 18 seconds.</P>

      <TimeBlock time="1:55 AM" label="Old job — 25 minutes, Python fetching rows one by one">
        Each seller: SELECT → compute in Python → UPDATE. 50,000 × 3 round trips = 150,000 database calls, each paying network latency.
      </TimeBlock>

      <TimeBlock time="2:00 AM" label="New job — stored procedure, everything runs server-side">
        One CALL. The procedure computes and updates all 50,000 sellers in a single set-based UPDATE. Zero round trips per seller.
      </TimeBlock>

      <CodeBlock
        label="sp_nightly_seller_tier_update — production-style procedure"
        code={`CREATE OR REPLACE PROCEDURE sp_nightly_seller_tier_update(
  p_month_start  DATE DEFAULT DATE_TRUNC('month', CURRENT_DATE)::DATE
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_updated      INTEGER;
  v_run_id       INTEGER;
  v_month_end    DATE;
BEGIN
  v_month_end := (p_month_start + INTERVAL '1 month' - INTERVAL '1 day')::DATE;

  -- Log the run start
  INSERT INTO batch_log (job_name, started_at, status)
  VALUES ('nightly_tier_update', NOW(), 'running')
  RETURNING id INTO v_run_id;

  -- Step 1: compute monthly revenue per seller and update tier
  -- Single set-based UPDATE — no row-by-row looping needed
  WITH seller_revenue AS (
    SELECT
      seller_id,
      ROUND(SUM(order_amount), 2)  AS monthly_revenue
    FROM seller_orders
    WHERE order_date BETWEEN p_month_start AND v_month_end
      AND order_status = 'Delivered'
    GROUP BY seller_id
  )
  UPDATE sellers AS s
  SET
    current_month_revenue = sr.monthly_revenue,
    seller_tier = CASE
      WHEN sr.monthly_revenue >= 500000 THEN 'Diamond'
      WHEN sr.monthly_revenue >= 100000 THEN 'Platinum'
      WHEN sr.monthly_revenue >= 25000  THEN 'Gold'
      WHEN sr.monthly_revenue >= 5000   THEN 'Silver'
      ELSE 'Bronze'
    END,
    tier_updated_at = NOW()
  FROM seller_revenue AS sr
  WHERE s.seller_id = sr.seller_id;

  GET DIAGNOSTICS v_updated = ROW_COUNT;

  -- Step 2: credit cashback to Diamond and Platinum sellers
  UPDATE seller_wallets AS w
  SET balance = balance + (s.current_month_revenue * 0.02)
  FROM sellers AS s
  WHERE w.seller_id = s.seller_id
    AND s.seller_tier IN ('Diamond', 'Platinum')
    AND s.tier_updated_at >= NOW() - INTERVAL '1 minute';

  -- Step 3: commit and update log
  UPDATE batch_log
  SET
    finished_at    = NOW(),
    rows_processed = v_updated,
    status         = 'success'
  WHERE id = v_run_id;

  COMMIT;

  RAISE NOTICE 'Tier update complete: % sellers updated in % → %',
    v_updated, p_month_start, v_month_end;

EXCEPTION WHEN OTHERS THEN
  UPDATE batch_log
  SET status = 'failed', error_msg = SQLERRM, finished_at = NOW()
  WHERE id = v_run_id;
  COMMIT;
  RAISE;
END;
$$;

-- Scheduled with pg_cron every night at 2:00 AM:
-- SELECT cron.schedule('nightly-tier-update', '0 2 * * *',
--   $$CALL sp_nightly_seller_tier_update()$$);`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate the tier calculation the procedure would perform
-- (FreshCart equivalent: seller = store, orders = store orders)
WITH store_revenue AS (
  SELECT
    store_id,
    ROUND(SUM(total_amount), 2)  AS monthly_revenue,
    COUNT(*)                     AS order_count
  FROM orders
  WHERE order_status = 'Delivered'
    AND order_date >= '2024-01-01'
  GROUP BY store_id
)
SELECT
  s.store_id,
  s.city,
  sr.monthly_revenue,
  sr.order_count,
  CASE
    WHEN sr.monthly_revenue >= 5000 THEN 'Diamond'
    WHEN sr.monthly_revenue >= 3000 THEN 'Platinum'
    WHEN sr.monthly_revenue >= 1000 THEN 'Gold'
    WHEN sr.monthly_revenue >= 500  THEN 'Silver'
    ELSE 'Bronze'
  END                             AS new_tier,
  -- Cashback for top tiers (2% of revenue)
  CASE
    WHEN sr.monthly_revenue >= 3000
    THEN ROUND(sr.monthly_revenue * 0.02, 2)
    ELSE 0
  END                             AS cashback_credited
FROM stores AS s
JOIN store_revenue AS sr ON s.store_id = sr.store_id
ORDER BY monthly_revenue DESC;`}
        height={275}
        showSchema={true}
      />

      <TimeBlock time="2:00:18 AM" label="Job complete — 18 seconds instead of 25 minutes">
        The set-based UPDATE eliminates all Python-to-database round trips. The entire computation runs inside PostgreSQL's query engine, which is optimised exactly for this kind of bulk update. Logging and cashback crediting are part of the same procedure call — atomic, consistent, and auditable.
      </TimeBlock>

      <ProTip>
        The biggest performance win from stored procedures is eliminating row-by-row processing. If your application fetches rows, processes each one in a loop, and issues individual UPDATEs — you can almost always replace that with a single set-based UPDATE inside a stored procedure. Set-based operations in the database are orders of magnitude faster than row-by-row loops because they avoid network round trips and allow the query engine to optimise the entire operation as a unit.
      </ProTip>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is a stored procedure and how does it differ from a function?">
        <p style={{ margin: '0 0 14px' }}>A stored procedure is a named, reusable program stored inside the database that performs actions — INSERT, UPDATE, DELETE, manage transactions, and execute complex multi-step logic. It is called with CALL and typically does not return a value (though PostgreSQL procedures support INOUT parameters for output values). Stored procedures in PostgreSQL (11+) can contain COMMIT and ROLLBACK statements, making them suitable for batch jobs where each step should commit independently.</p>
        <p style={{ margin: '0 0 14px' }}>A function also lives in the database as named reusable code, but it must return a value — a scalar value, a row, or a full table. Functions are called inline in SQL expressions: SELECT fn_name(args), WHERE fn_name(col) &gt; threshold, or SELECT * FROM table_valued_fn(args). Functions cannot contain COMMIT or ROLLBACK — they run within the caller's transaction. Functions are preferred when you need to return a computed value or result set that other SQL queries can use.</p>
        <p style={{ margin: 0 }}>In practice: use a function when you need a reusable computation that returns a value and you want to use it in SELECT, WHERE, or JOIN. Use a procedure when you need to perform a multi-step workflow with transaction control, or when the operation is an action (process orders, upgrade tiers, archive data) rather than a computation. Many PostgreSQL teams use functions for almost everything and reach for procedures only when they need COMMIT/ROLLBACK inside the database-side logic.</p>
      </IQ>

      <IQ q="What are the advantages of using stored procedures over application-layer code?">
        <p style={{ margin: '0 0 14px' }}>Performance: stored procedures eliminate round trips between the application and database for multi-step operations. A procedure that updates 50,000 rows executes entirely inside the database engine with no network latency per row. The equivalent application code (fetch → compute → update per row) pays network latency and serialization overhead for each row. For bulk operations, the speedup is often 10-100x.</p>
        <p style={{ margin: '0 0 14px' }}>Consistency: business logic in a stored procedure is enforced for all clients regardless of which application, script, or tool is writing to the database. A validation rule implemented in a Python service does not protect against a Ruby script or a direct psql command bypassing it. A stored procedure (with appropriate GRANT/REVOKE permissions) ensures every write goes through the same validation path.</p>
        <p style={{ margin: 0 }}>Security: stored procedures enable a principle of least privilege — applications can be granted EXECUTE on the procedure but have no direct INSERT/UPDATE/DELETE permission on the underlying tables. This prevents applications from bypassing business rules via direct DML. Reduced network exposure: sensitive data (raw customer PII, financial records) stays inside the database rather than being sent to application servers for processing. Atomicity: complex multi-step workflows are wrapped in a single procedure call with proper exception handling and transaction control — simpler and more reliable than coordinating multi-step atomicity from application code.</p>
      </IQ>

      <IQ q="How do you handle errors inside a stored procedure?">
        <p style={{ margin: '0 0 14px' }}>PL/pgSQL uses BEGIN...EXCEPTION...END blocks. The normal logic goes in BEGIN. If any statement raises an exception, execution jumps to the EXCEPTION section. You can catch specific exception types by name (unique_violation, foreign_key_violation, division_by_zero) or use WHEN OTHERS to catch any exception.</p>
        <p style={{ margin: '0 0 14px' }}>The EXCEPTION block has access to special variables: SQLERRM contains the error message text, SQLSTATE contains the five-character error code. You can use these to log errors, construct meaningful messages, or branch differently based on the error type. To raise your own exceptions: RAISE EXCEPTION 'message %', variable re-raises the current exception. RAISE NOTICE logs a message (visible to the client). RAISE WARNING generates a warning. RAISE EXCEPTION with USING ERRCODE = 'P0001' sets a custom error code that the caller can check.</p>
        <p style={{ margin: 0 }}>An important subtlety: when an exception is caught in the EXCEPTION block, the database implicitly rolls back all changes made in the BEGIN block up to that point — the EXCEPTION block starts with a clean slate. This means you can insert into an error log table within the EXCEPTION block and those inserts will succeed even though the main operation failed. If you COMMIT within the procedure before the error, those committed changes are permanent — only changes after the last COMMIT are rolled back. For batch procedures, catching exceptions per row (via a nested BEGIN...EXCEPTION inside the FOR loop) allows one failing row to be logged and skipped while the rest of the batch continues successfully.</p>
      </IQ>

      <IQ q="What is the difference between RAISE NOTICE, RAISE WARNING, and RAISE EXCEPTION?">
        <p style={{ margin: '0 0 14px' }}>All three are PL/pgSQL messages but they have different severity levels and different effects on execution. RAISE NOTICE prints an informational message to the client — it does not affect execution. The procedure continues normally after RAISE NOTICE. Messages appear in psql output and in application log captures depending on the client_min_messages setting. RAISE NOTICE is used for debugging and progress reporting during development or long-running jobs.</p>
        <p style={{ margin: '0 0 14px' }}>RAISE WARNING is similar to NOTICE but carries a higher severity — it signals that something unusual happened but the procedure can still continue. Warnings are logged at a different level and may appear in database logs depending on log_min_messages. Like NOTICE, execution continues normally after RAISE WARNING.</p>
        <p style={{ margin: 0 }}>RAISE EXCEPTION is the only one that stops execution. It raises a database exception that propagates up through the call stack like any other error. If uncaught, it rolls back the current transaction and returns the error to the caller. If caught in an EXCEPTION block, that block handles it. RAISE EXCEPTION is the mechanism for enforcing business rules — when an invalid state is detected, RAISE EXCEPTION communicates the error to the caller and ensures the transaction is aborted. The optional USING clause allows attaching an ERRCODE: RAISE EXCEPTION 'message' USING ERRCODE = 'P0001' lets the caller distinguish between different types of business rule violations by inspecting the SQLSTATE code.</p>
      </IQ>

      <IQ q="When would you choose a stored procedure over a trigger?">
        <p style={{ margin: '0 0 14px' }}>A stored procedure is explicitly called — an application, scheduler, or another procedure invokes it. It runs when you tell it to run. A trigger is implicitly called — the database fires it automatically in response to an event (INSERT, UPDATE, DELETE, or TRUNCATE on a specific table). The choice depends on whether the logic should be automatic or explicit.</p>
        <p style={{ margin: '0 0 14px' }}>Use a stored procedure when: the logic represents a business workflow that should be invoked by a specific action (process a batch, upgrade tiers, generate reports). The caller needs to know when and how the logic runs. The logic needs parameters that vary per call. The logic should run within a controlled transaction context. The logic is called from multiple places and needs a consistent interface.</p>
        <p style={{ margin: 0 }}>Use a trigger when: the logic must always run in response to a table modification, regardless of which application or query caused the modification — ensuring no direct DML can bypass the logic. Classic trigger use cases: automatically maintaining an audit log every time a row changes (a trigger cannot be bypassed by application code the way a stored procedure can), cascading denormalized data (updating a summary table when detail rows change), enforcing complex multi-table constraints that CHECK constraints cannot express, and auto-populating derived columns on INSERT or UPDATE. The key difference: procedures are for explicit, intentional workflows. Triggers are for automatic, always-enforced side effects of table modifications.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: control reached end of function without RETURN"
        cause="A PL/pgSQL function (not procedure) that declares a return type does not have a RETURN statement in all code paths. If conditional branches in the function can reach the END; without executing a RETURN, PostgreSQL raises this error at runtime. A procedure does not need RETURN (it uses INOUT parameters or nothing), but a function must always return a value."
        fix="Add RETURN statements to all code paths, including the default case. For RETURN QUERY functions, ensure the RETURN QUERY executes in all branches. If the function genuinely has cases where nothing should be returned, use RETURN NULL; for scalar functions or RETURN; for SETOF functions. Use RETURN NEXT inside loops for SETOF functions that accumulate rows. Trace every IF/ELSIF/ELSE branch and verify each has a RETURN."
      />

      <Err
        msg="ERROR: COMMIT is not allowed in a SQL function"
        cause="A COMMIT or ROLLBACK statement was placed inside a PostgreSQL FUNCTION (created with CREATE FUNCTION). Functions cannot manage transactions because they run within the caller's transaction. COMMIT inside a function would commit the caller's entire transaction, which is not the function's responsibility and would violate the caller's expectations."
        fix="Convert the routine to a PROCEDURE (CREATE PROCEDURE) instead of a FUNCTION. Procedures in PostgreSQL 11+ support COMMIT and ROLLBACK. Call it with CALL instead of SELECT. If transaction control is needed alongside returning a value, use INOUT parameters on the procedure to pass back computed values. If the routine only needs to return a value without transaction control, keep it as a function and remove COMMIT/ROLLBACK."
      />

      <Err
        msg="ERROR: query has no destination for result data — SELECT INTO required"
        cause="A plain SELECT statement inside a PL/pgSQL procedure or function discards its results. In PL/pgSQL, a bare SELECT with no INTO clause raises this error because the results have nowhere to go. PL/pgSQL requires either SELECT INTO variable to capture results or a PERFORM statement to discard results explicitly."
        fix="To capture results: SELECT col INTO v_variable FROM table WHERE condition. For multiple columns: SELECT col1, col2 INTO v_var1, v_var2 FROM table. To discard results intentionally: PERFORM expensive_function_call(); — PERFORM is the PL/pgSQL way of calling a function and discarding its return value. For dynamic SQL: use EXECUTE ... INTO for capturing results from dynamically built queries."
      />

      <Err
        msg="Stored procedure runs correctly in development but causes deadlocks in production"
        cause="The procedure acquires locks in an inconsistent order compared to other concurrent procedures or application queries. In production under concurrent load, two sessions run the same procedure simultaneously and each acquires locks in a different order, creating a circular wait. This is invisible in single-session development testing."
        fix="Audit all lock acquisition order within the procedure. Ensure every session that needs to update multiple rows always updates them in the same order (by primary key ascending, for example). Add ORDER BY to any FOR loop that performs updates: FOR v_row IN SELECT ... ORDER BY id LOOP — this ensures all sessions process rows in the same order. For queue-style procedures, use SELECT ... FOR UPDATE SKIP LOCKED to ensure each session picks up a different row rather than competing for the same one. Test with multiple concurrent sessions in a staging environment before deploying to production."
      />

      <Err
        msg="Procedure changes are not visible after calling it — rows not updated"
        cause="Three possible causes: (1) The procedure lacks a COMMIT and the changes are being rolled back by the caller's transaction or at session end. (2) The UPDATE's WHERE condition does not match any rows — FOUND variable is FALSE but no exception was raised. (3) The procedure is committing to a different database/schema than the one being queried for verification."
        fix="Check whether the procedure needs explicit COMMIT (procedures) or whether the caller should COMMIT after CALL. Verify the WHERE condition matches rows: add SELECT COUNT(*) INTO v_count FROM table WHERE condition; IF v_count = 0 THEN RAISE NOTICE 'No rows matched'; END IF; before the UPDATE. Use GET DIAGNOSTICS v_rows = ROW_COUNT; immediately after the UPDATE to check how many rows were actually modified. Check the search_path: the procedure may be updating a table in a different schema than the one being queried for verification."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Design two stored procedures for FreshCart. (1) Write the CREATE PROCEDURE statement for sp_daily_store_summary that takes a p_summary_date DATE parameter (defaulting to CURRENT_DATE - 1) and computes for each store: total delivered orders, total revenue, average order value, and the store's best-selling product category (by revenue). The procedure should INSERT these results into a store_daily_summary table and log the run with a RAISE NOTICE showing how many stores were processed. Use a CTE inside the procedure for the category calculation. (2) Write the CREATE PROCEDURE statement for sp_reorder_low_stock that takes a p_threshold INTEGER parameter (default 5) and for every product where in_stock = false (simulating low stock), INSERTs a reorder request into a reorder_queue table with product_id, product_name, category, unit_price, and requested_at = NOW(). It should use a FOR loop over the low-stock products and count how many reorder requests were created. Show the DECLARE section, the logic, exception handling, and what a CALL would look like for each."
        hint="Procedure 1: CTE with RANK() OVER (PARTITION BY store_id ORDER BY category_revenue DESC) to get best category per store, then INSERT ... SELECT from the CTE. Procedure 2: FOR v_product IN SELECT ... WHERE NOT in_stock LOOP INSERT ... v_count := v_count + 1; END LOOP."
        answer={`-- Procedure 1: Daily store summary
CREATE OR REPLACE PROCEDURE sp_daily_store_summary(
  p_summary_date  DATE DEFAULT (CURRENT_DATE - 1)
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_stores_processed  INTEGER := 0;
BEGIN
  -- Insert summary for each store using a CTE
  -- to determine best-selling category by revenue
  WITH order_data AS (
    SELECT
      o.store_id,
      p.category,
      COUNT(DISTINCT o.order_id)              AS order_count,
      ROUND(SUM(o.total_amount), 2)           AS store_revenue,
      ROUND(AVG(o.total_amount), 2)           AS avg_order_value,
      ROUND(SUM(oi.line_total), 2)            AS category_revenue
    FROM orders      AS o
    JOIN order_items AS oi ON o.order_id    = oi.order_id
    JOIN products    AS p  ON oi.product_id = p.product_id
    WHERE o.order_status = 'Delivered'
      AND o.order_date   = p_summary_date
    GROUP BY o.store_id, p.category
  ),
  ranked_categories AS (
    SELECT
      store_id,
      order_count,
      store_revenue,
      avg_order_value,
      category                                AS best_category,
      RANK() OVER (
        PARTITION BY store_id
        ORDER BY category_revenue DESC
      )                                       AS cat_rank
    FROM order_data
  )
  INSERT INTO store_daily_summary (
    store_id, summary_date, order_count,
    total_revenue, avg_order_value, best_category, created_at
  )
  SELECT
    store_id, p_summary_date, order_count,
    store_revenue, avg_order_value, best_category, NOW()
  FROM ranked_categories
  WHERE cat_rank = 1;

  GET DIAGNOSTICS v_stores_processed = ROW_COUNT;

  RAISE NOTICE 'Daily summary complete for %: % stores processed',
    p_summary_date, v_stores_processed;

EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Error in sp_daily_store_summary: %', SQLERRM;
  RAISE;
END;
$$;

-- Call:
-- CALL sp_daily_store_summary();                    -- yesterday
-- CALL sp_daily_store_summary('2024-01-15'::DATE);  -- specific date

-- ──────────────────────────────────────────

-- Procedure 2: Reorder low-stock products
CREATE OR REPLACE PROCEDURE sp_reorder_low_stock(
  p_threshold  INTEGER DEFAULT 5
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_product     RECORD;
  v_count       INTEGER := 0;
BEGIN
  -- Loop over all out-of-stock products
  -- (in_stock = false simulates stock below threshold)
  FOR v_product IN
    SELECT product_id, product_name, category, unit_price
    FROM products
    WHERE in_stock = false
    ORDER BY category, product_id
  LOOP
    -- Insert a reorder request for each low-stock product
    INSERT INTO reorder_queue (
      product_id, product_name, category,
      unit_price, requested_at, status
    )
    VALUES (
      v_product.product_id,
      v_product.product_name,
      v_product.category,
      v_product.unit_price,
      NOW(),
      'pending'
    )
    ON CONFLICT (product_id) DO UPDATE
      SET requested_at = NOW(),
          status       = 'pending';

    v_count := v_count + 1;
  END LOOP;

  RAISE NOTICE 'Reorder queue: % products queued (threshold: %)',
    v_count, p_threshold;

EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Error in sp_reorder_low_stock: %', SQLERRM;
  RAISE;
END;
$$;

-- Call:
-- CALL sp_reorder_low_stock();      -- default threshold of 5
-- CALL sp_reorder_low_stock(10);    -- custom threshold`}
        explanation="Procedure 1 uses a two-level CTE inside the INSERT statement. order_data aggregates at the (store, category) level to get category-level revenue alongside store-level totals. ranked_categories applies RANK() OVER (PARTITION BY store_id ORDER BY category_revenue DESC) to identify the best-selling category per store — WHERE cat_rank = 1 in the outer INSERT keeps only the top category per store. GET DIAGNOSTICS v_stores_processed = ROW_COUNT captures how many rows the INSERT actually wrote, giving an accurate store count for the RAISE NOTICE. The EXCEPTION block logs and re-raises so callers know the procedure failed. Procedure 2 uses a FOR loop with a RECORD variable — each iteration processes one out-of-stock product and inserts a reorder request. ON CONFLICT (product_id) DO UPDATE handles the case where a product is already in the reorder queue — it updates the timestamp and resets status to 'pending' rather than failing on a duplicate key. The count increments inside the loop giving an accurate total. Both procedures follow the pattern: DECLARE variables → BEGIN logic → EXCEPTION handler → RAISE NOTICE with results."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'A stored procedure is a named program stored in the database, called with CALL. It performs actions (DML, transaction control), takes parameters, and can contain variables, conditional logic, loops, and exception handling.',
          'Procedure vs function: functions return a value and are usable in SELECT/WHERE/JOIN. Procedures return nothing (or INOUT params) and cannot be used inline in SQL. Only procedures can COMMIT/ROLLBACK in PostgreSQL.',
          'Parameter modes: IN (input, default), OUT (output to caller), INOUT (both). In PostgreSQL, functions are often preferred over OUT/INOUT procedures when return values are needed.',
          'DECLARE block: local variables are declared here with their types. Variables can have default values. RECORD type holds one row of any shape for use in FOR loops.',
          'Control flow: IF/ELSIF/ELSE for conditionals. FOR loop over a query for row iteration. WHILE and plain LOOP with EXIT WHEN for condition-based loops.',
          'Exception handling: EXCEPTION block after BEGIN catches errors. WHEN unique_violation, WHEN foreign_key_violation, WHEN OTHERS for different error types. SQLERRM for the error message, SQLSTATE for the error code.',
          'RAISE NOTICE logs a message without stopping execution. RAISE WARNING signals a concern without stopping. RAISE EXCEPTION aborts execution and propagates an error to the caller.',
          'Transaction control: PostgreSQL procedures (11+) can COMMIT and ROLLBACK inside the body. This enables batch jobs where each row or batch commits independently — one failure does not roll back the entire job.',
          'The biggest performance win: replacing row-by-row application loops (fetch → compute → update per row) with a single set-based UPDATE inside a procedure eliminates network round trips and is 10-100x faster for bulk operations.',
          'Stored procedures enforce business rules for all clients — no application can bypass logic in a procedure if direct table access is revoked. Grant EXECUTE on the procedure, revoke direct DML on the table.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 49</strong>, you learn User-Defined Functions — scalar functions, table-valued functions, SQL functions vs PL/pgSQL functions, IMMUTABLE vs STABLE vs VOLATILE, and building a reusable function library.
        </p>
        <Link href="/learn/sql/user-defined-functions" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 49 → User-Defined Functions
        </Link>
      </div>

    </LearnLayout>
  );
}