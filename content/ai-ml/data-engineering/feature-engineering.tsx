import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Feature Engineering — Chaduvuko',
  description:
    'Transform raw columns into powerful model inputs. Log transforms, interaction features, target encoding, cyclical encodings, embeddings, and the techniques that consistently outperform model tuning.',
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

export default function FeatureEngineeringPage() {
  return (
    <LearnLayout
      title="Feature Engineering"
      description="Transform raw columns into powerful model inputs. Log transforms, interaction features, target encoding, cyclical encodings, embeddings, and the techniques that consistently beat model tuning."
      section="Data Engineering"
      readTime="60–70 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section='data-engineering' topic='feature-engineering' />

      {/* ══ SECTION 1 — HOOK ═══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Why feature engineering beats model tuning</span>
        <h2 style={S.h2}>
          The model doesn't see your data. It sees the numbers you give it. Make those numbers count.
        </h2>

        <p style={S.p}>
          A linear regression predicting delivery time from distance_km
          will give you one set of numbers. The same linear regression
          predicting from log(distance_km) will give you significantly better numbers —
          because delivery time grows sub-linearly with distance
          (the first kilometre adds more time per km than the fifth kilometre).
          Same model. Different representation. Better result.
        </p>

        <p style={S.p}>
          This is the core idea of feature engineering: transforming raw columns
          into representations that better match the mathematical assumptions
          of the model. Tree-based models (Random Forest, XGBoost) are robust
          to raw features but still benefit from interaction features and
          target encoding. Linear models need transformations to handle skew
          and non-linearity. Neural networks benefit from normalisation and
          embedding representations for categoricals.
        </p>

        <p style={S.p}>
          In competitive ML (Kaggle, production systems), feature engineering
          is consistently the highest-leverage activity. The top solution
          in most Kaggle competitions uses a standard model on engineered features —
          not a novel architecture on raw data.
          This module teaches every major technique with working code
          on the DoorDash dataset.
        </p>

        <HBox color="#1D9E75">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              What this module covers:
            </span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[
              'Numeric transformations — log, sqrt, Box-Cox, scaling',
              'Interaction features — products, ratios, differences',
              'Binning — discretise continuous variables',
              'Datetime features — hour, day, cyclic encoding',
              'Categorical encoding — ordinal, one-hot, target encoding',
              'Target encoding — encode with the label, safely',
              'Frequency encoding — encode by prevalence',
              'Embedding features for high-cardinality categoricals',
              'Aggregate features — group statistics as features',
              'Lag features and rolling windows for time series',
              'Feature selection — filter, wrapper, embedded methods',
              'Feature stores — reuse features across models',
              'Leakage — the silent failure mode that ruins ML systems',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: '#1D9E75', flexShrink: 0, marginTop: 7,
                }} />
                <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </HBox>

        <Callout type="tip">
          Feature engineering must always be done inside a
          <span style={S.code as React.CSSProperties}> Pipeline</span> that is fit
          only on training data. Every technique in this module that uses statistics
          from the data (mean, std, target mean, frequency) must compute those
          statistics from training data only, then apply them to validation and test.
          Leakage — computing on the full dataset — is the most common silent
          failure mode in ML. This module shows you how to prevent it.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — SETUP ══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Setup</span>
        <h2 style={S.h2}>Load the clean DoorDash dataset</h2>

        <CodeBlock code={`import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 10_000

# Generate clean DoorDash dataset (Module 16 output)
restaurants = ['Pizza Hut','Biryani Blues',"McDonald's","Haldiram's",
               'Dominos','KFC','Subway','Burger King']
cities      = ['Seattle','New York','Delhi','Austin','Boston','Chicago']
time_slots  = ['breakfast','lunch','evening','dinner']

distance   = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15).round(2)
traffic    = np.random.randint(1, 11, n)
prep       = np.abs(np.random.normal(15, 5, n)).clip(5, 35).round(1)
value      = np.abs(np.random.normal(350, 150, n)).clip(50, 1200).round(0)
delivery   = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
              + np.random.normal(0, 4, n)).clip(10, 120).round(1)

df = pd.DataFrame({
    'order_id':       [f'SW{i:06d}' for i in range(n)],
    'restaurant':     np.random.choice(restaurants, n),
    'city':           np.random.choice(cities, n),
    'time_slot':      np.random.choice(time_slots, n),
    'distance_km':    distance,
    'traffic_score':  traffic,
    'restaurant_prep': prep,
    'order_value':    value,
    'delivery_time':  delivery,
    'star_rating':    np.round(np.clip(np.random.normal(4.1, 0.6, n), 1, 5), 1),
    'is_late':        delivery > 45,
    'created_at':     pd.date_range('2024-01-01', periods=n, freq='1h'),
})

# Train/test split — do this FIRST, before any feature engineering
X = df.drop(columns=['delivery_time','is_late'])
y = df['delivery_time']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"Train: {len(X_train):,}  Test: {len(X_test):,}")

# Baseline: raw features only
def evaluate(name, X_tr, X_te, y_tr, y_te, model=None):
    if model is None:
        model = Ridge(alpha=1.0)
    model.fit(X_tr, y_tr)
    mae = mean_absolute_error(y_te, model.predict(X_te))
    r2  = r2_score(y_te, model.predict(X_te))
    print(f"  {name:<45}: MAE={mae:.2f} min  R²={r2:.4f}")
    return model

# Start with only numeric columns as baseline
num_cols = ['distance_km','traffic_score','restaurant_prep','order_value','star_rating']
baseline_model = evaluate(
    'Baseline (raw numerics only)',
    X_train[num_cols], X_test[num_cols], y_train, y_test
)`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — NUMERIC TRANSFORMATIONS ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Numeric transformations</span>
        <h2 style={S.h2}>Log, sqrt, Box-Cox and scaling — fix skewed distributions</h2>

        <p style={S.p}>
          Most real-world numeric features are right-skewed — a few very large values
          drag the mean far above the median. Linear models assume features are
          roughly normally distributed. When a feature is heavily skewed,
          a log transform makes the distribution more symmetric and often
          produces a dramatically better linear model.
        </p>

        <p style={S.p}>
          The intuition: delivery time does not increase linearly with distance.
          Going from 1km to 2km adds more time than going from 9km to 10km
          (because acceleration, traffic signals, and restaurant location all
          make short distances disproportionately slow).
          log(distance) captures this diminishing relationship much better
          than raw distance.
        </p>

        <VisualBox label="When to use each numeric transformation">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                transform: 'log1p(x)',
                when: 'Right-skewed, always positive (distances, prices, counts). log1p handles x=0 safely.',
                example: 'distance_km, order_value, restaurant_prep',
                color: '#378ADD',
              },
              {
                transform: 'sqrt(x)',
                when: 'Moderately right-skewed. Milder than log. Good for count data.',
                example: 'n_items, traffic_score when values are small integers',
                color: '#1D9E75',
              },
              {
                transform: 'Box-Cox',
                when: 'Unknown skew direction. Finds the optimal power transform automatically. Only for strictly positive values.',
                example: 'Any right or left-skewed positive column where log might be too aggressive',
                color: '#D85A30',
              },
              {
                transform: 'StandardScaler',
                when: 'After log/sqrt. Required for linear models, SVMs, neural networks. Tree models don\'t need it.',
                example: 'All features before Ridge, LogisticRegression, neural networks',
                color: '#7F77DD',
              },
              {
                transform: 'MinMaxScaler',
                when: 'Need values in [0,1] — for embeddings, image pixel values, when you need bounded range.',
                example: 'star_rating → [0,1] for neural network input',
                color: '#BA7517',
              },
            ].map((item) => (
              <div key={item.transform} style={{
                display: 'flex', gap: 14, alignItems: 'flex-start',
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 7, padding: '10px 13px',
              }}>
                <div style={{
                  minWidth: 90, fontSize: 12, fontWeight: 700,
                  fontFamily: 'var(--font-mono)', color: item.color,
                }}>
                  {item.transform}
                </div>
                <div>
                  <p style={{ ...S.ps, marginBottom: 3 }}>{item.when}</p>
                  <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)' }}>
                    Use for: {item.example}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
import pandas as pd
from scipy import stats
from sklearn.preprocessing import StandardScaler, MinMaxScaler, PowerTransformer

# ── Log transform ─────────────────────────────────────────────────────
# np.log1p(x) = log(1 + x) — handles x=0 safely, same sign as np.log for x > 0

def add_log_features(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    # Log transform right-skewed positive columns
    for col in ['distance_km', 'order_value', 'restaurant_prep']:
        df[f'log_{col}'] = np.log1p(df[col])
    return df

df_log = add_log_features(X_train)

# Verify: skewness before and after
for col in ['distance_km', 'order_value']:
    raw_skew = X_train[col].skew()
    log_skew = np.log1p(X_train[col]).skew()
    print(f"{col}: skew {raw_skew:.2f} → {log_skew:.2f} after log1p")

# ── Square root transform — milder than log ───────────────────────────
df_log['sqrt_traffic'] = np.sqrt(df_log['traffic_score'])

# ── Box-Cox — finds optimal power transform automatically ─────────────
# Requires strictly positive values (use only after confirming > 0)
pt = PowerTransformer(method='box-cox', standardize=True)

# Fit ONLY on training data
cols_to_transform = ['distance_km', 'order_value', 'restaurant_prep']
X_train_pos = X_train[cols_to_transform].clip(lower=0.01)   # ensure > 0
X_test_pos  = X_test[cols_to_transform].clip(lower=0.01)

X_train_bc = pt.fit_transform(X_train_pos)   # fit on train only
X_test_bc  = pt.transform(X_test_pos)         # transform test without refitting

print(f"\nBox-Cox lambdas (optimal power per column):")
for col, lam in zip(cols_to_transform, pt.lambdas_):
    print(f"  {col}: λ = {lam:.3f}  (0=log, 1=no transform, 0.5=sqrt)")

# ── Evaluate: log features vs raw ────────────────────────────────────
log_features = ['log_distance_km','log_order_value','log_restaurant_prep',
                'sqrt_traffic','star_rating']

df_log_test = add_log_features(X_test)
df_log_test['sqrt_traffic'] = np.sqrt(df_log_test['traffic_score'])

scaler = StandardScaler()
X_tr_sc = scaler.fit_transform(df_log[log_features].fillna(0))
X_te_sc = scaler.transform(df_log_test[log_features].fillna(0))

evaluate('Log + sqrt features (Ridge)',
          X_tr_sc, X_te_sc, y_train, y_test)`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — INTERACTION FEATURES ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Interaction features</span>
        <h2 style={S.h2}>Products, ratios and differences — capture combined effects</h2>

        <p style={S.p}>
          An interaction feature combines two existing features into one
          that captures their joint effect. Distance and traffic separately
          each explain some variance in delivery time. But
          <em> distance × traffic</em> captures the combined effect —
          a long distance in high traffic is much worse than either alone.
          Linear models cannot discover this relationship without an explicit
          interaction term. Tree models can, but having it explicit speeds up
          and improves learning.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd

def add_interaction_features(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    # ── Products — amplify joint effects ─────────────────────────────
    # Distance × traffic: high distance in high traffic = worst case
    df['dist_x_traffic']  = df['distance_km'] * df['traffic_score']

    # Distance × prep: both add to delivery time independently
    df['dist_x_prep']     = df['distance_km'] * df['restaurant_prep']

    # All three combined: the ultimate "slow delivery" indicator
    df['dist_x_traffic_x_prep'] = (
        df['distance_km'] * df['traffic_score'] * df['restaurant_prep']
    )

    # ── Ratios — relative relationships ───────────────────────────────
    # Speed (km/h if delivery_time were available) — proxy via distance/prep
    # High value orders relative to distance: efficiency
    df['value_per_km']    = df['order_value'] / df['distance_km'].clip(lower=0.1)

    # Traffic-to-prep ratio: which bottleneck dominates?
    df['traffic_to_prep'] = df['traffic_score'] / df['restaurant_prep'].clip(lower=1)

    # ── Differences — relative deviations ─────────────────────────────
    # These are computed within the training set statistics to avoid leakage
    return df

def add_deviation_features(df_train: pd.DataFrame,
                            df_apply: pd.DataFrame) -> pd.DataFrame:
    """
    Add deviation features — difference from group mean.
    Computed on df_train statistics, applied to df_apply.
    """
    df_apply = df_apply.copy()

    # Distance deviation from city mean (computed on train)
    city_mean_dist = df_train.groupby('city')['distance_km'].mean()
    df_apply['dist_vs_city_mean'] = (
        df_apply['distance_km']
        - df_apply['city'].map(city_mean_dist).fillna(df_train['distance_km'].mean())
    )

    # Order value vs restaurant average
    rest_mean_val = df_train.groupby('restaurant')['order_value'].mean()
    df_apply['value_vs_restaurant_mean'] = (
        df_apply['order_value']
        - df_apply['restaurant'].map(rest_mean_val).fillna(df_train['order_value'].mean())
    )

    return df_apply

# ── Polynomial features — systematic interaction generation ──────────
from sklearn.preprocessing import PolynomialFeatures

# Degree-2 polynomial: adds x², x·y for every pair of features
num_feats = ['distance_km','traffic_score','restaurant_prep']
poly = PolynomialFeatures(degree=2, include_bias=False, interaction_only=False)
X_tr_poly = poly.fit_transform(X_train[num_feats].fillna(0))
X_te_poly = poly.transform(X_test[num_feats].fillna(0))

poly_names = poly.get_feature_names_out(num_feats)
print(f"Polynomial features ({len(poly_names)} total):")
for name in poly_names:
    print(f"  {name}")

# ── Evaluate interaction features ────────────────────────────────────
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge

df_tr_inter = add_interaction_features(X_train)
df_tr_inter = add_deviation_features(X_train, df_tr_inter)

df_te_inter = add_interaction_features(X_test)
df_te_inter = add_deviation_features(X_train, df_te_inter)   # ← train stats

inter_cols = [
    'distance_km','traffic_score','restaurant_prep',
    'log_distance_km' if 'log_distance_km' in df_tr_inter.columns else 'distance_km',
    'dist_x_traffic','dist_x_prep','value_per_km',
    'dist_vs_city_mean','value_vs_restaurant_mean',
]
inter_cols = [c for c in inter_cols if c in df_tr_inter.columns]

sc = StandardScaler()
evaluate(
    'Raw + interaction features (Ridge)',
    sc.fit_transform(df_tr_inter[inter_cols].fillna(0)),
    sc.transform(df_te_inter[inter_cols].fillna(0)),
    y_train, y_test
)`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — BINNING ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Discretisation</span>
        <h2 style={S.h2}>Binning — discretise continuous variables into categories</h2>

        <p style={S.p}>
          Binning converts a continuous variable into discrete buckets.
          This sounds like losing information — and sometimes it is.
          But for linear models, binning can capture non-linear step-function
          relationships that a linear term cannot.
          For tree models, binning pre-computes splits the tree would find anyway,
          sometimes speeding up training significantly on high-cardinality features.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np
from sklearn.preprocessing import KBinsDiscretizer

# ── Equal-width binning — pd.cut ──────────────────────────────────────
# Bins of equal width. Use when you want interpretable ranges.
def bin_distance(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df['distance_bucket'] = pd.cut(
        df['distance_km'],
        bins=[0, 2, 4, 6, 8, 100],
        labels=['very_short','short','medium','long','very_long'],
        right=True,
    )
    return df

# ── Equal-frequency binning — pd.qcut ─────────────────────────────────
# Each bin has same number of samples. More robust to skew.
def qbin_value(df_train: pd.DataFrame, df_apply: pd.DataFrame,
               col: str = 'order_value', q: int = 5) -> pd.DataFrame:
    """
    Compute quantile bins on df_train, apply to df_apply.
    Avoids leakage by using only training distribution.
    """
    df_apply = df_apply.copy()
    # Get quantile boundaries from training data
    _, bin_edges = pd.qcut(df_train[col], q=q, retbins=True, duplicates='drop')
    bin_edges[0]  = -np.inf
    bin_edges[-1] = np.inf
    df_apply[f'{col}_qbin'] = pd.cut(
        df_apply[col], bins=bin_edges,
        labels=[f'q{i+1}' for i in range(len(bin_edges)-1)],
    )
    return df_apply

# ── KBinsDiscretizer — sklearn, pipeline-compatible ───────────────────
kbd = KBinsDiscretizer(
    n_bins=5,
    encode='onehot-dense',   # 'ordinal' for single integer column, 'onehot-dense' for one-hot
    strategy='quantile',      # 'uniform', 'quantile', 'kmeans'
    subsample=None,
)

X_tr_binned = kbd.fit_transform(X_train[['distance_km']].fillna(0))
X_te_binned = kbd.transform(X_test[['distance_km']].fillna(0))
print(f"KBinsDiscretizer output shape: {X_tr_binned.shape}")  # (n, 5) one-hot

# ── Supervised binning — optimal cut points from the target ────────────
# Use decision tree to find the best split points for a feature
from sklearn.tree import DecisionTreeRegressor

def supervised_binning(
    X_col: pd.Series, y: pd.Series, max_bins: int = 6
) -> np.ndarray:
    """
    Find optimal bin edges by fitting a shallow decision tree.
    More principled than equal-width or equal-frequency.
    """
    dt = DecisionTreeRegressor(max_leaf_nodes=max_bins, min_samples_leaf=50)
    dt.fit(X_col.values.reshape(-1, 1), y)
    thresholds = dt.tree_.threshold[dt.tree_.threshold != -2]  # -2 = leaf node
    thresholds = np.sort(np.unique(thresholds))
    bins = np.concatenate([[-np.inf], thresholds, [np.inf]])
    return bins

dist_bins = supervised_binning(X_train['distance_km'].fillna(0), y_train)
print(f"\nSupervised bin edges for distance_km:")
for lo, hi in zip(dist_bins[:-1], dist_bins[1:]):
    lo_str = f'{lo:.2f}' if lo != -np.inf else '-∞'
    hi_str = f'{hi:.2f}' if hi != np.inf else '+∞'
    mask   = (X_train['distance_km'] > lo) & (X_train['distance_km'] <= hi)
    avg_y  = y_train[mask].mean()
    print(f"  ({lo_str}, {hi_str}]: avg delivery = {avg_y:.1f} min")

# Apply supervised bins
X_train['dist_supervised_bin'] = pd.cut(
    X_train['distance_km'], bins=dist_bins, labels=False
).astype('Int64')
X_test['dist_supervised_bin'] = pd.cut(
    X_test['distance_km'], bins=dist_bins, labels=False
).astype('Int64')`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — DATETIME FEATURES ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Time-based features</span>
        <h2 style={S.h2}>Datetime feature engineering — extract every signal from a timestamp</h2>

        <p style={S.p}>
          A raw timestamp is useless to an ML model. But the features
          you extract from it — hour of day, day of week, whether it's a holiday,
          days since the last order — are often among the most predictive features
          in the whole dataset. Delivery time varies dramatically by hour.
          Restaurant prep time varies by day of week. Order value varies by time slot.
          The timestamp encodes all of this, but only if you extract it.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np

def add_datetime_features(df_train: pd.DataFrame,
                           df_apply: pd.DataFrame) -> pd.DataFrame:
    """
    Extract all datetime features from created_at.
    Uses df_train statistics for normalisation where needed.
    """
    df = df_apply.copy()
    ts = pd.to_datetime(df['created_at'])

    # ── Calendar features ──────────────────────────────────────────────
    df['hour']         = ts.dt.hour
    df['day_of_week']  = ts.dt.dayofweek    # 0=Mon, 6=Sun
    df['day_of_month'] = ts.dt.day
    df['month']        = ts.dt.month
    df['quarter']      = ts.dt.quarter
    df['is_weekend']   = ts.dt.dayofweek.isin([5, 6]).astype(int)
    df['week_of_year'] = ts.dt.isocalendar().week.astype(int)

    # ── Cyclical encoding — hour 23 is close to hour 0 ────────────────
    # Sine + cosine encoding preserves the circular nature of time features
    df['hour_sin']     = np.sin(2 * np.pi * df['hour'] / 24)
    df['hour_cos']     = np.cos(2 * np.pi * df['hour'] / 24)
    df['dow_sin']      = np.sin(2 * np.pi * df['day_of_week'] / 7)
    df['dow_cos']      = np.cos(2 * np.pi * df['day_of_week'] / 7)
    df['month_sin']    = np.sin(2 * np.pi * (df['month'] - 1) / 12)
    df['month_cos']    = np.cos(2 * np.pi * (df['month'] - 1) / 12)

    # ── Time-of-day buckets (manually defined business rules) ──────────
    hour_buckets = {
        range(6, 11):  0,   # breakfast
        range(11, 15): 1,   # lunch
        range(15, 19): 2,   # evening
        range(19, 23): 3,   # dinner
    }
    def get_bucket(h):
        for r, v in hour_buckets.items():
            if h in r: return v
        return 4   # late night
    df['hour_bucket'] = df['hour'].apply(get_bucket)

    # ── Peak hour indicator (from training data distribution) ──────────
    # Compute median delivery time per hour on training data
    ts_train = pd.to_datetime(df_train['created_at'])
    hour_train_median = pd.Series(
        y_train.values,
        index=ts_train.dt.hour
    ).groupby(level=0).median()

    # Flag hours in top quartile as "peak" hours
    peak_threshold = hour_train_median.quantile(0.75)
    peak_hours     = set(hour_train_median[hour_train_median > peak_threshold].index)
    df['is_peak_hour'] = df['hour'].isin(peak_hours).astype(int)

    # ── Days since epoch — useful raw numeric feature ──────────────────
    epoch = pd.Timestamp('2024-01-01')
    df['days_since_epoch'] = (ts - epoch).dt.days

    return df

df_tr_dt = add_datetime_features(X_train, X_train)
df_te_dt = add_datetime_features(X_train, X_test)  # train stats for peak hours

datetime_cols = [
    'hour_sin','hour_cos','dow_sin','dow_cos','month_sin','month_cos',
    'is_weekend','is_peak_hour','hour_bucket','days_since_epoch',
    'distance_km','traffic_score','restaurant_prep',
]
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
evaluate(
    'Raw + datetime features (Ridge)',
    sc.fit_transform(df_tr_dt[datetime_cols].fillna(0)),
    sc.transform(df_te_dt[datetime_cols].fillna(0)),
    y_train, y_test
)

# ── Lag features and rolling windows for time series ──────────────────
# Only valid when orders are sorted by time and you have sufficient history

def add_lag_features(df: pd.DataFrame,
                     entity_col: str = 'restaurant',
                     target_col: str = 'delivery_time',
                     lags: list = [1, 3, 7]) -> pd.DataFrame:
    """
    Add lag features: previous N values of target for the same entity.
    CRITICAL: sort by time first, compute within each entity group.
    """
    df = df.sort_values('created_at').copy()
    for lag in lags:
        df[f'{target_col}_lag_{lag}'] = (
            df.groupby(entity_col)[target_col]
            .shift(lag)   # look back lag steps within the group
        )
    return df

def add_rolling_features(df: pd.DataFrame,
                          entity_col: str = 'restaurant',
                          target_col: str = 'delivery_time',
                          windows: list = [5, 10, 30]) -> pd.DataFrame:
    """
    Rolling mean and std of target for the same entity.
    min_periods=1 avoids NaN for early rows.
    """
    df = df.sort_values('created_at').copy()
    for w in windows:
        rolled = (
            df.groupby(entity_col)[target_col]
            .shift(1)   # shift first — don't include current row in window
            .groupby(df[entity_col])
            .rolling(w, min_periods=1)
            .agg(['mean','std'])
            .reset_index(level=0, drop=True)
        )
        df[f'{target_col}_roll{w}_mean'] = rolled['mean']
        df[f'{target_col}_roll{w}_std']  = rolled['std'].fillna(0)
    return df

# NOTE: lag/rolling features require the target column in the DataFrame
# during feature engineering — use only for offline training, never for
# real-time inference where future data is unavailable
df_with_target = X_train.copy()
df_with_target['delivery_time'] = y_train.values
df_lag = add_lag_features(df_with_target, lags=[1, 3, 7])
df_lag = add_rolling_features(df_lag, windows=[5, 10])
print(f"\nLag/rolling features added: {df_lag.filter(like='lag').columns.tolist()}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — CATEGORICAL ENCODING ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Categorical encoding</span>
        <h2 style={S.h2}>Encoding strategies — from one-hot to target encoding</h2>

        <p style={S.p}>
          Categorical columns cannot go into an ML model as strings.
          They must be converted to numbers. There are many ways to do this,
          and the choice matters significantly for model performance.
          One-hot encoding is safest but creates sparse high-dimensional representations.
          Target encoding is compact and informative but requires careful
          implementation to avoid leakage.
        </p>

        <VisualBox label="Encoding strategies — when to use each">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                method: 'Ordinal encoding',
                when: 'When the categories have a natural order: low < medium < high. Map directly to 0, 1, 2.',
                leakage: 'None',
                color: '#378ADD',
                limit: 'Any cardinality',
              },
              {
                method: 'One-hot encoding',
                when: 'Low-cardinality unordered categoricals (< 20 values). Creates a binary column per category.',
                leakage: 'None',
                color: '#1D9E75',
                limit: '< 20 unique values',
              },
              {
                method: 'Frequency encoding',
                when: 'High-cardinality columns. Replace each category with its frequency in training data.',
                leakage: 'Yes — compute on train only',
                color: '#BA7517',
                limit: 'Any cardinality',
              },
              {
                method: 'Target encoding',
                when: 'High-cardinality columns with strong relationship to target. Replace with mean target per category.',
                leakage: 'High — must use cross-val encoding',
                color: '#D85A30',
                limit: 'Any cardinality',
              },
              {
                method: 'Embedding (learned)',
                when: 'Very high cardinality (> 100 values) in neural networks. Train a dense vector per category.',
                leakage: 'None',
                color: '#7F77DD',
                limit: 'Best for > 50 unique values',
              },
            ].map((item) => (
              <div key={item.method} style={{
                display: 'grid', gridTemplateColumns: '160px 1fr 120px 120px',
                gap: 10, alignItems: 'flex-start',
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 6, padding: '9px 13px',
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>
                  {item.method}
                </span>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{item.when}</span>
                <span style={{
                  fontSize: 11, fontFamily: 'var(--font-mono)',
                  color: item.leakage === 'None' ? '#1D9E75' : '#ff4757',
                }}>
                  Leakage: {item.leakage}
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  {item.limit}
                </span>
              </div>
            ))}
          </div>
        </VisualBox>

        <h3 style={S.h3}>One-hot encoding — safe, sparse, standard</h3>

        <CodeBlock code={`import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder

# ── One-hot encoding ──────────────────────────────────────────────────
ohe = OneHotEncoder(
    sparse_output=False,    # return dense array, not sparse matrix
    handle_unknown='ignore', # unknown categories in test → all zeros (not an error)
    drop='first',            # drop first category to avoid multicollinearity
)

cat_cols = ['city', 'time_slot']
X_tr_ohe = ohe.fit_transform(X_train[cat_cols])
X_te_ohe = ohe.transform(X_test[cat_cols])

ohe_names = ohe.get_feature_names_out(cat_cols)
print(f"One-hot features ({len(ohe_names)}):")
for name in ohe_names:
    print(f"  {name}")

# ── Ordinal encoding — for ordered categories ──────────────────────────
# time_slot has a natural daily order: breakfast < lunch < evening < dinner
ord_enc = OrdinalEncoder(
    categories=[['breakfast','lunch','evening','dinner']],
    handle_unknown='use_encoded_value',
    unknown_value=-1,
)
X_train['time_slot_ord'] = ord_enc.fit_transform(X_train[['time_slot']])
X_test['time_slot_ord']  = ord_enc.transform(X_test[['time_slot']])

# ── pd.get_dummies — quick one-hot for exploration ────────────────────
# NOT recommended for pipelines — test set may have different categories
city_dummies_train = pd.get_dummies(X_train['city'], prefix='city', drop_first=True)
# Safer to use sklearn OHE in production pipelines`} />

        <h3 style={S.h3}>Target encoding — the most powerful, most dangerous technique</h3>

        <p style={S.p}>
          Target encoding replaces each category value with the mean of the
          target variable for that category. "Pizza Hut" becomes 36.4 (its
          mean delivery time in the training set). This is extremely informative
          and produces compact, powerful features. It is also the most dangerous
          encoding technique — naive implementation directly leaks the target
          into the features, causing massive overfitting that looks great in
          cross-validation but collapses in production.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np
from sklearn.model_selection import KFold

# ── WRONG way — DO NOT DO THIS ────────────────────────────────────────
# Computing target encoding on the full dataset before splitting
# leaks test labels into training features
def naive_target_encode(df, col, target):
    means = df.groupby(col)[target].mean()
    return df[col].map(means)

# This is WRONG because:
# 1. When encoding the training set, each row's own target is included
# 2. When validating, the model has seen the encoded version which contains
#    information about the exact validation targets

# ── CORRECT way: cross-fold target encoding ───────────────────────────
def cross_fold_target_encode(
    X_train: pd.DataFrame,
    y_train: pd.Series,
    X_test:  pd.DataFrame,
    col:     str,
    n_folds: int = 5,
    smoothing: float = 10.0,
) -> tuple:
    """
    Target encoding with k-fold to prevent leakage.

    For each row in training:
      - Compute the target mean for its category using ALL OTHER folds
      - Never include the current row's own target

    Smoothing formula: (n * category_mean + m * global_mean) / (n + m)
    where n = category count, m = smoothing parameter
    This prevents rare categories from being noisy.
    """
    global_mean    = y_train.mean()
    train_encoded  = pd.Series(index=X_train.index, dtype=float)
    kf             = KFold(n_splits=n_folds, shuffle=True, random_state=42)

    for fold_train_idx, fold_val_idx in kf.split(X_train):
        fold_X = X_train.iloc[fold_train_idx]
        fold_y = y_train.iloc[fold_train_idx]

        # Compute category mean on this fold's training portion
        cat_stats = pd.DataFrame({
            'count': fold_y.groupby(fold_X[col].values).count(),
            'mean':  fold_y.groupby(fold_X[col].values).mean(),
        })

        # Smoothed mean: blend category mean with global mean
        cat_stats['smoothed'] = (
            (cat_stats['count'] * cat_stats['mean'] + smoothing * global_mean)
            / (cat_stats['count'] + smoothing)
        )

        # Apply to validation portion of THIS fold
        val_cats = X_train.iloc[fold_val_idx][col]
        train_encoded.iloc[fold_val_idx] = (
            val_cats.map(cat_stats['smoothed']).fillna(global_mean)
        )

    # For test set: use all training data to compute the encoding
    all_stats = pd.DataFrame({
        'count': y_train.groupby(X_train[col].values).count(),
        'mean':  y_train.groupby(X_train[col].values).mean(),
    })
    all_stats['smoothed'] = (
        (all_stats['count'] * all_stats['mean'] + smoothing * global_mean)
        / (all_stats['count'] + smoothing)
    )
    test_encoded = X_test[col].map(all_stats['smoothed']).fillna(global_mean)

    return train_encoded, test_encoded

# Encode restaurant and city
rest_tr, rest_te = cross_fold_target_encode(
    X_train, y_train, X_test, 'restaurant', n_folds=5, smoothing=10
)
city_tr, city_te = cross_fold_target_encode(
    X_train, y_train, X_test, 'city', n_folds=5, smoothing=5
)

X_train['restaurant_target_enc'] = rest_tr.values
X_test['restaurant_target_enc']  = rest_te.values
X_train['city_target_enc']       = city_tr.values
X_test['city_target_enc']        = city_te.values

# What did we learn?
enc_means = X_train.groupby(X_train['restaurant'])['restaurant_target_enc'].first()
print("Target-encoded restaurant values (= avg delivery time):")
for rest, val in enc_means.sort_values().items():
    print(f"  {rest:<20}: {val:.1f} min")`} />

        <h3 style={S.h3}>Frequency encoding — fast, leakage-safe, surprisingly effective</h3>

        <CodeBlock code={`import pandas as pd
import numpy as np

def frequency_encode(
    X_train: pd.DataFrame,
    X_apply: pd.DataFrame,
    cols:    list,
) -> pd.DataFrame:
    """
    Replace each category with its relative frequency in the training set.
    Rare categories get low values, common categories get high values.
    Completely leakage-free — uses only X_train, not y_train.
    """
    X_apply = X_apply.copy()
    for col in cols:
        freq_map = X_train[col].value_counts(normalize=True)
        X_apply[f'{col}_freq'] = (
            X_apply[col].map(freq_map).fillna(1 / len(X_train))
        )
    return X_apply

X_train = frequency_encode(X_train, X_train, ['restaurant','city'])
X_test  = frequency_encode(X_train, X_test,  ['restaurant','city'])

print("Frequency encoded values:")
print(X_train.groupby('restaurant')['restaurant_freq'].first().sort_values())`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — AGGREGATE FEATURES ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Group statistics as features</span>
        <h2 style={S.h2}>Aggregate features — group statistics that make each row context-aware</h2>

        <p style={S.p}>
          A single order's distance of 5km tells the model less than knowing
          that this order is 2km longer than the average order to this restaurant.
          Aggregate features add context by computing statistics within groups —
          per restaurant, per city, per time slot — and attaching them to each row.
          These are among the most consistently powerful features across all ML problems.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np

def add_aggregate_features(
    df_train: pd.DataFrame,
    df_apply: pd.DataFrame,
    y_train:  pd.Series,
) -> pd.DataFrame:
    """
    Compute group-level statistics on df_train, attach to df_apply rows.
    All statistics use df_train ONLY — no leakage.
    """
    df = df_apply.copy()
    df_tr = df_train.copy()
    df_tr['_target'] = y_train.values

    # ── Per-restaurant statistics ─────────────────────────────────────
    rest_stats = df_tr.groupby('restaurant').agg(
        rest_avg_delivery  = ('_target',          'mean'),
        rest_std_delivery  = ('_target',          'std'),
        rest_avg_distance  = ('distance_km',      'mean'),
        rest_avg_prep      = ('restaurant_prep',   'mean'),
        rest_late_rate     = ('_target',          lambda x: (x > 45).mean()),
        rest_order_count   = ('_target',          'count'),
        rest_avg_value     = ('order_value',       'mean'),
    ).reset_index()

    df = df.merge(rest_stats, on='restaurant', how='left')

    # ── Per-city statistics ────────────────────────────────────────────
    city_stats = df_tr.groupby('city').agg(
        city_avg_delivery  = ('_target',          'mean'),
        city_std_delivery  = ('_target',          'std'),
        city_avg_traffic   = ('traffic_score',    'mean'),
        city_late_rate     = ('_target',          lambda x: (x > 45).mean()),
    ).reset_index()

    df = df.merge(city_stats, on='city', how='left')

    # ── Per time slot ──────────────────────────────────────────────────
    slot_stats = df_tr.groupby('time_slot').agg(
        slot_avg_delivery  = ('_target',          'mean'),
        slot_avg_traffic   = ('traffic_score',    'mean'),
    ).reset_index()

    df = df.merge(slot_stats, on='time_slot', how='left')

    # ── Cross-group: restaurant × city ────────────────────────────────
    cross_stats = df_tr.groupby(['restaurant','city']).agg(
        rest_city_avg_delivery = ('_target', 'mean'),
        rest_city_n_orders     = ('_target', 'count'),
    ).reset_index()

    df = df.merge(cross_stats, on=['restaurant','city'], how='left')

    # ── Deviation features: how does this row compare to group mean? ───
    df['dist_vs_restaurant_mean'] = df['distance_km'] - df['rest_avg_distance']
    df['prep_vs_restaurant_mean'] = df['restaurant_prep'] - df['rest_avg_prep']
    df['traffic_vs_city_mean']    = df['traffic_score'] - df['city_avg_traffic']

    # ── Ratio features: relative position within the group ────────────
    df['value_vs_restaurant_mean_ratio'] = (
        df['order_value'] / df['rest_avg_value'].clip(lower=1)
    )

    return df

df_tr_agg = add_aggregate_features(X_train, X_train, y_train)
df_te_agg = add_aggregate_features(X_train, X_test, y_train)  # train stats only

agg_feature_cols = [
    'distance_km','traffic_score','restaurant_prep',
    'rest_avg_delivery','rest_std_delivery','rest_late_rate',
    'city_avg_delivery','city_avg_traffic','city_late_rate',
    'slot_avg_delivery','slot_avg_traffic',
    'dist_vs_restaurant_mean','traffic_vs_city_mean',
    'value_vs_restaurant_mean_ratio',
    'restaurant_target_enc','city_target_enc',
    'hour_sin','hour_cos','dow_sin','dow_cos','is_weekend',
]
agg_feature_cols = [c for c in agg_feature_cols if c in df_tr_agg.columns]

from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
evaluate(
    'All features combined (Ridge)',
    sc.fit_transform(df_tr_agg[agg_feature_cols].fillna(df_tr_agg[agg_feature_cols].median())),
    sc.transform(df_te_agg[agg_feature_cols].fillna(df_tr_agg[agg_feature_cols].median())),
    y_train, y_test,
)

# Compare with tree model — trees don't need scaling
df_tr_agg_rf = df_tr_agg[agg_feature_cols].fillna(df_tr_agg[agg_feature_cols].median())
df_te_agg_rf = df_te_agg[agg_feature_cols].fillna(df_tr_agg[agg_feature_cols].median())

evaluate(
    'All features combined (Random Forest)',
    df_tr_agg_rf, df_te_agg_rf, y_train, y_test,
    model=RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1),
)`} />
      </div>

      <Div />

      {/* ══ SECTION 9 — FEATURE SELECTION ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Which features to keep</span>
        <h2 style={S.h2}>Feature selection — remove what doesn't help</h2>

        <p style={S.p}>
          More features is not always better. Irrelevant features add noise,
          slow down training, and can hurt generalisation.
          Feature selection identifies which features contribute meaningful
          signal and removes those that don't.
          There are three families of methods, each with different tradeoffs.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np
from sklearn.feature_selection import (
    SelectKBest, f_regression, mutual_info_regression,
    SelectFromModel, RFE,
)
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LassoCV

# Prepare feature matrix
X_feat = df_tr_agg[agg_feature_cols].fillna(df_tr_agg[agg_feature_cols].median())
X_feat_te = df_te_agg[agg_feature_cols].fillna(df_tr_agg[agg_feature_cols].median())

# ── Filter methods — fast, model-agnostic ─────────────────────────────

# F-statistic (linear correlation with target)
f_selector = SelectKBest(score_func=f_regression, k='all')
f_selector.fit(X_feat, y_train)
f_scores = pd.Series(f_selector.scores_, index=agg_feature_cols).sort_values(ascending=False)

print("F-statistic feature ranking (top 10):")
for feat, score in f_scores.head(10).items():
    bar = '█' * int(min(score, 500) / 20)
    print(f"  {feat:<40}: {bar} {score:.1f}")

# Mutual information (captures non-linear relationships)
mi_scores = mutual_info_regression(X_feat, y_train, random_state=42)
mi_series = pd.Series(mi_scores, index=agg_feature_cols).sort_values(ascending=False)

print("\nMutual information ranking (top 10):")
for feat, score in mi_series.head(10).items():
    bar = '█' * int(score * 100)
    print(f"  {feat:<40}: {bar} {score:.4f}")

# ── Embedded methods — regularisation selects during training ──────────

# Lasso: drives coefficients of unimportant features to exactly 0
lasso = LassoCV(cv=5, random_state=42, n_jobs=-1)
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_sc = sc.fit_transform(X_feat)
lasso.fit(X_sc, y_train)

lasso_coef = pd.Series(lasso.coef_, index=agg_feature_cols)
selected_by_lasso  = lasso_coef[lasso_coef != 0].index.tolist()
eliminated_by_lasso = lasso_coef[lasso_coef == 0].index.tolist()
print(f"\nLasso selected {len(selected_by_lasso)} features, eliminated {len(eliminated_by_lasso)}")
print(f"Eliminated: {eliminated_by_lasso}")

# Random Forest feature importance
rf_selector = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
rf_selector.fit(X_feat, y_train)

rf_importance = pd.Series(
    rf_selector.feature_importances_, index=agg_feature_cols
).sort_values(ascending=False)

print("\nRandom Forest importance (top 10):")
for feat, imp in rf_importance.head(10).items():
    bar = '█' * int(imp * 300)
    print(f"  {feat:<40}: {bar} {imp:.4f}")

# SelectFromModel: keep features above a threshold
sfm = SelectFromModel(rf_selector, threshold='mean', prefit=True)
selected_features = [
    agg_feature_cols[i]
    for i in range(len(agg_feature_cols))
    if sfm.get_support()[i]
]
print(f"\nSelectFromModel (> mean importance): {len(selected_features)} features selected")

# ── Variance threshold — remove near-constant features ────────────────
from sklearn.feature_selection import VarianceThreshold

vt = VarianceThreshold(threshold=0.01)   # remove features with < 1% variance
X_var = vt.fit_transform(X_feat)
removed_low_var = [
    agg_feature_cols[i] for i in range(len(agg_feature_cols))
    if not vt.get_support()[i]
]
print(f"\nLow-variance features removed: {removed_low_var}")

# ── Correlation-based removal — drop highly correlated pairs ──────────
corr_matrix = X_feat.corr().abs()
upper_tri   = corr_matrix.where(
    np.triu(np.ones(corr_matrix.shape), k=1).astype(bool)
)
to_drop = [
    col for col in upper_tri.columns
    if any(upper_tri[col] > 0.95)
]
print(f"Highly correlated features (r > 0.95): {to_drop}")`} />
      </div>

      <Div />

      {/* ══ SECTION 10 — LEAKAGE ═══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The silent failure mode</span>
        <h2 style={S.h2}>Feature leakage — the most dangerous mistake in ML</h2>

        <p style={S.p}>
          Feature leakage occurs when information about the target variable
          leaks into the features during training. The model learns a shortcut —
          it can "predict" the target because the feature contains the answer,
          not because it has learned the underlying pattern.
          Evaluation metrics look impossibly good. Then the model ships to production
          where the future isn't available, and performance collapses.
        </p>

        <p style={S.p}>
          Leakage is not always obvious. The most common forms are subtle
          and require discipline to prevent consistently.
        </p>

        <VisualBox label="Five types of leakage — all common in production ML">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                type: 'Target leakage',
                severity: 'Critical',
                color: '#ff4757',
                desc: 'A feature is computed from or highly correlated with the target. Example: using total_delivery_fees (which includes a late-delivery fee) to predict is_late.',
                fix: 'Check feature correlations with target. Remove any feature that is only known after the event you are predicting.',
              },
              {
                type: 'Train-test contamination',
                severity: 'Critical',
                color: '#ff4757',
                desc: 'Fit a scaler, encoder, or imputer on the full dataset before splitting. Statistics (mean, std, target mean) computed on test data contaminate training.',
                fix: 'Always split first, then fit transformers on X_train only. Use sklearn Pipeline — it enforces this automatically.',
              },
              {
                type: 'Future data leakage',
                severity: 'High',
                color: '#D85A30',
                desc: 'For time-series: using future information when creating features for past examples. Rolling window computed without shift(), target encoding with future rows.',
                fix: 'Always shift(1) before rolling operations. Sort by time before groupby. Use temporal cross-validation (TimeSeriesSplit), not random KFold.',
              },
              {
                type: 'Group leakage',
                severity: 'High',
                color: '#BA7517',
                desc: 'Same customer or entity appears in both train and test. Model learns entity-specific patterns that don\'t generalise to new entities.',
                fix: 'Split by entity (customer, store, user) not by row when the task is to predict for new entities.',
              },
              {
                type: 'Preprocessing leakage',
                severity: 'Medium',
                color: '#1D9E75',
                desc: 'Imputing missing values with the column mean computed on the full dataset. The test set mean influences the imputed values in training.',
                fix: 'Use sklearn Pipeline with SimpleImputer inside. The pipeline fits imputer only on X_train automatically.',
              },
            ].map((item) => (
              <div key={item.type} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}30`,
                borderRadius: 8, padding: '12px 15px',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 5 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)' }}>
                    {item.type}
                  </span>
                  <span style={{
                    fontSize: 10, fontWeight: 700, color: item.color,
                    fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
                    padding: '2px 6px', borderRadius: 3,
                    background: `${item.color}15`,
                  }}>
                    {item.severity}
                  </span>
                </div>
                <p style={{ ...S.ps, marginBottom: 5 }}>{item.desc}</p>
                <p style={{ ...S.ps, marginBottom: 0, color: '#1D9E75' }}>
                  <strong>Fix:</strong> {item.fix}
                </p>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error

# ── The right way: everything inside a Pipeline ────────────────────────
# Pipeline enforces that all transformers are fit only on X_train

numeric_features = ['distance_km','traffic_score','restaurant_prep',
                     'order_value','star_rating']
categorical_features = ['restaurant','city','time_slot']

# Numeric transformer: impute → scale
numeric_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),   # fit on train only
    ('scaler',  StandardScaler()),                    # fit on train only
])

# Categorical transformer: impute → one-hot
categorical_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot',  OneHotEncoder(handle_unknown='ignore', sparse_output=False, drop='first')),
])

# ColumnTransformer: apply different transformers to different columns
preprocessor = ColumnTransformer([
    ('num', numeric_transformer,         numeric_features),
    ('cat', categorical_transformer,     categorical_features),
])

# Full pipeline: preprocessing → model
full_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('model',        Ridge(alpha=10.0)),
])

# fit() calls fit_transform on train, then trains the model
full_pipeline.fit(X_train[numeric_features + categorical_features], y_train)

# predict() calls transform (not fit_transform) on test
y_pred = full_pipeline.predict(X_test[numeric_features + categorical_features])
mae = mean_absolute_error(y_test, y_pred)
r2  = r2_score(y_test, y_pred)
print(f"  Pipeline (safe) — MAE={mae:.2f} min  R²={r2:.4f}")

# ── Detecting leakage: the suspiciously good model test ───────────────
# If your model has near-perfect evaluation metrics, check for leakage
# Red flags:
# - R² > 0.999 for a noisy real-world problem → almost certainly leaking
# - Performance on test dramatically better than production → leaking
# - Feature importance dominated by one feature you didn't expect → leaking

# Leakage detection: check feature correlation with target
all_cols = numeric_features + categorical_features
correlations = {}
for col in numeric_features:
    corr = X_train[col].corr(y_train)
    correlations[col] = corr

print("\nFeature correlations with target (>0.9 suspicious):")
for col, corr in sorted(correlations.items(), key=lambda x: abs(x[1]), reverse=True):
    warning = " ← SUSPICIOUS" if abs(corr) > 0.9 else ""
    print(f"  {col:<30}: {corr:.4f}{warning}")`} />
      </div>

      <Div />

      {/* ══ SECTION 11 — FEATURE STORE ═════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Production patterns</span>
        <h2 style={S.h2}>Feature stores — reuse features across models</h2>

        <p style={S.p}>
          In a production ML system, the same features are used by multiple models.
          The "restaurant average delivery time" feature might be used by the ETA
          prediction model, the fraud model, and the restaurant ranking model.
          Computing it three times independently wastes compute and introduces
          inconsistencies. A feature store computes features once, stores them,
          and serves them to any model that needs them.
        </p>

        <CodeBlock code={`import pandas as pd
import numpy as np
import json
import hashlib
from pathlib import Path
from datetime import datetime

class SimpleFeatureStore:
    """
    A lightweight local feature store for ML projects.
    In production: use Feast, Hopsworks, or Tecton instead.
    This teaches the core concepts without infrastructure overhead.
    """

    def __init__(self, store_path: Path = Path('/tmp/feature_store')):
        self.store_path = store_path
        self.store_path.mkdir(parents=True, exist_ok=True)
        self.registry: dict = self._load_registry()

    def _load_registry(self) -> dict:
        reg_file = self.store_path / 'registry.json'
        if reg_file.exists():
            return json.loads(reg_file.read_text())
        return {}

    def _save_registry(self):
        reg_file = self.store_path / 'registry.json'
        reg_file.write_text(json.dumps(self.registry, indent=2, default=str))

    def register_feature_group(
        self,
        name:        str,
        description: str,
        entity_key:  str,       # e.g. 'restaurant', 'city', 'customer_id'
        features:    list,      # list of feature column names
    ):
        """Register a feature group definition."""
        self.registry[name] = {
            'description': description,
            'entity_key':  entity_key,
            'features':    features,
            'created_at':  datetime.now().isoformat(),
        }
        self._save_registry()
        print(f"Registered feature group: '{name}' ({len(features)} features)")

    def write_features(
        self,
        group_name: str,
        df:         pd.DataFrame,
        version:    str = 'latest',
    ):
        """Write a feature DataFrame to the store."""
        path = self.store_path / f"{group_name}_{version}.parquet"
        df.to_parquet(path, index=False)
        self.registry[group_name]['latest_version'] = version
        self.registry[group_name]['n_rows']         = len(df)
        self.registry[group_name]['updated_at']     = datetime.now().isoformat()
        self._save_registry()
        print(f"Written {len(df):,} rows → {path.name}")

    def read_features(
        self,
        group_name: str,
        version:    str = 'latest',
    ) -> pd.DataFrame:
        """Read feature group from store."""
        path = self.store_path / f"{group_name}_{version}.parquet"
        if not path.exists():
            raise FileNotFoundError(f"Feature group '{group_name}' v{version} not found")
        return pd.read_parquet(path)

    def get_training_dataset(
        self,
        base_df:      pd.DataFrame,
        feature_groups: list,
        join_key:     str = None,
    ) -> pd.DataFrame:
        """
        Join multiple feature groups onto a base DataFrame.
        This is the core operation of a feature store.
        """
        result = base_df.copy()
        for group_name in feature_groups:
            meta  = self.registry.get(group_name)
            if not meta:
                raise KeyError(f"Feature group '{group_name}' not registered")
            key    = join_key or meta['entity_key']
            feats  = self.read_features(group_name)
            result = result.merge(feats, on=key, how='left')
            print(f"  Joined '{group_name}': {len(meta['features'])} features via {key}")
        return result

# ── Populate the feature store ─────────────────────────────────────────
store = SimpleFeatureStore()

# Feature group 1: restaurant-level features
store.register_feature_group(
    name        = 'restaurant_features',
    description = 'Historical statistics per restaurant',
    entity_key  = 'restaurant',
    features    = ['rest_avg_delivery','rest_late_rate','rest_avg_prep','rest_order_count'],
)

# Compute and write
df_with_target = X_train.copy()
df_with_target['delivery_time'] = y_train.values
rest_features = df_with_target.groupby('restaurant').agg(
    rest_avg_delivery  = ('delivery_time', 'mean'),
    rest_late_rate     = ('delivery_time', lambda x: (x > 45).mean()),
    rest_avg_prep      = ('restaurant_prep', 'mean'),
    rest_order_count   = ('delivery_time', 'count'),
).reset_index()
store.write_features('restaurant_features', rest_features)

# Feature group 2: city-level features
store.register_feature_group(
    name        = 'city_features',
    description = 'Historical statistics per city',
    entity_key  = 'city',
    features    = ['city_avg_delivery','city_avg_traffic','city_late_rate'],
)
city_features = df_with_target.groupby('city').agg(
    city_avg_delivery = ('delivery_time', 'mean'),
    city_avg_traffic  = ('traffic_score', 'mean'),
    city_late_rate    = ('delivery_time', lambda x: (x > 45).mean()),
).reset_index()
store.write_features('city_features', city_features)

# ── Get training dataset from store ───────────────────────────────────
print("\nBuilding training dataset from feature store...")
X_from_store = store.get_training_dataset(
    base_df = X_test[['order_id','restaurant','city','distance_km',
                       'traffic_score','restaurant_prep','order_value']],
    feature_groups = ['restaurant_features','city_features'],
)
print(f"Final training dataset: {X_from_store.shape}")
print(f"Columns: {X_from_store.columns.tolist()}")`} />
      </div>

      <Div />

      {/* ══ SECTION 12 — ERRORS ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common feature engineering error — explained and fixed</h2>

        <ErrorBlock
          error="Model performance is great in CV but collapses in production"
          cause="Almost certainly feature leakage. The most common cause: target encoding, scaling, or imputation computed on the full dataset before train/test split. The model learns from statistics that include test set information, making evaluation metrics unrealistically optimistic."
          fix="Audit every preprocessing step. Check: was this transformer fit on the full dataset or only on X_train? The rule: fit() only on X_train, transform() on everything. Put all preprocessing inside a sklearn Pipeline — it enforces this automatically and makes leakage structurally impossible."
        />

        <ErrorBlock
          error="ValueError: Input contains NaN after feature engineering"
          cause="A feature engineering step introduced NaN values — usually from division by zero, log of zero, or a groupby merge where some rows had no match. Aggregate features (merge on groupby) introduce NaN for categories not seen in training."
          fix="After every feature engineering step, run df.isnull().sum() to check for new NaNs. For division: use .clip(lower=0.0001) on the denominator. For log: use np.log1p(x) instead of np.log(x). For merges: use fillna() with the global mean from the training set immediately after the merge."
        />

        <ErrorBlock
          error="Target encoding produces better training score but worse test score than one-hot"
          cause="Naive target encoding — computing mean target per category on the full training set and using it as a feature — leaks information. Each training row's own target is included in its encoded value, creating a circular feature that the model overuses."
          fix="Use cross-fold target encoding (shown in this module). For each training row, compute the category mean using only the other folds — never including the row's own target. Apply smoothing to handle rare categories. The sklearn-contrib category_encoders library has a TargetEncoder with built-in cross-fold encoding."
        />

        <ErrorBlock
          error="PolynomialFeatures produces too many features — memory error or very slow training"
          cause="Degree-2 polynomial features on n input features produces O(n²) output features. With 50 features and degree=2, you get 1,325 features. With 200 features: 20,301 features. This causes memory errors and training time that scales quadratically."
          fix="Apply polynomial features only to the most important 3–5 features (use feature importance to select them first). Or use interaction_only=True to skip squared terms (x² y²) and only create cross-terms (x·y). Or switch to a kernel SVM or tree model which implicitly handles interactions."
        />

        <ErrorBlock
          error="Category not in training data — unknown label error at inference"
          cause="A categorical column in production contains a new value never seen during training. One-hot encoding raises an error or creates the wrong number of columns. Target encoding returns NaN because the category has no stored mean."
          fix="For OneHotEncoder: use handle_unknown='ignore' — unknown categories become all-zeros. For target encoding: store the global mean as a fallback, use it for unknown categories: df[col].map(encoding_map).fillna(global_mean). Always monitor for new category values in production — they often signal a real data change upstream."
        />
      </div>

      <Div />

      {/* ══ SECTION 13 — WHAT'S NEXT ═══════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          The data engineering section is complete. The data is ready. Now we build models.
        </h2>

        <p style={S.p}>
          Four modules. Collect data from APIs, SQL, files, and streams.
          Clean it — remove duplicates, fix types, handle outliers, validate schemas.
          Engineer features — log transforms, interactions, aggregates, target encoding.
          The result: a clean, feature-rich DataFrame ready for any ML algorithm.
        </p>

        <p style={S.p}>
          Module 18 begins the Classical Machine Learning section with
          linear regression — the oldest, most interpretable, and still one of
          the most useful algorithms in production ML.
          Understanding linear regression deeply — not just calling{' '}
          <span style={S.code as React.CSSProperties}>LinearRegression().fit()</span> —
          reveals the mathematical foundations that every subsequent algorithm
          (logistic regression, SVMs, neural networks) builds on.
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
              Next — Module 18 · Classical ML
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Linear Regression — From Scratch to Production
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Ordinary least squares, gradient descent, regularisation (Ridge, Lasso, ElasticNet),
              and how to diagnose and fix every failure mode — all on the DoorDash dataset.
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
          'Feature engineering consistently outperforms model tuning. The same Ridge regression on well-engineered features beats a Random Forest on raw features in many real problems. Invest in features before investing in model complexity.',
          'Log-transform right-skewed positive columns (distances, prices, counts) before feeding to linear models. np.log1p(x) handles x=0 safely. Verify the transformation reduced skewness before assuming it helped.',
          'Interaction features (distance × traffic, prep × traffic) capture joint effects that linear models cannot discover on their own. Always try the physically meaningful interactions first before exhaustive polynomial expansion.',
          'Target encoding is powerful but dangerous. Never compute it on the full dataset. Always use cross-fold encoding: for each training row, compute the category mean using all other folds. Smooth rare categories toward the global mean.',
          'Aggregate features (per-restaurant average delivery time, per-city late rate) make each row context-aware and are among the most consistently powerful features. Always compute them on training data only and apply via merge.',
          'Leakage is the most dangerous mistake in ML. It makes evaluation metrics look great while the production model is broken. The rule: fit() only on X_train, transform() on everything. Use sklearn Pipeline to make leakage structurally impossible.',
          'Feature stores prevent duplicate computation and inconsistency. Define features once, compute them centrally, serve them to any model. Even a simple Parquet-based store prevents the "which version of this feature was used?" debugging nightmare.',
        ]}
      />
    </LearnLayout>
  )
}