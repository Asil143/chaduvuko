import type { Metadata } from 'next'
import Link from 'next/link'
import AIMLHierarchy from '@/components/ui/AIMLHierarchy'

export const metadata: Metadata = {
  title: 'AI & Machine Learning — Chaduvuko',
  description:
    'Learn AI, Machine Learning, Deep Learning, and Generative AI from scratch to production. No prerequisites assumed. Real examples from Indian companies throughout.',
  openGraph: {
    title: 'AI & Machine Learning Track — Chaduvuko',
    description:
      'The only AI/ML track that starts where you actually are. 11 sections, 100+ topics, 0 prerequisites assumed.',
    url: 'https://chaduvuko.com/learn/ai-ml',
  },
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const sections = [
  {
    num: '01', color: '#7F77DD',
    title: 'Math Foundations',
    sub: 'The minimum math you actually need — no more, no less',
    topics: ['Vectors & matrices', 'Gradients & derivatives', 'Probability & statistics'],
    time: '3–4 weeks', difficulty: 'Beginner' as const,
  },
  {
    num: '02', color: '#888888',
    title: 'Programming Ecosystem',
    sub: 'Python, NumPy, Pandas, and visualisation tools',
    topics: ['Python for ML', 'NumPy arrays & broadcasting', 'Pandas DataFrames'],
    time: '2–3 weeks', difficulty: 'Beginner' as const,
  },
  {
    num: '03', color: '#1D9E75',
    title: 'Data Engineering',
    sub: 'Get real data, clean it, and make it model-ready',
    topics: ['Data collection & APIs', 'Missing values & outliers', 'Feature engineering'],
    time: '3–4 weeks', difficulty: 'Beginner' as const,
  },
  {
    num: '04', color: '#378ADD',
    title: 'Classical Machine Learning',
    sub: 'The algorithms powering 80% of production ML today',
    topics: ['Linear & logistic regression', 'Decision trees & ensembles', 'XGBoost & LightGBM'],
    time: '5–6 weeks', difficulty: 'Intermediate' as const,
  },
  {
    num: '05', color: '#BA7517',
    title: 'Evaluation & Optimisation',
    sub: 'How good is good enough — and how to make it better',
    topics: ['Precision, recall, F1, AUC-ROC', 'Cross-validation strategies', 'Hyperparameter tuning with Optuna'],
    time: '2–3 weeks', difficulty: 'Intermediate' as const,
  },
  {
    num: '06', color: '#D85A30',
    title: 'Deep Learning',
    sub: 'Neural networks from first principles to Transformers',
    topics: ['Backpropagation & optimisers', 'CNNs for image tasks', 'Transformers & self-attention'],
    time: '6–8 weeks', difficulty: 'Intermediate' as const,
  },
  {
    num: '07', color: '#D4537E',
    title: 'Natural Language Processing',
    sub: 'Teaching machines to read, understand, and generate language',
    topics: ['Tokenisation & embeddings', 'BERT & fine-tuning', 'RAG & prompt engineering'],
    time: '4–5 weeks', difficulty: 'Intermediate' as const,
  },
  {
    num: '08', color: '#D4537E',
    title: 'Computer Vision',
    sub: 'Teaching machines to see and understand images',
    topics: ['Image preprocessing & augmentation', 'Object detection with YOLO', 'Segmentation & transfer learning'],
    time: '3–4 weeks', difficulty: 'Intermediate' as const,
  },
  {
    num: '09', color: '#7F77DD',
    title: 'Generative AI',
    sub: 'Models that create — text, images, code, audio',
    topics: ['GANs & VAEs', 'Diffusion models & Stable Diffusion', 'LLMs, RLHF, fine-tuning, agents'],
    time: '5–6 weeks', difficulty: 'Advanced' as const,
  },
  {
    num: '10', color: '#00e676',
    title: 'MLOps & Production',
    sub: 'Ship your model to the real world and keep it working',
    topics: ['ML pipelines & experiment tracking', 'Docker, FastAPI, Kubernetes', 'Drift detection & retraining'],
    time: '3–4 weeks', difficulty: 'Advanced' as const,
  },
  {
    num: '11', color: '#378ADD',
    title: 'Cloud ML Platforms',
    sub: 'Azure ML, AWS SageMaker, and GCP Vertex AI',
    topics: ['Azure ML pipelines & AutoML', 'SageMaker training & endpoints', 'Vertex AI & BigQuery ML'],
    time: '3–4 weeks', difficulty: 'Advanced' as const,
  },
]

const difficultyColors = {
  Beginner:     '#1D9E75',
  Intermediate: '#BA7517',
  Advanced:     '#D85A30',
}

const teachingSteps = [
  {
    num: '01', color: '#7F77DD',
    title: 'Real story first',
    desc: "Every topic opens with a real Indian company's actual problem — Swiggy, Razorpay, Flipkart, Zepto. You have a reason to learn before you learn anything.",
  },
  {
    num: '02', color: '#378ADD',
    title: 'Plain English concept',
    desc: "The idea in simple words. Zero jargon, zero formulas at this stage. If we can't explain it plainly, we don't have the right to explain it at all.",
  },
  {
    num: '03', color: '#D85A30',
    title: 'Visual intuition',
    desc: 'See what is happening before you read what is happening. An interactive diagram beats a page of description every time.',
  },
  {
    num: '04', color: '#BA7517',
    title: 'Math (optional depth)',
    desc: 'The formula only after the intuition is locked. Collapsible — skip it if you want the skill, open it if you want the full picture.',
  },
  {
    num: '05', color: '#1D9E75',
    title: 'Working code, fully explained',
    desc: 'Every single line commented in plain English. Not a snippet you paste and hope for the best — a full walkthrough you can actually follow.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AIMLTrackPage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 64px' }}>

        {/* Track badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '4px 14px', borderRadius: 20,
          border: '1px solid var(--border)', background: 'var(--surface)',
          marginBottom: 28,
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)' }} />
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--muted)',
            fontFamily: 'var(--font-mono)',
          }}>
            AI &amp; Machine Learning Track
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 5vw, 54px)',
          fontWeight: 900,
          letterSpacing: '-2.5px',
          lineHeight: 1.08,
          color: 'var(--text)',
          marginBottom: 22,
          maxWidth: 720,
        }}>
          The only AI/ML track that starts where you{' '}
          <span style={{ color: 'var(--accent)' }}>actually</span> are.
        </h1>

        <p style={{
          fontSize: 'clamp(14px, 2vw, 17px)',
          color: 'var(--muted)',
          lineHeight: 1.8,
          maxWidth: 600,
          marginBottom: 36,
        }}>
          We don't assume you know what a "gradient" is. We don't expect you to remember calculus from school.
          We start from absolute zero — and we get you to building real models, for real problems,
          the kind Indian companies are paying <span style={{ color: 'var(--text)', fontWeight: 600 }}>₹15–30 LPA</span> to solve.
        </p>

        {/* Stats strip */}
        <div style={{
          display: 'flex', gap: 0, marginBottom: 36,
          border: '1px solid var(--border)', borderRadius: 10,
          overflow: 'hidden', background: 'var(--surface)',
          width: 'fit-content',
        }}>
          {[
            { val: '11',   label: 'sections' },
            { val: '100+', label: 'topics' },
            { val: '6',    label: 'real projects' },
            { val: '0',    label: 'prerequisites assumed' },
          ].map((s, i, arr) => (
            <div key={i} style={{
              padding: '14px 22px',
              borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: 22, fontWeight: 900,
                fontFamily: 'var(--font-display)',
                color: 'var(--accent)', letterSpacing: '-1px',
              }}>
                {s.val}
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/learn/ai-ml/what-is-ai" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--accent)', color: '#000',
            padding: '12px 26px', borderRadius: 8,
            fontWeight: 700, fontSize: 14, textDecoration: 'none',
            fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
          }}>
            Start from zero →
          </Link>
          <Link href="/learn/roadmap" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid var(--border)', color: 'var(--muted)',
            padding: '12px 26px', borderRadius: 8,
            fontWeight: 600, fontSize: 14, textDecoration: 'none',
          }}>
            View roadmap
          </Link>
        </div>
      </section>

      {/* ══ FIX THE CONFUSION ═════════════════════════════════════════════════ */}
      <section style={{
        maxWidth: 1000, margin: '0 auto',
        padding: '64px 24px',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 600, marginBottom: 48 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--accent)',
            fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 12,
          }}>
            Before we start
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 3.5vw, 36px)',
            fontWeight: 900, letterSpacing: '-1.5px',
            color: 'var(--text)', marginBottom: 16,
          }}>
            AI, ML, DL, GenAI — what's the difference?
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>
            Most people start this journey genuinely confused about these terms.
            Every article and video seems to use them interchangeably.
            They're not the same thing — but they're not completely separate subjects either.
            They're nested. Click each ring below to see exactly where everything fits.
          </p>
        </div>

        {/* Interactive hierarchy */}
        <AIMLHierarchy />

        {/* The one-line rule */}
        <div style={{
          marginTop: 36, padding: '14px 18px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--accent)',
          borderRadius: 8, maxWidth: 720,
        }}>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>The one rule to remember: </span>
            every GenAI model is a DL model. Every DL model is an ML model. Every ML model is an AI system.
            But not every AI system uses ML, and not every ML model uses deep learning.
            They are nested — not parallel — and this track teaches them in that exact order.
          </p>
        </div>
      </section>

      {/* ══ WHAT'S INSIDE ═════════════════════════════════════════════════════ */}
      <section style={{
        maxWidth: 1000, margin: '0 auto',
        padding: '64px 24px',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 560, marginBottom: 40 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--accent)',
            fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 12,
          }}>
            Track contents
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 3.5vw, 36px)',
            fontWeight: 900, letterSpacing: '-1.5px',
            color: 'var(--text)', marginBottom: 12,
          }}>
            11 sections. One complete path.
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75 }}>
            From "what even is a vector" to shipping a model to production with monitoring.
            No external courses needed. No gaps to fill elsewhere.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: 12,
        }}>
          {sections.map((s) => (
            <div
              key={s.num}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '18px 20px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: 2, background: s.color,
              }} />

              {/* Header row */}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', marginBottom: 10,
              }}>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  color: s.color, fontFamily: 'var(--font-mono)',
                }}>
                  {s.num}
                </span>
                <span style={{
                  fontSize: 10, padding: '2px 8px', borderRadius: 3,
                  fontWeight: 600,
                  background: `${difficultyColors[s.difficulty]}15`,
                  color: difficultyColors[s.difficulty],
                }}>
                  {s.difficulty}
                </span>
              </div>

              {/* Title + subtitle */}
              <div style={{
                fontSize: 15, fontWeight: 700,
                fontFamily: 'var(--font-display)',
                color: 'var(--text)', marginBottom: 4, letterSpacing: '-0.3px',
              }}>
                {s.title}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, lineHeight: 1.5 }}>
                {s.sub}
              </div>

              {/* Topics */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 16 }}>
                {s.topics.map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
                    <div style={{
                      width: 4, height: 4, borderRadius: '50%',
                      background: s.color, flexShrink: 0,
                    }} />
                    <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>{t}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingTop: 12, borderTop: '1px solid var(--border)',
              }}>
                <span style={{
                  fontSize: 11, color: 'var(--muted)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {s.time}
                </span>
                <span style={{
                  fontSize: 10, padding: '2px 8px', borderRadius: 3,
                  background: 'var(--bg2)', color: 'var(--muted)',
                  border: '1px solid var(--border)',
                }}>
                  coming soon
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ HOW WE TEACH ══════════════════════════════════════════════════════ */}
      <section style={{
        maxWidth: 1000, margin: '0 auto',
        padding: '64px 24px',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 580, marginBottom: 40 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--accent)',
            fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 12,
          }}>
            The method
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 3.5vw, 36px)',
            fontWeight: 900, letterSpacing: '-1.5px',
            color: 'var(--text)', marginBottom: 14,
          }}>
            Every topic. Same 5 steps.
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>
            Most platforms give you a definition, a formula, and a code snippet. That's not teaching — that's a glossary entry.
            Every page on this track follows a structure designed for people who've never opened a data science textbook.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 680 }}>
          {teachingSteps.map((step, i) => (
            <div
              key={step.num}
              style={{
                display: 'flex', gap: 20, alignItems: 'flex-start',
                padding: '20px 0',
                borderBottom: i < teachingSteps.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                background: `${step.color}15`,
                border: `1.5px solid ${step.color}50`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: step.color,
                fontFamily: 'var(--font-mono)',
              }}>
                {step.num}
              </div>
              <div style={{ flex: 1, paddingTop: 7 }}>
                <div style={{
                  fontSize: 15, fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text)', marginBottom: 6, letterSpacing: '-0.3px',
                }}>
                  {step.title}
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* The Chaduvuko rule */}
        <div style={{
          marginTop: 36, padding: '14px 18px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--accent)',
          borderRadius: 8, maxWidth: 680,
        }}>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>The Chaduvuko rule: </span>
            if you need to Google a word to understand a sentence on this platform,
            that sentence needs to be rewritten. Every concept links back to the concept it depends on.
            No page assumes knowledge it didn't teach.
          </p>
        </div>
      </section>

      {/* ══ PREREQUISITES ═════════════════════════════════════════════════════ */}
      <section style={{
        maxWidth: 1000, margin: '0 auto',
        padding: '64px 24px',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 640 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--accent)',
            fontFamily: 'var(--font-mono)', display: 'block', marginBottom: 12,
          }}>
            What you need to start
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 3.5vw, 36px)',
            fontWeight: 900, letterSpacing: '-1.5px',
            color: 'var(--text)', marginBottom: 28,
          }}>
            Exactly two things.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                num: '1',
                title: 'Basic Python',
                desc: "You need to know how to write a for loop, define a function, and work with lists. That's it for the first three sections. If you don't have this yet, start with our Python Foundations track — it takes about 2 weeks.",
                link: '/learn/foundations/python',
                linkLabel: 'Python Foundations →',
              },
              {
                num: '2',
                title: 'Curiosity',
                desc: "Genuinely. No specific math background required upfront. We teach you the math you need, exactly when you need it, with intuition before symbols every single time. If you got through school arithmetic, you have enough.",
                link: null,
                linkLabel: null,
              },
            ].map((p) => (
              <div
                key={p.num}
                style={{
                  display: 'flex', gap: 16,
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 10, padding: '16px 20px',
                }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'var(--accent)', color: '#000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 900, flexShrink: 0,
                  fontFamily: 'var(--font-display)',
                }}>
                  {p.num}
                </div>
                <div>
                  <div style={{
                    fontSize: 14, fontWeight: 700, color: 'var(--text)',
                    marginBottom: 6, fontFamily: 'var(--font-display)',
                  }}>
                    {p.title}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
                    {p.desc}
                  </p>
                  {p.link && (
                    <Link href={p.link} style={{
                      display: 'inline-block', marginTop: 10,
                      fontSize: 12, color: 'var(--accent)',
                      textDecoration: 'none', fontWeight: 700,
                    }}>
                      {p.linkLabel}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════════════════ */}
      <section style={{
        maxWidth: 1000, margin: '0 auto',
        padding: '64px 24px 100px',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(24px, 4vw, 44px)',
          fontWeight: 900, letterSpacing: '-2px',
          color: 'var(--text)', marginBottom: 16,
        }}>
          Ready to start?
        </h2>
        <p style={{
          fontSize: 15, color: 'var(--muted)', lineHeight: 1.75,
          maxWidth: 520, margin: '0 auto 40px',
        }}>
          The first page answers the one question everyone has but nobody asks out loud —
          what exactly is AI, why does everyone keep talking about it, and where do I actually fit into it?
        </p>
        <Link href="/learn/ai-ml/what-is-ai" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'var(--accent)', color: '#000',
          padding: '14px 34px', borderRadius: 8,
          fontWeight: 700, fontSize: 15, textDecoration: 'none',
          fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
        }}>
          Start the track — What is AI? →
        </Link>
      </section>

    </main>
  )
}