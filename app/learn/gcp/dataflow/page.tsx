import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Cloud Dataflow' }

const beamCode = `# Cloud Dataflow: Apache Beam pipeline — batch processing
# Reads from GCS, transforms, writes to BigQuery

import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions
from apache_beam.io.gcp.bigquery import WriteToBigQuery
import json

options = PipelineOptions([
    '--runner=DataflowRunner',
    '--project=your-project',
    '--region=us-central1',
    '--temp_location=gs://your-bucket/temp',
    '--staging_location=gs://your-bucket/staging',
    '--job_name=bronze-to-silver-sales',
    '--max_num_workers=10',           # Auto-scales up to 10 workers
    '--autoscaling_algorithm=THROUGHPUT_BASED'
])

def parse_csv(line):
    fields = line.split(',')
    return {
        'order_id':       fields[0],
        'customer_id':    fields[1],
        'order_date':     fields[2],
        'product':        fields[3],
        'quantity':       int(fields[4]),
        'unit_price':     float(fields[5]),
        'region':         fields[6].strip().upper(),
    }

def compute_revenue(record):
    record['net_revenue'] = record['quantity'] * record['unit_price']
    return record

def is_valid(record):
    return (record['order_id'] and 
            record['quantity'] > 0 and 
            record['unit_price'] > 0)

# Define the pipeline using the | operator (Beam's pipeline syntax)
with beam.Pipeline(options=options) as pipeline:
    clean_records = (
        pipeline
        | 'Read from GCS Bronze'    >> beam.io.ReadFromText('gs://your-bucket/bronze/sales/2025/03/01/*.csv', skip_header_lines=1)
        | 'Parse CSV'               >> beam.Map(parse_csv)
        | 'Filter Invalid Records'  >> beam.Filter(is_valid)
        | 'Compute Revenue'         >> beam.Map(compute_revenue)
    )
    
    # Write to BigQuery Silver table
    clean_records | 'Write to BigQuery' >> WriteToBigQuery(
        table='your_project:silver.sales',
        write_disposition=beam.io.BigQueryDisposition.WRITE_APPEND,
        create_disposition=beam.io.BigQueryDisposition.CREATE_IF_NEEDED,
    )

print("Dataflow job submitted successfully")`

export default function DataflowPage() {
  return (
    <LearnLayout
      title="Cloud Dataflow"
      description="Cloud Dataflow is GCP's fully managed Apache Beam service. It handles both batch and streaming data processing, auto-scales workers up and down based on workload, and integrates natively with BigQuery, Pub/Sub, and GCS."
      section="Section 02 · GCP Track"
      readTime="14 min read"
      updatedAt="March 2026"
      breadcrumbs={[
        { label: 'GCP Track', href: '/learn/gcp/introduction' },
        { label: 'Cloud Dataflow', href: '/learn/gcp/dataflow' },
      ]}
    >
      <h2 id="what-is-dataflow">Dataflow vs. Databricks and Glue</h2>
      <p>
        Cloud Dataflow is GCP's answer to Azure Databricks and AWS Glue. All three are managed Spark-compatible processing services. The key difference is that Dataflow is built on Apache Beam — an open-source unified model for both batch and streaming pipelines. You write one pipeline in Python or Java and run it as either batch (reading files) or streaming (reading from Pub/Sub) by changing a single configuration option.
      </p>
      <p>
        Dataflow is also truly serverless in the GCP sense — it auto-scales workers up and down mid-job based on throughput, and you pay only for the worker time consumed. No cluster to provision upfront, no idle costs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {[
          { name: 'Batch Processing', color: '#00c2ff', desc: 'Reads files from GCS in bulk. Processes them in parallel across auto-scaled workers. Writes results to BigQuery or GCS. Equivalent to running a Databricks notebook job triggered by ADF.' },
          { name: 'Stream Processing', color: '#00e676', desc: 'Reads live events from Pub/Sub in real time. Applies windowing and aggregations on the fly. Writes micro-batch results to BigQuery. Equivalent to Azure Stream Analytics.' },
        ].map(item => (
          <div key={item.name} className="rounded-xl p-5" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
            <div className="font-display font-semibold text-sm mb-2" style={{ color: item.color }}>{item.name}</div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 id="beam-pipeline">Writing an Apache Beam pipeline for Dataflow</h2>
      <p>
        Beam pipelines use a functional, chained syntax with the pipe operator. Each step transforms a PCollection (parallel collection of data) and passes it to the next step. The pipeline definition is lazy — nothing runs until you execute it with a runner (DataflowRunner for GCP, DirectRunner for local testing).
      </p>
      <CodeBlock code={beamCode} language="python" filename="dataflow_batch_pipeline.py" />

      <Callout type="tip">
        Always test Beam pipelines locally first using DirectRunner before submitting to Dataflow. Local testing runs instantly with no cost — just change the runner from DataflowRunner to DirectRunner and point it at a small local file. Once it works locally, swap back to DataflowRunner and submit.
      </Callout>

      <KeyTakeaways items={[
        'Dataflow is managed Apache Beam on GCP — handles both batch and streaming with the same pipeline code',
        'Apache Beam uses a functional chained syntax with the pipe operator — read, transform, filter, write',
        'Dataflow auto-scales workers up and down mid-job — no cluster sizing, no idle costs',
        'DirectRunner runs Beam pipelines locally for fast testing — switch to DataflowRunner for production',
        'Dataflow integrates natively with BigQuery, Pub/Sub, and GCS — the core GCP data engineering services',
        'One Beam pipeline can run as batch (reading GCS files) or streaming (reading Pub/Sub) by changing the runner config',
      ]} />
    </LearnLayout>
  )
}
