import type { Roadmap } from '../types'

export const azureRoadmap: Roadmap = {
  id: 'azure',
  slug: 'azure',
  title: 'Azure',
  category: 'skill',
  description: 'Microsoft Azure from portal basics to Data Factory, Databricks, and Synapse. The best first cloud for targeting consulting firms and H1B sponsorship.',
  totalTime: '2–3 months',

  sections: [
    { row: 0, label: 'Azure Fundamentals', color: '#0078d4' },
    { row: 2, label: 'Azure Storage', color: '#0078d4' },
    { row: 4, label: 'Azure Data Services', color: '#0078d4' },
    { row: 6, label: 'Hands-on Projects', color: '#7b61ff', description: 'Six real end-to-end ADF projects you can show in interviews.' },
    { row: 7, label: 'Advanced Azure', color: '#0078d4' },
  ],

  nodes: [
    { id: 'az-portal', title: 'Azure Portal & Resource Groups', type: 'required', description: 'Navigate the portal, understand subscriptions vs resource groups, create and delete resources, and read cost dashboards.', time: '2–3 hrs', difficulty: 'beginner', href: '/learn/azure/introduction', row: 0, col: 0 },
    { id: 'az-iam', title: 'IAM & RBAC', type: 'required', description: 'Roles (Owner/Contributor/Reader), service principals, managed identities, and assigning permissions to resources.', time: '2–3 hrs', difficulty: 'beginner', row: 0, col: 1 },
    { id: 'az-cli', title: 'Azure CLI & PowerShell', type: 'recommended', description: 'Provision and manage resources from the terminal. Script common operations so you are not clicking through the portal for repetitive tasks.', time: '2–3 hrs', difficulty: 'beginner', row: 0, col: 2 },

    { id: 'az-monitor', title: 'Azure Monitor & Alerts', type: 'recommended', description: 'Set up metric alerts, log analytics workspaces, and dashboard queries. Know when something breaks before your users tell you.', time: '2–3 hrs', difficulty: 'beginner', row: 1, col: 0 },
    { id: 'az-networking', title: 'VNets & Private Endpoints', type: 'recommended', description: 'Virtual networks, subnets, NSGs, private endpoints for storage accounts. Why production resources are never exposed to the public internet.', time: '3–4 hrs', difficulty: 'intermediate', row: 1, col: 1 },
    { id: 'az-keyvault', title: 'Key Vault', type: 'recommended', description: 'Secrets, keys, and certificates management. Reference Key Vault in ADF so credentials never appear in plain text.', time: '1–2 hrs', difficulty: 'beginner', row: 1, col: 2 },

    { id: 'az-blob', title: 'Azure Blob Storage', type: 'required', description: 'Containers, blobs, access tiers, SAS tokens, lifecycle policies. The simplest Azure storage — understand it before ADLS.', time: '2–3 hrs', difficulty: 'beginner', row: 2, col: 0 },
    { id: 'az-adls', title: 'ADLS Gen2', type: 'required', description: 'Hierarchical namespace, directories, partitioning by date, ACLs. The primary data lake storage used in all six Chaduvuko projects.', time: '3–4 hrs', difficulty: 'beginner', href: '/learn/azure/adls-gen2', row: 2, col: 1 },
    { id: 'az-files', title: 'Azure Files & Tables', type: 'optional', description: 'Azure Files for SMB shares, Azure Table Storage for NoSQL key-value. Niche but sometimes needed for legacy integrations.', time: '1–2 hrs', difficulty: 'beginner', row: 2, col: 2 },

    { id: 'az-sql', title: 'Azure SQL Database', type: 'recommended', description: 'Managed SQL Server on Azure. DTUs vs vCores, connection strings, firewall rules, and automatic backups. Used when you need a relational database rather than a data lake.', time: '3–4 hrs', difficulty: 'intermediate', row: 3, col: 0 },
    { id: 'az-cosmos', title: 'Cosmos DB', type: 'optional', description: 'Multi-model NoSQL database with global distribution and guaranteed low latency. Relevant for event-sourcing patterns and high-throughput API backends.', time: '3–4 hrs', difficulty: 'intermediate', row: 3, col: 1 },
    { id: 'az-eventhubs', title: 'Azure Event Hubs', type: 'optional', description: 'High-throughput event streaming for real-time ingestion. The Azure equivalent of Apache Kafka — used for IoT and clickstream data ingestion.', time: '3–4 hrs', difficulty: 'intermediate', row: 3, col: 2 },

    { id: 'az-adf', title: 'Azure Data Factory', type: 'required', description: 'Linked Services, Datasets, Pipelines, Copy Activity, ForEach, If Condition, Set Variable, Triggers, and Monitoring. The orchestration engine for all six Chaduvuko projects.', time: '8–10 hrs', difficulty: 'intermediate', href: '/learn/azure/adf', row: 4, col: 0 },
    { id: 'az-databricks', title: 'Azure Databricks', type: 'recommended', description: 'Managed Apache Spark. Notebooks, clusters, Delta Lake tables, and ADLS mounting. Where heavy transformation code runs at scale.', time: '8–10 hrs', difficulty: 'intermediate', href: '/learn/azure/databricks', row: 4, col: 1 },
    { id: 'az-synapse', title: 'Azure Synapse Analytics', type: 'recommended', description: 'Serverless and dedicated SQL pools, external tables, OPENROWSET, and Power BI integration. The analytics and reporting layer on top of your data lake.', time: '5–6 hrs', difficulty: 'intermediate', href: '/learn/azure/synapse', row: 4, col: 2 },

    { id: 'az-aml', title: 'Azure Machine Learning', type: 'optional', description: 'Managed ML platform for training, registering, and deploying models. Pipelines, compute clusters, and model registry. For data engineers who work closely with ML teams.', time: '6–8 hrs', difficulty: 'advanced', row: 5, col: 0 },
    { id: 'az-functions', title: 'Azure Functions', type: 'optional', description: 'Serverless compute triggered by HTTP, timers, or events. Useful for lightweight data transformations and webhook handlers in pipeline architectures.', time: '3–4 hrs', difficulty: 'intermediate', row: 5, col: 1 },

    // Chaduvuko Projects
    { id: 'az-p01', title: 'Project 01 — Copy CSV', type: 'chaduvuko', description: 'First ADF pipeline. Copy a FreshMart CSV from Blob to ADLS Gen2. Set up Linked Services, create Datasets, wire a Copy Activity, and run it.', time: '3–4 hrs', difficulty: 'beginner', href: '/learn/projects/azure-batch-pipeline', row: 6, col: 0 },
    { id: 'az-p02', title: 'Project 02 — ForEach Loop', type: 'chaduvuko', description: 'Copy all 10 store files using ForEach. Learn parameterised datasets and why ForEach must be Sequential when writing to variables.', time: '4–5 hrs', difficulty: 'beginner', href: '/learn/projects/azure-projects-02', row: 6, col: 1 },
    { id: 'az-p03', title: 'Project 03 — Date Parameter', type: 'chaduvuko', description: 'Date-driven pipelines — pass run_date, use it in file paths and folder partitions. The standard pattern for all scheduled batch pipelines.', time: '4–5 hrs', difficulty: 'intermediate', href: '/learn/projects/azure-project-03', row: 6, col: 2 },
    { id: 'az-p04', title: 'Project 04 — HTTP Ingestion', type: 'chaduvuko', description: 'Pull a file from a public URL into ADLS using the HTTP Linked Service. Real-world pattern for vendor SFTP and external data feed ingestion.', time: '4–5 hrs', difficulty: 'intermediate', href: '/learn/projects/azure-project-04', row: 6, col: 3 },
    { id: 'az-p05', title: 'Project 05 — File Management', type: 'chaduvuko', description: 'Rename with date stamps, move to dated partitions, archive processed files, clean landing zone. The file management every data engineer writes in month one.', time: '4–5 hrs', difficulty: 'intermediate', href: '/learn/projects/azure-project-05', row: 6, col: 4 },
    { id: 'az-p06', title: 'Project 06 — REST API', type: 'chaduvuko', description: 'Call a live weather REST API from inside ADF, parse JSON response with expressions, land result in ADLS. The hardest Chaduvuko project — covers ADF expressions and API auth.', time: '6–8 hrs', difficulty: 'intermediate', href: '/learn/projects/azure-project-06', row: 6, col: 5 },

    { id: 'az-devops', title: 'Azure DevOps for ADF', type: 'recommended', description: 'Git integration for ADF, branch strategies, CI/CD pipelines that publish ADF changes to different environments. How professional teams manage ADF at scale.', time: '4–5 hrs', difficulty: 'intermediate', row: 7, col: 0 },
    { id: 'az-cost', title: 'Azure Cost Optimisation', type: 'recommended', description: 'Understanding ADF billing (DIU-hours, activity runs), Databricks cluster auto-termination, storage tiering, and reserved instances. Every cloud bill can be cut 30–50% with the right settings.', time: '2–3 hrs', difficulty: 'intermediate', row: 7, col: 1 },
    { id: 'az-security', title: 'Azure Security Best Practices', type: 'recommended', description: 'Defender for Cloud, security posture score, network security groups, storage account firewall rules, and encryption at rest vs in transit.', time: '3–4 hrs', difficulty: 'intermediate', row: 7, col: 2 },
  ],
}