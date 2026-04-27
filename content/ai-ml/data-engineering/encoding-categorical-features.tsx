import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Encoding Categorical Features — Chaduvuko',
  description:
    'One-hot encoding, ordinal encoding, target encoding — what each one does to your data, which algorithms need which, and when each is the right choice.',
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

export default function EncodingCategoricalFeaturesPage() {
  return (
    <LearnLayout
      title="Encoding Categorical Features"
      description="One-hot encoding, ordinal encoding, target encoding — what each one does to your data, which algorithms need which, and when each is the right choice."
      section="Data Engineering for ML"
      readTime="40–50 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section='data-engineering' topic='encoding-categorical-features' />

      {/* ══ SECTION 1 — HOOK ═══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The problem every ML dataset has</span>
        <h2 style={S.h2}>
          ML models only understand numbers. Most real data is not numbers.
        </h2>

        <p style={S.p}>
          The DoorDash orders dataset has a <span style={S.code as React.CSSProperties}>restaurant</span> column
          containing "Pizza Hut", "Biryani Blues", "McDonald's".
          The <span style={S.code as React.CSSProperties}>city</span> column has
          "Seattle", "New York", "Delhi". The{' '}
          <span style={S.code as React.CSSProperties}>time_slot</span> column has
          "breakfast", "lunch", "evening", "dinner".
          Not a single number in sight — and every ML algorithm from linear
          regression to XGBoost to neural networks requires a matrix of numbers.
        </p>

        <p style={S.p}>
          Encoding is the process of converting categorical columns into numeric
          representations. But the encoding strategy you choose changes what the
          model can learn. A naive approach — replace "Pizza Hut" with 1,
          "Biryani Blues" with 2, "McDonald's" with 3 — implies an ordering:
          McDonald's is three times bigger than Pizza Hut. The model will believe this.
          Choosing the wrong encoding produces a model that silently learns the
          wrong relationships.
        </p>

        <p style={S.p}>
          This module teaches every encoding strategy used in production ML,
          what each one tells the model, and the exact situations where each
          is the right choice.
        </p>

        <HBox color="#1D9E75">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              What this module covers:
            </span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[
              'Why naive integer encoding breaks models',
              'Ordinal encoding — for features with a natural order',
              'One-hot encoding — the safe default for nominal categories',
              'The dummy variable trap and how drop="first" fixes it',
              'Frequency encoding — fast, leakage-free, surprisingly good',
              'Target encoding — powerful but requires careful implementation',
              'Cross-fold target encoding — the only safe way',
              'Binary encoding — compact for high-cardinality columns',
              'Handling unknown categories at inference time',
              'Choosing between encoders using a decision framework',
              'Encoders inside a sklearn Pipeline',
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
          Target encoding is the one technique in this module where leakage
          is a real risk. Every other encoder is computed from the input features
          alone — no target required. For target encoding, always use cross-fold
          encoding or sklearn's built-in{' '}
          <span style={S.code as React.CSSProperties}>TargetEncoder</span> which
          handles this automatically.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — SETUP ══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Setup</span>
        <h2 style={S.h2}>The dataset used throughout this module</h2>

        <CodeBlock code={`import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

np.random.seed(42)
n = 8_000

restaurants = ['Pizza Hut', 'Biryani Blues', "McDonald's", "Haldiram's",
               'Dominos', 'KFC', 'Subway', 'Burger King']
cities      = ['Seattle', 'New York', 'Delhi', 'Austin', 'Boston', 'Chicago']
time_slots  = ['breakfast', 'lunch', 'evening', 'dinner']
ratings_cat = ['poor', 'average', 'good', 'excellent']   # ordinal

distance   = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15).round(2)
traffic    = np.random.randint(1, 11, n).astype(float)
prep       = np.abs(np.random.normal(15, 5, n)).clip(5, 35).round(1)
value      = np.abs(np.random.normal(350, 150, n)).clip(50, 1200).round(0)
delivery   = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
              + np.random.normal(0, 4, n)).clip(10, 120).round(1)

# Ordinal rating: bucketised from delivery time (worse delivery = worse rating)
rating_num = pd.cut(delivery, bins=[0, 25, 40, 55, 200],
                    labels=[3, 2, 1, 0]).astype(int)   # 3=excellent, 0=poor
rating_cat = pd.Categorical.from_codes(
    rating_num, categories=['poor', 'average', 'good', 'excellent']
)

df = pd.DataFrame({
    'restaurant':   np.random.choice(restaurants, n),
    'city':         np.random.choice(cities, n),
    'time_slot':    np.random.choice(time_slots, n),
    'rating_cat':   rating_cat,          # ordinal: poor < average < good < excellent
    'distance_km':  distance,
    'traffic_score': traffic,
    'restaurant_prep': prep,
    'order_value':  value,
    'delivery_time': delivery,
    'is_late':      (delivery > 45).astype(int),
})

X = df.drop(columns=['delivery_time', 'is_late'])
y = df['delivery_time']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"Train: {len(X_train):,}  Test: {len(X_test):,}")
print(f"\nCategorical columns:")
for col in ['restaurant', 'city', 'time_slot', 'rating_cat']:
    print(f"  {col:<20}: {X_train[col].nunique()} unique values → {sorted(X_train[col].unique())[:5]}")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — WHY NAIVE ENCODING BREAKS ══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The wrong way first</span>
        <h2 style={S.h2}>Why naive integer encoding teaches the model lies</h2>

        <p style={S.p}>
          The first instinct when seeing string columns is to replace each
          unique value with an integer. Pizza Hut → 0, Biryani Blues → 1,
          McDonald's → 2. This is called label encoding or integer encoding.
          For ordinal features (where the order genuinely matters) it is correct.
          For nominal features (where order is meaningless) it is wrong —
          and the model will quietly learn the wrong thing.
        </p>

        <VisualBox label="What naive encoding tells the model vs what is actually true">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.3)',
              borderRadius: 8, padding: '13px 15px',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#ff4757', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                Naive encoding — what the model believes
              </div>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
                fontFamily: 'var(--font-mono)', fontSize: 12,
              }}>
                {[
                  ['Pizza Hut', '0'],
                  ['Biryani Blues', '1'],
                  ["McDonald's", '2'],
                  ['Haldiram\'s', '3'],
                  ['Dominos', '4'],
                  ['KFC', '5'],
                  ['Subway', '6'],
                  ['Burger King', '7'],
                ].map(([name, val]) => (
                  <div key={name} style={{
                    background: 'rgba(255,71,87,0.06)', borderRadius: 5,
                    padding: '6px 8px',
                  }}>
                    <div style={{ color: 'var(--muted)', fontSize: 10 }}>{name}</div>
                    <div style={{ color: '#ff4757', fontSize: 14, fontWeight: 700 }}>{val}</div>
                  </div>
                ))}
              </div>
              <p style={{ ...S.ps, marginBottom: 0, marginTop: 10, color: '#ff4757' }}>
                Model infers: Burger King (7) = Pizza Hut (0) × 7. Biryani Blues is halfway between them.
                KFC and Subway are adjacent and therefore similar. None of this is true.
              </p>
            </div>

            <div style={{
              background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.3)',
              borderRadius: 8, padding: '13px 15px',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#00e676', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                What is actually true
              </div>
              <p style={{ ...S.ps, marginBottom: 0 }}>
                These 8 restaurants are 8 equally unrelated categories.
                There is no ordering. There is no proximity. The only correct encoding
                treats each one independently — which is what one-hot encoding does.
              </p>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.linear_model import Ridge
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
from sklearn.metrics import mean_absolute_error

# Demonstrate the damage naive encoding does to a linear model
num_cols = ['distance_km', 'traffic_score', 'restaurant_prep', 'order_value']

# ── Approach 1: naive integer encoding for restaurant ─────────────────
le = LabelEncoder()
X_train_naive = X_train[num_cols].copy()
X_test_naive  = X_test[num_cols].copy()
X_train_naive['restaurant_int'] = le.fit_transform(X_train['restaurant'])
X_test_naive['restaurant_int']  = le.transform(X_test['restaurant'])

sc1 = StandardScaler()
model_naive = Ridge(alpha=1.0)
model_naive.fit(sc1.fit_transform(X_train_naive), y_train)
mae_naive = mean_absolute_error(y_test, model_naive.predict(sc1.transform(X_test_naive)))

# ── Approach 2: one-hot encoding for restaurant ────────────────────────
ohe = OneHotEncoder(sparse_output=False, handle_unknown='ignore', drop='first')
rest_ohe_train = ohe.fit_transform(X_train[['restaurant']])
rest_ohe_test  = ohe.transform(X_test[['restaurant']])

X_train_ohe = np.hstack([X_train[num_cols].values, rest_ohe_train])
X_test_ohe  = np.hstack([X_test[num_cols].values, rest_ohe_test])

sc2 = StandardScaler()
model_ohe = Ridge(alpha=1.0)
model_ohe.fit(sc2.fit_transform(X_train_ohe), y_train)
mae_ohe = mean_absolute_error(y_test, model_ohe.predict(sc2.transform(X_test_ohe)))

print(f"MAE with naive int encoding: {mae_naive:.4f} min")
print(f"MAE with one-hot encoding:   {mae_ohe:.4f} min")
print(f"Improvement from OHE:        {(mae_naive - mae_ohe):.4f} min")
# One-hot is always better for nominal categoricals in linear models`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — ORDINAL ENCODING ═══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>When order genuinely exists</span>
        <h2 style={S.h2}>Ordinal encoding — for features with a real natural order</h2>

        <p style={S.p}>
          Ordinal encoding IS the right choice when categories have a meaningful
          order and the steps between levels are roughly equal.
          "poor &lt; average &lt; good &lt; excellent" is a real ordering.
          "cold &lt; warm &lt; hot" is a real ordering.
          "bronze &lt; silver &lt; gold" is a real ordering.
          These should be encoded as 0, 1, 2, 3 — the integers preserve
          the relationship the model should learn.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.preprocessing import OrdinalEncoder

# ── OrdinalEncoder — specify the order explicitly ──────────────────────
# ALWAYS provide categories= explicitly so the order is guaranteed
# Never rely on alphabetical order — 'good' comes before 'poor' alphabetically

ord_enc = OrdinalEncoder(
    categories=[['poor', 'average', 'good', 'excellent']],
    handle_unknown='use_encoded_value',
    unknown_value=-1,    # unseen categories at test time → -1
)

rating_train = ord_enc.fit_transform(X_train[['rating_cat']])
rating_test  = ord_enc.transform(X_test[['rating_cat']])

print("Ordinal encoding — rating_cat:")
for cat, code in zip(ord_enc.categories_[0], range(4)):
    print(f"  {cat:<12} → {code}")

# Verify: poor=0, average=1, good=2, excellent=3
sample = pd.DataFrame({'rating_cat': ['poor', 'good', 'excellent', 'average']})
print(f"\nSample encoding: {ord_enc.transform(sample).flatten()}")
# [0. 2. 3. 1.] — correct order ✓

# ── When ordinal encoding is wrong ────────────────────────────────────
# time_slot: 'breakfast', 'lunch', 'evening', 'dinner'
# These have a time-of-day order but the ML relationship to delivery
# time is NOT linear — dinner might be worse than evening.
# For time_slot: use one-hot OR cyclical encoding (from Module 17).
# Only use ordinal for features where the ordering is the SIGNAL.

# ── Ordinal encoding for tree models ─────────────────────────────────
# Tree models can use ordinal encoding even for nominal features
# because trees find the optimal threshold themselves.
# XGBoost and LightGBM work well with label-encoded categoricals.
# This is one case where integer encoding is acceptable.

from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

num_cat_cols = ['distance_km', 'traffic_score', 'restaurant_prep', 'order_value']

# For Random Forest: just label-encode everything, trees handle it fine
from sklearn.preprocessing import LabelEncoder
X_tr_rf = X_train[num_cat_cols].copy()
X_te_rf = X_test[num_cat_cols].copy()
for col in ['restaurant', 'city', 'time_slot', 'rating_cat']:
    le = LabelEncoder()
    X_tr_rf[col] = le.fit_transform(X_train[col])
    X_te_rf[col] = le.transform(X_test[col])

rf = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
rf.fit(X_tr_rf, y_train)
mae_rf = mean_absolute_error(y_test, rf.predict(X_te_rf))
print(f"\nRandom Forest with label encoding: MAE = {mae_rf:.4f} min")
print("(Trees are fine with integer-encoded categoricals)")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — ONE-HOT ENCODING ═══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The safe default</span>
        <h2 style={S.h2}>One-hot encoding — the right choice for nominal categories</h2>

        <p style={S.p}>
          One-hot encoding creates one binary column per category.
          For a restaurant column with 8 values, it creates 8 new columns —
          each 1 if the row is that restaurant, 0 otherwise.
          The model sees 8 independent binary features instead of one ambiguous integer.
          No false ordering. No false proximity. Each restaurant gets its own weight.
        </p>

        <VisualBox label="One-hot encoding — each category becomes a binary column">
          <div style={{ overflowX: 'auto' as const }}>
            <div style={{ minWidth: 500 }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '120px repeat(4, 1fr)',
                gap: 0, marginBottom: 2,
              }}>
                <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', padding: '4px 6px' }}>restaurant</div>
                {['Pizza Hut', 'Biryani Blues', "McDonald's", 'Dominos'].map(h => (
                  <div key={h} style={{
                    fontSize: 10, fontWeight: 700, color: '#1D9E75',
                    fontFamily: 'var(--font-mono)', padding: '4px 6px',
                  }}>
                    is_{h.replace("'", '').replace(' ', '_').toLowerCase()}
                  </div>
                ))}
              </div>
              {[
                ['Pizza Hut',    [1, 0, 0, 0]],
                ['Biryani Blues',[0, 1, 0, 0]],
                ["McDonald's",  [0, 0, 1, 0]],
                ['Dominos',     [0, 0, 0, 1]],
                ['Pizza Hut',   [1, 0, 0, 0]],
              ].map(([rest, bits], i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '120px repeat(4, 1fr)',
                  background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
                  borderBottom: '1px solid var(--border)',
                }}>
                  <div style={{ fontSize: 12, color: 'var(--text)', fontFamily: 'var(--font-mono)', padding: '6px 6px' }}>
                    {rest as string}
                  </div>
                  {(bits as number[]).map((bit, j) => (
                    <div key={j} style={{
                      fontSize: 13, fontFamily: 'var(--font-mono)',
                      color: bit === 1 ? '#1D9E75' : 'var(--muted)',
                      fontWeight: bit === 1 ? 700 : 400,
                      padding: '6px 6px',
                    }}>
                      {bit}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>
            Each row has exactly one 1 and all other 0s. The model treats each restaurant completely independently.
          </div>
        </VisualBox>

        <h3 style={S.h3}>The dummy variable trap — and why drop="first" matters</h3>

        <p style={S.p}>
          If you create one binary column per category, the last column is always
          perfectly predictable from the others — if all other restaurant columns
          are 0, the order must be from the remaining restaurant.
          This creates perfect multicollinearity, which causes problems for
          linear models. The fix: drop one column. With 8 restaurants, you only
          need 7 columns. The dropped category becomes the baseline — its effect
          is captured by the intercept.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error

# ── OneHotEncoder — the production way ───────────────────────────────
ohe = OneHotEncoder(
    sparse_output=False,      # return dense array not sparse matrix
    handle_unknown='ignore',  # unknown categories at test → all zeros (not an error)
    drop='first',             # drop one column per feature — avoids dummy trap
    dtype=np.float32,         # float32 saves memory vs float64
)

cat_cols = ['restaurant', 'city', 'time_slot']
ohe.fit(X_train[cat_cols])

train_ohe = ohe.transform(X_train[cat_cols])
test_ohe  = ohe.transform(X_test[cat_cols])

print(f"Columns created: {train_ohe.shape[1]}")
print(f"Feature names:")
for name in ohe.get_feature_names_out(cat_cols):
    print(f"  {name}")

# ── What handle_unknown='ignore' does at inference ─────────────────────
# Restaurant not seen during training → all zeros for that restaurant's columns
# The model falls back to "none of the known restaurants" behaviour (baseline)
new_order = pd.DataFrame({'restaurant': ['New Brand Burger'],
                          'city':       ['Seattle'],
                          'time_slot':  ['lunch']})
encoded_new = ohe.transform(new_order)
print(f"\nUnknown restaurant encoded as: {encoded_new[0, :8]}")  # all zeros

# ── pd.get_dummies — quick exploration, not for production ────────────
# Use for notebooks / exploration because it is one line
# Do NOT use in pipelines — test set may have different columns
dummies = pd.get_dummies(X_train['restaurant'], prefix='rest', drop_first=True)
print(f"\npd.get_dummies output columns ({len(dummies.columns)}):")
print(dummies.columns.tolist())

# ── Full pipeline with OHE ─────────────────────────────────────────────
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer

NUM_COLS = ['distance_km', 'traffic_score', 'restaurant_prep', 'order_value']
CAT_COLS = ['restaurant', 'city', 'time_slot']

preprocessor = ColumnTransformer([
    ('num', Pipeline([
        ('imp',   SimpleImputer(strategy='median')),
        ('scale', StandardScaler()),
    ]), NUM_COLS),
    ('cat', OneHotEncoder(
        sparse_output=False, handle_unknown='ignore', drop='first'
    ), CAT_COLS),
])

pipe = Pipeline([
    ('prep',  preprocessor),
    ('model', Ridge(alpha=1.0)),
])
pipe.fit(X_train, y_train)
mae = mean_absolute_error(y_test, pipe.predict(X_test))
print(f"\nPipeline with OHE — MAE: {mae:.4f} min")`} />

        <h3 style={S.h3}>When one-hot encoding becomes a problem</h3>

        <p style={S.p}>
          One-hot encoding with a low-cardinality column (8 restaurants, 6 cities)
          is fine. But a column with 500 unique values creates 500 new columns —
          most of which are 0 for any given row. The feature matrix becomes
          sparse and large, model training slows significantly, and rare categories
          get very few training examples. For high-cardinality columns
          (&gt;20–50 unique values) use frequency encoding or target encoding instead.
        </p>
      </div>

      <Div />

      {/* ══ SECTION 6 — FREQUENCY ENCODING ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Fast and leakage-free</span>
        <h2 style={S.h2}>Frequency encoding — replace category with its prevalence</h2>

        <p style={S.p}>
          Frequency encoding replaces each category value with how often
          it appears in the training set as a proportion.
          "Pizza Hut" appears in 13% of training orders → encoded as 0.13.
          "Biryani Blues" appears in 11% → encoded as 0.11.
          This captures the idea that common categories are different from rare ones
          without requiring hundreds of new columns or using the target label.
          It is completely leakage-free and works well for high-cardinality columns.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin

# ── Manual frequency encoding ─────────────────────────────────────────
def frequency_encode(X_train_col: pd.Series,
                     X_apply_col: pd.Series) -> pd.Series:
    """
    Compute frequency map on training data, apply to any dataset.
    Unknown categories get the minimum training frequency (not 0).
    """
    freq_map  = X_train_col.value_counts(normalize=True)
    min_freq  = freq_map.min()   # fallback for unseen categories
    return X_apply_col.map(freq_map).fillna(min_freq)

X_train_freq = X_train.copy()
X_test_freq  = X_test.copy()

for col in ['restaurant', 'city', 'time_slot']:
    X_train_freq[f'{col}_freq'] = frequency_encode(X_train[col], X_train[col])
    X_test_freq[f'{col}_freq']  = frequency_encode(X_train[col], X_test[col])

# Inspect what frequencies were assigned
print("Restaurant frequency encoding (training set):")
freq_table = (
    X_train[['restaurant']]
    .assign(freq=X_train_freq['restaurant_freq'])
    .drop_duplicates()
    .sort_values('freq', ascending=False)
)
for _, row in freq_table.iterrows():
    bar = '█' * int(row['freq'] * 200)
    print(f"  {row['restaurant']:<20}: {bar} {row['freq']:.4f}")

# ── sklearn-compatible FrequencyEncoder ───────────────────────────────
class FrequencyEncoder(BaseEstimator, TransformerMixin):
    """
    Frequency encoder compatible with sklearn Pipeline.
    Fits frequency maps on training data, applies to any dataset.
    """
    def __init__(self, min_frequency: float = 1e-4):
        self.min_frequency = min_frequency
        self.freq_maps_: dict = {}

    def fit(self, X: pd.DataFrame, y=None):
        X = pd.DataFrame(X)
        for col in X.columns:
            self.freq_maps_[col] = X[col].value_counts(normalize=True).to_dict()
        return self

    def transform(self, X: pd.DataFrame) -> np.ndarray:
        X = pd.DataFrame(X)
        result = np.zeros((len(X), len(X.columns)), dtype=np.float32)
        for i, col in enumerate(X.columns):
            freq_map = self.freq_maps_.get(col, {})
            result[:, i] = X[col].map(freq_map).fillna(self.min_frequency).values
        return result

# Use in a pipeline
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.metrics import mean_absolute_error

NUM_COLS = ['distance_km', 'traffic_score', 'restaurant_prep', 'order_value']
CAT_COLS = ['restaurant', 'city', 'time_slot']

preprocessor = ColumnTransformer([
    ('num', Pipeline([
        ('imp',   SimpleImputer(strategy='median')),
        ('scale', StandardScaler()),
    ]), NUM_COLS),
    ('cat_freq', FrequencyEncoder(), CAT_COLS),
])

pipe_freq = Pipeline([
    ('prep',  preprocessor),
    ('model', Ridge(alpha=1.0)),
])
pipe_freq.fit(X_train, y_train)
mae_freq = mean_absolute_error(y_test, pipe_freq.predict(X_test))
print(f"\nPipeline with frequency encoding — MAE: {mae_freq:.4f} min")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — TARGET ENCODING ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most powerful — and most dangerous</span>
        <h2 style={S.h2}>Target encoding — encode with the label, safely</h2>

        <p style={S.p}>
          Target encoding replaces each category with the mean of the target variable
          for that category. "Pizza Hut" → 34.2 (its mean delivery time in training).
          "Biryani Blues" → 41.7. This is extremely informative — the model gets
          a direct signal of what each restaurant typically produces.
          For high-cardinality columns with strong target relationships,
          target encoding consistently outperforms one-hot encoding.
        </p>

        <p style={S.p}>
          The danger: if you compute the target mean on the full dataset and use it
          as a training feature, each training row's encoded value contains
          information from its own target — the model can partially memorise
          training labels rather than learning generalisable patterns.
          Evaluation metrics look excellent. Production performance collapses.
        </p>

        <HBox color="#D85A30">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              The two safe approaches:
            </span>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'Cross-fold encoding: for each training row, compute category mean using all other folds — never including the row\'s own target.',
              'sklearn TargetEncoder (1.3+): built-in cross-fold encoding with smoothing. Fit on training data, transforms with stored statistics at inference.',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#D85A30', flexShrink: 0, marginTop: 7 }} />
                <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </HBox>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.model_selection import KFold
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import StandardScaler

# ── Cross-fold target encoding — the correct manual implementation ────

def target_encode_cv(
    X_train: pd.DataFrame,
    y_train: pd.Series,
    X_test:  pd.DataFrame,
    col:     str,
    n_folds: int  = 5,
    smoothing: float = 10.0,
) -> tuple:
    """
    Safe target encoding via K-fold cross-validation.

    For each row in training: compute category mean using OTHER folds only.
    For test set: use all training data to compute the encoding.
    Smoothing: blend category mean with global mean for rare categories.
      encoded = (n * cat_mean + m * global_mean) / (n + m)
      where n = count of category in fold, m = smoothing parameter
    """
    global_mean   = y_train.mean()
    encoded_train = pd.Series(np.nan, index=X_train.index)
    kf            = KFold(n_splits=n_folds, shuffle=True, random_state=42)

    for fold_tr_idx, fold_val_idx in kf.split(X_train):
        fold_X = X_train.iloc[fold_tr_idx]
        fold_y = y_train.iloc[fold_tr_idx]

        # Compute smoothed mean per category on this fold's training portion
        stats = pd.DataFrame({
            'count': fold_y.groupby(fold_X[col].values).count(),
            'mean':  fold_y.groupby(fold_X[col].values).mean(),
        })
        stats['smoothed'] = (
            (stats['count'] * stats['mean'] + smoothing * global_mean)
            / (stats['count'] + smoothing)
        )
        # Apply to the validation rows of this fold
        val_cats = X_train.iloc[fold_val_idx][col]
        encoded_train.iloc[fold_val_idx] = val_cats.map(stats['smoothed']).fillna(global_mean)

    # Test encoding: use all training data
    all_stats = pd.DataFrame({
        'count': y_train.groupby(X_train[col].values).count(),
        'mean':  y_train.groupby(X_train[col].values).mean(),
    })
    all_stats['smoothed'] = (
        (all_stats['count'] * all_stats['mean'] + smoothing * global_mean)
        / (all_stats['count'] + smoothing)
    )
    encoded_test = X_test[col].map(all_stats['smoothed']).fillna(global_mean)

    return encoded_train, encoded_test

# Encode restaurant and city
rest_tr, rest_te = target_encode_cv(X_train, y_train, X_test, 'restaurant')
city_tr, city_te = target_encode_cv(X_train, y_train, X_test, 'city')

X_train_te = X_train[['distance_km','traffic_score','restaurant_prep','order_value']].copy()
X_test_te  = X_test[['distance_km','traffic_score','restaurant_prep','order_value']].copy()
X_train_te['restaurant_te'] = rest_tr.values
X_test_te['restaurant_te']  = rest_te.values
X_train_te['city_te']       = city_tr.values
X_test_te['city_te']        = city_te.values

sc = StandardScaler()
model_te = Ridge(alpha=1.0)
model_te.fit(sc.fit_transform(X_train_te), y_train)
mae_te = mean_absolute_error(y_test, model_te.predict(sc.transform(X_test_te)))
print(f"Target encoding (cross-fold) — MAE: {mae_te:.4f} min")

# What the encoding learned
print("\nTarget-encoded restaurant values (≈ mean delivery time per restaurant):")
enc_vals = dict(zip(X_train['restaurant'], rest_tr.values))
# Deduplicate — take first occurrence per restaurant
seen = {}
for rest, val in enc_vals.items():
    if rest not in seen:
        seen[rest] = val
for rest, val in sorted(seen.items(), key=lambda x: x[1]):
    print(f"  {rest:<20}: {val:.1f} min")

# ── sklearn TargetEncoder — available since sklearn 1.3 ───────────────
try:
    from sklearn.preprocessing import TargetEncoder
    te = TargetEncoder(cv=5, smooth='auto', random_state=42)
    # TargetEncoder handles cross-fold internally — safe to use directly
    X_tr_sk_te = te.fit_transform(X_train[['restaurant','city']], y_train)
    X_te_sk_te = te.transform(X_test[['restaurant','city']])
    print(f"\nsklearn TargetEncoder output shape: {X_tr_sk_te.shape}")
except ImportError:
    print("\nsklearn TargetEncoder requires sklearn >= 1.3")`} />

        <h3 style={S.h3}>Smoothing — handling rare categories</h3>

        <p style={S.p}>
          Without smoothing, a restaurant with only 3 training orders gets
          encoded as the mean of those 3 orders — an extremely noisy estimate
          that will overfit. Smoothing blends the category mean with the global mean,
          weighted by how many samples the category has.
          A category with 500 samples gets almost entirely its own mean.
          A category with 3 samples gets almost entirely the global mean.
        </p>

        <CodeBlock code={`import numpy as np

# Demonstrating the effect of smoothing
global_mean = 36.5   # overall mean delivery time

# Restaurant A: 500 orders, mean delivery 42 min
# Restaurant B: 3 orders, mean delivery 55 min (noisy estimate)

def smoothed_mean(cat_mean, cat_count, global_mean, m=10):
    return (cat_count * cat_mean + m * global_mean) / (cat_count + m)

for name, count, cat_mean in [
    ('Restaurant A (500 orders)', 500, 42.0),
    ('Restaurant B (3 orders)',     3, 55.0),
    ('Restaurant C (1 order)',       1, 70.0),
]:
    for m in [1, 5, 10, 50]:
        enc = smoothed_mean(cat_mean, count, global_mean, m)
        print(f"  {name:<30} m={m:<4}: {enc:.2f}")
    print()

# Restaurant A: 500 samples → smoothing barely affects it, stays near 42
# Restaurant B: 3 samples   → smoothing pulls it toward global mean 36.5
# Restaurant C: 1 sample    → smoothing almost entirely uses global mean
# This prevents the model from memorising rare-category noise`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — BINARY ENCODING ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Compact high-cardinality encoding</span>
        <h2 style={S.h2}>Binary encoding — compact representation for many categories</h2>

        <p style={S.p}>
          Binary encoding is a middle ground between one-hot and target encoding.
          It assigns each category an integer (like ordinal encoding) then
          converts that integer to binary and spreads the bits across columns.
          100 categories → only 7 columns (because 2⁷ = 128 &gt; 100) instead of 100.
          It preserves more information than a single integer while being far
          more compact than one-hot encoding.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd

# ── Manual binary encoding ────────────────────────────────────────────
def binary_encode(X_train_col: pd.Series,
                  X_apply_col: pd.Series) -> pd.DataFrame:
    """
    Binary encode a categorical column.
    Assigns integers in order of frequency (most common = 1).
    Converts integers to binary bit columns.
    """
    # Map categories to integers (fit on training)
    freq_order = X_train_col.value_counts().index.tolist()
    cat_to_int = {cat: i + 1 for i, cat in enumerate(freq_order)}
    n_bits     = max(1, int(np.ceil(np.log2(len(cat_to_int) + 1))))

    # Apply mapping (unknown categories → 0)
    int_encoded = X_apply_col.map(cat_to_int).fillna(0).astype(int)

    # Convert integers to binary columns
    bit_cols = {}
    for bit in range(n_bits):
        bit_cols[f'{X_train_col.name}_bit{bit}'] = (int_encoded >> bit) & 1

    return pd.DataFrame(bit_cols, index=X_apply_col.index)

# Encode restaurant (8 values → 4 binary columns instead of 7 OHE columns)
rest_bin_train = binary_encode(X_train['restaurant'], X_train['restaurant'])
rest_bin_test  = binary_encode(X_train['restaurant'], X_test['restaurant'])

print(f"Restaurant binary encoding:")
print(f"  OHE would create:    7 columns (drop=first, 8 categories)")
print(f"  Binary creates:      {rest_bin_train.shape[1]} columns")
print(f"  For 100 categories:  OHE=99 cols, Binary=7 cols")
print()

# Show the encoding
sample_rest = pd.DataFrame({'restaurant': X_train['restaurant'].unique()[:5]})
encoded = binary_encode(X_train['restaurant'], sample_rest['restaurant'])
print("Sample binary encoding:")
print(pd.concat([sample_rest, encoded], axis=1).to_string(index=False))

# ── category_encoders library — full encoding toolkit ─────────────────
# pip install category_encoders
# Has: BinaryEncoder, TargetEncoder, HashingEncoder, WOEEncoder, etc.
try:
    import category_encoders as ce
    be = ce.BinaryEncoder(cols=['restaurant'], drop_invariant=True)
    X_tr_be = be.fit_transform(X_train[['restaurant', 'city']], y_train)
    X_te_be = be.transform(X_test[['restaurant', 'city']])
    print(f"\ncategory_encoders BinaryEncoder output shape: {X_tr_be.shape}")
except ImportError:
    print("\ncategory_encoders not installed: pip install category_encoders")`} />
      </div>

      <Div />

      {/* ══ SECTION 9 — DECISION FRAMEWORK ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Which to use when</span>
        <h2 style={S.h2}>Encoding decision framework</h2>

        <VisualBox label="Choose your encoding strategy">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                q: 'Does the category have a meaningful natural order?',
                yes: 'OrdinalEncoder — specify order explicitly with categories=',
                no: 'Continue to next question',
                color: '#378ADD',
                example: 'poor < average < good < excellent → OrdinalEncoder',
              },
              {
                q: 'Is cardinality low (< 15 unique values) and algorithm is linear?',
                yes: 'OneHotEncoder(drop="first") — safe, no false ordering',
                no: 'Continue to next question',
                color: '#1D9E75',
                example: 'city (6 values), time_slot (4 values) → OHE',
              },
              {
                q: 'Is cardinality medium (15–50) and algorithm is tree-based?',
                yes: 'LabelEncoder / OrdinalEncoder — trees find optimal splits regardless of ordering',
                no: 'Continue to next question',
                color: '#BA7517',
                example: 'Any column with 15–50 categories used with XGBoost/RF → LabelEncoder',
              },
              {
                q: 'Is cardinality high (> 50) and the column strongly predicts the target?',
                yes: 'TargetEncoder with cross-fold — most informative, avoid leakage',
                no: 'Continue to next question',
                color: '#D85A30',
                example: 'zip_code (500 values), product_id → TargetEncoder',
              },
              {
                q: 'Is cardinality high and you want leakage-free encoding without the target?',
                yes: 'FrequencyEncoder — fast, safe, works well as a baseline',
                no: 'BinaryEncoder — compact, no false ordering, handles unknown categories',
                color: '#7F77DD',
                example: 'user_id, ip_address, device_id → FrequencyEncoder',
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}30`,
                borderRadius: 8, padding: '12px 15px',
              }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    background: `${item.color}20`, border: `1.5px solid ${item.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)',
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{item.q}</span>
                </div>
                <div style={{ paddingLeft: 30, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ fontSize: 12, color: item.color, fontFamily: 'var(--font-mono)' }}>→ Yes: {item.yes}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>→ No: {item.no}</div>
                  <div style={{
                    fontSize: 11, color: 'var(--muted)', fontStyle: 'italic',
                    padding: '3px 8px', background: 'var(--bg2)', borderRadius: 4, marginTop: 3,
                  }}>
                    e.g. {item.example}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`# Encoding benchmark: compare all strategies on the same dataset
import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder, OrdinalEncoder
from sklearn.impute import SimpleImputer
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error

NUM_COLS = ['distance_km', 'traffic_score', 'restaurant_prep', 'order_value']

def make_pipeline(cat_transformer, cat_cols):
    return Pipeline([
        ('prep', ColumnTransformer([
            ('num', Pipeline([
                ('imp',   SimpleImputer(strategy='median')),
                ('scale', StandardScaler()),
            ]), NUM_COLS),
            ('cat', cat_transformer, cat_cols),
        ])),
        ('model', Ridge(alpha=1.0)),
    ])

CAT_COLS = ['restaurant', 'city', 'time_slot']

strategies = {
    'OHE (drop=first)': make_pipeline(
        OneHotEncoder(sparse_output=False, handle_unknown='ignore', drop='first'),
        CAT_COLS,
    ),
    'OHE (no drop)': make_pipeline(
        OneHotEncoder(sparse_output=False, handle_unknown='ignore'),
        CAT_COLS,
    ),
    'Ordinal (alphabetical)': make_pipeline(
        OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1),
        CAT_COLS,
    ),
    'Frequency': make_pipeline(FrequencyEncoder(), CAT_COLS),
}

print("Encoding strategy comparison (Ridge regression):")
print(f"{'Strategy':<30} {'Test MAE (min)'}")
print("─" * 48)
for name, pipe in strategies.items():
    pipe.fit(X_train, y_train)
    mae = mean_absolute_error(y_test, pipe.predict(X_test))
    print(f"  {name:<28}: {mae:.4f}")

# Add target encoding result (computed earlier)
print(f"  {'Target (cross-fold)':<28}: {mae_te:.4f}")
print()
print("Note: for tree models, ordinal and OHE perform similarly.")`} />
      </div>

      <Div />

      {/* ══ SECTION 10 — UNKNOWN CATEGORIES ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Production robustness</span>
        <h2 style={S.h2}>Handling unknown categories at inference time</h2>

        <p style={S.p}>
          In production, the model will always eventually encounter a category
          value it has never seen — a new restaurant partner, a new city expansion,
          a new product category. Each encoder handles this differently,
          and not handling it correctly causes crashes or silent wrong predictions.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder

# Simulate: training had 8 restaurants, production has a 9th
training_restaurants = ['Pizza Hut', 'Biryani Blues', "McDonald's",
                         "Haldiram's", 'Dominos', 'KFC', 'Subway', 'Burger King']
new_restaurant = ['Cloud Kitchen XYZ']   # never seen in training

# ── OneHotEncoder(handle_unknown='ignore') ────────────────────────────
# Unknown → all zeros for that feature's columns (safe, model uses baseline)
ohe_safe = OneHotEncoder(handle_unknown='ignore', sparse_output=False, drop='first')
ohe_safe.fit(pd.DataFrame({'restaurant': training_restaurants}))

new_row = pd.DataFrame({'restaurant': new_restaurant})
encoded = ohe_safe.transform(new_row)
print("OHE with handle_unknown='ignore':")
print(f"  Unknown restaurant → {encoded[0]}  (all zeros)")
print(f"  Model predicts as if no restaurant was specified (baseline intercept)")

# ── OrdinalEncoder with unknown_value ─────────────────────────────────
ord_safe = OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1)
ord_safe.fit(pd.DataFrame({'restaurant': training_restaurants}))
encoded_ord = ord_safe.transform(new_row)
print(f"\nOrdinalEncoder with unknown_value=-1:")
print(f"  Unknown restaurant → {encoded_ord[0]}")
print(f"  -1 signals 'unknown' — tree models can learn to handle this")

# ── Target encoding: fallback to global mean ──────────────────────────
# In our cross-fold implementation: fillna(global_mean) handles unknowns
global_mean = float(y_train.mean())
print(f"\nTarget encoding with global mean fallback:")
print(f"  Unknown restaurant → {global_mean:.2f} (overall mean delivery time)")
print(f"  Model predicts average delivery — conservative, reasonable")

# ── Best practice: add an 'other' category during training ────────────
# If you know rare categories exist, create a catch-all bucket during training
def collapse_rare_categories(series: pd.Series,
                              min_count: int = 50,
                              other_label: str = 'OTHER') -> pd.Series:
    """
    Replace categories with fewer than min_count occurrences with OTHER.
    Ensures OHE always has an 'other' bucket for rare/unseen values.
    """
    counts   = series.value_counts()
    rare     = counts[counts < min_count].index
    return series.replace(rare, other_label)

X_train_coll = X_train.copy()
X_test_coll  = X_test.copy()
X_train_coll['restaurant'] = collapse_rare_categories(X_train['restaurant'], min_count=300)
X_test_coll['restaurant']  = X_test['restaurant'].apply(
    lambda x: x if x in X_train_coll['restaurant'].unique() else 'OTHER'
)

n_other_train = (X_train_coll['restaurant'] == 'OTHER').sum()
print(f"\nAfter collapse_rare_categories (min_count=300):")
print(f"  Rows collapsed to OTHER: {n_other_train:,}")
print(f"  Unique values remaining: {X_train_coll['restaurant'].nunique()}")`} />
      </div>

      <Div />

      {/* ══ SECTION 11 — ERRORS ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common encoding error — explained and fixed</h2>

        <ErrorBlock
          error="ValueError: Found unknown categories during transform"
          cause="OneHotEncoder encountered a category value in the test set that was not present in the training set, and handle_unknown was not set. The default in older sklearn versions raises an error. This always happens in production — new categories are inevitable."
          fix="Always set handle_unknown='ignore' for OneHotEncoder. This maps unknown categories to all-zero columns — the model falls back to the baseline intercept. For OrdinalEncoder: use handle_unknown='use_encoded_value' with unknown_value=-1 so tree models can learn to handle unknowns as a special value."
        />

        <ErrorBlock
          error="Target encoding produces worse CV score than one-hot but better training score"
          cause="Classic leakage signature. You computed the target mean encoding on the full training set before cross-validation folds were split. Each training row's encoding includes its own target value — the model memorises training labels instead of learning patterns."
          fix="Use sklearn's TargetEncoder (sklearn >= 1.3) which handles cross-fold encoding internally. Or implement the cross-fold encoding shown in this module where each row's encoding uses only data from other folds. Never compute target means on the full dataset before CV."
        />

        <ErrorBlock
          error="ColumnTransformer output has wrong number of columns — shape mismatch"
          cause="pd.get_dummies was used in exploration, then the same transformation was applied to the test set which had slightly different categories. The train and test DataFrames now have different numbers of columns. This is the main reason pd.get_dummies should never be used in ML pipelines."
          fix="Replace pd.get_dummies with sklearn OneHotEncoder inside a Pipeline. The fitted encoder remembers exactly which categories it saw during fit() and always produces the same number of output columns regardless of what categories appear in the input at transform time."
        />

        <ErrorBlock
          error="Model coefficient for one-hot restaurant column is 0 for all categories"
          cause="You used drop=None (all categories kept) instead of drop='first'. With all categories included, the columns are perfectly collinear — any one column is a linear combination of the others. Ridge regression distributes weight across all redundant columns, each getting close to zero."
          fix="Use drop='first' to remove one category per feature. This eliminates perfect multicollinearity. The dropped category becomes the baseline — its effect is absorbed into the intercept. For tree models this doesn't matter (use drop=None), but for linear models always use drop='first'."
        />
      </div>

      <Div />

      {/* ══ SECTION 12 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can now handle every type of column a real dataset throws at you.
        </h2>

        <p style={S.p}>
          Numeric columns: clean and scale with StandardScaler or RobustScaler.
          Ordinal columns: OrdinalEncoder with explicit category order.
          Nominal low-cardinality: OneHotEncoder with drop="first".
          Nominal high-cardinality: FrequencyEncoder or TargetEncoder.
          All of it inside a Pipeline that prevents leakage automatically.
        </p>

        <p style={S.p}>
          Module 19 is the capstone of the Data Engineering section —
          Feature Engineering and the sklearn Pipeline. It combines everything
          from Modules 12–15 into a single reusable preprocessing and modelling
          pipeline, adds interaction features and transformations,
          and shows the complete workflow from raw DataFrame to trained model
          ready for cross-validation.
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
              Next — Module 19 · Data Engineering for ML
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Feature Engineering and the Sklearn Pipeline
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Create new features, combine all transformers, and build one
              reusable pipeline that preprocesses and models together.
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
          'Never use naive integer encoding for nominal categories — it implies a false ordering that linear models will learn. "Burger King = 7" does not mean it is 7 times anything compared to "Pizza Hut = 0".',
          'OrdinalEncoder is correct when categories have a real natural order (poor < average < good < excellent). Always specify the order explicitly with the categories= parameter — never rely on alphabetical order.',
          'OneHotEncoder with drop="first" is the safe default for nominal categories in linear models. drop="first" removes one column per feature to avoid perfect multicollinearity. handle_unknown="ignore" prevents crashes on unseen categories at inference.',
          'Target encoding replaces each category with the mean target value for that category — extremely informative but dangerous. Always use cross-fold encoding or sklearn TargetEncoder. Never compute target means on the full dataset before cross-validation.',
          'Frequency encoding replaces each category with its prevalence in training data. Completely leakage-free, works for any cardinality, and is a strong baseline for high-cardinality columns when you want to avoid target leakage.',
          'Tree-based models (Random Forest, XGBoost, LightGBM) do not require one-hot encoding — they can use label-encoded integers because they find optimal splits regardless of ordering. OneHotEncoder is primarily needed for linear models, SVMs, and neural networks.',
          'Always put encoders inside a sklearn Pipeline or ColumnTransformer. This ensures fit() runs only on training data and transform() applies stored statistics to test data — preventing leakage and ensuring consistent column counts between train and test.',
        ]}
      />
    </LearnLayout>
  )
}