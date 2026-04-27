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

const TrigCard = ({ timing, color, when, newOld, canModify, use }: {
  timing: string; color: string; when: string; newOld: string; canModify: string; use: string;
}) => (
  <div style={{ background: 'var(--surface)', border: `1px solid ${color}30`, borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
    <div style={{ padding: '10px 16px', background: `${color}10`, borderBottom: `1px solid ${color}20` }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color }}>{timing}</span>
    </div>
    <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))', gap: 12 }}>
      {[['Fires', when], ['NEW / OLD access', newOld], ['Can modify row?', canModify], ['Best for', use]].map(([label, val]) => (
        <div key={label}>
          <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '0 0 4px' }}>{label}</p>
          <p style={{ fontSize: 12, color: 'var(--text)', margin: 0, lineHeight: 1.5 }}>{val}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function Triggers() {
  return (
    <LearnLayout
      title="Triggers"
      description="Automatic database responses to data changes — BEFORE and AFTER triggers, row-level vs statement-level, the NEW and OLD records, audit logging, cascading updates, and when triggers hurt more than they help"
      section="SQL — Module 50"
      readTime="33 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="What a Trigger Is — Automatic Reactions to Data Changes" />

      <P>A trigger is a <Hl>named database object that fires automatically</Hl> when a specified event occurs on a table — INSERT, UPDATE, DELETE, or TRUNCATE. Unlike stored procedures (which are called explicitly), triggers execute invisibly in response to DML. No application code needs to call them. They run whether the DML comes from a web app, an API, a batch job, or a direct psql session.</P>

      <P>This automatic, bypass-proof nature is both triggers' superpower and their danger. A trigger that maintains an audit log fires for every write — even writes from scripts that forget to log, even writes made directly in the database console. But a trigger that has a bug introduces that bug silently into every write — and can be very hard to debug.</P>

      <CodeBlock
        label="Trigger anatomy — the two-object pattern"
        code={`-- Triggers in PostgreSQL require TWO objects:
-- 1. A trigger FUNCTION (the logic — written in PL/pgSQL)
-- 2. A trigger DEFINITION (the event binding — which table, when, what)

-- Step 1: create the trigger function
-- Must return TRIGGER type
CREATE OR REPLACE FUNCTION tgf_function_name()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Access the new/old row:
  -- NEW: the row being inserted or updated (after change)
  -- OLD: the row before update or the row being deleted

  -- For BEFORE triggers: can modify NEW before it is written
  NEW.updated_at := NOW();
  RETURN NEW;   -- must RETURN NEW (or OLD for DELETE, or NULL to cancel)

  -- For AFTER triggers: NEW/OLD are read-only; return value ignored
  -- but must still return NEW or OLD by convention
END;
$$;

-- Step 2: bind the trigger function to a table and event
CREATE TRIGGER trigger_name
  BEFORE INSERT OR UPDATE    -- timing + event(s)
  ON table_name              -- which table
  FOR EACH ROW               -- row-level (vs FOR EACH STATEMENT)
  EXECUTE FUNCTION tgf_function_name();`}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Timing — BEFORE vs AFTER" />

      <TrigCard
        timing="BEFORE trigger"
        color={C}
        when="Before the row is written to the table"
        newOld="NEW is writable — changes to NEW affect the stored value. OLD is readable."
        canModify="Yes — modify NEW.col := value to change what gets stored"
        use="Auto-populate fields (updated_at, slug), validate and reject rows (RETURN NULL), normalise data before storage"
      />
      <TrigCard
        timing="AFTER trigger"
        color="#10b981"
        when="After the row is successfully written — change is already committed to the table"
        newOld="NEW and OLD are read-only. The row is already in the table."
        canModify="No — row is already written. Can INSERT/UPDATE other tables."
        use="Audit logging, cascading updates to related tables, sending notifications, maintaining denormalized counts"
      />
      <TrigCard
        timing="INSTEAD OF trigger"
        color="#8b5cf6"
        when="Replaces the DML entirely — original INSERT/UPDATE/DELETE does NOT execute"
        newOld="NEW and OLD as defined by the view. The trigger decides what actually happens."
        canModify="Full control — trigger defines all database modifications"
        use="Making non-updatable views accept DML (views with JOINs, aggregates)"
      />

      <CodeBlock
        label="BEFORE vs AFTER — which to choose"
        code={`-- BEFORE: modify the data before it lands
-- Use to auto-fill columns the application should not have to set
CREATE TRIGGER trg_orders_before_insert
  BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION tgf_set_order_defaults();
-- tgf sets: created_at, updated_at, order_number, etc.

-- AFTER: react to a confirmed change
-- Use to update derived tables, log changes, notify other services
CREATE TRIGGER trg_orders_after_status_change
  AFTER UPDATE OF order_status ON orders
  FOR EACH ROW EXECUTE FUNCTION tgf_log_status_change();
-- tgf inserts into order_status_log when status changes

-- Cannot use BEFORE to log — the row might be rejected by a constraint
-- after the BEFORE trigger runs. Log in AFTER to guarantee the row landed.

-- Cannot use AFTER to change the row being inserted — it's already written.
-- Change data in BEFORE, react to data in AFTER.`}
      />

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Row-Level vs Statement-Level Triggers" />

      <CodeBlock
        label="FOR EACH ROW vs FOR EACH STATEMENT"
        code={`-- ROW-LEVEL (FOR EACH ROW):
-- Fires ONCE PER ROW affected by the DML statement
-- Has access to NEW and OLD (the specific row being changed)
-- Most common type — used for audit logs, auto-populate, validation

CREATE TRIGGER trg_row_level
  AFTER INSERT ON orders
  FOR EACH ROW                     -- fires once per inserted row
  EXECUTE FUNCTION tgf_log_insert();

-- INSERT INTO orders VALUES (...), (...), (...);
-- → trigger fires 3 times (once per row)

-- STATEMENT-LEVEL (FOR EACH STATEMENT):
-- Fires ONCE PER SQL STATEMENT regardless of rows affected
-- Does NOT have access to NEW or OLD (no specific row context)
-- Has access to transition tables (NEW TABLE / OLD TABLE) in PostgreSQL 10+

CREATE TRIGGER trg_statement_level
  AFTER INSERT ON orders
  FOR EACH STATEMENT               -- fires once regardless of row count
  EXECUTE FUNCTION tgf_log_batch_insert();

-- INSERT INTO orders VALUES (...), (...), (...);
-- → trigger fires ONCE (not three times)

-- When to use STATEMENT-LEVEL:
-- Refreshing a materialized view after a bulk load
-- Sending one notification per batch (not one per row)
-- Performance-sensitive operations where per-row overhead is too high`}
      />

      <SQLPlayground
        initialQuery={`-- Visualise what BEFORE vs AFTER triggers see
-- Simulating the NEW and OLD records for various events

-- For an UPDATE on order_id = 1 changing status to 'Delivered':
SELECT
  'OLD record (before update)' AS context,
  order_id,
  order_status,
  delivery_date
FROM orders WHERE order_id = 1

UNION ALL

-- After update: NEW record would look like:
SELECT
  'NEW record (after update)' AS context,
  order_id,
  'Delivered'               AS order_status,   -- what NEW.order_status would be
  CURRENT_DATE              AS delivery_date   -- what NEW.delivery_date would be
FROM orders WHERE order_id = 1;`}
        height={200}
        showSchema={true}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="NEW and OLD — Accessing the Changed Row" />

      <P>Inside a row-level trigger function, <Hl>NEW</Hl> holds the row after the change and <Hl>OLD</Hl> holds the row before. Which is available depends on the DML event:</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Event', 'NEW available?', 'OLD available?', 'RETURN value'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['INSERT', '✅ Yes — the new row being inserted', '❌ No', 'RETURN NEW (or NULL to cancel insert)'],
              ['UPDATE', '✅ Yes — the row after the update', '✅ Yes — the row before the update', 'RETURN NEW (modified or original)'],
              ['DELETE', '❌ No', '✅ Yes — the row being deleted', 'RETURN OLD (or NULL to cancel delete)'],
              ['TRUNCATE', '❌ No', '❌ No', 'N/A — statement-level only'],
            ].map(([event, newA, oldA, ret], i) => (
              <tr key={event} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{event}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: newA.startsWith('✅') ? '#00e676' : '#ff4757', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{newA}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: oldA.startsWith('✅') ? '#00e676' : '#ff4757', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{oldA}</td>
                <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.5 }}>{ret}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CodeBlock
        label="Using NEW and OLD in trigger functions"
        code={`-- Access individual columns with NEW.column_name / OLD.column_name
CREATE OR REPLACE FUNCTION tgf_detect_status_change()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  -- OLD.order_status: status before the update
  -- NEW.order_status: status after the update
  IF OLD.order_status != NEW.order_status THEN
    INSERT INTO order_status_log (
      order_id, old_status, new_status, changed_at, changed_by
    ) VALUES (
      NEW.order_id,
      OLD.order_status,
      NEW.order_status,
      NOW(),
      current_user
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Modify NEW in a BEFORE trigger to change what gets stored:
CREATE OR REPLACE FUNCTION tgf_normalise_customer()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  -- Clean and standardise before storage
  NEW.first_name := INITCAP(LOWER(TRIM(NEW.first_name)));
  NEW.last_name  := INITCAP(LOWER(TRIM(NEW.last_name)));
  NEW.email      := LOWER(TRIM(NEW.email));
  NEW.created_at := NOW();
  RETURN NEW;   -- stored row uses these modified values
END;
$$;`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate what tgf_detect_status_change would log
-- for a status change on order_id = 1
SELECT
  1                   AS order_id,
  'Processing'        AS old_status,
  'Delivered'         AS new_status,
  NOW()               AS changed_at,
  'app_user'          AS changed_by,
  -- Only log if status actually changed (the IF condition)
  CASE WHEN 'Processing' != 'Delivered'
    THEN 'Would INSERT into order_status_log'
    ELSE 'No change — trigger body skips INSERT'
  END                 AS trigger_action;`}
        height={165}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="The Audit Log Pattern — The Most Common Trigger Use Case" />

      <P>Audit logging is the single most valuable use of triggers. Every change to a sensitive table — who changed what, from what value, to what value, when, and from which session — is recorded automatically. No application code can bypass it because the trigger fires at the database level regardless of where the DML originated.</P>

      <CodeBlock
        label="Complete audit log trigger — production pattern"
        code={`-- Step 1: create the audit log table
CREATE TABLE orders_audit_log (
  log_id        BIGSERIAL PRIMARY KEY,
  order_id      INTEGER       NOT NULL,
  operation     TEXT          NOT NULL,   -- INSERT, UPDATE, DELETE
  old_data      JSONB,                    -- full old row as JSON (NULL for INSERT)
  new_data      JSONB,                    -- full new row as JSON (NULL for DELETE)
  changed_cols  TEXT[],                  -- which columns changed (UPDATE only)
  changed_by    TEXT          NOT NULL DEFAULT current_user,
  changed_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  client_addr   INET                     -- IP of the connecting client
);

-- Step 2: create the trigger function
CREATE OR REPLACE FUNCTION tgf_audit_orders()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER              -- runs as creator — can write audit table
SET search_path = public
AS $$
BEGIN
  INSERT INTO orders_audit_log (
    order_id,
    operation,
    old_data,
    new_data,
    changed_cols,
    changed_by,
    changed_at,
    client_addr
  ) VALUES (
    COALESCE(NEW.order_id, OLD.order_id),
    TG_OP,                               -- 'INSERT', 'UPDATE', or 'DELETE'
    CASE WHEN TG_OP = 'INSERT' THEN NULL
         ELSE to_jsonb(OLD) END,
    CASE WHEN TG_OP = 'DELETE' THEN NULL
         ELSE to_jsonb(NEW) END,
    CASE WHEN TG_OP = 'UPDATE'
      THEN ARRAY(
        SELECT key FROM jsonb_each(to_jsonb(NEW))
        WHERE to_jsonb(NEW)->key IS DISTINCT FROM to_jsonb(OLD)->key
      )
      ELSE NULL END,
    current_user,
    NOW(),
    inet_client_addr()
  );
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Step 3: bind to the orders table
CREATE TRIGGER trg_audit_orders
  AFTER INSERT OR UPDATE OR DELETE
  ON orders
  FOR EACH ROW
  EXECUTE FUNCTION tgf_audit_orders();`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate the audit log entries that would be created
-- for a series of operations on orders

-- Entry 1: INSERT of a new order
SELECT
  1                                     AS order_id,
  'INSERT'                              AS operation,
  NULL::TEXT                            AS old_data,
  '{"order_id":1,"status":"Processing","total":850.00}'::TEXT AS new_data,
  NULL::TEXT[]                          AS changed_cols,
  'app_user'                            AS changed_by,
  NOW()                                 AS changed_at

UNION ALL

-- Entry 2: UPDATE changing status
SELECT
  1,
  'UPDATE',
  '{"order_id":1,"status":"Processing","total":850.00}',
  '{"order_id":1,"status":"Delivered","total":850.00}',
  ARRAY['order_status','delivery_date'],
  'app_user',
  NOW() + INTERVAL '2 days'

UNION ALL

-- What TG_OP special variable contains per event
SELECT
  NULL,
  'TG_OP values' AS operation,
  'DELETE = ''DELETE''' AS old_data,
  'INSERT = ''INSERT'', UPDATE = ''UPDATE''' AS new_data,
  NULL,
  'PostgreSQL special var',
  NOW();`}
        height={265}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Auto-Populate Triggers — BEFORE INSERT Patterns" />

      <P>BEFORE INSERT triggers automatically fill in columns the application should not have to set — timestamps, generated codes, slugs, default values derived from other columns. This keeps application code clean and ensures consistency even when data is written through different paths.</P>

      <CodeBlock
        label="Auto-populate trigger patterns"
        code={`-- Pattern 1: auto-set timestamps
CREATE OR REPLACE FUNCTION tgf_set_timestamps()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.created_at := NOW();
  END IF;
  NEW.updated_at := NOW();   -- always update on INSERT or UPDATE
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_customers_timestamps
  BEFORE INSERT OR UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION tgf_set_timestamps();

-- Pattern 2: generate a human-readable order number
CREATE OR REPLACE FUNCTION tgf_generate_order_number()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  -- Format: ORD-YYYYMMDD-NNNN (date + zero-padded sequence)
  NEW.order_number := 'ORD-'
    || TO_CHAR(NOW(), 'YYYYMMDD') || '-'
    || LPAD(NEW.order_id::TEXT, 4, '0');
  RETURN NEW;
END;
$$;

-- Pattern 3: normalise data before storage
CREATE OR REPLACE FUNCTION tgf_normalise_customer_data()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.first_name    := INITCAP(LOWER(TRIM(NEW.first_name)));
  NEW.last_name     := INITCAP(LOWER(TRIM(NEW.last_name)));
  NEW.email         := LOWER(TRIM(NEW.email));
  NEW.city          := INITCAP(LOWER(TRIM(NEW.city)));
  -- Set default loyalty tier if not provided
  IF NEW.loyalty_tier IS NULL THEN
    NEW.loyalty_tier := 'Bronze';
  END IF;
  RETURN NEW;
END;
$$;

-- Pattern 4: prevent updates to immutable fields
CREATE OR REPLACE FUNCTION tgf_protect_created_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  -- created_at must never change after insert
  NEW.created_at := OLD.created_at;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_orders_protect_created_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION tgf_protect_created_at();`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate tgf_normalise_customer_data on raw input
-- Shows what the trigger would store after normalisation
SELECT
  -- Raw inputs (as an app might submit them)
  '  priya  '            AS raw_first_name,
  '  SHARMA '            AS raw_last_name,
  'Priya.Sharma@GMAIL.COM' AS raw_email,
  'BANGALORE'            AS raw_city,
  NULL                   AS raw_loyalty_tier,

  -- What BEFORE INSERT trigger would store:
  INITCAP(LOWER(TRIM('  priya  ')))              AS stored_first_name,
  INITCAP(LOWER(TRIM('  SHARMA ')))              AS stored_last_name,
  LOWER(TRIM('Priya.Sharma@GMAIL.COM'))          AS stored_email,
  INITCAP(LOWER(TRIM('BANGALORE')))              AS stored_city,
  COALESCE(NULL, 'Bronze')                       AS stored_loyalty_tier;`}
        height={215}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Validation Triggers — Reject Invalid DML" />

      <P>A BEFORE trigger can <Hl>cancel the DML</Hl> by returning NULL (for row-level triggers) or raising an exception. This enforces business rules that CHECK constraints cannot express — multi-table validations, time-based restrictions, computed field constraints.</P>

      <CodeBlock
        label="Validation trigger — reject invalid data"
        code={`-- Reject orders that reference an out-of-stock product
CREATE OR REPLACE FUNCTION tgf_validate_order_item()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  v_in_stock BOOLEAN;
BEGIN
  SELECT in_stock INTO v_in_stock
  FROM products WHERE product_id = NEW.product_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Product % does not exist', NEW.product_id
      USING ERRCODE = 'P0001';
  END IF;

  IF NOT v_in_stock THEN
    RAISE EXCEPTION 'Product % is out of stock — order rejected', NEW.product_id
      USING ERRCODE = 'P0002';
  END IF;

  RETURN NEW;   -- allow the INSERT to proceed
END;
$$;

CREATE TRIGGER trg_order_items_validate
  BEFORE INSERT ON order_items
  FOR EACH ROW EXECUTE FUNCTION tgf_validate_order_item();

-- Reject status regressions (Delivered → Processing is invalid)
CREATE OR REPLACE FUNCTION tgf_validate_order_status()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  -- Define valid transitions as an array of (from, to) pairs
  v_valid BOOLEAN := FALSE;
BEGIN
  v_valid := CASE OLD.order_status
    WHEN 'Processing' THEN NEW.order_status IN ('Confirmed','Cancelled')
    WHEN 'Confirmed'  THEN NEW.order_status IN ('Delivered','Cancelled')
    WHEN 'Delivered'  THEN NEW.order_status IN ('Returned')
    WHEN 'Cancelled'  THEN FALSE  -- terminal state — no transitions
    WHEN 'Returned'   THEN FALSE  -- terminal state
    ELSE TRUE
  END;

  IF NOT v_valid THEN
    RAISE EXCEPTION 'Invalid status transition: % → %',
      OLD.order_status, NEW.order_status
      USING ERRCODE = 'P0003';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_orders_validate_status
  BEFORE UPDATE OF order_status ON orders
  FOR EACH ROW EXECUTE FUNCTION tgf_validate_order_status();`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate the status transition validation logic
WITH transitions AS (
  SELECT 'Processing' AS from_status, 'Confirmed'  AS to_status UNION ALL
  SELECT 'Processing',                'Cancelled'              UNION ALL
  SELECT 'Processing',                'Delivered'              UNION ALL  -- INVALID
  SELECT 'Confirmed',                 'Delivered'              UNION ALL
  SELECT 'Confirmed',                 'Processing'             UNION ALL  -- INVALID
  SELECT 'Delivered',                 'Returned'               UNION ALL
  SELECT 'Delivered',                 'Processing'             UNION ALL  -- INVALID
  SELECT 'Cancelled',                 'Confirmed'                         -- INVALID
)
SELECT
  from_status,
  to_status,
  CASE from_status
    WHEN 'Processing' THEN to_status IN ('Confirmed','Cancelled')
    WHEN 'Confirmed'  THEN to_status IN ('Delivered','Cancelled')
    WHEN 'Delivered'  THEN to_status IN ('Returned')
    WHEN 'Cancelled'  THEN FALSE
    ELSE TRUE
  END                AS is_valid,
  CASE WHEN
    CASE from_status
      WHEN 'Processing' THEN to_status IN ('Confirmed','Cancelled')
      WHEN 'Confirmed'  THEN to_status IN ('Delivered','Cancelled')
      WHEN 'Delivered'  THEN to_status IN ('Returned')
      WHEN 'Cancelled'  THEN FALSE
      ELSE TRUE
    END
  THEN '✓ Allowed'
  ELSE '✗ RAISE EXCEPTION'
  END                AS trigger_outcome
FROM transitions;`}
        height={265}
        showSchema={false}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Cascading Triggers — Maintaining Derived Data" />

      <P>AFTER triggers maintain denormalised or derived data — counts, sums, and flags stored in parent tables that would be expensive to compute on every query. When order_items changes, the trigger updates orders.total_amount. When orders change, the trigger updates a customer_stats summary table.</P>

      <CodeBlock
        label="Cascading update trigger — keep totals in sync"
        code={`-- Keep orders.total_amount in sync with sum of order_items.line_total
-- Fires after any INSERT, UPDATE, or DELETE on order_items
CREATE OR REPLACE FUNCTION tgf_sync_order_total()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  v_order_id INTEGER;
BEGIN
  -- For DELETE: use OLD.order_id; for INSERT/UPDATE: use NEW.order_id
  v_order_id := COALESCE(NEW.order_id, OLD.order_id);

  UPDATE orders
  SET total_amount = (
    SELECT ROUND(COALESCE(SUM(line_total), 0), 2)
    FROM order_items
    WHERE order_id = v_order_id
  )
  WHERE order_id = v_order_id;

  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER trg_order_items_sync_total
  AFTER INSERT OR UPDATE OR DELETE ON order_items
  FOR EACH ROW
  EXECUTE FUNCTION tgf_sync_order_total();

-- Maintain a customer_order_stats denormalised summary table
CREATE OR REPLACE FUNCTION tgf_update_customer_stats()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO customer_order_stats (
    customer_id, order_count, total_spend, last_order_date, updated_at
  )
  SELECT
    NEW.customer_id,
    COUNT(*),
    ROUND(SUM(total_amount), 2),
    MAX(order_date),
    NOW()
  FROM orders
  WHERE customer_id  = NEW.customer_id
    AND order_status = 'Delivered'
  ON CONFLICT (customer_id) DO UPDATE
    SET order_count     = EXCLUDED.order_count,
        total_spend     = EXCLUDED.total_spend,
        last_order_date = EXCLUDED.last_order_date,
        updated_at      = NOW();

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_orders_update_customer_stats
  AFTER INSERT OR UPDATE OF order_status ON orders
  FOR EACH ROW
  WHEN (NEW.order_status = 'Delivered')   -- conditional trigger
  EXECUTE FUNCTION tgf_update_customer_stats();`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate what tgf_sync_order_total would compute for order_id = 1
-- This is the value the trigger would write to orders.total_amount
SELECT
  oi.order_id,
  ROUND(SUM(oi.line_total), 2)               AS computed_total,
  o.total_amount                             AS current_total,
  ROUND(SUM(oi.line_total), 2) = o.total_amount AS is_in_sync
FROM order_items AS oi
JOIN orders      AS o ON oi.order_id = o.order_id
GROUP BY oi.order_id, o.total_amount
ORDER BY oi.order_id
LIMIT 6;`}
        height={185}
        showSchema={true}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Special Trigger Variables — TG_OP, TG_TABLE_NAME, and More" />

      <CodeBlock
        label="Special variables available inside trigger functions"
        code={`-- TG_OP: the operation that fired the trigger
-- Values: 'INSERT', 'UPDATE', 'DELETE', 'TRUNCATE'
IF TG_OP = 'DELETE' THEN RETURN OLD; ELSE RETURN NEW; END IF;

-- TG_TABLE_NAME: name of the table the trigger is on
RAISE NOTICE 'Trigger fired on table: %', TG_TABLE_NAME;

-- TG_TABLE_SCHEMA: schema containing the table
-- Useful for generic audit functions shared across tables

-- TG_NAME: name of the trigger that fired
RAISE NOTICE 'Trigger name: %', TG_NAME;

-- TG_WHEN: 'BEFORE', 'AFTER', or 'INSTEAD OF'

-- TG_LEVEL: 'ROW' or 'STATEMENT'

-- TG_NARGS / TG_ARGV[]: arguments passed to the trigger function
-- Useful for reusable trigger functions parameterised at bind time:
CREATE TRIGGER trg_audit_orders
  AFTER INSERT OR UPDATE OR DELETE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION tgf_generic_audit('orders', 'order_id');
  -- TG_ARGV[0] = 'orders', TG_ARGV[1] = 'order_id'

-- Inside tgf_generic_audit:
-- v_table := TG_ARGV[0];   -- 'orders'
-- v_pk    := TG_ARGV[1];   -- 'order_id'

-- current_user: the database role that executed the DML
-- session_user: the role that authenticated (may differ from current_user)
-- inet_client_addr(): IP address of the connecting client`}
      />

      <CodeBlock
        label="Generic audit function using TG_TABLE_NAME"
        code={`-- One trigger function that audits ANY table
-- Bind to multiple tables with CREATE TRIGGER — no duplication
CREATE OR REPLACE FUNCTION tgf_generic_audit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO audit_log (
    table_name,
    operation,
    row_pk,
    old_data,
    new_data,
    changed_by,
    changed_at
  ) VALUES (
    TG_TABLE_NAME,                           -- which table
    TG_OP,                                   -- INSERT/UPDATE/DELETE
    COALESCE(
      (to_jsonb(NEW) ->> 'id'),              -- try 'id' as PK column
      (to_jsonb(OLD) ->> 'id')
    ),
    CASE WHEN TG_OP != 'INSERT' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP != 'DELETE' THEN to_jsonb(NEW) ELSE NULL END,
    current_user,
    NOW()
  );
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Bind to multiple tables — one function, many triggers:
CREATE TRIGGER trg_audit_orders
  AFTER INSERT OR UPDATE OR DELETE ON orders
  FOR EACH ROW EXECUTE FUNCTION tgf_generic_audit();

CREATE TRIGGER trg_audit_customers
  AFTER INSERT OR UPDATE OR DELETE ON customers
  FOR EACH ROW EXECUTE FUNCTION tgf_generic_audit();

CREATE TRIGGER trg_audit_products
  AFTER INSERT OR UPDATE OR DELETE ON products
  FOR EACH ROW EXECUTE FUNCTION tgf_generic_audit();`}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="Managing Triggers — List, Disable, Drop" />

      <CodeBlock
        label="Trigger lifecycle management"
        code={`-- List all triggers on a table (PostgreSQL)
SELECT
  trigger_name,
  event_manipulation,
  event_object_table,
  action_timing,
  action_orientation,   -- ROW or STATEMENT
  action_statement
FROM information_schema.triggers
WHERE event_object_table = 'orders'
  AND trigger_schema = 'public'
ORDER BY trigger_name, event_manipulation;

-- Or use pg_trigger:
SELECT
  tgname AS trigger_name,
  tgtype,
  tgenabled
FROM pg_trigger AS t
JOIN pg_class   AS c ON t.tgrelid = c.oid
WHERE c.relname = 'orders';

-- Disable a trigger (does not drop it — can re-enable)
ALTER TABLE orders DISABLE TRIGGER trg_audit_orders;
-- All triggers on a table:
ALTER TABLE orders DISABLE TRIGGER ALL;

-- Re-enable:
ALTER TABLE orders ENABLE TRIGGER trg_audit_orders;
ALTER TABLE orders ENABLE TRIGGER ALL;

-- Drop a trigger
DROP TRIGGER trg_audit_orders ON orders;
DROP TRIGGER IF EXISTS trg_audit_orders ON orders;

-- Drop the trigger function (only after all triggers using it are dropped)
DROP FUNCTION tgf_audit_orders();
DROP FUNCTION IF EXISTS tgf_audit_orders();`}
      />

      <SQLPlayground
        initialQuery={`-- List all triggers in the FreshCart database
SELECT
  trigger_name,
  event_manipulation      AS event,
  event_object_table      AS table_name,
  action_timing           AS timing,
  action_orientation      AS level
FROM information_schema.triggers
WHERE trigger_schema NOT IN ('pg_catalog','information_schema')
ORDER BY event_object_table, trigger_name, event;`}
        height={165}
        showSchema={false}
      />

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="When NOT to Use Triggers — The Hidden Costs" />

      <P>Triggers are powerful but carry serious risks. Many experienced database engineers recommend using them sparingly — only for the cases that genuinely require automatic, bypass-proof behaviour. Understanding their downsides prevents architectural mistakes.</P>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '20px 0 32px' }}>
        {[
          {
            title: 'Invisible side effects',
            color: '#ff4757',
            desc: 'A developer who INSERT into orders does not expect an automatic INSERT into five other tables, an UPDATE to customer_stats, and an email notification. Triggers make simple DML unpredictable — the actual behaviour is hidden in trigger definitions that must be separately discovered.',
          },
          {
            title: 'Cascading trigger chains',
            color: '#ff4757',
            desc: 'Trigger A fires → updates table B → fires trigger B → updates table C → fires trigger C → ... Cascading chains are extremely hard to debug, test, and reason about. PostgreSQL has no cycle detection — an infinite loop will run until the stack limit is hit.',
          },
          {
            title: 'Performance surprises',
            color: '#f97316',
            desc: 'A bulk INSERT of 100,000 rows fires a row-level AFTER trigger 100,000 times. If each trigger execution does a SELECT + INSERT, the bulk load runs 200,000 extra operations and is orders of magnitude slower than expected.',
          },
          {
            title: 'Hard to test in isolation',
            color: '#f97316',
            desc: 'Unit testing a trigger requires a real database. Mocking is difficult. CI pipelines must spin up a full database instance. Testing trigger interactions (when triggers fire other triggers) requires careful orchestration.',
          },
          {
            title: 'Schema migrations become dangerous',
            color: '#f97316',
            desc: 'Adding a column to a table with triggers requires verifying the trigger function still compiles and works correctly. Triggers can make schema changes risky even for seemingly safe alterations.',
          },
        ].map(item => (
          <div key={item.title} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 6 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <H>The decision rule</H>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '20px 0 28px' }}>
        {[
          { q: 'The logic must fire for ALL writes regardless of source', answer: 'Use trigger', color: '#00e676', why: 'Bypass-proof enforcement — audit logs, normalisation, constraints' },
          { q: 'The logic should fire only when called from specific application code', answer: 'Use procedure or app layer', color: '#f97316', why: 'Triggers cannot be conditionally bypassed — use application code' },
          { q: 'Auto-fill timestamps, slugs, or defaults on INSERT', answer: 'Use trigger', color: '#00e676', why: 'BEFORE INSERT trigger is clean and reliable for this' },
          { q: 'Complex multi-step business workflow', answer: 'Use stored procedure', color: '#f97316', why: 'Explicit call is clearer — triggers should not do complex workflows' },
          { q: 'Audit log every change to a sensitive table', answer: 'Use trigger', color: '#00e676', why: 'The canonical trigger use case — cannot be bypassed' },
          { q: 'Maintaining a denormalised count or sum in a parent table', answer: 'Consider carefully', color: C, why: 'Trigger works but adds write overhead — measure before adding' },
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

      {/* ── PART 12 ── */}
      <Part n="12" title="What This Looks Like at Work" />

      <P>You are a backend engineer at HDFC Bank. The compliance team requires a complete audit trail for every change to customer account data — who changed what, from what value, to what value, and exactly when. No application code should be trusted to implement this consistently — any developer who forgets the audit call creates a compliance gap. A trigger is the correct solution: it fires for every write, from every client, without exception.</P>

      <TimeBlock time="10:00 AM" label="Compliance requirement received">
        Every INSERT, UPDATE, and DELETE on the customers table must be logged — old values, new values, changed columns, session user, timestamp. Cannot rely on application code.
      </TimeBlock>

      <TimeBlock time="10:30 AM" label="Design: AFTER trigger + JSONB audit table">
        AFTER trigger — only runs when the row was actually committed. JSONB columns store full row snapshots. IS DISTINCT FROM finds changed columns automatically.
      </TimeBlock>

      <CodeBlock
        label="Production audit trigger — complete implementation"
        code={`-- Audit table: stores full before/after snapshots
CREATE TABLE IF NOT EXISTS customers_audit (
  audit_id      BIGSERIAL     PRIMARY KEY,
  customer_id   INTEGER       NOT NULL,
  operation     TEXT          NOT NULL CHECK (operation IN ('INSERT','UPDATE','DELETE')),
  old_row       JSONB,
  new_row       JSONB,
  changed_cols  TEXT[],
  db_user       TEXT          NOT NULL DEFAULT current_user,
  app_user      TEXT,                    -- set via SET LOCAL app.current_user = '...'
  ip_address    INET,
  occurred_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_customers_audit_customer_id ON customers_audit(customer_id);
CREATE INDEX idx_customers_audit_occurred_at ON customers_audit(occurred_at);

-- Trigger function: captures every change
CREATE OR REPLACE FUNCTION tgf_audit_customers()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_changed_cols TEXT[];
BEGIN
  -- Identify which columns actually changed (for UPDATE)
  IF TG_OP = 'UPDATE' THEN
    SELECT ARRAY_AGG(key ORDER BY key)
    INTO v_changed_cols
    FROM jsonb_each(to_jsonb(NEW)) AS n(key, val)
    WHERE n.val IS DISTINCT FROM (to_jsonb(OLD) -> key);
  END IF;

  INSERT INTO customers_audit (
    customer_id, operation,
    old_row, new_row, changed_cols,
    db_user, app_user, ip_address, occurred_at
  ) VALUES (
    COALESCE(NEW.customer_id, OLD.customer_id),
    TG_OP,
    CASE WHEN TG_OP = 'INSERT' THEN NULL ELSE to_jsonb(OLD) END,
    CASE WHEN TG_OP = 'DELETE' THEN NULL ELSE to_jsonb(NEW) END,
    v_changed_cols,
    current_user,
    current_setting('app.current_user', true),  -- optional app-level user
    inet_client_addr(),
    NOW()
  );

  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Bind the trigger
CREATE TRIGGER trg_audit_customers
  AFTER INSERT OR UPDATE OR DELETE
  ON customers
  FOR EACH ROW
  EXECUTE FUNCTION tgf_audit_customers();`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate the audit entries for a series of customer operations
-- Shows exactly what the trigger would record
SELECT
  entry_num,
  customer_id,
  operation,
  old_loyalty_tier,
  new_loyalty_tier,
  changed_cols,
  db_user,
  occurred_at
FROM (VALUES
  (1, 3, 'INSERT',  NULL,       'Bronze',   NULL,                      'app_user', NOW()),
  (2, 3, 'UPDATE',  'Bronze',   'Silver',   ARRAY['loyalty_tier'],     'app_user', NOW() + INTERVAL '10 days'),
  (3, 3, 'UPDATE',  'Silver',   'Gold',     ARRAY['loyalty_tier'],     'batch_job', NOW() + INTERVAL '30 days'),
  (4, 3, 'DELETE',  'Gold',     NULL,       NULL,                      'admin_user', NOW() + INTERVAL '60 days')
) AS t(entry_num, customer_id, operation, old_loyalty_tier, new_loyalty_tier, changed_cols, db_user, occurred_at)
ORDER BY entry_num;`}
        height={225}
        showSchema={false}
      />

      <TimeBlock time="11:30 AM" label="Audit trigger live — complete trail from day one">
        Every customer record change is now logged permanently, regardless of source. The compliance team can query customers_audit to reconstruct the complete history of any customer record at any point in time. The trigger cannot be bypassed by application code, migration scripts, or direct database access.
      </TimeBlock>

      <ProTip>
        For compliance audit trails, always use AFTER triggers — not BEFORE. BEFORE triggers fire before constraints are checked, so a row might be modified by the BEFORE trigger and then rejected by a constraint. If you logged the change in BEFORE, you would have an audit entry for a change that never actually happened. AFTER triggers fire only when the row has successfully landed in the table — the audit entry always corresponds to a real committed change.
      </ProTip>

      <HR />

      {/* ── PART 13 — Interview Prep ── */}
      <Part n="13" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is a trigger and when would you use one?">
        <p style={{ margin: '0 0 14px' }}>A trigger is a database object that automatically executes a specified function when a defined event occurs on a table — INSERT, UPDATE, DELETE, or TRUNCATE. Unlike stored procedures (which are called explicitly), triggers fire implicitly in response to DML. The trigger function runs whether the DML originates from an application, a batch script, a migration tool, or a direct database console session — it cannot be bypassed by any client.</p>
        <p style={{ margin: '0 0 14px' }}>Use a trigger when: the logic must fire for absolutely every write to a table regardless of source. The canonical use cases are audit logging (every change to a sensitive table must be recorded — no developer can accidentally omit the audit call), auto-populating derived columns (created_at, updated_at, normalised email, generated codes — enforced at storage time regardless of application), enforcing complex business rules that CHECK constraints cannot express (multi-table validations, state machine transitions, time-based restrictions), and maintaining denormalised derived data (keeping a parent table's sum or count column in sync with child table changes).</p>
        <p style={{ margin: 0 }}>Avoid triggers when: the logic represents a specific business workflow (use a stored procedure instead — explicit is better than implicit), the trigger would have complex side effects that make DML behaviour unpredictable, or the trigger would fire on bulk operations and create serious performance overhead. The key test: does this logic need to be bypass-proof? If yes, a trigger is appropriate. If it only needs to run in specific application flows, put it in application code or a stored procedure where it is explicit and controllable.</p>
      </IQ>

      <IQ q="What is the difference between BEFORE and AFTER triggers?">
        <p style={{ margin: '0 0 14px' }}>A BEFORE trigger fires before the row is written to the table. The trigger function can modify the NEW record — any changes to NEW are what actually gets stored. BEFORE triggers can also cancel the DML entirely by returning NULL (for row-level triggers) or raising an exception. BEFORE triggers are used for: auto-populating columns (set NEW.created_at, NEW.updated_at, normalise NEW.email before storage), validating and rejecting data (RETURN NULL or RAISE EXCEPTION to prevent the row from landing), and modifying input data before it is committed.</p>
        <p style={{ margin: '0 0 14px' }}>An AFTER trigger fires after the row has been successfully written and constraints have been checked. NEW and OLD are read-only — the row is already in the table and cannot be changed by the trigger. AFTER triggers can INSERT/UPDATE other tables. They are used for: audit logging (log only when the change is confirmed — not if it will be rejected by a constraint), cascading updates to related tables (update a parent table's total when a child row changes), sending notifications, and maintaining denormalised data.</p>
        <p style={{ margin: 0 }}>The practical choice: BEFORE for changing or validating the incoming data. AFTER for reacting to confirmed data changes. A critical distinction: audit logging should always use AFTER triggers. A BEFORE trigger fires before constraint checking — if you log in BEFORE and the row is subsequently rejected by a NOT NULL or UNIQUE constraint, you have an audit entry for a change that never actually happened. AFTER triggers fire only when the write is committed to the table, guaranteeing the audit log matches reality. For auto-populating columns (timestamps, defaults), BEFORE is correct — you need to set the value before storage.</p>
      </IQ>

      <IQ q="What are NEW and OLD and how are they used in trigger functions?">
        <p style={{ margin: '0 0 14px' }}>NEW and OLD are special record variables automatically available inside row-level trigger functions. NEW holds the row state after the triggering operation. OLD holds the row state before the operation. Their availability depends on the DML event: INSERT provides only NEW (there was no previous row). DELETE provides only OLD (the row being removed). UPDATE provides both NEW (the row after the change) and OLD (the row before the change).</p>
        <p style={{ margin: '0 0 14px' }}>In BEFORE triggers, NEW is writable — assigning to NEW.column_name changes what actually gets stored in the table. NEW.email := LOWER(TRIM(NEW.email)) normalises the email before storage. In AFTER triggers, both NEW and OLD are read-only — the row is already committed and cannot be changed via the trigger. You can read NEW.order_status and OLD.order_status to detect what changed, but cannot modify the stored values.</p>
        <p style={{ margin: 0 }}>Practical patterns: detecting changes between old and new values — IF OLD.order_status != NEW.order_status THEN ... log the transition ... END IF. Accessing both for an audit log — INSERT INTO audit (old_data, new_data) VALUES (to_jsonb(OLD), to_jsonb(NEW)). Finding which columns changed — SELECT key FROM jsonb_each(to_jsonb(NEW)) WHERE val IS DISTINCT FROM (to_jsonb(OLD) -&gt; key) returns only the columns whose values differ. For DELETE triggers: since there is no NEW, RETURN OLD in the trigger function (RETURN NEW would be RETURN NULL which cancels the delete). For INSERT triggers: RETURN NEW returns the (possibly modified) row. RETURN NULL cancels the insert.</p>
      </IQ>

      <IQ q="What is a trigger function and why is it separate from the trigger definition?">
        <p style={{ margin: '0 0 14px' }}>In PostgreSQL, a trigger requires two separate objects. The trigger function is a regular PL/pgSQL function that returns TRIGGER — it contains the logic that executes when the trigger fires. The trigger definition (created with CREATE TRIGGER) is the binding that connects the function to a specific table, event (INSERT/UPDATE/DELETE), and timing (BEFORE/AFTER). The CREATE TRIGGER statement does not contain any logic — it only specifies when and where to call the function.</p>
        <p style={{ margin: '0 0 14px' }}>This two-object design enables important patterns. First, reuse: a single trigger function can be bound to multiple tables with separate CREATE TRIGGER statements. A generic audit function using TG_TABLE_NAME and TG_OP can audit orders, customers, products, and any other table without duplicating the function body — just bind it to each table with a separate CREATE TRIGGER. Second, replacement: updating the trigger function with CREATE OR REPLACE FUNCTION immediately changes the behaviour of every trigger that uses it, without needing to drop and recreate any trigger definitions. Third, independent testing: the trigger function is a regular function that can be tested independently (call it with test data) without needing to fire the actual trigger event.</p>
        <p style={{ margin: 0 }}>The pattern for a generic audit function: create one function using TG_TABLE_NAME, TG_OP, to_jsonb(NEW), and to_jsonb(OLD) to capture complete row snapshots. Then bind it to every table that needs auditing with individual CREATE TRIGGER statements. This is the standard production pattern for comprehensive audit trails — one well-tested function, applied to many tables via the trigger binding mechanism.</p>
      </IQ>

      <IQ q="What are the risks of using triggers and how do you mitigate them?">
        <p style={{ margin: '0 0 14px' }}>Invisible side effects: a developer who writes INSERT INTO orders does not expect automatic side effects — inserts into five other tables, notifications, and cascading updates. This makes code harder to understand and debug because the actual behaviour is hidden in trigger definitions. Mitigation: document triggers prominently in the schema, use clear naming conventions (trg_tablename_when_operation, tgf_action_description), and maintain a trigger registry that maps tables to their triggers. Do not add triggers that perform surprising or extensive side effects — keep trigger bodies focused and minimal.</p>
        <p style={{ margin: '0 0 14px' }}>Cascading trigger chains: trigger A fires, updates table B, which fires trigger B, which updates table C, which fires trigger C — potentially creating infinite loops. PostgreSQL has no automatic cycle detection for trigger chains. A stack depth limit eventually stops infinite recursion, but only after consuming significant resources. Mitigation: design trigger chains deliberately and shallowly (at most one level of cascade). Add a guard variable that prevents re-entrant execution: IF TG_NAME = 'trg_that_caused_this' THEN RETURN NEW; END IF. Test all cascading interactions in a staging environment under concurrent load.</p>
        <p style={{ margin: 0 }}>Performance overhead: a row-level AFTER trigger fires once per row. Bulk INSERTs of 100,000 rows fire the trigger 100,000 times. If each execution does a SELECT and an INSERT, that is 200,000 extra operations on what looked like a simple bulk load. Mitigation: use statement-level triggers where per-row behaviour is not needed (refresh a materialized view once per batch, not once per row). Disable triggers for known bulk loads where the trigger logic does not apply: ALTER TABLE orders DISABLE TRIGGER ALL before the load, re-enable after. Profile trigger overhead with EXPLAIN ANALYZE on statements that use the table. Consider whether the derived data maintained by a trigger is actually queried frequently enough to justify the write overhead.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="14" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: trigger function must return type trigger"
        cause="The function used in CREATE TRIGGER does not declare RETURNS TRIGGER. Any function bound to a trigger must have RETURNS TRIGGER as its return type declaration — not RETURNS VOID, RETURNS INTEGER, or any other type. This is a hard requirement of PostgreSQL's trigger architecture."
        fix="Modify the function declaration: CREATE OR REPLACE FUNCTION tgf_name() RETURNS TRIGGER LANGUAGE plpgsql AS $$ ... $$. The function body must also RETURN NEW (for INSERT/UPDATE) or RETURN OLD (for DELETE) or RETURN NULL (to cancel the operation for BEFORE row-level triggers). Check all code paths include a RETURN statement."
      />

      <Err
        msg="INSERT succeeds but audit log has no entry — BEFORE trigger logged a row that was later rejected"
        cause="An audit log trigger was implemented as BEFORE instead of AFTER. The BEFORE trigger fires and logs the intended change, but then a constraint violation (NOT NULL, UNIQUE, FK) rejects the row — the row never reaches the table. The audit entry exists for a write that never happened."
        fix="Change the trigger to AFTER: CREATE TRIGGER trg_audit ... AFTER INSERT OR UPDATE OR DELETE ON table ... An AFTER trigger only fires when the row has been successfully written and all constraints have passed. This guarantees every audit entry corresponds to a real committed change. Also ensure the audit table itself has no constraints that could cause the audit INSERT to fail — if the audit trigger function raises an error, the entire original transaction rolls back."
      />

      <Err
        msg="Trigger fires recursively — stack depth limit exceeded"
        cause="A trigger on table A updates table B, which fires a trigger on table B that updates table A again, creating an infinite loop. Or a trigger updates the same table it is defined on, firing itself repeatedly. PostgreSQL does not prevent recursive trigger calls — the recursion continues until the maximum stack depth is hit and an error is raised."
        fix="Add a recursion guard inside the trigger function. Check a session-level variable: IF current_setting('app.trigger_depth', true)::INT > 0 THEN RETURN NEW; END IF; SET LOCAL app.trigger_depth = 1; then reset at the end. Or restructure the logic to avoid mutual dependencies between tables via triggers. As a diagnostic: SHOW max_stack_depth; and trace the call chain. If triggers truly need to cascade, limit to one level and document it explicitly."
      />

      <Err
        msg="Trigger is not firing — DML succeeds but side effects do not happen"
        cause="Four possible causes: (1) The trigger was disabled: ALTER TABLE table DISABLE TRIGGER name. (2) The trigger is defined for a different event — a trigger on INSERT does not fire for UPDATE. (3) The WHEN condition on the trigger evaluates to FALSE — CREATE TRIGGER ... WHEN (condition) — the trigger body is skipped. (4) The trigger was dropped or never successfully created."
        fix="Verify the trigger exists and is enabled: SELECT tgname, tgenabled FROM pg_trigger JOIN pg_class ON tgrelid = oid WHERE relname = 'table_name'. tgenabled = 'O' means enabled; 'D' means disabled. Check the WHEN condition: SELECT trigger_name, action_condition FROM information_schema.triggers WHERE event_object_table = 'table_name'. Verify the event list: a trigger with AFTER UPDATE does not fire for INSERT — add OR INSERT if needed. Re-create the trigger if it is missing."
      />

      <Err
        msg="Trigger causes DML to run 10x slower on bulk operations"
        cause="A row-level AFTER trigger fires once per row. A bulk INSERT of 50,000 rows fires the trigger 50,000 times. If each trigger execution performs a SELECT + INSERT (like updating a running total), the total operation performs 100,000+ database operations instead of 1."
        fix="Three options: (1) Disable the trigger for the bulk load: ALTER TABLE orders DISABLE TRIGGER trg_audit_orders; load data; ALTER TABLE orders ENABLE TRIGGER trg_audit_orders; then handle the audit separately. (2) Convert to a statement-level trigger where per-row behaviour is not needed — refresh a summary table once per batch rather than once per row. (3) Redesign: instead of maintaining denormalised data via triggers, compute it on-demand with views or pre-aggregate with scheduled batch jobs. Measure trigger overhead before adding it to high-volume tables: EXPLAIN ANALYZE on a test INSERT of 1,000 rows with and without the trigger."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Design three triggers for FreshCart. Write the CREATE FUNCTION and CREATE TRIGGER statements for: (1) A BEFORE INSERT OR UPDATE trigger on customers that auto-normalises first_name and last_name (INITCAP LOWER TRIM), lowercases and trims email, sets joined_date to CURRENT_DATE on INSERT if NULL, and sets loyalty_tier to 'Bronze' if NULL. (2) An AFTER INSERT OR UPDATE trigger on orders that fires only WHEN NEW.order_status = 'Delivered' and updates a denormalised column last_delivery_date on the customers table. (3) An AFTER INSERT OR UPDATE OR DELETE trigger on order_items that recomputes and updates orders.total_amount as the SUM of line_total for that order. Then write the SELECT queries that verify each trigger would produce the correct result."
        hint="Trigger 1: BEFORE — modify NEW fields directly. Trigger 2: AFTER with WHEN clause — UPDATE customers SET last_delivery_date = NEW.delivery_date WHERE customer_id = NEW.customer_id. Trigger 3: AFTER — UPDATE orders SET total_amount = (SELECT SUM FROM order_items WHERE order_id = NEW.order_id)."
        answer={`-- ── Trigger 1: Normalise customer data on INSERT/UPDATE ──────────
CREATE OR REPLACE FUNCTION tgf_normalise_customers()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  -- Normalise names and email
  NEW.first_name   := INITCAP(LOWER(TRIM(NEW.first_name)));
  NEW.last_name    := INITCAP(LOWER(TRIM(NEW.last_name)));
  NEW.email        := LOWER(TRIM(NEW.email));

  -- Set defaults on INSERT only
  IF TG_OP = 'INSERT' THEN
    IF NEW.joined_date IS NULL THEN
      NEW.joined_date := CURRENT_DATE;
    END IF;
    IF NEW.loyalty_tier IS NULL THEN
      NEW.loyalty_tier := 'Bronze';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_customers_normalise
  BEFORE INSERT OR UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION tgf_normalise_customers();

-- Verify: what would be stored for raw input
SELECT
  INITCAP(LOWER(TRIM('  PRIYA  ')))          AS stored_first,
  INITCAP(LOWER(TRIM('sharma')))             AS stored_last,
  LOWER(TRIM('Priya@GMAIL.COM'))             AS stored_email,
  COALESCE(NULL, CURRENT_DATE)               AS stored_joined,
  COALESCE(NULL, 'Bronze')                   AS stored_tier;

-- ── Trigger 2: Update customer last_delivery_date ─────────────────
CREATE OR REPLACE FUNCTION tgf_update_last_delivery()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  -- Only runs when WHEN condition is true: NEW.order_status = 'Delivered'
  UPDATE customers
  SET last_delivery_date = NEW.delivery_date
  WHERE customer_id = NEW.customer_id
    AND (last_delivery_date IS NULL
         OR NEW.delivery_date > last_delivery_date);

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_orders_update_last_delivery
  AFTER INSERT OR UPDATE ON orders
  FOR EACH ROW
  WHEN (NEW.order_status = 'Delivered')
  EXECUTE FUNCTION tgf_update_last_delivery();

-- Verify: what last_delivery_date would become for customer_id = 1
SELECT
  o.customer_id,
  MAX(o.delivery_date)   AS would_set_last_delivery_date
FROM orders AS o
WHERE o.customer_id  = 1
  AND o.order_status = 'Delivered'
  AND o.delivery_date IS NOT NULL
GROUP BY o.customer_id;

-- ── Trigger 3: Sync orders.total_amount from order_items ──────────
CREATE OR REPLACE FUNCTION tgf_sync_order_total()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  v_order_id INTEGER;
BEGIN
  v_order_id := COALESCE(NEW.order_id, OLD.order_id);

  UPDATE orders
  SET total_amount = (
    SELECT ROUND(COALESCE(SUM(line_total), 0), 2)
    FROM order_items
    WHERE order_id = v_order_id
  )
  WHERE order_id = v_order_id;

  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER trg_order_items_sync_total
  AFTER INSERT OR UPDATE OR DELETE ON order_items
  FOR EACH ROW
  EXECUTE FUNCTION tgf_sync_order_total();

-- Verify: current sum vs stored total for each order
SELECT
  oi.order_id,
  ROUND(SUM(oi.line_total), 2)   AS computed_sum,
  o.total_amount                  AS stored_total,
  ROUND(SUM(oi.line_total), 2) = o.total_amount AS in_sync
FROM order_items AS oi
JOIN orders AS o ON oi.order_id = o.order_id
GROUP BY oi.order_id, o.total_amount
ORDER BY oi.order_id;`}
        explanation="Trigger 1 uses TG_OP to distinguish INSERT from UPDATE — the defaults (joined_date, loyalty_tier) should only be set on INSERT, not overwritten on every UPDATE. Modifying NEW fields directly in a BEFORE trigger changes what gets stored — the trigger function is the last step before the row lands in the table. RETURN NEW is mandatory for BEFORE row-level triggers; RETURN NULL would cancel the INSERT/UPDATE. Trigger 2 uses a WHEN clause in CREATE TRIGGER — this filters at the trigger level (no unnecessary function invocations for non-delivered orders) before the function body even runs. The extra condition inside the function (delivery_date > last_delivery_date) prevents old deliveries from overwriting newer ones if orders are processed out of order. Trigger 3 handles all three DML events (INSERT, UPDATE, DELETE on order_items) by using COALESCE(NEW.order_id, OLD.order_id) to get the order_id regardless of which event fired. A DELETE on order_items has no NEW — OLD.order_id is used. The recomputed sum uses the current state of order_items after the DML, which is correct for AFTER triggers — the deleted/updated row has already changed before the trigger runs."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'A trigger fires automatically in response to DML events — INSERT, UPDATE, DELETE, or TRUNCATE. It cannot be bypassed by any client, making it the correct tool for bypass-proof enforcement.',
          'PostgreSQL triggers require two objects: a trigger function (RETURNS TRIGGER, contains the logic) and a trigger definition (binds the function to a table, event, and timing with CREATE TRIGGER).',
          'BEFORE triggers fire before the row is written — NEW is writable, allowing the trigger to modify what gets stored. Used for auto-populating columns and validation. AFTER triggers fire after the row is committed — NEW/OLD are read-only. Used for audit logging and cascading updates.',
          'NEW holds the row after the change. OLD holds the row before. INSERT provides only NEW. DELETE provides only OLD. UPDATE provides both. BEFORE triggers can return NULL to cancel the DML.',
          'FOR EACH ROW fires once per affected row and has access to NEW/OLD. FOR EACH STATEMENT fires once per SQL statement regardless of row count, with no per-row context.',
          'TG_OP contains the operation type (\'INSERT\', \'UPDATE\', \'DELETE\'). TG_TABLE_NAME contains the table name. Use these in generic trigger functions that can be reused across multiple tables.',
          'Audit logging is the canonical trigger use case — AFTER trigger so only confirmed changes are logged. Store old_data and new_data as JSONB for complete row snapshots. Use IS DISTINCT FROM to detect changed columns.',
          'Avoid trigger chains — trigger A firing trigger B firing trigger C is extremely hard to debug. Keep trigger bodies minimal and focused. One level of cascade maximum.',
          'Row-level AFTER triggers on high-volume tables add overhead proportional to rows processed. Disable triggers for bulk loads where the trigger logic does not apply: ALTER TABLE DISABLE TRIGGER.',
          'The key question: does this logic need to be bypass-proof? If yes — trigger. If it only needs to run in specific application flows — stored procedure or application code. Triggers are powerful but make DML behaviour less predictable.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 51</strong>, you learn Window Functions in depth — ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, running totals, moving averages, and the PARTITION BY and ORDER BY frame clauses that power time-series analytics.
        </p>
        <Link href="/learn/sql/window-functions-intro" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 51 → Window Functions
        </Link>
      </div>

    </LearnLayout>
  );
}