# Site-Wide Course Audit — Missing Lessons and Structure

**Scope:** every course in the live catalog (21 live courses, 1 hidden course, 5 planned courses). The audit uses lesson titles, sections and order only. Lesson content was not reviewed.

**Source:** catalog export (`LESSONS` from `lib/catalog`), November 2026, after the career-path audit fixes (`71c6afb`).

**Priority key**
- **P1** — breaks learner progression, leaves a priority track incomplete, or misleads learners (for example a course title that promises a topic with no lessons).
- **P2** — standard topic that a complete course on the subject would include.
- **P3** — useful extension; add after P1 and P2.

---

## 1. Summary

| Course | Live lessons | Verdict | Structural issues | Missing (P1 / P2 / P3) |
| --- | ---: | --- | --- | --- |
| Data Engineering | 55 | Strong, but disordered | Duplicate foundations section; interview prep sits before the Spark section; streaming lessons sit under Governance | 1 / 3 / 1 |
| SQL | 62 | Complete | — | 0 / 4 / 1 |
| Apache Kafka | 24 | Complete | — | 0 / 1 / 1 |
| dbt | 20 | Complete | — | 0 / 2 / 1 |
| Snowflake | 20 | Complete | — | 0 / 1 / 1 |
| Cloud Data Platforms | 22 | Service tour, no through-line | No comparison/intro lesson, no projects, no interview prep | 1 / 4 / 0 |
| Python | 46 | Complete | — | 0 / 3 / 1 |
| HTML & CSS | 42 | Complete | — | 0 / 2 / 1 |
| JavaScript & TypeScript | 6 | Too thin | — | 4 / 4 / 0 |
| Full-Stack with AI | 8 | Too thin | No capstone | 2 / 4 / 1 |
| DSA | 21 | Topics too coarse | No sections; "Advanced Topics" is a catch-all | 3 / 4 / 0 |
| DBMS | 20 | Complete (academic) | — | 0 / 1 / 1 |
| Operating Systems | 7 | Too thin | — | 0 / 4 / 0 |
| Networking | 35 (+9 unwritten) | Unfinished | 9 lessons marked "soon"; no interview prep | 2 / 3 / 1 |
| Cybersecurity | 43 | Complete, mis-ordered | "Defensive Security" appears twice; lessons 41–43 sit after Career | 0 / 2 / 1 |
| AI & Machine Learning | 85 | Strong | Overlaps the Generative AI course (lessons 60–67) | 0 / 4 / 1 |
| Generative AI & LLM Engineering | 12 | Good core | No capstone, no interview prep | 2 / 2 / 0 |
| Agentic AI & Automation | 10 | Good core | No interview prep | 1 / 3 / 0 |
| DevOps & Cloud Infrastructure | 10 | Thin | Slug says MLOps, title and content do not | 1 / 5 / 0 |
| Data Analytics & Statistics | 7 | Too thin | Overlaps planned Business Intelligence track | 3 / 4 / 0 |
| Projects | 6 | Mislabelled | All 6 are Azure Data Factory projects, not site-wide projects | 1 / 0 / 0 |
| Data Science (hidden) | 0 of 53 | Placeholder only | All 53 lessons are "soon" | decision needed |
| 5 planned tracks | 0 | Not started | — | decision needed |

**Totals:** 21 P1, 61 P2, 12 P3 findings (the Networking "soon" backlog counts as one P1 covering 9 lessons), plus 6 structural fixes and 2 product decisions.

---

## 2. Cross-cutting findings

1. **Interview prep is inconsistent.** It exists for Python, SQL, HTML & CSS, DE, Kafka, dbt, Snowflake, DSA, DBMS, OS, Cyber and AI-ML. It is missing for JavaScript, Full-Stack, Networking, Cloud Data, Generative AI, Agentic AI, DevOps and Analytics. Every course should end with one (Level 5 of the learning architecture).
2. **Capstone projects are inconsistent.** SQL, Snowflake, HTML & CSS and Agentic AI have one. JavaScript, Full-Stack, Generative AI, DevOps, Analytics, Cloud Data and DE do not. The "Projects" course contains only Azure Data Factory exercises.
3. **Overlap between courses is unexplained.** AI-ML lessons 60–67 (LLMs, prompting, RAG, agents) overlap the Generative AI and Agentic AI courses. Data Science (hidden) overlaps Python, Analytics and AI-ML. The planned Business Intelligence track overlaps Analytics. Each pair needs an explicit "theory here, engineering there" split shown on both course pages.
4. **The 5 planned tracks have no lessons.** System Design is the most important gap: it is a Software Engineer and Data Engineer interview requirement. AI Security matches priority track 5 (Cybersecurity & AI Security).

---

## 3. Per-course findings

### Data Engineering (55)
**Structure**
- **S1 (P1).** The static "Data Engineering Foundations" section (`lib/catalog/static-lessons.ts`) duplicates three later lessons: "What is Data Engineering?" (1 and 6), "SQL for Data Engineers" (2 and 19), "Python for Data Engineers" (4 and 18). Fold PostgreSQL into the Core Engineering Skills section, redirect the three duplicates to the curriculum lessons, and remove the section.
- **S2.** "Streaming Data" (44) and "Message Brokers and Queues" (45) sit under Quality, Governance & Production. Move them to How Data Moves, after Batch vs Streaming.
- **S3.** "Data Engineering System Design" (50) and "Interview Prep" (51) come before the new Spark/Airflow section. Move both to the end of the course.

**Missing**
- P1 — Data Engineering Capstone — End-to-End Batch + Streaming Pipeline
- P2 — Stream Processing — Spark Structured Streaming and Flink
- P2 — Data Contracts and Schema Evolution
- P2 — NoSQL Stores for Data Engineers — Document, Key-Value, Wide-Column
- P3 — Reverse ETL and Operational Analytics

### SQL (62)
- P2 — Window Frames — Running Totals and Moving Averages (ROWS / RANGE BETWEEN)
- P2 — UPSERT and MERGE
- P2 — ROLLUP, CUBE and GROUPING SETS
- P2 — Working with JSON in SQL
- P3 — Gaps and Islands and Other Classic Patterns

### Apache Kafka (24)
- P2 — Stream Processing with Apache Flink
- P3 — Kafka Without ZooKeeper — KRaft Mode

### dbt (20)
- P2 — Unit Tests in dbt
- P2 — Model Contracts, Versions and Access (dbt Mesh)
- P3 — The dbt Semantic Layer and Metrics

### Snowflake (20)
- P2 — Snowpark for Python
- P3 — Snowflake Cortex AI Functions

### Cloud Data Platforms (22)
The course is a tour of services grouped by cloud, with no lesson that ties them together.
- P1 — Choosing a Cloud for Data — Azure vs AWS vs GCP (course intro)
- P2 — Databricks and Unity Catalog (platform-neutral, beyond Azure Databricks)
- P2 — Google Cloud Storage and Dataproc
- P2 — IAM and Networking for Data Platforms (cross-cloud)
- P2 — Cloud Data Interview Prep

### Python (46)
- P2 — Dataclasses, Enums and Pydantic Models
- P2 — The Standard Library Toolkit — pathlib, collections, itertools, subprocess
- P2 — Python and Databases — sqlite3 and SQLAlchemy
- P3 — Python Capstone Project

### HTML & CSS (42)
- P2 — Tailwind CSS — Utility-First Styling
- P2 — Deploying a Static Site — GitHub Pages, Netlify, Vercel
- P3 — Dark Mode and Theming with Custom Properties

### JavaScript & TypeScript (6)
Six lessons cannot cover the language. Each current lesson bundles 3–4 major topics.
- P1 — Scope, Closures and `this`
- P1 — Array Methods in Depth — map, filter, reduce, sort
- P1 — Classes, Prototypes and Inheritance
- P1 — Error Handling and Debugging in the Browser
- P2 — JSON, localStorage and Browser Storage
- P2 — Node.js Fundamentals — Runtime, File System and Modules
- P2 — Testing JavaScript with Vitest
- P2 — JavaScript Project and Interview Prep

### Full-Stack Development with AI (8)
- P1 — Styling React Apps — Tailwind and Component Libraries
- P1 — Full-Stack Capstone — AI-Powered SaaS App
- P2 — Forms and Validation — React Hook Form and Zod
- P2 — Testing a Full-Stack App — Unit, API and Playwright E2E
- P2 — Web Security for Full-Stack Developers — XSS, CSRF, CORS
- P2 — Full-Stack Interview Prep
- P3 — Real-Time Features — WebSockets and Server-Sent Events

### DSA (21)
**Structure:** there are no sections, and several lessons are whole chapters ("Graphs", "Dynamic Programming", "Advanced Topics"). Group into Foundations / Linear Structures / Non-Linear Structures / Algorithm Paradigms / Interview.
- P1 — Two Pointers and Sliding Window
- P1 — Graph Algorithms — BFS/DFS Applications, Topological Sort, Shortest Paths
- P1 — Dynamic Programming Patterns — 1D, 2D, Knapsack, Subsequences
- P2 — Tries
- P2 — Union-Find (Disjoint Set Union)
- P2 — Bit Manipulation
- P2 — Minimum Spanning Trees — Kruskal and Prim

### DBMS (20)
- P2 — Replication, Partitioning and Sharding
- P3 — MVCC — How PostgreSQL Handles Concurrent Reads and Writes

### Operating Systems (7)
- P2 — Inter-Process Communication — Pipes, Signals, Shared Memory
- P2 — Virtualisation and Containers — Hypervisors, Namespaces and cgroups
- P2 — Disk Scheduling, RAID and Storage Devices
- P2 — Protection and Security in the OS

### Networking (35 live + 9 unwritten)
**Structure:** 9 lessons are listed as "soon" — DDoS, VPNs and Tunneling, Wireless Security, Zero Trust Networking, Network Monitoring, Network Troubleshooting Methodology, Nmap, Wireshark, tcpdump. The Tools and Troubleshooting section has no live lessons.
- P1 — Write the 9 "soon" lessons (counted as one finding)
- P1 — Networking Interview Prep
- P2 — Load Balancers and Reverse Proxies
- P2 — CDNs and Edge Networks
- P2 — Cloud Networking — VPCs, Subnets, Security Groups and Peering
- P3 — Network Automation and Software-Defined Networking

### Cybersecurity (43)
**Structure:** lessons 41–43 (SOC Alert Triage, Wireshark, Digital Forensics) form a second "Defensive Security" section after Career & Production. Move them into the first Defensive Security section (after lesson 34).
- P2 — AI and LLM Security Basics — Prompt Injection, Data Leakage, Model Abuse
- P2 — Mobile Application Security
- P3 — Malware Analysis Fundamentals — Static and Dynamic

### AI & Machine Learning (85)
- P2 — Imbalanced Data — Class Weights, Resampling and SMOTE
- P2 — Anomaly Detection — Isolation Forest and Autoencoders
- P2 — More Clustering — Hierarchical and DBSCAN
- P2 — Responsible AI — Fairness, Bias and Model Cards
- P3 — Ensembles — Stacking and Blending

### Generative AI & LLM Engineering (12)
- P1 — Capstone — Production RAG Assistant
- P1 — Generative AI Interview Prep
- P2 — Running Open Models — Ollama, vLLM and Hugging Face
- P2 — Multimodal APIs — Vision, Audio and Speech

### Agentic AI & Automation (10)
- P1 — Agentic AI Interview Prep
- P2 — Agent Frameworks Compared — LangGraph, OpenAI Agents SDK, CrewAI
- P2 — Browser and Computer-Use Agents
- P2 — Deploying Long-Running Agents — Queues, Checkpoints and Cost Limits

### DevOps & Cloud Infrastructure (10)
**Structure:** the slug is `devops-mlops`, but the course has no MLOps lessons (MLOps lives in AI-ML lessons 74–84). Either link the AI-ML MLOps section from this course page or rename the course's public description; do not change the slug.
- P1 — DevOps Capstone — Containerised App with CI/CD, Terraform and Monitoring
- P2 — Networking for DevOps — DNS, Load Balancers, Nginx Reverse Proxy
- P2 — Secrets Management — Vault and Cloud Secret Stores
- P2 — Helm and GitOps with Argo CD
- P2 — SRE Basics — SLIs, SLOs, Error Budgets and Incidents
- P2 — DevOps Interview Prep

### Data Analytics & Statistics (7)
Seven lessons cover statistics and BI but no day-to-day analyst tooling.
- P1 — Spreadsheets for Analysis — Excel and Google Sheets
- P1 — Python for Analysts — pandas Analysis Workflow
- P1 — Funnel, Cohort and Retention Analysis
- P2 — Correlation and Regression for Analysts
- P2 — SQL for Analytics — Link or Bridge Lesson to the SQL Course
- P2 — Analytics Case Study — From Business Question to Dashboard
- P2 — Data Analyst Interview Prep

### Projects (6)
- P1 — All six projects are Azure Data Factory exercises. Either move them into Cloud Data Platforms as "ADF Projects" and rename the track, or add projects from other courses. A "Projects" course containing only ADF misrepresents the site.

---

## 4. Product decisions needed

1. **Data Science (hidden, 53 placeholder lessons).** None are written, and most topics already exist in Python, Analytics and AI-ML. Recommended: delete the placeholder track and fold the few unique topics (EDA workflow, churn case study, cohort analysis) into Analytics.
2. **Planned tracks (0 lessons).** Recommended order:
   1. System Design & Software Engineering — interview-critical for two paths.
   2. AI Security & LLM Security — priority track 5.
   3. Merge Business Intelligence into Data Analytics instead of building it separately.
   4. Defer SRE and Application Security / DevSecOps; cover their basics through the DevOps and Cyber additions above.

---

## 5. Recommended fix order

1. Structural fixes S1–S3 (DE), Cyber section order, DSA sections, Projects relabel — no new content needed.
2. P1 findings (21), starting with JavaScript, Analytics, the Networking "soon" backlog and interview prep for the new courses.
3. Product decisions (Data Science, planned tracks).
4. P2 lessons, course by course.
5. P3 lessons.
