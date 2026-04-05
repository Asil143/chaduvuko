import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'AWS SageMaker — Training Jobs and Pipelines — Chaduvuko',
  description:
    'SageMaker training jobs, SageMaker Pipelines, Feature Store, Clarify for bias detection, and JumpStart model hub. Production ML on AWS from scratch.',
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

function ConceptBox({ title, children, color = '#FF9900' }: {
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

export default function AWSSageMakerPage() {
  return (
    <LearnLayout
      title="AWS SageMaker — Training Jobs and Pipelines"
      description="SageMaker training jobs, SageMaker Pipelines, Feature Store, Clarify for bias detection, and JumpStart model hub. Production ML on AWS from scratch."
      section="Cloud ML Platforms"
      readTime="45–50 min"
      updatedAt="April 2026"
    >
      <MLPageHeader section="cloud-ml" topic="aws-sagemaker" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — what SageMaker actually is</span>
        <h2 style={S.h2}>
          Everything from Modules 69–74 — pipelines, experiment tracking,
          model registry, deployment, monitoring — exists as a managed service
          on AWS. SageMaker is the platform so you do not have to build
          and maintain that infrastructure yourself.
        </h2>

        <p style={S.p}>
          The MLOps section built every component from scratch: Prefect for
          pipelines, MLflow for experiment tracking, FastAPI + Docker + Kubernetes
          for deployment, Evidently for monitoring, DVC for data versioning.
          Amazon SageMaker bundles equivalent versions of all of these into a
          single managed service. You still write the same Python training
          scripts — the platform handles compute provisioning, job scheduling,
          artifact storage, endpoint scaling, and monitoring dashboards.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 0 }}>
            Think of SageMaker as a <strong>managed MLOps platform</strong> — it is
            like having AWS automatically run your MLflow tracking server, Kubernetes
            cluster, model registry, and feature store so you only pay for what you
            use and never manage the servers. Your training code stays the same;
            SageMaker is just the environment it runs in.
          </p>
        </AnalogyBox>

        <VisualBox label="SageMaker vs the MLOps stack you already know">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['Prefect / Airflow pipelines', 'SageMaker Pipelines'],
              ['MLflow Tracking Server', 'SageMaker Experiments'],
              ['MLflow Model Registry', 'SageMaker Model Registry'],
              ['FastAPI + Docker endpoint', 'SageMaker Real-Time Endpoint'],
              ['Kubernetes for batch', 'SageMaker Batch Transform'],
              ['Evidently drift monitoring', 'SageMaker Model Monitor'],
              ['DVC / custom feature logic', 'SageMaker Feature Store'],
              ['Manual bias analysis', 'SageMaker Clarify'],
            ].map(([ours, sm]) => (
              <div key={ours} style={{
                display: 'grid', gridTemplateColumns: '1fr auto 1fr',
                gap: 8, alignItems: 'center',
                background: 'var(--surface)', borderRadius: 6, padding: '8px 12px',
              }}>
                <span style={{ ...S.ps, marginBottom: 0, color: 'var(--muted)' }}>{ours}</span>
                <span style={{ color: '#FF9900', fontSize: 14 }}>→</span>
                <span style={{ ...S.ps, marginBottom: 0, color: '#FF9900', fontWeight: 600 }}>{sm}</span>
              </div>
            ))}
          </div>
        </VisualBox>

        <p style={S.p}>
          SageMaker&apos;s key advantage over running MLOps yourself is <strong>managed compute</strong>.
          You do not pre-provision servers. You request a training job and SageMaker
          spins up the exact instance type you need, runs your script, saves
          artifacts to S3, then shuts the instance down. You pay per second of
          compute used. At scale, this is dramatically cheaper than keeping
          Kubernetes nodes warm 24/7.
        </p>
      </div>

      <Div />

      {/* ══ SECTION 2 — SETUP ════════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Getting connected</span>
        <h2 style={S.h2}>SageMaker SDK — connect your local environment to AWS</h2>

        <p style={S.p}>
          The SageMaker Python SDK wraps the AWS APIs into high-level objects:
          <code style={S.code}>Session</code>, <code style={S.code}>Estimator</code>,
          <code style={S.code}>Pipeline</code>. You install it alongside boto3 (the
          low-level AWS SDK) and authenticate via an IAM role.
        </p>

        <CodeBlock code={`# Install
pip install sagemaker boto3

# ── Connect ──────────────────────────────────────────────────────────
import boto3
import sagemaker
from sagemaker import get_execution_role

# Works automatically inside SageMaker Studio or a SageMaker Notebook.
# Locally, set AWS_DEFAULT_REGION + credentials in ~/.aws/credentials
sess   = sagemaker.Session()
role   = get_execution_role()          # IAM role ARN
bucket = sess.default_bucket()         # auto-created S3 bucket
region = boto3.Session().region_name

print(f"Role:   {role}")
print(f"Bucket: {bucket}")
print(f"Region: {region}")`} />

        <ConceptBox title="IAM Role — the SageMaker identity">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            Every SageMaker job runs as an IAM role, not as your personal AWS user.
            The role needs <strong>AmazonSageMakerFullAccess</strong> plus S3 read/write
            on your training bucket. In production, create a least-privilege role that
            only grants access to the specific S3 paths and ECR repositories your
            jobs need.
          </p>
        </ConceptBox>

        <h3 style={S.h3}>Upload training data to S3</h3>
        <p style={S.p}>
          SageMaker training jobs read data from S3. The SDK provides a helper
          to upload a local directory and return the S3 URI.
        </p>

        <CodeBlock code={`import os
from sagemaker.s3 import S3Uploader

# Upload local data directory to S3
local_data = './data/processed/'
s3_data_uri = S3Uploader.upload(
    local_path=local_data,
    desired_s3_uri=f's3://{bucket}/freshmart/processed',
    sagemaker_session=sess,
)
print(f"Data uploaded to: {s3_data_uri}")
# → s3://sagemaker-us-east-1-123456789/freshmart/processed`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — TRAINING JOBS ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Core primitive</span>
        <h2 style={S.h2}>Training Jobs — run any script on managed compute</h2>

        <p style={S.p}>
          A SageMaker Training Job is the equivalent of an AML Command Job: you
          point to a script, specify an instance type, and SageMaker provisions
          the machine, runs the script, saves <code style={S.code}>/opt/ml/model/</code>
          to S3, then terminates the instance. Your training script is
          unchanged from local development.
        </p>

        <h3 style={S.h3}>The training script (unchanged from local)</h3>

        <CodeBlock code={`# train.py — runs identically locally or inside SageMaker
import argparse, os, pickle, json
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import mlflow, mlflow.sklearn

# SageMaker passes hyperparameters as CLI args
parser = argparse.ArgumentParser()
parser.add_argument('--n-estimators',  type=int,   default=200)
parser.add_argument('--max-depth',     type=int,   default=4)
parser.add_argument('--learning-rate', type=float, default=0.05)

# SageMaker injects these environment variables automatically
parser.add_argument('--model-dir',  default=os.environ.get('SM_MODEL_DIR',    './model'))
parser.add_argument('--train',      default=os.environ.get('SM_CHANNEL_TRAIN', './data'))
args = parser.parse_args()

# Load data from the SM_CHANNEL_TRAIN directory (mounted from S3)
df       = pd.read_parquet(os.path.join(args.train, 'train.parquet'))
feat_cols = [c for c in df.columns if c != 'delivery_minutes']
X, y     = df[feat_cols].values, df['delivery_minutes'].values

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

# Log to MLflow (SageMaker Experiments auto-patches mlflow calls)
mlflow.log_metric('train_mae', mae)
mlflow.log_metric('train_r2',  r2)

# Save — SageMaker uploads SM_MODEL_DIR to S3 automatically
os.makedirs(args.model_dir, exist_ok=True)
with open(os.path.join(args.model_dir, 'model.pkl'), 'wb') as f:
    pickle.dump({'model': model, 'feature_cols': feat_cols}, f)

print(f"Done: MAE={mae:.4f}  R2={r2:.4f}")`} />

        <ConceptBox title="SM_CHANNEL_* environment variables">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            SageMaker mounts each input channel as a directory and sets
            <code style={S.code}>SM_CHANNEL_&lt;NAME&gt;</code>. Pass{' '}
            <code style={S.code}>inputs={'{'}{'{'}'train': s3_uri{'}'}{'}'}</code> in the Estimator and your
            script sees <code style={S.code}>SM_CHANNEL_TRAIN</code> pointing to that data —
            no boto3 download code needed.
          </p>
        </ConceptBox>

        <h3 style={S.h3}>Submit with the Estimator API</h3>

        <CodeBlock code={`from sagemaker.sklearn import SKLearn

estimator = SKLearn(
    entry_point='train.py',       # your script
    source_dir='./src',           # directory containing train.py
    role=role,
    instance_type='ml.m5.xlarge', # 4 vCPU, 16 GB — SageMaker provisions this
    instance_count=1,
    framework_version='1.2-1',
    py_version='py3',

    # Hyperparameters — passed as CLI args to train.py
    hyperparameters={
        'n-estimators':  200,
        'max-depth':     4,
        'learning-rate': 0.05,
    },

    # Experiment tracking — auto-logs metrics to SageMaker Experiments
    enable_sagemaker_metrics=True,
    sagemaker_session=sess,
)

# Submit — provisions instance, runs script, uploads model to S3
estimator.fit(
    inputs={'train': s3_data_uri},
    job_name='freshmart-delivery-v1',
    wait=True,   # block until complete; set False for async
    logs=True,
)

print(f"Model artifact: {estimator.model_data}")
# → s3://sagemaker-.../output/freshmart-delivery-v1/output/model.tar.gz`} />

        <h3 style={S.h3}>Monitor from the CLI</h3>
        <CodeBlock label="bash" code={`# Describe a running or completed job
aws sagemaker describe-training-job \\
  --training-job-name freshmart-delivery-v1 \\
  --query 'TrainingJobStatus'

# Stream logs in real time
aws logs tail /aws/sagemaker/TrainingJobs \\
  --log-stream-name-prefix freshmart-delivery-v1 \\
  --follow`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — SAGEMAKER PIPELINES ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Multi-step workflows</span>
        <h2 style={S.h2}>SageMaker Pipelines — chain prepare → train → evaluate as a reusable DAG</h2>

        <p style={S.p}>
          A single Estimator runs one script. A Pipeline chains multiple steps
          together — the output artifact of one step flows automatically into
          the next. This is SageMaker&apos;s equivalent of the Prefect flow you built
          in Module 69 and the AML Pipeline from Module 76. SageMaker Pipelines
          add managed data passing, step-level caching (skip unchanged steps),
          a visual DAG in Studio, and a cron/event trigger for automated retraining.
        </p>

        <CodeBlock code={`from sagemaker.workflow.pipeline import Pipeline
from sagemaker.workflow.steps import ProcessingStep, TrainingStep
from sagemaker.workflow.pipeline_context import PipelineSession
from sagemaker.workflow.parameters import ParameterInteger, ParameterFloat, ParameterString
from sagemaker.sklearn.processing import SKLearnProcessor
from sagemaker.processing import ProcessingInput, ProcessingOutput
from sagemaker.sklearn import SKLearn

pipeline_sess = PipelineSession()

# ── Pipeline parameters — can be overridden at runtime ───────────────
n_estimators  = ParameterInteger(name='NEstimators',  default_value=200)
max_depth     = ParameterInteger(name='MaxDepth',     default_value=4)
learning_rate = ParameterFloat(  name='LearningRate', default_value=0.05)
input_data    = ParameterString( name='InputData',    default_value=s3_data_uri)

# ── Step 1: Processing — clean and featurise raw data ────────────────
processor = SKLearnProcessor(
    framework_version='1.2-1',
    role=role,
    instance_type='ml.m5.large',
    instance_count=1,
    sagemaker_session=pipeline_sess,
)

step_process = ProcessingStep(
    name='PrepareData',
    processor=processor,
    inputs=[ProcessingInput(source=input_data, destination='/opt/ml/processing/input')],
    outputs=[ProcessingOutput(output_name='train', source='/opt/ml/processing/output/train')],
    code='./src/prepare.py',
)

# ── Step 2: Training — train on processed data ────────────────────────
estimator = SKLearn(
    entry_point='train.py',
    source_dir='./src',
    role=role,
    instance_type='ml.m5.xlarge',
    framework_version='1.2-1',
    hyperparameters={
        'n-estimators':  n_estimators,
        'max-depth':     max_depth,
        'learning-rate': learning_rate,
    },
    sagemaker_session=pipeline_sess,
)

step_train = TrainingStep(
    name='TrainModel',
    estimator=estimator,
    inputs={
        'train': sagemaker.inputs.TrainingInput(
            s3_data=step_process.properties.ProcessingOutputConfig
                    .Outputs['train'].S3Output.S3Uri,
        )
    },
)

# ── Assemble and upsert pipeline ──────────────────────────────────────
pipeline = Pipeline(
    name='freshmart-retraining-pipeline',
    parameters=[n_estimators, max_depth, learning_rate, input_data],
    steps=[step_process, step_train],
    sagemaker_session=pipeline_sess,
)

pipeline.upsert(role_arn=role)   # create or update

# ── Execute ───────────────────────────────────────────────────────────
execution = pipeline.start(
    parameters={
        'NEstimators':  300,
        'LearningRate': 0.03,
    }
)
execution.wait()
print(execution.list_steps())`} />

        <ConceptBox title="Step caching — skip unchanged steps">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            Add <code style={S.code}>cache_config=CacheConfig(enable_caching=True, expire_after='30d')</code>
            to any step. If the step inputs (data URI + code hash) match a previous run
            within the expiry window, SageMaker reuses the output artifact instead of
            re-running. A daily retraining pipeline that detects no new data will skip
            the expensive training step automatically.
          </p>
        </ConceptBox>
      </div>

      <Div />

      {/* ══ SECTION 5 — FEATURE STORE ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Shared feature layer</span>
        <h2 style={S.h2}>SageMaker Feature Store — write features once, use them everywhere</h2>

        <p style={S.p}>
          Without a feature store, every ML team writes its own pipeline to
          compute the same features (average delivery time per postcode, customer
          order frequency, etc.). Those pipelines diverge — training uses one
          version, the inference service uses a slightly different one, and
          the resulting skew quietly degrades model accuracy.
          SageMaker Feature Store is a centralised repository: compute a feature
          once, write it to the store, and all models read the identical values
          at both training time and inference time.
        </p>

        <VisualBox label="Feature Store — online vs offline store">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'var(--surface)', borderRadius: 8, padding: '14px 16px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#FF9900', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                OFFLINE STORE (S3 / Glue)
              </div>
              <p style={{ ...S.ps, marginBottom: 0 }}>
                Append-only Parquet files in S3. Queryable via Athena.
                Used for training — you read a point-in-time snapshot so
                there is no future leakage.
              </p>
            </div>
            <div style={{ background: 'var(--surface)', borderRadius: 8, padding: '14px 16px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#00e676', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                ONLINE STORE (DynamoDB)
              </div>
              <p style={{ ...S.ps, marginBottom: 0 }}>
                Low-latency key-value store (&lt;10 ms reads).
                Used for inference — your endpoint calls
                <code style={S.code}>get_record</code> to fetch the latest
                feature values for a given entity.
              </p>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import boto3, time
from sagemaker.feature_store.feature_group import FeatureGroup
from sagemaker.feature_store.feature_definition import (
    FeatureDefinition, FeatureTypeEnum,
)

# ── Define a Feature Group ────────────────────────────────────────────
feature_group = FeatureGroup(
    name='freshmart-delivery-features',
    sagemaker_session=sess,
    feature_definitions=[
        FeatureDefinition('order_id',             FeatureTypeEnum.STRING),
        FeatureDefinition('postcode',             FeatureTypeEnum.STRING),
        FeatureDefinition('hour_of_day',          FeatureTypeEnum.INTEGRAL),
        FeatureDefinition('day_of_week',          FeatureTypeEnum.INTEGRAL),
        FeatureDefinition('items_in_order',       FeatureTypeEnum.INTEGRAL),
        FeatureDefinition('avg_delivery_postcode',FeatureTypeEnum.FRACTIONAL),
        FeatureDefinition('event_time',           FeatureTypeEnum.STRING),  # required
    ],
)

feature_group.create(
    s3_uri=f's3://{bucket}/feature-store',
    record_identifier_name='order_id',
    event_time_feature_name='event_time',
    role_arn=role,
    enable_online_store=True,   # DynamoDB backing for low-latency reads
)

# Wait until active
while feature_group.describe()['FeatureGroupStatus'] != 'Created':
    time.sleep(5)

# ── Ingest features ───────────────────────────────────────────────────
import pandas as pd

df = pd.read_parquet('features.parquet')
df['event_time'] = pd.Timestamp.utcnow().isoformat()

feature_group.ingest(
    data_frame=df,
    max_workers=4,
    wait=True,
)

# ── Read at inference time (online store) ─────────────────────────────
sm_runtime = boto3.client('sagemaker-featurestore-runtime')

record = sm_runtime.get_record(
    FeatureGroupName='freshmart-delivery-features',
    RecordIdentifierValueAsString='order-12345',
)
features = {f['FeatureName']: f['ValueAsString'] for f in record['Record']}
print(features)`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — CLARIFY ══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Responsible AI</span>
        <h2 style={S.h2}>SageMaker Clarify — detect bias and explain predictions</h2>

        <p style={S.p}>
          Clarify runs as a processing job that produces a bias report and
          feature importance report. You run it once after training to check
          for pre-training bias in the dataset (are certain postcodes
          underrepresented?) and post-training bias in model predictions
          (does the model systematically over-predict delivery time for
          certain areas?). You can also attach Clarify to a real-time
          endpoint to get per-prediction SHAP explanations.
        </p>

        <CodeBlock code={`from sagemaker import clarify

clarify_processor = clarify.SageMakerClarifyProcessor(
    role=role,
    instance_count=1,
    instance_type='ml.m5.xlarge',
    sagemaker_session=sess,
)

# ── Data config — where is the dataset ────────────────────────────────
data_config = clarify.DataConfig(
    s3_data_input_path=s3_data_uri,
    s3_output_path=f's3://{bucket}/clarify-output',
    label='delivery_minutes',
    headers=feat_cols + ['delivery_minutes'],
    dataset_type='text/csv',
)

# ── Model config — wrap the trained model ─────────────────────────────
model_config = clarify.ModelConfig(
    model_name='freshmart-delivery-model',   # SageMaker model name
    instance_type='ml.m5.large',
    instance_count=1,
    accept_type='text/csv',
)

# ── Bias config — which column / value is the sensitive group ──────────
bias_config = clarify.BiasConfig(
    label_values_or_threshold=[1],           # positive outcome: on-time delivery
    facet_name='postcode',                   # sensitive attribute to audit
    facet_values_or_threshold=['SW1A'],      # group of interest
)

# ── SHAP config — feature importance ──────────────────────────────────
shap_config = clarify.SHAPConfig(
    baseline=[df[feat_cols].mean().tolist()],  # baseline: feature means
    num_samples=100,
    agg_method='mean_abs',
    save_local_shap_values=True,
)

# Run the analysis
clarify_processor.run_bias(
    data_config=data_config,
    bias_config=bias_config,
    model_config=model_config,
    pre_training_methods='all',
    post_training_methods='all',
)

clarify_processor.run_explainability(
    data_config=data_config,
    model_config=model_config,
    explainability_config=shap_config,
)`} />

        <ConceptBox title="Key bias metrics Clarify reports">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              ['CI — Class Imbalance', 'Is one group underrepresented in training data?'],
              ['DPL — Difference in Positive Proportions', 'Do groups get different rates of positive predictions?'],
              ['AD — Accuracy Difference', 'Does model accuracy differ across groups?'],
              ['SHAP values', 'Which features most influenced each prediction?'],
            ].map(([metric, desc]) => (
              <div key={metric} style={{ background: 'var(--surface)', borderRadius: 6, padding: '10px 12px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#FF9900', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{metric}</div>
                <p style={{ ...S.ps, marginBottom: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </ConceptBox>
      </div>

      <Div />

      {/* ══ SECTION 7 — JUMPSTART ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Pre-built models</span>
        <h2 style={S.h2}>SageMaker JumpStart — deploy foundation models in minutes</h2>

        <p style={S.p}>
          JumpStart is AWS&apos;s model hub — pre-trained foundation models (Llama,
          Mistral, Stable Diffusion, etc.) and classic ML models that you can
          deploy to a SageMaker endpoint with a few lines of code. No container
          building, no custom inference code — JumpStart handles the serving
          infrastructure. Use it when you want to fine-tune a foundation model
          or build a quick baseline before training from scratch.
        </p>

        <CodeBlock code={`from sagemaker.jumpstart.model import JumpStartModel

# ── Deploy a pre-trained model ────────────────────────────────────────
# model_id list: https://sagemaker.readthedocs.io/en/stable/doc_utils/jumpstart.html
model = JumpStartModel(
    model_id='huggingface-text2text-flan-t5-xl',
    role=role,
    sagemaker_session=sess,
)

predictor = model.deploy(
    initial_instance_count=1,
    instance_type='ml.g4dn.xlarge',   # GPU instance
)

# ── Run inference ─────────────────────────────────────────────────────
response = predictor.predict({
    'text_inputs': 'Summarise this delivery exception: order arrived 45 min late due to traffic.',
    'max_length': 100,
})
print(response[0]['generated_text'])

# ── Fine-tune on your own data ────────────────────────────────────────
from sagemaker.jumpstart.estimator import JumpStartEstimator

estimator = JumpStartEstimator(
    model_id='huggingface-text2text-flan-t5-xl',
    role=role,
    instance_type='ml.g4dn.xlarge',
    hyperparameters={'epoch': 3, 'per_device_train_batch_size': 4},
)

estimator.fit({'training': s3_fine_tune_uri})   # your labelled JSONL data

# Deploy the fine-tuned model
ft_predictor = estimator.deploy(instance_type='ml.g4dn.xlarge')

# ── Clean up ──────────────────────────────────────────────────────────
predictor.delete_endpoint()
ft_predictor.delete_endpoint()`} />

        <AnalogyBox>
          <p style={{ ...S.ps, marginBottom: 0 }}>
            JumpStart is like PyPI for production ML models. Instead of
            <code style={S.code}>pip install transformers</code> and writing a
            Flask server, you write{' '}
            <code style={S.code}>JumpStartModel(model_id=&apos;...&apos;).deploy()</code>{' '}
            and AWS handles the container, GPU driver, scaling, and HTTPS endpoint.
          </p>
        </AnalogyBox>
      </div>

      <Div />

      {/* ══ SECTION 8 — COMMON ERRORS ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Debugging</span>
        <h2 style={S.h2}>Common SageMaker errors and how to fix them</h2>

        <ErrorBlock
          error="ResourceLimitExceeded: Unable to provision ml.p3.2xlarge"
          cause="Your AWS account has a default quota of 0 GPU instances in SageMaker. GPU quotas must be explicitly requested."
          fix="Go to AWS Service Quotas → SageMaker → request an increase for 'ml.p3.2xlarge for training job usage'. Use ml.m5.xlarge for CPU-only models in the meantime."
        />
        <ErrorBlock
          error="ClientError: An error occurred (ValidationException): No S3 objects found"
          cause="The S3 URI passed to Estimator.fit() does not exist or your IAM role lacks s3:GetObject permission on that bucket."
          fix="Verify the path with `aws s3 ls <uri>`. Add s3:GetObject and s3:ListBucket to the SageMaker execution role for your data bucket."
        />
        <ErrorBlock
          error="AlgorithmError: ExecuteUserScriptError — exit code 1"
          cause="Your training script raised an unhandled exception. SageMaker wraps the exit code but the actual stack trace is in CloudWatch Logs."
          fix="Run `aws logs tail /aws/sagemaker/TrainingJobs --log-stream-name-prefix <job-name>` to see the full Python traceback. Reproduce locally first with the same SM_CHANNEL_* env vars."
        />
        <ErrorBlock
          error="FeatureGroup status stuck at 'Creating'"
          cause="Feature Store creation can take 1–3 minutes but will fail silently if the S3 URI or IAM role is misconfigured."
          fix="Call feature_group.describe()['FailureReason'] to see the error. Common causes: S3 URI missing trailing slash, role missing glue:CreateTable permission."
        />
      </div>

      <Div />

      {/* ══ KEY TAKEAWAYS ════════════════════════════════════════════════════════ */}
      <KeyTakeaways items={[
        'SageMaker Training Jobs provision compute on demand — you pay per second and the instance terminates automatically when done.',
        'Your training script is unchanged — SageMaker injects data paths via SM_CHANNEL_* env vars and uploads SM_MODEL_DIR to S3.',
        'SageMaker Pipelines chain steps as a DAG with automatic data passing, step caching, and cron/event triggers.',
        'Feature Store solves train/serve skew — write features once, read identical values from the offline store (training) and online store (inference).',
        'Clarify runs pre- and post-training bias analysis and SHAP explanations as a processing job — no model code changes required.',
        'JumpStart deploys foundation models in minutes; use JumpStartEstimator to fine-tune them on your own data.',
      ]} />

    </LearnLayout>
  )
}
