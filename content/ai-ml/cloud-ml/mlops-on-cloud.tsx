import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'MLOps on Cloud — CI/CD for ML — Chaduvuko',
  description:
    'GitHub Actions triggering retraining, model quality gates in CI, automated deployment to staging and production across Azure ML, SageMaker, and Vertex AI.',
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
          {label ?? 'yaml'}
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

export default function MLOpsOnCloudPage() {
  return (
    <LearnLayout
      title="MLOps on Cloud — CI/CD for ML"
      description="GitHub Actions triggering retraining, model quality gates in CI, automated deployment to staging and production across Azure ML, SageMaker, and Vertex AI."
      section="Cloud ML Platforms"
      readTime="45–58 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="cloud-ml" topic="mlops-on-cloud" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — what CI/CD for ML means</span>
        <h2 style={S.h2}>
          Software CI/CD is: push code → tests run → deploy if green.
          ML CI/CD is: push code or data → train model → quality gates run →
          deploy to staging → shadow test → promote to production.
          The same idea, four more steps.
        </h2>

        <p style={S.p}>
          Software engineers take CI/CD for granted. A pull request opens,
          unit tests run, integration tests run, and the change deploys
          automatically if everything passes. ML teams almost never have this.
          Retraining is manual — someone runs a notebook when they remember.
          Deployment is manual — someone SSH-es into a server and restarts
          a process. Quality gates are absent — a worse model can go to
          production because no one compared it to the incumbent.
          This is the gap that ML CI/CD closes.
        </p>

        <p style={S.p}>
          The complete ML CI/CD pipeline has two orthogonal triggers.
          Code changes: a pull request modifying the training script or
          feature pipeline runs tests, trains a model on a small data sample,
          checks quality, and blocks the merge if it fails.
          Data changes or schedules: a weekly cron job or a drift alert
          triggers full retraining on production data, runs evaluation,
          compares to the champion model, and deploys if the challenger wins.
          Both flows use GitHub Actions — the same CI/CD tool your software
          team already uses.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A car manufacturer runs two quality checks. The design check
            happens when engineers submit a blueprint change — does the new
            design meet safety standards on paper? The production check
            happens on the assembly line — does the manufactured car meet
            standards in reality? ML CI/CD is the same: code-change tests
            (does the training script work correctly on a small sample?)
            and data-change tests (does the model trained on new production
            data beat the current production model?). Neither check alone
            is sufficient. Together they ensure nothing bad reaches customers.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The key shift in mindset: in ML, the model is not just code —
            it is code plus data plus hyperparameters. CI/CD must test all
            three dimensions simultaneously. A code change that looks fine
            in unit tests might produce a degraded model when combined with
            production data. The full pipeline test is the only reliable check.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          All examples use GitHub Actions — available on any GitHub repository,
          free for public repos and 2,000 minutes/month for private repos.
          Cloud credentials are stored as GitHub Secrets and injected as
          environment variables. The patterns work identically with GitLab CI,
          Azure DevOps, or Bitbucket Pipelines — only the YAML syntax differs.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — THE FULL PIPELINE ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The complete picture</span>
        <h2 style={S.h2}>Four-stage ML CI/CD pipeline — what runs, when, and what gates block progress</h2>

        <VisualBox label="Complete ML CI/CD pipeline — two triggers, four stages">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 8 }}>
              {[
                {
                  trigger: 'Trigger A — Code change (PR opened)',
                  color: '#378ADD',
                  when: 'Any PR modifying src/, data/, or requirements.txt',
                  goal: 'Verify the training code works correctly',
                },
                {
                  trigger: 'Trigger B — Data/schedule (weekly cron or drift alert)',
                  color: '#D85A30',
                  when: 'Every Monday 2 AM IST — or — drift monitoring alert',
                  goal: 'Produce and validate a new production model',
                },
              ].map((item) => (
                <div key={item.trigger} style={{
                  background: 'var(--surface)', border: `1px solid ${item.color}30`,
                  borderRadius: 6, padding: '9px 12px', borderTop: `3px solid ${item.color}`,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.trigger}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>When: {item.when}</div>
                  <div style={{ fontSize: 11, color: item.color, fontStyle: 'italic' }}>Goal: {item.goal}</div>
                </div>
              ))}
            </div>

            {[
              {
                stage: 'Stage 1 — Unit + Integration Tests',
                color: '#888',
                runs_on: 'GitHub Actions runner (no cloud cost)',
                steps: ['pytest src/ — unit tests for feature functions', 'Test training script on 500-row sample', 'Verify model serialisation/deserialisation', 'Check output schema matches expected'],
                gate: 'All tests pass → continue. Any failure → block PR/deployment.',
                trigger: 'Both A and B',
              },
              {
                stage: 'Stage 2 — Cloud Training Job',
                color: '#7b61ff',
                runs_on: 'Cloud ML platform compute (AML/SageMaker/Vertex)',
                steps: ['Submit training job to cloud platform', 'Wait for completion (poll job status)', 'Retrieve metrics from job run', 'Compare challenger vs champion metrics'],
                gate: 'Challenger MAE ≤ 1.05× champion MAE → continue. Worse → fail pipeline.',
                trigger: 'Trigger B only (too slow for every PR)',
              },
              {
                stage: 'Stage 3 — Staging Deployment',
                color: '#D85A30',
                runs_on: 'Cloud staging endpoint',
                steps: ['Deploy challenger model to staging endpoint', 'Run integration test suite against staging', 'Smoke test: 10 sample predictions match expected', 'Load test: p99 latency < 500ms at 50 RPS'],
                gate: 'All integration + load tests pass → continue. Failure → rollback staging.',
                trigger: 'Trigger B only',
              },
              {
                stage: 'Stage 4 — Production Promotion',
                color: '#1D9E75',
                runs_on: 'Cloud production endpoint',
                steps: ['Gradual traffic shift: 10% → 50% → 100%', 'Monitor error rate and latency at each step', 'Auto-rollback if p99 > 500ms or error rate > 1%', 'Archive old production model in registry'],
                gate: 'No latency/error regression → promote. Regression detected → instant rollback.',
                trigger: 'Trigger B only (with optional manual approval gate)',
              },
            ].map((item, i) => (
              <div key={item.stage} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 7, padding: '10px 12px',
                borderLeft: `4px solid ${item.color}`,
              }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 7 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: item.color }}>{item.stage}</span>
                  <span style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)', background: `${item.color}15`, padding: '2px 7px', borderRadius: 3 }}>
                    {item.trigger}
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--muted)' }}>{item.runs_on}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    {item.steps.map((s, j) => (
                      <div key={j} style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>→ {s}</div>
                    ))}
                  </div>
                  <div style={{ fontSize: 11, color: item.color, fontStyle: 'italic', borderLeft: `1px solid ${item.color}30`, paddingLeft: 10 }}>
                    Gate: {item.gate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>
      </div>

      <Div />

      {/* ══ SECTION 3 — CODE CHANGE WORKFLOW ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Trigger A — code change CI</span>
        <h2 style={S.h2}>The pull request workflow — test ML code like software code</h2>

        <CodeBlock code={`# .github/workflows/ml-ci.yml
# Runs on every PR that touches ML code

name: ML Code CI

on:
  pull_request:
    paths:
      - 'src/**'
      - 'data/**'
      - 'requirements*.txt'
      - 'params.yaml'

env:
  PYTHON_VERSION: '3.11'

jobs:
  # ── Job 1: Unit tests ─────────────────────────────────────────────
  unit-tests:
    name: Unit Tests
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: ${'$'}{{ env.PYTHON_VERSION }}
          cache: pip

      - name: Install dependencies
        run: pip install -r requirements-dev.txt

      - name: Run unit tests
        run: pytest src/ -v --tb=short --junit-xml=test-results.xml

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: unit-test-results
          path: test-results.xml

  # ── Job 2: Training smoke test (no cloud — small data) ────────────
  training-smoke-test:
    name: Training Smoke Test
    runs-on: ubuntu-latest
    needs: unit-tests

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: ${'$'}{{ env.PYTHON_VERSION }}
          cache: pip

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Generate small test dataset
        run: python tests/generate_test_data.py --n-rows 500 --output /tmp/test_data.csv

      - name: Run training on sample data
        run: |
          python src/train.py \\
            --data-path /tmp/test_data.csv \\
            --output-dir /tmp/model-output \\
            --n-estimators 10 \\
            --max-depth 3

      - name: Verify model output exists
        run: |
          python -c "
          import pickle, os, json
          assert os.path.exists('/tmp/model-output/model.pkl'), 'model.pkl missing'
          with open('/tmp/model-output/model.pkl', 'rb') as f:
              art = pickle.load(f)
          assert 'model' in art, 'model key missing from artifact'
          assert 'feature_cols' in art, 'feature_cols key missing'
          print('Model artifact validation passed')
          print(f'Features: {art[\\\"feature_cols\\\"]}')
          "

      - name: Verify prediction schema
        run: |
          python -c "
          import pickle, numpy as np, json
          with open('/tmp/model-output/model.pkl', 'rb') as f:
              art = pickle.load(f)
          model        = art['model']
          feature_cols = art['feature_cols']
          test_input   = np.zeros((3, len(feature_cols)))
          preds        = model.predict(test_input)
          assert preds.shape == (3,), f'Wrong output shape: {preds.shape}'
          assert all(5 <= p <= 120 for p in preds), f'Predictions out of range: {preds}'
          print(f'Schema test passed: {preds}')
          "

      - name: Check metrics are reasonable
        run: |
          python -c "
          import json
          with open('/tmp/model-output/metrics.json') as f:
              m = json.load(f)
          # On tiny 500-row sample, MAE should be computable
          assert 'train_mae' in m, 'train_mae missing from metrics'
          assert m['train_mae'] > 0, 'train_mae must be positive'
          assert m['train_mae'] < 50, f'train_mae suspiciously high: {m[\"train_mae\"]}'
          print(f'Metrics check passed: {m}')
          "

  # ── Job 3: Code quality ───────────────────────────────────────────
  code-quality:
    name: Code Quality
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '${'$'}{{ env.PYTHON_VERSION }}' }

      - run: pip install ruff mypy
      - run: ruff check src/
      - run: mypy src/ --ignore-missing-imports`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — DATA CHANGE RETRAINING WORKFLOW ══════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Trigger B — retraining workflow</span>
        <h2 style={S.h2}>The retraining workflow — weekly cron, full cloud training, quality gate, deploy</h2>

        <CodeBlock code={`# .github/workflows/ml-retrain.yml
# Runs on schedule AND when triggered manually or by drift alert

name: ML Retraining Pipeline

on:
  schedule:
    - cron: '30 20 * * 0'   # Every Sunday 20:30 UTC = Monday 02:00 IST
  workflow_dispatch:          # Manual trigger from GitHub UI
    inputs:
      reason:
        description: 'Reason for manual retraining'
        required: true
        default: 'drift-detected'
      force_promote:
        description: 'Force promote even if challenger is not better'
        type: boolean
        default: false
  repository_dispatch:        # Triggered by external system (drift monitor)
    types: [drift-detected, scheduled-retrain]

env:
  PYTHON_VERSION: '3.11'
  MODEL_NAME:     freshmart-delivery-time
  REGISTRY_NAME:  FreshCartDeliveryTime

jobs:
  # ── Stage 1: Unit tests (fast, no cloud) ─────────────────────────
  unit-tests:
    name: Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '${'$'}{{ env.PYTHON_VERSION }}', cache: pip }
      - run: pip install -r requirements-dev.txt
      - run: pytest src/ -v --tb=short

  # ── Stage 2: Cloud training job ───────────────────────────────────
  cloud-training:
    name: Cloud Training Job
    runs-on: ubuntu-latest
    needs: unit-tests
    outputs:
      job_name:      ${'$'}{{ steps.submit.outputs.job_name }}
      challenger_mae: ${'$'}{{ steps.metrics.outputs.mae }}
      champion_mae:   ${'$'}{{ steps.compare.outputs.champion_mae }}
      should_promote: ${'$'}{{ steps.compare.outputs.should_promote }}

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with: { python-version: '${'$'}{{ env.PYTHON_VERSION }}', cache: pip }

      - name: Install cloud SDK
        run: pip install azure-ai-ml azure-identity

      # Azure credentials injected from GitHub Secrets
      - name: Azure login
        uses: azure/login@v2
        with:
          creds: ${'$'}{{ secrets.AZURE_BrexENTIALS }}

      - name: Submit training job
        id: submit
        run: |
          python ci/submit_training_job.py \\
            --subscription-id ${'$'}{{ secrets.AZURE_SUBSCRIPTION_ID }} \\
            --resource-group  rg-freshmart-ml \\
            --workspace       ws-freshmart-ml \\
            --cutoff-date     $(date +%Y-%m-%d) \\
            --output-job-name /tmp/job_name.txt

          JOB_NAME=$(cat /tmp/job_name.txt)
          echo "job_name=${'$'}{JOB_NAME}" >> $GITHUB_OUTPUT
          echo "Submitted: ${'$'}{JOB_NAME}"

      - name: Wait for training job
        run: |
          python ci/wait_for_job.py \\
            --job-name ${'$'}{{ steps.submit.outputs.job_name }} \\
            --timeout  3600   # 1 hour max

      - name: Retrieve job metrics
        id: metrics
        run: |
          python ci/get_job_metrics.py \\
            --job-name ${'$'}{{ steps.submit.outputs.job_name }} \\
            --output   /tmp/challenger_metrics.json

          MAE=$(python -c "import json; print(json.load(open('/tmp/challenger_metrics.json'))['val_mae'])")
          echo "mae=${'$'}{MAE}" >> $GITHUB_OUTPUT
          echo "Challenger MAE: ${'$'}{MAE}"

      - name: Compare challenger to champion
        id: compare
        run: |
          python ci/compare_models.py \\
            --challenger-metrics /tmp/challenger_metrics.json \\
            --registry-name      ${'$'}{{ env.REGISTRY_NAME }} \\
            --tolerance          0.05 \\
            --output             /tmp/comparison.json

          CHAMP_MAE=$(python -c "import json; print(json.load(open('/tmp/comparison.json'))['champion_mae'])")
          PROMOTE=$(python -c "import json; print(json.load(open('/tmp/comparison.json'))['should_promote'])")
          echo "champion_mae=${'$'}{CHAMP_MAE}" >> $GITHUB_OUTPUT
          echo "should_promote=${'$'}{PROMOTE}" >> $GITHUB_OUTPUT

      - name: Register challenger model
        run: |
          python ci/register_model.py \\
            --job-name    ${'$'}{{ steps.submit.outputs.job_name }} \\
            --model-name  ${'$'}{{ env.MODEL_NAME }} \\
            --stage       Staging

      - name: Post metrics to PR / Slack
        run: |
          python ci/notify.py \\
            --challenger-mae ${'$'}{{ steps.metrics.outputs.mae }} \\
            --champion-mae   ${'$'}{{ steps.compare.outputs.champion_mae }} \\
            --should-promote ${'$'}{{ steps.compare.outputs.should_promote }} \\
            --slack-webhook  ${'$'}{{ secrets.SLACK_WEBHOOK_ML_ALERTS }}

  # ── Stage 3: Staging tests ────────────────────────────────────────
  staging-tests:
    name: Staging Deployment Tests
    runs-on: ubuntu-latest
    needs: cloud-training
    if: needs.cloud-training.outputs.should_promote == 'True'

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '${'$'}{{ env.PYTHON_VERSION }}', cache: pip }
      - run: pip install requests pytest

      - name: Deploy to staging endpoint
        run: |
          python ci/deploy_to_staging.py \\
            --model-name ${'$'}{{ env.MODEL_NAME }} \\
            --endpoint   freshmart-delivery-staging

      - name: Run integration tests against staging
        run: |
          pytest tests/integration/ \\
            --endpoint freshmart-delivery-staging \\
            --n-samples 100 \\
            -v

      - name: Load test staging endpoint
        run: |
          python ci/load_test.py \\
            --endpoint      freshmart-delivery-staging \\
            --rps            50 \\
            --duration-s    30 \\
            --max-p99-ms    500 \\
            --max-error-pct 1.0

  # ── Stage 4: Production promotion (with optional approval gate) ───
  production-promote:
    name: Promote to Production
    runs-on: ubuntu-latest
    needs: [cloud-training, staging-tests]
    environment:
      name: production          # GitHub environment — can require manual approval
      url:  https://freshmart-delivery-endpoint.azurewebsites.net/health

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '${'$'}{{ env.PYTHON_VERSION }}', cache: pip }

      - name: Gradual traffic promotion
        run: |
          python ci/gradual_promote.py \\
            --model-name    ${'$'}{{ env.MODEL_NAME }} \\
            --endpoint      freshmart-delivery-endpoint \\
            --traffic-steps "10,25,50,100" \\
            --step-wait-s   600 \\  # 10 min at each step
            --max-p99-ms    500 \\
            --max-error-pct 1.0

      - name: Archive old production model
        run: |
          python ci/archive_old_model.py \\
            --model-name ${'$'}{{ env.MODEL_NAME }} \\
            --keep-versions 3

      - name: Notify success
        run: |
          python ci/notify.py \\
            --event promoted \\
            --model-name    ${'$'}{{ env.MODEL_NAME }} \\
            --challenger-mae ${'$'}{{ needs.cloud-training.outputs.challenger_mae }} \\
            --champion-mae   ${'$'}{{ needs.cloud-training.outputs.champion_mae }} \\
            --slack-webhook ${'$'}{{ secrets.SLACK_WEBHOOK_ML_ALERTS }}`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — CI HELPER SCRIPTS ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The Python scripts that power CI</span>
        <h2 style={S.h2}>Five scripts every ML CI pipeline needs — platform-agnostic patterns</h2>

        <CodeBlock code={`# ci/submit_training_job.py
# Called by GitHub Actions to submit training to cloud platform

import argparse, sys, json
from datetime import datetime

def submit_azure_ml(args) -> str:
    """Submit training job to Azure ML and return job name."""
    from azure.ai.ml import MLClient, command, Input
    from azure.ai.ml.constants import AssetTypes
    from azure.identity import DefaultAzureCredential

    ml_client = MLClient(
        credential=DefaultAzureCredential(),
        subscription_id=args.subscription_id,
        resource_group_name=args.resource_group,
        workspace_name=args.workspace,
    )

    job = command(
        name=f'ci-retrain-{datetime.now().strftime("%Y%m%d-%H%M%S")}',
        code='./src',
        command=(
            f'python train.py '
            f'--cutoff-date {args.cutoff_date} '
            f'--output-dir ${'$'}{{{{outputs.model_output}}}}'
        ),
        environment='freshmart-training-env:latest',
        compute='cpu-cluster',
        experiment_name='freshmart-delivery-ci',
        tags={'triggered_by': 'github-actions', 'cutoff': args.cutoff_date},
    )

    submitted = ml_client.jobs.create_or_update(job)
    print(f"Job submitted: {submitted.name}")
    print(f"Studio URL:    {submitted.studio_url}")

    with open(args.output_job_name, 'w') as f:
        f.write(submitted.name)

    return submitted.name

# ci/wait_for_job.py
def wait_for_azure_job(job_name: str, timeout_s: int = 3600):
    """Poll job status until complete or timeout."""
    from azure.ai.ml import MLClient
    from azure.identity import DefaultAzureCredential
    import time

    ml_client = MLClient(
        credential=DefaultAzureCredential(),
        subscription_id=os.environ['AZURE_SUBSCRIPTION_ID'],
        resource_group_name='rg-freshmart-ml',
        workspace_name='ws-freshmart-ml',
    )

    TERMINAL_STATES = {'Completed', 'Failed', 'Canceled'}
    start = time.time()

    while time.time() - start < timeout_s:
        job    = ml_client.jobs.get(job_name)
        status = job.status
        elapsed = int(time.time() - start)
        print(f"[{elapsed:>4}s] Status: {status}")

        if status in TERMINAL_STATES:
            if status != 'Completed':
                print(f"Job {status}: {job_name}")
                sys.exit(1)
            print(f"Job completed in {elapsed}s")
            return

        time.sleep(30)   # poll every 30 seconds

    print(f"Timeout after {timeout_s}s")
    sys.exit(1)

# ci/compare_models.py
def compare_models(challenger_metrics_path: str,
                    registry_name: str,
                    tolerance: float = 0.05) -> dict:
    """
    Compare challenger metrics to current production champion.
    Returns whether challenger should be promoted.
    """
    import json
    from azure.ai.ml import MLClient
    from azure.identity import DefaultAzureCredential

    with open(challenger_metrics_path) as f:
        challenger = json.load(f)
    challenger_mae = challenger['val_mae']

    ml_client = MLClient(
        credential=DefaultAzureCredential(),
        subscription_id=os.environ['AZURE_SUBSCRIPTION_ID'],
        resource_group_name='rg-freshmart-ml',
        workspace_name='ws-freshmart-ml',
    )

    # Get champion metrics from model registry
    try:
        versions = ml_client.models.list(name=registry_name)
        prod_versions = [v for v in versions if v.stage == 'Production']
        if prod_versions:
            champion_run  = ml_client.jobs.get(prod_versions[0].run_id)
            champion_mae  = champion_run.outputs.get('val_mae', 999.0)
        else:
            champion_mae  = 999.0   # no champion — always promote
            print("No production champion found — challenger will be promoted")
    except Exception as e:
        champion_mae = 999.0
        print(f"Could not retrieve champion metrics: {e}")

    improvement   = (champion_mae - challenger_mae) / champion_mae * 100
    should_promote = challenger_mae <= champion_mae * (1 + tolerance)

    result = {
        'challenger_mae':  round(challenger_mae, 4),
        'champion_mae':    round(champion_mae, 4),
        'improvement_pct': round(improvement, 2),
        'should_promote':  should_promote,
        'tolerance':       tolerance,
    }

    print(f"Champion MAE:    {champion_mae:.4f}")
    print(f"Challenger MAE:  {challenger_mae:.4f}")
    print(f"Improvement:     {improvement:+.2f}%")
    print(f"Should promote:  {should_promote}")

    with open('/tmp/comparison.json', 'w') as f:
        json.dump(result, f, indent=2)

    return result

# ci/load_test.py
def load_test_endpoint(endpoint_url: str, api_key: str,
                        rps: int = 50, duration_s: int = 30,
                        max_p99_ms: float = 500.0,
                        max_error_pct: float = 1.0) -> bool:
    """
    Simple load test using concurrent requests.
    Returns True if endpoint meets SLO targets.
    """
    import threading, time, requests, statistics

    latencies = []
    errors    = []
    lock      = threading.Lock()

    sample_payload = {
        'distance_km': 3.5, 'is_peak_hour': 1,
        'order_value': 450.0, 'restaurant_avg': 33.2, 'driver_avg': 29.8,
    }

    def make_request():
        start = time.time()
        try:
            r = requests.post(
                endpoint_url,
                json=sample_payload,
                headers={'Authorization': f'Bearer {api_key}'},
                timeout=2.0,
            )
            latency = (time.time() - start) * 1000
            with lock:
                if r.status_code == 200:
                    latencies.append(latency)
                else:
                    errors.append(r.status_code)
        except Exception as e:
            with lock:
                errors.append(str(e))

    interval = 1.0 / rps
    end_time = time.time() + duration_s

    while time.time() < end_time:
        t = threading.Thread(target=make_request)
        t.daemon = True
        t.start()
        time.sleep(interval)

    time.sleep(2)   # wait for in-flight requests

    if not latencies:
        print("No successful requests — endpoint unavailable")
        return False

    p50  = statistics.median(latencies)
    p99  = sorted(latencies)[int(0.99 * len(latencies))]
    err_pct = len(errors) / (len(latencies) + len(errors)) * 100

    print(f"Load test results ({rps} RPS, {duration_s}s):")
    print(f"  Total requests:  {len(latencies) + len(errors)}")
    print(f"  p50 latency:     {p50:.1f}ms")
    print(f"  p99 latency:     {p99:.1f}ms  (max: {max_p99_ms}ms)")
    print(f"  Error rate:      {err_pct:.2f}%  (max: {max_error_pct}%)")

    passed = p99 <= max_p99_ms and err_pct <= max_error_pct
    if not passed:
        print("LOAD TEST FAILED — SLO violation")
        sys.exit(1)
    print("Load test passed")
    return True`} label="python" />
      </div>

      <Div />

      {/* ══ SECTION 6 — CROSS-PLATFORM PATTERNS ═════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Works on any cloud</span>
        <h2 style={S.h2}>Platform-agnostic CI/CD — the same workflow adapted for SageMaker and Vertex AI</h2>

        <p style={S.p}>
          The GitHub Actions workflow structure is identical across all three
          cloud platforms. Only the submit and compare scripts change.
          The abstraction pattern: write a thin adapter for each platform
          behind a common interface. The CI workflow calls the interface —
          it does not care which cloud is underneath. This lets you migrate
          between platforms without rewriting the entire CI pipeline.
        </p>

        <CodeBlock code={`# ci/cloud_adapter.py
# Platform-agnostic interface — one file per cloud

import os
from abc import ABC, abstractmethod
from dataclasses import dataclass

@dataclass
class JobResult:
    job_name:   str
    status:     str   # 'Completed', 'Failed'
    val_mae:    float
    val_r2:     float
    model_uri:  str   # path to model artifact

class CloudMLAdapter(ABC):
    @abstractmethod
    def submit_training_job(self, cutoff_date: str, **hyperparams) -> str:
        """Submit a training job and return the job name/ID."""

    @abstractmethod
    def wait_for_job(self, job_name: str, timeout_s: int = 3600) -> JobResult:
        """Wait for a job to complete and return results."""

    @abstractmethod
    def register_model(self, job_result: JobResult,
                        model_name: str, stage: str) -> str:
        """Register a trained model and return its version."""

    @abstractmethod
    def get_champion_metrics(self, model_name: str) -> dict:
        """Return metrics of the current production champion model."""

    @abstractmethod
    def deploy_to_endpoint(self, model_name: str, version: str,
                            endpoint: str, traffic_pct: int) -> None:
        """Deploy a model version to an endpoint with given traffic %."""

# ── Azure ML implementation ───────────────────────────────────────────
class AzureMLAdapter(CloudMLAdapter):
    def __init__(self):
        from azure.ai.ml import MLClient
        from azure.identity import DefaultAzureCredential
        self.client = MLClient(
            credential=DefaultAzureCredential(),
            subscription_id=os.environ['AZURE_SUBSCRIPTION_ID'],
            resource_group_name=os.environ['AZURE_RESOURCE_GROUP'],
            workspace_name=os.environ['AZURE_WORKSPACE'],
        )

    def submit_training_job(self, cutoff_date: str, **params) -> str:
        from azure.ai.ml import command
        job = command(
            name=f'ci-{cutoff_date}',
            code='./src',
            command=f'python train.py --cutoff-date {cutoff_date}',
            environment='freshmart-training-env:latest',
            compute='cpu-cluster',
        )
        return self.client.jobs.create_or_update(job).name

    def wait_for_job(self, job_name: str, timeout_s=3600) -> JobResult:
        import time
        deadline = time.time() + timeout_s
        while time.time() < deadline:
            job = self.client.jobs.get(job_name)
            if job.status in ('Completed', 'Failed', 'Canceled'):
                mae = job.outputs.get('val_mae', 999.0)
                return JobResult(
                    job_name=job_name, status=job.status,
                    val_mae=float(mae), val_r2=0.0,
                    model_uri=f'azureml://jobs/{job_name}/outputs/model',
                )
            time.sleep(30)
        raise TimeoutError(f"Job {job_name} did not complete in {timeout_s}s")

    def get_champion_metrics(self, model_name: str) -> dict:
        try:
            versions = list(self.client.models.list(name=model_name))
            prod = [v for v in versions if getattr(v, 'stage', '') == 'Production']
            if not prod:
                return {'val_mae': 999.0}
            # In practice: retrieve metrics from the run that produced this model
            return {'val_mae': float(prod[0].tags.get('val_mae', 999.0))}
        except Exception:
            return {'val_mae': 999.0}

    def register_model(self, job_result, model_name, stage='Staging') -> str:
        from azure.ai.ml.entities import Model
        from azure.ai.ml.constants import AssetTypes
        model = self.client.models.create_or_update(Model(
            name=model_name,
            path=job_result.model_uri,
            type=AssetTypes.MLFLOW_MODEL,
            tags={'val_mae': str(job_result.val_mae), 'stage': stage},
        ))
        return str(model.version)

    def deploy_to_endpoint(self, model_name, version, endpoint, traffic_pct):
        print(f"AML: deploying {model_name}:{version} to {endpoint} ({traffic_pct}%)")

# ── SageMaker implementation ──────────────────────────────────────────
class SageMakerAdapter(CloudMLAdapter):
    def __init__(self):
        import boto3, sagemaker
        self.sm        = boto3.client('sagemaker')
        self.session   = sagemaker.Session()
        self.role      = sagemaker.get_execution_role()
        self.bucket    = self.session.default_bucket()

    def submit_training_job(self, cutoff_date: str, **params) -> str:
        from sagemaker.sklearn.estimator import SKLearn
        est = SKLearn(
            entry_point='train.py', source_dir='./src',
            framework_version='1.2-1', instance_type='ml.m5.large',
            role=self.role, hyperparameters={'cutoff-date': cutoff_date},
            output_path=f's3://{self.bucket}/model-output/',
            base_job_name='ci-retrain',
        )
        est.fit(inputs={'train': f's3://{self.bucket}/training-data/'}, wait=False)
        return est.latest_training_job.name

    def wait_for_job(self, job_name: str, timeout_s=3600) -> JobResult:
        import time
        deadline = time.time() + timeout_s
        while time.time() < deadline:
            desc   = self.sm.describe_training_job(TrainingJobName=job_name)
            status = desc['TrainingJobStatus']
            if status in ('Completed', 'Failed', 'Stopped'):
                model_uri = desc.get('ModelArtifacts', {}).get('S3ModelArtifacts', '')
                mae = float(desc.get('FinalMetricDataList', [{}])[0].get('Value', 999.0))
                return JobResult(job_name, status, mae, 0.0, model_uri)
            time.sleep(30)
        raise TimeoutError(f"SageMaker job {job_name} timed out")

    def get_champion_metrics(self, model_name: str) -> dict:
        try:
            pkgs = self.sm.list_model_packages(
                ModelPackageGroupName=model_name,
                ModelApprovalStatus='Approved',
            )['ModelPackageSummaryList']
            if not pkgs:
                return {'val_mae': 999.0}
            return {'val_mae': 999.0}   # retrieve from package metadata
        except Exception:
            return {'val_mae': 999.0}

    def register_model(self, job_result, model_name, stage='Staging') -> str:
        print(f"SageMaker: registering {model_name} from {job_result.model_uri}")
        return '1'

    def deploy_to_endpoint(self, model_name, version, endpoint, traffic_pct):
        print(f"SageMaker: deploying {model_name}:{version} to {endpoint} ({traffic_pct}%)")

# ── Factory — choose adapter from environment variable ────────────────
def get_adapter() -> CloudMLAdapter:
    platform = os.environ.get('ML_PLATFORM', 'azure').lower()
    if platform == 'azure':
        return AzureMLAdapter()
    elif platform == 'sagemaker':
        return SageMakerAdapter()
    else:
        raise ValueError(f"Unknown ML_PLATFORM: {platform}")

# ── Unified CI script — platform selected by env var ─────────────────
if __name__ == '__main__':
    import sys
    adapter     = get_adapter()
    cutoff_date = sys.argv[1] if len(sys.argv) > 1 else '2026-03-28'

    job_name   = adapter.submit_training_job(cutoff_date)
    job_result = adapter.wait_for_job(job_name)

    if job_result.status != 'Completed':
        print(f"Training failed: {job_result.status}")
        sys.exit(1)

    champion   = adapter.get_champion_metrics('freshmart-delivery-time')
    promote    = job_result.val_mae <= champion['val_mae'] * 1.05

    print(f"Challenger: {job_result.val_mae:.4f}")
    print(f"Champion:   {champion['val_mae']:.4f}")
    print(f"Promote:    {promote}")

    if promote:
        version = adapter.register_model(job_result, 'freshmart-delivery-time')
        adapter.deploy_to_endpoint('freshmart-delivery-time', version,
                                    'freshmart-delivery-staging', 100)
    sys.exit(0 if promote else 2)   # exit 2 = no improvement, not a failure`} label="python" />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common ML CI/CD mistake — explained and fixed</h2>

        <ErrorBlock
          error="GitHub Actions workflow runs for 6 hours then times out — cloud training job stalls"
          cause="The wait_for_job script polls indefinitely and the cloud training job has stalled — not failed, not completed, just running forever. This happens when a training job OOMs without triggering a hard failure, when a spot instance is preempted and the replacement never starts, or when a dependency deadlock prevents the training script from making progress. GitHub Actions has a 6-hour default timeout — the workflow times out and the cloud job continues to accrue cost."
          fix="Set explicit timeouts at two levels: the GitHub Actions job (timeout-minutes: 120 in the job config) and inside the wait_for_job script (timeout_s parameter). When the CI timeout fires, add a cleanup step that cancels the cloud job: ml_client.jobs.cancel(job_name) or boto3 stop_training_job(). Use cloud-native job timeouts too: AML execution_timeout, SageMaker max_run. Log the job URL (Studio URL / SageMaker console URL) as a CI step output so the team can quickly navigate to the stuck job."
        />

        <ErrorBlock
          error="CI promotes a worse model — compare_models.py returns should_promote=True incorrectly"
          cause="The champion metrics are retrieved from a stale or wrong source. Common causes: the compare script reads champion metrics from a tag on the model registry entry but those tags were never set when the model was first registered, the model registry has no Production-stage model so the fallback champion_mae=999.0 always makes the challenger look better, or the metrics are in different units (MAE in minutes vs MAE in seconds causing a 60× difference)."
          fix="Store champion metrics explicitly when a model is promoted: add val_mae as a tag on the model registry entry during every promotion step in CI. Verify metrics are retrievable before the first real promotion: run python ci/compare_models.py locally with a known good champion. Add a sanity check to compare_models.py: if champion_mae < 1.0 or champion_mae > 100, raise ValueError('Champion MAE out of expected range — check units'). Log both metrics to Slack in every run so the team can visually verify the comparison."
        />

        <ErrorBlock
          error="Production deployment step runs before staging tests complete — race condition in GitHub Actions"
          cause="The needs: [staging-tests] declaration is missing or incorrect in the production-promote job. Without a proper needs dependency, GitHub Actions runs jobs in parallel by default. The production-promote job starts immediately after cloud-training if the needs chain is broken. A typo in the job name used in needs: is a common cause — GitHub Actions silently skips a needs dependency that references a non-existent job name."
          fix="Verify the job dependency chain: production-promote must have needs: [cloud-training, staging-tests] and staging-tests must have needs: cloud-training. Test the dependency graph with GitHub's workflow visualiser: open the workflow run and check the visual DAG showing job dependencies. Add defensive checks at the start of the production-promote job: verify that the staging endpoint is healthy and returning expected predictions before beginning the gradual traffic shift."
        />

        <ErrorBlock
          error="Retraining CI runs on every commit — team drowns in training jobs and cloud costs spike"
          cause="The workflow trigger is too broad — on: push: branches: [main] triggers a full retraining job on every code change, including documentation edits, README updates, and minor refactors. Each full retraining job runs for 30-90 minutes on cloud compute costing ₹50-500 per run. With 10 commits per day, this adds up to ₹500-5000/day in unnecessary training compute."
          fix="Separate training triggers from code change triggers. Code changes: use on: pull_request: paths: ['src/**', 'params.yaml'] and run only unit tests + a smoke test on 500-row sample (Stage 1 only — no cloud training). Full retraining: use on: schedule: + on: workflow_dispatch: + on: repository_dispatch: types: [drift-detected]. Add a cost guard: check that the last full training run was more than 12 hours ago before submitting a new cloud job."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>Section 12 and the full track — complete</span>
        <h2 style={S.h2}>
          The Cloud ML Platforms section and the entire AI/ML track are complete.
          Module 80 is your interview preparation — 50 complete ML answers.
        </h2>

        <p style={S.p}>
          You have covered 79 modules across ten sections: Math and Statistics,
          Python for ML, Classical ML, Deep Learning, NLP, Computer Vision,
          Generative AI, MLOps, and Cloud ML Platforms. Every concept connects
          to the next. Every module includes working code and real Indian company
          examples. Module 80 is the capstone — 50 complete answers to the most
          common ML engineering interview questions asked at DoorDash, Stripe,
          Amazon, Brex, and every other major Indian tech company.
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
              Next — Module 80 · Interview Prep
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              ML Interview Prep — 50 Complete Answers
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              The 50 most-asked ML engineering questions across DoorDash, Stripe,
              Amazon, Brex, and Indian tech — with complete, ready-to-deliver answers.
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
          'ML CI/CD has two orthogonal triggers: code changes (PR opened → unit tests + smoke test on 500 rows → block merge if any test fails) and data/schedule changes (weekly cron or drift alert → full cloud training → quality gate → staging deploy → production promote). Keep them separate — running full cloud training on every commit is wasteful and defeats the purpose of fast PR feedback.',
          'Four-stage pipeline with a gate at every stage: unit tests + smoke test (no cloud cost, fast feedback), cloud training + champion comparison (MAE within 5% tolerance), staging integration + load tests (p99 < 500ms, error rate < 1%), gradual production promotion (10% → 50% → 100% with auto-rollback). A model cannot reach production unless it passes all four gates.',
          'Store champion metrics explicitly when promoting a model — add val_mae as a tag on the registry entry. The compare_models.py script must retrieve the champion metric reliably. When no champion exists (first deployment), use a fallback of 999.0 to always promote. Log both metrics to Slack on every run so the team can visually sanity-check every comparison.',
          'Platform-agnostic adapter pattern: write a CloudMLAdapter abstract class with submit_training_job, wait_for_job, register_model, and deploy_to_endpoint methods. Implement AzureMLAdapter and SageMakerAdapter (and VertexAdapter). Select via ML_PLATFORM environment variable. The GitHub Actions workflow calls the interface — never the platform SDK directly. Migrating clouds means swapping one env var.',
          'GitHub Actions mechanics for ML: use outputs to pass data between jobs (job_name, challenger_mae, should_promote), needs: to enforce job order, if: conditions to skip stages when challengers fail, environment: with manual approval gates for production, and workflow_dispatch with inputs for manual retraining with custom parameters. Always set timeout-minutes on jobs that call cloud training APIs.',
          'Four common CI/CD failures: job stalls and times out without failing (set explicit timeouts at both CI and cloud job level, add cleanup step to cancel the cloud job), comparison logic promotes a worse model (store and retrieve champion metrics explicitly, add sanity range checks), race condition runs production before staging (verify needs: chain with GitHub workflow visualiser), training runs on every commit and costs spike (separate code-change CI from data-change retraining triggers).',
        ]}
      />
    </LearnLayout>
  )
}