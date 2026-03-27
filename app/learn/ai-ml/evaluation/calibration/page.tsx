import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Calibration — Are Your Probabilities Trustworthy? — Chaduvuko',
  description:
    'Reliability diagrams, Brier score, and Platt scaling vs isotonic regression — when your model says 80% fraud probability, does it actually mean 80%?',
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

export default function CalibrationPage() {
  return (
    <LearnLayout
      title="Calibration — Are Your Probabilities Trustworthy?"
      description="Reliability diagrams, Brier score, and Platt scaling vs isotonic regression — when your model says 80% fraud probability, does it actually mean 80%?"
      section="Model Evaluation"
      readTime="30–35 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="evaluation" topic="calibration" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — what problem does calibration solve?</span>
        <h2 style={S.h2}>
          Your fraud model says P(fraud) = 0.85 for a transaction.
          That should mean 85 out of 100 such transactions are genuinely fraudulent.
          Is that actually true? Almost certainly not — without calibration.
        </h2>

        <p style={S.p}>
          Module 34 taught you that ROC-AUC measures ranking quality — does the model
          score fraud higher than legitimate transactions? A model with AUC = 0.95
          is excellent at ranking. But ranking quality says nothing about whether
          the actual probability values are meaningful.
        </p>

        <p style={S.p}>
          A Razorpay credit risk model outputs a score of 0.85 for a loan application.
          The credit officer interprets this as "85% probability of default."
          They reject the loan. But if that model is poorly calibrated,
          0.85 might actually correspond to a 40% default rate —
          meaning the officer rejected a loan that should have been approved.
          The model's score is directionally correct (high scores mean higher risk)
          but the actual probability value is wrong.
        </p>

        <p style={S.p}>
          Calibration is the property that a predicted probability of 0.85
          corresponds to an actual observed frequency of 85%.
          Among all predictions where the model said 0.85, approximately
          85% of them should turn out to be positive.
          This property is called <strong style={{ color: '#1D9E75' }}>reliability</strong>
          — the predictions are reliable as probability estimates, not just rankings.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A weather forecaster who says "70% chance of rain" is well-calibrated
            if it actually rains on about 70% of the days they make that prediction.
            A poorly-calibrated forecaster might say "70%" but it only rains 30%
            of those days — their confidence is systematically too high.
            You still trust their ranking (70% means more likely than 40%)
            but you cannot trust the actual number.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            ML models are forecasters. ROC-AUC measures whether their rankings
            are correct. Calibration measures whether their actual numbers are correct.
            Both matter — but only calibration lets you use the probabilities
            for quantitative business decisions.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          Calibration matters most when the probability value itself drives a decision:
          credit scoring (what is the default probability?), medical diagnosis
          (what is the cancer probability?), insurance pricing (what is the
          claim probability?). If you only care about ranking — which transaction
          is most likely fraud? — calibration is less critical.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — THE RELIABILITY DIAGRAM ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Visualising calibration</span>
        <h2 style={S.h2}>The reliability diagram — one chart that shows everything</h2>

        <p style={S.p}>
          The reliability diagram (also called a calibration plot) is the
          standard tool for visualising calibration. You group predictions
          into bins by predicted probability (0–0.1, 0.1–0.2, etc.),
          then for each bin you compare the predicted probability
          to the actual fraction of positive cases observed.
          A perfectly calibrated model produces points along the diagonal.
          Deviations reveal systematic over- or under-confidence.
        </p>

        <VisualBox label="Reliability diagram — three calibration patterns">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[
              {
                title: 'Perfect calibration',
                color: '#1D9E75',
                desc: 'Points on the diagonal. Predicted 0.7 → 70% actually positive.',
                curve: 'M 30 170 L 170 30',
                points: [[30,170],[62,138],[94,106],[126,74],[158,42]],
              },
              {
                title: 'Overconfident',
                color: '#D85A30',
                desc: 'S-curve below diagonal. Model pushes probabilities to extremes.',
                curve: 'M 30 170 Q 50 160 80 130 Q 110 100 130 70 Q 150 45 170 30',
                points: [[30,170],[70,145],[100,110],[130,75],[158,42]],
                actualCurve: 'M 30 165 Q 70 145 100 105 Q 130 68 170 30',
              },
              {
                title: 'Underconfident',
                color: '#BA7517',
                desc: 'Curve above diagonal. Model hedges — avoids extreme probabilities.',
                curve: 'M 30 170 L 170 30',
                actualCurve: 'M 30 155 Q 70 125 100 100 Q 130 78 170 45',
                points: [[30,155],[70,128],[100,100],[130,78],[158,48]],
              },
            ].map((item) => (
              <div key={item.title}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: item.color,
                  fontFamily: 'var(--font-mono)', marginBottom: 6,
                }}>
                  {item.title}
                </div>
                <svg width="100%" viewBox="0 0 200 200">
                  {/* Axes */}
                  <line x1="25" y1="175" x2="175" y2="175" stroke="#555" strokeWidth="1" />
                  <line x1="25" y1="25"  x2="25"  y2="175" stroke="#555" strokeWidth="1" />
                  {/* Labels */}
                  <text x="100" y="195" textAnchor="middle" fontSize="8"
                    fill="#888" fontFamily="monospace">predicted prob</text>
                  <text x="10" y="100" fontSize="8" fill="#888" fontFamily="monospace"
                    transform="rotate(-90,10,100)">actual rate</text>
                  {/* Perfect diagonal */}
                  <line x1="25" y1="175" x2="175" y2="25"
                    stroke="#444" strokeWidth="1" strokeDasharray="4,3" />
                  {/* Model curve */}
                  <path d={item.actualCurve || item.curve}
                    fill="none" stroke={item.color} strokeWidth="2.5" />
                  {/* Points */}
                  {item.points.map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="4"
                      fill={item.color} opacity="0.8" />
                  ))}
                  {/* Tick labels */}
                  {[0.2,0.4,0.6,0.8,1.0].map((v, i) => (
                    <g key={v}>
                      <text x={25+i*37.5} y="185" textAnchor="middle"
                        fontSize="7" fill="#666" fontFamily="monospace">{v}</text>
                    </g>
                  ))}
                </svg>
                <p style={{ ...S.ps, marginBottom: 0, fontSize: 11 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.calibration import calibration_curve
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 8_000

# Razorpay credit scoring dataset
income        = np.abs(np.random.normal(50_000, 30_000, n)).clip(8_000, 500_000)
existing_emis = np.abs(np.random.normal(8_000, 6_000, n)).clip(0, 80_000)
credit_score  = np.abs(np.random.normal(680, 80, n)).clip(300, 900)
employment_yr = np.abs(np.random.normal(4, 3, n)).clip(0, 30)
loan_amount   = np.abs(np.random.normal(200_000, 150_000, n)).clip(10_000, 2_000_000)

default_score = (
    -(credit_score - 680) / 80 * 0.40
    + (existing_emis / income) * 0.30
    + (loan_amount / income / 12) * 0.20
    - employment_yr / 30 * 0.10
    + np.random.randn(n) * 0.15
)
y = (default_score > 0.3).astype(int)
X = np.column_stack([income, existing_emis, credit_score,
                     employment_yr, loan_amount])

X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)
sc      = StandardScaler()
X_tr_sc = sc.fit_transform(X_tr)
X_te_sc = sc.transform(X_te)

# ── Train three models ─────────────────────────────────────────────────
models = {
    'LogisticRegression': LogisticRegression(max_iter=1000, random_state=42),
    'RandomForest':       RandomForestClassifier(n_estimators=100, random_state=42),
    'GradientBoosting':   GradientBoostingClassifier(n_estimators=200,
                            learning_rate=0.1, max_depth=3, random_state=42),
}

print("Calibration check per model (reliability diagram data):")
print(f"{'Model':<22} {'Bin':<8} {'Predicted':>10} {'Actual':>10} {'Gap':>8}")
print("─" * 62)

for name, model in models.items():
    model.fit(X_tr_sc, y_tr)
    y_prob = model.predict_proba(X_te_sc)[:, 1]

    # calibration_curve: bin predicted probs, compare to actual fraction
    fraction_pos, mean_pred = calibration_curve(
        y_te, y_prob, n_bins=10, strategy='uniform'
    )
    print(f"\n  {name}:")
    for fp, mp in zip(fraction_pos, mean_pred):
        gap = fp - mp
        bar = '▸' * int(abs(gap) * 40)
        direction = '+' if gap > 0 else '-'
        print(f"    pred={mp:.2f}  actual={fp:.2f}  gap={direction}{abs(gap):.3f}  {bar}")

    # Mean calibration error
    mce = np.mean(np.abs(fraction_pos - mean_pred))
    print(f"  Mean calibration error: {mce:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — BRIER SCORE ═════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Measuring calibration with one number</span>
        <h2 style={S.h2}>Brier score — the single best metric for probability quality</h2>

        <p style={S.p}>
          The reliability diagram is visual. When you need a single number
          to compare models or track calibration over time, use the
          <strong style={{ color: '#1D9E75' }}> Brier score</strong> —
          the mean squared error between predicted probabilities and actual labels.
        </p>

        <p style={S.p}>
          A Brier score of 0 is perfect. A Brier score of 0.25 is what you get
          from predicting the base rate every time (the baseline).
          Anything between 0 and the baseline is better than random.
          The lower the Brier score, the more accurate the probability estimates.
          Unlike ROC-AUC, the Brier score penalises overconfident predictions
          — a model that says 0.99 for a case that turns out negative
          is penalised heavily.
        </p>

        <ConceptBox title="Brier score decomposition — three components">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2 }}>
            <div style={{ color: '#1D9E75', marginBottom: 6 }}>
              Brier = (1/n) × Σ(p̂ᵢ − yᵢ)²
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--muted)' }}>
              <div>p̂ᵢ = predicted probability for sample i (between 0 and 1)</div>
              <div>yᵢ = actual label for sample i (0 or 1)</div>
              <div style={{ color: '#1D9E75' }}>Brier = 0.0 → perfect probability estimates</div>
              <div style={{ color: '#BA7517' }}>Brier = base_rate × (1 − base_rate) → predicting the mean every time</div>
              <div style={{ color: '#ff4757' }}>Brier = 1.0 → worst possible (predict 1 for every 0, and vice versa)</div>
            </div>
          </div>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 10 }}>
            The Brier score can be decomposed into three components:
            <strong style={{ color: '#D85A30' }}> calibration</strong> (how far are the predicted probs from the actual rates?),
            <strong style={{ color: '#378ADD' }}> resolution</strong> (does the model separate positives from negatives?),
            and <strong style={{ color: '#888' }}> uncertainty</strong> (inherent noise in the problem).
            Good models minimise calibration error while maximising resolution.
          </p>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
from sklearn.metrics import brier_score_loss
from sklearn.calibration import calibration_curve, CalibratedClassifierCV
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 8_000

income        = np.abs(np.random.normal(50_000, 30_000, n)).clip(8_000, 500_000)
existing_emis = np.abs(np.random.normal(8_000, 6_000, n)).clip(0, 80_000)
credit_score  = np.abs(np.random.normal(680, 80, n)).clip(300, 900)
employment_yr = np.abs(np.random.normal(4, 3, n)).clip(0, 30)
loan_amount   = np.abs(np.random.normal(200_000, 150_000, n)).clip(10_000, 2_000_000)
default_score = (
    -(credit_score-680)/80*0.40 + (existing_emis/income)*0.30
    + (loan_amount/income/12)*0.20 - employment_yr/30*0.10
    + np.random.randn(n)*0.15
)
y = (default_score > 0.3).astype(int)
X = np.column_stack([income, existing_emis, credit_score, employment_yr, loan_amount])

X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)
sc      = StandardScaler()
X_tr_sc = sc.fit_transform(X_tr)
X_te_sc = sc.transform(X_te)

# ── Baseline Brier score ───────────────────────────────────────────────
base_rate         = y_te.mean()
baseline_brier    = base_rate * (1 - base_rate)
always_zero_brier = brier_score_loss(y_te, np.zeros(len(y_te)))
always_base_brier = brier_score_loss(y_te, np.full(len(y_te), base_rate))

print(f"Baseline context:")
print(f"  Default rate:               {base_rate:.3f}  ({base_rate*100:.1f}%)")
print(f"  Baseline Brier (predict mean): {always_base_brier:.4f}")
print(f"  Brier (always predict 0):   {always_zero_brier:.4f}")
print()

# ── Compare models ─────────────────────────────────────────────────────
models = {
    'LogisticRegression': LogisticRegression(max_iter=1000, random_state=42),
    'RandomForest':       RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1),
    'GradientBoosting':   GradientBoostingClassifier(n_estimators=200,
                            learning_rate=0.1, max_depth=3, random_state=42),
}

from sklearn.metrics import roc_auc_score
print(f"{'Model':<22} {'Brier':>8} {'vs baseline':>12} {'ROC-AUC':>9}")
print("─" * 56)

for name, model in models.items():
    model.fit(X_tr_sc, y_tr)
    y_prob = model.predict_proba(X_te_sc)[:, 1]
    brier  = brier_score_loss(y_te, y_prob)
    auc    = roc_auc_score(y_te, y_prob)
    improv = (always_base_brier - brier) / always_base_brier * 100
    print(f"  {name:<20}  {brier:>8.4f}  {improv:>+10.1f}%  {auc:>9.4f}")

# ── Brier skill score — normalised Brier ─────────────────────────────
# BSS = 1 − Brier / Brier_baseline
# BSS = 1.0: perfect. BSS = 0: no better than baseline. BSS < 0: worse.
print("\nBrier Skill Score (BSS = 1 − Brier/Baseline):")
for name, model in models.items():
    y_prob = model.predict_proba(X_te_sc)[:, 1]
    brier  = brier_score_loss(y_te, y_prob)
    bss    = 1 - brier / always_base_brier
    bar    = '█' * int(bss * 40)
    print(f"  {name:<20}: {bar:<40} {bss:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — WHY MODELS ARE MISCALIBRATED ═══════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Why does miscalibration happen?</span>
        <h2 style={S.h2}>Three algorithms — three characteristic miscalibration patterns</h2>

        <p style={S.p}>
          Different algorithms have different systematic calibration failures.
          Knowing which algorithm tends to be miscalibrated in which direction
          tells you whether calibration is likely needed and which method to apply.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[
            {
              algo: 'Random Forest',
              color: '#1D9E75',
              pattern: 'Pushes probabilities toward 0.5 — underconfident',
              why: 'RF probabilities are the fraction of trees voting positive. With 100 trees, the maximum possible probability is 100/100 = 1.0 in theory, but in practice the averaging across diverse trees pulls extreme predictions toward the centre. Few samples ever get 95+ out of 100 trees to agree.',
              shape: 'S-curve above the diagonal — predicted 0.3 is actually 0.2, predicted 0.7 is actually 0.8',
            },
            {
              algo: 'Gradient Boosting / XGBoost / LightGBM',
              color: '#D85A30',
              pattern: 'Pushes probabilities toward extremes — overconfident',
              why: 'Boosting with many trees on the log-loss objective aggressively separates classes. The model becomes very confident after hundreds of corrections, pushing probabilities toward 0 and 1. Especially severe when max_depth is large or n_estimators is high with a low learning rate.',
              shape: 'S-curve below the diagonal — predicted 0.8 is actually 0.6, predicted 0.2 is actually 0.4',
            },
            {
              algo: 'Naive Bayes',
              color: '#BA7517',
              pattern: 'Severely overconfident — probabilities near 0 and 1',
              why: 'The naive independence assumption causes probability products to push toward 0 and 1 very aggressively. Module 27 covers this. With 20 correlated features, multiplying 20 individual likelihoods produces extreme products even for ambiguous cases.',
              shape: 'Most predictions near 0 or 1 — almost nothing in the middle range',
            },
            {
              algo: 'Logistic Regression',
              color: '#378ADD',
              pattern: 'Generally well-calibrated when features are independent',
              why: 'Logistic regression is trained to directly minimise log-loss which is a proper scoring rule — minimising it forces the output probabilities to match the true class frequencies. It is the only common classifier with this property by design.',
              shape: 'Close to the diagonal when model assumptions are met',
            },
          ].map((item) => (
            <div key={item.algo} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '13px 16px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)' }}>
                  {item.algo}
                </span>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: item.color,
                  fontFamily: 'var(--font-mono)', padding: '2px 6px',
                  background: `${item.color}15`, borderRadius: 3,
                }}>
                  {item.pattern}
                </span>
              </div>
              <p style={{ ...S.ps, marginBottom: 5 }}>{item.why}</p>
              <div style={{ fontSize: 11, color: item.color, fontStyle: 'italic' }}>
                Shape: {item.shape}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Div />

      {/* ══ SECTION 5 — CALIBRATING A MODEL ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Fixing miscalibration</span>
        <h2 style={S.h2}>Two calibration methods — Platt scaling and isotonic regression</h2>

        <p style={S.p}>
          Once you have detected miscalibration (reliability diagram off-diagonal,
          high Brier score), you can fix it using a post-hoc calibration method.
          These methods do not retrain the model — they fit a small wrapper
          on top of the model's outputs that maps raw scores to calibrated probabilities.
          The original model is unchanged. Only the probability transformation changes.
        </p>

        <VisualBox label="Platt scaling vs isotonic regression — when to use each">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              {
                name: 'Platt Scaling (sigmoid)',
                color: '#378ADD',
                how: 'Fits a logistic regression on top of the raw model scores. Maps raw scores to probabilities via a sigmoid function: P = 1/(1+exp(A×score+B)). Learns A and B from a held-out calibration set.',
                when: 'Works well for overconfident models (SVM, GBM). Assumes the miscalibration is sigmoid-shaped. Fast to fit — only 2 parameters.',
                limit: 'Cannot correct non-monotonic miscalibration. Needs ~1,000 calibration samples minimum.',
                sklearn: "CalibratedClassifierCV(model, method='sigmoid')",
              },
              {
                name: 'Isotonic Regression',
                color: '#D85A30',
                how: 'Fits a non-parametric, non-decreasing step function on top of raw scores. Learns the mapping P_calibrated = f(score) directly from data. More flexible than Platt — can correct any monotonic miscalibration pattern.',
                when: 'Better for underconfident models (Random Forest). Handles non-linear miscalibration. Needs more data — requires ~5,000+ calibration samples to avoid overfitting.',
                limit: 'Can overfit on small calibration sets. Non-smooth — may not generalise well.',
                sklearn: "CalibratedClassifierCV(model, method='isotonic')",
              },
            ].map((item) => (
              <div key={item.name} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 8, padding: '13px 14px',
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 8 }}>
                  {item.name}
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 3 }}>HOW</div>
                <p style={{ ...S.ps, marginBottom: 6 }}>{item.how}</p>
                <div style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 3 }}>BEST FOR</div>
                <p style={{ ...S.ps, marginBottom: 6 }}>{item.when}</p>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#ff4757', fontFamily: 'var(--font-mono)', marginBottom: 3 }}>LIMITATION</div>
                <p style={{ ...S.ps, marginBottom: 6 }}>{item.limit}</p>
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: item.color, background: `${item.color}10`, padding: '4px 8px', borderRadius: 4 }}>
                  {item.sklearn}
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.calibration import CalibratedClassifierCV, calibration_curve
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import brier_score_loss
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 10_000

income        = np.abs(np.random.normal(50_000, 30_000, n)).clip(8_000, 500_000)
existing_emis = np.abs(np.random.normal(8_000, 6_000, n)).clip(0, 80_000)
credit_score  = np.abs(np.random.normal(680, 80, n)).clip(300, 900)
employment_yr = np.abs(np.random.normal(4, 3, n)).clip(0, 30)
loan_amount   = np.abs(np.random.normal(200_000, 150_000, n)).clip(10_000, 2_000_000)
default_score = (
    -(credit_score-680)/80*0.40 + (existing_emis/income)*0.30
    + (loan_amount/income/12)*0.20 - employment_yr/30*0.10
    + np.random.randn(n)*0.15
)
y = (default_score > 0.3).astype(int)
X = np.column_stack([income, existing_emis, credit_score, employment_yr, loan_amount])

# Three-way split: train / calibrate / test
X_temp, X_te, y_temp, y_te = train_test_split(X, y, test_size=0.2,
                                                stratify=y, random_state=42)
X_tr, X_cal, y_tr, y_cal   = train_test_split(X_temp, y_temp, test_size=0.25,
                                                stratify=y_temp, random_state=42)
sc      = StandardScaler()
X_tr_sc  = sc.fit_transform(X_tr)
X_cal_sc = sc.transform(X_cal)
X_te_sc  = sc.transform(X_te)

print(f"Train: {len(X_tr):,}  Calibration: {len(X_cal):,}  Test: {len(X_te):,}")

# ── Calibrate GradientBoosting (typically overconfident) ──────────────
base_gb = GradientBoostingClassifier(n_estimators=200, learning_rate=0.1,
                                      max_depth=3, random_state=42)
base_gb.fit(X_tr_sc, y_tr)

# Method 1: CalibratedClassifierCV with prefit=True
# Use when you want to calibrate on a separate held-out set
from sklearn.calibration import CalibratedClassifierCV

calib_sigmoid  = CalibratedClassifierCV(base_gb, cv='prefit', method='sigmoid')
calib_isotonic = CalibratedClassifierCV(base_gb, cv='prefit', method='isotonic')

calib_sigmoid.fit(X_cal_sc, y_cal)
calib_isotonic.fit(X_cal_sc, y_cal)

# Method 2: CalibratedClassifierCV with cv=5
# Calibration happens inside 5-fold CV — no need for separate calibration set
calib_cv = CalibratedClassifierCV(
    GradientBoostingClassifier(n_estimators=200, learning_rate=0.1,
                                max_depth=3, random_state=42),
    cv=5, method='isotonic',
)
calib_cv.fit(X_tr_sc, y_tr)   # fits on all training data with internal CV

# ── Compare Brier scores ───────────────────────────────────────────────
models_eval = {
    'Uncalibrated GB':        base_gb,
    'Platt Scaling (sigmoid)': calib_sigmoid,
    'Isotonic Regression':    calib_isotonic,
    'CV Calibration (k=5)':   calib_cv,
    'Logistic (reference)':   LogisticRegression(max_iter=1000, random_state=42),
}

print(f"\n{'Model':<28} {'Brier':>8} {'MCE':>8}  {'Calibration quality'}")
print("─" * 70)

lr_ref = LogisticRegression(max_iter=1000, random_state=42)
lr_ref.fit(X_tr_sc, y_tr)
models_eval['Logistic (reference)'] = lr_ref

for name, model in models_eval.items():
    y_prob = model.predict_proba(X_te_sc)[:, 1]
    brier  = brier_score_loss(y_te, y_prob)

    frac, mean_pred = calibration_curve(y_te, y_prob, n_bins=10)
    mce = np.mean(np.abs(frac - mean_pred))

    quality = '●●●' if mce < 0.03 else '●●○' if mce < 0.06 else '●○○'
    print(f"  {name:<26}  {brier:>8.4f}  {mce:>6.4f}  {quality}")

# ── Practical calibration check on specific probability bins ───────────
print("\nCalibration at key probability thresholds (isotonic-calibrated GBM):")
y_prob_calib = calib_isotonic.predict_proba(X_te_sc)[:, 1]
for low, high in [(0.0,0.1),(0.1,0.3),(0.3,0.5),(0.5,0.7),(0.7,0.9),(0.9,1.0)]:
    mask   = (y_prob_calib >= low) & (y_prob_calib < high)
    if mask.sum() > 10:
        actual = y_te[mask].mean()
        midpt  = (low + high) / 2
        gap    = actual - midpt
        print(f"  Predicted {low:.1f}–{high:.1f}: actual={actual:.3f}  "
              f"mid={midpt:.2f}  gap={gap:+.3f}  n={mask.sum()}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — CALIBRATION IN PRODUCTION ══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What this looks like at work</span>
        <h2 style={S.h2}>Production credit scoring pipeline — calibrated end to end</h2>

        <p style={S.p}>
          At Razorpay's credit team, every loan application produces a calibrated
          default probability. The credit officer sees "this applicant has a 23%
          probability of default." They need to trust that number —
          it drives the interest rate, the loan amount, and the approval decision.
          An uncalibrated 0.23 is meaningless. A calibrated 0.23 means
          roughly 23 out of 100 such applicants historically defaulted.
          That is actionable.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.calibration import CalibratedClassifierCV, calibration_curve
from sklearn.model_selection import train_test_split, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import brier_score_loss, roc_auc_score
from sklearn.pipeline import Pipeline
import joblib, warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 20_000

df = pd.DataFrame({
    'annual_income':   np.abs(np.random.normal(50_000, 30_000, n)).clip(8_000, 500_000),
    'existing_emis':   np.abs(np.random.normal(8_000, 6_000, n)).clip(0, 80_000),
    'credit_score':    np.abs(np.random.normal(680, 80, n)).clip(300, 900).astype(int),
    'employment_yrs':  np.abs(np.random.normal(4, 3, n)).clip(0, 30).round(1),
    'loan_amount':     np.abs(np.random.normal(200_000,150_000,n)).clip(10_000, 2_000_000),
    'n_existing_loans':np.random.randint(0, 6, n).astype(float),
    'age':             np.abs(np.random.normal(35, 10, n)).clip(21, 70).astype(int),
})
default_score = (
    -(df['credit_score']-680)/80*0.35
    + (df['existing_emis']/df['annual_income'])*0.30
    + (df['loan_amount']/df['annual_income']/12)*0.20
    - df['employment_yrs']/30*0.10
    + df['n_existing_loans']*0.03
    + np.random.randn(n)*0.12
)
y = (default_score > 0.3).astype(int)

feat_cols = list(df.columns)
X_tr, X_te, y_tr, y_te = train_test_split(
    df, y, test_size=0.15, stratify=y, random_state=42
)

# ── Pipeline: scale → GBM → isotonic calibration ──────────────────────
# Using cv=5: calibration is done inside cross-validation
# This is the most robust approach — no need to carve out a calibration set
base_model = GradientBoostingClassifier(
    n_estimators=300, learning_rate=0.05, max_depth=4,
    subsample=0.8, min_samples_leaf=10, random_state=42,
)
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model',  CalibratedClassifierCV(base_model, cv=5, method='isotonic')),
])
pipeline.fit(X_tr[feat_cols], y_tr)

# ── Evaluation ─────────────────────────────────────────────────────────
y_prob = pipeline.predict_proba(X_te[feat_cols])[:, 1]
brier  = brier_score_loss(y_te, y_prob)
auc    = roc_auc_score(y_te, y_prob)

frac, mean_pred = calibration_curve(y_te, y_prob, n_bins=10)
mce = np.mean(np.abs(frac - mean_pred))

print(f"Production model metrics:")
print(f"  ROC-AUC:                {auc:.4f}")
print(f"  Brier score:            {brier:.4f}")
print(f"  Mean calibration error: {mce:.4f}")

# ── Expected calibration error (ECE) — weighted by bin size ───────────
# ECE is the standard calibration metric in ML literature
# Weighted by fraction of samples in each bin — penalises large bins more
frac_all, pred_all = calibration_curve(y_te, y_prob, n_bins=10, strategy='uniform')
bin_sizes = []
bins = np.linspace(0, 1, 11)
for i in range(len(bins)-1):
    mask = (y_prob >= bins[i]) & (y_prob < bins[i+1])
    bin_sizes.append(mask.sum())
bin_sizes = np.array(bin_sizes[:len(frac_all)])
weights = bin_sizes / bin_sizes.sum()
ece = np.sum(weights * np.abs(frac_all - pred_all))
print(f"  ECE (weighted):         {ece:.4f}")

# ── Score new applicants ───────────────────────────────────────────────
new_applications = pd.DataFrame([
    {
        'annual_income': 85_000, 'existing_emis': 12_000,
        'credit_score': 720, 'employment_yrs': 6,
        'loan_amount': 500_000, 'n_existing_loans': 1, 'age': 32,
    },
    {
        'annual_income': 25_000, 'existing_emis': 18_000,
        'credit_score': 580, 'employment_yrs': 1,
        'loan_amount': 300_000, 'n_existing_loans': 3, 'age': 26,
    },
    {
        'annual_income': 150_000, 'existing_emis': 5_000,
        'credit_score': 800, 'employment_yrs': 15,
        'loan_amount': 1_000_000, 'n_existing_loans': 0, 'age': 45,
    },
])

probas   = pipeline.predict_proba(new_applications[feat_cols])[:, 1]
for i, (_, row) in enumerate(new_applications.iterrows()):
    p      = probas[i]
    risk   = 'HIGH' if p > 0.4 else 'MEDIUM' if p > 0.2 else 'LOW'
    action = 'REJECT' if p > 0.4 else 'REVIEW' if p > 0.2 else 'APPROVE'
    print(f"\nApplicant {i+1}: income=₹{row['annual_income']:,.0f}  "
          f"credit={row['credit_score']}  loan=₹{row['loan_amount']:,.0f}")
    print(f"  P(default) = {p:.3f}  →  {risk} risk  →  {action}")

# ── Save ─────────────────────────────────────────────────────────────
joblib.dump(pipeline, '/tmp/razorpay_credit_calibrated.pkl')
print("\nCalibrated pipeline saved.")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — MONITORING CALIBRATION DRIFT ═══════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Calibration in production over time</span>
        <h2 style={S.h2}>Calibration drift — why a well-calibrated model degrades</h2>

        <p style={S.p}>
          A model calibrated in January on historical data may be poorly calibrated
          by June — not because the model changed, but because the world changed.
          Economic conditions shift, fraud patterns evolve, customer demographics change.
          The relationship between the model's scores and the actual default rate
          drifts over time. Monitoring calibration in production is as important
          as monitoring accuracy.
        </p>

        <CodeBlock code={`import numpy as np
from sklearn.metrics import brier_score_loss
from sklearn.calibration import calibration_curve

np.random.seed(42)

# ── Simulate monthly calibration monitoring ───────────────────────────
# Model trained in January, deployed for 6 months
# Default rate increases over time (economic stress)

def simulate_month(month: int, base_default_rate: float, n: int = 2000):
    """Simulate production data for a given month."""
    # Default rate increases 0.5% per month (economic stress scenario)
    actual_default_rate = base_default_rate + month * 0.005

    # Model was trained on Jan data — scores become increasingly optimistic
    # as the distribution shifts
    model_scores = np.random.beta(2, 5, n)   # model outputs skewed low
    # Actual labels: more defaults than model expects by month 6
    actual_labels = (np.random.random(n) < (
        model_scores * (1 + month * 0.08)   # drift factor
    )).astype(int)
    return model_scores, actual_labels

print("Monthly calibration monitoring:")
print(f"{'Month':<8} {'Actual default%':>16} {'Predicted avg%':>15} {'Brier':>8} {'MCE':>8} {'Alert'}")
print("─" * 68)

base_default = 0.12   # 12% default rate at training time
alert_thresh = 0.05   # alert if MCE > 5%

for month in range(7):
    scores, labels = simulate_month(month, base_default)

    brier    = brier_score_loss(labels, scores)
    actual_r = labels.mean()
    pred_avg = scores.mean()

    frac, pred = calibration_curve(labels, scores, n_bins=5)
    mce = np.mean(np.abs(frac - pred)) if len(frac) > 0 else 0

    alert = '⚠ RECALIBRATE' if mce > alert_thresh else '✓ OK'
    month_name = ['Jan (train)', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][month]
    print(f"  {month_name:<8}  {actual_r*100:>13.1f}%  {pred_avg*100:>12.1f}%  "
          f"{brier:>8.4f}  {mce:>6.4f}  {alert}")

print("\nKey insight:")
print("  Brier score and MCE both increase as distribution shifts")
print("  Set automated alerts: if MCE > 0.05 → trigger recalibration")
print("  Recalibration: refit CalibratedClassifierCV on recent labelled data")
print("  Does not require retraining the full model — just the calibrator")

# ── Efficient recalibration — no full retrain needed ──────────────────
# When calibration drifts: collect recent labelled data → refit calibrator
print("\nRecalibration workflow:")
print("  1. Collect last 30 days of transactions with known outcomes")
print("  2. Get base model scores: scores = base_model.predict_proba(X_recent)[:,1]")
print("  3. Fit new isotonic calibrator on (scores, y_recent)")
print("  4. Replace old calibrator — base model unchanged")
print("  5. Monitor ECE weekly — recalibrate monthly or on drift alert")`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common calibration mistake — explained and fixed</h2>

        <ErrorBlock
          error="CalibratedClassifierCV with cv='prefit' gives worse Brier score than uncalibrated"
          cause="You calibrated on the same data the model was trained on. When cv='prefit' is used, you must pass a held-out calibration set that the base model has never seen. If you pass training data, the model's scores are already perfectly fit to those labels and the calibrator overfits to this artificially good mapping — it produces a miscalibrated calibrator that performs worse on new data."
          fix="Always use a separate held-out calibration set with cv='prefit': X_tr, X_cal, X_te = three-way split. Fit the base model on X_tr only. Fit CalibratedClassifierCV(model, cv='prefit') on X_cal only. Evaluate on X_te. Alternatively use cv=5 (cross-validated calibration) which handles this automatically — each fold's calibrator is trained on data the model never saw."
        />

        <ErrorBlock
          error="Isotonic calibration dramatically improves training/calibration Brier but test Brier gets worse"
          cause="Isotonic regression overfits on small calibration sets. It fits a step function with potentially thousands of steps to the calibration data — with fewer than 1,000 calibration samples, it memorises the calibration set rather than learning a smooth mapping. The overfitted calibrator maps training scores correctly but generalises poorly."
          fix="Use Platt scaling (sigmoid) when you have fewer than 5,000 calibration samples — it only has 2 parameters and cannot overfit. Switch to isotonic when you have 5,000+ calibration samples. Or use cv=5 in CalibratedClassifierCV which uses cross-validation to prevent overfitting automatically. Always evaluate Brier score on a held-out test set — never on the calibration set."
        />

        <ErrorBlock
          error="Calibration looks perfect on the reliability diagram but Brier score is high"
          cause="Calibration and discrimination are different properties. A model that always predicts the base rate (e.g. always outputs 0.12 for a 12% default rate) is perfectly calibrated — the reliability diagram shows a single point on the diagonal. But its Brier score equals base_rate × (1 − base_rate) — no better than a naive baseline. The model has perfect calibration but zero discrimination."
          fix="Always report both Brier score AND ROC-AUC (or PR-AUC). A good model needs both: strong discrimination (ROC-AUC near 1.0) means it separates positives from negatives. Strong calibration (low MCE, low Brier vs baseline) means the probabilities are accurate. The Brier Skill Score (1 − Brier/Baseline) combines both properties into one number above 0 only if the model beats the naive baseline."
        />

        <ErrorBlock
          error="Model probabilities are all very close to the base rate — reliability diagram looks flat"
          cause="The model has learned very little signal — all predictions are near the global mean. This is distinct from calibration — the model is not miscalibrated, it is just uninformative. Causes: insufficient training data, features with no predictive power, a model that converged to predicting the prior due to regularisation being too strong, or a severely imbalanced dataset with no class balancing."
          fix="This is a feature engineering or training problem, not a calibration problem. Check: does the model's ROC-AUC significantly exceed 0.5? If not, the model has no predictive power and calibration is irrelevant. Add more predictive features, reduce regularisation, use class_weight='balanced', or investigate the training data quality. Calibration cannot fix a model with no signal."
        />
      </div>

      <Div />

      {/* ══ SECTION 9 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can evaluate and calibrate any model. Next: what happens inside
          the model — feature importance and SHAP across all algorithm types.
        </h2>

        <p style={S.p}>
          You have ROC-AUC, PR-AUC, precision, recall, F1, Brier score,
          and calibration curves. You can now honestly evaluate any model
          and trust its probability outputs. The next question stakeholders
          always ask: <em>why</em> did the model make this prediction?
          Which features matter most?
        </p>

        <p style={S.p}>
          Module 36 — Feature Importance and Explainability — covers
          permutation importance, SHAP values (already introduced in Module 30
          for XGBoost), SHAP across all model types including tree ensembles,
          linear models, and black-box models. And the business of explaining
          an individual prediction to a customer who was rejected for credit.
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
              textTransform: 'uppercase' as const, color: '#1D9E75',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Module 36 · Model Evaluation
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Feature Importance and Explainability
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Permutation importance, SHAP across all models, and explaining
              individual predictions to regulators, customers, and stakeholders.
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
          'Calibration is distinct from ranking quality (ROC-AUC). A model with AUC=0.95 may still be poorly calibrated — its scores rank correctly but the actual probability values are wrong. Calibration means: when the model says 80%, roughly 80% of those cases are actually positive.',
          'The reliability diagram (calibration plot) is the standard visualisation. Group predictions by predicted probability, compare to actual fraction of positives per bin. Points on the diagonal = well-calibrated. S-curve below diagonal = overconfident (GBM). S-curve above diagonal = underconfident (Random Forest).',
          'The Brier score is the single best number for probability quality — it is the mean squared error between predicted probabilities and actual labels. Lower is better. The baseline (predicting the class mean every time) is base_rate × (1 − base_rate). Use the Brier Skill Score (1 − Brier/Baseline) to compare models.',
          'Two calibration methods: Platt scaling (fits a sigmoid — 2 parameters, use when calibration set < 5,000 samples) and isotonic regression (non-parametric step function — more flexible but needs 5,000+ samples to avoid overfitting). Both are implemented via CalibratedClassifierCV in sklearn.',
          'Use cv=5 in CalibratedClassifierCV when possible — it calibrates inside cross-validation, preventing the common mistake of calibrating on data the base model was trained on. Using cv="prefit" requires a strictly held-out calibration set.',
          'Monitor calibration in production monthly. Calibration drifts as the data distribution changes — economic conditions, fraud patterns, user demographics all shift over time. When MCE exceeds a threshold, recalibrate by refitting only the calibrator on recent labelled data — the base model does not need retraining.',
        ]}
      />
    </LearnLayout>
  )
}