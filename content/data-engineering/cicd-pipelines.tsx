import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
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
const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)
const CodeBox = ({ children, label }: { children: string | React.ReactNode; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>{label}</div>}
    <pre style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', overflowX: 'auto', fontSize: 13, lineHeight: 1.9, color: 'var(--text)', fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap' }}>
      <code>{children}</code>
    </pre>
  </div>
)
const Divider = () => <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>{children}</div>
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
      section="Data Engineering"
      readTime="60 min"
      updatedAt="March 2026"
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
          table that analysts are querying right now. A schema change in a Gold
          model can silently break three Metabase dashboards. A wrong SQL
          expression produces incorrect numbers that make it into a CFO report.
        </Para>

        <Para>
          The stakes of a bad data deployment are different from a bad software
          deployment. A software bug surfaces as an error page that users see and
          report. A data bug surfaces as a wrong number in a report that looks
          correct until someone notices it does not match expectations — often
          days later, after decisions have been made. This asymmetry means data
          CI/CD must be more rigorous about testing before deployment, not less.
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
      </section>

      <Divider />

      {/* ── Part 02 — Environments ────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Environments" />
        <SectionTitle>Environment Strategy — Dev, Staging, and Production</SectionTitle>

        <Para>
          A data platform needs at least two environments — development and
          production — and ideally three, adding a staging environment that
          mirrors production data and configuration. Each environment serves
          a specific purpose in the promotion pipeline, and the configuration
          must ensure that code changes flow in one direction: dev → staging → prod.
        </Para>

        <CodeBox label="Environment strategy — what each environment provides and how dbt targets map">{`ENVIRONMENT HIERARCHY:

  DEV (developer sandbox)
  ─────────────────────────────────────────────────────────────────────────
  Purpose:     Individual developer workspace for iterative development
  Data:        Subset of production data (last 7 days, sampled or full)
  Schema:      dev_{developer_name} or dev_{branch_name}
               e.g. dev_priya_feature_order_tier
  Access:      Developer's personal credentials
  Isolation:   Completely isolated — dev changes cannot affect staging or prod
  Cost:        Low — small data volume, developer queries only
  Lifespan:    Created on branch checkout, deleted after merge

  STAGING / CI (automated testing environment)
  ─────────────────────────────────────────────────────────────────────────
  Purpose:     Run automated tests against a clean copy of recent production data
  Data:        Clone of production data (last 30 days) OR Snowflake Zero-Copy Clone
  Schema:      ci_{PR_number} or staging_{branch_name}
  Access:      CI service account (read prod, write staging schema)
  Isolation:   Each PR gets its own isolated staging schema
  Cost:        Moderate — production data volume but only active during CI
  Lifespan:    Created on PR open, deleted after PR merge

  PRODUCTION
  ─────────────────────────────────────────────────────────────────────────
  Purpose:     Serves real analytical consumers (analysts, BI tools, APIs)
  Data:        Full production data, updated by live pipelines
  Schema:      silver, gold (canonical schema names)
  Access:      Pipeline service accounts only (write); analysts read-only
  Isolation:   No direct developer write access — changes only via PR + CI
  Cost:        Full production compute and storage
  Lifespan:    Permanent


dbt TARGET CONFIGURATION (profiles.yml):

freshmart:
  target: dev   # default target for local development

  outputs:
    dev:
      type:     snowflake
      account:  freshmart.snowflake.com
      user:     "{{ env_var('SNOWFLAKE_USER') }}"
      password: "{{ env_var('SNOWFLAKE_PASSWORD') }}"
      role:     analyst_role
      database: freshmart_dev
      schema:   "dev_{{ env_var('DBT_DEV_SCHEMA', 'default') }}"
      # Local: schema = dev_priya_feature_xyz
      # CI:    schema = ci_pr_142

    ci:
      type:     snowflake
      account:  freshmart.snowflake.com
      user:     "{{ env_var('CI_SNOWFLAKE_USER') }}"
      password: "{{ env_var('CI_SNOWFLAKE_PASSWORD') }}"
      role:     ci_service_role
      database: freshmart_ci
      schema:   "ci_{{ env_var('PR_NUMBER', 'manual') }}"
      # Each PR gets: ci_142, ci_143, etc.

    prod:
      type:     snowflake
      account:  freshmart.snowflake.com
      user:     "{{ env_var('PROD_SNOWFLAKE_USER') }}"
      password: "{{ env_var('PROD_SNOWFLAKE_PASSWORD') }}"
      role:     pipeline_role
      database: freshmart_prod
      schema:   silver    # or gold, depending on the model group`}</CodeBox>

        <SubTitle>Snowflake Zero-Copy Clone — cheap production-like staging</SubTitle>

        <CodeBox label="Snowflake Zero-Copy Clone — production data for CI at near-zero cost">{`PROBLEM: Running CI tests against production data is expensive.
  Cloning production tables for each PR: copies 10 TB → expensive and slow.

SOLUTION: Snowflake Zero-Copy Clone
  Creates an instant snapshot of a database/schema at zero storage cost.
  Clone shares data pages with source until rows are modified.
  Creating a 10 TB clone: 0-5 seconds, $0.00 storage (until writes)

-- Clone production schemas for a PR:
CREATE OR REPLACE DATABASE freshmart_ci_pr_142
  CLONE freshmart_prod;
-- Creates an identical copy of freshmart_prod in ~2 seconds.
-- Storage cost: $0 (shared pages with freshmart_prod).
-- Write operations on the clone use new storage (small for CI tests).

-- CI SETUP SCRIPT:
def create_ci_environment(pr_number: int) -> str:
    """Create an isolated CI environment using Zero-Copy Clone."""
    ci_db = f'freshmart_ci_pr_{pr_number}'
    snowflake_conn.execute(f"""
        CREATE OR REPLACE DATABASE {ci_db}
        CLONE freshmart_prod
        DATA_RETENTION_TIME_IN_DAYS = 1
    """)
    return ci_db

def teardown_ci_environment(pr_number: int) -> None:
    """Clean up CI environment after tests complete."""
    ci_db = f'freshmart_ci_pr_{pr_number}'
    snowflake_conn.execute(f'DROP DATABASE IF EXISTS {ci_db}')

# In CI pipeline:
# 1. On PR open:    create_ci_environment(pr_number)
# 2. Run dbt tests: dbt test --target ci
# 3. On PR close:   teardown_ci_environment(pr_number)

# BigQuery equivalent: BigQuery snapshots or dataset copies
# gcloud bigquery cp freshmart_prod freshmart_ci_pr_142 --location=asia-south1`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — dbt CI Pipeline ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — dbt CI Pipeline" />
        <SectionTitle>dbt CI — What to Run on Every Pull Request</SectionTitle>

        <Para>
          A dbt CI pipeline runs on every pull request before merge. It catches
          compile errors, test failures, and schema breaking changes before they
          reach production. The key challenge is speed — a CI run that takes
          45 minutes blocks the developer and tempts them to merge without
          waiting. The solution is slim CI: only run tests on models that
          were changed or depend on changed models.
        </Para>

        <CodeBox label="GitHub Actions dbt CI — complete workflow">{`# .github/workflows/dbt_ci.yml
name: dbt CI

on:
  pull_request:
    branches: [main]
    paths:
      - 'dbt/**'
      - '.github/workflows/dbt_ci.yml'

jobs:
  dbt-ci:
    runs-on: ubuntu-latest
    timeout-minutes: 30

    env:
      DBT_PROFILES_DIR:    /home/runner/.dbt
      CI_SNOWFLAKE_USER:   \${{ secrets.CI_SNOWFLAKE_USER }}
      CI_SNOWFLAKE_PASSWORD: \${{ secrets.CI_SNOWFLAKE_PASSWORD }}
      PR_NUMBER:           \${{ github.event.pull_request.number }}

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0    # needed for dbt --select state:modified

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: pip

      - name: Install dbt
        run: pip install dbt-snowflake==1.8.0 dbt-utils

      - name: Write dbt profiles
        run: |
          mkdir -p /home/runner/.dbt
          cat > /home/runner/.dbt/profiles.yml << 'EOF'
          freshmart:
            target: ci
            outputs:
              ci:
                type: snowflake
                account: freshmart.snowflake.com
                user: "{{ env_var('CI_SNOWFLAKE_USER') }}"
                password: "{{ env_var('CI_SNOWFLAKE_PASSWORD') }}"
                role: ci_service_role
                database: "freshmart_ci_pr_{{ env_var('PR_NUMBER') }}"
                schema: dbt_ci
                warehouse: CI_WH
                threads: 8
          EOF

      - name: Create CI database (Snowflake Zero-Copy Clone)
        run: python scripts/ci/create_ci_db.py --pr \${{ github.event.pull_request.number }}

      - name: dbt deps (install packages)
        working-directory: dbt
        run: dbt deps

      - name: dbt compile (catch SQL syntax errors)
        working-directory: dbt
        run: dbt compile --target ci

      - name: dbt run — SLIM CI (only changed models + downstream)
        working-directory: dbt
        run: |
          # Slim CI: only run models modified in this PR + their dependents.
          # This runs 5-20 models instead of all 150. CI time: 4 min vs 45 min.
          dbt run --target ci \\
            --select state:modified+ \\
            --defer \\
            --state ./prod_artifacts \\
            --exclude tag:skip_ci

      - name: dbt test — tests for changed models + downstream
        working-directory: dbt
        run: |
          dbt test --target ci \\
            --select state:modified+ \\
            --defer \\
            --state ./prod_artifacts \\
            --store-failures

      - name: dbt docs — generate for PR preview
        working-directory: dbt
        if: always()
        run: dbt docs generate --target ci

      - name: Check for breaking schema changes
        run: python scripts/ci/check_schema_changes.py --pr \${{ github.event.pull_request.number }}

      - name: Teardown CI database
        if: always()   # clean up even if previous steps failed
        run: python scripts/ci/teardown_ci_db.py --pr \${{ github.event.pull_request.number }}

      - name: Post test results to PR
        if: always()
        uses: actions/github-script@v7
        with:
          script: |
            const results = require('./dbt/target/run_results.json');
            const passed  = results.results.filter(r => r.status === 'pass').length;
            const failed  = results.results.filter(r => r.status === 'fail').length;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo:  context.repo.repo,
              body:  \`## dbt CI Results\\n✅ \${passed} passed  ❌ \${failed} failed\`,
            });`}</CodeBox>

        <SubTitle>Slim CI — running only changed models with --defer</SubTitle>

        <CodeBox label="Slim CI — dbt state:modified and --defer explained">{`SLIM CI CONCEPTS:

1. STATE-BASED SELECTION (state:modified):
   dbt compares the current code (manifest.json from the PR branch)
   to a reference state (manifest.json from the last production run).
   Only models that changed — or depend on changed models — are selected.

   state:modified     → only models whose SQL or config changed
   state:modified+    → changed models + all downstream dependents
   +state:modified    → changed models + all upstream ancestors
   +state:modified+   → full subtree around changed models

   EXAMPLE: PR changes silver.orders.
   state:modified+ selects:
     silver.orders                  ← changed directly
     gold.daily_revenue             ← downstream of silver.orders
     gold.customer_ltv              ← downstream of silver.orders
     gold.fct_orders_wide           ← downstream of silver.orders
   Skips: silver.customers, silver.payments, unrelated gold models.
   Runs 4 models instead of 80. CI time: ~4 min instead of 45 min.

2. --DEFER (use production data for unmodified upstream models):
   When running silver.orders in CI, it needs bronze.orders as input.
   bronze.orders exists in production but not in the CI database.
   --defer tells dbt: for models NOT in the CI run, use the production
   version of that model from the prod database.

   Without --defer:
     silver.orders → tries to read from ci_pr_142.bronze.orders → NOT FOUND → error

   With --defer --state ./prod_artifacts:
     silver.orders → reads from freshmart_prod.bronze.orders → works! ✓
   The CI environment only writes the models in state:modified+.
   Everything else is deferred to production data.

3. PROD ARTIFACTS (the reference state):
   prod_artifacts/manifest.json is the manifest from the last successful
   production run. It is stored as:
     - An artifact in the CI/CD system (GitHub Actions cache/artifact)
     - Or fetched from dbt Cloud's API
     - Or stored in S3 and downloaded at CI start

   FETCHING PROD MANIFEST FROM S3:
   aws s3 cp s3://freshmart-ci-artifacts/dbt/manifest.json ./prod_artifacts/
   aws s3 cp s3://freshmart-ci-artifacts/dbt/catalog.json  ./prod_artifacts/

   UPDATING PROD MANIFEST after successful prod deployment:
   aws s3 cp ./target/manifest.json s3://freshmart-ci-artifacts/dbt/
   # Runs at end of every successful production dbt run


4. SCHEMA CHANGE DETECTION:
   A script that compares current manifest to prod manifest and
   flags breaking changes: removed columns, type changes, renamed columns.

   # scripts/ci/check_schema_changes.py
   def detect_breaking_changes(
       current_manifest: dict,
       prod_manifest:    dict,
   ) -> list[str]:
       breaking = []
       for node_id, node in prod_manifest['nodes'].items():
           if node_id not in current_manifest['nodes']:
               breaking.append(f"Model removed: {node['name']}")
               continue
           prod_cols    = {c: v['data_type']
                          for c, v in node.get('columns', {}).items()}
           current_cols = {c: v['data_type']
                          for c, v in current_manifest['nodes'][node_id]
                          .get('columns', {}).items()}
           for col, dtype in prod_cols.items():
               if col not in current_cols:
                   breaking.append(f"{node['name']}.{col} removed")
               elif current_cols[col] != dtype:
                   breaking.append(
                       f"{node['name']}.{col}: {dtype} → {current_cols[col]}"
                   )
       return breaking`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Production Deployment ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Production Deployment" />
        <SectionTitle>Deploying to Production — Safe Deployment Patterns for dbt</SectionTitle>

        <Para>
          Deploying dbt changes to production requires more care than deploying
          application code. A full dbt run on production tables that takes 3 hours
          cannot be rolled back instantly if a bug is found 2 hours in. Safe
          deployment patterns reduce the blast radius and enable fast recovery.
        </Para>

        <CodeBox label="Production deployment strategies for dbt — from simplest to safest">{`STRATEGY 1: DIRECT DEPLOYMENT (simplest — fine for most cases)
  On merge to main: run dbt in production environment.
  Any test failure blocks the deployment.
  Rollback: re-run the previous git tag.

  GITHUB ACTIONS — PRODUCTION DEPLOY:
  name: dbt Production Deploy
  on:
    push:
      branches: [main]

  jobs:
    deploy:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - name: Deploy to production
          run: |
            dbt deps
            dbt run  --target prod --vars '{"run_date": "{{ ds }}"}'
            dbt test --target prod
        - name: Update prod artifacts in S3
          run: aws s3 cp ./target/manifest.json s3://freshmart-ci-artifacts/dbt/


STRATEGY 2: BLUE-GREEN DEPLOYMENT (for high-risk Gold changes)
  Build the new version of the table in a shadow schema.
  Validate it. Atomically swap the schema pointer.
  Rollback: swap back to the old schema (still exists).

  IMPLEMENTATION IN SNOWFLAKE:
  def blue_green_deploy_gold_model(model_name: str, run_date: str):
      """
      Build the new version in a shadow schema.
      If tests pass: swap shadow → production.
      Old production schema preserved for 24h for rollback.
      """
      # Step 1: Build in shadow schema (not live to analysts):
      subprocess.run([
          'dbt', 'run', '--target', 'prod',
          '--select', model_name,
          '--vars', json.dumps({'run_date': run_date,
                                'target_schema': 'gold_shadow'}),
      ], check=True)

      # Step 2: Run tests against shadow schema:
      subprocess.run([
          'dbt', 'test', '--target', 'prod',
          '--select', model_name,
          '--vars', json.dumps({'target_schema': 'gold_shadow'}),
      ], check=True)

      # Step 3: Atomic schema swap (analysts see new version immediately):
      conn.execute("""
          ALTER SCHEMA freshmart_prod.gold
          RENAME TO freshmart_prod.gold_old_20260317;
      """)
      conn.execute("""
          ALTER SCHEMA freshmart_prod.gold_shadow
          RENAME TO freshmart_prod.gold;
      """)
      # Analysts querying gold.daily_revenue now see the new version.
      # If rollback needed: rename back.

      # Step 4: Drop old schema after 24h validation window:
      schedule_schema_drop('gold_old_20260317', delay_hours=24)


STRATEGY 3: INCREMENTAL DEPLOYMENT (for schema migrations)
  When adding a new column to a large Silver table:
  Step 1: Add column as nullable in the same dbt run.
          Analysts see NULL for the new column — no breakage.
  Step 2: Backfill the new column value for all existing rows.
          Run as a separate job with progress tracking.
  Step 3: Once backfill complete: apply not_null constraint.
          Remove the temporary nullable flag.

  This prevents a 3-hour "backfill lock" on a 500M-row table
  that would block analysts from querying it.

  -- Step 1: Add column (dbt schema.yml change):
  -- new column 'tip_amount' added with no tests initially.
  -- Step 2: Backfill script (run separately):
  UPDATE silver.orders
  SET tip_amount = 0.0
  WHERE tip_amount IS NULL
    AND created_at < '2026-03-17';   -- all rows before the feature launch
  -- Step 3: Add not_null test to schema.yml after backfill completes.


ROLLBACK STRATEGY:
  dbt does not have a native "rollback" command.
  Rollback options:
  1. Revert the git commit and redeploy:
     git revert HEAD && git push origin main → CI/CD re-deploys old version
  2. Delta Lake time travel:
     RESTORE TABLE silver.orders TO VERSION AS OF 41
     (restores the Silver table to the state before the bad deploy)
  3. Blue-green: swap back to old schema (if blue-green was used)

  WHICH TO USE:
  Simple model logic change: git revert + redeploy (safest, cleanest)
  Large data change: Delta time travel (fastest data recovery)
  Critical Gold model: blue-green swap (immediate, no recompute needed)`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 05 — Airflow Deployment ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Airflow Deployment" />
        <SectionTitle>Airflow Deployment — DAG Versioning and Safe Updates</SectionTitle>

        <Para>
          Deploying Airflow DAGs has unique challenges compared to dbt models.
          A DAG change takes effect the next time the scheduler parses it —
          typically within 30 seconds. If the change modifies a DAG that is
          currently running, the in-progress run may behave unexpectedly with
          the new code. DAG versioning and safe deployment patterns prevent
          mid-run disruptions.
        </Para>

        <CodeBox label="Airflow deployment patterns — DAG versioning and CI/CD">{`AIRFLOW DAG DEPLOYMENT APPROACHES:

APPROACH 1: GIT SYNC (most common for managed Airflow)
  Airflow reads DAG files directly from a Git repository.
  Any push to the main branch is reflected in Airflow within 30-60 seconds.
  Used by: Google Cloud Composer, MWAA, Astronomer.

  FLOW:
    Developer pushes → CI tests pass → merge to main → Git Sync detects change
    → Airflow scheduler re-parses DAG file → change is live

  RISK: no staging for Airflow DAGs.
    A syntax error in a DAG file makes the DAG disappear from the UI.
    A schedule change takes effect immediately, possibly mid-run.

  MITIGATION:
    - Run python -m py_compile dags/*.py in CI to catch syntax errors
    - Run airflow dags list-import-errors in CI to catch import errors
    - Use DAG pausing for risky changes (pause, deploy, verify, unpause)


APPROACH 2: DAG VERSIONING (for breaking schedule/structure changes)
  When changing a DAG's schedule or removing tasks, create a new DAG ID.
  Old DAG runs to completion. New DAG takes over from next run.

  # Bad approach: modify existing DAG schedule mid-stream
  DAG('freshmart_morning_pipeline', schedule='0 2 * * *', ...)
  # Change to:
  DAG('freshmart_morning_pipeline', schedule='0 6 * * *', ...)
  # Risk: if a run is in progress, it sees the new schedule on next evaluation.

  # Good approach: version the DAG ID for breaking changes
  DAG('freshmart_morning_pipeline_v2', schedule='0 6 * * *', ...)
  # v1 continues running its current cycle.
  # v2 starts on the new schedule from the first run after deploy.
  # Once v1 has no more in-progress runs: delete it.


APPROACH 3: STAGED DEPLOYMENT WITH TESTING
  CI pipeline for Airflow DAGs:

  # .github/workflows/airflow_ci.yml
  steps:
    - name: Lint DAG files
      run: |
        pip install apache-airflow flake8
        flake8 dags/ --max-line-length=120

    - name: Validate DAG syntax (no import errors)
      run: |
        for dag_file in dags/*.py; do
          python -m py_compile "\$dag_file" && echo "OK: \$dag_file"
        done

    - name: Check for import errors using Airflow CLI
      run: |
        airflow db init
        airflow dags list-import-errors
        # Fails CI if any DAG has import errors

    - name: Validate DAG structure (task dependencies, no cycles)
      run: |
        python scripts/ci/validate_dag_structure.py
        # Checks: all task IDs are unique, no circular dependencies,
        # required tasks (start, end EmptyOperators) present,
        # all referenced connections exist in Airflow connections

    - name: Run DAG unit tests
      run: pytest tests/dags/ -v


UNIT TESTING AIRFLOW DAGS:
import pytest
from airflow.models import DagBag

def test_freshmart_pipeline_dag_structure():
    dagbag = DagBag(dag_folder='dags/', include_examples=False)
    dag    = dagbag.get_dag('freshmart_morning_pipeline')

    assert dag is not None, "DAG not found"
    assert len(dagbag.import_errors) == 0, f"Import errors: {dagbag.import_errors}"

    task_ids = [task.task_id for task in dag.tasks]
    assert 'start' in task_ids,      "Missing 'start' task"
    assert 'end'   in task_ids,      "Missing 'end' task"
    assert 'dbt_silver' in task_ids, "Missing 'dbt_silver' task"
    assert 'dbt_gold'   in task_ids, "Missing 'dbt_gold' task"

def test_freshmart_pipeline_task_order():
    dagbag = DagBag(dag_folder='dags/', include_examples=False)
    dag    = dagbag.get_dag('freshmart_morning_pipeline')

    # Verify that dbt_silver runs before dbt_gold:
    silver_task = dag.get_task('dbt_silver')
    gold_task   = dag.get_task('dbt_gold')

    assert gold_task.task_id in [t.task_id for t in silver_task.downstream_list], \
        "dbt_gold must be downstream of dbt_silver"

def test_schedule_is_set():
    dagbag = DagBag(dag_folder='dags/', include_examples=False)
    dag    = dagbag.get_dag('freshmart_morning_pipeline')
    assert dag.schedule_interval is not None, "DAG has no schedule"
    assert dag.catchup is False, "catchup must be False in production DAGs"`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 06 — Pipeline Testing ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Testing Data Pipelines" />
        <SectionTitle>Testing Strategies for Data Pipelines — Unit, Integration, and E2E</SectionTitle>

        <Para>
          Data pipelines are harder to unit test than application code because
          the business logic is in SQL and the side effects are writes to a
          database. The testing pyramid for data pipelines is inverted compared
          to software: integration and end-to-end tests provide more value than
          unit tests, because most bugs occur at the boundary between the SQL
          and the data, not in pure logic.
        </Para>

        <CodeBox label="Testing pyramid for data pipelines — what to test and how">{`DATA PIPELINE TESTING PYRAMID:

  End-to-end (run full pipeline against prod-like data, validate outputs)
     ↑ most valuable but slowest
  Integration tests (run dbt models against real data, validate with dbt tests)
     ↑ good coverage, medium speed
  Unit tests (test pure Python logic — validation functions, hash key generators)
     ↓ least valuable alone, fastest

  Unlike software, the pyramid is widest at the top for data pipelines.
  A dbt model with correct SQL tests is more valuable than mocking the SQL.


UNIT TESTS (for pure Python logic):
  Test validation functions, hash key generators, transformation helpers.
  Do NOT try to unit test SQL by mocking the database — that doesn't work.

  # tests/unit/test_validation.py
  import pytest
  from pipeline.validate import validate_order_row, VALID_STATUSES

  def test_valid_order_passes():
      row = {
          'order_id':     9284751,
          'customer_id':  4201938,
          'order_amount': 380.00,
          'status':       'delivered',
      }
      result = validate_order_row(row)
      assert result.is_valid, f"Expected valid, got: {result.error}"

  def test_negative_amount_rejected():
      row = {'order_id': 1, 'customer_id': 1, 'order_amount': -10, 'status': 'placed'}
      result = validate_order_row(row)
      assert not result.is_valid
      assert result.error_type == 'negative_amount'

  def test_invalid_status_rejected():
      row = {'order_id': 1, 'customer_id': 1, 'order_amount': 100, 'status': 'unknown'}
      result = validate_order_row(row)
      assert not result.is_valid
      assert result.error_type == 'invalid_status'
      assert 'unknown' in result.error_message

  def test_hash_key_is_deterministic():
      from pipeline.vault import compute_hub_hk
      key1 = compute_hub_hk('4201938')
      key2 = compute_hub_hk('4201938')
      assert key1 == key2

  def test_hash_key_normalisation():
      from pipeline.vault import compute_hub_hk
      # Upper, lower, and padded versions must produce the same key:
      assert compute_hub_hk('ST001') == compute_hub_hk('st001')
      assert compute_hub_hk('ST001') == compute_hub_hk(' ST001 ')


INTEGRATION TESTS (dbt tests against real data — the most valuable):
  Run in CI against the Zero-Copy Clone of production data.
  These are the dbt tests in schema.yml — not_null, unique, accepted_values.
  The value: tests run against PRODUCTION DATA VOLUMES.
  A not_null test that passes locally on 1,000 dev rows may fail on
  50 million production rows because production has edge cases dev does not.

  Run in CI:
    dbt test --target ci --select state:modified+
  All dbt tests for changed models run against production-like data.
  Failures block the PR before merge.


END-TO-END TESTS (run full pipeline, validate output):
  Run the complete pipeline (extraction → Bronze → Silver → Gold) on
  a subset of production data. Validate the output tables match expectations.

  # tests/e2e/test_morning_pipeline.py
  import pytest
  from datetime import date, timedelta

  def test_morning_pipeline_e2e(snowflake_conn, dbt_runner):
      """
      Run a full pipeline on a small date range.
      Validate key output metrics match known-good values.
      """
      test_date = date.today() - timedelta(days=1)

      # Run the full pipeline for one day:
      result = dbt_runner.run(
          select='staging.* silver.* gold.*',
          vars={'run_date': str(test_date)},
          target='ci',
      )
      assert result.success, f"Pipeline failed: {result.errors}"

      # Validate row counts are in expected range:
      rows = snowflake_conn.execute(f"""
          SELECT COUNT(*) FROM ci_pr_142.gold.daily_revenue
          WHERE order_date = '{test_date}'
      """).scalar()
      assert 40_000 < rows < 100_000, f"Unexpected row count: {rows}"

      # Validate key business invariants:
      negative_revenue = snowflake_conn.execute(f"""
          SELECT COUNT(*) FROM ci_pr_142.gold.daily_revenue
          WHERE net_revenue < 0
      """).scalar()
      assert negative_revenue == 0, f"Found {negative_revenue} negative revenue rows"

      # Validate Silver reconciles with Bronze:
      bronze_count = snowflake_conn.execute(f"""
          SELECT COUNT(*) FROM ci_pr_142.bronze.orders
          WHERE _bronze_date = '{test_date}'
      """).scalar()
      silver_count = snowflake_conn.execute(f"""
          SELECT COUNT(*) FROM ci_pr_142.silver.orders
          WHERE DATE(created_at) = '{test_date}'
      """).scalar()
      dlq_count = snowflake_conn.execute(f"""
          SELECT COUNT(*) FROM ci_pr_142.pipeline.dead_letter_queue
          WHERE pipeline_name = 'silver_orders' AND run_date = '{test_date}'
      """).scalar()
      # Bronze = Silver + DLQ (all rows accounted for):
      assert bronze_count == silver_count + dlq_count, \
          f"Row count mismatch: {bronze_count} bronze != {silver_count} silver + {dlq_count} dlq"`}</CodeBox>
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
          The total CI/CD cycle from commit to production should target under
          45 minutes. Slim CI (state:modified+) keeps the test stage under 10
          minutes for typical changes. Production deployment runs only changed
          models, which keeps production deployment times proportional to the
          size of the change rather than the size of the entire dbt project.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Real World" />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>A Schema Change That Broke Three Dashboards — And How CI Would Have Prevented It</SectionTitle>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', display: 'inline-block', marginBottom: 20, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Scenario — FreshCart · A column rename breaks production dashboards
          </div>

          <Para>
            A data engineer renames <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>net_revenue</code> to
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> revenue_after_discount</code> in
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> gold.daily_revenue</code> for clarity.
            The rename is a SQL-only change in one dbt model. No dbt tests fail.
            The PR is merged. Three Metabase dashboards that query
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}> net_revenue</code> directly
            break immediately. Finance notices at 09:00.
          </Para>

          <CodeBox label="The incident and the CI improvements that prevent it">{`THE INCIDENT:
  Change: gold/daily_revenue.sql
    -- Before:
    order_amount - discount_amount AS net_revenue
    -- After:
    order_amount - discount_amount AS revenue_after_discount

  Impact: 3 Metabase dashboards query:
    SELECT SUM(net_revenue) FROM gold.daily_revenue WHERE ...
    → After rename: net_revenue column no longer exists → dashboard error

  Detection time: 45 minutes (Finance analyst reports broken dashboard)
  Fix time:      20 minutes (add net_revenue as alias, redeploy)
  Total impact:  1h 5min of broken Finance dashboards in the morning

ROOT CAUSE: No schema change detection in CI.
  The PR had:
    ✓ SQL compiled successfully
    ✓ dbt tests passed (not_null, unique on order_date, store_id)
    ✗ No check that net_revenue was removed
    ✗ No check that Metabase uses net_revenue
    ✗ No breakage visible until prod deploy

CI IMPROVEMENTS ADDED AFTER THIS INCIDENT:

1. SCHEMA CHANGE DETECTION (in every PR):
   # scripts/ci/check_schema_changes.py
   def check_for_breaking_column_changes():
       """
       Compare current manifest to prod manifest.
       Fail CI if any column was removed or renamed in a Gold model.
       """
       prod     = load_manifest('./prod_artifacts/manifest.json')
       current  = load_manifest('./target/manifest.json')
       changes  = detect_breaking_changes(prod['nodes'], current['nodes'])
       if changes:
           print("BREAKING SCHEMA CHANGES DETECTED:")
           for c in changes:
               print(f"  - {c}")
           print()
           print("If this is intentional, update all downstream consumers first.")
           print("Then re-run CI with: git commit -m 'chore: update consumers'")
           sys.exit(1)

   # Output on this PR:
   # BREAKING SCHEMA CHANGES DETECTED:
   #   - gold.daily_revenue.net_revenue removed
   # If this is intentional, update all downstream consumers first.

2. DOWNSTREAM CONSUMER CHECK (for Gold columns):
   # As part of DataHub ingestion, tag all Metabase columns that
   # reference each Gold column.
   # CI queries DataHub API:
   def check_downstream_consumers(changed_columns: list[str]) -> list[str]:
       """Return list of BI tools using any of the changed columns."""
       affected = []
       for col in changed_columns:
           consumers = datahub_client.get_downstream_consumers(
               table='gold.daily_revenue', column=col
           )
           affected.extend(consumers)
       return affected

   # Output: ["Metabase: Daily Revenue dashboard", "CFO Report export"]
   # CI fails with: "These consumers must be updated before this column is renamed."

3. BACKWARD-COMPATIBLE MIGRATION PATTERN:
   # The correct way to rename a column:

   # Step 1 (this PR): Add the new column, keep the old as an alias
   order_amount - discount_amount AS revenue_after_discount,
   order_amount - discount_amount AS net_revenue,  -- ← backward compat alias

   # Step 2: Notify all dashboard owners about the migration window.
   # Step 3 (next PR, after dashboards updated): Remove net_revenue alias.

   # This is the same deprecation pattern used in software APIs.
   # Add the new name. Keep the old name. Remove old name only after all consumers migrated.

RESULT AFTER CI IMPROVEMENTS:
  Next time a Gold column is renamed or removed:
  CI fails with: "BREAKING SCHEMA CHANGES: net_revenue removed"
  Developer sees: list of consumers to update before this is safe to merge.
  Engineer cannot merge until consumers are updated or the PR is modified.
  Zero production breakages from schema changes.`}</CodeBox>
        </div>
      </section>

      <Divider />

      {/* ── Part 09 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Interview Prep" />
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

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Error Library" />
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `dbt CI fails with "compilation error: relation 'freshmart_ci_pr_142.bronze.orders' does not exist" — state:modified+ run cannot find upstream models`,
            cause: 'The --defer flag was not included in the CI dbt run command. Without --defer, dbt tries to read bronze.orders from the CI database (freshmart_ci_pr_142) which does not contain bronze.orders — it only contains the models being built in this PR. The CI database was created as a Zero-Copy Clone of production, so bronze.orders does exist in freshmart_ci_pr_142.bronze, but the CI target schema is dbt_ci and dbt is looking in the wrong place.',
            fix: 'Add --defer --state ./prod_artifacts to the CI dbt run command: dbt run --target ci --select state:modified+ --defer --state ./prod_artifacts. The --defer flag tells dbt to use production versions of models not in the current run\'s selection. Verify that prod_artifacts/manifest.json was downloaded at CI start from S3. If prod_artifacts is empty, the defer cannot work — add a CI step that downloads the manifest: aws s3 cp s3://freshmart-ci-artifacts/dbt/manifest.json ./prod_artifacts/manifest.json.',
          },
          {
            error: `Slim CI runs the full project on every PR — state:modified+ selects all 150 models instead of the 4 that were changed`,
            cause: 'The prod_artifacts/manifest.json is outdated or missing. When the reference manifest does not match the current production state, dbt cannot determine which models are unchanged — it treats all models as potentially modified. Alternatively, the prod manifest was not updated after the last production deployment, so the reference state is stale and most models appear changed by comparison.',
            fix: 'Ensure the production manifest is updated at the end of every successful production dbt run: aws s3 cp ./target/manifest.json s3://freshmart-ci-artifacts/dbt/manifest.json. This step must run as part of the production deployment pipeline. At CI start, download the manifest: aws s3 cp s3://freshmart-ci-artifacts/dbt/manifest.json ./prod_artifacts/. If this download fails (S3 bucket empty or permission error), fall back to running all models rather than failing CI silently with full-project runs.',
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

    </LearnLayout>
  )
}