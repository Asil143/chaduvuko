import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Support Vector Machines — Chaduvuko',
  description:
    'The algorithm that finds the widest possible boundary between classes. Margins, support vectors, the kernel trick, and when SVMs still beat neural networks.',
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

function ConceptBox({ title, children, color = '#378ADD' }: {
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

export default function SVMPage() {
  return (
    <LearnLayout
      title="Support Vector Machines"
      description="The algorithm that finds the widest possible boundary between classes. Margins, support vectors, the kernel trick, and when SVMs still beat neural networks."
      section="Classical ML"
      readTime="26–34 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="classical-ml" topic="svm" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — what problem does this solve?</span>
        <h2 style={S.h2}>
          Logistic regression draws any boundary that separates the classes.
          SVM draws the best boundary — the one with the maximum safety margin.
        </h2>

        <p style={S.p}>
          Imagine Stripe's fraud detection system. You have thousands of transactions —
          some fraudulent, some legitimate. You train a logistic regression.
          It draws a line that separates them correctly on the training data.
          But there are infinitely many lines that separate them correctly.
          Which one should you choose?
        </p>

        <p style={S.p}>
          Logistic regression picks whichever line happens to minimise the loss.
          It could be a line that sits dangerously close to some legitimate
          transactions — technically correct, but fragile. A new transaction
          that is only slightly different from the training data might fall
          on the wrong side.
        </p>

        <p style={S.p}>
          Support Vector Machines take a different approach. Instead of just finding
          any separating line, they find the line (or hyperplane in higher dimensions)
          that maximises the distance to the nearest points of both classes.
          This maximum distance is called the <strong style={{ color: '#378ADD' }}>margin</strong>.
          A wider margin means the boundary is more robust — new points have to be
          much further off before they get misclassified.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Imagine drawing a road between two rows of houses.
            You could draw the road anywhere between them — but the safest road
            is the one exactly in the middle, with equal distance to both rows.
            Any car staying on the road has the maximum buffer before hitting a house.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            SVM finds that middle road — the decision boundary equidistant from
            both classes, giving the maximum safety margin to new data points.
            The houses closest to the road are the <strong>support vectors</strong> —
            they are the only training points that actually determine where the road goes.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          The most important insight about SVMs:
          only the training points closest to the boundary matter.
          Remove all other training points and the boundary stays exactly the same.
          Those closest points are the support vectors — they literally "support"
          (hold up) the boundary.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — THE MARGIN ══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The core concept</span>
        <h2 style={S.h2}>The margin — what SVM maximises</h2>

        <p style={S.p}>
          The margin is the total width of the gap between the two classes
          at the decision boundary. It is measured as twice the distance
          from the boundary to the nearest point of each class.
          SVM finds the boundary that makes this margin as wide as possible.
        </p>

        <VisualBox label="Hard margin SVM — three candidate boundaries, one optimal">
          <svg width="100%" viewBox="0 0 500 300">
            {/* Class 1 — fraud (circles) */}
            {[
              [80, 80], [100, 120], [60, 140], [90, 170],
              [70, 100], [110, 90], [50, 160],
            ].map(([cx, cy], i) => (
              <circle key={`f${i}`} cx={cx} cy={cy} r={7}
                fill="rgba(216,90,48,0.25)" stroke="#D85A30" strokeWidth="1.5" />
            ))}
            {/* Class 2 — legit (squares) */}
            {[
              [350, 100], [380, 140], [410, 80], [360, 170],
              [420, 130], [390, 60], [440, 150],
            ].map(([cx, cy], i) => (
              <rect key={`l${i}`} x={cx - 7} y={cy - 7} width={14} height={14}
                fill="rgba(55,138,221,0.25)" stroke="#378ADD" strokeWidth="1.5" />
            ))}

            {/* Poor boundary 1 — too close to fraud */}
            <line x1="160" y1="20" x2="180" y2="280"
              stroke="#888" strokeWidth="1" strokeDasharray="5,3" />
            <text x="162" y="18" fontSize="9" fill="#888" fontFamily="monospace">poor</text>

            {/* Poor boundary 2 — too close to legit */}
            <line x1="290" y1="20" x2="310" y2="280"
              stroke="#888" strokeWidth="1" strokeDasharray="5,3" />
            <text x="292" y="18" fontSize="9" fill="#888" fontFamily="monospace">poor</text>

            {/* Optimal boundary — SVM */}
            <line x1="228" y1="20" x2="248" y2="280"
              stroke="#00e676" strokeWidth="2.5" />
            <text x="214" y="16" fontSize="10" fill="#00e676"
              fontFamily="monospace" fontWeight="700">SVM boundary</text>

            {/* Margin lines */}
            <line x1="175" y1="20" x2="195" y2="280"
              stroke="#00e676" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
            <line x1="281" y1="20" x2="301" y2="280"
              stroke="#00e676" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />

            {/* Margin arrow */}
            <line x1="195" y1="150" x2="281" y2="150"
              stroke="#00e676" strokeWidth="1.5"
              markerStart="url(#arrowL)" markerEnd="url(#arrowR)" />
            <text x="220" y="145" fontSize="10" fill="#00e676" fontFamily="monospace">
              margin
            </text>
            <defs>
              <marker id="arrowL" markerWidth="6" markerHeight="6" refX="0" refY="3" orient="auto">
                <path d="M6,0 L0,3 L6,6" fill="none" stroke="#00e676" strokeWidth="1" />
              </marker>
              <marker id="arrowR" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6" fill="none" stroke="#00e676" strokeWidth="1" />
              </marker>
            </defs>

            {/* Support vectors — highlighted */}
            <circle cx="110" cy="90" r="11"
              fill="none" stroke="#D85A30" strokeWidth="2" strokeDasharray="3,2" />
            <circle cx="90" cy="170" r="11"
              fill="none" stroke="#D85A30" strokeWidth="2" strokeDasharray="3,2" />
            <rect x="343" y="93" width="28" height="28"
              fill="none" stroke="#378ADD" strokeWidth="2" strokeDasharray="3,2" />
            <rect x="343" y="153" width="28" height="28"
              fill="none" stroke="#378ADD" strokeWidth="2" strokeDasharray="3,2" />

            {/* Labels */}
            <text x="60" y="230" fontSize="11" fill="#D85A30" fontFamily="monospace">
              Fraud (class -1)
            </text>
            <text x="340" y="230" fontSize="11" fill="#378ADD" fontFamily="monospace">
              Legit (class +1)
            </text>
            <text x="60" y="248" fontSize="9" fill="#888" fontFamily="monospace">
              ○ = support vector
            </text>
          </svg>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 8 }}>
            Dashed circles/squares = support vectors. Only these points determine
            the boundary. The margin is the gap between the two dashed lines.
            SVM maximises this gap.
          </p>
        </VisualBox>

        <ConceptBox title="Key vocabulary — three terms that define SVM">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                term: 'Decision boundary',
                def: 'The hyperplane that separates the two classes. A line in 2D, a plane in 3D, a hyperplane in higher dimensions. All points on one side are predicted as class +1, all points on the other as class -1.',
              },
              {
                term: 'Support vectors',
                def: 'The training points closest to the decision boundary. These are the only points that determine where the boundary is. Remove any other training point — the boundary stays the same. Remove a support vector — the boundary moves.',
              },
              {
                term: 'Margin',
                def: 'The total width of the gap between the two classes at the boundary. Equal to 2 / ||w|| where w is the weight vector of the boundary. SVM maximises this margin — a wider margin means a more robust classifier.',
              },
            ].map((row) => (
              <div key={row.term} style={{
                background: 'var(--bg2)', borderRadius: 6, padding: '10px 12px',
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#378ADD', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                  {row.term}
                </div>
                <p style={{ ...S.ps, marginBottom: 0 }}>{row.def}</p>
              </div>
            ))}
          </div>
        </ConceptBox>
      </div>

      <Div />

      {/* ══ SECTION 3 — HARD VS SOFT MARGIN ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Real data is never perfectly separable</span>
        <h2 style={S.h2}>Hard margin vs soft margin — handling overlapping classes</h2>

        <p style={S.p}>
          The margin explained above — where no training point is allowed inside
          the margin gap — is called a <strong style={{ color: '#378ADD' }}>hard margin</strong>.
          It only works when the two classes are perfectly separable with a straight line.
          Real data almost never is. Some fraudulent transactions look exactly
          like legitimate ones. Some legitimate transactions look suspicious.
        </p>

        <p style={S.p}>
          Soft margin SVM allows some training points to fall inside the margin
          or even on the wrong side of the boundary — but penalises them.
          The parameter <span style={S.code as React.CSSProperties}>C</span> controls
          this trade-off: high C means "penalise violations heavily, keep the margin tight"
          (closer to hard margin). Low C means "allow more violations, keep the margin wide"
          (more regularisation, better generalisation).
        </p>

        <VisualBox label="C parameter effect — the single most important SVM hyperparameter">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              {
                c: 'C = 0.01',
                label: 'Very wide margin',
                color: '#1D9E75',
                desc: 'Many training points allowed inside margin or misclassified. Very regularised. Underfits if C is too small.',
                violations: 8,
              },
              {
                c: 'C = 1.0',
                label: 'Balanced (default)',
                color: '#378ADD',
                desc: 'Moderate trade-off. Usually a good starting point. Tune from here.',
                violations: 2,
              },
              {
                c: 'C = 1000',
                label: 'Narrow margin',
                color: '#D85A30',
                desc: 'Almost no violations allowed. Boundary hugs training data. Risk of overfitting.',
                violations: 0,
              },
            ].map((item) => (
              <div key={item.c} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}30`,
                borderRadius: 8, padding: '12px 14px',
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                  {item.c}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
                  {item.label}
                </div>
                <p style={{ ...S.ps, marginBottom: 8 }}>{item.desc}</p>
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: item.color }}>
                  Margin violations: ~{item.violations}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--surface)', borderRadius: 7, border: '1px solid var(--border)' }}>
            <p style={{ ...S.ps, marginBottom: 0 }}>
              <strong style={{ color: 'var(--text)' }}>Rule:</strong> Start with C=1.0.
              If training accuracy is much higher than validation accuracy → decrease C (more regularisation).
              If both are low → increase C (less regularisation) or try a different kernel.
              Always tune C with cross-validation.
            </p>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 2000

# Stripe transaction features
transaction_amount = np.abs(np.random.normal(500, 400, n)).clip(10, 5000)
time_since_last    = np.abs(np.random.normal(24, 20, n)).clip(0.1, 200)
merchant_risk      = np.random.uniform(0, 1, n)
device_age_days    = np.abs(np.random.normal(180, 100, n)).clip(0, 730)
n_transactions_24h = np.random.randint(0, 20, n).astype(float)

# Fraud signal: high amount + high merchant risk + many transactions in 24h
fraud_score = (
    (transaction_amount / 5000) * 0.35
    + merchant_risk * 0.30
    + (n_transactions_24h / 20) * 0.20
    + np.random.randn(n) * 0.15
)
y = (fraud_score > 0.55).astype(int)

X = np.column_stack([transaction_amount, time_since_last, merchant_risk,
                      device_age_days, n_transactions_24h])

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# ── ALWAYS scale before SVM ───────────────────────────────────────────
# SVM is one of the most scaling-sensitive algorithms
# Unscaled: dominated by transaction_amount (up to 5000)
# Scaled: all features contribute equally
scaler     = StandardScaler()
X_train_sc = scaler.fit_transform(X_train)
X_test_sc  = scaler.transform(X_test)

# ── Effect of C parameter ─────────────────────────────────────────────
print(f"{'C value':<12} {'Train acc':<12} {'Test acc':<12} {'CV acc (5-fold)'}")
print("─" * 52)
for C in [0.001, 0.01, 0.1, 1.0, 10.0, 100.0]:
    model = SVC(C=C, kernel='rbf', random_state=42)
    model.fit(X_train_sc, y_train)
    tr_acc = model.score(X_train_sc, y_train)
    te_acc = model.score(X_test_sc, y_test)
    cv     = cross_val_score(model, X_train_sc, y_train, cv=5).mean()
    gap    = ' ← overfit' if tr_acc - te_acc > 0.05 else ''
    print(f"  {C:<10}  {tr_acc:<12.4f} {te_acc:<12.4f} {cv:.4f}{gap}")

# ── Number of support vectors ─────────────────────────────────────────
for C in [0.01, 1.0, 100.0]:
    m = SVC(C=C, kernel='rbf', random_state=42).fit(X_train_sc, y_train)
    print(f"  C={C}: {m.n_support_} support vectors per class  "
          f"(total {sum(m.n_support_)}/{len(X_train)})")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — THE KERNEL TRICK ═══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most powerful idea in SVM</span>
        <h2 style={S.h2}>The kernel trick — separate non-linear data without computing high dimensions</h2>

        <p style={S.p}>
          What if the two classes cannot be separated by any straight line?
          In 2D, circles around the origin versus points outside the circle
          cannot be split with a line — no matter how you draw it.
          SVM's solution: project the data into a higher-dimensional space
          where a linear separator does exist.
        </p>

        <p style={S.p}>
          The problem with projecting to higher dimensions is that it becomes
          computationally very expensive — projecting to 1,000 dimensions
          means working with 1,000-dimensional vectors.
          The <strong style={{ color: '#378ADD' }}>kernel trick</strong> solves this beautifully:
          it computes the dot product in the high-dimensional space
          without ever explicitly going there. It uses a kernel function
          that takes two original vectors and returns the same number
          as if you had projected them first and then taken the dot product.
          All the power of high-dimensional separation, none of the cost.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Imagine two groups of ants on a table — one group in the centre,
            one group around the edges. You cannot draw a straight line between them.
            But if you lift the table into the air and fold it into a bowl shape,
            suddenly the centre ants are at the bottom and the edge ants are up high —
            and you can cut them apart with a flat knife.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The kernel function is like the bowl shape — it transforms the space
            so a linear separator works. The kernel trick means you never actually
            have to fold the table — you just compute as if you did.
          </p>
        </AnalogyBox>

        <VisualBox label="The four main kernels — when to use each">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                kernel: 'linear',
                formula: 'K(x, z) = x · z',
                color: '#1D9E75',
                when: 'Data is linearly separable, or you have many features (text classification). Fastest kernel. Interpretable — has feature weights.',
                sklearn: "SVC(kernel='linear')",
              },
              {
                kernel: 'rbf (Gaussian)',
                formula: 'K(x, z) = exp(−γ||x−z||²)',
                color: '#378ADD',
                when: 'Default choice. Works well on most non-linear problems. Controlled by γ (gamma) — how tightly the kernel wraps around each training point.',
                sklearn: "SVC(kernel='rbf', gamma='scale')",
              },
              {
                kernel: 'poly',
                formula: 'K(x, z) = (γx·z + r)^d',
                color: '#D85A30',
                when: 'When features have clear polynomial relationships. Image classification historically. Rarely better than rbf in practice.',
                sklearn: "SVC(kernel='poly', degree=3)",
              },
              {
                kernel: 'sigmoid',
                formula: 'K(x, z) = tanh(γx·z + r)',
                color: '#BA7517',
                when: 'Mimics neural network activation. Rarely used — rbf almost always outperforms it.',
                sklearn: "SVC(kernel='sigmoid')",
              },
            ].map((item) => (
              <div key={item.kernel} style={{
                display: 'grid', gridTemplateColumns: '90px 200px 1fr',
                gap: 14, alignItems: 'start',
                background: 'var(--surface)', border: `1px solid ${item.color}20`,
                borderRadius: 7, padding: '10px 14px',
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>
                    {item.kernel}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginTop: 3, lineHeight: 1.5 }}>
                    {item.formula}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', lineHeight: 1.5, paddingTop: 2 }}>
                  {item.sklearn}
                </div>
                <p style={{ ...S.ps, marginBottom: 0 }}>{item.when}</p>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.datasets import make_circles, make_moons

np.random.seed(42)

# ── Demonstrate kernel effect on non-linearly separable data ──────────

# Dataset 1: circles — inner cluster vs outer ring
X_circ, y_circ = make_circles(n_samples=500, noise=0.1, factor=0.4, random_state=42)
X_tr_c, X_te_c, y_tr_c, y_te_c = train_test_split(X_circ, y_circ, test_size=0.2, random_state=42)

sc = StandardScaler()
X_tr_cs = sc.fit_transform(X_tr_c)
X_te_cs = sc.transform(X_te_c)

print("Circles dataset (inner vs outer ring):")
for kernel in ['linear', 'poly', 'rbf', 'sigmoid']:
    m   = SVC(kernel=kernel, C=1.0, random_state=42).fit(X_tr_cs, y_tr_c)
    acc = accuracy_score(y_te_c, m.predict(X_te_cs))
    bar = '█' * int(acc * 30)
    print(f"  {kernel:<10}: {bar} {acc:.4f}")

# RBF and poly should dominate — linear cannot separate circles

# Dataset 2: moons — two interleaved crescent shapes
X_moon, y_moon = make_moons(n_samples=500, noise=0.15, random_state=42)
X_tr_m, X_te_m, y_tr_m, y_te_m = train_test_split(X_moon, y_moon, test_size=0.2, random_state=42)
X_tr_ms = sc.fit_transform(X_tr_m)
X_te_ms = sc.transform(X_te_m)

print("\nMoons dataset (two crescents):")
for kernel in ['linear', 'poly', 'rbf']:
    m   = SVC(kernel=kernel, C=1.0, random_state=42).fit(X_tr_ms, y_tr_m)
    acc = accuracy_score(y_te_m, m.predict(X_te_ms))
    bar = '█' * int(acc * 30)
    print(f"  {kernel:<10}: {bar} {acc:.4f}")

# ── The gamma parameter — RBF kernel ─────────────────────────────────
# gamma = how much influence each training point has
# Small gamma: smooth, wide decision boundary (underfits if too small)
# Large gamma: tight, complex boundary that wraps around training points (overfits)
print("\nRBF kernel — effect of gamma:")
for gamma in [0.001, 0.01, 0.1, 1.0, 10.0, 100.0]:
    m    = SVC(kernel='rbf', C=1.0, gamma=gamma).fit(X_tr_cs, y_tr_c)
    tr_a = m.score(X_tr_cs, y_tr_c)
    te_a = m.score(X_te_cs, y_te_c)
    flag = ' ← overfit' if tr_a - te_a > 0.05 else ''
    print(f"  gamma={gamma:<8}: train={tr_a:.4f}  test={te_a:.4f}{flag}")

# 'scale' (default) = 1/(n_features * X.var()) — usually a good starting point
m_scale = SVC(kernel='rbf', gamma='scale').fit(X_tr_cs, y_tr_c)
print(f"\n  gamma='scale': test={m_scale.score(X_te_cs, y_te_c):.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — SVM FOR REGRESSION ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Not just classification</span>
        <h2 style={S.h2}>SVR — Support Vector Regression</h2>

        <p style={S.p}>
          SVM has a regression variant called SVR (Support Vector Regression).
          Instead of maximising the margin between classes, SVR fits a tube around
          the data — predictions within the tube incur no penalty.
          Only points outside the tube (the support vectors for regression)
          contribute to the loss. The width of the tube is controlled by
          the parameter <span style={S.code as React.CSSProperties}>epsilon</span>.
        </p>

        <CodeBlock code={`import numpy as np
from sklearn.svm import SVR
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

np.random.seed(42)
n = 1000

distance = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic  = np.random.randint(1, 11, n).astype(float)
prep     = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
delivery = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
            + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep])
y = delivery

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
sc = StandardScaler()
X_tr_sc = sc.fit_transform(X_tr)
X_te_sc = sc.transform(X_te)

print(f"{'Model':<35} {'Test MAE':>10} {'Support Vectors':>16}")
print("─" * 64)

for kernel in ['linear', 'rbf', 'poly']:
    svr = SVR(kernel=kernel, C=1.0, epsilon=0.5)
    svr.fit(X_tr_sc, y_tr)
    mae = mean_absolute_error(y_te, svr.predict(X_te_sc))
    n_sv = svr.n_support_vectors_
    print(f"  SVR(kernel='{kernel}'){'':<15} {mae:>10.4f} {n_sv:>16}")

# epsilon parameter: the tube width
# Points within epsilon of the prediction contribute zero loss
# Larger epsilon = wider tube = fewer support vectors = smoother model
print("\nEpsilon effect (SVR with rbf kernel):")
for eps in [0.01, 0.1, 0.5, 1.0, 2.0, 5.0]:
    svr = SVR(kernel='rbf', C=1.0, epsilon=eps)
    svr.fit(X_tr_sc, y_tr)
    mae = mean_absolute_error(y_te, svr.predict(X_te_sc))
    print(f"  epsilon={eps:<6}: MAE={mae:.4f}  support_vectors={svr.n_support_vectors_}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — SVM IN PRODUCTION ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What this looks like at work</span>
        <h2 style={S.h2}>When SVMs win — and when to use something else</h2>

        <p style={S.p}>
          SVMs were the dominant algorithm in ML from the late 1990s until
          around 2012 when deep learning took over. They are no longer the
          default choice for large-scale problems, but they still genuinely win
          in specific situations that come up regularly in production.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.3)',
            borderRadius: 8, padding: '14px 16px',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#00e676', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
              SVM wins when ✓
            </div>
            {[
              'Small to medium dataset (< 100k samples)',
              'High-dimensional features (text, gene expression)',
              'Clear margin of separation exists in the data',
              'You need a kernel trick for non-linear boundaries',
              'Training data is limited — SVM generalises well with few samples',
              'Memory-efficient needed — only support vectors stored',
            ].map((item, i) => (
              <div key={i} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 5, lineHeight: 1.5 }}>
                • {item}
              </div>
            ))}
          </div>
          <div style={{
            background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.3)',
            borderRadius: 8, padding: '14px 16px',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ff4757', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
              Use something else when ✗
            </div>
            {[
              'Large dataset (> 100k samples) — SVMs scale as O(n²) to O(n³)',
              'You need probability estimates — SVC requires expensive calibration',
              'Many noisy features — SVMs sensitive to irrelevant features',
              'Need feature importance — SVMs do not provide it directly',
              'Need fast retraining on new data — SVMs are slow to retrain',
              'Tabular data with mixed types — XGBoost/RF almost always win',
            ].map((item, i) => (
              <div key={i} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 5, lineHeight: 1.5 }}>
                • {item}
              </div>
            ))}
          </div>
        </div>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.svm import SVC
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import GridSearchCV, StratifiedKFold
from sklearn.metrics import classification_report, roc_auc_score
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 3000

# Stripe fraud detection — production pipeline
transaction_amount = np.abs(np.random.normal(500, 400, n)).clip(10, 5000)
time_since_last    = np.abs(np.random.normal(24, 20, n)).clip(0.1, 200)
merchant_risk      = np.random.uniform(0, 1, n)
device_age_days    = np.abs(np.random.normal(180, 100, n)).clip(0, 730)
n_tx_24h           = np.random.randint(0, 20, n).astype(float)
velocity_score     = (n_tx_24h / 20) * 0.5 + (transaction_amount / 5000) * 0.5

fraud_score = (
    (transaction_amount / 5000) * 0.35 + merchant_risk * 0.30
    + (n_tx_24h / 20) * 0.20 + np.random.randn(n) * 0.15
)
y = (fraud_score > 0.55).astype(int)

X = pd.DataFrame({
    'transaction_amount': transaction_amount,
    'time_since_last':    time_since_last,
    'merchant_risk':      merchant_risk,
    'device_age_days':    device_age_days,
    'n_tx_24h':           n_tx_24h,
    'velocity_score':     velocity_score,
})

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# ── Production SVM pipeline ───────────────────────────────────────────
# ALWAYS scale — SVM is one of the most scaling-sensitive algorithms
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model',  SVC(kernel='rbf', probability=True, random_state=42)),
])

# ── Hyperparameter search ─────────────────────────────────────────────
# C and gamma are the two most important parameters for RBF SVM
param_grid = {
    'model__C':     [0.1, 1.0, 10.0, 100.0],
    'model__gamma': ['scale', 'auto', 0.001, 0.01, 0.1],
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
grid = GridSearchCV(
    pipeline, param_grid,
    cv=cv, scoring='roc_auc',
    n_jobs=-1, verbose=0,
)
grid.fit(X_train, y_train)

print(f"Best params: {grid.best_params_}")
print(f"Best CV AUC: {grid.best_score_:.4f}")

# ── Final evaluation ──────────────────────────────────────────────────
best_model = grid.best_estimator_
y_pred     = best_model.predict(X_test)
y_proba    = best_model.predict_proba(X_test)[:, 1]

print(f"\nTest ROC-AUC: {roc_auc_score(y_test, y_proba):.4f}")
print("\nClassification report:")
print(classification_report(y_test, y_pred, target_names=['Legitimate', 'Fraud']))

# ── Calibration — SVM probabilities need calibration ──────────────────
# SVC(probability=True) uses Platt scaling internally
# For better calibration use CalibratedClassifierCV
from sklearn.calibration import CalibratedClassifierCV
base_svm   = Pipeline([
    ('scaler', StandardScaler()),
    ('model',  SVC(kernel='rbf', C=10.0, gamma='scale', random_state=42)),
])
calibrated = CalibratedClassifierCV(base_svm, cv=5, method='isotonic')
calibrated.fit(X_train, y_train)
y_calib    = calibrated.predict_proba(X_test)[:, 1]
print(f"\nCalibrated SVM ROC-AUC: {roc_auc_score(y_test, y_calib):.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common SVM error — explained and fixed</h2>

        <ErrorBlock
          error="SVM training takes hours or runs out of memory on a dataset with 50,000+ rows"
          cause="SVM's training complexity is O(n²) to O(n³) in the number of samples. With 50,000 samples this means computing a 50,000 × 50,000 kernel matrix — 2.5 billion entries. This is both slow and memory-intensive. The rbf kernel makes this worse because every pair of training points must be evaluated."
          fix="For large datasets, use LinearSVC (uses liblinear, scales as O(n)) or SGDClassifier(loss='hinge') which approximates SVM with stochastic gradient descent. Alternatively use a subset: fit SVM on a representative 10,000-sample subset. For production at scale, switch to XGBoost or a neural network — SVMs genuinely do not scale to millions of samples."
        />

        <ErrorBlock
          error="SVC predict_proba() is very slow even after training is complete"
          cause="SVC(probability=True) uses Platt scaling — it runs an additional 5-fold cross-validation internally during fit() to calibrate probabilities. This doubles or triples training time. More critically, predict_proba() is slower than predict() because it must apply the Platt calibration to every prediction."
          fix="If you only need class labels (not probabilities), use predict() instead of predict_proba() — much faster. If you need calibrated probabilities, use CalibratedClassifierCV(SVC(), cv=5) instead of SVC(probability=True) — it gives better calibration. For production serving where latency matters, consider RandomForest or XGBoost whose predict_proba() is much faster."
        />

        <ErrorBlock
          error="SVM gives poor results — accuracy barely above baseline"
          cause="Almost always caused by forgetting to scale features. SVM uses distance calculations — a feature with values 0–5000 (like transaction amount) completely dominates a feature with values 0–1 (like merchant_risk). The decision boundary is almost entirely determined by the large-scale feature, ignoring all others."
          fix="Always put StandardScaler() inside a Pipeline before SVC. Check: after scaling, every feature should have mean≈0 and std≈1. Verify with scaler.mean_ and scaler.scale_. SVM is one of the most scaling-sensitive algorithms — this is the first thing to check when results are poor."
        />

        <ErrorBlock
          error="ConvergenceWarning: Solver terminated early — set max_iter higher"
          cause="The SVM optimiser (libsvm) did not converge within the default number of iterations. This happens on difficult problems, very small C values, or data that is not well-scaled. The model was returned before finding the optimal boundary."
          fix="Scale your features first — this usually resolves convergence issues. If scaling does not help, increase max_iter: SVC(max_iter=5000). Also try adjusting tol (tolerance): SVC(tol=1e-4). If the warning persists after scaling, the data may have fundamental separability issues — try a different kernel or a different algorithm entirely."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          SVMs find the best boundary. The next algorithm finds the nearest neighbours.
        </h2>

        <p style={S.p}>
          SVM is a global algorithm — it uses the entire training set to find
          the optimal boundary, then only remembers the support vectors.
          K-Nearest Neighbours (KNN) is the opposite — it is a local algorithm
          that remembers every single training point and makes predictions
          purely based on what the closest neighbours look like.
          No training phase. No boundary. Just: "what do the k points
          nearest to this new point look like?"
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
              Next — Module 26 · Classical ML
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              K-Nearest Neighbours — Similarity-Based Prediction
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              The simplest possible ML algorithm — predict based on what your neighbours
              look like. Distance metrics, the curse of dimensionality, and when KNN
              actually works in production.
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
          'SVM does not just find any separating boundary — it finds the boundary with the maximum margin: the widest possible gap between the two classes. A wider margin means more robust predictions on new data.',
          'Support vectors are the training points closest to the boundary. They are the only points that determine where the boundary is. All other training points can be removed without changing the boundary at all.',
          'C is the most important hyperparameter. High C = narrow margin, few violations (risks overfitting). Low C = wide margin, more violations allowed (more regularisation). Start with C=1.0 and tune with cross-validation.',
          'The kernel trick projects data into higher dimensions where a linear separator exists — without the computational cost of actually working in those dimensions. RBF (Gaussian) kernel is the default and works well on most non-linear problems.',
          'ALWAYS scale features before SVM. It is one of the most scaling-sensitive algorithms in all of sklearn. An unscaled feature with large values completely dominates the distance calculations and makes the model ignore all other features.',
          'SVMs do not scale to large datasets — training complexity is O(n²) to O(n³). For datasets above ~50k rows, use LinearSVC, XGBoost, or a neural network. SVMs genuinely win on small high-dimensional datasets like text classification and biological data.',
        ]}
      />
    </LearnLayout>
  )
}