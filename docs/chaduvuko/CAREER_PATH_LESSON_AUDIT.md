# Career path lesson audit — November 9, 2026

Scope: every milestone in the 10 career paths (`data/career-paths.ts`), judged on lesson **titles, order, and module placement** only. Lesson content was not reviewed.

Gaps were confirmed by searching all 490 live lesson titles (for example: no live lesson mentions vector databases, Spark, Airflow, PyTorch, Docker basics, Git outside Data Engineering, Kubernetes, Terraform, JavaScript, React, statistics, or operating systems).

Severity: **P0** blocks the path's promise · **P1** expected by employers · **P2** polish.

---

## 1. Cross-cutting findings

| # | Finding | Severity | Affects |
|---|---|---|---|
| X1 | **Git is only taught inside Data Engineering.** No path except Data Engineer teaches version control, yet every job needs it. Add a short shared "Git & GitHub" module (or track) and reference it from every path. | P0 | 9 paths |
| X2 | **Linux / command line is missing from Cloud & DevOps, Software Engineer, ML Engineer, AI Engineer.** Only DE and Cybersecurity have Linux lessons. | P0 | 4 paths |
| X3 | **Docker has no beginner lesson.** It appears only inside "Model Deployment — FastAPI, Docker, K8s". | P1 | AI, ML, DE, DevOps, Full-stack |
| X4 | **"Advanced Python" is excluded from AI paths.** The AI Engineer and Agentic AI Python milestone stops at lesson 31, skipping async/await, type hints, working with APIs, and pytest — the exact skills LLM apps need. *Config-only fix:* add `'Advanced Python'` to their Python `sections`. | P0 | AI Engineer, Agentic AI |
| X5 | **Duplicate intros across tracks.** Each track re-teaches its own "Python for X", "Linux for X", "Networking deep dive", "SQL — complete guide". Inside one path the learner meets the same topic 2–3 times (see per-path notes). Mark these as "skip if you finished milestone N" or drop them from the path via `sections`. | P1 | DE, Cybersecurity, Software Engineer |
| X6 | **Several tracks have no interview lesson** (Networking, DSA, Cloud Data Platforms) while others do. | P2 | Networking, DSA, Cloud |
| X7 | **US-market lessons on an India-first site:** "Researching the US Data Engineering Job Market (2026)", "Cybersecurity Career Paths and the US Job Market (2026)". Add an India market version or make them region-neutral. | P2 | DE, Cybersecurity |

---

## 2. AI & Machine Learning track ordering (affects 4 paths)

The `ai-ml` track's order breaks prerequisites:

- **RAG (52), Prompt Engineering (53), and LLM Agents (54) sit in "Natural Language Processing", before "What is Generative AI?" (60) and "LLMs — Pretraining, RLHF" (64).** Learners build RAG before learning what an LLM is.
- **Prompt Engineering comes after RAG.** It should come first.
- **"LLM Agents and Tool Use" (54) and "Agents and Tool Use" (70) duplicate each other.**
- **"Generative AI" mixes image models (GANs, VAEs, Diffusion) with LLM app work.** The AI Security path pulls this whole module for "How AI and LLMs work" and gets GANs/VAEs but *not* basic RAG or prompt engineering.
- "Python for Machine Learning" (10) repeats the Python milestone.

**Recommended module order:** NLP basics (tokenisation, embeddings, BERT) → LLM fundamentals (pretraining, context windows, inference parameters) → Prompt engineering → RAG → Advanced RAG → Agents (one lesson) → Fine-tuning (PEFT/LoRA + practice) → Multimodal → Image generation (GANs, VAEs, Diffusion) as its own module.

---

## 3. Per-path findings

### AI Engineer (128 lessons, 7 milestones)

**Structure issues**
- M1 skips Advanced Python (see X4).
- M3 "How machine learning works" is 34 lessons of maths + classical ML (eigenvectors, SVMs, LightGBM) for a path that says "not train models from scratch". Trim to a lighter subset or mark as optional depth.
- M4/M5 inherit the ordering problem in §2.

**Missing lessons/topics (none exist in the catalog today)**
| Topic | Severity |
|---|---|
| Calling LLM APIs (OpenAI / Anthropic / Gemini SDKs), streaming responses, tokens & pricing | P0 |
| Embeddings in practice + **vector databases** (pgvector, Pinecone, Chroma, FAISS) | P0 |
| Structured outputs & **function / tool calling** | P0 |
| **LLM evaluation** (eval sets, LLM-as-judge, RAG metrics) | P0 |
| Guardrails, prompt injection basics, PII handling | P1 |
| LLM app frameworks (LangChain / LlamaIndex) — when to use and when not | P1 |
| Observability & tracing for LLM apps (LangSmith / Langfuse / OpenTelemetry) | P1 |
| Cost & latency optimisation (caching, batching, model routing) | P1 |
| Serving an AI feature: FastAPI backend + simple chat UI | P1 |
| Pydantic & data validation | P1 |
| Git, Docker basics (X1, X3) | P0/P1 |

Most of these belong in the planned **Generative AI & LLM Engineering** track (M7). Until it ships, the path has no hands-on LLM-application content beyond 3 RAG/agent lessons.

### Agentic AI Engineer (50 live lessons, 3 of 6 milestones planned)

- M1 skips Advanced Python (X4) — asyncio and APIs are essential for agents.
- M2 "How AI and LLMs work" (Introduction + NLP) gives tokenisation/BERT/LoRA but no LLM fundamentals (pretraining, context windows, inference parameters — those are in "Generative AI").
- **Missing (P0):** tool/function calling, structured outputs, agent state & memory, planning/ReAct loops, human-in-the-loop, **LangGraph** or equivalent orchestration, **MCP**, multi-agent patterns, agent evaluation & tracing, sandboxing/permissions. All are in the planned Agentic AI track; nothing live today.
- Only 2 overview lessons on agents exist (and they duplicate each other).

### Machine Learning Engineer (128 lessons, 7 milestones)

**Missing**
| Topic | Severity |
|---|---|
| **PyTorch fundamentals** (tensors, autograd, training loop, DataLoader) — no framework lesson exists | P0 |
| Statistics for ML: sampling, hypothesis tests, confidence intervals, **A/B testing** | P0 |
| Imbalanced data (class weights, SMOTE, threshold tuning) | P1 |
| Time-series forecasting | P1 |
| Recommender systems | P1 |
| Model serving & optimisation (batching, ONNX, quantisation, GPU basics) | P1 |
| Distributed / GPU training basics | P2 |
| Linux, Git, Docker basics (X1–X3) | P0/P1 |

- "ML Interview Prep" sits inside the "Cloud ML Platforms" module; move it to its own career module.

### Data Engineer (217 lessons, 8 milestones)

**Structure issues**
- Triple coverage of the same intros: "What is Data Engineering?" (M1) **and** "What is Data Engineering?" (M4 lesson 6); "SQL for Data Engineers" (M1) + 62-lesson SQL (M2) + "SQL for Data Engineers — Beyond the Basics" (M4); "Python for Data Engineers" (M1) + Python (M3) + "Python for Data Engineering" (M4). ACID is taught in SQL, DE, and DBMS.
- Streaming lessons ("Streaming Data — What It Is", "Message Brokers and Queues") sit in "Quality, Governance & Production"; they belong in "How Data Moves", before the Kafka milestone.
- M8 covers only AWS; fine, but say Azure/GCP modules are alternatives.

**Missing**
| Topic | Severity |
|---|---|
| **Apache Spark / PySpark** (DataFrames, partitions, shuffles, joins, tuning) — no lesson exists | P0 |
| **Airflow (or Dagster) hands-on** — only a conceptual "What a Scheduler Does" lesson | P0 |
| Docker for data pipelines | P1 |
| Open table formats: **Delta Lake / Apache Iceberg** | P1 |
| Databricks platform (only "Azure Databricks" exists) | P1 |
| Data contracts | P2 |
| End-to-end DE capstone project lesson | P1 |

### Analytics Engineer & Data Analyst (120 live lessons, 2 of 6 milestones planned)

- Python milestone stops at lesson 18 and **misses "Intro to NumPy and pandas"** (lesson 43, in "Production & Career Readiness").
- **Quick win:** add a milestone using existing lessons — DE "Storage & Architecture" (dimensional modelling, star schema, SCDs) and AI-ML "Programming Ecosystem" (pandas, visualisation).
- **Missing:** statistics for analysts, A/B testing, metric/KPI design, data visualisation & storytelling, Excel/Google Sheets, a BI tool (Power BI / Looker / Tableau — planned), semantic layer / dbt metrics. P0 for statistics and visualisation.

### Full-Stack Developer (AI-enabled) (94 live lessons, 2 of 6 milestones planned)

- **The path cannot produce a full-stack developer today.** JavaScript/TypeScript and Full-Stack-with-AI are both planned; there is no JavaScript, React, Node, or API lesson live.
- **Missing (P0):** JavaScript, TypeScript, DOM & fetch, React (or Next.js), a backend framework (FastAPI or Node/Express), REST API design, authentication & sessions, Git, deployment.
- M5 uses DBMS theory (normalisation, functional dependencies) where a developer needs practical schema design + an ORM. Consider SQL "Database Design" section instead.
- Recommend: prioritise the JavaScript & TypeScript track; until then label this path "early".

### Cloud & DevOps Engineer (70 live lessons, 2 of 6 milestones planned)

- **Mismatch:** M3/M4 use the *data* modules of Cloud Data Platforms (Glue, Redshift, Kinesis, Synapse, Fabric). A DevOps engineer needs compute, networking, and operations services instead.
- **Missing (P0):** Linux administration, Bash scripting, Git, Docker, CI/CD (GitHub Actions), Terraform/IaC, Kubernetes, cloud IAM, VPC/subnets/security groups, load balancers, EC2/VMs, serverless (Lambda), monitoring & logging (CloudWatch/Prometheus/Grafana).
- Networking lacks cloud networking (VPC, load balancers, reverse proxies, CDN, VPN) and troubleshooting tools (tcpdump/Wireshark).
- Recommend: prioritise the DevOps track, or add a "Cloud Infrastructure" module (AWS compute/IAM/VPC) before relying on the data services.

### Cybersecurity Analyst (93 live lessons, 6 milestones)

**Structure issues**
- Networking milestone (35 lessons) is followed by "How the Internet Works — A Security Engineer's View", "Networking Deep Dive", and "Network Attacks" which repeat Networking lessons 3–4, 13–18, and 33.
- "Python for Security Engineers" repeats the Python milestone.

**Missing**
| Topic | Severity |
|---|---|
| SOC analyst workflow: alert triage, playbooks, ticketing, escalation | P0 |
| Packet analysis with Wireshark / tcpdump | P1 |
| Digital forensics basics (disk, memory, timeline) | P1 |
| Email security & phishing analysis (headers, SPF/DKIM/DMARC in practice) | P2 |
| Endpoint detection (EDR) and Windows event logs | P1 |
| PowerShell for defenders | P2 |
| Cloud logging & detection (CloudTrail / Azure activity logs) | P2 |

### AI Security Engineer (68 live lessons, 2 of 5 milestones planned)

- M3 "How AI and LLMs work" pulls the "Generative AI" module (GANs, VAEs, Diffusion) but **not** basic RAG or prompt engineering (in "Natural Language Processing"). *Config-only fix:* add NLP to the milestone, or restructure per §2.
- **Missing (P0):** prompt injection (direct & indirect), jailbreaks, data/model poisoning, OWASP Top 10 for LLM Applications, AI red-teaming, guardrails, agent/tool permissioning, model supply-chain security. All in the planned AI Security track; nothing live.

### Software Engineer (interview-ready) (147 lessons, 6 milestones)

**Structure issues**
- M3 Databases (DBMS) comes **before** M4 SQL essentials, and DBMS includes "SQL — Complete Guide". Put SQL first.
- DSA (20 lessons) has no modules and no interview-pattern lessons.

**Missing**
| Topic | Severity |
|---|---|
| **Operating systems** (processes, threads, scheduling, memory, deadlocks) — standard CS interview subject, no lesson exists | P0 |
| Interview **coding patterns**: two pointers, sliding window, binary search on answer, prefix sums, intervals, monotonic stack, top-K, tries, union-find, topological sort, shortest paths | P0 |
| OOP design: SOLID, design patterns, low-level design | P1 |
| Git & GitHub collaboration | P0 |
| Testing beyond pytest basics (mocking, TDD) | P2 |
| Behavioural interview, resume, and offer negotiation | P1 |
| System design (planned) | P0 |

---

## 4. Suggested order of work

**Config-only quick wins (no new lessons, can ship now):**
1. Add `'Advanced Python'` to the Python milestone of AI Engineer and Agentic AI (X4).
2. Add `'Natural Language Processing'` to AI Security M3.
3. Analytics path: add a data-modelling milestone (DE "Storage & Architecture") and a pandas/visualisation milestone (AI-ML "Programming Ecosystem").
4. Software Engineer: move SQL before DBMS.
5. Data Engineer: drop the duplicate "What is Data Engineering?" from one milestone.

**Small curriculum fixes:**
6. Reorder the AI-ML NLP/Generative AI modules (§2) and merge the two agent lessons.
7. Move DE streaming-concept lessons into "How Data Moves".

**New content, by impact:**
8. Shared foundations: Git & GitHub, Linux & Bash, Docker basics.
9. LLM application essentials: LLM APIs, embeddings + vector databases, tool calling & structured outputs, LLM evaluation (unblocks AI Engineer and Agentic AI).
10. Spark/PySpark and Airflow (unblocks Data Engineer).
11. PyTorch fundamentals and statistics/A/B testing (ML Engineer, Analytics).
12. JavaScript & TypeScript track (unblocks Full-Stack).
13. DevOps track: Docker → CI/CD → Terraform → Kubernetes → monitoring (unblocks Cloud & DevOps).
14. Operating systems + DSA interview patterns (Software Engineer).
15. SOC workflow and Wireshark lessons (Cybersecurity Analyst).
