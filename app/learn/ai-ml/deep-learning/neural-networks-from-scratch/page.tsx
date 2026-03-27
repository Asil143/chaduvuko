import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Neural Networks from Scratch — Chaduvuko',
  description:
    'Forward pass, backpropagation, and gradient descent built in NumPy before touching PyTorch. The foundation every deep learning framework is built on.',
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

function ConceptBox({ title, children, color = '#7b61ff' }: {
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

function StepBox({ num, title, children, color = '#7b61ff' }: {
  num: number; title: string; children: React.ReactNode; color?: string
}) {
  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'flex-start' }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
        background: `${color}15`,
        border: `1.5px solid ${color}50`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, fontWeight: 900, color,
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

export default function NeuralNetworksFromScratchPage() {
  return (
    <LearnLayout
      title="Neural Networks from Scratch"
      description="Forward pass, backpropagation, and gradient descent built in NumPy before touching PyTorch. The foundation every deep learning framework is built on."
      section="Deep Learning"
      readTime="40–45 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="deep-learning" topic="neural-networks-from-scratch" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — what problem does a neural network solve?</span>
        <h2 style={S.h2}>
          Every algorithm in Section 5 required you to hand-craft features.
          A neural network learns its own features directly from raw data.
          That is the entire revolution.
        </h2>

        <p style={S.p}>
          When Swiggy wants to predict delivery time, you manually build features:
          distance, traffic score, restaurant prep time, time of day.
          You encode your domain knowledge into numbers. The model learns
          relationships between those numbers and the target.
          The quality of your model is bounded by the quality of your features.
        </p>

        <p style={S.p}>
          Now imagine Swiggy wants to detect damaged packaging from a photo.
          What features do you hand-craft from an image? Pixel brightness?
          Edge patterns? Colour distributions? You do not know which pixel
          combinations indicate damage. A neural network does not need you to know.
          It learns the relevant features — edges, shapes, textures —
          directly from thousands of labelled photos. The layers of a network
          are a hierarchy of learned feature detectors, going from
          raw pixels to abstract concepts without any human guidance.
        </p>

        <p style={S.p}>
          This module builds a neural network from scratch in NumPy —
          no PyTorch, no TensorFlow. Every operation is explicit.
          You will understand exactly what a forward pass does,
          what backpropagation computes, and why gradient descent works.
          After this module, PyTorch becomes obvious — it automates
          exactly what you will code by hand here.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Imagine teaching a child to recognise cats. You could write down
            rules: "furry, four legs, pointed ears, whiskers." That is classical ML —
            hand-crafted features. Or you could show the child 10,000 photos
            of cats and non-cats and let them figure out the pattern themselves.
            They learn features you never named — the specific curve of an ear,
            the texture of fur, the shape of eyes. That is a neural network.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The child's brain adjusts internal connections after each photo —
            strengthening what was right, weakening what was wrong.
            A neural network does exactly this: adjust weights after each
            prediction based on how wrong it was. That adjustment process
            is backpropagation. The rule for how much to adjust is gradient descent.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          Read Module 07 (Derivatives and Gradients) before this one.
          Backpropagation is the chain rule applied to nested functions.
          If derivatives feel unfamiliar, the "why" of backpropagation
          will be unclear even if the code makes sense.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — THE NEURON ══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The building block</span>
        <h2 style={S.h2}>One neuron — weighted sum plus activation</h2>

        <p style={S.p}>
          A single neuron does two things. First it computes a weighted sum
          of its inputs — each input multiplied by a weight, all added together,
          plus a bias term. Then it applies an activation function to that sum —
          a non-linear transformation that lets the network learn non-linear patterns.
          Without activation functions, stacking many neurons would still only
          produce a linear model.
        </p>

        <VisualBox label="One neuron — the computation in full">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* Diagram */}
            <svg width="100%" viewBox="0 0 520 160">
              {/* Input nodes */}
              {[
                ['x₁ = 5.2km', 60],
                ['x₂ = 8 (traffic)', 90],
                ['x₃ = 22min', 120],
              ].map(([label, y], i) => (
                <g key={i}>
                  <circle cx="60" cy={y as number} r="18"
                    fill="rgba(55,138,221,0.15)" stroke="#378ADD" strokeWidth="1.5" />
                  <text x="60" cy={y as number} textAnchor="middle"
                    fontSize="7" fill="#378ADD" fontFamily="monospace" y={(y as number) + 3}>
                    {(label as string).split(' ')[0]}
                  </text>
                  <text x="85" y={(y as number) + 4} fontSize="8"
                    fill="#888" fontFamily="monospace">{label}</text>
                  {/* Connection line */}
                  <line x1="78" y1={y as number} x2="248" y2="90"
                    stroke="#555" strokeWidth="1" />
                </g>
              ))}
              {/* Weights on lines */}
              {[['w₁=0.7', 60], ['w₂=0.2', 90], ['w₃=0.4', 120]].map(([w, y], i) => (
                <text key={i} x="160" y={(y as number) - 4 + (90 - (y as number)) * 0.3}
                  fontSize="9" fill="#D85A30" fontFamily="monospace">{w}</text>
              ))}
              {/* Neuron circle */}
              <circle cx="280" cy="90" r="32"
                fill="rgba(123,97,255,0.15)" stroke="#7b61ff" strokeWidth="2" />
              <text x="280" y="85" textAnchor="middle" fontSize="9"
                fill="#7b61ff" fontFamily="monospace">z = Σwᵢxᵢ+b</text>
              <text x="280" y="99" textAnchor="middle" fontSize="9"
                fill="#7b61ff" fontFamily="monospace">a = σ(z)</text>
              {/* Bias */}
              <text x="280" y="135" textAnchor="middle" fontSize="9"
                fill="#888" fontFamily="monospace">b = -0.5 (bias)</text>
              {/* Output line */}
              <line x1="312" y1="90" x2="420" y2="90"
                stroke="#1D9E75" strokeWidth="2" />
              {/* Output */}
              <circle cx="440" cy="90" r="22"
                fill="rgba(29,158,117,0.15)" stroke="#1D9E75" strokeWidth="1.5" />
              <text x="440" y="87" textAnchor="middle" fontSize="9"
                fill="#1D9E75" fontFamily="monospace">a</text>
              <text x="440" y="100" textAnchor="middle" fontSize="9"
                fill="#1D9E75" fontFamily="monospace">0.83</text>
              <text x="490" y="94" fontSize="9" fill="#1D9E75" fontFamily="monospace">output</text>
            </svg>

            {/* Formula breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              {[
                { label: 'Weighted sum (z)', formula: 'z = w₁x₁ + w₂x₂ + w₃x₃ + b  =  0.7×5.2 + 0.2×8 + 0.4×22 + (−0.5)  =  13.74', color: '#7b61ff' },
                { label: 'Activation (a)',   formula: 'a = sigmoid(z) = 1/(1 + e^−13.74) ≈ 0.999   (or ReLU: max(0, 13.74) = 13.74)', color: '#1D9E75' },
              ].map((row) => (
                <div key={row.label} style={{
                  background: 'var(--surface)', borderRadius: 6, padding: '8px 12px',
                  border: `1px solid ${row.color}20`,
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: row.color, fontFamily: 'var(--font-mono)', marginBottom: 3 }}>
                    {row.label}
                  </div>
                  <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                    {row.formula}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </VisualBox>

        <h3 style={S.h3}>Activation functions — why they matter and which to use</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            {
              name: 'ReLU — Rectified Linear Unit',
              formula: 'max(0, z)',
              color: '#1D9E75',
              desc: 'Output zero for negative z, z for positive. Simple, fast, does not saturate for positive values. Default choice for hidden layers.',
              when: 'Hidden layers in almost all modern networks.',
              issue: 'Dying ReLU: neurons that always output 0 stop learning.',
            },
            {
              name: 'Sigmoid',
              formula: '1 / (1 + e^−z)',
              color: '#378ADD',
              desc: 'Squashes output to (0, 1). Interpretable as probability. Saturates at both ends — gradients vanish for large |z|.',
              when: 'Output layer for binary classification only.',
              issue: 'Vanishing gradients in deep networks — avoid in hidden layers.',
            },
            {
              name: 'Softmax',
              formula: 'e^zᵢ / Σe^zⱼ',
              color: '#D85A30',
              desc: 'Converts a vector of scores to probabilities summing to 1. Each output is the probability of that class.',
              when: 'Output layer for multi-class classification only.',
              issue: 'Numerically unstable — always use log-softmax + NLLLoss or CrossEntropyLoss.',
            },
            {
              name: 'Tanh',
              formula: '(e^z − e^−z) / (e^z + e^−z)',
              color: '#BA7517',
              desc: 'Squashes to (−1, 1). Zero-centred — better gradient flow than sigmoid. Still saturates for large |z|.',
              when: 'RNNs and LSTMs where zero-centred activations matter.',
              issue: 'Still suffers vanishing gradients for deep networks.',
            },
          ].map((item) => (
            <div key={item.name} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '11px 14px',
              display: 'grid', gridTemplateColumns: '160px 1fr 1fr',
              gap: 12, alignItems: 'start',
              borderLeft: `3px solid ${item.color}`,
            }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 3 }}>
                  {item.name}
                </div>
                <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: item.color }}>
                  {item.formula}
                </div>
              </div>
              <div>
                <p style={{ ...S.ps, marginBottom: 4 }}>{item.desc}</p>
                <div style={{ fontSize: 11, color: item.color }}>Use: {item.when}</div>
              </div>
              <div style={{ fontSize: 11, color: '#ff4757' }}>⚠ {item.issue}</div>
            </div>
          ))}
        </div>

        <CodeBlock code={`import numpy as np

# ── Activation functions and their derivatives ─────────────────────────
# Derivatives needed for backpropagation

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def sigmoid_derivative(z):
    s = sigmoid(z)
    return s * (1 - s)   # convenient: derivative in terms of the output

def relu(z):
    return np.maximum(0, z)

def relu_derivative(z):
    return (z > 0).astype(float)   # 1 if z > 0, 0 otherwise

def tanh(z):
    return np.tanh(z)

def tanh_derivative(z):
    return 1 - np.tanh(z) ** 2

def softmax(z):
    # Numerically stable: subtract max before exponentiating
    e = np.exp(z - z.max(axis=1, keepdims=True))
    return e / e.sum(axis=1, keepdims=True)

# ── Verify derivatives numerically ─────────────────────────────────────
# Numerical gradient: (f(z+h) - f(z-h)) / (2h)
def numerical_gradient(f, z, h=1e-5):
    return (f(z + h) - f(z - h)) / (2 * h)

z_test = np.array([[-2.0, -0.5, 0.0, 0.5, 2.0]])

print("Verifying analytical vs numerical derivatives:")
for name, f, df in [
    ('sigmoid', sigmoid, sigmoid_derivative),
    ('relu',    relu,    relu_derivative),
    ('tanh',    tanh,    tanh_derivative),
]:
    analytical = df(z_test)
    numerical  = numerical_gradient(f, z_test)
    max_error  = np.abs(analytical - numerical).max()
    print(f"  {name:<10}: max error = {max_error:.2e}  "
          f"{'✓ correct' if max_error < 1e-4 else '✗ wrong'}")

# ── Dying ReLU demonstration ───────────────────────────────────────────
# Once relu output is 0, its gradient is 0 — the neuron never updates
z_negative = np.array([-5.0, -3.0, -1.0])
print(f"\nReLU on negative inputs: {relu(z_negative)}")
print(f"ReLU derivative:         {relu_derivative(z_negative)}  ← all zero, no learning")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — THE FORWARD PASS ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Computing a prediction</span>
        <h2 style={S.h2}>The forward pass — data flows through layers, one matrix multiply at a time</h2>

        <p style={S.p}>
          A neural network is multiple neurons stacked into layers.
          Every neuron in one layer connects to every neuron in the next —
          a fully connected (dense) layer. The forward pass computes
          a prediction by passing data from the input layer through
          each hidden layer to the output layer.
          Each layer is one matrix multiplication plus an activation.
        </p>

        <ConceptBox title="Layer computation — the matrix form">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2 }}>
            <div style={{ color: '#7b61ff', marginBottom: 6 }}>
              Z = X @ W + b      ← linear transformation
            </div>
            <div style={{ color: '#1D9E75', marginBottom: 12 }}>
              A = activation(Z) ← non-linear squash
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: 'var(--muted)' }}>
              <div>X: input matrix  (batch_size × n_inputs)</div>
              <div>W: weight matrix (n_inputs × n_neurons)   ← learned parameters</div>
              <div>b: bias vector   (1 × n_neurons)          ← learned parameters</div>
              <div>Z: pre-activation (batch_size × n_neurons)</div>
              <div>A: post-activation (batch_size × n_neurons) → input to next layer</div>
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np

np.random.seed(42)

# ── Build a 3-layer network for Swiggy delivery time prediction ────────
# Architecture: 4 inputs → 8 hidden → 4 hidden → 1 output
# Task: regression (predict delivery minutes)

def sigmoid(z):    return 1 / (1 + np.exp(-np.clip(z, -500, 500)))
def relu(z):       return np.maximum(0, z)
def relu_deriv(z): return (z > 0).astype(float)

# ── Initialise weights ─────────────────────────────────────────────────
# He initialisation for ReLU: scale by sqrt(2/n_inputs)
# Avoids vanishing/exploding gradients at the start
def init_weights(n_in, n_out, activation='relu'):
    scale = np.sqrt(2.0 / n_in) if activation == 'relu' else np.sqrt(1.0 / n_in)
    return np.random.randn(n_in, n_out) * scale

# Network parameters
W1 = init_weights(4, 8)       # layer 1 weights:  (4, 8)
b1 = np.zeros((1, 8))          # layer 1 bias:     (1, 8)
W2 = init_weights(8, 4)        # layer 2 weights:  (8, 4)
b2 = np.zeros((1, 4))          # layer 2 bias:     (1, 4)
W3 = init_weights(4, 1, 'linear')  # output weights:   (4, 1)
b3 = np.zeros((1, 1))          # output bias:      (1, 1)

total_params = (W1.size + b1.size + W2.size + b2.size + W3.size + b3.size)
print(f"Network architecture: 4 → 8 → 4 → 1")
print(f"Total parameters:     {total_params}")

# ── Forward pass — explicit at every step ─────────────────────────────
def forward_pass(X):
    """
    X: (batch_size, 4) — [distance, traffic, prep_time, order_value]
    Returns prediction and all intermediate values (needed for backprop)
    """
    # Layer 1: linear → ReLU
    Z1 = X  @ W1 + b1    # (batch, 4) @ (4, 8) + (1, 8) = (batch, 8)
    A1 = relu(Z1)          # (batch, 8)

    # Layer 2: linear → ReLU
    Z2 = A1 @ W2 + b2    # (batch, 8) @ (8, 4) + (1, 4) = (batch, 4)
    A2 = relu(Z2)          # (batch, 4)

    # Output layer: linear (no activation for regression)
    Z3 = A2 @ W3 + b3    # (batch, 4) @ (4, 1) + (1, 1) = (batch, 1)
    A3 = Z3                # raw output for regression

    # Cache everything — backprop needs these
    cache = {'X': X, 'Z1': Z1, 'A1': A1, 'Z2': Z2, 'A2': A2, 'Z3': Z3, 'A3': A3}
    return A3, cache

# ── Test on a batch ───────────────────────────────────────────────────
np.random.seed(0)
n_batch = 32
X_batch = np.column_stack([
    np.abs(np.random.normal(4.0, 2.0, n_batch)).clip(0.5, 15),  # distance
    np.random.randint(1, 11, n_batch).astype(float),              # traffic
    np.abs(np.random.normal(15, 5, n_batch)).clip(5, 35),        # prep
    np.abs(np.random.normal(350, 150, n_batch)).clip(50, 1200),  # order value
])
# Standardise
X_mean  = X_batch.mean(axis=0)
X_std   = X_batch.std(axis=0) + 1e-8
X_batch = (X_batch - X_mean) / X_std

pred, cache = forward_pass(X_batch)
print(f"\nForward pass on batch of {n_batch}:")
print(f"  Input shape:  {X_batch.shape}")
print(f"  Z1 shape:     {cache['Z1'].shape}")
print(f"  A1 shape:     {cache['A1'].shape}")
print(f"  Z2 shape:     {cache['Z2'].shape}")
print(f"  Output shape: {pred.shape}")
print(f"  Sample predictions (unnormalised): {pred[:5, 0].round(3)}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — BACKPROPAGATION ═════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The learning algorithm</span>
        <h2 style={S.h2}>Backpropagation — the chain rule applied backwards through the network</h2>

        <p style={S.p}>
          The forward pass produces a prediction. The prediction is wrong.
          We compute the loss — how wrong it is.
          Now we need to know: how should each weight change to make the
          prediction less wrong? The answer is the gradient of the loss
          with respect to each weight — ∂Loss/∂W.
        </p>

        <p style={S.p}>
          Backpropagation computes these gradients efficiently using
          the chain rule from calculus. The loss depends on the output,
          which depends on layer 3, which depends on layer 2,
          which depends on layer 1, which depends on the weights.
          Backprop unrolls this chain from output back to input —
          hence "backward" propagation.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 24 }}>
          <StepBox num={1} title="Compute the loss" color="#7b61ff">
            <p style={{ ...S.ps, marginBottom: 0 }}>
              MSE loss for regression: L = mean((y_pred − y_true)²).
              The gradient of MSE with respect to the prediction is:
              ∂L/∂A3 = 2 × (y_pred − y_true) / n
            </p>
          </StepBox>
          <StepBox num={2} title="Gradient through the output layer" color="#D85A30">
            <p style={{ ...S.ps, marginBottom: 0 }}>
              ∂L/∂W3 = A2ᵀ @ ∂L/∂A3 — how much does the output layer weight contribute to the loss?
              ∂L/∂A2 = ∂L/∂A3 @ W3ᵀ — how much does the signal from layer 2 contribute?
            </p>
          </StepBox>
          <StepBox num={3} title="Gradient through the ReLU activation" color="#BA7517">
            <p style={{ ...S.ps, marginBottom: 0 }}>
              ReLU kills gradients for negative pre-activations.
              ∂L/∂Z2 = ∂L/∂A2 × relu_derivative(Z2) — element-wise multiply.
              Zero where Z2 was negative, pass-through where Z2 was positive.
            </p>
          </StepBox>
          <StepBox num={4} title="Repeat backwards through all layers" color="#1D9E75">
            <p style={{ ...S.ps, marginBottom: 0 }}>
              Apply the same pattern for layer 1.
              Each layer produces two gradients: one for its weights (∂L/∂W)
              and one to pass backward (∂L/∂A_prev).
            </p>
          </StepBox>
        </div>

        <CodeBlock code={`import numpy as np

np.random.seed(42)

def sigmoid(z):     return 1 / (1 + np.exp(-np.clip(z, -500, 500)))
def relu(z):        return np.maximum(0, z)
def relu_deriv(z):  return (z > 0).astype(float)
def init_w(n_in, n_out): return np.random.randn(n_in, n_out) * np.sqrt(2.0 / n_in)

W1 = init_w(4, 8); b1 = np.zeros((1, 8))
W2 = init_w(8, 4); b2 = np.zeros((1, 4))
W3 = init_w(4, 1); b3 = np.zeros((1, 1))

def forward(X):
    Z1 = X  @ W1 + b1; A1 = relu(Z1)
    Z2 = A1 @ W2 + b2; A2 = relu(Z2)
    Z3 = A2 @ W3 + b3; A3 = Z3   # linear output
    return A3, {'X':X,'Z1':Z1,'A1':A1,'Z2':Z2,'A2':A2,'Z3':Z3,'A3':A3}

# ── Backpropagation — every gradient explicit ──────────────────────────
def backward(y_true, cache):
    """
    Compute gradients of MSE loss w.r.t. all weights and biases.
    Every line is one application of the chain rule.
    """
    n   = y_true.shape[0]
    A3  = cache['A3']

    # ── Loss gradient ──────────────────────────────────────────────────
    # MSE: L = mean((A3 - y)^2)
    # dL/dA3 = 2/n * (A3 - y)
    dA3 = 2 / n * (A3 - y_true)          # (batch, 1)

    # ── Output layer gradients ─────────────────────────────────────────
    # Z3 = A2 @ W3 + b3
    # dL/dW3 = A2^T @ dA3
    # dL/db3 = sum(dA3, axis=0)
    # dL/dA2 = dA3 @ W3^T  (pass back to layer 2)
    dW3 = cache['A2'].T @ dA3             # (4, 1)
    db3 = dA3.sum(axis=0, keepdims=True)  # (1, 1)
    dA2 = dA3 @ W3.T                      # (batch, 4)

    # ── Layer 2 gradients — through ReLU ──────────────────────────────
    # A2 = relu(Z2), so dL/dZ2 = dL/dA2 * relu'(Z2)
    dZ2 = dA2 * relu_deriv(cache['Z2'])   # (batch, 4)
    dW2 = cache['A1'].T @ dZ2             # (8, 4)
    db2 = dZ2.sum(axis=0, keepdims=True)  # (1, 4)
    dA1 = dZ2 @ W2.T                      # (batch, 8)

    # ── Layer 1 gradients — through ReLU ──────────────────────────────
    dZ1 = dA1 * relu_deriv(cache['Z1'])   # (batch, 8)
    dW1 = cache['X'].T @ dZ1              # (4, 8)
    db1 = dZ1.sum(axis=0, keepdims=True)  # (1, 8)

    return {'dW1':dW1,'db1':db1,'dW2':dW2,'db2':db2,'dW3':dW3,'db3':db3}

# ── Verify gradients numerically (gradient check) ─────────────────────
# This is the gold standard test for backprop correctness
def mse_loss(y_pred, y_true):
    return np.mean((y_pred - y_true) ** 2)

n_check = 8
X_c = np.random.randn(n_check, 4)
y_c = np.random.randn(n_check, 1) * 10 + 35   # delivery times

pred_c, cache_c = forward(X_c)
grads = backward(y_c, cache_c)

print("Gradient check (analytical vs numerical):")
h = 1e-5
for name, W, dW in [('W1', W1, grads['dW1']), ('W3', W3, grads['dW3'])]:
    # Check a random element
    i, j      = 0, 0
    W_orig    = W[i, j]

    W[i, j]   = W_orig + h
    loss_plus, _ = forward(X_c); loss_plus = mse_loss(loss_plus, y_c)
    W[i, j]   = W_orig - h
    loss_minus, _ = forward(X_c); loss_minus = mse_loss(loss_minus, y_c)
    W[i, j]   = W_orig   # restore

    numerical  = (loss_plus - loss_minus) / (2 * h)
    analytical = dW[i, j]
    error      = abs(numerical - analytical) / (abs(numerical) + abs(analytical) + 1e-10)
    print(f"  {name}[{i},{j}]: analytical={analytical:.6f}  "
          f"numerical={numerical:.6f}  rel_error={error:.2e}  "
          f"{'✓' if error < 1e-4 else '✗'}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — GRADIENT DESCENT AND TRAINING ══════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The complete training loop</span>
        <h2 style={S.h2}>Gradient descent — update weights, repeat until convergence</h2>

        <p style={S.p}>
          Backpropagation computes the direction of steepest increase in the loss.
          Gradient descent moves weights in the opposite direction —
          subtracting a fraction of the gradient called the learning rate.
          One forward pass + one backward pass + one weight update = one training step.
          Repeat over the entire dataset many times (epochs) until the loss converges.
        </p>

        <CodeBlock code={`import numpy as np
from sklearn.model_selection import train_test_split

np.random.seed(42)
n = 2000

# Swiggy delivery time dataset
distance  = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic   = np.random.randint(1, 11, n).astype(float)
prep      = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
value     = np.abs(np.random.normal(350, 150, n)).clip(50, 1200)
delivery  = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
             + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep, value])
y = delivery.reshape(-1, 1)

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardise
X_mean, X_std = X_tr.mean(0), X_tr.std(0) + 1e-8
y_mean, y_std = y_tr.mean(),  y_tr.std()  + 1e-8
X_tr_sc = (X_tr - X_mean) / X_std
X_te_sc = (X_te - X_mean) / X_std
y_tr_sc = (y_tr - y_mean) / y_std
y_te_sc = (y_te - y_mean) / y_std

# ── Full neural network class ──────────────────────────────────────────
class NeuralNetwork:
    def __init__(self, layer_sizes, learning_rate=0.01):
        self.lr   = learning_rate
        self.W    = []
        self.b    = []
        for i in range(len(layer_sizes) - 1):
            n_in, n_out = layer_sizes[i], layer_sizes[i+1]
            self.W.append(np.random.randn(n_in, n_out) * np.sqrt(2.0 / n_in))
            self.b.append(np.zeros((1, n_out)))

    def relu(self, z):      return np.maximum(0, z)
    def relu_d(self, z):    return (z > 0).astype(float)
    def mse(self, yp, yt):  return np.mean((yp - yt) ** 2)
    def mae(self, yp, yt):  return np.mean(np.abs(yp - yt))

    def forward(self, X):
        self.cache = [X]
        self.Z     = []
        A = X
        for i, (W, b) in enumerate(zip(self.W, self.b)):
            Z = A @ W + b
            self.Z.append(Z)
            A = self.relu(Z) if i < len(self.W) - 1 else Z   # linear output
            self.cache.append(A)
        return A

    def backward(self, y_true):
        n   = y_true.shape[0]
        dA  = 2 / n * (self.cache[-1] - y_true)
        dWs, dbs = [], []
        for i in reversed(range(len(self.W))):
            dZ = dA * self.relu_d(self.Z[i]) if i < len(self.W) - 1 else dA
            dWs.insert(0, self.cache[i].T @ dZ)
            dbs.insert(0, dZ.sum(axis=0, keepdims=True))
            dA = dZ @ self.W[i].T
        # Update weights
        for i in range(len(self.W)):
            self.W[i] -= self.lr * dWs[i]
            self.b[i]  -= self.lr * dbs[i]

    def fit(self, X, y, epochs=200, batch_size=64, verbose=True):
        history = []
        for epoch in range(epochs):
            # Shuffle data each epoch
            idx = np.random.permutation(len(X))
            X, y = X[idx], y[idx]
            # Mini-batch gradient descent
            for start in range(0, len(X), batch_size):
                Xb = X[start:start+batch_size]
                yb = y[start:start+batch_size]
                self.forward(Xb)
                self.backward(yb)
            # Epoch loss
            loss = self.mse(self.forward(X), y)
            history.append(loss)
            if verbose and (epoch + 1) % 50 == 0:
                print(f"  Epoch {epoch+1:3d}: MSE = {loss:.6f}")
        return history

# ── Train ─────────────────────────────────────────────────────────────
nn = NeuralNetwork(layer_sizes=[4, 16, 8, 1], learning_rate=0.005)
print("Training neural network on Swiggy delivery data:")
history = nn.fit(X_tr_sc, y_tr_sc, epochs=200, batch_size=64)

# Evaluate
y_pred_sc = nn.forward(X_te_sc)
y_pred    = y_pred_sc * y_std + y_mean   # un-standardise

from sklearn.metrics import mean_absolute_error
mae = mean_absolute_error(y_te, y_pred)
print(f"\nTest MAE: {mae:.4f} minutes")
print(f"(Baseline — always predict mean: "
      f"{mean_absolute_error(y_te, np.full_like(y_te, y_tr.mean())):.4f} min)")`} />

        <h3 style={S.h3}>Three variants of gradient descent</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            {
              name: 'Batch GD',
              color: '#D85A30',
              desc: 'Compute gradient on the entire dataset per step. Exact gradient. Slow on large datasets. Never used in deep learning.',
              update: 'W -= lr × gradient(full dataset)',
            },
            {
              name: 'Stochastic GD (SGD)',
              color: '#BA7517',
              desc: 'Compute gradient on one sample per step. Very noisy — gradient direction jumps randomly. Can escape local minima. Very fast per step.',
              update: 'W -= lr × gradient(one sample)',
            },
            {
              name: 'Mini-batch GD',
              color: '#1D9E75',
              desc: 'Compute gradient on a batch of 32–256 samples. Best of both — stable enough to converge, fast enough for large datasets. What every deep learning framework uses by default.',
              update: 'W -= lr × gradient(batch of 64)',
            },
          ].map((item) => (
            <div key={item.name} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '10px 14px',
              borderLeft: `3px solid ${item.color}`,
              display: 'grid', gridTemplateColumns: '130px 1fr 250px',
              gap: 12, alignItems: 'start',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>
                {item.name}
              </div>
              <p style={{ ...S.ps, marginBottom: 0 }}>{item.desc}</p>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: item.color }}>
                {item.update}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Div />

      {/* ══ SECTION 6 — FROM SCRATCH TO PYTORCH ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Bridging to the real world</span>
        <h2 style={S.h2}>The same network in PyTorch — autograd handles backpropagation for you</h2>

        <p style={S.p}>
          Everything you just coded by hand — forward pass, loss computation,
          backward pass, weight updates — PyTorch automates with one call to
          <span style={S.code as React.CSSProperties}> loss.backward()</span>.
          Its autograd engine traces all operations in the forward pass
          and automatically computes gradients for every parameter.
          The code becomes dramatically shorter without changing what happens.
        </p>

        <CodeBlock code={`import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
torch.manual_seed(42)
n = 2000

distance  = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic   = np.random.randint(1, 11, n).astype(float)
prep      = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
value     = np.abs(np.random.normal(350, 150, n)).clip(50, 1200)
delivery  = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
             + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep, value])
y = delivery.reshape(-1, 1)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

X_mean, X_std = X_tr.mean(0), X_tr.std(0) + 1e-8
y_mean, y_std = y_tr.mean(),  y_tr.std()  + 1e-8
X_tr_sc = (X_tr - X_mean) / X_std
X_te_sc = (X_te - X_mean) / X_std
y_tr_sc = (y_tr - y_mean) / y_std

# Convert to PyTorch tensors
X_train_t = torch.FloatTensor(X_tr_sc)
y_train_t = torch.FloatTensor(y_tr_sc)
X_test_t  = torch.FloatTensor(X_te_sc)

# ── Define network — identical architecture to our from-scratch version ─
model = nn.Sequential(
    nn.Linear(4, 16),    # layer 1: 4 inputs → 16 neurons
    nn.ReLU(),
    nn.Linear(16, 8),    # layer 2: 16 → 8
    nn.ReLU(),
    nn.Linear(8, 1),     # output:  8 → 1 (regression)
)

criterion = nn.MSELoss()
optimizer = optim.SGD(model.parameters(), lr=0.005)

# ── Training loop — forward + backward + update ────────────────────────
print("Training with PyTorch:")
batch_size = 64
dataset    = torch.utils.data.TensorDataset(X_train_t, y_train_t)
dataloader = torch.utils.data.DataLoader(dataset, batch_size=batch_size, shuffle=True)

for epoch in range(200):
    model.train()
    for X_batch, y_batch in dataloader:
        # 1. Forward pass — PyTorch traces all operations
        y_pred = model(X_batch)

        # 2. Compute loss
        loss = criterion(y_pred, y_batch)

        # 3. Backward pass — autograd computes all gradients
        optimizer.zero_grad()   # clear previous gradients
        loss.backward()          # ← replaces our entire backward() function

        # 4. Update weights
        optimizer.step()        # W -= lr * W.grad  for all parameters

    if (epoch + 1) % 50 == 0:
        model.eval()
        with torch.no_grad():
            train_loss = criterion(model(X_train_t), y_train_t).item()
        print(f"  Epoch {epoch+1:3d}: MSE = {train_loss:.6f}")

# ── Evaluate ───────────────────────────────────────────────────────────
model.eval()
with torch.no_grad():
    y_pred_sc = model(X_test_t).numpy()
y_pred = y_pred_sc * y_std + y_mean

mae = mean_absolute_error(y_te, y_pred)
print(f"\nTest MAE: {mae:.4f} minutes")

# ── What PyTorch automates ─────────────────────────────────────────────
print(f"\nWhat PyTorch replaces:")
print(f"  loss.backward() → our 30-line backward() function")
print(f"  optimizer.step() → our weight update loop")
print(f"  nn.Linear → our W @ x + b")
print(f"  autograd → the chain rule applied automatically to any graph")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common neural network mistake — explained and fixed</h2>

        <ErrorBlock
          error="Loss is NaN after the first few training steps"
          cause="Exploding gradients — weights grew so large that activations overflow to infinity, and infinity minus infinity produces NaN. Caused by: learning rate too high, weights initialised too large, no normalisation of input features, or very deep network without batch normalisation. One NaN propagates through every subsequent operation."
          fix="Standardise input features to mean=0 std=1 before training. Reduce learning rate by 10×. Use He initialisation (scale=sqrt(2/n_in)) for ReLU networks, Xavier (scale=sqrt(1/n_in)) for tanh/sigmoid. Add gradient clipping: torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0). Check for NaN in input data before training: assert not np.isnan(X).any()."
        />

        <ErrorBlock
          error="Loss decreases during training but test loss is much higher — severe overfitting"
          cause="The network memorised the training data. Common causes: network too large relative to dataset size, training too many epochs without early stopping, no regularisation. A 5-layer network with 512 neurons on 500 training samples will memorise every example given enough epochs."
          fix="Add dropout layers: nn.Dropout(p=0.3) after each hidden layer — randomly zeros 30% of activations during training, forcing the network to learn redundant representations. Add L2 regularisation via weight_decay in the optimizer: optim.SGD(model.parameters(), lr=0.01, weight_decay=1e-4). Use early stopping: monitor validation loss and stop when it stops improving for 20 consecutive epochs."
        />

        <ErrorBlock
          error="Network learns nothing — loss stays constant from epoch 1 to epoch 200"
          cause="Dead neurons or vanishing gradients. If sigmoid is used in hidden layers, gradients saturate for large |z| values — backprop receives near-zero gradient and weights never update. If all ReLU neurons produce zero output (dying ReLU) from bad initialisation, no gradient flows backward. Or learning rate is so small that updates are negligible."
          fix="Switch hidden layer activations from sigmoid to ReLU. Use He initialisation for ReLU: nn.Linear initialises with a uniform distribution by default — override with nn.init.kaiming_normal_(layer.weight). Increase learning rate by 10×. Check that gradients are non-zero: for p in model.parameters(): print(p.grad.abs().max()). If all gradients are zero, the backward pass is broken."
        />

        <ErrorBlock
          error="RuntimeError: Expected all tensors to be on the same device but found CPU and CUDA"
          cause="Some tensors are on CPU and others on GPU. In PyTorch, operations between tensors on different devices raise this error. Happens when you move the model to GPU (model.to('cuda')) but forget to move the input tensors, or when you create a new tensor during forward pass without specifying device."
          fix="Move all tensors to the same device before operations. Standard pattern: device = torch.device('cuda' if torch.cuda.is_available() else 'cpu'); model = model.to(device); X = X.to(device); y = y.to(device). When creating tensors inside the model, use tensor.to(device) or pass device=device in the constructor. Never hardcode 'cuda' — always use the device variable so code works on both CPU and GPU."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You built a neural network from scratch. Now: make it train faster and better.
        </h2>

        <p style={S.p}>
          The network you just built works — but plain SGD is the slowest,
          least reliable optimizer available. Module 41 covers the training
          techniques that make modern deep learning practical:
          Adam optimizer (adaptive learning rates per parameter),
          batch normalisation (stabilise activations between layers),
          dropout (prevent overfitting), and learning rate schedules
          (reduce lr as training progresses).
          These four techniques take a network from "trains but slowly"
          to "trains fast and generalises well."
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
              textTransform: 'uppercase' as const, color: '#7b61ff',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Module 41 · Deep Learning
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Training Deep Networks — Adam, BatchNorm, Dropout
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              The four techniques that separate a network that trains
              from one that trains well. Used in every production deep learning system.
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
          'A neural network learns its own features from raw data — stacked layers of weighted sums followed by non-linear activations. No manual feature engineering needed. Each layer learns increasingly abstract representations.',
          'One neuron: z = Σ(wᵢxᵢ) + b, a = activation(z). One layer: Z = X @ W + b, A = activation(Z). Matrix multiplication makes the computation efficient for batches of samples simultaneously.',
          'Use ReLU (max(0, z)) as the default activation for hidden layers. It does not saturate for positive values, is fast to compute, and produces sparse activations. Use sigmoid only at the output for binary classification, softmax for multi-class, linear for regression.',
          'Backpropagation applies the chain rule backwards through the network to compute ∂Loss/∂W for every weight. Each layer produces two gradients: one to update its own weights and one to pass backward to the previous layer. Gradient check (compare analytical vs numerical gradients) verifies correctness.',
          'Mini-batch gradient descent — process batches of 32–256 samples per update — is the correct trade-off between noisy single-sample updates and slow full-dataset updates. Shuffle data each epoch to prevent the model from memorising the order.',
          'PyTorch automates backpropagation via autograd. loss.backward() computes all gradients, optimizer.step() applies them. The from-scratch implementation is identical in logic — PyTorch just removes the manual gradient code so you can focus on architecture design.',
        ]}
      />
    </LearnLayout>
  )
}
