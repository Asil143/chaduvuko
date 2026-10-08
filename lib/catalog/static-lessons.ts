import type { Lesson } from './types'

type StaticLesson = Omit<Lesson, 'status'>

// Lessons implemented as standalone page files rather than curriculum-driven routes.
const STATIC_LESSONS: StaticLesson[] = [
  { track: 'foundations', order: 1, href: '/learn/what-is-data-engineering', title: 'What is Data Engineering?' },
  { track: 'foundations', order: 2, href: '/learn/foundations/sql',          title: 'SQL for Data Engineers' },
  { track: 'foundations', order: 3, href: '/learn/foundations/postgresql',   title: 'PostgreSQL' },
  { track: 'foundations', order: 4, href: '/learn/foundations/python',       title: 'Python for Data Engineers' },

  { track: 'azure', order: 1, href: '/learn/azure/introduction',     title: 'Azure Introduction' },
  { track: 'azure', order: 2, href: '/learn/azure/adls-gen2',        title: 'ADLS Gen2' },
  { track: 'azure', order: 3, href: '/learn/azure/adf',              title: 'Azure Data Factory' },
  { track: 'azure', order: 4, href: '/learn/azure/databricks',       title: 'Azure Databricks' },
  { track: 'azure', order: 5, href: '/learn/azure/synapse',          title: 'Azure Synapse Analytics' },
  { track: 'azure', order: 6, href: '/learn/azure/event-hubs',       title: 'Azure Event Hubs' },
  { track: 'azure', order: 7, href: '/learn/azure/key-vault',        title: 'Azure Key Vault' },
  { track: 'azure', order: 8, href: '/learn/azure/microsoft-fabric', title: 'Microsoft Fabric' },

  { track: 'aws', order: 1, href: '/learn/aws/introduction',   title: 'AWS Introduction' },
  { track: 'aws', order: 2, href: '/learn/aws/s3',             title: 'Amazon S3' },
  { track: 'aws', order: 3, href: '/learn/aws/glue',           title: 'AWS Glue' },
  { track: 'aws', order: 4, href: '/learn/aws/redshift',       title: 'Amazon Redshift' },
  { track: 'aws', order: 5, href: '/learn/aws/kinesis',        title: 'Amazon Kinesis' },
  { track: 'aws', order: 6, href: '/learn/aws/athena',         title: 'Amazon Athena' },
  { track: 'aws', order: 7, href: '/learn/aws/emr',            title: 'Amazon EMR' },
  { track: 'aws', order: 8, href: '/learn/aws/step-functions', title: 'AWS Step Functions' },
  { track: 'aws', order: 9, href: '/learn/aws/lake-formation', title: 'AWS Lake Formation' },

  { track: 'gcp', order: 1, href: '/learn/gcp/introduction', title: 'GCP Introduction' },
  { track: 'gcp', order: 2, href: '/learn/gcp/bigquery',     title: 'Google BigQuery' },
  { track: 'gcp', order: 3, href: '/learn/gcp/dataflow',     title: 'Cloud Dataflow' },
  { track: 'gcp', order: 4, href: '/learn/gcp/pubsub',       title: 'Cloud Pub/Sub' },
  { track: 'gcp', order: 5, href: '/learn/gcp/composer',     title: 'Cloud Composer' },

  { track: 'projects', order: 1, href: '/learn/projects/azure-batch-pipeline', title: 'Project 01 — Copy CSV to ADLS' },
  { track: 'projects', order: 2, href: '/learn/projects/azure-projects-02',    title: 'Project 02 — ForEach Loop' },
  { track: 'projects', order: 3, href: '/learn/projects/azure-project-03',     title: 'Project 03 — Run Date Pipeline' },
  { track: 'projects', order: 4, href: '/learn/projects/azure-project-04',     title: 'Project 04 — HTTP Ingestion' },
  { track: 'projects', order: 5, href: '/learn/projects/azure-project-05',     title: 'Project 05 — File Management' },
  { track: 'projects', order: 6, href: '/learn/projects/azure-project-06',     title: 'Project 06 — Pull Data From a REST API' },
]

export const staticLessons: Lesson[] = STATIC_LESSONS.map(lesson => ({ ...lesson, status: 'live' }))
