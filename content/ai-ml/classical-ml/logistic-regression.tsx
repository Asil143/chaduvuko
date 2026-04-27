import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Logistic Regression — Chaduvuko',
  description:
    'The foundation of all classification. Sigmoid function, decision boundaries, cross-entropy loss, regularisation, and multi-class extension — built from scratch then in sklearn on real DoorDash data.',
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

function MathBox({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: 10,
      overflow: 'hidden', marginBottom: 24,
    }}>
      <div style={{
        padding: '8px 14px', background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#378ADD' }} />
        <span style={{
          fontSize: 11, fontWeight: 700, color: '#378ADD',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.07em',
          textTransform: 'uppercase' as const,
        }}>
          {label}
        </span>
        <span style={{ fontSize: 10, color: 'var(--muted)', marginLeft: 'auto' }}>
          optional — read when ready
        </span>
      </div>
      <div style={{ padding: '16px 20px', background: 'var(--bg2)' }}>
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

export default function LogisticRegressionPage() {
  return (
    <LearnLayout
      title="Logistic Regression"
      description="The foundation of all classification. Sigmoid, decision boundaries, cross-entropy, regularisation, and multi-class extension — built from scratch then in sklearn on real data."
      section="Classical ML"
      readTime="55–65 min"
      updatedAt="March 2026"
    >
      {/* ── Section progress header ───────────────────────────────────────── */}
      <div style={{ marginBottom: 40 }}>

        {/* Breadcrumb */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 12, color: 'var(--muted)', marginBottom: 16,
          fontFamily: 'var(--font-mono)',
        }}>
          <a href='/learn/ai-ml' style={{ color: 'var(--muted)', textDecoration: 'none' }}>AI &amp; ML</a>
          <span style={{ color: 'var(--border)' }}>›</span>
          <a href='/learn/ai-ml/classical-ml' style={{ color: 'var(--muted)', textDecoration: 'none' }}>Classical ML</a>
          <span style={{ color: 'var(--border)' }}>›</span>
          <span style={{ color: 'var(--text)' }}>Logistic Regression</span>
        </div>

        <a href='/learn/ai-ml/classical-ml' style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '4px 12px', borderRadius: 5,
            border: '1px solid var(--border)', background: 'var(--surface)',
            marginBottom: 16,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#378ADD' }} />
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.09em',
              textTransform: 'uppercase' as const, color: '#378ADD',
              fontFamily: 'var(--font-mono)',
            }}>
              Section 05 · Classical Machine Learning
            </span>
          </div>
        </a>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '12px 14px',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 10,
          }}>
            <span style={{
              fontSize: 11, fontWeight: 700, color: 'var(--muted)',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.07em',
              textTransform: 'uppercase' as const,
            }}>
              Classical ML · 13 topics
            </span>
            <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
              0/13 done
            </span>
          </div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' as const }}>
            {[
              { label: 'What',      href: '/learn/ai-ml/classical-ml/what-is-ml',          title: 'What is Machine Learning?',    active: false },
              { label: 'Linear',    href: '/learn/ai-ml/classical-ml/linear-regression',   title: 'Linear Regression',            active: false },
              { label: 'Logistic',  href: '/learn/ai-ml/classical-ml/logistic-regression', title: 'Logistic Regression',          active: true  },
              { label: 'Decision',  href: '/learn/ai-ml/classical-ml/decision-trees',      title: 'Decision Trees',               active: false },
              { label: 'Support',   href: '/learn/ai-ml/classical-ml/svm',                 title: 'Support Vector Machines',      active: false },
              { label: 'K-Nearest', href: '/learn/ai-ml/classical-ml/knn',                 title: 'K-Nearest Neighbours',         active: false },
              { label: 'Naive',     href: '/learn/ai-ml/classical-ml/naive-bayes',         title: 'Naive Bayes',                  active: false },
              { label: 'Random',    href: '/learn/ai-ml/classical-ml/random-forest',       title: 'Random Forest',                active: false },
              { label: 'Gradient',  href: '/learn/ai-ml/classical-ml/gradient-boosting',   title: 'Gradient Boosting',            active: false },
              { label: 'XGBoost',   href: '/learn/ai-ml/classical-ml/xgboost',             title: 'XGBoost',                      active: false },
              { label: 'LightGBM',  href: '/learn/ai-ml/classical-ml/lightgbm',            title: 'LightGBM',                     active: false },
              { label: 'K-Means',   href: '/learn/ai-ml/classical-ml/kmeans-clustering',   title: 'K-Means Clustering',           active: false },
              { label: 'Principal', href: '/learn/ai-ml/classical-ml/pca',                 title: 'Principal Component Analysis', active: false },
            ].map((topic) => (
              <a
                key={topic.label}
                href={topic.href}
                title={topic.title}
                style={{
                  padding: '4px 10px', borderRadius: 5, textDecoration: 'none',
                  fontSize: 11, fontWeight: topic.active ? 700 : 500,
                  fontFamily: 'var(--font-mono)',
                  background: topic.active ? '#378ADD20' : 'var(--bg2)',
                  color:      topic.active ? '#378ADD'   : 'var(--muted)',
                  border: '1px solid ' + (topic.active ? '#378ADD50' : 'var(--border)'),
                }}
              >
                {topic.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ══ SECTION 1 — HOOK ═══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The wrong name, the right algorithm</span>
        <h2 style={S.h2}>
          Logistic regression is not regression. It is the foundation of all classification.
        </h2>

        <p style={S.p}>
          The name is misleading. Logistic regression predicts probabilities —
          "what is the probability that this DoorDash order will be late?" —
          and converts those probabilities into class labels.
          It is a classification algorithm, not a regression one.
          The "regression" refers to the linear equation inside it,
          not to what it predicts.
        </p>

        <p style={S.p}>
          Despite being over 60 years old, logistic regression is still
          the first algorithm deployed at many companies for binary classification.
          At Stripe it predicts fraud. At DoorDash it predicts late deliveries.
          At every bank in India it predicts loan defaults. It is fast, interpretable,
          probabilistically calibrated, and works well with good features.
          Every ML engineer should understand it completely.
        </p>

        <p style={S.p}>
          This module builds logistic regression from scratch — sigmoid function,
          cross-entropy loss, gradient descent — so every piece is visible.
          Then shows you the sklearn implementation, all regularisation options,
          the multi-class extension, and every evaluation metric that matters
          for classification problems.
        </p>

        <HBox color="#378ADD">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              What this module covers:
            </span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[
              'The core idea — why linear regression fails for classification',
              'The sigmoid function — squash any number into [0, 1]',
              'Decision boundaries — when does the model say yes?',
              'Cross-entropy loss — why not MSE for classification',
              'Gradient descent for logistic regression — from scratch',
              'sklearn LogisticRegression — all options explained',
              'L1 and L2 regularisation — prevent overfitting',
              'Multi-class: One-vs-Rest and Softmax (Multinomial)',
              'Probability calibration — are the probabilities trustworthy?',
              'Evaluation — accuracy, precision, recall, F1, ROC-AUC',
              'Threshold tuning — 0.5 is rarely optimal',
              'Interpreting coefficients — what the model learned',
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
          The problem throughout this module: predict whether a DoorDash delivery
          will be late (delivery_time &gt; 45 minutes). This is a binary
          classification problem — the kind logistic regression was designed for.
          Every concept is demonstrated on this real business question.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — WHY NOT LINEAR REGRESSION ══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The problem with the obvious approach</span>
        <h2 style={S.h2}>Why linear regression breaks for classification</h2>

        <p style={S.p}>
          The obvious approach to binary classification: train a linear regression,
          predict a number, and if the number is above 0.5 call it class 1.
          This actually works for some problems. But it has three fundamental flaws
          that make it unreliable in general.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              flaw: 'Predictions go outside [0, 1]',
              color: '#ff4757',
              detail: 'Linear regression predicts any real number. For a classification problem, a prediction of 1.7 or -0.3 is meaningless as a probability. The further a point is from the decision boundary, the more absurd the prediction becomes.',
            },
            {
              flaw: 'Sensitive to outliers far from the boundary',
              color: '#D85A30',
              detail: 'Add a single extreme point far into the positive class region. The regression line tilts toward it, moving the decision boundary and misclassifying many correctly-labelled points. Classification should not care about how far positive examples are from the boundary — only that they are on the right side.',
            },
            {
              flaw: 'Not probabilistically calibrated',
              color: '#BA7517',
              detail: 'For risk-sensitive decisions (fraud, loan default, medical diagnosis), you need a calibrated probability: "this transaction has a 3.2% chance of being fraud." Linear regression gives you a raw number with no probabilistic interpretation.',
            },
          ].map((item) => (
            <div key={item.flaw} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}30`,
              borderRadius: 8, padding: '12px 16px',
              borderLeft: `3px solid ${item.color}`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 5 }}>
                {item.flaw}
              </div>
              <p style={{ ...S.ps, marginBottom: 0 }}>{item.detail}</p>
            </div>
          ))}
        </div>

        <p style={S.p}>
          Logistic regression solves all three by applying one function
          to the linear prediction before outputting it: the sigmoid.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')   # non-interactive backend for scripts

# Demonstrate why linear regression fails for classification
np.random.seed(42)
n = 200

# Generate binary classification data: late vs on-time deliveries
distance_ontime = np.random.normal(3, 1, n//2)
distance_late   = np.random.normal(6, 1, n//2)

X = np.concatenate([distance_ontime, distance_late]).reshape(-1, 1)
y = np.concatenate([np.zeros(n//2), np.ones(n//2)])   # 0=on-time, 1=late

from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.preprocessing import StandardScaler

sc = StandardScaler()
X_sc = sc.fit_transform(X)

# Linear regression on binary labels
lin_reg = LinearRegression()
lin_reg.fit(X_sc, y)
y_pred_lin = lin_reg.predict(X_sc)

print("Linear regression predictions (should be in [0,1] but are not):")
print(f"  Min prediction: {y_pred_lin.min():.3f}")
print(f"  Max prediction: {y_pred_lin.max():.3f}")
print(f"  Predictions < 0: {(y_pred_lin < 0).sum()}")
print(f"  Predictions > 1: {(y_pred_lin > 1).sum()}")

# Logistic regression
log_reg = LogisticRegression()
log_reg.fit(X_sc, y)
y_pred_proba = log_reg.predict_proba(X_sc)[:, 1]

print("\nLogistic regression predictions (always in [0,1]):")
print(f"  Min prediction: {y_pred_proba.min():.3f}")
print(f"  Max prediction: {y_pred_proba.max():.3f}")
print(f"  Predictions < 0: {(y_pred_proba < 0).sum()}")
print(f"  Predictions > 1: {(y_pred_proba > 1).sum()}")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — THE SIGMOID ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The key function</span>
        <h2 style={S.h2}>The sigmoid — squash any number into a probability</h2>

        <p style={S.p}>
          The sigmoid function takes any real number — large positive, large negative,
          anything in between — and maps it to a number strictly between 0 and 1.
          This is exactly the range of probabilities.
          As the input grows toward +∞, the output approaches 1.
          As it shrinks toward −∞, the output approaches 0.
          At input 0, the output is exactly 0.5.
        </p>

        <VisualBox label="Sigmoid function — the S-curve">
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div>
              <svg width="340" height="200" viewBox="0 0 340 200">
                {/* Axes */}
                <line x1="20" y1="180" x2="320" y2="180" stroke="#333" strokeWidth="1" />
                <line x1="170" y1="10" x2="170" y2="180" stroke="#333" strokeWidth="1" />
                {/* Sigmoid curve */}
                <path
                  d="M 20 175 C 40 174, 60 170, 80 162 C 100 154, 120 135, 140 115 C 155 100, 165 92, 170 90 C 175 88, 185 82, 200 67 C 220 47, 240 28, 260 22 C 280 16, 300 14, 320 13"
                  fill="none" stroke="#378ADD" strokeWidth="2.5"
                />
                {/* Horizontal guidelines */}
                <line x1="20" y1="90" x2="320" y2="90" stroke="#333" strokeWidth="0.8" strokeDasharray="4,3" />
                <line x1="20" y1="13" x2="320" y2="13" stroke="#1D9E75" strokeWidth="0.8" strokeDasharray="4,3" />
                <line x1="20" y1="175" x2="320" y2="175" stroke="#D85A30" strokeWidth="0.8" strokeDasharray="4,3" />
                {/* Labels */}
                <text x="5" y="93" fontSize="10" fill="#888" fontFamily="monospace">0.5</text>
                <text x="5" y="17" fontSize="10" fill="#1D9E75" fontFamily="monospace">1.0</text>
                <text x="5" y="179" fontSize="10" fill="#D85A30" fontFamily="monospace">0.0</text>
                <text x="162" y="195" fontSize="10" fill="#888" fontFamily="monospace">0</text>
                <text x="295" y="195" fontSize="10" fill="#888" fontFamily="monospace">+6</text>
                <text x="20" y="195" fontSize="10" fill="#888" fontFamily="monospace">-6</text>
                {/* Center point */}
                <circle cx="170" cy="90" r="4" fill="#00e676" />
                <text x="175" y="86" fontSize="9" fill="#00e676" fontFamily="monospace">σ(0)=0.5</text>
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 14,
                color: '#378ADD', padding: '10px 14px',
                background: 'var(--surface)', borderRadius: 7,
                marginBottom: 12, textAlign: 'center' as const,
              }}>
                σ(z) = 1 / (1 + e⁻ᶻ)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { z: 'z → −∞', out: 'σ → 0.0', color: '#D85A30' },
                  { z: 'z = −6',  out: 'σ = 0.002', color: '#D85A30' },
                  { z: 'z = −2',  out: 'σ = 0.119', color: '#BA7517' },
                  { z: 'z = 0',   out: 'σ = 0.500', color: '#888' },
                  { z: 'z = +2',  out: 'σ = 0.881', color: '#1D9E75' },
                  { z: 'z = +6',  out: 'σ = 0.998', color: '#1D9E75' },
                  { z: 'z → +∞', out: 'σ → 1.0', color: '#1D9E75' },
                ].map((row) => (
                  <div key={row.z} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--muted)', minWidth: 60 }}>{row.z}</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>→</span>
                    <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: row.color, fontWeight: 600 }}>{row.out}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </VisualBox>

        <p style={S.p}>
          The full logistic regression model chains two steps:
          first a linear combination of the features (the same as linear regression),
          then the sigmoid applied to the result.
          The linear part (z = w·x + b) can produce any number.
          The sigmoid converts it into a probability.
        </p>

        <VisualBox label="Logistic regression — the full model">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { step: '1. Linear combination', formula: 'z = w₁x₁ + w₂x₂ + ... + wₙxₙ + b', note: 'Same as linear regression — gives any real number', color: '#378ADD' },
              { step: '2. Sigmoid activation', formula: 'p = σ(z) = 1 / (1 + e⁻ᶻ)', note: 'Squashes z into probability [0, 1]', color: '#1D9E75' },
              { step: '3. Decision rule',       formula: 'ŷ = 1 if p ≥ threshold else 0', note: 'threshold = 0.5 by default, tunable', color: '#D85A30' },
            ].map((row) => (
              <div key={row.step} style={{
                display: 'grid', gridTemplateColumns: '180px 1fr 1fr',
                gap: 12, alignItems: 'center',
                background: 'var(--surface)', border: `1px solid ${row.color}25`,
                borderRadius: 7, padding: '10px 14px',
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: row.color, fontFamily: 'var(--font-mono)' }}>{row.step}</span>
                <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>{row.formula}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{row.note}</span>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np

# ── The sigmoid function ──────────────────────────────────────────────
def sigmoid(z: np.ndarray) -> np.ndarray:
    """σ(z) = 1 / (1 + e^(-z)) — numerically stable implementation."""
    # Clip to prevent overflow in exp for very large negative values
    return 1 / (1 + np.exp(-np.clip(z, -500, 500)))

# Properties of sigmoid
z_values = np.array([-10, -5, -2, -1, 0, 1, 2, 5, 10])
print("Sigmoid values:")
for z, s in zip(z_values, sigmoid(z_values)):
    print(f"  σ({z:+3d}) = {s:.6f}")

# Sigmoid derivative: σ'(z) = σ(z) * (1 - σ(z))
# Maximum at z=0: σ'(0) = 0.5 * 0.5 = 0.25
# This is why sigmoid causes vanishing gradients in deep networks

def sigmoid_derivative(z):
    s = sigmoid(z)
    return s * (1 - s)

print(f"\nSigmoid derivative at z=0: {sigmoid_derivative(0):.4f}")  # 0.25 (max)
print(f"Sigmoid derivative at z=5: {sigmoid_derivative(5):.6f}")   # near 0

# ── Logistic regression prediction ───────────────────────────────────
def logistic_predict(X: np.ndarray, w: np.ndarray, b: float) -> np.ndarray:
    """
    Forward pass: compute probability for each sample.
    X: (n_samples, n_features)
    w: (n_features,)
    b: scalar
    Returns: (n_samples,) — probability of class 1
    """
    z = X @ w + b         # linear combination: shape (n_samples,)
    return sigmoid(z)     # squash to [0,1]

# Test with one sample: distance=6km, traffic=8, prep=20min
# High values → should predict high probability of being late
X_sample = np.array([[6.0, 8.0, 20.0]])   # shape (1, 3)
w_random  = np.array([0.5, 0.3, 0.2])     # random weights
b_random  = -5.0

p_late = logistic_predict(X_sample, w_random, b_random)
print(f"\nP(late | distance=6, traffic=8, prep=20) = {p_late[0]:.4f}")
print(f"Prediction: {'LATE' if p_late[0] >= 0.5 else 'ON-TIME'}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — CROSS-ENTROPY LOSS ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The loss function</span>
        <h2 style={S.h2}>Cross-entropy loss — why not MSE for classification</h2>

        <p style={S.p}>
          We need a loss function that tells the model how wrong its probability
          prediction was. Why not use MSE — (p − y)² —  the same loss as regression?
          Two reasons: MSE with sigmoid produces a non-convex loss surface full of
          local minima that gradient descent gets stuck in. And MSE penalises
          a confident wrong prediction (p=0.99, y=0) by only (0.99)²=0.98 —
          not harshly enough to teach the model to be certain only when correct.
        </p>

        <p style={S.p}>
          Cross-entropy loss penalises a confident wrong prediction with −log(0.01) = 4.6
          — much harsher. And it produces a perfectly convex loss surface,
          meaning gradient descent always finds the global minimum.
        </p>

        <HBox color="#D85A30">
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.2,
            color: '#D85A30', padding: '10px 14px',
            background: 'rgba(216,90,48,0.08)', borderRadius: 6, marginBottom: 10,
          }}>
            <div>L = −[y · log(p) + (1 − y) · log(1 − p)]</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              'When y=1 (truly late): L = −log(p). Low loss if p≈1, huge loss if p≈0.',
              'When y=0 (truly on-time): L = −log(1−p). Low loss if p≈0, huge loss if p≈1.',
              'Confident and correct → loss near 0. Confident and wrong → loss → ∞.',
              'The total loss is the mean over all training examples.',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#D85A30', flexShrink: 0, marginTop: 7 }} />
                <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </HBox>

        <CodeBlock code={`import numpy as np

def binary_cross_entropy(y_true: np.ndarray, y_pred: np.ndarray,
                          eps: float = 1e-10) -> float:
    """
    Binary cross-entropy loss.
    eps prevents log(0) = -inf.
    """
    y_pred = np.clip(y_pred, eps, 1 - eps)   # prevent log(0)
    return -np.mean(
        y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred)
    )

# Loss for different prediction / label combinations
scenarios = [
    (1, 0.99,  'Truly late,   predicts 0.99 (confident & correct)'),
    (1, 0.50,  'Truly late,   predicts 0.50 (uncertain)'),
    (1, 0.01,  'Truly late,   predicts 0.01 (confident & WRONG)'),
    (0, 0.01,  'Truly on-time, predicts 0.01 (confident & correct)'),
    (0, 0.50,  'Truly on-time, predicts 0.50 (uncertain)'),
    (0, 0.99,  'Truly on-time, predicts 0.99 (confident & WRONG)'),
]

print("Cross-entropy loss per scenario:")
for y, p, desc in scenarios:
    loss = binary_cross_entropy(np.array([y]), np.array([p]))
    bar  = '█' * int(loss * 5)
    print(f"  {desc}")
    print(f"    Loss = {loss:.4f}  {bar}")
    print()

# Key insight: loss is SYMMETRIC
# L(y=1, p=0.01) ≈ L(y=0, p=0.99) ≈ 4.6
# Both confident wrong predictions are equally penalised`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — GRADIENT DESCENT FROM SCRATCH ═════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Under the hood</span>
        <h2 style={S.h2}>Logistic regression from scratch — gradient descent on cross-entropy</h2>

        <p style={S.p}>
          To train logistic regression we need the gradient of the cross-entropy loss
          with respect to the weights. The chain rule through sigmoid produces a
          beautifully simple result: the gradient is just the prediction error
          times the input feature — the same form as linear regression.
        </p>

        <MathBox label="The gradient — derived via chain rule">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2, color: 'var(--text)' }}>
            <div><span style={{ color: '#378ADD' }}>∂L/∂w</span> = (1/n) × Xᵀ(p − y)</div>
            <div><span style={{ color: '#378ADD' }}>∂L/∂b</span> = (1/n) × Σ(p − y)</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>
              where p = σ(Xw + b) — predicted probabilities<br />
              y = true labels (0 or 1)<br />
              (p − y) = prediction errors<br />
              Identical form to linear regression gradient — sigmoid derivative cancels out perfectly
            </div>
          </div>
        </MathBox>

        <CodeBlock code={`import numpy as np

np.random.seed(42)

# ── Generate DoorDash dataset ───────────────────────────────────────────
n = 2000
distance = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic  = np.random.randint(1, 11, n).astype(float)
prep     = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
delivery = 8.6 + 7.3*distance + 0.8*prep + 1.5*traffic + np.random.normal(0, 4, n)
y = (delivery > 45).astype(float)   # 1 = late, 0 = on-time

X = np.column_stack([distance, traffic, prep])

# Scale features (critical for gradient descent convergence)
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
sc = StandardScaler()
X_train_sc = sc.fit_transform(X_train)
X_test_sc  = sc.transform(X_test)

# ── Logistic regression from scratch ─────────────────────────────────
class LogisticRegressionScratch:
    """
    Binary logistic regression trained with mini-batch gradient descent.
    All the math visible, nothing hidden.
    """

    def __init__(self, lr: float = 0.1, n_epochs: int = 200,
                 batch_size: int = 64, l2: float = 0.01):
        self.lr          = lr
        self.n_epochs    = n_epochs
        self.batch_size  = batch_size
        self.l2          = l2   # L2 regularisation strength
        self.w           = None
        self.b           = 0.0
        self.loss_history = []

    @staticmethod
    def sigmoid(z): return 1 / (1 + np.exp(-np.clip(z, -500, 500)))

    def fit(self, X: np.ndarray, y: np.ndarray):
        n, d = X.shape
        self.w = np.zeros(d)   # initialise weights at 0
        rng    = np.random.default_rng(42)

        for epoch in range(self.n_epochs):
            # Shuffle training data each epoch
            idx = rng.permutation(n)
            X_s, y_s = X[idx], y[idx]
            epoch_loss = 0.0

            for start in range(0, n, self.batch_size):
                Xb = X_s[start:start + self.batch_size]
                yb = y_s[start:start + self.batch_size]
                nb = len(Xb)

                # ── Forward pass ──────────────────────────────────
                z = Xb @ self.w + self.b        # linear: (nb,)
                p = self.sigmoid(z)              # probability: (nb,)

                # ── Loss (with L2 regularisation) ─────────────────
                eps   = 1e-10
                bce   = -np.mean(yb*np.log(p+eps) + (1-yb)*np.log(1-p+eps))
                reg   = 0.5 * self.l2 * np.dot(self.w, self.w)
                loss  = bce + reg
                epoch_loss += loss

                # ── Backward pass (gradients) ─────────────────────
                error  = p - yb                        # (nb,) — prediction error
                dw     = (Xb.T @ error) / nb + self.l2 * self.w  # (d,)
                db     = error.mean()                  # scalar

                # ── Weight update ──────────────────────────────────
                self.w -= self.lr * dw
                self.b -= self.lr * db

            self.loss_history.append(epoch_loss / (n // self.batch_size))

            if epoch % 40 == 0:
                print(f"  Epoch {epoch:3d}: loss = {self.loss_history[-1]:.4f}")

    def predict_proba(self, X: np.ndarray) -> np.ndarray:
        return self.sigmoid(X @ self.w + self.b)

    def predict(self, X: np.ndarray, threshold: float = 0.5) -> np.ndarray:
        return (self.predict_proba(X) >= threshold).astype(int)

    def score(self, X: np.ndarray, y: np.ndarray) -> float:
        return (self.predict(X) == y).mean()

# ── Train ──────────────────────────────────────────────────────────────
model_scratch = LogisticRegressionScratch(lr=0.1, n_epochs=200, l2=0.01)
model_scratch.fit(X_train_sc, y_train)

acc_train = model_scratch.score(X_train_sc, y_train)
acc_test  = model_scratch.score(X_test_sc, y_test)
print(f"\nFrom-scratch model:")
print(f"  Train accuracy: {acc_train:.4f}")
print(f"  Test accuracy:  {acc_test:.4f}")

# Verify against sklearn
from sklearn.linear_model import LogisticRegression
sk_model = LogisticRegression(C=1/0.01, max_iter=500, random_state=42)
sk_model.fit(X_train_sc, y_train)
print(f"\nsklearn LogisticRegression test accuracy: {sk_model.score(X_test_sc, y_test):.4f}")
# Should match closely ↑`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — SKLEARN IN DEPTH ═══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The production way</span>
        <h2 style={S.h2}>sklearn LogisticRegression — every option explained</h2>

        <p style={S.p}>
          sklearn's LogisticRegression has many parameters.
          Most tutorials use the defaults without explaining what they do.
          This section explains every important parameter so you can make
          principled choices rather than accepting defaults blindly.
        </p>

        <CodeBlock code={`from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import cross_val_score
import numpy as np

# ── The C parameter — inverse of regularisation strength ──────────────
# C = 1/lambda  where lambda is the regularisation strength
# Large C  → weak regularisation → model can fit training data more freely
# Small C  → strong regularisation → simpler model, less overfitting
# Default C=1.0 is a reasonable starting point
# ALWAYS tune C — it is the most important hyperparameter

for C in [0.001, 0.01, 0.1, 1.0, 10.0, 100.0]:
    model = LogisticRegression(C=C, max_iter=1000, random_state=42)
    scores = cross_val_score(model, X_train_sc, y_train, cv=5, scoring='roc_auc')
    print(f"  C={C:<8}: ROC-AUC = {scores.mean():.4f} ± {scores.std():.4f}")

# ── penalty — L1 vs L2 vs ElasticNet ──────────────────────────────────
# penalty='l2' (default): weight² penalty — drives weights toward 0, keeps all features
# penalty='l1':           |weight| penalty — drives some weights to exactly 0 (feature selection)
# penalty='elasticnet':   mix of L1 and L2 — l1_ratio controls the mix

penalties = [
    ('l2',         dict(C=1.0, solver='lbfgs')),
    ('l1',         dict(C=1.0, solver='liblinear')),
    ('elasticnet', dict(C=1.0, solver='saga', l1_ratio=0.5, max_iter=2000)),
    ('none',       dict(solver='lbfgs')),
]

print("\nRegularisation comparison (5-fold CV ROC-AUC):")
for penalty, kwargs in penalties:
    model = LogisticRegression(penalty=penalty, random_state=42, **kwargs)
    scores = cross_val_score(model, X_train_sc, y_train, cv=5, scoring='roc_auc')
    print(f"  penalty='{penalty}'   : {scores.mean():.4f} ± {scores.std():.4f}")

# ── solver — which optimisation algorithm ─────────────────────────────
# 'lbfgs':     default, L-BFGS quasi-Newton. Fast for small-medium data.
# 'liblinear': fast for small datasets, supports L1 and L2
# 'saga':      faster for large datasets, supports L1, L2, ElasticNet
# 'sag':       variant of SAGA, only L2
# 'newton-cg': Newton's method, only L2

# ── class_weight — handle imbalanced datasets ─────────────────────────
# If 90% of orders are on-time and 10% are late, a model that always
# predicts on-time gets 90% accuracy but catches 0 late orders.
# class_weight='balanced' weights the loss by inverse class frequency.

model_balanced = LogisticRegression(
    C=1.0,
    class_weight='balanced',   # auto-weight: rare class gets higher penalty for errors
    max_iter=1000,
    random_state=42,
)
model_balanced.fit(X_train_sc, y_train)

from sklearn.metrics import classification_report
y_pred_balanced = model_balanced.predict(X_test_sc)
print("\nWith class_weight='balanced':")
print(classification_report(y_test, y_pred_balanced, target_names=['on-time','late']))

# ── Full pipeline — the production pattern ─────────────────────────────
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('model',  LogisticRegression(
        C=1.0,
        penalty='l2',
        solver='lbfgs',
        max_iter=1000,
        class_weight='balanced',
        random_state=42,
    )),
])
pipe.fit(X_train, y_train)
print(f"\nPipeline test accuracy: {pipe.score(X_test, y_test):.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — DECISION BOUNDARY ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What the model learned</span>
        <h2 style={S.h2}>Decision boundary and coefficient interpretation</h2>

        <p style={S.p}>
          The decision boundary is the set of points where the model is exactly
          50% confident — the line (in 2D) or hyperplane (in n dimensions)
          that separates the two classes. Every point on one side gets
          predicted as class 1, every point on the other side as class 0.
        </p>

        <p style={S.p}>
          Unlike neural networks, logistic regression coefficients are directly
          interpretable. Each coefficient tells you: holding all other features
          fixed, how does a one standard deviation increase in this feature
          change the log-odds of the positive class?
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler

# Train on full feature set including engineered features
feature_names = ['distance_km','traffic_score','restaurant_prep']
sc = StandardScaler()
X_train_sc = sc.fit_transform(X_train)
X_test_sc  = sc.transform(X_test)

model = LogisticRegression(C=1.0, max_iter=1000, random_state=42)
model.fit(X_train_sc, y_train)

# ── Coefficient interpretation ────────────────────────────────────────
# Coefficients are in terms of STANDARDISED features
# A coefficient of 1.5 means: increasing this feature by 1 std
# increases the log-odds of being late by 1.5
# log-odds = log(p / (1-p))

coef_df = pd.DataFrame({
    'feature':     feature_names,
    'coefficient': model.coef_[0],
    'odds_ratio':  np.exp(model.coef_[0]),  # e^coef = how odds multiply per std
}).sort_values('coefficient', ascending=False)

print("Logistic regression coefficients (standardised features):")
print(coef_df.to_string(index=False))
print(f"\nIntercept (bias): {model.intercept_[0]:.4f}")

print("\nInterpretation (per 1 standard deviation increase):")
for _, row in coef_df.iterrows():
    direction = 'INCREASES' if row['coefficient'] > 0 else 'DECREASES'
    print(f"  {row['feature']:<20}: {direction} P(late) | "
          f"coef={row['coefficient']:.3f} | odds_ratio={row['odds_ratio']:.3f}")

# ── Decision boundary in 2D (distance vs traffic) ─────────────────────
# Boundary: w₁x₁ + w₂x₂ + b = 0  →  x₂ = -(w₁x₁ + b) / w₂
# For a 2-feature model:
model_2d = LogisticRegression(C=1.0, random_state=42)
X_2d_train = X_train_sc[:, :2]   # only distance and traffic (standardised)
model_2d.fit(X_2d_train, y_train)

w1, w2 = model_2d.coef_[0]
b      = model_2d.intercept_[0]

# x_traffic = -(w1*x_distance + b) / w2
print(f"\nDecision boundary equation:")
print(f"  {w2:.3f} × traffic + {w1:.3f} × distance + {b:.3f} = 0")
print(f"  traffic = ({-w1:.3f} × distance + {-b:.3f}) / {w2:.3f}")

# At distance = 0 (standardised): traffic threshold
traffic_at_mean_dist = (- w1 * 0 - b) / w2
print(f"  At mean distance: classify as late if traffic > {traffic_at_mean_dist:.2f} std")`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — EVALUATION ═════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Did it actually work?</span>
        <h2 style={S.h2}>Classification evaluation — beyond accuracy</h2>

        <p style={S.p}>
          Accuracy is the wrong metric for almost every real classification problem.
          If 85% of deliveries are on-time, a model that always predicts on-time
          gets 85% accuracy while being completely useless.
          You need metrics that capture how well the model finds the minority class.
        </p>

        <VisualBox label="The four cells of a confusion matrix — what everything is built from">
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '100px 100px 100px',
                textAlign: 'center' as const,
              }}>
                <div style={{ padding: '8px', background: 'var(--surface)' }} />
                <div style={{ padding: '8px', background: 'var(--surface)', fontSize: 11, color: '#1D9E75', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>Pred 0</div>
                <div style={{ padding: '8px', background: 'var(--surface)', fontSize: 11, color: '#D85A30', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>Pred 1</div>
                <div style={{ padding: '8px', background: 'var(--surface)', fontSize: 11, color: '#1D9E75', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>True 0</div>
                <div style={{ padding: '16px 8px', background: 'rgba(29,158,117,0.15)', borderTop: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)' }}>TN</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>True Negative</div>
                </div>
                <div style={{ padding: '16px 8px', background: 'rgba(216,90,48,0.1)', borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#D85A30', fontFamily: 'var(--font-mono)' }}>FP</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>False Positive</div>
                </div>
                <div style={{ padding: '8px', background: 'var(--surface)', fontSize: 11, color: '#D85A30', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>True 1</div>
                <div style={{ padding: '16px 8px', background: 'rgba(216,90,48,0.1)', borderTop: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#D85A30', fontFamily: 'var(--font-mono)' }}>FN</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>False Negative</div>
                </div>
                <div style={{ padding: '16px 8px', background: 'rgba(29,158,117,0.15)', borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)' }}>TP</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>True Positive</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 220 }}>
              {[
                { metric: 'Accuracy',  formula: '(TP+TN) / Total', use: 'Only when classes are balanced' },
                { metric: 'Precision', formula: 'TP / (TP+FP)',    use: 'When FP is costly (spam filter)' },
                { metric: 'Recall',    formula: 'TP / (TP+FN)',    use: 'When FN is costly (fraud, medical)' },
                { metric: 'F1',        formula: '2 × P×R / (P+R)', use: 'Balanced harmonic mean of P and R' },
                { metric: 'ROC-AUC',   formula: 'Area under ROC',  use: 'Threshold-independent, most complete' },
              ].map((row) => (
                <div key={row.metric} style={{
                  display: 'grid', gridTemplateColumns: '80px 130px 1fr',
                  gap: 8, alignItems: 'center',
                  background: 'var(--surface)', borderRadius: 5, padding: '6px 10px',
                }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#378ADD', fontFamily: 'var(--font-mono)' }}>{row.metric}</span>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{row.formula}</span>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{row.use}</span>
                </div>
              ))}
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`from sklearn.metrics import (
    classification_report, confusion_matrix,
    roc_auc_score, average_precision_score,
    precision_recall_curve, roc_curve,
)
import numpy as np

# Train final model
model = LogisticRegression(C=1.0, class_weight='balanced',
                            max_iter=1000, random_state=42)
model.fit(X_train_sc, y_train)

y_pred       = model.predict(X_test_sc)
y_proba      = model.predict_proba(X_test_sc)[:, 1]

# ── Classification report ──────────────────────────────────────────────
print("Classification report:")
print(classification_report(y_test, y_pred, target_names=['on-time','late']))

# ── Confusion matrix ───────────────────────────────────────────────────
cm = confusion_matrix(y_test, y_pred)
tn, fp, fn, tp = cm.ravel()
print(f"Confusion matrix:")
print(f"  TN={tn}  FP={fp}")
print(f"  FN={fn}  TP={tp}")
print(f"\n  Precision (of predicted-late, how many truly late): {tp/(tp+fp):.3f}")
print(f"  Recall    (of truly-late, how many we caught):       {tp/(tp+fn):.3f}")

# ── ROC-AUC ───────────────────────────────────────────────────────────
roc_auc = roc_auc_score(y_test, y_proba)
avg_prec = average_precision_score(y_test, y_proba)
print(f"\n  ROC-AUC:              {roc_auc:.4f}")
print(f"  Avg Precision (AP):   {avg_prec:.4f}")
print(f"  Accuracy:             {(y_pred == y_test).mean():.4f}")

# ── Threshold tuning — 0.5 is not always optimal ──────────────────────
# The business question determines the right threshold.
# At DoorDash: missing a late delivery (FN) costs customer experience.
# A lower threshold catches more late deliveries but flags more on-time ones.

print("\nThreshold analysis:")
print(f"{'Threshold':<12} {'Precision':<12} {'Recall':<10} {'F1':<10} {'Flagged %'}")
print("─" * 58)
for threshold in [0.2, 0.3, 0.4, 0.5, 0.6, 0.7]:
    y_pred_t  = (y_proba >= threshold).astype(int)
    tp_t      = ((y_pred_t == 1) & (y_test == 1)).sum()
    fp_t      = ((y_pred_t == 1) & (y_test == 0)).sum()
    fn_t      = ((y_pred_t == 0) & (y_test == 1)).sum()
    prec_t    = tp_t / max(tp_t + fp_t, 1)
    rec_t     = tp_t / max(tp_t + fn_t, 1)
    f1_t      = 2 * prec_t * rec_t / max(prec_t + rec_t, 1e-10)
    flagged_t = y_pred_t.mean() * 100
    print(f"{threshold:<12.1f} {prec_t:<12.3f} {rec_t:<10.3f} {f1_t:<10.3f} {flagged_t:.1f}%")

# For DoorDash: a threshold of 0.3 catches more late deliveries
# but flags more on-time ones for proactive ETA warnings — good tradeoff`} />
      </div>

      <Div />

      {/* ══ SECTION 9 — REGULARISATION ═════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Preventing overfitting</span>
        <h2 style={S.h2}>L1 and L2 regularisation — what they do and when to use each</h2>

        <p style={S.p}>
          Regularisation adds a penalty term to the loss function
          that discourages large weight values. Without it, logistic regression
          can memorise the training data (especially when features are many
          or highly correlated), producing large weights that don't generalise.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler

# Generate a high-dimensional problem: 20 features, many irrelevant
np.random.seed(42)
n_train = 500

# 3 truly useful features + 17 noise features
X_useful = X_train[:n_train, :]                            # (n, 3) useful
X_noise  = np.random.randn(n_train, 17)                   # (n, 17) pure noise
X_high   = np.column_stack([X_useful, X_noise])
y_high   = y_train[:n_train]

X_useful_te = X_test[:100, :]
X_noise_te  = np.random.randn(100, 17)
X_high_te   = np.column_stack([X_useful_te, X_noise_te])
y_high_te   = y_test[:100]

sc20 = StandardScaler()
X_high_sc    = sc20.fit_transform(X_high)
X_high_te_sc = sc20.transform(X_high_te)

feature_names_20 = (
    ['distance_km','traffic_score','restaurant_prep'] +
    [f'noise_{i:02d}' for i in range(17)]
)

print("Effect of regularisation on 20-feature problem (3 useful, 17 noise):")
print(f"{'Model':<35} {'Train acc':<12} {'Test acc':<12} {'Non-zero coefs'}")
print("─" * 72)

for name, model in [
    ('No regularisation (penalty=None)', LogisticRegression(penalty=None, solver='lbfgs', max_iter=2000)),
    ('L2 regularisation C=1.0',          LogisticRegression(penalty='l2', C=1.0, solver='lbfgs', max_iter=2000)),
    ('L2 regularisation C=0.1',          LogisticRegression(penalty='l2', C=0.1, solver='lbfgs', max_iter=2000)),
    ('L1 regularisation C=1.0',          LogisticRegression(penalty='l1', C=1.0, solver='liblinear', max_iter=2000)),
    ('L1 regularisation C=0.1',          LogisticRegression(penalty='l1', C=0.1, solver='liblinear', max_iter=2000)),
]:
    model.fit(X_high_sc, y_high)
    tr_acc = model.score(X_high_sc, y_high)
    te_acc = model.score(X_high_te_sc, y_high_te)
    n_nz   = (np.abs(model.coef_[0]) > 1e-6).sum()
    print(f"{name:<35} {tr_acc:<12.4f} {te_acc:<12.4f} {n_nz}/20")

# L1 observations:
# - Drives noise feature coefficients to exactly 0 (true sparse solution)
# - Keeps only the 3 useful features (if C is small enough)
# - Acts as automatic feature selection

# L2 observations:
# - Shrinks all coefficients toward 0 but never exactly 0
# - All 20 features stay in the model with small weights
# - Better when all features are somewhat relevant

# Check which features L1 kept
l1_model = LogisticRegression(penalty='l1', C=0.1, solver='liblinear', max_iter=2000)
l1_model.fit(X_high_sc, y_high)
kept = [name for name, coef in zip(feature_names_20, l1_model.coef_[0]) if abs(coef) > 1e-6]
print(f"\nFeatures kept by L1 (C=0.1): {kept}")`} />
      </div>

      <Div />

      {/* ══ SECTION 10 — MULTI-CLASS ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Beyond binary</span>
        <h2 style={S.h2}>Multi-class logistic regression — OvR and Softmax</h2>

        <p style={S.p}>
          Binary logistic regression predicts two classes. For three or more classes,
          there are two strategies. One-vs-Rest (OvR) trains one binary classifier
          per class — "is this class 1 or not?", "is this class 2 or not?" —
          and picks the class with highest confidence. Multinomial (Softmax)
          extends the model directly to output a proper probability distribution
          over all classes simultaneously.
        </p>

        <VisualBox label="OvR vs Multinomial (Softmax) — when to use each">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid rgba(55,138,221,0.3)',
              borderRadius: 8, padding: '13px 15px',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#378ADD', fontFamily: 'var(--font-mono)', marginBottom: 7 }}>
                One-vs-Rest (OvR)
              </div>
              <p style={{ ...S.ps, marginBottom: 8 }}>
                Trains K binary classifiers. Probabilities don't sum to 1 across classes — they are independent binary probabilities normalised afterward.
              </p>
              <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.8, fontFamily: 'var(--font-mono)' }}>
                multi_class='ovr'<br />
                Works with any solver<br />
                Faster for large K<br />
                Best when classes are highly imbalanced
              </div>
            </div>
            <div style={{
              background: 'var(--surface)', border: '1px solid rgba(29,158,117,0.3)',
              borderRadius: 8, padding: '13px 15px',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)', marginBottom: 7 }}>
                Multinomial (Softmax)
              </div>
              <p style={{ ...S.ps, marginBottom: 8 }}>
                Trains one model for all K classes simultaneously. Probabilities always sum to exactly 1 across classes — a proper probability distribution.
              </p>
              <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.8, fontFamily: 'var(--font-mono)' }}>
                multi_class='multinomial'<br />
                Needs solver='lbfgs', 'saga', 'newton-cg'<br />
                Better calibrated probabilities<br />
                Preferred when K is small and balanced
              </div>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import classification_report
import numpy as np
import pandas as pd

np.random.seed(42)
n = 3000

# Multi-class problem: predict delivery speed category
# Classes: 'express' (<25 min), 'normal' (25-45 min), 'delayed' (>45 min)
distance = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic  = np.random.randint(1, 11, n).astype(float)
prep     = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
delivery = 8.6 + 7.3*distance + 0.8*prep + 1.5*traffic + np.random.normal(0, 4, n)

y_multi = pd.cut(
    delivery,
    bins=[-np.inf, 25, 45, np.inf],
    labels=['express','normal','delayed'],
).astype(str)

le = LabelEncoder()
y_enc = le.fit_transform(y_multi)
print(f"Classes: {le.classes_}")
print(f"Class distribution: {dict(zip(le.classes_, np.bincount(y_enc)))}")

X_multi = np.column_stack([distance, traffic, prep])
from sklearn.model_selection import train_test_split
Xm_tr, Xm_te, ym_tr, ym_te = train_test_split(X_multi, y_enc,
                                                test_size=0.2, random_state=42)
sc = StandardScaler()
Xm_tr_sc = sc.fit_transform(Xm_tr)
Xm_te_sc = sc.transform(Xm_te)

# ── OvR ────────────────────────────────────────────────────────────────
model_ovr = LogisticRegression(
    multi_class='ovr',
    C=1.0, solver='lbfgs', max_iter=1000, random_state=42
)
model_ovr.fit(Xm_tr_sc, ym_tr)

# ── Multinomial (Softmax) ──────────────────────────────────────────────
model_softmax = LogisticRegression(
    multi_class='multinomial',
    C=1.0, solver='lbfgs', max_iter=1000, random_state=42
)
model_softmax.fit(Xm_tr_sc, ym_tr)

print(f"\nOvR accuracy:       {model_ovr.score(Xm_te_sc, ym_te):.4f}")
print(f"Softmax accuracy:   {model_softmax.score(Xm_te_sc, ym_te):.4f}")

print("\nSoftmax probabilities for one sample:")
sample = Xm_te_sc[:1]
proba  = model_softmax.predict_proba(sample)[0]
for cls, p in zip(le.classes_, proba):
    bar = '█' * int(p * 30)
    print(f"  {cls:<10}: {bar} {p:.4f}")
print(f"  Sum: {proba.sum():.6f}  ← always exactly 1.0")

print("\nClassification report (Softmax):")
print(classification_report(
    ym_te, model_softmax.predict(Xm_te_sc),
    target_names=le.classes_,
))`} />
      </div>

      <Div />

      {/* ══ SECTION 11 — FULL PIPELINE ═════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What this looks like at work</span>
        <h2 style={S.h2}>Production late-delivery predictor — end to end</h2>

        <p style={S.p}>
          This is what the actual day-one task looks like when you join a data team
          and are asked to build a late-delivery classifier.
          Feature engineering, cross-validation, threshold selection,
          and model persistence — all in one pipeline.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_validate
from sklearn.metrics import (roc_auc_score, average_precision_score,
                              classification_report)
import joblib

np.random.seed(42)
n = 8000
restaurants = ['Pizza Hut','Biryani Blues',"McDonald's","Haldiram's",
               'Dominos','KFC','Subway','Burger King']
cities = ['Seattle','New York','Delhi','Austin','Boston','Chicago']
slots  = ['breakfast','lunch','evening','dinner']

distance = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic  = np.random.randint(1, 11, n).astype(float)
prep     = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
value    = np.abs(np.random.normal(350, 150, n)).clip(50, 1200)
delivery = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
            + np.random.normal(0, 4, n)).clip(10, 120)

df_prod = pd.DataFrame({
    'restaurant':     np.random.choice(restaurants, n),
    'city':           np.random.choice(cities, n),
    'time_slot':      np.random.choice(slots, n),
    'distance_km':    distance,
    'traffic_score':  traffic,
    'restaurant_prep':prep,
    'order_value':    value,
})
y_prod = (delivery > 45).astype(int)

# ── Feature engineering ────────────────────────────────────────────────
df_prod['log_distance']  = np.log1p(df_prod['distance_km'])
df_prod['dist_x_traffic']= df_prod['distance_km'] * df_prod['traffic_score']
df_prod['log_value']     = np.log1p(df_prod['order_value'])

NUM_FEATURES = ['log_distance','traffic_score','restaurant_prep',
                'dist_x_traffic','log_value','distance_km']
CAT_FEATURES = ['city','time_slot']

# ── Column transformer ─────────────────────────────────────────────────
preprocessor = ColumnTransformer([
    ('num', Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler',  StandardScaler()),
    ]), NUM_FEATURES),
    ('cat', Pipeline([
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('onehot',  OneHotEncoder(handle_unknown='ignore', sparse_output=False, drop='first')),
    ]), CAT_FEATURES),
])

# ── Final pipeline ─────────────────────────────────────────────────────
pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier',   LogisticRegression(
        C=0.5,
        penalty='l2',
        class_weight='balanced',
        solver='lbfgs',
        max_iter=2000,
        random_state=42,
    )),
])

# ── Stratified cross-validation ────────────────────────────────────────
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
cv_results = cross_validate(
    pipeline, df_prod, y_prod,
    cv=cv,
    scoring=['roc_auc','average_precision','accuracy'],
    return_train_score=True,
)

print("5-Fold Cross-Validation Results:")
for metric in ['roc_auc','average_precision','accuracy']:
    train_mean = cv_results[f'train_{metric}'].mean()
    val_mean   = cv_results[f'test_{metric}'].mean()
    val_std    = cv_results[f'test_{metric}'].std()
    print(f"  {metric:<22}: train={train_mean:.4f}  val={val_mean:.4f} ± {val_std:.4f}")

# ── Train final model on full data ─────────────────────────────────────
pipeline.fit(df_prod, y_prod)

# ── Find optimal threshold on held-out validation set ─────────────────
from sklearn.model_selection import train_test_split
df_tr, df_val, y_tr, y_val = train_test_split(df_prod, y_prod,
                                               test_size=0.2, stratify=y_prod, random_state=99)
pipeline.fit(df_tr, y_tr)
val_proba = pipeline.predict_proba(df_val)[:, 1]

# Choose threshold that maximises F1 for the late class
from sklearn.metrics import f1_score
best_threshold, best_f1 = 0.5, 0.0
for t in np.arange(0.2, 0.8, 0.02):
    f1 = f1_score(y_val, (val_proba >= t).astype(int), pos_label=1)
    if f1 > best_f1:
        best_f1, best_threshold = f1, t

print(f"\nOptimal threshold: {best_threshold:.2f} (F1={best_f1:.4f})")

# ── Save the pipeline ──────────────────────────────────────────────────
joblib.dump({
    'pipeline':  pipeline,
    'threshold': best_threshold,
    'features':  NUM_FEATURES + CAT_FEATURES,
    'version':   'v1.0',
}, '/tmp/late_delivery_model.pkl')
print("Model saved to /tmp/late_delivery_model.pkl")

# ── Load and score a new order ─────────────────────────────────────────
saved = joblib.load('/tmp/late_delivery_model.pkl')
new_order = pd.DataFrame([{
    'restaurant': 'Pizza Hut', 'city': 'Seattle', 'time_slot': 'dinner',
    'distance_km': 7.5, 'traffic_score': 9, 'restaurant_prep': 22,
    'order_value': 480,
}])
new_order['log_distance']   = np.log1p(new_order['distance_km'])
new_order['dist_x_traffic'] = new_order['distance_km'] * new_order['traffic_score']
new_order['log_value']      = np.log1p(new_order['order_value'])

p_late = saved['pipeline'].predict_proba(new_order)[0, 1]
pred   = 'LATE' if p_late >= saved['threshold'] else 'ON-TIME'
print(f"\nNew order prediction: {pred} (P(late)={p_late:.3f})")`} />
      </div>

      <Div />

      {/* ══ SECTION 12 — ERRORS ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common logistic regression error — explained and fixed</h2>

        <ErrorBlock
          error="ConvergenceWarning: Logistic Regression failed to converge"
          cause="The optimiser ran out of iterations before finding the minimum. Common causes: features not scaled (gradient steps are vastly different magnitudes per feature), very large or very small feature values, or insufficient max_iter."
          fix="Always scale features before LogisticRegression: StandardScaler() inside a Pipeline. Increase max_iter: LogisticRegression(max_iter=2000). Try solver='saga' which converges faster on large datasets. Check for extreme feature values: df.describe() should show roughly comparable ranges after scaling."
        />

        <ErrorBlock
          error="Model predicts only one class — all predictions are 0 or all are 1"
          cause="Severe class imbalance — one class dominates so heavily that predicting it always achieves high accuracy. The model learns that the intercept alone gives a good enough loss and ignores all features."
          fix="Use class_weight='balanced' which re-weights the loss to treat each class equally. Or use class_weight={0: 1, 1: 10} to manually weight the minority class. Or oversample the minority class with SMOTE before training. Always check class distribution: y.value_counts(normalize=True)."
        />

        <ErrorBlock
          error="Coefficients are very large (in the hundreds or thousands)"
          cause="Perfectly separable classes: there exists a hyperplane that perfectly separates the two classes in training data. With perfect separation, logistic regression keeps increasing coefficient magnitude trying to make the boundary sharper (sigmoid → step function), and the optimiser diverges."
          fix="Add regularisation: reduce C (e.g. C=0.01). Perfect separation often means a feature is a direct proxy for the label (leakage) or your dataset is too small. Check which feature has a perfect or near-perfect split: df.groupby(y)[feature].describe()."
        />

        <ErrorBlock
          error="ValueError: Unknown label type — continuous target passed to classifier"
          cause="You passed a continuous float array as y to LogisticRegression. For example, y = df['delivery_time'] instead of y = (df['delivery_time'] > 45).astype(int). LogisticRegression expects integer class labels, not continuous values."
          fix="Convert the continuous target to class labels before passing to the classifier. For binary: y = (df['delivery_time'] > 45).astype(int). For multi-class: y = pd.cut(df['delivery_time'], bins=[...], labels=[0,1,2]).astype(int). For regression tasks use LinearRegression, Ridge, or Lasso instead."
        />

        <ErrorBlock
          error="predict_proba gives overconfident probabilities — 0.999 for most samples"
          cause="Model is overfitting or features are too informative (possibly leakage). Also common when using OvR multi_class and normalising independent binary probabilities — they don't form a proper calibrated distribution."
          fix="Add regularisation (reduce C). Use multi_class='multinomial' for calibrated multi-class probabilities. For binary: use CalibratedClassifierCV with method='isotonic' or method='sigmoid' to post-process probabilities. Check for leakage: a feature should never have correlation > 0.9 with the label."
        />
      </div>

      <Div />

      {/* ══ SECTION 13 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You now have the foundation of classification. Every classifier builds on this.
        </h2>

        <p style={S.p}>
          Sigmoid. Cross-entropy. Gradient descent. Decision boundary. Regularisation.
          Threshold tuning. These are not logistic regression concepts — they are
          classification concepts. Neural networks use the same sigmoid (and its variants).
          The same cross-entropy loss. The same gradient descent.
          Deep learning is logistic regression applied many times with non-linear layers in between.
        </p>

        <p style={S.p}>
          Module 21 covers Decision Trees — the algorithm that grows a flowchart
          from your data. Trees are the conceptual foundation of Random Forests
          and Gradient Boosting (XGBoost, LightGBM) — the algorithms that win
          most tabular ML competitions and power most production ML systems
          at Indian tech companies today.
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
              Next — Module 21 · Classical ML
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Decision Trees — Learning a Flowchart from Data
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              How trees split features to minimise impurity, how to control
              overfitting with depth and pruning, and how trees become
              the building blocks of Random Forests and XGBoost.
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
          'Logistic regression is not regression — it is a classification algorithm. The "regression" refers to the linear equation inside it. It outputs a probability between 0 and 1, converted to a class label by a threshold.',
          'The sigmoid σ(z) = 1/(1+e⁻ᶻ) maps any real number to (0,1). It is the entire mechanism that makes logistic regression a probability model rather than an unbounded linear predictor.',
          'Cross-entropy loss − [y·log(p) + (1−y)·log(1−p)] penalises confident wrong predictions far more harshly than MSE. It produces a convex loss surface — gradient descent always finds the global minimum.',
          'The gradient of cross-entropy with respect to weights is (1/n) × Xᵀ(p−y) — identical in form to linear regression gradient. The sigmoid derivative cancels out perfectly, giving this clean result.',
          'C is the inverse of regularisation strength. Large C = weak regularisation = risk of overfitting. Small C = strong regularisation = simpler model. Always tune C. L1 regularisation drives some coefficients to exactly zero (feature selection). L2 shrinks all coefficients toward zero.',
          'Accuracy is the wrong metric for imbalanced classes. Use ROC-AUC (threshold-independent), Precision-Recall curve, and F1 score. The optimal threshold is rarely 0.5 — tune it to match the business cost of false positives vs false negatives.',
          'Coefficients in logistic regression are directly interpretable: a coefficient of 1.5 for distance_km means one standard deviation increase in distance multiplies the odds of being late by e^1.5 = 4.5. This interpretability is why logistic regression remains widely used in production despite its simplicity.',
        ]}
      />
    </LearnLayout>
  )
}