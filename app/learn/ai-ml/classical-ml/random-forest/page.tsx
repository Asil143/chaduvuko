import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Random Forest — Zepto Stock Prediction — Chaduvuko',
  description:
    'Bagging, random feature subsets, out-of-bag evaluation, and the feature importance that actually works in production. Why Random Forest beats a single tree on every real dataset.',
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
  { label: 'Decision',  href: '/learn/ai-ml/classical-ml/decision-trees',      title: 'Decision Trees',               active: false },
  { label: 'Support',   href: '/learn/ai-ml/classical-ml/svm',                 title: 'Support Vector Machines',      active: false },
  { label: 'K-Nearest', href: '/learn/ai-ml/classical-ml/knn',                 title: 'K-Nearest Neighbours',         active: false },
  { label: 'Naive',     href: '/learn/ai-ml/classical-ml/naive-bayes',         title: 'Naive Bayes',                  active: false },
  { label: 'Random',    href: '/learn/ai-ml/classical-ml/random-forest',       title: 'Random Forest',                active: true  },
  { label: 'Gradient',  href: '/learn/ai-ml/classical-ml/gradient-boosting',   title: 'Gradient Boosting',            active: false },
  { label: 'XGBoost',   href: '/learn/ai-ml/classical-ml/xgboost',             title: 'XGBoost',                      active: false },
  { label: 'LightGBM',  href: '/learn/ai-ml/classical-ml/lightgbm',            title: 'LightGBM',                     active: false },
  { label: 'K-Means',   href: '/learn/ai-ml/classical-ml/kmeans-clustering',   title: 'K-Means Clustering',           active: false },
  { label: 'Principal', href: '/learn/ai-ml/classical-ml/pca',                 title: 'Principal Component Analysis', active: false },
]

export default function RandomForestPage() {
  return (
    <LearnLayout
      title="Random Forest — Zepto Stock Prediction"
      description="Bagging, random feature subsets, out-of-bag evaluation, and the feature importance that actually works. Why Random Forest beats a single tree on every real dataset."
      section="Classical ML"
      readTime="25–30 min"
      updatedAt="March 2026"
    >
      {/* ── Section progress header ─────────────────────────────────────────── */}
      <div style={{ marginBottom: 40 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 12, color: 'var(--muted)', marginBottom: 16,
          fontFamily: 'var(--font-mono)',
        }}>
          <a href="/learn/ai-ml" style={{ color: 'var(--muted)', textDecoration: 'none' }}>AI &amp; ML</a>
          <span style={{ color: 'var(--border)' }}>›</span>
          <a href="/learn/ai-ml/classical-ml" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Classical ML</a>
          <span style={{ color: 'var(--border)' }}>›</span>
          <span style={{ color: 'var(--text)' }}>Random Forest</span>
        </div>
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
        <span style={S.tag}>The problem with one tree</span>
        <h2 style={S.h2}>
          A single decision tree is unstable. One noisy sample can change everything.
        </h2>

        <p style={S.p}>
          You trained a decision tree on HDFC loan data and got 88% accuracy.
          You add 50 new training samples — a routine monthly data refresh —
          and retrain. The tree looks completely different. Different root split,
          different branches, different feature importances. The accuracy barely
          changed but the structure changed dramatically. This is variance.
          The tree is too sensitive to the specific samples it saw.
        </p>

        <p style={S.p}>
          The fix was published by Leo Breiman in 2001. His insight:
          if one tree is unstable and noisy, train 500 trees on slightly
          different versions of the data and average their predictions.
          Each individual tree is still noisy, but the noise is random and
          independent across trees. It cancels out in the average.
          What remains is the underlying signal.
        </p>

        <p style={S.p}>
          That is Random Forest. It is still, in 2026, one of the first algorithms
          you should try on any tabular ML problem. It almost never catastrophically
          fails, requires minimal tuning, handles missing values gracefully,
          provides reliable feature importances, and trains in parallel across cores.
          The Zepto data science team uses it for demand forecasting, inventory
          reorder prediction, and fraud detection — often as a strong baseline
          before reaching for XGBoost.
        </p>

        <HBox color="#378ADD">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              What this module covers:
            </span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[
              'Bagging — bootstrap aggregation explained from scratch',
              'Random feature subsets — the key difference from bagging',
              'Why averaging reduces variance without increasing bias',
              'Out-of-bag (OOB) evaluation — free cross-validation',
              'sklearn RandomForestClassifier — every important parameter',
              'n_estimators — how many trees is enough?',
              'max_features — the most important hyperparameter',
              'Feature importance — MDI and permutation importance',
              'Partial dependence — what the forest learned about each feature',
              'Random Forest for regression',
              'When to use RF vs XGBoost',
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
          The running example is predicting whether a Zepto product will go
          out of stock in the next 24 hours — a binary classification problem
          that determines which products to reorder proactively.
          Every concept is demonstrated on this dataset before the code appears.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — BAGGING ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The first idea</span>
        <h2 style={S.h2}>Bagging — bootstrap aggregation</h2>

        <p style={S.p}>
          Bagging starts with a simple observation: if you had access to many
          independent training datasets, you could train one model per dataset
          and average their predictions. The average would be more stable
          and accurate than any single model.
        </p>

        <p style={S.p}>
          You only have one training dataset. The trick: create many simulated
          datasets by sampling from it <em>with replacement</em>.
          This is called bootstrap sampling. Each bootstrap sample is the same
          size as the original but contains roughly 63% unique samples
          (some samples appear 2 or 3 times, about 37% never appear).
          Train one tree on each bootstrap sample. Average the predictions.
          That is bagging.
        </p>

        <VisualBox label="Bootstrap sampling — each tree sees a different version of the data">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {/* Original data */}
            <div style={{ textAlign: 'center' as const }}>
              <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                Original (n=8)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[1,2,3,4,5,6,7,8].map(i => (
                  <div key={i} style={{
                    width: 28, height: 20, borderRadius: 3,
                    background: '#378ADD30', border: '1px solid #378ADD50',
                    fontSize: 11, fontFamily: 'var(--font-mono)',
                    color: '#378ADD', display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {i}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ fontSize: 20, color: 'var(--muted)', paddingTop: 60 }}>→</div>

            {/* Bootstrap samples */}
            {[
              [1,1,3,5,5,6,7,8],
              [2,3,3,4,6,6,7,8],
              [1,2,4,4,5,7,7,8],
            ].map((sample, ti) => (
              <div key={ti} style={{ textAlign: 'center' as const }}>
                <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                  Tree {ti + 1} bootstrap
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {sample.map((s, i) => {
                    const isDup = sample.filter(x => x === s).length > 1
                    return (
                      <div key={i} style={{
                        width: 28, height: 20, borderRadius: 3,
                        background: isDup ? '#D85A3020' : '#1D9E7520',
                        border: `1px solid ${isDup ? '#D85A3050' : '#1D9E7550'}`,
                        fontSize: 11, fontFamily: 'var(--font-mono)',
                        color: isDup ? '#D85A30' : '#1D9E75',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {s}
                      </div>
                    )
                  })}
                </div>
                <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 4 }}>
                  OOB samples
                </div>
                <div style={{ fontSize: 10, color: '#BA7517', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                  {[1,2,3,4,5,6,7,8].filter(x => !sample.includes(x)).join(',')}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12 }}>
            Orange = duplicated samples. Green = unique samples. OOB = samples not included in that tree's bootstrap — used for free evaluation.
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

np.random.seed(42)
n = 15_000

# ── Zepto product stock-out prediction dataset ─────────────────────────
categories    = ['Grocery', 'Dairy', 'Beverages', 'Snacks', 'Household',
                  'Personal Care', 'Frozen', 'Bakery']
warehouses    = ['Mumbai_Central', 'Mumbai_West', 'Delhi_NCR', 'Bangalore']

current_stock  = np.abs(np.random.normal(200, 120, n)).clip(0, 1000).astype(int)
avg_daily_sale = np.abs(np.random.normal(45, 30, n)).clip(1, 300).round(1)
days_of_stock  = (current_stock / avg_daily_sale.clip(1)).round(2)
pending_orders = np.abs(np.random.normal(80, 60, n)).clip(0, 500).astype(int)
lead_time_days = np.random.choice([1, 2, 3, 4, 5], n,
                                   p=[0.3, 0.3, 0.2, 0.1, 0.1])
is_weekend_peak = np.random.binomial(1, 0.28, n)
price          = np.abs(np.random.normal(150, 100, n)).clip(5, 2000).round(0)
supplier_score = np.random.uniform(0.4, 1.0, n).round(2)

# Stock-out risk: low stock + high sales + long lead time = out of stock
risk_score = (
    - days_of_stock * 0.35
    + (pending_orders / current_stock.clip(1)) * 0.25
    + lead_time_days * 0.20
    + is_weekend_peak * 0.10
    - supplier_score * 0.10
    + np.random.randn(n) * 0.3
)
stockout_24h = (risk_score > np.percentile(risk_score, 70)).astype(int)

df = pd.DataFrame({
    'category':       np.random.choice(categories, n),
    'warehouse':      np.random.choice(warehouses, n),
    'current_stock':  current_stock,
    'avg_daily_sale': avg_daily_sale,
    'days_of_stock':  days_of_stock,
    'pending_orders': pending_orders,
    'lead_time_days': lead_time_days,
    'is_weekend_peak': is_weekend_peak,
    'price':          price,
    'supplier_score': supplier_score,
    'stockout_24h':   stockout_24h,
})

# Encode categoricals
from sklearn.preprocessing import LabelEncoder
for col in ['category', 'warehouse']:
    df[col] = LabelEncoder().fit_transform(df[col])

X = df.drop(columns=['stockout_24h'])
y = df['stockout_24h']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)
print(f"Train: {len(X_train):,}  Test: {len(X_test):,}")
print(f"Stock-out rate: {y.mean()*100:.1f}%")

# ── Demonstrate bagging from scratch ──────────────────────────────────
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import roc_auc_score

def bootstrap_sample(X, y, seed):
    rng = np.random.default_rng(seed)
    idx = rng.integers(0, len(X), size=len(X))
    return X.iloc[idx], y.iloc[idx]

# Train 10 trees on bootstrap samples — manual bagging
print("\\nManual bagging — AUC improves as we add more trees:")
predictions = []
for i in range(1, 11):
    X_boot, y_boot = bootstrap_sample(X_train, y_train, seed=i)
    tree = DecisionTreeClassifier(max_depth=8, random_state=i)
    tree.fit(X_boot, y_boot)
    predictions.append(tree.predict_proba(X_test)[:, 1])
    ensemble_proba = np.mean(predictions, axis=0)
    auc = roc_auc_score(y_test, ensemble_proba)
    single_auc = roc_auc_score(y_test, predictions[-1])
    print(f"  {i:2d} trees: ensemble AUC={auc:.4f}  single tree AUC={single_auc:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — RANDOM FEATURES ═══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The key innovation</span>
        <h2 style={S.h2}>Random feature subsets — why RF beats plain bagging</h2>

        <p style={S.p}>
          Plain bagging with decision trees works but has a problem.
          If one feature is very predictive of the target — say,
          <span style={S.code as React.CSSProperties}> days_of_stock</span> for stock-out prediction —
          every tree will put it at the root. The 500 trees will all look similar
          in their top splits, making them highly correlated. Correlated trees
          cancel each other's errors poorly. The benefit of averaging is reduced.
        </p>

        <p style={S.p}>
          Random Forest fixes this by constraining each split to consider only
          a random subset of features — typically sqrt(n_features) for classification
          and n_features/3 for regression. Now no single feature can dominate
          every tree. Different trees explore different feature combinations.
          The trees are decorrelated, and averaging them cancels much more error.
          This is the one addition that makes Random Forest beat plain bagging
          by a significant margin.
        </p>

        <VisualBox label="Bagging vs Random Forest — the single difference">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid rgba(186,117,23,0.3)',
              borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#BA7517', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                Bagging
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {['Bootstrap sample of rows ✓', 'All features available at every split', 'Dominant feature wins every root split', 'Trees are highly correlated', 'Variance reduction: moderate'].map((s, i) => (
                  <div key={i} style={{ fontSize: 12, color: i < 1 ? '#1D9E75' : i > 2 ? '#ff4757' : 'var(--muted)' }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.3)',
              borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#00e676', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                Random Forest
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[
                  'Bootstrap sample of rows ✓',
                  'Random subset of features at each split ✓',
                  'Different features win in different trees',
                  'Trees are decorrelated',
                  'Variance reduction: strong',
                ].map((s, i) => (
                  <div key={i} style={{ fontSize: 12, color: '#1D9E75' }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{
            marginTop: 12, padding: '10px 14px', background: 'var(--surface)',
            borderRadius: 7, border: '1px solid var(--border)',
            fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)',
          }}>
            max_features = sqrt(n_features) for classification (default)<br />
            max_features = n_features / 3 for regression (default)
          </div>
        </VisualBox>

        <CodeBlock code={`from sklearn.ensemble import RandomForestClassifier, BaggingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import roc_auc_score

# Compare: single tree vs bagging vs random forest
from sklearn.metrics import accuracy_score

print(f"{'Model':<40} {'Test AUC':<12} {'Test Acc'}")
print("─" * 60)

# Single decision tree
dt = DecisionTreeClassifier(max_depth=8, random_state=42)
dt.fit(X_train, y_train)
dt_auc = roc_auc_score(y_test, dt.predict_proba(X_test)[:, 1])
dt_acc = accuracy_score(y_test, dt.predict(X_test))
print(f"  Single tree (depth=8)               {dt_auc:.4f}       {dt_acc:.4f}")

# Bagging (all features at each split)
bag = BaggingClassifier(
    estimator=DecisionTreeClassifier(max_depth=8),
    n_estimators=100,
    max_features=1.0,   # all features — this is plain bagging
    bootstrap=True,
    random_state=42, n_jobs=-1,
)
bag.fit(X_train, y_train)
bag_auc = roc_auc_score(y_test, bag.predict_proba(X_test)[:, 1])
bag_acc = accuracy_score(y_test, bag.predict(X_test))
print(f"  Bagging (100 trees, all features)    {bag_auc:.4f}       {bag_acc:.4f}")

# Random Forest (random feature subsets — the key difference)
rf = RandomForestClassifier(
    n_estimators=100,
    max_features='sqrt',  # sqrt(n_features) per split — the RF trick
    max_depth=None,
    min_samples_leaf=5,
    bootstrap=True,
    oob_score=True,       # free out-of-bag evaluation
    random_state=42, n_jobs=-1,
)
rf.fit(X_train, y_train)
rf_auc = roc_auc_score(y_test, rf.predict_proba(X_test)[:, 1])
rf_acc = accuracy_score(y_test, rf.predict(X_test))
print(f"  Random Forest (100 trees, sqrt feat) {rf_auc:.4f}       {rf_acc:.4f}")
print(f"\n  RF OOB score (free eval): {rf.oob_score_:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — OOB EVALUATION ═════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Free cross-validation</span>
        <h2 style={S.h2}>Out-of-bag evaluation — cross-validation at no extra cost</h2>

        <p style={S.p}>
          Each bootstrap sample leaves out roughly 37% of the training data.
          Those left-out samples are called out-of-bag (OOB) samples.
          For any given training sample, there will be trees in the forest
          that never saw it during training — because it was OOB for those trees.
          We can evaluate each sample using only those trees, giving us
          an unbiased estimate of generalisation performance without
          any separate validation set or cross-validation loop.
        </p>

        <p style={S.p}>
          Set <span style={S.code as React.CSSProperties}>oob_score=True</span> and
          the OOB score is computed automatically.
          For large datasets, OOB evaluation is often preferred over k-fold CV
          because it is effectively one-pass rather than k-pass, much faster.
        </p>

        <CodeBlock code={`import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score
from sklearn.model_selection import cross_val_score

# ── OOB score vs CV score comparison ─────────────────────────────────
rf_oob = RandomForestClassifier(
    n_estimators=200,
    max_features='sqrt',
    min_samples_leaf=5,
    oob_score=True,        # ← enables OOB evaluation
    random_state=42, n_jobs=-1,
)
rf_oob.fit(X_train, y_train)

# OOB score — available immediately after fit
oob_accuracy = rf_oob.oob_score_
print(f"OOB accuracy:          {oob_accuracy:.4f}")

# OOB predictions — one probability per training sample
oob_proba = rf_oob.oob_decision_function_[:, 1]  # shape (n_train,)
oob_auc   = roc_auc_score(y_train, oob_proba)
print(f"OOB AUC:               {oob_auc:.4f}")

# Compare to 5-fold CV (much slower but standard)
cv_scores = cross_val_score(
    RandomForestClassifier(n_estimators=100, max_features='sqrt',
                            min_samples_leaf=5, random_state=42, n_jobs=-1),
    X_train, y_train,
    cv=5, scoring='roc_auc',
)
print(f"5-fold CV AUC:         {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")

# Test set AUC (ground truth)
test_auc = roc_auc_score(y_test, rf_oob.predict_proba(X_test)[:, 1])
print(f"Test AUC:              {test_auc:.4f}")

print("\\nOOB AUC and CV AUC should both be close to Test AUC.")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — HYPERPARAMETERS ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Tuning</span>
        <h2 style={S.h2}>Key hyperparameters — what to tune and in what order</h2>

        <p style={S.p}>
          Random Forest is remarkably robust to hyperparameter choices compared
          to other algorithms. The defaults often work well. But three parameters
          consistently matter and are worth tuning in this order.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              param: 'n_estimators',
              priority: 'First',
              color: '#378ADD',
              desc: 'Number of trees. More is always better — adding trees never hurts, it only reduces variance. Keep adding until OOB error stops improving. 100 is often enough; 500 for important production models.',
              default: '100',
              tip: 'Plot OOB error vs n_estimators and find the elbow.',
            },
            {
              param: 'max_features',
              priority: 'Second — most impactful',
              color: '#D85A30',
              desc: 'Features considered at each split. sqrt(n_features) for classification, n_features/3 for regression are the theory-backed defaults. Smaller = more decorrelated trees = less variance. Larger = more powerful individual trees = less bias. Try "sqrt", "log2", 0.3, 0.5.',
              default: '"sqrt"',
              tip: 'The single most impactful hyperparameter for RF performance.',
            },
            {
              param: 'min_samples_leaf',
              priority: 'Third',
              color: '#1D9E75',
              desc: 'Minimum samples at a leaf. Controls tree depth indirectly. Higher = shallower trees = less overfitting but more bias. Try 1, 2, 5, 10, 20. For noisy datasets increase this.',
              default: '1',
              tip: 'Increase when you see high variance between train and OOB score.',
            },
          ].map((item) => (
            <div key={item.param} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '13px 16px',
              borderLeft: `3px solid ${item.color}`,
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>
                  {item.param}
                </span>
                <span style={{
                  fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)',
                  padding: '2px 6px', borderRadius: 3, background: `${item.color}15`,
                }}>
                  {item.priority}
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 'auto' }}>
                  default: {item.default}
                </span>
              </div>
              <p style={{ ...S.ps, marginBottom: 5 }}>{item.desc}</p>
              <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)' }}>
                Tip: {item.tip}
              </div>
            </div>
          ))}
        </div>

        <CodeBlock code={`from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score
import numpy as np

# ── n_estimators: find the elbow ──────────────────────────────────────
print("OOB AUC vs n_estimators:")
for n in [10, 25, 50, 100, 200, 300, 500]:
    rf = RandomForestClassifier(
        n_estimators=n, max_features='sqrt',
        min_samples_leaf=5, oob_score=True,
        random_state=42, n_jobs=-1,
    )
    rf.fit(X_train, y_train)
    oob_auc = roc_auc_score(y_train, rf.oob_decision_function_[:, 1])
    bar = '█' * int(oob_auc * 30)
    print(f"  n={n:<5}: {bar} {oob_auc:.4f}")

# ── max_features: most impactful parameter ─────────────────────────────
print("\\nOOB AUC vs max_features (n=200 trees):")
for mf in ['sqrt', 'log2', 0.2, 0.3, 0.5, 1.0]:
    rf = RandomForestClassifier(
        n_estimators=200, max_features=mf,
        min_samples_leaf=5, oob_score=True,
        random_state=42, n_jobs=-1,
    )
    rf.fit(X_train, y_train)
    oob_auc = roc_auc_score(y_train, rf.oob_decision_function_[:, 1])
    print(f"  max_features={str(mf):<6}: OOB AUC={oob_auc:.4f}")

# ── Full tuning with RandomizedSearchCV ────────────────────────────────
from sklearn.model_selection import RandomizedSearchCV

param_dist = {
    'n_estimators':    [100, 200, 300],
    'max_features':    ['sqrt', 'log2', 0.3],
    'min_samples_leaf': [1, 5, 10, 20],
    'max_depth':       [None, 20, 30],
}

search = RandomizedSearchCV(
    RandomForestClassifier(oob_score=False, random_state=42, n_jobs=-1),
    param_dist, n_iter=20, cv=3,
    scoring='roc_auc', random_state=42, n_jobs=-1,
)
search.fit(X_train, y_train)
print(f"\\nBest params: {search.best_params_}")
print(f"Best CV AUC: {search.best_score_:.4f}")
final_auc = roc_auc_score(y_test, search.best_estimator_.predict_proba(X_test)[:, 1])
print(f"Test AUC:    {final_auc:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — FEATURE IMPORTANCE ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What the forest learned</span>
        <h2 style={S.h2}>Feature importance — MDI and permutation importance</h2>

        <p style={S.p}>
          Random Forest provides two types of feature importance.
          Mean Decrease in Impurity (MDI) is fast — it's computed during training
          as the total Gini reduction per feature. But MDI has a known bias:
          it overestimates the importance of high-cardinality features
          (features with many unique values like IDs or continuous floats).
          Permutation importance is slower but unbiased — it measures how much
          model performance degrades when a feature's values are randomly shuffled.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.inspection import permutation_importance
from sklearn.metrics import roc_auc_score

# Train final model
rf_final = RandomForestClassifier(
    n_estimators=300, max_features='sqrt',
    min_samples_leaf=5, oob_score=True,
    random_state=42, n_jobs=-1,
)
rf_final.fit(X_train, y_train)

# ── MDI importance (fast, built-in) ───────────────────────────────────
mdi_importance = pd.Series(
    rf_final.feature_importances_,
    index=X_train.columns,
).sort_values(ascending=False)

print("MDI Feature Importance (Gini-based):")
for feat, imp in mdi_importance.items():
    bar = '█' * int(imp * 60)
    print(f"  {feat:<20}: {bar} {imp:.4f}")

# ── Permutation importance (slower but unbiased) ───────────────────────
perm_result = permutation_importance(
    rf_final, X_test, y_test,
    n_repeats=10,
    scoring='roc_auc',
    random_state=42,
    n_jobs=-1,
)
perm_importance = pd.Series(
    perm_result.importances_mean,
    index=X_train.columns,
).sort_values(ascending=False)

print("\\nPermutation Importance (AUC-based, unbiased):")
for feat, imp in perm_importance.items():
    std = perm_result.importances_std[X_train.columns.get_loc(feat)]
    bar = '█' * int(max(imp * 200, 0))
    print(f"  {feat:<20}: {bar} {imp:.4f} ± {std:.4f}")

# Features with negative permutation importance are noise
# (shuffling them doesn't hurt — they weren't being used)
print("\\nFeatures with near-zero permutation importance (candidates for removal):")
noise_feats = perm_importance[perm_importance < 0.001].index.tolist()
print(f"  {noise_feats}")

# ── Partial dependence — how does prediction change as feature varies? ─
from sklearn.inspection import PartialDependenceDisplay

# For a notebook, you would plot this.
# Here we compute the raw values for the most important feature.
from sklearn.inspection import partial_dependence
pd_result = partial_dependence(
    rf_final, X_train,
    features=[X_train.columns.get_loc('days_of_stock')],
    kind='average',
)
print("\\nPartial dependence of days_of_stock on stock-out probability:")
for val, pred in zip(pd_result['grid_values'][0][::3],
                     pd_result['average'][0][::3]):
    bar = '█' * int(pred * 30)
    print(f"  {val:6.1f} days: {bar} {pred:.3f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — RF FOR REGRESSION ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Not just classification</span>
        <h2 style={S.h2}>Random Forest for regression — predicting demand quantity</h2>

        <CodeBlock code={`from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import numpy as np

# Regression target: predict exact units to reorder (continuous)
np.random.seed(42)
reorder_qty = (
    df.loc[X_train.index, 'avg_daily_sale'] * df.loc[X_train.index, 'lead_time_days'] * 1.3
    + np.abs(np.random.normal(0, 10, len(X_train)))
).clip(0)

reorder_qty_test = (
    df.loc[X_test.index, 'avg_daily_sale'] * df.loc[X_test.index, 'lead_time_days'] * 1.3
    + np.abs(np.random.normal(0, 10, len(X_test)))
).clip(0)

# RandomForestRegressor — same API, different criterion
rfr = RandomForestRegressor(
    n_estimators=200,
    max_features=0.33,        # n_features/3 — regression default
    min_samples_leaf=5,
    oob_score=True,
    random_state=42, n_jobs=-1,
)
rfr.fit(X_train, reorder_qty)

preds = rfr.predict(X_test)
mae   = mean_absolute_error(reorder_qty_test, preds)
r2    = r2_score(reorder_qty_test, preds)

print(f"Regression RF — MAE: {mae:.1f} units  R²: {r2:.4f}")
print(f"OOB R²: {rfr.oob_score_:.4f}")

# ── Prediction intervals via quantile prediction ───────────────────────
# Random Forest can give uncertainty estimates by collecting predictions
# from individual trees rather than averaging them
individual_tree_preds = np.array([
    tree.predict(X_test.values) for tree in rfr.estimators_
])  # shape (n_trees, n_test)

# 10th and 90th percentile across trees = 80% prediction interval
lower = np.percentile(individual_tree_preds, 10, axis=0)
upper = np.percentile(individual_tree_preds, 90, axis=0)
mean_pred = individual_tree_preds.mean(axis=0)

# Coverage: what fraction of true values fall inside the interval?
coverage = ((reorder_qty_test.values >= lower) &
            (reorder_qty_test.values <= upper)).mean()
avg_width = (upper - lower).mean()

print(f"\\n80% prediction interval:")
print(f"  Coverage: {coverage:.1%} (target: ~80%)")
print(f"  Avg width: ±{avg_width/2:.1f} units")

# Show 5 examples
print("\\nSample predictions with intervals:")
for i in range(5):
    print(f"  True: {reorder_qty_test.iloc[i]:.0f}  "
          f"Pred: {mean_pred[i]:.0f}  "
          f"Interval: [{lower[i]:.0f}, {upper[i]:.0f}]")`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — RF VS XGBOOST ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Practical decision guide</span>
        <h2 style={S.h2}>Random Forest vs XGBoost — when to use which</h2>

        <p style={S.p}>
          Both algorithms are dominant in tabular ML. The choice between them
          depends on your priorities — not on a blanket "XGBoost is always better"
          rule that many tutorials incorrectly state.
        </p>

        <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            background: 'var(--surface)', borderBottom: '1px solid var(--border)',
            padding: '9px 14px',
          }}>
            {['Consideration', 'Random Forest', 'XGBoost'].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{h}</span>
            ))}
          </div>
          {[
            ['Raw performance on tabular data', 'Strong', 'Usually stronger'],
            ['Training speed',                  'Fast (parallel)',  'Moderate (sequential)'],
            ['Hyperparameter sensitivity',      'Low — forgiving',  'High — needs tuning'],
            ['Overfitting risk',                'Low',              'Higher without careful tuning'],
            ['Missing value handling',          'Needs imputation', 'Native (no imputation needed)'],
            ['Interpretability',                'Feature importance', 'Feature importance + SHAP'],
            ['Time to first good model',        'Minutes',          'Hours (with proper tuning)'],
            ['Class imbalance',                 'class_weight',     'scale_pos_weight'],
            ['When to choose',                  'Strong baseline, fast iteration, low ops overhead', 'Maximum performance, willing to tune, have compute'],
          ].map((row, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              padding: '9px 14px',
              borderBottom: i < 8 ? '1px solid var(--border)' : 'none',
              background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
              alignItems: 'start',
            }}>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>{row[0]}</span>
              <span style={{ fontSize: 12, color: '#378ADD' }}>{row[1]}</span>
              <span style={{ fontSize: 12, color: '#D85A30' }}>{row[2]}</span>
            </div>
          ))}
        </div>

        <HBox color="#1D9E75">
          <p style={{ ...S.p, marginBottom: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              The practical rule:{' '}
            </span>
            start with Random Forest. It gives you a strong baseline in minutes
            with minimal tuning. If you need every last point of AUC and have
            time to tune properly, switch to XGBoost or LightGBM.
            At most Indian product companies, a well-tuned Random Forest
            is already good enough for production — and it deploys faster
            and is easier to maintain.
          </p>
        </HBox>
      </div>

      <Div />

      {/* ══ SECTION 9 — PRODUCTION PIPELINE ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What this looks like at work</span>
        <h2 style={S.h2}>Day-one task at Zepto — stock-out predictor end to end</h2>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.model_selection import cross_validate, StratifiedKFold
from sklearn.metrics import (roc_auc_score, average_precision_score,
                              classification_report)
import joblib

# ── Feature groups ─────────────────────────────────────────────────────
NUM_COLS = ['current_stock', 'avg_daily_sale', 'days_of_stock',
            'pending_orders', 'lead_time_days', 'price', 'supplier_score']
BIN_COLS = ['is_weekend_peak']
CAT_COLS = ['category', 'warehouse']   # already label-encoded

ALL_COLS = NUM_COLS + BIN_COLS + CAT_COLS

# RF needs no scaling — just imputation for any missing values
preprocessor = ColumnTransformer([
    ('num', SimpleImputer(strategy='median'), NUM_COLS + BIN_COLS + CAT_COLS),
], remainder='drop')

pipeline = Pipeline([
    ('prep',  preprocessor),
    ('model', RandomForestClassifier(
        n_estimators=300,
        max_features='sqrt',
        min_samples_leaf=5,
        class_weight='balanced',    # handles class imbalance
        oob_score=True,
        random_state=42, n_jobs=-1,
    )),
])

# ── Cross-validation ───────────────────────────────────────────────────
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
cv_results = cross_validate(
    pipeline, X_train[ALL_COLS], y_train,
    cv=cv,
    scoring=['roc_auc', 'average_precision'],
    return_train_score=True,
)

print("5-Fold Cross-Validation:")
for metric in ['roc_auc', 'average_precision']:
    tr = cv_results[f'train_{metric}'].mean()
    va = cv_results[f'test_{metric}'].mean()
    std = cv_results[f'test_{metric}'].std()
    print(f"  {metric:<22}: train={tr:.4f}  val={va:.4f} ± {std:.4f}")

# ── Train final model ──────────────────────────────────────────────────
pipeline.fit(X_train[ALL_COLS], y_train)

y_proba = pipeline.predict_proba(X_test[ALL_COLS])[:, 1]
y_pred  = pipeline.predict(X_test[ALL_COLS])

print(f"\nTest ROC-AUC:          {roc_auc_score(y_test, y_proba):.4f}")
print(f"Test Avg Precision:    {average_precision_score(y_test, y_proba):.4f}")
print("\nClassification report:")
print(classification_report(y_test, y_pred,
                             target_names=['In Stock', 'Stock-out Risk']))

# ── OOB score from the fitted pipeline ────────────────────────────────
rf_model = pipeline.named_steps['model']
print(f"\nOOB accuracy: {rf_model.oob_score_:.4f}")

# ── Feature importance report ──────────────────────────────────────────
importance_df = pd.DataFrame({
    'feature':    ALL_COLS,
    'importance': rf_model.feature_importances_,
}).sort_values('importance', ascending=False)
print("\nFeature importance:")
print(importance_df.to_string(index=False))

# ── Save model ─────────────────────────────────────────────────────────
joblib.dump(pipeline, '/tmp/zepto_stockout_rf.pkl')
print("\nModel saved to /tmp/zepto_stockout_rf.pkl")

# ── Score new products at inference ───────────────────────────────────
new_products = pd.DataFrame([
    {'category': 2, 'warehouse': 0, 'current_stock': 15,
     'avg_daily_sale': 40, 'days_of_stock': 0.4, 'pending_orders': 120,
     'lead_time_days': 3, 'is_weekend_peak': 1, 'price': 89, 'supplier_score': 0.7},
    {'category': 0, 'warehouse': 1, 'current_stock': 500,
     'avg_daily_sale': 20, 'days_of_stock': 25, 'pending_orders': 10,
     'lead_time_days': 1, 'is_weekend_peak': 0, 'price': 250, 'supplier_score': 0.95},
])

loaded   = joblib.load('/tmp/zepto_stockout_rf.pkl')
risk     = loaded.predict_proba(new_products[ALL_COLS])[:, 1]
decision = loaded.predict(new_products[ALL_COLS])

print("\nStock-out risk for 2 new products:")
for i, (r, d) in enumerate(zip(risk, decision)):
    status = "⚠ REORDER NOW" if d == 1 else "✓ OK"
    print(f"  Product {i+1}: P(stockout)={r:.2%}  {status}")`} />
      </div>

      <Div />

      {/* ══ SECTION 10 — ERRORS ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common Random Forest error — explained and fixed</h2>

        <ErrorBlock
          error="Training is very slow — RandomForestClassifier takes minutes on 50k rows"
          cause="n_estimators is too high combined with deep unconstrained trees on a wide dataset. Each tree grows to full depth by default, which is O(n log n × n_features) per tree. With 500 trees on 50k rows and 50 features this can easily take 10+ minutes on a single core."
          fix="Add n_jobs=-1 to use all CPU cores — this alone can give 4–8× speedup. Set max_depth=15 or 20 to limit tree growth. Reduce n_estimators during development (use 50, tune to 300 at the end). Use max_samples=0.7 to train each tree on 70% of data instead of a full bootstrap sample."
        />

        <ErrorBlock
          error="Feature importances are dominated by high-cardinality continuous features"
          cause="MDI (Mean Decrease in Impurity) feature importance is biased toward features with many unique values. A feature like price or an ID column with thousands of unique values will appear very important even if it is not — because it creates many possible split thresholds for the tree to exploit."
          fix="Use permutation importance instead of MDI for feature selection decisions: from sklearn.inspection import permutation_importance. Permutation importance is unbiased and directly measures the impact on model performance. MDI is fine for a quick overview but should not be used for feature selection."
        />

        <ErrorBlock
          error="oob_score_ is much lower than cross-validation score — suspiciously large gap"
          cause="Small n_estimators — with too few trees, many training samples may be OOB for only 1 or 2 trees. Predictions from so few trees are noisy and unreliable. OOB score is only a good estimate with enough trees (typically 100+)."
          fix="Increase n_estimators to at least 100 before trusting the OOB score. Run both OOB and 3-fold CV and compare — if they agree closely, OOB is reliable. If they diverge significantly, use CV as the more trustworthy estimate."
        />

        <ErrorBlock
          error="Model predicts the majority class for almost all samples on imbalanced data"
          cause="Without class weighting, the loss function treats each sample equally. On a dataset where 95% of samples are class 0, a model that always predicts 0 achieves 95% accuracy. The forest learns to exploit this and never predicts the minority class."
          fix="Set class_weight='balanced' which weights each class inversely proportional to its frequency. Or set class_weight={0: 1, 1: 10} for manual control. Evaluate with ROC-AUC or average precision instead of accuracy — these metrics are not fooled by class imbalance."
        />
      </div>

      <Div />

      {/* ══ SECTION 11 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          Random Forest is parallel averaging. The next step is sequential correction.
        </h2>

        <p style={S.p}>
          Random Forest trains all trees independently and averages them.
          Gradient Boosting trains trees sequentially — each new tree is built
          specifically to correct the errors of all previous trees.
          This sequential error correction is why XGBoost and LightGBM
          consistently outperform Random Forest on most tabular benchmarks.
          Module 22 explains how it works from scratch.
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
              Next — Classical ML · Module 22
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Gradient Boosting — How XGBoost and LightGBM Work
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Sequential weak learners, residuals, learning rate,
              and why gradient boosting wins almost every tabular ML competition.
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
          'Random Forest = bootstrap sampling (bagging) + random feature subsets at each split. The random features are the key innovation — they decorrelate the trees so averaging them cancels much more error than plain bagging.',
          'Each bootstrap sample leaves out ~37% of training data as out-of-bag (OOB) samples. Setting oob_score=True gives a free, unbiased evaluation of generalisation performance without any separate validation set or cross-validation loop.',
          'The three parameters that matter most in order: n_estimators (more is always better, find the elbow), max_features (sqrt for classification, n_features/3 for regression — the most impactful param), min_samples_leaf (increase for noisy data).',
          'MDI feature importance is biased toward high-cardinality features. For feature selection decisions always use permutation_importance from sklearn.inspection — it is unbiased and directly measures impact on model performance.',
          'Random Forest needs no feature scaling — trees are threshold-based and scale-invariant. It also handles mixed feature types natively and is robust to outliers, making it one of the lowest-friction algorithms to deploy.',
          'On class-imbalanced datasets always set class_weight="balanced". Evaluate with ROC-AUC or average precision, not accuracy — accuracy is trivially gamed by predicting the majority class.',
          'Use Random Forest as your first strong baseline on any tabular problem. It gives production-quality results with minimal tuning. Switch to XGBoost/LightGBM only when you need maximum performance and can afford proper hyperparameter tuning.',
        ]}
      />
    </LearnLayout>
  )
}