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

export default function RecursiveCte() {
  return (
    <LearnLayout
      title="Recursive CTEs"
      description="Query hierarchical and graph data without fixed-depth self-joins — org charts, category trees, bill-of-materials, path finding, and number generation using WITH RECURSIVE"
      section="SQL — Module 54"
      readTime="34 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="The Problem — Hierarchies Have Unknown Depth" />

      <P>Most SQL queries work on flat data — each row is independent. But real-world data is often hierarchical: an employee reports to a manager who reports to a director who reports to a VP. A product category contains subcategories which contain sub-subcategories. A delivery route visits nodes that connect to other nodes.</P>

      <P>Querying these structures with ordinary SQL requires knowing the depth in advance. To find all employees under a VP you would write a chain of self-joins — one join per level. This breaks the moment the hierarchy deepens or shallows. <Hl>Recursive CTEs</Hl> solve this cleanly: they repeat a query against their own previous output until no new rows are produced, traversing hierarchies of any depth without knowing the depth in advance.</P>

      <CodeBlock
        label="The problem a recursive CTE solves"
        code={`-- WITHOUT recursive CTE: fixed-depth self-joins (brittle)
-- Works only if hierarchy is exactly 3 levels deep
SELECT e1.name AS level1, e2.name AS level2, e3.name AS level3
FROM employees e1
JOIN employees e2 ON e2.manager_id = e1.employee_id
JOIN employees e3 ON e3.manager_id = e2.employee_id
WHERE e1.manager_id IS NULL;
-- Breaks when someone adds a 4th level

-- WITH RECURSIVE: traverses any depth automatically
WITH RECURSIVE org_tree AS (
  -- Anchor: start at the root (no manager)
  SELECT employee_id, name, manager_id, 0 AS depth
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive: join each employee to their manager's row
  SELECT e.employee_id, e.name, e.manager_id, ot.depth + 1
  FROM employees AS e
  JOIN org_tree   AS ot ON e.manager_id = ot.employee_id
)
SELECT * FROM org_tree ORDER BY depth, name;
-- Works for 1 level or 100 levels — same query`}
      />

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Anatomy of a Recursive CTE" />

      <P>A recursive CTE has exactly <Hl>two parts separated by UNION ALL</Hl>: the anchor member (a regular SELECT that starts the recursion) and the recursive member (a SELECT that references the CTE itself, joining the previous iteration's output to the base table). The database alternates between running the recursive member and accumulating results until the recursive member produces zero new rows.</P>

      <CodeBlock
        label="Recursive CTE structure — every part explained"
        code={`WITH RECURSIVE cte_name AS (

  -- ── ANCHOR MEMBER ───────────────────────────────────────────
  -- Runs exactly ONCE. Seeds the recursion.
  -- Returns the starting rows (roots, first elements, initial values).
  -- Must NOT reference cte_name.
  SELECT col1, col2, 1 AS depth, col1::TEXT AS path
  FROM base_table
  WHERE starting_condition

  UNION ALL       -- always UNION ALL (not UNION) in recursive CTEs

  -- ── RECURSIVE MEMBER ────────────────────────────────────────
  -- Runs REPEATEDLY until it produces 0 new rows.
  -- References cte_name — joins the PREVIOUS iteration's output.
  -- Each iteration sees only the rows added by the PREVIOUS iteration.
  SELECT bt.col1, bt.col2, r.depth + 1, r.path || ' > ' || bt.col1
  FROM base_table AS bt
  JOIN cte_name   AS r   -- r = previous iteration's rows
    ON bt.parent_id = r.col1
  WHERE r.depth < 10     -- ALWAYS add a depth/cycle guard

)
-- Final SELECT: reads ALL accumulated rows from all iterations
SELECT * FROM cte_name ORDER BY depth;

-- Execution model:
-- Iteration 0: anchor runs → produces root rows → added to result
-- Iteration 1: recursive runs with iteration 0 rows → adds children
-- Iteration 2: recursive runs with iteration 1 rows → adds grandchildren
-- ...continues until recursive produces 0 rows
-- Final result: UNION ALL of all iterations`}
      />

      <Callout type="warning">
        Always include a termination condition in the recursive member — either a WHERE depth &lt; N guard or a WHERE NOT EXISTS cycle check. Without it, a cycle in the data (A → B → A) causes infinite recursion. PostgreSQL enforces a maximum recursion depth (default 100) but hitting it raises an error rather than returning partial results.
      </Callout>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Number and Date Series Generation" />

      <P>The simplest recursive CTE generates a series of numbers or dates — anchoring at a start value and incrementing each iteration. This is a clean alternative to generate_series() and works across all SQL databases.</P>

      <H>Integer series</H>

      <SQLPlayground
        initialQuery={`-- Generate integers 1 through 20
WITH RECURSIVE nums AS (
  SELECT 1 AS n          -- anchor: start at 1

  UNION ALL

  SELECT n + 1           -- recursive: increment by 1
  FROM nums
  WHERE n < 20           -- termination: stop at 20
)
SELECT n FROM nums;`}
        height={165}
        showSchema={false}
      />

      <H>Date series — fill calendar gaps</H>

      <SQLPlayground
        initialQuery={`-- Generate every date in January 2024
-- Useful for filling gaps in time-series data
WITH RECURSIVE date_series AS (
  SELECT '2024-01-01'::DATE AS dt   -- anchor: start date

  UNION ALL

  SELECT dt + 1                     -- recursive: next day
  FROM date_series
  WHERE dt < '2024-01-31'           -- termination: end date
)
SELECT
  ds.dt                             AS calendar_date,
  -- Join to real data — NULL where no orders existed
  COALESCE(ROUND(SUM(o.total_amount), 2), 0) AS daily_revenue,
  COALESCE(COUNT(o.order_id), 0)             AS order_count
FROM date_series AS ds
LEFT JOIN orders AS o
  ON o.order_date = ds.dt
  AND o.order_status = 'Delivered'
GROUP BY ds.dt
ORDER BY ds.dt;`}
        height={250}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Generate the first day of each month for a full year
WITH RECURSIVE months AS (
  SELECT DATE_TRUNC('month', '2024-01-01'::DATE)::DATE AS month_start

  UNION ALL

  SELECT (month_start + INTERVAL '1 month')::DATE
  FROM months
  WHERE month_start < '2024-12-01'
)
SELECT
  month_start,
  TO_CHAR(month_start, 'Month YYYY')          AS month_label,
  COALESCE(ROUND(SUM(o.total_amount), 2), 0)  AS monthly_revenue,
  COALESCE(COUNT(o.order_id), 0)              AS order_count
FROM months
LEFT JOIN orders AS o
  ON DATE_TRUNC('month', o.order_date)::DATE = month_start
  AND o.order_status = 'Delivered'
GROUP BY month_start
ORDER BY month_start;`}
        height={240}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Hierarchical Data — Org Charts and Category Trees" />

      <P>The classic recursive CTE use case: traversing a parent-child relationship stored in a self-referencing table. The same table has both the child rows and the parent rows — the recursive CTE walks from root to leaves (top-down) or from leaf to root (bottom-up).</P>

      <H>FreshMart employee org chart — top-down traversal</H>

      <SQLPlayground
        initialQuery={`-- Traverse the employee hierarchy from top to bottom
-- Building a path string and indented display name
WITH RECURSIVE org_chart AS (
  -- Anchor: employees with no manager (top level)
  SELECT
    employee_id,
    first_name || ' ' || last_name         AS full_name,
    job_title,
    department,
    manager_id,
    0                                      AS depth,
    (first_name || ' ' || last_name)::TEXT AS path,
    employee_id::TEXT                      AS id_path
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  SELECT
    e.employee_id,
    e.first_name || ' ' || e.last_name,
    e.job_title,
    e.department,
    e.manager_id,
    oc.depth + 1,
    oc.path || ' → ' || e.first_name || ' ' || e.last_name,
    oc.id_path || '.' || e.employee_id::TEXT
  FROM employees AS e
  JOIN org_chart AS oc ON e.manager_id = oc.employee_id
  WHERE oc.depth < 10                      -- safety guard
)
SELECT
  REPEAT('  ', depth) || full_name         AS indented_name,
  job_title,
  department,
  depth,
  path                                     AS full_path
FROM org_chart
ORDER BY id_path;`}
        height={280}
        showSchema={true}
      />

      <H>Bottom-up traversal — find all ancestors of an employee</H>

      <SQLPlayground
        initialQuery={`-- Find the management chain above a specific employee
-- Starting from the employee and walking UP to the root
WITH RECURSIVE management_chain AS (
  -- Anchor: start at the target employee
  SELECT
    employee_id,
    first_name || ' ' || last_name   AS full_name,
    job_title,
    manager_id,
    0                                AS levels_above
  FROM employees
  WHERE employee_id = (
    SELECT employee_id FROM employees
    WHERE manager_id IS NOT NULL
    ORDER BY employee_id DESC
    LIMIT 1
  )

  UNION ALL

  SELECT
    e.employee_id,
    e.first_name || ' ' || e.last_name,
    e.job_title,
    e.manager_id,
    mc.levels_above + 1
  FROM employees AS e
  JOIN management_chain AS mc ON e.employee_id = mc.manager_id
  WHERE mc.levels_above < 10
)
SELECT
  levels_above,
  CASE levels_above
    WHEN 0 THEN 'Self'
    WHEN 1 THEN 'Direct manager'
    ELSE 'Level ' || levels_above || ' manager'
  END                                AS relationship,
  full_name,
  job_title
FROM management_chain
ORDER BY levels_above;`}
        height={280}
        showSchema={false}
      />

      <H>Count reports at each level</H>

      <SQLPlayground
        initialQuery={`-- For each employee: how many direct and total reports?
WITH RECURSIVE reports AS (
  SELECT
    employee_id                      AS root_id,
    employee_id                      AS current_id,
    0                                AS depth
  FROM employees

  UNION ALL

  SELECT
    r.root_id,
    e.employee_id,
    r.depth + 1
  FROM employees AS e
  JOIN reports   AS r ON e.manager_id = r.current_id
  WHERE r.depth < 10
)
SELECT
  m.employee_id,
  m.first_name || ' ' || m.last_name              AS manager,
  m.job_title,
  -- Direct reports only (depth = 1)
  COUNT(DISTINCT CASE WHEN r.depth = 1
    THEN r.current_id END)                         AS direct_reports,
  -- All reports at any depth (depth > 0)
  COUNT(DISTINCT CASE WHEN r.depth > 0
    THEN r.current_id END)                         AS total_reports
FROM employees AS m
LEFT JOIN reports AS r ON r.root_id = m.employee_id
GROUP BY m.employee_id, m.first_name, m.last_name, m.job_title
ORDER BY total_reports DESC;`}
        height={275}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="Product Category Trees — Multi-Level Navigation" />

      <P>E-commerce category hierarchies are a textbook recursive CTE use case. Electronics → Mobiles → Smartphones → Android Phones. The same self-referencing table stores every level. The recursive CTE walks the tree to produce breadcrumb paths, flattened lists, or roll-up totals.</P>

      <CodeBlock
        label="Category tree — schema and recursive traversal"
        code={`-- Self-referencing categories table:
-- CREATE TABLE categories (
--   category_id   INTEGER PRIMARY KEY,
--   category_name TEXT NOT NULL,
--   parent_id     INTEGER REFERENCES categories(category_id),
--   level         INTEGER DEFAULT 0
-- );

-- Top-down traversal with breadcrumb path
WITH RECURSIVE category_tree AS (
  -- Anchor: root categories (no parent)
  SELECT
    category_id,
    category_name,
    parent_id,
    0                         AS depth,
    category_name::TEXT       AS breadcrumb,
    category_id::TEXT         AS sort_path
  FROM categories
  WHERE parent_id IS NULL

  UNION ALL

  SELECT
    c.category_id,
    c.category_name,
    c.parent_id,
    ct.depth + 1,
    ct.breadcrumb || ' > ' || c.category_name,
    ct.sort_path || '.' || LPAD(c.category_id::TEXT, 6, '0')
  FROM categories  AS c
  JOIN category_tree AS ct ON c.parent_id = ct.category_id
  WHERE ct.depth < 8
)
SELECT
  REPEAT('  ', depth) || category_name   AS indented_name,
  breadcrumb,
  depth                                  AS level
FROM category_tree
ORDER BY sort_path;`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate a 3-level category tree using a VALUES CTE
-- (FreshMart doesn't have a categories table — we build one inline)
WITH categories(category_id, category_name, parent_id) AS (
  VALUES
    (1,  'All Products',    NULL),
    (2,  'Food',            1),
    (3,  'Non-Food',        1),
    (4,  'Dairy',           2),
    (5,  'Bakery',          2),
    (6,  'Beverages',       2),
    (7,  'Household',       3),
    (8,  'Personal Care',   3),
    (9,  'Milk',            4),
    (10, 'Cheese',          4),
    (11, 'Bread',           5),
    (12, 'Cakes',           5),
    (13, 'Juice',           6),
    (14, 'Water',           6)
),
RECURSIVE tree AS (
  SELECT
    category_id,
    category_name,
    parent_id,
    0                            AS depth,
    category_name::TEXT          AS breadcrumb,
    LPAD(category_id::TEXT, 4, '0') AS sort_key
  FROM categories
  WHERE parent_id IS NULL

  UNION ALL

  SELECT
    c.category_id,
    c.category_name,
    c.parent_id,
    t.depth + 1,
    t.breadcrumb || ' > ' || c.category_name,
    t.sort_key || '.' || LPAD(c.category_id::TEXT, 4, '0')
  FROM categories AS c
  JOIN tree       AS t ON c.parent_id = t.category_id
  WHERE t.depth < 5
)
SELECT
  REPEAT('  ', depth) || category_name  AS indented_name,
  breadcrumb,
  depth                                 AS level
FROM tree
ORDER BY sort_key;`}
        height={305}
        showSchema={false}
      />

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Path Finding — Shortest Route Between Nodes" />

      <P>Recursive CTEs can traverse graph structures — tables where rows represent edges (connections between nodes). The classic application is finding paths between stores, delivery waypoints, or network nodes. The recursive member builds paths by adding one edge per iteration.</P>

      <CodeBlock
        label="Graph traversal — path finding between nodes"
        code={`-- Delivery route graph:
-- CREATE TABLE routes (
--   from_node TEXT,
--   to_node   TEXT,
--   distance  INTEGER
-- );

WITH RECURSIVE paths AS (
  -- Anchor: start at the origin node, zero distance
  SELECT
    from_node,
    to_node,
    distance,
    ARRAY[from_node, to_node]     AS visited_nodes,
    distance                      AS total_distance,
    1                             AS hops
  FROM routes
  WHERE from_node = 'Bangalore'

  UNION ALL

  SELECT
    r.from_node,
    r.to_node,
    r.distance,
    p.visited_nodes || r.to_node,
    p.total_distance + r.distance,
    p.hops + 1
  FROM routes AS r
  JOIN paths  AS p ON r.from_node = p.to_node
  -- Cycle prevention: don't revisit a node already in the path
  WHERE NOT (r.to_node = ANY(p.visited_nodes))
    AND p.hops < 10
)
SELECT
  visited_nodes[1]              AS origin,
  to_node                       AS destination,
  array_to_string(visited_nodes, ' → ') AS full_path,
  total_distance,
  hops
FROM paths
WHERE to_node = 'Mumbai'
ORDER BY total_distance
LIMIT 5;`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate delivery routing between FreshMart store cities
-- Build a route graph inline and find all paths
WITH routes(from_city, to_city, km) AS (
  VALUES
    ('Bangalore', 'Mumbai',    981),
    ('Bangalore', 'Hyderabad', 575),
    ('Bangalore', 'Chennai',   346),
    ('Hyderabad', 'Mumbai',    711),
    ('Hyderabad', 'Pune',      560),
    ('Chennai',   'Hyderabad', 630),
    ('Pune',      'Mumbai',    150),
    ('Mumbai',    'Pune',      150),
    ('Mumbai',    'Delhi',    1400)
),
RECURSIVE all_paths AS (
  -- Anchor: start at Bangalore
  SELECT
    from_city,
    to_city,
    km                            AS total_km,
    ARRAY[from_city, to_city]     AS visited,
    1                             AS hops
  FROM routes
  WHERE from_city = 'Bangalore'

  UNION ALL

  SELECT
    r.from_city,
    r.to_city,
    ap.total_km + r.km,
    ap.visited || r.to_city,
    ap.hops + 1
  FROM routes      AS r
  JOIN all_paths   AS ap ON r.from_city = ap.to_city
  WHERE NOT (r.to_city = ANY(ap.visited))   -- no cycles
    AND ap.hops < 5
)
SELECT
  array_to_string(visited, ' → ')  AS route,
  to_city                          AS destination,
  total_km,
  hops
FROM all_paths
ORDER BY total_km
LIMIT 10;`}
        height={305}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Bill of Materials — Exploding Nested Components" />

      <P>A bill of materials (BOM) is a hierarchical parts list: a product contains components, each component contains sub-components, and so on. Recursive CTEs explode BOMs to compute total quantities and costs at every level — without knowing how many levels deep the nesting goes.</P>

      <CodeBlock
        label="Bill of materials explosion"
        code={`-- BOM table: each row = one parent contains N units of one child
-- CREATE TABLE bom (
--   parent_id   INTEGER,
--   child_id    INTEGER,
--   quantity    NUMERIC,
--   unit_cost   NUMERIC
-- );

WITH RECURSIVE bom_explosion AS (
  -- Anchor: start with the top-level product (no parent)
  SELECT
    child_id          AS component_id,
    child_id::TEXT    AS path,
    quantity,
    quantity          AS total_quantity,
    unit_cost,
    quantity * unit_cost AS total_cost,
    0                 AS depth
  FROM bom
  WHERE parent_id = 101   -- product ID 101

  UNION ALL

  SELECT
    b.child_id,
    be.path || ' > ' || b.child_id::TEXT,
    b.quantity,
    -- Multiply child quantity by parent's total quantity
    be.total_quantity * b.quantity,
    b.unit_cost,
    be.total_quantity * b.quantity * b.unit_cost,
    be.depth + 1
  FROM bom            AS b
  JOIN bom_explosion  AS be ON b.parent_id = be.component_id
  WHERE be.depth < 8
)
SELECT
  component_id,
  path,
  depth,
  quantity           AS qty_per_parent,
  total_quantity     AS total_qty_needed,
  unit_cost,
  ROUND(total_cost, 2) AS total_cost
FROM bom_explosion
ORDER BY path;

-- Roll up: total cost of the entire product
SELECT SUM(total_cost) AS total_product_cost
FROM bom_explosion;`}
      />

      <SQLPlayground
        initialQuery={`-- Simulate BOM explosion for a FreshMart gift basket
-- (basket contains products, products may have sub-components)
WITH bom(parent_id, child_id, component_name, quantity, unit_cost) AS (
  VALUES
    -- Gift basket (ID 0) contains:
    (0, 1, 'Amul Butter 500g',   2, 55.00),
    (0, 2, 'Britannia Bread',    1, 35.00),
    (0, 3, 'Juice Pack',         3, 40.00),
    (0, 4, 'Packaging',          1, 25.00),
    -- Juice Pack (ID 3) is itself made of:
    (3, 5, 'Juice Bottle 200ml', 3, 12.00),
    (3, 6, 'Cardboard Tray',     1,  5.00),
    -- Packaging (ID 4) contains:
    (4, 7, 'Box',                1, 18.00),
    (4, 8, 'Ribbon',             1,  7.00)
),
RECURSIVE explosion AS (
  -- Anchor: top-level basket contents
  SELECT
    child_id,
    component_name,
    quantity,
    quantity                     AS total_qty,
    unit_cost,
    quantity * unit_cost         AS line_cost,
    0                            AS depth,
    component_name::TEXT         AS path
  FROM bom
  WHERE parent_id = 0

  UNION ALL

  SELECT
    b.child_id,
    b.component_name,
    b.quantity,
    e.total_qty * b.quantity,
    b.unit_cost,
    e.total_qty * b.quantity * b.unit_cost,
    e.depth + 1,
    e.path || ' > ' || b.component_name
  FROM bom        AS b
  JOIN explosion  AS e ON b.parent_id = e.child_id
  WHERE e.depth < 6
)
SELECT
  REPEAT('  ', depth) || component_name   AS component,
  total_qty,
  unit_cost,
  ROUND(line_cost, 2)                     AS total_cost,
  path
FROM explosion
ORDER BY path;`}
        height={320}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Total cost rollup from the BOM explosion above
WITH bom(parent_id, child_id, component_name, quantity, unit_cost) AS (
  VALUES
    (0, 1, 'Amul Butter 500g',   2, 55.00),
    (0, 2, 'Britannia Bread',    1, 35.00),
    (0, 3, 'Juice Pack',         3, 40.00),
    (0, 4, 'Packaging',          1, 25.00),
    (3, 5, 'Juice Bottle 200ml', 3, 12.00),
    (3, 6, 'Cardboard Tray',     1,  5.00),
    (4, 7, 'Box',                1, 18.00),
    (4, 8, 'Ribbon',             1,  7.00)
),
RECURSIVE explosion AS (
  SELECT child_id, component_name, quantity,
         quantity AS total_qty, unit_cost,
         quantity * unit_cost AS line_cost, 0 AS depth
  FROM bom WHERE parent_id = 0
  UNION ALL
  SELECT b.child_id, b.component_name, b.quantity,
         e.total_qty * b.quantity, b.unit_cost,
         e.total_qty * b.quantity * b.unit_cost,
         e.depth + 1
  FROM bom AS b JOIN explosion AS e ON b.parent_id = e.child_id
  WHERE e.depth < 6
)
SELECT
  -- Cost at each level
  SUM(CASE WHEN depth = 0 THEN line_cost ELSE 0 END)  AS direct_component_cost,
  SUM(CASE WHEN depth > 0 THEN line_cost ELSE 0 END)  AS sub_component_cost,
  ROUND(SUM(line_cost), 2)                             AS total_basket_cost
FROM explosion;`}
        height={230}
        showSchema={false}
      />

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="Cycle Detection and Prevention" />

      <P>A cycle occurs when following parent-child links eventually leads back to a node already visited — A is parent of B, B is parent of C, C is parent of A. Without protection, the recursive CTE loops infinitely. Two mechanisms prevent this: a depth limit (simple but imprecise) and a visited-array check (precise cycle detection).</P>

      <CodeBlock
        label="Cycle prevention — depth limit vs visited array"
        code={`-- Method 1: depth limit (simple — stops after N iterations)
WITH RECURSIVE safe_traverse AS (
  SELECT id, parent_id, name, 0 AS depth
  FROM nodes WHERE parent_id IS NULL

  UNION ALL

  SELECT n.id, n.parent_id, n.name, st.depth + 1
  FROM nodes         AS n
  JOIN safe_traverse AS st ON n.parent_id = st.id
  WHERE st.depth < 20    -- stops at depth 20 regardless of cycles
)
SELECT * FROM safe_traverse;
-- Risk: if a cycle exists deeper than 20 levels, it is silently cut off
-- But for most real hierarchies, depth 20 is a safe upper bound

-- Method 2: visited array (precise — detects actual cycles)
WITH RECURSIVE cycle_safe AS (
  SELECT id, parent_id, name,
         ARRAY[id] AS visited    -- track IDs seen in this path
  FROM nodes WHERE parent_id IS NULL

  UNION ALL

  SELECT n.id, n.parent_id, n.name,
         cs.visited || n.id
  FROM nodes      AS n
  JOIN cycle_safe AS cs ON n.parent_id = cs.id
  WHERE NOT (n.id = ANY(cs.visited))  -- stop if we've seen this ID before
)
SELECT * FROM cycle_safe;
-- Precise: stops exactly when a cycle is detected
-- Cost: array grows with depth — slight overhead for deep hierarchies

-- Method 3: both (belt and suspenders for production)
WHERE NOT (n.id = ANY(cs.visited)) AND cs.depth < 50`}
      />

      <SQLPlayground
        initialQuery={`-- Demonstrate cycle detection with a path array
-- Simulating a safe traversal that builds the path and would stop on revisit
WITH RECURSIVE org AS (
  SELECT
    employee_id,
    first_name || ' ' || last_name   AS name,
    manager_id,
    ARRAY[employee_id]               AS visited_ids,
    (first_name || ' ' || last_name)::TEXT AS path,
    0                                AS depth
  FROM employees
  WHERE manager_id IS NULL   -- roots only

  UNION ALL

  SELECT
    e.employee_id,
    e.first_name || ' ' || e.last_name,
    e.manager_id,
    o.visited_ids || e.employee_id,
    o.path || ' → ' || e.first_name || ' ' || e.last_name,
    o.depth + 1
  FROM employees AS e
  JOIN org       AS o ON e.manager_id = o.employee_id
  -- Cycle guard: stop if we've already visited this employee
  WHERE NOT (e.employee_id = ANY(o.visited_ids))
    AND o.depth < 10
)
SELECT
  depth,
  name,
  path,
  array_length(visited_ids, 1)  AS path_length
FROM org
ORDER BY path;`}
        height={280}
        showSchema={true}
      />

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Aggregating Over Hierarchies — Rollup Totals" />

      <P>Once a recursive CTE has mapped the full hierarchy, joining it back to fact data enables rollup aggregations — total sales for a category including all its subcategories, total headcount under each manager including all indirect reports.</P>

      <SQLPlayground
        initialQuery={`-- Aggregate order revenue by top-level department (store city)
-- Simulating a two-level hierarchy: city → stores → orders
WITH RECURSIVE city_store_hierarchy AS (
  -- Anchor: cities as virtual root nodes
  SELECT
    s.city            AS node_id,
    s.city            AS node_name,
    NULL::TEXT        AS parent_id,
    'city'            AS node_type,
    0                 AS depth
  FROM (SELECT DISTINCT city FROM stores) AS s

  UNION ALL

  -- Recursive: stores under each city
  SELECT
    st.store_id,
    st.store_name,
    csh.node_id,
    'store',
    1
  FROM stores AS st
  JOIN city_store_hierarchy AS csh
    ON st.city = csh.node_id
    AND csh.node_type = 'city'
  WHERE csh.depth < 3
),
-- Join hierarchy to revenue facts
node_revenue AS (
  SELECT
    h.node_id,
    h.node_name,
    h.parent_id,
    h.node_type,
    h.depth,
    COALESCE(ROUND(SUM(o.total_amount), 2), 0) AS direct_revenue,
    COALESCE(COUNT(o.order_id), 0)             AS order_count
  FROM city_store_hierarchy AS h
  LEFT JOIN orders AS o
    ON o.store_id = h.node_id
    AND o.order_status = 'Delivered'
  GROUP BY h.node_id, h.node_name, h.parent_id, h.node_type, h.depth
)
SELECT
  REPEAT('  ', depth) || node_name  AS node,
  node_type,
  direct_revenue,
  order_count,
  -- City-level: sum of all stores in that city
  CASE WHEN node_type = 'city'
    THEN ROUND((
      SELECT SUM(nr2.direct_revenue)
      FROM node_revenue AS nr2
      WHERE nr2.parent_id = node_revenue.node_id
    ), 2)
    ELSE direct_revenue
  END                               AS total_revenue
FROM node_revenue
ORDER BY depth, node_name;`}
        height={340}
        showSchema={true}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="What This Looks Like at Work" />

      <P>You are a data engineer at Flipkart. The supply chain team needs a complete product component cost report — for any product, show every raw component it contains at any depth, the cumulative quantity needed, and the total cost contribution. The product hierarchy is 3–5 levels deep and changes weekly. They need this as an on-demand SQL query, not a hardcoded report.</P>

      <TimeBlock time="2:00 PM" label="Requirement: explode any product's BOM on demand">
        Given a product_id, return all components at every depth, their cumulative quantities (multiplied through the hierarchy), and total cost. Works for any product regardless of depth.
      </TimeBlock>

      <TimeBlock time="2:30 PM" label="Design: recursive CTE anchors at the product, recurses into components">
        Anchor = direct components of the product. Recursive = sub-components of each component. Each iteration multiplies the child quantity by the parent's cumulative quantity. Depth guard prevents runaway recursion.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Production-style BOM explosion for FreshMart gift basket
-- Parameterised: change the basket_id to explode any product
WITH
basket_id(id) AS (VALUES (0)),   -- change this to any product

bom(parent_id, child_id, component_name, qty_per_parent, unit_cost) AS (
  VALUES
    (0, 1, 'Amul Butter 500g',     2, 55.00),
    (0, 2, 'Britannia Bread',      1, 35.00),
    (0, 3, 'Juice Pack x3',        1, 40.00),
    (0, 4, 'Gift Packaging',       1, 25.00),
    (3, 5, 'Juice Bottle 200ml',   3, 12.00),
    (3, 6, 'Inner Cardboard Tray', 1,  5.00),
    (4, 7, 'Outer Gift Box',       1, 18.00),
    (4, 8, 'Decorative Ribbon',    2,  3.50),
    (7, 9, 'Cardboard Sheet',      4,  2.00),
    (7,10, 'Adhesive Strip',       6,  0.50)
),

RECURSIVE explosion AS (
  -- Anchor: direct components of the target product
  SELECT
    b.child_id,
    b.component_name,
    b.qty_per_parent                AS qty_at_level,
    b.qty_per_parent                AS cumulative_qty,
    b.unit_cost,
    b.qty_per_parent * b.unit_cost  AS line_total_cost,
    0                               AS depth,
    b.component_name::TEXT          AS full_path,
    LPAD(b.child_id::TEXT, 6, '0')  AS sort_key
  FROM bom AS b, basket_id
  WHERE b.parent_id = basket_id.id

  UNION ALL

  SELECT
    b.child_id,
    b.component_name,
    b.qty_per_parent,
    e.cumulative_qty * b.qty_per_parent,
    b.unit_cost,
    e.cumulative_qty * b.qty_per_parent * b.unit_cost,
    e.depth + 1,
    e.full_path || ' > ' || b.component_name,
    e.sort_key || '.' || LPAD(b.child_id::TEXT, 6, '0')
  FROM bom        AS b
  JOIN explosion  AS e ON b.parent_id = e.child_id
  WHERE e.depth < 8
)
SELECT
  REPEAT('  ', depth) || component_name    AS component,
  qty_at_level                             AS qty_per_parent,
  cumulative_qty                           AS total_qty_needed,
  unit_cost,
  ROUND(line_total_cost, 2)               AS total_cost,
  depth                                   AS bom_level,
  full_path

FROM explosion
ORDER BY sort_key;`}
        height={380}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Cost summary by level
WITH
bom(parent_id, child_id, component_name, qty_per_parent, unit_cost) AS (
  VALUES
    (0, 1, 'Amul Butter 500g',     2, 55.00),
    (0, 2, 'Britannia Bread',      1, 35.00),
    (0, 3, 'Juice Pack x3',        1, 40.00),
    (0, 4, 'Gift Packaging',       1, 25.00),
    (3, 5, 'Juice Bottle 200ml',   3, 12.00),
    (3, 6, 'Inner Cardboard Tray', 1,  5.00),
    (4, 7, 'Outer Gift Box',       1, 18.00),
    (4, 8, 'Decorative Ribbon',    2,  3.50),
    (7, 9, 'Cardboard Sheet',      4,  2.00),
    (7,10, 'Adhesive Strip',       6,  0.50)
),
RECURSIVE explosion AS (
  SELECT b.child_id, b.component_name,
         b.qty_per_parent AS cumulative_qty,
         b.qty_per_parent * b.unit_cost AS line_total_cost,
         0 AS depth
  FROM bom WHERE parent_id = 0
  UNION ALL
  SELECT b.child_id, b.component_name,
         e.cumulative_qty * b.qty_per_parent,
         e.cumulative_qty * b.qty_per_parent * b.unit_cost,
         e.depth + 1
  FROM bom AS b JOIN explosion AS e ON b.parent_id = e.child_id
  WHERE e.depth < 8
)
SELECT
  depth                        AS bom_level,
  COUNT(*)                     AS component_count,
  ROUND(SUM(line_total_cost), 2) AS level_total_cost,
  ROUND(SUM(line_total_cost) / SUM(SUM(line_total_cost)) OVER () * 100, 1)
                               AS pct_of_total
FROM explosion
GROUP BY depth
ORDER BY depth;`}
        height={250}
        showSchema={false}
      />

      <TimeBlock time="3:30 PM" label="Report complete — works for any product, any depth">
        The recursive CTE handles a 3-level hierarchy today and a 6-level hierarchy next quarter without any query changes. The supply chain team parameterises it by changing the basket_id value. The cumulative quantity multiplication propagates correctly through every level — 3 Juice Packs × 3 Bottles each = 9 total bottles, correctly computed at depth 1.
      </TimeBlock>

      <ProTip>
        When building recursive CTEs for BOM explosion, always track cumulative_qty by multiplying the child's qty_per_parent by the parent's cumulative_qty at each level — not just the qty_at_level. A 2-unit parent containing 3-unit children means 6 children total, not 3. The multiplication must compound through every level of the hierarchy. Test the cumulative_qty column first on a small known BOM before running on production data.
      </ProTip>

      <HR />

      {/* ── PART 11 — Interview Prep ── */}
      <Part n="11" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What is a recursive CTE and when would you use one?">
        <p style={{ margin: '0 0 14px' }}>A recursive CTE is a Common Table Expression that references itself in its own definition. It has two parts separated by UNION ALL: an anchor member (a regular SELECT that runs once and seeds the recursion) and a recursive member (a SELECT that references the CTE by name and joins the previous iteration's output to the base table). The database alternates between running the recursive member against the previous iteration's rows and accumulating results, until the recursive member produces zero new rows.</p>
        <p style={{ margin: '0 0 14px' }}>Use a recursive CTE when the data has a hierarchical or graph structure stored in a self-referencing table — a parent_id column that points back to the same table's primary key. The key advantage over self-joins: recursive CTEs traverse hierarchies of unknown depth. A fixed chain of self-joins works only when you know the exact number of levels in advance. Recursive CTEs adapt automatically to any depth.</p>
        <p style={{ margin: 0 }}>Common use cases: organisational hierarchies (employee → manager relationships), product category trees (category → parent category), bill of materials (product → components → sub-components), network/graph traversal (finding paths between nodes), and generating series (sequences of numbers or dates). Any time you find yourself writing a chain of self-joins to handle levels of a hierarchy, replace it with a recursive CTE — the query becomes shorter, more correct, and depth-independent.</p>
      </IQ>

      <IQ q="Explain the anchor and recursive members of a recursive CTE.">
        <p style={{ margin: '0 0 14px' }}>The anchor member is the first SELECT in the recursive CTE — the one that does not reference the CTE itself. It runs exactly once when the CTE begins executing and produces the initial set of rows that seeds the recursion. For a top-down hierarchy traversal, the anchor typically selects root nodes (WHERE parent_id IS NULL). For a bottom-up traversal, the anchor selects a specific leaf node to start from. For a number series, the anchor selects the starting value (SELECT 1 AS n).</p>
        <p style={{ margin: '0 0 14px' }}>The recursive member is the second SELECT — it references the CTE by name and joins the CTE's rows (which represent the previous iteration's output) to the base table to find the next level of rows. Each iteration of the recursive member sees only the rows produced by the immediately preceding iteration — not all accumulated rows. The recursive member must produce fewer and fewer rows as the recursion progresses, eventually producing zero rows to terminate.</p>
        <p style={{ margin: 0 }}>The two members are connected by UNION ALL (not UNION). Using UNION would deduplicate across iterations, which is both semantically wrong for most hierarchies and significantly slower. The final result of the CTE is the UNION ALL of all rows produced by all iterations — the anchor's rows plus every recursive iteration's rows combined. The outer SELECT that queries the CTE reads this complete accumulated result set.</p>
      </IQ>

      <IQ q="How do you prevent infinite recursion in a recursive CTE?">
        <p style={{ margin: '0 0 14px' }}>Infinite recursion occurs when following parent-child links leads back to a node already visited (a cycle: A → B → C → A) or when the termination condition is never satisfied. Without protection, the recursive member keeps producing rows forever — PostgreSQL enforces a default max_recursion_depth of 100 and raises an error when hit, but the error is less useful than intentional termination.</p>
        <p style={{ margin: '0 0 14px' }}>Two protection mechanisms. Method 1: depth limit — add a depth counter to the anchor (0 AS depth) and increment it in the recursive member (depth + 1). Add WHERE depth &lt; N to the recursive member. The recursion stops after N iterations regardless of data. Simple and cheap, but N must be chosen carefully — too low and valid deep hierarchies are cut off, too high and cycles spin for N iterations before stopping. For most org charts N = 10–20 is safe; for BOMs N = 5–8 is typical.</p>
        <p style={{ margin: 0 }}>Method 2: visited array — maintain an array of node IDs seen in the current path. In the anchor, initialise it with ARRAY[id]. In the recursive member, append the new node's ID and add WHERE NOT (new_id = ANY(visited_array)). This stops the moment a cycle is detected, at exactly the right point regardless of depth. Cost: the array grows with depth and IS DISTINCT FROM comparisons are slightly more expensive than integer comparison. For production code on data that might have cycles, use both: the visited array for correctness and a depth limit as a safety backstop.</p>
      </IQ>

      <IQ q="How do you generate a date series using a recursive CTE?">
        <p style={{ margin: '0 0 14px' }}>The pattern: anchor on the start date, recursive member adds one day per iteration, terminate when the date reaches the end date. WITH RECURSIVE date_series AS (SELECT '2024-01-01'::DATE AS dt UNION ALL SELECT dt + 1 FROM date_series WHERE dt &lt; '2024-01-31') SELECT dt FROM date_series.</p>
        <p style={{ margin: '0 0 14px' }}>The primary use of date series in analytics is filling gaps in time-series data. When querying daily revenue, days with no orders produce no rows — the result has gaps. A date series CTE produces every calendar date, and a LEFT JOIN to the revenue data fills in zero for missing days. This ensures reports show a complete timeline without gaps, which is essential for charts and moving averages that depend on consecutive date sequences.</p>
        <p style={{ margin: 0 }}>For monthly series, add INTERVAL '1 month' instead of +1: SELECT '2024-01-01'::DATE AS m UNION ALL SELECT (m + INTERVAL '1 month')::DATE FROM months WHERE m &lt; '2024-12-01'. PostgreSQL also provides the built-in generate_series(start, end, interval) function which is more concise for this purpose, but the recursive CTE pattern is portable across all SQL databases that support WITH RECURSIVE (PostgreSQL, SQL Server, MySQL 8+, SQLite 3.35+).</p>
      </IQ>

      <IQ q="What is the difference between a recursive CTE and a self-join for hierarchical queries?">
        <p style={{ margin: '0 0 14px' }}>A self-join joins a table to itself on a specific relationship — typically parent_id = id. A single self-join produces one level of the hierarchy: employees joined to their direct managers. Two self-joins produce two levels. N self-joins produce N levels. The critical limitation: the number of self-joins must be known and hardcoded. If the hierarchy deepens from 4 to 5 levels, the query must be rewritten to add another self-join. This is brittle — any schema change to the depth of the hierarchy requires a query change.</p>
        <p style={{ margin: '0 0 14px' }}>A recursive CTE traverses any depth automatically. The recursive member defines the relationship between one level and the next. The database applies this definition repeatedly until no new rows are produced. A 4-level hierarchy and a 40-level hierarchy use the identical query — only the data depth differs, not the SQL. This makes recursive CTEs the correct tool for any hierarchy where the depth is variable, unknown at query time, or changes over time.</p>
        <p style={{ margin: 0 }}>Performance comparison: for shallow, fixed-depth hierarchies (always exactly 2-3 levels), self-joins can be marginally faster because the query plan is simpler and the planner can optimise fully. For variable-depth hierarchies, recursive CTEs are both more correct (they handle any depth) and practically faster (a 5-level self-join requires 5 table scans with Cartesian intermediate results; a recursive CTE performs one scan per level with only the relevant rows). The readability advantage strongly favours recursive CTEs — 10 lines replacing 50 lines of chained self-joins, with no depth limitation.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="12" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="ERROR: WITH RECURSIVE query has no self-reference — recursive term missing"
        cause="The recursive member of the CTE does not reference the CTE's own name. A recursive CTE requires the second SELECT (after UNION ALL) to join to the CTE itself — that is what makes it recursive. Without the self-reference, PostgreSQL raises this error because the CTE structure is syntactically recursive (WITH RECURSIVE) but semantically it is just a regular CTE."
        fix="Ensure the recursive member contains a FROM or JOIN that references the CTE by name: WITH RECURSIVE org AS (SELECT ... FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.* FROM employees AS e JOIN org ON e.manager_id = org.employee_id). The JOIN org ON ... is the self-reference. If the query genuinely does not need recursion, remove RECURSIVE from WITH RECURSIVE — a non-recursive CTE does not require the keyword and can use UNION instead of UNION ALL."
      />

      <Err
        msg="ERROR: maximum recursion depth exceeded (100)"
        cause="The recursive CTE ran 100 iterations without the recursive member producing zero rows. Either the data contains a cycle (A is parent of B, B is parent of A), there is no termination condition in the WHERE clause of the recursive member, or the hierarchy is genuinely deeper than 100 levels."
        fix="Add a depth counter and termination condition: 0 AS depth in the anchor, depth + 1 in the recursive member, and WHERE depth &lt; 50 in the recursive member's WHERE clause. For cycle detection, add a visited array: ARRAY[id] in the anchor, visited || new_id in the recursive member, and WHERE NOT (new_id = ANY(visited)) in the WHERE clause. To increase the limit temporarily (not recommended for production): SET max_recursion_depth = 200. Always prefer fixing the data or adding a proper termination condition over raising the limit."
      />

      <Err
        msg="Recursive CTE returns duplicate rows — same node appears multiple times"
        cause="The hierarchy data contains a node with multiple parents (a diamond pattern: A → B → D and A → C → D), causing the recursive member to reach node D twice via different paths. In a true tree (each node has exactly one parent), this should not happen — its presence indicates either bad data or that the data is a directed acyclic graph (DAG) rather than a tree."
        fix="If the data is a DAG (multiple parents allowed), use UNION instead of UNION ALL between anchor and recursive members — UNION deduplicates and ensures each node appears only once in the result. Note: UNION is slower than UNION ALL because deduplication requires sorting or hashing. Alternatively, use a visited array to skip nodes already accumulated. If the data should be a tree and duplicates indicate bad data, audit the parent_id assignments: SELECT child_id, COUNT(DISTINCT parent_id) FROM hierarchy_table GROUP BY child_id HAVING COUNT(DISTINCT parent_id) > 1 — any result here is a node with multiple parents."
      />

      <Err
        msg="BOM explosion produces wrong cumulative quantities — sub-component totals are incorrect"
        cause="The cumulative quantity is not being multiplied through the hierarchy correctly. A common mistake: using qty_per_parent instead of cumulative_qty * qty_per_parent for the child's cumulative quantity. If a product contains 3 packs and each pack contains 4 bottles, the correct total is 12 bottles — but if the recursive member uses only 4 (qty_per_parent of the pack) instead of 3 × 4 = 12 (parent's cumulative_qty × child's qty_per_parent), the total is wrong."
        fix="In the recursive member, compute the child's cumulative quantity as parent.cumulative_qty * child.qty_per_parent — always multiply by the parent's cumulative quantity, not just the level's quantity. Verify with a small known BOM: manually calculate the expected quantities for each component and compare to the CTE output. Add a CHECK column to the output showing the multiplication: parent_cumulative_qty || ' × ' || qty_per_parent || ' = ' || cumulative_qty to make the calculation visible and auditable."
      />

      <Err
        msg="Date series CTE generates incorrect dates — skips days or produces wrong range"
        cause="The termination condition uses a strict less-than (&lt;) when it should include the end date, or the date arithmetic is using INTERVAL in a way that skips non-existent dates (e.g., adding months to January 31 produces March 2 instead of February 28). Alternatively, the cast from INTERVAL addition back to DATE is missing, causing a TIMESTAMP result that does not match a DATE column in the LEFT JOIN."
        fix="For daily series: use WHERE dt &lt;= '2024-01-31' (inclusive) or WHERE dt &lt; '2024-02-01' (exclusive boundary). Both include January 31. For monthly series: use (month_start + INTERVAL '1 month')::DATE — the ::DATE cast is essential. PostgreSQL's INTERVAL '1 month' handles month-end correctly: '2024-01-31'::DATE + INTERVAL '1 month' = '2024-02-29' (in a leap year), not March 2. Always cast the result back to DATE to ensure the join condition with DATE columns works correctly."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="Build two recursive CTEs using FreshMart data. (1) Write a recursive CTE that generates every date in the range of FreshMart's order data (from the MIN order_date to the MAX order_date), then LEFT JOIN it to orders to produce a complete daily revenue calendar showing: calendar_date, daily_revenue (0 if no orders that day), order_count (0 if none), and a 3-day moving average of daily_revenue using a window function on the result. (2) Write a recursive CTE that traverses the FreshMart employee table from root (manager_id IS NULL) downward, producing: employee_id, full_name, job_title, depth (0 for root), indented_name (REPEAT spaces + name), full_path (names joined by ' → '), and direct_report_count (how many employees have this person as their manager_id — compute with a subquery or join). Order the org chart by the path so siblings appear together."
        hint="CTE 1: anchor = SELECT MIN(order_date) AS dt FROM orders, recursive = SELECT dt + 1 WHERE dt < (SELECT MAX(order_date) FROM orders). LEFT JOIN to orders. Window function for moving avg. CTE 2: anchor = WHERE manager_id IS NULL, recursive = JOIN employees ON manager_id = org.employee_id. direct_report_count = subquery COUNT WHERE manager_id = employee_id."
        answer={`-- ── Part 1: Complete daily revenue calendar ─────────────────────
WITH RECURSIVE date_spine AS (
  -- Anchor: first order date in the dataset
  SELECT MIN(order_date)::DATE AS dt
  FROM orders

  UNION ALL

  -- Recursive: increment one day at a time
  SELECT dt + 1
  FROM date_spine
  WHERE dt < (SELECT MAX(order_date)::DATE FROM orders)
),
daily_totals AS (
  SELECT
    ds.dt                                            AS calendar_date,
    COALESCE(ROUND(SUM(o.total_amount), 2), 0)       AS daily_revenue,
    COALESCE(COUNT(o.order_id), 0)                   AS order_count
  FROM date_spine AS ds
  LEFT JOIN orders AS o
    ON o.order_date = ds.dt
    AND o.order_status = 'Delivered'
  GROUP BY ds.dt
)
SELECT
  calendar_date,
  daily_revenue,
  order_count,
  -- 3-day moving average of revenue
  ROUND(AVG(daily_revenue) OVER (
    ORDER BY calendar_date
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ), 2)                                              AS ma_3day
FROM daily_totals
ORDER BY calendar_date;


-- ── Part 2: Employee org chart traversal ──────────────────────
WITH RECURSIVE org_chart AS (
  -- Anchor: root employees (no manager)
  SELECT
    employee_id,
    first_name || ' ' || last_name                 AS full_name,
    job_title,
    manager_id,
    0                                              AS depth,
    (first_name || ' ' || last_name)::TEXT         AS full_path,
    LPAD(employee_id::TEXT, 6, '0')                AS sort_key
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  SELECT
    e.employee_id,
    e.first_name || ' ' || e.last_name,
    e.job_title,
    e.manager_id,
    oc.depth + 1,
    oc.full_path || ' → ' || e.first_name || ' ' || e.last_name,
    oc.sort_key || '.' || LPAD(e.employee_id::TEXT, 6, '0')
  FROM employees  AS e
  JOIN org_chart  AS oc ON e.manager_id = oc.employee_id
  WHERE oc.depth < 10   -- safety guard
)
SELECT
  employee_id,
  full_name,
  job_title,
  depth,
  -- Indented name for visual hierarchy
  REPEAT('  ', depth) || full_name                 AS indented_name,
  full_path,
  -- How many employees directly report to this person?
  (
    SELECT COUNT(*)
    FROM employees AS sub
    WHERE sub.manager_id = org_chart.employee_id
  )                                                AS direct_report_count
FROM org_chart
ORDER BY sort_key;`}
        explanation="Part 1 uses a two-step approach. The date_spine CTE anchors on MIN(order_date) and increments daily until MAX(order_date) — the subqueries in both anchor and termination condition ensure the range is data-driven, not hardcoded. The daily_totals CTE LEFT JOINs the date spine to orders — every calendar date appears even if no orders exist, with COALESCE converting NULL aggregates to 0. The final SELECT applies a window function on the result of daily_totals for the 3-day moving average — window functions cannot be applied inside the CTE that produces the base data, so a third query level is needed. Part 2 builds a sort_key by padding each employee_id with leading zeros and concatenating with dots — LPAD(id, 6, '0') produces '000042' ensuring lexicographic order matches numeric order at each level. Siblings within the same parent sort by employee_id, and the dot-separated path ensures parents always appear before their children. The direct_report_count uses a correlated subquery per row — for large employee tables, a pre-aggregated LEFT JOIN would be more efficient, but the subquery is clearer for demonstration. The path string and sort_key serve different purposes: sort_key is for correct ordering, full_path is for human-readable display."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'A recursive CTE has two parts joined by UNION ALL: an anchor member (runs once, seeds the recursion) and a recursive member (references the CTE itself, runs repeatedly until it produces zero rows).',
          'The recursive member sees only the rows from the immediately preceding iteration — not all accumulated rows. Each iteration adds a new level of the hierarchy to the accumulated result.',
          'Always include a termination condition: a depth counter with WHERE depth < N (simple) or a visited array with WHERE NOT (id = ANY(visited)) (precise cycle detection). Both together is safest for production.',
          'Top-down traversal: anchor on roots (WHERE parent_id IS NULL), recursive member joins children to parents. Bottom-up traversal: anchor on a specific leaf, recursive member joins parent to child via manager_id = previous.employee_id.',
          'Date series: anchor on start date, recursive increments by +1 or INTERVAL \'1 month\'. LEFT JOIN to fact data fills gaps with zero — essential for complete time-series charts and moving averages.',
          'Build path strings by concatenating in the recursive member: path || \' → \' || new_name. Build sort keys with LPAD(id, 6, \'0\') so siblings sort correctly by numeric ID while maintaining lexicographic path order.',
          'BOM explosion: cumulative quantity must multiply through every level — child.cumulative_qty = parent.cumulative_qty × child.qty_per_parent. Not just qty_per_parent alone.',
          'Cycle prevention with visited array: ARRAY[id] in anchor, visited || new_id in recursive member, WHERE NOT (new_id = ANY(visited)) to stop. Use UNION (not UNION ALL) for DAGs where a node can have multiple parents.',
          'Recursive CTEs replace chains of self-joins for hierarchical data. Self-joins require knowing the depth in advance; recursive CTEs handle any depth with the same query.',
          'PostgreSQL default max_recursion_depth is 100. Hit it by accident means a cycle or missing termination condition — fix the query, not the limit. SET max_recursion_depth is a last resort.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 55</strong>, you learn EXPLAIN and Query Optimisation — reading execution plans, identifying bottlenecks, rewriting slow queries, and the systematic approach to making any query faster.
        </p>
        <Link href="/learn/sql/explain-analyze" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 55 → EXPLAIN and Query Optimisation
        </Link>
      </div>

    </LearnLayout>
  );
}