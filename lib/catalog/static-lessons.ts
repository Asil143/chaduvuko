import type { Lesson } from './types'

type StaticLesson = Omit<Lesson, 'status'>

// Lessons implemented as standalone page files rather than curriculum-driven routes.
const STATIC_LESSONS: StaticLesson[] = [
  { track: 'data-engineering', section: 'Core Engineering Skills', order: 15.5, href: '/learn/foundations/postgresql', title: 'PostgreSQL for Data Engineers' },

  { track: 'cloud-data', section: 'Course Introduction', order: 0, href: '/learn/cloud-data/choosing-a-cloud', title: 'Choosing a Cloud for Data — Azure vs AWS vs GCP' },
  { track: 'cloud-data', section: 'Platform-neutral Tools', order: 400, href: '/learn/cloud-data/databricks-unity-catalog', title: 'Databricks and Unity Catalog' },
  { track: 'cloud-data', section: 'Cross-cloud Foundations', order: 401, href: '/learn/cloud-data/iam-networking', title: 'IAM and Networking for Data Platforms' },
  { track: 'cloud-data', section: 'Career Preparation', order: 402, href: '/learn/cloud-data/interview-prep', title: 'Cloud Data Interview Prep' },

  { track: 'cloud-data', section: 'Microsoft Azure', order: 201, href: '/learn/azure/introduction',     title: 'Azure Introduction' },
  { track: 'cloud-data', section: 'Microsoft Azure', order: 202, href: '/learn/azure/adls-gen2',        title: 'ADLS Gen2' },
  { track: 'cloud-data', section: 'Microsoft Azure', order: 203, href: '/learn/azure/adf',              title: 'Azure Data Factory' },
  { track: 'cloud-data', section: 'Microsoft Azure', order: 204, href: '/learn/azure/databricks',       title: 'Azure Databricks' },
  { track: 'cloud-data', section: 'Microsoft Azure', order: 205, href: '/learn/azure/synapse',          title: 'Azure Synapse Analytics' },
  { track: 'cloud-data', section: 'Microsoft Azure', order: 206, href: '/learn/azure/event-hubs',       title: 'Azure Event Hubs' },
  { track: 'cloud-data', section: 'Microsoft Azure', order: 207, href: '/learn/azure/key-vault',        title: 'Azure Key Vault' },
  { track: 'cloud-data', section: 'Microsoft Azure', order: 208, href: '/learn/azure/microsoft-fabric', title: 'Microsoft Fabric' },

  { track: 'cloud-data', section: 'AWS', order: 101, href: '/learn/aws/introduction',   title: 'AWS Introduction' },
  { track: 'cloud-data', section: 'AWS', order: 102, href: '/learn/aws/s3',             title: 'Amazon S3' },
  { track: 'cloud-data', section: 'AWS', order: 103, href: '/learn/aws/glue',           title: 'AWS Glue' },
  { track: 'cloud-data', section: 'AWS', order: 104, href: '/learn/aws/redshift',       title: 'Amazon Redshift' },
  { track: 'cloud-data', section: 'AWS', order: 105, href: '/learn/aws/kinesis',        title: 'Amazon Kinesis' },
  { track: 'cloud-data', section: 'AWS', order: 106, href: '/learn/aws/athena',         title: 'Amazon Athena' },
  { track: 'cloud-data', section: 'AWS', order: 107, href: '/learn/aws/emr',            title: 'Amazon EMR' },
  { track: 'cloud-data', section: 'AWS', order: 108, href: '/learn/aws/step-functions', title: 'AWS Step Functions' },
  { track: 'cloud-data', section: 'AWS', order: 109, href: '/learn/aws/lake-formation', title: 'AWS Lake Formation' },

  { track: 'cloud-data', section: 'Google Cloud', order: 301, href: '/learn/gcp/introduction', title: 'GCP Introduction' },
  { track: 'cloud-data', section: 'Google Cloud', order: 302, href: '/learn/gcp/bigquery',     title: 'Google BigQuery' },
  { track: 'cloud-data', section: 'Google Cloud', order: 303, href: '/learn/gcp/dataflow',     title: 'Cloud Dataflow' },
  { track: 'cloud-data', section: 'Google Cloud', order: 304, href: '/learn/gcp/pubsub',       title: 'Cloud Pub/Sub' },
  { track: 'cloud-data', section: 'Google Cloud', order: 305, href: '/learn/gcp/composer',     title: 'Cloud Composer' },
  { track: 'cloud-data', section: 'Google Cloud', order: 306, href: '/learn/gcp/gcs-dataproc', title: 'Google Cloud Storage and Dataproc' },

  { track: 'projects', order: 1, href: '/learn/projects/azure-batch-pipeline', title: 'Project 01 — Copy CSV to ADLS' },
  { track: 'projects', order: 2, href: '/learn/projects/azure-projects-02',    title: 'Project 02 — ForEach Loop' },
  { track: 'projects', order: 3, href: '/learn/projects/azure-project-03',     title: 'Project 03 — Run Date Pipeline' },
  { track: 'projects', order: 4, href: '/learn/projects/azure-project-04',     title: 'Project 04 — HTTP Ingestion' },
  { track: 'projects', order: 5, href: '/learn/projects/azure-project-05',     title: 'Project 05 — File Management' },
  { track: 'projects', order: 6, href: '/learn/projects/azure-project-06',     title: 'Project 06 — Pull Data From a REST API' },
]

export const staticLessons: Lesson[] = STATIC_LESSONS.map(lesson => ({ ...lesson, status: 'live' }))
