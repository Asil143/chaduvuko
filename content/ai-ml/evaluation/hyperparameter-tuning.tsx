import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Hyperparameter Tuning with Optuna — Chaduvuko',
  description:
    'Bayesian optimisation over GridSearch. Define a search space, let Optuna find the best hyperparameters with far fewer trials — built from plain English first.',
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

export default function HyperparameterTuningPage() {
  return (
    <LearnLayout
      title="Hyperparameter Tuning with Optuna"
      description="Bayesian optimisation over GridSearch. Define a search space, let Optuna find the best hyperparameters with far fewer trials."
      section="Model Evaluation"
      readTime="30–40 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="evaluation" topic="hyperparameter-tuning" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — what problem does Optuna solve?</span>
        <h2 style={S.h2}>
          GridSearchCV evaluates 200 combinations blindly.
          Optuna evaluates 30 combinations intelligently —
          and usually finds a better answer.
        </h2>

        <p style={S.p}>
          Your gradient boosting model has 6 hyperparameters to tune:
          n_estimators, learning_rate, max_depth, subsample,
          colsample_bytree, reg_alpha. If you try 4 values per parameter
          with GridSearchCV, that is 4⁶ = 4,096 combinations.
          With 5-fold CV each combination trains 5 models — 20,480 model fits.
          At 30 seconds each, that is 7 days of compute.
        </p>

        <p style={S.p}>
          RandomizedSearchCV cuts this to 100 random combinations — still blind,
          just fewer. It does not learn from previous trials. If learning_rate=0.01
          consistently underperforms learning_rate=0.1, random search keeps
          wasting trials on learning_rate=0.01 anyway.
        </p>

        <p style={S.p}>
          Optuna uses <strong style={{ color: '#1D9E75' }}>Bayesian optimisation</strong>.
          After each trial it builds a probabilistic model of which hyperparameter
          regions are likely to produce good scores. It uses this model to
          choose the next trial — focusing on promising regions and skipping
          areas already known to be bad. With 30–50 trials it typically
          matches or beats GridSearchCV on 200+ combinations.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Finding the best hyperparameters is like prospecting for gold
            in a mountain range. GridSearch digs at every point on a fixed grid —
            systematic but wasteful. Random search digs at random spots —
            faster but still uninformed. Optuna is a geologist who studies
            the rock formations after each dig. If gold appeared near a
            granite outcrop, they dig near other granite outcrops first.
            They learn from each result to make the next dig smarter.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            Optuna's probabilistic model of the search space is called a surrogate model.
            The strategy for choosing the next trial from the surrogate is called
            an acquisition function. Together they make Optuna far more
            sample-efficient than any exhaustive or random search.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          Optuna requires <span style={S.code as React.CSSProperties}>pip install optuna</span>.
          It integrates directly with sklearn, XGBoost, LightGBM, and PyTorch.
          Unlike GridSearchCV, Optuna is resumable — you can stop a study,
          save it to a database, and continue later from where you left off.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — THREE SEARCH STRATEGIES ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Understanding the options</span>
        <h2 style={S.h2}>Grid vs Random vs Bayesian — what each one does and when it wins</h2>

        <VisualBox label="Three search strategies — same budget, different results">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            {[
              {
                name: 'GridSearchCV',
                color: '#D85A30',
                how: 'Evaluates every combination in a fixed grid. Exhaustive. Guaranteed to find the best combination in the grid.',
                when: 'Fewer than 3 hyperparameters with small ranges. When you already have good intuition for the ranges.',
                cost: 'Combinatorial explosion. 5 params × 4 values = 1,024 combos.',
                verdict: 'Avoid for more than 3 parameters.',
              },
              {
                name: 'RandomizedSearchCV',
                color: '#BA7517',
                how: 'Samples n_iter random combinations from the search space. No learning between trials. Each trial is independent.',
                when: 'Wide search spaces with many parameters. Good baseline — often finds 80% of optimal with 50 trials.',
                cost: 'Linear with n_iter. Fast but wasteful — no learning.',
                verdict: 'Good default. Use when Optuna is unavailable.',
              },
              {
                name: 'Optuna (Bayesian)',
                color: '#1D9E75',
                how: 'Builds a surrogate model of the objective function. Uses it to choose the next trial via an acquisition function (TPE by default). Learns from every result.',
                when: 'Any problem with 3+ hyperparameters or expensive objective functions. Especially good when some parameters matter much more than others.',
                cost: 'Linear with n_trials. Uses each trial efficiently.',
                verdict: 'Best choice for any serious tuning task.',
              },
            ].map((item) => (
              <div key={item.name} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 8, padding: '13px 14px',
                borderLeft: `4px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 8 }}>
                  {item.name}
                </div>
                {[
                  ['How', item.how],
                  ['Best for', item.when],
                  ['Cost', item.cost],
                ].map(([label, text]) => (
                  <div key={label} style={{ marginBottom: 7 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 2 }}>
                      {label.toUpperCase()}
                    </div>
                    <p style={{ ...S.ps, marginBottom: 0, fontSize: 11 }}>{text}</p>
                  </div>
                ))}
                <div style={{
                  marginTop: 8, fontSize: 11, fontWeight: 700,
                  color: item.color, fontFamily: 'var(--font-mono)',
                }}>
                  → {item.verdict}
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
import time
from sklearn.model_selection import (GridSearchCV, RandomizedSearchCV,
                                      StratifiedKFold, cross_val_score)
from sklearn.ensemble import GradientBoostingClassifier
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
loan_amount   = np.abs(np.random.normal(200_000, 150_000, n)).clip(10_000, 2_000_000)
default_score = (
    -(credit_score-680)/80*0.40 + (existing_emis/income)*0.30
    + (loan_amount/income/12)*0.20 - employment_yr/30*0.10
    + np.random.randn(n)*0.15
)
y = (default_score > 0.3).astype(int)
X = np.column_stack([income, existing_emis, credit_score, employment_yr, loan_amount])

pipeline = Pipeline([
    ('sc', StandardScaler()),
    ('m',  GradientBoostingClassifier(random_state=42)),
])
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

# ── GridSearchCV — exhaustive ──────────────────────────────────────────
grid_params = {
    'm__n_estimators': [100, 200, 300],
    'm__max_depth':    [3, 4, 5],
    'm__learning_rate':[0.05, 0.1],
    'm__subsample':    [0.8, 1.0],
}  # 3×3×2×2 = 36 combinations × 5 folds = 180 fits

t0          = time.time()
grid_search = GridSearchCV(pipeline, grid_params, cv=cv,
                            scoring='roc_auc', n_jobs=-1)
grid_search.fit(X, y)
grid_time   = time.time() - t0

print(f"GridSearchCV:")
print(f"  Combinations: {len(grid_search.cv_results_['mean_test_score'])}")
print(f"  Best AUC:     {grid_search.best_score_:.4f}")
print(f"  Best params:  {grid_search.best_params_}")
print(f"  Time:         {grid_time:.1f}s")

# ── RandomizedSearchCV — 30 random samples ────────────────────────────
rand_params = {
    'm__n_estimators': [100, 150, 200, 250, 300, 400],
    'm__max_depth':    [2, 3, 4, 5, 6],
    'm__learning_rate':[0.01, 0.05, 0.1, 0.2],
    'm__subsample':    [0.6, 0.7, 0.8, 0.9, 1.0],
    'm__min_samples_leaf': [1, 5, 10, 20],
}

t0         = time.time()
rand_search = RandomizedSearchCV(pipeline, rand_params, n_iter=30, cv=cv,
                                  scoring='roc_auc', random_state=42, n_jobs=-1)
rand_search.fit(X, y)
rand_time   = time.time() - t0

print(f"\nRandomizedSearchCV (n_iter=30):")
print(f"  Combinations: 30 random")
print(f"  Best AUC:     {rand_search.best_score_:.4f}")
print(f"  Best params:  {rand_search.best_params_}")
print(f"  Time:         {rand_time:.1f}s")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — OPTUNA BASICS ═══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The Optuna interface</span>
        <h2 style={S.h2}>Optuna in three steps — study, objective, optimize</h2>

        <p style={S.p}>
          Optuna has a simple API built around three concepts.
          A <strong style={{ color: '#1D9E75' }}>study</strong> is the optimisation session —
          it stores all trials and their results.
          An <strong style={{ color: '#1D9E75' }}>objective function</strong> is the function
          Optuna calls for each trial — it receives a trial object, samples
          hyperparameters from it, trains the model, and returns a score.
          <strong style={{ color: '#1D9E75' }}>optimize()</strong> runs the objective
          n_trials times, using previous results to guide each new trial.
        </p>

        <ConceptBox title="The trial object — how Optuna samples hyperparameters">
          <p style={{ ...S.ps, marginBottom: 10 }}>
            Inside the objective function, you use the trial object to suggest
            hyperparameter values. Optuna chooses values based on its surrogate model —
            not randomly and not from a fixed grid.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { method: 'trial.suggest_int("name", low, high)', desc: 'Integer in [low, high]. For n_estimators, max_depth, min_samples_leaf.' },
              { method: 'trial.suggest_float("name", low, high)', desc: 'Float in [low, high]. For subsample, colsample_bytree.' },
              { method: 'trial.suggest_float("name", low, high, log=True)', desc: 'Log-uniform float. For learning_rate, reg_alpha — parameters that span orders of magnitude.' },
              { method: 'trial.suggest_categorical("name", choices)', desc: 'One of a fixed list. For kernel, criterion, optimizer.' },
            ].map((row) => (
              <div key={row.method} style={{
                background: 'var(--bg2)', borderRadius: 6, padding: '8px 12px',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
              }}>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#1D9E75' }}>
                  {row.method}
                </span>
                <span style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>
                  {row.desc}
                </span>
              </div>
            ))}
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
import optuna
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import warnings
warnings.filterwarnings('ignore')

# Suppress Optuna's verbose output
optuna.logging.set_verbosity(optuna.logging.WARNING)

np.random.seed(42)
n = 2000

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

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

# ── Step 1: Define the objective function ─────────────────────────────
def objective(trial):
    """
    Optuna calls this function for each trial.
    trial.suggest_* samples hyperparameters intelligently.
    Returns the metric to MAXIMISE (Optuna minimises by default — flip sign).
    """
    params = {
        'n_estimators':     trial.suggest_int('n_estimators', 50, 500),
        'learning_rate':    trial.suggest_float('learning_rate', 0.01, 0.3, log=True),
        'max_depth':        trial.suggest_int('max_depth', 2, 6),
        'subsample':        trial.suggest_float('subsample', 0.5, 1.0),
        'min_samples_leaf': trial.suggest_int('min_samples_leaf', 1, 30),
        'max_features':     trial.suggest_categorical('max_features',
                                                       ['sqrt', 'log2', None]),
    }

    pipeline = Pipeline([
        ('sc', StandardScaler()),
        ('m',  GradientBoostingClassifier(**params, random_state=42)),
    ])

    scores = cross_val_score(pipeline, X, y, cv=cv,
                              scoring='roc_auc', n_jobs=-1)
    return scores.mean()   # Optuna will maximise this

# ── Step 2: Create a study and run optimisation ────────────────────────
study = optuna.create_study(direction='maximize')   # maximise AUC
study.optimize(objective, n_trials=50, show_progress_bar=False)

# ── Step 3: Inspect results ────────────────────────────────────────────
best_trial = study.best_trial

print(f"Optuna results (50 trials):")
print(f"  Best AUC:    {best_trial.value:.4f}")
print(f"  Best params:")
for key, val in best_trial.params.items():
    print(f"    {key:<22}: {val}")

# ── Trial history — see how Optuna improved over time ─────────────────
print(f"\nOptimisation history (every 10 trials):")
print(f"{'Trial':>7} {'AUC':>8} {'Best so far':>12}")
print("─" * 30)
best_so_far = 0.0
for i, trial in enumerate(study.trials):
    if trial.value and trial.value > best_so_far:
        best_so_far = trial.value
    if i % 10 == 0 or i == len(study.trials) - 1:
        print(f"  {i:>5}  {trial.value or 0:>8.4f}  {best_so_far:>12.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — ADVANCED OPTUNA ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Production-grade tuning</span>
        <h2 style={S.h2}>Pruning, callbacks, and persistence — Optuna at scale</h2>

        <p style={S.p}>
          For expensive models, Optuna's pruning feature terminates unpromising
          trials early — after seeing partial results. If a trial looks bad
          after fold 2 of 5-fold CV, Optuna stops it and moves on.
          This can cut total compute by 30–50% with no loss in final quality.
        </p>

        <CodeBlock code={`import numpy as np
import optuna
from optuna.samplers import TPESampler
from optuna.pruners import MedianPruner
from sklearn.model_selection import StratifiedKFold
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import roc_auc_score
import warnings
warnings.filterwarnings('ignore')

optuna.logging.set_verbosity(optuna.logging.WARNING)

np.random.seed(42)
n = 2000

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

# ── Objective with pruning — stop bad trials early ─────────────────────
def objective_with_pruning(trial):
    params = {
        'n_estimators':     trial.suggest_int('n_estimators', 50, 500),
        'learning_rate':    trial.suggest_float('learning_rate', 0.01, 0.3, log=True),
        'max_depth':        trial.suggest_int('max_depth', 2, 6),
        'subsample':        trial.suggest_float('subsample', 0.5, 1.0),
        'min_samples_leaf': trial.suggest_int('min_samples_leaf', 1, 30),
    }

    sc    = StandardScaler()
    X_sc  = sc.fit_transform(X)
    skf   = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    folds = list(skf.split(X_sc, y))

    fold_scores = []
    for step, (tr_idx, va_idx) in enumerate(folds):
        model = GradientBoostingClassifier(**params, random_state=42)
        model.fit(X_sc[tr_idx], y[tr_idx])
        score = roc_auc_score(y[va_idx], model.predict_proba(X_sc[va_idx])[:, 1])
        fold_scores.append(score)

        # Report intermediate score to Optuna
        trial.report(np.mean(fold_scores), step)

        # Prune if this trial is clearly worse than median of finished trials
        if trial.should_prune():
            raise optuna.exceptions.TrialPruned()

    return np.mean(fold_scores)

# ── TPE sampler + Median pruner ────────────────────────────────────────
# TPE (Tree-structured Parzen Estimator) — Optuna's default Bayesian sampler
# MedianPruner — prune if intermediate score < median of completed trials
sampler = TPESampler(seed=42)
pruner  = MedianPruner(n_startup_trials=10, n_warmup_steps=2)

study_pruned = optuna.create_study(
    direction='maximize',
    sampler=sampler,
    pruner=pruner,
)
study_pruned.optimize(objective_with_pruning, n_trials=50)

pruned_count   = len([t for t in study_pruned.trials
                       if t.state == optuna.trial.TrialState.PRUNED])
complete_count = len([t for t in study_pruned.trials
                       if t.state == optuna.trial.TrialState.COMPLETE])

print(f"Study with pruning (50 trials):")
print(f"  Completed trials: {complete_count}")
print(f"  Pruned trials:    {pruned_count}  ← stopped early, saved compute")
print(f"  Best AUC:         {study_pruned.best_value:.4f}")

# ── Persistence — save study to SQLite, resume later ──────────────────
storage = "sqlite:///optuna_cred_credit.db"
study_persistent = optuna.create_study(
    study_name="cred_credit_scoring",
    storage=storage,
    direction='maximize',
    load_if_exists=True,   # resume from existing study if it exists
    sampler=TPESampler(seed=42),
)
# Run 10 more trials — adds to existing results
study_persistent.optimize(objective_with_pruning, n_trials=10)
print(f"\nPerforce study '{study_persistent.study_name}':")
print(f"  Total trials: {len(study_persistent.trials)}")
print(f"  Best AUC:     {study_persistent.best_value:.4f}")
print(f"  Saved to:     optuna_cred_credit.db  ← can resume any time")

# ── Parameter importance — which params actually matter? ───────────────
try:
    importances = optuna.importance.get_param_importances(study_pruned)
    print(f"\nHyperparameter importance (Fanova):")
    for param, importance in importances.items():
        bar = '█' * int(importance * 40)
        print(f"  {param:<22}: {bar:<40} {importance:.4f}")
except Exception:
    print("\n(Parameter importance requires completed trials)")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — OPTUNA WITH XGBOOST AND LIGHTGBM ══════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Real production use</span>
        <h2 style={S.h2}>Tuning XGBoost and LightGBM with Optuna — the full workflow</h2>

        <p style={S.p}>
          In production you will tune XGBoost or LightGBM far more often than
          sklearn's GradientBoostingClassifier. Both have native Optuna
          integration. The search spaces for these models are well-established
          and the code below gives you a production-ready starting template.
        </p>

        <CodeBlock code={`import numpy as np
import optuna
import xgboost as xgb
import lightgbm as lgb
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.preprocessing import OrdinalEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import roc_auc_score
import warnings
warnings.filterwarnings('ignore')
optuna.logging.set_verbosity(optuna.logging.WARNING)

np.random.seed(42)
n = 5000

income        = np.abs(np.random.normal(50_000, 30_000, n)).clip(8_000, 500_000)
existing_emis = np.abs(np.random.normal(8_000, 6_000, n)).clip(0, 80_000)
credit_score  = np.abs(np.random.normal(680, 80, n)).clip(300, 900)
employment_yr = np.abs(np.random.normal(4, 3, n)).clip(0, 30)
loan_amount   = np.abs(np.random.normal(200_000, 150_000, n)).clip(10_000, 2_000_000)
loan_type     = np.random.choice(['personal', 'home', 'auto', 'education'], n)
city_tier     = np.random.choice(['tier1', 'tier2', 'tier3'], n)

default_score = (
    -(credit_score-680)/80*0.40 + (existing_emis/income)*0.30
    + (loan_amount/income/12)*0.20 - employment_yr/30*0.10
    + np.random.randn(n)*0.15
)
y = (default_score > 0.3).astype(int)

import pandas as pd
df = pd.DataFrame({
    'income': income, 'existing_emis': existing_emis,
    'credit_score': credit_score, 'employment_yr': employment_yr,
    'loan_amount': loan_amount, 'loan_type': loan_type, 'city_tier': city_tier,
})
NUM_COLS = ['income','existing_emis','credit_score','employment_yr','loan_amount']
CAT_COLS = ['loan_type','city_tier']

from sklearn.model_selection import train_test_split
X_tr, X_te, y_tr, y_te = train_test_split(df, y, test_size=0.15,
                                            stratify=y, random_state=42)
ct = ColumnTransformer([
    ('num', 'passthrough', NUM_COLS),
    ('cat', OrdinalEncoder(handle_unknown='use_encoded_value',
                           unknown_value=-1), CAT_COLS),
])
X_tr_enc = ct.fit_transform(X_tr)
X_te_enc = ct.transform(X_te)

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

# ── XGBoost objective ──────────────────────────────────────────────────
def xgb_objective(trial):
    params = {
        'n_estimators':      trial.suggest_int('n_estimators', 100, 1000),
        'learning_rate':     trial.suggest_float('learning_rate', 0.005, 0.3, log=True),
        'max_depth':         trial.suggest_int('max_depth', 2, 8),
        'subsample':         trial.suggest_float('subsample', 0.5, 1.0),
        'colsample_bytree':  trial.suggest_float('colsample_bytree', 0.4, 1.0),
        'reg_alpha':         trial.suggest_float('reg_alpha', 1e-8, 10.0, log=True),
        'reg_lambda':        trial.suggest_float('reg_lambda', 1e-8, 10.0, log=True),
        'gamma':             trial.suggest_float('gamma', 0, 5),
        'min_child_weight':  trial.suggest_int('min_child_weight', 1, 10),
        'scale_pos_weight':  (y_tr == 0).sum() / (y_tr == 1).sum(),
        'eval_metric': 'auc', 'verbosity': 0, 'random_state': 42,
    }
    model  = xgb.XGBClassifier(**params)
    scores = cross_val_score(model, X_tr_enc, y_tr, cv=cv,
                              scoring='roc_auc', n_jobs=-1)
    return scores.mean()

# ── LightGBM objective ─────────────────────────────────────────────────
def lgb_objective(trial):
    params = {
        'n_estimators':      trial.suggest_int('n_estimators', 100, 1000),
        'learning_rate':     trial.suggest_float('learning_rate', 0.005, 0.3, log=True),
        'num_leaves':        trial.suggest_int('num_leaves', 15, 255),
        'subsample':         trial.suggest_float('subsample', 0.5, 1.0),
        'colsample_bytree':  trial.suggest_float('colsample_bytree', 0.4, 1.0),
        'reg_alpha':         trial.suggest_float('reg_alpha', 1e-8, 10.0, log=True),
        'reg_lambda':        trial.suggest_float('reg_lambda', 1e-8, 10.0, log=True),
        'min_child_samples': trial.suggest_int('min_child_samples', 5, 100),
        'is_unbalance': True, 'verbose': -1, 'random_state': 42, 'n_jobs': -1,
    }
    model  = lgb.LGBMClassifier(**params)
    scores = cross_val_score(model, X_tr_enc, y_tr, cv=cv,
                              scoring='roc_auc', n_jobs=-1)
    return scores.mean()

# ── Run both studies ───────────────────────────────────────────────────
print("Tuning XGBoost with Optuna (30 trials)...")
xgb_study = optuna.create_study(direction='maximize',
                                  sampler=optuna.samplers.TPESampler(seed=42))
xgb_study.optimize(xgb_objective, n_trials=30)

print("Tuning LightGBM with Optuna (30 trials)...")
lgb_study = optuna.create_study(direction='maximize',
                                  sampler=optuna.samplers.TPESampler(seed=42))
lgb_study.optimize(lgb_objective, n_trials=30)

print(f"\nResults:")
print(f"  XGBoost  best CV AUC: {xgb_study.best_value:.4f}")
print(f"  LightGBM best CV AUC: {lgb_study.best_value:.4f}")

# ── Retrain best model on full training set, evaluate on test ──────────
winner = 'XGBoost' if xgb_study.best_value >= lgb_study.best_value else 'LightGBM'
if winner == 'XGBoost':
    best_params = xgb_study.best_params
    best_params.update({'scale_pos_weight': (y_tr==0).sum()/(y_tr==1).sum(),
                         'eval_metric': 'auc', 'verbosity': 0, 'random_state': 42})
    final_model = xgb.XGBClassifier(**best_params)
else:
    best_params = lgb_study.best_params
    best_params.update({'is_unbalance': True, 'verbose': -1,
                         'random_state': 42, 'n_jobs': -1})
    final_model = lgb.LGBMClassifier(**best_params)

final_model.fit(X_tr_enc, y_tr)
test_auc = roc_auc_score(y_te, final_model.predict_proba(X_te_enc)[:, 1])
print(f"\n  Winner: {winner}")
print(f"  Test AUC (final): {test_auc:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — PRACTICAL GUIDELINES ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>How to tune efficiently in practice</span>
        <h2 style={S.h2}>A systematic tuning workflow — what to tune first, how many trials</h2>

        <p style={S.p}>
          Tuning all hyperparameters simultaneously with a flat search space
          is inefficient. Some parameters matter far more than others.
          A systematic order dramatically reduces the trials needed.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              phase: 'Phase 1 — Coarse search',
              color: '#D85A30',
              params: 'learning_rate × n_estimators — the most impactful pair',
              trials: '20–30 trials',
              goal: 'Find the right learning rate range. Low lr needs many trees. High lr needs few. Fix the relationship before tuning anything else.',
            },
            {
              phase: 'Phase 2 — Tree structure',
              color: '#BA7517',
              params: 'max_depth (or num_leaves for LightGBM), min_child_samples',
              trials: '20 trials, fix Phase 1 best lr',
              goal: 'Control model complexity. Deeper trees = more capacity but more overfitting. min_child_samples prevents leaf overfitting.',
            },
            {
              phase: 'Phase 3 — Regularisation',
              color: '#378ADD',
              params: 'subsample, colsample_bytree, reg_alpha, reg_lambda, gamma',
              trials: '30 trials, fix Phase 1+2 best values',
              goal: 'Fine-tune generalisation. These parameters have diminishing impact — tune after structure is fixed.',
            },
            {
              phase: 'Phase 4 — Joint refinement',
              color: '#1D9E75',
              params: 'All parameters together, narrow ranges around Phase 1–3 best values',
              trials: '30–50 trials',
              goal: 'Final polish. The search space is now small and well-targeted. Optuna finds the global optimum quickly.',
            },
          ].map((item) => (
            <div key={item.phase} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '12px 16px',
              display: 'grid', gridTemplateColumns: '140px 1fr',
              gap: 14, alignItems: 'start',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 4, fontFamily: 'var(--font-display)' }}>
                  {item.phase}
                </div>
                <div style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)' }}>
                  {item.trials}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                  {item.params}
                </div>
                <p style={{ ...S.ps, marginBottom: 0 }}>{item.goal}</p>
              </div>
            </div>
          ))}
        </div>

        <CodeBlock code={`import numpy as np
import optuna
import lightgbm as lgb
from sklearn.model_selection import cross_val_score, StratifiedKFold
import warnings
warnings.filterwarnings('ignore')
optuna.logging.set_verbosity(optuna.logging.WARNING)

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
X = np.column_stack([income, existing_emis, credit_score, employment_yr, loan_amount])

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

# ── Phase 1: learning_rate + n_estimators only ─────────────────────────
def phase1_objective(trial):
    params = dict(
        learning_rate = trial.suggest_float('learning_rate', 0.005, 0.3, log=True),
        n_estimators  = trial.suggest_int('n_estimators', 100, 2000),
        # fix others at sensible defaults
        num_leaves=31, subsample=0.8, colsample_bytree=0.8,
        reg_alpha=0.1, reg_lambda=1.0, min_child_samples=20,
        verbose=-1, random_state=42, n_jobs=-1,
    )
    return cross_val_score(lgb.LGBMClassifier(**params), X, y,
                            cv=cv, scoring='roc_auc', n_jobs=-1).mean()

s1 = optuna.create_study(direction='maximize',
                          sampler=optuna.samplers.TPESampler(seed=42))
s1.optimize(phase1_objective, n_trials=20)
best_lr  = s1.best_params['learning_rate']
best_n   = s1.best_params['n_estimators']
print(f"Phase 1: lr={best_lr:.4f}  n_estimators={best_n}  AUC={s1.best_value:.4f}")

# ── Phase 2: tree structure, fix Phase 1 ──────────────────────────────
def phase2_objective(trial):
    params = dict(
        learning_rate = best_lr,
        n_estimators  = best_n,
        num_leaves    = trial.suggest_int('num_leaves', 15, 255),
        min_child_samples = trial.suggest_int('min_child_samples', 5, 100),
        subsample=0.8, colsample_bytree=0.8,
        reg_alpha=0.1, reg_lambda=1.0,
        verbose=-1, random_state=42, n_jobs=-1,
    )
    return cross_val_score(lgb.LGBMClassifier(**params), X, y,
                            cv=cv, scoring='roc_auc', n_jobs=-1).mean()

s2 = optuna.create_study(direction='maximize',
                          sampler=optuna.samplers.TPESampler(seed=42))
s2.optimize(phase2_objective, n_trials=20)
best_leaves = s2.best_params['num_leaves']
best_mcs    = s2.best_params['min_child_samples']
print(f"Phase 2: num_leaves={best_leaves}  min_child_samples={best_mcs}  AUC={s2.best_value:.4f}")

# ── Phase 3+4: regularisation + joint refinement ──────────────────────
def phase3_objective(trial):
    params = dict(
        learning_rate     = trial.suggest_float('lr', best_lr*0.5, best_lr*2, log=True),
        n_estimators      = trial.suggest_int('n_est', int(best_n*0.7), int(best_n*1.5)),
        num_leaves        = trial.suggest_int('leaves', max(15, best_leaves-30), best_leaves+30),
        min_child_samples = trial.suggest_int('mcs', max(5, best_mcs-15), best_mcs+15),
        subsample         = trial.suggest_float('subsample', 0.6, 1.0),
        colsample_bytree  = trial.suggest_float('colsample_bytree', 0.5, 1.0),
        reg_alpha         = trial.suggest_float('reg_alpha', 1e-8, 5.0, log=True),
        reg_lambda        = trial.suggest_float('reg_lambda', 1e-8, 5.0, log=True),
        verbose=-1, random_state=42, n_jobs=-1,
    )
    return cross_val_score(lgb.LGBMClassifier(**params), X, y,
                            cv=cv, scoring='roc_auc', n_jobs=-1).mean()

s3 = optuna.create_study(direction='maximize',
                          sampler=optuna.samplers.TPESampler(seed=42))
s3.optimize(phase3_objective, n_trials=30)
print(f"Phase 3: AUC={s3.best_value:.4f}  ← final best")
print(f"\nFull best params:")
for k, v in s3.best_params.items():
    print(f"  {k:<18}: {v}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common tuning mistake — explained and fixed</h2>

        <ErrorBlock
          error="Optuna best CV AUC = 0.94 but test AUC = 0.81 — hyperparameter overfitting"
          cause="You ran too many trials on a small dataset. With 500 trials and 1,000 samples, Optuna effectively searched through enough combinations that some got lucky on the CV folds by chance — the same overfitting problem as testing many models on the same test set. The chosen hyperparameters are optimised for those specific CV folds, not for generalisation."
          fix="Use nested cross-validation from Module 37. Limit n_trials relative to dataset size — for 1,000 samples, 30–50 trials is plenty. Use RepeatedStratifiedKFold inside the objective so each trial is evaluated on more than 5 folds, making it harder to get lucky. Hold out a final test set that is never seen during Optuna optimisation."
        />

        <ErrorBlock
          error="Optuna study raises optuna.exceptions.StorageInternalError on SQLite"
          cause="Multiple parallel Optuna workers writing to the same SQLite file simultaneously causes database lock conflicts. SQLite is not designed for high-concurrency writes. This happens when you use n_jobs=-1 in study.optimize() with a SQLite storage backend — each parallel worker tries to write trial results at the same time."
          fix="For parallel optimisation with persistence, use PostgreSQL or MySQL as the storage backend instead of SQLite: storage='postgresql://user:pass@localhost/optuna'. For SQLite with parallelism, use the RDBStorage with check_same_thread=False. For in-memory parallel studies without persistence, simply remove the storage argument — Optuna runs parallel trials safely in memory."
        />

        <ErrorBlock
          error="Best hyperparameters from Optuna are worse than sklearn defaults"
          cause="The search space was too narrow, started at bad values, or the objective function had a bug. Common mistakes: setting log=True on a parameter that does not benefit from log scale (like max_depth), defining a range that excludes the true optimum (e.g. learning_rate between 0.1 and 0.3 when 0.01 is actually best), or a bug in the objective that returns a constant value."
          fix="Start with wide search spaces — you can narrow later. Always verify the objective function works for a single trial before running the full study: trial = study.ask(); value = objective(trial); study.tell(trial, value). Print the best params and manually verify they are within the expected range. Compare against RandomizedSearchCV with the same n_iter as a sanity check."
        />

        <ErrorBlock
          error="Optuna keeps sampling the same hyperparameter values — no exploration"
          cause="The study has too few initial random trials before TPE kicks in. TPE needs at least n_startup_trials (default 10) random trials to build its initial surrogate model. If you run fewer than 10 trials, TPE has no data and falls back to random sampling — which looks like repetition when trials happen to land on similar values."
          fix="Always run at least 20 trials — the first 10 are random exploration, the next 10+ are Bayesian exploitation. You can control this explicitly: TPESampler(n_startup_trials=10). For very expensive objectives where 20 trials is unaffordable, use optuna.samplers.CmaEsSampler which requires fewer startup trials. Never run Optuna with n_trials < 15."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can tune any model. Next: explain any prediction.
        </h2>

        <p style={S.p}>
          You have built, evaluated, calibrated, and tuned models.
          The final module in the Evaluation section answers the question
          stakeholders always ask after seeing the model performance:
          why did the model make this specific prediction?
          Module 39 covers SHAP and LIME — the two most widely used
          techniques for explaining individual predictions from any model.
          SHAP was introduced briefly in Module 30 for XGBoost.
          Module 39 covers it comprehensively across all model types
          including black-box models with no direct feature importance.
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
              Next — Module 39 · Model Evaluation
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Model Interpretability — SHAP and LIME
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Explain any individual prediction. Global feature importance,
              local explanations, and how to present model decisions to regulators.
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
          'GridSearchCV evaluates every combination exhaustively — combinatorial explosion makes it unusable beyond 3 parameters. RandomizedSearchCV samples n_iter random combinations — better but still learns nothing between trials. Optuna uses Bayesian optimisation (TPE) to focus each new trial on promising regions based on all previous results.',
          'The Optuna API has three pieces: create_study (the session), an objective function (trains and evaluates one hyperparameter combination, returns a score), and study.optimize (runs the objective n_trials times). Everything else — sampling, pruning, persistence — builds on this core.',
          'Use trial.suggest_float with log=True for parameters that span orders of magnitude: learning_rate (0.001 to 0.3), reg_alpha (1e-8 to 10). Log-uniform sampling ensures equal exploration at each magnitude. Use trial.suggest_int for discrete parameters like n_estimators, max_depth, num_leaves.',
          'Pruning stops unpromising trials early — report intermediate scores with trial.report() and check trial.should_prune() inside the CV loop. MedianPruner prunes any trial whose intermediate score falls below the median of completed trials at the same step. Saves 30–50% compute on expensive models.',
          'Tune in phases for large search spaces: learning_rate + n_estimators first (biggest impact), then tree structure, then regularisation, then joint refinement in a narrow range around the best values. This finds the optimum with far fewer total trials than a flat all-parameters-at-once search.',
          'Optuna studies are persistent — save to SQLite or PostgreSQL with the storage argument, set load_if_exists=True to resume. This lets you run 20 trials today, stop, and add 20 more tomorrow. The surrogate model continues improving from where it left off.',
        ]}
      />
    </LearnLayout>
  )
}
