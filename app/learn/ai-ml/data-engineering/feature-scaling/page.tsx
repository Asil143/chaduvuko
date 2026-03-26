import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Feature Scaling — Standardisation and Normalisation — Chaduvuko',
  description:
    'Why scale matters, what StandardScaler and MinMaxScaler actually do under the hood, which algorithms break without scaling, and when to use each scaler.',
}

const S = {
  tag: {
    fontSize: 11, fontWeight: 700 as const, letterSpacing: '0.1em',
    textTransform: 'uppercase' as const, color: 'var(--accent)',
    fontFamily: 'var(--font-mono)', display: 'block' as const, marginBottom: 10,
  },
  h2: {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)',
    fontWeight: 900 as const, letterSpacing: '-1.2px',
    color: 'var(--text)', marginBottom: 14, lineHeight: 1.15,
  },
  h3: {
    fontFamily: 'var(--font-display)', fontSize: 17,
    fontWeight: 700 as const, letterSpacing: '-0.4px',
    color: 'var(--text)', marginBottom: 10, marginTop: 28,
  },
  p: { fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 16 },
  ps: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 10 },
  sec: { paddingBottom: 56, paddingTop: 8, borderBottom: '1px solid var(--border)' },
  code: {
    fontFamily: 'var(--font-mono)', fontSize: 12,
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: 4, padding: '1px 6px', color: 'var(--accent)',
  },
}

function Div() { return <div style={{ height: 56 }} /> }

function HBox({ children, color = 'var(--accent)' }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderLeft: `3px solid ${color}`, borderRadius: 8,
      padding: '13px 17px', marginBottom: 20,
    }}>
      {children}
    </div>
  )
}

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, overflow: 'hidden', marginBottom: 24,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 16px', borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
      }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
        }}>
          {label ?? 'python'}
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
      </div>
      <pre style={{
        padding: '18px 20px', margin: 0, overflowX: 'auto',
        fontFamily: 'var(--font-mono)', fontSize: 13,
        lineHeight: 1.75, color: 'var(--text)',
      }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

function VisualBox({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: 10,
      overflow: 'hidden', marginBottom: 24,
    }}>
      <div style={{
        padding: '8px 14px', background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        fontFamily: 'var(--font-mono)', letterSpacing: '0.07em',
        textTransform: 'uppercase' as const,
      }}>
        {label}
      </div>
      <div style={{ padding: '20px', background: 'var(--bg2)' }}>
        {children}
      </div>
    </div>
  )
}

function ErrorBlock({ error, cause, fix }: { error: string; cause: string; fix: string }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 8, overflow: 'hidden', marginBottom: 12,
    }}>
      <div style={{
        padding: '9px 14px', background: 'rgba(226,75,74,0.08)',
        borderBottom: '1px solid var(--border)',
        fontFamily: 'var(--font-mono)', fontSize: 12,
        color: '#ff4757', fontWeight: 600,
      }}>
        {error}
      </div>
      <div style={{ padding: '12px 14px' }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
          textTransform: 'uppercase' as const, color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', marginBottom: 4,
        }}>
          Why it happens
        </div>
        <p style={{ ...S.ps, marginBottom: 10 }}>{cause}</p>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
          textTransform: 'uppercase' as const, color: '#00e676',
          fontFamily: 'var(--font-mono)', marginBottom: 4,
        }}>
          Fix
        </div>
        <p style={{ ...S.ps, marginBottom: 0 }}>{fix}</p>
      </div>
    </div>
  )
}

export default function FeatureScalingPage() {
  return (
    <LearnLayout
      title="Feature Scaling — Standardisation and Normalisation"
      description="Why scale matters, what StandardScaler and MinMaxScaler actually do under the hood, which algorithms break without scaling, and when to use each scaler."
      section="Classical ML"
      readTime="35–45 min"
      updatedAt="March 2026"
    >
      {/* Breadcrumb */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '4px 12px', borderRadius: 5,
        border: '1px solid var(--border)', background: 'var(--surface)',
        marginBottom: 32,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#378ADD' }} />
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.09em',
          textTransform: 'uppercase' as const, color: '#1D9E75',
          fontFamily: 'var(--font-mono)',
        }}>
          Data Engineering · Module 17
        </span>
      </div>

      {/* ══ SECTION 1 — HOOK ═══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The problem most tutorials skip</span>
        <h2 style={S.h2}>
          Your model thinks ₹500 and 5km are the same magnitude. They are not.
        </h2>

        <p style={S.p}>
          A Swiggy delivery prediction model has two features: distance in kilometres
          (range 0.5–15) and order value in rupees (range 50–1200).
          To gradient descent, ₹1200 looks 80 times more important than 15km
          simply because the number is bigger — not because it actually is.
          The optimiser takes tiny steps in the distance direction and massive steps
          in the order-value direction, oscillating and converging slowly
          or not at all.
        </p>

        <p style={S.p}>
          This is the scaling problem. It is not a subtle edge case.
          For gradient-based algorithms (linear regression, logistic regression,
          SVMs, neural networks, K-means) unscaled features produce models that
          are slower to train, less accurate, and sensitive to which units
          you happened to measure in. A model trained on distances in kilometres
          gives different results than one trained on the same distances in metres —
          even though the data contains identical information.
        </p>

        <p style={S.p}>
          Feature scaling solves this by transforming all features to a common scale
          before training. This module shows you exactly what each scaler does
          mathematically, which algorithms need it, and how to apply it correctly
          inside a sklearn Pipeline without leaking test information.
        </p>

        <HBox color="#378ADD">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              What this module covers:
            </span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[
              'Why scale matters — the gradient descent problem visualised',
              'StandardScaler — subtract mean, divide by std',
              'MinMaxScaler — compress to [0, 1] range',
              'RobustScaler — scale using median and IQR, ignores outliers',
              'MaxAbsScaler — for sparse data and already-centred data',
              'Normalizer — scale each sample (row), not each feature (column)',
              'Which algorithms need scaling and which do not',
              'Applying scalers correctly in a Pipeline — no leakage',
              'Inverse transform — convert predictions back to original scale',
              'Scaling the target variable y for regression',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: '#378ADD', flexShrink: 0, marginTop: 7,
                }} />
                <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </HBox>

        <Callout type="tip">
          The single most important rule in this module:
          fit the scaler on training data only, then transform both training and test.
          Fitting on the full dataset leaks test statistics into training — a subtle
          but real form of data leakage. Using a sklearn Pipeline enforces this rule automatically.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — WHY SCALING MATTERS ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The intuition</span>
        <h2 style={S.h2}>What unscaled features do to gradient descent</h2>

        <p style={S.p}>
          Imagine the loss surface as a landscape with hills and valleys.
          With well-scaled features the loss surface looks like a round bowl —
          gradient descent rolls straight down to the minimum from any starting point.
          With badly scaled features the surface becomes an elongated narrow valley —
          gradient descent bounces left and right off the steep walls
          while crawling slowly toward the minimum.
          The same distance to the minimum, but zigzagging makes the journey
          10× or 100× longer.
        </p>

        <VisualBox label="Scaled vs unscaled — loss surface shape">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <svg width="100%" viewBox="0 0 220 180">
                {/* Unscaled — elongated ellipses */}
                {[80, 65, 50, 35, 22].map((rx, i) => (
                  <ellipse key={i} cx="110" cy="100"
                    rx={rx} ry={rx * 0.18}
                    fill="none" stroke={`rgba(55,138,221,${0.3 + i * 0.12})`}
                    strokeWidth="1.5" />
                ))}
                <circle cx="110" cy="100" r="4" fill="#D85A30" />
                {/* Zigzag path */}
                <path d="M 30 95 L 90 103 L 50 98 L 95 101 L 70 100 L 108 100"
                  fill="none" stroke="#00e676" strokeWidth="1.5" strokeDasharray="4,2" />
                <circle cx="30" cy="95" r="4" fill="#00e676" />
                <text x="110" y="175" textAnchor="middle" fontSize="11" fill="#888" fontFamily="monospace">unscaled — zigzag</text>
              </svg>
            </div>
            <div>
              <svg width="100%" viewBox="0 0 220 180">
                {/* Scaled — round circles */}
                {[70, 55, 40, 28, 16].map((r, i) => (
                  <circle key={i} cx="110" cy="90"
                    r={r}
                    fill="none" stroke={`rgba(0,230,118,${0.25 + i * 0.12})`}
                    strokeWidth="1.5" />
                ))}
                <circle cx="110" cy="90" r="4" fill="#D85A30" />
                {/* Direct path */}
                <path d="M 50 55 L 110 90"
                  fill="none" stroke="#00e676" strokeWidth="1.5" />
                <circle cx="50" cy="55" r="4" fill="#00e676" />
                <text x="110" y="175" textAnchor="middle" fontSize="11" fill="#888" fontFamily="monospace">scaled — direct</text>
              </svg>
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, textAlign: 'center' as const }}>
            Left: unscaled features → elongated loss surface → gradient descent zigzags.
            Right: scaled features → round loss surface → gradient descent goes straight to minimum.
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.linear_model import Ridge
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split

np.random.seed(42)
n = 5000

# Swiggy features — very different scales
distance    = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)    # 0.5–15 km
traffic     = np.random.randint(1, 11, n).astype(float)               # 1–10
prep_time   = np.abs(np.random.normal(15, 5, n)).clip(5, 35)         # 5–35 min
order_value = np.abs(np.random.normal(350, 150, n)).clip(50, 1200)   # 50–1200 ₹

delivery = (8.6 + 7.3*distance + 0.8*prep_time + 1.5*traffic
            + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep_time, order_value])
y = delivery

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Print feature statistics — the scale problem made visible
print("Feature statistics (BEFORE scaling):")
feature_names = ['distance_km','traffic_score','prep_time','order_value']
for name, col in zip(feature_names, X_train.T):
    print(f"  {name:<15}: mean={col.mean():8.2f}  std={col.std():8.2f}  "
          f"range=[{col.min():.1f}, {col.max():.1f}]")

# Train WITHOUT scaling
model_raw = Ridge(alpha=1.0)
model_raw.fit(X_train, y_train)
mae_raw = mean_absolute_error(y_test, model_raw.predict(X_test))

# Train WITH scaling
scaler   = StandardScaler()
X_tr_sc  = scaler.fit_transform(X_train)  # fit + transform on train
X_te_sc  = scaler.transform(X_test)       # transform only on test
model_sc = Ridge(alpha=1.0)
model_sc.fit(X_tr_sc, y_train)
mae_sc = mean_absolute_error(y_test, model_sc.predict(X_te_sc))

print(f"\nMAE without scaling: {mae_raw:.4f} min")
print(f"MAE with scaling:    {mae_sc:.4f} min")
print(f"Improvement:         {(mae_raw - mae_sc) / mae_raw * 100:.1f}%")

# Coefficient magnitudes — scaling equalises them
print(f"\nCoefficients WITHOUT scaling:")
for name, coef in zip(feature_names, model_raw.coef_):
    print(f"  {name:<15}: {coef:+10.6f}")

print(f"\nCoefficients WITH scaling (standardised):")
for name, coef in zip(feature_names, model_sc.coef_):
    print(f"  {name:<15}: {coef:+10.6f}  ← now comparable magnitude")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — STANDARD SCALER ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most common scaler</span>
        <h2 style={S.h2}>StandardScaler — zero mean, unit variance</h2>

        <p style={S.p}>
          StandardScaler transforms each feature so it has mean 0 and
          standard deviation 1. Every value is expressed as
          "how many standard deviations from the mean is this?"
          A distance of 6km in a dataset with mean 4km and std 2km
          becomes (6 − 4) / 2 = 1.0 — one standard deviation above average.
          A distance of 2km becomes −1.0.
        </p>

        <VisualBox label="StandardScaler — the formula and what it does">
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 15,
                color: '#378ADD', padding: '12px 16px',
                background: 'var(--surface)', borderRadius: 7,
                marginBottom: 12, textAlign: 'center' as const,
              }}>
                x_scaled = (x − μ) / σ
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { term: 'μ', desc: 'mean of the column in TRAINING data' },
                  { term: 'σ', desc: 'standard deviation in TRAINING data' },
                  { term: 'Result', desc: 'always has mean=0 and std=1' },
                ].map((row) => (
                  <div key={row.term} style={{ display: 'flex', gap: 10 }}>
                    <span style={{ fontSize: 14, fontFamily: 'var(--font-mono)', color: '#378ADD', minWidth: 50 }}>{row.term}</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>{row.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                Example: distance_km (μ=4.0, σ=2.0)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  { raw: '0.5 km', scaled: '(0.5−4.0)/2.0 = −1.75', note: 'very short' },
                  { raw: '2.0 km', scaled: '(2.0−4.0)/2.0 = −1.00', note: '1 std below mean' },
                  { raw: '4.0 km', scaled: '(4.0−4.0)/2.0 =  0.00', note: 'exactly mean' },
                  { raw: '6.0 km', scaled: '(6.0−4.0)/2.0 = +1.00', note: '1 std above mean' },
                  { raw: '9.0 km', scaled: '(9.0−4.0)/2.0 = +2.50', note: 'very long' },
                ].map((row) => (
                  <div key={row.raw} style={{
                    display: 'grid', gridTemplateColumns: '55px 170px 80px',
                    gap: 6, fontSize: 11, fontFamily: 'var(--font-mono)',
                    padding: '3px 0',
                  }}>
                    <span style={{ color: '#D85A30' }}>{row.raw}</span>
                    <span style={{ color: 'var(--text)' }}>{row.scaled}</span>
                    <span style={{ color: 'var(--muted)' }}>{row.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.preprocessing import StandardScaler

# Build the StandardScaler from scratch first
def standard_scale(X_train: np.ndarray, X_test: np.ndarray):
    """Manual implementation of StandardScaler."""
    mean = X_train.mean(axis=0)   # per-column mean from TRAIN
    std  = X_train.std(axis=0)    # per-column std from TRAIN
    std  = np.where(std == 0, 1, std)  # avoid division by zero for constant columns

    X_train_sc = (X_train - mean) / std
    X_test_sc  = (X_test  - mean) / std   # same stats — no refitting on test
    return X_train_sc, X_test_sc, mean, std

X_tr_manual, X_te_manual, mean_, std_ = standard_scale(X_train, X_test)

# Verify with sklearn
scaler = StandardScaler()
X_tr_sk = scaler.fit_transform(X_train)
X_te_sk = scaler.transform(X_test)

print("Manual vs sklearn StandardScaler:")
print(f"  Mean match:  {np.allclose(mean_, scaler.mean_)}")
print(f"  Std match:   {np.allclose(std_,  scaler.scale_)}")
print(f"  Output match: {np.allclose(X_tr_manual, X_tr_sk)}")

# After scaling: mean≈0, std≈1 for each column
print("\nAfter StandardScaler (training set):")
for name, col in zip(feature_names, X_tr_sk.T):
    print(f"  {name:<15}: mean={col.mean():+.6f}  std={col.std():.6f}")

# Key attributes stored by fit()
print(f"\nStored mean:  {scaler.mean_.round(4)}")
print(f"Stored scale: {scaler.scale_.round(4)}")
print(f"Stored var:   {scaler.var_.round(4)}")
print(f"n_samples seen: {scaler.n_samples_seen_}")

# ── Inverse transform — get back original values ───────────────────────
# Critical when: you scaled y before training regression, need to
# convert predictions back to original units
y_scaled   = (y_train - y_train.mean()) / y_train.std()
y_recovered = y_scaled * y_train.std() + y_train.mean()
print(f"\nInverse transform check: {np.allclose(y_recovered, y_train)}")  # True

# Using sklearn inverse_transform
X_recovered = scaler.inverse_transform(X_tr_sk)
print(f"inverse_transform check: {np.allclose(X_recovered, X_train)}")   # True`} />

        <h3 style={S.h3}>When StandardScaler is the right choice</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            {
              condition: 'Feature follows a roughly normal (Gaussian) distribution',
              reason: 'StandardScaler preserves the Gaussian shape — scaled values are still normally distributed, just centred at 0 with std 1.',
              color: '#1D9E75',
            },
            {
              condition: 'Algorithm is sensitive to the magnitude of coefficients',
              reason: 'Linear/logistic regression, SVMs, neural networks, K-means, PCA — all assume features are on comparable scales.',
              color: '#1D9E75',
            },
            {
              condition: 'Feature has outliers but you still want them to influence the model',
              reason: 'Unlike RobustScaler, StandardScaler is affected by outliers. Use this when extreme values carry meaningful signal.',
              color: '#BA7517',
            },
          ].map((item) => (
            <div key={item.condition} style={{
              display: 'flex', gap: 12, alignItems: 'flex-start',
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 7, padding: '10px 14px',
            }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: item.color, flexShrink: 0, marginTop: 6 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{item.condition}</div>
                <p style={{ ...S.ps, marginBottom: 0 }}>{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Div />

      {/* ══ SECTION 4 — MINMAX SCALER ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Bounded range scaling</span>
        <h2 style={S.h2}>MinMaxScaler — compress every feature to [0, 1]</h2>

        <p style={S.p}>
          MinMaxScaler shifts and scales each feature so the minimum becomes 0
          and the maximum becomes 1. All values end up strictly between 0 and 1.
          The shape of the distribution is preserved — the relative distances
          between values stay the same, just rescaled to fit the [0, 1] window.
        </p>

        <VisualBox label="MinMaxScaler — the formula">
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 15,
                color: '#1D9E75', padding: '12px 16px',
                background: 'var(--surface)', borderRadius: 7,
                marginBottom: 12, textAlign: 'center' as const,
              }}>
                x_scaled = (x − x_min) / (x_max − x_min)
              </div>
              <p style={{ ...S.ps, marginBottom: 0 }}>
                x_min and x_max are the minimum and maximum values in the
                TRAINING data — not the test data. A test value outside the
                training range will produce a value outside [0, 1].
              </p>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                Example: traffic_score (min=1, max=10)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { raw: 1,  scaled: 0.000 },
                  { raw: 3,  scaled: 0.222 },
                  { raw: 5,  scaled: 0.444 },
                  { raw: 7,  scaled: 0.667 },
                  { raw: 10, scaled: 1.000 },
                ].map((row) => (
                  <div key={row.raw} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#D85A30', minWidth: 30 }}>
                      {row.raw}
                    </span>
                    <div style={{
                      flex: 1, height: 12, background: 'var(--border)', borderRadius: 2,
                    }}>
                      <div style={{
                        width: `${row.scaled * 100}%`, height: '100%',
                        background: '#1D9E75', borderRadius: 2,
                      }} />
                    </div>
                    <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#1D9E75', minWidth: 40 }}>
                      {row.scaled.toFixed(3)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.preprocessing import MinMaxScaler

# Manual implementation
def minmax_scale(X_train: np.ndarray, X_test: np.ndarray,
                  feature_range: tuple = (0, 1)):
    """Manual MinMaxScaler."""
    x_min = X_train.min(axis=0)
    x_max = X_train.max(axis=0)
    rng   = x_max - x_min
    rng   = np.where(rng == 0, 1, rng)   # constant column → no division by zero

    a, b = feature_range
    X_train_sc = a + (X_train - x_min) / rng * (b - a)
    X_test_sc  = a + (X_test  - x_min) / rng * (b - a)
    return X_train_sc, X_test_sc

X_tr_mm, X_te_mm = minmax_scale(X_train, X_test)

# Verify: training data should now be in [0, 1] for all features
print("After MinMaxScaler (training set):")
for name, col in zip(feature_names, X_tr_mm.T):
    print(f"  {name:<15}: min={col.min():.4f}  max={col.max():.4f}  mean={col.mean():.4f}")

# Note: test set min/max may go slightly outside [0, 1]
# if test has values outside the training range
print("\nTest set min/max (may exceed [0,1] if test values outside train range):")
for name, col in zip(feature_names, X_te_mm.T):
    outside = (col < 0).sum() + (col > 1).sum()
    print(f"  {name:<15}: min={col.min():.4f}  max={col.max():.4f}  "
          f"outside [0,1]: {outside}")

# sklearn version
sk_mm = MinMaxScaler(feature_range=(0, 1))
X_tr_sk_mm = sk_mm.fit_transform(X_train)
X_te_sk_mm = sk_mm.transform(X_test)

# Custom range — e.g. [-1, 1] for neural networks with tanh activation
sk_mm_11 = MinMaxScaler(feature_range=(-1, 1))
X_tr_11  = sk_mm_11.fit_transform(X_train)
print(f"\nMinMaxScaler(-1,1) range: [{X_tr_11.min():.4f}, {X_tr_11.max():.4f}]")

# ── When MinMaxScaler is better than StandardScaler ────────────────────
# 1. When you need values bounded to a specific range
#    (image pixels → [0,1], neural net inputs, distance metrics)
# 2. When the distribution is NOT Gaussian (uniform, multi-modal)
# 3. When you want to preserve exact zero — MinMaxScaler maps x_min to 0
#    but 0 in the original data maps to 0/(max-min) which is generally not 0
print("\nUse MinMaxScaler when:")
print("  - Feeding into a neural network with sigmoid/tanh activations")
print("  - Computing cosine similarity or euclidean distance")
print("  - Working with image pixel values (already [0, 255] → [0, 1])")
print("  - Distribution is uniform or bounded (not normal)")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — ROBUST SCALER ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Outlier-resistant scaling</span>
        <h2 style={S.h2}>RobustScaler — scale using median and IQR, not mean and std</h2>

        <p style={S.p}>
          StandardScaler uses the mean and standard deviation.
          Both are sensitive to outliers — one extreme value can shift the mean
          dramatically and inflate the standard deviation, causing all other values
          to be squashed into a tiny range after scaling.
          RobustScaler uses the median (Q2) and interquartile range (IQR = Q3 − Q1)
          instead. These are resistant to outliers by construction:
          no matter how extreme one value is, the median and IQR barely change.
        </p>

        <VisualBox label="RobustScaler vs StandardScaler — effect of one outlier">
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                Data with one outlier: [2, 3, 4, 5, 6, 7, 100]
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[
                  { stat: 'Mean',   val_no: '4.50',  val_yes: '18.14',  sensitivity: 'HIGH — outlier shifts mean drastically' },
                  { stat: 'Std',    val_no: '1.71',  val_yes: '34.8',   sensitivity: 'HIGH — outlier inflates std dramatically' },
                  { stat: 'Median', val_no: '4.50',  val_yes: '5.00',   sensitivity: 'LOW — outlier barely moves median' },
                  { stat: 'IQR',    val_no: '2.50',  val_yes: '3.00',   sensitivity: 'LOW — outlier barely affects IQR' },
                ].map((row) => (
                  <div key={row.stat} style={{
                    background: 'var(--surface)', borderRadius: 5, padding: '7px 10px',
                    display: 'grid', gridTemplateColumns: '55px 60px 60px 1fr',
                    gap: 6, alignItems: 'center',
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>{row.stat}</span>
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#1D9E75' }}>{row.val_no}</span>
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#ff4757' }}>{row.val_yes}</span>
                    <span style={{ fontSize: 10, color: 'var(--muted)' }}>{row.sensitivity}</span>
                  </div>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: '55px 60px 60px 1fr', gap: 6, padding: '3px 10px' }}>
                  <span style={{ fontSize: 9, color: 'var(--muted)' }} />
                  <span style={{ fontSize: 9, color: '#1D9E75', fontFamily: 'var(--font-mono)' }}>no outlier</span>
                  <span style={{ fontSize: 9, color: '#ff4757', fontFamily: 'var(--font-mono)' }}>with outlier</span>
                </div>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 14,
                color: '#D85A30', padding: '12px 16px',
                background: 'var(--surface)', borderRadius: 7,
                marginBottom: 10, textAlign: 'center' as const,
              }}>
                x_scaled = (x − median) / IQR
              </div>
              <p style={{ ...S.ps, marginBottom: 0 }}>
                After RobustScaler: median maps to 0, Q1 maps to −0.5, Q3 maps to +0.5.
                Outliers still appear in the scaled data but at extreme values —
                they don't distort the scaling of the non-outlier majority.
              </p>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.preprocessing import RobustScaler

# Dataset with outliers — realistic situation
np.random.seed(42)
n = 1000
delivery_normal  = np.abs(np.random.normal(35, 8, n-20))
delivery_outlier = np.random.uniform(200, 500, 20)    # 20 extreme outliers
delivery_all     = np.concatenate([delivery_normal, delivery_outlier])

X_with_outliers = delivery_all.reshape(-1, 1)

# Compare all three scalers on data with outliers
from sklearn.preprocessing import StandardScaler, MinMaxScaler

scalers = {
    'StandardScaler': StandardScaler(),
    'MinMaxScaler':   MinMaxScaler(),
    'RobustScaler':   RobustScaler(quantile_range=(25.0, 75.0)),  # IQR = Q3-Q1
}

print("Effect of outliers on each scaler (delivery_time with extreme outliers):")
print(f"\nOriginal data:  mean={delivery_all.mean():.1f}  "
      f"median={np.median(delivery_all):.1f}  "
      f"std={delivery_all.std():.1f}")
print(f"                Q1={np.percentile(delivery_all, 25):.1f}  "
      f"Q3={np.percentile(delivery_all, 75):.1f}\n")

for name, sc in scalers.items():
    X_sc = sc.fit_transform(X_with_outliers).flatten()
    # How spread are the non-outlier values after scaling?
    non_outlier_scaled = X_sc[X_sc < np.percentile(X_sc, 98)]
    print(f"{name}:")
    print(f"  Range of all values:         [{X_sc.min():.2f}, {X_sc.max():.2f}]")
    print(f"  Range of non-outlier values: [{non_outlier_scaled.min():.2f}, {non_outlier_scaled.max():.2f}]")
    print(f"  Spread of inliers (std):     {non_outlier_scaled.std():.4f}")
    print()

# RobustScaler attributes
rs = RobustScaler()
rs.fit(X_with_outliers)
print(f"RobustScaler stored:")
print(f"  center_ (median): {rs.center_[0]:.2f}")
print(f"  scale_  (IQR):    {rs.scale_[0]:.2f}")

# ── quantile_range parameter ───────────────────────────────────────────
# Default is (25.0, 75.0) — IQR
# Use wider range for data with many outliers: (10.0, 90.0)
# Use narrower range to be more aggressive: (5.0, 95.0)
rs_wide = RobustScaler(quantile_range=(10.0, 90.0))
rs_wide.fit(X_with_outliers)
print(f"\nRobustScaler(10,90) stored:")
print(f"  center_ (median): {rs_wide.center_[0]:.2f}")
print(f"  scale_  (80th percentile range): {rs_wide.scale_[0]:.2f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — OTHER SCALERS ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The rest of the toolkit</span>
        <h2 style={S.h2}>MaxAbsScaler and Normalizer — the two special-purpose scalers</h2>

        <p style={S.p}>
          Two more scalers cover specific situations that StandardScaler,
          MinMaxScaler, and RobustScaler don't handle well.
        </p>

        <h3 style={S.h3}>MaxAbsScaler — for sparse data</h3>

        <p style={S.p}>
          MaxAbsScaler divides each feature by its maximum absolute value,
          producing values in [−1, 1]. Crucially, it does not centre the data
          (no mean subtraction). This preserves sparsity — if a feature was 0,
          it stays 0. StandardScaler would subtract the mean and create
          non-zero values where there were zeros, destroying the sparsity
          that makes sparse matrix operations fast. Use MaxAbsScaler for
          TF-IDF vectors, one-hot encoded matrices, and any sparse input.
        </p>

        <h3 style={S.h3}>Normalizer — scale rows, not columns</h3>

        <p style={S.p}>
          Every scaler so far operates on columns — each feature is scaled
          independently. Normalizer is different: it scales each
          <em> sample</em> (row) so its length equals 1.
          This is used when the direction of a feature vector matters
          more than its magnitude — text classification with TF-IDF,
          recommendation systems, cosine similarity computations.
        </p>

        <CodeBlock code={`import numpy as np
from sklearn.preprocessing import MaxAbsScaler, Normalizer
from scipy.sparse import csr_matrix

# ── MaxAbsScaler — sparse-safe, no mean subtraction ───────────────────
X_dense = np.array([
    [1.0,   -3.0, 5.0],
    [2.0,    0.0, 3.0],
    [0.0,    4.0, 0.0],   # row with a zero — sparse-like
    [-3.0,   1.0, 2.0],
])

mas = MaxAbsScaler()
X_mas = mas.fit_transform(X_dense)

print("MaxAbsScaler:")
print(f"  max_abs_: {mas.scale_}")   # per-column max absolute value
print(f"\nOriginal:\n{X_dense}")
print(f"\nScaled (each col / max_abs):\n{X_mas.round(3)}")
print(f"\nZeros preserved: original zeros → {X_mas[2, 1]:.3f} and {X_mas[2, 2]:.3f}")
# Zeros stay zero — essential for sparse data

# Works directly on sparse matrices
X_sparse = csr_matrix(X_dense)
mas_sparse = MaxAbsScaler()
X_sparse_sc = mas_sparse.fit_transform(X_sparse)
print(f"\nSparse input → sparse output: {type(X_sparse_sc)}")

# ── Normalizer — scale each SAMPLE to unit length ─────────────────────
X_samples = np.array([
    [3.0,  4.0],   # length = 5.0
    [1.0,  0.0],   # length = 1.0  (already unit)
    [6.0,  8.0],   # length = 10.0
    [0.5,  0.5],   # length = 0.707
])

# L2 norm normalizer (default): divide each row by its L2 norm
norm_l2 = Normalizer(norm='l2')
X_l2 = norm_l2.fit_transform(X_samples)

print("\nNormalizer (L2):")
print(f"{'Original':<20} {'Scaled':<20} {'Length after'}")
for orig, scaled in zip(X_samples, X_l2):
    length = np.linalg.norm(scaled)
    print(f"  {str(orig):<20} {str(scaled.round(4)):<20} {length:.6f}")

# L1 norm: divide by sum of absolute values
norm_l1 = Normalizer(norm='l1')
X_l1 = norm_l1.fit_transform(X_samples)
print(f"\nNormalizer (L1): each row sums to 1.0")
print(f"  Row 0: {X_l1[0]}  sum={X_l1[0].sum():.4f}")

# When to use Normalizer:
# - Text classification (TF-IDF vectors — comparing document directions)
# - Recommendation systems (cosine similarity between user/item vectors)
# - KNN when you want distance to ignore magnitude
print("\nUse Normalizer when:")
print("  - You need cosine similarity (direction matters, not magnitude)")
print("  - Each sample is a distribution that should sum to 1.0 (norm='l1')")
print("  - Word embeddings need to be on the unit sphere")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — WHICH ALGORITHMS NEED SCALING ═════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The decision guide</span>
        <h2 style={S.h2}>Which algorithms need scaling — and which genuinely don't</h2>

        <p style={S.p}>
          Not every algorithm is sensitive to feature scale.
          Tree-based models split on threshold values — the scale of a feature
          does not change whether splitting at 3.5km vs 4.2km produces purer leaf nodes.
          But every algorithm that computes distances, dot products, or gradients
          is directly affected by scale. Knowing which is which prevents
          wasted preprocessing and wrong assumptions.
        </p>

        <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 80px 1fr',
            background: 'var(--surface)', borderBottom: '1px solid var(--border)',
            padding: '9px 14px',
          }}>
            {['Algorithm', 'Needs scaling', 'Why'].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{h}</span>
            ))}
          </div>
          {[
            ['Linear Regression',        true,  'Gradient descent step sizes depend on feature magnitude. Coefficients not comparable without scaling.'],
            ['Logistic Regression',      true,  'Same as linear regression — gradient descent, comparable coefficients.'],
            ['Ridge / Lasso',            true,  'Regularisation penalty (w²) penalises large-scale features more — must scale for fair regularisation.'],
            ['SVM',                      true,  'Kernel functions compute distances — scale dominates distance calculations.'],
            ['K-Nearest Neighbours',     true,  'Euclidean distance directly uses feature values — large-scale features dominate.'],
            ['K-Means Clustering',       true,  'Same as KNN — distance-based, scale matters.'],
            ['PCA',                      true,  'Variance-based — high-scale features dominate first principal components.'],
            ['Neural Networks',          true,  'Gradient descent — same reasoning as linear/logistic regression.'],
            ['Decision Tree',            false, 'Splits on thresholds — scale changes the threshold value but not which split is best.'],
            ['Random Forest',            false, 'Ensemble of trees — same argument as decision tree.'],
            ['XGBoost / LightGBM',       false, 'Gradient boosted trees — threshold-based splits, scale-invariant.'],
            ['Naïve Bayes',              false, 'Computes per-class probabilities — not distance-based.'],
          ].map(([algo, needs, reason], i) => (
            <div key={i as number} style={{
              display: 'grid', gridTemplateColumns: '1fr 80px 1fr',
              padding: '9px 14px',
              borderBottom: i < 11 ? '1px solid var(--border)' : 'none',
              background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
              alignItems: 'start',
            }}>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>{algo as string}</span>
              <span style={{
                fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-mono)',
                color: needs ? '#ff4757' : '#1D9E75',
              }}>
                {needs ? 'YES' : 'no'}
              </span>
              <span style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{reason as string}</span>
            </div>
          ))}
        </div>

        <CodeBlock code={`import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
from sklearn.ensemble import RandomForestRegressor
from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split

np.random.seed(42)

# Generate dataset where features have very different scales
n = 2000
X = np.column_stack([
    np.abs(np.random.normal(4, 2, n)),          # distance_km: ~0-15
    np.random.randint(1, 11, n).astype(float),  # traffic: 1-10
    np.abs(np.random.normal(350, 150, n)),       # order_value: 50-1200
])
y = 8.6 + 7.3*X[:,0] + 1.5*X[:,1] + np.random.normal(0, 4, n)

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
sc = StandardScaler()
X_tr_sc = sc.fit_transform(X_tr)
X_te_sc = sc.transform(X_te)

results = []
for name, model, use_scaling in [
    ('Ridge (unscaled)',            Ridge(alpha=1.0),                    False),
    ('Ridge (scaled)',              Ridge(alpha=1.0),                    True),
    ('KNN (unscaled)',              KNeighborsRegressor(n_neighbors=10), False),
    ('KNN (scaled)',                KNeighborsRegressor(n_neighbors=10), True),
    ('Random Forest (unscaled)',    RandomForestRegressor(n_estimators=50, random_state=42), False),
    ('Random Forest (scaled)',      RandomForestRegressor(n_estimators=50, random_state=42), True),
]:
    Xtr = X_tr_sc if use_scaling else X_tr
    Xte = X_te_sc if use_scaling else X_te
    model.fit(Xtr, y_tr)
    mae = mean_absolute_error(y_te, model.predict(Xte))
    results.append((name, mae))

print("Impact of scaling on different algorithms:")
print(f"{'Model':<35} {'MAE (min)'}")
print("─" * 48)
for name, mae in results:
    print(f"  {name:<33}: {mae:.4f}")

# Expected observations:
# - Ridge: big improvement with scaling
# - KNN:   big improvement with scaling (distance-based)
# - RF:    almost no difference (scale-invariant)`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — PIPELINE ═══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The correct implementation pattern</span>
        <h2 style={S.h2}>Scalers inside a Pipeline — the only safe way</h2>

        <p style={S.p}>
          The most common scaling mistake is fitting the scaler on the entire
          dataset before the train/test split. This leaks test statistics —
          the test set's mean and standard deviation influence the scaler,
          which in turn influences what the model sees during training.
          Evaluation metrics look slightly better than they should, and the
          model is technically trained on information from the test set.
        </p>

        <p style={S.p}>
          A sklearn Pipeline completely prevents this. It fits the scaler
          only when <span style={S.code as React.CSSProperties}>pipe.fit(X_train)</span> is called,
          and applies the stored statistics (never refitting) when
          <span style={S.code as React.CSSProperties}> pipe.predict(X_test)</span> is called.
          There is no way to accidentally leak using a Pipeline.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, RobustScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import Ridge
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.metrics import mean_absolute_error

np.random.seed(42)
n = 5000

restaurants = ['Pizza Hut','Biryani Blues',"McDonald's","Haldiram's",'Dominos','KFC']
cities      = ['Bangalore','Mumbai','Delhi','Hyderabad','Pune','Chennai']

distance    = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic     = np.random.randint(1, 11, n).astype(float)
prep        = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
value       = np.abs(np.random.normal(350, 150, n)).clip(50, 1200)
delivery    = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
               + np.random.normal(0, 4, n)).clip(10, 120)

df = pd.DataFrame({
    'distance_km':    distance,
    'traffic_score':  traffic,
    'restaurant_prep':prep,
    'order_value':    value,
    'restaurant':     np.random.choice(restaurants, n),
    'city':           np.random.choice(cities, n),
})
y = delivery

X_train, X_test, y_train, y_test = train_test_split(df, y, test_size=0.2, random_state=42)

# ── Different scalers for different feature groups ─────────────────────
# Columns with outliers → RobustScaler
# Clean numeric columns → StandardScaler
# Categorical columns   → OneHotEncoder

ROBUST_COLS = ['order_value']             # has outliers
STANDARD_COLS = ['distance_km','traffic_score','restaurant_prep']
CAT_COLS    = ['restaurant','city']

preprocessor = ColumnTransformer([
    ('robust', Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler',  RobustScaler()),
    ]), ROBUST_COLS),

    ('standard', Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler',  StandardScaler()),
    ]), STANDARD_COLS),

    ('categorical', Pipeline([
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('onehot',  OneHotEncoder(handle_unknown='ignore', sparse_output=False, drop='first')),
    ]), CAT_COLS),
])

# Full pipeline: preprocessing → model
pipe = Pipeline([
    ('preprocessor', preprocessor),
    ('model',        Ridge(alpha=1.0)),
])

# ── Cross-validation — scaler fit happens INSIDE each fold ────────────
cv_scores = cross_val_score(
    pipe, X_train, y_train,
    cv=5, scoring='neg_mean_absolute_error',
)
print(f"5-fold CV MAE: {-cv_scores.mean():.4f} ± {cv_scores.std():.4f} min")

# ── Final train and evaluate ───────────────────────────────────────────
pipe.fit(X_train, y_train)
y_pred = pipe.predict(X_test)
print(f"Test MAE:      {mean_absolute_error(y_test, y_pred):.4f} min")

# ── Inspect stored scaler statistics ──────────────────────────────────
standard_scaler = pipe.named_steps['preprocessor'].transformers_[1][1].named_steps['scaler']
robust_scaler   = pipe.named_steps['preprocessor'].transformers_[0][1].named_steps['scaler']

print(f"\nStandardScaler stored mean_:  {standard_scaler.mean_.round(3)}")
print(f"StandardScaler stored scale_: {standard_scaler.scale_.round(3)}")
print(f"RobustScaler stored center_:  {robust_scaler.center_.round(3)}")
print(f"RobustScaler stored scale_:   {robust_scaler.scale_.round(3)}")

# ── Score new orders at inference time ────────────────────────────────
new_orders = pd.DataFrame([
    {'distance_km': 2.1, 'traffic_score': 3, 'restaurant_prep': 10,
     'order_value': 220, 'restaurant': 'KFC',       'city': 'Bangalore'},
    {'distance_km': 8.5, 'traffic_score': 9, 'restaurant_prep': 25,
     'order_value': 680, 'restaurant': 'Pizza Hut', 'city': 'Mumbai'},
])
predictions = pipe.predict(new_orders)
for i, (_, row) in enumerate(new_orders.iterrows()):
    print(f"\nOrder {i+1}: {row['city']} | {row['restaurant']} | "
          f"{row['distance_km']}km | traffic={row['traffic_score']}")
    print(f"  Predicted delivery: {predictions[i]:.1f} min")`} />
      </div>

      <Div />

      {/* ══ SECTION 9 — SCALING THE TARGET ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Scaling y</span>
        <h2 style={S.h2}>Should you scale the target variable?</h2>

        <p style={S.p}>
          You almost never need to scale y for linear regression or tree models.
          The model adjusts its bias term to match the scale of y automatically.
          But for neural networks — especially deep ones — a target with a large
          range (like delivery times 10–120 minutes) can cause unstable training
          because the output layer needs large weights to produce large numbers.
          Scaling y to zero mean and unit variance stabilises training.
        </p>

        <CodeBlock code={`import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error

np.random.seed(42)
n = 2000
X = np.random.randn(n, 3)
y = 35 + 10*X[:,0] + 5*X[:,1] + np.random.randn(n)*4   # delivery times

X_train, X_test = X[:1600], X[1600:]
y_train, y_test = y[:1600], y[1600:]

# ── Scale X only (standard approach for linear regression) ────────────
sc_X = StandardScaler()
X_tr_sc = sc_X.fit_transform(X_train)
X_te_sc = sc_X.transform(X_test)

model_no_y = Ridge(alpha=1.0)
model_no_y.fit(X_tr_sc, y_train)
mae_no_y = mean_absolute_error(y_test, model_no_y.predict(X_te_sc))
print(f"Scale X only:    MAE = {mae_no_y:.4f} min")

# ── Scale both X and y (needed for neural networks) ───────────────────
sc_y = StandardScaler()
y_train_sc = sc_y.fit_transform(y_train.reshape(-1, 1)).flatten()

model_with_y = Ridge(alpha=1.0)
model_with_y.fit(X_tr_sc, y_train_sc)

# CRITICAL: inverse transform predictions before computing MAE
y_pred_sc  = model_with_y.predict(X_te_sc)
y_pred_inv = sc_y.inverse_transform(y_pred_sc.reshape(-1, 1)).flatten()
mae_with_y = mean_absolute_error(y_test, y_pred_inv)
print(f"Scale X and y:   MAE = {mae_with_y:.4f} min")

# ── Common mistakes when scaling y ────────────────────────────────────
print("\nCommon mistakes:")
print("  1. Forgetting inverse_transform → comparing scaled predictions to raw targets")
y_pred_wrong = model_with_y.predict(X_te_sc)   # still in scaled space
mae_wrong    = mean_absolute_error(y_test, y_pred_wrong)
print(f"     MAE without inverse_transform: {mae_wrong:.4f}  ← meaningless")

print("\n  2. Fitting sc_y on full y (train + test) — leakage")
print("     Fix: sc_y.fit(y_train.reshape(-1,1)) only")

print("\n  3. Not scaling y but scaling X for neural nets")
print("     Result: large target values cause exploding gradients in output layer")
print("     Fix: always scale y when using neural networks")`} />
      </div>

      <Div />

      {/* ══ SECTION 10 — SCALER CHEATSHEET ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Quick reference</span>
        <h2 style={S.h2}>Which scaler to use — decision guide</h2>

        <VisualBox label="Scaler selection guide">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                question: 'Does your data have significant outliers?',
                yes: 'RobustScaler — uses median and IQR, ignores outliers',
                no: 'Continue to next question',
                color: '#D85A30',
              },
              {
                question: 'Is the data sparse (many zeros) — e.g. TF-IDF, one-hot?',
                yes: 'MaxAbsScaler — scales without centring, preserves sparsity',
                no: 'Continue to next question',
                color: '#7F77DD',
              },
              {
                question: 'Do you need values bounded to a specific range [0,1] or [-1,1]?',
                yes: 'MinMaxScaler — compresses to specified range',
                no: 'Continue to next question',
                color: '#1D9E75',
              },
              {
                question: 'Are you computing cosine similarity or normalising vectors?',
                yes: 'Normalizer — scales each sample (row) to unit length',
                no: 'Continue to next question',
                color: '#BA7517',
              },
              {
                question: 'Default case — normal distribution, no outliers, no special requirements',
                yes: 'StandardScaler — the safe default for almost everything',
                no: '',
                color: '#378ADD',
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}30`,
                borderRadius: 8, padding: '12px 15px',
              }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    background: `${item.color}20`,
                    border: `1.5px solid ${item.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)',
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{item.question}</span>
                </div>
                <div style={{ paddingLeft: 30, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <div style={{ fontSize: 12, color: item.color, fontFamily: 'var(--font-mono)' }}>
                    → {item.yes}
                  </div>
                  {item.no && (
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                      ✗ {item.no}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </VisualBox>
      </div>

      <Div />

      {/* ══ SECTION 11 — ERRORS ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common scaling error — explained and fixed</h2>

        <ErrorBlock
          error="Model performance is slightly too good in cross-validation but worse in production"
          cause="You fit the scaler on the full dataset before the train/test split. The test set's mean and standard deviation were used to scale the training data. This is a mild form of data leakage — evaluation metrics are optimistic because the model has seen statistics derived from the test set."
          fix="Always split data first, then fit the scaler on X_train only. Use a sklearn Pipeline — it makes this mistake structurally impossible. Inside cross_val_score with a Pipeline, the scaler is refit on each training fold automatically."
        />

        <ErrorBlock
          error="ValueError: Input contains NaN — scaler fails on missing values"
          cause="StandardScaler, MinMaxScaler, and RobustScaler all fail if the input contains NaN. They cannot compute mean, std, or percentiles on missing values."
          fix="Impute missing values before scaling. Inside a Pipeline: Pipeline([('imputer', SimpleImputer(strategy='median')), ('scaler', StandardScaler())]). The imputer runs first, fills NaN with median, then the scaler runs on clean data."
        />

        <ErrorBlock
          error="Test set predictions are wildly off after scaling — values outside expected range"
          cause="The test set contains values outside the range seen in training. With MinMaxScaler, a test value above X_train.max() will produce a scaled value above 1.0. With StandardScaler, extreme test outliers produce scaled values far from the training distribution."
          fix="This is expected behaviour — do not re-fit the scaler on test data to fix it. The scaler should always use training statistics. Investigate why test values exceed training range: data drift, distribution shift, or a bug in data generation. Use RobustScaler if the training data itself has outliers that distort the scale."
        />

        <ErrorBlock
          error="After scaling and inverse_transform, values don't match original — floating point error"
          cause="Floating-point arithmetic introduces tiny rounding errors in the scale and inverse_transform steps. The round-trip x → scale → inverse_transform is not perfectly exact due to limited floating-point precision. This is not a bug."
          fix="Use np.allclose(original, recovered, rtol=1e-5) for comparison instead of np.array_equal. The differences will be on the order of 1e-10 to 1e-14 — completely negligible for any ML application. Only matters if you need exact bit-identical round-trips, which you never do in ML."
        />
      </div>

      <Div />

      {/* ══ SECTION 12 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          Scaling is now a reflex. Every algorithm you build from here uses it correctly.
        </h2>

        <p style={S.p}>
          StandardScaler inside a Pipeline, fit on training data only.
          This is the pattern you will repeat in every module from here.
          It takes three lines and prevents a class of subtle bugs that
          trip up even experienced practitioners.
        </p>

        <p style={S.p}>
          Module 18 builds your first complete ML model from scratch:
          linear regression. You'll see how the scaled features from this module
          feed directly into the gradient descent update from Module 05,
          and how regularisation (Ridge and Lasso) prevents overfitting —
          with the coefficients directly interpretable as feature importance.
        </p>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '16px 20px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 14,
        }}>
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase' as const, color: '#378ADD',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Module 18 · Classical ML
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Linear Regression — From Scratch to Production
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              OLS, gradient descent, Ridge, Lasso, ElasticNet —
              and how to diagnose every failure mode on real delivery data.
            </p>
          </div>
          <div style={{
            fontSize: 12, color: 'var(--muted)',
            border: '1px solid var(--border)',
            padding: '7px 14px', borderRadius: 6,
            fontFamily: 'var(--font-mono)',
          }}>
            coming soon
          </div>
        </div>
      </div>

      <KeyTakeaways
        items={[
          'Unscaled features distort gradient descent — features with large numerical ranges dominate weight updates. StandardScaler brings all features to mean=0, std=1, making gradient steps equal in all directions.',
          'StandardScaler: x_scaled = (x − μ) / σ. Robust to most distributions. Use as the default for linear models, logistic regression, SVMs, K-means, PCA, and neural networks.',
          'MinMaxScaler: x_scaled = (x − min) / (max − min). Produces values in [0,1]. Use when you need bounded output — neural network activations, cosine similarity, image pixels.',
          'RobustScaler: x_scaled = (x − median) / IQR. Ignores outliers when computing the scaling statistics. Use when your data has significant outliers that should not distort the scale of the majority.',
          'MaxAbsScaler divides by max absolute value — no mean subtraction. Use for sparse data (TF-IDF, one-hot) where zeroes must stay zero. Normalizer scales each row (sample) not each column (feature) — use for cosine similarity.',
          'Tree-based algorithms (Decision Tree, Random Forest, XGBoost, LightGBM) do not need feature scaling — splits are threshold-based and scale-invariant. Scaling has no effect on their performance.',
          'The only safe pattern: fit scaler on X_train only, transform both X_train and X_test. Use sklearn Pipeline to enforce this automatically in cross-validation. Never fit on the full dataset before splitting.',
        ]}
      />
    </LearnLayout>
  )
}