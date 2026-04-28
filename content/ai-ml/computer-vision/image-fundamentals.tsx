import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Image Fundamentals — Pixels, Channels and Tensors — Chaduvuko',
  description:
    'How computers see images. Pixel values, colour channels, image tensors, normalisation, and the preprocessing pipeline every vision model expects.',
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

export default function ImageFundamentalsPage() {
  return (
    <LearnLayout
      title="Image Fundamentals — Pixels, Channels and Tensors"
      description="How computers see images. Pixel values, colour channels, image tensors, normalisation, and the preprocessing pipeline every vision model expects."
      section="Computer Vision"
      readTime="26–34 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="computer-vision" topic="image-fundamentals" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — how a computer sees an image</span>
        <h2 style={S.h2}>
          You see a photo of a Shopify kurta.
          A computer sees a 3D array of integers —
          height × width × channels, each value between 0 and 255.
          Everything in computer vision starts from this representation.
        </h2>

        <p style={S.p}>
          A digital image is a grid of pixels. Each pixel is a tiny square
          of colour. For a 224×224 RGB image there are 50,176 pixels.
          Each pixel has three values — one for red intensity, one for green,
          one for blue — each ranging from 0 (none) to 255 (full intensity).
          The full image is represented as a 3D array: 224 rows × 224 columns
          × 3 channels = 150,528 numbers.
        </p>

        <p style={S.p}>
          Every computer vision operation — loading, resizing, cropping,
          normalising, augmenting — is a transformation of this array.
          Every vision model — CNN, ViT, CLIP — takes this array as input.
          Getting the array into exactly the right shape, dtype, and value
          range before the model sees it is the preprocessing pipeline.
          Most computer vision bugs are preprocessing bugs — wrong channel
          order, wrong value range, wrong normalisation statistics.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Think of a crossword puzzle grid. Each cell has a letter.
            The grid has rows, columns, and one layer of content.
            An image is like three crossword grids stacked on top of each other —
            one grid for red intensity, one for green, one for blue.
            Each cell has a number 0–255 instead of a letter.
            Read all three grids together and you reconstruct the colour.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            PyTorch uses channels-first format: (channels, height, width).
            Pillow and OpenCV use channels-last: (height, width, channels).
            Mixing these two formats silently produces garbage predictions —
            this is the single most common computer vision bug.
          </p>
        </AnalogyBox>
      </div>

      <Div />

      {/* ══ SECTION 2 — PIXELS AND CHANNELS ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The data representation</span>
        <h2 style={S.h2}>Pixels, channels, and image tensors — from file to array</h2>

        <VisualBox label="RGB image — three channels stacked">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Pixel grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, maxWidth: 280 }}>
              {[
                { r: 255, g: 82, b: 82 },
                { r: 255, g: 150, b: 82 },
                { r: 82, g: 255, b: 130 },
                { r: 82, g: 130, b: 255 },
                { r: 200, g: 50, b: 100 },
                { r: 100, g: 200, b: 50 },
                { r: 50, g: 100, b: 200 },
                { r: 180, g: 180, b: 50 },
              ].map((px, i) => (
                <div key={i} style={{
                  height: 40, borderRadius: 4,
                  background: `rgb(${px.r},${px.g},${px.b})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-mono)' }}>
                    {px.r},{px.g},{px.b}
                  </span>
                </div>
              ))}
            </div>

            {/* Three channels */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {[
                { label: 'Red channel', color: '#ff4757', values: [255, 255, 82, 82, 200, 100, 50, 180] },
                { label: 'Green channel', color: '#1D9E75', values: [82, 150, 255, 130, 50, 200, 100, 180] },
                { label: 'Blue channel', color: '#378ADD', values: [82, 82, 130, 255, 100, 50, 200, 50] },
              ].map((ch) => (
                <div key={ch.label} style={{
                  background: 'var(--surface)', borderRadius: 6, padding: '8px 10px',
                  border: `1px solid ${ch.color}25`,
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: ch.color, fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                    {ch.label}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
                    {ch.values.map((v, i) => (
                      <div key={i} style={{
                        height: 20, borderRadius: 2,
                        background: ch.label.startsWith('R') ? `rgba(255,71,87,${v/255})` :
                                    ch.label.startsWith('G') ? `rgba(29,158,117,${v/255})` :
                                    `rgba(55,138,221,${v/255})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 7, color: 'white', fontFamily: 'var(--font-mono)',
                      }}>
                        {v}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#7b61ff' }}>
              Shape: (3, 2, 4) ← PyTorch format (channels, height, width)
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#D85A30' }}>
              Shape: (2, 4, 3) ← NumPy/PIL/OpenCV format (height, width, channels)
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from PIL import Image
import torch

# ── Load an image and inspect its representation ──────────────────────
# Create a synthetic image (in practice: Image.open('product.jpg'))
img_array = np.random.randint(0, 256, (224, 224, 3), dtype=np.uint8)
img_pil   = Image.fromarray(img_array)

print("PIL Image:")
print(f"  Mode:   {img_pil.mode}         ← RGB, RGBA, L (greyscale), etc.")
print(f"  Size:   {img_pil.size}     ← (width, height) — note: width first!")
print(f"  Format: {img_pil.format}       ← None for in-memory, 'JPEG'/'PNG' for files")

# ── PIL → NumPy ───────────────────────────────────────────────────────
img_np = np.array(img_pil)
print(f"\nNumPy array (PIL default — channels last):")
print(f"  Shape:  {img_np.shape}    ← (height, width, channels)")
print(f"  Dtype:  {img_np.dtype}          ← uint8, values 0–255")
print(f"  Min:    {img_np.min()}  Max: {img_np.max()}")

# Access individual channels
red_channel   = img_np[:, :, 0]   # shape (224, 224)
green_channel = img_np[:, :, 1]
blue_channel  = img_np[:, :, 2]
print(f"  Red channel mean:   {red_channel.mean():.1f}")
print(f"  Green channel mean: {green_channel.mean():.1f}")
print(f"  Blue channel mean:  {blue_channel.mean():.1f}")

# ── NumPy → PyTorch tensor ─────────────────────────────────────────────
# PyTorch expects (channels, height, width) — must transpose
img_torch = torch.from_numpy(img_np).permute(2, 0, 1)  # HWC → CHW
print(f"\nPyTorch tensor (channels first):")
print(f"  Shape:  {tuple(img_torch.shape)}    ← (channels, height, width)")
print(f"  Dtype:  {img_torch.dtype}       ← torch.uint8, values 0–255")

# ── Convert to float and normalise to [0, 1] ──────────────────────────
img_float = img_torch.float() / 255.0
print(f"\nAfter /255 normalisation:")
print(f"  Dtype:  {img_float.dtype}")
print(f"  Min:    {img_float.min():.4f}  Max: {img_float.max():.4f}")

# ── torchvision ToTensor — does both steps at once ────────────────────
import torchvision.transforms as T
to_tensor  = T.ToTensor()   # PIL (HWC uint8) → torch (CHW float32 0–1)
img_tensor = to_tensor(img_pil)
print(f"\ntorchvision.ToTensor output:")
print(f"  Shape:  {tuple(img_tensor.shape)}")
print(f"  Dtype:  {img_tensor.dtype}")
print(f"  Range:  [{img_tensor.min():.3f}, {img_tensor.max():.3f}]")

# ── Common image stats: how many bytes? ──────────────────────────────
h, w, c = 224, 224, 3
print(f"\nMemory for 224×224 RGB:")
print(f"  uint8  (0-255):    {h*w*c:,} bytes  = {h*w*c/1024:.1f} KB")
print(f"  float32 (0-1):     {h*w*c*4:,} bytes = {h*w*c*4/1024:.1f} KB")
print(f"  Batch of 32 float: {h*w*c*4*32/1024/1024:.1f} MB")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — COLOUR SPACES ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Beyond RGB</span>
        <h2 style={S.h2}>Colour spaces — RGB, greyscale, HSV, and when each matters</h2>

        <p style={S.p}>
          RGB is the default but not always the best representation.
          Greyscale (single channel) halves memory and speeds up models
          when colour is not informative — document OCR, X-ray analysis,
          fingerprint matching. HSV separates hue (colour type),
          saturation (colour intensity), and value (brightness) —
          useful for colour-based detection where you want to detect
          "red objects" regardless of lighting. LAB separates luminance
          from colour and is perceptually uniform — used in medical imaging.
        </p>

        <CodeBlock code={`import numpy as np
from PIL import Image
import torch
import torchvision.transforms as T

# ── Colour space conversions ──────────────────────────────────────────
img_np = np.random.randint(0, 256, (64, 64, 3), dtype=np.uint8)
img_pil = Image.fromarray(img_np)

# ── Greyscale — single channel ────────────────────────────────────────
img_grey  = img_pil.convert('L')   # L = luminance
grey_np   = np.array(img_grey)
print(f"RGB:       {img_np.shape}   range: {img_np.min()}–{img_np.max()}")
print(f"Greyscale: {grey_np.shape}     range: {grey_np.min()}–{grey_np.max()}")
# Greyscale formula: 0.299×R + 0.587×G + 0.114×B (human luminance perception)

# ── PyTorch greyscale ─────────────────────────────────────────────────
grey_transform = T.Grayscale(num_output_channels=1)
grey_tensor    = grey_transform(T.ToTensor()(img_pil))
print(f"PyTorch greyscale: {tuple(grey_tensor.shape)}")

grey_to_3ch    = T.Grayscale(num_output_channels=3)  # keep 3 channels (some models need it)
grey3_tensor   = grey_to_3ch(T.ToTensor()(img_pil))
print(f"Grey as 3-channel: {tuple(grey3_tensor.shape)}")

# ── OpenCV colour conversions (if available) ──────────────────────────
try:
    import cv2

    img_bgr = cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR)  # PIL is RGB, OpenCV is BGR!
    img_hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
    img_lab = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2LAB)

    print(f"\nOpenCV colour spaces (all 64×64):")
    print(f"  BGR:  {img_bgr.shape}  H={img_bgr[...,0].mean():.0f} S={img_bgr[...,1].mean():.0f} V={img_bgr[...,2].mean():.0f}")
    print(f"  HSV:  {img_hsv.shape}  H range: {img_hsv[...,0].min()}–{img_hsv[...,0].max()}")
    print(f"  LAB:  {img_lab.shape}")

    # Critical: OpenCV uses BGR, PIL uses RGB
    # Always convert when mixing PIL and OpenCV
    print(f"\n⚠ OpenCV loads as BGR. Always convert:")
    print(f"   cv2.imread() → BGR")
    print(f"   cv2.cvtColor(img, cv2.COLOR_BGR2RGB) → RGB (for PIL/PyTorch)")

except ImportError:
    print("\nOpenCV not installed: pip install opencv-python")

# ── When to use which colour space ───────────────────────────────────
print("\nColour space selection guide:")
guide = [
    ('RGB',       'Default for all deep learning models'),
    ('Greyscale', 'Documents, X-rays, fingerprints — when colour carries no info'),
    ('HSV',       'Rule-based colour detection (find red objects in any lighting)'),
    ('LAB',       'Medical imaging, colour correction, perceptual distance metrics'),
    ('YCrCb',     'Video compression, face detection under varied lighting'),
]
for space, use in guide:
    print(f"  {space:<12}: {use}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — RESIZING AND CROPPING ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Spatial preprocessing</span>
        <h2 style={S.h2}>Resize, crop, and pad — getting every image to the same shape</h2>

        <p style={S.p}>
          Every model expects a fixed input size — ResNet expects 224×224,
          EfficientNet expects 380×380, ViT-B/16 expects 224×224.
          Real-world images come in all sizes and aspect ratios.
          Transforming them to the required size without distorting the content
          requires understanding the trade-offs between resize, centre crop,
          random crop, and padding.
        </p>

        <ConceptBox title="Resize strategies — what each one does to your image">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { name: 'Direct resize', code: 'T.Resize((224, 224))', color: '#D85A30', note: 'Stretches/squashes to target size. Distorts aspect ratio. Only use when aspect ratios are already consistent.' },
              { name: 'Resize shorter side + centre crop', code: 'T.Resize(256), T.CenterCrop(224)', color: '#1D9E75', note: 'Standard for validation/inference. No distortion. Loses image edges (typically background). Default for ImageNet eval.' },
              { name: 'Random resized crop', code: 'T.RandomResizedCrop(224)', color: '#7b61ff', note: 'Crops a random region then resizes. Standard training augmentation. Forces model to recognise objects at different scales.' },
              { name: 'Resize + pad', code: 'T.Resize + pad to square', color: '#378ADD', note: 'Resize longest side to target, pad shorter side with zeros/mean. Preserves full image content. Common in object detection.' },
            ].map((item) => (
              <div key={item.name} style={{
                display: 'grid', gridTemplateColumns: '160px 200px 1fr',
                gap: 10, background: 'var(--bg2)',
                borderRadius: 5, padding: '7px 10px', alignItems: 'start',
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: item.color }}>{item.name}</span>
                <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: item.color }}>{item.code}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.note}</span>
              </div>
            ))}
          </div>
        </ConceptBox>

        <CodeBlock code={`import torch
import torchvision.transforms as T
import numpy as np
from PIL import Image

# ── Create test image with known aspect ratio ─────────────────────────
# Simulate a portrait-mode product photo (tall image)
img = Image.fromarray(np.random.randint(0, 256, (400, 200, 3), dtype=np.uint8))
print(f"Original: {img.size} (W×H)  →  array shape: {np.array(img).shape}")

# ── Strategy 1: Direct resize (distorts) ─────────────────────────────
t1 = T.Resize((224, 224))
out1 = t1(img)
print(f"\nDirect resize 224×224: {np.array(out1).shape}  ← squashed!")

# ── Strategy 2: Resize shorter side + centre crop (standard for eval) ─
t2 = T.Compose([T.Resize(256), T.CenterCrop(224)])
out2 = t2(img)
print(f"Resize+CenterCrop:     {np.array(out2).shape}  ← no distortion, crops edges")

# ── Strategy 3: RandomResizedCrop (standard for training) ─────────────
t3 = T.RandomResizedCrop(
    size=224,
    scale=(0.08, 1.0),    # crop between 8% and 100% of image area
    ratio=(0.75, 1.33),   # aspect ratio range
)
out3 = t3(img)
print(f"RandomResizedCrop:     {np.array(out3).shape}  ← random region, different each call")

# ── Strategy 4: Resize + pad to square ───────────────────────────────
def resize_and_pad(img: Image.Image, target: int = 224,
                    fill: int = 0) -> Image.Image:
    """Resize longest side to target, pad shorter side to make square."""
    w, h   = img.size
    ratio  = target / max(w, h)
    new_w  = int(w * ratio)
    new_h  = int(h * ratio)
    img_r  = img.resize((new_w, new_h), Image.BILINEAR)

    # Pad to square
    pad_w  = target - new_w
    pad_h  = target - new_h
    left   = pad_w // 2
    top    = pad_h // 2
    result = Image.new('RGB', (target, target), (fill, fill, fill))
    result.paste(img_r, (left, top))
    return result

out4 = resize_and_pad(img, 224)
print(f"Resize+Pad:            {np.array(out4).shape}  ← full image preserved")

# ── Memory and batch implications ─────────────────────────────────────
batch_size = 32
for h, w in [(224, 224), (384, 384), (512, 512)]:
    mb = h * w * 3 * 4 * batch_size / 1024 / 1024
    print(f"\nBatch={batch_size}, size={h}×{w}: {mb:.1f} MB in float32")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — NORMALISATION ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most critical preprocessing step</span>
        <h2 style={S.h2}>Normalisation — why ImageNet statistics are used everywhere and when to recompute them</h2>

        <p style={S.p}>
          After converting to float32 and dividing by 255 (values in 0–1),
          you must normalise each channel to zero mean and unit standard
          deviation. Without normalisation the network's first layer
          receives values in [0, 1] — a very different distribution from
          what the pretrained weights expect. The result: predictions that
          look random even from a perfectly fine model.
        </p>

        <p style={S.p}>
          For any model pretrained on ImageNet, use the ImageNet statistics:
          mean = [0.485, 0.456, 0.406], std = [0.229, 0.224, 0.225].
          These numbers were computed over the entire 1.2M ImageNet training set.
          For custom datasets (medical images, satellite imagery, product photos)
          compute your own statistics — ImageNet numbers may be far off.
        </p>

        <CodeBlock code={`import torch
import torchvision.transforms as T
import numpy as np
from PIL import Image

# ── ImageNet normalisation — standard for pretrained models ──────────
IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD  = [0.229, 0.224, 0.225]

normalize = T.Normalize(mean=IMAGENET_MEAN, std=IMAGENET_STD)

img_pil    = Image.fromarray(np.random.randint(0, 256, (224, 224, 3), dtype=np.uint8))
img_tensor = T.ToTensor()(img_pil)   # 0–1 float

print("Before normalisation:")
print(f"  Mean per channel: {img_tensor.mean(dim=[1,2]).tolist()}")
print(f"  Std  per channel: {img_tensor.std(dim=[1,2]).tolist()}")
print(f"  Range: [{img_tensor.min():.3f}, {img_tensor.max():.3f}]")

img_norm = normalize(img_tensor)
print(f"\nAfter ImageNet normalisation:")
print(f"  Mean per channel: {[round(v,3) for v in img_norm.mean(dim=[1,2]).tolist()]}")
print(f"  Std  per channel: {[round(v,3) for v in img_norm.std(dim=[1,2]).tolist()]}")
print(f"  Range: [{img_norm.min():.3f}, {img_norm.max():.3f}]  ← can go negative!")

# ── Standard training pipeline ────────────────────────────────────────
train_transform = T.Compose([
    T.RandomResizedCrop(224),
    T.RandomHorizontalFlip(),
    T.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2),
    T.ToTensor(),
    T.Normalize(mean=IMAGENET_MEAN, std=IMAGENET_STD),
])

val_transform = T.Compose([
    T.Resize(256),
    T.CenterCrop(224),
    T.ToTensor(),
    T.Normalize(mean=IMAGENET_MEAN, std=IMAGENET_STD),
])

train_tensor = train_transform(img_pil)
val_tensor   = val_transform(img_pil)
print(f"\nTraining transform output:   {tuple(train_tensor.shape)}")
print(f"Validation transform output: {tuple(val_tensor.shape)}")

# ── Computing custom normalisation stats for your dataset ─────────────
def compute_dataset_stats(image_list: list) -> tuple:
    """
    Compute mean and std over a list of PIL images.
    In production: iterate over your full training DataLoader.
    """
    all_pixels = []
    for img in image_list:
        t = T.ToTensor()(img)   # (3, H, W) float 0–1
        all_pixels.append(t.view(3, -1))  # (3, H*W)

    all_pixels = torch.cat(all_pixels, dim=1)   # (3, N_pixels)
    mean = all_pixels.mean(dim=1).tolist()
    std  = all_pixels.std(dim=1).tolist()
    return mean, std

# Simulate 10 product images
fake_images = [
    Image.fromarray(np.random.randint(50, 200, (64, 64, 3), dtype=np.uint8))
    for _ in range(10)
]
custom_mean, custom_std = compute_dataset_stats(fake_images)
print(f"\nCustom dataset stats:")
print(f"  Mean: {[round(v, 4) for v in custom_mean]}")
print(f"  Std:  {[round(v, 4) for v in custom_std]}")
print(f"  (Compare to ImageNet mean: {IMAGENET_MEAN})")
print(f"  If very different → use custom stats, not ImageNet")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — THE COMPLETE PIPELINE ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Putting it together</span>
        <h2 style={S.h2}>Production image preprocessing pipeline — from file on disk to model input</h2>

        <CodeBlock code={`import torch
import torchvision.transforms as T
import torchvision.transforms.functional as TF
from torch.utils.data import Dataset, DataLoader
from PIL import Image
import numpy as np
import os

# ── Complete Dataset class with preprocessing ─────────────────────────
class ProductImageDataset(Dataset):
    """
    Shopify product image dataset.
    Directory structure:
      data/
        kurta/    image1.jpg  image2.jpg  ...
        saree/    image1.jpg  ...
        jeans/    ...
    """
    CATEGORIES = ['kurta', 'saree', 'jeans', 'sneakers', 'watch', 'handbag']
    IMAGENET_MEAN = [0.485, 0.456, 0.406]
    IMAGENET_STD  = [0.229, 0.224, 0.225]

    def __init__(self, root_dir: str, split: str = 'train',
                  image_size: int = 224):
        self.split      = split
        self.image_size = image_size

        # Build file list (in production: scan directory)
        # Here: generate synthetic data
        self.samples = []
        for label, category in enumerate(self.CATEGORIES):
            for i in range(20):
                self.samples.append((f"{root_dir}/{category}/{i}.jpg", label))

        # Define transforms
        if split == 'train':
            self.transform = T.Compose([
                T.RandomResizedCrop(image_size, scale=(0.7, 1.0)),
                T.RandomHorizontalFlip(p=0.5),
                T.ColorJitter(brightness=0.3, contrast=0.3,
                               saturation=0.2, hue=0.1),
                T.RandomGrayscale(p=0.05),    # rare greyscale augmentation
                T.ToTensor(),
                T.Normalize(mean=self.IMAGENET_MEAN, std=self.IMAGENET_STD),
            ])
        else:
            self.transform = T.Compose([
                T.Resize(int(image_size * 256 / 224)),   # resize to 256 if target 224
                T.CenterCrop(image_size),
                T.ToTensor(),
                T.Normalize(mean=self.IMAGENET_MEAN, std=self.IMAGENET_STD),
            ])

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx: int):
        path, label = self.samples[idx]

        # In production: img = Image.open(path).convert('RGB')
        # Simulate with random image
        img = Image.fromarray(
            np.random.randint(0, 256, (300, 200, 3), dtype=np.uint8)
        )
        img = self.transform(img)
        return img, label

# ── Test the pipeline ─────────────────────────────────────────────────
train_ds = ProductImageDataset('/data/meesho', split='train')
val_ds   = ProductImageDataset('/data/meesho', split='val')

train_loader = DataLoader(
    train_ds, batch_size=32,
    shuffle=True,
    num_workers=0,         # 4 in production for parallel loading
    pin_memory=False,      # True if using GPU
    drop_last=True,
)
val_loader = DataLoader(
    val_ds, batch_size=64,
    shuffle=False,
    num_workers=0,
)

batch_imgs, batch_labels = next(iter(train_loader))
print(f"Batch shape:  {tuple(batch_imgs.shape)}")
print(f"Labels shape: {tuple(batch_labels.shape)}")
print(f"Value range:  [{batch_imgs.min():.3f}, {batch_imgs.max():.3f}]")
print(f"Dtype:        {batch_imgs.dtype}")

# ── Denormalise for visualisation ─────────────────────────────────────
def denormalise(tensor: torch.Tensor,
                mean = [0.485, 0.456, 0.406],
                std  = [0.229, 0.224, 0.225]) -> np.ndarray:
    """Convert normalised tensor back to uint8 for display."""
    m = torch.tensor(mean).view(3, 1, 1)
    s = torch.tensor(std).view(3, 1, 1)
    img = tensor * s + m          # undo normalisation
    img = img.clamp(0, 1)         # clip to [0, 1]
    img = (img * 255).byte()      # float32 → uint8
    return img.permute(1, 2, 0).numpy()  # CHW → HWC for display

sample = batch_imgs[0]
sample_display = denormalise(sample)
print(f"\nDenormalised for display: {sample_display.shape}  dtype={sample_display.dtype}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common image preprocessing mistake — explained and fixed</h2>

        <ErrorBlock
          error="Model predictions are garbage — all images get the same wrong class"
          cause="ImageNet normalisation was not applied when using a pretrained model. The model's weights were learned with inputs normalised to approximately zero mean and unit std. Raw pixel values in [0, 1] have mean ~0.5 and std ~0.25 — completely different from what the model expects. The first layer produces activations in the wrong range and predictions are meaningless."
          fix="Always apply T.Normalize(mean=[0.485,0.456,0.406], std=[0.229,0.224,0.225]) as the last step in the transform pipeline for any ImageNet-pretrained model. Verify with a single image: after normalisation, mean should be close to 0 and std close to 1 per channel. If you forget normalisation, the symptom is the model predicting one class for everything regardless of the input."
        />

        <ErrorBlock
          error="RuntimeError: Expected input channels to be 3 but got 1 (or 4)"
          cause="Image channel mismatch. PNG images often have 4 channels (RGBA — red, green, blue, alpha transparency). Greyscale images have 1 channel. Most vision models expect exactly 3 channels. If you load a PNG without converting, the 4th alpha channel causes a shape mismatch in the first convolutional layer."
          fix="Always convert to RGB on load: img = Image.open(path).convert('RGB'). This handles greyscale (L → RGB by repeating the channel), RGBA (drops the alpha channel), and palette mode (P → RGB). Never skip the .convert('RGB') call when loading arbitrary images from user uploads or web scraping — the image format is not guaranteed."
        />

        <ErrorBlock
          error="Training accuracy is high but validation accuracy is much lower — suspect transform mismatch"
          cause="Different transforms applied to training and validation sets in a way that creates a distribution shift. Common mistake: applying T.RandomResizedCrop to validation (crops random regions) instead of T.Resize + T.CenterCrop (deterministic). Each validation batch produces different crops so metrics are inconsistent. Or normalisation applied only to training but not validation."
          fix="Keep transforms strictly separate: train_transform (with augmentation) and val_transform (deterministic only). The val_transform must include the same T.Resize, T.CenterCrop, T.ToTensor, and T.Normalize as training — but never any random operations. Print transform.transforms for both and verify. The only difference between train and val transforms should be the random augmentations."
        />

        <ErrorBlock
          error="OpenCV image loaded as BGR causes wrong colours — model performance is degraded"
          cause="cv2.imread() loads images in BGR channel order (Blue, Green, Red) — the opposite of PIL and PyTorch which use RGB. If you load with OpenCV and pass directly to a PyTorch model or T.ToTensor() without converting, the red and blue channels are swapped. For colour-sensitive tasks this significantly degrades performance."
          fix="Always convert after loading with OpenCV: img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB). Then convert to PIL if needed: img_pil = Image.fromarray(img_rgb). Alternatively use PIL exclusively for loading: img = Image.open(path).convert('RGB') — PIL always uses RGB and is simpler for preprocessing pipelines. Only use OpenCV when you need its specific operations (SIFT, morphological ops, video capture)."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          Images are tensors. Next: multiply your training data
          without collecting a single new image.
        </h2>

        <p style={S.p}>
          You now understand the complete representation of an image
          and how to preprocess it for any vision model.
          The next challenge is data — vision models need thousands
          of labelled images but collecting and labelling them is expensive.
          Data augmentation synthetically multiplies your dataset
          by applying random transformations that preserve the label.
          Module 56 covers every augmentation technique used in production
          and explains exactly what each one teaches the model.
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
              Next — Module 56 · Computer Vision
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Data Augmentation — Training on Limited Image Data
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Flips, crops, colour jitter, mixup, cutout — and how each
              one affects what the model learns.
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
          'A digital image is a 3D array: (height, width, channels). RGB images have 3 channels, each pixel value 0–255. PyTorch uses channels-first format (C, H, W). PIL and OpenCV use channels-last (H, W, C). Mixing these formats silently produces wrong results — always permute when converting.',
          'The standard loading pipeline: PIL Image.open().convert("RGB") → T.ToTensor() divides by 255 and converts to (C, H, W) float32 → T.Normalize() applies per-channel mean/std normalisation. Never skip the convert("RGB") call — PNGs have RGBA (4 channels) and greyscale images have 1 channel.',
          'For any ImageNet-pretrained model always use ImageNet normalisation statistics: mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]. Skipping normalisation is the most common reason a pretrained model predicts the same class for every image.',
          'Training and validation transforms are different. Training: RandomResizedCrop + RandomHorizontalFlip + ColorJitter + ToTensor + Normalize. Validation: Resize(256) + CenterCrop(224) + ToTensor + Normalize. Never apply random operations to the validation set — it makes metrics inconsistent.',
          'Memory scales quadratically with image size. A batch of 32 images at 224×224 float32 = 38MB. At 384×384 it is 113MB. At 512×512 it is 200MB. Always check memory requirements before choosing image size. pin_memory=True and num_workers=4 are standard DataLoader settings for GPU training.',
          'OpenCV loads images as BGR not RGB. Always convert after loading: cv2.cvtColor(img, cv2.COLOR_BGR2RGB). Or use PIL exclusively: Image.open(path).convert("RGB") always gives RGB. Swapped channels degrade colour-sensitive model performance and are notoriously hard to debug because the image looks correct when displayed.',
        ]}
      />
    </LearnLayout>
  )
}
