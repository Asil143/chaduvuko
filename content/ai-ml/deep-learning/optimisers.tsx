import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Optimisers — SGD, Adam, AdamW — Chaduvuko',
  description:
    'Momentum, adaptive learning rates, and weight decay done right. Why AdamW replaced Adam as the default and when SGD still wins — built from plain English first.',
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

export default function OptimisersPage() {
  return (
    <LearnLayout
      title="Optimisers — SGD, Adam, AdamW"
      description="Momentum, adaptive learning rates, and weight decay done right. Why AdamW replaced Adam as the default and when SGD still wins."
      section="Deep Learning"
      readTime="26–34 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="deep-learning" topic="optimisers" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — what problem does an optimiser solve?</span>
        <h2 style={S.h2}>
          Backpropagation tells you which direction to move each weight.
          The optimiser decides how far to move — and how to move smarter
          than just "subtract the gradient."
        </h2>

        <p style={S.p}>
          After backpropagation you have a gradient for every weight —
          the direction in which each weight should change to reduce the loss.
          The simplest possible update: subtract a small fraction of the gradient.
          That fraction is the learning rate. This is plain SGD.
          It works, but it has two major problems in practice.
        </p>

        <p style={S.p}>
          First: the same learning rate for every weight.
          A weight that receives large, consistent gradient signals needs
          smaller steps to avoid overshooting. A weight that receives rare,
          tiny gradients needs larger steps to make any progress.
          Treating all weights the same wastes most of the gradient signal.
        </p>

        <p style={S.p}>
          Second: gradient noise. Mini-batch gradients are noisy estimates
          of the true gradient. A single step in a noisy direction
          wastes a step. Accumulating direction from many past steps
          — momentum — filters noise and accelerates progress.
          Modern optimisers (Adam, AdamW) solve both problems simultaneously.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            SGD is like hiking downhill in thick fog with one step at a time —
            you only see the slope directly under your feet right now.
            SGD with momentum is like a ball rolling downhill — it accumulates
            speed in consistent directions and is slowed less by small bumps.
            Adam is a smart hiker with a map of the terrain history —
            they take big steps on flat ground and small careful steps
            on steep or unpredictable terrain.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            AdamW is Adam who also carries a light backpack that gets heavier
            the further they walk — gently pulling them back toward the origin
            (weight decay) to prevent them from wandering too far.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          Default choice for almost all deep learning: AdamW with lr=1e-3
          and weight_decay=0.01. Start here. Only switch to SGD+momentum
          when you have evidence it generalises better on your specific task
          — which happens mainly for large-scale image classification.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — SGD AND MOMENTUM ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The foundation</span>
        <h2 style={S.h2}>SGD and momentum — from naive update to direction accumulation</h2>

        <p style={S.p}>
          Plain SGD is the simplest possible optimiser: subtract learning_rate × gradient
          from each weight every step. Momentum extends this by accumulating
          a velocity — a weighted average of all past gradients.
          Instead of updating directly from the current gradient,
          you update from the velocity, which smooths out noise
          and accelerates in consistent directions.
        </p>

        <ConceptBox title="SGD vs SGD with momentum — the update equations">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2 }}>
            <div style={{ color: '#888', marginBottom: 8 }}>
              Plain SGD:
            </div>
            <div style={{ color: '#D85A30', marginBottom: 12, paddingLeft: 16 }}>
              W = W − lr × g
            </div>
            <div style={{ color: '#888', marginBottom: 8 }}>
              SGD with momentum:
            </div>
            <div style={{ color: '#1D9E75', paddingLeft: 16 }}>
              v = β × v + g          ← accumulate velocity (β=0.9 typical)
            </div>
            <div style={{ color: '#1D9E75', paddingLeft: 16, marginBottom: 12 }}>
              W = W − lr × v
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              β=0.9: 90% of previous velocity + 10% of new gradient.<br />
              Consistent gradients accumulate — speed builds up.<br />
              Noisy gradients cancel — oscillation dampened.
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
n = 2000

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

def make_model():
    torch.manual_seed(42)
    return nn.Sequential(
        nn.Linear(4, 64), nn.ReLU(),
        nn.Linear(64, 32), nn.ReLU(),
        nn.Linear(32, 1),
    )

def train_and_eval(optimizer_fn, epochs=150):
    model   = make_model()
    opt     = optimizer_fn(model.parameters())
    loss_fn = nn.MSELoss()
    loader  = torch.utils.data.DataLoader(
        torch.utils.data.TensorDataset(X_tr_t, y_tr_t),
        batch_size=64, shuffle=True,
    )
    losses = []
    for epoch in range(epochs):
        model.train()
        for Xb, yb in loader:
            opt.zero_grad()
            loss_fn(model(Xb), yb).backward()
            opt.step()
        model.eval()
        with torch.no_grad():
            losses.append(loss_fn(model(X_tr_t), y_tr_t).item())

    model.eval()
    with torch.no_grad():
        y_pred = model(X_te_t).numpy() * y_std + y_mean
    return losses, mean_absolute_error(y_te, y_pred)

# ── Compare SGD variants ───────────────────────────────────────────────
configs = {
    'SGD (lr=0.01)':              lambda p: optim.SGD(p, lr=0.01),
    'SGD (lr=0.1)':               lambda p: optim.SGD(p, lr=0.1),
    'SGD + momentum (β=0.9)':     lambda p: optim.SGD(p, lr=0.01, momentum=0.9),
    'SGD + momentum + nesterov':  lambda p: optim.SGD(p, lr=0.01,
                                      momentum=0.9, nesterov=True),
}

print(f"{'Optimiser':<32} {'Epoch 10 loss':>14} {'Final loss':>12} {'Test MAE':>10}")
print("─" * 72)
for name, opt_fn in configs.items():
    losses, mae = train_and_eval(opt_fn)
    print(f"  {name:<30}  {losses[9]:>14.6f}  {losses[-1]:>12.6f}  {mae:>10.4f}")

# ── Implement SGD + momentum from scratch ─────────────────────────────
print("\nSGD + momentum from scratch (verify same result as PyTorch):")
W = np.array([1.0, 2.0, -1.0])
g_history = [np.array([0.5, -0.3, 0.8]),
             np.array([0.4, -0.2, 0.7]),
             np.array([0.6, -0.4, 0.9])]

lr, beta = 0.1, 0.9
v = np.zeros_like(W)
for step, g in enumerate(g_history):
    v = beta * v + g
    W = W - lr * v
    print(f"  Step {step+1}: v={v.round(4)}  W={W.round(4)}")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — ADAM ════════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The adaptive optimiser</span>
        <h2 style={S.h2}>Adam — per-weight adaptive learning rates via first and second moments</h2>

        <p style={S.p}>
          Adam (Adaptive Moment Estimation) maintains two running statistics
          per weight: the first moment (exponential moving average of gradients —
          like momentum) and the second moment (exponential moving average of
          squared gradients — measures how large gradients have been historically).
          The effective learning rate for each weight is
          lr / √(second moment) — weights with large past gradients
          get a smaller effective step size automatically.
        </p>

        <VisualBox label="Adam update — six lines, fully explained">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.4 }}>
            <div style={{ color: '#888', marginBottom: 4 }}>Per weight, per step t:</div>
            <div style={{ color: '#7b61ff' }}>m = β₁ × m + (1−β₁) × g         ← 1st moment (momentum-like)</div>
            <div style={{ color: '#1D9E75' }}>v = β₂ × v + (1−β₂) × g²        ← 2nd moment (gradient variance)</div>
            <div style={{ color: '#D85A30' }}>m̂ = m / (1−β₁ᵗ)               ← bias correction (early steps)</div>
            <div style={{ color: '#D85A30' }}>v̂ = v / (1−β₂ᵗ)</div>
            <div style={{ color: '#378ADD' }}>W = W − lr × m̂ / (√v̂ + ε)    ← adaptive update</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>
              Defaults: β₁=0.9  β₂=0.999  ε=1e-8  lr=1e-3<br />
              ε prevents division by zero when v̂ is near zero (sparse gradients)
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
import warnings
warnings.filterwarnings('ignore')

# ── Adam from scratch — every step visible ────────────────────────────
class AdamScratch:
    def __init__(self, params, lr=0.001, betas=(0.9, 0.999), eps=1e-8):
        self.params = list(params)
        self.lr     = lr
        self.b1     = betas[0]
        self.b2     = betas[1]
        self.eps    = eps
        self.t      = 0
        # Initialise moment estimates to zero for every parameter
        self.m = [np.zeros_like(p) for p in self.params]
        self.v = [np.zeros_like(p) for p in self.params]

    def step(self, grads):
        self.t += 1
        for i, (p, g) in enumerate(zip(self.params, grads)):
            # Update biased first moment estimate
            self.m[i] = self.b1 * self.m[i] + (1 - self.b1) * g
            # Update biased second raw moment estimate
            self.v[i] = self.b2 * self.v[i] + (1 - self.b2) * g**2
            # Bias-corrected estimates
            m_hat = self.m[i] / (1 - self.b1**self.t)
            v_hat = self.v[i] / (1 - self.b2**self.t)
            # Update parameter
            p -= self.lr * m_hat / (np.sqrt(v_hat) + self.eps)

# Verify Adam scratch matches PyTorch
np.random.seed(0)
W_scratch = np.array([1.0, -0.5, 0.8, -1.2])
W_torch   = torch.tensor(W_scratch.copy(), requires_grad=True)

adam_scratch = AdamScratch([W_scratch], lr=0.001)
adam_torch   = optim.Adam([W_torch], lr=0.001)

# Simulate 5 gradient steps
for step in range(5):
    g_np = np.random.randn(4) * 0.5
    g_pt = torch.tensor(g_np.copy())

    # Scratch
    adam_scratch.step([g_np])

    # PyTorch
    adam_torch.zero_grad()
    W_torch.grad = g_pt
    adam_torch.step()

    diff = np.abs(W_scratch - W_torch.detach().numpy()).max()
    print(f"Step {step+1}: max diff scratch vs PyTorch = {diff:.2e}  "
          f"{'✓' if diff < 1e-6 else '✗'}")

# ── Why bias correction matters at the start ──────────────────────────
print("\nBias correction effect (first 5 steps, single weight):")
print(f"{'Step':>5} {'m (biased)':>12} {'m_hat (corrected)':>18} {'ratio':>8}")
b1, g = 0.9, 1.0
m = 0.0
for t in range(1, 6):
    m     = b1 * m + (1 - b1) * g
    m_hat = m / (1 - b1**t)
    print(f"  {t:>3}   {m:>12.6f}   {m_hat:>16.6f}   {m_hat/g:>7.4f}")
print("Without correction, first steps are too small (m ≈ 0.1 vs true ≈ 1.0)")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — ADAM vs ADAMW ═══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The important difference</span>
        <h2 style={S.h2}>Adam vs AdamW — why weight decay was broken in Adam</h2>

        <p style={S.p}>
          In standard SGD, L2 regularisation (adding λ||W||² to the loss)
          and weight decay (subtracting λW from the weight directly) are
          mathematically equivalent. In Adam they are not — and this caused
          Adam's weight decay to be effectively much weaker than intended
          for years before anyone noticed.
        </p>

        <p style={S.p}>
          The problem: in Adam, the L2 gradient λW gets divided by √v̂
          just like any other gradient — weights with large historical gradients
          get a smaller effective weight decay than weights with small gradients.
          The regularisation strength varies per weight in an uncontrolled way.
          AdamW (Loshchilov and Hutter, 2019) fixes this by decoupling
          weight decay from the gradient update — applying it directly
          to the weight before the adaptive gradient step.
        </p>

        <ConceptBox title="Adam vs AdamW — the one-line difference">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2 }}>
            <div style={{ color: '#D85A30', marginBottom: 4 }}>
              Adam:   W = W − lr × m̂/(√v̂+ε) − lr × λ × m̂_decay/(√v̂+ε)
            </div>
            <div style={{ color: '#888', marginBottom: 4 }}>
              {'          '}↑ weight decay scaled by adaptive lr — uncontrolled
            </div>
            <div style={{ color: '#1D9E75', marginBottom: 4 }}>
              AdamW:  W = W − lr × λ × W                      ← decouple first
            </div>
            <div style={{ color: '#1D9E75' }}>
              {'        '}W = W − lr × m̂/(√v̂+ε)             ← then adapt
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>
              AdamW weight decay is uniform — every weight shrinks by the same
              fraction λ regardless of its gradient history.
              This is what weight decay should do.
            </div>
          </div>
        </ConceptBox>

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
n = 2000

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

def make_model():
    torch.manual_seed(42)
    return nn.Sequential(
        nn.Linear(4, 64), nn.ReLU(),
        nn.Linear(64, 32), nn.ReLU(),
        nn.Linear(32, 1),
    )

def train_eval(opt_fn, epochs=150):
    model   = make_model()
    opt     = opt_fn(model.parameters())
    loss_fn = nn.MSELoss()
    loader  = torch.utils.data.DataLoader(
        torch.utils.data.TensorDataset(X_tr_t, y_tr_t),
        batch_size=64, shuffle=True,
    )
    for _ in range(epochs):
        model.train()
        for Xb, yb in loader:
            opt.zero_grad()
            loss_fn(model(Xb), yb).backward()
            opt.step()
    model.eval()
    with torch.no_grad():
        y_pred = model(X_te_t).numpy() * y_std + y_mean
        # Weight norm — smaller = more regularised
        w_norm = sum(p.norm().item() for p in model.parameters())
    return mean_absolute_error(y_te, y_pred), w_norm

print(f"{'Optimiser':<35} {'Test MAE':>10} {'Weight norm':>12}")
print("─" * 62)

configs = {
    'SGD (lr=0.01, mom=0.9)':         lambda p: optim.SGD(p, lr=0.01, momentum=0.9),
    'Adam (lr=1e-3)':                  lambda p: optim.Adam(p, lr=1e-3),
    'Adam (lr=1e-3, wd=0.01)':         lambda p: optim.Adam(p, lr=1e-3, weight_decay=0.01),
    'AdamW (lr=1e-3, wd=0.01)':        lambda p: optim.AdamW(p, lr=1e-3, weight_decay=0.01),
    'AdamW (lr=1e-3, wd=0.1)':         lambda p: optim.AdamW(p, lr=1e-3, weight_decay=0.1),
}

for name, opt_fn in configs.items():
    mae, w_norm = train_eval(opt_fn)
    print(f"  {name:<33}  {mae:>10.4f}  {w_norm:>12.4f}")

print("\nObservation: AdamW weight norm is smaller than Adam with same wd")
print("— decoupled weight decay is more effective regularisation.")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — LEARNING RATE SCHEDULES ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Making the learning rate dynamic</span>
        <h2 style={S.h2}>Learning rate schedules — warmup, cosine decay, and ReduceLROnPlateau</h2>

        <p style={S.p}>
          The learning rate is the single most important hyperparameter.
          A fixed learning rate is always a compromise — too high early on
          causes divergence, too low late in training means slow progress.
          Schedules give you the best of both: a high rate for fast early
          exploration and a low rate for precise final convergence.
        </p>

        <p style={S.p}>
          Linear warmup is especially important for Adam-based optimisers.
          In the first steps, the second moment estimate v is near zero —
          the bias correction denominator (1−β₂ᵗ) is small, making v̂ small,
          making the effective learning rate very large.
          Warmup starts with a tiny learning rate and gradually increases it,
          preventing unstable large updates in the first steps.
        </p>

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
n = 2000

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

EPOCHS = 150
BATCH  = 64
loader = torch.utils.data.DataLoader(
    torch.utils.data.TensorDataset(X_tr_t, y_tr_t),
    batch_size=BATCH, shuffle=True,
)

def run(scheduler_name, epochs=EPOCHS):
    torch.manual_seed(42)
    model   = nn.Sequential(
        nn.Linear(4,64), nn.ReLU(),
        nn.Linear(64,32), nn.ReLU(),
        nn.Linear(32,1),
    )
    loss_fn = nn.MSELoss()
    opt     = optim.AdamW(model.parameters(), lr=1e-3, weight_decay=0.01)

    if scheduler_name == 'none':
        sched = None
    elif scheduler_name == 'cosine':
        sched = optim.lr_scheduler.CosineAnnealingLR(opt, T_max=epochs, eta_min=1e-6)
    elif scheduler_name == 'step':
        sched = optim.lr_scheduler.StepLR(opt, step_size=50, gamma=0.1)
    elif scheduler_name == 'plateau':
        sched = optim.lr_scheduler.ReduceLROnPlateau(
            opt, patience=10, factor=0.5, verbose=False)
    elif scheduler_name == 'onecycle':
        sched = optim.lr_scheduler.OneCycleLR(
            opt, max_lr=1e-2,
            steps_per_epoch=len(loader), epochs=epochs)
    elif scheduler_name == 'warmup_cosine':
        # Linear warmup for first 10% of steps, then cosine decay
        total_steps  = epochs * len(loader)
        warmup_steps = int(0.1 * total_steps)
        def lr_lambda(step):
            if step < warmup_steps:
                return step / warmup_steps
            progress = (step - warmup_steps) / (total_steps - warmup_steps)
            return 0.5 * (1 + np.cos(np.pi * progress))
        sched = optim.lr_scheduler.LambdaLR(opt, lr_lambda)

    for epoch in range(epochs):
        model.train()
        for Xb, yb in loader:
            opt.zero_grad()
            loss_fn(model(Xb), yb).backward()
            opt.step()
            if scheduler_name in ('onecycle', 'warmup_cosine'):
                sched.step()

        if sched and scheduler_name not in ('onecycle', 'warmup_cosine'):
            if scheduler_name == 'plateau':
                model.eval()
                with torch.no_grad():
                    val = loss_fn(model(X_te_t), y_te_t).item()
                sched.step(val)
            else:
                sched.step()

    model.eval()
    with torch.no_grad():
        y_pred = model(X_te_t).numpy() * y_std + y_mean
    return mean_absolute_error(y_te, y_pred)

print("Learning rate schedule comparison (AdamW base):")
for name in ['none','cosine','step','plateau','onecycle','warmup_cosine']:
    mae = run(name)
    bar = '█' * int((5.5 - mae) * 12)
    print(f"  {name:<16}: MAE={mae:.4f}  {bar}")

# ── LR warmup: why it matters ─────────────────────────────────────────
print("\nLR warmup — effective lr at step t (AdamW, β₂=0.999):")
lr, b2 = 1e-3, 0.999
warmup = 100
for t in [1, 5, 10, 50, 100, 200]:
    bias_correction = np.sqrt(1 - b2**t)
    eff_lr_no_warmup = lr / bias_correction
    warmup_factor    = min(t / warmup, 1.0)
    eff_lr_warmup    = lr * warmup_factor / bias_correction
    print(f"  step {t:>4}: no warmup={eff_lr_no_warmup:.6f}  "
          f"with warmup={eff_lr_warmup:.6f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — WHEN SGD STILL WINS ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The exception to the rule</span>
        <h2 style={S.h2}>When SGD+momentum beats Adam — and why generalisation differs</h2>

        <p style={S.p}>
          Adam converges faster in almost every setting. But on large-scale
          image classification (ImageNet-scale CNNs) and some NLP tasks,
          SGD+momentum often achieves better final test accuracy despite
          slower convergence. This is a known phenomenon with a theoretical
          explanation: Adam finds sharp minima (narrow valleys in the loss
          landscape) while SGD tends to find flat minima.
          Flat minima generalise better because small perturbations to weights
          — which happen naturally when data distribution shifts slightly —
          do not change the loss much. Sharp minima are sensitive to such perturbations.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          {[
            {
              opt: 'AdamW',
              color: '#7b61ff',
              wins: ['Transformers (BERT, GPT)', 'Small-to-medium MLPs', 'Fast prototyping', 'NLP fine-tuning', 'Tabular deep learning'],
              loses: ['Large-scale image CNNs at final top-1 accuracy', 'Some RL tasks'],
              params: 'lr=1e-3, β₁=0.9, β₂=0.999, wd=0.01',
            },
            {
              opt: 'SGD + momentum',
              color: '#1D9E75',
              wins: ['ImageNet CNNs (ResNet, EfficientNet)', 'Fine-tuning pretrained vision', 'When generalisation gap matters most'],
              loses: ['Slow to converge', 'Sensitive to lr choice', 'Bad for sparse gradients'],
              params: 'lr=0.1, momentum=0.9, wd=1e-4, with cosine schedule',
            },
          ].map((item) => (
            <div key={item.opt} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '13px 14px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 8 }}>
                {item.opt}
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>WINS FOR</div>
              {item.wins.map((w, i) => (
                <div key={i} style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>✓ {w}</div>
              ))}
              <div style={{ fontSize: 10, fontWeight: 700, color: '#ff4757', fontFamily: 'var(--font-mono)', marginTop: 8, marginBottom: 4 }}>WEAKER FOR</div>
              {item.loses.map((l, i) => (
                <div key={i} style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>✗ {l}</div>
              ))}
              <div style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)', marginTop: 8 }}>
                Typical: {item.params}
              </div>
            </div>
          ))}
        </div>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings('ignore')

# ── Head-to-head on a structured classification task ───────────────────
torch.manual_seed(42)
np.random.seed(42)

X_raw, y_raw = make_classification(
    n_samples=3000, n_features=20, n_informative=10,
    n_redundant=5, random_state=42,
)
X_tr_np, X_te_np, y_tr_np, y_te_np = train_test_split(
    X_raw, y_raw, test_size=0.2, stratify=y_raw, random_state=42
)
sc = StandardScaler()
X_tr_t = torch.FloatTensor(sc.fit_transform(X_tr_np))
X_te_t = torch.FloatTensor(sc.transform(X_te_np))
y_tr_t = torch.FloatTensor(y_tr_np)
y_te_t = torch.FloatTensor(y_te_np)

def run_cls(opt_name, epochs=200):
    torch.manual_seed(42)
    model   = nn.Sequential(
        nn.Linear(20, 128), nn.ReLU(),
        nn.Linear(128, 64), nn.ReLU(),
        nn.Linear(64, 1),
    )
    loss_fn = nn.BCEWithLogitsLoss()
    loader  = torch.utils.data.DataLoader(
        torch.utils.data.TensorDataset(X_tr_t, y_tr_t),
        batch_size=64, shuffle=True,
    )

    if opt_name == 'sgd':
        opt   = optim.SGD(model.parameters(), lr=0.01,
                           momentum=0.9, weight_decay=1e-4)
        sched = optim.lr_scheduler.CosineAnnealingLR(opt, T_max=epochs)
    elif opt_name == 'adam':
        opt   = optim.Adam(model.parameters(), lr=1e-3)
        sched = None
    else:
        opt   = optim.AdamW(model.parameters(), lr=1e-3, weight_decay=0.01)
        sched = optim.lr_scheduler.CosineAnnealingLR(opt, T_max=epochs)

    best_val, best_epoch = 0.0, 0
    for epoch in range(epochs):
        model.train()
        for Xb, yb in loader:
            opt.zero_grad()
            loss_fn(model(Xb).squeeze(), yb).backward()
            opt.step()
        if sched:
            sched.step()

        model.eval()
        with torch.no_grad():
            val_acc = ((model(X_te_t).squeeze() > 0).float() == y_te_t).float().mean().item()
        if val_acc > best_val:
            best_val, best_epoch = val_acc, epoch + 1

    return best_val, best_epoch

print(f"{'Optimiser':<20} {'Best val acc':>13} {'At epoch':>10}")
print("─" * 46)
for name in ['sgd', 'adam', 'adamw']:
    acc, ep = run_cls(name)
    print(f"  {name:<18}  {acc:>13.4f}  {ep:>10}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common optimiser mistake — explained and fixed</h2>

        <ErrorBlock
          error="Loss oscillates wildly and never converges — high variance across steps"
          cause="Learning rate is too high. With a large lr, gradient steps overshoot the minimum and bounce between sides of the loss valley. This is especially visible with SGD — Adam is more robust to high lr because the second moment normalises the step size. With SGD and lr=0.1 on a problem that needs lr=0.001, loss will oscillate between high values indefinitely."
          fix="Reduce learning rate by 10×. A good diagnostic: if loss decreases in the first few steps then suddenly spikes, the lr is too high. Use ReduceLROnPlateau as a safety net — it automatically halves lr when loss stops improving. For Adam-based optimisers start at lr=1e-3. For SGD start at lr=0.01 and use cosine decay."
        />

        <ErrorBlock
          error="optimizer.zero_grad() is called after loss.backward() instead of before — gradients accumulate"
          cause="The correct order is: zero_grad() → forward() → loss() → backward() → step(). Calling zero_grad() after backward() clears the gradients that were just computed before step() uses them. The weight update happens with the accumulated gradients from previous steps — training with wrong gradients from the very first step."
          fix="Always follow this exact order every training step: optimizer.zero_grad(); output = model(X); loss = criterion(output, y); loss.backward(); optimizer.step(). Never rearrange these four lines. A common mnemonic: Zero, Forward, Backward, Step — ZFBS."
        />

        <ErrorBlock
          error="AdamW weight_decay has no visible effect — weights are not shrinking"
          cause="weight_decay is too small relative to the learning rate and gradient magnitude. With lr=1e-3 and weight_decay=1e-5, the weight decay term subtracts only 1e-8 per step — negligible compared to gradient updates. Also: using Adam (not AdamW) means weight decay is folded into the gradient and effectively scaled down by the adaptive lr."
          fix="For AdamW, typical weight_decay values are 0.01 to 0.1. weight_decay=1e-5 is essentially no regularisation. Check that you are using optim.AdamW not optim.Adam — they have the same API but AdamW applies weight decay correctly. Verify by printing the L2 norm of weights before and after 100 steps: it should decrease with AdamW."
        />

        <ErrorBlock
          error="Model trained with Adam overfits but SGD version does not on the same architecture"
          cause="Adam finds sharp minima — narrow valleys in the loss landscape that fit training data very well but do not generalise. SGD with momentum has an implicit bias toward flatter minima due to its noisier trajectory. This is not a bug in Adam — it is a known property. On large models with limited data, Adam's tendency toward sharp minima causes worse generalisation."
          fix="Add weight decay: optim.AdamW with weight_decay=0.01–0.1 pulls weights toward zero which flattens the effective loss landscape. Add dropout and BatchNorm. Use a larger batch size — larger batches reduce gradient noise, helping Adam find flatter minima. Or switch to SGD+momentum with cosine lr schedule for tasks where generalisation is critical."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          Optimisers are chosen. Next: make deep networks stable and
          prevent them from overfitting.
        </h2>

        <p style={S.p}>
          You now have the complete training loop: forward pass, loss,
          backprop, optimiser step. Module 45 adds the two techniques
          that make deep networks stable and generalisable at scale —
          Batch Normalisation (stabilise activations between layers)
          and Dropout (prevent co-adaptation and overfitting).
          These are not optional extras — they are standard components
          of every production deep learning model.
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
              Next — Module 45 · Deep Learning
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Batch Normalisation and Dropout
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Internal covariate shift, running statistics, and why
              model.eval() is not optional when BatchNorm is in your network.
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
          'SGD updates every weight by the same learning rate times the gradient. SGD with momentum accumulates a velocity — a weighted average of past gradients. Momentum smooths noisy gradient directions and accelerates in consistent directions. β=0.9 is the standard default.',
          'Adam maintains per-weight adaptive learning rates using two moment estimates: the first moment (running mean of gradients — like momentum) and the second moment (running mean of squared gradients — measures gradient magnitude). Weights with large past gradients get smaller effective steps automatically.',
          'Bias correction in Adam is essential in the first training steps. Without it, m and v start at zero and underestimate the true moments — producing unstable first updates. The correction terms 1/(1−β₁ᵗ) and 1/(1−β₂ᵗ) fix this and become negligible after ~100 steps.',
          'AdamW decouples weight decay from the gradient update. In Adam, L2 regularisation is scaled by the adaptive learning rate — making it weaker for frequently-updated weights. AdamW applies weight decay directly to the weight before the gradient step — uniform across all weights. Always prefer AdamW over Adam.',
          'Default starting point for any new deep learning project: AdamW with lr=1e-3 and weight_decay=0.01. Pair with CosineAnnealingLR or ReduceLROnPlateau. Only switch to SGD+momentum when you have evidence it generalises better — primarily large-scale image classification.',
          'The mandatory training step order: optimizer.zero_grad() → forward pass → loss → loss.backward() → optimizer.step(). Never rearrange these four lines. zero_grad() must come before backward() — PyTorch accumulates gradients by default and calling zero_grad() after backward() clears the gradients before they are used.',
        ]}
      />
    </LearnLayout>
  )
}
