<h1 align="center">Chaduvuko</h1>

<p align="center">
  <strong>Learn how real companies build real systems. Free. Structured. Practical.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Live-chaduvuko.com-0070f3?style=flat-square" />
  <img src="https://img.shields.io/badge/Stack-Next.js_14-black?style=flat-square&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/SQL-DuckDB_WebAssembly-f7c94b?style=flat-square" />
  <img src="https://img.shields.io/badge/Content-80%2B_Topics_Free-34d399?style=flat-square" />
  <img src="https://img.shields.io/badge/Status-Under_Active_Development-orange?style=flat-square" />
</p>

---

## The Problem

Most learning platforms teach you how to write a SQL query. None of them teach you how SQL fits into a real data pipeline at a company running 100TB of data through Snowflake, Azure Synapse, and a Databricks cluster.

Most tutorials show you a toy example. Nobody shows you what the actual AWS Glue job looks like. What the Firestore security rule looks like. What the ADF pipeline looks like when it runs in production at 2 AM.

That's the gap.

Students — especially international students, B.Tech graduates, and self-taught engineers — spend years learning things that look like real skills but don't map to how systems actually work at companies. They graduate knowing Python syntax but not how to build a Spark job that reads from ADLS Gen2 and writes to Azure Synapse with proper partitioning and error handling.

Chaduvuko shows you the real thing.

---

## What is Chaduvuko?

**Chaduvuko** (చదువుకో) means *"study"* in Telugu.

It's a free learning platform built around one idea: **show how day-to-day tasks look at big companies.** Not theory. Not toy examples. Real workflows, real tools, real architecture — explained clearly enough that you can go use them tomorrow.

Live at → **[chaduvuko.com](https://chaduvuko.com)**

No paywalls. No course fees. No ads. Just content.

---

## Who It's For

- Engineering students (B.Tech, M.S.) preparing for data/software roles
- International students learning cloud platforms for the US job market
- Self-taught developers trying to bridge the gap between tutorials and production systems
- Anyone preparing for GATE, technical interviews, or cloud certifications

---

## What's Built

### Cloud Platforms — 20+ modules

**Azure** (8 services, in-depth):
- Azure Data Factory — pipelines, triggers, linked services, copy activity
- ADLS Gen2 — hierarchical namespace, access tiers, lifecycle policies
- Databricks — clusters, notebooks, Delta Lake, PySpark
- Azure Synapse Analytics — dedicated pools, serverless SQL, integration with ADF
- Event Hubs — streaming ingestion, consumer groups, Kafka compatibility
- Key Vault — secrets management, managed identity integration
- Microsoft Fabric — unified analytics, lakehouse, OneLake
- Azure Introduction — regions, resource groups, IAM, pricing

**AWS** (8 services):
- S3 — buckets, storage classes, lifecycle, presigned URLs
- Glue — crawlers, jobs, DynamicFrames, bookmarks
- Redshift — distribution styles, COPY command, Spectrum
- EMR — cluster types, Spark on EMR, cost optimization
- Athena — partitioning, query optimization, Glue catalog integration
- Kinesis — Data Streams vs Firehose, shards, consumer scaling
- Lake Formation — permissions model, data lake governance
- Step Functions — state machines, error handling, orchestration

**GCP** (5 services):
- BigQuery — slots, partitioning, clustering, BI Engine
- Pub/Sub — topics, subscriptions, push vs pull
- Dataflow — Apache Beam pipelines, streaming, windowing
- Cloud Composer — managed Airflow, DAGs, operators
- GCP Introduction — projects, IAM, service accounts

### Data Engineering — Core Foundations
- What is Data Engineering and why it matters
- Full SQL track — queries, joins, window functions, CTEs, indexing, query optimization
- SQL Playground — run SQL live in the browser (DuckDB WebAssembly, no server)
- SQL cheatsheet
- End-to-end Azure project walkthroughs (6 projects)
- Interview prep for data engineering roles

### DBMS — 20+ Deep Topics
Full database management system curriculum from fundamentals to advanced:
- ER Model, Relational Model, Relational Algebra
- Normalization (1NF through BCNF)
- Functional Dependencies
- Transactions, ACID, Concurrency Control
- Crash Recovery, B-Trees, Hashing, Indexes
- Query Processing and Optimization
- Distributed Databases, NoSQL
- Views, Procedures, Triggers
- Database Security
- Complete interview question bank

### Networking — PhD-Depth Content
- TCP/IP protocol stack, DNS, HTTP/HTTPS, DHCP
- Email protocols (SMTP, IMAP, POP3)
- FTP and SFTP
- SNMP and Syslog
- Network topology (with interactive 3D visualizations built in Three.js)

### DSA (Data Structures & Algorithms)
- Algorithms and data structures for technical interviews
- Topic-based deep dives

### Cybersecurity
- Security fundamentals for engineers

### AI/ML
- Machine learning fundamentals
- ML interview preparation

### Programming Foundations
- Python (data engineering focus)
- SQL (PostgreSQL)
- SQL joins in-depth

### For Indian Students Specifically
- B.Tech branch/subject content
- School (intermediate) content
- Competitive exam prep (GATE-oriented)
- Industry-focused content

---

## Platform Features

### SQL Playground
Run SQL queries live in the browser. No server. No setup. DuckDB compiled to WebAssembly runs entirely in the browser tab.

```sql
-- Try it on chaduvuko.com/learn/sql/playground
SELECT
  department,
  COUNT(*) as employees,
  AVG(salary) as avg_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;
```

### Interactive 3D Network Topology
Three.js + React Three Fiber visualizations of network topologies — bus, ring, star, mesh. Built so students can see how packets actually travel, not just read about it.

### Progress Tracking
- GitHub OAuth via Supabase
- Lesson completion tracking per user
- Resume from any device

### Roadmaps
Visual career roadmaps: Data Engineer, Cloud Engineer, Backend Developer. See the full path before you start so you know what you're building toward.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, SSR, static generation) |
| Styling | Tailwind CSS + CSS custom properties |
| Auth | Supabase (GitHub OAuth, session management) |
| Database | Supabase Postgres (progress tracking) |
| SQL Engine | DuckDB WebAssembly (browser-native, zero server) |
| Code Editor | Monaco Editor (same engine as VS Code) |
| 3D Visuals | Three.js + React Three Fiber |
| Animations | Framer Motion |
| Content | MDX + React components |
| Deployment | Vercel |

---

## What's Different

| | Chaduvuko | Udemy | Coursera | YouTube |
|---|-----------|-------|----------|---------|
| Free | ✅ | ❌ | ❌ mostly | ✅ |
| Structured paths | ✅ | ✅ | ✅ | ❌ |
| SQL runs in browser | ✅ | ❌ | ❌ | ❌ |
| Production-level depth | ✅ | Varies | Varies | Varies |
| No ads | ✅ | ❌ | ❌ | ❌ |
| 3D visualizations | ✅ | ❌ | ❌ | ❌ |
| B.Tech + competitive exam content | ✅ | ❌ | ❌ | Scattered |

---

## What's Coming

- [ ] Chaduvuko Playground v2 — run Python in-browser (Pyodide WebAssembly)
- [ ] Spark/PySpark interactive environment
- [ ] Track completion certificates
- [ ] GCP Professional Data Engineer track
- [ ] Kafka and real-time streaming module
- [ ] dbt (data build tool) full track
- [ ] Video walkthroughs for project modules
- [ ] Community Q&A per lesson
- [ ] Mobile app

---

## Run Locally

```bash
git clone https://github.com/Asil143/chaduvuko.git
cd chaduvuko
npm install
```

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

```bash
npm run dev
# Open http://localhost:3000
```

---

## Why This Exists

Most educational content is built for a Western, English-first, already-employed audience. The gap is enormous for:

- A B.Tech graduate in India who wants to work as a data engineer but has never seen a real cloud pipeline
- An international student in the US who knows SQL from a textbook but has never used Spark
- A self-taught developer who needs to understand how systems actually scale

Chaduvuko is built for those people. The content depth is calibrated to what you need to actually get hired and do the job — not to sell you the next course level.

---

## Contributing

Want to add content for a track? All content lives in `app/learn/<track>/` as Next.js pages. Follow the pattern of existing modules and open a PR.

---

## License

MIT

---

<p align="center">
  <strong>చదువుకో — Keep Learning.</strong>
</p>
