import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Backpropagation — How Neural Networks Learn — Chaduvuko',
  description:
    'The chain rule applied to a network of layers. Gradients flow backward, weights update, the network gets better. Understood once, never forgotten.',
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

export default function BackpropagationPage() {
  return (
    <LearnLayout
      title="Backpropagation — How Neural Networks Learn"
      description="The chain rule applied to a network of layers. Gradients flow backward, weights update, the network gets better. Understood once, never forgotten."
      section="Deep Learning"
      readTime="35–40 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="deep-learning" topic="backpropagation" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — what problem does backprop solve?</span>
        <h2 style={S.h2}>
          A network makes a prediction. It is wrong.
          Backpropagation answers one question: which weights caused the error,
          and by exactly how much should each one change?
        </h2>

        <p style={S.p}>
          Module 41 showed the forward pass — data flows left to right through
          the network, layer by layer, until a prediction emerges.
          The prediction is compared to the true label. The difference is the loss.
          Now what? The network has thousands of weights. Which ones made the
          prediction wrong? How wrong did each one make it?
          How much should each one move?
        </p>

        <p style={S.p}>
          This is the credit assignment problem — the hardest problem in
          training neural networks. If the network predicts 32 minutes for a
          delivery that actually took 41 minutes, which of the 5,000 weights
          is responsible for the 9-minute underestimate?
          All of them contributed — but in different amounts, through different paths.
        </p>

        <p style={S.p}>
          Backpropagation solves credit assignment using the chain rule from calculus.
          It starts at the loss and works backwards — computing how much the loss
          would change if each weight changed by a tiny amount.
          That quantity is the gradient. Once you have the gradient for every weight,
          gradient descent subtracts a small fraction of it from each weight.
          Repeat this millions of times and the network learns.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A manager wants to know why a project was delivered late.
            They start at the final delay (the loss) and trace backwards.
            The deployment was late because testing was late.
            Testing was late because development was late.
            Development was late because requirements were unclear.
            At each step they answer: how much did this step contribute
            to the final delay? That is the chain rule — each step's
            contribution multiplied together to reach the root cause.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            Backpropagation traces the prediction error backwards through the network.
            At each layer it asks: how much did this layer's weights contribute
            to the final error? The answer — the gradient — tells each weight
            exactly how to change to reduce the error next time.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          Read Module 07 (Derivatives and Gradients) before this one.
          Backpropagation is the chain rule applied repeatedly.
          If you are comfortable with ∂f/∂x notation and the chain rule
          ∂f/∂x = (∂f/∂g)(∂g/∂x), the entire algorithm will make sense.
          If not, Module 07 first — 20 minutes there saves 2 hours of confusion here.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — THE CHAIN RULE ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The mathematical foundation</span>
        <h2 style={S.h2}>The chain rule — the only piece of calculus backprop needs</h2>

        <p style={S.p}>
          The chain rule says: if y depends on z which depends on x,
          then how y changes with x equals how y changes with z
          multiplied by how z changes with x.
          Written as: ∂y/∂x = (∂y/∂z) × (∂z/∂x).
        </p>

        <p style={S.p}>
          A neural network is a chain of functions.
          The loss depends on the output, which depends on layer 3,
          which depends on layer 2, which depends on layer 1,
          which depends on the weights. Backpropagation applies the chain rule
          at each link in this chain — starting from the loss and multiplying
          derivatives backwards through every layer until reaching the weights.
        </p>

        <VisualBox label="The chain of functions in a 3-layer network">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {/* Forward chain */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'nowrap' as const, overflowX: 'auto' as const }}>
              {[
                { label: 'W₁,b₁', bg: '#378ADD20', border: '#378ADD' },
                { label: '→', isArrow: true },
                { label: 'Z₁=XW₁+b₁', bg: '#378ADD15', border: '#378ADD' },
                { label: '→', isArrow: true },
                { label: 'A₁=relu(Z₁)', bg: '#1D9E7515', border: '#1D9E75' },
                { label: '→', isArrow: true },
                { label: 'Z₂=A₁W₂+b₂', bg: '#378ADD15', border: '#378ADD' },
                { label: '→', isArrow: true },
                { label: 'A₂=relu(Z₂)', bg: '#1D9E7515', border: '#1D9E75' },
                { label: '→', isArrow: true },
                { label: 'ŷ=A₂W₃+b₃', bg: '#D85A3015', border: '#D85A30' },
                { label: '→', isArrow: true },
                { label: 'L=MSE(ŷ,y)', bg: '#ff475720', border: '#ff4757' },
              ].map((item, i) => (
                item.isArrow
                  ? <div key={i} style={{ fontSize: 16, color: '#555', padding: '0 2px' }}>→</div>
                  : <div key={i} style={{
                      background: item.bg, border: `1px solid ${item.border}`,
                      borderRadius: 5, padding: '5px 8px', fontSize: 10,
                      fontFamily: 'var(--font-mono)', color: 'var(--text)',
                      flexShrink: 0,
                    }}>
                      {item.label}
                    </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' as const, fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
              ↑ forward pass →
            </div>

            {/* Backward chain */}
            <div style={{
              background: 'var(--surface)', borderRadius: 6,
              padding: '12px 14px', marginTop: 8,
              fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2,
            }}>
              <div style={{ color: '#ff4757' }}>∂L/∂ŷ  = 2(ŷ−y)/n                     ← start here</div>
              <div style={{ color: '#D85A30' }}>∂L/∂W₃ = A₂ᵀ × ∂L/∂ŷ               ← output weights</div>
              <div style={{ color: '#D85A30' }}>∂L/∂A₂ = ∂L/∂ŷ × W₃ᵀ               ← pass back</div>
              <div style={{ color: '#1D9E75' }}>∂L/∂Z₂ = ∂L/∂A₂ × relu'(Z₂)        ← through activation</div>
              <div style={{ color: '#378ADD' }}>∂L/∂W₂ = A₁ᵀ × ∂L/∂Z₂              ← layer 2 weights</div>
              <div style={{ color: '#378ADD' }}>∂L/∂A₁ = ∂L/∂Z₂ × W₂ᵀ              ← pass back further</div>
              <div style={{ color: '#1D9E75' }}>∂L/∂Z₁ = ∂L/∂A₁ × relu'(Z₁)</div>
              <div style={{ color: '#378ADD' }}>∂L/∂W₁ = Xᵀ × ∂L/∂Z₁               ← layer 1 weights</div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
              Each line is one application of the chain rule. The pattern repeats identically for every layer.
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np

# ── Chain rule on a simple example before the full network ────────────
# f(x) = sigmoid(2x + 1)  — two operations chained
# We want df/dx

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def sigmoid_deriv(z):
    s = sigmoid(z)
    return s * (1 - s)

x = 0.5

# Forward pass — compute and cache intermediate values
z = 2 * x + 1        # linear step:   z = 2x + 1
f = sigmoid(z)        # sigmoid step:  f = sigmoid(z)

# Chain rule: df/dx = (df/dz) × (dz/dx)
df_dz = sigmoid_deriv(z)   # how much f changes with z
dz_dx = 2.0                 # how much z changes with x  (derivative of 2x+1 is 2)
df_dx = df_dz * dz_dx       # chain rule

# Verify numerically
h       = 1e-5
df_dx_numerical = (sigmoid(2*(x+h)+1) - sigmoid(2*(x-h)+1)) / (2*h)

print(f"f(x)         = sigmoid(2×{x} + 1) = {f:.6f}")
print(f"df/dz        = sigmoid'(z)        = {df_dz:.6f}")
print(f"dz/dx        = d(2x+1)/dx         = {dz_dx:.6f}")
print(f"df/dx (chain)= {df_dz:.6f} × {dz_dx:.6f}   = {df_dx:.6f}")
print(f"df/dx (numer)= {df_dx_numerical:.6f}  ← matches ✓")

# ── Now with three chained functions ─────────────────────────────────
# L = MSE(relu(Wx + b), y)  — loss through linear → relu → MSE

W, b, y = 0.8, -0.2, 1.0
x_in    = 0.5

# Forward
z_val  = W * x_in + b        # linear
a_val  = max(0, z_val)        # relu
loss   = (a_val - y) ** 2     # MSE (single sample, no mean)

# Backward — chain rule at each step
dL_da  = 2 * (a_val - y)                        # ∂L/∂a
da_dz  = 1.0 if z_val > 0 else 0.0              # ∂a/∂z (relu derivative)
dz_dW  = x_in                                    # ∂z/∂W
dz_db  = 1.0                                     # ∂z/∂b

dL_dW  = dL_da * da_dz * dz_dW   # chain: ∂L/∂W
dL_db  = dL_da * da_dz * dz_db   # chain: ∂L/∂b

print(f"\nThree-function chain: L = MSE(relu(Wx+b), y)")
print(f"  Forward:   z={z_val:.3f}  a={a_val:.3f}  L={loss:.3f}")
print(f"  ∂L/∂a    = 2(a−y)          = {dL_da:.4f}")
print(f"  ∂a/∂z    = relu'(z)         = {da_dz:.4f}")
print(f"  ∂z/∂W    = x               = {dz_dW:.4f}")
print(f"  ∂L/∂W    = {dL_da:.3f} × {da_dz:.3f} × {dz_dW:.3f} = {dL_dW:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — BACKPROP IN A FULL NETWORK ═════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Scaling to a real network</span>
        <h2 style={S.h2}>Backprop in matrix form — the same chain rule, but for every weight simultaneously</h2>

        <p style={S.p}>
          The chain rule example above worked on one weight.
          A real network has thousands. The key insight: in matrix form,
          the chain rule applies to entire layers simultaneously —
          the same equations work regardless of how wide or deep the network is.
          Each layer produces two outputs during backprop:
          the gradient for its own weights (used to update them)
          and the gradient to pass further backward (used by the previous layer).
        </p>

        <ConceptBox title="The two outputs of each backward layer — memorise this pattern">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2 }}>
            <div style={{ color: '#7b61ff', marginBottom: 4 }}>
              Given: dA (gradient flowing in from the next layer)
            </div>
            <div style={{ color: '#D85A30', marginBottom: 4 }}>
              dZ = dA × activation'(Z)      ← through the activation function
            </div>
            <div style={{ color: '#1D9E75', marginBottom: 4 }}>
              dW = Aₚᵣₑᵥᵀ @ dZ             ← gradient for THIS layer's weights
            </div>
            <div style={{ color: '#378ADD', marginBottom: 8 }}>
              dA_prev = dZ @ Wᵀ             ← gradient to pass to the PREVIOUS layer
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              This pattern repeats identically for every layer.
              The only thing that changes is the activation function derivative.
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np

np.random.seed(42)

# ── Full backprop from scratch — every gradient explicit ───────────────

def relu(z):       return np.maximum(0, z)
def relu_d(z):     return (z > 0).astype(float)
def sigmoid(z):    return 1 / (1 + np.exp(-np.clip(z, -500, 500)))
def sigmoid_d(z):  s = sigmoid(z); return s * (1 - s)

def init(n_in, n_out):
    return np.random.randn(n_in, n_out) * np.sqrt(2.0 / n_in)

# Network: 3 inputs → 4 hidden (relu) → 2 hidden (relu) → 1 output (sigmoid)
# Task: binary classification
W1, b1 = init(3, 4), np.zeros((1, 4))
W2, b2 = init(4, 2), np.zeros((1, 2))
W3, b3 = init(2, 1), np.zeros((1, 1))

def forward(X):
    """Forward pass — cache everything needed for backprop."""
    Z1 = X  @ W1 + b1;  A1 = relu(Z1)
    Z2 = A1 @ W2 + b2;  A2 = relu(Z2)
    Z3 = A2 @ W3 + b3;  A3 = sigmoid(Z3)   # probability output
    return A3, {'X': X, 'Z1': Z1, 'A1': A1,
                'Z2': Z2, 'A2': A2, 'Z3': Z3, 'A3': A3}

def binary_cross_entropy(y_pred, y_true):
    eps = 1e-8
    return -np.mean(y_true * np.log(y_pred + eps)
                    + (1 - y_true) * np.log(1 - y_pred + eps))

def backward(y_true, cache, lr=0.01):
    """
    Backprop — compute all gradients, update all weights.
    Returns gradients for inspection.
    """
    global W1, b1, W2, b2, W3, b3
    n  = y_true.shape[0]
    A3 = cache['A3']

    # ── Loss gradient ──────────────────────────────────────────────────
    # BCE loss: ∂L/∂A3 = -(y/A3 - (1-y)/(1-A3)) / n
    # For sigmoid output with BCE this simplifies beautifully to:
    dA3 = (A3 - y_true) / n          # (n, 1)

    # ── Layer 3 backward ──────────────────────────────────────────────
    # Z3 = A2 @ W3 + b3,  A3 = sigmoid(Z3)
    # dZ3 = dA3 × sigmoid'(Z3)   ← through activation
    # But sigmoid'(Z3) = A3(1-A3), and dA3 already equals (A3-y)/n
    # so dZ3 = dA3 (the simplification from combining BCE + sigmoid)
    dZ3 = dA3                         # (n, 1)
    dW3 = cache['A2'].T @ dZ3         # (2, 1)  ← gradient for W3
    db3 = dZ3.sum(axis=0, keepdims=True)
    dA2 = dZ3 @ W3.T                  # (n, 2)  ← pass to layer 2

    # ── Layer 2 backward ──────────────────────────────────────────────
    dZ2 = dA2 * relu_d(cache['Z2'])   # (n, 2)  ← through relu
    dW2 = cache['A1'].T @ dZ2         # (4, 2)  ← gradient for W2
    db2 = dZ2.sum(axis=0, keepdims=True)
    dA1 = dZ2 @ W2.T                  # (n, 4)  ← pass to layer 1

    # ── Layer 1 backward ──────────────────────────────────────────────
    dZ1 = dA1 * relu_d(cache['Z1'])   # (n, 4)
    dW1 = cache['X'].T  @ dZ1         # (3, 4)  ← gradient for W1
    db1_g = dZ1.sum(axis=0, keepdims=True)

    # ── Gradient descent update ────────────────────────────────────────
    W3 -= lr * dW3;  b3 -= lr * db3
    W2 -= lr * dW2;  b2 -= lr * db2
    W1 -= lr * dW1;  b1 -= lr * db1_g

    return {'dW1': dW1, 'dW2': dW2, 'dW3': dW3}

# ── Train on CRED-style loan default data ─────────────────────────────
np.random.seed(42)
n = 1000
X_raw = np.column_stack([
    np.random.normal(0, 1, n),   # credit score (standardised)
    np.random.normal(0, 1, n),   # emi-to-income ratio
    np.random.normal(0, 1, n),   # employment years
])
y_raw = ((X_raw[:, 0] < -0.3) & (X_raw[:, 1] > 0.4)).astype(float).reshape(-1, 1)

print("Training 3-layer network with manual backprop:")
print(f"{'Epoch':>7} {'Loss':>10} {'Accuracy':>10}")
print("─" * 32)

for epoch in range(300):
    # Mini-batch
    idx = np.random.choice(n, 64, replace=False)
    Xb, yb = X_raw[idx], y_raw[idx]

    # Forward + backward
    pred, cache = forward(Xb)
    grads = backward(yb, cache, lr=0.05)

    if (epoch + 1) % 60 == 0:
        pred_all, _ = forward(X_raw)
        loss = binary_cross_entropy(pred_all, y_raw)
        acc  = ((pred_all > 0.5) == y_raw).mean()
        print(f"  {epoch+1:>5}  {loss:>10.6f}  {acc:>10.4f}")

# ── Gradient magnitudes — sanity check ────────────────────────────────
print(f"\nGradient magnitudes (should be non-zero, not exploding):")
for name, g in grads.items():
    print(f"  {name}: mean={np.abs(g).mean():.6f}  max={np.abs(g).max():.6f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — GRADIENT PROBLEMS ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What goes wrong in deep networks</span>
        <h2 style={S.h2}>Vanishing and exploding gradients — why deep networks were hard before 2015</h2>

        <p style={S.p}>
          The chain rule multiplies gradients across layers.
          In a 10-layer network, the gradient for layer 1's weights is the product
          of 10 terms — one per layer. If each term is slightly less than 1
          (like sigmoid derivatives, which top out at 0.25),
          the product shrinks exponentially. By layer 1, the gradient is
          essentially zero — weights never update. This is
          <strong style={{ color: '#ff4757' }}> vanishing gradients</strong>.
        </p>

        <p style={S.p}>
          The opposite happens if each term is greater than 1.
          The product grows exponentially — gradients explode to billions,
          weights update by enormous amounts, and training diverges.
          This is <strong style={{ color: '#ff4757' }}> exploding gradients</strong>.
        </p>

        <VisualBox label="Gradient magnitude through 10 layers — sigmoid vs relu">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              {
                title: 'Sigmoid — vanishing gradient',
                color: '#D85A30',
                values: [1.0, 0.22, 0.048, 0.011, 0.002, 0.0005, 0.0001, 0.00002, 0.000005, 0.000001],
                note: 'Each sigmoid derivative ≤ 0.25. Product of 10 = ~10⁻⁷. Layer 1 learns nothing.',
              },
              {
                title: 'ReLU — gradient preserved',
                color: '#1D9E75',
                values: [1.0, 0.95, 0.90, 0.85, 0.81, 0.77, 0.73, 0.69, 0.66, 0.63],
                note: 'ReLU derivative is 1 (for positive) or 0. Gradient stays meaningful through all layers.',
              },
            ].map((item) => (
              <div key={item.title}>
                <div style={{ fontSize: 11, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                  {item.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {item.values.map((v, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 9, color: 'var(--muted)', fontFamily: 'var(--font-mono)', minWidth: 55 }}>
                        Layer {i + 1}
                      </span>
                      <div style={{
                        height: 10, borderRadius: 2,
                        width: `${Math.max(v * 120, 1)}px`,
                        background: item.color,
                        opacity: 0.6 + v * 0.4,
                        flexShrink: 0,
                      }} />
                      <span style={{ fontSize: 9, color: item.color, fontFamily: 'var(--font-mono)' }}>
                        {v.toFixed(6)}
                      </span>
                    </div>
                  ))}
                </div>
                <p style={{ ...S.ps, marginBottom: 0, marginTop: 8, fontSize: 11 }}>{item.note}</p>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np

np.random.seed(42)

def sigmoid(z):   return 1 / (1 + np.exp(-np.clip(z, -500, 500)))
def sigmoid_d(z): s = sigmoid(z); return s * (1 - s)
def relu(z):      return np.maximum(0, z)
def relu_d(z):    return (z > 0).astype(float)
def tanh(z):      return np.tanh(z)
def tanh_d(z):    return 1 - np.tanh(z)**2

# ── Simulate gradient flow through 10 layers ──────────────────────────
n_layers  = 10
n_neurons = 32
X_test    = np.random.randn(16, n_neurons)

print("Gradient magnitude at each layer (starting from output):")
print(f"{'Layer':>8}  {'sigmoid':>12}  {'tanh':>12}  {'relu':>12}")
print("─" * 50)

for activation_name, act_fn, act_d in [
    ('sigmoid', sigmoid, sigmoid_d),
    ('tanh',    tanh,    tanh_d),
    ('relu',    relu,    relu_d),
]:
    # Simulate forward pass and track gradient magnitudes
    A = X_test.copy()
    Zs = []
    for _ in range(n_layers):
        W = np.random.randn(n_neurons, n_neurons) * 0.1
        Z = A @ W
        Zs.append(Z)
        A = act_fn(Z)

    # Simulate backward pass — gradient starts at 1.0 at output
    dA = np.ones_like(A)
    grad_norms = []
    for i in reversed(range(n_layers)):
        dZ = dA * act_d(Zs[i])
        grad_norms.insert(0, np.abs(dZ).mean())
        W  = np.random.randn(n_neurons, n_neurons) * 0.1
        dA = dZ @ W.T

    if activation_name == 'sigmoid':
        print("Sigmoid:")
        for i, g in enumerate(grad_norms):
            bar = '█' * int(min(g * 200, 30))
            print(f"  Layer {i+1:2d}: {g:.8f}  {bar}")
    elif activation_name == 'relu':
        print("\nReLU:")
        for i, g in enumerate(grad_norms):
            bar = '█' * int(min(g * 20, 30))
            print(f"  Layer {i+1:2d}: {g:.6f}  {bar}")

# ── Solutions to vanishing gradients ──────────────────────────────────
print("\nSolutions to vanishing gradients:")
print("  1. Use ReLU (or LeakyReLU) instead of sigmoid/tanh in hidden layers")
print("  2. Use He initialisation: scale = sqrt(2/n_inputs)")
print("  3. Use Batch Normalisation — normalises activations between layers")
print("  4. Use residual connections (ResNets) — skip connections bypass layers")
print("  5. Use gradient clipping for exploding gradients: clip_grad_norm_(params, 1.0)")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — GRADIENT CHECKING ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Verifying your implementation</span>
        <h2 style={S.h2}>Gradient checking — the numerical test that proves backprop is correct</h2>

        <p style={S.p}>
          When you implement backprop manually, bugs are easy to introduce —
          a transposed matrix, a missing factor, a wrong sign.
          Gradient checking is the gold standard test: compare every analytical
          gradient (from backprop) to its numerical approximation
          (computed by slightly perturbing each weight and measuring the loss change).
          If they match to within 1e-5, backprop is correct.
        </p>

        <ConceptBox title="Numerical gradient — the two-sided finite difference">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2 }}>
            <div style={{ color: '#7b61ff' }}>
              ∂L/∂W[i,j] ≈ (L(W[i,j]+h) − L(W[i,j]−h)) / (2h)
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
              h = 1e-5  (small enough for accuracy, large enough to avoid float precision issues)<br />
              Two-sided difference is more accurate than one-sided: error is O(h²) vs O(h)<br />
              Do this for every weight element — expensive but definitive
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np

np.random.seed(42)

def relu(z):    return np.maximum(0, z)
def relu_d(z):  return (z > 0).astype(float)
def sigmoid(z): return 1/(1+np.exp(-np.clip(z,-500,500)))

# Small network for gradient checking
W1 = np.random.randn(3, 4) * 0.1;  b1 = np.zeros((1, 4))
W2 = np.random.randn(4, 1) * 0.1;  b2 = np.zeros((1, 1))

X_gc = np.random.randn(5, 3)
y_gc = np.random.randint(0, 2, (5, 1)).astype(float)

def forward_gc(W1, b1, W2, b2, X):
    Z1 = X  @ W1 + b1;  A1 = relu(Z1)
    Z2 = A1 @ W2 + b2;  A2 = sigmoid(Z2)
    return A2, {'X':X,'Z1':Z1,'A1':A1,'Z2':Z2,'A2':A2}

def loss_gc(W1, b1, W2, b2, X, y):
    pred, _ = forward_gc(W1, b1, W2, b2, X)
    eps = 1e-8
    return -np.mean(y*np.log(pred+eps) + (1-y)*np.log(1-pred+eps))

def backward_gc(cache, y):
    n   = y.shape[0]
    dA2 = (cache['A2'] - y) / n
    dW2 = cache['A1'].T @ dA2
    db2 = dA2.sum(axis=0, keepdims=True)
    dA1 = dA2 @ W2.T
    dZ1 = dA1 * relu_d(cache['Z1'])
    dW1 = cache['X'].T @ dZ1
    db1 = dZ1.sum(axis=0, keepdims=True)
    return dW1, db1, dW2, db2

# ── Analytical gradients ───────────────────────────────────────────────
_, cache = forward_gc(W1, b1, W2, b2, X_gc)
dW1_a, db1_a, dW2_a, db2_a = backward_gc(cache, y_gc)

# ── Numerical gradients ────────────────────────────────────────────────
h = 1e-5

def numerical_grad(param, param_name):
    grad = np.zeros_like(param)
    it = np.nditer(param, flags=['multi_index'])
    while not it.finished:
        idx = it.multi_index
        orig = param[idx]

        param[idx] = orig + h
        loss_plus  = loss_gc(W1, b1, W2, b2, X_gc, y_gc)
        param[idx] = orig - h
        loss_minus = loss_gc(W1, b1, W2, b2, X_gc, y_gc)
        param[idx] = orig

        grad[idx] = (loss_plus - loss_minus) / (2 * h)
        it.iternext()
    return grad

dW1_n = numerical_grad(W1, 'W1')
dW2_n = numerical_grad(W2, 'W2')
db1_n = numerical_grad(b1, 'b1')
db2_n = numerical_grad(b2, 'b2')

# ── Compare ───────────────────────────────────────────────────────────
def relative_error(a, n):
    return np.abs(a - n).max() / (np.abs(a).max() + np.abs(n).max() + 1e-10)

print("Gradient check results (relative error < 1e-5 = correct):")
for name, analytical, numerical in [
    ('dW1', dW1_a, dW1_n), ('db1', db1_a, db1_n),
    ('dW2', dW2_a, dW2_n), ('db2', db2_a, db2_n),
]:
    err = relative_error(analytical, numerical)
    status = '✓ correct' if err < 1e-4 else '✗ WRONG — bug in backprop!'
    print(f"  {name}: relative error = {err:.2e}  {status}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — PYTORCH AUTOGRAD ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What PyTorch does for you</span>
        <h2 style={S.h2}>Autograd — PyTorch builds the computational graph and runs backprop automatically</h2>

        <p style={S.p}>
          Everything you coded by hand above — caching intermediate values,
          applying the chain rule at each layer, computing dW and passing
          dA backwards — PyTorch does automatically.
          When you call <span style={S.code as React.CSSProperties}>loss.backward()</span>,
          PyTorch traces the computational graph it built during the forward pass
          and applies the chain rule to every operation automatically.
          Every tensor that had <span style={S.code as React.CSSProperties}>requires_grad=True</span>
          gets its <span style={S.code as React.CSSProperties}>.grad</span> populated.
        </p>

        <CodeBlock code={`import torch
import torch.nn as nn
import numpy as np

torch.manual_seed(42)

# ── Manual backprop vs PyTorch autograd — same network, same result ───

# Data
X = torch.FloatTensor([[0.5, -0.3, 0.8]])   # (1, 3)
y = torch.FloatTensor([[1.0]])               # (1, 1)

# ── Manual backprop (numpy) ────────────────────────────────────────────
np.random.seed(42)
W1_np = np.random.randn(3, 4) * 0.1
b1_np = np.zeros((1, 4))
W2_np = np.random.randn(4, 1) * 0.1
b2_np = np.zeros((1, 1))

X_np, y_np = X.numpy(), y.numpy()
Z1 = X_np @ W1_np + b1_np
A1 = np.maximum(0, Z1)
Z2 = A1  @ W2_np + b2_np
A2 = 1 / (1 + np.exp(-Z2))

dA2  = (A2 - y_np)
dW2_manual = A1.T  @ dA2
dA1  = dA2 @ W2_np.T
dZ1  = dA1 * (Z1 > 0).astype(float)
dW1_manual = X_np.T @ dZ1

# ── PyTorch autograd ───────────────────────────────────────────────────
torch.manual_seed(42)
W1_pt = torch.FloatTensor(W1_np.copy()).requires_grad_(True)
b1_pt = torch.zeros(1, 4, requires_grad=True)
W2_pt = torch.FloatTensor(W2_np.copy()).requires_grad_(True)
b2_pt = torch.zeros(1, 1, requires_grad=True)

# Forward pass — PyTorch records every operation
Z1_pt = X @ W1_pt + b1_pt
A1_pt = torch.relu(Z1_pt)
Z2_pt = A1_pt @ W2_pt + b2_pt
A2_pt = torch.sigmoid(Z2_pt)

loss_pt = nn.BCELoss()(A2_pt, y)

# Backward pass — ONE LINE replaces our entire backward() function
loss_pt.backward()

# ── Compare gradients ──────────────────────────────────────────────────
print("Manual vs PyTorch autograd gradients:")
print(f"  dW1 max difference: {np.abs(dW1_manual - W1_pt.grad.numpy()).max():.2e}")
print(f"  dW2 max difference: {np.abs(dW2_manual - W2_pt.grad.numpy()).max():.2e}")
print("  (should be near 0 — same math, different implementation)")

# ── torch.no_grad() — disable gradient tracking for inference ─────────
print("\ntorch.no_grad() disables the computational graph:")
with torch.no_grad():
    pred = torch.sigmoid(X @ W1_pt + b1_pt @ W2_pt + b2_pt)
    # No graph is built — faster, uses less memory
    # W1_pt.grad will NOT be updated after this block
    print(f"  Prediction (no grad): {pred.item():.4f}")

# ── optimizer.zero_grad() — why gradients must be cleared ─────────────
print("\nWhy optimizer.zero_grad() is required every step:")
print("  PyTorch ACCUMULATES gradients by default — .grad += new_grad")
print("  Without zero_grad(), gradients from step t are added to step t+1")
print("  This is intentional for gradient accumulation techniques")
print("  But for standard training: always call zero_grad() before backward()")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common backprop mistake — explained and fixed</h2>

        <ErrorBlock
          error="Gradients are all zero — loss does not decrease after many epochs"
          cause="Dead network — all ReLU neurons are producing zero output. This happens when weights are initialised too negatively (all pre-activations are negative, ReLU outputs zero, ReLU derivative is zero, no gradient flows). Also caused by a learning rate so large that weights jumped to very negative values in the first step."
          fix="Use He initialisation for ReLU networks: nn.init.kaiming_normal_(layer.weight, mode='fan_in'). Reduce learning rate by 10×. Check: print(model.layer.weight.grad.abs().max()) after the first backward() — if zero, the network is dead. Use LeakyReLU instead of ReLU: nn.LeakyReLU(0.01) passes a small fraction of negative inputs, preventing neurons from dying completely."
        />

        <ErrorBlock
          error="RuntimeError: Trying to backward through the graph a second time"
          cause="You called loss.backward() twice on the same computational graph. PyTorch frees the intermediate values (activations cached during forward pass) after the first backward() call to save memory. The second call finds the graph already freed and raises this error. Common in custom training loops where backward() is called inside a loop."
          fix="Call loss.backward() exactly once per training step. If you genuinely need to call it twice (gradient accumulation, custom second-order methods), use loss.backward(retain_graph=True) on the first call — this keeps the graph in memory. But for standard training this should never be needed — restructure the loop so backward() is called once per step."
        />

        <ErrorBlock
          error="Gradients are correct on small inputs but become NaN on larger batches"
          cause="Numerical overflow in the forward pass. Sigmoid or softmax with very large inputs produce exp() values that overflow float32 (max ~3.4e38). This produces inf or NaN in the activations, which propagates through backprop as NaN gradients. Also caused by log(0) in cross-entropy loss when a prediction is exactly 0 or 1."
          fix="Clip inputs to sigmoid: sigmoid(np.clip(z, -500, 500)). Add eps to log: -mean(y * log(pred + 1e-8)). In PyTorch, use nn.BCEWithLogitsLoss() instead of nn.Sigmoid() + nn.BCELoss() — it combines both in a numerically stable way using the log-sum-exp trick. Normalise inputs with StandardScaler before training."
        />

        <ErrorBlock
          error="Manual backprop gradient check fails — large relative error between analytical and numerical"
          cause="Bug in the analytical gradient computation. Most common mistakes: wrong matrix transpose (A.T @ dZ vs dZ @ A.T), missing the activation derivative (forgetting to multiply by relu_d(Z) or sigmoid_d(Z)), dividing by n in the wrong place, or accumulating gradients incorrectly across the batch dimension."
          fix="Debug one layer at a time — freeze all other weights and check only one layer's gradient. Print the shapes at every step: dA should match A in shape, dW should match W in shape. The most common error is a transposed matrix: remember dW = A_prev.T @ dZ (input-transposed times upstream gradient) and dA_prev = dZ @ W.T (upstream gradient times weight-transposed)."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You understand how networks learn. Next: what they learn through.
        </h2>

        <p style={S.p}>
          Backpropagation is the learning algorithm. But the network's
          ability to learn depends critically on two other choices:
          the activation function (what non-linearity to apply at each neuron)
          and the loss function (what the network is trying to minimise).
          Module 43 covers every major activation and loss function —
          what each one does, when to use it, and the numerical stability
          pitfalls that trip up every practitioner at least once.
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
              Next — Module 43 · Deep Learning
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Activation Functions and Loss Functions
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              ReLU, GELU, Swish, sigmoid, softmax — and cross-entropy,
              MSE, Huber, focal loss. When to use each and why numerical
              stability matters more than you think.
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
          'Backpropagation solves credit assignment — given a prediction error, how much is each weight responsible? It applies the chain rule backwards through the network: start at the loss, multiply derivatives layer by layer back to the weights.',
          'Each layer in the backward pass produces two things: the gradient for its own weights (∂L/∂W = A_prev.T @ dZ) and the gradient to pass further backward (∂L/∂A_prev = dZ @ W.T). This pattern repeats identically for every layer.',
          'Vanishing gradients happen when derivatives multiply to near-zero across many layers — sigmoid derivatives top out at 0.25, so 10 layers gives 0.25^10 ≈ 10^-7. The fix is ReLU activation, which has derivative 1 for positive inputs and preserves gradient magnitude.',
          'Gradient checking is the definitive test for correct backprop: compare analytical gradients (from backprop) to numerical gradients (finite difference). Relative error below 1e-5 means your implementation is correct. Always gradient-check before training a new network architecture.',
          'PyTorch autograd builds a computational graph during the forward pass and runs backprop automatically on loss.backward(). Every tensor with requires_grad=True gets its .grad populated. Call optimizer.zero_grad() before every backward() — PyTorch accumulates gradients by default.',
          'Three practical rules: use BCEWithLogitsLoss instead of Sigmoid+BCELoss for numerical stability, always clip sigmoid inputs to avoid overflow, and call optimizer.zero_grad() at the start of every training step without exception.',
        ]}
      />
    </LearnLayout>
  )
}