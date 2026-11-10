import { WithLessonNav } from '@/components/content/WithLessonNav'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Google Cloud Storage and Dataproc' }

const layoutCode = `gs://acme-data-lake/
├── bronze/orders/ingest_date=2026-11-09/part-000.parquet
├── silver/orders/order_date=2026-11-09/part-000.parquet
└── checkpoints/orders-stream/`

const sparkCode = `from pyspark.sql import SparkSession
from pyspark.sql import functions as F

spark = SparkSession.builder.appName("clean-orders").getOrCreate()

raw = spark.read.parquet(
    "gs://acme-data-lake/bronze/orders/ingest_date=2026-11-09/"
)
clean = (
    raw.filter(F.col("order_id").isNotNull())
       .filter(F.col("amount").isNotNull() & (F.col("amount") >= 0))
       .withColumn("order_date", F.to_date("created_at"))
)

(clean.write
     .mode("overwrite")
     .partitionBy("order_date")
     .parquet("gs://acme-data-lake/silver/orders/"))

spark.stop()`

const checklistCode = `Before a Dataproc job runs:
  [ ] The job identity can read the source prefix
  [ ] It can write only the intended destination and temporary paths
  [ ] The region and network can reach required data and services
  [ ] Input and output formats and partition strategy are agreed
  [ ] Logs, retries, and cleanup are observable
  [ ] A small test dataset has validated the transformation`

export default function GcsDataprocPage() {
  return (
    <WithLessonNav href="/learn/gcp/gcs-dataproc">
      <LearnLayout
        title="Google Cloud Storage and Dataproc"
        description="Use Cloud Storage as durable object storage and Dataproc as managed Spark/Hadoop compute for a practical Google Cloud batch pipeline."
        section="Cloud Data Platforms · Google Cloud"
        readTime="15 min"
        breadcrumbs={[
          { label: 'Cloud Data Platforms', href: '/learn/cloud-data' },
          { label: 'Google Cloud', href: '/learn/gcp/introduction' },
          { label: 'Cloud Storage and Dataproc', href: '/learn/gcp/gcs-dataproc' },
        ]}
      >
        <h2>Prerequisites and objective</h2>
        <p>Know the basics of object storage, Parquet, Spark DataFrames, and batch processing. At the end, you should be able to sketch a GCS-to-Dataproc-to-GCS flow, explain job identity and permissions, and identify the operational checks required before production.</p>

        <h2>Cloud Storage as a data lake</h2>
        <p>Google Cloud Storage (GCS, commonly called Cloud Storage) stores objects in buckets. Object names can look like nested folders, but organize a lake around stable prefixes and data semantics rather than treating it as a local filesystem. Use separate prefixes or buckets for raw, cleaned, and curated data according to your access and lifecycle boundaries.</p>
        <CodeBlock language="text" filename="gcs-layout.txt" code={layoutCode} />
        <p>Choose formats based on workload: Parquet is columnar and useful for analytics; CSV is convenient for exchange but weaker for schema and efficient scanning. Partition only on columns that help common reads, and avoid generating huge numbers of tiny objects. Retention and deletion controls should follow the data's business and legal requirements.</p>
        <Callout type="tip">Use workload identities or an attached service identity for jobs instead of embedding long-lived service-account keys in notebooks or source control.</Callout>

        <h2>Dataproc for managed Spark processing</h2>
        <p>Dataproc provides managed cluster-based services for Spark and Hadoop workloads. It is useful when existing Spark applications, libraries, or operational controls matter. It differs from Dataflow, which executes Apache Beam pipelines; choose the programming model that matches the workload and team's skills.</p>
        <p>In a common batch pattern, a Dataproc Spark job reads a bounded GCS prefix, validates and transforms records, and writes a new output prefix. The job runtime needs compatible Google Cloud connectors and permissions; managed environments configure integrations, while a local Spark environment may require additional setup.</p>
        <CodeBlock language="python" filename="clean_orders.py" code={sparkCode} />
        <p>The example uses overwrite for a compact demonstration. For incremental production processing, design partition replacement or idempotent writes so a retry does not duplicate records or erase unrelated partitions.</p>

        <h2>Make the job safe to operate</h2>
        <p>Separate the job's source, output, temporary, and checkpoint paths. Use a dedicated service identity with only the required bucket and object permissions. Constrain the network path to approved services, record structured logs, and retain enough metadata to trace an output partition to its input and job run.</p>
        <CodeBlock language="text" filename="job-review.txt" code={checklistCode} />
        <Callout type="warning">Do not give a processing job broad project-level access just to make a failed read succeed. Identify the exact principal, resource, action, and network path that failed, then adjust the narrowest applicable policy.</Callout>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Assuming GCS is a mounted filesystem:</strong> object storage has different listing, rename, and consistency operations. Use supported connectors and avoid filesystem assumptions.</li>
          <li><strong>Mixing raw and transformed data:</strong> overwrites can destroy recoverability. Keep original inputs and publish transformed outputs separately.</li>
          <li><strong>Over-partitioning:</strong> one tiny file per key creates planning overhead. Choose useful partition grain and compact outputs when the workload calls for it.</li>
          <li><strong>Using a human credential for scheduled jobs:</strong> ownership and rotation become fragile. Assign an application identity and review its permissions.</li>
        </ul>

        <h2>Practice</h2>
        <ol>
          <li>Design GCS prefixes for immutable raw orders, cleaned orders, and a daily aggregate.</li>
          <li>Explain when Dataproc Spark is a better fit than a Beam/Dataflow pipeline for a team with existing Spark jobs.</li>
          <li>List the minimal permissions and paths for a job that reads bronze and writes silver.</li>
          <li>Change the sample pipeline design to safely rerun one date without overwriting other dates.</li>
        </ol>
        <p><strong>Hint:</strong> Explicitly identify the job identity, input prefix, output prefix, and retry behavior.</p>

        <KeyTakeaways items={[
          'Cloud Storage is GCP object storage and can serve as the data-lake foundation.',
          'Dataproc runs managed Spark/Hadoop workloads; Dataflow runs Apache Beam pipelines.',
          'Use separate prefixes and carefully chosen formats and partitions for each data stage.',
          'Give each job identity narrowly scoped access to its inputs and outputs.',
          'Design idempotent writes, logs, network reachability, and cleanup before production.',
        ]} />
      </LearnLayout>
    </WithLessonNav>
  )
}
