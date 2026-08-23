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
  { href: '/learn/data-engineering/what-is-data-engineering',   title: 'What is Data Engineering?',         section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '10 min', xp: 100 },
  { href: '/learn/data-engineering/what-is-data',               title: 'What is Data?',                     section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '10 min', xp: 100 },
  { href: '/learn/data-engineering/de-vs-other-roles',          title: 'DE vs Other Roles',                 section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '10 min', xp: 100 },
  { href: '/learn/data-engineering/de-ecosystem',               title: 'DE Ecosystem',                      section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '12 min', xp: 100 },
  { href: '/learn/data-engineering/how-data-moves',             title: 'How Data Moves',                    section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '12 min', xp: 100 },
  { href: '/learn/data-engineering/what-is-a-pipeline',         title: 'What is a Pipeline?',               section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '10 min', xp: 100 },
  { href: '/learn/data-engineering/batch-vs-streaming',         title: 'Batch vs Streaming',                section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '12 min', xp: 100 },
  { href: '/learn/data-engineering/etl-vs-elt',                 title: 'ETL vs ELT',                        section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '12 min', xp: 100 },
  { href: '/learn/data-engineering/ingestion-patterns',         title: 'Ingestion Patterns',                section: 'Data Engineering', difficulty: 'Intermediate', color: '#00c2ff', readTime: '14 min', xp: 150 },
  { href: '/learn/data-engineering/change-data-capture',        title: 'Change Data Capture (CDC)',         section: 'Data Engineering', difficulty: 'Advanced',     color: '#00c2ff', readTime: '55 min', xp: 200 },
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
  { href: '/learn/data-engineering/de-usa-job-market',          title: 'DE USA Job Market',                 section: 'Data Engineering', difficulty: 'Beginner',     color: '#00c2ff', readTime: '10 min', xp: 100 },
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
  { href: '/learn/dbms',                           title: 'DBMS Overview',                  section: 'DBMS', difficulty: 'Beginner',     color: '#ec4899', readTime: 'Self-paced', xp: 100 },
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

  // SQL Track

  // Python Track
  { href: '/learn/python/what-is-python-setup',      title: 'What is Python? Setup & Your First Program',  section: 'Python', difficulty: 'Beginner', color: '#00e676', readTime: '55 min', xp: 150 },
  { href: '/learn/python/variables-data-types',      title: 'Variables, Data Types & Type Conversion',     section: 'Python', difficulty: 'Beginner', color: '#00e676', readTime: '60 min', xp: 150 },
  { href: '/learn/python/operators',                 title: 'Operators — Arithmetic, Comparison, Logical', section: 'Python', difficulty: 'Beginner', color: '#00e676', readTime: '50 min', xp: 150 },
  { href: '/learn/python/strings',                   title: 'Strings — Creation, Indexing, Slicing, Methods', section: 'Python', difficulty: 'Beginner', color: '#00e676', readTime: '65 min', xp: 200 },
  { href: '/learn/python/control-flow',              title: 'Control Flow — if / elif / else',             section: 'Python', difficulty: 'Beginner', color: '#00e676', readTime: '55 min', xp: 150 },
  { href: '/learn/python/loops',                     title: 'Loops — for / while, break / continue',       section: 'Python', difficulty: 'Beginner', color: '#00e676', readTime: '35 min', xp: 100 },
  { href: '/learn/python/functions',                 title: 'Functions — Defining, Parameters, Return Values', section: 'Python', difficulty: 'Beginner', color: '#00e676', readTime: '40 min', xp: 150 },
  { href: '/learn/python/lists',                     title: 'Lists — Creation, Indexing, Methods',         section: 'Python', difficulty: 'Beginner', color: '#00e676', readTime: '40 min', xp: 150 },
  { href: '/learn/python/tuples-sets',                title: 'Tuples and Sets',                             section: 'Python', difficulty: 'Beginner', color: '#00e676', readTime: '30 min', xp: 100 },
  { href: '/learn/python/io-formatting',              title: 'Input/Output & f-string Formatting',          section: 'Python', difficulty: 'Beginner', color: '#00e676', readTime: '25 min', xp: 100 },
  { href: '/learn/python/dictionaries',               title: 'Dictionaries',                                section: 'Python', difficulty: 'Beginner', color: '#7b61ff', readTime: '40 min', xp: 150 },
  { href: '/learn/python/comprehensions',             title: 'List, Dict and Set Comprehensions',           section: 'Python', difficulty: 'Beginner', color: '#7b61ff', readTime: '35 min', xp: 150 },
  { href: '/learn/python/nested-data-structures',     title: 'Nested Data Structures',                      section: 'Python', difficulty: 'Beginner', color: '#7b61ff', readTime: '30 min', xp: 100 },
  { href: '/learn/python/string-manipulation-deep-dive', title: 'String Manipulation Deep Dive',            section: 'Python', difficulty: 'Beginner', color: '#7b61ff', readTime: '35 min', xp: 150 },
  { href: '/learn/python/reading-writing-files',      title: 'Reading & Writing Files',                     section: 'Python', difficulty: 'Beginner', color: '#7b61ff', readTime: '30 min', xp: 100 },
  { href: '/learn/python/csv-json',                   title: 'Working with CSV and JSON',                   section: 'Python', difficulty: 'Beginner', color: '#7b61ff', readTime: '35 min', xp: 150 },
  { href: '/learn/python/exception-handling',         title: 'Exception Handling',                          section: 'Python', difficulty: 'Intermediate', color: '#7b61ff', readTime: '40 min', xp: 150 },
  { href: '/learn/python/modules-packages-venv',      title: 'Modules, Packages & Virtual Environments',    section: 'Python', difficulty: 'Intermediate', color: '#7b61ff', readTime: '35 min', xp: 150 },
  { href: '/learn/python/classes-objects',            title: 'Classes and Objects — The Basics',            section: 'Python', difficulty: 'Intermediate', color: '#f97316', readTime: '40 min', xp: 150 },
  { href: '/learn/python/constructors-attributes',    title: 'Constructors, Instance vs Class Attributes',  section: 'Python', difficulty: 'Intermediate', color: '#f97316', readTime: '35 min', xp: 150 },
  { href: '/learn/python/inheritance-polymorphism',   title: 'Inheritance and Polymorphism',                section: 'Python', difficulty: 'Intermediate', color: '#f97316', readTime: '45 min', xp: 200 },
  { href: '/learn/python/encapsulation-dunder-methods', title: 'Encapsulation and Magic/Dunder Methods',    section: 'Python', difficulty: 'Intermediate', color: '#f97316', readTime: '40 min', xp: 150 },
  { href: '/learn/python/class-static-methods-properties', title: 'Class Methods, Static Methods and Properties', section: 'Python', difficulty: 'Intermediate', color: '#f97316', readTime: '35 min', xp: 150 },
  { href: '/learn/python/abstract-base-classes',      title: 'Abstract Base Classes and Interfaces',        section: 'Python', difficulty: 'Intermediate', color: '#f97316', readTime: '30 min', xp: 150 },
  { href: '/learn/python/args-kwargs',                title: '*args, **kwargs and Function Arguments Deep Dive', section: 'Python', difficulty: 'Intermediate', color: '#facc15', readTime: '35 min', xp: 150 },
  { href: '/learn/python/lambda-map-filter-reduce',   title: 'Lambda Functions and Functional Tools',       section: 'Python', difficulty: 'Intermediate', color: '#facc15', readTime: '30 min', xp: 150 },
  { href: '/learn/python/iterators-iterables',        title: 'Iterators and Iterables — Building Your Own', section: 'Python', difficulty: 'Intermediate', color: '#facc15', readTime: '35 min', xp: 150 },
  { href: '/learn/python/generators-yield',           title: 'Generators and yield',                        section: 'Python', difficulty: 'Intermediate', color: '#facc15', readTime: '40 min', xp: 200 },
  { href: '/learn/python/decorators',                 title: 'Decorators — Writing and Using Them',         section: 'Python', difficulty: 'Intermediate', color: '#facc15', readTime: '45 min', xp: 200 },
  { href: '/learn/python/context-managers',           title: 'Context Managers and the with Statement',     section: 'Python', difficulty: 'Intermediate', color: '#facc15', readTime: '30 min', xp: 150 },
  { href: '/learn/python/closures-scope',             title: 'Closures and Scope — The LEGB Rule',          section: 'Python', difficulty: 'Intermediate', color: '#facc15', readTime: '35 min', xp: 150 },
  { href: '/learn/python/regular-expressions',        title: 'Regular Expressions with re',                 section: 'Python', difficulty: 'Advanced', color: '#4285f4', readTime: '45 min', xp: 200 },
  { href: '/learn/python/dates-times',                title: 'Working with Dates and Times',                section: 'Python', difficulty: 'Advanced', color: '#4285f4', readTime: '35 min', xp: 150 },
  { href: '/learn/python/multithreading-multiprocessing', title: 'Multithreading and Multiprocessing Basics', section: 'Python', difficulty: 'Advanced', color: '#4285f4', readTime: '45 min', xp: 200 },
  { href: '/learn/python/async-python',               title: 'Async Python — asyncio, async/await',         section: 'Python', difficulty: 'Advanced', color: '#4285f4', readTime: '50 min', xp: 250 },
  { href: '/learn/python/type-hints-mypy',            title: 'Type Hints and Static Typing with mypy',      section: 'Python', difficulty: 'Advanced', color: '#4285f4', readTime: '35 min', xp: 150 },
  { href: '/learn/python/working-with-apis-python',   title: 'Working with APIs in Python',                 section: 'Python', difficulty: 'Advanced', color: '#4285f4', readTime: '40 min', xp: 200 },
  { href: '/learn/python/unit-testing-pytest',        title: 'Unit Testing with pytest',                    section: 'Python', difficulty: 'Advanced', color: '#4285f4', readTime: '45 min', xp: 200 },
  { href: '/learn/python/debugging-techniques',       title: 'Debugging Techniques and Tools',              section: 'Python', difficulty: 'Advanced', color: '#ff4757', readTime: '30 min', xp: 150 },
  { href: '/learn/python/logging-best-practices',     title: 'Logging Best Practices',                      section: 'Python', difficulty: 'Advanced', color: '#ff4757', readTime: '35 min', xp: 150 },
  { href: '/learn/python/packaging-distribution',     title: 'Packaging and Distributing Python Projects',  section: 'Python', difficulty: 'Advanced', color: '#ff4757', readTime: '35 min', xp: 150 },
  { href: '/learn/python/performance-profiling',      title: 'Python Performance — Profiling and Optimisation', section: 'Python', difficulty: 'Advanced', color: '#ff4757', readTime: '40 min', xp: 200 },
  { href: '/learn/python/numpy-pandas-intro',         title: 'Intro to NumPy and pandas',                   section: 'Python', difficulty: 'Advanced', color: '#ff4757', readTime: '45 min', xp: 200 },
  { href: '/learn/python/building-a-cli-tool',        title: 'Building a CLI Tool',                         section: 'Python', difficulty: 'Advanced', color: '#ff4757', readTime: '50 min', xp: 250 },
  { href: '/learn/python/python-best-practices',      title: 'Python Best Practices — PEP 8, Clean Code',   section: 'Python', difficulty: 'Advanced', color: '#ff4757', readTime: '30 min', xp: 150 },
  { href: '/learn/python/python-interview-prep',      title: 'Python Interview Prep — Common Questions and Patterns', section: 'Python', difficulty: 'Advanced', color: '#ff4757', readTime: '60 min', xp: 250 },

  // HTML & CSS Track
  { href: '/learn/html-css/what-is-html-how-the-web-works',  title: 'What is HTML? How the Web Actually Works',          section: 'HTML & CSS', difficulty: 'Beginner', color: '#00e676', readTime: '40 min', xp: 150 },
  { href: '/learn/html-css/document-structure',               title: 'Document Structure — DOCTYPE, html, head, body',    section: 'HTML & CSS', difficulty: 'Beginner', color: '#00e676', readTime: '30 min', xp: 100 },
  { href: '/learn/html-css/text-semantic-structure',           title: 'Text Elements & Semantic Structure',                section: 'HTML & CSS', difficulty: 'Beginner', color: '#00e676', readTime: '40 min', xp: 150 },
  { href: '/learn/html-css/links-navigation',                  title: 'Links and Navigation',                              section: 'HTML & CSS', difficulty: 'Beginner', color: '#00e676', readTime: '35 min', xp: 100 },
  { href: '/learn/html-css/images-media',                      title: 'Images and Media',                                  section: 'HTML & CSS', difficulty: 'Beginner', color: '#00e676', readTime: '40 min', xp: 150 },
  { href: '/learn/html-css/lists',                             title: 'Lists — ul, ol, dl',                                section: 'HTML & CSS', difficulty: 'Beginner', color: '#00e676', readTime: '25 min', xp: 100 },
  { href: '/learn/html-css/tables',                            title: 'Tables — Structure and Correct Usage',              section: 'HTML & CSS', difficulty: 'Beginner', color: '#00e676', readTime: '35 min', xp: 150 },
  { href: '/learn/html-css/forms-inputs-validation',           title: 'HTML Forms — Inputs & Validation Basics',           section: 'HTML & CSS', difficulty: 'Beginner', color: '#00e676', readTime: '45 min', xp: 200 },
  { href: '/learn/html-css/forms-advanced',                    title: 'HTML Forms — Advanced',                             section: 'HTML & CSS', difficulty: 'Beginner', color: '#00e676', readTime: '40 min', xp: 150 },
  { href: '/learn/html-css/semantic-html-accessibility-basics', title: 'Semantic HTML & Accessibility Basics',             section: 'HTML & CSS', difficulty: 'Beginner', color: '#00e676', readTime: '40 min', xp: 200 },
  { href: '/learn/html-css/html5-apis-overview',               title: 'HTML5 APIs Overview',                               section: 'HTML & CSS', difficulty: 'Beginner', color: '#7b61ff', readTime: '30 min', xp: 150 },
  { href: '/learn/html-css/embedding-content',                 title: 'Embedding Content — iframe, embed, object',         section: 'HTML & CSS', difficulty: 'Beginner', color: '#7b61ff', readTime: '30 min', xp: 100 },
  { href: '/learn/html-css/metadata-seo-fundamentals',         title: 'Metadata & SEO Fundamentals',                       section: 'HTML & CSS', difficulty: 'Beginner', color: '#7b61ff', readTime: '35 min', xp: 150 },
  { href: '/learn/html-css/html-entities-special-characters',  title: 'HTML Entities & Special Characters',                section: 'HTML & CSS', difficulty: 'Beginner', color: '#7b61ff', readTime: '20 min', xp: 100 },
  { href: '/learn/html-css/html-best-practices-validation',    title: 'HTML Best Practices & Validation',                  section: 'HTML & CSS', difficulty: 'Beginner', color: '#7b61ff', readTime: '30 min', xp: 150 },
  { href: '/learn/html-css/building-a-complete-static-page',   title: 'Building a Complete Static Page',                   section: 'HTML & CSS', difficulty: 'Beginner', color: '#7b61ff', readTime: '50 min', xp: 250 },
  { href: '/learn/html-css/what-is-css-syntax-selectors-cascade', title: 'What is CSS? Syntax, Selectors & the Cascade',   section: 'HTML & CSS', difficulty: 'Beginner', color: '#f97316', readTime: '40 min', xp: 150 },
  { href: '/learn/html-css/the-box-model',                     title: 'The Box Model — Margin, Border, Padding, Content',  section: 'HTML & CSS', difficulty: 'Beginner', color: '#f97316', readTime: '35 min', xp: 150 },
  { href: '/learn/html-css/colors-units-typography',           title: 'Colors, Units & Typography',                        section: 'HTML & CSS', difficulty: 'Beginner', color: '#f97316', readTime: '40 min', xp: 150 },
  { href: '/learn/html-css/css-selectors-deep-dive',           title: 'CSS Selectors Deep Dive',                           section: 'HTML & CSS', difficulty: 'Beginner', color: '#f97316', readTime: '40 min', xp: 200 },
  { href: '/learn/html-css/display-positioning',               title: 'Display & Positioning',                             section: 'HTML & CSS', difficulty: 'Intermediate', color: '#f97316', readTime: '45 min', xp: 200 },
  { href: '/learn/html-css/backgrounds-borders',                title: 'Backgrounds & Borders',                             section: 'HTML & CSS', difficulty: 'Intermediate', color: '#f97316', readTime: '30 min', xp: 150 },
  { href: '/learn/html-css/flexbox-complete-guide',            title: 'Flexbox — The Complete Guide',                      section: 'HTML & CSS', difficulty: 'Intermediate', color: '#facc15', readTime: '50 min', xp: 250 },
  { href: '/learn/html-css/flexbox-in-practice',               title: 'Flexbox in Practice — Real Layouts',                section: 'HTML & CSS', difficulty: 'Intermediate', color: '#facc15', readTime: '40 min', xp: 200 },
  { href: '/learn/html-css/css-grid-complete-guide',           title: 'CSS Grid — The Complete Guide',                     section: 'HTML & CSS', difficulty: 'Intermediate', color: '#facc15', readTime: '50 min', xp: 250 },
  { href: '/learn/html-css/css-grid-in-practice',              title: 'CSS Grid in Practice — Real Layouts',               section: 'HTML & CSS', difficulty: 'Intermediate', color: '#facc15', readTime: '40 min', xp: 200 },
  { href: '/learn/html-css/flexbox-vs-grid',                   title: 'Flexbox vs Grid — When to Use Each',                section: 'HTML & CSS', difficulty: 'Intermediate', color: '#facc15', readTime: '25 min', xp: 100 },
  { href: '/learn/html-css/responsive-design-media-queries',   title: 'Responsive Design & Media Queries',                 section: 'HTML & CSS', difficulty: 'Intermediate', color: '#facc15', readTime: '40 min', xp: 200 },
  { href: '/learn/html-css/mobile-first-design',               title: 'Mobile-First Design Principles',                    section: 'HTML & CSS', difficulty: 'Intermediate', color: '#facc15', readTime: '30 min', xp: 150 },
  { href: '/learn/html-css/css-custom-properties',             title: 'CSS Custom Properties (Variables)',                 section: 'HTML & CSS', difficulty: 'Intermediate', color: '#4285f4', readTime: '35 min', xp: 150 },
  { href: '/learn/html-css/css-transitions',                    title: 'CSS Transitions',                                   section: 'HTML & CSS', difficulty: 'Intermediate', color: '#4285f4', readTime: '30 min', xp: 150 },
  { href: '/learn/html-css/css-animations-keyframes',          title: 'CSS Animations & Keyframes',                        section: 'HTML & CSS', difficulty: 'Intermediate', color: '#4285f4', readTime: '40 min', xp: 200 },
  { href: '/learn/html-css/css-transforms',                     title: 'CSS Transforms (2D and 3D)',                        section: 'HTML & CSS', difficulty: 'Intermediate', color: '#4285f4', readTime: '35 min', xp: 150 },
  { href: '/learn/html-css/modern-css-selectors',               title: 'Modern Selectors — :has, :is, :where, Container Queries', section: 'HTML & CSS', difficulty: 'Intermediate', color: '#4285f4', readTime: '35 min', xp: 200 },
  { href: '/learn/html-css/css-architecture-naming',            title: 'CSS Architecture & Naming Conventions',             section: 'HTML & CSS', difficulty: 'Intermediate', color: '#4285f4', readTime: '35 min', xp: 150 },
  { href: '/learn/html-css/intro-to-sass',                      title: 'Intro to Sass — Variables, Nesting, Mixins',        section: 'HTML & CSS', difficulty: 'Intermediate', color: '#4285f4', readTime: '35 min', xp: 150 },
  { href: '/learn/html-css/responsive-images-performance',     title: 'Responsive Images & Performance',                   section: 'HTML & CSS', difficulty: 'Advanced', color: '#ff4757', readTime: '35 min', xp: 200 },
  { href: '/learn/html-css/css-accessibility-best-practices',  title: 'CSS Accessibility Best Practices',                  section: 'HTML & CSS', difficulty: 'Advanced', color: '#ff4757', readTime: '35 min', xp: 200 },
  { href: '/learn/html-css/cross-browser-compatibility-debugging', title: 'Cross-Browser Compatibility & Debugging',      section: 'HTML & CSS', difficulty: 'Advanced', color: '#ff4757', readTime: '35 min', xp: 150 },
  { href: '/learn/html-css/building-a-responsive-website',     title: 'Building a Complete Responsive Website',            section: 'HTML & CSS', difficulty: 'Advanced', color: '#ff4757', readTime: '60 min', xp: 300 },
  { href: '/learn/html-css/css-best-practices-common-mistakes', title: 'CSS Best Practices & Common Mistakes',             section: 'HTML & CSS', difficulty: 'Advanced', color: '#ff4757', readTime: '30 min', xp: 150 },
  { href: '/learn/html-css/html-css-interview-prep',            title: 'HTML & CSS Interview Prep — Common Questions and Patterns', section: 'HTML & CSS', difficulty: 'Advanced', color: '#ff4757', readTime: '55 min', xp: 250 },

  // AI & ML
  { href: '/learn/ai-ml/ml-interview-prep', title: 'ML Interview Prep — 50 Complete Answers', section: 'AI & ML', difficulty: 'Advanced',  color: '#4285f4', readTime: '90 min',     xp: 300 },
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
