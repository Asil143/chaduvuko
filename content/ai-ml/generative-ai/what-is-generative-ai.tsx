import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'What is Generative AI? — Chaduvuko',
  description:
    'GANs, VAEs, diffusion, and LLMs — what makes each one generative, and when each one is the right architecture. The shift from recognising to creating.',
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

export default function WhatIsGenerativeAIPage() {
  return (
    <LearnLayout
      title="What is Generative AI?"
      description="GANs, VAEs, diffusion, and LLMs — what makes each one generative, and when each one is the right architecture. The shift from recognising to creating."
      section="Generative AI"
      readTime="22–28 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="generative-ai" topic="what-is-generative-ai" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — discriminative vs generative</span>
        <h2 style={S.h2}>
          Every model you have built so far maps input to label.
          Generative models learn the data distribution itself —
          then sample from it to create new data that never existed.
        </h2>

        <p style={S.p}>
          Sections 5 through 9 covered discriminative models — they draw
          a boundary between classes. Given an image, predict "kurta" or "jeans."
          Given a sentence, predict "positive" or "negative."
          The model learns P(label | data) — the probability of a label
          given the data. It never learns what data looks like,
          only how to classify it.
        </p>

        <p style={S.p}>
          Generative models learn P(data) — the probability distribution
          of the data itself. A model that has learned P(data) for fashion images
          can answer: "what does a typical kurta look like?" and then generate one.
          It can synthesise new kurta images that are statistically indistinguishable
          from real ones — because it has learned the underlying distribution,
          not just the boundary between categories.
        </p>

        <p style={S.p}>
          Why does this matter for Indian tech? Myntra uses generative models
          to create product variations — same design, different colours —
          without photographing each one. DoorDash uses them to generate
          synthetic training data for rare dish categories with few real photos.
          Stripe uses LLMs (the largest generative models) to draft
          merchant communications. Every use case involves creating new content
          from a learned distribution.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A discriminative model is a critic — shown a painting,
            they say "Monet" or "Picasso." They have learned boundaries
            between styles but cannot paint. A generative model is an artist —
            they have studied thousands of Monet paintings so deeply that they
            can create a new painting that looks authentically Monet,
            even though that exact painting never existed.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The critic learns P(style | painting). The artist learns P(painting)
            in Monet's style — the full distribution of what Monet paintings
            look like — and samples from it. That is the fundamental difference.
          </p>
        </AnalogyBox>
      </div>

      <Div />

      {/* ══ SECTION 2 — THE FOUR FAMILIES ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The landscape</span>
        <h2 style={S.h2}>Four generative model families — what each one does and how</h2>

        <VisualBox label="Generative model families — approach, strength, weakness">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                name: 'GANs — Generative Adversarial Networks',
                year: '2014',
                color: '#D85A30',
                how: 'Two networks compete: Generator creates fake data, Discriminator distinguishes real from fake. Generator improves until Discriminator cannot tell the difference.',
                strength: 'Sharpest, most photorealistic images. Fast inference once trained.',
                weakness: 'Notoriously unstable training. Mode collapse — generates only a few types of outputs. Hard to evaluate quality objectively.',
                use: 'Image synthesis, style transfer, face generation, data augmentation.',
                produces: 'Images directly in one forward pass',
              },
              {
                name: 'VAEs — Variational Autoencoders',
                year: '2013',
                color: '#378ADD',
                how: 'Encoder compresses data to a smooth latent space. Decoder reconstructs from latent vectors. Latent space is regularised to be continuous — you can interpolate between points.',
                strength: 'Stable training. Smooth, structured latent space enables interpolation and editing. Well-understood theoretically.',
                weakness: 'Generated images are blurry — optimising pixel-wise reconstruction loss averages across modes.',
                use: 'Drug discovery, anomaly detection, representation learning, controllable generation.',
                produces: 'Reconstructions from compressed latent codes',
              },
              {
                name: 'Diffusion Models',
                year: '2020',
                color: '#7b61ff',
                how: 'Forward process gradually adds Gaussian noise to data over T steps until pure noise. Reverse process trains a neural network to denoise step by step. Generation = start from noise, run denoising T times.',
                strength: 'Best image quality of any method. Stable training. Diverse outputs — no mode collapse. Powers Stable Diffusion, DALL-E, Midjourney.',
                weakness: 'Very slow inference — requires T denoising steps (typically 20–1000). Computationally expensive.',
                use: 'Text-to-image generation, image editing, video generation, audio synthesis.',
                produces: 'Images via iterative denoising from pure Gaussian noise',
              },
              {
                name: 'LLMs — Large Language Models',
                year: '2018+',
                color: '#1D9E75',
                how: 'Transformer trained to predict the next token given all previous tokens. Trained on hundreds of billions of tokens. Generation = sample from the predicted distribution at each step.',
                strength: 'Generalises to any text task with prompting. Emergent capabilities at scale. Code, math, reasoning, conversation.',
                weakness: 'Requires enormous compute to train. Hallucination. Context window limits. No persistent memory by default.',
                use: 'Text generation, code, Q&A, summarisation, translation, agents.',
                produces: 'Text token by token via autoregressive sampling',
              },
            ].map((item) => (
              <div key={item.name} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 8, padding: '13px 14px',
                borderLeft: `4px solid ${item.color}`,
              }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)' }}>
                    {item.name}
                  </span>
                  <span style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)', background: `${item.color}15`, padding: '2px 7px', borderRadius: 3 }}>
                    {item.year}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <p style={{ ...S.ps, marginBottom: 4 }}>{item.how}</p>
                    <div style={{ fontSize: 11, color: '#1D9E75', marginBottom: 3 }}>✓ {item.strength}</div>
                    <div style={{ fontSize: 11, color: '#ff4757' }}>✗ {item.weakness}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: item.color, marginBottom: 5 }}>
                      <strong>Use for:</strong> {item.use}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>
                      Produces: {item.produces}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>
      </div>

      <Div />

      {/* ══ SECTION 3 — LATENT SPACE ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The key concept</span>
        <h2 style={S.h2}>Latent space — the compressed representation all generative models share</h2>

        <p style={S.p}>
          Every generative model learns to compress data into a
          lower-dimensional latent space and decode from it.
          A 224×224 RGB image has 150,528 dimensions.
          A well-trained VAE compresses this to 128 or 256 latent dimensions
          that capture all meaningful variation — colour scheme, shape,
          texture, style — while discarding irrelevant pixel-level noise.
          The latent space is a map of the data distribution.
        </p>

        <p style={S.p}>
          Nearby points in latent space correspond to similar images.
          You can interpolate between two points and get a smooth transition
          between two images. You can add and subtract directions:
          the famous example from Word2Vec — king − man + woman ≈ queen —
          works in image latent spaces too: kurta_latent + blue_colour_vector
          ≈ blue_kurta_latent. This is what makes latent spaces useful
          for creative applications.
        </p>

        <ConceptBox title="Latent space arithmetic — creative generation by vector manipulation">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.2 }}>
            <div style={{ color: '#7b61ff', marginBottom: 4 }}>encode(image) → z  (latent vector, e.g. 128-dim)</div>
            <div style={{ color: '#1D9E75', marginBottom: 4 }}>decode(z)     → image  (reconstruct)</div>
            <div style={{ color: '#D85A30', marginBottom: 4 }}>decode(z + noise) → slightly different image  (variation)</div>
            <div style={{ color: '#378ADD', marginBottom: 8 }}>decode(lerp(z1, z2, t)) → smooth interpolation between two images</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>
              lerp = linear interpolation: z_t = (1−t)×z1 + t×z2  for t ∈ [0, 1]<br />
              This only works cleanly in VAE latent spaces — GANs have unstructured spaces
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import numpy as np

# ── Minimal VAE to illustrate latent space ────────────────────────────
class SimpleVAE(nn.Module):
    def __init__(self, input_dim: int = 784, latent_dim: int = 32):
        super().__init__()
        # Encoder: input → mean and log_variance of latent distribution
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, 256), nn.ReLU(),
            nn.Linear(256, 128), nn.ReLU(),
        )
        self.fc_mean    = nn.Linear(128, latent_dim)
        self.fc_log_var = nn.Linear(128, latent_dim)

        # Decoder: latent vector → reconstructed input
        self.decoder = nn.Sequential(
            nn.Linear(latent_dim, 128), nn.ReLU(),
            nn.Linear(128, 256), nn.ReLU(),
            nn.Linear(256, input_dim), nn.Sigmoid(),
        )

    def encode(self, x):
        h       = self.encoder(x)
        mean    = self.fc_mean(h)
        log_var = self.fc_log_var(h)
        return mean, log_var

    def reparameterise(self, mean, log_var):
        """
        The reparameterisation trick: sample z = mean + std × epsilon
        epsilon ~ N(0, I) — random noise
        This makes sampling differentiable — gradients can flow through.
        Without this trick, sampling breaks backpropagation.
        """
        std     = torch.exp(0.5 * log_var)
        epsilon = torch.randn_like(std)
        return mean + std * epsilon

    def decode(self, z):
        return self.decoder(z)

    def forward(self, x):
        mean, log_var = self.encode(x)
        z             = self.reparameterise(mean, log_var)
        x_recon       = self.decode(z)
        return x_recon, mean, log_var

def vae_loss(x_recon, x, mean, log_var):
    """
    ELBO loss = Reconstruction loss + KL divergence
    Reconstruction: how well did we reconstruct the input?
    KL divergence:  how close is the latent distribution to N(0, I)?
                    This regularises the latent space to be smooth.
    """
    recon_loss = nn.functional.binary_cross_entropy(x_recon, x, reduction='sum')
    # KL divergence between N(mean, var) and N(0, 1):
    # −0.5 × Σ(1 + log_var − mean² − exp(log_var))
    kl_loss    = -0.5 * torch.sum(1 + log_var - mean.pow(2) - log_var.exp())
    return recon_loss + kl_loss

# ── Shape demonstration ───────────────────────────────────────────────
torch.manual_seed(42)
vae   = SimpleVAE(input_dim=784, latent_dim=32)
x     = torch.randn(8, 784)   # batch of 8 flattened 28×28 images

x_recon, mean, log_var = vae(x)
loss = vae_loss(x_recon, torch.sigmoid(x), mean, log_var)

print(f"VAE shapes:")
print(f"  Input:        {tuple(x.shape)}")
print(f"  Latent mean:  {tuple(mean.shape)}   ← 32-dim latent space")
print(f"  Latent logvar:{tuple(log_var.shape)}")
print(f"  Reconstructed:{tuple(x_recon.shape)}")
print(f"  ELBO loss:    {loss.item():.2f}")

# ── Latent space operations ───────────────────────────────────────────
with torch.no_grad():
    # Encode two images
    mean1, _ = vae.encode(x[0:1])
    mean2, _ = vae.encode(x[1:2])

    # Interpolate between them
    print(f"\nLatent space interpolation:")
    for t in [0.0, 0.25, 0.5, 0.75, 1.0]:
        z_interp = (1 - t) * mean1 + t * mean2
        decoded  = vae.decode(z_interp)
        print(f"  t={t:.2f}: z_norm={z_interp.norm():.3f}  decoded_mean={decoded.mean():.4f}")

    # Sample new images from prior
    print(f"\nSampling from prior N(0, I):")
    for i in range(3):
        z_random = torch.randn(1, 32)   # sample from standard normal
        new_img  = vae.decode(z_random)
        print(f"  Sample {i+1}: mean={new_img.mean():.4f}  std={new_img.std():.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — EVALUATION ══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>How do you measure quality?</span>
        <h2 style={S.h2}>FID, IS, and CLIP score — evaluating generative models</h2>

        <p style={S.p}>
          You cannot use accuracy to evaluate a generative model —
          there is no correct answer. How do you measure whether a generated
          image is "good"? Three metrics are standard:
          Fréchet Inception Distance (FID) measures how similar the
          distribution of generated images is to real images.
          Inception Score (IS) measures diversity and quality together.
          CLIP score measures how well an image matches a text description.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              name: 'FID — Fréchet Inception Distance',
              color: '#7b61ff',
              formula: 'Distance between real and generated image distributions in InceptionV3 feature space',
              interpret: 'Lower is better. FID=0 means generated = real. FID<10 is excellent. FID>100 is poor.',
              use: 'Standard for image generation quality. Used in GAN and diffusion model papers.',
              limit: 'Requires large sample (10k+ images) for reliable estimates. Not aligned with human perception.',
            },
            {
              name: 'IS — Inception Score',
              color: '#1D9E75',
              formula: 'exp(E[KL(p(y|x) || p(y))]) — measures diversity across classes and confidence per image',
              interpret: 'Higher is better. Measures both quality (confident predictions) and diversity (many different classes).',
              use: 'Quick sanity check for unconditional image generation.',
              limit: 'Does not compare to real images — a model generating diverse blurry images can score well.',
            },
            {
              name: 'CLIP Score',
              color: '#D85A30',
              formula: 'Cosine similarity between CLIP image embedding and CLIP text embedding',
              interpret: 'Higher is better. Measures how well generated image matches its text prompt.',
              use: 'Text-to-image evaluation (Stable Diffusion, DALL-E). Human preference correlation.',
              limit: 'High CLIP score does not mean photorealistic — stylised images can score well.',
            },
          ].map((item) => (
            <div key={item.name} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '11px 14px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 6 }}>
                {item.name}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <p style={{ ...S.ps, marginBottom: 4 }}>{item.formula}</p>
                  <div style={{ fontSize: 11, color: item.color }}>{item.interpret}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#1D9E75', marginBottom: 4 }}>Use: {item.use}</div>
                  <div style={{ fontSize: 11, color: '#ff4757' }}>Limitation: {item.limit}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <CodeBlock code={`import torch
import numpy as np
from scipy import linalg

# ── FID from scratch — the core calculation ───────────────────────────
def compute_fid(real_features: np.ndarray,
                fake_features: np.ndarray) -> float:
    """
    Compute FID between real and generated image features.
    Features are typically extracted from InceptionV3's penultimate layer.
    real_features: (N, 2048) — features from real images
    fake_features: (N, 2048) — features from generated images
    """
    # Compute mean and covariance of each distribution
    mu_real   = real_features.mean(axis=0)
    mu_fake   = fake_features.mean(axis=0)
    sigma_real = np.cov(real_features, rowvar=False)
    sigma_fake = np.cov(fake_features, rowvar=False)

    # Fréchet distance between two multivariate Gaussians:
    # ||mu_r - mu_f||² + Tr(sigma_r + sigma_f - 2√(sigma_r × sigma_f))
    diff       = mu_real - mu_fake
    mean_term  = diff @ diff   # ||mu_r - mu_f||²

    # Matrix square root of sigma_r × sigma_f
    covmean, _ = linalg.sqrtm(sigma_real @ sigma_fake, disp=False)
    if np.iscomplexobj(covmean):
        covmean = covmean.real   # numerical correction

    trace_term = np.trace(sigma_real + sigma_fake - 2 * covmean)
    fid        = mean_term + trace_term
    return float(fid)

# ── Simulate feature distributions ────────────────────────────────────
np.random.seed(42)
N_SAMPLES    = 1000
FEATURE_DIM  = 2048

# Perfect model: generated features = real features (FID ≈ 0)
real_features    = np.random.randn(N_SAMPLES, FEATURE_DIM)
perfect_features = real_features + np.random.randn(N_SAMPLES, FEATURE_DIM) * 0.01

# Good model: small distribution shift
good_features    = real_features + np.random.randn(N_SAMPLES, FEATURE_DIM) * 0.5

# Poor model: large distribution shift
poor_features    = np.random.randn(N_SAMPLES, FEATURE_DIM) * 2 + 3

print("FID scores (lower = better, 0 = perfect):")
print(f"  Perfect model: {compute_fid(real_features, perfect_features):.2f}")
print(f"  Good model:    {compute_fid(real_features, good_features):.2f}")
print(f"  Poor model:    {compute_fid(real_features, poor_features):.2f}")

print("\nFID benchmarks in literature:")
benchmarks = [
    ('StyleGAN2 (FFHQ 256)',     2.8,  'State of the art face generation'),
    ('Stable Diffusion 2.1',     8.6,  'Text-to-image, COCO benchmark'),
    ('DALL-E 2',                 10.4, 'Text-to-image'),
    ('GAN with mode collapse',   80.0, 'Poor diversity'),
    ('Random noise baseline',   300.0, 'No learning'),
]
for name, fid, note in benchmarks:
    bar = '█' * int(min(fid, 100) / 4)
    print(f"  {name:<35}: FID={fid:>6.1f}  {bar}  {note}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — CHOOSING THE RIGHT MODEL ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Decision guide</span>
        <h2 style={S.h2}>Which generative model for which task — a practical framework</h2>

        <VisualBox label="Generative model selection — task to architecture mapping">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              background: 'var(--surface)', borderBottom: '1px solid var(--border)',
              padding: '8px 12px', gap: 10,
            }}>
              {['Task', 'Best architecture', 'Why'].map(h => (
                <span key={h} style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{h}</span>
              ))}
            </div>
            {[
              ['Text generation / chat', 'LLM (GPT/LLaMA)', '#1D9E75', 'Autoregressive token prediction is the natural formulation'],
              ['Code generation', 'LLM (CodeLlama)', '#1D9E75', 'LLMs generalise to code as a language domain'],
              ['Text-to-image', 'Diffusion (Stable Diffusion)', '#7b61ff', 'Best quality + diversity. CLIP-guided conditioning'],
              ['Image editing', 'Diffusion (InstructPix2Pix)', '#7b61ff', 'Inpainting and instruction-following built in'],
              ['Fast image synthesis', 'GAN (StyleGAN)', '#D85A30', 'Single forward pass — 100× faster than diffusion'],
              ['Anomaly detection', 'VAE', '#378ADD', 'Reconstruction error on normal data flags anomalies'],
              ['Molecular generation', 'VAE or Diffusion', '#378ADD', 'Smooth latent space enables drug candidate search'],
              ['Data augmentation', 'GAN or Diffusion', '#D85A30', 'Generate rare class examples for training'],
              ['Audio synthesis', 'Diffusion (WaveNet/AudioLDM)', '#7b61ff', 'Diffusion now dominates audio generation quality'],
              ['Video generation', 'Diffusion (Sora-style)', '#7b61ff', 'Temporal diffusion with 3D attention'],
            ].map(([task, arch, color, reason], i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                padding: '8px 12px', gap: 10,
                background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
                borderBottom: i < 9 ? '1px solid var(--border)' : 'none',
                alignItems: 'start',
              }}>
                <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 600 }}>{task}</span>
                <span style={{ fontSize: 11, color: color as string, fontFamily: 'var(--font-mono)' }}>{arch}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{reason}</span>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`# ── Quick API tour — generate content with each model family ─────────

# ── 1. LLM generation — text ──────────────────────────────────────────
from groq import Groq
import os

client = Groq(api_key=os.environ.get('GROQ_API_KEY', 'demo'))

# Autoregressive generation — sample one token at a time
# response = client.chat.completions.create(
#     model='llama-3.3-70b-versatile',
#     messages=[{'role': 'user', 'content': 'Write a product description for a Shopify kurta'}],
#     temperature=0.8,   # higher = more creative/diverse
#     max_tokens=200,
# )
# text = response.choices[0].message.content
print("LLM generation: autoregressive sampling, token by token")
print("  temperature=0.0 → deterministic (always picks highest probability token)")
print("  temperature=1.0 → samples from full distribution")
print("  temperature>1.0 → more random, creative, possibly incoherent")

# ── 2. Diffusion generation — image from text ─────────────────────────
print("\nDiffusion generation (Stable Diffusion):")
print("  pip install diffusers torch")
print("""
from diffusers import StableDiffusionPipeline
import torch

pipe = StableDiffusionPipeline.from_pretrained(
    'runwayml/stable-diffusion-v1-5',
    torch_dtype=torch.float16,
).to('cuda')

image = pipe(
    prompt='A beautiful silk saree in red and gold, product photography',
    negative_prompt='blurry, low quality, distorted',
    num_inference_steps=30,    # denoising steps — more = better quality, slower
    guidance_scale=7.5,        # how strongly to follow the text prompt
    height=512, width=512,
).images[0]
image.save('saree.png')
""")

# ── 3. VAE — encode and decode ────────────────────────────────────────
print("VAE generation:")
print("  Encode image → 128-dim latent vector")
print("  Perturb latent vector → decode → variation of original image")
print("  Interpolate between two latent vectors → smooth transition")

# ── 4. GAN — single forward pass ─────────────────────────────────────
print("\nGAN generation (StyleGAN2):")
print("""
import torch
# Load pretrained generator
# G = StyleGAN2Generator(...)
# z = torch.randn(1, 512)    # random latent
# img = G(z)                  # single forward pass → 1024×1024 face
# Total: one matrix multiplication chain, ~10ms on GPU
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You understand the generative landscape. Next: the adversarial game
          that started it all.
        </h2>

        <p style={S.p}>
          This module introduced all four families at a high level.
          The next four modules go deep on each one in turn.
          Module 61 builds a GAN from scratch — generator, discriminator,
          the adversarial training loop, and why training is so unstable.
          Understanding GANs first builds the intuition that makes
          VAEs, diffusion, and LLMs click into place.
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
              Next — Module 61 · Generative AI
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              GANs — Generator vs Discriminator
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Two networks in adversarial competition. Mode collapse,
              training instability, Wasserstein distance — the honest
              account of what makes GANs hard to train.
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
          'Discriminative models learn P(label | data) — they classify. Generative models learn P(data) — the full data distribution — and can sample new data from it. This shift from recognising to creating is the core of generative AI.',
          'Four generative model families: GANs (adversarial training, sharpest images, unstable), VAEs (smooth latent space, stable training, blurry outputs), Diffusion models (best quality and diversity, slow inference, powers Stable Diffusion), LLMs (autoregressive text generation, emergent capabilities, powers GPT and Claude).',
          'All generative models share a key concept: the latent space — a compressed lower-dimensional representation of the data distribution. Nearby points in latent space correspond to similar outputs. You can interpolate, add, and subtract direction vectors to control generation.',
          'The reparameterisation trick is what makes VAE training work: instead of sampling z directly (which breaks gradients), sample epsilon ~ N(0,I) and compute z = mean + std × epsilon. This makes the sampling operation differentiable so gradients can flow through the encoder.',
          'Evaluate generative models with FID (lower = better, measures distribution similarity to real data), IS (higher = better, measures quality and diversity), and CLIP score (higher = better, measures text-image alignment). Never use accuracy — there is no single correct output.',
          'Architecture selection: LLMs for any text task, Diffusion for text-to-image and image editing, GANs for fast single-pass image synthesis, VAEs for anomaly detection and structured latent space applications. Diffusion has overtaken GANs for image quality; LLMs have overtaken rule-based systems for text.',
        ]}
      />
    </LearnLayout>
  )
}