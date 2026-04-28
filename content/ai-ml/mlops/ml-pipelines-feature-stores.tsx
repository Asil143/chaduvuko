import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'ML Pipelines and Feature Stores — Chaduvuko',
  description:
    'Feature pipelines, training pipelines, inference pipelines. Feast for feature stores. Airflow and Prefect for orchestration. How production ML actually runs.',
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

export default function MLPipelinesFeatureStoresPage() {
  return (
    <LearnLayout
      title="ML Pipelines and Feature Stores"
      description="Feature pipelines, training pipelines, inference pipelines. Feast for feature stores. Airflow and Prefect for orchestration. How production ML actually runs."
      section="MLOps and Production"
      readTime="40–52 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="mlops" topic="ml-pipelines-feature-stores" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — why pipelines exist</span>
        <h2 style={S.h2}>
          A Jupyter notebook trains a model once.
          A pipeline trains it every day, on fresh data,
          reproducibly, without anyone running it manually.
          That is the difference between a prototype and a production ML system.
        </h2>

        <p style={S.p}>
          Every ML model at DoorDash, Stripe, and Amazon runs on a pipeline.
          The delivery time prediction model retrains every night on the day's
          orders. The fraud detection model retrains weekly as new fraud patterns
          emerge. The product recommendation model retrains daily as inventory
          changes. None of these happen by someone running a notebook —
          they are automated, scheduled, monitored, and alerting pipelines.
        </p>

        <p style={S.p}>
          Three types of pipelines work together in every production ML system.
          The feature pipeline extracts raw events from databases and streams,
          transforms them into model-ready features, and writes them to a
          feature store. The training pipeline reads features from the store,
          trains the model, evaluates it, and registers it if it passes quality gates.
          The inference pipeline reads features for a specific prediction request,
          loads the registered model, and serves a prediction in milliseconds.
          These three must stay in sync — if the feature pipeline changes
          how it computes a feature, the training and inference pipelines
          must change together or the model silently degrades.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A restaurant kitchen has three pipelines: the supply pipeline
            (ingredients arrive, are prepped, and stored in the walk-in fridge),
            the recipe pipeline (chefs create and test new dishes using stored ingredients),
            and the serving pipeline (orders come in, ingredients are pulled from storage,
            dishes are prepared and served). The walk-in fridge is the feature store.
            If the supply pipeline changes how the vegetables are cut (feature engineering),
            the recipes (training) and serving (inference) must use the same cut —
            or the dish comes out wrong.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            Training-serving skew — when features are computed differently at
            training time vs inference time — is the number one silent failure mode
            in production ML. Feature stores exist specifically to prevent it
            by computing features once and serving the same values to both pipelines.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          Install: <span style={S.code as React.CSSProperties}>pip install feast apache-airflow prefect scikit-learn pandas</span>.
          Feast is the most widely deployed open-source feature store —
          used at Twitter, Shopify, and multiple Indian unicorns.
          Prefect is simpler than Airflow for getting started.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — THREE PIPELINE TYPES ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The three-pipeline architecture</span>
        <h2 style={S.h2}>Feature pipeline, training pipeline, inference pipeline — how they connect</h2>

        <VisualBox label="Three-pipeline ML system — data flow and responsibilities">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                name: 'Feature Pipeline',
                color: '#378ADD',
                schedule: 'Hourly or daily batch job',
                input: 'Raw events: transactions, clicks, orders from Kafka/S3/database',
                transforms: [
                  'Aggregate: merchant_7d_transaction_count, user_30d_spend',
                  'Window: rolling averages, lag features',
                  'Join: enrich events with entity attributes',
                  'Validate: schema checks, null rates, range checks',
                ],
                output: 'Feature Store (offline store + online store)',
                failure: 'Features become stale — model degrades silently',
              },
              {
                name: 'Training Pipeline',
                color: '#7b61ff',
                schedule: 'Daily or weekly, or on trigger (data drift, new data threshold)',
                input: 'Feature Store point-in-time query → training dataset',
                transforms: [
                  'Point-in-time correct join (no future data leakage)',
                  'Train/val/test split with temporal awareness',
                  'Model training with hyperparameter search',
                  'Evaluation: accuracy, AUC, business metrics',
                  'Register if passing quality gates',
                ],
                output: 'Model Registry (versioned model artifact + metadata)',
                failure: 'Bad model promoted to production — wrong predictions',
              },
              {
                name: 'Inference Pipeline',
                color: '#1D9E75',
                schedule: 'Real-time (online) or batch (offline)',
                input: 'Prediction request → Feature Store online lookup → model',
                transforms: [
                  'Fetch features from online store (~1ms)',
                  'Load model from registry',
                  'Run prediction',
                  'Log prediction for monitoring',
                ],
                output: 'Prediction served to application',
                failure: 'Wrong features fetched — training-serving skew',
              },
            ].map((item) => (
              <div key={item.name} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 8, padding: '12px 14px',
                borderLeft: `4px solid ${item.color}`,
              }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)' }}>
                    {item.name}
                  </span>
                  <span style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)', background: `${item.color}15`, padding: '2px 7px', borderRadius: 3 }}>
                    {item.schedule}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>IN</div>
                    <p style={{ ...S.ps, marginBottom: 6, fontSize: 11 }}>{item.input}</p>
                    <div style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>OUT</div>
                    <p style={{ ...S.ps, marginBottom: 0, fontSize: 11 }}>{item.output}</p>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>TRANSFORMS</div>
                    {item.transforms.map((t, i) => (
                      <div key={i} style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>→ {t}</div>
                    ))}
                    <div style={{ fontSize: 11, color: '#ff4757', marginTop: 6 }}>⚠ Failure: {item.failure}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>
      </div>

      <Div />

      {/* ══ SECTION 3 — FEATURE STORE ═══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The central component</span>
        <h2 style={S.h2}>Feature stores — one definition, consistent values, training and serving</h2>

        <p style={S.p}>
          A feature store solves the most common production ML problem:
          the feature computed in the training notebook is not the same feature
          computed in the serving API. The feature store is a central registry
          where features are defined once, computed once, and read
          by both the training pipeline and the inference service.
          Training and serving are always consistent.
        </p>

        <p style={S.p}>
          Feature stores have two components. The offline store (typically S3,
          BigQuery, or Parquet files) holds the full historical feature values —
          used for training. It supports time-travel queries: give me the value
          of this feature for this entity as of a specific past timestamp.
          This is critical for preventing data leakage. The online store
          (typically Redis or DynamoDB) holds only the latest feature values —
          used for real-time inference. Writes to both are handled
          by the feature pipeline's materialisation job.
        </p>

        <ConceptBox title="Point-in-time correctness — preventing data leakage in training">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.2 }}>
            <div style={{ color: '#ff4757', marginBottom: 6, fontSize: 11 }}>Without point-in-time queries (data leakage):</div>
            <div style={{ color: '#ff4757', paddingLeft: 12, marginBottom: 8 }}>
              Training event at 2026-01-15: uses features computed as of TODAY (2026-03-28)
              → model trained on future information → wildly optimistic eval metrics
            </div>
            <div style={{ color: '#1D9E75', marginBottom: 6, fontSize: 11 }}>With point-in-time queries (correct):</div>
            <div style={{ color: '#1D9E75', paddingLeft: 12 }}>
              Training event at 2026-01-15: uses features as of 2026-01-15 exactly
              → model trained on information available at decision time → realistic metrics
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`# pip install feast pandas pyarrow

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from pathlib import Path
import os, tempfile

# ── Simulate DoorDash delivery time prediction feature store ────────────

# ── Step 1: Define feature views (the schema) ─────────────────────────
# In a real Feast setup these are in feature_store.yaml + feature_repo/
# Here we show the concepts with pandas to illustrate the ideas

# Raw data — transactions from the data warehouse
raw_orders = pd.DataFrame({
    'order_id':        [f'ORD{i:04d}' for i in range(1000)],
    'restaurant_id':   np.random.choice(['RST001', 'RST002', 'RST003'], 1000),
    'driver_id':       np.random.choice([f'DRV{i:02d}' for i in range(20)], 1000),
    'event_timestamp': pd.date_range('2026-01-01', periods=1000, freq='1h'),
    'delivery_time_min': np.random.normal(35, 10, 1000).clip(10, 90),
    'distance_km':     np.random.exponential(3, 1000),
    'order_value':     np.random.exponential(400, 1000),
    'is_peak_hour':    np.random.randint(0, 2, 1000),
})

# ── Step 2: Compute features ──────────────────────────────────────────
def compute_restaurant_features(orders: pd.DataFrame) -> pd.DataFrame:
    """
    Aggregate features per restaurant — recomputed daily.
    These represent what a feature pipeline would compute.
    """
    feats = orders.groupby('restaurant_id').agg(
        restaurant_avg_delivery_time=('delivery_time_min', 'mean'),
        restaurant_7d_order_count=('order_id', 'count'),
        restaurant_acceptance_rate=('is_peak_hour', 'mean'),  # proxy
    ).reset_index()
    feats['feature_timestamp'] = datetime.now()
    return feats

def compute_driver_features(orders: pd.DataFrame) -> pd.DataFrame:
    """Aggregate features per driver."""
    feats = orders.groupby('driver_id').agg(
        driver_avg_delivery_time=('delivery_time_min', 'mean'),
        driver_completed_orders=('order_id', 'count'),
        driver_avg_distance=('distance_km', 'mean'),
    ).reset_index()
    feats['feature_timestamp'] = datetime.now()
    return feats

restaurant_features = compute_restaurant_features(raw_orders)
driver_features     = compute_driver_features(raw_orders)

print("Feature store contents:")
print(f"  Restaurant features: {restaurant_features.shape}")
print(f"  Driver features:     {driver_features.shape}")
print(f"\nSample restaurant features:")
print(restaurant_features.head(3).to_string(index=False))

# ── Step 3: Point-in-time correct training dataset ────────────────────
def create_training_dataset(
    orders: pd.DataFrame,
    restaurant_feats: pd.DataFrame,
    driver_feats: pd.DataFrame,
    cutoff_date: datetime,
) -> pd.DataFrame:
    """
    Create a training dataset with point-in-time correct features.
    Only use features available as of cutoff_date — no future data.
    """
    # Only include orders before the cutoff
    train_orders = orders[orders['event_timestamp'] < cutoff_date].copy()

    # Only use features computed from data before the cutoff
    # In a real feature store (Feast), this is a time-travel query
    hist_orders = orders[orders['event_timestamp'] < cutoff_date]
    hist_rest_feats = compute_restaurant_features(hist_orders)
    hist_drv_feats  = compute_driver_features(hist_orders)

    # Join features to training events
    dataset = train_orders.merge(hist_rest_feats, on='restaurant_id', how='left')
    dataset = dataset.merge(hist_drv_feats, on='driver_id', how='left')

    return dataset

cutoff = datetime(2026-03-1)
train_df = create_training_dataset(raw_orders, restaurant_features,
                                    driver_features, cutoff)
print(f"\nTraining dataset (before {cutoff.date()}):")
print(f"  Rows:    {len(train_df)}")
print(f"  Columns: {list(train_df.columns)}")

# ── Step 4: Online serving — retrieve latest features for a request ───
ONLINE_STORE = {
    'RST001': {'restaurant_avg_delivery_time': 33.2, 'restaurant_7d_order_count': 245},
    'RST002': {'restaurant_avg_delivery_time': 38.7, 'restaurant_7d_order_count': 189},
    'DRV01':  {'driver_avg_delivery_time': 31.5, 'driver_completed_orders': 892},
}

def get_online_features(restaurant_id: str, driver_id: str) -> dict:
    """Real-time feature retrieval — Redis lookup in production (~1ms)."""
    features = {}
    features.update(ONLINE_STORE.get(restaurant_id, {}))
    features.update(ONLINE_STORE.get(driver_id, {}))
    return features

features = get_online_features('RST001', 'DRV01')
print(f"\nOnline features for RST001/DRV01:")
for k, v in features.items():
    print(f"  {k}: {v}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — ORCHESTRATION WITH PREFECT ══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Scheduling and orchestration</span>
        <h2 style={S.h2}>Prefect — define pipelines as Python, schedule and monitor from the UI</h2>

        <p style={S.p}>
          Orchestrators schedule pipeline runs, handle failures, retry failed steps,
          send alerts, and provide a dashboard of what ran, when, and what failed.
          Airflow is the industry standard but requires significant infrastructure.
          Prefect offers the same capabilities with far simpler setup —
          decorate Python functions with <span style={S.code as React.CSSProperties}>@task</span> and <span style={S.code as React.CSSProperties}>@flow</span>,
          run them locally or in the cloud, and get a full observability dashboard.
        </p>

        <CodeBlock code={`# pip install prefect scikit-learn pandas

from prefect import task, flow, get_run_logger
from prefect.tasks import task_input_hash
from datetime import timedelta, datetime
import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import pickle, json, os

# ── Task: Extract features from feature store ─────────────────────────
@task(
    name='extract-features',
    retries=3,
    retry_delay_seconds=60,
    cache_key_fn=task_input_hash,   # cache by input hash — skip if same inputs
    cache_expiration=timedelta(hours=1),
)
def extract_features(cutoff_date: str) -> pd.DataFrame:
    logger = get_run_logger()
    logger.info(f"Extracting features up to {cutoff_date}")

    # In production: query feature store / data warehouse
    np.random.seed(42)
    n = 5000
    df = pd.DataFrame({
        'restaurant_avg_delivery_time':  np.random.normal(35, 8, n),
        'restaurant_7d_order_count':     np.random.randint(50, 500, n),
        'driver_avg_delivery_time':      np.random.normal(32, 7, n),
        'driver_completed_orders':       np.random.randint(100, 1000, n),
        'distance_km':                   np.random.exponential(3, n),
        'is_peak_hour':                  np.random.randint(0, 2, n),
        'order_value':                   np.random.exponential(400, n),
        'target_delivery_time':          np.random.normal(35, 10, n).clip(10, 90),
    })
    logger.info(f"Extracted {len(df)} rows, {df.shape[1]} columns")
    return df

# ── Task: Validate data quality ────────────────────────────────────────
@task(name='validate-data')
def validate_data(df: pd.DataFrame) -> dict:
    logger = get_run_logger()
    issues = []

    # Null checks
    null_rates = df.isnull().mean()
    for col, rate in null_rates.items():
        if rate > 0.05:
            issues.append(f"High null rate in {col}: {rate:.2%}")

    # Range checks
    if (df['target_delivery_time'] < 0).any():
        issues.append("Negative delivery times found")
    if (df['distance_km'] < 0).any():
        issues.append("Negative distances found")

    # Row count check
    if len(df) < 1000:
        issues.append(f"Too few rows: {len(df)} (minimum 1000)")

    result = {
        'passed':     len(issues) == 0,
        'row_count':  len(df),
        'issues':     issues,
        'null_rates': null_rates.to_dict(),
    }
    if issues:
        logger.warning(f"Data validation issues: {issues}")
    else:
        logger.info(f"Data validation passed: {len(df)} rows")
    return result

# ── Task: Train model ─────────────────────────────────────────────────
@task(name='train-model')
def train_model(df: pd.DataFrame) -> dict:
    logger = get_run_logger()

    feature_cols = [c for c in df.columns if c != 'target_delivery_time']
    X = df[feature_cols]
    y = df['target_delivery_time']

    X_train, X_val, y_train, y_val = train_test_split(
        X, y, test_size=0.2, random_state=42,
    )

    model = GradientBoostingRegressor(
        n_estimators=200, max_depth=4,
        learning_rate=0.05, random_state=42,
    )
    model.fit(X_train, y_train)

    train_mae = mean_absolute_error(y_train, model.predict(X_train))
    val_mae   = mean_absolute_error(y_val,   model.predict(X_val))

    logger.info(f"Train MAE: {train_mae:.2f} min  Val MAE: {val_mae:.2f} min")

    return {
        'model':      model,
        'train_mae':  train_mae,
        'val_mae':    val_mae,
        'feature_cols': feature_cols,
        'trained_at': datetime.now().isoformat(),
    }

# ── Task: Evaluate and gate ────────────────────────────────────────────
@task(name='evaluate-model')
def evaluate_model(result: dict,
                    max_val_mae: float = 8.0,
                    max_overfit_gap: float = 3.0) -> bool:
    logger = get_run_logger()
    val_mae  = result['val_mae']
    train_mae = result['train_mae']
    overfit   = train_mae - val_mae   # negative means val > train (fine)

    passed = val_mae <= max_val_mae and abs(overfit) <= max_overfit_gap

    logger.info(
        f"Quality gate: val_mae={val_mae:.2f} (max={max_val_mae}) "
        f"overfit_gap={overfit:.2f} (max={max_overfit_gap}) "
        f"→ {'PASS' if passed else 'FAIL'}"
    )
    return passed

# ── Task: Register model ───────────────────────────────────────────────
@task(name='register-model')
def register_model(result: dict, run_date: str) -> str:
    logger    = get_run_logger()
    model_dir = f'/tmp/models/delivery_time_{run_date}'
    os.makedirs(model_dir, exist_ok=True)

    model_path = f'{model_dir}/model.pkl'
    meta_path  = f'{model_dir}/metadata.json'

    with open(model_path, 'wb') as f:
        pickle.dump(result['model'], f)

    metadata = {
        'model_path':   model_path,
        'val_mae':      result['val_mae'],
        'train_mae':    result['train_mae'],
        'feature_cols': result['feature_cols'],
        'trained_at':   result['trained_at'],
        'registered_at': datetime.now().isoformat(),
        'version':      run_date,
    }
    with open(meta_path, 'w') as f:
        json.dump(metadata, f, indent=2)

    logger.info(f"Model registered at {model_path}")
    return model_path

# ── Flow: Assemble the pipeline ───────────────────────────────────────
@flow(name='delivery-time-training-pipeline')
def training_pipeline(run_date: str = None):
    logger   = get_run_logger()
    run_date = run_date or datetime.now().strftime('%Y%m%d')
    logger.info(f"Starting training pipeline for {run_date}")

    # Step 1: Extract
    df = extract_features(cutoff_date=run_date)

    # Step 2: Validate
    validation = validate_data(df)
    if not validation['passed']:
        logger.error(f"Data validation failed: {validation['issues']}")
        return {'status': 'failed', 'reason': 'data_validation'}

    # Step 3: Train
    result = train_model(df)

    # Step 4: Evaluate
    passed = evaluate_model(result)
    if not passed:
        logger.warning("Model failed quality gate — not registering")
        return {'status': 'rejected', 'val_mae': result['val_mae']}

    # Step 5: Register
    model_path = register_model(result, run_date)
    return {'status': 'success', 'model_path': model_path,
             'val_mae': result['val_mae']}

# ── Run locally ────────────────────────────────────────────────────────
print("Running training pipeline:")
result = training_pipeline(run_date='20260328')
print(f"\nPipeline result: {result}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — AIRFLOW DAG PATTERN ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Industry standard orchestration</span>
        <h2 style={S.h2}>Airflow DAGs — the pattern used at DoorDash, Amazon, and Stripe</h2>

        <p style={S.p}>
          Apache Airflow is the most widely deployed ML orchestrator in India.
          Every major Indian tech company runs Airflow for data and ML pipelines.
          An Airflow DAG (Directed Acyclic Graph) defines the tasks and their
          dependencies as Python code. Airflow schedules DAG runs, retries failures,
          sends email alerts, and provides a rich UI showing every run's status.
        </p>

        <CodeBlock code={`# pip install apache-airflow

from datetime import datetime, timedelta

# ── Airflow DAG for ML training pipeline ─────────────────────────────
# In production: save as ml_training_dag.py in your Airflow dags/ folder

DAG_CODE = '''
from airflow import DAG
from airflow.operators.python import PythonOperator, BranchPythonOperator
from airflow.operators.email import EmailOperator
from airflow.utils.dates import days_ago
from datetime import timedelta
import logging

# Default arguments applied to all tasks
DEFAULT_ARGS = {
    "owner":            "ml-team",
    "depends_on_past":  False,
    "email":            ["ml-alerts@company.com"],
    "email_on_failure": True,
    "email_on_retry":   False,
    "retries":          2,
    "retry_delay":      timedelta(minutes=5),
    "execution_timeout": timedelta(hours=2),
}

def extract_features_fn(**context):
    """Extract and compute features for training."""
    run_date = context["ds"]   # execution date as YYYY-MM-DD
    logging.info(f"Extracting features for {run_date}")
    # ... feature extraction logic ...
    # Push result to XCom for downstream tasks
    context["ti"].xcom_push(key="row_count", value=50000)

def validate_data_fn(**context):
    """Validate feature quality — branch on result."""
    row_count = context["ti"].xcom_pull(
        task_ids="extract_features", key="row_count"
    )
    if row_count < 10000:
        return "send_data_alert"   # branch to alert task
    return "train_model"           # branch to training task

def train_model_fn(**context):
    run_date = context["ds"]
    logging.info(f"Training model for {run_date}")
    val_mae = 5.8   # would come from actual training
    context["ti"].xcom_push(key="val_mae", value=val_mae)

def evaluate_and_register_fn(**context):
    val_mae = context["ti"].xcom_pull(task_ids="train_model", key="val_mae")
    if val_mae > 8.0:
        logging.warning(f"Model failed quality gate: MAE={val_mae}")
        return
    logging.info(f"Registering model with MAE={val_mae}")
    # ... model registration ...

with DAG(
    dag_id="delivery_time_training",
    default_args=DEFAULT_ARGS,
    description="Daily retraining of DoorDash delivery time model",
    schedule_interval="0 2 * * *",   # 2 AM daily
    start_date=days_ago(1),
    catchup=False,
    tags=["ml", "delivery", "training"],
) as dag:

    extract = PythonOperator(
        task_id="extract_features",
        python_callable=extract_features_fn,
    )

    validate = BranchPythonOperator(
        task_id="validate_data",
        python_callable=validate_data_fn,
    )

    train = PythonOperator(
        task_id="train_model",
        python_callable=train_model_fn,
    )

    evaluate = PythonOperator(
        task_id="evaluate_and_register",
        python_callable=evaluate_and_register_fn,
    )

    alert = EmailOperator(
        task_id="send_data_alert",
        to="ml-team@company.com",
        subject="[ALERT] Training data validation failed",
        html_content="Feature pipeline produced insufficient data. Check sources.",
    )

    # DAG structure: extract → validate → train → evaluate
    #                                   ↘ alert (if validation fails)
    extract >> validate >> [train, alert]
    train   >> evaluate
'''

print("Airflow DAG structure:")
print("  extract_features")
print("       ↓")
print("  validate_data (branch)")
print("    ↙              ↘")
print("  train_model    send_alert")
print("       ↓")
print("  evaluate_and_register")

print("\nKey Airflow concepts:")
concepts = [
    ('schedule_interval', '"0 2 * * *" = 2 AM daily. "0 */6 * * *" = every 6 hours.'),
    ('catchup=False',     'Do not backfill missed runs when DAG is enabled.'),
    ('retries=2',         'Retry failed tasks twice before marking as failed.'),
    ('XCom',              'Pass data between tasks via push/pull key-value store.'),
    ('BranchPython',      'Conditional logic — returns task_id(s) to run next.'),
    ('execution_timeout', 'Kill task if it runs too long — prevents zombie tasks.'),
]
for concept, detail in concepts:
    print(f"  {concept:<22}: {detail}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — FEAST FEATURE STORE ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Production feature store</span>
        <h2 style={S.h2}>Feast — define features once, serve consistently to training and inference</h2>

        <CodeBlock code={`# pip install feast

# ── Feast feature store setup ─────────────────────────────────────────
# In production: files live in a feature_repo/ directory

FEATURE_STORE_YAML = """
project: swiggy_ml
registry: data/registry.db
provider: local
online_store:
  type: sqlite           # Redis in production
  path: data/online_store.db
offline_store:
  type: file             # BigQuery/Snowflake in production
"""

RESTAURANT_FEATURE_VIEW = """
from feast import Entity, Feature, FeatureView, FileSource, ValueType
from datetime import timedelta

# Entity: the thing we're computing features for
restaurant = Entity(
    name="restaurant_id",
    value_type=ValueType.STRING,
    description="Unique restaurant identifier",
)

# Data source: where the feature data lives
restaurant_source = FileSource(
    path="data/restaurant_features.parquet",
    event_timestamp_column="event_timestamp",
    created_timestamp_column="created_timestamp",
)

# Feature view: named collection of features for an entity
restaurant_features = FeatureView(
    name="restaurant_stats",
    entities=["restaurant_id"],
    ttl=timedelta(days=7),           # features expire after 7 days
    features=[
        Feature(name="avg_delivery_time_min", dtype=ValueType.FLOAT),
        Feature(name="order_count_7d",        dtype=ValueType.INT64),
        Feature(name="acceptance_rate",        dtype=ValueType.FLOAT),
        Feature(name="avg_order_value",        dtype=ValueType.FLOAT),
    ],
    online=True,                     # materialise to online store for serving
    source=restaurant_source,
)
"""

print("Feast feature store structure:")
print("""
feature_repo/
├── feature_store.yaml        ← registry, provider, online/offline store config
├── entities.py               ← entity definitions (restaurant, driver, user)
├── data_sources.py           ← where raw data lives (S3, BigQuery, Parquet)
└── feature_views.py          ← feature view definitions (what to compute)
""")

# ── Simulate Feast API patterns ───────────────────────────────────────
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Training: point-in-time historical feature retrieval
def simulate_feast_historical_features(
    entity_df: pd.DataFrame,
    feature_view: str,
    features: list[str],
) -> pd.DataFrame:
    """
    In production:
    store = FeatureStore(repo_path='./feature_repo')
    training_df = store.get_historical_features(
        entity_df=entity_df,
        features=['restaurant_stats:avg_delivery_time_min', ...],
    ).to_df()

    Point-in-time correct: for each row in entity_df,
    return feature values as of entity_df['event_timestamp'].
    """
    np.random.seed(42)
    result = entity_df.copy()
    result['avg_delivery_time_min'] = np.random.normal(35, 8, len(entity_df))
    result['order_count_7d']        = np.random.randint(50, 500, len(entity_df))
    result['acceptance_rate']       = np.random.uniform(0.7, 0.99, len(entity_df))
    return result

# Inference: online feature retrieval — low latency
def simulate_feast_online_features(
    entity_rows: list[dict],
    features: list[str],
) -> dict:
    """
    In production:
    store = FeatureStore(repo_path='./feature_repo')
    feature_vector = store.get_online_features(
        features=['restaurant_stats:avg_delivery_time_min', ...],
        entity_rows=[{'restaurant_id': 'RST001'}],
    ).to_dict()

    Returns latest feature values from Redis — ~1ms latency.
    """
    return {
        'restaurant_id':              ['RST001'],
        'avg_delivery_time_min':      [33.2],
        'order_count_7d':             [245],
        'acceptance_rate':            [0.94],
    }

# Training: build entity dataframe with timestamps
entity_df = pd.DataFrame({
    'restaurant_id':   ['RST001', 'RST002', 'RST003'] * 100,
    'event_timestamp': pd.date_range('2026-01-01', periods=300, freq='1h'),
})

train_features = simulate_feast_historical_features(
    entity_df,
    'restaurant_stats',
    ['avg_delivery_time_min', 'order_count_7d'],
)
print(f"Training features shape: {train_features.shape}")

# Inference: get latest features for a prediction request
online_features = simulate_feast_online_features(
    [{'restaurant_id': 'RST001'}],
    ['avg_delivery_time_min', 'order_count_7d'],
)
print(f"\nOnline features for serving:")
for k, v in online_features.items():
    print(f"  {k}: {v}")

# Materialisation: write historical features to online store
print("""
# Materialise features to online store — run this daily via Airflow
# feast materialize 2026-03-27T00:00:00 2026-03-28T00:00:00
# OR in Python:
# store.materialize(
#     start_date=datetime(2026, 3, 27),
#     end_date=datetime(2026, 3, 28),
# )
# Copies latest feature values from offline store (Parquet/BigQuery)
# to online store (Redis) for low-latency serving
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common ML pipeline mistake — explained and fixed</h2>

        <ErrorBlock
          error="Training-serving skew — model performs well offline but poorly in production"
          cause="Features are computed differently at training time vs inference time. Training notebook uses pandas with slightly different aggregation windows, null handling, or normalisation than the production inference service. Even a small difference — training uses 7-day rolling average, serving uses 8-day — compounds across thousands of features into significant prediction degradation. This is the most common and hardest-to-diagnose production ML failure."
          fix="Use a feature store (Feast, Tecton, or Hopsworks) where features are defined once and served consistently to both training and inference. If a feature store is not available, define feature computation as a shared Python library imported by both the training pipeline and the inference service — never duplicate feature code. Add feature distribution monitoring: log feature values at inference time and compare their distribution to training data distributions weekly."
        />

        <ErrorBlock
          error="Airflow DAG fails silently — tasks show success but model quality degrades"
          cause="A task completed without raising an exception but produced incorrect output — for example, the feature extraction task connected to the database but the query returned 0 rows for a date where data should exist, the task wrote an empty DataFrame to S3, and the next task happily trained a model on no data. Airflow marks tasks as succeeded based on exit code, not output quality."
          fix="Add explicit data quality checks as dedicated tasks in the DAG using BranchPythonOperator — validate row counts, null rates, and value ranges before training. Use assert statements that raise exceptions on data quality failures. Push key metrics to XCom (row_count, null_rate, feature_mean) and check them in downstream tasks. Set up Airflow SLAs — if a task does not complete within N hours, send an alert even if it eventually succeeds."
        />

        <ErrorBlock
          error="Feature pipeline produces features with future data — optimistic evaluation metrics"
          cause="Training code joins features without time constraints — it fetches the latest feature values regardless of when the training event occurred. A training event from January uses features computed from March data. The model appears to perform extraordinarily well in evaluation but fails in production because at inference time only current-time features are available. This is data leakage via feature store."
          fix="Always use point-in-time correct feature retrieval for training. In Feast: use get_historical_features() with entity_df including event_timestamp — Feast automatically returns features as of that timestamp. Without a feature store: for each training event at time T, only use features computed from data with timestamp ≤ T. Add a test: take events from one month ago, retrieve features 'as of' that date, and verify no features have values that could only be known from future data."
        />

        <ErrorBlock
          error="Pipeline becomes slow as dataset grows — 6-hour training run for daily retraining"
          cause="The pipeline reads all historical data every run and retrains from scratch. As data accumulates over months, the feature extraction and training steps grow proportionally. A pipeline that ran in 30 minutes in month one takes 6 hours in month twelve. Also caused by inefficient feature computation — recomputing rolling windows over the full history instead of incrementally updating."
          fix="Switch to incremental feature computation: only process new data since the last run and update aggregate features (add new rows to rolling windows instead of recomputing from scratch). Use a fixed training window: train on the most recent 90 days only — older data often hurts model quality anyway as patterns drift. Cache intermediate results with Prefect/Airflow task caching. For very large datasets: use Spark or Dask instead of pandas for distributed feature computation."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can build ML pipelines. Next: track every experiment
          so you never lose a good model again.
        </h2>

        <p style={S.p}>
          Pipelines produce models automatically. But which of the 50 models
          trained over the past month is the best? What hyperparameters,
          what data version, what feature set produced it? Without experiment
          tracking you cannot answer these questions. Module 70 covers MLflow
          and Weights & Biases — log every run, compare experiments on a
          dashboard, version models, and register the best ones for deployment.
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
              Next — Module 70 · MLOps
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Experiment Tracking with MLflow and Weights & Biases
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Log every run, compare experiments, version models, register artifacts.
              Never lose a good experiment again.
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
          'Three pipelines power every production ML system: the feature pipeline (raw events → features → feature store, runs hourly/daily), the training pipeline (feature store → model → model registry, runs daily/weekly), and the inference pipeline (request → feature store → model → prediction, runs in real time). All three must use the same feature definitions or training-serving skew silently degrades model quality.',
          'A feature store has two layers: the offline store (full history in S3/BigQuery/Parquet, used for training with point-in-time queries) and the online store (latest values in Redis, used for inference at ~1ms latency). Materialisation jobs sync the offline store to the online store, typically daily via an Airflow DAG.',
          'Point-in-time correct feature retrieval is mandatory for training. For each training event at time T, only use feature values computed from data with timestamp ≤ T. Fetching the latest features regardless of event time causes data leakage — the model appears excellent in evaluation but fails in production because future data is not available at inference time.',
          'Prefect turns Python functions into pipeline tasks with @task and @flow decorators. Tasks get retries, caching, and logging automatically. Flows define the DAG structure. Run locally for development, deploy to Prefect Cloud or self-hosted server for production scheduling.',
          'Airflow DAGs define ML pipelines as Python — tasks are PythonOperator/BranchPythonOperator/EmailOperator nodes connected by >> dependencies. BranchPythonOperator enables conditional logic (pass data validation → train, fail → alert). XCom passes data between tasks. schedule_interval sets the cron schedule. Used by DoorDash, Amazon, Stripe, and most Indian unicorns.',
          'The most dangerous ML pipeline failure is silent: feature extraction succeeds but returns 0 or wrong rows, training proceeds on bad data, a degraded model is promoted. Always add explicit data quality gate tasks that check row counts, null rates, and value distributions before training. Make quality checks raise exceptions on failure — Airflow marks tasks as failed only on unhandled exceptions.',
        ]}
      />
    </LearnLayout>
  )
}
