import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Data Engineering in the US Job Market (2026) — Data Engineering | Chaduvuko',
  description:
    'Real 2026 salary data, top hiring companies, in-demand skills, how to read a JD, how to break in from a non-CS background, and everything you need to navigate the US data engineering job market.',
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

const SubSubTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{children}</h4>
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

const Output = ({ children }: { children: string }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{
      fontSize: 10, fontWeight: 700, color: 'var(--muted)',
      letterSpacing: '.1em', textTransform: 'uppercase',
      marginBottom: 6, fontFamily: 'var(--font-mono)',
      display: 'flex', alignItems: 'center', gap: 6,
    }}>
      <span style={{ opacity: 0.6 }}>▸</span> output
    </div>
    <pre style={{
      background: 'transparent', border: '1px dashed var(--border)',
      borderRadius: 10, padding: '14px 22px', overflowX: 'auto',
      fontSize: 13, lineHeight: 1.8, color: 'var(--muted)',
      fontFamily: 'var(--font-mono)', margin: 0, whiteSpace: 'pre-wrap',
    }}>
      <code>{children}</code>
    </pre>
  </div>
)

const TryThis = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.25)',
    borderRadius: 10, padding: '16px 20px', marginBottom: 24,
    display: 'flex', gap: 12, alignItems: 'flex-start',
  }}>
    <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.5 }}>⌨️</span>
    <div>
      <div style={{
        fontSize: 10, fontWeight: 700, color: 'var(--accent2)',
        letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6,
        fontFamily: 'var(--font-mono)',
      }}>Try this yourself</div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75 }}>{children}</div>
    </div>
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

export default function DEUsaJobMarketModule() {
  return (
    <LearnLayout
      title="Data Engineering in the US Job Market (2026)"
      description="Salaries, companies, skills, JD decoding, and breaking in from a non-CS background."
      section="Data Engineering — Module 06"
      readTime="50 min"
      updatedAt="August 2026"
    >

      {/* ── Part 01 — State of the Market ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The State of the Market" />
        <SectionTitle>Data Engineering in the US — 2026 Reality</SectionTitle>

        <Para>
          Data engineering is one of the fastest-growing and highest-compensating
          technology disciplines in the US right now. The demand for skilled data
          engineers significantly exceeds the supply — particularly for engineers who
          understand both the engineering and the data architecture sides of the role,
          not just the tools.
        </Para>

        <Para>
          The growth is being driven by three forces simultaneously. First, consumer
          internet and fintech companies — DoorDash, Stripe, Airbnb, Brex, Robinhood,
          Instacart — have scaled to tens of millions of users and are now generating
          data volumes that require serious engineering to handle. Second, large
          enterprises — JPMorgan, Walmart, Amazon, Microsoft, Google — are building
          massive internal data platform teams, often paying well above the market
          median for senior talent. Third, the AI and ML wave has increased demand for
          the data pipelines that feed ML models — every company building AI features
          needs data engineers to prepare the training and inference data.
        </Para>

        <HighlightBox>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
            {[
              { stat: '35,000+', label: 'DE job openings in the US', sub: 'Active listings, March 2026' },
              { stat: '2.6×', label: 'Demand vs supply ratio', sub: 'Skilled DEs vs open roles' },
              { stat: '14%', label: 'YoY salary growth', sub: 'Mid-level DE, national median' },
              { stat: '$130K–$175K', label: 'Mid-level DE range', sub: 'Total comp, product co., national median' },
              { stat: '8–9 months', label: 'Time to first job', sub: 'From non-CS with the right prep' },
              { stat: '61%', label: 'Roles prefer cloud cert', sub: 'AWS, Azure, or GCP cert' },
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
          Levels.fyi, Glassdoor, LinkedIn Salary Insights, and BLS Occupational
          Employment data, cross-referenced with data engineering community surveys.
          All figures reflect March 2026 data. Figures are base salary unless
          explicitly marked total comp — bonus and equity (RSUs) typically add
          15–45% at product companies and public tech companies on top of base,
          and can add significantly more at pre-IPO startups if the exit is favorable.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 — Salary Data ────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Real Salary Data" />
        <SectionTitle>Salaries — What Data Engineers Actually Earn in the US</SectionTitle>

        <Para>
          Salary data for data engineering in the US is scattered and often
          misleading — job boards conflate data analyst, data scientist, and data
          engineer salaries, and the ranges are wide enough to be unhelpful without
          context. Here is the breakdown by experience level, city, and company type
          with enough specificity to be genuinely useful for career planning.
        </Para>

        <SubTitle>By experience level — national median, product company baseline</SubTitle>

        <CodeBox label="DE salary by experience — product company, national median (2026)">{`Level              Years     Base Salary Range    Total Comp (with equity)
──────────────────────────────────────────────────────────────────────
Junior DE          0–2 yrs   $75K–$100K           $80K–$110K
                             Entry into DE from
                             non-CS or CS new grad

Data Engineer      2–4 yrs   $100K–$140K          $130K–$175K
                             Owns pipelines end-
                             to-end independently

Senior DE          4–7 yrs   $140K–$185K          $155K–$215K
                             Designs systems,
                             mentors, cross-team

Staff / Lead DE    7–10 yrs  $185K–$240K          $215K–$290K
                             Technical strategy,
                             platform decisions

Principal DE       10+ yrs   $240K–$320K+         $290K–$420K+
                             Company-level data
                             platform vision

Notes:
  → These are base salary ranges at well-paying product companies
  → Consulting firms (Accenture/Deloitte) pay 25–35% below these ranges
  → Large enterprises (JPMorgan, Walmart, banks) pay 10–20% above
  → FAANG (Amazon, Google, Meta) pay 55–90% above via base + RSU value
  → Equity at funded startups can add $20K–$300K+ in value if the exit lands`}</CodeBox>

        <SubTitle>City multipliers — how location affects salary</SubTitle>

        <Para>
          The San Francisco Bay Area pays the most for data engineering in the US
          and is the reference point for all comparisons. Other cities pay varying
          multiples of the Bay Area base depending on the density of tech companies
          and local cost of living.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, marginBottom: 24 }}>
          {[
            { city: 'SF Bay Area', mult: '1.30×', note: 'Highest density of product companies and FAANG HQs', color: '#00e676', example: '$150K base → $195K' },
            { city: 'Seattle', mult: '1.20×', note: 'Amazon, Microsoft, and a growing GCP presence', color: '#00e676', example: '$150K base → $180K' },
            { city: 'New York City', mult: '1.20×', note: 'Strong fintech sector (Stripe, Robinhood, Brex)', color: '#00e676', example: '$150K base → $180K' },
            { city: 'Austin', mult: '1.05×', note: 'Fast-growing hub, Tesla/Apple/Google offices', color: '#facc15', example: '$150K base → $157K' },
            { city: 'Boston', mult: '1.05×', note: 'Mix of biotech, fintech, and established tech', color: '#facc15', example: '$150K base → $157K' },
            { city: 'Chicago', mult: '0.95×', note: 'Reference city for enterprise benchmarking', color: '#f97316', example: '$150K base → $142K' },
            { city: 'Remote (US)', mult: '1.10×', note: 'Many companies pay a premium to hire nationally', color: '#00e676', example: '$150K base → $165K' },
            { city: 'Lower COL Metros', mult: '0.85×', note: 'Columbus, Raleigh, Tampa — growing but limited', color: '#ff4757', example: '$150K base → $127K' },
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
          working at a consulting firm and a FAANG operation is often 2–3× for the
          same role, experience, and city.
        </Para>

        <CodeBox label="Salary multiplier by company type — applied to national mid-level base">{`Company Type          Multiplier   Mid-level Total Comp  Why
──────────────────────────────────────────────────────────────────────
FAANG / AI Labs       1.75×        $175K–$260K           Stock + high base,
(Amazon, Google,                                          competitive global
Meta, OpenAI)                                             talent market

Large Enterprise      1.15×        $150K–$185K           Stable pay bands,
(JPMorgan, Walmart,                                       large-scale platform
Banks, Insurance)                                          work

High-Growth Startup   1.10×        $115K–$150K           Equity adds value,
(Brex, Instacart,                                          high learning rate,
Stripe, Robinhood)                                        higher risk

Product Company       1.00×        $130K–$175K           Benchmark —
(Mid-size, funded)                                        DoorDash, Shopify,
                                                           Airbnb, Databricks

Enterprise Software    0.95×        $125K–$165K           IBM, Oracle, SAP,
(non-FAANG)                                                stable but slower-
                                                            moving stacks

Consulting             0.70×        $95K–$130K            Accenture, Deloitte, KPMG,
(IT services)                                              Cognizant — volume
                                                            hiring, lower pay

Note: "Mid-level Total Comp" above is total compensation (base + bonus/
equity), not base-only — see the experience-level table above for
base-only figures by level.

Note on consulting firms: While salary is lower, consulting firms provide
structured training, large enterprise client exposure, and a recognizable
brand on a resume. Many engineers start here and move to product companies
after 2–3 years.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 03 — Top Hiring Companies ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Who Is Hiring" />
        <SectionTitle>Top Companies Hiring Data Engineers in the US (2026)</SectionTitle>

        <Para>
          These are the companies with consistent, high-volume data engineering hiring
          in the US right now. They are grouped by category with notes on what the
          work actually looks like at each type.
        </Para>

        {[
          {
            category: 'High-Growth Product Companies',
            color: '#00e676',
            desc: 'The highest-learning environments for data engineering. Fast-growing data volumes, modern stacks, real production problems. Equity can be valuable at pre-IPO companies.',
            companies: [
              { name: 'DoorDash', roles: 'DE, Analytics Eng, Data Platform', stack: 'Spark, Kafka, Airflow, dbt, Snowflake', note: 'Strong data platform team, good mentorship' },
              { name: 'Airbnb', roles: 'DE, Data Platform Eng', stack: 'Spark, Airflow, Druid, Kafka', note: 'Mature data platform, high engineering bar' },
              { name: 'Shopify', roles: 'DE, Analytics Eng', stack: 'Spark, dbt, Redshift, Airflow', note: 'Fast-growing, significant data engineering investment' },
              { name: 'Stripe', roles: 'DE, Data Infra', stack: 'Spark, Kafka, ClickHouse, Airflow', note: 'Payments data at scale, real-time requirements' },
              { name: 'Brex', roles: 'DE, Analytics Eng', stack: 'dbt, Snowflake, Airflow, Kafka', note: 'Modern stack, strong engineering culture' },
              { name: 'Robinhood', roles: 'DE, Data Eng', stack: 'Python, PostgreSQL, Redshift, Kafka', note: 'Fintech, growing data teams' },
              { name: 'Instacart', roles: 'DE, Data Platform', stack: 'Kafka, Spark, BigQuery', note: 'Real-time supply chain and marketplace data' },
              { name: 'Databricks / Snowflake', roles: 'DE, Analytics Eng', stack: 'Their own platforms, Python, SQL', note: 'Building the tools other data engineers use' },
            ],
          },
          {
            category: 'Large Enterprises',
            color: '#4285f4',
            desc: 'High absolute salaries at senior levels, with the most stable pay bands. Work on internal data platforms with access to enterprise-scale problems and often deep legacy systems to modernize.',
            companies: [
              { name: 'JPMorgan Chase', roles: 'DE, Data Platform, Quant Data Eng', stack: 'Spark, Python, internal platforms', note: 'Finance data at global scale, compliance-heavy' },
              { name: 'Goldman Sachs', roles: 'DE, Data Engineer', stack: 'Slang (internal), Python, AWS', note: 'Proprietary tech stack, top-tier comp' },
              { name: 'Walmart Global Tech', roles: 'DE, Data Platform Eng', stack: 'Spark, Kafka, Hive, Azure', note: 'Retail data at massive scale, legacy + modern mix' },
              { name: 'Amazon (AWS/Retail)', roles: 'DE, SDE-Data', stack: 'AWS native, Redshift, Glue, Kinesis', note: 'AWS-first stack, data engineering at Amazon scale' },
              { name: 'Microsoft', roles: 'DE, Data Eng (Azure)', stack: 'Azure-native, Databricks, Synapse', note: 'Azure stack depth, Azure certification valued' },
              { name: 'Google', roles: 'DE, Data Eng', stack: 'GCP-native, BigQuery, Dataflow, Pub/Sub', note: 'GCP depth, SWE-like hiring bar' },
            ],
          },
          {
            category: 'Consulting Firms',
            color: '#f97316',
            desc: 'Lower salary but large data engineering teams with consistent hiring. Good for getting a first job and building structured experience before moving to product companies.',
            companies: [
              { name: 'Accenture', roles: 'Data Engineer, ETL Developer', stack: 'Informatica, SQL, basic Azure/AWS', note: 'Volume hiring, structured training programs' },
              { name: 'Deloitte', roles: 'Data Engineer, Big Data Eng', stack: 'Hadoop, Spark, SQL, cloud basics', note: 'Structured training track, client placement' },
              { name: 'KPMG', roles: 'Data Engineer, Analytics Dev', stack: 'Azure/AWS, SQL, Talend', note: 'Large data practice, many enterprise clients' },
              { name: 'Cognizant', roles: 'Data Engineer, BI Developer', stack: 'SQL, SSIS, Azure, Power BI', note: 'Banking and healthcare client focus' },
              { name: 'PwC', roles: 'Data Engineer, Cloud Data Eng', stack: 'Azure Databricks, ADF, Snowflake', note: 'Client-facing cloud data engineering work' },
            ],
          },
          {
            category: 'Analytics Consultancies and Niche Players',
            color: '#7b61ff',
            desc: 'Work across multiple client industries. Faster exposure to different data problems. Often a stepping stone to product companies.',
            companies: [
              { name: 'Palantir', roles: 'Forward Deployed Eng / Data Eng', stack: 'Python, SQL, custom platforms', note: 'Embedded consulting, proprietary training' },
              { name: 'ThoughtWorks', roles: 'Data Engineer', stack: 'Modern cloud, dbt, Airflow, Spark', note: 'Strong engineering culture, client delivery focus' },
              { name: 'Slalom', roles: 'Data Engineer', stack: 'AWS/Azure, Spark, dbt', note: 'Mid-size, specialised data engineering practice' },
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
        <SectionTitle>What US Companies Actually Hire For — The Real Skill Map</SectionTitle>

        <Para>
          Job descriptions list dozens of tools, but hiring managers actually filter
          on a much smaller set of core competencies. Here's what genuinely moves the
          needle in a US data engineering interview, ranked by how often it appears
          as a hard requirement rather than a "nice to have."
        </Para>

        <SubTitle>Tier 1 — Non-negotiable (appears in 90%+ of JDs)</SubTitle>
        <CodeBox label="Core skills every US DE role expects">{`SQL (Advanced)        Window functions, CTEs, query optimization,
                       reading EXPLAIN plans. This is tested in almost
                       every interview loop, often live.

Python                Clean, production-grade code — not notebooks.
                       Comfortable with OOP, testing, and packaging.

A Cloud Platform       AWS, Azure, or GCP — pick one and go deep rather
(pick one)             than shallow across all three. AWS has the
                       largest market share of DE job postings.

Data Modeling          Star schema, dimensional modeling, understanding
                       when to normalize vs. denormalize for analytics.

Orchestration          Airflow is still the market standard, though
                       Dagster and Prefect are gaining share at
                       modern startups.`}</CodeBox>

        <SubTitle>Tier 2 — Strong differentiators (appears in 40–70% of JDs)</SubTitle>
        <CodeBox label="Skills that separate mid from senior candidates">{`Spark / Distributed Computing    Processing data at a scale where a
                                  single machine can't keep up.

dbt                               The default transformation layer at
                                  modern data companies. Fast to learn,
                                  expected at analytics-forward teams.

Streaming (Kafka/Kinesis/Flink)   Increasingly expected for senior
                                  roles as more companies move toward
                                  real-time analytics.

Data Warehouse Internals          Snowflake, BigQuery, or Redshift —
                                  understanding partitioning, clustering,
                                  and cost optimization, not just SQL.

CI/CD & Infrastructure as Code    Terraform, Docker, GitHub Actions.
                                  Senior DE roles expect you to own
                                  deployment, not just write pipelines.`}</CodeBox>

        <Callout type="tip">
          Depth beats breadth. A candidate who can talk in real detail about one
          production Spark pipeline they built and debugged will beat a candidate
          who lists ten tools they've only used in tutorials. Interviewers probe for
          depth within the first two follow-up questions.
        </Callout>

        <TryThis>
          Take your own resume or portfolio and pick the single project you know
          best. Write out, from memory, five follow-up questions an interviewer
          could reasonably ask about it — then check whether you can actually
          answer all five in real depth. Any gap is worth closing before you
          list that project as a strength.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 05 — Reading a JD ───────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Decoding Job Postings" />
        <SectionTitle>How to Read a US DE Job Posting — What They Really Mean</SectionTitle>

        <Para>
          US job postings use a specific vocabulary that isn't always literal. Knowing
          how to translate it saves you from over-filtering yourself out of roles
          you're actually qualified for, and from under-preparing for ones you're not.
        </Para>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[
            { phrase: '"5+ years of experience required"', meaning: 'Often negotiable for strong candidates with 3+ years and a solid portfolio — especially at startups. Rigid at large enterprises and government-adjacent companies.' },
            { phrase: '"Must be authorized to work in the US"', meaning: 'The company will not sponsor a visa for this role. This is a hard filter — read it literally. Roles that do sponsor usually say "sponsorship available" or list it explicitly in the benefits section.' },
            { phrase: '"Bachelor\'s degree in CS or related field, or equivalent experience"', meaning: 'The "or equivalent experience" clause is real and increasingly common. A strong portfolio and demonstrated skill can substitute for the degree requirement at most product companies and startups — less so at large enterprises and government contractors.' },
            { phrase: '"Fast-paced environment"', meaning: 'Expect ambiguity, shifting priorities, and less process than a large enterprise. Common at startups — not necessarily bad, but know what you\'re signing up for.' },
            { phrase: '"Ownership mentality"', meaning: 'You will be expected to make decisions without a manager specifying every detail. Common at product companies and startups; less emphasized at large enterprises where process is more defined.' },
            { phrase: '"Competitive salary + equity"', meaning: 'Always ask for the actual number and the equity details (RSUs vs. options, vesting schedule, current 409A valuation if a private company) before accepting an offer.' },
          ].map((item) => (
            <div key={item.phrase} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '16px 18px',
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                {item.phrase}
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
                {item.meaning}
              </div>
            </div>
          ))}
        </div>

        <Callout type="warning">
          If you're an international student or on a visa that requires sponsorship,
          filter job postings for this explicitly before applying — it saves significant
          time. Many company career pages let you filter by sponsorship availability,
          and it's a fair, direct question to ask a recruiter in a first screening call.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 06 — Breaking In From Non-CS ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — The Non-CS Path" />
        <SectionTitle>Breaking Into Data Engineering From a Non-CS Background</SectionTitle>

        <Para>
          A large share of working data engineers in the US did not start with a
          computer science degree. The path is well-worn — community college
          transfers, coding bootcamp graduates, and fully self-taught engineers all
          land data engineering roles every year. What matters is what you can
          demonstrably build, not what your degree says.
        </Para>

        <SubTitle>The three realistic entry paths</SubTitle>

        <CodeBox label="Non-CS entry paths, ranked by typical time-to-first-job">{`Path                    Typical Timeline   Cost          Notes
──────────────────────────────────────────────────────────────────
Self-taught +           6–10 months        $0–$500       Slowest but
Portfolio Projects                          (courses)     cheapest. Requires
                                                            strong self-discipline
                                                            and a genuinely
                                                            impressive portfolio.

Coding Bootcamp         4–6 months          $10K–$20K     Structured, includes
(data-eng or SWE-        + job hunt                       job-search support.
focused)                                                  Look for placement
                                                           rate transparency.

Community College /     1–2 years           $3K–$10K      Slower but builds
Associate's Degree                                        genuine CS fundamentals
                                                            and can transfer credit
                                                            toward a 4-year degree.`}</CodeBox>

        <SubTitle>What actually gets you hired without a CS degree</SubTitle>

        <Para>
          Hiring managers at product companies and startups care about three things,
          in this order: can you demonstrably build a working data pipeline, can you
          explain the tradeoffs in your design decisions, and can you communicate
          clearly with non-technical stakeholders. A degree is a proxy for these
          things — it is not the only proxy.
        </Para>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { title: 'A real, end-to-end project', desc: 'Not a tutorial clone. Ingest real data (a public API or dataset), transform it, load it into a warehouse, and document your design decisions in a README.' },
            { title: 'GitHub with clean commit history', desc: 'Recruiters and hiring managers do look. Clean code, meaningful commit messages, and a well-written README matter more than raw project count.' },
            { title: 'One deep project beats five shallow ones', desc: 'A single pipeline you can discuss in real depth for 20 minutes in an interview is worth more than five weekend projects you can only describe at a surface level.' },
            { title: 'A relevant cloud certification', desc: 'AWS or Azure fundamentals certifications signal genuine effort and give recruiters a concrete, verifiable data point when your resume otherwise lacks a CS pedigree.' },
          ].map((item) => (
            <div key={item.title} style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '16px',
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>
                {item.title}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Part 07 — Certifications ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Certifications" />
        <SectionTitle>Which Certifications Actually Matter in the US (2026)</SectionTitle>

        <Para>
          Certifications are not a substitute for real project experience, but they
          are a fast, verifiable signal — especially valuable if you're coming from a
          non-CS background or switching careers and don't yet have a work history in
          tech to point to.
        </Para>

        <CodeBox label="Certifications ranked by hiring-manager relevance for DE roles">{`Certification                          Relevance   Notes
──────────────────────────────────────────────────────────────
AWS Certified Data Engineer            High        AWS has the largest market
– Associate                                        share of DE job postings.
                                                    Directly relevant content.

Microsoft Azure Data Engineer          High        Valuable specifically at
Associate (DP-203)                                 companies already on Azure
                                                    (common in large enterprises).

Google Cloud Professional              Medium-High Smaller market share than
Data Engineer                                      AWS/Azure but growing,
                                                    especially at AI-forward
                                                    companies.

Databricks Certified                   Medium      Valuable if the target
Data Engineer Associate                            company uses Databricks —
                                                    increasingly common.

dbt Fundamentals                       Low-Medium  Free, fast to complete,
                                                    signals familiarity with
                                                    the modern data stack.`}</CodeBox>

        <Callout type="tip">
          Pick the certification that matches the cloud platform used by the
          companies you're actually targeting — check their job postings and
          engineering blog before choosing. A cert for a platform you'll never use
          professionally wastes study time better spent on a portfolio project.
        </Callout>

        <TryThis>
          Pull up the job postings of three companies you'd actually want to work
          for and tally which cloud platform (AWS, Azure, GCP) appears most often.
          Compare that against whichever certification you were already planning
          to pursue — if they don't match, that's worth reconsidering before you
          spend weeks studying for the wrong one.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 08 — Salary Negotiation ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Negotiation" />
        <SectionTitle>Salary Negotiation for Data Engineers in the US — The Honest Guide</SectionTitle>

        <Para>
          US tech salary negotiation is different from most of the world in one key
          way: it's expected, and companies build room into their initial offer
          anticipating a counter. Not negotiating is the single most common way
          candidates leave money on the table.
        </Para>

        <SubTitle>The core rules</SubTitle>

        <CodeBox label="Negotiation principles that actually work">{`1. Never give the first number.
   If asked for salary expectations, redirect: "I'd love to learn
   more about the role first — what's the budgeted range?"

2. Get competing offers before negotiating.
   A single offer gives you almost no leverage. Two offers, even
   if one is less exciting, gives you real negotiating power.

3. Negotiate total compensation, not just base.
   Base salary, signing bonus, equity (RSU count and vesting
   schedule), and annual bonus target are all negotiable
   independently. A lower base with more equity can be worth
   more — or less — depending on the company's trajectory.

4. Use data, not feelings.
   Reference Levels.fyi and Glassdoor figures for the specific
   company and level. "Based on public data for this level at
   your company, I was expecting closer to $X" is far stronger
   than "I think I deserve more."

5. Get it in writing before you resign your current job.
   Verbal offers can and do change. Wait for the signed offer
   letter.`}</CodeBox>

        <Callout type="example">
          A candidate with a competing offer at $145K received an initial offer of
          $155K base from their target company. By citing the competing offer and
          Levels.fyi data for the role and level, they negotiated the final offer to
          $172K base plus an increased equity grant — a 24% increase over the intial
          offer, achieved in a single negotiation email.
        </Callout>
      </section>

      <Divider />

      {/* ── Misconceptions ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Five Misconceptions About the US Data Engineering Job Market</SectionTitle>

        {[
          {
            wrong: '"You need a CS degree to get hired as a data engineer in the US"',
            right: 'Part 06 is explicit that a large share of working data engineers did not start with a CS degree — the "or equivalent experience" clause in job postings (Part 05) is real and increasingly common at product companies and startups. A strong portfolio and demonstrated skill substitute for the degree at most non-enterprise employers.',
          },
          {
            wrong: '"The salary number in a job posting or on Glassdoor is basically fixed — there\'s not much room to negotiate"',
            right: 'Part 08 is direct that US tech salary negotiation is expected, and companies build room into their initial offer anticipating a counter — the worked example shows a 24% increase achieved in a single negotiation email. Not negotiating is called out as the single most common way candidates leave money on the table.',
          },
          {
            wrong: '"City determines your salary more than anything else — just move to San Francisco or Seattle"',
            right: 'Part 02\'s "Company type multipliers" section is explicit that company type has a bigger impact on salary than city — the FAANG-vs-consulting gap for the same role, experience, and city is often 2-3×, larger than any city multiplier in that same Part.',
          },
          {
            wrong: '"Listing as many tools as possible on your resume maximizes your chances"',
            right: 'Part 04\'s Callout and this module\'s first TryThis both make the opposite case: interviewers probe for depth within the first two follow-up questions, and a thin list of tools you can discuss deeply beats a long list that collapses under questioning.',
          },
          {
            wrong: '"If you\'re getting rejected or hearing silence, it means you\'re not qualified"',
            right: 'Part 09\'s real career story reports roughly 100+ applications and single-digit interview conversion as the realistic range for a disciplined non-CS candidate — not evidence of being unqualified. This module\'s Common Mistakes and Error Library sections both cover the structural reasons (resume tailoring, ATS filtering) that explain most of this gap.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 09 — Real World ─────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 09 — Real World" />
        <SectionTitle>From Retail Manager to Data Engineer — A Real Career Story</SectionTitle>

        <Para>
          Composite story based on common patterns among Chaduvuko learners who broke
          into data engineering from a non-technical background.
        </Para>

        <HighlightBox>
          <Para>
            <strong>Starting point:</strong> A retail store manager with a bachelor's
            degree in Business Administration, no programming background, working
            60-hour weeks and looking for a career with better work-life balance and
            higher earning ceiling.
          </Para>
          <Para>
            <strong>Months 1–3:</strong> Learned Python and SQL fundamentals through
            free resources during evenings and weekends. Built the first small project —
            a script that pulled data from a public API and loaded it into a local
            SQLite database. Unimpressive by portfolio standards, but it proved the
            core loop was learnable.
          </Para>
          <Para>
            <strong>Months 4–7:</strong> Enrolled in a part-time, remote data
            engineering bootcamp while still working retail. Built two more
            substantial projects: an Airflow-orchestrated pipeline pulling weather
            data into a cloud data warehouse, and a dbt project transforming raw
            e-commerce data into analytics-ready tables. Got AWS Cloud Practitioner
            and then AWS Data Engineer Associate certified.
          </Para>
          <Para>
            <strong>Months 8–9:</strong> Applied to roughly 120 positions.
            Most were silence or rejection. Landed 6 first-round interviews, largely
            from roles where the JD explicitly said "or equivalent experience."
            Two progressed to technical rounds. One offer came through — Data
            Engineer at a mid-size logistics startup, $92K base, fully remote.
          </Para>
          <Para>
            <strong>Where they are now (18 months in):</strong> Promoted once,
            now earning $118K base plus equity. Actively interviewing for senior
            roles at larger product companies using the same portfolio-first
            approach that got the first job.
          </Para>
        </HighlightBox>

        <Callout type="info">
          The honest numbers: roughly 100+ applications, single-digit interview
          conversion, and 8–9 months from starting to learn to first offer. This is
          the realistic range for a disciplined non-CS candidate, not the outlier
          "landed a job in 6 weeks" stories that circulate online.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 10 — Interview Prep ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="prep">
        <SectionTag text="// Part 10 — Interview Prep" />
        <SectionTitle>5 Interview Questions — With Complete Answers</SectionTitle>

        {[
          {
            q: 'How would you design a pipeline to ingest 10 million events per day from a third-party API into a data warehouse?',
            a: 'Start by clarifying requirements: latency needs (batch vs. near-real-time), data volume growth expectations, and downstream consumers. For a batch approach: use an orchestrator (Airflow) to poll the API on a schedule, land raw data in object storage (S3) as the source of truth, then load into the warehouse via a managed loader. For near-real-time: consider a message queue (Kafka/Kinesis) if the API supports webhooks or streaming, with a stream processor writing to the warehouse in micro-batches. Always discuss idempotency (handling retries without duplicating data), schema evolution (the API will change), and monitoring (alerting on ingestion lag or failure).',
          },
          {
            q: 'Explain the difference between a data lake and a data warehouse, and when you\'d use each.',
            a: 'A data warehouse stores structured, schema-on-write data optimized for fast analytical queries — used when you know your query patterns in advance and need strong performance and governance (BI dashboards, reporting). A data lake stores raw, often unstructured or semi-structured data with schema-on-read — used when you need flexibility to store diverse data types cheaply and figure out the schema later (ML training data, exploratory analysis, archival). Most modern architectures use both together (a "lakehouse" pattern, e.g. Databricks or a lake feeding a warehouse) — raw data lands in the lake, gets cleaned and modeled, then loads into the warehouse for consumption.',
          },
          {
            q: 'How do you handle schema changes in a production pipeline without breaking downstream consumers?',
            a: 'Prefer additive, backward-compatible changes (new nullable columns) over breaking changes (renaming or removing columns, changing types). Use a schema registry if working with streaming data (Kafka + Avro/Protobuf) to enforce compatibility rules automatically. For batch pipelines, version your schemas and use tools like dbt\'s contracts or Great Expectations to validate incoming data against an expected schema before it propagates downstream. Communicate breaking changes to consumers in advance with a deprecation window, and maintain both old and new schema versions during the transition if the consumer base is large.',
          },
          {
            q: 'A daily batch job that used to take 20 minutes now takes 3 hours. How do you debug it?',
            a: 'Start with what changed: data volume growth, a code change, a cluster configuration change, or an upstream data quality issue causing unexpected joins/skew. Check the query plan (EXPLAIN) for the slowest stage of the pipeline — look for data skew (one partition doing disproportionate work), unnecessary shuffles, or a missing partition filter causing a full table scan. Check cluster metrics (CPU, memory, spill-to-disk) to rule out resource contention. If using Spark, check the Spark UI for stage-level timing. Fix the root cause rather than just scaling up the cluster, which masks the problem and increases cost.',
          },
          {
            q: 'How do you ensure data quality in a pipeline that multiple teams depend on?',
            a: 'Implement automated checks at ingestion (schema validation, null checks, range checks) and post-transformation (row count reconciliation, referential integrity, freshness checks) using a framework like Great Expectations or dbt tests. Set up alerting so failures page someone before bad data reaches dashboards, not after. Maintain a data catalog with clear ownership so consumers know who to contact. For critical pipelines, consider a staging layer where data is validated before being promoted to production tables, so a bad run never silently corrupts the tables everyone queries.',
          },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 24 }}>
            <div style={{
              display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10,
            }}>
              <div style={{
                flexShrink: 0, width: 24, height: 24, borderRadius: '50%',
                background: 'var(--accent-glow)', color: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800, fontFamily: 'var(--font-mono)',
              }}>{i + 1}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.5, fontFamily: 'var(--font-display)' }}>
                {item.q}
              </div>
            </div>
            <div style={{
              marginLeft: 34, fontSize: 14, color: 'var(--muted)',
              lineHeight: 1.8, background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '14px 18px',
            }}>
              {item.a}
            </div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Common Mistakes ───────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Mistakes You Will Make — And Exactly Why They Happen</SectionTitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { mistake: 'Applying to 200+ jobs with the same generic resume', why: 'Applicant tracking systems and human reviewers both filter fast. A resume tailored to the specific JD\'s keywords and requirements converts at a meaningfully higher rate than a one-size-fits-all version.' },
            { mistake: 'Listing every tool you\'ve ever touched instead of what you can actually discuss in depth', why: 'Interviewers ask follow-up questions on anything listed. A thin list of tools you can discuss deeply beats a long list that collapses under two follow-up questions.' },
            { mistake: 'Not clarifying work authorization status upfront if it requires sponsorship', why: 'This wastes both your time and the recruiter\'s if discovered late in the process. Address it directly and early — most experienced recruiters appreciate the directness.' },
            { mistake: 'Negotiating with emotion instead of data', why: '"I really need this" is a weak negotiating position. "Based on public data for this level, the market rate is X" is a strong one. Always negotiate with a specific number and a specific source.' },
            { mistake: 'Underestimating how long the US job search actually takes', why: 'Median time from active search to signed offer for a career switcher is realistically 3–6 months, not the 4–6 week timelines that circulate in viral success stories. Budget your finances and expectations accordingly.' },
            { mistake: 'Skipping the behavioral interview prep because "it\'s just the technical round that matters"', why: 'Most US tech companies weight behavioral rounds heavily, often as a hard gate regardless of technical performance. Prepare specific, structured stories (the STAR format) in advance — don\'t improvise them live.' },
          ].map((item) => (
            <div key={item.mistake} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderLeft: '3px solid #ff6b6b', borderRadius: '0 10px 10px 0',
              padding: '14px 18px',
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#ff6b6b', marginBottom: 6 }}>
                {item.mistake}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
                {item.why}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Job Search Breakdowns — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `Application submitted through the company careers page — no response, no rejection email, complete silence after three weeks`,
            cause: 'The resume was filtered out by the Applicant Tracking System (ATS) before any human reviewed it. Most large-company ATS software scores resumes against the exact keywords in the job description — a resume that says "data pipelines" when the JD says "ETL pipelines" can score low enough to never surface, even from a genuinely qualified candidate.',
            fix: 'Mirror the exact terminology from the job description in the resume (without lying about experience) — if the JD says "data warehousing," use that phrase, not a close synonym. For roles at companies known to use aggressive ATS filtering, apply through a referral or direct recruiter message in parallel with the formal application, since a human-forwarded application usually bypasses the ATS scoring step entirely.',
          },
          {
            error: `Recruiter phone screen ends abruptly right after the candidate states their salary expectation`,
            cause: 'The stated number was either far below the role\'s actual level (signaling the candidate may be under-qualified or a poor culture fit for a more senior title) or far above the budgeted range for that specific req — either way, the recruiter has no room to continue the conversation productively.',
            fix: 'Per Part 08, never give the first number — redirect and ask for the budgeted range instead. If pressed, research the specific level and company on Levels.fyi beforehand and give a wide, well-researched range rather than a single guessed figure, so the number reflects the actual role rather than a generic industry average.',
          },
          {
            error: `Technical interview goes well, but the process goes silent after the take-home assignment is submitted`,
            cause: 'Most take-home assignments are evaluated primarily on code quality, testing, and documentation — not just whether the output is correct. A working solution with no tests, no error handling, and no README explaining design decisions reads as unfinished, even if the core logic is right.',
            fix: 'Treat every take-home as a portfolio piece, not just a puzzle to solve: include basic tests, handle at least the obvious edge cases, and write a short README explaining the design trade-offs made under the time constraint. This directly reflects the "explain the tradeoffs in your design decisions" criterion from Part 06.',
          },
          {
            error: `A verbal offer is extended over a call, but the candidate resigns from their current job before receiving anything in writing — then the signed offer never arrives`,
            cause: 'Verbal offers can and do change or fall through — a budget freeze, a hiring-manager change, or an internal approval that never finalizes can all cause a verbal offer to quietly disappear, and without a resignation already submitted, the downside is limited.',
            fix: 'Part 08\'s negotiation rules are explicit: get the offer in writing before resigning a current job. This is not paranoia — it is standard practice, and no reputable company will consider it an unreasonable request from a candidate.',
          },
          {
            error: `A candidate on a work visa gets to the final round, then the process ends with "we\'ve decided to go a different direction" with no further explanation`,
            cause: 'Sponsorship requirements were not clarified early, and the company either does not sponsor visas for this role or has hit an internal cap on sponsorship approvals for the year — a constraint that has nothing to do with the candidate\'s technical performance, but surfaces only at the final stage when it becomes relevant to the hiring paperwork.',
            fix: 'Per Part 05\'s Callout, filter for sponsorship availability before applying wherever possible, and ask the recruiter directly and early in the first screening call. This does not need to feel adversarial — most experienced recruiters would rather resolve this upfront than run a candidate through four interview rounds only for it to become a blocker at the end.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red,#ff4757)',
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
              }}>Cause: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.cause}</span>
            </div>
            <div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em', textTransform: 'uppercase',
              }}>Fix: </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{item.fix}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ── Key Takeaways ────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'A CS degree is one signal among several — a strong portfolio and cloud certification can substitute at most product companies and startups.',
        'Community college and bootcamp paths are well-worn and respected if the work produced is genuinely strong.',
        'One deep, well-documented project beats five shallow tutorial clones in every interview.',
        'Large enterprises and government-adjacent companies are more rigid about degree requirements than startups and mid-size product companies.',
        'Company type affects salary more than city — the FAANG-vs-consulting gap for the same role, experience, and city is often 2–3×, larger than any city multiplier.',
        'Certifications are a fast, verifiable signal for non-CS candidates but never a substitute for a real, demonstrable project — pick the cloud platform your target companies actually use.',
        'US salary negotiation is expected, not optional: never give the first number, get competing offers when possible, and negotiate total compensation — base, bonus, and equity — not just base.',
        'The realistic non-CS timeline to a first offer is 8–9 months and roughly 100+ applications with single-digit interview conversion, not the viral "landed a job in 6 weeks" stories.',
        'A resume tailored to mirror the exact terminology of the job description beats a generic one at getting past ATS filtering, and a verbal offer is never a reason to resign — wait for the signed offer letter.',
      ]} />

      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Module 07 covers the three data categories every data engineer works with daily — structured, semi-structured, and unstructured — and what each one demands from your pipeline design.
        </p>
        <Link href="/learn/data-engineering/data-types-structured" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Module 07 → Structured, Semi-Structured and Unstructured Data
        </Link>
      </div>
    </LearnLayout>
  )
}
