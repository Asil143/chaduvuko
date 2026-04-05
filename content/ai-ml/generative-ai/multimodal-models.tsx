import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Multimodal Models — CLIP, LLaVA, and Vision-Language — Chaduvuko',
  description:
    'Models that see and understand images and text together. CLIP for zero-shot image classification, LLaVA for visual question answering.',
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

export default function MultimodalModelsPage() {
  return (
    <LearnLayout
      title="Multimodal Models — CLIP, LLaVA, and Vision-Language"
      description="Models that see and understand images and text together. CLIP for zero-shot image classification, LLaVA for visual question answering."
      section="Generative AI"
      readTime="40–45 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="generative-ai" topic="multimodal-models" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — what multimodal means</span>
        <h2 style={S.h2}>
          Every model in this track so far processes one modality —
          text or images. Multimodal models process both simultaneously
          and reason about how they relate to each other.
        </h2>

        <p style={S.p}>
          A vision model can tell you "this image contains a saree."
          A language model can tell you "sarees are traditional Indian garments."
          Neither can answer: "does this product photo match this description —
          A red Banarasi silk saree with gold zari border?" That requires
          understanding both modalities and the relationship between them.
          Multimodal models do exactly this.
        </p>

        <p style={S.p}>
          The two dominant approaches: CLIP (Contrastive Language-Image Pre-training,
          OpenAI 2021) learns a shared embedding space where semantically
          similar images and text are close together. It enables zero-shot
          image classification with any text labels — no training on those
          labels required. LLaVA (Large Language and Vision Assistant) connects
          a vision encoder to an LLM, enabling open-ended conversations about images.
          Ask it any question about any image and it generates a natural language answer.
        </p>

        <p style={S.p}>
          Real production uses at Indian companies: Meesho uses CLIP-based retrieval
          to match user search queries to product images without pre-defined categories.
          Flipkart uses multimodal models to verify that product photos match
          product descriptions. Swiggy uses them to check that restaurant dish photos
          match their menu descriptions. Every e-commerce platform now has
          multimodal search — text query → image results, or image query → similar products.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Think of a bilingual dictionary — it maps words from English to Hindi
            and back. CLIP is a bilingual dictionary between visual language and
            text language. Show it an image of a saree and it gives you a vector.
            Show it the text "traditional Indian silk garment" and it gives you
            a similar vector. They are translations of the same concept into
            a shared numeric language. Similarity in this shared space means
            semantic similarity across modalities.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The critical insight: CLIP was trained on 400 million (image, text)
            pairs from the internet. It never needed explicit labels.
            The training signal came purely from the natural language captions
            that humans wrote alongside images. This is the largest
            self-supervised multimodal dataset ever assembled.
          </p>
        </AnalogyBox>
      </div>

      <Div />

      {/* ══ SECTION 2 — CLIP ARCHITECTURE ═══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The architecture</span>
        <h2 style={S.h2}>CLIP — contrastive pretraining in a shared embedding space</h2>

        <p style={S.p}>
          CLIP has two encoders: an image encoder (Vision Transformer or ResNet)
          and a text encoder (Transformer). Both encoders project their inputs
          into the same 512 or 768 dimensional embedding space.
          Training uses contrastive loss: for a batch of N (image, text) pairs,
          the N correct pairs should be close in embedding space and the
          N² − N incorrect pairs should be far apart.
          After training, any image and any text can be compared by
          cosine similarity of their embeddings.
        </p>

        <VisualBox label="CLIP contrastive training — N×N similarity matrix">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16 }}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>IMAGES</div>
                {['🥻 saree photo', '👟 sneaker photo', '⌚ watch photo', '👗 kurta photo'].map((img, i) => (
                  <div key={i} style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 4, padding: '5px 8px', marginBottom: 4,
                    fontSize: 11, color: 'var(--text)',
                  }}>{img}</div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>SIMILARITY MATRIX (target: diagonal = 1, off-diagonal = 0)</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
                  {[
                    [1.0, 0.1, 0.05, 0.2],
                    [0.1, 1.0, 0.15, 0.12],
                    [0.05, 0.15, 1.0, 0.08],
                    [0.2, 0.12, 0.08, 1.0],
                  ].map((row, i) =>
                    row.map((val, j) => (
                      <div key={`${i}-${j}`} style={{
                        height: 36, borderRadius: 3,
                        background: i === j
                          ? `rgba(29,158,117,${val})`
                          : `rgba(255,71,87,${val * 3})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, fontFamily: 'var(--font-mono)',
                        color: i === j ? '#1D9E75' : '#ff4757',
                        fontWeight: i === j ? 700 : 400,
                      }}>
                        {val.toFixed(2)}
                      </div>
                    ))
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, marginTop: 4 }}>
                  {['"silk saree"', '"white sneaker"', '"smartwatch"', '"cotton kurta"'].map((t, i) => (
                    <div key={i} style={{ fontSize: 9, color: 'var(--muted)', textAlign: 'center' as const }}>{t}</div>
                  ))}
                </div>
              </div>
            </div>
            <p style={{ ...S.ps, marginBottom: 0, fontSize: 11 }}>
              Training: maximise similarity for correct pairs (diagonal) and minimise
              for incorrect pairs (off-diagonal). Loss = cross-entropy applied
              symmetrically along rows (image→text) and columns (text→image).
            </p>
          </div>
        </VisualBox>

        <ConceptBox title="InfoNCE contrastive loss — what CLIP actually optimises">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.2 }}>
            <div style={{ color: '#888', marginBottom: 6, fontSize: 11 }}>For a batch of N (image, text) pairs:</div>
            <div style={{ color: '#7b61ff', paddingLeft: 12, marginBottom: 4 }}>
              S_ij = cos_sim(image_enc(I_i), text_enc(T_j)) × exp(τ)
            </div>
            <div style={{ color: '#1D9E75', paddingLeft: 12, marginBottom: 4 }}>
              L_img = −(1/N) Σ_i log(exp(S_ii) / Σ_j exp(S_ij))
            </div>
            <div style={{ color: '#1D9E75', paddingLeft: 12, marginBottom: 8 }}>
              L_txt = −(1/N) Σ_j log(exp(S_jj) / Σ_i exp(S_ij))
            </div>
            <div style={{ color: '#D85A30', paddingLeft: 12 }}>
              L_total = (L_img + L_txt) / 2
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>
              τ = learned temperature parameter (initialised to 0.07).
              Larger batch = more negatives = harder task = better representations.
              OpenAI used batch size 32,768 across thousands of GPUs.
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np
from PIL import Image

# ── CLIP contrastive loss from scratch ───────────────────────────────
class CLIPContrastiveLoss(nn.Module):
    def __init__(self, temperature: float = 0.07):
        super().__init__()
        self.log_temp = nn.Parameter(torch.log(torch.tensor(temperature)))

    def forward(self, image_emb: torch.Tensor,
                 text_emb: torch.Tensor) -> torch.Tensor:
        """
        image_emb: (B, D) — L2-normalised image embeddings
        text_emb:  (B, D) — L2-normalised text embeddings
        Returns: scalar contrastive loss
        """
        # Cosine similarity matrix (already normalised)
        temp    = self.log_temp.exp()
        sim_mat = (image_emb @ text_emb.T) * temp   # (B, B)

        # Ground truth: diagonal pairs are correct matches
        labels = torch.arange(sim_mat.size(0), device=sim_mat.device)

        # Symmetric cross-entropy
        loss_img = F.cross_entropy(sim_mat,   labels)   # each image → text
        loss_txt = F.cross_entropy(sim_mat.T, labels)   # each text → image

        return (loss_img + loss_txt) / 2

# ── Simulate CLIP training step ───────────────────────────────────────
torch.manual_seed(42)
BATCH = 8
DIM   = 512

# Random L2-normalised embeddings (in real CLIP: output of encoders)
img_emb = F.normalize(torch.randn(BATCH, DIM), dim=1)
txt_emb = F.normalize(torch.randn(BATCH, DIM), dim=1)

# Make pairs 0 and 1 more similar (simulate training signal)
txt_emb[0] = F.normalize(img_emb[0] + torch.randn(DIM) * 0.3, dim=0)
txt_emb[1] = F.normalize(img_emb[1] + torch.randn(DIM) * 0.3, dim=0)

criterion = CLIPContrastiveLoss(temperature=0.07)
loss      = criterion(img_emb, txt_emb)

# Compute similarity matrix for inspection
with torch.no_grad():
    sim = (img_emb @ txt_emb.T) * criterion.log_temp.exp()
    probs = F.softmax(sim, dim=1)

print(f"CLIP contrastive loss: {loss.item():.4f}")
print(f"Temperature: {criterion.log_temp.exp().item():.4f}")
print(f"\nSimilarity matrix (top-left 4×4):")
print(sim[:4, :4].numpy().round(3))
print(f"\nRow 0 retrieval probs: {probs[0].numpy().round(3)}")
print(f"  Correct match (col 0) probability: {probs[0, 0].item():.4f}")

# ── Using pretrained CLIP from HuggingFace ────────────────────────────
print("""
from transformers import CLIPModel, CLIPProcessor

model     = CLIPModel.from_pretrained('openai/clip-vit-base-patch32')
processor = CLIPProcessor.from_pretrained('openai/clip-vit-base-patch32')

# Zero-shot image classification — NO training on these categories needed
image  = Image.open('product.jpg')
labels = ['a red silk saree', 'blue denim jeans', 'leather sneakers',
           'gold wristwatch', 'cotton kurta']

inputs = processor(text=labels, images=image, return_tensors='pt', padding=True)
with torch.no_grad():
    outputs = model(**inputs)
    logits  = outputs.logits_per_image   # (1, n_labels)
    probs   = logits.softmax(dim=1)

for label, prob in zip(labels, probs[0]):
    print(f'  {label:<30}: {prob.item():.4f}')
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — CLIP APPLICATIONS ═══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Production applications</span>
        <h2 style={S.h2}>What you can build with CLIP — zero-shot, retrieval, and embeddings</h2>

        <CodeBlock code={`import torch
import torch.nn.functional as F
import numpy as np
from PIL import Image

# ── Application 1: Zero-shot image classification ─────────────────────
# Classify images into any categories without training examples
print("=" * 55)
print("1. ZERO-SHOT CLASSIFICATION")
print("=" * 55)
print("""
from transformers import CLIPModel, CLIPProcessor

model     = CLIPModel.from_pretrained('openai/clip-vit-base-patch32')
processor = CLIPProcessor.from_pretrained('openai/clip-vit-base-patch32')
model.eval()

# Meesho: classify product photos into catalogue categories
CATEGORIES = [
    'a photo of a kurta or kurti',
    'a photo of a saree',
    'a photo of jeans or trousers',
    'a photo of sneakers or sports shoes',
    'a photo of a wristwatch',
    'a photo of a handbag or purse',
]

def classify_product(image_path: str) -> tuple[str, float]:
    image  = Image.open(image_path).convert('RGB')
    inputs = processor(
        text=CATEGORIES, images=image,
        return_tensors='pt', padding=True,
    )
    with torch.no_grad():
        out   = model(**inputs)
        probs = out.logits_per_image.softmax(dim=1)[0]

    best_idx = probs.argmax().item()
    return CATEGORIES[best_idx], probs[best_idx].item()

category, confidence = classify_product('product.jpg')
print(f'Category: {category}  Confidence: {confidence:.3f}')
""")

# ── Application 2: Text-to-image retrieval ────────────────────────────
print("=" * 55)
print("2. TEXT-TO-IMAGE RETRIEVAL (semantic search)")
print("=" * 55)
print("""
# Build index from product images at indexing time (run once)
def build_image_index(image_paths: list, model, processor) -> torch.Tensor:
    all_embeddings = []
    for path in image_paths:
        img    = Image.open(path).convert('RGB')
        inputs = processor(images=img, return_tensors='pt')
        with torch.no_grad():
            emb = model.get_image_features(**inputs)
            emb = F.normalize(emb, dim=-1)
        all_embeddings.append(emb)
    return torch.cat(all_embeddings, dim=0)   # (N, 512)

# At query time
def search_by_text(query: str, image_index: torch.Tensor,
                    image_paths: list, model, processor,
                    top_k: int = 5) -> list:
    inputs = processor(text=[query], return_tensors='pt', padding=True)
    with torch.no_grad():
        txt_emb = model.get_text_features(**inputs)
        txt_emb = F.normalize(txt_emb, dim=-1)

    # Cosine similarity with all indexed images
    similarities = (image_index @ txt_emb.T).squeeze(-1)
    top_indices  = similarities.argsort(descending=True)[:top_k]

    return [
        {'path': image_paths[i], 'score': similarities[i].item()}
        for i in top_indices
    ]

# Example queries:
# 'red silk saree with gold border'        → retrieves matching products
# 'casual blue jeans for men'              → retrieves casual jeans
# 'party wear dress for wedding ceremony'  → understands context
# 'same as the image' (not possible)      → need image query instead
""")

# ── Application 3: Image-to-image retrieval ────────────────────────────
print("=" * 55)
print("3. IMAGE-TO-IMAGE RETRIEVAL (visual similarity)")
print("=" * 55)
print("""
# Query with an image instead of text
def search_by_image(query_image_path: str, image_index: torch.Tensor,
                     image_paths: list, model, processor, top_k=5):
    query_img = Image.open(query_image_path).convert('RGB')
    inputs    = processor(images=query_img, return_tensors='pt')
    with torch.no_grad():
        query_emb = F.normalize(model.get_image_features(**inputs), dim=-1)

    similarities = (image_index @ query_emb.T).squeeze(-1)
    top_idx      = similarities.argsort(descending=True)[1:top_k+1]  # skip self

    return [{'path': image_paths[i], 'score': similarities[i].item()}
             for i in top_idx]

# Used by Meesho for 'similar products' recommendations
# User takes photo of product they like → retrieve visually similar products
""")

# ── Application 4: CLIP as a feature extractor ────────────────────────
print("4. CLIP FEATURES + DOWNSTREAM CLASSIFIER")
print("""
# Fine-tune a linear head on top of frozen CLIP features
# Much more efficient than training from scratch

from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder

def extract_clip_features(image_paths, model, processor):
    features = []
    for path in image_paths:
        img    = Image.open(path).convert('RGB')
        inputs = processor(images=img, return_tensors='pt')
        with torch.no_grad():
            emb = model.get_image_features(**inputs)
            emb = F.normalize(emb, dim=-1)
        features.append(emb.numpy())
    return np.vstack(features)

# Training: 50 examples per class → strong classification via linear probe
# X_train = extract_clip_features(train_paths, model, processor)
# clf     = LogisticRegression(max_iter=1000, C=1.0)
# clf.fit(X_train, train_labels)
# Accuracy: ~85% with 50 examples per class (vs ~40% training from scratch)
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — LLAVA ARCHITECTURE ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Visual question answering</span>
        <h2 style={S.h2}>LLaVA — connecting a vision encoder to an LLM for image conversation</h2>

        <p style={S.p}>
          CLIP maps images to embeddings but cannot generate text about images —
          it can only score similarity. LLaVA (Liu et al., 2023) bridges this gap
          by connecting a visual encoder to a language model.
          The architecture is three components: a CLIP vision encoder that extracts
          image patch features, a projection MLP that maps vision features into
          the LLM's embedding space, and a language model (LLaMA or Mistral)
          that generates responses conditioned on both image features and text.
        </p>

        <VisualBox label="LLaVA architecture — vision encoder + projection + LLM">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                name: 'Image input',
                detail: '(H, W, 3) RGB image → split into 14×14 patches',
                color: '#888',
                arrow: true,
              },
              {
                name: 'CLIP Vision Encoder (ViT-L/14)',
                detail: '256 patch tokens → 256 × 1024 visual features. Frozen during LLaVA-1 training.',
                color: '#378ADD',
                arrow: true,
              },
              {
                name: 'Projection MLP (2-layer)',
                detail: '256 × 1024 → 256 × 4096. Maps vision features into LLM token embedding space. Trainable.',
                color: '#D85A30',
                arrow: true,
              },
              {
                name: 'Concatenate with text tokens',
                detail: '[image_tokens (256)] + [system_prompt] + [user_question] → full context',
                color: '#7b61ff',
                arrow: true,
              },
              {
                name: 'LLaMA / Mistral LLM',
                detail: 'Standard causal LM. Generates response attending to both image and text tokens.',
                color: '#1D9E75',
                arrow: false,
              },
            ].map((item, i) => (
              <div key={i}>
                <div style={{
                  background: 'var(--surface)', border: `1px solid ${item.color}25`,
                  borderRadius: 6, padding: '8px 12px',
                  borderLeft: `3px solid ${item.color}`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: item.color }}>{item.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--muted)', maxWidth: '60%', textAlign: 'right' as const }}>{item.detail}</span>
                </div>
                {item.arrow && (
                  <div style={{ textAlign: 'center' as const, color: '#555', fontSize: 14, lineHeight: 1.2 }}>↓</div>
                )}
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import torch
import torch.nn as nn

# ── Minimal LLaVA projection layer ───────────────────────────────────
class LLaVAProjection(nn.Module):
    """
    Two-layer MLP that maps CLIP vision features into LLM embedding space.
    This is the only new component in LLaVA — everything else is pretrained.
    Training LLaVA = training this MLP (and optionally the LLM with LoRA).
    """
    def __init__(self, vision_dim: int = 1024, llm_dim: int = 4096):
        super().__init__()
        self.mlp = nn.Sequential(
            nn.Linear(vision_dim, llm_dim),
            nn.GELU(),
            nn.Linear(llm_dim, llm_dim),
        )

    def forward(self, vision_features: torch.Tensor) -> torch.Tensor:
        """
        vision_features: (B, n_patches, vision_dim)  e.g. (1, 256, 1024)
        Returns:         (B, n_patches, llm_dim)      e.g. (1, 256, 4096)
        """
        return self.mlp(vision_features)

# ── Shape demonstration ───────────────────────────────────────────────
proj = LLaVAProjection(vision_dim=1024, llm_dim=4096)

# CLIP ViT-L/14 output: 256 patch tokens for a 336×336 image
vision_features = torch.randn(1, 256, 1024)
projected = proj(vision_features)

params = sum(p.numel() for p in proj.parameters())
print(f"LLaVA Projection MLP:")
print(f"  Vision features: {tuple(vision_features.shape)}")
print(f"  Projected:       {tuple(projected.shape)}")
print(f"  Parameters:      {params:,}  ← tiny relative to LLM")

# ── Using LLaVA for visual QA ─────────────────────────────────────────
print("""
from transformers import LlavaNextProcessor, LlavaNextForConditionalGeneration
from PIL import Image

# LLaVA-1.6 (LLaVA-NeXT) — best open-source VQA model
model_id  = 'llava-hf/llava-v1.6-mistral-7b-hf'
processor = LlavaNextProcessor.from_pretrained(model_id)
model     = LlavaNextForConditionalGeneration.from_pretrained(
    model_id, torch_dtype=torch.float16, device_map='auto',
)
model.eval()

# Product quality check — Flipkart
image = Image.open('product_listing.jpg').convert('RGB')
conversation = [
    {
        'role': 'user',
        'content': [
            {'type': 'image'},
            {'type': 'text', 'text': (
                'This is a product listing image from an e-commerce platform. '
                'Answer these questions:\n'
                '1. Does the image show the product clearly?\n'
                '2. Is the background clean and professional?\n'
                '3. Are there any visible defects or quality issues?\n'
                '4. What is the main product category?\n'
                'Be concise.'
            )},
        ],
    },
]

prompt  = processor.apply_chat_template(conversation, add_generation_prompt=True)
inputs  = processor(images=image, text=prompt, return_tensors='pt').to(model.device)

with torch.no_grad():
    output = model.generate(**inputs, max_new_tokens=200, temperature=0.0, do_sample=False)

response = processor.decode(output[0][inputs['input_ids'].shape[1]:],
                              skip_special_tokens=True)
print(f"Quality assessment:\\n{response}")
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — PRACTICAL MULTIMODAL APPLICATIONS ══════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Building with multimodal models</span>
        <h2 style={S.h2}>Three production patterns — product search, document understanding, and quality control</h2>

        <CodeBlock code={`import torch
import torch.nn.functional as F
import numpy as np

# ── Pattern 1: Multimodal product search ──────────────────────────────
print("PATTERN 1: MULTIMODAL PRODUCT SEARCH")
print("""
# Architecture: CLIP embeddings + FAISS index

class MultimodalProductSearch:
    def __init__(self, model, processor):
        self.model     = model
        self.processor = processor
        self.image_index   = None   # FAISS index
        self.product_data  = []     # metadata

    def index_product(self, image_path, product_id, name, price, category):
        img    = Image.open(image_path).convert('RGB')
        inputs = self.processor(images=img, return_tensors='pt')
        with torch.no_grad():
            emb = F.normalize(self.model.get_image_features(**inputs), dim=-1)
        self.product_data.append({
            'id': product_id, 'name': name,
            'price': price, 'category': category,
            'embedding': emb,
        })

    def search(self, query: str, top_k: int = 10):
        inputs = self.processor(text=[query], return_tensors='pt', padding=True)
        with torch.no_grad():
            q_emb = F.normalize(self.model.get_text_features(**inputs), dim=-1)

        # Score all products
        all_emb = torch.cat([p['embedding'] for p in self.product_data])
        scores  = (all_emb @ q_emb.T).squeeze(-1)
        top_idx = scores.argsort(descending=True)[:top_k]

        return [
            {**self.product_data[i], 'score': scores[i].item()}
            for i in top_idx
        ]

# Example queries that CLIP handles without category training:
queries = [
    'wedding saree under 2000 rupees',           # price + occasion + category
    'office formal shirt for men light colour',   # style + context + colour
    'kids birthday party dress pink frilly',      # demographics + occasion
    'gym wear breathable fabric moisture wicking', # technical attributes
]
# CLIP understands all of these without explicit training on these labels
""")

# ── Pattern 2: Document understanding with LLaVA ─────────────────────
print("PATTERN 2: DOCUMENT UNDERSTANDING")
print("""
# Razorpay: extract structured data from payment receipts
# No OCR pipeline needed — LLaVA reads the image directly

RECEIPT_PROMPT = '''
You are a payment receipt parser for Razorpay.
Extract these fields from the receipt image as JSON:
{
  "merchant_name": string,
  "amount": number,
  "currency": "INR" or other,
  "transaction_id": string,
  "date": "YYYY-MM-DD",
  "payment_method": "UPI" or "card" or "netbanking" or other,
  "status": "success" or "failed" or "pending"
}
If a field is not visible, use null.
Respond with JSON only, no explanation.
'''

def parse_receipt(image_path, model, processor) -> dict:
    image = Image.open(image_path).convert('RGB')
    conversation = [
        {'role': 'user', 'content': [
            {'type': 'image'},
            {'type': 'text', 'text': RECEIPT_PROMPT},
        ]},
    ]
    prompt = processor.apply_chat_template(conversation, add_generation_prompt=True)
    inputs = processor(images=image, text=prompt, return_tensors='pt').to(model.device)

    with torch.no_grad():
        output = model.generate(**inputs, max_new_tokens=200,
                                 temperature=0.0, do_sample=False)
    raw = processor.decode(output[0][inputs['input_ids'].shape[1]:],
                            skip_special_tokens=True)
    import json, re
    match = re.search(r'\\{.*\\}', raw, re.DOTALL)
    return json.loads(match.group()) if match else {}
""")

# ── Pattern 3: Quality control classifier ────────────────────────────
print("PATTERN 3: PRODUCT PHOTO QUALITY CONTROL")
print("""
# Meesho: auto-reject product listings with poor quality photos

QUALITY_CRITERIA = [
    'a high quality professional product photo on white background',
    'a blurry or out of focus product image',
    'a product photo with cluttered or messy background',
    'a product worn by a person in a lifestyle photo',
    'a product photo with watermark or logo overlay',
    'a very dark or underexposed product photo',
]

def check_photo_quality(image_path, model, processor) -> dict:
    image  = Image.open(image_path).convert('RGB')
    inputs = processor(text=QUALITY_CRITERIA, images=image,
                        return_tensors='pt', padding=True)
    with torch.no_grad():
        logits = model(**inputs).logits_per_image
        probs  = logits.softmax(dim=1)[0]

    best_idx = probs.argmax().item()
    return {
        'best_match':  QUALITY_CRITERIA[best_idx],
        'confidence':  probs[best_idx].item(),
        'approved':    best_idx == 0,   # only approve if best match is high quality
        'all_scores':  dict(zip(QUALITY_CRITERIA, probs.tolist())),
    }
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — MODEL COMPARISON ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Choosing the right model</span>
        <h2 style={S.h2}>CLIP vs LLaVA vs GPT-4V vs Gemini Vision — which to use</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              model: 'CLIP (ViT-B/32 or ViT-L/14)',
              type: 'Embedding model',
              color: '#378ADD',
              params: '150M–428M',
              output: 'Embeddings + similarity scores only',
              use: 'Image search, zero-shot classification, visual deduplication, embedding index. Cannot generate text.',
              latency: '~5ms per image (GPU)',
              cost: 'Free — self-hosted',
              when: 'High-volume retrieval, classification with fixed categories, any embedding use case.',
            },
            {
              model: 'LLaVA-1.6 (7B or 34B)',
              type: 'Open VQA model',
              color: '#7b61ff',
              params: '7B–34B',
              output: 'Free-form text generation about images',
              use: 'Document parsing, product description generation, open-ended visual QA, image captioning.',
              latency: '1–5s per image (GPU)',
              cost: 'Free — self-hosted on GPU',
              when: 'Need text generation from images. Privacy-sensitive (on-premise). Cost-sensitive at scale.',
            },
            {
              model: 'GPT-4o Vision',
              type: 'Proprietary API',
              color: '#1D9E75',
              params: 'Unknown (est. >100B)',
              output: 'Best-in-class visual reasoning',
              use: 'Complex visual reasoning, charts, diagrams, medical images, multi-image comparison.',
              latency: '3–10s per image (API)',
              cost: '$0.01–0.03 per image',
              when: 'Highest accuracy required. Low volume. Complex reasoning tasks LLaVA cannot handle.',
            },
            {
              model: 'Gemini 1.5 Flash Vision',
              type: 'Proprietary API',
              color: '#D85A30',
              params: 'Unknown',
              output: 'Long context vision + fast',
              use: 'Long documents with many images, video understanding, cost-effective GPT-4V alternative.',
              latency: '2–5s per image',
              cost: '$0.001–0.01 per image',
              when: 'Need GPT-4V quality at lower cost. Processing documents with many pages/images.',
            },
          ].map((item) => (
            <div key={item.model} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '12px 14px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)' }}>
                  {item.model}
                </span>
                <span style={{ fontSize: 10, color: item.color, background: `${item.color}15`, padding: '2px 7px', borderRadius: 3, fontFamily: 'var(--font-mono)' }}>
                  {item.type}
                </span>
                <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  {item.params}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 3 }}>USE FOR</div>
                  <p style={{ ...S.ps, marginBottom: 4, fontSize: 11 }}>{item.use}</p>
                  <div style={{ fontSize: 11, color: item.color, fontStyle: 'italic' }}>Best when: {item.when}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>
                    <strong style={{ color: item.color }}>Output:</strong> {item.output}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>
                    <strong style={{ color: item.color }}>Latency:</strong> {item.latency}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                    <strong style={{ color: item.color }}>Cost:</strong> {item.cost}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common multimodal mistake — explained and fixed</h2>

        <ErrorBlock
          error="CLIP zero-shot classification gives wrong results — all images score similar probabilities"
          cause="Text labels are not descriptive enough to distinguish categories. CLIP was trained on natural image captions, not short category names. Labels like 'kurta', 'saree', 'jeans' are too ambiguous — the model cannot distinguish them reliably because these single words appear in many different image contexts during pretraining. Also caused by mismatched preprocessing — if the processor is not applied correctly, image pixels are in the wrong range."
          fix="Write descriptive text templates: 'a photo of a kurta or kurti on a white background' instead of just 'kurta'. Use multiple text variants per category and average their embeddings — this reduces sensitivity to exact wording. Apply the CLIP processor correctly: always use CLIPProcessor.from_pretrained() which handles both image resizing (224×224 for ViT-B/32) and normalisation with CLIP-specific statistics (not ImageNet statistics). Test with clip_model.get_image_features() and clip_model.get_text_features() separately to verify both produce non-zero, normalised embeddings."
        />

        <ErrorBlock
          error="LLaVA generates confident wrong answers about image content — hallucination"
          cause="LLaVA inherits the hallucination tendency of its LLM backbone. It will generate fluent, confident text that does not correspond to the actual image content — particularly for fine-grained details like exact text, small numbers, or subtle differences between similar objects. This is a known limitation of all current VQA models, not a configuration error."
          fix="Ask LLaVA to express uncertainty: add 'If you cannot see something clearly, say so explicitly' to your prompt. For critical extraction (OCR, numbers, dates), use a dedicated OCR system alongside LLaVA rather than relying on LLaVA alone. Post-process by asking a second question: 'How confident are you in your previous answer? What might you have missed?' For production: always validate LLaVA outputs against business rules — if it extracts an amount, verify it matches expected ranges."
        />

        <ErrorBlock
          error="CLIP image embeddings are not similar for visually similar products — retrieval returns wrong results"
          cause="CLIP's ViT-B/32 was not trained on fashion or product images specifically — its representations are optimised for general natural image understanding, not fine-grained product similarity. Two similar kurtas in different colours may have more distant embeddings than a kurta and a completely different garment if they share visual texture patterns. Also caused by not L2-normalising embeddings before computing cosine similarity — dot product without normalisation measures magnitude not direction."
          fix="Always L2-normalise CLIP embeddings: emb = F.normalize(emb, dim=-1). Use ViT-L/14 instead of ViT-B/32 — the larger model has significantly better fine-grained representations. Fine-tune CLIP on your domain data with a small set of (positive, negative) product pairs using contrastive loss — even 1,000 annotated pairs dramatically improves fashion retrieval. Or use a fashion-specific model: FACAD or FashionCLIP trained specifically on product images."
        />

        <ErrorBlock
          error="LLaVA inference is too slow for production — 5+ seconds per image"
          cause="LLaVA-1.6 with a 7B LLM backbone processes 256 image patch tokens plus text tokens through all LLM layers — every additional image token adds LLM compute. Loading the model in fp32 doubles memory and halves throughput. Running one image at a time wastes GPU parallelism — the GPU is mostly idle between requests."
          fix="Load model in fp16: LlavaNextForConditionalGeneration.from_pretrained(model_id, torch_dtype=torch.float16). Batch multiple images in one forward pass if your use case allows latency tradeoff. Use LLaVA-1.5 with a 7B backbone (simpler architecture, 2× faster than 1.6 for most queries). For highest throughput: serve with vLLM which implements PagedAttention and continuous batching — achieves 3-5× throughput vs naive serving. For latency-critical paths: use CLIP for initial filtering and only run LLaVA on the filtered subset."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can build with multimodal models. Next: production RAG systems
          that go beyond the basics.
        </h2>

        <p style={S.p}>
          You now understand the full generative AI landscape — GANs, VAEs,
          diffusion models, LLMs, fine-tuning, and multimodal models.
          Module 67 returns to RAG with production techniques:
          reranking retrieved chunks for better precision, hybrid dense-sparse
          search that combines semantic and keyword retrieval, and evaluation
          frameworks that measure RAG quality systematically.
          These are the techniques that separate toy RAG demos from
          production systems that customers actually trust.
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
              Next — Module 67 · Generative AI
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Advanced RAG — Reranking, Hybrid Search and Evaluation
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Reranking retrieved chunks, hybrid dense-sparse search,
              and the patterns that separate production RAG from toy RAG.
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
          'CLIP trains two encoders — image (ViT) and text (Transformer) — to produce embeddings in a shared 512/768-dim space using contrastive loss on 400M (image, text) pairs. After training, cosine similarity between any image and text embedding measures their semantic relatedness. No task-specific training required — this is what enables zero-shot classification.',
          'CLIP contrastive (InfoNCE) loss: for a batch of N pairs, maximise similarity for the N correct (image, text) pairs and minimise similarity for the N²−N incorrect pairs. The loss is symmetric cross-entropy along both rows (image→text) and columns (text→image) of the N×N similarity matrix. Larger batches = more negatives = stronger learning signal.',
          'Always write descriptive text labels for CLIP, not just category names: "a photo of a red silk saree" outperforms "saree" significantly. Always L2-normalise embeddings before computing cosine similarity. Use ViT-L/14 over ViT-B/32 for better fine-grained product representations.',
          'LLaVA connects a CLIP vision encoder → 2-layer projection MLP → LLM backbone. The projection MLP is the only new component — it maps 256 patch tokens from CLIP (1024-dim) into the LLM embedding space (4096-dim). The LLM then generates text attending to both visual tokens and text tokens simultaneously.',
          'Production decision: CLIP for high-volume retrieval and classification (5ms, free, self-hosted), LLaVA-7B for text generation about images (1-5s, free, needs GPU), GPT-4o Vision for complex reasoning (3-10s, $0.01-0.03/image), Gemini Flash for cost-effective high-quality VQA. Never use a generative VQA model for pure retrieval — embeddings are orders of magnitude faster.',
          'Three key production patterns: multimodal search (CLIP embeddings + FAISS index, text or image queries against indexed product catalogue), document understanding (LLaVA extracts structured data from receipts, invoices, screenshots without OCR), quality control (CLIP zero-shot scores photos against quality criteria descriptions — no labelled examples needed).',
        ]}
      />
    </LearnLayout>
  )
}
