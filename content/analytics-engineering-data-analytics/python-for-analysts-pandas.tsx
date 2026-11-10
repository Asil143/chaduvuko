import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function PythonForAnalystsPandas() {
  return (
    <LearnLayout
      title="Python for Analysts — The pandas Analysis Workflow"
      description="Load, clean, reshape, group and visualise data with pandas in a notebook, and turn the result into a shareable report."
      section="Data Analytics & Statistics — Lesson 03"
      readTime="45 min"
    >
      <Part n={1} label="Why pandas?" title="Make an Analysis Repeatable, Not Just Interactive">
        <P>
          A spreadsheet can be a great review surface, but analysis often turns into repeated cleaning, several joins, and
          monthly exports. Python and pandas let you describe those steps in code, rerun them on the next file, and review
          exactly how each output was produced. A notebook combines code, intermediate tables, charts, and written
          interpretation; it should still read like a sequence of deliberate analytical decisions.
        </P>
        <P>
          This lesson assumes you can read basic Python expressions and understand rows, columns, and simple functions. Start
          with a copy of a small, non-sensitive CSV. Do not put personal customer data into a notebook shared outside the
          approved environment. Record the source, period, timezone, units, and row grain before exploring the values.
        </P>
        <Table
          head={['Workflow step', 'Typical pandas operation', 'Question to answer']}
          rows={[
            ['Load', 'read_csv / read_excel', 'Did the file parse with the intended types?'],
            ['Inspect', 'head / info / describe', 'What rows and columns are present?'],
            ['Clean', 'isna / duplicated / to_datetime', 'Which issues can be resolved defensibly?'],
            ['Analyse', 'groupby / merge / pivot_table', 'What comparison answers the question?'],
            ['Share', 'to_csv / notebook narrative', 'Can someone reproduce and interpret it?'],
          ]}
          caption="Keep the workflow ordered, explicit, and easy to rerun."
        />
        <Callout type="info">
          A notebook is not automatically reproducible. It becomes reproducible when inputs, transformations, execution order,
          assumptions, and outputs are made clear enough for another analyst to follow.
        </Callout>
      </Part>

      <Part n={2} label="Setup and loading" title="Read Inputs Explicitly and Inspect Their Shape">
        <P>
          Use a virtual environment for project dependencies and keep package versions in the project's chosen dependency
          file. Install pandas and a notebook interface as needed. A CSV import may infer a type incorrectly, particularly
          for IDs with leading zeros or dates in mixed formats. Inspect data types after loading; supply explicit parsing
          options only after you know the source format.
        </P>
        <Code file="load_orders.py" code={`
from pathlib import Path
import pandas as pd

source = Path("data/orders.csv")
orders = pd.read_csv(source)

print("rows, columns:", orders.shape)
print(orders.head())
print(orders.dtypes)
print(orders.isna().sum().sort_values(ascending=False).head())
`} />
        <P>
          If an identifier such as a postal code or account code looks numeric but is not used in arithmetic, keep it as text.
          Parse dates with an explicit format when the input is consistent; ambiguous strings such as <code>03/04/2026</code>
          can mean different dates in different locales. Preserve a raw copy before normalizing fields. For large files, read
          only needed columns or use database-side filtering rather than loading everything into memory.
        </P>
        <Callout type="warning">
          Never assume that a successful <code>read_csv</code> call means the data is correct. A parser can produce a DataFrame
          even when delimiters, encodings, decimal separators, or date interpretations are wrong.
        </Callout>
      </Part>

      <Part n={3} label="Inspect and clean" title="Profile Before You Change Values">
        <P>
          Use <code>shape</code>, <code>info</code>, <code>nunique</code>, value counts, and summary statistics to learn what
          the export contains. Check duplicate keys against the table's grain. Missingness should be described by column and
          sometimes by group; it may be meaningful, such as a delivery time missing for a cancelled order. Do not fill every
          blank with zero, because zero is a value and missing means unknown or not applicable.
        </P>
        <Code file="quality_checks.py" code={`
required = {"order_id", "city", "status", "order_date", "order_value"}
missing_columns = required - set(orders.columns)
if missing_columns:
    raise ValueError(f"Missing required columns: {sorted(missing_columns)}")

print("duplicate order IDs:", orders["order_id"].duplicated().sum())
print(orders["status"].value_counts(dropna=False))
print(orders["city"].value_counts(dropna=False).head(10))
print(orders["order_value"].describe())
`} />
        <P>
          Clean only after identifying a rule. Trimming whitespace may be safe for a category; replacing distinct spelling
          variants may require a maintained mapping; deduplicating by order ID requires knowing which record is authoritative.
          Keep a before-and-after count and use an explicit rule so the transformation can be reviewed and repeated.
        </P>
        <Steps items={[
          'State the expected row grain and identify the key columns.',
          'Profile missing values, duplicates, types, categories, and plausible ranges.',
          'Confirm each proposed repair with the data definition or owner.',
          'Apply one transformation at a time and compare row counts and distributions.',
        ]} />
      </Part>

      <Part n={4} label="Transform" title="Create Columns Without Losing the Original Meaning">
        <P>
          Prefer vectorised Series operations to row-by-row loops. A derived field should have a clear business definition and
          unit. Convert the date column deliberately, parse errors visibly, and avoid using a derived field to conceal invalid
          source data. The example below keeps invalid dates as missing so they can be counted and investigated rather than
          quietly discarded.
        </P>
        <Code file="transform_orders.py" code={`
orders = orders.copy()
orders["order_date"] = pd.to_datetime(orders["order_date"], errors="coerce")
orders["order_value"] = pd.to_numeric(orders["order_value"], errors="coerce")

invalid_dates = orders["order_date"].isna().sum()
invalid_values = orders["order_value"].isna().sum()
print("unparsed dates:", invalid_dates)
print("unparsed order values:", invalid_values)

orders["is_completed"] = orders["status"].eq("completed")
orders["order_month"] = orders["order_date"].dt.to_period("M")
`} />
        <P>
          <code>errors=&quot;coerce&quot;</code> is useful for profiling, not an instruction to ignore bad rows. Before any
          analysis, decide whether invalid values are excluded, repaired, or escalated, and report how many records are
          affected. Keep raw text in a separate column if you need to compare a parsed value with its input.
        </P>
        <Callout type="tip">
          Use <code>assign</code> or create a clearly named column for a transformation, and keep the original field when the
          source value may need auditing.
        </Callout>
      </Part>

      <Part n={5} label="Summarise and join" title="Group at the Intended Grain">
        <P>
          <code>groupby</code> divides observations into groups; <code>agg</code> calculates summaries for each group. Name
          the output columns because those names become part of a reporting interface. Check group sizes and confirm that the
          result has the intended number of rows. A merge has the same grain risks as a database join: if a supposedly unique
          reference key appears more than once, rows can multiply.
        </P>
        <Code file="city_summary.py" code={`
completed = orders.loc[orders["is_completed"]].copy()
city_summary = (
    completed.groupby("city", dropna=False)
    .agg(
        completed_orders=("order_id", "nunique"),
        average_order_value=("order_value", "mean"),
        total_order_value=("order_value", "sum"),
    )
    .reset_index()
    .sort_values("total_order_value", ascending=False)
)
print(city_summary.head())
`} />
        <P>
          pandas uses null-handling choices that can affect groups and joins. Decide whether missing city is a meaningful
          group, whether null keys should match, and whether each input contains unique keys before merging. Validate joins
          with <code>validate</code> when you know the relationship, and inspect the merge indicator to quantify unmatched
          rows instead of dropping them invisibly.
        </P>
        <Code file="merge_reference.py" code={`
city_map = pd.DataFrame({
    "city": ["Hyderabad", "Pune", "Chennai"],
    "region": ["South", "West", "South"],
})
if city_map["city"].duplicated().any():
    raise ValueError("City mapping must have one row per city")

joined = completed.merge(
    city_map, on="city", how="left", validate="many_to_one", indicator=True
)
print(joined["_merge"].value_counts())
`} />
        <Callout type="example">
          If a city has no mapping, a left join preserves its orders and makes the missing region measurable. An inner join
          would drop those orders and can bias every regional total.
        </Callout>
      </Part>

      <Part n={6} label="Reshape and visualise" title="Make Comparisons That Match the Question">
        <P>
          Use <code>pivot_table</code> to create a two-dimensional summary and choose the aggregation explicitly. For a trend,
          aggregate at the reporting period first, then plot the resulting series. Include axis labels and units and avoid
          charting a raw, unsorted category field as if it were time. Choose a chart based on the comparison, not because a
          library made it easy to draw.
        </P>
        <Code file="monthly_trend.py" code={`
import matplotlib.pyplot as plt

monthly = (
    completed.dropna(subset=["order_date"])
    .set_index("order_date")
    .resample("MS")
    .agg(orders=("order_id", "nunique"), value=("order_value", "sum"))
)
ax = monthly["orders"].plot(marker="o", figsize=(8, 4))
ax.set(title="Completed orders by month", xlabel="Month", ylabel="Unique orders")
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
`} />
        <P>
          Resampling timestamps groups by calendar boundaries, but a business reporting calendar may use a different
          timezone or week start. Document the convention and compare totals before and after resampling. For category
          comparisons, sort bars intentionally and include group counts where small groups could be overinterpreted.
        </P>
        <Table
          head={['Need', 'Useful pandas tool', 'Validation']}
          rows={[
            ['One summary per group', 'groupby().agg()', 'Check group sizes and total counts'],
            ['Rows and columns by category', 'pivot_table()', 'Choose and name the aggregation'],
            ['Attach reference fields', 'merge()', 'Validate key cardinality and unmatched rows'],
            ['Time-based summary', 'set_index().resample()', 'Confirm frequency, timezone and missing periods'],
          ]}
          caption="Choose the operation based on the output shape you need."
        />
      </Part>

      <Part n={7} label="Share and production" title="Package the Notebook as a Small, Reviewable Report">
        <P>
          A useful notebook has a short opening statement of the question and data source, then runs top to bottom from a
          fresh kernel. Put imports and configuration near the top, name intermediate results meaningfully, and separate
          exploration from final outputs. Restart and run all cells before sharing; hidden state from an old execution can
          make a notebook appear correct when its displayed code does not reproduce the result.
        </P>
        <P>
          Export a final summary only after validating it. Keep intermediate values with enough detail to investigate
          surprising results, but avoid sharing raw personal information unnecessarily. For a recurring job, move core
          transformations into tested Python functions or a scheduled pipeline instead of asking someone to click notebook
          cells manually.
        </P>
        <Code file="export_summary.py" code={`
from pathlib import Path

output_dir = Path("outputs")
output_dir.mkdir(parents=True, exist_ok=True)
city_summary.to_csv(output_dir / "city_summary.csv", index=False)

print("rows exported:", len(city_summary))
print("source rows:", len(orders))
`} />
        <Bullets items={[
          'Record input filename, extract date, filters, and transformation rules.',
          'Run the notebook from a clean kernel and remove unused exploratory cells.',
          'Compare source and output counts and inspect a few records manually.',
          'Use stable relative paths and avoid embedding credentials in notebooks.',
          'Protect output files and notebooks according to data access policy.',
        ]} />
      </Part>

      <Part n={8} label="Pitfalls" title="Common pandas Analysis Mistakes">
        <Mistakes items={[
          { mistake: 'Using a numeric type for an identifier', cause: 'A parser can remove leading zeros or make an ID look like a measurement.', fix: 'Set identifier columns to text and preserve their exact source representation.' },
          { mistake: 'Filling every missing value with zero', cause: 'Missing can mean unknown or not applicable, which is not the same as a measured zero.', fix: 'Profile missingness by field and group, then apply a documented domain-specific rule.' },
          { mistake: 'Merging without checking key uniqueness', cause: 'Duplicate keys on the reference side can multiply facts and inflate totals.', fix: 'Check duplicates and use merge validation; report unmatched keys.' },
          { mistake: 'Sharing a notebook that only works in its old cell order', cause: 'Notebook state can preserve variables that are no longer created by visible code.', fix: 'Restart the kernel, run all cells, and verify outputs from a clean execution.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Create a Reproducible Monthly Analysis">
        <Practice
          title="Build and explain a small pandas report"
          tasks={[
            'Load a small delivery CSV and state what one row represents, what period it covers, and what counts as a completed order.',
            'Inspect types, missing values, category values, duplicate keys, and plausible order-value ranges before cleaning.',
            'Parse dates and numeric values; count invalid records and choose a documented handling rule.',
            'Calculate order count, average basket value, and late-delivery rate by city with visible denominators.',
            'Join a city-to-region mapping with cardinality validation and report unmatched cities.',
            'Create a monthly trend, export a summary, restart the notebook, and write two findings with one limitation.',
          ]}
          hint="Begin with a small synthetic dataset or an approved public sample. Validate one or two groups manually before interpreting the whole report."
        />
      </Part>

      <KeyTakeaways items={[
        'A pandas workflow is strongest when its source, row grain, types, and analytical question are explicit.',
        'Profile data quality before transforming it; missing, invalid, duplicate, and unusual are different conditions.',
        'Use vectorised transformations and meaningful names so each step is reviewable and repeatable.',
        'Group and merge only after defining the output grain and checking key relationships.',
        'Choose aggregation, time frequency, and chart style to match the business question and reporting calendar.',
        'Run notebooks from a clean kernel, validate counts and totals, and keep sensitive data appropriately protected.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/analytics-engineering-data-analytics/exploratory-data-analysis"
        label="Lesson 04 · Exploratory Data Analysis — A Repeatable Workflow"
        text="You can now prepare and summarise data with pandas. Next, follow a disciplined EDA checklist to find patterns and data problems without overclaiming."
      />
    </LearnLayout>
  )
}
