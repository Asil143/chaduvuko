export interface PageMeta {
  href: string
  title: string
  section: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  color: string
  readTime: string
  xp: number
}

export const PAGE_ORDER: PageMeta[] = [
  // Foundations
  { href: '/learn/what-is-data-engineering', title: 'What is Data Engineering?',      section: 'Foundations', difficulty: 'Beginner',     color: '#00c2ff', readTime: '10 min', xp: 100 },
  { href: '/learn/roadmap',                  title: 'Roadmap 2026',                    section: 'Foundations', difficulty: 'Beginner',     color: '#00c2ff', readTime: '8 min',  xp: 100 },
  { href: '/learn/foundations/sql',          title: 'SQL for Data Engineers',          section: 'Foundations', difficulty: 'Intermediate', color: '#00c2ff', readTime: '25 min', xp: 150 },
  { href: '/learn/foundations/python',       title: 'Python for Data Engineers',       section: 'Foundations', difficulty: 'Intermediate', color: '#00c2ff', readTime: '20 min', xp: 150 },
  // Azure Track
  { href: '/learn/azure/introduction',       title: 'Azure Introduction',              section: 'Azure Track', difficulty: 'Beginner',     color: '#0078d4', readTime: '12 min', xp: 100 },
  { href: '/learn/azure/adls-gen2',          title: 'ADLS Gen2',                       section: 'Azure Track', difficulty: 'Intermediate', color: '#0078d4', readTime: '15 min', xp: 150 },
  { href: '/learn/azure/adf',                title: 'Azure Data Factory',              section: 'Azure Track', difficulty: 'Intermediate', color: '#0078d4', readTime: '16 min', xp: 150 },
  { href: '/learn/azure/databricks',         title: 'Azure Databricks',                section: 'Azure Track', difficulty: 'Advanced',     color: '#0078d4', readTime: '20 min', xp: 200 },
  { href: '/learn/azure/synapse',            title: 'Azure Synapse Analytics',         section: 'Azure Track', difficulty: 'Advanced',     color: '#0078d4', readTime: '14 min', xp: 200 },
  { href: '/learn/azure/event-hubs',         title: 'Azure Event Hubs',                section: 'Azure Track', difficulty: 'Advanced',     color: '#0078d4', readTime: '14 min', xp: 200 },
  { href: '/learn/azure/key-vault',          title: 'Azure Key Vault',                 section: 'Azure Track', difficulty: 'Intermediate', color: '#0078d4', readTime: '12 min', xp: 150 },
  { href: '/learn/azure/microsoft-fabric',   title: 'Microsoft Fabric',                section: 'Azure Track', difficulty: 'Advanced',     color: '#0078d4', readTime: '15 min', xp: 200 },
  // AWS Track
  { href: '/learn/aws/introduction',         title: 'AWS Introduction',                section: 'AWS Track',   difficulty: 'Beginner',     color: '#ff9900', readTime: '12 min', xp: 100 },
  { href: '/learn/aws/s3',                   title: 'Amazon S3',                       section: 'AWS Track',   difficulty: 'Intermediate', color: '#ff9900', readTime: '12 min', xp: 150 },
  { href: '/learn/aws/glue',                 title: 'AWS Glue',                        section: 'AWS Track',   difficulty: 'Intermediate', color: '#ff9900', readTime: '14 min', xp: 150 },
  { href: '/learn/aws/redshift',             title: 'Amazon Redshift',                 section: 'AWS Track',   difficulty: 'Advanced',     color: '#ff9900', readTime: '13 min', xp: 200 },
  { href: '/learn/aws/kinesis',              title: 'Amazon Kinesis',                  section: 'AWS Track',   difficulty: 'Advanced',     color: '#ff9900', readTime: '13 min', xp: 200 },
  { href: '/learn/aws/athena',               title: 'Amazon Athena',                   section: 'AWS Track',   difficulty: 'Intermediate', color: '#ff9900', readTime: '13 min', xp: 150 },
  { href: '/learn/aws/emr',                  title: 'Amazon EMR',                      section: 'AWS Track',   difficulty: 'Advanced',     color: '#ff9900', readTime: '13 min', xp: 200 },
  { href: '/learn/aws/step-functions',       title: 'AWS Step Functions',              section: 'AWS Track',   difficulty: 'Advanced',     color: '#ff9900', readTime: '12 min', xp: 200 },
  { href: '/learn/aws/lake-formation',       title: 'AWS Lake Formation',              section: 'AWS Track',   difficulty: 'Advanced',     color: '#ff9900', readTime: '12 min', xp: 200 },
  // GCP Track
  { href: '/learn/gcp/introduction',         title: 'GCP Introduction',                section: 'GCP Track',   difficulty: 'Beginner',     color: '#4285f4', readTime: '12 min', xp: 100 },
  { href: '/learn/gcp/bigquery',             title: 'Google BigQuery',                 section: 'GCP Track',   difficulty: 'Intermediate', color: '#4285f4', readTime: '15 min', xp: 150 },
  { href: '/learn/gcp/dataflow',             title: 'Cloud Dataflow',                  section: 'GCP Track',   difficulty: 'Advanced',     color: '#4285f4', readTime: '14 min', xp: 200 },
  { href: '/learn/gcp/pubsub',               title: 'Cloud Pub/Sub',                   section: 'GCP Track',   difficulty: 'Intermediate', color: '#4285f4', readTime: '12 min', xp: 150 },
  { href: '/learn/gcp/composer',             title: 'Cloud Composer',                  section: 'GCP Track',   difficulty: 'Advanced',     color: '#4285f4', readTime: '14 min', xp: 200 },
  // Projects — all three live projects
  { href: '/learn/projects/azure-batch-pipeline', title: 'Project 01 — Copy CSV to ADLS',        section: 'Projects', difficulty: 'Advanced', color: '#00e676', readTime: '60 min', xp: 500 },
  { href: '/learn/projects/azure-project-02',     title: 'Project 02 — ForEach Loop',            section: 'Projects', difficulty: 'Advanced', color: '#00e676', readTime: '60 min', xp: 500 },
  { href: '/learn/projects/azure-project-03',     title: 'Project 03 — Run Date Pipeline',       section: 'Projects', difficulty: 'Advanced', color: '#00e676', readTime: '75 min', xp: 500 },
  // Career
  { href: '/learn/interview',                title: 'Interview Prep',                  section: 'Interview',   difficulty: 'Intermediate', color: '#ff6b6b', readTime: '20 min', xp: 200 },
]

export const NEXT_PAGES: Record<string, PageMeta[]> = {
  '/learn/what-is-data-engineering': [
    PAGE_ORDER.find(p => p.href === '/learn/roadmap')!,
    PAGE_ORDER.find(p => p.href === '/learn/foundations/sql')!,
  ],
  '/learn/roadmap': [
    PAGE_ORDER.find(p => p.href === '/learn/foundations/sql')!,
    PAGE_ORDER.find(p => p.href === '/learn/azure/introduction')!,
  ],
  '/learn/foundations/sql': [
    PAGE_ORDER.find(p => p.href === '/learn/foundations/python')!,
    PAGE_ORDER.find(p => p.href === '/learn/azure/introduction')!,
  ],
  '/learn/foundations/python': [
    PAGE_ORDER.find(p => p.href === '/learn/azure/introduction')!,
    PAGE_ORDER.find(p => p.href === '/learn/aws/introduction')!,
  ],
  '/learn/azure/introduction': [
    PAGE_ORDER.find(p => p.href === '/learn/azure/adls-gen2')!,
    PAGE_ORDER.find(p => p.href === '/learn/azure/adf')!,
  ],
  '/learn/azure/adls-gen2': [
    PAGE_ORDER.find(p => p.href === '/learn/azure/adf')!,
    PAGE_ORDER.find(p => p.href === '/learn/azure/databricks')!,
  ],
  '/learn/azure/adf': [
    PAGE_ORDER.find(p => p.href === '/learn/azure/databricks')!,
    PAGE_ORDER.find(p => p.href === '/learn/azure/synapse')!,
  ],
  '/learn/azure/databricks': [
    PAGE_ORDER.find(p => p.href === '/learn/azure/synapse')!,
    PAGE_ORDER.find(p => p.href === '/learn/azure/event-hubs')!,
  ],
  '/learn/azure/synapse': [
    PAGE_ORDER.find(p => p.href === '/learn/azure/event-hubs')!,
    PAGE_ORDER.find(p => p.href === '/learn/azure/key-vault')!,
  ],
  '/learn/azure/event-hubs': [
    PAGE_ORDER.find(p => p.href === '/learn/azure/key-vault')!,
    PAGE_ORDER.find(p => p.href === '/learn/azure/microsoft-fabric')!,
  ],
  '/learn/azure/key-vault': [
    PAGE_ORDER.find(p => p.href === '/learn/azure/microsoft-fabric')!,
    PAGE_ORDER.find(p => p.href === '/learn/projects/azure-batch-pipeline')!,
  ],
  '/learn/azure/microsoft-fabric': [
    PAGE_ORDER.find(p => p.href === '/learn/projects/azure-batch-pipeline')!,
    PAGE_ORDER.find(p => p.href === '/learn/aws/introduction')!,
  ],
  '/learn/aws/introduction': [
    PAGE_ORDER.find(p => p.href === '/learn/aws/s3')!,
    PAGE_ORDER.find(p => p.href === '/learn/aws/glue')!,
  ],
  '/learn/aws/s3': [
    PAGE_ORDER.find(p => p.href === '/learn/aws/glue')!,
    PAGE_ORDER.find(p => p.href === '/learn/aws/redshift')!,
  ],
  '/learn/aws/glue': [
    PAGE_ORDER.find(p => p.href === '/learn/aws/redshift')!,
    PAGE_ORDER.find(p => p.href === '/learn/aws/kinesis')!,
  ],
  '/learn/aws/redshift': [
    PAGE_ORDER.find(p => p.href === '/learn/aws/kinesis')!,
    PAGE_ORDER.find(p => p.href === '/learn/aws/athena')!,
  ],
  '/learn/aws/kinesis': [
    PAGE_ORDER.find(p => p.href === '/learn/aws/athena')!,
    PAGE_ORDER.find(p => p.href === '/learn/aws/emr')!,
  ],
  '/learn/aws/athena': [
    PAGE_ORDER.find(p => p.href === '/learn/aws/emr')!,
    PAGE_ORDER.find(p => p.href === '/learn/aws/step-functions')!,
  ],
  '/learn/aws/emr': [
    PAGE_ORDER.find(p => p.href === '/learn/aws/step-functions')!,
    PAGE_ORDER.find(p => p.href === '/learn/aws/lake-formation')!,
  ],
  '/learn/aws/step-functions': [
    PAGE_ORDER.find(p => p.href === '/learn/aws/lake-formation')!,
    PAGE_ORDER.find(p => p.href === '/learn/gcp/introduction')!,
  ],
  '/learn/aws/lake-formation': [
    PAGE_ORDER.find(p => p.href === '/learn/gcp/introduction')!,
    PAGE_ORDER.find(p => p.href === '/learn/gcp/bigquery')!,
  ],
  '/learn/projects/azure-batch-pipeline': [
    PAGE_ORDER.find(p => p.href === '/learn/projects/azure-project-02')!,
  ],
  '/learn/projects/azure-project-02': [
    PAGE_ORDER.find(p => p.href === '/learn/projects/azure-project-03')!,
  ],
}

export function getPageMeta(href: string): PageMeta | undefined {
  return PAGE_ORDER.find(p => p.href === href)
}

export function getPrevNext(href: string): { prev: PageMeta | null; next: PageMeta | null } {
  const idx = PAGE_ORDER.findIndex(p => p.href === href)
  return {
    prev: idx > 0 ? PAGE_ORDER[idx - 1] : null,
    next: idx < PAGE_ORDER.length - 1 ? PAGE_ORDER[idx + 1] : null,
  }
}