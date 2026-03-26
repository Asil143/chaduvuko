import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Decision Trees — Loan Approval at HDFC — Chaduvuko',
  description:
    'The algorithm that thinks in if-then questions. Gini impurity, information gain, pruning, and why decision trees are the foundation of every ensemble method.',
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

const PROGRESS_TOPICS = [
  { label: 'What',      href: '/learn/ai-ml/classical-ml/what-is-ml',          title: 'What is Machine Learning?',    active: false },
  { label: 'Linear',    href: '/learn/ai-ml/classical-ml/linear-regression',   title: 'Linear Regression',            active: false },
  { label: 'Logistic',  href: '/learn/ai-ml/classical-ml/logistic-regression', title: 'Logistic Regression',          active: false },
  { label: 'Decision',  href: '/learn/ai-ml/classical-ml/decision-trees',      title: 'Decision Trees',               active: true  },
  { label: 'Support',   href: '/learn/ai-ml/classical-ml/svm',                 title: 'Support Vector Machines',      active: false },
  { label: 'K-Nearest', href: '/learn/ai-ml/classical-ml/knn',                 title: 'K-Nearest Neighbours',         active: false },
  { label: 'Naive',     href: '/learn/ai-ml/classical-ml/naive-bayes',         title: 'Naive Bayes',                  active: false },
  { label: 'Random',    href: '/learn/ai-ml/classical-ml/random-forest',       title: 'Random Forest',                active: false },
  { label: 'Gradient',  href: '/learn/ai-ml/classical-ml/gradient-boosting',   title: 'Gradient Boosting',            active: false },
  { label: 'XGBoost',   href: '/learn/ai-ml/classical-ml/xgboost',             title: 'XGBoost',                      active: false },
  { label: 'LightGBM',  href: '/learn/ai-ml/classical-ml/lightgbm',            title: 'LightGBM',                     active: false },
  { label: 'K-Means',   href: '/learn/ai-ml/classical-ml/kmeans-clustering',   title: 'K-Means Clustering',           active: false },
  { label: 'Principal', href: '/learn/ai-ml/classical-ml/pca',                 title: 'Principal Component Analysis', active: false },
]

export default function DecisionTreesPage() {
  return (
    <LearnLayout
      title="Decision Trees — Loan Approval at HDFC"
      description="The algorithm that thinks in if-then questions. Gini impurity, information gain, pruning, and why decision trees are the foundation of every ensemble method."
      section="Classical ML"
      readTime="30–35 min"
      updatedAt="March 2026"
    >
      {/* ── Section progress header ─────────────────────────────────────────── */}
      <div style={{ marginBottom: 40 }}>

        {/* Breadcrumb */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 12, color: 'var(--muted)', marginBottom: 16,
          fontFamily: 'var(--font-mono)',
        }}>
          <a href="/learn/ai-ml" style={{ color: 'var(--muted)', textDecoration: 'none' }}>AI &amp; ML</a>
          <span style={{ color: 'var(--border)' }}>›</span>
          <a href="/learn/ai-ml/classical-ml" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Classical ML</a>
          <span style={{ color: 'var(--border)' }}>›</span>
          <span style={{ color: 'var(--text)' }}>Decision Trees</span>
        </div>

        {/* Section tag */}
        <a href="/learn/ai-ml/classical-ml" style={{ textDecoration: 'none' }}>
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

        {/* Progress strip */}
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
            {PROGRESS_TOPICS.map((topic) => (
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
        <span style={S.tag}>The problem that started everything</span>
        <h2 style={S.h2}>
          It's 2024. You're a new ML engineer at HDFC Bank.
        </h2>

        <p style={S.p}>
          250,000 loan applications come in every month. Each one has an income figure,
          a credit score, an employment status, a debt-to-income ratio, and a dozen
          other fields. A team of credit analysts reviews each application and approves
          or rejects it. The process takes three days per application.
          The bank wants to automate the first pass — flag clear approvals and clear
          rejections automatically, and route only the borderline cases to humans.
        </p>

        <p style={S.p}>
          You could use logistic regression. But your manager asks:
          "When the model rejects someone, can you explain exactly why?"
          Logistic regression gives you a probability — not an explanation a customer
          or a regulator can follow. You need something interpretable.
          Something that says: <em>"rejected because monthly income &lt; ₹35,000
          AND credit score &lt; 650 AND existing EMI &gt; ₹12,000."</em>
        </p>

        <p style={S.p}>
          That is a decision tree. It learns a flowchart of if-then questions from
          your data. Every prediction comes with a traceable path through the tree.
          Every rejection has a human-readable reason. And it takes zero feature
          scaling, handles missing values gracefully, and works on both classification
          and regression problems without changing a single line of code.
        </p>

        <HBox color="#378ADD">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              What this module covers:
            </span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[
              'How a decision tree makes a split — the core mechanic',
              'Gini impurity — the most common splitting criterion',
              'Information gain and entropy — the alternative criterion',
              'Building a tree from scratch in Python',
              'Overfitting — why trees grow too deep',
              'Pruning — max_depth, min_samples_leaf, and ccp_alpha',
              'Regression trees — the same algorithm, different output',
              'sklearn DecisionTreeClassifier — all important parameters',
              'Feature importance from a tree',
              'Why trees are the foundation of Random Forest and XGBoost',
              'Visualising a trained tree',
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
          The running example throughout this module is HDFC loan approval —
          a binary classification problem: approve or reject.
          Every concept is explained on this real business scenario before
          the code appears. By the end you will have a fully interpretable
          tree-based classifier you can explain to a regulator.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — HOW A TREE WORKS ═══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The core idea</span>
        <h2 style={S.h2}>How a decision tree actually works</h2>

        <p style={S.p}>
          A decision tree asks a sequence of yes/no questions about the input features.
          Each question splits the data into two groups. The process repeats inside
          each group until the groups are pure enough — mostly one class —
          or a stopping condition is hit. The result is a tree of decisions
          that ends at leaf nodes containing a class label or a predicted value.
        </p>

        <p style={S.p}>
          The key question is: which feature do you split on, and at what threshold?
          At every node, the tree tries every possible split on every feature
          and picks the one that makes the resulting groups most homogeneous —
          most "pure". Pure means one group is mostly approvals and the other
          is mostly rejections. An impure group is a mix of both.
        </p>

        <VisualBox label="A decision tree for HDFC loan approval — simplified">
          <div style={{ overflowX: 'auto' as const }}>
            <svg width="600" height="280" viewBox="0 0 600 280">
              {/* Root node */}
              <rect x="200" y="10" width="200" height="44" rx="7"
                fill="rgba(55,138,221,0.12)" stroke="#378ADD" strokeWidth="1.5" />
              <text x="300" y="28" textAnchor="middle" fontSize="11"
                fontFamily="monospace" fill="#378ADD" fontWeight="700">
                credit_score ≤ 650?
              </text>
              <text x="300" y="46" textAnchor="middle" fontSize="10"
                fontFamily="monospace" fill="#888">
                samples=10000  gini=0.490
              </text>

              {/* Left branch — YES */}
              <line x1="250" y1="54" x2="130" y2="110" stroke="#555" strokeWidth="1.2" />
              <text x="168" y="88" textAnchor="middle" fontSize="10"
                fontFamily="monospace" fill="#ff4757">Yes</text>

              {/* Right branch — NO */}
              <line x1="350" y1="54" x2="470" y2="110" stroke="#555" strokeWidth="1.2" />
              <text x="432" y="88" textAnchor="middle" fontSize="10"
                fontFamily="monospace" fill="#1D9E75">No</text>

              {/* Left child */}
              <rect x="30" y="110" width="200" height="44" rx="7"
                fill="rgba(55,138,221,0.08)" stroke="#555" strokeWidth="1.2" />
              <text x="130" y="128" textAnchor="middle" fontSize="11"
                fontFamily="monospace" fill="var(--text)">
                monthly_income ≤ 25000?
              </text>
              <text x="130" y="146" textAnchor="middle" fontSize="10"
                fontFamily="monospace" fill="#888">
                samples=4200  gini=0.420
              </text>

              {/* Right child */}
              <rect x="370" y="110" width="200" height="44" rx="7"
                fill="rgba(55,138,221,0.08)" stroke="#555" strokeWidth="1.2" />
              <text x="470" y="128" textAnchor="middle" fontSize="11"
                fontFamily="monospace" fill="var(--text)">
                existing_emi ≤ 15000?
              </text>
              <text x="470" y="146" textAnchor="middle" fontSize="10"
                fontFamily="monospace" fill="#888">
                samples=5800  gini=0.380
              </text>

              {/* Leaf nodes */}
              <line x1="80"  y1="154" x2="60"  y2="210" stroke="#555" strokeWidth="1.2" />
              <line x1="180" y1="154" x2="200" y2="210" stroke="#555" strokeWidth="1.2" />
              <line x1="420" y1="154" x2="400" y2="210" stroke="#555" strokeWidth="1.2" />
              <line x1="520" y1="154" x2="540" y2="210" stroke="#555" strokeWidth="1.2" />

              {[
                { x: 0,   label: 'REJECT', pct: '89%', col: '#ff4757' },
                { x: 150, label: 'REVIEW', pct: '55%', col: '#BA7517' },
                { x: 350, label: 'REVIEW', pct: '48%', col: '#BA7517' },
                { x: 490, label: 'APPROVE', pct: '91%', col: '#1D9E75' },
              ].map((leaf, i) => (
                <g key={i}>
                  <rect x={leaf.x} y="210" width="110" height="44" rx="7"
                    fill={`${leaf.col}15`} stroke={leaf.col} strokeWidth="1.5" />
                  <text x={leaf.x + 55} y="228" textAnchor="middle" fontSize="12"
                    fontFamily="monospace" fill={leaf.col} fontWeight="700">
                    {leaf.label}
                  </text>
                  <text x={leaf.x + 55} y="246" textAnchor="middle" fontSize="10"
                    fontFamily="monospace" fill="#888">
                    {leaf.pct} confidence
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
            Each internal node asks one question. The tree routes each applicant down
            to a leaf that gives the decision and confidence level.
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

np.random.seed(42)
n = 10_000

# ── HDFC loan applicant dataset ────────────────────────────────────────
credit_score    = np.random.randint(300, 900, n)
monthly_income  = np.abs(np.random.normal(55_000, 25_000, n)).clip(8_000, 300_000)
existing_emi    = np.abs(np.random.normal(8_000, 6_000, n)).clip(0, 80_000)
loan_amount     = np.abs(np.random.normal(500_000, 300_000, n)).clip(50_000, 5_000_000)
employment_yrs  = np.abs(np.random.normal(5, 4, n)).clip(0, 35)
loan_to_income  = loan_amount / (monthly_income * 12)

# Approval logic — mirrors real credit scoring
score = (
    (credit_score / 900) * 40          # credit score: 40% weight
    + (monthly_income / 300_000) * 25   # income: 25%
    - (existing_emi / monthly_income) * 20  # EMI burden: -20%
    - (loan_to_income) * 10             # loan-to-income: -10%
    + (employment_yrs / 35) * 5         # employment stability: 5%
    + np.random.randn(n) * 0.05         # noise
)
approved = (score > 0.45).astype(int)

df = pd.DataFrame({
    'credit_score':   credit_score,
    'monthly_income': monthly_income.round(0),
    'existing_emi':   existing_emi.round(0),
    'loan_amount':    loan_amount.round(0),
    'employment_yrs': employment_yrs.round(1),
    'loan_to_income': loan_to_income.round(3),
    'approved':       approved,
})

print(f"Dataset: {len(df):,} applications")
print(f"Approval rate: {approved.mean()*100:.1f}%")
print(df.describe().round(1).to_string())

X = df.drop(columns=['approved'])
y = df['approved']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)
print(f"\nTrain: {len(X_train):,}  Test: {len(X_test):,}")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — GINI IMPURITY ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>How the tree chooses splits</span>
        <h2 style={S.h2}>Gini impurity — measuring how mixed a group is</h2>

        <p style={S.p}>
          Gini impurity measures how often a randomly chosen element from a group
          would be incorrectly labelled if it was randomly labelled according to
          the distribution of labels in that group.
          A perfectly pure group (all one class) has Gini = 0.
          A perfectly mixed group (50% each class) has Gini = 0.5.
          The tree chooses the split that produces the lowest weighted average
          Gini impurity across the two resulting groups.
        </p>

        <VisualBox label="Gini impurity — from 0 (pure) to 0.5 (maximally mixed)">
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { label: 'Pure — all rejected',    approve: 0,   reject: 10, gini: 0.000, color: '#ff4757' },
              { label: 'Mostly rejected',         approve: 2,   reject: 8,  gini: 0.320, color: '#D85A30' },
              { label: 'Maximally mixed',         approve: 5,   reject: 5,  gini: 0.500, color: '#BA7517' },
              { label: 'Mostly approved',         approve: 8,   reject: 2,  gini: 0.320, color: '#1D9E75' },
              { label: 'Pure — all approved',     approve: 10,  reject: 0,  gini: 0.000, color: '#00e676' },
            ].map((item) => (
              <div key={item.label} style={{
                flex: 1, minWidth: 100,
                background: 'var(--surface)', borderRadius: 8,
                padding: '10px 12px', border: `1px solid ${item.color}25`,
              }}>
                <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 8, lineHeight: 1.4 }}>
                  {item.label}
                </div>
                <div style={{ display: 'flex', height: 40, borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
                  <div style={{ flex: item.reject,  background: '#ff475780' }} />
                  <div style={{ flex: item.approve, background: '#1D9E7580' }} />
                </div>
                <div style={{
                  fontSize: 14, fontWeight: 700, color: item.color,
                  fontFamily: 'var(--font-mono)',
                }}>
                  Gini = {item.gini.toFixed(3)}
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 14, padding: '10px 14px', background: 'var(--surface)',
            borderRadius: 7, border: '1px solid var(--border)',
            fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)',
            textAlign: 'center' as const,
          }}>
            Gini(node) = 1 − Σ pᵢ²   where pᵢ = fraction of class i in the node
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np

def gini_impurity(y: np.ndarray) -> float:
    """
    Gini impurity for a node.
    = 1 - sum(p_i^2) for each class i
    = 0 when all samples belong to one class (pure node)
    = 0.5 when samples are split 50/50 (maximally impure, binary case)
    """
    n = len(y)
    if n == 0:
        return 0.0
    classes, counts = np.unique(y, return_counts=True)
    probs   = counts / n
    return 1.0 - np.sum(probs ** 2)

# Verify on HDFC loan scenarios
print("Gini impurity examples:")
scenarios = [
    ("All rejected (pure)",      np.array([0]*100)),
    ("90% rejected",             np.array([0]*90 + [1]*10)),
    ("70% rejected",             np.array([0]*70 + [1]*30)),
    ("50/50 split (max impure)", np.array([0]*50 + [1]*50)),
    ("All approved (pure)",      np.array([1]*100)),
]
for name, y_node in scenarios:
    g = gini_impurity(y_node)
    bar = '█' * int(g * 40)
    print(f"  {name:<30}: {bar} {g:.3f}")

def weighted_gini(y_left: np.ndarray, y_right: np.ndarray) -> float:
    """
    Weighted Gini impurity after a split.
    = (n_left/n_total)*Gini(left) + (n_right/n_total)*Gini(right)
    The tree minimises this across all possible splits.
    """
    n = len(y_left) + len(y_right)
    return (len(y_left)/n)  * gini_impurity(y_left) + \
           (len(y_right)/n) * gini_impurity(y_right)

# Find best split for credit_score on training data
print("\nFinding best credit_score split threshold:")
y_arr     = y_train.values
scores_arr = X_train['credit_score'].values

best_threshold, best_gini = None, np.inf
thresholds = np.unique(scores_arr)[::10]   # sample every 10th unique value

for t in thresholds:
    left  = y_arr[scores_arr <= t]
    right = y_arr[scores_arr >  t]
    if len(left) == 0 or len(right) == 0:
        continue
    wg = weighted_gini(left, right)
    if wg < best_gini:
        best_gini, best_threshold = wg, t

print(f"  Best threshold: credit_score <= {best_threshold}")
print(f"  Weighted Gini:  {best_gini:.4f}")
print(f"  Parent Gini:    {gini_impurity(y_arr):.4f}")
print(f"  Gini reduction: {gini_impurity(y_arr) - best_gini:.4f}")`} />

        <h3 style={S.h3}>Information gain and entropy — the alternative criterion</h3>

        <p style={S.p}>
          Entropy (from information theory — Module 07) measures the same thing
          as Gini but using logarithms. Information gain is the reduction in entropy
          from a split. Both Gini and entropy produce very similar trees in practice.
          Gini is slightly faster to compute (no logarithm). Entropy can sometimes
          produce slightly more balanced trees. sklearn defaults to Gini.
          Use Gini unless you have a specific reason to switch.
        </p>

        <CodeBlock code={`import numpy as np

def entropy(y: np.ndarray) -> float:
    """Shannon entropy. H = -sum(p_i * log2(p_i))"""
    n = len(y)
    if n == 0: return 0.0
    _, counts = np.unique(y, return_counts=True)
    probs = counts / n
    probs = probs[probs > 0]
    return -np.sum(probs * np.log2(probs))

def information_gain(y_parent, y_left, y_right) -> float:
    """IG = H(parent) - weighted_H(children)"""
    n = len(y_parent)
    weighted_child = (
        (len(y_left)  / n) * entropy(y_left) +
        (len(y_right) / n) * entropy(y_right)
    )
    return entropy(y_parent) - weighted_child

y_arr = y_train.values
scores_arr = X_train['credit_score'].values
left  = y_arr[scores_arr <= best_threshold]
right = y_arr[scores_arr >  best_threshold]

print(f"Entropy of parent node:     {entropy(y_arr):.4f} bits")
print(f"Entropy of left child:      {entropy(left):.4f} bits")
print(f"Entropy of right child:     {entropy(right):.4f} bits")
print(f"Information gain:           {information_gain(y_arr, left, right):.4f} bits")

# Gini vs Entropy — comparison on same split
gini_parent = gini_impurity(y_arr)
gini_after  = weighted_gini(left, right)
print(f"\nGini reduction:             {gini_parent - gini_after:.4f}")
print(f"Info gain:                  {information_gain(y_arr, left, right):.4f}")
print("Both criteria select the same split — just different scales")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — BUILD FROM SCRATCH ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Under the hood</span>
        <h2 style={S.h2}>Building a decision tree from scratch</h2>

        <p style={S.p}>
          Building a tree from scratch makes every part of the algorithm visible.
          The recursive structure — split a node, then recursively split each child —
          is why trees are called recursive partitioning algorithms.
          Once you see this implementation, sklearn's API will have no mysteries.
        </p>

        <CodeBlock code={`import numpy as np
from dataclasses import dataclass, field
from typing import Optional

@dataclass
class TreeNode:
    """One node in the decision tree."""
    # Leaf node attributes
    is_leaf:      bool  = False
    prediction:   int   = 0       # class label (leaf only)
    probability:  float = 0.0     # P(class=1) at this leaf

    # Split node attributes
    feature_idx:  int   = 0       # which feature to split on
    threshold:    float = 0.0     # split value: left if x <= threshold
    gini:         float = 0.0     # impurity before split
    n_samples:    int   = 0       # samples reaching this node
    left:  Optional['TreeNode'] = field(default=None)
    right: Optional['TreeNode'] = field(default=None)


class DecisionTreeScratch:
    """
    Binary decision tree classifier built from scratch.
    Splitting criterion: Gini impurity minimisation.
    """

    def __init__(self, max_depth: int = 5, min_samples_leaf: int = 20):
        self.max_depth        = max_depth
        self.min_samples_leaf = min_samples_leaf
        self.root: Optional[TreeNode] = None
        self.feature_names: list = []

    # ── Gini helpers ────────────────────────────────────────────────────
    @staticmethod
    def _gini(y: np.ndarray) -> float:
        if len(y) == 0: return 0.0
        _, counts = np.unique(y, return_counts=True)
        probs = counts / len(y)
        return 1.0 - np.sum(probs ** 2)

    def _best_split(self, X: np.ndarray, y: np.ndarray):
        """Find the feature and threshold that minimises weighted Gini."""
        best_feat, best_thresh, best_gini = None, None, np.inf

        for feat in range(X.shape[1]):
            col        = X[:, feat]
            thresholds = np.unique(col)
            # Sample at most 50 candidate thresholds for speed
            if len(thresholds) > 50:
                thresholds = np.percentile(col, np.linspace(0, 100, 50))

            for t in thresholds:
                left_mask  = col <= t
                right_mask = ~left_mask
                if left_mask.sum() < self.min_samples_leaf:  continue
                if right_mask.sum() < self.min_samples_leaf: continue

                n = len(y)
                wg = (left_mask.sum()/n)  * self._gini(y[left_mask]) + \
                     (right_mask.sum()/n) * self._gini(y[right_mask])

                if wg < best_gini:
                    best_gini  = wg
                    best_feat  = feat
                    best_thresh = t

        return best_feat, best_thresh, best_gini

    def _build(self, X: np.ndarray, y: np.ndarray, depth: int) -> TreeNode:
        node = TreeNode(n_samples=len(y), gini=self._gini(y))
        n_pos = y.sum()
        node.probability  = n_pos / len(y)
        node.prediction   = int(n_pos >= len(y) / 2)

        # Stopping conditions → leaf node
        if (depth >= self.max_depth
                or len(y) < 2 * self.min_samples_leaf
                or self._gini(y) == 0.0):
            node.is_leaf = True
            return node

        feat, thresh, wg = self._best_split(X, y)

        # No valid split found → leaf
        if feat is None:
            node.is_leaf = True
            return node

        node.feature_idx = feat
        node.threshold   = thresh

        mask = X[:, feat] <= thresh
        node.left  = self._build(X[mask],  y[mask],  depth + 1)
        node.right = self._build(X[~mask], y[~mask], depth + 1)
        return node

    def fit(self, X: np.ndarray, y: np.ndarray,
            feature_names: list = None):
        self.feature_names = feature_names or [f'f{i}' for i in range(X.shape[1])]
        self.root = self._build(X, y, depth=0)
        return self

    def _predict_one(self, x: np.ndarray, node: TreeNode) -> float:
        if node.is_leaf:
            return node.probability
        if x[node.feature_idx] <= node.threshold:
            return self._predict_one(x, node.left)
        return self._predict_one(x, node.right)

    def predict_proba(self, X: np.ndarray) -> np.ndarray:
        return np.array([self._predict_one(x, self.root) for x in X])

    def predict(self, X: np.ndarray, threshold: float = 0.5) -> np.ndarray:
        return (self.predict_proba(X) >= threshold).astype(int)

    def score(self, X: np.ndarray, y: np.ndarray) -> float:
        return (self.predict(X) == y).mean()

    def print_tree(self, node: TreeNode = None, depth: int = 0, prefix: str = ''):
        if node is None: node = self.root
        indent = '  ' * depth
        if node.is_leaf:
            cls = 'APPROVE' if node.prediction == 1 else 'REJECT'
            print(f"{indent}{prefix}→ {cls} "
                  f"(p={node.probability:.2f}, n={node.n_samples})")
        else:
            fname = self.feature_names[node.feature_idx]
            print(f"{indent}{prefix}[{fname} <= {node.threshold:.1f}]  "
                  f"gini={node.gini:.3f}  n={node.n_samples}")
            self.print_tree(node.left,  depth+1, 'L ')
            self.print_tree(node.right, depth+1, 'R ')


# ── Train and evaluate ────────────────────────────────────────────────
from sklearn.metrics import classification_report

tree_scratch = DecisionTreeScratch(max_depth=4, min_samples_leaf=50)
tree_scratch.fit(
    X_train.values, y_train.values,
    feature_names=X_train.columns.tolist()
)

print("Decision tree structure:")
tree_scratch.print_tree()
print()

from sklearn.metrics import accuracy_score
y_pred_scratch = tree_scratch.predict(X_test.values)
print(f"From-scratch tree accuracy: {accuracy_score(y_test, y_pred_scratch):.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — OVERFITTING AND PRUNING ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The biggest problem with trees</span>
        <h2 style={S.h2}>Overfitting — why trees grow too deep</h2>

        <p style={S.p}>
          An unconstrained decision tree will grow until every leaf contains
          exactly one training sample — a perfectly pure leaf with zero training
          error. This sounds great until you realise the tree has memorised
          the training set completely. It has learned the noise, the one applicant
          who got approved despite a 400 credit score because the analyst was
          having a good day. That pattern will not generalise.
        </p>

        <p style={S.p}>
          Pruning is the process of limiting tree growth to prevent overfitting.
          There are three main strategies, and sklearn exposes all of them.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              param: 'max_depth',
              type: 'Pre-pruning',
              color: '#378ADD',
              desc: 'Maximum depth the tree is allowed to grow. Depth 1 = one split (stump). Depth 3–6 is usually a good starting range. The most important parameter to tune.',
              default: 'None (unlimited)',
            },
            {
              param: 'min_samples_leaf',
              type: 'Pre-pruning',
              color: '#1D9E75',
              desc: 'Minimum number of samples required at a leaf node. Forces leaves to represent at least this many examples — prevents splitting on noise from tiny groups.',
              default: '1',
            },
            {
              param: 'min_samples_split',
              type: 'Pre-pruning',
              color: '#1D9E75',
              desc: 'Minimum samples required to split a node. A node with fewer samples becomes a leaf automatically regardless of impurity.',
              default: '2',
            },
            {
              param: 'max_features',
              type: 'Pre-pruning',
              color: '#BA7517',
              desc: 'Number of features to consider at each split. Randomising this is the core trick behind Random Forest — each tree sees a random subset of features.',
              default: 'None (all features)',
            },
            {
              param: 'ccp_alpha',
              type: 'Post-pruning',
              color: '#D85A30',
              desc: 'Cost-complexity pruning parameter. After full growth, prune branches whose removal does not significantly increase impurity. Higher alpha = more pruning. Find the optimal value via cross-validation.',
              default: '0.0 (no pruning)',
            },
          ].map((item) => (
            <div key={item.param} style={{
              display: 'grid', gridTemplateColumns: '130px 90px 1fr 100px',
              gap: 12, alignItems: 'start',
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 7, padding: '10px 14px',
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>
                {item.param}
              </span>
              <span style={{
                fontSize: 10, fontFamily: 'var(--font-mono)', color: item.color,
                padding: '2px 6px', borderRadius: 3, background: `${item.color}15`,
                height: 'fit-content',
              }}>
                {item.type}
              </span>
              <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</span>
              <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>
                default: {item.default}
              </span>
            </div>
          ))}
        </div>

        <CodeBlock code={`from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, roc_auc_score
import numpy as np

# ── Demonstrate overfitting as depth increases ────────────────────────
print(f"{'max_depth':<12} {'Train acc':<12} {'Test acc':<12} {'AUC':<10} {'n_leaves'}")
print("─" * 58)

for depth in [1, 2, 3, 4, 5, 7, 10, 15, None]:
    dt = DecisionTreeClassifier(
        max_depth=depth,
        min_samples_leaf=1,
        random_state=42,
    )
    dt.fit(X_train, y_train)
    tr_acc = accuracy_score(y_train, dt.predict(X_train))
    te_acc = accuracy_score(y_test,  dt.predict(X_test))
    auc    = roc_auc_score(y_test, dt.predict_proba(X_test)[:, 1])
    leaves = dt.get_n_leaves()
    gap    = " ← overfit" if tr_acc - te_acc > 0.03 else ""
    print(f"  {str(depth):<10} {tr_acc:<12.4f} {te_acc:<12.4f} {auc:<10.4f} {leaves}{gap}")

# Output pattern:
# depth=1:  train=0.78  test=0.77  — underfitting, too simple
# depth=4:  train=0.89  test=0.88  — good generalisation
# depth=10: train=0.99  test=0.83  — overfitting, memorising noise
# depth=None: train=1.00 test=0.79 — severe overfitting

# ── Cost-complexity pruning — finding optimal ccp_alpha ────────────────
from sklearn.model_selection import cross_val_score

dt_full = DecisionTreeClassifier(random_state=42)
dt_full.fit(X_train, y_train)

# Get the pruning path — effective alphas and corresponding impurities
path = dt_full.cost_complexity_pruning_path(X_train, y_train)
ccp_alphas = path.ccp_alphas[::5]   # sample every 5th value

print(f"\nCCP alpha search ({len(ccp_alphas)} values):")
best_alpha, best_auc = 0.0, 0.0
for alpha in ccp_alphas:
    dt = DecisionTreeClassifier(ccp_alpha=alpha, random_state=42)
    scores = cross_val_score(dt, X_train, y_train, cv=5, scoring='roc_auc')
    mean_auc = scores.mean()
    if mean_auc > best_auc:
        best_auc, best_alpha = mean_auc, alpha
    print(f"  alpha={alpha:.6f}: CV AUC={mean_auc:.4f}")

print(f"\nBest ccp_alpha: {best_alpha:.6f}  (CV AUC={best_auc:.4f})")

# ── Final model with best hyperparameters ──────────────────────────────
final_tree = DecisionTreeClassifier(
    max_depth=5,
    min_samples_leaf=30,
    ccp_alpha=best_alpha,
    random_state=42,
)
final_tree.fit(X_train, y_train)
final_auc = roc_auc_score(y_test, final_tree.predict_proba(X_test)[:, 1])
print(f"\nFinal model — Test AUC: {final_auc:.4f}  "
      f"Leaves: {final_tree.get_n_leaves()}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — FEATURE IMPORTANCE ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What the tree learned</span>
        <h2 style={S.h2}>Feature importance — which inputs drove the decisions</h2>

        <p style={S.p}>
          A decision tree assigns importance to each feature based on how much
          it reduced impurity across all splits where it was used,
          weighted by the number of samples at those nodes.
          Features that appear near the root (early splits) tend to have high
          importance because they affect more samples. Features that only appear
          in deep, small-population splits get low importance.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeClassifier, export_text, plot_tree

# Train final model
dt = DecisionTreeClassifier(max_depth=5, min_samples_leaf=30, random_state=42)
dt.fit(X_train, y_train)

# ── Feature importances ────────────────────────────────────────────────
importances = pd.Series(
    dt.feature_importances_,
    index=X_train.columns
).sort_values(ascending=False)

print("Feature importances (Gini-based):")
for feat, imp in importances.items():
    bar = '█' * int(imp * 50)
    print(f"  {feat:<20}: {bar} {imp:.4f}")

# ── Text representation of the tree ───────────────────────────────────
print("\nTree structure (text):")
print(export_text(dt, feature_names=X_train.columns.tolist(), max_depth=3))

# ── Trace one decision path ────────────────────────────────────────────
# sklearn's decision_path gives the nodes each sample passes through
sample_idx = 0
sample     = X_test.iloc[[sample_idx]]
actual     = y_test.iloc[sample_idx]
pred_proba = dt.predict_proba(sample)[0, 1]
pred_class = dt.predict(sample)[0]

print(f"\nTrace for applicant {sample_idx}:")
print(f"  credit_score:   {sample['credit_score'].values[0]}")
print(f"  monthly_income: ₹{sample['monthly_income'].values[0]:,.0f}")
print(f"  existing_emi:   ₹{sample['existing_emi'].values[0]:,.0f}")
print(f"  Actual:         {'APPROVE' if actual == 1 else 'REJECT'}")
print(f"  Predicted:      {'APPROVE' if pred_class == 1 else 'REJECT'} "
      f"(confidence: {pred_proba:.2%})")

# Decision path node indices
node_indicator = dt.decision_path(sample)
node_ids       = node_indicator.indices
tree_          = dt.tree_
feature        = tree_.feature
threshold      = tree_.threshold
feat_names     = X_train.columns.tolist()

print(f"\n  Decision path ({len(node_ids)-1} splits):")
for node_id in node_ids[:-1]:   # exclude leaf
    feat_idx  = feature[node_id]
    thresh    = threshold[node_id]
    val       = sample.iloc[0, feat_idx]
    direction = "<=" if val <= thresh else ">"
    print(f"    Node {node_id}: {feat_names[feat_idx]} "
          f"({val:.1f}) {direction} {thresh:.1f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — REGRESSION TREES ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Not just classification</span>
        <h2 style={S.h2}>Regression trees — the same algorithm, continuous output</h2>

        <p style={S.p}>
          Decision trees work identically for regression — the only difference
          is in the splitting criterion and the leaf output. Instead of Gini impurity,
          regression trees minimise the mean squared error of predictions within
          each split. Instead of a class label, each leaf outputs the mean target
          value of all training samples that reached it.
        </p>

        <CodeBlock code={`from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import numpy as np

# Regression target: predict exact loan interest rate offered (continuous)
np.random.seed(42)
interest_rate = (
    12.0
    - (X_train['credit_score'] / 900) * 4.0   # better score = lower rate
    + (X_train['loan_to_income']) * 2.0         # higher LTI = higher rate
    + (X_train['existing_emi'] / X_train['monthly_income']) * 3.0
    + np.random.randn(len(X_train)) * 0.5       # noise
).clip(7.5, 18.0)

interest_rate_test = (
    12.0
    - (X_test['credit_score'] / 900) * 4.0
    + (X_test['loan_to_income']) * 2.0
    + (X_test['existing_emi'] / X_test['monthly_income']) * 3.0
    + np.random.randn(len(X_test)) * 0.5
).clip(7.5, 18.0)

# ── DecisionTreeRegressor ─────────────────────────────────────────────
print(f"{'max_depth':<12} {'Train MAE':<13} {'Test MAE':<13} {'Test R²'}")
print("─" * 50)

for depth in [2, 3, 4, 5, 8, None]:
    dtr = DecisionTreeRegressor(
        max_depth=depth,
        min_samples_leaf=30,
        random_state=42,
    )
    dtr.fit(X_train, interest_rate)
    tr_mae = mean_absolute_error(interest_rate,      dtr.predict(X_train))
    te_mae = mean_absolute_error(interest_rate_test, dtr.predict(X_test))
    te_r2  = r2_score(interest_rate_test,            dtr.predict(X_test))
    print(f"  {str(depth):<10} {tr_mae:<13.4f} {te_mae:<13.4f} {te_r2:.4f}")

# Regression tree leaf output = mean target in that leaf
best_reg = DecisionTreeRegressor(max_depth=4, min_samples_leaf=50, random_state=42)
best_reg.fit(X_train, interest_rate)

# Sample prediction with explanation
sample = X_test.iloc[[0]]
rate_pred = best_reg.predict(sample)[0]
print(f"\nPredicted interest rate for applicant 0: {rate_pred:.2f}%")
print(f"Actual interest rate:                    {interest_rate_test.iloc[0]:.2f}%")`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHY TREES ARE THE FOUNDATION ══════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Why this matters beyond the algorithm</span>
        <h2 style={S.h2}>Decision trees are the building block of Random Forest and XGBoost</h2>

        <p style={S.p}>
          A single decision tree overfits. It is also unstable — small changes
          in the training data produce dramatically different trees.
          Both problems were solved by two different ideas that are now
          the dominant algorithms in production tabular ML worldwide.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid rgba(55,138,221,0.3)',
            borderRadius: 10, padding: '16px 18px',
          }}>
            <div style={{
              fontSize: 14, fontWeight: 700, color: '#378ADD',
              fontFamily: 'var(--font-display)', marginBottom: 7,
            }}>
              Random Forest (Module 21)
            </div>
            <p style={{ ...S.ps, marginBottom: 10 }}>
              Train 100–1000 trees, each on a random sample of data
              and a random subset of features. Average their predictions.
              The averaging cancels out individual tree errors — the ensemble
              is far more accurate and stable than any single tree.
            </p>
            <div style={{ fontSize: 11, color: '#378ADD', fontFamily: 'var(--font-mono)' }}>
              Technique: Bagging + random features<br />
              Trees: independent, full depth<br />
              Prediction: average (regression) / vote (classification)
            </div>
          </div>
          <div style={{
            background: 'var(--surface)', border: '1px solid rgba(216,90,48,0.3)',
            borderRadius: 10, padding: '16px 18px',
          }}>
            <div style={{
              fontSize: 14, fontWeight: 700, color: '#D85A30',
              fontFamily: 'var(--font-display)', marginBottom: 7,
            }}>
              XGBoost / LightGBM (Modules 22–23)
            </div>
            <p style={{ ...S.ps, marginBottom: 10 }}>
              Train shallow trees sequentially, each one correcting the errors
              of the previous. The final prediction is the sum of all trees.
              Gradient boosting consistently wins tabular ML benchmarks
              and is the most widely deployed ML algorithm in Indian fintech.
            </p>
            <div style={{ fontSize: 11, color: '#D85A30', fontFamily: 'var(--font-mono)' }}>
              Technique: Boosting + gradient descent<br />
              Trees: shallow (depth 3–6), sequential<br />
              Prediction: sum of all tree outputs
            </div>
          </div>
        </div>

        <HBox color="#378ADD">
          <p style={{ ...S.p, marginBottom: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              The key insight:{' '}
            </span>
            once you understand how a single decision tree chooses splits,
            computes impurity, and makes predictions, Random Forest and XGBoost
            become straightforward — they are just collections of trees
            combined in different ways. The algorithm you built from scratch
            in this module IS the algorithm inside every XGBoost model at
            Razorpay, Zepto, and every Indian unicorn running tabular ML.
          </p>
        </HBox>

        <h3 style={S.h3}>What this looks like at work — day one at HDFC</h3>

        <CodeBlock code={`from sklearn.tree import DecisionTreeClassifier
from sklearn.pipeline import Pipeline
from sklearn.model_selection import GridSearchCV, StratifiedKFold
from sklearn.metrics import classification_report, roc_auc_score
import pandas as pd
import joblib

# ── Day-one task: build an interpretable loan screening model ──────────

# Decision trees need no scaling — direct pipeline
pipe = Pipeline([
    ('model', DecisionTreeClassifier(random_state=42)),
])

# Hyperparameter search
param_grid = {
    'model__max_depth':        [3, 4, 5, 6],
    'model__min_samples_leaf': [20, 30, 50],
    'model__ccp_alpha':        [0.0, 0.0001, 0.001],
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
grid = GridSearchCV(
    pipe, param_grid,
    cv=cv, scoring='roc_auc',
    n_jobs=-1, verbose=0,
)
grid.fit(X_train, y_train)

print(f"Best params: {grid.best_params_}")
print(f"Best CV AUC: {grid.best_score_:.4f}")

# Evaluate on test set
best_model = grid.best_estimator_
y_pred      = best_model.predict(X_test)
y_proba     = best_model.predict_proba(X_test)[:, 1]
test_auc    = roc_auc_score(y_test, y_proba)

print(f"\nTest AUC:  {test_auc:.4f}")
print(f"Test accuracy: {(y_pred == y_test).mean():.4f}")
print("\nClassification report:")
print(classification_report(y_test, y_pred,
                             target_names=['Reject', 'Approve']))

# ── Feature importance report for the risk team ───────────────────────
tree_model = best_model.named_steps['model']
importance_df = pd.DataFrame({
    'feature':    X_train.columns,
    'importance': tree_model.feature_importances_,
}).sort_values('importance', ascending=False)

print("\nFeature importance report (for credit risk team):")
print(importance_df.to_string(index=False))

# ── Save model + decision rules for compliance ─────────────────────────
from sklearn.tree import export_text
rules = export_text(tree_model, feature_names=X_train.columns.tolist())
with open('/tmp/hdfc_loan_rules.txt', 'w') as f:
    f.write(rules)

joblib.dump(best_model, '/tmp/hdfc_loan_tree.pkl')
print("\nModel and decision rules saved for compliance audit.")`} />
      </div>

      <Div />

      {/* ══ SECTION 9 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common decision tree error — explained and fixed</h2>

        <ErrorBlock
          error="Test accuracy is much lower than training accuracy — model is overfitting"
          cause="The tree grew too deep and memorised the training data. An unconstrained decision tree always achieves 100% training accuracy by creating one leaf per sample. High training / low test accuracy is the signature overfitting pattern for trees."
          fix="Set max_depth to a small value (start with 3–5). Increase min_samples_leaf (try 20–50). Use GridSearchCV to find the right combination. Alternatively use ccp_alpha post-pruning: fit the full tree, call cost_complexity_pruning_path(), then cross-validate over the alpha values it returns."
        />

        <ErrorBlock
          error="Feature importances are all concentrated in one feature — other features show 0.0"
          cause="One feature dominates all splits because it perfectly or near-perfectly separates the classes. Other features never get chosen because they cannot improve on that first split. This can also indicate a leaky feature — one that is derived from or highly correlated with the target."
          fix="Check if the dominant feature is leaking target information: compute its correlation with y. If it is above 0.9, investigate whether it is available at prediction time or computed after the event. If legitimate, use max_features to force the tree to consider other features at each split."
        />

        <ErrorBlock
          error="ValueError: Input contains NaN — tree fails on missing values"
          cause="sklearn's DecisionTreeClassifier does not handle missing values natively. Unlike some tree implementations (XGBoost, LightGBM) which have built-in missing value handling, sklearn trees require complete feature matrices."
          fix="Impute missing values before passing to the tree: use SimpleImputer(strategy='median') for numeric columns or SimpleImputer(strategy='most_frequent') for categorical. Place it in a Pipeline before the tree. For production, consider using HistGradientBoostingClassifier which natively handles NaN."
        />

        <ErrorBlock
          error="Tree produces different results each run despite random_state being set"
          cause="random_state is set on the tree but not on the train/test split, cross-validation, or hyperparameter search. The data ordering or fold assignment changes across runs, producing different training sets and therefore different trees."
          fix="Set random_state on every stochastic operation: train_test_split(..., random_state=42), StratifiedKFold(..., random_state=42), GridSearchCV(...). Also ensure the input data is sorted consistently before splitting — shuffled DataFrames with no fixed seed produce different splits."
        />
      </div>

      <Div />

      {/* ══ SECTION 10 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You understand trees. Now watch what happens when you build thousands of them.
        </h2>

        <p style={S.p}>
          A single tree overfits, is unstable, and has high variance.
          The fix — discovered in the 1990s — was to train many trees and combine
          their predictions. Module 21 covers Random Forest: 100–1000 trees,
          each trained on a random sample of data and a random subset of features,
          their predictions averaged into something far more powerful and stable
          than any individual tree.
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
              Next — Classical ML · Module 21
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Random Forest — Zepto Stock Prediction
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Bagging, random feature subsets, out-of-bag evaluation,
              and the feature importance that actually works in production.
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
          'A decision tree recursively partitions the feature space using if-then questions. At each node it tries every feature and every threshold, picking the split that produces the purest child nodes.',
          'Gini impurity = 1 − Σpᵢ². Zero means a node is completely pure (all one class). 0.5 is maximally mixed for binary classification. The tree greedily minimises weighted Gini impurity at every split.',
          'Information gain is the alternative criterion: it measures entropy reduction from a split. Gini and entropy produce nearly identical trees in practice. sklearn defaults to Gini because it is faster to compute (no logarithm).',
          'Unconstrained trees always reach 100% training accuracy by memorising every sample. Control overfitting with max_depth (start at 3–5), min_samples_leaf (try 20–50), and ccp_alpha (post-pruning via cost-complexity path).',
          'Decision trees need no feature scaling — splits are threshold-based and scale-invariant. They also handle mixed numeric and categorical features natively (after encoding) and produce interpretable if-then rules.',
          'Feature importance from a tree = total Gini reduction attributable to each feature across all splits, weighted by samples. Features near the root have high importance because they affect more samples.',
          'Decision trees are the foundation of Random Forest (bagging + random features) and XGBoost/LightGBM (sequential boosting). Understanding one tree completely means understanding the building block of the two most powerful tabular ML algorithms.',
        ]}
      />
    </LearnLayout>
  )
}