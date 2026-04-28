import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout  } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Eigenvalues and Eigenvectors — Chaduvuko',
  description:
    'The mathematical foundation of PCA, spectral clustering, and PageRank. Built from plain English first — what they are, why they matter, then the math, then the code.',
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

function ConceptBox({ title, children, color = '#7F77DD' }: {
  title: string; children: React.ReactNode; color?: string
}) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid ${color}30`,
      borderLeft: `4px solid ${color}`,
      borderRadius: 8, padding: '16px 20px', marginBottom: 20,
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

function StepBox({ num, title, children }: {
  num: number; title: string; children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'flex-start' }}>
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
        }}>
          Why it happens
        </div>
        <p style={{ ...S.ps, marginBottom: 10 }}>{cause}</p>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
          textTransform: 'uppercase' as const, color: '#00e676',
          fontFamily: 'var(--font-mono)', marginBottom: 4,
        }}>
          Fix
        </div>
        <p style={{ ...S.ps, marginBottom: 0 }}>{fix}</p>
      </div>
    </div>
  )
}

export default function EigenvaluesEigenvectorsPage() {
  return (
    <LearnLayout
      title="Eigenvalues and Eigenvectors"
      description="The mathematical foundation of PCA, spectral clustering, and PageRank — built from plain English first, then intuition, then math, then code."
      section="Math Foundations"
      readTime="26–34 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="math-foundations" topic="eigenvalues-eigenvectors" />

      {/* ══ SECTION 1 — PLAIN ENGLISH FIRST ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — what problem does this solve?</span>
        <h2 style={S.h2}>
          Imagine spinning a blob of data. Most directions stretch and rotate.
          A few special directions only stretch — never rotate. Those are eigenvectors.
        </h2>

        <p style={S.p}>
          You have a dataset of 10,000 DoorDash customers. Each customer is described
          by 20 numbers — order frequency, average order value, preferred cuisine,
          delivery distance preference, time of day, and so on.
          That dataset is a cloud of 10,000 points in 20-dimensional space.
        </p>

        <p style={S.p}>
          Now imagine squashing that cloud into 2 dimensions so you can plot it.
          You need to pick which 2 directions to keep out of the original 20.
          If you pick randomly, you lose most of the interesting structure.
          But there exist specific directions in the data — the directions along which
          the cloud is most spread out — that capture the most information.
          Finding those directions is exactly what eigenvalues and eigenvectors do.
        </p>

        <p style={S.p}>
          Those special directions are the eigenvectors. How much the data spreads
          along each direction is the eigenvalue. The eigenvector with the largest
          eigenvalue is the single most informative direction in your entire dataset.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 10 }}>
            Think of a shadow. You hold an odd-shaped object under a light.
            As you rotate the object, its shadow changes shape — sometimes long and thin,
            sometimes short and wide. There is one specific angle where the shadow
            is longest. That angle is like an eigenvector — the direction that reveals
            the most about the object's structure. The length of that longest shadow
            is like the eigenvalue.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            PCA (Principal Component Analysis) uses exactly this idea.
            It finds the directions in your data where the shadow is longest —
            where the data varies the most — and uses those as the new axes.
            Module 33 covers PCA in full. This module gives you the mathematical
            foundation to understand how it works.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          You do not need to memorise how to compute eigenvalues by hand.
          NumPy does that in one line. What you need to understand is what
          they mean — because once you understand that, PCA, spectral clustering,
          and Google's PageRank all become obvious.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — WHAT A MATRIX TRANSFORMATION IS ═══════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The foundation — what matrices do to vectors</span>
        <h2 style={S.h2}>A matrix is a transformation — it stretches, rotates, and reflects vectors</h2>

        <p style={S.p}>
          From Module 04 you know that matrix multiplication transforms vectors.
          When you multiply a matrix by a vector, the result is a new vector —
          usually pointing in a different direction and having a different length.
          The matrix is performing a geometric operation on the vector.
        </p>

        <p style={S.p}>
          Most vectors get both rotated AND stretched when a matrix is applied to them.
          The direction changes and the length changes. But some special vectors
          only get stretched — they keep pointing in exactly the same direction.
          Those special vectors are eigenvectors.
        </p>

        <VisualBox label="What a matrix does to different vectors">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <svg width="100%" viewBox="0 0 220 220">
                <text x="110" y="15" textAnchor="middle" fontSize="11"
                  fill="#888" fontFamily="monospace">BEFORE transformation</text>
                {/* Axes */}
                <line x1="30" y1="110" x2="200" y2="110" stroke="#333" strokeWidth="1" />
                <line x1="110" y1="30" x2="110" y2="200" stroke="#333" strokeWidth="1" />
                {/* Regular vector — will rotate */}
                <line x1="110" y1="110" x2="170" y2="60" stroke="#BA7517" strokeWidth="2.5" />
                <circle cx="170" cy="60" r="4" fill="#BA7517" />
                <text x="175" y="58" fontSize="10" fill="#BA7517" fontFamily="monospace">v₁</text>
                {/* Eigenvector — won't rotate */}
                <line x1="110" y1="110" x2="170" y2="110" stroke="#7F77DD" strokeWidth="2.5" />
                <circle cx="170" cy="110" r="4" fill="#7F77DD" />
                <text x="175" y="113" fontSize="10" fill="#7F77DD" fontFamily="monospace">e (eigenvec)</text>
                <text x="110" y="215" textAnchor="middle" fontSize="9"
                  fill="#555" fontFamily="monospace">two vectors before matrix A</text>
              </svg>
            </div>
            <div>
              <svg width="100%" viewBox="0 0 220 220">
                <text x="110" y="15" textAnchor="middle" fontSize="11"
                  fill="#888" fontFamily="monospace">AFTER transformation (A × v)</text>
                <line x1="30" y1="110" x2="200" y2="110" stroke="#333" strokeWidth="1" />
                <line x1="110" y1="30" x2="110" y2="200" stroke="#333" strokeWidth="1" />
                {/* Regular vector — rotated AND stretched */}
                <line x1="110" y1="110" x2="155" y2="150" stroke="#BA7517"
                  strokeWidth="2.5" strokeDasharray="4,2" />
                <circle cx="155" cy="150" r="4" fill="#BA7517" />
                <text x="160" y="165" fontSize="10" fill="#BA7517" fontFamily="monospace">A·v₁</text>
                <text x="115" y="172" fontSize="9" fill="#BA7517" fontFamily="monospace">rotated + stretched</text>
                {/* Eigenvector — only stretched, same direction */}
                <line x1="110" y1="110" x2="190" y2="110" stroke="#7F77DD" strokeWidth="2.5" />
                <circle cx="190" cy="110" r="4" fill="#7F77DD" />
                <text x="175" y="125" fontSize="10" fill="#7F77DD" fontFamily="monospace">A·e = λe</text>
                <text x="115" y="138" fontSize="9" fill="#7F77DD" fontFamily="monospace">same direction, just longer</text>
              </svg>
            </div>
          </div>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 8 }}>
            The orange vector gets rotated AND stretched — its direction changed.
            The purple eigenvector only gets stretched — same direction, longer length.
            The amount it stretches is the eigenvalue λ (lambda).
          </p>
        </VisualBox>

        <ConceptBox title="The eigenvector definition — in one sentence">
          <p style={{ ...S.p, marginBottom: 10 }}>
            A vector <strong style={{ color: '#7F77DD' }}>e</strong> is an eigenvector
            of matrix <strong style={{ color: '#7F77DD' }}>A</strong> if multiplying
            A by e gives back e scaled by a number λ:
          </p>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 16, color: '#7F77DD',
            padding: '12px 16px', background: 'var(--bg2)', borderRadius: 7,
            marginBottom: 10, textAlign: 'center' as const,
          }}>
            A · e = λ · e
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { term: 'e',  desc: 'the eigenvector — the special direction that does not rotate' },
              { term: 'A',  desc: 'the matrix — the transformation being applied' },
              { term: 'λ',  desc: 'the eigenvalue — how much the vector stretches (or shrinks)' },
              { term: 'A·e = λ·e', desc: 'applying A to e is the same as just scaling e by λ' },
            ].map((row) => (
              <div key={row.term} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{
                  fontSize: 13, fontFamily: 'var(--font-mono)',
                  color: '#7F77DD', minWidth: 80,
                }}>
                  {row.term}
                </span>
                <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
                  {row.desc}
                </span>
              </div>
            ))}
          </div>
        </ConceptBox>
      </div>

      <Div />

      {/* ══ SECTION 3 — INTUITION WITH NUMBERS ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Building intuition with small numbers</span>
        <h2 style={S.h2}>A concrete example — verify the definition yourself</h2>

        <p style={S.p}>
          The best way to understand eigenvectors is to verify the definition by hand
          on a small example. We will use a 2×2 matrix so everything is visible.
          Once you see it work once, the concept locks in permanently.
        </p>

        <VisualBox label="Verifying A · e = λ · e with real numbers">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Matrix */}
            <div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                Matrix A (a simple transformation):
              </div>
              <div style={{ display: 'inline-flex', gap: 0 }}>
                <span style={{ fontSize: 24, color: '#555' }}>[</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '4px 8px' }}>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <span style={{ fontSize: 14, fontFamily: 'var(--font-mono)', color: '#7F77DD', minWidth: 20, textAlign: 'center' as const }}>3</span>
                    <span style={{ fontSize: 14, fontFamily: 'var(--font-mono)', color: '#7F77DD', minWidth: 20, textAlign: 'center' as const }}>1</span>
                  </div>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <span style={{ fontSize: 14, fontFamily: 'var(--font-mono)', color: '#7F77DD', minWidth: 20, textAlign: 'center' as const }}>1</span>
                    <span style={{ fontSize: 14, fontFamily: 'var(--font-mono)', color: '#7F77DD', minWidth: 20, textAlign: 'center' as const }}>3</span>
                  </div>
                </div>
                <span style={{ fontSize: 24, color: '#555' }}>]</span>
              </div>
            </div>

            <div style={{ height: 1, background: 'var(--border)' }} />

            {/* Eigenvector 1 */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
                Eigenvector 1: e₁ = [1, 1]   Eigenvalue: λ₁ = 4
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  A · e₁ = [3×1 + 1×1,  1×1 + 3×1] = [4, 4]
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  λ₁ · e₁ = 4 × [1, 1] = [4, 4]
                </div>
                <div style={{ fontSize: 12, color: '#1D9E75', fontFamily: 'var(--font-mono)' }}>
                  ✓ A · e₁ = λ₁ · e₁  →  [4, 4] = [4, 4]  ← same direction, 4× longer
                </div>
              </div>
            </div>

            <div style={{ height: 1, background: 'var(--border)' }} />

            {/* Eigenvector 2 */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#D85A30', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
                Eigenvector 2: e₂ = [1, -1]   Eigenvalue: λ₂ = 2
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  A · e₂ = [3×1 + 1×(-1),  1×1 + 3×(-1)] = [2, -2]
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  λ₂ · e₂ = 2 × [1, -1] = [2, -2]
                </div>
                <div style={{ fontSize: 12, color: '#D85A30', fontFamily: 'var(--font-mono)' }}>
                  ✓ A · e₂ = λ₂ · e₂  →  [2, -2] = [2, -2]  ← same direction, 2× longer
                </div>
              </div>
            </div>

            <div style={{
              background: 'var(--surface)', borderRadius: 6, padding: '10px 14px',
              fontSize: 12, color: 'var(--muted)', lineHeight: 1.7,
            }}>
              Matrix A has <strong style={{ color: 'var(--text)' }}>two eigenvectors</strong> in 2D.
              They are always perpendicular to each other (for symmetric matrices).
              e₁ = [1,1] stretches 4× (larger eigenvalue = more important direction).
              e₂ = [1,-1] stretches 2× (smaller eigenvalue = less important direction).
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np

# Define a simple 2×2 matrix
A = np.array([
    [3, 1],
    [1, 3],
])

# ── Manually verify the eigenvector definition ─────────────────────────
e1 = np.array([1, 1])   # eigenvector 1
e2 = np.array([1, -1])  # eigenvector 2

print("Verifying A · e = λ · e for eigenvector 1:")
Ae1  = A @ e1
lam1 = 4
print(f"  A · e1        = {Ae1}")
print(f"  λ₁ × e1 (×4) = {lam1 * e1}")
print(f"  Are they equal? {np.allclose(Ae1, lam1 * e1)}")  # True

print("\\nVerifying A · e = λ · e for eigenvector 2:")
Ae2  = A @ e2
lam2 = 2
print(f"  A · e2        = {Ae2}")
print(f"  λ₂ × e2 (×2) = {lam2 * e2}")
print(f"  Are they equal? {np.allclose(Ae2, lam2 * e2)}")  # True

# ── NumPy computes eigenvalues and eigenvectors in one call ────────────
eigenvalues, eigenvectors = np.linalg.eig(A)

print(f"\\nNumPy computed eigenvalues:  {eigenvalues}")
print(f"NumPy computed eigenvectors:\\n{eigenvectors}")
# Each COLUMN of the eigenvectors matrix is one eigenvector
# Column 0 corresponds to eigenvalues[0], Column 1 to eigenvalues[1]

print(f"\\nEigenvector 0 (column 0): {eigenvectors[:, 0].round(4)}")
print(f"Eigenvector 1 (column 1): {eigenvectors[:, 1].round(4)}")
# Note: NumPy returns unit vectors (length=1), so [1,1] becomes [0.707, 0.707]
# They point in the same direction — same eigenvector, just normalised

# ── A random vector is NOT an eigenvector ─────────────────────────────
random_vec = np.array([3, 1])   # not an eigenvector
print(f"\\nRandom vector [3, 1]:")
print(f"  A · v = {A @ random_vec}  — direction changed, not an eigenvector")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — WHAT EIGENVALUES MEAN ═════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Interpreting eigenvalues</span>
        <h2 style={S.h2}>Eigenvalues tell you how important each eigenvector is</h2>

        <p style={S.p}>
          Every square matrix has as many eigenvalue-eigenvector pairs as it has
          dimensions. A 20×20 matrix has 20 pairs. Each pair is a direction (eigenvector)
          and a number (eigenvalue). The eigenvalue tells you how much the transformation
          stretches the data in that direction.
        </p>

        <p style={S.p}>
          In the context of data analysis: if you compute the
          <strong style={{ color: 'var(--text)' }}> covariance matrix</strong> of your
          dataset (a matrix that describes how features vary together), its eigenvectors
          point in the directions of maximum variance in the data.
          The eigenvalues tell you how much variance each direction captures.
        </p>

        <ConceptBox title="How to read eigenvalues — what the numbers mean">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                val: 'λ is large (e.g. 45.2)',
                meaning: 'The data spreads a lot in this direction. This eigenvector captures important variation. Keep it.',
                color: '#1D9E75',
              },
              {
                val: 'λ is small (e.g. 0.3)',
                meaning: 'The data barely varies in this direction. This eigenvector is mostly noise. Can discard it.',
                color: '#BA7517',
              },
              {
                val: 'λ = 0',
                meaning: 'The data has no variation in this direction at all. The dimension is redundant — it can be removed entirely.',
                color: '#ff4757',
              },
              {
                val: 'λ is negative',
                meaning: 'The transformation flips the vector (points in opposite direction) AND scales it. Occurs in non-covariance matrices.',
                color: '#7F77DD',
              },
            ].map((row) => (
              <div key={row.val} style={{
                display: 'flex', gap: 14, alignItems: 'flex-start',
                background: 'var(--bg2)', borderRadius: 6, padding: '10px 12px',
              }}>
                <span style={{
                  fontSize: 12, fontFamily: 'var(--font-mono)', color: row.color,
                  minWidth: 160, lineHeight: 1.5,
                }}>
                  {row.val}
                </span>
                <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
                  {row.meaning}
                </span>
              </div>
            ))}
          </div>
        </ConceptBox>

        <h3 style={S.h3}>Explained variance — turning eigenvalues into percentages</h3>

        <p style={S.p}>
          The most useful thing you can do with eigenvalues in ML is convert them
          to "explained variance" — what percentage of the total information
          does each direction capture? This tells you how many dimensions to keep
          when reducing the dimensionality of your data.
        </p>

        <CodeBlock code={`import numpy as np

np.random.seed(42)

# ── Simulate a DoorDash customer dataset: 1000 customers, 5 features ────
# Features: order_frequency, avg_order_value, delivery_distance,
#           night_orders_pct, weekend_orders_pct
# Features are correlated — frequent orderers tend to spend more

n = 1000
order_freq      = np.random.normal(15, 5, n)
avg_value       = 150 + 8 * order_freq + np.random.normal(0, 30, n)  # correlated
delivery_dist   = np.random.normal(4, 1.5, n)
night_pct       = np.random.normal(0.3, 0.1, n).clip(0, 1)
weekend_pct     = np.random.normal(0.4, 0.1, n).clip(0, 1)

X = np.column_stack([order_freq, avg_value, delivery_dist,
                     night_pct, weekend_pct])

# ── Step 1: Standardise the data (zero mean, unit variance) ───────────
# This is CRITICAL before computing eigenvalues
# Without it, features with larger values (like avg_value in rupees)
# will dominate simply because their numbers are bigger
X_mean = X.mean(axis=0)
X_std  = X.std(axis=0)
X_std_data = (X - X_mean) / X_std
print(f"Data shape: {X_std_data.shape}  (1000 customers × 5 features)")

# ── Step 2: Compute covariance matrix ────────────────────────────────
# Covariance matrix tells us: how do features vary together?
# Shape: (5, 5) — every feature pair has a covariance value
cov_matrix = np.cov(X_std_data.T)   # .T because np.cov expects features as rows
print(f"Covariance matrix shape: {cov_matrix.shape}")

# ── Step 3: Compute eigenvalues and eigenvectors ────────────────────
eigenvalues, eigenvectors = np.linalg.eigh(cov_matrix)
# np.linalg.eigh for symmetric matrices (covariance is always symmetric)
# Returns eigenvalues sorted ASCENDING — we want DESCENDING
idx          = np.argsort(eigenvalues)[::-1]
eigenvalues  = eigenvalues[idx]
eigenvectors = eigenvectors[:, idx]

# ── Step 4: Explained variance ────────────────────────────────────────
total_variance     = eigenvalues.sum()
explained_variance = eigenvalues / total_variance

feature_names = ['order_freq', 'avg_value', 'dist', 'night_pct', 'weekend_pct']

print(f"\\nEigenvalues and explained variance:")
print(f"{'PC':<5} {'Eigenvalue':<14} {'Explained':<12} {'Cumulative':<12}")
print("─" * 46)
cumulative = 0
for i, (ev, pct) in enumerate(zip(eigenvalues, explained_variance)):
    cumulative += pct
    bar = '█' * int(pct * 40)
    print(f"  PC{i+1}  {ev:<14.4f} {pct*100:<10.1f}%  {cumulative*100:.1f}%  {bar}")

print(f"\\nConclusion:")
print(f"  PC1 alone explains {explained_variance[0]*100:.1f}% of all variation")
print(f"  PC1 + PC2 explain  {(explained_variance[:2].sum())*100:.1f}% — good enough for most tasks")
print(f"  To preserve 95% variance, keep {np.searchsorted(np.cumsum(explained_variance), 0.95)+1} components")

# ── What does the first principal component 'mean'? ──────────────────
print(f"\\nPC1 loadings (how much each feature contributes):")
pc1 = eigenvectors[:, 0]
for name, loading in zip(feature_names, pc1):
    bar = '█' * int(abs(loading) * 20)
    sign = '+' if loading > 0 else '-'
    print(f"  {name:<18}: {sign}{bar} {loading:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — PCA PREVIEW ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Where this immediately applies</span>
        <h2 style={S.h2}>PCA from scratch using eigenvalues — the complete picture</h2>

        <p style={S.p}>
          PCA (Principal Component Analysis) is the most widely used dimensionality
          reduction technique in ML. It reduces a dataset from many dimensions
          to fewer dimensions while preserving as much information as possible.
          The entire algorithm is just four steps — all of which you now understand.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 28 }}>
          <StepBox num={1} title="Standardise the data">
            <p style={{ ...S.ps, marginBottom: 0 }}>
              Subtract the mean and divide by standard deviation for each feature.
              This puts all features on the same scale so no single feature
              dominates the eigenvalue calculation because of its units.
            </p>
          </StepBox>
          <StepBox num={2} title="Compute the covariance matrix">
            <p style={{ ...S.ps, marginBottom: 0 }}>
              The covariance matrix captures how every pair of features varies together.
              If two features always go up and down together, they have high covariance.
              This matrix is always square and symmetric.
            </p>
          </StepBox>
          <StepBox num={3} title="Find the eigenvectors and eigenvalues">
            <p style={{ ...S.ps, marginBottom: 0 }}>
              The eigenvectors of the covariance matrix are the principal components —
              the directions of maximum variance. The eigenvalues tell you how much
              variance each direction captures. Sort both by eigenvalue, largest first.
            </p>
          </StepBox>
          <StepBox num={4} title="Project the data onto the top k eigenvectors">
            <p style={{ ...S.ps, marginBottom: 0 }}>
              Multiply the original data by the top k eigenvectors.
              The result is a new dataset with only k dimensions, but those k dimensions
              capture the most important variation in the original data.
            </p>
          </StepBox>
        </div>

        <CodeBlock code={`import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

np.random.seed(42)

# Same DoorDash customer dataset
n = 1000
order_freq    = np.random.normal(15, 5, n)
avg_value     = 150 + 8 * order_freq + np.random.normal(0, 30, n)
delivery_dist = np.random.normal(4, 1.5, n)
night_pct     = np.random.normal(0.3, 0.1, n).clip(0, 1)
weekend_pct   = np.random.normal(0.4, 0.1, n).clip(0, 1)
X = np.column_stack([order_freq, avg_value, delivery_dist, night_pct, weekend_pct])
feature_names = ['order_freq', 'avg_value', 'dist', 'night_pct', 'weekend_pct']

# ── PCA from scratch — using eigenvalues ──────────────────────────────
def pca_from_scratch(X, n_components):
    """
    Full PCA implementation using eigenvalue decomposition.
    Every step is explicit so you can see exactly what is happening.
    """
    # Step 1: Standardise
    mean  = X.mean(axis=0)
    std   = X.std(axis=0)
    X_std = (X - mean) / std

    # Step 2: Covariance matrix
    cov = np.cov(X_std.T)                       # shape (n_features, n_features)

    # Step 3: Eigendecomposition
    eigenvalues, eigenvectors = np.linalg.eigh(cov)
    # Sort descending
    idx          = np.argsort(eigenvalues)[::-1]
    eigenvalues  = eigenvalues[idx]
    eigenvectors = eigenvectors[:, idx]

    # Step 4: Project data onto top n_components eigenvectors
    components   = eigenvectors[:, :n_components]     # shape (n_features, n_components)
    X_projected  = X_std @ components                  # shape (n_samples, n_components)

    explained_var = eigenvalues[:n_components] / eigenvalues.sum()
    return X_projected, explained_var, components

X_pca, exp_var, components = pca_from_scratch(X, n_components=2)

print(f"Original data shape:   {X.shape}")
print(f"Projected data shape:  {X_pca.shape}")
print(f"Variance explained:    PC1={exp_var[0]*100:.1f}%  PC2={exp_var[1]*100:.1f}%")
print(f"Total captured:        {exp_var.sum()*100:.1f}% of original information")

# ── sklearn PCA — one line, same result ───────────────────────────────
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

pca = PCA(n_components=2)
X_pca_sk = pca.fit_transform(X_scaled)

print(f"\\nsklearn PCA result:")
print(f"  Explained variance ratio: {pca.explained_variance_ratio_.round(3)}")
print(f"  Cumulative: {pca.explained_variance_ratio_.cumsum().round(3)}")

# ── How many components to keep? ──────────────────────────────────────
pca_full = PCA()
pca_full.fit(X_scaled)
cumulative = np.cumsum(pca_full.explained_variance_ratio_)

print(f"\\nHow many components to keep (95% threshold):")
for k, cum in enumerate(cumulative, 1):
    bar = '█' * int(cum * 30)
    flag = ' ← keep this many' if cum >= 0.95 and cumulative[k-2] < 0.95 else ''
    print(f"  k={k}: {bar} {cum*100:.1f}%{flag}")

# ── Real use: compress and reconstruct data ───────────────────────────
k = 2   # use only 2 dimensions
pca2 = PCA(n_components=k)
X_compressed   = pca2.fit_transform(X_scaled)   # 1000×5 → 1000×2
X_reconstructed = pca2.inverse_transform(X_compressed)  # 1000×2 → 1000×5

# Reconstruction error — how much did we lose?
reconstruction_error = np.mean((X_scaled - X_reconstructed) ** 2)
print(f"\\nCompression: 5 features → {k} components")
print(f"Reconstruction MSE: {reconstruction_error:.4f}")
print(f"Information preserved: {pca2.explained_variance_ratio_.sum()*100:.1f}%")`} />

        <h3 style={S.h3}>When to use PCA vs when not to</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid rgba(29,158,117,0.3)',
            borderRadius: 8, padding: '14px 16px',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
              Good use cases ✓
            </div>
            {[
              'Visualising high-dimensional data in 2D or 3D',
              'Removing correlated features before linear models',
              'Reducing memory / compute when you have 1000+ features',
              'Denoising — small eigenvalue components often carry noise',
              'Preprocessing for KNN (curse of dimensionality)',
            ].map((item, i) => (
              <div key={i} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 5, lineHeight: 1.5 }}>
                • {item}
              </div>
            ))}
          </div>
          <div style={{
            background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.3)',
            borderRadius: 8, padding: '14px 16px',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ff4757', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
              Avoid PCA when ✗
            </div>
            {[
              'You need to interpret feature importance (components mix features)',
              'Tree models — they handle high dimensions natively',
              'Features are already independent (no correlation to remove)',
              'You have few features (< 10) — overhead not worth it',
              'Non-linear structure — PCA only finds linear directions',
            ].map((item, i) => (
              <div key={i} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 5, lineHeight: 1.5 }}>
                • {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Div />

      {/* ══ SECTION 6 — THREE REAL APPLICATIONS ═══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Where eigenvalues appear in production ML</span>
        <h2 style={S.h2}>Three algorithms you will use regularly — all built on eigenvalues</h2>

        <p style={S.p}>
          Eigenvalues are not just a PCA concept. They are the mathematical core
          of three widely deployed algorithms. Once you see the connection,
          these algorithms stop being black boxes.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid rgba(127,119,221,0.3)',
            borderRadius: 10, padding: '16px 18px',
            borderLeft: '4px solid #7F77DD',
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#7F77DD', fontFamily: 'var(--font-display)', marginBottom: 6 }}>
              1. PCA — Dimensionality reduction
            </div>
            <p style={{ ...S.ps, marginBottom: 5 }}>
              Eigenvectors of the covariance matrix. Already covered in full above.
              Used everywhere: image compression, customer segmentation visualisation,
              noise removal from sensor data.
            </p>
            <div style={{ fontSize: 11, color: '#7F77DD', fontFamily: 'var(--font-mono)' }}>
              sklearn: PCA(n_components=k).fit_transform(X)
            </div>
          </div>

          <div style={{
            background: 'var(--surface)', border: '1px solid rgba(29,158,117,0.3)',
            borderRadius: 10, padding: '16px 18px',
            borderLeft: '4px solid #1D9E75',
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-display)', marginBottom: 6 }}>
              2. Spectral Clustering — finding groups in complex shapes
            </div>
            <p style={{ ...S.ps, marginBottom: 5 }}>
              Regular K-Means fails when clusters are not round blobs.
              Spectral Clustering builds a graph where similar data points are connected,
              then finds eigenvalues of the graph's Laplacian matrix.
              The eigenvectors reveal cluster structure that K-Means can never find.
              Used at Amazon for discovering customer communities,
              at DoorDash for identifying restaurant "neighbourhoods".
            </p>
            <div style={{ fontSize: 11, color: '#1D9E75', fontFamily: 'var(--font-mono)' }}>
              sklearn: SpectralClustering(n_clusters=k).fit_predict(X)
            </div>
          </div>

          <div style={{
            background: 'var(--surface)', border: '1px solid rgba(216,90,48,0.3)',
            borderRadius: 10, padding: '16px 18px',
            borderLeft: '4px solid #D85A30',
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#D85A30', fontFamily: 'var(--font-display)', marginBottom: 6 }}>
              3. Google PageRank — ranking web pages by importance
            </div>
            <p style={{ ...S.ps, marginBottom: 5 }}>
              The original Google algorithm that made Google worth a trillion dollars.
              The web is a graph: pages are nodes, links are edges.
              PageRank builds a matrix representing all links and finds its
              principal eigenvector. Pages that appear strongly in that eigenvector
              are the most "important" pages — the ones that many important pages link to.
              Every search result you see is influenced by this eigenvector.
            </p>
            <div style={{ fontSize: 11, color: '#D85A30', fontFamily: 'var(--font-mono)' }}>
              Core computation: eigenvector of the page transition matrix
            </div>
          </div>
        </div>

        <CodeBlock code={`import numpy as np
from sklearn.cluster import SpectralClustering

# ── Simplified PageRank demo using eigenvalues ─────────────────────────
# Imagine a tiny web with 5 pages: [home, products, about, blog, cart]
# Entry [i][j] = 1 means page i links to page j

link_matrix = np.array([
    # home  prod  about  blog  cart
    [  0,    1,    1,    1,    0  ],   # home links to products, about, blog
    [  1,    0,    0,    1,    1  ],   # products links to home, blog, cart
    [  1,    0,    0,    0,    0  ],   # about links only to home
    [  1,    1,    0,    0,    0  ],   # blog links to home, products
    [  1,    1,    0,    0,    0  ],   # cart links to home, products
], dtype=float)

page_names = ['home', 'products', 'about', 'blog', 'cart']

# Build transition matrix: normalise each row so probabilities sum to 1
row_sums           = link_matrix.sum(axis=1, keepdims=True)
transition_matrix  = link_matrix / row_sums

# PageRank is the principal eigenvector of the TRANSPOSE of transition matrix
eigenvalues, eigenvectors = np.linalg.eig(transition_matrix.T)

# Find the eigenvector with eigenvalue closest to 1 (the stationary distribution)
idx        = np.argmin(np.abs(eigenvalues - 1.0))
page_rank  = np.real(eigenvectors[:, idx])
page_rank  = np.abs(page_rank) / np.abs(page_rank).sum()  # normalise to sum=1

print("PageRank scores (importance of each page):")
for name, score in sorted(zip(page_names, page_rank), key=lambda x: x[1], reverse=True):
    bar = '█' * int(score * 100)
    print(f"  {name:<12}: {bar} {score:.4f}")
print("\\n'home' and 'products' score highest because many pages link to them.")

# ── Spectral clustering demo ───────────────────────────────────────────
np.random.seed(42)
# Create two concentric ring clusters — K-Means would fail on these
from sklearn.datasets import make_circles
X_circles, y_circles = make_circles(n_samples=300, noise=0.05, factor=0.4)

# K-Means fails on ring-shaped clusters
from sklearn.cluster import KMeans
km_labels = KMeans(n_clusters=2, random_state=42, n_init=10).fit_predict(X_circles)
km_accuracy = max(
    (km_labels == y_circles).mean(),
    (km_labels != y_circles).mean()
)

# Spectral clustering handles them correctly using eigenvectors
sc_labels = SpectralClustering(
    n_clusters=2, affinity='rbf', random_state=42
).fit_predict(X_circles)
sc_accuracy = max(
    (sc_labels == y_circles).mean(),
    (sc_labels != y_circles).mean()
)

print(f"\\nRing-shaped clusters:")
print(f"  K-Means accuracy:         {km_accuracy:.1%}  ← fails, thinks linearly")
print(f"  Spectral Clustering:       {sc_accuracy:.1%}  ← succeeds via eigenvectors")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common eigenvalue error — explained and fixed</h2>

        <ErrorBlock
          error="Complex eigenvalues appear — eigenvalues contain imaginary numbers like (2.3+0.4j)"
          cause="np.linalg.eig() returns complex numbers when the matrix is not symmetric. For asymmetric matrices (like a transition matrix), some eigenvalues genuinely are complex — the transformation involves rotation, not just stretching. But if you passed in a covariance matrix and got complex values, your covariance matrix is slightly non-symmetric due to floating-point errors."
          fix="For covariance matrices and any symmetric matrix, always use np.linalg.eigh() instead of np.linalg.eig(). The 'h' stands for Hermitian (symmetric). It guarantees real eigenvalues and is also faster and more numerically stable. If you must use eig(), extract the real part: eigenvalues = np.real(eigenvalues)."
        />

        <ErrorBlock
          error="PCA components explain only 20% of variance — something is wrong"
          cause="You forgot to standardise your data before PCA. A feature with values in the thousands (like price in rupees) has a variance millions of times larger than a feature between 0 and 1 (like a proportion). The covariance matrix is dominated by the high-variance feature, and all principal components end up aligned with that one feature."
          fix="Always apply StandardScaler before PCA: scaler = StandardScaler(); X_scaled = scaler.fit_transform(X). Or use PCA with whiten=True which standardises automatically. Standardisation ensures every feature contributes equally to the covariance structure, so eigenvalues reflect genuine data patterns rather than unit differences."
        />

        <ErrorBlock
          error="Eigenvectors change sign or order between runs — results are not reproducible"
          cause="Eigenvectors are only defined up to sign and scale — if e is an eigenvector, so is -e. Different implementations or different runs may return the eigenvector pointing in the positive or negative direction. NumPy and sklearn do not guarantee consistent sign conventions across versions or random seeds."
          fix="This is mathematically correct and not a bug. To make results reproducible for downstream tasks, enforce a consistent sign convention: flip each eigenvector so its largest absolute component is positive. In sklearn PCA this is handled automatically. For raw np.linalg.eigh(), apply: for i in range(V.shape[1]): if V[np.argmax(np.abs(V[:,i])), i] < 0: V[:,i] *= -1"
        />

        <ErrorBlock
          error="ValueError: array must not contain infs or NaNs when calling np.linalg.eig"
          cause="Your matrix contains NaN or infinite values. This usually happens because the covariance matrix was computed on data with missing values (NaN propagates through all arithmetic), or because you divided by zero when normalising a zero-variance feature (a column that is constant has zero standard deviation)."
          fix="Check for NaN: print(np.isnan(X).sum()). Check for constant columns: print((X.std(axis=0) == 0)). Remove or impute NaN values before computing the covariance matrix. Drop constant columns before PCA — they carry no information and cause division by zero in standardisation. Use SimpleImputer for missing values."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You now understand how ML finds structure in data. Next: how it learns from it.
        </h2>

        <p style={S.p}>
          Eigenvalues help you find the important directions in a dataset before training.
          The next module — Derivatives, Gradients and the Chain Rule — explains how
          ML models actually improve during training. Specifically: how do you adjust
          millions of model parameters to make predictions better?
          The answer is gradient descent — the engine behind every neural network,
          logistic regression, and linear regression you will ever train.
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
              Next — Module 07 · Math Foundations
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Derivatives, Gradients and the Chain Rule
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              The mathematical engine behind every learning algorithm.
              Understand gradient descent before you ever run model.fit().
            </p>
          </div>
          <a href="/learn/ai-ml/math-foundations/derivatives-and-gradients" style={{
            fontSize: 12, color: '#7F77DD',
            border: '1px solid #7F77DD50',
            padding: '7px 14px', borderRadius: 6,
            fontFamily: 'var(--font-mono)',
            textDecoration: 'none',
            background: '#7F77DD10',
          }}>
            read →
          </a>
        </div>
      </div>

      <KeyTakeaways
        items={[
          'An eigenvector is a special vector that does not rotate when a matrix transformation is applied to it — it only stretches or shrinks. The amount it stretches is the eigenvalue. The equation is A·e = λ·e.',
          'Most vectors change direction when multiplied by a matrix. Eigenvectors are the exception — they are the "natural axes" of the transformation, the directions the matrix fundamentally operates along.',
          'For a covariance matrix of your dataset, eigenvectors point in the directions of maximum variance in the data. The eigenvalue tells you how much variance that direction captures. Large eigenvalue = important direction. Small eigenvalue = noise.',
          'PCA is four steps: standardise → covariance matrix → eigendecomposition → project onto top-k eigenvectors. The result is a lower-dimensional dataset that preserves the most important variation from the original.',
          'Always use np.linalg.eigh() (not eig()) for covariance matrices — it guarantees real eigenvalues, is faster, and is numerically more stable. Always standardise data before computing eigenvalues.',
          'Eigenvalues appear in three major production algorithms: PCA (covariance matrix eigenvectors), Spectral Clustering (graph Laplacian eigenvectors for non-convex clusters), and Google PageRank (principal eigenvector of the web link matrix).',
        ]}
      />
    </LearnLayout>
  )
}