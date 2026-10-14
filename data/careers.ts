export const CAREERS_EMAIL = 'hello@chaduvuko.com'
export const CAREERS_POSTED = 'October 13, 2026'

export function careerApplyHref(title: string) {
  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Application — ${title}`)}`
}

export function getCareerRole(slug: string) {
  return CAREER_ROLES.find(role => role.slug === slug) ?? null
}

/** How Chaduvuko hires for instructor roles. Candidate-facing, in order. */
export const HIRING_STEPS: { title: string; body: string }[] = [
  {
    title: 'Application review',
    body: 'We review your professional background, projects, portfolio, GitHub, and any relevant technical content.',
  },
  {
    title: 'Technical conversation',
    body: 'We discuss one or more systems you have built — architecture, trade-offs, failures, evaluation, security, deployment, and your personal contribution.',
  },
  {
    title: 'Teaching demonstration',
    body: 'You explain a relevant concept in a short technical demonstration. An existing video is fine; a studio-quality recording is not required.',
  },
  {
    title: 'Paid pilot',
    body: 'Shortlisted candidates may complete a small pilot lesson or module. Scope, payment, deliverables, and review criteria are agreed in writing before any substantial trial work begins.',
  },
  {
    title: 'Final review',
    body: 'We assess technical accuracy, teaching clarity, engineering depth, code quality, communication, and responsiveness to feedback.',
  },
  {
    title: 'Agreement and onboarding',
    body: 'Before the main engagement begins we confirm engagement type, compensation, scope, milestones, deliverables, revision expectations, confidentiality, content ownership, and termination terms.',
  },
]

export type TeachSection = { heading: string; items: string[] }

export type CareerRole = {
  slug: string
  title: string
  subject: string
  team: string
  location: string
  employment: string
  experience: string
  language: string
  compensation: string
  summary: string
  intro: string[]
  own: { lead: string; items: string[]; close: string }
  teach: { lead: string; sections: TeachSection[] }
  looking: {
    lead: string
    required: string[]
    reasoning: string[]
    teachingLead: string
    teaching: string[]
    teachingNote: string
    preferredLead: string
    preferred: string[]
    preferredNote: string
    philosophy: string[]
  }
  standards: { items: string[]; durations: string[]; note: string }
  success: { items: string[]; note: string }
  compensationDetail: string[]
  application: { lead: string; items: string[]; note: string }
}

export const CAREER_ROLES: CareerRole[] = [
  {
    slug: 'agentic-ai',
    title: 'Agentic AI Engineer & Technical Instructor',
    subject: 'Agentic AI & Automation',
    team: 'Learning & Content',
    location: 'Remote — India',
    employment: 'Contract / Part-Time / Full-Time',
    experience: '3–7+ years of relevant software, AI/ML, or related engineering experience',
    language: 'Professional spoken English',
    compensation: '₹60,000–₹1,20,000/month for suitable full-time engagements, or milestone-based compensation for course and module contracts',
    summary:
      'Design, build, debug, evaluate, and teach modern AI agent systems — and turn that expertise into a structured learning journey from strong foundations to production-ready implementations. You will help define and own Chaduvuko’s Agentic AI & Automation track across the learning platform and YouTube channel.',
    intro: [
      'Chaduvuko is looking for an Agentic AI Engineer & Technical Instructor who can do more than explain frameworks. We want someone who can design, build, debug, evaluate, and teach modern AI agent systems — and turn that expertise into a structured learning journey that takes learners from strong foundations to production-ready implementations.',
      'This role combines AI engineering, curriculum design, technical teaching, live coding, and educational content creation. You will help define and own Chaduvuko’s Agentic AI & Automation track across our learning platform and YouTube channel.',
      'This is not a traditional classroom trainer role. You should be comfortable answering both “How do we build this?” and “Why should we design it this way?”',
    ],
    own: {
      lead: 'You will take ownership of the Agentic AI curriculum from architecture through delivery. Your work will include:',
      items: [
        'Designing a complete beginner-to-advanced Agentic AI learning roadmap.',
        'Defining prerequisites, modules, lesson objectives, projects, practice exercises, and assessments.',
        'Ensuring foundational concepts are taught before advanced orchestration and production topics.',
        'Creating clear English technical lessons, demonstrations, diagrams, and live-coding walkthroughs.',
        'Building realistic agent systems learners can reproduce independently.',
        'Creating and maintaining source repositories, setup instructions, exercises, assignments, and supporting material.',
        'Teaching not only successful implementations, but also failure cases, debugging, trade-offs, and architectural decisions.',
        'Working with Chaduvuko’s technical reviewers and editors before content is published, and maintaining technical accuracy as tools and frameworks evolve.',
      ],
      close: 'The complete curriculum will be reviewed and approved before production begins.',
    },
    teach: {
      lead: 'The track will progress from essential foundations into production-level agent engineering.',
      sections: [
        {
          heading: 'Foundations',
          items: [
            'Python for AI applications',
            'APIs and JSON',
            'LLM fundamentals',
            'Prompt engineering',
            'Structured outputs',
            'Function and tool calling',
            'Basic AI application architecture',
          ],
        },
        {
          heading: 'Retrieval and knowledge systems',
          items: [
            'Embeddings and vector databases',
            'Semantic search',
            'Retrieval-Augmented Generation (RAG)',
            'Retrieval quality, chunking, and indexing strategies',
            'Grounding and hallucination reduction',
            'Agentic RAG architectures',
          ],
        },
        {
          heading: 'Agent engineering',
          items: [
            'Agent loops and state management',
            'Short-term and long-term memory',
            'Planning, tool selection, and workflow control',
            'Error handling, retries, and conditional routing',
            'Human-in-the-loop approval',
            'Long-running workflows',
          ],
        },
        {
          heading: 'Agent frameworks and orchestration',
          items: [
            'LangGraph, LangChain, LlamaIndex, Semantic Kernel, or comparable frameworks',
            'The underlying engineering principles — the course must not depend on a single library',
          ],
        },
        {
          heading: 'Model Context Protocol (MCP)',
          items: [
            'MCP architecture: clients, servers, tools, resources, and prompts',
            'Building MCP servers and connecting agents to external systems',
            'Authentication, permissions, and secure MCP usage',
          ],
        },
        {
          heading: 'Multi-agent systems',
          items: [
            'Supervisor/worker patterns, delegation, and routing',
            'Specialized agents, shared state, and agent communication',
            'Coordination and failure recovery',
            'When not to use a multi-agent architecture',
          ],
        },
        {
          heading: 'Production AI engineering',
          items: [
            'Agent evaluation, evaluation datasets, and regression testing',
            'Tracing, observability, and monitoring',
            'Guardrails, prompt-injection risks, tool permissions, and authentication',
            'Data privacy and security boundaries',
            'Latency, model selection, cost optimization, reliability, and deployment',
          ],
        },
        {
          heading: 'Real-world projects',
          items: [
            'An AI research assistant or retrieval-based knowledge assistant',
            'A customer-support or data-analysis agent',
            'Tool-using workflow automation and MCP-enabled assistants',
            'A human-in-the-loop business workflow or multi-agent application',
            'Each with architecture, implementation, testing, debugging, evaluation, security, and deployment where appropriate',
          ],
        },
      ],
    },
    looking: {
      lead: 'You should have strong hands-on experience building modern AI applications and be able to explain your engineering decisions clearly.',
      required: [
        'Strong Python programming and REST/API integration',
        'LLM application development, tool/function calling, and structured outputs',
        'RAG, embeddings, and vector databases',
        'Agent orchestration and application architecture',
        'Debugging, testing, and evaluation',
        'Git and GitHub, and deployment fundamentals',
      ],
      reasoning: [
        'Agent state, memory, and planning',
        'Tool permissions and human review',
        'Reliability, security, and cost',
        'Multi-agent trade-offs',
      ],
      teachingLead: 'Technical depth alone is not enough. You should be able to:',
      teaching: [
        'Explain difficult concepts in clear English, and teach a beginner without oversimplifying the engineering.',
        'Sequence concepts logically and explain code while writing it.',
        'Use diagrams where architecture matters, and demonstrate failures and debugging.',
        'Connect individual concepts into complete systems.',
        'Record clear screen demonstrations with readable code and clean audio.',
      ],
      teachingNote: 'Previous teaching experience is valuable, but not mandatory if you can demonstrate strong communication ability.',
      preferredLead: 'We would especially value candidates with experience in:',
      preferred: [
        'LangGraph or similar orchestration frameworks, and MCP integrations',
        'Production RAG applications, multi-agent systems, and LLMOps',
        'AI evaluation, tracing, and observability',
        'Cloud deployment, Docker, FastAPI, and CI/CD',
        'AI application security',
        'Technical writing, workshops, mentoring, or YouTube / online-course creation',
      ],
      preferredNote: 'Public repositories, technical write-ups, and working applications are strong signals.',
      philosophy: [
        'We generally expect 3–7+ years of relevant engineering experience, but we do not require a specific number of years working in “Agentic AI.” The field is evolving too quickly for that to be a useful filter.',
        'We care more about what you have built, how well you understand it, how you reason about architecture, and how clearly you can teach it. Strong candidates with less traditional experience but exceptional Agentic AI work are encouraged to apply.',
      ],
    },
    standards: {
      items: [
        'A clear learning objective and defined prerequisites',
        'A structured lesson outline and supporting resources',
        'Runnable code where applicable, with setup instructions',
        'Practice or assessment where relevant',
      ],
      durations: [
        'Concept lessons: 8–15 minutes',
        'Technical demonstrations: 15–25 minutes',
        'Project lessons: 15–30 minutes',
      ],
      note: 'Long topics should be divided into logical lessons rather than compressed into oversized videos. Lesson count follows the curriculum and learning dependencies, not an arbitrary video quota.',
    },
    success: {
      items: [
        'Learners can follow the track without prerequisite gaps.',
        'Code examples work and can be reproduced.',
        'Projects reflect realistic engineering scenarios, and architecture decisions are explained clearly.',
        'Lessons remain technically accurate, and content is delivered according to agreed milestones.',
        'Review feedback is incorporated professionally.',
        'Learners progressively move from understanding concepts to building complete systems.',
      ],
      note: 'YouTube views are useful, but they are not the sole measure of instructor performance.',
    },
    compensationDetail: [
      'For suitable full-time engagements, Chaduvuko currently expects a compensation range of approximately ₹60,000–₹1,20,000 per month. Final compensation depends on technical depth, teaching ability, experience, responsibilities, and scope.',
      'We may also engage instructors through course-based, module-based, part-time, or milestone-based agreements. Contract compensation is agreed against the approved scope before work begins.',
      'There are no recruitment fees, required purchases, or paid subscriptions to apply.',
    ],
    application: {
      lead: 'Use the subject “Application — Agentic AI Engineer & Technical Instructor” and include:',
      items: [
        'Your resume or professional profile.',
        'Relevant Agentic AI / RAG / LLM project links, and GitHub or portfolio where available.',
        'A brief description of your contribution to at least one project.',
        'Your preferred engagement type, availability, and expected compensation.',
        'A teaching sample, technical video, workshop recording, or technical article if you have one — this is not required to apply.',
      ],
      note: 'Please submit only information relevant to the position. Do not send identity documents, bank information, or other unnecessary sensitive records during the initial application stage. Application information is used for recruitment and candidate evaluation for this role. Questions go to hello@chaduvuko.com.',
    },
  },
]
