import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Fine-Tuning with PEFT — LoRA and Adapters — Chaduvuko',
  description:
    'Tune less than 1% of a model\'s parameters and get 95% of the performance. LoRA, adapters, and prefix tuning — when and how to use each.',
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

export default function PeftLoraAdaptersPage() {
  return (
    <LearnLayout
      title="Fine-Tuning with PEFT — LoRA and Adapters"
      description="Tune less than 1% of a model's parameters and get 95% of the performance. LoRA, adapters, and prefix tuning — when and how to use each."
      section="Natural Language Processing"
      readTime="36–46 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="nlp" topic="peft-lora-adapters" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — why PEFT exists</span>
        <h2 style={S.h2}>
          Full fine-tuning a 7B parameter model requires 28GB of GPU memory
          just to store the weights. LoRA fine-tunes the same model
          using 16MB of trainable parameters — on a single consumer GPU.
        </h2>

        <p style={S.p}>
          Module 50 showed full fine-tuning — update all 110M parameters
          of BERT for 3 epochs. That costs 4GB of GPU memory and 30 minutes.
          Acceptable for BERT. Completely impractical for LLaMA-3 (8B),
          Mistral (7B), or Falcon (40B). Full fine-tuning a 7B model
          requires storing the model weights (28GB in fp32),
          the gradients (another 28GB), and the optimiser states
          (56GB for Adam). Total: 112GB VRAM. No consumer GPU has that.
        </p>

        <p style={S.p}>
          PEFT (Parameter-Efficient Fine-Tuning) solves this by updating
          only a tiny fraction of the model's parameters while freezing
          the rest. LoRA — the most popular PEFT method — adds small
          low-rank matrices alongside the frozen weight matrices.
          Only the small matrices are trained. Total trainable parameters:
          typically 0.1–1% of the full model. GPU memory required:
          a fraction of full fine-tuning. Quality: 90–95% of full fine-tuning.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A senior engineer at Stripe knows everything about payments.
            You want to teach them your company's specific internal processes.
            You do not re-hire them and retrain them from scratch —
            you give them a small notebook of company-specific notes
            to carry alongside their existing expertise.
            LoRA is that notebook — small, lightweight, task-specific,
            sits alongside the frozen base model.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            At inference time: base model knowledge + LoRA notebook = specialised expert.
            You can swap notebooks — same base model, different LoRA adapters
            for different tasks. One GPU, many specialists.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          Install: <span style={S.code as React.CSSProperties}>pip install peft transformers accelerate bitsandbytes</span>.
          The PEFT library from HuggingFace handles LoRA, adapters, and prefix tuning
          with a unified API. Three lines of code convert any model to LoRA fine-tuning.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — HOW LORA WORKS ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The core idea</span>
        <h2 style={S.h2}>LoRA — Low-Rank Adaptation — the math in plain English</h2>

        <p style={S.p}>
          A weight matrix W in a Transformer has shape (d_out, d_in).
          For BERT's attention layers, d_in = d_out = 768.
          That is 768 × 768 = 589,824 parameters per matrix.
          LoRA's key insight: the change needed to adapt a pretrained model
          to a new task has low intrinsic rank — it lives in a much smaller
          subspace than the full matrix dimension.
        </p>

        <p style={S.p}>
          Instead of updating W directly, LoRA adds two small matrices:
          A of shape (r, d_in) and B of shape (d_out, r) where r is the
          rank — typically 4, 8, or 16. The effective weight update is
          B @ A — a rank-r matrix. Training only A and B requires
          r × (d_in + d_out) parameters instead of d_in × d_out.
          With r=8, d=768: 8 × 1536 = 12,288 parameters vs 589,824.
          That is a 48× reduction per matrix.
        </p>

        <ConceptBox title="LoRA forward pass — frozen W plus trainable low-rank update">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2 }}>
            <div style={{ color: '#888', marginBottom: 4 }}>Standard forward pass:</div>
            <div style={{ color: '#D85A30', paddingLeft: 16, marginBottom: 8 }}>
              h = W × x          ← W is frozen, 768×768 = 589k params
            </div>
            <div style={{ color: '#888', marginBottom: 4 }}>LoRA forward pass:</div>
            <div style={{ color: '#1D9E75', paddingLeft: 16, marginBottom: 4 }}>
              h = W × x + (B @ A) × x × (α/r)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>
              <div>W: frozen pretrained weight  (768 × 768) — never updated</div>
              <div>A: trainable, initialised with random normal  (r × 768)</div>
              <div>B: trainable, initialised with zeros  (768 × r)</div>
              <div>r: rank hyperparameter — typically 4, 8, or 16</div>
              <div>α: scaling factor — typically equal to r (so α/r = 1)</div>
              <div style={{ color: '#7b61ff', marginTop: 4 }}>
                B initialised to zeros → LoRA output is zero at start → identical to pretrained model
              </div>
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import torch
import torch.nn as nn
import numpy as np

# ── LoRA layer from scratch — see exactly what happens ────────────────
class LoRALinear(nn.Module):
    """
    Drop-in replacement for nn.Linear that adds LoRA adaptation.
    The original weight W is frozen. Only A and B are trained.
    """
    def __init__(self, linear: nn.Linear, rank: int = 8, alpha: float = 8.0):
        super().__init__()
        self.linear = linear
        self.rank   = rank
        self.alpha  = alpha
        self.scale  = alpha / rank

        d_out, d_in = linear.weight.shape

        # Freeze the original weight
        for param in self.linear.parameters():
            param.requires_grad = False

        # LoRA matrices — small and trainable
        self.lora_A = nn.Parameter(torch.randn(rank, d_in) * 0.02)
        self.lora_B = nn.Parameter(torch.zeros(d_out, rank))   # zeros → no change at start

    def forward(self, x):
        # Original frozen output
        base_out  = self.linear(x)
        # LoRA update: x @ A.T @ B.T * scale
        lora_out  = (x @ self.lora_A.T @ self.lora_B.T) * self.scale
        return base_out + lora_out

# ── Demonstrate parameter counts ──────────────────────────────────────
torch.manual_seed(42)
d_model = 768
original_linear = nn.Linear(d_model, d_model)

for rank in [4, 8, 16, 32]:
    lora_linear = LoRALinear(original_linear, rank=rank)

    total    = sum(p.numel() for p in lora_linear.parameters())
    trainable = sum(p.numel() for p in lora_linear.parameters() if p.requires_grad)
    frozen   = total - trainable
    pct      = trainable / total * 100

    print(f"rank={rank:2d}: total={total:,}  frozen={frozen:,}  "
          f"trainable={trainable:,}  ({pct:.2f}%)")

# ── Verify: LoRA output equals base at initialisation ─────────────────
lora = LoRALinear(original_linear, rank=8)
x    = torch.randn(4, d_model)

base_out = original_linear(x)
lora_out = lora(x)

diff = (base_out - lora_out).abs().max().item()
print(f"\nMax diff between base and LoRA at init: {diff:.2e}  ← should be ~0")
print("B is initialised to zeros → LoRA adds nothing at the start")
print("Training gradually moves A and B to add task-specific adjustments")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — PEFT LIBRARY ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Production implementation</span>
        <h2 style={S.h2}>HuggingFace PEFT library — LoRA in three lines of code</h2>

        <p style={S.p}>
          The PEFT library wraps any HuggingFace model with LoRA in three steps:
          define a LoraConfig, call get_peft_model(), done.
          PEFT automatically identifies which layers to apply LoRA to,
          freezes everything else, and gives you a model where only
          the LoRA matrices require gradients.
        </p>

        <CodeBlock code={`# pip install peft transformers accelerate

from peft import (
    LoraConfig, get_peft_model, TaskType,
    PeftModel, prepare_model_for_kbit_training,
)
from transformers import (
    AutoTokenizer, AutoModelForSequenceClassification,
    AutoModelForCausalLM, TrainingArguments, Trainer,
    DataCollatorWithPadding,
)
from datasets import Dataset
import evaluate
import numpy as np
import torch

# ── LoRA for sequence classification (BERT-style) ─────────────────────
MODEL_NAME = 'distilbert-base-uncased'
tokenizer  = AutoTokenizer.from_pretrained(MODEL_NAME)
base_model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_NAME, num_labels=3,
)

# ── Configure LoRA ────────────────────────────────────────────────────
lora_config = LoraConfig(
    task_type=TaskType.SEQ_CLS,  # sequence classification
    r=8,                          # rank — lower = fewer params, higher = more capacity
    lora_alpha=16,                # scaling = alpha/r = 2
    lora_dropout=0.1,             # dropout on LoRA layers
    target_modules=['q_lin', 'v_lin'],  # which layers to add LoRA to
    # For BERT: ['query', 'value']
    # For LLaMA: ['q_proj', 'v_proj', 'k_proj', 'o_proj']
    bias='none',                  # don't train biases
    inference_mode=False,
)

# ── Apply LoRA to model — three lines ─────────────────────────────────
peft_model = get_peft_model(base_model, lora_config)

# Print trainable parameters
peft_model.print_trainable_parameters()
# Output: trainable params: 296,451 || all params: 67,252,227 || trainable%: 0.44%

# ── Verify what is frozen and what is trainable ───────────────────────
print("\nLayer-by-layer trainability:")
for name, param in peft_model.named_parameters():
    if param.requires_grad:
        print(f"  TRAINABLE: {name:<60} {param.numel():>10,}")
    # Frozen layers are too many to print — just count them
frozen_count = sum(1 for p in peft_model.parameters() if not p.requires_grad)
print(f"  (+ {frozen_count} frozen parameter tensors)")

# ── Fine-tune with standard Trainer ───────────────────────────────────
LABELS   = ['positive', 'negative', 'neutral']
label2id = {l: i for i, l in enumerate(LABELS)}

reviews = [
    ("Excellent product quality, very happy", 0),
    ("Terrible, broke within a week", 1),
    ("Average product, nothing special", 2),
    ("Amazing value for money", 0),
    ("Worst purchase ever made", 1),
    ("Decent enough for the price", 2),
] * 40

def tokenise(examples):
    return tokenizer(examples['text'], max_length=64,
                     truncation=True, padding=False)

raw   = Dataset.from_dict({
    'text':  [r[0] for r in reviews],
    'label': [r[1] for r in reviews],
})
raw   = raw.train_test_split(test_size=0.2, seed=42)
tok   = raw.map(tokenise, batched=True, remove_columns=['text'])

acc_metric = evaluate.load('accuracy')
def compute_metrics(eval_pred):
    preds = np.argmax(eval_pred.predictions, axis=1)
    return acc_metric.compute(predictions=preds, references=eval_pred.label_ids)

args = TrainingArguments(
    output_dir='./lora-sentiment',
    num_train_epochs=3,
    per_device_train_batch_size=16,
    learning_rate=3e-4,   # LoRA can use higher lr than full fine-tuning
    warmup_ratio=0.1,
    evaluation_strategy='epoch',
    save_strategy='epoch',
    load_best_model_at_end=True,
    seed=42,
)

trainer = Trainer(
    model=peft_model, args=args,
    train_dataset=tok['train'],
    eval_dataset=tok['test'],
    tokenizer=tokenizer,
    data_collator=DataCollatorWithPadding(tokenizer),
    compute_metrics=compute_metrics,
)

print("\nFine-tuning with LoRA (0.44% of parameters):")
trainer.train()
results = trainer.evaluate()
print(f"Accuracy: {results['eval_accuracy']:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — LORA FOR LARGE MODELS ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The real use case — large language models</span>
        <h2 style={S.h2}>LoRA + quantisation — fine-tuning a 7B model on a single GPU</h2>

        <p style={S.p}>
          LoRA's main value is not for BERT (110M) — you can full fine-tune
          BERT easily. The value is for 7B, 13B, and 70B parameter models
          where full fine-tuning is impossible on consumer hardware.
          Combine LoRA with quantisation (4-bit or 8-bit weights via bitsandbytes)
          and you can fine-tune a 7B model on a 16GB GPU.
          This is QLoRA — Quantised LoRA.
        </p>

        <VisualBox label="Memory comparison — full fine-tuning vs LoRA vs QLoRA for 7B model">
          <div style={{ overflowX: 'auto' as const }}>
            <table style={{ borderCollapse: 'collapse' as const, width: '100%', fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Method', 'Model weights', 'Gradients', 'Optimiser', 'Total VRAM', 'GPU needed'].map(h => (
                    <th key={h} style={{
                      padding: '8px 12px', textAlign: 'left' as const,
                      fontSize: 10, fontWeight: 700, color: 'var(--muted)',
                      fontFamily: 'var(--font-mono)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Full fine-tune (fp32)', '28GB', '28GB', '56GB', '~112GB', 'A100 80GB ×2', '#ff4757'],
                  ['Full fine-tune (fp16)', '14GB', '14GB', '28GB', '~56GB', 'A100 80GB', '#D85A30'],
                  ['LoRA (fp16)', '14GB', '0.06GB', '0.12GB', '~16GB', 'A100 40GB', '#BA7517'],
                  ['QLoRA (4-bit)', '3.5GB', '0.06GB', '0.12GB', '~6GB', 'RTX 4090 / T4', '#1D9E75'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    {row.slice(0, 6).map((cell, j) => (
                      <td key={j} style={{
                        padding: '7px 12px',
                        color: j === 0 ? row[6] as string : j === 5 ? row[6] as string : 'var(--muted)',
                        fontFamily: j === 0 ? 'var(--font-mono)' : 'inherit',
                        fontSize: 12, fontWeight: j === 0 ? 600 : 400,
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 12, fontSize: 11 }}>
            Model size: 7B parameters. Gradients and optimiser states only for LoRA matrices (≈0.5% of params).
            QLoRA quantises frozen weights to 4-bit — 8× memory reduction vs fp32.
          </p>
        </VisualBox>

        <CodeBlock code={`# QLoRA — Fine-tuning a 7B model on a single GPU
# pip install peft transformers accelerate bitsandbytes

from transformers import (
    AutoTokenizer, AutoModelForCausalLM,
    BitsAndBytesConfig, TrainingArguments,
)
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
import torch

# ── Step 1: Load model in 4-bit quantisation (QLoRA) ─────────────────
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type='nf4',         # NormalFloat4 — best quality 4-bit
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,    # nested quantisation for extra savings
)

# In production — use a real model:
# model_id = 'meta-llama/Llama-3-8b-hf'  # requires HuggingFace access token
# model_id = 'mistralai/Mistral-7B-v0.3'
# model_id = 'google/gemma-7b'
model_id = 'facebook/opt-125m'   # small model for demonstration

tokenizer = AutoTokenizer.from_pretrained(model_id)
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token

model = AutoModelForCausalLM.from_pretrained(
    model_id,
    quantization_config=bnb_config,    # 4-bit quantisation
    device_map='auto',                  # distribute across available GPUs
)

# ── Step 2: Prepare for training ──────────────────────────────────────
# Must call this before adding LoRA — handles gradient checkpointing
model = prepare_model_for_kbit_training(model)

# ── Step 3: Add LoRA ──────────────────────────────────────────────────
lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    # Target the attention projection layers
    # For LLaMA/Mistral: ['q_proj', 'v_proj', 'k_proj', 'o_proj', 'gate_proj']
    # For OPT: ['q_proj', 'v_proj']
    target_modules=['q_proj', 'v_proj'],
    lora_dropout=0.05,
    bias='none',
    task_type='CAUSAL_LM',
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()

# ── Step 4: Training with gradient checkpointing ──────────────────────
# Gradient checkpointing trades compute for memory —
# recomputes activations during backward instead of storing them
model.gradient_checkpointing_enable()

training_args = TrainingArguments(
    output_dir='./qlora-output',
    num_train_epochs=1,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,    # effective batch = 4 × 4 = 16
    learning_rate=2e-4,               # QLoRA uses higher lr
    fp16=True,
    logging_steps=10,
    optim='paged_adamw_32bit',        # paged optimizer saves memory
    lr_scheduler_type='cosine',
    warmup_ratio=0.03,
    save_strategy='epoch',
)

print("QLoRA configuration:")
print(f"  Rank (r):          {lora_config.r}")
print(f"  Alpha:             {lora_config.lora_alpha}")
print(f"  Target modules:    {lora_config.target_modules}")
print(f"  Quantisation:      4-bit NF4")
print(f"  Effective batch:   {training_args.per_device_train_batch_size * training_args.gradient_accumulation_steps}")

# ── Step 5: Save and load LoRA adapter separately ─────────────────────
# The adapter is tiny — only the LoRA matrices (a few MB)
# model.save_pretrained('./my-lora-adapter')
# tokenizer.save_pretrained('./my-lora-adapter')

# Load later:
# base_model = AutoModelForCausalLM.from_pretrained(model_id, ...)
# model = PeftModel.from_pretrained(base_model, './my-lora-adapter')`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — OTHER PEFT METHODS ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Beyond LoRA</span>
        <h2 style={S.h2}>Adapters, prefix tuning, and prompt tuning — when each is appropriate</h2>

        <p style={S.p}>
          LoRA is the most popular PEFT method but not the only one.
          Three other methods are widely used in production,
          each with different trade-offs between parameter count,
          training stability, and inference overhead.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              name: 'LoRA',
              color: '#7b61ff',
              how: 'Low-rank matrices added alongside frozen attention weights. Merged into weights at inference — zero latency overhead.',
              params: '0.1–1% of model',
              inference: 'Zero overhead (weights merged)',
              best: 'Default choice. Best quality-to-params ratio. Works for all model types.',
              limitation: 'Requires access to model weights.',
            },
            {
              name: 'Adapters',
              color: '#1D9E75',
              how: 'Small bottleneck MLP inserted between Transformer layers. Frozen base, only adapters train. Original method from Houlsby et al. 2019.',
              params: '1–5% of model',
              inference: 'Small latency overhead (extra layers)',
              best: 'When you need to swap task adapters frequently at inference time without reloading the model.',
              limitation: 'Adds latency. Slightly more params than LoRA.',
            },
            {
              name: 'Prefix Tuning',
              color: '#D85A30',
              how: 'Prepend trainable virtual tokens (prefix) to the key and value in every attention layer. Only the prefix vectors are trained.',
              params: '0.1% of model',
              inference: 'Small overhead (longer key/value sequences)',
              best: 'Generation tasks where you want to condition the model on a task without changing weights at all.',
              limitation: 'Less stable training than LoRA. Sensitive to prefix length.',
            },
            {
              name: 'Prompt Tuning',
              color: '#BA7517',
              how: 'Prepend trainable soft tokens to the INPUT only (not every layer). Simplest PEFT method — only a few thousand parameters.',
              params: '<0.01% of model',
              inference: 'Minimal — slightly longer input',
              best: 'Very large models (10B+) where even LoRA is expensive. Competitive with full fine-tuning at 10B+ scale.',
              limitation: 'Underperforms LoRA on smaller models. Slower to converge.',
            },
          ].map((item) => (
            <div key={item.name} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '12px 14px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)' }}>
                  {item.name}
                </span>
                <span style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)', background: `${item.color}15`, padding: '2px 7px', borderRadius: 3 }}>
                  {item.params}
                </span>
                <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  inference: {item.inference}
                </span>
              </div>
              <p style={{ ...S.ps, marginBottom: 4 }}>{item.how}</p>
              <div style={{ fontSize: 11, color: item.color }}>✓ {item.best}</div>
              <div style={{ fontSize: 11, color: '#ff4757', marginTop: 3 }}>✗ {item.limitation}</div>
            </div>
          ))}
        </div>

        <CodeBlock code={`from peft import (
    LoraConfig, PromptTuningConfig, PrefixTuningConfig,
    get_peft_model, TaskType, PromptTuningInit,
)
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import torch

# ── Compare PEFT methods on the same model ────────────────────────────
model_id  = 'facebook/bart-base'   # seq2seq for demonstration
tokenizer = AutoTokenizer.from_pretrained(model_id)

def count_params(model):
    total     = sum(p.numel() for p in model.parameters())
    trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
    return total, trainable

# ── LoRA ──────────────────────────────────────────────────────────────
from transformers import AutoModelForSeq2SeqLM
base = AutoModelForSeq2SeqLM.from_pretrained(model_id)
lora_cfg = LoraConfig(
    task_type=TaskType.SEQ_2_SEQ_LM,
    r=8, lora_alpha=16, lora_dropout=0.05,
    target_modules=['q_proj', 'v_proj'],
    bias='none',
)
lora_model = get_peft_model(base, lora_cfg)
t, tr = count_params(lora_model)
print(f"LoRA:          {tr:>10,} / {t:>10,}  ({tr/t*100:.3f}%)")

# ── Prefix Tuning ─────────────────────────────────────────────────────
base2 = AutoModelForSeq2SeqLM.from_pretrained(model_id)
prefix_cfg = PrefixTuningConfig(
    task_type=TaskType.SEQ_2_SEQ_LM,
    num_virtual_tokens=20,        # 20 trainable prefix tokens
    encoder_hidden_size=768,
)
prefix_model = get_peft_model(base2, prefix_cfg)
t2, tr2 = count_params(prefix_model)
print(f"Prefix tuning: {tr2:>10,} / {t2:>10,}  ({tr2/t2*100:.3f}%)")

# ── Prompt Tuning ─────────────────────────────────────────────────────
base3 = AutoModelForSeq2SeqLM.from_pretrained(model_id)
prompt_cfg = PromptTuningConfig(
    task_type=TaskType.SEQ_2_SEQ_LM,
    num_virtual_tokens=8,
    prompt_tuning_init=PromptTuningInit.TEXT,
    prompt_tuning_init_text="Summarise the following payment dispute: ",
    tokenizer_name_or_path=model_id,
)
prompt_model = get_peft_model(base3, prompt_cfg)
t3, tr3 = count_params(prompt_model)
print(f"Prompt tuning: {tr3:>10,} / {t3:>10,}  ({tr3/t3*100:.3f}%)")

print(f"\nGuideline:")
print(f"  Use LoRA for most tasks — best quality per parameter")
print(f"  Use prefix tuning for generation with frequent task switching")
print(f"  Use prompt tuning only for very large models (10B+)")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — MERGING AND SERVING ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Deploying LoRA models</span>
        <h2 style={S.h2}>Merging LoRA weights — zero inference overhead in production</h2>

        <p style={S.p}>
          During training, LoRA runs a separate forward pass through B @ A
          and adds it to the frozen W output. At inference this adds latency.
          LoRA can be merged: the weight update B @ A is computed once
          and added directly to W — producing a standard model with no extra
          computation. Merged model = full fine-tuned quality at full fine-tuned speed.
          The LoRA matrices can be discarded after merging.
        </p>

        <CodeBlock code={`from peft import PeftModel, LoraConfig, get_peft_model, TaskType
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# ── Simulate: train LoRA then merge for production ────────────────────
MODEL_NAME = 'distilbert-base-uncased'
tokenizer  = AutoTokenizer.from_pretrained(MODEL_NAME)

# 1. Create LoRA model
base_model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_NAME, num_labels=3,
)
lora_config = LoraConfig(
    task_type=TaskType.SEQ_CLS,
    r=8, lora_alpha=16, lora_dropout=0.0,
    target_modules=['q_lin', 'v_lin'],
    bias='none',
)
lora_model = get_peft_model(base_model, lora_config)

# 2. [Training happens here]
# trainer.train()

# 3. Save LoRA adapter (tiny — just A and B matrices)
lora_model.save_pretrained('./my-lora-adapter')
tokenizer.save_pretrained('./my-lora-adapter')

adapter_size = sum(
    p.numel() * 4  # bytes for float32
    for p in lora_model.parameters()
    if p.requires_grad
) / 1024 / 1024
print(f"LoRA adapter size: ~{adapter_size:.1f} MB")

# 4. Merge LoRA into base model — zero inference overhead
merged_model = lora_model.merge_and_unload()
# Now merged_model is a standard nn.Module — no PEFT overhead
# Same weights as if you had done full fine-tuning

print(f"\nAfter merging:")
print(f"  Type:     {type(merged_model).__name__}  ← standard model, no PEFT overhead")
trainable = sum(p.numel() for p in merged_model.parameters() if p.requires_grad)
total     = sum(p.numel() for p in merged_model.parameters())
print(f"  Params:   {total:,} total, {trainable:,} trainable")

# 5. Save merged model
merged_model.save_pretrained('./merged-model')
tokenizer.save_pretrained('./merged-model')

# 6. Load and serve — identical to a standard fine-tuned model
loaded = AutoModelForSequenceClassification.from_pretrained('./merged-model')
loaded.eval()

test_input = tokenizer("Payment declined please help",
                        return_tensors='pt', max_length=64, truncation=True)
with torch.no_grad():
    logits = loaded(**test_input).logits
print(f"\nInference works identically after merge: {logits.shape}")

# ── Serving multiple tasks from one base model ─────────────────────────
print("""
# Production pattern: one base model, multiple LoRA adapters
# Load base once, swap adapters per request

from peft import PeftModel

base = AutoModelForCausalLM.from_pretrained('mistralai/Mistral-7B-v0.3', ...)

# Task 1: customer support
support_model = PeftModel.from_pretrained(base, './lora-support-adapter')

# Task 2: code generation
code_model = PeftModel.from_pretrained(base, './lora-code-adapter')

# Task 3: SQL generation
sql_model = PeftModel.from_pretrained(base, './lora-sql-adapter')

# One GPU, three specialists — much cheaper than three separate 7B models
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common PEFT mistake — explained and fixed</h2>

        <ErrorBlock
          error="ValueError: Target modules not found in model — lora_config target_modules has no match"
          cause="The target_modules names in LoraConfig do not match the actual layer names in your model. Every model family uses different naming: BERT uses 'query', 'value'. DistilBERT uses 'q_lin', 'v_lin'. LLaMA uses 'q_proj', 'v_proj'. Mistral uses 'q_proj', 'v_proj', 'k_proj'. GPT-2 uses 'c_attn'. Using the wrong names means no layers get LoRA applied and PEFT raises this error."
          fix="Print all model layer names first: [name for name, _ in model.named_modules()]. Find the attention projection layers — they typically contain 'query', 'key', 'value', 'q_proj', 'v_proj' or similar. Use those exact strings in target_modules. Alternatively pass target_modules='all-linear' to target all linear layers automatically — less efficient but always works."
        />

        <ErrorBlock
          error="LoRA training loss is NaN from the first step"
          cause="Learning rate is too high for LoRA. LoRA adapters start at zero — all gradient signal flows through tiny near-zero matrices. A large learning rate causes the LoRA matrices to explode immediately. Also caused by fp16 overflow when gradient norms are large — the small LoRA matrices amplify gradient magnitudes relative to their scale."
          fix="Use lr=1e-4 to 3e-4 for LoRA (higher than full fine-tuning at 2e-5 but lower than you might expect). Add max_grad_norm=0.3 in TrainingArguments to clip gradients. If using fp16, ensure the base model is loaded in fp16 and use optim='paged_adamw_32bit' — the 32-bit Adam states prevent overflow. Use warmup_ratio=0.05 to start from near-zero lr."
        />

        <ErrorBlock
          error="PEFT model accuracy is much lower than full fine-tuning on the same task"
          cause="LoRA rank is too low for the task complexity, or the wrong layers are targeted. Very low rank (r=2, r=4) has very few parameters and limited capacity. Only targeting q and v projections misses important weights — for complex tasks adding k, o, and MLP layers helps significantly. Also: LoRA alpha scaling may be off."
          fix="Increase rank: try r=16 or r=32 for complex tasks. Add more target modules: for LLaMA use ['q_proj', 'v_proj', 'k_proj', 'o_proj', 'gate_proj', 'up_proj', 'down_proj'] to cover all projection and MLP layers. Set lora_alpha = 2 × r as a starting point. If accuracy is still low, consider full fine-tuning — PEFT is not always the right choice for small models."
        />

        <ErrorBlock
          error="RuntimeError: Expected all tensors on the same device after loading LoRA adapter"
          cause="The base model was loaded on one device (CPU or CUDA:0) but the LoRA adapter was loaded on a different device, or device_map='auto' split the model across GPUs in a way that conflicts with the adapter loading. Also happens when you call PeftModel.from_pretrained without specifying the device consistently."
          fix="Load both base model and adapter with the same device specification: base = AutoModelForCausalLM.from_pretrained(model_id, device_map='auto'); model = PeftModel.from_pretrained(base, adapter_path, device_map='auto'). Or load to CPU first and move: model = model.to('cuda'). After merging with merge_and_unload(), always explicitly move the merged model to the target device."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — MISCONCEPTIONS ═════════════════════════════════════════ */}
      <div style={S.sec} data-toc-kind="myth">
        <span style={S.tag}>Misconceptions</span>
        <h2 style={S.h2}>Five things people get wrong about LoRA and PEFT</h2>

        <ConceptBox title="Myth: LoRA is a compressed approximation of the full fine-tuning update" color="#ff4757">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            This suggests LoRA first computes (or could compute) the full-rank weight update and
            then squeezes it down to rank r — like a JPEG of a photo. That is backwards. LoRA never
            computes a full-rank update at all; it constrains the trainable update to be low-rank
            from the very first gradient step, based on the empirical observation (from the original
            LoRA paper) that the useful update for adapting a pretrained model to a new task tends
            to live in a low-dimensional subspace. There is nothing to compress because the full-rank
            version is never formed. If the task genuinely needs a high-rank update, LoRA at low r
            will underfit — not "lose information" the way compression does.
          </p>
        </ConceptBox>

        <ConceptBox title="Myth: a higher rank r always gives better fine-tuning quality" color="#ff4757">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            Rank controls capacity, and more capacity sounds like it should always help — but in
            practice most tasks saturate well before r=64, and pushing rank higher mostly adds
            trainable parameters and compute without a measurable accuracy gain, since the intrinsic
            rank of the needed update is a property of the task, not something you can buy more of.
            Past that saturation point, a larger r increases the risk of overfitting on small
            fine-tuning datasets and slows training for no return. The right instinct is to sweep
            r across 4, 8, 16, and 32 on a validation set for your specific task, not to default to
            the largest rank you can afford.
          </p>
        </ConceptBox>

        <ConceptBox title="Myth: LoRA adapters permanently add extra latency at inference, because they are 'extra layers'" color="#ff4757">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            During training this is true — the forward pass runs W×x and B@A×x as two separate
            operations and adds them. But LoRA's defining trick is that B@A is just a matrix, the
            same shape as W, so it can be added directly into W once training is done:
            W_merged = W + (α/r)·B@A. After merge_and_unload(), the model has exactly the same
            architecture and the same number of weight matrices as the original — no adapter, no
            extra addition, no latency overhead at all. The "extra layer" framing only applies to a
            few other PEFT methods (adapters, prefix tuning) that genuinely cannot be merged away
            because they change the computation graph, not just the weights.
          </p>
        </ConceptBox>

        <ConceptBox title="Myth: LoRA gets you full fine-tuning quality on any task, so full fine-tuning is now obsolete" color="#ff4757">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            LoRA reliably reaches 90–95% of full fine-tuning quality for tasks that adapt the model's
            style, format, or narrow behaviour — the update genuinely is low-rank there. It is a
            worse fit when the task requires injecting large amounts of new factual knowledge or
            substantially shifting the model's underlying capabilities (e.g. teaching a language
            model an entirely new language it saw little of in pretraining) — that kind of change
            often needs a higher-rank, more expressive update than LoRA can efficiently represent.
            Full fine-tuning, continued pretraining, or RAG-for-knowledge remain the better tool in
            those cases; LoRA did not replace them, it expanded the set of tasks where you no longer
            need them.
          </p>
        </ConceptBox>

        <ConceptBox title="Myth: you can freely stack or sum multiple trained LoRA adapters to get a multi-task model" color="#ff4757">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            Because each adapter is "just" a small B@A matrix, it is tempting to assume adding two of
            them (or averaging their weights) gives you a model that is good at both tasks at once.
            In practice, adapters trained independently occupy overlapping but different subspaces of
            the weight space, and naively summing them causes destructive interference — the merged
            behaviour is often worse at both tasks than either adapter alone. Serving multiple
            tasks from one base model safely means keeping adapters separate and swapping which one
            is active per request (exactly the pattern PeftModel.from_pretrained shown earlier
            supports), or using purpose-built multi-adapter composition methods, not ad hoc addition.
          </p>
        </ConceptBox>
      </div>

      <Div />

      {/* ══ SECTION 9 — INTERVIEW PREP ═════════════════════════════════════════ */}
      <div style={S.sec} data-toc-kind="prep">
        <span style={S.tag}>Interview prep</span>
        <h2 style={S.h2}>PEFT and LoRA — 5 questions interviewers actually ask</h2>

        <ConceptBox title="Q1 — Why does LoRA work? What is the 'low intrinsic rank' hypothesis?">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            The hypothesis, backed empirically by the original LoRA paper (and earlier work on
            intrinsic dimensionality of fine-tuning), is that the change a pretrained model needs
            to specialise for a downstream task lives in a much lower-dimensional subspace than the
            full weight matrix it is applied to — even though the base weight itself is high-rank and
            uses its full capacity to encode broad pretraining knowledge. Concretely: adapting a
            768×768 attention matrix to a new task does not require exploring all 589,824 independent
            directions of change; a rank-8 or rank-16 subspace captures nearly all of the useful
            signal. LoRA exploits this directly by parameterising the update as B@A with rank r,
            training only 2×r×d parameters instead of d², and getting comparable task performance
            because it was never necessary to search the full-rank space in the first place.
          </p>
        </ConceptBox>

        <ConceptBox title="Q2 — What do rank (r) and alpha actually control, and how do you choose values for them?">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            Rank r sets the dimensionality of the low-rank update — it is the actual capacity knob:
            higher r means more trainable parameters and a richer space of representable updates, at
            the cost of more compute and overfitting risk on small datasets. Alpha is a separate
            scaling factor applied to the LoRA output as α/r, controlling how strongly the update
            perturbs the frozen base weights relative to its own magnitude — it does not add capacity,
            it tunes how aggressively that capacity is expressed. In practice most teams do not tune
            them independently: a common heuristic is alpha = 2×r (so the effective scale stays
            roughly constant as rank changes), then sweep r itself — typically 8 or 16 for
            classification-style tasks and up to 32-64 for more complex generation tasks — against a
            validation metric.
          </p>
        </ConceptBox>

        <ConceptBox title="Q3 — LoRA vs full fine-tuning vs prompt tuning: how do you decide which to use?">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            The decision axis is how much you need to change the model versus how much compute and
            data you have. Full fine-tuning updates every weight — highest ceiling on quality and the
            only real option when the task requires deep, broad changes to the model's behaviour or
            knowledge, but it needs the most GPU memory (model + gradients + optimiser states for
            every parameter) and the most labelled data to avoid overfitting all those parameters.
            LoRA sits in the middle: 90-95% of full fine-tuning quality at a fraction of the memory,
            because it exploits the low-rank structure of most task adaptations, and it is the
            default choice for the vast majority of production fine-tuning today. Prompt tuning goes
            further — training only a handful of soft input tokens with no per-layer weight changes
            at all — which underperforms LoRA at small-to-medium model scale but becomes surprisingly
            competitive at 10B+ parameters, where the frozen base model is already so capable that a
            small nudge to its input is enough to steer behaviour.
          </p>
        </ConceptBox>

        <ConceptBox title="Q4 — Why can LoRA weights be merged back into the base weights for zero inference overhead? Walk through the math.">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            The forward pass during training is h = W×x + (α/r)·(B@A)×x, where W is frozen and A, B
            are the only trainable matrices. Because matrix multiplication distributes over addition,
            this is algebraically identical to h = (W + (α/r)·B@A)×x — a single matrix, the same
            shape as W, multiplied once against x. So after training finishes, you compute
            W_merged = W + (α/r)·B@A exactly once, write it back in place of W, and discard A and B
            entirely. The resulting model has the identical architecture, weight shapes, and forward
            pass as a model that was fully fine-tuned from scratch — there is no separate adapter
            branch left to execute, so inference cost is exactly the same as the unmodified base
            model. This only works for LoRA (and similar linear reparameterisations) specifically
            because the adaptation is additive and linear in x; adapters and prefix tuning change the
            computation graph itself and cannot be collapsed this way.
          </p>
        </ConceptBox>

        <ConceptBox title="Q5 — How does QLoRA make it possible to fine-tune a 7B model on a single consumer GPU, and what's the catch?">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            QLoRA combines LoRA with 4-bit quantisation of the frozen base model weights (NF4 —
            NormalFloat4 — plus double quantisation of the quantisation constants themselves), which
            shrinks a 7B model's weight storage from roughly 14-28GB down to about 3.5GB. Because
            only the small LoRA matrices are trained, gradients and optimiser states are computed and
            stored only for those — a fraction of a percent of total parameters — so the two most
            memory-hungry pieces of full fine-tuning (per-parameter gradients and per-parameter Adam
            state) barely register. The catch is that 4-bit quantisation is inherently lossy: it
            introduces small numerical errors into every frozen weight, which in principle could hurt
            output quality. In practice, the QLoRA paper showed this loss is largely absorbed because
            the LoRA adapter is trained on top of the quantised weights and learns to compensate —
            but it does mean QLoRA models can be marginally less precise on tasks sensitive to exact
            numerical behaviour, and it adds a dequantisation cost at inference unless you also merge
            and requantise afterward.
          </p>
        </ConceptBox>
      </div>

      <Div />

      {/* ══ SECTION 10 — WHAT'S NEXT ═══════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can fine-tune any model efficiently. Next: give any LLM
          access to your own documents.
        </h2>

        <p style={S.p}>
          Fine-tuning teaches a model new behaviour patterns from labelled data.
          But what if you want the model to answer questions about documents
          it has never seen — your company's internal knowledge base,
          a legal corpus, a product catalogue? Fine-tuning cannot help here —
          the model still cannot access documents not in its weights.
          Retrieval-Augmented Generation (RAG) solves this by combining
          a retriever (find relevant documents from a vector database)
          with a generator (produce an answer grounded in those documents).
          Module 52 builds a complete RAG pipeline for a Stripe knowledge base.
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
              Next — Module 52 · NLP
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              RAG — Retrieval-Augmented Generation
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Vector databases, semantic search, chunking strategies,
              and the full RAG pipeline from document to answer.
            </p>
          </div>
          <Link href="/learn/ai-ml/nlp/rag-retrieval-augmented-generation" style={{
            fontSize: 12, color: '#7b61ff', fontWeight: 700,
            border: '1px solid #7b61ff',
            padding: '7px 14px', borderRadius: 6,
            fontFamily: 'var(--font-mono)', textDecoration: 'none', whiteSpace: 'nowrap',
          }}>
            Start →
          </Link>
        </div>
      </div>

      <KeyTakeaways
        items={[
          'Full fine-tuning a 7B model requires 112GB VRAM. LoRA fine-tunes the same model with 0.1–1% of parameters — fitting on a single 16GB GPU. The trade-off: 90–95% of full fine-tuning quality at 1% of the cost.',
          'LoRA adds two small matrices A (r × d_in) and B (d_out × r) alongside each frozen weight matrix W. The effective update is B @ A — a rank-r approximation of the full weight change. B is initialised to zeros so LoRA starts identical to the pretrained model and gradually diverges.',
          'QLoRA combines LoRA with 4-bit quantisation (bitsandbytes NF4) — the frozen base model weights are stored in 4-bit, reducing a 7B model from 28GB to 3.5GB. Only the LoRA matrices are stored in fp16. This enables 7B fine-tuning on a single consumer GPU.',
          'PEFT library workflow: LoraConfig → get_peft_model(base_model, config) → standard Trainer. Three lines to convert any HuggingFace model to LoRA. Always call model.print_trainable_parameters() to verify the right layers are being trained.',
          'Target modules must match your model family exactly: BERT → ["query","value"], DistilBERT → ["q_lin","v_lin"], LLaMA → ["q_proj","v_proj","k_proj","o_proj"], GPT-2 → ["c_attn"]. Use target_modules="all-linear" as a safe fallback when unsure.',
          'Merge LoRA weights before production deployment: model.merge_and_unload() adds B @ A directly into W and discards the LoRA matrices. The merged model runs at full speed with no PEFT overhead — indistinguishable from a fully fine-tuned model at inference time.',
        ]}
      />
    </LearnLayout>
  )
}