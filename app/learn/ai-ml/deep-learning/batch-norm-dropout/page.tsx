import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Training Deep Networks — Adam, BatchNorm, Dropout — Chaduvuko',
  description:
    'The four techniques that separate a network that trains from one that trains well. Adam optimizer, batch normalisation, dropout, and learning rate schedules — used in every production deep learning system.',
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

export default function TrainingDeepNetworksPage() {
  return (
    <LearnLayout
      title="Training Deep Networks — Adam, BatchNorm, Dropout"
      description="The four techniques that separate a network that trains from one that trains well. Used in every production deep learning system."
      section="Deep Learning"
      readTime="35–40 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="deep-learning" topic="batch-norm-dropout" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — what problem does this module solve?</span>
        <h2 style={S.h2}>
          Module 41 built a network that works. This module makes it
          train 10× faster, generalise better, and stay stable on deep architectures.
        </h2>

        <p style={S.p}>
          The network from Module 41 used plain SGD — subtract a fixed
          fraction of the gradient from each weight every step.
          It works, but it has three serious problems in practice.
          First: the same learning rate for every weight regardless of how
          frequently that weight gets useful gradient signal.
          Second: as the network gets deeper, activations between layers
          drift to extreme values — making gradients vanish or explode.
          Third: the network memorises training data instead of learning
          generalisable patterns.
        </p>

        <p style={S.p}>
          Four techniques solve these problems and together define
          how every modern neural network is trained in production:
          <strong style={{ color: '#7b61ff' }}> Adam</strong> (adaptive learning rates),
          <strong style={{ color: '#1D9E75' }}> Batch Normalisation</strong> (stabilise activations),
          <strong style={{ color: '#378ADD' }}> Dropout</strong> (prevent overfitting),
          and <strong style={{ color: '#D85A30' }}> Learning Rate Scheduling</strong>
          (decay lr as training matures). You will use all four in every
          non-trivial deep learning project you build.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Learning to drive with plain SGD is like driving with one fixed
            foot pressure on the accelerator — too fast on empty roads,
            too slow in traffic. Adam is an experienced driver who automatically
            adjusts pressure based on the terrain — easing off on straight highways,
            pressing harder on uphill roads.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            BatchNorm is the suspension system — absorbs shocks between layers
            so the car stays stable. Dropout is the practice of occasionally
            driving with one eye closed — forces the driver to not rely too
            heavily on any single cue, producing a more robust skill.
            LR scheduling is easing off the accelerator as you approach your destination.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          These four techniques are not optional polish — they are the difference
          between a network that trains in 200 epochs and one that trains in 20,
          and between a network that overfits immediately and one that generalises.
          Every PyTorch tutorial uses them by default for good reason.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — ADAM OPTIMIZER ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Technique 1 — adaptive learning rates</span>
        <h2 style={S.h2}>Adam — the optimizer that replaced SGD for almost everything</h2>

        <p style={S.p}>
          Plain SGD uses the same learning rate for every weight at every step.
          This is suboptimal for two reasons. Some weights receive large, consistent
          gradient signals and should take smaller steps to avoid overshooting.
          Other weights receive rare, small gradient signals and should take
          larger steps to make progress at all. Adam maintains a separate
          effective learning rate for each weight, automatically adjusted
          based on the history of gradients for that weight.
        </p>

        <p style={S.p}>
          Adam combines two ideas. The first moment (mean of past gradients)
          acts like momentum — it accumulates direction from past steps,
          smoothing out noise. The second moment (mean of squared past gradients)
          scales the step size — weights that have been receiving large gradients
          get a smaller effective learning rate. Together they produce
          an adaptive per-weight step size that makes training much faster
          and more robust to learning rate choice.
        </p>

        <ConceptBox title="Adam — the four update equations">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2 }}>
            <div style={{ color: '#7b61ff', marginBottom: 4 }}>
              m = β₁ × m + (1−β₁) × g         ← first moment (momentum)
            </div>
            <div style={{ color: '#1D9E75', marginBottom: 4 }}>
              v = β₂ × v + (1−β₂) × g²        ← second moment (gradient variance)
            </div>
            <div style={{ color: '#D85A30', marginBottom: 4 }}>
              m̂ = m / (1−β₁ᵗ)               ← bias correction
            </div>
            <div style={{ color: '#D85A30', marginBottom: 12 }}>
              v̂ = v / (1−β₂ᵗ)
            </div>
            <div style={{ color: '#378ADD', marginBottom: 8 }}>
              W = W − lr × m̂ / (√v̂ + ε)    ← weight update
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: 'var(--muted)' }}>
              <div>g: gradient for this step</div>
              <div>β₁=0.9 (default): momentum decay — how much to remember past gradients</div>
              <div>β₂=0.999 (default): variance decay — how much to remember past gradient²</div>
              <div>ε=1e-8 (default): prevents division by zero</div>
              <div style={{ color: '#7b61ff' }}>Effective lr per weight ≈ lr / √(mean gradient²) — large past gradients → small steps</div>
            </div>
          </div>
        </ConceptBox>

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
n = 3000

distance = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic  = np.random.randint(1, 11, n).astype(float)
prep     = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
value    = np.abs(np.random.normal(350, 150, n)).clip(50, 1200)
delivery = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
            + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep, value])
y = delivery.reshape(-1, 1)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

X_mean, X_std = X_tr.mean(0), X_tr.std(0) + 1e-8
y_mean, y_std = y_tr.mean(), y_tr.std() + 1e-8
X_tr_sc = torch.FloatTensor((X_tr - X_mean) / X_std)
y_tr_sc = torch.FloatTensor((y_tr - y_mean) / y_std)
X_te_sc = torch.FloatTensor((X_te - X_mean) / X_std)

def make_model():
    return nn.Sequential(
        nn.Linear(4, 64), nn.ReLU(),
        nn.Linear(64, 32), nn.ReLU(),
        nn.Linear(32, 1),
    )

def train_model(model, optimizer, epochs=100, batch_size=64):
    criterion = nn.MSELoss()
    dataset   = torch.utils.data.TensorDataset(X_tr_sc, y_tr_sc)
    loader    = torch.utils.data.DataLoader(dataset, batch_size=batch_size, shuffle=True)
    losses    = []
    for epoch in range(epochs):
        model.train()
        for Xb, yb in loader:
            optimizer.zero_grad()
            loss = criterion(model(Xb), yb)
            loss.backward()
            optimizer.step()
        model.eval()
        with torch.no_grad():
            losses.append(criterion(model(X_tr_sc), y_tr_sc).item())
    return losses

# ── Compare SGD vs Adam vs AdamW ──────────────────────────────────────
optimizers = {
    'SGD (lr=0.01)':          lambda m: optim.SGD(m.parameters(), lr=0.01),
    'SGD+momentum (lr=0.01)': lambda m: optim.SGD(m.parameters(), lr=0.01, momentum=0.9),
    'Adam (lr=0.001)':        lambda m: optim.Adam(m.parameters(), lr=0.001),
    'AdamW (lr=0.001)':       lambda m: optim.AdamW(m.parameters(), lr=0.001, weight_decay=0.01),
}

print(f"{'Optimizer':<28} {'Final loss':>12} {'Test MAE':>10}")
print("─" * 54)

for name, opt_fn in optimizers.items():
    torch.manual_seed(42)
    model  = make_model()
    losses = train_model(model, opt_fn(model))

    model.eval()
    with torch.no_grad():
        y_pred = model(X_te_sc).numpy() * y_std + y_mean
    mae = mean_absolute_error(y_te, y_pred)
    print(f"  {name:<26}  {losses[-1]:>12.6f}  {mae:>10.4f}")

# ── AdamW vs Adam: weight decay ────────────────────────────────────────
print("\nAdamW adds L2 weight decay directly to the weight update,")
print("not to the gradient — more correct than Adam + weight_decay.")
print("Use AdamW as default for all transformer/MLP training.")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — BATCH NORMALISATION ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Technique 2 — stabilise activations between layers</span>
        <h2 style={S.h2}>Batch Normalisation — the technique that made very deep networks trainable</h2>

        <p style={S.p}>
          As data flows through a deep network, the distribution of activations
          at each layer shifts and grows — a problem called
          <strong style={{ color: '#1D9E75' }}> internal covariate shift</strong>.
          Layer 3 expects activations in a certain range, but layer 2's outputs
          drift as weights update. Layer 3 then has to continuously re-adapt
          to its changing inputs. This is one reason very deep networks
          (10+ layers) trained poorly before BatchNorm.
        </p>

        <p style={S.p}>
          Batch Normalisation fixes this by normalising the activations
          at each layer before passing them to the next.
          For each mini-batch, it subtracts the batch mean and divides by
          the batch standard deviation — forcing activations to approximately
          zero mean and unit variance. Two learnable parameters (gamma and beta)
          then scale and shift the normalised values back to whatever
          distribution is optimal for that layer.
        </p>

        <VisualBox label="BatchNorm — what it does to activations">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#ff4757', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                WITHOUT BatchNorm — activations drift
              </div>
              <svg width="100%" viewBox="0 0 200 140">
                {/* Layer labels */}
                {['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4'].map((l, i) => (
                  <text key={l} x={25 + i*50} y="130" textAnchor="middle"
                    fontSize="8" fill="#888" fontFamily="monospace">{l}</text>
                ))}
                {/* Distribution bars getting wider and shifting */}
                {[
                  { x: 25, h: 40, y: 70, color: '#378ADD' },
                  { x: 75, h: 55, y: 55, color: '#BA7517' },
                  { x: 125, h: 70, y: 40, color: '#D85A30' },
                  { x: 175, h: 85, y: 25, color: '#ff4757' },
                ].map((bar, i) => (
                  <g key={i}>
                    <rect x={bar.x - 15} y={bar.y} width="30" height={bar.h}
                      fill={`${bar.color}30`} stroke={bar.color} strokeWidth="1.5" rx="3" />
                    <line x1={bar.x} y1={bar.y} x2={bar.x} y2={bar.y + bar.h}
                      stroke={bar.color} strokeWidth="1" strokeDasharray="2,2" />
                  </g>
                ))}
                <text x="100" y="15" textAnchor="middle" fontSize="9"
                  fill="#ff4757" fontFamily="monospace">activations grow and shift</text>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                WITH BatchNorm — activations stay stable
              </div>
              <svg width="100%" viewBox="0 0 200 140">
                {['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4'].map((l, i) => (
                  <text key={l} x={25 + i*50} y="130" textAnchor="middle"
                    fontSize="8" fill="#888" fontFamily="monospace">{l}</text>
                ))}
                {[25, 75, 125, 175].map((x, i) => (
                  <g key={i}>
                    <rect x={x - 14} y="55" width="28" height="55"
                      fill="rgba(29,158,117,0.15)" stroke="#1D9E75" strokeWidth="1.5" rx="3" />
                    <line x1={x} y1="55" x2={x} y2="110"
                      stroke="#1D9E75" strokeWidth="1" strokeDasharray="2,2" />
                  </g>
                ))}
                <text x="100" y="15" textAnchor="middle" fontSize="9"
                  fill="#1D9E75" fontFamily="monospace">consistent distribution per layer</text>
              </svg>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
torch.manual_seed(42)
n = 3000

distance = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic  = np.random.randint(1, 11, n).astype(float)
prep     = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
value    = np.abs(np.random.normal(350, 150, n)).clip(50, 1200)
delivery = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
            + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep, value])
y = delivery.reshape(-1, 1)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
X_mean, X_std = X_tr.mean(0), X_tr.std(0) + 1e-8
y_mean, y_std = y_tr.mean(), y_tr.std() + 1e-8
X_tr_t = torch.FloatTensor((X_tr - X_mean) / X_std)
y_tr_t = torch.FloatTensor((y_tr - y_mean) / y_std)
X_te_t = torch.FloatTensor((X_te - X_mean) / X_std)

# ── Without BatchNorm ──────────────────────────────────────────────────
model_no_bn = nn.Sequential(
    nn.Linear(4, 128), nn.ReLU(),
    nn.Linear(128, 64), nn.ReLU(),
    nn.Linear(64, 32), nn.ReLU(),
    nn.Linear(32, 1),
)

# ── With BatchNorm — placed BEFORE activation ─────────────────────────
# Standard order: Linear → BatchNorm → Activation
model_bn = nn.Sequential(
    nn.Linear(4, 128), nn.BatchNorm1d(128), nn.ReLU(),
    nn.Linear(128, 64), nn.BatchNorm1d(64), nn.ReLU(),
    nn.Linear(64, 32), nn.BatchNorm1d(32), nn.ReLU(),
    nn.Linear(32, 1),
)

def train(model, epochs=100, lr=0.001):
    opt      = optim.Adam(model.parameters(), lr=lr)
    loss_fn  = nn.MSELoss()
    loader   = torch.utils.data.DataLoader(
        torch.utils.data.TensorDataset(X_tr_t, y_tr_t),
        batch_size=64, shuffle=True,
    )
    train_losses, val_losses = [], []
    for epoch in range(epochs):
        model.train()
        for Xb, yb in loader:
            opt.zero_grad()
            loss_fn(model(Xb), yb).backward()
            opt.step()
        model.eval()
        with torch.no_grad():
            train_losses.append(loss_fn(model(X_tr_t), y_tr_t).item())
            val_losses.append(loss_fn(model(X_te_t),
                torch.FloatTensor((y_te - y_mean) / y_std)).item())
    return train_losses, val_losses

print("Training comparison: with vs without BatchNorm")
print(f"{'Model':<20} {'Train loss':>12} {'Val loss':>10} {'Test MAE':>10}")
print("─" * 56)

for name, model in [('No BatchNorm', model_no_bn), ('With BatchNorm', model_bn)]:
    torch.manual_seed(42)
    tr_l, va_l = train(model)
    model.eval()
    with torch.no_grad():
        y_pred = model(X_te_t).numpy() * y_std + y_mean
    mae = mean_absolute_error(y_te, y_pred)
    print(f"  {name:<18}  {tr_l[-1]:>12.6f}  {va_l[-1]:>10.6f}  {mae:>10.4f}")

# ── BatchNorm has different behaviour in train vs eval mode ───────────
# Training: normalise using BATCH statistics (mean/std of current mini-batch)
# Eval:     normalise using RUNNING statistics (accumulated during training)
# THIS IS CRITICAL — forgetting model.eval() causes BatchNorm to use
# batch stats at inference time, which is wrong and non-deterministic

model_bn.train()   # BatchNorm uses batch statistics
model_bn.eval()    # BatchNorm uses running mean/var — correct for inference
print("\nCritical: always call model.eval() before inference with BatchNorm.")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — DROPOUT ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Technique 3 — prevent overfitting</span>
        <h2 style={S.h2}>Dropout — randomly disable neurons during training</h2>

        <p style={S.p}>
          Dropout is the simplest and most effective regularisation technique
          for neural networks. During each training step, each neuron is
          randomly set to zero with probability p (the dropout rate).
          The neuron produces no output and receives no gradient for that step.
          At test time, all neurons are active and their outputs are scaled
          by (1 − p) to compensate for the extra neurons.
        </p>

        <p style={S.p}>
          Why does randomly disabling neurons help? It prevents co-adaptation —
          neurons learning to rely on specific other neurons. When any neuron
          might be absent, every neuron is forced to learn features that are
          individually useful. The result is an ensemble effect:
          each forward pass trains a slightly different sub-network,
          and the full network is an implicit average of all these sub-networks.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A cricket team that always plays with the same 11 players develops
            tight co-dependences — the bowlers know exactly when the fielders will
            move. Now randomly sit out 3 players each practice session.
            Every player must become more versatile, able to cover gaps.
            The team becomes more robust. That is dropout.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            In deep learning: each neuron must learn a feature that is useful
            regardless of which other neurons happen to be active.
            The network cannot rely on any specific path from input to output.
          </p>
        </AnalogyBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
torch.manual_seed(42)
n = 1000   # small dataset to demonstrate overfitting clearly

distance = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic  = np.random.randint(1, 11, n).astype(float)
prep     = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
value    = np.abs(np.random.normal(350, 150, n)).clip(50, 1200)
delivery = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
            + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep, value])
y = delivery.reshape(-1, 1)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
X_mean, X_std = X_tr.mean(0), X_tr.std(0) + 1e-8
y_mean, y_std = y_tr.mean(), y_tr.std() + 1e-8
X_tr_t = torch.FloatTensor((X_tr - X_mean) / X_std)
y_tr_t = torch.FloatTensor((y_tr - y_mean) / y_std)
X_te_t = torch.FloatTensor((X_te - X_mean) / X_std)

def build_model(dropout_p=0.0):
    layers = []
    dims   = [4, 256, 256, 128, 64, 1]
    for i in range(len(dims) - 2):
        layers += [nn.Linear(dims[i], dims[i+1]), nn.ReLU()]
        if dropout_p > 0:
            layers.append(nn.Dropout(p=dropout_p))
    layers.append(nn.Linear(dims[-2], dims[-1]))
    return nn.Sequential(*layers)

def train_eval(model, epochs=150):
    opt     = optim.Adam(model.parameters(), lr=0.001)
    loss_fn = nn.MSELoss()
    loader  = torch.utils.data.DataLoader(
        torch.utils.data.TensorDataset(X_tr_t, y_tr_t),
        batch_size=32, shuffle=True,
    )
    for _ in range(epochs):
        model.train()   # dropout ACTIVE during training
        for Xb, yb in loader:
            opt.zero_grad()
            loss_fn(model(Xb), yb).backward()
            opt.step()

    model.eval()        # dropout INACTIVE during evaluation
    with torch.no_grad():
        tr_loss = loss_fn(model(X_tr_t), y_tr_t).item()
        val_loss = loss_fn(model(X_te_t),
            torch.FloatTensor((y_te - y_mean) / y_std)).item()
        y_pred  = model(X_te_t).numpy() * y_std + y_mean
    return tr_loss, val_loss, mean_absolute_error(y_te, y_pred)

print("Dropout effect on overfitting (large model, small dataset):")
print(f"{'Dropout p':<14} {'Train loss':>12} {'Val loss':>10} {'Gap':>8} {'Test MAE':>10}")
print("─" * 58)

for p in [0.0, 0.1, 0.3, 0.5, 0.7]:
    torch.manual_seed(42)
    tr, va, mae = train_eval(build_model(p))
    gap  = va - tr
    flag = ' ← overfit' if gap > 0.3 else ' ← underfit' if va > 1.0 else ''
    print(f"  p={p:<12}  {tr:>12.4f}  {va:>10.4f}  {gap:>8.4f}  {mae:>10.4f}{flag}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — LEARNING RATE SCHEDULING ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Technique 4 — decay the learning rate as training matures</span>
        <h2 style={S.h2}>Learning rate schedules — start fast, finish precise</h2>

        <p style={S.p}>
          A high learning rate at the start of training is good —
          large steps explore the loss landscape quickly and escape
          bad initialisations. But a high learning rate near convergence
          is bad — the model bounces around the minimum without settling into it.
          Learning rate schedules reduce the learning rate as training progresses,
          combining fast early progress with precise final convergence.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              name: 'StepLR',
              color: '#D85A30',
              desc: 'Multiply lr by gamma every step_size epochs. Simple and widely used. lr drops discretely — you see the loss decrease in jumps.',
              code: 'StepLR(optimizer, step_size=30, gamma=0.1)',
              pattern: 'lr: 0.01 → 0.001 (at epoch 30) → 0.0001 (at epoch 60)',
            },
            {
              name: 'CosineAnnealingLR',
              color: '#7b61ff',
              desc: 'Smoothly decreases lr following a cosine curve from initial to eta_min over T_max epochs. Smooth and reliable — very widely used.',
              code: 'CosineAnnealingLR(optimizer, T_max=100, eta_min=1e-6)',
              pattern: 'lr follows cos curve: fast decrease then slow settling',
            },
            {
              name: 'ReduceLROnPlateau',
              color: '#1D9E75',
              desc: 'Monitor a metric (val loss). If it does not improve for "patience" epochs, reduce lr by factor. Adaptive — reacts to actual training dynamics.',
              code: 'ReduceLROnPlateau(optimizer, patience=10, factor=0.5)',
              pattern: 'lr only drops when training stalls — most efficient',
            },
            {
              name: 'OneCycleLR',
              color: '#378ADD',
              desc: 'Increase lr from base to max over first 30% of training, then decrease to near-zero. Based on the "super-convergence" phenomenon. Often fastest to converge.',
              code: 'OneCycleLR(optimizer, max_lr=0.01, total_steps=total)',
              pattern: 'warmup → peak → cooldown in one cycle',
            },
          ].map((item) => (
            <div key={item.name} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '11px 14px',
              borderLeft: `3px solid ${item.color}`,
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>
                  {item.name}
                </span>
              </div>
              <p style={{ ...S.ps, marginBottom: 5 }}>{item.desc}</p>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: item.color, marginBottom: 3 }}>
                {item.code}
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>
                {item.pattern}
              </div>
            </div>
          ))}
        </div>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
torch.manual_seed(42)
n = 3000

distance = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic  = np.random.randint(1, 11, n).astype(float)
prep     = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
value    = np.abs(np.random.normal(350, 150, n)).clip(50, 1200)
delivery = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
            + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep, value])
y = delivery.reshape(-1, 1)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
X_mean, X_std = X_tr.mean(0), X_tr.std(0) + 1e-8
y_mean, y_std = y_tr.mean(), y_tr.std() + 1e-8
X_tr_t = torch.FloatTensor((X_tr - X_mean) / X_std)
y_tr_t = torch.FloatTensor((y_tr - y_mean) / y_std)
X_te_t = torch.FloatTensor((X_te - X_mean) / X_std)
y_te_t = torch.FloatTensor((y_te - y_mean) / y_std)

EPOCHS = 100
BATCH  = 64
loader = torch.utils.data.DataLoader(
    torch.utils.data.TensorDataset(X_tr_t, y_tr_t),
    batch_size=BATCH, shuffle=True,
)

def make_model():
    return nn.Sequential(
        nn.Linear(4, 64), nn.BatchNorm1d(64), nn.ReLU(), nn.Dropout(0.2),
        nn.Linear(64, 32), nn.BatchNorm1d(32), nn.ReLU(), nn.Dropout(0.2),
        nn.Linear(32, 1),
    )

def run_experiment(scheduler_name):
    torch.manual_seed(42)
    model     = make_model()
    loss_fn   = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=0.01)

    if scheduler_name == 'none':
        scheduler = None
    elif scheduler_name == 'step':
        scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=30, gamma=0.1)
    elif scheduler_name == 'cosine':
        scheduler = optim.lr_scheduler.CosineAnnealingLR(
            optimizer, T_max=EPOCHS, eta_min=1e-6)
    elif scheduler_name == 'plateau':
        scheduler = optim.lr_scheduler.ReduceLROnPlateau(
            optimizer, patience=8, factor=0.5, verbose=False)
    elif scheduler_name == 'onecycle':
        scheduler = optim.lr_scheduler.OneCycleLR(
            optimizer, max_lr=0.01,
            steps_per_epoch=len(loader), epochs=EPOCHS)

    for epoch in range(EPOCHS):
        model.train()
        for Xb, yb in loader:
            optimizer.zero_grad()
            loss_fn(model(Xb), yb).backward()
            optimizer.step()
            if scheduler_name == 'onecycle':
                scheduler.step()   # OneCycleLR steps per batch

        if scheduler and scheduler_name != 'onecycle':
            if scheduler_name == 'plateau':
                model.eval()
                with torch.no_grad():
                    val_loss = loss_fn(model(X_te_t), y_te_t).item()
                scheduler.step(val_loss)
            else:
                scheduler.step()

    model.eval()
    with torch.no_grad():
        y_pred = model(X_te_t).numpy() * y_std + y_mean
    return mean_absolute_error(y_te, y_pred)

print("Learning rate schedule comparison:")
for name in ['none', 'step', 'cosine', 'plateau', 'onecycle']:
    mae = run_experiment(name)
    bar = '█' * int((6 - mae) * 10)
    print(f"  {name:<12}: MAE={mae:.4f} min  {bar}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — PUTTING IT ALL TOGETHER ═════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The production training recipe</span>
        <h2 style={S.h2}>All four techniques together — the standard modern training loop</h2>

        <p style={S.p}>
          In production, all four techniques are used simultaneously.
          AdamW as the optimizer, BatchNorm between linear layers and activations,
          Dropout after activations in hidden layers, CosineAnnealingLR
          or ReduceLROnPlateau for scheduling, and early stopping to prevent
          overfitting when validation loss stops improving.
          This is the recipe used in virtually every production MLP today.
        </p>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import copy, warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
torch.manual_seed(42)
n = 3000

distance = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic  = np.random.randint(1, 11, n).astype(float)
prep     = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
value    = np.abs(np.random.normal(350, 150, n)).clip(50, 1200)
delivery = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
            + np.random.normal(0, 4, n)).clip(10, 120)

X = np.column_stack([distance, traffic, prep, value])
y = delivery.reshape(-1, 1)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

# Small val split from train for early stopping
X_tv, X_val, y_tv, y_val = train_test_split(X_tr, y_tr, test_size=0.15, random_state=42)
X_mean, X_std = X_tv.mean(0), X_tv.std(0) + 1e-8
y_mean, y_std = y_tv.mean(), y_tv.std() + 1e-8

to_t  = lambda arr: torch.FloatTensor((arr - X_mean) / X_std)
to_ty = lambda arr: torch.FloatTensor((arr - y_mean) / y_std)

X_tv_t  = to_t(X_tv);   y_tv_t  = to_ty(y_tv)
X_val_t = to_t(X_val);  y_val_t = to_ty(y_val)
X_te_t  = to_t(X_te)

# ── Production model — all four techniques ────────────────────────────
class ProductionMLP(nn.Module):
    def __init__(self, in_dim=4, hidden=[128, 64, 32], dropout=0.2):
        super().__init__()
        layers = []
        dims   = [in_dim] + hidden
        for i in range(len(dims) - 1):
            layers += [
                nn.Linear(dims[i], dims[i+1]),
                nn.BatchNorm1d(dims[i+1]),   # ← BatchNorm
                nn.ReLU(),
                nn.Dropout(dropout),          # ← Dropout
            ]
        layers.append(nn.Linear(dims[-1], 1))
        self.net = nn.Sequential(*layers)

    def forward(self, x):
        return self.net(x)

model     = ProductionMLP(dropout=0.2)
optimizer = optim.AdamW(model.parameters(), lr=0.001, weight_decay=0.01)  # ← AdamW
scheduler = optim.lr_scheduler.ReduceLROnPlateau(
    optimizer, mode='min', patience=10, factor=0.5, verbose=False,
)
loss_fn = nn.MSELoss()
loader  = torch.utils.data.DataLoader(
    torch.utils.data.TensorDataset(X_tv_t, y_tv_t),
    batch_size=64, shuffle=True,
)

# ── Training loop with early stopping ─────────────────────────────────
best_val_loss   = float('inf')
best_model_wts  = copy.deepcopy(model.state_dict())
patience_count  = 0
PATIENCE        = 20

print("Training with all four techniques:")
print(f"{'Epoch':>7} {'Train loss':>12} {'Val loss':>10} {'LR':>12}")
print("─" * 46)

for epoch in range(1, 201):
    # ── Train ──────────────────────────────────────────────────────────
    model.train()
    for Xb, yb in loader:
        optimizer.zero_grad()
        loss_fn(model(Xb), yb).backward()
        optimizer.step()

    # ── Validate ───────────────────────────────────────────────────────
    model.eval()
    with torch.no_grad():
        tr_loss  = loss_fn(model(X_tv_t), y_tv_t).item()
        val_loss = loss_fn(model(X_val_t), y_val_t).item()

    scheduler.step(val_loss)   # ← LR schedule reacts to val loss
    current_lr = optimizer.param_groups[0]['lr']

    if epoch % 25 == 0:
        print(f"  {epoch:>5}  {tr_loss:>12.6f}  {val_loss:>10.6f}  {current_lr:>12.6f}")

    # ── Early stopping ─────────────────────────────────────────────────
    if val_loss < best_val_loss:
        best_val_loss  = val_loss
        best_model_wts = copy.deepcopy(model.state_dict())
        patience_count = 0
    else:
        patience_count += 1
        if patience_count >= PATIENCE:
            print(f"  Early stopping at epoch {epoch} — no improvement for {PATIENCE} epochs")
            break

# ── Restore best model and evaluate ───────────────────────────────────
model.load_state_dict(best_model_wts)
model.eval()
with torch.no_grad():
    y_pred = model(X_te_t).numpy() * y_std + y_mean

mae = mean_absolute_error(y_te, y_pred)
print(f"\nFinal test MAE: {mae:.4f} minutes")
print(f"Best val loss:  {best_val_loss:.6f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common training technique mistake — explained and fixed</h2>

        <ErrorBlock
          error="Model gives different predictions every time you call it — non-deterministic inference"
          cause="Dropout is active during inference. You forgot to call model.eval() before generating predictions. In training mode, Dropout randomly zeros activations — so the same input produces different outputs on every call. BatchNorm also behaves differently in train vs eval mode."
          fix="Always call model.eval() before any inference: model.eval(); with torch.no_grad(): y_pred = model(X). The with torch.no_grad() also prevents unnecessary gradient computation. Pair model.eval() with model.train() when resuming training. A common pattern: wrap all evaluation code in a context manager that calls eval() and restores train() afterward."
        />

        <ErrorBlock
          error="BatchNorm raises ValueError: Expected more than 1 value per channel when training"
          cause="A mini-batch of size 1 was passed to a model containing BatchNorm1d. BatchNorm computes the mean and variance of the batch — with only 1 sample, the variance is zero and normalisation is undefined. This happens when the last batch of an epoch has exactly 1 sample (dataset size not divisible by batch_size)."
          fix="Add drop_last=True to the DataLoader: DataLoader(dataset, batch_size=64, shuffle=True, drop_last=True). This drops the last incomplete batch. Alternatively use larger batch sizes so the probability of a size-1 batch is zero. Or switch to LayerNorm which normalises per sample rather than per batch — does not have this issue."
        />

        <ErrorBlock
          error="Learning rate scheduler is not reducing the learning rate as expected"
          cause="For ReduceLROnPlateau, you are calling scheduler.step() without passing the monitored metric. The scheduler does not know whether performance improved. For epoch-based schedulers (StepLR, CosineAnnealingLR), you are calling scheduler.step() inside the batch loop instead of once per epoch — the lr decays too fast."
          fix="For ReduceLROnPlateau: scheduler.step(val_loss) — pass the metric every epoch. For StepLR/CosineAnnealingLR: call scheduler.step() exactly once per epoch, after the training loop. For OneCycleLR: call scheduler.step() after every batch. Print optimizer.param_groups[0]['lr'] every 10 epochs to verify lr is actually changing."
        />

        <ErrorBlock
          error="Model overfits despite Dropout — train loss near zero, val loss 5× higher"
          cause="Dropout probability is too low, the model is too large for the dataset, or Dropout is placed in the wrong position. Common mistake: placing Dropout before BatchNorm — BatchNorm re-normalises after Dropout, reducing its regularisation effect. Also: Dropout is not a substitute for reducing model size when the model is vastly over-parameterised."
          fix="Increase dropout probability (try 0.3–0.5). Place Dropout after activation, not before BatchNorm: Linear → BatchNorm → ReLU → Dropout. Reduce model width or depth. Add weight_decay=0.01 in AdamW. For very small datasets (under 500 samples), even these may not be enough — use a much smaller model or switch to classical ML which generalises better with few samples."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can train deep MLPs reliably. Next: convolutional networks for images.
        </h2>

        <p style={S.p}>
          The MLP you have built is a general-purpose network — it works on
          tabular data, but it is not the right architecture for images.
          Images have spatial structure: nearby pixels are related, patterns
          appear at different positions in the image. A fully connected layer
          treats every pixel independently and ignores this structure.
          Convolutional Neural Networks (CNNs) are designed specifically
          to exploit spatial structure — they are the backbone of every
          image classification, object detection, and medical imaging system.
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
              Convolutional Neural Networks — Image Classification
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Filters, feature maps, pooling, and how CNNs learn to recognise
              objects at any position in an image.
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
          'Adam maintains a separate adaptive learning rate per weight based on the history of gradients. Weights that receive large consistent gradients get smaller steps. Weights with rare small gradients get larger steps. Use AdamW (Adam with correct weight decay) as the default optimizer for all deep learning.',
          'Batch Normalisation normalises activations at each layer to zero mean and unit variance within each mini-batch, then applies learnable scale (gamma) and shift (beta) parameters. Prevents internal covariate shift, makes very deep networks trainable, and acts as mild regularisation. Always call model.eval() before inference — BatchNorm behaves differently in train vs eval mode.',
          'Dropout randomly zeros a fraction p of neurons during each training step, forcing the network to not rely on any specific path. At inference, all neurons are active and outputs are scaled by (1-p). Place Dropout after activation functions, not before BatchNorm. Typical values: p=0.2 for hidden layers, p=0.5 for the final hidden layer.',
          'Learning rate schedules start with a higher lr for fast early progress and reduce it as training matures for precise final convergence. ReduceLROnPlateau is the most robust — it only reduces lr when validation loss stops improving. OneCycleLR often converges fastest. Always monitor optimizer.param_groups[0]["lr"] to verify the schedule is working.',
          'Early stopping is essential — monitor validation loss and stop training when it has not improved for "patience" epochs, then restore the best weights. This prevents overfitting without needing to guess the right number of epochs in advance.',
          'The production training recipe: AdamW + BatchNorm + Dropout + ReduceLROnPlateau + early stopping. These five components are the standard in virtually every production MLP. Start with lr=0.001, dropout=0.2, weight_decay=0.01, and tune from there.',
        ]}
      />
    </LearnLayout>
  )
}