import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Table } from '@/components/content/LessonKit'

export default function DescriptiveStatistics() {
  return (
    <LearnLayout
      title="Descriptive Statistics and Distributions"
      description="Mean, median, percentiles, spread, skew, and outliers; reading histograms and box plots; and choosing the right summary."
      section="Data Analytics & Statistics — Lesson 01"
      readTime="35 min"
    >
      <Part n={1} label="Why summarise?" title="A Single Number Can Hide a Whole Dataset">
        <P>
          Imagine an Indian delivery company reporting that an order takes 32 minutes on average. Is that a typical order, or
          are most deliveries quick while a few take hours? A summary is useful only when it represents the shape and context
          of the data. Descriptive statistics compress observations into interpretable measures; they do not prove causes,
          explain every customer, or predict what happens next.
        </P>
        <P>
          Start by asking what one row means, what was measured, in which unit, and over what period. Check missing values,
          duplicates, impossible values, and the population represented before calculating anything. A duration in seconds
          mixed with minutes can make every later conclusion meaningless. Keep counts next to summaries so a reader can judge
          how much evidence each number represents.
        </P>
        <Table
          head={['Question', 'Useful summary', 'Caution']}
          rows={[
            ['Where is the centre?', 'Mean, median, or mode', 'The mean moves with extreme values'],
            ['How spread out is it?', 'Range, IQR, variance, standard deviation', 'Spread depends on units and outliers'],
            ['What value is exceeded by most?', 'Percentiles such as p50 or p90', 'State the population and time window'],
            ['What shape does it have?', 'Histogram, density curve, box plot', 'Bin choices can alter the visual story'],
          ]}
          caption="Choose the summary to answer the question, not because it is familiar."
        />
        <Callout type="info">
          A statistic describes the records you analysed. If those records are a biased slice of customers, a precise-looking
          statistic still describes the wrong group.
        </Callout>
      </Part>

      <Part n={2} label="Centre" title="Mean, Median and Mode Answer Different Questions">
        <P>
          The <strong>mean</strong> is the total divided by the number of observations. It uses every value, which makes it
          informative for balanced data, but also sensitive to unusual values. The <strong>median</strong> is the middle after
          sorting; half the observed values are at or below it and half are at or above. It is often a better description of a
          skewed income, basket value, or delivery time. The <strong>mode</strong> is the most common value and is useful for
          discrete categories or repeated measurements. A dataset can have multiple modes or none that is meaningful.
        </P>
        <P>
          Consider order values ₹199, ₹249, ₹299, ₹349, and ₹4,999. The mean is pulled upward by the unusually large basket,
          while the median remains close to a normal order. Neither is inherently correct: finance may need average revenue
          per order, while a product team asking what a typical customer spends may prefer the median. Report both when the
          choice matters and explain which question each answers.
        </P>
        <Code file="centre.py" code={`
import pandas as pd

orders = pd.Series([199, 249, 299, 349, 4999], name="basket_rupees")
summary = {
    "count": int(orders.count()),
    "mean": float(orders.mean()),
    "median": float(orders.median()),
    "mode": orders.mode().tolist(),
}
print(summary)
`} />
        <Callout type="example">
          If a value is a category such as payment method, calculating its numeric mean makes no sense. Show a frequency table
          and percentages instead: UPI, card, cash on delivery, and other.
        </Callout>
      </Part>

      <Part n={3} label="Spread" title="Variance and Standard Deviation Describe Variation">
        <P>
          Two groups can have the same mean and different consistency. Variance averages squared distances from the mean;
          standard deviation is its square root, so it returns to the original unit. Squaring gives large deviations more
          influence, which is why both measures react strongly to outliers. The range is the maximum minus the minimum and is
          easy to interpret but depends on only two observations.
        </P>
        <P>
          A population variance divides by the population size. A sample variance usually divides by one less than the sample
          size, correcting the tendency of the sample's squared deviations to underestimate population variance. In pandas,
          <code> Series.var()</code> and <code>Series.std()</code> use sample statistics by default (<code>ddof=1</code>);
          NumPy's defaults use <code>ddof=0</code>. Make the convention explicit when comparing outputs.
        </P>
        <Code file="spread.py" code={`
import numpy as np
import pandas as pd

delivery_minutes = pd.Series([24, 27, 29, 31, 33, 36, 82], name="minutes")
print("range:", delivery_minutes.max() - delivery_minutes.min())
print("sample variance:", delivery_minutes.var(ddof=1))
print("sample standard deviation:", delivery_minutes.std(ddof=1))
print("population standard deviation:", np.std(delivery_minutes, ddof=0))
`} />
        <P>
          Standard deviation is most straightforward to interpret for roughly symmetric distributions without huge outliers.
          For skewed data, pair the median with the interquartile range (IQR), the distance between the 75th and 25th
          percentiles. IQR describes the middle half and is less affected by extreme tails.
        </P>
      </Part>

      <Part n={4} label="Percentiles" title="Use Percentiles to Describe the Tail">
        <P>
          A percentile is a position in an ordered distribution. The 90th percentile of delivery time is a threshold at or
          below which about 90% of observations fall; roughly 10% take longer. This is more helpful for a service-level
          discussion than an average alone. Quantile interpolation methods can differ for small datasets, so avoid treating a
          decimal-place result as exact. For operational dashboards, define the method and keep it consistent.
        </P>
        <Code file="percentiles.py" code={`
import pandas as pd

minutes = pd.Series([18, 19, 20, 21, 22, 23, 24, 28, 37, 91])
for q in (0.50, 0.75, 0.90, 0.95):
    print(f"p{int(q * 100)}: {minutes.quantile(q):.1f} minutes")
`} />
        <P>
          The p50 is the median. A rising p90 with a stable median signals that the typical experience has not changed much
          but the slowest segment may be getting worse. Always include a denominator and period: “p90 of completed orders
          last week” is more interpretable than “p90 = 42”.
        </P>
        <Callout type="tip">
          For customer support response times, inspect p50 and p90 together. Improving the mean by serving easy requests
          faster can still leave the hardest-to-serve customers waiting.
        </Callout>
      </Part>

      <Part n={5} label="Shape" title="Distributions Reveal Skew, Clusters and Gaps">
        <P>
          A distribution shows how often values occur across a range. A symmetric bell-shaped pattern has similar tails on
          both sides of its centre. A right-skewed pattern has a long high-value tail, common for spend, session length, and
          delivery delay. Multiple peaks can indicate distinct customer or operational groups. A gap may reflect a business
          rule, a measurement limit, or a data-quality issue rather than a real phenomenon.
        </P>
        <P>
          Use a histogram for one numeric variable and inspect more than one bin width; too few bins conceal structure while
          too many make noise look like clusters. A box plot communicates median, quartiles, and possible extreme points in
          compact space, especially across categories. A violin or density plot can reveal shape, but smoothing choices can
          make small samples look more certain than they are.
        </P>
        <Code file="distribution_plot.py" code={`
import matplotlib.pyplot as plt
import pandas as pd

minutes = pd.Series([18, 19, 20, 21, 22, 23, 24, 28, 37, 91])
fig, axes = plt.subplots(1, 2, figsize=(10, 4))
axes[0].hist(minutes, bins=6, edgecolor="white")
axes[0].set(title="Delivery time distribution", xlabel="Minutes", ylabel="Orders")
axes[1].boxplot(minutes, vert=False)
axes[1].set(title="Median and spread", xlabel="Minutes")
fig.tight_layout()
plt.show()
`} />
        <P>
          In a report, label units and the time window, and state whether the chart is based on all orders or a sample. A
          distribution plot is a diagnostic: look for impossible negative durations, suspicious spikes at round values, and
          unusually heavy tails before deciding what those shapes mean.
        </P>
      </Part>

      <Part n={6} label="Outliers" title="Investigate Extreme Values Before Removing Them">
        <P>
          An outlier is unusually far from the rest under a chosen rule, not automatically a bad record. The IQR rule often
          flags values below <code>Q1 − 1.5 × IQR</code> or above <code>Q3 + 1.5 × IQR</code>. It is a screening convention,
          not a universal definition of invalid data. An extreme ₹20,000 basket may be a genuine bulk order; a negative
          delivery duration may be a broken timestamp calculation.
        </P>
        <Code file="inspect_outliers.py" code={`
import pandas as pd

orders = pd.DataFrame({"order_id": [101, 102, 103, 104, 105],
                       "basket_rupees": [199, 249, 299, 349, 4999]})
q1 = orders["basket_rupees"].quantile(0.25)
q3 = orders["basket_rupees"].quantile(0.75)
iqr = q3 - q1
low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr
flagged = orders.loc[~orders["basket_rupees"].between(low, high)]
print("review these rows; do not delete automatically")
print(flagged)
`} />
        <P>
          Keep the raw value, document any correction or exclusion, and compare summaries with and without the flagged rows.
          If you winsorise or cap values for a specific model or chart, explain the threshold and preserve the original data.
          Silent removal can erase precisely the rare events that operations needs to understand.
        </P>
      </Part>

      <Part n={7} label="Analysis workflow" title="Build a Reusable Summary with pandas">
        <P>
          A useful first pass combines counts, central tendency, spread, and percentiles, then splits by a business-relevant
          dimension. Do not segment into dozens of tiny groups without checking group sizes: an extreme percentile from a
          handful of orders is unstable. Compare like with like, such as a weekday with the same weekday or a delivery zone
          with comparable coverage.
        </P>
        <Code file="grouped_summary.py" code={`
import pandas as pd

orders = pd.DataFrame({
    "zone": ["Central", "Central", "Coastal", "Coastal", "Central", "Coastal"],
    "delivery_minutes": [26, 34, 31, 42, 78, 35],
})
summary = orders.groupby("zone")["delivery_minutes"].agg(
    orders="count", mean="mean", median="median", std="std",
)
summary["p90"] = orders.groupby("zone")["delivery_minutes"].quantile(0.90)
print(summary.round(1))
`} />
        <P>
          Before sharing the result, inspect missingness and the underlying rows in any surprising segment. The table is a
          starting point for questions, not a verdict that one zone or team is “bad”. Demand mix, distance, weather, and
          measurement coverage may differ. Add context and explore plausible explanations with the people who operate the
          process.
        </P>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Summary Statistics Mistakes">
        <Mistakes items={[
          { mistake: 'Using the mean as the only definition of typical', cause: 'A few high spends or long delays can pull it away from most observations.', fix: 'Pair it with the median and relevant percentiles; explain which audience question each answers.' },
          { mistake: 'Calling every flagged value an error', cause: 'A statistical rule identifies unusualness, not whether a record is wrong.', fix: 'Trace extreme records to source events and preserve valid rare cases.' },
          { mistake: 'Reporting a statistic without its unit or window', cause: '“Median 28” cannot be interpreted or compared reliably.', fix: 'Name the measure, population, unit, date range, and denominator.' },
          { mistake: 'Comparing variance across unlike units', cause: 'Variance is in squared units and scale-dependent.', fix: 'Use standard deviation for original units or an appropriate scale-free comparison.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Explore Delivery Times and Basket Values">
        <Practice
          title="A defensible first-look analysis"
          tasks={[
            'Create a DataFrame with order ID, zone, basket value in rupees, and delivery minutes; include one genuine extreme order and one missing value.',
            'Report count, missing count, mean, median, mode, sample variance, standard deviation, and p50/p90 for both numeric measures.',
            'Plot a histogram and box plot for delivery minutes; vary the number of histogram bins and describe what changes.',
            'Flag IQR-rule outliers, inspect the source rows, and write down which are valid business events versus data problems.',
            'Compare delivery p50 and p90 by zone, showing group sizes; state one plausible follow-up question without claiming causation.',
          ]}
          hint="Use pandas Series.quantile for percentiles and var(ddof=1) for sample variance. Treat a flag as a prompt to investigate, not an instruction to delete."
        />
      </Part>

      <KeyTakeaways items={[
        'A descriptive statistic compresses observed data; it does not explain causes or correct a biased sample.',
        'Mean, median, and mode answer different questions; skew and extreme values often make the median more representative.',
        'Variance squares deviations; standard deviation returns to the original unit, while IQR is more robust to extreme tails.',
        'Percentiles describe thresholds such as p90 and should always include a population, unit, and time window.',
        'Use histograms and box plots to inspect skew, clusters, gaps, and suspicious measurement patterns.',
        'Investigate outliers in context and document any exclusions instead of removing records automatically.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/analytics-engineering-data-analytics/sampling-confidence-intervals"
        label="Lesson 02 · Sampling and Confidence Intervals"
        text="Summaries describe the records you have. Next, learn how carefully chosen samples help estimate a larger population—and how to communicate uncertainty around that estimate."
      />
    </LearnLayout>
  )
}
