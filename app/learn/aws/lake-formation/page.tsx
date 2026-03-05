import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'AWS Lake Formation' }

const registerCode = `# Register S3 locations and create a data lake using boto3
import boto3

lf = boto3.client('lakeformation', region_name='us-east-1')

# Step 1: Register S3 bucket as a Lake Formation data lake location
lf.register_resource(
    ResourceArn='arn:aws:s3:::your-data-lake-bucket',
    UseServiceLinkedRole=True   # Lake Formation manages IAM automatically
)

# Step 2: Create a database in the Glue Catalog (Lake Formation manages access)
glue = boto3.client('glue', region_name='us-east-1')
glue.create_database(
    DatabaseInput={
        'Name':        'sales_silver',
        'Description': 'Cleaned and validated sales data — Silver layer',
        'LocationUri': 's3://your-data-lake-bucket/silver/sales/'
    }
)

# Step 3: Grant permissions to a data analyst IAM user
lf.grant_permissions(
    Principal={
        'DataLakePrincipalIdentifier': 'arn:aws:iam::123456:user/data-analyst-john'
    },
    Resource={
        'Table': {
            'DatabaseName': 'sales_silver',
            'TableWildcard': {}   # all tables in this database
        }
    },
    Permissions=['SELECT'],           # read-only
    PermissionsWithGrantOption=[]     # cannot grant to others
)

print("Lake Formation setup complete")`

const columnLevelCode = `-- Column-level security with Lake Formation
-- Analysts can query the table but cannot see PII columns

-- Grant SELECT on specific columns only
-- (done via Lake Formation console or API — not SQL)
-- Principal: arn:aws:iam::123456:role/AnalystRole
-- Resource: sales_silver.orders
-- Columns allowed: order_id, product_id, region, revenue, order_date
-- Columns EXCLUDED: customer_email, customer_phone, customer_address

-- When the analyst runs this query — it works:
SELECT order_id, region, revenue, order_date
FROM sales_silver.orders
WHERE order_date >= '2025-01-01';

-- When the analyst runs this — ACCESS DENIED:
SELECT customer_email, revenue
FROM sales_silver.orders;
-- Error: User does not have SELECT permission on column customer_email

-- Row-level security — analysts only see their region:
-- Lake Formation data filter: region = 'US-WEST'
-- Analyst in West team only ever sees West region rows
-- Even SELECT * returns only their permitted rows`

const tagCode = `# LF-Tags (Lake Formation Tag-Based Access Control)
# Tag data assets, then grant permissions based on tags
# Much easier to manage than granting per-table/per-column

import boto3
lf = boto3.client('lakeformation', region_name='us-east-1')

# Create tags
lf.create_lf_tag(TagKey='sensitivity', TagValues=['public', 'internal', 'confidential', 'pii'])
lf.create_lf_tag(TagKey='domain',      TagValues=['sales', 'hr', 'finance', 'marketing'])

# Tag a database
lf.add_lf_tags_to_resource(
    Resource={ 'Database': { 'Name': 'hr_silver' } },
    LFTags=[
        { 'TagKey': 'sensitivity', 'TagValues': ['confidential'] },
        { 'TagKey': 'domain',      'TagValues': ['hr'] }
    ]
)

# Grant access based on tags — not individual resources
# HR analysts get access to ALL assets tagged domain=hr, sensitivity=internal
lf.grant_permissions(
    Principal={ 'DataLakePrincipalIdentifier': 'arn:aws:iam::123456:role/HRAnalystRole' },
    Resource={
        'LFTagPolicy': {
            'ResourceType': 'TABLE',
            'Expression': [
                { 'TagKey': 'domain',      'TagValues': ['hr'] },
                { 'TagKey': 'sensitivity', 'TagValues': ['internal', 'public'] }
            ]
        }
    },
    Permissions=['SELECT']
)
# Now adding a new HR table? Just tag it domain=hr — permissions apply automatically`

const concepts = [
  { term: 'Data Lake Admin',     color: '#ff9900', desc: 'The IAM principal that manages Lake Formation. Can register S3 locations, create databases, and grant permissions to others. Usually a data platform team role.' },
  { term: 'Database / Table',    color: '#00c2ff', desc: 'Metadata registered in the AWS Glue Data Catalog. Lake Formation secures access to these — not to the underlying S3 files directly.' },
  { term: 'LF-Tags',             color: '#7b61ff', desc: 'Tag-based access control. Tag databases, tables, and columns with key-value pairs, then grant permissions based on tags instead of individual resources.' },
  { term: 'Data Filters',        color: '#00e676', desc: 'Row and column level security. Define which rows and columns a principal can see. Filters apply transparently — the user sees a restricted view.' },
  { term: 'Governed Tables',     color: '#f5c542', desc: 'Lake Formation managed tables with ACID transactions, automatic compaction, and row-level security built in — similar to Iceberg but AWS-native.' },
  { term: 'Cross-account access',color: '#ff6b6b', desc: 'Share specific tables from your Lake Formation catalog with other AWS accounts without copying data. The data stays in your S3 bucket.' },
]

export default function LakeFormationPage() {
  return (
    <LearnLayout
      title="AWS Lake Formation"
      description="Lake Formation is the AWS data governance and security layer for your data lake. It controls who can access which databases, tables, columns, and rows in your S3-based data lake — replacing complex IAM and S3 bucket policies with a centralized, fine-grained permission system."
      section="Section 03 · AWS Track"
      readTime="12 min read"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'AWS Track', href: '/learn/aws/introduction' },
        { label: 'AWS Lake Formation', href: '/learn/aws/lake-formation' },
      ]}
      prev={{ title: 'AWS Step Functions', href: '/learn/aws/step-functions' }}
      next={{ title: 'GCP Introduction', href: '/learn/gcp/introduction' }}
    >
      <h2>What is AWS Lake Formation?</h2>
      <p>
        Before Lake Formation, securing a data lake meant writing complex IAM policies and S3 bucket policies for every user and team. A data analyst needed access to one table in one database — you wrote a policy granting S3 GetObject on a specific prefix, Glue GetTable on that table, and Athena access. Multiply this by dozens of analysts, dozens of tables, and it became unmanageable.
      </p>
      <p>
        Lake Formation replaces all of that with a single permission model. You grant access at the database, table, column, or row level through Lake Formation — it translates those permissions into the underlying IAM and S3 policies automatically.
      </p>

      <Callout type="info" title="Lake Formation vs S3 + IAM">
        Without Lake Formation: grant S3 permissions + Glue permissions + Athena permissions separately for every user. With Lake Formation: grant SELECT on a table once — Lake Formation handles everything else. One place to manage, audit, and revoke access.
      </Callout>

      <h2>Core Concepts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
        {concepts.map(c => (
          <div key={c.term} className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: `1px solid ${c.color}30` }}>
            <div className="text-xs font-mono font-bold mb-1" style={{ color: c.color }}>{c.term}</div>
            <p className="text-sm" style={{ color: 'var(--text2)' }}>{c.desc}</p>
          </div>
        ))}
      </div>

      <h2>Setting Up Lake Formation</h2>
      <p>
        The setup process: register your S3 bucket as a data lake location, create databases in the Glue Catalog, then grant table-level permissions to IAM users and roles. Lake Formation handles the underlying S3 and Glue permissions automatically.
      </p>
      <CodeBlock code={registerCode} language="python" filename="setup_lake_formation.py" />

      <h2>Column-Level and Row-Level Security</h2>
      <p>
        Lake Formation data filters apply transparently. An analyst running SELECT * on an orders table only sees the columns and rows they are permitted to see — even if they write unrestricted SQL.
      </p>
      <CodeBlock code={columnLevelCode} language="sql" filename="column_row_security.sql" />

      <Callout type="tip" title="Column security for PII compliance">
        Column-level security is the correct way to handle PII in a shared data lake. Raw customer data (email, phone, address) lands in Bronze. Silver strips or masks PII columns. Lake Formation prevents anyone without explicit column permission from querying the raw columns — even if they have table access.
      </Callout>

      <h2>LF-Tags — Scale Access Control</h2>
      <p>
        Granting permissions per table does not scale. LF-Tags let you tag data assets with metadata (domain, sensitivity) and grant permissions based on those tags. Add a new table — just tag it, permissions apply automatically.
      </p>
      <CodeBlock code={tagCode} language="python" filename="lf_tags.py" />

      <h2>How Lake Formation Fits in the AWS Stack</h2>
      <div className="my-6 p-5 rounded-xl font-mono text-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="space-y-3" style={{ color: 'var(--text2)' }}>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded text-xs" style={{ background: '#ff990015', color: '#ff9900' }}>S3</span>
            <span className="text-xs" style={{ color: 'var(--muted)' }}>— physical storage (Lake Formation registers and secures S3 locations)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded text-xs" style={{ background: '#00c2ff15', color: '#00c2ff' }}>Glue Catalog</span>
            <span className="text-xs" style={{ color: 'var(--muted)' }}>— schema registry (Lake Formation secures access to catalog objects)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded text-xs" style={{ background: '#7b61ff15', color: '#7b61ff' }}>Lake Formation</span>
            <span className="text-xs" style={{ color: 'var(--muted)' }}>— permission layer (grants table/column/row access to IAM principals)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded text-xs" style={{ background: '#00e67615', color: '#00e676' }}>Athena / Redshift / EMR</span>
            <span className="text-xs" style={{ color: 'var(--muted)' }}>— query engines (respect Lake Formation permissions transparently)</span>
          </div>
        </div>
      </div>

      <KeyTakeaways items={[
        'Lake Formation replaces complex S3 + IAM + Glue policies with one centralized permission model',
        'Permissions are set at database, table, column, and row level — much finer than S3 bucket policies',
        'LF-Tags enable tag-based access control — grant access to all assets with a tag instead of per table',
        'Data filters enforce column and row security transparently — analysts see only what they are allowed to see',
        'Athena, Redshift Spectrum, and EMR all respect Lake Formation permissions automatically',
        'Cross-account sharing lets you share specific tables with other AWS accounts without copying data',
      ]} />
    </LearnLayout>
  )
}