import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Experiment Tracking with MLflow and Weights & Biases — Chaduvuko',
  description:
    'Log every run, compare experiments, version models, register artifacts. Never lose a good experiment again.',
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

function ConceptBox({ title, children, color = '#7b61ff' }: {
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

export default function ExperimentTrackingPage() {
  return (
    <LearnLayout
      title="Experiment Tracking with MLflow and Weights & Biases"
      description="Log every run, compare experiments, version models, register artifacts. Never lose a good experiment again."
      section="MLOps and Production"
      readTime="40–45 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="mlops" topic="experiment-tracking" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — why experiment tracking exists</span>
        <h2 style={S.h2}>
          Three weeks ago you trained a model that got 94% accuracy.
          Today you cannot reproduce it. You do not remember the learning rate,
          the data version, or which features you included.
          Experiment tracking means this never happens.
        </h2>

        <p style={S.p}>
          Every ML project goes through dozens of experiments — different models,
          different hyperparameters, different feature sets, different data slices.
          Without tracking, all of this knowledge lives in your head and in
          notebook filenames like <span style={S.code as React.CSSProperties}>model_final_v3_actually_final.ipynb</span>.
          When the model degrades in production six months later, you cannot
          reproduce the best version. When a new team member joins, the entire
          experiment history is lost.
        </p>

        <p style={S.p}>
          Experiment tracking tools solve this by automatically recording every run:
          the hyperparameters, metrics at every epoch, code version, data version,
          environment, and output artifacts. Two runs can be compared side by side.
          The best model can be registered and promoted to production with a full
          audit trail. Every Indian ML team of more than two people needs this.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A chef's recipe book vs cooking from memory. A chef who cooks from
            memory might produce excellent dishes — but cannot replicate them
            exactly next week, cannot scale the recipe for 200 people, and cannot
            hand the recipe to a junior chef. A chef who writes down every recipe
            with precise measurements can reproduce any dish, compare two versions
            of the same dish scientifically, and build on past experiments.
            Experiment tracking is the recipe book for ML.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The discipline of logging experiments also forces clarity of thought.
            When you must decide what to log before running an experiment,
            you think more carefully about what you are trying to learn.
            Untracked experiments are usually under-thought experiments.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          MLflow is free, self-hostable, and integrates with every ML framework.
          Weights & Biases has a free tier and is preferred for deep learning.
          Both do the same core thing — choose based on whether you need
          a self-hosted solution (MLflow) or richer visualisations (W&B).
          Install: <span style={S.code as React.CSSProperties}>pip install mlflow wandb scikit-learn</span>.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — WHAT TO TRACK ═══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What gets logged</span>
        <h2 style={S.h2}>Parameters, metrics, artifacts, and tags — the four things every run must record</h2>

        <VisualBox label="Four logging categories — what each one captures">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                category: 'Parameters',
                color: '#7b61ff',
                what: 'Inputs to the experiment — hyperparameters, config, feature list, data version',
                examples: 'learning_rate=0.01, n_estimators=200, max_depth=4, feature_set="v3", data_cutoff="2026-03-01"',
                when: 'Log before training — log_param() for single values, log_params() for a dict',
                why: 'Reproduce any experiment exactly by knowing its parameters',
              },
              {
                category: 'Metrics',
                color: '#1D9E75',
                what: 'Outputs of the experiment — performance numbers, computed at various steps',
                examples: 'val_mae=5.8, train_mae=4.2, val_auc=0.94, epoch=10, training_time_s=145',
                when: 'Log throughout training (step-level) and at the end (final summary)',
                why: 'Compare runs on a single number. Plot learning curves. Detect overfitting.',
              },
              {
                category: 'Artifacts',
                color: '#D85A30',
                what: 'Files produced by the experiment — model files, plots, feature importance, confusion matrices',
                examples: 'model.pkl, feature_importance.png, confusion_matrix.csv, requirements.txt',
                when: 'Log after training — log_artifact() for a file, log_model() for a trained model',
                why: 'Retrieve and deploy any logged model without re-training',
              },
              {
                category: 'Tags',
                color: '#378ADD',
                what: 'Free-form labels for filtering and grouping experiments in the UI',
                examples: 'team="fraud-ml", model_type="gradient_boosting", status="baseline", dataset="swiggy_orders_q1"',
                when: 'Log anytime — set_tag() for key-value labels',
                why: 'Filter the experiment table. Group related experiments. Mark production candidates.',
              },
            ].map((item) => (
              <div key={item.category} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 7, padding: '10px 12px',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 6 }}>
                  {item.category}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <p style={{ ...S.ps, marginBottom: 4, fontSize: 11 }}>{item.what}</p>
                    <div style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                      e.g. {item.examples}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: item.color, marginBottom: 4 }}>When: {item.when}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>Why: {item.why}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>
      </div>

      <Div />

      {/* ══ SECTION 3 — MLFLOW ══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Tool 1</span>
        <h2 style={S.h2}>MLflow — self-hosted experiment tracking with model registry</h2>

        <p style={S.p}>
          MLflow is four tools in one: Tracking (log experiments), Projects
          (reproducible code packaging), Models (standard model format),
          and Registry (model versioning and promotion). For most teams
          the Tracking and Registry components are what matter.
          MLflow runs a local server by default — no cloud account required.
          For production: run the MLflow server backed by PostgreSQL and S3.
        </p>

        <CodeBlock code={`# pip install mlflow scikit-learn pandas numpy

import mlflow
import mlflow.sklearn
import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor
from sklearn.linear_model import Ridge
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler
import time, json, os

# ── Start MLflow server locally ───────────────────────────────────────
# mlflow server --host 0.0.0.0 --port 5000
# Then set: mlflow.set_tracking_uri("http://localhost:5000")
# For this demo: use local file store
mlflow.set_tracking_uri('file:///tmp/mlruns')

# ── Create or set experiment ──────────────────────────────────────────
mlflow.set_experiment('swiggy-delivery-time-prediction')

# ── Synthetic dataset ─────────────────────────────────────────────────
np.random.seed(42)
n = 3000
X = pd.DataFrame({
    'restaurant_avg_delivery_time':  np.random.normal(35, 8, n),
    'driver_avg_delivery_time':      np.random.normal(32, 7, n),
    'distance_km':                   np.random.exponential(3, n),
    'is_peak_hour':                  np.random.randint(0, 2, n),
    'order_value':                   np.random.exponential(400, n),
    'restaurant_7d_order_count':     np.random.randint(50, 500, n),
    'driver_completed_orders':       np.random.randint(100, 1000, n),
})
y = (X['distance_km'] * 6 +
     X['restaurant_avg_delivery_time'] * 0.4 +
     X['is_peak_hour'] * 8 +
     np.random.normal(0, 5, n)).clip(10, 90)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ── Run 1: GradientBoosting baseline ─────────────────────────────────
def train_and_log(model, params: dict, model_name: str,
                   tags: dict = None) -> str:
    """Train a model and log everything to MLflow."""
    with mlflow.start_run(run_name=model_name) as run:
        # Log parameters
        mlflow.log_params(params)

        # Log tags for filtering
        mlflow.set_tag('model_type', model_name)
        mlflow.set_tag('dataset_version', 'v1.0')
        mlflow.set_tag('team', 'delivery-ml')
        if tags:
            for k, v in tags.items():
                mlflow.set_tag(k, str(v))

        # Train
        start = time.time()
        model.fit(X_train, y_train)
        train_time = time.time() - start

        # Evaluate
        train_preds = model.predict(X_train)
        test_preds  = model.predict(X_test)

        train_mae = mean_absolute_error(y_train, train_preds)
        test_mae  = mean_absolute_error(y_test,  test_preds)
        test_rmse = mean_squared_error(y_test,  test_preds, squared=False)
        test_r2   = r2_score(y_test, test_preds)

        # Cross-validation
        cv_scores = cross_val_score(model, X_train, y_train,
                                     cv=5, scoring='neg_mean_absolute_error')
        cv_mae = -cv_scores.mean()

        # Log metrics
        mlflow.log_metric('train_mae',   train_mae)
        mlflow.log_metric('test_mae',    test_mae)
        mlflow.log_metric('test_rmse',   test_rmse)
        mlflow.log_metric('test_r2',     test_r2)
        mlflow.log_metric('cv_mae',      cv_mae)
        mlflow.log_metric('cv_mae_std',  cv_scores.std())
        mlflow.log_metric('train_time_s', train_time)

        # Log step-level metrics (simulated epochs)
        for step in range(1, params.get('n_estimators', 100) + 1, 20):
            mlflow.log_metric('staged_test_mae', test_mae * (1 + 0.5/step), step=step)

        # Log model
        mlflow.sklearn.log_model(
            model, artifact_path='model',
            registered_model_name=f'delivery-time-{model_name}',
        )

        # Log feature importance as artifact
        if hasattr(model, 'feature_importances_'):
            fi = pd.DataFrame({
                'feature':   X.columns,
                'importance': model.feature_importances_,
            }).sort_values('importance', ascending=False)
            fi_path = '/tmp/feature_importance.csv'
            fi.to_csv(fi_path, index=False)
            mlflow.log_artifact(fi_path, artifact_path='analysis')

        print(f"  {model_name:<30}: test_mae={test_mae:.3f}  "
              f"cv_mae={cv_mae:.3f}  time={train_time:.1f}s  "
              f"run_id={run.info.run_id[:8]}...")
        return run.info.run_id

print("Running experiments:")
run_ids = {}

# Experiment 1: GradientBoosting
gb_params = {'n_estimators': 200, 'max_depth': 4, 'learning_rate': 0.05,
              'min_samples_leaf': 5, 'subsample': 0.8}
run_ids['gb'] = train_and_log(
    GradientBoostingRegressor(**gb_params, random_state=42),
    gb_params, 'GradientBoosting',
)

# Experiment 2: RandomForest
rf_params = {'n_estimators': 200, 'max_depth': 8, 'min_samples_leaf': 5}
run_ids['rf'] = train_and_log(
    RandomForestRegressor(**rf_params, random_state=42),
    rf_params, 'RandomForest',
)

# Experiment 3: Ridge regression baseline
ridge_params = {'alpha': 10.0}
scaler = StandardScaler()
X_train_sc = scaler.fit_transform(X_train)
X_test_sc  = scaler.transform(X_test)
with mlflow.start_run(run_name='Ridge-baseline') as run:
    mlflow.log_params(ridge_params)
    mlflow.set_tag('model_type', 'linear')
    model = Ridge(**ridge_params).fit(X_train_sc, y_train)
    preds = model.predict(X_test_sc)
    mlflow.log_metric('test_mae', mean_absolute_error(y_test, preds))
    mlflow.log_metric('test_r2',  r2_score(y_test, preds))
    run_ids['ridge'] = run.info.run_id
    print(f"  {'Ridge-baseline':<30}: test_mae={mean_absolute_error(y_test, preds):.3f}")

# ── Compare runs programmatically ─────────────────────────────────────
client = mlflow.tracking.MlflowClient()
experiment = mlflow.get_experiment_by_name('swiggy-delivery-time-prediction')
runs = client.search_runs(
    experiment_ids=[experiment.experiment_id],
    order_by=['metrics.test_mae ASC'],
)

print(f"\nExperiment comparison (sorted by test MAE):")
print(f"  {'Run name':<30} {'test_mae':>10} {'test_r2':>8} {'train_time':>12}")
print("  " + "─" * 62)
for run in runs[:5]:
    name      = run.data.tags.get('mlflow.runName', run.info.run_id[:8])
    test_mae  = run.data.metrics.get('test_mae', float('nan'))
    test_r2   = run.data.metrics.get('test_r2',  float('nan'))
    train_t   = run.data.metrics.get('train_time_s', float('nan'))
    print(f"  {name:<30} {test_mae:>10.4f} {test_r2:>8.4f} {train_t:>12.1f}s")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — MODEL REGISTRY ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>From experiment to production</span>
        <h2 style={S.h2}>MLflow Model Registry — version, stage, and promote models safely</h2>

        <p style={S.p}>
          The Model Registry is where experiments become deployable artifacts.
          Every registered model has a version number, a stage (Staging or Production),
          and full metadata including which run produced it.
          Promotion from Staging to Production requires explicit action —
          this is the deployment gate. The inference service always loads
          the Production-stage model by name, never by run ID.
        </p>

        <ConceptBox title="Model Registry lifecycle — four stages">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { stage: 'None', color: '#888', desc: 'Freshly registered — not yet reviewed. Automatically assigned when log_model() is called with registered_model_name.' },
              { stage: 'Staging', color: '#BA7517', desc: 'Passed automated quality gates. Under human review. Loaded by staging inference endpoint for A/B testing.' },
              { stage: 'Production', color: '#1D9E75', desc: 'Approved for production traffic. Inference service loads this version. Only one version at a time is Production.' },
              { stage: 'Archived', color: '#D85A30', desc: 'Replaced by a newer version. Preserved for rollback. Never deleted — provides full audit trail.' },
            ].map((item) => (
              <div key={item.stage} style={{
                display: 'grid', gridTemplateColumns: '100px 1fr',
                gap: 10, background: 'var(--bg2)',
                borderRadius: 4, padding: '6px 10px',
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.stage}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </ConceptBox>

        <CodeBlock code={`import mlflow
from mlflow.tracking import MlflowClient

mlflow.set_tracking_uri('file:///tmp/mlruns')
client = MlflowClient()

MODEL_NAME = 'delivery-time-GradientBoosting'

# ── Register a model from a run ───────────────────────────────────────
# (Already done via registered_model_name in log_model() above)
# Manual registration from a run:
# result = mlflow.register_model(
#     model_uri=f"runs:/{run_id}/model",
#     name=MODEL_NAME,
# )

# ── List all versions of a model ──────────────────────────────────────
try:
    versions = client.search_model_versions(f"name='{MODEL_NAME}'")
    print(f"Model versions for '{MODEL_NAME}':")
    for v in versions:
        print(f"  Version {v.version}: stage={v.current_stage}  "
              f"run_id={v.run_id[:8]}  status={v.status}")
except Exception:
    print(f"Model '{MODEL_NAME}' not yet registered (run experiments first)")

# ── Promote a version through stages ─────────────────────────────────
def promote_model(model_name: str, version: int,
                   stage: str, comment: str = ''):
    """
    Promote a model version to a new stage.
    stage: 'Staging', 'Production', or 'Archived'
    """
    client.transition_model_version_stage(
        name=model_name,
        version=version,
        stage=stage,
        archive_existing_versions=(stage == 'Production'),
    )
    if comment:
        client.update_model_version(
            name=model_name, version=version, description=comment,
        )
    print(f"  Model {model_name} v{version} → {stage}")

# promote_model(MODEL_NAME, version=1, stage='Staging',
#               comment='Passed automated quality gate: test_mae=5.8')
# promote_model(MODEL_NAME, version=1, stage='Production',
#               comment='Approved by ML lead. Replacing v0.')

# ── Load production model in inference service ─────────────────────────
def load_production_model(model_name: str):
    """
    Load the current Production-stage model.
    This is how the inference service should load models —
    always by name and stage, never by run_id.
    """
    model_uri = f"models:/{model_name}/Production"
    # model = mlflow.sklearn.load_model(model_uri)
    # return model
    print(f"  Loading: {model_uri}")
    print(f"  (In production: mlflow.sklearn.load_model('{model_uri}'))")

load_production_model(MODEL_NAME)

# ── Automated promotion pipeline ──────────────────────────────────────
def auto_promote_if_better(model_name: str, new_run_id: str,
                             metric: str = 'test_mae',
                             better_fn = min) -> bool:
    """
    Compare new model to current production model.
    Promote to staging if better, reject otherwise.
    """
    # Get new model metrics
    new_run   = client.get_run(new_run_id)
    new_value = new_run.data.metrics.get(metric)
    if new_value is None:
        print(f"  New run missing metric '{metric}'")
        return False

    # Get current production metrics
    try:
        prod_versions = [v for v in client.search_model_versions(f"name='{model_name}'")
                          if v.current_stage == 'Production']
        if prod_versions:
            prod_run_id = prod_versions[0].run_id
            prod_run    = client.get_run(prod_run_id)
            prod_value  = prod_run.data.metrics.get(metric, float('inf'))
            is_better   = better_fn(new_value, prod_value) == new_value
            print(f"  New {metric}={new_value:.4f} vs Production {metric}={prod_value:.4f}: "
                  f"{'✓ better' if is_better else '✗ worse'}")
            return is_better
        else:
            print(f"  No current production model — promoting as first production version")
            return True
    except Exception:
        return True

print("\nAutomated promotion check:")
if run_ids.get('gb'):
    result = auto_promote_if_better(MODEL_NAME, run_ids['gb'])
    print(f"  Promote to staging: {result}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — WEIGHTS AND BIASES ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Tool 2 — deep learning focus</span>
        <h2 style={S.h2}>Weights & Biases — richer visualisations and collaboration for deep learning</h2>

        <p style={S.p}>
          W&B excels where MLflow is weaker: visualising training curves,
          logging images and audio, comparing runs interactively in a web UI,
          and team collaboration. The free tier is generous enough for most
          individual ML engineers. Setup is one line of code — just call
          <span style={S.code as React.CSSProperties}> wandb.init()</span> and every subsequent
          print, metric, or artifact is automatically captured.
        </p>

        <CodeBlock code={`# pip install wandb torch torchvision

import wandb
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np

# ── W&B quickstart — three lines to add full tracking ─────────────────
# wandb.login()   # first time: paste API key from wandb.ai/authorize

# ── Full W&B training loop for a neural network ───────────────────────
def train_with_wandb(config: dict = None):
    """
    Train a model with full W&B experiment tracking.
    Pass config dict or use wandb.config for hyperparameter sweeps.
    """
    run = wandb.init(
        project='swiggy-delivery-prediction',
        name=f"mlp-lr{config.get('lr', 0.001):.0e}",
        config=config or {},
        tags=['neural-network', 'delivery-time'],
        notes='MLP baseline for delivery time regression',
        # group='experiment-batch-1',   # group related runs
    )

    cfg = wandb.config   # use config from W&B for sweep support

    # Synthetic data
    np.random.seed(42)
    n = 2000
    X = torch.randn(n, 7)
    y = (X[:, 2].abs() * 6 + X[:, 0] * 3 + torch.randn(n) * 5).unsqueeze(1)

    X_train, X_val = X[:1600], X[1600:]
    y_train, y_val = y[:1600], y[1600:]

    # Model
    model = nn.Sequential(
        nn.Linear(7, 64), nn.ReLU(), nn.Dropout(0.2),
        nn.Linear(64, 32), nn.ReLU(),
        nn.Linear(32, 1),
    )

    # W&B: watch model — logs gradients and parameters every N steps
    wandb.watch(model, log='all', log_freq=50)

    optimizer = optim.Adam(model.parameters(), lr=cfg.lr)
    criterion = nn.MSELoss()

    best_val_loss = float('inf')
    for epoch in range(cfg.epochs):
        model.train()
        optimizer.zero_grad()
        pred      = model(X_train)
        train_loss = criterion(pred, y_train)
        train_loss.backward()
        optimizer.step()

        model.eval()
        with torch.no_grad():
            val_pred = model(X_val)
            val_loss = criterion(val_pred, y_val)
            val_mae  = (val_pred - y_val).abs().mean().item()

        # W&B: log metrics every epoch
        wandb.log({
            'epoch':      epoch,
            'train_loss': train_loss.item(),
            'val_loss':   val_loss.item(),
            'val_mae':    val_mae,
            'lr':         optimizer.param_groups[0]['lr'],
        })

        if val_loss.item() < best_val_loss:
            best_val_loss = val_loss.item()
            # W&B: save best model as artifact
            torch.save(model.state_dict(), '/tmp/best_model.pt')
            artifact = wandb.Artifact(
                name='delivery-time-mlp',
                type='model',
                description=f'Best model at epoch {epoch}, val_mae={val_mae:.3f}',
                metadata={'val_mae': val_mae, 'epoch': epoch},
            )
            artifact.add_file('/tmp/best_model.pt')
            run.log_artifact(artifact)

    wandb.summary['best_val_mae'] = val_mae
    wandb.finish()
    return best_val_loss

print("""
# Run a single experiment:
train_with_wandb(config={'lr': 0.001, 'epochs': 50})

# W&B automatically creates:
# - Learning curve plots (train/val loss over epochs)
# - Gradient flow visualisations
# - System metrics (GPU utilisation, memory)
# - Model artifact with version history
# - Shareable run URL for team collaboration
""")

# ── W&B Sweeps — automated hyperparameter search ──────────────────────
SWEEP_CONFIG = {
    'method': 'bayes',   # bayesian optimisation, or 'random', 'grid'
    'metric': {
        'name':  'val_mae',
        'goal':  'minimize',
    },
    'parameters': {
        'lr':     {'distribution': 'log_uniform_values', 'min': 1e-4, 'max': 1e-2},
        'epochs': {'values': [30, 50, 100]},
    },
    'early_terminate': {
        'type':   'hyperband',
        'min_iter': 10,
    },
}

print("W&B Sweep configuration:")
print(f"  Method:     {SWEEP_CONFIG['method']} (bayesian optimisation)")
print(f"  Metric:     minimize val_mae")
print(f"  LR range:   1e-4 to 1e-2 (log scale)")
print(f"  Epochs:     30, 50, or 100")
print("""
# Start sweep:
# sweep_id = wandb.sweep(SWEEP_CONFIG, project='swiggy-delivery-prediction')
# wandb.agent(sweep_id, function=train_with_wandb, count=20)
# → Runs 20 experiments, bayesian-optimises hyperparameters
# → Best config highlighted automatically in W&B dashboard
""")

# ── MLflow vs W&B comparison ──────────────────────────────────────────
print("MLflow vs W&B — when to use each:")
comparison = [
    ('Setup',           'pip install + local server',  'pip install + wandb.login()'),
    ('Hosting',         'Self-hosted or managed',       'Cloud (free tier available)'),
    ('Model registry',  'Built-in, enterprise-ready',  'W&B Artifacts (less mature)'),
    ('Training curves', 'Basic charts',                'Rich interactive charts'),
    ('Image logging',   'As files only',               'First-class: wandb.Image()'),
    ('Sweeps/HPO',      'External (Optuna)',            'Built-in sweep agent'),
    ('Team features',   'Limited',                     'Reports, alerts, comments'),
    ('Best for',        'Classical ML, prod registry', 'Deep learning, research'),
    ('Cost at scale',   'Free (self-hosted)',           'Paid above free tier'),
]
print(f"  {'Dimension':<18} {'MLflow':>30} {'W&B':>30}")
print("  " + "─" * 80)
for dim, mlf, wb in comparison:
    print(f"  {dim:<18} {mlf:>30} {wb:>30}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — TEAM WORKFLOW ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Making it a team habit</span>
        <h2 style={S.h2}>Experiment tracking conventions — what to standardise across the team</h2>

        <CodeBlock code={`import mlflow
import os
from functools import wraps
from datetime import datetime

mlflow.set_tracking_uri('file:///tmp/mlruns')

# ── Standardised experiment wrapper ───────────────────────────────────
# Define once, use everywhere — prevents inconsistent logging

class MLExperiment:
    """
    Standardised experiment context manager.
    Ensures every run logs the same baseline metadata.
    Enforced across the team via shared utility library.
    """

    REQUIRED_PARAMS = ['model_type', 'dataset_version', 'feature_set']
    REQUIRED_TAGS   = ['team', 'purpose']   # 'purpose': baseline, ablation, production-candidate

    def __init__(self, experiment_name: str, run_name: str,
                  params: dict, tags: dict):
        # Validate required fields
        missing_params = [p for p in self.REQUIRED_PARAMS if p not in params]
        missing_tags   = [t for t in self.REQUIRED_TAGS   if t not in tags]
        if missing_params:
            raise ValueError(f"Missing required params: {missing_params}")
        if missing_tags:
            raise ValueError(f"Missing required tags: {missing_tags}")

        self.experiment_name = experiment_name
        self.run_name        = run_name
        self.params          = params
        self.tags            = tags
        self.run             = None

    def __enter__(self):
        mlflow.set_experiment(self.experiment_name)
        self.run = mlflow.start_run(run_name=self.run_name)

        # Log all params
        mlflow.log_params(self.params)

        # Log all tags + standard metadata
        for k, v in self.tags.items():
            mlflow.set_tag(k, str(v))
        mlflow.set_tag('git_commit',   os.environ.get('GIT_COMMIT', 'unknown'))
        mlflow.set_tag('run_by',       os.environ.get('USER', 'unknown'))
        mlflow.set_tag('timestamp',    datetime.now().isoformat())
        mlflow.set_tag('python_env',   os.environ.get('CONDA_ENV', 'unknown'))

        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None:
            mlflow.set_tag('status', 'failed')
            mlflow.set_tag('error',  str(exc_val))
        else:
            mlflow.set_tag('status', 'success')
        mlflow.end_run()

    def log_metric(self, key: str, value: float, step: int = None):
        mlflow.log_metric(key, value, step=step)

    def log_metrics(self, metrics: dict, step: int = None):
        mlflow.log_metrics(metrics, step=step)

    def log_model(self, model, artifact_path: str = 'model', **kwargs):
        mlflow.sklearn.log_model(model, artifact_path=artifact_path, **kwargs)

# ── Example: standardised experiment usage ────────────────────────────
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error
import numpy as np

np.random.seed(42)
X = np.random.randn(500, 5)
y = X[:, 0] * 3 + np.random.randn(500)

try:
    with MLExperiment(
        experiment_name='fraud-detection',
        run_name='gb-feature-set-v3',
        params={
            'model_type':      'GradientBoosting',
            'dataset_version': 'v3.2',
            'feature_set':     'v3',
            'n_estimators':    200,
            'max_depth':       4,
            'learning_rate':   0.05,
        },
        tags={
            'team':    'fraud-ml',
            'purpose': 'production-candidate',
            'ticket':  'ML-247',
        },
    ) as exp:
        model = GradientBoostingRegressor(
            n_estimators=200, max_depth=4,
            learning_rate=0.05, random_state=42,
        )
        model.fit(X[:400], y[:400])
        val_mae = mean_absolute_error(y[400:], model.predict(X[400:]))

        exp.log_metrics({'val_mae': val_mae, 'train_samples': 400})
        exp.log_model(model, registered_model_name='fraud-score')

    print(f"Experiment logged successfully: val_mae={val_mae:.4f}")

except ValueError as e:
    print(f"Experiment blocked: {e}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common experiment tracking mistake — explained and fixed</h2>

        <ErrorBlock
          error="Runs look identical in the UI — cannot tell which experiment is which"
          cause="No consistent naming convention for experiments or runs. When 20 runs are named 'run_1', 'run_2', 'my_model', 'test', 'final', 'final2' with no tags, the tracking UI is useless — you cannot filter by model type, data version, or purpose. The information is buried in the params but not surfaced as filterable tags."
          fix="Enforce a naming convention: experiment name = team-task (e.g. 'fraud-detection', 'delivery-time'), run name = model_type-key_hyperparam (e.g. 'gb-lr0.05-depth4'). Required tags: model_type, dataset_version, feature_set, team, purpose (baseline/ablation/production-candidate). Create a shared MLExperiment wrapper class that validates required fields before allowing a run to start — rejected runs cannot pollute the tracking server."
        />

        <ErrorBlock
          error="MLflow server runs out of disk space — artifacts accumulate unboundedly"
          cause="Every logged model artifact is a copy of the model file stored in the MLflow artifact store. With daily retraining over six months and a 200MB model, that is 36GB of model files. Add feature importance plots, confusion matrices, and other logged files and storage grows quickly. Self-hosted MLflow with local file storage hits disk limits within weeks on an active team."
          fix="Configure artifact store to use S3 or GCS: mlflow.set_tracking_uri('mlruns') and artifact_uri='s3://your-bucket/mlflow-artifacts'. Set a retention policy: delete runs older than 90 days that are not in Production or Staging stage. Only log models for promising runs — add a validation gate before log_model() that checks if val_mae is below a threshold. Use MLflow's garbage collection: mlflow gc to remove orphaned artifacts."
        />

        <ErrorBlock
          error="W&B run does not finish — wandb.finish() not called, run shows as crashed"
          cause="An exception occurred during training and the except block did not call wandb.finish(). W&B marks runs as crashed if the process exits without a finish() call. Also caused by using wandb.init() without a context manager or try/finally — if Ctrl+C interrupts training, the run is permanently stuck in running state."
          fix="Always use wandb.init() as a context manager (with wandb.init(...) as run:) which calls finish() automatically on exit. Or use try/finally: try: [training code] finally: wandb.finish(). Set exit_code in wandb.finish(exit_code=1) for failures to mark the run as failed rather than crashed. Add wandb.finish() to your signal handler for graceful shutdown on SIGTERM."
        />

        <ErrorBlock
          error="Cannot reproduce a logged experiment — same params produce different results"
          cause="Random seeds were not logged or not set globally. NumPy, PyTorch, Python's random module, and scikit-learn each have independent random states. Logging the sklearn random_state parameter does not fix NumPy's global seed. Also caused by non-deterministic GPU operations in PyTorch — CUDA operations are not reproducible by default even with torch.manual_seed()."
          fix="Log and set all random seeds: np.random.seed(seed), random.seed(seed), torch.manual_seed(seed), torch.cuda.manual_seed_all(seed). For full PyTorch reproducibility: torch.backends.cudnn.deterministic=True and torch.backends.cudnn.benchmark=False (slower but deterministic). Log the full environment: mlflow.log_artifact(requirements.txt) and mlflow.set_tag('python_version', sys.version). Log the data hash: mlflow.set_tag('data_hash', hashlib.md5(df.to_csv().encode()).hexdigest()[:8])."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can track every experiment. Next: wrap your model in an API
          and ship it to production.
        </h2>

        <p style={S.p}>
          Experiment tracking gives you a registered model artifact.
          Module 71 takes that artifact and deploys it — wrapping the model
          in a FastAPI REST endpoint, containerising it with Docker,
          and scaling it with Kubernetes. The full deployment path
          from a pkl file to a production API serving thousands of
          requests per minute.
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
              textTransform: 'uppercase' as const, color: '#7b61ff',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Module 71 · MLOps
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Model Deployment — FastAPI, Docker, Kubernetes
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Wrap your model in a FastAPI endpoint, containerise with Docker,
              scale with Kubernetes. Full working deployment of the Swiggy
              delivery model.
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
          'Experiment tracking automatically records every run: parameters (inputs — hyperparameters, data version, feature set), metrics (outputs — MAE, AUC, training time), artifacts (files — model.pkl, plots, confusion matrices), and tags (labels — team, purpose, ticket). These four categories together make any experiment exactly reproducible.',
          'MLflow is four tools: Tracking (log runs), Projects (reproducible packaging), Models (standard format), Registry (versioning and promotion). The Tracking and Registry components are what most teams need. Self-host with a PostgreSQL backend and S3 artifact store for production. Free and open source.',
          'The Model Registry has four stages: None (freshly registered), Staging (under review), Production (serving live traffic), Archived (superseded). The inference service always loads by name and stage — never by run_id. Promotion from Staging to Production is an explicit gate that creates an audit trail.',
          'W&B excels for deep learning: richer learning curve charts, first-class image/audio logging, built-in hyperparameter sweep agent (Bayesian optimisation across N runs), team reports, and alerts. The free tier covers most individual engineers. One line to start: wandb.init(project="...", config={...}).',
          'Standardise experiment logging across the team with a shared wrapper class that validates required params and tags before a run starts. Required at minimum: model_type, dataset_version, feature_set, team, purpose. Add git_commit and run_by automatically. Rejected runs cannot pollute the tracking server with unidentifiable experiments.',
          'Four common failures: runs look identical (enforce naming convention and required tags), artifact store fills up (use S3, set retention policy, gate log_model() on quality threshold), W&B runs stuck as crashed (use context manager or try/finally for wandb.finish()), cannot reproduce (log and set all random seeds — NumPy, PyTorch, Python random, and CUDA each independently).',
        ]}
      />
    </LearnLayout>
  )
}