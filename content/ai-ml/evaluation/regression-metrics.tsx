import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Regression Metrics — MAE, RMSE, R² — Chaduvuko',
  description:
    'When your output is a number not a class. MAE, RMSE, MAPE, R², and which metric to choose based on how you want to treat large errors — built from plain English first.',
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
  p: { fontSize: 15, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 16 },
  ps: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 10 },
  sec: { paddingBottom: 56, paddingTop: 8, borderBottom: '1px solid var(--border)' },
  code: {
    fontFamily: 'var(--font-mono)', fontSize: 12,
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: 4, padding: '1px 6px', color: 'var(--accent)',
  },
}

function Div() { return <div style={{ height: 56 }} /> }

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

function AnalogyBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(0,230,118,0.04)',
      border: '1px solid rgba(0,230,118,0.2)',
      borderRadius: 8, padding: '16px 20px', marginBottom: 20,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase' as const, color: '#00e676',
        fontFamily: 'var(--font-mono)', marginBottom: 10,
      }}>
        🧠 Analogy — read this first
      </div>
      {children}
    </div>
  )
}

function ConceptBox({ title, children, color = '#1D9E75' }: {
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
        }}>Why it happens</div>
        <p style={{ ...S.ps, marginBottom: 10 }}>{cause}</p>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
          textTransform: 'uppercase' as const, color: '#00e676',
          fontFamily: 'var(--font-mono)', marginBottom: 4,
        }}>Fix</div>
        <p style={{ ...S.ps, marginBottom: 0 }}>{fix}</p>
      </div>
    </div>
  )
}

export default function RegressionMetricsPage() {
  return (
    <LearnLayout
      title="Regression Metrics — MAE, RMSE, R²"
      description="When your output is a number not a class. MAE, RMSE, MAPE, R², and which metric to choose based on how you want to treat large errors."
      section="Model Evaluation"
      readTime="25–30 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="evaluation" topic="regression-metrics" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — what makes regression evaluation different?</span>
        <h2 style={S.h2}>
          A classification model is either right or wrong.
          A regression model is never exactly right —
          the question is how wrong, and in what direction does wrong hurt more?
        </h2>

        <p style={S.p}>
          DoorDash predicts delivery time as 32 minutes. The actual time is 41 minutes.
          The model was wrong by 9 minutes. Is that acceptable?
          That depends on what DoorDash promised the customer.
          If the app said "arrives in 32 minutes" and it took 41, the customer is angry.
          The cost of underestimating is higher than the cost of overestimating.
        </p>

        <p style={S.p}>
          Now imagine one prediction was wrong by 9 minutes and another was wrong
          by 45 minutes. Are those two errors equally bad? For DoorDash, 45 minutes
          late might trigger a refund, damage the restaurant's rating, and
          lose the customer permanently. That one large error is catastrophically
          worse than five 9-minute errors. The metric you choose determines
          whether your model optimises to minimise all errors equally
          or to specifically avoid large ones.
        </p>

        <p style={S.p}>
          This is the core decision in regression evaluation:
          <strong style={{ color: '#1D9E75' }}> how do you want to penalise large errors?</strong>
          MAE treats all errors proportionally. RMSE squares the errors —
          large errors get penalised much more heavily. MAPE expresses error
          as a percentage — useful when the scale of the target varies.
          R² tells you how much better the model is than a naive baseline.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A cricket commentator says "India needs 12 runs per over."
            The team scores 10, 11, 13, 9, 12, 8 — never exactly 12.
            MAE asks: how far off was each over on average? Answer: about 1.5 runs.
            RMSE asks the same but doubles down on the 8-run over (4 under) —
            that 16-run miss from target hurts the team more than two 2-run misses.
            MAPE asks: what percentage of the target was each miss?
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            Choose MAE when all errors cost equally — late by 5 minutes is
            5× worse than late by 1 minute, nothing more.
            Choose RMSE when catastrophic errors cost disproportionately —
            one 45-minute delay is far worse than nine 5-minute delays.
          </p>
        </AnalogyBox>
      </div>

      <Div />

      {/* ══ SECTION 2 — THE FOUR METRICS ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The complete metric toolkit</span>
        <h2 style={S.h2}>Four metrics — formulas, intuitions, and when each is right</h2>

        <VisualBox label="Regression metrics — same predictions, different perspectives">
          <div style={{ overflowX: 'auto' as const }}>
            <table style={{ borderCollapse: 'collapse' as const, width: '100%', fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Prediction', 'Actual', 'Error', '|Error|', 'Error²', '|Error|/Actual'].map(h => (
                    <th key={h} style={{
                      padding: '8px 12px', textAlign: 'left' as const,
                      fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                      fontFamily: 'var(--font-mono)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  [32, 41, -9,  9,  81,  '22.0%'],
                  [45, 42,  3,  3,   9,  '7.1%'],
                  [28, 29, -1,  1,   1,  '3.4%'],
                  [52, 97,-45, 45, 2025, '46.4%'],
                  [38, 35,  3,  3,   9,  '8.6%'],
                ].map((row, i) => (
                  <tr key={i} style={{
                    borderBottom: '1px solid var(--border)',
                    background: row[2] === -45 ? 'rgba(255,71,87,0.05)' : 'transparent',
                  }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{
                        padding: '7px 12px',
                        fontFamily: 'var(--font-mono)',
                        color: j === 2
                          ? (Number(cell) < 0 ? '#ff4757' : '#1D9E75')
                          : j === 4 && Number(cell) > 1000 ? '#ff4757'
                          : 'var(--muted)',
                        fontWeight: row[2] === -45 && j > 1 ? 700 : 400,
                      }}>
                        {j === 5 ? cell : cell}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr style={{ borderTop: '2px solid var(--border)', background: 'var(--surface)' }}>
                  {['—', '—', '—', '12.2 → MAE', '425 → MSE', '17.5% → MAPE'].map((cell, j) => (
                    <td key={j} style={{
                      padding: '8px 12px',
                      fontFamily: 'var(--font-mono)', fontSize: 11,
                      fontWeight: 700,
                      color: j >= 3 ? '#1D9E75' : 'var(--muted)',
                    }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 12 }}>
            The 45-minute error (row 4) contributes 2025 to MSE — 25× more than
            the 9-minute error (81). In MAE it contributes 45 — only 5× more.
            RMSE = √(mean(MSE)) = √425 = 20.6 min. The one outlier dramatically
            inflates RMSE while MAE stays at 12.2.
          </p>
        </VisualBox>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[
            {
              name: 'MAE — Mean Absolute Error',
              formula: 'mean(|y − ŷ|)',
              color: '#378ADD',
              units: 'Same units as target',
              interpret: '"On average the model is off by X minutes."',
              penalises: 'All errors proportionally. A 10-min error is 2× worse than a 5-min error.',
              use: 'When all error magnitudes cost equally. Easy to explain to stakeholders.',
              avoid: 'When large errors are disproportionately costly.',
            },
            {
              name: 'RMSE — Root Mean Squared Error',
              formula: '√mean((y − ŷ)²)',
              color: '#D85A30',
              units: 'Same units as target',
              interpret: '"Typical error magnitude, with large errors weighted more heavily."',
              penalises: 'Large errors quadratically. A 10-min error is 4× worse than a 5-min error.',
              use: 'When catastrophic errors must be avoided. Standard in competitions.',
              avoid: 'When outliers are present and acceptable — RMSE will be dominated by them.',
            },
            {
              name: 'MAPE — Mean Absolute Percentage Error',
              formula: 'mean(|y − ŷ| / |y|) × 100',
              color: '#1D9E75',
              units: 'Percentage — scale-independent',
              interpret: '"On average the model is off by X% of the actual value."',
              penalises: 'Relative errors. Being off by 5 on a target of 10 is worse than off by 5 on a target of 100.',
              use: 'Comparing models across targets of different scales. Demand forecasting.',
              avoid: 'When true values are zero or near-zero — MAPE explodes. Not symmetric.',
            },
            {
              name: 'R² — Coefficient of Determination',
              formula: '1 − SS_res / SS_tot',
              color: '#7F77DD',
              units: 'Dimensionless (0 to 1, can be negative)',
              interpret: '"The model explains X% of the variance in the target."',
              penalises: 'Relative to the baseline of predicting the mean.',
              use: 'Quick sanity check. Comparing models on same dataset. R²=0.87 = 87% variance explained.',
              avoid: 'Comparing across datasets with different target variance. Can be misleading.',
            },
          ].map((item) => (
            <div key={item.name} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '13px 16px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)' }}>
                  {item.name}
                </span>
                <span style={{
                  fontSize: 12, fontFamily: 'var(--font-mono)', color: item.color,
                  background: `${item.color}15`, padding: '2px 8px', borderRadius: 3,
                }}>
                  {item.formula}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <p style={{ ...S.ps, marginBottom: 4 }}>
                    <strong style={{ color: 'var(--text)' }}>Units:</strong> {item.units}
                  </p>
                  <p style={{ ...S.ps, marginBottom: 4 }}>
                    <strong style={{ color: 'var(--text)' }}>Interpret:</strong> {item.interpret}
                  </p>
                  <p style={{ ...S.ps, marginBottom: 0 }}>
                    <strong style={{ color: 'var(--text)' }}>Penalises:</strong> {item.penalises}
                  </p>
                </div>
                <div>
                  <p style={{ ...S.ps, marginBottom: 4 }}>
                    <strong style={{ color: item.color }}>Use when:</strong> {item.use}
                  </p>
                  <p style={{ ...S.ps, marginBottom: 0 }}>
                    <strong style={{ color: '#ff4757' }}>Avoid when:</strong> {item.avoid}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <CodeBlock code={`import numpy as np
from sklearn.metrics import (mean_absolute_error,
                              mean_squared_error,
                              mean_absolute_percentage_error,
                              r2_score)

# ── Compute all four metrics from scratch ─────────────────────────────
y_true = np.array([41, 42, 29, 97, 35], dtype=float)
y_pred = np.array([32, 45, 28, 52, 38], dtype=float)

errors     = y_true - y_pred
abs_errors = np.abs(errors)

# MAE
mae_manual = abs_errors.mean()
mae_sklearn = mean_absolute_error(y_true, y_pred)

# MSE and RMSE
mse_manual  = (errors ** 2).mean()
rmse_manual = np.sqrt(mse_manual)
rmse_sklearn = np.sqrt(mean_squared_error(y_true, y_pred))

# MAPE
mape_manual  = (abs_errors / np.abs(y_true)).mean() * 100
mape_sklearn = mean_absolute_percentage_error(y_true, y_pred) * 100

# R²
ss_res = (errors ** 2).sum()
ss_tot = ((y_true - y_true.mean()) ** 2).sum()
r2_manual  = 1 - ss_res / ss_tot
r2_sklearn = r2_score(y_true, y_pred)

print("Manual vs sklearn verification:")
print(f"  MAE:   {mae_manual:.4f}  sklearn: {mae_sklearn:.4f}  match: {np.isclose(mae_manual, mae_sklearn)}")
print(f"  RMSE:  {rmse_manual:.4f}  sklearn: {rmse_sklearn:.4f}  match: {np.isclose(rmse_manual, rmse_sklearn)}")
print(f"  MAPE:  {mape_manual:.4f}%  sklearn: {mape_sklearn:.4f}%")
print(f"  R²:    {r2_manual:.4f}  sklearn: {r2_sklearn:.4f}  match: {np.isclose(r2_manual, r2_sklearn)}")

print(f"\nPer-sample contribution to each metric:")
print(f"{'Error':>8} {'|error|':>8} {'error²':>8} {'% error':>8}")
print("─" * 38)
for e, ae, y in zip(errors, abs_errors, y_true):
    pct = abs(e) / abs(y) * 100
    print(f"  {e:>6.0f}  {ae:>8.0f}  {ae**2:>8.0f}  {pct:>7.1f}%")
print(f"  {'Mean':>6}  {mae_manual:>8.1f}  {mse_manual:>8.0f}  {mape_manual:>7.1f}%")
print(f"  {'':>6}  {'↑MAE':>8}  {'√→RMSE':>8}")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — R² IN DEPTH ═════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Understanding R²</span>
        <h2 style={S.h2}>R² — what it measures, why it can go negative, and when it misleads</h2>

        <p style={S.p}>
          R² measures how much better your model is than the simplest possible
          baseline: always predicting the mean. If someone asked you to predict
          DoorDash delivery times with no model at all, your best guess would be
          the historical mean — about 36 minutes for everything.
          R² = 0 means your model is exactly as good as that naive guess.
          R² = 0.87 means your model explains 87% of the variance that the
          mean baseline cannot explain. R² = 1 is a perfect model.
        </p>

        <p style={S.p}>
          R² can go below zero. This happens when your model is worse than
          just predicting the mean — its predictions are so bad they increase
          the total squared error beyond what a constant prediction would give.
          A negative R² is a signal that something is severely wrong:
          wrong features, data leakage in reverse, or a completely broken pipeline.
        </p>

        <ConceptBox title="R² decomposition — what SS_res and SS_tot represent">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2 }}>
            <div style={{ color: '#7F77DD', marginBottom: 4 }}>
              R² = 1 − SS_res / SS_tot
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: 'var(--muted)' }}>
              <div>SS_tot = Σ(yᵢ − ȳ)²   ← total variance in the data (baseline error)</div>
              <div>SS_res = Σ(yᵢ − ŷᵢ)² ← residual variance after model (model error)</div>
              <div style={{ color: '#1D9E75' }}>R² = 1: SS_res=0 → perfect predictions</div>
              <div style={{ color: '#BA7517' }}>R² = 0: SS_res=SS_tot → no better than the mean</div>
              <div style={{ color: '#ff4757' }}>R² {'<'} 0: SS_res {'>'} SS_tot → worse than the mean</div>
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
from sklearn.metrics import r2_score
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 2000
distance = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic  = np.random.randint(1, 11, n).astype(float)
prep     = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
delivery = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
            + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep])
y = delivery
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

# ── R² for different models ───────────────────────────────────────────
models = {
    'Always predict mean (baseline)': None,
    'Linear Regression':              LinearRegression(),
    'Gradient Boosting':              GradientBoostingRegressor(
                                          n_estimators=200, random_state=42),
    'Shuffled labels (broken)':       'shuffled',
}

print(f"R² comparison — DoorDash delivery time:")
print(f"{'Model':<35} {'R²':>8} {'MAE':>8} {'RMSE':>8}")
print("─" * 64)

for name, model in models.items():
    if model is None:
        y_pred = np.full_like(y_te, y_tr.mean())
    elif model == 'shuffled':
        y_pred = np.random.permutation(y_te)   # random predictions
    else:
        model.fit(X_tr, y_tr)
        y_pred = model.predict(X_te)

    r2   = r2_score(y_te, y_pred)
    mae  = np.mean(np.abs(y_te - y_pred))
    rmse = np.sqrt(np.mean((y_te - y_pred)**2))
    flag = '← always predict mean' if model is None else \
           '← worse than baseline!' if r2 < 0 else ''
    print(f"  {name:<33}  {r2:>8.4f}  {mae:>8.4f}  {rmse:>8.4f}  {flag}")

# ── Adjusted R² — penalises adding useless features ───────────────────
# Standard R² always increases when you add more features (even noise)
# Adjusted R² penalises extra features that do not improve the model
def adjusted_r2(r2, n, p):
    """r2: R², n: samples, p: number of features"""
    return 1 - (1 - r2) * (n - 1) / (n - p - 1)

for n_noise in [0, 5, 10, 20]:
    X_noise = np.hstack([X_tr, np.random.randn(len(X_tr), n_noise)])
    X_te_n  = np.hstack([X_te, np.random.randn(len(X_te), n_noise)])
    lr = LinearRegression().fit(X_noise, y_tr)
    y_pred_n = lr.predict(X_te_n)
    r2_val  = r2_score(y_te, y_pred_n)
    adj_r2  = adjusted_r2(r2_val, len(X_te_n), X_noise.shape[1])
    n_feat  = 3 + n_noise
    print(f"  {n_feat} features ({n_noise} noise): R²={r2_val:.4f}  Adj R²={adj_r2:.4f}"
          f"  {'← noise inflated R²' if n_noise > 0 else ''}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — CHOOSING YOUR METRIC ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Making the decision</span>
        <h2 style={S.h2}>Which metric to use — a decision framework</h2>

        <p style={S.p}>
          The right metric is determined by the business cost structure
          of your errors, not by convention. Before picking a metric,
          answer two questions: are large errors disproportionately costly?
          And does the scale of the target vary across predictions?
        </p>

        <VisualBox label="Metric selection decision tree">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                question: 'Are large errors disproportionately costly?',
                yes: 'Use RMSE — it penalises large errors quadratically',
                no:  'Use MAE — it treats all errors proportionally',
                yesColor: '#D85A30',
                noColor: '#378ADD',
                example: 'DoorDash: one 45-min delay triggers a refund (costly) → RMSE. Stock price: all errors equally bad → MAE.',
              },
              {
                question: 'Do targets vary in scale across predictions?',
                yes: 'Use MAPE — percentage error is scale-independent',
                no:  'Use MAE or RMSE — absolute errors are comparable',
                yesColor: '#1D9E75',
                noColor: '#BA7517',
                example: 'Demand forecasting: selling 1000 units vs 10 units — 5-unit error means different things. Use MAPE.',
              },
              {
                question: 'Do you need a relative performance number?',
                yes: 'Report R² alongside MAE/RMSE for context',
                no:  'Report MAE or RMSE in the target units',
                yesColor: '#7F77DD',
                noColor: '#888',
                example: 'Report to stakeholders: "MAE = 4.2 minutes (R² = 0.87)" gives both absolute and relative context.',
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'var(--surface)', borderRadius: 8,
                padding: '12px 14px', border: '1px solid var(--border)',
              }}>
                <div style={{
                  fontSize: 13, fontWeight: 700, color: 'var(--text)',
                  fontFamily: 'var(--font-display)', marginBottom: 8,
                }}>
                  Q{i+1}: {item.question}
                </div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 8, flexWrap: 'wrap' as const }}>
                  <div style={{
                    background: `${item.yesColor}15`, border: `1px solid ${item.yesColor}30`,
                    borderRadius: 5, padding: '5px 10px', fontSize: 12, color: item.yesColor,
                  }}>
                    Yes → {item.yes}
                  </div>
                  <div style={{
                    background: `${item.noColor}15`, border: `1px solid ${item.noColor}30`,
                    borderRadius: 5, padding: '5px 10px', fontSize: 12, color: item.noColor,
                  }}>
                    No → {item.no}
                  </div>
                </div>
                <p style={{ ...S.ps, marginBottom: 0, fontStyle: 'italic' }}>
                  Example: {item.example}
                </p>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.metrics import (mean_absolute_error, mean_squared_error,
                              mean_absolute_percentage_error, r2_score)
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import cross_validate, KFold
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 3000
distance = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic  = np.random.randint(1, 11, n).astype(float)
prep     = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
delivery = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
            + np.random.normal(0, 4, n)).clip(10, 120)
X = np.column_stack([distance, traffic, prep])
y = delivery

pipeline = Pipeline([
    ('sc', StandardScaler()),
    ('m',  GradientBoostingRegressor(n_estimators=200, learning_rate=0.1,
                                      max_depth=3, random_state=42)),
])

# ── Always compare against a baseline ─────────────────────────────────
from sklearn.model_selection import train_test_split
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
pipeline.fit(X_tr, y_tr)
y_pred = pipeline.predict(X_te)

# Baselines
y_mean   = np.full_like(y_te, y_tr.mean())
y_median = np.full_like(y_te, np.median(y_tr))

print("Model vs baselines — DoorDash delivery time:")
print(f"{'Model':<25} {'MAE':>8} {'RMSE':>8} {'MAPE%':>8} {'R²':>8}")
print("─" * 62)

for label, pred in [
    ('Always predict mean',   y_mean),
    ('Always predict median', y_median),
    ('Gradient Boosting',     y_pred),
]:
    mae  = mean_absolute_error(y_te, pred)
    rmse = np.sqrt(mean_squared_error(y_te, pred))
    mape = mean_absolute_percentage_error(y_te, pred) * 100
    r2   = r2_score(y_te, pred)
    print(f"  {label:<23}  {mae:>8.4f}  {rmse:>8.4f}  {mape:>8.2f}  {r2:>8.4f}")

# ── Cross-validate multiple metrics at once ────────────────────────────
def rmse_scorer(est, X, y):
    return -np.sqrt(mean_squared_error(y, est.predict(X)))

from sklearn.metrics import make_scorer
cv_results = cross_validate(
    pipeline, X, y,
    cv=KFold(5, shuffle=True, random_state=42),
    scoring={
        'mae':  make_scorer(mean_absolute_error, greater_is_better=False),
        'rmse': make_scorer(rmse_scorer, greater_is_better=False),
        'r2':   'r2',
        'mape': make_scorer(mean_absolute_percentage_error,
                             greater_is_better=False),
    },
    return_train_score=False,
)

print(f"\n5-fold CV across all metrics:")
print(f"  MAE:   {-cv_results['test_mae'].mean():.4f} ± {cv_results['test_mae'].std():.4f} min")
print(f"  RMSE:  {-cv_results['test_rmse'].mean():.4f} ± {cv_results['test_rmse'].std():.4f} min")
print(f"  MAPE:  {-cv_results['test_mape'].mean()*100:.2f}% ± {cv_results['test_mape'].std()*100:.2f}%")
print(f"  R²:    {cv_results['test_r2'].mean():.4f} ± {cv_results['test_r2'].std():.4f}")

# ── RMSE vs MAE ratio reveals outlier presence ─────────────────────────
rmse_val = -cv_results['test_rmse'].mean()
mae_val  = -cv_results['test_mae'].mean()
ratio    = rmse_val / mae_val
print(f"\nRMSE / MAE ratio: {ratio:.2f}")
print("  Ratio ≈ 1.0: errors are uniform, no major outliers")
print("  Ratio > 2.0: large outlier errors present — investigate them")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — RESIDUAL ANALYSIS ═══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Beyond the summary number</span>
        <h2 style={S.h2}>Residual analysis — where is the model systematically wrong?</h2>

        <p style={S.p}>
          A single MAE number hides a lot. A model with MAE = 4.2 minutes might
          be consistently accurate for short deliveries but systematically wrong
          for long-distance orders. The aggregate metric looks fine while a whole
          segment of customers is getting bad predictions. Residual analysis
          reveals these systematic patterns.
        </p>

        <CodeBlock code={`import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 3000
distance = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic  = np.random.randint(1, 11, n).astype(float)
prep     = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
delivery = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
            + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep])
y = delivery
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
pipeline = Pipeline([
    ('sc', StandardScaler()),
    ('m',  GradientBoostingRegressor(n_estimators=200, random_state=42)),
])
pipeline.fit(X_tr, y_tr)
y_pred = pipeline.predict(X_te)

residuals = y_te - y_pred   # positive = underestimate, negative = overestimate

print(f"Overall MAE: {mean_absolute_error(y_te, y_pred):.4f} min")

# ── Are residuals biased? ──────────────────────────────────────────────
mean_residual = residuals.mean()
print(f"\nMean residual: {mean_residual:+.4f} min")
print(f"  {'← model systematically underestimates' if mean_residual > 0.5 else '← model systematically overestimates' if mean_residual < -0.5 else '← no systematic bias'}")

# ── Error by delivery time bucket ─────────────────────────────────────
print(f"\nMAE by delivery time bucket:")
for low, high in [(10,20),(20,30),(30,45),(45,60),(60,120)]:
    mask = (y_te >= low) & (y_te < high)
    if mask.sum() > 10:
        mae_bucket  = mean_absolute_error(y_te[mask], y_pred[mask])
        bias_bucket = residuals[mask].mean()
        print(f"  {low:2d}–{high:3d} min  n={mask.sum():4d}  "
              f"MAE={mae_bucket:.2f}  bias={bias_bucket:+.2f}")

# ── Error by distance bucket ──────────────────────────────────────────
dist_te = X_te[:, 0]   # distance feature in test set
print(f"\nMAE by delivery distance:")
for low, high in [(0,2),(2,4),(4,7),(7,10),(10,15)]:
    mask = (dist_te >= low) & (dist_te < high)
    if mask.sum() > 10:
        mae_d = mean_absolute_error(y_te[mask], y_pred[mask])
        print(f"  {low:.0f}–{high:.0f} km   n={mask.sum():4d}  MAE={mae_d:.2f} min")

# ── Largest errors — what went wrong? ─────────────────────────────────
worst_idx   = np.argsort(np.abs(residuals))[-5:][::-1]
print(f"\nTop 5 worst predictions:")
print(f"  {'Actual':>8} {'Predicted':>10} {'Error':>8} {'Dist':>6} {'Traffic':>8} {'Prep':>6}")
print("  " + "─" * 52)
for idx in worst_idx:
    print(f"  {y_te[idx]:>8.1f} {y_pred[idx]:>10.1f} {residuals[idx]:>+8.1f} "
          f"{X_te[idx,0]:>6.1f}  {X_te[idx,1]:>8.0f}  {X_te[idx,2]:>6.0f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common regression metric mistake — explained and fixed</h2>

        <ErrorBlock
          error="R² is negative — model is worse than predicting the mean"
          cause="Three common causes: the model was trained on different data than it is being evaluated on (wrong split, data leakage in reverse), the features have no relationship to the target on the test set, or the model was fit with the wrong target (e.g. predicting log(y) but evaluating on y). Negative R² means SS_res > SS_tot — the model's errors are larger than if you had just predicted the mean for everything."
          fix="Check that training and test data come from the same distribution. Print y_train.mean() and y_test.mean() — if very different, the split is wrong. Print model.predict(X_test)[:5] and y_test[:5] — if predictions are in a completely different range, the target was transformed during training but not reversed at evaluation. Always un-transform predictions before computing metrics."
        />

        <ErrorBlock
          error="MAPE is infinity or extremely large (1000%+)"
          cause="One or more true values in y_true are zero or very close to zero. MAPE divides by y_true — division by zero produces infinity which propagates through the mean. Even a single zero target makes MAPE meaningless for the entire evaluation."
          fix="Never use MAPE when targets can be zero. Use MAE or RMSE instead. If zero targets are rare edge cases, filter them: mask = y_true > 0; mape = mean_absolute_percentage_error(y_true[mask], y_pred[mask]). Consider symmetric MAPE (sMAPE) which divides by (|y_true| + |y_pred|)/2 — defined even when y_true=0 though it has other issues."
        />

        <ErrorBlock
          error="RMSE looks terrible but the model is actually useful in production"
          cause="RMSE is dominated by a small number of very large errors — outliers in the test set. Five predictions off by 1 minute each and one prediction off by 50 minutes gives RMSE ≈ 20 minutes, making the model look terrible even though 5 out of 6 predictions are nearly perfect. The summary metric hides the distribution of errors."
          fix="Always inspect the error distribution alongside RMSE. Plot a histogram of residuals. Compute the 50th, 90th, and 95th percentile of |residuals|: np.percentile(np.abs(residuals), [50, 90, 95]). Report 'MAE = 3.2 min, 90th percentile error = 8.1 min' — much more informative than a single RMSE of 12. Investigate the large errors separately — they often reveal a specific failure mode."
        />

        <ErrorBlock
          error="R² is high (0.92) but MAE is also high — stakeholders are confused"
          cause="R² and MAE measure fundamentally different things. R²=0.92 means the model explains 92% of the variance — it is highly correlated with the target. But if the target has very high variance (delivery times ranging from 10 to 120 minutes), 92% explained variance still leaves 8% unexplained, which in absolute terms could be 8 minutes of MAE. High R² does not mean small absolute errors."
          fix="Always report metrics in the target's units (MAE, RMSE in minutes) alongside R². Stakeholders understand 'off by 4.2 minutes on average' better than 'R²=0.87'. Use R² for comparing models on the same dataset and for communicating relative improvement. Use MAE/RMSE for communicating operational accuracy."
        />
      </div>

      <Div />

      {/* ══ SECTION 7 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          The Evaluation section is complete. Section 7 — Deep Learning — begins next.
        </h2>

        <p style={S.p}>
          You have now completed every module in the Model Evaluation section:
          classification metrics, calibration, ROC curves, cross-validation,
          hyperparameter tuning, model interpretability, and regression metrics.
          You can honestly evaluate any model — classifier or regressor —
          and communicate its performance to any audience.
        </p>

        <p style={S.p}>
          Section 7 — Deep Learning — begins with Module 41.
          Everything changes: instead of hand-crafted features,
          the model learns its own representations from raw data.
          Module 41 builds a neural network from scratch in NumPy —
          forward pass, backpropagation, gradient descent —
          before introducing PyTorch.
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
              textTransform: 'uppercase' as const, color: '#7b61ff',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Module 41 · Deep Learning
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Neural Networks from Scratch
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Forward pass, backpropagation, and gradient descent built in NumPy
              before touching PyTorch. The foundation every deep learning framework
              is built on.
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
          'MAE treats all errors proportionally — a 10-minute error is exactly 2× worse than a 5-minute error. RMSE squares the errors first — a 10-minute error is 4× worse than a 5-minute error. Choose based on whether large errors in your domain are disproportionately costly.',
          'MAPE expresses error as a percentage of the actual value — scale-independent and useful when targets span different magnitudes. Never use MAPE when true values can be zero — division by zero makes it undefined.',
          'R² measures how much better the model is than predicting the mean. R²=0.87 means 87% of variance explained. R²=0 means no better than the mean. Negative R² means worse than the mean — a signal of a severely broken pipeline.',
          'Always compare your model against a naive baseline before reporting any metric. If the baseline (always predict mean) has MAE=12.4 and your model has MAE=11.9, the improvement is marginal despite the metric looking reasonable in isolation.',
          'The RMSE/MAE ratio reveals the outlier situation. Ratio near 1.0 means errors are uniform. Ratio above 2.0 means a few very large errors are dominating RMSE. Always inspect the error distribution — report percentile errors (50th, 90th, 95th) alongside summary metrics.',
          'Residual analysis exposes systematic bias that aggregate metrics hide. Always check: is the mean residual near zero (no bias)? Does error vary by prediction range or input feature? Are the largest errors concentrated in a specific segment? A model with good overall MAE can be systematically wrong for a specific customer group.',
        ]}
      />
    </LearnLayout>
  )
}