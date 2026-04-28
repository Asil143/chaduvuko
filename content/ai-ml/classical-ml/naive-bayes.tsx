import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Naive Bayes — Probabilistic Text Classification — Chaduvuko',
  description:
    'Bayes theorem applied to classification. Why the naive independence assumption works surprisingly well for spam filters and document classification — built from plain English first.',
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

function ConceptBox({ title, children, color = '#378ADD' }: {
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

export default function NaiveBayesPage() {
  return (
    <LearnLayout
      title="Naive Bayes — Probabilistic Text Classification"
      description="Bayes theorem applied to classification. Why the naive independence assumption works surprisingly well for spam filters and document classification."
      section="Classical ML"
      readTime="22–28 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="classical-ml" topic="naive-bayes" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any formula — what problem does this solve?</span>
        <h2 style={S.h2}>
          A new email arrives. It contains the words "free", "win", "cash", "claim".
          How do you know it is spam before reading it fully?
        </h2>

        <p style={S.p}>
          You have seen thousands of emails before. From that experience you know:
          the word "free" appears in 80% of spam emails but only 5% of legitimate ones.
          "Win" appears in 70% of spam but 2% of legitimate.
          "Meeting" appears in 0.1% of spam but 40% of legitimate.
        </p>

        <p style={S.p}>
          When a new email arrives, you look at the words it contains and ask:
          given these words, what is the probability this email is spam?
          You combine the evidence from each word to get an overall probability.
          If the probability of spam is above 50% you classify it as spam.
          That is the entire Naive Bayes algorithm.
        </p>

        <p style={S.p}>
          The "naive" part is an assumption: we treat each word as independent.
          The presence of "free" and the presence of "cash" in the same email
          are treated as if they provide completely separate, unrelated evidence.
          In reality these words are correlated — spam emails often contain both.
          The assumption is wrong. But it simplifies the math enormously
          and somehow still works very well in practice.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A doctor diagnosing a patient. The patient has three symptoms:
            fever, cough, and fatigue. The doctor looks up: how common is fever
            in patients with flu? How common is cough? How common is fatigue?
            The doctor combines all three answers — treating each symptom as
            independent evidence — to reach a diagnosis.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            In reality fever, cough, and fatigue are not independent — they
            often come together in flu. But treating them as independent
            gives a good enough estimate of "how likely is this flu vs cold vs allergies?"
            That is the naive assumption, and it works because the errors
            in each direction often cancel out.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          Naive Bayes is one of the fastest algorithms in all of ML.
          Training is a single pass through the data to count word frequencies.
          Prediction is a few multiplications. For text classification problems
          — spam detection, sentiment analysis, document categorisation —
          it is still the first algorithm many production teams reach for.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — BAYES THEOREM REVIEW ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The mathematical foundation</span>
        <h2 style={S.h2}>Bayes theorem — update your belief when you see evidence</h2>

        <p style={S.p}>
          Bayes theorem (from Module 08) says: the probability of a hypothesis
          given evidence equals the probability of the evidence given the hypothesis,
          times the prior probability of the hypothesis, divided by the probability
          of the evidence. Written in plain English:
        </p>

        <p style={S.p}>
          <em>How likely is this email spam, given the words I see?</em> equals
          <em> How likely are these words in a spam email?</em> times
          <em> How common is spam overall?</em> divided by
          <em> How likely are these words in any email?</em>
        </p>

        <VisualBox label="Bayes theorem — each term explained">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 16, color: '#378ADD',
              padding: '14px 16px', textAlign: 'center' as const,
              borderBottom: '1px solid var(--border)',
            }}>
              P(spam | words) = P(words | spam) × P(spam) / P(words)
            </div>
            {[
              {
                term: 'P(spam | words)',
                name: 'Posterior',
                color: '#378ADD',
                desc: 'What we want: probability this email is spam, GIVEN we have seen the words it contains. This is what we compute and use to classify.',
              },
              {
                term: 'P(words | spam)',
                name: 'Likelihood',
                color: '#1D9E75',
                desc: 'How likely are these specific words in a spam email? Learned from training data: count how often each word appears in spam emails.',
              },
              {
                term: 'P(spam)',
                name: 'Prior',
                color: '#D85A30',
                desc: 'How common is spam overall? If 30% of all emails in training were spam, this is 0.30. This is the base rate before seeing any evidence.',
              },
              {
                term: 'P(words)',
                name: 'Evidence',
                color: '#BA7517',
                desc: 'How likely are these words in any email at all? This is the same for all classes, so in practice we ignore it and just compare numerators.',
              },
            ].map((row) => (
              <div key={row.term} style={{
                display: 'grid', gridTemplateColumns: '170px 80px 1fr',
                gap: 14, padding: '10px 16px',
                borderBottom: '1px solid var(--border)',
                alignItems: 'start',
              }}>
                <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: row.color }}>
                  {row.term}
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: row.color,
                  fontFamily: 'var(--font-mono)', padding: '2px 6px',
                  background: `${row.color}15`, borderRadius: 3,
                  height: 'fit-content',
                }}>
                  {row.name}
                </span>
                <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
                  {row.desc}
                </span>
              </div>
            ))}
          </div>
        </VisualBox>

        <h3 style={S.h3}>The naive extension — combining multiple features</h3>

        <p style={S.p}>
          An email has many words, not just one. To combine evidence from all words
          we use the naive independence assumption: the probability of seeing all
          the words together in a spam email equals the product of their individual
          probabilities. This is the "naive" assumption — words are treated as
          independent of each other.
        </p>

        <ConceptBox title="Naive Bayes formula for text classification">
          <div style={{ fontFamily: 'var(--font-mono)', lineHeight: 2.2, fontSize: 13 }}>
            <div style={{ color: '#378ADD', marginBottom: 6 }}>
              P(spam | w₁, w₂, ..., wₙ) ∝ P(spam) × P(w₁|spam) × P(w₂|spam) × ... × P(wₙ|spam)
            </div>
            <div style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.7 }}>
              ∝ means "proportional to" — we skip dividing by P(words) since it is the same for all classes.<br />
              We compute this for every class and pick the class with the highest value.<br />
              In practice: use log probabilities to avoid numerical underflow from multiplying many small numbers.
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np

# ── Naive Bayes from scratch for text classification ──────────────────
# DoorDash customer reviews: positive vs negative sentiment

training_data = [
    # (text, label)  1=positive, 0=negative
    ("food was amazing delivery was fast",         1),
    ("excellent service quick delivery loved it",  1),
    ("great food on time highly recommend",        1),
    ("very good taste will order again",           1),
    ("food was cold delivery was late terrible",   0),
    ("worst experience ever food was bad",         0),
    ("very late delivery food arrived cold",       0),
    ("bad quality terrible service never again",   0),
]

# ── Step 1: Training — count word frequencies per class ──────────────
from collections import defaultdict

class NaiveBayesScratch:
    def __init__(self, alpha=1.0):
        self.alpha = alpha    # Laplace smoothing parameter
        self.class_priors   = {}   # P(class)
        self.word_probs     = {}   # P(word | class)
        self.vocab          = set()

    def fit(self, texts, labels):
        labels = np.array(labels)
        classes = np.unique(labels)
        n_total = len(labels)

        for c in classes:
            # Prior: P(class) = count(class) / total
            self.class_priors[c] = (labels == c).sum() / n_total

            # Collect all words in documents of this class
            class_texts = [texts[i] for i in range(len(texts)) if labels[i] == c]
            word_counts = defaultdict(int)
            total_words = 0
            for text in class_texts:
                for word in text.split():
                    word_counts[word] += 1
                    total_words += 1
                    self.vocab.add(word)

            self.word_probs[c] = (word_counts, total_words)

        return self

    def _word_log_prob(self, word, c):
        """
        P(word | class) with Laplace smoothing.
        Laplace smoothing: add alpha to every word count,
        add alpha * vocab_size to total.
        Prevents P(word | class) = 0 for unseen words.
        """
        word_counts, total_words = self.word_probs[c]
        count = word_counts.get(word, 0)
        # Smoothed probability
        prob = (count + self.alpha) / (total_words + self.alpha * len(self.vocab))
        return np.log(prob)

    def predict_proba_single(self, text):
        words = text.split()
        scores = {}
        for c in self.class_priors:
            # Start with log prior
            log_score = np.log(self.class_priors[c])
            # Add log likelihood for each word
            for word in words:
                log_score += self._word_log_prob(word, c)
            scores[c] = log_score

        # Convert log scores to probabilities
        max_score = max(scores.values())
        exp_scores = {c: np.exp(s - max_score) for c, s in scores.items()}
        total = sum(exp_scores.values())
        return {c: v / total for c, v in exp_scores.items()}

    def predict(self, texts):
        predictions = []
        for text in texts:
            proba = self.predict_proba_single(text)
            predictions.append(max(proba, key=proba.get))
        return np.array(predictions)


texts  = [t for t, _ in training_data]
labels = [l for _, l in training_data]

nb = NaiveBayesScratch(alpha=1.0)
nb.fit(texts, labels)

# Test on new reviews
test_reviews = [
    "food was amazing quick delivery",
    "terrible food arrived very late",
    "good taste will order again",
]

print("Predictions on new reviews:")
for review in test_reviews:
    proba = nb.predict_proba_single(review)
    pred  = max(proba, key=proba.get)
    label = "POSITIVE" if pred == 1 else "NEGATIVE"
    print(f"  '{review}'")
    print(f"   → {label}  (P(pos)={proba[1]:.3f}, P(neg)={proba[0]:.3f})")
    print()`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — THREE VARIANTS ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Which Naive Bayes to use</span>
        <h2 style={S.h2}>Three variants — one for each type of feature</h2>

        <p style={S.p}>
          "Naive Bayes" is not one algorithm — it is a family.
          The difference between variants is only in how they model
          <span style={S.code as React.CSSProperties}> P(feature | class)</span> —
          the likelihood of seeing each feature value in each class.
          The right choice depends on what type of features you have.
        </p>

        <VisualBox label="Three Naive Bayes variants — when to use each">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                name: 'MultinomialNB',
                color: '#378ADD',
                features: 'Count data — word counts, term frequencies, occurrence counts',
                assumption: 'P(word | class) follows a multinomial distribution. Models how often each word appears.',
                when: 'Text classification with word counts or TF-IDF. The most common variant for NLP.',
                sklearn: 'MultinomialNB(alpha=1.0)',
                note: 'Requires non-negative features. Use with CountVectorizer or TfidfVectorizer.',
              },
              {
                name: 'BernoulliNB',
                color: '#1D9E75',
                features: 'Binary data — word present/absent, 0/1 features',
                assumption: 'Each feature is a binary variable: does this word appear in the document (yes/no)?',
                when: 'Short texts, binary feature vectors, spam detection where presence matters more than count.',
                sklearn: 'BernoulliNB(alpha=1.0)',
                note: 'Penalises absent features explicitly — important when non-occurrence is informative.',
              },
              {
                name: 'GaussianNB',
                color: '#D85A30',
                features: 'Continuous numeric features',
                assumption: 'P(feature | class) follows a Gaussian (normal) distribution. Learns mean and variance per feature per class.',
                when: 'Numeric features like age, salary, temperature. Not for text.',
                sklearn: 'GaussianNB(var_smoothing=1e-9)',
                note: 'No alpha smoothing parameter — uses var_smoothing to add small variance to prevent zero-variance features.',
              },
            ].map((item) => (
              <div key={item.name} style={{
                background: 'var(--surface)', border: `1px solid ${item.color}25`,
                borderRadius: 8, padding: '13px 16px',
                borderLeft: `4px solid ${item.color}`,
              }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>
                    {item.name}
                  </span>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: item.color,
                    background: `${item.color}15`, padding: '2px 8px', borderRadius: 3 }}>
                    {item.sklearn}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 3 }}>
                      FEATURES
                    </div>
                    <p style={{ ...S.ps, marginBottom: 5 }}>{item.features}</p>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 3 }}>
                      ASSUMPTION
                    </div>
                    <p style={{ ...S.ps, marginBottom: 0 }}>{item.assumption}</p>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 3 }}>
                      USE WHEN
                    </div>
                    <p style={{ ...S.ps, marginBottom: 5 }}>{item.when}</p>
                    <div style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>
                      {item.note}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
from sklearn.naive_bayes import MultinomialNB, BernoulliNB, GaussianNB
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report, accuracy_score
from sklearn.pipeline import Pipeline

np.random.seed(42)

# ── Dataset: DoorDash customer support tickets ─────────────────────────
# Categories: delivery_issue, food_quality, payment_issue, general
texts = [
    # delivery issues
    "order not delivered yet where is my food",
    "delivery taking too long its been 2 hours",
    "wrong address delivery failed please help",
    "rider called from wrong location delivery late",
    "estimated time was 30 minutes now 90 minutes",
    # food quality
    "food was cold when it arrived terrible",
    "wrong items received not what i ordered",
    "food quality very bad not fresh at all",
    "packaging was broken food spilled everywhere",
    "taste was awful completely different from menu",
    # payment issues
    "payment deducted but order not placed",
    "double charged for single order refund please",
    "coupon code not applied payment failed",
    "wallet balance not updated after cancellation",
    "upi payment failed but money deducted",
    # general
    "how do i change my delivery address",
    "want to cancel my subscription please",
    "how do i rate my delivery partner",
    "what are your customer service hours",
    "how do i delete my account",
] * 20   # repeat to get more samples

labels = (
    ['delivery'] * 5 + ['food'] * 5 +
    ['payment'] * 5 + ['general'] * 5
) * 20

X_train_txt, X_test_txt, y_train, y_test = train_test_split(
    texts, labels, test_size=0.2, stratify=labels, random_state=42
)

# ── MultinomialNB with CountVectorizer (word counts) ──────────────────
pipe_count = Pipeline([
    ('vectorizer', CountVectorizer(
        ngram_range=(1, 2),    # unigrams and bigrams
        min_df=2,              # ignore rare terms
        stop_words='english',
    )),
    ('model', MultinomialNB(alpha=1.0)),
])
pipe_count.fit(X_train_txt, y_train)
count_acc = accuracy_score(y_test, pipe_count.predict(X_test_txt))

# ── MultinomialNB with TF-IDF ─────────────────────────────────────────
pipe_tfidf = Pipeline([
    ('vectorizer', TfidfVectorizer(
        ngram_range=(1, 2),
        min_df=2,
        stop_words='english',
        sublinear_tf=True,     # log(1 + tf) dampens very frequent words
    )),
    ('model', MultinomialNB(alpha=0.1)),
])
pipe_tfidf.fit(X_train_txt, y_train)
tfidf_acc = accuracy_score(y_test, pipe_tfidf.predict(X_test_txt))

# ── BernoulliNB — binary presence/absence ─────────────────────────────
pipe_bern = Pipeline([
    ('vectorizer', CountVectorizer(
        binary=True,           # convert counts to 0/1
        ngram_range=(1, 2),
        min_df=2,
        stop_words='english',
    )),
    ('model', BernoulliNB(alpha=1.0)),
])
pipe_bern.fit(X_train_txt, y_train)
bern_acc = accuracy_score(y_test, pipe_bern.predict(X_test_txt))

print(f"{'Variant':<30} {'Test Accuracy'}")
print("─" * 44)
print(f"  MultinomialNB + CountVect:     {count_acc:.4f}")
print(f"  MultinomialNB + TF-IDF:        {tfidf_acc:.4f}")
print(f"  BernoulliNB + binary:          {bern_acc:.4f}")

print("\nClassification report (MultinomialNB + TF-IDF):")
print(classification_report(y_test, pipe_tfidf.predict(X_test_txt)))

# ── Classify new tickets ───────────────────────────────────────────────
new_tickets = [
    "my order has not arrived it has been 3 hours",
    "food tastes very bad not fresh",
    "charged twice for same order need refund",
    "how do i update my phone number",
]
predictions = pipe_tfidf.predict(new_tickets)
probas      = pipe_tfidf.predict_proba(new_tickets)

print("New ticket classification:")
for ticket, pred, proba in zip(new_tickets, predictions, probas):
    classes   = pipe_tfidf.classes_
    top_class = pred
    top_prob  = proba.max()
    print(f"  '{ticket[:45]}...'")
    print(f"   → {top_class.upper()}  (confidence: {top_prob:.2%})")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — LAPLACE SMOOTHING ══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most important detail</span>
        <h2 style={S.h2}>Laplace smoothing — why a zero probability destroys everything</h2>

        <p style={S.p}>
          Imagine a word that appears in test data but never appeared in any
          spam email in training. Without smoothing, its probability given spam
          is exactly 0. When you multiply all word probabilities together —
          which is what Naive Bayes does — a single zero makes the entire
          product zero. One unseen word makes it impossible to classify
          the email as spam, no matter how many other spam indicators it contains.
        </p>

        <p style={S.p}>
          Laplace smoothing (also called additive smoothing) fixes this by adding
          a small count to every word — even words that never appeared.
          Adding 1 to every word count (alpha=1) ensures no probability is ever
          exactly zero. The vocabulary expands to include all possible words,
          each with a small non-zero count.
        </p>

        <ConceptBox title="Laplace smoothing formula — alpha prevents zero probabilities">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 2.2 }}>
            <div style={{ color: '#378ADD', marginBottom: 6 }}>
              P(word | class) = (count(word, class) + α) / (total_words_in_class + α × |vocab|)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12, color: 'var(--muted)' }}>
              <div>α = 1.0 (alpha): standard Laplace smoothing — adds 1 to every count</div>
              <div>α = 0.1: lighter smoothing — less bias toward uniform distribution</div>
              <div>α = 0:  no smoothing — zero probabilities possible (dangerous)</div>
              <div>|vocab|: size of the vocabulary (number of unique words seen in training)</div>
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import numpy as np
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score

# ── Demonstrate zero probability problem without smoothing ────────────
train_texts = [
    "free money win prize claim now",
    "free offer win cash reward today",
    "winner selected claim your prize free",
    "meeting tomorrow at 9am conference room",
    "project update please review attached",
    "team lunch scheduled for friday noon",
]
train_labels = [1, 1, 1, 0, 0, 0]   # 1=spam, 0=legit

# Test email with an unseen word
test_text = ["free money meeting tomorrow quantum"]
# "quantum" never appeared in training

vec   = CountVectorizer()
X_tr  = vec.fit_transform(train_texts)
X_te  = vec.transform(test_text)

print("Effect of alpha (Laplace smoothing) on classification:")
print(f"\nTest email: '{test_text[0]}'")
print(f"Contains 'quantum' — a word never seen in training\n")

for alpha in [0.0001, 0.1, 0.5, 1.0, 2.0, 5.0, 10.0]:
    nb   = MultinomialNB(alpha=alpha)
    nb.fit(X_tr, train_labels)
    pred  = nb.predict(X_te)[0]
    proba = nb.predict_proba(X_te)[0]
    label = "SPAM" if pred == 1 else "LEGIT"
    print(f"  alpha={alpha:<6}: {label}  P(spam)={proba[1]:.4f}  P(legit)={proba[0]:.4f}")

# ── How to choose alpha ───────────────────────────────────────────────
# Use cross-validation — treat alpha like any other hyperparameter
np.random.seed(42)
from sklearn.datasets import fetch_20newsgroups

# Use a small subset of 20newsgroups for speed
newsgroups = fetch_20newsgroups(
    subset='train',
    categories=['sci.med', 'sci.space', 'rec.sport.baseball', 'talk.politics.guns'],
    remove=('headers', 'footers', 'quotes'),
    random_state=42,
)
X_news = newsgroups.data[:400]
y_news = newsgroups.target[:400]

print("\nAlpha tuning on 20Newsgroups (4 categories):")
best_alpha, best_score = 1.0, 0.0
for alpha in [0.001, 0.01, 0.1, 0.5, 1.0, 2.0, 5.0]:
    pipe = Pipeline([
        ('vec', CountVectorizer(min_df=2, stop_words='english')),
        ('nb',  MultinomialNB(alpha=alpha)),
    ])
    scores = cross_val_score(pipe, X_news, y_news, cv=5, scoring='accuracy')
    mean   = scores.mean()
    if mean > best_score:
        best_score, best_alpha = mean, alpha
    print(f"  alpha={alpha:<6}: CV acc = {mean:.4f} ± {scores.std():.4f}")

print(f"\nBest alpha: {best_alpha}  (CV acc = {best_score:.4f})")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — GAUSSIAN NB ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Numeric features</span>
        <h2 style={S.h2}>GaussianNB — Naive Bayes for continuous features</h2>

        <p style={S.p}>
          When features are continuous numbers — like delivery distance, order value,
          or customer age — you cannot count occurrences.
          GaussianNB assumes each feature follows a Gaussian (normal) distribution
          within each class. During training it learns the mean and variance of
          each feature for each class. During prediction it computes how likely
          the observed feature value is given each class's Gaussian distribution.
        </p>

        <CodeBlock code={`import numpy as np
from sklearn.naive_bayes import GaussianNB
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report, accuracy_score
from sklearn.pipeline import Pipeline
import warnings
warnings.filterwarnings('ignore')

np.random.seed(42)
n = 3000

# DoorDash late delivery classification
distance   = np.abs(np.random.normal(4.0, 2.0, n)).clip(0.5, 15)
traffic    = np.random.randint(1, 11, n).astype(float)
prep       = np.abs(np.random.normal(15, 5, n)).clip(5, 35)
order_val  = np.abs(np.random.normal(350, 150, n)).clip(50, 1200)
delivery   = (8.6 + 7.3*distance + 0.8*prep + 1.5*traffic
              + np.random.normal(0, 4, n)).clip(10, 120)
y = (delivery > 45).astype(int)

X = np.column_stack([distance, traffic, prep, order_val])
feat_names = ['distance_km', 'traffic_score', 'restaurant_prep', 'order_value']

X_tr, X_te, y_tr, y_te = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# ── GaussianNB — no scaling needed (it models the distribution itself) ─
gnb = GaussianNB()
gnb.fit(X_tr, y_tr)

print(f"GaussianNB accuracy: {accuracy_score(y_te, gnb.predict(X_te)):.4f}")
print(f"CV accuracy: {cross_val_score(gnb, X, y, cv=5).mean():.4f}")

# ── What GaussianNB learned: per-class Gaussian parameters ────────────
print("\nLearned Gaussian parameters per class:")
print(f"{'Feature':<20} {'Mean (on-time)':<18} {'Mean (late)':<16} {'Std (on-time)':<16} {'Std (late)'}")
print("─" * 84)
for i, name in enumerate(feat_names):
    mean_0 = gnb.theta_[0, i]       # mean for class 0 (on-time)
    mean_1 = gnb.theta_[1, i]       # mean for class 1 (late)
    std_0  = np.sqrt(gnb.var_[0, i])
    std_1  = np.sqrt(gnb.var_[1, i])
    print(f"  {name:<18}  {mean_0:<18.2f} {mean_1:<16.2f} {std_0:<16.2f} {std_1:.2f}")

print(f"\nClass priors: on-time={gnb.class_prior_[0]:.3f}  late={gnb.class_prior_[1]:.3f}")

# ── Intuition check: late deliveries should have larger distance & traffic
print("\nInterpretation check:")
for i, name in enumerate(feat_names):
    diff = gnb.theta_[1, i] - gnb.theta_[0, i]
    direction = "higher in late" if diff > 0 else "lower in late"
    print(f"  {name:<20}: {direction} (diff = {diff:+.2f})")

# ── Compare GaussianNB vs other algorithms on numeric features ─────────
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

print("\nAlgorithm comparison on DoorDash numeric features:")
for name, model in [
    ('GaussianNB',          GaussianNB()),
    ('LogisticRegression',  LogisticRegression(max_iter=1000, random_state=42)),
    ('RandomForest',        RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)),
]:
    scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')
    print(f"  {name:<22}: {scores.mean():.4f} ± {scores.std():.4f}")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — WHAT THIS LOOKS LIKE AT WORK ══════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What this looks like at work</span>
        <h2 style={S.h2}>Day-one task — build a DoorDash review sentiment classifier</h2>

        <p style={S.p}>
          Your first week at DoorDash's data team.
          The product manager asks: "Can you automatically classify
          customer reviews as positive or negative so we can route
          negative ones to customer support immediately?"
          250,000 reviews per month. You need something fast,
          accurate enough, and deployable by end of week.
          Naive Bayes is the right answer.
        </p>

        <CodeBlock code={`import numpy as np
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.pipeline import Pipeline
from sklearn.calibration import CalibratedClassifierCV
import joblib

np.random.seed(42)

# ── Simulated DoorDash review dataset ───────────────────────────────────
positive_templates = [
    "food was excellent delivery was super fast loved it",
    "amazing taste quick delivery will definitely order again",
    "perfect order arrived hot and fresh great experience",
    "best food in the area fast delivery highly recommend",
    "food quality outstanding delivery partner was very polite",
    "on time delivery tasty food great packaging",
    "wow this restaurant never disappoints fast and delicious",
    "ordered for the third time always consistent quality",
]
negative_templates = [
    "food was cold delivery took forever terrible experience",
    "wrong items delivered complained but no response",
    "very late delivery food quality was awful never again",
    "packaging damaged food spilled very disappointed",
    "delivery partner rude and slow food tasted bad",
    "paid premium for cold food unacceptable quality",
    "worst order ever stale food extreme delay",
    "missing items delivery person unreachable pathetic service",
]

# Generate dataset with variations
reviews, sentiments = [], []
for i in range(2000):
    if np.random.random() > 0.45:   # 55% positive
        template = positive_templates[i % len(positive_templates)]
        reviews.append(template + f" order {i}")
        sentiments.append(1)
    else:
        template = negative_templates[i % len(negative_templates)]
        reviews.append(template + f" order {i}")
        sentiments.append(0)

X_train, X_test, y_train, y_test = train_test_split(
    reviews, sentiments, test_size=0.2,
    stratify=sentiments, random_state=42
)

# ── Production pipeline ───────────────────────────────────────────────
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(
        ngram_range=(1, 2),       # unigrams + bigrams
        min_df=2,                 # ignore words in < 2 docs
        max_df=0.95,              # ignore words in > 95% of docs (too common)
        stop_words='english',
        sublinear_tf=True,        # dampen very frequent words
        max_features=10_000,      # cap vocabulary size
    )),
    ('model', MultinomialNB(alpha=0.1)),
])

# ── Cross-validation ──────────────────────────────────────────────────
cv_scores = cross_val_score(
    pipeline, reviews, sentiments,
    cv=5, scoring='f1', n_jobs=-1
)
print(f"5-fold CV F1: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")

# ── Train and evaluate ────────────────────────────────────────────────
pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)
print(classification_report(y_test, y_pred,
                             target_names=['Negative', 'Positive']))

# ── Most informative features ─────────────────────────────────────────
# The words that most strongly predict each class
tfidf   = pipeline.named_steps['tfidf']
nb      = pipeline.named_steps['model']
vocab   = np.array(tfidf.get_feature_names_out())

# Log probability ratio: high = strong positive signal, low = strong negative signal
log_ratios = nb.feature_log_prob_[1] - nb.feature_log_prob_[0]

print("\nTop 10 most positive words:")
for word in vocab[np.argsort(log_ratios)[-10:][::-1]]:
    print(f"  + {word}")

print("\nTop 10 most negative words:")
for word in vocab[np.argsort(log_ratios)[:10]]:
    print(f"  - {word}")

# ── Real-time scoring ─────────────────────────────────────────────────
new_reviews = [
    "food was amazing delivery was so fast will order again",
    "terrible experience food arrived cold and late never ordering again",
    "good food but delivery was a bit slow overall okay",
]
predictions = pipeline.predict(new_reviews)
probabilities = pipeline.predict_proba(new_reviews)

print("\nReal-time review scoring:")
for review, pred, proba in zip(new_reviews, predictions, probabilities):
    sentiment = "POSITIVE" if pred == 1 else "NEGATIVE"
    confidence = proba.max()
    route = "→ Route to support" if pred == 0 and confidence > 0.75 else "→ No action needed"
    print(f"  Review: '{review[:50]}...'")
    print(f"  {sentiment} ({confidence:.1%} confidence) {route}")
    print()

# ── Save model ────────────────────────────────────────────────────────
joblib.dump(pipeline, '/tmp/swiggy_sentiment_nb.pkl')
print("Model saved — ready for production deployment")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common Naive Bayes error — explained and fixed</h2>

        <ErrorBlock
          error="ValueError: Input X must be non-negative when using MultinomialNB"
          cause="MultinomialNB requires non-negative feature values because it models word counts — negative counts make no mathematical sense. This error appears when you pass raw TF-IDF scores that have been modified (e.g. by subtracting a mean), or when you use a StandardScaler before MultinomialNB which centres features around zero."
          fix="Never use StandardScaler before MultinomialNB. TF-IDF and CountVectorizer already produce non-negative values — do not modify them. If you have numeric features that you need to scale, switch to GaussianNB (designed for continuous features) or use MinMaxScaler(feature_range=(0, 1)) which preserves non-negativity."
        />

        <ErrorBlock
          error="Naive Bayes gives overconfident probabilities — predicts 0.999 for most samples"
          cause="The naive independence assumption causes probability estimates to be extreme. When the model multiplies many individual word probabilities together, the product of slightly-high probabilities becomes very close to 1, and slightly-low becomes very close to 0. The model is correct about the direction but wrong about the magnitude of certainty."
          fix="Use CalibratedClassifierCV to post-process probabilities: calibrated = CalibratedClassifierCV(pipeline, cv=5, method='isotonic').fit(X_train, y_train). This maps the raw predicted probabilities to calibrated ones using a held-out calibration set. For applications that need well-calibrated probabilities (e.g. risk scoring), this calibration step is essential."
        />

        <ErrorBlock
          error="MultinomialNB performs poorly on short texts or single-sentence reviews"
          cause="Short texts have very few words. With only 5–8 words per document, many documents produce identical feature vectors — the vocabulary is too small to discriminate. Also, rare words that strongly indicate a category may appear in only one or two training documents, making their probability estimates unreliable."
          fix="Use BernoulliNB instead for short texts — it explicitly penalises absent features, which is more informative for short documents. Reduce alpha for less smoothing (try 0.1 or 0.01). Add character n-grams in the vectorizer: TfidfVectorizer(analyzer='char_wb', ngram_range=(3,5)) captures subword patterns robust to short text."
        />

        <ErrorBlock
          error="Model classifies everything as the majority class on imbalanced dataset"
          cause="Naive Bayes uses class priors — if 90% of your training data is positive, P(positive) = 0.9 is used as a prior. Combined with any ambiguous evidence, the model defaults to predicting positive for everything. Small classes get overwhelmed by the large prior."
          fix="Pass class_prior to override the learned prior: MultinomialNB(class_prior=[0.5, 0.5]) treats both classes equally regardless of training frequency. Or use fit_prior=False which ignores the class prior entirely. For production, balance your training set with oversampling before fitting, or tune class_prior values with cross-validation."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You have now covered every major classical ML algorithm.
          Next: ensemble methods that combine them.
        </h2>

        <p style={S.p}>
          Linear Regression, Logistic Regression, Decision Trees, SVM, KNN, Naive Bayes —
          six algorithms, six different philosophies. Linear regression fits a line.
          Logistic regression finds a probability boundary. Decision trees grow
          a flowchart. SVMs maximise a margin. KNN asks its neighbours.
          Naive Bayes applies Bayes theorem. Each has a domain where it wins.
        </p>

        <p style={S.p}>
          Module 28 — Random Forest — combines hundreds of decision trees
          through a technique called bagging. Each tree is trained on a
          random subset of data with a random subset of features.
          Their predictions are averaged. The result consistently beats
          any single tree on almost every tabular dataset.
          It is one of the first algorithms you should reach for in production.
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
              textTransform: 'uppercase' as const, color: '#378ADD',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Module 28 · Classical ML
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Random Forest — Instacart Stock Prediction
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Bagging, random feature subsets, out-of-bag evaluation,
              and why Random Forest beats a single tree on every real dataset.
            </p>
          </div>
          <a href="/learn/ai-ml/classical-ml/random-forest" style={{
            fontSize: 12, color: '#378ADD',
            border: '1px solid #378ADD50',
            padding: '7px 14px', borderRadius: 6,
            fontFamily: 'var(--font-mono)',
            textDecoration: 'none',
            background: '#378ADD10',
          }}>
            read →
          </a>
        </div>
      </div>

      <KeyTakeaways
        items={[
          'Naive Bayes uses Bayes theorem to compute the probability of each class given the input features. It picks the class with the highest posterior probability. The "naive" part is treating each feature as independent — wrong in theory, works well in practice.',
          'Three variants for three feature types: MultinomialNB for word counts and text (most common), BernoulliNB for binary presence/absence features especially in short texts, GaussianNB for continuous numeric features.',
          'Laplace smoothing (alpha parameter) is essential. Without it, a single word that never appeared in training causes the entire probability to become zero. Alpha=1.0 is standard. Tune it with cross-validation — alpha=0.1 often outperforms the default on text.',
          'Naive Bayes is one of the fastest ML algorithms — training is a single pass to count frequencies. Prediction is a few multiplications. For high-volume real-time classification (spam, sentiment, support ticket routing) it is often the most practical choice.',
          'The independence assumption makes Naive Bayes probabilities overconfident — predictions cluster near 0 and 1. When you need calibrated probabilities, post-process with CalibratedClassifierCV(method="isotonic").',
          'Naive Bayes genuinely wins for text classification with small datasets, real-time requirements, or high-dimensional sparse features. For tabular numeric data with strong feature correlations, Logistic Regression or Random Forest almost always outperforms it.',
        ]}
      />
    </LearnLayout>
  )
}