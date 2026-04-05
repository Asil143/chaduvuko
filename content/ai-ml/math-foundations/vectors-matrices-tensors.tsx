import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Vectors, Matrices and Tensors — Chaduvuko',
  description:
    'The language every ML algorithm speaks. From a single number to multi-dimensional arrays — visual intuition first, formula second.',
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

function CodeBlock({ code }: { code: string }) {
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
          python
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
      <div style={{ padding: '16px 20px', background: 'var(--bg2)' }}>
        {children}
      </div>
    </div>
  )
}

function MatrixGrid({ data, color = '#378ADD', label }: { data: string[][]; color?: string; label?: string }) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
      {label && (
        <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
          {label}
        </span>
      )}
      <div style={{
        border: `2px solid ${color}60`, borderRadius: 6,
        padding: '8px 12px', background: `${color}08`,
      }}>
        {data.map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < data.length - 1 ? 6 : 0 }}>
            {row.map((cell, j) => (
              <span key={j} style={{
                fontSize: 14, fontFamily: 'var(--font-mono)',
                color: 'var(--text)', minWidth: 24, textAlign: 'center' as const,
              }}>
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function VectorsMatricesTensorsPage() {
  return (
    <LearnLayout
      title="Vectors, Matrices and Tensors"
      description="The language every ML algorithm speaks. From a single number to multi-dimensional arrays — visual intuition first, formula second."
      section="Math Foundations"
      readTime="35–40 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section='math-foundations' topic='vectors-matrices-tensors' />

      {/* ══ SECTION 1 — WHY THIS MATTERS ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Why you need this</span>
        <h2 style={S.h2}>Every ML algorithm is secretly just matrix math.</h2>

        <p style={S.p}>
          When you call <span style={S.code as React.CSSProperties}>model.fit(X_train, y_train)</span> in
          scikit-learn, what happens inside? The algorithm multiplies matrices,
          adds vectors, and adjusts numbers. When a neural network processes
          an image, it converts the pixels into a matrix and multiplies it
          through dozens of layers. When an LLM reads your prompt, it converts
          every word into a vector of 768 or 4096 numbers.
        </p>

        <p style={S.p}>
          You don't need to do this math by hand. NumPy and PyTorch do it for you.
          But if you don't understand <em>what</em> a matrix multiplication produces
          and <em>why</em> it's useful, you'll hit errors you can't debug, make
          architecture decisions you can't explain, and hit a ceiling you
          can't break through.
        </p>

        <HBox color="#7F77DD">
          <p style={{ ...S.p, marginBottom: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              This page teaches three things:{' '}
            </span>
            what scalars, vectors, matrices, and tensors are (with pictures),
            what the key operations do and why ML needs them,
            and how to work with them in NumPy — the library all of ML is built on.
          </p>
        </HBox>

        <Callout type="tip">
          Read each visual before reading the explanation. The picture does
          most of the work. The words just confirm what you already understood.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — THE HIERARCHY ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The data hierarchy</span>
        <h2 style={S.h2}>From one number to billions — four levels</h2>

        <p style={S.p}>
          There are four levels of data structure in ML.
          Each one is just the previous one extended into another dimension.
          Once you understand this hierarchy, tensors stop being scary.
        </p>

        {/* Visual hierarchy */}
        <VisualBox label="The four levels — visualised">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>

            {/* Scalar */}
            <div style={{ textAlign: 'center' as const }}>
              <div style={{
                width: 48, height: 48, borderRadius: 8,
                background: 'rgba(127,119,221,0.12)',
                border: '2px solid rgba(127,119,221,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontFamily: 'var(--font-mono)',
                color: '#7F77DD', fontWeight: 700,
                margin: '0 auto 8px',
              }}>
                7
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#7F77DD', fontFamily: 'var(--font-mono)' }}>
                Scalar
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>0D · one number</div>
            </div>

            {/* Vector */}
            <div style={{ textAlign: 'center' as const }}>
              <div style={{
                display: 'flex', flexDirection: 'column', gap: 3,
                alignItems: 'center', marginBottom: 8,
              }}>
                {['3', '1', '4', '1'].map((n, i) => (
                  <div key={i} style={{
                    width: 36, height: 24, borderRadius: 4,
                    background: 'rgba(55,138,221,0.1)',
                    border: '1.5px solid rgba(55,138,221,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontFamily: 'var(--font-mono)',
                    color: '#378ADD', fontWeight: 600,
                  }}>
                    {n}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#378ADD', fontFamily: 'var(--font-mono)' }}>
                Vector
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>1D · list of numbers</div>
            </div>

            {/* Matrix */}
            <div style={{ textAlign: 'center' as const }}>
              <div style={{ marginBottom: 8 }}>
                <MatrixGrid data={[['1','0','2'],['3','1','4'],['0','2','1']]} color="#1D9E75" />
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)' }}>
                Matrix
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>2D · grid of numbers</div>
            </div>

            {/* Tensor */}
            <div style={{ textAlign: 'center' as const }}>
              <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 8px' }}>
                {[2, 1, 0].map((offset) => (
                  <div key={offset} style={{
                    position: 'absolute',
                    top: offset * 8,
                    left: offset * 8,
                    width: 56, height: 56,
                    borderRadius: 6,
                    background: `rgba(216,90,48,${0.06 + offset * 0.04})`,
                    border: '1.5px solid rgba(216,90,48,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {offset === 0 && (
                      <div style={{
                        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3,
                      }}>
                        {['1','0','2','3'].map((n, i) => (
                          <span key={i} style={{
                            fontSize: 11, fontFamily: 'var(--font-mono)',
                            color: '#D85A30', fontWeight: 600, textAlign: 'center' as const,
                          }}>
                            {n}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#D85A30', fontFamily: 'var(--font-mono)' }}>
                Tensor
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>3D+ · stacked matrices</div>
            </div>
          </div>
        </VisualBox>

        {/* Scalar */}
        <h3 style={S.h3}>Scalar — just one number</h3>
        <p style={S.p}>
          A scalar is a single value. No direction, no structure.
          In ML, scalars show up as: a loss value (0.34),
          a learning rate (0.001), a single prediction (37.8 minutes),
          a model accuracy (0.92).
        </p>
        <CodeBlock code={`import numpy as np

# A scalar is just a regular Python number
loss = 0.34
learning_rate = 0.001
accuracy = 0.92

# Or a 0-dimensional NumPy array
scalar = np.array(7)
print(scalar.shape)   # ()  ← empty shape, no dimensions
print(scalar.ndim)    # 0`} />

        {/* Vector */}
        <h3 style={S.h3}>Vector — a list of numbers with meaning</h3>
        <p style={S.p}>
          A vector is a 1D array of numbers. In ML, every single data point
          is a vector. A Swiggy order with 4 features —
          distance, time of day, restaurant prep time, traffic score —
          is a vector of 4 numbers: <span style={S.code as React.CSSProperties}>[3.2, 2, 15, 7]</span>.
        </p>

        <p style={S.p}>
          A word in an LLM is also a vector — called an embedding.
          The word "king" might be represented as a vector of 768 numbers.
          Those numbers encode meaning — words with similar meanings
          have vectors that point in similar directions in space.
        </p>

        <VisualBox label="One Swiggy order as a vector">
          <div style={{ display: 'flex', gap: 0, alignItems: 'stretch', flexWrap: 'wrap' }}>
            {[
              { val: '3.2', label: 'distance_km', color: '#378ADD' },
              { val: '2',   label: 'time_of_day',  color: '#1D9E75' },
              { val: '15',  label: 'prep_time',    color: '#BA7517' },
              { val: '7',   label: 'traffic',      color: '#D85A30' },
            ].map((cell, i, arr) => (
              <div key={cell.label} style={{
                flex: 1, minWidth: 70,
                borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{
                  padding: '10px 12px', textAlign: 'center' as const,
                  background: `${cell.color}10`,
                  borderBottom: '1px solid var(--border)',
                  fontSize: 18, fontWeight: 700,
                  fontFamily: 'var(--font-mono)', color: cell.color,
                }}>
                  {cell.val}
                </div>
                <div style={{
                  padding: '6px 8px', textAlign: 'center' as const,
                  fontSize: 10, color: 'var(--muted)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {cell.label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            order = np.array([3.2, 2, 15, 7])  ← shape: (4,)
          </div>
        </VisualBox>

        <CodeBlock code={`# One order = one vector
order = np.array([3.2, 2, 15, 7])
print(order.shape)   # (4,)  ← 4 features, 1 dimension
print(order.ndim)    # 1
print(order[0])      # 3.2   ← first feature (distance)

# Vector arithmetic — works element-by-element
order_a = np.array([3.2, 2, 15, 7])
order_b = np.array([1.1, 3, 10, 5])

diff = order_a - order_b
print(diff)   # [2.1, -1, 5, 2]  ← difference for each feature

# Scalar × vector — every element multiplied by the scalar
scaled = 2 * order_a
print(scaled)  # [6.4, 4, 30, 14]`} />

        {/* Matrix */}
        <h3 style={S.h3}>Matrix — your entire dataset in one object</h3>
        <p style={S.p}>
          A matrix is a 2D array — rows and columns.
          In ML, your training data is a matrix.
          Each <strong>row</strong> is one example (one order).
          Each <strong>column</strong> is one feature (distance, time, etc.).
          1,000 orders with 4 features → a matrix with shape <span style={S.code as React.CSSProperties}>(1000, 4)</span>.
        </p>

        <VisualBox label="1000 Swiggy orders → a (1000, 4) matrix">
          <div style={{ overflowX: 'auto' as const }}>
            <div style={{ minWidth: 420 }}>
              {/* Header */}
              <div style={{
                display: 'grid', gridTemplateColumns: '50px repeat(4, 1fr)',
                gap: 0, marginBottom: 2,
              }}>
                <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', padding: '4px 8px' }} />
                {['distance_km', 'time_of_day', 'prep_time', 'traffic'].map((h) => (
                  <div key={h} style={{
                    fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                    fontFamily: 'var(--font-mono)', padding: '4px 8px',
                    textAlign: 'center' as const,
                  }}>
                    {h}
                  </div>
                ))}
              </div>
              {/* Rows */}
              {[
                ['row 0', '3.2', '2', '15', '7'],
                ['row 1', '1.1', '3', '10', '5'],
                ['row 2', '5.8', '1', '20', '9'],
                ['  ·', '·', '·', '·', '·'],
                ['  ·', '·', '·', '·', '·'],
                ['row 999', '2.4', '4', '12', '6'],
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '50px repeat(4, 1fr)',
                  background: i % 2 === 0 ? 'rgba(55,138,221,0.04)' : 'transparent',
                  borderRadius: 4, marginBottom: 1,
                }}>
                  <div style={{
                    fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)',
                    padding: '5px 8px',
                  }}>
                    {row[0]}
                  </div>
                  {row.slice(1).map((cell, j) => (
                    <div key={j} style={{
                      fontSize: 13, fontFamily: 'var(--font-mono)',
                      color: 'var(--text)', padding: '5px 8px',
                      textAlign: 'center' as const,
                    }}>
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
              <div style={{
                marginTop: 8, fontSize: 12, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)',
              }}>
                X.shape = (1000, 4)  ← 1000 rows × 4 columns
              </div>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`# Build the feature matrix
np.random.seed(42)
n = 1000

X = np.column_stack([
    np.random.uniform(0.5, 8.0, n),   # distance_km
    np.random.randint(1, 5, n),        # time_of_day
    np.random.uniform(5, 25, n),       # prep_time
    np.random.uniform(1, 10, n),       # traffic
])

print(X.shape)    # (1000, 4)  ← rows × columns
print(X.ndim)     # 2

# Indexing
print(X[0])       # first order  → [3.74, 1, 21.4, 3.7]
print(X[0, 0])    # first order, first feature → 3.74
print(X[:, 0])    # ALL orders, first feature (distance column) → shape (1000,)
print(X[:5, :])   # first 5 orders, all features → shape (5, 4)

# Shape tells you: (rows, columns)
rows, cols = X.shape
print(f"{rows} orders, {cols} features each")`} />

        {/* Tensor */}
        <h3 style={S.h3}>Tensor — matrices stacked into higher dimensions</h3>
        <p style={S.p}>
          A tensor is the general term for arrays with any number of dimensions.
          A scalar is a 0D tensor. A vector is a 1D tensor.
          A matrix is a 2D tensor. Beyond 2D, people usually just say "tensor."
        </p>

        <p style={S.p}>
          The most common 3D tensor in ML is a batch of images.
          A single colour image is a 2D grid of pixels — but it has 3 colour channels
          (Red, Green, Blue). So one image is a 3D tensor: height × width × channels.
          A <em>batch</em> of 32 images adds another dimension:
          <span style={S.code as React.CSSProperties}> (32, 224, 224, 3)</span>.
        </p>

        <VisualBox label="Image as a tensor — shape (height, width, channels)">
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {[
                { label: 'R', color: '#D85A30' },
                { label: 'G', color: '#1D9E75' },
                { label: 'B', color: '#378ADD' },
              ].map((ch) => (
                <div key={ch.label} style={{ textAlign: 'center' as const }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 6,
                    background: `${ch.color}15`,
                    border: `2px solid ${ch.color}50`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, fontWeight: 700, color: ch.color,
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {ch.label}
                  </div>
                  <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
                    224×224
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>→</div>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)',
                marginBottom: 4,
              }}>
                image.shape = (224, 224, 3)
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                height × width × colour channels
              </div>
              <div style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)' }}>
                batch.shape = (32, 224, 224, 3)
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                32 images in one training batch
              </div>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`# 3D tensor — one RGB image (224×224 pixels, 3 colour channels)
image = np.random.randint(0, 256, size=(224, 224, 3))
print(image.shape)   # (224, 224, 3)
print(image.ndim)    # 3

# 4D tensor — batch of 32 images
batch = np.random.randint(0, 256, size=(32, 224, 224, 3))
print(batch.shape)   # (32, 224, 224, 3)

# The shape tells the whole story:
# (batch_size, height, width, channels)
#  32          224     224    3

# In PyTorch, channels come SECOND: (batch, channels, height, width)
# batch_pytorch = np.random.randn(32, 3, 224, 224)
# This is a common source of shape errors when switching between libraries.`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — KEY OPERATIONS ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The operations</span>
        <h2 style={S.h2}>Four operations ML uses constantly</h2>

        <p style={S.p}>
          You don't need all of linear algebra. ML uses the same four operations
          over and over. Understanding these four deeply is enough to follow
          any ML paper, debug any shape error, and understand how data
          flows through a neural network.
        </p>

        {/* Op 1 — Dot product */}
        <h3 style={S.h3}>1. Dot product — the similarity measure</h3>

        <p style={S.p}>
          The dot product takes two vectors of the same length and returns
          a single number. Multiply the matching elements, then add everything up.
          That number measures how much the two vectors "point in the same direction."
        </p>

        <p style={S.p}>
          This is exactly how a neural network neuron works — it takes all your
          input features, multiplies each one by a learned weight, and adds
          everything up. One dot product = one neuron's output.
        </p>

        <VisualBox label="Dot product — step by step">
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <MatrixGrid data={[['3'],['1'],['4'],['2']]} color="#378ADD" label="features" />
            <span style={{ fontSize: 20, color: 'var(--muted)' }}>·</span>
            <MatrixGrid data={[['0.5'],['0.3'],['0.8'],['0.2']]} color="#1D9E75" label="weights" />
            <span style={{ fontSize: 16, color: 'var(--muted)' }}>=</span>
            <div style={{ textAlign: 'center' as const }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                result
              </div>
              <div style={{
                width: 56, height: 56, borderRadius: 8,
                background: 'rgba(216,90,48,0.12)',
                border: '2px solid rgba(216,90,48,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 700,
                fontFamily: 'var(--font-mono)', color: '#D85A30',
              }}>
                5.7
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.9 }}>
              3×0.5 = 1.5<br />
              1×0.3 = 0.3<br />
              4×0.8 = 3.2<br />
              2×0.2 = 0.4<br />
              ──────────<br />
              sum  = 5.4
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`features = np.array([3, 1, 4, 2])
weights  = np.array([0.5, 0.3, 0.8, 0.2])

# Method 1: np.dot()
result = np.dot(features, weights)
print(result)   # 5.4

# Method 2: @ operator (preferred in modern code)
result = features @ weights
print(result)   # 5.4

# This is literally what one neuron does:
# multiply each input by its weight, sum everything up
# then add a bias term: output = dot(features, weights) + bias`} />

        {/* Op 2 — Matrix multiplication */}
        <h3 style={S.h3}>2. Matrix multiplication — the core of neural networks</h3>

        <p style={S.p}>
          When you multiply two matrices, you're doing many dot products at once.
          Each row of the first matrix dots with each column of the second.
          This is how a neural network layer transforms all your training
          examples simultaneously in one shot.
        </p>

        <p style={S.p}>
          The shape rule is the most important thing to memorise here:
          to multiply matrix A (shape m×n) by matrix B (shape n×p),
          the inner dimensions must match (both n),
          and the result has shape (m×p).
        </p>

        <VisualBox label="Shape rule for matrix multiplication">
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' as const }}>
              <div style={{
                padding: '8px 16px', borderRadius: 6,
                background: 'rgba(55,138,221,0.1)',
                border: '1.5px solid rgba(55,138,221,0.4)',
                fontSize: 15, fontFamily: 'var(--font-mono)',
                color: '#378ADD', fontWeight: 700,
              }}>
                (1000 × 4)
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 5 }}>X — training data</div>
            </div>

            <span style={{ fontSize: 18, color: 'var(--muted)' }}>@</span>

            <div style={{ textAlign: 'center' as const }}>
              <div style={{
                padding: '8px 16px', borderRadius: 6,
                background: 'rgba(29,158,117,0.1)',
                border: '1.5px solid rgba(29,158,117,0.4)',
                fontSize: 15, fontFamily: 'var(--font-mono)',
                color: '#1D9E75', fontWeight: 700,
              }}>
                (4 × 64)
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 5 }}>W — weight matrix</div>
            </div>

            <span style={{ fontSize: 16, color: 'var(--muted)' }}>=</span>

            <div style={{ textAlign: 'center' as const }}>
              <div style={{
                padding: '8px 16px', borderRadius: 6,
                background: 'rgba(216,90,48,0.1)',
                border: '1.5px solid rgba(216,90,48,0.4)',
                fontSize: 15, fontFamily: 'var(--font-mono)',
                color: '#D85A30', fontWeight: 700,
              }}>
                (1000 × 64)
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 5 }}>output</div>
            </div>
          </div>

          <div style={{
            marginTop: 12, fontSize: 12, color: 'var(--muted)', lineHeight: 1.7,
          }}>
            Inner dimensions must match (both 4). Result takes the outer dimensions (1000 × 64).
            In plain English: 1000 orders each processed by 64 neurons = 1000 outputs of size 64.
          </div>
        </VisualBox>

        <CodeBlock code={`# 1000 training examples, 4 features each
X = np.random.randn(1000, 4)   # shape (1000, 4)

# Weight matrix for a layer with 64 neurons
W = np.random.randn(4, 64)     # shape (4, 64)
b = np.random.randn(64)        # bias for each neuron

# One matrix multiply = entire layer's output for ALL examples at once
output = X @ W + b
print(output.shape)   # (1000, 64)

# Shape rule check: (1000, 4) @ (4, 64) → inner dims match → (1000, 64) ✓

# The most common error in all of deep learning:
# X.shape = (1000, 4), W.shape = (64, 4)  ← WRONG ORDER
# output = X @ W  → ValueError: matmul dimensions don't match
# Fix: W = W.T   ← transpose W to (4, 64) then it works`} />

        {/* Op 3 — Transpose */}
        <h3 style={S.h3}>3. Transpose — flip rows and columns</h3>

        <p style={S.p}>
          The transpose of a matrix flips it diagonally — rows become columns,
          columns become rows. Shape (m×n) becomes (n×m). You'll use this
          constantly to fix shape errors.
        </p>

        <CodeBlock code={`A = np.array([[1, 2, 3],
              [4, 5, 6]])
print(A.shape)    # (2, 3)

AT = A.T           # or np.transpose(A)
print(AT.shape)   # (3, 2)

print(AT)
# [[1, 4],
#  [2, 5],
#  [3, 6]]

# Real use: fixing shape mismatches
# If model expects (batch, features) but you have (features, batch):
X_fixed = X.T    # flip it`} />

        {/* Op 4 — Broadcasting */}
        <h3 style={S.h3}>4. Broadcasting — apply an operation without repeating yourself</h3>

        <p style={S.p}>
          Broadcasting lets NumPy apply an operation between arrays of different
          shapes without creating copies. The smaller array is conceptually
          "stretched" to match the larger one.
        </p>

        <p style={S.p}>
          In ML, you use this every time you normalise a dataset — you subtract
          the mean and divide by the standard deviation across 1,000 rows
          using just one line.
        </p>

        <CodeBlock code={`# Normalise 1000 orders: subtract mean, divide by std
X = np.random.randn(1000, 4)   # 1000 orders, 4 features

mean = X.mean(axis=0)   # shape (4,)  ← one mean per feature column
std  = X.std(axis=0)    # shape (4,)

# Broadcasting: (1000,4) - (4,) works automatically
# NumPy treats (4,) as if it were (1,4) then tiles it 1000 times
X_norm = (X - mean) / std
print(X_norm.shape)        # (1000, 4)  ← same shape, now normalised
print(X_norm.mean(axis=0)) # [~0, ~0, ~0, ~0] ← means now near zero
print(X_norm.std(axis=0))  # [~1, ~1, ~1, ~1] ← stds now near one

# Without broadcasting you'd need:
# mean_matrix = np.tile(mean, (1000, 1))  ← wasteful copy`} />

        <Callout type="warning">
          Broadcasting is powerful but causes silent bugs when shapes are
          accidentally compatible. Always print shapes when something looks
          wrong — <span style={S.code as React.CSSProperties}>print(array.shape)</span> is the
          most useful debugging line in all of NumPy.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 4 — SHAPES IN ML ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Shapes in practice</span>
        <h2 style={S.h2}>The shape cheatsheet — what every array means</h2>

        <p style={S.p}>
          In ML, shapes carry meaning. Once you know the convention,
          reading a shape like <span style={S.code as React.CSSProperties}>(32, 3, 224, 224)</span> immediately
          tells you: 32 images in the batch, 3 colour channels, 224×224 pixels.
          Here's the full reference.
        </p>

        <div style={{
          border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 24,
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '180px 1fr 1fr',
            background: 'var(--surface)', borderBottom: '1px solid var(--border)',
            padding: '9px 14px',
          }}>
            {['Shape', 'What it represents', 'Real example'].map((h) => (
              <span key={h} style={{
                fontSize: 11, fontWeight: 700, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)',
              }}>
                {h}
              </span>
            ))}
          </div>
          {[
            ['()',           'Scalar — single number',              'loss = 0.34'],
            ['(n,)',         '1D vector — n values',                'one_order = (4,)'],
            ['(m, n)',       '2D matrix — m rows, n cols',          'X_train = (800, 4)'],
            ['(batch, n)',   'Batch of vectors',                    'X_batch = (32, 128)'],
            ['(H, W, C)',    'Image — height × width × channels',   'image = (224, 224, 3)'],
            ['(B, H, W, C)', 'Batch of images',                     'batch = (32, 224, 224, 3)'],
            ['(seq, d)',     'Sequence of token embeddings',         'sentence = (128, 768)'],
            ['(B, seq, d)',  'Batch of token sequences',             'batch = (32, 128, 768)'],
          ].map((row, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '180px 1fr 1fr',
              padding: '9px 14px',
              borderBottom: i < 7 ? '1px solid var(--border)' : 'none',
              background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
            }}>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
                {row[0]}
              </span>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>{row[1]}</span>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                {row[2]}
              </span>
            </div>
          ))}
        </div>

        <HBox color="#7F77DD">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              The most important debugging habit:{' '}
            </span>
            whenever you get a shape error or unexpected result,
            immediately print the shape of every array involved.
            90% of ML bugs come down to a wrong shape somewhere in the pipeline.
          </p>
        </HBox>
      </div>

      <Div />

      {/* ══ SECTION 5 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>You can now read ML code without getting lost.</h2>

        <p style={S.p}>
          Every time you see an ML model being built — a layer in PyTorch,
          a fit call in sklearn, an attention mechanism in a Transformer —
          you now understand the underlying structure.
          Data is stored in arrays. Arrays have shapes.
          Layers multiply matrices. Outputs are also matrices.
        </p>

        <p style={S.p}>
          The next module takes this one step further — matrix multiplication
          and linear transformations. You'll see exactly how data changes shape
          as it flows through a neural network layer, and why the choice of
          matrix dimensions determines what a layer can learn.
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
              Next — Module 04
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Matrix Multiplication and Linear Transformations
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              How a neural network layer transforms your data — visualised step by step.
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
          'Scalar = one number. Vector = list of numbers. Matrix = 2D grid. Tensor = any N-dimensional array. They are nested — each is the previous extended by one dimension.',
          'In ML: one data point = one vector. Your entire dataset = a matrix. A batch of images = a 4D tensor (batch, height, width, channels).',
          'Dot product: multiply matching elements and sum — this is exactly what one neuron does. np.dot(features, weights) or features @ weights.',
          'Matrix multiply shape rule: (m × n) @ (n × p) → (m × p). Inner dimensions must match. If they don\'t, you have a shape error — transpose one of the matrices.',
          'Broadcasting lets you subtract a mean vector of shape (4,) from a matrix of shape (1000, 4) without a loop. NumPy stretches the smaller array automatically.',
          'The one debugging habit: print(array.shape) immediately when something is wrong. 90% of ML bugs are shape mismatches.',
        ]}
      />
    </LearnLayout>
  )
}