import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout  } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Scikit-learn Interface — Chaduvuko',
  description:
    'The API every sklearn algorithm shares. fit, transform, predict, Pipeline, ColumnTransformer — understand the interface once and every algorithm becomes obvious.',
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

function ConceptBox({ title, children, color = '#a0a0b0' }: {
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

function MethodCard({ method, signature, what, when, returns, color = '#a0a0b0' }: {
  method: string; signature: string; what: string; when: string; returns: string; color?: string
}) {
  return (
    <div style={{
      background: 'var(--surface)', border: `1px solid ${color}25`,
      borderRadius: 8, overflow: 'hidden', marginBottom: 10,
    }}>
      <div style={{
        padding: '8px 14px', background: `${color}10`,
        borderBottom: `1px solid ${color}25`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color, fontFamily: 'var(--font-mono)' }}>
          .{method}()
        </span>
        <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
          {signature}
        </span>
      </div>
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', minWidth: 60 }}>WHAT</span>
          <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{what}</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', minWidth: 60 }}>WHEN</span>
          <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{when}</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', minWidth: 60 }}>RETURNS</span>
          <span style={{ fontSize: 12, color, lineHeight: 1.6, fontFamily: 'var(--font-mono)' }}>{returns}</span>
        </div>
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

export default function SklearnInterfacePage() {
  return (
    <LearnLayout
      title="Scikit-learn Interface"
      description="The API every sklearn algorithm shares. fit, transform, predict, Pipeline, ColumnTransformer — understand the interface once and every algorithm becomes obvious."
      section="Programming Ecosystem"
      readTime="35–40 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="programming" topic="sklearn-interface" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — what problem does sklearn solve?</span>
        <h2 style={S.h2}>
          sklearn has 200+ algorithms. They all work the same way.
          Learn the pattern once — use any algorithm forever.
        </h2>

        <p style={S.p}>
          Imagine you joined DoorDash's data team on day one. Your lead says:
          "Try a few different models on this delivery time dataset — linear regression,
          random forest, maybe a gradient boosted tree. See which one performs best."
          In any other ML library, each algorithm has a completely different API.
          Different function names, different parameter conventions, different ways
          to get predictions. You would spend hours reading documentation for each one.
        </p>

        <p style={S.p}>
          sklearn solved this problem with a unified interface.
          Every single algorithm — whether it is a simple linear regression or
          a complex gradient boosting ensemble — follows the exact same pattern:
          create the model, call <span style={S.code as React.CSSProperties}>.fit()</span> to train it,
          call <span style={S.code as React.CSSProperties}>.predict()</span> to use it.
          Switching from one algorithm to another is literally changing one word
          in your code and nothing else.
        </p>

        <p style={S.p}>
          This module teaches you that pattern thoroughly. Once you understand it,
          you can use any of sklearn's 200+ algorithms without reading the docs for each one.
          You will also learn Pipeline and ColumnTransformer — the two tools that
          turn a messy sequence of preprocessing steps into a clean, production-ready,
          leakage-proof workflow.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Think of sklearn like a set of standardised power tools from the same brand.
            A drill, a sander, and a circular saw all look different and do different things.
            But they all have the same battery pack, the same on/off button location,
            and the same safety mechanism. Once you know how to use one tool in the set,
            picking up a new one takes two minutes — not two hours.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            sklearn's "battery pack" is the estimator interface:
            every model is an object, <strong>.fit()</strong> trains it,
            <strong> .predict()</strong> uses it,
            <strong> .transform()</strong> processes data with it.
            Same pattern, every time.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          This module is intentionally practical. You will not just read about the API —
          you will use it on the DoorDash delivery time dataset with four different algorithms,
          switching between them by changing one line each time.
          By the end, switching algorithms will feel completely natural.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — THE THREE CORE METHODS ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The core interface</span>
        <h2 style={S.h2}>Three methods — every sklearn object has these</h2>

        <p style={S.p}>
          Every sklearn object — whether it is a model, a scaler, an encoder,
          or an imputer — is built around three methods.
          Understanding what each one does and when to call it
          is the entire sklearn interface.
        </p>

        <VisualBox label="The three-method pattern — the same for every sklearn object">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              {
                step: '1',
                method: 'fit(X_train)',
                color: '#378ADD',
                plain: 'The learning step. Show the object your training data. It computes and stores statistics — the mean and std for a scaler, the split thresholds for a tree, the weights for a regression. Nothing is returned. The object is now "trained".',
                rule: 'ONLY called on training data. Never on test data. Ever.',
              },
              {
                step: '2',
                method: 'transform(X)  OR  predict(X)',
                color: '#1D9E75',
                plain: 'The application step. Apply the learned statistics to new data. transform() is for preprocessing (scaling, encoding). predict() is for models (output a class or number). Uses stored stats from fit() — does NOT learn anything new.',
                rule: 'Called on BOTH training and test data using the same stored stats.',
              },
              {
                step: '3',
                method: 'fit_transform(X_train)',
                color: '#D85A30',
                plain: 'Shortcut: fit() then transform() in one call. Slightly faster because some objects can optimise the combined operation. Only use on training data — calling fit_transform on test data is the classic data leakage mistake.',
                rule: 'Convenient shortcut — but ONLY for training data.',
              },
            ].map((item) => (
              <div key={item.step} style={{
                display: 'flex', gap: 16, alignItems: 'flex-start',
                padding: '16px 0',
                borderBottom: '1px solid var(--border)',
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
                    fontSize: 14, fontWeight: 700,
                    color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 6,
                  }}>
                    .{item.method}
                  </div>
                  <p style={{ ...S.ps, marginBottom: 8 }}>{item.plain}</p>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: item.color,
                    fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
                  }}>
                    ⚠ Rule: {item.rule}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

np.random.seed(42)
n = 1000

# DoorDash delivery time dataset
distance  = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic   = np.random.randint(1, 11, n).astype(float)
prep_time = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
delivery  = (8.6 + 7.3*distance + 0.8*prep_time + 1.5*traffic
             + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep_time])
y = delivery

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ── Step 1: Create the object ──────────────────────────────────────────
# Just instantiation — nothing is learned yet
scaler = StandardScaler()
model  = LinearRegression()

# ── Step 2: fit() — the learning step ─────────────────────────────────
# ONLY on training data
scaler.fit(X_train)      # learns mean and std of X_train
model.fit(X_train, y_train)  # nope — needs scaled input, see Pipeline below

# What did scaler learn and store?
print("What StandardScaler learned from X_train:")
print(f"  mean_:   {scaler.mean_.round(2)}")   # stored mean per feature
print(f"  scale_:  {scaler.scale_.round(2)}")  # stored std per feature

# ── Step 3: transform() — apply learned stats ────────────────────────
# Uses STORED stats — does NOT refit on test data
X_train_scaled = scaler.transform(X_train)
X_test_scaled  = scaler.transform(X_test)   # same mean/std as training

# ── fit_transform() shortcut — ONLY for training ─────────────────────
scaler2        = StandardScaler()
X_train_scaled = scaler2.fit_transform(X_train)   # fit + transform in one call
X_test_scaled  = scaler2.transform(X_test)        # transform only — no refitting!

# ── WRONG: calling fit_transform on test (leakage!) ──────────────────
# X_test_WRONG = scaler2.fit_transform(X_test)   # NEVER DO THIS
# This would compute NEW mean/std from test data — leaking test stats into your pipeline

# ── Train and predict with the model ─────────────────────────────────
model.fit(X_train_scaled, y_train)

y_pred_train = model.predict(X_train_scaled)
y_pred_test  = model.predict(X_test_scaled)

from sklearn.metrics import mean_absolute_error
print(f"\nLinear Regression:")
print(f"  Train MAE: {mean_absolute_error(y_train, y_pred_train):.2f} min")
print(f"  Test MAE:  {mean_absolute_error(y_test,  y_pred_test):.2f} min")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — THE ESTIMATOR HIERARCHY ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Types of sklearn objects</span>
        <h2 style={S.h2}>Not all sklearn objects do the same thing — here is the map</h2>

        <p style={S.p}>
          sklearn objects fall into three types. All three share the
          <span style={S.code as React.CSSProperties}> .fit()</span> method.
          But what they do with it — and what methods they expose — differs.
          Knowing which type you are working with prevents a lot of confusion.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              type: 'Estimator (models)',
              color: '#378ADD',
              methods: ['fit(X, y)', 'predict(X)', 'score(X, y)'],
              what: 'Learns from labelled data. Takes both X (features) and y (labels) in fit(). Makes predictions on new X.',
              examples: 'LinearRegression, LogisticRegression, RandomForestClassifier, DecisionTreeClassifier',
            },
            {
              type: 'Transformer (preprocessors)',
              color: '#1D9E75',
              methods: ['fit(X)', 'transform(X)', 'fit_transform(X)'],
              what: 'Learns statistics from X and transforms X. Does NOT use y during fit(). Changes the shape or values of X.',
              examples: 'StandardScaler, MinMaxScaler, OneHotEncoder, SimpleImputer, PCA',
            },
            {
              type: 'Transformer-Estimator (both)',
              color: '#D85A30',
              methods: ['fit(X, y)', 'transform(X)', 'predict(X)'],
              what: 'Both preprocesses AND predicts. Uses y during fit() to make the transformation smarter. TargetEncoder is the main example.',
              examples: 'TargetEncoder, LinearDiscriminantAnalysis',
            },
          ].map((item) => (
            <div key={item.type} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '14px 16px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{
                fontSize: 13, fontWeight: 700, color: item.color,
                fontFamily: 'var(--font-display)', marginBottom: 8,
              }}>
                {item.type}
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, marginBottom: 8 }}>
                {item.methods.map((m) => (
                  <span key={m} style={{
                    fontSize: 11, fontFamily: 'var(--font-mono)', color: item.color,
                    background: `${item.color}12`, border: `1px solid ${item.color}30`,
                    borderRadius: 4, padding: '2px 8px',
                  }}>
                    .{m}
                  </span>
                ))}
              </div>
              <p style={{ ...S.ps, marginBottom: 5 }}>{item.what}</p>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                Examples: {item.examples}
              </div>
            </div>
          ))}
        </div>

        <h3 style={S.h3}>Useful attributes after fit() — what every trained object stores</h3>

        <p style={S.p}>
          After calling <span style={S.code as React.CSSProperties}>.fit()</span>,
          sklearn objects expose attributes (ending in underscore <span style={S.code as React.CSSProperties}>_</span>)
          that let you inspect what was learned. This underscore convention is
          universal across all of sklearn — if a variable name ends in
          <span style={S.code as React.CSSProperties}> _</span> it was set during
          <span style={S.code as React.CSSProperties}> .fit()</span>.
        </p>

        <CodeBlock code={`from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.tree import DecisionTreeClassifier
import numpy as np

np.random.seed(42)
n = 500
X_num = np.column_stack([
    np.abs(np.random.normal(4, 2, n)),    # distance
    np.random.randint(1, 11, n).astype(float),  # traffic
])
y_reg = 20 + 5*X_num[:,0] + 2*X_num[:,1] + np.random.randn(n)*3
y_cls = (y_reg > 35).astype(int)

# ── StandardScaler attributes after fit() ─────────────────────────────
scaler = StandardScaler().fit(X_num)
print("StandardScaler attributes:")
print(f"  .mean_    (learned mean):    {scaler.mean_.round(3)}")
print(f"  .scale_   (learned std):     {scaler.scale_.round(3)}")
print(f"  .var_     (learned variance):{scaler.var_.round(3)}")
print(f"  .n_features_in_ (n features):{scaler.n_features_in_}")
print(f"  .n_samples_seen_:            {scaler.n_samples_seen_}")

# ── LinearRegression attributes after fit() ───────────────────────────
X_sc = scaler.transform(X_num)
lr   = LinearRegression().fit(X_sc, y_reg)
print("\nLinearRegression attributes:")
print(f"  .coef_      (learned weights): {lr.coef_.round(3)}")
print(f"  .intercept_ (learned bias):    {lr.intercept_:.3f}")
print(f"  .n_features_in_:               {lr.n_features_in_}")

# ── DecisionTreeClassifier attributes after fit() ─────────────────────
dt = DecisionTreeClassifier(max_depth=3).fit(X_sc, y_cls)
print("\nDecisionTreeClassifier attributes:")
print(f"  .n_features_in_:       {dt.n_features_in_}")
print(f"  .n_classes_:           {dt.n_classes_}")
print(f"  .classes_:             {dt.classes_}")
print(f"  .feature_importances_: {dt.feature_importances_.round(3)}")
print(f"  .max_features_:        {dt.max_features_}")

# ── OneHotEncoder attributes after fit() ─────────────────────────────
restaurants = np.array(['Pizza Hut','KFC','Dominos','Pizza Hut','KFC']).reshape(-1,1)
ohe = OneHotEncoder(sparse_output=False).fit(restaurants)
print("\nOneHotEncoder attributes:")
print(f"  .categories_:      {ohe.categories_}")
print(f"  .feature_names_out: {ohe.get_feature_names_out(['restaurant'])}") `} />
      </div>

      <Div />

      {/* ══ SECTION 4 — SWITCHING ALGORITHMS ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The power of the unified interface</span>
        <h2 style={S.h2}>Switching algorithms by changing one word — this is the entire point</h2>

        <p style={S.p}>
          The reason sklearn uses a unified interface is so you can compare
          multiple algorithms with almost zero extra code.
          The preprocessing stays identical. The evaluation stays identical.
          Only the model object changes. This is how data scientists actually work —
          they run several algorithms and pick the one that performs best.
        </p>

        <CodeBlock code={`import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import mean_absolute_error
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 2000
distance  = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic   = np.random.randint(1, 11, n).astype(float)
prep      = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
value     = np.abs(np.random.normal(350, 150, n)).clip(50, 1200)
delivery  = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
             + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep, value])
y = delivery

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
scaler     = StandardScaler()
X_train_sc = scaler.fit_transform(X_train)
X_test_sc  = scaler.transform(X_test)

# ── Every algorithm has the same interface ────────────────────────────
# Change only the model object — everything else stays the same
models = {
    'Linear Regression':      LinearRegression(),
    'Ridge Regression':       Ridge(alpha=1.0),
    'Lasso Regression':       Lasso(alpha=0.1),
    'Decision Tree':          DecisionTreeRegressor(max_depth=5, random_state=42),
    'Random Forest':          RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1),
    'Gradient Boosting':      GradientBoostingRegressor(n_estimators=100, random_state=42),
    'K-Nearest Neighbours':   KNeighborsRegressor(n_neighbors=10),
}

print(f"{'Algorithm':<25} {'Train MAE':>10} {'Test MAE':>10} {'CV MAE (5-fold)':>16}")
print("─" * 68)

for name, model in models.items():
    # ── SAME THREE LINES for every single algorithm ─────────────────
    model.fit(X_train_sc, y_train)                    # 1. train
    y_pred = model.predict(X_test_sc)                 # 2. predict
    test_mae = mean_absolute_error(y_test, y_pred)    # 3. evaluate
    # ────────────────────────────────────────────────────────────────

    train_mae = mean_absolute_error(y_train, model.predict(X_train_sc))
    cv_scores = cross_val_score(model, X_train_sc, y_train,
                                 cv=5, scoring='neg_mean_absolute_error')
    cv_mae = -cv_scores.mean()

    print(f"  {name:<23} {train_mae:>10.2f} {test_mae:>10.2f} {cv_mae:>14.2f}")

# ── score() method — quick accuracy check ────────────────────────────
# For regressors: returns R² score
# For classifiers: returns accuracy
print(f"\nR² scores (model.score()):")
for name, model in list(models.items())[:3]:
    r2 = model.score(X_test_sc, y_test)
    print(f"  {name:<25}: R² = {r2:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — PIPELINE ═══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most important sklearn tool</span>
        <h2 style={S.h2}>Pipeline — chain preprocessing and modelling into one object</h2>

        <p style={S.p}>
          Every ML workflow has multiple steps: impute missing values,
          scale numeric features, encode categorical features, then train the model.
          Without Pipeline you write these as separate steps, manually tracking
          which scaler was fit on which data — and inevitably making the leakage
          mistake (fitting on the full dataset instead of just the training fold).
        </p>

        <p style={S.p}>
          Pipeline chains all steps into one object. When you call
          <span style={S.code as React.CSSProperties}> pipeline.fit(X_train)</span>,
          it fits each step on the training data automatically.
          When you call <span style={S.code as React.CSSProperties}>pipeline.predict(X_test)</span>,
          it applies each step's stored statistics — never refitting.
          Data leakage becomes structurally impossible.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A Pipeline is like an assembly line in a factory.
            Raw materials (data) enter at one end.
            Each station performs one operation — wash, cut, assemble, paint.
            The finished product (predictions) comes out at the other end.
            The assembly line has a fixed order. Each station knows exactly
            what state the material is in when it arrives.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            Without Pipeline you are doing each factory step manually and carrying
            the half-finished product between stations yourself — error-prone,
            slow, and easy to do in the wrong order.
          </p>
        </AnalogyBox>

        <VisualBox label="Pipeline flow — raw data in, predictions out">
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto' as const, flexWrap: 'nowrap' as const }}>
            {[
              { label: 'Raw X', color: '#555', isBg: true },
              { label: '→', color: '#555', isArrow: true },
              { label: 'Step 1\nImputer\n.fit_transform()', color: '#378ADD' },
              { label: '→', color: '#555', isArrow: true },
              { label: 'Step 2\nScaler\n.fit_transform()', color: '#1D9E75' },
              { label: '→', color: '#555', isArrow: true },
              { label: 'Step 3\nModel\n.fit()', color: '#D85A30' },
              { label: '→', color: '#555', isArrow: true },
              { label: 'Predictions', color: '#00e676', isBg: true },
            ].map((item, i) => (
              item.isArrow ? (
                <div key={i} style={{ fontSize: 20, color: item.color, padding: '0 4px' }}>→</div>
              ) : (
                <div key={i} style={{
                  background: item.isBg ? 'var(--surface)' : `${item.color}15`,
                  border: `1px solid ${item.color}40`,
                  borderRadius: 8, padding: '10px 12px',
                  textAlign: 'center' as const, minWidth: 90,
                  flexShrink: 0,
                }}>
                  {item.label.split('\n').map((line, j) => (
                    <div key={j} style={{
                      fontSize: j === 0 ? 11 : j === 1 ? 12 : 10,
                      fontWeight: j === 0 ? 700 : j === 1 ? 600 : 400,
                      color: j === 2 ? item.color : 'var(--text)',
                      fontFamily: j === 2 ? 'var(--font-mono)' : 'inherit',
                      lineHeight: 1.5,
                    }}>
                      {line}
                    </div>
                  ))}
                </div>
              )
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 12 }}>
            During <strong style={{ color: 'var(--text)' }}>fit()</strong>: each step calls
            fit_transform() on the training data in sequence.
            During <strong style={{ color: 'var(--text)' }}>predict()</strong>: each step calls
            transform() (not fit!) — using the stored statistics from training.
          </p>
        </VisualBox>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.linear_model import Ridge
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.metrics import mean_absolute_error

np.random.seed(42)
n = 2000
restaurants = ['Pizza Hut','KFC','Dominos','Biryani Blues',"McDonald's",'Subway']
cities      = ['Seattle','New York','Delhi','Austin','Boston']

df = pd.DataFrame({
    'distance_km':    np.abs(np.random.normal(4, 2, n)).clip(0.5, 15),
    'traffic_score':  np.random.randint(1, 11, n).astype(float),
    'restaurant_prep': np.abs(np.random.normal(15, 5, n)).clip(5, 35),
    'order_value':    np.abs(np.random.normal(350, 150, n)).clip(50, 1200),
    'restaurant':     np.random.choice(restaurants, n),
    'city':           np.random.choice(cities, n),
})
y = (8.6 + 7.3*df['distance_km'] + 0.8*df['restaurant_prep']
     + 1.5*df['traffic_score'] + np.random.normal(0, 4, n)).clip(10, 120)

# Introduce some missing values
df.loc[np.random.choice(n, 80, replace=False),  'restaurant_prep'] = np.nan
df.loc[np.random.choice(n, 40, replace=False),  'traffic_score']   = np.nan

X_train, X_test, y_train, y_test = train_test_split(
    df, y, test_size=0.2, random_state=42
)

NUM_COLS = ['distance_km', 'traffic_score', 'restaurant_prep', 'order_value']
CAT_COLS = ['restaurant', 'city']

# ── Step 1: Build sub-pipelines for each column type ──────────────────
numeric_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),   # fills NaN with median
    ('scaler',  StandardScaler()),                    # standardise to mean=0, std=1
])

categorical_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),   # fills NaN with mode
    ('encoder', OneHotEncoder(handle_unknown='ignore',      # unknown → all zeros
                               sparse_output=False,
                               drop='first')),
])

# ── Step 2: ColumnTransformer — apply different pipelines to different columns
preprocessor = ColumnTransformer([
    ('num', numeric_pipeline,    NUM_COLS),
    ('cat', categorical_pipeline, CAT_COLS),
])

# ── Step 3: Full pipeline — preprocessor + model ──────────────────────
pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('model',        Ridge(alpha=1.0)),
])

# ── The pipeline is now ONE sklearn object ─────────────────────────────
# fit() trains the entire chain on training data only
pipeline.fit(X_train, y_train)

# predict() applies the entire chain to new data
y_pred = pipeline.predict(X_test)
print(f"Pipeline (Ridge) Test MAE: {mean_absolute_error(y_test, y_pred):.2f} min")

# ── Cross-validation with pipeline — leakage-proof ────────────────────
# The pipeline is refit from scratch in each fold
# Scaler/encoder statistics are never contaminated by validation data
cv_scores = cross_val_score(
    pipeline, df, y, cv=5,
    scoring='neg_mean_absolute_error'
)
print(f"5-fold CV MAE: {-cv_scores.mean():.2f} ± {cv_scores.std():.2f} min")

# ── Switching the model — change ONE word ─────────────────────────────
pipeline_rf = Pipeline([
    ('preprocessor', preprocessor),
    ('model',        RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)),
])
pipeline_rf.fit(X_train, y_train)
y_pred_rf = pipeline_rf.predict(X_test)
print(f"Pipeline (RF)   Test MAE: {mean_absolute_error(y_test, y_pred_rf):.2f} min")`} />

        <h3 style={S.h3}>Accessing individual steps inside a fitted Pipeline</h3>

        <CodeBlock code={`# After fitting, you can inspect any step inside the pipeline

# Access by name
fitted_scaler  = pipeline.named_steps['preprocessor']\
                          .named_transformers_['num']\
                          .named_steps['scaler']
fitted_encoder = pipeline.named_steps['preprocessor']\
                          .named_transformers_['cat']\
                          .named_steps['encoder']
fitted_model   = pipeline.named_steps['model']

print("Stored scaler mean (from training data):")
print(f"  {fitted_scaler.mean_.round(2)}")

print("\nStored encoder categories:")
print(f"  {fitted_encoder.categories_}")

print("\nModel coefficients:")
print(f"  {fitted_model.coef_.round(3)}")

# set_params() — change hyperparameters without rebuilding the pipeline
# Uses double underscore __ to navigate into nested steps
pipeline.set_params(model__alpha=10.0)   # change Ridge alpha
pipeline.fit(X_train, y_train)
y_pred_new = pipeline.predict(X_test)
print(f"\nAfter changing alpha to 10: MAE={mean_absolute_error(y_test, y_pred_new):.2f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — COLUMN TRANSFORMER ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Handling mixed data types</span>
        <h2 style={S.h2}>ColumnTransformer — apply different transformations to different columns</h2>

        <p style={S.p}>
          Real datasets always have mixed column types. Numeric columns need scaling.
          Categorical columns need encoding. Text columns need tokenisation.
          ColumnTransformer lets you define a different transformation for each
          group of columns and applies them all in parallel, then concatenates
          the results into one matrix.
        </p>

        <ConceptBox title="ColumnTransformer — the building block of every production pipeline">
          <p style={{ ...S.ps, marginBottom: 10 }}>
            You define named transformers as a list of tuples:
            <strong style={{ color: '#a0a0b0' }}> (name, transformer, columns)</strong>.
            Each transformer processes its assigned columns independently.
            The results are concatenated horizontally into one output matrix.
          </p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2, color: 'var(--muted)' }}>
            <div>ColumnTransformer([</div>
            <div style={{ paddingLeft: 20, color: '#378ADD' }}>  ('name_1', transformer_1, column_list_1),</div>
            <div style={{ paddingLeft: 20, color: '#1D9E75' }}>  ('name_2', transformer_2, column_list_2),</div>
            <div style={{ paddingLeft: 20, color: '#D85A30' }}>  ('name_3', transformer_3, column_list_3),</div>
            <div>])</div>
          </div>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 10 }}>
            <strong style={{ color: 'var(--text)' }}>remainder='drop'</strong> (default) — columns not listed are dropped.
            <strong style={{ color: 'var(--text)' }}> remainder='passthrough'</strong> — unlisted columns pass through unchanged.
          </p>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import (StandardScaler, MinMaxScaler,
                                    OneHotEncoder, OrdinalEncoder)
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline

np.random.seed(42)
n = 500

df = pd.DataFrame({
    # Numeric — need scaling
    'distance_km':    np.abs(np.random.normal(4, 2, n)).clip(0.5, 15),
    'order_value':    np.abs(np.random.normal(350, 150, n)).clip(50, 1200),
    # Ordinal categorical — has a natural order
    'traffic_level':  np.random.choice(['low','medium','high'], n),
    # Nominal categorical — no order
    'city':           np.random.choice(['Seattle','New York','Delhi'], n),
    'restaurant':     np.random.choice(['KFC','Dominos','Pizza Hut'], n),
    # Binary
    'is_weekend':     np.random.randint(0, 2, n).astype(float),
})

# ── Build a ColumnTransformer for mixed types ─────────────────────────
ct = ColumnTransformer([
    # Numeric columns → StandardScaler (after imputing median for NaN)
    ('num_standard', Pipeline([
        ('imp',   SimpleImputer(strategy='median')),
        ('scale', StandardScaler()),
    ]), ['distance_km', 'order_value']),

    # Ordinal → OrdinalEncoder with explicit order
    ('ordinal', OrdinalEncoder(
        categories=[['low', 'medium', 'high']],
        handle_unknown='use_encoded_value', unknown_value=-1,
    ), ['traffic_level']),

    # Nominal → OneHotEncoder
    ('nominal', OneHotEncoder(
        sparse_output=False, handle_unknown='ignore', drop='first'
    ), ['city', 'restaurant']),

    # Binary → pass through as-is (no transformation needed)
    ('binary', 'passthrough', ['is_weekend']),
])

# fit on training data
ct.fit(df)
X_transformed = ct.transform(df)

print(f"Original shape:    {df.shape}")
print(f"Transformed shape: {X_transformed.shape}")

# What columns does each transformer produce?
print(f"\nOutput feature names:")
for name in ct.get_feature_names_out():
    print(f"  {name}")

# ── make_column_selector — select columns by dtype automatically ───────
from sklearn.compose import make_column_selector

# Instead of listing column names manually, select by dtype
ct_auto = ColumnTransformer([
    ('num', StandardScaler(),
     make_column_selector(dtype_include=np.number)),
    ('cat', OneHotEncoder(sparse_output=False, handle_unknown='ignore'),
     make_column_selector(dtype_include=object)),
])

# This auto-detects numeric and categorical columns
df_typed = df.copy()
df_typed['city']       = df_typed['city'].astype('category')
df_typed['restaurant'] = df_typed['restaurant'].astype('category')
# make_column_selector with dtype_include='category' would pick these up`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — CROSS-VALIDATION AND GRIDSEARCH ═══════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Evaluating and tuning properly</span>
        <h2 style={S.h2}>cross_val_score and GridSearchCV — the evaluation and tuning tools</h2>

        <p style={S.p}>
          A single train/test split gives you one estimate of model performance.
          It might be lucky or unlucky depending on which samples ended up in each set.
          Cross-validation runs the train/test split multiple times with different splits
          and averages the results — giving a much more reliable performance estimate.
          GridSearchCV combines cross-validation with hyperparameter search.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import Ridge
from sklearn.model_selection import (
    cross_val_score, KFold, StratifiedKFold,
    GridSearchCV, RandomizedSearchCV,
)
from sklearn.metrics import mean_absolute_error

np.random.seed(42)
n = 1500
df = pd.DataFrame({
    'distance_km':    np.abs(np.random.normal(4, 2, n)).clip(0.5, 15),
    'traffic_score':  np.random.randint(1, 11, n).astype(float),
    'restaurant_prep': np.abs(np.random.normal(15, 5, n)).clip(5, 35),
    'order_value':    np.abs(np.random.normal(350, 150, n)).clip(50, 1200),
    'city':           np.random.choice(['Seattle','New York','Delhi','Austin'], n),
    'restaurant':     np.random.choice(['KFC','Dominos','Pizza Hut','Subway'], n),
})
y = (8.6 + 7.3*df['distance_km'] + 0.8*df['restaurant_prep']
     + 1.5*df['traffic_score'] + np.random.normal(0, 4, n)).clip(10, 120)

NUM_COLS = ['distance_km', 'traffic_score', 'restaurant_prep', 'order_value']
CAT_COLS = ['city', 'restaurant']

preprocessor = ColumnTransformer([
    ('num', Pipeline([('imp', SimpleImputer(strategy='median')),
                      ('sc',  StandardScaler())]), NUM_COLS),
    ('cat', OneHotEncoder(sparse_output=False, handle_unknown='ignore',
                           drop='first'), CAT_COLS),
])
pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('model', Ridge(alpha=1.0)),
])

# ── cross_val_score — most common evaluation ──────────────────────────
scores = cross_val_score(
    pipeline, df, y,
    cv=5,                                    # 5 folds
    scoring='neg_mean_absolute_error',       # sklearn uses negative for minimisation
    n_jobs=-1,                               # parallel across all CPU cores
)
print(f"5-fold CV MAE: {-scores.mean():.2f} ± {scores.std():.2f} min")
print(f"Per-fold scores: {(-scores).round(2)}")

# ── GridSearchCV — exhaustive hyperparameter search ───────────────────
# Syntax: step_name__parameter_name (double underscore)
param_grid = {
    'model__alpha': [0.01, 0.1, 1.0, 10.0, 100.0],
}

grid_search = GridSearchCV(
    pipeline,
    param_grid,
    cv=5,
    scoring='neg_mean_absolute_error',
    n_jobs=-1,
    verbose=0,
)
grid_search.fit(df, y)

print(f"\nGridSearchCV results:")
print(f"  Best alpha:  {grid_search.best_params_}")
print(f"  Best CV MAE: {-grid_search.best_score_:.2f} min")
print(f"  Best model:  {grid_search.best_estimator_}")

# ── RandomizedSearchCV — faster for large search spaces ───────────────
from scipy.stats import loguniform

pipeline_rf = Pipeline([
    ('preprocessor', preprocessor),
    ('model', RandomForestRegressor(random_state=42, n_jobs=-1)),
])

param_dist = {
    'model__n_estimators':     [50, 100, 200, 300],
    'model__max_depth':        [None, 5, 10, 20],
    'model__min_samples_leaf': [1, 5, 10, 20],
    'model__max_features':     ['sqrt', 'log2', 0.3],
}

random_search = RandomizedSearchCV(
    pipeline_rf,
    param_dist,
    n_iter=20,          # try 20 random combinations (not all 192)
    cv=3,
    scoring='neg_mean_absolute_error',
    random_state=42,
    n_jobs=-1,
)
random_search.fit(df, y)

print(f"\nRandomizedSearchCV results:")
print(f"  Best params: {random_search.best_params_}")
print(f"  Best CV MAE: {-random_search.best_score_:.2f} min")`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common sklearn interface error — explained and fixed</h2>

        <ErrorBlock
          error="NotFittedError: This StandardScaler instance is not fitted yet. Call 'fit' before 'transform'."
          cause="You called .transform() or .predict() on an object that has never had .fit() called on it. Common causes: you created a new scaler object but forgot to call .fit(); you saved a model with joblib and loaded it into a new variable but called predict on the wrong variable; or you put transform before fit in your code."
          fix="Always call .fit(X_train) before .transform() or .predict(). Use a Pipeline to make the order enforced automatically — Pipeline.fit() calls each step's fit in order, making it impossible to call transform before fit. Check your variable names: scaler_new = StandardScaler() creates an unfitted object, scaler_fitted.transform() uses the fitted one."
        />

        <ErrorBlock
          error="ValueError: X has 6 features, but StandardScaler is expecting 4 features as input."
          cause="The number of columns in your test data does not match what was seen during fit(). Most common cause: you added or removed a column between fitting and transforming. Also caused by pd.get_dummies() producing different columns on train and test when categories differ, or when you manually select columns inconsistently."
          fix="Always use the same column selection for fit and transform. Store the column list as a variable: FEATURE_COLS = ['col1', 'col2']. Then use X_train[FEATURE_COLS] and X_test[FEATURE_COLS] consistently. Use ColumnTransformer inside a Pipeline which handles column selection automatically and consistently."
        />

        <ErrorBlock
          error="DataConversionWarning: A column-vector y was passed when a 1d array was expected"
          cause="You passed y as a 2D array (shape n×1) instead of a 1D array (shape n,). This happens when you use df[['target']] (double brackets → DataFrame) instead of df['target'] (single brackets → Series), or when you do y.reshape(-1, 1) and forget to reverse it."
          fix="Use single brackets for the target column: y = df['target'] not y = df[['target']]. If you have a 2D y, flatten it: y = y.values.ravel() or y = y.squeeze(). Check y.shape — it should be (n,) not (n, 1)."
        />

        <ErrorBlock
          error="TypeError: All intermediate steps should be transformers — 'model' (type LinearRegression) does not"
          cause="You put the model in the middle of a Pipeline instead of at the end. sklearn Pipeline requires that all steps except the last one are transformers (have .transform()). Only the final step can be a pure estimator (model). If you accidentally added the model as step 2 of 3, this error appears."
          fix="Models must always be the last step in a Pipeline. Order: Pipeline([('imputer', imputer), ('scaler', scaler), ('model', model)]). If you need to use a model's output as a transformation step (e.g. in stacking), use TransformedTargetRegressor or a custom transformer that wraps the model."
        />
      </div>

      <Div />

      {/* ══ SECTION 9 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You now speak sklearn fluently. The next section puts it to work on real data.
        </h2>

        <p style={S.p}>
          fit, predict, transform, Pipeline, ColumnTransformer, cross_val_score,
          GridSearchCV — these are the seven tools you will use in every single
          ML project for the rest of your career. You now know all of them.
        </p>

        <p style={S.p}>
          Section 4 — Data Engineering for ML — begins next.
          It starts with the messiest part of every real ML project:
          getting the data in the first place. REST APIs, SQL databases,
          Parquet files, web scraping — where ML data actually comes from
          and how to pull it reliably with Python.
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
              Next — Module 15 · Data Engineering for ML
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Data Collection — APIs, SQL, Files and Scraping
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Where ML data actually comes from. Pull from REST APIs, query databases,
              read Parquet files, and scrape web data — all with production-grade Python.
            </p>
          </div>
          <a href="/learn/ai-ml/data-engineering/data-collection" style={{
            fontSize: 12, color: '#1D9E75',
            border: '1px solid #1D9E7550',
            padding: '7px 14px', borderRadius: 6,
            fontFamily: 'var(--font-mono)',
            textDecoration: 'none',
            background: '#1D9E7510',
          }}>
            read →
          </a>
        </div>
      </div>

      <KeyTakeaways
        items={[
          'sklearn has one unified interface shared by all 200+ algorithms. Three methods cover everything: .fit() learns from data, .transform() applies learned transformations, .predict() makes predictions. Learn this pattern once — use any algorithm.',
          '.fit() must only be called on training data. Never on test data. Calling fit on test data leaks information and makes evaluation metrics optimistically wrong. This is the single most important rule in all of sklearn.',
          'There are three types of sklearn objects: Estimators (models with fit+predict), Transformers (preprocessors with fit+transform), and objects that are both. After fit(), all learned values are stored as underscore attributes: scaler.mean_, model.coef_, encoder.categories_.',
          'Pipeline chains multiple steps into one object. It enforces correct fit/transform order automatically, prevents leakage in cross-validation (each fold refits the entire pipeline on its training portion), and lets you swap models by changing one word.',
          'ColumnTransformer applies different transformations to different column groups in parallel. Numeric columns get scaling, categorical get encoding, ordinal get ordinal encoding — all in one object that sklearn treats as a single transformer.',
          'GridSearchCV and RandomizedSearchCV find optimal hyperparameters. Always pass a Pipeline to these — never raw data with a separate preprocessing step. Use double underscore syntax to target parameters inside Pipeline steps: model__alpha, preprocessor__num__scaler__with_mean.',
        ]}
      />
    </LearnLayout>
  )
}