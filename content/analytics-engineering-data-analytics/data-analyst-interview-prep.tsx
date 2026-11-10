import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function DataAnalystInterviewPrep() {
  return (
    <LearnLayout
      title="Data Analyst Interview Prep"
      description="SQL, statistics, product-metrics and case questions from data analyst interviews, with model answers and a take-home approach."
      section="Data Analytics & Statistics — Lesson 16"
      readTime="45 min"
    >
      <Part n={1} label="Prepare with evidence" title="Make Your Reasoning Easy to Follow">
        <P>
          Strong analyst interviews are not trivia contests. Interviewers want to see that you can clarify the question, choose
          an appropriate method, validate the result, and explain what decision it supports. Before solving, state the grain,
          assumptions, time window and any ambiguity you need to resolve.
        </P>
        <P>
          For a technical prompt, narrate the plan before typing. For an open-ended question, ask what the stakeholder needs to
          decide and what constraints matter. If you do not know a detail, say what you would verify rather than inventing a
          confident answer. Use the model responses below as patterns for concise reasoning, not scripts to memorize word for word.
        </P>
        <Steps items={[
          'Restate the goal and ask one or two questions that could change the analysis.',
          'Declare the entity grain, population, dates, metric and assumptions.',
          'Work through a small example or validation before scaling the solution.',
          'Close with the finding, limitation and the next decision or test.',
        ]} />
        <Callout type="tip">
          Keep a small project story ready: the business question, your contribution, an unexpected data issue, the validation
          you added, and how the work changed a decision. Never claim ownership of work you did not do.
        </Callout>
      </Part>

      <Part n={2} label="SQL questions · 1–4" title="Show That You Can Query the Right Grain">
        <P>After each model answer, the bullets identify evaluation signals interviewers may look for.</P>
        <P><strong>1. How would you find the second-highest salary in each department?</strong></P>
        <P>
          I would first clarify how ties should behave. If the requirement is the second distinct salary, I would rank distinct
          salary values within each department with <code>DENSE_RANK</code>, then select rank two. If the requirement instead
          means the second employee row, I would use <code>ROW_NUMBER</code> with a deterministic tie-breaker. That distinction
          changes the result when two people share the highest salary.
        </P>
        <Bullets items={[
          'distinguishes rank semantics and handles ties deliberately.',
          'partitions by department and defines behavior for departments with fewer than two salaries.',
        ]} />
        <Code file="second_distinct_salary.sql" lang="sql" code={`
WITH ranked_salaries AS (
    SELECT
        department_id,
        salary,
        DENSE_RANK() OVER (
            PARTITION BY department_id
            ORDER BY salary DESC
        ) AS salary_rank
    FROM (
        SELECT DISTINCT department_id, salary
        FROM employees
        WHERE salary IS NOT NULL
    ) distinct_values
)
SELECT department_id, salary AS second_highest_salary
FROM ranked_salaries
WHERE salary_rank = 2;
`} />

        <P><strong>2. How do you find users who placed an order but never made a payment?</strong></P>
        <P>
          I would ask whether an order can have multiple payment attempts and whether refunded or failed payments count as a
          payment. Assuming a successful payment is represented by status <code>settled</code>, I would use <code>NOT EXISTS</code>
          so each qualifying order is tested without multiplying rows. I would then check the result against a small sample of
          order IDs and confirm the join key is stable.
        </P>
        <Bullets items={[
          'clarifies the business definition of a payment, including status and refunds.',
          'avoids accidental row multiplication and validates the anti-join result.',
        ]} />
        <Code file="orders_without_settled_payment.sql" lang="sql" code={`
SELECT o.order_id, o.customer_id, o.created_at
FROM orders o
WHERE NOT EXISTS (
    SELECT 1
    FROM payments p
    WHERE p.order_id = o.order_id
      AND p.status = 'settled'
);
`} />

        <P><strong>3. What is the difference between <code>WHERE</code> and <code>HAVING</code>?</strong></P>
        <P>
          <code>WHERE</code> filters input rows before grouping; <code>HAVING</code> filters grouped results after aggregation.
          For example, I would use <code>WHERE created_at</code> to restrict the date range before a customer count, then
          <code> HAVING COUNT(*) &gt; 1</code> to keep groups that meet an aggregate condition. Filtering early can reduce work,
          but the main point is to use each clause at the correct stage.
        </P>
        <Bullets items={[
          'understands the logical query stages and can give a correct example.',
          'avoids filtering an aggregate in WHERE when the database requires HAVING.',
        ]} />

        <P><strong>4. How would you calculate a seven-day rolling average of daily orders?</strong></P>
        <P>
          I would first create one row for every calendar date, including dates with zero orders, then aggregate daily orders.
          A window frame of six preceding rows through the current row gives seven dates only if the date series is complete.
          I would clarify whether the first six dates should be partial or blank and whether the business means calendar days or
          business days.
        </P>
        <Bullets items={[
          'catches missing-date bias and defines the window boundaries.',
          'separates a row-based frame from a true calendar-day window.',
        ]} />
      </Part>

      <Part n={3} label="Statistics questions · 5–8" title="Explain Uncertainty Without Hiding Behind Jargon">
        <P><strong>5. What does a 95% confidence interval mean?</strong></P>
        <P>
          In a repeated-sampling interpretation, if we used the same valid procedure many times, about 95% of the intervals
          produced would cover the fixed population parameter. For the one interval we observed, I would report its bounds and
          method; I would not say there is a 95% probability that the fixed parameter is inside this already-computed interval.
        </P>
        <Bullets items={[
          'distinguishes coverage of a procedure from a probability statement about a fixed parameter.',
          'asks whether sampling and model assumptions support the interval.',
        ]} />

        <P><strong>6. A p-value is 0.03. What can you conclude?</strong></P>
        <P>
          If the null model and test assumptions hold, a p-value of 0.03 means results at least this incompatible with the null
          would occur with probability 0.03 under that model. It is not the probability that the null is true, nor evidence of
          business importance by itself. I would report the effect size, uncertainty, test design, and whether multiple tests
          or peeking affected the analysis.
        </P>
        <Bullets items={[
          'avoids interpreting the p-value as the probability the hypothesis is true.',
          'includes practical effect size, assumptions and analysis context.',
        ]} />

        <P><strong>7. How do you choose between a mean and a median?</strong></P>
        <P>
          I look at the distribution and the decision. The mean is useful when total magnitude matters and extreme values are
          meaningful; the median describes the middle observation and is less sensitive to a long tail. For delivery times, I
          would often show the median plus a high percentile because users care about typical and slow experiences. I would not
          remove outliers automatically without checking whether they are errors or real events.
        </P>
        <Bullets items={[
          'relates the summary to distribution shape and use case.',
          'treats outliers as a data question rather than an automatic deletion rule.',
        ]} />

        <P><strong>8. How would you compare an outcome between two groups?</strong></P>
        <P>
          I would identify the outcome type, unit of assignment, sampling process and whether the groups were randomized. For a
          randomized comparison, I would estimate the difference with an interval and check the experiment design and guardrails.
          For observational groups, I would describe the association and consider confounding; a simple significance test does
          not make the groups exchangeable or establish causation.
        </P>
        <Bullets items={[
          'starts with design and unit, not a reflexive test choice.',
          'distinguishes randomized evidence from observational comparisons.',
        ]} />
        <Code file="bootstrap_difference.py" lang="python" code={`
import numpy as np

# Independent observations from two groups; replace with validated samples.
control = np.array([4.2, 5.1, 3.8, 6.0, 4.7])
treatment = np.array([5.0, 5.7, 4.9, 6.4, 5.3])
rng = np.random.default_rng(42)
differences = []

for _ in range(5000):
    control_sample = rng.choice(control, size=len(control), replace=True)
    treatment_sample = rng.choice(treatment, size=len(treatment), replace=True)
    differences.append(treatment_sample.mean() - control_sample.mean())

estimate = treatment.mean() - control.mean()
low, high = np.quantile(differences, [0.025, 0.975])
print(f"Difference in means: {estimate:.2f}")
print(f"Bootstrap interval: [{low:.2f}, {high:.2f}]")
`} />
        <P>
          This small example demonstrates resampling mechanics, not a substitute for checking experimental design, sample
          representativeness or assumptions. In an interview, explain which interval method you would use and why it fits the data.
        </P>
      </Part>

      <Part n={4} label="Product questions · 9–12" title="Connect Metrics to User Behavior and Decisions">
        <P><strong>9. How would you define weekly active users?</strong></P>
        <P>
          I would ask what product behavior represents meaningful activity and which timezone defines a week. I would specify
          the eligible account types, user identity rule, treatment of bots and internal users, and whether the metric counts
          users or accounts. Then I would document the event and validate it against real journeys before comparing trends.
        </P>
        <Bullets items={[
          'treats an active-user metric as a product definition, not just a SQL count.',
          'considers identity, calendar boundaries, eligibility and instrumentation.',
        ]} />

        <P><strong>10. Conversion fell this week. What do you do first?</strong></P>
        <P>
          I would verify the metric and data freshness, compare like-for-like calendar periods, and inspect counts as well as
          rates. Then I would segment by platform, acquisition source and funnel step, checking sample sizes and recent releases
          or tracking changes. I would share what is confirmed, what is a hypothesis, and the next check before recommending a fix.
        </P>
        <Bullets items={[
          'checks instrumentation and denominator before explaining behavior.',
          'uses a structured diagnostic sequence and communicates uncertainty.',
        ]} />

        <P><strong>11. How would you measure a delivery-app checkout funnel?</strong></P>
        <P>
          I would define the eligible entry event and ordered steps, such as menu view, checkout start, payment success and
          order confirmation. I would choose user or session as the unit, define the conversion window, and ensure the events
          can be linked in order. I would report both step counts and conditional rates, then inspect device, payment method and
          delivery area segments without assuming a segment difference is causal.
        </P>
        <Bullets items={[
          'defines grain, order, time window and denominators.',
          'notices payment success and final confirmation may be distinct events.',
        ]} />

        <P><strong>12. A product manager asks for a north-star metric. How do you respond?</strong></P>
        <P>
          I would first ask what durable customer value the product promises and what behavior indicates that value was realized.
          I would propose a metric that is understandable, measurable and hard to inflate through low-quality activity, then
          pair it with guardrails for quality, cost or user harm. I would test whether teams can influence it and whether the
          definition is stable across cohorts.
        </P>
        <Bullets items={[
          'connects the metric to customer value and strategic decisions.',
          'anticipates gaming, trade-offs and guardrails.',
        ]} />
      </Part>

      <Part n={5} label="BI and quality questions · 13–15" title="Keep Reports Consistent and Reproducible">
        <P><strong>13. What is the difference between a fact and a dimension?</strong></P>
        <P>
          A fact records an event or measurement at a declared grain, such as one order line with quantity and net price. A
          dimension gives descriptive context, such as product category or customer segment, and filters facts through keys.
          I would state the grain before defining relationships because mixing order and order-line grain can duplicate totals.
        </P>
        <Bullets items={[
          'gives a concrete grain and correctly distinguishes measurements from descriptors.',
          'recognizes key uniqueness and double-count risk.',
        ]} />

        <P><strong>14. A dashboard total does not match finance. How do you investigate?</strong></P>
        <P>
          I would align the two metric definitions first: dates, timezone, status rules, refunds, tax, currency, and inclusion
          of test accounts. Then I would reconcile source records at a shared grain, inspect joins and relationship cardinality,
          compare refresh cutoffs, and trace the difference to a small set of rows. I would not adjust a report until the
          underlying rule is agreed and documented.
        </P>
        <Bullets items={[
          'treats reconciliation as definition plus lineage, not a chart-format issue.',
          'uses a traceable row-level method and communicates the resolution.',
        ]} />

        <P><strong>15. Why use a measure instead of a calculated column in a BI model?</strong></P>
        <P>
          A measure is evaluated for the current filter context, so it can return a dynamic total for each visual. A calculated
          column stores a row-level result during refresh and can increase model size. I would use a column for a stable attribute
          needed for grouping or filtering, and a measure for aggregations such as revenue or order count.
        </P>
        <Bullets items={[
          'explains evaluation timing and filter context.',
          'chooses based on the model need rather than a blanket rule.',
        ]} />
        <Code file="interview_measures.dax" lang="dax" code={`
Revenue =
    SUMX(
        FactOrderLine,
        FactOrderLine[Quantity] * FactOrderLine[NetUnitPrice]
    )

Orders =
    DISTINCTCOUNT(FactOrderLine[OrderID])

Average Order Value =
    DIVIDE([Revenue], [Orders])
`} />
      </Part>

      <Part n={6} label="Case and communication · 16–18" title="Explain the Work, Not Just the Answer">
        <P><strong>16. How do you respond when a stakeholder says churn increased?</strong></P>
        <P>
          I would clarify the churn definition, affected population, comparison period and decision they need to make. I would
          validate source history and metric freshness, inspect the trend and denominators, and segment by useful customer
          attributes. I would separate an observed pattern from a cause and propose a test or data check that could distinguish
          plausible explanations.
        </P>
        <Bullets items={[
          'scopes the question before choosing an analysis.',
          'communicates evidence, uncertainty and an actionable next step.',
        ]} />

        <P><strong>17. Tell me about an analysis that changed your mind.</strong></P>
        <P>
          I would describe a real project where an initial explanation did not survive validation. I would explain what I
          expected, which data check or counterexample changed my view, how I communicated the correction, and what decision
          followed. I would be specific about my own contribution and avoid overstating the business impact if it was not measured.
        </P>
        <Bullets items={[
          'intellectual honesty and a concrete validation step.',
          'clear personal contribution and a grounded outcome.',
        ]} />

        <P><strong>18. How would you approach an unfamiliar take-home assignment?</strong></P>
        <P>
          I would read the requirements, list assumptions and identify the intended audience before coding. I would inspect
          schema, quality and missingness, create a reproducible analysis with a small number of focused questions, and validate
          key calculations. I would deliver a short README or memo covering definitions, findings, limitations and how to rerun
          the work, while following the assignment's time and data-use constraints.
        </P>
        <Bullets items={[
          'prioritizes scope and reproducibility over unnecessary polish.',
          'provides caveats, validates outputs and respects data handling instructions.',
        ]} />
        <Callout type="info">
          A useful answer is specific enough to be checked and short enough to follow. Pause after stating assumptions so the
          interviewer can correct the problem framing before you invest in a solution.
        </Callout>
      </Part>

      <Part n={7} label="Take-home workflow" title="Deliver a Small, Auditable Analysis">
        <P>
          Keep a take-home reproducible and proportionate to the brief. Show focused findings, distinguish source facts from
          interpretation, and make the work easy to rerun.
        </P>
        <Steps items={[
          'Write down the decision, audience and required output.',
          'Inspect grain, keys, missing values and date coverage.',
          'Build reproducible code with assumptions stated.',
          'Validate totals and inspect edge cases or a small sample.',
          'Present a headline, evidence, limitations and next step.',
        ]} />
        <Table
          head={['Deliverable', 'What it should show']}
          rows={[
            ['Query or notebook', 'Reproducible calculations with assumptions stated'],
            ['Validation note', 'Checks for grain, totals, missingness and edge cases'],
            ['Recommendation', 'Decision, supporting evidence, caveat and next action'],
          ]}
        />
        <Callout type="warning">
          Do not upload candidate or customer data to unapproved services. Remove direct identifiers from portfolio material
          and follow the employer's assessment instructions and retention rules.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Interview Mistakes">
        <Mistakes items={[
          { mistake: 'Starting to code before clarifying the metric', cause: 'Different grains, dates or tie rules can produce different answers.', fix: 'Ask a concise clarifying question and state assumptions before implementation.' },
          { mistake: 'Claiming causation from a segment difference', cause: 'The groups may differ in tenure, intent or other confounders.', fix: 'Describe association honestly and propose an appropriate causal design.' },
          { mistake: 'Giving a technically correct result with no decision context', cause: 'The stakeholder cannot tell what to do next.', fix: 'End with a plain-language implication, limitation and next action.' },
          { mistake: 'Hiding failed checks or personal contribution', cause: 'It makes the work hard to trust and difficult to reproduce.', fix: 'Explain what you validated, what changed, and exactly what you owned.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Run a Mock Interview and Review Your Answers">
        <Practice
          title="Answer aloud, then verify the technical details"
          tasks={[
            'Choose four SQL questions and explain the grain and assumptions before writing the query.',
            'Explain a confidence interval and a p-value to a product manager without using them as a decision by themselves.',
            'Give a two-minute answer to the churn case using observed evidence, limitations and one next test.',
            'Describe one real project with your specific contribution, a quality check and a decision outcome.',
            'Complete a small take-home: SQL query, validation notes, one chart and a short recommendation memo.',
          ]}
          hint="Record one practice answer. Remove filler, keep the assumptions, and make sure the conclusion follows from the evidence."
        />
      </Part>

      <KeyTakeaways items={[
        'Clarify the decision, population, grain and time window before selecting a method.',
        'In SQL, handle ties, duplicates, nulls and missing dates intentionally; validate results on examples.',
        'Interpret statistical evidence with assumptions, effect size and study design in view.',
        'Product metrics need a meaningful behavior definition and guardrails against misleading optimization.',
        'A good analyst separates observations, hypotheses and causal conclusions.',
        'Take-home work should be reproducible, auditable, privacy-aware and concise.',
      ]} />

      <Bullets items={[
        <span key="ref">For role-specific expectations, review the job description and the documentation for the SQL, BI and analysis tools used by the team.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/sql"
        label="Next course · SQL"
        text="Continue strengthening the query skills behind analyst work with the dedicated SQL learning path."
      />
    </LearnLayout>
  )
}
