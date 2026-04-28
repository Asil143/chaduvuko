import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Evaluation Metrics — Beyond Accuracy — Chaduvuko',
  description:
    'Precision, recall, F1, ROC-AUC, PR-AUC, confusion matrices, and the business cost framing that turns metrics into decisions — built from plain English first.',
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

export default function EvaluationMetricsPage() {
  return (
    <LearnLayout
      title="Evaluation Metrics — Beyond Accuracy"
      description="Precision, recall, F1, ROC-AUC, PR-AUC, confusion matrices, and the business cost framing that turns metrics into decisions."
      section="Model Evaluation"
      readTime="26–34 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="evaluation" topic="evaluation-metrics" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — why accuracy is almost always the wrong metric</span>
        <h2 style={S.h2}>
          Your fraud model has 98.5% accuracy. Your manager is thrilled.
          Then you check: it flags zero fraud cases. All 98.5% comes from
          predicting "not fraud" on every single transaction.
        </h2>

        <p style={S.p}>
          Stripe processes 5 million transactions per day.
          Only 1.5% are fraudulent — 75,000 transactions.
          A model that predicts "legitimate" for every transaction
          achieves 98.5% accuracy without catching a single fraudulent rupee.
          This model is completely useless, yet the accuracy number
          looks spectacular in a presentation.
        </p>

        <p style={S.p}>
          Accuracy is misleading whenever the classes are imbalanced —
          which is almost always the case in the problems that matter most.
          Fraud detection: 1–2% fraud. Disease diagnosis: 1–5% positive.
          Churn prediction: 3–8% churners. Spam detection: 5–20% spam.
          In all of these, a naive "always predict the majority" baseline
          achieves 92–99% accuracy while being completely worthless.
        </p>

        <p style={S.p}>
          This module teaches the metrics that actually matter:
          the confusion matrix (what kind of errors is the model making?),
          precision and recall (the fundamental trade-off),
          F1 score (one number that balances both),
          ROC-AUC (threshold-independent performance),
          and PR-AUC (the right metric for severely imbalanced problems).
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A doctor is screening patients for a rare disease affecting 1 in 100 people.
            A doctor who says "healthy" to everyone achieves 99% accuracy.
            But they miss every sick patient. The medical community does not measure
            doctors by "how often are you right overall?" They measure:
            "of the people you said were sick, how many actually were?" (precision)
            and "of all the people who were actually sick, how many did you catch?" (recall).
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            These two questions — precision and recall — are the core
            of all classification evaluation. Every other metric
            (F1, ROC-AUC, PR-AUC) is built on top of them.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          The right metric depends entirely on the cost of each type of error in your
          business context. Missing a fraud case costs more than a false alarm?
          Optimise recall. False alarms cause customers to call support constantly?
          Optimise precision. This module shows you how to make that decision explicitly.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — THE CONFUSION MATRIX ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The foundation of all classification metrics</span>
        <h2 style={S.h2}>The confusion matrix — four outcomes, every metric derives from them</h2>

        <p style={S.p}>
          A binary classifier makes one of four possible outcomes for each prediction.
          The confusion matrix organises all four.
          Every metric — accuracy, precision, recall, F1 — is a formula
          combining these four numbers in different ways.
          Understanding the four cells first makes every metric obvious.
        </p>

        <VisualBox label="The confusion matrix — four cells, what each means">
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {/* Matrix */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 110px 110px', gap: 0 }}>
                {/* Header row */}
                <div style={{ padding: '8px', fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }} />
                <div style={{ padding: '8px', fontSize: 11, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)', textAlign: 'center' as const }}>
                  Predicted: Fraud
                </div>
                <div style={{ padding: '8px', fontSize: 11, fontWeight: 700, color: '#D85A30', fontFamily: 'var(--font-mono)', textAlign: 'center' as const }}>
                  Predicted: Legit
                </div>
                {/* Row 1 */}
                <div style={{ padding: '8px', fontSize: 11, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)' }}>
                  Actual: Fraud
                </div>
                <div style={{
                  padding: '16px 8px', background: 'rgba(0,230,118,0.1)',
                  border: '2px solid #00e676', borderRadius: '6px 0 0 0',
                  textAlign: 'center' as const,
                }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#00e676', fontFamily: 'var(--font-mono)' }}>TP</div>
                  <div style={{ fontSize: 10, color: '#00e676', fontFamily: 'var(--font-mono)' }}>True Positive</div>
                </div>
                <div style={{
                  padding: '16px 8px', background: 'rgba(255,71,87,0.08)',
                  border: '2px solid #ff4757', borderRadius: '0 6px 0 0',
                  textAlign: 'center' as const,
                }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#ff4757', fontFamily: 'var(--font-mono)' }}>FN</div>
                  <div style={{ fontSize: 10, color: '#ff4757', fontFamily: 'var(--font-mono)' }}>False Negative</div>
                </div>
                {/* Row 2 */}
                <div style={{ padding: '8px', fontSize: 11, fontWeight: 700, color: '#D85A30', fontFamily: 'var(--font-mono)' }}>
                  Actual: Legit
                </div>
                <div style={{
                  padding: '16px 8px', background: 'rgba(255,71,87,0.08)',
                  border: '2px solid #ff4757', borderRadius: '0 0 0 6px',
                  textAlign: 'center' as const,
                }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#ff4757', fontFamily: 'var(--font-mono)' }}>FP</div>
                  <div style={{ fontSize: 10, color: '#ff4757', fontFamily: 'var(--font-mono)' }}>False Positive</div>
                </div>
                <div style={{
                  padding: '16px 8px', background: 'rgba(0,230,118,0.1)',
                  border: '2px solid #00e676', borderRadius: '0 0 6px 0',
                  textAlign: 'center' as const,
                }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#00e676', fontFamily: 'var(--font-mono)' }}>TN</div>
                  <div style={{ fontSize: 10, color: '#00e676', fontFamily: 'var(--font-mono)' }}>True Negative</div>
                </div>
              </div>
            </div>
            {/* Explanations */}
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { cell: 'TP', color: '#00e676', name: 'True Positive', desc: 'Fraud predicted, actually fraud. Caught it. Good.' },
                  { cell: 'TN', color: '#00e676', name: 'True Negative', desc: 'Legit predicted, actually legit. Correct. Good.' },
                  { cell: 'FP', color: '#ff4757', name: 'False Positive', desc: 'Fraud predicted, actually legit. False alarm — customer blocked unnecessarily.' },
                  { cell: 'FN', color: '#ff4757', name: 'False Negative', desc: 'Legit predicted, actually fraud. Missed fraud — most costly error.' },
                ].map((row) => (
                  <div key={row.cell} style={{
                    display: 'flex', gap: 10, alignItems: 'flex-start',
                    background: 'var(--surface)', borderRadius: 6, padding: '8px 10px',
                  }}>
                    <span style={{
                      fontSize: 13, fontWeight: 900, color: row.color,
                      fontFamily: 'var(--font-mono)', minWidth: 28,
                    }}>
                      {row.cell}
                    </span>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: row.color, marginBottom: 2 }}>
                        {row.name}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>
                        {row.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.metrics import (confusion_matrix, classification_report,
                              accuracy_score, precision_score,
                              recall_score, f1_score)
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 10_000

# Simulate Stripe fraud predictions
# 1.5% fraud rate
y_true  = (np.random.random(n) < 0.015).astype(int)
# Realistic model: catches 70% of fraud, 3% false alarm rate
y_pred  = np.zeros(n, dtype=int)
fraud_idx = np.where(y_true == 1)[0]
legit_idx = np.where(y_true == 0)[0]
# True positives: catch 70% of actual fraud
tp_idx = np.random.choice(fraud_idx, int(len(fraud_idx)*0.70), replace=False)
y_pred[tp_idx] = 1
# False positives: flag 3% of legitimate transactions
fp_idx = np.random.choice(legit_idx, int(len(legit_idx)*0.03), replace=False)
y_pred[fp_idx] = 1

# ── Confusion matrix ──────────────────────────────────────────────────
cm = confusion_matrix(y_true, y_pred)
tn, fp, fn, tp = cm.ravel()

print("Confusion matrix:")
print(f"  {'':15} {'Pred: Fraud':>14} {'Pred: Legit':>14}")
print(f"  {'Actual: Fraud':<15} {'TP = ' + str(tp):>14} {'FN = ' + str(fn):>14}")
print(f"  {'Actual: Legit':<15} {'FP = ' + str(fp):>14} {'TN = ' + str(tn):>14}")

# ── Derive every metric manually ─────────────────────────────────────
accuracy  = (tp + tn) / (tp + tn + fp + fn)
precision = tp / (tp + fp)          # of all flagged, how many were fraud?
recall    = tp / (tp + fn)          # of all fraud, how many did we catch?
f1        = 2 * precision * recall / (precision + recall)
specificity = tn / (tn + fp)        # of all legit, how many were correctly allowed?
fpr       = fp / (fp + tn)          # false positive rate = 1 - specificity

print(f"\nMetrics (computed manually):")
print(f"  Accuracy:    {accuracy:.4f}   ← misleading — 98.5% if we predict all legit")
print(f"  Precision:   {precision:.4f}   ← of flagged transactions, {precision*100:.1f}% are fraud")
print(f"  Recall:      {recall:.4f}   ← we catch {recall*100:.1f}% of all fraud")
print(f"  F1 score:    {f1:.4f}   ← harmonic mean of precision and recall")
print(f"  Specificity: {specificity:.4f}   ← {specificity*100:.1f}% of legit transactions pass through")
print(f"  FPR:         {fpr:.4f}   ← {fpr*100:.1f}% of legit flagged as fraud")

# Business impact translation
fraud_value_per_tx = 2500  # avg ₹2500 per fraudulent transaction
false_alarm_cost   = 50    # ₹50 cost per false alarm (support call, friction)

fraud_caught    = tp * fraud_value_per_tx
fraud_missed    = fn * fraud_value_per_tx
false_alarm_cost_total = fp * false_alarm_cost

print(f"\nBusiness impact:")
print(f"  Fraud caught:         ₹{fraud_caught:,.0f} protected")
print(f"  Fraud missed (FN):    ₹{fraud_missed:,.0f} lost")
print(f"  False alarm cost:     ₹{false_alarm_cost_total:,.0f} in friction")
print(f"  Net value of model:   ₹{fraud_caught - fraud_missed - false_alarm_cost_total:,.0f}")

# sklearn classification_report gives everything at once
print("\nsklearn classification_report:")
print(classification_report(y_true, y_pred, target_names=['Legit', 'Fraud']))`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — PRECISION AND RECALL ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The fundamental trade-off</span>
        <h2 style={S.h2}>Precision vs recall — you cannot maximise both simultaneously</h2>

        <p style={S.p}>
          Precision and recall are in tension. To catch more fraud (increase recall)
          you need to lower the classification threshold — flag more transactions.
          But flagging more transactions means more false alarms (lower precision).
          To reduce false alarms (increase precision) you raise the threshold —
          but then you miss more actual fraud (lower recall).
          This trade-off is unavoidable and inherent to every binary classifier.
        </p>

        <p style={S.p}>
          The right balance depends entirely on the business cost of each error type.
          Missing a fraud transaction at Stripe costs ₹2,500 on average.
          A false alarm costs ₹50 in support friction. The cost ratio is 50:1.
          You should therefore accept 50 false alarms for every fraud case caught —
          meaning you should optimise heavily toward recall at the expense of precision.
        </p>

        <ConceptBox title="Precision and recall — the complete definitions">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                name: 'Precision',
                formula: 'TP / (TP + FP)',
                color: '#378ADD',
                question: 'Of all transactions I flagged as fraud — how many actually were?',
                when: 'High precision = few false alarms. Optimise when false alarms are costly.',
                example: 'Precision = 0.85: 85% of flagged transactions are genuine fraud.',
              },
              {
                name: 'Recall (Sensitivity)',
                formula: 'TP / (TP + FN)',
                color: '#D85A30',
                question: 'Of all transactions that were actually fraud — how many did I catch?',
                when: 'High recall = few missed positives. Optimise when missing positives is costly.',
                example: 'Recall = 0.90: we catch 90% of all fraudulent transactions.',
              },
              {
                name: 'F1 Score',
                formula: '2 × Precision × Recall / (Precision + Recall)',
                color: '#1D9E75',
                question: 'A single score that balances both — the harmonic mean.',
                when: 'Use when you need one number and both errors matter equally.',
                example: 'F1 = 0.87: balanced between precision=0.85 and recall=0.90.',
              },
            ].map((row) => (
              <div key={row.name} style={{
                background: 'var(--bg2)', border: `1px solid ${row.color}20`,
                borderRadius: 7, padding: '12px 14px',
              }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: row.color, fontFamily: 'var(--font-display)' }}>
                    {row.name}
                  </span>
                  <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: row.color,
                    background: `${row.color}15`, padding: '2px 8px', borderRadius: 3 }}>
                    {row.formula}
                  </span>
                </div>
                <p style={{ ...S.ps, marginBottom: 4 }}>{row.question}</p>
                <div style={{ fontSize: 11, color: row.color, marginBottom: 3 }}>{row.when}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>{row.example}</div>
              </div>
            ))}
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
from sklearn.svm import SVC
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (precision_score, recall_score, f1_score,
                              precision_recall_curve, average_precision_score)
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 8_000

# Stripe fraud features
amount         = np.abs(np.random.normal(1200, 2000, n)).clip(10, 50_000)
merchant_risk  = np.random.uniform(0, 1, n)
n_tx_hour      = np.random.randint(0, 20, n).astype(float)
device_age     = np.abs(np.random.normal(200, 150, n)).clip(0, 1000)
is_new_device  = np.random.randint(0, 2, n).astype(float)

fraud_score = (
    (amount/50_000)*0.30 + merchant_risk*0.25
    + (n_tx_hour/20)*0.25 + is_new_device*0.15
    + np.random.randn(n)*0.05
)
y = (fraud_score > 0.55).astype(int)

X = np.column_stack([amount, merchant_risk, n_tx_hour, device_age, is_new_device])
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2,
                                            stratify=y, random_state=42)
sc = StandardScaler()
X_tr_sc = sc.fit_transform(X_tr)
X_te_sc = sc.transform(X_te)

model = GradientBoostingClassifier(
    n_estimators=200, learning_rate=0.1, max_depth=3,
    subsample=0.8, random_state=42,
)
model.fit(X_tr_sc, y_tr)
y_proba = model.predict_proba(X_te_sc)[:, 1]

# ── Precision-recall at different thresholds ──────────────────────────
print("Precision-recall trade-off at different thresholds:")
print(f"{'Threshold':<12} {'Precision':>11} {'Recall':>9} {'F1':>9} {'Flagged':>9}")
print("─" * 54)

for threshold in np.arange(0.1, 0.91, 0.1):
    y_pred_t  = (y_proba >= threshold).astype(int)
    prec      = precision_score(y_te, y_pred_t, zero_division=0)
    rec       = recall_score(y_te, y_pred_t, zero_division=0)
    f1        = f1_score(y_te, y_pred_t, zero_division=0)
    flagged   = y_pred_t.mean() * 100
    print(f"  t={threshold:.1f}      {prec:>9.4f}  {rec:>9.4f}  {f1:>9.4f}  {flagged:>7.1f}%")

# ── F-beta score — weight recall over precision ────────────────────────
from sklearn.metrics import fbeta_score

# At Stripe: missing fraud costs 50× more than false alarm
# β=2 weights recall twice as heavily as precision
# β=0.5 weights precision twice as heavily as recall
print("\nF-beta score — adjusting the precision/recall balance:")
for beta in [0.5, 1.0, 2.0, 3.0]:
    y_pred_default = (y_proba >= 0.5).astype(int)
    fb = fbeta_score(y_te, y_pred_default, beta=beta, zero_division=0)
    desc = '(precision weighted)' if beta < 1 else '(equal weight)' if beta == 1 else '(recall weighted)'
    print(f"  F{beta}: {fb:.4f}  {desc}")

# ── PR-AUC — area under the precision-recall curve ────────────────────
# Better than ROC-AUC for highly imbalanced problems
pr_auc = average_precision_score(y_te, y_proba)
print(f"\nPR-AUC (Average Precision): {pr_auc:.4f}")
print("PR-AUC = 1.0: perfect model")
print(f"PR-AUC = {y_te.mean():.4f}: random baseline (= fraud rate)")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — ROC CURVE AND AUC ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Threshold-independent evaluation</span>
        <h2 style={S.h2}>ROC-AUC — how well the model ranks fraud above legitimate transactions</h2>

        <p style={S.p}>
          Precision and recall depend on the threshold you choose.
          Change the threshold, get different precision and recall.
          ROC-AUC (Receiver Operating Characteristic — Area Under Curve)
          is threshold-independent. It measures how well the model
          separates the two classes across all possible thresholds at once.
        </p>

        <p style={S.p}>
          The ROC curve plots the true positive rate (recall) against
          the false positive rate at every possible threshold.
          A perfect model has a curve that goes straight up to (0, 1) —
          it achieves 100% recall with 0% false alarms.
          A random model produces a diagonal line — recall equals the false alarm rate.
          The AUC is the area under the curve: 1.0 is perfect, 0.5 is random.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            You have 100 fraud cases and 9,900 legit transactions — all shuffled randomly.
            You ask the model to score all 10,000 and sort them by fraud probability,
            highest first. How many of the actual 100 fraud cases appear in the
            top 100? Top 200? Top 500? If the model is perfect, all 100 fraud cases
            appear before any legitimate transaction. The ROC curve plots this
            across every possible cutpoint. AUC is the probability that a randomly
            chosen fraud transaction scores higher than a randomly chosen legit one.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            AUC = 0.95 means: take one random fraud transaction and one random
            legit transaction. There is a 95% chance the model assigns a higher
            fraud score to the fraud transaction. This is the most intuitive
            interpretation of AUC.
          </p>
        </AnalogyBox>

        <VisualBox label="ROC curve — three models, same dataset">
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <svg width="260" height="240" viewBox="0 0 260 240">
              {/* Axes */}
              <line x1="35" y1="200" x2="235" y2="200" stroke="#555" strokeWidth="1" />
              <line x1="35" y1="20"  x2="35"  y2="200" stroke="#555" strokeWidth="1" />
              {/* Axis labels */}
              <text x="135" y="220" textAnchor="middle" fontSize="9" fill="#888" fontFamily="monospace">False Positive Rate →</text>
              <text x="12" y="115" fontSize="9" fill="#888" fontFamily="monospace" transform="rotate(-90,12,115)">True Positive Rate ↑</text>
              {/* Grid ticks */}
              {[0,0.25,0.5,0.75,1.0].map((v,i) => (
                <g key={v}>
                  <text x="28" y={200 - i*45 + 3} textAnchor="end" fontSize="8" fill="#555" fontFamily="monospace">{v}</text>
                  <text x={35 + i*50} y="210" textAnchor="middle" fontSize="8" fill="#555" fontFamily="monospace">{v}</text>
                </g>
              ))}
              {/* Random baseline */}
              <line x1="35" y1="200" x2="235" y2="20" stroke="#555" strokeWidth="1" strokeDasharray="4,3" />
              <text x="200" y="35" fontSize="8" fill="#555" fontFamily="monospace">random</text>
              {/* Good model */}
              <path d="M 35 200 Q 45 100 85 45 Q 120 22 235 20"
                fill="none" stroke="#1D9E75" strokeWidth="2.5" />
              <text x="90" y="42" fontSize="9" fill="#1D9E75" fontFamily="monospace">AUC=0.95</text>
              {/* OK model */}
              <path d="M 35 200 Q 70 130 120 80 Q 170 45 235 20"
                fill="none" stroke="#378ADD" strokeWidth="2" />
              <text x="140" y="72" fontSize="9" fill="#378ADD" fontFamily="monospace">AUC=0.80</text>
              {/* Poor model */}
              <path d="M 35 200 Q 100 160 160 120 Q 200 90 235 20"
                fill="none" stroke="#D85A30" strokeWidth="1.5" strokeDasharray="5,2" />
              <text x="168" y="118" fontSize="9" fill="#D85A30" fontFamily="monospace">AUC=0.65</text>
              {/* Ideal point */}
              <circle cx="35" cy="20" r="4" fill="none" stroke="#00e676" strokeWidth="1.5" />
              <text x="40" y="18" fontSize="8" fill="#00e676" fontFamily="monospace">ideal</text>
            </svg>
            <div style={{ flex: 1, minWidth: 150 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { auc: 'AUC = 1.0', color: '#00e676', desc: 'Perfect — always ranks fraud above legit' },
                  { auc: 'AUC = 0.9+', color: '#1D9E75', desc: 'Excellent — production quality' },
                  { auc: 'AUC = 0.8–0.9', color: '#378ADD', desc: 'Good — acceptable for most problems' },
                  { auc: 'AUC = 0.7–0.8', color: '#BA7517', desc: 'Fair — investigate features' },
                  { auc: 'AUC = 0.5–0.7', color: '#D85A30', desc: 'Poor — barely above random' },
                  { auc: 'AUC = 0.5', color: '#ff4757', desc: 'Random — model has no signal' },
                ].map((row) => (
                  <div key={row.auc} style={{ display: 'flex', gap: 10 }}>
                    <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: row.color, minWidth: 100 }}>
                      {row.auc}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>{row.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.metrics import roc_auc_score, roc_curve, average_precision_score
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 8_000

amount        = np.abs(np.random.normal(1200, 2000, n)).clip(10, 50_000)
merchant_risk = np.random.uniform(0, 1, n)
n_tx_hour     = np.random.randint(0, 20, n).astype(float)
device_age    = np.abs(np.random.normal(200, 150, n)).clip(0, 1000)
is_new_device = np.random.randint(0, 2, n).astype(float)

fraud_score = (
    (amount/50_000)*0.30 + merchant_risk*0.25
    + (n_tx_hour/20)*0.25 + is_new_device*0.15
    + np.random.randn(n)*0.05
)
y = (fraud_score > 0.55).astype(int)
X = np.column_stack([amount, merchant_risk, n_tx_hour, device_age, is_new_device])

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2,
                                            stratify=y, random_state=42)
sc      = StandardScaler()
X_tr_sc = sc.fit_transform(X_tr)
X_te_sc = sc.transform(X_te)

models = {
    'LogisticRegression': LogisticRegression(max_iter=1000, random_state=42),
    'RandomForest':       RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1),
    'GradientBoosting':   GradientBoostingClassifier(n_estimators=200, learning_rate=0.1,
                                                       max_depth=3, random_state=42),
}

print(f"{'Model':<22} {'ROC-AUC':>9} {'PR-AUC':>9} {'CV AUC (5-fold)':>16}")
print("─" * 60)

for name, model in models.items():
    model.fit(X_tr_sc, y_tr)
    y_prob  = model.predict_proba(X_te_sc)[:, 1]
    roc_auc = roc_auc_score(y_te, y_prob)
    pr_auc  = average_precision_score(y_te, y_prob)
    cv_auc  = cross_val_score(model, X_tr_sc, y_tr, cv=5,
                               scoring='roc_auc').mean()
    print(f"  {name:<20}  {roc_auc:>9.4f}  {pr_auc:>9.4f}  {cv_auc:>14.4f}")

# ── ROC curve — operating points ──────────────────────────────────────
best_model = models['GradientBoosting']
y_prob     = best_model.predict_proba(X_te_sc)[:, 1]
fpr, tpr, thresholds = roc_curve(y_te, y_prob)

print("\nROC curve operating points (selected thresholds):")
print(f"{'Threshold':<12} {'TPR (Recall)':>13} {'FPR':>8} {'Specificity':>13}")
print("─" * 50)

# Find specific operating points
for target_recall in [0.95, 0.90, 0.80, 0.70, 0.60]:
    idx  = np.argmin(np.abs(tpr - target_recall))
    spec = 1 - fpr[idx]
    print(f"  t={thresholds[idx]:.3f}     TPR={tpr[idx]:.3f}       FPR={fpr[idx]:.3f}    Spec={spec:.3f}")

# ── When to use ROC-AUC vs PR-AUC ─────────────────────────────────────
print("\nROC-AUC vs PR-AUC:")
print("  ROC-AUC: affected equally by both classes — good for balanced datasets")
print("  PR-AUC:  focuses on the positive (minority) class — use for fraud, churn")
print(f"  Fraud rate in this dataset: {y_te.mean()*100:.1f}%")
print(f"  → At {y_te.mean()*100:.1f}% positive rate, PR-AUC is the more informative metric")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — REGRESSION METRICS ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>When the output is continuous</span>
        <h2 style={S.h2}>Regression metrics — MAE, RMSE, MAPE, and R²</h2>

        <p style={S.p}>
          Regression problems have their own set of evaluation metrics.
          The right choice depends on how you want to treat large errors
          and whether the scale of the target matters for interpretation.
        </p>

        <VisualBox label="Four regression metrics — what each penalises">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                name: 'MAE — Mean Absolute Error',
                formula: 'mean(|y − ŷ|)',
                color: '#378ADD',
                desc: 'Average absolute difference. Easy to interpret — same units as target. Treats all errors equally. Robust to outliers.',
                use: 'Delivery time prediction: "model is off by 4.2 minutes on average"',
              },
              {
                name: 'RMSE — Root Mean Squared Error',
                formula: '√mean((y − ŷ)²)',
                color: '#D85A30',
                desc: 'Square root of average squared error. Penalises large errors more than MAE. More sensitive to outliers. Same units as target.',
                use: 'When large errors are disproportionately costly. Stock prices, safety-critical predictions.',
              },
              {
                name: 'MAPE — Mean Absolute Percentage Error',
                formula: 'mean(|y − ŷ| / |y|) × 100',
                color: '#1D9E75',
                desc: 'Average % error relative to actual. Scale-independent — good for comparing across products. Breaks when y=0.',
                use: 'Demand forecasting: "model is off by 8.3% on average". Comparable across SKUs.',
              },
              {
                name: 'R² — Coefficient of Determination',
                formula: '1 − SS_res / SS_tot',
                color: '#7F77DD',
                desc: 'Fraction of variance explained by the model. R²=1 is perfect, R²=0 is as good as predicting the mean, R²<0 is worse than mean. Scale-independent.',
                use: 'Quick sanity check: R²=0.87 means model explains 87% of target variance.',
              },
            ].map((row) => (
              <div key={row.name} style={{
                background: 'var(--surface)', border: `1px solid ${row.color}20`,
                borderRadius: 7, padding: '10px 14px',
                display: 'grid', gridTemplateColumns: '220px 1fr',
                gap: 14, alignItems: 'start',
              }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: row.color, marginBottom: 3, fontFamily: 'var(--font-display)' }}>
                    {row.name}
                  </div>
                  <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: row.color }}>
                    {row.formula}
                  </div>
                </div>
                <div>
                  <p style={{ ...S.ps, marginBottom: 4 }}>{row.desc}</p>
                  <div style={{ fontSize: 11, color: row.color, fontStyle: 'italic' }}>{row.use}</div>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.metrics import (mean_absolute_error, mean_squared_error,
                              mean_absolute_percentage_error, r2_score)
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
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

model = GradientBoostingRegressor(n_estimators=200, learning_rate=0.1,
                                   max_depth=3, random_state=42)
model.fit(X_tr, y_tr)
y_pred = model.predict(X_te)

# ── All four metrics ──────────────────────────────────────────────────
mae  = mean_absolute_error(y_te, y_pred)
rmse = np.sqrt(mean_squared_error(y_te, y_pred))
mape = mean_absolute_percentage_error(y_te, y_pred) * 100
r2   = r2_score(y_te, y_pred)

print(f"DoorDash delivery time model evaluation:")
print(f"  MAE:   {mae:.4f} min   ← average error in minutes")
print(f"  RMSE:  {rmse:.4f} min  ← penalises large errors more")
print(f"  MAPE:  {mape:.4f}%    ← percentage error relative to actual")
print(f"  R²:    {r2:.4f}       ← model explains {r2*100:.1f}% of variance")

# ── When RMSE >> MAE: outliers are present ────────────────────────────
print(f"\nRMSE / MAE ratio: {rmse/mae:.2f}")
print("  Ratio near 1.0: errors are uniform, no major outliers")
print("  Ratio > 2.0: large outlier errors are inflating RMSE")

# ── Baseline comparison — always compare against naive models ─────────
mean_pred    = np.full_like(y_te, y_tr.mean())
median_pred  = np.full_like(y_te, np.median(y_tr))

print(f"\nBaseline comparisons:")
print(f"  Always-predict-mean  MAE={mean_absolute_error(y_te, mean_pred):.4f}  R²={r2_score(y_te, mean_pred):.4f}")
print(f"  Always-predict-median MAE={mean_absolute_error(y_te, median_pred):.4f}  R²={r2_score(y_te, median_pred):.4f}")
print(f"  Our GBM model        MAE={mae:.4f}  R²={r2:.4f}")
print(f"  Improvement over mean: {(mean_absolute_error(y_te, mean_pred) - mae) / mean_absolute_error(y_te, mean_pred) * 100:.1f}%")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — THRESHOLD TUNING ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Turning probabilities into decisions</span>
        <h2 style={S.h2}>Threshold tuning — 0.5 is almost never the optimal threshold</h2>

        <p style={S.p}>
          sklearn's <span style={S.code as React.CSSProperties}>predict()</span> uses 0.5
          as the default threshold. A transaction with fraud probability 0.51 is flagged.
          One with 0.49 is not. This is almost never the right business decision.
          The optimal threshold should be derived from the relative cost
          of false positives and false negatives — which is a business decision,
          not a modelling decision.
        </p>

        <CodeBlock code={`import numpy as np
from sklearn.metrics import (precision_recall_curve, roc_curve,
                              f1_score, fbeta_score,
                              precision_score, recall_score)
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 8_000
amount = np.abs(np.random.normal(1200,2000,n)).clip(10,50_000)
merchant_risk = np.random.uniform(0,1,n)
n_tx_hour = np.random.randint(0,20,n).astype(float)
device_age = np.abs(np.random.normal(200,150,n)).clip(0,1000)
is_new_device = np.random.randint(0,2,n).astype(float)
fraud_score = (amount/50_000)*0.30 + merchant_risk*0.25 + (n_tx_hour/20)*0.25 + is_new_device*0.15 + np.random.randn(n)*0.05
y = (fraud_score > 0.55).astype(int)
X = np.column_stack([amount,merchant_risk,n_tx_hour,device_age,is_new_device])
X_tr,X_te,y_tr,y_te = train_test_split(X,y,test_size=0.2,stratify=y,random_state=42)
X_tv,X_val,y_tv,y_val = train_test_split(X_tr,y_tr,test_size=0.2,stratify=y_tr,random_state=42)
sc = StandardScaler()
X_tv_sc  = sc.fit_transform(X_tv)
X_val_sc = sc.transform(X_val)
X_te_sc  = sc.transform(X_te)

model = GradientBoostingClassifier(n_estimators=200, learning_rate=0.1,
                                    max_depth=3, random_state=42)
model.fit(X_tv_sc, y_tv)
val_proba = model.predict_proba(X_val_sc)[:, 1]

# ── Method 1: Maximise F1 ─────────────────────────────────────────────
thresholds   = np.arange(0.05, 0.96, 0.01)
f1_scores    = [f1_score(y_val, (val_proba >= t).astype(int), zero_division=0)
                for t in thresholds]
best_t_f1    = thresholds[np.argmax(f1_scores)]
print(f"Best threshold by F1:     {best_t_f1:.2f}  (F1={max(f1_scores):.4f})")

# ── Method 2: Maximise Fβ (recall-weighted for fraud) ─────────────────
fb_scores    = [fbeta_score(y_val, (val_proba >= t).astype(int),
                             beta=2, zero_division=0) for t in thresholds]
best_t_fb    = thresholds[np.argmax(fb_scores)]
print(f"Best threshold by F2:     {best_t_fb:.2f}  (F2={max(fb_scores):.4f})")

# ── Method 3: Business cost optimisation ─────────────────────────────
# Cost of false negative (missed fraud):  ₹2,500 avg transaction
# Cost of false positive (blocked legit): ₹50 friction
fn_cost = 2500
fp_cost = 50

costs = []
for t in thresholds:
    pred = (val_proba >= t).astype(int)
    fn   = ((pred == 0) & (y_val == 1)).sum()
    fp   = ((pred == 1) & (y_val == 0)).sum()
    costs.append(fn * fn_cost + fp * fp_cost)

best_t_biz = thresholds[np.argmin(costs)]
print(f"Best threshold by cost:   {best_t_biz:.2f}  (cost=₹{min(costs):,.0f})")

# ── Compare all thresholds on test set ────────────────────────────────
test_proba = model.predict_proba(X_te_sc)[:, 1]
print(f"\nTest set performance at different thresholds:")
print(f"{'Method':<22} {'Threshold':>10} {'Precision':>11} {'Recall':>9} {'F1':>9}")
print("─" * 65)

for label, t in [('Default (0.5)', 0.5),
                  ('Max F1', best_t_f1),
                  ('Max F2 (recall++)', best_t_fb),
                  ('Min business cost', best_t_biz)]:
    pred = (test_proba >= t).astype(int)
    p  = precision_score(y_te, pred, zero_division=0)
    r  = recall_score(y_te, pred, zero_division=0)
    f1 = f1_score(y_te, pred, zero_division=0)
    print(f"  {label:<20}  {t:>10.2f}  {p:>11.4f}  {r:>9.4f}  {f1:>9.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — MULTI-CLASS METRICS ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>When there are more than two classes</span>
        <h2 style={S.h2}>Multi-class evaluation — macro, micro, and weighted averaging</h2>

        <p style={S.p}>
          Binary metrics extend naturally to multi-class problems.
          The question is how to aggregate per-class metrics into a single number.
          Three averaging strategies give different answers and are appropriate
          in different situations.
        </p>

        <CodeBlock code={`import numpy as np
from sklearn.metrics import (classification_report, confusion_matrix,
                              f1_score, precision_score, recall_score)
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 5000

# DoorDash support ticket categories: 4 classes
# delivery_issue, food_quality, payment_issue, general
X = np.random.randn(n, 10)
y = np.random.choice([0,1,2,3], n, p=[0.40, 0.25, 0.20, 0.15])
# Class 0=delivery (40%), 1=food (25%), 2=payment (20%), 3=general (15%)

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2,
                                            stratify=y, random_state=42)
sc = StandardScaler()
model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
model.fit(sc.fit_transform(X_tr), y_tr)
y_pred = model.predict(sc.transform(X_te))

class_names = ['delivery', 'food_quality', 'payment', 'general']

# ── Classification report ──────────────────────────────────────────────
print("Full classification report:")
print(classification_report(y_te, y_pred, target_names=class_names))

# ── Three averaging strategies explained ──────────────────────────────
print("Averaging strategies for multi-class F1:")
for avg in ['macro', 'weighted', 'micro']:
    f1 = f1_score(y_te, y_pred, average=avg)
    if avg == 'macro':
        desc = 'unweighted mean of per-class F1 — treats all classes equally'
    elif avg == 'weighted':
        desc = 'weighted by support (class size) — accounts for imbalance'
    else:
        desc = 'global TP/FP/FN — equivalent to accuracy for multi-class'
    print(f"  {avg:<10}: {f1:.4f}  ← {desc}")

print("\nWhen to use each:")
print("  macro:    when all classes matter equally (even rare ones)")
print("  weighted: when class frequency should influence the metric")
print("  micro:    rarely used for multi-class; equivalent to accuracy")

# ── Per-class metrics ──────────────────────────────────────────────────
print("\nPer-class F1 scores:")
per_class_f1 = f1_score(y_te, y_pred, average=None)
class_counts = np.bincount(y_te)
for name, f1, count in zip(class_names, per_class_f1, class_counts):
    bar = '█' * int(f1 * 25)
    print(f"  {name:<14}: {bar:<25} {f1:.4f}  (n={count})")`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common evaluation mistake — explained and fixed</h2>

        <ErrorBlock
          error="Model reports 98% accuracy but the business is unhappy — model is useless in production"
          cause="Accuracy on an imbalanced dataset is dominated by the majority class. A model that predicts 'no fraud' for every transaction achieves 98.5% accuracy on a dataset with 1.5% fraud — but catches zero fraud. The metric looks excellent while the model is completely worthless for its intended purpose."
          fix="For imbalanced classification problems, never report accuracy as the primary metric. Use ROC-AUC (threshold-independent ranking quality), PR-AUC (especially for severe imbalance), precision and recall at the operating threshold, or F1/F-beta score. Always check the confusion matrix before reporting any metric — it instantly exposes a model that is just predicting the majority class."
        />

        <ErrorBlock
          error="UndefinedMetricWarning: Precision is ill-defined and being set to 0.0 — no predicted samples"
          cause="Your model predicts zero positive cases — every sample is classified as negative. This happens when the classification threshold is too high, the model has very low confidence in all positive predictions, or the training data was too imbalanced and the model learned to always predict the majority class."
          fix="Check predict_proba output: if all probabilities are below 0.5, set zero_division=0 in precision_score to suppress the warning and investigate. Lower the classification threshold. Check if scale_pos_weight (XGBoost) or class_weight='balanced' (sklearn) was set for the imbalanced training data. Add is_unbalance=True (LightGBM) or class_weight='balanced' and verify the model is actually learning a signal."
        />

        <ErrorBlock
          error="ROC-AUC is 0.97 on validation but drops to 0.71 in production"
          cause="There are three common causes: data leakage during training (validation set was contaminated by training statistics — Module 20), temporal leakage (training on future data to predict the past — the fraud patterns changed), or distribution shift (production transactions have a different distribution than training data — different time period, different merchant mix, different fraud patterns)."
          fix="Audit the training pipeline for leakage using the Module 20 checklist. For time-series data (transactions always are), verify you used chronological splits: train on January–October, validate on November, test on December. Monitor the model's AUC in production with a weekly shadow evaluation against labelled samples. When production AUC drops 5+ points, trigger a retraining."
        />

        <ErrorBlock
          error="F1 score of 0.0 despite model having reasonable ROC-AUC"
          cause="F1 score uses the default 0.5 threshold. If your model's predicted probabilities are all below 0.5 (common when the positive class is rare and the model is well-calibrated), the model predicts all negatives at threshold=0.5 and F1 becomes undefined or 0. Meanwhile ROC-AUC correctly reflects that the model's ranking is good."
          fix="Tune the threshold before computing F1. Use the validation set to find the threshold that maximises F1: thresholds = np.arange(0.01, 0.5, 0.01); best_t = max(thresholds, key=lambda t: f1_score(y_val, (val_proba >= t).astype(int))). Apply this threshold when calling predict() and when computing F1 on the test set."
        />
      </div>

      <Div />

      {/* ══ SECTION 9 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can now evaluate any model honestly. Next: are the probabilities
          themselves trustworthy?
        </h2>

        <p style={S.p}>
          ROC-AUC tells you whether the model ranks fraud above legitimate transactions.
          It does not tell you whether the probabilities are accurate.
          A model that says P(fraud) = 0.9 for a transaction — does that mean
          90% of such transactions are actually fraud? Or is the model's
          confidence unreliable?
        </p>

        <p style={S.p}>
          The next module — Calibration — answers this. Calibration curves,
          reliability diagrams, and the two most common miscalibration patterns
          in gradient boosting and neural networks.
          Well-calibrated probabilities are essential for fraud scoring,
          credit decisions, and medical diagnosis where the actual
          probability matters, not just the ranking.
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
              Next — Module 35 · Model Evaluation
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Calibration — Are Your Probabilities Trustworthy?
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Reliability diagrams, Brier score, and Platt scaling vs isotonic
              regression — when your model says 80% fraud, does it mean 80%?
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
          'Accuracy is misleading on imbalanced datasets. A model that predicts the majority class every time achieves 98.5% accuracy on a 1.5% fraud dataset while catching zero fraud. Always check the confusion matrix before reporting any metric.',
          'The confusion matrix has four cells: TP (caught fraud), TN (correctly allowed), FP (false alarm — legit blocked), FN (missed fraud). Every classification metric is a formula combining these four numbers.',
          'Precision = TP/(TP+FP): of all flagged transactions, what fraction were genuinely fraud? Recall = TP/(TP+FN): of all actual fraud, what fraction did we catch? They trade off — raising the threshold increases precision but decreases recall.',
          'ROC-AUC is threshold-independent — it measures how well the model ranks fraud above legitimate across all possible thresholds. AUC = 0.95 means a random fraud transaction scores higher than a random legit transaction 95% of the time.',
          'For severely imbalanced problems (fraud rate < 5%), PR-AUC (area under the precision-recall curve) is more informative than ROC-AUC. ROC-AUC can look excellent even when precision on the minority class is terrible.',
          'The optimal threshold is almost never 0.5. Derive it from the relative business cost of false negatives vs false positives. At Stripe, missing fraud (FN) costs ₹2,500 while a false alarm (FP) costs ₹50 — optimise heavily toward recall by lowering the threshold well below 0.5.',
        ]}
      />
    </LearnLayout>
  )
}