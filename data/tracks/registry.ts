// Registry-driven tracks: each entry is a live catalog track whose lessons live in
// content/<slug>/<lesson-slug>.tsx and are served by app/learn/<slug>/[topic].
// Adding a lesson = add it here + add its content file. Several of these tracks
// replaced skills plans in data/planned-tracks.ts, which skips these slugs.
import type { TrackArea } from '@/lib/catalog/types'

export interface RegistryLesson {
  /** Order inside the track; also the lesson number shown to learners. */
  id: number
  slug: string
  title: string
  description: string
  tags: string[]
  status: 'live' | 'soon'
  readTime: string
}

export interface RegistrySection {
  id: number
  title: string
  blurb: string
  modules: RegistryLesson[]
}

export interface RegistryTrack {
  slug: string
  title: string
  area: TrackArea
  /** Card category on /learn. */
  cat: 'data' | 'ai' | 'prog' | 'web' | 'cs' | 'itops'
  icon: string
  color: string
  description: string
  roles: string
  /** Prerequisites shown on the track page. */
  prerequisites: { label: string; href: string }[]
  sections: RegistrySection[]
}

const L = (id: number, slug: string, title: string, description: string, tags: string[], readTime: string): RegistryLesson =>
  ({ id, slug, title, description, tags, readTime, status: 'live' })

export const REGISTRY_TRACKS: RegistryTrack[] = [
  {
    slug: 'generative-ai',
    title: 'Generative AI & LLM Engineering',
    area: 'ai',
    cat: 'ai',
    icon: '✨',
    color: '#c084fc',
    description: 'Build production LLM features: call model APIs, get structured outputs, use tools, search with embeddings and vector databases, then evaluate, secure, trace, and ship them.',
    roles: 'Generative AI Engineer · LLM Application Engineer · AI Engineer',
    prerequisites: [
      { label: 'Python through Advanced Python', href: '/learn/python' },
      { label: 'Prompt Engineering and RAG (AI & ML)', href: '/learn/ai-ml/nlp/prompt-engineering' },
    ],
    sections: [
      {
        id: 1, title: 'Building with LLM APIs', blurb: 'Talk to models from code and get reliable, machine-readable answers back.',
        modules: [
          L(1, 'calling-llm-apis', 'Calling LLM APIs — SDKs, Messages and Streaming', 'Make your first model call from Python, structure system and user messages, stream tokens to the user, and handle errors and retries.', ['OpenAI / Anthropic / Gemini SDKs', 'Messages', 'Streaming', 'Retries'], '35 min'),
          L(2, 'tokens-pricing-rate-limits', 'Tokens, Pricing and Rate Limits', 'Count tokens, estimate the cost of a feature in rupees and dollars, and design around rate limits and timeouts.', ['Tokenisers', 'Cost estimation', 'Rate limits', 'Backoff'], '25 min'),
          L(3, 'structured-outputs-pydantic', 'Structured Outputs with JSON Schema and Pydantic', 'Make models return validated JSON using JSON Schema, provider structured-output modes, and Pydantic models, and recover when validation fails.', ['JSON Schema', 'Pydantic', 'Validation', 'Repair loops'], '30 min'),
          L(4, 'function-tool-calling', 'Function and Tool Calling', 'Describe tools to a model, execute the calls it requests, return results, and keep the loop safe and bounded.', ['Tool schemas', 'Tool loop', 'Parallel calls', 'Safety limits'], '35 min'),
        ],
      },
      {
        id: 2, title: 'Retrieval & Vector Databases', blurb: 'Turn documents into searchable vectors and retrieve the right context.',
        modules: [
          L(5, 'embeddings-in-practice', 'Embeddings in Practice — Chunking and Similarity Search', 'Generate embeddings, choose a chunking strategy, and run cosine-similarity search over your own documents.', ['Embedding models', 'Chunking', 'Cosine similarity', 'Metadata'], '30 min'),
          L(6, 'vector-databases', 'Vector Databases — pgvector, Chroma, Pinecone and FAISS', 'Store and query embeddings at scale: indexes (HNSW, IVF), metadata filters, hybrid search, and how to choose a vector store.', ['pgvector', 'Chroma', 'Pinecone', 'FAISS', 'HNSW', 'Hybrid search'], '35 min'),
        ],
      },
      {
        id: 3, title: 'Quality, Safety & Operations', blurb: 'Prove your LLM feature works, keep it safe, and keep it affordable.',
        modules: [
          L(7, 'llm-evaluation', 'Evaluating LLM Apps — Eval Sets, LLM-as-Judge and RAG Metrics', 'Build an evaluation set, score outputs with code checks and LLM judges, measure RAG faithfulness and relevance, and gate releases on results.', ['Eval sets', 'LLM-as-judge', 'RAG metrics', 'Regression testing'], '35 min'),
          L(8, 'guardrails-prompt-injection', 'Guardrails, Prompt Injection and PII Handling', 'Defend LLM features against direct and indirect prompt injection, filter unsafe input and output, and keep personal data out of prompts and logs.', ['Prompt injection', 'Input/output filters', 'PII redaction', 'Least privilege'], '35 min'),
          L(9, 'llm-observability-tracing', 'Observability and Tracing for LLM Apps', 'Trace every model call, retrieval, and tool call with OpenTelemetry-style spans; track cost, latency, and quality in production.', ['Tracing', 'OpenTelemetry', 'Langfuse / LangSmith', 'Dashboards'], '30 min'),
          L(10, 'llm-cost-latency', 'Cost and Latency Optimisation — Caching, Batching and Routing', 'Cut cost and response time with prompt caching, response caching, batching, smaller-model routing, and output limits.', ['Prompt caching', 'Semantic cache', 'Batch APIs', 'Model routing'], '30 min'),
        ],
      },
      {
        id: 4, title: 'Shipping LLM Features', blurb: 'Choose your tooling and put an AI feature in front of users.',
        modules: [
          L(11, 'llm-frameworks', 'LLM Frameworks — LangChain and LlamaIndex: When to Use Them', 'What LangChain and LlamaIndex give you, what they cost in complexity, and how to decide between a framework and plain SDK code.', ['LangChain', 'LlamaIndex', 'Trade-offs', 'Plain SDK'], '25 min'),
          L(12, 'shipping-ai-feature-fastapi', 'Shipping an AI Feature — FastAPI Backend and Chat UI', 'Wrap a RAG assistant in a FastAPI service with streaming responses, a minimal chat UI, configuration, and deployment checks.', ['FastAPI', 'Server-sent events', 'Chat UI', 'Deployment'], '40 min'),
        ],
      },
    ],
  },
  {
    slug: 'agentic-ai',
    title: 'Agentic AI & Automation',
    area: 'ai',
    cat: 'ai',
    icon: '🧭',
    color: '#8b5cf6',
    description: 'Design agents that plan, call tools, keep state, and work with humans in the loop, then test, trace, and secure them for production.',
    roles: 'Agentic AI Engineer · AI Automation Engineer',
    prerequisites: [
      { label: 'Generative AI & LLM Engineering', href: '/learn/generative-ai' },
      { label: 'Function and tool calling', href: '/learn/generative-ai/function-tool-calling' },
    ],
    sections: [
      {
        id: 1, title: 'Agent Foundations', blurb: 'What makes a system an agent, and how it remembers.',
        modules: [
          L(1, 'what-is-an-ai-agent', 'What Is an AI Agent? The Plan–Act–Observe Loop', 'Workflows versus agents, the reasoning-and-acting loop, when an agent is the wrong tool, and building a minimal agent from scratch.', ['Agent loop', 'ReAct', 'Workflows vs agents', 'Stop conditions'], '30 min'),
          L(2, 'agent-state-memory', 'Agent State and Memory', 'Model agent state explicitly, manage short-term context, add long-term memory with retrieval, and avoid memory that leaks or drifts.', ['State', 'Short-term memory', 'Long-term memory', 'Summarisation'], '30 min'),
          L(3, 'planning-and-reflection', 'Planning, Reflection and Error Recovery', 'Plan-and-execute, self-critique, retries, and fallbacks: patterns that make multi-step agents finish tasks reliably.', ['Plan-and-execute', 'Reflection', 'Retries', 'Fallbacks'], '30 min'),
        ],
      },
      {
        id: 2, title: 'Orchestration', blurb: 'Build agent workflows as graphs, connect tools with MCP, and coordinate several agents.',
        modules: [
          L(4, 'langgraph-workflows', 'Building Agent Workflows with LangGraph', 'Model an agent as a graph of nodes and edges with typed state, conditional routing, checkpoints, and resumable runs.', ['LangGraph', 'State graphs', 'Conditional edges', 'Checkpointing'], '40 min'),
          L(5, 'human-in-the-loop', 'Human-in-the-Loop Approvals and Interrupts', 'Pause an agent before risky actions, collect approval or edits from a person, and resume safely with an audit trail.', ['Interrupts', 'Approvals', 'Audit trail', 'Escalation'], '30 min'),
          L(6, 'model-context-protocol', 'Model Context Protocol (MCP) — Connecting Agents to Tools and Data', 'How MCP clients and servers work, building a small MCP server in Python, and the security model for exposing tools.', ['MCP', 'Servers and clients', 'Tools and resources', 'Security'], '35 min'),
          L(7, 'multi-agent-systems', 'Multi-Agent Systems — Supervisors and Handoffs', 'Supervisor, router, and handoff patterns; when several agents beat one; and how to keep their cost and behaviour under control.', ['Supervisor', 'Handoffs', 'Specialist agents', 'Coordination'], '35 min'),
        ],
      },
      {
        id: 3, title: 'Production Agents', blurb: 'Prove agents work, see what they do, and limit what they can break.',
        modules: [
          L(8, 'agent-evaluation-observability', 'Testing, Evaluating and Tracing Agents', 'Trajectory and outcome evaluation, scenario test suites, tracing every step, and the production metrics that matter for agents.', ['Trajectory evals', 'Scenario tests', 'Tracing', 'Success rate'], '35 min'),
          L(9, 'securing-agents', 'Securing Agents — Tool Permissions and Abuse Cases', 'Least-privilege tools, sandboxing, indirect prompt injection through tool results, spending limits, and abuse-case testing.', ['Least privilege', 'Sandboxing', 'Indirect injection', 'Abuse cases'], '35 min'),
          L(10, 'agent-capstone-support-agent', 'Capstone — A Tool-Using Support Agent', 'Plan and build a support agent that searches a knowledge base, calls tools, asks for approval on refunds, and is traced and evaluated.', ['Capstone', 'RAG + tools', 'Approvals', 'Evaluation'], '50 min'),
        ],
      },
    ],
  },
  {
    slug: 'devops-mlops',
    title: 'DevOps & Cloud Infrastructure',
    area: 'cloud',
    cat: 'itops',
    icon: '🚀',
    color: '#f97316',
    description: 'The everyday tools of modern engineering teams: Linux, Git, Docker, cloud compute, IAM and networking, Terraform, CI/CD, Kubernetes, and monitoring.',
    roles: 'DevOps Engineer · Cloud Engineer · Platform Engineer · MLOps Engineer',
    prerequisites: [
      { label: 'Networking basics', href: '/learn/networking' },
      { label: 'Python foundations', href: '/learn/python' },
    ],
    sections: [
      {
        id: 1, title: 'Developer Essentials', blurb: 'The command line and version control every engineering job assumes.',
        modules: [
          L(1, 'linux-command-line', 'Linux Command Line Essentials', 'Navigate the file system, manage files, permissions, processes, and packages, and read logs from a Linux terminal.', ['Shell navigation', 'Permissions', 'Processes', 'Pipes and grep'], '40 min'),
          L(2, 'bash-scripting', 'Bash Scripting for Automation', 'Write safe Bash scripts with variables, conditionals, loops, functions, exit codes, and cron scheduling.', ['Variables', 'Loops', 'Exit codes', 'set -euo pipefail', 'cron'], '35 min'),
          L(3, 'git-github-essentials', 'Git and GitHub — Commits, Branches and Pull Requests', 'Track changes with Git, branch and merge, resolve conflicts, and collaborate through GitHub pull requests and code review.', ['Commits', 'Branches', 'Merge conflicts', 'Pull requests'], '40 min'),
        ],
      },
      {
        id: 2, title: 'Containers', blurb: 'Package an application once and run it anywhere.',
        modules: [
          L(4, 'docker-fundamentals', 'Docker Fundamentals — Images, Containers and Dockerfiles', 'What containers are, writing a Dockerfile for a Python API, layers and caching, volumes, ports, and image hygiene.', ['Images', 'Containers', 'Dockerfile', 'Volumes', 'Multi-stage builds'], '40 min'),
          L(5, 'docker-compose', 'Docker Compose for Multi-Service Apps', 'Run an API, database, and cache together with Compose: services, networks, volumes, health checks, and environment files.', ['Compose services', 'Networks', 'Health checks', '.env'], '30 min'),
        ],
      },
      {
        id: 3, title: 'Cloud Infrastructure', blurb: 'Compute, identity, and networking in the cloud, defined as code.',
        modules: [
          L(6, 'cloud-compute-iam-networking', 'Cloud Core — Compute, IAM and VPC Networking', 'Virtual machines and managed compute, identity and access management with least privilege, and VPCs, subnets, and security groups across AWS, Azure, and GCP.', ['VMs', 'Serverless', 'IAM', 'VPC', 'Security groups'], '45 min'),
          L(7, 'terraform-infrastructure-as-code', 'Infrastructure as Code with Terraform', 'Write Terraform to create cloud resources, manage state safely, use variables and modules, and review plans before applying.', ['Providers', 'State', 'Plan / apply', 'Modules'], '40 min'),
        ],
      },
      {
        id: 4, title: 'Delivery & Operations', blurb: 'Ship changes automatically, run them on Kubernetes, and know when they break.',
        modules: [
          L(8, 'ci-cd-github-actions', 'CI/CD with GitHub Actions', 'Build a pipeline that lints, tests, builds a Docker image, and deploys on merge, with secrets, environments, and approvals.', ['Workflows', 'Jobs and steps', 'Secrets', 'Deployments'], '35 min'),
          L(9, 'kubernetes-fundamentals', 'Kubernetes Fundamentals — Pods, Deployments and Services', 'Run containers on Kubernetes: pods, deployments, services, config maps, secrets, probes, and rolling updates with kubectl.', ['Pods', 'Deployments', 'Services', 'Probes', 'kubectl'], '45 min'),
          L(10, 'monitoring-logging-alerting', 'Monitoring, Logging and Alerting', 'The three signals (metrics, logs, traces), Prometheus and Grafana basics, useful alerts, and SLO-based on-call.', ['Metrics', 'Logs', 'Traces', 'Prometheus', 'Grafana', 'SLOs'], '35 min'),
        ],
      },
    ],
  },
  {
    slug: 'javascript',
    title: 'JavaScript & TypeScript',
    area: 'programming',
    cat: 'web',
    icon: '💛',
    color: '#eab308',
    description: 'The language of the web, from first variable to typed applications: values and functions, the DOM, asynchronous code, modules and tooling, and TypeScript.',
    roles: 'Frontend Developer · Full-Stack Developer · JavaScript Engineer',
    prerequisites: [{ label: 'HTML & CSS', href: '/learn/html-css' }],
    sections: [
      {
        id: 1, title: 'JavaScript Foundations', blurb: 'Values, logic, functions, and data — then make a web page respond to users.',
        modules: [
          L(1, 'javascript-fundamentals', 'JavaScript Fundamentals — Values, Variables and Control Flow', 'How JavaScript runs in the browser and Node.js, let and const, types and coercion, operators, conditionals, and loops.', ['let / const', 'Types', 'Equality', 'Conditionals', 'Loops'], '40 min'),
          L(2, 'functions-objects-arrays', 'Functions, Objects and Arrays', 'Function declarations and arrow functions, scope and closures, objects, destructuring, spread, and the array methods you will use daily.', ['Arrow functions', 'Closures', 'Objects', 'map / filter / reduce'], '45 min'),
          L(3, 'dom-and-events', 'The DOM and Events', 'Select and update elements, handle clicks and form input, use event delegation, and build a small interactive to-do list.', ['querySelector', 'Events', 'Delegation', 'Forms'], '40 min'),
        ],
      },
      {
        id: 2, title: 'Modern JavaScript', blurb: 'Async code, modules, tooling, and types for real applications.',
        modules: [
          L(4, 'async-javascript-fetch', 'Async JavaScript — Promises, async/await and fetch', 'The event loop, callbacks, promises, async/await, calling APIs with fetch, and handling errors and loading states.', ['Event loop', 'Promises', 'async / await', 'fetch'], '40 min'),
          L(5, 'modules-npm-tooling', 'Modules, npm and Build Tooling', 'ES modules, package.json and npm scripts, dependencies and lockfiles, Vite, and linting and formatting with ESLint and Prettier.', ['ES modules', 'npm', 'Vite', 'ESLint'], '30 min'),
          L(6, 'typescript-essentials', 'TypeScript Essentials', 'Add types to JavaScript: primitives, objects, unions, generics, narrowing, and typing API responses, plus a strict tsconfig.', ['Types', 'Interfaces', 'Unions', 'Generics', 'Narrowing'], '45 min'),
        ],
      },
    ],
  },
  {
    slug: 'full-stack-ai',
    title: 'Full-Stack Development with AI',
    area: 'programming',
    cat: 'web',
    icon: '🧩',
    color: '#38bdf8',
    description: 'Build complete web applications with React, Next.js, Node.js, PostgreSQL, and authentication, add a useful AI feature, and deploy it.',
    roles: 'Full-Stack Engineer · AI Product Engineer · Frontend Developer',
    prerequisites: [
      { label: 'JavaScript & TypeScript', href: '/learn/javascript' },
      { label: 'SQL essentials', href: '/learn/sql' },
    ],
    sections: [
      {
        id: 1, title: 'Front End with React', blurb: 'Components, state, and routing for modern interfaces.',
        modules: [
          L(1, 'react-fundamentals', 'React Fundamentals — Components, Props and JSX', 'Think in components, write JSX, pass props, render lists with keys, and compose a page from small pieces.', ['Components', 'JSX', 'Props', 'Lists and keys'], '40 min'),
          L(2, 'react-state-effects', 'React State, Effects and Data Fetching', 'useState, controlled forms, lifting state up, useEffect done right, and fetching data with loading and error states.', ['useState', 'Forms', 'useEffect', 'Data fetching'], '40 min'),
          L(3, 'nextjs-app-router', 'Next.js — Routing, Server Components and Forms', 'File-based routing, layouts, server and client components, server actions, and when to render on the server.', ['App Router', 'Server components', 'Server actions', 'Rendering'], '40 min'),
        ],
      },
      {
        id: 2, title: 'Back End & Data', blurb: 'APIs, databases, and users you can trust.',
        modules: [
          L(4, 'node-express-rest-api', 'Building a REST API with Node.js and Express', 'Routes, middleware, validation, status codes, and error handling for a JSON API, tested with curl.', ['Express', 'Routes', 'Middleware', 'Validation', 'Status codes'], '40 min'),
          L(5, 'postgres-with-an-orm', 'PostgreSQL with an ORM — Prisma', 'Model tables in a schema, run migrations, query and relate records, and avoid N+1 queries.', ['PostgreSQL', 'Prisma', 'Migrations', 'Relations'], '35 min'),
          L(6, 'authentication-sessions-jwt', 'Authentication — Sessions, JWTs and OAuth', 'Password hashing, cookie sessions versus JWTs, OAuth sign-in, protecting routes, and the security mistakes to avoid.', ['Hashing', 'Sessions', 'JWT', 'OAuth', 'Authorisation'], '40 min'),
        ],
      },
      {
        id: 3, title: 'AI Features & Deployment', blurb: 'Add AI that helps users, then ship the whole app.',
        modules: [
          L(7, 'adding-ai-features', 'Adding an AI Feature — Streaming Chat in a Web App', 'Call an LLM from a server route, stream the answer into a React UI, keep API keys server-side, and handle limits and failures.', ['Server routes', 'Streaming UI', 'API keys', 'Rate limits'], '40 min'),
          L(8, 'deploying-full-stack-apps', 'Deploying a Full-Stack App', 'Environment variables, managed databases, builds, preview deployments, domains, and post-deploy checks on common platforms.', ['Environments', 'Managed Postgres', 'CI', 'Domains'], '35 min'),
        ],
      },
    ],
  },
  {
    slug: 'analytics-engineering-data-analytics',
    title: 'Data Analytics & Statistics',
    area: 'data',
    cat: 'data',
    icon: '📊',
    color: '#eab308',
    description: 'The statistics, metric design, experiments, and dashboard skills analysts and analytics engineers use to turn data into decisions.',
    roles: 'Data Analyst · Analytics Engineer · Product Analyst · BI Analyst',
    prerequisites: [
      { label: 'SQL', href: '/learn/sql' },
      { label: 'pandas DataFrames', href: '/learn/ai-ml/programming/pandas-dataframes' },
    ],
    sections: [
      {
        id: 1, title: 'Statistics for Data', blurb: 'Describe data honestly and know when a difference is real.',
        modules: [
          L(1, 'descriptive-statistics', 'Descriptive Statistics and Distributions', 'Mean, median, percentiles, spread, skew, and outliers; reading histograms and box plots; and choosing the right summary.', ['Mean vs median', 'Percentiles', 'Variance', 'Distributions'], '35 min'),
          L(2, 'sampling-confidence-intervals', 'Sampling and Confidence Intervals', 'Populations versus samples, sampling bias, the central limit theorem, standard error, and confidence intervals in Python.', ['Sampling', 'CLT', 'Standard error', 'Confidence intervals'], '35 min'),
          L(3, 'hypothesis-testing', 'Hypothesis Testing and p-values', 'Null and alternative hypotheses, t-tests and chi-square tests, p-values, errors, power, and what significance does not mean.', ['t-test', 'Chi-square', 'p-values', 'Power'], '40 min'),
        ],
      },
      {
        id: 2, title: 'Metrics & Experiments', blurb: 'Define metrics people trust and test changes properly.',
        modules: [
          L(4, 'metrics-and-kpis', 'Defining Metrics and KPIs', 'North-star and guardrail metrics, funnels, cohorts, retention, writing a metric definition, and building a metrics layer.', ['North-star metric', 'Funnels', 'Cohorts', 'Metric definitions'], '35 min'),
          L(5, 'ab-testing', 'A/B Testing — Design, Analysis and Pitfalls', 'Hypotheses, randomisation units, sample size, running and analysing a test, and the peeking, novelty, and multiple-testing traps.', ['Experiment design', 'Sample size', 'Analysis', 'Pitfalls'], '40 min'),
        ],
      },
      {
        id: 3, title: 'BI & Storytelling', blurb: 'Dashboards and narratives that lead to action.',
        modules: [
          L(6, 'dashboards-bi-tools', 'Dashboards with Power BI, Tableau and Looker Studio', 'Design a dashboard for a decision, model data for BI, choose charts, add filters, and manage refresh and access.', ['Dashboard design', 'Power BI', 'Tableau', 'Looker Studio'], '40 min'),
          L(7, 'data-storytelling', 'Data Storytelling — From Analysis to Decision', 'Structure an analysis as a story, choose the one chart that makes the point, write the headline, and present to stakeholders.', ['Narrative', 'Chart choice', 'Headlines', 'Stakeholders'], '30 min'),
        ],
      },
    ],
  },
  {
    slug: 'operating-systems',
    title: 'Operating Systems',
    area: 'cs',
    cat: 'cs',
    icon: '🖥️',
    color: '#64748b',
    description: 'How an operating system runs your code: processes and threads, scheduling, concurrency and deadlocks, memory and virtual memory, and file systems.',
    roles: 'Software Engineer · Backend Engineer · Systems Engineer',
    prerequisites: [{ label: 'Data Structures & Algorithms basics', href: '/learn/dsa' }],
    sections: [
      {
        id: 1, title: 'Processes & Concurrency', blurb: 'How programs run, share the CPU, and coordinate.',
        modules: [
          L(1, 'what-an-os-does', 'What an Operating System Does — Kernel and System Calls', 'User mode and kernel mode, system calls, interrupts, and what happens between typing a command and a program running.', ['Kernel', 'System calls', 'Interrupts', 'Boot'], '30 min'),
          L(2, 'processes-and-threads', 'Processes and Threads', 'Process memory layout, process states, fork and exec, threads versus processes, context switches, and IPC.', ['Processes', 'Threads', 'fork / exec', 'Context switch', 'IPC'], '40 min'),
          L(3, 'cpu-scheduling', 'CPU Scheduling', 'FCFS, SJF, round robin, priority, and multilevel feedback queues, with worked Gantt charts and the metrics interviewers ask about.', ['FCFS', 'SJF', 'Round robin', 'Priority', 'MLFQ'], '35 min'),
          L(4, 'concurrency-synchronization-deadlocks', 'Concurrency, Synchronisation and Deadlocks', 'Race conditions, critical sections, mutexes and semaphores, producer–consumer, and deadlock conditions, prevention, and detection.', ['Race conditions', 'Mutex', 'Semaphores', 'Deadlock'], '45 min'),
        ],
      },
      {
        id: 2, title: 'Memory & Storage', blurb: 'Where data lives while programs run, and after.',
        modules: [
          L(5, 'memory-management-virtual-memory', 'Memory Management and Virtual Memory', 'Address spaces, paging, page tables and the TLB, page faults, replacement algorithms, and thrashing.', ['Paging', 'TLB', 'Page faults', 'LRU', 'Thrashing'], '45 min'),
          L(6, 'file-systems-and-io', 'File Systems and I/O', 'Files, directories, and inodes, allocation methods, journaling, buffering and caching, and disk scheduling.', ['Inodes', 'Journaling', 'Buffering', 'Disk scheduling'], '35 min'),
          L(7, 'os-interview-questions', 'Operating Systems Interview Questions', 'The OS questions software engineering interviews ask most, with model answers and the follow-ups to expect.', ['Interview', 'Model answers', 'Follow-ups'], '40 min'),
        ],
      },
    ],
  },
]

export const REGISTRY_TRACK_SLUGS: ReadonlySet<string> = new Set(REGISTRY_TRACKS.map(track => track.slug))

export function getRegistryTrack(slug: string): RegistryTrack {
  const track = REGISTRY_TRACKS.find(item => item.slug === slug)
  if (!track) throw new Error(`Unknown registry track "${slug}"`)
  return track
}

export function registryLessons(slug: string): (RegistryLesson & { section: string })[] {
  return getRegistryTrack(slug).sections.flatMap(section => section.modules.map(lesson => ({ ...lesson, section: section.title })))
}
