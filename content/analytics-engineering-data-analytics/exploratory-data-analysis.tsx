import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function ExploratoryDataAnalysis() {
  return (
    <LearnLayout
      title="Exploratory Data Analysis — A Repeatable Workflow"
      description="A step-by-step EDA checklist: data quality, distributions, segments, relationships and anomalies, ending in written findings."
      section="Data Analytics & Statistics — Lesson 04"
      readTime="40 min"
    >
      <Part n={1} label="What EDA is for" title="Explore to Learn What the Data Can Support">
        <P>
          Exploratory data analysis (EDA) is the disciplined process of understanding a dataset before drawing conclusions
          or building a model. It helps you discover what was measured, find data-quality issues, see distributions, compare
          relevant groups, and generate questions for further investigation. It does not by itself prove a cause or establish
          that a pattern will persist.
        </P>
        <P>
          Imagine that an operations team reports an increase in delivery time. The first step is not to pick a chart; define
          the target population, date window, unit of observation, time field, and delivery-time definition. Then preserve the
          input, check its structure, and explore in an order that avoids treating every interesting pattern as a discovery.
          Write down decisions as you go so the analysis can be repeated after the next data refresh.
        </P>
        <Table
          head={['EDA stage', 'Question', 'Output']}
          rows={[
            ['Scope', 'What do these rows represent?', 'Population, grain, period and definitions'],
            ['Quality', 'Can the fields be trusted?', 'Missingness, duplicates, ranges and types'],
            ['Shape', 'How are values distributed?', 'Counts, quantiles and visual summaries'],
            ['Segments', 'Where do patterns differ?', 'Comparable subgroup summaries'],
            ['Findings', 'What is supported and what remains unknown?', 'Evidence, limitation and next check'],
          ]}
          caption="An ordered workflow makes exploration more useful than a gallery of charts."
        />
        <Callout type="info">
          EDA generates hypotheses and checks data. Use a separate confirmatory design or additional evidence before treating
          an observed association as an explanation.
        </Callout>
      </Part>

      <Part n={2} label="Scope and schema" title="Confirm the Grain, Fields and Time Window">
        <P>
          Write a data inventory before summarising. Identify the source, extract date, intended population, row grain,
          primary key, time zone, units, categorical fields, numeric measures, and any known exclusions. Check that the row
          count is plausible and that expected columns are present. An order table can have one row per order, while a
          delivery event table may have many events per order; merging them without a plan changes the grain.
        </P>
        <Code file="eda_inventory.py" code={`
import pandas as pd

orders = pd.read_csv("data/orders.csv")
print("shape:", orders.shape)
print("columns:", list(orders.columns))
print("types:\n", orders.dtypes)
print("sample:\n", orders.head(5))
print("unique order IDs:", orders["order_id"].nunique())
`} />
        <P>
          Compare the unique key count with row count and investigate any difference. A duplicate may be a valid multiple
          event or an accidental repeated record; do not deduplicate until the intended grain is known. Similarly, inspect
          date parsing and reporting timezone before deciding what belongs to a day or week.
        </P>
        <Callout type="warning">
          If the data dictionary or owner cannot tell you what a field means, mark its interpretation as unknown. Do not infer
          a definition from a column name alone.
        </Callout>
      </Part>

      <Part n={3} label="Quality checks" title="Measure Missingness, Duplicates and Implausible Values">
        <P>
          Count missing values, duplicate keys, invalid categories, and values outside known operational bounds. Look for
          impossible timestamps such as a delivery before order placement, but verify whether time zones or asynchronous
          ingestion explain the apparent anomaly. A suspicious value deserves investigation, not automatic deletion. Track
          both the number and share of affected records, and determine whether issues cluster in one source, region, or period.
        </P>
        <Code file="eda_quality.py" code={`
required = ["order_id", "city", "status", "order_date", "delivery_minutes"]
print("missing by column:\n", orders[required].isna().sum())
print("duplicate IDs:", orders["order_id"].duplicated().sum())
print("statuses:\n", orders["status"].value_counts(dropna=False))

impossible = orders["delivery_minutes"].lt(0)
print("negative delivery times:", int(impossible.sum()))
print("missing city share:", round(orders["city"].isna().mean(), 3))
`} />
        <P>
          Validate metric-specific completeness. If delivery duration is missing only for cancelled orders, the missingness
          may be expected; if it is absent for a particular city after a date, an upstream pipeline may have failed. Compare
          raw and cleaned record counts and retain an exclusion log. A clean-looking aggregate does not guarantee that the
          included observations are representative.
        </P>
        <Steps items={[
          'Check required fields and their actual types.',
          'Quantify missing values and duplicate keys by time and important segment.',
          'Inspect impossible and extreme values against domain rules and source records.',
          'Record a disposition: keep, correct, exclude, or investigate further.',
        ]} />
      </Part>

      <Part n={4} label="Distributions" title="Inspect One Variable Before Comparing Groups">
        <P>
          For a numeric measure, review count, minimum, maximum, median, quartiles, and spread. A histogram shows how values
          are distributed across bins; a box plot gives a compact view of centre and spread but can hide multiple clusters.
          For categories, use counts and shares and include missing or unknown values. Choose bins and scales consciously:
          their settings affect what a chart appears to show.
        </P>
        <Code file="eda_distributions.py" code={`
measure = orders["delivery_minutes"].dropna()
print(measure.describe(percentiles=[0.1, 0.25, 0.5, 0.75, 0.9]))
print("status share:\n", orders["status"].value_counts(normalize=True, dropna=False))

ax = measure.plot.hist(bins=20, edgecolor="white", figsize=(8, 4))
ax.set(title="Delivery-time distribution", xlabel="Minutes", ylabel="Orders")
`} />
        <P>
          A long right tail is common for wait times, spend, and support resolution; it can make the mean much higher than the
          median. Multiple peaks may indicate different operating contexts or data sources. Do not label every tail point an
          outlier: it may represent the most important failures to understand. Report the sample count and use units in both
          text and charts.
        </P>
        <Callout type="tip">
          Inspect a histogram and summary statistics together. A single mean cannot tell you whether the data are symmetric,
          clustered, bounded, or dominated by a few extreme observations.
        </Callout>
      </Part>

      <Part n={5} label="Segments" title="Compare Like with Like">
        <P>
          Segment by a business-relevant dimension such as city, service type, weekday, or new versus returning customer.
          Show group size next to the measure: a small group can have a volatile average. Compare equivalent time windows
          and definitions, and be alert to composition changes. If one city serves a different mix of orders or has different
          operating hours, an unadjusted comparison may combine several effects.
        </P>
        <Code file="eda_segments.py" code={`
completed = orders.loc[orders["status"].eq("completed")].copy()
segment_summary = (
    completed.groupby("city", dropna=False)
    .agg(
        orders=("order_id", "nunique"),
        median_minutes=("delivery_minutes", "median"),
        p90_minutes=("delivery_minutes", lambda values: values.quantile(0.90)),
    )
    .sort_values("orders", ascending=False)
)
print(segment_summary)
`} />
        <P>
          A grouped table can reveal questions worth investigating, but it does not automatically explain why a group differs.
          Inspect data coverage and denominators, and compare within similar periods or operating conditions where possible.
          Predefine a manageable set of meaningful segments rather than slicing repeatedly until one group looks unusual.
        </P>
        <Table
          head={['Comparison', 'Useful view', 'Important check']}
          rows={[
            ['Delay by city', 'Median and p90 with order count', 'Operating mix and volume'],
            ['Orders by weekday', 'Daily counts over comparable weeks', 'Different number of days in the window'],
            ['Cancellation by channel', 'Rate and eligible-order denominator', 'Channel coverage and status definition'],
            ['Basket value by customer type', 'Median and distribution', 'New/returning definition and time window'],
          ]}
          caption="Use a measure and denominator that fit the segment question."
        />
      </Part>

      <Part n={6} label="Relationships and anomalies" title="Explore Associations Without Claiming Causes">
        <P>
          A scatter plot can show whether two numeric variables move together, while a correlation coefficient summarizes a
          particular kind of linear association. Neither establishes that one variable caused the other. A third variable,
          selection effect, reverse direction, measurement error, or nonlinear relationship can shape the pattern. Examine
          units, missingness, outliers, and the scatter plot before interpreting a single coefficient.
        </P>
        <Code file="eda_relationship.py" code={`
paired = orders[["delivery_minutes", "distance_km"]].dropna()
print("paired observations:", len(paired))
print("Pearson correlation:", paired.corr(method="pearson").iloc[0, 1])

ax = paired.plot.scatter(
    x="distance_km", y="delivery_minutes", alpha=0.35, figsize=(7, 4)
)
ax.set(title="Distance and delivery time", xlabel="Distance (km)", ylabel="Minutes")
`} />
        <P>
          An anomaly is a record or pattern that differs from expectations; it is not automatically a bad record. Check the
          original source and nearby events, then decide whether it points to data quality, a rare but valid event, or a new
          operational process. Keep a note of the investigation outcome so the same record is not rediscovered and removed
          without context every month.
        </P>
        <Callout type="example">
          A sudden rise in reported cancellations may be a product change, a source-system status mapping change, or a real
          operational issue. Compare event definitions and ingestion changes before presenting it as customer behaviour.
        </Callout>
      </Part>

      <Part n={7} label="Write findings" title="Separate Evidence, Interpretation and Next Checks">
        <P>
          A clear finding states the observation, the population and period, the comparison, the evidence, and a limitation.
          For example: &quot;Among completed deliveries recorded in the four-week window, the p90 delivery time rose in two
          high-volume cities; order mix and reporting coverage have not yet been checked.&quot; That sentence reports a pattern
          and a next step without claiming a cause.
        </P>
        <P>
          Keep an analysis log with the source, query or notebook version, filters, cleaning decisions, and chart definitions.
          Share concise tables and charts with context, not a pile of exploratory outputs. If the team needs a causal answer,
          propose a follow-up that could distinguish competing explanations, such as validating a system change, comparing
          an appropriate control group, or designing an experiment.
        </P>
        <Bullets items={[
          'What was observed, in which population and period?',
          'How large is the difference, and what is the denominator?',
          'What quality or composition issue could change the interpretation?',
          'Which conclusion is supported, and what remains a hypothesis?',
          'What follow-up would reduce the most important uncertainty?',
        ]} />
      </Part>

      <Part n={8} label="Pitfalls" title="Common EDA Mistakes">
        <Mistakes items={[
          { mistake: 'Treating an unusual observation as an error by default', cause: 'Extreme values may represent genuine rare failures or customer behaviour.', fix: 'Check provenance and domain rules, document the decision, and compare results with and without the record when appropriate.' },
          { mistake: 'Comparing groups with different denominators or time windows', cause: 'Volume, exposure, calendar coverage, or eligibility differ across groups.', fix: 'Align definitions and periods, report group sizes, and choose a denominator matching the question.' },
          { mistake: 'Searching through many segments until one looks significant', cause: 'Repeated slicing increases the chance of a chance pattern.', fix: 'Use meaningful pre-specified comparisons and confirm surprising results with new data or a designed analysis.' },
          { mistake: 'Writing that a correlation explains an outcome', cause: 'Association alone cannot distinguish confounding, reverse direction, or coincidence.', fix: 'Describe the relationship as an association and list plausible alternative explanations and next tests.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Run an EDA Review for Delivery Operations">
        <Practice
          title="Produce a short, defensible EDA memo"
          tasks={[
            'Write down the row grain, population, reporting window, primary key, time zone, and definitions for status and delivery duration.',
            'Report missingness, duplicate keys, category counts, and impossible values; investigate one issue in its source context.',
            'Summarise the overall distribution with count, median, upper percentile, and a histogram with labelled units.',
            'Compare delivery-time summaries by city with order counts and flag low-volume groups.',
            'Inspect a relationship between distance and delivery time, report paired sample count, and avoid causal language.',
            'Write two findings, one limitation, and one follow-up that would test a plausible explanation.',
          ]}
          hint="Use the pandas workflow from the previous lesson. A small synthetic or approved public dataset is enough to practise the checklist."
        />
      </Part>

      <KeyTakeaways items={[
        'EDA is a structured way to understand scope, quality, distributions, segments, and relationships before drawing conclusions.',
        'Confirm row grain, field definitions, units, timezone, population, and period before summarising.',
        'Quantify missingness, duplicates, invalid categories, and extreme values; investigate rather than automatically deleting.',
        'Inspect distributions and denominators alongside averages and rates.',
        'Compare meaningful groups with aligned definitions, periods, and coverage.',
        'Association and anomalies generate questions; they do not prove causes.',
        'Write findings with evidence, population, period, limitations, and a clear next check.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/analytics-engineering-data-analytics/descriptive-statistics"
        label="Lesson 05 · Descriptive Statistics and Distributions"
        text="EDA reveals the shapes and questions in a dataset. Next, learn the statistical summaries that describe those distributions accurately."
      />
    </LearnLayout>
  )
}
