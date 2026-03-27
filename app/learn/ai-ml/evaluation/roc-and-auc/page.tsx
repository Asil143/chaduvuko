import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'ROC Curve and AUC — Threshold-Independent Evaluation — Chaduvuko',
  description:
    'What the ROC curve actually measures, why AUC equals a probability, and how to use operating points to choose a threshold for production — built from plain English first.',
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

export default function ROCAndAUCPage() {
  return (
    <LearnLayout
      title="ROC Curve and AUC — Threshold-Independent Evaluation"
      description="What the ROC curve actually measures, why AUC equals a probability, and how to use operating points to choose a threshold for production."
      section="Model Evaluation"
      readTime="25–30 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="evaluation" topic="roc-and-auc" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — what problem does ROC solve?</span>
        <h2 style={S.h2}>
          Precision and recall change every time you move the threshold.
          ROC-AUC gives you one number that works across every threshold at once.
        </h2>

        <p style={S.p}>
          Module 34 showed the fundamental problem: precision and recall depend
          on the threshold you choose. Lower the threshold from 0.5 to 0.3 —
          you catch more fraud (higher recall) but generate more false alarms
          (lower precision). Every threshold gives a different precision/recall pair.
          Which one do you report? Which one do you optimise?
        </p>

        <p style={S.p}>
          The deeper question is: before you even choose a threshold, how good
          is the model's underlying ability to separate fraud from legitimate
          transactions? If the model's scores completely overlap — fraud transactions
          score 0.4–0.6 and legitimate transactions also score 0.4–0.6 —
          no threshold will produce a useful classifier. If fraud scores 0.7–0.9
          and legitimate scores 0.1–0.3, any reasonable threshold works perfectly.
        </p>

        <p style={S.p}>
          The ROC curve answers this question. It plots how the true positive rate
          and false positive rate trade off as you sweep the threshold from 1.0
          down to 0.0 — across every possible threshold simultaneously.
          The AUC (area under that curve) collapses this into one number
          that describes the model's separability regardless of any threshold choice.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Imagine 100 CRED loan applicants — 10 will default, 90 will not.
            You line them up ordered by your model's default score, highest first.
            The ROC curve asks: as you walk down the line and draw a threshold
            between each pair of adjacent applicants, what fraction of the 10
            defaulters have you caught so far (TPR), and what fraction of the
            90 non-defaulters have you incorrectly included (FPR)?
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            If your model is perfect, all 10 defaulters appear at the top of the
            list before any non-defaulter. TPR reaches 1.0 while FPR is still 0.0 —
            a curve that hugs the top-left corner. AUC = 1.0.
            If your model is random, defaulters and non-defaulters are scattered
            randomly — TPR and FPR increase at the same rate. AUC = 0.5.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          AUC has the most intuitive interpretation in all of evaluation metrics:
          it equals the probability that the model assigns a higher score to a
          randomly chosen positive than to a randomly chosen negative.
          AUC = 0.92 means: pick one random fraud transaction and one random
          legitimate transaction — there is a 92% chance the model scored
          the fraud transaction higher. This requires zero threshold decisions.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — BUILDING THE ROC CURVE ═════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>How the ROC curve is constructed</span>
        <h2 style={S.h2}>Building the curve from scratch — every threshold, one point</h2>

        <p style={S.p}>
          The ROC curve is constructed by sweeping the classification threshold
          from 1.0 (predict everything negative) down to 0.0 (predict everything positive).
          At each threshold you compute TPR and FPR and plot one point.
          Connect all points and you have the ROC curve.
        </p>

        <VisualBox label="Constructing the ROC curve — step by step on 10 predictions">
          <div style={{ overflowX: 'auto' as const }}>
            <table style={{ borderCollapse: 'collapse' as const, width: '100%', fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Rank', 'Score', 'True label', 'Threshold here', 'TPR', 'FPR', 'ROC point'].map(h => (
                    <th key={h} style={{
                      padding: '8px 12px', textAlign: 'left' as const,
                      fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                      fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['1', '0.95', '✓ fraud',  '≥0.95', '1/4=0.25', '0/6=0.00', '(0.00, 0.25)'],
                  ['2', '0.88', '✓ fraud',  '≥0.88', '2/4=0.50', '0/6=0.00', '(0.00, 0.50)'],
                  ['3', '0.81', '✗ legit',  '≥0.81', '2/4=0.50', '1/6=0.17', '(0.17, 0.50)'],
                  ['4', '0.74', '✓ fraud',  '≥0.74', '3/4=0.75', '1/6=0.17', '(0.17, 0.75)'],
                  ['5', '0.68', '✗ legit',  '≥0.68', '3/4=0.75', '2/6=0.33', '(0.33, 0.75)'],
                  ['6', '0.55', '✓ fraud',  '≥0.55', '4/4=1.00', '2/6=0.33', '(0.33, 1.00)'],
                  ['7', '0.42', '✗ legit',  '≥0.42', '4/4=1.00', '3/6=0.50', '(0.50, 1.00)'],
                  ['8', '0.31', '✗ legit',  '≥0.31', '4/4=1.00', '4/6=0.67', '(0.67, 1.00)'],
                  ['9', '0.20', '✗ legit',  '≥0.20', '4/4=1.00', '5/6=0.83', '(0.83, 1.00)'],
                  ['10','0.09', '✗ legit',  '≥0.09', '4/4=1.00', '6/6=1.00', '(1.00, 1.00)'],
                ].map((row, i) => (
                  <tr key={i} style={{
                    borderBottom: '1px solid var(--border)',
                    background: row[2].includes('fraud') ? 'rgba(0,230,118,0.04)' : 'transparent',
                  }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{
                        padding: '7px 12px',
                        color: j === 2
                          ? (cell.includes('fraud') ? '#1D9E75' : '#D85A30')
                          : j === 6 ? '#378ADD' : 'var(--muted)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 12 }}>
            4 actual fraud cases, 6 legitimate. Each row: lower the threshold by one rank,
            add that prediction, recompute TPR and FPR. The rightmost column is one point
            on the ROC curve. Connect all 10 points — that is the ROC curve.
          </p>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.metrics import roc_curve, auc

# ── Manual ROC curve construction — every step visible ─────────────────
y_true  = np.array([1, 1, 0, 1, 0, 1, 0, 0, 0, 0])
y_score = np.array([0.95, 0.88, 0.81, 0.74, 0.68,
                    0.55, 0.42, 0.31, 0.20, 0.09])

n_pos = y_true.sum()        # 4 actual fraud cases
n_neg = (1 - y_true).sum()  # 6 actual legit cases

print("Building ROC curve manually:")
print(f"{'Threshold':>12} {'TP':>5} {'FP':>5} {'TPR':>8} {'FPR':>8} {'Point'}")
print("─" * 58)

# Sort by score descending — walk from high threshold to low
order       = np.argsort(y_score)[::-1]
y_sorted    = y_true[order]
score_sorted = y_score[order]

roc_points = [(0.0, 0.0)]   # start at origin
tp, fp = 0, 0
for i, (label, score) in enumerate(zip(y_sorted, score_sorted)):
    if label == 1:
        tp += 1
    else:
        fp += 1
    tpr = tp / n_pos
    fpr = fp / n_neg
    roc_points.append((fpr, tpr))
    print(f"  t≥{score:.2f}     {tp:>5} {fp:>5} {tpr:>8.3f} {fpr:>8.3f}  ({fpr:.2f}, {tpr:.2f})")

# ── AUC using the trapezoid rule ───────────────────────────────────────
fprs = [p[0] for p in roc_points]
tprs = [p[1] for p in roc_points]

# Trapezoid rule: sum of (width × average height) for each step
manual_auc = sum(
    (fprs[i+1] - fprs[i]) * (tprs[i+1] + tprs[i]) / 2
    for i in range(len(fprs) - 1)
)
print(f"\nManual AUC (trapezoid rule): {manual_auc:.4f}")

# ── sklearn verification ───────────────────────────────────────────────
fpr_sk, tpr_sk, thresholds_sk = roc_curve(y_true, y_score)
auc_sk = auc(fpr_sk, tpr_sk)
print(f"sklearn AUC:                 {auc_sk:.4f}  ← matches")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — THE PROBABILISTIC INTERPRETATION ═══════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most important insight about AUC</span>
        <h2 style={S.h2}>AUC = P(score of random positive &gt; score of random negative)</h2>

        <p style={S.p}>
          The probabilistic interpretation of AUC is not just a nice fact —
          it is the most practically useful way to understand and communicate
          model quality. It requires no threshold, no class imbalance adjustment,
          and no domain knowledge to interpret.
        </p>

        <p style={S.p}>
          It means you can directly answer the question: "if I show this model
          one fraud transaction and one legitimate transaction, what is the
          probability it will rank the fraud higher?" For Razorpay's fraud model
          with AUC = 0.94, the answer is 94%. This is the number you put
          in the model card, the slide deck, and the RBI audit report.
        </p>

        <ConceptBox title="Proving the probabilistic interpretation — counting concordant pairs">
          <p style={{ ...S.ps, marginBottom: 10 }}>
            A concordant pair is a (positive, negative) pair where the model
            correctly scores the positive higher. A discordant pair is one
            where the negative scores higher. AUC equals the fraction of all
            possible positive-negative pairs that are concordant.
            This is the Mann-Whitney U statistic — a non-parametric test
            that predates ROC analysis by decades.
          </p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2, color: 'var(--muted)' }}>
            <div style={{ color: '#1D9E75' }}>
              AUC = (concordant pairs + 0.5 × tied pairs) / (n_pos × n_neg)
            </div>
            <div>concordant: score(positive) {'>'} score(negative)</div>
            <div>discordant: score(positive) {'<'} score(negative)</div>
            <div>tied:       score(positive) = score(negative)</div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
from sklearn.metrics import roc_auc_score

np.random.seed(42)
n_pos, n_neg = 200, 800   # CRED loan dataset: 20% default rate

# Simulate model scores
pos_scores = np.random.beta(5, 2, n_pos)   # defaulters score higher
neg_scores = np.random.beta(2, 5, n_neg)   # non-defaulters score lower

y_true  = np.array([1]*n_pos + [0]*n_neg)
y_score = np.concatenate([pos_scores, neg_scores])

# ── Method 1: sklearn ──────────────────────────────────────────────────
auc_sklearn = roc_auc_score(y_true, y_score)

# ── Method 2: probabilistic — count concordant pairs ──────────────────
concordant = 0
discordant = 0
tied       = 0

# Sample 10,000 random pairs for speed (exact needs n_pos × n_neg pairs)
np.random.seed(0)
n_pairs = 10_000
pos_sample = np.random.choice(pos_scores, n_pairs)
neg_sample = np.random.choice(neg_scores, n_pairs)

concordant = (pos_sample > neg_sample).sum()
discordant = (pos_sample < neg_sample).sum()
tied       = (pos_sample == neg_sample).sum()

auc_manual = (concordant + 0.5 * tied) / n_pairs

print(f"AUC (sklearn):               {auc_sklearn:.4f}")
print(f"AUC (concordant pairs):      {auc_manual:.4f}  ← same interpretation")
print(f"\nConcordant pairs: {concordant:,}/{n_pairs:,} ({concordant/n_pairs*100:.1f}%)")
print(f"Discordant pairs: {discordant:,}/{n_pairs:,} ({discordant/n_pairs*100:.1f}%)")
print(f"Tied pairs:       {tied:,}/{n_pairs:,}")
print(f"\nInterpretation: if you pick one random defaulter and one random")
print(f"non-defaulter, the model ranks the defaulter higher {auc_sklearn*100:.1f}% of the time.")

# ── AUC on different datasets — what the numbers mean in practice ──────
print("\nAUC benchmarks by domain:")
benchmarks = [
    ('Fraud detection (Razorpay)',    0.94, 'Production quality'),
    ('Credit scoring (CRED)',         0.88, 'Good, acceptable'),
    ('Churn prediction (Swiggy)',     0.81, 'Fair, investigate features'),
    ('Random model (baseline)',       0.50, 'No signal at all'),
    ('Reverse model (worse than rnd)',0.30, 'AUC < 0.5 — flip predictions'),
]
for name, auc_val, verdict in benchmarks:
    bar = '█' * int(auc_val * 30)
    print(f"  {name:<35}: {bar:<30} {auc_val:.2f}  {verdict}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — ROC VS PR CURVE ═════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>When ROC-AUC misleads you</span>
        <h2 style={S.h2}>ROC-AUC vs PR-AUC — which to use and when</h2>

        <p style={S.p}>
          ROC-AUC has a critical weakness on severely imbalanced datasets.
          When the negative class is 99× larger than the positive class,
          a huge number of true negatives make FPR look small even when
          the model generates enormous absolute numbers of false positives.
          The ROC curve looks excellent while the precision is terrible.
        </p>

        <p style={S.p}>
          The Precision-Recall curve is immune to this. It never looks at
          true negatives at all — it only measures how well the model
          finds the positive class. For fraud detection (1–2% fraud),
          disease diagnosis (1% positive), and any severely imbalanced problem,
          PR-AUC is the more honest metric.
        </p>

        <VisualBox label="ROC vs PR — same model, same data, different story">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              {
                title: 'ROC Curve — looks excellent',
                color: '#1D9E75',
                subtitle: 'AUC = 0.97 — "great model!"',
                note: 'Large TN count makes FPR look tiny even with many FPs. Optimistic on imbalanced data.',
                xLabel: 'FPR (False Positive Rate) →',
                yLabel: 'TPR (Recall) ↑',
                curve: 'M 35 175 Q 50 80 90 50 Q 130 30 175 25',
                diagColor: '#444',
              },
              {
                title: 'PR Curve — reveals the truth',
                color: '#D85A30',
                subtitle: 'AP = 0.41 — "poor precision!"',
                note: 'No TN in formula — shows that at high recall, precision collapses. Honest on imbalanced data.',
                xLabel: 'Recall →',
                yLabel: 'Precision ↑',
                curve: 'M 35 55 Q 80 70 120 110 Q 150 140 175 170',
                diagColor: '#444',
              },
            ].map((item) => (
              <div key={item.title}>
                <div style={{ fontSize: 11, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                  {item.subtitle}
                </div>
                <svg width="100%" viewBox="0 0 210 200">
                  <line x1="30" y1="180" x2="180" y2="180" stroke="#555" strokeWidth="1" />
                  <line x1="30" y1="20"  x2="30"  y2="180" stroke="#555" strokeWidth="1" />
                  <text x="105" y="197" textAnchor="middle" fontSize="8" fill="#888" fontFamily="monospace">{item.xLabel}</text>
                  <text x="10" y="100" fontSize="8" fill="#888" fontFamily="monospace" transform="rotate(-90,10,100)">{item.yLabel}</text>
                  <line x1="30" y1="180" x2="180" y2="20" stroke={item.diagColor} strokeWidth="1" strokeDasharray="4,3" />
                  <path d={item.curve} fill="none" stroke={item.color} strokeWidth="2.5" />
                  <text x="175" y="20" fontSize="8" fill={item.color} fontFamily="monospace" textAnchor="end">ideal: top-left</text>
                </svg>
                <p style={{ ...S.ps, marginBottom: 0, fontSize: 11 }}>{item.note}</p>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.metrics import (roc_auc_score, average_precision_score,
                              roc_curve, precision_recall_curve)
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)

# ── Demonstrate ROC vs PR on severely imbalanced data ──────────────────
# 0.5% fraud rate — extreme imbalance
n = 20_000
X = np.random.randn(n, 8)
# Fraud: only 100 cases out of 20,000 (0.5%)
y = np.zeros(n, dtype=int)
fraud_idx = np.random.choice(n, 100, replace=False)
y[fraud_idx] = 1
# Add some signal
X[fraud_idx, 0] += 2.5
X[fraud_idx, 1] += 1.8

X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)
sc = StandardScaler()
model = GradientBoostingClassifier(
    n_estimators=200, learning_rate=0.1, max_depth=3,
    subsample=0.8, random_state=42,
    scale_pos_weight=None,
)
model.fit(sc.fit_transform(X_tr), y_tr)
y_prob = model.predict_proba(sc.transform(X_te))[:, 1]

roc_auc = roc_auc_score(y_te, y_prob)
pr_auc  = average_precision_score(y_te, y_prob)
base_pr = y_te.mean()   # PR-AUC baseline = fraud rate

print(f"Dataset: {y_te.sum()} fraud / {(y_te==0).sum()} legit ({y_te.mean()*100:.1f}% fraud)")
print(f"\nROC-AUC:  {roc_auc:.4f}  ← looks great")
print(f"PR-AUC:   {pr_auc:.4f}  ← reveals poor precision at high recall")
print(f"PR base:  {base_pr:.4f}  ← random model PR-AUC (= fraud rate)")
print(f"PR skill: {(pr_auc - base_pr)/(1 - base_pr):.4f}  ← normalised PR improvement")

# ── Precision at specific recall levels ───────────────────────────────
prec, rec, thresh = precision_recall_curve(y_te, y_prob)

print(f"\nPrecision at specific recall levels (what matters for ops):")
for target_recall in [0.90, 0.80, 0.70, 0.60, 0.50]:
    idx     = np.argmin(np.abs(rec - target_recall))
    print(f"  At recall={target_recall:.0%}: precision={prec[idx]:.3f}  "
          f"threshold={thresh[idx] if idx < len(thresh) else 'n/a':.3f}  "
          f"({prec[idx]*100:.1f}% of flagged are genuine fraud)")

# ── Decision guide ─────────────────────────────────────────────────────
print(f"\nWhen to use which:")
print(f"  ROC-AUC: balanced classes, ranking quality, model comparison")
print(f"  PR-AUC:  imbalanced classes (<10% positive), precision matters")
print(f"  Both:    always report both — they capture different aspects")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — OPERATING POINT SELECTION ══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>From curve to decision</span>
        <h2 style={S.h2}>Choosing an operating point — where on the ROC curve should you sit?</h2>

        <p style={S.p}>
          The ROC curve gives you all possible operating points.
          Choosing which point to operate at is a business decision,
          not a modelling decision. The right point depends on the
          cost ratio between false negatives and false positives,
          the operational capacity of your review team, and regulatory requirements.
        </p>

        <p style={S.p}>
          Three systematic methods for choosing an operating point,
          each appropriate for different situations:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              method: 'Youden Index',
              formula: 'J = TPR − FPR  →  find max J',
              color: '#1D9E75',
              when: 'When you have no cost information — maximises the balanced distance from the random baseline.',
              limit: 'Treats FP and FN as equally costly — rarely true in practice.',
            },
            {
              method: 'Cost-minimising threshold',
              formula: 'Cost = FN × cost_FN + FP × cost_FP  →  find min cost',
              color: '#378ADD',
              when: 'When you know the relative cost of each error type. Razorpay: cost_FN=₹2500 (missed fraud), cost_FP=₹50 (friction). Most situations.',
              limit: 'Requires knowing business costs explicitly. Cost estimates may themselves be uncertain.',
            },
            {
              method: 'Fixed recall constraint',
              formula: 'Find threshold where TPR ≥ target_recall',
              color: '#D85A30',
              when: 'When a regulator or business sets a minimum recall requirement. e.g. "catch at least 90% of all fraud no matter what."',
              limit: 'May force very low precision — many false alarms. Secondary optimisation needed.',
            },
          ].map((item) => (
            <div key={item.method} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '13px 16px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)' }}>
                  {item.method}
                </span>
                <span style={{
                  fontSize: 11, fontFamily: 'var(--font-mono)', color: item.color,
                  background: `${item.color}15`, padding: '2px 8px', borderRadius: 3,
                }}>
                  {item.formula}
                </span>
              </div>
              <p style={{ ...S.ps, marginBottom: 4 }}>{item.when}</p>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>
                Limitation: {item.limit}
              </div>
            </div>
          ))}
        </div>

        <CodeBlock code={`import numpy as np
from sklearn.metrics import roc_curve, roc_auc_score
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 10_000

# Razorpay fraud dataset
amount        = np.abs(np.random.normal(1200, 2000, n)).clip(10, 50_000)
merchant_risk = np.random.uniform(0, 1, n)
n_tx_hour     = np.random.randint(0, 20, n).astype(float)
device_age    = np.abs(np.random.normal(200, 150, n)).clip(0, 1000)
is_new_device = np.random.randint(0, 2, n).astype(float)
fraud_score   = (
    (amount/50_000)*0.30 + merchant_risk*0.25
    + (n_tx_hour/20)*0.25 + is_new_device*0.15
    + np.random.randn(n)*0.05
)
y = (fraud_score > 0.55).astype(int)
X = np.column_stack([amount, merchant_risk, n_tx_hour, device_age, is_new_device])

X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)
sc      = StandardScaler()
X_tr_sc = sc.fit_transform(X_tr)
X_te_sc = sc.transform(X_te)

# Use validation split for threshold selection
X_tv, X_val, y_tv, y_val = train_test_split(
    X_tr_sc, y_tr, test_size=0.2, stratify=y_tr, random_state=42
)
model = GradientBoostingClassifier(
    n_estimators=200, learning_rate=0.1, max_depth=3,
    subsample=0.8, random_state=42,
)
model.fit(X_tv, y_tv)
val_prob = model.predict_proba(X_val)[:, 1]

fpr, tpr, thresholds = roc_curve(y_val, val_prob)

# ── Method 1: Youden Index ─────────────────────────────────────────────
youden     = tpr - fpr
best_idx_j = np.argmax(youden)
t_youden   = thresholds[best_idx_j]
print(f"Method 1 — Youden Index:")
print(f"  Best threshold: {t_youden:.3f}")
print(f"  TPR={tpr[best_idx_j]:.3f}  FPR={fpr[best_idx_j]:.3f}  J={youden[best_idx_j]:.3f}")

# ── Method 2: Cost minimisation ────────────────────────────────────────
cost_fn = 2500   # ₹ cost of missing one fraud
cost_fp = 50     # ₹ cost of one false alarm

n_pos = y_val.sum()
n_neg = (1 - y_val).sum()

costs = []
for t, tp_rate, fp_rate in zip(thresholds, tpr, fpr):
    fn  = n_pos * (1 - tp_rate)   # false negatives
    fp  = n_neg * fp_rate          # false positives
    costs.append(fn * cost_fn + fp * cost_fp)

best_idx_cost = np.argmin(costs)
t_cost        = thresholds[best_idx_cost]
print(f"\nMethod 2 — Cost minimisation (FN=₹{cost_fn}, FP=₹{cost_fp}):")
print(f"  Best threshold: {t_cost:.3f}")
print(f"  TPR={tpr[best_idx_cost]:.3f}  FPR={fpr[best_idx_cost]:.3f}  Cost=₹{min(costs):,.0f}")

# ── Method 3: Fixed recall constraint ─────────────────────────────────
target_recall  = 0.90
recall_thresh_idx = np.argmin(np.abs(tpr - target_recall))
t_recall       = thresholds[recall_thresh_idx]
print(f"\nMethod 3 — Fixed recall constraint (TPR ≥ {target_recall:.0%}):")
print(f"  Best threshold: {t_recall:.3f}")
print(f"  TPR={tpr[recall_thresh_idx]:.3f}  FPR={fpr[recall_thresh_idx]:.3f}")

# ── Final evaluation on test set ──────────────────────────────────────
test_prob = model.predict_proba(X_te_sc)[:, 1]
print(f"\nTest set AUC: {roc_auc_score(y_te, test_prob):.4f}")
print(f"\nComparison at each threshold on test set:")
print(f"{'Method':<28} {'Threshold':>10} {'TPR':>7} {'FPR':>7} {'Cost ₹':>10}")
print("─" * 67)

for name, t in [('Youden Index',    t_youden),
                 ('Cost-minimising', t_cost),
                 ('90% recall fix',  t_recall)]:
    pred  = (test_prob >= t).astype(int)
    tp    = ((pred == 1) & (y_te == 1)).sum()
    fp    = ((pred == 1) & (y_te == 0)).sum()
    fn    = ((pred == 0) & (y_te == 1)).sum()
    tpr_t = tp / y_te.sum()
    fpr_t = fp / (y_te == 0).sum()
    cost  = fn * cost_fn + fp * cost_fp
    print(f"  {name:<26}  {t:>10.3f}  {tpr_t:>7.3f}  {fpr_t:>7.3f}  {cost:>10,.0f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — MULTI-CLASS ROC ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Beyond binary classification</span>
        <h2 style={S.h2}>Multi-class AUC — OvR and OvO strategies</h2>

        <p style={S.p}>
          ROC-AUC extends to multi-class problems via two strategies.
          One-vs-Rest (OvR) computes one ROC curve per class treating
          it as the positive class against all others combined.
          One-vs-One (OvO) computes one ROC curve for every pair of classes.
          Both produce a single aggregate AUC via averaging.
        </p>

        <CodeBlock code={`import numpy as np
from sklearn.metrics import roc_auc_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, label_binarize
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 4000

# Swiggy support ticket categories: 4 classes
X = np.random.randn(n, 10)
y = np.random.choice([0, 1, 2, 3], n, p=[0.40, 0.25, 0.20, 0.15])
classes = ['delivery', 'food_quality', 'payment', 'general']

# Add signal
for cls in range(4):
    X[y == cls, cls] += 2.5

X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)
sc = StandardScaler()
model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
model.fit(sc.fit_transform(X_tr), y_tr)
y_prob = model.predict_proba(sc.transform(X_te))

# ── Multi-class AUC — two strategies ─────────────────────────────────
# OvR: one AUC per class vs all others (macro average)
auc_ovr_macro    = roc_auc_score(y_te, y_prob, multi_class='ovr',  average='macro')
auc_ovr_weighted = roc_auc_score(y_te, y_prob, multi_class='ovr',  average='weighted')

# OvO: one AUC per class pair (all n×(n-1)/2 pairs)
auc_ovo_macro    = roc_auc_score(y_te, y_prob, multi_class='ovo',  average='macro')
auc_ovo_weighted = roc_auc_score(y_te, y_prob, multi_class='ovo',  average='weighted')

print("Multi-class AUC:")
print(f"  OvR macro:    {auc_ovr_macro:.4f}  (unweighted mean per class)")
print(f"  OvR weighted: {auc_ovr_weighted:.4f}  (weighted by class frequency)")
print(f"  OvO macro:    {auc_ovo_macro:.4f}  (unweighted mean per class pair)")
print(f"  OvO weighted: {auc_ovo_weighted:.4f}  (weighted by pair frequency)")

# ── Per-class AUC ─────────────────────────────────────────────────────
y_bin = label_binarize(y_te, classes=list(range(4)))
print(f"\nPer-class AUC (OvR):")
for i, cls in enumerate(classes):
    auc_i = roc_auc_score(y_bin[:, i], y_prob[:, i])
    bar   = '█' * int(auc_i * 30)
    print(f"  {cls:<14}: {bar:<30} {auc_i:.4f}")

# ── Which to use? ─────────────────────────────────────────────────────
print(f"\nOvR vs OvO guidance:")
print(f"  OvR:  each class vs all others — faster, standard default")
print(f"  OvO:  each pair of classes — less influenced by class imbalance")
print(f"  macro:    treat all classes equally — use when minority class matters")
print(f"  weighted: weight by support — use for overall performance summary")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common ROC-AUC mistake — explained and fixed</h2>

        <ErrorBlock
          error="AUC = 0.50 on the test set but model trains perfectly — AUC on training is 0.98"
          cause="Classic data leakage or label leakage. The model memorised a feature that directly encodes the label — a timestamp, a transaction ID sequence, a derived feature computed using the label. Or the test set has a completely different distribution from training (temporal split missing). AUC collapses to 0.5 when the model has no valid signal on new data."
          fix="Remove any feature that could directly or indirectly encode the label. Check feature correlations with y — any feature with correlation above 0.9 is suspicious. Use chronological splits for time-series data. Run the model with randomly shuffled labels — if AUC is still high, a feature is leaking. Audit the preprocessing pipeline for fit-before-split mistakes from Module 20."
        />

        <ErrorBlock
          error="roc_auc_score raises ValueError: Only one class present in y_true"
          cause="The test split contains only one class — either all positive or all negative. This happens on very small datasets or severely imbalanced classes where a random split puts all minority-class examples in one split. With only one class, TPR and FPR cannot both be computed — the ROC curve is undefined."
          fix="Always use stratify=y in train_test_split: train_test_split(X, y, stratify=y). This guarantees both classes appear in every split. For extremely rare classes (less than 10 positive examples total), you may not have enough data for a reliable held-out test set — use cross-validation instead: cross_val_score(model, X, y, cv=StratifiedKFold(5), scoring='roc_auc')."
        />

        <ErrorBlock
          error="AUC is high (0.92) but the model is useless at the operating threshold — precision is 2%"
          cause="AUC measures ranking quality across all thresholds equally, including thresholds that are operationally meaningless. With 0.1% fraud rate, even a good model may have very low precision at the threshold where you would actually operate (e.g. flagging 5% of transactions for review). The AUC averages over all thresholds including high-recall-zero-precision regions."
          fix="Always inspect the PR curve and precision at your actual operating recall level. A model with AUC=0.92 but precision=2% at 80% recall means 98% of flagged transactions are false alarms — operationally unworkable. Use PR-AUC as primary metric for severely imbalanced problems. Report precision at your target recall (e.g. precision@80%recall) alongside AUC."
        />

        <ErrorBlock
          error="roc_auc_score gives different result from manually computed AUC using numpy trapz"
          cause="sklearn's roc_curve returns FPR/TPR values at the actual threshold points — it uses the exact trapezoidal rule on these points. If you manually compute the curve with a different set of threshold values (e.g. np.linspace(0, 1, 100)), you get a coarser approximation that may differ from sklearn's exact computation, especially when the curve has sharp bends."
          fix="Always use sklearn's roc_curve output directly: fpr, tpr, _ = roc_curve(y_true, y_score); auc_val = auc(fpr, tpr). Never manually construct threshold arrays for AUC computation — sklearn uses all unique score values as thresholds, giving the exact AUC. Manual linspace grids miss critical threshold points and produce approximation errors."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can evaluate any model at any threshold. Next: does your evaluation
          generalise — or did you get lucky on this particular test set?
        </h2>

        <p style={S.p}>
          ROC-AUC on a single test split gives one number. But how stable is it?
          A different random seed for the split might give AUC = 0.91 instead of 0.94.
          Cross-validation gives you a distribution of AUC scores across multiple
          non-overlapping test sets — mean and standard deviation — so you can
          report confidence intervals, not just point estimates.
          Module 37 covers cross-validation, the bias-variance tradeoff,
          and how to use them together to make model comparisons statistically rigorous.
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
              Next — Module 37 · Model Evaluation
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Cross-Validation and the Bias-Variance Tradeoff
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              From point estimates to confidence intervals. K-fold, stratified,
              and repeated CV — and when the bias-variance tradeoff determines
              which model to choose.
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
          'The ROC curve plots TPR (recall) against FPR as the classification threshold sweeps from 1.0 to 0.0. Each threshold produces one point on the curve. AUC is the area under that curve — a single number summarising model quality across every possible threshold.',
          'AUC has a clean probabilistic interpretation: it equals the probability that the model assigns a higher score to a randomly chosen positive than to a randomly chosen negative. AUC = 0.94 means a random fraud transaction scores higher than a random legitimate one 94% of the time.',
          'ROC-AUC is optimistic on severely imbalanced datasets. A large pool of true negatives makes FPR look tiny even with many absolute false positives. For fraud rates below 5%, use PR-AUC (average precision) as the primary metric — it ignores true negatives entirely.',
          'Choosing an operating point on the ROC curve is a business decision, not a modelling decision. Three methods: Youden Index (max TPR − FPR, equal error cost), cost minimisation (explicit FN and FP costs), or fixed recall constraint (regulatory minimum catch rate).',
          'For multi-class problems use roc_auc_score with multi_class="ovr" (One-vs-Rest) or "ovo" (One-vs-One). Use average="macro" when all classes matter equally, average="weighted" for an overall performance summary weighted by class frequency.',
          'Never use a manually constructed threshold grid (np.linspace) to compute AUC — always use sklearn\'s roc_curve output directly with the auc() function. Manual grids miss critical threshold points and produce approximation errors.',
        ]}
      />
    </LearnLayout>
  )
}
