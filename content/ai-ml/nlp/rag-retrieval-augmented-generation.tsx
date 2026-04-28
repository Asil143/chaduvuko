import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import {Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'RAG — Retrieval-Augmented Generation — Chaduvuko',
  description:
    'Vector databases, semantic search, chunking strategies, and the full RAG pipeline from document to answer. Build a Stripe knowledge base Q&A system.',
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

export default function RAGPage() {
  return (
    <LearnLayout
      title="RAG — Retrieval-Augmented Generation"
      description="Vector databases, semantic search, chunking strategies, and the full RAG pipeline from document to answer. Build a Stripe knowledge base Q&A system."
      section="Natural Language Processing"
      readTime="40–52 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="nlp" topic="rag-retrieval-augmented-generation" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — what problem RAG solves</span>
        <h2 style={S.h2}>
          Fine-tuning teaches a model new behaviour.
          RAG gives a model access to documents it has never seen —
          without any training at all.
        </h2>

        <p style={S.p}>
          A customer asks Stripe's support bot: "What is the settlement
          cycle for international payments?" The LLM does not know —
          this is specific to Stripe's current policy which changes
          quarterly and was never in the training data. Fine-tuning
          would require retraining every time the policy changes.
          That is expensive, slow, and impractical.
        </p>

        <p style={S.p}>
          RAG solves this differently. Before answering, it retrieves
          the most relevant sections from Stripe's documentation.
          Those sections are injected into the LLM's context window
          alongside the question. The LLM answers from the retrieved
          context — not from its weights. Update the documentation
          and the answers update instantly. No retraining. No fine-tuning.
        </p>

        <p style={S.p}>
          RAG is now the standard architecture for any application
          that needs an LLM to answer questions about private,
          recent, or frequently-updated information.
          DoorDash's internal tool answering HR policy questions,
          Amazon's product Q&A bot, Brex's financial terms assistant —
          all are RAG systems.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            An open-book exam vs a closed-book exam. Fine-tuning is
            memorising everything before the exam — works until the
            syllabus changes. RAG is the open-book exam — you bring
            the textbook and look up answers during the test.
            The student (LLM) still needs to be smart enough to
            find and synthesise the right information — but they
            do not need to memorise every fact in advance.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The retrieval step is critical — bringing the wrong textbook
            chapters into context produces wrong answers even with
            a perfect LLM. Most RAG failures are retrieval failures,
            not generation failures.
          </p>
        </AnalogyBox>
      </div>

      <Div />

      {/* ══ SECTION 2 — THE RAG PIPELINE ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The architecture</span>
        <h2 style={S.h2}>Two phases — indexing (offline) and retrieval+generation (online)</h2>

        <VisualBox label="RAG pipeline — indexing phase vs query phase">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Indexing */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
                INDEXING PHASE (offline — run once)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { step: '1. Load documents', detail: 'PDF, HTML, Markdown, database', color: '#888' },
                  { step: '2. Chunk text', detail: '500–1000 tokens per chunk', color: '#378ADD' },
                  { step: '3. Embed chunks', detail: 'text-embedding-3-small → 1536-dim vector', color: '#7b61ff' },
                  { step: '4. Store in vector DB', detail: 'FAISS, Chroma, Pinecone, Weaviate', color: '#1D9E75' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 10, background: 'var(--surface)',
                    borderRadius: 5, padding: '7px 10px',
                    border: `1px solid ${item.color}20`,
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', minWidth: 100 }}>{item.step}</span>
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.detail}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Query */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#D85A30', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
                QUERY PHASE (online — every request)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { step: '1. Receive question', detail: '"What is settlement cycle?"', color: '#888' },
                  { step: '2. Embed question', detail: 'Same embedding model as indexing', color: '#7b61ff' },
                  { step: '3. Vector search', detail: 'Top-k most similar chunks (k=3–5)', color: '#1D9E75' },
                  { step: '4. Build prompt', detail: 'System + retrieved context + question', color: '#378ADD' },
                  { step: '5. LLM generates', detail: 'Answer grounded in retrieved docs', color: '#D85A30' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 10, background: 'var(--surface)',
                    borderRadius: 5, padding: '7px 10px',
                    border: `1px solid ${item.color}20`,
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', minWidth: 100 }}>{item.step}</span>
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`# pip install faiss-cpu sentence-transformers

import numpy as np
from sentence_transformers import SentenceTransformer

# ── Stripe knowledge base — simulated documentation ─────────────────
documents = [
    {
        'id': 'settlement-001',
        'title': 'Settlement Cycle — Domestic Payments',
        'text': (
            "Stripe settles domestic payments within T+2 business days. "
            "T is the day the payment is captured. Weekends and public holidays "
            "are excluded from the settlement cycle. For example, a payment "
            "captured on Friday will be settled by the following Tuesday."
        ),
    },
    {
        'id': 'settlement-002',
        'title': 'Settlement Cycle — International Payments',
        'text': (
            "International payments on Stripe are settled within T+7 business days. "
            "Currency conversion is done at the prevailing forex rate on the day of "
            "settlement. SWIFT charges of USD 15-25 may apply per transaction."
        ),
    },
    {
        'id': 'refund-001',
        'title': 'Refund Policy',
        'text': (
            "Refunds are processed within 5-7 business days for credit cards and "
            "2-3 business days for UPI and net banking. Stripe does not charge "
            "any fee for processing refunds. Partial refunds are supported."
        ),
    },
    {
        'id': 'webhook-001',
        'title': 'Webhook Configuration',
        'text': (
            "Stripe webhooks send event notifications to your server URL. "
            "Supported events include payment.captured, payment.failed, "
            "refund.created, and order.paid. Webhooks are retried up to 3 times "
            "on failure with exponential backoff."
        ),
    },
    {
        'id': 'dispute-001',
        'title': 'Payment Disputes and Chargebacks',
        'text': (
            "When a customer disputes a payment, Stripe notifies you via webhook "
            "and dashboard. You have 7 days to submit evidence. Required documents: "
            "delivery proof, invoice, customer communication. Failure to respond "
            "results in automatic chargeback."
        ),
    },
]

# ── Step 1: Embed all documents ────────────────────────────────────────
print("Loading embedding model...")
embedder = SentenceTransformer('all-MiniLM-L6-v2')   # fast, 384-dim, free

texts      = [d['text'] for d in documents]
embeddings = embedder.encode(texts, show_progress_bar=False)
print(f"Embedded {len(documents)} documents → shape: {embeddings.shape}")

# ── Step 2: Build FAISS index ─────────────────────────────────────────
import faiss

dim   = embeddings.shape[1]   # 384
index = faiss.IndexFlatIP(dim)  # Inner product = cosine similarity (for normalised vectors)

# Normalise for cosine similarity
faiss.normalize_L2(embeddings)
index.add(embeddings)
print(f"FAISS index: {index.ntotal} vectors, dim={dim}")

# ── Step 3: Retrieve for a query ──────────────────────────────────────
def retrieve(query: str, k: int = 3) -> list[dict]:
    q_emb = embedder.encode([query])
    faiss.normalize_L2(q_emb)
    scores, indices = index.search(q_emb, k)

    results = []
    for score, idx in zip(scores[0], indices[0]):
        results.append({
            'document': documents[idx],
            'score':    float(score),
        })
    return results

# Test retrieval
queries = [
    "How long does international payment settlement take?",
    "When will my refund arrive?",
    "What happens if a customer files a dispute?",
]

print("\nRetrieval results:")
for query in queries:
    results = retrieve(query, k=2)
    print(f"\n  Q: '{query}'")
    for r in results:
        print(f"    [{r['score']:.3f}] {r['document']['title']}")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — CHUNKING STRATEGIES ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most important design decision</span>
        <h2 style={S.h2}>Chunking — how you split documents determines retrieval quality</h2>

        <p style={S.p}>
          Chunking is the single biggest lever in RAG quality.
          Too small: each chunk lacks context — the retrieved snippet
          is meaningless without surrounding text.
          Too large: the relevant sentence is buried in noise —
          the LLM hallucinates because it cannot find the answer
          in a 2000-token wall of text.
          The goal: each chunk should be semantically self-contained
          and contain exactly one answerable concept.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              strategy: 'Fixed size (character/token)',
              color: '#D85A30',
              how: 'Split every N characters or tokens. Overlap of 10-20% between chunks.',
              pros: 'Simple, predictable chunk sizes. Easy to implement.',
              cons: 'Splits mid-sentence, mid-paragraph. Destroys semantic boundaries.',
              use: 'Quick prototype only. Never use in production.',
              size: '500–1000 tokens, 100–200 overlap',
            },
            {
              strategy: 'Recursive character splitting',
              color: '#BA7517',
              how: 'Split on paragraphs first, then sentences, then words — trying to preserve semantic units.',
              pros: 'Better semantic boundaries than fixed-size. Standard LangChain default.',
              cons: 'Still splits on arbitrary boundaries. No understanding of document structure.',
              use: 'Good general-purpose default for most documents.',
              size: '500 tokens, 50 overlap',
            },
            {
              strategy: 'Semantic chunking',
              color: '#1D9E75',
              how: 'Embed consecutive sentences. Split where embedding distance jumps — indicating a topic change.',
              pros: 'Each chunk is semantically coherent. Best retrieval quality.',
              cons: 'Slower (requires embedding all sentences). Variable chunk sizes.',
              use: 'Production RAG where quality matters more than speed.',
              size: 'Variable — split at semantic boundaries',
            },
            {
              strategy: 'Document-structure aware',
              color: '#7b61ff',
              how: 'Use headings, sections, and document structure to define chunks. Each section = one chunk.',
              pros: 'Perfect for structured documents (API docs, manuals, legal).',
              cons: 'Requires document structure metadata. Chunks vary wildly in size.',
              use: 'Technical documentation, legal documents, product manuals.',
              size: 'One section per chunk',
            },
          ].map((item) => (
            <div key={item.strategy} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '11px 14px',
              borderLeft: `3px solid ${item.color}`,
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)' }}>
                  {item.strategy}
                </span>
                <span style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)', background: `${item.color}15`, padding: '2px 7px', borderRadius: 3 }}>
                  {item.size}
                </span>
              </div>
              <p style={{ ...S.ps, marginBottom: 4 }}>{item.how}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div style={{ fontSize: 11, color: '#1D9E75' }}>✓ {item.pros}</div>
                <div style={{ fontSize: 11, color: '#ff4757' }}>✗ {item.cons}</div>
              </div>
              <div style={{ fontSize: 11, color: item.color, marginTop: 5 }}>Use: {item.use}</div>
            </div>
          ))}
        </div>

        <CodeBlock code={`import re
import numpy as np
from sentence_transformers import SentenceTransformer

# ── Three chunking strategies on the same document ────────────────────
razorpay_doc = """
# Stripe Settlement Guide

## Domestic Settlements
Stripe settles domestic payments within T+2 business days. T is the day
the payment is captured. Weekends and public holidays are excluded from
the settlement cycle. For example, a payment captured on Friday will be
settled by the following Tuesday.

The minimum settlement amount is Rs 100. Settlements below this threshold
are carried forward to the next settlement cycle. You can view all pending
settlements in the Stripe Dashboard under Settlements > Pending.

## International Settlements
International payments are settled within T+7 business days. Currency
conversion is done at the prevailing forex rate on the day of settlement.
SWIFT charges of USD 15-25 may apply per transaction depending on your
bank. Contact support@razorpay.com for bulk international settlement rates.

## Settlement Disputes
If you believe a settlement amount is incorrect, raise a dispute within
30 days of the settlement date. Provide your settlement ID and bank
statement showing the received amount. Resolution typically takes 5-7
business days.
"""

# ── Strategy 1: Fixed-size chunking ───────────────────────────────────
def fixed_size_chunks(text, chunk_size=200, overlap=40):
    words  = text.split()
    chunks = []
    i = 0
    while i < len(words):
        chunk = ' '.join(words[i:i+chunk_size])
        chunks.append(chunk)
        i += chunk_size - overlap
    return chunks

fixed_chunks = fixed_size_chunks(razorpay_doc)
print(f"Fixed-size chunking: {len(fixed_chunks)} chunks")
for i, c in enumerate(fixed_chunks[:2]):
    print(f"  Chunk {i+1} ({len(c.split())} words): '{c[:80]}...'")

# ── Strategy 2: Recursive character splitting ─────────────────────────
def recursive_split(text, max_tokens=150, separators=['\n\n', '\n', '. ', ' ']):
    if len(text.split()) <= max_tokens:
        return [text.strip()] if text.strip() else []
    for sep in separators:
        parts = text.split(sep)
        if len(parts) > 1:
            chunks = []
            current = ''
            for part in parts:
                candidate = current + sep + part if current else part
                if len(candidate.split()) <= max_tokens:
                    current = candidate
                else:
                    if current:
                        chunks.append(current.strip())
                    current = part
            if current:
                chunks.append(current.strip())
            return [c for c in chunks if c]
    return [text.strip()]

recursive_chunks = recursive_split(razorpay_doc)
print(f"\nRecursive splitting: {len(recursive_chunks)} chunks")
for i, c in enumerate(recursive_chunks[:2]):
    print(f"  Chunk {i+1} ({len(c.split())} words): '{c[:80]}...'")

# ── Strategy 3: Semantic chunking ─────────────────────────────────────
def semantic_chunks(text, embedder, threshold=0.3):
    sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', text) if s.strip()]
    if len(sentences) <= 1:
        return sentences

    embs = embedder.encode(sentences)

    # Compute cosine similarity between adjacent sentences
    chunks, current = [], [sentences[0]]
    for i in range(1, len(sentences)):
        sim = np.dot(embs[i-1], embs[i]) / (
            np.linalg.norm(embs[i-1]) * np.linalg.norm(embs[i]) + 1e-8
        )
        if sim < threshold:   # low similarity = topic change = new chunk
            chunks.append(' '.join(current))
            current = [sentences[i]]
        else:
            current.append(sentences[i])
    if current:
        chunks.append(' '.join(current))
    return chunks

embedder       = SentenceTransformer('all-MiniLM-L6-v2')
semantic       = semantic_chunks(razorpay_doc, embedder, threshold=0.4)
print(f"\nSemantic chunking: {len(semantic)} chunks")
for i, c in enumerate(semantic[:2]):
    print(f"  Chunk {i+1} ({len(c.split())} words): '{c[:80]}...'")

print(f"\nChunk count comparison:")
print(f"  Fixed-size:   {len(fixed_chunks)}")
print(f"  Recursive:    {len(recursive_chunks)}")
print(f"  Semantic:     {len(semantic)}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — VECTOR DATABASES ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Storing and searching embeddings</span>
        <h2 style={S.h2}>FAISS, Chroma, and Pinecone — which vector database to use</h2>

        <p style={S.p}>
          A vector database stores embedding vectors and supports
          approximate nearest neighbour (ANN) search — finding the
          k most similar vectors to a query vector in milliseconds,
          even across millions of documents. Every RAG system uses one.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            {
              name: 'FAISS',
              type: 'In-memory library',
              color: '#378ADD',
              by: 'Meta',
              scale: 'Up to ~10M vectors',
              persistence: 'Manual (save/load index)',
              metadata: 'No — external dict needed',
              cost: 'Free, open source',
              use: 'Prototyping, small-medium production, embedded in Python apps.',
            },
            {
              name: 'Chroma',
              type: 'Embedded DB',
              color: '#1D9E75',
              by: 'Chroma',
              scale: 'Up to ~1M vectors',
              persistence: 'Automatic (local or server)',
              metadata: 'Yes — rich filtering',
              cost: 'Free, open source',
              use: 'Local development, small production. Best for getting started fast.',
            },
            {
              name: 'Pinecone',
              type: 'Managed cloud DB',
              color: '#7b61ff',
              by: 'Pinecone',
              scale: 'Billions of vectors',
              persistence: 'Automatic (cloud)',
              metadata: 'Yes — full filtering',
              cost: 'Free tier, then paid',
              use: 'Production at scale. No infrastructure management. Multi-tenant apps.',
            },
          ].map((item) => (
            <div key={item.name} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '12px 12px',
              borderLeft: `3px solid ${item.color}`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 4 }}>
                {item.name}
              </div>
              <div style={{ fontSize: 10, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                {item.type} · {item.by}
              </div>
              {[
                ['Scale', item.scale],
                ['Persistence', item.persistence],
                ['Metadata', item.metadata],
                ['Cost', item.cost],
              ].map(([k, v]) => (
                <div key={k} style={{ marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{k}: </span>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{v}</span>
                </div>
              ))}
              <div style={{ fontSize: 11, color: item.color, marginTop: 6, fontStyle: 'italic' }}>{item.use}</div>
            </div>
          ))}
        </div>

        <CodeBlock code={`# ── FAISS — in-memory, no dependencies beyond faiss-cpu ─────────────
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import json, pickle

embedder = SentenceTransformer('all-MiniLM-L6-v2')

# Sample Stripe knowledge base
chunks = [
    {'id': '1', 'text': 'Domestic settlement takes T+2 business days.', 'source': 'settlement-guide'},
    {'id': '2', 'text': 'International settlement takes T+7 business days.', 'source': 'settlement-guide'},
    {'id': '3', 'text': 'Refunds for UPI take 2-3 business days.', 'source': 'refund-policy'},
    {'id': '4', 'text': 'Webhooks retry up to 3 times on failure.', 'source': 'webhook-docs'},
    {'id': '5', 'text': 'Disputes must be responded to within 7 days.', 'source': 'dispute-guide'},
    {'id': '6', 'text': 'Minimum settlement amount is Rs 100.', 'source': 'settlement-guide'},
]

texts = [c['text'] for c in chunks]
embs  = embedder.encode(texts, normalize_embeddings=True)

dim   = embs.shape[1]
index = faiss.IndexFlatIP(dim)
index.add(embs)

# Save index and metadata
faiss.write_index(index, '/tmp/razorpay.index')
with open('/tmp/razorpay_meta.pkl', 'wb') as f:
    pickle.dump(chunks, f)
print(f"FAISS index saved: {index.ntotal} vectors")

# Load and search
loaded_index = faiss.read_index('/tmp/razorpay.index')
with open('/tmp/razorpay_meta.pkl', 'rb') as f:
    loaded_chunks = pickle.load(f)

def faiss_search(query, k=3):
    q = embedder.encode([query], normalize_embeddings=True)
    scores, idxs = loaded_index.search(q, k)
    return [(loaded_chunks[i], float(s)) for s, i in zip(scores[0], idxs[0])]

# ── Chroma — persistent, metadata filtering ───────────────────────────
try:
    import chromadb

    client     = chromadb.PerforceClient(path='/tmp/razorpay_chroma')
    collection = client.get_or_create_collection(
        name='razorpay_kb',
        metadata={'hnsw:space': 'cosine'},
    )

    # Add documents with metadata
    collection.add(
        ids       = [c['id'] for c in chunks],
        documents = [c['text'] for c in chunks],
        metadatas = [{'source': c['source']} for c in chunks],
    )

    # Query with metadata filter
    results = collection.query(
        query_texts=['How long does settlement take?'],
        n_results=3,
        where={'source': 'settlement-guide'},   # filter by source
    )
    print(f"\nChroma results (filtered to settlement-guide):")
    for doc, dist in zip(results['documents'][0], results['distances'][0]):
        print(f"  [{1-dist:.3f}] {doc}")
except ImportError:
    print("\nchromadb not installed: pip install chromadb")

# ── FAISS search test ─────────────────────────────────────────────────
print("\nFAISS search results:")
for chunk, score in faiss_search("settlement timeline", k=3):
    print(f"  [{score:.3f}] {chunk['text']}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — FULL RAG PIPELINE ═══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Putting it all together</span>
        <h2 style={S.h2}>Complete RAG system — Stripe knowledge base Q&A</h2>

        <ConceptBox title="The RAG prompt — structure matters as much as retrieval" color="#1D9E75">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.9 }}>
            <div style={{ color: '#888', marginBottom: 6 }}>System prompt:</div>
            <div style={{ color: '#1D9E75', paddingLeft: 12, marginBottom: 10 }}>
              "You are a Stripe support assistant. Answer questions using ONLY
              the provided context. If the answer is not in the context, say
              'I don't have that information in my knowledge base.'
              Do not make up information."
            </div>
            <div style={{ color: '#888', marginBottom: 6 }}>User prompt:</div>
            <div style={{ color: '#378ADD', paddingLeft: 12 }}>
              "Context:\n[chunk 1]\n[chunk 2]\n[chunk 3]\n\nQuestion: {'{'}user_question{'}'}"
            </div>
          </div>
          <p style={{ ...S.ps, marginBottom: 0, marginTop: 10, fontSize: 11 }}>
            Grounding instruction prevents hallucination. Without it, the LLM
            will blend retrieved context with its own (potentially wrong) training knowledge.
          </p>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
import faiss
import pickle
from sentence_transformers import SentenceTransformer

# ── Complete RAG pipeline from scratch ────────────────────────────────

class RAGPipeline:
    def __init__(self, embedding_model='all-MiniLM-L6-v2'):
        self.embedder = SentenceTransformer(embedding_model)
        self.index    = None
        self.chunks   = []

    # ── INDEXING ──────────────────────────────────────────────────────
    def add_documents(self, documents: list[dict], chunk_size=100):
        """
        documents: list of {'title': str, 'text': str, 'source': str}
        Chunks each document and adds to FAISS index.
        """
        all_chunks = []
        for doc in documents:
            words  = doc['text'].split()
            overlap = 20
            i = 0
            while i < len(words):
                chunk_text = ' '.join(words[i:i+chunk_size])
                all_chunks.append({
                    'text':   chunk_text,
                    'source': doc.get('source', ''),
                    'title':  doc.get('title', ''),
                })
                i += chunk_size - overlap

        self.chunks = all_chunks
        texts = [c['text'] for c in all_chunks]
        embs  = self.embedder.encode(texts, normalize_embeddings=True,
                                      show_progress_bar=False)

        dim         = embs.shape[1]
        self.index  = faiss.IndexFlatIP(dim)
        self.index.add(embs)
        print(f"Indexed {len(all_chunks)} chunks from {len(documents)} documents")

    # ── RETRIEVAL ─────────────────────────────────────────────────────
    def retrieve(self, query: str, k: int = 3) -> list[dict]:
        if self.index is None:
            raise RuntimeError("No documents indexed. Call add_documents() first.")
        q_emb = self.embedder.encode([query], normalize_embeddings=True)
        scores, idxs = self.index.search(q_emb, k)
        return [
            {**self.chunks[i], 'score': float(s)}
            for s, i in zip(scores[0], idxs[0])
            if i >= 0
        ]

    # ── GENERATION ────────────────────────────────────────────────────
    def build_prompt(self, query: str, retrieved: list[dict]) -> str:
        context = '\n\n'.join([
            f"[{i+1}] (Source: {r['source']})\n{r['text']}"
            for i, r in enumerate(retrieved)
        ])
        return f"""You are a Stripe support assistant. Answer using ONLY the context below.
If the answer is not in the context, say "I don't have that information."

Context:
{context}

Question: {query}
Answer:"""

    def answer(self, query: str, k: int = 3,
                llm_fn=None) -> dict:
        """
        Full RAG: retrieve + generate.
        llm_fn: callable(prompt) -> str. If None, returns prompt only.
        """
        retrieved = self.retrieve(query, k=k)
        prompt    = self.build_prompt(query, retrieved)

        if llm_fn:
            answer = llm_fn(prompt)
        else:
            # Without LLM — show what would be sent
            answer = "[LLM would generate here — see prompt below]"

        return {
            'query':     query,
            'retrieved': retrieved,
            'prompt':    prompt,
            'answer':    answer,
        }

# ── Build the Stripe knowledge base ────────────────────────────────
rag = RAGPipeline()

knowledge_base = [
    {
        'title':  'Settlement Guide',
        'source': 'settlement-guide',
        'text': (
            "Stripe settles domestic payments within T+2 business days. "
            "T is the day the payment is captured. Weekends and public holidays "
            "are excluded. International payments settle within T+7 business days. "
            "Minimum settlement amount is Rs 100. Amounts below this carry forward. "
            "Currency conversion uses prevailing forex rate on settlement day. "
            "SWIFT charges of USD 15-25 may apply to international settlements."
        ),
    },
    {
        'title':  'Refund Policy',
        'source': 'refund-policy',
        'text': (
            "Refunds are processed within 5-7 business days for credit cards. "
            "UPI and net banking refunds take 2-3 business days. "
            "Stripe charges no fee for processing refunds. "
            "Partial refunds are supported for all payment methods. "
            "Refund status can be tracked in the Stripe Dashboard."
        ),
    },
    {
        'title':  'Dispute Resolution',
        'source': 'dispute-guide',
        'text': (
            "When a customer disputes a payment, Stripe notifies you via webhook. "
            "You have 7 days to submit evidence via the Dashboard. "
            "Required documents: delivery proof, invoice, customer communication. "
            "Failure to respond results in automatic chargeback. "
            "Resolved disputes are settled within 30-45 days."
        ),
    },
    {
        'title':  'Webhook Configuration',
        'source': 'webhook-docs',
        'text': (
            "Webhooks send event notifications to your server URL. "
            "Supported events: payment.captured, payment.failed, refund.created, order.paid. "
            "Webhooks retry up to 3 times on failure with exponential backoff. "
            "Verify webhook signatures using your webhook secret. "
            "Webhook secret is available in Stripe Dashboard > Settings > Webhooks."
        ),
    },
]

rag.add_documents(knowledge_base)

# ── Test queries ───────────────────────────────────────────────────────
test_queries = [
    "How long does international settlement take?",
    "What documents do I need for a dispute?",
    "How many times does a webhook retry?",
    "What is the fee for refunds?",
    "How do I configure SSL certificates?",   # out-of-scope query
]

print("\nRAG Pipeline Results:")
print("=" * 60)

for query in test_queries:
    result = rag.answer(query, k=2)
    print(f"\nQ: {query}")
    print(f"Retrieved:")
    for r in result['retrieved']:
        print(f"  [{r['score']:.3f}] {r['source']}: {r['text'][:60]}...")
    print(f"Prompt (first 200 chars): {result['prompt'][:200]}...")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — RAG WITH A REAL LLM ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Connecting to an LLM</span>
        <h2 style={S.h2}>RAG with OpenAI, Groq, and local models — production patterns</h2>

        <CodeBlock code={`# ── RAG with different LLM backends ──────────────────────────────────

# ── Option 1: OpenAI API ──────────────────────────────────────────────
def openai_rag(prompt: str, model='gpt-3.5-turbo') -> str:
    """
    pip install openai
    import openai; client = openai.OpenAI(api_key=os.environ['OPENAI_API_KEY'])
    """
    # client = openai.OpenAI()
    # response = client.chat.completions.create(
    #     model=model,
    #     messages=[{'role': 'user', 'content': prompt}],
    #     temperature=0,   # deterministic — important for factual Q&A
    #     max_tokens=300,
    # )
    # return response.choices[0].message.content
    return "[OpenAI response]"

# ── Option 2: Groq API (fast, free tier) ─────────────────────────────
def groq_rag(prompt: str, model='llama-3.3-70b-versatile') -> str:
    """
    pip install groq
    Get free API key from console.groq.com
    """
    # from groq import Groq
    # client  = Groq(api_key=os.environ['GROQ_API_KEY'])
    # response = client.chat.completions.create(
    #     model=model,
    #     messages=[
    #         {'role': 'system', 'content': 'Answer using only the provided context.'},
    #         {'role': 'user',   'content': prompt},
    #     ],
    #     temperature=0,
    #     max_tokens=300,
    # )
    # return response.choices[0].message.content
    return "[Groq response]"

# ── Option 3: Local model with Ollama ─────────────────────────────────
def ollama_rag(prompt: str, model='llama3') -> str:
    """
    Install: https://ollama.com
    Run:     ollama pull llama3
    pip install ollama
    """
    # import ollama
    # response = ollama.chat(
    #     model=model,
    #     messages=[{'role': 'user', 'content': prompt}],
    # )
    # return response['message']['content']
    return "[Ollama response]"

# ── Production RAG with streaming ─────────────────────────────────────
def rag_with_streaming(rag_pipeline, query, llm_client=None):
    """
    Stream the answer token by token — better UX than waiting for full response.
    """
    retrieved = rag_pipeline.retrieve(query, k=3)
    prompt    = rag_pipeline.build_prompt(query, retrieved)

    print(f"Q: {query}")
    print(f"Retrieved {len(retrieved)} chunks (top score: {retrieved[0]['score']:.3f})")
    print(f"Answer: ", end='', flush=True)

    # With OpenAI streaming:
    # stream = client.chat.completions.create(
    #     model='gpt-3.5-turbo',
    #     messages=[{'role': 'user', 'content': prompt}],
    #     stream=True,
    # )
    # for chunk in stream:
    #     if chunk.choices[0].delta.content:
    #         print(chunk.choices[0].delta.content, end='', flush=True)
    # print()

    print("[streaming answer would appear here token by token]")
    return {'query': query, 'sources': [r['source'] for r in retrieved]}

# ── Citation tracking — which sources were used ───────────────────────
def rag_with_citations(rag_pipeline, query, k=3):
    """
    Return answer with source citations — important for trust and debugging.
    """
    retrieved = rag_pipeline.retrieve(query, k=k)

    # Add citation markers to context
    context_with_refs = '\n\n'.join([
        f"[{i+1}] {r['text']}"
        for i, r in enumerate(retrieved)
    ])

    prompt = f"""Answer the question using the numbered sources below.
After your answer, list which source numbers [1], [2], [3] you used.

{context_with_refs}

Question: {query}
Answer (with citations):"""

    return {
        'query':   query,
        'prompt':  prompt,
        'sources': [{'id': i+1, 'source': r['source'], 'text': r['text'][:100]}
                    for i, r in enumerate(retrieved)],
    }

# Test citation RAG
from sentence_transformers import SentenceTransformer
import faiss

# Rebuild rag (in a real app this would be the persistent rag object)
rag2 = RAGPipeline()
rag2.add_documents(knowledge_base)

result = rag_with_citations(rag2, "What is the settlement timeline for international payments?")
print(f"\nCitation RAG:")
print(f"  Sources retrieved:")
for s in result['sources']:
    print(f"    [{s['id']}] {s['source']}: {s['text']}...")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common RAG mistake — explained and fixed</h2>

        <ErrorBlock
          error="RAG retrieves the wrong chunks — relevant documents exist but are not returned"
          cause="Embedding model mismatch: the query embedding and document embeddings were produced by different models, or different normalisation was applied. Also caused by chunking that splits key information across chunk boundaries — a question about settlement timelines retrieves a chunk that mentions settlement but not the timeline. Or the query is too short and lacks enough signal for semantic search."
          fix="Always use the same embedding model for indexing and querying — never mix models. Use normalise_embeddings=True consistently for cosine similarity. For short queries, expand them with hypothetical document embeddings (HyDE): generate a hypothetical answer with the LLM, embed that, search with it — produces much richer query embeddings. Add overlap between chunks (20%) to prevent key information from being split."
        />

        <ErrorBlock
          error="LLM ignores retrieved context and answers from training knowledge instead"
          cause="The system prompt does not strongly enough instruct the LLM to use only the provided context. LLMs default to their training knowledge when the instruction is weak ('use the following context') vs strong ('answer ONLY using the context below — if the answer is not there, say you do not know'). Also caused by temperature > 0 — higher temperature increases creativity and hallucination."
          fix="Use a strong grounding instruction: 'Answer ONLY using the context. Do not use any other knowledge.' Set temperature=0 for factual Q&A — this makes the model deterministic and less likely to hallucinate. Add a fallback instruction: 'If the answer is not in the context, say exactly: I do not have that information in my knowledge base.' Test with questions that have no answer in the knowledge base to verify the model correctly refuses."
        />

        <ErrorBlock
          error="FAISS search returns wrong results after saving and reloading the index"
          cause="The document metadata (chunk texts, sources) was not saved alongside the FAISS index. FAISS only stores the float vectors — it has no knowledge of what each vector represents. After reloading, the index returns integer indices but you have no mapping from index position back to document text. Also: FAISS IndexFlatIP vs IndexFlatL2 mismatch between save and load."
          fix="Always save metadata separately alongside the FAISS index: faiss.write_index(index, 'index.faiss') and pickle.dump(chunks, open('chunks.pkl','wb')). Load both together. Always use the same index type (IndexFlatIP for normalised cosine, IndexFlatL2 for Euclidean). Consider using Chroma instead — it handles metadata persistence automatically."
        />

        <ErrorBlock
          error="RAG answers are correct but include information not in the retrieved chunks"
          cause="The LLM is blending retrieved context with its own training knowledge. The generation step is not strictly grounded. Happens with models that have strong priors about the topic (e.g. GPT-4 knows a lot about payments) and will fill in gaps from memory even when instructed not to. Also: context window is too large — with many retrieved chunks the model loses track of the grounding instruction."
          fix="Reduce k (number of retrieved chunks) to 2-3 and ensure each chunk is directly relevant. Add post-processing: after generation, check each factual claim against the retrieved chunks — if a claim is not in any chunk, flag it as potentially hallucinated. Use a smaller, less opinionated model for grounded Q&A. Explicitly state 'every fact in your answer must appear verbatim or paraphrased from the context.'"
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can build a RAG system. Next: get better answers
          by engineering better prompts.
        </h2>

        <p style={S.p}>
          RAG handles the retrieval problem — getting relevant context
          into the LLM's window. But the quality of the generated answer
          also depends heavily on how the prompt is structured.
          Zero-shot, few-shot, chain-of-thought, ReAct —
          each prompting pattern consistently improves LLM outputs
          for different task types. Module 53 covers the patterns
          that actually work in production with real before/after examples.
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
              Next — Module 53 · NLP
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Prompt Engineering
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Zero-shot, few-shot, chain-of-thought, ReAct —
              the patterns that consistently improve LLM outputs,
              with real before/after examples for every technique.
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
          'RAG gives an LLM access to documents it has never seen without any training. The pipeline has two phases: indexing (chunk documents → embed → store in vector DB, run once) and querying (embed question → vector search → retrieve top-k chunks → inject into LLM prompt → generate answer, runs on every request).',
          'Chunking is the single biggest lever in RAG quality. Fixed-size chunking is simple but breaks semantic boundaries. Recursive character splitting is the practical default. Semantic chunking (split where embedding similarity drops) produces the best retrieval quality. Use 500–1000 tokens per chunk with 10–20% overlap to prevent key information from being split.',
          'FAISS is the standard in-memory vector library for small-to-medium datasets. Chroma adds metadata filtering and automatic persistence. Pinecone is managed cloud for production scale. Always use the same embedding model and normalisation at index time and query time — mismatches silently produce wrong retrieval results.',
          'The RAG prompt must include a strong grounding instruction: "Answer ONLY using the context below. If the answer is not in the context, say you do not have that information." Without this the LLM blends retrieved context with its own training knowledge and hallucinates. Set temperature=0 for factual Q&A.',
          'Most RAG failures are retrieval failures not generation failures. If the LLM gives wrong answers, check what was retrieved first — print the top-k chunks. HyDE (Hypothetical Document Embeddings) improves retrieval for short or ambiguous queries: generate a hypothetical answer first, embed that, use it as the search vector.',
          'Add citation tracking in production: number the retrieved chunks in the prompt and ask the LLM to cite which sources it used in its answer. This makes hallucination visible — if the LLM cites source [3] but source [3] does not contain the claimed fact, it hallucinated. Enables automatic fact-checking post-generation.',
        ]}
      />
    </LearnLayout>
  )
}