import type { Metadata } from 'next'
import Link from 'next/link'
import AIMLHierarchy from '@/components/ui/AIMLHierarchy'

export const metadata: Metadata = {
  title: 'AI & Machine Learning — Chaduvuko',
}

const sections = [
  {
    num: '01', color: '#7F77DD', title: 'Math Foundations',
    difficulty: 'Beginner' as const, time: '3-4 weeks',
    topics: ['Vectors & matrices', 'Gradients & derivatives', 'Probability & statistics'],
  },
  {
    num: '02', color: '#888888', title: 'Programming Ecosystem',
    difficulty: 'Beginner' as const, time: '2-3 weeks',
    topics: ['Python for ML', 'NumPy arrays & broadcasting', 'Pandas DataFrames'],
  },
  {
    num: '03', color: '#1D9E75', title: 'Data Engineering',
    difficulty: 'Beginner' as const, time: '3-4 weeks',
    topics: ['Data collection & APIs', 'Missing values & outliers', 'Feature engineering'],
  },
  {
    num: '04', color: '#378ADD', title: 'Classical Machine Learning',
    difficulty: 'Intermediate' as const, time: '5-6 weeks',
    topics: ['Linear & logistic regression', 'Decision trees & ensembles', 'XGBoost & LightGBM'],
  },
  {
    num: '05', color: '#BA7517', title: 'Evaluation & Optimisation',
    difficulty: 'Intermediate' as const, time: '2-3 weeks',
    topics: ['Precision recall F1 AUC-ROC', 'Cross-validation strategies', 'Hyperparameter tuning with Optuna'],
  },
  {
    num: '06', color: '#D85A30', title: 'Deep Learning',
    difficulty: 'Intermediate' as const, time: '6-8 weeks',
    topics: ['Backpropagation & optimisers', 'CNNs for image tasks', 'Transformers & self-attention'],
  },
  {
    num: '07', color: '#D4537E', title: 'Natural Language Processing',
    difficulty: 'Intermediate' as const, time: '4-5 weeks',
    topics: ['Tokenisation & embeddings', 'BERT & fine-tuning', 'RAG & prompt engineering'],
  },
  {
    num: '08', color: '#0F6E56', title: 'Computer Vision',
    difficulty: 'Intermediate' as const, time: '3-4 weeks',
    topics: ['Image preprocessing & augmentation', 'Object detection with YOLO', 'Segmentation & transfer learning'],
  },
  {
    num: '09', color: '#7F77DD', title: 'Generative AI',
    difficulty: 'Advanced' as const, time: '5-6 weeks',
    topics: ['GANs & VAEs', 'Diffusion models & Stable Diffusion', 'LLMs RLHF fine-tuning agents'],
  },
  {
    num: '10', color: '#639922', title: 'MLOps & Production',
    difficulty: 'Advanced' as const, time: '3-4 weeks',
    topics: ['ML pipelines & experiment tracking', 'Docker FastAPI Kubernetes', 'Drift detection & retraining'],
  },
  {
    num: '11', color: '#378ADD', title: 'Cloud ML Platforms',
    difficulty: 'Advanced' as const, time: '3-4 weeks',
    topics: ['Azure ML pipelines & AutoML', 'SageMaker training & endpoints', 'Vertex AI & BigQuery ML'],
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
    desc: "Every topic opens with a real company's actual problem. You have a reason to learn before you learn anything.",
  },
  {
    num: '02', color: '#378ADD',
    title: 'Plain English concept',
    desc: 'The idea in simple words. Zero jargon, zero formulas at this stage. If we cannot explain it plainly, we do not have the right to explain it at all.',
  },
  {
    num: '03', color: '#D85A30',
    title: 'Visual intuition',
    desc: 'See what is happening before you read what is happening. An interactive diagram beats a page of description every time.',
  },
  {
    num: '04', color: '#BA7517',
    title: 'Math optional depth',
    desc: 'The formula only after the intuition is locked. Collapsible — skip it if you want the skill, open it if you want the full picture.',
  },
  {
    num: '05', color: '#1D9E75',
    title: 'Working code fully explained',
    desc: 'Every single line commented in plain English. Not a snippet you paste and hope for the best — a full walkthrough you can actually follow.',
  },
]

export default function AIMLTrackPage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px 64px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '4px 14px', borderRadius: 20,
          border: '1px solid var(--border)', background: 'var(--surface)',
          marginBottom: 28,
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)' }} />
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase' as const, color: 'var(--muted)',
            fontFamily: 'var(--font-mono)',
          }}>
            AI &amp; Machine Learning Track
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 5vw, 54px)',
          fontWeight: 900, letterSpacing: '-2.5px',
          lineHeight: 1.08, color: 'var(--text)',
          marginBottom: 22, maxWidth: 720,
        }}>
          The only AI/ML track that starts where you{' '}
          <span style={{ color: 'var(--accent)' }}>actually</span> are.
        </h1>

        <div style={{
          display: 'flex', gap: 0, marginBottom: 36,
          border: '1px solid var(--border)', borderRadius: 10,
          overflow: 'hidden', background: 'var(--surface)',
          width: 'fit-content' as const,
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
              textAlign: 'center' as const,
            }}>
              <div style={{
                fontSize: 22, fontWeight: 900,
                fontFamily: 'var(--font-display)',
                color: 'var(--accent)', letterSpacing: '-1px',
              }}>
                {s.val}
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
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

      {/* WHAT'S THE DIFFERENCE */}
      <section style={{
        maxWidth: 1000, margin: '0 auto',
        padding: '64px 24px',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 600, marginBottom: 48 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 3.5vw, 36px)',
            fontWeight: 900, letterSpacing: '-1.5px',
            color: 'var(--text)', marginBottom: 16,
          }}>
            AI, ML, DL, GenAI — what&apos;s the difference?
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>
            These terms are not parallel alternatives — they are nested inside each other. Click each ring below to see exactly where everything fits.
          </p>
        </div>

        <AIMLHierarchy />

        <div style={{
          marginTop: 36, padding: '14px 18px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--accent)',
          borderRadius: 8, maxWidth: 720,
        }}>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
            The one rule to remember: every GenAI model is a DL model. Every DL model is an ML model. Every ML model is an AI system. But not every AI system uses ML, and not every ML model uses deep learning.
          </p>
        </div>
      </section>

      {/* 11 SECTIONS */}
      <section style={{
        maxWidth: 1000, margin: '0 auto',
        padding: '64px 24px',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 560, marginBottom: 40 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 3.5vw, 36px)',
            fontWeight: 900, letterSpacing: '-1.5px',
            color: 'var(--text)', marginBottom: 12,
          }}>
            11 sections. One complete path.
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: 12,
        }}>
          {sections.map((s) => {
            const isLive = s.num === '04'
            const cardInner = (
              <div style={{
                background: 'var(--surface)',
                border: isLive ? `1.5px solid ${s.color}` : '1px solid var(--border)',
                borderRadius: 10,
                padding: '18px 20px',
                position: 'relative' as const,
                overflow: 'hidden' as const,
                textDecoration: 'none',
                display: 'block',
              }}>
                <div style={{
                  position: 'absolute' as const, top: 0, left: 0, right: 0,
                  height: 2, background: s.color,
                }} />
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
                <div style={{
                  fontSize: 15, fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text)', marginBottom: 14, letterSpacing: '-0.3px',
                }}>
                  {s.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 5, marginBottom: 16 }}>
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
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingTop: 12, borderTop: '1px solid var(--border)',
                }}>
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                    {s.time}
                  </span>
                  {isLive ? (
                    <span style={{
                      fontSize: 10, padding: '2px 8px', borderRadius: 3,
                      background: `${s.color}20`, color: s.color,
                      border: `1px solid ${s.color}50`, fontWeight: 700,
                    }}>
                      start learning →
                    </span>
                  ) : (
                    <span style={{
                      fontSize: 10, padding: '2px 8px', borderRadius: 3,
                      background: 'var(--bg)', color: 'var(--muted)',
                      border: '1px solid var(--border)',
                    }}>
                      coming soon
                    </span>
                  )}
                </div>
              </div>
            )

            return isLive ? (
              <Link key={s.num} href="/learn/ai-ml/classical-ml" style={{ textDecoration: 'none' }}>
                {cardInner}
              </Link>
            ) : (
              <div key={s.num}>{cardInner}</div>
            )
          })}
        </div>
      </section>

      {/* HOW WE TEACH */}
      <section style={{
        maxWidth: 1000, margin: '0 auto',
        padding: '64px 24px',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 580, marginBottom: 40 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 3.5vw, 36px)',
            fontWeight: 900, letterSpacing: '-1.5px',
            color: 'var(--text)', marginBottom: 14,
          }}>
            Every topic. Same 5 steps.
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' as const, maxWidth: 680 }}>
          {teachingSteps.map((step, i) => (
            <div key={step.num} style={{
              display: 'flex', gap: 20, alignItems: 'flex-start',
              padding: '20px 0',
              borderBottom: i < teachingSteps.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
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
      </section>

      {/* PREREQUISITES */}
      <section style={{
        maxWidth: 1000, margin: '0 auto',
        padding: '64px 24px',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 640 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 3.5vw, 36px)',
            fontWeight: 900, letterSpacing: '-1.5px',
            color: 'var(--text)', marginBottom: 28,
          }}>
            Exactly two things.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
            <div style={{
              display: 'flex', gap: 16,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10, padding: '16px 20px',
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'var(--accent)', color: '#000',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 900, flexShrink: 0,
                fontFamily: 'var(--font-display)',
              }}>
                1
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>
                  Basic Python
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
                  You need to know how to write a for loop, define a function, and work with lists. That&apos;s it for the first three sections.
                </p>
                <Link href="/learn/foundations/python" style={{
                  display: 'inline-block', marginTop: 10,
                  fontSize: 12, color: 'var(--accent)',
                  textDecoration: 'none', fontWeight: 700,
                }}>
                  Python Foundations →
                </Link>
              </div>
            </div>

            <div style={{
              display: 'flex', gap: 16,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10, padding: '16px 20px',
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'var(--accent)', color: '#000',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 900, flexShrink: 0,
                fontFamily: 'var(--font-display)',
              }}>
                2
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>
                  Curiosity
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
                  No specific math background required upfront. We teach you the math you need, exactly when you need it, with intuition before symbols every single time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{
        maxWidth: 1000, margin: '0 auto',
        padding: '64px 24px 100px',
        borderTop: '1px solid var(--border)',
        textAlign: 'center' as const,
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
          The first page answers the one question everyone has but nobody asks out loud — what exactly is AI, and where do I actually fit into it?
        </p>
        <Link href="/learn/ai-ml/what-is-ai" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'var(--accent)', color: '#000',
          padding: '14px 34px', borderRadius: 8,
          fontWeight: 700, fontSize: 15, textDecoration: 'none',
          fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
        }}>
          Start from zero — What is AI? →
        </Link>
      </section>

    </main>
  )
}
