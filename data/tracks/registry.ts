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
          L(5, 'multimodal-apis', 'Multimodal APIs — Vision, Audio and Speech', 'Send images and documents to vision-capable models, transcribe and generate speech, and design features that combine text, images and audio.', ['Vision input', 'Document understanding', 'Speech-to-text', 'Text-to-speech'], '35 min'),
        ],
      },
      {
        id: 2, title: 'Retrieval & Vector Databases', blurb: 'Turn documents into searchable vectors and retrieve the right context.',
        modules: [
          L(6, 'embeddings-in-practice', 'Embeddings in Practice — Chunking and Similarity Search', 'Generate embeddings, choose a chunking strategy, and run cosine-similarity search over your own documents.', ['Embedding models', 'Chunking', 'Cosine similarity', 'Metadata'], '30 min'),
          L(7, 'vector-databases', 'Vector Databases — pgvector, Chroma, Pinecone and FAISS', 'Store and query embeddings at scale: indexes (HNSW, IVF), metadata filters, hybrid search, and how to choose a vector store.', ['pgvector', 'Chroma', 'Pinecone', 'FAISS', 'HNSW', 'Hybrid search'], '35 min'),
        ],
      },
      {
        id: 3, title: 'Quality, Safety & Operations', blurb: 'Prove your LLM feature works, keep it safe, and keep it affordable.',
        modules: [
          L(8, 'llm-evaluation', 'Evaluating LLM Apps — Eval Sets, LLM-as-Judge and RAG Metrics', 'Build an evaluation set, score outputs with code checks and LLM judges, measure RAG faithfulness and relevance, and gate releases on results.', ['Eval sets', 'LLM-as-judge', 'RAG metrics', 'Regression testing'], '35 min'),
          L(9, 'guardrails-prompt-injection', 'Guardrails, Prompt Injection and PII Handling', 'Defend LLM features against direct and indirect prompt injection, filter unsafe input and output, and keep personal data out of prompts and logs.', ['Prompt injection', 'Input/output filters', 'PII redaction', 'Least privilege'], '35 min'),
          L(10, 'llm-observability-tracing', 'Observability and Tracing for LLM Apps', 'Trace every model call, retrieval, and tool call with OpenTelemetry-style spans; track cost, latency, and quality in production.', ['Tracing', 'OpenTelemetry', 'Langfuse / LangSmith', 'Dashboards'], '30 min'),
          L(11, 'llm-cost-latency', 'Cost and Latency Optimisation — Caching, Batching and Routing', 'Cut cost and response time with prompt caching, response caching, batching, smaller-model routing, and output limits.', ['Prompt caching', 'Semantic cache', 'Batch APIs', 'Model routing'], '30 min'),
        ],
      },
      {
        id: 4, title: 'Shipping LLM Features', blurb: 'Choose your tooling and put an AI feature in front of users.',
        modules: [
          L(12, 'llm-frameworks', 'LLM Frameworks — LangChain and LlamaIndex: When to Use Them', 'What LangChain and LlamaIndex give you, what they cost in complexity, and how to decide between a framework and plain SDK code.', ['LangChain', 'LlamaIndex', 'Trade-offs', 'Plain SDK'], '25 min'),
          L(13, 'running-open-models', 'Running Open Models — Ollama, vLLM and Hugging Face', 'Run open-weight models locally with Ollama, serve them with vLLM, pick a model from Hugging Face, and compare cost, latency and quality with hosted APIs.', ['Ollama', 'vLLM', 'Hugging Face', 'Quantisation', 'Self-hosting'], '35 min'),
          L(14, 'shipping-ai-feature-fastapi', 'Shipping an AI Feature — FastAPI Backend and Chat UI', 'Wrap a RAG assistant in a FastAPI service with streaming responses, a minimal chat UI, configuration, and deployment checks.', ['FastAPI', 'Server-sent events', 'Chat UI', 'Deployment'], '40 min'),
        ],
      },
      {
        id: 5, title: 'Capstone & Career', blurb: 'Put everything together in one production project, then prepare for interviews.',
        modules: [
          L(15, 'genai-capstone-rag-assistant', 'Capstone — Production RAG Assistant', 'Plan, build, evaluate and deploy a RAG assistant over a real document set with structured outputs, guardrails, tracing and a cost budget.', ['Capstone', 'RAG', 'Evaluation', 'Guardrails', 'Deployment'], '60 min'),
          L(16, 'genai-interview-prep', 'Generative AI Interview Prep', 'The LLM engineering questions interviewers ask most — RAG design, evaluation, cost, safety and system design — with model answers.', ['Interview', 'RAG design', 'Evaluation', 'System design'], '45 min'),
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
          L(8, 'agent-frameworks-compared', 'Agent Frameworks Compared — LangGraph, OpenAI Agents SDK and CrewAI', 'Build the same small agent three ways and compare control, state, tracing, lock-in and production readiness to choose a framework.', ['LangGraph', 'OpenAI Agents SDK', 'CrewAI', 'Trade-offs'], '35 min'),
          L(9, 'browser-computer-use-agents', 'Browser and Computer-Use Agents', 'How agents drive browsers and desktops, when to use Playwright tools instead, and how to keep these agents reliable and safe.', ['Browser agents', 'Playwright', 'Computer use', 'Safety'], '35 min'),
        ],
      },
      {
        id: 3, title: 'Production Agents', blurb: 'Prove agents work, see what they do, and limit what they can break.',
        modules: [
          L(10, 'agent-evaluation-observability', 'Testing, Evaluating and Tracing Agents', 'Trajectory and outcome evaluation, scenario test suites, tracing every step, and the production metrics that matter for agents.', ['Trajectory evals', 'Scenario tests', 'Tracing', 'Success rate'], '35 min'),
          L(11, 'securing-agents', 'Securing Agents — Tool Permissions and Abuse Cases', 'Least-privilege tools, sandboxing, indirect prompt injection through tool results, spending limits, and abuse-case testing.', ['Least privilege', 'Sandboxing', 'Indirect injection', 'Abuse cases'], '35 min'),
          L(12, 'deploying-long-running-agents', 'Deploying Long-Running Agents — Queues, Checkpoints and Cost Limits', 'Run agents as background jobs with queues, durable checkpoints, timeouts, budgets and resumable runs, and monitor them in production.', ['Background jobs', 'Queues', 'Checkpoints', 'Budgets'], '35 min'),
          L(13, 'agent-capstone-support-agent', 'Capstone — A Tool-Using Support Agent', 'Plan and build a support agent that searches a knowledge base, calls tools, asks for approval on refunds, and is traced and evaluated.', ['Capstone', 'RAG + tools', 'Approvals', 'Evaluation'], '50 min'),
          L(14, 'agentic-ai-interview-prep', 'Agentic AI Interview Prep', 'Agent architecture, tool design, memory, evaluation and security questions from agentic AI interviews, with model answers and design exercises.', ['Interview', 'Agent design', 'Evaluation', 'Security'], '45 min'),
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
    description: 'The everyday tools of modern engineering teams: Linux, Git, Docker, cloud compute, IAM and networking, Terraform, CI/CD, Kubernetes, monitoring, and SRE. For ML pipelines and model serving, continue with the MLOps section of AI & Machine Learning.',
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
          L(7, 'networking-for-devops-nginx', 'Networking for DevOps — DNS, Load Balancers and Nginx', 'How requests reach your app: DNS records, TLS certificates, load balancers, and configuring Nginx as a reverse proxy.', ['DNS', 'TLS', 'Load balancers', 'Nginx'], '40 min'),
          L(8, 'terraform-infrastructure-as-code', 'Infrastructure as Code with Terraform', 'Write Terraform to create cloud resources, manage state safely, use variables and modules, and review plans before applying.', ['Providers', 'State', 'Plan / apply', 'Modules'], '40 min'),
          L(9, 'secrets-management', 'Secrets Management — Vault and Cloud Secret Stores', 'Keep credentials out of code and images: environment variables, cloud secret managers, HashiCorp Vault, rotation and access policies.', ['Secrets', 'Vault', 'Secret managers', 'Rotation'], '30 min'),
        ],
      },
      {
        id: 4, title: 'Delivery & Operations', blurb: 'Ship changes automatically, run them on Kubernetes, and know when they break.',
        modules: [
          L(10, 'ci-cd-github-actions', 'CI/CD with GitHub Actions', 'Build a pipeline that lints, tests, builds a Docker image, and deploys on merge, with secrets, environments, and approvals.', ['Workflows', 'Jobs and steps', 'Secrets', 'Deployments'], '35 min'),
          L(11, 'kubernetes-fundamentals', 'Kubernetes Fundamentals — Pods, Deployments and Services', 'Run containers on Kubernetes: pods, deployments, services, config maps, secrets, probes, and rolling updates with kubectl.', ['Pods', 'Deployments', 'Services', 'Probes', 'kubectl'], '45 min'),
          L(12, 'helm-and-gitops-argocd', 'Helm and GitOps with Argo CD', 'Package Kubernetes apps with Helm charts and deploy them declaratively from Git with Argo CD, including rollbacks and environment promotion.', ['Helm', 'Charts', 'GitOps', 'Argo CD'], '40 min'),
          L(13, 'monitoring-logging-alerting', 'Monitoring, Logging and Alerting', 'The three signals (metrics, logs, traces), Prometheus and Grafana basics, useful alerts, and SLO-based on-call.', ['Metrics', 'Logs', 'Traces', 'Prometheus', 'Grafana', 'SLOs'], '35 min'),
          L(14, 'sre-basics-slos', 'SRE Basics — SLIs, SLOs, Error Budgets and Incidents', 'Define service level indicators and objectives, use error budgets to balance speed and reliability, and run incidents and blameless postmortems.', ['SLIs', 'SLOs', 'Error budgets', 'Incidents', 'Postmortems'], '35 min'),
        ],
      },
      {
        id: 5, title: 'Capstone & Career', blurb: 'Ship a real system end to end, then prepare for DevOps interviews.',
        modules: [
          L(15, 'devops-capstone', 'DevOps Capstone — Containerised App with CI/CD, Terraform and Monitoring', 'Take a small API from repository to production: Docker image, Terraform infrastructure, GitHub Actions pipeline, Kubernetes deployment and dashboards.', ['Capstone', 'Docker', 'Terraform', 'CI/CD', 'Kubernetes'], '60 min'),
          L(16, 'devops-interview-prep', 'DevOps Interview Prep', 'Linux, containers, Kubernetes, CI/CD, cloud and incident questions from DevOps and cloud interviews, with model answers and troubleshooting scenarios.', ['Interview', 'Troubleshooting', 'Kubernetes', 'Cloud'], '45 min'),
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
          L(3, 'scope-closures-this', 'Scope, Closures and this', 'Block and function scope, hoisting, closures in practice, and how this is decided in methods, callbacks, arrow functions and classes.', ['Scope', 'Hoisting', 'Closures', 'this', 'bind'], '40 min'),
          L(4, 'array-methods-in-depth', 'Array Methods in Depth — map, filter, reduce, sort', 'Transform real data with map, filter, reduce, find, some, every, flatMap and sort, chain them clearly, and avoid mutation bugs.', ['map', 'filter', 'reduce', 'sort', 'Immutability'], '35 min'),
          L(5, 'classes-prototypes', 'Classes, Prototypes and Inheritance', 'How prototypes work, ES classes, constructors, getters and setters, private fields, inheritance and when to prefer composition.', ['Prototypes', 'Classes', 'Private fields', 'Inheritance'], '40 min'),
          L(6, 'dom-and-events', 'The DOM and Events', 'Select and update elements, handle clicks and form input, use event delegation, and build a small interactive to-do list.', ['querySelector', 'Events', 'Delegation', 'Forms'], '40 min'),
          L(7, 'browser-storage-json', 'JSON, localStorage and Browser Storage', 'Serialise data with JSON, persist state in localStorage and sessionStorage, understand cookies and IndexedDB, and keep stored data safe.', ['JSON', 'localStorage', 'Cookies', 'IndexedDB'], '30 min'),
          L(8, 'error-handling-debugging', 'Error Handling and Debugging in the Browser', 'try/catch and custom errors, handling async failures, reading stack traces, and debugging with DevTools breakpoints and the network panel.', ['try / catch', 'Custom errors', 'DevTools', 'Breakpoints'], '35 min'),
        ],
      },
      {
        id: 2, title: 'Modern JavaScript', blurb: 'Async code, modules, tooling, and types for real applications.',
        modules: [
          L(9, 'async-javascript-fetch', 'Async JavaScript — Promises, async/await and fetch', 'The event loop, callbacks, promises, async/await, calling APIs with fetch, and handling errors and loading states.', ['Event loop', 'Promises', 'async / await', 'fetch'], '40 min'),
          L(10, 'modules-npm-tooling', 'Modules, npm and Build Tooling', 'ES modules, package.json and npm scripts, dependencies and lockfiles, Vite, and linting and formatting with ESLint and Prettier.', ['ES modules', 'npm', 'Vite', 'ESLint'], '30 min'),
          L(11, 'nodejs-fundamentals', 'Node.js Fundamentals — Runtime, File System and Modules', 'Run JavaScript outside the browser: the Node.js runtime, CommonJS and ES modules, the fs and path modules, environment variables and a small CLI.', ['Node.js', 'fs', 'path', 'process.env', 'CLI'], '40 min'),
          L(12, 'typescript-essentials', 'TypeScript Essentials', 'Add types to JavaScript: primitives, objects, unions, generics, narrowing, and typing API responses, plus a strict tsconfig.', ['Types', 'Interfaces', 'Unions', 'Generics', 'Narrowing'], '45 min'),
          L(13, 'testing-with-vitest', 'Testing JavaScript with Vitest', 'Write unit tests with Vitest, structure test cases, mock modules and network calls, measure coverage and run tests in CI.', ['Vitest', 'Assertions', 'Mocks', 'Coverage'], '35 min'),
        ],
      },
      {
        id: 3, title: 'Projects & Interview', blurb: 'Build a complete project and prepare for JavaScript interviews.',
        modules: [
          L(14, 'javascript-project-interview-prep', 'JavaScript Project and Interview Prep', 'Build a typed, tested expense-tracker app end to end, then work through the JavaScript questions interviews ask most.', ['Project', 'Interview', 'Event loop', 'Closures'], '50 min'),
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
          L(3, 'styling-react-tailwind', 'Styling React Apps — Tailwind and Component Libraries', 'Style components with Tailwind CSS, build responsive layouts, use an accessible component library, and keep styles consistent.', ['Tailwind CSS', 'Responsive', 'Component libraries', 'Accessibility'], '35 min'),
          L(4, 'forms-validation-zod', 'Forms and Validation — React Hook Form and Zod', 'Build forms with React Hook Form, validate with shared Zod schemas on client and server, and show helpful errors.', ['React Hook Form', 'Zod', 'Validation', 'Error messages'], '35 min'),
          L(5, 'nextjs-app-router', 'Next.js — Routing, Server Components and Forms', 'File-based routing, layouts, server and client components, server actions, and when to render on the server.', ['App Router', 'Server components', 'Server actions', 'Rendering'], '40 min'),
        ],
      },
      {
        id: 2, title: 'Back End & Data', blurb: 'APIs, databases, and users you can trust.',
        modules: [
          L(6, 'node-express-rest-api', 'Building a REST API with Node.js and Express', 'Routes, middleware, validation, status codes, and error handling for a JSON API, tested with curl.', ['Express', 'Routes', 'Middleware', 'Validation', 'Status codes'], '40 min'),
          L(7, 'postgres-with-an-orm', 'PostgreSQL with an ORM — Prisma', 'Model tables in a schema, run migrations, query and relate records, and avoid N+1 queries.', ['PostgreSQL', 'Prisma', 'Migrations', 'Relations'], '35 min'),
          L(8, 'authentication-sessions-jwt', 'Authentication — Sessions, JWTs and OAuth', 'Password hashing, cookie sessions versus JWTs, OAuth sign-in, protecting routes, and the security mistakes to avoid.', ['Hashing', 'Sessions', 'JWT', 'OAuth', 'Authorisation'], '40 min'),
          L(9, 'web-security-full-stack', 'Web Security for Full-Stack Developers — XSS, CSRF and CORS', 'Prevent cross-site scripting, cross-site request forgery and injection, configure CORS and security headers, and handle secrets safely.', ['XSS', 'CSRF', 'CORS', 'Security headers'], '40 min'),
          L(10, 'testing-full-stack', 'Testing a Full-Stack App — Unit, API and Playwright E2E', 'Test components, API routes and database code, write end-to-end tests with Playwright, and run the suite in CI.', ['Unit tests', 'API tests', 'Playwright', 'CI'], '40 min'),
        ],
      },
      {
        id: 3, title: 'AI Features & Deployment', blurb: 'Add AI that helps users, then ship the whole app.',
        modules: [
          L(11, 'adding-ai-features', 'Adding an AI Feature — Streaming Chat in a Web App', 'Call an LLM from a server route, stream the answer into a React UI, keep API keys server-side, and handle limits and failures.', ['Server routes', 'Streaming UI', 'API keys', 'Rate limits'], '40 min'),
          L(12, 'real-time-websockets-sse', 'Real-Time Features — WebSockets and Server-Sent Events', 'Push live updates to users with server-sent events and WebSockets, choose between them, and scale real-time connections.', ['WebSockets', 'Server-sent events', 'Live updates', 'Scaling'], '35 min'),
          L(13, 'deploying-full-stack-apps', 'Deploying a Full-Stack App', 'Environment variables, managed databases, builds, preview deployments, domains, and post-deploy checks on common platforms.', ['Environments', 'Managed Postgres', 'CI', 'Domains'], '35 min'),
        ],
      },
      {
        id: 4, title: 'Capstone & Career', blurb: 'Build a complete AI-powered product and prepare for interviews.',
        modules: [
          L(14, 'full-stack-capstone', 'Full-Stack Capstone — AI-Powered SaaS App', 'Plan and build a small SaaS app with authentication, a database, an AI feature, tests and deployment, and present it as a portfolio project.', ['Capstone', 'Next.js', 'PostgreSQL', 'AI feature', 'Deployment'], '60 min'),
          L(15, 'full-stack-interview-prep', 'Full-Stack Interview Prep', 'React, Node.js, databases, web security and system design questions from full-stack interviews, with model answers and a take-home checklist.', ['Interview', 'React', 'APIs', 'System design'], '45 min'),
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
    description: 'The everyday analyst toolkit — spreadsheets, SQL, pandas and EDA — plus statistics, metric design, experiments, BI modelling and dashboards that turn data into decisions.',
    roles: 'Data Analyst · Analytics Engineer · Product Analyst · BI Analyst',
    prerequisites: [
      { label: 'SQL', href: '/learn/sql' },
      { label: 'pandas DataFrames', href: '/learn/ai-ml/programming/pandas-dataframes' },
    ],
    sections: [
      {
        id: 1, title: 'Analyst Toolkit', blurb: 'The tools an analyst uses every day, before any statistics.',
        modules: [
          L(1, 'spreadsheets-for-analysis', 'Spreadsheets for Analysis — Excel and Google Sheets', 'Clean and analyse data in a spreadsheet: formulas, lookups, pivot tables, conditional formatting and charts, and when to move to SQL or Python.', ['Formulas', 'XLOOKUP', 'Pivot tables', 'Charts'], '40 min'),
          L(2, 'sql-for-analytics', 'SQL for Analytics — The Queries Analysts Write Daily', 'Aggregations, joins, CASE, date handling, window functions and CTEs applied to real business questions, with links to the full SQL course.', ['Aggregations', 'Joins', 'Window functions', 'CTEs'], '40 min'),
          L(3, 'python-for-analysts-pandas', 'Python for Analysts — The pandas Analysis Workflow', 'Load, clean, reshape, group and visualise data with pandas in a notebook, and turn the result into a shareable report.', ['pandas', 'Cleaning', 'groupby', 'Visualisation'], '45 min'),
          L(4, 'exploratory-data-analysis', 'Exploratory Data Analysis — A Repeatable Workflow', 'A step-by-step EDA checklist: data quality, distributions, segments, relationships and anomalies, ending in written findings.', ['EDA', 'Data quality', 'Segments', 'Findings'], '40 min'),
        ],
      },
      {
        id: 2, title: 'Statistics for Data', blurb: 'Describe data honestly and know when a difference is real.',
        modules: [
          L(5, 'descriptive-statistics', 'Descriptive Statistics and Distributions', 'Mean, median, percentiles, spread, skew, and outliers; reading histograms and box plots; and choosing the right summary.', ['Mean vs median', 'Percentiles', 'Variance', 'Distributions'], '35 min'),
          L(6, 'sampling-confidence-intervals', 'Sampling and Confidence Intervals', 'Populations versus samples, sampling bias, the central limit theorem, standard error, and confidence intervals in Python.', ['Sampling', 'CLT', 'Standard error', 'Confidence intervals'], '35 min'),
          L(7, 'hypothesis-testing', 'Hypothesis Testing and p-values', 'Null and alternative hypotheses, t-tests and chi-square tests, p-values, errors, power, and what significance does not mean.', ['t-test', 'Chi-square', 'p-values', 'Power'], '40 min'),
          L(8, 'correlation-and-regression', 'Correlation and Regression for Analysts', 'Measure relationships with correlation, fit and interpret linear regression, and avoid confusing correlation with causation.', ['Correlation', 'Linear regression', 'Coefficients', 'Causation'], '40 min'),
        ],
      },
      {
        id: 3, title: 'Metrics & Experiments', blurb: 'Define metrics people trust and test changes properly.',
        modules: [
          L(9, 'metrics-and-kpis', 'Defining Metrics and KPIs', 'North-star and guardrail metrics, funnels, cohorts, retention, writing a metric definition, and building a metrics layer.', ['North-star metric', 'Funnels', 'Cohorts', 'Metric definitions'], '35 min'),
          L(10, 'ab-testing', 'A/B Testing — Design, Analysis and Pitfalls', 'Hypotheses, randomisation units, sample size, running and analysing a test, and the peeking, novelty, and multiple-testing traps.', ['Experiment design', 'Sample size', 'Analysis', 'Pitfalls'], '40 min'),
          L(11, 'funnel-cohort-retention', 'Funnel, Cohort and Retention Analysis', 'Build conversion funnels, cohort tables and retention curves in SQL and Python, and explain what they say about a product.', ['Funnels', 'Cohorts', 'Retention curves', 'Churn'], '40 min'),
        ],
      },
      {
        id: 4, title: 'BI & Storytelling', blurb: 'Dashboards and narratives that lead to action.',
        modules: [
          L(12, 'dashboards-bi-tools', 'Dashboards with Power BI, Tableau and Looker Studio', 'Design a dashboard for a decision, model data for BI, choose charts, add filters, and manage refresh and access.', ['Dashboard design', 'Power BI', 'Tableau', 'Looker Studio'], '40 min'),
          L(13, 'bi-data-models-dax', 'BI Data Models and Measures — Star Schemas and DAX', 'Model data for BI tools with star schemas and relationships, write measures in DAX, and keep a semantic model fast and trustworthy.', ['Star schema', 'Relationships', 'DAX', 'Semantic models'], '40 min'),
          L(14, 'data-storytelling', 'Data Storytelling — From Analysis to Decision', 'Structure an analysis as a story, choose the one chart that makes the point, write the headline, and present to stakeholders.', ['Narrative', 'Chart choice', 'Headlines', 'Stakeholders'], '30 min'),
        ],
      },
      {
        id: 5, title: 'Case Studies & Career', blurb: 'Apply the full workflow to a real business problem and prepare for interviews.',
        modules: [
          L(15, 'analytics-case-study-churn', 'Analytics Case Study — Customer Churn from Question to Dashboard', 'Take a churn question from stakeholder brief to SQL, analysis, a dashboard and a recommendation memo.', ['Case study', 'Churn', 'Dashboard', 'Recommendation'], '50 min'),
          L(16, 'data-analyst-interview-prep', 'Data Analyst Interview Prep', 'SQL, statistics, product-metrics and case questions from data analyst interviews, with model answers and a take-home approach.', ['Interview', 'SQL', 'Statistics', 'Product sense'], '45 min'),
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
    description: 'How an operating system runs your code: processes, threads and IPC, scheduling, concurrency and deadlocks, memory, file systems and storage, virtualisation, containers and OS security.',
    roles: 'Software Engineer · Backend Engineer · Systems Engineer',
    prerequisites: [{ label: 'Data Structures & Algorithms basics', href: '/learn/dsa' }],
    sections: [
      {
        id: 1, title: 'Processes & Concurrency', blurb: 'How programs run, share the CPU, and coordinate.',
        modules: [
          L(1, 'what-an-os-does', 'What an Operating System Does — Kernel and System Calls', 'User mode and kernel mode, system calls, interrupts, and what happens between typing a command and a program running.', ['Kernel', 'System calls', 'Interrupts', 'Boot'], '30 min'),
          L(2, 'processes-and-threads', 'Processes and Threads', 'Process memory layout, process states, fork and exec, threads versus processes, context switches, and IPC.', ['Processes', 'Threads', 'fork / exec', 'Context switch', 'IPC'], '40 min'),
          L(3, 'inter-process-communication', 'Inter-Process Communication — Pipes, Signals and Shared Memory', 'How processes talk: pipes, signals, message queues, shared memory and sockets, with working examples and their trade-offs.', ['Pipes', 'Signals', 'Shared memory', 'Sockets'], '35 min'),
          L(4, 'cpu-scheduling', 'CPU Scheduling', 'FCFS, SJF, round robin, priority, and multilevel feedback queues, with worked Gantt charts and the metrics interviewers ask about.', ['FCFS', 'SJF', 'Round robin', 'Priority', 'MLFQ'], '35 min'),
          L(5, 'concurrency-synchronization-deadlocks', 'Concurrency, Synchronisation and Deadlocks', 'Race conditions, critical sections, mutexes and semaphores, producer–consumer, and deadlock conditions, prevention, and detection.', ['Race conditions', 'Mutex', 'Semaphores', 'Deadlock'], '45 min'),
        ],
      },
      {
        id: 2, title: 'Memory & Storage', blurb: 'Where data lives while programs run, and after.',
        modules: [
          L(6, 'memory-management-virtual-memory', 'Memory Management and Virtual Memory', 'Address spaces, paging, page tables and the TLB, page faults, replacement algorithms, and thrashing.', ['Paging', 'TLB', 'Page faults', 'LRU', 'Thrashing'], '45 min'),
          L(7, 'file-systems-and-io', 'File Systems and I/O', 'Files, directories, and inodes, allocation methods, journaling, buffering and caching, and disk scheduling.', ['Inodes', 'Journaling', 'Buffering', 'Disk scheduling'], '35 min'),
          L(8, 'disk-scheduling-raid-storage', 'Disk Scheduling, RAID and Storage Devices', 'HDDs versus SSDs, disk scheduling algorithms, RAID levels and their trade-offs, and how storage performance affects applications.', ['HDD vs SSD', 'Disk scheduling', 'RAID', 'IOPS'], '35 min'),
        ],
      },
      {
        id: 3, title: 'Virtualisation, Security & Interviews', blurb: 'How modern systems isolate workloads and protect resources, then interview practice.',
        modules: [
          L(9, 'virtualisation-containers', 'Virtualisation and Containers — Hypervisors, Namespaces and cgroups', 'Type 1 and type 2 hypervisors, how containers use namespaces and cgroups, and what that means for Docker and Kubernetes.', ['Hypervisors', 'Namespaces', 'cgroups', 'Containers'], '40 min'),
          L(10, 'os-protection-security', 'Protection and Security in the OS', 'Users, permissions and access control, privilege separation, memory protection, ASLR and sandboxing.', ['Access control', 'Privileges', 'ASLR', 'Sandboxing'], '35 min'),
          L(11, 'os-interview-questions', 'Operating Systems Interview Questions', 'The OS questions software engineering interviews ask most, with model answers and the follow-ups to expect.', ['Interview', 'Model answers', 'Follow-ups'], '40 min'),
        ],
      },
    ],
  },
  {
    slug: 'system-design',
    title: 'System Design',
    area: 'cs',
    cat: 'cs',
    icon: '🏗️',
    color: '#0ea5e9',
    description: 'Design systems that scale: requirements and estimates, APIs, load balancing, caching, databases at scale, queues, consistency, reliability and low-level design, then practise real design interviews.',
    roles: 'Software Engineer · Backend Engineer · Data Engineer · Solutions Architect',
    prerequisites: [
      { label: 'DBMS', href: '/learn/dbms' },
      { label: 'Networking', href: '/learn/networking' },
      { label: 'Operating Systems', href: '/learn/operating-systems' },
    ],
    sections: [
      {
        id: 1, title: 'Foundations', blurb: 'Turn vague requirements into numbers and interfaces.',
        modules: [
          L(1, 'what-is-system-design', 'What Is System Design? Requirements, Constraints and Trade-offs', 'Functional and non-functional requirements, scale, latency and availability targets, and how to reason about trade-offs instead of memorising answers.', ['Requirements', 'Non-functional', 'Trade-offs'], '30 min'),
          L(2, 'back-of-envelope-estimation', 'Back-of-the-Envelope Estimation', 'Estimate traffic, storage, bandwidth and server counts from a few assumptions, with latency numbers every engineer should know.', ['QPS', 'Storage', 'Bandwidth', 'Latency numbers'], '30 min'),
          L(3, 'apis-and-service-communication', 'APIs and Service Communication — REST, gRPC, GraphQL and Webhooks', 'Design clean APIs, choose between REST, gRPC, GraphQL and webhooks, and handle pagination, versioning and idempotency.', ['REST', 'gRPC', 'GraphQL', 'Idempotency'], '35 min'),
        ],
      },
      {
        id: 2, title: 'Building Blocks', blurb: 'The components almost every large system is built from.',
        modules: [
          L(4, 'load-balancing-cdn', 'Load Balancing, Reverse Proxies and CDNs', 'Layer 4 and layer 7 load balancing, algorithms, health checks, reverse proxies, and serving static content from CDNs.', ['Load balancers', 'Algorithms', 'Reverse proxy', 'CDN'], '35 min'),
          L(5, 'caching-strategies', 'Caching — Strategies, Invalidation and Redis', 'Cache-aside, write-through and write-back, eviction policies, invalidation, stampedes, and using Redis well.', ['Cache-aside', 'Eviction', 'Invalidation', 'Redis'], '40 min'),
          L(6, 'databases-at-scale', 'Databases at Scale — Replication, Partitioning and Sharding', 'Choose SQL or NoSQL, scale reads with replicas, partition and shard data, and handle hot keys and rebalancing.', ['Replication', 'Sharding', 'Partitioning', 'SQL vs NoSQL'], '45 min'),
          L(7, 'message-queues-async', 'Message Queues and Asynchronous Processing', 'Decouple services with queues and event streams, background workers, delivery guarantees, retries and dead-letter queues.', ['Queues', 'Pub/sub', 'Workers', 'Dead-letter queues'], '35 min'),
          L(8, 'consistency-cap-consensus', 'Consistency, CAP and Consensus', 'Strong and eventual consistency, CAP and PACELC, quorums, leader election and what Raft solves.', ['CAP', 'PACELC', 'Quorums', 'Raft'], '40 min'),
        ],
      },
      {
        id: 3, title: 'Reliability & Design', blurb: 'Keep systems up and code well structured.',
        modules: [
          L(9, 'reliability-patterns-rate-limiting', 'Reliability Patterns — Timeouts, Retries, Circuit Breakers and Rate Limiting', 'Design for failure with timeouts, retries with backoff, circuit breakers, bulkheads, and token-bucket rate limiting.', ['Timeouts', 'Retries', 'Circuit breakers', 'Rate limiting'], '40 min'),
          L(10, 'monoliths-microservices', 'Monoliths, Microservices and Service Boundaries', 'When a modular monolith wins, how to split services by domain, and the data, deployment and observability costs of microservices.', ['Monolith', 'Microservices', 'Domain boundaries', 'Observability'], '35 min'),
          L(11, 'low-level-design', 'Low-Level Design — Classes, SOLID and Design Patterns', 'Model a problem with classes and interfaces, apply SOLID, and use common design patterns in a parking-lot style LLD question.', ['OOP design', 'SOLID', 'Design patterns', 'LLD'], '45 min'),
        ],
      },
      {
        id: 4, title: 'Case Studies & Interview', blurb: 'Apply the building blocks to real designs.',
        modules: [
          L(12, 'design-url-shortener', 'Case Study — Design a URL Shortener', 'Requirements, estimates, ID generation, storage, caching, analytics and scaling for a URL shortener.', ['Case study', 'ID generation', 'Caching', 'Analytics'], '45 min'),
          L(13, 'design-chat-notifications', 'Case Study — Design a Chat and Notification System', 'Real-time messaging with WebSockets, message storage, delivery receipts, presence, and push notifications at scale.', ['Case study', 'WebSockets', 'Fan-out', 'Notifications'], '50 min'),
          L(14, 'design-food-delivery', 'Case Study — Design a Food Delivery Platform', 'Restaurant search, ordering, payments, rider matching and live tracking for a food delivery app.', ['Case study', 'Geo search', 'Payments', 'Matching'], '50 min'),
          L(15, 'system-design-interview', 'System Design Interview — Framework and Practice Questions', 'A repeatable interview framework, how to communicate trade-offs, common mistakes, and practice questions with answer outlines.', ['Interview framework', 'Trade-offs', 'Practice questions'], '45 min'),
        ],
      },
    ],
  },
  {
    slug: 'ai-security',
    title: 'AI Security & LLM Security',
    area: 'security',
    cat: 'ai',
    icon: '🛡️',
    color: '#ef4444',
    description: 'Secure AI systems end to end: threat-model LLM apps, defend against prompt injection and data leakage, secure RAG, tools and agents, protect the model supply chain, red-team, monitor and govern.',
    roles: 'AI Security Engineer · Application Security Engineer · AI Engineer',
    prerequisites: [
      { label: 'Generative AI & LLM Engineering', href: '/learn/generative-ai' },
      { label: 'Cybersecurity foundations', href: '/learn/cybersecurity' },
    ],
    sections: [
      {
        id: 1, title: 'Threats to AI Systems', blurb: 'What attackers target in AI applications and how to model it.',
        modules: [
          L(1, 'ai-security-landscape', 'The AI Security Landscape — OWASP Top 10 for LLM Applications', 'Why AI systems create new attack surfaces, the OWASP Top 10 for LLM applications, and MITRE ATLAS as a map of real attacks.', ['OWASP LLM Top 10', 'MITRE ATLAS', 'Attack surface'], '35 min'),
          L(2, 'threat-modelling-ai-systems', 'Threat Modelling AI Systems', 'Map data flows, trust boundaries and assets in an LLM app, then apply STRIDE-style analysis to prompts, retrieval, tools and outputs.', ['Threat modelling', 'Trust boundaries', 'STRIDE', 'Data flows'], '40 min'),
          L(3, 'prompt-injection-jailbreaks', 'Prompt Injection and Jailbreaks — Direct and Indirect', 'How direct and indirect prompt injection and jailbreaks work, why there is no complete fix, and layered defences that reduce impact.', ['Direct injection', 'Indirect injection', 'Jailbreaks', 'Defence in depth'], '40 min'),
        ],
      },
      {
        id: 2, title: 'Securing AI Applications', blurb: 'Controls for data, retrieval, tools and models.',
        modules: [
          L(4, 'securing-rag-data-access', 'Securing RAG — Document Permissions and Data Leakage', 'Enforce per-user document permissions in retrieval, prevent cross-tenant leakage, and handle poisoned or untrusted documents.', ['Access control', 'Multi-tenancy', 'Data leakage', 'Untrusted content'], '40 min'),
          L(5, 'securing-tools-and-agents', 'Securing Tools and Agents — Excessive Agency and Sandboxing', 'Least-privilege tool design, confirmation for risky actions, sandboxed execution, and limiting what a compromised agent can do.', ['Excessive agency', 'Least privilege', 'Sandboxing', 'Approvals'], '40 min'),
          L(6, 'ai-privacy-output-handling', 'Sensitive Data, Privacy and Output Handling', 'Keep PII and secrets out of prompts, logs and training data, treat model output as untrusted input, and meet privacy obligations such as the DPDP Act.', ['PII', 'Output handling', 'Logging', 'Privacy law'], '35 min'),
          L(7, 'model-supply-chain-poisoning', 'Model Supply Chain and Data Poisoning', 'Risks in third-party models, datasets and packages, data and model poisoning, safe model formats, and verifying what you deploy.', ['Supply chain', 'Poisoning', 'Model formats', 'Provenance'], '35 min'),
        ],
      },
      {
        id: 3, title: 'Testing, Monitoring & Governance', blurb: 'Prove defences work and keep them working.',
        modules: [
          L(8, 'ai-red-teaming', 'AI Red Teaming and Security Testing', 'Plan an AI red-team exercise, build attack test suites, use automated scanners, and turn findings into regression tests.', ['Red teaming', 'Attack suites', 'Scanners', 'Regression tests'], '40 min'),
          L(9, 'ai-security-monitoring-governance', 'Monitoring, Incident Response and AI Governance', 'Detect abuse in production, respond to AI incidents, and apply governance frameworks such as the NIST AI RMF and the EU AI Act.', ['Monitoring', 'Incident response', 'NIST AI RMF', 'EU AI Act'], '40 min'),
          L(10, 'ai-security-interview-prep', 'AI Security Interview Prep', 'Prompt injection, RAG security, agent security and governance questions from AI security interviews, with model answers.', ['Interview', 'Threat scenarios', 'Model answers'], '40 min'),
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
