import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Linear Regression — Chaduvuko',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CodeBlock({ code, language = 'python' }: { code: string; language?: string }) {
  return (
    <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)', margin: '20px 0' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 14px', background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
      }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' as const }}>
          {language}
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>
      </div>
      <pre style={{
        margin: 0, padding: '16px 20px',
        background: 'var(--bg2)',
        fontSize: 13, fontFamily: 'var(--font-mono)',
        color: 'var(--muted)', lineHeight: 1.75,
        overflowX: 'auto',
      }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

function ErrorBlock({ error, cause, fix }: { error: string; cause: string; fix: string }) {
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', margin: '12px 0' }}>
      <div style={{ padding: '10px 16px', background: 'rgba(255,95,87,0.08)', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#ff5f57', fontFamily: 'var(--font-mono)' }}>{error}</span>
      </div>
      <div style={{ padding: '14px 16px', background: 'var(--surface)' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>WHY IT HAPPENS</div>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 12 }}>{cause}</p>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#28c840', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>FIX</div>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{fix}</p>
      </div>
    </div>
  )
}

function MathBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', margin: '16px 0' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', background: 'var(--surface)',
        borderBottom: '1px solid var(--border)', flexWrap: 'wrap' as const, gap: 8,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7F77DD', flexShrink: 0 }} />
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#7F77DD', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' as const }}>{title}</span>
        </div>
        <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>optional deeper understanding</span>
      </div>
      <div style={{ padding: '16px 18px', background: 'var(--bg2)' }}>{children}</div>
    </div>
  )
}

// ─── Shared style tokens ──────────────────────────────────────────────────────

const sec: React.CSSProperties = { paddingBottom: 56, marginBottom: 56, borderBottom: '1px solid var(--border)' }
const tag: React.CSSProperties = { fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 10 }
const h2: React.CSSProperties = { fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 900, letterSpacing: '-1.2px', color: 'var(--text)', marginBottom: 16, lineHeight: 1.15 }
const p: React.CSSProperties = { fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 16 }
const ps: React.CSSProperties = { fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 10 }

function Highlight({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ padding: '14px 18px', background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `3px solid ${color ?? 'var(--accent)'}`, borderRadius: 8, margin: '20px 0' }}>
      <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{children}</div>
    </div>
  )
}

function ConceptBox({ title, children, color = '#7b61ff' }: {
  title: string; children: React.ReactNode; color?: string
}) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid ${color}30`,
      borderLeft: `4px solid ${color}`,
      borderRadius: 8, padding: '16px 20px', marginBottom: 20,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase' as const, color,
        fontFamily: 'var(--font-mono)', marginBottom: 10,
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LinearRegressionPage() {
  return (
    <LearnLayout
      title="Linear Regression"
      description="The simplest ML algorithm — and the most important one to truly understand. Build a DoorDash delivery time predictor from scratch."
      section="Classical ML"
      readTime="30–35 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="classical-ml" topic="linear-regression" />

      {/* ── SECTION 1: The problem ─────────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>The problem</span>
        <h2 style={h2}>DoorDash needs a number. You need to give them one.</h2>

        <p style={p}>
          You&apos;re a data scientist at DoorDash. Your lead drops a CSV on your desk: 10,000 completed orders,
          each with the delivery distance and the actual time it took. Your job is to build a model that
          predicts delivery time from distance.
        </p>
        <p style={p}>
          You open the file and look at the first few rows.
        </p>

        <div style={{ overflowX: 'auto', margin: '20px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--font-mono)' }}>
            <thead>
              <tr style={{ background: 'var(--surface)' }}>
                {['order_id', 'distance_km', 'delivery_time_min'].map((h) => (
                  <th key={h} style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', color: '#378ADD', textAlign: 'left', fontWeight: 700, fontSize: 11, letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['SW001', '1.2', '18'],
                ['SW002', '3.8', '32'],
                ['SW003', '2.1', '24'],
                ['SW004', '5.6', '47'],
                ['SW005', '0.8', '14'],
                ['SW006', '4.2', '38'],
                ['...', '...', '...'],
              ].map(([id, dist, time], i) => (
                <tr key={id} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                  <td style={{ padding: '9px 16px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>{id}</td>
                  <td style={{ padding: '9px 16px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>{dist}</td>
                  <td style={{ padding: '9px 16px', borderBottom: '1px solid var(--border)', color: 'var(--muted)' }}>{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={p}>
          You notice something immediately: longer distances mean longer delivery times. SW001 at 1.2 km
          took 18 minutes. SW004 at 5.6 km took 47 minutes. There is a clear upward trend. If you could
          capture that relationship as a formula, you could predict delivery time for any new order.
        </p>

        <Highlight>
          Linear Regression is the algorithm that captures exactly this relationship. It draws the best
          possible straight line through your data points — and once you have that line, predicting delivery
          time for any distance is a matter of reading off the value.
        </Highlight>
      </div>

      {/* ── SECTION 2: The intuition ──────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>The intuition</span>
        <h2 style={h2}>Drawing the best line through messy data</h2>

        <p style={p}>
          Imagine plotting all 10,000 orders on a graph. Distance on the x-axis. Delivery time on the y-axis.
          What you see is a cloud of dots drifting upward from left to right — longer distances, longer times,
          but with enough scatter that no perfect line could touch every point.
        </p>
        <p style={p}>
          Your goal is to draw a line through the middle of that cloud. Once you have the line, predicting
          is trivial: find your distance on the x-axis, go straight up until you hit the line, read off
          the delivery time. Done.
        </p>
        <p style={p}>
          The question is: which line is best? There are infinitely many lines you could draw. You need
          a way to measure how good a line is — and then find the line that scores best by that measure.
        </p>
        <p style={p}>
          The measure is error. For any line, each data point sits some vertical distance above or below
          it. That distance is the error for that point — how wrong the line&apos;s prediction was. A good
          line keeps these errors small across all 10,000 points.
        </p>
        <p style={p}>
          Linear Regression minimises the <em>sum of squared errors</em> — not the raw errors. Why squared?
          Two reasons: squaring makes every error positive (so a -5 error and a +5 error do not cancel out),
          and squaring penalises large errors much more than small ones (a 10-minute error counts 4× as much
          as a 5-minute error, not 2×). This makes the algorithm more sensitive to outliers, which is usually
          what you want in practice.
        </p>

        <Highlight color="#378ADD">
          <strong style={{ color: 'var(--text)' }}>The core concept: </strong>
          Linear Regression finds the straight line that minimises the sum of squared vertical distances
          between the line and every data point. This is called Ordinary Least Squares (OLS). &quot;Least
          squares&quot; because you are minimising a sum of squared errors. &quot;Ordinary&quot; because it
          is the simplest version.
        </Highlight>

        <p style={p}>
          The line is defined by two numbers:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '20px 0' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '3px solid #378ADD', borderRadius: 8, padding: '16px 18px' }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#378ADD', fontFamily: 'var(--font-display)', marginBottom: 8 }}>m</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>SLOPE · WEIGHT · COEFFICIENT</div>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
              How much delivery time increases for each additional kilometre of distance.
              A slope of 7.3 means: add 1 km, add 7.3 minutes to the prediction.
            </p>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '3px solid #1D9E75', borderRadius: 8, padding: '16px 18px' }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#1D9E75', fontFamily: 'var(--font-display)', marginBottom: 8 }}>b</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>INTERCEPT · BIAS</div>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
              The baseline delivery time when distance is zero — roughly the time to accept the order,
              prepare it, and hand it to a rider before they move. Around 8–9 minutes.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' as const, padding: '20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, margin: '20px 0' }}>
          <div style={{ fontSize: 18, fontFamily: 'var(--font-mono)', color: 'var(--text)', letterSpacing: '0.05em' }}>
            <span style={{ color: 'var(--muted)' }}>delivery_time</span>
            {' = '}
            <span style={{ color: '#378ADD', fontWeight: 700 }}>slope</span>
            {' × '}
            <span style={{ color: 'var(--muted)' }}>distance</span>
            {' + '}
            <span style={{ color: '#1D9E75', fontWeight: 700 }}>intercept</span>
          </div>
          <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--bg2)', borderRadius: 8, display: 'inline-block' }}>
            <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
              slope=<span style={{ color: '#378ADD' }}>7.3</span>, intercept=<span style={{ color: '#1D9E75' }}>8.6</span>, distance=<span style={{ color: 'var(--text)' }}>4 km</span>
            </div>
            <div style={{ fontSize: 15, fontFamily: 'var(--font-mono)', color: 'var(--text)', fontWeight: 700, marginTop: 6 }}>
              7.3 × 4 + 8.6 = <span style={{ color: 'var(--accent)' }}>37.8 minutes</span>
            </div>
          </div>
        </div>

        <Callout type="tip">
          Real DoorDash models use dozens of features — time of day, restaurant load, weather, rider count.
          The same idea extends directly: each feature gets its own slope (coefficient), and you add them
          all up. That is Multiple Linear Regression, covered at the end of this page. The two-number
          version here is where every ML practitioner starts.
        </Callout>
      </div>

      {/* ── SECTION 3: The math ───────────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>The math (optional)</span>
        <h2 style={h2}>How the algorithm actually finds the best line</h2>

        <p style={p}>
          Two methods. sklearn uses the first. Deep learning uses the second. Both find the same answer.
        </p>

        <MathBox title="Approach 1 — Ordinary Least Squares (OLS)">
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 14 }}>
            For simple linear regression (one feature), a closed-form solution exists. You can calculate
            the exact best slope and intercept directly from your data using these formulas:
          </p>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px', marginBottom: 14, fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2 }}>
            <div style={{ color: '#378ADD' }}>slope (m) = Σ[(xᵢ − x̄)(yᵢ − ȳ)] / Σ[(xᵢ − x̄)²]</div>
            <div style={{ color: '#1D9E75' }}>intercept (b) = ȳ − m × x̄</div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 8 }}>
            In plain English: the slope is the covariance of x and y divided by the variance of x. The
            intercept is the mean of y minus the slope times the mean of x.
          </p>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
            This is why <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#378ADD' }}>sklearn</code> fits
            a linear regression model on a million rows in under a second — it is not iterating; it is
            computing a formula directly. No looping, no guessing. One calculation.
          </p>
        </MathBox>

        <MathBox title="Approach 2 — Gradient Descent">
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 14 }}>
            Used when you have many features (OLS becomes expensive) and the same mechanism that trains
            every neural network in existence. You start with a guess and improve it step by step:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            {[
              { num: '1', text: 'Start with random parameters: m = 0, b = 0 (or near-zero random values).' },
              { num: '2', text: 'Make predictions for every training point using the current m and b.' },
              { num: '3', text: 'Calculate MSE (Mean Squared Error) — how wrong are all predictions on average?' },
              { num: '4', text: 'Calculate the gradient — which direction and how much to move m and b to reduce MSE?' },
              { num: '5', text: 'Take a small step in the opposite direction of the gradient. The size of the step is the learning rate hyperparameter.' },
              { num: '6', text: 'Repeat steps 2–5 until the loss stops decreasing meaningfully. You have converged.' },
            ].map((step) => (
              <div key={step.num} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#7F77DD18', border: '1px solid #7F77DD50', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#7F77DD', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{step.num}</div>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, margin: 0, paddingTop: 2 }}>{step.text}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginTop: 14, marginBottom: 0 }}>
            The <strong style={{ color: 'var(--text)' }}>learning rate</strong> is a hyperparameter you set. Too large:
            the steps overshoot and the loss bounces or diverges. Too small: training takes forever. Typical values: 0.01, 0.001, 0.0001.
          </p>
        </MathBox>

        <Callout type="info">
          sklearn&apos;s <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>LinearRegression()</code> uses
          OLS by default via a matrix decomposition called SVD. It is exact, fast, and requires no learning rate.
          For very large datasets or when you want online learning, use{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>SGDRegressor</code> which uses stochastic gradient descent.
        </Callout>
      </div>

      {/* ── SECTION 4: The code ───────────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>The code</span>
        <h2 style={h2}>Build the DoorDash delivery predictor — step by step</h2>

        <p style={p}>
          Eight steps. Every step has a purpose. Read the explanation before the code — the code will make
          more sense when you know why you are writing it.
        </p>

        {/* Step 1 */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#378ADD', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>STEP 1 — Create the dataset</div>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 0 }}>
            In a real job you would pull this from BigQuery or a Postgres database. Here we simulate it with
            numpy so you can run it instantly with no setup.
          </p>
          <CodeBlock code={`import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

np.random.seed(42)          # same random numbers every run — reproducibility

n_orders = 1000
distance_km = np.random.uniform(0.5, 8.0, n_orders)    # orders range 0.5–8 km
noise = np.random.normal(0, 4, n_orders)                # ±4 min real-world variability
delivery_time_min = 8.6 + 7.3 * distance_km + noise    # true relationship + noise

df = pd.DataFrame({
    'distance_km': distance_km,
    'delivery_time_min': delivery_time_min
})

print(df.describe())        # always run describe() first — know your data before touching it`} />
        </div>

        {/* Step 2 */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#378ADD', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>STEP 2 — Look at the data before touching it</div>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 0 }}>
            This is non-negotiable. A scatter plot in 30 seconds tells you whether Linear Regression is the
            right tool, before you write another line of code.
          </p>
          <CodeBlock code={`plt.figure(figsize=(8, 5))
plt.scatter(df['distance_km'], df['delivery_time_min'],
            alpha=0.3, s=15, color='#378ADD')
plt.xlabel('Distance (km)')
plt.ylabel('Delivery Time (min)')
plt.title('DoorDash Orders — Distance vs Delivery Time')
plt.tight_layout()
plt.show()

# What to look for:
#   Clear upward trend  → Linear Regression is appropriate
#   No trend / random   → LR will learn nothing useful
#   Curve (parabola)    → Wrong tool — try polynomial features or tree model
#   Tight cluster       → Great signal, model will be accurate`} />
        </div>

        {/* Step 3 */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#378ADD', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>STEP 3 — Split into training and test sets</div>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 0 }}>
            This is the single most important step beginners skip. If you evaluate on the same data you
            trained on, you are asking a student to grade their own exam using the answer sheet they
            already memorised. The score is meaningless.
          </p>
          <CodeBlock code={`X = df[['distance_km']]      # double brackets → 2D array (n_samples, n_features)
y = df['delivery_time_min']  # single brackets → 1D array (n_samples,)

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,       # 20% for testing = 200 orders
    random_state=42      # same split every run
)

print(f"Training set: {len(X_train)} orders")   # 800
print(f"Test set:     {len(X_test)} orders")    # 200

# The test set is the answer sheet.
# Treat it like one: don't look at it, don't tune on it, don't touch it
# until you are done building and ready for a final honest evaluation.`} />
          <Callout type="warning">
            Never use your test data during development. Not for feature selection, not for
            hyperparameter tuning, not for model comparison. The moment you make any decision based on
            test set performance, it is no longer a valid estimate of production performance. Use a
            validation set or cross-validation for development decisions.
          </Callout>
        </div>

        {/* Step 4 */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#378ADD', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>STEP 4 — Train the model</div>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 0 }}>
            Three lines. That is all sklearn needs. The complexity is hidden inside{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#378ADD' }}>fit()</code>.
          </p>
          <CodeBlock code={`model = LinearRegression()      # create the model object — no learning has happened yet

model.fit(X_train, y_train)    # THIS is where learning happens:
                                # - computes optimal slope and intercept via OLS
                                # - for 800 rows, this takes milliseconds
                                # - result: model.coef_ and model.intercept_ are set

print(f"Slope (coef):     {model.coef_[0]:.2f}")    # expect ~7.3 (min per km)
print(f"Intercept:        {model.intercept_:.2f}")  # expect ~8.6 (baseline minutes)

# These numbers ARE the model.
# coef_ = [7.28]    ← distance adds 7.28 min per km
# intercept_ = 8.71 ← base time before rider moves`} />
        </div>

        {/* Step 5 */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#378ADD', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>STEP 5 — Make predictions</div>
          <CodeBlock code={`y_pred = model.predict(X_test)

# Compare predicted vs actual for the first 8 test orders
comparison = pd.DataFrame({
    'distance_km': X_test['distance_km'].values[:8],
    'actual_min':  y_test.values[:8].round(1),
    'predicted_min': y_pred[:8].round(1),
    'error_min':   (y_pred[:8] - y_test.values[:8]).round(1)
})
print(comparison.to_string(index=False))

# Expected output (approximate):
#  distance_km  actual_min  predicted_min  error_min
#          2.3        22.8           25.4        2.6
#          6.1        52.1           53.1        1.0
#          1.0        13.2           15.9        2.7
#          4.7        39.4           42.9        3.5
#          3.5        32.3           34.2        1.9
#          0.7        15.1           13.7       -1.4
#          5.8        48.8           51.0        2.2
#          2.9        28.5           29.8        1.3`} />
        </div>

        {/* Step 6 */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#378ADD', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>STEP 6 — Evaluate properly</div>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 0 }}>
            A number without context is useless. Always compare your model to the dumbest possible baseline:
            predict the mean for every order. If your model cannot beat that, it has learned nothing.
          </p>
          <CodeBlock code={`mae = mean_absolute_error(y_test, y_pred)
print(f"MAE:  {mae:.2f} min")      # ~3.1 min on average — a PM can understand this

mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
print(f"RMSE: {rmse:.2f} min")     # penalises large errors more heavily than MAE

r2 = r2_score(y_test, y_pred)
print(f"R²:   {r2:.3f}")           # ~0.78 — distance explains 78% of delivery time variation

# --- Compare to baseline ---
baseline_pred = np.full(len(y_test), y_train.mean())   # always predict training mean
baseline_mae  = mean_absolute_error(y_test, baseline_pred)
print(f"\\nBaseline MAE (always predict mean): {baseline_mae:.2f} min")
print(f"Model MAE:                           {mae:.2f} min")
print(f"Improvement over baseline:           {((baseline_mae - mae) / baseline_mae * 100):.1f}%")`} />
        </div>

        {/* Step 7 */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#378ADD', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>STEP 7 — Visualise predictions vs actual</div>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 0 }}>
            Numbers tell you how wrong you are. Charts tell you <em>where</em> and <em>why</em>.
            The residual plot is the most important diagnostic chart in Linear Regression.
          </p>
          <CodeBlock code={`fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# Left: scatter + fitted line
ax1.scatter(X_train['distance_km'], y_train, alpha=0.2, s=12, color='#378ADD', label='Training data')
x_line = np.linspace(0.5, 8.0, 100).reshape(-1, 1)
ax1.plot(x_line, model.predict(x_line), color='#ff6b6b', linewidth=2, label='Fitted line')
ax1.set_xlabel('Distance (km)')
ax1.set_ylabel('Delivery Time (min)')
ax1.set_title('Fitted Line')
ax1.legend()

# Right: residual plot — actual minus predicted vs predicted
residuals = y_test - y_pred
ax2.scatter(y_pred, residuals, alpha=0.3, s=12, color='#7F77DD')
ax2.axhline(0, color='#ff6b6b', linewidth=1.5, linestyle='--')
ax2.set_xlabel('Predicted Time (min)')
ax2.set_ylabel('Residual (actual − predicted)')
ax2.set_title('Residuals')

# Interpreting the residual plot:
#   GOOD → random cloud centred on 0, no pattern
#   BAD  → fan shape (wider spread at higher predictions) → heteroscedasticity
#   BAD  → curve → the relationship is not actually linear

plt.tight_layout()
plt.show()`} />
        </div>

        {/* Step 8 */}
        <div style={{ marginBottom: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#378ADD', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>STEP 8 — Use the model for a real prediction</div>
          <CodeBlock code={`# Single prediction
new_order = pd.DataFrame({'distance_km': [3.2]})
predicted_time = model.predict(new_order)[0]
print(f"Predicted delivery time: {predicted_time:.0f} minutes")

# In production you would:
#   1. Serialise the model to disk with joblib
#   2. Load it in a FastAPI service
#   3. Monitor for drift (performance degrading over time)

import joblib

joblib.dump(model, 'doordash_eta_model.pkl')         # save model
loaded_model = joblib.load('doordash_eta_model.pkl') # load it later

# FastAPI endpoint (production pattern):
# @app.post("/predict-eta")
# def predict_eta(distance_km: float):
#     X = pd.DataFrame({'distance_km': [distance_km]})
#     return {"eta_minutes": int(loaded_model.predict(X)[0])}`} />
        </div>
      </div>

      {/* ── SECTION 5: Going further ──────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>Going further</span>
        <h2 style={h2}>Simple vs Multiple Linear Regression</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '20px 0' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '2px solid #378ADD', borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#378ADD', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>Simple Linear Regression</div>
            <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--muted)', marginBottom: 10 }}>y = m·x + b</div>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
              One input feature. The model is a 2D line. Two parameters: one slope, one intercept.
              Good for understanding the algorithm. Rarely sufficient for production.
            </p>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: '2px solid #7F77DD', borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#7F77DD', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>Multiple Linear Regression</div>
            <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--muted)', marginBottom: 10 }}>y = m₁x₁ + m₂x₂ + … + b</div>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
              Multiple input features. The model is a hyperplane in n-dimensional space. One coefficient
              per feature, one intercept. This is what you use in practice.
            </p>
          </div>
        </div>

        <CodeBlock code={`# Add more features to the dataset
df['traffic_score']    = np.random.uniform(1, 10, n_orders)    # 1=clear 10=gridlock
df['restaurant_prep']  = np.random.uniform(5, 25, n_orders)   # minutes to prepare

# Re-split with all features
X_multi = df[['distance_km', 'traffic_score', 'restaurant_prep']]
y = df['delivery_time_min']
X_tr, X_te, y_tr, y_te = train_test_split(X_multi, y, test_size=0.2, random_state=42)

# Training is identical — sklearn handles multiple features automatically
model_multi = LinearRegression()
model_multi.fit(X_tr, y_tr)

# Inspect coefficients — one per feature
for feature, coef in zip(X_multi.columns, model_multi.coef_):
    print(f"{feature:22s}: {coef:.3f}")
# distance_km           :  7.312  ← 7.3 min per km (as expected)
# traffic_score         :  0.891  ← each traffic point adds ~0.9 min
# restaurant_prep       :  0.998  ← 1 extra prep minute = 1 extra delivery minute

y_pred_multi = model_multi.predict(X_te)
print(f"\\nSimple LR R²:   {r2_score(y_test, y_pred):.3f}")        # ~0.78
print(f"Multiple LR R²: {r2_score(y_te, y_pred_multi):.3f}")      # ~0.92`} />
      </div>

      {/* ── SECTION 6: Assumptions ────────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>When to use it and when not to</span>
        <h2 style={h2}>Linear Regression assumptions — the honest version</h2>

        <p style={p}>
          Every statistics textbook lists Linear Regression assumptions in a way designed to make you feel
          like you need a PhD to check them. You do not. Here is each assumption in plain English, how to
          check it in 5 minutes, and what happens if it is violated.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 14 }}>
          {[
            {
              color: '#378ADD', title: 'Linearity',
              means: 'The relationship between your features and your target is approximately a straight line. If the true relationship is a curve, forcing a straight line through it produces systematic errors.',
              check: 'Plot each feature vs the target. If you see a clear curve, run a residual plot — if residuals curve instead of scatter randomly, linearity is violated.',
              bad: 'Predicting app revenue vs user count — early users grow revenue linearly but later users contribute less (saturation). LR underestimates at high user counts.',
              good: 'Distance vs delivery time — adding 1 km consistently adds ~7 minutes regardless of starting distance. The relationship is genuinely linear.',
            },
            {
              color: '#D85A30', title: 'No extreme outliers',
              means: 'Because errors are squared, a single extreme point can drag the line significantly toward itself. LR is not robust to outliers.',
              check: 'Box plots of each feature. Check for values more than 3 standard deviations from the mean. Plot residuals — outliers appear as isolated points far from zero.',
              bad: 'A 90-minute delivery (driver had an accident) treated as normal training data. The line tilts toward that point, making predictions slightly worse for all other orders.',
              good: 'After removing the 0.3% of orders with delivery_time > 90 minutes, the line fits the remaining 99.7% much more cleanly.',
            },
            {
              color: '#BA7517', title: 'No multicollinearity',
              means: 'Your features should not be highly correlated with each other. If distance_km and distance_miles are both in your model, the algorithm cannot separate their individual contributions.',
              check: 'Compute a correlation matrix: df.corr(). Features correlated above 0.85 with each other are a problem. Use VIF (Variance Inflation Factor) for a precise check.',
              bad: 'Including both distance_km and an estimated_travel_time_sec feature — they measure the same underlying thing. Coefficients become unstable and uninterpretable.',
              good: 'distance_km, restaurant_prep_time, and weather_severity are genuinely independent. Each measures something different. Coefficients are stable and interpretable.',
            },
            {
              color: '#7F77DD', title: 'Independence of errors',
              means: 'Errors for one prediction should not predict errors for another. If your model is always wrong at 7pm, those errors are correlated with time — and your model has missed a systematic pattern.',
              check: 'Plot residuals against time or any variable not in your model. A pattern means you are missing a feature. Random scatter means errors are independent.',
              bad: 'Errors are consistently positive (under-predicting) on Friday evenings. time_of_week is not in the model. Residuals correlate with hour_of_day.',
              good: 'After adding is_peak_hour, the Friday evening systematic error disappears. Residuals scatter randomly across all hours.',
            },
          ].map((a) => (
            <div key={a.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: `3px solid ${a.color}`, borderRadius: 10, padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.color, flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{a.title}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 10 }}><strong style={{ color: 'var(--text)' }}>What it means: </strong>{a.means}</p>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 12 }}><strong style={{ color: 'var(--text)' }}>How to check: </strong>{a.check}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div style={{ padding: '10px 12px', background: 'rgba(255,95,87,0.06)', border: '1px solid rgba(255,95,87,0.2)', borderRadius: 6 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#ff5f57', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>VIOLATED</div>
                  <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{a.bad}</p>
                </div>
                <div style={{ padding: '10px 12px', background: 'rgba(40,200,64,0.06)', border: '1px solid rgba(40,200,64,0.2)', borderRadius: 6 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#28c840', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>HOLDS</div>
                  <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{a.good}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 7: Errors ─────────────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>Errors you&apos;ll hit</span>
        <h2 style={h2}>Every error, explained and fixed</h2>

        <p style={p}>
          These are the errors you will encounter in your first few weeks. Every one of them is fixable
          in under five minutes once you know what caused it.
        </p>

        <ErrorBlock
          error="ValueError: Input contains NaN, infinity or a value too large for dtype('float64')"
          cause="You have missing values (NaN) or infinite values in your feature matrix. sklearn's LinearRegression does not handle missing values — it expects clean numerical input."
          fix="Run df.isnull().sum() to find which columns have missing values. Then handle them: df.fillna(df.median()) for numerical columns, df.dropna() if the fraction is tiny, or use sklearn's SimpleImputer in a Pipeline for production code."
        />
        <ErrorBlock
          error="ValueError: could not convert string to float: 'restaurant_name'"
          cause="You included a categorical (text) column in your feature matrix X. LinearRegression can only work with numbers. 'restaurant_name' is still a string."
          fix="Encode categorical features before training. For low-cardinality categoricals: pd.get_dummies(df, columns=['restaurant_name']). For high-cardinality: use OrdinalEncoder or TargetEncoder from sklearn.preprocessing."
        />
        <ErrorBlock
          error="ValueError: X has 1 feature, but LinearRegression is expecting 3 features as input"
          cause="The model was trained on 3 features but you are passing 1 feature at inference time. Feature names or counts do not match between training and prediction."
          fix="Use an sklearn Pipeline that includes your preprocessing steps. This guarantees the same transformations run at training and inference time. Alternatively: always build X for inference the same way you built X_train — same column order, same column names."
        />
        <ErrorBlock
          error="R² score is negative"
          cause="Negative R² means your model is worse than just predicting the mean for every order. Four possible causes: (1) you evaluated on training data accidentally, (2) features and target are not aligned — index mismatch after filtering, (3) severe outliers pulling the line to a useless position, (4) the relationship is genuinely non-linear."
          fix="Check each cause in order: verify you are calling score(X_test, y_test) not score(X_train, y_train). Reset dataframe indexes after filtering with .reset_index(drop=True). Check for and remove extreme outliers. Plot the data — if it curves, try polynomial features or switch to a tree-based model."
        />
        <ErrorBlock
          error="MAE on test set is 5× higher than on training set"
          cause="Classic overfitting. Your model has memorised the training data instead of learning generalizable patterns. Linear Regression rarely overfits severely, but it can happen with many engineered features that are specific to the training period."
          fix="Add regularisation: switch to Ridge (L2) or Lasso (L1) regression. Ridge penalises large coefficients; Lasso can zero them out entirely. Both are in sklearn.linear_model. Start with Ridge(alpha=1.0) and tune alpha with cross-validation."
        />
        <ErrorBlock
          error="Predictions are systematically too high for short distances and too low for long distances"
          cause="The relationship between distance and delivery time is not linear. Short-distance orders have a fixed cost (restaurant prep, handover) that dominates. Long-distance orders may benefit from faster roads. A straight line cannot capture this."
          fix="Add polynomial features: from sklearn.preprocessing import PolynomialFeatures, then pipe it before LinearRegression. Or switch to a tree-based model (Decision Tree, XGBoost) that naturally captures non-linear patterns without feature engineering."
        />
      </div>

      {/* ── SECTION 8: What this looks like at work ───────────────────────── */}
      <div style={sec}>
        <span style={tag}>What this looks like at work</span>
        <h2 style={h2}>Day one. You&apos;ve just joined DoorDash&apos;s data team.</h2>

        <p style={p}>
          Your manager shares a Notion doc: &quot;Current ETA accuracy is ±12 minutes. We need ±5 minutes
          within Q2. You have access to 6 months of BigQuery order data. Go.&quot;
        </p>
        <p style={p}>
          Here is what the actual week looks like — not the sanitised tutorial version.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12, margin: '28px 0' }}>
          {[
            {
              day: 'Mon', color: '#378ADD', title: 'Data pull and exploration',
              bullets: [
                'Write BigQuery SQL to pull 6 months of completed orders with distance, time, restaurant_id, weather, hour_of_day',
                'Export to pandas. df.shape returns (1,847,332, 23). Run df.describe() and df.isnull().sum()',
                'Find: restaurant_prep_time is 18% null (never logged for partner restaurants). weather_code missing before March',
                'Slack your lead: "prep_time has 18% nulls — impute with restaurant median or drop the feature?" Decision needed before Tuesday',
              ],
            },
            {
              day: 'Tue', color: '#1D9E75', title: 'Feature analysis and first baseline',
              bullets: [
                'Decision back: impute with restaurant median. Write imputation code with a comment explaining why',
                'Baseline: always predict median delivery time (31 min). MAE = 11.2 minutes. This is the bar to beat',
                'Simple LR on distance_km only. MAE = 6.8 minutes. Already a 39% improvement over baseline',
                'Plot residuals. Find: model over-predicts for short distances (< 1.5 km). Something non-linear at the short end',
              ],
            },
            {
              day: 'Wed', color: '#D85A30', title: 'Multiple LR and the real breakthrough',
              bullets: [
                'Add 5 more features: restaurant_prep_time, hour_of_day, day_of_week, weather_severity, rider_count_nearby',
                'Multiple LR: MAE = 4.9 minutes. Just below the ±5 minute target. Check correlation matrix — no multicollinearity issues',
                'Residual plot reveals: model still systematically under-predicts 7–9pm. is_peak_hour not in model',
                'Add is_peak_hour binary feature. MAE drops to 4.1 minutes. R² = 0.81. Target met with room to spare',
              ],
            },
            {
              day: 'Thu', color: '#BA7517', title: 'Cross-validation and documentation',
              bullets: [
                'Run 5-fold cross-validation to confirm 4.1 MAE is stable, not lucky on one split. All folds: 3.9–4.3 MAE. Stable',
                'Check assumptions: linearity (residual plot looks good), no major outliers (removed top 0.1%), no multicollinearity confirmed',
                'Write up findings: baseline → simple LR → multiple LR → peak hour feature. Each step with the MAE improvement',
                'Build a single presentation slide: before/after, feature importances, what happens if model degrades',
              ],
            },
            {
              day: 'Fri', color: '#7F77DD', title: 'Present and get sign-off',
              bullets: [
                'Present to lead and product manager. Walk through the 5-step improvement story. Show the residual plots',
                'Likely questions: "What happens at 3 months when weather patterns change?" → plan automated monthly retraining',
                '"Can we interpret why the model predicts high for some restaurants?" → show per-restaurant coefficient analysis',
                'Get sign-off. Hand off to ML engineer for production deployment. Your job: monitor MAE weekly and flag if it drifts above 5.5',
              ],
            },
          ].map((d, i) => (
            <div key={d.day} style={{
              display: 'flex', gap: 16, alignItems: 'flex-start',
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '16px 18px',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                background: `${d.color}18`, border: `2px solid ${d.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: d.color, fontFamily: 'var(--font-mono)',
              }}>
                {d.day}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8, fontFamily: 'var(--font-display)' }}>{d.title}</div>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 5 }}>
                  {d.bullets.map((b, bi) => (
                    <div key={bi} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: d.color, flexShrink: 0, marginTop: 7 }} />
                      <span style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.65 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Highlight color="#1D9E75">
          <strong style={{ color: 'var(--text)' }}>The thing no tutorial tells you: </strong>
          in a real job the hardest part was Monday — getting the data, understanding what each column
          actually means, finding undocumented data quality issues, waiting for a decision on the 18% null
          problem before you can move forward. The modelling on Wednesday took 4 hours. The data work took
          2 days. This is always the ratio. Data engineering is not a prerequisite you get past — it is
          half the job, every week.
        </Highlight>
      </div>

      {/* ── SECTION 9: Misconceptions ──────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>Misconceptions</span>
        <h2 style={h2}>Five things people get wrong about Linear Regression</h2>

        <ConceptBox title="Myth: checking linearity, outliers, and multicollinearity covers every assumption" color="#ff4757">
          <p style={{ ...ps, marginBottom: 0 }}>
            Two more assumptions get silently violated far more often than the ones on this page's
            assumptions table: homoscedasticity (residual variance stays roughly constant across the
            range of predictions) and normality of the residuals. Homoscedasticity is checked with the
            same residual-versus-predicted plot from Step 7 above — look specifically for a fan or cone
            shape, spread widening as predictions grow, which shows up constantly in real-world data
            where absolute error naturally scales with the size of the thing being predicted, like larger
            orders having proportionally larger errors. Normality of residuals is checked with a Q-Q plot
            comparing residual quantiles to a theoretical normal distribution, and it mainly affects
            whether confidence intervals and p-values on the coefficients can be trusted, not the
            accuracy of the point predictions themselves. Both drift in gradually and are easy to miss
            unless you deliberately plot for them.
          </p>
        </ConceptBox>

        <ConceptBox title="Myth: an R squared close to 1 means the model is correct, or that the relationship is causal" color="#ff4757">
          <p style={{ ...ps, marginBottom: 0 }}>
            R squared only measures how much of this particular sample's variance in the target the
            fitted line accounts for — it says nothing about whether the model's assumptions hold,
            whether it will generalise to new orders, or why the relationship exists. The Multiple Linear
            Regression example earlier on this page reaches an R squared around 0.92 by adding
            traffic_score and restaurant_prep; that number looks identical whether traffic genuinely
            slows deliveries or whether traffic simply happens to be measured at the same times as some
            other unmodelled cause of delay. A high R squared earned on training data specifically can
            also just mean the model memorised patterns that will not hold on the held-out test set,
            which is exactly why this page insists on splitting the data before ever looking at R squared
            at all.
          </p>
        </ConceptBox>

        <ConceptBox title="Myth: multicollinearity between features makes a model's predictions unreliable" color="#ff4757">
          <p style={{ ...ps, marginBottom: 0 }}>
            Multicollinearity mainly damages your ability to interpret individual coefficients, not the
            accuracy of the combined prediction. If distance_km and an estimated_travel_time feature are
            highly correlated, the model can split credit between them almost arbitrarily — one fit might
            give most of the weight to distance and a little to travel time, another equally valid fit
            might reverse that split — while the combined contribution to any given prediction stays
            nearly the same either way. That instability is a real problem if the goal is explaining
            which feature drives delivery time, but if the only goal is minimising prediction error on
            data that resembles the training distribution, a collinear model can predict just as well as
            one with a redundant feature removed. The real danger shows up later: if the correlation
            between those features shifts in production away from what training data showed, a model
            that leaned on that correlation can degrade sharply.
          </p>
        </ConceptBox>

        <ConceptBox title="Myth: adding more features can only help, or at worst not hurt, R squared" color="#ff4757">
          <p style={{ ...ps, marginBottom: 0 }}>
            Ordinary Least Squares fits parameters by minimising squared error on whatever training data
            it is given, and handing it one more column — even a genuinely useless one, like a random
            number generator's output — gives the optimiser strictly more freedom to reduce that training
            error further. R squared on the training set is mathematically guaranteed to only increase or
            stay flat as features are added; it can never go down. That is exactly why adjusted R squared
            exists: it subtracts a penalty that grows with the number of predictors relative to the
            sample size, so a feature that is not pulling its weight can push adjusted R squared down
            even while plain R squared ticks up. Comparing models with different feature counts using
            plain R squared instead of the adjusted version, or instead of test set performance, is one of
            the most common ways beginners convince themselves a bigger model is a better one.
          </p>
        </ConceptBox>

        <ConceptBox title="Myth: a large, significant coefficient means that feature causes the outcome" color="#ff4757">
          <p style={{ ...ps, marginBottom: 0 }}>
            A fitted coefficient captures the association between a feature and the target after
            accounting for whatever other features happen to be in the model, on this particular
            dataset — it is a correlational quantity, not a causal one, no matter how large or stable it
            looks. If a restaurant_popularity feature came out with a large positive coefficient on
            delivery time, the honest read is only that popular restaurants and long delivery times moved
            together in this data; a very plausible alternative story is that popular restaurants get
            overwhelmed with orders and understaff their kitchen during exactly those busy hours — a
            confounder, not an effect of popularity itself. Distance is the rare feature on this page
            where correlation and causation likely do line up, since physically travelling further
            mechanically takes more time, but that confidence comes from reasoning about how delivery
            works in the real world, not from anything the regression itself proved. Establishing
            causation in general needs a controlled experiment or a dedicated causal-inference method,
            never a coefficient by itself.
          </p>
        </ConceptBox>
      </div>

      {/* ── SECTION 10: Interview prep ─────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>Interview prep</span>
        <h2 style={h2}>Linear Regression — 5 questions interviewers actually ask</h2>

        <ConceptBox title="Q1 — How would you actually check whether the assumptions of linear regression hold for a given dataset?">
          <p style={{ ...ps, marginBottom: 0 }}>
            I would check each one with a specific diagnostic rather than assuming from a scatter plot.
            Linearity and homoscedasticity both show up in a residuals-versus-predicted-values plot: a
            random cloud centred on zero with roughly constant spread supports both, a curved pattern
            means the true relationship is not linear, and a fan or cone shape means variance is not
            constant. Normality of residuals is checked with a Q-Q plot comparing residual quantiles to a
            theoretical normal distribution, and it mainly affects whether confidence intervals and
            p-values on the coefficients can be trusted, not the point predictions themselves.
            Independence of errors is checked by plotting residuals against time, order, or any variable
            outside the model — a pattern there means a systematic effect is missing from the model.
            Multicollinearity is checked with a correlation matrix or, more precisely, Variance Inflation
            Factor. I would emphasise that violated assumptions in ordinary least squares mostly threaten
            how much you can trust the model's inference — its confidence intervals, its p-values, how
            interpretable individual coefficients are — while the point predictions themselves can often
            still be reasonably useful even under a moderate violation.
          </p>
        </ConceptBox>

        <ConceptBox title="Q2 — Your model gets an R squared of 0.95 on evaluation. Does that mean it's a good model?">
          <p style={{ ...ps, marginBottom: 0 }}>
            R squared alone does not answer that, and I would ask a few things before trusting it. First,
            is 0.95 measured on a held-out test set or on the training data — a strong score on training
            data alone says almost nothing about generalisation, and the gap between training and test R
            squared is often more informative than either number alone. Second, how does it compare to a
            naive baseline, such as always predicting the mean — a workflow like the DoorDash example on
            this page always computes that baseline MAE first specifically so a strong-looking metric can
            be judged against a floor. Third, a high R squared does not validate the model's assumptions
            or imply the relationships found are causal; it is entirely possible to reach a high R squared
            with a leaked feature that is only available because the outcome already happened, or with a
            relationship that will not hold once the underlying data distribution shifts. I would want to
            see the baseline comparison, the train-versus-test gap, and a residual plot before calling
            0.95 good rather than lucky or leaky.
          </p>
        </ConceptBox>

        <ConceptBox title="Q3 — What's the difference between R squared and adjusted R squared, and why does the adjusted version exist?">
          <p style={{ ...ps, marginBottom: 0 }}>
            R squared can only increase or stay the same as you add features to an Ordinary Least Squares
            model, because the optimiser is minimising training error and an extra column — even a
            useless one — gives it strictly more freedom to reduce that error further; there is no
            mechanism by which adding a feature can make training R squared go down. Adjusted R squared
            fixes this by including a penalty term that grows with the number of predictors relative to
            the number of observations, so a feature that does not meaningfully reduce error can cause
            adjusted R squared to fall even while plain R squared rises slightly. In practice I use
            adjusted R squared, or better, held-out test performance, whenever I am comparing two models
            with different numbers of features, since plain R squared is always biased toward the larger
            model regardless of whether the extra features are genuinely useful.
          </p>
        </ConceptBox>

        <ConceptBox title="Q4 — Two of your features are highly correlated. What actually goes wrong, and does it matter for a production model?">
          <p style={{ ...ps, marginBottom: 0 }}>
            The core issue is that the model can no longer cleanly separate how much each of the two
            correlated features individually contributes, because many different splits of coefficient
            weight between them produce almost the same combined prediction — that makes individual
            coefficients unstable and their standard errors unreliable, so a statement like "feature A
            matters twice as much as feature B" cannot be trusted when the two are highly collinear.
            Whether it matters in production depends on the goal: if the job is explaining which factor
            drives the outcome, this is a real problem, and I would drop one of the redundant features,
            combine them, or use a regularised model like Ridge regression, which handles correlated
            features more gracefully by shrinking coefficients instead of letting them swing to extreme,
            unstable values. If the job is purely predictive accuracy on data that resembles the training
            distribution, collinearity by itself often does not hurt performance much, since the model
            still captures the combined effect correctly — the real danger is that if the correlation
            between those features breaks down in future data in a way it never did during training, a
            model that leaned on that correlation can degrade sharply.
          </p>
        </ConceptBox>

        <ConceptBox title="Q5 — Your model finds distance_km has a coefficient of about 7.3 minutes per kilometre. Can you say distance causes the delivery time increase?">
          <p style={{ ...ps, marginBottom: 0 }}>
            A coefficient from a fitted regression is an association conditional on whatever other
            features happen to be in the model, on this particular dataset — by itself it is not proof of
            causation, no matter how large, stable, or statistically significant it looks. The honest
            process is to ask whether a plausible confounder could produce the same pattern without a
            causal link, and in general that is a real risk: a feature like restaurant popularity
            correlating with delivery time could easily be driven by understaffed kitchens during that
            restaurant's busiest hours rather than popularity itself causing delay. Distance is actually
            one of the more defensible cases for a near-causal read, since travelling a longer physical
            distance mechanically takes more time regardless of any other variable, and that mechanical
            story exists independently of the regression. But that confidence comes from domain reasoning
            about how delivery physically works, not from the coefficient itself — to establish causation
            rigorously in the general case, you would want a randomised experiment or a dedicated causal
            inference method, not just a large coefficient in an observational dataset.
          </p>
        </ConceptBox>
      </div>

      {/* ── KEY TAKEAWAYS ─────────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'Linear Regression finds the line that minimises the sum of squared errors (OLS). "Least squares" is the name of that objective.',
        'The trained model is just two numbers: model.coef_ (one slope per feature) and model.intercept_. Prediction = dot product of weights and features + intercept.',
        'Always split 80/20 before touching the model. Never evaluate on training data. Never make decisions based on test set performance — use validation or cross-validation.',
        'Report three metrics: MAE (interpretable, same units as target), RMSE (penalises large errors), R² (fraction of variance explained). Always compare to a naive baseline.',
        'Four assumptions to check: linearity (scatter plot), no extreme outliers (box plot), no multicollinearity (correlation matrix), independence of errors (residual plot vs time).',
        'sklearn interface is always the same: instantiate → fit(X_train, y_train) → predict(X_test). Every algorithm in this section follows this pattern.',
      ]} />

    </LearnLayout>
  )
}
