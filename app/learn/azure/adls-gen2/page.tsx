import { LearnLayout } from '@/components/content/LearnLayout'
import { CodeBlock } from '@/components/content/CodeBlock'

export const metadata = { title: 'ADLS Gen2 — Azure Data Lake Storage — Asil' }

export default function ADLSPage() {
  return (
    <LearnLayout
      title="Azure Data Lake Storage Gen2 (ADLS Gen2)"
      description="ADLS Gen2 is where all your data lives on Azure. Your Bronze, Silver, and Gold layers all sit here. Understanding how it is structured, how access works, and how to partition data well is foundational for everything else."
      section="Azure Track"
      readTime="15 min"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'Azure', href: '/learn/azure/introduction' },
        { label: 'ADLS Gen2', href: '/learn/azure/adls-gen2' },
      ]}
    >
      <h2>What ADLS Gen2 actually is</h2>
      <p>
        ADLS Gen2 is Azure's data lake storage. It is built on top of Azure Blob Storage but with one key addition: a hierarchical namespace. That means you get real folders, not just key names that look like folder paths.
      </p>
      <p>
        This matters because operations like renaming a folder or listing files in a directory are fast and atomic — critical for data pipelines that need to write data reliably.
      </p>
      <p>
        When you create a storage account in Azure, you enable hierarchical namespace to turn regular Blob Storage into ADLS Gen2. That is the difference.
      </p>

      <h2>How to structure your containers</h2>
      <p>
        A container is like a root-level folder. The standard Medallion setup uses three containers — one per layer.
      </p>
      <CodeBlock language="text" filename="ADLS container structure" code={`Storage Account: yourcompanydatalake
├── bronze/                  ← raw data, never modified
│   └── sales/
│       └── date=2025-03-01/
│           └── sales.csv
├── silver/                  ← cleaned, validated Delta tables
│   └── orders/
│       └── date=2025-03-01/
│           └── part-00000.parquet
└── gold/                    ← aggregated, business-ready
    ├── daily_sales_summary/
    ├── customer_ltv/
    └── regional_performance/`} />
      <p>
        Partition by date at the Bronze level. This means when ADF or Databricks needs to reprocess a specific day, it reads only that partition instead of scanning the entire container.
      </p>

      <h2>Access control — how to do it correctly</h2>
      <p>
        Never use storage account access keys in production. If those keys leak, someone has full access to all your data. Always use one of these instead.
      </p>
      <p>
        <strong>Managed Identity</strong> — the cleanest approach. Your Databricks cluster or ADF pipeline gets an identity automatically. You grant that identity access to ADLS using RBAC. No keys, no credentials, no secrets to rotate.
      </p>
      <p>
        <strong>Service Principal</strong> — you create an app registration in Entra ID (formerly Azure AD), generate a client secret, and store that secret in Azure Key Vault. Your pipeline reads the secret from Key Vault at runtime. Never in code, never in config files.
      </p>

      <h2>Mounting ADLS in Databricks</h2>
      <p>
        When you mount ADLS in Databricks, you can access it using familiar file paths instead of the full ABFS URL. You do this once and then every notebook can use the short path.
      </p>
      <CodeBlock language="python" filename="mount_adls.py" code={`# Mount using Service Principal (credentials stored in Key Vault)
configs = {
  "fs.azure.account.auth.type": "OAuth",
  "fs.azure.account.oauth.provider.type": "org.apache.hadoop.fs.azurebfs.oauth2.ClientCredsTokenProvider",
  "fs.azure.account.oauth2.client.id": dbutils.secrets.get(scope="keyvault", key="sp-client-id"),
  "fs.azure.account.oauth2.client.secret": dbutils.secrets.get(scope="keyvault", key="sp-client-secret"),
  "fs.azure.account.oauth2.client.endpoint": "https://login.microsoftonline.com/<tenant-id>/oauth2/token",
}

dbutils.fs.mount(
  source="abfss://bronze@yourcompanydatalake.dfs.core.windows.net/",
  mount_point="/mnt/bronze",
  extra_configs=configs
)

# After mounting, use simple paths in all notebooks
df = spark.read.parquet("/mnt/bronze/sales/date=2025-03-01/")
df.write.format("delta").save("/mnt/silver/orders/")`} />

      <h2>Partitioning strategy — this matters a lot</h2>
      <p>
        Partitioning is how you organize data so that queries only read the files they need. A poorly partitioned data lake forces every query to scan every file.
      </p>
      <p>
        The most common partition column is date. But the right choice depends on how data is queried.
      </p>
      <CodeBlock language="python" filename="partitioning.py" code={`# Partition Bronze by load date (when the file arrived)
df.write \
  .partitionBy("load_date") \
  .mode("append") \
  .parquet("/mnt/bronze/orders/")

# Partition Silver by order date (when the order happened)
df.write \
  .format("delta") \
  .partitionBy("order_date") \
  .mode("overwrite") \
  .save("/mnt/silver/orders/")

# Partition Gold by month (analysts rarely need daily grain in Gold)
df.write \
  .format("delta") \
  .partitionBy("year_month") \
  .mode("overwrite") \
  .save("/mnt/gold/daily_sales_summary/")`} />

      <h2>Lifecycle management — how to cut storage costs</h2>
      <p>
        Bronze data is accessed frequently when it is new, then almost never after 30 days. Azure lets you automatically move it to cheaper storage tiers based on age.
      </p>
      <p>
        In the Azure Portal, go to your Storage Account → Lifecycle Management → Add Rule. Set Bronze files older than 30 days to move to Cool tier, and files older than 90 days to move to Archive tier. This alone can cut your storage bill by 60-70% on a large data lake.
      </p>
      <p>
        Silver and Gold should stay in Hot tier because analysts query them regularly. Only move Bronze.
      </p>

      <h2>The difference between Gen1 and Gen2</h2>
      <p>
        ADLS Gen1 is deprecated. It still exists but Microsoft is shutting it down. If you see Gen1 in a job description or on a project, that is a legacy system. Gen2 is what all new projects use. You do not need to learn Gen1.
      </p>
    </LearnLayout>
  )
}