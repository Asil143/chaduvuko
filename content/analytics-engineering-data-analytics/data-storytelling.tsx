import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Table } from '@/components/content/LessonKit'

export default function DataStorytelling() {
  return (
    <LearnLayout
      title="Data Storytelling — From Analysis to Decision"
      description="Structure an analysis as a story, choose the one chart that makes the point, write the headline, and present to stakeholders."
      section="Data Analytics & Statistics — Lesson 07"
      readTime="30 min"
    >
      <Part n={1} label="Purpose" title="A Data Story Connects Evidence to a Decision">
        <P>
          Data storytelling is not adding decoration or drama to a chart. It is the disciplined process of explaining a
          question, presenting relevant evidence, interpreting what the evidence can and cannot say, and proposing an
          appropriate next step. An executive update, an operational review, and a technical investigation need different
          levels of detail, but all should make their central point easy to find.
        </P>
        <P>
          Start by asking: Who is the audience? What decision is due? What do they already know? What evidence would change
          the decision? A clear narrative often moves from context to observation, interpretation, limitation, and action.
          If the data are inconclusive, say what remains uncertain and what additional evidence would resolve it instead of
          forcing a confident conclusion.
        </P>
        <Table
          head={['Story element', 'What it contains']}
          rows={[
            ['Context', 'Business question, population, period and metric definition'],
            ['Evidence', 'A chart or table that directly addresses the question'],
            ['Interpretation', 'What changed, where, and how large the shift appears'],
            ['Caveat', 'Uncertainty, missing context, data quality or alternative explanation'],
            ['Action', 'A decision, owner, timeframe, or next analysis step'],
          ]}
          caption="A story makes the reasoning inspectable, not just the conclusion memorable."
        />
        <Callout type="info">
          Distinguish what the data show from what you infer. The more consequential the decision, the more important it is to
          name the assumptions behind the interpretation.
        </Callout>
      </Part>

      <Part n={2} label="Frame the question" title="Write the Headline Before Polishing the Chart">
        <P>
          A useful headline states the main finding in ordinary language and includes the population or period when needed.
          “Late deliveries rose in the eastern service area during the last two weeks” is more useful than “Delivery KPI”.
          The headline should reflect the evidence, not claim a cause unless the design supports a causal conclusion.
        </P>
        <P>
          A question-led title can be appropriate for exploratory dashboards, but a decision memo should not make the reader
          search the page for the point. Keep the question, analysis, and recommendation aligned. If a reader can reasonably
          ask “compared with what?” add a baseline or relevant comparison. If the result is a rate, include the denominator
          or link to a clear definition.
        </P>
        <Callout type="tip">
          Draft a one-sentence finding first. If you cannot state it without relying on a vague adjective such as “large” or
          “significant”, calculate the size of the change and define the comparison.
        </Callout>
      </Part>

      <Part n={3} label="Chart choice" title="Choose a Chart That Makes the Comparison Visible">
        <P>
          A line chart is effective for change over time; a sorted bar chart makes category comparisons easy; a scatter plot
          can show a relationship between two numeric variables; and a histogram or box plot reveals distribution. A table
          supports exact lookup. Choose the simplest visual that preserves the comparison the reader needs. If the analysis
          involves several measures, do not force them all into one graphic just to save space.
        </P>
        <P>
          Use a baseline that matches the question: prior period, comparable weekday, target, or control group. Make axes,
          units, and time intervals clear. A truncated axis can exaggerate small differences in bar charts; an arbitrary
          dual axis can imply a relationship. Colour should guide attention consistently and remain interpretable for people
          with colour-vision differences. Add a table or text alternative when visual encodings alone are insufficient.
        </P>
        <Table
          head={['Question', 'Chart choice', 'Common trap']}
          rows={[
            ['How has it changed?', 'Line chart', 'Irregular time windows or unexplained gaps'],
            ['Which category is highest?', 'Sorted horizontal bars', 'Too many categories or inconsistent ordering'],
            ['How spread out are values?', 'Histogram or box plot', 'Hiding skew and outliers behind the mean'],
            ['Do two measures move together?', 'Scatter plot', 'Claiming causation from association'],
            ['What is the exact value?', 'Table with units', 'Formatting that hides missing values or denominators'],
          ]}
        />
      </Part>

      <Part n={4} label="Annotations" title="Annotate the Moment That Changes the Story">
        <P>
          An annotation can mark a product release, policy change, outage, festival campaign, or data pipeline migration.
          The note helps the reader interpret a trend without pretending that an event caused it. For example, “UPI retry
          flow released here” documents timing; it does not prove that the release explains a subsequent payment-rate shift.
          Use a source or owner for important event notes and keep them concise.
        </P>
        <Code file="annotated_trend.py" code={`
import matplotlib.pyplot as plt
import pandas as pd

weekly = pd.DataFrame({
    "week": pd.date_range("2026-08-03", periods=8, freq="W-MON"),
    "late_rate": [0.12, 0.11, 0.12, 0.13, 0.16, 0.17, 0.15, 0.14],
})
fig, ax = plt.subplots(figsize=(9, 4))
ax.plot(weekly["week"], weekly["late_rate"] * 100, marker="o", color="#0f766e")
ax.axvline(pd.Timestamp("2026-08-31"), color="#64748b", linestyle="--")
ax.annotate("Route allocation change", xy=(pd.Timestamp("2026-08-31"), 13),
            xytext=(pd.Timestamp("2026-08-10"), 17),
            arrowprops={"arrowstyle": "->", "color": "#64748b"})
ax.set(title="Late-delivery rate by week", ylabel="Late orders (%)", xlabel="Week")
ax.grid(axis="y", alpha=0.25)
fig.tight_layout()
plt.show()
`} />
        <P>
          For a report intended to be reused, include the annotation's date, event, and source in the data or documentation
          rather than drawing an untracked line manually. If the definition of “late” or tracking changed, add a separate
          note; a measurement discontinuity is not necessarily a change in customer experience.
        </P>
        <Callout type="example">
          A festival sale may coincide with higher order volume and longer delivery times. Annotate the campaign, show volume
          and delay together, and avoid saying the campaign caused the delay unless the analysis supports that conclusion.
        </Callout>
      </Part>

      <Part n={5} label="Executive summary" title="Write the Summary for a Busy Decision-Maker">
        <P>
          An executive summary can fit into a few sentences: the question, the finding, its practical implication, the key
          limitation, and the requested action. Put the conclusion first, then provide the supporting metric and comparison.
          Avoid burying the decision in methods detail; include enough context to make the estimate verifiable and link to
          the full analysis for readers who need it.
        </P>
        <Code file="executive_summary.txt" lang="text" code={`
Finding: The late-delivery rate increased in the eastern service area over the last two complete weeks.
Evidence: The rate rose from 12% to 17%; order volume also increased. The definition and denominator are unchanged.
Implication: The change is concentrated in two high-volume routes, so a citywide staffing change is not yet supported.
Caveat: The comparison is observational; weather and route mix may explain part of the movement.
Request: Operations to review route capacity by Friday; Analytics to report the matched-week trend next review.
`} />
        <P>
          The numbers here are illustrative. In a real summary, link the metric definition, report the count behind each
          percentage, and ensure the dates are complete and comparable. If a confidence interval or experiment result is
          central to the decision, include it and explain its interpretation without equating a p-value with business
          certainty.
        </P>
      </Part>

      <Part n={6} label="Evidence and limitations" title="Make the Analysis Easy to Challenge">
        <P>
          State the source, population, unit, date range, exclusions, and calculation for consequential findings. Give
          denominators for rates and sample sizes for estimates. Mention missingness, late-arriving records, uncertainty, and
          differences from the comparison period. A strong presentation makes these details available without overwhelming
          the main visual—through footnotes, a linked metric definition, or a short methodology note.
        </P>
        <P>
          Separate observation from interpretation. “GMV was higher in September” is an observation if definitions are
          stable. “The promotion caused the increase” is a causal interpretation requiring an appropriate design or a careful
          identification strategy. Alternative explanations can include price changes, category mix, seasonality, customer
          composition, tracking changes, or one unusually large order.
        </P>
        <Code file="compare_periods.py" code={`
import pandas as pd

summary = pd.DataFrame({
    "period": ["Prior comparable weeks", "Current comparable weeks"],
    "orders": [8200, 9100],
    "late_orders": [984, 1547],
})
summary["late_rate"] = summary["late_orders"] / summary["orders"]
print(summary.to_string(index=False, formatters={"late_rate": "{:.1%}".format}))
`} />
        <P>
          The calculation gives a descriptive comparison. It does not account for uncertainty, differences in route mix, or
          seasonality. If the rate change is important, test whether the periods are comparable, inspect segment counts, and
          use an analysis that matches the data and decision. Do not treat every visible shift as a signal to intervene.
        </P>
      </Part>

      <Part n={7} label="Present and discuss" title="Lead with the Finding, Then Invite Useful Questions">
        <P>
          In a meeting, present the decision context, finding, supporting visual, limitation, and request. Pause for questions
          that could change the interpretation: did the definition change, are all regions represented, and is the comparison
          period complete? Keep backup material for details rather than reading every chart aloud. For remote or asynchronous
          reviews, write the key interpretation beside the visual so it survives without narration.
        </P>
        <P>
          End with an accountable action: who will do what by when, what evidence will be checked, and when the team will
          revisit the decision. “Investigate further” is not an action unless the owner, scope, and expected output are
          clear. If evidence does not justify a change, state the next measurement or experiment needed to learn safely.
        </P>
        <Callout type="warning">
          Do not remove a caveat just because it complicates the story. A concise, honest limitation increases trust and
          helps stakeholders choose a proportionate next step.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Data Storytelling Mistakes">
        <Mistakes items={[
          { mistake: 'Using a headline that claims more than the analysis', cause: 'A descriptive trend is framed as a cause or guarantee.', fix: 'Use language that matches the design and explicitly separate finding from interpretation.' },
          { mistake: 'Selecting a chart for visual novelty', cause: 'The reader has to decode the chart before seeing the comparison.', fix: 'Choose a familiar chart type that directly answers the audience question.' },
          { mistake: 'Showing a percentage without its denominator', cause: 'A rate can move sharply when it is based on few observations.', fix: 'Show counts, sample size, period, and a relevant uncertainty measure.' },
          { mistake: 'Hiding the requested decision at the end', cause: 'Stakeholders hear evidence without knowing what response is needed.', fix: 'State the decision or action up front, with an owner and timeframe.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Turn a Delivery Analysis into a One-Page Story">
        <Practice
          title="An evidence-led executive update"
          tasks={[
            'Choose a business question about delivery reliability and define the population, metric, denominator, and comparison period.',
            'Create a line or sorted-bar chart that directly supports one finding; label units, dates, and a relevant baseline.',
            'Add an annotation for a known operational event and explain why it is context, not proof of cause.',
            'Write an executive summary with finding, evidence, implication, caveat, and a specific decision or request.',
            'Ask a peer to identify the chart’s main point and denominator without explanation; revise if either is unclear.',
          ]}
          hint="Use a measured headline, include counts behind rates, and separate what the data show from what you believe explains it."
        />
      </Part>

      <KeyTakeaways items={[
        'A data story connects a defined decision to evidence, interpretation, limitations, and a proportionate action.',
        'Lead with a precise headline and comparison; do not make a causal claim from descriptive evidence alone.',
        'Select a familiar chart type for the analytical task and label axes, units, populations, and denominators.',
        'Annotations document relevant context but do not establish that an event caused the observed change.',
        'An executive summary should state the finding, evidence, implication, caveat, and requested action.',
        'Make results challengeable by exposing definitions, sources, sample sizes, uncertainty, and important limitations.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/ai-ml"
        label="Next course · AI & Machine Learning"
        text="You have completed the analytics and statistics track. Continue into AI & Machine Learning to build on data foundations and learn how models turn patterns into predictions and intelligent systems."
      />
    </LearnLayout>
  )
}
