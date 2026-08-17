import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Tables — Structure and Correct Usage — HTML & CSS | Chaduvuko',
  description:
    'table, thead/tbody/tfoot, th, td, colspan/rowspan — and exactly why tables should never be used for page layout.',
}

const C = '#00e676'

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

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{
    fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10,
  }}>{children}</h4>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20,
  }}>{children}</p>
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

export default function Tables() {
  return (
    <LearnLayout
      title="Tables — Structure and Correct Usage"
      description="table, thead/tbody/tfoot, th, td, colspan/rowspan — and exactly why tables should never be used for page layout."
      section="HTML & CSS — Module 07"
      readTime="35 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — table, tr, td, th" />
        <SectionTitle>The Four Elements Every Table Is Built From</SectionTitle>

        <Para>
          A table is built from a small, strict set of elements, each with one job: <code>{`<table>`}</code>{' '}
          wraps the whole thing, <code>{`<tr>`}</code> (table row) defines one row, and each cell inside a
          row is either <code>{`<td>`}</code> (table data — a regular cell) or <code>{`<th>`}</code>{' '}
          (table header — a cell that labels a row or column, not just data).
        </Para>

        <CodeBox label="The minimum structure of a real table">{`<table>
  <tr>
    <th>Product</th>
    <th>Price</th>
    <th>In Stock</th>
  </tr>
  <tr>
    <td>Wireless Mouse</td>
    <td>$24.99</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>USB-C Hub</td>
    <td>$39.99</td>
    <td>No</td>
  </tr>
</table>`}</CodeBox>

        <Para>
          The distinction between <code>{`<th>`}</code> and <code>{`<td>`}</code> is not cosmetic —
          browsers apply bold, centered default styling to <code>{`<th>`}</code>, but the real reason it
          exists is semantic: it marks a cell as a <em>header</em> for the data around it, information
          screen readers use to announce which column or row a given cell belongs to as a user navigates
          the table cell by cell. Using <code>{`<td>`}</code> everywhere and faking bold headers with CSS
          throws away that relationship entirely, even though the table looks identical to a sighted
          user.
        </Para>

        <Callout type="warning">
          <strong>Table data belongs inside a real table.</strong> Tabular data — genuinely rows and
          columns of related values, like a pricing grid, a spreadsheet export, or a schedule — should
          use <code>{`<table>`}</code>. Non-tabular content laid out to visually resemble columns is a
          different problem, covered fully in Part 07.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — thead, tbody, tfoot" />
        <SectionTitle>Grouping Rows Into Head, Body, and Foot</SectionTitle>

        <Para>
          A real table almost always separates its header row from its data rows structurally, not just
          visually. <code>{`<thead>`}</code> wraps the header row(s), <code>{`<tbody>`}</code> wraps the
          actual data rows, and an optional <code>{`<tfoot>`}</code> wraps summary or total rows that
          belong at the bottom.
        </Para>

        <CodeBox label="A properly grouped table">{`<table>
  <thead>
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>Quantity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Wireless Mouse</td>
      <td>$24.99</td>
      <td>2</td>
    </tr>
    <tr>
      <td>USB-C Hub</td>
      <td>$39.99</td>
      <td>1</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">Total</td>
      <td>$89.97</td>
    </tr>
  </tfoot>
</table>`}</CodeBox>

        <Para>
          This grouping is not just organizational tidiness. Browsers use it to enable independent
          scrolling of a long table&apos;s body while keeping the header pinned in view, CSS can target{' '}
          <code>{`tbody tr`}</code> to style only data rows without touching the header, and assistive
          technology uses the structural separation to distinguish "this is a label" from "this is the
          data the label describes" more reliably than styling alone ever could.
        </Para>

        <SubTitle>Multiple tbody elements — grouping related rows within one table</SubTitle>

        <Para>
          A single table can contain more than one <code>{`<tbody>`}</code>, useful for visually and
          semantically grouping subsets of rows — a sales report broken into regions, for example —
          without breaking the table into several separate, disconnected tables.
        </Para>

        <CodeBox label="Multiple tbody sections in one table">{`<table>
  <thead>
    <tr><th>Region</th><th>Rep</th><th>Revenue</th></tr>
  </thead>
  <tbody>
    <tr><td>West</td><td>Dana Lee</td><td>$142,000</td></tr>
    <tr><td>West</td><td>Omar Reyes</td><td>$98,500</td></tr>
  </tbody>
  <tbody>
    <tr><td>East</td><td>Priya Nair</td><td>$167,200</td></tr>
  </tbody>
</table>`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — The scope Attribute" />
        <SectionTitle>scope — Telling a Screen Reader What a Header Cell Actually Labels</SectionTitle>

        <Para>
          A <code>{`<th>`}</code> marks a cell as a header, but in a table with headers running both
          across the top <em>and</em> down the left side, a screen reader cannot always infer on its own
          whether a given <code>{`<th>`}</code> labels the column beneath it or the row beside it. The{' '}
          <code>scope</code> attribute removes that ambiguity explicitly.
        </Para>

        <CodeBox label="scope='col' and scope='row' disambiguating header direction">{`<table>
  <thead>
    <tr>
      <th scope="col">Employee</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Dana Lee</th>
      <td>142</td>
      <td>158</td>
    </tr>
    <tr>
      <th scope="row">Omar Reyes</th>
      <td>98</td>
      <td>112</td>
    </tr>
  </tbody>
</table>`}</CodeBox>

        <Para>
          With <code>scope</code> in place, a screen reader user landing on the cell containing{' '}
          <code>158</code> hears something equivalent to "Q2, Dana Lee: 158" — both the column header and
          the row header, resolved unambiguously. Without it, in a table with headers on two sides, that
          same cell might be announced with no header context at all, leaving the listener to manually
          count rows and columns from the start of the table to figure out what a number even represents.
        </Para>

        <Callout type="tip">
          <strong>Any table with row headers (a <code>{`<th>`}</code> starting each row, not just each
          column) needs <code>scope=&quot;row&quot;</code> on those cells.</strong> This single attribute
          is one of the highest-impact, lowest-effort accessibility fixes for real data tables, and it is
          skipped constantly — most developers remember <code>{`<th>`}</code> for the top header row and
          forget it applies to row labels too.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 04 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — colspan and rowspan" />
        <SectionTitle>colspan and rowspan — Making a Cell Span Multiple Columns or Rows</SectionTitle>

        <Para>
          <code>colspan</code> makes a single cell stretch across multiple columns; <code>rowspan</code>{' '}
          makes it stretch down across multiple rows. Both take a number — how many columns or rows the
          cell should occupy — and both directly affect how many <code>{`<td>`}</code>/<code>{`<th>`}</code>{' '}
          elements the surrounding rows need, since a spanned cell effectively "uses up" cells that would
          otherwise need to be written explicitly in the row(s) it spans into.
        </Para>

        <CodeBox label="colspan — a totals row spanning two label columns">{`<table>
  <tbody>
    <tr>
      <td>Wireless Mouse</td>
      <td>2 × $24.99</td>
      <td>$49.98</td>
    </tr>
    <tr>
      <td colspan="2">Total</td>
      <td>$49.98</td>
    </tr>
  </tbody>
</table>
<!-- The totals row only needs 2 td elements, not 3 — the first
     td's colspan="2" already covers the space of two columns. -->`}</CodeBox>

        <CodeBox label="rowspan — one cell labeling multiple rows beneath it">{`<table>
  <tbody>
    <tr>
      <th rowspan="2">Engineering</th>
      <td>Dana Lee</td>
    </tr>
    <tr>
      <td>Omar Reyes</td>
    </tr>
    <tr>
      <th>Design</th>
      <td>Priya Nair</td>
    </tr>
  </tbody>
</table>
<!-- The second row has no th of its own — the first row's th
     rowspan="2" already occupies that cell's position. -->`}</CodeBox>

        <Callout type="warning">
          <strong>A spanned cell shifts every cell after it in that row (or column).</strong> This is the
          single most common source of a broken, misaligned table — forgetting that a{' '}
          <code>colspan</code>/<code>rowspan</code> cell removes the need to explicitly write the cells it
          covers, and accidentally writing them anyway, which pushes every real cell one position further
          right or down than intended.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — caption" />
        <SectionTitle>caption — Giving a Table an Accessible Title</SectionTitle>

        <Para>
          <code>{`<caption>`}</code> provides a title for the entire table, and — much like{' '}
          <code>{`<figcaption>`}</code> for a <code>{`<figure>`}</code> — it must be the first child
          immediately inside <code>{`<table>`}</code> to be valid. Unlike a heading placed above a table,
          it is programmatically tied to that specific table, so a screen reader announces it the moment
          a user enters the table, before hearing any header or data cells.
        </Para>

        <CodeBox label="caption as the first child of table">{`<table>
  <caption>Q1 2026 Sales by Region</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>West</td>
      <td>$240,500</td>
    </tr>
    <tr>
      <td>East</td>
      <td>$167,200</td>
    </tr>
  </tbody>
</table>`}</CodeBox>

        <Para>
          A common alternative — an <code>{`<h2>`}</code> or <code>{`<h3>`}</code> placed directly above
          the table — is visually indistinguishable but structurally weaker: nothing in the markup
          formally connects that heading to the specific table beneath it, especially once other content
          sits between them, or if the table is reordered by responsive CSS. <code>{`<caption>`}</code>{' '}
          removes that ambiguity entirely, at the cost of being slightly less common to see in real
          production code than it should be.
        </Para>
      </section>

      <Divider />

      {/* ── Part 06 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Putting It All Together" />
        <SectionTitle>A Complete, Properly Structured Table</SectionTitle>

        <Para>
          Every element covered so far combines into one real, correctly built table — the shape you
          should be aiming for whenever you are marking up genuine tabular data in production code.
        </Para>

        <CodeBox label="A full table using every element from this module">{`<table>
  <caption>Employee Directory — Engineering Team</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Title</th>
      <th scope="col">Start Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Dana Lee</th>
      <td>Senior Engineer</td>
      <td>March 2023</td>
    </tr>
    <tr>
      <th scope="row">Omar Reyes</th>
      <td>Staff Engineer</td>
      <td>June 2021</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">2 employees shown</td>
    </tr>
  </tfoot>
</table>`}</CodeBox>

        <Para>
          Notice what each piece contributes: <code>{`<caption>`}</code> names the table,{' '}
          <code>{`<thead>`}</code>/<code>{`<tbody>`}</code>/<code>{`<tfoot>`}</code> separate its
          structural regions, <code>scope</code> disambiguates header direction on both axes, and every
          cell is exactly the right element for what it contains — data in <code>{`<td>`}</code>, labels
          in <code>{`<th>`}</code>. This is the level of structure real production data tables should
          carry, even though a large amount of code in the wild skips most of it and relies on default
          rendering to look "close enough."
        </Para>
      </section>

      <Divider />

      {/* ── Part 07 ── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — The Table-Layout Anti-Pattern" />
        <SectionTitle>Why Tables Were Once Used for Page Layout — And Exactly Why That Stopped</SectionTitle>

        <Para>
          Long before Flexbox or Grid existed, CSS had no reliable way to build a multi-column page
          layout — no way to put a sidebar next to a main content area, or arrange a header, nav, content,
          and footer into a real page skeleton, that worked consistently across browsers. Tables, however,
          were already excellent at exactly one thing CSS could not yet do: reliably arranging content
          into rows and columns. So throughout the late 1990s and much of the 2000s, an entire generation
          of websites was built by wrapping the <em>entire page</em> in nested <code>{`<table>`}</code>{' '}
          elements — a header row, a row with two or three <code>{`<td>`}</code> "columns" acting as a
          sidebar and main content area, a footer row — using table structure purely to achieve a visual
          arrangement that had nothing to do with tabular data.
        </Para>

        <CodeBox label="What table-based layout looked like — an entire page as one giant table">{`<table width="960">
  <tr>
    <td colspan="2">
      <!-- site header/logo -->
    </td>
  </tr>
  <tr>
    <td width="200">
      <!-- sidebar navigation -->
    </td>
    <td>
      <!-- main page content -->
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <!-- footer -->
    </td>
  </tr>
</table>
<!-- None of this is real tabular data. It's page structure, forced
     into table syntax because CSS layout wasn't reliable enough yet. -->`}</CodeBox>

        <Para>
          This approach worked, in the narrow sense that it rendered a multi-column page. But it caused
          real, serious, compounding problems that got worse as the web grew: a screen reader encountering
          this markup announces it as a table of data, with row and column navigation commands, forcing a
          blind user to navigate an entire page as if it were a spreadsheet full of nonsense cells. The
          markup carried zero semantic meaning about what the content actually was — a nav, a header, an
          article — because everything was just generic table cells. Nested tables (a table inside a
          table inside a table, which real layouts frequently required) were slow for browsers to
          calculate and render, since a table&apos;s column widths cannot be finalized until its entire
          content has been parsed. And restructuring the page for a different screen size meant
          physically rewriting the table structure itself, since tables have no concept of responsively
          reflowing content the way modern layout systems do.
        </Para>

        <Callout type="warning">
          <strong>Tables should be used only for genuinely tabular data — never for page layout.</strong>{' '}
          This is not a stylistic preference; it directly affects whether a page is usable with a screen
          reader, how fast it renders, and how it can adapt to different screen sizes. Flexbox and CSS
          Grid, covered in full in the CSS Layout phase of this track, are what finally gave CSS a
          reliable, purpose-built way to arrange page structure — which is exactly why table-based layout
          disappeared from professional practice once they matured and gained full browser support.
        </Callout>

        <Para>
          Knowing this history is not just trivia. It explains a real, still-visible pattern: any time you
          encounter a table where the cells hold layout regions (a sidebar, a header, a footer) rather
          than actual data values, that is a signal of legacy code built under real technical constraints
          that no longer exist — and a strong candidate for a rewrite using semantic elements (covered in
          the Text Elements & Semantic Structure module) combined with Flexbox or Grid, once you reach
          those modules.
        </Para>
      </section>

      <Divider />

      {/* ── Part 08 — Real World ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 08 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Fintech Company in Charlotte Rebuilds Its Transaction History Table</SectionTitle>

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
            Scenario — Fintech startup, Charlotte · Accessibility compliance audit
          </div>

          <Para>
            A banking app undergoing a third-party accessibility audit ahead of a compliance deadline gets
            flagged specifically on its transaction history page — a table with dates down the left side
            and account types across the top, showing balances at each intersection.
          </Para>

          <CodeBox label="The original markup — flagged in the audit">{`<table>
  <tr>
    <td></td>
    <td>Checking</td>
    <td>Savings</td>
  </tr>
  <tr>
    <td>Jan 2026</td>
    <td>$4,210.55</td>
    <td>$12,800.00</td>
  </tr>
  <tr>
    <td>Feb 2026</td>
    <td>$3,940.10</td>
    <td>$13,100.00</td>
  </tr>
</table>`}</CodeBox>

          <SubSubTitle>What the audit report says</SubSubTitle>

          <Para>
            The report lists three separate findings, all traceable to specific parts of this module.
            First: no <code>{`<th>`}</code> elements anywhere — every cell, including the row and column
            labels, is a plain <code>{`<td>`}</code>, so nothing marks "Checking," "Savings," or the
            month labels as headers at all. Second: no <code>scope</code> attributes, meaning even if{' '}
            <code>{`<th>`}</code> were added, a screen reader would have no way to tell whether a given
            header applies to its column or its row — critical in a table with headers on both axes, like
            this one. Third: no <code>{`<caption>`}</code>, so a screen reader user landing on the table
            has no announced title describing what it actually contains before navigating into it.
          </Para>

          <CodeBox label="The corrected markup">{`<table>
  <caption>Account balances by month, Checking and Savings</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Checking</th>
      <th scope="col">Savings</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Jan 2026</th>
      <td>$4,210.55</td>
      <td>$12,800.00</td>
    </tr>
    <tr>
      <th scope="row">Feb 2026</th>
      <td>$3,940.10</td>
      <td>$13,100.00</td>
    </tr>
  </tbody>
</table>`}</CodeBox>

          <Para>
            The visual rendering barely changes — a small font-weight shift on the header cells, easily
            restyled with CSS if the team wants headers that do not look bold by default. What changes
            entirely is what a screen reader announces: landing on <code>$13,100.00</code> now reads as
            "Savings, February 2026: $13,100.00" instead of a bare, unlabeled dollar figure with no
            indication of which account or month it belongs to. The audit finding closes, and — because
            this exact table structure is used across four other pages in the app via a shared component
            — the fix ships everywhere at once.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Misconceptions ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 09 — Misconceptions" />
        <SectionTitle>Four Misconceptions About HTML Tables</SectionTitle>

        {[
          {
            wrong: '"th is just a bolder, centered version of td — a styling choice"',
            right: 'th is semantically distinct from td: it marks a cell as a header for the row or column it labels, information screen readers rely on when navigating table data. The bold, centered default styling is a side effect of that meaning, not the reason to use it — and that default styling can be fully overridden with CSS without losing the semantic relationship.',
          },
          {
            wrong: '"Tables automatically became bad practice for layout once CSS existed at all"',
            right: 'Table-based layout was the standard, reasonable approach for years because early CSS genuinely could not do reliable multi-column page layout. It became an anti-pattern specifically once Flexbox and Grid matured and gained full browser support, giving CSS a purpose-built alternative — the criticism is about using the wrong tool once a better one existed, not about the original choice being irrational for its time.',
          },
          {
            wrong: '"scope is optional if the table only has headers across the top"',
            right: 'scope="col" is genuinely optional for a simple table with headers on only one axis, since there is no ambiguity to resolve. It becomes necessary the moment a table has headers on both axes (a top row AND a left column), which is exactly when a screen reader needs an explicit signal for which direction each th applies to.',
          },
          {
            wrong: '"colspan and rowspan just visually merge cells, like in a spreadsheet tool"',
            right: 'They do visually merge the cells, but the more important effect is structural: a spanned cell reduces how many td/th elements the affected row (or the rows/columns after it) actually needs, since the span already occupies that space. Writing the "extra" cells anyway is the single most common cause of a misaligned table.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontSize: 13, fontWeight: 700, color: 'var(--red)',
              marginBottom: 8, fontFamily: 'var(--font-mono)',
            }}>
              ✕ &quot;{item.wrong}&quot;
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
              {item.right}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 10 — Interview Prep ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'What is the difference between td and th, beyond default browser styling?',
            a: 'th marks a cell as a header for the data around it — a label for a row or column — while td holds a regular data value. This distinction is used by screen readers to announce which row and column header apply to a given data cell as a user navigates the table, independent of any visual styling. Using td everywhere and simulating bold headers with CSS preserves the visual appearance but destroys that semantic relationship.',
          },
          {
            q: 'Why does the scope attribute matter, and when is it actually necessary versus optional?',
            a: 'scope explicitly tells assistive technology whether a th labels the column beneath it (scope="col") or the row beside it (scope="row"). It is most necessary in a table with headers on both axes — a top header row and a left header column — where a screen reader cannot reliably infer direction on its own. A simple table with headers on only one axis has less ambiguity, though including scope is still good practice.',
          },
          {
            q: 'Explain why tables were historically used for page layout, and exactly why that practice was abandoned.',
            a: 'Before Flexbox and Grid existed, CSS had no reliable cross-browser way to build multi-column page layouts, while tables were already reliable at arranging content into rows and columns — so developers wrapped entire pages in nested tables purely to achieve visual layout. This was abandoned because it caused real problems: screen readers announce such markup as tabular data, forcing users to navigate a page as if it were a spreadsheet; nested tables were slow to render, since column widths cannot finalize until all content is parsed; and tables have no native way to responsively reflow for different screen sizes. Flexbox and Grid solved the original layout problem properly, removing any remaining justification for the pattern.',
          },
          {
            q: 'What do colspan and rowspan actually do, and what is the most common mistake when using them?',
            a: 'colspan makes a cell span multiple columns; rowspan makes a cell span multiple rows — both take a number of columns/rows to occupy. The most common mistake is forgetting that a spanned cell reduces how many td/th elements the affected row (for colspan) or subsequent rows (for rowspan) need to explicitly include, since the span already occupies that space — writing those cells anyway pushes every following cell in that row out of alignment.',
          },
          {
            q: 'What is the purpose of the caption element, and how is it different from a heading placed above the table?',
            a: 'caption provides a title for a table that is programmatically tied to that specific table — it must be the first child of table, and screen readers announce it as soon as a user enters the table. A heading placed above a table is visually similar but structurally disconnected: nothing in the markup formally links it to the table, especially once other content sits between them or the layout is reordered responsively.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{
              fontSize: 14, fontWeight: 800, color: 'var(--text)',
              marginBottom: 14, lineHeight: 1.4,
            }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>
              {item.a}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Table Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Using td for header cells and simulating the header look with CSS font-weight',
            a: 'This preserves the visual appearance but removes the semantic header relationship screen readers rely on. Use th for any cell that labels a row or column, and control its visual weight/alignment with CSS if the default styling is not wanted.',
          },
          {
            q: 'Forgetting scope="row" on row-header th cells',
            a: 'Developers reliably remember th for the top header row, but forget that any th starting a row also needs scope="row" in a table with headers on both axes — without it, a screen reader has no reliable way to announce which row a data cell belongs to.',
          },
          {
            q: 'Writing every cell in a row after a colspan/rowspan cell, without accounting for the space it already occupies',
            a: 'A spanned cell reduces the number of explicit td/th elements the row (or following rows) needs. Writing the full, un-reduced set of cells anyway shifts every real cell out of its intended column, producing a visibly misaligned table.',
          },
          {
            q: 'Reaching for a table to lay out a page section — a card grid, a form layout, a navbar',
            a: 'This is the historical anti-pattern covered in Part 07, and it still appears in legacy code and in beginners unfamiliar with modern CSS layout. Flexbox and Grid are the correct tools for arranging page structure — tables should hold only genuinely tabular data.',
          },
          {
            q: 'Leaving out caption and assuming a nearby heading is good enough',
            a: 'A heading placed near a table is visually similar but not programmatically connected to it. caption, placed as the table\'s first child, is what a screen reader actually associates with that specific table as its title.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{
              fontSize: 14, fontWeight: 800, color: 'var(--text)',
              marginBottom: 14, lineHeight: 1.4,
            }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>
              {item.a}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors and Rendering Bugs You Will Hit With Tables — And Exactly Why</SectionTitle>

        {[
          {
            error: `Table renders visibly misaligned — a column's data appears shifted one cell to the right`,
            cause: 'A row containing a colspan or rowspan cell also includes the "extra" cells that span already accounts for, effectively double-counting that space and pushing every subsequent cell in the row out of position.',
            fix: 'Count the actual number of columns a spanned cell should absorb, and remove exactly that many explicit cells from the affected row (for colspan) or the rows beneath it (for rowspan), as covered in Part 04.',
          },
          {
            error: `HTML validator: "Element caption must be the first child of table"`,
            cause: 'caption was placed after thead, tbody, or another element inside the table, rather than as the very first element directly inside the opening table tag.',
            fix: 'Move caption to be the first child of table, immediately after the opening tag and before thead or any tr elements.',
          },
          {
            error: `Screen reader announces a data cell with no header context (e.g. just a bare number, no label)`,
            cause: 'The table has no th elements at all, or has th elements without scope attributes in a table with headers on both axes, so assistive technology cannot determine which row and column label apply to the cell being read.',
            fix: 'Use th for all row and column labels, and add scope="col" / scope="row" as appropriate — especially critical for any table with headers running in both directions, as shown in Part 03.',
          },
          {
            error: `Layout audit / Lighthouse: "Table markup is used for visual layout, not tabular data"`,
            cause: 'A table element is being used to arrange page sections (a sidebar, header, footer) that are not genuinely tabular data — the historical anti-pattern covered in Part 07, most commonly found in legacy code migrated from an older codebase.',
            fix: 'Replace the layout table with semantic elements (header, nav, main, aside, footer) combined with Flexbox or Grid for the actual visual arrangement, once you reach the CSS Layout phase of this track.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12,
              color: 'var(--red)', marginBottom: 12,
              background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)',
              borderRadius: 6, padding: '8px 12px',
              lineHeight: 1.5,
            }}>
              {item.error}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase',
              }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase',
              }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ── */}
      <KeyTakeaways items={[
        'table, tr, td, and th form the required structure — th marks header cells semantically, not just visually, which matters directly for screen reader navigation.',
        'thead, tbody, and tfoot group rows into structural regions, enabling independent header behavior, targeted CSS styling, and clearer semantics for assistive technology.',
        'scope="col" and scope="row" on th cells disambiguate header direction — essential for any table with headers on both axes, one of the highest-impact, most-skipped accessibility fixes for data tables.',
        'colspan and rowspan span a cell across multiple columns or rows — and reduce how many explicit cells the affected row(s) need, a detail that causes most real table misalignment bugs when missed.',
        'caption, as the first child of table, gives the table an accessible, programmatically connected title — stronger than a nearby heading, which carries no formal relationship to the table.',
        'Tables were historically used for entire page layouts because early CSS could not reliably build multi-column layouts — a practice abandoned once Flexbox and Grid matured, since table-based layout breaks screen reader navigation, is slow to render, and cannot reflow responsively.',
        'Tables should hold only genuinely tabular data. Page layout — sidebars, headers, footers, card grids — belongs to semantic elements combined with Flexbox or Grid, covered later in this track.',
      ]} />

      {/* ── Next Module CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 08 moves into HTML forms — the form element, every common input type with real
          behavioral differences, labels done correctly, and the built-in browser validation you get for
          free before a single line of JavaScript.
        </p>
        <Link href="/learn/html-css/forms-inputs-validation" style={{ background: C, color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 08 → HTML Forms — Inputs &amp; Validation Basics
        </Link>
      </div>
    </LearnLayout>
  )
}
