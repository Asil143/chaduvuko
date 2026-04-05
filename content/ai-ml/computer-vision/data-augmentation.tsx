import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Data Augmentation — Training on Limited Image Data — Chaduvuko',
  description:
    'Flips, crops, colour jitter, mixup, cutout — and how each one affects what the model learns. Multiply your dataset without collecting a single new image.',
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

export default function DataAugmentationPage() {
  return (
    <LearnLayout
      title="Data Augmentation — Training on Limited Image Data"
      description="Flips, crops, colour jitter, mixup, cutout — and how each one affects what the model learns. Multiply your dataset without collecting a single new image."
      section="Computer Vision"
      readTime="25–30 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="computer-vision" topic="data-augmentation" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — why augmentation works</span>
        <h2 style={S.h2}>
          A model trained on 1,000 images of kurtas in perfect lighting
          will fail on kurtas in dim lighting or at an angle.
          Augmentation shows the model those variations during training
          without collecting a single new photograph.
        </h2>

        <p style={S.p}>
          Every augmentation teaches the model a specific invariance —
          a property that should not change the prediction.
          A horizontal flip teaches: left-right orientation does not matter for classification.
          Colour jitter teaches: brightness and saturation variations do not change the category.
          Random crop teaches: the object can appear at different positions and scales.
          Each augmentation is a prior about what variations are irrelevant to the task.
        </p>

        <p style={S.p}>
          The key constraint: augmentations must preserve the label.
          Flipping a kurta horizontally still produces a kurta — valid.
          Flipping it vertically might produce something unnatural — questionable.
          Rotating a clock face 90 degrees changes the time shown — invalid
          if the task is reading the time. Every augmentation decision
          is a domain judgement about which transformations are label-preserving.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Teaching a child to recognise dogs. You show them 100 dog photos —
            all golden retrievers, all photographed outdoors in sunlight.
            The child learns "dog = golden retriever outdoors."
            Now show them a black poodle indoors and they fail.
            If you had shown them photos from different angles, lighting,
            and backgrounds — they would generalise.
            Augmentation is artificially creating that variety.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The model does not know you flipped the image. It just sees
            a slightly different training example each epoch. Over 50 epochs
            with random augmentation, the model effectively trains on
            50× more data than you actually collected.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          Augmentation is applied only during training — never during validation
          or inference. Validation transforms must be deterministic so metrics
          are consistent. Applying random augmentation to validation produces
          different results each run and makes comparison meaningless.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — GEOMETRIC AUGMENTATIONS ═════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Spatial transformations</span>
        <h2 style={S.h2}>Geometric augmentations — teach position, scale, and orientation invariance</h2>

        <VisualBox label="Geometric augmentations — what each one teaches the model">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                name: 'RandomHorizontalFlip(p=0.5)',
                color: '#1D9E75',
                teaches: 'Left-right symmetry — a shirt is still a shirt when mirrored',
                avoid: 'Text recognition (flipped text is unreadable), steering angle prediction',
                strength: 'Strong — use on almost every classification task',
              },
              {
                name: 'RandomVerticalFlip(p=0.2)',
                color: '#378ADD',
                teaches: 'Upside-down invariance — useful for satellite/aerial imagery',
                avoid: 'Natural photographs (upside-down people/objects are unnatural), text',
                strength: 'Domain-specific — only for satellite, microscopy, or symmetrical objects',
              },
              {
                name: 'RandomRotation(degrees=15)',
                color: '#7b61ff',
                teaches: 'Slight rotation tolerance — camera angle variation',
                avoid: 'Large rotations for objects with canonical orientation (cars, faces)',
                strength: 'Moderate — ±15° is usually safe, ±45° only for rotation-invariant objects',
              },
              {
                name: 'RandomResizedCrop(224)',
                color: '#D85A30',
                teaches: 'Scale invariance + translation invariance — object at any size/position',
                avoid: 'When object position encodes meaning (medical images with fixed anatomy)',
                strength: 'Very strong — the single most impactful augmentation for most tasks',
              },
              {
                name: 'RandomPerspective(distortion=0.2)',
                color: '#BA7517',
                teaches: 'Perspective variation — photographed from different angles',
                avoid: 'Frontal face recognition, document scanning',
                strength: 'Moderate — good for product images photographed from varied angles',
              },
            ].map((item) => (
              <div key={item.name} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 7, padding: '10px 12px',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 5 }}>
                  {item.name}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                    <span style={{ color: item.color, fontWeight: 700 }}>Teaches: </span>{item.teaches}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                    <span style={{ color: '#ff4757', fontWeight: 700 }}>Avoid: </span>{item.avoid}
                  </div>
                  <div style={{ fontSize: 11, color: item.color, fontStyle: 'italic' }}>{item.strength}</div>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import torch
import torchvision.transforms as T
import torchvision.transforms.functional as TF
import numpy as np
from PIL import Image

# ── Create a test image ───────────────────────────────────────────────
img = Image.fromarray(
    np.random.randint(50, 200, (300, 200, 3), dtype=np.uint8)
)
print(f"Original size: {img.size} (W×H)")

# ── Geometric augmentations ────────────────────────────────────────────
geometric_transforms = {
    'HorizontalFlip':   T.RandomHorizontalFlip(p=1.0),
    'VerticalFlip':     T.RandomVerticalFlip(p=1.0),
    'Rotation 15°':     T.RandomRotation(degrees=15),
    'Rotation 90°':     T.RandomRotation(degrees=90),
    'RandomResizedCrop':T.RandomResizedCrop(224, scale=(0.5, 1.0)),
    'Perspective':      T.RandomPerspective(distortion_scale=0.3, p=1.0),
    'Affine':           T.RandomAffine(degrees=10, translate=(0.1, 0.1),
                                        scale=(0.9, 1.1), shear=5),
}

print("\nGeometric transform output sizes:")
for name, transform in geometric_transforms.items():
    out  = transform(img)
    size = out.size if isinstance(out, Image.Image) else tuple(out.shape)
    print(f"  {name:<20}: {size}")

# ── RandomResizedCrop — most important geometric augmentation ─────────
# Shows different crops of the same image — simulates different scales
rrc = T.RandomResizedCrop(224, scale=(0.08, 1.0), ratio=(0.75, 1.33))
to_tensor = T.ToTensor()

crops = [to_tensor(rrc(img)) for _ in range(4)]
for i, crop in enumerate(crops):
    print(f"  Crop {i+1}: shape={tuple(crop.shape)}"
          f"  mean={crop.mean():.3f}  std={crop.std():.3f}")

# ── Visualise augmentation effect numerically ─────────────────────────
original_tensor = to_tensor(img)
print(f"\nOriginal tensor:")
print(f"  Mean: {original_tensor.mean():.4f}  Std: {original_tensor.std():.4f}")

flip_tensor = to_tensor(TF.hflip(img))
print(f"After horizontal flip:")
print(f"  Mean: {flip_tensor.mean():.4f}  ← identical mean (pixel values same)")
print(f"  Pixel at [0,0,0]: {original_tensor[0,0,0]:.3f} vs {flip_tensor[0,0,-1]:.3f}  ← mirrored")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — COLOUR AUGMENTATIONS ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Photometric transformations</span>
        <h2 style={S.h2}>Colour augmentations — teach lighting and colour invariance</h2>

        <p style={S.p}>
          The same product photographed in a studio, outdoors, and under
          fluorescent lighting looks very different in pixel values.
          Colour augmentations simulate these variations during training
          so the model learns to identify the object regardless of
          illumination conditions — without collecting images in every
          possible lighting environment.
        </p>

        <CodeBlock code={`import torch
import torchvision.transforms as T
import numpy as np
from PIL import Image

img = Image.fromarray(np.random.randint(50, 200, (224, 224, 3), dtype=np.uint8))
to_tensor = T.ToTensor()

# ── ColorJitter — the most important colour augmentation ──────────────
# brightness: multiply pixel values by random factor in [1-b, 1+b]
# contrast:   stretch/compress pixel value range
# saturation: increase/decrease colour intensity
# hue:        shift all hues by ±h (fraction of full hue circle)

colour_transforms = {
    'Brightness only':   T.ColorJitter(brightness=0.5),
    'Contrast only':     T.ColorJitter(contrast=0.5),
    'Saturation only':   T.ColorJitter(saturation=0.5),
    'Hue only':          T.ColorJitter(hue=0.2),
    'All moderate':      T.ColorJitter(brightness=0.3, contrast=0.3,
                                        saturation=0.2, hue=0.1),
    'All aggressive':    T.ColorJitter(brightness=0.8, contrast=0.8,
                                        saturation=0.5, hue=0.3),
}

original = to_tensor(img)
print("Colour augmentation effect on pixel statistics:")
print(f"  {'Transform':<20} {'Mean':>8} {'Std':>8} {'Min':>8} {'Max':>8}")
print("  " + "─" * 50)
print(f"  {'Original':<20} {original.mean():>8.4f} {original.std():>8.4f} "
      f"{original.min():>8.4f} {original.max():>8.4f}")

for name, transform in colour_transforms.items():
    t = to_tensor(transform(img))
    print(f"  {name:<20} {t.mean():>8.4f} {t.std():>8.4f} "
          f"{t.min():>8.4f} {t.max():>8.4f}")

# ── Greyscale augmentation ────────────────────────────────────────────
# Randomly convert to greyscale — forces model to use texture not just colour
grey_aug = T.RandomGrayscale(p=0.1)   # 10% chance each image
grey_out = grey_aug(img)
grey_t   = to_tensor(grey_out)
print(f"\nRandomGrayscale (p=0.1):")
print(f"  Channels: {grey_t.shape[0]}  (still 3 channels — R=G=B when greyscale)")

# ── Gaussian blur — simulate out-of-focus photography ─────────────────
blur = T.GaussianBlur(kernel_size=5, sigma=(0.1, 2.0))
blur_t = to_tensor(blur(img))
print(f"\nGaussian blur: mean_diff={abs(original.mean()-blur_t.mean()):.4f}  "
      f"std_diff={(original.std()-blur_t.std()):.4f}")

# ── Production colour augmentation pipeline ───────────────────────────
# Strong augmentation for Meesho product images
product_colour_aug = T.Compose([
    T.ColorJitter(brightness=0.4, contrast=0.3, saturation=0.3, hue=0.1),
    T.RandomGrayscale(p=0.05),
    T.GaussianBlur(kernel_size=3, sigma=(0.1, 1.5)),
])

augmented = to_tensor(product_colour_aug(img))
print(f"\nProduct colour pipeline:")
print(f"  Original:  mean={original.mean():.4f}  std={original.std():.4f}")
print(f"  Augmented: mean={augmented.mean():.4f}  std={augmented.std():.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — ADVANCED AUGMENTATIONS ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Modern techniques</span>
        <h2 style={S.h2}>Mixup, CutMix, and Cutout — augmentations that consistently beat baselines</h2>

        <p style={S.p}>
          Beyond geometric and colour transforms, three modern augmentation
          techniques consistently improve accuracy on small datasets.
          MixUp blends two images and their labels.
          CutMix pastes a region from one image into another.
          Cutout randomly masks rectangular regions — forcing the model
          to not rely on any single region of the image.
        </p>

        <ConceptBox title="MixUp, CutMix, Cutout — the key idea of each">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                name: 'Cutout / RandomErasing',
                color: '#D85A30',
                formula: 'Mask a random rectangle with zeros or noise',
                effect: 'Forces model to use the full image, not just one discriminative patch. Prevents over-reliance on logos or specific colour regions.',
                label: 'Label unchanged — standard cross-entropy',
                pytorch: 'T.RandomErasing(p=0.5, scale=(0.02, 0.2))',
              },
              {
                name: 'MixUp',
                color: '#7b61ff',
                formula: 'x̃ = λ·x₁ + (1−λ)·x₂  |  ỹ = λ·y₁ + (1−λ)·y₂',
                effect: 'Blends two images and their one-hot labels. Creates smooth interpolation between classes. Significantly improves calibration.',
                label: 'Soft labels — cross-entropy with mixed targets',
                pytorch: 'torchvision.transforms.v2.MixUp(alpha=0.2)',
              },
              {
                name: 'CutMix',
                color: '#1D9E75',
                formula: 'Paste rectangular region of image B into image A. Mix labels proportionally to area',
                effect: 'Harder than MixUp — model must classify with half the image replaced. Strong regulariser. State of the art for ImageNet.',
                label: 'Mixed labels proportional to replaced area',
                pytorch: 'torchvision.transforms.v2.CutMix(alpha=1.0)',
              },
            ].map((item) => (
              <div key={item.name} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 8, padding: '11px 14px',
                borderLeft: `4px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 5 }}>
                  {item.name}
                </div>
                <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                  {item.formula}
                </div>
                <p style={{ ...S.ps, marginBottom: 4 }}>{item.effect}</p>
                <div style={{ fontSize: 11, color: '#BA7517', marginBottom: 4 }}>
                  Labels: {item.label}
                </div>
                <div style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)', background: `${item.color}10`, padding: '3px 6px', borderRadius: 3 }}>
                  {item.pytorch}
                </div>
              </div>
            ))}
          </div>
        </ConceptBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import torchvision.transforms as T
import numpy as np
from PIL import Image

# ── Cutout / RandomErasing ────────────────────────────────────────────
# Built into torchvision as RandomErasing — applied AFTER ToTensor
random_erasing = T.RandomErasing(
    p=0.5,             # 50% chance of erasing
    scale=(0.02, 0.2), # erase 2–20% of image area
    ratio=(0.3, 3.3),  # aspect ratio of erased region
    value=0,           # fill with zeros (or 'random' for noise)
)

img = Image.fromarray(np.random.randint(50, 200, (224, 224, 3), dtype=np.uint8))
tensor = T.ToTensor()(img)
erased = random_erasing(tensor)

n_zeros = (erased == 0).float().mean().item()
print(f"RandomErasing: {n_zeros*100:.1f}% of pixels set to zero")

# ── MixUp — implemented manually ─────────────────────────────────────
def mixup_batch(images: torch.Tensor, labels: torch.Tensor,
                alpha: float = 0.2, num_classes: int = 6):
    """
    Apply MixUp to a batch.
    images: (B, C, H, W) float tensor
    labels: (B,) long tensor of class indices
    Returns: mixed images, soft label matrix (B, num_classes)
    """
    B = images.size(0)

    # Sample mixing coefficient from Beta distribution
    lam = np.random.beta(alpha, alpha) if alpha > 0 else 1.0

    # Random permutation for pairing
    idx = torch.randperm(B)

    # Mix images
    mixed_images = lam * images + (1 - lam) * images[idx]

    # Convert to one-hot and mix labels
    one_hot    = torch.zeros(B, num_classes)
    one_hot.scatter_(1, labels.unsqueeze(1), 1)
    mixed_labels = lam * one_hot + (1 - lam) * one_hot[idx]

    return mixed_images, mixed_labels

# Test MixUp
batch_images = torch.randn(8, 3, 224, 224)
batch_labels = torch.randint(0, 6, (8,))
mixed_imgs, soft_labels = mixup_batch(batch_images, batch_labels, alpha=0.2)

print(f"\nMixUp batch:")
print(f"  Original labels:  {batch_labels.tolist()}")
print(f"  Soft label sample: {soft_labels[0].tolist()}")
print(f"  Sum (should be 1): {soft_labels[0].sum().item():.4f}")

# ── MixUp training step ───────────────────────────────────────────────
def mixup_criterion(criterion, pred, mixed_labels):
    """Cross-entropy with soft labels from MixUp."""
    log_probs = torch.log_softmax(pred, dim=1)
    loss      = -(mixed_labels * log_probs).sum(dim=1).mean()
    return loss

# ── CutMix ────────────────────────────────────────────────────────────
def cutmix_batch(images: torch.Tensor, labels: torch.Tensor,
                  alpha: float = 1.0, num_classes: int = 6):
    B, C, H, W = images.shape
    lam = np.random.beta(alpha, alpha)

    # Random bounding box
    cut_ratio = np.sqrt(1 - lam)
    cut_h     = int(H * cut_ratio)
    cut_w     = int(W * cut_ratio)
    cx        = np.random.randint(W)
    cy        = np.random.randint(H)
    x1 = max(cx - cut_w // 2, 0)
    x2 = min(cx + cut_w // 2, W)
    y1 = max(cy - cut_h // 2, 0)
    y2 = min(cy + cut_h // 2, H)

    idx       = torch.randperm(B)
    mixed     = images.clone()
    mixed[:, :, y1:y2, x1:x2] = images[idx, :, y1:y2, x1:x2]

    # Adjust lambda based on actual box area
    lam_actual = 1 - (x2 - x1) * (y2 - y1) / (W * H)

    one_hot    = torch.zeros(B, num_classes)
    one_hot.scatter_(1, labels.unsqueeze(1), 1)
    mixed_labels = lam_actual * one_hot + (1 - lam_actual) * one_hot[idx]

    return mixed, mixed_labels

mixed_cm, labels_cm = cutmix_batch(batch_images, batch_labels)
print(f"\nCutMix batch:")
print(f"  Mixed image shape: {tuple(mixed_cm.shape)}")
print(f"  Soft label sample: {labels_cm[0].tolist()}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — AUGMENTATION STRATEGY ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Choosing the right augmentations</span>
        <h2 style={S.h2}>The complete training pipeline — what to use and in what order</h2>

        <p style={S.p}>
          More augmentation is not always better. Too aggressive augmentation
          makes the task too hard — the model sees only distorted images
          and never learns the canonical object appearance.
          The right level depends on dataset size: small datasets need strong
          augmentation to prevent overfitting, large datasets need only moderate
          augmentation to preserve training signal quality.
        </p>

        <VisualBox label="Augmentation strength by dataset size — practical guide">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              {
                size: '< 1,000 images',
                color: '#ff4757',
                strategy: 'Maximum augmentation',
                transforms: 'RandomResizedCrop + HorizontalFlip + ColorJitter(0.8) + RandomErasing + RandomGrayscale + Rotation(30°)',
                note: 'Model will overfit without heavy augmentation. Every image should look very different each epoch.',
              },
              {
                size: '1,000 – 10,000',
                color: '#D85A30',
                strategy: 'Strong augmentation',
                transforms: 'RandomResizedCrop + HorizontalFlip + ColorJitter(0.4) + RandomErasing + MixUp or CutMix',
                note: 'Standard regime for most fine-tuning tasks in Indian startup ML teams.',
              },
              {
                size: '10,000 – 100,000',
                color: '#BA7517',
                strategy: 'Moderate augmentation',
                transforms: 'RandomResizedCrop + HorizontalFlip + ColorJitter(0.2) + optional CutMix',
                note: 'Enough data to generalise — augmentation prevents overfitting without hurting quality.',
              },
              {
                size: '> 100,000 images',
                color: '#1D9E75',
                strategy: 'Light augmentation',
                transforms: 'RandomResizedCrop + HorizontalFlip + mild ColorJitter',
                note: 'Large datasets generalise naturally. Heavy augmentation slows convergence without benefit.',
              },
            ].map((item) => (
              <div key={item.size} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 7, padding: '10px 12px',
                display: 'grid', gridTemplateColumns: '120px 140px 1fr',
                gap: 10, alignItems: 'start',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: item.color }}>{item.size}</div>
                  <div style={{ fontSize: 10, color: item.color, fontStyle: 'italic' }}>{item.strategy}</div>
                </div>
                <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.6 }}>
                  {item.transforms}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{item.note}</div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import torch
import torchvision.transforms as T
from torch.utils.data import Dataset, DataLoader
import numpy as np
from PIL import Image

IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD  = [0.229, 0.224, 0.225]

# ── Complete augmentation pipelines for different dataset sizes ────────

def get_transforms(dataset_size: int, image_size: int = 224):
    """Return appropriate train/val transforms based on dataset size."""

    val_transform = T.Compose([
        T.Resize(int(image_size * 256 / 224)),
        T.CenterCrop(image_size),
        T.ToTensor(),
        T.Normalize(mean=IMAGENET_MEAN, std=IMAGENET_STD),
    ])

    if dataset_size < 1000:
        # Maximum augmentation
        train_transform = T.Compose([
            T.RandomResizedCrop(image_size, scale=(0.5, 1.0)),
            T.RandomHorizontalFlip(p=0.5),
            T.RandomVerticalFlip(p=0.1),
            T.RandomRotation(degrees=30),
            T.ColorJitter(brightness=0.8, contrast=0.8,
                           saturation=0.5, hue=0.2),
            T.RandomGrayscale(p=0.1),
            T.GaussianBlur(kernel_size=3, sigma=(0.1, 2.0)),
            T.ToTensor(),
            T.Normalize(mean=IMAGENET_MEAN, std=IMAGENET_STD),
            T.RandomErasing(p=0.5, scale=(0.02, 0.2)),
        ])

    elif dataset_size < 10_000:
        # Strong augmentation
        train_transform = T.Compose([
            T.RandomResizedCrop(image_size, scale=(0.6, 1.0)),
            T.RandomHorizontalFlip(p=0.5),
            T.ColorJitter(brightness=0.4, contrast=0.4,
                           saturation=0.3, hue=0.1),
            T.RandomGrayscale(p=0.05),
            T.ToTensor(),
            T.Normalize(mean=IMAGENET_MEAN, std=IMAGENET_STD),
            T.RandomErasing(p=0.3, scale=(0.02, 0.15)),
        ])

    elif dataset_size < 100_000:
        # Moderate augmentation
        train_transform = T.Compose([
            T.RandomResizedCrop(image_size, scale=(0.7, 1.0)),
            T.RandomHorizontalFlip(p=0.5),
            T.ColorJitter(brightness=0.2, contrast=0.2,
                           saturation=0.2, hue=0.1),
            T.ToTensor(),
            T.Normalize(mean=IMAGENET_MEAN, std=IMAGENET_STD),
        ])

    else:
        # Light augmentation
        train_transform = T.Compose([
            T.RandomResizedCrop(image_size, scale=(0.8, 1.0)),
            T.RandomHorizontalFlip(p=0.5),
            T.ColorJitter(brightness=0.1, contrast=0.1),
            T.ToTensor(),
            T.Normalize(mean=IMAGENET_MEAN, std=IMAGENET_STD),
        ])

    return train_transform, val_transform

# ── Demonstrate transform count ───────────────────────────────────────
for size in [500, 5000, 50000, 500000]:
    train_t, _ = get_transforms(size)
    n_steps = len(train_t.transforms)
    print(f"Dataset size {size:>7,}: {n_steps} transform steps")

# ── Verify: same image looks different each epoch ─────────────────────
train_t, _ = get_transforms(5000)
img = Image.fromarray(np.random.randint(50, 200, (300, 300, 3), dtype=np.uint8))

tensors = [train_t(img) for _ in range(4)]
print(f"\nSame image, 4 different augmentations:")
for i, t in enumerate(tensors):
    print(f"  Epoch {i+1}: mean={t.mean():.4f}  std={t.std():.4f}"
          f"  corner_pixel={t[0,0,0]:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common augmentation mistake — explained and fixed</h2>

        <ErrorBlock
          error="Augmentation applied to validation set — metrics vary between runs"
          cause="T.RandomHorizontalFlip or T.RandomResizedCrop is included in the validation transform. Every call to the validation DataLoader produces different augmented images, so the validation loss and accuracy vary slightly between evaluation runs. This makes it impossible to reliably compare model checkpoints or track improvement across epochs."
          fix="Keep two completely separate transform pipelines: train_transform (with all random augmentations) and val_transform (deterministic only: T.Resize, T.CenterCrop, T.ToTensor, T.Normalize). Never share transform objects between training and validation datasets. Validate by running eval twice and checking metrics are identical — they should be for a deterministic pipeline."
        />

        <ErrorBlock
          error="RandomErasing must come after ToTensor — TypeError when applied to PIL Image"
          cause="T.RandomErasing operates on torch tensors, not PIL Images. It is designed to be placed after T.ToTensor() in the Compose pipeline. Placing it before ToTensor raises a TypeError because it tries to apply tensor operations to a PIL Image object."
          fix="Always place T.RandomErasing after T.ToTensor() and T.Normalize() in the Compose list. The correct order is: [geometric transforms] → [colour transforms] → T.ToTensor() → T.Normalize() → T.RandomErasing(). Pixel-space augmentations (crop, flip, jitter) go before ToTensor. Tensor-space augmentations (RandomErasing) go after."
        />

        <ErrorBlock
          error="MixUp training: loss goes to zero but validation accuracy is much lower than expected"
          cause="MixUp requires soft label cross-entropy — you cannot use standard nn.CrossEntropyLoss with hard integer labels after mixing. If you mix the images but pass the original hard labels to CrossEntropyLoss, the loss reflects how well the model matches a single class label for an image that is a blend of two classes — the gradients are misleading and training degrades."
          fix="Use soft label cross-entropy: loss = -(mixed_labels * torch.log_softmax(logits, dim=1)).sum(dim=1).mean(). Or use label smoothing as a simpler alternative: nn.CrossEntropyLoss(label_smoothing=0.1) — this does not require mixing images but provides similar regularisation. If using torchvision.transforms.v2 MixUp, it handles the label mixing automatically."
        />

        <ErrorBlock
          error="Aggressive augmentation makes training loss oscillate and never converge"
          cause="Augmentation is too strong for the dataset — the model never sees enough coherent examples to learn the underlying pattern. With scale=(0.05, 1.0) in RandomResizedCrop, 5% of the image is sometimes the entire training signal — the model cannot learn from a 5% crop of a product photo. Very high ColorJitter values turn blue jeans green and disrupt colour-based features."
          fix="Start with conservative augmentation and increase gradually. Default ImageNet values are well-tested: RandomResizedCrop scale=(0.08, 1.0), ColorJitter brightness=0.4, hue=0.1. Monitor training loss curves — smooth decrease means augmentation is appropriate. Oscillating loss means too aggressive. Add augmentations one at a time to identify which one causes instability."
        />
      </div>

      <Div />

      {/* ══ SECTION 7 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can preprocess and augment any image dataset.
          Next: detect and localise multiple objects in one pass.
        </h2>

        <p style={S.p}>
          Classification predicts one label for the entire image.
          Object detection predicts the location and class of every
          object in the image — drawing bounding boxes around each one.
          Module 57 covers YOLO — the fastest object detection architecture —
          and the key concepts: anchor boxes, IoU, non-maximum suppression.
          The same augmentation techniques apply but with an important twist:
          geometric augmentations must also transform the bounding box coordinates.
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
              Next — Module 57 · Computer Vision
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Object Detection — YOLO and Feature Pyramids
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Anchor boxes, IoU, non-maximum suppression, and why YOLO
              became the production standard for real-time detection.
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
          'Every augmentation teaches a specific invariance. Horizontal flip: left-right orientation is irrelevant. Color jitter: lighting conditions do not change the category. RandomResizedCrop: objects appear at different scales and positions. Choose augmentations based on what variations are truly label-preserving for your specific task.',
          'Apply augmentation only during training — never during validation or inference. Validation transforms must be deterministic: Resize + CenterCrop + ToTensor + Normalize only. Applying random augmentations to validation makes metrics inconsistent between runs and makes checkpoint comparison meaningless.',
          'Correct transform order: geometric transforms (crop, flip, rotate) → colour transforms (jitter, grayscale, blur) → ToTensor → Normalize → RandomErasing. RandomErasing must come after ToTensor because it operates on tensors not PIL Images.',
          'Match augmentation strength to dataset size. Under 1,000 images: maximum augmentation (heavy jitter, erasing, rotation, MixUp). 1,000–10,000: strong augmentation. 10,000–100,000: moderate. Over 100,000: light. Too much augmentation on a large dataset slows convergence without benefit.',
          'MixUp and CutMix are the strongest regularisers beyond basic augmentation — consistently improve accuracy by 1–2% on small datasets. Both require soft label cross-entropy instead of standard hard label CE loss. MixUp blends images and labels linearly. CutMix pastes rectangular regions with labels mixed proportionally to area.',
          'Cutout (T.RandomErasing) forces the model to use the full image rather than relying on a single discriminative patch. Prevents models from learning shortcuts like "classify kurtas by the logo on the chest." Use p=0.3–0.5, scale=(0.02, 0.15) as a starting point.',
        ]}
      />
    </LearnLayout>
  )
}