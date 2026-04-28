import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Derivatives, Gradients and the Chain Rule — Chaduvuko',
  description:
    'The mathematical engine behind every learning algorithm. Understand how neural networks figure out which direction to improve — from scratch, visually, before a single formula.',
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

function MathBox({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: 10,
      overflow: 'hidden', marginBottom: 24,
    }}>
      <div style={{
        padding: '8px 14px', background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#7F77DD' }} />
        <span style={{
          fontSize: 11, fontWeight: 700, color: '#7F77DD',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.07em',
          textTransform: 'uppercase' as const,
        }}>
          {label}
        </span>
        <span style={{ fontSize: 10, color: 'var(--muted)', marginLeft: 'auto' }}>
          optional — read when ready
        </span>
      </div>
      <div style={{ padding: '16px 20px', background: 'var(--bg2)' }}>
        {children}
      </div>
    </div>
  )
}

export default function DerivativesGradientsPage() {
  return (
    <LearnLayout
      title="Derivatives, Gradients and the Chain Rule"
      description="The mathematical engine behind every learning algorithm. How neural networks figure out which direction to improve — explained from scratch before any formula."
      section="Math Foundations"
      readTime="30–40 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section='math-foundations' topic='derivatives-and-gradients' />

      {/* ══ SECTION 1 — THE PROBLEM ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The problem that calculus solves</span>
        <h2 style={S.h2}>
          Your model made a wrong prediction. Which number do you change — and by how much?
        </h2>

        <p style={S.p}>
          Go back to the DoorDash delivery model. You trained a linear regression.
          For an order with distance 4km, the model predicts 28 minutes.
          The actual delivery took 37 minutes. The model is off by 9 minutes.
        </p>

        <p style={S.p}>
          You know you need to adjust the model's internal numbers — its weights and bias.
          But which direction? Make the weight bigger or smaller?
          Make the bias bigger or smaller? By exactly how much?
          And if you have 100 weights, how do you know which ones are responsible
          for the error and by how much each one contributed?
        </p>

        <p style={S.p}>
          This is the exact problem that derivatives and gradients solve.
          Not abstractly — literally this problem, for every weight in every model,
          computed automatically thousands of times per second during training.
        </p>

        <HBox color="#7F77DD">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              What this module teaches:
            </span>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'What a derivative is — in plain English, with a physical intuition',
              'What a gradient is — a derivative extended to multiple dimensions',
              'What the chain rule is — and why it IS backpropagation',
              'How gradient descent uses derivatives to update every weight in a model',
              'How partial derivatives work — measuring the contribution of each weight independently',
              'How to compute gradients automatically in NumPy and PyTorch',
              'What vanishing and exploding gradients are — the two failure modes of deep networks',
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
          You do not need to have studied calculus. This module teaches
          everything from first principles. If you have studied calculus,
          you'll recognise the ideas — but the ML-specific framing
          and the intuition for why each piece matters will be new.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — WHAT A DERIVATIVE IS ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The intuition</span>
        <h2 style={S.h2}>What a derivative actually is</h2>

        <p style={S.p}>
          Forget the textbook definition for a moment.
          Here is the most useful way to think about a derivative in ML:
        </p>

        <HBox color="#378ADD">
          <p style={{ ...S.p, marginBottom: 0, fontSize: 16 }}>
            A derivative answers one question:{' '}
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              if I nudge this input slightly, how much does the output change?
            </span>
          </p>
        </HBox>

        <p style={S.p}>
          That's it. Nothing more. In ML, the "input" is a weight.
          The "output" is the loss (the error).
          The derivative tells you: if I increase this weight by a tiny amount,
          does the loss go up or down, and by roughly how much?
        </p>

        <p style={S.p}>
          If the derivative is positive: increasing the weight makes the loss worse.
          So you should decrease the weight.
          If the derivative is negative: increasing the weight makes the loss better.
          So you should increase the weight.
          The sign of the derivative tells you which direction to move.
          The magnitude tells you how fast the loss is changing — how steep the slope is.
        </p>

        <h3 style={S.h3}>The hill analogy — the one that actually works</h3>

        <p style={S.p}>
          Imagine you're standing on a hilly landscape blindfolded.
          Your goal is to walk to the lowest point — the valley.
          You can't see anything but you can feel the slope under your feet.
        </p>

        <p style={S.p}>
          The derivative is that feeling. It tells you which direction is
          downhill right where you're standing. You take a small step downhill.
          Feel the slope again. Take another step. Repeat.
          Eventually you reach the bottom — the lowest loss, the best model.
          That process of repeatedly stepping downhill is gradient descent.
          The derivative is what tells you which way is downhill.
        </p>

        <VisualBox label="Loss landscape — derivative tells you the slope at your current position">
          <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
            {/* Curve approximation using positioned divs */}
            <svg width="100%" height="200" viewBox="0 0 600 200" preserveAspectRatio="none">
              {/* Loss curve */}
              <path
                d="M 0 40 C 80 20, 120 180, 200 160 C 260 145, 280 30, 320 20 C 360 10, 400 100, 480 140 C 520 160, 560 155, 600 150"
                fill="none"
                stroke="#378ADD"
                strokeWidth="2.5"
              />
              {/* Current position marker */}
              <circle cx="200" cy="160" r="7" fill="#00e676" />
              {/* Tangent line at current position */}
              <line x1="140" y1="178" x2="260" y2="142" stroke="#00e676" strokeWidth="1.5" strokeDasharray="5,4" />
              {/* Global minimum marker */}
              <circle cx="320" cy="20" r="5" fill="#D85A30" />

              {/* Labels */}
              <text x="195" y="185" fontFamily="monospace" fontSize="11" fill="#00e676">you are here</text>
              <text x="290" y="15" fontFamily="monospace" fontSize="11" fill="#D85A30">global min</text>
              <text x="10" y="195" fontFamily="monospace" fontSize="10" fill="#888">weight value →</text>
              <text x="10" y="20" fontFamily="monospace" fontSize="10" fill="#888">loss ↑</text>
              {/* Arrow showing direction to move */}
              <path d="M 200 155 L 270 130" stroke="#00e676" strokeWidth="1.5" fill="none"
                markerEnd="url(#arrowhead)" strokeDasharray="none" />
              <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#00e676" />
                </marker>
              </defs>
              <text x="230" y="125" fontFamily="monospace" fontSize="10" fill="#00e676">move right</text>
              <text x="230" y="138" fontFamily="monospace" fontSize="10" fill="#00e676">(negative slope)</text>
            </svg>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8, lineHeight: 1.6 }}>
            The green dot is the current weight value. The dashed line is the tangent — its slope IS the derivative at that point.
            Negative slope means moving right (increasing weight) decreases loss. So we increase this weight.
          </div>
        </VisualBox>

        <h3 style={S.h3}>A concrete numerical example</h3>

        <p style={S.p}>
          Let's make this completely concrete. Suppose the loss function is
          simply <span style={S.code as React.CSSProperties}>L = w²</span> (weight squared).
          At w = 3, loss = 9.
          At w = 3.001 (tiny nudge), loss = 9.006.
          The loss increased by 0.006 when we increased w by 0.001.
          That ratio — 0.006 / 0.001 = 6 — is the derivative at w = 3.
        </p>

        <p style={S.p}>
          The derivative says: at w = 3, increasing w by 1 would increase
          loss by approximately 6. So to reduce loss, we should decrease w.
          Move in the opposite direction of the derivative.
        </p>

        <CodeBlock code={`import numpy as np

# Loss function: L = w^2
# The derivative of w^2 with respect to w is 2w (calculus rule)
# At w=3: derivative = 2*3 = 6

def loss(w):
    return w ** 2

def derivative_of_loss(w):
    return 2 * w   # exact derivative from calculus

# Numerical approximation — the definition of a derivative
# derivative = (f(w + tiny) - f(w)) / tiny   as tiny → 0
def numerical_derivative(f, w, h=1e-5):
    return (f(w + h) - f(w)) / h

w = 3.0
print(f"Loss at w=3:          {loss(w):.4f}")          # 9.0
print(f"Exact derivative:     {derivative_of_loss(w):.4f}")   # 6.0
print(f"Numerical derivative: {numerical_derivative(loss, w):.4f}")  # ~6.0

# What the derivative tells us:
deriv = derivative_of_loss(w)
if deriv > 0:
    print(f"Derivative is positive ({deriv:.1f}) → increase w increases loss → DECREASE w")
elif deriv < 0:
    print(f"Derivative is negative ({deriv:.1f}) → increase w decreases loss → INCREASE w")
else:
    print("Derivative is 0 → we are at a minimum!")

# One gradient descent step
learning_rate = 0.1
w_new = w - learning_rate * deriv   # move opposite to derivative
print(f"w before: {w:.2f}, w after one step: {w_new:.2f}")  # 3.0 → 2.4
print(f"Loss before: {loss(w):.4f}, loss after: {loss(w_new):.4f}")   # 9.0 → 5.76`} />

        <h3 style={S.h3}>The derivative rules you need in ML</h3>

        <p style={S.p}>
          You don't need to derive anything from scratch.
          Autograd (PyTorch, JAX) computes derivatives automatically.
          But you should recognise these four rules because they appear
          in every explanation of backpropagation and every ML paper.
        </p>

        <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            background: 'var(--surface)', borderBottom: '1px solid var(--border)',
            padding: '9px 14px',
          }}>
            {['Function f(w)', 'Derivative df/dw', 'Where it appears in ML'].map((h) => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                {h}
              </span>
            ))}
          </div>
          {[
            ['c  (constant)', '0', 'Bias terms at a minimum'],
            ['w  (identity)', '1', 'Pass-through in chain rule'],
            ['w²', '2w', 'MSE loss, weight decay'],
            ['wⁿ', 'n·wⁿ⁻¹', 'Power rule — base of all calculus'],
            ['e^w', 'e^w', 'Softmax, sigmoid activations'],
            ['ln(w)', '1/w', 'Cross-entropy loss'],
            ['max(0, w) — ReLU', '1 if w>0 else 0', 'ReLU activation derivative'],
            ['sigmoid σ(w)', 'σ(w)·(1 − σ(w))', 'Sigmoid activation'],
          ].map((row, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              padding: '9px 14px',
              borderBottom: i < 7 ? '1px solid var(--border)' : 'none',
              background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
            }}>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#378ADD' }}>{row[0]}</span>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#D85A30' }}>{row[1]}</span>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>{row[2]}</span>
            </div>
          ))}
        </div>
      </div>

      <Div />

      {/* ══ SECTION 3 — GRADIENT ═══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>From one weight to many</span>
        <h2 style={S.h2}>The gradient — a derivative for every weight simultaneously</h2>

        <p style={S.p}>
          A derivative measures how one output changes when one input changes.
          But a real ML model has thousands or billions of weights.
          When the model makes a prediction, every single weight contributed
          to the error. We need to know how each one contributed — independently.
        </p>

        <p style={S.p}>
          The <strong>gradient</strong> is the vector of all partial derivatives
          — one for each weight. Each partial derivative answers:
          holding all other weights fixed, how much does the loss change
          if I nudge just this one weight?
        </p>

        <VisualBox label="Gradient — one partial derivative per weight">
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div>
              <div style={{
                fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)',
                marginBottom: 8,
              }}>
                Model weights (w₁, w₂, w₃, w₄)
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {[
                  { w: 'w₁', val: '7.3', color: '#378ADD' },
                  { w: 'w₂', val: '2.1', color: '#1D9E75' },
                  { w: 'w₃', val: '0.9', color: '#BA7517' },
                  { w: 'w₄', val: '3.5', color: '#D85A30' },
                ].map((item) => (
                  <div key={item.w} style={{
                    width: 52, padding: '10px 6px',
                    borderRadius: 6, textAlign: 'center' as const,
                    background: `${item.color}10`,
                    border: `1.5px solid ${item.color}40`,
                  }}>
                    <div style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                      {item.w}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ fontSize: 20, color: 'var(--muted)', paddingTop: 30 }}>→</div>

            <div>
              <div style={{
                fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)',
                marginBottom: 8,
              }}>
                Gradient ∇L (one value per weight)
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {[
                  { dw: '∂L/∂w₁', val: '+0.42', color: '#378ADD', meaning: 'increase w₁ → loss increases' },
                  { dw: '∂L/∂w₂', val: '-1.17', color: '#1D9E75', meaning: 'increase w₂ → loss decreases' },
                  { dw: '∂L/∂w₃', val: '+0.03', color: '#BA7517', meaning: 'barely affects loss' },
                  { dw: '∂L/∂w₄', val: '-0.88', color: '#D85A30', meaning: 'increase w₄ → loss decreases' },
                ].map((item) => (
                  <div key={item.dw} style={{
                    width: 52, padding: '10px 6px',
                    borderRadius: 6, textAlign: 'center' as const,
                    background: `${item.color}10`,
                    border: `1.5px solid ${item.color}40`,
                  }}>
                    <div style={{ fontSize: 9, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                      {item.dw}
                    </div>
                    <div style={{
                      fontSize: 13, fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      color: item.val.startsWith('+') ? '#ff4757' : '#00e676',
                    }}>
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 10, lineHeight: 1.6 }}>
                gradient = [+0.42, −1.17, +0.03, −0.88]<br />
                w_new = w − lr × gradient (subtract to go downhill)
              </div>
            </div>
          </div>
        </VisualBox>

        <p style={S.p}>
          The gradient points in the direction of steepest ascent — uphill.
          To reduce the loss, we go the opposite direction: we subtract
          the gradient from the weights. The learning rate controls
          how big each step is.
        </p>

        <CodeBlock code={`import numpy as np

# Simple linear regression: predict delivery time from distance
# Loss = Mean Squared Error = (1/n) * sum((y_pred - y_true)^2)
# y_pred = w * x + b

np.random.seed(42)
n = 100
x = np.random.uniform(0.5, 8.0, n)           # distance in km
y_true = 8.6 + 7.3 * x + np.random.randn(n) * 3  # actual delivery time

# Initialise weights randomly
w = np.random.randn()   # slope
b = np.random.randn()   # intercept

def predict(w, b, x):
    return w * x + b

def mse_loss(y_pred, y_true):
    return np.mean((y_pred - y_true) ** 2)

# ── Compute gradients manually ────────────────────────────────────────
# Loss L = (1/n) * sum((w*x + b - y)^2)
# ∂L/∂w = (2/n) * sum((w*x + b - y) * x)   ← partial derivative w.r.t. w
# ∂L/∂b = (2/n) * sum((w*x + b - y))        ← partial derivative w.r.t. b

def compute_gradients(w, b, x, y_true):
    n = len(x)
    y_pred = predict(w, b, x)
    error  = y_pred - y_true           # residuals: shape (n,)

    dL_dw = (2/n) * np.sum(error * x)  # gradient w.r.t. weight
    dL_db = (2/n) * np.sum(error)       # gradient w.r.t. bias

    return dL_dw, dL_db

# One gradient step
dL_dw, dL_db = compute_gradients(w, b, x, y_true)
print(f"Initial w={w:.3f}, b={b:.3f}")
print(f"Gradient dL/dw={dL_dw:.3f}, dL/db={dL_db:.3f}")

learning_rate = 0.01
w = w - learning_rate * dL_dw   # step opposite to gradient
b = b - learning_rate * dL_db

y_pred = predict(w, b, x)
print(f"Loss after one step: {mse_loss(y_pred, y_true):.4f}")

# The gradient of w tells us: for every 1-unit increase in w,
# loss increases by dL_dw units.
# Since we want to DECREASE loss, we move in the OPPOSITE direction.`} />

        <h3 style={S.h3}>The gradient is a vector — it has direction and magnitude</h3>

        <p style={S.p}>
          Think of the gradient as an arrow in weight space.
          Its direction points toward increasing loss (uphill).
          Its magnitude tells you how steep the slope is — a large magnitude
          means a steep slope, small magnitude means nearly flat.
          We follow the arrow backwards to descend.
        </p>

        <p style={S.p}>
          This is also why the learning rate matters so much.
          If it's too large, you overshoot the minimum and bounce around.
          If it's too small, you take tiny steps and training takes forever.
          The learning rate scales how far you travel along the gradient arrow.
        </p>

        <VisualBox label="Learning rate — the Goldilocks problem">
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              {
                lr: 'Too large (0.9)',
                color: '#ff4757',
                desc: 'Overshoots the minimum. Loss bounces up and down or diverges to infinity.',
                icon: '↔️',
              },
              {
                lr: 'Too small (0.00001)',
                color: '#BA7517',
                desc: 'Takes millions of steps to converge. Training feels stuck. Practically unusable.',
                icon: '🐌',
              },
              {
                lr: 'Just right (0.001–0.01)',
                color: '#00e676',
                desc: 'Steady descent toward minimum. Loss decreases smoothly every epoch.',
                icon: '✓',
              },
            ].map((item) => (
              <div key={item.lr} style={{
                flex: 1, minWidth: 160,
                background: 'var(--surface)', border: `1px solid ${item.color}40`,
                borderRadius: 8, padding: '13px 15px',
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 700, color: item.color,
                  fontFamily: 'var(--font-mono)', marginBottom: 6,
                }}>
                  {item.lr}
                </div>
                <p style={{ ...S.ps, marginBottom: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </VisualBox>
      </div>

      <Div />

      {/* ══ SECTION 4 — GRADIENT DESCENT FULL LOOP ════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The training loop</span>
        <h2 style={S.h2}>Gradient descent — the full training loop from scratch</h2>

        <p style={S.p}>
          Gradient descent is not one step. It's a loop that runs hundreds
          or thousands of times — once per epoch. Each iteration computes
          the gradient for every weight, then updates every weight simultaneously.
          After enough iterations, the weights have settled at values
          that minimise the loss.
        </p>

        <p style={S.p}>
          There are three variants of gradient descent, each making a different
          tradeoff between accuracy and speed.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              name: 'Batch Gradient Descent',
              color: '#378ADD',
              how: 'Use ALL training examples to compute the gradient before taking one step.',
              pros: 'Stable, accurate gradient estimate. Guaranteed to converge for convex problems.',
              cons: 'Extremely slow for large datasets — you process 1 million examples just to take one step.',
              use: 'Almost never used in modern ML. Too slow.',
            },
            {
              name: 'Stochastic Gradient Descent (SGD)',
              color: '#D85A30',
              how: 'Use ONE random training example to estimate the gradient and take one step.',
              pros: 'Very fast — one step per example. Can escape shallow local minima due to noise.',
              cons: 'Noisy gradient estimates. Loss bounces up and down. Hard to converge precisely.',
              use: 'Used in online learning and some specific scenarios. Less common for deep learning.',
            },
            {
              name: 'Mini-batch Gradient Descent',
              color: '#1D9E75',
              how: 'Use a small batch (typically 32–256 examples) to estimate the gradient each step.',
              pros: 'Best of both: stable enough, fast enough. GPU hardware is optimised for batches.',
              cons: 'Batch size is another hyperparameter to tune. Very small batches can be noisy.',
              use: 'The standard in all deep learning. When people say "SGD" in DL, they mean this.',
            },
          ].map((item) => (
            <div key={item.name} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '15px 18px',
              borderLeft: `3px solid ${item.color}`,
            }}>
              <div style={{
                fontSize: 14, fontWeight: 700, color: 'var(--text)',
                fontFamily: 'var(--font-display)', marginBottom: 6,
              }}>
                {item.name}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[
                  { label: 'How', val: item.how },
                  { label: 'Pros', val: item.pros },
                  { label: 'Cons', val: item.cons },
                  { label: 'Used when', val: item.use },
                ].map((row) => (
                  <div key={row.label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: item.color,
                      fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
                      textTransform: 'uppercase' as const, minWidth: 64, paddingTop: 2,
                    }}>
                      {row.label}
                    </span>
                    <span style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}>
                      {row.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <CodeBlock code={`# Complete gradient descent training loop for DoorDash delivery prediction

np.random.seed(42)
n = 1000
x = np.random.uniform(0.5, 8.0, n)
y_true = 8.6 + 7.3 * x + np.random.randn(n) * 3

w = 0.0   # start from scratch
b = 0.0

learning_rate = 0.01
batch_size    = 32
epochs        = 100
losses        = []

n_batches = n // batch_size

for epoch in range(epochs):
    # Shuffle data at the start of each epoch
    # Shuffling prevents the model from memorising the order
    indices = np.random.permutation(n)
    x_shuffled = x[indices]
    y_shuffled = y_true[indices]

    epoch_loss = 0.0

    for i in range(n_batches):
        # Extract one mini-batch
        start = i * batch_size
        end   = start + batch_size
        x_batch = x_shuffled[start:end]   # shape (32,)
        y_batch = y_shuffled[start:end]   # shape (32,)

        # Forward pass: compute predictions
        y_pred = w * x_batch + b          # shape (32,)

        # Compute loss on this batch
        batch_loss = np.mean((y_pred - y_batch) ** 2)
        epoch_loss += batch_loss

        # Backward pass: compute gradients
        error = y_pred - y_batch
        dL_dw = (2 / batch_size) * np.sum(error * x_batch)
        dL_db = (2 / batch_size) * np.sum(error)

        # Update weights — move opposite to gradient
        w = w - learning_rate * dL_dw
        b = b - learning_rate * dL_db

    losses.append(epoch_loss / n_batches)

    if epoch % 10 == 0:
        rmse = np.sqrt(losses[-1])
        print(f"Epoch {epoch:3d} | Loss: {losses[-1]:.4f} | RMSE: {rmse:.2f} min")

print(f"\nLearned: w = {w:.4f} (true: 7.3), b = {b:.4f} (true: 8.6)")
# Epoch   0 | Loss: 312.4  | RMSE: 17.67 min   ← terrible, just started
# Epoch  10 | Loss: 42.8   | RMSE: 6.54 min
# Epoch  50 | Loss: 10.2   | RMSE: 3.19 min
# Epoch  90 | Loss: 9.1    | RMSE: 3.02 min    ← close to true noise level
# Learned: w = 7.2891 (true: 7.3), b = 8.6432 (true: 8.6)  ← recovered!`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — CHAIN RULE ═════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most important rule</span>
        <h2 style={S.h2}>The chain rule — this IS backpropagation</h2>

        <p style={S.p}>
          A neural network is a chain of functions. Input goes into layer 1,
          layer 1's output goes into layer 2, layer 2's output goes into layer 3,
          and so on until we reach the loss.
          To train the network, we need the gradient of the loss
          with respect to every weight in every layer.
        </p>

        <p style={S.p}>
          The chain rule is the calculus rule that makes this possible.
          It says: if y depends on u which depends on x,
          then the derivative of y with respect to x equals
          the derivative of y with respect to u,
          multiplied by the derivative of u with respect to x.
        </p>

        <HBox color="#D85A30">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              The chain rule in plain English:{' '}
            </span>
            to find how much the final output changes when an early input changes,
            multiply the sensitivities at each step along the chain.
          </p>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 14,
            color: '#D85A30', padding: '8px 12px',
            background: 'rgba(216,90,48,0.08)',
            borderRadius: 6, textAlign: 'center' as const,
          }}>
            dy/dx = (dy/du) × (du/dx)
          </div>
        </HBox>

        <h3 style={S.h3}>A real example: three steps, one chain</h3>

        <p style={S.p}>
          Suppose a delivery time prediction goes through three steps:
        </p>

        <VisualBox label="Chain of operations — how loss connects back to the first weight">
          <div style={{ display: 'flex', gap: 0, alignItems: 'stretch', flexWrap: 'wrap' }}>
            {[
              { label: 'x (distance)', arrow: '→', op: 'Step 1: u = w·x + b', color: '#378ADD' },
              { label: 'u (linear)', arrow: '→', op: 'Step 2: a = ReLU(u)', color: '#1D9E75' },
              { label: 'a (activated)', arrow: '→', op: 'Step 3: L = (a − y)²', color: '#BA7517' },
              { label: 'L (loss)', arrow: '', op: '', color: '#D85A30' },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <div style={{
                  padding: '8px 12px', borderRadius: 7,
                  background: `${step.color}10`,
                  border: `1.5px solid ${step.color}40`,
                  textAlign: 'center' as const,
                }}>
                  <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: step.color, fontWeight: 700 }}>
                    {step.label}
                  </div>
                  {step.op && (
                    <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3 }}>
                      {step.op}
                    </div>
                  )}
                </div>
                {step.arrow && (
                  <span style={{ fontSize: 18, color: 'var(--muted)' }}>→</span>
                )}
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 14, padding: '10px 14px',
            background: 'var(--surface)', borderRadius: 6,
            border: '1px solid var(--border)', fontSize: 12,
            color: 'var(--muted)', lineHeight: 1.8, fontFamily: 'var(--font-mono)',
          }}>
            <div style={{ color: '#D85A30', marginBottom: 4 }}>Chain rule applied backwards (backpropagation):</div>
            ∂L/∂w = (∂L/∂a) × (∂a/∂u) × (∂u/∂w)<br />
            <span style={{ color: '#BA7517' }}>∂L/∂a = 2(a − y)</span>  {' '}
            <span style={{ color: '#1D9E75' }}>∂a/∂u = 1 if u&gt;0 else 0</span>  {' '}
            <span style={{ color: '#378ADD' }}>∂u/∂w = x</span><br />
            ∂L/∂w = 2(a − y) × (1 if u&gt;0 else 0) × x
          </div>
        </VisualBox>

        <p style={S.p}>
          Backpropagation is literally the chain rule applied backwards
          through the network — starting at the loss and working backward
          toward the input, multiplying the local derivatives at each step.
          "Backpropagation" is just a name for this process.
          There is no separate algorithm — it's the chain rule.
        </p>

        <CodeBlock code={`# Chain rule implemented manually for a tiny 2-layer network

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def sigmoid_derivative(x):
    s = sigmoid(x)
    return s * (1 - s)   # derivative of sigmoid

def relu(x):
    return np.maximum(0, x)

def relu_derivative(x):
    return (x > 0).astype(float)   # 1 where x > 0, 0 elsewhere

np.random.seed(42)
n = 32

# Network: input(4) → hidden(8) → output(1)
x = np.random.randn(n, 4)
y = np.random.randn(n, 1)

W1 = np.random.randn(4, 8) * 0.1
b1 = np.zeros((1, 8))
W2 = np.random.randn(8, 1) * 0.1
b2 = np.zeros((1, 1))

lr = 0.01

for step in range(5):
    # ── Forward pass ──────────────────────────────────────────────────
    Z1 = x @ W1 + b1          # (32,4) @ (4,8) → (32,8)
    A1 = relu(Z1)              # (32,8) — apply ReLU

    Z2 = A1 @ W2 + b2          # (32,8) @ (8,1) → (32,1)
    y_pred = Z2                # linear output (regression)

    loss = np.mean((y_pred - y) ** 2)

    # ── Backward pass — chain rule applied backwards ───────────────────
    # Start at loss, work backwards to W1

    # Gradient of loss w.r.t. output (∂L/∂y_pred)
    dL_dZ2 = 2 * (y_pred - y) / n         # (32,1)

    # Gradient w.r.t. W2 (∂L/∂W2) = A1ᵀ @ dL_dZ2
    dL_dW2 = A1.T @ dL_dZ2               # (8,32) @ (32,1) → (8,1)
    dL_db2 = dL_dZ2.sum(axis=0)

    # Gradient w.r.t. A1 — chain through W2
    dL_dA1 = dL_dZ2 @ W2.T               # (32,1) @ (1,8) → (32,8)

    # Gradient through ReLU (∂A1/∂Z1 = relu_derivative(Z1))
    dL_dZ1 = dL_dA1 * relu_derivative(Z1)  # element-wise: chain rule

    # Gradient w.r.t. W1 (∂L/∂W1) = xᵀ @ dL_dZ1
    dL_dW1 = x.T @ dL_dZ1               # (4,32) @ (32,8) → (4,8)
    dL_db1 = dL_dZ1.sum(axis=0)

    # ── Weight update ──────────────────────────────────────────────────
    W2 -= lr * dL_dW2
    b2 -= lr * dL_db2
    W1 -= lr * dL_dW1
    b1 -= lr * dL_db1

    print(f"Step {step+1}: loss = {loss:.6f}")

# This is EXACTLY what PyTorch's loss.backward() does automatically.
# The only difference: PyTorch builds a computation graph and
# differentiates it symbolically. Same chain rule. No magic.`} />

        <Callout type="info">
          The code above is manual backpropagation.
          PyTorch's <span style={S.code as React.CSSProperties}>loss.backward()</span>{' '}
          does the exact same thing automatically for any network,
          no matter how deep. The next section shows you how autograd works.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 6 — PARTIAL DERIVATIVES ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Multi-variable calculus</span>
        <h2 style={S.h2}>Partial derivatives — isolating each weight's contribution</h2>

        <p style={S.p}>
          A partial derivative answers: how does the output change when
          I change one specific input, holding everything else constant?
          The notation is ∂L/∂w (curly d, not straight d) to signal
          that other variables are being held fixed.
        </p>

        <p style={S.p}>
          In a neural network with 100 million weights, we compute 100 million
          partial derivatives — one for every weight. This sounds impossibly
          expensive. It's not, because the chain rule lets us reuse intermediate
          computations efficiently. This is called the "backpropagation algorithm"
          and it computes all 100 million gradients in roughly the same time
          as one forward pass.
        </p>

        <CodeBlock code={`# Partial derivatives — isolating each weight's effect

# Loss function with two weights: L = (w1*x1 + w2*x2 - y)^2
# ∂L/∂w1 = 2*(w1*x1 + w2*x2 - y) * x1   (treat w2 as constant)
# ∂L/∂w2 = 2*(w1*x1 + w2*x2 - y) * x2   (treat w1 as constant)

x1, x2 = 3.0, 1.5   # two features: distance, traffic score
y = 35.0             # actual delivery time
w1, w2 = 6.0, 2.0   # current weights

def loss_2d(w1, w2):
    y_pred = w1 * x1 + w2 * x2
    return (y_pred - y) ** 2

def partial_w1(w1, w2):
    error = (w1 * x1 + w2 * x2 - y)
    return 2 * error * x1

def partial_w2(w1, w2):
    error = (w1 * x1 + w2 * x2 - y)
    return 2 * error * x2

dL_dw1 = partial_w1(w1, w2)
dL_dw2 = partial_w2(w1, w2)

print(f"Prediction: {w1*x1 + w2*x2:.1f} min (actual: {y} min)")
print(f"∂L/∂w1 = {dL_dw1:.3f}  → w1 change contributes {abs(dL_dw1):.1f}× to loss change")
print(f"∂L/∂w2 = {dL_dw2:.3f}  → w2 change contributes {abs(dL_dw2):.1f}× to loss change")
print(f"\nGradient vector: [{dL_dw1:.3f}, {dL_dw2:.3f}]")

# Verify with numerical approximation
h = 1e-5
numerical_w1 = (loss_2d(w1 + h, w2) - loss_2d(w1, w2)) / h
numerical_w2 = (loss_2d(w1, w2 + h) - loss_2d(w1, w2)) / h
print(f"\nNumerical check: [{numerical_w1:.3f}, {numerical_w2:.3f}]")
# Should match partial derivatives above ✓

# Gradient step
lr = 0.01
w1_new = w1 - lr * dL_dw1
w2_new = w2 - lr * dL_dw2
print(f"\nBefore: w1={w1:.2f}, w2={w2:.2f}")
print(f"After:  w1={w1_new:.2f}, w2={w2_new:.2f}")
print(f"Loss before: {loss_2d(w1, w2):.2f}, after: {loss_2d(w1_new, w2_new):.2f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — AUTOGRAD ═══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>In practice</span>
        <h2 style={S.h2}>Autograd — how PyTorch computes gradients automatically</h2>

        <p style={S.p}>
          In real ML projects, you never compute gradients by hand.
          PyTorch's autograd engine builds a computation graph as you
          run the forward pass — tracking every operation.
          When you call <span style={S.code as React.CSSProperties}>loss.backward()</span>,
          it traverses that graph backwards and computes all gradients
          using the chain rule automatically.
        </p>

        <p style={S.p}>
          You don't need to install PyTorch right now — NumPy is sufficient
          for everything in this math section. But understanding how autograd
          works conceptually prepares you for the Deep Learning section
          where you'll use it constantly.
        </p>

        <CodeBlock code={`# How autograd works conceptually — using NumPy to simulate it

# In PyTorch you would do:
# import torch
# w = torch.tensor(3.0, requires_grad=True)
# loss = w ** 2
# loss.backward()
# print(w.grad)   # tensor(6.0)  ← ∂L/∂w = 2w = 6

# We'll simulate this with a tiny autograd engine in NumPy

class Value:
    """A scalar value that remembers how it was computed."""
    def __init__(self, data, _children=(), _op='', label=''):
        self.data = data
        self.grad = 0.0            # gradient starts at 0
        self._backward = lambda: None
        self._prev = set(_children)
        self.label = label

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        out = Value(self.data * other.data, (self, other), '*')
        def _backward():
            # Chain rule: d(self*other)/d(self) = other
            self.grad  += other.data * out.grad
            other.grad += self.data  * out.grad
        out._backward = _backward
        return out

    def __pow__(self, n):
        out = Value(self.data ** n, (self,), f'**{n}')
        def _backward():
            self.grad += n * (self.data ** (n-1)) * out.grad
        out._backward = _backward
        return out

    def backward(self):
        # Topological sort then call _backward in reverse
        topo, visited = [], set()
        def build(v):
            if v not in visited:
                visited.add(v)
                for child in v._prev: build(child)
                topo.append(v)
        build(self)
        self.grad = 1.0   # dL/dL = 1.0 (start of chain)
        for node in reversed(topo):
            node._backward()

# Compute loss = w^2 and get gradient automatically
w    = Value(3.0, label='w')
loss = w ** 2

print(f"Loss = {loss.data}")   # 9.0
loss.backward()
print(f"∂L/∂w = {w.grad}")    # 6.0  ← correct! (2w = 2×3 = 6)

# More complex: L = (w1*x + b - y)^2
w1   = Value(6.0,  label='w1')
x    = Value(3.0,  label='x')
b    = Value(1.0,  label='b')
y    = Value(35.0, label='y')

y_pred = w1 * x * Value(1.0) * Value(1.0)  # simplified: w1*x
error  = y_pred * Value(1.0)               # just y_pred for demo
loss2  = error ** 2

loss2.backward()
print(f"w1.grad = {w1.grad:.3f}")   # ∂L/∂w1
# This is exactly what PyTorch does with arbitrary networks`} />

        <h3 style={S.h3}>What requires_grad does in PyTorch</h3>

        <CodeBlock code={`# PyTorch autograd — the real thing (shown for reference)
# Run this when you install PyTorch in the Deep Learning section

# import torch
#
# x  = torch.tensor([3.2, 2.0, 15.0, 7.0])       # one DoorDash order
# W  = torch.randn(4, 1, requires_grad=True)       # weights to learn
# b  = torch.zeros(1,    requires_grad=True)       # bias to learn
# y  = torch.tensor([37.0])                        # actual delivery time
#
# # Forward pass
# y_pred = x @ W + b
# loss   = ((y_pred - y) ** 2).mean()
#
# # Backward pass — computes ALL gradients automatically
# loss.backward()
#
# print(W.grad)   # ∂L/∂W — shape (4,1)
# print(b.grad)   # ∂L/∂b — shape (1,)
#
# # Gradient descent step
# with torch.no_grad():   # don't track the update itself
#     W -= 0.01 * W.grad
#     b -= 0.01 * b.grad
#     W.grad.zero_()      # clear gradients — IMPORTANT: they accumulate by default
#     b.grad.zero_()

# The three lines every PyTorch training loop always has:
# 1. optimizer.zero_grad()   — clear gradients from last step
# 2. loss.backward()         — compute new gradients
# 3. optimizer.step()        — update weights using gradients`} />
      </div>

      <Div />

      {/* ══ SECTION 8 — VANISHING EXPLODING ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The two failure modes</span>
        <h2 style={S.h2}>Vanishing and exploding gradients — why deep networks were hard to train</h2>

        <p style={S.p}>
          The chain rule multiplies derivatives at each layer.
          This creates a problem in deep networks: if the derivatives
          at each layer are small (less than 1), multiplying many of them
          together produces a number that approaches zero exponentially fast.
          By the time you reach the first few layers, the gradient has
          essentially vanished — those layers learn nothing.
        </p>

        <p style={S.p}>
          Conversely, if the derivatives are large (greater than 1),
          multiplying many of them together causes the gradient to explode —
          weights get updated by enormous amounts and training diverges.
        </p>

        <VisualBox label="Vanishing vs exploding — the chain rule compounding effect">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{
                fontSize: 12, fontWeight: 700, color: '#ff4757',
                fontFamily: 'var(--font-mono)', marginBottom: 8,
              }}>
                Vanishing gradient (value &lt; 1 per layer)
              </div>
              {[0.5, 0.25, 0.125, 0.0625, 0.03125].map((val, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', width: 48 }}>
                    Layer {i + 1}
                  </div>
                  <div style={{
                    height: 12, borderRadius: 2,
                    width: `${val * 200}px`,
                    background: `rgba(255,71,87,${0.9 - i * 0.15})`,
                    minWidth: 2,
                  }} />
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                    {val}
                  </span>
                </div>
              ))}
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>
                0.5^5 = 0.03 — first layers barely update
              </div>
            </div>
            <div>
              <div style={{
                fontSize: 12, fontWeight: 700, color: '#BA7517',
                fontFamily: 'var(--font-mono)', marginBottom: 8,
              }}>
                Exploding gradient (value &gt; 1 per layer)
              </div>
              {[2, 4, 8, 16, 32].map((val, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', width: 48 }}>
                    Layer {i + 1}
                  </div>
                  <div style={{
                    height: 12, borderRadius: 2,
                    width: `${Math.min(val * 3, 150)}px`,
                    background: `rgba(186,117,23,${0.4 + i * 0.12})`,
                  }} />
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                    {val}
                  </span>
                </div>
              ))}
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>
                2^5 = 32 — weights explode, training diverges
              </div>
            </div>
          </div>
        </VisualBox>

        <h3 style={S.h3}>Why sigmoid caused vanishing gradients</h3>

        <p style={S.p}>
          The sigmoid function squashes all inputs to the range (0, 1).
          Its derivative — <span style={S.code as React.CSSProperties}>σ(x) × (1 − σ(x))</span> —
          has a maximum value of 0.25 (at x = 0) and approaches 0 for large positive
          or negative inputs. When you multiply 0.25 × 0.25 × 0.25 across ten layers,
          you get 0.0000009 — a gradient so small it might as well be zero.
          Early layers in deep sigmoid networks learned essentially nothing.
        </p>

        <p style={S.p}>
          This is why ReLU replaced sigmoid as the standard activation.
          ReLU's derivative is simply 1 (for positive inputs) — no squashing,
          no vanishing. Gradient flows through unchanged.
          Skip connections in ResNet further solved this by giving gradients
          a "highway" that bypasses layers entirely.
        </p>

        <CodeBlock code={`# Demonstrating vanishing gradients with sigmoid vs ReLU

def sigmoid(x): return 1 / (1 + np.exp(-x))
def sigmoid_grad(x):
    s = sigmoid(x)
    return s * (1 - s)   # max value is 0.25 at x=0

def relu(x): return np.maximum(0, x)
def relu_grad(x): return (x > 0).astype(float)   # 1 or 0

# Simulate gradient flowing backward through 10 layers
x = np.array([0.5])   # some activation value

sigmoid_gradient = 1.0
relu_gradient    = 1.0

print("Gradient magnitude after each layer:")
print(f"{'Layer':<8} {'Sigmoid':<20} {'ReLU'}")
print("─" * 45)

for layer in range(1, 11):
    sigmoid_gradient *= sigmoid_grad(x)[0]
    relu_gradient    *= relu_grad(x)[0]
    print(f"{layer:<8} {sigmoid_gradient:<20.8f} {relu_gradient:.8f}")

# Layer 1  : Sigmoid = 0.23500 | ReLU = 1.0
# Layer 5  : Sigmoid = 0.00072 | ReLU = 1.0
# Layer 10 : Sigmoid = 0.000000 | ReLU = 1.0
# ← Sigmoid gradient vanishes. ReLU gradient stays at 1.0.

# Solutions to vanishing gradients:
# 1. Use ReLU or GELU activations instead of sigmoid/tanh
# 2. Use residual/skip connections (ResNet) — gradient highway
# 3. Use batch normalisation — normalises activations between layers
# 4. Careful weight initialisation (Xavier/He) — keeps activations in range

# Solutions to exploding gradients:
# 1. Gradient clipping — cap gradient magnitude above a threshold
# 2. Smaller learning rate
# 3. Batch normalisation

# Gradient clipping example:
large_gradient = np.array([150.0, -89.3, 203.1, -45.6])
max_norm = 1.0

gradient_norm = np.linalg.norm(large_gradient)
if gradient_norm > max_norm:
    clipped = large_gradient * (max_norm / gradient_norm)
    print(f"\nBefore clipping: norm = {gradient_norm:.1f}")
    print(f"After clipping:  norm = {np.linalg.norm(clipped):.4f}")
    print(f"Direction preserved: {np.allclose(clipped / np.linalg.norm(clipped),
                                               large_gradient / gradient_norm)}")`} />

        <MathBox label="The math of the chain rule — for reference">
          <p style={{ ...S.ps, marginBottom: 12 }}>
            For a network with L layers, the gradient of the loss with respect
            to weights in layer k is:
          </p>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)',
            padding: '10px 14px', background: 'var(--surface)',
            borderRadius: 6, marginBottom: 12,
            lineHeight: 2,
          }}>
            <div style={{ color: '#7F77DD' }}>∂L/∂Wₖ = (∂L/∂aₗ) × (∂aₗ/∂aₗ₋₁) × ... × (∂aₖ₊₁/∂aₖ) × (∂aₖ/∂Wₖ)</div>
          </div>
          <p style={{ ...S.ps, marginBottom: 8 }}>
            Each factor (∂aᵢ/∂aᵢ₋₁) is the local Jacobian at layer i —
            how sensitive that layer's output is to its input.
            For a linear layer: Wᵢᵀ. For ReLU: a diagonal matrix of 0s and 1s.
          </p>
          <p style={{ ...S.ps, marginBottom: 0 }}>
            If each factor has spectral norm less than 1, the product shrinks
            exponentially (vanishing). If each factor has spectral norm greater
            than 1, the product grows exponentially (exploding).
            Keeping factors near 1 is the design goal of modern activation
            functions, normalisation layers, and initialisation schemes.
          </p>
        </MathBox>
      </div>

      <Div />

      {/* ══ SECTION 9 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You now understand the engine behind every learning algorithm.
        </h2>

        <p style={S.p}>
          Derivatives measure sensitivity. Gradients collect all sensitivities
          into one vector. The chain rule propagates sensitivity backwards
          through a network. Gradient descent follows the gradient downhill.
          Together these four ideas are the complete explanation of how
          every ML model — from linear regression to GPT-4 — learns from data.
        </p>

        <p style={S.p}>
          The next module covers probability distributions and Bayes theorem.
          This is the foundation for understanding loss functions at a deeper level —
          why cross-entropy loss is the right choice for classification,
          why MSE is the right choice for regression, and how every loss function
          is secretly a probability model in disguise.
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
              Next — Module 06
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Probability Distributions and Bayes Theorem
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Why every loss function is a probability model in disguise —
              and how Bayes theorem appears in almost every ML algorithm.
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
          'A derivative answers one question: if I nudge this input slightly, how much does the output change? In ML the input is a weight, the output is the loss.',
          'The sign of the gradient tells you which direction to move. Positive gradient = decrease the weight. Negative gradient = increase the weight. Always move opposite to the gradient.',
          'The gradient is a vector of partial derivatives — one per weight. Each partial derivative measures one weight\'s isolated contribution to the loss, holding all others fixed.',
          'Gradient descent: compute gradients → subtract learning rate × gradient from each weight → repeat. Mini-batch gradient descent (32–256 examples per step) is the standard in all deep learning.',
          'The chain rule says: to find how much the final output changes when an early input changes, multiply the sensitivities at each step. Backpropagation IS the chain rule applied backwards through a network.',
          'Vanishing gradients: sigmoid derivative is at most 0.25 — multiplied across 10 layers gives ~0.000001. Early layers learn nothing. Fix: use ReLU, residual connections, or batch normalisation.',
          'PyTorch autograd computes all gradients automatically via loss.backward(). You never hand-code the chain rule in practice — but understanding it lets you debug anything that goes wrong.',
        ]}
      />
    </LearnLayout>
  )
}