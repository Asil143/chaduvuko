import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Amazon EMR' }

const clusterCode = `# Launch an EMR cluster using AWS CLI
# EMR runs Apache Spark (and Hadoop, Hive, Presto) on EC2

aws emr create-cluster \\
  --name "DataEngineering-Production" \\
  --release-label emr-7.0.0 \\                    # EMR version (includes Spark 3.5)
  --applications Name=Spark Name=Hadoop \\
  --instance-groups \\
    InstanceGroupType=MASTER,InstanceType=m5.xlarge,InstanceCount=1 \\
    InstanceGroupType=CORE,InstanceType=m5.2xlarge,InstanceCount=2 \\
    InstanceGroupType=TASK,InstanceType=m5.2xlarge,InstanceCount=4 \\   # auto-scaling workers
  --use-default-roles \\                           # EMR_EC2_DefaultRole + EMR_DefaultRole
  --ec2-attributes KeyName=your-key-pair \\
  --log-uri s3://your-bucket/emr-logs/ \\
  --auto-terminate \\                              # cluster shuts down after steps complete
  --steps \\
    Type=Spark,Name="Transform Sales Data",\\
    Args=[--deploy-mode,cluster,\\
          --class,com.yourcompany.SalesTransform,\\
          s3://your-bucket/jars/pipeline.jar,\\
          --input,s3://your-bucket/bronze/sales/,\\
          --output,s3://your-bucket/silver/sales/]`

const sparkCode = `# PySpark job submitted to EMR
# Save this as transform.py and upload to S3

from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.types import *
import sys

def main():
    spark = SparkSession.builder \\
        .appName("SalesTransform") \\
        .config("spark.sql.extensions", "org.apache.iceberg.spark.extensions.IcebergSparkSessionExtensions") \\
        .config("spark.sql.catalog.glue_catalog", "org.apache.iceberg.spark.SparkCatalog") \\
        .config("spark.sql.catalog.glue_catalog.catalog-impl", "org.apache.iceberg.aws.glue.GlueCatalog") \\
        .config("spark.sql.catalog.glue_catalog.warehouse", "s3://your-bucket/iceberg/") \\
        .getOrCreate()

    input_path  = sys.argv[1]   # s3://your-bucket/bronze/sales/
    output_path = sys.argv[2]   # s3://your-bucket/silver/sales/

    # Read bronze data from S3
    df = spark.read \\
        .option("header", True) \\
        .option("inferSchema", True) \\
        .csv(input_path)

    # Transform
    df_clean = df \\
        .filter(F.col("order_id").isNotNull()) \\
        .dropDuplicates(["order_id"]) \\
        .withColumn("revenue",    F.col("revenue").cast(DoubleType())) \\
        .withColumn("order_date", F.to_date("order_date", "yyyy-MM-dd")) \\
        .withColumn("year",       F.year("order_date")) \\
        .withColumn("month",      F.month("order_date")) \\
        .withColumn("day",        F.dayofmonth("order_date"))

    # Write to S3 as Parquet with partitioning
    df_clean.write \\
        .format("parquet") \\
        .mode("overwrite") \\
        .partitionBy("year", "month", "day") \\
        .save(output_path)

    print(f"Written {df_clean.count()} rows to {output_path}")
    spark.stop()

if __name__ == "__main__":
    main()`

const stepFunctionCode = `# Submit a Spark step to a running EMR cluster
# EMR Steps = individual jobs submitted to the cluster queue

import boto3

emr = boto3.client('emr', region_name='us-east-1')

response = emr.add_job_flow_steps(
    JobFlowId='j-YOURCLUSTERID',
    Steps=[
        {
            'Name': 'Transform Sales Data',
            'ActionOnFailure': 'CONTINUE',   # or TERMINATE_CLUSTER
            'HadoopJarStep': {
                'Jar': 'command-runner.jar',
                'Args': [
                    'spark-submit',
                    '--deploy-mode', 'cluster',
                    '--master', 'yarn',
                    '--executor-memory', '8G',
                    '--executor-cores', '4',
                    '--num-executors', '10',
                    's3://your-bucket/scripts/transform.py',
                    's3://your-bucket/bronze/sales/2025/03/15/',
                    's3://your-bucket/silver/sales/'
                ]
            }
        }
    ]
)
print(f"Step submitted: {response['StepIds']}")`

const nodeTypes = [
  { type: 'Master Node',  icon: '👑', color: '#ff9900', desc: 'Coordinates the cluster. Runs the YARN ResourceManager and HDFS NameNode. One per cluster. If this fails, the cluster fails — use Multi-Master for production.' },
  { type: 'Core Node',    icon: '💾', color: '#0078d4', desc: 'Runs YARN NodeManager and stores HDFS data. Adding/removing core nodes is risky during jobs. Use for stable baseline capacity.' },
  { type: 'Task Node',    icon: '⚡', color: '#00e676', desc: 'Runs YARN NodeManager only — no HDFS storage. Safe to add/remove anytime. Use Spot instances here for 70% cost savings.' },
]

const emrVsDatabricks = [
  { aspect: 'Cost',        emr: 'Lower — EC2 + EMR fee only',          databricks: 'Higher — Databricks Units (DBUs) on top of EC2' },
  { aspect: 'Setup',       emr: 'More configuration required',          databricks: 'Managed, minimal configuration' },
  { aspect: 'Notebooks',   emr: 'EMR Studio (limited)',                 databricks: 'Full collaborative notebook environment' },
  { aspect: 'Delta Lake',  emr: 'Supported but not default',            databricks: 'Native, first-class support' },
  { aspect: 'Auto-scaling',emr: 'Managed scaling available',            databricks: 'Built-in, seamless' },
  { aspect: 'ML support',  emr: 'Manual setup required',                databricks: 'MLflow built in' },
  { aspect: 'Best for',    emr: 'Cost-sensitive, ops-heavy teams',      databricks: 'Productivity-focused teams' },
]

export default function EMRPage() {
  return (
    <LearnLayout
      title="Amazon EMR"
      description="Amazon EMR (Elastic MapReduce) is AWS managed big data platform. It runs Apache Spark, Hadoop, Hive, and Presto on EC2 clusters. EMR is the lower-cost alternative to Databricks for teams that want Spark without the premium."
      section="Section 03 · AWS Track"
      readTime="13 min read"
      updatedAt="March 2026"
      breadcrumbs={[
        { label: 'AWS Track', href: '/learn/aws/introduction' },
        { label: 'Amazon EMR', href: '/learn/aws/emr' },
      ]}
      prev={{ title: 'Amazon Athena', href: '/learn/aws/athena' }}
      next={{ title: 'AWS Step Functions', href: '/learn/aws/step-functions' }}
    >
      <h2>What is Amazon EMR?</h2>
      <p>
        EMR provisions and manages clusters of EC2 instances running big data frameworks — primarily Apache Spark. You define the cluster size, submit Spark jobs, and EMR handles provisioning, configuration, monitoring, and termination.
      </p>
      <p>
        The core value of EMR over Databricks is cost. EMR charges the EC2 instance price plus a small EMR management fee. Databricks charges EC2 plus Databricks Unit (DBU) fees on top — often 2-3x more expensive for equivalent compute. For teams running large, long-running batch jobs, EMR saves significant money.
      </p>

      <Callout type="info" label="EMR on EC2 vs EMR Serverless">
        EMR on EC2 gives you full cluster control — instance types, Spark configs, cluster lifetime. EMR Serverless is the newer, managed option — you submit jobs without provisioning a cluster. EMR Serverless is simpler but less configurable. Start with EMR on EC2 to learn the concepts.
      </Callout>

      <h2>Cluster Node Types</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
        {nodeTypes.map(n => (
          <div key={n.type} className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: `1px solid ${n.color}30` }}>
            <div className="text-lg mb-2">{n.icon}</div>
            <div className="text-xs font-mono font-bold mb-1" style={{ color: n.color }}>{n.type}</div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text2)' }}>{n.desc}</p>
          </div>
        ))}
      </div>

      <h2>Launching a Cluster with a Spark Job</h2>
      <CodeBlock code={clusterCode} language="bash" filename="launch_emr_cluster.sh" />

      <Callout type="tip" label="Use Spot instances on Task nodes">
        Task nodes do not store HDFS data — they are safe to terminate mid-job (Spark will retry failed tasks). Run Task nodes on Spot instances for 60-70% cost savings. Run Master and Core nodes on On-Demand for stability.
      </Callout>

      <h2>PySpark Job for EMR</h2>
      <p>
        EMR PySpark code is identical to Databricks PySpark — same API, same functions. The only difference is how you configure the SparkSession and how you submit the job.
      </p>
      <CodeBlock code={sparkCode} language="python" filename="transform.py" />

      <h2>Submitting Steps to a Running Cluster</h2>
      <CodeBlock code={stepFunctionCode} language="python" filename="submit_step.py" />

      <h2>EMR vs Databricks</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              {['Aspect', 'EMR', 'Databricks'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-mono uppercase" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {emrVsDatabricks.map((r, i) => (
              <tr key={r.aspect} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--surface)' : 'transparent' }}>
                <td className="py-3 px-4 text-xs font-semibold" style={{ color: 'var(--text)' }}>{r.aspect}</td>
                <td className="py-3 px-4 text-xs" style={{ color: 'var(--text2)' }}>{r.emr}</td>
                <td className="py-3 px-4 text-xs" style={{ color: 'var(--text2)' }}>{r.databricks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <KeyTakeaways items={[
        'EMR runs Apache Spark on EC2 — same Spark code as Databricks, lower cost',
        'Three node types: Master (coordinator), Core (storage + compute), Task (compute only)',
        'Run Task nodes on Spot instances for 60-70% cost savings — they are safe to interrupt',
        'EMR Steps are individual Spark jobs submitted to the cluster queue',
        'EMR Serverless removes cluster management — submit jobs without provisioning',
        'Choose EMR over Databricks when cost matters more than developer productivity',
      ]} />
    </LearnLayout>
  )
}