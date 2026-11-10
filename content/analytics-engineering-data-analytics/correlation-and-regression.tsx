import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function CorrelationAndRegression() {
  return (
    <LearnLayout
      title="Correlation and Regression for Analysts"
      description="Measure relationships with correlation, fit and interpret linear regression, and avoid confusing correlation with causation."
      section="Data Analytics & Statistics — Lesson 08"
      readTime="40 min"
    >
      <Part n={1} label="Ask a relationship question" title="Describe the Pattern Before Explaining It">
        <P>
          An analyst might ask whether longer delivery distances are associated with longer delivery times, or whether app
          activity is related to a customer's monthly spend. Correlation and regression help describe relationships between
          measured variables. They do not automatically explain why a pattern exists. Before calculating a statistic, define
          the unit of observation, population, time window, and which variable is the outcome for the question.
        </P>
        <P>
          Each point in a scatter plot should represent one clearly defined observation, such as one completed order. If a
          customer contributes many orders, those observations are not independent in the same way as records from unrelated
          customers. Record the sample size, how missing pairs were handled, and whether duplicate or repeated observations
          change the interpretation.
        </P>
        <Table
          head={['Tool', 'What it describes', 'What it does not prove']}
          rows={[
            ['Scatter plot', 'Shape, clusters, outliers, and possible curvature', 'A population-level effect or cause'],
            ['Correlation', 'Direction and strength of a specified association', 'That one variable changes the other'],
            ['Linear regression', 'A fitted linear relationship and predictions under a model', 'That the model is correct or causal'],
            ['Residual analysis', 'Patterns the fitted model did not capture', 'That all important bias is absent'],
          ]}
          caption="Choose the tool to describe the relationship, and state what remains unknown."
        />
        <Callout type="info">
          A relationship is an observation about variables. A causal claim needs a design and assumptions that address
          confounding, selection, timing, and alternative explanations.
        </Callout>
      </Part>

      <Part n={2} label="Plot first" title="A Scatter Plot Shows What a Single Number Can Hide">
        <P>
          Plot the two numeric variables before interpreting a correlation. Look for an upward or downward trend, a curved
          shape, separated clusters, a floor or ceiling, and isolated points. Pearson correlation describes linear
          association; it can be close to zero when a strong curved relationship exists. A point with unusual leverage can
          strongly change the value even if most observations form a different pattern.
        </P>
        <Code file="plot_relationship.py" code={`
import pandas as pd
import matplotlib.pyplot as plt

orders = pd.read_csv("data/orders.csv")
paired = orders[["distance_km", "delivery_minutes"]].dropna()

ax = paired.plot.scatter(
    x="distance_km", y="delivery_minutes", alpha=0.35, figsize=(7, 4)
)
ax.set(title="Distance and delivery time", xlabel="Distance (km)", ylabel="Minutes")
plt.tight_layout()
plt.show()
print("paired records:", len(paired))
`} />
        <P>
          Overplotting can hide dense regions, especially with rounded values. Use transparency or a suitable binned view, but
          preserve the axes and units. If points are repeated measurements from the same entity, show the group structure or
          use a method that accounts for repeated observations rather than treating every row as an unrelated unit.
        </P>
        <Callout type="tip">
          Label a scatter plot with the variables and units, and print the paired observation count after missing values are
          removed. The count is part of the evidence.
        </Callout>
      </Part>

      <Part n={3} label="Correlation" title="Interpret the Coefficient in Context">
        <P>
          Pearson's correlation coefficient ranges from -1 to 1 and summarises the direction and strength of a linear
          association. A positive value means larger values of one variable tend to occur with larger values of the other; a
          negative value indicates the opposite pattern. A value near zero means little linear association in the observed
          pairs, not necessarily no relationship. The coefficient is unitless, but it can be sensitive to outliers and
          restricted ranges.
        </P>
        <P>
          Spearman's rank correlation measures whether values tend to move together in rank order. It can describe a monotonic
          pattern that is not linear, but it does not solve confounding or make the result causal. Choose a method based on
          the question and inspect the plot. Report the method, number of paired records, period, and variables rather than
          presenting the coefficient as a universal score.
        </P>
        <Code file="correlation.py" code={`
paired = orders[["distance_km", "delivery_minutes"]].dropna()

pearson = paired["distance_km"].corr(paired["delivery_minutes"], method="pearson")
spearman = paired["distance_km"].corr(paired["delivery_minutes"], method="spearman")
print("paired records:", len(paired))
print("Pearson linear association:", round(pearson, 3))
print("Spearman rank association:", round(spearman, 3))
`} />
        <P>
          The two values need not agree. A difference can be a clue to curvature, outliers, or a changing pattern across the
          range; inspect the observations instead of selecting whichever coefficient better supports a story. Correlation
          matrices can also mislead when variables have different missing-value patterns, so note whether each pair was
          calculated on the same records.
        </P>
        <Callout type="example">
          Orders with longer routes may take longer on average, while traffic, weather, restaurant preparation, and batching
          also affect duration. A positive correlation between distance and time does not isolate the effect of distance.
        </Callout>
      </Part>

      <Part n={4} label="Fit a line" title="Linear Regression Estimates a Conditional Average Pattern">
        <P>
          Simple linear regression describes an outcome <code>y</code> as an intercept plus a slope times a predictor
          <code> x</code>, with a residual for the part not captured by the line. The slope is the model's average change in
          predicted outcome for a one-unit increase in the predictor within the fitted range. It is not automatically an
          individual-level effect, and extrapolating far beyond observed values is risky.
        </P>
        <Code file="simple_regression.py" code={`
import pandas as pd
from sklearn.linear_model import LinearRegression

paired = orders[["distance_km", "delivery_minutes"]].dropna()
X = paired[["distance_km"]]
y = paired["delivery_minutes"]

model = LinearRegression().fit(X, y)
print("intercept:", model.intercept_)
print("minutes per km (fitted slope):", model.coef_[0])
print("R-squared on these same records:", model.score(X, y))
`} />
        <P>
          The example fits and scores on the same observations to illustrate the model interface, not to estimate future
          performance. In a real predictive task, evaluate on data not used to fit or tune the model. R-squared describes the
          share of variation accounted for by the fitted linear model in the evaluated data under its definition; it does
          not say the model is unbiased, causal, or useful for every decision.
        </P>
        <Table
          head={['Output', 'Interpretation', 'Caution']}
          rows={[
            ['Intercept', 'Fitted outcome at predictor value zero', 'Zero may be outside the observed or meaningful range'],
            ['Slope', 'Fitted average outcome change per predictor unit', 'Association depends on data and model assumptions'],
            ['R-squared', 'Variation represented by this fitted model in evaluated data', 'Not a measure of causality or fairness'],
            ['Residual', 'Observed outcome minus fitted outcome', 'Patterns in residuals can reveal model mismatch'],
          ]}
          caption="Interpret coefficients with units and the range of observations in view."
        />
      </Part>

      <Part n={5} label="Multiple predictors" title="Controls Change the Question, Not the Need for Caution">
        <P>
          Multiple regression includes more than one predictor. A coefficient then describes the model's fitted relationship
          between a predictor and outcome while holding the other included predictors fixed. That conditional interpretation
          depends on the variables and model specification; it is not proof that the predictor has an isolated causal effect.
          Important omitted variables, measurement error, and selection can still distort the pattern.
        </P>
        <Code file="multiple_regression.py" code={`
from sklearn.linear_model import LinearRegression

features = ["distance_km", "rain_mm", "hour_of_day"]
model_data = orders[features + ["delivery_minutes"]].dropna()
X = model_data[features]
y = model_data["delivery_minutes"]

model = LinearRegression().fit(X, y)
coefficients = dict(zip(features, model.coef_))
print("rows used:", len(model_data))
print("fitted slopes:", coefficients)
`} />
        <P>
          If distance and an included measure are highly related, individual coefficients may become unstable or difficult
          to interpret. Some features may be measured after the outcome or encode information that would not be available at
          prediction time; including them can create leakage. Document why each predictor is included, when it is measured,
          and what information would actually exist at the moment a prediction is made.
        </P>
        <Callout type="warning">
          Adding more columns can improve an in-sample fit while making the model less useful or less trustworthy. Keep the
          analytical question, available-at-prediction timing, and evaluation design explicit.
        </Callout>
      </Part>

      <Part n={6} label="Check the fit" title="Residuals and Evaluation Reveal Where the Line Fails">
        <P>
          A residual is the observed outcome minus the model's fitted value. Plot residuals against fitted values and
          important predictors. A curved residual pattern suggests a straight line may miss structure; a fan shape suggests
          error spread changes with fitted values; large residuals may identify observations for investigation. Residuals
          are diagnostic evidence, not a reason to delete records until the plot looks tidy.
        </P>
        <Code file="regression_diagnostics.py" code={`
import matplotlib.pyplot as plt

predicted = model.predict(X)
residuals = y - predicted

plt.scatter(predicted, residuals, alpha=0.35)
plt.axhline(0, color="black", linewidth=1)
plt.xlabel("Fitted delivery minutes")
plt.ylabel("Residual minutes")
plt.title("Residuals versus fitted values")
plt.tight_layout()
plt.show()
`} />
        <P>
          For prediction, split data in a way that matches deployment. If the task is to predict future outcomes, a time-based
          split is often more realistic than randomly mixing past and future rows. Keep related observations together when
          leakage across the split is possible. Compare a simple baseline with the regression model and evaluate errors in
          the outcome's units, alongside any decision-specific costs of under- and over-prediction.
        </P>
        <Steps items={[
          'Plot the outcome against the predictor and inspect data range, clusters, and extreme points.',
          'Fit the simplest model that answers the question and record its data exclusions.',
          'Inspect residuals for curvature, changing spread, and influential observations.',
          'For prediction, evaluate with a split that respects time and repeated entities.',
          'Explain the limitation that matters for the intended decision.',
        ]} />
      </Part>

      <Part n={7} label="Causation and responsible reporting" title="A Plausible Story Is Not a Causal Design">
        <P>
          A confounder is a factor associated with both a predictor and an outcome that can contribute to their observed
          relationship. For example, time of day may be related to route choice and delivery duration. Reverse direction,
          selection into the dataset, changes in measurement, and random variation can also create or distort an association.
          Regression adjustment only helps when the data and assumptions support the intended interpretation.
        </P>
        <P>
          A causal question needs a design that addresses alternative explanations: a well-designed experiment, a credible
          quasi-experimental strategy, or another justified identification approach. This lesson's regression is descriptive
          unless such a design and assumptions are supplied. For a business report, use language such as &quot;associated
          with&quot; and state what evidence would be needed to claim an effect.
        </P>
        <Bullets items={[
          'Define the outcome, predictor, unit, period, inclusion rule, and data source.',
          'Report paired sample size and the handling of missing observations.',
          'State coefficient units, method, and the predictor range represented in the data.',
          'Show diagnostics and explain important limitations or model misspecification.',
          'Separate a descriptive result from a prediction or causal conclusion.',
        ]} />
        <Callout type="tip">
          A practical report pairs the coefficient with a scatter plot, sample size, definition, and limitation. Do not make a
          stakeholder infer the evidence from one number.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Correlation and Regression Mistakes">
        <Mistakes items={[
          { mistake: 'Claiming that correlation proves one variable caused another', cause: 'Confounding, reverse direction, selection, or coincidence can produce an association.', fix: 'Describe association accurately and use a suitable causal design before making an effect claim.' },
          { mistake: 'Interpreting a near-zero Pearson value as no relationship', cause: 'Pearson summarises linear association and can miss curvature or separate clusters.', fix: 'Plot the data and consider a method aligned with the pattern and question.' },
          { mistake: 'Treating the regression slope as an individual prediction or universal effect', cause: 'A fitted average relationship can hide variation, context, and model assumptions.', fix: 'Include units and range, inspect residuals, and describe the estimate as conditional on the fitted model.' },
          { mistake: 'Reporting training fit as future predictive performance', cause: 'The model was evaluated on the same examples used to fit it.', fix: 'Use an evaluation split that reflects deployment, prevent leakage, and compare with a baseline.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Investigate Distance and Delivery Time">
        <Practice
          title="Write a relationship analysis with honest limits"
          tasks={[
            'Define one row, the population, the time window, distance unit, delivery-time definition, and how cancelled orders are handled.',
            'Plot distance against delivery minutes, report the number of complete pairs, and inspect clusters, curvature, and unusual observations.',
            'Calculate Pearson and Spearman correlations and explain why they may differ without choosing the one that best fits a preferred story.',
            'Fit a simple linear regression and report the slope in minutes per kilometre, the observed distance range, and in-sample versus held-out status.',
            'Plot residuals and list one diagnostic concern or reason the straight-line model appears adequate for the descriptive goal.',
            'Write a short finding using association language, name a plausible confounder, and suggest evidence needed for a causal claim.',
          ]}
          hint="Use an approved dataset or synthetic data for practice. A relationship may be weak, nonlinear, or noisy; that is a valid result, not a failed exercise."
        />
      </Part>

      <KeyTakeaways items={[
        'Scatter plots reveal shape, clusters, restricted ranges, and influential observations that a coefficient can hide.',
        'Pearson summarises linear association; Spearman uses ranks and can describe monotonic patterns.',
        'A regression slope is a fitted average change per unit under a model, not automatically a causal or individual effect.',
        'Interpret coefficients with units, sample size, observed range, and model context.',
        'Inspect residuals and use deployment-appropriate evaluation for predictive work.',
        'Confounding, selection, timing, and measurement can distort relationships; adjustment alone does not guarantee causality.',
        'Communicate evidence, uncertainty, limitations, and the next check in plain language.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/analytics-engineering-data-analytics/metrics-and-kpis"
        label="Lesson 09 · Defining Metrics and KPIs"
        text="You can describe relationships without overclaiming. Next, define the metrics and denominators teams use to make product decisions."
      />
    </LearnLayout>
  )
}
