import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Dot Product and Similarity — Chaduvuko',
  description:
    'The operation behind every recommendation engine, embedding search, and attention mechanism. Built from plain English first, then intuition, then math, then code.',
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
  h4: {
    fontFamily: 'var(--font-display)', fontSize: 14,
    fontWeight: 700 as const, letterSpacing: '-0.2px',
    color: 'var(--text)', marginBottom: 8, marginTop: 20,
  },
  p: { fontSize: 15, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 16 },
  ps: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 10 },
  sec: { paddingBottom: 56, paddingTop: 8, borderBottom: '1px solid var(--border)' },
  code: {
    fontFamily: 'var(--font-mono)', fontSize: 12,
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: 4, padding: '1px 6px', color: 'var(--accent)',
  },
}

function Div() { return <div style={{ height: 56 }} /> }

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, overflow: 'hidden', marginBottom: 24,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 16px', borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
      }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
        }}>
          {label ?? 'python'}
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
      </div>
      <pre style={{
        padding: '18px 20px', margin: 0, overflowX: 'auto',
        fontFamily: 'var(--font-mono)', fontSize: 13,
        lineHeight: 1.75, color: 'var(--text)',
      }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

function VisualBox({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: 10,
      overflow: 'hidden', marginBottom: 24,
    }}>
      <div style={{
        padding: '8px 14px', background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        fontFamily: 'var(--font-mono)', letterSpacing: '0.07em',
        textTransform: 'uppercase' as const,
      }}>
        {label}
      </div>
      <div style={{ padding: '20px', background: 'var(--bg2)' }}>
        {children}
      </div>
    </div>
  )
}

function ConceptBox({ title, children, color = '#7F77DD' }: { title: string; children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid ${color}30`,
      borderLeft: `4px solid ${color}`,
      borderRadius: 8,
      padding: '16px 20px',
      marginBottom: 20,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase' as const, color,
        fontFamily: 'var(--font-mono)', marginBottom: 10,
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function AnalogyBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(0,230,118,0.04)',
      border: '1px solid rgba(0,230,118,0.2)',
      borderRadius: 8, padding: '16px 20px', marginBottom: 20,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase' as const, color: '#00e676',
        fontFamily: 'var(--font-mono)', marginBottom: 10,
      }}>
        🧠 Analogy — read this first
      </div>
      {children}
    </div>
  )
}

function StepBox({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex', gap: 16, marginBottom: 24, alignItems: 'flex-start',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
        background: 'rgba(127,119,221,0.15)',
        border: '1.5px solid rgba(127,119,221,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, fontWeight: 900, color: '#7F77DD',
        fontFamily: 'var(--font-mono)',
      }}>
        {num}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 14, fontWeight: 700, color: 'var(--text)',
          fontFamily: 'var(--font-display)', marginBottom: 6,
        }}>
          {title}
        </div>
        {children}
      </div>
    </div>
  )
}

function ErrorBlock({ error, cause, fix }: { error: string; cause: string; fix: string }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 8, overflow: 'hidden', marginBottom: 12,
    }}>
      <div style={{
        padding: '9px 14px', background: 'rgba(226,75,74,0.08)',
        borderBottom: '1px solid var(--border)',
        fontFamily: 'var(--font-mono)', fontSize: 12,
        color: '#ff4757', fontWeight: 600,
      }}>
        {error}
      </div>
      <div style={{ padding: '12px 14px' }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
          textTransform: 'uppercase' as const, color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', marginBottom: 4,
        }}>Why it happens</div>
        <p style={{ ...S.ps, marginBottom: 10 }}>{cause}</p>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
          textTransform: 'uppercase' as const, color: '#00e676',
          fontFamily: 'var(--font-mono)', marginBottom: 4,
        }}>Fix</div>
        <p style={{ ...S.ps, marginBottom: 0 }}>{fix}</p>
      </div>
    </div>
  )
}

export default function DotProductSimilarityPage() {
  return (
    <LearnLayout
      title="Dot Product and Similarity"
      description="The operation behind every recommendation engine, embedding search, and attention mechanism — built from plain English first, then intuition, then math, then code."
      section="Math Foundations"
      readTime="22–28 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="math-foundations" topic="dot-product-similarity" />

      {/* ══ SECTION 1 — START WITH PLAIN ENGLISH ══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — what problem does this solve?</span>
        <h2 style={S.h2}>
          You use dot product every day without knowing it.
          Every time Spotify recommends a song, it is running a dot product.
        </h2>

        <p style={S.p}>
          You open Spotify. It shows you a song you've never heard — and you love it.
          How did it know? Spotify represents every song as a list of numbers.
          Not random numbers — each number means something.
          Something like: how much bass does this song have? How fast is the tempo?
          Is it energetic or calm? Is it acoustic or electronic?
        </p>

        <p style={S.p}>
          A song might look like this internally:
        </p>

        <VisualBox label="How Spotify internally represents a song">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { feature: 'Bass intensity',    song_a: 0.9, song_b: 0.8, song_c: 0.1 },
              { feature: 'Tempo (fast)',       song_a: 0.7, song_b: 0.6, song_c: 0.2 },
              { feature: 'Energy level',       song_a: 0.8, song_b: 0.9, song_c: 0.1 },
              { feature: 'Acoustic (not elec)',song_a: 0.1, song_b: 0.2, song_c: 0.9 },
              { feature: 'Vocal prominence',  song_a: 0.5, song_b: 0.4, song_c: 0.8 },
            ].map((row) => (
              <div key={row.feature} style={{
                display: 'grid', gridTemplateColumns: '180px 1fr 1fr 1fr',
                alignItems: 'center', gap: 12,
                background: 'var(--surface)', borderRadius: 6, padding: '8px 12px',
              }}>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{row.feature}</span>
                {[
                  { val: row.song_a, label: 'Hip-hop track', color: '#7F77DD' },
                  { val: row.song_b, label: 'Similar track',  color: '#1D9E75' },
                  { val: row.song_c, label: 'Classical piano', color: '#BA7517' },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{
                        flex: 1, height: 8, background: 'var(--border)', borderRadius: 4,
                      }}>
                        <div style={{
                          width: `${s.val * 100}%`, height: '100%',
                          background: s.color, borderRadius: 4,
                        }} />
                      </div>
                      <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: s.color, minWidth: 28 }}>
                        {s.val}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr 1fr', gap: 12, paddingLeft: 12 }}>
              <span />
              {['Hip-hop track', 'Similar track', 'Classical piano'].map((l, i) => (
                <span key={l} style={{ fontSize: 10, color: ['#7F77DD','#1D9E75','#BA7517'][i], fontFamily: 'var(--font-mono)' }}>{l}</span>
              ))}
            </div>
          </div>
        </VisualBox>

        <p style={S.p}>
          Now Spotify knows you like the hip-hop track. It wants to find other songs
          you might like. The question becomes: <em>which other song is most similar
          to the hip-hop track?</em> To answer this, it needs a way to measure similarity
          between two lists of numbers. That measurement is the dot product.
        </p>

        <p style={S.p}>
          The hip-hop track and the "Similar track" have high numbers in the same places
          (bass, tempo, energy) and low numbers in the same places (acoustic, classical feel).
          The classical piano is the opposite — low where the hip-hop is high and high
          where the hip-hop is low. The dot product gives you a single number that
          captures exactly this relationship. High number = similar. Low number = different.
        </p>

        <Callout type="tip">
          This is all the dot product is — a way to measure how much two lists of
          numbers "point in the same direction." If they agree on what is high and
          what is low, the result is large. If they disagree, the result is small.
          Everything else in this module is just making this idea precise.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — WHAT IS A VECTOR (RECAP) ═══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Quick recap — Module 03</span>
        <h2 style={S.h2}>A vector is just a list of numbers — each number has a meaning</h2>

        <p style={S.p}>
          From Module 03 you know that a vector is an ordered list of numbers.
          But the key insight people miss is that in ML, <em>position matters</em>.
          The first number always means the same thing. The second number always
          means the same thing. This is what makes comparison meaningful —
          we are always comparing apples to apples.
        </p>

        <ConceptBox title="What makes a vector a vector in ML — not just in math">
          <p style={{ ...S.ps, marginBottom: 10 }}>
            In ML, a vector is a fixed-length list where <strong style={{ color: 'var(--text)' }}>every position
            has a consistent meaning</strong>. Position 0 might mean "bass intensity"
            for every song in the database. Position 1 might mean "tempo" for every song.
            If you swap the positions, comparison breaks completely.
          </p>
          <p style={{ ...S.ps, marginBottom: 0 }}>
            This is called a <strong style={{ color: 'var(--text)' }}>feature vector</strong>.
            In ML, you will represent customers, songs, words, images, and loan applications
            all as feature vectors. The dot product measures similarity between any two of them.
          </p>
        </ConceptBox>

        <VisualBox label="Vectors as directions in space — the geometric picture">
          <svg width="100%" viewBox="0 0 420 260" style={{ maxWidth: 420 }}>
            {/* Grid */}
            {[0,1,2,3,4].map(i => (
              <g key={i}>
                <line x1={60} y1={60 + i*36} x2={340} y2={60 + i*36} stroke="var(--border)" strokeWidth="0.5" />
                <line x1={60 + i*70} y1={50} x2={60 + i*70} y2={200} stroke="var(--border)" strokeWidth="0.5" />
              </g>
            ))}
            {/* Axes */}
            <line x1="50" y1="196" x2="345" y2="196" stroke="#555" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <line x1="60" y1="210" x2="60" y2="45" stroke="#555" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#555" />
              </marker>
            </defs>
            {/* Labels */}
            <text x="350" y="200" fontSize="11" fill="#888" fontFamily="monospace">feature 1</text>
            <text x="62" y="40"  fontSize="11" fill="#888" fontFamily="monospace">feature 2</text>
            {/* Axis numbers */}
            {[1,2,3,4].map(i => (
              <g key={i}>
                <text x={55 + i*70} y="210" fontSize="9" fill="#555" textAnchor="middle" fontFamily="monospace">{i}</text>
                <text x="48" y={200 - i*36} fontSize="9" fill="#555" textAnchor="middle" fontFamily="monospace">{i}</text>
              </g>
            ))}
            {/* Vector A — hip-hop */}
            <line x1="60" y1="196" x2="269" y2="88" stroke="#7F77DD" strokeWidth="2.5" />
            <circle cx="269" cy="88" r="5" fill="#7F77DD" />
            <text x="275" y="85" fontSize="11" fill="#7F77DD" fontFamily="monospace" fontWeight="700">A = [3, 3]</text>
            <text x="275" y="98" fontSize="9" fill="#7F77DD" fontFamily="monospace">hip-hop</text>
            {/* Vector B — similar */}
            <line x1="60" y1="196" x2="249" y2="124" stroke="#1D9E75" strokeWidth="2.5" />
            <circle cx="249" cy="124" r="5" fill="#1D9E75" />
            <text x="255" y="121" fontSize="11" fill="#1D9E75" fontFamily="monospace" fontWeight="700">B = [2.7, 2]</text>
            <text x="255" y="134" fontSize="9" fill="#1D9E75" fontFamily="monospace">similar</text>
            {/* Vector C — classical */}
            <line x1="60" y1="196" x2="130" y2="88" stroke="#BA7517" strokeWidth="2.5" />
            <circle cx="130" cy="88" r="5" fill="#BA7517" />
            <text x="60" y="80" fontSize="11" fill="#BA7517" fontFamily="monospace" fontWeight="700">C = [1, 3]</text>
            <text x="60" y="93" fontSize="9" fill="#BA7517" fontFamily="monospace">classical</text>
            {/* Angle arc between A and B */}
            <path d="M 100 196 Q 115 170 130 170" fill="none" stroke="#1D9E75" strokeWidth="1" strokeDasharray="3,2" />
            <text x="105" y="165" fontSize="9" fill="#1D9E75" fontFamily="monospace">small angle</text>
            {/* Angle arc between A and C */}
            <path d="M 110 190 Q 100 160 95 150" fill="none" stroke="#BA7517" strokeWidth="1" strokeDasharray="3,2" />
            <text x="60" y="148" fontSize="9" fill="#BA7517" fontFamily="monospace">large angle</text>
          </svg>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 8 }}>
            Each vector is an arrow from the origin. Vectors pointing in the same direction
            (small angle between them) are similar. Vectors pointing in different directions
            (large angle) are different. The dot product measures exactly this angle — indirectly.
          </p>
        </VisualBox>
      </div>

      <Div />

      {/* ══ SECTION 3 — THE DOT PRODUCT ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The core operation</span>
        <h2 style={S.h2}>The dot product — multiply matching positions, then add everything up</h2>

        <p style={S.p}>
          Here is the full operation in plain English before any symbols:
          take two vectors of the same length. Multiply the numbers at each
          matching position together. Add all those products up.
          That final sum is the dot product.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 10 }}>
            Think of it like a compatibility score between two people on a dating app.
            Both people rate 5 things on a scale of 1–10: outdoors, movies, cooking, travel, fitness.
            Person A: [8, 3, 7, 9, 6]. Person B: [7, 2, 8, 10, 5].
          </p>
          <p style={{ ...S.p, marginBottom: 10 }}>
            To find compatibility: multiply each matching pair (8×7, 3×2, 7×8, 9×10, 6×5)
            and add them up (56 + 6 + 56 + 90 + 30 = 238). A high number means they care
            about the same things. This IS the dot product.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The dot product rewards agreement. When both vectors are high at the same position,
            that position contributes a large product. When one is high and the other is low,
            the contribution is small.
          </p>
        </AnalogyBox>

        <VisualBox label="Dot product step by step — hip-hop vs similar vs classical">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              {
                label: 'Hip-hop [0.9, 0.7, 0.8, 0.1, 0.5] · Similar [0.8, 0.6, 0.9, 0.2, 0.4]',
                a: [0.9, 0.7, 0.8, 0.1, 0.5],
                b: [0.8, 0.6, 0.9, 0.2, 0.4],
                color: '#1D9E75',
                verdict: 'HIGH — very similar',
              },
              {
                label: 'Hip-hop [0.9, 0.7, 0.8, 0.1, 0.5] · Classical [0.1, 0.2, 0.1, 0.9, 0.8]',
                a: [0.9, 0.7, 0.8, 0.1, 0.5],
                b: [0.1, 0.2, 0.1, 0.9, 0.8],
                color: '#BA7517',
                verdict: 'LOW — very different',
              },
            ].map((item) => {
              const products = item.a.map((v, i) => +(v * item.b[i]).toFixed(3))
              const total    = +products.reduce((a, b) => a + b, 0).toFixed(3)
              return (
                <div key={item.label} style={{
                  background: 'var(--surface)', borderRadius: 8,
                  padding: '14px 16px', border: `1px solid ${item.color}30`,
                }}>
                  <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
                    {item.label}
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, alignItems: 'center', marginBottom: 10 }}>
                    {item.a.map((v, i) => (
                      <div key={i} style={{ textAlign: 'center' as const }}>
                        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#7F77DD' }}>{v}</span>
                          <span style={{ fontSize: 11, color: 'var(--muted)' }}>×</span>
                          <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: item.color }}>{item.b[i]}</span>
                        </div>
                        <div style={{
                          fontSize: 13, fontFamily: 'var(--font-mono)',
                          color: 'var(--text)', fontWeight: 700,
                          borderTop: '1px solid var(--border)', paddingTop: 4, marginTop: 4,
                        }}>
                          {products[i]}
                        </div>
                        {i < item.a.length - 1 && (
                          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>+</div>
                        )}
                      </div>
                    ))}
                    <div style={{ fontSize: 16, color: 'var(--muted)', marginLeft: 4 }}>=</div>
                    <div style={{
                      fontSize: 18, fontWeight: 900, color: item.color,
                      fontFamily: 'var(--font-mono)', marginLeft: 4,
                    }}>
                      {total}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 12, fontWeight: 700, color: item.color,
                    fontFamily: 'var(--font-mono)',
                  }}>
                    Result: {total} — {item.verdict}
                  </div>
                </div>
              )
            })}
          </div>
        </VisualBox>

        <h3 style={S.h3}>Now the formula — after you understand the idea</h3>

        <p style={S.p}>
          The formula is just a compact way of writing what you saw above.
          The Greek letter Σ (sigma) means "add everything up."
          The subscript i means "for each position i."
        </p>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '20px 24px', marginBottom: 24,
        }}>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 14,
            fontFamily: 'var(--font-mono)', fontSize: 15,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ color: '#7F77DD', minWidth: 180 }}>a · b = Σ aᵢ × bᵢ</span>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                multiply matching positions, sum them all
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ color: '#7F77DD', minWidth: 180 }}>= a₁b₁ + a₂b₂ + ... + aₙbₙ</span>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                written out for an n-dimensional vector
              </span>
            </div>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--text)' }}>Result:</strong> a single number (scalar).
              Not a vector. The dot product always collapses two vectors into one number.
              That number is the similarity score.
            </div>
          </div>
        </div>

        <CodeBlock code={`import numpy as np

# ── Manual dot product — every step visible ───────────────────────────
hiphop   = [0.9, 0.7, 0.8, 0.1, 0.5]   # bass, tempo, energy, acoustic, vocal
similar  = [0.8, 0.6, 0.9, 0.2, 0.4]
classical= [0.1, 0.2, 0.1, 0.9, 0.8]

def dot_product_manual(a, b):
    """
    Step 1: multiply each matching position
    Step 2: sum all the products
    That is the entire dot product operation.
    """
    assert len(a) == len(b), "Vectors must be same length"
    products = [a[i] * b[i] for i in range(len(a))]
    print(f"  Products at each position: {[round(p, 3) for p in products]}")
    total = sum(products)
    return total

print("Dot product — hip-hop vs similar:")
score_similar   = dot_product_manual(hiphop, similar)
print(f"  Result: {score_similar:.3f}\\n")

print("Dot product — hip-hop vs classical:")
score_classical = dot_product_manual(hiphop, classical)
print(f"  Result: {score_classical:.3f}\\n")

print(f"Conclusion: similar score ({score_similar:.3f}) > classical score ({score_classical:.3f})")
print("→ Spotify recommends 'similar track' over 'classical piano'")

# ── NumPy way — what you use in production ─────────────────────────────
a = np.array(hiphop)
b = np.array(similar)
c = np.array(classical)

print(f"\\nNumPy dot product:")
print(f"  np.dot(hiphop, similar):   {np.dot(a, b):.3f}")
print(f"  a @ b (same thing):        {a @ b:.3f}")  # @ is the dot product operator
print(f"  np.dot(hiphop, classical): {np.dot(a, c):.3f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — THE PROBLEM WITH RAW DOT PRODUCT ══════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>A critical limitation — and how cosine similarity fixes it</span>
        <h2 style={S.h2}>The raw dot product has a flaw: bigger vectors always win</h2>

        <p style={S.p}>
          Imagine two users on DoorDash. User A orders 50 times a month and rates
          most orders highly — they are an extremely active user with large numbers
          everywhere in their feature vector. User B orders 5 times a month
          but has exactly the same taste preferences, just scaled down.
        </p>

        <p style={S.p}>
          If you compute the raw dot product between User A and a restaurant,
          it will be much higher than User B and the same restaurant — not because
          User A is more similar, but simply because User A has bigger numbers.
          The raw dot product confuses <em>magnitude</em> (how big the numbers are)
          with <em>direction</em> (what kind of things you like).
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Think of two arrows. Arrow A is 10cm long pointing northeast.
            Arrow B is 2cm long also pointing northeast. They point in exactly
            the same direction — they represent the same preferences.
            But if you measure their dot product, Arrow A wins simply because it is longer.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            Cosine similarity fixes this by dividing the dot product by the length
            of both vectors — it strips away magnitude and measures only direction.
            Two arrows pointing northeast give cosine similarity = 1.0 regardless
            of how long they are.
          </p>
        </AnalogyBox>

        <h3 style={S.h3}>Cosine similarity — direction only, magnitude ignored</h3>

        <p style={S.p}>
          Cosine similarity divides the raw dot product by the product of
          the two vector lengths (called their norms). The result is always between
          −1 and +1, regardless of how large or small the original numbers were.
        </p>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '20px 24px', marginBottom: 24,
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, marginBottom: 14 }}>
            <span style={{ color: '#7F77DD' }}>cosine_similarity(a, b)</span>
            <span style={{ color: 'var(--muted)', fontSize: 13 }}> = (a · b) / (||a|| × ||b||)</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { range: 'Result = +1.0', meaning: 'Identical direction — completely similar (same taste)', color: '#1D9E75' },
              { range: 'Result = 0.0',  meaning: 'Perpendicular — completely unrelated', color: '#BA7517' },
              { range: 'Result = −1.0', meaning: 'Opposite direction — completely opposite taste', color: '#ff4757' },
            ].map((row) => (
              <div key={row.range} style={{
                display: 'flex', gap: 16, alignItems: 'center',
                background: 'var(--bg2)', borderRadius: 6, padding: '8px 12px',
              }}>
                <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: row.color, minWidth: 120 }}>
                  {row.range}
                </span>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{row.meaning}</span>
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 12 }}>
            <strong style={{ color: 'var(--text)' }}>||a||</strong> is the "length" (norm) of vector a:
            the square root of the sum of all values squared. It is always a positive number.
          </p>
        </div>

        <CodeBlock code={`import numpy as np

# ── The magnitude (norm) problem ──────────────────────────────────────
# Two users with same taste but different activity levels
user_active  = np.array([0.9, 0.8, 0.7, 0.1, 0.2]) * 10   # active user — bigger numbers
user_casual  = np.array([0.9, 0.8, 0.7, 0.1, 0.2])          # casual user — same direction!
restaurant   = np.array([0.8, 0.9, 0.6, 0.2, 0.3])

print("Raw dot product (confused by magnitude):")
print(f"  active user  · restaurant: {np.dot(user_active, restaurant):.2f}")
print(f"  casual user  · restaurant: {np.dot(user_casual, restaurant):.2f}")
print("  Active user scores 10× higher — but they have IDENTICAL taste!")

# ── Vector norm — what is the 'length' of a vector? ───────────────────
def vector_norm(v):
    """
    The length (magnitude) of a vector.
    = sqrt(v[0]² + v[1]² + v[2]² + ...)
    Called the L2 norm or Euclidean norm.
    """
    return np.sqrt(np.sum(v ** 2))

print(f"\\nVector norms:")
print(f"  ||user_active||: {vector_norm(user_active):.4f}")
print(f"  ||user_casual||: {vector_norm(user_casual):.4f}")
print(f"  Ratio: {vector_norm(user_active) / vector_norm(user_casual):.1f}× — same direction, 10× length")

# ── Cosine similarity — fixes the magnitude problem ────────────────────
def cosine_similarity(a, b):
    """
    cosine_similarity = dot_product(a, b) / (norm(a) * norm(b))

    Step 1: compute the raw dot product
    Step 2: divide by the product of both norms
    Result: always between -1 and +1, magnitude removed
    """
    dot    = np.dot(a, b)
    norm_a = np.linalg.norm(a)   # same as vector_norm(a)
    norm_b = np.linalg.norm(b)
    return dot / (norm_a * norm_b)

print("\\nCosine similarity (magnitude-independent):")
print(f"  active user  · restaurant: {cosine_similarity(user_active, restaurant):.4f}")
print(f"  casual user  · restaurant: {cosine_similarity(user_casual, restaurant):.4f}")
print("  Identical! Cosine similarity sees they have the same taste.")

# ── Real example: song similarity ─────────────────────────────────────
hiphop    = np.array([0.9, 0.7, 0.8, 0.1, 0.5])
similar   = np.array([0.8, 0.6, 0.9, 0.2, 0.4])
classical = np.array([0.1, 0.2, 0.1, 0.9, 0.8])

print("\\nCosine similarity — song comparison:")
print(f"  hip-hop vs similar:   {cosine_similarity(hiphop, similar):.4f}  ← high, similar genre")
print(f"  hip-hop vs classical: {cosine_similarity(hiphop, classical):.4f}  ← low, different genre")

# ── sklearn version — what you use in production ──────────────────────
from sklearn.metrics.pairwise import cosine_similarity as sk_cosine

# sklearn expects 2D arrays (matrices), not 1D vectors
X = np.array([hiphop, similar, classical])
similarity_matrix = sk_cosine(X)
labels = ['hip-hop', 'similar', 'classical']

print("\\nFull similarity matrix (sklearn):")
print(f"{'':12}", end='')
for l in labels: print(f"{l:12}", end='')
print()
for i, row_label in enumerate(labels):
    print(f"{row_label:12}", end='')
    for j in range(len(labels)):
        print(f"{similarity_matrix[i,j]:.4f}      ", end='')
    print()`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — WHERE IT APPEARS IN ML ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Why this matters for ML</span>
        <h2 style={S.h2}>The dot product appears in three of the most important ML operations</h2>

        <p style={S.p}>
          This is not just a mathematical curiosity. The dot product is
          the computational engine inside neural networks, transformers,
          and recommendation systems. Once you understand it here,
          you will recognise it immediately in those later modules.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
          <StepBox num={1} title="Neural network forward pass — every single layer">
            <p style={{ ...S.ps, marginBottom: 8 }}>
              When data passes through a neural network layer, the computation is:
              <strong style={{ color: '#7F77DD' }}> output = input · weights + bias</strong>.
              This is a dot product between the input vector and the weight vector.
              A layer with 512 neurons runs 512 dot products in parallel.
              Training a neural network is literally adjusting the values in those weight vectors
              to make the dot products produce useful outputs.
            </p>
          </StepBox>

          <StepBox num={2} title="Attention mechanism in Transformers — the key operation">
            <p style={{ ...S.ps, marginBottom: 8 }}>
              In GPT, BERT, and every modern LLM, the attention mechanism computes
              <strong style={{ color: '#7F77DD' }}> Query · Key</strong> — a dot product
              between what a word is "looking for" (Query) and what other words "offer" (Key).
              The result tells the model how much each word should pay attention to
              every other word in the sentence. Module 47 covers this in full.
            </p>
          </StepBox>

          <StepBox num={3} title="Embedding search — finding similar items at scale">
            <p style={{ ...S.ps, marginBottom: 0 }}>
              When Amazon searches for products similar to what you clicked,
              it stores every product as a vector (embedding) in a vector database.
              Finding the most similar products is finding the vectors with the
              highest cosine similarity to your query vector.
              This is called approximate nearest neighbour search and it runs
              billions of dot products per second. Module 51 (RAG) is built entirely on this.
            </p>
          </StepBox>
        </div>

        <CodeBlock code={`import numpy as np

# ── Dot product in a neural network layer ────────────────────────────
# One neuron: takes an input vector, has a weight vector, computes dot product
# Think of weights as "how much does this neuron care about each input feature"

def neuron_forward(inputs, weights, bias):
    """
    One neuron's computation:
    1. dot product of inputs and weights (how much each input matters)
    2. add bias (shift the output)
    3. activation function applied later (not shown here)
    """
    return np.dot(inputs, weights) + bias

# A delivery time prediction neuron
# It has learned: distance and prep time matter most, traffic matters some
inputs  = np.array([5.2, 8.0, 22.0])   # distance_km, traffic_score, prep_min
weights = np.array([0.4, 0.15, 0.3])   # learned weights
bias    = 8.6

raw_output = neuron_forward(inputs, weights, bias)
print(f"Neuron output (predicted delivery time): {raw_output:.1f} min")

# ── Attention in transformers (simplified preview) ─────────────────────
# Each word has a Query vector (what it's looking for)
# and a Key vector (what it offers to others)
# Attention score = Query · Key

# Sentence: "The quick brown fox"
# Simplified 3D embeddings for illustration
words = ['The', 'quick', 'brown', 'fox']
# Query vectors (what each word is looking for)
queries = np.array([
    [0.1, 0.9, 0.2],   # 'The' — looks for: noun
    [0.8, 0.3, 0.1],   # 'quick' — looks for: what it modifies
    [0.7, 0.4, 0.2],   # 'brown' — looks for: what it modifies
    [0.2, 0.8, 0.9],   # 'fox' — looks for: its adjectives
])
# Key vectors (what each word offers)
keys = np.array([
    [0.1, 0.2, 0.3],   # 'The' — offers: article
    [0.6, 0.5, 0.1],   # 'quick' — offers: adjective
    [0.7, 0.4, 0.1],   # 'brown' — offers: adjective
    [0.3, 0.9, 0.8],   # 'fox' — offers: noun
])

# How much does 'fox' attend to each word?
fox_query = queries[3]
attention_scores = [np.dot(fox_query, keys[i]) for i in range(4)]
print(f"\\nAttention scores for 'fox':")
for word, score in zip(words, attention_scores):
    bar = '█' * int(score * 20)
    print(f"  fox → {word:<8}: {bar} {score:.3f}")
# Fox should attend most to 'quick' and 'brown' (its adjectives)

# ── Embedding similarity search ────────────────────────────────────────
# Find most similar products to a query in an embedding space
np.random.seed(42)
product_names = [
    'Nike Running Shoes', 'Adidas Sneakers', 'Formal Oxford Shoes',
    'Flip Flops', 'Sports Socks', 'Running Shorts',
]
# Simulate product embeddings (in real life these come from a trained model)
product_embeddings = np.random.randn(6, 8)

# Query: user just looked at "Nike Running Shoes"
query_embedding = product_embeddings[0]

# Compute cosine similarity to all products
from sklearn.metrics.pairwise import cosine_similarity
sims = cosine_similarity(
    query_embedding.reshape(1, -1),
    product_embeddings
)[0]

print("\\nProducts most similar to 'Nike Running Shoes':")
ranked = sorted(zip(product_names, sims), key=lambda x: x[1], reverse=True)
for name, score in ranked:
    marker = ' ← query' if name == 'Nike Running Shoes' else ''
    print(f"  {name:<25}: {score:.4f}{marker}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — EUCLIDEAN DISTANCE ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The other similarity measure</span>
        <h2 style={S.h2}>Euclidean distance — measuring actual physical distance between points</h2>

        <p style={S.p}>
          Cosine similarity measures angle — how similar is the direction.
          Euclidean distance measures a completely different thing: how far apart
          are two points in space.
          Think of it as the straight-line distance you would measure with a ruler.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Two cities on a map: New York (18.97°N, 72.83°E) and Boston (18.52°N, 73.85°E).
            The Euclidean distance between them as points on the map is roughly
            √((18.97−18.52)² + (72.83−73.85)²) — just like the Pythagorean theorem
            applied to their coordinate difference. This is Euclidean distance.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            In ML, "distance" works the same way but in higher dimensions —
            instead of 2 coordinates you might have 512 coordinates (features).
            The formula is identical, just with more terms under the square root.
          </p>
        </AnalogyBox>

        <ConceptBox title="Cosine similarity vs Euclidean distance — when to use each">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#7F77DD', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                Use cosine similarity when:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[
                  'Magnitude should not matter (active vs casual user)',
                  'Text/document similarity (short vs long docs)',
                  'Recommendation systems',
                  'Embedding search in vector databases',
                  'Transformer attention scores',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 7, fontSize: 12, color: 'var(--muted)' }}>
                    <span style={{ color: '#7F77DD' }}>✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                Use Euclidean distance when:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[
                  'Actual spatial closeness matters',
                  'K-Nearest Neighbours classification',
                  'K-Means clustering',
                  'Features are on the same scale',
                  'Physical measurements (height, weight, distance)',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 7, fontSize: 12, color: 'var(--muted)' }}>
                    <span style={{ color: '#1D9E75' }}>✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances

# ── Euclidean distance from scratch ───────────────────────────────────
def euclidean_distance(a, b):
    """
    Straight-line distance between two points in n-dimensional space.
    = sqrt( sum of (aᵢ - bᵢ)² for all i )
    Pythagorean theorem generalised to n dimensions.
    """
    differences = a - b
    squared     = differences ** 2
    summed      = np.sum(squared)
    return np.sqrt(summed)

# Customer feature vectors (after scaling to 0-1 range)
# [avg_order_value, orders_per_month, avg_rating, distance_preference]
customer_a = np.array([0.8, 0.9, 0.7, 0.3])   # high-value frequent customer
customer_b = np.array([0.7, 0.8, 0.8, 0.4])   # similar to A
customer_c = np.array([0.2, 0.1, 0.6, 0.9])   # very different — low value, rare

print("Euclidean distances:")
print(f"  A to B: {euclidean_distance(customer_a, customer_b):.4f}  ← small, similar customers")
print(f"  A to C: {euclidean_distance(customer_a, customer_c):.4f}  ← large, different customers")

print("\\nCosine similarities (same customers):")
print(f"  A to B: {cosine_similarity(customer_a.reshape(1,-1), customer_b.reshape(1,-1))[0,0]:.4f}")
print(f"  A to C: {cosine_similarity(customer_a.reshape(1,-1), customer_c.reshape(1,-1))[0,0]:.4f}")

# ── When they disagree — an important case ─────────────────────────────
# Two customers with exactly the same PATTERN but different AMOUNTS
casual_customer = np.array([0.2, 0.2, 0.6, 0.3])       # same preferences, less active
active_customer = np.array([0.8, 0.8, 0.6, 0.3]) * 4   # 4× more active, same pattern

print("\\nCasual vs active customer (same pattern, different magnitude):")
print(f"  Euclidean distance:  {euclidean_distance(casual_customer, active_customer):.4f}")
print(f"  Cosine similarity:   {cosine_similarity(casual_customer.reshape(1,-1), active_customer.reshape(1,-1))[0,0]:.4f}")
print("  Euclidean: they look far apart (because active has larger values)")
print("  Cosine:    they look identical (because they point the same direction)")
print("  → For segmentation by BEHAVIOUR: use cosine")
print("  → For segmentation by ACTIVITY LEVEL: use euclidean")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — WHAT THIS LOOKS LIKE AT WORK ══════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What this looks like at work</span>
        <h2 style={S.h2}>Day-one task at Amazon — build a product similarity engine</h2>

        <p style={S.p}>
          Your lead sends you a task: "Users who view a product should see similar
          products below it. Build a similarity engine for the electronics catalogue."
          This is exactly the dot product / cosine similarity problem.
          Here is how you would actually implement it.
        </p>

        <CodeBlock code={`import numpy as np
from sklearn.preprocessing import normalize
from sklearn.metrics.pairwise import cosine_similarity

# Amazon electronics — simplified feature vectors
# Features: [price_normalised, brand_premium, battery_life, screen_size,
#            camera_quality, performance_score, weight_light]
products = {
    'iPhone 15':         [0.95, 1.0,  0.7,  0.6, 1.0,  0.95, 0.8],
    'Samsung Galaxy S24':[0.85, 0.9,  0.75, 0.65,0.95, 0.9,  0.75],
    'OnePlus 12':        [0.65, 0.7,  0.8,  0.7, 0.85, 0.88, 0.7],
    'Redmi Note 13':     [0.25, 0.4,  0.85, 0.72,0.65, 0.6,  0.65],
    'iPhone SE':         [0.55, 1.0,  0.5,  0.35,0.75, 0.8,  0.9],
    'iPad Air':          [0.75, 1.0,  0.9,  1.0, 0.85, 0.9,  0.5],
    'Samsung Tab S9':    [0.7,  0.85, 0.85, 0.95,0.8,  0.85, 0.45],
    'Boat Earbuds':      [0.1,  0.3,  0.9,  0.0, 0.0,  0.4,  1.0],
}

names       = list(products.keys())
embeddings  = np.array(list(products.values()))

# Normalise so cosine similarity is just a dot product (unit vectors)
# This is the standard approach for any similarity search
embeddings_norm = normalize(embeddings, norm='l2')

# Build the full similarity matrix
sim_matrix = cosine_similarity(embeddings_norm)

def get_similar_products(product_name, top_k=3):
    """Given a product name, return the top_k most similar products."""
    idx   = names.index(product_name)
    sims  = sim_matrix[idx]
    # Sort by similarity, exclude the product itself
    ranked = sorted(
        [(names[i], sims[i]) for i in range(len(names)) if i != idx],
        key=lambda x: x[1], reverse=True,
    )
    return ranked[:top_k]

print("Product similarity recommendations:\\n")
for product in ['iPhone 15', 'Redmi Note 13', 'iPad Air', 'Boat Earbuds']:
    print(f"  Customer viewing: {product}")
    for rec, score in get_similar_products(product):
        bar = '█' * int(score * 20)
        print(f"    → {rec:<22}: {bar} {score:.3f}")
    print()

# ── Production note: in real Amazon, embeddings come from a trained
# neural network (not hand-crafted features). The similarity computation
# is identical — just replace the hand-crafted vectors with model embeddings.
print("In production:")
print("  Step 1: train a model to generate product embeddings")
print("  Step 2: store all embeddings in a vector database (FAISS, Pinecone)")
print("  Step 3: at query time: embed the viewed product, find nearest neighbours")
print("  Step 4: return top-k most similar products")`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common dot product and similarity error — explained and fixed</h2>

        <ErrorBlock
          error="ValueError: shapes (5,) and (4,) not aligned: 5 (dim 0) != 4 (dim 0)"
          cause="You are trying to take the dot product of two vectors with different lengths. The dot product requires matching positions — if the vectors have different numbers of features, there is no valid pairing. This is the single most common error when building similarity systems."
          fix="Check both vector shapes: print(a.shape, b.shape). They must be identical. If you are building a recommendation system, make sure all items are embedded using the same model with the same output dimension. If one vector comes from a different source or a different model version, they will have incompatible dimensions."
        />

        <ErrorBlock
          error="Cosine similarity returns nan (not a number) for some vectors"
          cause="One or both vectors have all-zero values. Cosine similarity divides by the norm (length) of both vectors. The norm of a zero vector is 0, and dividing by zero gives nan. Zero vectors appear when a user has no interaction history, a new product has no features, or after incorrect normalisation."
          fix="Add a zero-vector check before computing similarity: if np.linalg.norm(v) == 0: return 0.0. For new users or products with no history, return a default similarity score of 0 (unrelated). In recommendation systems this is called the cold-start problem — handle it separately with popularity-based recommendations until enough data is collected."
        />

        <ErrorBlock
          error="All similarities are 1.0 — every item looks identical"
          cause="You normalised the vectors before computing cosine similarity, but then accidentally computed the dot product directly (which equals cosine similarity for unit vectors — good) but also accidentally kept original un-normalised vectors elsewhere. Or: all your feature vectors are identical because a bug copied the same vector repeatedly."
          fix="Add a sanity check: print a sample of 5 similarity scores. They should vary. Print 3–4 actual feature vectors to confirm they are different. Use np.unique(embeddings, axis=0).shape to check how many unique vectors exist. If all similarities are 1.0 and vectors look correct, you may have accidentally fed in one-hot vectors or binary vectors that are all the same pattern."
        />

        <ErrorBlock
          error="Similarity scores are unexpectedly low — similar items score below 0.3"
          cause="Features are on very different scales and you have not normalised the vectors. A feature with values in the thousands (like price in rupees) will dominate the dot product completely, making all other features irrelevant. The direction of the vector is completely distorted by the large-scale feature."
          fix="Always normalise or standardise your feature vectors before computing similarity. Use sklearn's normalize(X, norm='l2') to convert to unit vectors, or StandardScaler() to bring all features to zero mean and unit variance. This is exactly why Module 17 (Feature Scaling) comes before similarity-based algorithms."
        />
      </div>

      <Div />

      {/* ══ SECTION 9 — WHAT'S NEXT ═════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can measure similarity. Now you need to understand the structure hidden inside data.
        </h2>

        <p style={S.p}>
          The dot product tells you how similar two vectors are.
          But what if you want to understand the overall structure of a dataset —
          which directions explain the most variation? Which features are really
          independent and which are just reflections of each other?
          That requires Module 06: Eigenvalues and Eigenvectors —
          the mathematical foundation of PCA, the most common dimensionality
          reduction technique in production ML.
        </p>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '16px 20px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 14,
        }}>
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase' as const, color: '#7F77DD',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Module 06 · Math Foundations
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Eigenvalues and Eigenvectors
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              The mathematical foundation of PCA, spectral clustering, and PageRank.
              What eigenvectors are, why they matter, and how to compute them.
            </p>
          </div>
          <div style={{
            fontSize: 12, color: 'var(--muted)',
            border: '1px solid var(--border)',
            padding: '7px 14px', borderRadius: 6,
            fontFamily: 'var(--font-mono)',
          }}>
            coming soon
          </div>
        </div>
      </div>

      <KeyTakeaways
        items={[
          'The dot product multiplies matching positions in two vectors and sums the results. It gives a single number — high when the vectors agree on what is important, low when they disagree. This is the foundation of similarity measurement in ML.',
          'The raw dot product is sensitive to magnitude — bigger vectors always produce higher scores. Two people with identical taste but different activity levels look very different to the raw dot product.',
          'Cosine similarity fixes the magnitude problem by dividing the dot product by the lengths of both vectors. The result is always between −1 and +1, measuring direction only. Two vectors pointing the same direction give cosine similarity of +1.0 regardless of length.',
          'The dot product is the core computation in three major ML operations: the forward pass in every neural network layer (inputs · weights), the attention mechanism in Transformers (Query · Key), and embedding similarity search in recommendation systems.',
          'Euclidean distance measures actual spatial distance between points — good for KNN and K-Means. Cosine similarity measures angle — good for text, embeddings, and recommendation systems where magnitude should not affect the comparison.',
          'Always normalise feature vectors before computing cosine similarity. Features on different scales (price in rupees vs distance in km) distort the direction of the vector, making similarity scores meaningless.',
        ]}
      />
    </LearnLayout>
  )
}