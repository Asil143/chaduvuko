import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Linear Regression — Chaduvuko',
  description:
    'Linear Regression explained from scratch. Build a Swiggy delivery time predictor step by step — intuition, math, full Python code, real errors, and what it looks like at work.',
  openGraph: {
    title: 'Linear Regression — Chaduvuko',
    description:
      'The first ML algorithm — explained with Swiggy delivery time prediction. Full working code, real errors, salary context.',
    url: 'https://chaduvuko.com/learn/ai-ml/classical-ml/linear-regression',
  },
}

// ─── Style tokens ─────────────────────────────────────────────────────────────

const S = {
  sectionTag: {
    fontSize: 11,
    fontWeight: 700 as const,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: 'var(--accent)',
    fontFamily: 'var(--font-mono)',
    display: 'block' as const,
    marginBottom: 10,
  },
  h2: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(20px, 3vw, 30px)',
    fontWeight: 900 as const,
    letterSpacing: '-1.2px',
    color: 'var(--text)',
    marginBottom: 14,
    lineHeight: 1.15,
  },
  h3: {
    fontFamily: 'var(--font-display)',
    fontSize: 18,
    fontWeight: 700 as const,
    letterSpacing: '-0.5px',
    color: 'var(--text)',
    marginBottom: 10,
    marginTop: 28,
  },
  p: {
    fontSize: 15,
    color: 'var(--muted)',
    lineHeight: 1.85,
    marginBottom: 16,
  },
  pSmall: {
    fontSize: 13,
    color: 'var(--muted)',
    lineHeight: 1.8,
    marginBottom: 12,
  },
  section: {
    paddingBottom: 56,
    paddingTop: 8,
    borderBottom: '1px solid var(--border)',
  },
  code: {
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 4,
    padding: '1px 6px',
    color: 'var(--accent)',
  },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionDivider() {
  return <div style={{ height: 56 }} />
}

function HighlightBox({
  children,
  color = 'var(--accent)',
}: {
  children: React.ReactNode
  color?: string
}) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderLeft: `3px solid ${color}`,
      borderRadius: 8,
      padding: '14px 18px',
      marginBottom: 20,
    }}>
      {children}
    </div>
  )
}

function CodeBlock({
  code,
  language = 'python',
}: {
  code: string
  language?: string
}) {
  return (
    <div style={{
      background: 'var(--bg2)',
      border: '1px solid var(--border)',
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 24,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
      }}>
        <span style={{
          fontSize: 10,
          fontWeight: 700,
          color: 'var(--muted)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
        }}>
          {language}
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: '50%', background: c,
            }} />
          ))}
        </div>
      </div>
      <pre style={{
        padding: '20px 20px',
        margin: 0,
        overflowX: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        lineHeight: 1.75,
        color: 'var(--text)',
      }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

function ErrorBlock({
  error,
  cause,
  fix,
}: {
  error: string
  cause: string
  fix: string
}) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 12,
    }}>
      <div style={{
        padding: '9px 14px',
        background: 'rgba(226,75,74,0.08)',
        borderBottom: '1px solid var(--border)',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: '#ff4757',
        fontWeight: 600,
      }}>
        {error}
      </div>
      <div style={{ padding: '10px 14px' }}>
        <div style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.07em',
          textTransform: 'uppercase' as const,
          color: 'var(--muted)',
          fontFamily: 'var(--font-mono)',
          marginBottom: 4,
        }}>
          Why it happens
        </div>
        <p style={{ ...S.pSmall, marginBottom: 10 }}>{cause}</p>
        <div style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.07em',
          textTransform: 'uppercase' as const,
          color: '#00e676',
          fontFamily: 'var(--font-mono)',
          marginBottom: 4,
        }}>
          Fix
        </div>
        <p style={{ ...S.pSmall, marginBottom: 0 }}>{fix}</p>
      </div>
    </div>
  )
}

function MathBox({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 24,
    }}>
      <div style={{
        padding: '10px 16px',
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <div style={{
          width: 5, height: 5, borderRadius: '50%',
          background: '#7F77DD', flexShrink: 0,
        }} />
        <span style={{
          fontSize: 11, fontWeight: 700,
          color: '#7F77DD', fontFamily: 'var(--font-mono)',
          letterSpacing: '0.08em', textTransform: 'uppercase' as const,
        }}>
          {title}
        </span>
        <span style={{
          fontSize: 10, color: 'var(--muted)',
          marginLeft: 'auto',
        }}>
          optional deeper understanding
        </span>
      </div>
      <div style={{ padding: '16px 20px', background: 'var(--bg2)' }}>
        {children}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LinearRegressionPage() {
  return (
    <LearnLayout
      title="Linear Regression"
      description="The simplest ML algorithm — and the most important one to truly understand. Build a Swiggy delivery time predictor from scratch."
      section="Classical ML"
      readTime="30–35 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="classical-ml" topic="linear-regression" />

      {/* ══ SECTION 1 — THE HOOK ═══════════════════════════════════════════════ */}
      <div style={S.section}>
        <span style={S.sectionTag}>The problem</span>
        <h2 style={S.h2}>
          Swiggy needs a number. You need to give them one.
        </h2>

        <p style={S.p}>
          You're a data scientist at Swiggy. Your lead drops a CSV on your desk —
          10,000 completed delivery orders. Each row has the distance from restaurant
          to customer (in kilometres) and how long the actual delivery took (in minutes).
          The ask: build something that can predict delivery time for a new order,
          given only the distance.
        </p>

        <p style={S.p}>
          You open the file and look at a few rows:
        </p>

        <div style={{
          border: '1px solid var(--border)',
          borderRadius: 8,
          overflow: 'hidden',
          marginBottom: 24,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            background: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
            padding: '8px 16px',
          }}>
            {['order_id', 'distance_km', 'delivery_time_min'].map((h) => (
              <span key={h} style={{
                fontSize: 11, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)',
              }}>
                {h}
              </span>
            ))}
          </div>
          {[
            ['SW001', '1.2', '18'],
            ['SW002', '3.8', '32'],
            ['SW003', '2.1', '24'],
            ['SW004', '5.6', '47'],
            ['SW005', '0.8', '14'],
            ['SW006', '4.2', '38'],
            ['...', '...', '...'],
          ].map((row, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              padding: '7px 16px',
              borderBottom: i < 6 ? '1px solid var(--border)' : 'none',
              background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
            }}>
              {row.map((cell, j) => (
                <span key={j} style={{
                  fontSize: 12, color: j === 0 ? 'var(--muted)' : 'var(--text)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>

        <p style={S.p}>
          You notice something immediately: longer distances mean longer delivery times.
          There's a pattern. It's not perfect — some short distances still took a while,
          maybe because the restaurant was slow or traffic was bad. But the relationship
          is clearly there.
        </p>

        <HighlightBox>
          <p style={{ ...S.p, marginBottom: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              Linear Regression is the algorithm that captures exactly this:
            </span>{' '}
            a relationship between one number (distance) and another number (delivery time).
            It draws the best possible straight line through your data points.
            Once that line exists, predicting delivery time for any distance is
            just reading off the line.
          </p>
        </HighlightBox>
      </div>

      <SectionDivider />

      {/* ══ SECTION 2 — THE INTUITION ══════════════════════════════════════════ */}
      <div style={S.section}>
        <span style={S.sectionTag}>The intuition</span>
        <h2 style={S.h2}>
          Drawing the best line through messy data
        </h2>

        <p style={S.p}>
          Imagine plotting every one of those 10,000 orders on a graph.
          The x-axis is distance. The y-axis is delivery time.
          Each order is a dot. You'd see a cloud of dots drifting upward
          from left to right — closer deliveries in the bottom-left,
          farther deliveries in the top-right, with a lot of scatter in between.
        </p>

        <p style={S.p}>
          Now imagine drawing a straight line through that cloud.
          Not connecting any specific dots — just one line that goes through the
          middle of the whole swarm, capturing the general upward trend.
          That line is your model. To predict delivery time for a new order
          with distance 3.5km, you find 3.5 on the x-axis, go straight up
          to the line, and read off the y-value. Done.
        </p>

        <p style={S.p}>
          The only question is: which line is the <em>best</em> line?
          You could draw infinitely many lines through that cloud.
          Linear Regression's entire job is to find the one specific line
          that is closest to all the data points simultaneously.
        </p>

        <h3 style={S.h3}>What "closest to all points" actually means</h3>

        <p style={S.p}>
          For any line you draw, each data point sits either above or below it.
          The vertical distance from a point to the line is the error for that order —
          how wrong the line's prediction was for that particular delivery.
          A point above the line means the line predicted too low.
          A point below means the line predicted too high.
        </p>

        <p style={S.p}>
          Linear Regression finds the line that minimises the sum of all these errors
          across every data point. Not the sum of the errors directly — that would
          let negative errors cancel out positive ones. Instead: the sum of the
          <em> squared</em> errors. This is called the{' '}
          <span style={S.code as React.CSSProperties}>Mean Squared Error</span>{' '}
          or MSE. Squaring does two things: it makes all errors positive, and it
          penalises large errors more than small ones.
        </p>

        <HighlightBox color="#378ADD">
          <p style={{ ...S.pSmall, marginBottom: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              The core concept in one sentence:{' '}
            </span>
            Linear Regression finds the straight line that minimises the sum of
            squared vertical distances between the line and every data point.
            That line is your prediction machine.
          </p>
        </HighlightBox>

        <h3 style={S.h3}>The line has two numbers — that's the whole model</h3>

        <p style={S.p}>
          Every straight line can be completely described by two numbers:
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          marginBottom: 24,
        }}>
          {[
            {
              symbol: 'm',
              name: 'Slope (weight / coefficient)',
              desc: 'How much does delivery time increase for each extra kilometre? If the slope is 7, then every additional km adds 7 minutes to the predicted delivery time. This is what the model learned from the data.',
              color: '#378ADD',
            },
            {
              symbol: 'b',
              name: 'Intercept (bias)',
              desc: 'What is the predicted delivery time when distance is 0? In practice, this captures the baseline time — restaurant packing, handoff to delivery partner, even a 0km order takes some time.',
              color: '#1D9E75',
            },
          ].map((item) => (
            <div key={item.symbol} style={{
              background: 'var(--surface)',
              border: `1px solid ${item.color}40`,
              borderRadius: 8,
              padding: '14px 16px',
            }}>
              <div style={{
                fontSize: 28, fontWeight: 900, color: item.color,
                fontFamily: 'var(--font-mono)', marginBottom: 6,
                letterSpacing: '-1px',
              }}>
                {item.symbol}
              </div>
              <div style={{
                fontSize: 12, fontWeight: 700, color: 'var(--text)',
                marginBottom: 6, fontFamily: 'var(--font-display)',
              }}>
                {item.name}
              </div>
              <p style={{ ...S.pSmall, marginBottom: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <p style={S.p}>
          So the entire Linear Regression model for Swiggy delivery time is just:
        </p>

        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: '16px 20px',
          marginBottom: 24,
          fontFamily: 'var(--font-mono)',
          fontSize: 15,
          color: 'var(--text)',
          textAlign: 'center' as const,
          letterSpacing: '0.02em',
        }}>
          delivery_time = <span style={{ color: '#378ADD' }}>slope</span>{' '}
          × distance + <span style={{ color: '#1D9E75' }}>intercept</span>
        </div>

        <p style={S.p}>
          After training on the 10,000 orders, suppose the model finds slope = 7.3
          and intercept = 8.6. Then for a new order with distance 4km:
        </p>

        <div style={{
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: '14px 20px',
          marginBottom: 24,
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          color: 'var(--muted)',
          lineHeight: 1.9,
        }}>
          delivery_time = 7.3 × 4 + 8.6<br />
          delivery_time = 29.2 + 8.6<br />
          delivery_time = <span style={{ color: 'var(--accent)', fontWeight: 700 }}>37.8 minutes</span>
        </div>

        <Callout type="tip">
          Real Swiggy models use dozens of features — not just distance. But the core
          idea is identical whether you have 1 feature or 100. With multiple features,
          instead of a line you're fitting a flat plane (or hyperplane). The math extends
          naturally. That's Multiple Linear Regression — we cover it right after this.
        </Callout>
      </div>

      <SectionDivider />

      {/* ══ SECTION 3 — THE MATH ═══════════════════════════════════════════════ */}
      <div style={S.section}>
        <span style={S.sectionTag}>The math (optional — but worth understanding)</span>
        <h2 style={S.h2}>
          How the algorithm actually finds the best line
        </h2>

        <p style={S.p}>
          You understand the intuition: find the line that minimises squared errors.
          But how does the algorithm actually find it? There are two approaches —
          one uses calculus, one uses brute-force optimisation. Knowing both
          makes you dangerous in interviews.
        </p>

        <MathBox title="Approach 1 — Ordinary Least Squares (OLS)">
          <p style={{ ...S.pSmall, marginBottom: 14 }}>
            For simple linear regression (one feature), there's a closed-form solution —
            a direct formula that gives you the exact slope and intercept with no iteration needed.
          </p>

          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '14px 16px',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            color: 'var(--text)',
            lineHeight: 2,
            marginBottom: 12,
          }}>
            <div style={{ color: '#378ADD', marginBottom: 4 }}>
              slope (m) = Σ[(xᵢ - x̄)(yᵢ - ȳ)] / Σ[(xᵢ - x̄)²]
            </div>
            <div style={{ color: '#1D9E75' }}>
              intercept (b) = ȳ - m × x̄
            </div>
          </div>

          <p style={{ ...S.pSmall, marginBottom: 0 }}>
            Where x̄ is the mean distance, ȳ is the mean delivery time, xᵢ and yᵢ
            are individual values. In plain English: the slope is the covariance
            of x and y divided by the variance of x. Sklearn computes this for
            you — but knowing it exists explains why Linear Regression is
            instantaneous to train even on large datasets.
          </p>
        </MathBox>

        <MathBox title="Approach 2 — Gradient Descent">
          <p style={{ ...S.pSmall, marginBottom: 14 }}>
            For problems with many features, OLS becomes computationally expensive.
            Gradient Descent is the alternative — and it's the same mechanism
            used in every neural network, so understanding it now pays off enormously.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
            {[
              { step: '1', text: 'Start with random slope and intercept — say m=0, b=0.' },
              { step: '2', text: 'Make predictions for all training examples using current m and b.' },
              { step: '3', text: 'Calculate the MSE loss — how wrong are the predictions on average?' },
              { step: '4', text: 'Calculate the gradient of the loss with respect to m and b. This tells you which direction to adjust each parameter to reduce the loss.' },
              { step: '5', text: 'Take a small step in the opposite direction of the gradient. The size of the step is controlled by the learning rate hyperparameter.' },
              { step: '6', text: 'Repeat steps 2–5 thousands of times until the loss stops decreasing significantly.' },
            ].map((item) => (
              <div key={item.step} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(127,119,221,0.15)',
                  border: '1px solid rgba(127,119,221,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, color: '#7F77DD',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {item.step}
                </div>
                <p style={{ ...S.pSmall, marginBottom: 0, paddingTop: 2 }}>{item.text}</p>
              </div>
            ))}
          </div>

          <p style={{ ...S.pSmall, marginBottom: 0 }}>
            Gradient Descent has its own dedicated page later in this section.
            For now, the key insight: it's how every ML model adjusts itself to
            reduce its own error. Linear Regression, neural networks, transformers —
            all use some form of gradient descent during training.
          </p>
        </MathBox>

        <Callout type="info">
          Sklearn's <span style={S.code as React.CSSProperties}>LinearRegression()</span>{' '}
          uses OLS by default for small datasets. For very large datasets or regularised
          variants, it switches to gradient descent internally. You don't need to choose —
          sklearn handles it. But now you know what it's doing under the hood.
        </Callout>
      </div>

      <SectionDivider />

      {/* ══ SECTION 4 — THE CODE ═══════════════════════════════════════════════ */}
      <div style={S.section}>
        <span style={S.sectionTag}>The code</span>
        <h2 style={S.h2}>
          Build the Swiggy delivery predictor — step by step
        </h2>

        <p style={S.p}>
          Every line below is explained. Not "this is what it does" but
          "this is why we're doing it, what happens if we don't,
          and what you'd see in production code at a real company."
        </p>

        <h3 style={S.h3}>Step 1 — Create the dataset</h3>

        <p style={S.p}>
          In a real job you'd pull this from a database or data warehouse.
          Here we generate realistic data so you can run this on any machine
          without any external files.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Seed ensures you get the same "random" data every time you run this.
# Always set a seed in experiments — reproducibility matters.
np.random.seed(42)

n_orders = 1000  # 1000 completed Swiggy orders

# Distance: between 0.5km and 8km
distance_km = np.random.uniform(0.5, 8.0, n_orders)

# Delivery time: mostly driven by distance, but with real-world noise.
# noise simulates traffic, restaurant delays, delivery partner variability.
noise = np.random.normal(0, 4, n_orders)  # ±4 min standard deviation
delivery_time_min = 8.6 + 7.3 * distance_km + noise

# Build a DataFrame — always work with DataFrames, not raw arrays.
# Column names should be self-documenting.
df = pd.DataFrame({
    'distance_km': distance_km,
    'delivery_time_min': delivery_time_min,
})

print(df.describe())
# distance_km: mean ~4.25km, delivery_time_min: mean ~39.6 min
# Always run describe() first — outliers and unexpected ranges show up here`}
        />

        <h3 style={S.h3}>Step 2 — Look at the data before touching it</h3>

        <p style={S.p}>
          This step is non-negotiable. Every experienced ML engineer looks at the data
          before writing a single model line. Plotting it takes 3 lines.
          Skipping it costs hours of debugging later.
        </p>

        <CodeBlock code={`# Plot: do distance and delivery time actually have a linear relationship?
# If this plot shows a curve, linear regression is the wrong tool.
plt.figure(figsize=(8, 5))
plt.scatter(df['distance_km'], df['delivery_time_min'],
            alpha=0.4, s=15, color='#378ADD')
plt.xlabel('Distance (km)')
plt.ylabel('Delivery time (minutes)')
plt.title('Swiggy: Distance vs Delivery Time')
plt.grid(True, alpha=0.3)
plt.show()

# What you should see: a clear upward trend with scatter.
# If you saw NO trend: linear regression would be useless here.
# If you saw a curve: you'd need polynomial regression instead.
# Always look before you fit.`}
        />

        <h3 style={S.h3}>Step 3 — Split into training and test sets</h3>

        <p style={S.p}>
          This is the single most important step beginners skip.
          If you train and evaluate on the same data, you're measuring how well
          the model memorised your data — not how well it predicts new orders.
          In production, every prediction is on data the model has never seen.
          Your evaluation must simulate that.
        </p>

        <CodeBlock code={`# X = features (inputs), y = target (what we're predicting)
# sklearn convention: X is uppercase (matrix), y is lowercase (vector)
X = df[['distance_km']]       # double brackets → DataFrame, not Series
y = df['delivery_time_min']   # single bracket → Series is fine for target

# 80% for training, 20% for testing
# random_state=42 means the split is the same every run → reproducible
# test_size=0.2 is the standard starting point
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

print(f"Training orders: {len(X_train)}")   # 800
print(f"Test orders:     {len(X_test)}")    # 200

# The model will ONLY see X_train and y_train during training.
# X_test and y_test are locked away until final evaluation.
# Treat the test set like the answer sheet — don't peek.`}
        />

        <Callout type="warning">
          Never use test data to make any decisions during model development —
          not for choosing hyperparameters, not for feature selection, nothing.
          Once you peek at test data, it's no longer a clean evaluation.
          Use a validation set (or cross-validation) for development decisions.
          The test set is used exactly once: final evaluation.
        </Callout>

        <h3 style={S.h3}>Step 4 — Train the model</h3>

        <p style={S.p}>
          Three lines. That's all sklearn needs. But knowing what each line
          is doing mechanically is what separates someone who can explain their
          work from someone who just runs notebooks.
        </p>

        <CodeBlock code={`# Instantiate the model — no learning has happened yet.
# This just creates the model object with default settings.
model = LinearRegression()

# THIS is where learning happens.
# fit() takes the training features and correct answers,
# runs OLS (or gradient descent) to find the optimal slope and intercept,
# and stores those values inside the model object.
model.fit(X_train, y_train)

# Inspect what the model learned
print(f"Slope (coefficient): {model.coef_[0]:.4f}")
# → should be close to 7.3 (the true value we used to generate the data)

print(f"Intercept:           {model.intercept_:.4f}")
# → should be close to 8.6 (the true intercept)

# If the learned values are wildly different from expected,
# that's a signal to check your data, not your model.`}
        />

        <h3 style={S.h3}>Step 5 — Make predictions</h3>

        <CodeBlock code={`# predict() applies the learned formula to new inputs.
# The model has never seen X_test. This simulates real production inference.
y_pred = model.predict(X_test)

# Let's look at a few predictions vs actual values
comparison = pd.DataFrame({
    'distance_km':          X_test['distance_km'].values[:8],
    'actual_time_min':      y_test.values[:8].round(1),
    'predicted_time_min':   y_pred[:8].round(1),
    'error_min':            (y_pred[:8] - y_test.values[:8]).round(1),
})
print(comparison.to_string(index=False))

# distance_km  actual_time_min  predicted_time_min  error_min
#        4.38             40.4                40.6        0.2
#        0.76             11.2                14.2        3.0
#        6.71             52.1                57.6        5.5
# Predictions are close but not perfect — that's expected.
# Perfect predictions would mean no real-world noise. Noise always exists.`}
        />

        <h3 style={S.h3}>Step 6 — Evaluate properly</h3>

        <p style={S.p}>
          A number means nothing without context. Always report at least three metrics
          and explain what each one means to a non-technical stakeholder.
        </p>

        <CodeBlock code={`# MAE — Mean Absolute Error
# "On average, predictions are off by X minutes"
# Most interpretable for stakeholders — same units as the target
mae = mean_absolute_error(y_test, y_pred)
print(f"MAE:  {mae:.2f} minutes")
# → ~3.1 min on average. A product manager can understand this immediately.

# RMSE — Root Mean Squared Error
# Penalises large errors more than MAE
# A prediction 20 min off hurts more than two predictions 10 min off each
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
print(f"RMSE: {rmse:.2f} minutes")
# → slightly higher than MAE, pulled up by occasional large errors

# R² — Coefficient of Determination
# "What % of the variance in delivery time is explained by distance?"
# 1.0 = perfect, 0.0 = no better than predicting the mean every time
r2 = r2_score(y_test, y_pred)
print(f"R²:   {r2:.4f}")
# → ~0.78 means distance explains 78% of delivery time variation
# The remaining 22% is due to factors not in our model (traffic, weather etc.)

# Always compare to baseline
baseline_mae = mean_absolute_error(y_test, [y_train.mean()] * len(y_test))
print(f"\\nBaseline MAE (always predict mean): {baseline_mae:.2f} minutes")
print(f"Our model MAE:                        {mae:.2f} minutes")
print(f"Improvement:                          {baseline_mae - mae:.2f} minutes")
# Without the baseline, 3.1 minutes sounds arbitrary.
# With it: "we beat a naive predictor by X minutes" — now it means something.`}
        />

        <h3 style={S.h3}>Step 7 — Visualise predictions vs actual</h3>

        <p style={S.p}>
          Numbers tell you if the model is accurate. Charts tell you
          <em> where</em> it's accurate and where it fails. Always plot residuals.
        </p>

        <CodeBlock code={`fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# Plot 1: the fitted line on the training data
x_range = np.linspace(0.5, 8.0, 100).reshape(-1, 1)
y_range = model.predict(x_range)

ax1.scatter(X_train['distance_km'], y_train,
            alpha=0.3, s=12, color='#378ADD', label='Training data')
ax1.plot(x_range, y_range, color='#00e676', linewidth=2, label='Fitted line')
ax1.set_xlabel('Distance (km)')
ax1.set_ylabel('Delivery time (min)')
ax1.set_title('Linear Regression — fitted line')
ax1.legend()
ax1.grid(True, alpha=0.3)

# Plot 2: residuals (actual - predicted)
# In a well-fit model: residuals should be randomly scattered around 0.
# Patterns in residuals = the model is missing something systematic.
residuals = y_test - y_pred
ax2.scatter(y_pred, residuals, alpha=0.4, s=15, color='#D85A30')
ax2.axhline(y=0, color='#00e676', linewidth=1.5, linestyle='--')
ax2.set_xlabel('Predicted delivery time (min)')
ax2.set_ylabel('Residual (actual - predicted)')
ax2.set_title('Residual plot — looking for patterns')
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# What to look for in residual plot:
# GOOD: random cloud around 0 — model is capturing the relationship well
# BAD: fan shape (wider at right) — variance increases with prediction size
# BAD: curve — the relationship is non-linear, linear regression is too simple`}
        />

        <h3 style={S.h3}>Step 8 — Use the model for a real prediction</h3>

        <CodeBlock code={`# A new order just came in. Distance: 3.2km.
# What should the app show the customer?

new_order = pd.DataFrame({'distance_km': [3.2]})
predicted_time = model.predict(new_order)[0]

print(f"Predicted delivery time: {predicted_time:.0f} minutes")
# → "Your order will arrive in approximately 32 minutes"

# In production, this model would be:
# 1. Serialised to disk with joblib or pickle
# 2. Loaded by a FastAPI server
# 3. Called thousands of times per minute
# 4. Monitored for accuracy drift as delivery patterns change

# To save the model:
import joblib
joblib.dump(model, 'swiggy_delivery_model.pkl')

# To load and use later:
# loaded_model = joblib.load('swiggy_delivery_model.pkl')
# loaded_model.predict([[3.2]])`}
        />
      </div>

      <SectionDivider />

      {/* ══ SECTION 5 — SIMPLE vs MULTIPLE ════════════════════════════════════ */}
      <div style={S.section}>
        <span style={S.sectionTag}>Going further</span>
        <h2 style={S.h2}>
          Simple vs Multiple Linear Regression
        </h2>

        <p style={S.p}>
          What we just built uses one feature — distance. Real Swiggy models use
          many features simultaneously. Adding more features is trivial in sklearn,
          but the concept is worth understanding clearly.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          marginBottom: 24,
        }}>
          {[
            {
              title: 'Simple Linear Regression',
              formula: 'y = m·x + b',
              desc: 'One feature. Fits a line in 2D space. Good for understanding the concept. Rarely sufficient in production.',
              example: 'delivery_time = 7.3 × distance + 8.6',
              color: '#378ADD',
            },
            {
              title: 'Multiple Linear Regression',
              formula: 'y = m₁x₁ + m₂x₂ + ... + mₙxₙ + b',
              desc: 'Multiple features. Fits a hyperplane in n-dimensional space. Standard in production. Same sklearn interface.',
              example: 'delivery_time = 7.3×distance + 2.1×traffic + 1.4×prep_time + 8.6',
              color: '#1D9E75',
            },
          ].map((item) => (
            <div key={item.title} style={{
              background: 'var(--surface)',
              border: `1px solid ${item.color}30`,
              borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{
                fontSize: 13, fontWeight: 700, color: 'var(--text)',
                fontFamily: 'var(--font-display)', marginBottom: 6,
              }}>
                {item.title}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 12,
                color: item.color, marginBottom: 8,
                padding: '4px 8px', background: `${item.color}10`,
                borderRadius: 4, display: 'inline-block',
              }}>
                {item.formula}
              </div>
              <p style={{ ...S.pSmall, marginBottom: 8 }}>{item.desc}</p>
              <div style={{
                fontSize: 11, fontFamily: 'var(--font-mono)',
                color: 'var(--muted)', lineHeight: 1.6,
                padding: '6px 9px', background: 'var(--bg2)',
                borderRadius: 5, fontStyle: 'italic',
              }}>
                {item.example}
              </div>
            </div>
          ))}
        </div>

        <CodeBlock code={`# Multiple features — identical sklearn interface, just more columns in X
df['traffic_score']     = np.random.uniform(1, 10, n_orders)   # 1=clear, 10=gridlock
df['restaurant_prep']   = np.random.uniform(5, 25, n_orders)   # minutes

# Regenerate delivery time with all 3 features
df['delivery_time_min'] = (
    8.6
    + 7.3  * df['distance_km']
    + 1.8  * df['traffic_score']
    + 0.9  * df['restaurant_prep']
    + np.random.normal(0, 3, n_orders)  # less noise since we have more features
)

X_multi = df[['distance_km', 'traffic_score', 'restaurant_prep']]
y_multi = df['delivery_time_min']

X_train_m, X_test_m, y_train_m, y_test_m = train_test_split(
    X_multi, y_multi, test_size=0.2, random_state=42
)

model_multi = LinearRegression()
model_multi.fit(X_train_m, y_train_m)
y_pred_m = model_multi.predict(X_test_m)

print("Multiple Linear Regression coefficients:")
for feature, coef in zip(X_multi.columns, model_multi.coef_):
    print(f"  {feature:<22}: {coef:.4f}")
print(f"  Intercept              : {model_multi.intercept_:.4f}")
print(f"\\nMAE: {mean_absolute_error(y_test_m, y_pred_m):.2f} min")
print(f"R²:  {r2_score(y_test_m, y_pred_m):.4f}")
# R² should be higher — more features, more variance explained`}
        />
      </div>

      <SectionDivider />

      {/* ══ SECTION 6 — ASSUMPTIONS ════════════════════════════════════════════ */}
      <div style={S.section}>
        <span style={S.sectionTag}>When to use it and when not to</span>
        <h2 style={S.h2}>
          Linear Regression assumptions — the honest version
        </h2>

        <p style={S.p}>
          Linear Regression has assumptions. When they're met, it's an excellent model.
          When they're violated, it fails quietly — giving you confident-looking
          but wrong predictions. Knowing these will save you from wasting days
          debugging a model that was wrong from the start.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              assumption: 'Linearity',
              what: 'The relationship between features and target is actually linear — a straight line (or flat plane) fits the data.',
              check: 'Plot features vs target. If you see a curve, linear regression will underfit. Solution: polynomial features or a non-linear model.',
              violated: 'House prices vs age of house — old houses can be cheap or very expensive (heritage value). Not linear.',
              ok: 'Delivery time vs distance — roughly linear. Each extra km adds roughly the same time.',
              color: '#378ADD',
            },
            {
              assumption: 'No extreme outliers',
              what: 'A single massive outlier can pull the entire fitted line toward it, ruining predictions for all other data.',
              check: 'Plot the data. Check for points that are far from the general cloud. Investigate them — are they data errors or genuine extreme cases?',
              violated: 'One order took 180 minutes (delivery partner had a breakdown). That single row drags the slope down, making all predictions worse.',
              ok: 'After removing or capping obvious errors, the remaining distribution is clean.',
              color: '#D85A30',
            },
            {
              assumption: 'No multicollinearity',
              what: 'Features should not be highly correlated with each other. If distance_km and distance_miles are both features, they carry identical information — the model gets confused about how to weight them.',
              check: 'Calculate a correlation matrix. Features correlated above 0.8–0.9 with each other are candidates for removal.',
              violated: 'Including both "total_order_value" and "number_of_items" — they tend to move together. The model struggles to separate their individual contributions.',
              ok: 'distance_km, traffic_score, and restaurant_prep are measuring different things. Low correlation. Fine to include all three.',
              color: '#7F77DD',
            },
            {
              assumption: 'Independence of errors',
              what: 'Each prediction error should be unrelated to the others. If you get big errors at lunchtime, small errors at midnight, systematically — that pattern means the model is missing something (time of day as a feature).',
              check: 'Plot residuals against time or sequence. Any visible pattern means a missing feature.',
              violated: 'A delivery time model that consistently under-predicts during 7–9pm rush hour — time of day is not in the model.',
              ok: 'After adding time_of_day as a feature, residuals are random. No more systematic pattern.',
              color: '#1D9E75',
            },
          ].map((item) => (
            <div key={item.assumption} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10, overflow: 'hidden',
            }}>
              <div style={{
                padding: '10px 16px',
                borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: item.color, flexShrink: 0,
                }} />
                <span style={{
                  fontSize: 13, fontWeight: 700, color: 'var(--text)',
                  fontFamily: 'var(--font-display)',
                }}>
                  {item.assumption}
                </span>
              </div>
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ ...S.pSmall, marginBottom: 0 }}>{item.what}</p>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: 'var(--muted)',
                  fontFamily: 'var(--font-mono)', letterSpacing: '0.07em',
                  textTransform: 'uppercase' as const,
                }}>
                  How to check
                </div>
                <p style={{ ...S.pSmall, marginBottom: 0 }}>{item.check}</p>
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
                }}>
                  <div style={{
                    fontSize: 12, color: 'var(--muted)', lineHeight: 1.6,
                    padding: '7px 10px', background: 'rgba(226,75,74,0.06)',
                    borderRadius: 5, borderLeft: '2px solid #ff475740',
                  }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: '#ff4757',
                      display: 'block', marginBottom: 3, fontFamily: 'var(--font-mono)',
                    }}>
                      VIOLATED EXAMPLE
                    </span>
                    {item.violated}
                  </div>
                  <div style={{
                    fontSize: 12, color: 'var(--muted)', lineHeight: 1.6,
                    padding: '7px 10px', background: 'rgba(0,230,118,0.06)',
                    borderRadius: 5, borderLeft: '2px solid #00e67640',
                  }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: '#00e676',
                      display: 'block', marginBottom: 3, fontFamily: 'var(--font-mono)',
                    }}>
                      HOLDS EXAMPLE
                    </span>
                    {item.ok}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionDivider />

      {/* ══ SECTION 7 — ERRORS YOU'LL HIT ═════════════════════════════════════ */}
      <div style={S.section}>
        <span style={S.sectionTag}>Errors you'll hit</span>
        <h2 style={S.h2}>
          Every error, explained and fixed
        </h2>

        <p style={S.p}>
          These are real errors that come up in every ML project.
          You will hit at least three of them in your first week.
        </p>

        <ErrorBlock
          error="ValueError: Input contains NaN, infinity or a value too large for dtype('float64')"
          cause="Your feature matrix X has missing values (NaN). LinearRegression cannot handle them — it expects clean numbers. This almost always comes from not checking the data before fitting."
          fix="Run df.isnull().sum() before anything else. Handle missing values by dropping rows (df.dropna()), filling with median (df.fillna(df.median())), or using sklearn's SimpleImputer. This is covered in the Data Engineering section."
        />

        <ErrorBlock
          error="ValueError: could not convert string to float: 'morning'"
          cause="One of your features is a text (categorical) column — like time_of_day = 'morning', 'evening', 'night'. LinearRegression works only with numbers. Strings need to be encoded first."
          fix="Use pd.get_dummies(df, columns=['time_of_day']) for one-hot encoding, or sklearn's OrdinalEncoder for ordinal categories. Categorical encoding has its own full page in the Data Engineering section."
        />

        <ErrorBlock
          error="ValueError: X has 1 feature, but LinearRegression is expecting 3 features as input"
          cause="The model was trained on 3 features but you're passing 1 feature at prediction time. The number and order of features must be identical between training and inference."
          fix="Always build a Pipeline that includes both preprocessing and the model. That way, new data automatically goes through the same transformations the training data did. Sklearn Pipelines are covered in the Data Engineering section."
        />

        <ErrorBlock
          error="R² score is negative"
          cause="A negative R² means the model is worse than just predicting the mean every time. Almost always caused by: (1) fitting on test data accidentally, (2) severely mismatched feature scales, (3) the wrong features entirely, or (4) a non-linear relationship where linear regression is fundamentally wrong."
          fix="Check your train/test split — did you accidentally call fit() on X_test? Check feature scales — are some features 0.001 while others are 10,000? Check your residual plot for curves. If the relationship is non-linear, switch to a tree-based model."
        />

        <ErrorBlock
          error="Model trains fine but MAE on test is 5× higher than on training"
          cause="Classic overfitting. The model memorised the training data including its noise, and fails on new data. With Linear Regression specifically, this usually means you have too many features relative to your number of training examples, or highly correlated features."
          fix="Use Ridge or Lasso regression instead — these are regularised versions of Linear Regression that penalise overly large coefficients. Both are in sklearn. Regularisation has its own page coming up."
        />

        <ErrorBlock
          error="Predictions are systematically too high for short distances and too low for long distances"
          cause="The relationship is not linear — it curves. Short deliveries have proportionally higher fixed overhead (restaurant pickup time), long deliveries have different traffic patterns. A straight line can't capture this curve."
          fix="Add polynomial features: from sklearn.preprocessing import PolynomialFeatures. Or switch to a tree-based model (Decision Tree, XGBoost) which naturally handles non-linear relationships."
        />
      </div>

      <SectionDivider />

      {/* ══ SECTION 8 — WHAT IT LOOKS LIKE AT WORK ════════════════════════════ */}
      <div style={S.section}>
        <span style={S.sectionTag}>What this looks like at work</span>
        <h2 style={S.h2}>
          Day one. You've just joined Swiggy's data team.
        </h2>

        <p style={S.p}>
          Your lead drops a Notion doc on your first morning.
          It reads: "We need to improve ETA accuracy. Currently showing customers ±12 min estimates.
          Product wants ±5 min. You have access to the last 6 months of completed orders in BigQuery.
          Present findings Friday."
        </p>

        <p style={S.p}>
          Here's exactly what you'd do, step by step, in a real job:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              day: 'Mon',
              title: 'Pull and explore the data',
              tasks: [
                'Query BigQuery for 6 months of orders — pull ~2 million rows',
                'Run df.describe(), df.isnull().sum(), df.dtypes',
                'Plot distributions: delivery time, distance, time of day',
                'Identify: 3% of rows have missing restaurant_prep_time, 0.1% have delivery_time > 120 min (outliers)',
              ],
              color: '#378ADD',
            },
            {
              day: 'Tue',
              title: 'Feature analysis and baseline',
              tasks: [
                'Compute correlation matrix — which features correlate with delivery time?',
                'Plot scatter: delivery_time vs distance (0.71 correlation), vs traffic (0.43), vs prep_time (0.38)',
                'Establish baseline: always predict median = 34 min, MAE = 11.2 min',
                'Simple linear regression on distance alone: MAE = 6.8 min — already a big improvement',
              ],
              color: '#1D9E75',
            },
            {
              day: 'Wed',
              title: 'Build and iterate the model',
              tasks: [
                'Multiple linear regression with all 6 features: MAE = 4.9 min',
                'Check residual plots — notice systematic over-prediction for 7–9pm orders',
                'Add is_peak_hour feature. MAE drops to 4.1 min',
                'Check assumptions — residuals look random now. No multicollinearity. Good to proceed',
              ],
              color: '#D85A30',
            },
            {
              day: 'Thu',
              title: 'Validate, document, prepare presentation',
              tasks: [
                "Cross-validate with 5-fold CV — MAE is consistently 4.0–4.3 min across folds. Model isn't overfitting.",
                'Document: features used, training data date range, evaluation methodology, known limitations',
                'Compare to current production model MAE (get this from the existing monitoring dashboard)',
                'Build the slide: baseline → current model → new model, with error reduction quantified',
              ],
              color: '#7F77DD',
            },
            {
              day: 'Fri',
              title: 'Present and get feedback',
              tasks: [
                'Present to lead and product manager: "We can get to ±4.1 min MAE using Linear Regression with 7 features"',
                'Likely question: "Can we get to ±3 min?" — your answer: "Possibly with a non-linear model like XGBoost. I\'d need another week."',
                'Discuss deployment: how does the model get called? What\'s the latency requirement?',
                'Get sign-off to proceed to production or explore non-linear models first',
              ],
              color: '#BA7517',
            },
          ].map((item) => (
            <div key={item.day} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  background: `${item.color}15`,
                  border: `1.5px solid ${item.color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, color: item.color,
                  fontFamily: 'var(--font-mono)',
                }}>
                  {item.day}
                </div>
                <div style={{
                  fontSize: 14, fontWeight: 700, color: 'var(--text)',
                  fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
                }}>
                  {item.title}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {item.tasks.map((t, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 9, alignItems: 'flex-start',
                  }}>
                    <div style={{
                      width: 4, height: 4, borderRadius: '50%',
                      background: item.color, flexShrink: 0, marginTop: 7,
                    }} />
                    <span style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.65 }}>
                      {t}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <HighlightBox color="#1D9E75">
          <p style={{ ...S.pSmall, marginBottom: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              The thing no tutorial tells you:{' '}
            </span>
            in a real job, the hardest part of the week above is Monday —
            getting the data, understanding what the columns actually mean,
            finding the data quality issues that aren't documented anywhere.
            The modelling on Wednesday took 4 hours. The data work took 2 days.
            This is why the Data Engineering section of this track exists.
          </p>
        </HighlightBox>
      </div>

      <SectionDivider />

      {/* ══ KEY TAKEAWAYS ══════════════════════════════════════════════════════ */}
      <KeyTakeaways
        items={[
          'Linear Regression finds the straight line (or flat hyperplane) that minimises the sum of squared errors between predictions and actual values across all training examples.',
          'The model is just two numbers: slope (how much y changes per unit of x) and intercept (the baseline value when x is 0). After training, these are stored as model.coef_ and model.intercept_.',
          'Always split data before training — 80% train, 20% test. Evaluate only on the test set. Using test data during development gives you falsely optimistic results.',
          'Report MAE (interpretable, same units as target), RMSE (penalises large errors), and R² (% of variance explained). Always compare to a naive baseline.',
          'Linear Regression has assumptions: linearity, no extreme outliers, no multicollinearity between features. Check residual plots — patterns in residuals mean your model is missing something.',
          'The sklearn interface is always: instantiate → fit(X_train, y_train) → predict(X_test). This same pattern works for every algorithm in this section.',
        ]}
      />
    </LearnLayout>
  )
}