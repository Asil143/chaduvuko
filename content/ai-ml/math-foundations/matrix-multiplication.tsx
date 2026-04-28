import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Matrix Multiplication and Linear Transformations — Chaduvuko',
  description:
    'How data flows through a neural network layer. Matrix multiplication explained visually — the single most important operation in all of deep learning.',
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
  code: {
    fontFamily: 'var(--font-mono)', fontSize: 12,
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: 4, padding: '1px 6px', color: 'var(--accent)',
  },
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

// ─── Matrix visual component ──────────────────────────────────────────────────

function Matrix({
  data, color, label, highlight,
}: {
  data: (string | number)[][]
  color: string
  label?: string
  highlight?: [number, number][]
}) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      {label && (
        <span style={{
          fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)',
        }}>
          {label}
        </span>
      )}
      <div style={{
        border: `2px solid ${color}60`, borderRadius: 8,
        padding: '10px 14px', background: `${color}08`,
        display: 'inline-flex', flexDirection: 'column', gap: 5,
      }}>
        {data.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: 14 }}>
            {row.map((cell, ci) => {
              const isHit = highlight?.some(([r, c]) => r === ri && c === ci)
              return (
                <div key={ci} style={{
                  width: 28, height: 28, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  borderRadius: 4,
                  background: isHit ? `${color}30` : 'transparent',
                  border: isHit ? `1.5px solid ${color}80` : '1px solid transparent',
                  fontSize: 13, fontFamily: 'var(--font-mono)',
                  color: isHit ? color : 'var(--text)',
                  fontWeight: isHit ? 700 : 400,
                }}>
                  {cell}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <span style={{
        fontSize: 10, color, fontFamily: 'var(--font-mono)', fontWeight: 600,
      }}>
        {`(${data.length}×${data[0].length})`}
      </span>
    </div>
  )
}

export default function MatrixMultiplicationPage() {
  return (
    <LearnLayout
      title="Matrix Multiplication and Linear Transformations"
      description="The single operation that powers every neural network. Understand this deeply and every layer in every model makes intuitive sense."
      section="Math Foundations"
      readTime="26–34 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section='math-foundations' topic='matrix-multiplication' />

      {/* ══ SECTION 1 — WHY ════════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Why this matters more than anything else</span>
        <h2 style={S.h2}>Every neural network is just matrix multiplications stacked on top of each other.</h2>

        <p style={S.p}>
          GPT-4 has 1.8 trillion parameters. Claude has hundreds of billions.
          Stable Diffusion generates photorealistic images. All of them —
          at the fundamental mechanical level — are doing the same thing:
          multiplying matrices, adding bias vectors, applying an activation function,
          and repeating this hundreds of times.
        </p>

        <p style={S.p}>
          That's not a simplification. When you strip away the marketing language
          and the paper jargon, a "transformer layer" is a handful of matrix multiplications.
          A "convolutional layer" is a specific type of matrix multiplication.
          Even the attention mechanism — the breakthrough behind every modern LLM —
          is three matrix multiplications and a softmax.
        </p>

        <HBox color="#7F77DD">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              What this page teaches:{' '}
            </span>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'How matrix multiplication actually works — step by step, with visuals',
              'The shape rule — why shapes must match and what the output shape will be',
              'What "linear transformation" means and why it\'s the perfect word',
              'How one neural network layer transforms your data using matmul',
              'Every shape error you will hit and exactly how to fix each one',
              'How SVD decomposes any matrix — and why it underpins PCA and recommenders',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <div style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: '#7F77DD', flexShrink: 0, marginTop: 7,
                }} />
                <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </HBox>

        <Callout type="tip">
          Every visual in this page is interactive in your head — as you read,
          trace the row × column path with your finger on the screen.
          That physical tracing is how this operation gets permanently installed
          in your memory. Don't just read it.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — THE MECHANICS ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The mechanics</span>
        <h2 style={S.h2}>How matrix multiplication actually works</h2>

        <p style={S.p}>
          Matrix multiplication is not multiplying matching elements.
          That's element-wise multiplication — a different operation entirely.
          Matrix multiplication is: for each position in the result,
          take one <em>row</em> from the left matrix and one <em>column</em> from
          the right matrix, compute their dot product, and put that number
          in the result at that position.
        </p>

        <p style={S.p}>
          That description sounds abstract. Here's the concrete picture.
        </p>

        <h3 style={S.h3}>Step-by-step walkthrough with a small example</h3>

        <p style={S.p}>
          Let's multiply a (2×3) matrix by a (3×2) matrix.
          We'll compute every single element of the result so nothing is hidden.
        </p>

        <VisualBox label="A (2×3) @ B (3×2) → result (2×2)">
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <Matrix
              data={[[1,2,3],[4,5,6]]}
              color="#378ADD"
              label="A — (2×3)"
              highlight={[[0,0],[0,1],[0,2]]}
            />
            <div style={{
              fontSize: 22, color: 'var(--muted)', paddingTop: 32,
            }}>
              @
            </div>
            <Matrix
              data={[[7,8],[9,10],[11,12]]}
              color="#1D9E75"
              label="B — (3×2)"
              highlight={[[0,0],[1,0],[2,0]]}
            />
            <div style={{ fontSize: 22, color: 'var(--muted)', paddingTop: 32 }}>=</div>
            <Matrix
              data={[['?','?'],['?','?']]}
              color="#D85A30"
              label="Result — (2×2)"
            />
          </div>
          <div style={{
            marginTop: 16, padding: '12px 14px',
            background: 'var(--surface)', borderRadius: 8,
            border: '1px solid var(--border)',
          }}>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.9, fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: '#378ADD' }}>highlighted row 0 of A</span>{' '}
              · <span style={{ color: '#1D9E75' }}>highlighted col 0 of B</span>{' '}
              = <span style={{ color: '#D85A30' }}>result[0,0]</span><br />
              (1×7) + (2×9) + (3×11) = 7 + 18 + 33 = <strong style={{ color: '#D85A30' }}>58</strong>
            </div>
          </div>
        </VisualBox>

        <p style={S.p}>
          Let's compute all four positions of the result so you see the full pattern:
        </p>

        <VisualBox label="Computing all 4 result elements">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              {
                pos: 'result[0,0]',
                row: 'Row 0 of A: [1, 2, 3]',
                col: 'Col 0 of B: [7, 9, 11]',
                calc: '1×7 + 2×9 + 3×11 = 7 + 18 + 33',
                ans: '58',
                color: '#378ADD',
              },
              {
                pos: 'result[0,1]',
                row: 'Row 0 of A: [1, 2, 3]',
                col: 'Col 1 of B: [8, 10, 12]',
                calc: '1×8 + 2×10 + 3×12 = 8 + 20 + 36',
                ans: '64',
                color: '#1D9E75',
              },
              {
                pos: 'result[1,0]',
                row: 'Row 1 of A: [4, 5, 6]',
                col: 'Col 0 of B: [7, 9, 11]',
                calc: '4×7 + 5×9 + 6×11 = 28 + 45 + 66',
                ans: '139',
                color: '#D85A30',
              },
              {
                pos: 'result[1,1]',
                row: 'Row 1 of A: [4, 5, 6]',
                col: 'Col 1 of B: [8, 10, 12]',
                calc: '4×8 + 5×10 + 6×12 = 32 + 50 + 72',
                ans: '154',
                color: '#7F77DD',
              },
            ].map((item) => (
              <div key={item.pos} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}30`,
                borderRadius: 8, padding: '11px 13px',
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: item.color,
                  fontFamily: 'var(--font-mono)', marginBottom: 6,
                }}>
                  {item.pos}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.7, fontFamily: 'var(--font-mono)' }}>
                  {item.row}<br />
                  {item.col}<br />
                  {item.calc}<br />
                  <span style={{ color: item.color, fontWeight: 700 }}>= {item.ans}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 12, padding: '10px 14px',
            background: 'var(--surface)', borderRadius: 6,
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-mono)', fontSize: 13,
            color: 'var(--text)',
          }}>
            Final result: [[<span style={{ color: '#378ADD' }}>58</span>, <span style={{ color: '#1D9E75' }}>64</span>], [<span style={{ color: '#D85A30' }}>139</span>, <span style={{ color: '#7F77DD' }}>154</span>]]
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np

A = np.array([[1, 2, 3],
              [4, 5, 6]])   # shape (2, 3)

B = np.array([[7,  8],
              [9,  10],
              [11, 12]])    # shape (3, 2)

# Matrix multiplication — the @ operator is the modern way
result = A @ B
print(result)
# [[ 58,  64],
#  [139, 154]]

print(result.shape)  # (2, 2)

# np.matmul() is identical to @
result2 = np.matmul(A, B)
print(np.array_equal(result, result2))  # True

# np.dot() ALSO works for 2D arrays — but confusing for higher dims.
# Use @ everywhere. It is the clearest and most consistent.
result3 = np.dot(A, B)
print(np.array_equal(result, result3))  # True

# Verify manually: result[0,0] = dot(A[0], B[:,0])
manual = np.dot(A[0], B[:, 0])
print(manual)   # 58  ✓`} />

        <h3 style={S.h3}>The rule that makes everything click</h3>

        <p style={S.p}>
          You can only multiply two matrices if their <em>inner dimensions match</em>.
          The result takes the <em>outer dimensions</em>.
        </p>

        <VisualBox label="The shape rule — memorise this diagram">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { a: '(2 × 3)', b: '(3 × 4)', result: '(2 × 4)', valid: true,  match: '3 = 3 ✓' },
              { a: '(1000 × 4)', b: '(4 × 64)', result: '(1000 × 64)', valid: true,  match: '4 = 4 ✓' },
              { a: '(32 × 128)', b: '(128 × 256)', result: '(32 × 256)', valid: true,  match: '128 = 128 ✓' },
              { a: '(2 × 3)', b: '(4 × 5)', result: 'ERROR', valid: false, match: '3 ≠ 4 ✗' },
              { a: '(64 × 128)', b: '(64 × 256)', result: 'ERROR', valid: false, match: '128 ≠ 64 ✗' },
            ].map((row, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap',
              }}>
                <div style={{
                  padding: '5px 12px', borderRadius: 5,
                  background: 'rgba(55,138,221,0.1)',
                  border: '1.5px solid rgba(55,138,221,0.4)',
                  fontSize: 13, fontFamily: 'var(--font-mono)',
                  color: '#378ADD', fontWeight: 600,
                }}>
                  {row.a}
                </div>
                <span style={{ fontSize: 14, color: 'var(--muted)' }}>@</span>
                <div style={{
                  padding: '5px 12px', borderRadius: 5,
                  background: 'rgba(29,158,117,0.1)',
                  border: '1.5px solid rgba(29,158,117,0.4)',
                  fontSize: 13, fontFamily: 'var(--font-mono)',
                  color: '#1D9E75', fontWeight: 600,
                }}>
                  {row.b}
                </div>
                <div style={{
                  fontSize: 11, fontFamily: 'var(--font-mono)',
                  color: row.valid ? '#1D9E75' : '#ff4757',
                  fontWeight: 600, minWidth: 70,
                }}>
                  {row.match}
                </div>
                <span style={{ fontSize: 14, color: 'var(--muted)' }}>=</span>
                <div style={{
                  padding: '5px 12px', borderRadius: 5,
                  background: row.valid
                    ? 'rgba(216,90,48,0.1)'
                    : 'rgba(226,75,74,0.08)',
                  border: `1.5px solid ${row.valid ? 'rgba(216,90,48,0.4)' : 'rgba(226,75,74,0.4)'}`,
                  fontSize: 13, fontFamily: 'var(--font-mono)',
                  color: row.valid ? '#D85A30' : '#ff4757',
                  fontWeight: 600,
                }}>
                  {row.result}
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 16, padding: '10px 14px',
            background: 'var(--surface)', borderRadius: 6,
            border: '1px solid var(--border)', fontSize: 12, color: 'var(--muted)',
          }}>
            Pattern: (m × <span style={{ color: '#378ADD', fontWeight: 700 }}>n</span>) @ (<span style={{ color: '#378ADD', fontWeight: 700 }}>n</span> × p) → (m × p).
            The two middle numbers must be equal. The result takes the two outside numbers.
          </div>
        </VisualBox>

        <CodeBlock code={`# Valid multiplications
A = np.random.randn(2, 3)
B = np.random.randn(3, 4)
C = A @ B
print(C.shape)   # (2, 4)  ← outer dims: 2 and 4

# Real ML sizes
X = np.random.randn(1000, 4)    # 1000 training examples, 4 features
W = np.random.randn(4, 64)      # weight matrix for 64 neurons
out = X @ W
print(out.shape)   # (1000, 64) ← 1000 examples, each mapped to 64 values

# The most useful trick: check shapes BEFORE multiplying
def check_matmul(A, B):
    if A.shape[1] != B.shape[0]:
        print(f"Shape mismatch! A={A.shape}, B={B.shape}")
        print(f"A has {A.shape[1]} columns, B has {B.shape[0]} rows — must match.")
        print(f"Try: B = B.T  (current B.T shape would be {B.T.shape})")
    else:
        result = A @ B
        print(f"{A.shape} @ {B.shape} → {result.shape}  ✓")
    return None

check_matmul(np.random.randn(5, 3), np.random.randn(3, 7))   # (5,3) @ (3,7) → (5,7)  ✓
check_matmul(np.random.randn(5, 3), np.random.randn(7, 3))   # Shape mismatch!`} />

        <Callout type="warning">
          Matrix multiplication is <strong>NOT commutative</strong>.{' '}
          <span style={S.code as React.CSSProperties}>A @ B</span> is not the same as{' '}
          <span style={S.code as React.CSSProperties}>B @ A</span> — in fact
          one of them will often be a shape error.
          Always think: left matrix rows drive the result rows,
          right matrix columns drive the result columns.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 3 — LINEAR TRANSFORMATIONS ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What it actually does</span>
        <h2 style={S.h2}>Linear transformations — what "transformation" really means</h2>

        <p style={S.p}>
          "Matrix multiplication" is the mechanical description.
          "Linear transformation" is the geometric meaning.
          When you multiply a vector by a matrix, you're transforming it —
          moving it to a new position in space, rotating it, scaling it,
          or projecting it into a different number of dimensions.
        </p>

        <p style={S.p}>
          This is not just abstract geometry. In ML, transformations are
          how models change the representation of data at each layer.
          A neural network takes raw pixels (a 224×224×3 tensor) and
          transforms them — layer by layer — into a representation that
          makes classification easy. Each layer is one transformation.
          The learned weights are the transformation matrix.
        </p>

        <h3 style={S.h3}>The three things a matrix can do to a vector</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 24 }}>
          {[
            {
              title: 'Scale',
              desc: 'Stretch or shrink values. A weight matrix with large values amplifies the input; small values suppress it. This is how neural networks learn which features matter.',
              example: 'W = [[2,0],[0,0.5]] scales x by 2, y by 0.5',
              color: '#378ADD',
            },
            {
              title: 'Rotate',
              desc: 'Rearrange the direction of the data in space. A rotation matrix changes orientation without changing length. Transformers use rotary position embeddings (RoPE) this way.',
              example: 'W = [[cos θ, -sin θ],[sin θ, cos θ]]',
              color: '#1D9E75',
            },
            {
              title: 'Project',
              desc: 'Change the number of dimensions. Going from (n,) to (m,) where m < n compresses. Where m > n expands. Expanding = adding capacity. Compressing = extracting essence.',
              example: '(4,) @ (4×64) → (64,) expands 4D to 64D',
              color: '#D85A30',
            },
          ].map((item) => (
            <div key={item.title} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '15px 17px',
              borderTop: `2px solid ${item.color}`,
            }}>
              <div style={{
                fontSize: 14, fontWeight: 700, color: 'var(--text)',
                fontFamily: 'var(--font-display)', marginBottom: 7,
              }}>
                {item.title}
              </div>
              <p style={{ ...S.ps, marginBottom: 10 }}>{item.desc}</p>
              <div style={{
                fontSize: 11, fontFamily: 'var(--font-mono)', color: item.color,
                padding: '5px 8px', background: `${item.color}10`,
                borderRadius: 4, lineHeight: 1.6,
              }}>
                {item.example}
              </div>
            </div>
          ))}
        </div>

        <h3 style={S.h3}>Why "linear" — what that constraint means</h3>

        <p style={S.p}>
          A transformation is "linear" if it satisfies two properties:
          scaling an input scales the output by the same amount,
          and adding two inputs before transforming gives the same result
          as transforming each separately and adding.
          In plain English: lines stay lines, the origin stays fixed.
        </p>

        <p style={S.p}>
          This is why activation functions exist in neural networks.
          If you stack 100 linear layers with no activation function between them,
          the whole stack collapses into one single linear transformation —
          no matter how many layers you add. Activations (ReLU, GELU, sigmoid)
          introduce non-linearity, which is what gives neural networks
          the power to learn curved, complex patterns.
        </p>

        <HBox color="#D85A30">
          <p style={{ ...S.p, marginBottom: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              The key insight:{' '}
            </span>
            linear layers (matrix multiplications) give neural networks
            their capacity — the ability to transform data into useful representations.
            Non-linear activation functions give neural networks their power —
            the ability to learn patterns that no straight line could capture.
            You need both. One without the other is useless.
          </p>
        </HBox>

        <CodeBlock code={`# Proving linearity: f(ax) = a*f(x)
W = np.array([[2, 1], [0, 3], [1, 2]])  # (3, 2) weight matrix

x = np.array([1.0, 2.0])   # input vector

# Transform the input
f_x = W @ x
print(f_x)   # [4., 6., 5.]

# Scale input by 3, then transform
f_3x = W @ (3 * x)
print(f_3x)  # [12., 18., 15.]

# 3 × transform = same result
print(3 * f_x)  # [12., 18., 15.]  ✓  same!

# Proving: f(x+y) = f(x) + f(y)
y = np.array([0.5, 1.0])
print(np.allclose(W @ (x + y),  (W @ x) + (W @ y)))  # True ✓

# Now prove non-linear activations break this linearity:
def relu(z): return np.maximum(0, z)

x1 = np.array([2.0, -1.0])
x2 = np.array([-3.0, 4.0])

# relu(x1 + x2) ≠ relu(x1) + relu(x2)
print(relu(x1 + x2))           # [0., 3.]
print(relu(x1) + relu(x2))     # [2., 3.]  ← DIFFERENT
# This non-linearity is exactly why neural networks can learn complex patterns`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — NEURAL NETWORK LAYER ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The payoff</span>
        <h2 style={S.h2}>A neural network layer — demystified completely</h2>

        <p style={S.p}>
          A fully-connected (dense) neural network layer is, at its core,
          one matrix multiplication plus one vector addition plus one activation function.
          That's the complete recipe. Nothing is hidden.
        </p>

        <VisualBox label="One neural network layer — full picture">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Input */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{
                fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)',
                minWidth: 80,
              }}>
                Input X
              </div>
              <div style={{
                padding: '7px 14px', borderRadius: 6,
                background: 'rgba(55,138,221,0.1)',
                border: '1.5px solid rgba(55,138,221,0.4)',
                fontSize: 13, fontFamily: 'var(--font-mono)', color: '#378ADD',
              }}>
                (batch=32, features=4)
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                32 DoorDash orders, each with 4 features
              </div>
            </div>

            <div style={{ fontSize: 20, color: 'var(--muted)', paddingLeft: 92 }}>↓</div>

            {/* Matmul */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{
                fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)',
                minWidth: 80,
              }}>
                Step 1
              </div>
              <div style={{
                padding: '7px 14px', borderRadius: 6,
                background: 'rgba(186,117,23,0.1)',
                border: '1.5px solid rgba(186,117,23,0.4)',
                fontSize: 13, fontFamily: 'var(--font-mono)', color: '#BA7517',
              }}>
                Z = X @ W + b
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                W is (4×64), b is (64,) → Z is (32, 64)
              </div>
            </div>

            <div style={{ fontSize: 20, color: 'var(--muted)', paddingLeft: 92 }}>↓</div>

            {/* Activation */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{
                fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)',
                minWidth: 80,
              }}>
                Step 2
              </div>
              <div style={{
                padding: '7px 14px', borderRadius: 6,
                background: 'rgba(29,158,117,0.1)',
                border: '1.5px solid rgba(29,158,117,0.4)',
                fontSize: 13, fontFamily: 'var(--font-mono)', color: '#1D9E75',
              }}>
                A = ReLU(Z)
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                Apply activation element-wise → still (32, 64)
              </div>
            </div>

            <div style={{ fontSize: 20, color: 'var(--muted)', paddingLeft: 92 }}>↓</div>

            {/* Output */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{
                fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)',
                minWidth: 80,
              }}>
                Output A
              </div>
              <div style={{
                padding: '7px 14px', borderRadius: 6,
                background: 'rgba(216,90,48,0.1)',
                border: '1.5px solid rgba(216,90,48,0.4)',
                fontSize: 13, fontFamily: 'var(--font-mono)', color: '#D85A30',
              }}>
                (batch=32, neurons=64)
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                32 orders, each now represented as 64 values
              </div>
            </div>
          </div>
        </VisualBox>

        <p style={S.p}>
          The weight matrix W starts as random numbers. During training,
          gradient descent adjusts every value in W to make the final
          predictions better. After thousands of iterations, W has been
          shaped into a transformation that extracts the most useful
          features from the input for the task at hand.
        </p>

        <p style={S.p}>
          That's the entire learning process in one sentence:
          <em> finding the matrix values that make the transformation useful</em>.
        </p>

        <CodeBlock code={`import numpy as np

np.random.seed(42)

# 32 DoorDash orders, 4 features each
X = np.random.randn(32, 4)

# ── Layer 1: 4 features → 64 neurons ──────────────────────────────────
# Weight matrix: random initialisation (will be updated during training)
# Shape: (input_features, output_neurons) = (4, 64)
W1 = np.random.randn(4, 64) * 0.01   # small init to avoid exploding activations
b1 = np.zeros(64)                     # bias initialised to zero

Z1 = X @ W1 + b1                      # (32,4) @ (4,64) + (64,) → (32,64)
A1 = np.maximum(0, Z1)                # ReLU activation: max(0, x)

print(f"Layer 1 output shape: {A1.shape}")   # (32, 64)

# ── Layer 2: 64 neurons → 32 neurons ─────────────────────────────────
W2 = np.random.randn(64, 32) * 0.01
b2 = np.zeros(32)

Z2 = A1 @ W2 + b2   # (32,64) @ (64,32) + (32,) → (32,32)
A2 = np.maximum(0, Z2)

print(f"Layer 2 output shape: {A2.shape}")   # (32, 32)

# ── Output layer: 32 neurons → 1 prediction ──────────────────────────
W3 = np.random.randn(32, 1) * 0.01
b3 = np.zeros(1)

Z3 = A2 @ W3 + b3   # (32,32) @ (32,1) + (1,) → (32,1)
# No activation on output for regression — the raw number IS the prediction

predictions = Z3.squeeze()   # (32,) — one predicted delivery time per order
print(f"Predictions shape: {predictions.shape}")  # (32,)
print(f"Sample prediction: {predictions[0]:.4f} minutes")

# The total parameter count in this tiny network:
total_params = (4*64 + 64) + (64*32 + 32) + (32*1 + 1)
print(f"Total learnable parameters: {total_params}")  # 2,369
# GPT-4 has ~1.8 trillion. Same structure, vastly larger.`} />

        <h3 style={S.h3}>Matrix shapes define the network architecture</h3>

        <p style={S.p}>
          Every architectural decision in a neural network — how many layers,
          how many neurons per layer, how wide or narrow it is — is just
          a choice about matrix shapes. When a paper says "a feedforward
          layer with hidden dimension 512" it means the weight matrix W
          has 512 columns. That's it. The entire architecture is encoded
          in the shapes.
        </p>

        <CodeBlock code={`# Architecture as shape decisions
# Narrow network: low capacity, fast, less likely to overfit
narrow_shapes = [(4, 16), (16, 8), (8, 1)]

# Wide network: high capacity, slow, more likely to overfit
wide_shapes = [(4, 512), (512, 256), (256, 1)]

# Deep network: many transformations
deep_shapes = [(4, 32), (32, 32), (32, 32), (32, 32), (32, 1)]

for shapes in [narrow_shapes, wide_shapes, deep_shapes]:
    params = sum(rows * cols + cols for rows, cols in shapes)
    print(f"Shapes: {shapes}")
    print(f"Total params: {params:,}\n")

# Output:
# Narrow: 16*4+16 + 16*8+8 + 8*1+1 = 201 params
# Wide: 512*4+512 + 256*512+256 + 1*256+1 = 133,889 params
# Deep: each (32,32) layer: 32*32+32 = 1,056, total ~4,257 params
#
# Wide adds capacity via bigger matrices.
# Deep adds capacity via more transformations.
# Modern models (Transformers) do both.`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — BATCHED MATMUL ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Advanced — batched matmul</span>
        <h2 style={S.h2}>Batched matrix multiplication — how Transformers work</h2>

        <p style={S.p}>
          Standard matrix multiplication works on 2D matrices.
          But in deep learning, data is often 3D or 4D — batches of sequences,
          batches of images, multi-head attention.
          NumPy and PyTorch both support batched matmul:
          apply matrix multiplication to every "slice" simultaneously.
        </p>

        <p style={S.p}>
          The attention mechanism in every Transformer uses this extensively.
          When the model processes a sentence of 128 tokens with 12 attention heads,
          it's doing 12 separate matrix multiplications simultaneously —
          one per attention head — using batched matmul on a 3D tensor.
        </p>

        <CodeBlock code={`# Batched matmul: apply matmul across a batch dimension

# Scenario: multi-head attention with 12 heads
# Each head works on queries and keys of shape (seq_len, d_k)
# We process all 12 heads at once with a 3D tensor

batch_size = 32          # 32 sentences in this batch
seq_len    = 128         # each sentence has 128 tokens
num_heads  = 12
d_k        = 64          # dimension per head

# Q and K are 3D: (batch, seq_len, d_k)
Q = np.random.randn(batch_size, seq_len, d_k)
K = np.random.randn(batch_size, seq_len, d_k)

# Attention scores: Q @ K^T for each item in the batch
# K needs to be transposed on the last two dims: (batch, d_k, seq_len)
K_transposed = K.transpose(0, 2, 1)   # (32, 64, 128)

# @ operator applies matmul to the last two dims, broadcast over batch
scores = Q @ K_transposed              # (32, 128, 64) @ (32, 64, 128) → (32, 128, 128)
print(scores.shape)   # (32, 128, 128)

# This is the attention score matrix:
# scores[i, t1, t2] = how much token t1 attends to token t2 in sentence i
# One (128, 128) attention map per sentence, 32 sentences at once

# Scale by sqrt(d_k) to prevent vanishing gradients in softmax
scores = scores / np.sqrt(d_k)

# Softmax to get attention weights (probabilities that sum to 1)
def softmax(x):
    e = np.exp(x - x.max(axis=-1, keepdims=True))  # stable softmax
    return e / e.sum(axis=-1, keepdims=True)

weights = softmax(scores)   # (32, 128, 128) — attention weights
print(f"Attention weights shape: {weights.shape}")
print(f"Row sums (should all be 1.0): {weights[0, 0].sum():.4f}")`} />

        <Callout type="info">
          The line <span style={S.code as React.CSSProperties}>scores = Q @ K_transposed</span> with
          shapes (32, 128, 64) @ (32, 64, 128) → (32, 128, 128) is the
          core of self-attention. Once you see it as a batched matrix multiply,
          attention stops being mysterious. The Transformers module in this track
          builds on exactly this.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 6 — SVD ════════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Going deeper — SVD</span>
        <h2 style={S.h2}>Singular Value Decomposition — every matrix has a hidden structure</h2>

        <p style={S.p}>
          Any matrix can be decomposed into three simpler matrices:
          U, Σ (Sigma), and Vᵀ. This is called Singular Value Decomposition (SVD).
          It's one of the most important operations in all of applied mathematics —
          and it underpins PCA, recommender systems, data compression,
          and the initialisation of weight matrices in neural networks.
        </p>

        <p style={S.p}>
          The decomposition says: any linear transformation (matrix) can be broken
          into three sequential transformations — a rotation, a scaling, and another rotation.
          The scaling factors are called singular values and they reveal
          how much information each "direction" in the data carries.
        </p>

        <VisualBox label="SVD decomposition — A = U Σ Vᵀ">
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
            <Matrix data={[['a','b'],['c','d'],['e','f']]} color="#378ADD" label="A  (m×n)" />
            <span style={{ fontSize: 18, color: 'var(--muted)', paddingTop: 20 }}>=</span>
            <Matrix data={[['·','·'],['·','·'],['·','·']]} color="#7F77DD" label="U  (m×m)" />
            <span style={{ fontSize: 18, color: 'var(--muted)', paddingTop: 20 }}>@</span>
            <Matrix data={[['σ₁','0'],['0','σ₂'],['0','0']]} color="#D85A30" label="Σ  (m×n)" />
            <span style={{ fontSize: 18, color: 'var(--muted)', paddingTop: 20 }}>@</span>
            <Matrix data={[['·','·'],['·','·']]} color="#1D9E75" label="Vᵀ (n×n)" />
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>
            U = left singular vectors (rotates input space) |{' '}
            Σ = singular values on diagonal (scales) |{' '}
            Vᵀ = right singular vectors (rotates output space)
          </div>
        </VisualBox>

        <CodeBlock code={`# SVD in NumPy
A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
              [10, 11, 12]], dtype=float)   # (4, 3)

U, sigma, Vt = np.linalg.svd(A, full_matrices=False)

print(f"U shape:     {U.shape}")       # (4, 3)
print(f"sigma shape: {sigma.shape}")   # (3,)  ← the singular values
print(f"Vt shape:    {Vt.shape}")      # (3, 3)
print(f"Singular values: {sigma.round(2)}")
# [2.54e+01, 1.72e+00, 1.41e-15]
# The third singular value is essentially 0 — this matrix has rank 2!
# It means all information lives in just 2 directions.

# Reconstruct A from SVD (verify it works)
A_reconstructed = U @ np.diag(sigma) @ Vt
print(f"Reconstruction error: {np.abs(A - A_reconstructed).max():.2e}")  # ~1e-14

# ── Low-rank approximation — the key application ─────────────────────
# Keep only the top k singular values, set the rest to 0
# This compresses the matrix while preserving the most important structure

k = 1   # keep only the largest singular value
A_compressed = (
    sigma[0] * np.outer(U[:, 0], Vt[0, :])
)
print(f"Compression error with k=1: {np.abs(A - A_compressed).max():.4f}")
# Very small — because A was already nearly rank-1

# ── Why this matters for ML ────────────────────────────────────────────
# PCA uses SVD to find the k most important directions in your data
# Recommender systems decompose the user-item matrix with SVD
# Weight matrices in neural nets are initialised using SVD principles
# Attention matrices can be compressed using low-rank approximation

# Check: sigma values tell you importance of each direction
total_variance = sigma.sum()
for i, s in enumerate(sigma):
    print(f"Direction {i+1}: {100 * s / total_variance:.1f}% of total variance")`} />

        <h3 style={S.h3}>SVD and PCA — the connection</h3>

        <p style={S.p}>
          PCA (Principal Component Analysis) — which has its own full module
          in this track — is literally SVD applied to a mean-centred dataset.
          When sklearn fits a PCA model, it runs SVD under the hood.
          The "principal components" are the columns of V.
          The "explained variance ratio" comes from squaring the singular values.
          Once you understand SVD, PCA is just a specific application of it.
        </p>

        <CodeBlock code={`# PCA IS SVD — shown directly
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

np.random.seed(42)
X = np.random.randn(100, 4)   # 100 orders, 4 features

# Standardise first (PCA is sensitive to scale)
X_scaled = StandardScaler().fit_transform(X)

# Method 1: sklearn PCA
pca = PCA(n_components=2)
pca.fit(X_scaled)
print("PCA components (sklearn):")
print(pca.components_.round(3))

# Method 2: manual SVD
X_mean = X_scaled - X_scaled.mean(axis=0)
U, sigma, Vt = np.linalg.svd(X_mean, full_matrices=False)
print("\nPCA components (manual SVD — Vt):")
print(Vt[:2].round(3))

# The rows of Vt ARE the principal components.
# Small differences due to sign conventions — the magnitude is identical.
# sklearn PCA = SVD. No magic.`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — SHAPE ERRORS ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every matrix shape error — explained and fixed</h2>

        <p style={S.p}>
          Shape errors are the most common errors in all of deep learning.
          You will hit these constantly. Knowing how to read them and fix them
          in under 30 seconds separates fast learners from frustrated ones.
        </p>

        <ErrorBlock
          error="ValueError: matmul: Input operand 1 has a mismatch in its core dimension 0"
          cause="The inner dimensions don't match. You're trying to multiply (m×n) @ (p×q) where n ≠ p. This is the most common shape error in all of ML."
          fix="Print both shapes: print(A.shape, B.shape). Find the mismatch. Either transpose one matrix (B = B.T) or reshape it (B = B.reshape(n, q)). The rule: left matrix columns must equal right matrix rows."
        />

        <ErrorBlock
          error="ValueError: operands could not be broadcast together with shapes (32,64) (32,)"
          cause="You're adding a bias vector of shape (32,) to an output of shape (32,64). NumPy can't broadcast a (32,) vector along the first axis — it's ambiguous whether the 32 aligns with rows or columns."
          fix="Reshape the bias to (32,1) so broadcasting works: output + bias.reshape(-1,1). Or better: define bias as (64,) — one per neuron, not per sample — then (32,64) + (64,) broadcasts correctly."
        />

        <ErrorBlock
          error="RuntimeError: Expected all tensors to be on the same device (PyTorch)"
          cause="One matrix is on CPU, another is on GPU. Matrix multiplication between CPU and GPU tensors is not allowed — they must be on the same device."
          fix="Move everything to GPU: X = X.to('cuda'), W = W.to('cuda'). Or move everything to CPU: X = X.cpu(), W = W.cpu(). The .device attribute tells you where a tensor lives."
        />

        <ErrorBlock
          error="Result has unexpected shape — correct shapes, wrong answer"
          cause="You used element-wise multiplication (*) instead of matrix multiplication (@). Both are valid operations — NumPy won't warn you — but they produce completely different results."
          fix="Always use @ for matrix multiplication, * only for element-wise. If shapes happen to be compatible for both operations (e.g., same-size square matrices), a silent wrong answer is the result. Print and check: print((A @ B).shape) vs print((A * B).shape)."
        />

        <ErrorBlock
          error="numpy.linalg.LinAlgError: Singular matrix"
          cause="You're trying to invert a matrix that has no inverse (determinant = 0). In ML this happens when features are perfectly correlated — one column is a linear combination of others."
          fix="Use the pseudoinverse instead: np.linalg.pinv(A) instead of np.linalg.inv(A). Or diagnose the data: compute the rank with np.linalg.matrix_rank(A) and remove redundant features."
        />

        <Callout type="tip">
          Build this debugging habit permanently: before any matrix operation,
          print both shapes. After the operation, print the result shape.
          One line per operation during development. Remove when confident.
          This habit prevents 90% of shape bugs before they happen.
        </Callout>

        <CodeBlock code={`# The debugging template — use this every time shapes behave unexpectedly
def matmul_debug(A, B, name=""):
    print(f"{'─'*40}")
    if name: print(f"Operation: {name}")
    print(f"  A shape: {A.shape}  dtype: {A.dtype}")
    print(f"  B shape: {B.shape}  dtype: {B.dtype}")

    if A.ndim >= 2 and B.ndim >= 2:
        if A.shape[-1] != B.shape[-2]:
            print(f"  ✗ SHAPE MISMATCH: A cols ({A.shape[-1]}) ≠ B rows ({B.shape[-2]})")
            print(f"  Try: B = B.T  → B.T shape would be {B.T.shape}")
            return None

    result = A @ B
    print(f"  ✓ Result shape: {result.shape}")
    return result

# Usage
X = np.random.randn(32, 4)
W = np.random.randn(4, 64)
out = matmul_debug(X, W, "Input layer")   # ✓ Result shape: (32, 64)

W_wrong = np.random.randn(64, 4)
out = matmul_debug(X, W_wrong, "Wrong weight shape")  # ✗ SHAPE MISMATCH`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — EFFICIENCY ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Performance</span>
        <h2 style={S.h2}>Why GPUs exist — and what vectorisation means</h2>

        <p style={S.p}>
          A naive matrix multiplication with two loops runs at roughly
          one multiplication per clock cycle. Multiplying two (1000×1000) matrices
          requires 1 billion multiply-add operations. At 1 billion per second
          (1 GHz), that's one second per multiplication — far too slow for training.
        </p>

        <p style={S.p}>
          GPUs have thousands of small cores that can each do one multiplication
          simultaneously. A modern GPU can do trillions of multiplications per second.
          That's why the same matrix multiply that takes 1 second on a CPU
          takes 0.1 milliseconds on a GPU.
          Deep learning didn't become practical because of better algorithms —
          it became practical because GPUs could do matrix multiplication at scale.
        </p>

        <CodeBlock code={`import time

# Compare: Python loop vs NumPy vs (conceptually) GPU

n = 1000
A = np.random.randn(n, n)
B = np.random.randn(n, n)

# Method 1: Pure Python loop — NEVER DO THIS
def naive_matmul(A, B):
    m, k = A.shape
    _, n = B.shape
    result = np.zeros((m, n))
    for i in range(m):
        for j in range(n):
            for p in range(k):
                result[i, j] += A[i, p] * B[p, j]
    return result

# Method 2: NumPy — uses BLAS, highly optimised C under the hood
t0 = time.time()
result_numpy = A @ B
numpy_time = time.time() - t0
print(f"NumPy:  {numpy_time*1000:.1f}ms")

# For n=100 the naive loop takes ~10 seconds.
# NumPy takes ~0.1ms. That's a 100,000× speedup.
# A GPU would take ~0.001ms — another 100× faster.

# The rule: NEVER loop over matrix elements in Python.
# Always express operations as NumPy vectorised operations.
# The difference is not 2× or 10× — it is 100,000×.

# Vectorisation means: express the operation as array operations
# so the CPU/GPU can execute them in parallel using SIMD instructions.

# Wrong (loop)
manual_row_sums = np.array([A[i].sum() for i in range(len(A))])

# Right (vectorised)
vectorised_row_sums = A.sum(axis=1)

print(np.allclose(manual_row_sums, vectorised_row_sums))  # True
# Both give the same answer. The vectorised version is ~1000× faster.`} />

        <HBox color="#1D9E75">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              The practical rule:{' '}
            </span>
            if you find yourself writing a for loop over rows or columns
            of a NumPy array, stop. There is almost certainly a vectorised
            operation that does the same thing. The entire skill of
            "writing efficient ML code" is learning to express computations
            as matrix operations instead of loops. This track shows you
            how to do that at every step.
          </p>
        </HBox>
      </div>

      <Div />

      {/* ══ SECTION 9 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>You now understand the engine of every neural network.</h2>

        <p style={S.p}>
          Matrix multiplication is the operation. Linear transformation is the meaning.
          The weight matrix is the thing being learned. Gradient descent updates
          those weights. That's the complete loop of machine learning —
          and you now understand two of the four parts deeply.
        </p>

        <p style={S.p}>
          The next module covers derivatives and gradients —
          the mechanism that tells gradient descent <em>which direction</em>
          to move the weights. Once you have matmul and gradients,
          backpropagation (how neural networks train) becomes completely obvious.
          No magic. Just chain rule applied to matrix multiplications.
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
              Next — Module 05
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Derivatives, Gradients and the Chain Rule
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              The mathematical engine behind backpropagation —
              explained visually before a single formula appears.
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
          'Matrix multiplication is not element-wise — it is row × column dot products. Each element of the result is a dot product of one row from the left matrix and one column from the right matrix.',
          'Shape rule: (m × n) @ (n × p) → (m × p). Inner dimensions must match. The result takes the outer dimensions. If they don\'t match, print shapes and transpose.',
          'A linear transformation changes the direction or dimension of data without curving it. Matrix multiplication IS a linear transformation.',
          'One neural network layer = X @ W + b followed by an activation. The weight matrix W starts random and is updated by gradient descent during training.',
          'Stacking linear layers without activation functions collapses to a single linear transformation — no matter how many layers you add. Non-linear activations (ReLU, GELU) are what give depth its power.',
          'SVD decomposes any matrix into U Σ Vᵀ — three simpler transformations. The singular values reveal how much information each direction carries. PCA is SVD applied to centred data.',
          'Never loop over matrix elements in Python. Vectorised NumPy operations using @ are 100,000× faster. The entire skill of efficient ML code is expressing computation as matrix operations.',
        ]}
      />
    </LearnLayout>
  )
}