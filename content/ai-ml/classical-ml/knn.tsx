import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout  } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'K-Nearest Neighbours — Chaduvuko',
  description:
    'The simplest possible ML algorithm — predict based on what your neighbours look like. Distance metrics, the curse of dimensionality, and when KNN actually works in production.',
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

export default function KNNPage() {
  return (
    <LearnLayout
      title="K-Nearest Neighbours"
      description="The simplest possible ML algorithm — predict based on what your neighbours look like. Distance metrics, the curse of dimensionality, and when KNN actually works."
      section="Classical ML"
      readTime="25–30 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="classical-ml" topic="knn" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — what problem does this solve?</span>
        <h2 style={S.h2}>
          KNN has no training phase. No weights. No boundary.
          Just one idea: similar inputs should produce similar outputs.
        </h2>

        <p style={S.p}>
          A new customer joins Flipkart. They are 24 years old, live in Bangalore,
          buy mostly electronics, and spend ₹3,000 per order on average.
          What products should you recommend to them?
        </p>

        <p style={S.p}>
          The simplest possible answer: find the 5 existing customers who are
          most similar to this new customer. Look at what they bought and liked.
          Recommend those. You do not need a trained model, learned weights,
          or a decision boundary. You just need a way to measure similarity
          and enough historical data to look up neighbours from.
        </p>

        <p style={S.p}>
          That is the entire KNN algorithm. For a new query point,
          find the k training points nearest to it (by some distance measure),
          and predict based on what those neighbours say.
          For classification: majority vote among the k neighbours.
          For regression: average of the k neighbours' values.
          No training. No parameters learned from data. Every prediction
          looks up the training set from scratch.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            You move to a new city and want to know if a neighbourhood is safe.
            You do not build a statistical model of crime rates.
            You ask the 5 people who live closest to that neighbourhood
            what they think. If 4 out of 5 say it is safe, you conclude it is safe.
            That is KNN — ask your nearest neighbours and take a vote.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The key questions are: how do you measure "closeness"?
            How many neighbours k should you ask?
            And what happens when the neighbourhood is crowded in some
            dimensions but empty in others — the curse of dimensionality.
            This module answers all three.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          KNN is called a <strong>lazy learner</strong> — it does no work during training
          and all the work during prediction. Contrast with a neural network which
          does all the work during training and almost no work during prediction.
          Both extremes have real trade-offs in production systems.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — HOW IT WORKS STEP BY STEP ═════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The algorithm in detail</span>
        <h2 style={S.h2}>How KNN makes a prediction — four steps, no hidden magic</h2>

        <p style={S.p}>
          KNN's prediction process is completely transparent.
          Every step can be inspected and understood.
          There are no learned parameters — the algorithm memorises
          the entire training set and consults it at prediction time.
        </p>

        <VisualBox label="KNN prediction — step by step on one new Swiggy order">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              {
                step: '1',
                title: 'Store the entire training set',
                detail: '"Training" KNN means nothing more than storing X_train and y_train in memory. No computation happens. No weights are adjusted. This is why KNN training is instantaneous.',
                color: '#378ADD',
              },
              {
                step: '2',
                title: 'Receive a new query point',
                detail: 'New Swiggy order: distance=5.2km, traffic=8, prep=22min. We want to predict delivery time.',
                color: '#1D9E75',
              },
              {
                step: '3',
                title: 'Compute distance to every training point',
                detail: 'Calculate the distance between the new point and every single training example. With 10,000 training points, that is 10,000 distance calculations per prediction.',
                color: '#D85A30',
              },
              {
                step: '4',
                title: 'Find the k nearest and predict',
                detail: 'Sort all distances. Take the k smallest. For regression: return their average y value. For classification: return the majority class. With k=5 and delivery times [34, 38, 41, 35, 39], prediction = (34+38+41+35+39)/5 = 37.4 min.',
                color: '#BA7517',
              },
            ].map((item) => (
              <div key={item.step} style={{
                display: 'flex', gap: 16, padding: '14px 0',
                borderBottom: '1px solid var(--border)', alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: `${item.color}15`,
                  border: `1.5px solid ${item.color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 900, color: item.color,
                  fontFamily: 'var(--font-mono)',
                }}>
                  {item.step}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 14, fontWeight: 700, color: 'var(--text)',
                    fontFamily: 'var(--font-display)', marginBottom: 5,
                  }}>
                    {item.title}
                  </div>
                  <p style={{ ...S.ps, marginBottom: 0 }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np

# ── KNN from scratch — every step visible ─────────────────────────────
class KNNScratch:
    """
    K-Nearest Neighbours from scratch.
    Training = just storing the data.
    Prediction = find k nearest, aggregate their labels.
    """

    def __init__(self, k: int = 5, task: str = 'regression'):
        self.k      = k
        self.task   = task   # 'regression' or 'classification'
        self.X_train = None
        self.y_train = None

    def fit(self, X: np.ndarray, y: np.ndarray):
        """
        'Training' KNN = just storing the data.
        Nothing is computed. Nothing is learned.
        """
        self.X_train = X.copy()
        self.y_train = y.copy()
        return self

    def _euclidean_distance(self, a: np.ndarray, b: np.ndarray) -> float:
        """Distance between two points: sqrt(sum of squared differences)."""
        return np.sqrt(np.sum((a - b) ** 2))

    def _predict_one(self, x: np.ndarray):
        """Predict for a single query point."""
        # Step 1: compute distance to every training point
        distances = np.array([
            self._euclidean_distance(x, x_train)
            for x_train in self.X_train
        ])

        # Step 2: find indices of k nearest neighbours
        k_nearest_indices = np.argsort(distances)[:self.k]

        # Step 3: get their labels
        k_nearest_labels = self.y_train[k_nearest_indices]

        # Step 4: aggregate
        if self.task == 'regression':
            return k_nearest_labels.mean()
        else:
            # majority vote
            values, counts = np.unique(k_nearest_labels, return_counts=True)
            return values[np.argmax(counts)]

    def predict(self, X: np.ndarray) -> np.ndarray:
        return np.array([self._predict_one(x) for x in X])


# ── Test on Swiggy delivery data ───────────────────────────────────────
np.random.seed(42)
n = 500
distance  = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic   = np.random.randint(1, 11, n).astype(float)
prep      = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
delivery  = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
             + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep])
y = delivery

# Scale — CRITICAL for KNN
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
sc = StandardScaler()
X_train_sc = sc.fit_transform(X_train)
X_test_sc  = sc.transform(X_test)

# From-scratch KNN
knn_scratch = KNNScratch(k=5, task='regression')
knn_scratch.fit(X_train_sc, y_train)
y_pred_scratch = knn_scratch.predict(X_test_sc[:10])  # only 10 for speed

# Verify with sklearn
from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import mean_absolute_error
knn_sk = KNeighborsRegressor(n_neighbors=5)
knn_sk.fit(X_train_sc, y_train)
y_pred_sk = knn_sk.predict(X_test_sc[:10])

print("From-scratch vs sklearn predictions (first 10):")
for s, sk, true in zip(y_pred_scratch, y_pred_sk, y_test[:10]):
    print(f"  scratch={s:.1f}  sklearn={sk:.1f}  true={true:.1f}")

# Full test MAE
y_pred_full = knn_sk.predict(X_test_sc)
print(f"\nFull test MAE (k=5): {mean_absolute_error(y_test, y_pred_full):.4f} min")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — DISTANCE METRICS ═══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Measuring closeness</span>
        <h2 style={S.h2}>Distance metrics — which one to use and why it matters</h2>

        <p style={S.p}>
          KNN's entire behaviour depends on how you measure distance.
          The same dataset can produce completely different predictions depending
          on which distance metric you choose. The default — Euclidean distance —
          works well in most cases. But understanding the alternatives
          lets you make better choices for specific problem types.
        </p>

        <VisualBox label="The three main distance metrics — compared on the same two points">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                name: 'Euclidean (L2)',
                formula: '√Σ(aᵢ − bᵢ)²',
                color: '#378ADD',
                desc: 'Straight-line distance. The default. Treats all directions equally. Best when features are continuous and on the same scale.',
                example: 'Two Swiggy orders: A=(5km, traffic=8) B=(3km, traffic=6). Distance = √((5-3)²+(8-6)²) = √8 = 2.83',
                when: 'Default for most problems. Always scale first.',
              },
              {
                name: 'Manhattan (L1)',
                formula: 'Σ|aᵢ − bᵢ|',
                color: '#1D9E75',
                desc: 'Sum of absolute differences. Like navigating a grid — you can only move horizontally or vertically. Less sensitive to outliers than Euclidean.',
                example: 'Same orders: |5-3| + |8-6| = 2 + 2 = 4. Larger than Euclidean.',
                when: 'High-dimensional data, sparse features, when outliers are a concern.',
              },
              {
                name: 'Minkowski (general)',
                formula: '(Σ|aᵢ − bᵢ|^p)^(1/p)',
                color: '#D85A30',
                desc: 'General case: p=1 is Manhattan, p=2 is Euclidean. Higher p emphasises the largest difference between dimensions.',
                example: 'sklearn uses Minkowski with p=2 (Euclidean) by default. Set p=1 for Manhattan.',
                when: 'Tune p as a hyperparameter if the default is not working.',
              },
            ].map((item) => (
              <div key={item.name} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 8, padding: '13px 15px',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>
                    {item.name}
                  </span>
                  <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                    {item.formula}
                  </span>
                </div>
                <p style={{ ...S.ps, marginBottom: 5 }}>{item.desc}</p>
                <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                  Example: {item.example}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                  Use when: {item.when}
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_absolute_error

np.random.seed(42)
n = 2000
distance  = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic   = np.random.randint(1, 11, n).astype(float)
prep      = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
delivery  = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
             + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep])
y = delivery

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
sc = StandardScaler()
X_tr_sc = sc.fit_transform(X_tr)
X_te_sc = sc.transform(X_te)

# ── Compare distance metrics ───────────────────────────────────────────
print(f"{'Metric':<20} {'p':<5} {'Test MAE'}")
print("─" * 35)
for metric, p in [
    ('euclidean (L2)', 2),
    ('manhattan (L1)', 1),
    ('minkowski p=3',  3),
    ('minkowski p=4',  4),
]:
    knn = KNeighborsRegressor(n_neighbors=5, metric='minkowski', p=p)
    knn.fit(X_tr_sc, y_tr)
    mae = mean_absolute_error(y_te, knn.predict(X_te_sc))
    print(f"  {metric:<18} {p:<5} {mae:.4f}")

# ── Effect of not scaling — the most common mistake ───────────────────
print("\nEffect of not scaling on distance-based algorithms:")
knn_unscaled = KNeighborsRegressor(n_neighbors=5)
knn_unscaled.fit(X_tr, y_tr)   # no scaling
mae_unscaled = mean_absolute_error(y_te, knn_unscaled.predict(X_te))

knn_scaled = KNeighborsRegressor(n_neighbors=5)
knn_scaled.fit(X_tr_sc, y_tr)
mae_scaled = mean_absolute_error(y_te, knn_scaled.predict(X_te_sc))

print(f"  Without scaling: MAE = {mae_unscaled:.4f}  ← dominated by large-scale features")
print(f"  With scaling:    MAE = {mae_scaled:.4f}  ← all features contribute equally")

# ── Weighted KNN — closer neighbours vote more ────────────────────────
# weights='uniform': all k neighbours vote equally
# weights='distance': closer neighbours have more influence (1/distance weighting)
print("\nUniform vs distance-weighted KNN:")
for weights in ['uniform', 'distance']:
    knn = KNeighborsRegressor(n_neighbors=5, weights=weights)
    knn.fit(X_tr_sc, y_tr)
    mae = mean_absolute_error(y_te, knn.predict(X_te_sc))
    print(f"  weights='{weights}': MAE = {mae:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — CHOOSING K ══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most important hyperparameter</span>
        <h2 style={S.h2}>Choosing k — the bias-variance trade-off made visual</h2>

        <p style={S.p}>
          The value of k directly controls how much the model generalises
          versus memorises. Small k means the prediction is based on very few
          neighbours — highly sensitive to noise. Large k means the prediction
          is based on many neighbours — smoother but potentially missing
          local structure. This is the classic bias-variance trade-off,
          and KNN makes it unusually visible.
        </p>

        <VisualBox label="Effect of k on decision boundary — from jagged to smooth">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              {
                k: 'k = 1',
                color: '#D85A30',
                bias: 'Very low',
                variance: 'Very high',
                boundary: 'Jagged, fits every training point exactly',
                train: '100%',
                test: 'Poor — memorised noise',
              },
              {
                k: 'k = 7',
                color: '#1D9E75',
                bias: 'Balanced',
                variance: 'Balanced',
                boundary: 'Smooth enough to generalise, flexible enough to fit patterns',
                train: 'Good',
                test: 'Good — generalises well',
              },
              {
                k: 'k = n',
                color: '#378ADD',
                bias: 'Very high',
                variance: 'Very low',
                boundary: 'Always predicts the same thing (global majority/mean)',
                train: 'Poor',
                test: 'Poor — too simple',
              },
            ].map((item) => (
              <div key={item.k} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}30`,
                borderRadius: 8, padding: '12px 14px',
              }}>
                <div style={{ fontSize: 16, fontWeight: 900, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                  {item.k}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {[
                    { label: 'Bias', val: item.bias },
                    { label: 'Variance', val: item.variance },
                    { label: 'Train acc', val: item.train },
                    { label: 'Test acc', val: item.test },
                  ].map((row) => (
                    <div key={row.label} style={{ display: 'flex', gap: 8 }}>
                      <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--muted)', minWidth: 65 }}>{row.label}</span>
                      <span style={{ fontSize: 11, color: item.color }}>{row.val}</span>
                    </div>
                  ))}
                </div>
                <p style={{ ...S.ps, marginBottom: 0, marginTop: 8, fontSize: 11 }}>
                  {item.boundary}
                </p>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.neighbors import KNeighborsRegressor, KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.metrics import mean_absolute_error
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 2000
distance  = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic   = np.random.randint(1, 11, n).astype(float)
prep      = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
delivery  = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
             + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep])
y = delivery

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
sc = StandardScaler()
X_tr_sc = sc.fit_transform(X_tr)
X_te_sc = sc.transform(X_te)

# ── k sweep — find optimal k ──────────────────────────────────────────
print(f"{'k':<6} {'Train MAE':<12} {'CV MAE (5-fold)':<18} {'Test MAE'}")
print("─" * 54)

best_k, best_cv = None, float('inf')
for k in [1, 3, 5, 7, 10, 15, 20, 30, 50, 100]:
    knn = KNeighborsRegressor(n_neighbors=k, weights='distance')
    knn.fit(X_tr_sc, y_tr)

    train_mae = mean_absolute_error(y_tr, knn.predict(X_tr_sc))
    cv_scores = cross_val_score(knn, X_tr_sc, y_tr,
                                 cv=5, scoring='neg_mean_absolute_error')
    cv_mae    = -cv_scores.mean()
    test_mae  = mean_absolute_error(y_te, knn.predict(X_te_sc))

    flag = ' ← best CV' if cv_mae < best_cv else ''
    if cv_mae < best_cv:
        best_cv, best_k = cv_mae, k

    overfit = ' ← overfit' if train_mae < cv_mae * 0.7 else ''
    print(f"  {k:<4}  {train_mae:<12.4f} {cv_mae:<16.4f}  {test_mae:.4f}{flag}{overfit}")

print(f"\nBest k by CV: {best_k}  (CV MAE = {best_cv:.4f})")

# ── Rule of thumb: k = sqrt(n_train) as starting point ────────────────
k_rule_of_thumb = int(np.sqrt(len(X_tr)))
print(f"\nRule of thumb: k = sqrt(n_train) = sqrt({len(X_tr)}) = {k_rule_of_thumb}")
print("Always use an odd k for binary classification to avoid ties.")
print("Tune k with cross-validation — do not rely on the rule of thumb alone.")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — CURSE OF DIMENSIONALITY ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Why KNN breaks in high dimensions</span>
        <h2 style={S.h2}>The curse of dimensionality — KNN's fundamental limitation</h2>

        <p style={S.p}>
          KNN works beautifully in 2 or 3 dimensions. It falls apart in 100 dimensions.
          The reason is counterintuitive but important — in high-dimensional space,
          distances lose their meaning. All points become approximately equidistant
          from each other. When every point is roughly the same distance from
          every other point, "nearest neighbours" is a meaningless concept.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Imagine searching for the nearest person to you on a street (1D).
            Easy — look left and right. Now on a field (2D). Harder, but doable.
            Now in a building (3D). Now in a 100-dimensional space where each
            dimension is one feature of a customer profile.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            In 100 dimensions, the "nearest" customer might actually be
            almost as far away as the furthest customer. The ratio of
            nearest-to-furthest distance approaches 1 as dimensions grow.
            All distances become equally large and equally meaningless.
          </p>
        </AnalogyBox>

        <ConceptBox title="The curse — what happens to distances as dimensions increase">
          <p style={{ ...S.ps, marginBottom: 10 }}>
            In d dimensions, to maintain the same neighbourhood density
            you need exponentially more data. To have 10 neighbours within
            a distance of 0.1 in 1D, you might need ~100 points.
            In 10D, you need ~10 billion points for the same density.
            In practice, your data becomes infinitely sparse.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              { d: '2D',   density: 'Neighbourhoods are meaningful — 5 neighbours is genuinely close' },
              { d: '10D',  density: 'Neighbourhoods start thinning — need more data to work well' },
              { d: '50D',  density: 'Distances nearly uniform — KNN accuracy degrades significantly' },
              { d: '100D+', density: 'All points approximately equidistant — KNN essentially random' },
            ].map((row) => (
              <div key={row.d} style={{
                display: 'flex', gap: 12, background: 'var(--bg2)',
                borderRadius: 5, padding: '7px 10px',
              }}>
                <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#378ADD', minWidth: 50 }}>
                  {row.d}
                </span>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{row.density}</span>
              </div>
            ))}
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
from sklearn.neighbors import KNeighborsRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import cross_val_score
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)

# ── Demonstrate curse of dimensionality ───────────────────────────────
# Add progressively more noise dimensions — watch KNN performance degrade

n = 1000
# Core signal: 3 features with real predictive power
X_core = np.column_stack([
    np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15),
    np.random.randint(1, 11, n).astype(float),
    np.abs(np.random.normal(15, 5, n)).clip(5, 35),
])
y = (8.6 + 7.3*X_core[:,0] + 0.8*X_core[:,2] + 1.5*X_core[:,1]
     + np.random.normal(0, 4, n)).clip(10, 120)

print("KNN performance as dimensions increase (3 real + noise):")
print(f"{'Dimensions':<14} {'CV MAE':>10} {'Distance ratio':>16}")
print("─" * 44)

for n_noise in [0, 2, 5, 10, 20, 50, 100]:
    X_noise = np.random.randn(n, n_noise) if n_noise > 0 else np.empty((n, 0))
    X_full  = np.hstack([X_core, X_noise])
    total_d = X_full.shape[1]

    sc   = StandardScaler()
    X_sc = sc.fit_transform(X_full)

    # KNN CV MAE
    knn    = KNeighborsRegressor(n_neighbors=10)
    scores = cross_val_score(knn, X_sc, y, cv=5, scoring='neg_mean_absolute_error')
    cv_mae = -scores.mean()

    # Distance ratio: nearest / farthest — approaches 1 as dims increase
    from sklearn.metrics.pairwise import euclidean_distances
    sample_dists = euclidean_distances(X_sc[:100])
    np.fill_diagonal(sample_dists, np.inf)
    nearest  = sample_dists.min(axis=1).mean()
    np.fill_diagonal(sample_dists, 0)
    farthest = sample_dists.max(axis=1).mean()
    ratio    = nearest / farthest

    print(f"  {total_d:<12}d  {cv_mae:>10.4f} {ratio:>14.4f}")

print("\nAs dimensions grow: MAE degrades, distance ratio → 1 (all equidistant)")

# ── Fix: reduce dimensions before KNN ─────────────────────────────────
from sklearn.decomposition import PCA
from sklearn.pipeline import Pipeline

X_high = np.hstack([X_core, np.random.randn(n, 47)])  # 50 total dimensions
sc = StandardScaler()
X_high_sc = sc.fit_transform(X_high)

print("\nPCA dimensionality reduction before KNN:")
for n_components in [50, 20, 10, 5, 3]:
    pca  = PCA(n_components=n_components)
    X_pca = pca.fit_transform(X_high_sc)
    knn   = KNeighborsRegressor(n_neighbors=10)
    score = cross_val_score(knn, X_pca, y, cv=5,
                             scoring='neg_mean_absolute_error')
    print(f"  PCA to {n_components:2d} dims: CV MAE = {-score.mean():.4f}  "
          f"({pca.explained_variance_ratio_.sum()*100:.0f}% variance retained)")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — KNN CLASSIFICATION ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Classification variant</span>
        <h2 style={S.h2}>KNN for classification — majority vote with probabilities</h2>

        <p style={S.p}>
          KNN classification works identically to regression —
          find k nearest neighbours and aggregate.
          For classification the aggregation is a majority vote:
          whichever class appears most among the k neighbours wins.
          Probabilities come naturally — the fraction of neighbours
          belonging to each class.
        </p>

        <CodeBlock code={`import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.pipeline import Pipeline
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 3000

# Late delivery classification: is_late = delivery > 45 min
distance  = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic   = np.random.randint(1, 11, n).astype(float)
prep      = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
value     = np.abs(np.random.normal(350, 150, n)).clip(50, 1200)
delivery  = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
             + np.random.normal(0, 4, n)).clip(10, 120)
y_cls     = (delivery > 45).astype(int)

X = np.column_stack([distance, traffic, prep, value])
X_tr, X_te, y_tr, y_te = train_test_split(
    X, y_cls, test_size=0.2, stratify=y_cls, random_state=42
)

# ── Pipeline: scale → KNN ─────────────────────────────────────────────
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('knn',    KNeighborsClassifier(n_neighbors=11, weights='distance')),
])
pipe.fit(X_tr, y_tr)

y_pred  = pipe.predict(X_te)
y_proba = pipe.predict_proba(X_te)[:, 1]

print(f"KNN Classifier (k=11):")
print(f"  Accuracy: {pipe.score(X_te, y_te):.4f}")
print(f"  ROC-AUC:  {roc_auc_score(y_te, y_proba):.4f}")
print(classification_report(y_te, y_pred, target_names=['On-time', 'Late']))

# ── Probability = fraction of neighbours in each class ────────────────
# Inspect probabilities for a few examples
print("Sample predictions with neighbourhood breakdown:")
knn_fitted = pipe.named_steps['knn']
sc_fitted  = pipe.named_steps['scaler']
X_te_sc    = sc_fitted.transform(X_te)

# Get the actual k nearest neighbours for first 3 test points
distances_arr, indices = knn_fitted.kneighbors(X_te_sc[:3])
for i in range(3):
    neighbour_labels = y_tr[indices[i]]
    late_count  = neighbour_labels.sum()
    total       = len(neighbour_labels)
    p_late      = y_proba[i]
    actual      = 'LATE' if y_te[i] == 1 else 'ON-TIME'
    predicted   = 'LATE' if y_pred[i] == 1 else 'ON-TIME'
    print(f"  Sample {i+1}: {late_count}/{total} neighbours are late "
          f"→ P(late)={p_late:.3f}  predicted={predicted}  actual={actual}")

# ── GridSearch over k and weights ─────────────────────────────────────
param_grid = {
    'knn__n_neighbors': [3, 5, 7, 11, 15, 21, 31],
    'knn__weights':     ['uniform', 'distance'],
    'knn__metric':      ['euclidean', 'manhattan'],
}
grid = GridSearchCV(pipe, param_grid, cv=5, scoring='roc_auc', n_jobs=-1)
grid.fit(X_tr, y_tr)
print(f"\nBest params: {grid.best_params_}")
print(f"Best CV AUC: {grid.best_score_:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — WHEN TO USE KNN ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Practical guidance</span>
        <h2 style={S.h2}>When KNN wins — and when it does not</h2>

        <p style={S.p}>
          KNN is not a general-purpose algorithm in modern ML.
          It is slow at prediction time, sensitive to irrelevant features,
          and breaks down in high dimensions. But it has genuine use cases
          where it outperforms more complex algorithms.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.3)',
            borderRadius: 8, padding: '14px 16px',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#00e676', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
              KNN genuinely wins ✓
            </div>
            {[
              'Recommendation systems — nearest-neighbour collaborative filtering',
              'Anomaly detection — points far from all neighbours are outliers',
              'Low-dimensional data (< 20 features) with non-linear patterns',
              'When you need a fast baseline to compare against',
              'Image similarity search (with learned embeddings, not raw pixels)',
              'Small datasets where tree/ensemble overhead is not worth it',
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
              Use something else ✗
            </div>
            {[
              'Large datasets — prediction is O(n) per query, gets slow fast',
              'High dimensions (> 20 features) — curse of dimensionality',
              'Many irrelevant features — noise kills distance meaning',
              'Need feature importance — KNN provides none',
              'Need fast predictions in production — every query scans all data',
              'Tabular ML competitions — XGBoost/RF almost always wins',
            ].map((item, i) => (
              <div key={i} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 5, lineHeight: 1.5 }}>
                • {item}
              </div>
            ))}
          </div>
        </div>

        <h3 style={S.h3}>Speed up KNN for production: approximate nearest neighbours</h3>

        <CodeBlock code={`import numpy as np
from sklearn.neighbors import KNeighborsRegressor, BallTree, KDTree
from sklearn.preprocessing import StandardScaler
import time

np.random.seed(42)
n_train = 10_000
n_query = 1000

X_train = np.random.randn(n_train, 5)
y_train = np.random.randn(n_train)
X_query = np.random.randn(n_query, 5)

sc = StandardScaler()
X_tr_sc = sc.fit_transform(X_train)
X_qu_sc = sc.transform(X_query)

# ── algorithm parameter controls the search structure ─────────────────
# 'brute':    compute all distances — O(n) per query, exact, slow for large n
# 'ball_tree': partition space into nested hyperspheres — faster for low-dim
# 'kd_tree':  partition space into axis-aligned boxes — fastest for very low-dim
# 'auto':     sklearn picks the best based on data characteristics

print("KNN algorithm comparison (10,000 training points, 1,000 queries):")
print(f"{'Algorithm':<15} {'Fit time':>12} {'Query time':>12} {'Speed vs brute':>16}")
print("─" * 58)

brute_time = None
for algo in ['brute', 'kd_tree', 'ball_tree', 'auto']:
    knn = KNeighborsRegressor(n_neighbors=10, algorithm=algo)

    t0 = time.time()
    knn.fit(X_tr_sc, y_train)
    fit_time = time.time() - t0

    t0 = time.time()
    knn.predict(X_qu_sc)
    query_time = time.time() - t0

    if algo == 'brute':
        brute_time = query_time
    speedup = brute_time / query_time if brute_time else 1.0
    print(f"  {algo:<13}  {fit_time:>10.4f}s  {query_time:>10.4f}s  {speedup:>13.1f}×")

# ── leaf_size: BallTree/KDTree trade-off ─────────────────────────────
# Smaller leaf_size → deeper tree → faster query but more memory
# Larger leaf_size → shallower tree → less memory but more brute-force at leaves
print("\nleaf_size effect on BallTree query time:")
for leaf in [5, 10, 30, 50, 100]:
    knn = KNeighborsRegressor(n_neighbors=10, algorithm='ball_tree', leaf_size=leaf)
    knn.fit(X_tr_sc, y_train)
    t0 = time.time()
    knn.predict(X_qu_sc)
    qt = time.time() - t0
    print(f"  leaf_size={leaf:<5}: {qt:.4f}s")`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common KNN error — explained and fixed</h2>

        <ErrorBlock
          error="KNN accuracy is terrible — barely better than random guessing"
          cause="Almost always caused by not scaling features. KNN computes Euclidean distance. A feature with values 0–5000 (like price in rupees) contributes 5000² = 25 million to the squared distance. A feature with values 0–1 contributes at most 1. The large-scale feature completely dominates distance calculations and the model ignores everything else."
          fix="Always put StandardScaler inside a Pipeline before KNeighborsClassifier or KNeighborsRegressor. After scaling, every feature has mean=0 and std=1 — they all contribute equally to distances. This single fix often improves KNN accuracy by 20–40% on mixed-scale datasets."
        />

        <ErrorBlock
          error="KNN prediction is extremely slow in production — taking seconds per request"
          cause="Default KNN (algorithm='brute') computes the distance from every query point to every training point. With 100,000 training points and 50 features, each prediction requires 100,000 distance calculations. At 1,000 predictions per second this becomes the bottleneck."
          fix="Switch to algorithm='ball_tree' or algorithm='kd_tree' which partition the training space into a tree structure, reducing average query complexity from O(n) to O(log n). For production at very large scale, use approximate nearest neighbour libraries like FAISS or Annoy which trade small accuracy losses for 100× speed improvements."
        />

        <ErrorBlock
          error="KNN with k=1 has 100% training accuracy but poor test accuracy"
          cause="With k=1, every training point's nearest neighbour is itself — so the model always predicts the exact correct label for training data. This is perfect overfitting. The model has memorised every training example instead of learning a general pattern."
          fix="Never use k=1 for evaluation — it is meaningless. Use cross-validation to find the optimal k: cross_val_score(KNeighborsRegressor(n_neighbors=k), ...). Start with k=sqrt(n_train) and tune around that value. Use odd k for binary classification to avoid tie votes."
        />

        <ErrorBlock
          error="ValueError: Expected 2D array, got 1D array instead when calling predict"
          cause="You passed a single sample as a 1D array (shape (n_features,)) instead of a 2D array (shape (1, n_features)). sklearn's predict() always expects a 2D array — even for a single sample."
          fix="Reshape a single sample before predicting: model.predict(x.reshape(1, -1)). Or use np.array([x]) which creates a (1, n_features) array. For pandas: model.predict(df.iloc[[0]]) — double brackets keep it as a DataFrame with shape (1, n_features)."
        />
      </div>

      <Div />

      {/* ══ SECTION 9 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          KNN asks its neighbours. Naive Bayes asks Bayes' theorem.
        </h2>

        <p style={S.p}>
          KNN is a distance-based algorithm — it makes no assumptions about
          the distribution of data, it just measures proximity.
          Naive Bayes is the opposite — it is a probabilistic algorithm that
          makes explicit assumptions about how features are distributed,
          then uses Bayes' theorem to compute the probability of each class.
          Despite the "naive" independence assumption that is almost always wrong,
          it works surprisingly well for text classification and spam detection.
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
              Next — Module 27 · Classical ML
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Naive Bayes — Probabilistic Text Classification
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Bayes theorem applied to classification. Why the naive independence
              assumption works surprisingly well for spam and document classification.
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
          'KNN has no training phase — "training" means storing the data. All computation happens at prediction time: find k nearest training points, aggregate their labels. This makes training instant but prediction slow on large datasets.',
          'KNN is one of the most scaling-sensitive algorithms in all of sklearn. Unscaled features completely break distance calculations. Always put StandardScaler in a Pipeline before any KNN model — this is the single most impactful thing you can do.',
          'k controls the bias-variance trade-off directly. k=1 memorises every training point (zero bias, maximum variance, 100% training accuracy). k=n predicts the global average (maximum bias, zero variance). Start with k=sqrt(n_train) and tune with cross-validation.',
          'Use weights="distance" instead of the default weights="uniform". Closer neighbours are more informative than distant ones — distance weighting consistently improves KNN performance at almost no cost.',
          'The curse of dimensionality is KNN\'s fundamental limit. In high dimensions all points become approximately equidistant, making nearest neighbours meaningless. For datasets with more than ~20 features, apply PCA to reduce dimensions before KNN.',
          'KNN genuinely wins at recommendation (collaborative filtering), anomaly detection (far from all neighbours = anomaly), and low-dimensional non-linear problems. For large datasets, tabular ML, or high-dimensional data, XGBoost or Random Forest will almost always outperform it.',
        ]}
      />
    </LearnLayout>
  )
}