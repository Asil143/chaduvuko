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

export default function LikeWildcards() {
  return (
    <LearnLayout
      title="Pattern Matching — LIKE & Wildcards"
      description="Find rows that match a pattern rather than an exact value — the % and _ wildcards, ILIKE, SIMILAR TO, performance implications, and every real-world use case"
      section="SQL — Module 14"
      readTime="30 min"
      updatedAt="April 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="When Exact Match Is Not Enough" />

      <P>The WHERE clause with = finds rows that match an exact value. Perfect when you know exactly what you are looking for — a specific customer_id, a specific order_status, a specific city name. But real business questions are often fuzzier:</P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', margin: '20px 0 28px' }}>
        {[
          'Find all customers whose email ends in @gmail.com',
          'Find all products whose name starts with "Amul"',
          'Find all stores whose name contains "Koramangala"',
          'Find all brands that are exactly 4 characters long',
          'Find all orders where the payment_method contains "Net"',
        ].map((q, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < 4 ? 10 : 0 }}>
            <span style={{ color: C, fontFamily: 'var(--font-mono)', fontSize: 13, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, fontStyle: 'italic' }}>{q}</span>
          </div>
        ))}
      </div>

      <P>None of these can be answered with <Hl>=</Hl>. You do not know the full exact value — you only know a <Hl>pattern</Hl>. SQL's answer to this is the <Hl>LIKE</Hl> operator, combined with two wildcard characters that stand in for unknown parts of a string.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="The Two Wildcards — % and _" />

      <P>LIKE uses two special characters called wildcards. Every other character in the pattern is matched literally — only these two have special meaning.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, margin: '20px 0 32px' }}>
        <div style={{ background: 'var(--surface)', border: `2px solid ${C}40`, borderRadius: 12, padding: '20px' }}>
          <div style={{ fontSize: 36, fontWeight: 900, color: C, fontFamily: 'var(--font-mono)', marginBottom: 10 }}>%</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Percent — matches any sequence</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 12 }}>Matches zero, one, or any number of characters. The most common wildcard. Stands in for "anything could be here."</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2 }}>
            <div style={{ color: C }}>'Amul%'</div>
            <div style={{ color: 'var(--muted)', marginLeft: 8 }}>→ starts with Amul</div>
            <div style={{ color: C }}>'%gmail.com'</div>
            <div style={{ color: 'var(--muted)', marginLeft: 8 }}>→ ends with gmail.com</div>
            <div style={{ color: C }}>'%Nagar%'</div>
            <div style={{ color: 'var(--muted)', marginLeft: 8 }}>→ contains Nagar anywhere</div>
            <div style={{ color: C }}>'%'</div>
            <div style={{ color: 'var(--muted)', marginLeft: 8 }}>→ matches everything</div>
          </div>
        </div>
        <div style={{ background: 'var(--surface)', border: `2px solid #f97316`, borderRadius: 12, padding: '20px' }}>
          <div style={{ fontSize: 36, fontWeight: 900, color: '#f97316', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>_</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Underscore — matches exactly one character</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 12 }}>Matches exactly one character — any character. Used when you know the length but not the specific character(s).</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2 }}>
            <div style={{ color: '#f97316' }}>'ST00_'</div>
            <div style={{ color: 'var(--muted)', marginLeft: 8 }}>→ ST001, ST002 … ST009</div>
            <div style={{ color: '#f97316' }}>'___'</div>
            <div style={{ color: 'var(--muted)', marginLeft: 8 }}>→ exactly 3 characters</div>
            <div style={{ color: '#f97316' }}>'_ata'</div>
            <div style={{ color: 'var(--muted)', marginLeft: 8 }}>→ Tata, Data, Bata</div>
            <div style={{ color: '#f97316' }}>'T_t_'</div>
            <div style={{ color: 'var(--muted)', marginLeft: 8 }}>→ Tata, Toto, Titi</div>
          </div>
        </div>
      </div>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="The % Wildcard — Matching Any Sequence" />

      <P>The percent sign % is by far the most-used wildcard. It matches any sequence of zero or more characters. Its position in the pattern controls what it matches.</P>

      <H>Starts with — pattern%</H>

      <SQLPlayground
        initialQuery={`-- Products whose name starts with 'Amul'
-- % matches anything after 'Amul'
SELECT product_name, brand, unit_price
FROM products
WHERE product_name LIKE 'Amul%';`}
        height={120}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Products starting with 'Tata'
SELECT product_name, brand, category, unit_price
FROM products
WHERE product_name LIKE 'Tata%';`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Stores whose name starts with 'FreshMart Koram'
SELECT store_id, store_name, city, manager_name
FROM stores
WHERE store_name LIKE 'FreshMart Koram%';`}
        height={110}
        showSchema={false}
      />

      <H>Ends with — %pattern</H>

      <SQLPlayground
        initialQuery={`-- Customers whose email ends with @gmail.com
SELECT first_name, last_name, email, city
FROM customers
WHERE email LIKE '%@gmail.com'
ORDER BY last_name;`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Products sold by the kilogram (unit ends with 'kg')
SELECT product_name, brand, unit_price, unit
FROM products
WHERE unit LIKE '%kg';`}
        height={110}
        showSchema={false}
      />

      <H>Contains — %pattern%</H>

      <SQLPlayground
        initialQuery={`-- Stores in cities containing 'bad' (Ahmedabad, Hyderabad)
SELECT store_id, store_name, city
FROM stores
WHERE city LIKE '%bad';`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Products whose name contains 'Noodles'
SELECT product_name, brand, unit_price, category
FROM products
WHERE product_name LIKE '%Noodles%';`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Employees whose role contains 'Manager'
SELECT first_name, last_name, role, salary
FROM employees
WHERE role LIKE '%Manager%'
ORDER BY salary DESC;`}
        height={120}
        showSchema={false}
      />

      <H>% at both ends — anywhere in the string</H>

      <SQLPlayground
        initialQuery={`-- Stores whose name contains 'Powai' anywhere
SELECT store_id, store_name, city
FROM stores
WHERE store_name LIKE '%Powai%';`}
        height={100}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Orders paid through any method containing 'Ban' (NetBanking)
SELECT order_id, payment_method, total_amount, order_status
FROM orders
WHERE payment_method LIKE '%Ban%'
ORDER BY total_amount DESC;`}
        height={120}
        showSchema={false}
      />

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="The _ Wildcard — Matching Exactly One Character" />

      <P>The underscore _ matches exactly one character — any character. Use it when you know the length of a field or when you need to match a specific position while allowing variation at another.</P>

      <H>Store ID pattern — fixed prefix, variable digit</H>

      <SQLPlayground
        initialQuery={`-- Store IDs matching ST001 through ST009 (single digit stores)
-- ST00_ matches ST001, ST002 ... ST009 but NOT ST010
SELECT store_id, store_name, city
FROM stores
WHERE store_id LIKE 'ST00_'
ORDER BY store_id;`}
        height={120}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Two-digit store IDs: ST010 through ST099
-- ST0__ means ST0 followed by exactly two more characters
SELECT store_id, store_name, city
FROM stores
WHERE store_id LIKE 'ST0__'
ORDER BY store_id;`}
        height={110}
        showSchema={false}
      />

      <H>Fixed-length string matching</H>

      <SQLPlayground
        initialQuery={`-- Brands that are exactly 4 characters long
-- Four underscores = exactly 4 characters, any characters
SELECT DISTINCT brand
FROM products
WHERE brand LIKE '____'
ORDER BY brand;`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Units that are exactly 2 characters (kg, ml, oz...)
SELECT DISTINCT unit
FROM products
WHERE unit LIKE '__'
ORDER BY unit;`}
        height={100}
        showSchema={false}
      />

      <H>Combining % and _ in the same pattern</H>

      <SQLPlayground
        initialQuery={`-- Products where the second character of the name is 'a'
-- _ matches exactly the first character, 'a' is literal, % matches rest
SELECT product_name, brand
FROM products
WHERE product_name LIKE '_a%'
ORDER BY product_name;`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Email addresses with exactly one character before the @
-- _@% : one char, then @, then anything
SELECT first_name, last_name, email
FROM customers
WHERE email LIKE '_@%';`}
        height={110}
        showSchema={false}
      />

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="NOT LIKE — Excluding Pattern Matches" />

      <P>Just as <Hl>NOT IN</Hl> excludes a list of values, <Hl>NOT LIKE</Hl> excludes rows matching a pattern. All rows where the pattern does not match are returned.</P>

      <SQLPlayground
        initialQuery={`-- Customers who do NOT have a Gmail address
SELECT first_name, last_name, email, city
FROM customers
WHERE email NOT LIKE '%@gmail.com'
ORDER BY last_name;`}
        height={120}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Products that are NOT from Amul or Tata
-- Two NOT LIKE conditions combined with AND
SELECT product_name, brand, unit_price
FROM products
WHERE product_name NOT LIKE 'Amul%'
  AND product_name NOT LIKE 'Tata%'
ORDER BY product_name;`}
        height={130}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Stores that are NOT in Bangalore (city doesn't contain 'alore')
SELECT store_id, store_name, city
FROM stores
WHERE city NOT LIKE '%alore'
ORDER BY city;`}
        height={110}
        showSchema={false}
      />

      <Callout type="warning">
        NOT LIKE has the same NULL behaviour as NOT IN — if the column being compared is NULL, NOT LIKE returns NULL (not TRUE), so NULL rows are silently excluded from results. If you need to include rows where the column IS NULL alongside the NOT LIKE matches, add: OR column IS NULL.
      </Callout>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="Case Sensitivity — LIKE vs ILIKE" />

      <P>Case sensitivity in LIKE varies by database — this is one of the most common portability issues when switching between MySQL and PostgreSQL.</P>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Database', 'LIKE behaviour', 'Case-insensitive option'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['MySQL', 'Case-insensitive by default (uses collation)', "LIKE works — 'amul%' matches 'Amul Butter'"],
              ['PostgreSQL', "Case-sensitive - 'amul%' does NOT match 'Amul Butter'", "Use ILIKE for case-insensitive: WHERE name ILIKE 'amul%'"],
              ['DuckDB (playground)', 'Case-sensitive like PostgreSQL', "Use ILIKE or LOWER(): WHERE LOWER(name) LIKE 'amul%'"],
              ['SQLite', 'Case-insensitive for ASCII characters only', "Works for a-z/A-Z but not for non-ASCII (ñ, é, etc.)"],
              ['SQL Server', 'Depends on collation (usually case-insensitive)', "Use COLLATE for explicit control"],
            ].map(([db, behaviour, option], i) => (
              <tr key={db} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{db}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--muted)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{behaviour}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{option}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H>ILIKE — case-insensitive LIKE in PostgreSQL</H>

      <SQLPlayground
        initialQuery={`-- ILIKE: case-insensitive pattern match (PostgreSQL and DuckDB)
-- 'amul%' matches 'Amul Butter', 'AMUL MILK', 'amul taaza' etc.
SELECT product_name, brand
FROM products
WHERE product_name ILIKE 'amul%';`}
        height={110}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- LIKE (case-sensitive) vs ILIKE (case-insensitive)
-- LIKE: 'amul%' finds nothing because stored as 'Amul'
-- ILIKE: 'amul%' finds Amul products correctly
SELECT product_name, brand,
  CASE WHEN product_name LIKE  'amul%' THEN 'LIKE matched'  ELSE 'LIKE missed'  END AS like_result,
  CASE WHEN product_name ILIKE 'amul%' THEN 'ILIKE matched' ELSE 'ILIKE missed' END AS ilike_result
FROM products
WHERE product_name ILIKE 'amul%';`}
        height={150}
        showSchema={false}
      />

      <H>Cross-database case-insensitive pattern — LOWER()</H>
      <P>For code that must run on both MySQL and PostgreSQL, wrap the column in LOWER() and use a lowercase pattern. This works everywhere but prevents index usage on the column (same trade-off as all function-on-column conditions).</P>

      <SQLPlayground
        initialQuery={`-- Cross-database case-insensitive LIKE using LOWER()
-- Works on PostgreSQL, MySQL, SQLite, DuckDB
SELECT product_name, brand
FROM products
WHERE LOWER(product_name) LIKE 'amul%';`}
        height={110}
        showSchema={false}
      />

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="Escaping Wildcards — When % and _ Are Literal" />

      <P>Sometimes you genuinely want to search for a percent sign or an underscore as a literal character — not as a wildcard. For example, finding products with "100%" in their name, or store codes that contain an underscore. You need to <Hl>escape</Hl> the wildcard to tell the database to treat it as a literal character.</P>

      <H>The ESCAPE clause</H>

      <CodeBlock
        label="Escaping wildcards with ESCAPE"
        code={`-- Standard SQL: use ESCAPE to define an escape character
-- Then prefix % or _ with the escape character to make them literal

-- Find products containing literal '%'
WHERE product_name LIKE '%100\%%' ESCAPE '\'
-- The \% means "literal percent", the first % is still a wildcard

-- Find store codes containing literal '_'
WHERE store_code LIKE 'ST\_%' ESCAPE '\'
-- The \_ means "literal underscore"

-- In PostgreSQL you can also use ESCAPE '!'
WHERE product_name LIKE '%100!%' ESCAPE '!'`}
      />

      <SQLPlayground
        initialQuery={`-- Searching for a literal percent sign in product descriptions
-- Using ESCAPE to treat % as a literal character
-- (FreshMart products don't have % in names, but the syntax is correct)
SELECT product_name
FROM products
WHERE product_name LIKE '%Noodles%'
-- Real escape example if data had "100% Organic":
-- WHERE description LIKE '%100\%%' ESCAPE '\'`}
        height={120}
        showSchema={false}
      />

      <Callout type="info">
        In practice, literal percent signs and underscores in searchable fields are rare in well-designed databases. If you frequently need to search for them, it is often a sign that the data should be normalised differently. The ESCAPE clause exists for when you cannot control the source data format.
      </Callout>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="LIKE Performance — The Leading Wildcard Problem" />

      <P>LIKE performance depends heavily on where the wildcard appears in the pattern. This is one of the most important performance considerations in SQL — and one of the most frequently ignored.</P>

      <H>The three performance cases</H>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '20px 0 28px' }}>
        {[
          {
            pattern: "LIKE 'Amul%'",
            label: 'Starts-with — FAST with an index',
            color: '#00e676',
            desc: 'The database knows the prefix and can use a B-tree index to jump directly to all entries starting with "Amul". Performance is O(log n) — like a dictionary lookup. This is the best case.',
          },
          {
            pattern: "LIKE '%gmail.com'",
            label: 'Ends-with — SLOW, full scan required',
            color: '#f59e0b',
            desc: 'The leading % means the database has no idea where to start. It must scan every row, read the full value, and check whether it ends with "gmail.com". No index helps. On millions of rows, this is slow.',
          },
          {
            pattern: "LIKE '%Nagar%'",
            label: 'Contains — SLOW, full scan required',
            color: '#ff4757',
            desc: 'Same as ends-with — the leading % prevents any index usage. Every single row must be read. This is the worst case for LIKE performance on large tables.',
          },
        ].map(item => (
          <div key={item.pattern} style={{ display: 'flex', gap: 16, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px' }}>
            <div style={{ flexShrink: 0, width: 8, borderRadius: 4, background: item.color, alignSelf: 'stretch', minHeight: 60 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: item.color, marginBottom: 4 }}>{item.pattern}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <H>Solutions for contains and ends-with searches at scale</H>
      <P>If your application frequently searches for text that appears anywhere in a string — product search, customer name search, address search — LIKE '%pattern%' on a large table will not scale. Three production alternatives:</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12, margin: '16px 0 28px' }}>
        {[
          {
            title: 'Full-Text Search',
            color: C,
            desc: 'PostgreSQL has built-in full-text search (tsvector/tsquery). MySQL has FULLTEXT indexes. Dramatically faster than LIKE for large text fields. Used by Swiggy for restaurant name search.',
            when: 'Large text fields — product descriptions, addresses, review text',
          },
          {
            title: 'Reverse Index',
            color: '#10b981',
            desc: 'Store a reversed copy of the column and use LIKE "pattern%" on the reversed value for ends-with searches. Hacky but works when full-text search is not available.',
            when: 'Ends-with searches on large tables — email domain, phone suffix',
          },
          {
            title: 'Elasticsearch / Typesense',
            color: '#f97316',
            desc: 'Dedicated search engines built specifically for full-text and fuzzy matching. Used by Flipkart, Amazon India, and Nykaa for product search. Not SQL but far superior for search workloads.',
            when: 'Any production search feature with millions of items',
          },
        ].map(item => (
          <div key={item.title} style={{ background: 'var(--surface)', border: `1px solid ${item.color}25`, borderRadius: 10, padding: '16px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 8 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 8 }}>{item.desc}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>{item.when}</div>
          </div>
        ))}
      </div>

      <ProTip>
        In job interviews and system design discussions, always mention the leading wildcard problem when discussing LIKE-based search. Saying "LIKE '%term%' does not use an index and will be slow at scale — for a production search feature we would use PostgreSQL full-text search or Elasticsearch" signals senior-level thinking. Most candidates do not know this distinction.
      </ProTip>

      <HR />

      {/* ── PART 09 ── */}
      <Part n="09" title="Multiple LIKE Conditions — Patterns in Combination" />

      <P>LIKE conditions combine with AND, OR, and NOT exactly like any other WHERE condition. This lets you build complex pattern-based filters.</P>

      <SQLPlayground
        initialQuery={`-- Customers with Gmail OR Outlook email addresses
SELECT first_name, last_name, email, city
FROM customers
WHERE email LIKE '%@gmail.com'
   OR email LIKE '%@outlook.com'
ORDER BY last_name;`}
        height={130}
        showSchema={true}
      />

      <SQLPlayground
        initialQuery={`-- Amul dairy products only
-- Starts with 'Amul' AND is in the Dairy category
SELECT product_name, brand, unit_price, unit
FROM products
WHERE product_name LIKE 'Amul%'
  AND category = 'Dairy'
ORDER BY unit_price;`}
        height={120}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Products from major Indian brands
-- Using OR to match multiple brand prefixes
SELECT product_name, brand, category, unit_price
FROM products
WHERE brand LIKE 'Amul%'
   OR brand LIKE 'Tata%'
   OR brand LIKE 'Nestle%'
   OR brand LIKE 'Britannia%'
ORDER BY brand, unit_price;`}
        height={150}
        showSchema={false}
      />

      <SQLPlayground
        initialQuery={`-- Managers in Bangalore stores
-- Role contains 'Manager' AND store is in Bangalore
SELECT
  e.first_name || ' ' || e.last_name  AS employee,
  e.role,
  e.salary,
  s.city
FROM employees AS e
JOIN stores AS s ON e.store_id = s.store_id
WHERE e.role LIKE '%Manager%'
  AND s.city = 'Bangalore'
ORDER BY e.salary DESC;`}
        height={180}
        showSchema={false}
      />

      <HR />

      {/* ── PART 10 ── */}
      <Part n="10" title="SIMILAR TO — Advanced Pattern Matching" />

      <P>PostgreSQL also supports <Hl>SIMILAR TO</Hl>, which is a hybrid between LIKE and regular expressions. It uses a limited regex-like syntax — more powerful than LIKE but less powerful than full regular expressions. It is less commonly used in practice but useful to know.</P>

      <CodeBlock
        label="SIMILAR TO — regex-lite pattern matching (PostgreSQL)"
        code={`-- SIMILAR TO uses | for OR, [] for character classes, ? + * for repetition
-- It is anchored — the pattern must match the ENTIRE string

-- Match Gmail or Outlook emails
WHERE email SIMILAR TO '%@(gmail|outlook)\.com'

-- Match store IDs ST001 through ST005
WHERE store_id SIMILAR TO 'ST00[1-5]'

-- Match strings that are 4-6 characters long
WHERE brand SIMILAR TO '.{4,6}'

-- SIMILAR TO vs LIKE:
-- LIKE: simple wildcards, most databases, fast with leading literal
-- SIMILAR TO: regex-like, PostgreSQL only, slower
-- REGEXP: full regular expressions, MySQL, most powerful but slowest`}
      />

      <H>Regular expressions — when you need real power</H>
      <P>For full regular expression matching, MySQL uses <Hl>REGEXP</Hl> (or RLIKE), and PostgreSQL uses the <Hl>~</Hl> operator. These are the most powerful text matching tools in SQL but also the slowest — they always require full table scans.</P>

      <CodeBlock
        label="Regular expressions in SQL"
        code={`-- MySQL: REGEXP operator
WHERE email REGEXP '^[a-z][a-z0-9.]+@(gmail|yahoo|outlook)\\.com$'

-- PostgreSQL: ~ operator (case-sensitive), ~* (case-insensitive)
WHERE email ~ '^[a-z][a-z0-9.]+@(gmail|yahoo|outlook)\.com$'
WHERE email ~* 'amul'   -- case-insensitive contains

-- NOT REGEXP / !~
WHERE product_name !~ '^[0-9]'  -- does not start with a digit

-- Use cases for regex in SQL:
-- Validating formats (phone numbers, PAN, Aadhaar patterns)
-- Complex multi-pattern matching that LIKE cannot express
-- Data quality audits on legacy data with inconsistent formatting`}
      />

      <HR />

      {/* ── PART 11 ── */}
      <Part n="11" title="What This Looks Like at Work" />

      <P>You are a data analyst at Nykaa. The customer service team receives a complaint from a customer who cannot remember their account email but knows it starts with their name "meera" and ends with either @gmail.com or @yahoo.com. The compliance team also needs to audit all product names that do not follow the naming convention — they should start with the brand name.</P>

      <TimeBlock time="10:00 AM" label="Customer lookup by partial email">
        The support agent gives you what the customer remembers. You write a pattern query to find the account.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Find customer by partial email memory
-- They remember it starts with 'meera' and is a gmail or yahoo account
SELECT customer_id, first_name, last_name, email, city, joined_date
FROM customers
WHERE email LIKE 'meera%'
  AND (email LIKE '%@gmail.com' OR email LIKE '%@yahoo.com');`}
        height={130}
        showSchema={true}
      />

      <TimeBlock time="10:15 AM" label="Product naming convention audit">
        The compliance team wants all products where the product_name does NOT start with the brand name — these are naming convention violations.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Products where product_name doesn't start with the brand name
-- Brand = 'Amul' → product_name should start with 'Amul'
-- If it doesn't: naming convention violation
SELECT
  product_name,
  brand,
  category,
  CASE
    WHEN product_name LIKE brand || '%' THEN 'Compliant'
    ELSE 'VIOLATION'
  END  AS naming_status
FROM products
WHERE product_name NOT LIKE brand || '%'
ORDER BY brand;`}
        height={180}
        showSchema={false}
      />

      <TimeBlock time="10:35 AM" label="Store search for a delivery partner">
        A delivery partner application is looking for FreshMart stores in cities ending with "bad" — Hyderabad and Ahmedabad specifically.
      </TimeBlock>

      <SQLPlayground
        initialQuery={`-- Stores in cities ending with 'bad'
-- Hyderabad and Ahmedabad both match
SELECT store_id, store_name, city, manager_name
FROM stores
WHERE city LIKE '%bad'
ORDER BY city;`}
        height={120}
        showSchema={false}
      />

      <ProTip>
        LIKE with a dynamic pattern built from another column value — WHERE product_name LIKE brand || '%' — is a powerful technique for data quality audits. The || concatenates the brand value with % to create a starts-with pattern for each row. This works because LIKE evaluates the pattern per row, not once for the whole query. Use this for format validation, naming convention checks, and cross-column consistency audits.
      </ProTip>

      <HR />

      {/* ── PART 12 — Interview Prep ── */}
      <Part n="12" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="What does the LIKE operator do and what are its two wildcards?">
        <p style={{ margin: '0 0 14px' }}>LIKE is a SQL comparison operator used in WHERE clauses to match string values against a pattern rather than an exact value. Instead of finding rows where a column equals a specific string, LIKE finds rows where the column matches a pattern that can include wildcard characters standing in for unknown characters.</p>
        <p style={{ margin: '0 0 14px' }}>LIKE has two wildcard characters. The percent sign % matches any sequence of zero or more characters — it is the most common wildcard and stands in for "anything could be here." LIKE 'Amul%' matches 'Amul Butter', 'Amul Milk', 'Amul Fresh Paneer', and any string starting with 'Amul'. LIKE '%gmail.com' matches any string ending with 'gmail.com'. LIKE '%Fresh%' matches any string containing 'Fresh' anywhere.</p>
        <p style={{ margin: 0 }}>The underscore _ matches exactly one character — any character. LIKE 'ST00_' matches 'ST001' through 'ST009' but not 'ST010' (which has two digits after 'ST00'). LIKE '____' matches any string of exactly four characters. LIKE '_ata' matches 'Tata', 'Data', 'Bata' — any four-character string ending in 'ata'. The two wildcards can be combined: LIKE '_a%' matches any string where the second character is 'a', regardless of what comes before or after.</p>
      </IQ>

      <IQ q="What is the difference between LIKE and ILIKE?">
        <p style={{ margin: '0 0 14px' }}>LIKE performs case-sensitive pattern matching in PostgreSQL, DuckDB, and SQLite — the pattern must match the case of the stored value exactly. LIKE 'amul%' does not match 'Amul Butter' in PostgreSQL because 'a' does not equal 'A'. LIKE 'Amul%' matches 'Amul Butter' correctly.</p>
        <p style={{ margin: '0 0 14px' }}>ILIKE is a PostgreSQL-specific operator that performs case-insensitive pattern matching. ILIKE 'amul%' matches 'Amul Butter', 'AMUL MILK', 'amul ghee', and any other variation of case. ILIKE 'AMUL%' also matches all the same values — the pattern and the data are both treated as if they were lowercase before comparison.</p>
        <p style={{ margin: 0 }}>MySQL's LIKE is case-insensitive by default (controlled by the collation), so MySQL LIKE behaves like PostgreSQL ILIKE for standard ASCII characters. SQL Server's case sensitivity also depends on the database collation. For cross-database compatible case-insensitive pattern matching, use LOWER() on both the column and pattern: WHERE LOWER(column) LIKE LOWER('pattern%'). This works identically on all databases but prevents index usage on the column. The recommendation: use ILIKE in PostgreSQL for case-insensitive searches, and use LOWER() only when writing SQL that must run on multiple database systems.</p>
      </IQ>

      <IQ q="Why is LIKE '%pattern%' slow and what are the alternatives?">
        <p style={{ margin: '0 0 14px' }}>LIKE '%pattern%' (with a leading %) is slow because the leading percent wildcard prevents the database from using a B-tree index on the column. A B-tree index organises values in sorted order by their prefix — it can efficiently find all values starting with 'Amul' because those values are contiguous in the index. But for '%Fresh%', the database does not know where in the sorted index the matching values are — they could be anywhere. The database must read every row, retrieve the full value, and check whether it contains 'Fresh'. This is a full table scan: O(n) where n is the number of rows. On a table with 10 million products, this takes seconds.</p>
        <p style={{ margin: '0 0 14px' }}>The production alternatives depend on the scale and the database. For moderate scale (up to a few million rows), PostgreSQL's built-in full-text search using tsvector columns and GIN indexes can make contains-searches fast by pre-computing searchable tokens from text columns. A GIN index on tsvector supports fast text search without reading every row. MySQL supports FULLTEXT indexes with similar capabilities.</p>
        <p style={{ margin: 0 }}>For large scale — millions of products, user-facing search with sub-100ms latency requirements — dedicated search engines like Elasticsearch, OpenSearch, or Typesense are the production standard. These systems are built specifically for full-text and fuzzy matching and are used by Flipkart, Nykaa, Amazon India, and every major e-commerce platform for their product search. They run alongside the SQL database: SQL handles transactions and structured queries, the search engine handles text search. LIKE '%pattern%' is acceptable for small tables and ad-hoc queries, but should never be the foundation of a production search feature on large datasets.</p>
      </IQ>

      <IQ q="How do you search for a literal percent sign or underscore using LIKE?">
        <p style={{ margin: '0 0 14px' }}>Since % and _ are wildcard characters with special meaning in LIKE patterns, you must escape them when you want to match them as literal characters. SQL provides the ESCAPE clause for this purpose: LIKE 'pattern' ESCAPE 'escape_char'. The escape character is a single character you define — commonly backslash \ or exclamation mark !. Any wildcard that follows the escape character is treated as a literal character instead of a wildcard.</p>
        <p style={{ margin: '0 0 14px' }}>Example: to find product descriptions containing "100%", write WHERE description LIKE '%100\%%' ESCAPE '\'. The first % is a wildcard (match anything before "100"), the \% is a literal percent sign, and the final % is another wildcard (match anything after). Similarly, to find values containing a literal underscore: WHERE code LIKE '%\_order%' ESCAPE '\' — the \_ is a literal underscore.</p>
        <p style={{ margin: 0 }}>In PostgreSQL, the backslash already has special meaning in string literals, so you may need to double it: LIKE '%100\\%%' ESCAPE '\\'. Using a non-standard escape character like ! avoids this: WHERE description LIKE '%100!%%' ESCAPE '!'. This is cleaner and avoids backslash confusion. In practice, the need to search for literal % or _ is rare in well-designed databases — values that users search for usually do not contain SQL wildcard characters. When they do appear (in financial data with percentage signs, for example), the ESCAPE clause is the correct solution rather than any workaround.</p>
      </IQ>

      <IQ q="What is the difference between LIKE, SIMILAR TO, and regular expressions in SQL?">
        <p style={{ margin: '0 0 14px' }}>LIKE is the standard SQL pattern matching operator supported by all relational databases. It uses only two wildcards (% and _), making it simple and fast for straightforward patterns. LIKE with a leading literal (not a wildcard) can use B-tree indexes and is performant at scale. LIKE is the right choice for the vast majority of pattern matching needs.</p>
        <p style={{ margin: '0 0 14px' }}>SIMILAR TO is a PostgreSQL-only operator that extends LIKE with a limited regex-like syntax: | for alternation, [] for character classes, * for zero or more repetitions, + for one or more, ? for zero or one. SIMILAR TO '%@(gmail|yahoo)\.com' matches email addresses from either domain. SIMILAR TO is anchored — the pattern must match the entire string. It is more powerful than LIKE but less commonly used because ILIKE handles most needs, and full regular expressions are more expressive when SIMILAR TO is not enough. SIMILAR TO is always a full scan — it offers no index benefit.</p>
        <p style={{ margin: 0 }}>Regular expressions (REGEXP in MySQL, ~ in PostgreSQL) are the most powerful text matching tool — they support the full regular expression syntax: lookaheads, backreferences, named groups, character classes, quantifiers. They handle complex validation patterns (PAN card format, Aadhaar format, phone number patterns), multi-pattern alternation, and any matching logic LIKE cannot express. Regular expressions are always slow — full scans, no index benefit — and have complex, easy-to-get-wrong syntax. Use them when LIKE cannot solve the problem and the table is small enough that the scan cost is acceptable. For production search on large tables, none of the three are the right choice — use full-text search indexes or a dedicated search engine instead.</p>
      </IQ>

      <HR />

      {/* ── Error Library ── */}
      <Part n="13" title="Errors You Will Hit — And Exactly Why They Happen" />

      <Err
        msg="LIKE returns zero rows — WHERE name LIKE 'amul%' finds nothing"
        cause="Case sensitivity mismatch. In PostgreSQL and DuckDB (this playground), LIKE is case-sensitive. The pattern 'amul%' does not match 'Amul Butter' because 'a' ≠ 'A'. The stored values use title case (first letter capitalised) but the pattern uses lowercase. No error is thrown — the query simply returns zero rows."
        fix="Use ILIKE instead of LIKE for case-insensitive matching in PostgreSQL and DuckDB: WHERE name ILIKE 'amul%'. For cross-database compatibility, use LOWER(): WHERE LOWER(name) LIKE 'amul%'. Always run SELECT DISTINCT column FROM table to see the actual stored values before writing a LIKE condition — this immediately reveals case and spacing issues that would cause LIKE to miss rows."
      />

      <Err
        msg="LIKE query is extremely slow — WHERE description LIKE '%search term%' takes 30 seconds"
        cause="A leading percent wildcard prevents index usage. LIKE '%search term%' requires the database to scan every row and check the full value — a full table scan. On a table with millions of rows and no full-text index, this takes seconds to minutes. The EXPLAIN plan will show Seq Scan (sequential scan) with an estimated cost proportional to the table size."
        fix="Short-term: add a WHERE condition on an indexed column before the LIKE to reduce the scan size — WHERE category = 'Electronics' AND description LIKE '%waterproof%' limits the LIKE scan to only Electronics products. Long-term: add a PostgreSQL full-text search index (GIN on tsvector column) or switch to a search engine (Elasticsearch, Typesense) for any feature that users will search. For ends-with patterns specifically, consider storing a reversed copy of the column and using LIKE 'reversed_pattern%' on the reversed column — which can use an index."
      />

      <Err
        msg="NOT LIKE returns wrong count — fewer rows than expected"
        cause="NOT LIKE excludes NULL rows silently. If the column being matched can contain NULL, rows where the column IS NULL evaluate NOT LIKE to NULL (not TRUE), and are excluded from results by the WHERE clause. This is the same NULL propagation issue as NOT IN — any NULL in the comparison column causes the row to silently disappear."
        fix="Add OR column IS NULL to include null rows: WHERE name NOT LIKE 'Amul%' OR name IS NULL. To diagnose: run SELECT COUNT(*) FROM table WHERE column IS NULL — if this returns any rows, your NOT LIKE is excluding them. Decide whether NULL rows should be included in the NOT LIKE result (they represent unknown values, so 'not Amul' includes 'unknown brand') and add the IS NULL check accordingly."
      />

      <Err
        msg="LIKE matches more rows than expected — 'Tata%' matches 'Tata Salt' and 'Tata Sampann' but also 'TataSteel'"
        cause="The pattern is broader than intended. 'Tata%' matches any string starting with exactly 'Tata' — including 'TataSteel' (no space). If you intended to match products from the Tata brand where the product name starts with 'Tata ' (with a trailing space), the pattern 'Tata%' without the space matches more than expected. This is a pattern design issue, not a SQL bug."
        fix="Add the space to the pattern to match brand name followed by a product name: WHERE product_name LIKE 'Tata %' (note the space before %). This excludes 'TataSteel' which has no space after 'Tata'. Alternatively, filter on the brand column directly: WHERE brand = 'Tata' — which is more reliable than pattern matching on product_name. Always prefer exact equality on a dedicated column over pattern matching on a combined column when the structure allows it."
      />

      <Err
        msg="Wildcard treated as literal — LIKE '100%' matches '100anything' but not '100%'"
        cause="You tried to match a literal percent sign without escaping it. In a LIKE pattern, % always means 'any sequence of characters'. To match a literal percent sign, you must escape it using the ESCAPE clause. Without escaping, LIKE '100%' means '100 followed by anything' — so it matches '100apples', '100%', '100 units', etc., all for the same reason."
        fix="Use the ESCAPE clause to escape the literal %: WHERE value LIKE '100\%' ESCAPE '\'. This tells the database that \% is a literal percent character, not a wildcard. Verify by running SELECT '100%' LIKE '100\%' ESCAPE '\' — this should return TRUE. If you also need to match values starting with '100%' followed by more text: WHERE value LIKE '100\%%' ESCAPE '\' — the first \% is literal, the second % is the wildcard."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="The FreshMart marketing team is running a campaign targeting: (1) customers whose email is from a non-Gmail provider AND who live in cities ending with 'abad' or 'abad' variant — specifically Hyderabad or Ahmedabad. (2) Separately, find all products from brands whose name is exactly 5 characters long. Write both queries."
        hint="Query 1: email NOT LIKE '%@gmail.com' AND (city LIKE '%abad' OR city LIKE 'Hyderabad'). Query 2: brand LIKE '_____ ' — five underscores for exactly five characters. Use SELECT DISTINCT brand to verify first."
        answer={`-- Query 1: Non-Gmail customers in Hyderabad or Ahmedabad
SELECT
  first_name || ' ' || last_name  AS customer,
  email,
  city,
  loyalty_tier
FROM customers
WHERE email NOT LIKE '%@gmail.com'
  AND (city LIKE '%Hyderabad' OR city LIKE '%Ahmedabad')
ORDER BY city, last_name;

-- Query 2: Products from brands with exactly 5-character names
SELECT DISTINCT brand
FROM products
WHERE brand LIKE '_____'
ORDER BY brand;

-- Full product list for those brands:
SELECT product_name, brand, category, unit_price
FROM products
WHERE brand LIKE '_____'
ORDER BY brand, unit_price;`}
        explanation="Query 1 combines NOT LIKE with OR-grouped LIKE conditions. The parentheses around the city OR are essential — without them, AND has higher precedence and would bind 'email NOT LIKE' with only 'city LIKE Hyderabad', producing wrong results. Query 2 uses five underscores to match exactly 5-character brand names — each _ matches exactly one character, so _____ requires exactly 5. Run SELECT DISTINCT brand FROM products first to see which brands have 5-character names and verify the count matches your expectation. The five-underscore count is easy to get wrong — always double-check by counting manually."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'LIKE is a WHERE operator that matches strings against a pattern rather than an exact value. It uses two wildcards: % (any sequence of zero or more characters) and _ (exactly one character).',
          'Pattern position controls what is matched: prefix% = starts with, %suffix = ends with, %contains% = contains anywhere, prefix%suffix = starts and ends with specific values.',
          'LIKE is case-sensitive in PostgreSQL and DuckDB. Use ILIKE (PostgreSQL/DuckDB) for case-insensitive matching. Use LOWER(column) LIKE LOWER(pattern) for cross-database compatibility.',
          'NOT LIKE excludes matching rows. Like all NOT conditions, it silently excludes NULL rows — add OR column IS NULL if you need NULL rows in the result.',
          'Starts-with patterns (LIKE \'prefix%\') can use B-tree indexes — fast on large tables. Leading wildcard patterns (LIKE \'%pattern\') always require full table scans — slow on large tables.',
          'To search for a literal % or _ character, use the ESCAPE clause: WHERE value LIKE \'100\\%%\' ESCAPE \'\\\'.',
          'Multiple LIKE conditions combine with AND and OR like any other WHERE condition. Parentheses are essential when mixing AND and OR with LIKE.',
          'LIKE with a dynamic pattern built from another column (WHERE name LIKE brand || \'%\') performs a starts-with check using the column value as the prefix — useful for data quality audits.',
          'SIMILAR TO (PostgreSQL) adds regex-like operators to LIKE. REGEXP (MySQL) and ~ (PostgreSQL) support full regular expressions — most powerful but always slow, no index benefit.',
          'For production full-text search on large tables, use PostgreSQL full-text search (tsvector/GIN indexes) or a dedicated search engine (Elasticsearch, Typesense). LIKE \'%pattern%\' does not scale beyond a few million rows for user-facing features.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>What comes next</p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          In <strong>Module 15</strong>, you learn the IN and BETWEEN operators — clean shorthand for multiple OR conditions and range checks that make complex WHERE clauses dramatically more readable.
        </p>
        <Link href="/learn/sql/in-between" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 15 → IN and BETWEEN Operators
        </Link>
      </div>

    </LearnLayout>
  );
}
