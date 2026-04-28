import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Cross-Validation and the Bias-Variance Tradeoff — Chaduvuko',
  description:
    'From point estimates to confidence intervals. K-fold, stratified, and repeated CV — and when the bias-variance tradeoff determines which model to choose.',
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

export default function CrossValidationPage() {
  return (
    <LearnLayout
      title="Cross-Validation and the Bias-Variance Tradeoff"
      description="From point estimates to confidence intervals. K-fold, stratified, and repeated CV — and when the bias-variance tradeoff determines which model to choose."
      section="Model Evaluation"
      readTime="26–34 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="evaluation" topic="cross-validation" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — what problem does cross-validation solve?</span>
        <h2 style={S.h2}>
          You evaluated your model on one test set and got AUC = 0.91.
          Your colleague split the data differently and got 0.84.
          Who is right? Neither — you need a distribution, not a point.
        </h2>

        <p style={S.p}>
          A single train-test split is a lottery. Which samples end up in the
          test set is determined by a random seed. An unlucky split puts
          easy-to-classify samples in the test set and produces an inflated score.
          A lucky split does the opposite. The number you report — 0.91 or 0.84 —
          depends as much on the random seed as on the model's actual quality.
        </p>

        <p style={S.p}>
          Cross-validation fixes this by running multiple non-overlapping train-test
          splits on the same dataset. With 5-fold CV, you get five AUC scores —
          one per fold. The mean tells you the expected performance.
          The standard deviation tells you how sensitive that performance is
          to which samples end up in the test set. Together they give you
          a confidence interval, not a point estimate.
        </p>

        <p style={S.p}>
          This module also covers the bias-variance tradeoff — the fundamental
          tension that cross-validation exposes. A model with high variance
          produces very different scores across folds (std is large).
          A model with high bias produces consistently mediocre scores across
          all folds (mean is low, std is small). Understanding which problem
          you have determines which fix to apply.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            You want to measure your average commute time to work.
            Measuring it once on a Monday gives you one number — but was
            Monday typical? What if there was unusual traffic?
            Measure it every day for 3 weeks and take the mean and standard
            deviation. The mean is your reliable estimate. The std tells you
            how much it varies. One measurement is a point estimate.
            Many measurements give you a distribution.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            Cross-validation is measuring model performance on 5 or 10 different
            "days" — different random subsets of the data — and averaging.
            The result is a reliable estimate of how the model performs
            on data it has not seen, not a number that got lucky on one split.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          Cross-validation is not just for evaluation — it is the correct way
          to tune hyperparameters (GridSearchCV), compare algorithms, and
          select features. Every time you use a held-out score to make a training
          decision, that decision should be based on CV scores, not a single split.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — HOW K-FOLD CV WORKS ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The algorithm step by step</span>
        <h2 style={S.h2}>K-fold cross-validation — k independent evaluations, one aggregate</h2>

        <p style={S.p}>
          K-fold CV splits the dataset into k equal folds.
          In each of k rounds, one fold serves as the test set
          and the remaining k−1 folds form the training set.
          The model is trained from scratch on the training folds
          and evaluated on the test fold. After k rounds every sample
          has been in the test set exactly once. The k scores
          are averaged to produce the final estimate.
        </p>

        <VisualBox label="5-fold cross-validation — which samples train and test each round">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[1, 2, 3, 4, 5].map((fold) => (
              <div key={fold} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  fontSize: 11, fontFamily: 'var(--font-mono)',
                  color: 'var(--muted)', minWidth: 50,
                }}>
                  Fold {fold}
                </span>
                <div style={{ display: 'flex', gap: 2, flex: 1 }}>
                  {[1, 2, 3, 4, 5].map((block) => (
                    <div key={block} style={{
                      flex: 1, height: 28, borderRadius: 4,
                      background: block === fold
                        ? 'rgba(29,158,117,0.3)'
                        : 'rgba(55,138,221,0.15)',
                      border: block === fold
                        ? '1.5px solid #1D9E75'
                        : '1px solid rgba(55,138,221,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 9, fontFamily: 'var(--font-mono)',
                      color: block === fold ? '#1D9E75' : '#378ADD',
                      fontWeight: block === fold ? 700 : 400,
                    }}>
                      {block === fold ? 'TEST' : 'TRAIN'}
                    </div>
                  ))}
                </div>
                <span style={{
                  fontSize: 10, fontFamily: 'var(--font-mono)',
                  color: 'var(--muted)', minWidth: 60, textAlign: 'right' as const,
                }}>
                  AUC = ?
                </span>
              </div>
            ))}
            <div style={{
              marginTop: 8, padding: '10px 14px',
              background: 'var(--surface)', borderRadius: 6,
              border: '1px solid var(--border)',
              fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)',
            }}>
              Final score = mean(AUC₁, AUC₂, AUC₃, AUC₄, AUC₅) ± std(...)
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.model_selection import (KFold, StratifiedKFold, cross_val_score,
                                      cross_validate, LeaveOneOut)
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 3000

# Brex loan default dataset
income        = np.abs(np.random.normal(50_000, 30_000, n)).clip(8_000, 500_000)
existing_emis = np.abs(np.random.normal(8_000, 6_000, n)).clip(0, 80_000)
credit_score  = np.abs(np.random.normal(680, 80, n)).clip(300, 900)
employment_yr = np.abs(np.random.normal(4, 3, n)).clip(0, 30)
loan_amount   = np.abs(np.random.normal(200_000, 150_000, n)).clip(10_000, 2_000_000)
default_score = (
    -(credit_score-680)/80*0.40 + (existing_emis/income)*0.30
    + (loan_amount/income/12)*0.20 - employment_yr/30*0.10
    + np.random.randn(n)*0.15
)
y = (default_score > 0.3).astype(int)
X = np.column_stack([income, existing_emis, credit_score, employment_yr, loan_amount])

print(f"Dataset: {n} samples, {y.mean()*100:.1f}% default rate")

# ── Always use Pipeline so scaler is fit inside each fold ─────────────
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model',  GradientBoostingClassifier(
        n_estimators=100, learning_rate=0.1,
        max_depth=3, random_state=42,
    )),
])

# ── Standard 5-fold CV ─────────────────────────────────────────────────
kf     = KFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(pipeline, X, y, cv=kf, scoring='roc_auc', n_jobs=-1)

print(f"\n5-fold CV AUC scores: {scores.round(4)}")
print(f"  Mean:  {scores.mean():.4f}")
print(f"  Std:   {scores.std():.4f}")
print(f"  95% CI: [{scores.mean()-1.96*scores.std():.4f}, "
      f"{scores.mean()+1.96*scores.std():.4f}]")

# ── Stratified K-Fold — preserves class balance per fold ──────────────
skf    = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
s_scores = cross_val_score(pipeline, X, y, cv=skf, scoring='roc_auc', n_jobs=-1)

print(f"\nStratified 5-fold CV AUC: {s_scores.mean():.4f} ± {s_scores.std():.4f}")
print(f"  Per-fold positive rates:")
for fold, (tr_idx, te_idx) in enumerate(skf.split(X, y), 1):
    rate = y[te_idx].mean()
    print(f"    Fold {fold}: {rate*100:.1f}% default  ← consistent across folds")

# ── cross_validate — get train AND test scores ─────────────────────────
cv_results = cross_validate(
    pipeline, X, y,
    cv=StratifiedKFold(5, shuffle=True, random_state=42),
    scoring='roc_auc',
    return_train_score=True,
    n_jobs=-1,
)
train_mean = cv_results['train_score'].mean()
val_mean   = cv_results['test_score'].mean()
gap        = train_mean - val_mean

print(f"\ncross_validate (train + val scores):")
print(f"  Train AUC: {train_mean:.4f}")
print(f"  Val AUC:   {val_mean:.4f}")
print(f"  Gap:       {gap:.4f}  {'← possible overfitting' if gap > 0.05 else '← healthy'}")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — THE BIAS-VARIANCE TRADEOFF ═════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most important concept in model selection</span>
        <h2 style={S.h2}>Bias and variance — two ways a model can fail, only one fix each</h2>

        <p style={S.p}>
          Every model makes errors. Those errors come from two fundamentally
          different sources: bias (the model is systematically wrong — too simple
          to capture the true pattern) and variance (the model is too sensitive
          to the specific training data — it fits noise rather than signal).
          You cannot eliminate both simultaneously. Reducing one increases the other.
          Cross-validation makes this tradeoff visible.
        </p>

        <VisualBox label="Bias vs variance — what each looks like in CV scores">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            {[
              {
                label: 'High bias (underfitting)',
                color: '#D85A30',
                train: '0.72',
                val: '0.71',
                std: '0.01',
                gap: 'Small gap',
                symptom: 'Both train and val scores are low. Model is too simple — cannot learn the pattern even from training data.',
                fix: 'More complex model. More features. Less regularisation. More trees / deeper trees.',
              },
              {
                label: 'High variance (overfitting)',
                color: '#378ADD',
                train: '0.98',
                val: '0.74',
                std: '0.06',
                gap: 'Large gap',
                symptom: 'Train score is high, val score is much lower. Large std across folds. Model memorised training noise.',
                fix: 'More regularisation. Fewer features. More training data. Shallower trees. Dropout (neural nets).',
              },
              {
                label: 'Good balance',
                color: '#1D9E75',
                train: '0.91',
                val: '0.89',
                std: '0.02',
                gap: 'Small gap',
                symptom: 'Train and val scores are both high and close together. Small std across folds. Generalises well.',
                fix: 'Nothing — this is what you want. Deploy this model.',
              },
            ].map((item) => (
              <div key={item.label} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 8, padding: '13px 14px',
                borderLeft: `4px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 10 }}>
                  {item.label}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 10 }}>
                  {[
                    ['Train AUC', item.train],
                    ['Val AUC', item.val],
                    ['Val std', item.std],
                    ['Gap', item.gap],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', gap: 8 }}>
                      <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--muted)', minWidth: 68 }}>{k}</span>
                      <span style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <p style={{ ...S.ps, marginBottom: 6, fontSize: 11 }}>{item.symptom}</p>
                <div style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)' }}>
                  Fix: {item.fix}
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.model_selection import cross_validate, StratifiedKFold
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 2000

income        = np.abs(np.random.normal(50_000, 30_000, n)).clip(8_000, 500_000)
existing_emis = np.abs(np.random.normal(8_000, 6_000, n)).clip(0, 80_000)
credit_score  = np.abs(np.random.normal(680, 80, n)).clip(300, 900)
employment_yr = np.abs(np.random.normal(4, 3, n)).clip(0, 30)
loan_amount   = np.abs(np.random.normal(200_000,150_000,n)).clip(10_000,2_000_000)
default_score = (
    -(credit_score-680)/80*0.40 + (existing_emis/income)*0.30
    + (loan_amount/income/12)*0.20 - employment_yr/30*0.10
    + np.random.randn(n)*0.15
)
y = (default_score > 0.3).astype(int)
X = np.column_stack([income,existing_emis,credit_score,employment_yr,loan_amount])

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

models = {
    'Logistic (high bias)':         Pipeline([('sc', StandardScaler()),
                                    ('m', LogisticRegression(C=0.0001, max_iter=1000))]),
    'Decision Tree depth=1 (bias)': Pipeline([('sc', StandardScaler()),
                                    ('m', DecisionTreeClassifier(max_depth=1))]),
    'Decision Tree depth=20 (var)': Pipeline([('sc', StandardScaler()),
                                    ('m', DecisionTreeClassifier(max_depth=20))]),
    'GBM overfit (high var)':       Pipeline([('sc', StandardScaler()),
                                    ('m', GradientBoostingClassifier(
                                        n_estimators=500, max_depth=8,
                                        learning_rate=0.5, random_state=42))]),
    'GBM balanced':                 Pipeline([('sc', StandardScaler()),
                                    ('m', GradientBoostingClassifier(
                                        n_estimators=200, max_depth=3,
                                        learning_rate=0.1, subsample=0.8,
                                        random_state=42))]),
}

print(f"{'Model':<30} {'Train AUC':>10} {'Val AUC':>10} {'Std':>7} {'Gap':>8} {'Diagnosis'}")
print("─" * 88)

for name, model in models.items():
    res     = cross_validate(model, X, y, cv=cv, scoring='roc_auc',
                              return_train_score=True, n_jobs=-1)
    tr_mean = res['train_score'].mean()
    va_mean = res['test_score'].mean()
    va_std  = res['test_score'].std()
    gap     = tr_mean - va_mean

    if va_mean < 0.75 and gap < 0.05:
        diagnosis = 'High bias'
    elif gap > 0.08:
        diagnosis = 'High variance'
    elif va_std > 0.04:
        diagnosis = 'Unstable (high var)'
    else:
        diagnosis = '✓ Good balance'

    print(f"  {name:<28}  {tr_mean:>10.4f}  {va_mean:>10.4f}  {va_std:>7.4f}  {gap:>7.4f}  {diagnosis}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — CV VARIANTS ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Choosing the right CV strategy</span>
        <h2 style={S.h2}>Five CV variants — when each is appropriate</h2>

        <p style={S.p}>
          Standard K-fold is not always the right choice. The optimal CV strategy
          depends on dataset size, class balance, data structure,
          and what you are trying to measure. Using the wrong CV strategy
          produces misleading performance estimates.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              name: 'KFold',
              color: '#378ADD',
              when: 'Balanced regression or balanced classification. Default choice. k=5 or k=10.',
              watch: 'Does not preserve class balance — use StratifiedKFold for classification.',
              code: "KFold(n_splits=5, shuffle=True, random_state=42)",
            },
            {
              name: 'StratifiedKFold',
              color: '#1D9E75',
              when: 'Classification with any class imbalance. Each fold has the same class ratio as the full dataset. Always use this instead of KFold for classification.',
              watch: 'Slightly more expensive to compute. Not applicable for regression targets.',
              code: "StratifiedKFold(n_splits=5, shuffle=True, random_state=42)",
            },
            {
              name: 'RepeatedStratifiedKFold',
              color: '#D85A30',
              when: 'Small datasets where a single 5-fold CV is too noisy. Repeats the entire CV r times with different random seeds. r×k total evaluations — more reliable std estimate.',
              watch: 'r × k × training_time cost. Use r=3–10. Overkill on large datasets.',
              code: "RepeatedStratifiedKFold(n_splits=5, n_repeats=10, random_state=42)",
            },
            {
              name: 'TimeSeriesSplit',
              color: '#BA7517',
              when: 'Any time-ordered data — transactions, sensor readings, stock prices. Train on past, validate on immediate future. Prevents temporal leakage.',
              watch: 'Never use KFold on time-series. It puts future data in the training set. Always use this for sequential data.',
              code: "TimeSeriesSplit(n_splits=5, gap=0)",
            },
            {
              name: 'GroupKFold',
              color: '#7F77DD',
              when: 'Data where samples from the same group must not appear in both train and test. Customer-level data: all orders from one customer in the same fold. Prevents identity leakage.',
              watch: 'Requires a groups array. Fold sizes may be unequal if groups are different sizes.',
              code: "GroupKFold(n_splits=5)",
            },
          ].map((item) => (
            <div key={item.name} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '12px 16px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>
                  {item.name}
                </span>
              </div>
              <p style={{ ...S.ps, marginBottom: 4 }}>{item.when}</p>
              <div style={{ fontSize: 11, color: '#ff4757', marginBottom: 6 }}>
                ⚠ {item.watch}
              </div>
              <div style={{
                fontSize: 11, fontFamily: 'var(--font-mono)', color: item.color,
                background: `${item.color}10`, padding: '4px 8px', borderRadius: 4,
              }}>
                {item.code}
              </div>
            </div>
          ))}
        </div>

        <CodeBlock code={`import numpy as np
import pandas as pd
from sklearn.model_selection import (
    StratifiedKFold, RepeatedStratifiedKFold,
    TimeSeriesSplit, GroupKFold, cross_val_score,
)
from sklearn.ensemble import GradientBoostingClassifier, GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 2000

income        = np.abs(np.random.normal(50_000, 30_000, n)).clip(8_000, 500_000)
existing_emis = np.abs(np.random.normal(8_000, 6_000, n)).clip(0, 80_000)
credit_score  = np.abs(np.random.normal(680, 80, n)).clip(300, 900)
employment_yr = np.abs(np.random.normal(4, 3, n)).clip(0, 30)
loan_amount   = np.abs(np.random.normal(200_000,150_000,n)).clip(10_000,2_000_000)
default_score = (
    -(credit_score-680)/80*0.40 + (existing_emis/income)*0.30
    + (loan_amount/income/12)*0.20 - employment_yr/30*0.10
    + np.random.randn(n)*0.15
)
y = (default_score > 0.3).astype(int)
X = np.column_stack([income,existing_emis,credit_score,employment_yr,loan_amount])
customer_ids = np.repeat(np.arange(400), 5)   # 400 customers, 5 loans each

pipeline = Pipeline([
    ('sc', StandardScaler()),
    ('m',  GradientBoostingClassifier(n_estimators=100, learning_rate=0.1,
                                       max_depth=3, random_state=42)),
])

# ── Standard StratifiedKFold ───────────────────────────────────────────
skf     = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
skf_auc = cross_val_score(pipeline, X, y, cv=skf, scoring='roc_auc', n_jobs=-1)
print(f"StratifiedKFold (5):          {skf_auc.mean():.4f} ± {skf_auc.std():.4f}")

# ── RepeatedStratifiedKFold — more stable std estimate ────────────────
rskf     = RepeatedStratifiedKFold(n_splits=5, n_repeats=10, random_state=42)
rskf_auc = cross_val_score(pipeline, X, y, cv=rskf, scoring='roc_auc', n_jobs=-1)
print(f"RepeatedStratKFold (5×10):    {rskf_auc.mean():.4f} ± {rskf_auc.std():.4f}")
print(f"  50 scores — much more reliable std estimate")

# ── GroupKFold — customers must not split across folds ─────────────────
gkf     = GroupKFold(n_splits=5)
gkf_auc = cross_val_score(pipeline, X, y, cv=gkf,
                            groups=customer_ids, scoring='roc_auc', n_jobs=-1)
print(f"\nGroupKFold (no customer leakage): {gkf_auc.mean():.4f} ± {gkf_auc.std():.4f}")
print(f"  Each fold: all loans from a customer in same split")
print(f"  Difference from StratKFold: {skf_auc.mean()-gkf_auc.mean():+.4f}")
print(f"  Positive gap = identity leakage was inflating StratKFold score")

# ── TimeSeriesSplit — for sequential data ─────────────────────────────
tscv = TimeSeriesSplit(n_splits=5)
ts_auc = cross_val_score(pipeline, X, y, cv=tscv, scoring='roc_auc', n_jobs=-1)
print(f"\nTimeSeriesSplit:              {ts_auc.mean():.4f} ± {ts_auc.std():.4f}")
print(f"  Per-fold sizes (train→val):")
for fold, (tr, te) in enumerate(tscv.split(X), 1):
    print(f"    Fold {fold}: {len(tr)} train → {len(te)} val")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — COMPARING MODELS WITH CV ═══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Statistically rigorous model comparison</span>
        <h2 style={S.h2}>When is Model A actually better than Model B?</h2>

        <p style={S.p}>
          Your gradient boosting model has CV AUC = 0.891.
          Logistic regression has CV AUC = 0.878. Is GBM better?
          Maybe. Or maybe the difference is sampling noise and on a different
          random seed the order would flip. Cross-validation lets you run
          a paired statistical test to answer this question rigorously.
        </p>

        <ConceptBox title="The paired t-test for model comparison — using CV fold scores">
          <p style={{ ...S.ps, marginBottom: 10 }}>
            Because both models are evaluated on the same folds, their scores
            are paired. Model A's fold-1 score and Model B's fold-1 score both
            came from the exact same test samples. A paired t-test on the
            k differences tests whether the mean difference is significantly
            different from zero — i.e. whether one model is genuinely better.
          </p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2, color: 'var(--muted)' }}>
            <div style={{ color: '#1D9E75' }}>differences = scores_A − scores_B   (per fold)</div>
            <div>H₀: mean(differences) = 0  (no true difference)</div>
            <div>p &lt; 0.05 → reject H₀ → Model A is significantly better</div>
            <div>p ≥ 0.05 → cannot conclude one is better → choose simpler model</div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
from scipy import stats
from sklearn.model_selection import cross_val_score, RepeatedStratifiedKFold
from sklearn.ensemble import (GradientBoostingClassifier, RandomForestClassifier)
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
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
X = np.column_stack([income,existing_emis,credit_score,employment_yr,loan_amount])

# Use RepeatedStratKFold for more reliable comparison
cv = RepeatedStratifiedKFold(n_splits=5, n_repeats=5, random_state=42)

candidates = {
    'LogisticReg':       Pipeline([('sc', StandardScaler()),
                          ('m', LogisticRegression(max_iter=1000, random_state=42))]),
    'RandomForest':      Pipeline([('sc', StandardScaler()),
                          ('m', RandomForestClassifier(n_estimators=100,
                                                        random_state=42, n_jobs=-1))]),
    'GradientBoosting':  Pipeline([('sc', StandardScaler()),
                          ('m', GradientBoostingClassifier(n_estimators=200,
                                  learning_rate=0.1, max_depth=3, random_state=42))]),
}

all_scores = {}
print(f"{'Model':<20} {'Mean AUC':>10} {'Std':>8} {'95% CI'}")
print("─" * 60)

for name, model in candidates.items():
    scores = cross_val_score(model, X, y, cv=cv,
                              scoring='roc_auc', n_jobs=-1)
    all_scores[name] = scores
    ci_lo = scores.mean() - 1.96 * scores.std()
    ci_hi = scores.mean() + 1.96 * scores.std()
    print(f"  {name:<18}  {scores.mean():>10.4f}  {scores.std():>8.4f}  "
          f"[{ci_lo:.4f}, {ci_hi:.4f}]")

# ── Paired t-test: is GBM significantly better than RandomForest? ──────
best   = 'GradientBoosting'
second = 'RandomForest'

scores_a = all_scores[best]
scores_b = all_scores[second]
diff     = scores_a - scores_b

t_stat, p_value = stats.ttest_rel(scores_a, scores_b)

print(f"\nPaired t-test: {best} vs {second}")
print(f"  Mean difference: {diff.mean():+.4f}")
print(f"  t-statistic:     {t_stat:.4f}")
print(f"  p-value:         {p_value:.4f}")

if p_value < 0.05:
    winner = best if diff.mean() > 0 else second
    print(f"  → p < 0.05: {winner} is SIGNIFICANTLY better (95% confidence)")
else:
    print(f"  → p ≥ 0.05: difference is NOT statistically significant")
    print(f"  → Choose the simpler model: {second}")

# ── Practical decision rule ────────────────────────────────────────────
print(f"\nPractical decision rule:")
print(f"  If p < 0.05 AND mean diff > 0.01: choose complex model")
print(f"  If p ≥ 0.05 OR mean diff < 0.01: choose simpler model")
print(f"  Statistical significance alone is not enough —")
print(f"  a 0.001 AUC difference may be significant but not practically meaningful")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — NESTED CV ═══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The correct way to tune and evaluate simultaneously</span>
        <h2 style={S.h2}>Nested cross-validation — unbiased evaluation when you also tune hyperparameters</h2>

        <p style={S.p}>
          A subtle but important problem: if you use the same CV folds to both
          tune hyperparameters and evaluate the model, your evaluation is
          optimistically biased. The hyperparameters were chosen to maximise
          performance on those exact folds — so they are already optimised
          for the test sets you are evaluating on. This is selection bias.
        </p>

        <p style={S.p}>
          Nested CV solves this with two loops: an outer loop for unbiased
          evaluation and an inner loop for hyperparameter tuning.
          The outer loop creates train/test splits. On each outer training set,
          the inner loop runs GridSearchCV to find the best hyperparameters.
          The best model from the inner loop is evaluated on the outer test set —
          which it has never influenced in any way.
        </p>

        <CodeBlock code={`import numpy as np
from sklearn.model_selection import (cross_val_score, GridSearchCV,
                                      StratifiedKFold, cross_validate)
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 1500

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
X = np.column_stack([income,existing_emis,credit_score,employment_yr,loan_amount])

# ── Non-nested CV — optimistically biased ─────────────────────────────
pipeline  = Pipeline([('sc', StandardScaler()),
                       ('m', GradientBoostingClassifier(random_state=42))])
param_grid = {
    'm__n_estimators': [100, 200],
    'm__max_depth':    [3, 4],
    'm__learning_rate':[0.05, 0.1],
}

inner_cv  = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)
outer_cv  = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

# Tune on full data then evaluate on same folds — biased
grid_search_biased = GridSearchCV(pipeline, param_grid, cv=inner_cv,
                                   scoring='roc_auc', n_jobs=-1)
grid_search_biased.fit(X, y)
best_pipe = grid_search_biased.best_estimator_

# Evaluating best_pipe on same outer folds is biased
biased_scores = cross_val_score(best_pipe, X, y, cv=outer_cv,
                                 scoring='roc_auc', n_jobs=-1)

# ── Nested CV — unbiased ──────────────────────────────────────────────
# Outer loop: evaluation folds
# Inner loop: hyperparameter search (sees only outer training data)
nested_grid = GridSearchCV(pipeline, param_grid, cv=inner_cv,
                            scoring='roc_auc', n_jobs=-1)
nested_scores = cross_val_score(nested_grid, X, y, cv=outer_cv,
                                 scoring='roc_auc', n_jobs=-1)

print("Non-nested (biased) CV AUC:   "
      f"{biased_scores.mean():.4f} ± {biased_scores.std():.4f}")
print("Nested (unbiased) CV AUC:     "
      f"{nested_scores.mean():.4f} ± {nested_scores.std():.4f}")
gap = biased_scores.mean() - nested_scores.mean()
print(f"Optimism bias:                {gap:+.4f}  ← biased estimate inflated by this much")

print("\nKey rule:")
print("  Use nested CV when BOTH tuning and evaluating on same dataset.")
print("  Use simple CV when evaluating a fixed (pre-tuned) model.")
print("  Nested CV is slower (k_outer × k_inner × n_param_combos) but honest.")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common cross-validation mistake — explained and fixed</h2>

        <ErrorBlock
          error="CV score is much higher than final test score — cross-validation was optimistic"
          cause="Preprocessing (StandardScaler, PCA, feature selection) was fit on the full dataset before CV. Each CV fold's test set was contaminated by the scaler's statistics which were computed using that test set's data. This is the most common CV mistake — fitting any transformer before the CV loop leaks information from validation folds into training."
          fix="Always wrap preprocessing and model together in a Pipeline, then pass the pipeline to cross_val_score. The Pipeline refits the scaler inside each fold on the training portion only. Never call scaler.fit(X_all) before CV. Never select features on the full dataset before CV — wrap feature selection inside the Pipeline too."
        />

        <ErrorBlock
          error="CV std is very large (0.08+) — scores jump between 0.72 and 0.90 across folds"
          cause="High variance in CV scores means the model is unstable — performance depends heavily on which samples appear in the training set. Common causes: dataset too small (each fold is too small to train reliably), model has very high variance (deep trees, no regularisation), or the data has high inherent noise."
          fix="Use RepeatedStratifiedKFold(n_splits=5, n_repeats=10) to get 50 scores instead of 5 — the std of the mean is much more stable. Add regularisation to the model to reduce variance. If the dataset is small (under 500 samples), use LeaveOneOut CV for maximum use of training data. A large CV std is a signal to regularise the model, not to ignore."
        />

        <ErrorBlock
          error="GroupKFold scores are much lower than StratifiedKFold on the same data"
          cause="This is correct and expected — it reveals that StratifiedKFold was leaking identity information. When a customer appears in both train and test (StratKFold), the model can memorise individual customer patterns. GroupKFold forces all of a customer's loans into the same fold — the model must generalise to new customers. The lower score is the honest estimate."
          fix="Use GroupKFold whenever your data has a natural group structure: customers, users, patients, stores, sessions. The StratKFold score is inflated by identity leakage. Always ask: are there groups in this data where all samples from a group should stay together? If yes, GroupKFold. Report only the GroupKFold score — it is the honest one."
        />

        <ErrorBlock
          error="Nested CV is taking hours — 5 outer × 3 inner × 12 param combos = 180 model fits"
          cause="Nested CV is inherently expensive. With k_outer=5, k_inner=3, and 12 hyperparameter combinations, you fit 5 × 3 × 12 = 180 models. Each model trains on 80% of the data. On large datasets or complex models this becomes prohibitive."
          fix="Use RandomizedSearchCV in the inner loop instead of GridSearchCV: it samples n_iter random combinations instead of all combinations. Set n_iter=10–20. Use n_jobs=-1 everywhere to parallelise. Reduce k_outer to 3 if speed is critical. Alternatively, use a separate held-out test set for final evaluation and only use CV for hyperparameter tuning — this avoids the outer loop entirely."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can evaluate reliably. Next: find the hyperparameters
          that make the model as good as it can be.
        </h2>

        <p style={S.p}>
          Cross-validation tells you how good a model is at a given set of
          hyperparameters. Hyperparameter tuning searches across many combinations
          to find the set that produces the best CV score.
          Module 38 covers Optuna — a modern hyperparameter optimisation framework
          that is far more efficient than GridSearchCV or RandomizedSearchCV.
          It uses Bayesian optimisation to focus the search on promising regions
          of the hyperparameter space instead of evaluating combinations randomly.
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
              Next — Module 38 · Model Evaluation
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Hyperparameter Tuning with Optuna
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Bayesian optimisation over GridSearch. Define a search space,
              let Optuna find the best hyperparameters with far fewer trials.
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
          'A single train-test split is a lottery — performance depends on which samples ended up in the test set. Cross-validation runs k non-overlapping evaluations and reports mean ± std, giving a confidence interval rather than a point estimate.',
          'Cross-validation reveals the bias-variance tradeoff directly. High bias: both train and val scores are low, small gap. High variance: train score is high, val score is much lower, large std across folds. The fix for each is different — regularise for variance, increase complexity for bias.',
          'Always wrap preprocessing inside a Pipeline before passing to cross_val_score. Fitting a scaler on the full dataset before CV leaks validation fold statistics into training — the single most common CV mistake. Pipeline refits the scaler inside each fold automatically.',
          'Use StratifiedKFold for all classification problems — it preserves the class ratio in every fold. Use GroupKFold when samples from the same entity (customer, patient, store) must not appear in both train and test. Use TimeSeriesSplit for any sequential data.',
          'When comparing two models with CV, run a paired t-test on the k fold score differences. Both models evaluated on the same folds means their scores are paired. p < 0.05 AND mean difference > 0.01 → choose the better model. Otherwise choose the simpler one.',
          'Use nested CV when both tuning hyperparameters and evaluating the final model on the same dataset. The outer loop evaluates, the inner loop tunes. Non-nested CV after hyperparameter selection is optimistically biased — hyperparameters were chosen to maximise scores on those exact folds.',
        ]}
      />
    </LearnLayout>
  )
}
