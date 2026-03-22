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
  { href: '/learn/what-is-data-engineering', title: 'What is Data Engineering?',    section: 'Foundations', difficulty: 'Beginner',     color: '#00c2ff', readTime: '10 min', xp: 100 },
  { href: '/learn/roadmap',                  title: 'Roadmap 2026',                  section: 'Foundations', difficulty: 'Beginner',     color: '#00c2ff', readTime: '8 min',  xp: 100 },
  { href: '/learn/foundations/sql',          title: 'SQL for Data Engineers',        section: 'Foundations', difficulty: 'Intermediate', color: '#00c2ff', readTime: '25 min', xp: 150 },
  { href: '/learn/foundations/postgresql',   title: 'PostgreSQL',                    section: 'Foundations', difficulty: 'Intermediate', color: '#00c2ff', readTime: '20 min', xp: 150 },
  { href: '/learn/foundations/python',       title: 'Python for Data Engineers',     section: 'Foundations', difficulty: 'Intermediate', color: '#00c2ff', readTime: '20 min', xp: 150 },

  // Data Engineering Track
  { href: '/learn/data-engineering',                             title: 'Data Engineering Overview',         section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '10 min', xp: 100 },
  { href: '/learn/data-engineering/what-is-data-engineering',   title: 'What is Data Engineering?',         section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '10 min', xp: 100 },
  { href: '/learn/data-engineering/what-is-data',               title: 'What is Data?',                     section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '10 min', xp: 100 },
  { href: '/learn/data-engineering/de-vs-other-roles',          title: 'DE vs Other Roles',                 section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '10 min', xp: 100 },
  { href: '/learn/data-engineering/de-ecosystem',               title: 'DE Ecosystem',                      section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '12 min', xp: 100 },
  { href: '/learn/data-engineering/how-data-moves',             title: 'How Data Moves',                    section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '12 min', xp: 100 },
  { href: '/learn/data-engineering/what-is-a-pipeline',         title: 'What is a Pipeline?',               section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '10 min', xp: 100 },
  { href: '/learn/data-engineering/batch-vs-streaming',         title: 'Batch vs Streaming',                section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '12 min', xp: 100 },
  { href: '/learn/data-engineering/etl-vs-elt',                 title: 'ETL vs ELT',                        section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '12 min', xp: 100 },
  { href: '/learn/data-engineering/ingestion-patterns',         title: 'Ingestion Patterns',                section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '14 min', xp: 150 },
  { href: '/learn/data-engineering/batch-pipeline-from-scratch', title: 'Batch Pipeline From Scratch',      section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '15 min', xp: 150 },
  { href: '/learn/data-engineering/streaming-data',             title: 'Streaming Data',                    section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '14 min', xp: 150 },
  { href: '/learn/data-engineering/data-formats',               title: 'Data Formats',                      section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '12 min', xp: 150 },
  { href: '/learn/data-engineering/data-types-structured',      title: 'Structured vs Unstructured Data',   section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '10 min', xp: 100 },
  { href: '/learn/data-engineering/schemas-tables-keys',        title: 'Schemas, Tables & Keys',            section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '12 min', xp: 150 },
  { href: '/learn/data-engineering/sql-for-de',                 title: 'SQL for Data Engineers',            section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '20 min', xp: 150 },
  { href: '/learn/data-engineering/sql-vs-nosql',               title: 'SQL vs NoSQL',                      section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '12 min', xp: 150 },
  { href: '/learn/data-engineering/python-for-de',              title: 'Python for DE',                     section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '15 min', xp: 150 },
  { href: '/learn/data-engineering/data-modelling',             title: 'Data Modelling',                    section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '14 min', xp: 150 },
  { href: '/learn/data-engineering/data-vault',                 title: 'Data Vault',                        section: 'Data Engineering', difficulty: 'Advanced',     color: '#00c2ff', readTime: '14 min', xp: 200 },
  { href: '/learn/data-engineering/slowly-changing-dimensions', title: 'Slowly Changing Dimensions',        section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '14 min', xp: 150 },
  { href: '/learn/data-engineering/medallion-architecture',     title: 'Medallion Architecture',            section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '14 min', xp: 150 },
  { href: '/learn/data-engineering/data-lake-architecture',     title: 'Data Lake Architecture',            section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '14 min', xp: 150 },
  { href: '/learn/data-engineering/lakehouse-architecture',     title: 'Lakehouse Architecture',            section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '14 min', xp: 150 },
  { href: '/learn/data-engineering/warehouse-concepts',         title: 'Warehouse Concepts',                section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '14 min', xp: 150 },
  { href: '/learn/data-engineering/warehouse-lake-lakehouse',   title: 'Warehouse vs Lake vs Lakehouse',    section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '12 min', xp: 150 },
  { href: '/learn/data-engineering/databases-internals',        title: 'Database Internals',                section: 'Data Engineering', difficulty: 'Advanced',     color: '#00c2ff', readTime: '16 min', xp: 200 },
  { href: '/learn/data-engineering/acid-transactions',          title: 'ACID Transactions',                 section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '12 min', xp: 150 },
  { href: '/learn/data-engineering/idempotency-atomicity',      title: 'Idempotency & Atomicity',           section: 'Data Engineering', difficulty: 'Advanced',     color: '#00c2ff', readTime: '12 min', xp: 200 },
  { href: '/learn/data-engineering/data-quality',               title: 'Data Quality',                      section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '14 min', xp: 150 },
  { href: '/learn/data-engineering/error-handling-retries',     title: 'Error Handling & Retries',          section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '12 min', xp: 150 },
  { href: '/learn/data-engineering/pipeline-orchestration',     title: 'Pipeline Orchestration',            section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '14 min', xp: 150 },
  { href: '/learn/data-engineering/message-brokers-queues',     title: 'Message Brokers & Queues',          section: 'Data Engineering', difficulty: 'Advanced',     color: '#00c2ff', readTime: '14 min', xp: 200 },
  { href: '/learn/data-engineering/distributed-systems',        title: 'Distributed Systems',               section: 'Data Engineering', difficulty: 'Advanced',     color: '#00c2ff', readTime: '16 min', xp: 200 },
  { href: '/learn/data-engineering/files-at-scale',             title: 'Files at Scale',                    section: 'Data Engineering', difficulty: 'Advanced',     color: '#00c2ff', readTime: '14 min', xp: 200 },
  { href: '/learn/data-engineering/performance-tuning',         title: 'Performance Tuning',                section: 'Data Engineering', difficulty: 'Advanced',     color: '#00c2ff', readTime: '16 min', xp: 200 },
  { href: '/learn/data-engineering/monitoring-observability',   title: 'Monitoring & Observability',        section: 'Data Engineering', difficulty: 'Advanced',     color: '#00c2ff', readTime: '14 min', xp: 200 },
  { href: '/learn/data-engineering/working-with-apis',          title: 'Working with APIs',                 section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '14 min', xp: 150 },
  { href: '/learn/data-engineering/git-for-data',               title: 'Git for Data Engineers',            section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '12 min', xp: 100 },
  { href: '/learn/data-engineering/linux-shell',                title: 'Linux & Shell',                     section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '14 min', xp: 150 },
  { href: '/learn/data-engineering/infrastructure-as-code',     title: 'Infrastructure as Code',            section: 'Data Engineering', difficulty: 'Advanced',     color: '#00c2ff', readTime: '14 min', xp: 200 },
  { href: '/learn/data-engineering/cicd-pipelines',             title: 'CI/CD Pipelines',                   section: 'Data Engineering', difficulty: 'Advanced',     color: '#00c2ff', readTime: '14 min', xp: 200 },
  { href: '/learn/data-engineering/security-compliance',        title: 'Security & Compliance',             section: 'Data Engineering', difficulty: 'Advanced',     color: '#00c2ff', readTime: '14 min', xp: 200 },
  { href: '/learn/data-engineering/data-governance',            title: 'Data Governance',                   section: 'Data Engineering', difficulty: 'Advanced',     color: '#00c2ff', readTime: '14 min', xp: 200 },
  { href: '/learn/data-engineering/system-design-de',           title: 'System Design for DE',              section: 'Data Engineering', difficulty: 'Advanced',     color: '#00c2ff', readTime: '20 min', xp: 200 },
  { href: '/learn/data-engineering/de-india-job-market',        title: 'DE India Job Market',               section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '10 min', xp: 100 },
  { href: '/learn/data-engineering/de-interview-questions',     title: 'DE Interview Questions',            section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '20 min', xp: 200 },

  // Azure Track
  { href: '/learn/azure/introduction',       title: 'Azure Introduction',            section: 'Azure Track', difficulty: 'Beginner',     color: '#0078d4', readTime: '12 min', xp: 100 },
  { href: '/learn/azure/adls-gen2',          title: 'ADLS Gen2',                     section: 'Azure Track', difficulty: 'Intermediate', color: '#0078d4', readTime: '15 min', xp: 150 },
  { href: '/learn/azure/adf',                title: 'Azure Data Factory',            section: 'Azure Track', difficulty: 'Intermediate', color: '#0078d4', readTime: '16 min', xp: 150 },
  { href: '/learn/azure/databricks',         title: 'Azure Databricks',              section: 'Azure Track', difficulty: 'Advanced',     color: '#0078d4', readTime: '20 min', xp: 200 },
  { href: '/learn/azure/synapse',            title: 'Azure Synapse Analytics',       section: 'Azure Track', difficulty: 'Advanced',     color: '#0078d4', readTime: '14 min', xp: 200 },
  { href: '/learn/azure/event-hubs',         title: 'Azure Event Hubs',              section: 'Azure Track', difficulty: 'Advanced',     color: '#0078d4', readTime: '14 min', xp: 200 },
  { href: '/learn/azure/key-vault',          title: 'Azure Key Vault',               section: 'Azure Track', difficulty: 'Intermediate', color: '#0078d4', readTime: '12 min', xp: 150 },
  { href: '/learn/azure/microsoft-fabric',   title: 'Microsoft Fabric',              section: 'Azure Track', difficulty: 'Advanced',     color: '#0078d4', readTime: '15 min', xp: 200 },

  // AWS Track
  { href: '/learn/aws/introduction',         title: 'AWS Introduction',              section: 'AWS Track',   difficulty: 'Beginner',     color: '#ff9900', readTime: '12 min', xp: 100 },
  { href: '/learn/aws/s3',                   title: 'Amazon S3',                     section: 'AWS Track',   difficulty: 'Intermediate', color: '#ff9900', readTime: '12 min', xp: 150 },
  { href: '/learn/aws/glue',                 title: 'AWS Glue',                      section: 'AWS Track',   difficulty: 'Intermediate', color: '#ff9900', readTime: '14 min', xp: 150 },
  { href: '/learn/aws/redshift',             title: 'Amazon Redshift',               section: 'AWS Track',   difficulty: 'Advanced',     color: '#ff9900', readTime: '13 min', xp: 200 },
  { href: '/learn/aws/kinesis',              title: 'Amazon Kinesis',                section: 'AWS Track',   difficulty: 'Advanced',     color: '#ff9900', readTime: '13 min', xp: 200 },
  { href: '/learn/aws/athena',               title: 'Amazon Athena',                 section: 'AWS Track',   difficulty: 'Intermediate', color: '#ff9900', readTime: '13 min', xp: 150 },
  { href: '/learn/aws/emr',                  title: 'Amazon EMR',                    section: 'AWS Track',   difficulty: 'Advanced',     color: '#ff9900', readTime: '13 min', xp: 200 },
  { href: '/learn/aws/step-functions',       title: 'AWS Step Functions',            section: 'AWS Track',   difficulty: 'Advanced',     color: '#ff9900', readTime: '12 min', xp: 200 },
  { href: '/learn/aws/lake-formation',       title: 'AWS Lake Formation',            section: 'AWS Track',   difficulty: 'Advanced',     color: '#ff9900', readTime: '12 min', xp: 200 },

  // GCP Track
  { href: '/learn/gcp/introduction',         title: 'GCP Introduction',              section: 'GCP Track',   difficulty: 'Beginner',     color: '#4285f4', readTime: '12 min', xp: 100 },
  { href: '/learn/gcp/bigquery',             title: 'Google BigQuery',               section: 'GCP Track',   difficulty: 'Intermediate', color: '#4285f4', readTime: '15 min', xp: 150 },
  { href: '/learn/gcp/dataflow',             title: 'Cloud Dataflow',                section: 'GCP Track',   difficulty: 'Advanced',     color: '#4285f4', readTime: '14 min', xp: 200 },
  { href: '/learn/gcp/pubsub',               title: 'Cloud Pub/Sub',                 section: 'GCP Track',   difficulty: 'Intermediate', color: '#4285f4', readTime: '12 min', xp: 150 },
  { href: '/learn/gcp/composer',             title: 'Cloud Composer',                section: 'GCP Track',   difficulty: 'Advanced',     color: '#4285f4', readTime: '14 min', xp: 200 },

  // DSA Track
  { href: '/learn/dsa',                      title: 'DSA Overview',                  section: 'DSA', difficulty: 'Beginner',     color: '#8b5cf6', readTime: '8 min',  xp: 100 },
  { href: '/learn/dsa/introduction',         title: 'Introduction to DSA',           section: 'DSA', difficulty: 'Beginner',     color: '#8b5cf6', readTime: '10 min', xp: 100 },
  { href: '/learn/dsa/complexity',           title: 'Time & Space Complexity',       section: 'DSA', difficulty: 'Beginner',     color: '#8b5cf6', readTime: '12 min', xp: 100 },
  { href: '/learn/dsa/arrays',               title: 'Arrays',                        section: 'DSA', difficulty: 'Beginner',     color: '#8b5cf6', readTime: '14 min', xp: 100 },
  { href: '/learn/dsa/strings',              title: 'Strings',                       section: 'DSA', difficulty: 'Beginner',     color: '#8b5cf6', readTime: '14 min', xp: 100 },
  { href: '/learn/dsa/pointers',             title: 'Pointers',                      section: 'DSA', difficulty: 'Beginner',     color: '#8b5cf6', readTime: '12 min', xp: 100 },
  { href: '/learn/dsa/linked-lists',         title: 'Linked Lists',                  section: 'DSA', difficulty: 'Intermediate', color: '#8b5cf6', readTime: '15 min', xp: 150 },
  { href: '/learn/dsa/stacks',               title: 'Stacks',                        section: 'DSA', difficulty: 'Intermediate', color: '#8b5cf6', readTime: '12 min', xp: 150 },
  { href: '/learn/dsa/queues',               title: 'Queues',                        section: 'DSA', difficulty: 'Intermediate', color: '#8b5cf6', readTime: '12 min', xp: 150 },
  { href: '/learn/dsa/hashing',              title: 'Hashing',                       section: 'DSA', difficulty: 'Intermediate', color: '#8b5cf6', readTime: '14 min', xp: 150 },
  { href: '/learn/dsa/trees',                title: 'Trees',                         section: 'DSA', difficulty: 'Intermediate', color: '#8b5cf6', readTime: '16 min', xp: 150 },
  { href: '/learn/dsa/binary-search-tree',   title: 'Binary Search Trees',           section: 'DSA', difficulty: 'Intermediate', color: '#8b5cf6', readTime: '15 min', xp: 150 },
  { href: '/learn/dsa/heaps',                title: 'Heaps',                         section: 'DSA', difficulty: 'Intermediate', color: '#8b5cf6', readTime: '14 min', xp: 150 },
  { href: '/learn/dsa/graphs',               title: 'Graphs',                        section: 'DSA', difficulty: 'Advanced',     color: '#8b5cf6', readTime: '18 min', xp: 200 },
  { href: '/learn/dsa/searching',            title: 'Searching Algorithms',          section: 'DSA', difficulty: 'Intermediate', color: '#8b5cf6', readTime: '12 min', xp: 150 },
  { href: '/learn/dsa/sorting',              title: 'Sorting Algorithms',            section: 'DSA', difficulty: 'Intermediate', color: '#8b5cf6', readTime: '16 min', xp: 150 },
  { href: '/learn/dsa/recursion',            title: 'Recursion',                     section: 'DSA', difficulty: 'Intermediate', color: '#8b5cf6', readTime: '14 min', xp: 150 },
  { href: '/learn/dsa/backtracking',         title: 'Backtracking',                  section: 'DSA', difficulty: 'Advanced',     color: '#8b5cf6', readTime: '16 min', xp: 200 },
  { href: '/learn/dsa/dynamic-programming',  title: 'Dynamic Programming',           section: 'DSA', difficulty: 'Advanced',     color: '#8b5cf6', readTime: '20 min', xp: 200 },
  { href: '/learn/dsa/greedy',               title: 'Greedy Algorithms',             section: 'DSA', difficulty: 'Advanced',     color: '#8b5cf6', readTime: '14 min', xp: 200 },
  { href: '/learn/dsa/advanced',             title: 'Advanced DSA Topics',           section: 'DSA', difficulty: 'Advanced',     color: '#8b5cf6', readTime: '20 min', xp: 200 },

  // DBMS Track
  { href: '/learn/dbms',                           title: 'DBMS Overview',                  section: 'DBMS', difficulty: 'Beginner',     color: '#ec4899', readTime: '8 min',  xp: 100 },
  { href: '/learn/dbms/introduction',              title: 'Introduction to Databases',       section: 'DBMS', difficulty: 'Beginner',     color: '#ec4899', readTime: '12 min', xp: 100 },
  { href: '/learn/dbms/data-models',               title: 'Data Models',                     section: 'DBMS', difficulty: 'Beginner',     color: '#ec4899', readTime: '12 min', xp: 100 },
  { href: '/learn/dbms/er-model',                  title: 'ER Model',                        section: 'DBMS', difficulty: 'Beginner',     color: '#ec4899', readTime: '14 min', xp: 100 },
  { href: '/learn/dbms/relational-model',          title: 'Relational Model',                section: 'DBMS', difficulty: 'Intermediate', color: '#ec4899', readTime: '14 min', xp: 150 },
  { href: '/learn/dbms/relational-algebra',        title: 'Relational Algebra',              section: 'DBMS', difficulty: 'Intermediate', color: '#ec4899', readTime: '16 min', xp: 150 },
  { href: '/learn/dbms/sql-complete',              title: 'SQL Complete Guide',              section: 'DBMS', difficulty: 'Intermediate', color: '#ec4899', readTime: '25 min', xp: 150 },
  { href: '/learn/dbms/normalization',             title: 'Normalization',                   section: 'DBMS', difficulty: 'Intermediate', color: '#ec4899', readTime: '16 min', xp: 150 },
  { href: '/learn/dbms/functional-dependencies',   title: 'Functional Dependencies',         section: 'DBMS', difficulty: 'Intermediate', color: '#ec4899', readTime: '14 min', xp: 150 },
  { href: '/learn/dbms/transactions',              title: 'Transactions',                    section: 'DBMS', difficulty: 'Intermediate', color: '#ec4899', readTime: '14 min', xp: 150 },
  { href: '/learn/dbms/concurrency-control',       title: 'Concurrency Control',             section: 'DBMS', difficulty: 'Advanced',     color: '#ec4899', readTime: '16 min', xp: 200 },
  { href: '/learn/dbms/crash-recovery',            title: 'Crash Recovery',                  section: 'DBMS', difficulty: 'Advanced',     color: '#ec4899', readTime: '14 min', xp: 200 },
  { href: '/learn/dbms/indexes',                   title: 'Indexes',                         section: 'DBMS', difficulty: 'Intermediate', color: '#ec4899', readTime: '14 min', xp: 150 },
  { href: '/learn/dbms/hashing-btrees',            title: 'Hashing & B-Trees',               section: 'DBMS', difficulty: 'Advanced',     color: '#ec4899', readTime: '16 min', xp: 200 },
  { href: '/learn/dbms/storage-file-organization', title: 'Storage & File Organization',     section: 'DBMS', difficulty: 'Advanced',     color: '#ec4899', readTime: '14 min', xp: 200 },
  { href: '/learn/dbms/query-processing',          title: 'Query Processing',                section: 'DBMS', difficulty: 'Advanced',     color: '#ec4899', readTime: '16 min', xp: 200 },
  { href: '/learn/dbms/views-procedures-triggers', title: 'Views, Procedures & Triggers',    section: 'DBMS', difficulty: 'Intermediate', color: '#ec4899', readTime: '16 min', xp: 150 },
  { href: '/learn/dbms/nosql-databases',           title: 'NoSQL Databases',                 section: 'DBMS', difficulty: 'Intermediate', color: '#ec4899', readTime: '14 min', xp: 150 },
  { href: '/learn/dbms/distributed-databases',     title: 'Distributed Databases',           section: 'DBMS', difficulty: 'Advanced',     color: '#ec4899', readTime: '16 min', xp: 200 },
  { href: '/learn/dbms/database-security',         title: 'Database Security',               section: 'DBMS', difficulty: 'Intermediate', color: '#ec4899', readTime: '12 min', xp: 150 },
  { href: '/learn/dbms/interview-questions',       title: 'DBMS Interview Questions',        section: 'DBMS', difficulty: 'Intermediate', color: '#ec4899', readTime: '20 min', xp: 200 },

  // Projects
  { href: '/learn/projects/azure-batch-pipeline', title: 'Project 01 — Copy CSV to ADLS',         section: 'Projects', difficulty: 'Advanced', color: '#00e676', readTime: '60 min', xp: 500 },
  { href: '/learn/projects/azure-projects-02',    title: 'Project 02 — ForEach Loop',              section: 'Projects', difficulty: 'Advanced', color: '#00e676', readTime: '60 min', xp: 500 },
  { href: '/learn/projects/azure-project-03',     title: 'Project 03 — Run Date Pipeline',         section: 'Projects', difficulty: 'Advanced', color: '#00e676', readTime: '75 min', xp: 500 },
  { href: '/learn/projects/azure-project-04',     title: 'Project 04 — HTTP Ingestion',            section: 'Projects', difficulty: 'Advanced', color: '#00e676', readTime: '75 min', xp: 500 },
  { href: '/learn/projects/azure-project-05',     title: 'Project 05 — File Management',           section: 'Projects', difficulty: 'Advanced', color: '#00e676', readTime: '90 min', xp: 500 },
  { href: '/learn/projects/azure-project-06',     title: 'Project 06 — Pull Data From a REST API', section: 'Projects', difficulty: 'Advanced', color: '#00e676', readTime: '90 min', xp: 500 },

  // Career
  { href: '/learn/interview', title: 'Interview Prep',       section: 'Interview', difficulty: 'Intermediate', color: '#ff6b6b', readTime: '20 min', xp: 200 },
  { href: '/learn/industry',  title: 'Top Companies Hiring', section: 'Industry',  difficulty: 'Beginner',     color: '#f5c542', readTime: '10 min', xp: 100 },
]

export function getPageMeta(href: string): PageMeta | undefined {
  return PAGE_ORDER.find(p => p.href === href)
}

export function getPrevNext(href: string): { prev: PageMeta | null; next: PageMeta | null } {
  const idx = PAGE_ORDER.findIndex(p => p.href === href)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? PAGE_ORDER[idx - 1] : null,
    next: idx < PAGE_ORDER.length - 1 ? PAGE_ORDER[idx + 1] : null,
  }
}

export function getNextPages(href: string): PageMeta[] {
  const current = PAGE_ORDER.find(p => p.href === href)
  if (!current) return []
  const sectionPages = PAGE_ORDER.filter(p => p.section === current.section)
  const idx = sectionPages.findIndex(p => p.href === href)
  return sectionPages.slice(idx + 1, idx + 3)
}

export const NEXT_PAGES: Record<string, PageMeta[]> = {
  '/learn/foundations/python': [
    PAGE_ORDER.find(p => p.href === '/learn/azure/introduction')!,
    PAGE_ORDER.find(p => p.href === '/learn/aws/introduction')!,
  ],
  '/learn/azure/microsoft-fabric': [
    PAGE_ORDER.find(p => p.href === '/learn/projects/azure-batch-pipeline')!,
    PAGE_ORDER.find(p => p.href === '/learn/aws/introduction')!,
  ],
  '/learn/aws/lake-formation': [
    PAGE_ORDER.find(p => p.href === '/learn/gcp/introduction')!,
    PAGE_ORDER.find(p => p.href === '/learn/projects/azure-batch-pipeline')!,
  ],
  '/learn/gcp/composer': [
    PAGE_ORDER.find(p => p.href === '/learn/projects/azure-batch-pipeline')!,
    PAGE_ORDER.find(p => p.href === '/learn/interview')!,
  ],
  '/learn/projects/azure-batch-pipeline': [
    PAGE_ORDER.find(p => p.href === '/learn/projects/azure-projects-02')!,
  ],
  '/learn/projects/azure-projects-02': [
    PAGE_ORDER.find(p => p.href === '/learn/projects/azure-project-03')!,
  ],
  '/learn/projects/azure-project-03': [
    PAGE_ORDER.find(p => p.href === '/learn/projects/azure-project-04')!,
  ],
  '/learn/projects/azure-project-04': [
    PAGE_ORDER.find(p => p.href === '/learn/projects/azure-project-05')!,
  ],
  '/learn/projects/azure-project-05': [
    PAGE_ORDER.find(p => p.href === '/learn/projects/azure-project-06')!,
  ],
}
