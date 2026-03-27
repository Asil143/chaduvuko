import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Tokenisation and Word Embeddings — Chaduvuko',
  description:
    'BPE, WordPiece, SentencePiece — how text becomes numbers. Word2Vec, GloVe, and contextual embeddings from BERT. The foundation of every NLP system.',
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

export default function TokenisationAndEmbeddingsPage() {
  return (
    <LearnLayout
      title="Tokenisation and Word Embeddings"
      description="BPE, WordPiece, SentencePiece — how text becomes numbers. Word2Vec, GloVe, and contextual embeddings from BERT. The foundation of every NLP system."
      section="Natural Language Processing"
      readTime="35–40 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="nlp" topic="tokenisation-and-embeddings" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — why tokenisation matters</span>
        <h2 style={S.h2}>
          Neural networks only understand numbers.
          "Razorpay declined my payment" is text.
          Before any model can process it, every character, subword,
          or word must become an integer. That conversion is tokenisation —
          and the choice of how to split text changes everything.
        </h2>

        <p style={S.p}>
          Tokenisation is the first step in every NLP pipeline.
          It converts raw text into a sequence of integer IDs that
          the model's embedding layer can look up. The tokenisation
          strategy determines the vocabulary size, how unknown words
          are handled, and how efficiently rare or domain-specific
          terms are represented.
        </p>

        <p style={S.p}>
          A naive approach: split on spaces. "running" and "runs" and "ran"
          become three separate vocabulary entries with no shared representation.
          The model must learn from scratch that they are related.
          A character-level approach: every letter is a token. "running"
          becomes 7 tokens. Sequences become very long and the model
          struggles to learn word-level patterns.
          Subword tokenisation — used by every modern LLM —
          splits "running" into "run" and "##ning", sharing the "run"
          representation across all its inflections while handling
          unknown words gracefully by falling back to subword pieces.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            Imagine a dictionary for a new language. You could have one entry
            per full word — huge dictionary, every form of every verb listed
            separately. Or one entry per letter — tiny dictionary, but reading
            requires spelling out every word. Subword tokenisation is like
            a dictionary of common syllables and word roots —
            compact vocabulary, still captures meaning, handles new words
            by combining known pieces.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            GPT-4 uses ~100,000 BPE tokens. BERT uses ~30,000 WordPiece tokens.
            Both can represent any text — known words as single tokens,
            unknown words as sequences of subword pieces. Nothing is truly
            "out of vocabulary."
          </p>
        </AnalogyBox>
      </div>

      <Div />

      {/* ══ SECTION 2 — TOKENISATION STRATEGIES ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>How text becomes numbers</span>
        <h2 style={S.h2}>Four tokenisation strategies — word, character, subword, and byte-level</h2>

        <VisualBox label="Same sentence — four different tokenisations">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                strategy: 'Word-level',
                color: '#D85A30',
                tokens: ['Razorpay', 'declined', 'my', 'payment', 'of', '₹2500'],
                ids: [4821, 892, 45, 3301, 12, 8823],
                note: 'OOV problem: "₹2500" unseen at train time → [UNK]. 500k+ vocab needed for Hindi+English.',
              },
              {
                strategy: 'Character-level',
                color: '#BA7517',
                tokens: ['R','a','z','o','r','p','a','y',' ','d','e','c','l','i','n','e','d',' ','m','y'],
                ids: [52,1,90,15,52,16,1,25,0,4,5,3,12,9,14,5,4,0,13,25],
                note: 'Very long sequences. Hard to learn word-level patterns. No OOV but slow.',
              },
              {
                strategy: 'BPE (subword)',
                color: '#1D9E75',
                tokens: ['Razor', 'pay', 'Ġdeclined', 'Ġmy', 'Ġpayment', 'Ġof', 'Ġ₹', '2500'],
                ids: [19432, 7692, 11843, 452, 8821, 12, 43291, 12450],
                note: 'Used by GPT. Ġ prefix = space before token. Rare words split into known subwords.',
              },
              {
                strategy: 'WordPiece (subword)',
                color: '#7b61ff',
                tokens: ['razor', '##pay', 'declined', 'my', 'payment', 'of', '[UNK]', '2500'],
                ids: [22341, 3521, 7823, 201, 4521, 12, 100, 9823],
                note: 'Used by BERT. ## prefix = continuation of previous token. Lowercase by default.',
              },
            ].map((item) => (
              <div key={item.strategy} style={{
                background: 'var(--surface)', borderRadius: 8,
                padding: '12px 14px', border: `1px solid ${item.color}25`,
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                  {item.strategy}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 4, marginBottom: 6 }}>
                  {item.tokens.slice(0, 8).map((tok, i) => (
                    <span key={i} style={{
                      background: `${item.color}15`, border: `1px solid ${item.color}30`,
                      borderRadius: 3, padding: '2px 6px',
                      fontSize: 11, fontFamily: 'var(--font-mono)', color: item.color,
                    }}>
                      {tok}
                    </span>
                  ))}
                  {item.tokens.length > 8 && (
                    <span style={{ fontSize: 11, color: 'var(--muted)', alignSelf: 'center' }}>
                      +{item.tokens.length - 8} more
                    </span>
                  )}
                </div>
                <p style={{ ...S.ps, marginBottom: 0, fontSize: 11, fontStyle: 'italic' }}>{item.note}</p>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`# pip install tokenizers transformers

from tokenizers import Tokenizer
from tokenizers.models import BPE, WordPiece
from tokenizers.trainers import BpeTrainer, WordPieceTrainer
from tokenizers.pre_tokenizers import Whitespace
import re

# ── Build a BPE tokeniser from scratch ────────────────────────────────
# Corpus: Razorpay support tickets (simulated)
corpus = [
    "razorpay payment declined please retry",
    "payment gateway timeout error occurred",
    "upi transaction failed debit reversal",
    "razorpay dashboard settlement report",
    "payment link expired please regenerate",
    "emi option not available for this card",
    "razorpay payment successful confirmation",
    "refund initiated within 5 to 7 days",
    "subscription plan payment failed retry",
    "bank declined transaction contact bank",
] * 50   # repeat to have enough data

# Save to file for tokenizer training
with open('/tmp/corpus.txt', 'w') as f:
    f.write('\n'.join(corpus))

# Train BPE tokeniser
tokenizer = Tokenizer(BPE(unk_token='[UNK]'))
tokenizer.pre_tokenizer = Whitespace()
trainer = BpeTrainer(
    vocab_size=200,
    special_tokens=['[UNK]', '[PAD]', '[CLS]', '[SEP]', '[MASK]'],
    min_frequency=2,
)
tokenizer.train(['/tmp/corpus.txt'], trainer)

# ── Tokenise sample text ───────────────────────────────────────────────
samples = [
    "razorpay payment declined",
    "transaction failed retry",
    "unknownword xyz123",   # OOV handling
]

print("BPE Tokenisation results:")
for text in samples:
    enc = tokenizer.encode(text)
    print(f"\n  Input:  '{text}'")
    print(f"  Tokens: {enc.tokens}")
    print(f"  IDs:    {enc.ids}")

print(f"\nVocabulary size: {tokenizer.get_vocab_size()}")

# ── Using HuggingFace pretrained tokenisers ────────────────────────────
try:
    from transformers import AutoTokenizer

    # GPT-2 tokeniser (BPE)
    gpt2_tok = AutoTokenizer.from_pretrained('gpt2')
    text     = "Razorpay declined my payment of ₹2500"
    gpt2_enc = gpt2_tok(text)
    print(f"\nGPT-2 BPE tokeniser:")
    print(f"  Input:  '{text}'")
    print(f"  Tokens: {gpt2_tok.convert_ids_to_tokens(gpt2_enc['input_ids'])}")
    print(f"  IDs:    {gpt2_enc['input_ids']}")
    print(f"  Count:  {len(gpt2_enc['input_ids'])} tokens")

    # BERT tokeniser (WordPiece)
    bert_tok = AutoTokenizer.from_pretrained('bert-base-uncased')
    bert_enc = bert_tok(text)
    print(f"\nBERT WordPiece tokeniser:")
    print(f"  Tokens: {bert_tok.convert_ids_to_tokens(bert_enc['input_ids'])}")
    print(f"  Note: [CLS] and [SEP] added automatically")
except ImportError:
    print("\nInstall transformers: pip install transformers")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — BPE FROM SCRATCH ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Understanding the algorithm</span>
        <h2 style={S.h2}>Byte Pair Encoding — the algorithm that powers GPT</h2>

        <p style={S.p}>
          BPE starts with a character-level vocabulary and iteratively merges
          the most frequent pair of adjacent tokens into a new token.
          After k merges you have a vocabulary of approximately k + n_chars tokens.
          The merge rules learned during training are applied at inference time
          to tokenise any new text — including text with words never seen before.
        </p>

        <ConceptBox title="BPE algorithm — 5 iterations on a tiny corpus">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.0 }}>
            <div style={{ color: '#888', marginBottom: 8 }}>Corpus: "low low lower new new newest"</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { step: 'Start',   vocab: 'l o w e r n w s t </w>', merge: '—', result: 'l-o-w, l-o-w, l-o-w-e-r, n-e-w, n-e-w, n-e-w-e-s-t' },
                { step: 'Merge 1', vocab: '+ lo',  merge: 'l+o → lo (freq 5)', result: 'lo-w, lo-w, lo-w-e-r, n-e-w, n-e-w, n-e-w-e-s-t' },
                { step: 'Merge 2', vocab: '+ low', merge: 'lo+w → low (freq 3)', result: 'low, low, low-e-r, n-e-w, n-e-w, n-e-w-e-s-t' },
                { step: 'Merge 3', vocab: '+ ne',  merge: 'n+e → ne (freq 3)', result: 'low, low, low-e-r, ne-w, ne-w, ne-w-e-s-t' },
                { step: 'Merge 4', vocab: '+ new', merge: 'ne+w → new (freq 3)', result: 'low, low, low-e-r, new, new, new-e-s-t' },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '70px 80px 200px 1fr',
                  gap: 10, background: i % 2 === 0 ? 'var(--bg2)' : 'transparent',
                  padding: '4px 8px', borderRadius: 4,
                }}>
                  <span style={{ color: '#7b61ff', fontWeight: 700 }}>{row.step}</span>
                  <span style={{ color: '#1D9E75' }}>{row.vocab}</span>
                  <span style={{ color: '#D85A30' }}>{row.merge}</span>
                  <span style={{ color: 'var(--muted)', fontSize: 11 }}>{row.result}</span>
                </div>
              ))}
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`from collections import Counter, defaultdict
import re

# ── BPE from scratch — full implementation ────────────────────────────
def get_vocab(corpus):
    """Convert corpus to character-level vocabulary with word boundary marker."""
    vocab = Counter()
    for word in corpus.lower().split():
        # Add </w> end-of-word marker to distinguish "low" from "lower"
        chars = ' '.join(list(word)) + ' </w>'
        vocab[chars] += 1
    return vocab

def get_pair_freqs(vocab):
    """Count frequency of every adjacent pair across all words."""
    pairs = Counter()
    for word, freq in vocab.items():
        symbols = word.split()
        for i in range(len(symbols) - 1):
            pairs[(symbols[i], symbols[i+1])] += freq
    return pairs

def merge_pair(pair, vocab):
    """Merge the best pair everywhere in the vocabulary."""
    new_vocab = {}
    bigram    = re.escape(' '.join(pair))
    pattern   = re.compile(r'(?<!\S)' + bigram + r'(?!\S)')
    for word in vocab:
        new_word = pattern.sub(''.join(pair), word)
        new_vocab[new_word] = vocab[word]
    return new_vocab

# ── Train BPE on Razorpay corpus ──────────────────────────────────────
corpus = ("razorpay payment declined retry payment gateway "
          "timeout payment failed upi transaction payment "
          "successful razorpay dashboard payment link payment "
          "refund payment subscription payment emi payment")

vocab       = get_vocab(corpus)
n_merges    = 15
merge_rules = []

print("BPE training — top merge at each step:")
print(f"{'Step':>5} {'Best pair':<20} {'Freq':>6} {'New token'}")
print("─" * 50)

for i in range(n_merges):
    pairs = get_pair_freqs(vocab)
    if not pairs:
        break
    best = max(pairs, key=pairs.get)
    vocab = merge_pair(best, vocab)
    merge_rules.append(best)
    new_token = ''.join(best)
    print(f"  {i+1:>3}  {str(best):<20}  {pairs[best]:>5}  {new_token}")

# ── Apply learned merge rules to new text ─────────────────────────────
def tokenise_bpe(text, merge_rules):
    """Apply learned BPE merges to tokenise new text."""
    tokens = []
    for word in text.lower().split():
        word_chars = list(word) + ['</w>']
        # Apply each merge rule in order
        for pair in merge_rules:
            i = 0
            new_chars = []
            while i < len(word_chars):
                if (i < len(word_chars) - 1 and
                    word_chars[i] == pair[0] and
                    word_chars[i+1] == pair[1]):
                    new_chars.append(pair[0] + pair[1])
                    i += 2
                else:
                    new_chars.append(word_chars[i])
                    i += 1
            word_chars = new_chars
        tokens.extend(word_chars)
    return tokens

test_texts = [
    "payment declined",
    "razorpay gateway",
    "unknownword",
]
print("\nTokenisation with learned BPE rules:")
for text in test_texts:
    toks = tokenise_bpe(text, merge_rules)
    print(f"  '{text}' → {toks}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — WORD EMBEDDINGS ═════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>From integers to meaning</span>
        <h2 style={S.h2}>Word embeddings — dense vectors that capture semantic relationships</h2>

        <p style={S.p}>
          After tokenisation, each token ID is looked up in an embedding table —
          a matrix of shape (vocab_size, d_model). Each row is a dense vector
          representing that token. Tokens with similar meanings end up with
          similar vectors — "payment" and "transaction" are close in embedding space.
          "payment" and "bicycle" are far apart.
        </p>

        <p style={S.p}>
          Word2Vec (2013) was the first widely-used word embedding method.
          It trains a shallow neural network to predict a word from its
          context (CBOW) or predict context from a word (Skip-gram).
          The learned weight matrix becomes the embedding table.
          The famous result: king − man + woman ≈ queen — arithmetic
          in embedding space reflects semantic relationships.
        </p>

        <p style={S.p}>
          The fundamental limitation of Word2Vec and GloVe:
          each word has exactly one vector regardless of context.
          "Bank" has the same embedding whether it means a river bank
          or a financial institution. BERT-style contextual embeddings
          fix this — the embedding for each token depends on all surrounding tokens.
        </p>

        <CodeBlock code={`import numpy as np
import torch
import torch.nn as nn
from collections import Counter
import warnings
warnings.filterwarnings('ignore')

# ── Word2Vec Skip-gram from scratch — simplified ──────────────────────
# Full Word2Vec uses negative sampling — this shows the core idea

class SkipGram(nn.Module):
    """
    Predict context words from a centre word.
    Centre word → embedding → predict which words appear nearby.
    The embedding matrix is what we want — not the predictions.
    """
    def __init__(self, vocab_size, embedding_dim):
        super().__init__()
        self.embeddings = nn.Embedding(vocab_size, embedding_dim)
        self.output     = nn.Linear(embedding_dim, vocab_size, bias=False)

    def forward(self, centre_word):
        embed = self.embeddings(centre_word)
        return self.output(embed)

# ── Build vocabulary from Razorpay support corpus ─────────────────────
corpus = """
razorpay payment declined please retry payment gateway timeout
upi transaction failed reversal initiated payment link expired
razorpay dashboard settlement report payment successful confirmation
refund initiated five to seven days subscription payment failed
emi option not available card payment declined bank contact
payment processing please wait transaction pending authorization
razorpay integration guide payment api documentation
""".lower().split()

# Build vocabulary
word_counts = Counter(corpus)
vocab       = ['<PAD>', '<UNK>'] + [w for w, c in word_counts.most_common() if c >= 2]
word2idx    = {w: i for i, w in enumerate(vocab)}
idx2word    = {i: w for w, i in word2idx.items()}
VOCAB_SIZE  = len(vocab)
EMB_DIM     = 16
WINDOW      = 2

print(f"Vocabulary size: {VOCAB_SIZE}")
print(f"Sample vocab:    {vocab[2:12]}")

# ── Generate skip-gram training pairs ─────────────────────────────────
pairs = []
indices = [word2idx.get(w, 1) for w in corpus]
for i, centre in enumerate(indices):
    for j in range(max(0, i-WINDOW), min(len(indices), i+WINDOW+1)):
        if i != j:
            pairs.append((centre, indices[j]))

# ── Train skip-gram ────────────────────────────────────────────────────
torch.manual_seed(42)
model     = SkipGram(VOCAB_SIZE, EMB_DIM)
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)
criterion = nn.CrossEntropyLoss()

centres  = torch.tensor([p[0] for p in pairs])
contexts = torch.tensor([p[1] for p in pairs])

print(f"\nTraining Skip-gram ({len(pairs)} pairs):")
for epoch in range(1, 6):
    optimizer.zero_grad()
    logits = model(centres)
    loss   = criterion(logits, contexts)
    loss.backward()
    optimizer.step()
    if epoch % 1 == 0:
        print(f"  Epoch {epoch}: loss = {loss.item():.4f}")

# ── Inspect learned embeddings ─────────────────────────────────────────
embeddings = model.embeddings.weight.detach().numpy()

def cosine_sim(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-8)

def most_similar(word, top_n=4):
    if word not in word2idx: return []
    vec   = embeddings[word2idx[word]]
    sims  = [(w, cosine_sim(vec, embeddings[word2idx[w]]))
              for w in vocab[2:] if w != word]
    return sorted(sims, key=lambda x: x[1], reverse=True)[:top_n]

print("\nMost similar words (after minimal training):")
for word in ['payment', 'razorpay', 'failed']:
    if word in word2idx:
        similar = most_similar(word)
        print(f"  {word}: {[(w, f'{s:.3f}') for w, s in similar]}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — CONTEXTUAL EMBEDDINGS ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The modern approach</span>
        <h2 style={S.h2}>Contextual embeddings — the same word, different vectors based on context</h2>

        <p style={S.p}>
          Static embeddings (Word2Vec, GloVe) assign one fixed vector per word.
          BERT and its successors produce contextual embeddings —
          the vector for each token depends on the full surrounding context.
          "Bank" in "river bank" and "bank" in "bank transfer" get
          different vectors because BERT processes the entire sentence
          at once via self-attention before producing the embedding.
        </p>

        <p style={S.p}>
          In practice, contextual embeddings from pretrained models are
          used in two ways. As features: run BERT, extract the [CLS] token
          or averaged token embeddings, use them as input to a classifier.
          As fine-tuned representations: run BERT, add a task head,
          fine-tune all parameters end-to-end on your labelled data.
          Fine-tuning almost always outperforms feature extraction
          but requires more compute.
        </p>

        <CodeBlock code={`import torch
import torch.nn as nn
import numpy as np

# ── Demonstrate contextual vs static embeddings ───────────────────────
# Without a real BERT (large download), we show the concept
# using a small Transformer encoder from Module 48

class MiniContextualEncoder(nn.Module):
    """Minimal contextual encoder — same architecture as BERT."""
    def __init__(self, vocab_size=100, d_model=32, n_heads=4, n_layers=2):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, d_model)
        layer = nn.TransformerEncoderLayer(
            d_model=d_model, nhead=n_heads,
            dim_feedforward=64, dropout=0.0,
            batch_first=True, norm_first=True,
        )
        self.encoder = nn.TransformerEncoder(layer, num_layers=n_layers)

    def forward(self, x):
        emb = self.embedding(x)
        return self.encoder(emb)   # contextual — each token sees all others

torch.manual_seed(42)
model = MiniContextualEncoder()

# Two sentences with same token ID at position 2 (word "payment")
# Sentence 1: "declined payment retry"   — payment in negative context
# Sentence 2: "successful payment confirm" — payment in positive context
# Token IDs (simplified)
sent1 = torch.tensor([[10, 5, 3]])   # declined=10, payment=5, retry=3
sent2 = torch.tensor([[20, 5, 15]])  # successful=20, payment=5, confirm=15

with torch.no_grad():
    ctx1 = model(sent1)
    ctx2 = model(sent2)

# Extract embedding for "payment" (position 1) from both sentences
payment_in_decline  = ctx1[0, 1, :].numpy()
payment_in_success  = ctx2[0, 1, :].numpy()

# Static embedding: always the same
static_emb = model.embedding(torch.tensor([5])).detach().numpy()[0]

def cosine_sim(a, b):
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b) + 1e-8))

print("Contextual vs static embeddings for 'payment':")
print(f"  Static embedding (Word2Vec style):  always identical vector")
print(f"  Contextual (declined context):      {payment_in_decline[:4].round(3)} ...")
print(f"  Contextual (successful context):    {payment_in_success[:4].round(3)} ...")
sim = cosine_sim(payment_in_decline, payment_in_success)
print(f"\n  Cosine similarity between contexts: {sim:.4f}")
print(f"  (Static would give 1.0000 — identical)")
print(f"  (Contextual gives {sim:.4f} — different based on surrounding words)")

# ── Using real BERT embeddings (HuggingFace) ──────────────────────────
print("""
# Production code — HuggingFace BERT embeddings:
# pip install transformers torch

from transformers import AutoTokenizer, AutoModel
import torch

tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
model     = AutoModel.from_pretrained('bert-base-uncased')
model.eval()

sentences = [
    "The bank was steep near the river",
    "The bank declined my transaction",
]
for sent in sentences:
    inputs = tokenizer(sent, return_tensors='pt')
    with torch.no_grad():
        outputs = model(**inputs)
    # [CLS] token representation — summarises full sentence
    cls_emb = outputs.last_hidden_state[:, 0, :]
    print(f"  '{sent[:30]}...'  → CLS emb shape: {cls_emb.shape}")
    # Or average all tokens (mean pooling)
    mean_emb = outputs.last_hidden_state.mean(dim=1)
    print(f"  Mean pooling shape: {mean_emb.shape}")
""")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — EMBEDDING TABLE IN PYTORCH ══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The implementation detail</span>
        <h2 style={S.h2}>nn.Embedding — the lookup table that connects tokenisation to neural networks</h2>

        <p style={S.p}>
          In PyTorch, the embedding table is <span style={S.code as React.CSSProperties}>nn.Embedding(vocab_size, d_model)</span>.
          It is a matrix of shape (vocab_size, d_model) — one row per token.
          A forward pass takes integer token IDs and returns the corresponding
          rows. It is mathematically equivalent to a one-hot encoding
          multiplied by a weight matrix — but implemented as a simple
          lookup for efficiency.
        </p>

        <CodeBlock code={`import torch
import torch.nn as nn
import numpy as np

# ── nn.Embedding — complete guide ─────────────────────────────────────
VOCAB_SIZE = 1000
D_MODEL    = 64

# Create embedding table — randomly initialised
emb_table = nn.Embedding(
    num_embeddings=VOCAB_SIZE,
    embedding_dim=D_MODEL,
    padding_idx=0,   # token ID 0 always returns zero vector (for padding)
)

print(f"Embedding table shape: {emb_table.weight.shape}")
print(f"  = ({VOCAB_SIZE} tokens × {D_MODEL} dimensions)")
print(f"  Total parameters: {emb_table.weight.numel():,}")

# ── Forward pass — token IDs to dense vectors ─────────────────────────
token_ids = torch.tensor([[4, 17, 3, 8, 0]])   # 0 = padding
embeddings = emb_table(token_ids)

print(f"\nInput token IDs:    {token_ids.shape}  {token_ids.tolist()}")
print(f"Output embeddings:  {embeddings.shape}  ← (batch, seq, d_model)")
print(f"Padding (ID=0):     {embeddings[0, 4, :4].tolist()}  ← all zeros")

# ── Initialisation strategies ─────────────────────────────────────────
# Default: normal(0, 1) — often too large, should be scaled
emb_default = nn.Embedding(100, 32)
emb_scaled  = nn.Embedding(100, 32)
nn.init.normal_(emb_scaled.weight, mean=0, std=0.02)   # GPT-style init

print(f"\nEmbedding initialisation:")
print(f"  Default std: {emb_default.weight.std().item():.4f}  ← too large")
print(f"  Scaled std:  {emb_scaled.weight.std().item():.4f}   ← better (0.02)")

# ── Loading pretrained embeddings (GloVe/Word2Vec) ────────────────────
print("""
# Loading pretrained GloVe embeddings:
import numpy as np

def load_glove(path, vocab, dim=100):
    # path: 'glove.6B.100d.txt' from https://nlp.stanford.edu/projects/glove/
    emb_matrix = np.random.randn(len(vocab), dim) * 0.02
    found = 0
    with open(path) as f:
        for line in f:
            parts = line.split()
            word  = parts[0]
            if word in vocab:
                emb_matrix[vocab[word]] = np.array(parts[1:], dtype=float)
                found += 1
    print(f"Loaded {found}/{len(vocab)} GloVe vectors")
    return emb_matrix

# After loading:
# emb_layer = nn.Embedding(vocab_size, 100)
# emb_layer.weight.data.copy_(torch.FloatTensor(glove_matrix))
# emb_layer.weight.requires_grad = False  # freeze or fine-tune
""")

# ── Sentence similarity using embeddings ─────────────────────────────
torch.manual_seed(42)
emb = nn.Embedding(500, 32)

# "payment declined" vs "transaction rejected" vs "food delivery"
sents = [
    [10, 20],   # payment declined
    [30, 40],   # transaction rejected
    [50, 60],   # food delivery
]
sent_vecs = [emb(torch.tensor([s])).mean(dim=1).detach().numpy()[0]
             for s in sents]

def cosine(a, b):
    return float(np.dot(a,b)/(np.linalg.norm(a)*np.linalg.norm(b)+1e-8))

labels = ["payment declined", "transaction rejected", "food delivery"]
print("Sentence similarity (mean pooled embeddings, random init):")
for i in range(len(labels)):
    for j in range(i+1, len(labels)):
        sim = cosine(sent_vecs[i], sent_vecs[j])
        print(f"  {labels[i]:25} ↔ {labels[j]:20}: {sim:.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common tokenisation and embedding mistake — explained and fixed</h2>

        <ErrorBlock
          error="IndexError: index out of range in self — token ID exceeds embedding table size"
          cause="A token ID in your input is larger than or equal to the vocab_size used to create nn.Embedding. This happens when the tokeniser and embedding table were created with different vocabulary sizes, or when a custom tokeniser assigns IDs that exceed the expected range. Also caused by loading a tokeniser trained on a larger corpus than the embedding table was built for."
          fix="Always ensure the tokeniser vocab_size matches the nn.Embedding vocab_size exactly. Print tokenizer.vocab_size and check it equals the num_embeddings parameter. Add an assertion: assert max(token_ids) < emb_table.num_embeddings. For HuggingFace models use AutoModel.from_pretrained — it loads the tokeniser and model together with matching vocab sizes."
        />

        <ErrorBlock
          error="Tokeniser produces different results on the same text across different runs"
          cause="Some tokenisers have non-deterministic behaviour when trained from scratch using parallel workers. Also: the tokeniser was not saved and reloaded — a new tokeniser is retrained each run, producing a different vocabulary ordering. Vocabulary order is arbitrary unless the tokeniser is saved and loaded consistently."
          fix="Always save the trained tokeniser: tokenizer.save('tokenizer.json'). Load it back with: tokenizer = Tokenizer.from_file('tokenizer.json'). Never retrain the tokeniser during inference — train once, save, always load from the saved file. For HuggingFace tokenisers: tokenizer.save_pretrained('my_tokenizer_dir') and AutoTokenizer.from_pretrained('my_tokenizer_dir')."
        />

        <ErrorBlock
          error="OOV words are all mapped to [UNK] and the model performs poorly on domain text"
          cause="The tokeniser was trained on general text (Wikipedia, books) but the model is applied to domain-specific text (medical reports, legal documents, code, Hindi-English code-mixed text). Domain terms like 'thrombocytopenia' or 'UPI' or 'aadhaar' get mapped to [UNK] because they never appeared in the training corpus. A high [UNK] rate destroys model performance."
          fix="Use a subword tokeniser (BPE or SentencePiece) instead of word-level tokenisation — subword tokenisers never produce [UNK] because they fall back to character-level pieces. Alternatively fine-tune the tokeniser on domain data: run BPE training on your domain corpus and use the resulting vocabulary. For Hindi-English text, use a multilingual tokeniser like mBERT or XLM-RoBERTa."
        />

        <ErrorBlock
          error="BERT tokeniser adds [CLS] and [SEP] tokens but the model input length exceeds 512"
          cause="BERT has a maximum sequence length of 512 tokens including the [CLS] and [SEP] special tokens. Long documents tokenised without truncation produce sequences of 1000+ tokens. The position embedding table only has 512 rows — any token beyond position 512 has no positional encoding and causes an index error."
          fix="Always truncate when tokenising for BERT: tokenizer(text, max_length=512, truncation=True). For longer documents use a sliding window approach: split the document into overlapping chunks of 512 tokens, process each chunk, then aggregate predictions (majority vote for classification, average for regression). Or use Longformer/BigBird which support sequences up to 4096 tokens."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          Text is now numbers. Next: take a pretrained model
          and make it do your specific task.
        </h2>

        <p style={S.p}>
          You know how text becomes tokens and how tokens become dense vectors.
          The next step is using pretrained language models in production —
          loading BERT or RoBERTa from HuggingFace, fine-tuning on a
          labelled dataset, and deploying for inference.
          Module 50 covers the complete HuggingFace fine-tuning workflow —
          the Trainer API, evaluation, saving checkpoints, and serving
          predictions in production.
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
              Next — Module 50 · NLP
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Fine-tuning Pretrained Models with HuggingFace
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Trainer API, evaluation metrics, saving and loading checkpoints,
              and production inference — the complete fine-tuning workflow.
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
          'Tokenisation converts raw text to integer token IDs before any model processing. Word-level tokenisation suffers from OOV problems. Character-level produces very long sequences. Subword tokenisation (BPE, WordPiece, SentencePiece) is the standard — it never produces UNK by splitting unknown words into known subword pieces.',
          'BPE starts with a character vocabulary and iteratively merges the most frequent adjacent pair into a new token. After k merges the vocabulary has approximately k + n_chars tokens. The same merge rules are applied deterministically at inference time — making BPE reproducible and fast.',
          'GPT-family models use BPE (byte-level). BERT uses WordPiece — similar to BPE but merges are chosen to maximise the likelihood of the training corpus rather than frequency. Both produce ~30-100k token vocabularies. Always use the tokeniser that was trained with the model — never mix tokenisers.',
          'Static word embeddings (Word2Vec, GloVe) assign one fixed vector per word regardless of context. Contextual embeddings (BERT, RoBERTa) produce different vectors for the same word in different contexts — "bank" near "river" gets a different vector than "bank" near "transfer". Contextual embeddings almost always produce better downstream task performance.',
          'In PyTorch, nn.Embedding(vocab_size, d_model) is a lookup table of shape (vocab_size, d_model). padding_idx=0 ensures the padding token always returns a zero vector and receives no gradient. Always ensure the tokeniser vocab_size exactly matches the nn.Embedding num_embeddings parameter.',
          'For production NLP: never train embeddings from scratch unless you have 100M+ tokens. Load pretrained embeddings (GloVe for static, BERT/RoBERTa for contextual). Fine-tune on your domain data. Always save the tokeniser alongside the model — a different tokeniser will produce different token IDs and break the model entirely.',
        ]}
      />
    </LearnLayout>
  )
}