import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Advanced RAG — Reranking, Hybrid Search and Evaluation — Chaduvuko',
  description:
    'Reranking retrieved chunks, hybrid dense-sparse search, RAG evaluation metrics, and the patterns that separate production RAG from toy RAG.',
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

export default function AdvancedRAGPage() {
  return (
    <LearnLayout
      title="Advanced RAG — Reranking, Hybrid Search and Evaluation"
      description="Reranking retrieved chunks, hybrid dense-sparse search, RAG evaluation metrics, and the patterns that separate production RAG from toy RAG."
      section="Generative AI"
      readTime="36–46 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="generative-ai" topic="advanced-rag" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — where naive RAG breaks</span>
        <h2 style={S.h2}>
          Module 52 built a working RAG pipeline.
          This module explains why it fails in production and how
          to fix every failure mode systematically.
        </h2>

        <p style={S.p}>
          Naive RAG — embed query, retrieve top-k chunks by cosine similarity,
          inject into LLM prompt — works well in demos and poorly in production.
          The problems are consistent: semantic search alone misses exact keyword
          matches that users expect. The top retrieved chunks are often related
          to the query but do not actually answer it. Evaluation is absent —
          you do not know if the system is getting better or worse as you iterate.
        </p>

        <p style={S.p}>
          A Stripe knowledge base assistant built with naive RAG will struggle
          with queries like "what is error code 400?" — semantic search finds
          chunks about general payment errors (semantically similar) but misses
          the chunk that contains exactly "400" (keyword match). It will struggle
          with queries that require synthesising across multiple chunks.
          It will hallucinate when the retrieved chunks are tangentially related
          but do not contain the answer. And the team will have no objective way
          to know which of these failures is happening most.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A good research librarian does two things a bad one does not.
            First: when you ask "find me information about UPI payment limits,"
            they search both the subject index (semantic) and the keyword catalogue
            (exact match) — not just one. Second: after gathering candidates,
            they skim each one to pick the three most directly relevant —
            they rerank. A naive RAG pipeline skips both steps.
            Hybrid search is the librarian searching two catalogues.
            Reranking is the librarian reading before recommending.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            Adding a reranker alone typically improves end-to-end RAG quality
            by 10–25% with minimal engineering effort. It is the single
            highest-leverage improvement you can make to a naive RAG system.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          Install: <span style={S.code as React.CSSProperties}>pip install sentence-transformers faiss-cpu rank-bm25 ragas</span>.
          This module uses open-source tools throughout — no paid API required
          for the retrieval and evaluation components.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — HYBRID SEARCH ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Fixing retrieval</span>
        <h2 style={S.h2}>Hybrid search — dense semantic + sparse keyword, combined with RRF</h2>

        <p style={S.p}>
          Dense retrieval (embedding similarity) excels at semantic matching —
          it finds chunks about "payment declined" when the query is
          "transaction rejected." But it fails at exact keyword matching —
          "error code BAD_REQUEST_ERROR" might retrieve irrelevant chunks
          because the semantic embedding averages across all words.
          Sparse retrieval (BM25) excels at exact term matching but misses
          synonyms and paraphrases. Hybrid search combines both signals.
        </p>

        <ConceptBox title="Reciprocal Rank Fusion — combining two ranked lists">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.2 }}>
            <div style={{ color: '#888', marginBottom: 6, fontSize: 11 }}>For each document d, compute its RRF score:</div>
            <div style={{ color: '#7b61ff', paddingLeft: 12, marginBottom: 8 }}>
              RRF(d) = Σ 1 / (k + rank_in_list_i(d))
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11, color: 'var(--muted)', paddingLeft: 12, marginTop: 4 }}>
              <div>k = 60  (constant that prevents top ranks from dominating)</div>
              <div>rank_in_list_i = rank of document d in retrieval list i (1-indexed)</div>
              <div>Sum over all retrieval lists (e.g. dense list + sparse list)</div>
              <div style={{ color: '#1D9E75', marginTop: 4 }}>
                RRF needs no tuning — k=60 works well across all retrieval tasks
              </div>
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
import faiss
from rank_bm25 import BM25Okapi
from sentence_transformers import SentenceTransformer
import re

# ── Stripe knowledge base ───────────────────────────────────────────
KB_CHUNKS = [
    {'id': '1', 'text': 'Stripe domestic payments settle within T+2 business days. Settlement excludes weekends and public holidays.'},
    {'id': '2', 'text': 'International payments on Stripe settle within T+7 business days with SWIFT charges of USD 15-25.'},
    {'id': '3', 'text': 'Error code BAD_REQUEST_ERROR occurs when mandatory payment parameters are missing or invalid in the API call.'},
    {'id': '4', 'text': 'Error code GATEWAY_ERROR indicates the bank gateway timed out. Retry the payment after 5 minutes.'},
    {'id': '5', 'text': 'Error code BAD_REQUEST_ERROR with description invalid_api_key means the API key is incorrect or expired.'},
    {'id': '6', 'text': 'Refunds for UPI payments take 2-3 business days. Credit card refunds take 5-7 business days.'},
    {'id': '7', 'text': 'Webhook signature verification uses HMAC SHA256. Compute the signature using the webhook secret from dashboard.'},
    {'id': '8', 'text': 'The Stripe payment link expires after 15 minutes by default. Custom expiry can be set via the API.'},
    {'id': '9', 'text': 'Stripe supports UPI, credit cards, debit cards, net banking, and wallets as payment methods.'},
    {'id': '10', 'text': 'To enable international payments on Stripe, submit KYC documents and business registration proof.'},
]

texts = [c['text'] for c in KB_CHUNKS]

# ── Dense retrieval — FAISS ───────────────────────────────────────────
embedder   = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = embedder.encode(texts, normalize_embeddings=True)
dense_index = faiss.IndexFlatIP(embeddings.shape[1])
dense_index.add(embeddings)

def dense_search(query: str, k: int = 5) -> list[dict]:
    q_emb = embedder.encode([query], normalize_embeddings=True)
    scores, indices = dense_index.search(q_emb, k)
    return [{'id': KB_CHUNKS[i]['id'], 'rank': r+1, 'score': float(s)}
            for r, (i, s) in enumerate(zip(indices[0], scores[0]))]

# ── Sparse retrieval — BM25 ───────────────────────────────────────────
tokenised = [re.sub(r'[^\w\s]', '', t.lower()).split() for t in texts]
bm25      = BM25Okapi(tokenised)

def sparse_search(query: str, k: int = 5) -> list[dict]:
    q_tokens = re.sub(r'[^\w\s]', '', query.lower()).split()
    scores   = bm25.get_scores(q_tokens)
    top_idx  = scores.argsort()[::-1][:k]
    return [{'id': KB_CHUNKS[i]['id'], 'rank': r+1, 'score': float(scores[i])}
            for r, i in enumerate(top_idx)]

# ── Reciprocal Rank Fusion ────────────────────────────────────────────
def rrf_fusion(ranked_lists: list[list[dict]], k: int = 60) -> list[dict]:
    """
    Combine multiple ranked lists using Reciprocal Rank Fusion.
    ranked_lists: list of lists, each containing {'id': str, 'rank': int}
    Returns: merged list sorted by RRF score descending
    """
    rrf_scores: dict[str, float] = {}
    for ranked_list in ranked_lists:
        for item in ranked_list:
            doc_id = item['id']
            rank   = item['rank']
            rrf_scores[doc_id] = rrf_scores.get(doc_id, 0) + 1 / (k + rank)

    sorted_docs = sorted(rrf_scores.items(), key=lambda x: x[1], reverse=True)
    return [{'id': doc_id, 'rrf_score': score, 'rank': i+1}
            for i, (doc_id, score) in enumerate(sorted_docs)]

def hybrid_search(query: str, k_retrieve: int = 5, k_return: int = 3) -> list[dict]:
    """Full hybrid search pipeline."""
    dense_results  = dense_search(query, k=k_retrieve)
    sparse_results = sparse_search(query, k=k_retrieve)
    fused          = rrf_fusion([dense_results, sparse_results])

    # Attach chunk text to results
    id_to_chunk = {c['id']: c for c in KB_CHUNKS}
    return [
        {**r, 'text': id_to_chunk[r['id']]['text']}
        for r in fused[:k_return]
        if r['id'] in id_to_chunk
    ]

# ── Compare retrieval approaches ──────────────────────────────────────
test_queries = [
    ("What is error code BAD_REQUEST_ERROR?",
     "3",   # expects chunk about BAD_REQUEST_ERROR specifically
     "keyword-heavy — BM25 advantage"),
    ("How long until my money arrives after payment?",
     "1",   # expects settlement timeline chunk
     "semantic — dense advantage"),
    ("international payment setup",
     "10",  # expects KYC/international setup chunk
     "mixed"),
]

print(f"{'Query':<45} {'Dense':>8} {'Sparse':>8} {'Hybrid':>8} {'Expected'}")
print("─" * 75)
for query, expected_id, query_type in test_queries:
    dense_top  = dense_search(query, k=3)[0]['id']
    sparse_top = sparse_search(query, k=3)[0]['id']
    hybrid_top = hybrid_search(query, k_retrieve=5, k_return=3)[0]['id']

    d_mark = '✓' if dense_top  == expected_id else '✗'
    s_mark = '✓' if sparse_top == expected_id else '✗'
    h_mark = '✓' if hybrid_top == expected_id else '✗'

    print(f"  {query[:43]:<45} {d_mark}  #{dense_top}  {s_mark}  #{sparse_top}  {h_mark}  #{hybrid_top}  (exp #{expected_id})")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — RERANKING ═══════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The highest-leverage improvement</span>
        <h2 style={S.h2}>Cross-encoder reranking — score every chunk against the query precisely</h2>

        <p style={S.p}>
          Bi-encoder retrieval (embedding similarity) is fast because query
          and document are encoded independently — you embed the query once
          and compare to pre-computed document embeddings.
          But this independence is also a weakness: the model cannot consider
          the specific interaction between a query word and a document word.
          A cross-encoder takes both query and document as a single input
          and computes a relevance score from their full interaction —
          much more accurate, but too slow to use on every document in the corpus.
        </p>

        <p style={S.p}>
          The solution is a two-stage pipeline: use bi-encoder retrieval to
          quickly narrow down to top-100 candidates, then use a cross-encoder
          to precisely rerank those 100 candidates to find the true top-3.
          The cross-encoder only runs on 100 documents per query, not millions,
          so the extra latency is acceptable.
        </p>

        <VisualBox label="Two-stage retrieval — bi-encoder coarse + cross-encoder fine">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { stage: 'Stage 1 — Bi-encoder retrieval', color: '#378ADD', detail: 'Embed query → cosine similarity → top-100 candidates. Fast: 10ms. Approximate.', latency: '~10ms' },
              { stage: 'Stage 2 — Cross-encoder reranking', color: '#7b61ff', detail: 'Feed (query, chunk) pairs to cross-encoder → precise relevance score. Slow: 200ms for 100 docs.', latency: '~200ms' },
              { stage: 'Stage 3 — Return top-k reranked', color: '#1D9E75', detail: 'Take top-3 from reranked list → inject into LLM prompt. Precision dramatically improved.', latency: '~0ms' },
            ].map((item) => (
              <div key={item.stage} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 6, padding: '9px 12px',
                display: 'grid', gridTemplateColumns: '260px 1fr 80px',
                gap: 10, alignItems: 'center',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: item.color }}>{item.stage}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{item.detail}</span>
                <span style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', textAlign: 'right' as const }}>{item.latency}</span>
              </div>
            ))}
            <div style={{ fontSize: 11, color: '#1D9E75', fontStyle: 'italic', paddingLeft: 4 }}>
              Total: ~210ms per query — acceptable for most production use cases
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`from sentence_transformers import SentenceTransformer, CrossEncoder
import numpy as np

# ── Load a cross-encoder reranker ────────────────────────────────────
# ms-marco models: trained on 500k (query, passage) pairs from MS MARCO dataset
# ms-marco-MiniLM-L-6-v2: fast, small (22M params)
# ms-marco-electra-base:   slower, more accurate (110M params)
reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

def rerank(query: str, candidates: list[dict],
            top_k: int = 3) -> list[dict]:
    """
    Rerank retrieved candidates using a cross-encoder.
    candidates: list of {'id': str, 'text': str, ...}
    Returns top_k candidates sorted by cross-encoder relevance score.
    """
    if not candidates:
        return []

    # Cross-encoder scores each (query, passage) pair jointly
    pairs  = [(query, c['text']) for c in candidates]
    scores = reranker.predict(pairs)   # (N,) relevance scores

    # Sort by score descending
    ranked = sorted(zip(candidates, scores), key=lambda x: x[1], reverse=True)
    return [
        {**cand, 'rerank_score': float(score)}
        for cand, score in ranked[:top_k]
    ]

# ── Full two-stage pipeline ───────────────────────────────────────────
def two_stage_retrieve(query: str, top_k_coarse: int = 20,
                        top_k_final: int = 3) -> list[dict]:
    """
    Stage 1: hybrid search for top_k_coarse candidates
    Stage 2: cross-encoder reranking to top_k_final
    """
    # Stage 1: fast hybrid retrieval
    coarse = hybrid_search(query, k_retrieve=top_k_coarse,
                            k_return=top_k_coarse)
    # Stage 2: precise cross-encoder reranking
    reranked = rerank(query, coarse, top_k=top_k_final)
    return reranked

# ── Compare: naive vs two-stage ───────────────────────────────────────
queries = [
    "What does error code BAD_REQUEST_ERROR with invalid_api_key mean?",
    "When will my international payment settle?",
    "How do I verify webhook signatures?",
]

print("Two-stage retrieval results:")
for query in queries:
    print(f"\nQuery: '{query}'")

    # Naive: just dense search top-3
    naive    = dense_search(query, k=3)
    naive_ids = [r['id'] for r in naive]

    # Two-stage
    advanced = two_stage_retrieve(query, top_k_coarse=8, top_k_final=3)
    adv_ids  = [r['id'] for r in advanced]

    print(f"  Naive top-3:     chunks {naive_ids}")
    print(f"  Two-stage top-3: chunks {adv_ids}")

    # Show top reranked result
    if advanced:
        top = advanced[0]
        print(f"  Top result (score={top['rerank_score']:.3f}):")
        print(f"    '{top['text'][:80]}...'")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — ADVANCED RETRIEVAL PATTERNS ═════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>More retrieval improvements</span>
        <h2 style={S.h2}>HyDE, parent-child chunking, and query decomposition</h2>

        <p style={S.p}>
          Three more techniques that consistently improve RAG quality
          beyond hybrid search and reranking.
          HyDE (Hypothetical Document Embeddings) generates a hypothetical
          answer to the query and embeds that instead of the query —
          producing richer query embeddings that match document style.
          Parent-child chunking indexes small chunks for precision but
          retrieves their larger parent for context.
          Query decomposition breaks complex questions into sub-questions
          that are each easier to answer individually.
        </p>

        <CodeBlock code={`import torch
from sentence_transformers import SentenceTransformer
import faiss, numpy as np

embedder = SentenceTransformer('all-MiniLM-L6-v2')

# ── Technique 1: HyDE — Hypothetical Document Embeddings ─────────────
# Problem: short queries embed differently from long document chunks
# Fix: generate a hypothetical answer, embed that instead

def hyde_embed(query: str, llm_fn) -> np.ndarray:
    """
    Generate a hypothetical answer to the query,
    then embed the hypothetical answer instead of the query.
    The embedding will be stylistically similar to real document chunks.
    """
    hyde_prompt = (
        f"Write a 2-3 sentence passage that would directly answer "
        f"this question if it appeared in a technical documentation page:\n\n"
        f"Question: {query}\n\nPassage:"
    )
    # In production: call your LLM
    # hypothetical = llm_fn(hyde_prompt)
    # For demo: simulate what the hypothetical might look like
    hypothetical = f"[Hypothetical answer about: {query}. Would contain specific facts and terminology matching the query.]"

    emb = embedder.encode([hypothetical], normalize_embeddings=True)
    return emb

print("HyDE: embedding a hypothetical answer improves recall for short queries")
print("  Short query:     'settlement time'  → vague embedding")
print("  HyDE query:      'Payments settle within T+2 business days...' → precise")
print()

# ── Technique 2: Parent-child chunking ────────────────────────────────
# Problem: small chunks are precise but lack context for LLM
# Fix: index small child chunks, retrieve larger parent chunks

PARENT_CHUNKS = [
    {
        'id': 'P1',
        'text': (
            "Stripe Settlement Overview. "
            "Domestic payments settle within T+2 business days. "
            "International payments settle within T+7 business days. "
            "Settlement is initiated at 5 PM IST each business day. "
            "Minimum settlement amount is Rs 100. "
            "Smaller amounts are carried forward to the next cycle."
        ),
        'children': [
            {'id': 'C1a', 'text': 'Domestic payments settle within T+2 business days.'},
            {'id': 'C1b', 'text': 'International payments settle within T+7 business days.'},
            {'id': 'C1c', 'text': 'Settlement is initiated at 5 PM IST each business day.'},
            {'id': 'C1d', 'text': 'Minimum settlement amount is Rs 100.'},
        ],
    },
    {
        'id': 'P2',
        'text': (
            "Stripe Error Codes Reference. "
            "BAD_REQUEST_ERROR: mandatory parameters missing or invalid. "
            "GATEWAY_ERROR: bank gateway timeout, retry after 5 minutes. "
            "SERVER_ERROR: internal error, contact support if persistent. "
            "INVALID_SIGNATURE: webhook signature mismatch, check secret key."
        ),
        'children': [
            {'id': 'C2a', 'text': 'BAD_REQUEST_ERROR: mandatory parameters missing or invalid.'},
            {'id': 'C2b', 'text': 'GATEWAY_ERROR: bank gateway timeout, retry after 5 minutes.'},
            {'id': 'C2c', 'text': 'SERVER_ERROR: internal error, contact support if persistent.'},
            {'id': 'C2d', 'text': 'INVALID_SIGNATURE: webhook signature mismatch, check secret key.'},
        ],
    },
]

# Build index on child chunks
child_chunks = [c for p in PARENT_CHUNKS for c in p['children']]
child_to_parent = {c['id']: p['id'] for p in PARENT_CHUNKS for c in p['children']}
parent_map = {p['id']: p for p in PARENT_CHUNKS}

child_texts = [c['text'] for c in child_chunks]
child_embs  = embedder.encode(child_texts, normalize_embeddings=True)
child_index = faiss.IndexFlatIP(child_embs.shape[1])
child_index.add(child_embs)

def parent_child_search(query: str, k: int = 2) -> list[dict]:
    """Retrieve small child chunks, return their full parent chunks."""
    q_emb  = embedder.encode([query], normalize_embeddings=True)
    scores, idxs = child_index.search(q_emb, k * 2)   # over-retrieve children

    seen_parents = set()
    results = []
    for i, score in zip(idxs[0], scores[0]):
        child      = child_chunks[i]
        parent_id  = child_to_parent[child['id']]
        if parent_id not in seen_parents:
            seen_parents.add(parent_id)
            results.append({
                'parent_id':   parent_id,
                'matched_child': child['text'],
                'full_context':  parent_map[parent_id]['text'],
                'score':         float(score),
            })
        if len(results) >= k:
            break
    return results

query = "What does GATEWAY_ERROR mean?"
results = parent_child_search(query, k=2)
print(f"Parent-child search for: '{query}'")
for r in results:
    print(f"  Matched child:  '{r['matched_child']}'")
    print(f"  Full context returned to LLM:")
    print(f"    '{r['full_context'][:100]}...'")
    print()

# ── Technique 3: Query decomposition ─────────────────────────────────
print("Query decomposition:")
complex_query = "How do I set up Stripe for international payments and what fees will I pay?"
print(f"Complex query: '{complex_query}'")
print("Decompose into sub-queries:")
sub_queries = [
    "How do I enable international payments on Stripe?",
    "What are the fees for international payments on Stripe?",
]
for q in sub_queries:
    print(f"  → '{q}'")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — RAG EVALUATION ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Measuring quality</span>
        <h2 style={S.h2}>RAG evaluation — faithfulness, answer relevance, and context recall</h2>

        <p style={S.p}>
          Without evaluation, RAG iteration is guesswork. You make a change —
          better chunking, different embedding model, added reranking —
          and you have no objective measure of whether it helped.
          Three metrics cover the full RAG pipeline end to end.
          Faithfulness measures whether the answer is grounded in the context.
          Answer relevance measures whether the answer addresses the question.
          Context recall measures whether the retrieved chunks contain the answer.
        </p>

        <VisualBox label="RAG evaluation triangle — three metrics, three failure modes">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[
              {
                metric: 'Faithfulness',
                color: '#7b61ff',
                question: 'Is every claim in the answer supported by retrieved context?',
                failure: 'LLM adds facts from training memory not in retrieved chunks → hallucination',
                measure: 'NLI: does context entail each answer sentence?',
                target: '> 0.9 for factual domains',
              },
              {
                metric: 'Answer Relevance',
                color: '#1D9E75',
                question: 'Does the answer actually address what was asked?',
                failure: 'Answer is technically accurate but answers a different question → off-topic',
                measure: 'Embed answer and generated question, measure cosine similarity',
                target: '> 0.8 for conversational, > 0.9 for task-specific',
              },
              {
                metric: 'Context Recall',
                color: '#D85A30',
                question: 'Do the retrieved chunks contain the information needed to answer?',
                failure: 'Correct answer exists in knowledge base but retrieval missed the relevant chunk',
                measure: 'Compare retrieved chunks to reference answer sentences',
                target: '> 0.8 — below this means retrieval is the bottleneck',
              },
            ].map((item) => (
              <div key={item.metric} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 8, padding: '12px 12px',
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 8 }}>
                  {item.metric}
                </div>
                {[
                  ['Measures', item.question],
                  ['Failure mode', item.failure],
                  ['How', item.measure],
                  ['Target', item.target],
                ].map(([k, v]) => (
                  <div key={k} style={{ marginBottom: 5 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>{k}: </span>
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>{v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sentence_transformers import SentenceTransformer, CrossEncoder
import re

embedder = SentenceTransformer('all-MiniLM-L6-v2')

# ── Faithfulness — is the answer grounded in context? ─────────────────
def faithfulness_score(answer: str, contexts: list[str],
                        nli_model=None) -> float:
    """
    Measure what fraction of answer sentences are supported by context.
    Uses cross-encoder NLI model for precise entailment scoring.
    Fallback: keyword overlap when NLI model not available.
    """
    sentences = [s.strip() for s in re.split(r'[.!?]+', answer) if s.strip()]
    if not sentences:
        return 0.0

    full_context = ' '.join(contexts)

    if nli_model:
        # Cross-encoder NLI: does context entail each claim?
        pairs  = [(full_context, s) for s in sentences]
        scores = nli_model.predict(pairs)
        # NLI labels: 0=contradiction, 1=neutral, 2=entailment
        supported = sum(1 for s in scores if s == 2)
    else:
        # Fallback: sentence-level embedding similarity
        sent_embs    = embedder.encode(sentences, normalize_embeddings=True)
        context_embs = embedder.encode([full_context], normalize_embeddings=True)
        sims         = (sent_embs @ context_embs.T).flatten()
        supported    = sum(1 for s in sims if s > 0.6)

    return supported / len(sentences)

# ── Answer relevance — does the answer address the question? ──────────
def answer_relevance_score(question: str, answer: str,
                             n_questions: int = 3,
                             llm_fn=None) -> float:
    """
    Generate n_questions from the answer, then measure how similar
    they are to the original question via embedding similarity.
    High similarity = answer is relevant to the original question.
    """
    if llm_fn:
        prompt = (
            f"Generate {n_questions} questions that this answer would answer.\n"
            f"Answer: {answer}\nQuestions (one per line):"
        )
        generated_qs = llm_fn(prompt).strip().split('\n')[:n_questions]
    else:
        # Simulate generated questions for demo
        generated_qs = [
            f"What is the process for {question.lower()}?",
            f"How does {question.lower().split()[0]} work?",
            question,
        ]

    q_emb  = embedder.encode([question],      normalize_embeddings=True)
    gq_emb = embedder.encode(generated_qs,    normalize_embeddings=True)
    sims   = (gq_emb @ q_emb.T).flatten()
    return float(sims.mean())

# ── Context recall — did retrieval find the right chunks? ─────────────
def context_recall_score(retrieved_contexts: list[str],
                          reference_answer: str) -> float:
    """
    Measure what fraction of reference answer sentences are
    supported by retrieved contexts. High score = retrieval is good.
    Low score = retrieval is the bottleneck.
    """
    ref_sentences = [s.strip() for s in re.split(r'[.!?]+', reference_answer)
                     if s.strip() and len(s.strip()) > 10]
    if not ref_sentences:
        return 0.0

    full_context = ' '.join(retrieved_contexts)
    ctx_emb      = embedder.encode([full_context], normalize_embeddings=True)
    sent_emb     = embedder.encode(ref_sentences, normalize_embeddings=True)
    sims         = (sent_emb @ ctx_emb.T).flatten()

    covered = sum(1 for s in sims if s > 0.55)
    return covered / len(ref_sentences)

# ── Evaluate a full RAG example ───────────────────────────────────────
rag_examples = [
    {
        'question':   "What does GATEWAY_ERROR mean on Stripe?",
        'retrieved':  ["Error code GATEWAY_ERROR indicates the bank gateway timed out. Retry the payment after 5 minutes."],
        'answer':     "GATEWAY_ERROR means the bank gateway timed out. You should retry the payment after 5 minutes.",
        'reference':  "GATEWAY_ERROR indicates the bank gateway timed out. Retry after 5 minutes.",
        'type':       'good — faithful and relevant',
    },
    {
        'question':   "What does GATEWAY_ERROR mean on Stripe?",
        'retrieved':  ["Error code GATEWAY_ERROR indicates the bank gateway timed out. Retry the payment after 5 minutes."],
        'answer':     "GATEWAY_ERROR typically means server overload. This is common during peak hours in India around 8-10 PM. Try switching payment methods or using a VPN.",
        'reference':  "GATEWAY_ERROR indicates the bank gateway timed out. Retry after 5 minutes.",
        'type':       'bad — hallucinated, unfaithful',
    },
    {
        'question':   "What is the international payment settlement time?",
        'retrieved':  ["Domestic payments settle within T+2 business days."],  # wrong chunk retrieved
        'answer':     "Payments settle within T+2 business days.",
        'reference':  "International payments settle within T+7 business days.",
        'type':       'bad — retrieval failed (context recall low)',
    },
]

print(f"{'Example':<10} {'Faithfulness':>14} {'Ans. Relevance':>16} {'Context Recall':>16} {'Type'}")
print("─" * 75)
for ex in rag_examples:
    f = faithfulness_score(ex['answer'], ex['retrieved'])
    a = answer_relevance_score(ex['question'], ex['answer'])
    c = context_recall_score(ex['retrieved'], ex['reference'])
    print(f"  {ex['type'][:8]:<10} {f:>14.3f} {a:>16.3f} {c:>16.3f}  {ex['type']}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — PRODUCTION RAG ARCHITECTURE ═════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Putting it all together</span>
        <h2 style={S.h2}>Production RAG pipeline — all components integrated</h2>

        <CodeBlock code={`import numpy as np
from dataclasses import dataclass
from typing import Callable
import time

@dataclass
class RAGResult:
    answer:       str
    sources:      list[dict]
    faithfulness: float
    latency_ms:   float

class ProductionRAGPipeline:
    """
    Production-ready RAG pipeline with:
    - Hybrid search (dense + sparse + RRF)
    - Cross-encoder reranking
    - Citation tracking
    - Faithfulness checking
    - Latency monitoring
    """

    def __init__(self,
                  embedder,
                  reranker,
                  llm_fn: Callable[[str], str],
                  dense_index,
                  bm25_index,
                  chunks: list[dict]):
        self.embedder    = embedder
        self.reranker    = reranker
        self.llm_fn      = llm_fn
        self.dense_index = dense_index
        self.bm25        = bm25_index
        self.chunks      = chunks
        self.id_map      = {c['id']: c for c in chunks}

    def retrieve(self, query: str, k_coarse: int = 20,
                  k_final: int = 3) -> list[dict]:
        # Hybrid retrieval
        coarse   = hybrid_search(query, k_retrieve=k_coarse, k_return=k_coarse)
        # Cross-encoder reranking
        reranked = rerank(query, coarse, top_k=k_final)
        return reranked

    def build_prompt(self, query: str, chunks: list[dict]) -> str:
        context = '\n\n'.join([
            f"[{i+1}] {c['text']}"
            for i, c in enumerate(chunks)
        ])
        return f"""You are a Stripe technical support assistant.
Answer the question using ONLY the context below.
After your answer, list which source numbers you used as [1], [2], etc.
If the answer is not in the context, say "I don't have that information."

Context:
{context}

Question: {query}
Answer:"""

    def check_faithfulness(self, answer: str, contexts: list[str]) -> float:
        return faithfulness_score(answer, contexts)

    def query(self, question: str) -> RAGResult:
        start = time.time()

        # Retrieve + rerank
        retrieved = self.retrieve(question, k_coarse=15, k_final=3)

        # Generate answer
        prompt = self.build_prompt(question, retrieved)
        answer = self.llm_fn(prompt)

        # Check faithfulness
        context_texts = [c['text'] for c in retrieved]
        faith = self.check_faithfulness(answer, context_texts)

        latency = (time.time() - start) * 1000
        return RAGResult(
            answer=answer,
            sources=retrieved,
            faithfulness=faith,
            latency_ms=latency,
        )

# ── Simulate pipeline usage ───────────────────────────────────────────
def mock_llm(prompt: str) -> str:
    """Mock LLM that returns a templated answer for demonstration."""
    if 'GATEWAY_ERROR' in prompt:
        return "GATEWAY_ERROR indicates the bank gateway timed out. Retry after 5 minutes. [1]"
    if 'settlement' in prompt.lower():
        return "Domestic payments settle in T+2 business days. International payments settle in T+7 days. [1][2]"
    return "I don't have that information in my knowledge base."

print("Production RAG pipeline queries:")
test_questions = [
    "What does GATEWAY_ERROR mean?",
    "How long does international settlement take?",
    "What is the meaning of life?",  # out of scope
]

for q in test_questions:
    retrieved = two_stage_retrieve(q, top_k_coarse=8, top_k_final=3)
    context_texts = [r['text'] for r in retrieved]
    prompt   = f"Answer based only on context:\\n{chr(10).join(context_texts)}\\n\\nQ: {q}\\nA:"
    answer   = mock_llm(q)
    faith    = faithfulness_score(answer, context_texts)

    print(f"\nQ: {q}")
    print(f"A: {answer}")
    print(f"   Faithfulness: {faith:.3f}  Sources: {len(retrieved)}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common advanced RAG mistake — explained and fixed</h2>

        <ErrorBlock
          error="Reranker makes results worse — faithfulness drops after adding reranking"
          cause="The cross-encoder reranker was trained on a different domain (typically MS MARCO web search queries) and its relevance judgements do not transfer to your domain. Technical documentation queries, legal text, or Indian-language content may be scored incorrectly by a reranker trained on general English web queries. The reranker demotes highly relevant technical chunks because they look different from MS MARCO passages."
          fix="Evaluate reranker quality independently: for 50 queries, compare top-3 before and after reranking and have a human judge which is better. If the reranker hurts, use a domain-adapted reranker — fine-tune the cross-encoder on your own (query, relevant_chunk, irrelevant_chunk) triplets using the sentence-transformers library. Alternatively use a larger reranker: ms-marco-electra-base significantly outperforms ms-marco-MiniLM-L-6-v2 for technical content."
        />

        <ErrorBlock
          error="Hybrid search returns the same results as dense-only — BM25 adding no value"
          cause="RRF fusion is working correctly but both retrieval methods are finding the same chunks, so fusion has no effect. This happens when your corpus is small (under 500 chunks) and every relevant chunk has both high BM25 scores (keywords present) and high dense scores (semantic similarity). In small corpora there is less opportunity for the two methods to complement each other."
          fix="This is expected behaviour on small corpora — hybrid search adds most value on large corpora (10k+ chunks) where the two methods have more divergence. For small corpora, focus on reranking which helps at any scale. To verify hybrid search is adding value: compare retrieval quality on queries that use technical terms (BAD_REQUEST_ERROR, HMAC SHA256) — these should score higher with BM25 than with dense alone. If they do, hybrid is working even if results look similar overall."
        />

        <ErrorBlock
          error="Context recall is high but faithfulness is low — retrieval works but LLM hallucinates"
          cause="The retrieved chunks contain the answer but the LLM ignores them and uses its training knowledge instead. This is a prompting problem not a retrieval problem. Without a strong grounding instruction, LLMs blend retrieved context with their own knowledge — especially when they are confident about the topic from training data."
          fix="Strengthen the grounding instruction: use 'Answer ONLY using the numbered context below. Do not use any other knowledge. If the answer is not explicitly stated in the context, say I do not have that information.' Test by deliberately inserting a false fact into the context (e.g. 'settlement takes T+99 days') — if the LLM reports T+99, grounding is working. If it still says T+2 from training memory, the instruction is not strong enough. Also reduce temperature to 0 for factual RAG — higher temperatures increase creativity and hallucination."
        />

        <ErrorBlock
          error="RAG evaluation scores are high but user satisfaction is low — metric-answer gap"
          cause="Automated RAG metrics (faithfulness, answer relevance, context recall) measure what they can measure automatically — semantic similarity and NLI entailment. They do not capture whether the answer is actually useful, correctly formatted, appropriately concise, or safe to show to users. A high-faithfulness answer can still be unhelpful if it is too long, uses jargon the user does not understand, or answers only half the question."
          fix="Supplement automated metrics with human evaluation on a sample. Create a rubric with 4 dimensions: correctness (is the answer factually right), completeness (does it fully answer the question), conciseness (is it appropriately brief), and safety (is it safe to show). Rate 50-100 real queries on this rubric monthly. Track both automated metrics and human rubric scores — only automated metrics that correlate with human scores are worth optimising."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can build production RAG. The final module of Section 10
          covers the complete AI agent architecture.
        </h2>

        <p style={S.p}>
          Advanced RAG gives your agent access to a knowledge base.
          Module 68 — the final module of the Generative AI section —
          covers the complete production agent: planning across multiple steps,
          calling real APIs, maintaining memory across turns, handling failures
          gracefully, and the architectural patterns used at companies like
          Stripe, Amazon, and DoorDash to build internal AI tools
          that handle thousands of requests per day.
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
              Next — Module 68 · Generative AI
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Agents and Tool Use — Building Autonomous AI Systems
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              LLMs that plan, use tools, and execute multi-step tasks autonomously.
              ReAct, tool calling, memory, and production agent architecture patterns.
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
          'Naive RAG (embed → cosine similarity → top-k) fails on exact keyword queries, returns tangentially relevant chunks, and has no quality measurement. The three systematic fixes are hybrid search (dense + sparse + RRF), cross-encoder reranking, and evaluation metrics that measure each failure mode independently.',
          'Hybrid search combines dense retrieval (semantic similarity via embeddings) and sparse retrieval (BM25 keyword matching) using Reciprocal Rank Fusion. RRF score = Σ 1/(k + rank_i) with k=60. No tuning required. Best improvement comes on queries with specific technical terms (error codes, product names, API parameters) that semantic search misses.',
          'Cross-encoder reranking is the single highest-leverage improvement to any RAG system. Two-stage pipeline: bi-encoder retrieves top-100 candidates fast (~10ms), cross-encoder scores each (query, chunk) pair precisely (~200ms for 100 docs). The cross-encoder sees both query and chunk simultaneously — much more accurate than independent embeddings.',
          'Three advanced retrieval patterns: HyDE (embed a hypothetical answer instead of the query — matches document style better for short queries), parent-child chunking (index small precise chunks, return their full parent for LLM context), query decomposition (split complex multi-part questions into sub-questions, retrieve and answer each separately).',
          'Three RAG evaluation metrics: faithfulness (are all answer claims supported by retrieved context — measures hallucination), answer relevance (does the answer address the question — measures off-topic responses), context recall (do retrieved chunks contain the reference answer — measures retrieval quality). Low context recall means fix retrieval. Low faithfulness means fix the LLM prompt.',
          'When context recall is high but faithfulness is low, the retrieval is working but the LLM is ignoring the context. Fix the grounding instruction: "Answer ONLY using the numbered context. Say I do not have that information if the answer is not there." Verify by injecting a deliberate false fact into context and checking that the LLM reports it. Always supplement automated metrics with monthly human evaluation on a 50-100 query sample.',
        ]}
      />
    </LearnLayout>
  )
}
