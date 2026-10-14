# AGENTS.md — Chaduvuko

## Project identity

**Project:** Chaduvuko  
**Website:** https://chaduvuko.com  
**Careers:** https://chaduvuko.com/careers  
**Tagline:** **LEARN. BUILD. GROW.**

Chaduvuko is the primary EdTech umbrella project for this repository.

Keep Chaduvuko separate from unrelated projects, especially:
- StudyX Overseas
- Personal job-search/resume work
- Personal finance/investment work
- Immigration/legal personal workflows
- Unrelated client or business projects

---

## Source of truth

Before making major product, architecture, curriculum, careers, branding, hiring, compliance, or content decisions, read:

- `docs/chaduvuko/PROJECT_MASTER_CONTEXT.md`
- `docs/chaduvuko/PROJECT_HISTORY.md`

When relevant, also read:

- `docs/chaduvuko/ASSET_INDEX.md`
- `docs/chaduvuko/LEARNING_ARCHITECTURE.md`
- `docs/chaduvuko/CAREERS_AND_HIRING.md`
- `docs/chaduvuko/CONTENT_STRATEGY.md`
- `docs/chaduvuko/COMPLIANCE_AND_PRIVACY.md`
- `docs/chaduvuko/GENERATIVE_AI_TRACK.md`
- `docs/chaduvuko/AGENTIC_AI_TRACK.md`
- `docs/chaduvuko/PIPELINE_PREP.md`

If a listed file does not exist yet, do not invent its contents. Use the existing source-of-truth files and create new documentation only when explicitly requested or clearly necessary.

---

## Branding rules

Use the official Chaduvuko logo stored at:

`public/brand/chaduvuko-logo.png`

Do not:
- Redraw the Chaduvuko logo
- Fabricate a replacement logo
- Substitute a generic logo
- Change the brand name styling without approval

Visual identity:
- Navy
- Green
- Teal
- Clean educational / technology aesthetic
- Professional SaaS-style interface
- Accessible contrast
- Modern but not visually noisy

Official tagline:

**LEARN. BUILD. GROW.**

When producing posters, social graphics, careers materials, presentations, or landing pages, preserve the official branding unless the user explicitly requests a rebrand.

---

## Product philosophy

Chaduvuko should be practical, structured, progressive, and career-relevant.

Core principles:
- Teach prerequisites before advanced concepts
- Use dependency-aware learning paths
- Prefer practical demonstrations over theory-only content
- Include real-world projects
- Include debugging and failure scenarios
- Include production considerations
- Include career/interview preparation where appropriate
- Avoid random topic ordering
- Avoid unnecessarily long lessons
- Avoid shallow “copy this code” teaching without explanation

---

## Standard learning architecture

Use this hierarchy:

**Domain → Track → Level → Module → Lesson → Practice → Project → Assessment → Next Level**

Standard levels:

0. Prerequisites
1. Foundations
2. Core Skills
3. Advanced / Production
4. Real-World Engineering Projects
5. Career / Interview Preparation

Do not introduce an advanced topic before its required foundations are covered.

Reference roadmap-style dependency thinking similar to roadmap.sh, but convert roadmaps into a teachable curriculum rather than copying topic lists.

---

## Lesson design rules

Default lesson design:

- One video = one clear learning objective
- Concept lesson target: 8–15 minutes
- Hands-on demo target: 15–25 minutes
- Project lesson target: 15–30 minutes
- Split long topics into logical sub-lessons
- Let curriculum dependency determine total lesson count
- Do not force every course into an arbitrary 60- or 70-video target
- Approve the full curriculum before recording starts

Every lesson should ideally define:
- Prerequisites
- Learning objective
- Theory / demo / project classification
- Target duration
- Supporting resources
- Practice or assessment where relevant

---

## Curriculum production workflow

Use this standard flow:

**Research → Reference Roadmaps → Dependency Mapping → Curriculum → Module Design → Lesson Breakdown → Learning Objectives → Script/Demo → Technical Review → Record → Edit → Captions → QA → Publish → Analytics → Improve**

For curriculum-management data, prefer fields such as:

`Lesson ID | Level | Module | Lesson | Prerequisites | Learning Objective | Type | Target Duration | Resources | Instructor | Script Status | Recording Status | QA Status | Publish Status`

---

## Priority learning tracks

Current high-priority tracks include:

1. Generative AI & LLM Engineering
2. Agentic AI & Automation
3. Python Programming & AI Development
4. Data Engineering & Big Data
5. Cybersecurity & AI Security
6. Cloud Computing — AWS / Azure / GCP
7. Full-Stack Development with AI
8. DevOps / Kubernetes / MLOps
9. Machine Learning & Deep Learning
10. DSA & Software Engineering Interviews

Additional areas:
- Java
- JavaScript
- SQL & Databases
- Mathematics
- Physics
- Data Engineering specialization
- AI/ML specialization
- Cloud/DevOps specialization

---

## YouTube and content strategy

Chaduvuko should build complete learning journeys, not disconnected videos.

Preferred structure:

**Foundations → Core Concepts → Intermediate Implementation → Advanced / Production → Real-World Projects → Career / Interview Preparation**

Content language:
- English-first
- Clear international English
- Accurate English captions
- Multilingual subtitles may be added based on actual audience demand

Do not optimize only for views. Also consider:
- Audience retention
- Returning viewers
- Playlist progression
- Subscriber conversion
- Website traffic
- Practice engagement
- Project completion
- Cost per published lesson

---

## Instructor hiring model

For early-stage Chaduvuko, default to:

- One strong lead instructor per track
- Paid pilot lesson/module before a major engagement
- Course-based or milestone-based contract first
- Technical reviewer where quality risk is high
- Specialist guest instructors only for narrow advanced modules
- Full-time or monthly retainer only after recurring workload is proven

Do not assume one instructor must know every possible subtopic in extreme depth. Maintain one accountable lead and add specialists only when needed.

---

## Standard hiring flow

Use:

**Application → Candidate Privacy Consent → Resume/Portfolio Screening → Teaching Demo → Technical Assessment / Interview → Paid Pilot → Quality Review → Selection → Written Contract / Offer → Verification → Onboarding → Course Production → Technical QA → Publishing → Performance Review**

Recruitment principles:
- No recruitment fees
- Clear selection stages
- Job-related assessments
- Paid substantial trial assignments
- Written compensation terms
- Written deliverables
- Clear employee vs contractor status
- Respect candidate privacy
- Limit access to applicant data
- Avoid collecting unnecessary sensitive data during initial screening

---

## Instructor performance criteria

Do not judge instructors only by YouTube views.

Evaluate:
- Technical accuracy
- Teaching clarity
- Curriculum completeness
- Code quality
- Project quality
- Practical usefulness
- Delivery reliability
- Milestone adherence
- Responsiveness to review feedback
- Learner engagement and retention where available

---

## Generative AI track context

The Generative AI track should progressively cover:

- AI / ML prerequisites
- Python prerequisites
- NLP fundamentals
- Transformer fundamentals
- LLM concepts
- Prompt engineering
- Model APIs
- Embeddings
- Vector databases
- RAG
- AI agents
- Evaluation
- Responsible AI
- Security
- Deployment
- Monitoring
- Cost optimization
- Real-world projects

Preferred staffing:
- Lead Generative AI Instructor & Technical Content Creator
- Part-time Generative AI Curriculum & Technical Reviewer
- Specialist contributors only when advanced modules require them

---

## Agentic AI track context

The Agentic AI track should be treated as an advanced path.

Primary role:
**Agentic AI Engineer & Technical Instructor**

Core topics:
- Python
- APIs
- LLMs
- Prompt engineering
- Tool/function calling
- Structured outputs
- RAG
- Vector databases
- Agent state
- Memory
- Planning
- Human-in-the-loop
- LangGraph / comparable orchestration frameworks
- MCP
- Multi-agent systems
- Evaluation
- Testing
- Observability
- Tracing
- Guardrails
- Security
- Cost management
- Deployment
- Real-world projects

Do not require unrealistic “years of Agentic AI experience.” Evaluate real projects, engineering depth, architecture knowledge, teaching ability, and practical demonstrations.

Current careers URL:

`https://chaduvuko.com/careers`

---

## Pipeline Prep

Pipeline Prep is a Chaduvuko sub-project.

It includes:
- SQL practice
- Pipeline debugging/reliability challenges
- System design practice
- Foundation-to-advanced progression
- Free and Pro content
- Practice-first positioning

Treat Pipeline Prep as part of Chaduvuko, not as a separate unrelated brand.

---

## Website / engineering rules

Before modifying the application:

1. Inspect the current architecture
2. Read existing relevant code before rewriting
3. Preserve working functionality
4. Avoid unnecessary dependencies
5. Prefer reusable components
6. Keep UI responsive
7. Maintain accessibility
8. Avoid introducing hydration errors
9. Run lint/build/tests where available
10. Report what changed

When debugging:
- Find the root cause
- Do not patch symptoms blindly
- Explain major architectural changes briefly
- Preserve current working behavior unless change is intentional

---

## UI/UX direction

Preferred interface:
- Professional SaaS learning platform
- Clean hierarchy
- Strong typography
- Responsive desktop/mobile layouts
- Accessible interactions
- Clear progress indication
- Structured learning navigation
- Minimal clutter
- Practical dashboards where useful

Avoid:
- Excessive gradients
- Over-animation
- Generic template appearance
- Dense walls of text
- Unclear navigation
- Random component styling

---

## Careers page rules

Job postings should generally include:

- Job title
- Job ID where useful
- Department
- Location
- Employment type
- Experience
- Compensation or compensation model
- Role overview
- Responsibilities
- Required skills
- Preferred skills
- Minimum qualifications
- Preferred qualifications
- Expected deliverables
- Performance expectations
- Selection process
- Application instructions
- Privacy / recruitment transparency notes

For instructor roles, explicitly describe:
- Curriculum ownership
- Content creation
- Lesson recording
- Hands-on demos
- Projects
- Assessments
- Technical review
- Revision expectations

---

## Compliance / payroll / privacy

The user wants India- and Andhra Pradesh-focused operational compliance.

Before publishing specific legal, payroll, tax, employment, contractor, privacy, or statutory claims:
- Verify current law
- Distinguish employee vs contractor
- Avoid presenting assumptions as legal fact
- Prefer transparent written agreements
- Define IP ownership
- Define confidentiality
- Define payment milestones
- Define revision limits
- Define termination terms
- Define candidate-data handling

Do not fabricate legal requirements.

---

## Coding behavior

When asked to implement changes:
- Inspect first
- Make the smallest correct change
- Avoid deleting useful code without reason
- Keep code modular
- Keep naming consistent
- Reuse existing components/utilities where appropriate
- Add comments only where they clarify non-obvious behavior
- Run validation commands when possible

When asked for a large feature:
1. Understand current architecture
2. Plan dependencies
3. Implement incrementally
4. Validate each layer
5. Run build/tests
6. Summarize results

---

## Documentation behavior

Keep durable project decisions in repository documentation.

If a decision materially changes:
- Architecture
- Curriculum model
- Branding
- Hiring model
- Compliance approach
- Product strategy

then update the relevant `docs/chaduvuko/` source-of-truth file when requested or when maintaining project documentation is part of the task.

Do not rely on chat history as the only source of truth.

---

## Important separation rules

Never mix into Chaduvuko unless explicitly requested:
- StudyX Overseas
- Personal immigration matters
- Personal health information
- Personal investment information
- Personal resume / job-search details
- Unrelated client projects

---

## Final operating principle

When uncertain, optimize for:

**Clear prerequisites → practical learning → real-world implementation → production awareness → learner progression → maintainable product architecture.**
