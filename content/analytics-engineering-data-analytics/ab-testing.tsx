import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Table } from '@/components/content/LessonKit'

export default function AbTesting() {
  return (
    <LearnLayout
      title="A/B Testing — Design, Analysis and Pitfalls"
      description="Hypotheses, randomisation units, sample size, running and analysing a test, and the peeking, novelty, and multiple-testing traps."
      section="Data Analytics & Statistics — Lesson 10"
      readTime="40 min"
    >
      <Part n={1} label="What an experiment does" title="Randomisation Makes a Fair Comparison">
        <P>
          An A/B test randomly assigns eligible units to a control experience or a treatment experience, then compares a
          pre-defined outcome. When assignment is implemented correctly and enough units are observed, randomisation tends
          to balance measured and unmeasured characteristics across groups. It supports a causal interpretation for the
          tested population and exposure, but does not guarantee a good metric, correct instrumentation, or generalisation to
          every user and context.
        </P>
        <P>
          Begin with a decision: should the product ship a change, keep the current experience, or run another test? Define
          the change, eligible population, assignment unit, exposure event, primary outcome, guardrails, and test duration.
          For an Indian marketplace, a new UPI payment prompt might be evaluated on completed checkout while monitoring
          payment errors, cancellations, refunds, and support contacts.
        </P>
        <Table
          head={['Design element', 'Question to settle']}
          rows={[
            ['Hypothesis', 'What outcome should change, and in which direction?'],
            ['Randomisation unit', 'User, account, store, session, or another independent unit?'],
            ['Primary metric', 'Which one outcome drives the decision?'],
            ['Guardrails', 'What harm or operational regression must not occur?'],
            ['Duration and analysis', 'How much data is needed, and when will the result be read?'],
          ]}
          caption="Write these choices before looking at treatment outcomes."
        />
        <Callout type="info">
          A/B testing is not simply comparing two dashboard lines. The assignment, exposure, measurement, and analysis must
          preserve the intended experimental design.
        </Callout>
      </Part>

      <Part n={2} label="Hypothesis and metrics" title="Define Success and Guardrails First">
        <P>
          State a falsifiable hypothesis and choose an outcome that reflects the intended user value. A checkout test may
          have completed orders per eligible assigned user as its primary metric. Guardrails could include payment failure,
          duplicate charges, cancellation, delivery reliability, or support contacts. Use a metric definition that includes
          its denominator and attribution window; changing it after the results arrive can bias the decision.
        </P>
        <P>
          Distinguish assignment from exposure. Assignment is the random allocation; exposure records when a unit actually
          sees the treatment. Primary analysis is often intention-to-treat: compare units by assigned group, even if some
          never engage with the feature. Conditioning only on people who clicked can break the protection randomisation
          provided, because clicking is itself influenced by behaviour and the treatment.
        </P>
        <Callout type="tip">
          Set a practical minimum effect before the experiment. A statistically detectable increase that costs more to
          operate than the value it creates may not justify shipping.
        </Callout>
      </Part>

      <Part n={3} label="Randomisation" title="Choose an Assignment Unit That Prevents Leakage">
        <P>
          Randomise at the unit that can receive the experience consistently. User-level assignment works when a customer
          can encounter multiple sessions and should see the same variant. Store-level assignment may be needed when staff
          behaviour changes across a whole location, but it yields fewer independent units. Household, shared device, and
          multi-account behaviour can cause contamination if related users land in different groups.
        </P>
        <P>
          Keep assignment stable across visits and platforms. Log the experiment ID, variant, assignment timestamp, unit ID,
          eligibility, and exposure event. Validate that neither variant is systematically missing from a platform,
          geography, or client version. Before analysis, ensure users are counted once at the randomisation unit and that
          outcome windows begin relative to the assignment or exposure rule chosen in advance.
        </P>
        <Code file="stable_assignment.py" code={`
import hashlib


def assign_variant(experiment_id: str, unit_id: str, treatment_share: float = 0.5) -> str:
    """Deterministically assign one unit for stable exposure across visits."""
    if not 0.0 < treatment_share < 1.0:
        raise ValueError("treatment_share must be between 0 and 1")
    key = f"{experiment_id}:{unit_id}".encode("utf-8")
    bucket = int(hashlib.sha256(key).hexdigest()[:8], 16) / 0xFFFFFFFF
    return "treatment" if bucket < treatment_share else "control"

print(assign_variant("checkout-copy-v1", "customer-1042"))
`} />
        <P>
          This hash illustrates deterministic bucketing, not a complete experimentation platform. Production systems need
          controlled allocation, access controls, collision-safe namespaces, experiment lifecycle management, and tests for
          assignment stability. Never derive group assignment from mutable attributes such as device type or daily date.
        </P>
      </Part>

      <Part n={4} label="Sample size" title="Plan the Study Around a Meaningful Effect">
        <P>
          Sample-size planning uses a baseline rate or outcome variance, a minimum effect worth detecting, a significance
          level, target power, and allocation ratio. For a conversion rate, the baseline and meaningful absolute or relative
          change must be clear: a one percentage-point absolute increase is not the same as a one-percent relative increase.
          Expected traffic and seasonality then help estimate how long recruitment will take.
        </P>
        <P>
          Planning assumes the metric and design used in the calculation. If the outcome is highly skewed, users are clustered
          in stores, or assignment probabilities differ, use a method that reflects those features. Account for attrition,
          multiple comparisons, and any planned interim analysis. A test that cannot reach the necessary sample should be
          redesigned rather than repeatedly checked until a promising number appears.
        </P>
        <Code file="sample_size_mean.py" code={`
from statsmodels.stats.power import TTestIndPower

# Illustrative standardised effect; estimate meaningful effect and variability for your metric.
analysis = TTestIndPower()
per_group = analysis.solve_power(
    effect_size=0.20,
    alpha=0.05,
    power=0.80,
    ratio=1.0,
    alternative="two-sided",
)
print(f"planned participants per group: {per_group:.0f}")
`} />
        <Callout type="warning">
          Do not copy a sample-size number from another product. Baseline behaviour, unit of randomisation, variability,
          metric definition, and minimum worthwhile impact determine the calculation.
        </Callout>
      </Part>

      <Part n={5} label="Run and monitor" title="Monitor Integrity Without Chasing Significance">
        <P>
          During the test, monitor operational health and data integrity: assignment counts, exposure logging, event
          freshness, missing IDs, crash rates, and guardrails. Monitoring is not the same as repeatedly deciding whether the
          primary metric is significant. If you plan a fixed-horizon test, determine the sample and end date in advance and
          wait for the full outcome window. If continuous monitoring is required, use an analysis designed for sequential
          decisions.
        </P>
        <P>
          Sample-ratio mismatch (SRM) occurs when observed assignment counts differ from the expected allocation by more than
          can be explained by chance. For a 50/50 assignment, counts need not be exactly equal, but a substantial imbalance
          is a warning that assignment, eligibility, or logging may be broken. Investigate before interpreting outcome
          differences; do not simply reweight an unexplained mismatch away.
        </P>
        <Code file="check_srm.py" code={`
from scipy.stats import chisquare

observed = [5100, 4900]
expected_share = [0.5, 0.5]
total = sum(observed)
expected = [share * total for share in expected_share]
result = chisquare(f_obs=observed, f_exp=expected)
print(f"observed={observed}; chi2={result.statistic:.2f}; p={result.pvalue:.4f}")
`} />
        <P>
          An SRM test is a diagnostic, not proof the experiment is otherwise valid. Investigate the assignment service,
          client versions, eligibility filters, duplicate exposure events, and missing outcomes. Apply a pre-defined
          operational stop rule if safety or data integrity is compromised, and document the reason for stopping.
        </P>
      </Part>

      <Part n={6} label="Analyse" title="Estimate the Effect at the Assigned Unit">
        <P>
          Once the pre-specified recruitment and outcome window are complete, calculate group counts, means or rates, the
          effect estimate, and an uncertainty interval using an analysis aligned to the randomisation unit. For a binary
          outcome, compare rates and report an absolute difference as well as a relative change when useful. Include the
          experiment population, date range, exclusions, and missingness. Keep exploratory subgroup findings labelled as
          exploratory.
        </P>
        <Code file="analyse_conversion.py" code={`
import pandas as pd

# One row per assigned customer; converted is 1 if outcome completed in the fixed window.
experiment = pd.DataFrame({
    "variant": ["control"] * 6 + ["treatment"] * 6,
    "converted": [0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
})
summary = experiment.groupby("variant")["converted"].agg(["count", "mean"])
control_rate = summary.loc["control", "mean"]
treatment_rate = summary.loc["treatment", "mean"]
print(summary)
print("absolute lift:", treatment_rate - control_rate)
print("relative lift:", treatment_rate / control_rate - 1 if control_rate else None)
`} />
        <P>
          A real analysis should also estimate uncertainty, check the pre-defined quality criteria, and follow the planned
          statistical method. Do not select only users who received an exposure event if assignment was the intended
          analysis; a separate exposure-based estimate can be reported with its assumptions and limitations.
        </P>
      </Part>

      <Part n={7} label="Threats to validity" title="Peeking, Novelty and Multiple Tests">
        <P>
          Peeking means repeatedly checking a conventional fixed-horizon p-value and stopping when it crosses a threshold.
          That optional stopping inflates the false-positive rate. Use a pre-specified end point or a valid sequential
          testing method. Novelty effects occur when users initially react to a new experience, then behaviour changes as
          they adapt. Run long enough to cover relevant behaviour cycles and inspect whether the effect persists, while
          keeping the planned analysis intact.
        </P>
        <P>
          Multiple testing includes many outcomes, variants, segments, and repeated experiments. If teams search enough
          slices, some will look unusually good by chance. Name a primary outcome and guardrails in advance, adjust for
          multiple comparisons when confirmatory claims require it, and treat later discoveries as hypotheses for a new
          test. Also consider interference: one user's treatment may affect another user's outcome through shared inventory,
          marketplace supply, or social referrals.
        </P>
        <Table
          head={['Risk', 'Signal', 'Response']}
          rows={[
            ['Peeking', 'Test ends after a favourable interim result', 'Pre-specify a fixed horizon or valid sequential method'],
            ['Novelty', 'Early lift fades as users adapt', 'Plan a suitable duration and examine time patterns cautiously'],
            ['SRM', 'Observed allocation differs from expected', 'Pause interpretation and investigate assignment / logging'],
            ['Interference', 'Units influence each other', 'Consider cluster or geo-level assignment and suitable inference'],
          ]}
        />
        <Callout type="example">
          A delivery-dispatch change can shift courier availability between nearby zones. Individual-user randomisation may
          allow treatment and control to affect one another; the assignment design must reflect that operational spillover.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common A/B Testing Mistakes">
        <Mistakes items={[
          { mistake: 'Changing the primary metric after seeing the result', cause: 'Searching outcomes for a favourable signal undermines the pre-test error rate.', fix: 'Pre-register a primary metric and keep post-hoc analyses clearly exploratory.' },
          { mistake: 'Stopping when the p-value first looks significant', cause: 'Repeated fixed-horizon testing increases false positives.', fix: 'Use the planned sample and window or a valid sequential testing design.' },
          { mistake: 'Ignoring sample-ratio mismatch', cause: 'Assignment or logging bugs can create non-comparable groups.', fix: 'Check expected versus observed allocation and investigate causes before analysis.' },
          { mistake: 'Calling an early lift permanent', cause: 'Novelty, seasonality, and learning can change treatment response over time.', fix: 'Plan a relevant observation window and separate early diagnostics from the final decision.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Plan an Experiment for a UPI Checkout Prompt">
        <Practice
          title="Write the experiment brief before writing analysis code"
          tasks={[
            'State a directional hypothesis, target population, primary conversion metric, and three guardrails for a revised UPI prompt.',
            'Choose the randomisation unit and explain how you will keep assignment stable across devices and repeated visits.',
            'Specify baseline rate, minimum worthwhile change, alpha, power, allocation ratio, and the method used to plan sample size.',
            'Design an SRM and instrumentation check; identify what findings would pause the experiment.',
            'Write an analysis plan covering intention-to-treat, fixed outcome window, peeking, novelty effects, and exploratory segments.',
          ]}
          hint="A credible test plan states its decision rule and measurement window before outcomes are available. Separate operational monitoring from statistical stopping."
        />
      </Part>

      <KeyTakeaways items={[
        'Random assignment supports a fair comparison when the unit, exposure, and outcome are implemented consistently.',
        'Define the hypothesis, primary metric, guardrails, minimum effect, sample size, and analysis before running the test.',
        'Use stable assignment at the unit that matches the product and prevents cross-group contamination.',
        'Treat sample-ratio mismatch as a data-integrity warning to investigate before interpreting effects.',
        'Repeated peeking, novelty, multiple comparisons, and interference can invalidate a simple result.',
        'Report effect size and uncertainty with the planned population and window; a p-value alone is not a shipping decision.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/analytics-engineering-data-analytics/funnel-cohort-retention"
        label="Lesson 11 · Funnel, Cohort and Retention Analysis"
        text="Build conversion funnels, cohort tables and retention curves in SQL and Python, and explain what they say about a product."
      />
    </LearnLayout>
  )
}
