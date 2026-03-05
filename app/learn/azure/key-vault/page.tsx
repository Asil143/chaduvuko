import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/content/CodeBlock'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Azure Key Vault' }

const databricksCode = `# Use Key Vault secrets in Databricks notebooks
# First: create a secret scope backed by Key Vault (one-time setup in Databricks CLI)
# databricks secrets create-scope --scope kv-scope --scope-backend-type AZURE_KEYVAULT

# Then in any notebook — secret values are NEVER shown in output
storage_key = dbutils.secrets.get(scope="kv-scope", key="adls-storage-key")
db_password = dbutils.secrets.get(scope="kv-scope", key="sql-db-password")
api_key     = dbutils.secrets.get(scope="kv-scope", key="resend-api-key")

# Configure Spark to use the secret — actual value never visible
spark.conf.set(
    "fs.azure.account.key.yourstorage.dfs.core.windows.net",
    storage_key
)

# Read from ADLS Gen2 — fully authenticated via Key Vault
df = spark.read.parquet(
    "abfss://silver@yourstorage.dfs.core.windows.net/sales/"
)
df.show()

# If you accidentally print(storage_key), it shows [REDACTED]
# Databricks masks all secret values in notebook output automatically`

const adfCode = `// ADF Linked Service referencing Key Vault — zero credentials in config
// In ADF Studio: Manage > Linked Services > New > Azure SQL Database
// Select Key Vault for authentication instead of typing a password

{
  "name": "LS_AzureSQL_Production",
  "type": "AzureSqlDatabase",
  "typeProperties": {
    "server":   "yourserver.database.windows.net",
    "database": "SalesDB",
    "encrypt":  true,
    "authenticationType": "SQL",
    "userName": "pipeline_user",
    "password": {
      "type":  "AzureKeyVaultSecret",
      "store": {
        "referenceName": "LS_KeyVault",
        "type":          "LinkedServiceReference"
      },
      "secretName": "sql-db-password"
    }
  }
}

// This ADF pipeline JSON has zero credentials
// Safe to commit to Git — the password lives only in Key Vault
// Rotate the password in Key Vault — ADF picks it up automatically`

const pythonCode = `# Access Key Vault from Python using Managed Identity
# Works in Azure Functions, Container Apps, VMs — no credentials needed
# pip install azure-keyvault-secrets azure-identity

from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient

# DefaultAzureCredential uses Managed Identity in Azure
# and your local az login account for local development
credential = DefaultAzureCredential()
client = SecretClient(
    vault_url="https://your-vault.vault.azure.net/",
    credential=credential
)

# Get secrets
db_password = client.get_secret("sql-db-password").value
api_key     = client.get_secret("resend-api-key").value

# Set a secret (needs Key Vault Secrets Officer role)
client.set_secret("new-secret-name", "secret-value")

# List all secret names (values are not returned in list)
for secret_props in client.list_properties_of_secrets():
    print(secret_props.name)`

const rbacRoles = [
  { role: 'Key Vault Secrets User',    permission: 'Read secret values',              who: 'Databricks clusters, ADF pipelines, Azure Functions' },
  { role: 'Key Vault Secrets Officer', permission: 'Read, write, delete secrets',     who: 'DevOps pipelines, admin scripts' },
  { role: 'Key Vault Administrator',   permission: 'Full control including policies', who: 'Security team only' },
  { role: 'Key Vault Reader',          permission: 'View metadata, not values',       who: 'Auditors, monitoring tools' },
]

const bestPractices = [
  { icon: '🔑', title: 'One vault per environment', desc: 'Separate Key Vaults for dev, staging, and production. Dev secrets should never be accessible from production services.' },
  { icon: '🔄', title: 'Rotate secrets on a schedule', desc: 'Set expiry dates on secrets. Key Vault alerts you before expiry. Rotate database passwords every 90 days.' },
  { icon: '📋', title: 'Enable audit logging', desc: 'Every secret access is logged to Azure Monitor. If credentials are compromised, you can see exactly what was accessed and when.' },
  { icon: '🚫', title: 'Never put secrets in code', desc: 'Connection strings and storage account keys in code get committed to Git. Always use Key Vault references or Managed Identity.' },
]

const steps = [
  { step: '01', title: 'Create a Key Vault', detail: 'Azure Portal > Create a resource > Key Vault. Choose the same region as your other resources. Enable RBAC authorization (not access policies).' },
  { step: '02', title: 'Add your secrets', detail: 'Key Vault > Secrets > Generate/Import. Add each secret: adls-storage-key, sql-db-password, resend-api-key. Name them clearly.' },
  { step: '03', title: 'Grant Managed Identity access', detail: 'For each service that needs secrets: find its Managed Identity, go to Key Vault > Access control (IAM) > Add role assignment > Key Vault Secrets User.' },
  { step: '04', title: 'Create Databricks secret scope', detail: 'In Databricks: Settings > Developer > Secret Scopes > Create. Link to your Key Vault resource ID and DNS name.' },
  { step: '05', title: 'Replace hardcoded secrets', detail: 'In notebooks: replace hardcoded keys with dbutils.secrets.get(). In ADF: update Linked Services to reference Key Vault secrets.' },
]

export default function KeyVaultPage() {
  return (
    <LearnLayout
      title="Azure Key Vault"
      description="Azure Key Vault is a managed secrets store. Store passwords, connection strings, API keys, and certificates in one place — and let your pipelines retrieve them at runtime using Managed Identity, with zero credentials in your code."
      section="Section 02 · Azure Track"
      readTime="12 min read"
      updatedAt="March 2025"
      breadcrumbs={[
        { label: 'Azure Track', href: '/learn/azure/introduction' },
        { label: 'Azure Key Vault', href: '/learn/azure/key-vault' },
      ]}
      prev={{ title: 'Azure Event Hubs', href: '/learn/azure/event-hubs' }}
      next={{ title: 'Microsoft Fabric', href: '/learn/azure/microsoft-fabric' }}
    >
      <h2>Why Key Vault Exists</h2>
      <p>
        Secrets in code are the most common security mistake in data engineering. A connection string hardcoded in a Databricks notebook gets committed to Git. A storage account key in an ADF config gets shared in a Teams message. These happen constantly — and once a secret is in Git history, it is compromised even after deletion.
      </p>
      <p>
        Key Vault solves this by being the single place where secrets live. Your code never contains the actual value — it contains a reference to Key Vault. At runtime, the pipeline authenticates using Managed Identity, retrieves the secret, and uses it. The value never touches your code or logs.
      </p>

      <Callout type="warning" title="Secrets in Git are permanently compromised">
        Even if you delete a secret from a Git commit, it exists in repository history. Anyone with repo access can retrieve it with git log. If a secret ever touches a Git repository, rotate it immediately — do not just delete it.
      </Callout>

      <h2>Key Vault with Azure Databricks</h2>
      <p>
        Databricks has first-class Key Vault integration through secret scopes. Create the scope once, then use dbutils.secrets.get() anywhere in your notebooks. Secret values are automatically redacted in all notebook output.
      </p>
      <CodeBlock code={databricksCode} language="python" filename="databricks_keyvault.py" />

      <h2>Key Vault with Azure Data Factory</h2>
      <p>
        Create a Key Vault Linked Service in ADF first, then reference it from all other Linked Services instead of entering passwords directly. Your ADF pipeline JSON contains zero credentials — safe to commit to Git and share with the team.
      </p>
      <CodeBlock code={adfCode} language="json" filename="adf_linked_service.json" />

      <h2>Key Vault from Python — Managed Identity</h2>
      <p>
        When running Python code in Azure — Functions, Container Apps, VMs — use DefaultAzureCredential. It automatically uses the Managed Identity when running in Azure, and your local az login when developing locally. No credentials in code at all.
      </p>
      <CodeBlock code={pythonCode} language="python" filename="keyvault_python.py" />

      <h2>RBAC Roles — Who Gets What Access</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              {['Role', 'Permission', 'Assign To'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-mono uppercase" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rbacRoles.map((r, i) => (
              <tr key={r.role} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--surface)' : 'transparent' }}>
                <td className="py-3 px-4 font-mono text-xs font-bold" style={{ color: 'var(--accent)' }}>{r.role}</td>
                <td className="py-3 px-4 text-xs" style={{ color: 'var(--text2)' }}>{r.permission}</td>
                <td className="py-3 px-4 text-xs" style={{ color: 'var(--text2)' }}>{r.who}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Best Practices</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {bestPractices.map(bp => (
          <div key={bp.title} className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{bp.icon}</span>
              <span className="text-sm font-semibold font-display" style={{ color: 'var(--text)' }}>{bp.title}</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text2)' }}>{bp.desc}</p>
          </div>
        ))}
      </div>

      <h2>Setting It Up — Step by Step</h2>
      <div className="space-y-3 my-6">
        {steps.map(s => (
          <div key={s.step} className="flex gap-4 p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <span className="font-mono text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }}>{s.step}</span>
            <div>
              <div className="text-sm font-semibold font-display mb-1" style={{ color: 'var(--text)' }}>{s.title}</div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text2)' }}>{s.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <KeyTakeaways items={[
        'Never put secrets in code, config files, or environment variables — use Key Vault',
        'Managed Identity authenticates your Azure services to Key Vault with zero credentials in code',
        'Databricks secret scopes backed by Key Vault redact values automatically in notebook output',
        'ADF Linked Services referencing Key Vault make your pipeline JSON safe to commit to Git',
        'Use separate Key Vaults for dev, staging, and production',
        'Enable audit logging — every secret access is tracked for security review',
      ]} />
    </LearnLayout>
  )
}