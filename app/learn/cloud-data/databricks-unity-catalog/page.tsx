import { WithLessonNav } from '@/components/content/WithLessonNav'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Databricks and Unity Catalog' }

const hierarchy = `Metastore
└── Catalog (for example: analytics)
    └── Schema (for example: sales)
        ├── Table (for example: orders)
        ├── View
        └── Function

Workspace users and groups receive privileges on governed objects.
External locations connect governed storage paths to cloud object storage.`

const sqlCode = `-- Use a fully qualified name: catalog.schema.table
SELECT region, COUNT(*) AS order_count, SUM(net_amount) AS revenue
FROM analytics.sales.orders
WHERE order_date >= DATE '2026-01-01'
GROUP BY region
ORDER BY revenue DESC;

-- A data owner grants only the required query privilege.
GRANT SELECT ON TABLE analytics.sales.orders TO analyst_group;

-- Review grants and ownership in the platform's governance interface
-- before exposing the table to another team.`

const pipelineCode = `# Example Spark transformation. A Spark session is provided by the job runtime.
from pyspark.sql import functions as F

orders = spark.read.format("delta").table("analytics.bronze.orders")
clean = (
    orders
    .filter(F.col("order_id").isNotNull())
    .filter(F.col("net_amount") >= 0)
    .withColumn("order_date", F.to_date("created_at"))
)

(clean.write
    .format("delta")
    .mode("append")
    .saveAsTable("analytics.silver.orders"))`

export default function DatabricksUnityCatalogPage() {
  return (
    <WithLessonNav href="/learn/cloud-data/databricks-unity-catalog">
      <LearnLayout
        title="Databricks and Unity Catalog"
        description="Understand Databricks as a cloud-hosted lakehouse platform and Unity Catalog as its centralized governance layer, without tying the concepts to a single provider."
        section="Cloud Data Platforms · Platform-neutral Tools"
        readTime="16 min"
        breadcrumbs={[
          { label: 'Cloud Data Platforms', href: '/learn/cloud-data' },
          { label: 'Databricks and Unity Catalog', href: '/learn/cloud-data/databricks-unity-catalog' },
        ]}
      >
        <h2>Prerequisites and objective</h2>
        <p>Know the basics of object storage, tables, SQL, and distributed processing. This lesson focuses on the platform and governance concepts, not on a specific Azure, AWS, or Google Cloud deployment procedure.</p>
        <p>You will be able to describe the lakehouse workload model, read a Unity Catalog object hierarchy, write a qualified table name, and explain how identity and storage permissions fit together.</p>

        <h2>Databricks is a platform, not a cloud provider</h2>
        <p>Databricks supplies a collaborative data and AI platform that can run with supported cloud providers. Teams use it for notebooks, jobs, SQL analytics, Spark processing, and lakehouse data management. The underlying cloud still supplies networking, object storage, identity, and billing boundaries. Workspace setup and feature availability vary by cloud and account configuration, so verify deployment-specific instructions in current product documentation.</p>
        <p>A lakehouse organizes data in open storage formats while adding table management, transactional behavior, and query services. A typical journey lands raw records, validates and transforms them, then publishes tables for analytics. A workspace is where people develop and operate workloads; it is not itself a substitute for an organization-wide data model.</p>
        <Callout type="info">“Platform-neutral” here means the architecture and governance ideas apply across cloud deployments. Unity Catalog is a Databricks product; exact integrations and setup steps are not identical on every provider.</Callout>

        <h2>Unity Catalog's governance hierarchy</h2>
        <p>Unity Catalog organizes securable objects into a hierarchy. Catalogs and schemas help create administrative boundaries, while tables, views, volumes, and functions represent governed assets. Use clear names that signal ownership and data domain rather than making one catalog per notebook.</p>
        <CodeBlock language="text" filename="unity-catalog-hierarchy.txt" code={hierarchy} />
        <p>External locations are governed references to storage paths and their cloud credentials. A principal that can query a table does not automatically need broad direct access to every object in the storage account. Keep the platform permission model and cloud storage permissions aligned, and grant only the needed operations.</p>

        <h2>Read governed data using SQL</h2>
        <p>Fully qualified names make ownership and environment boundaries explicit. A data team can publish a stable table for analysts while keeping transformation details in its own schemas.</p>
        <CodeBlock language="sql" filename="governed_query.sql" code={sqlCode} />
        <Callout type="warning">A SQL grant is not a replacement for cloud IAM. Validate the full path: workspace identity, catalog privileges, external-location access, network reachability, and the storage policy.</Callout>

        <h2>Build a simple transformation path</h2>
        <p>The following example rejects unusable records, derives a date, and appends cleaned data to a managed table. Production work should also validate schema changes, deduplicate retries, define a backfill plan, and make writes safe to rerun.</p>
        <CodeBlock language="python" filename="clean_orders.py" code={pipelineCode} />
        <p>Keep source, cleaned, and consumer-facing tables separated by access and lifecycle expectations. A job identity typically needs read access to its inputs and write access only to its output, rather than broad administrator privileges.</p>

        <h2>Common mistakes</h2>
        <ul>
          <li><strong>Calling Unity Catalog cloud-neutral:</strong> it is a Databricks governance product, even though its concepts are useful across supported cloud deployments. Separate the general pattern from provider-specific setup.</li>
          <li><strong>Granting workspace admin for convenience:</strong> broad roles make changes hard to audit. Use groups, data ownership, and narrow privileges.</li>
          <li><strong>Confusing a catalog with a storage bucket:</strong> a catalog is a governed namespace, not necessarily a physical directory. Map it to data ownership intentionally.</li>
          <li><strong>Ignoring cloud permissions:</strong> catalog-level permissions alone may not grant the underlying storage access. Review both authorization layers.</li>
        </ul>

        <h2>Practice</h2>
        <ol>
          <li>Design catalogs and schemas for a retailer's raw sales, cleaned orders, and finance reporting domains.</li>
          <li>Write a fully qualified query for a table named daily_revenue in a finance schema.</li>
          <li>Describe the smallest permissions a scheduled transformation needs on its input and output.</li>
          <li>Draw how a user's identity, a catalog privilege, an external location, and object storage relate.</li>
        </ol>
        <p><strong>Hint:</strong> Separate who may discover/query an asset from which runtime identity can read or write its backing objects.</p>

        <KeyTakeaways items={[
          'Databricks provides collaborative lakehouse workloads on supported cloud infrastructure.',
          'Unity Catalog organizes governed assets with a metastore, catalogs, schemas, and securable objects.',
          'Use qualified names, clear ownership, groups, and least-privilege grants.',
          'Catalog authorization and cloud storage authorization must both be considered.',
          'Treat concepts as portable, but confirm provider-specific features and setup in current documentation.',
        ]} />
      </LearnLayout>
    </WithLessonNav>
  )
}
