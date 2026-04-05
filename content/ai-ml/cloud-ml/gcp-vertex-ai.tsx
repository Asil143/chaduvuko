import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'GCP Vertex AI — Pipelines and AutoML — Chaduvuko',
  description:
    'Vertex AI Training, Pipelines, Feature Store, Model Registry, and online prediction endpoints. The GCP-native ML platform with best-in-class BigQuery integration.',
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

function ConceptBox({ title, children, color = '#4285f4' }: {
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

export default function VertexAIPage() {
  return (
    <LearnLayout
      title="GCP Vertex AI — Pipelines and AutoML"
      description="Vertex AI Training, Pipelines, Feature Store, Model Registry, and online prediction endpoints. The GCP-native ML platform with best-in-class BigQuery integration."
      section="Cloud ML Platforms"
      readTime="50–55 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="cloud-ml" topic="gcp-vertex-ai" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — why Vertex AI is different</span>
        <h2 style={S.h2}>
          Vertex AI is what happens when Google builds a managed ML platform
          on top of the infrastructure that runs Search, Maps, YouTube, and Gmail.
          BigQuery is the native data warehouse. TPUs are first-class compute.
          The Feature Store is the most production-ready managed one available.
        </h2>

        <p style={S.p}>
          Vertex AI is Google's unified ML platform — launched in 2021 by
          merging AI Platform, AutoML, and several other GCP ML services
          into a single product. It is the platform of choice at Indian companies
          that run on GCP: Ola, Juspay, ShareChat, Dunzo, and many analytics-heavy
          companies. Its distinguishing strengths over Azure ML and SageMaker:
          BigQuery integration is native and seamless (query data directly
          from training scripts without copying to object storage), the
          Vertex AI Feature Store is the most complete managed feature store
          across all three clouds, and TPU access is unique to GCP.
        </p>

        <p style={S.p}>
          The Vertex AI SDK (google-cloud-aiplatform) is the Python interface.
          Like SageMaker, GCP services work together: Cloud Storage (equivalent
          of S3) holds data and artifacts, Artifact Registry (equivalent of ECR)
          holds Docker images, Cloud Logging holds job logs, and IAM manages
          permissions via service accounts. The mental model from the last
          two modules transfers directly — different names, same concepts.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Azure ML is a hotel, SageMaker is a city block, and Vertex AI
            is a university campus. Everything is Google-designed and integrated —
            the cafeteria (BigQuery) is connected to the research labs (Vertex Training)
            by a covered walkway, the library (Feature Store) is shared by all
            departments, and the campus bus (Vertex Pipelines) runs on a fixed
            schedule connecting everything. Off-campus services exist but the
            campus is designed to keep you within the Google ecosystem,
            and for data-heavy ML work the integration genuinely pays off.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#4285f4' }}>
            The most important Vertex AI concept: everything is a resource
            with a resource name in the format
            projects/{'{'}project{'}'}/locations/{'{'}region{'}'}/resourceType/{'{'}id{'}'}.
            Every API call uses this format. Every log entry references it.
            Once you internalise this pattern, navigating Vertex AI becomes
            predictable — you always know where to look for anything.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          Install: <span style={S.code as React.CSSProperties}>pip install google-cloud-aiplatform google-cloud-bigquery</span>.
          Authenticate: <span style={S.code as React.CSSProperties}>gcloud auth application-default login</span>.
          Free tier: GCP gives US$300 credit for 90 days.
          All examples use Vertex AI SDK v1 (google-cloud-aiplatform&gt;=1.50).
          Set your project and region once:
          <span style={S.code as React.CSSProperties}> aiplatform.init(project='your-project', location='asia-south1')</span>.
          asia-south1 is Mumbai — lowest latency for India.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — CORE CONCEPTS ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The Vertex AI mental model</span>
        <h2 style={S.h2}>GCS, IAM service accounts, Artifact Registry, and Vertex — four services that power every job</h2>

        <VisualBox label="Vertex AI resource map — what each service does">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                service: 'Cloud Storage (GCS)',
                color: '#4285f4',
                role: 'Data and artifact storage. Training data input. Model artifact output. Pipeline metadata. Same role as S3 in AWS.',
                example: 'gs://freshmart-ml/training-data/  →  Vertex reads input\ngs://freshmart-ml/model-output/  ←  Vertex writes model',
                awsEquiv: 'AWS S3',
              },
              {
                service: 'Service Account + IAM',
                color: '#D85A30',
                role: 'Vertex jobs impersonate a service account. Must have: Storage Object Viewer on input bucket, Storage Object Creator on output bucket, Vertex AI User role.',
                example: 'freshmart-ml-sa@project.iam.gserviceaccount.com',
                awsEquiv: 'AWS IAM Execution Role',
              },
              {
                service: 'Artifact Registry',
                color: '#7b61ff',
                role: 'Docker image registry. Vertex pulls training and prediction container images from here. Use Google deep learning containers or push custom images.',
                example: 'asia-south1-docker.pkg.dev/project/repo/training:latest',
                awsEquiv: 'AWS ECR',
              },
              {
                service: 'BigQuery',
                color: '#1D9E75',
                role: 'Native data warehouse. Query training data directly from BigQuery in training scripts — no intermediate CSV/Parquet copy needed. Unique to GCP.',
                example: 'bq://project.freshmart_dataset.orders  →  direct training input',
                awsEquiv: 'AWS Athena (less integrated)',
              },
              {
                service: 'Cloud Logging',
                color: '#ff9900',
                role: 'All stdout/stderr from training jobs and prediction servers streams here. First place to look when a job fails.',
                example: 'resource.type="aiplatform.googleapis.com/CustomJob"  → job logs',
                awsEquiv: 'AWS CloudWatch Logs',
              },
            ].map((item) => (
              <div key={item.service} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 7, padding: '10px 12px',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: item.color }}>{item.service}</span>
                  <span style={{ fontSize: 10, color: '#888', fontFamily: 'var(--font-mono)' }}>≈ {item.awsEquiv}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.role}</span>
                  <span style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)', whiteSpace: 'pre-wrap' as const }}>{item.example}</span>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`# pip install google-cloud-aiplatform google-cloud-bigquery

from google.cloud import aiplatform
from google.cloud import bigquery
import os

# ── Initialise Vertex AI — do this once at the top of every script ────
PROJECT  = os.environ.get('GOOGLE_CLOUD_PROJECT', 'freshmart-ml-project')
REGION   = 'asia-south1'       # Mumbai — lowest latency for India
BUCKET   = f'gs://{PROJECT}-vertex'
STAGING  = f'{BUCKET}/staging'

aiplatform.init(
    project=PROJECT,
    location=REGION,
    staging_bucket=STAGING,    # temporary files (uploaded scripts, packages)
)
print(f"Vertex AI initialised: project={PROJECT}  region={REGION}")

# ── Resource naming pattern — memorise this ───────────────────────────
print("""
Vertex AI resource name format:
  projects/{PROJECT_ID}/locations/{REGION}/{resource_type}/{resource_id}

  Examples:
  Custom job:   projects/123/locations/asia-south1/customJobs/456
  Model:        projects/123/locations/asia-south1/models/789
  Endpoint:     projects/123/locations/asia-south1/endpoints/012
  Pipeline run: projects/123/locations/asia-south1/pipelineJobs/345
  Feature Store: projects/123/locations/asia-south1/featurestores/678

  The SDK accepts both full resource names and short IDs interchangeably.
""")

# ── BigQuery integration — the unique GCP advantage ───────────────────
bq_client = bigquery.Client(project=PROJECT)

# Query training data directly — no S3/GCS copy needed
TRAINING_QUERY = """
SELECT
    distance_km,
    is_peak_hour,
    order_value,
    restaurant_avg_delivery_time,
    driver_avg_delivery_time,
    actual_delivery_time AS actual_time
FROM
    \`freshmart-ml-project.freshmart.orders\`
WHERE
    order_date BETWEEN '2026-01-01' AND '2026-03-01'
    AND actual_delivery_time IS NOT NULL
    AND actual_delivery_time BETWEEN 5 AND 120
"""

print("BigQuery training data query:")
print(TRAINING_QUERY.strip())
print("""
In training scripts — read BigQuery directly:
  from google.cloud import bigquery
  import pandas as pd

  df = bq_client.query(TRAINING_QUERY).to_dataframe()
  print(f"Loaded {len(df):,} training rows from BigQuery")
  # No intermediate CSV/Parquet file needed — Vertex handles auth
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — CUSTOM TRAINING JOBS ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Running training on managed compute</span>
        <h2 style={S.h2}>CustomTrainingJob — submit any Python script to Vertex managed compute</h2>

        <p style={S.p}>
          A Vertex AI CustomTrainingJob is equivalent to an AML Command Job
          and a SageMaker Training Job. You provide a Python script,
          a machine type, and optionally a custom Docker image.
          Vertex provisions a GCE instance, runs the script, streams logs
          to Cloud Logging, and uploads model artifacts to GCS.
          The instance terminates immediately when the job completes.
          Pre-built containers for scikit-learn, XGBoost, PyTorch, and TensorFlow
          eliminate the need to build custom Docker images for standard frameworks.
        </p>

        <CodeBlock code={`from google.cloud import aiplatform
from google.cloud.aiplatform import CustomTrainingJob
import numpy as np

aiplatform.init(project=PROJECT, location=REGION, staging_bucket=STAGING)

# ── Training script: train.py ─────────────────────────────────────────
# Vertex injects paths via AIP_ environment variables
# Script is identical to local — just read from AIP_ paths

TRAIN_SCRIPT = """
# train.py
import os, argparse, pickle, json
import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from google.cloud import bigquery, storage

# Vertex AI injects these environment variables
AIP_MODEL_DIR       = os.environ.get('AIP_MODEL_DIR', '/tmp/model')
AIP_DATA_FORMAT     = os.environ.get('AIP_DATA_FORMAT', 'bigquery')
AIP_TRAINING_DATA_URI = os.environ.get('AIP_TRAINING_DATA_URI', '')

parser = argparse.ArgumentParser()
parser.add_argument('--n-estimators',  type=int,   default=200)
parser.add_argument('--max-depth',     type=int,   default=4)
parser.add_argument('--learning-rate', type=float, default=0.05)
parser.add_argument('--project',       type=str,   default='freshmart-ml-project')
args = parser.parse_args()

# ── Load data from BigQuery (the GCP way) ─────────────────────────────
if AIP_TRAINING_DATA_URI.startswith('bq://'):
    table_ref = AIP_TRAINING_DATA_URI[5:]   # strip bq://
    bq_client = bigquery.Client(project=args.project)
    df = bq_client.query(f'SELECT * FROM \`{table_ref}\`').to_dataframe()
else:
    # Fallback: read from GCS
    import gcsfs
    df = pd.read_csv(AIP_TRAINING_DATA_URI)

feature_cols = [c for c in df.columns if c != 'actual_time']
X, y = df[feature_cols], df['actual_time']
print(f"Training on {len(df):,} rows, {len(feature_cols)} features")

# ── Train ──────────────────────────────────────────────────────────────
model = GradientBoostingRegressor(
    n_estimators=args.n_estimators,
    max_depth=args.max_depth,
    learning_rate=args.learning_rate,
    random_state=42,
)
model.fit(X, y)

mae = mean_absolute_error(y, model.predict(X))
r2  = r2_score(y, model.predict(X))
print(f'MAE: {mae:.4f}  R2: {r2:.4f}')  # captured by Cloud Logging

# ── Save to AIP_MODEL_DIR (Vertex uploads this to GCS) ────────────────
os.makedirs(AIP_MODEL_DIR, exist_ok=True)
with open(f'{AIP_MODEL_DIR}/model.pkl', 'wb') as f:
    pickle.dump({'model': model, 'feature_cols': feature_cols}, f)

metrics = {'mae': round(mae, 4), 'r2': round(r2, 4)}
with open(f'{AIP_MODEL_DIR}/metrics.json', 'w') as f:
    json.dump(metrics, f)

print('Training complete.')
"""

# ── Submit CustomTrainingJob ───────────────────────────────────────────
job = CustomTrainingJob(
    display_name='freshmart-delivery-training',
    script_path='./src/train.py',      # local script — Vertex uploads to GCS
    container_uri=(
        'asia-south1-docker.pkg.dev/deeplearning-platform-release/'
        'gcr.io/us-docker.pkg.dev/vertex-ai/training/sklearn-cpu.1-3:latest'
    ),
    # Pre-built sklearn container — no Dockerfile needed
    # Available: sklearn-cpu.1-3, xgboost-cpu.1-7, pytorch-gpu.2-1, tf-cpu.2-14

    requirements=['lightgbm==4.3.0'],  # extra packages to install
    model_serving_container_image_uri=(
        'us-docker.pkg.dev/vertex-ai/prediction/sklearn-cpu.1-3:latest'
    ),
)

# Run the job
# model = job.run(
#     dataset=None,    # or pass a Vertex Managed Dataset
#     args=[
#         '--n-estimators', '200',
#         '--max-depth', '4',
#         '--learning-rate', '0.05',
#         '--project', PROJECT,
#     ],
#     replica_count=1,
#     machine_type='n1-standard-4',     # 4 vCPU, 15 GB RAM ≈ ₹6/hr
#     # machine_type='n1-standard-8',   # 8 vCPU, 30 GB RAM ≈ ₹12/hr
#     # machine_type='n1-highmem-16',   # 16 vCPU, 104 GB RAM for large datasets
#     accelerator_type=None,            # or 'NVIDIA_TESLA_T4' for GPU
#     accelerator_count=0,
#     base_output_dir=f'{BUCKET}/model-output/',
#     sync=True,      # block until complete
# )

print("CustomTrainingJob configuration:")
print(f"  Machine:    n1-standard-4 (4 vCPU, 15 GB RAM)")
print(f"  Container:  sklearn-cpu.1-3 (pre-built, no Docker build needed)")
print(f"  Output:     {BUCKET}/model-output/")

# ── Machine type cheat sheet ──────────────────────────────────────────
print("\nVertex AI machine type comparison:")
machines = [
    ('n1-standard-4',   4,   15,    6,   'Standard training, small datasets'),
    ('n1-standard-8',   8,   30,   12,   'Medium datasets, parallelisable prep'),
    ('n1-highmem-16',  16,  104,   30,   'Large in-memory datasets > 30GB'),
    ('n1-standard-4 + T4 GPU', 4, 15, 40, 'PyTorch/TF training, fine-tuning LLMs'),
    ('a2-highgpu-1g + A100', 12, 85, 300, 'Large model training, serious deep learning'),
]
print(f"  {'Machine':<32} {'vCPU':>5} {'RAM':>6} {'₹/hr':>6}  Notes")
print("  " + "─" * 65)
for name, cpu, ram, cost, note in machines:
    print(f"  {name:<32} {cpu:>5} {ram:>5}G {cost:>6}  {note}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — VERTEX AI PIPELINES ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Orchestrating multi-step workflows</span>
        <h2 style={S.h2}>Vertex AI Pipelines — KFP components and pipelines with full lineage tracking</h2>

        <p style={S.p}>
          Vertex AI Pipelines is built on Kubeflow Pipelines (KFP) v2 —
          the same open-source pipeline framework used at Airbnb, Twitter,
          and many Indian companies running on-premise Kubernetes.
          Each step is a KFP component decorated with
          <span style={S.code as React.CSSProperties}> @component</span>.
          Components are pure Python functions that declare typed inputs and outputs.
          The pipeline function wires components together — outputs of one step
          become inputs of the next. Vertex compiles the pipeline to an
          YAML artifact and runs it on managed infrastructure with full
          lineage tracking in the Vertex ML Metadata store.
        </p>

        <ConceptBox title="KFP component types — three ways to define a step" color="#4285f4">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                type: 'Lightweight Python component',
                when: 'Simple transformations, data validation, metric computation',
                how: '@component decorator on a pure Python function. Vertex installs packages and runs it.',
                limit: 'No GPU support. Limited packages. Good for < 10s operations.',
              },
              {
                type: 'Container component',
                when: 'Training jobs, complex processing, GPU-required steps',
                how: 'Wraps a custom Docker image + command. Full control over the execution environment.',
                limit: 'Requires building and pushing a Docker image to Artifact Registry.',
              },
              {
                type: 'Pre-built Google components',
                when: 'AutoML training, BigQuery export, model evaluation',
                how: 'from google_cloud_pipeline_components.v1 import ... — ready-made GCP-specific steps.',
                limit: 'GCP-specific. Limited customisation. Best for standard workflows.',
              },
            ].map((item) => (
              <div key={item.type} style={{
                background: 'var(--bg2)', borderRadius: 5, padding: '8px 12px',
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#4285f4', marginBottom: 5 }}>{item.type}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, fontSize: 11, color: 'var(--muted)' }}>
                  <span><strong style={{ color: '#4285f4' }}>Use when:</strong> {item.when}</span>
                  <span><strong style={{ color: '#4285f4' }}>How:</strong> {item.how}</span>
                  <span><strong style={{ color: '#ff4757' }}>Limit:</strong> {item.limit}</span>
                </div>
              </div>
            ))}
          </div>
        </ConceptBox>

        <CodeBlock code={`# pip install kfp google-cloud-pipeline-components

import kfp
from kfp import dsl, compiler
from kfp.dsl import component, pipeline, Input, Output, Dataset, Model, Metrics
from typing import NamedTuple
import json

# ── Component 1: Data preparation (lightweight Python component) ───────
@component(
    base_image='python:3.11-slim',
    packages_to_install=['pandas', 'scikit-learn', 'google-cloud-bigquery',
                          'google-cloud-bigquery-storage', 'pyarrow'],
)
def prepare_data(
    project:          str,
    cutoff_date:      str,
    train_dataset:    Output[Dataset],
    test_dataset:     Output[Dataset],
    data_stats:       Output[Metrics],
) -> None:
    """Query BigQuery, split by date, save to GCS via Dataset artifacts."""
    from google.cloud import bigquery
    import pandas as pd

    bq = bigquery.Client(project=project)
    df = bq.query(f"""
        SELECT distance_km, is_peak_hour, order_value,
               restaurant_avg_delivery_time AS restaurant_avg,
               driver_avg_delivery_time     AS driver_avg,
               actual_delivery_time         AS actual_time
        FROM   \`{project}.freshmart.orders\`
        WHERE  order_date < '{cutoff_date}'
          AND  actual_delivery_time BETWEEN 5 AND 120
    """).to_dataframe()

    cutoff = pd.Timestamp(cutoff_date) - pd.Timedelta(days=30)
    train  = df[df.index < int(len(df) * 0.8)]
    test   = df[df.index >= int(len(df) * 0.8)]

    # KFP Dataset artifacts — Vertex tracks lineage of these files
    train.to_csv(train_dataset.path, index=False)
    test.to_csv(test_dataset.path,   index=False)

    # Log metadata metrics — visible in Vertex ML Metadata
    data_stats.log_metric('n_train', len(train))
    data_stats.log_metric('n_test',  len(test))
    data_stats.log_metric('n_features', len(df.columns) - 1)

# ── Component 2: Train model ───────────────────────────────────────────
@component(
    base_image='python:3.11-slim',
    packages_to_install=['scikit-learn', 'pandas', 'numpy'],
)
def train_model(
    train_dataset:  Input[Dataset],
    n_estimators:   int,
    max_depth:      int,
    learning_rate:  float,
    model_artifact: Output[Model],
    train_metrics:  Output[Metrics],
) -> None:
    import pandas as pd, numpy as np, pickle
    from sklearn.ensemble import GradientBoostingRegressor
    from sklearn.metrics import mean_absolute_error, r2_score

    df   = pd.read_csv(train_dataset.path)
    feat = [c for c in df.columns if c != 'actual_time']
    X, y = df[feat], df['actual_time']

    model = GradientBoostingRegressor(
        n_estimators=n_estimators,
        max_depth=max_depth,
        learning_rate=learning_rate,
        random_state=42,
    )
    model.fit(X, y)

    mae = mean_absolute_error(y, model.predict(X))
    r2  = r2_score(y, model.predict(X))

    train_metrics.log_metric('train_mae', mae)
    train_metrics.log_metric('train_r2',  r2)

    # Save model to KFP Model artifact path
    import os, json
    os.makedirs(model_artifact.path, exist_ok=True)
    with open(f'{model_artifact.path}/model.pkl', 'wb') as f:
        pickle.dump({'model': model, 'feature_cols': feat}, f)
    with open(f'{model_artifact.path}/metadata.json', 'w') as f:
        json.dump({'train_mae': mae, 'train_r2': r2}, f)

# ── Component 3: Evaluate model ────────────────────────────────────────
@component(
    base_image='python:3.11-slim',
    packages_to_install=['scikit-learn', 'pandas', 'numpy'],
)
def evaluate_model(
    model_artifact: Input[Model],
    test_dataset:   Input[Dataset],
    eval_metrics:   Output[Metrics],
) -> NamedTuple('EvalOutput', [('test_mae', float), ('passed_gate', bool)]):
    import pandas as pd, numpy as np, pickle
    from sklearn.metrics import mean_absolute_error, r2_score
    from collections import namedtuple

    df   = pd.read_csv(test_dataset.path)
    feat = [c for c in df.columns if c != 'actual_time']

    with open(f'{model_artifact.path}/model.pkl', 'rb') as f:
        art = pickle.load(f)

    preds  = art['model'].predict(df[feat])
    mae    = mean_absolute_error(df['actual_time'], preds)
    r2     = r2_score(df['actual_time'], preds)
    w5min  = float((np.abs(preds - df['actual_time']) <= 5).mean() * 100)

    eval_metrics.log_metric('test_mae',       mae)
    eval_metrics.log_metric('test_r2',        r2)
    eval_metrics.log_metric('within_5min_pct', w5min)

    passed = mae <= 7.0
    EvalOutput = namedtuple('EvalOutput', ['test_mae', 'passed_gate'])
    return EvalOutput(test_mae=mae, passed_gate=passed)

# ── Pipeline: wire components together ────────────────────────────────
@pipeline(
    name='freshmart-training-pipeline',
    description='Daily retraining pipeline for FreshMart delivery time model',
    pipeline_root=f'{BUCKET}/pipeline-root/',
)
def training_pipeline(
    project:       str = PROJECT,
    cutoff_date:   str = '2026-03-01',
    n_estimators:  int = 200,
    max_depth:     int = 4,
    learning_rate: float = 0.05,
):
    # Step 1: Prepare data
    prepare_op = prepare_data(
        project=project,
        cutoff_date=cutoff_date,
    )
    prepare_op.set_cpu_limit('2').set_memory_limit('8G')

    # Step 2: Train model — receives datasets from prepare step
    train_op = train_model(
        train_dataset=prepare_op.outputs['train_dataset'],
        n_estimators=n_estimators,
        max_depth=max_depth,
        learning_rate=learning_rate,
    )
    train_op.set_cpu_limit('4').set_memory_limit('16G')

    # Step 3: Evaluate
    eval_op = evaluate_model(
        model_artifact=train_op.outputs['model_artifact'],
        test_dataset=prepare_op.outputs['test_dataset'],
    )

    # Step 4: Conditional — only import model if gate passes
    with dsl.If(eval_op.outputs['passed_gate'] == True, name='quality-gate'):
        from google_cloud_pipeline_components.v1.model import ModelUploadOp
        upload_op = ModelUploadOp(
            project=project,
            display_name='freshmart-delivery-time',
            unmanaged_container_model=train_op.outputs['model_artifact'],
        )

# ── Compile and submit ────────────────────────────────────────────────
compiler.Compiler().compile(
    pipeline_func=training_pipeline,
    package_path='/tmp/freshmart_pipeline.yaml',
)
print("Pipeline compiled to /tmp/freshmart_pipeline.yaml")

# Submit to Vertex AI
# job = aiplatform.PipelineJob(
#     display_name='freshmart-training-run',
#     template_path='/tmp/freshmart_pipeline.yaml',
#     pipeline_root=f'{BUCKET}/pipeline-root/',
#     parameter_values={
#         'project':       PROJECT,
#         'cutoff_date':   '2026-03-28',
#         'n_estimators':  300,
#         'learning_rate': 0.03,
#     },
# )
# job.submit()
# print(f"Pipeline running: {job.resource_name}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — VERTEX AI FEATURE STORE ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The best managed feature store</span>
        <h2 style={S.h2}>Vertex AI Feature Store — define features once, serve at 1ms online and petabyte offline</h2>

        <p style={S.p}>
          Vertex AI Feature Store is widely considered the most production-ready
          managed feature store across all three major clouds. It solves the
          training-serving skew problem from Module 69 at scale — features
          are defined once, computed once, and served consistently to both
          the training pipeline (point-in-time correct historical values)
          and the inference endpoint (latest values at &lt;1ms latency).
          BigQuery serves as the offline store. Bigtable or the Vertex-managed
          online store serves the online tier.
        </p>

        <CodeBlock code={`from google.cloud import aiplatform
from google.cloud.aiplatform import featurestore

aiplatform.init(project=PROJECT, location=REGION)

# ── Create a Feature Store ─────────────────────────────────────────────
# A Feature Store is the top-level container — one per domain
# fs = aiplatform.Featurestore.create(
#     featurestore_id='freshmart_features',
#     online_store_fixed_node_count=1,   # number of Bigtable nodes (scale for RPS)
#     labels={'team': 'delivery-ml', 'env': 'production'},
# )

# ── Create Entity Types (equivalent to Feast Entity) ──────────────────
# An Entity Type groups features for the same real-world entity
# restaurant_entity = fs.create_entity_type(
#     entity_type_id='restaurant',
#     description='Per-restaurant delivery features',
# )

# driver_entity = fs.create_entity_type(
#     entity_type_id='driver',
#     description='Per-driver performance features',
# )

# ── Create Features within an Entity Type ────────────────────────────
RESTAURANT_FEATURES = [
    ('avg_delivery_time_15min',   'DOUBLE',  'Rolling 15-min avg delivery time'),
    ('order_count_7d',            'INT64',   'Orders completed in last 7 days'),
    ('acceptance_rate_1h',        'DOUBLE',  'Order acceptance rate in last 1 hour'),
    ('avg_prep_time_7d',          'DOUBLE',  'Avg kitchen prep time over 7 days'),
    ('rating_30d',                'DOUBLE',  'Average rating in last 30 days'),
]

# restaurant_entity.batch_create_features(
#     feature_configs=[
#         featurestore.Feature.Spec(
#             description=desc,
#             value_type=vtype,
#         )
#         for fname, vtype, desc in RESTAURANT_FEATURES
#     ],
#     feature_ids=[fname for fname, _, _ in RESTAURANT_FEATURES],
# )

print("Feature Store structure:")
print("""
  freshmart_features/
  ├── restaurant (entity type)
  │   ├── avg_delivery_time_15min  (DOUBLE)
  │   ├── order_count_7d           (INT64)
  │   ├── acceptance_rate_1h       (DOUBLE)
  │   ├── avg_prep_time_7d         (DOUBLE)
  │   └── rating_30d               (DOUBLE)
  └── driver (entity type)
      ├── avg_delivery_time_30min  (DOUBLE)
      ├── completed_orders_7d      (INT64)
      ├── avg_speed_kmph_1h        (DOUBLE)
      └── cancellation_rate_7d     (DOUBLE)
""")

# ── Batch import features from BigQuery ───────────────────────────────
# restaurant_entity.ingest_from_bq(
#     feature_ids=['avg_delivery_time_15min', 'order_count_7d', ...],
#     feature_time='feature_timestamp',     # timestamp column in BQ table
#     bq_source_uri='bq://project.freshmart.restaurant_features',
# )

# ── Scheduled materialisation job ─────────────────────────────────────
print("Materialisation pattern:")
print("""
  # Run hourly to keep online store fresh:
  restaurant_entity.materialize(
      feature_ids=['avg_delivery_time_15min', 'acceptance_rate_1h'],
      start_time=datetime.now() - timedelta(hours=2),
      end_time=datetime.now(),
  )
  # Copies features from BigQuery offline store → Bigtable online store
  # Same semantics as Feast materialize from Module 69
""")

# ── Online serving — real-time feature lookup ─────────────────────────
# In-flight prediction: fetch latest features in ~1ms
def serve_features(restaurant_id: str, driver_id: str) -> dict:
    """
    Real-time feature lookup from Vertex Feature Store online serving.
    Called at inference time — ~1ms latency from Bigtable.
    """
    # fs = aiplatform.Featurestore(featurestore_name='freshmart_features')
    # result = fs.read_feature_values(
    #     entity_type='restaurant',
    #     entity_ids=[restaurant_id],
    #     feature_selector=featurestore.FeatureSelector(
    #         id_matcher=featurestore.IdMatcher(
    #             ids=['avg_delivery_time_15min', 'order_count_7d']
    #         )
    #     ),
    # )

    # Simulated result
    return {
        'avg_delivery_time_15min': 33.2,
        'order_count_7d':          245,
        'acceptance_rate_1h':      0.94,
    }

features = serve_features('RST001', 'DRV01')
print(f"\nOnline feature lookup result: {features}")

# ── Historical serving — point-in-time correct for training ───────────
print("""
Point-in-time correct batch serving for training:
  fs.batch_serve_to_bq(
      bq_destination_output_uri='bq://project.freshmart.training_features',
      serving_feature_specs={
          'restaurant': ['avg_delivery_time_15min', 'order_count_7d', 'rating_30d'],
          'driver':     ['avg_delivery_time_30min', 'completed_orders_7d'],
      },
      read_instances_uri='bq://project.freshmart.training_events',
      # training_events has: entity_id, timestamp columns
      # Vertex returns features AS OF each event's timestamp (no leakage)
  )
  # Same as Feast get_historical_features() from Module 69
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — ONLINE ENDPOINTS ═════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Serving predictions in real time</span>
        <h2 style={S.h2}>Vertex AI Online Predictions — deploy, call, and split traffic in three SDK calls</h2>

        <CodeBlock code={`from google.cloud import aiplatform

aiplatform.init(project=PROJECT, location=REGION)

# ── Upload model to Vertex Model Registry ────────────────────────────
# model = aiplatform.Model.upload(
#     display_name='freshmart-delivery-time-v3',
#     artifact_uri=f'{BUCKET}/model-output/model/',   # GCS path to model files
#     serving_container_image_uri=(
#         'us-docker.pkg.dev/vertex-ai/prediction/sklearn-cpu.1-3:latest'
#     ),
#     # Custom container alternative:
#     # serving_container_image_uri='asia-south1-docker.pkg.dev/project/repo/inference:v3',
#     # serving_container_predict_route='/predict',
#     # serving_container_health_route='/health',
#     labels={'team': 'delivery-ml', 'version': 'v3'},
# )

# ── Custom prediction server: predictor.py ───────────────────────────
PREDICTOR_SCRIPT = """
# predictor.py — used with custom container deployment
from google.cloud.aiplatform.utils import prediction_utils
import pickle, json, numpy as np, os

class FreshMartPredictor:
    def __init__(self):
        self.model = None
        self.feature_cols = None

    def load(self, artifacts_uri: str):
        '''Load model from GCS artifact URI.'''
        local_path = prediction_utils.download_model_artifacts(artifacts_uri)
        with open(f'{local_path}/model.pkl', 'rb') as f:
            artifact = pickle.load(f)
        self.model        = artifact['model']
        self.feature_cols = artifact['feature_cols']
        print(f'Model loaded: {len(self.feature_cols)} features')

    def predict(self, instances: list) -> list:
        '''instances: list of dicts matching feature_cols.'''
        X = np.array([
            [row.get(c, 0.0) for c in self.feature_cols]
            for row in instances
        ])
        preds = self.model.predict(X)
        return [{'predicted_delivery_time_min': round(float(p), 1)}
                for p in preds]
"""

# ── Create Endpoint ───────────────────────────────────────────────────
# endpoint = aiplatform.Endpoint.create(
#     display_name='freshmart-delivery-endpoint',
#     labels={'team': 'delivery-ml'},
# )
print("Endpoint created: freshmart-delivery-endpoint")

# ── Deploy model to endpoint ──────────────────────────────────────────
# endpoint.deploy(
#     model=model,
#     deployed_model_display_name='freshmart-delivery-v3',
#     machine_type='n1-standard-2',        # 2 vCPU, 7.5 GB RAM
#     min_replica_count=2,
#     max_replica_count=10,                # autoscale to 10 replicas at peak
#     traffic_split={'0': 100},            # 100% to this deployment
#     sync=True,
# )

# ── Online prediction ──────────────────────────────────────────────────
def predict_delivery_time(endpoint_name: str, instance: dict) -> dict:
    endpoint = aiplatform.Endpoint(endpoint_name=endpoint_name)
    response = endpoint.predict(instances=[instance])
    return response.predictions[0]

sample = {
    'distance_km':    3.5,
    'is_peak_hour':   1.0,
    'order_value':    450.0,
    'restaurant_avg': 33.2,
    'driver_avg':     29.8,
}
print(f"Sample prediction request: {sample}")
# result = predict_delivery_time('freshmart-delivery-endpoint', sample)
# print(f"Prediction: {result}")

# ── Traffic splitting — canary deployment ─────────────────────────────
print("""
Canary deployment — 10% traffic to new model:

  # Deploy new model version alongside existing
  endpoint.deploy(
      model=new_model,
      deployed_model_display_name='freshmart-delivery-v4',
      machine_type='n1-standard-2',
      min_replica_count=1,
      max_replica_count=5,
      traffic_split={
          'existing_deployed_model_id': 90,   # 90% to v3
          '0': 10,                             # 10% to v4 (new deployment)
      },
  )

  # Full promotion after validation
  endpoint.update(
      traffic_split={'new_deployed_model_id': 100}
  )

  # Rollback — shift all traffic back to v3
  endpoint.update(
      traffic_split={'existing_deployed_model_id': 100}
  )
""")

# ── AutoML Tabular — the simplest Vertex AI path ──────────────────────
print("AutoML Tabular (fastest path to a strong baseline):")
print("""
  dataset = aiplatform.TabularDataset.create(
      display_name='freshmart-delivery-data',
      bq_source='bq://project.freshmart.training_data',
  )

  job = aiplatform.AutoMLTabularTrainingJob(
      display_name='freshmart-automl-delivery',
      optimization_prediction_type='regression',
      optimization_objective='minimize-rmse',
      column_specs={
          'distance_km':    'numeric',
          'is_peak_hour':   'categorical',
          'order_value':    'numeric',
          'restaurant_avg': 'numeric',
          'driver_avg':     'numeric',
          'actual_time':    'numeric',       # target column
      },
  )

  model = job.run(
      dataset=dataset,
      target_column='actual_time',
      training_fraction_split=0.8,
      validation_fraction_split=0.1,
      test_fraction_split=0.1,
      budget_milli_node_hours=1000,   # 1 node-hour budget ≈ US$3
      model_display_name='freshmart-automl-delivery-model',
  )
  # AutoML tries Neural Architecture Search + feature preprocessing automatically
  # Returns the best model ready for deployment
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common Vertex AI mistake — explained and fixed</h2>

        <ErrorBlock
          error="google.api_core.exceptions.PermissionDenied: 403 Permission denied on resource project"
          cause="The service account used by Vertex AI does not have the required IAM roles. Vertex AI uses the Compute Engine default service account or a custom service account — this account needs Vertex AI User (roles/aiplatform.user), Storage Object Admin on your GCS bucket, and BigQuery Data Viewer if reading from BigQuery. The error message often says only 'Permission denied' without specifying which permission is missing."
          fix="Grant the required roles to your service account: gcloud projects add-iam-policy-binding PROJECT --member='serviceAccount:SA_EMAIL' --role='roles/aiplatform.user'. For GCS: gsutil iam ch serviceAccount:SA_EMAIL:objectAdmin gs://your-bucket. Check the exact missing permission in Cloud Logging: search for protoPayload.status.code=7 (PERMISSION_DENIED) filtered to your project. Enable the Vertex AI API first if you have not: gcloud services enable aiplatform.googleapis.com."
        />

        <ErrorBlock
          error="KFP component fails — RuntimeError: component execution failed, check logs for details"
          cause="An unhandled Python exception occurred inside a KFP component. The SDK error message is generic — the actual traceback is in Cloud Logging. Common causes: a package listed in packages_to_install was not found on PyPI, a BigQuery table does not exist or the service account cannot access it, the Output artifact path is not writable (the component did not create the parent directory), or the component tries to import a local module that is not in the base image."
          fix="Check Cloud Logging immediately: gcloud logging read 'resource.type=ml_pipeline' --project=PROJECT --limit=50. Filter by your pipeline job name. The Python traceback is always there. For missing packages: pin exact versions in packages_to_install and test the import locally first. For artifact paths: always call os.makedirs(artifact.path, exist_ok=True) before writing to artifact.path. For local imports: use a container component instead of a lightweight component — package your code as a Docker image."
        />

        <ErrorBlock
          error="Vertex AI Endpoint prediction returns 400 Bad Request — instances format wrong"
          cause="The request body format does not match what the serving container expects. Vertex AI expects {'instances': [...]} for standard sklearn/XGBoost containers. The instances array must contain either dicts (for named features) or arrays (for numeric features in column order). Sending a flat dict without the 'instances' wrapper, or sending a nested structure the container was not trained to parse, causes 400 errors."
          fix="Always wrap your payload: {'instances': [{'feature1': val1, 'feature2': val2}]}. For sklearn pre-built containers: instances must be a list of lists (not dicts) matching the column order the model was trained on. Test with a curl command first: curl -X POST -H 'Authorization: Bearer $(gcloud auth print-access-token)' -H 'Content-Type: application/json' --data '{&quot;instances&quot;: [[3.5, 1, 450, 33.2, 29.8]]}' ENDPOINT_URL. Check the container documentation for the exact expected format."
        />

        <ErrorBlock
          error="Pipeline component is slow — n1-standard-2 takes 45 minutes for a processing step that takes 2 minutes locally"
          cause="The component's machine_type is too small, or — more commonly — the component is downloading large packages every run because packages_to_install installs them at execution time, not at image build time. A lightweight component that installs pandas, scikit-learn, and google-cloud-bigquery takes 3-5 minutes just for package installation before the actual code runs. On a slow network in asia-south1, this can be 10+ minutes."
          fix="Pre-bake all packages into a custom Docker image and use a container component instead of a lightweight component with packages_to_install. Build your image once: FROM python:3.11-slim; RUN pip install pandas scikit-learn google-cloud-bigquery. Push to Artifact Registry. Use base_image='asia-south1-docker.pkg.dev/project/repo/ml-base:latest' in @component. This eliminates package installation time — the component starts running in seconds instead of minutes."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          All three cloud ML platforms are covered. Next: MLOps on cloud —
          CI/CD for ML across all three platforms.
        </h2>

        <p style={S.p}>
          You have now covered Azure ML, SageMaker, and Vertex AI — the three
          platforms that run production ML at Indian enterprises and startups.
          Module 79 ties them together: MLOps on Cloud — how to build CI/CD
          pipelines for ML that work regardless of which cloud you are on.
          GitHub Actions triggering retraining, model quality gates in CI,
          automated deployment to staging and production, and the patterns
          that make the entire ML lifecycle repeatable from a single git push.
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
              Next — Module 79 · Cloud ML Platforms
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              MLOps on Cloud — CI/CD for ML
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              GitHub Actions triggering retraining, model quality gates in CI,
              automated deployment to staging and production across all three clouds.
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
          'Vertex AI is built on the same GCP infrastructure that runs Google Search and Gmail. Its differentiators over Azure ML and SageMaker: native BigQuery integration (query training data directly without copying to object storage), the most production-ready managed Feature Store, and first-class TPU access. Used at Ola, Juspay, ShareChat, and analytics-heavy Indian companies.',
          'Every Vertex AI resource follows the naming pattern projects/{project}/locations/{region}/{resourceType}/{id}. All four supporting services work together: Cloud Storage for data and artifacts, IAM service accounts for permissions, Artifact Registry for Docker images, Cloud Logging for all job logs. When a job fails, check Cloud Logging first — the Python traceback is always there.',
          'Vertex AI Pipelines uses KFP v2 components and pipelines. Lightweight @component decorators are convenient for simple steps but install packages at runtime — slow for large dependency sets. Container components (custom Docker images) are faster and should be used for any step that runs more than once. Pre-built Google components from google_cloud_pipeline_components handle AutoML, BigQuery export, and model upload.',
          'Vertex AI Feature Store is the most complete managed feature store across all three clouds. BigQuery is the offline store (petabyte scale, point-in-time correct serving). Bigtable or Vertex-managed online store serves features at <1ms latency. batch_serve_to_bq() generates training datasets with point-in-time correct features. materialize() syncs offline to online on a schedule.',
          "Online Endpoints support traffic splitting natively via the traffic_split parameter in deploy(). Canary: {'old_id': 90, '0': 10}. Full promotion: {'new_id': 100}. AutoML Tabular creates a dataset from BigQuery, runs Neural Architecture Search automatically, and returns a deployable model — the fastest path to a strong baseline with a budget_milli_node_hours cost cap.",
          'Three common Vertex AI failures: PermissionDenied (grant roles/aiplatform.user + Storage Object Admin + BigQuery Data Viewer to the service account), KFP component failure (check Cloud Logging for the Python traceback — generic SDK error messages hide the real cause), slow components (pre-bake dependencies into a Docker image instead of using packages_to_install — eliminates 3-10 minute package install time per component run).',
        ]}
      />
    </LearnLayout>
  )
}