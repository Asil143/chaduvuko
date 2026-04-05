import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'GANs — Generator vs Discriminator — Chaduvuko',
  description:
    'Two networks in adversarial competition. Mode collapse, training instability, Wasserstein distance — the honest account of what makes GANs hard to train.',
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

export default function GANsPage() {
  return (
    <LearnLayout
      title="GANs — Generator vs Discriminator"
      description="Two networks in adversarial competition. Mode collapse, training instability, Wasserstein distance — the honest account of what makes GANs hard to train."
      section="Generative AI"
      readTime="40–45 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="generative-ai" topic="gans-generator-discriminator" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any math — the adversarial idea</span>
        <h2 style={S.h2}>
          A forger tries to create fake currency that fools the bank.
          The bank trains detectors to catch fakes.
          The forger studies the detector's failures and improves.
          Both get better in lockstep. That is a GAN.
        </h2>

        <p style={S.p}>
          Ian Goodfellow invented GANs in 2014 — the idea came to him at a
          bar in Montreal after a friend suggested using a neural network
          to generate images. The insight: instead of hand-crafting a loss
          function that measures image quality (which is impossible to define),
          learn the loss function itself using a second neural network.
          Let the Discriminator define what "real" looks like,
          and let the Generator learn to fool it.
        </p>

        <p style={S.p}>
          The Generator takes random noise as input and produces an image.
          It never sees real images directly. The Discriminator takes an image
          — either real or generated — and outputs a probability that it is real.
          The two networks are trained simultaneously with opposing objectives:
          the Generator wants to maximise the Discriminator's error,
          the Discriminator wants to minimise it.
          At equilibrium — the Nash equilibrium — the Generator produces
          images indistinguishable from real ones.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A counterfeiter (Generator) and a detective (Discriminator)
            playing an arms race. The counterfeiter starts producing terrible
            fakes — the detective catches them all. The counterfeiter studies
            which fake features gave them away and improves. The detective
            trains on the new fakes and gets better. After 100,000 rounds,
            the counterfeiter produces fakes so good even experts cannot tell
            them apart. Neither was told what perfect currency looks like —
            they learned from each other.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The catch: if the detective gets too good too fast, the counterfeiter
            receives no useful signal — all attempts score equally bad.
            If the counterfeiter gets too good too fast, the detective
            gives up and labels everything as fake. Balance is everything —
            and maintaining balance is why GAN training is notoriously hard.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          GANs have been largely superseded by diffusion models for image quality
          but remain important for fast inference (no iterative denoising),
          video generation components, and as the conceptual foundation for
          understanding adversarial training. Understanding GANs deeply makes
          RLHF (Module 64) and adversarial robustness click immediately.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — THE MATH ════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The objective functions</span>
        <h2 style={S.h2}>Minimax game — what each network optimises and why</h2>

        <p style={S.p}>
          The GAN objective is a minimax game. The Discriminator D maximises
          its ability to distinguish real from fake. The Generator G minimises
          D's ability — equivalently, maximises the probability that D
          mistakes its outputs for real.
        </p>

        <ConceptBox title="GAN minimax objective — the full formulation">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.4 }}>
            <div style={{ color: '#888', marginBottom: 6, fontSize: 11 }}>Original GAN (Goodfellow 2014):</div>
            <div style={{ color: '#7b61ff', paddingLeft: 12, marginBottom: 4 }}>
              min_G  max_D  E[log D(x)] + E[log(1 − D(G(z)))]
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--muted)', paddingLeft: 12, marginTop: 8 }}>
              <div><span style={{ color: '#1D9E75' }}>x</span>   = real image from training data</div>
              <div><span style={{ color: '#D85A30' }}>z</span>   = random noise vector (typically 100–512 dim Gaussian)</div>
              <div><span style={{ color: '#378ADD' }}>G(z)</span> = fake image produced by generator</div>
              <div><span style={{ color: '#BA7517' }}>D(x)</span> = discriminator's probability that x is real (0–1)</div>
            </div>
            <div style={{ marginTop: 12, paddingLeft: 12 }}>
              <div style={{ fontSize: 11, color: '#1D9E75', marginBottom: 4 }}>
                Discriminator loss: −[log D(x) + log(1 − D(G(z)))]  ← maximise both terms
              </div>
              <div style={{ fontSize: 11, color: '#D85A30' }}>
                Generator loss:     −log D(G(z))  ← maximise D's score on fakes (non-saturating)
              </div>
            </div>
          </div>
        </ConceptBox>

        <VisualBox label="Training loop — alternating D and G updates">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                phase: 'Step 1 — Train Discriminator',
                color: '#378ADD',
                steps: [
                  'Sample real images x from training data',
                  'Sample noise z, generate fake images G(z)',
                  'D loss = −[log D(x) + log(1 − D(G(z)))]',
                  'Backprop through D only — G weights frozen',
                ],
              },
              {
                phase: 'Step 2 — Train Generator',
                color: '#D85A30',
                steps: [
                  'Sample fresh noise z',
                  'Generate fake images G(z)',
                  'G loss = −log D(G(z))  ← want D to say "real"',
                  'Backprop through G only — D weights frozen',
                ],
              },
            ].map((item) => (
              <div key={item.phase} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 7, padding: '10px 12px',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 6 }}>
                  {item.phase}
                </div>
                {item.steps.map((step, i) => (
                  <div key={i} style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3, paddingLeft: 8 }}>
                    {i + 1}. {step}
                  </div>
                ))}
              </div>
            ))}
            <div style={{ fontSize: 11, color: '#7b61ff', fontStyle: 'italic', paddingLeft: 4 }}>
              Repeat for N_discriminator_steps : 1 generator step — typically 1:1 or 5:1
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np

torch.manual_seed(42)

# ── Generator — noise → image ─────────────────────────────────────────
class Generator(nn.Module):
    def __init__(self, latent_dim: int = 100, img_dim: int = 784):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(latent_dim, 256),
            nn.LeakyReLU(0.2),
            nn.BatchNorm1d(256),
            nn.Linear(256, 512),
            nn.LeakyReLU(0.2),
            nn.BatchNorm1d(512),
            nn.Linear(512, img_dim),
            nn.Tanh(),   # output in [-1, 1] — match normalised real images
        )
    def forward(self, z): return self.net(z)

# ── Discriminator — image → real/fake probability ──────────────────────
class Discriminator(nn.Module):
    def __init__(self, img_dim: int = 784):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(img_dim, 512),
            nn.LeakyReLU(0.2),   # LeakyReLU prevents dead neurons
            nn.Dropout(0.3),
            nn.Linear(512, 256),
            nn.LeakyReLU(0.2),
            nn.Dropout(0.3),
            nn.Linear(256, 1),
            nn.Sigmoid(),         # output = P(real)
        )
    def forward(self, x): return self.net(x)

# ── Training loop ─────────────────────────────────────────────────────
LATENT_DIM  = 100
IMG_DIM     = 784   # 28×28 flattened
BATCH_SIZE  = 64
LR          = 2e-4

G   = Generator(LATENT_DIM, IMG_DIM)
D   = Discriminator(IMG_DIM)
opt_G = optim.Adam(G.parameters(), lr=LR, betas=(0.5, 0.999))
opt_D = optim.Adam(D.parameters(), lr=LR, betas=(0.5, 0.999))
# betas=(0.5, 0.999) is standard for GANs — lower momentum than default

criterion = nn.BCELoss()

# Labels — use label smoothing to stabilise training
real_label = 0.9   # soft label: not 1.0 but 0.9
fake_label = 0.0

def train_step(real_images: torch.Tensor):
    B = real_images.size(0)

    # ── Train Discriminator ───────────────────────────────────────────
    opt_D.zero_grad()

    # Real images → D should output ~1
    real_out    = D(real_images)
    labels_real = torch.full((B, 1), real_label)
    loss_D_real = criterion(real_out, labels_real)

    # Fake images → D should output ~0
    z         = torch.randn(B, LATENT_DIM)
    fake_imgs = G(z).detach()   # detach: don't backprop through G here
    fake_out  = D(fake_imgs)
    labels_fake = torch.zeros(B, 1)
    loss_D_fake = criterion(fake_out, labels_fake)

    loss_D = loss_D_real + loss_D_fake
    loss_D.backward()
    opt_D.step()

    # ── Train Generator ───────────────────────────────────────────────
    opt_G.zero_grad()

    z         = torch.randn(B, LATENT_DIM)
    fake_imgs = G(z)
    out       = D(fake_imgs)
    # Generator wants D to think fakes are real → label as 1
    labels_real_for_G = torch.ones(B, 1)
    loss_G    = criterion(out, labels_real_for_G)

    loss_G.backward()
    opt_G.step()

    return loss_D.item(), loss_G.item(), real_out.mean().item(), out.mean().item()

# ── Simulate training on random data ──────────────────────────────────
print(f"{'Epoch':>6} {'D loss':>10} {'G loss':>10} {'D(x)':>8} {'D(G(z))':>10}")
print("─" * 50)

for epoch in range(1, 11):
    # Simulate a batch of real images (normally from DataLoader)
    real_batch = torch.randn(BATCH_SIZE, IMG_DIM)   # fake "real" data
    loss_D, loss_G, dx, dgz = train_step(real_batch)

    if epoch % 2 == 0:
        print(f"  {epoch:>4}  {loss_D:>10.4f}  {loss_G:>10.4f}  "
              f"{dx:>8.4f}  {dgz:>10.4f}")

print(f"\nHealthy training targets:")
print(f"  D(x)    ≈ 0.6-0.8  (discriminator not perfect on real images)")
print(f"  D(G(z)) ≈ 0.3-0.5  (generator fooling discriminator some of the time)")
print(f"  If D(x) → 1.0 and D(G(z)) → 0.0: discriminator winning too hard")
print(f"  If D(G(z)) → 1.0: generator winning too hard (or discriminator collapsed)")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — DCGAN ════════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Convolutional GANs</span>
        <h2 style={S.h2}>DCGAN — Deep Convolutional GAN — the architecture that made GANs work for images</h2>

        <p style={S.p}>
          The original GAN used fully connected layers and only worked on
          tiny 28×28 images. DCGAN (Radford et al., 2015) replaced them
          with convolutional layers and introduced a set of architectural
          guidelines that made GAN training dramatically more stable.
          These guidelines are still followed in modern GANs.
        </p>

        <ConceptBox title="DCGAN architectural rules — still used today">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { rule: 'No pooling layers', detail: 'Use strided Conv2d in discriminator, ConvTranspose2d in generator instead of MaxPool/Upsample', color: '#1D9E75' },
              { rule: 'Batch normalisation everywhere', detail: 'Except discriminator input layer and generator output layer — stabilises training dramatically', color: '#7b61ff' },
              { rule: 'No fully connected layers', detail: 'Global average pooling at the end of discriminator instead of flattening + FC', color: '#D85A30' },
              { rule: 'ReLU in generator', detail: 'Tanh for output layer, ReLU for all others', color: '#378ADD' },
              { rule: 'LeakyReLU in discriminator', detail: 'Slope 0.2 for negative part — prevents dead neurons better than ReLU', color: '#BA7517' },
            ].map((item) => (
              <div key={item.rule} style={{
                display: 'grid', gridTemplateColumns: '200px 1fr',
                gap: 10, background: 'var(--bg2)',
                borderRadius: 4, padding: '6px 10px',
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: item.color }}>{item.rule}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.detail}</span>
              </div>
            ))}
          </div>
        </ConceptBox>

        <CodeBlock code={`import torch
import torch.nn as nn

def weights_init(m):
    """DCGAN weight initialisation — mean=0, std=0.02 for conv and bn."""
    classname = m.__class__.__name__
    if 'Conv' in classname:
        nn.init.normal_(m.weight.data, 0.0, 0.02)
    elif 'BatchNorm' in classname:
        nn.init.normal_(m.weight.data, 1.0, 0.02)
        nn.init.constant_(m.bias.data, 0)

# ── DCGAN Generator — noise → 64×64 image ────────────────────────────
class DCGANGenerator(nn.Module):
    """
    Input: (B, latent_dim, 1, 1)
    Output: (B, 3, 64, 64) — RGB image in [-1, 1]
    Each ConvTranspose2d doubles spatial resolution.
    """
    def __init__(self, latent_dim: int = 100, ngf: int = 64):
        super().__init__()
        self.net = nn.Sequential(
            # latent → 4×4
            nn.ConvTranspose2d(latent_dim, ngf*8, 4, 1, 0, bias=False),
            nn.BatchNorm2d(ngf*8), nn.ReLU(True),
            # 4×4 → 8×8
            nn.ConvTranspose2d(ngf*8, ngf*4, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf*4), nn.ReLU(True),
            # 8×8 → 16×16
            nn.ConvTranspose2d(ngf*4, ngf*2, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf*2), nn.ReLU(True),
            # 16×16 → 32×32
            nn.ConvTranspose2d(ngf*2, ngf, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf), nn.ReLU(True),
            # 32×32 → 64×64
            nn.ConvTranspose2d(ngf, 3, 4, 2, 1, bias=False),
            nn.Tanh(),   # output in [-1, 1]
        )
    def forward(self, z): return self.net(z)

# ── DCGAN Discriminator — 64×64 image → P(real) ───────────────────────
class DCGANDiscriminator(nn.Module):
    """
    Input: (B, 3, 64, 64)
    Output: (B, 1) — probability of being real
    Each Conv2d halves spatial resolution (stride=2).
    """
    def __init__(self, ndf: int = 64):
        super().__init__()
        self.net = nn.Sequential(
            # 64×64 → 32×32 (no BN on first layer)
            nn.Conv2d(3, ndf, 4, 2, 1, bias=False),
            nn.LeakyReLU(0.2, inplace=True),
            # 32×32 → 16×16
            nn.Conv2d(ndf, ndf*2, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ndf*2), nn.LeakyReLU(0.2, inplace=True),
            # 16×16 → 8×8
            nn.Conv2d(ndf*2, ndf*4, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ndf*4), nn.LeakyReLU(0.2, inplace=True),
            # 8×8 → 4×4
            nn.Conv2d(ndf*4, ndf*8, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ndf*8), nn.LeakyReLU(0.2, inplace=True),
            # 4×4 → 1×1
            nn.Conv2d(ndf*8, 1, 4, 1, 0, bias=False),
            nn.Sigmoid(),
        )
    def forward(self, x): return self.net(x).view(-1, 1)

# ── Shape verification ────────────────────────────────────────────────
G = DCGANGenerator(latent_dim=100, ngf=64)
D = DCGANDiscriminator(ndf=64)
G.apply(weights_init)
D.apply(weights_init)

z    = torch.randn(4, 100, 1, 1)
fake = G(z)
disc = D(fake)

g_params = sum(p.numel() for p in G.parameters())
d_params = sum(p.numel() for p in D.parameters())

print(f"DCGAN architecture:")
print(f"  Generator:     {g_params:,} parameters")
print(f"  Discriminator: {d_params:,} parameters")
print(f"  Noise input:   {tuple(z.shape)}")
print(f"  Fake image:    {tuple(fake.shape)}  ← (B, 3, 64, 64) in [-1,1]")
print(f"  D output:      {tuple(disc.shape)}  ← P(real) per image")
print(f"\nKey: generator and discriminator have similar parameter counts")
print(f"  Too large D relative to G → D wins too easily → vanishing gradients for G")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — MODE COLLAPSE AND WASSERSTEIN ════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Why GAN training fails</span>
        <h2 style={S.h2}>Mode collapse, vanishing gradients, and the Wasserstein fix</h2>

        <p style={S.p}>
          Two failure modes plague vanilla GAN training.
          Mode collapse: the Generator finds a single image (or a small set)
          that always fools the Discriminator and stops exploring.
          You get 1,000 generated images that all look nearly identical.
          Vanishing gradients: when the Discriminator becomes too good,
          it outputs probabilities near 0 for all fakes — the gradient
          of log(1 − D(G(z))) saturates and the Generator receives no signal.
        </p>

        <p style={S.p}>
          Wasserstein GAN (WGAN, 2017) addresses both by replacing the
          Jensen-Shannon divergence objective with the Wasserstein distance —
          a metric that provides meaningful gradients even when the
          generated and real distributions do not overlap.
          WGAN removes the Sigmoid from the Discriminator (now called Critic),
          clips weights to enforce a Lipschitz constraint, and trains
          the Critic more steps than the Generator.
        </p>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np

# ── Wasserstein GAN with Gradient Penalty (WGAN-GP) ──────────────────
# More stable than vanilla GAN — the standard for production GANs

class WGANCritic(nn.Module):
    """
    Critic (not Discriminator) — no Sigmoid, outputs real number not probability.
    Higher output = more real. Lower = more fake.
    """
    def __init__(self, img_dim: int = 784):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(img_dim, 512),
            nn.LeakyReLU(0.2),
            nn.Linear(512, 256),
            nn.LeakyReLU(0.2),
            nn.Linear(256, 1),
            # No Sigmoid — critic outputs unbounded real number
        )
    def forward(self, x): return self.net(x)

class WGANGenerator(nn.Module):
    def __init__(self, latent_dim: int = 100, img_dim: int = 784):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(latent_dim, 256), nn.ReLU(),
            nn.Linear(256, 512), nn.ReLU(),
            nn.Linear(512, img_dim), nn.Tanh(),
        )
    def forward(self, z): return self.net(z)

def gradient_penalty(critic, real, fake, device='cpu'):
    """
    WGAN-GP gradient penalty — enforces Lipschitz constraint
    by penalising gradients with norm != 1 at interpolated points.
    This replaces weight clipping (more stable).
    """
    B = real.size(0)
    alpha = torch.rand(B, 1, device=device)

    # Interpolate between real and fake
    interpolated = (alpha * real + (1 - alpha) * fake).requires_grad_(True)
    critic_interp = critic(interpolated)

    # Compute gradients of critic output w.r.t. interpolated inputs
    gradients = torch.autograd.grad(
        outputs=critic_interp,
        inputs=interpolated,
        grad_outputs=torch.ones_like(critic_interp),
        create_graph=True,
        retain_graph=True,
    )[0]

    grad_norm = gradients.norm(2, dim=1)
    penalty   = ((grad_norm - 1) ** 2).mean()
    return penalty

# ── WGAN-GP training step ─────────────────────────────────────────────
LATENT_DIM  = 100
IMG_DIM     = 784
BATCH_SIZE  = 64
LR          = 1e-4
LAMBDA_GP   = 10     # gradient penalty weight
N_CRITIC    = 5      # train critic 5x per generator update

G  = WGANGenerator(LATENT_DIM, IMG_DIM)
C  = WGANCritic(IMG_DIM)
opt_G = optim.Adam(G.parameters(), lr=LR, betas=(0.0, 0.9))
opt_C = optim.Adam(C.parameters(), lr=LR, betas=(0.0, 0.9))
# betas=(0.0, 0.9) — no momentum for WGAN — standard recommendation

def wgan_gp_step(real_images):
    B = real_images.size(0)

    # ── Train Critic N_CRITIC times per generator step ────────────────
    for _ in range(N_CRITIC):
        opt_C.zero_grad()
        z    = torch.randn(B, LATENT_DIM)
        fake = G(z).detach()

        # Wasserstein loss: maximise C(real) - C(fake)
        # Critic loss = -[C(real) - C(fake)] = C(fake) - C(real)
        loss_C = C(fake).mean() - C(real_images).mean()
        gp     = gradient_penalty(C, real_images, fake)
        loss_C_total = loss_C + LAMBDA_GP * gp
        loss_C_total.backward()
        opt_C.step()

    # ── Train Generator once ──────────────────────────────────────────
    opt_G.zero_grad()
    z    = torch.randn(B, LATENT_DIM)
    fake = G(z)
    # Generator wants to maximise C(fake) → minimise -C(fake)
    loss_G = -C(fake).mean()
    loss_G.backward()
    opt_G.step()

    return loss_C.item(), loss_G.item(), gp.item()

# Training
print("WGAN-GP training:")
print(f"{'Step':>6} {'W-distance':>12} {'G loss':>10} {'GP':>8}")
print("─" * 40)

for step in range(1, 6):
    real = torch.randn(BATCH_SIZE, IMG_DIM)
    lc, lg, gp = wgan_gp_step(real)
    # Wasserstein distance ≈ -critic_loss (before GP)
    print(f"  {step:>4}  {-lc:>12.4f}  {lg:>10.4f}  {gp:>8.4f}")

print(f"\nWGAN vs vanilla GAN:")
print(f"  No Sigmoid on critic → unbounded scores → meaningful gradients always")
print(f"  Wasserstein distance → meaningful even when distributions don't overlap")
print(f"  Gradient penalty → Lipschitz constraint without weight clipping artifacts")
print(f"  Train critic 5× per G step → critic stays ahead for accurate feedback")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — CONDITIONAL GAN ═════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Controlling generation</span>
        <h2 style={S.h2}>Conditional GAN — generate specific classes on demand</h2>

        <p style={S.p}>
          Vanilla GANs generate random samples from the full data distribution.
          Conditional GANs (cGAN) condition generation on a label —
          generate a kurta specifically, not a random fashion item.
          Both Generator and Discriminator receive the class label
          as additional input. The Generator learns to produce images
          for each class. The Discriminator learns to judge whether an image
          matches its label — not just whether it looks real.
        </p>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim

# ── Conditional GAN — generate specific fashion categories ────────────
N_CLASSES  = 6   # kurta, saree, jeans, sneakers, watch, handbag
LATENT_DIM = 100
IMG_DIM    = 784
EMBED_DIM  = 50

class ConditionalGenerator(nn.Module):
    """
    Takes noise z + class label c → generates image of class c.
    Class label is embedded and concatenated with noise.
    """
    def __init__(self):
        super().__init__()
        # Class embedding: integer class → dense vector
        self.label_emb = nn.Embedding(N_CLASSES, EMBED_DIM)

        self.net = nn.Sequential(
            nn.Linear(LATENT_DIM + EMBED_DIM, 256),
            nn.LeakyReLU(0.2),
            nn.BatchNorm1d(256),
            nn.Linear(256, 512),
            nn.LeakyReLU(0.2),
            nn.BatchNorm1d(512),
            nn.Linear(512, IMG_DIM),
            nn.Tanh(),
        )

    def forward(self, z, labels):
        # Concatenate noise with class embedding
        c    = self.label_emb(labels)     # (B, EMBED_DIM)
        inp  = torch.cat([z, c], dim=1)   # (B, LATENT_DIM + EMBED_DIM)
        return self.net(inp)

class ConditionalDiscriminator(nn.Module):
    """
    Takes image + class label → judges if image matches label AND looks real.
    """
    def __init__(self):
        super().__init__()
        self.label_emb = nn.Embedding(N_CLASSES, IMG_DIM)

        self.net = nn.Sequential(
            nn.Linear(IMG_DIM * 2, 512),  # image + label image concatenated
            nn.LeakyReLU(0.2),
            nn.Dropout(0.3),
            nn.Linear(512, 256),
            nn.LeakyReLU(0.2),
            nn.Dropout(0.3),
            nn.Linear(256, 1),
            nn.Sigmoid(),
        )

    def forward(self, img, labels):
        # Embed label as an image-sized vector and concatenate
        c   = self.label_emb(labels)           # (B, IMG_DIM)
        inp = torch.cat([img, c], dim=1)        # (B, IMG_DIM * 2)
        return self.net(inp)

# ── Training step for cGAN ────────────────────────────────────────────
G = ConditionalGenerator()
D = ConditionalDiscriminator()
opt_G = optim.Adam(G.parameters(), lr=2e-4, betas=(0.5, 0.999))
opt_D = optim.Adam(D.parameters(), lr=2e-4, betas=(0.5, 0.999))
criterion = nn.BCELoss()

def cgan_step(real_images, real_labels):
    B = real_images.size(0)

    # ── Discriminator ────────────────────────────────────────────────
    opt_D.zero_grad()

    # Real images with correct labels
    real_out  = D(real_images, real_labels)
    loss_real = criterion(real_out, torch.full((B, 1), 0.9))

    # Fake images with same labels — G must match the label
    z         = torch.randn(B, LATENT_DIM)
    fake      = G(z, real_labels).detach()
    fake_out  = D(fake, real_labels)
    loss_fake = criterion(fake_out, torch.zeros(B, 1))

    (loss_real + loss_fake).backward()
    opt_D.step()

    # ── Generator ────────────────────────────────────────────────────
    opt_G.zero_grad()
    z      = torch.randn(B, LATENT_DIM)
    labels = torch.randint(0, N_CLASSES, (B,))
    fake   = G(z, labels)
    out    = D(fake, labels)
    loss_G = criterion(out, torch.ones(B, 1))
    loss_G.backward()
    opt_G.step()

    return loss_G.item()

# ── Controlled generation after training ──────────────────────────────
CATEGORIES = ['kurta', 'saree', 'jeans', 'sneakers', 'watch', 'handbag']

print("cGAN: generating specific fashion categories:")
with torch.no_grad():
    for cat_idx, cat_name in enumerate(CATEGORIES):
        z      = torch.randn(4, LATENT_DIM)
        labels = torch.full((4,), cat_idx, dtype=torch.long)
        images = G(z, labels)
        print(f"  {cat_name:<12}: generated {images.shape[0]} images  "
              f"mean={images.mean():.4f}  std={images.std():.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common GAN failure — explained and fixed</h2>

        <ErrorBlock
          error="Generator loss goes to zero immediately — Discriminator wins from step one"
          cause="Discriminator is too powerful relative to the Generator. This happens when the Discriminator has many more parameters, a higher learning rate, or is trained too many steps per Generator step. Once the Discriminator perfectly classifies all fakes (output near 0 for everything), the Generator gradient vanishes — log(1 - D(G(z))) saturates at 0 and the Generator learns nothing."
          fix="Balance the two networks: use similar parameter counts and the same learning rate for both. Use non-saturating Generator loss: instead of minimising log(1 − D(G(z))), maximise log(D(G(z))) — this provides stronger gradients when D is winning. Add label smoothing: use 0.9 for real labels instead of 1.0. Switch to WGAN-GP which provides gradients even when distributions do not overlap."
        />

        <ErrorBlock
          error="Mode collapse — Generator produces nearly identical images regardless of noise input"
          cause="The Generator has found a small set of outputs that consistently fool the current Discriminator and stopped exploring. The Discriminator then specialises to detect exactly those outputs. The Generator shifts slightly to a different mode. Both chase each other in a cycle without ever covering the full data distribution. Common with high learning rates or when the latent space is too small."
          fix="Use minibatch discrimination: show the Discriminator a batch of fake images and let it compare them — if they all look the same, penalise the Generator. Or use mode-seeking loss: add a diversity penalty that maximises the ratio of image distance to latent distance. Use WGAN-GP — Wasserstein distance penalises mode collapse more than Jensen-Shannon divergence. Increase latent_dim (use 256 or 512 instead of 100). Use spectral normalisation on Discriminator weights."
        />

        <ErrorBlock
          error="Training oscillates — loss goes up and down without converging over hundreds of epochs"
          cause="The two networks are not in balance — they alternately overpower each other. When the Discriminator briefly wins, the Generator overshoots to compensate. Then the Discriminator overcorrects. The system cycles. Also caused by using Adam with default betas=(0.9, 0.999) — too much momentum causes oscillation in the adversarial setting."
          fix="Use betas=(0.5, 0.999) for Adam in GANs — lower first-order momentum reduces oscillation. Use exponential moving average (EMA) of Generator weights for stable evaluation: maintain a running average of G weights with decay 0.999 and use those for generating samples. Add a learning rate schedule: decay both lr by 0.99 every epoch. Train Discriminator multiple steps per Generator step (typically 1:1 to 5:1)."
        />

        <ErrorBlock
          error="WGAN training: critic loss does not decrease — Wasserstein distance stays constant"
          cause="Gradient penalty is not being applied correctly, or the LAMBDA_GP value is wrong. If the gradient penalty is too weak (LAMBDA_GP < 1), the critic violates the Lipschitz constraint and produces unbounded scores — training diverges. If too strong (LAMBDA_GP > 100), the critic is over-regularised and cannot learn meaningful distinctions."
          fix="Use LAMBDA_GP=10 — this is the standard value from the WGAN-GP paper and works well in practice. Verify gradient penalty is computed on interpolated points (not on real or fake images separately). Ensure torch.autograd.grad is called with create_graph=True and retain_graph=True. Check that the critic has no Sigmoid activation — WGAN critic outputs unbounded real numbers, not probabilities."
        />
      </div>

      <Div />

      {/* ══ SECTION 7 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You understand adversarial training. Next: a smoother
          path to generation via structured latent spaces.
        </h2>

        <p style={S.p}>
          GANs generate sharp images but training is unstable and mode collapse
          is a constant risk. Variational Autoencoders take a different path —
          instead of adversarial competition, they use a principled probabilistic
          framework that guarantees a smooth, structured latent space.
          Module 62 builds a VAE from scratch, derives the ELBO loss,
          and shows the reparameterisation trick that makes it trainable.
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
              Next — Module 62 · Generative AI
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Variational Autoencoders — Learning Latent Representations
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              The reparameterisation trick, KL divergence loss, and why VAEs
              enable controllable generation through structured latent spaces.
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
          'A GAN pits two networks against each other: the Generator maps random noise to fake data, the Discriminator classifies real vs fake. The Generator is trained to fool the Discriminator; the Discriminator is trained to catch fakes. At Nash equilibrium the Generator produces data indistinguishable from real.',
          'The training loop alternates: train Discriminator on real (label 1) and fake (label 0), then train Generator to make Discriminator output 1 on fakes. Use detach() when training D to prevent gradients flowing back through G. Use betas=(0.5, 0.999) for Adam — lower momentum reduces oscillation.',
          'DCGAN architectural rules that stabilise training: strided convolutions instead of pooling, BatchNorm everywhere except first D layer and last G layer, LeakyReLU(0.2) in D, ReLU in G, Tanh output. Weight initialisation: normal distribution with mean=0, std=0.02.',
          'Two main failure modes: mode collapse (Generator outputs same image repeatedly — fix with minibatch discrimination, WGAN-GP, or larger latent dim) and vanishing gradients (Discriminator wins too easily — fix with non-saturating G loss, label smoothing, or WGAN-GP).',
          'WGAN-GP replaces the Discriminator with a Critic (no Sigmoid), uses Wasserstein distance instead of BCE loss, and enforces the Lipschitz constraint with gradient penalty (LAMBDA_GP=10) instead of weight clipping. Train critic 5 steps per generator step. Use betas=(0.0, 0.9) instead of (0.5, 0.999).',
          'Conditional GANs add class labels as input to both G and D — the Generator learns to produce images of a specific class, the Discriminator judges both realism and label consistency. Implement via nn.Embedding: embed integer class label to a dense vector and concatenate with noise (G) or image (D).',
        ]}
      />
    </LearnLayout>
  )
}
