import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Schemas, Tables, Keys and Indexes — Data Engineering | Chaduvuko',
  description:
    'The building blocks of every database — what a schema is, how tables are structured, what every key type does, how indexes work, and the design patterns that make databases reliable and fast.',
}

// ── Local components ────────────────────────────────────────────────────────

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
    letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18,
    fontFamily: 'var(--font-display)', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700,
    letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12,
    fontFamily: 'var(--font-display)',
  }}>{children}</h3>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
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
      fontSize: 13, lineHeight: 1.9, color: 'var(--text)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
)

const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '24px 28px', marginBottom: 24,
  }}>
    {children}
  </div>
)

interface TableRow { [key: string]: string }
interface CompareTableProps {
  headers: { label: string; color?: string }[]
  rows: TableRow[]
  keys: string[]
}

const CompareTable = ({ headers, rows, keys }: CompareTableProps) => (
  <div style={{ overflowX: 'auto', marginBottom: 28 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.6 }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={h.label} style={{
              padding: '10px 16px', textAlign: 'left',
              fontSize: i === 0 ? 10 : 11, fontWeight: 700,
              letterSpacing: i === 0 ? '.12em' : '.06em',
              textTransform: 'uppercase',
              color: h.color ?? 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)',
              background: h.color ? `${h.color}08` : 'var(--bg2)',
              minWidth: i === 0 ? 130 : 160,
            }}>{h.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
            {keys.map((k, ki) => (
              <td key={k} style={{
                padding: '10px 16px',
                color: ki === 0 ? 'var(--muted)' : 'var(--text)',
                fontSize: ki === 0 ? 11 : 13,
                fontFamily: ki === 0 ? 'var(--font-mono)' : 'inherit',
                fontWeight: ki === 0 ? 700 : 400,
                textTransform: ki === 0 ? 'uppercase' : 'none',
                letterSpacing: ki === 0 ? '.06em' : 'normal',
                borderBottom: '1px solid var(--border)',
                borderLeft: ki > 0 && headers[ki]?.color
                  ? `2px solid ${headers[ki].color}40`
                  : ki > 0 ? '1px solid var(--border)' : 'none',
                verticalAlign: 'top',
              }}>{row[k]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// ── Page ────────────────────────────────────────────────────────────────────

export default function SchemasTablesKeysModule() {
  return (
    <LearnLayout
      title="Schemas, Tables, Keys and Indexes — The Building Blocks"
      description="The foundation of every database — what each concept is and why it matters."
      section="Data Engineering"
      readTime="50 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — Why This Matters ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Foundation Everything Else Builds On" />
        <SectionTitle>Why Building Blocks Matter More Than Advanced Techniques</SectionTitle>

        <Para>
          A data engineer who does not deeply understand schemas, keys, and constraints
          builds pipelines that produce incorrect data — silently, without errors.
          A missing foreign key lets orphaned records accumulate. A missing NOT NULL
          constraint lets NULLs propagate into calculations that produce wrong totals.
          A wrong data type converts a DECIMAL to a FLOAT and silently loses precision
          in financial data.
        </Para>

        <Para>
          These are not theoretical problems. They are the root cause of the majority
          of data quality incidents at real companies. The investigation almost always
          traces back to a schema design decision made early in the pipeline's life
          that seemed fine at the time.
        </Para>

        <Para>
          This module builds a complete, precise mental model of every database
          building block: what it is, how it works internally, what happens when
          it is missing, and what the best practice is. By the end, you will read
          a database schema the way a senior engineer reads it — seeing not just
          what is there, but understanding the implications of every design choice.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 14, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', marginBottom: 14,
          }}>
            The six building blocks of every relational database
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { num: '01', name: 'Schema', desc: 'The container that groups related tables and sets the namespace boundary.' },
              { num: '02', name: 'Table', desc: 'The structure that holds rows and columns — the fundamental unit of relational storage.' },
              { num: '03', name: 'Data Types', desc: 'The rules that govern what values each column can hold.' },
              { num: '04', name: 'Keys', desc: 'The identifiers and relationships that connect tables and enforce uniqueness.' },
              { num: '05', name: 'Constraints', desc: 'The rules that enforce data integrity at the database level.' },
              { num: '06', name: 'Indexes', desc: 'The structures that make queries fast — covered in depth in Module 09.' },
            ].map((item) => (
              <div key={item.num} style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '12px 14px',
              }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                  textTransform: 'uppercase', marginBottom: 4,
                }}>{item.num} — {item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </HighlightBox>
      </section>

      <Divider />

      {/* ── Part 02 — Schemas ────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Schemas" />
        <SectionTitle>What a Schema Is — And Why It Is More Than Just a Container</SectionTitle>

        <Para>
          The word "schema" means different things in different contexts, which creates
          confusion. In the context of a relational database, a schema is a namespace —
          a named collection of database objects (tables, views, functions, sequences)
          that belong together. In the context of a table, schema means the definition
          of the table's structure — its columns, types, and constraints. In the context
          of a data lake, schema refers to the structure of files as interpreted at
          read time.
        </Para>

        <Para>
          We will cover all three meanings because you will encounter all three in
          a data engineering career. For this module, we focus primarily on the first
          two — the database-level schema and the table-level schema definition.
        </Para>

        <SubTitle>Database-level schemas — namespaces and organisation</SubTitle>

        <Para>
          In PostgreSQL, a database can contain multiple schemas. Each schema is a
          namespace — tables with the same name can exist in different schemas without
          conflict. The default schema is called <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>public</code>.
          Most simple applications use only the public schema. Data engineering
          platforms use multiple schemas deliberately to organise their layers.
        </Para>

        <CodeBox label="Schemas as namespaces — organising a data warehouse in layers">{`-- A Snowflake / PostgreSQL data warehouse organised with schemas:

CREATE SCHEMA landing;   -- raw files loaded from sources, not cleaned
CREATE SCHEMA bronze;    -- partitioned raw data, Parquet format
CREATE SCHEMA silver;    -- cleaned, deduplicated, validated
CREATE SCHEMA gold;      -- aggregated, business-ready metrics
CREATE SCHEMA staging;   -- temporary tables for in-progress transformations
CREATE SCHEMA audit;     -- data quality logs, pipeline run metadata

-- Tables in different schemas can have the same name without conflict:
silver.orders    ← cleaned orders, one row per valid order
gold.orders      ← does NOT exist here — gold has aggregated metrics
staging.orders   ← temporary version while transformation runs

-- Referencing a table with its full qualified name:
SELECT * FROM silver.orders WHERE created_at >= '2026-03-01';

-- Setting the search path so you don't need full qualification:
SET search_path = silver, gold, public;
SELECT * FROM orders;   -- PostgreSQL looks in silver first, then gold

-- Why schema separation matters for data engineering:
  dbt models write to specific schemas defined in dbt_project.yml
  Access control is granted at schema level (GRANT USAGE ON SCHEMA gold TO analyst_role)
  Different retention policies per schema (landing: 30 days, gold: permanent)
  Pipeline monitoring groups metrics by schema to track each layer's health`}</CodeBox>

        <SubTitle>Table-level schema — the structure definition</SubTitle>

        <Para>
          At the table level, a schema is the complete definition of what that table
          contains: every column's name, data type, nullability, default value, and
          any constraints. This definition is enforced by the database on every write.
          Understanding exactly what goes into a table schema — and why each element
          matters — is what separates a data engineer who builds reliable pipelines
          from one who builds fragile ones.
        </Para>

        <CodeBox label="Complete table schema — every element explained">{`CREATE TABLE silver.orders (
    -- PRIMARY KEY: unique identifier for this record
    order_id        BIGINT          NOT NULL,

    -- FOREIGN KEYS: references to related tables
    customer_id     BIGINT          NOT NULL,
    restaurant_id   INTEGER         NOT NULL,

    -- BUSINESS DATA columns
    order_amount    DECIMAL(10, 2)  NOT NULL,
    delivery_fee    DECIMAL(6, 2)   NOT NULL DEFAULT 0.00,
    discount_amount DECIMAL(8, 2)   NOT NULL DEFAULT 0.00,

    -- CATEGORICAL column with value constraint
    status          VARCHAR(20)     NOT NULL
                    DEFAULT 'placed'
                    CHECK (status IN ('placed','confirmed','preparing',
                                     'picked_up','delivered','cancelled')),

    -- OPTIONAL columns (nullable) — not every order has these
    promo_code      VARCHAR(50)     NULL,
    special_instructions TEXT       NULL,

    -- AUDIT columns — always present in production tables
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    ingested_at     TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    pipeline_run_id UUID            NOT NULL,

    -- CONSTRAINTS defined inline
    CONSTRAINT pk_orders            PRIMARY KEY (order_id),
    CONSTRAINT fk_orders_customer   FOREIGN KEY (customer_id)
                                    REFERENCES silver.customers(customer_id)
                                    ON DELETE RESTRICT,
    CONSTRAINT fk_orders_restaurant FOREIGN KEY (restaurant_id)
                                    REFERENCES silver.restaurants(restaurant_id)
                                    ON DELETE RESTRICT,
    CONSTRAINT chk_order_amount     CHECK (order_amount > 0),
    CONSTRAINT chk_delivery_fee     CHECK (delivery_fee >= 0)
);

-- Each element answers a question:
--   BIGINT vs INTEGER    → how large can this ID grow?
--   NOT NULL vs NULL     → is this field always present or sometimes missing?
--   DEFAULT              → what value if nothing is provided?
--   CHECK                → what values are valid for this field?
--   FOREIGN KEY          → what table does this reference?
--   ON DELETE RESTRICT   → what happens if the referenced row is deleted?`}</CodeBox>

        <Callout type="info">
          <strong>The audit columns rule:</strong> every production table should have
          at minimum <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>created_at</code> and{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>updated_at</code> timestamps. Add{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>ingested_at</code> and{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>pipeline_run_id</code> to every
          table in your data platform. These columns are what allow you to answer "when
          was this record last modified?" and "which pipeline run produced this data?" —
          questions you will need to answer during every debugging session.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 03 — Data Types ──────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Data Types" />
        <SectionTitle>Data Types — Why Every Column's Type Is a Real Decision</SectionTitle>

        <Para>
          Choosing a data type is not a formality — it is a decision that affects
          storage cost, query performance, the range of valid values, the precision
          of calculations, and what happens when values are compared or sorted. Wrong
          type choices produce subtle bugs that are hard to find and expensive to fix
          once data is in production.
        </Para>

        <SubTitle>Numeric types — the most common source of silent bugs</SubTitle>

        <CodeBox label="Numeric types — sizes, ranges, and when to use each">{`INTEGER TYPES:
  SMALLINT    2 bytes   -32,768 to 32,767
                        Use: age, small counters, status codes
                        Danger: auto-increment IDs that might exceed 32k

  INTEGER     4 bytes   -2,147,483,648 to 2,147,483,647 (~2.1 billion)
                        Use: most IDs, counts, quantities
                        Danger: Swiggy order IDs exceeded 2B — use BIGINT

  BIGINT      8 bytes   -9.2 quintillion to 9.2 quintillion
                        Use: all auto-increment primary keys, timestamps
                             as milliseconds, transaction IDs at scale
                        Safe default for any ID column

FLOATING POINT TYPES (approximate — never use for money):
  REAL        4 bytes   ~7 significant decimal digits
  DOUBLE      8 bytes   ~15 significant decimal digits
                        Use: scientific measurements, ML feature values
                        NEVER use for: money, financial amounts, percentages
                        Reason: 0.1 + 0.2 = 0.30000000000000004 in IEEE 754

EXACT NUMERIC TYPES (use for money):
  DECIMAL(p, s) / NUMERIC(p, s)
                        p = total digits, s = digits after decimal point
                        DECIMAL(10, 2) → up to 99,999,999.99
                        DECIMAL(15, 4) → up to 99,999,999,999.9999
                        Use: ALL monetary values, financial calculations,
                             tax amounts, exchange rates
                        Exact arithmetic — 0.1 + 0.2 = 0.3 exactly

SERIAL / AUTO-INCREMENT (PostgreSQL):
  SERIAL      = INTEGER with auto-increment sequence
  BIGSERIAL   = BIGINT with auto-increment sequence
  Use BIGSERIAL for all primary keys by default
  Note: SERIAL is PostgreSQL-specific; SQL standard uses
        GENERATED ALWAYS AS IDENTITY`}</CodeBox>

        <SubTitle>Text types — size matters more than you think</SubTitle>

        <CodeBox label="Text types — choosing the right one">{`VARCHAR(n)    Variable length, max n characters
              Storage: only uses space for actual content + overhead
              Use: names (VARCHAR(200)), emails (VARCHAR(320)),
                   phone numbers (VARCHAR(20)), status codes (VARCHAR(20))
              Always specify n — unbounded VARCHAR is a maintenance trap

CHAR(n)       Fixed length, always n characters (padded with spaces)
              Use: country codes (CHAR(2)), currency codes (CHAR(3))
              Avoid: most use cases — VARCHAR is almost always better

TEXT          Variable length, no limit
              Storage: same as VARCHAR in PostgreSQL internally
              Use: free-form text (notes, descriptions, review text),
                   JSON stored as text, long URLs
              Never use for: fields where length should be bounded

Key rules:
  Email:      VARCHAR(320)  — RFC 5321 max is 320 chars
  Phone:      VARCHAR(20)   — international format + formatting chars
  Country:    CHAR(2)       — ISO 3166-1 alpha-2 always exactly 2 chars
  URL:        TEXT          — can be arbitrarily long
  Status:     VARCHAR(20)   — short controlled vocabulary
  Review:     TEXT          — unbounded free text
  UUID:       UUID or CHAR(36) — always exactly 36 chars with dashes

The VARCHAR vs TEXT debate in PostgreSQL:
  In PostgreSQL, VARCHAR(n) and TEXT have identical performance.
  The only difference is VARCHAR(n) enforces a length limit.
  Always prefer VARCHAR(n) with a reasonable limit over TEXT
  for fields where length should be controlled.`}</CodeBox>

        <SubTitle>Date and time types — the most mishandled category</SubTitle>

        <CodeBox label="Date/time types — timezone handling is critical">{`DATE          Calendar date only: 2026-03-17
              Storage: 4 bytes
              Use: birthdates, event dates, report dates
              No timezone — just a calendar date

TIME          Time of day only: 20:14:32
              Rarely used alone. Usually combined with date.

TIMESTAMP     Date + time without timezone: 2026-03-17 20:14:32
              Storage: 8 bytes
              Use: NEVER for production data that spans timezones
              Problem: "20:14:32" means nothing without knowing the timezone
                       A Mumbai user at 8:14 PM is 14:44 UTC
                       A London user at 8:14 PM is 20:14 UTC
                       Stored without timezone, these are indistinguishable

TIMESTAMPTZ   Date + time WITH timezone: 2026-03-17T20:14:32+05:30
(TIMESTAMP    Storage: 8 bytes (PostgreSQL stores internally as UTC)
WITH TIME     Use: ALWAYS use for event timestamps in production
ZONE)         Why: unambiguous, converts to local time at query time,
                   correct cross-timezone comparisons and sorting

THE RULE: always use TIMESTAMPTZ for event timestamps.
          Use DATE when you genuinely only need a calendar date
          (e.g., birth_date, report_date, expiry_date).

INTERVAL      Duration: '3 days', '2 hours 30 minutes', '1 year'
              Use: date arithmetic, scheduling intervals

Common bugs from TIMESTAMP without timezone:
  - Orders from Indian users at 11:30 PM appear to be from "the next day"
    when analysed by a European team in UTC
  - Partition pruning fails: WHERE created_at >= '2026-03-17'
    evaluates differently in IST vs UTC context
  - Daylight saving time transitions produce duplicate or missing hours`}</CodeBox>

        <SubTitle>Special types worth knowing</SubTitle>

        <CodeBox label="Special data types used frequently in production schemas">{`UUID          Universally Unique Identifier
              Format: 550e8400-e29b-41d4-a716-446655440000
              Storage: 16 bytes (as UUID type) or 36 bytes (as CHAR(36))
              Use: globally unique IDs across distributed systems,
                   order IDs, payment IDs, user IDs at large scale
              Advantage: generated independently by any system,
                         no central sequence required
              Disadvantage: random UUIDs create index fragmentation
                            — use UUIDv7 (time-ordered) for better performance

BOOLEAN       TRUE / FALSE / NULL
              Storage: 1 byte
              Use: flags, feature toggles, yes/no fields
              Note: three-valued logic — NULL means "unknown",
                    not FALSE. WHERE is_premium = TRUE excludes NULLs.

JSONB         Binary JSON, indexed
              Storage: variable
              Use: semi-structured data within a relational table
                   (metadata, config, variable attributes per record)
              Supports: GIN indexes for fast key/value queries
              vs JSON: JSONB parses and stores in binary (faster queries),
                       JSON stores original text (preserves whitespace/key order)
              Rule: always prefer JSONB over JSON in PostgreSQL

ARRAY         Column containing an array of a specific type
              Example: tags TEXT[], phone_numbers VARCHAR(20)[]
              Use: tags, labels, multi-value attributes
              Caution: arrays break normalisation — usually a sign
                       you need a separate table with a foreign key

ENUM          User-defined type with a fixed set of values
              Example: CREATE TYPE order_status AS ENUM ('placed', 'delivered')
              Advantage: storage-efficient, enforces values at type level
              Disadvantage: adding values requires ALTER TYPE (can be slow)
              Recommendation: use VARCHAR + CHECK constraint instead for flexibility`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Keys ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Keys" />
        <SectionTitle>Keys — The Identifiers and Relationships That Hold Data Together</SectionTitle>

        <Para>
          Keys are the mechanism by which a relational database enforces identity
          and relationships. Without keys, a database is just a collection of
          independent rows with no way to identify a specific record or connect
          related records across tables. Keys are what give the "relational" in
          relational database its meaning.
        </Para>

        <SubTitle>Primary Key — the identity of a row</SubTitle>

        <Para>
          A primary key is the column or combination of columns that uniquely identifies
          each row in a table. Every table should have exactly one primary key. The
          database enforces two guarantees on a primary key: uniqueness (no two rows
          can have the same primary key value) and NOT NULL (a row cannot exist without
          a primary key value). The database automatically creates a unique index on
          the primary key.
        </Para>

        <CodeBox label="Primary key — types and trade-offs">{`SURROGATE KEY (synthetic, auto-generated):
  order_id BIGSERIAL PRIMARY KEY
  -- or --
  order_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY
  -- or --
  order_id UUID DEFAULT gen_random_uuid() PRIMARY KEY

  Advantages:
    → Stable — never changes even if business data changes
    → Simple — single column, always a known type
    → Efficient — integer PKs are smaller and faster to index than UUIDs
  
  Disadvantages:
    → Meaningless — tells you nothing about the row
    → Requires a separate business key for deduplication

NATURAL KEY (from the domain):
  email VARCHAR(320) PRIMARY KEY  -- for a users table
  isbn  CHAR(13)     PRIMARY KEY  -- for a books table
  
  Advantages:
    → Meaningful — also serves as a lookup key
    → No extra column needed
  
  Disadvantages:
    → Can change (user changes email → cascading update everywhere)
    → Must be truly unique and immutable in the real world
    → Longer values create larger, slower indexes
  
COMPOSITE KEY (multiple columns together):
  PRIMARY KEY (order_id, item_sequence)  -- for an order_items table
  PRIMARY KEY (student_id, course_id)    -- for an enrollment table
  
  Use when: no single column uniquely identifies a row, but a
            combination does. Common in junction/association tables.

RECOMMENDATION: use BIGSERIAL or UUID as surrogate PKs for almost
everything. Natural keys seem appealing but cause pain when data
changes. Keep natural keys as UNIQUE constraints, not the PK.`}</CodeBox>

        <SubTitle>Foreign Key — the relationship between tables</SubTitle>

        <Para>
          A foreign key is a column (or set of columns) in one table that references
          the primary key of another table. It enforces <strong>referential integrity</strong>:
          a row in the child table cannot reference a primary key value that does not
          exist in the parent table. You cannot have an order for a customer who does
          not exist.
        </Para>

        <CodeBox label="Foreign keys — referential integrity and cascade options">{`-- Child table with foreign key references to two parent tables:
CREATE TABLE silver.orders (
    order_id      BIGINT PRIMARY KEY,
    customer_id   BIGINT NOT NULL,
    restaurant_id INTEGER NOT NULL,

    CONSTRAINT fk_customer   FOREIGN KEY (customer_id)
                             REFERENCES silver.customers(customer_id)
                             ON DELETE RESTRICT   -- prevent deleting customer with orders
                             ON UPDATE CASCADE,   -- if customer_id changes, update here too

    CONSTRAINT fk_restaurant FOREIGN KEY (restaurant_id)
                             REFERENCES silver.restaurants(restaurant_id)
                             ON DELETE RESTRICT
                             ON UPDATE CASCADE
);

ON DELETE options — what happens when the parent row is deleted:
  RESTRICT    → PREVENT the delete if child rows reference it (safest for DE)
  CASCADE     → DELETE all child rows when parent is deleted (dangerous — use carefully)
  SET NULL    → Set foreign key column to NULL when parent deleted (requires nullable FK)
  SET DEFAULT → Set to default value (rare)
  NO ACTION   → Like RESTRICT but deferred until end of transaction

ON UPDATE options — what happens when the parent primary key changes:
  CASCADE     → UPDATE the foreign key value in all child rows automatically
  RESTRICT    → PREVENT the update if child rows reference it
  (Same other options as ON DELETE)

REAL IMPACT: what FK violations look like without enforcement:
  Without FK constraint on customer_id:
    Customer 4201938 gets deleted (GDPR request)
    All their orders still exist with customer_id = 4201938
    JOIN query: SELECT o.*, c.name FROM orders o JOIN customers c
                ON o.customer_id = c.id
    → All of customer 4201938's orders vanish from the result
       (no matching customer row → JOIN returns nothing)
    → Metrics show fewer orders than actually exist — silent data loss

  With FK constraint ON DELETE RESTRICT:
    Attempt to delete customer 4201938 → ERROR: violates foreign key
    Constraint forces you to handle the orders first (archive or anonymise)
    before the customer record can be removed

FK in data warehouses (Snowflake, BigQuery):
  FKs are defined but NOT ENFORCED in most warehouses.
  They are documentation and query optimizer hints, not runtime checks.
  Data quality must be enforced by pipeline logic instead.
  Always add dbt tests for FK relationships in warehouse models.`}</CodeBox>

        <SubTitle>Unique Key — uniqueness without being the primary key</SubTitle>

        <Para>
          A unique constraint enforces that no two rows in a table have the same value
          in the constrained column (or combination of columns). Unlike a primary key,
          a table can have multiple unique constraints, and unique constraint columns can
          be nullable (though only one NULL is allowed per column by standard SQL).
        </Para>

        <CodeBox label="Unique keys — when and how to use them">{`-- Table with multiple unique constraints:
CREATE TABLE silver.customers (
    customer_id  BIGINT      PRIMARY KEY,           -- PK: auto-increment
    email        VARCHAR(320) NOT NULL UNIQUE,      -- business key: email must be unique
    phone        VARCHAR(20)  NULL     UNIQUE,      -- optional but unique if present
    external_id  VARCHAR(50)  NOT NULL UNIQUE       -- ID from source system (Shopify etc.)
);

-- Composite unique constraint:
CREATE TABLE silver.restaurant_menus (
    menu_id       BIGINT  PRIMARY KEY,
    restaurant_id INTEGER NOT NULL,
    menu_name     VARCHAR(100) NOT NULL,
    UNIQUE (restaurant_id, menu_name)   -- a restaurant can't have two menus with the same name
);

USE CASES for unique constraints:
  ✓ email address in a users table
  ✓ external_id from source system (prevents duplicate ingestion)
  ✓ slug in a CMS (URL must be unique)
  ✓ (user_id, product_id) in a wishlist table (one wishlist entry per product)

UNIQUE vs PRIMARY KEY:
  Primary key: exactly one per table, cannot be NULL
  Unique:      multiple allowed per table, can be NULL (one NULL per column)

UNIQUE in data engineering pipelines:
  External IDs from source systems should always have a UNIQUE constraint.
  Without it, a pipeline bug that re-inserts the same record creates duplicates
  that are invisible until someone notices metrics are inflated.
  With the constraint, the duplicate insert fails visibly with an error.`}</CodeBox>

        <SubTitle>Natural key vs surrogate key — a deeper look</SubTitle>

        <Para>
          The choice between natural keys and surrogate keys is one of the most
          debated schema design questions. Here is the practical answer from a
          data engineering perspective.
        </Para>

        <CompareTable
          headers={[
            { label: 'Dimension' },
            { label: 'Natural Key', color: '#7b61ff' },
            { label: 'Surrogate Key', color: '#00e676' },
          ]}
          keys={['dim', 'natural', 'surrogate']}
          rows={[
            { dim: 'Definition', natural: 'A column that exists in the real world and uniquely identifies the entity (email, ISBN, PAN number)', surrogate: 'A generated identifier with no meaning outside the database (auto-increment integer, UUID)' },
            { dim: 'Stability', natural: 'Can change — users change email, companies rebrand', surrogate: 'Never changes — it was generated and has no real-world meaning to update' },
            { dim: 'Join performance', natural: 'Slower — larger values (strings) create bigger, slower indexes', surrogate: 'Faster — integers are small and fast to index and compare' },
            { dim: 'Readability', natural: 'Self-documenting — you can see what the row represents from the key', surrogate: 'Opaque — "47291" means nothing without looking up the row' },
            { dim: 'Deduplication', natural: 'Use as deduplication key — same email = same customer', surrogate: 'Cannot deduplicate on its own — need a separate business key column' },
            { dim: 'Recommended for', natural: 'UNIQUE constraint as business key — alongside a surrogate PK', surrogate: 'PRIMARY KEY on all tables — stable, small, fast' },
          ]}
        />

        <Para>
          The practical recommendation used by most data engineering teams: use a
          surrogate key (BIGSERIAL or UUID) as the primary key for all tables, and
          add a UNIQUE constraint on the natural business key column. This gives you
          the stability and performance of a surrogate PK while still enforcing the
          uniqueness of the natural key.
        </Para>
      </section>

      <Divider />

      {/* ── Part 05 — Constraints ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Constraints" />
        <SectionTitle>Constraints — The Rules That Keep Data Honest</SectionTitle>

        <Para>
          A constraint is a rule enforced by the database on every write operation.
          When a constraint is violated, the database rejects the operation entirely —
          the row is not written and the transaction is rolled back. Constraints are
          the database's built-in data quality layer. They are what makes a relational
          database more trustworthy than a CSV file, which accepts anything.
        </Para>

        <Para>
          There are five types of constraints. Every data engineer should know all
          five, understand what each one protects against, and be able to identify
          which constraint is appropriate for each data quality need.
        </Para>

        {[
          {
            constraint: 'NOT NULL',
            color: '#00e676',
            protects: 'Prevents a column from ever containing a NULL value. The most basic and most frequently needed constraint.',
            example: `customer_id BIGINT NOT NULL`,
            when: 'Any column that must always have a value — IDs, required business fields, audit timestamps. If the business logic says "every order must have a customer," make customer_id NOT NULL.',
            what_breaks: 'Without NOT NULL: a pipeline bug inserts orders with NULL customer_id. JOINs on customer_id silently return no matching rows. Aggregations exclude NULL rows. Metrics are wrong.',
          },
          {
            constraint: 'UNIQUE',
            color: '#7b61ff',
            protects: 'Ensures no two rows have the same value in the constrained column(s). Prevents duplicates.',
            example: `email VARCHAR(320) NOT NULL UNIQUE`,
            when: 'Any column or combination of columns that must be unique: email addresses, external IDs from source systems, (order_id, item_id) pairs in an order_items table.',
            what_breaks: 'Without UNIQUE on external_id: a pipeline that reruns inserts the same source records again. Counts double. Aggregations double. Users appear twice in reports.',
          },
          {
            constraint: 'CHECK',
            color: '#f97316',
            protects: 'Enforces that a column value satisfies a specific boolean condition. Custom validation logic at the database level.',
            example: `CHECK (order_amount > 0)\nCHECK (status IN ('placed','confirmed','delivered','cancelled'))`,
            when: 'Numeric bounds (amount must be positive), categorical values (status must be a known value), date logic (end_date must be after start_date), cross-column relationships.',
            what_breaks: 'Without CHECK on status: a typo in the pipeline ("deliverd" instead of "delivered") is stored silently. Reports grouping by status show an unexpected "deliverd" category with some orders that appear to be in no known status.',
          },
          {
            constraint: 'FOREIGN KEY',
            color: '#4285f4',
            protects: 'Ensures that every value in a foreign key column refers to an existing row in the referenced table. Prevents orphaned records.',
            example: `FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE RESTRICT`,
            when: 'Any column that references another table\'s primary key. Always define FK constraints between tables in an operational database (OLTP). In data warehouses, define them for documentation even if not enforced.',
            what_breaks: 'Without FK constraint: customer 4201938 is deleted. Their orders remain. Queries joining orders to customers silently drop those orders from results. Metrics show fewer orders than actually occurred.',
          },
          {
            constraint: 'PRIMARY KEY',
            color: '#facc15',
            protects: 'Combines NOT NULL and UNIQUE on the designated identifier column. Ensures every row has a unique, non-null identity.',
            example: `order_id BIGINT PRIMARY KEY`,
            when: 'Every table should have exactly one primary key. No exceptions. A table without a primary key cannot be reliably referenced from other tables or updated/deleted precisely.',
            what_breaks: 'Without PK: two rows can have the same "ID." A CDC pipeline that delivers an UPDATE for order 9284751 cannot identify which row to update — there might be two of them. Both get updated, or neither.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, overflow: 'hidden', marginBottom: 14,
          }}>
            <div style={{ height: 3, background: item.color, opacity: 0.8 }} />
            <div style={{ padding: '18px 22px' }}>
              <div style={{
                fontSize: 14, fontWeight: 800, color: item.color,
                fontFamily: 'var(--font-display)', marginBottom: 8,
              }}>{item.constraint} Constraint</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 10 }}>
                <strong style={{ color: 'var(--text)' }}>Protects against:</strong> {item.protects}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)',
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 6, padding: '6px 12px', marginBottom: 12,
                whiteSpace: 'pre',
              }}>{item.example}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: item.color,
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>When to add it</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.when}</div>
                </div>
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: '#ff4757',
                    fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>What breaks without it</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.what_breaks}</div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Callout type="warning">
          <strong>The data warehouse constraint trap:</strong> Snowflake, BigQuery,
          and Redshift define foreign key, unique, and primary key constraints in
          their DDL syntax — but do not enforce them at runtime. They are used as
          hints for the query optimiser, not as data quality enforcement. This means
          your pipeline can insert duplicate rows, orphaned foreign keys, and NULL
          primary keys into a data warehouse without any error. In a warehouse, data
          quality must be enforced by your pipeline code and dbt tests — not by the
          database.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 — Normalisation ───────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Normalisation" />
        <SectionTitle>Normalisation — Organising Data to Eliminate Redundancy</SectionTitle>

        <Para>
          Normalisation is the process of organising a database to reduce data
          redundancy and improve data integrity. It is done by decomposing tables
          into smaller, more focused tables and defining relationships between them
          with foreign keys. The goal is to store each fact in exactly one place.
        </Para>

        <Para>
          As a data engineer you need to understand normalisation because: the
          operational databases you ingest from are normalised (which is why you
          need JOINs to get complete data); your Silver layer should be normalised
          for integrity; and your Gold layer deliberately denormalises for query
          performance. Knowing when to normalise and when to denormalise is a core
          skill.
        </Para>

        <SubTitle>The normal forms — intuitive explanation</SubTitle>

        <CodeBox label="Normalisation — from a messy table to clean relational design">{`UNNORMALISED TABLE (everything in one table):
  order_id | customer_name | customer_email       | restaurant_name | items
  ─────────────────────────────────────────────────────────────────────────
  9284751  | Priya Sharma  | priya@example.com    | Punjabi Dhaba   | Butter Chicken, Naan
  9284752  | Priya Sharma  | priya@example.com    | Spice Garden    | Masala Dosa
  9284753  | Rahul Verma   | rahul@example.com    | Punjabi Dhaba   | Dal Makhani, Rice

  Problems:
  → "Priya Sharma" and "priya@example.com" stored 2 times
    If her email changes, must update 2 rows (or more if she orders again)
    If one update is missed → inconsistency
  → "Punjabi Dhaba" stored 2 times — same duplication problem
  → "items" column contains multiple values — cannot query individual items

FIRST NORMAL FORM (1NF):
  Rule: each column contains a single atomic value (no lists/arrays in a cell)
  
  Fix the "items" column by creating one row per item:
  order_id | customer_name | restaurant_name | item_name
  9284751  | Priya Sharma  | Punjabi Dhaba   | Butter Chicken
  9284751  | Priya Sharma  | Punjabi Dhaba   | Naan
  
  Better but still has customer/restaurant duplication.

SECOND NORMAL FORM (2NF):
  Rule: every non-key column must depend on the ENTIRE primary key,
        not just part of it. (Relevant for composite PKs)
  
  In our order_items table with PK (order_id, item_name):
    customer_name depends only on order_id, not on item_name
    → move customer_name to the orders table (depends on order_id only)

THIRD NORMAL FORM (3NF) — the target for OLTP:
  Rule: every non-key column must depend DIRECTLY on the primary key,
        not on another non-key column (no transitive dependencies)
  
  FULLY NORMALISED DESIGN (3NF):
  
  customers:    customer_id | name         | email
                4201938     | Priya Sharma | priya@example.com
                1092847     | Rahul Verma  | rahul@example.com

  restaurants:  restaurant_id | name
                7823           | Punjabi Dhaba
                2341           | Spice Garden

  orders:       order_id | customer_id | restaurant_id | created_at
                9284751  | 4201938     | 7823           | 2026-03-17 20:14
                9284752  | 4201938     | 2341           | 2026-03-17 21:05
                9284753  | 1092847     | 7823           | 2026-03-17 20:45

  order_items:  order_id | item_name      | quantity | unit_price
                9284751  | Butter Chicken | 1        | 320.00
                9284751  | Naan           | 2        | 30.00

  Now: Priya's email is stored exactly ONCE → update in one place
       "Punjabi Dhaba" is stored exactly ONCE → update in one place
       Each table represents one entity, each column depends on its PK`}</CodeBox>

        <SubTitle>Denormalisation — when to deliberately undo normalisation</SubTitle>

        <Para>
          Normalisation is the right design for operational databases. For analytical
          databases, it is often the wrong choice. Normalised schemas require JOINs
          to reconstruct data, and JOINs on large tables in analytical queries are
          expensive. The Gold layer in a data warehouse is deliberately denormalised —
          data is pre-joined so analysts can query with simple SELECT statements
          rather than multi-table JOINs.
        </Para>

        <CodeBox label="Denormalised Gold table — pre-joined for analytical queries">{`NORMALISED (Silver layer — correct for integrity):
  To answer "total revenue by restaurant category":
  SELECT r.category, SUM(o.order_amount)
  FROM silver.orders o
  JOIN silver.restaurants r ON o.restaurant_id = r.id
  GROUP BY r.category;
  → Requires JOIN on every query execution

DENORMALISED (Gold layer — correct for performance):
  CREATE TABLE gold.daily_order_metrics AS
  SELECT
    DATE(o.created_at)          AS order_date,
    r.name                      AS restaurant_name,
    r.category                  AS restaurant_category,
    r.city                      AS city,
    COUNT(*)                    AS order_count,
    SUM(o.order_amount)         AS total_revenue,
    AVG(o.order_amount)         AS avg_order_value
  FROM silver.orders o
  JOIN silver.restaurants r ON o.restaurant_id = r.id
  GROUP BY 1, 2, 3, 4;

  Analyst query: SELECT restaurant_category, SUM(total_revenue)
                 FROM gold.daily_order_metrics
                 WHERE order_date >= '2026-01-01'
                 GROUP BY restaurant_category;
  → No JOIN. Just reads from one pre-aggregated table. Fast.

  Trade-off: restaurant_category is now stored once per order in the
             Gold table. If you need to update the category for all
             restaurants in a city, you must rebuild the Gold table.
  
  This is correct — Gold tables are rebuilt on a schedule.
  The cost is acceptable for the analytical performance gained.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — Schema Design Patterns ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Schema Design Patterns" />
        <SectionTitle>Schema Design Patterns Every Data Engineer Must Know</SectionTitle>

        <SubTitle>The audit columns pattern — never skip these</SubTitle>

        <Para>
          Every table in every layer of your data platform should have a standard
          set of audit columns. These columns are not part of the business data —
          they are metadata about when and how each row was created or modified.
          They are what make debugging possible.
        </Para>

        <CodeBox label="Standard audit columns — add to every table">{`-- Minimum audit columns for OLTP source tables:
created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()

-- Additional audit columns for data platform tables:
ingested_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()  -- when pipeline ran
pipeline_run_id UUID         NOT NULL                -- which specific run
source_system   VARCHAR(50)  NOT NULL                -- which source this came from
record_hash     CHAR(64)     NULL                    -- SHA-256 of key fields for dedup

-- Why each one matters:
created_at:      "When did this event happen in the real world?"
updated_at:      "When was this record last modified in the source?"
ingested_at:     "When did our pipeline process this row?"
pipeline_run_id: "Which pipeline run produced this row?"
                  When a bug is found: re-run that specific run with a fix
source_system:   "Which of our 15 data sources did this come from?"
record_hash:     "Is this an exact duplicate of a row we already have?"

The difference between created_at and ingested_at:
  An order was placed at 2026-03-17 20:14:32 (created_at)
  Our pipeline processed it at 2026-03-18 02:14:47 (ingested_at)
  These are different by 6 hours — both are useful for different analysis.
  Mixing them up produces wrong time-based metrics.`}</CodeBox>

        <SubTitle>The soft delete pattern — never actually delete rows</SubTitle>

        <Para>
          In most data platforms, rows should never be physically deleted. Instead,
          add a deleted_at column and a is_deleted flag. Physical deletes break
          pipeline reruns (data that existed is gone), break historical analysis
          (the past is now different from what it was), and are impossible to reverse.
          Soft deletes preserve the history while making deleted rows queryable and
          filterable.
        </Para>

        <CodeBox label="Soft delete pattern — mark as deleted instead of removing">{`-- Add to any table where rows "go away":
is_deleted  BOOLEAN     NOT NULL DEFAULT FALSE
deleted_at  TIMESTAMPTZ NULL

-- Mark as deleted instead of DELETE:
UPDATE silver.orders
SET is_deleted = TRUE,
    deleted_at = NOW()
WHERE order_id = 9284751;

-- All queries filter to active records:
SELECT * FROM silver.orders WHERE is_deleted = FALSE;

-- Historical analysis still works:
SELECT COUNT(*) FROM silver.orders
WHERE created_at >= '2026-01-01'
  AND is_deleted = FALSE;     -- current count (excluding deleted)

SELECT COUNT(*) FROM silver.orders
WHERE created_at >= '2026-01-01';  -- all records ever created

-- Create a view that hides deleted rows:
CREATE VIEW silver.active_orders AS
SELECT * FROM silver.orders WHERE is_deleted = FALSE;

-- Analysts always query the view, never the raw table directly.`}</CodeBox>

        <SubTitle>The versioned schema pattern — for tables that change often</SubTitle>

        <Para>
          When a source system frequently changes its schema — adding columns,
          changing types, renaming fields — maintain a versioned schema approach.
          Instead of breaking your pipeline every time the source changes, store
          the schema version alongside each batch of data and handle multiple
          schema versions explicitly in your transformation code.
        </Para>

        <CodeBox label="Versioned schema tracking — surviving upstream schema changes">{`-- Landing zone table with schema version tracking:
CREATE TABLE landing.orders_raw (
    batch_id        UUID        NOT NULL,
    schema_version  VARCHAR(10) NOT NULL,  -- "v1", "v2", "v3"
    received_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    raw_payload     JSONB       NOT NULL   -- store as JSON, parse in Silver
);

-- Transformation handles each version:
-- dbt model: silver/orders.sql
SELECT
    batch_id,
    received_at,
    CASE schema_version
        WHEN 'v1' THEN (raw_payload->>'orderId')::BIGINT
        WHEN 'v2' THEN (raw_payload->>'order_id')::BIGINT  -- renamed in v2
        WHEN 'v3' THEN (raw_payload->>'order_id')::BIGINT  -- same as v2
    END AS order_id,
    
    CASE schema_version
        WHEN 'v1' THEN NULL                                -- didn't exist in v1
        WHEN 'v2' THEN (raw_payload->>'delivery_fee')::DECIMAL(6,2)
        WHEN 'v3' THEN (raw_payload->>'delivery_fee')::DECIMAL(6,2)
    END AS delivery_fee,
    ...
FROM landing.orders_raw;

Benefits:
  → New source schema version? Add a new CASE branch.
  → Old data is still processable with its original schema version.
  → Schema change history is explicit and auditable.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>Reviewing a Schema and Finding Four Silent Data Quality Risks</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Scenario — New Data Engineer · Schema Review Task
          </div>

          <Para>
            Your manager asks you to review the schema for the orders table in your
            new company's staging database and flag any data quality risks. Here is
            the schema you find:
          </Para>

          <CodeBox label="Schema to review — find the problems">{`CREATE TABLE staging.orders (
    id           INT,
    cust         VARCHAR,
    rest_id      INT,
    amount       FLOAT,
    status       VARCHAR,
    created      TIMESTAMP,
    updated      TIMESTAMP
);`}</CodeBox>

          <Para>
            <strong>Problem 1 — No primary key:</strong> The <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>id</code> column
            has no PRIMARY KEY constraint. Two rows can have the same id. Any CDC
            pipeline that receives an UPDATE for a specific order ID cannot reliably
            identify which row to update if duplicates exist. Any JOIN on this table
            produces fan-out if ids are duplicated.
          </Para>

          <Para>
            <strong>Problem 2 — FLOAT for money:</strong> <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>amount FLOAT</code> will
            silently accumulate floating point precision errors in financial calculations.
            ₹349.99 stored as FLOAT may be retrieved as 349.99000000000001.
            Aggregation of thousands of such values will produce reconciliation failures
            against the payment processor's exact totals. Must be DECIMAL(10,2).
          </Para>

          <Para>
            <strong>Problem 3 — TIMESTAMP without timezone:</strong> Both <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>created</code> and{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>updated</code> are TIMESTAMP (no timezone).
            This company serves customers across India, and the Bangalore office is in
            IST (+5:30). When a report counts "orders placed today" using{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>WHERE DATE(created) = CURRENT_DATE</code>,
            the result changes depending on whether the query runs in IST or UTC context.
            Late-night orders (10 PM–12 AM IST) appear on the wrong date in UTC analysis.
            Must be TIMESTAMPTZ.
          </Para>

          <Para>
            <strong>Problem 4 — No NOT NULL constraints:</strong> No column has
            a NOT NULL constraint. A pipeline bug that omits customer IDs will
            insert rows with NULL <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>cust</code> silently.
            Revenue calculations that JOIN to the customers table will silently
            exclude these orders (JOIN returns nothing for NULL foreign keys).
            Metrics will be understated and nobody will know why.
          </Para>

          <Para>
            <strong>Your rewritten schema:</strong>
          </Para>

          <CodeBox label="Corrected schema — every problem fixed">{`CREATE TABLE silver.orders (
    order_id        BIGINT          NOT NULL,
    customer_id     BIGINT          NOT NULL,
    restaurant_id   INTEGER         NOT NULL,
    order_amount    DECIMAL(10, 2)  NOT NULL CHECK (order_amount > 0),
    status          VARCHAR(20)     NOT NULL
                    CHECK (status IN ('placed','confirmed','preparing',
                                     'picked_up','delivered','cancelled')),
    created_at      TIMESTAMPTZ     NOT NULL,
    updated_at      TIMESTAMPTZ     NOT NULL,
    ingested_at     TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    pipeline_run_id UUID            NOT NULL,

    CONSTRAINT pk_orders            PRIMARY KEY (order_id),
    CONSTRAINT fk_orders_customer   FOREIGN KEY (customer_id)
                                    REFERENCES silver.customers(customer_id)
                                    ON DELETE RESTRICT,
    CONSTRAINT fk_orders_restaurant FOREIGN KEY (restaurant_id)
                                    REFERENCES silver.restaurants(restaurant_id)
                                    ON DELETE RESTRICT
);`}</CodeBox>

          <Para>
            Changes made: added PRIMARY KEY, changed FLOAT to DECIMAL, changed
            TIMESTAMP to TIMESTAMPTZ, added NOT NULL to all required columns, added
            CHECK constraint on status, added CHECK on order_amount, renamed columns
            to be descriptive and consistent, added audit columns. Six changes.
            Every one of them prevents a real data quality bug.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. What is referential integrity and why is it important for data pipelines?',
            a: `Referential integrity is the guarantee that every foreign key value in a child table corresponds to an existing row in the parent table. It is enforced by foreign key constraints and means that relationships between tables are always valid — an order cannot reference a customer who does not exist.

For data pipelines, referential integrity is important in two directions. First, it protects data quality in OLTP source systems: without foreign key constraints, application bugs can create orphaned records — orders with no corresponding customer, payments with no corresponding order. These orphaned records cause problems when you ingest the data because JOINs that expect every foreign key to have a match silently drop the orphaned rows from the result.

Second, it affects how you design your ingestion pipelines. When loading data into your data warehouse or data lake, you must consider load order. If you load orders before loading the referenced customers, any FK constraint on customer_id will reject the orders. The correct approach is to load parent tables before child tables — customers before orders, restaurants before order_items — and to implement retry logic for the rare cases where the ordering creates temporary gaps.

In data warehouses like Snowflake and BigQuery, FK constraints are defined but not enforced at runtime. This means orphaned records in your warehouse will not cause errors — they will silently produce wrong JOIN results. This is why dbt relationship tests are essential: they perform the referential integrity check that the warehouse engine does not.`,
          },
          {
            q: 'Q2. Why should you never use FLOAT for monetary values in a database?',
            a: `Floating point numbers (FLOAT, REAL, DOUBLE PRECISION) use binary fractions to approximate decimal values. The IEEE 754 floating point standard stores numbers as a binary mantissa and exponent — and most decimal fractions cannot be represented exactly in binary. The decimal value 0.1 is stored as an infinite repeating binary fraction, approximated to the nearest representable value.

When you store monetary amounts as FLOAT and then perform arithmetic, these small approximation errors accumulate. A single ₹349.99 stored as FLOAT might be retrieved as 349.99000000000000426... Aggregating thousands of such values produces a total that differs from the true total by fractions of rupees. This difference grows as transaction volume grows.

In regulated financial contexts — payment reconciliation, tax calculations, settlement reports — even a one-paisa discrepancy can trigger a compliance investigation. The reconciliation system compares the database total against the payment gateway's exact total, they do not match, and hours are spent investigating a problem that was caused by a type choice made on day one.

The correct type for all monetary values is DECIMAL(p, s) — also called NUMERIC — where p is the total number of digits and s is the number of digits after the decimal point. DECIMAL stores values as exact decimal numbers. 0.1 + 0.2 = exactly 0.3 in DECIMAL arithmetic. For Indian rupees, DECIMAL(12, 2) handles amounts up to ₹9,999,999,999.99. For values stored in paise (the most robust approach), use BIGINT.`,
          },
          {
            q: 'Q3. What is the difference between a primary key and a unique key?',
            a: `Both a primary key and a unique key enforce that no two rows have the same value in the constrained column or columns. They differ in three important ways.

A table can have exactly one primary key, but multiple unique keys. The primary key is the table's canonical identifier — the key used by other tables' foreign keys to reference this table. Unique keys are additional uniqueness constraints on other columns.

A primary key column cannot contain NULL values. A unique key column can contain NULL — though standard SQL allows only one NULL per unique constraint column (since NULL is not equal to NULL, two NULLs are not considered duplicates). This distinction matters: a customers table might have a unique constraint on phone number, but phone is optional (NULL allowed), whereas customer_id must always be present.

Both create an index automatically, so lookup performance is similar.

In practice, a well-designed table uses a surrogate primary key (an auto-generated BIGSERIAL or UUID) as the PK for stability and simplicity, and a unique constraint on the natural business key (email, external_id, phone) for business logic enforcement. This combination gives you both the stable, foreign-key-friendly surrogate PK and the deduplication guarantee of the natural key.`,
          },
          {
            q: 'Q4. What is normalisation and when would you deliberately denormalise in a data platform?',
            a: `Normalisation is the process of organising data into tables that each represent a single entity, with each non-key column depending directly on the primary key of its table. The goal is to store each fact in exactly one place, eliminating redundancy and the update anomalies it causes. In a normalised schema, updating a customer's name requires updating exactly one row in the customers table — not hundreds of rows wherever that customer's name was stored.

The three most commonly referenced normal forms are: 1NF (atomic values — no lists in a cell), 2NF (every column depends on the entire composite key), and 3NF (every column depends directly on the primary key, not transitively through another column). For operational databases and the Silver layer of a data platform, 3NF is the target.

I would deliberately denormalise in the Gold layer of a data warehouse or data lake. Analysts writing ad-hoc queries should not need to JOIN eight tables to answer a simple business question. Pre-joining the most commonly needed dimensions into a wide, flat table — what data modelling calls a "one big table" or a denormalised fact — makes analyst queries simpler, faster, and less error-prone.

The specific trade-offs of denormalisation are: data is duplicated (restaurant_category appears once per order in the Gold table, not once per restaurant in a dimension table), updates require rebuilding the Gold table rather than a single row update, and the table can be significantly wider. These are all acceptable trade-offs in a read-heavy analytical layer that is rebuilt on a schedule rather than updated row-by-row.`,
          },
          {
            q: 'Q5. You inherit a table with no constraints — no primary key, no NOT NULL, no foreign keys. What are the three most important things you would add first and why?',
            a: `If I inherited a table with no constraints, I would add them in this priority order based on the severity of the data quality problems each one prevents.

First, a primary key. Without a primary key, there is no reliable way to identify a specific row, UPDATE operations can affect the wrong rows if duplicates exist, JOINs from other tables produce fan-out if the same ID appears multiple times, and CDC updates have no row to target. Adding a primary key first ensures row identity. If an auto-increment ID already exists but is not declared as PK, declare it: ALTER TABLE orders ADD PRIMARY KEY (order_id). If duplicates already exist, they must be resolved before the constraint can be added.

Second, NOT NULL on all columns that should never be empty. These are the foreign key columns (customer_id, restaurant_id) and the core business fields (order_amount, created_at). NULL values in foreign key columns cause JOINs to silently drop rows. NULL values in amount cause SUM to return wrong totals. NULL values in timestamps make time-based analysis unreliable. The impact of missing NOT NULL constraints is usually not visible until metrics are questioned, making it particularly dangerous.

Third, DECIMAL type correction if financial amounts are stored as FLOAT. The float-to-decimal migration is the most technically complex of the three changes — it requires: adding a new DECIMAL column, backfilling with ROUND(old_float_column::DECIMAL, 2), swapping the columns, and dropping the old float column. Doing this before large amounts of float data accumulates is far easier than after. A table with 10 million rows of FLOAT monetary data that has been used in financial reports is very difficult to migrate cleanly.`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
              {item.a}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `ERROR: insert or update on table "orders" violates foreign key constraint "fk_orders_customer" — Key (customer_id)=(4201938) is not present in table "customers"`,
            cause: 'The pipeline is loading orders before loading the customers they reference, or a customer record was deleted before its associated orders were handled. The foreign key constraint is doing exactly what it is designed to do — preventing orphaned records from entering the database.',
            fix: 'Ensure load order in the pipeline: customers must be fully loaded before orders. Add this as an explicit dependency in your Airflow DAG or dbt model dependency graph. If the customer genuinely no longer exists (GDPR deletion), handle the order before deleting the customer: either anonymise (set customer_id to a special "deleted customer" placeholder) or archive the order record. Never set ON DELETE CASCADE on financial data — it will silently delete records you did not intend to lose.',
          },
          {
            error: `psycopg2.errors.UniqueViolation: duplicate key value violates unique constraint "pk_orders" — Key (order_id)=(9284751) already exists`,
            cause: 'The pipeline is attempting to INSERT a record that already exists in the table. This happens when a pipeline is rerun after a partial failure — some records were already inserted in the first run, and the rerun tries to insert them again.',
            fix: 'Make the pipeline idempotent using upsert (INSERT ... ON CONFLICT DO UPDATE) instead of plain INSERT: INSERT INTO silver.orders (order_id, ...) VALUES (...) ON CONFLICT (order_id) DO UPDATE SET updated_at = EXCLUDED.updated_at, status = EXCLUDED.status. This safely updates existing records instead of failing. Alternatively use INSERT ... ON CONFLICT DO NOTHING to skip duplicates without updating. The choice depends on whether you want the latest version or the first version to win.',
          },
          {
            error: `DataError: numeric field overflow — A field with precision 10, scale 2 must round to an absolute value less than 10^8`,
            cause: 'A value being inserted into a DECIMAL(10,2) column exceeds the column\'s defined range. DECIMAL(10,2) stores up to 99,999,999.99 — any value with more than 8 digits before the decimal point causes this error. This typically happens when a large order amount or a currency conversion produces a value outside the expected range.',
            fix: 'Increase the precision: ALTER TABLE orders ALTER COLUMN order_amount TYPE DECIMAL(14,2). DECIMAL(14,2) allows up to 999,999,999,999.99. Review whether the original precision was set too conservatively for the actual data range. Before the migration, check the maximum value in the existing data: SELECT MAX(order_amount) FROM orders. Set the new precision to at least 2× the maximum observed value to accommodate future growth.',
          },
          {
            error: `Unexpected NULL values in order_amount — SUM(order_amount) returns less revenue than expected, COUNT(*) vs COUNT(order_amount) differ`,
            cause: 'The order_amount column does not have a NOT NULL constraint, and a pipeline bug has inserted rows with NULL in order_amount. SUM() and AVG() ignore NULL values — so aggregations produce lower results than the true total. COUNT(*) counts all rows including those with NULL amounts; COUNT(order_amount) counts only rows with non-NULL amounts. The discrepancy between the two reveals the extent of the NULL contamination.',
            fix: 'Immediate: quantify the damage: SELECT COUNT(*) - COUNT(order_amount) AS null_count FROM orders. Investigate which pipeline run introduced the NULLs using ingested_at and pipeline_run_id. Correct the NULL rows if the original amount can be recovered from the source system, or mark them as invalid records. Long-term: add NOT NULL to the column: ALTER TABLE orders ALTER COLUMN order_amount SET NOT NULL. This prevents future NULLs but will fail if NULL rows already exist — fix the existing NULLs first.',
          },
          {
            error: `Wrong date grouping — "orders placed today" report shows different totals depending on which analyst runs it`,
            cause: 'The created_at column is TIMESTAMP (without timezone), and different analysts\' SQL clients or BI tools are configured with different timezone settings. A query like WHERE DATE(created_at) = CURRENT_DATE evaluates CURRENT_DATE in the session\'s local timezone. An analyst in IST sees different results from one in UTC because midnight IST is 18:30 UTC the previous day — orders placed between 18:30 and 23:59 UTC appear on different dates depending on the timezone context.',
            fix: 'Migrate the column to TIMESTAMPTZ: ALTER TABLE orders ALTER COLUMN created_at TYPE TIMESTAMPTZ USING created_at AT TIME ZONE \'Asia/Kolkata\'. This stores all timestamps as UTC internally and converts to local time at query time based on the session timezone. Set a standard session timezone for all BI tool connections. For all new tables, always define event timestamps as TIMESTAMPTZ from the start — retrofitting timezone information into an existing TIMESTAMP column is possible but requires knowing the original timezone of each record.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)',
              marginBottom: 12, background: 'rgba(255,71,87,0.08)',
              border: '1px solid rgba(255,71,87,0.2)',
              borderRadius: 6, padding: '8px 12px', lineHeight: 1.5,
            }}>{item.error}</div>
            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'A schema at the database level is a namespace that groups related tables. Data platforms use schemas to organise layers: landing, bronze, silver, gold. Schema-level access control (GRANT ON SCHEMA) is how you control who can access each layer.',
        'Every column\'s data type is a real decision. BIGINT for all IDs (INTEGER overflows at 2.1 billion). DECIMAL(10,2) for all money (FLOAT accumulates precision errors in financial calculations). TIMESTAMPTZ for all event timestamps (TIMESTAMP without timezone produces wrong results across timezones). VARCHAR(n) with a limit for bounded text.',
        'NEVER use FLOAT for monetary values. Floating point arithmetic cannot represent most decimal fractions exactly. 0.1 + 0.2 = 0.30000000000000004 in IEEE 754. Use DECIMAL(p,s) — it performs exact decimal arithmetic. This is not a style preference, it is a correctness requirement for financial data.',
        'ALWAYS use TIMESTAMPTZ (TIMESTAMP WITH TIME ZONE) for event timestamps. TIMESTAMP without timezone is ambiguous — "20:14:32" means different things in IST and UTC. TIMESTAMPTZ stores as UTC internally and converts to local time at query time, producing correct results regardless of session timezone.',
        'Every table must have a primary key. No exceptions. Without a primary key, rows cannot be uniquely identified, updates may affect the wrong rows, JOINs produce fan-out on duplicates, and CDC updates have no reliable target.',
        'Foreign key constraints enforce referential integrity — preventing orphaned records. In OLTP databases they are enforced at runtime. In data warehouses (Snowflake, BigQuery) they are defined but NOT enforced — use dbt relationship tests instead.',
        'The five constraint types and what each protects: NOT NULL (prevents missing required values), UNIQUE (prevents duplicates), CHECK (enforces valid values and ranges), FOREIGN KEY (prevents orphaned references), PRIMARY KEY (combines NOT NULL and UNIQUE for the row identifier).',
        'Every production table should have audit columns: created_at, updated_at, ingested_at, and pipeline_run_id. These columns answer the two questions you will ask in every debugging session: "when did this happen?" and "which pipeline run produced this data?"',
        'Normalisation (3NF) is correct for OLTP source tables and the Silver layer — each fact stored once, relationships via foreign keys. Denormalisation is correct for the Gold layer — pre-joined, wide, flat tables that analysts can query without complex JOINs.',
        'Data warehouses define constraints as documentation but do not enforce them. Your pipeline code and dbt tests are the enforcement layer in a warehouse. Always add at minimum: unique tests on primary key columns, not-null tests on required columns, and relationship tests on foreign key columns.',
      ]} />

    </LearnLayout>
  )
}