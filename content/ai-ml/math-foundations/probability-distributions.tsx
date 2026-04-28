import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Probability Distributions and Bayes Theorem — Chaduvuko',
  description:
    'How ML models reason under uncertainty. Probability distributions, Bayes theorem, MLE, and why every loss function is secretly a probability model in disguise.',
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
  p: { fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 16 },
  ps: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 10 },
  sec: { paddingBottom: 56, paddingTop: 8, borderBottom: '1px solid var(--border)' },
  code: {
    fontFamily: 'var(--font-mono)', fontSize: 12,
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: 4, padding: '1px 6px', color: 'var(--accent)',
  },
}

function Div() { return <div style={{ height: 56 }} /> }

function HBox({ children, color = 'var(--accent)' }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderLeft: `3px solid ${color}`, borderRadius: 8,
      padding: '13px 17px', marginBottom: 20,
    }}>
      {children}
    </div>
  )
}

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

function MathBox({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: 10,
      overflow: 'hidden', marginBottom: 24,
    }}>
      <div style={{
        padding: '8px 14px', background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#7F77DD' }} />
        <span style={{
          fontSize: 11, fontWeight: 700, color: '#7F77DD',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.07em',
          textTransform: 'uppercase' as const,
        }}>
          {label}
        </span>
        <span style={{ fontSize: 10, color: 'var(--muted)', marginLeft: 'auto' }}>
          optional — read when ready
        </span>
      </div>
      <div style={{ padding: '16px 20px', background: 'var(--bg2)' }}>
        {children}
      </div>
    </div>
  )
}

export default function ProbabilityDistributionsPage() {
  return (
    <LearnLayout
      title="Probability Distributions and Bayes Theorem"
      description="How ML models reason under uncertainty. Distributions, Bayes theorem, MLE, and why every loss function is secretly a probability model."
      section="Math Foundations"
      readTime="36–45 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section='math-foundations' topic='probability-distributions' />

      {/* ══ SECTION 1 — WHY PROBABILITY ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Why ML needs probability</span>
        <h2 style={S.h2}>
          The world is uncertain. ML models have to be honest about that.
        </h2>

        <p style={S.p}>
          DoorDash's delivery time model predicts 32 minutes.
          But it doesn't mean delivery will take exactly 32 minutes.
          It means 32 minutes is the most likely outcome — given current
          traffic, distance, and restaurant load.
          The actual time could be 28 or 38. The model is uncertain.
        </p>

        <p style={S.p}>
          Every ML model is fundamentally a probability machine.
          A spam classifier doesn't output "spam" — it outputs 0.94,
          meaning it's 94% confident this email is spam.
          An image classifier outputs a probability for each possible class.
          Even a regression model is implicitly saying:
          "I expect the true value to be normally distributed around my prediction."
        </p>

        <p style={S.p}>
          Once you understand probability, three things that seemed arbitrary
          suddenly make complete sense: why we use cross-entropy loss for
          classification, why we use MSE loss for regression, and what
          Bayes theorem has to do with any of it.
        </p>

        <HBox color="#7F77DD">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              What this module covers:
            </span>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'What a probability distribution is and why ML needs several different ones',
              'The five distributions that appear most often in ML — with real examples',
              'Expected value, variance, and covariance — the three statistics that describe any distribution',
              'Bayes theorem — the most important equation in all of statistics',
              'Maximum Likelihood Estimation — how models find the best parameters from data',
              'Why MSE loss assumes Gaussian noise and cross-entropy assumes Bernoulli outputs',
              'Information theory basics — entropy, cross-entropy, and KL divergence',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <div style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: '#7F77DD', flexShrink: 0, marginTop: 7,
                }} />
                <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </HBox>

        <Callout type="tip">
          This module has more concepts than the previous ones but each one
          is short. Read it in order — each concept is the foundation of the next.
          The payoff comes at the end when everything connects to the loss
          functions you will use every day in ML.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — WHAT IS PROBABILITY ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The foundation</span>
        <h2 style={S.h2}>What probability actually means</h2>

        <p style={S.p}>
          Probability is a number between 0 and 1 that measures how likely
          an event is to occur. 0 means impossible. 1 means certain.
          0.7 means it happens 70% of the time if you ran the same situation
          repeatedly under the same conditions.
        </p>

        <p style={S.p}>
          A <strong>random variable</strong> is a variable whose value is
          determined by a random process. The delivery time for a DoorDash order
          is a random variable — it depends on traffic, restaurant speed,
          driver availability, and dozens of other unpredictable factors.
          When we call it "random" we don't mean completely unpredictable —
          we mean there's inherent variation we can't fully control.
        </p>

        <p style={S.p}>
          A <strong>probability distribution</strong> describes all the possible
          values a random variable can take and how likely each one is.
          It's the full picture of the uncertainty — not just the most likely
          value, but the entire spread of possibilities.
        </p>

        <VisualBox label="Two types of random variables">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid rgba(55,138,221,0.3)',
              borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{
                fontSize: 13, fontWeight: 700, color: '#378ADD',
                fontFamily: 'var(--font-display)', marginBottom: 6,
              }}>
                Discrete
              </div>
              <p style={{ ...S.ps, marginBottom: 8 }}>
                Takes specific countable values. There are gaps between possible values.
              </p>
              <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.7, fontFamily: 'var(--font-mono)' }}>
                Number of items in a DoorDash order: 1, 2, 3, 4...<br />
                Fraud or not: 0 or 1<br />
                Star rating: 1, 2, 3, 4, 5<br />
                Number of late orders today: 0, 1, 2...
              </div>
            </div>
            <div style={{
              background: 'var(--surface)', border: '1px solid rgba(29,158,117,0.3)',
              borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{
                fontSize: 13, fontWeight: 700, color: '#1D9E75',
                fontFamily: 'var(--font-display)', marginBottom: 6,
              }}>
                Continuous
              </div>
              <p style={{ ...S.ps, marginBottom: 8 }}>
                Takes any value in a range. Infinite possible values, no gaps.
              </p>
              <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.7, fontFamily: 'var(--font-mono)' }}>
                Delivery time: 31.42... minutes<br />
                Model weight: -0.0042316...<br />
                Temperature: 28.7°C<br />
                Loss value: 0.34812...
              </div>
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

np.random.seed(42)

# Discrete: number of items in a DoorDash order
# Simulating 1000 orders — most have 2-3 items
order_items = np.random.randint(1, 8, size=1000)
values, counts = np.unique(order_items, return_counts=True)
probabilities = counts / len(order_items)

print("Discrete distribution — items per order:")
for val, prob in zip(values, probabilities):
    bar = '█' * int(prob * 40)
    print(f"  {val} items: {bar} {prob:.3f}")

# Continuous: delivery time in minutes
# Simulating normally distributed delivery times
delivery_times = np.random.normal(loc=35, scale=8, size=1000)
print(f"\nContinuous distribution — delivery time:")
print(f"  Mean:   {delivery_times.mean():.1f} min")
print(f"  Std:    {delivery_times.std():.1f} min")
print(f"  Min:    {delivery_times.min():.1f} min")
print(f"  Max:    {delivery_times.max():.1f} min")
print(f"  % under 30 min: {(delivery_times < 30).mean()*100:.1f}%")
print(f"  % under 45 min: {(delivery_times < 45).mean()*100:.1f}%")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — THE 5 DISTRIBUTIONS ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The distributions ML actually uses</span>
        <h2 style={S.h2}>Five distributions — every ML algorithm uses at least one</h2>

        <p style={S.p}>
          There are hundreds of probability distributions. ML uses five of them
          constantly. Once you know these five you can read any ML paper and
          understand every probability statement in it.
        </p>

        {/* Normal */}
        <h3 style={S.h3}>1. Normal (Gaussian) Distribution — the bell curve</h3>

        <p style={S.p}>
          The most important distribution in all of statistics.
          Symmetric, bell-shaped, defined by two numbers:
          mean μ (centre of the bell) and standard deviation σ (width of the bell).
          It appears everywhere in nature and in ML because of the
          Central Limit Theorem — the average of many independent random
          variables is approximately normally distributed, regardless of
          what distribution each individual variable follows.
        </p>

        <VisualBox label="Normal distribution — the 68-95-99.7 rule">
          <div style={{ position: 'relative' }}>
            <svg width="100%" height="160" viewBox="0 0 580 160">
              {/* Bell curve approximation */}
              <path
                d="M 20 145 C 60 145, 100 140, 140 120 C 180 95, 210 50, 240 20 C 255 8, 265 5, 290 5 C 315 5, 325 8, 340 20 C 370 50, 400 95, 440 120 C 480 140, 520 145, 560 145"
                fill="none" stroke="#378ADD" strokeWidth="2.5"
              />
              {/* Fill under curve */}
              <path
                d="M 20 145 C 60 145, 100 140, 140 120 C 180 95, 210 50, 240 20 C 255 8, 265 5, 290 5 C 315 5, 325 8, 340 20 C 370 50, 400 95, 440 120 C 480 140, 520 145, 560 145 Z"
                fill="rgba(55,138,221,0.08)"
              />
              {/* 1σ band */}
              <rect x="216" y="5" width="148" height="140" fill="rgba(55,138,221,0.1)" />
              {/* 2σ band */}
              <rect x="142" y="5" width="296" height="140" fill="rgba(55,138,221,0.06)" />
              {/* Mean line */}
              <line x1="290" y1="5" x2="290" y2="145" stroke="#378ADD" strokeWidth="1.5" strokeDasharray="5,3" />

              {/* Labels */}
              <text x="290" y="158" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#378ADD">μ</text>
              <text x="216" y="158" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#888">μ-σ</text>
              <text x="364" y="158" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#888">μ+σ</text>
              <text x="142" y="158" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#888">μ-2σ</text>
              <text x="438" y="158" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#888">μ+2σ</text>

              {/* Percentage labels */}
              <text x="290" y="75" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#378ADD" fontWeight="bold">68%</text>
              <text x="170" y="100" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#888">95%</text>
              <text x="410" y="100" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#888">←</text>
            </svg>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>
            68% of values fall within 1σ of the mean. 95% within 2σ. 99.7% within 3σ.
            For DoorDash delivery times (μ=35, σ=8): 68% arrive between 27–43 min, 95% between 19–51 min.
          </div>
        </VisualBox>

        <CodeBlock code={`from scipy import stats
import numpy as np

# Normal distribution: μ=35 min, σ=8 min
mu, sigma = 35, 8
dist = stats.norm(loc=mu, scale=sigma)

# Probability questions
print(f"P(delivery < 30 min) = {dist.cdf(30):.3f}")     # 0.266 — 26.6%
print(f"P(delivery < 45 min) = {dist.cdf(45):.3f}")     # 0.894 — 89.4%
print(f"P(30 < delivery < 45) = {dist.cdf(45) - dist.cdf(30):.3f}")  # 62.8%

# The 68-95-99.7 rule
print(f"\nP(μ-σ < X < μ+σ)   = {dist.cdf(mu+sigma) - dist.cdf(mu-sigma):.3f}")  # ~0.683
print(f"P(μ-2σ < X < μ+2σ)  = {dist.cdf(mu+2*sigma) - dist.cdf(mu-2*sigma):.3f}")  # ~0.954
print(f"P(μ-3σ < X < μ+3σ)  = {dist.cdf(mu+3*sigma) - dist.cdf(mu-3*sigma):.3f}")  # ~0.997

# Generate samples
samples = dist.rvs(size=1000)
print(f"\nSample mean: {samples.mean():.2f} (expected: {mu})")
print(f"Sample std:  {samples.std():.2f} (expected: {sigma})")

# WHY THIS MATTERS IN ML:
# When we use MSE loss, we are implicitly assuming the errors are
# normally distributed. MSE = maximum likelihood under a Gaussian model.
# This is not just convention — it's a mathematical consequence.
# If errors follow a different distribution, MSE is the wrong loss.`} />

        {/* Bernoulli */}
        <h3 style={S.h3}>2. Bernoulli Distribution — the coin flip</h3>

        <p style={S.p}>
          The simplest distribution. One trial, two outcomes: 0 or 1.
          One parameter: p, the probability of outcome 1.
          Every binary classification problem models its output as Bernoulli.
          Fraud or not fraud. Spam or not spam. Click or not click.
        </p>

        <CodeBlock code={`# Bernoulli distribution — one trial, binary outcome
# p = probability of "success" (1)

p_fraud = 0.02   # 2% of Stripe transactions are fraud

bernoulli = stats.bernoulli(p=p_fraud)

print(f"P(transaction is fraud)     = {bernoulli.pmf(1):.4f}")   # 0.0200
print(f"P(transaction is not fraud) = {bernoulli.pmf(0):.4f}")   # 0.9800
print(f"Mean (expected fraud rate)  = {bernoulli.mean():.4f}")   # 0.0200
print(f"Variance                    = {bernoulli.var():.4f}")    # p*(1-p)

# Simulate 10000 transactions
transactions = bernoulli.rvs(size=10000)
n_fraud = transactions.sum()
print(f"\nIn 10,000 transactions:")
print(f"  Fraudulent: {n_fraud} ({n_fraud/100:.1f}%)")
print(f"  Legitimate: {10000 - n_fraud}")

# WHY THIS MATTERS IN ML:
# Binary cross-entropy loss is the negative log-likelihood of a Bernoulli.
# When you use sigmoid output + binary cross-entropy, you are fitting
# a Bernoulli distribution to your binary labels. Not arbitrary — principled.`} />

        {/* Binomial */}
        <h3 style={S.h3}>3. Binomial Distribution — many coin flips</h3>

        <p style={S.p}>
          The Binomial distribution answers: if you repeat a Bernoulli trial
          n times independently, what is the probability of getting exactly k successes?
          It's the natural extension of Bernoulli to multiple trials.
        </p>

        <CodeBlock code={`# Binomial distribution — n trials, each with probability p
# "In 100 Stripe transactions, how many are likely to be fraud?"

n = 100       # 100 transactions
p = 0.02      # each has 2% fraud probability

binom = stats.binom(n=n, p=p)

print("Binomial: fraud in 100 transactions")
print(f"Expected fraud count: {binom.mean():.1f}")   # 2.0
print(f"Std deviation:        {binom.std():.2f}")    # ~1.4

print("\nProbability of exactly k frauds:")
for k in range(7):
    prob = binom.pmf(k)
    bar = '█' * int(prob * 200)
    print(f"  k={k}: {bar} {prob:.4f}")

print(f"\nP(at least 1 fraud in 100) = {1 - binom.pmf(0):.4f}")
print(f"P(more than 5 frauds)      = {1 - binom.cdf(5):.4f}")`} />

        {/* Poisson */}
        <h3 style={S.h3}>4. Poisson Distribution — rare events over time</h3>

        <p style={S.p}>
          The Poisson distribution models the number of times a rare event
          occurs in a fixed interval of time or space.
          It has one parameter: λ (lambda) — the average rate of occurrence.
          It naturally appears when modelling arrivals, counts, and rare events
          in production ML systems.
        </p>

        <CodeBlock code={`# Poisson distribution — rare events per unit time
# "How many orders arrive at a DoorDash dark store per minute during peak hour?"

lambda_rate = 4.5   # average 4.5 orders per minute

poisson = stats.poisson(mu=lambda_rate)

print(f"Poisson distribution (λ = {lambda_rate} orders/min)")
print(f"Expected orders per minute: {poisson.mean():.1f}")
print(f"Variance (equals mean!):    {poisson.var():.1f}")
# Key property of Poisson: variance = mean = λ

print("\nProbability of exactly k orders in one minute:")
for k in range(10):
    prob = poisson.pmf(k)
    bar = '█' * int(prob * 80)
    print(f"  k={k:2d}: {bar} {prob:.4f}")

# Real ML use case: anomaly detection
# If you expect λ=4.5 orders/min but observe 15 in one minute,
# P(X ≥ 15 | λ=4.5) tells you how anomalous this is
p_15_or_more = 1 - poisson.cdf(14)
print(f"\nP(≥ 15 orders in 1 min when λ=4.5) = {p_15_or_more:.6f}")
# Very small → this is anomalous → possible DDoS or flash sale`} />

        {/* Uniform */}
        <h3 style={S.h3}>5. Uniform Distribution — equal probability everywhere</h3>

        <p style={S.p}>
          Every value in a range is equally likely. In ML you encounter this
          constantly — random weight initialisation, random data splits,
          hyperparameter search. It's also the "maximum entropy" distribution
          when you know nothing about a variable except its range.
        </p>

        <CodeBlock code={`# Uniform distribution — equal probability in [a, b]
a, b = 0.0, 1.0
uniform = stats.uniform(loc=a, scale=b-a)

print(f"Uniform distribution [{a}, {b}]")
print(f"Mean:     {uniform.mean():.2f}")   # (a+b)/2 = 0.5
print(f"Variance: {uniform.var():.4f}")   # (b-a)^2/12

# Where uniform distribution appears in ML:
# 1. Weight initialisation (Glorot/Xavier uses uniform)
np.random.seed(42)
n_in, n_out = 4, 64
limit = np.sqrt(6 / (n_in + n_out))   # Glorot formula
W = np.random.uniform(-limit, limit, size=(n_in, n_out))
print(f"\nGlorot init range: [{-limit:.4f}, {limit:.4f}]")
print(f"W mean: {W.mean():.4f} (≈0)")
print(f"W std:  {W.std():.4f}")

# 2. Random search hyperparameter tuning
# Sample learning rate log-uniformly between 1e-4 and 1e-1
log_lr_samples = np.random.uniform(np.log(1e-4), np.log(1e-1), size=20)
lr_samples = np.exp(log_lr_samples)
print(f"\n20 random learning rates (log-uniform):")
print(np.sort(lr_samples).round(6))`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — EXPECTED VALUE VARIANCE COVARIANCE ════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Describing distributions with numbers</span>
        <h2 style={S.h2}>Expected value, variance and covariance — the three statistics that describe any distribution</h2>

        <p style={S.p}>
          A full probability distribution contains complete information
          about a random variable. But often we want to summarise it
          with just a few numbers. Three numbers capture most of what matters
          in ML: the expected value (where is the centre?),
          the variance (how spread out is it?), and the covariance
          (how do two variables move together?).
        </p>

        <h3 style={S.h3}>Expected value — the weighted average</h3>

        <p style={S.p}>
          The expected value E[X] is the average outcome if you repeated
          the random process infinitely many times. For a discrete variable,
          it's the sum of each value multiplied by its probability.
          For a continuous variable, it's an integral — but the idea is the same.
        </p>

        <HBox color="#378ADD">
          <p style={{ ...S.p, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              In plain English:{' '}
            </span>
            the expected value is the long-run average. If DoorDash processes
            one million orders and the expected delivery time is 35 minutes,
            the total delivery time divided by one million will approach 35 minutes.
            It doesn't mean every order takes 35 minutes — it's the centre of gravity
            of the distribution.
          </p>
        </HBox>

        <CodeBlock code={`import numpy as np
from scipy import stats

# Expected value — three ways to compute it

# Way 1: Mathematical definition for discrete distribution
# E[X] = sum(x_i * P(X = x_i))
star_ratings = np.array([1, 2, 3, 4, 5])
probabilities = np.array([0.05, 0.08, 0.15, 0.42, 0.30])  # DoorDash rating distribution
expected_rating = np.sum(star_ratings * probabilities)
print(f"Expected star rating: {expected_rating:.3f}")  # 3.84

# Way 2: Sample mean (approximation with data)
samples = np.random.choice(star_ratings, size=10000, p=probabilities)
print(f"Sample mean (10k orders): {samples.mean():.3f}")  # ≈ 3.84

# Way 3: scipy
dist = stats.rv_discrete(values=(star_ratings, probabilities))
print(f"scipy E[X]: {dist.mean():.3f}")  # 3.84

# Linearity of expectation — critical property
# E[aX + b] = a*E[X] + b
# E[X + Y] = E[X] + E[Y]   (even if X and Y are correlated!)

delivery_time = stats.norm(loc=35, scale=8)
# E[delivery_time_in_seconds] = E[60 * delivery_time] = 60 * E[delivery_time]
print(f"\nE[delivery_time_minutes]: {delivery_time.mean():.1f}")
print(f"E[delivery_time_seconds]: {60 * delivery_time.mean():.1f}")  # 2100`} />

        <h3 style={S.h3}>Variance and standard deviation — how spread out is it?</h3>

        <p style={S.p}>
          Variance measures how far values typically stray from the expected value.
          It's the expected squared deviation from the mean:
          Var(X) = E[(X − μ)²].
          Standard deviation is the square root of variance — same units as the variable,
          easier to interpret. A delivery time with σ = 8 minutes means
          most deliveries arrive within about 8 minutes of the average.
        </p>

        <CodeBlock code={`# Variance and standard deviation

# Manual computation
delivery_times = np.array([28, 31, 35, 42, 38, 29, 45, 33, 36, 41])
mu = delivery_times.mean()

# Variance = average of squared deviations from mean
variance = np.mean((delivery_times - mu) ** 2)
std_dev  = np.sqrt(variance)

print(f"Mean:     {mu:.2f} min")
print(f"Variance: {variance:.2f} min²  (hard to interpret — wrong units)")
print(f"Std dev:  {std_dev:.2f} min    (same units — interpretable)")

# numpy computes this with ddof=0 (population) or ddof=1 (sample)
print(f"np.var:   {np.var(delivery_times):.2f}")       # population variance
print(f"np.std:   {np.std(delivery_times):.2f}")       # population std

# Use ddof=1 (sample variance) when you have a sample, not the full population
# This gives an unbiased estimate of the true variance
print(f"Sample variance (ddof=1): {np.var(delivery_times, ddof=1):.2f}")

# Practical interpretation:
# DoorDash A (std=5 min): reliable, predictable — customers like this
# DoorDash B (std=15 min): erratic — even if same mean, worse experience
mu_A, sigma_A = 35, 5
mu_B, sigma_B = 35, 15
p_on_time_A = stats.norm(mu_A, sigma_A).cdf(45)
p_on_time_B = stats.norm(mu_B, sigma_B).cdf(45)
print(f"\nP(delivery < 45 min): DoorDash A = {p_on_time_A:.3f}, DoorDash B = {p_on_time_B:.3f}")
# Same mean, lower variance → better customer experience`} />

        <h3 style={S.h3}>Covariance and correlation — how two variables move together</h3>

        <p style={S.p}>
          Covariance measures whether two variables tend to increase together
          (positive covariance) or move in opposite directions (negative covariance).
          Correlation normalises covariance to the range [-1, 1], making it
          comparable across different scales. In ML, correlation is used to
          detect redundant features (multicollinearity) and to understand
          which features move with the target.
        </p>

        <CodeBlock code={`# Covariance and correlation

np.random.seed(42)
n = 1000

# Simulate DoorDash features
distance     = np.random.uniform(0.5, 8.0, n)
traffic      = np.random.uniform(1, 10, n)
# Delivery time correlates with distance and traffic
delivery     = 8.6 + 7.3*distance + 1.5*traffic + np.random.randn(n)*3

# Covariance matrix
data = np.column_stack([distance, traffic, delivery])
cov_matrix = np.cov(data.T)

print("Covariance matrix:")
print(f"  Cov(distance, distance) = {cov_matrix[0,0]:.2f}")  # variance of distance
print(f"  Cov(distance, delivery) = {cov_matrix[0,2]:.2f}")  # high positive → related
print(f"  Cov(traffic,  delivery) = {cov_matrix[1,2]:.2f}")  # positive → related
print(f"  Cov(distance, traffic)  = {cov_matrix[0,1]:.2f}")  # near 0 → independent

# Correlation matrix — normalised to [-1, 1]
corr_matrix = np.corrcoef(data.T)
print("\nCorrelation matrix:")
labels = ['distance', 'traffic', 'delivery']
print(f"{'':12}", end='')
for l in labels: print(f"{l:12}", end='')
print()
for i, l in enumerate(labels):
    print(f"{l:12}", end='')
    for j in range(3):
        print(f"{corr_matrix[i,j]:12.3f}", end='')
    print()

# Key insight:
# distance-delivery correlation ≈ 0.94 → very strong → important feature
# traffic-delivery correlation  ≈ 0.25 → moderate → useful feature
# distance-traffic correlation  ≈ 0.01 → near zero → not collinear → safe to include both`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — BAYES THEOREM ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The most important equation in statistics</span>
        <h2 style={S.h2}>Bayes theorem — updating beliefs with evidence</h2>

        <p style={S.p}>
          Bayes theorem tells you how to update your belief about something
          when you receive new evidence. Before you see any data,
          you have a prior belief. After seeing the data, you update
          to a posterior belief. The update is governed by how likely
          the data was under your prior belief.
        </p>

        <p style={S.p}>
          This might sound abstract. Here's the concrete version that appears
          in ML every day:
        </p>

        <HBox color="#D85A30">
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 16,
            color: '#D85A30', padding: '10px 14px',
            background: 'rgba(216,90,48,0.08)',
            borderRadius: 6, textAlign: 'center' as const,
            marginBottom: 12,
          }}>
            P(A | B) = P(B | A) × P(A) / P(B)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              { term: 'P(A | B)', name: 'Posterior', desc: 'Probability of A given that B happened. What we want to know.' },
              { term: 'P(B | A)', name: 'Likelihood', desc: 'Probability of observing B if A were true. How well does A explain the data?' },
              { term: 'P(A)',     name: 'Prior',      desc: 'Probability of A before seeing any data. What we believed before.' },
              { term: 'P(B)',     name: 'Evidence',   desc: 'Total probability of observing B. Acts as a normalising constant.' },
            ].map((item) => (
              <div key={item.term} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{
                  fontSize: 12, fontFamily: 'var(--font-mono)', color: '#D85A30',
                  fontWeight: 700, minWidth: 70, paddingTop: 1,
                }}>
                  {item.term}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', minWidth: 80, paddingTop: 1 }}>
                  {item.name}:
                </span>
                <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.55 }}>
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </HBox>

        <h3 style={S.h3}>A concrete example: Stripe fraud detection</h3>

        <p style={S.p}>
          Stripe's fraud model flags a transaction as suspicious.
          The flagging system has a false positive rate.
          What is the actual probability this specific transaction is fraud,
          given that it was flagged?
        </p>

        <CodeBlock code={`# Bayes theorem: fraud detection at Stripe

# Known statistics (from historical data)
p_fraud         = 0.001   # 0.1% of transactions are actually fraud (prior)
p_flag_given_fraud   = 0.95   # if fraud, 95% chance the system flags it (sensitivity)
p_flag_given_legit   = 0.02   # if legit, 2% chance it's flagged anyway (false positive rate)
p_legit         = 1 - p_fraud  # 99.9% of transactions are legit

# P(flagged) — total probability of being flagged
p_flagged = (p_flag_given_fraud * p_fraud) + (p_flag_given_legit * p_legit)

# Bayes: P(fraud | flagged)
p_fraud_given_flag = (p_flag_given_fraud * p_fraud) / p_flagged

print(f"Prior probability of fraud:     {p_fraud:.4f} ({p_fraud*100:.1f}%)")
print(f"P(flagged | fraud):             {p_flag_given_fraud:.4f} ({p_flag_given_fraud*100:.1f}%)")
print(f"P(flagged | legit):             {p_flag_given_legit:.4f} ({p_flag_given_legit*100:.1f}%)")
print(f"\nP(flagged):                     {p_flagged:.4f}")
print(f"\nP(fraud | flagged):             {p_fraud_given_flag:.4f} ({p_fraud_given_flag*100:.1f}%)")

# Output:
# P(fraud | flagged) ≈ 0.045 → only 4.5% of flagged transactions are actually fraud!
# This seems counterintuitive — the model is 95% sensitive but only 4.5% precise.
# Why? Because fraud is so rare (0.1%) that even a 2% false positive rate
# produces many more false alarms than true positives.
# This is the "base rate fallacy" and it matters in every imbalanced classification problem.

print("\n--- What this means for the ML model ---")
print(f"Out of 10,000 flagged transactions:")
n_flagged = 10000
true_fraud   = int(n_flagged * p_fraud_given_flag)
false_alarms = n_flagged - true_fraud
print(f"  Actual fraud:     {true_fraud} ({true_fraud/n_flagged*100:.1f}%)")
print(f"  False alarms:     {false_alarms} ({false_alarms/n_flagged*100:.1f}%)")
print(f"\nConclusion: without Bayes, you'd block 9,550 legitimate transactions to catch 450 fraud")`} />

        <Callout type="warning">
          The fraud detection example above demonstrates why precision and recall
          matter more than accuracy for imbalanced problems. A model that flags
          everything as legitimate would have 99.9% accuracy but catch zero fraud.
          Bayes theorem shows you why — the prior probability dominates when
          a class is very rare. This is covered in depth in the Evaluation section.
        </Callout>

        <h3 style={S.h3}>Naïve Bayes classifier — Bayes theorem as a full ML algorithm</h3>

        <p style={S.p}>
          The Naïve Bayes classifier directly applies Bayes theorem
          to classify text. "Naïve" refers to the assumption that
          features are independent given the class — which is rarely
          true but works surprisingly well in practice for text classification.
        </p>

        <CodeBlock code={`# Naïve Bayes: spam classification from scratch

# Training data: word frequencies in spam vs legit emails
# (simplified to 4 words for illustration)
# Each value: P(word appears | class)

spam_probs  = {'money': 0.80, 'free': 0.70, 'winner': 0.75, 'meeting': 0.05}
legit_probs = {'money': 0.10, 'free': 0.15, 'winner': 0.02, 'meeting': 0.60}
p_spam  = 0.30   # 30% of all emails are spam (prior)
p_legit = 0.70   # 70% are legitimate

def naive_bayes_classify(email_words, verbose=True):
    # P(spam  | words) ∝ P(words | spam)  × P(spam)
    # P(legit | words) ∝ P(words | legit) × P(legit)
    # Naïve assumption: words are independent → multiply probabilities

    log_p_spam  = np.log(p_spam)
    log_p_legit = np.log(p_legit)

    for word in email_words:
        if word in spam_probs:
            log_p_spam  += np.log(spam_probs[word])
            log_p_legit += np.log(legit_probs[word])

    # Convert back from log-space
    p_spam_given_words  = np.exp(log_p_spam)
    p_legit_given_words = np.exp(log_p_legit)

    # Normalise to get actual probabilities
    total = p_spam_given_words + p_legit_given_words
    prob_spam = p_spam_given_words / total

    if verbose:
        print(f"Words: {email_words}")
        print(f"P(spam  | email) = {prob_spam:.4f} ({prob_spam*100:.1f}%)")
        print(f"P(legit | email) = {1-prob_spam:.4f} ({(1-prob_spam)*100:.1f}%)")
        print(f"Decision: {'SPAM' if prob_spam > 0.5 else 'LEGIT'}\n")

    return prob_spam

# Test emails
naive_bayes_classify(['money', 'free', 'winner'])
naive_bayes_classify(['meeting', 'free'])
naive_bayes_classify(['meeting', 'money'])`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — MLE ════════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>How models find their parameters</span>
        <h2 style={S.h2}>Maximum Likelihood Estimation — the principle behind all model training</h2>

        <p style={S.p}>
          When you train an ML model, you're adjusting its parameters
          to make the training data as probable as possible under the model.
          This principle is called Maximum Likelihood Estimation (MLE).
          It's not just one algorithm — it's the underlying justification
          for every loss function in ML.
        </p>

        <p style={S.p}>
          Here's the precise statement: given data D and a model with
          parameters θ, find the θ that maximises P(D | θ) —
          the probability of observing this exact data assuming the model is correct.
        </p>

        <HBox color="#1D9E75">
          <p style={{ ...S.p, marginBottom: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              The connection to loss functions:{' '}
            </span>
            minimising MSE loss is equivalent to MLE under a Gaussian noise assumption.
            Minimising binary cross-entropy loss is equivalent to MLE under a Bernoulli assumption.
            These are not arbitrary choices — they are the mathematically correct
            loss functions for their respective probabilistic assumptions.
          </p>
        </HBox>

        <CodeBlock code={`# MLE for a simple Gaussian: find μ and σ that best explain the data

np.random.seed(42)
# True parameters (unknown to the model)
true_mu, true_sigma = 35.0, 8.0

# Observed delivery times (our data)
data = np.random.normal(true_mu, true_sigma, size=200)

# The likelihood of the data given parameters (μ, σ)
# For Gaussian: L(μ, σ | data) = ∏ᵢ N(xᵢ; μ, σ)
# Log-likelihood (sum instead of product — numerically stable)
def log_likelihood_gaussian(data, mu, sigma):
    n = len(data)
    return -n * np.log(sigma) - n/2 * np.log(2*np.pi) - np.sum((data - mu)**2) / (2 * sigma**2)

# MLE solution for Gaussian has a closed form:
# μ_MLE = sample mean
# σ_MLE = sample std (biased — divides by n not n-1)
mu_mle    = data.mean()
sigma_mle = data.std()   # MLE uses ddof=0

print(f"True parameters:  μ = {true_mu:.1f}, σ = {true_sigma:.1f}")
print(f"MLE estimates:    μ = {mu_mle:.2f}, σ = {sigma_mle:.2f}")

ll_true = log_likelihood_gaussian(data, true_mu, true_sigma)
ll_mle  = log_likelihood_gaussian(data, mu_mle, sigma_mle)
print(f"\nLog-likelihood at true params: {ll_true:.2f}")
print(f"Log-likelihood at MLE params:  {ll_mle:.2f}")
print(f"MLE ≥ true params: {ll_mle >= ll_true}")   # True — MLE maximises this

# ── Why MSE = MLE under Gaussian assumption ─────────────────────────────
# For linear regression y = w*x + b, if we assume errors are Gaussian:
# y_i ~ N(w*x_i + b, σ²)
# Maximising log-likelihood gives:
# argmax_w Σ [ -(y_i - (w*x_i + b))² / 2σ² ] (ignoring constants)
# = argmin_w Σ (y_i - (w*x_i + b))²   ← this IS MSE loss!
print("\nMSE loss = negative log-likelihood of Gaussian model")`} />

        <h3 style={S.h3}>Why cross-entropy = MLE for classification</h3>

        <CodeBlock code={`# Binary cross-entropy = MLE under Bernoulli assumption
# For classification: y_i ~ Bernoulli(σ(w·x_i))
# where σ is the sigmoid function

def sigmoid(x): return 1 / (1 + np.exp(-x))

def binary_cross_entropy(y_true, y_pred_prob):
    """Binary cross-entropy loss."""
    eps = 1e-8   # prevent log(0)
    return -np.mean(
        y_true * np.log(y_pred_prob + eps) +
        (1 - y_true) * np.log(1 - y_pred_prob + eps)
    )

def bernoulli_log_likelihood(y_true, y_pred_prob):
    """Log-likelihood of Bernoulli model."""
    eps = 1e-8
    return np.mean(
        y_true * np.log(y_pred_prob + eps) +
        (1 - y_true) * np.log(1 - y_pred_prob + eps)
    )

# They are negatives of each other
np.random.seed(42)
y_true = np.array([1, 0, 1, 1, 0, 1, 0, 0])       # actual fraud labels
y_pred = np.array([0.9, 0.1, 0.8, 0.7, 0.3, 0.6, 0.2, 0.4])  # predicted probabilities

bce = binary_cross_entropy(y_true, y_pred)
bll = bernoulli_log_likelihood(y_true, y_pred)

print(f"Binary cross-entropy loss:       {bce:.4f}")
print(f"Bernoulli log-likelihood:        {bll:.4f}")
print(f"BCE = -log-likelihood:           {bce:.4f} = {-bll:.4f}  ✓")
print("\nMinimising BCE = maximising Bernoulli log-likelihood")
print("= finding parameters that make the binary labels most probable under the model")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — INFORMATION THEORY ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Information theory</span>
        <h2 style={S.h2}>Entropy, cross-entropy and KL divergence — the three information measures</h2>

        <p style={S.p}>
          Information theory asks: how much information is in a message?
          How surprised should you be when you observe an event?
          These questions have precise mathematical answers, and those answers
          appear in the loss functions of almost every neural network.
        </p>

        <h3 style={S.h3}>Entropy — how uncertain is a distribution?</h3>

        <p style={S.p}>
          Entropy measures the average surprise (or uncertainty) in a distribution.
          A distribution where one outcome is almost certain has low entropy.
          A distribution where all outcomes are equally likely has maximum entropy.
          High entropy = high uncertainty = more information needed to describe outcomes.
        </p>

        <VisualBox label="Entropy examples — from certain to maximally uncertain">
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              {
                label: 'Nearly certain',
                probs: [0.98, 0.01, 0.01],
                entropy: '0.10 bits',
                color: '#1D9E75',
                desc: 'Almost no surprise',
              },
              {
                label: 'Somewhat uncertain',
                probs: [0.60, 0.30, 0.10],
                entropy: '1.30 bits',
                color: '#BA7517',
                desc: 'Moderate uncertainty',
              },
              {
                label: 'Maximum entropy',
                probs: [0.33, 0.33, 0.34],
                entropy: '1.58 bits',
                color: '#D85A30',
                desc: 'Equally likely — max surprise',
              },
            ].map((item) => (
              <div key={item.label} style={{
                flex: 1, minWidth: 150,
                background: 'var(--surface)', border: `1px solid ${item.color}30`,
                borderRadius: 8, padding: '12px 14px',
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 8 }}>
                  {item.label}
                </div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                  {item.probs.map((p, i) => (
                    <div key={i} style={{ flex: p, height: 40, background: `${item.color}80`, borderRadius: 3 }} />
                  ))}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                  H = {item.entropy}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </VisualBox>

        <CodeBlock code={`# Entropy — measuring uncertainty

def entropy(probs):
    """Shannon entropy in bits."""
    probs = np.array(probs)
    probs = probs[probs > 0]   # avoid log(0)
    return -np.sum(probs * np.log2(probs))

# Three distributions
certain     = [0.98, 0.01, 0.01]   # model is very confident
uncertain   = [0.60, 0.30, 0.10]   # somewhat confident
max_ent     = [1/3,  1/3,  1/3]    # no idea

print(f"Entropy (certain):    {entropy(certain):.4f} bits")     # 0.10
print(f"Entropy (uncertain):  {entropy(uncertain):.4f} bits")   # 1.30
print(f"Entropy (maximum):    {entropy(max_ent):.4f} bits")     # 1.585

# Maximum possible entropy for n classes = log2(n)
n_classes = 3
print(f"Max entropy for {n_classes} classes: {np.log2(n_classes):.4f} bits")

# Entropy in ML context: a well-trained confident model should have
# LOW entropy on its predictions (it knows what it's looking at).
# HIGH entropy predictions signal uncertainty — useful for active learning
# and out-of-distribution detection.

# Entropy of a Bernoulli distribution (binary classification)
print("\nBernoulli entropy as a function of p:")
for p in [0.01, 0.1, 0.3, 0.5, 0.7, 0.9, 0.99]:
    h = entropy([p, 1-p])
    bar = '█' * int(h * 20)
    print(f"  p={p:.2f}: {bar} H={h:.3f}")`} />

        <h3 style={S.h3}>Cross-entropy — comparing predicted vs true distributions</h3>

        <p style={S.p}>
          Cross-entropy measures how well a predicted probability distribution
          approximates the true distribution. When the prediction perfectly
          matches the true distribution, cross-entropy equals entropy.
          When it doesn't match, cross-entropy is higher.
          Minimising cross-entropy = making predictions as close as possible
          to the true distribution. This is exactly what the cross-entropy
          loss does during training.
        </p>

        <CodeBlock code={`# Cross-entropy — the ML loss function

def cross_entropy(y_true_probs, y_pred_probs):
    """H(p, q) = -sum(p * log(q))"""
    y_pred_probs = np.array(y_pred_probs)
    y_pred_probs = np.clip(y_pred_probs, 1e-8, 1)
    return -np.sum(np.array(y_true_probs) * np.log2(y_pred_probs))

# True distribution: cat=70%, dog=20%, bird=10%
true_dist = [0.70, 0.20, 0.10]

# Model A: good predictions
pred_A = [0.65, 0.25, 0.10]

# Model B: bad predictions (reversed)
pred_B = [0.10, 0.20, 0.70]

# Model C: perfect predictions
pred_C = [0.70, 0.20, 0.10]

print(f"True entropy H(p):        {entropy(true_dist):.4f} bits")
print(f"Cross-entropy H(p, A):    {cross_entropy(true_dist, pred_A):.4f} bits  ← good model")
print(f"Cross-entropy H(p, B):    {cross_entropy(true_dist, pred_B):.4f} bits  ← bad model")
print(f"Cross-entropy H(p, C):    {cross_entropy(true_dist, pred_C):.4f} bits  ← perfect = H(p)")

# Cross-entropy is always ≥ entropy. The gap is the KL divergence.
# When predictions match truth exactly: H(p,q) = H(p) — minimum possible.
# This is why cross-entropy loss decreases as the model improves.

# Multi-class classification example
batch_true = np.array([
    [1, 0, 0],   # cat
    [0, 1, 0],   # dog
    [0, 0, 1],   # bird
])
batch_pred = np.array([
    [0.8, 0.15, 0.05],    # confident cat → low loss
    [0.3, 0.5,  0.2 ],    # somewhat confident dog → medium loss
    [0.33, 0.33, 0.34],   # confused → high loss
])

def softmax(x):
    e = np.exp(x - x.max(axis=-1, keepdims=True))
    return e / e.sum(axis=-1, keepdims=True)

def categorical_cross_entropy(y_true, y_pred):
    y_pred = np.clip(y_pred, 1e-8, 1)
    return -np.sum(y_true * np.log(y_pred), axis=1)

losses = categorical_cross_entropy(batch_true, batch_pred)
print("\nPer-sample cross-entropy losses:")
labels = ['cat (confident)', 'dog (moderate)', 'bird (confused)']
for label, loss in zip(labels, losses):
    print(f"  {label:<25}: {loss:.4f}")`} />

        <h3 style={S.h3}>KL divergence — how different are two distributions?</h3>

        <p style={S.p}>
          KL divergence (Kullback-Leibler divergence) measures how much
          one probability distribution differs from another.
          It's always ≥ 0, and equals 0 only when the distributions are identical.
          It appears in Variational Autoencoders (VAEs), knowledge distillation,
          and the relationship between cross-entropy and entropy.
        </p>

        <CodeBlock code={`# KL divergence — measuring distribution difference

def kl_divergence(p, q):
    """D_KL(p || q) = sum(p * log(p/q))"""
    p = np.array(p)
    q = np.array(q)
    q = np.clip(q, 1e-8, 1)
    mask = p > 0
    return np.sum(p[mask] * np.log(p[mask] / q[mask]))

true_dist = [0.70, 0.20, 0.10]
pred_A    = [0.65, 0.25, 0.10]   # good
pred_B    = [0.10, 0.20, 0.70]   # bad
pred_C    = [0.70, 0.20, 0.10]   # perfect

print(f"KL(true || pred_A) = {kl_divergence(true_dist, pred_A):.6f}  ← small (good)")
print(f"KL(true || pred_B) = {kl_divergence(true_dist, pred_B):.6f}  ← large (bad)")
print(f"KL(true || pred_C) = {kl_divergence(true_dist, pred_C):.6f}  ← zero (perfect)")

# Key relationship:
# Cross-entropy H(p, q) = Entropy H(p) + KL(p || q)
# Minimising cross-entropy = minimising KL divergence (since H(p) is fixed)
# This is why cross-entropy is the right loss for matching distributions.

print("\nVerification: H(p,q) = H(p) + KL(p||q)")
for name, pred in [("pred_A", pred_A), ("pred_B", pred_B)]:
    h_p      = entropy(true_dist)
    h_pq     = cross_entropy(true_dist, pred)
    kl       = kl_divergence(true_dist, pred)
    print(f"  {name}: H(p,q)={h_pq:.4f} ≈ H(p)+KL = {h_p:.4f}+{kl:.4f} = {h_p+kl:.4f}  ✓")

# KL divergence in VAEs:
# The loss has two terms:
# 1. Reconstruction loss — cross-entropy or MSE: how well does decoder reconstruct?
# 2. KL term: how close is the learned latent distribution to a standard Gaussian?
# VAE loss = reconstruction_loss + β * KL(q(z|x) || N(0, I))`} />

        <MathBox label="The connection — everything is related">
          <p style={{ ...S.ps, marginBottom: 12 }}>
            All three information measures are connected by one equation:
          </p>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 2.2,
            color: 'var(--text)', padding: '10px 14px',
            background: 'var(--surface)', borderRadius: 6, marginBottom: 12,
          }}>
            <div><span style={{ color: '#D85A30' }}>H(p, q)</span> = <span style={{ color: '#378ADD' }}>H(p)</span> + <span style={{ color: '#1D9E75' }}>D_KL(p ∥ q)</span></div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
              Cross-entropy = Entropy + KL divergence
            </div>
          </div>
          <p style={{ ...S.ps, marginBottom: 8 }}>
            Since H(p) is fixed (the true distribution doesn't change during training),
            minimising cross-entropy is identical to minimising KL divergence —
            which means making predictions as similar as possible to the truth.
          </p>
          <p style={{ ...S.ps, marginBottom: 0 }}>
            This is the deep connection: every neural network trained with
            cross-entropy loss is minimising the KL divergence between its
            predicted distribution and the true distribution of the labels.
            Not by accident — by mathematical equivalence.
          </p>
        </MathBox>
      </div>

      <Div />

      {/* ══ SECTION 8 — PUTTING IT ALL TOGETHER ═══════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Putting it all together</span>
        <h2 style={S.h2}>Why every loss function is a probability model in disguise</h2>

        <p style={S.p}>
          Now you have all the pieces. Here is the unified picture:
          every standard loss function in ML corresponds to maximising
          the likelihood of the data under a specific distributional assumption.
          The choice of loss function IS a choice about what distribution
          you think your data follows.
        </p>

        <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
            background: 'var(--surface)', borderBottom: '1px solid var(--border)',
            padding: '9px 14px',
          }}>
            {['Loss function', 'Probabilistic assumption', 'MLE of what?', 'Use when'].map((h) => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                {h}
              </span>
            ))}
          </div>
          {[
            ['MSE', 'Errors ~ Gaussian', 'μ of a Gaussian', 'Regression, output is continuous, errors symmetric'],
            ['MAE', 'Errors ~ Laplace', 'Median of Laplace', 'Regression with outliers — Laplace has heavier tails'],
            ['Binary cross-entropy', 'Output ~ Bernoulli', 'p of a Bernoulli', 'Binary classification (fraud, spam, click)'],
            ['Categorical cross-entropy', 'Output ~ Categorical', 'Probs of Categorical', 'Multi-class classification (cat/dog/bird)'],
            ['KL divergence', 'Any two distributions', 'Parameters of q to match p', 'VAEs, knowledge distillation, RL'],
          ].map((row, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
              padding: '10px 14px',
              borderBottom: i < 4 ? '1px solid var(--border)' : 'none',
              background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
              alignItems: 'start',
            }}>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#378ADD', fontWeight: 600 }}>{row[0]}</span>
              <span style={{ fontSize: 12, color: '#D85A30', fontFamily: 'var(--font-mono)' }}>{row[1]}</span>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>{row[2]}</span>
              <span style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{row[3]}</span>
            </div>
          ))}
        </div>

        <Callout type="info">
          When you pick a loss function in an ML project, you are making
          a probabilistic assumption about your data. If your target has
          many outliers, MSE (Gaussian assumption) will be dragged toward
          those outliers. MAE (Laplace assumption) is more robust.
          Knowing the connection between loss functions and distributions
          helps you make principled choices rather than just copying what
          a tutorial used.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 9 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>The math foundations are complete.</h2>

        <p style={S.p}>
          You now have the four mathematical pillars of ML:
          vectors and matrices (the data structures),
          matrix multiplication (the core operation),
          derivatives and gradients (how models learn),
          and probability (how models reason under uncertainty).
          Every algorithm in this track uses some combination of these four.
        </p>

        <p style={S.p}>
          The next section moves to the programming ecosystem —
          specifically NumPy, Pandas, and matplotlib.
          After spending six modules on the theory,
          you'll spend the next four modules turning all of it into
          working Python code that operates on real data.
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
              textTransform: 'uppercase' as const, color: '#7F77DD',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Module 07
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Information Theory — Entropy, Cross-Entropy and KL Divergence
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              A deeper dive into the information-theoretic foundations
              of ML loss functions and model evaluation.
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
          'A probability distribution describes all possible values a random variable can take and how likely each is. Discrete distributions have countable outcomes (Bernoulli, Binomial, Poisson). Continuous have infinite possibilities (Normal, Uniform).',
          'The five distributions ML uses most: Normal (regression errors, weight initialisation), Bernoulli (binary classification), Binomial (count of successes), Poisson (rare event counts), Uniform (initialisation, random search).',
          'Expected value = long-run average. Variance = average squared deviation from mean. Covariance = how two variables move together. Correlation = covariance normalised to [-1, 1].',
          'Bayes theorem: P(A|B) = P(B|A) × P(A) / P(B). Prior belief × likelihood of data → posterior belief. This is how classifiers work and why rare classes (0.1% fraud) produce many false positives even with accurate detectors.',
          'Maximum Likelihood Estimation: find parameters that make the training data most probable under the model. Minimising MSE = MLE under Gaussian noise. Minimising binary cross-entropy = MLE under Bernoulli assumption.',
          'Entropy measures uncertainty in a distribution. Cross-entropy measures how well predictions match truth — minimising it = making predictions as close as possible to the true distribution. H(p,q) = H(p) + KL(p‖q).',
          'Every loss function is a distributional assumption. MSE assumes Gaussian errors. MAE assumes Laplace. Binary cross-entropy assumes Bernoulli outputs. Choosing a loss function is choosing what you believe about your data.',
        ]}
      />
    </LearnLayout>
  )
}