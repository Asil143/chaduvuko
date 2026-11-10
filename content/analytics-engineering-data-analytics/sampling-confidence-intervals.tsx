import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Table } from '@/components/content/LessonKit'

export default function SamplingConfidenceIntervals() {
  return (
    <LearnLayout
      title="Sampling and Confidence Intervals"
      description="Populations versus samples, sampling bias, the central limit theorem, standard error, and confidence intervals in Python."
      section="Data Analytics & Statistics — Lesson 02"
      readTime="35 min"
    >
      <Part n={1} label="Population and sample" title="You Usually Cannot Measure Everyone">
        <P>
          A population is the complete group you want to understand: for example, all eligible customers who placed an order
          in India during a defined month. A sample is the subset whose outcomes you observe. Sampling is valuable when
          measuring every member is costly, slow, or impossible. The estimate from a sample is uncertain because another
          sample would contain different people and produce a different statistic.
        </P>
        <P>
          A large sample does not automatically represent its population. If a food-delivery survey only reaches app users
          who opened a notification, people who stopped using the app are missing by design. This is selection bias, not
          sampling noise, and collecting more responses through the same biased channel may make a misleading estimate look
          more precise. Define eligibility and the sampling frame before selecting records.
        </P>
        <Table
          head={['Term', 'Meaning', 'Example']}
          rows={[
            ['Population parameter', 'Fixed but often unknown population value', 'True average wait among eligible users'],
            ['Sample statistic', 'Value calculated from observed sample data', 'Mean wait among sampled users'],
            ['Sampling frame', 'List or process from which units can be selected', 'Eligible account IDs in a date window'],
            ['Sampling bias', 'Systematic mismatch between sample and target', 'Only surveying highly engaged app users'],
          ]}
          caption="Be explicit about the population before interpreting an estimate."
        />
        <Callout type="info">
          Random selection helps control who enters a sample; it does not fix a badly defined population, missing data, or
          measurement error.
        </Callout>
      </Part>

      <Part n={2} label="Sampling designs" title="How You Select the Sample Matters">
        <P>
          In a simple random sample, every eligible unit has a known, equal chance of selection. Stratified sampling first
          divides a population into meaningful groups—such as regions or new and returning customers—and samples within
          each group. This can ensure coverage of smaller groups. Cluster sampling selects groups such as stores or
          pin-code areas and measures units within them; it can reduce collection costs but observations within a cluster
          may resemble each other.
        </P>
        <P>
          Convenience sampling, such as asking the first users who reply, is easy but often systematically different from the
          target population. Record the sampling method, inclusion rules, response rate, exclusions, and weighting approach.
          If some groups are underrepresented, weighting can help only when the relevant groups and population proportions
          are known and the assumptions are reasonable.
        </P>
        <Code file="simple_random_sample.py" code={`
import pandas as pd

customers = pd.DataFrame({
    "customer_id": range(1001, 1021),
    "region": ["North", "South", "East", "West"] * 5,
})
# Fixing random_state makes this demonstration reproducible.
sample = customers.sample(n=8, random_state=17)
print(sample.sort_values("customer_id"))
`} />
        <Callout type="tip">
          Randomness is about the selection mechanism, not whether the sample happens to look balanced. Check representation
          after selection and document any design weights used in estimates.
        </Callout>
      </Part>

      <Part n={3} label="Sampling variability" title="The Central Limit Theorem Explains Averages">
        <P>
          If you repeatedly draw independent samples from a population and calculate their means, those sample means form a
          distribution. Under common conditions, as sample size grows, this sampling distribution becomes approximately
          normal even when the original data are not normally distributed. This is the intuition behind the central limit
          theorem. It does not say the individual observations become normal, and it does not remove bias or dependence.
        </P>
        <P>
          The standard deviation of that sampling distribution is the standard error. For a sample mean with independent
          observations, the standard error is estimated by the sample standard deviation divided by the square root of the
          sample size. Larger samples usually reduce standard error, but with diminishing returns: quadrupling sample size
          roughly halves it under these assumptions. Clustered or repeated observations need methods that account for
          dependence rather than this simple formula.
        </P>
        <Code file="sampling_distribution.py" code={`
import numpy as np

rng = np.random.default_rng(42)
population = rng.lognormal(mean=3.0, sigma=0.8, size=100_000)
means = [rng.choice(population, size=100, replace=True).mean() for _ in range(2_000)]
print("population skew:", round(float(population.mean()), 2))
print("mean of sample means:", round(float(np.mean(means)), 2))
print("standard error across samples:", round(float(np.std(means, ddof=1)), 2))
`} />
        <P>
          The simulation uses a skewed population, yet sample means tend to have a more symmetric distribution. This is an
          illustration, not proof for every dataset. Check the sample size, extreme skew, finite-population design, and
          dependence structure before relying on a normal approximation.
        </P>
      </Part>

      <Part n={4} label="Standard error" title="Do Not Confuse Standard Deviation with Standard Error">
        <P>
          Standard deviation describes variation among individual measurements. Standard error describes uncertainty in an
          estimated statistic across repeated samples. A group of customers may have a wide range of purchase values even
          though the mean is estimated fairly precisely from many independent observations. Confusing the two leads to
          intervals that are far too wide or narrow.
        </P>
        <Code file="mean_standard_error.py" code={`
import numpy as np
import pandas as pd

orders = pd.Series([220, 180, 350, 260, 410, 195, 275, 300])
n = int(orders.count())
sample_sd = float(orders.std(ddof=1))
standard_error = sample_sd / np.sqrt(n)
print(f"n={n}, sample SD=₹{sample_sd:.2f}, SE of mean=₹{standard_error:.2f}")
`} />
        <P>
          This formula assumes independent observations and a sample that supports the approximation. If customers contribute
          several orders, orders from one customer may be correlated. Treating every order as an independent customer can
          understate uncertainty. Choose the unit of analysis to match the business question and sampling design.
        </P>
        <Callout type="warning">
          More decimal places do not create more certainty. A biased estimate can have a tiny standard error and still be
          consistently wrong for the target population.
        </Callout>
      </Part>

      <Part n={5} label="Confidence intervals" title="Interpret the Interval as a Procedure">
        <P>
          A confidence interval is a range produced by a method that, under its assumptions, would cover the fixed population
          parameter at a stated rate over repeated samples. A 95% confidence procedure does not mean there is a 95% chance
          that this one computed interval contains the fixed parameter. Nor does it mean 95% of individual customer values
          fall inside the interval. Keep the distinction between uncertainty about a mean and variation among observations.
        </P>
        <P>
          For a mean with unknown population standard deviation, a t interval uses a t critical value and degrees of freedom
          tied to the sample. With larger samples, the t distribution approaches the normal distribution. SciPy's
          <code> scipy.stats.sem</code> computes a standard error and <code>scipy.stats.t.interval</code> builds a t interval.
          Check missing values and the independence / sampling assumptions first.
        </P>
        <Code file="mean_confidence_interval.py" code={`
import numpy as np
from scipy import stats

wait_minutes = np.array([24, 27, 31, 22, 38, 29, 34, 26, 41, 28], dtype=float)
wait_minutes = wait_minutes[np.isfinite(wait_minutes)]
n = wait_minutes.size
mean = wait_minutes.mean()
se = stats.sem(wait_minutes)
low, high = stats.t.interval(0.95, df=n - 1, loc=mean, scale=se)
print(f"mean={mean:.1f} min; 95% t interval=({low:.1f}, {high:.1f})")
`} />
        <Callout type="example">
          The interval above is about a population mean wait under the stated sampling assumptions. It is not a prediction
          range for the next individual delivery.
        </Callout>
      </Part>

      <Part n={6} label="Resampling" title="Bootstrap When a Formula Is Not Convenient">
        <P>
          Bootstrap resampling draws repeated samples with replacement from the observed sample and recalculates a statistic
          each time. The resulting values approximate the statistic's sampling distribution and can produce an interval for
          a median, percentile, or other complicated summary. A bootstrap cannot invent population groups missing from the
          sample or repair biased selection. Its estimates also become unreliable when the original sample is tiny or
          dependent in ways the resampling ignores.
        </P>
        <Code file="bootstrap_median.py" code={`
import numpy as np

rng = np.random.default_rng(11)
wait = np.array([22, 24, 25, 27, 29, 31, 33, 35, 42, 68], dtype=float)
replicates = np.array([
    np.median(rng.choice(wait, size=wait.size, replace=True))
    for _ in range(5_000)
])
low, high = np.quantile(replicates, [0.025, 0.975])
print(f"sample median={np.median(wait):.1f}; bootstrap percentile interval=({low:.1f}, {high:.1f})")
`} />
        <P>
          The percentile bootstrap interval takes the corresponding quantiles of bootstrap statistics. Other interval
          constructions exist and can behave differently, especially for skewed statistics. In production analysis, state
          the resampling unit, number of replicates, random seed when reproducibility matters, and interval method.
        </P>
      </Part>

      <Part n={7} label="Communicating uncertainty" title="Give an Estimate, Interval and Context">
        <P>
          A practical report pairs the point estimate and interval with the sample size, population definition, collection
          period, and method. For example: “Among randomly sampled completed orders in the Hyderabad service area during
          June, estimated mean delivery time was 31 minutes; the 95% t interval was 28–34 minutes (n=180).” This statement
          is still incomplete if nonresponse or excluded orders could bias the sample, so mention those limitations.
        </P>
        <P>
          A narrower interval is not always more useful. A small uncertainty range around a poorly defined metric does not
          answer the operational question. If the decision depends on a threshold, compare plausible values in the interval
          with that threshold and discuss the cost of acting under uncertainty. Avoid presenting a confidence interval as a
          promise that future results will stay within its endpoints.
        </P>
        <Code file="summarise_interval.py" code={`
from scipy import stats
import numpy as np

sample = np.array([28, 30, 25, 39, 31, 29, 34, 27, 33, 26, 36, 32], dtype=float)
mean = sample.mean()
se = stats.sem(sample)
low, high = stats.t.interval(0.95, df=len(sample) - 1, loc=mean, scale=se)
print({"n": len(sample), "estimate_minutes": round(mean, 1),
       "ci_95_minutes": [round(low, 1), round(high, 1)]})
`} />
      </Part>

      <Part n={8} label="Pitfalls" title="Common Sampling and Interval Mistakes">
        <Mistakes items={[
          { mistake: 'Assuming a bigger convenience sample is representative', cause: 'More observations reduce random error but do not erase selection bias.', fix: 'Define a target population and improve the selection frame and response process.' },
          { mistake: 'Calling standard deviation a standard error', cause: 'One describes individual spread; the other describes estimator uncertainty.', fix: 'Calculate and label both explicitly, including the sample size.' },
          { mistake: 'Interpreting a 95% interval as a 95% probability for this fixed parameter', cause: 'The frequentist coverage statement refers to repeated use of the method.', fix: 'Explain that the procedure covers the parameter at its nominal rate under assumptions.' },
          { mistake: 'Using an independent-observation formula for clustered data', cause: 'Correlated records contain less independent information than the row count suggests.', fix: 'Resample or model at the correct unit, such as customer, store, or delivery cluster.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Estimate a Delivery-Time Mean">
        <Practice
          title="Sampling design and uncertainty report"
          tasks={[
            'Define a target population, time window, and unit of analysis for an estimate of mean delivery time in one Indian city.',
            'Draw a reproducible random sample from a synthetic table and compare its region composition with the full table.',
            'Calculate the sample mean, sample standard deviation, standard error, and 95% t confidence interval using SciPy.',
            'Simulate repeated samples from a skewed distribution and compare the distribution of observations with sample means.',
            'Bootstrap a sample median, then write one sentence with estimate, interval, sample size, method, and a limitation.',
          ]}
          hint="Use scipy.stats.sem and scipy.stats.t.interval for a mean. Check independence and selection before interpreting the interval."
        />
      </Part>

      <KeyTakeaways items={[
        'A population is the group you want to understand; a sample is the observed subset, and the selection method determines what it represents.',
        'Selection bias and measurement error are not fixed by collecting more of the same observations.',
        'The central limit theorem concerns sampling distributions of statistics, not a claim that raw data become normal.',
        'Standard deviation describes variation among observations; standard error describes uncertainty in an estimator.',
        'A confidence interval is a repeated-sampling procedure with assumptions, not an individual prediction range.',
        'Bootstrap methods can estimate uncertainty for complex statistics but cannot repair a biased or unrepresentative sample.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/analytics-engineering-data-analytics/hypothesis-testing"
        label="Lesson 03 · Hypothesis Testing and p-values"
        text="You can estimate a population value with uncertainty. Next, use hypothesis tests to assess whether observed differences are compatible with chance variation—and understand what a p-value does not say."
      />
    </LearnLayout>
  )
}
