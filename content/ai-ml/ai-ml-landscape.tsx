import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
export const metadata: Metadata = {
  title: 'The AI/ML Landscape — Tools, Roles and Career Paths — Chaduvuko',
  description:
    'Every AI/ML tool, every role, and every career path mapped clearly. Know exactly where you fit before writing a single line of code.',
}

const S = {
  tag: {
    fontSize: 11, fontWeight: 700 as const, letterSpacing: '0.1em',
    textTransform: 'uppercase' as const, color: 'var(--accent)',
    fontFamily: 'var(--font-mono)', display: 'block' as const, marginBottom: 10,
  },
  h2: {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)',
    fontWeight: 900 as const, letterSpacing: '-1.2px',
    color: 'var(--text)', marginBottom: 14, lineHeight: 1.15,
  },
  h3: {
    fontFamily: 'var(--font-display)', fontSize: 17,
    fontWeight: 700 as const, letterSpacing: '-0.4px',
    color: 'var(--text)', marginBottom: 10, marginTop: 28,
  },
  p: { fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 16 },
  ps: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 10 },
  sec: { paddingBottom: 56, paddingTop: 8, borderBottom: '1px solid var(--border)' },
}

function Div() { return <div style={{ height: 56 }} /> }

function HBox({ children, color = 'var(--accent)' }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderLeft: `3px solid ${color}`, borderRadius: 8,
      padding: '13px 17px', marginBottom: 20,
    }}>
      {children}
    </div>
  )
}

const tools = [
  {
    category: 'Data & Preprocessing',
    color: '#1D9E75',
    items: [
      { name: 'NumPy', use: 'Fast numerical arrays — the base layer under everything' },
      { name: 'Pandas', use: 'Load, clean and explore tabular data (CSVs, databases)' },
      { name: 'Matplotlib / Seaborn', use: 'Plot distributions, correlations, model results' },
      { name: 'Scikit-learn', use: 'Preprocessing (scalers, encoders, imputers) + classical ML' },
    ],
  },
  {
    category: 'Classical Machine Learning',
    color: '#378ADD',
    items: [
      { name: 'Scikit-learn', use: 'The universal classical ML library — every algorithm in one API' },
      { name: 'XGBoost', use: 'Gradient boosting — wins most tabular ML competitions' },
      { name: 'LightGBM', use: 'Faster XGBoost — handles categorical features natively' },
      { name: 'CatBoost', use: 'Best for datasets with many categorical columns' },
    ],
  },
  {
    category: 'Deep Learning Frameworks',
    color: '#D85A30',
    items: [
      { name: 'PyTorch', use: 'Most popular DL framework in research and industry (2024+)' },
      { name: 'TensorFlow / Keras', use: 'Google\'s DL framework — strong for production serving' },
      { name: 'JAX', use: 'Research-focused — used by DeepMind, Google Brain' },
      { name: 'FastAI', use: 'High-level PyTorch wrapper — best for learning DL quickly' },
    ],
  },
  {
    category: 'NLP & Language Models',
    color: '#D4537E',
    items: [
      { name: 'HuggingFace Transformers', use: 'Access every pretrained model (BERT, GPT-2, LLaMA) in 3 lines' },
      { name: 'LangChain', use: 'Build LLM apps — chains, agents, RAG pipelines' },
      { name: 'LlamaIndex', use: 'Connect LLMs to your own data and documents' },
      { name: 'OpenAI / Anthropic APIs', use: 'Production LLM access — GPT-4, Claude, Gemini' },
    ],
  },
  {
    category: 'MLOps & Production',
    color: '#639922',
    items: [
      { name: 'MLflow', use: 'Track experiments, log metrics, register models' },
      { name: 'Weights & Biases', use: 'Richer experiment tracking — dashboards, sweeps' },
      { name: 'FastAPI', use: 'Wrap any model in a REST API in under 20 lines' },
      { name: 'Docker + Kubernetes', use: 'Containerise and scale model serving' },
    ],
  },
  {
    category: 'Cloud ML Platforms',
    color: '#7F77DD',
    items: [
      { name: 'Azure ML', use: 'Microsoft\'s managed ML platform — connects to your Azure data' },
      { name: 'AWS SageMaker', use: 'Amazon\'s end-to-end ML platform — training to serving' },
      { name: 'GCP Vertex AI', use: 'Google\'s ML platform — strong AutoML and BigQuery ML' },
      { name: 'Databricks', use: 'Unified analytics + ML on Spark — popular in large enterprises' },
    ],
  },
]

const roles = [
  {
    title: 'Machine Learning Engineer',
    color: '#378ADD',
    salary: '₹18–28 LPA',
    focus: 'Build, train, and deploy ML models to production',
    skills: ['Python', 'sklearn / XGBoost', 'Docker', 'FastAPI', 'SQL'],
    dayToDay: [
      'Train and evaluate classification or regression models',
      'Build data pipelines that feed the model clean features',
      'Deploy models as REST APIs serving real-time predictions',
      'Monitor production model accuracy and retrain on schedule',
    ],
    companies: 'Swiggy, Razorpay, Zepto, Meesho, CRED',
  },
  {
    title: 'Data Scientist',
    color: '#1D9E75',
    salary: '₹14–24 LPA',
    focus: 'Answer business questions with data and models',
    skills: ['Python', 'Statistics', 'SQL', 'Pandas', 'Storytelling'],
    dayToDay: [
      'Analyse data to find patterns the business should act on',
      'Build models that answer specific product questions',
      'Run A/B tests and measure statistical significance',
      'Present findings with charts and plain-English explanations',
    ],
    companies: 'Flipkart, Ola, Nykaa, Zomato, MakeMyTrip',
  },
  {
    title: 'Applied Scientist / Research Scientist',
    color: '#7F77DD',
    salary: '₹22–40 LPA',
    focus: 'Apply cutting-edge research to hard product problems',
    skills: ['Deep Learning', 'PyTorch', 'Research papers', 'Maths', 'Python'],
    dayToDay: [
      'Read and implement techniques from recent papers',
      'Run large-scale experiments to evaluate new architectures',
      'Collaborate with product teams to define ML problem framing',
      'Mentor ML Engineers on advanced implementation',
    ],
    companies: 'Google, Microsoft, Amazon, Samsung R&D, Qualcomm India',
  },
  {
    title: 'MLOps / ML Platform Engineer',
    color: '#639922',
    salary: '₹16–28 LPA',
    focus: 'Build the infrastructure that keeps ML systems running',
    skills: ['Docker', 'Kubernetes', 'MLflow', 'Python', 'CI/CD'],
    dayToDay: [
      'Build and maintain ML training and serving pipelines',
      'Set up experiment tracking and model registry systems',
      'Automate retraining when model accuracy degrades',
      'Reduce model serving latency and infrastructure cost',
    ],
    companies: 'Uber, Grab, Juspay, PhonePe, Freshworks',
  },
  {
    title: 'GenAI / LLM Engineer',
    color: '#D85A30',
    salary: '₹20–35 LPA',
    focus: 'Build products powered by large language models',
    skills: ['LangChain', 'RAG', 'Prompt Engineering', 'FastAPI', 'Vector DBs'],
    dayToDay: [
      'Build RAG pipelines that connect LLMs to company data',
      'Evaluate and compare LLM providers for quality and cost',
      'Fine-tune open-source models on domain-specific data',
      'Build and test multi-step AI agents with tool use',
    ],
    companies: 'Every Indian startup building AI features right now',
  },
  {
    title: 'Data Analyst (ML-adjacent)',
    color: '#BA7517',
    salary: '₹8–16 LPA',
    focus: 'Surface insights from data using SQL and basic ML',
    skills: ['SQL', 'Excel / Google Sheets', 'Power BI / Tableau', 'Python basics'],
    dayToDay: [
      'Query databases to answer ad-hoc business questions',
      'Build dashboards tracking key product and revenue metrics',
      'Identify anomalies and trends in user behaviour data',
      'Support ML Engineers with labelling and data validation',
    ],
    companies: 'Any Indian company with data — literally all of them',
  },
]

const paths = [
  {
    from: 'Complete fresher — CS/IT graduate',
    color: '#378ADD',
    steps: [
      'Python basics (2–3 weeks)',
      'NumPy + Pandas + Matplotlib (2 weeks)',
      'Classical ML with sklearn (6 weeks)',
      'One end-to-end project on Kaggle',
      'Apply for Junior ML Engineer or Data Analyst roles',
    ],
    timeline: '4–5 months to first job',
  },
  {
    from: 'Non-IT background switcher (MBA, Science, Arts)',
    color: '#1D9E75',
    steps: [
      'Python from scratch (3–4 weeks)',
      'SQL fundamentals (2 weeks)',
      'Classical ML + evaluation (8 weeks)',
      'Domain-specific project (your old field + ML)',
      'Target Data Analyst or Junior Data Scientist roles',
    ],
    timeline: '5–6 months to first role',
  },
  {
    from: 'Software engineer moving into ML',
    color: '#D85A30',
    steps: [
      'Skip Python basics — you know programming',
      'NumPy + sklearn + ML concepts (3 weeks)',
      'Deep Learning basics — PyTorch (4 weeks)',
      'MLOps — Docker, FastAPI, model serving (3 weeks)',
      'Apply for ML Engineer roles directly',
    ],
    timeline: '2–3 months to first ML role',
  },
  {
    from: 'Already in data (analyst / BI / data engineer)',
    color: '#7F77DD',
    steps: [
      'Skip data fundamentals — you know SQL and data',
      'Classical ML with sklearn (4 weeks)',
      'Model evaluation and hyperparameter tuning (2 weeks)',
      'One production-style project using your existing domain',
      'Apply for Data Scientist or ML Engineer roles',
    ],
    timeline: '2 months to transition',
  },
]

export default function AIMLLandscapePage() {
  return (
    <LearnLayout
      title="The AI/ML Landscape — Tools, Roles and Career Paths"
      description="Every tool mapped. Every role defined. Every career path laid out. Know exactly where you fit before you write a single line of code."
      section="AI & ML — Introduction"
      readTime="25–30 min"
      updatedAt="March 2026"
    >
      {/* Breadcrumb */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '4px 12px', borderRadius: 5,
        border: '1px solid var(--border)', background: 'var(--surface)',
        marginBottom: 32,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.09em',
          textTransform: 'uppercase', color: 'var(--accent)',
          fontFamily: 'var(--font-mono)',
        }}>
          AI &amp; ML Track · Module 02
        </span>
      </div>

      {/* ══ SECTION 1 — HOOK ═══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Why this page exists</span>
        <h2 style={S.h2}>The AI/ML world looks enormous. It's not.</h2>

        <p style={S.p}>
          Search "how to learn machine learning" and you'll drown in tool names —
          TensorFlow, PyTorch, scikit-learn, XGBoost, LangChain, HuggingFace,
          MLflow, Kubeflow, Vertex AI, SageMaker — and job titles that all sound
          the same: Data Scientist, ML Engineer, Applied Scientist, AI Engineer,
          Research Engineer, MLOps Engineer.
        </p>

        <p style={S.p}>
          Most beginners spend weeks trying to figure out which tool to learn first,
          which role to target, and whether they're even on the right track.
          This page ends that confusion permanently.
        </p>

        <HBox>
          <p style={{ ...S.p, marginBottom: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              By the end of this page:{' '}
            </span>
            you'll have a map of every major tool and where it fits.
            You'll know what each ML role actually does day-to-day.
            You'll know the exact path from where you are today to your first ML role.
            And you'll never feel lost looking at a job description again.
          </p>
        </HBox>

        <Callout type="tip">
          You don't need to know all these tools. A working ML engineer uses
          5–8 tools regularly. The rest are for specific situations. This page
          shows you the landscape so you can navigate it — not memorise it.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — TOOLS MAP ══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The tools</span>
        <h2 style={S.h2}>Every major ML tool — mapped and explained</h2>

        <p style={S.p}>
          The tools in ML are organised by what stage of the workflow they serve.
          The same workflow from the previous module — collect data, prepare it,
          train a model, evaluate, deploy, monitor — maps directly to the tools
          below. Every tool has exactly one job.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 8 }}>
          {tools.map((group) => (
            <div key={group.category} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 10, overflow: 'hidden',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 16px',
                borderBottom: '1px solid var(--border)',
                background: `${group.color}08`,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: group.color, flexShrink: 0,
                }} />
                <span style={{
                  fontSize: 12, fontWeight: 700, color: group.color,
                  fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
                  textTransform: 'uppercase' as const,
                }}>
                  {group.category}
                </span>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))',
                gap: 0,
              }}>
                {group.items.map((item, i) => (
                  <div key={item.name} style={{
                    padding: '11px 16px',
                    borderBottom: i < group.items.length - 2 ? '1px solid var(--border)' : 'none',
                    borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
                  }}>
                    <div style={{
                      fontSize: 13, fontWeight: 700, color: 'var(--text)',
                      fontFamily: 'var(--font-display)', marginBottom: 3,
                    }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.55 }}>
                      {item.use}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <HBox color="#378ADD">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              The learning order that works:{' '}
            </span>
            NumPy → Pandas → Matplotlib → scikit-learn → XGBoost → PyTorch →
            HuggingFace → FastAPI + Docker. That sequence takes you from zero
            to employable. Every other tool you learn when a specific job
            requires it.
          </p>
        </HBox>
      </div>

      <Div />

      {/* ══ SECTION 3 — ROLES ══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The roles</span>
        <h2 style={S.h2}>Every ML role — what they actually do</h2>

        <p style={S.p}>
          Job titles in ML are inconsistent. One company's "Data Scientist" is another
          company's "ML Engineer." Here's what each role actually means in terms of
          daily work — based on real Indian job descriptions, not generic definitions.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {roles.map((role) => (
            <div key={role.title} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '16px 20px',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: 2, background: role.color,
              }} />

              {/* Header */}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', marginBottom: 6, flexWrap: 'wrap', gap: 8,
              }}>
                <div style={{
                  fontSize: 15, fontWeight: 700, color: 'var(--text)',
                  fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
                }}>
                  {role.title}
                </div>
                <div style={{
                  fontSize: 13, fontWeight: 700, color: 'var(--accent)',
                  fontFamily: 'var(--font-display)',
                }}>
                  {role.salary}
                </div>
              </div>

              <div style={{
                fontSize: 12, color: role.color, fontFamily: 'var(--font-mono)',
                fontWeight: 600, marginBottom: 12,
              }}>
                {role.focus}
              </div>

              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
              }}>
                {/* Day to day */}
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
                    textTransform: 'uppercase' as const, color: 'var(--muted)',
                    fontFamily: 'var(--font-mono)', marginBottom: 7,
                  }}>
                    Day to day
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {role.dayToDay.map((t, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <div style={{
                          width: 4, height: 4, borderRadius: '50%',
                          background: role.color, flexShrink: 0, marginTop: 6,
                        }} />
                        <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
                          {t}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills + companies */}
                <div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
                    textTransform: 'uppercase' as const, color: 'var(--muted)',
                    fontFamily: 'var(--font-mono)', marginBottom: 7,
                  }}>
                    Key skills
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                    {role.skills.map((s) => (
                      <span key={s} style={{
                        fontSize: 11, padding: '2px 8px', borderRadius: 3,
                        background: `${role.color}12`,
                        color: role.color, fontFamily: 'var(--font-mono)',
                        border: `1px solid ${role.color}30`,
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
                    textTransform: 'uppercase' as const, color: 'var(--muted)',
                    fontFamily: 'var(--font-mono)', marginBottom: 5,
                  }}>
                    Hires in India
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
                    {role.companies}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Callout type="info">
          Salary ranges are mid-level (3–6 years experience) at product companies
          in Bangalore. Service companies (TCS, Infosys, Wipro) pay 30–40% less.
          Startups vary wildly. FAANG/GCC roles pay 2–3× these numbers.
          Freshers start at roughly 50–60% of these figures.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 4 — WHICH ROLE ═════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Choosing your role</span>
        <h2 style={S.h2}>Which role is right for you?</h2>

        <p style={S.p}>
          Don't pick a role by salary alone. Pick by what the day-to-day looks like.
          These four questions will tell you immediately:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              q: 'Do you want to write production code and ship systems?',
              a: 'ML Engineer or MLOps Engineer — you\'re building and deploying models, not just training them in notebooks.',
              color: '#378ADD',
            },
            {
              q: 'Do you want to answer business questions and present to stakeholders?',
              a: 'Data Scientist — you\'re closer to the business, doing analysis, A/B tests, and explaining results to non-technical people.',
              color: '#1D9E75',
            },
            {
              q: 'Do you want to work on cutting-edge research and hard technical problems?',
              a: 'Applied Scientist — you need a strong maths background and enjoy reading research papers. Usually requires a Masters or PhD.',
              color: '#7F77DD',
            },
            {
              q: 'Do you want to build AI products with LLMs right now, quickly?',
              a: 'GenAI / LLM Engineer — the fastest-growing role in 2024–2026. Heavy demand, strong pay, and the technical bar is lower than Applied Scientist.',
              color: '#D85A30',
            },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: 14, alignItems: 'flex-start',
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '13px 16px',
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                background: `${item.color}15`,
                border: `1px solid ${item.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, color: item.color,
                fontFamily: 'var(--font-mono)',
              }}>
                ?
              </div>
              <div>
                <div style={{
                  fontSize: 13, fontWeight: 700, color: 'var(--text)',
                  marginBottom: 4, fontFamily: 'var(--font-display)',
                }}>
                  {item.q}
                </div>
                <p style={{ ...S.ps, marginBottom: 0 }}>{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        <HBox color="#1D9E75">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              If you still can't decide:{' '}
            </span>
            aim for ML Engineer. It's the most versatile role — you can pivot
            to Data Scientist, GenAI Engineer, or MLOps from there.
            It also has the clearest skill requirements, making it the
            easiest role to prepare for from scratch.
          </p>
        </HBox>
      </div>

      <Div />

      {/* ══ SECTION 5 — CAREER PATHS ═══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Career paths</span>
        <h2 style={S.h2}>Your exact path — based on where you are today</h2>

        <p style={S.p}>
          Four realistic paths. Each one is based on real people who made the transition —
          not on optimistic YouTube advice. The timelines assume 2–3 hours of focused
          study per day.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {paths.map((path) => (
            <div key={path.from} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '16px 20px',
            }}>
              <div style={{
                fontSize: 14, fontWeight: 700, color: 'var(--text)',
                fontFamily: 'var(--font-display)', marginBottom: 12,
                letterSpacing: '-0.3px',
              }}>
                {path.from}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 12 }}>
                {path.steps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%',
                        background: `${path.color}15`,
                        border: `1px solid ${path.color}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontWeight: 700, color: path.color,
                        fontFamily: 'var(--font-mono)',
                      }}>
                        {i + 1}
                      </div>
                      {i < path.steps.length - 1 && (
                        <div style={{
                          width: 1, height: 16,
                          background: 'var(--border)', marginTop: 2,
                        }} />
                      )}
                    </div>
                    <div style={{
                      paddingTop: 3,
                      paddingBottom: i < path.steps.length - 1 ? 12 : 0,
                      fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.55,
                    }}>
                      {step}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                paddingTop: 10, borderTop: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  Realistic timeline
                </span>
                <span style={{
                  fontSize: 12, fontWeight: 700, color: path.color,
                  fontFamily: 'var(--font-display)',
                }}>
                  {path.timeline}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Callout type="warning">
          These timelines assume consistent daily practice, not binge-studying for
          a weekend then stopping for two weeks. 2 hours every day beats 14 hours
          every Saturday. Consistency matters more than intensity in learning ML.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 6 — THE ONE THING ══════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What to do next</span>
        <h2 style={S.h2}>Pick your role. Start the track.</h2>

        <p style={S.p}>
          You now have the full map. You know what every tool does, what every role
          involves, and the exact path from where you are to where you want to be.
        </p>

        <p style={S.p}>
          The one thing that separates people who get ML jobs from people who don't
          is not intelligence, not a degree, and not which bootcamp they paid for.
          It's whether they built something real and can explain every decision they made.
          That's what this track is designed to produce.
        </p>

        <HBox>
          <p style={{ ...S.ps, marginBottom: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>Starting now: </span>
            the next module begins with the math — specifically vectors and matrices.
            Don't skip it. Every algorithm in this track uses matrix operations.
            Understanding them visually before seeing the code is what makes the
            rest of the track click into place instead of feeling like memorisation.
          </p>
        </HBox>
      </div>

      <KeyTakeaways
        items={[
          'ML tools are organised by workflow stage — data, classical ML, deep learning, NLP/LLMs, MLOps, cloud. Learn them in that order.',
          'The learning path that works: NumPy → Pandas → sklearn → XGBoost → PyTorch → HuggingFace → FastAPI + Docker.',
          'ML Engineer = build and ship systems. Data Scientist = answer business questions. Applied Scientist = research. GenAI Engineer = LLM products.',
          'Salary ranges (mid-level Bangalore): ML Engineer ₹18–28 LPA, Data Scientist ₹14–24 LPA, Applied Scientist ₹22–40 LPA, GenAI Engineer ₹20–35 LPA.',
          'If you cannot decide which role — target ML Engineer. It is the most versatile entry point and has the clearest preparation path.',
          'Realistic timelines: fresher 4–5 months, career switcher 5–6 months, SWE to ML 2–3 months, data professional to ML 2 months.',
        ]}
      />
    </LearnLayout>
  )
}