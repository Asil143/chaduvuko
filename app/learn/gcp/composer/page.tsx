import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Cloud Composer (Airflow)' }

const dagCode = `# Cloud Composer DAG — orchestrate the full GCP pipeline
# File: dags/daily_sales_pipeline.py
# This DAG runs daily, coordinates GCS → Dataflow → BigQuery

from airflow import DAG
from airflow.providers.google.cloud.operators.dataflow import DataflowStartFlexTemplateOperator
from airflow.providers.google.cloud.operators.bigquery import BigQueryInsertJobOperator
from airflow.providers.google.cloud.sensors.gcs import GCSObjectExistenceSensor
from airflow.utils.dates import days_ago
from datetime import timedelta

default_args = {
    'owner': 'data-engineering',
    'retries': 2,
    'retry_delay': timedelta(minutes=5),
    'email_on_failure': True,
    'email': ['de-team@yourcompany.com'],
}

with DAG(
    dag_id='daily_sales_pipeline',
    default_args=default_args,
    schedule_interval='0 3 * * *',   # Run every day at 3am UTC
    start_date=days_ago(1),
    catchup=False,
    tags=['sales', 'gcp', 'daily'],
) as dag:

    # Step 1: Wait for source file to land in GCS Bronze
    wait_for_source_file = GCSObjectExistenceSensor(
        task_id='wait_for_source_file',
        bucket='your-bucket',
        object='bronze/sales/{{ ds }}/sales_raw.csv',  # ds = execution date YYYY-MM-DD
        timeout=3600,  # Wait up to 1 hour
        poke_interval=120,
    )

    # Step 2: Run Dataflow job to transform Bronze → Silver in GCS
    run_dataflow_transform = DataflowStartFlexTemplateOperator(
        task_id='run_dataflow_transform',
        project_id='your-project',
        location='us-central1',
        body={
            'launchParameter': {
                'jobName': 'bronze-to-silver-{{ ds_nodash }}',
                'containerSpecGcsPath': 'gs://your-bucket/templates/bronze_to_silver',
                'parameters': { 'run_date': '{{ ds }}' },
            }
        },
    )

    # Step 3: Load Silver data from GCS into BigQuery Gold table
    load_to_bigquery = BigQueryInsertJobOperator(
        task_id='load_to_bigquery',
        configuration={
            'load': {
                'sourceUris': ['gs://your-bucket/silver/sales/{{ ds }}/*.parquet'],
                'destinationTable': { 'projectId': 'your-project', 'datasetId': 'gold', 'tableId': 'daily_sales_summary' },
                'sourceFormat': 'PARQUET',
                'writeDisposition': 'WRITE_APPEND',
                'timePartitioning': { 'field': 'order_date', 'type': 'DAY' },
            }
        },
    )

    # Step 4: Run aggregation query to refresh Gold summary table
    refresh_gold_summary = BigQueryInsertJobOperator(
        task_id='refresh_gold_summary',
        configuration={
            'query': {
                'query': '''
                    INSERT INTO \`your_project.gold.regional_performance\`
                    SELECT region, SUM(total_revenue) as revenue, COUNT(*) as orders,
                           DATE('{{ ds }}') as summary_date
                    FROM \`your_project.gold.daily_sales_summary\`
                    WHERE order_date = '{{ ds }}'
                    GROUP BY region
                ''',
                'useLegacySql': False,
            }
        },
    )

    # Define execution order with >> operator
    wait_for_source_file >> run_dataflow_transform >> load_to_bigquery >> refresh_gold_summary`

export default function ComposerPage() {
  return (
    <LearnLayout
      title="Cloud Composer (Managed Apache Airflow)"
      description="Cloud Composer is GCP's fully managed Apache Airflow service. You write Python DAGs to orchestrate your entire data pipeline — triggering Dataflow jobs, waiting for files, running BigQuery queries, and handling failures automatically."
      section="Section 02 · GCP Track"
      readTime="14 min read"
      updatedAt="March 2026"
      breadcrumbs={[
        { label: 'GCP Track', href: '/learn/gcp/introduction' },
        { label: 'Cloud Composer', href: '/learn/gcp/composer' },
      ]}
    >
      <h2 id="what-is-composer">Composer vs. ADF vs. Step Functions</h2>
      <p>
        Cloud Composer is the GCP equivalent of Azure Data Factory (for orchestration) and AWS Step Functions. All three tools coordinate multiple services into a workflow. The difference is that Composer uses Apache Airflow — the industry-standard open-source orchestration platform. Your DAGs are Python code, version-controlled in Git, and the same Airflow skills transfer to any cloud or on-premises environment.
      </p>
      <p>
        The core Airflow concept is the DAG (Directed Acyclic Graph) — a Python file that defines tasks and their dependencies. The DAG scheduler runs tasks in order, handles retries on failure, sends alerts, and provides a visual UI to monitor every pipeline run.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {[
          { icon: '🐍', title: 'Python DAGs', desc: 'Pipelines defined in Python code. Version-controlled in Git. The same skills work on-premises, AWS MWAA, Astronomer, or any Airflow platform.' },
          { icon: '🔗', title: 'Task Dependencies', desc: 'The >> operator defines execution order. Task B only runs when Task A succeeds. Full control over complex dependency graphs.' },
          { icon: '🔁', title: 'Retries and Alerts', desc: 'Automatic retries on failure with configurable delays. Email or Slack alerts when a DAG fails. Essential for production reliability.' },
        ].map(item => (
          <div key={item.title} className="rounded-xl p-4 text-center" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-display font-semibold text-sm mb-1.5" style={{ color: 'var(--text)' }}>{item.title}</div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 id="dag-example">A full production DAG — end to end</h2>
      <p>
        Here is a realistic Composer DAG that orchestrates the full daily sales pipeline: wait for the source file to land in GCS, run a Dataflow transformation job, load results to BigQuery, then run an aggregation query to refresh the Gold summary table.
      </p>
      <CodeBlock code={dagCode} language="python" filename="daily_sales_pipeline.py" />

      <Callout type="tip">
        The double curly brace syntax like ds and ds_nodash are Airflow template variables. ds becomes the execution date (2025-03-01), ds_nodash becomes 20250301. These make DAGs reusable across any execution date — the same DAG code runs for every day of the year.
      </Callout>

      <KeyTakeaways items={[
        'Cloud Composer is fully managed Apache Airflow — write Python DAGs, Google handles the infrastructure',
        'DAGs are Python files defining tasks and their dependencies — stored in a GCS bucket and auto-synced to Composer',
        'The >> operator defines task order — task B runs only after task A succeeds',
        'Template variables like ds inject the execution date — makes DAGs reusable for any date',
        'GCSObjectExistenceSensor waits for a file to arrive before proceeding — essential for event-driven pipelines',
        'Always configure retries and email alerts — production DAGs must handle failures automatically',
      ]} />
    </LearnLayout>
  )
}
