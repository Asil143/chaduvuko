import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'LLM Fine-Tuning in Practice — Chaduvuko',
  description:
    'When to fine-tune vs RAG vs prompt. Full LoRA fine-tuning walkthrough on a real dataset using HuggingFace Transformers and PEFT.',
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

export default function LLMFineTuningPage() {
  return (
    <LearnLayout
      title="LLM Fine-Tuning in Practice"
      description="When to fine-tune vs RAG vs prompt. Full LoRA fine-tuning walkthrough on a real dataset using HuggingFace Transformers and PEFT."
      section="Generative AI"
      readTime="55–60 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="generative-ai" topic="llm-fine-tuning" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — the decision you must make first</span>
        <h2 style={S.h2}>
          Fine-tuning is not always the answer. Most production LLM applications
          are better served by prompt engineering or RAG. Fine-tune only when
          you have labelled data, a specific behaviour to change, and evidence
          that prompting cannot get you there.
        </h2>

        <p style={S.p}>
          This is the question every ML engineer at an Indian startup faces
          when building an LLM-powered feature: should we fine-tune a model
          or can we get there with prompting and retrieval? Fine-tuning is
          expensive — data collection, training compute, evaluation, deployment —
          and it is irreversible. A fine-tuned model that learned the wrong
          behaviour is worse than a base model.
        </p>

        <p style={S.p}>
          The answer depends on what you are trying to change.
          If the base model already knows how to do the task but needs
          domain-specific facts — use RAG. If it knows how to do the task
          but needs a specific output format or tone — use prompting.
          If it genuinely cannot do the task reliably even with perfect prompts
          and all context in window — then fine-tune.
          The bar for fine-tuning should be high.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Hiring an expert consultant vs training a new employee.
            A consultant (prompting) is fast, flexible, and immediately available —
            give them the context they need and they will do good work.
            A trained employee (fine-tuned model) internalises your company's
            way of doing things, does not need context each time, is faster
            at inference, but costs significant upfront investment.
            You hire a consultant first, hire full-time only when the work
            is consistent, high-volume, and the consultant approach is insufficient.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            Razorpay's payment dispute classifier: prompting GPT-4 worked at 80%
            accuracy. Fine-tuned LLaMA-3-8B reached 94% at 10× lower cost per query.
            The volume justified the training investment. Volume and consistency
            are the two conditions that make fine-tuning worth it.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          All code in this module uses HuggingFace Transformers, PEFT, and TRL —
          the standard open-source stack used by ML teams across India.
          Install: <span style={S.code as React.CSSProperties}>pip install transformers peft trl accelerate bitsandbytes datasets</span>.
          A free Google Colab T4 GPU (16GB) is enough to fine-tune a 7B model with QLoRA.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — DECISION FRAMEWORK ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The decision</span>
        <h2 style={S.h2}>Prompt vs RAG vs fine-tune — a decision framework with real examples</h2>

        <VisualBox label="When to use each approach — decision criteria">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                approach: 'Prompt Engineering',
                color: '#1D9E75',
                when: 'Task is well within LLM capability. Output format can be specified. Context fits in window. Volume is low or cost is not critical.',
                when_not: 'Response is inconsistent across runs. Specific terminology or style must be enforced. Task requires knowledge the LLM does not have.',
                example: 'Razorpay: summarise a support ticket into 3 bullet points. GPT-4 with a good prompt achieves 90%+ quality consistently.',
                cost: 'API cost per call. No upfront investment.',
                time: '1 day to get right prompt. Immediately usable.',
              },
              {
                approach: 'RAG',
                color: '#378ADD',
                when: 'Task requires specific facts, documents, or knowledge not in LLM training. Content changes frequently. Sources must be cited.',
                when_not: 'Task is about style/tone/format not knowledge. Data is too sensitive to store in vector DB. Latency budget is very tight.',
                example: 'Swiggy: answer questions about restaurant menus, hours, and offers. Menu data changes daily — RAG retrieves current data per query.',
                cost: 'Vector DB hosting + embedding API. Moderate ongoing cost.',
                time: '1–2 weeks to build pipeline. Data pipeline ongoing.',
              },
              {
                approach: 'LoRA Fine-Tuning',
                color: '#7b61ff',
                when: 'Specific output style or tone that prompting cannot reliably achieve. Domain-specific classification with labelled data. High-volume inference where API cost is prohibitive.',
                when_not: 'Insufficient labelled data (<500 examples). Task changes frequently — model becomes stale. No GPU for training.',
                example: 'Flipkart: classify product reviews into 12 specific dispute categories with exact label names matching their CRM. Needs consistent exact-match labels prompting cannot reliably produce.',
                cost: 'Training compute (one-time) + inference (self-hosted, cheap).',
                time: '2–4 weeks: data prep + training + evaluation + deployment.',
              },
              {
                approach: 'Full Fine-Tuning',
                color: '#D85A30',
                when: 'Fundamental capability change needed. Domain so specialised base model is nearly random (medical, legal, vernacular Indian languages). Building a foundation model.',
                when_not: 'Almost always — LoRA achieves 95% of full fine-tuning quality at 10% of cost. Only justified for foundational models.',
                example: 'AI4Bharat: fine-tuning LLaMA on 100B tokens of Hindi/Tamil/Telugu text to build IndicLLM — a genuine foundation model for Indian languages.',
                cost: 'Very high — multi-GPU cluster, weeks of training.',
                time: '2–6 months including infrastructure, training, and evaluation.',
              },
            ].map((item) => (
              <div key={item.approach} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 8, padding: '12px 14px',
                borderLeft: `4px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 8 }}>
                  {item.approach}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 6 }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 3 }}>USE WHEN</div>
                    <p style={{ ...S.ps, marginBottom: 0, fontSize: 11 }}>{item.when}</p>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#ff4757', fontFamily: 'var(--font-mono)', marginBottom: 3 }}>DO NOT USE WHEN</div>
                    <p style={{ ...S.ps, marginBottom: 0, fontSize: 11 }}>{item.when_not}</p>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: item.color, fontStyle: 'italic', marginBottom: 3 }}>
                  Example: {item.example}
                </div>
                <div style={{ display: 'flex', gap: 20 }}>
                  <span style={{ fontSize: 10, color: 'var(--muted)' }}>Cost: {item.cost}</span>
                  <span style={{ fontSize: 10, color: 'var(--muted)' }}>Time: {item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>
      </div>

      <Div />

      {/* ══ SECTION 3 — DATA PREPARATION ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most important step</span>
        <h2 style={S.h2}>Data preparation — the format that makes or breaks fine-tuning</h2>

        <p style={S.p}>
          The quality of fine-tuning data matters far more than the choice of
          model or hyperparameters. 500 high-quality, diverse examples consistently
          outperform 5,000 mediocre examples. Every example must follow the
          exact same chat template the base model was trained with.
          Mismatched templates are the most common silent failure —
          the model trains without error but produces garbage at inference.
        </p>

        <ConceptBox title="Chat templates — every model has its own format">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.9 }}>
            <div style={{ color: '#888', marginBottom: 8, fontSize: 11 }}>LLaMA-3 / Meta format:</div>
            <div style={{ color: '#1D9E75', paddingLeft: 12, marginBottom: 12 }}>
              {`<|begin_of_text|><|start_header_id|>system<|end_header_id|>\nYou are a helpful assistant.<|eot_id|>\n<|start_header_id|>user<|end_header_id|>\nHow does UPI work?<|eot_id|>\n<|start_header_id|>assistant<|end_header_id|>\n[response]<|eot_id|>`}
            </div>
            <div style={{ color: '#888', marginBottom: 8, fontSize: 11 }}>Mistral / Alpaca format:</div>
            <div style={{ color: '#7b61ff', paddingLeft: 12, marginBottom: 12 }}>
              {`[INST] <<SYS>>\nYou are a helpful assistant.\n<</SYS>>\nHow does UPI work? [/INST] [response] </s>`}
            </div>
            <div style={{ color: '#888', marginBottom: 8, fontSize: 11 }}>Phi-3 / ChatML format:</div>
            <div style={{ color: '#D85A30', paddingLeft: 12 }}>
              {`<|system|>\nYou are a helpful assistant.<|end|>\n<|user|>\nHow does UPI work?<|end|>\n<|assistant|>\n[response]<|end|>`}
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`from datasets import Dataset
from transformers import AutoTokenizer
import json

# ── Task: Razorpay payment dispute classifier ─────────────────────────
# 12 dispute categories used in their CRM system
DISPUTE_CATEGORIES = [
    'payment_failed_bank_error',
    'payment_failed_insufficient_funds',
    'payment_failed_technical',
    'duplicate_charge',
    'wrong_amount_charged',
    'refund_not_received',
    'refund_delayed',
    'subscription_cancelled_still_charged',
    'merchant_dispute',
    'fraud_unauthorised',
    'product_not_delivered',
    'other',
]

# ── Build training examples in chat format ────────────────────────────
SYSTEM_PROMPT = """You are a payment dispute classifier for Razorpay.
Classify the customer complaint into exactly one category.
Respond with only the category name, nothing else."""

def make_example(complaint: str, category: str) -> dict:
    """Build a single training example in messages format."""
    return {
        'messages': [
            {'role': 'system',    'content': SYSTEM_PROMPT},
            {'role': 'user',      'content': f"Complaint: {complaint}"},
            {'role': 'assistant', 'content': category},
        ]
    }

# Sample training data
raw_examples = [
    ("My payment of Rs 2500 failed but money was deducted from account",
     'payment_failed_technical'),
    ("I was charged twice for the same order on Swiggy",
     'duplicate_charge'),
    ("Cancelled my subscription but still got charged this month",
     'subscription_cancelled_still_charged'),
    ("UPI payment failed three times, showing insufficient funds but I have balance",
     'payment_failed_insufficient_funds'),
    ("Refund was supposed to arrive 7 days ago, still not credited",
     'refund_delayed'),
    ("Someone made a payment from my account without my knowledge",
     'fraud_unauthorised'),
    ("Merchant charged Rs 4999 but my order was only Rs 2499",
     'wrong_amount_charged'),
    ("Payment shows successful but seller says not received",
     'merchant_dispute'),
] * 50   # repeat to simulate larger dataset

examples = [make_example(c, cat) for c, cat in raw_examples]
dataset  = Dataset.from_list(examples)
split    = dataset.train_test_split(test_size=0.1, seed=42)
print(f"Train: {len(split['train'])}  Val: {len(split['test'])}")
print(f"\nSample example:")
print(json.dumps(split['train'][0]['messages'], indent=2))

# ── Apply chat template using the tokeniser ───────────────────────────
MODEL_ID  = 'meta-llama/Meta-Llama-3-8B-Instruct'
# tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
# For demonstration — show what the formatted text looks like

def format_example_manual(example: dict) -> str:
    """
    Manual LLaMA-3 chat template formatting.
    In production: use tokenizer.apply_chat_template()
    """
    msgs = example['messages']
    text = '<|begin_of_text|>'
    for msg in msgs:
        text += f"<|start_header_id|>{msg['role']}<|end_header_id|>\n"
        text += f"{msg['content']}<|eot_id|>\n"
    return text

formatted = format_example_manual(split['train'][0])
print(f"\nFormatted with LLaMA-3 template:")
print(formatted)
print(f"\nLength: {len(formatted)} characters")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — FULL QLORA PIPELINE ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The complete fine-tuning recipe</span>
        <h2 style={S.h2}>QLoRA fine-tuning — 4-bit quantisation + LoRA on a 7B model</h2>

        <p style={S.p}>
          QLoRA (Module 51) combines 4-bit quantisation of the frozen base model
          with LoRA adapters that train in fp16. This makes fine-tuning a 7B model
          possible on a single 16GB GPU — a Google Colab T4 or a local RTX 4090.
          The TRL library (from HuggingFace) wraps SFTTrainer — a Trainer
          specifically designed for supervised fine-tuning that handles
          chat template formatting, packing short sequences together,
          and gradient checkpointing automatically.
        </p>

        <CodeBlock code={`# pip install transformers peft trl accelerate bitsandbytes datasets

from transformers import (
    AutoTokenizer, AutoModelForCausalLM,
    BitsAndBytesConfig, TrainingArguments,
)
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from trl import SFTTrainer, DataCollatorForCompletionOnlyLM
from datasets import Dataset
import torch

# ── Step 1: Load tokeniser ────────────────────────────────────────────
MODEL_ID  = 'meta-llama/Meta-Llama-3-8B-Instruct'
# Alternative smaller models (no HuggingFace access required):
# MODEL_ID = 'microsoft/Phi-3-mini-4k-instruct'   # 3.8B, great quality
# MODEL_ID = 'mistralai/Mistral-7B-Instruct-v0.3'  # 7B, permissive license

tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
tokenizer.pad_token     = tokenizer.eos_token
tokenizer.padding_side  = 'right'   # pad on right for causal LM

# ── Step 2: Load model in 4-bit (QLoRA) ──────────────────────────────
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type='nf4',            # NormalFloat4 — best 4-bit type
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,       # extra compression
)

model = AutoModelForCausalLM.from_pretrained(
    MODEL_ID,
    quantization_config=bnb_config,
    device_map='auto',
    trust_remote_code=True,
)
model = prepare_model_for_kbit_training(model)

# ── Step 3: LoRA configuration ────────────────────────────────────────
lora_config = LoraConfig(
    r=16,                          # rank — higher = more capacity
    lora_alpha=32,                 # scaling = alpha/r = 2
    lora_dropout=0.05,
    bias='none',
    task_type='CAUSAL_LM',
    target_modules=[               # LLaMA-3 attention + MLP layers
        'q_proj', 'k_proj', 'v_proj', 'o_proj',
        'gate_proj', 'up_proj', 'down_proj',
    ],
)
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# Expected: trainable params: ~40M / 8B (0.5%)

# ── Step 4: Format dataset with chat template ─────────────────────────
def format_chat(example):
    """Apply tokeniser's built-in chat template to messages list."""
    text = tokenizer.apply_chat_template(
        example['messages'],
        tokenize=False,
        add_generation_prompt=False,
    )
    return {'text': text}

# Use dataset from previous section
train_formatted = split['train'].map(format_chat)
val_formatted   = split['test'].map(format_chat)

print(f"\nSample formatted text:")
print(train_formatted[0]['text'][:300])

# ── Step 5: TrainingArguments ─────────────────────────────────────────
training_args = TrainingArguments(
    output_dir='./razorpay-dispute-classifier',
    num_train_epochs=3,
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    gradient_accumulation_steps=4,      # effective batch = 4×4 = 16
    gradient_checkpointing=True,        # trade compute for memory
    optim='paged_adamw_32bit',          # memory-efficient Adam for QLoRA
    learning_rate=2e-4,                 # higher than full fine-tuning
    lr_scheduler_type='cosine',
    warmup_ratio=0.05,
    fp16=True,
    logging_steps=25,
    evaluation_strategy='epoch',
    save_strategy='epoch',
    load_best_model_at_end=True,
    metric_for_best_model='eval_loss',
    save_total_limit=2,
    report_to='none',                   # set to 'wandb' for logging
    seed=42,
)

# ── Step 6: SFTTrainer ────────────────────────────────────────────────
# DataCollatorForCompletionOnlyLM: computes loss ONLY on assistant tokens
# Critical: we do not want to train the model to generate system/user text
response_template = '<|start_header_id|>assistant<|end_header_id|>'
collator = DataCollatorForCompletionOnlyLM(
    response_template=response_template,
    tokenizer=tokenizer,
)

trainer = SFTTrainer(
    model=model,
    args=training_args,
    train_dataset=train_formatted,
    eval_dataset=val_formatted,
    tokenizer=tokenizer,
    data_collator=collator,
    dataset_text_field='text',
    max_seq_length=512,
    packing=True,    # pack short examples together for efficiency
)

print("\nStarting QLoRA fine-tuning...")
# trainer.train()   # uncomment to actually train

# ── Step 7: Save adapter ──────────────────────────────────────────────
# trainer.model.save_pretrained('./razorpay-adapter')
# tokenizer.save_pretrained('./razorpay-adapter')
# Adapter is ~80MB — the base model stays frozen at 4GB`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — EVALUATION ══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Measuring what matters</span>
        <h2 style={S.h2}>Evaluating fine-tuned LLMs — beyond perplexity</h2>

        <p style={S.p}>
          Training loss and perplexity tell you the model is learning
          but not whether it will perform well in production.
          For task-specific fine-tuning, evaluate on task metrics:
          exact match accuracy for classification, ROUGE for summarisation,
          code execution rate for code generation.
          Always hold out a test set that the model never sees during training.
          Always compare against the base model and a prompting baseline —
          if fine-tuning does not beat prompting by a meaningful margin,
          the fine-tuning is not worth the cost.
        </p>

        <CodeBlock code={`import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from peft import PeftModel
import numpy as np
from sklearn.metrics import (
    accuracy_score, classification_report, confusion_matrix
)

# ── Load fine-tuned model for evaluation ─────────────────────────────
def load_finetuned(base_model_id: str, adapter_path: str,
                    device: str = 'cuda'):
    tokenizer = AutoTokenizer.from_pretrained(adapter_path)
    base      = AutoModelForCausalLM.from_pretrained(
        base_model_id,
        torch_dtype=torch.float16,
        device_map=device,
    )
    model = PeftModel.from_pretrained(base, adapter_path)
    model = model.merge_and_unload()   # merge LoRA → no inference overhead
    model.eval()
    return model, tokenizer

# ── Inference function — extract classification label ─────────────────
def classify_dispute(model, tokenizer, complaint: str,
                      max_new_tokens: int = 20) -> str:
    """
    Run inference and extract the predicted category.
    Since we trained the model to output exactly the category name,
    we take the first line of the response.
    """
    messages = [
        {'role': 'system',    'content': SYSTEM_PROMPT},
        {'role': 'user',      'content': f"Complaint: {complaint}"},
    ]
    formatted = tokenizer.apply_chat_template(
        messages, tokenize=False, add_generation_prompt=True,
    )
    inputs = tokenizer(formatted, return_tensors='pt').to(model.device)

    with torch.no_grad():
        output = model.generate(
            **inputs,
            max_new_tokens=max_new_tokens,
            temperature=0.0,       # deterministic for classification
            do_sample=False,
            pad_token_id=tokenizer.eos_token_id,
        )

    # Decode only new tokens
    new_tokens = output[0][inputs['input_ids'].shape[1]:]
    response   = tokenizer.decode(new_tokens, skip_special_tokens=True)
    # Extract first line — should be exactly the category name
    return response.strip().split('\n')[0].strip()

# ── Batch evaluation ──────────────────────────────────────────────────
def evaluate_classifier(model, tokenizer, test_examples: list) -> dict:
    """
    Evaluate on held-out test set.
    Returns accuracy, per-class metrics, and error analysis.
    """
    preds, truths, raw_outputs = [], [], []

    for complaint, true_label in test_examples:
        pred = classify_dispute(model, tokenizer, complaint)
        preds.append(pred)
        truths.append(true_label)
        raw_outputs.append(pred)

    # Exact match accuracy
    exact_match = accuracy_score(truths, preds)

    # Handle cases where model predicts an invalid category
    valid_preds = [
        p if p in DISPUTE_CATEGORIES else 'other'
        for p in preds
    ]
    valid_accuracy = accuracy_score(truths, valid_preds)

    return {
        'exact_match':    exact_match,
        'valid_accuracy': valid_accuracy,
        'invalid_rate':   sum(1 for p in preds if p not in DISPUTE_CATEGORIES) / len(preds),
        'predictions':    preds,
        'truths':         truths,
    }

# ── Compare: base model vs prompting vs fine-tuned ────────────────────
print("Evaluation framework:")
print("""
Test set: 200 held-out disputes (never seen during training)
Metric: exact match accuracy (category must be exactly correct)

Baseline comparisons:
  1. Base LLaMA-3-8B with no prompt engineering
  2. Base LLaMA-3-8B with optimised system prompt
  3. GPT-4-turbo with optimised prompt (API baseline)
  4. Fine-tuned LLaMA-3-8B with QLoRA

Simulated results on Razorpay dispute classification:
""")

results = {
    'Base LLaMA-3-8B (no prompt)':          0.41,
    'Base LLaMA-3-8B (optimised prompt)':   0.73,
    'GPT-4-turbo (optimised prompt)':        0.88,
    'Fine-tuned LLaMA-3-8B (QLoRA)':         0.94,
}
cost_per_1k = {
    'Base LLaMA-3-8B (no prompt)':          0.00,
    'Base LLaMA-3-8B (optimised prompt)':   0.00,
    'GPT-4-turbo (optimised prompt)':        10.00,
    'Fine-tuned LLaMA-3-8B (QLoRA)':         0.10,
}
print(f"  {'Model':<45} {'Accuracy':>10} {'$/1k calls':>12}")
print("  " + "─" * 70)
for name, acc in results.items():
    cost = cost_per_1k[name]
    bar  = '█' * int(acc * 20)
    print(f"  {name:<45} {acc:>10.1%} {cost:>12.2f}")

# ── Error analysis — what categories fail most ────────────────────────
print("""
Error analysis (fine-tuned model):
  Most confused pairs:
    payment_failed_technical ↔ payment_failed_bank_error  (18% of errors)
    refund_not_received ↔ refund_delayed                  (12% of errors)
    fraud_unauthorised ↔ merchant_dispute                 (8% of errors)

  Fix: add more examples distinguishing confused categories.
  Review: pull all wrong predictions, read them, understand the pattern.
  The most impactful data improvement is always on the failure modes.
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — PRODUCTION DEPLOYMENT ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Shipping it</span>
        <h2 style={S.h2}>Deploying fine-tuned LLMs — serving, versioning, and monitoring</h2>

        <CodeBlock code={`# ── Option 1: vLLM — fastest open-source LLM serving ─────────────────
# pip install vllm

print("""
vLLM with merged LoRA weights:

# Merge LoRA into base model first
from peft import PeftModel
from transformers import AutoModelForCausalLM

base  = AutoModelForCausalLM.from_pretrained('meta-llama/Meta-Llama-3-8B-Instruct')
model = PeftModel.from_pretrained(base, './razorpay-adapter')
model = model.merge_and_unload()
model.save_pretrained('./razorpay-merged')

# Serve with vLLM (OpenAI-compatible API)
# vllm serve ./razorpay-merged --port 8000 --dtype float16

# Then call like OpenAI API:
from openai import OpenAI
client = OpenAI(base_url='http://localhost:8000/v1', api_key='unused')
response = client.chat.completions.create(
    model='./razorpay-merged',
    messages=[
        {'role': 'system', 'content': SYSTEM_PROMPT},
        {'role': 'user',   'content': 'Complaint: charged twice for Swiggy order'},
    ],
    temperature=0.0,
    max_tokens=20,
)
category = response.choices[0].message.content.strip()
""")

# ── Option 2: FastAPI wrapper ──────────────────────────────────────────
print("""
FastAPI production wrapper:

from fastapi import FastAPI
from pydantic import BaseModel
import torch

app   = FastAPI()
model = None   # loaded at startup

class DisputeRequest(BaseModel):
    complaint: str
    merchant_id: str = None

class DisputeResponse(BaseModel):
    category: str
    confidence: float
    latency_ms: float

@app.on_event('startup')
async def load_model():
    global model, tokenizer
    model, tokenizer = load_finetuned(BASE_MODEL_ID, ADAPTER_PATH)

@app.post('/classify', response_model=DisputeResponse)
async def classify(request: DisputeRequest):
    import time
    start    = time.time()
    category = classify_dispute(model, tokenizer, request.complaint)
    latency  = (time.time() - start) * 1000

    # Validate output
    if category not in DISPUTE_CATEGORIES:
        category = 'other'

    return DisputeResponse(
        category=category,
        confidence=0.0,    # add confidence scoring for production
        latency_ms=latency,
    )
""")

# ── Monitoring in production ───────────────────────────────────────────
print("""
Production monitoring checklist:

1. Latency tracking
   - p50, p95, p99 latency per request
   - Alert if p95 > 2 seconds (SLO violation)

2. Accuracy tracking (requires ground truth labels)
   - Sample 5% of requests for human review
   - Track accuracy weekly — fine-tuned models can degrade
   - Common cause: data distribution shift (new dispute types)

3. Distribution monitoring
   - Track predicted category distribution daily
   - Alert if any category spikes >2x or drops to 0
   - Sudden spike in 'other' = model seeing out-of-distribution inputs

4. Model versioning
   - Tag every model with: training date, data version, eval accuracy
   - Keep last 3 versions in storage for rollback
   - Blue-green deployment: 5% traffic to new model → validate → 100%

5. Retraining triggers
   - Accuracy drops >3% vs baseline on weekly sample
   - New dispute category appears in data (needs training examples)
   - Base model major version update available (retrain on new base)
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common LLM fine-tuning mistake — explained and fixed</h2>

        <ErrorBlock
          error="Fine-tuned model generates correct category followed by extra explanation text"
          cause="The DataCollatorForCompletionOnlyLM was not configured correctly — loss was computed on both user and assistant tokens, not just the assistant response. The model learned to imitate the full training format including any trailing text. Or the response_template string does not exactly match the tokenised special tokens in the actual training data."
          fix="Verify DataCollatorForCompletionOnlyLM is using the exact response_template string that appears in your formatted examples. Print one tokenised example and check that only the assistant tokens have loss_ids set (label != -100). At inference: post-process the output to extract only the first line or the first recognised category name. Add a validation function that maps raw model output to valid categories — catch invalid outputs before returning to the caller."
        />

        <ErrorBlock
          error="Training loss goes to near-zero in epoch 1 but validation loss increases — severe overfitting"
          cause="Dataset is too small relative to the number of trainable LoRA parameters. With r=16 and 7 target modules on LLaMA-3-8B, LoRA adds ~40M trainable parameters. If your dataset has fewer than 200 examples, the model memorises training data exactly and fails to generalise. Also caused by too many epochs — 3 epochs on 100 examples is equivalent to training from scratch on 300 examples."
          fix="Collect more data — minimum 500 examples for LoRA fine-tuning, ideally 2,000+. Use a lower rank: r=4 or r=8 — fewer trainable parameters are harder to overfit with small data. Reduce target modules to only q_proj and v_proj. Add LoRA dropout: lora_dropout=0.1. Use only 1–2 epochs and select checkpoint by validation loss. Add label smoothing to SFTTrainer. If data collection is not possible, stay with prompting."
        />

        <ErrorBlock
          error="SFTTrainer fails — ValueError: could not find response template in the tokenised sequence"
          cause="The response_template string passed to DataCollatorForCompletionOnlyLM does not appear in the tokenised training examples. This is a tokenisation mismatch — the template string is tokenised differently when it appears mid-sequence vs standalone. LLaMA-3 adds different token IDs to the same string depending on position in the sequence."
          fix="Use the tokeniser to get the correct token IDs for the response template: response_ids = tokenizer.encode(response_template, add_special_tokens=False). Pass these IDs instead of the string: DataCollatorForCompletionOnlyLM(response_template=response_ids, ...). Alternatively use TRL's SFTTrainer with formatting_func instead of data_collator — it handles the template internally. Print a formatted and tokenised example and visually verify the template appears in the token IDs."
        />

        <ErrorBlock
          error="Fine-tuned model works on test set but degrades after deployment — distribution shift"
          cause="The test set was not representative of production data. Training and test examples were from the same source (e.g. manually written examples) but production receives real customer complaints with different vocabulary, code-switching (Hindi-English mix), typos, and edge cases not present in training data. The model memorised the training distribution and fails on real inputs."
          fix="Collect evaluation data from real production inputs, not the same source as training data. If you are fine-tuning on manually written examples, add real customer complaints to the training set before training — even a small number (50–100 real examples) dramatically improves production performance. Set up a data flywheel: log production inputs → human review wrong predictions → add corrected examples to training set → retrain monthly."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can fine-tune any LLM. Next: models that see and understand
          both images and text simultaneously.
        </h2>

        <p style={S.p}>
          Fine-tuning adapts a model to a specific task using labelled examples.
          The next frontier is multimodal models — models that jointly understand
          images and text. CLIP encodes images and text in a shared embedding space.
          LLaVA connects a vision encoder to an LLM decoder, enabling visual
          question answering. Module 66 covers how these architectures work
          and how to use them for tasks that require understanding both
          what is written and what is shown.
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
              Next — Module 66 · Generative AI
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Multimodal Models — CLIP, LLaVA, and Vision-Language
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Models that see and understand images and text together.
              CLIP for zero-shot image classification, LLaVA for visual
              question answering.
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
          'Fine-tune only when prompting and RAG cannot get you there. The decision hierarchy: prompt engineering first (1 day, flexible, no training cost) → RAG for knowledge gaps (1-2 weeks) → LoRA fine-tuning for consistent behaviour change on high-volume tasks (2-4 weeks) → full fine-tuning almost never for applications. The bar for fine-tuning must be justified by volume and a clear quality gap over prompting.',
          'Data quality trumps data quantity. 500 high-quality, diverse, correctly-labelled examples beat 5,000 mediocre ones every time. Evaluate your data before training: read 50 random examples manually. If you find labelling inconsistencies, fix the data first. The most impactful ML work is data cleaning, not model architecture.',
          'Chat template format must match the base model exactly. LLaMA-3, Mistral, Phi-3, and Gemma all use different special tokens. Apply the template with tokenizer.apply_chat_template() — never hardcode template strings manually. Template mismatches are the most common silent failure in LLM fine-tuning.',
          'Use DataCollatorForCompletionOnlyLM to compute loss on assistant tokens only. Training on prompt tokens wastes compute and teaches the model the wrong thing — it should learn to generate responses, not re-generate inputs. Verify by printing token labels: prompt positions must be -100 (ignored).',
          'QLoRA (4-bit quantisation + LoRA, rank 16, all projection layers) on a 7B model fits in 16GB VRAM with batch_size=4 and gradient_accumulation=4. Use paged_adamw_32bit optimiser, gradient_checkpointing=True, and packing=True in SFTTrainer. Training 3 epochs on 2,000 examples takes approximately 30-60 minutes on a T4.',
          'Always compare fine-tuned model against: base model with no prompt, base model with optimised prompt, and a stronger model API (GPT-4) with optimised prompt. If GPT-4 with a good prompt beats your fine-tuned model, you have a data or training problem, not a capability gap. Ship the simpler approach until fine-tuning genuinely wins on your evaluation set.',
        ]}
      />
    </LearnLayout>
  )
}