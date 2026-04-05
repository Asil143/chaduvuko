import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Data Engineer vs Analyst vs Scientist vs ML Engineer — Data Engineering | Chaduvuko',
  description:
    'Clear, permanent boundaries between the four most confused roles in tech. Understand exactly what each role owns, who they work with, what skills they need, and which one to target for your career.',
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

export default function RolesComparisonModule() {
  return (
    <LearnLayout
      title="Data Engineer vs Analyst vs Scientist vs ML Engineer"
      description="Clear permanent boundaries between the four most confused roles in tech."
      section="Data Engineering"
      readTime="45 min"
      updatedAt="March 2026"
    >

      {/* ── Part 01 — Why the Confusion Exists ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — The Root of the Confusion" />
        <SectionTitle>Why Everyone Confuses These Four Roles</SectionTitle>

        <Para>
          If you ask five people what a data scientist does, you will get five different
          answers. Ask what separates a data engineer from a data analyst and most people
          will pause, guess, and get it partly wrong. Even hiring managers conflate these
          roles — which is why job postings sometimes list responsibilities that belong to
          three different roles under one title.
        </Para>

        <Para>
          The confusion has three roots. First, all four roles work with data — so on the
          surface they seem similar. Second, small companies cannot afford four specialists,
          so one person does parts of all four roles, blurring the lines. Third, the field
          is young enough that the boundaries were genuinely unclear until recently.
        </Para>

        <Para>
          But the confusion is expensive. If you are targeting a data engineering role and
          you do not clearly understand where the role ends and data science begins, you
          will prepare the wrong skills, apply to the wrong jobs, and be blindsided in
          interviews. If you are already in a data role, not understanding these boundaries
          means you cannot have productive conversations about responsibilities with your team.
        </Para>

        <HighlightBox>
          <div style={{
            fontSize: 15, fontWeight: 800, color: 'var(--text)',
            fontFamily: 'var(--font-display)', letterSpacing: '-0.3px', marginBottom: 12,
          }}>
            The one question that defines each role
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { role: 'Data Engineer',   color: '#00e676', question: '"Is the data getting where it needs to go, reliably and at scale?"' },
              { role: 'Data Analyst',    color: '#7b61ff', question: '"What does the data tell us about what happened and why?"' },
              { role: 'Data Scientist',  color: '#f97316', question: '"What will likely happen next, and what factors drive it?"' },
              { role: 'ML Engineer',     color: '#4285f4', question: '"How do we serve model predictions reliably to millions of users?"' },
            ].map((item) => (
              <div key={item.role} style={{
                borderLeft: `3px solid ${item.color}`,
                paddingLeft: 14,
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: item.color,
                  fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                  textTransform: 'uppercase', marginBottom: 6,
                }}>{item.role}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, fontStyle: 'italic' }}>
                  {item.question}
                </div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <Para>
          Each role asks a fundamentally different question. The data engineer asks whether
          data is moving correctly. The analyst asks what the data reveals. The scientist
          asks what the data predicts. The ML engineer asks how predictions reach users.
          These questions require different skills, different tools, and different kinds
          of thinking. They are not interchangeable.
        </Para>
      </section>

      <Divider />

      {/* ── Part 02 — Data Engineer ──────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Role One" />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
            background: 'rgba(0,230,118,0.12)', border: '2px solid #00e676',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
          }}>🔧</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
            letterSpacing: '-1px', color: '#00e676', margin: 0,
            fontFamily: 'var(--font-display)', lineHeight: 1.2,
          }}>Data Engineer</h2>
        </div>

        <Para>
          The data engineer is the infrastructure builder of the data world. Their job
          is to make data reliably available to everyone else — analysts, scientists,
          ML engineers, and the business. Without a data engineer, every other data role
          spends most of their time doing data engineering work badly instead of doing
          their actual job well.
        </Para>

        <SubTitle>What they own</SubTitle>
        <Para>
          Data engineers own the pipelines that move data and the platforms that store it.
          They design the architecture of the data lake, build the ingestion connectors,
          write the transformation logic that cleans and structures data, schedule and
          monitor every automated job, and maintain the data quality checks that ensure
          downstream consumers can trust what they receive. When data is wrong, missing,
          or late, a data engineer investigates and fixes it.
        </Para>

        <CodeBox label="A data engineer's actual daily work — mapped to skills">{`TASK                              PRIMARY SKILL USED
────────────────────────────────────────────────────────────────
Build ingestion pipeline from     Python (requests, SQLAlchemy,
Razorpay API to data lake         retry logic, checkpointing)

Write transformation that          SQL (CTEs, window functions,
cleans and deduplicates orders    deduplication patterns)

Debug why yesterday's pipeline    Investigation skills + SQL +
produced 15% fewer rows           knowledge of data layers

Design the Bronze-Silver-Gold     Systems thinking +
table structure for a new source  data modelling concepts

Schedule and monitor all          Apache Airflow (DAGs,
pipelines with alerting           operators, SLAs, XComs)

Optimise a slow Snowflake query   SQL query plans + warehouse
from 40 min to 3 min              internals (clustering, partitions)

Review a junior DE's code         Python best practices + pipeline
for error handling gaps           design principles

SKILLS PROFILE:
  Python:      ████████████  Expert
  SQL:         ████████████  Expert
  System design: ████████    Strong
  Statistics:  ████          Basic
  ML concepts: ████          Basic
  Visualisation: ██          Minimal`}</CodeBox>

        <SubTitle>What they do not own</SubTitle>
        <Para>
          Data engineers do not build dashboards — that is the analyst's job. They do not
          train machine learning models — that is the data scientist's job. They do not
          deploy models to production APIs — that is the ML engineer's job. They do not
          define business metrics — that is a business decision made by stakeholders.
          A data engineer who is doing all of these things is a data engineer at a company
          too small to have the right specialists yet.
        </Para>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12, marginBottom: 24,
        }}>
          {[
            { label: 'Primary language', value: 'Python + SQL' },
            { label: 'Secondary languages', value: 'Bash, Scala (Spark jobs)' },
            { label: 'Core tools', value: 'Airflow, dbt, Spark, Kafka, cloud storage' },
            { label: 'Output', value: 'Reliable data pipelines and clean data tables' },
            { label: 'Collaborates most with', value: 'Data analysts, data scientists, platform/infra teams' },
            { label: 'India salary (mid, Bangalore)', value: '₹18–30 LPA (product company)' },
          ].map((item) => (
            <div key={item.label} style={{
              background: 'var(--surface)', border: '1px solid rgba(0,230,118,0.2)',
              borderRadius: 8, padding: '12px 16px',
            }}>
              <div style={{
                fontSize: 10, fontWeight: 700, color: '#00e676',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase', marginBottom: 4,
              }}>{item.label}</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Part 03 — Data Analyst ───────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Role Two" />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
            background: 'rgba(123,97,255,0.12)', border: '2px solid #7b61ff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
          }}>📊</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
            letterSpacing: '-1px', color: '#7b61ff', margin: 0,
            fontFamily: 'var(--font-display)', lineHeight: 1.2,
          }}>Data Analyst</h2>
        </div>

        <Para>
          The data analyst is the translator between data and business decisions. Their
          job is to take clean, reliable data that the data engineer has made available
          and turn it into insights that business teams can understand, trust, and act on.
          A great analyst makes a business smarter about what is actually happening and why.
        </Para>

        <SubTitle>What they own</SubTitle>
        <Para>
          Data analysts own the analysis — the questions asked of data and the answers
          delivered. They write SQL queries to explore data, build dashboards that track
          business metrics, create reports for stakeholders, and conduct ad-hoc analysis
          when a business question arises. They define what the metrics mean, verify that
          the numbers tell a coherent story, and present findings in a way non-technical
          stakeholders can act on.
        </Para>

        <CodeBox label="A data analyst's actual daily work — mapped to skills">{`TASK                              PRIMARY SKILL USED
────────────────────────────────────────────────────────────────
Build a weekly retention          SQL (cohort queries, date math,
dashboard for the growth team     window functions)

Investigate why conversion         SQL exploration + business
dropped 8% last week              domain knowledge

Create a Power BI report           Power BI / Tableau +
showing revenue by city            visualisation best practices

Define the "active user"           Business logic + stakeholder
metric for the product team       communication

Validate that the new DE           SQL + cross-checking numbers
pipeline produces correct numbers  against known sources

Answer: "Which acquisition          SQL (multi-step analysis) +
channel has best LTV?"             Excel / Google Sheets

SKILLS PROFILE:
  SQL:           ████████████  Expert (their primary tool)
  Visualisation: ████████████  Expert
  Business acumen: ████████    Strong
  Python:        ████          Basic to intermediate
  Statistics:    ████████      Intermediate
  ML concepts:   ██            Minimal
  Pipeline code: ██            Minimal`}</CodeBox>

        <SubTitle>The key difference from a data engineer</SubTitle>
        <Para>
          Both roles use SQL heavily. The difference is in what they do with it. A data
          analyst uses SQL to ask questions — to explore and summarise data to find
          answers. A data engineer uses SQL to build and maintain data models — to
          create the structures that analysts query. An analyst's SQL query runs once
          to answer a question. A data engineer's SQL model runs automatically every
          day in production.
        </Para>

        <Para>
          Analysts do not write pipeline code, manage infrastructure, or handle data
          ingestion. When a data analyst hits a data quality issue, they raise it to
          the data engineering team. When they need a new data source, they request it
          from data engineering. The analyst depends on the data engineer having done
          their job well — and suffers directly when they have not.
        </Para>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12, marginBottom: 24,
        }}>
          {[
            { label: 'Primary language', value: 'SQL' },
            { label: 'Secondary tools', value: 'Excel, Python (basic), Power BI, Tableau' },
            { label: 'Core tools', value: 'BI tools (Power BI/Tableau/Looker/Metabase), SQL IDE' },
            { label: 'Output', value: 'Dashboards, reports, ad-hoc analysis, metric definitions' },
            { label: 'Collaborates most with', value: 'Product managers, business teams, data engineers' },
            { label: 'India salary (mid, Bangalore)', value: '₹8–18 LPA (product company)' },
          ].map((item) => (
            <div key={item.label} style={{
              background: 'var(--surface)', border: '1px solid rgba(123,97,255,0.2)',
              borderRadius: 8, padding: '12px 16px',
            }}>
              <div style={{
                fontSize: 10, fontWeight: 700, color: '#7b61ff',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase', marginBottom: 4,
              }}>{item.label}</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Part 04 — Data Scientist ─────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Role Three" />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
            background: 'rgba(249,115,22,0.12)', border: '2px solid #f97316',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
          }}>🔬</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
            letterSpacing: '-1px', color: '#f97316', margin: 0,
            fontFamily: 'var(--font-display)', lineHeight: 1.2,
          }}>Data Scientist</h2>
        </div>

        <Para>
          The data scientist uses statistical and machine learning techniques to extract
          predictions, patterns, and causal understanding from data. Where the analyst
          looks backward — explaining what happened — the data scientist looks forward:
          what will likely happen next, and why.
        </Para>

        <SubTitle>What they own</SubTitle>
        <Para>
          Data scientists own the modelling work — defining the problem as a machine
          learning or statistical task, selecting and engineering features, training and
          evaluating models, and interpreting results for the business. They run experiments
          (A/B tests, bandit algorithms) to test causal hypotheses. They build the
          recommendation engines, fraud detection models, demand forecasting systems,
          and churn prediction models that power data-driven products.
        </Para>

        <CodeBox label="A data scientist's actual daily work — mapped to skills">{`TASK                              PRIMARY SKILL USED
────────────────────────────────────────────────────────────────
Train a churn prediction model     Python (scikit-learn, XGBoost)
for 6-month customer data          + statistics + feature engineering

Design an A/B test for a new       Statistics (hypothesis testing,
recommendation feature             power analysis, p-values)

Analyse whether a new pricing      Causal inference + regression
strategy caused revenue lift       analysis + business context

Build a demand forecasting         Time series analysis (Prophet,
model for Zepto's dark stores      ARIMA, or deep learning)

Present model results to           Communication + storytelling
the product team                   + visualisation

Request training data from         Collaboration with data engineers
the DE team (feature pipeline)     + feature specification

SKILLS PROFILE:
  Python (ML):   ████████████  Expert
  Statistics:    ████████████  Expert
  SQL:           ████████      Strong (queries, feature extraction)
  ML frameworks: ████████████  Expert (scikit-learn, PyTorch, etc.)
  Business acumen: ████████    Strong
  Pipeline code: ████          Basic (can write, not their primary job)
  Production infra: ████       Basic`}</CodeBox>

        <SubTitle>The critical dependency on data engineering</SubTitle>
        <Para>
          Data scientists are the most dependent of all roles on data engineering being
          done well. A data scientist who does not have reliable, clean feature data cannot
          train a trustworthy model. A model trained on inconsistent data will behave
          unpredictably in production. Studies consistently show that data scientists
          spend 60–80% of their time on data cleaning and preparation at companies
          with poor data engineering — which means 60–80% of an expensive, specialised
          skill set is wasted on work that should not be their job.
        </Para>

        <Para>
          At a well-engineered company, data scientists get clean feature tables from
          the data engineer and spend the majority of their time on actual modelling
          work. This is why good data engineering multiplies the productivity of the
          entire data organisation.
        </Para>

        <Callout type="info">
          <strong>Data Scientist vs Data Analyst — the clearest distinction:</strong> A data
          analyst tells you what happened. A data scientist tells you what will likely happen.
          An analyst builds a report showing last quarter's churn rate. A data scientist
          builds a model that predicts which customers will churn next month before they
          actually do — so the business can intervene.
        </Callout>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12, marginBottom: 24,
        }}>
          {[
            { label: 'Primary language', value: 'Python' },
            { label: 'Core libraries', value: 'scikit-learn, PyTorch, TensorFlow, pandas, NumPy, statsmodels' },
            { label: 'Core tools', value: 'Jupyter notebooks, MLflow, feature stores, experiment trackers' },
            { label: 'Output', value: 'Trained models, experiment results, predictions, research findings' },
            { label: 'Collaborates most with', value: 'Data engineers (features), ML engineers (deployment), product (requirements)' },
            { label: 'India salary (mid, Bangalore)', value: '₹15–28 LPA (product company)' },
          ].map((item) => (
            <div key={item.label} style={{
              background: 'var(--surface)', border: '1px solid rgba(249,115,22,0.2)',
              borderRadius: 8, padding: '12px 16px',
            }}>
              <div style={{
                fontSize: 10, fontWeight: 700, color: '#f97316',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase', marginBottom: 4,
              }}>{item.label}</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Part 05 — ML Engineer ────────────────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Role Four" />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
            background: 'rgba(66,133,244,0.12)', border: '2px solid #4285f4',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
          }}>⚙️</div>
          <h2 style={{
            fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900,
            letterSpacing: '-1px', color: '#4285f4', margin: 0,
            fontFamily: 'var(--font-display)', lineHeight: 1.2,
          }}>ML Engineer</h2>
        </div>

        <Para>
          The ML engineer sits at the intersection of data science and software engineering.
          Their job is to take a model that a data scientist trained in a notebook and
          make it reliably serve predictions to millions of users in a production application —
          with the same engineering rigour applied to any production software system.
        </Para>

        <SubTitle>What they own</SubTitle>
        <Para>
          ML engineers own the production ML systems — model serving infrastructure,
          real-time feature pipelines, model monitoring, retraining pipelines, and the
          APIs that serve predictions to applications. When a data scientist says "the
          model is ready," the ML engineer takes over and makes it production-grade.
          This involves containerising the model, building the serving API, setting up
          monitoring to detect model drift, and building the automation that retrains
          and redeploys the model when its performance degrades.
        </Para>

        <CodeBox label="A ML engineer's actual daily work — mapped to skills">{`TASK                              PRIMARY SKILL USED
────────────────────────────────────────────────────────────────
Wrap a trained model in a          Python (FastAPI, Flask) +
REST API with <50ms latency        Docker + optimisation

Build real-time feature pipeline   Python + Kafka + Redis
that serves features in <10ms      (low-latency data access)

Set up model monitoring that       MLflow / Evidently + Python
alerts when predictions drift      + statistical drift detection

Build automated retraining         Python + Airflow/Prefect +
pipeline triggered by metric drop  model evaluation logic

Deploy model to Kubernetes         Docker + Kubernetes + CI/CD
with autoscaling and rollback      + cloud (EKS/AKS/GKE)

Benchmark: can our fraud model     Performance profiling +
score 10,000 transactions/second?  load testing + optimisation

SKILLS PROFILE:
  Python:        ████████████  Expert
  Software eng:  ████████████  Expert (APIs, testing, CI/CD)
  ML frameworks: ████████████  Expert
  Statistics:    ████████      Strong
  Infrastructure: ████████     Strong (Docker, K8s, cloud)
  SQL:           ████████      Strong
  Pipeline code: ████████      Strong (real-time focus)`}</CodeBox>

        <SubTitle>How ML engineer differs from data scientist</SubTitle>
        <Para>
          Data scientists optimise for model accuracy — they care about whether the model
          predicts correctly. ML engineers optimise for model reliability — they care about
          whether the model serves predictions correctly, consistently, and at the required
          speed, without failing, even when traffic is 10× normal. A data scientist's
          primary artefact is a trained model. An ML engineer's primary artefact is a
          system that serves model predictions reliably in production.
        </Para>

        <SubTitle>How ML engineer differs from data engineer</SubTitle>
        <Para>
          Both roles build data pipelines, but for different purposes. A data engineer
          builds batch pipelines that process large historical datasets for analysis.
          An ML engineer builds real-time feature pipelines that serve pre-computed
          features with millisecond latency for live model inference. A data engineer's
          pipeline can tolerate one-hour latency. An ML engineer's feature pipeline must
          respond in under 10 milliseconds.
        </Para>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12, marginBottom: 24,
        }}>
          {[
            { label: 'Primary language', value: 'Python' },
            { label: 'Core tools', value: 'Docker, Kubernetes, MLflow, FastAPI, Redis, SageMaker/Azure ML/Vertex AI' },
            { label: 'Output', value: 'Production model APIs, feature stores, retraining pipelines, model monitoring' },
            { label: 'Collaborates most with', value: 'Data scientists (models), data engineers (features), platform/infra (deployment)' },
            { label: 'Background', value: 'Often software engineers who moved into ML, or data scientists who went deep on engineering' },
            { label: 'India salary (mid, Bangalore)', value: '₹20–35 LPA (product company)' },
          ].map((item) => (
            <div key={item.label} style={{
              background: 'var(--surface)', border: '1px solid rgba(66,133,244,0.2)',
              borderRadius: 8, padding: '12px 16px',
            }}>
              <div style={{
                fontSize: 10, fontWeight: 700, color: '#4285f4',
                fontFamily: 'var(--font-mono)', letterSpacing: '.1em',
                textTransform: 'uppercase', marginBottom: 4,
              }}>{item.label}</div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Part 06 — Side-by-Side Comparison ───────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Direct Comparison" />
        <SectionTitle>All Four Roles — Side by Side</SectionTitle>

        <Para>
          The fastest way to permanently internalise the boundaries is to see the same
          dimension compared across all four roles at once.
        </Para>

        <CodeBox label="Four roles compared across every important dimension">{`DIMENSION          DATA ENGINEER    DATA ANALYST     DATA SCIENTIST   ML ENGINEER
─────────────────────────────────────────────────────────────────────────────────
Core question      "Is data moving  "What happened   "What will       "How do predictions
                   reliably?"       and why?"        happen next?"    reach users at scale?"

Primary output     Pipelines +      Dashboards +     Trained models + Production ML
                   data tables      reports          experiment results systems + APIs

Primary skill      Python +         SQL +            Python +         Python +
                   system design    visualisation    statistics       software engineering

SQL usage          Build models     Query for        Extract features Query for
                   that run daily   ad-hoc answers   for training     monitoring

Python usage       Pipeline code    Basic scripts    Model training   APIs + infra

Cares about        Pipeline         Business logic   Statistical      Model latency,
data quality for   correctness      correctness      quality of data  throughput, drift

Works with data    Moves it,        Queries it,      Trains on it,    Serves predictions
                   structures it    analyses it      learns from it   from it

Infra ownership    Data platform    None             Notebooks/       Full production
                   (lake, warehouse)                 experiments      ML infra

Depends on         Source systems   Data engineers   Data engineers   Data scientists
                   being accessible making data      for clean data   for trained models
                                    reliable + clean

Blocked when       Source schema    DE pipeline      Data is dirty,   Model is not
                   changes          fails or data    unstructured,    production-ready
                                    is stale         or unavailable   or drifting

Typical background CS, SWE, or      Business, econ,  Statistics,      SWE or DS with
                   analytics        analytics, CS    maths, CS        strong eng skills`}</CodeBox>

        <SubTitle>The dependency chain — visualised</SubTitle>

        <Para>
          These roles are not independent. They form a chain where each role enables the
          next. This chain is why data engineering being done well has a multiplier effect
          on the entire organisation, and why data engineering being done poorly makes
          everyone downstream less effective.
        </Para>

        <CodeBox label="The dependency chain — who enables whom">{`Raw data in source systems
         │
         │  Ingestion, transformation, quality, reliability
         ▼
┌─────────────────────────────────────────────┐
│            DATA ENGINEER                    │
│  Builds and maintains the data platform     │
│  Ensures clean, timely, trustworthy data    │
└──────────────┬──────────────────────────────┘
               │  Reliable, structured data available
     ┌─────────┴──────────────┐
     │                        │
     ▼                        ▼
DATA ANALYST             DATA SCIENTIST
Queries Gold tables      Gets Silver/feature
for business insights    tables for model training
Builds dashboards        Trains models, runs experiments
Reports findings         Produces predictions
     │                        │
     ▼                        ▼
Business decisions       ML ENGINEER
Strategy, resource       Takes trained model
allocation, product      Makes it production-grade
planning                 Serves predictions in real-time
                         Monitors for drift
                              │
                              ▼
                         Production ML features
                         (recommendations, fraud scores,
                          demand forecasts, rankings)

Impact of DE failure:
  If DE pipelines fail:
    → Analyst has no data to analyse → dashboard goes stale
    → Scientist has no training data → models cannot be retrained
    → ML Engineer has no features → model predictions degrade silently`}</CodeBox>
      </section>

      <Divider />

      {/* ── Part 07 — The Unicorn DE and Overlap ────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Overlap and Reality" />
        <SectionTitle>Where the Roles Overlap — And What "Unicorn" Really Means</SectionTitle>

        <Para>
          In a perfect world with unlimited budget, every company would have dedicated
          specialists in each role. In the real world — especially at early-stage startups —
          one or two people cover all four roles. This creates the "unicorn data scientist"
          myth: one person who can ingest, clean, model, deploy, and visualise everything.
        </Para>

        <SubTitle>What actually happens at different company stages</SubTitle>

        {[
          {
            stage: 'Early Startup (Seed to Series A)',
            employees: '< 50 people',
            reality: 'One person does everything data-related. They write ingestion scripts, build dashboards, train basic models, and answer ad-hoc business questions. They are not specialised in any role — they cover all four inadequately but acceptably for the business stage.',
            title: '"Data Scientist" or "Data Person" — actually doing all four roles',
            color: '#00e676',
          },
          {
            stage: 'Growth Stage (Series B to C)',
            employees: '50–200 people',
            reality: 'The first specialisation happens. Usually: one data engineer to build reliable infrastructure, and one or two analyst-heavy people who also do some science. ML is still an afterthought or done by the scientists deploying their own models poorly.',
            title: '"Data Engineer" + "Data Analyst/Scientist" (hybrid role)',
            color: '#7b61ff',
          },
          {
            stage: 'Scale Stage (Series D+)',
            employees: '200–1000 people',
            reality: 'Clear separation of DE and DA/DS. A dedicated ML engineering function may emerge. Data engineering becomes a team of 3–8 people owning the platform. Analytics and data science split into separate functions or sub-teams.',
            title: 'Distinct DE / DA / DS teams, early MLE function',
            color: '#f97316',
          },
          {
            stage: 'Large/FAANG India',
            employees: '1000+ people',
            reality: 'All four roles are fully separated with career ladders, L4–L8 or equivalent levels, and sub-specialisations within each role. Data engineering has platform engineers, pipeline engineers, and analytics engineers. Data science has applied scientists and research scientists.',
            title: 'Fully specialised four-role structure with sub-specialisations',
            color: '#4285f4',
          },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex', gap: 16, marginBottom: 14,
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, overflow: 'hidden',
          }}>
            <div style={{ width: 4, background: item.color, flexShrink: 0 }} />
            <div style={{ padding: '16px 20px 16px 4px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                <div style={{
                  fontSize: 13, fontWeight: 800, color: 'var(--text)',
                  fontFamily: 'var(--font-display)',
                }}>{item.stage}</div>
                <div style={{
                  fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)',
                  background: `${item.color}15`, border: `1px solid ${item.color}30`,
                  borderRadius: 4, padding: '2px 8px',
                }}>{item.employees}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 8 }}>
                {item.reality}
              </div>
              <div style={{
                fontSize: 12, color: item.color, fontFamily: 'var(--font-mono)',
                fontStyle: 'italic',
              }}>
                Job title reality: {item.title}
              </div>
            </div>
          </div>
        ))}

        <Callout type="warning">
          <strong>Watch out for "data scientist" job postings that list data engineering as a requirement.</strong>{' '}
          At companies below Series B, "Data Scientist" often means "person who does all
          data work including engineering." Before accepting such a role, clarify: are you
          expected to build and maintain production pipelines? If yes, that is data engineering
          work that should be compensated and titled accordingly. Working as a hidden data
          engineer under a data scientist title is a career positioning mistake.
        </Callout>

        <SubTitle>The Analytics Engineer — the emerging fifth role</SubTitle>

        <Para>
          A relatively new role that sits at the boundary of data engineering and data
          analysis is the <strong>Analytics Engineer</strong>. Analytics engineers own the
          transformation layer — they write dbt models that turn raw data into clean,
          analysis-ready tables. They have stronger SQL skills than a typical data engineer
          but stronger data modelling instincts than a typical analyst.
        </Para>

        <Para>
          Analytics engineers are hired by companies where the transformation work is
          large enough to need a dedicated owner, but the work is SQL-based rather
          than Python pipeline-based. They are the main users of dbt in most organisations.
          If you enjoy SQL data modelling more than pipeline infrastructure, this is an
          increasingly viable career path with strong demand in 2026.
        </Para>
      </section>

      <Divider />

      {/* ── Part 08 — Which Role to Target ──────────────────────────── */}
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 08 — Career Decision" />
        <SectionTitle>Which Role Should You Target? An Honest Decision Framework</SectionTitle>

        <Para>
          This is the most practically important part of this module for someone at
          the beginning of their career. The answer is not "whichever pays the most"
          or "whichever sounds most impressive." The answer is "whichever matches
          how your brain actually works and what kind of problems you genuinely enjoy."
        </Para>

        <Para>
          The fastest way to get clarity is to answer these four questions honestly:
        </Para>

        <HighlightBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              {
                question: 'What kind of problem gives you the deepest satisfaction to solve?',
                options: [
                  { label: 'Building systems that run reliably without human intervention', role: 'Data Engineer' },
                  { label: 'Finding the story hidden in a dataset and communicating it', role: 'Data Analyst' },
                  { label: 'Building models that predict things humans cannot easily predict', role: 'Data Scientist' },
                  { label: 'Making complex ML systems work reliably at production scale', role: 'ML Engineer' },
                ],
              },
              {
                question: 'Which of these activities sounds most natural to you?',
                options: [
                  { label: 'Debugging why a pipeline produced wrong results at 2am', role: 'Data Engineer' },
                  { label: 'Presenting a data story to a non-technical business team', role: 'Data Analyst' },
                  { label: 'Running experiments and interpreting statistical results', role: 'Data Scientist' },
                  { label: 'Optimising an API to reduce latency from 200ms to 30ms', role: 'ML Engineer' },
                ],
              },
              {
                question: 'Which skill are you most motivated to become genuinely expert in?',
                options: [
                  { label: 'Python pipeline engineering and data architecture', role: 'Data Engineer' },
                  { label: 'SQL and business intelligence tools', role: 'Data Analyst' },
                  { label: 'Statistics, machine learning algorithms, and experimentation', role: 'Data Scientist' },
                  { label: 'ML systems, APIs, Docker, and production infrastructure', role: 'ML Engineer' },
                ],
              },
            ].map((q, qi) => (
              <div key={qi}>
                <div style={{
                  fontSize: 13, fontWeight: 700, color: 'var(--text)',
                  marginBottom: 10, lineHeight: 1.4,
                }}>
                  {qi + 1}. {q.question}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {q.options.map((opt, oi) => {
                    const colors: Record<string, string> = {
                      'Data Engineer': '#00e676',
                      'Data Analyst': '#7b61ff',
                      'Data Scientist': '#f97316',
                      'ML Engineer': '#4285f4',
                    }
                    const c = colors[opt.role]
                    return (
                      <div key={oi} style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        background: 'var(--bg2)', border: '1px solid var(--border)',
                        borderRadius: 8, padding: '8px 14px',
                      }}>
                        <div style={{
                          fontSize: 10, fontWeight: 700, color: c,
                          fontFamily: 'var(--font-mono)', letterSpacing: '.08em',
                          textTransform: 'uppercase', flexShrink: 0, minWidth: 100,
                        }}>{opt.role}</div>
                        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
                          {opt.label}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <SubTitle>The honest advice for non-IT background candidates</SubTitle>

        <Para>
          If you are coming from a non-IT background, the most accessible path in
          terms of time to first job and availability of entry-level roles is
          typically: <strong>Data Analyst → Data Engineer</strong> in that order, or
          Data Engineer directly if you are comfortable with programming concepts.
        </Para>

        <Para>
          Data analysis is accessible with strong SQL skills alone — you do not need
          Python to get a first analyst job. Data science requires a strong statistics
          background that takes longer to build. ML engineering requires solid software
          engineering foundations on top of ML knowledge. Data engineering is in between —
          you need Python and SQL, but you do not need advanced mathematics.
        </Para>

        <CodeBox label="Realistic time to first job from zero — non-IT background">{`Role               Min time to    Key bottleneck
                   first job

Data Analyst       4–6 months     SQL proficiency + BI tool (Power BI/Tableau)
                                  + portfolio of analysis projects

Data Engineer      6–9 months     Python + SQL + one cloud cert (DP-203 or
                                  AWS SAA) + 3 pipeline projects on GitHub

Data Scientist     12–18 months   Statistics + Python (ML libs) + maths background
                                  The statistics foundation takes longest to build

ML Engineer        18–24 months   Requires strong software engineering first,
                                  then ML + production infra on top

These timelines assume 15–20 hours/week of focused study.
Consistent daily practice beats intensive weekend sprints.`}</CodeBox>
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
        <SectionTitle>One Business Problem — Four Roles, Four Completely Different Jobs</SectionTitle>

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
            Scenario — Food Delivery App · New Feature: Personalised Recommendations
          </div>

          <Para>
            The product team wants to build a "Recommended for You" section on the
            home screen. Each user sees restaurants personalised to their taste history.
            Here is what each role does to make this happen.
          </Para>

          {[
            {
              role: 'Data Engineer',
              color: '#00e676',
              work: [
                'Builds a pipeline that ingests every order event from Kafka into the data lake in near real-time',
                'Creates a Silver table: one row per user per restaurant, with aggregated order count, last order date, and average rating given',
                'Creates a feature table: one row per user with pre-computed features — favourite cuisine, average order time, price sensitivity bucket, city, device type',
                'Schedules the feature table to rebuild every 6 hours so features stay fresh',
                'Adds data quality checks: alerts if user count drops more than 5% vs previous run',
              ],
              deliverable: 'A reliable, fresh feature table that the data scientist can train on and the ML engineer can serve from',
            },
            {
              role: 'Data Analyst',
              color: '#7b61ff',
              work: [
                'Analyses historical order data to understand: how many users order from the same restaurant repeatedly vs exploring new ones',
                'Segments users into behaviour groups: loyal, explorers, price-sensitive, cuisine-specific',
                'Measures baseline engagement: how often users currently open the home screen and what they click',
                'Defines the success metric: "recommendation click-through rate" and how to measure it in a fair A/B test',
                'Builds a pre-launch dashboard that tracks the control vs treatment group performance daily',
              ],
              deliverable: 'Business understanding of user behaviour and a measurement framework for evaluating whether the feature works',
            },
            {
              role: 'Data Scientist',
              color: '#f97316',
              work: [
                'Defines the ML problem: predict the probability that user U will order from restaurant R in the next 7 days',
                'Explores the feature table built by the data engineer to understand signal quality and coverage',
                'Trains a collaborative filtering model on 6 months of order history',
                'Evaluates model performance: precision@10 (are the top 10 recommended restaurants ones the user would actually order from?)',
                'Runs offline experiments to compare different model approaches, selects the best one',
                'Hands the trained model artefact to the ML engineer with documentation on input features and expected output format',
              ],
              deliverable: 'A trained recommendation model that achieves target offline metrics, ready for production deployment',
            },
            {
              role: 'ML Engineer',
              color: '#4285f4',
              work: [
                'Wraps the trained model in a FastAPI serving endpoint that accepts user_id and returns ranked restaurant list',
                'Builds a real-time feature serving pipeline: when a request comes in, fetches the user\'s pre-computed features from Redis in under 5ms',
                'Load tests the endpoint to verify it handles 50,000 requests per minute with <100ms p99 latency',
                'Sets up model monitoring: alerts if the distribution of predicted scores shifts more than 10% from baseline',
                'Builds automated retraining: if click-through rate drops below threshold for 3 consecutive days, trigger a model retrain with fresh data',
                'Deploys to production with a feature flag so the product team can roll out to 5% of users first',
              ],
              deliverable: 'A production recommendation API serving personalised results to millions of users with <100ms latency, full monitoring, and automated retraining',
            },
          ].map((item) => (
            <div key={item.role} style={{
              background: 'var(--bg2)', border: `1px solid ${item.color}30`,
              borderRadius: 10, padding: '18px 22px', marginBottom: 16,
            }}>
              <div style={{
                fontSize: 13, fontWeight: 800, color: item.color,
                fontFamily: 'var(--font-display)', marginBottom: 12,
              }}>
                {item.role}
              </div>
              <div style={{ marginBottom: 12 }}>
                {item.work.map((w, i) => (
                  <div key={i} style={{
                    fontSize: 13, color: 'var(--muted)', lineHeight: 1.7,
                    paddingLeft: 14, borderLeft: `2px solid ${item.color}40`,
                    marginBottom: 6,
                  }}>
                    {w}
                  </div>
                ))}
              </div>
              <div style={{
                fontSize: 12, color: item.color,
                background: `${item.color}10`, border: `1px solid ${item.color}25`,
                borderRadius: 6, padding: '6px 12px', lineHeight: 1.5,
              }}>
                <strong>Deliverable:</strong> {item.deliverable}
              </div>
            </div>
          ))}

          <Para>
            Every role was essential. The ML engineer cannot serve what the scientist
            did not train. The scientist cannot train what the data engineer did not
            prepare. The analyst cannot measure what the product team did not define.
            And none of it reaches users without the ML engineer's production system.
            This is the dependency chain made real.
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
            q: 'Q1. How would you explain the difference between a data engineer and a data scientist to a non-technical hiring manager?',
            a: `I would use a construction analogy. Building a house requires both architects who design the structure and interior designers who make it liveable and beautiful. Both professions work on the same house, but they solve completely different problems and require completely different skills.

A data engineer is the architect and structural engineer of the data world. They design and build the systems that move data from where it is created to where it needs to be used — the pipes, the foundations, the infrastructure that makes everything else possible. Their work is invisible when it is working correctly and immediately catastrophic when it is not.

A data scientist is the interior designer of the data world. They take the clean, reliable space that the engineer created and do the creative, analytical work of turning it into something useful — discovering patterns, building predictive models, and generating insights that the business can act on. A brilliant data scientist working with unreliable data is like a brilliant interior designer working in a building with crumbling walls.

The most important point for a hiring manager to understand: data science without data engineering is expensive hypothesis generation. Data engineering without data science is infrastructure without a clear use case. The best data teams invest in both.`,
          },
          {
            q: 'Q2. A job posting is titled "Data Scientist" but requires building and maintaining ETL pipelines, writing Airflow DAGs, and managing the data warehouse. Is this a data scientist role?',
            a: `No, this is a data engineering role with a data scientist title. This is a common misclassification that happens for two reasons: the company does not yet understand the difference between the roles, or they want to pay data science salaries for data engineering work under the assumption that "data science" sounds more senior.

Building and maintaining ETL pipelines, writing Airflow DAGs, and managing the data warehouse are data engineering responsibilities, not data science responsibilities. These tasks require Python pipeline engineering skills, not statistical modelling or machine learning skills. They would take at least 60–70% of the time in that role.

As a candidate, I would ask in the interview: "What percentage of my time would be spent on pipeline maintenance and infrastructure versus statistical modelling and machine learning?" If the honest answer is that pipeline work dominates, I would negotiate for a data engineer title and compensation, or assess whether the role fits my career goals. Taking a data engineering job under a data scientist title positions you incorrectly in the market — when you apply for your next job, your experience will be read as data engineering experience regardless of what your title says.`,
          },
          {
            q: 'Q3. Why does the quality of data engineering work directly affect data science productivity?',
            a: `A data scientist's raw material is clean, well-structured data. Everything they produce — models, predictions, insights — is only as reliable as the data they trained on. When data engineering is done poorly, data scientists encounter four productivity killers that consume most of their time and degrade the quality of their output.

First, they spend time cleaning data that should have been cleaned in the pipeline. Studies from various data teams show data scientists spend 60–80% of their time on data preparation at companies with poor data infrastructure. This is expensive because data scientists are typically the highest-paid people on the data team.

Second, they cannot trust the data. A model trained on data with silent quality issues learns incorrect patterns. The model may appear to perform well in offline evaluation but behave unpredictably in production, because the issues in the training data are present in the production data too.

Third, they cannot iterate quickly. Every experiment requires re-cleaning data from scratch because there is no reliable feature table to start from. The cost of experimentation is high.

Fourth, they cannot reproduce results. If the pipeline that generated training data had bugs, the trained model cannot be reliably reproduced or audited. This is a significant problem in regulated industries.

When data engineering is done well — reliable pipelines, clean Silver tables, well-maintained feature stores — a data scientist can focus entirely on the statistical and modelling work. Their iteration cycle shortens from weeks to days. Their models are more trustworthy. Their output is more valuable.`,
          },
          {
            q: 'Q4. What is an analytics engineer and how do they differ from a data engineer and a data analyst?',
            a: `An analytics engineer sits at the boundary between data engineering and data analysis. The role emerged primarily because of dbt — the data transformation tool that lets teams write transformation logic in SQL, version-controlled and tested like software code.

A traditional data engineer focuses on the infrastructure and pipeline layer: ingestion, orchestration, storage architecture, data quality monitoring, and the Python code that moves data. They are infrastructure-minded and pipeline-focused.

A traditional data analyst focuses on the consumption layer: writing queries, building dashboards, and communicating insights to business stakeholders. They are business-minded and analysis-focused.

An analytics engineer focuses on the transformation layer — the middle ground. They write the dbt models that transform raw ingested data into clean, business-ready tables. They are the owners of the semantic layer: defining what "revenue" means, how "active users" is calculated, what the rules are for counting an order as "delivered." They have stronger SQL skills than a typical data engineer but deeper data modelling instincts than a typical analyst.

In terms of tools, an analytics engineer primarily uses dbt, SQL, and version control. They collaborate closely with data engineers (who own the raw data they transform) and data analysts (who consume the clean tables they produce). The role exists because the transformation work at many companies is large enough to need a dedicated owner with skills that span both engineering discipline and analytical thinking.`,
          },
          {
            q: 'Q5. A data scientist on your team complains that they spend most of their time cleaning data. As a data engineer, how do you respond and what do you do?',
            a: `This complaint is one of the most valuable signals a data engineering team can receive. It means the data engineering work is not meeting the needs of the data science team. My response has two parts: immediate investigation and systematic fix.

Immediately, I would sit down with the data scientist and understand specifically what cleaning they are doing. I want to understand: which tables are problematic, what kind of cleaning (deduplication, null handling, type casting, joining), how much time they are spending on each issue, and whether the issues are consistent or random.

This conversation almost always reveals one of three root causes. First, the Silver layer tables I built do not go far enough — they are technically clean but missing transformations the scientist needs, like pre-joined reference data or derived features. Second, there are data quality issues I was not aware of — schema changes from source systems, null values in columns that should not be nullable, or duplicate records slipping through. Third, the data scientist is working with raw data that was never intended to be clean — they should be using Silver or Gold tables, not Bronze.

The systematic fix depends on the root cause. If Silver tables are insufficient, I work with the data scientist to understand what they need and extend the transformation layer. If quality issues exist, I add data quality checks to the affected pipeline steps. If they are using the wrong layer, I document which table they should use for which use case.

The broader principle: data engineering success is measured by whether downstream consumers can do their jobs without thinking about data infrastructure. If a data scientist is spending time on data problems, that is a data engineering problem. I own the fix.`,
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
        <SectionTitle>Errors You Will Hit — And Exactly Why They Happen</SectionTitle>

        {[
          {
            error: `Analyst complaint: "The numbers in your pipeline don't match my manual calculation — I don't trust this data"`,
            cause: 'The data engineer and analyst have a different definition of the metric being measured. For example, "revenue" in the pipeline counts order_amount including cancelled orders. The analyst\'s calculation counts only delivered orders. Neither is wrong — they are measuring different things. This is a definition gap, not a pipeline bug, but it feels like a pipeline bug until it is investigated.',
            fix: 'Never dismiss this complaint. Sit with the analyst and trace both calculations step by step until the exact point of divergence is identified. Once the divergence is found, establish an agreed definition, document it in the dbt model description or a data dictionary, and update the pipeline if needed. The real fix is to define metrics explicitly before building pipelines, not after.',
          },
          {
            error: `Data scientist complaint: "I need the user feature table rebuilt with these 12 new columns — can you do it today?"`,
            cause: 'No formal process exists for data scientists to request feature engineering work from data engineers. Without a prioritisation process, ad-hoc feature requests interrupt pipeline maintenance work and create scope creep in the data platform.',
            fix: 'Establish a feature request process: the data scientist submits a specification document describing what each feature is, how to compute it, which source tables to use, and what the expected output looks like. The data engineer reviews the spec, estimates effort, and schedules it in the team backlog. Urgent requests go through a separate escalation path. This prevents both "can you do it today?" surprises and engineers building features based on misunderstood requirements.',
          },
          {
            error: `ML model deployed to production is returning wrong predictions — investigation reveals the production feature table has different column distributions than the training feature table`,
            cause: 'Training-serving skew. The features used to train the model were computed differently from the features served in production. The data engineer built the batch feature pipeline for training using one SQL logic, and the ML engineer built the real-time serving pipeline independently with slightly different logic. The model was trained on batch features but is making predictions on real-time features that are computed differently.',
            fix: 'Feature computation logic must be the single source of truth — defined once, used in both batch training and real-time serving. Use a feature store (like Feast or Tecton) that maintains one definition of each feature and serves it to both training pipelines and production inference. If a feature store is not available, at minimum the feature computation logic should be in a shared library that both pipelines import from, not duplicated.',
          },
          {
            error: `Analyst receives a Power BI report from the data team showing ₹4.2 crore daily revenue. The finance team's report shows ₹3.9 crore for the same day. Stakeholders are arguing about which number is correct.`,
            cause: 'Two independent calculations of "revenue" exist with no agreed single source of truth. The data team\'s number likely includes a category of transactions that finance excludes (or vice versa) — perhaps refunds, pending settlements, or tax amounts are treated differently in each system.',
            fix: 'This is a governance problem, not a pipeline problem. Convene a meeting with data engineering, analytics, and finance to define "revenue" unambiguously: which transaction statuses are included, whether refunds are netted, whether tax is included, and which timestamp determines which day a transaction belongs to. Write the agreed definition into the dbt model description. Create a single authoritative revenue table. Both the data dashboard and the finance report must read from the same source. Eliminate the second calculation.',
          },
          {
            error: `New data scientist joins the team and discovers they cannot access the training data they need — permission denied on the Silver table`,
            cause: 'Data access controls were never set up properly when the data platform was built. Permissions default to restrictive for security, but nobody set up role-based access that maps job functions to what each role should be able to read. The new hire is blocked from day one.',
            fix: 'Establish a data access matrix before this becomes a blocker: define what each role (data engineer, data analyst, data scientist, ML engineer) can read and write by default. Create IAM roles or database roles that map to these definitions. When a new person joins, grant them the appropriate role rather than managing individual permissions. Document the process so it takes less than one hour to onboard a new data team member.',
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
        'Each role asks a different core question. Data Engineer: "Is data moving reliably?" Analyst: "What happened?" Scientist: "What will happen?" ML Engineer: "How do predictions reach users at scale?" These questions require different skills and are not interchangeable.',
        'Data engineers own the pipeline and the platform — they build the infrastructure everyone else depends on. They do not build dashboards, train models, or deploy serving APIs.',
        'Data analysts own the analysis — SQL queries, dashboards, reports, and metric definitions. Their primary tool is SQL, not Python. They consume what data engineers produce.',
        'Data scientists own the modelling — training ML models, running experiments, and interpreting statistical results. They depend on data engineers for clean feature data. Without reliable data engineering, 60–80% of their time goes to cleaning data instead of modelling.',
        'ML engineers own production ML systems — model serving, real-time feature pipelines, monitoring, and automated retraining. They bridge data science and software engineering.',
        'The four roles form a dependency chain: DE enables DA and DS. DS enables MLE. A failure in DE propagates to all downstream roles. This is why good data engineering multiplies the productivity of the entire data organisation.',
        'At small companies one person covers multiple roles. At large companies roles are fully specialised. "Data Scientist" at a Series A startup often means "person who does all data work including engineering" — evaluate the actual responsibilities, not the title.',
        'The Analytics Engineer is an emerging fifth role that owns the transformation layer (dbt models). They sit between engineering and analysis with stronger SQL data modelling skills than either traditional role.',
        'Job postings listing ETL pipeline maintenance, Airflow DAGs, and warehouse management under a "Data Scientist" title are mislabelled data engineering roles. Clarify responsibilities before accepting to avoid career positioning mistakes.',
        'For non-IT background candidates, Data Analyst (4–6 months to first job with SQL) is the most accessible entry point. Data Engineer (6–9 months) is next. Data Science requires longer because of the statistics foundation needed.',
      ]} />

    </LearnLayout>
  )
}