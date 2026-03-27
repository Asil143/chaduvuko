import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'PCA — Dimensionality Reduction — Chaduvuko',
  description:
    'Turn 100 features into 10 without losing most of the information. Explained variance, scree plots, reconstruction error, and when PCA helps and when it hurts.',
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

function ConceptBox({ title, children, color = '#7F77DD' }: {
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

export default function PCAPage() {
  return (
    <LearnLayout
      title="PCA — Dimensionality Reduction"
      description="Turn 100 features into 10 without losing most of the information. Explained variance, scree plots, reconstruction error, and when PCA helps and when it hurts."
      section="Classical ML"
      readTime="30–35 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="classical-ml" topic="pca" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — what problem does this solve?</span>
        <h2 style={S.h2}>
          You have 200 features describing each customer.
          Half of them carry the same information as each other.
          PCA finds the few directions that capture most of what matters
          and throws away the rest.
        </h2>

        <p style={S.p}>
          Flipkart's customer dataset has 200 features: order frequency,
          average spend, category preferences, browsing time, session length,
          search terms, device type, payment method, return rate,
          review history, and 190 more. Many of these carry overlapping information.
          Customers who spend more also tend to buy more often.
          Customers who browse mobile also tend to use the app.
          These correlations mean you have 200 columns but far fewer
          independent dimensions of variation.
        </p>

        <p style={S.p}>
          Training a model on 200 correlated features causes several problems.
          It is slow. The model may overfit — too many features for the
          amount of signal. Distance-based algorithms (KNN, K-Means) suffer
          from the curse of dimensionality. And visualising the data
          to understand its structure is impossible in 200 dimensions.
        </p>

        <p style={S.p}>
          PCA (Principal Component Analysis) solves all of these at once.
          It finds the directions in the 200-dimensional space along which
          the data varies the most. These directions — the principal components —
          are ordered by how much variance they capture. You keep the top k
          and discard the rest. The result: a dataset with k dimensions
          instead of 200, where those k dimensions capture most of the
          meaningful variation in the original data.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            You are photographing a 3D sculpture to put on a website.
            You can only take one photo. From most angles you capture the full
            shape — height, width, and some sense of depth. From a few bad angles
            the sculpture looks like a flat line.
            The best angle is the one that shows the most variation —
            where the sculpture looks most different from one end to the other.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            PCA finds the "best angle" to project high-dimensional data onto
            a lower-dimensional space — the projection that preserves the most
            variation. The first principal component is the direction of maximum
            variance. The second is the direction of maximum remaining variance
            perpendicular to the first. And so on.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          PCA is built on eigenvalues and eigenvectors from Module 06.
          If you have not read that module, the maths here will be opaque.
          The intuition: PCA finds the eigenvectors of the covariance matrix.
          Those eigenvectors are the principal components — the natural axes
          of maximum variation in the data.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — FOUR STEPS ══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The algorithm step by step</span>
        <h2 style={S.h2}>PCA in four steps — from raw data to reduced dimensions</h2>

        <p style={S.p}>
          PCA is one of the few ML algorithms you can fully understand
          mathematically without advanced background.
          Each of the four steps has a clear purpose.
        </p>

        <VisualBox label="PCA pipeline — four steps from 200 features to 10">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              {
                step: '1',
                title: 'Standardise the data',
                detail: 'Subtract the mean and divide by standard deviation for each feature. Without this, a feature measured in rupees (0–50,000) dominates over one measured as a proportion (0–1). Standardisation puts all features on equal footing so the covariance matrix reflects genuine relationships, not unit differences.',
                formula: 'x_std = (x − mean) / std',
                color: '#7F77DD',
              },
              {
                step: '2',
                title: 'Compute the covariance matrix',
                detail: 'The covariance matrix is a square matrix (n_features × n_features) where entry [i,j] measures how feature i and feature j vary together. Highly correlated features have large covariance. This matrix encodes the entire correlation structure of your data.',
                formula: 'C = (1/n) × Xᵀ × X   [after centering]',
                color: '#378ADD',
              },
              {
                step: '3',
                title: 'Find eigenvectors and eigenvalues of C',
                detail: 'The eigenvectors of the covariance matrix are the principal components — the directions of maximum variance. The eigenvalues tell you how much variance each direction captures. Sort both by eigenvalue, largest first. The first eigenvector points in the direction the data varies most.',
                formula: 'C × v = λ × v   →   sort by λ descending',
                color: '#1D9E75',
              },
              {
                step: '4',
                title: 'Project data onto top k eigenvectors',
                detail: 'Choose how many components k to keep (based on explained variance). Multiply the standardised data by the matrix of top k eigenvectors. The result is your new dataset with k dimensions — a rotation of the original space onto its most informative axes.',
                formula: 'X_reduced = X_std × V[:, :k]',
                color: '#D85A30',
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
                    fontFamily: 'var(--font-display)', marginBottom: 4,
                  }}>
                    {item.title}
                  </div>
                  <p style={{ ...S.ps, marginBottom: 6 }}>{item.detail}</p>
                  <div style={{
                    fontSize: 12, fontFamily: 'var(--font-mono)',
                    color: item.color, background: `${item.color}10`,
                    padding: '4px 10px', borderRadius: 4, display: 'inline-block',
                  }}>
                    {item.formula}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.preprocessing import StandardScaler

np.random.seed(42)
n = 1000

# Flipkart customer features — correlated by design
order_freq   = np.random.normal(8, 3, n)
avg_spend    = 200 + 80 * order_freq + np.random.normal(0, 150, n)   # correlated
n_categories = 1 + 0.3 * order_freq + np.random.normal(0, 1, n)
sessions     = 5 + 1.2 * order_freq + np.random.normal(0, 3, n)
return_rate  = np.random.uniform(0, 0.4, n)   # independent
coupon_rate  = np.random.uniform(0, 1, n)      # independent

X = np.column_stack([order_freq, avg_spend, n_categories,
                     sessions, return_rate, coupon_rate])
feat_names = ['order_freq', 'avg_spend', 'n_categories',
              'sessions', 'return_rate', 'coupon_rate']

# ── PCA from scratch — every step visible ─────────────────────────────

# Step 1: Standardise
sc    = StandardScaler()
X_std = sc.fit_transform(X)
print(f"Step 1 — After standardisation:")
print(f"  Mean (should be ~0): {X_std.mean(axis=0).round(3)}")
print(f"  Std  (should be ~1): {X_std.std(axis=0).round(3)}")

# Step 2: Covariance matrix
C = np.cov(X_std.T)   # (n_features, n_features)
print(f"\nStep 2 — Covariance matrix shape: {C.shape}")
print("  High covariance between correlated features:")
for i, fi in enumerate(feat_names):
    for j, fj in enumerate(feat_names):
        if i < j and abs(C[i, j]) > 0.3:
            print(f"    {fi} ↔ {fj}: {C[i,j]:.3f}")

# Step 3: Eigendecomposition
eigenvalues, eigenvectors = np.linalg.eigh(C)   # eigh for symmetric matrices
# Sort descending
idx          = np.argsort(eigenvalues)[::-1]
eigenvalues  = eigenvalues[idx]
eigenvectors = eigenvectors[:, idx]

print(f"\nStep 3 — Eigenvalues (variance per component):")
total_var = eigenvalues.sum()
for i, (ev, vec) in enumerate(zip(eigenvalues, eigenvectors.T)):
    pct = ev / total_var * 100
    bar = '█' * int(pct / 3)
    print(f"  PC{i+1}: {bar} {pct:.1f}%  (λ={ev:.4f})")

# Step 4: Project onto top 2 components
k = 2
V         = eigenvectors[:, :k]        # (n_features, k)
X_reduced = X_std @ V                  # (n_samples, k)
print(f"\nStep 4 — Projection:")
print(f"  Original shape: {X.shape}   →   Reduced shape: {X_reduced.shape}")
print(f"  Variance retained: {eigenvalues[:k].sum()/total_var*100:.1f}%")

# ── Verify against sklearn PCA ─────────────────────────────────────────
from sklearn.decomposition import PCA
pca_sk = PCA(n_components=2)
X_sk   = pca_sk.fit_transform(X_std)
print(f"\nsklearn PCA variance retained: {pca_sk.explained_variance_ratio_.sum()*100:.1f}%")
print(f"(Matches scratch implementation — same result)")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — EXPLAINED VARIANCE ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>How much information are you keeping?</span>
        <h2 style={S.h2}>Explained variance — the only number that matters when choosing k</h2>

        <p style={S.p}>
          Every eigenvalue tells you how much variance one principal component captures.
          Divide each eigenvalue by the total variance (sum of all eigenvalues)
          to get the fraction of information that component represents.
          These fractions are the explained variance ratios.
          Summing the top k gives you the total variance retained after
          reducing to k dimensions.
        </p>

        <p style={S.p}>
          The standard rule of thumb: choose k such that the cumulative
          explained variance is at least 95%. This means you retained 95%
          of the information in the original data while discarding
          all the remaining dimensions. The 5% you lose is typically noise.
        </p>

        <ConceptBox title="Reading the scree plot — where to cut off">
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <svg width="260" height="180" viewBox="0 0 260 180">
              {/* Axes */}
              <line x1="35" y1="155" x2="245" y2="155" stroke="#555" strokeWidth="1" />
              <line x1="35" y1="15"  x2="35"  y2="155" stroke="#555" strokeWidth="1" />
              <text x="140" y="172" textAnchor="middle" fontSize="9" fill="#888" fontFamily="monospace">component</text>
              <text x="10" y="90" fontSize="9" fill="#888" fontFamily="monospace" transform="rotate(-90,10,90)">variance %</text>
              {/* Bars */}
              {[
                [45, 90, '#7F77DD'],
                [80, 55, '#7F77DD'],
                [115, 25, '#7F77DD'],
                [150, 15, '#555'],
                [185, 10, '#555'],
                [220, 7, '#555'],
              ].map(([x, h, color], i) => (
                <g key={i}>
                  <rect x={x as number} y={155 - (h as number)} width="24"
                    height={h as number} fill={color as string} opacity="0.7" />
                  <text x={(x as number) + 12} y="167" textAnchor="middle"
                    fontSize="9" fill="#888" fontFamily="monospace">
                    {i + 1}
                  </text>
                </g>
              ))}
              {/* Cumulative line */}
              <path d="M 57 65 L 92 35 L 127 22 L 162 16 L 197 12 L 232 9"
                fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeDasharray="4,2" />
              {/* 95% line */}
              <line x1="35" y1="23" x2="245" y2="23"
                stroke="#00e676" strokeWidth="1" strokeDasharray="3,3" />
              <text x="240" y="21" fontSize="8" fill="#00e676" fontFamily="monospace">95%</text>
              {/* Cut-off annotation */}
              <line x1="127" y1="15" x2="127" y2="155"
                stroke="#D85A30" strokeWidth="1.5" strokeDasharray="4,3" />
              <text x="131" y="30" fontSize="8" fill="#D85A30" fontFamily="monospace">k=3</text>
              <text x="131" y="42" fontSize="8" fill="#D85A30" fontFamily="monospace">keep</text>
            </svg>
            <div style={{ flex: 1, minWidth: 150 }}>
              <p style={{ ...S.ps, marginBottom: 10 }}>
                The scree plot shows variance per component.
                The dashed green line is the 95% cumulative threshold.
                The red line shows where you cut — keep components to the left,
                discard to the right.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[
                  { label: 'Bars', color: '#7F77DD', desc: 'Variance of each PC' },
                  { label: 'Dashed line', color: '#1D9E75', desc: 'Cumulative variance' },
                  { label: 'Green horizontal', color: '#00e676', desc: '95% threshold' },
                  { label: 'Red vertical', color: '#D85A30', desc: 'Chosen cut-off' },
                ].map((row) => (
                  <div key={row.label} style={{ display: 'flex', gap: 8 }}>
                    <span style={{ fontSize: 11, color: row.color, minWidth: 110, fontFamily: 'var(--font-mono)' }}>{row.label}</span>
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>{row.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

np.random.seed(42)
n = 2000

# Flipkart customer: 20 features, many correlated
base1 = np.random.normal(0, 1, n)   # purchase behaviour axis
base2 = np.random.normal(0, 1, n)   # browsing behaviour axis
base3 = np.random.normal(0, 1, n)   # price sensitivity axis

X = np.column_stack([
    base1 + np.random.normal(0, 0.3, n),           # order_frequency
    base1 * 80 + 800 + np.random.normal(0, 100, n), # avg_spend
    base1 * 3 + 8 + np.random.normal(0, 1, n),     # orders_last_90d
    base1 * 0.5 + np.random.normal(0, 0.2, n),     # repeat_rate
    base2 + np.random.normal(0, 0.3, n),            # app_sessions
    base2 * 5 + 15 + np.random.normal(0, 3, n),    # pages_per_session
    base2 * 0.3 + np.random.normal(0, 0.2, n),     # search_rate
    base2 * 2 + np.random.normal(0, 1, n),         # wishlist_adds
    base3 + np.random.normal(0, 0.3, n),            # coupon_usage
    base3 * 0.4 + np.random.normal(0, 0.2, n),     # discount_sensitivity
    base3 * (-0.3) + np.random.normal(0, 0.2, n),  # premium_brand_pref
    np.random.normal(0, 1, n),                      # return_rate (independent)
    np.random.normal(0, 1, n),                      # review_rate
    np.random.normal(0, 1, n),                      # rating_avg
    np.random.normal(0, 1, n),                      # device_switches
    np.random.normal(0, 1, n),                      # time_of_day_pref
    np.random.normal(0, 1, n),                      # n_payment_methods
    np.random.normal(0, 1, n),                      # referral_count
    np.random.normal(0, 1, n),                      # support_contacts
    np.random.normal(0, 1, n),                      # account_age_days
])

sc   = StandardScaler()
X_sc = sc.fit_transform(X)

# ── Full PCA — examine all components ─────────────────────────────────
pca_full = PCA()
pca_full.fit(X_sc)

evr  = pca_full.explained_variance_ratio_
cumr = np.cumsum(evr)

print("Explained variance per component:")
print(f"{'PC':<6} {'Variance':>10} {'Cumulative':>12} {'Bar'}")
print("─" * 50)
for i, (var, cum) in enumerate(zip(evr, cumr)):
    bar  = '█' * int(var * 100)
    flag = ' ← 95% threshold' if cum >= 0.95 and (i == 0 or cumr[i-1] < 0.95) else ''
    flag = flag or (' ← 99% threshold' if cum >= 0.99 and (i == 0 or cumr[i-1] < 0.99) else '')
    print(f"  PC{i+1:<3}  {var*100:>8.2f}%  {cum*100:>10.2f}%  {bar}{flag}")

# ── Choose k automatically ────────────────────────────────────────────
k_95  = np.searchsorted(cumr, 0.95) + 1
k_99  = np.searchsorted(cumr, 0.99) + 1
k_90  = np.searchsorted(cumr, 0.90) + 1

print(f"\nComponents needed to retain:")
print(f"  90% variance: k={k_90}  (from {X.shape[1]} features)")
print(f"  95% variance: k={k_95}  (from {X.shape[1]} features)")
print(f"  99% variance: k={k_99}  (from {X.shape[1]} features)")

# ── Apply PCA with chosen k ────────────────────────────────────────────
pca = PCA(n_components=k_95)
X_reduced = pca.fit_transform(X_sc)

print(f"\nReduced dataset shape: {X.shape} → {X_reduced.shape}")
print(f"Variance retained: {pca.explained_variance_ratio_.sum()*100:.2f}%")

# ── n_components as variance fraction ─────────────────────────────────
# Instead of specifying k, specify minimum variance to retain
pca_auto = PCA(n_components=0.95)   # keep enough components for 95%
X_auto   = pca_auto.fit_transform(X_sc)
print(f"\nPCA(n_components=0.95): kept {pca_auto.n_components_} components")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — LOADINGS ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Interpreting the components</span>
        <h2 style={S.h2}>Component loadings — what each principal component actually means</h2>

        <p style={S.p}>
          After running PCA you have k new dimensions. But what do they mean?
          Each principal component is a linear combination of the original features.
          The <strong style={{ color: '#7F77DD' }}>loadings</strong> are the coefficients —
          how much each original feature contributes to each component.
          A large positive loading on "order_frequency" and "avg_spend" for PC1
          means PC1 measures purchasing intensity. A large loading on
          "app_sessions" and "pages_per_session" for PC2 means PC2 measures
          browsing engagement. Naming the components makes PCA results
          communicable to stakeholders.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

np.random.seed(42)
n = 2000

feat_names = [
    'order_frequency', 'avg_spend', 'orders_90d', 'repeat_rate',
    'app_sessions', 'pages_per_session', 'search_rate', 'wishlist_adds',
    'coupon_usage', 'discount_sensitivity', 'premium_brand_pref',
    'return_rate', 'review_rate', 'rating_avg', 'device_switches',
    'time_of_day_pref', 'n_payment_methods', 'referral_count',
    'support_contacts', 'account_age_days',
]

base1 = np.random.normal(0, 1, n)
base2 = np.random.normal(0, 1, n)
base3 = np.random.normal(0, 1, n)

X = np.column_stack([
    base1 + np.random.normal(0,0.3,n),
    base1*80+800+np.random.normal(0,100,n),
    base1*3+8+np.random.normal(0,1,n),
    base1*0.5+np.random.normal(0,0.2,n),
    base2+np.random.normal(0,0.3,n),
    base2*5+15+np.random.normal(0,3,n),
    base2*0.3+np.random.normal(0,0.2,n),
    base2*2+np.random.normal(0,1,n),
    base3+np.random.normal(0,0.3,n),
    base3*0.4+np.random.normal(0,0.2,n),
    base3*(-0.3)+np.random.normal(0,0.2,n),
    *[np.random.normal(0,1,n) for _ in range(9)],
])

sc    = StandardScaler()
X_sc  = sc.fit_transform(X)
pca   = PCA(n_components=5)
X_pca = pca.fit_transform(X_sc)

# ── Loadings matrix ────────────────────────────────────────────────────
# pca.components_: shape (n_components, n_features)
# components_[i, j] = loading of feature j on component i
loadings = pd.DataFrame(
    pca.components_.T,     # transpose: (n_features, n_components)
    index   = feat_names,
    columns = [f'PC{i+1}' for i in range(5)],
)

print("Top contributing features per principal component:")
for pc in ['PC1', 'PC2', 'PC3']:
    top3_pos = loadings[pc].nlargest(3)
    top3_neg = loadings[pc].nsmallest(3)
    print(f"\n  {pc} ({pca.explained_variance_ratio_[int(pc[2])-1]*100:.1f}% variance):")
    for feat, val in top3_pos.items():
        bar = '▸' * int(abs(val) * 20)
        print(f"    +{bar} {val:+.3f}  {feat}")
    for feat, val in top3_neg.items():
        bar = '◂' * int(abs(val) * 20)
        print(f"    -{bar} {val:+.3f}  {feat}")

# ── Visualise loadings as heatmap values ───────────────────────────────
print("\nLoadings heatmap (top 8 features, first 3 PCs):")
top_feats = loadings.abs().max(axis=1).nlargest(8).index
subset    = loadings.loc[top_feats, ['PC1','PC2','PC3']]

print(f"\n{'Feature':<25} {'PC1':>8} {'PC2':>8} {'PC3':>8}")
print("─" * 52)
for feat, row in subset.iterrows():
    vals = ""
    for v in row:
        # Colorize output: Green for positive, Red for negative
        color = "32" if v > 0.1 else "31" if v < -0.1 else "0"
        vals += f"  \x1b[{color}m{v:+.3f}\x1b[0m"
    print(f"  {feat:<23} {vals}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — PCA IN THE ML PIPELINE ═════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>PCA as a preprocessing step</span>
        <h2 style={S.h2}>PCA inside a Pipeline — the right way to use it before a model</h2>

        <p style={S.p}>
          PCA is most commonly used as a preprocessing step before training a model.
          Reducing from 200 features to 20 before KNN eliminates the curse
          of dimensionality. Reducing to 50 before logistic regression
          removes correlated features that cause numerical instability.
          The key rule: PCA must be fitted on training data only,
          then applied to test data. Like StandardScaler, fitting PCA on
          the full dataset leaks test information. Use a Pipeline.
        </p>

        <ConceptBox title="Leakage rule — PCA must be fit inside each CV fold">
          <p style={{ ...S.ps, marginBottom: 8 }}>
            Fitting PCA on the full dataset before splitting is data leakage —
            the same as fitting a scaler on all data before splitting.
            The principal components are computed using test set statistics.
            Always use Pipeline so PCA is refit on the training fold in each
            cross-validation split, just like every other transformer.
          </p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2, color: 'var(--muted)' }}>
            <div style={{ color: '#ff4757' }}>✗ WRONG: pca.fit(X_all); X_reduced = pca.transform(X_all); then split</div>
            <div style={{ color: '#1D9E75' }}>✓ RIGHT: Pipeline([('pca', PCA()), ('model', model)]) → cross_val_score</div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.metrics import accuracy_score
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 2000

# Simulated high-dimensional Flipkart classification:
# Predict segment (0=budget, 1=mid, 2=premium) from 50 features
base1 = np.random.normal(0, 1, n)
base2 = np.random.normal(0, 1, n)
y     = np.where(base1 > 1, 2, np.where(base1 < -1, 0, 1))

X_core = np.column_stack([base1, base2, base1+base2])
X_noise = np.random.normal(0, 1, (n, 47))   # 47 noise dimensions
X = np.hstack([X_core, X_noise])   # 50 total features

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2,
                                            stratify=y, random_state=42)

# ── Compare: no PCA vs PCA before KNN ─────────────────────────────────
print("KNN: effect of PCA preprocessing on 50-dimensional data:")
print(f"{'Pipeline':<35} {'CV Accuracy'}")
print("─" * 48)

for n_comp in [None, 30, 20, 10, 5, 3]:
    if n_comp is None:
        pipe = Pipeline([
            ('scaler', StandardScaler()),
            ('model',  KNeighborsClassifier(n_neighbors=15)),
        ])
        label = 'No PCA (50 features)'
    else:
        pipe = Pipeline([
            ('scaler', StandardScaler()),
            ('pca',    PCA(n_components=n_comp)),
            ('model',  KNeighborsClassifier(n_neighbors=15)),
        ])
        label = f'PCA → {n_comp} components'

    cv = cross_val_score(pipe, X_tr, y_tr, cv=5, scoring='accuracy').mean()
    print(f"  {label:<33}  {cv:.4f}")

# ── LogisticRegression — PCA removes multicollinearity ────────────────
print("\nLogisticRegression: effect of PCA on correlated features:")
for n_comp in [None, 10, 5, 3]:
    if n_comp is None:
        pipe = Pipeline([
            ('scaler', StandardScaler()),
            ('model',  LogisticRegression(max_iter=1000, random_state=42)),
        ])
        label = 'No PCA'
    else:
        pipe = Pipeline([
            ('scaler', StandardScaler()),
            ('pca',    PCA(n_components=n_comp)),
            ('model',  LogisticRegression(max_iter=1000, random_state=42)),
        ])
        label = f'PCA({n_comp})'

    cv = cross_val_score(pipe, X_tr, y_tr, cv=5, scoring='accuracy').mean()
    print(f"  {label:<15}: CV accuracy = {cv:.4f}")

# ── PCA for visualisation — project to 2D ─────────────────────────────
sc_viz   = StandardScaler()
X_viz_sc = sc_viz.fit_transform(X_tr)
pca_viz  = PCA(n_components=2)
X_2d     = pca_viz.fit_transform(X_viz_sc)

print(f"\n2D visualisation:")
print(f"  Original: {X_tr.shape}  →  2D: {X_2d.shape}")
print(f"  Variance retained: {pca_viz.explained_variance_ratio_.sum()*100:.1f}%")
print("  Can now plot clusters in a scatter plot — 2 axes instead of 50")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — RECONSTRUCTION ERROR ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Measuring what you lost</span>
        <h2 style={S.h2}>Reconstruction error — quantifying the information you discarded</h2>

        <p style={S.p}>
          PCA is reversible up to the information you discarded.
          You can reconstruct an approximation of the original data
          from the reduced representation. The reconstruction error —
          the difference between the original and the reconstructed data —
          tells you exactly how much information was lost.
          Low reconstruction error means the discarded components
          were mostly noise. High error means you discarded signal.
        </p>

        <CodeBlock code={`import numpy as np
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

np.random.seed(42)
n = 1000

base1 = np.random.normal(0, 1, n)
base2 = np.random.normal(0, 1, n)
X = np.column_stack([
    base1+np.random.normal(0,0.3,n),
    base1*2+np.random.normal(0,0.5,n),
    base2+np.random.normal(0,0.3,n),
    base2*1.5+np.random.normal(0,0.4,n),
    *[np.random.normal(0,1,n) for _ in range(16)],
])   # 20 features

sc   = StandardScaler()
X_sc = sc.fit_transform(X)

# ── Reconstruct from k components and measure error ───────────────────
print("Reconstruction error vs components kept:")
print(f"{'k components':<16} {'Variance kept':>14} {'MSE (recon)':>13} {'RMSE':>8}")
print("─" * 56)

for k in [1, 2, 3, 5, 8, 10, 15, 20]:
    pca   = PCA(n_components=k)
    X_red = pca.fit_transform(X_sc)         # compress: (n, 20) → (n, k)
    X_rec = pca.inverse_transform(X_red)    # reconstruct: (n, k) → (n, 20)

    mse  = np.mean((X_sc - X_rec) ** 2)
    rmse = np.sqrt(mse)
    var  = pca.explained_variance_ratio_.sum()

    bar  = '█' * int(var * 30)
    print(f"  k={k:<3}  {k:>3}/{X.shape[1]}    {bar:<30} {var*100:>5.1f}%    {mse:>8.4f}   {rmse:>6.4f}")

# ── Anomaly detection using reconstruction error ───────────────────────
# Normal customers: low reconstruction error (fit the PCA model well)
# Anomalous customers: high error (don't fit the patterns PCA found)

X_normal  = X_sc[:950]
X_anomaly = np.random.normal(5, 3, (50, 20))   # outliers — very different pattern
X_test    = np.vstack([X_normal, X_anomaly])
true_labels = np.array([0]*950 + [1]*50)        # 0=normal, 1=anomaly

# Fit PCA on "normal" training data
pca_anom = PCA(n_components=5)
pca_anom.fit(X_sc)   # fit on all — in practice, fit on known normal data only

# Reconstruction error per sample
X_rec_test = pca_anom.inverse_transform(pca_anom.transform(X_test))
rec_errors = np.mean((X_test - X_rec_test) ** 2, axis=1)

# High reconstruction error = anomaly
threshold = np.percentile(rec_errors[:950], 95)   # 95th percentile of normal errors
predicted_anomaly = (rec_errors > threshold).astype(int)

tp = ((predicted_anomaly == 1) & (true_labels == 1)).sum()
fp = ((predicted_anomaly == 1) & (true_labels == 0)).sum()
print(f"\nAnomaly detection via reconstruction error:")
print(f"  Threshold (95th pct of normal): {threshold:.4f}")
print(f"  True positives (anomalies caught): {tp}/50")
print(f"  False positives (normal flagged):  {fp}/950")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — WHEN PCA HELPS AND WHEN IT HURTS ═══════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Practical guidance</span>
        <h2 style={S.h2}>When to use PCA — and three situations where it makes things worse</h2>

        <p style={S.p}>
          PCA is a powerful tool but it is not appropriate for every problem.
          Using it blindly on every dataset is a common mistake.
          The right question before applying PCA: are there actually correlated
          features in this data that PCA can compress? And does my downstream
          algorithm benefit from reduced dimensions?
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.3)',
            borderRadius: 8, padding: '14px 16px',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#00e676', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
              PCA genuinely helps ✓
            </div>
            {[
              'KNN / K-Means — curse of dimensionality',
              'Logistic regression with correlated features',
              'Visualising high-dimensional data in 2D/3D',
              'Noisy data — small components are often noise',
              'Very wide datasets (features >> samples)',
              'Image data — pixel features are highly correlated',
              'Anomaly detection via reconstruction error',
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
              Avoid PCA when ✗
            </div>
            {[
              'Tree models — handle correlated features natively',
              'You need feature importance — components mix features',
              'Features are already independent — nothing to compress',
              'Few features (< 10) — overhead not worth it',
              'Non-linear structure — PCA only finds linear directions',
              'Categorical features — PCA assumes continuous data',
              'Interpretability required — components are uninterpretable',
            ].map((item, i) => (
              <div key={i} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 5, lineHeight: 1.5 }}>
                • {item}
              </div>
            ))}
          </div>
        </div>

        <CodeBlock code={`import numpy as np
from sklearn.decomposition import PCA, KernelPCA, TruncatedSVD
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 2000

base = np.random.normal(0, 1, (n, 3))
y    = (base[:, 0] + base[:, 1] > 0).astype(int)
X_corr = np.hstack([
    base + np.random.normal(0, 0.2, (n, 3)),
    base * 2 + np.random.normal(0, 0.3, (n, 3)),
    base * 0.5 + np.random.normal(0, 0.1, (n, 3)),
    np.random.normal(0, 1, (n, 11)),
])   # 20 features, 9 correlated

# ── PCA helps logistic regression but not Random Forest ───────────────
print("Effect of PCA on different algorithms:")
print(f"{'Algorithm':<35} {'No PCA':>10} {'With PCA':>10} {'Change'}")
print("─" * 60)

sc = StandardScaler()

for name, model in [
    ('LogisticRegression', LogisticRegression(max_iter=1000, random_state=42)),
    ('RandomForest',       RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)),
]:
    # Without PCA
    pipe_no_pca = Pipeline([('sc', StandardScaler()), ('m', model)])
    cv_no  = cross_val_score(pipe_no_pca, X_corr, y, cv=5).mean()

    # With PCA (keep 95% variance)
    pipe_pca = Pipeline([('sc', StandardScaler()), ('pca', PCA(n_components=0.95)), ('m', model)])
    cv_pca = cross_val_score(pipe_pca, X_corr, y, cv=5).mean()

    change = cv_pca - cv_no
    arrow  = '↑' if change > 0.005 else '↓' if change < -0.005 else '→'
    print(f"  {name:<33}  {cv_no:.4f}    {cv_pca:.4f}  {arrow} {abs(change):.4f}")

# ── Sparse data: TruncatedSVD instead of PCA ──────────────────────────
# PCA requires centering which destroys sparsity of sparse matrices
# TruncatedSVD = PCA without centering — works on sparse matrices
from scipy.sparse import random as sparse_random
X_sparse = sparse_random(n, 500, density=0.05, random_state=42)
y_sparse = np.random.randint(0, 2, n)

svd = TruncatedSVD(n_components=20, random_state=42)
X_dense = svd.fit_transform(X_sparse)
print(f"\nTruncatedSVD on sparse matrix:")
print(f"  {X_sparse.shape} sparse → {X_dense.shape} dense")
print(f"  Variance retained: {svd.explained_variance_ratio_.sum()*100:.1f}%")

# ── Kernel PCA — non-linear dimensionality reduction ──────────────────
from sklearn.datasets import make_circles
X_rings, y_rings = make_circles(n_samples=500, noise=0.05, factor=0.4, random_state=42)

# Standard PCA cannot separate rings (linear)
pca_linear = PCA(n_components=2)
X_lin      = pca_linear.fit_transform(X_rings)

# KernelPCA with RBF — projects to space where rings are separable
kpca   = KernelPCA(n_components=2, kernel='rbf', gamma=10)
X_kpca = kpca.fit_transform(X_rings)

lr_lin  = LogisticRegression().fit(X_lin, y_rings)
lr_kpca = LogisticRegression().fit(X_kpca, y_rings)
print(f"\nRing-shaped clusters — PCA vs KernelPCA:")
print(f"  Standard PCA accuracy:  {lr_lin.score(X_lin, y_rings):.4f}")
print(f"  KernelPCA accuracy:     {lr_kpca.score(X_kpca, y_rings):.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — FULL PRODUCTION EXAMPLE ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What this looks like at work</span>
        <h2 style={S.h2}>Day-one task — compress Flipkart customer features for segmentation</h2>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.pipeline import Pipeline
import joblib, warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 10_000

# ── High-dimensional Flipkart customer dataset: 50 features ───────────
purchase_base  = np.random.normal(0, 1, n)
browsing_base  = np.random.normal(0, 1, n)
price_base     = np.random.normal(0, 1, n)

feature_matrix = np.column_stack([
    # Purchase behaviour (15 features — all correlated with purchase_base)
    *[purchase_base + np.random.normal(0, 0.3+i*0.05, n) for i in range(15)],
    # Browsing behaviour (15 features — all correlated with browsing_base)
    *[browsing_base + np.random.normal(0, 0.3+i*0.05, n) for i in range(15)],
    # Price sensitivity (10 features)
    *[price_base + np.random.normal(0, 0.3+i*0.05, n) for i in range(10)],
    # Truly independent features (10 features)
    *[np.random.normal(0, 1, n) for _ in range(10)],
])

col_names = (
    [f'purchase_{i:02d}' for i in range(15)]
    + [f'browsing_{i:02d}' for i in range(15)]
    + [f'price_sens_{i:02d}' for i in range(10)]
    + [f'independent_{i:02d}' for i in range(10)]
)
df_customers = pd.DataFrame(feature_matrix, columns=col_names)
print(f"Original dataset: {df_customers.shape}")

# ── Step 1: Standardise ────────────────────────────────────────────────
sc   = StandardScaler()
X_sc = sc.fit_transform(df_customers)

# ── Step 2: Find the right number of PCA components ───────────────────
pca_full = PCA().fit(X_sc)
cumvar   = np.cumsum(pca_full.explained_variance_ratio_)
k_95     = np.searchsorted(cumvar, 0.95) + 1
k_90     = np.searchsorted(cumvar, 0.90) + 1

print(f"\nVariance analysis:")
print(f"  Original features:  {df_customers.shape[1]}")
print(f"  Components for 90%: {k_90}")
print(f"  Components for 95%: {k_95}")
print(f"  Compression ratio:  {df_customers.shape[1]/k_95:.1f}× reduction")

# ── Step 3: Apply PCA ─────────────────────────────────────────────────
pca      = PCA(n_components=k_95)
X_pca    = pca.fit_transform(X_sc)
print(f"\nReduced dataset: {X_pca.shape}")

# ── Step 4: Cluster in PCA space ──────────────────────────────────────
# Clustering is faster and more meaningful in reduced space
print("\nK-Means clustering in PCA space:")
for k in [3, 4, 5, 6]:
    km  = KMeans(n_clusters=k, random_state=42, n_init=10)
    lbl = km.fit_predict(X_pca)
    sil = silhouette_score(X_pca, lbl, sample_size=2000)
    print(f"  k={k}: silhouette={sil:.4f}")

# ── Step 5: Final model ────────────────────────────────────────────────
best_k   = 4
km_final = KMeans(n_clusters=best_k, random_state=42, n_init=20)
df_customers['segment'] = km_final.fit_predict(X_pca)

# Profile segments using ORIGINAL features (more interpretable than PCA features)
profile = df_customers.groupby('segment').agg(
    n_customers  = ('purchase_00', 'count'),
    purchase_avg = ('purchase_00', 'mean'),
    browsing_avg = ('browsing_00', 'mean'),
    price_avg    = ('price_sens_00', 'mean'),
).round(3)
print("\nSegment profiles (original feature means):")
print(profile.to_string())

# ── Step 6: Save everything needed for production ─────────────────────
# New customers: standardise → PCA transform → predict segment
bundle = {
    'scaler':    sc,
    'pca':       pca,
    'kmeans':    km_final,
    'n_features_original': df_customers.shape[1] - 1,  # exclude 'segment'
    'n_components_pca':    k_95,
    'version':   'v1.0',
}
joblib.dump(bundle, '/tmp/flipkart_pca_segments.pkl')

# Assign new customer to a segment
new_customer = np.random.normal(0, 1, (1, 50))
bundle_loaded = joblib.load('/tmp/flipkart_pca_segments.pkl')
X_new_sc  = bundle_loaded['scaler'].transform(new_customer)
X_new_pca = bundle_loaded['pca'].transform(X_new_sc)
segment   = bundle_loaded['kmeans'].predict(X_new_pca)[0]
print(f"\nNew customer → Segment {segment}")

print("\nProduction bundle saved: /tmp/flipkart_pca_segments.pkl")`} />
      </div>

      <Div />

      {/* ══ SECTION 9 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common PCA error — explained and fixed</h2>

        <ErrorBlock
          error="PCA retains 95% variance but downstream model performance gets worse"
          cause="You applied PCA to a tree-based model (Random Forest, XGBoost, LightGBM). These models handle correlated features natively and use feature importance to down-weight irrelevant ones. PCA removes interpretable features and replaces them with abstract components, actually hurting tree models which thrive on the original feature space. The 5% variance discarded may have included the exact signal the tree was using."
          fix="Only use PCA before distance-based algorithms (KNN, K-Means, SVM with RBF) or linear models (logistic regression, linear SVM). Never use PCA before tree ensembles — they do not benefit from dimensionality reduction. Verify by comparing cross-validation scores with and without PCA before committing to the pipeline."
        />

        <ErrorBlock
          error="PCA components are completely different after retraining on new data — stored cluster labels no longer match"
          cause="PCA components are only defined up to sign — PC1 can point in the positive or negative direction depending on the random initialisation of the eigendecomposition. When you retrain PCA on new data, PC1 may flip sign. Cluster labels in KMeans also permute. Any hardcoded mapping (segment 0 = premium, segment 1 = budget) breaks silently."
          fix="Never rely on the numeric index of a PCA component or cluster label. After retraining, match components by their content: which component has the highest loading on your key features? Which cluster has the highest mean spend? Build a remapping step into your retraining pipeline that matches new labels to semantic meanings using centroid characteristics, not numeric indices."
        />

        <ErrorBlock
          error="ValueError: Input contains NaN — PCA cannot handle missing values"
          cause="PCA computes a covariance matrix which requires all values to be present. A single NaN in any feature propagates through the matrix multiplication and produces NaN everywhere, then raises a ValueError. Unlike tree models, PCA has absolutely no mechanism for handling missing values."
          fix="Impute missing values before PCA. Use SimpleImputer(strategy='median') in the pipeline before the PCA step: Pipeline([('imputer', SimpleImputer(strategy='median')), ('scaler', StandardScaler()), ('pca', PCA(n_components=0.95)), ('model', model)]). Median imputation is safer than mean imputation when outliers are present."
        />

        <ErrorBlock
          error="PCA on sparse matrix is extremely slow or runs out of memory"
          cause="Standard PCA centers the data by subtracting the mean, which converts a sparse matrix to a dense one. A sparse matrix with 100,000 rows and 50,000 columns requires 5 billion entries as a dense float64 matrix — roughly 40GB. Computing the full covariance matrix then the full eigendecomposition is infeasible."
          fix="Use TruncatedSVD instead of PCA for sparse data. It skips the centering step and works directly on the sparse representation: TruncatedSVD(n_components=100). This is equivalent to PCA without mean centering — appropriate for text data, one-hot encoded categoricals, and any other naturally sparse matrix. Also available as sklearn.decomposition.TruncatedSVD."
        />
      </div>

      <Div />

      {/* ══ SECTION 10 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          Classical ML is complete. Section 6 — Evaluation — begins next.
        </h2>

        <p style={S.p}>
          You have now covered every major algorithm in the Classical ML section:
          linear models, trees, ensembles, instance-based methods, probabilistic models,
          boosting, unsupervised clustering, and dimensionality reduction.
          Thirteen modules. Every algorithm a working data scientist
          reaches for on a typical project.
        </p>

        <p style={S.p}>
          Section 6 — Model Evaluation — is next. It answers the question
          every algorithm module assumed you knew: how do you actually know
          if your model is good? Accuracy is almost never the right metric.
          Precision, recall, F1, ROC-AUC, PR-AUC, calibration curves,
          confusion matrices, and the business cost of each type of error.
          This section makes every model you build defensible to a stakeholder.
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
              textTransform: 'uppercase' as const, color: '#7F77DD',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Section 6 · Model Evaluation
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Evaluation Metrics — Beyond Accuracy
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Precision, recall, F1, ROC-AUC, PR-AUC, confusion matrices,
              and the business cost framing that turns metrics into decisions.
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
          'PCA finds the directions of maximum variance in high-dimensional data (principal components) and projects the data onto the top k of them. The result is a lower-dimensional representation that preserves most of the information. It is built on the eigendecomposition of the covariance matrix from Module 06.',
          'Always standardise before PCA. Features with large absolute values (like price in rupees) dominate the covariance matrix and hijack all principal components. StandardScaler before PCA is mandatory, not optional.',
          'Explained variance ratio is the key output. Each component has a fraction of total variance it captures. Sum them cumulatively and stop at 95% — that is how many components to keep. Use PCA(n_components=0.95) to let sklearn pick k automatically.',
          'PCA must be fit inside each cross-validation fold. Fitting on the full dataset before splitting leaks test set information into the covariance matrix. Always use Pipeline([("scaler", StandardScaler()), ("pca", PCA()), ("model", model)]) and pass the whole pipeline to cross_val_score.',
          'Do not use PCA before tree models (Random Forest, XGBoost, LightGBM). They handle correlated features natively and do not benefit from dimensionality reduction. PCA genuinely helps distance-based algorithms (KNN, K-Means, SVM) and linear models with correlated features.',
          'For sparse data (text, one-hot encoded features), use TruncatedSVD instead of PCA. Standard PCA centers the data first, destroying sparsity and requiring dense matrix storage. TruncatedSVD skips centering and works directly on sparse representations.',
        ]}
      />
    </LearnLayout>
  )
}