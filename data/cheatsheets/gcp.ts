import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const gcpCheatSheet: TrackCheatSheet = {
  track: 'gcp',
  title: 'Google Cloud',
  trackHref: '/learn/gcp/introduction',
  accent: '#4285f4',
  blurb: 'Projects and IAM, BigQuery, Dataflow, Composer and Pub/Sub — the Google Cloud data track on one page. Bookmark it.',
  sections: [
    {
      title: 'Projects & IAM',
      entries: [
        {
          label: 'Pick the project',
          note: 'one project per environment',
          code: `gcloud projects list
gcloud config set project lake-dev
gcloud config set compute/region us-central1
gcloud billing projects describe lake-dev`,
        },
        {
          label: 'Service account for jobs',
          note: 'not your user key',
          code: `gcloud iam service-accounts create etl --project=lake-dev --display-name="Lake ETL"
# email: etl@lake-dev.iam.gserviceaccount.com
# Dataflow, Composer, and Pub/Sub run as this account`,
        },
        {
          label: 'Two roles, not Owner',
          code: `gcloud projects add-iam-policy-binding lake-dev --member="serviceAccount:etl@lake-dev.iam.gserviceaccount.com" --role="roles/bigquery.jobUser"
gcloud projects add-iam-policy-binding lake-dev --member="serviceAccount:etl@lake-dev.iam.gserviceaccount.com" --role="roles/bigquery.dataEditor"`,
        },
        {
          label: 'See the binding',
          code: `gcloud projects get-iam-policy lake-dev --flatten="bindings[].members" --filter="bindings.members:etl@lake-dev.iam.gserviceaccount.com" --format="value(bindings.role)"`,
        },
      ],
    },
    {
      title: 'BigQuery tables',
      entries: [
        {
          label: 'Dataset',
          code: `bq mk --dataset --location=US lake-dev:lake
bq ls lake-dev:`,
        },
        {
          label: 'Partition and cluster',
          code: `bq mk --table --time_partitioning_field=dt --clustering_fields=order_id lake-dev:lake.orders order_id:STRING,amount:FLOAT64,dt:DATE`,
        },
        {
          label: 'Same table in SQL',
          code: `CREATE TABLE lake.orders (
  order_id STRING,
  amount FLOAT64,
  dt DATE
)
PARTITION BY dt
CLUSTER BY order_id;`,
        },
        {
          label: 'Require a partition filter',
          code: `ALTER TABLE lake.orders
SET OPTIONS (require_partition_filter = true);`,
        },
      ],
    },
    {
      title: 'BigQuery SQL',
      entries: [
        {
          label: 'Aggregate one day',
          code: `SELECT dt, SUM(amount) AS revenue
FROM lake.orders
WHERE dt = DATE '2026-03-15'
GROUP BY dt;`,
        },
        {
          label: 'Keep the latest row',
          code: `SELECT * EXCEPT (rn) FROM (
  SELECT *, ROW_NUMBER() OVER (
    PARTITION BY order_id ORDER BY updated_at DESC
  ) AS rn
  FROM lake.orders_raw
)
WHERE rn = 1;`,
        },
        {
          label: 'MERGE',
          code: `MERGE lake.orders t
USING lake.orders_stage s
ON t.order_id = s.order_id
WHEN MATCHED THEN
  UPDATE SET amount = s.amount, dt = s.dt
WHEN NOT MATCHED THEN
  INSERT (order_id, amount, dt)
  VALUES (s.order_id, s.amount, s.dt);`,
        },
      ],
    },
    {
      title: 'Load & external data',
      entries: [
        {
          label: 'Load Parquet',
          note: 'file must contain dt',
          code: `bq load --source_format=PARQUET lake-dev:lake.orders gs://lake-dev-raw/bronze/orders/dt=2026-03-15/*.parquet`,
        },
        {
          label: 'LOAD DATA',
          code: `LOAD DATA INTO lake.orders
FROM FILES (
  format = 'PARQUET',
  uris = ['gs://lake-dev-raw/bronze/orders/dt=2026-03-15/*.parquet']
);`,
        },
        {
          label: 'External table',
          note: 'no copy into BigQuery storage',
          code: `CREATE OR REPLACE EXTERNAL TABLE lake.orders_ext (
  order_id STRING,
  amount FLOAT64
)
WITH PARTITION COLUMNS (dt DATE)
OPTIONS (
  format = 'PARQUET',
  uris = ['gs://lake-dev-raw/silver/orders/*'],
  hive_partition_uri_prefix = 'gs://lake-dev-raw/silver/orders/'
);`,
        },
        {
          label: 'Dry run',
          note: 'bytes that would be billed',
          code: `bq query --dry_run --use_legacy_sql=false 'SELECT SUM(amount) FROM lake.orders WHERE dt = "2026-03-15"'`,
        },
      ],
    },
    {
      title: 'Cloud Dataflow',
      entries: [
        {
          label: 'Batch pipeline',
          code: `import apache_beam as beam

with beam.Pipeline() as p:
    (p
     | beam.io.ReadFromParquet("gs://lake-dev-raw/bronze/orders/*.parquet")
     | beam.Filter(lambda r: r["amount"] is not None)
     | beam.io.WriteToParquet("gs://lake-dev-raw/silver/orders/out"))`,
        },
        {
          label: 'Run on Dataflow',
          code: `python orders_pipeline.py --runner DataflowRunner --project lake-dev --region us-central1 --temp_location gs://lake-dev-tmp/temp --service_account_email etl@lake-dev.iam.gserviceaccount.com`,
        },
        {
          label: 'List and cancel',
          code: `gcloud dataflow jobs list --region=us-central1 --status=active
gcloud dataflow jobs cancel JOB_ID --region=us-central1`,
        },
      ],
    },
    {
      title: 'Streaming windows',
      entries: [
        {
          label: 'Read the subscription',
          code: `import json
import apache_beam as beam
from apache_beam.transforms.window import FixedWindows

def parse(raw):
    return json.loads(raw.decode("utf-8"))

(p
 | beam.io.ReadFromPubSub(subscription="projects/lake-dev/subscriptions/orders-dataflow")
 | beam.Map(parse))`,
        },
        {
          label: 'One-minute windows',
          code: `| beam.WindowInto(FixedWindows(60))`,
        },
        {
          label: 'Streaming flag',
          code: `python orders_stream.py --runner DataflowRunner --project lake-dev --region us-central1 --temp_location gs://lake-dev-tmp/temp --streaming --service_account_email etl@lake-dev.iam.gserviceaccount.com`,
        },
      ],
    },
    {
      title: 'Cloud Composer',
      entries: [
        {
          label: 'DAG',
          code: `from datetime import datetime, timedelta
from airflow import DAG
from airflow.providers.google.cloud.operators.bigquery import BigQueryInsertJobOperator

with DAG(
    "nightly_orders",
    start_date=datetime(2026, 3, 1),
    schedule="@daily",
    catchup=False,
    default_args={"retries": 2, "retry_delay": timedelta(minutes=5)},
) as dag:
    load = BigQueryInsertJobOperator(
        task_id="load_orders",
        location="US",
        configuration={"query": {
            "query": "SELECT 1",
            "useLegacySql": False,
        }},
    )`,
        },
        {
          label: 'Order the tasks',
          code: `extract >> load
# load runs only after extract succeeds`,
        },
        {
          label: 'Query uses the run date',
          code: `"query": "SELECT * FROM lake.orders_ext WHERE dt = DATE '{{ ds }}'"
# {{ ds }} is the Airflow logical date, not a date baked into the file`,
        },
        {
          label: 'Trigger from gcloud',
          code: `gcloud composer environments run lake-dev --location us-central1 dags trigger -- nightly_orders`,
        },
      ],
    },
    {
      title: 'Cloud Pub/Sub',
      entries: [
        {
          label: 'Topic and subscription',
          code: `gcloud pubsub topics create orders
gcloud pubsub subscriptions create orders-pull --topic=orders --ack-deadline=60`,
        },
        {
          label: 'Publish',
          code: `gcloud pubsub topics publish orders --message='{"order_id":"1042","amount":19.5}'`,
        },
        {
          label: 'Pull and ack',
          note: 'a second subscription still has the message',
          code: `gcloud pubsub subscriptions pull orders-pull --auto-ack --limit=10
# ack only after the write succeeds; otherwise the message is redelivered`,
        },
        {
          label: 'Dead letter',
          code: `gcloud pubsub topics create orders-dead
gcloud pubsub subscriptions create orders-dataflow --topic=orders --ack-deadline=60 --dead-letter-topic=orders-dead --max-delivery-attempts=5
# the Pub/Sub service agent needs publisher on orders-dead`,
        },
      ],
    },
    {
      title: 'Pub/Sub to BigQuery',
      entries: [
        {
          label: 'Landing table',
          note: 'schemaless payload',
          code: `CREATE TABLE lake.orders_stream (
  data STRING,
  subscription_name STRING,
  message_id STRING,
  publish_time TIMESTAMP
);`,
        },
        {
          label: 'BigQuery subscription',
          code: `gcloud pubsub subscriptions create orders-bq --topic=orders --bigquery-table=lake-dev:lake.orders_stream --write-metadata --drop-unknown-fields`,
        },
        {
          label: 'Read the payload',
          code: `SELECT
  JSON_VALUE(data, '$.order_id') AS order_id,
  publish_time
FROM lake.orders_stream
WHERE publish_time >= TIMESTAMP('2026-03-15');`,
        },
      ],
    },
  ],
  projects: [
    {
      title: 'Partitioned orders table',
      level: 'Beginner',
      build: 'Load one day of Parquet from Cloud Storage into a BigQuery table partitioned by dt, turn on require_partition_filter, and dry-run a query so you can see the bytes it would scan.',
      skills: ['BigQuery partitions', 'bq load', 'dry run'],
    },
    {
      title: 'Orders topic',
      level: 'Beginner',
      build: 'Create a Pub/Sub topic and a pull subscription, publish a few order messages, and pull them with ack. A second subscription on the same topic still receives those messages.',
      skills: ['Pub/Sub topics', 'subscriptions', 'ack'],
    },
    {
      title: 'Composer daily load',
      level: 'Intermediate',
      build: 'A Cloud Composer DAG loads the previous day of files into the partitioned table, then runs a dedupe query. Retries live on the DAG, and the load runs as the environment service account.',
      skills: ['Composer', 'Airflow DAGs', 'BigQuery', 'IAM'],
    },
    {
      title: 'Minute counts',
      level: 'Intermediate',
      build: 'A Dataflow streaming job reads the orders subscription, windows events into one-minute buckets, and writes the counts to BigQuery. Messages that fail five times land on a dead-letter topic.',
      skills: ['Dataflow', 'Beam windows', 'Pub/Sub', 'BigQuery'],
    },
    {
      title: 'Service account only',
      level: 'Advanced',
      build: 'Composer starts a Dataflow batch job as a dedicated service account that can read only the raw bucket and write one dataset. A BigQuery subscription lands the raw stream in a separate table so you can replay it. Workers have no user keys.',
      skills: ['IAM', 'Dataflow', 'Composer', 'Pub/Sub BigQuery subscription'],
    },
  ],
}
