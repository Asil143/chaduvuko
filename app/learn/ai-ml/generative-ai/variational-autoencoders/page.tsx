import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Variational Autoencoders — Learning Latent Representations — Chaduvuko',
  description:
    'The reparameterisation trick, KL divergence loss, and why VAEs enable controllable generation through structured latent spaces.',
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

export default function VAEPage() {
  return (
    <LearnLayout
      title="Variational Autoencoders — Learning Latent Representations"
      description="The reparameterisation trick, KL divergence loss, and why VAEs enable controllable generation through structured latent spaces."
      section="Generative AI"
      readTime="35–40 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="generative-ai" topic="variational-autoencoders" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any math — autoencoders vs variational autoencoders</span>
        <h2 style={S.h2}>
          A regular autoencoder compresses images to a point.
          A VAE compresses images to a region — a probability distribution.
          That one change makes the latent space smooth, structured,
          and generatable from.
        </h2>

        <p style={S.p}>
          A standard autoencoder has an encoder that maps an image to a
          fixed latent vector z, and a decoder that maps z back to an image.
          Trained to minimise reconstruction error, it learns an efficient
          compression. But the latent space it creates is fragmented —
          arbitrary points in it decode to garbage because the model
          was never trained to handle points other than the exact codes
          it memorised for training images.
        </p>

        <p style={S.p}>
          A VAE changes the encoder's output from a single point to a
          probability distribution — specifically a Gaussian defined by
          mean μ and variance σ². During training, the latent code z is
          sampled from this distribution rather than fixed.
          A regularisation term (KL divergence) forces all these
          distributions to stay close to a standard normal N(0, I).
          The result: the entire latent space is covered continuously —
          any point you sample from N(0, I) decodes to a meaningful image.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A regular autoencoder is like a library where each book has
            a specific assigned shelf location. The shelves between books
            are empty — if you reach between two books you get nothing.
            A VAE is like a library organised by topic, with smooth transitions
            between subjects — books on cricket shade gradually into books
            on other sports, then into general fitness. Any point on the
            shelf has something meaningful. You can navigate by sliding
            from one location to another and find related content throughout.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The KL divergence term is the librarian enforcing this organisation.
            Without it, the encoder would cram all books into tiny clusters
            and leave most of the shelf empty — efficient but not navigable.
          </p>
        </AnalogyBox>
      </div>

      <Div />

      {/* ══ SECTION 2 — ARCHITECTURE ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The architecture</span>
        <h2 style={S.h2}>Encoder, reparameterisation, decoder — every component explained</h2>

        <VisualBox label="VAE data flow — from image to distribution to reconstruction">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                step: 'Input x',
                shape: '(B, C, H, W)',
                color: '#888',
                detail: 'Original image — pixel values normalised to [0, 1]',
              },
              {
                step: 'Encoder E(x)',
                shape: '→ h  (B, hidden)',
                color: '#378ADD',
                detail: 'CNN or MLP that extracts features — same as classification backbone',
              },
              {
                step: 'μ = fc_mean(h)',
                shape: '(B, latent_dim)',
                color: '#7b61ff',
                detail: 'Mean of posterior distribution q(z|x) — one value per latent dimension',
              },
              {
                step: 'log σ² = fc_logvar(h)',
                shape: '(B, latent_dim)',
                color: '#7b61ff',
                detail: 'Log variance — log space for numerical stability (variance must be positive)',
              },
              {
                step: 'z = μ + σ ⊙ ε',
                shape: '(B, latent_dim)',
                color: '#D85A30',
                detail: 'Reparameterisation trick — ε ~ N(0,I) is the random part, μ and σ carry gradients',
              },
              {
                step: 'Decoder D(z)',
                shape: '→ x̂  (B, C, H, W)',
                color: '#1D9E75',
                detail: 'Reconstructed image — trained to match input x',
              },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '180px 160px 1fr',
                gap: 10, background: 'var(--surface)',
                borderRadius: 5, padding: '7px 10px',
                border: `1px solid ${item.color}20`,
                borderLeft: `3px solid ${item.color}`,
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: item.color }}>{item.step}</span>
                <span style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.shape}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.detail}</span>
              </div>
            ))}
          </div>
        </VisualBox>

        <ConceptBox title="The reparameterisation trick — why it exists and what it does">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.2 }}>
            <div style={{ color: '#ff4757', marginBottom: 4 }}>
              Problem: z ~ N(μ, σ²) is not differentiable — sampling breaks backprop
            </div>
            <div style={{ color: '#888', marginBottom: 8, fontSize: 11 }}>
              If we sample z directly, the gradient ∂loss/∂μ and ∂loss/∂σ cannot be computed
            </div>
            <div style={{ color: '#1D9E75', marginBottom: 4 }}>
              Solution: z = μ + σ ⊙ ε  where  ε ~ N(0, I)
            </div>
            <div style={{ color: '#888', fontSize: 11, marginBottom: 8 }}>
              Now ε is the random part (no gradient needed) and μ, σ are deterministic transformations
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, color: 'var(--muted)', fontSize: 11 }}>
              <div>∂loss/∂μ = ∂loss/∂z × ∂z/∂μ = ∂loss/∂z × 1  ← flows through</div>
              <div>∂loss/∂σ = ∂loss/∂z × ∂z/∂σ = ∂loss/∂z × ε ← flows through</div>
            </div>
          </div>
        </ConceptBox>
      </div>

      <Div />

      {/* ══ SECTION 3 — THE ELBO LOSS ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The loss function</span>
        <h2 style={S.h2}>ELBO — Evidence Lower Bound — reconstruction loss plus KL divergence</h2>

        <p style={S.p}>
          The VAE is trained to maximise the ELBO (Evidence Lower Bound) —
          a lower bound on the log likelihood of the data.
          Maximising ELBO is equivalent to minimising two terms:
          the reconstruction loss (how well does the decoder reconstruct the input)
          and the KL divergence (how close is the encoder's distribution to N(0, I)).
          These two terms are in tension — the KL term wants to collapse
          all encodings to N(0, I) which would lose all information,
          while the reconstruction term wants to preserve all information.
          The balance between them creates the structured latent space.
        </p>

        <ConceptBox title="ELBO derivation — the two terms and what they enforce">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.2 }}>
            <div style={{ color: '#7b61ff', marginBottom: 4 }}>
              ELBO = E[log p(x|z)] − KL(q(z|x) || p(z))
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              <div style={{ background: 'var(--bg2)', borderRadius: 5, padding: '8px 10px' }}>
                <div style={{ color: '#1D9E75', marginBottom: 4 }}>Term 1: E[log p(x|z)] — Reconstruction</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                  How well does the decoder reconstruct x from sampled z?<br />
                  Binary CE for image pixels in [0,1]. MSE also common.<br />
                  Maximise → decoder gets better at reconstruction.
                </div>
              </div>
              <div style={{ background: 'var(--bg2)', borderRadius: 5, padding: '8px 10px' }}>
                <div style={{ color: '#D85A30', marginBottom: 4 }}>Term 2: KL(q(z|x) || p(z)) — Regularisation</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                  How far is q(z|x) = N(μ, σ²) from the prior p(z) = N(0, I)?<br />
                  Closed form: −0.5 × Σ(1 + log σ² − μ² − σ²)<br />
                  Minimise → encoder's distributions stay near standard normal.
                </div>
              </div>
              <div style={{ color: '#BA7517', fontSize: 11 }}>
                Loss = Reconstruction Loss + β × KL  (β=1 is standard VAE, β&gt;1 is β-VAE)
              </div>
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
import numpy as np

torch.manual_seed(42)

# ── Full VAE implementation — convolutional ───────────────────────────
class ConvVAE(nn.Module):
    """
    Convolutional VAE for 64×64 RGB images.
    Encoder: image → (μ, log σ²)
    Decoder: z → image
    """
    def __init__(self, latent_dim: int = 128):
        super().__init__()
        self.latent_dim = latent_dim

        # ── Encoder ───────────────────────────────────────────────────
        self.encoder = nn.Sequential(
            nn.Conv2d(3, 32, 4, 2, 1),   # 64 → 32
            nn.ReLU(),
            nn.Conv2d(32, 64, 4, 2, 1),  # 32 → 16
            nn.ReLU(),
            nn.Conv2d(64, 128, 4, 2, 1), # 16 → 8
            nn.ReLU(),
            nn.Conv2d(128, 256, 4, 2, 1),# 8 → 4
            nn.ReLU(),
            nn.Flatten(),                 # 256 × 4 × 4 = 4096
        )
        self.fc_mu      = nn.Linear(4096, latent_dim)
        self.fc_log_var = nn.Linear(4096, latent_dim)

        # ── Decoder ───────────────────────────────────────────────────
        self.fc_decode = nn.Linear(latent_dim, 4096)
        self.decoder   = nn.Sequential(
            nn.ConvTranspose2d(256, 128, 4, 2, 1), # 4 → 8
            nn.ReLU(),
            nn.ConvTranspose2d(128, 64, 4, 2, 1),  # 8 → 16
            nn.ReLU(),
            nn.ConvTranspose2d(64, 32, 4, 2, 1),   # 16 → 32
            nn.ReLU(),
            nn.ConvTranspose2d(32, 3, 4, 2, 1),    # 32 → 64
            nn.Sigmoid(),   # pixel values in [0, 1]
        )

    def encode(self, x):
        h       = self.encoder(x)
        mu      = self.fc_mu(h)
        log_var = self.fc_log_var(h)
        return mu, log_var

    def reparameterise(self, mu, log_var):
        if self.training:
            std = torch.exp(0.5 * log_var)
            eps = torch.randn_like(std)
            return mu + std * eps
        else:
            return mu   # at inference: use mean, no sampling noise

    def decode(self, z):
        h = self.fc_decode(z).view(-1, 256, 4, 4)
        return self.decoder(h)

    def forward(self, x):
        mu, log_var = self.encode(x)
        z           = self.reparameterise(mu, log_var)
        x_recon     = self.decode(z)
        return x_recon, mu, log_var

# ── ELBO loss ─────────────────────────────────────────────────────────
def elbo_loss(x_recon, x, mu, log_var, beta: float = 1.0):
    """
    ELBO = Reconstruction loss + β × KL divergence
    beta=1:  standard VAE
    beta>1:  β-VAE — stronger disentanglement, worse reconstruction
    beta<1:  reconstruction focus — sharper outputs, less structured latent
    """
    # Reconstruction: binary cross-entropy per pixel, summed over batch
    recon_loss = F.binary_cross_entropy(x_recon, x, reduction='sum')

    # KL divergence: −0.5 × Σ(1 + log σ² − μ² − σ²)
    # Closed-form for diagonal Gaussian vs standard normal
    kl_loss = -0.5 * torch.sum(1 + log_var - mu.pow(2) - log_var.exp())

    return (recon_loss + beta * kl_loss) / x.size(0)   # normalise by batch size

# ── Shape check ───────────────────────────────────────────────────────
vae = ConvVAE(latent_dim=128)
x   = torch.rand(4, 3, 64, 64)   # batch of 4 random images

x_recon, mu, log_var = vae(x)
loss = elbo_loss(x_recon, x, mu, log_var, beta=1.0)

total_params = sum(p.numel() for p in vae.parameters())
print(f"ConvVAE shapes:")
print(f"  Input:        {tuple(x.shape)}")
print(f"  Reconstructed:{tuple(x_recon.shape)}")
print(f"  μ:            {tuple(mu.shape)}")
print(f"  log σ²:       {tuple(log_var.shape)}")
print(f"  ELBO loss:    {loss.item():.4f}")
print(f"  Parameters:   {total_params:,}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — TRAINING LOOP ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Training a VAE</span>
        <h2 style={S.h2}>Complete training pipeline with KL annealing</h2>

        <p style={S.p}>
          A critical practical detail: if you start training with the full KL term,
          the encoder immediately collapses all posteriors to N(0, I) because
          that minimises KL loss trivially — the reconstruction loss hasn't
          had time to build useful representations yet.
          KL annealing fixes this: start with β=0 (pure reconstruction),
          gradually increase β to 1 over the first 10–20 epochs.
          The encoder first learns to reconstruct, then learns to organise
          the latent space.
        </p>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
import numpy as np
from torch.utils.data import Dataset, DataLoader

torch.manual_seed(42)

# ── Synthetic dataset — fashion product images ────────────────────────
class SyntheticFashionDataset(Dataset):
    """
    Simulates 6 fashion categories with distinct colour signatures.
    In production: torchvision.datasets.ImageFolder with real images.
    """
    CATEGORY_COLOURS = {
        0: [0.8, 0.2, 0.2],  # kurta — warm red
        1: [0.8, 0.6, 0.1],  # saree — gold
        2: [0.2, 0.3, 0.7],  # jeans — denim blue
        3: [0.3, 0.3, 0.3],  # sneakers — grey
        4: [0.6, 0.4, 0.1],  # watch — brown leather
        5: [0.6, 0.1, 0.5],  # handbag — purple
    }

    def __init__(self, n: int = 600):
        self.n = n
        self.labels = np.random.randint(0, 6, n)

    def __len__(self): return self.n

    def __getitem__(self, i):
        label  = self.labels[i]
        colour = self.CATEGORY_COLOURS[label]
        img    = np.random.randn(3, 64, 64) * 0.1
        for c in range(3):
            img[c] += colour[c]
        img = np.clip(img, 0, 1).astype(np.float32)
        return torch.FloatTensor(img), label

dataset    = SyntheticFashionDataset(n=600)
train_size = 480
val_size   = 120
train_ds, val_ds = torch.utils.data.random_split(dataset, [train_size, val_size])
train_ld = DataLoader(train_ds, batch_size=32, shuffle=True)
val_ld   = DataLoader(val_ds,   batch_size=32)

# ── Smaller VAE for demonstration ─────────────────────────────────────
class SmallVAE(nn.Module):
    def __init__(self, latent_dim=32):
        super().__init__()
        self.latent_dim = latent_dim
        self.encoder = nn.Sequential(
            nn.Conv2d(3, 32, 4, 2, 1), nn.ReLU(),   # 32
            nn.Conv2d(32, 64, 4, 2, 1), nn.ReLU(),  # 16
            nn.Conv2d(64, 128, 4, 2, 1), nn.ReLU(), # 8
            nn.Flatten(),
        )
        self.fc_mu      = nn.Linear(128*8*8, latent_dim)
        self.fc_log_var = nn.Linear(128*8*8, latent_dim)
        self.fc_decode  = nn.Linear(latent_dim, 128*8*8)
        self.decoder = nn.Sequential(
            nn.ConvTranspose2d(128, 64, 4, 2, 1), nn.ReLU(),
            nn.ConvTranspose2d(64, 32, 4, 2, 1),  nn.ReLU(),
            nn.ConvTranspose2d(32, 3, 4, 2, 1),
            nn.Sigmoid(),
        )

    def encode(self, x):
        h = self.encoder(x)
        return self.fc_mu(h), self.fc_log_var(h)

    def reparameterise(self, mu, lv):
        return mu + torch.exp(0.5 * lv) * torch.randn_like(mu) if self.training else mu

    def decode(self, z):
        return self.decoder(self.fc_decode(z).view(-1, 128, 8, 8))

    def forward(self, x):
        mu, lv = self.encode(x)
        z = self.reparameterise(mu, lv)
        return self.decode(z), mu, lv

vae       = SmallVAE(latent_dim=32)
optimizer = optim.Adam(vae.parameters(), lr=1e-3)
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=20)

def kl_anneal(epoch, warmup=10):
    """KL annealing: linearly ramp β from 0 to 1 over warmup epochs."""
    return min(1.0, epoch / warmup)

print(f"Training VAE on fashion dataset:")
print(f"{'Epoch':>6} {'Train loss':>12} {'Recon':>10} {'KL':>8} {'β':>6}")
print("─" * 46)

for epoch in range(1, 21):
    beta = kl_anneal(epoch, warmup=10)
    vae.train()
    total_loss = recon_total = kl_total = 0

    for imgs, _ in train_ld:
        optimizer.zero_grad()
        x_recon, mu, lv = vae(imgs)

        recon = F.binary_cross_entropy(x_recon, imgs, reduction='sum') / imgs.size(0)
        kl    = -0.5 * torch.sum(1 + lv - mu.pow(2) - lv.exp()) / imgs.size(0)
        loss  = recon + beta * kl

        loss.backward()
        nn.utils.clip_grad_norm_(vae.parameters(), 1.0)
        optimizer.step()

        total_loss   += loss.item()
        recon_total  += recon.item()
        kl_total     += kl.item()

    scheduler.step()
    n = len(train_ld)
    if epoch % 4 == 0:
        print(f"  {epoch:>4}  {total_loss/n:>12.2f}  {recon_total/n:>10.2f}  "
              f"{kl_total/n:>8.2f}  {beta:>6.2f}")

print(f"\nKL annealing: β starts at 0 → 1 over 10 epochs")
print(f"  Without annealing: KL collapses all encodings to N(0,I) immediately")
print(f"  With annealing: encoder first learns reconstruction, then latent structure")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — LATENT SPACE APPLICATIONS ═══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Using the latent space</span>
        <h2 style={S.h2}>Interpolation, generation, and anomaly detection — the three VAE superpowers</h2>

        <CodeBlock code={`import torch
import torch.nn as nn
import numpy as np

# Assume vae is trained from previous section
vae.eval()

# ── Application 1: Interpolation between two fashion items ───────────
print("=" * 50)
print("1. LATENT SPACE INTERPOLATION")
print("=" * 50)

# Two images from different categories
img_kurta  = torch.rand(1, 3, 64, 64) * 0.6 + 0.2   # warm colours
img_jeans  = torch.rand(1, 3, 64, 64) * 0.3 + 0.1   # cool dark colours

with torch.no_grad():
    mu_kurta, _  = vae.encode(img_kurta)
    mu_jeans, _  = vae.encode(img_jeans)

    print("Interpolating kurta → jeans:")
    for t in [0.0, 0.25, 0.5, 0.75, 1.0]:
        z_interp  = (1 - t) * mu_kurta + t * mu_jeans
        img_interp = vae.decode(z_interp)
        print(f"  t={t:.2f}: mean={img_interp.mean():.4f}  "
              f"R={img_interp[0,0].mean():.3f}  "
              f"B={img_interp[0,2].mean():.3f}")

# ── Application 2: Random generation from prior ───────────────────────
print("\n" + "=" * 50)
print("2. GENERATING NEW FASHION ITEMS")
print("=" * 50)

with torch.no_grad():
    # Sample from standard normal — the prior p(z)
    z_samples  = torch.randn(8, vae.latent_dim)
    generated  = vae.decode(z_samples)
    print(f"Generated {len(generated)} new images from N(0,I)")
    for i, img in enumerate(generated):
        print(f"  Item {i+1}: mean={img.mean():.4f}  std={img.std():.4f}")

# ── Application 3: Anomaly detection ─────────────────────────────────
print("\n" + "=" * 50)
print("3. ANOMALY DETECTION")
print("=" * 50)
print("""
# Core idea: normal items reconstruct well, anomalies reconstruct poorly.
# Reconstruction error = how "normal" an item is.

# Train VAE only on normal (non-defective) product images.
# At inference: compute reconstruction error for each item.
# High error → anomaly (defect, wrong item, etc.)

def anomaly_score(vae, image, n_samples=10):
    vae.eval()
    with torch.no_grad():
        mu, log_var = vae.encode(image)
        # Average reconstruction error over multiple samples
        # (reduces noise from stochastic sampling)
        errors = []
        for _ in range(n_samples):
            z     = vae.reparameterise(mu, log_var)
            recon = vae.decode(z)
            error = F.mse_loss(recon, image, reduction='mean').item()
            errors.append(error)
        return np.mean(errors)

# Normal item: low reconstruction error
# Defective item: high reconstruction error
# Threshold at 95th percentile of validation set errors

# Used by: quality control at garment factories,
# fraud detection (unusual transaction patterns),
# medical imaging (lesion detection)
""")

# ── Application 4: Attribute manipulation ─────────────────────────────
print("4. LATENT ATTRIBUTE MANIPULATION")
print("""
# Learn direction vectors for specific attributes:
# colour_direction = mean(blue_items_latents) - mean(red_items_latents)

# Then at inference:
# z_blue_version = z_original + alpha * colour_direction
# decoded = vae.decode(z_blue_version)
# → same product, different colour, without re-photographing it

# Used by Myntra for product colour variations.
# Used by Swiggy to generate food images in different presentation styles.
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — BETA-VAE AND DISENTANGLEMENT ════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Controlling the latent space</span>
        <h2 style={S.h2}>β-VAE — disentangled representations where each dimension has meaning</h2>

        <p style={S.p}>
          In a standard VAE (β=1), the latent dimensions are not necessarily
          interpretable — dimension 7 might encode a mixture of colour,
          texture, and shape simultaneously. β-VAE increases the KL weight
          (β {'>'} 1), forcing the encoder to use each latent dimension more
          independently. With enough pressure, individual dimensions learn
          to represent single factors of variation — one dimension for colour,
          one for shape, one for size. This is called disentanglement.
        </p>

        <CodeBlock code={`import torch
import numpy as np

# ── β-VAE: just change beta in the loss ──────────────────────────────
def beta_vae_loss(x_recon, x, mu, log_var, beta: float):
    """
    β-VAE loss with controllable disentanglement.
    beta=1:   standard VAE — best reconstruction
    beta=4:   moderate disentanglement
    beta=10+: strong disentanglement, blurrier reconstruction
    """
    recon = torch.nn.functional.binary_cross_entropy(
        x_recon, x, reduction='sum') / x.size(0)
    kl    = -0.5 * torch.sum(1 + log_var - mu.pow(2) - log_var.exp()) / x.size(0)
    return recon + beta * kl, recon.item(), kl.item()

# ── Demonstrate effect of β on KL and reconstruction ─────────────────
print("Effect of β on training dynamics:")
print(f"{'β':>6} {'Effect':>50}")
print("─" * 60)
betas_guide = [
    (0.0,  'Pure reconstruction — AE mode, no latent regularisation'),
    (0.5,  'Light regularisation — sharp images, some structure'),
    (1.0,  'Standard VAE — balanced reconstruction and structure'),
    (4.0,  'Moderate β-VAE — some disentanglement, slightly blurry'),
    (10.0, 'Strong β-VAE — clear disentanglement, blurry outputs'),
    (100., 'Over-regularised — all encodings collapse to N(0,I)'),
]
for b, effect in betas_guide:
    print(f"  {b:>4.1f}  {effect}")

# ── Measuring disentanglement — latent traversal ──────────────────────
print("""
# Latent traversal: fix all dimensions, vary one → visualise effect
# Well-disentangled: varying dim 3 changes ONLY colour
# Poorly-entangled: varying dim 3 changes colour AND shape AND texture

def latent_traversal(vae, image, dim: int, values: list):
    vae.eval()
    with torch.no_grad():
        mu, _ = vae.encode(image)
        images = []
        for v in values:
            z        = mu.clone()
            z[0, dim] = v         # vary only this dimension
            images.append(vae.decode(z))
        return images

# Traversal values — sweep from -3 to +3 (3 standard deviations)
# traversal_values = torch.linspace(-3, 3, 10)
# for dim in range(vae.latent_dim):
#     imgs = latent_traversal(vae, test_image, dim, traversal_values)
#     # If imgs show monotonic smooth change in one attribute → disentangled
""")

# ── Choosing β for production ─────────────────────────────────────────
print("Practical β selection guide:")
use_cases = [
    ('Image reconstruction / compression',    1.0,  'Prioritise fidelity'),
    ('Data augmentation',                      1.0,  'Good quality variations'),
    ('Anomaly detection',                      1.0,  'Sharp recon error signal'),
    ('Attribute manipulation',                 4.0,  'Partial disentanglement'),
    ('Drug discovery (molecular generation)',  4.0,  'Structured chemical space'),
    ('Interpretability research',             10.0,  'Maximum disentanglement'),
]
print(f"  {'Use case':<40} {'β':>5}  Reason")
print("  " + "─" * 60)
for use, b, reason in use_cases:
    print(f"  {use:<40} {b:>5.1f}  {reason}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common VAE mistake — explained and fixed</h2>

        <ErrorBlock
          error="KL loss goes to zero from the first epoch — posterior collapse"
          cause="The encoder ignores the input and always outputs μ=0, σ=1 (standard normal), minimising KL to zero trivially. The decoder then learns to ignore z and generate blurry average images from scratch. This is posterior collapse — a known VAE failure mode. Happens when KL weight is too high relative to reconstruction loss, or when the decoder is too powerful (can reconstruct well without using z)."
          fix="Use KL annealing: start with β=0 and linearly increase to β=1 over 10–20 epochs. The reconstruction signal trains first, forcing the encoder to encode useful information into z before the KL term regularises it. Also reduce decoder capacity or add a bottleneck. Check: if mu and log_var are near 0 and -∞ respectively for all inputs, posterior collapse has occurred."
        />

        <ErrorBlock
          error="VAE outputs blurry images — reconstructions look smeared and averaged"
          cause="Binary cross-entropy reconstruction loss treats each pixel independently and optimises the expected pixel value. When there is uncertainty about a pixel (the model is unsure between two values), it outputs the average — which appears as blur. This is fundamental to the BCE/MSE pixel-wise reconstruction objective, not a bug. The KL term adds further pressure to average over modes."
          fix="This is an inherent limitation of VAEs. Partially mitigate with: perceptual loss (compare VGG features instead of raw pixels), GAN-style discriminator loss added on top of ELBO (VQVAE-2 approach), or using a discrete latent space (VQ-VAE). For sharp images, use a diffusion model instead — they are specifically designed to avoid this averaging problem. Or reduce β to focus more on reconstruction fidelity."
        />

        <ErrorBlock
          error="RuntimeError: Expected all tensors to be on the same device during reparameterise"
          cause="torch.randn_like(std) creates a tensor on the same device as std, but if std was computed on CPU and the model was later moved to GPU (or vice versa), there is a device mismatch. Also caused by manually constructing the noise tensor with torch.randn(...) instead of torch.randn_like(std) — the former defaults to CPU regardless of where std lives."
          fix="Always use torch.randn_like(std) — it automatically creates noise on the same device as std. Never use torch.randn(std.shape) which always creates on CPU. If you need to manually specify: eps = torch.randn(std.shape, device=std.device). Verify model device before training: print(next(vae.parameters()).device) — should match your training data device."
        />

        <ErrorBlock
          error="Reconstruction loss NaN — training diverges after a few batches"
          cause="Binary cross-entropy requires targets in (0, 1) strictly. If input images are not normalised to [0, 1] — for example raw uint8 values 0–255, or values slightly above 1.0 due to augmentation — BCE produces NaN because log(0) = -∞. Also caused by the Sigmoid activation being missing from the decoder output, sending pixel values outside [0, 1]."
          fix="Always normalise input images to [0, 1] before passing to the VAE. Use T.ToTensor() which divides by 255 automatically. Ensure the decoder's final activation is nn.Sigmoid(). Add a clamp in the loss: x = x.clamp(1e-8, 1-1e-8) before computing BCE to prevent log(0). If images are normalised to [-1, 1] (like after ImageNet normalisation), use MSE loss instead of BCE — MSE works for any range."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You understand latent variable models. Next: the architecture
          that generates the sharpest images ever produced by AI.
        </h2>

        <p style={S.p}>
          GANs are sharp but unstable. VAEs are stable but blurry.
          Diffusion models get the best of both — they are stable to train,
          produce sharp photorealistic outputs, and avoid mode collapse entirely.
          Module 63 explains the forward noising process, the reverse denoising
          network, and how Stable Diffusion uses a VAE latent space to make
          diffusion fast enough for practical use.
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
              Next — Module 63 · Generative AI
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Diffusion Models and Stable Diffusion
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Forward noise, reverse denoising, DDPM, latent diffusion —
              how Stable Diffusion generates photorealistic images from text.
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
          'A regular autoencoder maps each image to a fixed point in latent space — the space between points is empty and decodes to garbage. A VAE maps each image to a probability distribution (Gaussian with mean μ and variance σ²) and regularises all distributions to stay near N(0, I). Any point sampled from N(0, I) decodes to a meaningful image.',
          'The reparameterisation trick makes VAE training possible: instead of sampling z ~ N(μ, σ²) directly (which breaks gradients), compute z = μ + σ × ε where ε ~ N(0, I). The random ε is independent of the parameters — gradients flow through μ and σ normally.',
          'ELBO loss has two terms: reconstruction loss (BCE or MSE — how well does decoder reproduce the input) and KL divergence (−0.5 × Σ(1 + log σ² − μ² − σ²) — how close is the encoder distribution to N(0, I)). These are in tension — the balance creates a structured, navigable latent space.',
          'KL annealing is essential for stable training: start β=0 (pure reconstruction) and linearly increase to β=1 over 10–20 epochs. Without annealing the KL term causes posterior collapse — the encoder ignores the input and outputs N(0, I) trivially, and the decoder learns to generate average blurry images without using z.',
          'β-VAE (β > 1) increases KL weight to encourage disentanglement — individual latent dimensions learn to represent independent factors (colour, shape, size). β=1 gives best reconstruction quality. β=4 gives partial disentanglement. β≥10 gives strong disentanglement but noticeably blurry outputs.',
          'Three production applications: interpolation (smooth transition between two encoded images by linearly blending their latent vectors), anomaly detection (high reconstruction error = unusual item — train only on normal items), and attribute manipulation (compute direction vectors in latent space for specific attributes like colour and add them to new encodings).',
        ]}
      />
    </LearnLayout>
  )
}
