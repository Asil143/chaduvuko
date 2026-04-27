import type { Metadata } from 'next'
import { LearnLayout }from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'XGBoost in Practice — End to End — Chaduvuko',
  description:
    'Train, tune, and interpret XGBoost on a real dataset. Regularisation parameters, early stopping, SHAP values, and production deployment — all in one module.',
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

function ConceptBox({ title, children, color = '#D85A30' }: {
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

export default function XGBoostPage() {
  return (
    <LearnLayout
      title="XGBoost in Practice — End to End"
      description="Train, tune, and interpret XGBoost on a real dataset. Regularisation parameters, early stopping, SHAP values, and production deployment — all in one module."
      section="Classical ML"
      readTime="40–45 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="classical-ml" topic="xgboost" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — what makes XGBoost special?</span>
        <h2 style={S.h2}>
          XGBoost won every Kaggle competition from 2016–2019.
          It is still the most deployed ML algorithm in Indian fintech today.
          Here is why.
        </h2>

        <p style={S.p}>
          Module 29 explained gradient boosting conceptually — sequential trees
          each correcting the previous ensemble's mistakes.
          XGBoost (eXtreme Gradient Boosting) is an engineering implementation
          of that idea that made it practical at scale. Chen and Guestrin (2016)
          published a paper at KDD that introduced three key improvements:
          second-order gradients for more accurate tree construction,
          a built-in regularisation term that penalises model complexity,
          and a column subsampling technique borrowed from Random Forest.
        </p>

        <p style={S.p}>
          The result was an algorithm that was simultaneously faster,
          more accurate, and less prone to overfitting than the original
          gradient boosting. Within a year it dominated every tabular ML benchmark.
          In 2026 it is still what most Indian fintech companies —
          Stripe, Brex, Instacart, Venmo — use for credit scoring,
          fraud detection, and churn prediction in production.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Gradient boosting is like a team of students taking turns correcting
            each other's homework — each student fixes what the previous one got wrong.
            XGBoost is the same team, but now each student:
            looks at not just where they were wrong but how sharply wrong (second derivative),
            gets penalised for writing overly complex answers (regularisation),
            and only studies a random subset of topics each turn (column subsampling).
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The result: faster convergence, better generalisation, and answers
            that are easier to explain to the teacher (interpretability via SHAP).
          </p>
        </AnalogyBox>

        <Callout type="tip">
          XGBoost requires <span style={S.code as React.CSSProperties}>pip install xgboost</span>.
          It is not included in sklearn but uses the same fit/predict API.
          Every sklearn Pipeline, GridSearchCV, and cross_val_score works
          with XGBoost out of the box because XGBoost implements
          the sklearn estimator interface.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — WHAT XGBOOST ADDS ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Three improvements over vanilla gradient boosting</span>
        <h2 style={S.h2}>What XGBoost adds — and why each improvement matters</h2>

        <p style={S.p}>
          Understanding the three improvements XGBoost made over the original
          gradient boosting directly maps to knowing which hyperparameters to tune.
          Each improvement has a corresponding parameter.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[
            {
              num: '1',
              title: 'Second-order gradients (Newton step)',
              color: '#D85A30',
              plain: 'Vanilla gradient boosting uses only the first derivative (gradient) to decide how to split. XGBoost also uses the second derivative (Hessian) — the curvature of the loss. This gives more accurate information about the optimal leaf values, leading to better trees with fewer iterations.',
              param: 'Built-in, no parameter to set. Just use XGBoost instead of GBM.',
              analogy: 'Like the difference between walking downhill guided only by slope (first derivative) vs also knowing how quickly the slope is changing (second derivative). The second gives you a better estimate of where the valley floor is.',
            },
            {
              num: '2',
              title: 'L1 and L2 regularisation on leaf weights',
              color: '#378ADD',
              plain: 'XGBoost adds a penalty to the loss function that discourages trees from having too many leaves or leaves with extreme values. This is controlled by alpha (L1), lambda (L2), and gamma (minimum gain to make a split). Gradient boosting had none of this.',
              param: 'alpha (L1, default=0), reg_lambda (L2, default=1), gamma (min split gain, default=0)',
              analogy: 'Like a student who is penalised for writing unnecessarily long answers. They learn to be concise — only adding information that meaningfully improves the answer.',
            },
            {
              num: '3',
              title: 'Column subsampling (like Random Forest)',
              color: '#1D9E75',
              plain: 'For each tree and each level, XGBoost randomly selects a fraction of features to consider for splitting. This decorrelates the trees (same insight as Random Forest) and reduces overfitting when many features are correlated.',
              param: 'colsample_bytree (per tree), colsample_bylevel (per depth), colsample_bynode (per split)',
              analogy: 'Each student on the correction team can only look at a random subset of the homework problems. This forces them to find different patterns, and the diversity of perspectives produces a better overall answer.',
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
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                  {item.title}
                </span>
              </div>
              <p style={{ ...S.ps, marginBottom: 6 }}>{item.plain}</p>
              <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 5 }}>
                Parameter: {item.param}
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>
                Analogy: {item.analogy}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Div />

      {/* ══ SECTION 3 — FIRST XGBoost MODEL ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Getting started</span>
        <h2 style={S.h2}>Your first XGBoost model — Stripe fraud detection</h2>

        <p style={S.p}>
          XGBoost's sklearn-compatible API means you already know how to use it.
          The only differences are the parameter names — which map directly
          to the three improvements described above.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import roc_auc_score, classification_report
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OrdinalEncoder
from sklearn.compose import ColumnTransformer
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 10_000

# ── Stripe transaction fraud dataset ────────────────────────────────
payment_methods = ['upi', 'card', 'netbanking', 'wallet']
merchants       = ['ecommerce', 'food', 'travel', 'utilities', 'gaming']

df = pd.DataFrame({
    'amount':           np.abs(np.random.normal(1200, 2000, n)).clip(10, 50_000),
    'hour_of_day':      np.random.randint(0, 24, n).astype(float),
    'day_of_week':      np.random.randint(0, 7, n).astype(float),
    'merchant_risk':    np.random.uniform(0, 1, n),
    'device_age_days':  np.abs(np.random.normal(200, 150, n)).clip(0, 1000),
    'n_tx_last_hour':   np.random.randint(0, 20, n).astype(float),
    'user_tenure_days': np.abs(np.random.normal(300, 200, n)).clip(1, 2000),
    'is_new_device':    np.random.randint(0, 2, n).astype(float),
    'payment_method':   np.random.choice(payment_methods, n),
    'merchant_type':    np.random.choice(merchants, n),
})

fraud_score = (
    (df['amount'] / 50_000) * 0.30
    + df['merchant_risk'] * 0.25
    + (df['n_tx_last_hour'] / 20) * 0.20
    + df['is_new_device'] * 0.15
    + np.random.randn(n) * 0.10
)
y = (fraud_score > 0.55).astype(int)
print(f"Fraud rate: {y.mean()*100:.1f}%")

X_tr, X_te, y_tr, y_te = train_test_split(
    df, y, test_size=0.2, stratify=y, random_state=42
)

NUM_COLS = ['amount','hour_of_day','day_of_week','merchant_risk',
            'device_age_days','n_tx_last_hour','user_tenure_days','is_new_device']
CAT_COLS = ['payment_method', 'merchant_type']

# XGBoost can handle label-encoded categoricals (no one-hot needed)
preprocessor = ColumnTransformer([
    ('num', 'passthrough', NUM_COLS),
    ('cat', OrdinalEncoder(handle_unknown='use_encoded_value',
                           unknown_value=-1), CAT_COLS),
])

# ── Baseline XGBoost — good defaults to start ─────────────────────────
pipeline = Pipeline([
    ('prep',  preprocessor),
    ('model', xgb.XGBClassifier(
        n_estimators      = 300,
        learning_rate     = 0.1,
        max_depth         = 4,
        subsample         = 0.8,
        colsample_bytree  = 0.8,
        reg_alpha         = 0.1,    # L1 — sparsifies leaf weights
        reg_lambda        = 1.0,    # L2 — shrinks leaf weights
        gamma             = 0.1,    # min gain to make a split
        scale_pos_weight  = (y_tr == 0).sum() / (y_tr == 1).sum(),  # class imbalance
        eval_metric       = 'auc',
        random_state      = 42,
        verbosity         = 0,
    )),
])

pipeline.fit(X_tr, y_tr)

y_proba = pipeline.predict_proba(X_te)[:, 1]
y_pred  = pipeline.predict(X_te)

print(f"XGBoost baseline:")
print(f"  ROC-AUC:  {roc_auc_score(y_te, y_proba):.4f}")
print(classification_report(y_te, y_pred, target_names=['Legit', 'Fraud']))

# ── CV to verify not overfitting ──────────────────────────────────────
cv_auc = cross_val_score(pipeline, df, y, cv=5, scoring='roc_auc', n_jobs=-1)
print(f"5-fold CV AUC: {cv_auc.mean():.4f} ± {cv_auc.std():.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — EARLY STOPPING ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most important training technique</span>
        <h2 style={S.h2}>Early stopping — automatically find the optimal number of trees</h2>

        <p style={S.p}>
          The most common XGBoost mistake is setting
          <span style={S.code as React.CSSProperties}> n_estimators</span> to a fixed number
          and hoping it is right. Too few trees — underfits.
          Too many — overfits and wastes training time.
          Early stopping solves this automatically: train until the validation
          score stops improving, then stop. Use the number of trees that
          produced the best validation score.
        </p>

        <p style={S.p}>
          Early stopping requires a separate validation set — a portion of the
          training data held back just for monitoring. XGBoost evaluates it
          after each tree and tracks the best score. After
          <span style={S.code as React.CSSProperties}> early_stopping_rounds</span> consecutive
          rounds with no improvement it stops and restores the best model.
        </p>

        <ConceptBox title="Early stopping — training curve explained">
          <svg width="100%" viewBox="0 0 500 180">
            {/* Axes */}
            <line x1="50" y1="20" x2="50" y2="155" stroke="#555" strokeWidth="1" />
            <line x1="50" y1="155" x2="470" y2="155" stroke="#555" strokeWidth="1" />
            <text x="255" y="175" textAnchor="middle" fontSize="10" fill="#888" fontFamily="monospace">n_estimators (trees)</text>
            <text x="15" y="90" fontSize="10" fill="#888" fontFamily="monospace" transform="rotate(-90,15,90)">loss</text>
            {/* Train curve — keeps going down */}
            <path d="M 50 140 Q 100 110 150 85 Q 200 65 250 52 Q 300 42 350 36 Q 400 32 460 30"
              fill="none" stroke="#D85A30" strokeWidth="2" />
            <text x="465" y="33" fontSize="9" fill="#D85A30" fontFamily="monospace">train</text>
            {/* Val curve — bottoms out then rises */}
            <path d="M 50 140 Q 100 112 150 92 Q 200 78 240 72 Q 270 70 290 72 Q 330 78 370 88 Q 410 98 460 112"
              fill="none" stroke="#1D9E75" strokeWidth="2" />
            <text x="465" y="115" fontSize="9" fill="#1D9E75" fontFamily="monospace">val</text>
            {/* Best point */}
            <circle cx="270" cy="70" r="5" fill="#00e676" />
            <line x1="270" y1="20" x2="270" y2="155" stroke="#00e676" strokeWidth="1.5" strokeDasharray="4,3" />
            <text x="272" y="18" fontSize="9" fill="#00e676" fontFamily="monospace">best val score</text>
            {/* Early stop point */}
            <line x1="360" y1="20" x2="360" y2="155" stroke="#BA7517" strokeWidth="1.5" strokeDasharray="4,3" />
            <text x="340" y="18" fontSize="9" fill="#BA7517" fontFamily="monospace">early stop</text>
            {/* Bracket */}
            <line x1="270" y1="130" x2="360" y2="130" stroke="#BA7517" strokeWidth="1" />
            <text x="295" y="145" fontSize="8" fill="#BA7517" fontFamily="monospace">patience</text>
          </svg>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 8 }}>
            Train loss keeps falling. Validation loss bottoms out then rises (overfitting begins).
            Early stopping fires after "patience" rounds of no improvement.
            The best model — from the green dot — is restored automatically.
          </p>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OrdinalEncoder
from sklearn.compose import ColumnTransformer
from sklearn.metrics import roc_auc_score
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)

# ── Three-way split: train / val (early stopping) / test (final eval) ─
X_trainval, X_test, y_trainval, y_test = train_test_split(
    df, y, test_size=0.15, stratify=y, random_state=42
)
X_train, X_val, y_train, y_val = train_test_split(
    X_trainval, y_trainval, test_size=0.15, stratify=y_trainval, random_state=42
)

print(f"Train: {len(X_train):,}  Val: {len(X_val):,}  Test: {len(X_test):,}")

# Preprocess
cat_encoder = OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1)
ct = ColumnTransformer([
    ('num', 'passthrough', NUM_COLS),
    ('cat', cat_encoder, CAT_COLS),
])
X_tr_enc  = ct.fit_transform(X_train)
X_val_enc = ct.transform(X_val)
X_te_enc  = ct.transform(X_test)

# ── XGBoost native API — required for early stopping with eval_set ─────
model = xgb.XGBClassifier(
    n_estimators      = 2000,      # set high — early stopping will find optimal
    learning_rate     = 0.05,      # lower lr = more trees needed = better final model
    max_depth         = 4,
    subsample         = 0.8,
    colsample_bytree  = 0.8,
    reg_alpha         = 0.1,
    reg_lambda        = 1.0,
    gamma             = 0.05,
    scale_pos_weight  = (y_train == 0).sum() / (y_train == 1).sum(),
    eval_metric       = 'auc',
    early_stopping_rounds = 50,    # stop if no improvement for 50 rounds
    random_state      = 42,
    verbosity         = 0,
)

model.fit(
    X_tr_enc, y_train,
    eval_set=[(X_tr_enc, y_train), (X_val_enc, y_val)],
    verbose=False,
)

print(f"\nEarly stopping results:")
print(f"  Best iteration:    {model.best_iteration}")
print(f"  Best val AUC:      {model.best_score:.4f}")
print(f"  Trees used:        {model.best_ntree_limit} / 2000")
print(f"  Trees saved:       {2000 - model.best_ntree_limit} iterations skipped")

# Evaluate on test using best_ntree_limit
y_proba_es = model.predict_proba(X_te_enc,
                                  iteration_range=(0, model.best_ntree_limit))[:, 1]
print(f"\nTest AUC (with early stopping): {roc_auc_score(y_test, y_proba_es):.4f}")

# ── Compare: fixed n_estimators vs early stopping ─────────────────────
print("\nFixed n_estimators vs early stopping:")
for n_est in [50, 100, 200, 500, model.best_ntree_limit, 2000]:
    m = xgb.XGBClassifier(
        n_estimators=n_est, learning_rate=0.05, max_depth=4,
        subsample=0.8, colsample_bytree=0.8,
        scale_pos_weight=(y_train==0).sum()/(y_train==1).sum(),
        random_state=42, verbosity=0,
    )
    m.fit(X_tr_enc, y_train)
    auc = roc_auc_score(y_test, m.predict_proba(X_te_enc)[:, 1])
    flag = ' ← early stopping choice' if n_est == model.best_ntree_limit else ''
    print(f"  n_estimators={n_est:<5}: AUC={auc:.4f}{flag}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — HYPERPARAMETER GUIDE ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Parameter reference</span>
        <h2 style={S.h2}>XGBoost parameters — what each one does, in plain English</h2>

        <p style={S.p}>
          XGBoost has dozens of parameters. Most can be left at defaults.
          A handful matter significantly. Here is the complete practical reference —
          grouped by what aspect of training they control.
        </p>

        <VisualBox label="XGBoost parameter guide — grouped by purpose">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                group: 'Boosting control',
                color: '#D85A30',
                params: [
                  { name: 'n_estimators', default: '100', desc: 'Number of trees. Set high, use early stopping to find optimal. 300–3000 is typical.' },
                  { name: 'learning_rate (eta)', default: '0.3', desc: 'Step size shrinkage. Lower = better generalisation but more trees needed. 0.01–0.1 in practice.' },
                  { name: 'max_depth', default: '6', desc: 'Max depth per tree. 3–6 is typical. Deeper = more complex patterns but more overfitting.' },
                ],
              },
              {
                group: 'Sampling (randomisation)',
                color: '#378ADD',
                params: [
                  { name: 'subsample', default: '1.0', desc: 'Row subsampling per tree. 0.7–0.9 adds regularisation. Same concept as sklearn GBM.' },
                  { name: 'colsample_bytree', default: '1.0', desc: 'Column fraction per tree. 0.6–0.9 typical. Like Random Forest feature sampling.' },
                  { name: 'colsample_bylevel', default: '1.0', desc: 'Column fraction per depth level. Additional randomisation on top of colsample_bytree.' },
                ],
              },
              {
                group: 'Regularisation (XGBoost-specific)',
                color: '#1D9E75',
                params: [
                  { name: 'gamma (min_split_loss)', default: '0', desc: 'Minimum loss reduction to make a split. Higher = fewer splits = simpler trees. Try 0–5.' },
                  { name: 'reg_alpha (alpha)', default: '0', desc: 'L1 regularisation on leaf weights. Sparsifies leaves. Try 0–1.' },
                  { name: 'reg_lambda (lambda)', default: '1', desc: 'L2 regularisation on leaf weights. Always active. Reduce to 0.1 if underfitting.' },
                  { name: 'min_child_weight', default: '1', desc: 'Minimum sum of Hessian in a leaf. Higher = more conservative splits. Try 1–10.' },
                ],
              },
              {
                group: 'Class imbalance',
                color: '#BA7517',
                params: [
                  { name: 'scale_pos_weight', default: '1', desc: 'Ratio of negative to positive class. Set to n_negative/n_positive for imbalanced data.' },
                ],
              },
            ].map((group) => (
              <div key={group.group}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: group.color,
                  fontFamily: 'var(--font-mono)', letterSpacing: '0.07em',
                  textTransform: 'uppercase' as const, marginBottom: 8,
                }}>
                  {group.group}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {group.params.map((p) => (
                    <div key={p.name} style={{
                      display: 'grid', gridTemplateColumns: '200px 70px 1fr',
                      gap: 12, background: 'var(--surface)',
                      borderRadius: 6, padding: '8px 12px',
                      border: `1px solid ${group.color}15`,
                      alignItems: 'start',
                    }}>
                      <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: group.color }}>
                        {p.name}
                      </span>
                      <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                        {p.default}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
                        {p.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
import xgboost as xgb
from sklearn.model_selection import RandomizedSearchCV, StratifiedKFold
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OrdinalEncoder
from sklearn.metrics import roc_auc_score
import warnings
warnings.filterwarnings('ignore')

ct = ColumnTransformer([
    ('num', 'passthrough', NUM_COLS),
    ('cat', OrdinalEncoder(handle_unknown='use_encoded_value',
                           unknown_value=-1), CAT_COLS),
])

pipeline = Pipeline([
    ('prep',  ct),
    ('model', xgb.XGBClassifier(
        eval_metric='auc', verbosity=0, random_state=42,
    )),
])

# ── Parameter search space ────────────────────────────────────────────
# Start broad, then narrow around best values in a second search
param_dist = {
    'model__n_estimators':     [200, 300, 500],
    'model__learning_rate':    [0.01, 0.05, 0.1],
    'model__max_depth':        [3, 4, 5, 6],
    'model__subsample':        [0.6, 0.7, 0.8, 0.9],
    'model__colsample_bytree': [0.6, 0.7, 0.8, 0.9, 1.0],
    'model__reg_alpha':        [0, 0.01, 0.1, 0.5, 1.0],
    'model__reg_lambda':       [0.5, 1.0, 2.0, 5.0],
    'model__gamma':            [0, 0.05, 0.1, 0.3, 0.5],
    'model__min_child_weight': [1, 3, 5, 7],
    'model__scale_pos_weight': [(y_tr==0).sum()/(y_tr==1).sum()],
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
search = RandomizedSearchCV(
    pipeline,
    param_dist,
    n_iter=40,
    cv=cv,
    scoring='roc_auc',
    random_state=42,
    n_jobs=-1,
    verbose=0,
)
search.fit(df.loc[X_tr.index], y_tr)

print(f"Best params:")
for k, v in search.best_params_.items():
    print(f"  {k.replace('model__', ''):<22}: {v}")
print(f"\nBest CV AUC: {search.best_score_:.4f}")

best_model = search.best_estimator_
test_auc = roc_auc_score(y_te, best_model.predict_proba(X_te)[:, 1])
print(f"Test AUC:    {test_auc:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — SHAP VALUES ══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Making predictions explainable</span>
        <h2 style={S.h2}>SHAP values — explain any individual prediction in plain English</h2>

        <p style={S.p}>
          Fraud detection at Stripe faces a hard business requirement:
          when a transaction is flagged, the system must be able to explain why.
          "The model said fraud" is not acceptable — not to the compliance team,
          not to the customer disputing the block, not to the RBI audit.
          SHAP (SHapley Additive exPlanations) solves this.
        </p>

        <p style={S.p}>
          SHAP computes the contribution of each feature to a specific prediction.
          For a transaction flagged as fraud with probability 0.87, SHAP might say:
          "merchant_risk contributed +0.31 toward fraud, n_tx_last_hour contributed +0.25,
          user_tenure_days contributed −0.12 toward legitimate."
          These contributions sum to the final log-odds of the prediction.
          Every flagged transaction now has a human-readable explanation.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A bank decides to reject a loan application. Without SHAP:
            "The model rejected it." With SHAP: "Low credit score contributed ₹−8 LPA
            to the effective income estimate. High existing EMI burden contributed
            ₹−5 LPA. Short employment history contributed ₹−3 LPA.
            High income partially offset these: +₹12 LPA."
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            SHAP gives each feature a "blame or credit" score for each individual prediction.
            It is mathematically rigorous — the scores are derived from cooperative game theory
            and have provable fairness properties. This is why regulators accept them.
          </p>
        </AnalogyBox>

        <CodeBlock code={`import numpy as np
import xgboost as xgb
import shap
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OrdinalEncoder
from sklearn.compose import ColumnTransformer
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)

ct = ColumnTransformer([
    ('num', 'passthrough', NUM_COLS),
    ('cat', OrdinalEncoder(handle_unknown='use_encoded_value',
                           unknown_value=-1), CAT_COLS),
])
X_tr_enc = ct.fit_transform(X_tr)
X_te_enc = ct.transform(X_te)
feature_names = NUM_COLS + CAT_COLS

# ── Train final XGBoost model ──────────────────────────────────────────
model = xgb.XGBClassifier(
    n_estimators=300, learning_rate=0.1, max_depth=4,
    subsample=0.8, colsample_bytree=0.8,
    reg_alpha=0.1, reg_lambda=1.0,
    scale_pos_weight=(y_tr==0).sum()/(y_tr==1).sum(),
    eval_metric='auc', random_state=42, verbosity=0,
)
model.fit(X_tr_enc, y_tr)

# ── SHAP values — explain the model ───────────────────────────────────
# TreeExplainer is optimised for tree-based models (XGBoost, LightGBM, RF)
explainer   = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_te_enc)
# shap_values shape: (n_samples, n_features)
# shap_values[i, j] = contribution of feature j to prediction for sample i

# ── Global feature importance (mean |SHAP|) ────────────────────────────
mean_shap = np.abs(shap_values).mean(axis=0)
importance = sorted(zip(feature_names, mean_shap), key=lambda x: x[1], reverse=True)

print("Global feature importance (mean |SHAP|):")
for feat, shap_imp in importance:
    bar = '█' * int(shap_imp * 200)
    print(f"  {feat:<22}: {bar} {shap_imp:.4f}")

# ── Explain one specific prediction ────────────────────────────────────
# Find a flagged fraud transaction
fraud_indices = np.where(model.predict(X_te_enc) == 1)[0]
sample_idx    = fraud_indices[0]

sample        = X_te_enc[sample_idx:sample_idx+1]
pred_proba    = model.predict_proba(sample)[0, 1]
shap_sample   = shap_values[sample_idx]

print(f"\nExplanation for transaction {sample_idx}:")
print(f"  Predicted fraud probability: {pred_proba:.3f}")
print(f"  Base rate (expected value):  {explainer.expected_value:.3f}")
print(f"\n  Feature contributions (SHAP):")
print(f"  {'Feature':<22} {'Value':>12} {'SHAP contribution':>20}")
print("  " + "─" * 56)

contribs = sorted(
    zip(feature_names, X_te_enc[sample_idx], shap_sample),
    key=lambda x: abs(x[2]), reverse=True,
)
for feat, val, shap_val in contribs:
    direction = "→ fraud" if shap_val > 0 else "→ legit"
    bar_len   = int(abs(shap_val) * 40)
    bar       = ('▸' * bar_len) if shap_val > 0 else ('◂' * bar_len)
    color_tag = '+' if shap_val > 0 else '-'
    print(f"  {feat:<22} {val:>12.2f}   {color_tag}{bar} {shap_val:+.4f} {direction}")

# ── SHAP interaction — which feature pairs interact most? ──────────────
# interaction_values[i, j, k] = SHAP interaction value between features j and k
# for sample i. Expensive to compute — use a small subset
shap_interact = explainer.shap_interaction_values(X_te_enc[:100])
interaction_matrix = np.abs(shap_interact).mean(axis=0)
np.fill_diagonal(interaction_matrix, 0)

print("\nTop 5 feature interactions (mean |SHAP interaction|):")
flat = [(i, j, interaction_matrix[i, j])
        for i in range(len(feature_names))
        for j in range(i+1, len(feature_names))]
flat.sort(key=lambda x: x[2], reverse=True)
for i, j, val in flat[:5]:
    print(f"  {feature_names[i]:<20} × {feature_names[j]:<20}: {val:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — FULL PRODUCTION PIPELINE ═══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What this looks like at work</span>
        <h2 style={S.h2}>Complete production fraud detection pipeline — end to end</h2>

        <CodeBlock code={`import numpy as np
import pandas as pd
import xgboost as xgb
import shap
import joblib
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OrdinalEncoder
from sklearn.model_selection import (StratifiedKFold, cross_validate,
                                      train_test_split)
from sklearn.metrics import (roc_auc_score, average_precision_score,
                               classification_report)
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)

# ── Three-way split ────────────────────────────────────────────────────
X_trainval, X_test, y_trainval, y_test = train_test_split(
    df, y, test_size=0.15, stratify=y, random_state=42
)
X_train, X_val, y_train, y_val = train_test_split(
    X_trainval, y_trainval, test_size=0.15,
    stratify=y_trainval, random_state=42
)

ct = ColumnTransformer([
    ('num', 'passthrough', NUM_COLS),
    ('cat', OrdinalEncoder(handle_unknown='use_encoded_value',
                           unknown_value=-1), CAT_COLS),
])

# ── Pipeline with early stopping ─────────────────────────────────────
# Note: early stopping requires using fit_params to pass eval_set
# With Pipeline, we need to use the step name prefix
ct.fit(X_train)
X_tr_enc  = ct.transform(X_train)
X_val_enc = ct.transform(X_val)
X_te_enc  = ct.transform(X_test)

model = xgb.XGBClassifier(
    n_estimators          = 2000,
    learning_rate         = 0.05,
    max_depth             = 4,
    subsample             = 0.8,
    colsample_bytree      = 0.8,
    reg_alpha             = 0.1,
    reg_lambda            = 1.0,
    gamma                 = 0.05,
    min_child_weight      = 3,
    scale_pos_weight      = (y_train==0).sum()/(y_train==1).sum(),
    early_stopping_rounds = 50,
    eval_metric           = 'auc',
    random_state          = 42,
    verbosity             = 0,
)

model.fit(
    X_tr_enc, y_train,
    eval_set=[(X_val_enc, y_val)],
    verbose=False,
)

print(f"Best iteration: {model.best_iteration}")
print(f"Best val AUC:   {model.best_score:.4f}")

# ── Threshold tuning ──────────────────────────────────────────────────
# 0.5 is almost never the optimal threshold for fraud detection
# Fraud teams care about recall (catching fraud) vs precision (false alarms)
val_proba = model.predict_proba(X_val_enc,
    iteration_range=(0, model.best_ntree_limit))[:, 1]

print("\nThreshold analysis on validation set:")
print(f"{'Threshold':<12} {'Precision':<12} {'Recall':<10} {'F1':<10} {'Flagged %'}")
print("─" * 55)
from sklearn.metrics import f1_score, precision_score, recall_score

best_thresh, best_f1 = 0.5, 0.0
for t in np.arange(0.1, 0.9, 0.05):
    pred_t = (val_proba >= t).astype(int)
    prec   = precision_score(y_val, pred_t, zero_division=0)
    rec    = recall_score(y_val, pred_t, zero_division=0)
    f1     = f1_score(y_val, pred_t, zero_division=0)
    flag   = (pred_t == 1).mean() * 100
    if f1 > best_f1:
        best_f1, best_thresh = f1, t
    print(f"  {t:.2f}        {prec:.4f}      {rec:.4f}    {f1:.4f}    {flag:.1f}%")

print(f"\nOptimal threshold: {best_thresh:.2f}  (F1={best_f1:.4f})")

# ── Final test evaluation ─────────────────────────────────────────────
test_proba = model.predict_proba(X_te_enc,
    iteration_range=(0, model.best_ntree_limit))[:, 1]
test_pred  = (test_proba >= best_thresh).astype(int)

print(f"\nFinal test evaluation (threshold={best_thresh:.2f}):")
print(f"  ROC-AUC:        {roc_auc_score(y_test, test_proba):.4f}")
print(f"  Avg Precision:  {average_precision_score(y_test, test_proba):.4f}")
print(classification_report(y_test, test_pred, target_names=['Legit', 'Fraud']))

# ── Save everything needed for production ─────────────────────────────
production_bundle = {
    'preprocessor': ct,
    'model':        model,
    'threshold':    best_thresh,
    'best_ntree':   model.best_ntree_limit,
    'feature_names': NUM_COLS + CAT_COLS,
    'version':      'v1.0',
}
joblib.dump(production_bundle, '/tmp/razorpay_fraud_xgb.pkl')
print("Production bundle saved: /tmp/razorpay_fraud_xgb.pkl")

# ── Production inference ───────────────────────────────────────────────
bundle = joblib.load('/tmp/razorpay_fraud_xgb.pkl')
new_tx = pd.DataFrame([{
    'amount': 15000, 'hour_of_day': 2, 'day_of_week': 6,
    'merchant_risk': 0.85, 'device_age_days': 3, 'n_tx_last_hour': 12,
    'user_tenure_days': 5, 'is_new_device': 1,
    'payment_method': 'upi', 'merchant_type': 'gaming',
}])
X_new_enc = bundle['preprocessor'].transform(new_tx)
prob      = bundle['model'].predict_proba(X_new_enc,
    iteration_range=(0, bundle['best_ntree']))[:, 1][0]
decision  = "BLOCK" if prob >= bundle['threshold'] else "ALLOW"
print(f"\nTransaction decision: {decision}  (P(fraud)={prob:.3f})")`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common XGBoost error — explained and fixed</h2>

        <ErrorBlock
          error="XGBoostError: feature_names mismatch — training has 10 features but new data has 8"
          cause="XGBoost stores the feature names seen during training. If you rename a column, drop a feature, or reorder columns between training and inference, XGBoost raises this error. Also happens when you use pd.get_dummies() which produces different columns on train and test if categories differ."
          fix="Always store the full preprocessing pipeline and use it consistently. Wrap the encoder in a Pipeline or save the ColumnTransformer alongside the model. At inference time, pass data through the same transformer before calling predict. Never use pd.get_dummies in production — use OrdinalEncoder or OneHotEncoder which remember the fitted categories."
        />

        <ErrorBlock
          error="Early stopping raises ValueError: eval_set must be passed to fit() when using early_stopping_rounds"
          cause="You set early_stopping_rounds in the constructor but forgot to pass eval_set= in the fit() call. XGBoost needs a validation set to monitor — without it, there is nothing to check for improvement and training cannot stop early."
          fix="Always pass eval_set when using early stopping: model.fit(X_train, y_train, eval_set=[(X_val, y_val)]). The eval_set must be a list of tuples. If using a Pipeline, you need to bypass it for early stopping — preprocess X_val separately, then pass eval_set with the preprocessed arrays directly to the XGBoost step."
        />

        <ErrorBlock
          error="SHAP values do not sum to the predicted probability — shap sum ≠ model output"
          cause="SHAP values for classifiers sum to the log-odds of the prediction, not the probability. The expected_value from TreeExplainer is also in log-odds space. Converting log-odds to probabilities via sigmoid gives a different number than the direct predict_proba output if the model applies additional calibration or if you sum the raw SHAP values and expect probability scale."
          fix="Use shap.TreeExplainer(model, model_output='probability') to get SHAP values in probability space directly. Or sum SHAP values and expected_value to get log-odds, then apply sigmoid: probability = 1/(1+exp(-(expected_value + sum(shap_values)))). For display purposes, always clarify whether you are showing probability-scale or log-odds-scale SHAP."
        />

        <ErrorBlock
          error="XGBoost gives identical results regardless of subsample or colsample_bytree values"
          cause="You forgot to set a random seed or the data is too small for subsampling to make a difference. With very small datasets, drawing 80% vs 100% of 50 samples produces nearly identical trees. Also occurs if n_estimators is very small — with only 10 trees the variance from subsampling is not yet visible."
          fix="Set random_state in the constructor and verify it is being used. Use at least n_estimators=100 to see the effect of subsampling. Check that your dataset has at least 1,000 samples. To verify subsampling is working: train twice with the same seed — results should be identical. Train with different seeds — results should differ."
        />
      </div>

      <Div />

      {/* ══ SECTION 9 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          XGBoost is mastered. LightGBM takes the same ideas and makes them faster.
        </h2>

        <p style={S.p}>
          XGBoost and LightGBM implement the same gradient boosting algorithm.
          The difference is in the engineering: LightGBM uses leaf-wise tree growth
          (instead of level-wise), Gradient-based One-Side Sampling (GOSS)
          to skip uninformative training samples, and Exclusive Feature Bundling (EFB)
          to compress sparse features. The result trains 10–20× faster on large datasets
          with equal or better accuracy. On datasets above 100,000 rows,
          LightGBM is almost always the right choice over XGBoost.
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
              textTransform: 'uppercase' as const, color: '#D85A30',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Module 31 · Classical ML
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              LightGBM — Fast Gradient Boosting at Scale
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Leaf-wise growth, histogram-based splitting, and why LightGBM
              trains 10× faster than XGBoost on large datasets.
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
          'XGBoost adds three improvements over vanilla gradient boosting: second-order gradients (Newton step) for better tree construction, L1/L2 regularisation on leaf weights (alpha, lambda, gamma), and column subsampling (colsample_bytree) for decorrelated trees.',
          'Always use early stopping. Set n_estimators high (1000–3000), pass a validation set via eval_set=, and set early_stopping_rounds=50. XGBoost stops when val AUC stops improving and restores the best model automatically.',
          'The key regularisation parameters in order of importance: max_depth (keep at 3–5), subsample + colsample_bytree (0.7–0.9 each), gamma (min split gain, try 0–0.5), min_child_weight (try 1–10), reg_alpha and reg_lambda. Tune with RandomizedSearchCV.',
          'scale_pos_weight = n_negative/n_positive handles class imbalance. For fraud detection where 2% of transactions are fraud, scale_pos_weight = 49 tells XGBoost to weight fraud examples 49× more.',
          'SHAP values explain any individual prediction by computing each feature\'s contribution to the log-odds. They are the industry standard for model explainability in regulated industries (banking, insurance, healthcare).',
          'The optimal classification threshold is almost never 0.5. For fraud detection, tune the threshold on a validation set to balance precision (false alarm rate) and recall (fraud catch rate) according to the business cost of each type of error.',
        ]}
      />
    </LearnLayout>
  )
}