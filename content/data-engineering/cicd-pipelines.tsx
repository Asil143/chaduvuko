import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'CI/CD for Data Pipelines — Testing, Deployment, and Environments | Chaduvuko',
  description:
    'CI/CD for data engineering — testing dbt models in CI, environment promotion, blue-green deployments, Airflow deployment patterns, slim CI, and building a safe deployment pipeline for data transformations.',
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{text}</div>
)
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18, fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{children}</h2>
)
const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 'clamp(16px,1.8vw,20px)', fontWeight: 700, letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12, fontFamily: 'var(--font-display)' }}>{children}</h3>
)
const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{children}</h4>
)
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)
const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const Output = ({ children }: { children: string }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ opacity: 0.6 }}>▸</span> output
    </div>
    <pre style={{ background: 'transparent', border: '1px dashed var(--border)', borderRadius: 10, padding: '14px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8, color: 'var(--muted)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>{children}</div>
)
const TryThis = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.25)', borderRadius: 10, padding: '16px 20px', marginBottom: 24, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
    <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.5 }}>⌨️</span>
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent2)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>Try this yourself</div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75 }}>{children}</div>
    </div>
  </div>
)

interface TableRow { [key: string]: string }
interface CompareTableProps { headers: { label: string; color?: string }[]; rows: TableRow[]; keys: string[] }
const CompareTable = ({ headers, rows, keys }: CompareTableProps) => (
  <div style={{ overflowX: 'auto', marginBottom: 28 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, lineHeight: 1.6 }}>
      <thead><tr>{headers.map((h, i) => (
        <th key={h.label} style={{ padding: '10px 16px', textAlign: 'left', fontSize: i === 0 ? 10 : 11, fontWeight: 700, letterSpacing: i === 0 ? '.12em' : '.06em', textTransform: 'uppercase', color: h.color ?? 'var(--muted)', fontFamily: 'var(--font-mono)', borderBottom: h.color ? `2px solid ${h.color}` : '1px solid var(--border)', background: h.color ? `${h.color}08` : 'var(--bg2)', minWidth: i === 0 ? 130 : 150 }}>{h.label}</th>
      ))}</tr></thead>
      <tbody>{rows.map((row, i) => (
        <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>{keys.map((k, ki) => (
          <td key={k} style={{ padding: '10px 16px', color: ki === 0 ? 'var(--muted)' : 'var(--text)', fontSize: ki === 0 ? 11 : 13, fontFamily: ki === 0 ? 'var(--font-mono)' : 'inherit', fontWeight: ki === 0 ? 700 : 400, textTransform: ki === 0 ? 'uppercase' : 'none', letterSpacing: ki === 0 ? '.06em' : 'normal', borderBottom: '1px solid var(--border)', borderLeft: ki > 0 && headers[ki]?.color ? `2px solid ${headers[ki].color}40` : ki > 0 ? '1px solid var(--border)' : 'none', verticalAlign: 'top' }}>{row[k]}</td>
        ))}</tr>
      ))}</tbody>
    </table>
  </div>
)

export default function CICDPipelinesModule() {
  return (
    <LearnLayout
      title="CI/CD for Data Pipelines"
      description="Testing dbt models in CI, environment promotion, blue-green deployments, Airflow deployment patterns, slim CI, and building a safe deployment pipeline for data transformations."
      section="Data Engineering — Module 44"
      readTime="70 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 — Why Data Pipelines Need CI/CD ───────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — Why Data Pipelines Need CI/CD" />
        <SectionTitle>CI/CD for Data — Why Deploying a dbt Model Is Not Like Pushing Code</SectionTitle>

        <Para>
          Software CI/CD is well-understood: commit code, run unit tests, deploy
          to staging, run integration tests, deploy to production. Data pipeline
          CI/CD shares this structure but has unique challenges. A dbt model
          change does not just change code — it changes the data in a production
          table that analysts are querying right now.
        </Para>

        <Para>
          A software bug surfaces as an error page users see and report. A data
          bug surfaces as a wrong number that looks correct until someone
          notices it doesn&rsquo;t match expectations — often days later. This module
          builds FreshCart&rsquo;s dbt and Airflow CI/CD pipeline around that asymmetry.
        </Para>

        <HighlightBox>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
            What CI/CD must catch before a data deployment reaches production
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { check: 'SQL syntax errors', color: '#ff4757', desc: 'A typo in a dbt model fails silently if not compiled in CI. The pipeline fails at runtime instead of at review.' },
              { check: 'Schema breaking changes', color: '#f97316', desc: 'Removing or renaming a column that downstream models or BI tools depend on. Must detect all consumers before deploy.' },
              { check: 'Test regressions', color: '#facc15', desc: 'A new model passes locally but fails not_null or unique tests against production data volumes. CI runs tests against real data.' },
              { check: 'Logic errors in aggregations', color: '#7b61ff', desc: 'A wrong GROUP BY or a missing filter produces subtly wrong totals that pass tests but report wrong numbers.' },
              { check: 'Environment drift', color: '#4285f4', desc: 'Code that works in dev fails in prod because of different Snowflake roles, schemas, or data volumes.' },
              { check: 'Contract violations', color: '#00e676', desc: 'A source schema change that breaks Bronze staging models. Detected by CI running against latest Bronze.' },
            ].map((item) => (
              <div key={item.check} style={{ background: 'var(--bg2)', border: `1px solid ${item.color}25`, borderLeft: `3px solid ${item.color}`, borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 4 }}>{item.check}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <TryThis>
          Think of the last time you (or a teammate) pushed a schema change.
          Was there anything automated that would have caught a renamed column
          before it reached a dashboard? If the honest answer is &ldquo;no,&rdquo; that&rsquo;s
          exactly the gap this module&rsquo;s Real World section walks through.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 02 — Environments ────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Environments" />
        <SectionTitle>Environment Strategy — Dev, Staging, and Production</SectionTitle>

        <Para>
          A data platform needs at least dev and production, and ideally a
          staging/CI environment that mirrors production data. Each environment
          serves a specific purpose, and configuration must ensure code flows
          one direction: dev → staging → prod.
        </Para>

        <CodeBox label="Three environments, what each is for">{`DEV — individual developer sandbox
  Data: subset of production (last 7 days). Schema: dev_{developer_name}
  Isolation: complete — dev changes cannot affect staging or prod
  Lifespan: created on branch checkout, deleted after merge

STAGING / CI — automated testing environment
  Data: clone of production (Zero-Copy Clone). Schema: ci_{PR_number}
  Isolation: each PR gets its own schema
  Lifespan: created on PR open, deleted after PR merge

PRODUCTION — serves real analysts and BI tools
  Data: full production data, updated by live pipelines
  Access: pipeline service accounts write; analysts read-only
  Lifespan: permanent`}</CodeBox>

        <SubSubTitle>dbt profiles.yml — one file, three targets</SubSubTitle>

        <CodeBox label="profiles.yml — dev, ci, and prod targets">{`freshcart:
  target: dev

  outputs:
    dev:
      type: snowflake
      account: freshcart.snowflake.com
      user: "{{ env_var('SNOWFLAKE_USER') }}"
      role: analyst_role
      database: freshcart_dev
      schema: "dev_{{ env_var('DBT_DEV_SCHEMA', 'default') }}"

    ci:
      type: snowflake
      role: ci_service_role
      database: freshcart_ci
      schema: "ci_{{ env_var('PR_NUMBER', 'manual') }}"   # ci_142, ci_143, ...

    prod:
      type: snowflake
      role: pipeline_role
      database: freshcart_prod
      schema: silver   # or gold, depending on the model group`}</CodeBox>

        <SubSubTitle>Snowflake Zero-Copy Clone — production-like staging at near-zero cost</SubSubTitle>

        <Para>
          Cloning 10 TB of production data for every PR would be expensive and
          slow. Snowflake&rsquo;s Zero-Copy Clone creates an instant snapshot that
          shares data pages with the source until rows are modified.
        </Para>

        <CodeBox label="Creating and tearing down an isolated CI database per PR">{`def create_ci_environment(pr_number: int) -> str:
    ci_db = f'freshcart_ci_pr_{pr_number}'
    snowflake_conn.execute(f"""
        CREATE OR REPLACE DATABASE {ci_db}
        CLONE freshcart_prod
        DATA_RETENTION_TIME_IN_DAYS = 1
    """)
    return ci_db

def teardown_ci_environment(pr_number: int) -> None:
    snowflake_conn.execute(f'DROP DATABASE IF EXISTS freshcart_ci_pr_{pr_number}')

# In the CI pipeline: create on PR open → dbt test --target ci → teardown on PR close`}</CodeBox>

        <Output>{`$ python -c "from scripts.ci import create_ci_environment; create_ci_environment(142)"
Creating database freshcart_ci_pr_142 as a clone of freshcart_prod...
Done in 2.1s.  Storage cost: $0.00 (shared pages with freshcart_prod)`}</Output>
      </section>

      <Divider />

      {/* ── Part 03 — dbt CI Pipeline ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — dbt CI Pipeline" />
        <SectionTitle>dbt CI — What to Run on Every Pull Request</SectionTitle>

        <Para>
          A dbt CI pipeline runs on every pull request before merge. The key
          challenge is speed — a 45-minute CI run tempts developers to merge
          without waiting. The answer is slim CI: only test models that were
          changed, or depend on changed models.
        </Para>

        <SubSubTitle>The workflow shell — trigger, environment, and setup</SubSubTitle>

        <CodeBox label=".github/workflows/dbt_ci.yml — top half">{`name: dbt CI
on:
  pull_request:
    branches: [main]
    paths: ['dbt/**']

jobs:
  dbt-ci:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    env:
      CI_SNOWFLAKE_USER: \${{ secrets.CI_SNOWFLAKE_USER }}
      CI_SNOWFLAKE_PASSWORD: \${{ secrets.CI_SNOWFLAKE_PASSWORD }}
      PR_NUMBER: \${{ github.event.pull_request.number }}
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }   # needed for dbt --select state:modified
      - uses: actions/setup-python@v5
        with: { python-version: '3.11', cache: pip }
      - run: pip install dbt-snowflake==1.8.0 dbt-utils
      - name: Create CI database (Zero-Copy Clone)
        run: python scripts/ci/create_ci_db.py --pr \${{ github.event.pull_request.number }}
      - run: dbt deps
        working-directory: dbt`}</CodeBox>

        <SubSubTitle>The checks that actually catch problems</SubSubTitle>

        <CodeBox label=".github/workflows/dbt_ci.yml — bottom half">{`      - name: dbt compile (catch SQL syntax errors)
        working-directory: dbt
        run: dbt compile --target ci

      - name: dbt run — SLIM CI (only changed models + downstream)
        working-directory: dbt
        run: dbt run --target ci --select state:modified+ --defer --state ./prod_artifacts

      - name: dbt test — tests for changed models + downstream
        working-directory: dbt
        run: dbt test --target ci --select state:modified+ --defer --state ./prod_artifacts --store-failures

      - name: Check for breaking schema changes
        run: python scripts/ci/check_schema_changes.py --pr \${{ github.event.pull_request.number }}

      - name: Teardown CI database
        if: always()
        run: python scripts/ci/teardown_ci_db.py --pr \${{ github.event.pull_request.number }}`}</CodeBox>

        <Output>{`✓ dbt compile        12s
✓ dbt run (4 models) 48s   ← slim CI: 4 of 150 models
✓ dbt test (4 models) 22s
✓ schema change check 3s   — no breaking changes detected
✓ teardown             4s
Total: 1m 29s`}</Output>

        <SubSubTitle>Slim CI — how state:modified+ and --defer actually work together</SubSubTitle>

        <Para>
          State-based selection compares the PR&rsquo;s manifest to a reference
          manifest from the last production run. Only changed models — plus
          their dependents — are selected.
        </Para>

        <CodeBox label="What state:modified+ actually selects, for a one-model change">{`PR changes: silver.orders

state:modified+  selects:
  silver.orders          ← changed directly
  gold.daily_revenue     ← downstream of silver.orders
  gold.customer_ltv      ← downstream of silver.orders
  gold.fct_orders_wide   ← downstream of silver.orders
Skips: silver.customers, silver.payments, and all unrelated gold models.
Runs 4 models instead of 150. CI time: ~1 min instead of 45 min.`}</CodeBox>

        <Para>
          The remaining problem: <code>silver.orders</code> reads from{' '}
          <code>bronze.orders</code>, which isn&rsquo;t part of this run&rsquo;s selection and
          doesn&rsquo;t exist in the CI schema. <code>--defer</code> tells dbt to read
          unselected upstream models from production instead of failing.
        </Para>

        <CodeBox label="Without --defer vs with it">{`# Without --defer:
#   silver.orders → tries freshcart_ci_pr_142.bronze.orders → NOT FOUND → error

# With --defer --state ./prod_artifacts:
#   silver.orders → reads freshcart_prod.bronze.orders → works

# prod_artifacts/manifest.json is the reference — kept current in S3:
aws s3 cp s3://freshcart-ci-artifacts/dbt/manifest.json ./prod_artifacts/   # at CI start
aws s3 cp ./target/manifest.json s3://freshcart-ci-artifacts/dbt/          # after every prod deploy`}</CodeBox>

        <SubSubTitle>Detecting breaking schema changes automatically</SubSubTitle>

        <CodeBox label="scripts/ci/check_schema_changes.py">{`def detect_breaking_changes(current_manifest: dict, prod_manifest: dict) -> list[str]:
    breaking = []
    for node_id, node in prod_manifest['nodes'].items():
        if node_id not in current_manifest['nodes']:
            breaking.append(f"Model removed: {node['name']}")
            continue
        prod_cols = {c: v['data_type'] for c, v in node.get('columns', {}).items()}
        current_cols = {c: v['data_type'] for c, v in current_manifest['nodes'][node_id].get('columns', {}).items()}
        for col, dtype in prod_cols.items():
            if col not in current_cols:
                breaking.append(f"{node['name']}.{col} removed")
            elif current_cols[col] != dtype:
                breaking.append(f"{node['name']}.{col}: {dtype} → {current_cols[col]}")
    return breaking`}</CodeBox>

        <Output>{`BREAKING SCHEMA CHANGES DETECTED:
  - gold.daily_revenue.net_revenue removed
If this is intentional, update all downstream consumers first.`}</Output>
      </section>

      <Divider />

      {/* ── Part 04 — Production Deployment ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Production Deployment" />
        <SectionTitle>Deploying to Production — Safe Deployment Patterns for dbt</SectionTitle>

        <Para>
          A full dbt run on production tables that takes 3 hours cannot be
          rolled back instantly if a bug is found 2 hours in. Safe deployment
          patterns reduce blast radius and enable fast recovery.
        </Para>

        <SubSubTitle>Strategy 1 — direct deployment, for most changes</SubSubTitle>

        <CodeBox label=".github/workflows — deploy on merge to main">{`on:
  push:
    branches: [main]

jobs:
  deploy:
    steps:
      - uses: actions/checkout@v4
      - run: |
          dbt deps
          dbt run --target prod
          dbt test --target prod
      - run: aws s3 cp ./target/manifest.json s3://freshcart-ci-artifacts/dbt/`}</CodeBox>

        <SubSubTitle>Strategy 2 — blue-green, for high-risk Gold changes</SubSubTitle>

        <CodeBox label="Build in a shadow schema, validate, then atomically swap">{`def blue_green_deploy_gold_model(model_name: str, run_date: str):
    # Step 1: build in a shadow schema — not live to analysts yet
    subprocess.run(['dbt', 'run', '--target', 'prod', '--select', model_name,
        '--vars', json.dumps({'run_date': run_date, 'target_schema': 'gold_shadow'})], check=True)

    # Step 2: test the shadow schema before anyone sees it
    subprocess.run(['dbt', 'test', '--target', 'prod', '--select', model_name,
        '--vars', json.dumps({'target_schema': 'gold_shadow'})], check=True)

    # Step 3: atomic swap — analysts see the new version immediately
    conn.execute("BEGIN;")
    conn.execute("ALTER SCHEMA freshcart_prod.gold RENAME TO freshcart_prod.gold_old_20260317;")
    conn.execute("ALTER SCHEMA freshcart_prod.gold_shadow RENAME TO freshcart_prod.gold;")
    conn.execute("COMMIT;")   # both renames atomic — never a window with no 'gold' schema

    # Step 4: keep the old schema for 24h, then drop it
    schedule_schema_drop('gold_old_20260317', delay_hours=24)`}</CodeBox>

        <SubSubTitle>Strategy 3 — incremental deployment, for schema migrations on huge tables</SubSubTitle>

        <CodeBox label="Add nullable → backfill separately → add the constraint last">{`-- Step 1: add the column as nullable (this dbt run) — analysts see NULL, no breakage
-- Step 2: backfill as a SEPARATE job, so it doesn't lock the table for 3 hours
UPDATE silver.orders SET tip_amount = 0.0
WHERE tip_amount IS NULL AND created_at < '2026-03-17';   -- rows before the feature launch
-- Step 3: only once backfill is complete, add not_null to schema.yml`}</CodeBox>

        <Callout type="tip">
          dbt has no native rollback command. Pick the mechanism to match the
          failure: a logic error → <code>git revert</code> and redeploy; a large
          data corruption → Delta Lake&rsquo;s <code>RESTORE TABLE ... TO VERSION AS OF</code>;
          a bad Gold deploy that used blue-green → swap the schema back.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 05 — Airflow Deployment ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Airflow Deployment" />
        <SectionTitle>Airflow Deployment — DAG Versioning and Safe Updates</SectionTitle>

        <Para>
          A DAG change takes effect the next time the scheduler parses it —
          typically within 30 seconds. If it modifies a DAG that&rsquo;s currently
          running, the in-progress run may behave unexpectedly.
        </Para>

        <SubSubTitle>Git Sync — the common path, and its real risk</SubSubTitle>

        <CodeBox label="Push to main → live in Airflow within a minute">{`# Used by Cloud Composer, MWAA, Astronomer:
# push to main → CI passes → Git Sync detects the change → scheduler re-parses → live

# RISK: no staging step for Airflow DAGs.
#   A syntax error makes the DAG disappear from the UI entirely.
#   A schedule change takes effect immediately — possibly mid-run.

# MITIGATION:
#   python -m py_compile dags/*.py    — catch syntax errors before merge
#   airflow dags list-import-errors   — catch import errors before merge
#   pause the DAG for genuinely risky changes: pause → deploy → verify → unpause`}</CodeBox>

        <SubSubTitle>Versioning the DAG ID for breaking schedule or structure changes</SubSubTitle>

        <CodeBox label="Don't mutate a running DAG's schedule — version it instead">{`# RISKY: modifying the existing DAG's schedule mid-stream
# DAG('freshcart_morning_pipeline', schedule='0 2 * * *', ...) → schedule='0 6 * * *'
# a run already in progress sees the new schedule on its next evaluation

# SAFER: version the DAG ID
DAG('freshcart_morning_pipeline_v2', schedule='0 6 * * *', ...)
# v1 finishes its current cycle undisturbed; v2 starts fresh on the new schedule
# once v1 has no more in-progress runs, delete it`}</CodeBox>

        <SubSubTitle>CI checks for DAG files, and the unit tests that catch structural bugs</SubSubTitle>

        <CodeBox label=".github/workflows/airflow_ci.yml — the checks that matter">{`- run: flake8 dags/ --max-line-length=120
- run: |
    for f in dags/*.py; do python -m py_compile "$f" && echo "OK: $f"; done
- run: airflow db init && airflow dags list-import-errors
- run: python scripts/ci/validate_dag_structure.py   # unique task IDs, no cycles, start/end present
- run: pytest tests/dags/ -v`}</CodeBox>

        <CodeBox label="tests/dags/test_freshcart_pipeline.py — structural assertions">{`from airflow.models import DagBag

def test_freshcart_pipeline_dag_structure():
    dagbag = DagBag(dag_folder='dags/', include_examples=False)
    dag = dagbag.get_dag('freshcart_morning_pipeline')
    assert dag is not None, "DAG not found"
    assert len(dagbag.import_errors) == 0, f"Import errors: {dagbag.import_errors}"
    task_ids = [t.task_id for t in dag.tasks]
    assert 'dbt_silver' in task_ids and 'dbt_gold' in task_ids

def test_freshcart_pipeline_task_order():
    dag = DagBag(dag_folder='dags/').get_dag('freshcart_morning_pipeline')
    silver, gold = dag.get_task('dbt_silver'), dag.get_task('dbt_gold')
    assert gold.task_id in [t.task_id for t in silver.downstream_list]

def test_schedule_is_set():
    dag = DagBag(dag_folder='dags/').get_dag('freshcart_morning_pipeline')
    assert dag.schedule_interval is not None
    assert dag.catchup is False, "catchup must be False in production DAGs"`}</CodeBox>

        <Output>{`$ pytest tests/dags/ -v
test_freshcart_pipeline_dag_structure PASSED
test_freshcart_pipeline_task_order PASSED
test_schedule_is_set PASSED
========================== 3 passed in 0.41s ===========================`}</Output>
      </section>

      <Divider />

      {/* ── Part 06 — Pipeline Testing ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Testing Data Pipelines" />
        <SectionTitle>Testing Strategies for Data Pipelines — Unit, Integration, and E2E</SectionTitle>

        <Para>
          The testing pyramid for data pipelines is inverted compared to
          software: integration and end-to-end tests provide more value than
          unit tests, because most bugs live at the boundary between SQL and
          data, not in pure logic.
        </Para>

        <CodeBox label="The inverted pyramid">{`End-to-end   (full pipeline, prod-like data, validated outputs)   ← most valuable, slowest
Integration  (dbt tests against real data volumes)                 ← good coverage, medium speed
Unit         (pure Python — validators, hash key generators)       ← least valuable alone, fastest

Do NOT try to unit-test SQL by mocking the database — that doesn't work.`}</CodeBox>

        <SubSubTitle>Unit tests — for the Python logic, not the SQL</SubSubTitle>

        <CodeBox label="tests/unit/test_validation.py">{`from pipeline.validate import validate_order_row

def test_valid_order_passes():
    row = {'order_id': 9284751, 'customer_id': 4201938, 'order_amount': 380.00, 'status': 'delivered'}
    result = validate_order_row(row)
    assert result.is_valid, f"Expected valid, got: {result.error}"

def test_negative_amount_rejected():
    row = {'order_id': 1, 'customer_id': 1, 'order_amount': -10, 'status': 'placed'}
    result = validate_order_row(row)
    assert not result.is_valid and result.error_type == 'negative_amount'

def test_hash_key_is_deterministic():
    from pipeline.vault import compute_hub_hk
    assert compute_hub_hk('4201938') == compute_hub_hk('4201938')
    assert compute_hub_hk('ST001') == compute_hub_hk(' st001 ')   # normalised before hashing`}</CodeBox>

        <SubSubTitle>Integration tests — dbt tests against real production data volumes</SubSubTitle>

        <Para>
          Run in CI against the Zero-Copy Clone. This is where most real bugs
          get caught: a <code>not_null</code> test that passes on 1,000 dev rows can
          fail on 50 million production rows with edge cases dev never had.
        </Para>

        <Output>{`$ dbt test --target ci --select state:modified+
FAIL not_null_silver_orders_customer_id (12 rows)
# passed locally on a 1,000-row dev sample — these 12 nulls only exist in production`}</Output>

        <SubSubTitle>End-to-end tests — the whole pipeline, validated against business invariants</SubSubTitle>

        <CodeBox label="tests/e2e/test_morning_pipeline.py">{`def test_morning_pipeline_e2e(snowflake_conn, dbt_runner):
    test_date = date.today() - timedelta(days=1)
    result = dbt_runner.run(select='staging.* silver.* gold.*', vars={'run_date': str(test_date)}, target='ci')
    assert result.success, f"Pipeline failed: {result.errors}"

    rows = snowflake_conn.execute(
        f"SELECT COUNT(*) FROM ci_pr_142.gold.daily_revenue WHERE order_date = '{test_date}'").scalar()
    assert 40_000 < rows < 100_000, f"Unexpected row count: {rows}"

    negative_revenue = snowflake_conn.execute(
        f"SELECT COUNT(*) FROM ci_pr_142.gold.daily_revenue WHERE net_revenue < 0").scalar()
    assert negative_revenue == 0

    # Bronze = Silver + DLQ — every extracted row is accounted for somewhere
    bronze = snowflake_conn.execute(f"SELECT COUNT(*) FROM ci_pr_142.bronze.orders WHERE _bronze_date = '{test_date}'").scalar()
    silver = snowflake_conn.execute(f"SELECT COUNT(*) FROM ci_pr_142.silver.orders WHERE DATE(created_at) = '{test_date}'").scalar()
    dlq = snowflake_conn.execute(f"SELECT COUNT(*) FROM ci_pr_142.pipeline.dead_letter_queue WHERE run_date = '{test_date}'").scalar()
    assert bronze == silver + dlq, f"Row count mismatch: {bronze} bronze != {silver} silver + {dlq} dlq"`}</CodeBox>

        <Output>{`$ pytest tests/e2e/test_morning_pipeline.py -v
test_morning_pipeline_e2e PASSED
# bronze=48234, silver=48222, dlq=12 → 48234 == 48222 + 12 ✓`}</Output>
      </section>

      <Divider />

      {/* ── Part 07 — Complete CI/CD Flow ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — The Complete CI/CD Flow" />
        <SectionTitle>The Complete CI/CD Flow — From Commit to Production</SectionTitle>

        <CompareTable
          headers={[
            { label: 'Stage' },
            { label: 'Trigger', color: '#4285f4' },
            { label: 'What runs', color: '#00e676' },
            { label: 'Blocks merge?', color: '#f97316' },
            { label: 'Time', color: '#7b61ff' },
          ]}
          keys={['stage', 'trigger', 'what', 'blocks', 'time']}
          rows={[
            { stage: 'Pre-commit', trigger: 'git commit (local hook)', what: 'sqlfluff lint, black format check, py_compile DAG files', blocks: 'No (local only)', time: '< 5s' },
            { stage: 'PR opened', trigger: 'pull_request event', what: 'Create Zero-Copy Clone CI DB, dbt deps, compile', blocks: 'Yes if compile fails', time: '2 min' },
            { stage: 'PR CI tests', trigger: 'pull_request (push)', what: 'dbt run state:modified+ --defer, dbt test state:modified+, schema change detection, DAG unit tests', blocks: 'Yes if tests fail', time: '4-8 min' },
            { stage: 'PR review', trigger: 'Human approval', what: 'Code review, data contract check, downstream impact review', blocks: 'Yes (1 approval required)', time: 'Human' },
            { stage: 'Merge to main', trigger: 'PR merged', what: 'Production dbt run, dbt test --target prod, update prod artifacts in S3, teardown CI DB', blocks: 'Auto-merge blocked if CI fails', time: '10-30 min' },
            { stage: 'Post-deploy', trigger: 'Successful prod run', what: 'Notify Slack #deploys, run post-deploy smoke tests, update monitoring dashboard', blocks: 'No', time: '2 min' },
          ]}
        />

        <Callout type="tip">
          Target under 45 minutes from commit to production. Slim CI keeps the
          test stage under 10 minutes for a typical PR, and production
          deployment stays proportional to the size of the change, not the
          size of the entire dbt project.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 — Misconceptions ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Part 08 — Misconceptions" />
        <SectionTitle>Five Misconceptions About Data CI/CD</SectionTitle>

        {[
          {
            wrong: '"If dbt compiles and the tests pass, the PR is safe to merge"',
            right: 'This module\'s Real World incident is exactly a PR where compile succeeded and every dbt test passed — the column rename simply had no test written against it, because not_null and unique don\'t know a column was renamed out from under three dashboards. Passing tests prove the tests you wrote weren\'t violated, not that nothing broke.',
          },
          {
            wrong: '"Slim CI (state:modified+) is just a speed optimization — it doesn\'t change what gets tested"',
            right: 'It changes coverage in a way worth being deliberate about: Part 03\'s example only tests the 4 models actually affected by a change, which is correct and fast, but it also means a stale prod_artifacts manifest (this module\'s Error Library) silently causes either far too little or far too much to run — slim CI is only as trustworthy as the reference state it diffs against.',
          },
          {
            wrong: '"A blue-green schema swap is basically instant, so it doesn\'t need the same care as a slow migration"',
            right: 'This module\'s Error Library documents exactly the failure: an unwrapped two-step rename where the connection drops between the two ALTER statements leaves production with no gold schema at all for 5 minutes. "Fast" and "atomic" are different properties — Part 04\'s BEGIN/COMMIT wrapping is what actually makes the swap atomic.',
          },
          {
            wrong: '"Renaming a column is a simple, low-risk change since the data itself doesn\'t change"',
            right: 'The data staying identical is exactly why it\'s dangerous — nothing about the VALUES looks wrong, so no anomaly detection or data-quality check fires. Only a check that specifically watches for renamed/removed columns (Part 03\'s schema change detection) catches it, which is why this module treats it as its own distinct category of risk, not a subset of "SQL changed."',
          },
          {
            wrong: '"Testing an incremental model in CI is equivalent to testing it in production"',
            right: 'This module\'s Error Library has the exact gap: CI ran in incremental mode and only validated today\'s new rows (which had the new column populated), while 400 million existing production rows had NULL for it — the not_null test passed in CI and failed on the real deploy. A schema addition to an incremental model needs a --full-refresh test pass, not an incremental one.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
              ✕ &quot;{item.wrong}&quot;
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 09 — Real World ──────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 09 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Schema Change That Broke Three Dashboards — And How CI Would Have Prevented It</SectionTitle>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Scenario — FreshCart · A column rename breaks production dashboards
          </div>

          <Para>
            A data engineer renames <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>net_revenue</code> to{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>revenue_after_discount</code> in{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>gold.daily_revenue</code> for clarity. No dbt
            tests fail. The PR merges. Three Metabase dashboards querying{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>net_revenue</code> directly break
            immediately. Finance notices at 09:00.
          </Para>

          <CodeBox label="What CI saw, and what it didn't">{`✓ SQL compiled successfully
✓ dbt tests passed (not_null, unique on order_date, store_id)
✗ No check that net_revenue was removed
✗ No check that Metabase uses net_revenue
✗ No breakage visible until the prod deploy already happened

Detection: 45 min (analyst reports broken dashboard). Fix: 20 min (alias added, redeployed).
Total impact: 1h 5min of broken Finance dashboards in the morning.`}</CodeBox>

          <SubSubTitle>Fix 1 — schema change detection on every PR</SubSubTitle>

          <CodeBox label="scripts/ci/check_schema_changes.py, wired into every PR">{`def check_for_breaking_column_changes():
    prod = load_manifest('./prod_artifacts/manifest.json')
    current = load_manifest('./target/manifest.json')
    changes = detect_breaking_changes(prod['nodes'], current['nodes'])
    if changes:
        print("BREAKING SCHEMA CHANGES DETECTED:")
        for c in changes:
            print(f"  - {c}")
        print("If this is intentional, update all downstream consumers first.")
        sys.exit(1)`}</CodeBox>

          <SubSubTitle>Fix 2 — the backward-compatible migration pattern, going forward</SubSubTitle>

          <CodeBox label="Add the new name, keep the old one, remove it later — same as API deprecation">{`-- This PR: both columns exist, nothing breaks
order_amount - discount_amount AS revenue_after_discount,
order_amount - discount_amount AS net_revenue,  -- backward-compat alias

-- Next PR, after all dashboards have migrated: remove the net_revenue alias`}</CodeBox>

          <Output>{`Next time a Gold column is renamed:
CI fails with: "BREAKING SCHEMA CHANGES: net_revenue removed"
Developer sees: ["Metabase: Daily Revenue dashboard", "CFO Report export"]
Cannot merge until consumers are updated or the PR adds a backward-compat alias.
Zero production breakages from schema changes since.`}</Output>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Interview Prep ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. How do you implement CI/CD for a dbt project? What runs on every pull request?',
            a: `CI/CD for a dbt project runs a sequence of automated checks on every pull request before merge, and then deploys to production automatically after merge.

On every pull request, the CI pipeline runs four things. First, dbt compile catches SQL syntax errors, missing references, and configuration problems. A model that references a non-existent source or uses incorrect Jinja syntax fails compilation. This catches the most basic errors before any data is processed.

Second, slim CI runs dbt models and tests only for changed models and their downstream dependents. Using dbt run --select state:modified+ --defer --state ./prod_artifacts, the CI only processes the subset of models that were affected by the PR. The --defer flag instructs dbt to use production data for any upstream models that were not changed — so a change to silver.orders uses production bronze.orders data. This keeps CI runs at 4-8 minutes instead of 45+ minutes.

Third, schema change detection compares the PR's compiled manifest against the production manifest. If any Gold column was removed or renamed, the CI fails with a list of downstream consumers that would break. This prevents accidental breaking changes from reaching production.

Fourth, DAG unit tests run for any changed Airflow DAG files, checking for import errors, syntax issues, and structural assertions.

After merge, the production deployment runs dbt with full test coverage and updates the production manifest in artifact storage for the next CI run's --state reference.

The infrastructure relies on Zero-Copy Cloning for Snowflake or dataset copies for BigQuery to give CI access to production-like data without the cost of a full copy. Each PR gets its own isolated schema and the CI environment is torn down after the tests complete.`,
          },
          {
            q: 'Q2. What is slim CI in dbt and why does it matter?',
            a: `Slim CI is a dbt CI pattern that runs only the models changed in a pull request and their downstream dependents, rather than the full project. It is implemented using two dbt features: state-based selection and the defer flag.

State-based selection uses --select state:modified+ to compare the current code to a reference state (the production manifest). Only models whose SQL or configuration changed are selected, plus their downstream dependents. In a project with 150 models, a PR that changes one Silver model might select 5-8 models: the changed model and the Gold models that depend on it. The remaining 140+ models are skipped entirely.

The defer flag tells dbt to use production data for any upstream models not included in the CI run. If the CI run includes silver.orders but not bronze.orders (which silver.orders reads from), --defer instructs dbt to read from production's bronze.orders rather than failing because bronze.orders does not exist in the CI schema. This makes slim CI possible — you only build and test the changed subset while still using real production data for inputs.

The performance difference is dramatic. A full project run in CI might take 45 minutes and cost significant warehouse compute for every PR. Slim CI runs the same test coverage for the changed models in 4-8 minutes. This makes CI fast enough that developers actually wait for it rather than being tempted to merge before it finishes.

The prod_artifacts directory contains the manifest.json from the last successful production run. This must be kept current — typically stored in S3 and downloaded at CI start, then updated at the end of every successful production deployment. If the prod artifacts are stale, state:modified+ selection may miss recently deployed changes.`,
          },
          {
            q: 'Q3. How do you safely deploy a breaking schema change to a Gold model that has active consumers?',
            a: `A breaking schema change to a Gold model — removing a column, renaming a column, changing a column type — can break downstream dashboards, APIs, and downstream pipelines. The safe deployment approach is a phased migration that keeps the old interface alive long enough for all consumers to migrate.

The first phase is additive: deploy the new column alongside the old one. For a column rename from net_revenue to revenue_after_discount, the dbt model returns both: revenue_after_discount as the new canonical name and net_revenue as a backward-compatible alias for the same computed value. This deploy causes no breakage — all existing consumers still work because net_revenue still exists.

The second phase is consumer migration: notify all teams and tools that consume net_revenue that they have a migration window to switch to revenue_after_discount. This typically takes one to two weeks. The DataHub catalog or lineage graph shows the full list of consumers. Each consumer team updates their dashboards, queries, or pipeline to use the new column name.

The third phase is removal: once all consumers have migrated, open a new PR that removes the net_revenue alias. The schema change detection in CI will confirm that no active consumers depend on net_revenue before the PR can merge.

This mirrors the API versioning approach used in software — you never remove a public interface without a deprecation period. The intermediate state where both names exist is the deprecation period. It adds one deployment cycle but prevents the 09:00 "three dashboards are broken" incident.

For type changes (expanding a VARCHAR, changing DECIMAL precision): these are generally safe and can be deployed directly. For narrowing type changes (reducing precision, changing from a wider to a narrower type): treat these as breaking changes and follow the same phased approach.`,
          },
          {
            q: 'Q4. How do you test Airflow DAGs in CI without running the actual tasks?',
            a: `Airflow DAG testing in CI focuses on structural and static validation rather than running the actual pipeline tasks, which would require access to source systems and execute real computations.

The first test is compilation and import validation. Python files in the dags/ directory are compiled with py_compile to catch syntax errors. Then the DagBag class loads all DAG files, which exercises the import of all dependencies and catches missing packages, incorrect imports, and Jinja template errors. Any import errors mean the DAG will not appear in the Airflow UI, which is a production failure. This check runs in seconds and catches the most common deployment errors.

The second test is structural assertion using DagBag. Load each DAG and assert properties about its structure: the expected task IDs exist, required tasks like start and end are present, task dependencies are in the correct order, the schedule is not None, and catchup is False for production DAGs. These tests run against the DAG Python code without executing any tasks or connecting to any external systems.

The third test is configuration validation: assert that all connections and variables referenced in the DAG exist in the CI Airflow environment's connections table. A DAG that references a Snowflake connection that does not exist will fail at runtime, not at parse time — this test surfaces that problem in CI.

For pipelines that have critical business logic in the Python callables rather than in dbt SQL, unit tests for those callable functions are written separately. The Airflow test validates the graph structure; the function tests validate the logic inside the task callables.

The fourth check is a linter for DAG-specific patterns: verify that no DAG uses a Variable.get() call at the top level of the DAG file (which runs at parse time and causes slow parses), no DAG imports heavy libraries at module level, and all SLA callbacks reference valid functions.`,
          },
          {
            q: 'Q5. A junior data engineer asks why they cannot push directly to main and must go through a PR with CI. How would you explain it?',
            a: `The answer comes down to the asymmetric consequences of data bugs compared to software bugs. A software bug surfaces as an error message, a failed request, or a visible application malfunction — users see it immediately and report it. The system knows it is broken. A data bug looks like normal data — a table updates successfully, a dashboard shows numbers, everything appears to work — but the numbers are wrong. Analysts use the wrong numbers, managers make decisions based on them, and nobody knows there is a problem until someone notices that the revenue figure does not match the payment system.

The time between a data bug being introduced and someone discovering it is typically hours to days. During that time, wrong numbers have been queried, exported to spreadsheets, used in business decisions, and potentially included in external reports. A software deployment that has an error is redeployable in minutes. A data deployment that published wrong numbers for three days requires a post-mortem explaining which decisions were made on wrong data.

This asymmetry means the cost of prevention is much lower than the cost of discovery. A PR with CI takes 5-10 minutes. The schema change detection that caught the net_revenue rename before it broke Finance dashboards took 3 seconds. The dbt test that caught 48,234 records with an invalid status value took 30 seconds. These checks run automatically and silently on every change.

The mandatory PR process also creates a review step where a second engineer can catch logic errors that automated tests cannot: a wrong GROUP BY, a missing filter that inflates a metric, or a business rule applied incorrectly. Tests catch many bugs but not all. Human review of SQL before it reaches production catches the remaining class of bugs that tests miss.

The goal is not process for its own sake — it is making the data platform trustworthy. Analysts who can trust the data make better decisions faster. Analysts who have been burned by wrong data check every number against three other sources before using it, which defeats the purpose of the data platform. The PR and CI process is the investment in trust.`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes Beginners Make Constantly</SectionTitle>

        {[
          {
            q: 'Trusting dbt tests alone to catch schema-shape changes like column renames',
            a: 'not_null and unique tests check VALUES, not column NAMES — a rename passes every existing test while breaking every dashboard that hardcodes the old name. Part 03\'s schema change detection is a separate check specifically for this, and this module\'s Real World incident is what happens without it.',
          },
          {
            q: 'Letting the prod_artifacts manifest go stale',
            a: 'Slim CI\'s state:modified+ selection is only correct if the reference manifest reflects the actual last production deploy — this module\'s Error Library shows a stale manifest causing CI to (wrongly) treat all 150 models as changed, defeating the entire point of slim CI. The S3 manifest upload has to run as part of every successful prod deployment, not as an occasional manual step.',
          },
          {
            q: 'Running a two-step schema rename without wrapping it in a transaction',
            a: 'Between the two ALTER SCHEMA RENAME statements, there is a real window where the target schema name doesn\'t exist at all — this module\'s Error Library documents exactly this causing 5 minutes of production outage from a dropped connection mid-swap. Wrap both renames in BEGIN/COMMIT.',
          },
          {
            q: 'Testing a new required column against an incremental CI run instead of a full refresh',
            a: 'An incremental test run only validates today\'s new rows, which have the new column populated — it says nothing about the hundreds of millions of existing rows that will have NULL for it in production. Force a --full-refresh in CI specifically when a PR adds a new not_null column to an incremental model.',
          },
          {
            q: 'Treating Airflow DAG deploys as low-risk because "it\'s just a schedule"',
            a: 'A DAG file with an import error doesn\'t fail loudly — it silently disappears from the Airflow UI, and nobody notices until the pipeline it used to run stops showing up in run history. Part 05\'s py_compile + DagBag import checks in CI exist because this failure mode is otherwise invisible until someone goes looking for a missing DAG.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>{item.q}</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>{item.a}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `dbt CI fails with "compilation error: relation 'freshcart_ci_pr_142.bronze.orders' does not exist" — state:modified+ run cannot find upstream models`,
            cause: 'The --defer flag was not included in the CI dbt run command. Without --defer, dbt tries to read bronze.orders from the CI database (freshcart_ci_pr_142) which does not contain bronze.orders — it only contains the models being built in this PR. The CI database was created as a Zero-Copy Clone of production, so bronze.orders does exist in freshcart_ci_pr_142.bronze, but the CI target schema is dbt_ci and dbt is looking in the wrong place.',
            fix: 'Add --defer --state ./prod_artifacts to the CI dbt run command: dbt run --target ci --select state:modified+ --defer --state ./prod_artifacts. The --defer flag tells dbt to use production versions of models not in the current run\'s selection. Verify that prod_artifacts/manifest.json was downloaded at CI start from S3. If prod_artifacts is empty, the defer cannot work — add a CI step that downloads the manifest: aws s3 cp s3://freshcart-ci-artifacts/dbt/manifest.json ./prod_artifacts/manifest.json.',
          },
          {
            error: `Slim CI runs the full project on every PR — state:modified+ selects all 150 models instead of the 4 that were changed`,
            cause: 'The prod_artifacts/manifest.json is outdated or missing. When the reference manifest does not match the current production state, dbt cannot determine which models are unchanged — it treats all models as potentially modified. Alternatively, the prod manifest was not updated after the last production deployment, so the reference state is stale and most models appear changed by comparison.',
            fix: 'Ensure the production manifest is updated at the end of every successful production dbt run: aws s3 cp ./target/manifest.json s3://freshcart-ci-artifacts/dbt/manifest.json. This step must run as part of the production deployment pipeline. At CI start, download the manifest: aws s3 cp s3://freshcart-ci-artifacts/dbt/manifest.json ./prod_artifacts/. If this download fails (S3 bucket empty or permission error), fall back to running all models rather than failing CI silently with full-project runs.',
          },
          {
            error: `A DAG deployed successfully but disappears from the Airflow UI within minutes — no error in CI, but logs show "No module named 'pipeline.custom_operators'"`,
            cause: 'The DAG file imports a custom operator from a package that is not installed in the Airflow scheduler\'s Python environment. The CI validation ran py_compile (syntax check) and DagBag import, but DagBag was run in the CI environment where pipeline.custom_operators is installed. The production Airflow environment is missing this package. The DAG disappears because the scheduler marks files with import errors as broken and removes them from the UI.',
            fix: 'Check production import errors: airflow dags list-import-errors. This will show "No module named pipeline.custom_operators" with the DAG file name. Install the missing package in the Airflow production environment (requirements.txt for managed Airflow, or the Docker image for containerised Airflow). Prevent recurrence: run the DagBag import check in CI using a Docker image that matches the production Airflow environment exactly, not the local CI runner\'s environment. Add a smoke test after every Airflow deployment: curl the Airflow API to confirm the DAG appears with no import errors.',
          },
          {
            error: `Blue-green deployment left production inaccessible for 5 minutes — the schema rename failed partway through and both old and new schemas existed simultaneously with broken names`,
            cause: 'The two-step schema rename (rename gold → gold_old, rename gold_shadow → gold) is not atomic in Snowflake. If the first rename succeeds but the Snowflake connection fails before the second rename, there is no schema named gold in production for 5 minutes. Analysts querying gold.daily_revenue get a "schema not found" error during the gap.',
            fix: 'Use a transaction to wrap both renames: BEGIN; ALTER SCHEMA gold RENAME TO gold_old; ALTER SCHEMA gold_shadow RENAME TO gold; COMMIT;. Snowflake supports DDL in transactions. The transaction is atomic — either both renames succeed or neither does. Alternatively, use Snowflake\'s stream-based approach: create a view in the gold schema that reads from gold_shadow, which allows zero-downtime switching. Or use dbt\'s built-in table swap mechanism (available in some dbt adapters) which handles the atomic swap internally.',
          },
          {
            error: `CI passes for a PR that adds a new required column to Silver — production deployment fails because existing rows have NULL for the new column`,
            cause: 'The CI test ran against the Zero-Copy Clone which contains production data from before the PR was made. The new column was added with not_null constraint in schema.yml. But the CI run used is_incremental() mode, which only processed today\'s new rows (which do have the new column populated). The not_null test passed because it only checked today\'s rows. The existing 400 million historical rows in production have NULL for the new column — and the not_null test catches this on production deploy.',
            fix: 'When adding a new required column to an incremental model, the CI must run a full-refresh against the full production data clone to catch existing rows. Add a special CI step for schema additions: if the PR adds a new not_null column to an incremental model, run dbt run --full-refresh for that model in CI to validate all existing rows comply. This is more expensive but only triggers when schema changes are detected. Alternatively, always add new columns as nullable first, backfill historical values, then add the not_null constraint in a follow-up PR.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)', marginBottom: 12, background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 6, padding: '8px 12px', lineHeight: 1.5 }}>{item.error}</div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'Data pipeline CI/CD has higher stakes than software CI/CD. A software bug surfaces as a visible error. A data bug looks like normal data but produces wrong numbers — discovered hours or days later after decisions have been made. This asymmetry demands rigorous testing before production deployment.',
        'Three environments: Dev (individual developer sandbox, small data subset, isolated schema), Staging/CI (Zero-Copy Clone of production data, isolated per PR, created on PR open and torn down after merge), Production (full data, pipeline service accounts only, no direct developer write access).',
        'Snowflake Zero-Copy Clone creates an instant snapshot of a production database at zero storage cost. Use it to give each CI run an isolated environment with production-like data. Creating a 10 TB clone takes seconds and costs nothing until the CI run writes to it. Tear down after merge to avoid accumulating idle clones.',
        'Slim CI uses --select state:modified+ to run only changed models and their downstream dependents. The --defer flag uses production data for upstream models not in the CI selection. Together: CI runs 4-8 minutes instead of 45+ minutes. The prod_artifacts/manifest.json (updated after every successful prod run) provides the reference state for change detection.',
        'Schema change detection compares the current manifest to the production manifest and fails CI if any Gold column was removed or renamed. This is the most important CI check for preventing broken dashboards. A column rename must go through a deprecation cycle: add the new name, keep the old name as an alias, notify consumers, remove the old name only after all consumers migrate.',
        'Airflow DAG CI: compile with py_compile (syntax), import with DagBag (catches missing modules), assert DAG structure (expected task IDs, correct dependency order, catchup=False, schedule not None), validate connections exist. Run against the same Docker image as production — a package installed in CI but not production causes the DAG to disappear from the UI after deployment.',
        'Blue-green deployment for high-risk Gold changes: build the new version in a shadow schema, run tests against it, then atomically swap shadow → production using a transaction. The old schema is preserved for 24 hours as a rollback option. Wrap the schema rename in a BEGIN/COMMIT transaction to make it atomic — non-atomic renames leave a window where no schema exists.',
        'Rollback strategies: git revert + redeploy (safe and clean, takes 5-10 min), Delta Lake time travel (RESTORE TABLE to a previous version — fast data recovery), blue-green swap back (immediate, no recompute — only if blue-green was used). Choose based on the nature of the problem: logic error → git revert, large data corruption → Delta time travel.',
        'The data testing pyramid is inverted. Integration tests (dbt tests against real data in CI) provide more value than unit tests because most bugs occur at the boundary between SQL and data. Unit tests are valuable for pure Python logic (validators, hash functions). End-to-end tests validate the full pipeline output against known business invariants.',
        'The PR process and CI gates are an investment in trust. Analysts who have been burned by wrong data distrust every number. Analysts who trust the data use it confidently and make better decisions. The minutes spent in CI are returned many times over in analyst confidence, fewer post-incident investigations, and stakeholder trust in the data platform.',
      ]} />


      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 45 covers Infrastructure as Code — provisioning cloud data infrastructure with Terraform so your environments are version-controlled, reproducible, and never subject to configuration drift.
        </p>
        <Link href="/learn/data-engineering/infrastructure-as-code" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 45 → Infrastructure as Code for Data Engineers
        </Link>
      </div>
    </LearnLayout>
  )
}
