import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const azureCheatSheet: TrackCheatSheet = {
  track: 'azure',
  title: 'Microsoft Azure',
  trackHref: '/learn/azure/introduction',
  accent: '#0078d4',
  blurb: 'Identity, ADLS Gen2, Data Factory, Databricks, Synapse, Event Hubs, Key Vault and Fabric — the Azure data track on one page. Bookmark it.',
  sections: [
    {
      title: 'Subscription & resource groups',
      entries: [
        {
          label: 'Sign in and pick a subscription',
          code: `az login
az account set --subscription "Lake Dev"
az account show --query '{name:name, id:id}' -o json`,
        },
        {
          label: 'One group per environment',
          note: 'dev and prod stay apart',
          code: `az group create --name rg-lake-dev --location eastus
az group list --query "[].name" -o tsv
# delete the group and the lake, factory, and vault go with it`,
        },
        {
          label: 'Where you are',
          code: `az account list --query "[].{name:name, isDefault:isDefault}" -o table
# pipelines, storage, and the warehouse belong in the same region`,
        },
      ],
    },
    {
      title: 'RBAC & managed identity',
      entries: [
        {
          label: 'Data-plane role',
          note: 'Entra ID holds the identity',
          code: `az role assignment create --assignee analyst@contoso.com --role "Storage Blob Data Contributor" --scope "/subscriptions/<sub-id>/resourceGroups/rg-lake-dev/providers/Microsoft.Storage/storageAccounts/stlakedev"`,
        },
        {
          label: 'User-assigned identity',
          code: `az identity create --resource-group rg-lake-dev --name id-pipeline-dev
az identity show --resource-group rg-lake-dev --name id-pipeline-dev --query principalId -o tsv`,
        },
        {
          label: 'Grant that identity',
          note: 'no storage account keys',
          code: `az role assignment create --assignee-object-id <principal-id> --assignee-principal-type ServicePrincipal --role "Storage Blob Data Contributor" --scope "/subscriptions/<sub-id>/resourceGroups/rg-lake-dev/providers/Microsoft.Storage/storageAccounts/stlakedev"
# ADF, Databricks, and Synapse use this identity`,
        },
      ],
    },
    {
      title: 'ADLS Gen2',
      entries: [
        {
          label: 'Account with a hierarchy',
          code: `az storage account create --resource-group rg-lake-dev --name stlakedev --location eastus --sku Standard_LRS --kind StorageV2 --hierarchical-namespace true`,
        },
        {
          label: 'File system and folder',
          code: `az storage fs create --name lake --account-name stlakedev --auth-mode login
az storage fs directory create --file-system lake --name bronze/orders/dt=2026-03-15 --account-name stlakedev --auth-mode login`,
        },
        {
          label: 'Upload a day of orders',
          code: `az storage fs file upload --account-name stlakedev --auth-mode login --file-system lake --path bronze/orders/dt=2026-03-15/orders.csv --source ./orders.csv`,
        },
        {
          label: 'Medallion paths',
          code: `abfss://lake@stlakedev.dfs.core.windows.net/bronze/orders/dt=2026-03-15/
abfss://lake@stlakedev.dfs.core.windows.net/silver/orders/
abfss://lake@stlakedev.dfs.core.windows.net/gold/daily_revenue/
# keep raw files forever — reprocessing starts from bronze`,
        },
      ],
    },
    {
      title: 'Azure Data Factory',
      entries: [
        {
          label: 'Pipeline shape',
          code: `# parameter: dt (string)
# 1 Copy — SQL source to Parquet
#    sink path: bronze/orders/dt=@{pipeline().parameters.dt}
# 2 DatabricksNotebook — silver_orders
#    dependsOn LandBronze, status Succeeded
#    baseParameters dt = @pipeline().parameters.dt`,
        },
        {
          label: 'Create and run',
          code: `az datafactory pipeline create --resource-group rg-lake-dev --factory-name adf-lake-dev --name nightly-orders --pipeline pipeline.json
az datafactory pipeline create-run --resource-group rg-lake-dev --factory-name adf-lake-dev --name nightly-orders --parameters '{"dt":"2026-03-15"}'`,
        },
        {
          label: 'Check the run',
          code: `az datafactory pipeline-run show --resource-group rg-lake-dev --factory-name adf-lake-dev --run-id 00000000-0000-0000-0000-000000000000`,
        },
        {
          label: 'Daily tumbling window',
          code: `{
  "name": "daily-orders",
  "properties": {
    "type": "TumblingWindowTrigger",
    "runtimeState": "Started",
    "typeProperties": {
      "frequency": "Hour",
      "interval": 24,
      "startTime": "2026-03-01T00:00:00Z",
      "maxConcurrency": 1
    },
    "pipeline": {
      "pipelineReference": {"referenceName": "nightly-orders", "type": "PipelineReference"},
      "parameters": {"dt": "@formatDateTime(trigger().outputs.windowStartTime, 'yyyy-MM-dd')"}
    }
  }
}`,
        },
      ],
    },
    {
      title: 'Azure Databricks',
      entries: [
        {
          label: 'Read bronze',
          code: `df = spark.read.parquet(
    "abfss://lake@stlakedev.dfs.core.windows.net/bronze/orders/")
df = df.filter("dt = '2026-03-15'")`,
        },
        {
          label: 'Overwrite one partition',
          code: `(df.write.format("delta")
  .mode("overwrite")
  .option("replaceWhere", "dt = '2026-03-15'")
  .partitionBy("dt")
  .save("abfss://lake@stlakedev.dfs.core.windows.net/silver/orders"))`,
        },
        {
          label: 'MERGE into silver',
          code: `spark.sql("""
MERGE INTO silver.orders t
USING updates s
ON t.order_id = s.order_id
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *
""")`,
        },
        {
          label: 'Secret from Key Vault',
          note: 'never print the value',
          code: `password = dbutils.secrets.get(scope="kv-lake-dev", key="sql-password")
# the scope is backed by Key Vault; the notebook has no connection string`,
        },
      ],
    },
    {
      title: 'Azure Synapse',
      entries: [
        {
          label: 'Serverless OPENROWSET',
          note: 'query the lake in place',
          code: `SELECT dt, SUM(amount) AS revenue
FROM OPENROWSET(
  BULK 'https://stlakedev.dfs.core.windows.net/lake/silver/orders/dt=2026-03-15/**',
  FORMAT = 'PARQUET'
) AS rows
GROUP BY dt;`,
        },
        {
          label: 'Dedicated pool table',
          code: `CREATE TABLE gold.daily_revenue (
  dt date NOT NULL,
  revenue decimal(12, 2)
)
WITH (
  DISTRIBUTION = HASH(dt),
  CLUSTERED COLUMNSTORE INDEX
);`,
        },
        {
          label: 'COPY with managed identity',
          code: `COPY INTO gold.daily_revenue
FROM 'https://stlakedev.dfs.core.windows.net/lake/gold/daily_revenue/*.parquet'
WITH (
  FILE_TYPE = 'PARQUET',
  CREDENTIAL = (IDENTITY = 'Managed Identity')
);`,
        },
        {
          label: 'Serverless view',
          code: `CREATE VIEW gold.v_daily_revenue AS
SELECT dt, SUM(amount) AS revenue
FROM OPENROWSET(
  BULK 'https://stlakedev.dfs.core.windows.net/lake/silver/orders/**',
  FORMAT = 'PARQUET'
) WITH (amount decimal(12, 2), dt date) AS rows
GROUP BY dt;`,
        },
      ],
    },
    {
      title: 'Event Hubs',
      entries: [
        {
          label: 'Namespace and hub',
          note: 'Standard or higher for Capture',
          code: `az eventhubs namespace create --resource-group rg-lake-dev --name ehlakedev --location eastus --sku Standard
az eventhubs eventhub create --resource-group rg-lake-dev --namespace-name ehlakedev --name orders --partition-count 4 --retention-time 1`,
        },
        {
          label: 'Consumer group',
          code: `az eventhubs eventhub consumer-group create --resource-group rg-lake-dev --namespace-name ehlakedev --eventhub-name orders --name spark
# each reader (Spark, a second app) gets its own group`,
        },
        {
          label: 'Capture to the lake',
          code: `az eventhubs eventhub update --resource-group rg-lake-dev --namespace-name ehlakedev --name orders --enable-capture true --capture-interval 300 --destination-name EventHubArchive.AzureBlockBlob --storage-account stlakedev --blob-container lake --archive-name-format "{Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}"`,
        },
        {
          label: 'Kafka endpoint',
          code: `# bootstrap: ehlakedev.servicebus.windows.net:9093
# topic = hub name "orders"
# group.id = spark
# authenticate with the pipeline identity, not a connection string in git`,
        },
      ],
    },
    {
      title: 'Key Vault',
      entries: [
        {
          label: 'Vault with RBAC',
          note: 'not access policies',
          code: `az keyvault create --resource-group rg-lake-dev --name kv-lake-dev --location eastus --enable-rbac-authorization true
az keyvault secret set --vault-name kv-lake-dev --name sql-password --value "replace-me"`,
        },
        {
          label: 'Secrets User on the identity',
          code: `az role assignment create --assignee-object-id <principal-id> --assignee-principal-type ServicePrincipal --role "Key Vault Secrets User" --scope $(az keyvault show --name kv-lake-dev --query id -o tsv)`,
        },
        {
          label: 'ADF secret reference',
          code: `"password": {
  "type": "AzureKeyVaultSecret",
  "store": {
    "referenceName": "kv-lake-dev",
    "type": "LinkedServiceReference"
  },
  "secretName": "sql-password"
}`,
        },
        {
          label: 'One vault per environment',
          code: `# kv-lake-dev and kv-lake-prod are different vaults
# a dev identity has no role on the prod vault
az keyvault secret list --vault-name kv-lake-dev --query "[].name" -o tsv`,
        },
      ],
    },
    {
      title: 'Microsoft Fabric',
      entries: [
        {
          label: 'OneLake path',
          code: `abfss://LakeDev@onelake.dfs.fabric.microsoft.com/Orders.Lakehouse/Files/bronze/orders/
abfss://LakeDev@onelake.dfs.fabric.microsoft.com/Orders.Lakehouse/Tables/silver_orders/`,
        },
        {
          label: 'Read it from a notebook',
          code: `df = spark.read.parquet(
    "abfss://LakeDev@onelake.dfs.fabric.microsoft.com/Orders.Lakehouse/Files/bronze/orders")`,
        },
        {
          label: 'SQL endpoint',
          note: 'same tables, no copy',
          code: `SELECT dt, SUM(amount) AS revenue
FROM orders
WHERE dt = '2026-03-15'
GROUP BY dt;`,
        },
        {
          label: 'Shortcut back to ADLS',
          code: `# Lakehouse shortcut — files stay in ADLS Gen2
# source: https://stlakedev.dfs.core.windows.net/lake/bronze
# target: Files/bronze
# dev and prod workspaces shortcut to different storage accounts`,
        },
      ],
    },
  ],
  projects: [
    {
      title: 'Bronze day on ADLS',
      level: 'Beginner',
      build: 'Create a hierarchical storage account, upload one day of orders under bronze/orders/dt=…, and count the rows with a Synapse serverless OPENROWSET query. Grant yourself Storage Blob Data Contributor. Do not use an account key.',
      skills: ['ADLS Gen2', 'RBAC', 'Synapse serverless SQL'],
    },
    {
      title: 'Secret-free notebook',
      level: 'Beginner',
      build: 'Store a SQL password in a Key Vault that uses RBAC. A Databricks notebook reads it through a Key Vault-backed secret scope and never displays the value.',
      skills: ['Key Vault', 'RBAC', 'Databricks secrets'],
    },
    {
      title: 'One ADF slice',
      level: 'Intermediate',
      build: 'A Data Factory pipeline, run for a single date, copies a source table into ADLS bronze as Parquet, then runs a Databricks notebook that MERGEs that date into a Delta silver table.',
      skills: ['Data Factory', 'ADLS Gen2', 'Databricks', 'Delta Lake'],
    },
    {
      title: 'Captured orders',
      level: 'Intermediate',
      build: 'Stand up a Standard Event Hubs namespace and an orders hub with Capture into the lake. Read one captured hour from Databricks and write a cleaned Delta table partitioned by date.',
      skills: ['Event Hubs', 'Capture', 'ADLS Gen2', 'Databricks'],
    },
    {
      title: 'Fabric on the same files',
      level: 'Advanced',
      build: 'Shortcut the existing ADLS bronze and silver into a Fabric lakehouse and query them from the SQL endpoint. Dev and prod are separate workspaces with different RBAC, and neither workspace stores a second copy of the files.',
      skills: ['Microsoft Fabric', 'OneLake shortcuts', 'ADLS Gen2', 'RBAC'],
    },
  ],
}
