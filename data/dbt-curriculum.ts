export type DbtModuleStatus = 'live' | 'soon'

export interface DbtLesson {
  id: number
  slug: string
  title: string
  description: string
  tags: string[]
  status: DbtModuleStatus
  readTime: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

export interface DbtSection {
  id: number
  title: string
  color: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  modules: DbtLesson[]
}

export const DBT_CURRICULUM: DbtSection[] = [
  {
    id: 1,
    title: 'dbt Foundations',
    color: '#ff6b4a',
    difficulty: 'Beginner',
    modules: [
      {
        id: 1,
        slug: 'what-is-dbt',
        title: 'What is dbt?',
        description: 'dbt explained from scratch: what a transformation layer is, ELT vs ETL, and why analytics teams standardized on dbt.',
        tags: ['ELT', 'Transformation', 'Analytics engineering'],
        status: 'live',
        readTime: '60 min',
        difficulty: 'Beginner',
      },
      {
        id: 2,
        slug: 'how-dbt-works',
        title: 'How dbt Works: Compile, Run, and the DAG',
        description: 'What actually happens when you run dbt: Jinja compilation, the dependency graph, and the SQL dbt sends to your warehouse.',
        tags: ['DAG', 'Compilation', 'dbt run'],
        status: 'live',
        readTime: '60 min',
        difficulty: 'Beginner',
      },
      {
        id: 3,
        slug: 'project-setup',
        title: 'Setting Up a dbt Project',
        description: 'dbt_project.yml, profiles.yml, connecting to a warehouse, dbt Core vs dbt Cloud, and your first dbt run.',
        tags: ['dbt_project.yml', 'profiles.yml', 'Setup'],
        status: 'live',
        readTime: '60 min',
        difficulty: 'Beginner',
      },
      {
        id: 4,
        slug: 'models-basics',
        title: 'Models: SELECT Statements as the Building Block',
        description: 'What a dbt model actually is, how a .sql file becomes a table or view, and naming/organization conventions.',
        tags: ['Models', 'SELECT', 'Conventions'],
        status: 'live',
        readTime: '60 min',
        difficulty: 'Beginner',
      },
      {
        id: 5,
        slug: 'sources-and-ref',
        title: 'Sources, ref(), and the Dependency Graph',
        description: 'Declaring raw sources, source freshness, and how ref()/source() build the DAG that makes dbt run models in the right order.',
        tags: ['source()', 'ref()', 'DAG'],
        status: 'live',
        readTime: '60 min',
        difficulty: 'Beginner',
      },
    ],
  },
  {
    id: 2,
    title: 'Core dbt Development',
    color: '#f97316',
    difficulty: 'Intermediate',
    modules: [
      {
        id: 6,
        slug: 'materializations',
        title: 'Materializations: View, Table, Incremental, Ephemeral',
        description: 'What SQL each materialization compiles to, and how to choose the right one for a model.',
        tags: ['Materializations', 'View', 'Table', 'Ephemeral'],
        status: 'live',
        readTime: '65 min',
        difficulty: 'Intermediate',
      },
      {
        id: 7,
        slug: 'incremental-models',
        title: 'Incremental Models in Depth',
        description: 'is_incremental(), unique_key, incremental strategies (merge/delete+insert/append), and full-refresh recovery.',
        tags: ['Incremental', 'is_incremental()', 'unique_key'],
        status: 'live',
        readTime: '70 min',
        difficulty: 'Intermediate',
      },
      {
        id: 8,
        slug: 'testing-basics',
        title: 'Testing: Generic and Singular Tests',
        description: 'unique, not_null, accepted_values, relationships, custom generic tests, and singular SQL tests.',
        tags: ['Tests', 'unique', 'not_null', 'relationships'],
        status: 'live',
        readTime: '65 min',
        difficulty: 'Intermediate',
      },
      {
        id: 9,
        slug: 'documentation',
        title: 'Documentation: Descriptions, Doc Blocks, and dbt Docs',
        description: 'schema.yml descriptions, doc blocks, the dbt docs site, and documentation as a team habit, not an afterthought.',
        tags: ['Documentation', 'dbt docs', 'schema.yml'],
        status: 'live',
        readTime: '55 min',
        difficulty: 'Intermediate',
      },
      {
        id: 10,
        slug: 'jinja-and-macros',
        title: 'Jinja and Macros: Templating SQL',
        description: 'Jinja control flow inside SQL, writing reusable macros, and the line between "helpful templating" and "unreadable SQL".',
        tags: ['Jinja', 'Macros', 'Templating'],
        status: 'live',
        readTime: '70 min',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 3,
    title: 'Intermediate dbt',
    color: '#eab308',
    difficulty: 'Intermediate',
    modules: [
      {
        id: 11,
        slug: 'packages',
        title: 'Packages and dbt_utils',
        description: 'Installing community packages, packages.yml, dbt_utils highlights, and when to write your own vs reuse one.',
        tags: ['Packages', 'dbt_utils', 'packages.yml'],
        status: 'live',
        readTime: '55 min',
        difficulty: 'Intermediate',
      },
      {
        id: 12,
        slug: 'seeds',
        title: 'Seeds: Loading Static Reference Data',
        description: 'What seeds are for, CSV-to-table loading, seed configs, and where seeds stop being the right tool.',
        tags: ['Seeds', 'CSV', 'Reference data'],
        status: 'live',
        readTime: '50 min',
        difficulty: 'Intermediate',
      },
      {
        id: 13,
        slug: 'snapshots',
        title: 'Snapshots: Type 2 Slowly Changing Dimensions',
        description: 'How dbt snapshots track history, timestamp vs check strategy, and the SCD Type 2 columns dbt manages for you.',
        tags: ['Snapshots', 'SCD Type 2', 'History'],
        status: 'live',
        readTime: '65 min',
        difficulty: 'Intermediate',
      },
      {
        id: 14,
        slug: 'variables-and-environments',
        title: 'Variables and Environments',
        description: 'vars, env_var(), target contexts, and running the same project safely across dev, staging, and prod.',
        tags: ['Variables', 'Environments', 'target'],
        status: 'live',
        readTime: '55 min',
        difficulty: 'Intermediate',
      },
      {
        id: 15,
        slug: 'hooks-and-operations',
        title: 'Hooks and Operations',
        description: 'pre-hook, post-hook, on-run-start/end, and run-operation for grants, audit logging, and one-off maintenance.',
        tags: ['Hooks', 'run-operation', 'Grants'],
        status: 'live',
        readTime: '55 min',
        difficulty: 'Intermediate',
      },
    ],
  },
  {
    id: 4,
    title: 'Production and Advanced dbt',
    color: '#ef4444',
    difficulty: 'Advanced',
    modules: [
      {
        id: 16,
        slug: 'project-structure',
        title: 'Project Structure and Layering',
        description: 'Staging, intermediate, and marts layers; folder conventions; and how a project stays sane past 200 models.',
        tags: ['Staging', 'Intermediate', 'Marts', 'Structure'],
        status: 'live',
        readTime: '65 min',
        difficulty: 'Advanced',
      },
      {
        id: 17,
        slug: 'performance-tuning-dbt',
        title: 'Performance and Query Optimization in dbt',
        description: 'Finding slow models, materialization trade-offs at scale, incremental strategy tuning, and warehouse-specific configs.',
        tags: ['Performance', 'Query optimization', 'Incremental strategy'],
        status: 'live',
        readTime: '70 min',
        difficulty: 'Advanced',
      },
      {
        id: 18,
        slug: 'cicd-for-dbt',
        title: 'CI/CD for dbt Projects',
        description: 'Slim CI, dbt build in a pipeline, state comparison (--defer, --state), and safe deploys to production.',
        tags: ['CI/CD', 'Slim CI', '--defer'],
        status: 'live',
        readTime: '70 min',
        difficulty: 'Advanced',
      },
      {
        id: 19,
        slug: 'testing-strategy-at-scale',
        title: 'Testing Strategy and Data Quality at Scale',
        description: 'Where to test, test severity, freshness SLAs, and building a data-quality culture instead of a pile of assertions.',
        tags: ['Data quality', 'Test strategy', 'Severity'],
        status: 'live',
        readTime: '65 min',
        difficulty: 'Advanced',
      },
      {
        id: 20,
        slug: 'dbt-interview-system-design',
        title: 'dbt Interview and System Design Guide',
        description: 'Worked system-design questions, a vocabulary cheat sheet, common interview traps, and rapid-fire prep — the capstone module.',
        tags: ['Interview prep', 'System design', 'Capstone'],
        status: 'live',
        readTime: '90 min',
        difficulty: 'Advanced',
      },
    ],
  },
]

export const DBT_MODULES: (DbtLesson & { sectionId: number; sectionTitle: string; color: string })[] =
  DBT_CURRICULUM.flatMap(section =>
    section.modules.map(module => ({ ...module, sectionId: section.id, sectionTitle: section.title, color: section.color }))
  )

export const DBT_MODULE_BY_SLUG: Record<string, DbtLesson & { sectionId: number; sectionTitle: string; color: string }> =
  Object.fromEntries(DBT_MODULES.map(module => [module.slug, module]))
