export type SnowflakeStatus = 'live' | 'soon'

export interface SnowflakeModule {
  id: number
  slug: string
  title: string
  description: string
  tags: string[]
  status: SnowflakeStatus
  readTime: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

export interface SnowflakeSection {
  id: number
  title: string
  color: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  modules: SnowflakeModule[]
}

export const SNOWFLAKE_CURRICULUM: SnowflakeSection[] = [
  {
    id: 1, title: 'Snowflake Foundations', color: '#29b5e8', difficulty: 'Beginner',
    modules: [
      { id: 1, slug: 'what-is-snowflake', title: 'What is Snowflake?', description: 'Snowflake explained from scratch: warehouse vs database, OLAP vs OLTP, and why companies use it.', tags: ['Warehouse', 'OLAP', 'Storage', 'Compute', 'Analytics'], status: 'live', readTime: '55 min', difficulty: 'Beginner' },
      { id: 2, slug: 'architecture', title: 'Snowflake Architecture', description: 'Storage, virtual warehouses, cloud services, micro-partitions, metadata, caching, and scaling.', tags: ['Storage', 'Virtual warehouses', 'Cloud services', 'Micro-partitions', 'Cache'], status: 'live', readTime: '65 min', difficulty: 'Beginner' },
      { id: 3, slug: 'setup-and-sql-basics', title: 'Setup and SQL Basics', description: 'Create warehouses, databases, schemas, tables, roles, and run the SQL every beginner needs.', tags: ['Warehouse', 'Database', 'Schema', 'Table', 'Role', 'SQL'], status: 'live', readTime: '70 min', difficulty: 'Beginner' },
      { id: 4, slug: 'roles-security-basics', title: 'Roles and Security Basics', description: 'RBAC, grants, ownership, least privilege, users, roles, future grants, and common access mistakes.', tags: ['RBAC', 'Grants', 'Ownership', 'Users', 'Future grants'], status: 'soon', readTime: '60 min', difficulty: 'Beginner' },
    ],
  },
  {
    id: 2, title: 'Loading and Transforming Data', color: '#22c55e', difficulty: 'Intermediate',
    modules: [
      { id: 5, slug: 'loading-data', title: 'Loading Data with Stages and COPY INTO', description: 'Internal stages, external stages, file formats, COPY INTO, validation, rejected rows, and load history.', tags: ['Stages', 'File formats', 'COPY INTO', 'Load history', 'Validation'], status: 'live', readTime: '75 min', difficulty: 'Intermediate' },
      { id: 6, slug: 'semi-structured-data', title: 'Semi-Structured Data: VARIANT, JSON, FLATTEN', description: 'Load and query JSON, arrays, nested fields, VARIANT, OBJECT, ARRAY, and LATERAL FLATTEN.', tags: ['VARIANT', 'JSON', 'FLATTEN', 'OBJECT', 'ARRAY'], status: 'soon', readTime: '70 min', difficulty: 'Intermediate' },
      { id: 7, slug: 'elt-medallion', title: 'ELT and Medallion Architecture in Snowflake', description: 'Raw, Silver, Gold, dimensional marts, dbt models, tests, and production-grade transformation patterns.', tags: ['ELT', 'Raw', 'Silver', 'Gold', 'dbt', 'Marts'], status: 'soon', readTime: '80 min', difficulty: 'Intermediate' },
      { id: 8, slug: 'merge-idempotency', title: 'MERGE, Upserts, and Idempotent Pipelines', description: 'MERGE syntax, staging tables, deduplication, reruns, watermarks, and exactly-once-style pipeline design.', tags: ['MERGE', 'Upsert', 'Idempotency', 'Watermark', 'Deduplication'], status: 'soon', readTime: '75 min', difficulty: 'Intermediate' },
    ],
  },
  {
    id: 3, title: 'Snowflake Platform Features', color: '#8b5cf6', difficulty: 'Intermediate',
    modules: [
      { id: 9, slug: 'time-travel-cloning', title: 'Time Travel, Fail-safe, and Zero-Copy Cloning', description: 'Recover data, debug mistakes, clone environments, and understand retention and storage implications.', tags: ['Time Travel', 'Fail-safe', 'Clone', 'Recovery', 'Retention'], status: 'soon', readTime: '65 min', difficulty: 'Intermediate' },
      { id: 10, slug: 'snowpipe', title: 'Snowpipe and Continuous Loading', description: 'Snowpipe architecture, auto-ingest, cloud notifications, latency, errors, and when not to use it.', tags: ['Snowpipe', 'Auto-ingest', 'Notifications', 'Latency', 'Errors'], status: 'soon', readTime: '70 min', difficulty: 'Intermediate' },
      { id: 11, slug: 'streams-and-tasks', title: 'Streams and Tasks', description: 'Change tracking, scheduled SQL, task graphs, incremental ELT, serverless tasks, and production pitfalls.', tags: ['Streams', 'Tasks', 'CDC', 'Task graph', 'Incremental'], status: 'soon', readTime: '80 min', difficulty: 'Advanced' },
      { id: 12, slug: 'dynamic-tables', title: 'Dynamic Tables', description: 'Declarative incremental pipelines, target lag, refresh modes, comparison with streams/tasks and materialized views.', tags: ['Dynamic tables', 'Target lag', 'Refresh', 'Incremental'], status: 'soon', readTime: '65 min', difficulty: 'Advanced' },
    ],
  },
  {
    id: 4, title: 'Performance, Cost, and Governance', color: '#f59e0b', difficulty: 'Advanced',
    modules: [
      { id: 13, slug: 'performance-tuning', title: 'Performance Tuning', description: 'Micro-partition pruning, clustering, search optimization, query profile, caching, and warehouse sizing.', tags: ['Pruning', 'Clustering', 'Query profile', 'Cache', 'Warehouse sizing'], status: 'soon', readTime: '85 min', difficulty: 'Advanced' },
      { id: 14, slug: 'cost-optimization', title: 'Cost Optimization', description: 'Credits, warehouses, auto-suspend, query waste, resource monitors, chargeback, budgets, and query history.', tags: ['Credits', 'Auto-suspend', 'Resource monitors', 'Chargeback', 'Query history'], status: 'soon', readTime: '75 min', difficulty: 'Advanced' },
      { id: 15, slug: 'advanced-security-governance', title: 'Advanced Security and Governance', description: 'Masking policies, row access policies, object tagging, classification, access history, and auditing.', tags: ['Masking', 'Row access', 'Tags', 'Classification', 'Audit'], status: 'soon', readTime: '80 min', difficulty: 'Advanced' },
      { id: 16, slug: 'data-sharing-marketplace', title: 'Data Sharing and Marketplace', description: 'Secure data sharing, reader accounts, listings, clean rooms, and cross-organization governance.', tags: ['Data sharing', 'Marketplace', 'Reader accounts', 'Clean rooms'], status: 'soon', readTime: '60 min', difficulty: 'Advanced' },
    ],
  },
  {
    id: 5, title: 'Production and Career Readiness', color: '#ef4444', difficulty: 'Advanced',
    modules: [
      { id: 17, slug: 'snowflake-with-dbt', title: 'Snowflake with dbt', description: 'dbt project structure, sources, models, tests, snapshots, incremental models, environments, and CI/CD.', tags: ['dbt', 'Models', 'Tests', 'Snapshots', 'CI/CD'], status: 'soon', readTime: '85 min', difficulty: 'Advanced' },
      { id: 18, slug: 'production-operations', title: 'Production Operations and Monitoring', description: 'Account usage views, load/query/task history, alerts, incident response, runbooks, and SLAs.', tags: ['Monitoring', 'Account usage', 'Alerts', 'Runbooks', 'SLA'], status: 'soon', readTime: '75 min', difficulty: 'Advanced' },
      { id: 19, slug: 'snowflake-project', title: 'End-to-End Snowflake Project', description: 'Build a full orders analytics platform: ingest, clean, merge, test, model, secure, optimize, and monitor.', tags: ['Project', 'Orders', 'Pipeline', 'Marts', 'Monitoring'], status: 'soon', readTime: '120 min', difficulty: 'Advanced' },
      { id: 20, slug: 'interview-system-design', title: 'Snowflake Interview and System Design', description: 'Interview answers, architecture tradeoffs, cost scenarios, incident debugging, and senior-level design prompts.', tags: ['Interview', 'System design', 'Tradeoffs', 'Incidents'], status: 'soon', readTime: '90 min', difficulty: 'Advanced' },
    ],
  },
]

export const SNOWFLAKE_MODULES = SNOWFLAKE_CURRICULUM.flatMap(section =>
  section.modules.map(module => ({ ...module, sectionId: section.id, sectionTitle: section.title, color: section.color }))
)

export const SNOWFLAKE_MODULE_BY_SLUG = Object.fromEntries(
  SNOWFLAKE_MODULES.map(module => [module.slug, module])
)
