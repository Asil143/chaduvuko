import type { Roadmap } from '../types'

export const azureDataPipelineRoadmap: Roadmap = {
  id: 'azure-data-pipeline',
  slug: 'azure-data-pipeline',
  title: 'Azure Data Pipeline',
  category: 'project',
  description: 'Six end-to-end ADF projects — from copying a single CSV to pulling live REST API data. Every project uses the same FreshMart grocery chain dataset so skills compound.',
  totalTime: '6–8 weeks',

  guide: {
    howToUse: 'Do the projects in order. Each one builds on the last. Project 01 is deliberately simple — the goal is to understand how Linked Services, Datasets, and Pipelines connect. By Project 06 you will be handling REST APIs, JSON parsing, and ADF expressions. Every project has an Error Library section documenting real errors you will hit.',
  },

  sections: [
    { row: 0, label: 'Prerequisites', color: '#888888' },
    { row: 1, label: 'The FreshMart Dataset', color: '#00e676' },
    { row: 2, label: 'Six Projects — Build In Order', color: '#0078d4', description: 'All projects use the same FreshMart fictional grocery chain. 10 stores, real CSV files, real errors, real fixes.' },
    { row: 3, label: 'What Comes Next', color: '#7b61ff' },
  ],

  nodes: [
    { id: 'prereq-adf', title: 'ADF Basics', type: 'required', description: 'Understand what ADF is, what Linked Services do, and what the difference between a Dataset and a Pipeline is before starting Project 01.', time: '2–3 hrs', difficulty: 'beginner', href: '/learn/azure/adf', row: 0, col: 0 },
    { id: 'prereq-adls', title: 'ADLS Gen2', type: 'required', description: 'Create a storage account, a container, and understand directory structure. You need somewhere for the data to land before you can copy anything.', time: '1–2 hrs', difficulty: 'beginner', href: '/learn/azure/adls-gen2', row: 0, col: 1 },
    { id: 'prereq-portal', title: 'Azure Portal', type: 'required', description: 'Be comfortable creating resource groups, navigating services, and reading activity logs. You will spend time here debugging.', time: '1–2 hrs', difficulty: 'beginner', href: '/learn/azure/introduction', row: 0, col: 2 },

    { id: 'freshmart-intro', title: 'FreshMart Dataset', type: 'required', description: 'FreshMart is a fictional grocery chain with 10 stores across Indian cities — ST001 through ST010. Files are named store_ST001_sales_YYYYMMDD.csv and stored in Azure Blob (landing) before moving to ADLS Gen2. Same dataset across all 6 projects so skills compound.', time: '30 min', difficulty: 'beginner', row: 1, col: 0 },
    { id: 'freshmart-architecture', title: 'Medallion Architecture', type: 'required', description: 'Bronze (raw landing) → Silver (cleaned) → Gold (aggregated for reporting). Every project moves data through these layers. Understanding why the layers exist before building them makes the projects make more sense.', time: '1–2 hrs', difficulty: 'beginner', row: 1, col: 1 },

    { id: 'p01', title: 'Project 01 — Copy a CSV', type: 'chaduvuko', description: 'Copy a single FreshMart CSV from Azure Blob Storage to ADLS Gen2 using one Copy Activity. Set up two Linked Services and two Datasets from scratch. The simplest possible pipeline — but you will hit real errors on connection strings and IAM permissions.', time: '3–4 hrs', difficulty: 'beginner', href: '/learn/projects/azure-batch-pipeline', row: 2, col: 0 },
    { id: 'p02', title: 'Project 02 — ForEach All Stores', type: 'chaduvuko', description: 'Extend Project 01 to copy all 10 store files in one run using a ForEach loop and a parameterised dataset. Key lesson: ForEach must be Sequential not Parallel when writing to pipeline-level variables. A pattern you use in every production ADF pipeline.', time: '4–5 hrs', difficulty: 'beginner', href: '/learn/projects/azure-projects-02', row: 2, col: 1 },
    { id: 'p03', title: 'Project 03 — Date Parameter', type: 'chaduvuko', description: 'Make the pipeline date-driven. Add a run_date pipeline parameter and use it in file path expressions. Trigger manually with a specific date or schedule via trigger. This is how every production batch pipeline runs — it always knows which date it is processing.', time: '4–5 hrs', difficulty: 'intermediate', href: '/learn/projects/azure-project-03', row: 2, col: 2 },
    { id: 'p04', title: 'Project 04 — HTTP Ingestion', type: 'chaduvuko', description: 'Use the HTTP Linked Service to pull a CSV from a public URL directly into ADLS. Real-world equivalent: pulling from a vendor SFTP, an external API endpoint, or a data provider URL. A pattern that comes up in the first month at almost every data job.', time: '4–5 hrs', difficulty: 'intermediate', href: '/learn/projects/azure-project-04', row: 2, col: 3 },
    { id: 'p05', title: 'Project 05 — File Management', type: 'chaduvuko', description: 'Date-stamp files on arrival, move them into YYYY/MM/DD folder partitions, archive processed files to a cold storage path, and clean the landing zone. The file management boilerplate that every data engineer writes in their first week on the job.', time: '4–5 hrs', difficulty: 'intermediate', href: '/learn/projects/azure-project-05', row: 2, col: 4 },
    { id: 'p06', title: 'Project 06 — REST API', type: 'chaduvuko', description: 'Call a live weather REST API from inside ADF using a Web Activity. Parse the JSON response using Set Variable with ADF expressions. Land the extracted fields as a CSV in ADLS. The most advanced project — covers ADF expression language, JSON parsing, and API authentication patterns.', time: '6–8 hrs', difficulty: 'intermediate', href: '/learn/projects/azure-project-06', row: 2, col: 5 },

    { id: 'next-databricks', title: 'Add Databricks Transformation', type: 'recommended', description: 'Extend any of the six projects with a Databricks notebook activity after the Copy step. Transform bronze data to silver, apply data quality checks, and write to Delta Lake format.', time: '6–8 hrs', difficulty: 'intermediate', href: '/learn/azure/databricks', row: 3, col: 0 },
    { id: 'next-synapse', title: 'Query in Synapse', type: 'recommended', description: 'Create external tables in Synapse Serverless SQL Pool pointing to your ADLS gold layer. Write SQL queries that analysts can run without moving data.', time: '4–5 hrs', difficulty: 'intermediate', href: '/learn/azure/synapse', row: 3, col: 1 },
    { id: 'next-aws', title: 'Replicate on AWS', type: 'optional', description: 'Build an equivalent pipeline on AWS — S3 as landing, Glue for transformation, Redshift as warehouse. Same FreshMart data, different cloud. Once you know ADF, Glue takes half the time.', time: '1–2 weeks', difficulty: 'intermediate', row: 3, col: 2 },
  ],
}