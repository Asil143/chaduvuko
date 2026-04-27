import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Azure ML — Studio, Pipelines and AutoML — Chaduvuko',
  description:
    'Azure Machine Learning Studio, compute clusters, AML Pipelines, AutoML, model registry, and online endpoints. Production ML on Azure from scratch.',
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

function ConceptBox({ title, children, color = '#0078d4' }: {
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

export default function AzureMLPage() {
  return (
    <LearnLayout
      title="Azure ML — Studio, Pipelines and AutoML"
      description="Azure Machine Learning Studio, compute clusters, AML Pipelines, AutoML, model registry, and online endpoints. Production ML on Azure from scratch."
      section="Cloud ML Platforms"
      readTime="50–55 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="cloud-ml" topic="azure-ml" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — what Azure ML actually is</span>
        <h2 style={S.h2}>
          Everything from Modules 69–74 — pipelines, experiment tracking,
          model registry, deployment, monitoring — exists as a managed service
          on Azure. Azure ML is the platform so you do not have to build
          and maintain that infrastructure yourself.
        </h2>

        <p style={S.p}>
          The MLOps section built every component from scratch: Prefect for
          pipelines, MLflow for experiment tracking, FastAPI + Docker + Kubernetes
          for deployment, Evidently for monitoring, DVC for data versioning.
          Azure Machine Learning bundles equivalent versions of all of these
          into a single managed service. You still write the same Python training
          scripts — the platform handles compute provisioning, job scheduling,
          artifact storage, endpoint scaling, and monitoring dashboards.
        </p>

        <p style={S.p}>
          Azure ML is the dominant cloud ML platform in Indian enterprise.
          HDFC Bank, ICICI, Deloitte, KPMG, Accenture, and most large Indian
          corporates run on Azure. If you join an enterprise ML team at an
          Indian bank, insurance company, or IT services firm, you will
          almost certainly work with Azure ML. The skills map directly:
          the concepts are identical to what you have built, the platform
          just manages the infrastructure for you.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Building ML infrastructure from scratch (Modules 69–74) is like
            building your own kitchen from raw materials — you understand every
            component deeply but it takes months before you can cook.
            Azure ML is a fully fitted commercial kitchen — the stove, fridge,
            dishwasher, ventilation, and fire suppression are already installed,
            maintained, and regulated. You bring your recipes (training scripts)
            and ingredients (data). The platform handles everything else.
            Both approaches produce food. The commercial kitchen lets you
            focus on cooking rather than plumbing.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#0078d4' }}>
            The key insight: knowing how to build the infrastructure from scratch
            (MLflow, Kubernetes, DVC) makes you a dramatically better Azure ML user.
            You understand what the managed service is doing under the hood —
            where it will fail, what its limitations are, and how to debug it
            when the UI gives you an unhelpful error message.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          Install: <span style={S.code as React.CSSProperties}>pip install azure-ai-ml azure-identity</span>.
          Free tier: Azure gives 1 year free with US$200 credit — enough to run
          all examples in this module. Create a workspace at
          ml.azure.com. All code uses the Azure ML Python SDK v2
          (the current version — SDK v1 is deprecated).
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — CORE CONCEPTS ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The building blocks</span>
        <h2 style={S.h2}>Workspace, compute, datastores, environments — the four resources every AML project needs</h2>

        <VisualBox label="Azure ML resource hierarchy — what you create and what they do">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                resource: 'Workspace',
                azure: 'Microsoft.MachineLearningServices/workspaces',
                color: '#0078d4',
                what: 'The top-level container for everything. One workspace per team or project.',
                contains: 'Experiments, models, datasets, endpoints, compute clusters',
                cost: 'Free — pay only for child resources (compute, storage)',
              },
              {
                resource: 'Compute Cluster',
                azure: 'AmlCompute',
                color: '#1D9E75',
                what: 'Auto-scaling VM pool for training. Scales to 0 when idle — no cost when not running jobs.',
                contains: 'cpu-cluster (Standard_DS3_v2 × 0-4), gpu-cluster (Standard_NC6s_v3 × 0-2)',
                cost: 'Pay per VM-hour. Standard_DS3_v2 ≈ ₹8/hr. Standard_NC6s_v3 (GPU) ≈ ₹250/hr',
              },
              {
                resource: 'Datastore',
                azure: 'Azure Blob Storage / ADLS Gen2',
                color: '#7b61ff',
                what: 'Connection to Azure storage. AML registers a datastore pointing to your storage account.',
                contains: 'Linked to Azure Blob containers or ADLS Gen2 filesystems',
                cost: 'Storage cost only — ₹1.5/GB/month for Blob LRS',
              },
              {
                resource: 'Environment',
                azure: 'Docker image + conda spec',
                color: '#D85A30',
                what: 'Python environment definition used by training and inference jobs. Versioned and cached.',
                contains: 'Base Docker image + pip/conda dependencies + custom packages',
                cost: 'First build: ~10 min. Cached: instant reuse on same compute.',
              },
              {
                resource: 'Model Registry',
                azure: 'MLflow-compatible model store',
                color: '#BA7517',
                what: 'Versioned model storage with lineage. Every registered model links to the run that created it.',
                contains: 'model.pkl + metadata + metrics + tags. Same concept as MLflow Registry (Module 70).',
                cost: 'Storage cost of model artifacts only',
              },
            ].map((item) => (
              <div key={item.resource} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 7, padding: '10px 12px',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: item.color }}>{item.resource}</span>
                  <span style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)', background: `${item.color}15`, padding: '2px 7px', borderRadius: 3 }}>
                    {item.azure}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, fontSize: 11 }}>
                  <span style={{ color: 'var(--muted)' }}>{item.what}</span>
                  <span style={{ color: 'var(--muted)' }}>{item.contains}</span>
                  <span style={{ color: item.color, fontStyle: 'italic' }}>{item.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`# pip install azure-ai-ml azure-identity

from azure.ai.ml import MLClient
from azure.ai.ml.entities import (
    AmlCompute, Environment, Data,
    ManagedOnlineEndpoint, ManagedOnlineDeployment,
)
from azure.identity import DefaultAzureCredential
from azure.ai.ml.constants import AssetTypes
import os

# ── Authenticate and connect to workspace ─────────────────────────────
# DefaultAzureCredential tries: env vars → managed identity → Azure CLI
credential = DefaultAzureCredential()

ml_client = MLClient(
    credential=credential,
    subscription_id=os.environ.get('AZURE_SUBSCRIPTION_ID', 'your-sub-id'),
    resource_group_name='rg-ml-india',
    workspace_name='ws-freshmart-ml',
)
print(f"Connected to workspace: {ml_client.workspace_name}")

# ── Create compute cluster (scales to 0 when idle) ────────────────────
cpu_cluster = AmlCompute(
    name='cpu-cluster',
    type='amlcompute',
    size='Standard_DS3_v2',   # 4 vCPU, 14 GB RAM
    min_instances=0,           # scale to 0 — zero cost when idle
    max_instances=4,           # max 4 nodes
    idle_time_before_scale_down=120,   # scale down after 2 min idle
    tier='Dedicated',          # or 'LowPriority' (cheaper, can be preempted)
)

# ml_client.compute.begin_create_or_update(cpu_cluster).result()
print(f"Compute cluster: {cpu_cluster.name}  "
      f"({cpu_cluster.size}, 0-{cpu_cluster.max_instances} nodes)")

# ── Create or get GPU cluster for deep learning ───────────────────────
gpu_cluster = AmlCompute(
    name='gpu-cluster',
    size='Standard_NC6s_v3',   # 6 vCPU, 112 GB RAM, 1× V100 GPU
    min_instances=0,
    max_instances=2,
    tier='LowPriority',        # 60-80% cheaper — good for training, not serving
)
print(f"GPU cluster: {gpu_cluster.name}  ({gpu_cluster.size})")

# ── Register a training environment ───────────────────────────────────
training_env = Environment(
    name='freshmart-training-env',
    description='FreshCart ML training environment',
    conda_file={
        'name': 'freshmart-ml',
        'channels': ['defaults', 'conda-forge'],
        'dependencies': [
            'python=3.11',
            'pip',
            {'pip': [
                'azure-ai-ml==1.13.0',
                'scikit-learn==1.4.1',
                'lightgbm==4.3.0',
                'pandas==2.2.1',
                'numpy==1.26.4',
                'mlflow==2.12.0',
            ]},
        ],
    },
    image='mcr.microsoft.com/azureml/openmpi4.1.0-ubuntu20.04:latest',
)
# ml_client.environments.create_or_update(training_env)
print(f"Environment: {training_env.name}")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — SUBMITTING TRAINING JOBS ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Running training on cloud compute</span>
        <h2 style={S.h2}>Command jobs — submit your training script to AML compute with one function call</h2>

        <p style={S.p}>
          A command job is the simplest unit of work in Azure ML.
          You specify: a Python script to run, the compute cluster to run it on,
          the environment to use, and any arguments. Azure ML provisions a VM,
          installs the environment, runs your script, captures all logs and
          metrics, and scales the VM back down. Your training script is
          unchanged — you just wrap it in a job definition.
        </p>

        <CodeBlock code={`# ── Training script: train.py (unchanged from local) ─────────────────
# This script runs identically locally or on AML compute

TRAIN_SCRIPT = """
# train.py
import argparse
import pandas as pd
import numpy as np
import mlflow
import mlflow.sklearn
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from pathlib import Path
import pickle, json

# AML passes arguments via argparse
parser = argparse.ArgumentParser()
parser.add_argument('--data_path',     type=str, required=True)
parser.add_argument('--n_estimators',  type=int, default=200)
parser.add_argument('--max_depth',     type=int, default=4)
parser.add_argument('--learning_rate', type=float, default=0.05)
parser.add_argument('--output_dir',    type=str, default='./outputs')
args = parser.parse_args()

# MLflow auto-logging — AML captures all mlflow calls automatically
mlflow.autolog()

with mlflow.start_run():
    # Load data (AML mounts the datastore path at args.data_path)
    df = pd.read_parquet(f'{args.data_path}/train.parquet')
    feat_cols = [c for c in df.columns if c != 'actual_time']

    X = df[feat_cols]
    y = df['actual_time']

    # Log params (picked up by AML experiment tracking)
    mlflow.log_params({
        'n_estimators': args.n_estimators,
        'max_depth':    args.max_depth,
        'learning_rate': args.learning_rate,
    })

    # Train
    model = GradientBoostingRegressor(
        n_estimators=args.n_estimators,
        max_depth=args.max_depth,
        learning_rate=args.learning_rate,
        random_state=42,
    )
    model.fit(X, y)

    mae = mean_absolute_error(y, model.predict(X))
    r2  = r2_score(y, model.predict(X))

    # Log metrics — visible in AML Studio
    mlflow.log_metric('train_mae', mae)
    mlflow.log_metric('train_r2',  r2)

    # Save model to outputs/ — AML auto-uploads this directory
    Path(args.output_dir).mkdir(exist_ok=True)
    mlflow.sklearn.log_model(model, 'model')
    with open(f'{args.output_dir}/model.pkl', 'wb') as f:
        pickle.dump({'model': model, 'feature_cols': feat_cols}, f)

    print(f"Training complete: MAE={mae:.4f}  R2={r2:.4f}")
"""

# ── Submit as an AML Command Job ──────────────────────────────────────
from azure.ai.ml import command, Input
from azure.ai.ml.constants import AssetTypes

job = command(
    name='freshmart-delivery-training',
    display_name='FreshCart Delivery Time Model — v1',
    description='Train GradientBoosting model on FreshCart delivery data',

    # The training script
    code='./src',          # directory containing train.py
    command=(
        'python train.py '
        '--data_path ${'$'}{{inputs.training_data}} '
        '--n_estimators ${'$'}{{inputs.n_estimators}} '
        '--max_depth ${'$'}{{inputs.max_depth}} '
        '--learning_rate ${'$'}{{inputs.learning_rate}}'
    ),

    # Inputs — can be datastore paths or literal values
    inputs={
        'training_data': Input(
            type=AssetTypes.URI_FOLDER,
            path='azureml://datastores/workspaceblobstore/paths/freshmart/processed/',
        ),
        'n_estimators':  Input(type='integer', default=200),
        'max_depth':     Input(type='integer', default=4),
        'learning_rate': Input(type='number',  default=0.05),
    },

    # Infrastructure
    environment='freshmart-training-env:1',
    compute='cpu-cluster',
    experiment_name='freshmart-delivery-time',

    # Tags for filtering in Studio
    tags={'team': 'delivery-ml', 'model': 'gradient-boosting'},
)

# submitted_job = ml_client.jobs.create_or_update(job)
# print(f"Job submitted: {submitted_job.name}")
# print(f"Studio URL:    {submitted_job.studio_url}")

# ── Monitor job status ────────────────────────────────────────────────
print("Job submission workflow:")
print("""
  ml_client.jobs.create_or_update(job)
  → AML provisions VM node from cpu-cluster
  → Pulls 'freshmart-training-env:1' Docker image (cached after first run)
  → Mounts datastore path as read-only volume
  → Runs: python train.py --data_path /mnt/data --n_estimators 200 ...
  → Streams logs to AML Studio in real time
  → Uploads ./outputs/ to blob storage on completion
  → Scales compute node back to 0 after idle_time_before_scale_down

  Monitor via:
    ml_client.jobs.get(submitted_job.name)         # programmatic
    submitted_job.studio_url                        # open in browser
    az ml job show -n job_name -w ws_name          # Azure CLI
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — AML PIPELINES ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Multi-step workflows</span>
        <h2 style={S.h2}>AML Pipelines — chain prepare → featurise → train → evaluate as a reusable DAG</h2>

        <p style={S.p}>
          A command job runs one script. A pipeline chains multiple scripts
          together as a DAG — the output of one step becomes the input of the
          next. This is the AML equivalent of the Prefect flow you built in
          Module 69. AML Pipelines add managed data passing between steps,
          step-level caching (skip unchanged steps), and a visual DAG in Studio.
          Schedule it with a cron trigger and you have automated daily retraining.
        </p>

        <CodeBlock code={`from azure.ai.ml import command, Input, Output
from azure.ai.ml.constants import AssetTypes
from azure.ai.ml.dsl import pipeline

# ── Define each step as a component ────────────────────────────────────
# Components are reusable — define once, use across many pipelines

def make_prepare_component():
    return command(
        name='prepare-data',
        code='./src',
        command=(
            'python prepare.py '
            '--raw_path ${'$'}{{inputs.raw_data}} '
            '--output_path ${'$'}{{outputs.processed_data}} '
            '--cutoff_date ${'$'}{{inputs.cutoff_date}}'
        ),
        inputs={
            'raw_data':    Input(type=AssetTypes.URI_FOLDER),
            'cutoff_date': Input(type='string', default='2026-03-01'),
        },
        outputs={
            'processed_data': Output(type=AssetTypes.URI_FOLDER, mode='rw_mount'),
        },
        environment='freshmart-training-env:1',
        compute='cpu-cluster',
        display_name='Prepare Data',
    )

def make_train_component():
    return command(
        name='train-model',
        code='./src',
        command=(
            'python train.py '
            '--data_path ${'$'}{{inputs.processed_data}} '
            '--output_dir ${'$'}{{outputs.model_output}} '
            '--n_estimators ${'$'}{{inputs.n_estimators}}'
        ),
        inputs={
            'processed_data': Input(type=AssetTypes.URI_FOLDER),
            'n_estimators':   Input(type='integer', default=200),
        },
        outputs={
            'model_output': Output(type=AssetTypes.URI_FOLDER, mode='rw_mount'),
        },
        environment='freshmart-training-env:1',
        compute='cpu-cluster',
        display_name='Train Model',
    )

def make_evaluate_component():
    return command(
        name='evaluate-model',
        code='./src',
        command=(
            'python evaluate.py '
            '--model_path ${'$'}{{inputs.model_output}} '
            '--test_data ${'$'}{{inputs.processed_data}} '
            '--metrics_path ${'$'}{{outputs.metrics}}'
        ),
        inputs={
            'model_output':   Input(type=AssetTypes.URI_FOLDER),
            'processed_data': Input(type=AssetTypes.URI_FOLDER),
        },
        outputs={
            'metrics': Output(type=AssetTypes.URI_FILE, mode='rw_mount'),
        },
        environment='freshmart-training-env:1',
        compute='cpu-cluster',
        display_name='Evaluate Model',
    )

# ── Define the pipeline using @pipeline decorator ─────────────────────
@pipeline(
    name='freshmart-training-pipeline',
    description='Daily retraining pipeline for delivery time model',
    experiment_name='freshmart-delivery-time',
    tags={'pipeline': 'training', 'team': 'delivery-ml'},
)
def training_pipeline(raw_data_path: str, cutoff_date: str = '2026-03-01',
                       n_estimators: int = 200):
    # Step 1: prepare
    prepare_step = make_prepare_component()
    prepare_step.inputs.raw_data    = Input(type=AssetTypes.URI_FOLDER,
                                              path=raw_data_path)
    prepare_step.inputs.cutoff_date = cutoff_date

    # Step 2: train — receives output of prepare step
    train_step = make_train_component()
    train_step.inputs.processed_data = prepare_step.outputs.processed_data
    train_step.inputs.n_estimators   = n_estimators

    # Step 3: evaluate — receives outputs of both previous steps
    eval_step = make_evaluate_component()
    eval_step.inputs.model_output   = train_step.outputs.model_output
    eval_step.inputs.processed_data = prepare_step.outputs.processed_data

    return {
        'model_output': train_step.outputs.model_output,
        'metrics':      eval_step.outputs.metrics,
    }

# ── Instantiate and submit ─────────────────────────────────────────────
pipeline_job = training_pipeline(
    raw_data_path='azureml://datastores/workspaceblobstore/paths/freshmart/raw/',
    cutoff_date='2026-03-01',
    n_estimators=200,
)

# pipeline_job.settings.default_compute = 'cpu-cluster'
# submitted = ml_client.jobs.create_or_update(pipeline_job)
# print(f"Pipeline submitted: {submitted.studio_url}")

# ── Schedule for daily retraining ─────────────────────────────────────
from azure.ai.ml.entities import JobSchedule, RecurrenceTrigger, RecurrencePattern
from azure.ai.ml.constants import TimeZone

schedule = JobSchedule(
    name='daily-retraining-schedule',
    trigger=RecurrenceTrigger(
        frequency='day',
        interval=1,
        schedule=RecurrencePattern(hours=2, minutes=0),   # 2 AM daily
        time_zone=TimeZone.INDIA_STANDARD_TIME,
    ),
    create_job=pipeline_job,
)
# ml_client.schedules.begin_create_or_update(schedule).result()
print("Pipeline schedule: daily at 2:00 AM IST")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — AUTOML ═══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Automated model selection</span>
        <h2 style={S.h2}>AutoML — try 50 model and feature combinations automatically, pick the best</h2>

        <p style={S.p}>
          Azure AutoML runs a hyperparameter and model sweep automatically.
          You provide labelled training data and specify the task type.
          AutoML tries LightGBM, XGBoost, Random Forest, Ridge, and others
          with different preprocessing and hyperparameter combinations.
          It logs every trial to AML experiments and returns the best model.
          For standard regression and classification tasks, AutoML often
          produces a strong baseline faster than manual tuning.
          It is not a replacement for understanding your data — but it is
          a fast way to establish what "good" looks like.
        </p>

        <CodeBlock code={`from azure.ai.ml import automl, Input
from azure.ai.ml.constants import AssetTypes
from azure.ai.ml.automl import (
    regression, RegressionPrimaryMetrics,
    classification, ClassificationPrimaryMetrics,
)

# ── AutoML regression — delivery time prediction ──────────────────────
regression_job = automl.regression(
    compute='cpu-cluster',
    experiment_name='freshmart-automl-delivery',
    training_data=Input(
        type=AssetTypes.MLTABLE,
        path='azureml://datastores/workspaceblobstore/paths/freshmart/automl_data/',
    ),
    target_column_name='actual_time',

    # What to optimise
    primary_metric=RegressionPrimaryMetrics.NORMALIZED_MEAN_ABSOLUTE_ERROR,

    # Time and trial budget
    timeout_minutes=60,            # stop after 1 hour regardless
    trial_timeout_minutes=10,      # each trial: max 10 minutes
    max_trials=30,                 # try up to 30 combinations
    max_concurrent_trials=4,       # run 4 in parallel on the cluster

    # Validation strategy
    n_cross_validations=5,         # 5-fold CV for each trial
    enable_early_termination=True, # stop unpromising trials early

    # Models to try (omit to try all)
    allowed_training_algorithms=[
        'LightGBM', 'XGBoostRegressor', 'RandomForest',
        'GradientBoosting', 'ElasticNet', 'Ridge',
    ],

    # Feature engineering
    featurization='auto',          # AML handles imputation, encoding, scaling
)

# automl_job = ml_client.jobs.create_or_update(regression_job)
# print(f"AutoML job: {automl_job.studio_url}")

# ── Get the best model from AutoML ────────────────────────────────────
print("""
After AutoML completes:

  # Get best child run
  best_child = ml_client.jobs.get(f'{automl_job.name}_best_child_run')

  # Register the best model
  from azure.ai.ml.entities import Model
  best_model = ml_client.models.create_or_update(
      Model(
          name='freshmart-delivery-time',
          path=f'azureml://jobs/{best_child.name}/outputs/mlflow-model/',
          type=AssetTypes.MLFLOW_MODEL,
      )
  )
  print(f'Best model registered: {best_model.name}:{best_model.version}')
""")

# ── AutoML for classification — fraud detection ───────────────────────
classification_job = automl.classification(
    compute='cpu-cluster',
    experiment_name='freshmart-automl-fraud',
    training_data=Input(type=AssetTypes.MLTABLE, path='...'),
    target_column_name='is_fraud',
    primary_metric=ClassificationPrimaryMetrics.AUC_WEIGHTED,

    # Handle class imbalance (0.1% fraud)
    # AML AutoML handles SMOTE and class weighting automatically

    timeout_minutes=120,
    max_trials=50,
    max_concurrent_trials=4,
    positive_label='1',
)

# ── AutoML trial results summary ──────────────────────────────────────
import numpy as np

print("Typical AutoML trial results (regression, delivery time):")
print(f"  {'Algorithm':<25} {'NMAE':>8} {'MAE (min)':>10} {'Time':>8}")
print("  " + "─" * 55)
trials = [
    ('LightGBM',              0.062, 5.21, '8m 12s'),
    ('XGBoostRegressor',      0.068, 5.71, '9m 45s'),
    ('GradientBoosting',      0.071, 5.98, '12m 30s'),
    ('RandomForest',          0.079, 6.64, '6m 55s'),
    ('LightGBM (tuned)',      0.058, 4.87, '9m 02s'),   # ← AutoML best
    ('ElasticNet',            0.112, 9.41, '1m 30s'),
    ('Ridge',                 0.118, 9.92, '0m 45s'),
]
for name, nmae, mae, t in sorted(trials, key=lambda x: x[1]):
    best = ' ← best' if nmae == 0.058 else ''
    print(f"  {name:<25} {nmae:>8.3f} {mae:>10.2f} {t:>8}{best}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — MODEL REGISTRY AND ONLINE ENDPOINTS ══════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>From model to live API</span>
        <h2 style={S.h2}>Register, deploy, and call a managed online endpoint — three steps</h2>

        <p style={S.p}>
          AML Managed Online Endpoints are the equivalent of the FastAPI +
          Docker + Kubernetes deployment you built in Module 71 —
          except Azure manages the Kubernetes cluster, load balancer,
          autoscaling, TLS, and health checks for you. You provide the model
          and a scoring script. Azure handles everything else.
          Blue-green deployments and traffic splitting are built in.
        </p>

        <CodeBlock code={`from azure.ai.ml.entities import (
    ManagedOnlineEndpoint,
    ManagedOnlineDeployment,
    Model, Environment, CodeConfiguration,
)
from azure.ai.ml.constants import AssetTypes
import json

# ── Step 1: Register the trained model ────────────────────────────────
model = Model(
    name='freshmart-delivery-time',
    version='3',
    path='azureml://jobs/job_abc123/outputs/model/',
    type=AssetTypes.MLFLOW_MODEL,
    description='GradientBoosting delivery time model v3 — val_mae=5.21',
    tags={
        'val_mae':          '5.21',
        'training_cutoff':  '2026-03-01',
        'feature_set':      'v4',
    },
)
# registered_model = ml_client.models.create_or_update(model)

# ── Step 2: Create an endpoint (the stable URL) ────────────────────────
endpoint = ManagedOnlineEndpoint(
    name='freshmart-delivery-endpoint',
    description='Delivery time prediction API',
    auth_mode='key',   # or 'aml_token' for Azure AD authentication
    tags={'team': 'delivery-ml', 'env': 'production'},
)
# ml_client.online_endpoints.begin_create_or_update(endpoint).result()

# ── Scoring script: score.py ───────────────────────────────────────────
SCORE_SCRIPT = """
# score.py — runs inside the endpoint container
import json, pickle, numpy as np
import mlflow.sklearn

model = None  # loaded once at init

def init():
    global model
    import os
    model_dir = os.environ.get('AZUREML_MODEL_DIR', './model')
    model     = mlflow.sklearn.load_model(model_dir)
    print("Model loaded successfully")

def run(raw_data: str) -> str:
    try:
        data = json.loads(raw_data)
        # Accept either single dict or list of dicts
        if isinstance(data, dict):
            data = [data]

        feature_cols = [
            'distance_km', 'is_peak_hour', 'order_value',
            'restaurant_avg_delivery_time', 'driver_avg_delivery_time',
        ]
        X = np.array([
            [row.get(c, 0.0) for c in feature_cols]
            for row in data
        ])

        preds = model.predict(X).tolist()
        return json.dumps({'predictions': preds, 'model_version': '3'})

    except Exception as e:
        return json.dumps({'error': str(e)})
"""

# ── Step 3: Create a deployment on the endpoint ────────────────────────
blue_deployment = ManagedOnlineDeployment(
    name='blue',
    endpoint_name='freshmart-delivery-endpoint',

    # Model and code
    model='freshmart-delivery-time:3',
    code_configuration=CodeConfiguration(
        code='./src',
        scoring_script='score.py',
    ),

    # Environment
    environment=Environment(
        conda_file={'dependencies': ['python=3.11', {'pip': ['mlflow', 'scikit-learn', 'numpy']}]},
        image='mcr.microsoft.com/azureml/openmpi4.1.0-ubuntu20.04:latest',
    ),

    # Instance type and count
    instance_type='Standard_DS2_v2',   # 2 vCPU, 7 GB RAM
    instance_count=3,                   # 3 replicas behind the load balancer

    # Autoscale
    scale_settings={
        'scale_type': 'Auto',
        'min_instances': 2,
        'max_instances': 10,
        'polling_interval': 5,
        'target_utilization_percentage': 70,
    },
)
# ml_client.online_deployments.begin_create_or_update(blue_deployment).result()

# Direct 100% of traffic to blue deployment
# ml_client.online_endpoints.begin_update(
#     ManagedOnlineEndpoint(name='freshmart-delivery-endpoint',
#                            traffic={'blue': 100})
# ).result()

# ── Step 4: Call the endpoint ──────────────────────────────────────────
print("Calling online endpoint:")
print("""
  import urllib.request, json

  # Get endpoint key from AML
  keys = ml_client.online_endpoints.get_keys('freshmart-delivery-endpoint')
  api_key = keys.primary_key

  data = json.dumps({'instances': [{
      'distance_km':                    3.5,
      'is_peak_hour':                   1,
      'order_value':                    450.0,
      'restaurant_avg_delivery_time':   33.2,
      'driver_avg_delivery_time':       29.8,
  }]}).encode('utf-8')

  endpoint_url = ml_client.online_endpoints.get(
      'freshmart-delivery-endpoint'
  ).scoring_uri

  req = urllib.request.Request(endpoint_url, data=data,
      headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {api_key}'})
  response = urllib.request.urlopen(req).read()
  print(json.loads(response))
  # {'predictions': [38.4], 'model_version': '3'}
""")

# ── Blue-green deployment (zero-downtime model update) ────────────────
print("Blue-green traffic split:")
print("""
  # Deploy new model version as 'green' (no traffic yet)
  green_deployment = ManagedOnlineDeployment(name='green', ...)
  ml_client.online_deployments.begin_create_or_update(green_deployment).result()

  # Canary: 10% to green, 90% to blue
  ml_client.online_endpoints.begin_update(
      ManagedOnlineEndpoint(
          name='freshmart-delivery-endpoint',
          traffic={'blue': 90, 'green': 10},
      )
  ).result()

  # Full cutover after validation
  ml_client.online_endpoints.begin_update(
      ManagedOnlineEndpoint(
          name='freshmart-delivery-endpoint',
          traffic={'blue': 0, 'green': 100},
      )
  ).result()

  # Delete old deployment
  ml_client.online_deployments.begin_delete('blue', 'freshmart-delivery-endpoint')
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common Azure ML mistake — explained and fixed</h2>

        <ErrorBlock
          error="UserError: The compute target 'cpu-cluster' does not exist"
          cause="The compute cluster has not been created yet, or it was created in a different workspace. AML compute clusters are workspace-scoped — a cluster created in workspace A does not exist in workspace B. Also caused by a typo in the cluster name passed to the job definition — the name is case-sensitive."
          fix="Create the cluster first: ml_client.compute.begin_create_or_update(cpu_cluster).result(). Then verify it exists: ml_client.compute.get('cpu-cluster'). Check that the MLClient is connected to the correct workspace: ml_client.workspace_name. If the workspace name is wrong, all resource lookups will fail with confusing errors. Use ml_client.workspaces.get(ml_client.workspace_name) to confirm you are connected to the right workspace."
        />

        <ErrorBlock
          error="Environment build fails — UserError: Failed to build environment image"
          cause="The conda spec or pip requirements contain a package version conflict or a package that does not exist on the specified channel. Common causes: requesting a package version that is incompatible with Python 3.11, specifying a private package that is not accessible from the AML compute network, or using a base image that does not support the requested conda channels. The full build log is in the AML Studio environment details page."
          fix="View the full build log in AML Studio: Environments → select your environment → Build log. The error is always in the last 30 lines of the build log. For version conflicts: pin exact versions that are known to work together (use pip freeze from a working local environment). For private packages: add the package server URL to the conda spec's channels or install via pip with the full URL. Start with the official AML curated environments (azureml:AzureML-sklearn-1.3-ubuntu20.04-py38-cpu:33) and add only what you need."
        />

        <ErrorBlock
          error="Online endpoint returns 502 Bad Gateway on first call after deployment"
          cause="The model is still loading when the first request arrives. AML marks a deployment as ready when the container passes the readiness probe — but the scoring script's init() function may not have finished loading the model. For large models (>500MB), init() can take 60-120 seconds. The first requests during this window fail with 502."
          fix="Increase the readiness probe delay in the deployment: set liveness_probe and readiness_probe with initialDelaySeconds matching the model load time. For large models: use model streaming — load the model header first, respond ready, then load the full weights lazily. Alternatively test with a warm-up request loop after deployment before routing production traffic. Check endpoint logs: ml_client.online_deployments.get_logs('blue', 'freshmart-delivery-endpoint', lines=50) for the actual init error."
        />

        <ErrorBlock
          error="Training job runs for 2 hours then fails — ResourceExhausted: out of memory"
          cause="The training data is larger than the VM's RAM. Standard_DS3_v2 has 14GB RAM — if your DataFrame is 20GB after feature engineering, the job OOMs partway through training. Also caused by GradientBoosting or XGBoost keeping multiple copies of the data in memory during training. The error appears in the job logs as a Python MemoryError or a kernel kill signal."
          fix="Upgrade the VM size: change size='Standard_DS3_v2' to size='Standard_DS5_v2' (56GB RAM) or size='Standard_E8s_v3' (64GB RAM). Check the actual data size before training: print(df.memory_usage(deep=True).sum() / 1e9, 'GB'). Use chunked data loading for datasets > 10GB: read_parquet with pyarrow and process in chunks. Use LightGBM instead of GradientBoosting for large datasets — LightGBM uses histogram-based training that is dramatically more memory-efficient."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can run production ML on Azure. Next: the same patterns
          on AWS SageMaker.
        </h2>

        <p style={S.p}>
          Azure ML, SageMaker, and Vertex AI all solve the same problem —
          managed ML infrastructure — with different APIs and slightly different
          primitives. Module 77 covers AWS SageMaker: training jobs, processing
          jobs, SageMaker Pipelines, the Model Registry, and SageMaker Endpoints.
          The concepts map 1-to-1 with what you just learned. The key differences
          are in IAM permissions, SDK patterns, and how data is referenced.
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
              textTransform: 'uppercase' as const, color: '#ff9900',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Module 77 · Cloud ML Platforms
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              AWS SageMaker — Training Jobs and Pipelines
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              SageMaker training jobs, processing jobs, Pipelines, Model Registry,
              and real-time endpoints. The AWS equivalent of everything in this module.
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
          'Azure ML is a managed platform that provides everything from Modules 69–74 as a service: compute cluster (auto-scales to 0), experiment tracking (MLflow-compatible), model registry, pipelines (DAG scheduler), and online endpoints (managed Kubernetes). Your training scripts are unchanged — the SDK wraps them in job definitions.',
          'Four core resources: Workspace (top-level container, free), Compute Cluster (AmlCompute, auto-scales to 0 when idle — zero cost between jobs), Environment (versioned Docker image + conda spec, cached after first build), Model Registry (versioned model artifacts with lineage to the training run that produced them).',
          'Command jobs submit a Python script to AML compute with one SDK call. Specify the script, compute, environment, and inputs/outputs. AML provisions the VM, installs the environment, runs the script, captures MLflow logs and metrics, uploads outputs/ to blob storage, and scales down. Your training script needs zero Azure-specific code — just standard argparse and mlflow.',
          'AML Pipelines chain multiple command jobs as a DAG using the @pipeline decorator. Output of one step becomes input of the next via AML-managed data passing. Steps with unchanged inputs are cached and skipped automatically. Schedule daily retraining with RecurrenceTrigger at 2 AM IST — the AML equivalent of the Airflow DAG from Module 69.',
          'AutoML tries 20-50 model and hyperparameter combinations automatically. Specify the task (regression/classification), data, target column, primary metric, and time budget. Returns the best model ready to register. Useful for establishing a strong baseline quickly — but understanding your data (Module 25-38) remains essential for interpreting results and knowing when AutoML is finding a spurious pattern.',
          'Managed Online Endpoints are the Module 71 FastAPI + Docker + Kubernetes stack as a managed service. Deploy with instance_type and instance_count. Built-in autoscaling, TLS, and health checks. Blue-green deployments use traffic splitting: deploy new version as green, shift 10% → 90% → 100% traffic, then delete blue. Zero-downtime updates in three SDK calls.',
        ]}
      />
    </LearnLayout>
  )
}
