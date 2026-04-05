import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Model Interpretability — SHAP and LIME — Chaduvuko',
  description:
    'Explain any individual prediction. Global feature importance, local SHAP explanations, LIME for black-box models, and presenting model decisions to regulators.',
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

function ConceptBox({ title, children, color = '#1D9E75' }: {
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

export default function ModelInterpretabilityPage() {
  return (
    <LearnLayout
      title="Model Interpretability — SHAP and LIME"
      description="Explain any individual prediction. Global feature importance, local SHAP explanations, LIME for black-box models, and presenting model decisions to regulators."
      section="Model Evaluation"
      readTime="35–40 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="evaluation" topic="model-interpretability" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — why interpretability matters</span>
        <h2 style={S.h2}>
          Your loan rejection model has AUC = 0.94.
          The customer calls asking why their loan was rejected.
          "The model said so" is not a legal answer in India.
        </h2>

        <p style={S.p}>
          RBI's guidelines on algorithmic lending require that credit decisions
          be explainable to applicants. SEBI requires explanation of algorithmic
          trading decisions. Healthcare regulations require that diagnostic AI
          justify its conclusions. The EU AI Act mandates explanations for
          high-risk AI systems. Interpretability is not optional in regulated industries —
          it is a legal requirement.
        </p>

        <p style={S.p}>
          But even outside regulation, interpretability matters for trust.
          A data scientist at CRED who cannot explain why the model rejected
          a specific applicant cannot debug the model when it makes systematic
          errors. Cannot detect bias. Cannot improve it. The model is a black box
          that produces outputs nobody understands — including the people responsible for it.
        </p>

        <p style={S.p}>
          This module covers two complementary techniques.
          <strong style={{ color: '#1D9E75' }}> SHAP</strong> (SHapley Additive exPlanations)
          computes the exact contribution of each feature to each prediction
          using game theory — it is mathematically rigorous and model-agnostic.
          <strong style={{ color: '#378ADD' }}> LIME</strong> (Local Interpretable
          Model-agnostic Explanations) fits a simple interpretable model
          in the local neighbourhood of a prediction — faster and more flexible
          but less rigorous. Together they cover the full range of
          interpretability needs in production.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A cricket team wins a match. How much credit does each player deserve?
            You cannot just look at the final score — you need to figure out
            each player's contribution. SHAP uses Shapley values from cooperative
            game theory: simulate all possible team subsets, measure how much
            the score changes when each player joins. Average across all subsets.
            That average is each player's fair credit.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            SHAP does the same for model features. Simulate all possible feature
            subsets, measure how much the prediction changes when each feature
            is added. Average across all subsets. That average is each feature's
            fair contribution to this specific prediction.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          SHAP requires <span style={S.code as React.CSSProperties}>pip install shap</span>.
          LIME requires <span style={S.code as React.CSSProperties}>pip install lime</span>.
          SHAP's TreeExplainer works directly on tree models (XGBoost, LightGBM,
          Random Forest) with exact computation in polynomial time.
          For other model types use KernelExplainer — slower but universal.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — FEATURE IMPORTANCE TYPES ═══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Three types of feature importance</span>
        <h2 style={S.h2}>Built-in, permutation, and SHAP — what each measures and when each misleads</h2>

        <p style={S.p}>
          Before SHAP, there were two common approaches to feature importance.
          Both have significant limitations that SHAP fixes.
          Understanding why they fail makes SHAP's value obvious.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              name: 'Built-in importance (split-based)',
              color: '#D85A30',
              how: 'Counts how many times each feature is used to split nodes, weighted by the improvement in the split criterion. Available in sklearn, XGBoost, LightGBM via .feature_importances_.',
              flaw: 'Heavily biased toward high-cardinality features. A feature with 1,000 unique values will be used in more splits than a binary feature even if both have equal predictive power. Tells you about the model structure, not about the data.',
              use: 'Quick sanity check only. Never use for regulatory reporting.',
            },
            {
              name: 'Permutation importance',
              color: '#BA7517',
              how: 'For each feature, randomly shuffle its values and measure how much the model performance drops. A large drop = the feature is important. No drop = the model ignores it. Available via sklearn.inspection.permutation_importance.',
              flaw: 'When two features are correlated (e.g. income and loan_amount), shuffling one breaks the correlation — the model appears to rely less on each than it actually does. Correlated features share importance between them rather than reflecting true individual contributions.',
              use: 'Better than split-based for final model analysis. But misleads on correlated features.',
            },
            {
              name: 'SHAP values',
              color: '#1D9E75',
              how: 'Computes the exact marginal contribution of each feature to each individual prediction using Shapley values from cooperative game theory. Mathematically proven to be the only attribution method satisfying four key fairness axioms.',
              flaw: 'Slower than built-in importance. KernelExplainer is very slow on large datasets. TreeExplainer is fast but tree-model-only.',
              use: 'Use for all production reporting, regulatory compliance, and debugging. The gold standard.',
            },
          ].map((item) => (
            <div key={item.name} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '13px 16px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 8 }}>
                {item.name}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 3 }}>HOW</div>
                  <p style={{ ...S.ps, marginBottom: 0 }}>{item.how}</p>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#ff4757', fontFamily: 'var(--font-mono)', marginBottom: 3 }}>FLAW</div>
                  <p style={{ ...S.ps, marginBottom: 6 }}>{item.flaw}</p>
                  <div style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 3 }}>USE WHEN</div>
                  <p style={{ ...S.ps, marginBottom: 0 }}>{item.use}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.inspection import permutation_importance
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 3000

# CRED loan default dataset
income        = np.abs(np.random.normal(50_000, 30_000, n)).clip(8_000, 500_000)
existing_emis = np.abs(np.random.normal(8_000, 6_000, n)).clip(0, 80_000)
credit_score  = np.abs(np.random.normal(680, 80, n)).clip(300, 900)
employment_yr = np.abs(np.random.normal(4, 3, n)).clip(0, 30)
loan_amount   = np.abs(np.random.normal(200_000, 150_000, n)).clip(10_000, 2_000_000)
# Correlated feature — income_monthly is just income/12
income_monthly = income / 12 + np.random.normal(0, 100, n)

default_score = (
    -(credit_score-680)/80*0.40 + (existing_emis/income)*0.30
    + (loan_amount/income/12)*0.20 - employment_yr/30*0.10
    + np.random.randn(n)*0.15
)
y = (default_score > 0.3).astype(int)

feat_names = ['income','existing_emis','credit_score',
              'employment_yr','loan_amount','income_monthly']
X = np.column_stack([income, existing_emis, credit_score,
                     employment_yr, loan_amount, income_monthly])

X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)
sc = StandardScaler()
X_tr_sc = sc.fit_transform(X_tr)
X_te_sc = sc.transform(X_te)

model = GradientBoostingClassifier(n_estimators=200, learning_rate=0.1,
                                    max_depth=3, random_state=42)
model.fit(X_tr_sc, y_tr)

# ── Method 1: Built-in split-based importance ──────────────────────────
builtin_imp = model.feature_importances_
print("Built-in importance (split-based):")
for name, imp in sorted(zip(feat_names, builtin_imp),
                         key=lambda x: x[1], reverse=True):
    bar = '█' * int(imp * 60)
    print(f"  {name:<18}: {bar:<30} {imp:.4f}")

# ── Method 2: Permutation importance ──────────────────────────────────
perm_imp = permutation_importance(model, X_te_sc, y_te,
                                   n_repeats=20, random_state=42,
                                   scoring='roc_auc')
print("\nPermutation importance (AUC drop):")
for name, mean, std in sorted(
    zip(feat_names, perm_imp.importances_mean, perm_imp.importances_std),
    key=lambda x: x[1], reverse=True,
):
    bar = '█' * int(mean * 200)
    print(f"  {name:<18}: {bar:<30} {mean:.4f} ± {std:.4f}")

print("\nNote: income_monthly (correlated with income) gets split importance")
print("shared between them — permutation underestimates both individually.")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — SHAP IN DEPTH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The gold standard for interpretability</span>
        <h2 style={S.h2}>SHAP values — from global importance to individual explanations</h2>

        <p style={S.p}>
          SHAP computes two levels of explanation simultaneously.
          <strong style={{ color: '#1D9E75' }}> Global SHAP importance</strong>
          (mean |SHAP| across all predictions) tells you which features
          matter most for the model overall — comparable to feature importance
          but more reliable.
          <strong style={{ color: '#1D9E75' }}> Local SHAP values</strong>
          explain one specific prediction — which features pushed this particular
          applicant's default probability up or down, and by how much.
        </p>

        <ConceptBox title="SHAP's four fairness axioms — why it is the only correct attribution">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                axiom: 'Efficiency',
                desc: 'SHAP values sum exactly to the prediction minus the base rate. Every unit of prediction is fully explained — nothing is unaccounted for.',
              },
              {
                axiom: 'Symmetry',
                desc: 'Two features that contribute identically to the model must receive identical SHAP values. No feature gets unfair credit.',
              },
              {
                axiom: 'Dummy',
                desc: 'A feature that never changes any prediction receives SHAP value zero. Unused features cannot be blamed.',
              },
              {
                axiom: 'Additivity',
                desc: 'SHAP values for an ensemble model equal the sum of SHAP values for each individual model. Explanations compose naturally.',
              },
            ].map((row) => (
              <div key={row.axiom} style={{
                display: 'flex', gap: 12, background: 'var(--bg2)',
                borderRadius: 5, padding: '8px 12px',
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)', minWidth: 90 }}>
                  {row.axiom}
                </span>
                <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{row.desc}</span>
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 10 }}>
            Shapley proved in 1951 that there exists exactly one attribution
            satisfying all four axioms. SHAP implements that attribution.
            No other feature importance method satisfies all four simultaneously.
          </p>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
import shap
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OrdinalEncoder
from sklearn.compose import ColumnTransformer
import pandas as pd
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 5000

df = pd.DataFrame({
    'annual_income':    np.abs(np.random.normal(50_000, 30_000, n)).clip(8_000, 500_000),
    'existing_emis':   np.abs(np.random.normal(8_000, 6_000, n)).clip(0, 80_000),
    'credit_score':    np.abs(np.random.normal(680, 80, n)).clip(300, 900).astype(int),
    'employment_yrs':  np.abs(np.random.normal(4, 3, n)).clip(0, 30).round(1),
    'loan_amount':     np.abs(np.random.normal(200_000, 150_000, n)).clip(10_000, 2_000_000),
    'n_existing_loans':np.random.randint(0, 6, n).astype(float),
    'city_tier':       np.random.choice(['tier1','tier2','tier3'], n),
    'loan_type':       np.random.choice(['personal','home','auto','education'], n),
})
default_score = (
    -(df['credit_score']-680)/80*0.40
    + (df['existing_emis']/df['annual_income'])*0.30
    + (df['loan_amount']/df['annual_income']/12)*0.20
    - df['employment_yrs']/30*0.10
    + np.random.randn(n)*0.15
)
y = (default_score > 0.3).astype(int)

NUM = ['annual_income','existing_emis','credit_score',
       'employment_yrs','loan_amount','n_existing_loans']
CAT = ['city_tier','loan_type']
feat_names = NUM + CAT

ct = ColumnTransformer([
    ('num','passthrough',NUM),
    ('cat',OrdinalEncoder(handle_unknown='use_encoded_value',
                          unknown_value=-1),CAT),
])
X_tr, X_te, y_tr, y_te = train_test_split(df, y, test_size=0.2,
                                            stratify=y, random_state=42)
X_tr_enc = ct.fit_transform(X_tr)
X_te_enc = ct.transform(X_te)

model = xgb.XGBClassifier(n_estimators=200, learning_rate=0.1, max_depth=4,
                            subsample=0.8, colsample_bytree=0.8,
                            scale_pos_weight=(y_tr==0).sum()/(y_tr==1).sum(),
                            eval_metric='auc', verbosity=0, random_state=42)
model.fit(X_tr_enc, y_tr)

# ── SHAP TreeExplainer — exact computation for tree models ─────────────
explainer   = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_te_enc)
# shap_values: (n_samples, n_features)
# shap_values[i, j] = contribution of feature j to prediction for sample i

# ── Global importance: mean |SHAP| ─────────────────────────────────────
mean_abs_shap = np.abs(shap_values).mean(axis=0)
global_imp    = sorted(zip(feat_names, mean_abs_shap),
                        key=lambda x: x[1], reverse=True)

print("Global SHAP importance (mean |SHAP|):")
for feat, imp in global_imp:
    bar = '█' * int(imp * 150)
    print(f"  {feat:<20}: {bar:<30} {imp:.4f}")

# ── Local explanation for one rejected applicant ───────────────────────
# Find a high-risk prediction
fraud_idx  = np.where(model.predict_proba(X_te_enc)[:,1] > 0.75)[0]
sample_idx = fraud_idx[0]

pred_prob  = model.predict_proba(X_te_enc[sample_idx:sample_idx+1])[0, 1]
base_value = explainer.expected_value

print(f"\nLocal explanation — Applicant {sample_idx}:")
print(f"  Base rate (expected value): {base_value:.3f}")
print(f"  Predicted default prob:     {pred_prob:.3f}")
print(f"  Difference explained:       {pred_prob - base_value:+.3f}")
print()
print(f"  {'Feature':<22} {'Value':>12} {'SHAP':>10} {'Direction'}")
print("  " + "─" * 58)

sample_shap = shap_values[sample_idx]
sample_vals = X_te_enc[sample_idx]
contribs    = sorted(zip(feat_names, sample_vals, sample_shap),
                     key=lambda x: abs(x[2]), reverse=True)

for feat, val, sv in contribs:
    direction = '↑ increases default risk' if sv > 0 else '↓ reduces default risk'
    bar_len   = int(abs(sv) * 60)
    bar       = ('▸' * bar_len) if sv > 0 else ('◂' * bar_len)
    print(f"  {feat:<22} {val:>12.1f}  {sv:>+8.4f}  {bar} {direction}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — SHAP FOR ALL MODEL TYPES ═══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>SHAP beyond tree models</span>
        <h2 style={S.h2}>Three SHAP explainers — which one to use for which model</h2>

        <p style={S.p}>
          SHAP has different explainers optimised for different model types.
          TreeExplainer is exact and fast for tree models.
          LinearExplainer is exact for linear models.
          KernelExplainer works for any model but is slow.
          DeepExplainer works for neural networks.
        </p>

        <VisualBox label="SHAP explainer selection guide">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '180px 200px 1fr 120px',
              background: 'var(--surface)', borderBottom: '1px solid var(--border)',
              padding: '8px 12px', gap: 12,
            }}>
              {['Explainer', 'Models', 'How it works', 'Speed'].map(h => (
                <span key={h} style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{h}</span>
              ))}
            </div>
            {[
              {
                name: 'TreeExplainer',
                color: '#1D9E75',
                models: 'XGBoost, LightGBM, Random Forest, sklearn trees',
                how: 'Exact SHAP values using the tree structure. Polynomial time.',
                speed: 'Fast ✓✓✓',
              },
              {
                name: 'LinearExplainer',
                color: '#378ADD',
                models: 'Linear/Logistic Regression, Ridge, Lasso, ElasticNet',
                how: 'Exact SHAP using model coefficients × feature deviations from mean.',
                speed: 'Fastest ✓✓✓✓',
              },
              {
                name: 'KernelExplainer',
                color: '#BA7517',
                models: 'Any model with predict_proba() — SVM, KNN, neural nets',
                how: 'Approximates SHAP by sampling feature coalitions. Model-agnostic.',
                speed: 'Slow ✓',
              },
              {
                name: 'DeepExplainer',
                color: '#D85A30',
                models: 'PyTorch and TensorFlow neural networks',
                how: 'DeepLIFT-based exact SHAP for deep learning. Fast for neural nets.',
                speed: 'Medium ✓✓',
              },
            ].map((item, i) => (
              <div key={item.name} style={{
                display: 'grid', gridTemplateColumns: '180px 200px 1fr 120px',
                padding: '10px 12px', gap: 12,
                background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
                borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
                alignItems: 'start',
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>
                  {item.name}
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.models}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.how}</span>
                <span style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.speed}</span>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
import shap
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 2000

income        = np.abs(np.random.normal(50_000,30_000,n)).clip(8_000,500_000)
existing_emis = np.abs(np.random.normal(8_000,6_000,n)).clip(0,80_000)
credit_score  = np.abs(np.random.normal(680,80,n)).clip(300,900)
employment_yr = np.abs(np.random.normal(4,3,n)).clip(0,30)
loan_amount   = np.abs(np.random.normal(200_000,150_000,n)).clip(10_000,2_000_000)
default_score = (
    -(credit_score-680)/80*0.40 + (existing_emis/income)*0.30
    + (loan_amount/income/12)*0.20 - employment_yr/30*0.10
    + np.random.randn(n)*0.15
)
y = (default_score > 0.3).astype(int)
feat_names = ['income','existing_emis','credit_score','employment_yr','loan_amount']
X = np.column_stack([income, existing_emis, credit_score, employment_yr, loan_amount])

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2,
                                            stratify=y, random_state=42)
sc       = StandardScaler()
X_tr_sc  = sc.fit_transform(X_tr)
X_te_sc  = sc.transform(X_te)
X_bg     = shap.sample(X_tr_sc, 100)   # background dataset for KernelExplainer

models_and_explainers = {
    'LogisticRegression': (
        LogisticRegression(max_iter=1000, random_state=42),
        'linear',
    ),
    'GradientBoosting': (
        GradientBoostingClassifier(n_estimators=100, random_state=42),
        'tree',
    ),
    'SVC (black-box)': (
        SVC(probability=True, random_state=42),
        'kernel',
    ),
}

print("SHAP values across model types (top 3 features by |SHAP|):\n")
for name, (model, explainer_type) in models_and_explainers.items():
    model.fit(X_tr_sc, y_tr)

    if explainer_type == 'linear':
        explainer   = shap.LinearExplainer(model, X_tr_sc)
        shap_vals   = explainer.shap_values(X_te_sc[:200])
    elif explainer_type == 'tree':
        explainer   = shap.TreeExplainer(model)
        shap_vals   = explainer.shap_values(X_te_sc[:200])
    else:
        # KernelExplainer — slow, use small sample
        explainer   = shap.KernelExplainer(model.predict_proba, X_bg)
        shap_vals   = explainer.shap_values(X_te_sc[:50])[1]  # class 1

    # Handle multi-output (some explainers return list for binary)
    if isinstance(shap_vals, list):
        shap_vals = shap_vals[1]

    mean_abs = np.abs(shap_vals).mean(axis=0)
    ranked   = sorted(zip(feat_names, mean_abs), key=lambda x: x[1], reverse=True)

    print(f"  {name}:")
    for feat, imp in ranked[:3]:
        bar = '█' * int(imp * 100)
        print(f"    {feat:<18}: {bar:<20} {imp:.4f}")
    print()`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — LIME ════════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The alternative approach</span>
        <h2 style={S.h2}>LIME — explain any prediction by fitting a local simple model</h2>

        <p style={S.p}>
          LIME takes a fundamentally different approach to SHAP.
          Instead of computing exact Shapley values, it asks:
          what simple model (linear regression or decision tree)
          best approximates the complex model's behaviour
          in the immediate neighbourhood of this prediction?
          That simple model's coefficients are the explanation.
        </p>

        <p style={S.p}>
          LIME generates synthetic samples near the prediction point,
          gets the complex model's predictions for all of them,
          then fits a weighted linear model where samples closer to
          the original point are weighted more heavily.
          The linear model's coefficients tell you which features
          pushed the prediction up or down locally.
        </p>

        <ConceptBox title="SHAP vs LIME — when to use each" color="#378ADD">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              {
                tool: 'SHAP',
                color: '#1D9E75',
                pros: ['Mathematically exact — satisfies 4 fairness axioms', 'Global + local explanations from same framework', 'Fast for tree models (TreeExplainer)', 'Consistent — same feature always gets same contribution'],
                cons: ['Slow for non-tree models (KernelExplainer)', 'Requires access to training data for some explainers', 'Harder to explain to non-technical stakeholders'],
              },
              {
                tool: 'LIME',
                color: '#378ADD',
                pros: ['Works on any model including image and text classifiers', 'Intuitive — "here is a simple rule that explains this prediction"', 'Faster than KernelSHAP for non-tree models', 'Easy to understand explanations for non-technical audiences'],
                cons: ['Approximate — different runs give slightly different explanations', 'Local only — no global importance from LIME directly', 'Unstable on high-dimensional data or small neighbourhoods'],
              },
            ].map((item) => (
              <div key={item.tool} style={{
                background: 'var(--bg2)', borderRadius: 7, padding: '12px 14px',
                border: `1px solid ${item.color}20`,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                  {item.tool}
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>PROS</div>
                {item.pros.map((p, i) => (
                  <div key={i} style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>✓ {p}</div>
                ))}
                <div style={{ fontSize: 10, fontWeight: 700, color: '#ff4757', fontFamily: 'var(--font-mono)', marginBottom: 4, marginTop: 8 }}>CONS</div>
                {item.cons.map((c, i) => (
                  <div key={i} style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>✗ {c}</div>
                ))}
              </div>
            ))}
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
import lime
import lime.lime_tabular
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 3000

income        = np.abs(np.random.normal(50_000,30_000,n)).clip(8_000,500_000)
existing_emis = np.abs(np.random.normal(8_000,6_000,n)).clip(0,80_000)
credit_score  = np.abs(np.random.normal(680,80,n)).clip(300,900)
employment_yr = np.abs(np.random.normal(4,3,n)).clip(0,30)
loan_amount   = np.abs(np.random.normal(200_000,150_000,n)).clip(10_000,2_000_000)
default_score = (
    -(credit_score-680)/80*0.40 + (existing_emis/income)*0.30
    + (loan_amount/income/12)*0.20 - employment_yr/30*0.10
    + np.random.randn(n)*0.15
)
y = (default_score > 0.3).astype(int)
feat_names = ['income','existing_emis','credit_score','employment_yr','loan_amount']
X = np.column_stack([income, existing_emis, credit_score, employment_yr, loan_amount])

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2,
                                            stratify=y, random_state=42)
sc      = StandardScaler()
X_tr_sc = sc.fit_transform(X_tr)
X_te_sc = sc.transform(X_te)

model = GradientBoostingClassifier(n_estimators=200, learning_rate=0.1,
                                    max_depth=3, random_state=42)
model.fit(X_tr_sc, y_tr)

# ── Create LIME explainer ─────────────────────────────────────────────
explainer = lime.lime_tabular.LimeTabularExplainer(
    X_tr_sc,
    feature_names=feat_names,
    class_names=['No Default', 'Default'],
    mode='classification',
    discretize_continuous=True,   # converts to ranges e.g. "income <= 25000"
)

# ── Explain a high-risk applicant ─────────────────────────────────────
high_risk_idx = np.where(model.predict_proba(X_te_sc)[:,1] > 0.75)[0][0]
sample        = X_te_sc[high_risk_idx]
pred_prob     = model.predict_proba(sample.reshape(1,-1))[0, 1]

explanation = explainer.explain_instance(
    sample,
    model.predict_proba,
    num_features=5,        # show top 5 contributing features
    num_samples=1000,      # synthetic samples in neighbourhood
    labels=(1,),           # explain class 1 (default)
)

print(f"LIME explanation for Applicant {high_risk_idx}:")
print(f"  Model prediction: P(default) = {pred_prob:.3f}")
print()
print(f"  Top feature contributions (LIME local linear coefficients):")
print(f"  {'Feature rule':<35} {'LIME weight':>12} {'Direction'}")
print("  " + "─" * 62)

for feat_rule, weight in explanation.as_list(label=1):
    direction = '↑ increases default risk' if weight > 0 else '↓ reduces default risk'
    bar_len   = int(abs(weight) * 40)
    bar       = ('▸' * bar_len) if weight > 0 else ('◂' * bar_len)
    print(f"  {feat_rule:<35}  {weight:>+10.4f}  {bar}")

# ── Compare SHAP vs LIME rankings ─────────────────────────────────────
import shap
shap_exp  = shap.TreeExplainer(model)
shap_vals = shap_exp.shap_values(sample.reshape(1,-1))[0]

print(f"\nSHAP vs LIME feature ranking comparison:")
print(f"  {'Feature':<20} {'SHAP':>10} {'LIME rank':>10}")
print("  " + "─" * 44)

lime_feats = [rule.split(' ')[0] for rule, _ in explanation.as_list(label=1)]
for feat, sv in sorted(zip(feat_names, shap_vals),
                        key=lambda x: abs(x[1]), reverse=True):
    lime_rank = next((i+1 for i, f in enumerate(lime_feats) if feat in f), 'N/A')
    print(f"  {feat:<20}  {sv:>+10.4f}  {str(lime_rank):>10}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — PRODUCTION EXPLANATION PIPELINE ════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What this looks like at work</span>
        <h2 style={S.h2}>Production explanation pipeline — CRED loan rejection letters</h2>

        <p style={S.p}>
          At CRED, when a loan application is rejected the system must
          generate a plain-English explanation that satisfies RBI guidelines.
          The explanation must name the specific factors that led to rejection,
          not just say "algorithmic decision." Here is the complete pipeline.
        </p>

        <CodeBlock code={`import numpy as np
import pandas as pd
import shap
import xgboost as xgb
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OrdinalEncoder
from sklearn.compose import ColumnTransformer
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 10_000

df = pd.DataFrame({
    'annual_income':    np.abs(np.random.normal(50_000, 30_000, n)).clip(8_000, 500_000),
    'existing_emis':   np.abs(np.random.normal(8_000, 6_000, n)).clip(0, 80_000),
    'credit_score':    np.abs(np.random.normal(680, 80, n)).clip(300, 900).astype(int),
    'employment_yrs':  np.abs(np.random.normal(4, 3, n)).clip(0, 30).round(1),
    'loan_amount':     np.abs(np.random.normal(200_000, 150_000, n)).clip(10_000, 2_000_000),
    'n_existing_loans':np.random.randint(0, 6, n).astype(float),
})
default_score = (
    -(df['credit_score']-680)/80*0.40
    + (df['existing_emis']/df['annual_income'])*0.30
    + (df['loan_amount']/df['annual_income']/12)*0.20
    - df['employment_yrs']/30*0.10
    + np.random.randn(n)*0.15
)
y = (default_score > 0.3).astype(int)
feat_names = list(df.columns)

X_tr, X_te, y_tr, y_te = train_test_split(df, y, test_size=0.15,
                                            stratify=y, random_state=42)
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_tr_sc = sc.fit_transform(X_tr)
X_te_sc = sc.transform(X_te)

model = xgb.XGBClassifier(n_estimators=200, learning_rate=0.1, max_depth=4,
                            scale_pos_weight=(y_tr==0).sum()/(y_tr==1).sum(),
                            eval_metric='auc', verbosity=0, random_state=42)
model.fit(X_tr_sc, y_tr)

# Pre-compute SHAP explainer — do this once at startup, reuse for all requests
explainer = shap.TreeExplainer(model)

# ── Human-readable feature descriptions ───────────────────────────────
feature_display = {
    'annual_income':    'Annual income',
    'existing_emis':   'Existing EMI obligations',
    'credit_score':    'Credit score',
    'employment_yrs':  'Employment history',
    'loan_amount':     'Requested loan amount',
    'n_existing_loans':'Number of existing loans',
}

def generate_rejection_explanation(applicant_df: pd.DataFrame,
                                    threshold: float = 0.40) -> dict:
    """
    Generate a structured loan decision with RBI-compliant explanation.
    Returns dict with decision, probability, and top reasons.
    """
    X_enc    = sc.transform(applicant_df)
    prob     = model.predict_proba(X_enc)[0, 1]
    decision = 'REJECTED' if prob >= threshold else 'APPROVED'

    # SHAP explanation
    shap_vals = explainer.shap_values(X_enc)[0]
    contribs  = list(zip(feat_names, applicant_df.values[0], shap_vals))
    contribs.sort(key=lambda x: x[2], reverse=True)   # highest SHAP first

    # Top risk factors (positive SHAP = increases default probability)
    risk_factors = [
        {
            'feature': feature_display[feat],
            'value':   val,
            'impact':  shap_val,
            'reason':  _generate_reason(feat, val, shap_val, applicant_df),
        }
        for feat, val, shap_val in contribs
        if shap_val > 0.01   # only meaningful contributions
    ][:3]   # top 3 risk factors

    return {
        'decision':           decision,
        'default_probability': round(prob, 3),
        'risk_factors':       risk_factors,
    }

def _generate_reason(feat, val, shap_val, df):
    """Generate plain-English reason for each risk factor."""
    reasons = {
        'existing_emis':   f"Existing EMI of ₹{val:,.0f}/month is high relative to income",
        'credit_score':    f"Credit score of {val:.0f} is below our minimum threshold",
        'n_existing_loans':f"You currently have {val:.0f} active loans",
        'loan_amount':     f"Requested amount of ₹{val:,.0f} exceeds your repayment capacity",
        'employment_yrs':  f"Employment history of {val:.1f} years is insufficient",
        'annual_income':   f"Annual income of ₹{val:,.0f} is insufficient for this loan",
    }
    return reasons.get(feat, f"{feat} contributed to higher risk assessment")

# ── Score new applications ─────────────────────────────────────────────
new_applications = [
    {
        'annual_income': 35_000, 'existing_emis': 18_000,
        'credit_score': 610, 'employment_yrs': 1.5,
        'loan_amount': 500_000, 'n_existing_loans': 3,
    },
    {
        'annual_income': 120_000, 'existing_emis': 8_000,
        'credit_score': 760, 'employment_yrs': 8.0,
        'loan_amount': 300_000, 'n_existing_loans': 1,
    },
]

for i, applicant in enumerate(new_applications):
    app_df = pd.DataFrame([applicant])
    result = generate_rejection_explanation(app_df)

    print(f"\n{'─'*55}")
    print(f"Applicant {i+1}:  {result['decision']}")
    print(f"Default probability: {result['default_probability']:.1%}")

    if result['decision'] == 'REJECTED':
        print(f"\nReasons for rejection:")
        for j, factor in enumerate(result['risk_factors'], 1):
            print(f"  {j}. {factor['reason']}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common interpretability mistake — explained and fixed</h2>

        <ErrorBlock
          error="shap.TreeExplainer raises TypeError: Model type not yet supported by TreeExplainer"
          cause="TreeExplainer only works with native tree models: XGBoost, LightGBM, sklearn's DecisionTree, RandomForest, GradientBoosting, ExtraTrees, and CatBoost. It does not work with Pipeline wrappers, CalibratedClassifierCV wrappers, or VotingClassifier — even if the underlying model is a tree. The wrapper hides the tree structure from TreeExplainer."
          fix="Pass the underlying model directly, not the Pipeline: explainer = shap.TreeExplainer(pipeline.named_steps['model']). For CalibratedClassifierCV, access the base estimator: explainer = shap.TreeExplainer(calibrated_model.calibrated_classifiers_[0].estimator). Then pass pre-processed data directly: shap_values = explainer.shap_values(X_te_scaled) where X_te_scaled has been through the Pipeline's preprocessing steps."
        />

        <ErrorBlock
          error="SHAP values do not sum to the predicted probability — sum is off by a large margin"
          cause="SHAP values from TreeExplainer sum to the prediction in log-odds space, not probability space. The expected_value is also in log-odds. Applying sigmoid to (expected_value + sum(shap_values)) gives the probability — but sum(shap_values) alone does not equal pred_prob. This confuses many developers who expect SHAP values to be in probability units."
          fix="To get probability-scale SHAP values use: explainer = shap.TreeExplainer(model, model_output='probability'). Or verify the math: assert abs(sigmoid(expected_value + shap_values.sum()) - pred_prob) < 1e-5. For display purposes always clarify whether you are showing log-odds or probability SHAP values — they have the same sign but different magnitudes."
        />

        <ErrorBlock
          error="LIME gives different explanations on every run for the same prediction"
          cause="LIME is stochastic — it generates random synthetic samples in the neighbourhood of the prediction point, then fits a local linear model on those samples. Different random seeds produce different synthetic samples, leading to slightly different linear model coefficients. For high-dimensional or sparse data the variance between runs can be large enough to change the top features entirely."
          fix="Set a fixed random_state in the explainer: LimeTabularExplainer(X_train, random_state=42). Also set num_samples high (2000+) to reduce variance from the random sampling. For production decision reporting where consistency matters, use SHAP instead of LIME — SHAP is deterministic for tree models. Use LIME only when SHAP is unavailable (e.g. for image or text models)."
        />

        <ErrorBlock
          error="Global SHAP importance from TreeExplainer shows different ranking than model.feature_importances_"
          cause="This is expected and correct — they measure different things. model.feature_importances_ counts how often each feature is used in splits weighted by impurity reduction. SHAP measures each feature's actual contribution to the change in predictions. A feature used in many shallow splits may have high split importance but low SHAP importance if those splits have minimal impact on the output. SHAP is the more reliable measure."
          fix="Trust SHAP over split-based importance for all production use. The SHAP ranking reflects what actually drives predictions. Split importance reflects model structure which can be misleading especially for high-cardinality features. If you need split importance for debugging (e.g. understanding tree depth), use it alongside SHAP rather than instead of it."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          The Evaluation section is complete. Section 7 — Deep Learning — begins next.
        </h2>

        <p style={S.p}>
          You have now completed the full Model Evaluation section:
          evaluation metrics, calibration, ROC curves, cross-validation,
          hyperparameter tuning, and interpretability.
          You can build, evaluate, tune, calibrate, and explain any classical ML model.
        </p>

        <p style={S.p}>
          Section 7 — Deep Learning — begins with neural networks.
          Everything changes: instead of hand-crafted features,
          the model learns its own representations.
          Instead of gradient boosting on tabular data, you train
          multi-layer networks on images, sequences, and text.
          Module 40 builds a neural network from scratch —
          forward pass, backpropagation, and gradient descent —
          before introducing PyTorch.
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
              Next — Section 7 · Deep Learning
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Neural Networks from Scratch
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Forward pass, backpropagation, and gradient descent — built
              from NumPy before touching PyTorch. The foundation every
              deep learning framework is built on.
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
          'Interpretability is a legal requirement in regulated industries — RBI, SEBI, and EU AI Act all mandate that algorithmic decisions be explainable. "The model said so" is not acceptable. SHAP and LIME provide the explanation infrastructure.',
          'Three types of feature importance, in order of reliability: built-in split-based (biased toward high-cardinality features), permutation importance (misleads on correlated features), and SHAP (mathematically proven correct — the only attribution satisfying all four fairness axioms). Always prefer SHAP for production reporting.',
          'SHAP computes two levels simultaneously: global importance (mean |SHAP| across all predictions — reliable feature ranking) and local importance (individual SHAP values per prediction — which features drove this specific outcome and by how much).',
          'Choose the right SHAP explainer: TreeExplainer for XGBoost/LightGBM/RF (fast, exact), LinearExplainer for logistic/linear regression (fastest, exact), KernelExplainer for any model including SVM and neural nets (slow, approximate). Always pass the underlying model, not a Pipeline wrapper.',
          'LIME fits a local linear model in the neighbourhood of each prediction. It is faster than KernelSHAP for non-tree models and produces intuitive rule-based explanations. But it is stochastic — different runs give different results. Use a fixed random_state and high num_samples. Prefer SHAP when determinism matters.',
          'For production loan or credit decisions: pre-compute the SHAP explainer once at startup, store it, and reuse it for all requests. Generate explanations in plain English using a feature description dictionary that maps technical feature names to human-readable phrases. Always report the top 3 risk factors — more than 3 overwhelms the applicant.',
        ]}
      />
    </LearnLayout>
  )
}
