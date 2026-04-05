import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const moduleMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'what-is-data':                 () => import('@/content/data-engineering/what-is-data'),
  'what-is-data-engineering':     () => import('@/content/data-engineering/what-is-data-engineering'),
  'how-data-moves':               () => import('@/content/data-engineering/how-data-moves'),
  'de-ecosystem':                 () => import('@/content/data-engineering/de-ecosystem'),
  'de-vs-other-roles':            () => import('@/content/data-engineering/de-vs-other-roles'),
  'de-india-job-market':          () => import('@/content/data-engineering/de-india-job-market'),
  'data-types-structured':        () => import('@/content/data-engineering/data-types-structured'),
  'data-formats':                 () => import('@/content/data-engineering/data-formats'),
  'databases-internals':          () => import('@/content/data-engineering/databases-internals'),
  'sql-vs-nosql':                 () => import('@/content/data-engineering/sql-vs-nosql'),
  'warehouse-lake-lakehouse':     () => import('@/content/data-engineering/warehouse-lake-lakehouse'),
  'schemas-tables-keys':          () => import('@/content/data-engineering/schemas-tables-keys'),
  'acid-transactions':            () => import('@/content/data-engineering/acid-transactions'),
  'python-for-de':                () => import('@/content/data-engineering/python-for-de'),
  'sql-for-de':                   () => import('@/content/data-engineering/sql-for-de'),
  'linux-shell':                  () => import('@/content/data-engineering/linux-shell'),
  'git-for-data':                 () => import('@/content/data-engineering/git-for-data'),
  'working-with-apis':            () => import('@/content/data-engineering/working-with-apis'),
  'files-at-scale':               () => import('@/content/data-engineering/files-at-scale'),
  'what-is-a-pipeline':           () => import('@/content/data-engineering/what-is-a-pipeline'),
  'batch-vs-streaming':           () => import('@/content/data-engineering/batch-vs-streaming'),
  'etl-vs-elt':                   () => import('@/content/data-engineering/etl-vs-elt'),
  'ingestion-patterns':           () => import('@/content/data-engineering/ingestion-patterns'),
  'change-data-capture':          () => import('@/content/data-engineering/change-data-capture'),
  'batch-pipeline-from-scratch':  () => import('@/content/data-engineering/batch-pipeline-from-scratch'),
  'idempotency-atomicity':        () => import('@/content/data-engineering/idempotency-atomicity'),
  'error-handling-retries':       () => import('@/content/data-engineering/error-handling-retries'),
  'pipeline-orchestration':       () => import('@/content/data-engineering/pipeline-orchestration'),
  'data-lake-architecture':       () => import('@/content/data-engineering/data-lake-architecture'),
  'medallion-architecture':       () => import('@/content/data-engineering/medallion-architecture'),
  'warehouse-concepts':           () => import('@/content/data-engineering/warehouse-concepts'),
  'lakehouse-architecture':       () => import('@/content/data-engineering/lakehouse-architecture'),
  'data-modelling':               () => import('@/content/data-engineering/data-modelling'),
  'slowly-changing-dimensions':   () => import('@/content/data-engineering/slowly-changing-dimensions'),
  'data-vault':                   () => import('@/content/data-engineering/data-vault'),
  'data-quality':                 () => import('@/content/data-engineering/data-quality'),
  'monitoring-observability':     () => import('@/content/data-engineering/monitoring-observability'),
  'data-governance':              () => import('@/content/data-engineering/data-governance'),
  'security-compliance':          () => import('@/content/data-engineering/security-compliance'),
  'streaming-data':               () => import('@/content/data-engineering/streaming-data'),
  'message-brokers-queues':       () => import('@/content/data-engineering/message-brokers-queues'),
  'distributed-systems':          () => import('@/content/data-engineering/distributed-systems'),
  'performance-tuning':           () => import('@/content/data-engineering/performance-tuning'),
  'cicd-pipelines':               () => import('@/content/data-engineering/cicd-pipelines'),
  'infrastructure-as-code':       () => import('@/content/data-engineering/infrastructure-as-code'),
  'system-design-de':             () => import('@/content/data-engineering/system-design-de'),
  'de-interview-questions':       () => import('@/content/data-engineering/de-interview-questions'),
};

const moduleMeta: Record<string, { title: string; description: string }> = {
  'what-is-data':                 { title: 'What is Data? How Computers Store Information',        description: 'Bits, bytes, files, and memory — before you engineer data, understand what it is.'             },
  'what-is-data-engineering':     { title: 'What is Data Engineering?',                           description: 'The role, the lifecycle, what DEs actually do, and how to break in.'                           },
  'how-data-moves':               { title: 'How Data Moves Through a Company',                    description: 'From source systems to dashboards — the complete end-to-end story.'                            },
  'de-ecosystem':                 { title: 'The Data Engineering Ecosystem',                       description: 'Every tool mapped — ingestion, storage, processing, orchestration, serving.'                   },
  'de-vs-other-roles':            { title: 'Data Engineer vs Analyst vs Scientist vs ML Engineer', description: 'Clear, permanent boundaries between the four most confused roles in tech.'                    },
  'de-india-job-market':          { title: 'Data Engineering in the Indian Job Market (2026)',     description: 'Real salary data, top hiring companies, skills in JDs, breaking in from non-IT.'              },
  'data-types-structured':        { title: 'Structured, Semi-Structured and Unstructured Data',   description: 'The three categories every data engineer works with daily.'                                    },
  'data-formats':                 { title: 'Data Formats — CSV, JSON, Parquet, Avro, ORC',        description: 'When to use each format, what it costs, and what breaks when you choose wrong.'               },
  'databases-internals':          { title: 'Databases — How They Work Internally',                description: 'Storage engines, B-trees, indexes, buffer pools, WAL — the inside story.'                     },
  'sql-vs-nosql':                 { title: 'SQL vs NoSQL — The Real Difference',                  description: 'What each one trades off and how to pick the right store for any situation.'                   },
  'warehouse-lake-lakehouse':     { title: 'Data Warehouse vs Data Lake vs Lakehouse',            description: 'Three answers to where do we keep all this data — the honest trade-offs.'                     },
  'schemas-tables-keys':          { title: 'Schemas, Tables, Keys and Indexes',                   description: 'The building blocks of every database — understood deeply.'                                    },
  'acid-transactions':            { title: 'ACID Properties and Transactions',                    description: 'Why ACID exists and what happens when a transaction fails halfway through.'                     },
  'python-for-de':                { title: 'Python for Data Engineering',                         description: 'File I/O at scale, REST APIs, error handling, generators, testable code.'                      },
  'sql-for-de':                   { title: 'SQL for Data Engineers — Beyond the Basics',          description: 'Window functions, complex CTEs, deduplication, and advanced interview patterns.'               },
  'linux-shell':                  { title: 'Linux and Shell Scripting for Data Engineers',        description: 'Navigate, process files, write bash scripts, schedule cron jobs.'                              },
  'git-for-data':                 { title: 'Git and Version Control for Data Projects',           description: 'Branching strategies, managing large files, pre-commit hooks, semantic versioning.'            },
  'working-with-apis':            { title: 'Working with APIs — REST, Auth, Pagination',          description: 'Build robust ingestion with retries, pagination, OAuth, and checkpointing.'                    },
  'files-at-scale':               { title: 'Working with Files at Scale',                         description: 'Partitioning, compression, the small file problem, columnar storage internals.'                },
  'what-is-a-pipeline':           { title: 'What is a Data Pipeline?',                            description: 'Every component, how they connect, and the principles that make a pipeline good.'              },
  'batch-vs-streaming':           { title: 'Batch vs Streaming vs Micro-Batch',                   description: 'Three processing models — know each deeply enough to pick the right one.'                      },
  'etl-vs-elt':                   { title: 'ETL vs ELT — History, Difference, When to Use',      description: 'Why ETL dominated for 30 years, why ELT replaced it, when the old way still wins.'            },
  'ingestion-patterns':           { title: 'Data Ingestion Patterns — Full Load, Incremental, CDC', description: 'The three ways to pull from a source — learn all three and when each breaks.'               },
  'change-data-capture':          { title: 'Change Data Capture — How It Works Under the Hood',   description: 'Log-based, trigger-based, query-based CDC — internals and production gotchas.'                },
  'batch-pipeline-from-scratch':  { title: 'Building a Batch Pipeline From Scratch',              description: 'A complete Python pipeline: extract → validate → transform → load → checkpoint.'              },
  'idempotency-atomicity':        { title: 'Idempotency, Atomicity and Pipeline Restartability',  description: 'The two properties that separate toy pipelines from production ones.'                          },
  'error-handling-retries':       { title: 'Error Handling, Retries and Dead Letter Queues',      description: 'How to build pipelines that survive the real world without waking anyone up at 3am.'          },
  'pipeline-orchestration':       { title: 'Pipeline Orchestration — What a Scheduler Does',      description: 'DAGs, dependencies, triggers, backfill — the concepts without the tool tutorial.'              },
  'data-lake-architecture':       { title: 'Data Lake Architecture — Design, Zones, Anti-Patterns', description: 'How to design a data lake that stays useful for years.'                                     },
  'medallion-architecture':       { title: 'Medallion Architecture — Bronze, Silver, Gold',       description: 'The most popular data lake design pattern — what each layer does and why.'                     },
  'warehouse-concepts':           { title: 'Data Warehouse Concepts — Columnar Storage',          description: 'How a warehouse stores and queries data at scale — the internals.'                             },
  'lakehouse-architecture':       { title: 'Lakehouse Architecture — Why It Exists',              description: 'The best of warehouse and lake in one architecture.'                                           },
  'data-modelling':               { title: 'Data Modelling — Dimensional, Star, Snowflake Schema', description: 'How to organise data so analysts can query it fast and intuitively.'                         },
  'slowly-changing-dimensions':   { title: 'Slowly Changing Dimensions — SCD Types 1, 2 and 3',  description: 'One of the most tested DE interview topics — what happens when a dimension changes.'          },
  'data-vault':                   { title: 'Data Vault 2.0 — Hubs, Links and Satellites',         description: 'The advanced modelling pattern used by large enterprises.'                                     },
  'data-quality':                 { title: 'Data Quality — Dimensions, Testing and Validation',   description: 'The six quality dimensions, how to test for each, what breaks when you skip this.'            },
  'monitoring-observability':     { title: 'Data Observability — Metrics, Logging, Anomaly Detection', description: 'How to know something is wrong before your users do.'                                   },
  'data-governance':              { title: 'Data Governance — Catalogues, Lineage, Access Control', description: 'Who owns the data, who can access it, where did it come from.'                              },
  'security-compliance':          { title: 'Security and Compliance for Data Engineers',          description: 'GDPR, India DPDP Act, and how to build compliant systems by design.'                          },
  'streaming-data':               { title: 'Streaming Data — What It Is and How It Works',        description: 'Events, producers, consumers, offsets, consumer groups — the concepts.'                       },
  'message-brokers-queues':       { title: 'Message Brokers and Queues — Internal Mechanics',     description: 'Durability, ordering, replayability — the inside story.'                                      },
  'distributed-systems':          { title: 'Distributed Systems for Data Engineers',              description: 'CAP theorem, partitioning, replication, fault tolerance.'                                      },
  'performance-tuning':           { title: 'Performance Tuning and Cost Optimisation',            description: 'How to profile any pipeline, find the bottleneck, and fix it.'                                },
  'cicd-pipelines':               { title: 'DataOps and CI/CD for Data Pipelines',                description: 'Testing, staging, rollback, and automated deployments.'                                       },
  'infrastructure-as-code':       { title: 'Infrastructure as Code for Data Engineers',           description: 'Provision cloud data infrastructure with Terraform.'                                           },
  'system-design-de':             { title: 'Data Engineering System Design',                      description: 'Design any data system from scratch — framework, trade-offs, capacity estimation.'            },
  'de-interview-questions':       { title: 'Interview Prep — 60 Complete Answers',                description: '60 complete answers across Python, SQL, pipelines, modelling, architecture, behavioural.'     },
};

export function generateStaticParams() {
  return Object.keys(moduleMap).map(topic => ({ topic }));
}

export async function generateMetadata({
  params,
}: {
  params: { topic: string };
}): Promise<Metadata> {
  const meta = moduleMeta[params.topic];
  if (!meta) return { title: 'Data Engineering | Chaduvuko' };
  return {
    title: `${meta.title} | Data Engineering | Chaduvuko`,
    description: meta.description,
  };
}

export default async function DEModulePage({
  params,
}: {
  params: { topic: string };
}) {
  const loader = moduleMap[params.topic];
  if (!loader) notFound();
  const { default: Content } = await loader();
  return <Content />;
}
