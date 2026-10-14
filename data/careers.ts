export const CAREERS_EMAIL = 'hello@chaduvuko.com'
export const CAREERS_POSTED = '10/13/2026'

export function careerApplyHref(title: string) {
  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Application — ${title}`)}`
}

export function getCareerRole(slug: string) {
  return CAREER_ROLES.find(role => role.slug === slug)
}

export const SERIES_DELIVERABLES = [
  'One clear learning objective, named prerequisites, a lesson outline, and supporting resources.',
  'Focused lessons: typically 8–15 minutes for concepts, 15–25 minutes for demos, and 15–30 minutes for project lessons. Split longer topics into logical parts.',
  'Clear spoken English, readable code and diagrams, clean audio, chapter times, and accurate English captions.',
  'Runnable source code and setup instructions for demos and projects, with practice tasks or assessments where relevant.',
  'Technical review, corrections, and agreed revisions before publishing.',
]

export const HIRING_STEPS = [
  {
    title: 'Apply and consent',
    body: 'Email your resume or professional profile, project links, a teaching sample if available, and consent to review these materials for this role.',
  },
  {
    title: 'Portfolio screening and teaching demo',
    body: 'We review your engineering work and ask for a short explanation of one relevant concept. An existing lesson or a simple screen recording is enough; a studio reel is not required.',
  },
  {
    title: 'Technical assessment or interview',
    body: 'Walk through an agent project, its architecture, failure cases, evaluation, and deployment choices. We also discuss how you would sequence the curriculum.',
  },
  {
    title: 'Paid pilot',
    body: 'We agree the scope, payment, and review criteria in writing before you create a pilot lesson or module. Substantial trial work is paid.',
  },
  {
    title: 'Quality review and selection',
    body: 'We assess technical accuracy, teaching clarity, code quality, and your response to feedback, then communicate the selection decision.',
  },
  {
    title: 'Written agreement and onboarding',
    body: 'Before the main engagement, we agree contractor or employee status, compensation, deliverables, milestones, revision limits, confidentiality, content ownership, and termination terms. Any relevant verification and onboarding follow.',
  },
]

export const CAREERS_ABOUT =
  'Chaduvuko is a practical learning platform built around structured lessons, hands-on demonstrations, real-world projects, and career preparation. Our Agentic AI track will help learners progress from the required Python and LLM foundations to building, evaluating, and deploying agent systems.'

export const CAREERS_PAY =
  'Course and module contracts use agreed milestone payments. Part-time compensation depends on the scope and time commitment. Final compensation and engagement terms are confirmed in writing before work begins. There are no recruitment fees, required purchases, or paid subscriptions to apply.'

export type CareerTrack = {
  href: string
  label: string
}

export type CareerRole = {
  slug: string
  title: string
  subject: string
  team: string
  location: string
  employment: string
  experience: string
  compensation: string
  summary: string
  learner: string
  assignment: string[]
  track: CareerTrack | null
  make: string[]
  boundaries: string[]
  bring: string[]
  preferred: string[]
  expectations: string[]
  application: string[]
}

export const CAREER_ROLES: CareerRole[] = [
  {
    slug: 'agentic-ai',
    title: 'Agentic AI Engineer & Technical Instructor',
    subject: 'Agentic AI & Automation',
    team: 'Learning & Content',
    location: 'Remote — India',
    employment: 'Contract / Part-Time / Full-Time. A course or module contract is preferred for the initial engagement.',
    experience: '3–7+ years of relevant software, AI/ML, or related engineering experience. Agentic AI expertise is assessed through real projects and practical demonstrations.',
    compensation: 'Indicative full-time budget: ₹60,000–₹1,20,000 per month, depending on experience and the agreed scope. This is a planning range; final terms are agreed before the engagement.',
    summary:
      'Own the Agentic AI curriculum and teach learners to build reliable LLM-powered agents. Combine engineering, curriculum design, clear English instruction, live coding, and real-world projects for the Chaduvuko learning platform and YouTube channel.',
    learner:
      'A developer progressing from Python, APIs, and LLM fundamentals into agent engineering. This is an advanced path: prerequisite lessons come before orchestration, multi-agent systems, and production deployment.',
    assignment: [
      'Design a curriculum with clear prerequisites, levels, modules, lesson objectives, practice, projects, and assessments. Get the full curriculum approved before recording begins.',
      'Create scripts, technical explanations, live coding demos, and project walkthroughs in clear English. Own the lesson sequence and explain engineering decisions as you build.',
      'Build and maintain runnable examples, source repositories, assignments, quizzes, and learner resources.',
      'Show debugging and failure scenarios, evaluation, security, deployment, monitoring, and cost tradeoffs alongside the working implementation.',
      'Collaborate with technical reviewers and editors, address review feedback, and revise lessons and code before publishing.',
    ],
    track: null,
    make: [
      'Prerequisites and foundations: Python, APIs, LLM concepts, prompt engineering, tool/function calling, and structured outputs.',
      'Retrieval-augmented generation (RAG), embeddings, and vector databases, including retrieval quality and grounding.',
      'Agent state, memory, planning, workflow control, and human-in-the-loop decisions.',
      'LangGraph or a comparable orchestration framework, Model Context Protocol (MCP), and multi-agent collaboration where it serves the task.',
      'Testing, evaluation datasets, tracing, observability, guardrails, and security, including tool permissions and prompt-injection risks.',
      'Deployment, monitoring, latency, reliability, and cost management for real applications.',
      'End-to-end projects learners can rebuild, such as a retrieval assistant or a tool-using workflow, with source code, exercises, and assessments.',
    ],
    boundaries: [],
    bring: [
      'Strong Python and API engineering skills, with LLM-powered applications or agent projects you can demonstrate and explain.',
      'Hands-on understanding of tool calling, structured outputs, RAG, vector databases, and agent orchestration using LangGraph or a comparable framework.',
      'Ability to reason about agent state, memory, planning, human review, and the tradeoffs of multi-agent designs.',
      'Experience testing, evaluating, debugging, and deploying applications, with practical attention to security, reliability, and cost.',
      'Ability to teach in clear English, sequence prerequisites, explain code and architecture, and record readable demonstrations with clear audio.',
      'A professional profile, portfolio, or project walkthrough that shows your engineering contribution. Demonstrable work matters more than an arbitrary number of years in Agentic AI.',
    ],
    preferred: [
      'Production agent or RAG applications with evaluation, tracing, monitoring, and measurable improvements.',
      'MCP integrations, multi-agent workflows, or LLMOps experience.',
      'Prior teaching, workshops, technical writing, or educational videos.',
      'Public repositories or technical write-ups, and experience collaborating with reviewers or editors.',
    ],
    expectations: [
      'Deliver the approved curriculum and milestones reliably. Lesson count follows prerequisites and scope rather than a fixed video quota.',
      'Keep explanations accurate, code reproducible, and projects practical; incorporate agreed review feedback and revisions.',
      'Evaluate success through teaching clarity, curriculum completeness, project quality, delivery reliability, and learner engagement. YouTube views are one signal, not the sole measure.',
    ],
    application: [
      'Email your resume or professional profile and links to relevant agent, RAG, or LLM application projects. Explain your own contribution and one engineering decision.',
      'Include a teaching sample if you have one, or say which concept you would demonstrate in the teaching stage.',
      'State your availability, preferred engagement type, expected compensation, and ability to record clear English lessons.',
      'Include a short note confirming that Chaduvuko may review your application materials for recruitment for this role.',
    ],
  },
]
