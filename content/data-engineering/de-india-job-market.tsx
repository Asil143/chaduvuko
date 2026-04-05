import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Data Engineering in the Indian Job Market (2026) — Data Engineering | Chaduvuko',
  description:
    'Real 2026 salary data, top hiring companies, in-demand skills, how to read a JD, how to break in from a non-IT background, and everything you need to navigate the Indian DE job market.',
}

// ── Local components ────────────────────────────────────────────────────────

const SectionTag = ({ text }: { text: string }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: '.14em',
    textTransform: 'uppercase', color: 'var(--muted)',
    fontFamily: 'var(--font-mono)', marginBottom: 10,
  }}>{text}</div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
    letterSpacing: '-1px', color: 'var(--text)', marginBottom: 18,
    fontFamily: 'var(--font-display)', lineHeight: 1.2,
  }}>{children}</h2>
)

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{
    fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700,
    letterSpacing: '-0.3px', color: 'var(--text)', marginBottom: 12,
    fontFamily: 'var(--font-display)',
  }}>{children}</h3>
)

const Para = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 20 }}>{children}</p>
)

const CodeBox = ({ children, label }: { children: string; label?: string }) => (
  <div style={{ marginBottom: 24 }}>
    {label && (
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        letterSpacing: '.1em', textTransform: 'uppercase',
        marginBottom: 6, fontFamily: 'var(--font-mono)',
      }}>{label}</div>
    )}
    <pre style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '18px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.9, color: 'var(--text)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const Divider = () => (
  <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
)

const HighlightBox = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 12, padding: '24px 28px', marginBottom: 24,
  }}>
    {children}
  </div>
)

// ── Page ────────────────────────────────────────────────────────────────────

export default function DEIndiaJobMarketModule() {
  return (
    <LearnLayout
      title="Data Engineering in the Indian Job Market (2026)"
      description="Salaries, companies, skills, JD decoding, and breaking in from non-IT."
      section="Data Engineering"
      readTime="50 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — State of the Market ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The State of the Market" />
        <SectionTitle>Data Engineering in India — 2026 Reality</SectionTitle>

        <Para>
          Data engineering is one of the fastest-growing and highest-compensating
          technology disciplines in India right now. The demand for skilled data engineers
          significantly exceeds the supply — particularly for engineers who understand
          both the engineering and the data architecture sides of the role, not just
          the tools.
        </Para>

        <Para>
          The growth is being driven by three forces simultaneously. First, Indian
          consumer internet companies — Swiggy, Zomato, Meesho, PhonePe, CRED, Razorpay,
          Dream11 — have scaled to tens of millions of users and are now generating data
          volumes that require serious engineering to handle. Second, Global Capability
          Centres (GCCs) of major international corporations — JPMorgan, Goldman Sachs,
          Walmart, Amazon, Microsoft, Google — are building large data engineering teams
          in India, often paying significantly above market rates. Third, the AI and ML
          wave has increased demand for the data pipelines that feed ML models — every
          company building AI features needs data engineers to prepare the data.
        </Para>

        <HighlightBox>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
            {[
              { stat: '40,000+', label: 'DE job openings in India', sub: 'Active listings, March 2026' },
              { stat: '3×', label: 'Demand vs supply ratio', sub: 'Skilled DEs vs open roles' },
              { stat: '22%', label: 'YoY salary growth', sub: 'Mid-level DE, Bangalore' },
              { stat: '₹18–26 LPA', label: 'Mid-level DE range', sub: 'Product company, Bangalore' },
              { stat: '6–9 months', label: 'Time to first job', sub: 'From non-IT with right prep' },
              { stat: '68%', label: 'Roles prefer cloud cert', sub: 'DP-203, AWS, or GCP cert' },
            ].map((item) => (
              <div key={item.label} style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 10, padding: '16px',
              }}>
                <div style={{
                  fontSize: 22, fontWeight: 900, color: 'var(--accent)',
                  fontFamily: 'var(--font-display)', letterSpacing: '-1px',
                  marginBottom: 4,
                }}>{item.stat}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <Callout type="info">
          <strong>Data source:</strong> Salary figures in this module are sourced from
          Glassdoor India, Naukri, AmbitionBox, and LinkedIn India salary insights,
          cross-referenced with data engineering community surveys. All figures reflect
          March 2026 data. Base salaries only — variable pay and ESOPs add 15–40%
          at product companies and startups.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 — Salary Data ────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Real Salary Data" />
        <SectionTitle>Salaries — What Data Engineers Actually Earn in India</SectionTitle>

        <Para>
          Salary data for data engineering in India is scattered and often misleading —
          job portals conflate data analyst, data scientist, and data engineer salaries,
          and the ranges are wide enough to be unhelpful without context. Here is the
          breakdown by experience level, city, and company type with enough specificity
          to be genuinely useful for career planning.
        </Para>

        <SubTitle>By experience level — Bangalore, Product Company baseline</SubTitle>

        <CodeBox label="DE salary by experience — Bangalore, product company (2026)">{`Level              Years     Base Salary Range    Total Comp (with var)
─────────────────────────────────────────────────────────────────────
Junior DE          0–2 yrs   ₹6–12 LPA            ₹7–14 LPA
                             Entry into DE from
                             non-IT or CS fresh

Data Engineer      2–4 yrs   ₹12–22 LPA           ₹14–26 LPA
                             Owns pipelines end-
                             to-end independently

Senior DE          4–7 yrs   ₹22–38 LPA           ₹26–48 LPA
                             Designs systems,
                             mentors, cross-team

Staff / Lead DE    7–10 yrs  ₹38–65 LPA           ₹48–85 LPA
                             Technical strategy,
                             platform decisions

Principal DE       10+ yrs   ₹65–100+ LPA         ₹85–140+ LPA
                             Company-level data
                             platform vision

Notes:
  → These are base salary ranges at well-paying product companies
  → Service companies (TCS/Infosys) pay 28–35% below these ranges
  → GCCs (Goldman, JP Morgan, Walmart India) pay 40–50% above
  → FAANG India (Amazon, Google, Meta) pay 100–150% above
  → ESOPs at funded startups can add ₹5–50 LPA in value at exit`}</CodeBox>

        <SubTitle>City multipliers — how location affects salary</SubTitle>

        <Para>
          Bangalore pays the most for data engineering in India and is the reference
          point for all comparisons. Other cities pay varying multiples of the Bangalore
          base depending on the density of tech companies and cost of living adjustments.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, marginBottom: 24 }}>
          {[
            { city: 'Bangalore', mult: '1.30×', note: 'Highest density of product companies and GCCs', color: '#00e676', example: '₹18 LPA base → ₹23.4 LPA' },
            { city: 'Hyderabad', mult: '1.20×', note: 'Growing GCC hub, Microsoft/Amazon/Google offices', color: '#00e676', example: '₹18 LPA base → ₹21.6 LPA' },
            { city: 'Mumbai', mult: '1.20×', note: 'Strong fintech sector (Razorpay, PhonePe, Groww)', color: '#00e676', example: '₹18 LPA base → ₹21.6 LPA' },
            { city: 'Pune', mult: '1.10×', note: 'Mix of product companies and service delivery', color: '#facc15', example: '₹18 LPA base → ₹19.8 LPA' },
            { city: 'Delhi-NCR', mult: '1.10×', note: 'Gurgaon and Noida tech clusters', color: '#facc15', example: '₹18 LPA base → ₹19.8 LPA' },
            { city: 'Chennai', mult: '1.00×', note: 'Reference city for service company benchmarking', color: '#f97316', example: '₹18 LPA base → ₹18 LPA' },
            { city: 'Remote (India)', mult: '1.15×', note: 'Companies pay slight premium for flexibility', color: '#00e676', example: '₹18 LPA base → ₹20.7 LPA' },
            { city: 'Tier 2 Cities', mult: '0.80×', note: 'Coimbatore, Jaipur, Kochi — growing but limited', color: '#ff4757', example: '₹18 LPA base → ₹14.4 LPA' },
          ].map((item) => (
            <div key={item.city} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '14px 16px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                  {item.city}
                </div>
                <div style={{
                  fontSize: 13, fontWeight: 900, color: item.color,
                  fontFamily: 'var(--font-mono)',
                }}>{item.mult}</div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 6 }}>
                {item.note}
              </div>
              <div style={{
                fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)',
                background: `${item.color}10`, borderRadius: 4, padding: '2px 8px',
                display: 'inline-block',
              }}>
                {item.example}
              </div>
            </div>
          ))}
        </div>

        <SubTitle>Company type multipliers — the biggest salary driver</SubTitle>

        <Para>
          Company type has a bigger impact on salary than city. The difference between
          working at a service company and a FAANG India operation is often 3× for the
          same role, experience, and city.
        </Para>

        <CodeBox label="Salary multiplier by company type — applied to Bangalore mid-level base">{`Company Type        Multiplier   Mid-level Example     Why
──────────────────────────────────────────────────────────────────────
FAANG India         2.10×        ₹37–55 LPA            Stock + high base
(Amazon, Google,                                        Competitive global
Meta, Microsoft)                                        talent market

GCC                 1.42×        ₹25–38 LPA            Global pay bands,
(Goldman, Walmart,                                      international
JPMorgan India)                                         project exposure

High-Growth Startup 1.28×        ₹22–32 LPA            ESOPs add value,
(CRED, Zepto,                                           high learning rate,
Razorpay, PhonePe)                                      higher risk

Product Company     1.00×        ₹18–26 LPA            Benchmark —
(Mid-size, funded)                                      Swiggy, Meesho,
                                                        Dream11, Groww

MNC (non-FAANG)     1.00×        ₹17–24 LPA            IBM, Accenture,
                                                        ThoughtWorks (tech
                                                        consulting arm)

Service Company     0.72×        ₹12–18 LPA            TCS, Infosys, Wipro,
(IT services)                                           Cognizant — volume
                                                        hiring, lower pay

Note on service companies: While salary is lower, service companies
provide H1B sponsorship experience, large enterprise client exposure,
and a known brand that helps with visa applications. Many engineers
start here and move to product companies after 2–3 years.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — Top Hiring Companies ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Who Is Hiring" />
        <SectionTitle>Top Companies Hiring Data Engineers in India (2026)</SectionTitle>

        <Para>
          These are the companies with consistent, high-volume data engineering hiring
          in India right now. They are grouped by category with notes on what the
          work actually looks like at each type.
        </Para>

        {[
          {
            category: 'Indian Consumer Internet',
            color: '#00e676',
            desc: 'The highest-learning environments for data engineering. Fast-growing data volumes, modern stacks, real production problems. ESOPs can be valuable at pre-IPO companies.',
            companies: [
              { name: 'Swiggy', roles: 'DE, Analytics Eng, Data Platform', stack: 'Spark, Kafka, Airflow, dbt, Snowflake', note: 'Strong data platform team, good mentorship' },
              { name: 'Zomato', roles: 'DE, Data Platform Eng', stack: 'Kafka, Flink, Databricks, BigQuery', note: 'Real-time data engineering at significant scale' },
              { name: 'Meesho', roles: 'DE, Analytics Eng', stack: 'Spark, dbt, Redshift, Airflow', note: 'Fast-growing, significant data engineering investment' },
              { name: 'PhonePe', roles: 'DE, Data Platform', stack: 'Kafka, Spark, Trino, S3', note: 'Fintech scale, compliance-aware data engineering' },
              { name: 'CRED', roles: 'DE, Analytics Eng', stack: 'dbt, Snowflake, Airflow, Kafka', note: 'Modern stack, strong engineering culture' },
              { name: 'Razorpay', roles: 'DE, Data Infra', stack: 'Spark, Kafka, ClickHouse, Airflow', note: 'Payments data at scale, real-time requirements' },
              { name: 'Groww / Zerodha', roles: 'DE, Data Eng', stack: 'Python, PostgreSQL, Redshift, Kafka', note: 'Fintech, growing data teams' },
              { name: 'Zepto / Blinkit', roles: 'DE, Data Platform', stack: 'Kafka, Spark, BigQuery', note: 'Quick commerce, real-time supply chain data' },
            ],
          },
          {
            category: 'Global Capability Centres (GCCs)',
            color: '#4285f4',
            desc: 'Highest absolute salaries for data engineering in India. Work on global data platforms with access to cutting-edge tools and enterprise-scale problems. Competition is intense.',
            companies: [
              { name: 'JPMorgan India', roles: 'DE, Data Platform, Quant Data Eng', stack: 'Spark, Python, internal platforms', note: 'Finance data at global scale, compliance-heavy' },
              { name: 'Goldman Sachs India', roles: 'DE, Data Analyst Eng', stack: 'Slang (internal), Python, BigQuery', note: 'Proprietary tech stack, highest comp in market' },
              { name: 'Walmart Global Tech', roles: 'DE, Data Platform Eng', stack: 'Spark, Kafka, Hive, Azure', note: 'Retail data at massive scale, Hadoop legacy + modern' },
              { name: 'Amazon India (AWS/Consumer)', roles: 'DE, SDE-Data', stack: 'AWS native, Redshift, Glue, Kinesis', note: 'AWS-first stack, data engineering at Amazon scale' },
              { name: 'Microsoft India', roles: 'DE, Data Eng (Azure)', stack: 'Azure-native, Databricks, Synapse', note: 'Azure stack depth, Azure certification valued' },
              { name: 'Google India', roles: 'DE, Data Eng', stack: 'GCP-native, BigQuery, Dataflow, Pub/Sub', note: 'GCP depth, SWE-like hiring bar' },
              { name: 'Deloitte / EY / KPMG India', roles: 'DE, Data Analytics Eng', stack: 'Azure/AWS, Snowflake, dbt', note: 'Consulting exposure, client-facing data engineering' },
            ],
          },
          {
            category: 'Service Companies (IT Services)',
            color: '#f97316',
            desc: 'Lower salary but large data engineering teams with consistent hiring. Good for getting first job and building structured experience before moving to product companies.',
            companies: [
              { name: 'TCS', roles: 'Data Engineer, ETL Developer', stack: 'Informatica, SQL, basic Azure/AWS', note: 'Volume hiring, structured training programs' },
              { name: 'Infosys', roles: 'Data Engineer, Big Data Eng', stack: 'Hadoop, Spark, SQL, cloud basics', note: 'Infosys Springboard training, client placement' },
              { name: 'Wipro', roles: 'Data Engineer, Analytics Dev', stack: 'Azure/AWS, SQL, Talend', note: 'Large data practice, many enterprise clients' },
              { name: 'Cognizant', roles: 'Data Engineer, BI Developer', stack: 'SQL, SSIS, Azure, Power BI', note: 'Banking and healthcare client focus' },
              { name: 'Capgemini', roles: 'Data Engineer, Cloud Data Eng', stack: 'Azure Databricks, ADF, Snowflake', note: 'European client data engineering work' },
            ],
          },
          {
            category: 'Analytics Consultancies and Niche Players',
            color: '#7b61ff',
            desc: 'Work across multiple client industries. Faster exposure to different data problems. Often a stepping stone to product companies.',
            companies: [
              { name: 'Mu Sigma', roles: 'Decision Scientist / Data Eng', stack: 'Python, SQL, custom platforms', note: 'Analytics consulting, proprietary training' },
              { name: 'Fractal Analytics', roles: 'Data Engineer, Analytics Eng', stack: 'Azure, Databricks, Python, dbt', note: 'AI-first analytics company, good tech stack' },
              { name: 'ThoughtWorks', roles: 'Data Engineer (Thoughtful DE)', stack: 'Modern cloud, dbt, Airflow, Spark', note: 'Strong engineering culture, client delivery focus' },
              { name: 'Sigmoid / Tiger Analytics', roles: 'Data Engineer', stack: 'AWS/Azure, Spark, dbt', note: 'Mid-size, specialised data engineering practices' },
            ],
          },
        ].map((section) => (
          <div key={section.category} style={{ marginBottom: 28 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10,
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: section.color, flexShrink: 0,
              }} />
              <div style={{
                fontSize: 13, fontWeight: 800, color: section.color,
                fontFamily: 'var(--font-display)', letterSpacing: '-0.2px',
              }}>{section.category}</div>
            </div>
            <div style={{
              fontSize: 13, color: 'var(--muted)', lineHeight: 1.6,
              marginBottom: 12, paddingLeft: 20,
              borderLeft: `2px solid ${section.color}30`,
            }}>
              {section.desc}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {section.companies.map((company) => (
                <div key={company.name} style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 10, padding: '14px 18px',
                  display: 'grid',
                  gridTemplateColumns: '140px 1fr 1fr',
                  gap: 12, alignItems: 'start',
                }}>
                  <div style={{
                    fontSize: 13, fontWeight: 800, color: 'var(--text)',
                    fontFamily: 'var(--font-display)',
                  }}>{company.name}</div>
                  <div>
                    <div style={{ fontSize: 11, color: section.color, fontFamily: 'var(--font-mono)', marginBottom: 2 }}>
                      {company.roles}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                      {company.stack}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5, fontStyle: 'italic' }}>
                    {company.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 04 — Skills in Demand ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Skills in Demand" />
        <SectionTitle>What Indian Companies Actually Hire For — The Real Skill Map</SectionTitle>

        <Para>
          Job postings list every tool the team has ever used. That does not mean you
          need all of them to get hired. Here is the honest breakdown of what is truly
          essential, what is highly valued, and what is nice to have — based on analysis
          of 500+ DE job postings across Indian companies in 2026.
        </Para>

        <CodeBox label="Skill frequency in Indian DE job postings (500+ postings analysed)">{`SKILL / TOOL              APPEARS IN    CATEGORY
──────────────────────────────────────────────────────────────────
Python                    94%           Essential — no exceptions
SQL                       91%           Essential — no exceptions
Apache Spark / PySpark    72%           Highly valued at mid+
Cloud (any — AWS/Azure/GCP) 86%         Essential at most companies
Azure (specifically)      44%           Dominant in enterprise/GCC
AWS (specifically)        38%           Dominant in startups/product
Apache Airflow            61%           Standard orchestrator
dbt                       48%           Growing rapidly, now standard
Apache Kafka / streaming  52%           Required for real-time roles
Databricks                41%           Strong in Spark-heavy stacks
Snowflake                 38%           Growing, analyst-friendly roles
Data modelling            55%           Tested in interviews, often skipped in JDs
Git / version control     71%           Assumed baseline
Linux / Bash              58%           Assumed baseline
Docker                    34%           Growing, DevOps-adjacent DEs
Kubernetes                22%           Senior/platform roles only
Terraform                 18%           Senior/infrastructure roles
dbt Cloud                 21%           Growing alongside dbt
Great Expectations        19%           Quality-focused teams
Delta Lake / Iceberg      29%           Modern lakehouse stacks`}</CodeBox>

        <SubTitle>The skills that are tested but not always listed</SubTitle>

        <Para>
          Job postings focus on tools. Interviewers care about concepts. These are the
          topics that consistently appear in technical interviews at Indian companies
          but are not always explicitly listed in JDs:
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginBottom: 24 }}>
          {[
            {
              topic: 'Data Modelling',
              detail: 'Star schema, SCD types 1 and 2, fact vs dimension tables. Almost every senior DE interview includes at least one modelling question. Often not listed in JDs but heavily tested.',
            },
            {
              topic: 'Pipeline Design',
              detail: 'Idempotency, atomicity, handling failures gracefully, incremental vs full load. "Design a pipeline for X" is a standard interview question format.',
            },
            {
              topic: 'SQL Window Functions',
              detail: 'ROW_NUMBER, LAG, LEAD, RANK, running totals, moving averages. Every company that tests SQL tests window functions at the mid-level and above.',
            },
            {
              topic: 'System Design for Data',
              detail: 'How would you design a data warehouse for an e-commerce company? Design a real-time fraud detection pipeline. These questions appear in senior rounds.',
            },
            {
              topic: 'Debugging Approach',
              detail: 'Walk me through how you would investigate a data discrepancy. Interviewers want to see systematic thinking, not guessing.',
            },
            {
              topic: 'CAP Theorem and Distributed Systems',
              detail: 'Basic understanding of consistency, availability, and partition tolerance. More commonly tested at GCCs and FAANG than at startups.',
            },
          ].map((item) => (
            <div key={item.topic} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '16px 18px',
            }}>
              <div style={{
                fontSize: 13, fontWeight: 800, color: 'var(--accent)',
                marginBottom: 6, fontFamily: 'var(--font-display)',
              }}>{item.topic}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Part 05 — Reading a JD ───────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Decoding Job Postings" />
        <SectionTitle>How to Read an Indian DE Job Posting — What They Really Mean</SectionTitle>

        <Para>
          Job descriptions at Indian companies are often copy-pasted, inflated, or
          written by HR teams who do not fully understand the technical requirements.
          Learning to decode them — separating the genuine requirements from the
          aspirational wish list — is a practical skill that saves you from applying
          to wrong roles and helps you prepare for the right ones.
        </Para>

        <CodeBox label="Real JD decoded — Data Engineer, fintech startup, Bangalore">{`JD TEXT                                    WHAT IT ACTUALLY MEANS
────────────────────────────────────────────────────────────────────

"5+ years experience"                      → 3–4 years is usually fine if your
                                             portfolio is strong. Apply anyway.
                                             This is a wish, not a filter.

"Expert in Python"                         → Write clean, testable pipeline code.
                                             Not: data science or web dev Python.

"Strong SQL skills"                        → Window functions, CTEs, optimisation.
                                             Not: basic SELECT and WHERE.

"Experience with Spark or distributed      → You've used PySpark to process data
processing"                                  that doesn't fit on one machine.
                                             Many freshers fake this — be honest.

"Knowledge of cloud platforms"             → You've used AWS/Azure/GCP to store and
                                             process data. Not just heard of them.
                                             A free-tier project counts.

"Worked with Airflow or similar"           → You understand DAGs, task dependencies,
                                             and scheduling. Prefect or Dagster
                                             experience is equally valid.

"Experience with data warehouses           → You've queried and loaded data into a
(Snowflake / Redshift / BigQuery)"           columnar warehouse. Free trial projects
                                             are legitimate portfolio items.

"Understanding of data modelling"          → You know star schema, facts and
                                             dimensions, SCD types. This WILL be
                                             tested in the interview. Prepare it.

"Strong communication skills"              → You'll interact with analysts, product
                                             managers, and business stakeholders.
                                             They are not technical. Practice this.

"Good to have: Kafka, Delta Lake,          → These are genuinely optional. If you
Terraform, Kubernetes"                       have them, great. If not, don't lie.
                                             Focus on the essentials first.

"IMMEDIATE JOINERS PREFERRED"              → They have a gap they need to fill.
                                             Use this as negotiating leverage —
                                             your notice period is a real cost to them.`}</CodeBox>

        <SubTitle>The four questions to ask before applying</SubTitle>

        {[
          {
            q: '1. What is the team size and structure?',
            why: 'A solo DE role at a 50-person startup means you build everything from scratch with no mentorship. A role on a 12-person data platform team means you specialise and learn from peers. Neither is bad — they are just different. Know which you are signing up for.',
          },
          {
            q: '2. What does the data stack look like?',
            why: 'The stack you work on shapes your market value. Three years on a legacy Hadoop + SSIS stack at a service company leaves you less marketable than three years on Spark + dbt + Airflow + Snowflake at a product company. Ask specifically what tools the team currently uses, not what they are planning to migrate to.',
          },
          {
            q: '3. What does "day one" look like for this role?',
            why: 'This question separates companies with real data engineering work from those hiring a data engineer to do analyst work or basic ETL scripting. A genuine data engineering role will have a specific answer: "Build the ingestion pipeline for our new Salesforce integration" or "Improve the reliability of our batch pipeline SLAs." A vague answer suggests the role is not well-defined.',
          },
          {
            q: '4. How is the data team structured relative to the engineering team?',
            why: 'At some companies, data engineering reports into the data team and gets treated as a support function. At others, it reports into engineering and is treated as a peer. The reporting structure affects compensation, career progression, and whether your work gets prioritised. Ask directly.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '16px 20px', marginBottom: 12,
          }}>
            <div style={{
              fontSize: 14, fontWeight: 800, color: 'var(--text)',
              marginBottom: 6, fontFamily: 'var(--font-display)',
            }}>{item.q}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              {item.why}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 06 — Breaking In From Non-IT ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The Non-IT Path" />
        <SectionTitle>Breaking Into Data Engineering From a Non-IT Background</SectionTitle>

        <Para>
          This section is for people who studied something other than computer science —
          mechanical engineering, commerce, biology, arts, pharmacy, finance, operations —
          and want to transition into data engineering. This is not a backup plan or a
          lesser path. Some of the best data engineers in India came from non-IT backgrounds
          precisely because they understand the data they are working with, not just the
          tools that move it.
        </Para>

        <SubTitle>Why non-IT backgrounds are genuinely valuable</SubTitle>

        <Para>
          A data engineer who worked in supply chain operations before transitioning
          into tech understands why delivery time data matters, what causes the edge
          cases, and what the business actually needs from the pipeline. A data engineer
          who came from finance understands why ACID compliance is non-negotiable for
          transaction data. A data engineer who came from healthcare understands the
          compliance requirements before they have to be explained.
        </Para>

        <Para>
          This domain knowledge is genuinely scarce and valued. Companies hiring
          data engineers for their fintech, healthcare, or logistics data platforms
          actively prefer candidates who understand the domain. Lead with it in
          interviews, not apologise for it.
        </Para>

        <SubTitle>The realistic 6–9 month roadmap</SubTitle>

        <HighlightBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              {
                month: 'Month 1–2',
                color: '#00e676',
                title: 'Foundation — SQL and Python',
                tasks: [
                  'Complete a structured SQL course — focus on SELECT, JOINs, GROUP BY, window functions, CTEs',
                  'Complete Python basics — variables, loops, functions, file I/O, error handling',
                  'Build one SQL project: download a public dataset (e.g., government open data), load it into PostgreSQL, write 10 queries that answer real questions',
                  'Build one Python project: write a script that reads a CSV, cleans it, and writes a summary',
                ],
              },
              {
                month: 'Month 3–4',
                color: '#7b61ff',
                title: 'Cloud and Pipeline Basics',
                tasks: [
                  'Create a free Azure account (₹200 free credit) or AWS free tier account',
                  'Learn Azure Data Lake Storage or Amazon S3 — upload files, organise folders, set permissions',
                  'Learn Azure Data Factory (for Azure) or AWS Glue (for AWS) — build a simple ingestion pipeline',
                  'Build Project 2: write a Python script that pulls data from a public API, saves it to cloud storage, and loads it into a table',
                  'Start studying for DP-203 (Azure) or AWS Data Analytics Specialty certification',
                ],
              },
              {
                month: 'Month 5–6',
                color: '#f97316',
                title: 'The Full Pipeline — End to End',
                tasks: [
                  'Learn dbt basics — models, sources, tests, documentation',
                  'Learn Apache Airflow basics — DAGs, operators, scheduling',
                  'Build Project 3: a complete end-to-end pipeline: ingest from API → land in cloud storage → transform with dbt → load into Snowflake free trial → schedule with Airflow',
                  'Pass the cloud certification (DP-203 or AWS exam)',
                  'Document all three projects on GitHub with README files',
                ],
              },
              {
                month: 'Month 7–9',
                color: '#facc15',
                title: 'Job Search and Interview Prep',
                tasks: [
                  'Revise SQL window functions, CTEs, and optimisation until fluent',
                  'Study data modelling — star schema, SCD Type 1 and 2, facts and dimensions',
                  'Practice pipeline design questions: "How would you build X?" with written answers',
                  'Apply to 5–10 roles per week — service companies to start, product companies as confidence builds',
                  'Prepare a 5-minute story about each GitHub project: what it does, what challenges you hit, what you learned',
                  'Do mock interviews with peers or online platforms',
                ],
              },
            ].map((phase, i) => (
              <div key={i} style={{
                display: 'flex', gap: 16, paddingBottom: 24,
                borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
                paddingTop: i > 0 ? 24 : 0,
              }}>
                <div style={{ flexShrink: 0, width: 90 }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: phase.color,
                    fontFamily: 'var(--font-mono)', letterSpacing: '.06em',
                    lineHeight: 1.4,
                  }}>{phase.month}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 14, fontWeight: 800, color: 'var(--text)',
                    fontFamily: 'var(--font-display)', marginBottom: 10,
                  }}>{phase.title}</div>
                  {phase.tasks.map((task, ti) => (
                    <div key={ti} style={{
                      fontSize: 13, color: 'var(--muted)', lineHeight: 1.7,
                      paddingLeft: 14, borderLeft: `2px solid ${phase.color}40`,
                      marginBottom: 6,
                    }}>
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <SubTitle>The three projects that get you hired</SubTitle>

        <Para>
          At the entry level, hiring managers cannot assess your skills through work
          experience you do not have. Projects are what replaces that experience. Every
          project must be on GitHub, have a clear README, and be something you can
          walk through in an interview.
        </Para>

        <CodeBox label="Three projects every entry-level DE portfolio needs">{`PROJECT 1 — The Data Collection Pipeline
  What: Pull data from a real public API (RBI data, Open Government Data,
        weather API, GitHub API) and store it in organised files
  Shows: Python, API calls, file handling, scheduling
  Example: Daily script that pulls RBI exchange rates and
           appends to a Parquet file partitioned by date

PROJECT 2 — The Transformation Pipeline
  What: Take messy raw data, clean and transform it with Python + SQL,
        load into a proper table structure in a cloud database
  Shows: dbt or SQL transforms, data modelling basics, cloud storage
  Example: Download 3 months of Nifty 50 stock data,
           clean it, compute 7-day rolling averages, load to Snowflake

PROJECT 3 — The End-to-End Pipeline
  What: A complete pipeline from source to serving, scheduled automatically
  Shows: Airflow or Prefect, full Bronze→Silver→Gold, data quality checks
  Example: Daily pipeline that:
           1. Ingests public COVID data from government APIs
           2. Cleans and validates in Silver layer
           3. Computes state-level summaries in Gold layer
           4. Runs on schedule with alerting on failure
           5. Has dbt tests for row count and nulls

All three on GitHub with:
  - README explaining what it does and why
  - Architecture diagram (even a simple text diagram)
  - Setup instructions that actually work
  - Your analysis of what you learned and what you'd improve`}</CodeBox>

        <SubTitle>The resume for non-IT background DE candidates</SubTitle>

        <Para>
          Non-IT background candidates make two common mistakes on their resume:
          hiding their domain background and listing skills they do not actually have.
          Both are wrong.
        </Para>

        {[
          {
            wrong: 'Hiding domain background ("B.Pharm, 2021" buried at the bottom)',
            right: 'Lead with it in your summary: "Data engineer transitioning from pharmaceutical supply chain — 3 years understanding drug distribution data pipelines, now building the systems that handle them." Your domain knowledge is rare. Make it visible.',
          },
          {
            wrong: 'Listing Spark, Kafka, Databricks you have only watched tutorials on',
            right: 'List only what you can demonstrate in an interview. "Familiar with" is dishonest if you cannot write a simple PySpark job. Interviewers probe every skill listed. Being caught with a skill you listed but cannot demonstrate is worse than not listing it.',
          },
          {
            wrong: 'Describing projects as "Built a data pipeline using Python and Azure"',
            right: '"Built an incremental batch pipeline that ingests daily RBI exchange rate data from the public API, partitions it by date in Azure Data Lake Storage, transforms it with dbt into a clean Snowflake table, and schedules it with Airflow with alerting on failure." Specificity signals genuine experience.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '16px 20px', marginBottom: 12,
          }}>
            <div style={{
              fontSize: 12, color: 'var(--red)', fontFamily: 'var(--font-mono)',
              marginBottom: 8, lineHeight: 1.5,
            }}>
              ✕ Wrong: {item.wrong}
            </div>
            <div style={{
              fontSize: 13, color: 'var(--muted)', lineHeight: 1.7,
              paddingLeft: 12, borderLeft: '2px solid rgba(0,230,118,0.4)',
            }}>
              ✓ Right: {item.right}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 07 — Certifications ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Certifications" />
        <SectionTitle>Which Certifications Actually Matter in India (2026)</SectionTitle>

        <Para>
          Certifications matter most at the entry level when you have no work experience
          to demonstrate skills. They carry less weight once you have 3+ years of
          relevant experience — at that point, your projects and interview performance
          matter far more.
        </Para>

        <CodeBox label="DE certification guide — value vs effort for Indian market">{`CERTIFICATION              EXAM COST   PREP TIME   MARKET VALUE
──────────────────────────────────────────────────────────────────────
DP-203 Azure Data Engineer   ~$165       6–8 weeks   ★★★★★ Very high
Associate                               (~160 hrs)  Enterprise & GCC
                                                    standard, widely
                                                    recognised on resumes

AWS Certified Data            ~$300       8–10 weeks  ★★★★☆ High
Analytics - Specialty                    (~200 hrs)  Strong in startup and
                                                    AWS-first companies,
                                                    growing demand

GCP Professional Data         ~$200       6–8 weeks   ★★★☆☆ Medium
Engineer                                (~150 hrs)  Valued at Google and
                                                    GCP-first shops

Databricks Certified DE       ~$200       4–6 weeks   ★★★★☆ High
Associate                                (~100 hrs)  Strong signal for
                                                    Spark/lakehouse roles

dbt Certified Developer       $200        3–4 weeks   ★★★☆☆ Growing
                                          (~80 hrs)  Relatively new, valued
                                                    at dbt-heavy teams

DP-900 Azure Data             ~$100       2–3 weeks   ★★★☆☆ Medium
Fundamentals                             (~60 hrs)  Good first step if new
                                                    to Azure, lower signal
                                                    than DP-203

Recommended path by target company type:
  Enterprise/GCC/Microsoft shops → DP-203 first, then Databricks
  AWS-native startups            → AWS Data Analytics Specialty
  Spark-heavy companies          → Databricks DE Associate
  dbt-first teams                → dbt Certified Developer
  Non-IT background, no target yet → DP-203 (broadest recognition)`}</CodeBox>

        <Callout type="tip">
          <strong>The most common certification mistake:</strong> collecting certifications
          without building projects. A candidate with DP-203 + AWS + GCP certifications
          but no projects they can demonstrate loses to a candidate with one certification
          and three solid GitHub projects every time. Certifications prove you passed a
          test. Projects prove you can build. Build first, certify alongside.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 08 — Salary Negotiation ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Negotiation" />
        <SectionTitle>Salary Negotiation for Data Engineers in India — The Honest Guide</SectionTitle>

        <Para>
          Most candidates in India do not negotiate. This is a significant financial
          mistake. Negotiation is expected, professional, and rarely results in an
          offer being rescinded. A well-executed negotiation typically adds ₹1–4 LPA
          to a base offer with no downside risk.
        </Para>

        <SubTitle>What to say when HR asks "what is your expected CTC?"</SubTitle>

        <Para>
          Do not give a number first. Deflect until you know the budget:
          "I'm more interested in understanding the scope and growth opportunity
          of the role. Could you share the budgeted range for this position?"
          If pressed, give a range based on your research: "Based on my research,
          roles like this at companies of your profile pay ₹X–Y LPA. I'm flexible
          within that range depending on the total package."
        </Para>

        <SubTitle>Leverage points for data engineers specifically</SubTitle>

        <CodeBox label="Data engineer negotiation leverage — use these in conversations">{`LEVERAGE POINT              HOW TO USE IT
────────────────────────────────────────────────────────────────────
Competing offer             "I have an offer from [Company] for ₹X.
                             I prefer your company because [reason],
                             and I'd like to see if there's flexibility
                             to match or get close to that number."

Cloud certification         "I hold DP-203 which reduces your onboarding
                             cost and risk. I'd like that reflected in
                             the offer."

Immediate joining           If they say "immediate joiners preferred,"
                             your ability to join immediately is worth
                             ₹1–3 LPA in most cases. "I can join in
                             2 weeks — I'd like to discuss whether that
                             flexibility is reflected in the offer."

Portfolio of projects       "I've built three end-to-end pipelines on
                             my own time that demonstrate exactly what
                             you need. I'd like the offer to reflect
                             that I'll be productive from week one."

Market data                 "Glassdoor and Naukri show this role range
                             at ₹X–Y for this experience level in
                             Bangalore. Is there room to move toward the
                             upper end given my background?"

Walk-away price             Always know your minimum acceptable offer
                             before the conversation. If they cannot
                             reach it, walking away is a valid outcome.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 09 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 09 — Real World" />
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12,
          fontFamily: 'var(--font-mono)',
        }}>
          💼 What This Looks Like at Work
        </div>
        <SectionTitle>From BCom Graduate to Data Engineer — A Real Career Story</SectionTitle>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)',
            borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)',
            display: 'inline-block', marginBottom: 20, letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Composite story based on real transitions in Indian market
          </div>

          <Para>
            Priya completed a BCom degree from a tier-2 college in Coimbatore in 2022.
            She spent her first year working as a financial analyst at a small CA firm,
            spending most of her time formatting Excel sheets and reconciling accounts.
            She found herself fascinated by the data behind the numbers — where it came
            from, why it was inconsistent, and how a better system could automate
            everything she was doing manually.
          </Para>

          <Para>
            In January 2023 she decided to transition into data engineering. She had
            no programming background, no CS degree, and no contacts in the industry.
          </Para>

          <Para>
            <strong>Months 1–2:</strong> She started with SQL using free resources —
            PostgreSQL documentation and public datasets from the Indian government's
            open data portal. She built a project: loaded 2 years of NSE stock data
            into PostgreSQL, wrote queries to find sector-level trends, and documented
            everything in a GitHub README. Then she learned Python, focusing on the
            specific libraries used in data engineering: pandas, requests, and
            pathlib. She spent 2–3 hours every evening after work, 5 days a week.
          </Para>

          <Para>
            <strong>Months 3–4:</strong> She created a free Azure account and started
            studying for DP-203. She built a small project: a Python script that pulled
            daily gold price data from an RBI API, stored it as CSV in Azure Blob Storage,
            and loaded it into a simple Azure SQL table. Small, but completely working
            end-to-end on real cloud infrastructure. She passed DP-203 in month 4.
          </Para>

          <Para>
            <strong>Months 5–6:</strong> She learned dbt using the free dbt Core version
            and Airflow using the official tutorial. She built her third project: a complete
            pipeline ingesting India's COVID-19 district-level data from the government
            API, transforming it through Bronze/Silver/Gold layers with dbt, scheduled
            with Airflow on a free VM, with quality checks that alerted via email on failure.
            She wrote a detailed LinkedIn post about what she built and what she learned.
            It got 4,000 views and three recruiters messaged her.
          </Para>

          <Para>
            <strong>Month 7:</strong> She applied to 15 roles — ten at service companies
            and five at product companies. She got seven interviews. Three service companies
            offered. She joined Infosys as a Data Engineer at ₹8.5 LPA — lower than she
            wanted, but with a clear plan to move after 18 months.
          </Para>

          <Para>
            <strong>Month 24 (18 months later):</strong> With real production experience
            on Azure pipelines at an enterprise client, she applied to a Series C fintech
            startup in Bangalore. The DP-203, the GitHub projects, and 18 months of
            production pipeline work got her through to the final round. She joined as
            a Data Engineer at ₹19 LPA. Her domain background in finance — understanding
            exactly why the reconciliation logic mattered and what it meant when numbers
            did not match — made her stand out in the final interview.
          </Para>

          <Para>
            From BCom graduate to ₹19 LPA data engineer in under 3 years. With consistent
            work and a clear plan, this path is repeatable.
          </Para>
        </div>
      </section>

      <Divider />

      {/* ── Part 10 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'Q1. Why do you want to move into data engineering from a non-IT background?',
            a: `I would answer this directly and specifically, using the domain connection as a strength rather than treating the non-IT background as something to explain away.

For a finance background: "In my work as a financial analyst, I spent significant time on tasks that should not require a human — pulling reports manually, reconciling numbers from three different systems, reformatting data that arrived in inconsistent formats. I became interested in building the systems that would eliminate that manual work and make the data reliable automatically. Data engineering is exactly that: building the infrastructure that makes data available, consistent, and trustworthy without manual intervention. My finance background means I understand what the data I'll be working with actually represents, which I believe makes me more effective as a data engineer than someone who only understands the tools."

The key is to connect your background to why you are specifically suited for DE work in the domain you understand, not to present DE as a random career change that happened to appeal to you.`,
          },
          {
            q: 'Q2. How do you stay current with the rapidly changing data engineering tool landscape?',
            a: `I approach this in two layers: staying current on the categories and on the specific tools within them separately.

For categories — the fundamental problems data engineering solves — I follow the core concepts through books (Fundamentals of Data Engineering by Joe Reis and Matt Housley remains the most comprehensive overview), through conferences like Data Council and dbt Coalesce (whose talks are free online), and through company engineering blogs. Databricks, Snowflake, Airflow, and dbt all publish detailed technical posts about how they solve real production problems. Reading these keeps me current on how the industry thinks about problems.

For specific tools, I focus on the ones I use professionally rather than trying to learn every new tool. When a new tool in a category I work in gains significant adoption — like Apache Iceberg growing in the table format category — I read the documentation, understand what problem it solves differently from the existing options, and build a small prototype if the problem is relevant to my work.

I also follow a handful of data engineering practitioners on LinkedIn who share real production experiences. Practical posts about what broke in production and how it was fixed are more valuable for staying current than marketing content about new features.`,
          },
          {
            q: 'Q3. The job posting says 5+ years of experience but you have 2. Should you still apply?',
            a: `Yes, in most cases. Experience requirements in Indian DE job postings — particularly at startups and product companies — are aspirational rather than strict filters. Companies post what they ideally want and evaluate what actually applies.

The hiring decision is made on whether the candidate can do the job, not whether they meet the years requirement exactly. A candidate with 2 years of experience who has built three solid end-to-end pipeline projects, holds a relevant cloud certification, writes clean Python and SQL, and can discuss data modelling and pipeline design intelligently will be evaluated seriously against a candidate with 5 years of minimal service company ETL work.

The years requirement matters more at large enterprises and GCCs with structured HR processes that use years as an automated filter before resumes reach the hiring manager. At startups and growth-stage companies, the hiring manager usually reviews applications directly and makes judgements on fit, not years.

The practical advice: apply if you meet 70% of the technical requirements and can demonstrate the essentials through projects and certification. Write a cover note that acknowledges the years gap directly and redirects to what you have built: "I have 2 years of experience rather than 5, but I have built three production-grade pipelines that demonstrate exactly the skills this role requires." This is far more effective than hoping the years discrepancy goes unnoticed.`,
          },
          {
            q: 'Q4. How do you compare service company experience to product company experience on a resume?',
            a: `Both types of experience are legitimate, but they have different strengths and different signals to hiring managers. Understanding the difference helps you frame your experience honestly and effectively.

Service company experience signals: ability to work on client-facing projects, exposure to diverse industries and data domains, experience with enterprise-grade compliance requirements, and usually, experience with older or more established tools. The challenge is that service company data engineering work is often less technically ambitious — more ETL scripting and less platform architecture — and the stack is often more conservative than product companies.

Product company experience signals: ownership of production systems that serve real users, exposure to scale challenges, experience with modern stacks (Kafka, Spark, dbt, Airflow), and usually faster career progression because you are working on live products rather than client deliverables.

When presenting service company experience, focus on the technical specifics of what you built, not the client or the project name. "Built an incremental ingestion pipeline from Oracle ERP to Azure Synapse using ADF, handling 50M records daily with schema drift detection" signals genuine engineering work regardless of the client context. Generic descriptions like "supported client data analytics initiatives" signal low-value experience.

If your service company experience was mostly legacy tool work (Informatica, SSIS, Talend), supplement it with personal projects using modern tools before applying to product companies. The projects bridge the tool gap that hiring managers will otherwise mark against you.`,
          },
          {
            q: 'Q5. What is your expected CTC and how did you arrive at that number?',
            a: `I would answer this in two parts: the number itself, and the reasoning behind it — because showing you researched the market signals preparation and confidence.

"Based on my research on Glassdoor India, Naukri, and LinkedIn salary insights, data engineers with my experience level and skill set at product companies in Bangalore are earning between ₹X and ₹Y LPA. I'm looking for a base in the range of ₹X to ₹Y, depending on the total compensation structure including variable pay and ESOPs.

The specific number reflects: [experience level — years and specifics], [cloud certification held], [three end-to-end pipeline projects demonstrating production-level skills], and [any domain-specific value I bring]. I'm open to discussing the full package structure rather than focusing only on base salary."

The critical part of this answer is the research citation. Candidates who say "I'm looking for 20 LPA" with no reasoning signal that they either guessed or copied a number from somewhere. Candidates who say "Based on Glassdoor and AmbitionBox data for this role in Bangalore, the range is X–Y, and I'm targeting X because of [reason]" signal that they understand their market value and can justify it. That framing makes negotiation easier and signals maturity to the hiring manager.`,
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '24px 28px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 14, lineHeight: 1.4 }}>
              {item.q}
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
              {item.a}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Error Library" />
        <SectionTitle>Mistakes You Will Make — And Exactly Why They Happen</SectionTitle>

        <Para>
          This module's error library is different from the others. These are not
          technical errors — they are career errors. The mistakes that cost people
          months of progress or thousands of rupees in salary. Each one is common,
          each one is avoidable.
        </Para>

        {[
          {
            error: `Career mistake: Spending 6 months collecting certifications without building any projects`,
            cause: 'Certifications feel like progress because they have a clear syllabus, practice tests, and a pass/fail result. Projects feel uncertain — you do not know if what you built is good enough. This makes candidates over-invest in certifications and under-invest in projects. Result: resume with four certification badges and nothing to show in an interview.',
            fix: 'Certifications and projects must run in parallel. The right ratio: one certification paired with two or three projects that use the skills the certification covers. A DP-203 candidate who has also built two Azure pipelines on their free account is 5× more hireable than one who has only the certification.',
          },
          {
            error: `Interview mistake: Listing Spark, Kafka, and Databricks as skills on a resume without being able to write a basic PySpark job`,
            cause: 'Candidates copy technologies from job postings onto their resume without having genuinely used them. Interviewers probe every skill listed — "Tell me about your experience with Spark. Walk me through a job you wrote." A candidate who cannot answer this question for a skill they listed destroys credibility for everything else on the resume.',
            fix: 'List only what you can demonstrate. "Familiar with" is acceptable for tools you have read about but not used. "Experience with" means you have written code with it. "Proficient in" means you have used it in production or a substantial project. Be honest and specific — it builds more trust than exaggerated claims.',
          },
          {
            error: `Offer negotiation mistake: Accepting the first number without negotiating`,
            cause: 'In Indian workplace culture, negotiating can feel rude or ungrateful. Many candidates, particularly from non-metro backgrounds or non-IT families, are not taught that negotiation is expected and professional. They accept the first offer, then discover colleagues negotiated ₹2–3 LPA more for the same role.',
            fix: 'Always negotiate. The worst that happens is they say the offer is firm — which is acceptable and not offensive. Never negotiate aggressively or dishonestly, but always ask: "Is there flexibility on the base salary?" or "I was expecting the offer to be closer to ₹X based on my research and the skills I bring — is there room to move?" Most hiring managers have 10–20% flexibility that they will use if asked.',
          },
          {
            error: `Stack choice mistake: Spending 6 months learning Hadoop, Hive, and HDFS because a job posting listed them`,
            cause: 'Older job postings and service company postings still list legacy big data tools. Candidates who prepare for these tools spend months learning a stack that the majority of new projects are migrating away from. Hadoop is still used in production at many large enterprises — but new greenfield projects almost universally use cloud-native object storage and Spark on managed clusters instead.',
            fix: 'Check the posting date and company type. A 2026 posting from a product company listing Kafka, dbt, Snowflake, and Airflow is showing a modern stack. A 2024 posting from a large IT services firm listing Hadoop, Hive, and Sqoop is showing a legacy stack. For new learners, always learn the modern stack first (Python, SQL, cloud object storage, Spark, dbt, Airflow). You can learn legacy tools if required by a specific employer.',
          },
          {
            error: `Career positioning mistake: Spending 3 years at a service company doing spreadsheet automation labelled as "data engineering" and applying to senior DE roles at product companies`,
            cause: 'Job titles at service companies are inflated. "Data Engineer" at a service company often means "person who writes SQL queries and formats Excel for a client." Three years of that experience does not translate to three years of pipeline engineering. Applying to senior roles at product companies with this background results in rejections that feel unfair but are structurally accurate.',
            fix: 'Honestly assess whether your experience involves genuine data engineering work: building and owning pipelines that run in production, handling schema changes and failures, working with real data volumes, making architectural decisions. If the answer is mostly no, treat your current role as a foundation and supplement it with personal projects, a certification, and targeted upskilling before applying to senior product company roles.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '20px 24px', marginBottom: 16,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)',
              marginBottom: 12, background: 'rgba(255,71,87,0.08)',
              border: '1px solid rgba(255,71,87,0.2)',
              borderRadius: 6, padding: '8px 12px', lineHeight: 1.5,
            }}>
              {item.error}
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Why it happens: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>The fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'Data engineering demand in India significantly exceeds supply in 2026, with 40,000+ active openings and a 3× demand-to-supply ratio for skilled engineers. This is one of the best times in history to enter this field.',
        'Salary is determined primarily by company type, not years of experience. FAANG pays 2.1× product company rates. GCCs pay 1.42×. Service companies pay 0.72×. The same skills, same city, same experience can mean a 3× salary difference depending on where you work.',
        'Bangalore pays the most (1.3× baseline). Hyderabad and Mumbai are close (1.2×). Remote roles pay a slight premium (1.15×). Tier-2 cities pay 20% below the baseline.',
        'Python and SQL are non-negotiable in 94% and 91% of job postings respectively. Cloud experience (any) appears in 86%. Everything else is secondary to these three.',
        'Skills that are tested in interviews but not always listed in JDs: data modelling (star schema, SCD types), pipeline design (idempotency, incremental loading), SQL window functions, and systematic debugging approaches. Prepare all of these.',
        'DP-203 (Azure) is the most broadly recognised and valued certification for breaking into DE in India, appearing as preferred in 44% of enterprise and GCC postings. Build projects alongside it — certifications without projects do not get you hired.',
        'Non-IT backgrounds are genuinely valuable in data engineering. Domain knowledge of what the data means is rare and actively sought by companies building domain-specific data platforms. Lead with your domain background, do not hide it.',
        'The 6–9 month roadmap from zero to first DE job: Month 1–2 (SQL + Python + first project), Month 3–4 (cloud + pipeline basics + certification), Month 5–6 (full end-to-end project + Airflow + dbt), Month 7–9 (job search + interview prep). This is achievable with 15–20 hours per week of focused work.',
        'Three GitHub projects replace work experience for entry-level candidates: an API ingestion pipeline, a transformation pipeline with dbt, and a complete end-to-end scheduled pipeline with quality checks. Each must have a clear README and be something you can walk through in an interview.',
        'Always negotiate salary. Always. The worst outcome of negotiating is being told the offer is firm — which is acceptable and not offensive. Most hiring managers have 10–20% flexibility that they will only use if asked. Accepting the first number is a financial mistake that compounds over your career.',
      ]} />

    </LearnLayout>
  )
}