import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'K-Means Clustering — Customer Segmentation — Chaduvuko',
  description:
    'Finding hidden groups in data without labels. Inertia, elbow method, silhouette scores, and when clustering is and is not the right approach — built from plain English first.',
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

export default function KMeansClusteringPage() {
  return (
    <LearnLayout
      title="K-Means Clustering — Customer Segmentation"
      description="Finding hidden groups in data without labels. Inertia, elbow method, silhouette scores, and when clustering is and is not the right approach."
      section="Classical ML"
      readTime="25–30 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="classical-ml" topic="kmeans-clustering" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — what problem does this solve?</span>
        <h2 style={S.h2}>
          Every algorithm so far required labels. K-Means does not.
          It finds hidden groups in your data that you never told it to look for.
        </h2>

        <p style={S.p}>
          Flipkart has 300 million registered customers. Nobody has manually
          labelled them as "budget buyer", "premium shopper", "deal hunter",
          or "occasional visitor." Those labels do not exist anywhere in the database.
          But the patterns that define those groups are absolutely there —
          in the purchase history, order frequency, average spend, and browsing behaviour.
        </p>

        <p style={S.p}>
          Every algorithm we have covered so far was supervised — you provided
          the correct labels during training and the algorithm learned to
          reproduce them. K-Means is unsupervised — you provide only the features,
          no labels, and the algorithm discovers structure on its own.
          The "structure" it finds is groups of customers who are more similar
          to each other than to customers in other groups.
        </p>

        <p style={S.p}>
          Once you have those groups, you can give them meaningful names.
          The group with high spend and high frequency becomes "premium".
          The group with many browsing sessions but few purchases becomes "window shoppers".
          Now every customer has a segment — a label — without anyone ever
          manually labelling a single customer.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A new teacher receives 30 students on the first day with no prior information.
            She watches them for a week. Without anyone telling her,
            she notices three natural groups forming:
            students who always sit up front and answer questions,
            students who work quietly at the back,
            and students who are social and work in groups.
            She did not impose these categories — she discovered them
            from the students' natural behaviour.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            That is clustering. No labels given. Groups discovered from the data itself.
            K-Means is the most widely used algorithm for doing this at scale.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          K-Means answers a specific question: given that there are k groups
          in this data, which group does each point belong to?
          You must choose k in advance — or use the elbow method and silhouette
          scores to find a good k. This module teaches both.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — HOW K-MEANS WORKS ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The algorithm step by step</span>
        <h2 style={S.h2}>How K-Means works — four steps, repeated until convergence</h2>

        <p style={S.p}>
          K-Means is one of the simplest ML algorithms to understand.
          There are no weights to learn, no gradients to compute.
          Just four steps repeated until nothing changes.
        </p>

        <VisualBox label="K-Means algorithm — step by step on Flipkart customers">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              {
                step: '1',
                title: 'Initialise k centroids randomly',
                detail: 'Pick k random points from the data as starting cluster centres. The choice of starting points matters — bad starts lead to suboptimal clusters. KMeans++ (the default in sklearn) picks starting points that are far apart, dramatically reducing this problem.',
                color: '#378ADD',
              },
              {
                step: '2',
                title: 'Assign each point to the nearest centroid',
                detail: 'For every customer, compute the distance to each of the k centroids. Assign the customer to the cluster whose centroid is closest. This is the "E step" — assignment.',
                color: '#1D9E75',
              },
              {
                step: '3',
                title: 'Move each centroid to the mean of its assigned points',
                detail: 'For each cluster, compute the mean of all customers assigned to it. Move the centroid to that mean. A centroid is now exactly in the middle of its cluster. This is the "M step" — update.',
                color: '#D85A30',
              },
              {
                step: '4',
                title: 'Repeat steps 2–3 until centroids stop moving',
                detail: 'After each update, assignments may change — some customers move to a different cluster. Recompute centroids. Repeat. When no customer changes cluster between iterations, the algorithm has converged. Typically 10–100 iterations.',
                color: '#BA7517',
              },
            ].map((item, i) => (
              <div key={item.step} style={{
                display: 'flex', gap: 16, padding: '14px 0',
                borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
                alignItems: 'flex-start',
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

# ── K-Means from scratch — every step visible ─────────────────────────
class KMeansScratch:
    """
    K-Means clustering built from scratch.
    Shows every step: init → assign → update → repeat.
    """

    def __init__(self, k: int = 3, max_iter: int = 100,
                 tol: float = 1e-4, random_state: int = 42):
        self.k            = k
        self.max_iter     = max_iter
        self.tol          = tol
        self.random_state = random_state
        self.centroids    = None
        self.labels_      = None
        self.inertia_     = None
        self.n_iter_      = 0

    def fit(self, X: np.ndarray):
        rng = np.random.default_rng(self.random_state)

        # Step 1: Initialise — pick k random points as starting centroids
        idx = rng.choice(len(X), size=self.k, replace=False)
        self.centroids = X[idx].copy()

        for iteration in range(self.max_iter):
            # Step 2: Assign each point to nearest centroid
            distances = np.array([
                np.linalg.norm(X - centroid, axis=1)
                for centroid in self.centroids
            ])  # shape: (k, n_samples)
            labels = np.argmin(distances, axis=0)  # closest centroid per point

            # Step 3: Move centroids to mean of their assigned points
            new_centroids = np.array([
                X[labels == j].mean(axis=0) if (labels == j).sum() > 0
                else self.centroids[j]   # keep centroid if no points assigned
                for j in range(self.k)
            ])

            # Step 4: Check convergence — did centroids move?
            shift = np.linalg.norm(new_centroids - self.centroids)
            self.centroids = new_centroids
            self.labels_   = labels
            self.n_iter_   = iteration + 1

            if shift < self.tol:
                break

        # Inertia: sum of squared distances to nearest centroid
        self.inertia_ = sum(
            np.sum((X[labels == j] - self.centroids[j]) ** 2)
            for j in range(self.k)
            if (labels == j).sum() > 0
        )
        return self

    def predict(self, X: np.ndarray) -> np.ndarray:
        distances = np.array([
            np.linalg.norm(X - centroid, axis=1)
            for centroid in self.centroids
        ])
        return np.argmin(distances, axis=0)


# ── Test on Flipkart customer data ─────────────────────────────────────
np.random.seed(42)
n = 1000

# Two features: order frequency and average spend
order_freq  = np.concatenate([
    np.random.normal(2,  1,   n//3),    # occasional buyers
    np.random.normal(8,  1.5, n//3),    # regular buyers
    np.random.normal(20, 2,   n//3),    # power buyers
])
avg_spend = np.concatenate([
    np.random.normal(300,  80,  n//3),  # budget
    np.random.normal(800,  150, n//3),  # mid-range
    np.random.normal(2500, 400, n//3),  # premium
])
X = np.column_stack([order_freq, avg_spend])

# Scale first — K-Means is distance-based
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_sc = sc.fit_transform(X)

# From-scratch
km_scratch = KMeansScratch(k=3, random_state=42)
km_scratch.fit(X_sc)
print(f"From-scratch K-Means:")
print(f"  Converged in {km_scratch.n_iter_} iterations")
print(f"  Inertia: {km_scratch.inertia_:.2f}")
print(f"  Cluster sizes: {np.bincount(km_scratch.labels_)}")

# sklearn verification
from sklearn.cluster import KMeans
km_sk = KMeans(n_clusters=3, random_state=42, n_init=10)
km_sk.fit(X_sc)
print(f"\nsklearn KMeans:")
print(f"  Inertia: {km_sk.inertia_:.2f}")
print(f"  Cluster sizes: {np.bincount(km_sk.labels_)}")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — INERTIA AND CHOOSING K ═════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>How K-Means measures quality</span>
        <h2 style={S.h2}>Inertia — the objective K-Means minimises</h2>

        <p style={S.p}>
          K-Means minimises <strong style={{ color: '#378ADD' }}>inertia</strong> —
          the sum of squared distances from each point to its assigned centroid.
          Low inertia means points are close to their cluster centres —
          tight, compact clusters. High inertia means clusters are loose and spread out.
        </p>

        <p style={S.p}>
          The problem: inertia always decreases as k increases.
          With k = n (one cluster per point), inertia is exactly zero —
          every point is its own centroid. But k = n is a useless clustering.
          You need a way to find the right k — where adding more clusters
          stops meaningfully improving the structure.
          That is the elbow method.
        </p>

        <VisualBox label="The elbow method — inertia vs k, find the bend">
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <svg width="300" height="200" viewBox="0 0 300 200">
              {/* Axes */}
              <line x1="40" y1="170" x2="280" y2="170" stroke="#555" strokeWidth="1" />
              <line x1="40" y1="20"  x2="40"  y2="170" stroke="#555" strokeWidth="1" />
              {/* Axis labels */}
              <text x="160" y="190" textAnchor="middle" fontSize="10" fill="#888" fontFamily="monospace">k (number of clusters)</text>
              <text x="12" y="100" fontSize="10" fill="#888" fontFamily="monospace" transform="rotate(-90,12,100)">inertia</text>
              {/* k labels */}
              {[1,2,3,4,5,6,7,8].map((k, i) => (
                <text key={k} x={40 + i*34} y="182" textAnchor="middle" fontSize="9" fill="#888" fontFamily="monospace">{k}</text>
              ))}
              {/* Elbow curve */}
              <path d="M 40 30 Q 74 40 108 75 Q 142 105 176 125 Q 210 138 244 148 Q 262 152 278 155"
                fill="none" stroke="#378ADD" strokeWidth="2.5" />
              {/* Points on curve */}
              {[
                [40, 30], [74, 42], [108, 75], [142, 105],
                [176, 125], [210, 138], [244, 148], [278, 155],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="4" fill="#378ADD" />
              ))}
              {/* Elbow highlight at k=3 */}
              <circle cx="108" cy="75" r="8" fill="none" stroke="#00e676" strokeWidth="2" />
              <line x1="108" y1="75" x2="108" y2="170" stroke="#00e676" strokeWidth="1.5" strokeDasharray="4,3" />
              <text x="112" y="90" fontSize="9" fill="#00e676" fontFamily="monospace">elbow</text>
              <text x="100" y="105" fontSize="9" fill="#00e676" fontFamily="monospace">k=3</text>
            </svg>
            <div style={{ flex: 1, minWidth: 160 }}>
              <p style={{ ...S.ps, marginBottom: 10 }}>
                Plot inertia for k=1 to k=10.
                Find the point where the curve bends sharply —
                the "elbow". Adding more clusters after this point
                gives diminishing returns.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { k: 'k=1', note: 'One big cluster — useless', color: '#ff4757' },
                  { k: 'k=2', note: 'Still too few', color: '#D85A30' },
                  { k: 'k=3', note: 'Elbow — big drop ends here', color: '#00e676' },
                  { k: 'k=4+', note: 'Small marginal gain — not worth it', color: '#888' },
                ].map((row) => (
                  <div key={row.k} style={{ display: 'flex', gap: 10 }}>
                    <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: row.color, minWidth: 35 }}>{row.k}</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>{row.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score, davies_bouldin_score

np.random.seed(42)
n = 2000

# Flipkart customer features
order_freq   = np.concatenate([np.random.normal(2,1,n//4), np.random.normal(8,1.5,n//4),
                                np.random.normal(20,2,n//4), np.random.normal(5,1,n//4)])
avg_spend    = np.concatenate([np.random.normal(300,80,n//4), np.random.normal(800,150,n//4),
                                np.random.normal(2500,400,n//4), np.random.normal(1200,200,n//4)])
n_categories = np.concatenate([np.random.normal(1.5,0.5,n//4), np.random.normal(3,0.8,n//4),
                                np.random.normal(6,1,n//4), np.random.normal(4,1,n//4)])
X = np.column_stack([order_freq, avg_spend, n_categories])

sc   = StandardScaler()
X_sc = sc.fit_transform(X)

# ── Elbow method ──────────────────────────────────────────────────────
print("K-Means evaluation metrics:")
print(f"{'k':<5} {'Inertia':>12} {'Silhouette':>12} {'Davies-Bouldin':>16}")
print("─" * 48)

inertias, silhouettes, db_scores = [], [], []
K_range = range(2, 11)

for k in K_range:
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    labels = km.fit_predict(X_sc)

    inertia   = km.inertia_
    sil       = silhouette_score(X_sc, labels, sample_size=500)
    db        = davies_bouldin_score(X_sc, labels)

    inertias.append(inertia)
    silhouettes.append(sil)
    db_scores.append(db)

    # Inertia drop from previous k
    drop = '' if k == 2 else f"  (Δ={inertias[-2]-inertias[-1]:.0f})"
    print(f"  {k:<3}  {inertia:>12.1f} {sil:>12.4f} {db:>14.4f}{drop}")

# ── Which k is best? ──────────────────────────────────────────────────
best_sil    = K_range[np.argmax(silhouettes)]
best_db     = K_range[np.argmin(db_scores)]
print(f"\nBest k by silhouette score:    k={best_sil}  (higher is better)")
print(f"Best k by Davies-Bouldin:      k={best_db}   (lower is better)")

# ── Inertia drop percentage ────────────────────────────────────────────
print("\nInertia % drop per additional cluster:")
for i in range(1, len(inertias)):
    drop_pct = (inertias[i-1] - inertias[i]) / inertias[i-1] * 100
    bar = '█' * int(drop_pct / 2)
    flag = ' ← elbow likely here' if drop_pct < 10 and drop_pct > 5 else ''
    print(f"  k={i+2}: {bar} {drop_pct:.1f}%{flag}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — SILHOUETTE SCORE ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>A better evaluation metric</span>
        <h2 style={S.h2}>Silhouette score — measures cluster quality without labels</h2>

        <p style={S.p}>
          The elbow method is visual and subjective — different people
          see the elbow at different places. The silhouette score is
          a quantitative metric that measures clustering quality
          for each individual point and averages them.
        </p>

        <p style={S.p}>
          For each point, the silhouette score measures:
          how close is it to points in its own cluster (a)
          versus how close is it to points in the nearest other cluster (b)?
          A score near +1 means the point is well inside its cluster and
          far from all others — perfect assignment.
          A score near 0 means the point is on the boundary between two clusters.
          A score near −1 means the point was probably assigned to the wrong cluster.
        </p>

        <ConceptBox title="Silhouette score formula — one number per point">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2 }}>
            <div style={{ color: '#378ADD', marginBottom: 6 }}>
              s(i) = (b(i) − a(i)) / max(a(i), b(i))
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: 'var(--muted)' }}>
              <div>a(i) = mean distance from point i to all other points in the SAME cluster</div>
              <div>b(i) = mean distance from point i to all points in the NEAREST other cluster</div>
              <div style={{ color: '#1D9E75' }}>s(i) = +1.0 → perfectly placed, deep inside its cluster</div>
              <div style={{ color: '#BA7517' }}>s(i) =  0.0 → on the boundary between two clusters</div>
              <div style={{ color: '#ff4757' }}>s(i) = -1.0 → probably in the wrong cluster</div>
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score, silhouette_samples

np.random.seed(42)
n = 1500
order_freq = np.concatenate([np.random.normal(2,1,n//3),
                              np.random.normal(8,1.5,n//3),
                              np.random.normal(20,2,n//3)])
avg_spend  = np.concatenate([np.random.normal(300,80,n//3),
                              np.random.normal(800,150,n//3),
                              np.random.normal(2500,400,n//3)])
X = np.column_stack([order_freq, avg_spend])
sc = StandardScaler()
X_sc = sc.fit_transform(X)

# ── Silhouette analysis ────────────────────────────────────────────────
for k in [2, 3, 4, 5]:
    km     = KMeans(n_clusters=k, random_state=42, n_init=10)
    labels = km.fit_predict(X_sc)

    # Overall silhouette
    avg_sil = silhouette_score(X_sc, labels)

    # Per-sample silhouette
    sample_sil = silhouette_samples(X_sc, labels)

    print(f"\nk={k}  Average silhouette: {avg_sil:.4f}")
    for cluster_id in range(k):
        cluster_sil = sample_sil[labels == cluster_id]
        below_avg   = (cluster_sil < avg_sil).sum()
        print(f"  Cluster {cluster_id}: n={len(cluster_sil):4d}  "
              f"mean_sil={cluster_sil.mean():.4f}  "
              f"below_avg={below_avg} ({below_avg/len(cluster_sil)*100:.0f}%)")

# ── Final model with best k ───────────────────────────────────────────
best_k  = 3   # from analysis above
km_best = KMeans(n_clusters=best_k, random_state=42, n_init=20)
labels  = km_best.fit_predict(X_sc)

# Interpret clusters — what does each group look like?
import pandas as pd
df_clustered = pd.DataFrame({
    'order_freq': order_freq,
    'avg_spend':  avg_spend,
    'cluster':    labels,
})
print("\nCluster profiles:")
print(df_clustered.groupby('cluster')[['order_freq','avg_spend']].agg(['mean','std']).round(1))`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — CUSTOMER SEGMENTATION IN PRACTICE ═════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The real use case</span>
        <h2 style={S.h2}>Flipkart customer segmentation — end to end</h2>

        <p style={S.p}>
          Customer segmentation is the most common application of K-Means
          in Indian e-commerce. The output is not just cluster numbers —
          it is actionable customer groups that the marketing, product,
          and growth teams can use. Budget buyers get different promotions
          than premium buyers. Churning customers get re-engagement campaigns.
          Window shoppers get conversion-focused nudges.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
from sklearn.decomposition import PCA
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 5000

# ── Flipkart customer feature matrix ──────────────────────────────────
df_customers = pd.DataFrame({
    'orders_last_90d':     np.abs(np.random.normal(8, 6, n)).clip(0, 50).astype(int),
    'avg_order_value':     np.abs(np.random.normal(900, 700, n)).clip(100, 8000).round(0),
    'total_spend_90d':     np.abs(np.random.normal(7000, 6000, n)).clip(0, 80000).round(0),
    'n_categories':        np.abs(np.random.normal(3, 2, n)).clip(1, 15).astype(int),
    'app_sessions_30d':    np.abs(np.random.normal(12, 10, n)).clip(0, 80).astype(int),
    'cart_abandon_rate':   np.random.uniform(0, 1, n).round(2),
    'days_since_last_order': np.abs(np.random.normal(20, 25, n)).clip(0, 180).astype(int),
    'return_rate':         np.random.uniform(0, 0.4, n).round(2),
    'coupon_usage_rate':   np.random.uniform(0, 1, n).round(2),
    'rating_avg':          np.random.uniform(3.5, 5.0, n).round(1),
})

# Inject real segment patterns
seg_mask = np.random.choice(4, n, p=[0.30, 0.25, 0.25, 0.20])
# Segment 0: budget/occasional — low spend, high coupon, high abandon
df_customers.loc[seg_mask==0, 'avg_order_value']  = np.random.normal(300, 80, (seg_mask==0).sum()).clip(100)
df_customers.loc[seg_mask==0, 'coupon_usage_rate'] = np.random.uniform(0.6, 1.0, (seg_mask==0).sum())
df_customers.loc[seg_mask==0, 'cart_abandon_rate'] = np.random.uniform(0.5, 0.9, (seg_mask==0).sum())
# Segment 1: regular mid-tier
df_customers.loc[seg_mask==1, 'avg_order_value']  = np.random.normal(900, 200, (seg_mask==1).sum()).clip(400)
df_customers.loc[seg_mask==1, 'orders_last_90d']  = np.random.normal(10, 3, (seg_mask==1).sum()).clip(3).astype(int)
# Segment 2: premium power buyers
df_customers.loc[seg_mask==2, 'avg_order_value']  = np.random.normal(3000, 800, (seg_mask==2).sum()).clip(1500)
df_customers.loc[seg_mask==2, 'orders_last_90d']  = np.random.normal(20, 4, (seg_mask==2).sum()).clip(8).astype(int)
df_customers.loc[seg_mask==2, 'n_categories']     = np.random.normal(7, 2, (seg_mask==2).sum()).clip(3).astype(int)
# Segment 3: churning — high recency, low activity
df_customers.loc[seg_mask==3, 'days_since_last_order'] = np.random.normal(90, 30, (seg_mask==3).sum()).clip(45).astype(int)
df_customers.loc[seg_mask==3, 'app_sessions_30d']      = np.random.normal(2, 1, (seg_mask==3).sum()).clip(0).astype(int)

# ── Scale features ────────────────────────────────────────────────────
sc      = StandardScaler()
X_sc    = sc.fit_transform(df_customers)

# ── Find best k ───────────────────────────────────────────────────────
print("Silhouette scores for k=2..8:")
for k in range(2, 9):
    km  = KMeans(n_clusters=k, random_state=42, n_init=10)
    lbl = km.fit_predict(X_sc)
    sil = silhouette_score(X_sc, lbl, sample_size=1000)
    bar = '█' * int(sil * 60)
    print(f"  k={k}: {bar} {sil:.4f}")

# ── Final model with k=4 ──────────────────────────────────────────────
km_final  = KMeans(n_clusters=4, random_state=42, n_init=20)
df_customers['segment'] = km_final.fit_predict(X_sc)

# ── Profile each segment ──────────────────────────────────────────────
profile = df_customers.groupby('segment').agg(
    n_customers        = ('orders_last_90d', 'count'),
    avg_order_value    = ('avg_order_value', 'mean'),
    orders_90d         = ('orders_last_90d', 'mean'),
    total_spend_90d    = ('total_spend_90d', 'mean'),
    days_since_order   = ('days_since_last_order', 'mean'),
    coupon_rate        = ('coupon_usage_rate', 'mean'),
    cart_abandon       = ('cart_abandon_rate', 'mean'),
    app_sessions       = ('app_sessions_30d', 'mean'),
).round(1)

print("\nSegment profiles:")
print(profile.to_string())

# ── Name the segments ─────────────────────────────────────────────────
# Sort by avg_order_value to assign meaningful names
sorted_segs = profile['avg_order_value'].sort_values()
seg_names = {}
seg_names[sorted_segs.index[0]] = 'Budget Buyers'
seg_names[sorted_segs.index[1]] = 'Mid-Tier Regular'
seg_names[sorted_segs.index[2]] = 'Premium Power Buyer'
# Churning: highest days_since_order
churn_seg = profile['days_since_order'].idxmax()
seg_names[churn_seg] = 'At-Risk / Churning'
# Fill remaining
for seg in range(4):
    if seg not in seg_names:
        seg_names[seg] = f'Segment {seg}'

df_customers['segment_name'] = df_customers['segment'].map(seg_names)
print("\nSegment sizes and names:")
print(df_customers['segment_name'].value_counts().to_string())`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — LIMITATIONS AND ALTERNATIVES ═══════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>When K-Means fails</span>
        <h2 style={S.h2}>Three situations where K-Means gives wrong answers</h2>

        <p style={S.p}>
          K-Means is simple and fast but has three hard limitations.
          Knowing them saves you from deploying a clustering that looks plausible
          but is mathematically wrong for your data.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[
            {
              problem: 'Non-spherical clusters',
              color: '#D85A30',
              desc: 'K-Means assumes clusters are round blobs of equal size. It fails completely on ring-shaped clusters (Module 26 showed this for Spectral Clustering), elongated ellipses, or interleaved crescents. K-Means draws Voronoi boundaries (straight lines equidistant between centroids) — these cannot capture curved cluster shapes.',
              fix: 'Use DBSCAN (density-based, finds arbitrary shapes) or Spectral Clustering (eigenvector-based, handles non-convex clusters).',
            },
            {
              problem: 'Clusters of different sizes or densities',
              color: '#BA7517',
              desc: 'K-Means tends to split large clusters into multiple pieces while merging small adjacent clusters. The centroid of a very large cluster may be pulled toward dense regions, causing boundary misassignment for points at the edges.',
              fix: 'Use Gaussian Mixture Models (GMM) which model each cluster as a Gaussian with its own covariance matrix — handles different sizes and orientations.',
            },
            {
              problem: 'Sensitive to outliers',
              color: '#ff4757',
              desc: 'The centroid is the mean — outliers pull it toward themselves. One transaction worth ₹50 lakh in a dataset of ₹500 average transactions will pull the "high-value" centroid toward it, making the cluster definition unstable and unrepresentative.',
              fix: 'Use K-Medoids (PAM) which uses actual data points as cluster centres, not means — robust to outliers. Or remove outliers before clustering.',
            },
          ].map((item) => (
            <div key={item.problem} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '13px 16px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 6 }}>
                {item.problem}
              </div>
              <p style={{ ...S.ps, marginBottom: 6 }}>{item.desc}</p>
              <div style={{ fontSize: 11, color: '#1D9E75', fontFamily: 'var(--font-mono)' }}>
                Alternative: {item.fix}
              </div>
            </div>
          ))}
        </div>

        <CodeBlock code={`import numpy as np
from sklearn.cluster import KMeans, DBSCAN
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_moons, make_circles
from sklearn.metrics import adjusted_rand_score
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)

# ── K-Means fails on non-spherical shapes ─────────────────────────────
# Rings — K-Means cannot separate inner from outer
X_rings, y_rings = make_circles(n_samples=500, noise=0.05, factor=0.4, random_state=42)
sc = StandardScaler()
X_rings_sc = sc.fit_transform(X_rings)

km_rings   = KMeans(n_clusters=2, random_state=42, n_init=10).fit_predict(X_rings_sc)
dbscan_rings = DBSCAN(eps=0.3, min_samples=5).fit_predict(X_rings_sc)

km_ari   = adjusted_rand_score(y_rings, km_rings)
db_ari   = adjusted_rand_score(y_rings, dbscan_rings)
print(f"Ring-shaped clusters:")
print(f"  K-Means ARI:  {km_ari:.4f}  (1.0 = perfect, 0 = random)")
print(f"  DBSCAN ARI:   {db_ari:.4f}  ← DBSCAN handles non-convex shapes")

# ── K-Means with outliers ─────────────────────────────────────────────
# Add 10 extreme outliers to customer data
X_clean = np.column_stack([
    np.random.normal(4, 1, 200),    # cluster A
    np.random.normal(4, 1, 200),
])
X_outliers = np.random.uniform(30, 50, (10, 2))   # extreme outliers
X_all = np.vstack([X_clean, X_outliers])
X_all_sc = StandardScaler().fit_transform(X_all)

km_no_outlier  = KMeans(n_clusters=2, random_state=42).fit(X_all_sc)
# Without outliers — what the centroid should be
km_clean_only  = KMeans(n_clusters=1, random_state=42).fit(
    StandardScaler().fit_transform(X_clean)
)

print(f"\nOutlier effect on centroids:")
print(f"  Clean centroid:          {StandardScaler().fit_transform(X_clean).mean(axis=0).round(3)}")
print(f"  Centroid with outliers:  {km_no_outlier.cluster_centers_[0].round(3)}")
print("  Outliers pulled the centroid away from the true cluster centre")

# ── DBSCAN — detects outliers automatically ────────────────────────────
dbscan = DBSCAN(eps=0.5, min_samples=5)
labels_db = dbscan.fit_predict(X_all_sc)
n_noise   = (labels_db == -1).sum()
print(f"\nDBSCAN on data with outliers:")
print(f"  Points labelled as noise (outliers): {n_noise}")
print(f"  Clusters found: {len(set(labels_db)) - (1 if -1 in labels_db else 0)}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — WHAT THIS LOOKS LIKE AT WORK ══════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What this looks like at work</span>
        <h2 style={S.h2}>Day-one task — build Swiggy restaurant delivery zones</h2>

        <p style={S.p}>
          Swiggy wants to cluster restaurant locations into delivery zones
          so each delivery partner is assigned to a compact geographic area.
          This is a geographic K-Means problem — the features are latitude
          and longitude. Each cluster becomes one delivery zone.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.cluster import KMeans, MiniBatchKMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
import joblib, warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n_restaurants = 2000

# ── Bangalore restaurant locations (lat/lon) ───────────────────────────
# Bangalore centre: 12.97°N, 77.59°E — spread restaurants realistically
restaurant_df = pd.DataFrame({
    'restaurant_id': [f'R{i:05d}' for i in range(n_restaurants)],
    'name':          [f'Restaurant_{i}' for i in range(n_restaurants)],
    'lat':           np.random.normal(12.97, 0.08, n_restaurants),
    'lon':           np.random.normal(77.59, 0.10, n_restaurants),
    'avg_daily_orders': np.abs(np.random.normal(80, 40, n_restaurants)).clip(5, 300).astype(int),
    'cuisine':       np.random.choice(['South Indian','North Indian','Chinese',
                                        'Pizza','Biryani'], n_restaurants),
})

# ── For geographic clustering, scale lat/lon together ─────────────────
# lat and lon are on the same scale (~0.01 degree ≈ 1km)
# StandardScaler would distort the geography — use as-is or scale uniformly
coords = restaurant_df[['lat', 'lon']].values

# ── Find optimal number of zones ──────────────────────────────────────
print("Finding optimal delivery zones:")
for k in [5, 8, 10, 12, 15, 20]:
    km  = KMeans(n_clusters=k, random_state=42, n_init=10)
    lbl = km.fit_predict(coords)
    sil = silhouette_score(coords, lbl, sample_size=500)
    sizes = np.bincount(lbl)
    print(f"  k={k:2d}: sil={sil:.4f}  "
          f"zone sizes {sizes.min()}–{sizes.max()} restaurants  "
          f"(std={sizes.std():.0f})")

# ── Final model: 10 delivery zones ────────────────────────────────────
k_zones = 10
km_zones = KMeans(n_clusters=k_zones, random_state=42, n_init=20)
restaurant_df['zone'] = km_zones.fit_predict(coords)

# ── Zone summary ──────────────────────────────────────────────────────
zone_summary = restaurant_df.groupby('zone').agg(
    n_restaurants     = ('restaurant_id', 'count'),
    centre_lat        = ('lat', 'mean'),
    centre_lon        = ('lon', 'mean'),
    total_daily_orders= ('avg_daily_orders', 'sum'),
    lat_spread        = ('lat', 'std'),
    lon_spread        = ('lon', 'std'),
).round(4)

print("\nDelivery zone summary:")
print(zone_summary.to_string())

# ── MiniBatchKMeans — for very large datasets ─────────────────────────
# Standard KMeans: O(n×k×d×iterations)
# MiniBatchKMeans: processes random batches — much faster on 1M+ points
# Slight accuracy trade-off but usually negligible in practice

mb_km = MiniBatchKMeans(
    n_clusters=k_zones,
    batch_size=500,          # process 500 points per batch
    random_state=42,
    n_init=3,
)
mb_km.fit(coords)
mb_sil = silhouette_score(coords, mb_km.labels_, sample_size=500)
km_sil = silhouette_score(coords, km_zones.labels_, sample_size=500)
print(f"\nStandard KMeans silhouette:    {km_sil:.4f}")
print(f"MiniBatchKMeans silhouette:     {mb_sil:.4f}")
print("MiniBatchKMeans is ~10× faster with similar quality — use for 100k+ points")

# ── Save for production ────────────────────────────────────────────────
joblib.dump(km_zones, '/tmp/swiggy_delivery_zones.pkl')

# Assign new restaurant to a zone
new_restaurant = np.array([[12.94, 77.61]])   # south Bangalore
zone_id = km_zones.predict(new_restaurant)[0]
print(f"\nNew restaurant (12.94°N, 77.61°E) → Zone {zone_id}")`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common K-Means error — explained and fixed</h2>

        <ErrorBlock
          error="K-Means gives different clusters every run — results are not reproducible"
          cause="K-Means initialises centroids randomly. Different starting points produce different local minima — the algorithm converges but not always to the same solution. Without a fixed random seed, every run gives different cluster assignments even on identical data."
          fix="Always set random_state: KMeans(n_clusters=k, random_state=42). Also increase n_init (number of random initialisations): KMeans(n_init=20) — sklearn picks the best of 20 runs. The default n_init='auto' (10 for KMeans++ init) is usually sufficient, but n_init=20 gives more stable results on difficult datasets."
        />

        <ErrorBlock
          error="Clusters are dominated by one feature — all customers end up in the same cluster"
          cause="You did not scale the features. K-Means uses Euclidean distance. A feature with values 0–5000 (like spend in rupees) contributes millions to squared distance. A feature with values 0–1 (like return rate) contributes almost nothing. The clustering is entirely driven by the large-scale feature and ignores everything else."
          fix="Always apply StandardScaler before K-Means. Fit on training data only if you plan to assign new points later: sc = StandardScaler(); X_sc = sc.fit_transform(X). For geographic data (lat/lon), both dimensions are on the same scale — scaling is still recommended but less critical."
        />

        <ErrorBlock
          error="ConvergenceWarning: Number of distinct clusters found smaller than n_clusters — some clusters may be empty"
          cause="During initialisation or iteration, a cluster becomes empty — no points are assigned to one or more centroids. This happens when k is too large for the data (you asked for 20 clusters but the data only has 5 natural groups), or when outliers are initialised as centroids and no other points are nearby."
          fix="Reduce k. Use the elbow method and silhouette scores to find a k appropriate for your data. Remove outliers before clustering. Use KMeans(init='k-means++') which explicitly avoids this by selecting diverse starting centroids. If you must use a specific k, use KMeans(algorithm='lloyd') which handles empty clusters more gracefully."
        />

        <ErrorBlock
          error="Cluster labels change between runs even with the same random_state"
          cause="K-Means labels clusters arbitrarily — cluster 0 in one run might be cluster 2 in another, even if the actual groups found are identical. This is called label permutation. If you save cluster labels and then retrain, the stored labels no longer correspond to the same groups."
          fix="Do not rely on the numeric label (0, 1, 2) — rely on the cluster content (centroid values and member characteristics). After retraining, re-match clusters to their semantic meaning using centroid statistics (which cluster has the highest mean spend? that is still the premium segment). Save the centroids and a mapping function, not the raw labels."
        />
      </div>

      <Div />

      {/* ══ SECTION 9 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          K-Means groups data into clusters. PCA compresses data into fewer dimensions.
        </h2>

        <p style={S.p}>
          K-Means answers: which group does this point belong to?
          PCA (Principal Component Analysis) answers a different question:
          can I represent this data with fewer features while
          preserving most of the information?
          You have a customer with 50 features — PCA finds the 5 most
          informative directions in that 50-dimensional space and
          projects the customer onto them. The result: 5 numbers instead
          of 50, capturing 95% of the original information.
          PCA and K-Means are often used together — PCA first to reduce
          dimensions, K-Means after to find groups in the reduced space.
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
              Next — Module 33 · Classical ML
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              PCA — Dimensionality Reduction
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Turn 100 features into 10 without losing most of the information.
              Explained variance, scree plots, and when PCA helps and when it hurts.
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
          'K-Means is unsupervised — no labels required. It discovers hidden groups by iterating: assign each point to the nearest centroid, move centroids to the mean of their assigned points, repeat until convergence. The objective minimised is inertia — sum of squared distances to cluster centres.',
          'Always scale features before K-Means. It is distance-based — an unscaled feature with large values completely dominates the clustering. StandardScaler before KMeans is not optional.',
          'You must choose k in advance. Use the elbow method (plot inertia vs k, find the bend) combined with silhouette score (ranges from -1 to +1, higher is better) to choose k. There is no single correct answer — use domain knowledge to validate.',
          'Silhouette score measures how well each point fits its cluster vs the nearest other cluster. A mean score above 0.5 indicates good clustering. Scores below 0.2 suggest overlapping or poorly separated clusters.',
          'K-Means fails on non-spherical clusters (rings, crescents), clusters of very different sizes, and data with significant outliers. Alternatives: DBSCAN for arbitrary shapes, Gaussian Mixture Models for different sizes, K-Medoids for outlier robustness.',
          'For datasets above 100,000 rows, use MiniBatchKMeans instead of KMeans. It processes random mini-batches rather than the full dataset at each iteration — typically 10× faster with nearly identical clustering quality.',
        ]}
      />
    </LearnLayout>
  )
}