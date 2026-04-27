import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'DVC — Data Version Control — Chaduvuko',
  description:
    'Version datasets like code. DVC pipelines, remote storage, experiment tracking, and the full DVC + Git workflow for reproducible ML projects.',
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
          {label ?? 'bash'}
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

export default function DVCPage() {
  return (
    <LearnLayout
      title="DVC — Data Version Control"
      description="Version datasets like code. DVC pipelines, remote storage, experiment tracking, and the full DVC + Git workflow for reproducible ML projects."
      section="MLOps and Production"
      readTime="40–45 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="mlops" topic="dvc-data-version-control" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any command — the problem DVC solves</span>
        <h2 style={S.h2}>
          Your model code is in Git. Your training data is on someone's
          laptop, or in an S3 bucket with no version history, or in a folder
          called data_final_v3_use_this. DVC fixes this.
        </h2>

        <p style={S.p}>
          Git tracks code beautifully — every change, every author, every commit.
          But Git breaks for large files. A 2GB training CSV committed to Git
          bloats the repository, slows every clone, and makes every checkout painful.
          More importantly, Git does not understand that a CSV file and the
          Python script that produced it are connected — if the script changes,
          Git does not know the CSV is now stale.
        </p>

        <p style={S.p}>
          DVC (Data Version Control) adds data and model versioning on top of Git.
          It stores large files in remote storage (S3, GCS, Azure Blob) and keeps
          tiny pointer files in Git — a <span style={S.code as React.CSSProperties}>.dvc</span> file
          that is just a hash and a path. When you <span style={S.code as React.CSSProperties}>git checkout</span> an
          old branch, DVC knows which version of the data that branch used and
          pulls it from remote storage. Every model in your history has a
          corresponding dataset version, a feature pipeline version, and a code version.
          Reproduce any past experiment with two commands.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Git is like a library catalogue — it tracks which books exist and
            where they are filed, but the books themselves are stored on shelves.
            DVC is the cataloguing system for your ML datasets — it tracks
            which version of your data exists and stores a reference in Git,
            while the actual data lives in a remote storage warehouse (S3).
            When you need the book (data), you check the catalogue (Git + DVC),
            find the shelf (S3 path), and retrieve it. The catalogue is tiny.
            The warehouse can hold terabytes.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The .dvc pointer file committed to Git is typically 200 bytes.
            The actual dataset it references can be 200GB. Git stores the pointer.
            S3 stores the data. DVC coordinates between them so every
            git checkout brings the right data version automatically.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          Install: <span style={S.code as React.CSSProperties}>pip install dvc dvc-s3</span>.
          For GCS: <span style={S.code as React.CSSProperties}>pip install dvc-gs</span>.
          For Azure: <span style={S.code as React.CSSProperties}>pip install dvc-azure</span>.
          DVC integrates with Git — all DVC commands are run inside a Git repository.
          For this module every command is shown with comments explaining what it does.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — CORE CONCEPTS ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>How DVC works</span>
        <h2 style={S.h2}>Cache, remote, .dvc files — the three pieces that make versioning work</h2>

        <VisualBox label="DVC architecture — what lives where">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                location: 'Git repository',
                color: '#D85A30',
                stores: '.dvc pointer files, dvc.yaml pipeline definition, dvc.lock resolved dependencies, .dvcignore',
                size: 'Kilobytes — tiny',
                example: 'data/train.csv.dvc  →  md5: a3f2b1c4...  path: data/train.csv',
              },
              {
                location: 'Local .dvc/cache',
                color: '#7b61ff',
                stores: 'Content-addressable storage of all data versions you have used locally. Files stored by MD5 hash.',
                size: 'As large as your data — GBs to TBs',
                example: '.dvc/cache/a3/f2b1c4d5e6f7...  (the actual CSV bytes)',
              },
              {
                location: 'Remote storage (S3/GCS)',
                color: '#1D9E75',
                stores: 'Same content-addressable structure as local cache. Shared across all team members and CI.',
                size: 'Team-shared data store — same structure as local cache',
                example: 's3://company-ml-data/a3/f2b1c4d5e6f7...  (synced from local cache)',
              },
            ].map((item) => (
              <div key={item.location} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 7, padding: '10px 12px',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 6 }}>
                  {item.location}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{item.stores}</div>
                  <div style={{ fontSize: 11, color: item.color }}>Size: {item.size}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{item.example}</div>
                </div>
              </div>
            ))}
            <div style={{
              background: 'var(--surface)', borderRadius: 6, padding: '8px 12px',
              border: '1px solid var(--border)', fontSize: 11, color: 'var(--muted)',
            }}>
              <strong style={{ color: '#1D9E75' }}>dvc push</strong> = copy from local cache → remote storage  |
              <strong style={{ color: '#378ADD' }}> dvc pull</strong> = copy from remote storage → local cache + workspace  |
              <strong style={{ color: '#7b61ff' }}> dvc checkout</strong> = restore files from local cache to workspace
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`# ── DVC project setup from scratch ───────────────────────────────────

# 1. Initialise Git and DVC in the same directory
git init
dvc init
# Creates: .dvc/ directory, .dvcignore, .dvc/config

# 2. Configure remote storage (S3 example)
dvc remote add -d myremote s3://company-ml-data/dvc-store
# -d = set as default remote
# For GCS: dvc remote add -d myremote gs://bucket/dvc-store
# For local (testing): dvc remote add -d myremote /tmp/dvc-remote

# 3. Track a large data file
# This MOVES the file to the DVC cache and creates a pointer
dvc add data/train.csv
# Creates:  data/train.csv.dvc   (tiny pointer file — commit this to Git)
# Adds:     data/train.csv to .gitignore  (never commit the actual data)
# Caches:   .dvc/cache/a3/f2b1c4...  (the actual file content)

cat data/train.csv.dvc
# outs:
# - md5: a3f2b1c4d5e6f7a8b9c0d1e2f3a4b5c6
#   size: 245678901
#   path: train.csv

# 4. Commit the pointer file to Git
git add data/train.csv.dvc data/.gitignore dvc.yaml
git commit -m "add training dataset v1.0"

# 5. Push data to remote storage
dvc push
# Uploads .dvc/cache/a3/f2b1c4... to s3://company-ml-data/dvc-store/a3/f2b1c4...

# ── Typical workflow for a team member ────────────────────────────────
# Clone the repo and get data:
git clone https://github.com/company/ml-project.git
cd ml-project
dvc pull              # downloads data matching current Git commit
# Downloads: data/train.csv from S3 to local workspace

# ── Updating the dataset ──────────────────────────────────────────────
# After adding new data to train.csv:
dvc add data/train.csv          # rehash, update .dvc file
git add data/train.csv.dvc
git commit -m "update training data: added March 2026 orders"
dvc push                        # upload new version to S3

# ── Reverting to a previous data version ──────────────────────────────
git checkout abc1234            # checkout old code commit
dvc checkout                    # restore data version for that commit
# DVC reads the .dvc pointer from that commit, fetches from cache/S3`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — DVC PIPELINES ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Beyond file tracking</span>
        <h2 style={S.h2}>DVC pipelines — define stages, dependencies, and outputs so reruns are smart</h2>

        <p style={S.p}>
          Tracking individual files is useful but DVC pipelines go further.
          A pipeline defines each processing stage — what inputs it depends on,
          what command it runs, what outputs it produces.
          DVC tracks all of these and only reruns a stage when its inputs
          have changed. If your feature engineering script has not changed
          and the raw data has not changed, <span style={S.code as React.CSSProperties}>dvc repro</span> skips
          that stage entirely. The entire ML workflow becomes a reproducible,
          incremental build system — like Make but for data.
        </p>

        <ConceptBox title="dvc.yaml — pipeline definition file">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.9 }}>
            <div style={{ color: '#888', marginBottom: 6, fontSize: 11 }}>dvc.yaml structure:</div>
            <div style={{ color: '#1D9E75', paddingLeft: 12, marginBottom: 4 }}>stages:</div>
            <div style={{ color: '#378ADD', paddingLeft: 24, marginBottom: 4 }}>
              prepare_data:
            </div>
            <div style={{ color: '#7b61ff', paddingLeft: 36 }}>
              cmd: python src/prepare.py            ← command to run
            </div>
            <div style={{ color: '#7b61ff', paddingLeft: 36 }}>
              deps: [data/raw.csv, src/prepare.py]  ← inputs (changes trigger rerun)
            </div>
            <div style={{ color: '#7b61ff', paddingLeft: 36, marginBottom: 8 }}>
              outs: [data/processed.csv]            ← outputs (tracked by DVC)
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>
              dvc.lock stores the MD5 hashes of all deps and outs after last run.
              dvc repro compares current hashes to dvc.lock — reruns only changed stages.
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`# ── dvc.yaml — complete ML pipeline ──────────────────────────────────
# This file lives in Git alongside your code

DVCYAML = """
stages:

  prepare_data:
    cmd: python src/prepare.py --input data/raw/orders.csv --output data/processed/
    deps:
      - data/raw/orders.csv
      - src/prepare.py
    outs:
      - data/processed/train.parquet
      - data/processed/val.parquet
      - data/processed/test.parquet
    params:
      - params.yaml:
          - prepare.train_fraction
          - prepare.val_fraction
          - prepare.cutoff_date

  featurise:
    cmd: python src/featurise.py
    deps:
      - data/processed/train.parquet
      - data/processed/val.parquet
      - src/featurise.py
    outs:
      - data/features/train_features.parquet
      - data/features/val_features.parquet

  train:
    cmd: python src/train.py
    deps:
      - data/features/train_features.parquet
      - data/features/val_features.parquet
      - src/train.py
    params:
      - params.yaml:
          - train.n_estimators
          - train.max_depth
          - train.learning_rate
    outs:
      - models/model.pkl
    metrics:
      - metrics/train_metrics.json:
          cache: false           # metrics stored in Git, not DVC cache

  evaluate:
    cmd: python src/evaluate.py
    deps:
      - models/model.pkl
      - data/processed/test.parquet
      - src/evaluate.py
    metrics:
      - metrics/eval_metrics.json:
          cache: false
    plots:
      - plots/confusion_matrix.csv:
          cache: false
"""

# ── params.yaml — hyperparameters tracked alongside data ──────────────
PARAMSYAML = """
prepare:
  train_fraction: 0.70
  val_fraction:   0.15
  cutoff_date:    "2026-03-01"

train:
  n_estimators: 200
  max_depth:    4
  learning_rate: 0.05
  random_seed:  42
"""

print("DVC pipeline commands:")
commands = [
    ('dvc repro',
     'Run all stages where deps have changed. Skip unchanged stages.'),
    ('dvc repro train',
     'Run only the train stage (and its unmet dependencies).'),
    ('dvc repro --force',
     'Force rerun all stages regardless of what changed.'),
    ('dvc dag',
     'Print ASCII diagram of the pipeline DAG.'),
    ('dvc status',
     'Show which stages are changed/outdated vs dvc.lock.'),
    ('dvc params diff',
     'Show parameter changes between current and last run.'),
    ('dvc metrics show',
     'Show metrics from metrics/*.json files.'),
    ('dvc metrics diff',
     'Compare metrics between two Git commits.'),
    ('dvc plots show plots/confusion_matrix.csv',
     'Open interactive plot in browser.'),
]
for cmd, desc in commands:
    print(f"  $ {cmd}")
    print(f"    {desc}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — FULL PIPELINE IN PYTHON ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The pipeline scripts</span>
        <h2 style={S.h2}>Complete DVC pipeline — four Python scripts driven by params.yaml</h2>

        <CodeBlock code={`# src/prepare.py — data preparation stage
import pandas as pd
import numpy as np
import yaml, os, argparse
from pathlib import Path

def prepare(input_path: str, output_dir: str, params: dict):
    """Load raw data, split by date, save processed splits."""
    print(f"Loading raw data from {input_path}")
    # In production: pd.read_csv(input_path) or query from warehouse
    np.random.seed(42)
    n = 10000
    df = pd.DataFrame({
        'order_id':       [f'ORD{i:05d}' for i in range(n)],
        'order_date':     pd.date_range('2026-01-01', periods=n, freq='1h'),
        'distance_km':    np.random.exponential(3.5, n),
        'is_peak_hour':   np.random.randint(0, 2, n),
        'order_value':    np.random.exponential(400, n),
        'restaurant_avg': np.random.normal(35, 8, n),
        'driver_avg':     np.random.normal(32, 7, n),
        'actual_time':    np.clip(
            np.random.exponential(3.5, n)*5.5 + np.random.randint(0,2,n)*7 +
            np.random.normal(0,5,n), 10, 90,
        ),
    })

    cutoff = pd.Timestamp(params['cutoff_date'])
    df_before = df[df['order_date'] < cutoff]

    train_frac = params['train_fraction']
    val_frac   = params['val_fraction']
    n_train    = int(len(df_before) * train_frac)
    n_val      = int(len(df_before) * val_frac)

    train = df_before.iloc[:n_train]
    val   = df_before.iloc[n_train:n_train+n_val]
    test  = df_before.iloc[n_train+n_val:]

    Path(output_dir).mkdir(parents=True, exist_ok=True)
    train.to_parquet(f'{output_dir}/train.parquet', index=False)
    val.to_parquet(f'{output_dir}/val.parquet', index=False)
    test.to_parquet(f'{output_dir}/test.parquet', index=False)

    print(f"  Train: {len(train):,}  Val: {len(val):,}  Test: {len(test):,}")

# ────────────────────────────────────────────────────────────────────────
# src/train.py — training stage
import pandas as pd, numpy as np, pickle, json, yaml
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error
from pathlib import Path

def train(features_dir: str, model_dir: str, metrics_dir: str, params: dict):
    """Train model, save artifact, log training metrics."""
    X_train = pd.read_parquet(f'{features_dir}/train_features.parquet')
    X_val   = pd.read_parquet(f'{features_dir}/val_features.parquet')

    feature_cols = [c for c in X_train.columns if c != 'actual_time']
    y_train = X_train['actual_time']
    y_val   = X_val['actual_time']

    model = GradientBoostingRegressor(
        n_estimators=params['n_estimators'],
        max_depth=params['max_depth'],
        learning_rate=params['learning_rate'],
        random_state=params.get('random_seed', 42),
    )
    model.fit(X_train[feature_cols], y_train)

    train_mae = mean_absolute_error(y_train, model.predict(X_train[feature_cols]))
    val_mae   = mean_absolute_error(y_val,   model.predict(X_val[feature_cols]))

    Path(model_dir).mkdir(parents=True, exist_ok=True)
    Path(metrics_dir).mkdir(parents=True, exist_ok=True)

    with open(f'{model_dir}/model.pkl', 'wb') as f:
        pickle.dump({'model': model, 'feature_cols': feature_cols}, f)

    # Metrics written to JSON — tracked by DVC metrics, not cached
    metrics = {'train_mae': round(train_mae, 4), 'val_mae': round(val_mae, 4)}
    with open(f'{metrics_dir}/train_metrics.json', 'w') as f:
        json.dump(metrics, f, indent=2)

    print(f"  Train MAE: {train_mae:.4f}  Val MAE: {val_mae:.4f}")
    return metrics

# ── Simulate running the pipeline stages ─────────────────────────────
with open('/tmp/params.yaml', 'w') as f:
    import yaml
    yaml.dump({
        'prepare': {
            'train_fraction': 0.70, 'val_fraction': 0.15,
            'cutoff_date': '2026-03-01',
        },
        'train': {
            'n_estimators': 200, 'max_depth': 4,
            'learning_rate': 0.05, 'random_seed': 42,
        },
    }, f)

with open('/tmp/params.yaml') as f:
    params = yaml.safe_load(f)

print("Running DVC pipeline stages:")
print("Stage 1: prepare_data")
prepare('/tmp/raw.csv', '/tmp/processed', params['prepare'])

print("\nStage 2: train (simulated with direct call)")
# In real DVC: this runs via dvc repro`} label="python" />
      </div>

      <Div />

      {/* ══ SECTION 5 — EXPERIMENT COMPARISON ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Comparing experiments</span>
        <h2 style={S.h2}>dvc exp — run, compare, and select the best experiment without leaving the terminal</h2>

        <p style={S.p}>
          DVC experiments extend the pipeline with a lightweight experiment
          tracking layer. Run an experiment with modified parameters without
          creating a new Git commit — DVC saves the experiment as a stash.
          After running several experiments, compare them in a table,
          pick the best one, and promote it to a full Git commit.
          This integrates with MLflow and W&B (Module 70) for richer
          visualisations while keeping the experiment lineage in Git.
        </p>

        <CodeBlock code={`# ── DVC experiment workflow ───────────────────────────────────────────

# Run baseline (current params.yaml)
# dvc repro
# git add dvc.lock metrics/ && git commit -m "baseline: lr=0.05 n_est=200"

# Run experiment with modified hyperparameters
# dvc exp run --set-param train.learning_rate=0.01
# dvc exp run --set-param train.n_estimators=300
# dvc exp run --set-param train.learning_rate=0.1 --set-param train.max_depth=6

# Compare all experiments
# dvc exp show
# Output:
# ┌────────────────┬──────────┬──────────┬──────────────┬───────────┐
# │ Experiment     │ train_mae│ val_mae  │ learning_rate│ n_estimators│
# ├────────────────┼──────────┼──────────┼──────────────┼───────────┤
# │ workspace      │ 4.2103   │ 5.8241   │ 0.05         │ 200       │
# │ exp-abc123     │ 4.8912   │ 6.1034   │ 0.01         │ 200       │
# │ exp-def456     │ 3.9201   │ 5.7123   │ 0.05         │ 300  ← best│
# │ exp-ghi789     │ 3.5102   │ 6.3401   │ 0.10         │ 200 ← overfit│
# └────────────────┴──────────┴──────────┴──────────────┴───────────┘

# Promote the best experiment to a Git commit
# dvc exp apply exp-def456   # update workspace to best experiment
# git add .
# git commit -m "best: n_estimators=300 val_mae=5.71"

# ── Python: programmatic experiment comparison ─────────────────────────
import json, yaml
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error

np.random.seed(42)
n = 2000
X_tr = np.random.randn(1600, 5)
y_tr = X_tr[:, 0] * 6 + X_tr[:, 2] * 3 + np.random.randn(1600) * 5
X_val = np.random.randn(400, 5)
y_val = X_val[:, 0] * 6 + X_val[:, 2] * 3 + np.random.randn(400) * 5

experiment_grid = [
    {'n_estimators': 100, 'max_depth': 3, 'learning_rate': 0.10},
    {'n_estimators': 200, 'max_depth': 4, 'learning_rate': 0.05},
    {'n_estimators': 300, 'max_depth': 4, 'learning_rate': 0.05},
    {'n_estimators': 200, 'max_depth': 6, 'learning_rate': 0.05},
    {'n_estimators': 200, 'max_depth': 4, 'learning_rate': 0.01},
]

print(f"{'n_est':>6} {'depth':>6} {'lr':>6} {'train_mae':>10} {'val_mae':>10} {'overfit_gap':>12}")
print("─" * 55)

results = []
for params in experiment_grid:
    model = GradientBoostingRegressor(**params, random_state=42)
    model.fit(X_tr, y_tr)
    train_mae = mean_absolute_error(y_tr, model.predict(X_tr))
    val_mae   = mean_absolute_error(y_val, model.predict(X_val))
    gap       = val_mae - train_mae
    results.append({**params, 'train_mae': train_mae, 'val_mae': val_mae})
    best_mark = ' ←' if val_mae == min(r['val_mae'] for r in results) else ''
    print(f"  {params['n_estimators']:>4}  {params['max_depth']:>5}  "
          f"{params['learning_rate']:>5.2f}  {train_mae:>10.4f}  "
          f"{val_mae:>10.4f}  {gap:>12.4f}{best_mark}")

best = min(results, key=lambda r: r['val_mae'])
print(f"\nBest experiment: n_estimators={best['n_estimators']} "
      f"max_depth={best['max_depth']} lr={best['learning_rate']} "
      f"val_mae={best['val_mae']:.4f}")`} label="python" />
      </div>

      <Div />

      {/* ══ SECTION 6 — GIT + DVC WORKFLOW ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Team collaboration</span>
        <h2 style={S.h2}>The complete Git + DVC daily workflow for an ML team</h2>

        <CodeBlock code={`# ── Complete Git + DVC workflow for a DoorDash ML team ────────────────

# ── Project structure ─────────────────────────────────────────────────
PROJECT_STRUCTURE = """
ml-project/
├── .git/                      ← Git tracks code and pointer files
├── .dvc/
│   ├── config                 ← remote storage URL, cache settings
│   └── cache/                 ← local content-addressable data cache
├── data/
│   ├── raw/
│   │   ├── orders.csv.dvc     ← GIT: pointer to raw data in S3
│   │   └── .gitignore         ← ignores orders.csv itself
│   ├── processed/             ← DVC output: ignored by Git
│   └── features/              ← DVC output: ignored by Git
├── models/
│   └── model.pkl              ← DVC output: ignored by Git
├── metrics/
│   └── eval_metrics.json      ← GIT: small metrics file committed
├── plots/
│   └── feature_importance.csv ← GIT: small plot data committed
├── src/
│   ├── prepare.py             ← GIT: code always in Git
│   ├── featurise.py
│   ├── train.py
│   └── evaluate.py
├── dvc.yaml                   ← GIT: pipeline definition
├── dvc.lock                   ← GIT: locked dep/output hashes after last run
├── params.yaml                ← GIT: hyperparameters
└── requirements.txt           ← GIT: Python dependencies
"""

# ── Day-in-the-life workflow ──────────────────────────────────────────
DAILY_WORKFLOW = """
Morning: Start work on a new feature experiment
──────────────────────────────────────────────────────────────────────

# 1. Get latest code and data
git pull
dvc pull                       # sync any new data versions from S3

# 2. Create a branch for your experiment
git checkout -b experiment/add-weather-features

# 3. Add new raw data (e.g. weather data enrichment)
cp /data/weather_march.csv data/raw/
dvc add data/raw/weather_march.csv
git add data/raw/weather_march.csv.dvc data/raw/.gitignore

# 4. Update the featurise script to use weather data
# ... edit src/featurise.py ...

# 5. Update params for this experiment
# ... edit params.yaml: add weather_features: true ...

# 6. Run the pipeline (only changed stages rerun)
dvc repro
# DVC detects: featurise.py changed + new data → reruns featurise + train + evaluate
# DVC skips:   prepare_data → raw data unchanged

# 7. Check metrics
dvc metrics show
# eval_metrics.json:
#   mae: 5.21   (improved from 5.87!)
#   rmse: 7.43

dvc metrics diff main          # compare to main branch
# Path                   Metric   HEAD        main      Change
# metrics/eval_metrics   mae      5.21        5.87      -0.66 ✓

# 8. Commit and push
git add dvc.lock params.yaml metrics/ src/featurise.py
git commit -m "add weather features: val_mae 5.87 → 5.21"
dvc push                       # push new data version to S3
git push origin experiment/add-weather-features

# 9. Open PR — reviewer can reproduce your experiment exactly:
# git checkout experiment/add-weather-features
# dvc pull
# dvc repro
# → Gets identical metrics

────────────────────────────────────────────────────────────────────
CI/CD pipeline (GitHub Actions) runs on every PR:
────────────────────────────────────────────────────────────────────

# .github/workflows/ml-ci.yml
CI_YAML = """\\
name: ML CI
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pip install "dvc[s3]" -r requirements.txt
      - run: dvc pull                    # download data from S3
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_KEY }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET }}
      - run: dvc repro                   # run full pipeline
      - run: |
          python -c "
          import json
          with open('metrics/eval_metrics.json') as f:
              m = json.load(f)
          assert m['mae'] < 6.5, f'MAE too high: {m[\\"mae\\"]}  (threshold: 6.5)'
          print(f'MAE gate passed: {m[\\"mae\\"]}')
          "
"""

print("Git + DVC command reference:")
cmd_ref = [
    ('dvc init',                    'Initialise DVC in a Git repo'),
    ('dvc remote add -d r s3://…',  'Set default remote storage'),
    ('dvc add file.csv',            'Track a file with DVC'),
    ('dvc repro',                   'Run pipeline (skip unchanged stages)'),
    ('dvc push',                    'Upload data to remote'),
    ('dvc pull',                    'Download data from remote'),
    ('dvc checkout',                'Restore data for current Git commit'),
    ('dvc status',                  'Show what has changed'),
    ('dvc metrics show',            'Print all tracked metrics'),
    ('dvc metrics diff HEAD~1',     'Compare metrics to previous commit'),
    ('dvc dag',                     'Print pipeline DAG'),
    ('dvc exp run --set-param k=v', 'Run experiment with modified param'),
    ('dvc exp show',                'Compare all experiments in a table'),
    ('dvc gc -w',                   'Garbage collect unused cache entries'),
]
for cmd, desc in cmd_ref:
    print(f"  {cmd:<40}  {desc}")`} label="bash" />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common DVC mistake — explained and fixed</h2>

        <ErrorBlock
          error="dvc pull fails — ERROR: failed to pull data from the cloud"
          cause="Remote storage credentials are not configured or have expired. DVC uses the same credential chain as AWS CLI (for S3), gcloud (for GCS), or Azure CLI — it does not have its own credential store. If AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are not set in the environment, or if the IAM role does not have GetObject permission on the S3 bucket, dvc pull fails with a cryptic error. Also caused by mismatched remote URL — the .dvc/config remote URL must exactly match where the data was pushed."
          fix="Check credentials: aws s3 ls s3://your-bucket — if this fails, credentials are wrong. For CI/CD: inject credentials as environment variables or use IAM instance roles. Check .dvc/config for the remote URL: dvc remote list -v. If the URL is wrong: dvc remote modify myremote url s3://correct-bucket. For team setup: use dvc remote modify myremote profile my-aws-profile to use a named AWS profile."
        />

        <ErrorBlock
          error="dvc repro reruns all stages every time — nothing is cached"
          cause="The dvc.lock file was not committed to Git. dvc.lock stores the MD5 hashes of all dependencies and outputs after the last successful run — it is how DVC knows what has changed. If dvc.lock is in .gitignore (a common mistake), DVC cannot read the previous run's hashes and treats everything as changed. Also caused by a random seed or timestamp written to an output file — if any output byte changes, DVC considers the stage changed."
          fix="Verify dvc.lock is in Git: git ls-files dvc.lock — it must appear. Remove dvc.lock from .gitignore if present. For non-deterministic outputs: set random seeds in every script (numpy, random, sklearn). If outputs inherently change each run (timestamps in output files), use metrics instead of outs for those files — metrics are compared by content not by hash."
        />

        <ErrorBlock
          error="dvc add accidentally tracks code files — .dvc pointer created for a Python script"
          cause="dvc add was run on src/ or a .py file by mistake. DVC will create a pointer file for the Python script and add the script to .gitignore — now the code is tracked by DVC not Git, and team members cannot see code changes in git log or git diff. This is a destructive mistake that is easy to make when doing dvc add data/ and accidentally including non-data files."
          fix="Only run dvc add on data files and model artifacts — never on code. If the mistake happened: git rm --cached src/file.py.dvc, remove the .dvc pointer file, remove src/file.py from .gitignore, git add src/file.py, git commit. Use a .dvcignore file (analogous to .gitignore) to prevent DVC from tracking certain file types: add *.py, *.yaml, *.json to .dvcignore. Always check git status after dvc add to verify only data files were changed."
        />

        <ErrorBlock
          error="Two team members modify the same dataset — dvc push conflict"
          cause="Team member A and team member B both modify data/train.csv independently and both run dvc add + git commit. The .dvc pointer files have different MD5 hashes. When they try to merge, Git detects a conflict in data/train.csv.dvc — a three-way merge conflict in a YAML file with different MD5 hashes. There is no automatic resolution — you must decide which version of the data is correct."
          fix="Establish a convention: raw data is immutable and owned by the data pipeline — never hand-edit it. Processed/feature data is regenerated by dvc repro — never manually added. If two branches genuinely produced different training datasets, resolve the .dvc conflict by choosing one version: git checkout --ours data/train.csv.dvc (keep your version) or git checkout --theirs data/train.csv.dvc (take their version), then dvc checkout to restore the actual data file. For large teams: use a data registry pattern — one person owns each dataset and all transformations go through the dvc repro pipeline."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          Data is versioned. Next: design any ML system from first principles.
        </h2>

        <p style={S.p}>
          Module 75 is the final module of the MLOps section and one of the
          most practically valuable in the entire track — ML System Design.
          Given a real-world ML problem (build DoorDash's delivery time prediction
          system from scratch, or Stripe's fraud detection system), how do you
          design the full architecture? Data collection, feature engineering,
          model selection, serving infrastructure, monitoring, and the tradeoffs
          at each decision. This is what senior ML engineering interviews test
          and what every ML architect does on day one of a new project.
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
              Next — Module 75 · MLOps
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              ML System Design — End to End
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Design any ML system from scratch. The framework, tradeoffs,
              capacity estimation, and how to present it in an interview.
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
          'DVC adds data and model versioning on top of Git. It stores large files in S3/GCS and keeps tiny .dvc pointer files (200 bytes containing the MD5 hash) in Git. git checkout an old branch, then dvc checkout restores the exact data that branch used. Every model in your history has a corresponding dataset version, feature pipeline version, and code version.',
          'Three storage locations work together: Git stores .dvc pointer files and dvc.yaml pipeline definitions (kilobytes), local .dvc/cache stores content-addressable data by MD5 hash (gigabytes), remote S3/GCS stores the shared team copy (same structure as local cache). dvc push uploads local cache to remote. dvc pull downloads from remote to local cache and workspace.',
          'DVC pipelines (dvc.yaml) define stages with commands, deps (inputs that trigger reruns), outs (outputs tracked by DVC), params (hyperparameters from params.yaml), and metrics (small JSON files committed to Git). dvc repro only reruns stages where deps have changed — tracked in dvc.lock which must be committed to Git.',
          'dvc exp run --set-param key=value runs an experiment with modified hyperparameters without creating a Git commit. dvc exp show compares all experiments in a table. dvc metrics diff HEAD~1 shows metric changes versus the previous commit. The best experiment is promoted with dvc exp apply then committed normally.',
          'Never run dvc add on code files (.py, .yaml) — only on data files and model artifacts. Add *.py to .dvcignore to prevent accidental tracking. Always commit dvc.lock to Git — without it, DVC cannot detect what has changed and reruns everything. Commit metrics/ and plots/ files to Git (cache: false in dvc.yaml) so metrics are visible in git log and GitHub.',
          'The complete team workflow: git pull && dvc pull (get latest), git checkout -b experiment/name (branch), edit code + params, dvc repro (run changed stages), dvc metrics diff main (compare to main), git add dvc.lock params.yaml metrics/ src/ && git commit, dvc push (upload data), git push. CI/CD runs dvc pull + dvc repro + metric assertions on every PR.',
        ]}
      />
    </LearnLayout>
  )
}