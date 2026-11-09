import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import Link from 'next/link'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { DEWorkshop, WorkshopCode, WorkshopAnswer } from '@/components/content/DEWorkshop'

export const metadata: Metadata = {
  title: 'Data Engineering in the US Job Market (2026) — Data Engineering | Chaduvuko',
  description:
    'Research data engineering roles, compare compensation, interpret required skills and build portfolio evidence using traceable employer postings.',
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
      title="Researching Data Engineering Roles and Compensation"
      description="Use dated employer postings to research role scope, compensation disclosures, skill requirements, and career evidence."
      section="Data Engineering — Lesson 06"
      readTime="50 min"
    >

      {/* ── Part 01 — State of the Market ────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The State of the Market" />
        <SectionTitle>Research Data Engineering Roles With Evidence</SectionTitle>

        <Para>
          Data engineering roles differ by employer, level, location and the systems a team operates.
          Research them using dated employer postings, clearly distinguish required and preferred skills,
          and compare scope and expected ownership rather than relying on a title alone.
        </Para>

        <Para>
          Demand, job titles, team sizes, and technology choices change over time and vary
          between employers. Rather than infer a market trend from a list of company names,
          collect current postings for a defined role, location, and period, then report what
          that sample does—and does not—show.
        </Para>

        <HighlightBox>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
            {[
              { stat: 'Source', label: 'Employer postings', sub: 'Save URL, requisition ID and collection date' },
              { stat: 'Scope', label: 'Responsibilities', sub: 'Distinguish pipeline, platform and analytics work' },
              { stat: 'Level', label: 'Expected ownership', sub: 'Compare decisions and impact, not only titles' },
              { stat: 'Pay', label: 'Compensation components', sub: 'Separate base salary, bonus and equity' },
              { stat: 'Proof', label: 'Portfolio evidence', sub: 'Show tests, recovery and design reasoning' },
              { stat: 'Fit', label: 'Practical constraints', sub: 'Review location and role requirements' },
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
          <strong>Evidence note:</strong> This lesson does not contain a representative salary
          survey or a verified live-vacancy list. The activities teach how to collect and compare
          current employer information; they do not establish national market statistics or
          promise employment outcomes.
        </Callout>
      </section>

      <Divider />

      {/* ── Part 02 — Compensation Research ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Compensation Research" />
        <SectionTitle>Compare Compensation Without Inventing Market Benchmarks</SectionTitle>
        <Para>
          This lesson does not include a dated, representative salary dataset. It therefore does
          not publish salary bands, city multipliers, or employer-type pay premiums as market
          facts. Use the checklist below to build a traceable comparison for a specific role and
          time period.
        </Para>
        <CodeBox label="A repeatable compensation comparison checklist">{`For every posting or disclosure, record:
  source URL and collection date
  title, level, location, and responsibilities
  stated base-pay range and currency/pay period
  bonus and equity separately, including valuation caveats
  whether the source is employer-posted or self-reported

Compare roles with similar level and scope.
Report sample size, date window, exclusions, and missing values.
Do not infer a market median from a few postings.`}</CodeBox>
        <TryThis>
          Select one role level and three locations. Collect current employer-posted ranges,
          record source URLs and dates, and compare only entries with the same compensation
          definition. If the sample is too small, state that instead of calculating a market median.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 03 — Employer Research ──────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Employer Research" />
        <SectionTitle>Find Current Openings From Employer Sources</SectionTitle>
        <Para>
          This lesson does not verify which employers are hiring now, their hiring volume,
          internal technology stacks, team culture, compensation, or interview practices.
          Company names and stacks can become stale, so treat third-party summaries as leads
          and check dated postings on the employer's careers site.
        </Para>
        <CodeBox label="Employer-posting evidence log">{`Company | Official posting URL | Requisition ID | Collected date
Role / level | Location | Required skills | Preferred skills
Responsibilities | Compensation disclosure | Posting status

Keep notes with the collection date. Recheck before calling a role current.
A posting disappearing does not prove that the role was filled.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 04 — Skill Research ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Skill Research" />
        <SectionTitle>Build a Skill Map From a Defined Posting Sample</SectionTitle>
        <Para>
          The categories below are a study checklist, not a ranking or claim about how often
          US job descriptions mention a tool. Requirements vary by employer, role level, and
          posting date. To make a frequency claim, define a sample, code each posting consistently,
          and publish the denominator and collection window.
        </Para>
        <CodeBox label="Skill categories to code in each sampled posting">{`SQL and data modeling
Programming, testing, and packaging
Cloud platform and storage
Batch/stream processing and orchestration
Warehouse/lakehouse and transformation tools
Quality, security, CI/CD, and operations

For each category, record required / preferred / absent.
Count postings—not individual repeated keywords—as the denominator.`}</CodeBox>
        <TryThis>
          Collect a bounded set of current postings for one level and region. Remove duplicates,
          label each skill as required or preferred, and report how many postings you reviewed.
          Do not generalize the result to the whole market.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 05 — Reading a Job Posting ─────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Reading a Job Posting" />
        <SectionTitle>Separate What a Posting Says From What You Need to Verify</SectionTitle>
        <Para>
          Job-posting language is not a universal code. Interpret each requirement in context,
          distinguish required from preferred qualifications, and ask the employer about unclear
          details rather than assuming how a phrase applies.
        </Para>
        <CodeBox label="Questions to ask while reviewing a posting">{`Experience requirement:
  Is the number a strict minimum, a preference, or a description of typical candidates?
  Which responsibilities require that experience?

Degree or equivalent experience:
  What evidence does this employer accept as equivalent?

Work authorization / sponsorship:
  What does this specific role require, and when must the requirement be met?

Compensation and equity:
  What are the range, location basis, variable components, and applicable conditions?

Role scope:
  Which systems will this person own, and what does success look like?`}</CodeBox>
        <TryThis>
          Choose a current posting and highlight each statement as required, preferred, or
          unclear. Write one specific question for every unclear requirement and check the
          employer's official posting for updates before applying.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 06 — Demonstrating Skills ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Demonstrating Skills" />
        <SectionTitle>Show Evidence That Matches the Role</SectionTitle>
        <Para>
          Education and experience requirements differ by employer. Read each posting literally,
          distinguish required from preferred qualifications, and ask the recruiter about any
          ambiguous requirement. A portfolio can demonstrate some skills, but it does not
          automatically replace a stated degree, experience, or work-authorization requirement.
        </Para>
        <CodeBox label="A project brief for demonstrating data-engineering skills">{`Choose a public dataset and document its license and source.
Build a small ingestion and transformation pipeline.
Add schema and data-quality checks, plus tests for failure cases.
Make the run repeatable and explain how retries avoid duplicates.
Include a data model, architecture diagram, and clear README.
Record what you would change for production scale and security.

Describe your own contribution accurately. Do not claim production use
or employer experience for a learning project.`}</CodeBox>
        <TryThis>
          Compare the project evidence with one current job posting. For every required skill,
          note a specific artifact or experience that demonstrates it; mark gaps honestly and
          identify the next practice task.
        </TryThis>
      </section>

      <Divider />

      {/* ── Part 07 — Certifications ────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Certifications" />
        <SectionTitle>Evaluate Certifications as One Piece of Evidence</SectionTitle>
        <Para>
          A certification can show structured study or familiarity with a vendor platform, but
          it does not by itself establish practical skill or guarantee an interview. Certification
          names, exam versions, eligibility rules, and availability change; check the issuing
          provider's official page before planning or listing a credential.
        </Para>
        <CodeBox label="Before spending time or money on a certification">{`Check the provider's official page for:
  current exam status, version, price, and renewal rules
  topics covered and required prerequisites
  whether the target postings request or prefer the credential
  whether a hands-on project would better demonstrate the same skill

Describe credentials accurately. Do not imply that a certificate is a license
or proof of production experience.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 08 — Comparing an Offer ─────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Comparing an Offer" />
        <SectionTitle>Ask Clear Questions About Compensation</SectionTitle>
        <Para>
          Compensation structures and negotiation practices differ by employer, location, and
          role. There is no guaranteed script or universal rule about when to share a range.
          Use employer disclosures and the written offer to understand what is actually being
          offered, and seek qualified advice for tax, immigration, or contract questions.
        </Para>
        <CodeBox label="Questions to clarify before comparing offers">{`What is the base salary, currency, and pay period?
Is bonus guaranteed, target-based, or discretionary?
For equity: what instrument, vesting schedule, and relevant terms apply?
What benefits, work location, and start-date conditions apply?
Which details will appear in the written offer?

Compare guaranteed cash separately from variable or illiquid compensation.
Do not treat a competing offer or public salary estimate as a guarantee.`}</CodeBox>
        <TryThis>
          Draft a short, factual email asking for any missing compensation details. Keep the tone
          professional, avoid claims you cannot substantiate, and make any decision only after
          reviewing the written terms.
        </TryThis>
      </section>

      <Divider />

      {/* ── Misconceptions ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="myth">
        <SectionTag text="// Misconceptions" />
        <SectionTitle>Common Misconceptions About Data-Engineering Careers</SectionTitle>
        {[
          {
            wrong: '"A job title tells me exactly what the role involves"',
            right: 'Titles vary by employer. Compare responsibilities, systems, level, and ownership in the actual posting.',
          },
          {
            wrong: '"One salary post or a few job ads establish the market rate"',
            right: 'Sources can measure different things and cover different samples. Record dates, definitions, locations, and missing values before drawing comparisons.',
          },
          {
            wrong: '"A certification guarantees an interview"',
            right: 'A credential is one signal. Check what the role asks for and demonstrate relevant skills with accurate, reviewable evidence.',
          },
          {
            wrong: '"A non-CS degree automatically rules me out—or automatically substitutes for experience"',
            right: 'Requirements differ by employer. Read the posting, ask about equivalencies where appropriate, and represent your experience accurately.',
          },
          {
            wrong: '"A rejection proves I am not qualified"',
            right: 'A hiring decision alone does not reveal the reason. Review any feedback you receive, improve the evidence you control, and avoid inferring a market-wide pattern from one outcome.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red,#ff4757)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>✕ &quot;{item.wrong}&quot;</div>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{item.right}</div>
          </div>
        ))}
      </section>

      <Divider />

      {/* ── Part 09 — Practice Scenario ───────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="story">
        <SectionTag text="// Part 09 — Practice Scenario" />
        <SectionTitle>Plan a Career Transition With Evidence</SectionTitle>
        <Para>
          The following is a hypothetical exercise, not a Chaduvuko learner outcome or a typical
          hiring timeline. Its purpose is to practice turning a broad career goal into testable
          learning tasks.
        </Para>
        <CodeBox label="Hypothetical scenario">{`A retail operations professional wants to explore data engineering.

1. Review current postings in the target location and record recurring requirements.
2. Learn the prerequisite Python, SQL, and data-modeling concepts.
3. Build a small, tested pipeline using a public dataset.
4. Document design choices, limitations, and recovery behavior.
5. Seek feedback and compare the project with role requirements.
6. Reassess the plan based on evidence, time, cost, and personal constraints.

No step guarantees an interview, offer, salary, or completion date.`}</CodeBox>
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

      {/* ── Common Mistakes ─────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Common Mistakes" />
        <SectionTitle>Use Evidence Instead of Guessing About the Hiring Process</SectionTitle>
        <CodeBox label="Practical checks for a job search">{`Tailor your application truthfully to the role's stated requirements.
Track role, requisition ID, source, application date, and status.
Do not treat silence or rejection as proof of a specific screening cause.
Ask about unclear requirements, compensation, and work authorization.
Review take-home scope and evaluation criteria before accepting the task.
Read the written offer and clarify missing terms before making commitments.

Employer processes and timelines vary; no approach guarantees an outcome.`}</CodeBox>
      </section>

      <Divider />

      {/* ── Error Library ────────────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }} data-toc-kind="plain">
        <SectionTag text="// Error Library" />
        <SectionTitle>Diagnose Job-Search Outcomes Without Assuming the Cause</SectionTitle>
        <Para>
          A delayed response, rejected application, or changed offer can have many causes. Without
          information from the employer, do not claim that an ATS, salary expectation, visa status,
          or interview answer caused the result. Keep records, ask appropriate questions, and use
          feedback you can verify.
        </Para>
        <CodeBox label="If an application has no update">{`1. Recheck the official posting and requisition status.
2. Confirm the application was submitted and keep its reference number.
3. Follow the employer's published contact or follow-up process.
4. Continue evaluating other roles; do not infer a screening result.
5. Update your tracking record when you receive verified information.`}</CodeBox>
        <Para>
          For compensation, work authorization, or contract questions, confirm the specific terms
          with the employer and seek qualified advice when needed. General job-search anecdotes are
          not a substitute for current, role-specific information.
        </Para>
      </section>

      <Divider />

      {/* ── Key Takeaways ────────────────────────────────────────────── */}

      <DEWorkshop title="Build a job-market dataset you can defend"
        objective="Research a target role using traceable postings, comparable compensation fields and demonstrated skills."
        prerequisites="Understand the responsibilities of data engineering and adjacent data roles. No paid tool is required.">
        <p>Collect ten current employer postings for a location and level you can realistically target. Record the employer URL and collection date. Deduplicate reposts by employer and requisition ID; ten copies of one opening are one observation. This makes your research a small data-engineering exercise rather than a collection of impressions.</p>
        <WorkshopCode>{`posting_id | collected_at | employer_url | location | level
employment_type | required_skills | preferred_skills
salary_currency | base_min | base_max | bonus | equity
remote_policy | work_authorization_notes | missing_fields`}</WorkshopCode>
        <p>Keep required and preferred skills separate. Preserve missing compensation as missing instead of inventing a value. An advertised salary band, an accepted offer and a self-reported total-compensation record measure different things. Do not pool them into one “national median.” Broad occupational statistics are context, not a direct salary estimate for every role named Data Engineer.</p>
        <h3>Practice: turn evidence into a learning plan</h3>
        <p>If SQL appears in 9 of your 10 postings, orchestration in 6 and a particular warehouse in 3, propose a four-week study plan. State what the sample cannot tell you about the whole US market.</p>
        <WorkshopAnswer>
          <p>Prioritize a tested SQL pipeline and an orchestrated replayable project, then study the warehouse used by your strongest target roles. Produce a README, data model, failure demonstration and reconciliation query. The sample describes your chosen employers and dates; it cannot establish national demand, a salary growth rate, a hiring probability or a guaranteed time to employment.</p>
          <p>Completion evidence: share the source URLs, deduplication rule, missing-data policy and the project artifact supporting each claimed skill. Review credential status on the issuer’s site before paying for preparation.</p>
        </WorkshopAnswer>
        <p>Official references: <a href="https://www.bls.gov/ooh/computer-and-information-technology/database-administrators.htm">BLS database occupations</a>, <a href="https://learn.microsoft.com/en-us/credentials/certifications/azure-data-engineer/">retired Azure Data Engineer credential</a> and <a href="https://learn.microsoft.com/en-us/credentials/certifications/fabric-data-engineer-associate/">Fabric Data Engineer credential</a>.</p>
      </DEWorkshop>

      <KeyTakeaways items={[
        'Compare responsibilities, level, location, and ownership in the actual posting; job titles vary across employers.',
        'Use dated employer disclosures for compensation research. Keep base, bonus, and equity separate, and report sample size and missing values.',
        'Treat skill-frequency claims as sample-specific. Define the posting set and denominator before reporting prevalence.',
        'Distinguish required from preferred qualifications and ask employers about unclear degree, experience, or work-authorization requirements.',
        'A portfolio or certification can demonstrate selected skills but does not guarantee an interview or replace every employer requirement.',
        'There is no guaranteed job-search timeline or negotiation script. Verify written offer details and evaluate them against your circumstances.',
      ]} />

      {/* ── Next Module CTA ──────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          Lesson 07 covers the three data categories every data engineer works with daily — structured, semi-structured, and unstructured — and what each one demands from your pipeline design.
        </p>
        <Link href="/learn/data-engineering/data-types-structured" style={{ background: '#00e676', color: '#000', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          Lesson 07 → Structured, Semi-Structured and Unstructured Data
        </Link>
      </div>
    </LearnLayout>
  )
}
