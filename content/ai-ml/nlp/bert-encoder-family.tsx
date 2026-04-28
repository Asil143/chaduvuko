import type { Metadata } from 'next'
import {LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'BERT and the Encoder-Only Family — Chaduvuko',
  description:
    'Masked language modelling, next sentence prediction, fine-tuning on downstream tasks. The model that changed NLP — still powering classification and NER.',
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

export default function BertEncoderFamilyPage() {
  return (
    <LearnLayout
      title="BERT and the Encoder-Only Family"
      description="Masked language modelling, next sentence prediction, fine-tuning on downstream tasks. The model that changed NLP — still powering classification and NER."
      section="Natural Language Processing"
      readTime="36–46 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="nlp" topic="bert-encoder-family" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — what BERT actually is</span>
        <h2 style={S.h2}>
          GPT reads left to right. BERT reads the entire sentence
          at once — forward and backward simultaneously.
          That one change made it the best model for understanding tasks
          for three years running.
        </h2>

        <p style={S.p}>
          Before BERT (2018), language models were unidirectional.
          GPT reads token 1, then token 2, then token 3 — each token
          only sees what came before it. This is necessary for generation
          (you cannot read the future when writing) but it is a
          handicap for understanding. To classify whether a sentence is
          positive or negative, every word should inform the meaning
          of every other word — bidirectionally.
        </p>

        <p style={S.p}>
          BERT (Bidirectional Encoder Representations from Transformers)
          uses a Transformer encoder — the left half of the original
          Transformer architecture from Module 48. Every token attends
          to every other token with no causal mask.
          To pretrain this bidirectional model without the ability to
          simply predict the next token (which would leak the answer),
          BERT uses two novel pretraining objectives:
          Masked Language Modelling and Next Sentence Prediction.
        </p>

        <p style={S.p}>
          The result: BERT representations capture deep bidirectional
          context. Fine-tune BERT on 1,000 labelled examples and it
          outperforms models trained from scratch on 100,000.
          Amazon's review classifier, DoorDash's complaint tagger,
          Stripe's intent detector — all fine-tuned BERT variants.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Reading comprehension in school: you read the full passage,
            then answer questions about it. You read forwards and backwards,
            checking context in both directions. A student who only reads
            left to right and never re-reads misses nuance.
            BERT is the student who reads the full passage before answering.
            GPT is the student writing an essay — they cannot read what
            they have not written yet.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            This is why BERT dominates understanding tasks (classification,
            NER, Q&A) while GPT dominates generation tasks (completion,
            summarisation, chat). Same Transformer architecture,
            different direction of attention, completely different use cases.
          </p>
        </AnalogyBox>
      </div>

      <Div />

      {/* ══ SECTION 2 — PRETRAINING OBJECTIVES ═════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>How BERT was pretrained</span>
        <h2 style={S.h2}>Masked Language Modelling and Next Sentence Prediction — the two pretraining tasks</h2>

        <p style={S.p}>
          BERT cannot use next-token prediction as its pretraining objective —
          that would require masking future tokens, making it unidirectional.
          Instead it uses two self-supervised objectives that can be
          computed from raw unlabelled text with no human annotation.
        </p>

        <VisualBox label="Masked Language Modelling — predict the masked token from both directions">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6, alignItems: 'center' }}>
              {[
                { tok: '[CLS]', color: '#BA7517' },
                { tok: 'Stripe', color: 'var(--muted)' },
                { tok: '[MASK]', color: '#ff4757', bold: true },
                { tok: 'my', color: 'var(--muted)' },
                { tok: 'payment', color: 'var(--muted)' },
                { tok: '[MASK]', color: '#ff4757', bold: true },
                { tok: 'today', color: 'var(--muted)' },
                { tok: '[SEP]', color: '#BA7517' },
              ].map((item, i) => (
                <span key={i} style={{
                  background: item.bold ? 'rgba(255,71,87,0.15)' : 'var(--surface)',
                  border: `1px solid ${item.bold ? '#ff4757' : 'var(--border)'}`,
                  borderRadius: 4, padding: '4px 8px',
                  fontSize: 12, fontFamily: 'var(--font-mono)',
                  color: item.color, fontWeight: item.bold ? 700 : 400,
                }}>
                  {item.tok}
                </span>
              ))}
              <span style={{ fontSize: 12, color: '#1D9E75', marginLeft: 8 }}>
                → predict "declined" and "failed"
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { rule: '80% of masked tokens', action: 'Replace with [MASK]', color: '#ff4757' },
                { rule: '10% of masked tokens', action: 'Replace with random token', color: '#BA7517' },
                { rule: '10% of masked tokens', action: 'Keep original unchanged', color: '#1D9E75' },
              ].map((row) => (
                <div key={row.rule} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: row.color, fontFamily: 'var(--font-mono)', minWidth: 180 }}>
                    {row.rule}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{row.action}</span>
                </div>
              ))}
            </div>
            <p style={{ ...S.ps, marginBottom: 0, fontSize: 11, fontStyle: 'italic' }}>
              15% of tokens are selected for masking in each sequence.
              The random and unchanged cases prevent the model from learning
              to always output the original token — it must always attend to context.
            </p>
          </div>
        </VisualBox>

        <ConceptBox title="Next Sentence Prediction — is sentence B the continuation of sentence A?">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                label: 'Positive (IsNext — 50%)',
                color: '#1D9E75',
                a: 'Stripe payment was declined.',
                b: 'Please retry after some time.',
                verdict: 'IsNext ✓',
              },
              {
                label: 'Negative (NotNext — 50%)',
                color: '#D85A30',
                a: 'Stripe payment was declined.',
                b: 'The weather in New York is humid.',
                verdict: 'NotNext ✗',
              },
            ].map((item) => (
              <div key={item.label} style={{
                background: 'var(--bg2)', borderRadius: 6, padding: '10px 12px',
                border: `1px solid ${item.color}25`,
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 2 }}>
                  Sentence A: <span style={{ color: 'var(--text)' }}>{item.a}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                  Sentence B: <span style={{ color: 'var(--text)' }}>{item.b}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>
                  [CLS] → {item.verdict}
                </div>
              </div>
            ))}
          </div>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 10, fontSize: 11 }}>
            Note: Later research (RoBERTa, 2019) showed NSP does not help and may hurt.
            RoBERTa removed it entirely and achieved better results training with MLM only
            on more data for longer.
          </p>
        </ConceptBox>

        <CodeBlock code={`# ── Demonstrate MLM manually — what BERT is trained to do ───────────
# In production BERT is pretrained for you — this shows the concept

from transformers import AutoTokenizer, AutoModelForMaskedLM
import torch

# Load BERT tokeniser and MLM model
tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
model     = AutoModelForMaskedLM.from_pretrained('bert-base-uncased')
model.eval()

# ── Task: fill in the [MASK] ──────────────────────────────────────────
sentences = [
    "Stripe [MASK] my payment successfully.",
    "The [MASK] was declined due to insufficient funds.",
    "Please [MASK] your transaction after some time.",
]

print("BERT Masked Language Modelling predictions:")
for sentence in sentences:
    inputs = tokenizer(sentence, return_tensors='pt')
    mask_idx = (inputs['input_ids'] == tokenizer.mask_token_id).nonzero(as_tuple=True)[1]

    with torch.no_grad():
        logits = model(**inputs).logits

    # Top 5 predictions for the masked token
    mask_logits = logits[0, mask_idx, :]
    top5 = torch.topk(mask_logits, 5, dim=-1)
    top5_tokens = tokenizer.convert_ids_to_tokens(top5.indices[0])
    top5_probs  = torch.softmax(top5.values[0], dim=0)

    print(f"\n  '{sentence}'")
    for tok, prob in zip(top5_tokens, top5_probs):
        bar = '█' * int(prob.item() * 30)
        print(f"    {tok:<15} {bar:<30} {prob.item():.3f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — BERT INPUT FORMAT ═══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The input format</span>
        <h2 style={S.h2}>BERT's three embeddings — token, segment, and position</h2>

        <p style={S.p}>
          BERT's input is the sum of three embedding types.
          The <strong style={{ color: '#7b61ff' }}>token embedding</strong> is the standard
          lookup table for each WordPiece token.
          The <strong style={{ color: '#1D9E75' }}>segment embedding</strong> distinguishes
          sentence A (all zeros) from sentence B (all ones) —
          needed for the NSP task and any two-sentence input like Q&A.
          The <strong style={{ color: '#D85A30' }}>position embedding</strong> is learned
          (unlike GPT's sinusoidal encoding) — one vector per position 0 to 511.
        </p>

        <VisualBox label="BERT input format — special tokens and embedding sum">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Token sequence */}
            <div>
              <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>TOKEN SEQUENCE</div>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 4 }}>
                {[
                  { tok: '[CLS]', seg: 'A', pos: 0, color: '#BA7517' },
                  { tok: 'payment', seg: 'A', pos: 1, color: '#7b61ff' },
                  { tok: 'declined', seg: 'A', pos: 2, color: '#7b61ff' },
                  { tok: '[SEP]', seg: 'A', pos: 3, color: '#BA7517' },
                  { tok: 'please', seg: 'B', pos: 4, color: '#1D9E75' },
                  { tok: 'retry', seg: 'B', pos: 5, color: '#1D9E75' },
                  { tok: '[SEP]', seg: 'B', pos: 6, color: '#BA7517' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <span style={{
                      background: 'var(--surface)', border: `1px solid ${item.color}40`,
                      borderRadius: 4, padding: '4px 8px',
                      fontSize: 11, fontFamily: 'var(--font-mono)', color: item.color,
                    }}>{item.tok}</span>
                    <span style={{ fontSize: 9, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                      seg:{item.seg} pos:{item.pos}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Three embeddings */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {[
                { name: 'Token embedding', color: '#7b61ff', desc: 'WordPiece lookup — 30,522 × 768' },
                { name: 'Segment embedding', color: '#1D9E75', desc: 'E_A for sentence A, E_B for sentence B' },
                { name: 'Position embedding', color: '#D85A30', desc: 'Learned vector per position (0–511)' },
              ].map((item) => (
                <div key={item.name} style={{
                  background: 'var(--surface)', borderRadius: 6, padding: '8px 10px',
                  border: `1px solid ${item.color}25`,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 3 }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center' as const, fontSize: 13, color: '#1D9E75', fontFamily: 'var(--font-mono)' }}>
              Input = Token Emb + Segment Emb + Position Emb → 768-dim vector per token
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`from transformers import AutoTokenizer
import torch

tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')

# ── BERT tokenisation — what actually goes into the model ─────────────
text_a = "Stripe payment was declined"
text_b = "Please retry after some time"

# Single sentence
single = tokenizer(text_a, return_tensors='pt')
print("Single sentence encoding:")
print(f"  input_ids:      {single['input_ids'][0].tolist()}")
print(f"  token_type_ids: {single['token_type_ids'][0].tolist()}  ← all 0 (sentence A)")
print(f"  attention_mask: {single['attention_mask'][0].tolist()}")
print(f"  tokens:         {tokenizer.convert_ids_to_tokens(single['input_ids'][0])}")

# Two sentences (for NSP, Q&A, sentence pair tasks)
pair = tokenizer(text_a, text_b, return_tensors='pt')
print(f"\nSentence pair encoding:")
print(f"  tokens:         {tokenizer.convert_ids_to_tokens(pair['input_ids'][0])}")
print(f"  token_type_ids: {pair['token_type_ids'][0].tolist()}")
print(f"  ← 0s = sentence A, 1s = sentence B")

# ── Batch encoding with padding ───────────────────────────────────────
batch_texts = [
    "payment declined",
    "transaction successful confirmation received",
    "upi failed",
]
batch = tokenizer(batch_texts, padding=True, truncation=True,
                  max_length=32, return_tensors='pt')
print(f"\nBatch encoding (padded to same length):")
print(f"  input_ids shape:      {batch['input_ids'].shape}")
print(f"  attention_mask shape: {batch['attention_mask'].shape}")
print(f"  Padding token ID:     {tokenizer.pad_token_id}")
print(f"  [CLS] token ID:       {tokenizer.cls_token_id}")
print(f"  [SEP] token ID:       {tokenizer.sep_token_id}")
print(f"  [MASK] token ID:      {tokenizer.mask_token_id}")
print(f"\nVocab size: {tokenizer.vocab_size:,}  (WordPiece)")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — FINE-TUNING BERT ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Using BERT in production</span>
        <h2 style={S.h2}>Fine-tuning BERT — add a task head, update all weights end-to-end</h2>

        <p style={S.p}>
          BERT fine-tuning is simple: add one task-specific layer on top
          of the pretrained encoder and train the entire model end-to-end
          on your labelled data for 2–4 epochs.
          For classification, use the [CLS] token's final hidden state
          (a 768-dim vector) as input to a linear classifier.
          For NER, use every token's final hidden state.
          For Q&A, predict start and end positions of the answer span.
        </p>

        <VisualBox label="BERT fine-tuning — one architecture, three tasks">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              {
                task: 'Sequence Classification',
                color: '#7b61ff',
                input: '[CLS] + sentence',
                head: 'Linear(768 → n_classes)',
                output: 'Class probabilities',
                example: 'Amazon review sentiment',
                model: 'AutoModelForSequenceClassification',
              },
              {
                task: 'Token Classification (NER)',
                color: '#1D9E75',
                input: '[CLS] + tokens + [SEP]',
                head: 'Linear(768 → n_labels) per token',
                output: 'Label per token',
                example: 'Extract merchant name from text',
                model: 'AutoModelForTokenClassification',
              },
              {
                task: 'Extractive Q&A',
                color: '#D85A30',
                input: '[CLS] + question + [SEP] + context',
                head: 'Linear(768 → 2) for start/end',
                output: 'Answer span positions',
                example: 'Find amount in payment dispute',
                model: 'AutoModelForQuestionAnswering',
              },
            ].map((item) => (
              <div key={item.task} style={{
                background: 'var(--surface)', borderRadius: 8, padding: '12px 12px',
                border: `1px solid ${item.color}25`,
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 8 }}>
                  {item.task}
                </div>
                {[
                  ['Input', item.input],
                  ['Head', item.head],
                  ['Output', item.output],
                  ['Example', item.example],
                ].map(([k, v]) => (
                  <div key={k} style={{ marginBottom: 5 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>{k}: </span>
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>{v}</span>
                  </div>
                ))}
                <div style={{
                  marginTop: 8, fontSize: 10, fontFamily: 'var(--font-mono)',
                  color: item.color, background: `${item.color}10`,
                  padding: '3px 6px', borderRadius: 3,
                }}>
                  {item.model}
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`from transformers import (
    AutoTokenizer, AutoModelForSequenceClassification,
    AutoModelForTokenClassification,
    TrainingArguments, Trainer, DataCollatorWithPadding,
)
from datasets import Dataset
import evaluate
import numpy as np
import torch

# ── Task: DoorDash complaint classification ────────────────────────────
# Categories: delivery_late, wrong_order, missing_items, quality_issue

LABELS   = ['delivery_late', 'wrong_order', 'missing_items', 'quality_issue']
label2id = {l: i for i, l in enumerate(LABELS)}
id2label = {i: l for i, l in enumerate(LABELS)}

complaints = [
    ("Order took 2 hours to arrive, completely cold", 0),
    ("Received biryani instead of ordered pizza", 1),
    ("Only 2 of 4 items delivered, rest missing", 2),
    ("Food was stale and tasted terrible", 3),
    ("Delivery was delayed by 45 minutes", 0),
    ("Wrong restaurant items delivered entirely", 1),
    ("Half my order was not delivered", 2),
    ("Found hair in the food very unhygienic", 3),
] * 50

tokenizer  = AutoTokenizer.from_pretrained('distilbert-base-uncased')
model      = AutoModelForSequenceClassification.from_pretrained(
    'distilbert-base-uncased',
    num_labels=4,
    id2label=id2label,
    label2id=label2id,
)

def tokenise(examples):
    return tokenizer(examples['text'], max_length=128,
                     truncation=True, padding=False)

texts  = [c[0] for c in complaints]
labels = [c[1] for c in complaints]

raw   = Dataset.from_dict({'text': texts, 'label': labels})
raw   = raw.train_test_split(test_size=0.2, seed=42)
tok   = raw.map(tokenise, batched=True, remove_columns=['text'])

collator = DataCollatorWithPadding(tokenizer=tokenizer)
acc_metric = evaluate.load('accuracy')

def compute_metrics(eval_pred):
    preds  = np.argmax(eval_pred.predictions, axis=1)
    return acc_metric.compute(predictions=preds, references=eval_pred.label_ids)

args = TrainingArguments(
    output_dir='./swiggy-complaints',
    num_train_epochs=3,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=32,
    learning_rate=2e-5,
    warmup_ratio=0.1,
    weight_decay=0.01,
    evaluation_strategy='epoch',
    save_strategy='epoch',
    load_best_model_at_end=True,
    metric_for_best_model='accuracy',
    seed=42,
    logging_steps=20,
)

trainer = Trainer(
    model=model, args=args,
    train_dataset=tok['train'],
    eval_dataset=tok['test'],
    tokenizer=tokenizer,
    data_collator=collator,
    compute_metrics=compute_metrics,
)

print("Fine-tuning DistilBERT on DoorDash complaints:")
trainer.train()
results = trainer.evaluate()
print(f"\nAccuracy: {results['eval_accuracy']:.4f}")

# ── Inference on new complaints ───────────────────────────────────────
model.eval()
new_complaints = [
    "Waited 90 minutes for delivery",
    "Got someone else's order completely",
    "Three items from my cart were not in the bag",
]
inputs = tokenizer(new_complaints, padding=True, truncation=True,
                   max_length=128, return_tensors='pt')
with torch.no_grad():
    logits = model(**inputs).logits
    probs  = torch.softmax(logits, dim=1)

print("\nPredictions on new complaints:")
for complaint, prob in zip(new_complaints, probs):
    pred = LABELS[prob.argmax()]
    conf = prob.max().item()
    print(f"  '{complaint[:40]}' → {pred} ({conf:.3f})")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — THE ENCODER FAMILY ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>BERT's descendants</span>
        <h2 style={S.h2}>RoBERTa, DistilBERT, ALBERT, DeBERTa — what each one improved</h2>

        <p style={S.p}>
          BERT spawned an entire family of encoder-only models.
          Each one identified a specific weakness in the original BERT
          and fixed it — more data, better training recipe,
          smaller model, better attention mechanism.
          Understanding what each model improved helps you
          choose the right one for your task.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              model: 'BERT-base',
              org: 'Google, 2018',
              params: '110M',
              color: '#378ADD',
              improved: 'Original — bidirectional pretraining, MLM + NSP',
              weakness: 'NSP task wastes capacity. Under-trained on too-little data.',
              use: 'Baseline. Well-studied. Good documentation everywhere.',
            },
            {
              model: 'RoBERTa',
              org: 'Facebook, 2019',
              params: '125M',
              color: '#7b61ff',
              improved: 'Removed NSP. Trained 10× longer on 10× more data. Dynamic masking.',
              weakness: 'Same size as BERT, more training compute to reproduce.',
              use: 'Default choice when BERT is not accurate enough. Consistently better.',
            },
            {
              model: 'DistilBERT',
              org: 'HuggingFace, 2019',
              params: '66M',
              color: '#1D9E75',
              improved: 'Knowledge distillation from BERT. 40% smaller, 60% faster, 97% quality.',
              weakness: 'Slightly lower accuracy than full BERT on complex tasks.',
              use: 'Production with latency constraints. API serving. Mobile.',
            },
            {
              model: 'ALBERT',
              org: 'Google, 2019',
              params: '12M',
              color: '#D85A30',
              improved: 'Parameter sharing across layers + factorised embeddings. Tiny model.',
              weakness: 'Slower inference despite fewer params (shared weights = more passes).',
              use: 'Extreme memory constraints. Edge devices.',
            },
            {
              model: 'DeBERTa',
              org: 'Microsoft, 2020',
              params: '140M',
              color: '#BA7517',
              improved: 'Disentangled attention — separate content and position matrices.',
              weakness: 'More complex, larger than RoBERTa.',
              use: 'State of the art on NLU benchmarks. When accuracy is critical.',
            },
            {
              model: 'IndicBERT / MuRIL',
              org: 'AI4Bharat / Google',
              params: '110M',
              color: '#ff4757',
              improved: 'Pretrained on Indian languages — Hindi, Tamil, Telugu, Bengali, etc.',
              weakness: 'Less English-language capability than BERT.',
              use: 'Any Indian language NLP task. Code-mixed Hindi-English text.',
            },
          ].map((item) => (
            <div key={item.model} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '11px 14px',
              display: 'grid', gridTemplateColumns: '130px 60px 1fr 1fr',
              gap: 10, alignItems: 'start',
              borderLeft: `3px solid ${item.color}`,
            }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.model}</div>
                <div style={{ fontSize: 10, color: 'var(--muted)' }}>{item.org}</div>
              </div>
              <span style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.params}</span>
              <div>
                <div style={{ fontSize: 11, color: '#1D9E75', marginBottom: 3 }}>✓ {item.improved}</div>
                <div style={{ fontSize: 11, color: '#ff4757' }}>✗ {item.weakness}</div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>{item.use}</div>
            </div>
          ))}
        </div>

        <CodeBlock code={`from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch, time

# ── Benchmark: accuracy vs speed tradeoff across BERT family ──────────
models_to_compare = [
    ('distilbert-base-uncased', 'DistilBERT'),
    ('bert-base-uncased',       'BERT-base'),
    ('roberta-base',            'RoBERTa-base'),
]

texts = ["Stripe payment declined please help retry"] * 64

print(f"{'Model':<20} {'Params':>8} {'Latency (ms)':>14} {'Throughput'}")
print("─" * 60)

for model_id, name in models_to_compare:
    tok   = AutoTokenizer.from_pretrained(model_id)
    model = AutoModelForSequenceClassification.from_pretrained(
        model_id, num_labels=3
    )
    model.eval()

    params = sum(p.numel() for p in model.parameters()) / 1e6

    inputs = tok(texts, return_tensors='pt', padding=True,
                 truncation=True, max_length=64)

    # Warmup
    with torch.no_grad(): _ = model(**inputs)

    # Time
    start = time.time()
    for _ in range(5):
        with torch.no_grad(): _ = model(**inputs)
    ms_per_batch = (time.time() - start) / 5 * 1000

    throughput = len(texts) / (ms_per_batch / 1000)
    print(f"  {name:<18}  {params:>6.0f}M  {ms_per_batch:>12.1f}ms  "
          f"{throughput:>6.0f} samples/s")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — NER WITH BERT ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Beyond classification</span>
        <h2 style={S.h2}>Named Entity Recognition — labelling every token in a sequence</h2>

        <p style={S.p}>
          Classification uses only the [CLS] token.
          NER uses every token's output — one label per token.
          Useful at Stripe to extract merchant names, amounts,
          and dates from unstructured dispute text.
          The label format is BIO: B-entity (beginning),
          I-entity (inside), O (outside/no entity).
        </p>

        <CodeBlock code={`from transformers import (
    AutoTokenizer, AutoModelForTokenClassification, pipeline,
)
import torch

# ── NER with pretrained BERT ──────────────────────────────────────────
# Use a pretrained NER model — fine-tuned BERT on CoNLL-2003
tokenizer = AutoTokenizer.from_pretrained('dbmdz/bert-large-cased-finetuned-conll03-english')
model     = AutoModelForTokenClassification.from_pretrained(
    'dbmdz/bert-large-cased-finetuned-conll03-english'
)

# Pipeline handles aggregation (merging subword tokens into words)
ner_pipeline = pipeline(
    'ner',
    model=model,
    tokenizer=tokenizer,
    aggregation_strategy='simple',  # merge subword tokens
)

# ── Extract entities from Stripe dispute texts ──────────────────────
dispute_texts = [
    "I made a payment of Rs 2500 to DoorDash on 15th March 2026.",
    "Amazon charged me twice for an order from New York warehouse.",
    "Amazon India debited Rs 4999 from my HDFC account yesterday.",
]

print("Named Entity Recognition on payment disputes:")
for text in dispute_texts:
    entities = ner_pipeline(text)
    print(f"\n  Text: '{text}'")
    for ent in entities:
        print(f"    {ent['entity_group']:<6} '{ent['word']}'  "
              f"score={ent['score']:.3f}")

# ── Fine-tuning BERT for custom NER ───────────────────────────────────
# Custom entities: MERCHANT, AMOUNT, DATE, ACCOUNT
print("""
# Custom NER training pattern:
# 1. Annotate data in BIO format:
#    tokens: ["Paid", "Rs", "500", "to", "DoorDash"]
#    labels: ["O",  "B-AMOUNT", "I-AMOUNT", "O", "B-MERCHANT"]
#
# 2. Load model:
#    model = AutoModelForTokenClassification.from_pretrained(
#        'distilbert-base-uncased',
#        num_labels=len(label_list),  # B-MERCHANT, I-MERCHANT, B-AMOUNT, ... O
#    )
#
# 3. Key difference from sequence classification:
#    - Labels are per-token not per-sequence
#    - Subword tokens get label -100 (ignored in loss)
#    - Only the first subword of each word gets the real label
#
# 4. Tokenisation with word_ids alignment:
def tokenise_and_align(examples, tokenizer, label2id):
    tokenized = tokenizer(examples['tokens'], is_split_into_words=True,
                          truncation=True, max_length=128)
    all_labels = []
    for i, labels in enumerate(examples['ner_tags']):
        word_ids   = tokenized.word_ids(batch_index=i)
        prev_word  = None
        label_ids  = []
        for word_id in word_ids:
            if word_id is None:
                label_ids.append(-100)   # special tokens ignored
            elif word_id != prev_word:
                label_ids.append(label2id[labels[word_id]])
            else:
                label_ids.append(-100)   # subword tokens ignored
            prev_word = word_id
        all_labels.append(label_ids)
    tokenized['labels'] = all_labels
    return tokenized
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common BERT mistake — explained and fixed</h2>

        <ErrorBlock
          error="Model predicts the same label for every input after fine-tuning"
          cause="Learning rate is too high — catastrophic forgetting wiped out the pretrained representations in the first epoch. With lr=1e-3 (common for training from scratch), BERT's weights are overwritten in minutes. The model collapses to predicting the majority class. Also caused by a label imbalance issue where one class dominates and the model learns to always predict it."
          fix="Use lr=2e-5 for BERT, maximum 5e-5. Add warmup_ratio=0.1 — this critical step starts at near-zero lr and ramps up, preventing large destructive updates in early steps. Check class distribution: if 90% of examples are class 0, the model will predict class 0 always and achieve 90% accuracy trivially. Add class weights to the loss or use a balanced sampler."
        />

        <ErrorBlock
          error="token_type_ids missing — UserWarning about missing segment embeddings"
          cause="You are passing input_ids and attention_mask but not token_type_ids to a BERT model (not DistilBERT). BERT requires token_type_ids to distinguish sentence A from sentence B. DistilBERT does not use them. Calling AutoTokenizer on paired sentences produces token_type_ids but calling on single sentences and manually batching may lose them."
          fix="Always use the tokenizer's output directly: inputs = tokenizer(text, return_tensors='pt'). This automatically produces token_type_ids. When batching manually, verify all three keys are present: assert 'token_type_ids' in inputs. For DistilBERT this warning is harmless — DistilBERT ignores token_type_ids. For BERT-base it matters for two-sentence tasks."
        />

        <ErrorBlock
          error="NER labels are misaligned — first token gets wrong label after WordPiece tokenisation"
          cause="WordPiece splits words into subword tokens. 'Stripe' might become ['Razor', '##pay']. If you assigned one label to 'Stripe' in your annotations but the tokeniser produces two tokens, the label alignment breaks — both subwords need labels but you only have one. Naively aligning labels to tokens produces misaligned training data."
          fix="Use the word_ids() method from the tokeniser to align labels correctly. For the first subword of each word, assign the real label. For continuation subwords (##tokens), assign -100 so they are ignored in the loss computation. Use the tokenise_and_align pattern shown in Section 6. Never manually align labels by position — always use word_ids()."
        />

        <ErrorBlock
          error="Fine-tuned BERT performs worse than a simple logistic regression on your data"
          cause="Dataset is too small (under 200 examples), the text domain is very different from BERT's pretraining data (e.g. code, specialised medical text, ancient languages), or the text is too short for BERT's bidirectional attention to add value (1-3 word inputs). BERT needs enough context to leverage bidirectionality."
          fix="For very small datasets (under 200 examples), use a simpler model — TF-IDF + logistic regression often beats fine-tuned BERT at this scale. For domain-specific text, use a domain-pretrained model: BioBERT for medical, LegalBERT for legal, IndicBERT for Indian languages. For very short texts, freeze all BERT layers and only train the head — prevents overfitting on limited data."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can fine-tune BERT for any classification or NER task.
          Next: fine-tune with less than 1% of the parameters.
        </h2>

        <p style={S.p}>
          Full fine-tuning updates all 110 million parameters of BERT.
          For large models (7B, 13B, 70B parameters) this requires enormous
          GPU memory and storage. PEFT (Parameter-Efficient Fine-Tuning)
          methods like LoRA and adapters fine-tune less than 1% of parameters
          while achieving 95% of full fine-tuning performance.
          Module 51 covers LoRA, adapters, and prefix tuning —
          how to fine-tune a 7B parameter model on a single GPU.
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
              Next — Module 51 · NLP
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Fine-Tuning with PEFT — LoRA and Adapters
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Tune less than 1% of a model's parameters and get 95% of
              the performance. LoRA, adapters, and prefix tuning —
              when and how to use each.
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
          'BERT uses a Transformer encoder with bidirectional attention — every token attends to every other token with no causal mask. This makes it ideal for understanding tasks (classification, NER, Q&A) where context from both directions matters.',
          'BERT is pretrained with two objectives: Masked Language Modelling (predict 15% of randomly masked tokens using surrounding context) and Next Sentence Prediction (predict whether sentence B follows sentence A). RoBERTa later showed NSP hurts — train MLM only on more data.',
          'BERT input is the sum of three embeddings: token (WordPiece lookup), segment (sentence A vs B), and position (learned, 0–511). Special tokens [CLS] (start) and [SEP] (sentence separator) are always added by the tokeniser automatically.',
          'Fine-tuning pattern: for classification use the [CLS] token final hidden state → Linear(768, n_classes). For NER use every token final hidden state → Linear(768, n_labels). For Q&A predict start and end positions. All use the same pretrained backbone, different task heads.',
          'The encoder family: RoBERTa (better training recipe, no NSP) is the default when accuracy matters most. DistilBERT (40% smaller, 60% faster, 97% quality) is the default for production serving. DeBERTa achieves state of the art on NLU benchmarks. IndicBERT/MuRIL for Indian language tasks.',
          'For NER, use word_ids() to align labels to tokenised subwords. First subword of each word gets the real label. Continuation subwords (## prefix) get label -100 to be ignored in loss. Never align labels by position index — WordPiece splits change the count of tokens per word unpredictably.',
        ]}
      />
    </LearnLayout>
  )
}