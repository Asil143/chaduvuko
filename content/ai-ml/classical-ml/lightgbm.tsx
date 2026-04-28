import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'LightGBM — Fast Gradient Boosting at Scale — Chaduvuko',
  description:
    'Leaf-wise tree growth, histogram-based splitting, and why LightGBM trains 10x faster than XGBoost on large datasets — built from plain English first.',
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

function ConceptBox({ title, children, color = '#BA7517' }: {
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

export default function LightGBMPage() {
  return (
    <LearnLayout
      title="LightGBM — Fast Gradient Boosting at Scale"
      description="Leaf-wise tree growth, histogram-based splitting, and why LightGBM trains 10x faster than XGBoost on large datasets."
      section="Classical ML"
      readTime="30–40 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="classical-ml" topic="lightgbm" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — what problem does LightGBM solve?</span>
        <h2 style={S.h2}>
          XGBoost was fast in 2016. By 2017, datasets had grown 100×.
          Microsoft Research built LightGBM to handle what XGBoost could not.
        </h2>

        <p style={S.p}>
          Amazon runs 1.5 million transactions per day.
          Their ML team wants to retrain the product recommendation model
          every night on the last 30 days of data — that is 45 million rows.
          XGBoost takes 6 hours to train on this. The retraining window
          is 4 hours. The math does not work.
        </p>

        <p style={S.p}>
          Microsoft Research published LightGBM in 2017 with a single goal:
          make gradient boosting fast enough for large-scale production datasets.
          They introduced three algorithmic innovations that together
          produce a 10–20× speedup over XGBoost with equal or better accuracy.
          The same Amazon job now completes in 25 minutes.
        </p>

        <p style={S.p}>
          This module explains the three innovations clearly,
          shows you the LightGBM API (nearly identical to XGBoost),
          and gives you the practical parameter guide for production use.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Imagine grading 45 million exam papers to find the best study topic
            to focus on next. XGBoost reads every paper in full before deciding.
            LightGBM does three clever things: it summarises papers into buckets
            instead of reading each word (histograms), it skips papers that scored
            well and focuses on the ones that failed badly (GOSS), and it bundles
            similar questions from different papers together (EFB).
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            Same final insight. A fraction of the reading time.
            That is LightGBM's core contribution.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          LightGBM requires <span style={S.code as React.CSSProperties}>pip install lightgbm</span>.
          It implements the sklearn estimator interface — every Pipeline,
          cross_val_score, and GridSearchCV from earlier modules works unchanged.
          The main difference from XGBoost is parameter names and one
          critical default: leaf-wise growth, which needs
          <span style={S.code as React.CSSProperties}> num_leaves</span> to be tuned
          instead of <span style={S.code as React.CSSProperties}>max_depth</span>.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — THREE INNOVATIONS ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What makes LightGBM different</span>
        <h2 style={S.h2}>Three innovations — each one reduces training time significantly</h2>

        <p style={S.p}>
          LightGBM's speedup comes from three independent algorithmic changes.
          Each one is an engineering insight, not just an implementation trick.
          Understanding them tells you exactly when LightGBM will beat XGBoost
          and when it will not.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
          {[
            {
              num: '1',
              title: 'Histogram-based splitting',
              color: '#BA7517',
              plain: 'XGBoost evaluates every possible split threshold for every feature (exact greedy). With 1 million rows and 50 features, that is potentially 50 million split evaluations per node. LightGBM first bins continuous features into discrete buckets (e.g. 255 bins). Now there are only 255 possible thresholds per feature regardless of how many rows you have. The speedup scales with dataset size — the bigger your dataset, the bigger the advantage.',
              param: 'max_bin (default=255): number of histogram bins. More bins = more accurate splits but slower.',
              speedup: '5–10×',
            },
            {
              num: '2',
              title: 'Gradient-based One-Side Sampling (GOSS)',
              color: '#D85A30',
              plain: 'Not all training samples are equally useful for the next tree. Samples with large gradients (large errors) are informative — the model is very wrong about them. Samples with small gradients are nearly correct already. GOSS keeps all large-gradient samples but randomly drops a fraction of small-gradient ones. Fewer samples to process each iteration, with minimal accuracy loss because you keep the most informative ones.',
              param: 'data_sample_strategy="goss", top_rate (fraction of large-gradient kept), other_rate (fraction of small-gradient kept)',
              speedup: '2–4×',
            },
            {
              num: '3',
              title: 'Exclusive Feature Bundling (EFB)',
              color: '#378ADD',
              plain: 'High-dimensional data is often sparse — many features are zero for most samples. Two features that never have non-zero values at the same time can be merged into one bundle without losing information. This reduces the effective number of features. For one-hot encoded data with thousands of columns, EFB can reduce feature count by 10×.',
              param: 'max_conflict_rate (default=0): max fraction of rows where bundled features both non-zero. Higher = more aggressive bundling.',
              speedup: '2–4× on sparse data',
            },
          ].map((item) => (
            <div key={item.num} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '14px 16px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: `${item.color}15`, border: `1.5px solid ${item.color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 900, color: item.color,
                  fontFamily: 'var(--font-mono)',
                }}>
                  {item.num}
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                    {item.title}
                  </span>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: item.color,
                    fontFamily: 'var(--font-mono)', padding: '2px 8px',
                    background: `${item.color}15`, borderRadius: 4,
                  }}>
                    ~{item.speedup} speedup
                  </span>
                </div>
              </div>
              <p style={{ ...S.ps, marginBottom: 6 }}>{item.plain}</p>
              <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)' }}>
                Key param: {item.param}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Div />

      {/* ══ SECTION 3 — LEAF-WISE VS LEVEL-WISE ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most important structural difference</span>
        <h2 style={S.h2}>Leaf-wise growth — the most accurate split first, always</h2>

        <p style={S.p}>
          Both XGBoost and sklearn GBM grow trees level by level —
          they split every node at depth 1 before moving to depth 2.
          Each level is complete before the next begins.
          This is called level-wise (or breadth-first) growth.
        </p>

        <p style={S.p}>
          LightGBM grows trees leaf-wise — best-first.
          At each step it finds the single leaf in the entire tree
          that would reduce loss the most if split, and splits only that leaf.
          A tree with the same number of leaves as a level-wise tree
          will be deeper and more asymmetric — but it gets to
          the lowest possible loss for that leaf count faster.
        </p>

        <VisualBox label="Level-wise vs leaf-wise growth — same leaves, different paths">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#888', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
                LEVEL-WISE (XGBoost default)
              </div>
              <svg width="100%" viewBox="0 0 220 180">
                {/* Level 0 */}
                <rect x="85" y="10" width="50" height="24" rx="4"
                  fill="rgba(55,138,221,0.2)" stroke="#378ADD" strokeWidth="1.5" />
                <text x="110" y="26" textAnchor="middle" fontSize="9"
                  fill="#378ADD" fontFamily="monospace">root</text>
                {/* Level 1 */}
                <line x1="110" y1="34" x2="55" y2="60" stroke="#555" strokeWidth="1" />
                <line x1="110" y1="34" x2="165" y2="60" stroke="#555" strokeWidth="1" />
                <rect x="30" y="60" width="50" height="24" rx="4"
                  fill="rgba(55,138,221,0.15)" stroke="#378ADD" strokeWidth="1.5" />
                <rect x="140" y="60" width="50" height="24" rx="4"
                  fill="rgba(55,138,221,0.15)" stroke="#378ADD" strokeWidth="1.5" />
                <text x="55" y="76" textAnchor="middle" fontSize="9"
                  fill="#378ADD" fontFamily="monospace">split</text>
                <text x="165" y="76" textAnchor="middle" fontSize="9"
                  fill="#378ADD" fontFamily="monospace">split</text>
                {/* Level 2 — all four split */}
                {[[55,84,10,110],[55,84,45,110],[165,84,120,110],[165,84,155,110]].map(([px,py,cx,cy],i) => (
                  <g key={i}>
                    <line x1={px} y1={py} x2={cx} y2={cy} stroke="#555" strokeWidth="1" />
                    <rect x={cx-18} y={cy} width="36" height="20" rx="3"
                      fill="rgba(55,138,221,0.08)" stroke="#555" strokeWidth="1" />
                  </g>
                ))}
                <text x="110" y="165" textAnchor="middle" fontSize="9"
                  fill="#888" fontFamily="monospace">all nodes at same depth</text>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#BA7517', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
                LEAF-WISE (LightGBM default)
              </div>
              <svg width="100%" viewBox="0 0 220 180">
                {/* Root */}
                <rect x="85" y="10" width="50" height="24" rx="4"
                  fill="rgba(186,117,23,0.2)" stroke="#BA7517" strokeWidth="1.5" />
                <text x="110" y="26" textAnchor="middle" fontSize="9"
                  fill="#BA7517" fontFamily="monospace">root</text>
                {/* Best split → left child */}
                <line x1="110" y1="34" x2="55" y2="60" stroke="#555" strokeWidth="1" />
                <line x1="110" y1="34" x2="165" y2="60" stroke="#555" strokeWidth="1" />
                <rect x="30" y="60" width="50" height="24" rx="4"
                  fill="rgba(186,117,23,0.15)" stroke="#BA7517" strokeWidth="1.5" />
                <rect x="140" y="60" width="50" height="24" rx="4"
                  fill="rgba(100,100,100,0.1)" stroke="#555" strokeWidth="1" />
                <text x="55" y="76" textAnchor="middle" fontSize="9"
                  fill="#BA7517" fontFamily="monospace">best leaf</text>
                <text x="165" y="76" textAnchor="middle" fontSize="9"
                  fill="#888" fontFamily="monospace">leaf</text>
                {/* Best leaf splits again — not the other branch */}
                <line x1="55" y1="84" x2="30" y2="110" stroke="#555" strokeWidth="1" />
                <line x1="55" y1="84" x2="80" y2="110" stroke="#555" strokeWidth="1" />
                <rect x="12" y="110" width="36" height="20" rx="3"
                  fill="rgba(186,117,23,0.1)" stroke="#BA7517" strokeWidth="1.5" />
                <rect x="62" y="110" width="36" height="20" rx="3"
                  fill="rgba(186,117,23,0.08)" stroke="#555" strokeWidth="1" />
                <text x="30" y="124" textAnchor="middle" fontSize="8"
                  fill="#BA7517" fontFamily="monospace">best</text>
                {/* Right branch stays unsplit */}
                <text x="110" y="160" textAnchor="middle" fontSize="9"
                  fill="#888" fontFamily="monospace">asymmetric — deeper on best path</text>
              </svg>
            </div>
          </div>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 8 }}>
            Leaf-wise reaches lower loss faster for the same number of leaves.
            But unconstrained it grows very deep trees — control with
            <strong style={{ color: '#BA7517' }}> num_leaves</strong> (not max_depth).
          </p>
        </VisualBox>

        <ConceptBox title="num_leaves — the most important LightGBM parameter">
          <p style={{ ...S.ps, marginBottom: 10 }}>
            Because LightGBM grows leaf-wise, <strong style={{ color: '#BA7517' }}>max_depth</strong> is
            less meaningful than in XGBoost. The right parameter to control
            model complexity in LightGBM is <strong style={{ color: '#BA7517' }}>num_leaves</strong> —
            the maximum number of leaves any tree can have.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { leaves: '2^max_depth', desc: 'Theoretical maximum leaves for a given depth — use as upper bound for num_leaves' },
              { leaves: 'num_leaves = 31', desc: 'Default. Equivalent to max_depth≈5. Good starting point.' },
              { leaves: 'num_leaves = 127', desc: 'More complex model. Better for large datasets with many interactions.' },
              { leaves: 'num_leaves = 512+', desc: 'Risk of overfitting unless dataset is very large (500k+ rows).' },
            ].map((row) => (
              <div key={row.leaves} style={{
                display: 'flex', gap: 14, background: 'var(--bg2)',
                borderRadius: 5, padding: '7px 10px',
              }}>
                <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#BA7517', minWidth: 160 }}>
                  {row.leaves}
                </span>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{row.desc}</span>
              </div>
            ))}
          </div>
        </ConceptBox>
      </div>

      <Div />

      {/* ══ SECTION 4 — FIRST LIGHTGBM MODEL ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Getting started</span>
        <h2 style={S.h2}>Your first LightGBM model — Amazon demand forecasting</h2>

        <CodeBlock code={`import numpy as np
import pandas as pd
import lightgbm as lgb
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import OrdinalEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 50_000   # large dataset — where LightGBM shines

# ── Amazon daily product demand dataset ─────────────────────────────
categories    = ['Electronics','Fashion','Home','Books','Sports',
                  'Beauty','Grocery','Toys']
warehouses    = ['New York','Delhi','Seattle','Austin','Chicago',
                  'Boston','Kolkata','Ahmedabad']

df = pd.DataFrame({
    'category':          np.random.choice(categories, n),
    'warehouse':         np.random.choice(warehouses, n),
    'day_of_week':       np.random.randint(0, 7, n).astype(float),
    'month':             np.random.randint(1, 13, n).astype(float),
    'is_weekend':        np.random.randint(0, 2, n).astype(float),
    'is_sale_day':       np.random.randint(0, 2, n).astype(float),
    'price':             np.abs(np.random.normal(800, 600, n)).clip(50, 10_000),
    'discount_pct':      np.random.uniform(0, 0.6, n),
    'stock_level':       np.abs(np.random.normal(500, 300, n)).clip(0, 5000).astype(int),
    'avg_rating':        np.random.uniform(3.0, 5.0, n).round(1),
    'n_reviews':         np.abs(np.random.normal(200, 150, n)).clip(0, 2000).astype(int),
    'days_since_launch': np.abs(np.random.normal(180, 120, n)).clip(1, 730).astype(int),
})

# Target: daily units sold
demand = (
    50
    + df['is_sale_day'] * 120
    + df['is_weekend'] * 30
    + (df['discount_pct'] * 200)
    - (df['price'] / 10_000) * 40
    + (df['avg_rating'] - 3.0) * 20
    + np.random.normal(0, 15, n)
).clip(0)

X_tr, X_te, y_tr, y_te = train_test_split(
    df, demand, test_size=0.2, random_state=42
)

NUM_COLS = ['day_of_week','month','is_weekend','is_sale_day','price',
            'discount_pct','stock_level','avg_rating','n_reviews','days_since_launch']
CAT_COLS = ['category', 'warehouse']

# ── LightGBM with categorical feature support ─────────────────────────
# Option 1: OrdinalEncoder (safe, works everywhere)
ct = ColumnTransformer([
    ('num', 'passthrough', NUM_COLS),
    ('cat', OrdinalEncoder(handle_unknown='use_encoded_value',
                           unknown_value=-1), CAT_COLS),
])

pipeline = Pipeline([
    ('prep',  ct),
    ('model', lgb.LGBMRegressor(
        n_estimators      = 1000,
        learning_rate     = 0.05,
        num_leaves        = 63,      # key LightGBM param — not max_depth
        max_depth         = -1,      # -1 = no limit (controlled by num_leaves)
        subsample         = 0.8,
        colsample_bytree  = 0.8,
        reg_alpha         = 0.1,
        reg_lambda        = 1.0,
        min_child_samples = 20,      # LightGBM's min_samples_leaf equivalent
        early_stopping_rounds = 50,
        eval_metric       = 'mae',
        random_state      = 42,
        verbose           = -1,
        n_jobs            = -1,
    )),
])

# ── Early stopping requires eval_set via fit_params ───────────────────
# Preprocess val set separately for early stopping
X_tr2, X_val, y_tr2, y_val = train_test_split(
    X_tr, y_tr, test_size=0.15, random_state=42
)
ct.fit(X_tr2)
X_val_enc = ct.transform(X_val)
X_te_enc  = ct.transform(X_te)
X_tr2_enc = ct.transform(X_tr2)

model = lgb.LGBMRegressor(
    n_estimators=1000, learning_rate=0.05, num_leaves=63,
    max_depth=-1, subsample=0.8, colsample_bytree=0.8,
    reg_alpha=0.1, reg_lambda=1.0, min_child_samples=20,
    random_state=42, verbose=-1, n_jobs=-1,
)
model.fit(
    X_tr2_enc, y_tr2,
    eval_set=[(X_val_enc, y_val)],
    callbacks=[lgb.early_stopping(50, verbose=False),
               lgb.log_evaluation(period=-1)],
)

print(f"Best iteration:  {model.best_iteration_}")
print(f"Best val MAE:    {model.best_score_['valid_0']['l1']:.4f}")
print(f"Test MAE:        {mean_absolute_error(y_te, model.predict(X_te_enc)):.4f} units")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — NATIVE CATEGORICAL SUPPORT ═════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>LightGBM's killer feature</span>
        <h2 style={S.h2}>Native categorical support — no encoding needed</h2>

        <p style={S.p}>
          XGBoost and sklearn's GBM require you to encode categorical features
          before passing them in — one-hot or ordinal encoding.
          LightGBM can handle string categorical columns natively.
          You tell it which columns are categorical and it handles them
          internally using an optimal split strategy that is better than
          ordinal encoding and far more memory-efficient than one-hot.
        </p>

        <p style={S.p}>
          The internal strategy: for each categorical feature LightGBM finds
          the best grouping of category values for each split —
          essentially a many-to-many split instead of a threshold split.
          This is mathematically superior to assigning arbitrary integers
          and treating them as ordered.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
import lightgbm as lgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 20_000

df_cat = pd.DataFrame({
    'category':    np.random.choice(['Electronics','Fashion','Home',
                                      'Books','Sports'], n),
    'warehouse':   np.random.choice(['New York','Delhi','Seattle','Austin'], n),
    'day_of_week': np.random.randint(0, 7, n).astype(float),
    'price':       np.abs(np.random.normal(800, 600, n)).clip(50, 10_000),
    'discount':    np.random.uniform(0, 0.6, n),
    'is_weekend':  np.random.randint(0, 2, n).astype(float),
    'is_sale':     np.random.randint(0, 2, n).astype(float),
})
y_cat = (50 + df_cat['is_sale']*120 + df_cat['is_weekend']*30
         + df_cat['discount']*200 + np.random.normal(0, 15, n)).clip(0)

X_tr, X_te, y_tr, y_te = train_test_split(df_cat, y_cat, test_size=0.2, random_state=42)

# ── Option 1: Convert to pandas Categorical dtype ─────────────────────
# LightGBM auto-detects 'category' dtype columns
df_cat_typed = df_cat.copy()
for col in ['category', 'warehouse']:
    df_cat_typed[col] = df_cat_typed[col].astype('category')

X_tr_cat = df_cat_typed.loc[X_tr.index]
X_te_cat = df_cat_typed.loc[X_te.index]

model_native = lgb.LGBMRegressor(
    n_estimators=300, learning_rate=0.1, num_leaves=31,
    random_state=42, verbose=-1, n_jobs=-1,
)
model_native.fit(X_tr_cat, y_tr)
mae_native = mean_absolute_error(y_te, model_native.predict(X_te_cat))

# ── Option 2: Specify categorical_feature explicitly ──────────────────
model_explicit = lgb.LGBMRegressor(
    n_estimators=300, learning_rate=0.1, num_leaves=31,
    random_state=42, verbose=-1, n_jobs=-1,
)
model_explicit.fit(
    X_tr, y_tr,
    categorical_feature=['category', 'warehouse'],
)
mae_explicit = mean_absolute_error(y_te, model_explicit.predict(X_te))

# ── Option 3: OrdinalEncoder (for comparison) ─────────────────────────
from sklearn.preprocessing import OrdinalEncoder
from sklearn.compose import ColumnTransformer
NUM = ['day_of_week','price','discount','is_weekend','is_sale']
CAT = ['category','warehouse']
ct_ord = ColumnTransformer([
    ('num','passthrough',NUM),
    ('cat',OrdinalEncoder(handle_unknown='use_encoded_value',unknown_value=-1),CAT),
])
X_tr_ord = ct_ord.fit_transform(X_tr)
X_te_ord = ct_ord.transform(X_te)
model_ord = lgb.LGBMRegressor(
    n_estimators=300, learning_rate=0.1, num_leaves=31,
    random_state=42, verbose=-1, n_jobs=-1,
)
model_ord.fit(X_tr_ord, y_tr)
mae_ord = mean_absolute_error(y_te, model_ord.predict(X_te_ord))

print("Categorical encoding comparison:")
print(f"  Native categorical (dtype):  MAE = {mae_native:.4f}")
print(f"  Native categorical (explicit):MAE = {mae_explicit:.4f}")
print(f"  OrdinalEncoder:              MAE = {mae_ord:.4f}")
print("\nNative categorical is usually equal or better — and simpler code.")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — PARAMETER GUIDE ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Parameter reference</span>
        <h2 style={S.h2}>LightGBM parameters — the practical reference</h2>

        <p style={S.p}>
          LightGBM has hundreds of parameters. The vast majority can be ignored.
          Here are the ones that actually matter in production, grouped by purpose,
          with the XGBoost equivalent where relevant.
        </p>

        <VisualBox label="LightGBM vs XGBoost parameter mapping">
          <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              background: 'var(--surface)', borderBottom: '1px solid var(--border)',
              padding: '8px 14px', gap: 10,
            }}>
              {['Purpose', 'LightGBM', 'XGBoost equivalent'].map(h => (
                <span key={h} style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{h}</span>
              ))}
            </div>
            {[
              ['Tree count',         'n_estimators',      'n_estimators'],
              ['Step size',          'learning_rate',     'learning_rate'],
              ['Tree complexity',    'num_leaves=31',     'max_depth=6'],
              ['Depth limit',        'max_depth=-1',      'max_depth'],
              ['Row sampling',       'subsample (bagging_fraction)', 'subsample'],
              ['Column sampling',    'colsample_bytree (feature_fraction)', 'colsample_bytree'],
              ['Min leaf samples',   'min_child_samples=20', 'min_child_weight'],
              ['L1 regularisation',  'reg_alpha (lambda_l1)', 'reg_alpha'],
              ['L2 regularisation',  'reg_lambda (lambda_l2)', 'reg_lambda'],
              ['Histogram bins',     'max_bin=255',       'max_bin (XGB≥1.7)'],
              ['Class imbalance',    'is_unbalance=True or scale_pos_weight', 'scale_pos_weight'],
              ['Suppress output',    'verbose=-1',        'verbosity=0'],
            ].map(([purpose, lgbm, xgb_eq], i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                padding: '7px 14px', gap: 10,
                background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
                borderBottom: i < 11 ? '1px solid var(--border)' : 'none',
                alignItems: 'start',
              }}>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{purpose}</span>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#BA7517' }}>{lgbm}</span>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#D85A30' }}>{xgb_eq}</span>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
import lightgbm as lgb
from sklearn.model_selection import RandomizedSearchCV, StratifiedKFold
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OrdinalEncoder
from sklearn.metrics import mean_absolute_error
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)

# ── num_leaves is the most important parameter to tune ─────────────────
print("num_leaves effect (n_estimators=300, lr=0.1):")
print(f"{'num_leaves':<13} {'Train MAE':<12} {'Test MAE':<12} {'Overfit?'}")
print("─" * 50)

ct_ref = ColumnTransformer([
    ('num', 'passthrough', NUM_COLS),
    ('cat', OrdinalEncoder(handle_unknown='use_encoded_value',
                           unknown_value=-1), CAT_COLS),
])
X_tr_ref = ct_ref.fit_transform(X_tr)
X_te_ref = ct_ref.transform(X_te)

for num_leaves in [7, 15, 31, 63, 127, 255, 511]:
    m = lgb.LGBMRegressor(
        n_estimators=300, learning_rate=0.1,
        num_leaves=num_leaves, min_child_samples=20,
        random_state=42, verbose=-1, n_jobs=-1,
    )
    m.fit(X_tr_ref, y_tr)
    tr_mae = mean_absolute_error(y_tr, m.predict(X_tr_ref))
    te_mae = mean_absolute_error(y_te, m.predict(X_te_ref))
    overfit = '⚠ yes' if tr_mae < te_mae * 0.8 else 'no'
    print(f"  {num_leaves:<11}  {tr_mae:<12.4f} {te_mae:<12.4f} {overfit}")

# ── Full hyperparameter search ─────────────────────────────────────────
param_dist = {
    'model__n_estimators':       [200, 300, 500, 800],
    'model__learning_rate':      [0.01, 0.05, 0.1],
    'model__num_leaves':         [15, 31, 63, 127],
    'model__subsample':          [0.6, 0.7, 0.8, 0.9],
    'model__colsample_bytree':   [0.6, 0.7, 0.8, 0.9, 1.0],
    'model__min_child_samples':  [10, 20, 50, 100],
    'model__reg_alpha':          [0, 0.01, 0.1, 0.5],
    'model__reg_lambda':         [0.5, 1.0, 2.0, 5.0],
}

pipeline_search = Pipeline([
    ('prep',  ct_ref),
    ('model', lgb.LGBMRegressor(random_state=42, verbose=-1, n_jobs=-1)),
])

search = RandomizedSearchCV(
    pipeline_search, param_dist,
    n_iter=30, cv=5,
    scoring='neg_mean_absolute_error',
    random_state=42, n_jobs=-1,
)
search.fit(df.loc[X_tr.index], y_tr)

print(f"\nBest params:")
for k, v in search.best_params_.items():
    print(f"  {k.replace('model__',''):<22}: {v}")
print(f"\nBest CV MAE:  {-search.best_score_:.4f}")
print(f"Test MAE:     {mean_absolute_error(y_te, search.predict(X_te)):.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — LIGHTGBM VS XGBOOST BENCHMARK ═════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Head to head</span>
        <h2 style={S.h2}>LightGBM vs XGBoost — speed and accuracy on real data</h2>

        <p style={S.p}>
          The rule of thumb: for datasets under 100,000 rows both are fine —
          choose based on familiarity. For datasets above 100,000 rows,
          LightGBM is almost always faster with equal or better accuracy.
          For very sparse high-dimensional data (text features, one-hot heavy),
          LightGBM's EFB gives a further advantage.
        </p>

        <CodeBlock code={`import numpy as np
import time
import lightgbm as lgb
import xgboost as xgb
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import OrdinalEncoder
from sklearn.compose import ColumnTransformer
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)

results = []
for n_rows in [10_000, 50_000, 100_000]:
    distance = np.abs(np.random.normal(4.0, 2.0, n_rows)).clip(0.5, 15)
    traffic  = np.random.randint(1, 11, n_rows).astype(float)
    prep     = np.abs(np.random.normal(15, 5, n_rows)).clip(5, 35)
    value    = np.abs(np.random.normal(350, 150, n_rows)).clip(50, 1200)
    delivery = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
                + np.random.normal(0, 4, n_rows)).clip(10, 120)

    X = np.column_stack([distance, traffic, prep, value])
    y = delivery
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

    common = dict(n_estimators=300, learning_rate=0.1, random_state=42)

    models = [
        ('XGBoost',    xgb.XGBRegressor(**common, max_depth=4, subsample=0.8,
                                          colsample_bytree=0.8, verbosity=0)),
        ('LightGBM',   lgb.LGBMRegressor(**common, num_leaves=31, subsample=0.8,
                                           colsample_bytree=0.8, verbose=-1, n_jobs=-1)),
        ('HistGBR',    HistGradientBoostingRegressor(
                           max_iter=300, learning_rate=0.1, max_depth=4)),
    ]

    for name, model in models:
        t0   = time.time()
        model.fit(X_tr, y_tr)
        t    = time.time() - t0
        mae  = mean_absolute_error(y_te, model.predict(X_te))
        results.append((n_rows, name, t, mae))

print(f"{'Rows':<10} {'Model':<12} {'Train time':>12} {'Test MAE':>10}")
print("─" * 48)
for rows, name, t, mae in results:
    print(f"  {rows:<8}  {name:<12}  {t:>10.3f}s  {mae:>10.4f}")

print("\nObservations:")
print("  LightGBM advantage grows with dataset size")
print("  HistGBR (sklearn) is competitive and needs no extra install")
print("  All three give similar MAE — speed is the differentiator")`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — PRODUCTION PIPELINE ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What this looks like at work</span>
        <h2 style={S.h2}>Complete production pipeline — Amazon demand forecasting</h2>

        <CodeBlock code={`import numpy as np
import pandas as pd
import lightgbm as lgb
import shap
import joblib
from sklearn.model_selection import train_test_split, KFold, cross_validate
from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error
from sklearn.preprocessing import OrdinalEncoder
from sklearn.compose import ColumnTransformer
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 30_000

categories = ['Electronics','Fashion','Home','Books','Sports','Beauty']
warehouses = ['New York','Delhi','Seattle','Austin','Chicago','Boston']

df_prod = pd.DataFrame({
    'category':          np.random.choice(categories, n),
    'warehouse':         np.random.choice(warehouses, n),
    'day_of_week':       np.random.randint(0, 7, n).astype(float),
    'month':             np.random.randint(1, 13, n).astype(float),
    'is_weekend':        np.random.randint(0, 2, n).astype(float),
    'is_sale_day':       np.random.randint(0, 2, n).astype(float),
    'price':             np.abs(np.random.normal(800, 600, n)).clip(50, 10_000),
    'discount_pct':      np.random.uniform(0, 0.6, n),
    'stock_level':       np.abs(np.random.normal(500, 300, n)).clip(0, 5000).astype(int),
    'avg_rating':        np.random.uniform(3.0, 5.0, n).round(1),
    'n_reviews':         np.abs(np.random.normal(200, 150, n)).clip(0, 2000).astype(int),
    'days_since_launch': np.abs(np.random.normal(180, 120, n)).clip(1, 730).astype(int),
})
y_prod = (50 + df_prod['is_sale_day']*120 + df_prod['is_weekend']*30
          + df_prod['discount_pct']*200 - (df_prod['price']/10000)*40
          + (df_prod['avg_rating']-3.0)*20
          + np.random.normal(0, 15, n)).clip(0)

NUM_COLS_P = ['day_of_week','month','is_weekend','is_sale_day','price',
              'discount_pct','stock_level','avg_rating','n_reviews','days_since_launch']
CAT_COLS_P = ['category', 'warehouse']

# ── Three-way split ────────────────────────────────────────────────────
X_tv, X_test, y_tv, y_test = train_test_split(
    df_prod, y_prod, test_size=0.15, random_state=42
)
X_train, X_val, y_train, y_val = train_test_split(
    X_tv, y_tv, test_size=0.15, random_state=42
)

ct_prod = ColumnTransformer([
    ('num', 'passthrough', NUM_COLS_P),
    ('cat', OrdinalEncoder(handle_unknown='use_encoded_value',
                           unknown_value=-1), CAT_COLS_P),
])
X_tr_enc  = ct_prod.fit_transform(X_train)
X_val_enc = ct_prod.transform(X_val)
X_te_enc  = ct_prod.transform(X_test)

# ── Final model with early stopping ───────────────────────────────────
model_prod = lgb.LGBMRegressor(
    n_estimators         = 3000,
    learning_rate        = 0.02,
    num_leaves           = 63,
    max_depth            = -1,
    subsample            = 0.8,
    colsample_bytree     = 0.8,
    reg_alpha            = 0.1,
    reg_lambda           = 1.0,
    min_child_samples    = 20,
    random_state         = 42,
    verbose              = -1,
    n_jobs               = -1,
)
model_prod.fit(
    X_tr_enc, y_train,
    eval_set=[(X_val_enc, y_val)],
    callbacks=[
        lgb.early_stopping(stopping_rounds=100, verbose=False),
        lgb.log_evaluation(period=-1),
    ],
)

print(f"Best iteration:  {model_prod.best_iteration_}")
preds = model_prod.predict(X_te_enc)
print(f"Test MAE:        {mean_absolute_error(y_test, preds):.2f} units")
print(f"Test MAPE:       {mean_absolute_percentage_error(y_test, preds)*100:.1f}%")

# ── Feature importance ─────────────────────────────────────────────────
feat_names = NUM_COLS_P + CAT_COLS_P
importance = pd.Series(
    model_prod.feature_importances_,
    index=feat_names
).sort_values(ascending=False)

print("\nFeature importance (split-based):")
for feat, imp in importance.items():
    bar = '█' * int(imp / importance.max() * 30)
    print(f"  {feat:<22}: {bar} {imp}")

# ── SHAP values ────────────────────────────────────────────────────────
explainer   = shap.TreeExplainer(model_prod)
shap_values = explainer.shap_values(X_te_enc[:500])
mean_shap   = np.abs(shap_values).mean(axis=0)
shap_imp    = pd.Series(mean_shap, index=feat_names).sort_values(ascending=False)

print("\nFeature importance (SHAP — more reliable):")
for feat, val in shap_imp.items():
    bar = '█' * int(val / shap_imp.max() * 30)
    print(f"  {feat:<22}: {bar} {val:.4f}")

# ── Save production bundle ─────────────────────────────────────────────
bundle = {
    'preprocessor': ct_prod,
    'model':        model_prod,
    'best_iter':    model_prod.best_iteration_,
    'feature_names': feat_names,
    'version':      'v1.0',
}
joblib.dump(bundle, '/tmp/flipkart_demand_lgbm.pkl')
print("\nProduction bundle saved.")`} />
      </div>

      <Div />

      {/* ══ SECTION 9 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common LightGBM error — explained and fixed</h2>

        <ErrorBlock
          error="LightGBM model severely overfits — perfect training score, poor test score"
          cause="num_leaves is set too high relative to dataset size. Leaf-wise growth with many leaves creates a very deep, complex model that memorises training data. With num_leaves=255 and only 5,000 training samples, nearly every sample gets its own leaf. Unlike XGBoost where max_depth provides a natural hard limit, LightGBM needs explicit num_leaves control."
          fix="Set num_leaves to a much smaller value — start at 31 (default) and increase gradually. The rule: num_leaves < 2^max_depth. For 10,000 samples try num_leaves=31. For 100,000 samples try 63–127. Always use early stopping and monitor the train/val gap. Increase min_child_samples (try 20–100) to require more samples per leaf."
        />

        <ErrorBlock
          error="ValueError: categorical feature has too many unique values when using native categoricals"
          cause="LightGBM's native categorical handling has a default limit of max_cat_threshold=32 unique values per categorical feature. Features with more unique values (like city names, product IDs, zip codes) exceed this threshold and cause an error."
          fix="Either increase the threshold: LGBMRegressor(max_cat_threshold=256), or use OrdinalEncoder to pre-encode high-cardinality categoricals instead of relying on native support. For very high cardinality (1000+ unique values), consider target encoding before feeding to LightGBM."
        />

        <ErrorBlock
          error="early_stopping callback raises TypeError or does not trigger"
          cause="LightGBM changed its callback API between versions. In LightGBM < 3.0, early stopping was a parameter: LGBMRegressor(early_stopping_rounds=50). In LightGBM >= 3.0, it is a callback passed to fit(). Using the old API with a new version (or vice versa) causes either a TypeError or silently no early stopping."
          fix="For LightGBM >= 3.0, use callbacks in fit(): model.fit(X, y, eval_set=[(X_val, y_val)], callbacks=[lgb.early_stopping(50), lgb.log_evaluation(-1)]). Check your version: import lightgbm; print(lightgbm.__version__). For LightGBM < 3.0, pass early_stopping_rounds=50 directly to the constructor."
        />

        <ErrorBlock
          error="LightGBM predictions are negative for a target that should always be positive"
          cause="LightGBM regression uses unconstrained leaf values — it can predict negative numbers even when all training targets are positive. This happens when the model extrapolates beyond the training distribution, especially for demand or count targets near zero."
          fix="Clip predictions after inference: preds = model.predict(X).clip(min=0). For count targets, consider using objective='poisson' or objective='tweedie' which constrain the output to non-negative values by modelling the target as a Poisson or Tweedie distribution. LGBMRegressor(objective='poisson') gives non-negative predictions automatically."
        />
      </div>

      <Div />

      {/* ══ SECTION 10 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          Classical ML is complete. Every major algorithm is covered.
          Next: unsupervised learning — finding structure without labels.
        </h2>

        <p style={S.p}>
          You have now covered every major supervised learning algorithm.
          Linear regression, logistic regression, decision trees, SVMs, KNN,
          Naive Bayes, Random Forest, Gradient Boosting, XGBoost, LightGBM.
          Each one with full intuition, math, code, and real errors.
        </p>

        <p style={S.p}>
          Module 32 begins unsupervised learning — K-Means Clustering.
          Instead of predicting a label, you find hidden groups in data.
          Amazon uses it to segment 300 million customers.
          DoorDash uses it to cluster delivery zones.
          The algorithm requires no labels — it discovers structure
          that was always there but never explicitly defined.
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
              Next — Module 32 · Classical ML
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              K-Means Clustering — Customer Segmentation
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Finding hidden groups in data without labels. Inertia, elbow method,
              silhouette scores, and when clustering is the right approach.
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
          'LightGBM achieves 10–20× speedup over XGBoost through three innovations: histogram-based splitting (bins features into 255 buckets instead of evaluating every threshold), GOSS (keeps large-gradient samples, drops some small-gradient ones), and EFB (bundles mutually exclusive sparse features).',
          'LightGBM grows trees leaf-wise (best-first) instead of level-wise. This reaches lower loss faster for the same number of leaves. The key parameter is num_leaves, not max_depth. Start at 31 (default) and increase for larger datasets.',
          'num_leaves is the most important LightGBM parameter. Too high = overfitting. Rule of thumb: num_leaves < 2^max_depth. For 10k samples use 31. For 100k samples try 63–127. Always pair with min_child_samples=20+ to require sufficient samples per leaf.',
          'LightGBM supports native categorical features — pass string columns directly or convert to pandas category dtype. The internal split strategy is mathematically superior to ordinal encoding for high-cardinality categoricals.',
          'Use early stopping with a validation set. Set n_estimators high (2000–5000), pass callbacks=[lgb.early_stopping(100)] and eval_set=[(X_val, y_val)]. LightGBM will stop automatically and restore the best model.',
          'Choose LightGBM over XGBoost when: dataset has more than 100,000 rows, training time is a constraint, data has high-cardinality categoricals, or data is sparse (text features, one-hot heavy). For smaller datasets both are equivalent — use whichever you know better.',
        ]}
      />
    </LearnLayout>
  )
}