import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function SpreadsheetsForAnalysis() {
  return (
    <LearnLayout
      title="Spreadsheets for Analysis — Excel and Google Sheets"
      description="Clean and analyse data in a spreadsheet: formulas, lookups, pivot tables, conditional formatting and charts, and when to move to SQL or Python."
      section="Data Analytics & Statistics — Lesson 01"
      readTime="40 min"
    >
      <Part n={1} label="Start with the question" title="A Spreadsheet Is a Small Analytical Workspace">
        <P>
          Spreadsheets are often the quickest way to inspect a small export, validate a metric, or answer a one-off question.
          Imagine an operations analyst asking whether late deliveries cluster by city or weekday. The goal is not to apply
          every feature in Excel or Google Sheets; it is to turn rows into a checked answer that someone can reproduce.
          Write the question, population, time period, and unit before you open a chart.
        </P>
        <P>
          Treat each row as one observation and each column as one field. A useful table has a single header row, consistent
          types, and no merged cells or decorative totals inside the data range. Keep a raw sheet unchanged, do analysis in a
          separate sheet, and record filters and assumptions. This small bit of structure makes the workbook easier to audit.
        </P>
        <Table
          head={['Question to settle', 'Example', 'Why it matters']}
          rows={[
            ['What is one row?', 'One completed delivery', 'Prevents counting line items as orders'],
            ['Which records count?', 'Completed orders placed in the chosen month', 'Makes exclusions visible'],
            ['What does a field mean?', 'late_flag = delivery after promised time', 'Avoids silently changing definitions'],
            ['What is the unit?', 'Minutes, not seconds', 'Keeps formulas and charts interpretable'],
          ]}
          caption="A good analysis starts with a well-defined table and question."
        />
        <Callout type="info">
          A formula can be perfectly correct and still answer the wrong question. Define the row grain and inclusion rules
          before calculating totals or percentages.
        </Callout>
      </Part>

      <Part n={2} label="Prepare the data" title="Make the Table Rectangular and Check Its Quality">
        <P>
          Convert the range to an Excel Table or use a clearly bounded range in Sheets. Tables expand when new rows are added
          and make formula references easier to read. Inspect blanks, duplicate IDs, inconsistent spellings, dates stored as
          text, and numeric values containing symbols. Do not delete an unusual observation just because it looks surprising;
          first determine whether it is an error or a genuine event.
        </P>
        <P>
          Keep the original export in a read-only raw tab. Make a cleaned tab with explicit transformations, and keep a short
          notes area for source, export time, filters, and unresolved issues. If you normalize city names or convert a text
          date, retain enough information to explain what changed. A workbook is a deliverable, not just a scratchpad.
        </P>
        <Code file="spreadsheet_quality_checks" lang="text" code={`
Before analysis
- Confirm the header row is unique and contains no blank column names.
- Check whether one order_id appears more than once; determine why.
- Compare row count with the export or source-system summary.
- Inspect blank, error, and unexpected category values.
- Confirm date and number cells are real values, not text lookalikes.
- Record filters, exclusions, units, and the time window.
`} />
        <Callout type="warning">
          Never overwrite the source tab while cleaning. If a replacement rule is wrong, an untouched input lets you recover
          and compare the before-and-after counts.
        </Callout>
      </Part>

      <Part n={3} label="Formulas" title="Use Functions That Match the Business Question">
        <P>
          Start with a small set of formulas: <code>SUM</code>, <code>COUNT</code>, <code>COUNTA</code>, <code>AVERAGE</code>,
          <code> MIN</code>, <code>MAX</code>, and <code>IF</code>. For conditional summaries, <code>SUMIFS</code> and
          <code> COUNTIFS</code> let you state the conditions next to the measure. A percentage is a numerator divided by a
          denominator; be explicit about whether the denominator is all orders, completed orders, or eligible orders.
        </P>
        <Code file="formula_examples" lang="text" code={`
Assume an Excel Table named Orders with columns: order_id, city, status,
order_value, promised_at, delivered_at.

=COUNTA(Orders[order_id])
=SUMIFS(Orders[order_value], Orders[status], "completed")
=COUNTIFS(Orders[city], "Hyderabad", Orders[status], "completed")
=IF([@delivered_at]>[@promised_at], "Late", "On time")

Late share = late completed orders / all completed orders
`} />
        <P>
          Structured table references expand with the table and describe what a formula uses. A cell reference such as
          <code> A2</code> moves when copied; <code>$A$2</code> is absolute; <code>A$2</code> locks only the row. When copying
          a formula across a grid, test the first and last results instead of assuming the references moved as intended.
        </P>
        <Callout type="tip">
          Show counts beside rates. &quot;12% late&quot; means something different for 25 orders than for 25,000, and a visible
          denominator gives reviewers a quick sanity check.
        </Callout>
      </Part>

      <Part n={4} label="Lookups" title="Join a Reference Table Without Hiding Missing Matches">
        <P>
          A lookup attaches an attribute from one table to another using a key: for example, adding a region to a city-level
          delivery table. In modern Excel, <code>XLOOKUP</code> can search a key range and return a corresponding value. In
          Sheets, <code>XLOOKUP</code> is available in current versions; older workbooks may use <code>VLOOKUP</code> or
          <code>INDEX</code> plus <code>MATCH</code>. Confirm compatibility before sharing a workbook across versions.
        </P>
        <Code file="lookup_examples" lang="text" code={`
With city in A2, a city-to-region table in H2:I20:

=XLOOKUP(A2, $H$2:$H$20, $I$2:$I$20, "Not found")

A VLOOKUP alternative when the key is the first column of H:I:
=IFERROR(VLOOKUP(A2, $H$2:$I$20, 2, FALSE), "Not found")
`} />
        <P>
          A missing match is a quality signal, not something to replace silently with the first region in the list. Check for
          leading spaces, inconsistent capitalization, alternate spellings, and whether the lookup key is unique. If one city
          maps to multiple service zones, city alone is not a valid key; use the actual business identifier or ask for a
          better mapping table.
        </P>
        <Steps items={[
          'Check that the reference key has one row per key before looking up values.',
          'Use an explicit not-found result so gaps remain visible.',
          'Count unmatched rows and resolve them with the data owner.',
          'Keep the source and mapping table with the workbook or document their locations.',
        ]} />
      </Part>

      <Part n={5} label="Pivot tables" title="Summarise Groups Without Writing a Formula for Every Group">
        <P>
          A pivot table groups records and calculates summaries, such as completed orders by city and weekday. Add a category
          to Rows, another to Columns if comparison is useful, and a numeric measure to Values. Check whether the measure is
          being summed, counted, or averaged; spreadsheets sometimes choose an unexpected default when a numeric field
          contains blanks or text. Apply filters deliberately and refresh the pivot after the source table changes.
        </P>
        <P>
          Before interpreting a pivot, compare its grand total to the source records under the same filters. A pivot count of
          order IDs can differ from a count of rows when an order appears more than once. Distinguish records, distinct orders,
          and customers; they are not interchangeable units. Name the value field so a reader sees &quot;Average delivery
          minutes&quot; rather than an unexplained &quot;Average of duration&quot;.
        </P>
        <Table
          head={['Pivot area', 'Example field', 'Analytical use']}
          rows={[
            ['Rows', 'City', 'Compare locations'],
            ['Columns', 'Weekday', 'Look for recurring differences'],
            ['Values', 'Order ID as count; delay as average', 'Show volume and typical delay'],
            ['Filters', 'Status and month', 'Restrict to the defined population'],
          ]}
          caption="Start with one grouping dimension; add complexity only when it answers the question."
        />
        <Callout type="example">
          A low average delay in a city with very few deliveries may be unstable. Show the order count and investigate whether
          the city has complete coverage before ranking it against high-volume cities.
        </Callout>
      </Part>

      <Part n={6} label="Charts" title="Choose a Chart That Makes the Comparison Easy">
        <P>
          Use a bar chart to compare categories, a line chart for a measure over ordered time, and a histogram to inspect the
          distribution of a numeric field. A scatter plot helps inspect the relationship between two numeric variables. Keep
          units in axis labels, use a clear title that states the measure and period, and avoid 3-D effects that distort
          comparisons. Do not use a pie chart when categories are numerous or close in size.
        </P>
        <P>
          A chart communicates the filtered data, not the entire business. State the date range, inclusion rules, and whether
          values are counts, rates, or averages. For a time series, show missing periods rather than connecting across gaps
          as though measurements existed. Sort categories intentionally: alphabetical order, descending value, or a
          meaningful business sequence.
        </P>
        <Code file="chart_review_checklist" lang="text" code={`
Chart review
1. Does the chart answer the question written above it?
2. Are axes, units, dates and category names readable?
3. Is the denominator or group size available for rate comparisons?
4. Could a zero-baseline or axis range change the visual impression?
5. Are filters and missing periods disclosed?
6. Can a reader distinguish the takeaway without relying on colour alone?
`} />
        <Callout type="tip">
          Use labels and a brief written takeaway alongside colour. This improves accessibility and still works when the chart
          is printed in grayscale or viewed on a small screen.
        </Callout>
      </Part>

      <Part n={7} label="Reproducibility" title="Make the Workbook Reviewable and Know When to Move On">
        <P>
          Give tabs descriptive names such as <code>Raw export</code>, <code>Cleaned</code>, <code>Pivot</code>, and
          <code> Findings</code>. Freeze the header, turn on filters, use consistent date and currency formats, and avoid
          manually typing results that are already calculated elsewhere. Add a source note and a short explanation of each
          decision that could change the answer. Protect formula cells only when it helps prevent accidental edits; it is not
          a substitute for access controls or backups.
        </P>
        <P>
          A spreadsheet is a good fit for a modest, clearly bounded analysis reviewed by a small team. Move to SQL when data
          lives in a database, the same query must run repeatedly, or joins and transformations become hard to maintain. Use
          Python when analysis needs repeatable multi-step cleaning, larger files, tests, or automated reporting. Keep the
          spreadsheet as a presentation or review surface when that is what collaborators need.
        </P>
        <Bullets items={[
          'Keep raw inputs separate from transformations and results.',
          'Record ownership, source, refresh date, filters, and unresolved quality issues.',
          'Use one definition for every repeated metric and state the denominator.',
          'Reconcile totals after filtering, joining or pivoting.',
          'Use appropriate permissions before sharing customer or employee data.',
        ]} />
      </Part>

      <Part n={8} label="Pitfalls" title="Common Spreadsheet Analysis Mistakes">
        <Mistakes items={[
          { mistake: 'Deleting rows that look unusual without checking them', cause: 'An extreme value may be a genuine delivery or a measurement issue; removing it changes the population.', fix: 'Flag the record, inspect its source, and document a defensible inclusion rule before excluding it.' },
          { mistake: 'Using a lookup with an approximate match unintentionally', cause: 'An approximate lookup can return a plausible but incorrect category when keys are not sorted or exact matching is needed.', fix: 'Choose exact matching explicitly and count not-found results.' },
          { mistake: 'Reporting an average without its denominator or unit', cause: 'Readers cannot tell which records contributed or whether the value is minutes, hours, or currency.', fix: 'Show count, unit, period, population, and whether the statistic is a mean or median.' },
          { mistake: 'Copying a pivot result into a report without refreshing it', cause: 'The displayed summary can be stale after the source data changes.', fix: 'Refresh, reconcile totals, note the refresh date, and link or describe the source.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Analyse a Small Delivery Export">
        <Practice
          title="Build a checked spreadsheet answer for operations"
          tasks={[
            'Create a raw tab with order ID, city, order date, status, promised time, delivered time, and order value. Keep the raw tab untouched.',
            'Write a one-sentence question and define whether the population includes cancelled orders or only completed orders.',
            'Add a late/on-time formula and calculate completed order count, late count, and late share with a visible denominator.',
            'Use a lookup to attach region to city. Make missing mappings visible and report how many remain unmatched.',
            'Create a pivot by city with order count and average delay; compare the pivot grand total with a formula-based check.',
            'Build a chart and write two findings plus one limitation, including the period and any small group sizes.',
          ]}
          hint="Use a tiny invented dataset first so you can manually verify a few formulas and pivot totals. Keep the raw data and analysis in separate tabs."
        />
      </Part>

      <KeyTakeaways items={[
        'A reliable spreadsheet analysis begins with a defined question, row grain, population, period, and unit.',
        'Keep raw data untouched, make cleaning decisions visible, and check duplicates, missing values, types, and totals.',
        'Use SUMIFS and COUNTIFS for conditional questions; show numerators and denominators for rates.',
        'Lookups depend on valid, unique keys; preserve unmatched results so data quality problems are visible.',
        'Pivot tables summarise groups quickly, but verify the aggregation, filters, distinctness, and grand total.',
        'Choose charts to match the question and disclose units, period, population, and missing data.',
        'Move repeated or complex transformations to SQL or Python while keeping a spreadsheet for review when useful.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/analytics-engineering-data-analytics/sql-for-analytics"
        label="Lesson 02 · SQL for Analytics — The Queries Analysts Write Daily"
        text="Spreadsheets are useful for a bounded dataset. Next, query data where it lives and build repeatable summaries with SQL."
      />
    </LearnLayout>
  )
}
