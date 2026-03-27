import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Activation Functions and Loss Functions — Chaduvuko',
  description:
    'ReLU, GELU, Swish, sigmoid, softmax — and cross-entropy, MSE, Huber, focal loss. When to use each and why numerical stability matters more than you think.',
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

export default function ActivationFunctionsPage() {
  return (
    <LearnLayout
      title="Activation Functions and Loss Functions"
      description="ReLU, GELU, Swish, sigmoid, softmax — and cross-entropy, MSE, Huber, focal loss. When to use each and why numerical stability matters more than you think."
      section="Deep Learning"
      readTime="30–35 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="deep-learning" topic="activation-functions" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — why these choices matter</span>
        <h2 style={S.h2}>
          The activation function decides what a neuron can express.
          The loss function decides what the network is trying to achieve.
          Both choices are made before training — and both can silently
          make a network fail.
        </h2>

        <p style={S.p}>
          You have a network architecture — layers, widths, connections.
          Two remaining decisions determine whether it trains successfully:
          what non-linearity to apply after each layer (activation function)
          and what quantity to minimise during training (loss function).
          Both are often treated as trivial defaults, but both have
          failure modes that are genuinely hard to debug.
        </p>

        <p style={S.p}>
          The wrong activation function causes vanishing gradients
          (sigmoid in deep networks), dead neurons (ReLU with bad initialisation),
          or slow convergence (tanh). The wrong loss function causes the network
          to optimise for the wrong thing entirely — a model trained with MSE
          on a classification problem will learn to output the class mean,
          not the class probability. Numerical instability in either can
          silently corrupt training with NaN losses.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A football player's training regime (the loss function) determines
            what they get better at. Train them to minimise goals conceded —
            they become a defender. Train them to maximise goals scored —
            they become a striker. The same player, the same training intensity,
            but the objective determines the skill.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The activation function is the player's physical capability —
            how much they can bend, how fast they can turn.
            A player with no flexibility (linear activation) cannot do anything
            a simple regression cannot. A player with full agility (ReLU, GELU)
            can learn arbitrarily complex patterns.
          </p>
        </AnalogyBox>
      </div>

      <Div />

      {/* ══ SECTION 2 — ACTIVATION FUNCTIONS ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Part 1 — activation functions</span>
        <h2 style={S.h2}>Six activation functions — what each one does and when to use it</h2>

        <p style={S.p}>
          An activation function is applied element-wise after the linear
          transformation of each layer. Without it, a 10-layer network would
          collapse to a single linear transformation — no more expressive
          than one layer. The activation function is what gives neural networks
          their ability to learn non-linear patterns.
        </p>

        <VisualBox label="Activation functions — shape, derivative, and use case">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                name: 'ReLU',
                formula: 'max(0, z)',
                deriv: '1 if z>0 else 0',
                color: '#1D9E75',
                pros: 'Fast, sparse, no vanishing gradient for positive z. Default choice.',
                cons: 'Dying ReLU: neurons stuck at 0. Not differentiable at z=0.',
                use: 'Default for all hidden layers in MLPs and CNNs.',
                pytorch: 'nn.ReLU()',
              },
              {
                name: 'LeakyReLU',
                formula: 'z if z>0 else 0.01z',
                deriv: '1 if z>0 else 0.01',
                color: '#378ADD',
                pros: 'Fixes dying ReLU — negative inputs still produce small gradient.',
                cons: 'Slight increase in computation. 0.01 slope is a hyperparameter.',
                use: 'When dying ReLU is a problem. Good default for deep networks.',
                pytorch: 'nn.LeakyReLU(negative_slope=0.01)',
              },
              {
                name: 'GELU',
                formula: 'z × Φ(z)  (Gaussian CDF)',
                deriv: 'Φ(z) + z×φ(z)',
                color: '#7b61ff',
                pros: 'Smooth, differentiable everywhere. Used in BERT, GPT, all transformers.',
                cons: 'Slightly more expensive than ReLU to compute.',
                use: 'Transformers and modern NLP/vision models. Increasingly the default.',
                pytorch: 'nn.GELU()',
              },
              {
                name: 'Sigmoid',
                formula: '1/(1+e^−z)',
                deriv: 'σ(z)(1−σ(z))  max=0.25',
                color: '#D85A30',
                pros: 'Output in (0,1) — interpretable as probability.',
                cons: 'Saturates. Vanishing gradients in deep networks. Avoid in hidden layers.',
                use: 'Output layer for binary classification ONLY.',
                pytorch: 'nn.Sigmoid()',
              },
              {
                name: 'Softmax',
                formula: 'e^zᵢ / Σe^zⱼ',
                deriv: 'Complex — see note',
                color: '#BA7517',
                pros: 'Converts vector to probability distribution summing to 1.',
                cons: 'Numerically unstable alone. Always pair with log for stability.',
                use: 'Output layer for multi-class classification ONLY.',
                pytorch: 'nn.Softmax(dim=1)  but use CrossEntropyLoss instead',
              },
              {
                name: 'Tanh',
                formula: '(e^z − e^−z)/(e^z + e^−z)',
                deriv: '1 − tanh²(z)  max=1.0',
                color: '#888',
                pros: 'Zero-centred output (−1 to 1). Better gradient flow than sigmoid.',
                cons: 'Still saturates. Vanishing gradients in very deep networks.',
                use: 'RNNs and LSTMs where zero-centred activations matter.',
                pytorch: 'nn.Tanh()',
              },
            ].map((item) => (
              <div key={item.name} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 8, padding: '11px 14px',
                display: 'grid', gridTemplateColumns: '110px 1fr 1fr',
                gap: 12, alignItems: 'start',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 3, fontFamily: 'var(--font-mono)' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>
                    {item.formula}
                  </div>
                  <div style={{ fontSize: 9, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginTop: 3 }}>
                    f′= {item.deriv}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#1D9E75', marginBottom: 3 }}>✓ {item.pros}</div>
                  <div style={{ fontSize: 11, color: '#ff4757', marginBottom: 3 }}>✗ {item.cons}</div>
                  <div style={{ fontSize: 11, color: item.color }}>Use: {item.use}</div>
                </div>
                <div style={{
                  fontSize: 10, fontFamily: 'var(--font-mono)', color: item.color,
                  background: `${item.color}10`, padding: '4px 8px', borderRadius: 4,
                  alignSelf: 'start',
                }}>
                  {item.pytorch}
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import numpy as np

# ── Implement and visualise all six activations ────────────────────────
z = torch.linspace(-3, 3, 100)

activations = {
    'ReLU':       nn.ReLU(),
    'LeakyReLU':  nn.LeakyReLU(0.01),
    'GELU':       nn.GELU(),
    'Sigmoid':    nn.Sigmoid(),
    'Tanh':       nn.Tanh(),
}

print("Activation function outputs at key points:")
print(f"{'Activation':<14} {'z=−2':>8} {'z=−1':>8} {'z=0':>8} {'z=1':>8} {'z=2':>8}")
print("─" * 55)

for name, fn in activations.items():
    vals = [fn(torch.tensor(float(z))).item() for z in [-2, -1, 0, 1, 2]]
    print(f"  {name:<12}  " + "  ".join(f"{v:>8.4f}" for v in vals))

# ── Derivative magnitudes — vanishing gradient check ──────────────────
print("\nDerivative magnitude at z=−3 (vanishing gradient test):")
for name, fn in activations.items():
    z_test = torch.tensor(-3.0, requires_grad=True)
    out    = fn(z_test)
    out.backward()
    deriv = z_test.grad.item()
    flag  = '← near zero — vanishing!' if abs(deriv) < 0.01 else '← gradient flows'
    print(f"  {name:<14}: f′(−3) = {deriv:+.6f}  {flag}")

# ── GELU vs ReLU in practice ──────────────────────────────────────────
# GELU is smooth everywhere — ReLU has a kink at 0
# This matters for second-order optimisers and some architectures
z_compare = torch.linspace(-2, 2, 7)
relu_out  = nn.ReLU()(z_compare)
gelu_out  = nn.GELU()(z_compare)

print("\nGELU vs ReLU — the smooth difference:")
print(f"{'z':>8} {'ReLU':>10} {'GELU':>10} {'diff':>10}")
for z_val, r, g in zip(z_compare, relu_out, gelu_out):
    print(f"  {z_val.item():>6.2f}  {r.item():>10.4f}  {g.item():>10.4f}  {(g-r).item():>+10.4f}")
print("GELU gates the input smoothly — ReLU hard-zeros it.")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — LOSS FUNCTIONS ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Part 2 — loss functions</span>
        <h2 style={S.h2}>Six loss functions — match the loss to the task</h2>

        <p style={S.p}>
          The loss function is the quantity the network minimises during training.
          Choosing the wrong loss does not crash training — it often trains fine
          but optimises for the wrong thing. A network trained with MSE on a
          classification task learns to output class frequencies, not class
          probabilities. The outputs look reasonable but are fundamentally wrong.
        </p>

        <p style={S.p}>
          The right loss function is determined entirely by the output type
          and what "correct" means for your task.
          Regression → MSE or MAE or Huber. Binary classification → BCE.
          Multi-class → Cross-entropy. Imbalanced classes → Focal loss.
          These are not interchangeable.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              name: 'MSE — Mean Squared Error',
              formula: 'mean((ŷ − y)²)',
              color: '#378ADD',
              task: 'Regression',
              when: 'Predicting continuous values where large errors are costly. Delivery time, stock price, temperature.',
              pitfall: 'Sensitive to outliers — one extreme prediction dominates the loss.',
              pytorch: 'nn.MSELoss()',
            },
            {
              name: 'MAE — Mean Absolute Error',
              formula: 'mean(|ŷ − y|)',
              color: '#1D9E75',
              task: 'Regression',
              when: 'Regression with outliers. Treats all errors proportionally.',
              pitfall: 'Gradient is constant (±1) — can oscillate near convergence.',
              pytorch: 'nn.L1Loss()',
            },
            {
              name: 'Huber Loss',
              formula: 'MSE if |e|<δ else δ(|e|−δ/2)',
              color: '#7b61ff',
              task: 'Regression',
              when: 'Best of both: MSE for small errors (smooth gradient), MAE for large errors (outlier robust).',
              pitfall: 'δ is a hyperparameter — needs tuning. Default δ=1.0.',
              pytorch: 'nn.HuberLoss(delta=1.0)',
            },
            {
              name: 'BCE — Binary Cross-Entropy',
              formula: '−mean(y log ŷ + (1−y) log(1−ŷ))',
              color: '#D85A30',
              task: 'Binary classification',
              when: 'Two-class problems. Output layer must produce probabilities (0–1).',
              pitfall: 'Numerically unstable — use BCEWithLogitsLoss instead.',
              pytorch: 'nn.BCEWithLogitsLoss()  ← use this not BCELoss',
            },
            {
              name: 'Cross-Entropy',
              formula: '−mean(Σ yᵢ log ŷᵢ)',
              color: '#BA7517',
              task: 'Multi-class classification',
              when: 'Three or more classes. Output layer produces one logit per class.',
              pitfall: 'Do NOT apply softmax before CrossEntropyLoss — it does it internally.',
              pytorch: 'nn.CrossEntropyLoss()  ← raw logits in, not softmax',
            },
            {
              name: 'Focal Loss',
              formula: '−(1−ŷ)^γ × log(ŷ)',
              color: '#ff4757',
              task: 'Imbalanced classification',
              when: 'Severe class imbalance — fraud (1%), disease (0.1%). Downweights easy examples.',
              pitfall: 'γ hyperparameter needs tuning. Not in PyTorch core — use torchvision.',
              pytorch: 'torchvision.ops.sigmoid_focal_loss()',
            },
          ].map((item) => (
            <div key={item.name} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '11px 14px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)' }}>
                  {item.name}
                </span>
                <span style={{
                  fontSize: 10, fontFamily: 'var(--font-mono)', color: item.color,
                  background: `${item.color}15`, padding: '2px 6px', borderRadius: 3,
                }}>
                  {item.task}
                </span>
                <span style={{
                  fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--muted)',
                  marginLeft: 'auto',
                }}>
                  {item.formula}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <p style={{ ...S.ps, marginBottom: 4 }}>{item.when}</p>
                  <div style={{ fontSize: 11, color: '#ff4757' }}>⚠ {item.pitfall}</div>
                </div>
                <div style={{
                  fontSize: 11, fontFamily: 'var(--font-mono)', color: item.color,
                  background: `${item.color}10`, padding: '6px 8px', borderRadius: 4,
                  alignSelf: 'start',
                }}>
                  {item.pytorch}
                </div>
              </div>
            </div>
          ))}
        </div>

        <CodeBlock code={`import torch
import torch.nn as nn
import numpy as np

# ── All six loss functions on concrete examples ────────────────────────

# ── Regression losses ──────────────────────────────────────────────────
y_reg  = torch.tensor([41.0, 29.0, 55.0, 38.0])
y_pred = torch.tensor([35.0, 31.0, 48.0, 42.0])

mse   = nn.MSELoss()(y_pred, y_reg)
mae   = nn.L1Loss()(y_pred, y_reg)
huber = nn.HuberLoss(delta=5.0)(y_pred, y_reg)

print("Regression losses (Swiggy delivery time):")
print(f"  MSE:   {mse.item():.4f}  (sensitive to large errors)")
print(f"  MAE:   {mae.item():.4f}  (proportional to error)")
print(f"  Huber: {huber.item():.4f}  (MSE for small, MAE for large)")

# Demonstrate outlier sensitivity
y_with_outlier = torch.tensor([41.0, 29.0, 55.0, 97.0])   # last is outlier
mse_out   = nn.MSELoss()(y_pred, y_with_outlier)
mae_out   = nn.L1Loss()(y_pred, y_with_outlier)
huber_out = nn.HuberLoss(delta=5.0)(y_pred, y_with_outlier)
print(f"\nWith outlier (97 vs predicted 42):")
print(f"  MSE:   {mse_out.item():.1f}  ← dominated by outlier")
print(f"  MAE:   {mae_out.item():.1f}  ← less affected")
print(f"  Huber: {huber_out.item():.1f}  ← best balance")

# ── Classification losses ──────────────────────────────────────────────
# Binary — raw logits (not sigmoid!) into BCEWithLogitsLoss
logits_binary = torch.tensor([2.1, -0.5, 1.8, -1.2])   # raw scores
y_binary      = torch.tensor([1.0, 0.0, 1.0, 0.0])

# WRONG: nn.BCELoss()(torch.sigmoid(logits), y) — numerically unstable
# RIGHT: BCEWithLogitsLoss applies sigmoid internally with log-sum-exp trick
bce = nn.BCEWithLogitsLoss()(logits_binary, y_binary)
print(f"\nBinary cross-entropy (BCEWithLogitsLoss): {bce.item():.4f}")

# Multi-class — raw logits (not softmax!) into CrossEntropyLoss
# Shape: (batch_size, n_classes)
logits_multi = torch.tensor([
    [2.1, 0.3, -0.5],   # sample 1 — class 0 most likely
    [0.1, 1.9, 0.2],    # sample 2 — class 1 most likely
    [-0.3, 0.4, 2.2],   # sample 3 — class 2 most likely
])
y_multi = torch.tensor([0, 1, 2])   # true class indices

# WRONG: torch.softmax then nn.NLLLoss — unstable
# RIGHT: CrossEntropyLoss takes raw logits and applies log-softmax internally
ce = nn.CrossEntropyLoss()(logits_multi, y_multi)
print(f"Cross-entropy (CrossEntropyLoss):         {ce.item():.4f}")

# ── Class weighting for imbalanced datasets ───────────────────────────
# If 95% class 0 and 5% class 1, upweight class 1 by 19×
weights = torch.tensor([1.0, 19.0, 1.0])
ce_weighted = nn.CrossEntropyLoss(weight=weights)(logits_multi, y_multi)
print(f"Weighted cross-entropy (19× class 1):     {ce_weighted.item():.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — NUMERICAL STABILITY ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most important practical detail</span>
        <h2 style={S.h2}>Numerical stability — why BCEWithLogitsLoss beats BCELoss every time</h2>

        <p style={S.p}>
          The most common source of NaN losses in production deep learning
          is not wrong architecture or bad data — it is numerical instability
          in loss functions. Understanding why BCEWithLogitsLoss exists
          and why CrossEntropyLoss takes raw logits (not softmax outputs)
          prevents hours of debugging.
        </p>

        <ConceptBox title="The log-sum-exp trick — numerical stability in one formula">
          <p style={{ ...S.ps, marginBottom: 10 }}>
            Computing log(sigmoid(z)) directly overflows for large |z|.
            The numerically stable version uses the log-sum-exp trick:
          </p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.2 }}>
            <div style={{ color: '#ff4757', marginBottom: 4 }}>
              UNSTABLE: log(sigmoid(z)) = log(1/(1+e^−z)) → overflow for large z
            </div>
            <div style={{ color: '#1D9E75' }}>
              STABLE:   −log(1+e^−z) = z − log(1+e^z) when z {'>'} 0  (no overflow)
            </div>
          </div>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 10 }}>
            PyTorch's BCEWithLogitsLoss and CrossEntropyLoss implement this trick
            internally. Using nn.Sigmoid() + nn.BCELoss() skips it — leading to
            NaN at training time when logits are large.
          </p>
        </ConceptBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import numpy as np

# ── Demonstrate numerical instability ─────────────────────────────────
large_logit = torch.tensor([100.0])   # extreme but not impossible after bad init
y_true      = torch.tensor([1.0])

# WRONG — sigmoid first, then BCE
try:
    prob_unstable = torch.sigmoid(large_logit)
    loss_unstable = nn.BCELoss()(prob_unstable, y_true)
    print(f"BCELoss after sigmoid:          {loss_unstable.item()}")
except Exception as e:
    print(f"BCELoss after sigmoid:          ERROR — {e}")

# RIGHT — BCEWithLogitsLoss handles it stably
loss_stable = nn.BCEWithLogitsLoss()(large_logit, y_true)
print(f"BCEWithLogitsLoss (raw logits): {loss_stable.item():.6f}  ← stable")

# ── Same issue with softmax + NLLLoss vs CrossEntropyLoss ─────────────
large_logits = torch.tensor([[100.0, 0.0, 0.0]])
y_cls        = torch.tensor([0])

# WRONG — softmax first
try:
    probs = torch.softmax(large_logits, dim=1)
    loss_wrong = nn.NLLLoss()(torch.log(probs), y_cls)
    print(f"\nSoftmax + NLLLoss:              {loss_wrong.item()}")
except Exception as e:
    print(f"\nSoftmax + NLLLoss:              {loss_wrong.item() if 'loss_wrong' in dir() else 'NaN or inf'}")

# RIGHT — CrossEntropyLoss uses log-softmax internally
loss_right = nn.CrossEntropyLoss()(large_logits, y_cls)
print(f"CrossEntropyLoss (raw logits):  {loss_right.item():.6f}  ← stable")

# ── Choosing the right final layer + loss combination ─────────────────
print("\nCorrect output layer + loss combinations:")
combos = [
    ('Binary classification',  'No activation (raw logits)', 'nn.BCEWithLogitsLoss()'),
    ('Multi-class',            'No activation (raw logits)', 'nn.CrossEntropyLoss()'),
    ('Regression',             'No activation (linear out)', 'nn.MSELoss() or nn.L1Loss()'),
    ('Multi-label binary',     'No activation (raw logits)', 'nn.BCEWithLogitsLoss()'),
    ('Probabilistic output',   'nn.Softmax() at inference',  'nn.CrossEntropyLoss() in training'),
]
for task, output, loss in combos:
    print(f"  {task:<25}: output={output:<30} loss={loss}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — CHOOSING IN PRACTICE ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Decision guide</span>
        <h2 style={S.h2}>A complete decision guide — activation and loss for every task</h2>

        <VisualBox label="Task → activation → loss — the complete mapping">
          <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
              background: 'var(--surface)', borderBottom: '1px solid var(--border)',
              padding: '8px 12px', gap: 10,
            }}>
              {['Task', 'Output layer', 'Loss function', 'Notes'].map(h => (
                <span key={h} style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{h}</span>
              ))}
            </div>
            {[
              ['Regression', 'Linear (no activation)', 'MSELoss or L1Loss', 'Use HuberLoss if outliers present'],
              ['Binary classification', 'Linear (logits)', 'BCEWithLogitsLoss', 'Never sigmoid before BCELoss'],
              ['Multi-class', 'Linear (logits)', 'CrossEntropyLoss', 'Never softmax before CrossEntropyLoss'],
              ['Multi-label', 'Linear (logits)', 'BCEWithLogitsLoss', 'Each output is independent binary'],
              ['Imbalanced binary', 'Linear (logits)', 'BCEWithLogitsLoss(pos_weight=)', 'Or focal loss'],
              ['Sequence prediction', 'Linear (logits)', 'CrossEntropyLoss', 'One loss per timestep'],
              ['Probabilistic output', 'Linear in training', 'CrossEntropyLoss', 'Apply softmax at inference only'],
            ].map((row, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
                padding: '8px 12px', gap: 10,
                background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
                borderBottom: i < 6 ? '1px solid var(--border)' : 'none',
                alignItems: 'start',
              }}>
                {row.map((cell, j) => (
                  <span key={j} style={{
                    fontSize: j === 0 ? 12 : 11,
                    color: j === 0 ? 'var(--text)' : j === 2 ? '#7b61ff' : 'var(--muted)',
                    fontFamily: j === 1 || j === 2 ? 'var(--font-mono)' : 'inherit',
                    fontWeight: j === 0 ? 600 : 400,
                  }}>
                    {cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import torch
import torch.nn as nn
from sklearn.metrics import accuracy_score, mean_absolute_error
import numpy as np
import warnings
warnings.filterwarnings('ignore')

torch.manual_seed(42)
np.random.seed(42)
n = 1000

# ── Task 1: Regression — delivery time prediction ─────────────────────
X_reg = torch.randn(n, 4)
y_reg = (X_reg[:, 0] * 7 + X_reg[:, 2] * 3 + torch.randn(n) * 2 + 35).unsqueeze(1)

model_reg = nn.Sequential(
    nn.Linear(4, 32), nn.ReLU(),
    nn.Linear(32, 1),              # linear output — no activation
)
opt_reg  = torch.optim.Adam(model_reg.parameters(), lr=0.01)
loss_reg = nn.MSELoss()

for _ in range(200):
    opt_reg.zero_grad()
    loss_reg(model_reg(X_reg), y_reg).backward()
    opt_reg.step()

with torch.no_grad():
    pred_reg = model_reg(X_reg)
    mae = mean_absolute_error(y_reg.numpy(), pred_reg.numpy())
print(f"Regression (MSELoss): MAE = {mae:.4f}")

# ── Task 2: Binary classification — fraud detection ───────────────────
X_cls = torch.randn(n, 4)
y_cls = ((X_cls[:, 0] + X_cls[:, 1] > 0.5).float())

model_bin = nn.Sequential(
    nn.Linear(4, 32), nn.ReLU(),
    nn.Linear(32, 1),              # raw logits — NO sigmoid
)
opt_bin  = torch.optim.Adam(model_bin.parameters(), lr=0.01)
loss_bin = nn.BCEWithLogitsLoss()  # combines sigmoid + BCE stably

for _ in range(200):
    opt_bin.zero_grad()
    loss_bin(model_bin(X_cls).squeeze(), y_cls).backward()
    opt_bin.step()

with torch.no_grad():
    logits  = model_bin(X_cls).squeeze()
    preds   = (logits > 0).float()   # threshold at 0 = threshold at 0.5 prob
    acc_bin = accuracy_score(y_cls.numpy(), preds.numpy())
print(f"Binary classification (BCEWithLogitsLoss): accuracy = {acc_bin:.4f}")

# ── Task 3: Multi-class — support ticket routing ──────────────────────
X_mc  = torch.randn(n, 8)
y_mc  = torch.randint(0, 4, (n,))
# Add signal
for c in range(4):
    X_mc[y_mc == c, c] += 2.0

model_mc = nn.Sequential(
    nn.Linear(8, 32), nn.ReLU(),
    nn.Linear(32, 4),              # 4 raw logits — NO softmax
)
opt_mc  = torch.optim.Adam(model_mc.parameters(), lr=0.01)
loss_mc = nn.CrossEntropyLoss()   # log-softmax + NLL internally

for _ in range(200):
    opt_mc.zero_grad()
    loss_mc(model_mc(X_mc), y_mc).backward()
    opt_mc.step()

with torch.no_grad():
    logits_mc = model_mc(X_mc)
    preds_mc  = logits_mc.argmax(dim=1)
    acc_mc    = accuracy_score(y_mc.numpy(), preds_mc.numpy())
    # At inference: apply softmax to get probabilities
    probs_mc  = torch.softmax(logits_mc, dim=1)
print(f"Multi-class (CrossEntropyLoss): accuracy = {acc_mc:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common activation and loss mistake — explained and fixed</h2>

        <ErrorBlock
          error="Loss is nan from the first training step"
          cause="Almost always numerical instability in the loss function. Three most common causes: applying nn.Sigmoid() before nn.BCELoss() with large logits (overflow), applying nn.Softmax() before nn.CrossEntropyLoss() then taking log (log of near-zero), or log(0) when a predicted probability is exactly 0 or 1. Large initial weights amplify this."
          fix="Switch to BCEWithLogitsLoss for binary and CrossEntropyLoss for multi-class — both implement the log-sum-exp trick internally. Never apply sigmoid or softmax before these losses. Check initial weight scale: nn.init.kaiming_normal_ for ReLU, nn.init.xavier_normal_ for sigmoid/tanh. Add gradient clipping: nn.utils.clip_grad_norm_(model.parameters(), 1.0)."
        />

        <ErrorBlock
          error="Network predicts the same class for every input — stuck at majority class"
          cause="Using MSELoss for classification. MSE minimises squared error — for a binary problem the optimal constant prediction is the class mean (e.g. 0.3 for 30% positive rate). The network correctly minimises MSE by outputting 0.3 for everything. MSE does not drive the network to separate classes — only cross-entropy does."
          fix="Use BCEWithLogitsLoss for binary classification and CrossEntropyLoss for multi-class. Never use MSELoss for classification tasks. If the network still predicts one class, check class imbalance: use pos_weight in BCEWithLogitsLoss or weight in CrossEntropyLoss to upweight the minority class."
        />

        <ErrorBlock
          error="RuntimeError: Expected input batch_size to match target batch_size"
          cause="Shape mismatch between model output and target. Common with BCEWithLogitsLoss: model outputs (batch, 1) but target is (batch,) — or vice versa. CrossEntropyLoss expects logits of shape (batch, n_classes) and targets of shape (batch,) — passing (batch, 1) logits for binary causes this error."
          fix="For binary classification with BCEWithLogitsLoss: output shape (batch, 1), target shape (batch, 1) — or output.squeeze() and target.float(). For multi-class with CrossEntropyLoss: output shape (batch, n_classes), target shape (batch,) as LongTensor. Always print output.shape and target.shape before the loss call to debug shape mismatches."
        />

        <ErrorBlock
          error="Model outputs are all near 0.5 for binary classification — poor calibration"
          cause="ReLU saturation or dying neurons prevent the output logits from reaching large positive or negative values. With many dead neurons, the final layer's input is near-zero, producing logits near zero, which sigmoid maps to 0.5. Also caused by too-strong L2 regularisation (weight_decay) shrinking all weights toward zero."
          fix="Check gradient magnitudes — if gradients for early layers are near zero, use LeakyReLU or better initialisation. Reduce weight_decay. Increase model depth or width to give more capacity. Verify with a gradient check that the loss is actually decreasing with respect to the output weights. If the model trains fine but outputs are poorly calibrated, add CalibratedClassifierCV post-hoc."
        />
      </div>

      <Div />

      {/* ══ SECTION 7 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          Activations and losses are chosen. Next: how to make the
          gradient descent step itself smarter.
        </h2>

        <p style={S.p}>
          You now know what a neuron computes (activation functions)
          and what the network minimises (loss functions).
          Module 44 covers the final missing piece of the training loop:
          optimisers. SGD takes the same step size for every weight.
          Adam adapts the step size per weight based on gradient history.
          AdamW adds proper weight decay. Momentum accumulates direction.
          The right optimiser makes training 5–10× faster and more stable.
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
              Next — Module 44 · Deep Learning
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Optimisers — SGD, Adam, AdamW
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Momentum, adaptive learning rates, weight decay done right.
              Why AdamW replaced Adam as the default and when SGD still wins.
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
          'Use ReLU as the default hidden layer activation — fast, sparse, no vanishing gradient for positive inputs. Switch to LeakyReLU if dying neurons are a problem. Use GELU for transformers and modern architectures — it is smooth everywhere and increasingly the default.',
          'Sigmoid and tanh belong only in specific places: sigmoid at the output layer for binary classification, tanh inside RNNs and LSTMs. Never use sigmoid in hidden layers of deep networks — its maximum derivative of 0.25 causes vanishing gradients.',
          'Match the loss function to the task exactly: BCEWithLogitsLoss for binary classification, CrossEntropyLoss for multi-class, MSELoss or L1Loss for regression, HuberLoss for regression with outliers. Using MSELoss for classification causes the network to predict class frequencies, not probabilities.',
          'Never apply sigmoid before BCEWithLogitsLoss or softmax before CrossEntropyLoss. Both losses apply the stable version internally using the log-sum-exp trick. Adding the activation first causes numerical overflow for large logits and produces NaN losses.',
          'At inference time after CrossEntropyLoss training: apply torch.softmax(logits, dim=1) to get probabilities. After BCEWithLogitsLoss training: apply torch.sigmoid(logits) to get probabilities. During training, pass raw logits to the loss function — never activated outputs.',
          'For imbalanced classification, use the weight parameter in CrossEntropyLoss (minority class weight = n_majority/n_minority) or pos_weight in BCEWithLogitsLoss. Focal loss is stronger but requires an external library — start with weighted cross-entropy first.',
        ]}
      />
    </LearnLayout>
  )
}