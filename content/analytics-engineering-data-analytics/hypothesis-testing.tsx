import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Table } from '@/components/content/LessonKit'

export default function HypothesisTesting() {
  return (
    <LearnLayout
      title="Hypothesis Testing and p-values"
      description="Null and alternative hypotheses, t-tests and chi-square tests, p-values, errors, power, and what significance does not mean."
      section="Data Analytics & Statistics — Lesson 07"
      readTime="40 min"
    >
      <Part n={1} label="Why test?" title="A Difference in a Sample May Be Random">
        <P>
          A product team sees higher checkout conversion after a UI change and asks whether the change caused an improvement.
          A sample difference can appear even if the underlying experiences are the same, simply because users vary and the
          sample is finite. Hypothesis testing gives a structured way to compare the observed data with a clearly stated
          reference model. It does not turn an observational comparison into a causal experiment.
        </P>
        <P>
          Before calculating a test, specify the population, outcome, comparison, and analysis unit. Write a null hypothesis
          (often “no difference” or “no association”) and an alternative that matches the question. Choose the test and
          significance threshold before seeing the result where possible. If the assignment mechanism is not random, an
          apparent difference may reflect user mix, seasonality, or another confounder instead of the intervention.
        </P>
        <Table
          head={['Question', 'Common test', 'Data shape']}
          rows={[
            ['Do two independent groups have different means?', 'Independent-samples t-test', 'Numeric outcome per independent unit'],
            ['Did the same unit change before vs after?', 'Paired t-test', 'Matched numeric measurements'],
            ['Are two categorical variables associated?', 'Chi-square test of independence', 'Counts in a contingency table'],
            ['Does an observed category mix match expected proportions?', 'Chi-square goodness-of-fit', 'Observed and expected category counts'],
          ]}
          caption="Choose a test from the design and outcome, not from the result you hope to see."
        />
        <Callout type="info">
          A hypothesis test asks whether data are surprising under a specified null model. It does not directly tell you the
          probability that the null hypothesis is true.
        </Callout>
      </Part>

      <Part n={2} label="Null and alternative" title="State the Claim Before the Calculation">
        <P>
          The null hypothesis, written <code>H₀</code>, represents a reference condition such as equal population means. The
          alternative, <code>H₁</code>, describes a difference or direction that would matter. A two-sided test asks whether
          outcomes differ in either direction. A one-sided test is justified only when a direction was selected in advance
          and an effect in the opposite direction would not be treated as evidence for the claim.
        </P>
        <P>
          A test statistic measures how far the data are from the null expectation relative to estimated noise. The p-value
          is the probability, assuming the null model and its assumptions, of a statistic at least as extreme as the one
          observed in the direction(s) tested. A small p-value means the data are relatively incompatible with that null
          model; it does not measure effect size, business importance, or the chance the result is a false positive by itself.
        </P>
        <Callout type="tip">
          Write the hypothesis and analysis plan before examining group outcomes. Choosing a one-sided test or endpoint after
          seeing results makes the nominal p-value overstate the strength of evidence.
        </Callout>
      </Part>

      <Part n={3} label="t-tests" title="Compare Numeric Outcomes with a t-test">
        <P>
          A t-test compares means while accounting for variability and sample size. For two independent groups, Welch's
          t-test does not require the groups to have equal variances and is often a sensible default. A paired t-test works
          on within-unit differences, such as a before/after measure for the same accounts. Both depend on a valid design and
          assumptions about independence; with sufficiently large samples, mean-based inference can be robust to moderate
          non-normality, but extreme skew and outliers still deserve investigation.
        </P>
        <Code file="welch_t_test.py" code={`
import numpy as np
from scipy import stats

control = np.array([4.1, 3.8, 4.5, 3.9, 4.2, 4.0, 3.7, 4.4])
treatment = np.array([4.4, 4.2, 4.7, 4.1, 4.6, 4.3, 4.0, 4.5])
result = stats.ttest_ind(treatment, control, equal_var=False, alternative="two-sided")
difference = treatment.mean() - control.mean()
print(f"mean difference={difference:.3f}; t={result.statistic:.3f}; p={result.pvalue:.4f}")
`} />
        <P>
          Report the group means, sample sizes, difference, and uncertainty—not just a p-value. In this example, the values
          are illustrative ratings, not evidence about a real product. A confidence interval for the mean difference helps
          show which effect sizes remain compatible with the sample.
        </P>
        <Code file="paired_t_test.py" code={`
import numpy as np
from scipy import stats

before = np.array([18, 21, 17, 24, 20, 19, 23], dtype=float)
after = np.array([16, 20, 15, 22, 18, 18, 21], dtype=float)
result = stats.ttest_rel(before, after, alternative="greater")
print("mean reduction:", float(np.mean(before - after)))
print("paired t statistic:", result.statistic, "p-value:", result.pvalue)
`} />
        <P>
          Pairing is valid only when each before measurement is matched to the same unit after. Comparing unrelated groups as
          if they were paired invents a relationship and can distort uncertainty. Likewise, repeated observations from one
          customer are not independent merely because they occupy different rows.
        </P>
      </Part>

      <Part n={4} label="Categorical outcomes" title="Use Chi-square Tests for Counts">
        <P>
          A chi-square test of independence checks whether two categorical variables are associated by comparing observed
          cell counts with counts expected if they were independent. For a checkout example, the table might cross device
          type with successful payment status. The test uses counts rather than percentages. It assumes observations are
          independent and expected cell counts are not too sparse; with small expected counts, consider an exact method or
          a design-appropriate alternative.
        </P>
        <Code file="chi_square.py" code={`
import numpy as np
from scipy.stats import chi2_contingency

# Rows: mobile, desktop. Columns: paid, not paid.
observed = np.array([[82, 18], [91, 29]])
chi2, p_value, degrees_freedom, expected = chi2_contingency(observed, correction=False)
print("expected counts:")
print(expected.round(1))
print(f"chi2={chi2:.3f}, df={degrees_freedom}, p={p_value:.4f}")
`} />
        <P>
          A statistically detectable association does not establish that device type caused payment success. Device mix may
          be associated with customer segment, payment method, or network quality. For an experiment, inspect the allocation
          and analysis unit; for an observational table, describe the association and avoid causal wording.
        </P>
        <Callout type="warning">
          Do not feed a table of percentages into a test that expects counts. Keep the underlying denominators and verify
          expected cell sizes before relying on a chi-square approximation.
        </Callout>
      </Part>

      <Part n={5} label="Decisions" title="Statistical Significance Is Not Practical Significance">
        <P>
          A very small effect can have a small p-value in a huge sample, while a meaningful effect can have a large p-value
          in a tiny sample. Statistical significance depends on the effect, variability, sample size, and test procedure.
          Practical significance asks whether the size and uncertainty of the effect matter for users, operations, or cost.
          Define a minimum worthwhile effect in business terms before running a study.
        </P>
        <P>
          Use a confidence interval for an effect estimate to see both direction and plausible magnitude. If the interval
          includes zero but also contains effects large enough to matter, the study may be inconclusive rather than proof of
          no effect. If the entire interval lies within a pre-agreed negligible range, that supports a different conclusion.
          These decisions require context and transparent assumptions.
        </P>
        <Table
          head={['Test result', 'What it supports', 'What it does not establish']}
          rows={[
            ['Small p-value', 'Observed data are unusual under the null model', 'Large impact, causality without design, or high probability H₁ is true'],
            ['Large p-value', 'Insufficient evidence to reject H₀ at the chosen threshold', 'Proof that groups are identical'],
            ['Narrow interval near zero', 'Effects outside the range are less compatible with data', 'Business equivalence unless a margin was defined'],
            ['Wide interval', 'Considerable uncertainty remains', 'That the true effect is exactly zero'],
          ]}
        />
      </Part>

      <Part n={6} label="Errors and power" title="Plan for False Alarms and Missed Effects">
        <P>
          A Type I error is rejecting a true null hypothesis (a false positive under the specified test). A Type II error is
          failing to reject a false null (a missed effect). The significance level, often written alpha, sets a long-run
          Type I error rate for a single correctly specified test under its assumptions. Power is the probability of
          detecting an effect of a specified size under a specified design; it is one minus the Type II error probability.
        </P>
        <P>
          Power depends on the minimum effect worth detecting, outcome variability, alpha, sample size, allocation ratio, and
          design. Larger samples can improve power, but may be wasteful if the effect is too small to matter. Estimate a
          sample size using a planned effect and variance, or use a relevant baseline and historical variability. For
          proportions and clustered designs, use a method built for those outcomes rather than a generic mean formula.
        </P>
        <Code file="power_for_mean.py" code={`
from statsmodels.stats.power import TTestIndPower

# Planning inputs are illustrative. Select a meaningful effect and variance from context.
effect_size = 0.30
power_analysis = TTestIndPower()
per_group = power_analysis.solve_power(
    effect_size=effect_size,
    alpha=0.05,
    power=0.80,
    ratio=1.0,
    alternative="two-sided",
)
print(f"approximate participants per group: {per_group:.0f}")
`} />
        <P>
          A power calculation is a planning aid, not a guarantee. Document the assumptions, intended endpoint, exclusions,
          and expected attrition. If you assess many outcomes or segments, account for multiple comparisons or treat secondary
          analyses as exploratory and validate them in a follow-up study.
        </P>
      </Part>

      <Part n={7} label="A disciplined workflow" title="Check the Design Before Trusting the Output">
        <P>
          Start from a measurement plan: one primary outcome, a defined analysis unit, inclusion rules, data-quality checks,
          test direction, alpha, and any planned subgroup analyses. Look at distributions, group sizes, missingness, and
          dependence. A significant answer to a badly measured question is still a bad answer. Keep an audit trail so an
          analyst can reproduce the result and explain any exclusions.
        </P>
        <Code file="test_summary.py" code={`
import numpy as np
from scipy import stats

control = np.array([12, 14, 11, 13, 16, 10, 15, 12], dtype=float)
variant = np.array([14, 15, 13, 15, 18, 12, 17, 14], dtype=float)
result = stats.ttest_ind(variant, control, equal_var=False)
print({
    "control_n": len(control),
    "variant_n": len(variant),
    "control_mean": round(float(control.mean()), 2),
    "variant_mean": round(float(variant.mean()), 2),
    "difference": round(float(variant.mean() - control.mean()), 2),
    "p_value": round(float(result.pvalue), 4),
})
`} />
        <P>
          The output is a compact descriptive summary plus a test statistic; a complete report also includes an interval for
          the effect, the assumptions and limitations, and the decision made before the data were observed. Re-run the
          analysis from a clean extract and verify row counts against the source before sharing results.
        </P>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Hypothesis Testing Mistakes">
        <Mistakes items={[
          { mistake: 'Saying p is the probability the null hypothesis is true', cause: 'The p-value is calculated assuming the null and model assumptions, not by comparing probabilities of hypotheses.', fix: 'Describe it as a tail probability under the specified null model.' },
          { mistake: 'Treating a non-significant result as proof of no difference', cause: 'A small sample or noisy metric may have low power.', fix: 'Report the effect interval and whether it rules out effects that matter.' },
          { mistake: 'Running many tests and reporting only the smallest p-value', cause: 'The chance of a false alarm rises across unplanned comparisons.', fix: 'Pre-specify primary tests, adjust where appropriate, and label exploration honestly.' },
          { mistake: 'Using a t-test on dependent rows as if they were independent', cause: 'Repeated measures or clustered users make standard errors too optimistic.', fix: 'Analyse paired changes or use a design/model that accounts for clustering.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Test a Product Change Without Overclaiming">
        <Practice
          title="Compare checkout outcomes and explain uncertainty"
          tasks={[
            'Write H₀ and H₁ for a two-sided comparison of mean checkout duration between two independent groups.',
            'Run Welch’s t-test in SciPy, reporting each group mean, difference, sample size, and p-value.',
            'Create a 2×2 table of payment success by device and run a chi-square test using counts; inspect expected counts.',
            'Describe Type I and Type II errors for the checkout decision in terms a product manager can understand.',
            'Use an illustrative power calculation to show how a preselected meaningful effect informs required sample size.',
          ]}
          hint="Use scipy.stats.ttest_ind(..., equal_var=False) and scipy.stats.chi2_contingency. A p-value alone is not the final business conclusion."
        />
      </Part>

      <KeyTakeaways items={[
        'A hypothesis test evaluates data against a specified null model; it cannot repair a weak measurement or non-random comparison.',
        'A p-value is a tail probability under the null and assumptions—not the probability that the null is true.',
        'Welch’s t-test compares independent means; a paired t-test uses matched within-unit differences.',
        'Chi-square tests compare categorical counts and require attention to expected counts and independent units.',
        'Statistical significance and practical importance are different; interpret effect sizes and intervals.',
        'Type I error, Type II error, and power should inform the study design before results are seen.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/analytics-engineering-data-analytics/correlation-and-regression"
        label="Lesson 08 · Correlation and Regression for Analysts"
        text="Measure relationships with correlation, fit and interpret linear regression, and avoid confusing correlation with causation."
      />
    </LearnLayout>
  )
}
