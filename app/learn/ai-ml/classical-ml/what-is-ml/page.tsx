import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'What is Machine Learning? — Chaduvuko',
}

// ─── Shared style tokens ──────────────────────────────────────────────────────

const sec: React.CSSProperties = {
  paddingBottom: 56,
  marginBottom: 56,
  borderBottom: '1px solid var(--border)',
}

const tag: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--accent)',
  fontFamily: 'var(--font-mono)',
  display: 'block',
  marginBottom: 10,
}

const h2: React.CSSProperties = {
  fontFamily: 'var(--font-display)',
  fontSize: 'clamp(20px, 3vw, 30px)',
  fontWeight: 900,
  letterSpacing: '-1.2px',
  color: 'var(--text)',
  marginBottom: 16,
  lineHeight: 1.15,
}

const p: React.CSSProperties = {
  fontSize: 15,
  color: 'var(--muted)',
  lineHeight: 1.8,
  marginBottom: 16,
}

function Highlight({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      padding: '14px 18px',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderLeft: `3px solid ${color ?? 'var(--accent)'}`,
      borderRadius: 8,
      margin: '20px 0',
    }}>
      <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{children}</div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WhatIsMLPage() {
  return (
    <LearnLayout
      title="What is Machine Learning?"
      description="Not the Wikipedia definition. The actual idea — what it means, how it works, and why it changed everything."
      section="Classical ML"
      readTime="18–22 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="classical-ml" topic="what-is-ml" />

      {/* ── SECTION 1: The problem ─────────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>The problem that started everything</span>
        <h2 style={h2}>It&apos;s 2015. You&apos;re a new engineer at Swiggy.</h2>

        <p style={p}>
          Orders are coming in faster than anyone expected. Customers open the app, see a restaurant they want,
          and before they place the order they ask the same question: how long will this take?
        </p>
        <p style={p}>
          Your job is to show a delivery time estimate. You sit down and start writing rules.
        </p>

        <pre style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 8, padding: '16px 20px', fontSize: 13,
          fontFamily: 'var(--font-mono)', color: 'var(--muted)',
          overflowX: 'auto', margin: '20px 0', lineHeight: 1.7,
        }}>{`if distance < 2km:
    estimated_time = 20
elif distance < 5km:
    estimated_time = 30
else:
    estimated_time = 45

if current_hour in rush_hours:
    estimated_time += 10

if is_raining:
    estimated_time += 8

if restaurant == "popular_restaurant":
    estimated_time += 5

# Ship it.`}</pre>

        <p style={p}>
          You ship it. The results are terrible. A 1.5 km delivery from a slow kitchen during peak hours takes
          55 minutes. The same route on a Tuesday afternoon takes 14. Your rules are off by 20 minutes on a
          third of all orders. Users are complaining. The product team is not happy.
        </p>
        <p style={p}>
          The problem is not that you wrote bad rules. The problem is that the real relationship between inputs
          and delivery time involves dozens of interacting variables — kitchen load, rider availability, traffic
          by street segment, weather severity, order complexity, time since last order from that restaurant —
          and the combinations are too complex for any human to enumerate.
        </p>

        <Highlight>
          Machine Learning is the answer to this problem. Instead of writing rules, you take the last 500,000
          completed orders — each one a record of what the inputs were and what the actual delivery time turned
          out to be — and you feed them to a learning algorithm. The algorithm finds the patterns. It discovers
          that kitchen prep time is 40% of variance. That 6–8 PM Friday adds 12 minutes on average. That
          rain below 5mm matters less than rain above 20mm. You never wrote those rules.{' '}
          <strong style={{ color: 'var(--text)' }}>The data wrote them for you.</strong>
        </Highlight>

        <Callout type="tip">
          This Swiggy delivery time problem is the running example for the entire Classical ML section. Every
          algorithm — Linear Regression, Decision Trees, XGBoost — will be explained using this same scenario.
          By the end of the section you will have built a complete delivery time predictor from scratch.
        </Callout>
      </div>

      {/* ── SECTION 2: The actual definition ──────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>The actual definition</span>
        <h2 style={h2}>What Machine Learning actually means</h2>

        <p style={p}>
          In 1959, Arthur Samuel defined machine learning as: <em style={{ color: 'var(--text)' }}>&quot;the
          field of study that gives computers the ability to learn without being explicitly programmed.&quot;</em>
        </p>
        <p style={p}>
          That definition is technically accurate and practically useless. &quot;Without being explicitly
          programmed&quot; tells you almost nothing about how it works or what you actually do as a practitioner.
        </p>

        <Highlight color="#378ADD">
          <strong style={{ color: 'var(--text)' }}>The real meaning: </strong>
          in traditional programming, you write the logic and the computer follows it. You are the one who
          figures out the rules. In Machine Learning, you provide the examples — inputs paired with correct
          outputs — and the computer writes the logic. The algorithm figures out the rules. Your job shifts
          from writing rules to curating data.
        </Highlight>

        <p style={p}>
          But what does &quot;learning&quot; actually mean mechanically? It means this loop, run millions of times:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, margin: '24px 0' }}>
          {[
            { num: '01', color: '#7F77DD', title: 'Predict', desc: 'The model takes an input and produces a guess. First prediction: random or near-zero.' },
            { num: '02', color: '#378ADD', title: 'Measure error', desc: 'Compare the guess to the actual answer. Quantify how wrong it was. This is the loss function.' },
            { num: '03', color: '#D85A30', title: 'Adjust', desc: 'Change the model\'s internal numbers slightly in the direction that reduces the error. This is gradient descent.' },
            { num: '04', color: '#1D9E75', title: 'Repeat', desc: 'Do this for every example in your training data. Then do it again. Thousands of times. The model converges.' },
          ].map((card) => (
            <div key={card.num} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderTop: `2px solid ${card.color}`, borderRadius: 8, padding: '14px 16px',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: card.color, fontFamily: 'var(--font-mono)', marginBottom: 6 }}>{card.num}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>{card.title}</div>
              <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <Callout type="info">
          Gradient descent is explained in full in the Linear Regression topic. For now just hold the mental
          model: the model makes guesses, measures how wrong they are, and nudges its numbers in the direction
          that makes the next guess less wrong. Repeat until it stops getting better.
        </Callout>
      </div>

      {/* ── SECTION 3: The landscape ──────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>The landscape</span>
        <h2 style={h2}>The 3 types of Machine Learning</h2>

        <p style={p}>
          Not all ML problems look the same. The type of data you have — specifically whether you have labelled
          outputs or not — determines which category of ML you are working in. There are three.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 14, margin: '24px 0' }}>
          {[
            {
              color: '#378ADD',
              title: 'Supervised Learning',
              tagline: 'You have the answers. The model learns from them.',
              what: 'You provide labelled training examples — each input is paired with the correct output. The model learns the mapping from inputs to outputs by seeing thousands of these pairs.',
              analogy: 'Teaching a child to identify animals by showing them 1,000 photos, each labelled with the animal\'s name. The child learns from your labels.',
              examples: [
                'Swiggy delivery time prediction — input: order details, label: actual delivery time (regression)',
                'Razorpay fraud detection — input: transaction features, label: fraud / not fraud (classification)',
                'Gmail spam filter — input: email text + metadata, label: spam / not spam (classification)',
                'HDFC loan approval — input: applicant financials, label: approved / rejected (classification)',
              ],
            },
            {
              color: '#1D9E75',
              title: 'Unsupervised Learning',
              tagline: 'No labels. Find the hidden structure yourself.',
              what: 'You have data but no labels — no correct answers to learn from. The model looks for patterns, groupings, or structure that exists in the data on its own terms.',
              analogy: 'A librarian given 10,000 books with no categories. They group them by content similarity — biography, fiction, technical — without being told what the categories should be.',
              examples: [
                'Flipkart customer segmentation — group 300M users by behaviour without predefined segments',
                'Anomaly detection in payment networks — find unusual patterns without labelling what fraud looks like',
                'Product catalogue clustering — group similar products without human-defined category trees',
                'User journey analysis — discover common navigation paths without labelling intent',
              ],
            },
            {
              color: '#7F77DD',
              title: 'Reinforcement Learning',
              tagline: 'Learn by trying. Get rewarded for good decisions.',
              what: 'An agent takes actions in an environment, receives a reward or penalty after each action, and learns over time which sequence of actions maximises total reward. No labelled data — just feedback from consequences.',
              analogy: 'Teaching a dog to fetch. You do not explain fetching. You give treats when the dog picks up the ball and brings it back. The dog learns the behaviour through trial, error, and rewards.',
              examples: [
                'Google DeepMind cooling data centres — RL agent reduced cooling energy by 40%',
                'Zepto delivery route optimisation — agent learns which routes minimise time across all riders simultaneously',
                'Algorithmic trading — agent learns when to buy and sell by receiving profit/loss as reward signal',
                'AlphaGo — agent learned to play Go by playing millions of games against itself',
              ],
            },
          ].map((card) => (
            <div key={card.title} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderLeft: `3px solid ${card.color}`, borderRadius: 10, padding: '20px 22px',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12, flexWrap: 'wrap' as const }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)', letterSpacing: '-0.3px', marginBottom: 3 }}>
                    {card.title}
                  </div>
                  <div style={{ fontSize: 12, color: card.color, fontStyle: 'italic' }}>{card.tagline}</div>
                </div>
              </div>

              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 12 }}>{card.what}</p>

              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>Analogy</div>
              <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 14, padding: '8px 12px', background: 'var(--bg)', borderRadius: 6 }}>{card.analogy}</p>

              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>Real examples</div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 5 }}>
                {card.examples.map((ex, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: card.color, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{ex}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Callout type="info">
          This section — Classical ML — focuses entirely on Supervised Learning. It is the most common type in
          production, the foundation for everything else, and what you will encounter most in your first few
          years as an ML practitioner. Unsupervised and Reinforcement Learning are covered later in the track.
        </Callout>
      </div>

      {/* ── SECTION 4: How it actually works ──────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>How it actually works</span>
        <h2 style={h2}>The ML workflow — start to finish</h2>

        <p style={p}>
          Every ML project at every company — from a two-person startup to Flipkart&apos;s 400-person data team —
          follows the same seven steps. The tools change. The algorithms change. The steps do not.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 0, margin: '32px 0', position: 'relative' as const }}>
          <div style={{ position: 'absolute' as const, left: 19, top: 0, bottom: 0, width: 2, background: 'var(--border)' }} />

          {[
            {
              num: '01', color: '#7F77DD', title: 'Define the problem',
              desc: 'Before touching data, be precise: what are you predicting? What inputs will you have at prediction time? What does "good enough" look like in numbers?',
              swiggy: 'Predicting: delivery_time_min. Inputs available at order time: distance, restaurant_id, time_of_day, day_of_week, weather_code, rider_count_nearby. Good enough: mean absolute error ≤ 5 minutes on 85% of orders.',
            },
            {
              num: '02', color: '#378ADD', title: 'Collect and understand your data',
              desc: 'Pull your historical data and look at it. What are the distributions? Are there missing values? Outliers? Surprising correlations? You cannot build a good model on data you do not understand.',
              swiggy: 'Pull 12 months of completed orders: 500,000 rows. Find: 2% have missing restaurant_prep_time. Outliers: 0.3% with delivery_time > 120 min (likely cancelled/reordered). Correlation check: distance is strong but not dominant — prep time is equally predictive.',
            },
            {
              num: '03', color: '#D85A30', title: 'Prepare the data',
              desc: 'Handle missing values. Encode categorical variables. Scale numerical features. Split into training and test sets. The model will only be as good as the data you feed it.',
              swiggy: 'Fill missing prep times with restaurant median. Encode time_of_day as 4 buckets (morning/lunch/afternoon/evening). Scale distance to 0–1 range. Split: 80% training (400K orders), 20% test (100K orders, never touched during training).',
            },
            {
              num: '04', color: '#BA7517', title: 'Choose and train a model',
              desc: 'Pick an algorithm appropriate for your problem type and data. Feed it your training data. The algorithm adjusts its internal parameters until it fits the training patterns.',
              swiggy: 'Start simple: Linear Regression. Feed 400K training orders. Training takes under 1 second. The model learns coefficients for each feature — distance contributes +8.3 min/km, rush hour adds 9.7 min, and so on.',
            },
            {
              num: '05', color: '#1D9E75', title: 'Evaluate on the test set',
              desc: 'Run your trained model on the 20% of data it has never seen. Measure performance metrics. This is your honest estimate of how it will behave in production.',
              swiggy: 'Run on 100K test orders. Mean Absolute Error: 4.2 minutes. 79% of predictions within ±5 minutes. Not quite the 85% target. Time to improve.',
            },
            {
              num: '06', color: '#7F77DD', title: 'Improve and iterate',
              desc: 'Add more or better features. Try a more powerful algorithm. Tune hyperparameters. Each iteration goes back to the training data — the test set must stay untouched until you think you are done.',
              swiggy: 'Switch to XGBoost. Add 3 new features: restaurant_avg_prep_last_7d, rider_avg_speed_last_hour, order_item_count. MAE drops to 2.8 minutes. 91% within ±5 minutes. Target exceeded.',
            },
            {
              num: '07', color: '#378ADD', title: 'Deploy and monitor',
              desc: 'Wrap your model in an API. Serve predictions in production. Monitor performance over time — data distributions shift, and a model that was accurate in January may degrade by July.',
              swiggy: '3 million predictions per day. Real-time MAE monitoring dashboard. Alert triggers if 1-hour rolling MAE exceeds 5 minutes. Automated weekly retraining on the latest 30 days of data.',
            },
          ].map((step, i, arr) => (
            <div key={step.num} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', paddingBottom: i < arr.length - 1 ? 32 : 0, position: 'relative' as const }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                background: `${step.color}18`, border: `2px solid ${step.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: step.color,
                fontFamily: 'var(--font-mono)', zIndex: 1,
              }}>
                {step.num}
              </div>
              <div style={{ flex: 1, paddingTop: 6 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6, fontFamily: 'var(--font-display)', letterSpacing: '-0.3px' }}>
                  {step.title}
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 10 }}>{step.desc}</p>
                <div style={{
                  fontSize: 12, color: 'var(--muted)', lineHeight: 1.65,
                  padding: '9px 12px', background: `${step.color}0d`,
                  borderRadius: 6, borderLeft: `2px solid ${step.color}50`,
                  fontFamily: 'var(--font-mono)',
                }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: step.color, display: 'block', marginBottom: 3 }}>SWIGGY</span>
                  {step.swiggy}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Highlight>
          <strong style={{ color: 'var(--text)' }}>This workflow is the backbone of this entire track. </strong>
          Steps 1–3 are what the Data Engineering section covers in depth. Step 4 is every algorithm in this
          Classical ML section. Step 5 is the Evaluation &amp; Optimisation section. Steps 6–7 are Hyperparameter
          Tuning and MLOps. Every section of this track maps to a step in this workflow.
        </Highlight>
      </div>

      {/* ── SECTION 5: The vocabulary ─────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>The vocabulary</span>
        <h2 style={h2}>Terms you will see on every ML page — defined once, clearly</h2>

        <p style={p}>
          ML has jargon. There is no avoiding it. But the jargon is not complicated — it is just precise language
          for specific ideas. Learn these 12 terms here and you will never need to pause on any later page.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 2, margin: '24px 0' }}>
          {[
            {
              term: 'Feature',
              def: 'An input variable used to make a prediction. One column in your data table. Also called a predictor or independent variable.',
              example: 'distance_km, time_of_day, restaurant_id, weather_code — each is one feature in the delivery time model.',
            },
            {
              term: 'Label / Target',
              def: 'The thing you are trying to predict. The correct answer in your training data. Also called the dependent variable or output.',
              example: 'delivery_time_min — the actual number of minutes each order took, recorded after delivery.',
            },
            {
              term: 'Model',
              def: 'A mathematical function that maps input features to a predicted output. After training, it is a set of numbers (parameters) that encode the learned patterns.',
              example: 'The trained delivery time predictor. Given features for a new order, it outputs a number like 28.4 minutes.',
            },
            {
              term: 'Training data',
              def: 'The labelled examples you feed to the algorithm during learning. The model sees these inputs and their correct outputs.',
              example: '400,000 historical Swiggy orders with their actual delivery times — the 80% split used to train the model.',
            },
            {
              term: 'Test data',
              def: 'Held-out labelled examples the model never sees during training. Used only to evaluate final performance. Must not influence any training decision.',
              example: '100,000 historical orders kept aside. Run through the trained model after training is complete to get an honest performance estimate.',
            },
            {
              term: 'Parameters / Weights',
              def: 'The internal numbers of a model that are adjusted during training. They are what the model "learns." A linear regression has one weight per feature.',
              example: 'The coefficient +8.3 (min/km) on distance, +9.7 (min) for rush hour — these are learned parameters.',
            },
            {
              term: 'Loss / Error',
              def: 'A number measuring how wrong the model\'s predictions are. Training aims to minimise this. Different problems use different loss functions.',
              example: 'Mean Absolute Error = average of |predicted_time − actual_time| across all predictions. Lower is better.',
            },
            {
              term: 'Overfitting',
              def: 'The model memorises the training data so well that it fails on new data. It learned noise instead of signal. Performs great on training set, poorly on test set.',
              example: 'A model that learns that one specific restaurant always takes 47 minutes because that was true in training data — but it\'s a coincidence, not a pattern.',
            },
            {
              term: 'Underfitting',
              def: 'The model is too simple to capture the real patterns. Performs poorly on both training and test data. Usually means the model or features need more complexity.',
              example: 'A model that always predicts 28 minutes regardless of inputs. It learned the average but nothing else.',
            },
            {
              term: 'Hyperparameter',
              def: 'Settings you choose before training that control how the model learns — not learned from data. Tuning these is an optimisation problem of its own.',
              example: 'In XGBoost: max_depth (how deep each tree grows), learning_rate (how fast parameters update), n_estimators (how many trees to build).',
            },
            {
              term: 'Inference',
              def: 'Using a trained model to make predictions on new data. Also called prediction or scoring. Inference is what happens in production.',
              example: 'A new order comes in at 7:43 PM on a Friday, 3.2 km away. The trained model runs inference and outputs 34.1 minutes.',
            },
            {
              term: 'Baseline',
              def: 'The simplest possible benchmark — often just predicting the mean. Your model must beat this to be worth deploying. The bar you need to clear.',
              example: 'Baseline: always predict 31 minutes (the training set mean). MAE = 8.3 min. If your model can\'t beat 8.3 MAE, it has learned nothing useful.',
            },
          ].map((item, i) => (
            <div key={item.term} style={{
              padding: '14px 18px',
              background: i % 2 === 0 ? 'var(--surface)' : 'transparent',
              borderRadius: 8, border: '1px solid transparent',
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' as const }}>
                <span style={{
                  fontSize: 13, fontWeight: 700, color: '#378ADD',
                  fontFamily: 'var(--font-mono)', flexShrink: 0, minWidth: 150,
                }}>
                  {item.term}
                </span>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 6 }}>{item.def}</p>
                  <div style={{
                    fontSize: 11.5, color: 'var(--muted)', fontStyle: 'italic',
                    padding: '6px 10px', background: 'var(--bg)',
                    borderRadius: 5, lineHeight: 1.6,
                  }}>
                    {item.example}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 6: What this looks like at work ───────────────────────── */}
      <div style={sec}>
        <span style={tag}>What this looks like at work</span>
        <h2 style={h2}>What ML engineers actually do at Indian companies</h2>

        <p style={p}>
          Machine Learning is not a single job title. Three roles work with ML in different ways.
          Understanding the differences will help you decide which path you are on.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, margin: '24px 0' }}>
          {[
            {
              color: '#378ADD',
              title: 'ML Engineer',
              focus: 'Build and ship models into production',
              salary: '₹18–28 LPA',
              bullets: [
                'Write training pipelines that run on a schedule',
                'Build and maintain the feature engineering code',
                'Wrap models in FastAPI services, deploy to Kubernetes',
                'Monitor prediction quality and trigger retraining',
                'Debug why a model that worked in dev fails in prod',
              ],
            },
            {
              color: '#1D9E75',
              title: 'Data Scientist',
              focus: 'Find insights and answer business questions with data',
              salary: '₹16–24 LPA',
              bullets: [
                'Explore data to find patterns and test hypotheses',
                'Build models to answer specific business questions',
                'Run A/B experiments and interpret results statistically',
                'Communicate findings to non-technical stakeholders',
                'Prototype quickly; hand production code to ML engineers',
              ],
            },
            {
              color: '#7F77DD',
              title: 'Applied Scientist',
              focus: 'Research and apply advanced techniques at scale',
              salary: '₹22–35 LPA',
              bullets: [
                'Read and implement current ML research papers',
                'Design novel model architectures for company-specific problems',
                'Run large-scale offline experiments before production decisions',
                'Collaborate with ML engineers on production deployment',
                'Publish internally or externally on methods that work',
              ],
            },
          ].map((role) => (
            <div key={role.title} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderTop: `2px solid ${role.color}`, borderRadius: 10, padding: '18px 20px',
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 3, fontFamily: 'var(--font-display)' }}>{role.title}</div>
              <div style={{ fontSize: 11, color: role.color, fontStyle: 'italic', marginBottom: 10 }}>{role.focus}</div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 5, marginBottom: 14 }}>
                {role.bullets.map((b, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: role.color, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{b}</span>
                  </div>
                ))}
              </div>
              <div style={{
                paddingTop: 12, borderTop: '1px solid var(--border)',
                fontSize: 13, fontWeight: 700, color: role.color, fontFamily: 'var(--font-mono)',
              }}>
                {role.salary}
              </div>
            </div>
          ))}
        </div>

        <Highlight color="#1D9E75">
          <strong style={{ color: 'var(--text)' }}>Your first week ML task — what it really looks like: </strong>
          Your lead sends you a Slack message: &quot;We&apos;re seeing high return rates on electronics. Can you build
          something that flags orders likely to be returned before we ship them?&quot; You now know what this means:
          Supervised Learning classification problem. Features: product category, order value, customer history,
          payment method. Label: returned / not returned. Workflow: collect historical orders with return outcomes →
          engineer features → train a classifier → evaluate precision and recall → deploy if it beats baseline.
          That&apos;s the job.
        </Highlight>
      </div>

      {/* ── SECTION 7: What comes next ────────────────────────────────────── */}
      <div style={{ paddingBottom: 0, marginBottom: 32 }}>
        <span style={tag}>What comes next</span>
        <h2 style={h2}>You&apos;re ready for the first algorithm</h2>

        <p style={p}>
          You now have the foundation. You know what Machine Learning is, how it differs from traditional
          programming, what the three types are, what the seven-step workflow looks like, and what the key
          vocabulary means.
        </p>
        <p style={p}>
          The next page introduces the simplest possible supervised learning algorithm — Linear Regression —
          and uses it to build an actual delivery time predictor for Swiggy. You will see every concept from
          this page in working code.
        </p>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const,
          gap: 12, padding: '16px 20px',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderLeft: '3px solid #378ADD', borderRadius: 10, marginTop: 24,
        }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#378ADD', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
              Next up in Classical ML
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)', letterSpacing: '-0.3px' }}>
              Linear Regression — predicting Swiggy delivery time
            </div>
          </div>
          <span style={{
            fontSize: 10, padding: '4px 12px', borderRadius: 4,
            background: 'var(--bg)', color: 'var(--muted)',
            border: '1px solid var(--border)', fontFamily: 'var(--font-mono)',
            whiteSpace: 'nowrap' as const,
          }}>
            coming soon
          </span>
        </div>
      </div>

      {/* ── KEY TAKEAWAYS ─────────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'ML = examples in, rules out. You provide labelled data; the algorithm finds the patterns and encodes them as a model.',
        'Training = predict → measure error → adjust → repeat. The model iterates over the training data, nudging its parameters toward lower loss on each pass.',
        'Three types: Supervised (labelled data, most common), Unsupervised (no labels, find structure), Reinforcement (learn from rewards). This section covers Supervised.',
        'Every ML project follows the same 7-step workflow: define problem → collect data → prepare data → train → evaluate → improve → deploy.',
        'Overfitting means memorising training data (good train score, bad test score). Underfitting means too simple (bad both). Both are diagnosable and fixable.',
        '12 key vocabulary terms — feature, label, model, training/test data, parameters, loss, overfitting, underfitting, hyperparameter, inference, baseline — are defined and will not be re-explained.',
      ]} />

    </LearnLayout>
  )
}
