import { LearnLayout } from '@/components/content/LearnLayout';
import { Callout } from '@/components/content/Callout';
import { KeyTakeaways } from '@/components/content/KeyTakeaways';
import PyPlayground from '@/components/datascience/PyPlayground';
import TryItChallenge from '@/components/datascience/TryItChallenge';
import Link from 'next/link';

const C = '#8b5cf6';

const Part = ({ n, title }: { n: string; title: string }) => (
  <div style={{ marginBottom: 28 }}>
    <p style={{ fontSize: 11, color: C, fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 8px', letterSpacing: '.1em' }}>// Part {n}</p>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900, letterSpacing: '-1.5px', color: 'var(--text)', margin: 0 }}>{title}</h2>
  </div>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.9, margin: '0 0 18px' }}>{children}</p>
);

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '32px 0 12px' }}>{children}</h3>
);

const Hl = ({ children }: { children: React.ReactNode }) => (
  <strong style={{ color: C }}>{children}</strong>
);

const HR = () => <div style={{ borderTop: '1px solid var(--border)', margin: '48px 0' }} />;

const IQ = ({ q, children }: { q: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ background: `${C}10`, border: `1px solid ${C}25`, borderRadius: '8px 8px 0 0', padding: '14px 18px', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Q: {q}</div>
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', fontSize: 14, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
  </div>
);

const Misconception = ({ quote, reality, fix }: { quote: string; cause?: string; reality: string; fix: string }) => (
  <div style={{ marginBottom: 24, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
    <div style={{ background: 'rgba(255,71,87,0.09)', borderBottom: '1px solid var(--border)', padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#ff4757', lineHeight: 1.6 }}>{quote}</div>
    <div style={{ padding: '14px 16px' }}>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 8px' }}><strong style={{ color: 'var(--text)' }}>Reality: </strong>{reality}</p>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}><strong style={{ color: '#00e676' }}>What to do instead: </strong>{fix}</p>
    </div>
  </div>
);

const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: `${C}08`, border: `1px solid ${C}20`, borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>🎯 Pro Tip</p>
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.85, margin: 0 }}>{children}</p>
  </div>
);

const TimeBlock = ({ time, label, children }: { time: string; label: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
    <div style={{ flexShrink: 0, textAlign: 'right', width: 90 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C, fontFamily: 'var(--font-mono)' }}>{time}</div>
    </div>
    <div style={{ flex: 1, borderLeft: `2px solid ${C}30`, paddingLeft: 20, paddingBottom: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>{children}</div>
    </div>
  </div>
);

export default function DsVsOtherRoles() {
  return (
    <LearnLayout
      title="Data Science vs Data Engineering vs ML Engineering vs Analytics"
      description="Four job titles that get confused constantly — what each one actually owns day to day, where the boundaries blur in practice, and how to decode a job posting"
      section="Data Science — Module 03"
      readTime="10–14 min"
      updatedAt="July 2026"
    >

      {/* ── PART 01 ── */}
      <Part n="01" title="Why These Four Titles Get Confused" />

      <P>Open ten job postings for "Data Scientist" at ten different companies and you will find ten different jobs. One wants heavy SQL and dashboards. Another wants a PhD and published research. A third wants someone who can deploy a model to production single-handedly. This is not because the title is meaningless — it is because these four disciplines sit on a shared spectrum, and different companies draw the boundaries in different places depending on team size and maturity.</P>

      <P>At a large, mature tech company, all four roles usually exist as separate people. At a 20-person startup, one person might do all four in the same week. Understanding the boundaries — even ones that blur in practice — is what lets you read a job posting accurately, negotiate scope in an interview, and know exactly who to loop in when a project needs a skill outside your own lane.</P>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { label: 'Data Engineer', sub: 'builds the pipes', color: '#3b82f6' },
            { label: 'Data Analyst', sub: 'reads what happened', color: '#06b6d4' },
            { label: 'Data Scientist', sub: 'cleans + validates + sometimes predicts', color: C },
            { label: 'ML Engineer', sub: 'ships the model', color: '#f97316' },
          ].map((r, i, arr) => (
            <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ background: `${r.color}12`, border: `1px solid ${r.color}40`, borderRadius: 12, padding: '14px 18px', textAlign: 'center', minWidth: 150 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: r.color, marginBottom: 4 }}>{r.label}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{r.sub}</div>
              </div>
              {i < arr.length - 1 && <span style={{ color: 'var(--muted)', fontSize: 18 }}>→</span>}
            </div>
          ))}
        </div>
      </div>

      <P>Read left to right, this is roughly the order data flows through a company: engineers move and store it, analysts and scientists make sense of it, and ML engineers turn a scientist's model into something running live in production. The rest of this module walks through each stop on that chain.</P>

      <HR />

      {/* ── PART 02 ── */}
      <Part n="02" title="Data Engineer — Builds the Pipes" />

      <P>A Data Engineer's job is to make sure data exists, arrives on time, and is trustworthy — before anyone else touches it. They rarely answer business questions directly; they build and maintain the infrastructure that makes answering those questions possible for everyone downstream.</P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 20px', margin: '16px 0 24px' }}>
        <div style={{ fontSize: 11, color: '#3b82f6', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10, fontWeight: 700 }}>A Data Engineer's typical week</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text)', lineHeight: 2 }}>
          <li>Building and maintaining a nightly pipeline that loads watch_history events into the warehouse</li>
          <li>Fixing a broken pipeline when an upstream API changed its response format overnight</li>
          <li>Designing the subscriptions table schema so it scales to millions of rows without slow queries</li>
          <li>Setting up data quality alerts that fire automatically if row counts drop unexpectedly</li>
        </ul>
      </div>

      <P>The output of good data engineering work is invisible when it works — a warehouse table that just quietly refreshes every night, correctly, forever. This course's sibling <Hl>Data Engineering track</Hl> covers this discipline in full depth; here, treat it as the team whose work you depend on before Stage 2 (Collect) of the workflow from Module 02 can even begin.</P>

      <HR />

      {/* ── PART 03 ── */}
      <Part n="03" title="Data Analyst — Reads What Already Happened" />

      <P>A Data Analyst answers business questions using data that a data engineer has already made clean, structured, and queryable. Their core tool is SQL, their core output is a dashboard or a report, and their core question is almost always "what happened?" rather than "what will happen next?"</P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 20px', margin: '16px 0 24px' }}>
        <div style={{ fontSize: 11, color: '#06b6d4', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10, fontWeight: 700 }}>A Data Analyst's typical week</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text)', lineHeight: 2 }}>
          <li>Writing a SQL query for the weekly leadership report on new subscriber counts by country</li>
          <li>Building a dashboard tracking cancellation rate by plan, refreshed automatically every morning</li>
          <li>Answering an ad hoc Slack question: "how many Premium subscribers watched a Documentary last month?"</li>
          <li>Presenting last quarter's engagement trends to the marketing team</li>
        </ul>
      </div>

      <P>The line between Data Analyst and Data Scientist is the blurriest of the four — many "Data Scientist" job postings, especially at smaller companies, are describing analyst work. The clearest test: does the role ever require cleaning genuinely messy raw data or building a predictive model? If the data always arrives clean and the deliverable is always a report or dashboard, it is analytics — regardless of the title on the job posting.</P>

      <HR />

      {/* ── PART 04 ── */}
      <Part n="04" title="Data Scientist — Cleans, Validates, Sometimes Predicts" />

      <P>This is the role this course is built around, covered in full in Module 01. The short version: a Data Scientist takes messy, often raw data, cleans it, applies statistical rigor to determine whether a pattern is meaningful, and — when the question genuinely calls for it — builds a predictive model.</P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 20px', margin: '16px 0 24px' }}>
        <div style={{ fontSize: 11, color: C, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10, fontWeight: 700 }}>A Data Scientist's typical week</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text)', lineHeight: 2 }}>
          <li>Cleaning a raw watch_history export full of duplicate events and inconsistent device names</li>
          <li>Running a statistical test to check whether a pricing change actually caused a real drop in retention</li>
          <li>Training and validating a churn prediction model, then handing it to an ML Engineer to deploy</li>
          <li>Designing a controlled A/B test for a new recommendation algorithm before it ships to everyone</li>
        </ul>
      </div>

      <P>The distinguishing skill set, relative to an analyst, is statistics and — when needed — machine learning. The distinguishing skill set, relative to an ML Engineer, is that a data scientist's job usually ends once a model is proven to work; making it run reliably at scale in production is a different, adjacent discipline.</P>

      <HR />

      {/* ── PART 05 ── */}
      <Part n="05" title="ML Engineer — Ships the Model" />

      <P>An ML Engineer takes a model that a data scientist has proven works — usually as a notebook or a script that runs once — and turns it into a reliable, fast, monitored piece of production software that serves predictions continuously, at whatever scale the product needs.</P>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 20px', margin: '16px 0 24px' }}>
        <div style={{ fontSize: 11, color: '#f97316', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10, fontWeight: 700 }}>An ML Engineer's typical week</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--text)', lineHeight: 2 }}>
          <li>Wrapping a data scientist's churn model in an API that returns a prediction in under 100 milliseconds</li>
          <li>Setting up monitoring that alerts the team if the model's accuracy silently degrades over time</li>
          <li>Automating a retraining pipeline so the model updates itself on fresh data every week</li>
          <li>Optimizing a model so it runs cheaply enough to serve millions of predictions per day</li>
        </ul>
      </div>

      <P>This role sits closer to software engineering than to statistics — strong Python and systems skills matter more here than deep statistical theory. This course's sibling <Hl>AI & ML track</Hl> covers the MLOps and deployment side of this role in depth.</P>

      <HR />

      {/* ── PART 06 ── */}
      <Part n="06" title="The Same Question, Answered Four Different Ways" />

      <P>The cleanest way to see the real difference is to watch all four roles respond to the exact same business trigger: <Hl>"Premium subscriber cancellations went up this month."</Hl></P>

      <div style={{ overflowX: 'auto', margin: '20px 0 28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Role', 'Their response to this exact trigger'].map(h => (
                <th key={h} style={{ padding: '10px 14px', background: 'var(--surface)', color: 'var(--muted)', fontWeight: 700, textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Data Engineer', 'Confirms the subscriptions table refreshed correctly overnight and the cancellation numbers are not a pipeline bug before anyone trusts them.'],
              ['Data Analyst', 'Builds a dashboard tile showing cancellation rate by month, filterable by plan and country, so leadership can watch the trend going forward.'],
              ['Data Scientist', 'Cleans the subscription and referral data, runs a statistical test to check if the increase is real, and identifies which segment is actually driving it.'],
              ['ML Engineer', 'If a churn prediction model already exists, checks whether it correctly flagged these cancelling users in advance — and improves it if not.'],
            ].map(([role, resp], i) => (
              <tr key={role} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 12, color: C, borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap', fontWeight: 700, verticalAlign: 'top' }}>{role}</td>
                <td style={{ padding: '10px 14px', fontSize: 13, color: 'var(--text)', borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{resp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>Notice all four are looking at overlapping data, but asking fundamentally different questions of it. Here is the analyst-style answer and the data-scientist-style answer to the same trigger, live, so you can see the actual difference in code rather than just in description.</P>

      <PyPlayground
        initialCode={`# Analyst-style: "what happened?" — a straightforward descriptive breakdown\n# (suffixes keeps subscriptions' own 'plan' column unrenamed — both tables have one)\nmerged = subscriptions.merge(users, on='user_id', suffixes=('', '_user'))\nmerged[merged['status'] == 'cancelled'].groupby('plan').size()`}
        height={110}
        showSchema={true}
      />

      <PyPlayground
        initialCode={`# Data-scientist-style: goes one step further — is this difference\n# actually large relative to each plan's total subscriber base?\ncancel_rate = merged.groupby('plan')['status'].apply(lambda s: (s == 'cancelled').mean())\ncancel_rate.round(2)`}
        height={130}
        showSchema={false}
      />

      <P>The analyst's query answers "how many cancelled, per plan" — a real, useful, complete answer to a descriptive question. The data scientist's version normalizes by group size to ask the sharper question "which plan has the highest cancellation <em>rate</em>, not just count" — the kind of reframing that prevents a misleading conclusion (a plan with more total subscribers will always have more raw cancellations, even with a lower rate).</P>

      <HR />

      {/* ── PART 07 ── */}
      <Part n="07" title="How to Decode a Job Posting" />

      <P>Job titles lie constantly. Job posting bullet points are more honest. Use this quick decoder before an interview.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12, margin: '20px 0 28px' }}>
        {[
          { phrase: '"Build and maintain ETL pipelines"', role: 'Data Engineer', color: '#3b82f6' },
          { phrase: '"Own our weekly business reporting"', role: 'Data Analyst', color: '#06b6d4' },
          { phrase: '"Design and validate A/B tests"', role: 'Data Scientist', color: C },
          { phrase: '"Deploy models to production, own uptime/SLAs"', role: 'ML Engineer', color: '#f97316' },
          { phrase: '"Strong SQL, dashboarding tools (Looker/Tableau)"', role: 'Data Analyst', color: '#06b6d4' },
          { phrase: '"Statistics, experimentation, causal inference"', role: 'Data Scientist', color: C },
          { phrase: '"Airflow, Spark, warehouse architecture"', role: 'Data Engineer', color: '#3b82f6' },
          { phrase: '"MLflow, model monitoring, feature stores"', role: 'ML Engineer', color: '#f97316' },
        ].map(item => (
          <div key={item.phrase} style={{ background: 'var(--surface)', border: `1px solid ${item.color}30`, borderRadius: 10, padding: '14px 16px' }}>
            <p style={{ fontSize: 13, color: 'var(--text)', fontStyle: 'italic', margin: '0 0 8px', lineHeight: 1.5 }}>{item.phrase}</p>
            <span style={{ fontSize: 11, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>→ {item.role}</span>
          </div>
        ))}
      </div>

      <Callout type="tip">
        Many job postings mix phrases from two or three of these columns in the same listing — that is not a red flag by itself, it is simply an honest reflection of the company's size. A posting titled "Data Scientist" that is 80% analyst-column phrases and 20% data-scientist-column phrases is telling you exactly what the day-to-day will actually be, regardless of the title.
      </Callout>

      <HR />

      {/* ── PART 08 ── */}
      <Part n="08" title="What This Looks Like at Work — One Feature, Four Roles" />

      <P>StreamPulse decides to build a churn-prevention feature: automatically offer a discount to subscribers likely to cancel. Here is how all four roles touch the same project across one week.</P>

      <TimeBlock time="Mon" label="Data Engineer">
        Builds a new pipeline that joins watch_history, subscriptions, and ratings into one clean, daily-refreshed feature table — the exact raw ingredient every other role in this project depends on.
      </TimeBlock>

      <TimeBlock time="Tue" label="Data Analyst">
        Uses the new table to publish a dashboard showing current churn rate trends by segment, giving leadership visibility while the rest of the project is being built.
      </TimeBlock>

      <TimeBlock time="Wed – Thu" label="Data Scientist">
        Cleans the feature table further, engineers a few additional signals (like recent watch-time trend), trains a churn prediction model, and validates it performs meaningfully better than a naive baseline.
      </TimeBlock>

      <TimeBlock time="Fri" label="ML Engineer">
        Takes the validated model, wraps it in a scheduled batch job that scores every subscriber nightly, and wires the output into the marketing team's discount-offer system — with monitoring to catch any future drop in accuracy.
      </TimeBlock>

      <ProTip>
        In an interview, if you can describe not just your own role's contribution but how it fits into this chain — what you depend on and who depends on you — you signal seniority far beyond your actual years of experience. Junior candidates describe their own task. Senior candidates describe the system.
      </ProTip>

      <HR />

      {/* ── PART 09 — Interview Prep ── */}
      <Part n="09" title="Interview Prep — 5 Questions With Complete Answers" />

      <IQ q="How would you explain the difference between a Data Analyst and a Data Scientist to a non-technical friend?">
        <p style={{ margin: '0 0 14px' }}>A Data Analyst is like someone who reads a company's existing, well-organized filing cabinet and answers questions about what is already in it — "how many customers did we get last month?" A Data Scientist is more like someone who first has to sort through a messy pile of unfiled papers, figure out what is trustworthy, and then sometimes builds a system that predicts what will happen next based on the patterns found.</p>
        <p style={{ margin: '0 0 14px' }}>The practical difference is in the starting point and the ceiling of the work: analysts typically start from clean, already-modeled data and their output is usually a report or dashboard. Data scientists more often start from messier, less-processed data, apply statistical rigor to validate what they find, and occasionally go all the way to building a predictive model — something an analyst role typically does not require.</p>
        <p style={{ margin: 0 }}>In practice at many companies, especially smaller ones, one person does both jobs under one title — which is exactly why this distinction matters more for understanding a specific job posting's actual day-to-day than for judging whose job is "better."</p>
      </IQ>

      <IQ q="If you were hired as a Data Scientist but the role turned out to be 90% dashboard-building, how would you handle that?">
        <p style={{ margin: '0 0 14px' }}>I would treat it as useful information rather than a betrayal — many companies use "Data Scientist" loosely, and the actual day-to-day work is the ground truth, not the title on the offer letter. My first step would be a direct conversation with my manager about the mismatch, framed around what I want to grow into rather than a complaint about what I am currently doing.</p>
        <p style={{ margin: '0 0 14px' }}>I would look for openings to introduce more analysis-heavy or modeling work incrementally — for example, adding a simple statistical significance check to an existing dashboard metric, or proposing a small predictive project adjacent to my current dashboard work — to demonstrate the additional value without requesting a full role change upfront.</p>
        <p style={{ margin: 0 }}>If after a genuine attempt the role's scope does not evolve and it matters to my career goals, I would treat that as useful signal about whether this company's structure fits where I want to grow, and factor it into future job search decisions rather than staying frustrated indefinitely.</p>
      </IQ>

      <IQ q="What skills does an ML Engineer need that a Data Scientist typically does not?">
        <p style={{ margin: '0 0 14px' }}>An ML Engineer needs strong software engineering fundamentals that go well beyond what most data scientist roles require: writing production-grade code with proper testing, designing APIs, understanding latency and throughput trade-offs, containerization (Docker/Kubernetes), and CI/CD pipelines for deploying model updates safely.</p>
        <p style={{ margin: '0 0 14px' }}>They also need monitoring and observability skills specific to ML systems — detecting model drift (when real-world data starts to differ from training data), setting up alerting for degraded prediction accuracy, and building automated retraining pipelines. These are systems engineering concerns that a data scientist focused on proving a model works in a notebook typically has not needed to master.</p>
        <p style={{ margin: 0 }}>Conversely, a Data Scientist typically needs deeper statistical theory, experimental design, and domain-specific feature engineering judgment than most ML Engineers develop — the two roles are complementary specializations rather than one being a strictly harder version of the other.</p>
      </IQ>

      <IQ q="How do you decide whether a project needs a Data Engineer's involvement?">
        <p style={{ margin: '0 0 14px' }}>The signal is whether the project needs data infrastructure to exist or scale, rather than just an ad hoc pull for one analysis. If a question can be answered with a one-time query against existing warehouse tables, no data engineering involvement is needed. If the project requires a new, recurring, reliable data pipeline — for example, a nightly feed of a new event type that does not yet exist in the warehouse — that is squarely data engineering work.</p>
        <p style={{ margin: '0 0 14px' }}>A useful test: would this data need to exist and refresh correctly even if I, the data scientist, were on vacation next month? If yes, it needs to be a proper, engineered pipeline rather than a personal script running on my own laptop.</p>
        <p style={{ margin: 0 }}>In practice, I loop in a data engineer as early as the framing stage of a project if I already suspect the answer will require new or restructured data infrastructure, rather than building a fragile personal workaround and discovering the need for a real pipeline only after the analysis is already trusted and in use.</p>
      </IQ>

      <IQ q="Describe a time (or a hypothetical) where the boundary between two of these roles blurred, and how you'd handle the ambiguity.">
        <p style={{ margin: '0 0 14px' }}>A common blurry case: a data scientist builds a churn model that works well in a notebook, and the team is small enough that there is no dedicated ML Engineer. The data scientist is then asked to also deploy it — stepping into ML Engineer territory. The ambiguity is real: how much production engineering rigor is reasonable to expect from someone whose core strength is statistics and modeling, not systems design?</p>
        <p style={{ margin: '0 0 14px' }}>I would handle this by being explicit about scope and risk rather than silently absorbing the extra work: propose the simplest reliable deployment path (for example, a scheduled batch job rather than a low-latency live API, if the use case allows it), be honest about what monitoring and testing I can realistically build alone, and flag clearly if the production reliability bar genuinely requires bringing in engineering support before it ships to real users.</p>
        <p style={{ margin: 0 }}>The principle that generalizes: role boundaries blur constantly in practice, especially at smaller companies, and the professional response is transparent communication about what you can competently own — not silently pretending the ambiguity does not exist.</p>
      </IQ>

      <HR />

      {/* ── PART 10 — Misconception Library ── */}
      <Part n="10" title="Career Misconceptions You Will Hit" />

      <Misconception
        quote={'"Data Scientist is just a fancier title for Data Analyst — the pay difference is only about branding."'}
        reality="At companies that clearly separate the roles, the compensation difference reflects a real difference in required skill depth — statistics, experimentation design, and sometimes machine learning — not just title inflation. At companies that use the titles loosely, the two roles genuinely may be near-identical, and the pay gap (if any) reflects company-specific leveling, not a universal rule."
        fix="Before assuming a pay gap is fair or unfair, look at the actual job posting bullet points using the decoder table in Part 07, not the title alone."
      />

      <Misconception
        quote={'"I need a PhD and years of machine learning experience to call myself a Data Scientist."'}
        reality="Most industry data science roles — as opposed to research scientist roles at a handful of AI labs — are dominated by cleaning, statistics, and communication, not cutting-edge machine learning. This entire course is built around exactly that reality: Sections 1–9 (cleaning through statistics) matter more day to day than Section 10 (modeling) at most companies."
        fix="Focus portfolio and interview preparation on demonstrating clean end-to-end analysis and sound statistical reasoning first — modeling skill is necessary for some roles, but rarely sufficient on its own without the foundation this course builds first."
      />

      <Misconception
        quote={'"Data Engineers just write boring plumbing code — the real insight work happens downstream."'}
        reality="Every insight a data scientist or analyst produces is only as trustworthy as the pipeline that delivered the underlying data. A broken or poorly designed pipeline silently corrupts every downstream analysis without anyone noticing until a stakeholder catches an obviously wrong number."
        fix="Treat data engineers as the team whose work determines whether your entire analysis is even valid — build a real working relationship with them rather than treating pipeline requests as an afterthought."
      />

      <Misconception
        quote={'"Once I build a working model, my job on that project is basically done."'}
        reality="A model that works once in a notebook is a proof of concept, not a finished deliverable. Getting it validated, deployed reliably, and monitored over time typically requires as much additional work — often from an ML Engineer — as building it did in the first place."
        fix="When scoping a modeling project, explicitly ask and plan for what happens after the model works: who deploys it, who monitors it, and what happens when the underlying data eventually shifts and the model's accuracy quietly degrades."
      />

      <HR />

      {/* ── Try It ── */}
      <TryItChallenge
        question="StreamPulse's leadership asks: 'Which plan should we push harder in marketing — the one with the most total subscribers, or the one with the best retention?' Write pandas code (merging subscriptions and users if needed) that shows both total subscriber count AND cancellation rate per plan, side by side, so leadership can see both answers is not the same thing an analyst-only view (raw counts) would show."
        hint="You need two groupby aggregations on the same merged DataFrame: one counting rows per plan (size()), and one computing the mean of a boolean 'is the status cancelled' condition per plan."
        answer={`merged = subscriptions.merge(users, on='user_id', suffixes=('', '_user'))
summary = merged.groupby('plan').agg(
    total_subscribers=('user_id', 'count'),
    cancellation_rate=('status', lambda s: (s == 'cancelled').mean())
)
summary['cancellation_rate'] = summary['cancellation_rate'].round(2)
summary`}
        explanation="This is exactly the analyst-vs-data-scientist distinction from Part 06 made concrete: total_subscribers alone (the analyst-style count) can make the biggest plan look like the obvious priority, while cancellation_rate (the data-scientist-style normalized view) might reveal that the biggest plan is also leaking subscribers fastest — a completely different, better-informed recommendation to leadership."
      />

      <HR />

      {/* ── Key Takeaways ── */}
      <KeyTakeaways
        items={[
          'Data Engineer, Data Analyst, Data Scientist, and ML Engineer sit on one spectrum from moving raw data to shipping a live model — at small companies one person often covers all four; at large companies they are separate teams.',
          'Data Engineers build and maintain the pipelines everyone else depends on. Their output is invisible when it works — a table that refreshes correctly, every night, without anyone noticing.',
          'Data Analysts answer "what happened?" using already-clean data, mainly through SQL and dashboards. This is the blurriest boundary with Data Science — many "Data Scientist" postings are really describing this role.',
          'Data Scientists clean messier data, apply statistical rigor to validate patterns, and sometimes build predictive models — the discipline this entire course is built around.',
          'ML Engineers take a data scientist\'s proven model and turn it into reliable, monitored, production software — a role closer to software engineering than to statistics.',
          'The same business trigger gets four genuinely different responses from each role — seeing this side by side is the clearest way to understand the actual difference, more than any definition.',
          'Job postings are more honest than job titles. Decode the actual bullet points (SQL/dashboards → analyst; statistics/experimentation → data scientist; Airflow/Spark → data engineer; MLflow/deployment → ML engineer) rather than trusting the title alone.',
          'Being able to describe how your work fits into the full chain — what you depend on and who depends on you — signals seniority far beyond years of experience in an interview.',
          'A model that works once in a notebook is a proof of concept, not a finished deliverable — deployment and monitoring is typically as much work as building it.',
          'Role boundaries blur constantly in practice, especially at smaller companies. The professional response is transparent communication about what you can competently own, not silently absorbing scope you are not equipped for.',
        ]}
      />

      {/* ── Next CTA ── */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', marginTop: 40 }}>
        <p style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700, margin: '0 0 10px' }}>
          What comes next
        </p>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, margin: '0 0 20px' }}>
          <strong>Module 04</strong> gets you properly set up — a full tour of the live Python playground powering every module, how Pyodide runs real pandas in your browser, and everything you need to know about the StreamPulse dataset before Section 2 begins.
        </p>
        <Link href="/learn/data-science" style={{ background: C, color: '#fff', padding: '11px 24px', borderRadius: 7, fontWeight: 700, fontSize: 13, textDecoration: 'none', display: 'inline-block' }}>
          See the full Data Science curriculum →
        </Link>
      </div>

    </LearnLayout>
  );
}
