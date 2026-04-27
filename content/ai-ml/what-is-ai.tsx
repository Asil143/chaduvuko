import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import AIMLHierarchy from '@/components/ui/AIMLHierarchy'

export const metadata: Metadata = {
  title: 'What is AI? ML, Deep Learning & GenAI Explained — Chaduvuko',
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
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{children}</p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WhatIsAIPage() {
  return (
    <LearnLayout
      title="What is AI? (And what are ML, DL, and GenAI?)"
      description="The clearest explanation of the AI family — zero jargon, real examples, interactive visual."
      section="AI & ML — Introduction"
      readTime="20–25 min"
      updatedAt="March 2026"
    >

      {/* ── SECTION 1: Before we start ─────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>Before we start</span>
        <h2 style={h2}>Everyone is confused. That&apos;s not your fault.</h2>
        <p style={p}>
          Open any tech news site today. You will read about &quot;AI models,&quot; &quot;machine learning algorithms,&quot;
          &quot;deep learning networks,&quot; and &quot;generative AI&quot; — sometimes in the same sentence, often meaning
          different things, always without any explanation of how they relate to each other.
        </p>
        <p style={p}>
          LinkedIn posts say &quot;I&apos;m learning AI.&quot; Job postings ask for &quot;ML experience.&quot;
          News headlines scream about &quot;deep learning breakthroughs.&quot; Everyone seems to assume you already know
          the difference between all of these. Almost nobody explains it clearly.
        </p>
        <p style={p}>
          This is not a knowledge gap. It is a teaching gap. These terms are genuinely confusing because they are used
          interchangeably in popular media even though they refer to very different — but related — things.
        </p>
        <Highlight>
          Here&apos;s the one thing this page will do: by the time you finish reading, you will understand exactly what
          each term means, how they relate to each other, and why they are taught in a specific order. No jargon. No
          assumptions. Real examples throughout.
        </Highlight>
        <Callout type="tip">
          This page has no code, no math, and no prerequisites. If you can read this sentence, you have everything you
          need to understand what follows.
        </Callout>
      </div>

      {/* ── SECTION 2: The big picture ─────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>The big picture</span>
        <h2 style={h2}>They&apos;re not separate subjects. They&apos;re nested.</h2>
        <p style={p}>
          Think of Russian nesting dolls — matryoshka. The outermost doll contains all the others. You can&apos;t pull
          out the innermost doll without also having the outer ones. AI, ML, Deep Learning, and Generative AI work the
          same way.
        </p>
        <p style={p}>
          AI is the outermost layer — the broadest concept. Machine Learning lives inside AI. Deep Learning lives inside
          Machine Learning. Generative AI lives inside Deep Learning. Each layer is a more specific version of the one
          containing it.
        </p>
        <p style={p}>
          Click each ring in the diagram below to see what each layer means, a plain-English analogy, and real examples
          from companies you know.
        </p>

        <div style={{ margin: '32px 0' }}>
          <AIMLHierarchy />
        </div>

        <Highlight>
          <strong style={{ color: 'var(--text)' }}>The one sentence that unlocks everything: </strong>
          Every GenAI model is a DL model. Every DL model is an ML model. Every ML model is an AI system.
          But the reverse is not true — not every AI system uses ML, and not every ML model uses deep learning.
        </Highlight>
      </div>

      {/* ── SECTION 3: Layer 1 — AI ────────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>Layer 1 of 4</span>
        <h2 style={h2}>Artificial Intelligence — the universe</h2>
        <p style={p}>
          Artificial Intelligence is the broad goal: make a machine do something that normally requires human
          intelligence. Understanding language. Recognising faces. Making decisions under uncertainty. Solving problems.
          AI is the destination. The other terms describe different routes to get there.
        </p>
        <p style={p}>
          Before machine learning existed, AI meant writing rules by hand. Programmers sat down and encoded human
          knowledge directly into &quot;if this, then that&quot; logic. This is called rule-based AI or expert systems.
        </p>
        <pre style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: '16px 20px',
          fontSize: 13,
          fontFamily: 'var(--font-mono)',
          color: 'var(--muted)',
          overflowX: 'auto',
          margin: '20px 0',
          lineHeight: 1.7,
        }}>{`IF email contains "lottery" AND "winner" AND "bank details"
  → mark as SPAM

IF email is from known_contacts list
  → mark as NOT SPAM

IF email contains "invoice" AND sender matches company_domain
  → mark as NOT SPAM

// A human wrote every single one of these rules.
// Add 10 million spam emails and you need 10 million rules.`}</pre>
        <p style={p}>
          This approach works when the rules are knowable and finite. It breaks down when the problem is too complex,
          too variable, or when the rules themselves keep changing.
        </p>
        <Callout type="info">
          Rule-based AI is not obsolete. Traffic light systems, ATM transaction logic, chess engines using evaluation
          functions, and many industrial control systems still run on hand-coded rules today. The point is not that
          rule-based AI is bad — it is that it cannot scale to problems where the rules are too complex or unknown.
        </Callout>
      </div>

      {/* ── SECTION 4: Layer 2 — ML ────────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>Layer 2 of 4</span>
        <h2 style={h2}>Machine Learning — let the data write the rules</h2>
        <p style={p}>
          Machine Learning is a specific approach to AI where instead of writing rules manually, you show the machine
          thousands — or millions — of labelled examples, and it figures out the rules itself. The machine learns from
          data. Hence the name.
        </p>
        <p style={p}>
          You do not tell a spam filter what spam looks like. You show it 10 million spam emails and 10 million real
          ones. It discovers on its own that certain word combinations, sender patterns, and link structures are
          associated with spam. You never wrote a single rule about Nigerian princes.
        </p>
        <Highlight color="#378ADD">
          <strong style={{ color: 'var(--text)' }}>The core shift: </strong>
          in rule-based AI, the programmer writes the logic. In ML, the programmer provides the data and
          the machine writes the logic. The output is a &quot;model&quot; — a mathematical function that maps
          inputs to outputs based on patterns learned from examples.
        </Highlight>

        <div style={{ overflowX: 'auto', margin: '24px 0' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 13,
            fontFamily: 'var(--font-mono)',
          }}>
            <thead>
              <tr>
                <th style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', textAlign: 'left', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}></th>
                <th style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: '#D85A30', textAlign: 'left', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Rule-Based AI</th>
                <th style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: '#378ADD', textAlign: 'left', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Machine Learning</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Input', 'Hand-written rules + data', 'Labelled examples only'],
                ['Spam filter', 'List of banned words / senders', 'Show 10M spam + 10M real emails'],
                ['Delivery time', 'Write rules for every traffic scenario', 'Train on 1M past deliveries with outcomes'],
                ['Adapts to new data', 'Someone must update rules manually', 'Retrain the model on new examples'],
                ['Works best when', 'Rules are knowable and finite', 'Patterns exist but rules are too complex to write'],
              ].map(([row, ruleVal, mlVal], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                  <td style={{ padding: '10px 14px', color: 'var(--muted)', fontWeight: 600, borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{row}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{ruleVal}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{mlVal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Callout type="tip">
          When someone says &quot;we trained a model,&quot; this is what they mean: they fed labelled data into a
          learning algorithm, the algorithm adjusted its internal parameters to minimise errors on that data, and the
          result is a &quot;trained model&quot; — a function that can now make predictions on new, unseen inputs.
        </Callout>
      </div>

      {/* ── SECTION 5: Layer 3 — DL ────────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>Layer 3 of 4</span>
        <h2 style={h2}>Deep Learning — ML with a brain-inspired twist</h2>
        <p style={p}>
          Classical machine learning is powerful, but it has a limitation: you have to tell it what to look for.
          To build a cat classifier with classical ML, you would need to manually define features — fur texture, ear
          shape, whisker presence, body proportions. A human expert decides which measurements matter.
        </p>
        <p style={p}>
          Deep Learning removes that requirement. You show it 5 million photos labelled &quot;cat&quot; or
          &quot;not cat,&quot; and it figures out — entirely on its own — which features distinguish cats from
          everything else. No human wrote &quot;check for pointy ears.&quot; The network discovered that itself.
        </p>
        <p style={p}>
          It does this through many layers of artificial neurons stacked on top of each other. Each layer transforms
          its input and passes it to the next. This is where the word &quot;deep&quot; comes from — not intelligence,
          just depth of layers.
        </p>
        <Highlight color="#D85A30">
          <strong style={{ color: 'var(--text)' }}>What &quot;deep&quot; actually means: </strong>
          Layer 1 detects raw edges and colour gradients in the pixels. Layer 5 recognises basic shapes. Layer 15
          assembles shapes into textures — fur, scales, skin. Layer 30 recognises object parts — eyes, ears, wheels.
          Layer 50 recognises full objects — a cat face, a car door. No human designed these layers.
          They emerge from training.
        </Highlight>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, margin: '24px 0' }}>
          {[
            { num: '01', color: '#7F77DD', title: 'Data', desc: 'DL needs millions of examples. Classical ML can work with hundreds. ImageNet had 14 million labelled images — that scale is what made DL possible.' },
            { num: '02', color: '#378ADD', title: 'Compute (GPUs)', desc: 'Training billions of parameters requires parallel computation. GPUs — originally built for video games — turned out to be perfect for this. NVIDIA became an AI company.' },
            { num: '03', color: '#1D9E75', title: 'Better algorithms', desc: 'Researchers discovered tricks: ReLU activations, dropout regularisation, batch normalisation. Each solved a specific failure mode that had blocked neural networks for decades.' },
          ].map((card) => (
            <div key={card.num} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderTop: `2px solid ${card.color}`,
              borderRadius: 8,
              padding: '14px 16px',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: card.color, fontFamily: 'var(--font-mono)', marginBottom: 6 }}>{card.num}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8, fontFamily: 'var(--font-display)' }}>{card.title}</div>
              <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <Callout type="warning">
          Deep Learning is not always the right tool. For structured tabular data — spreadsheets, databases,
          transaction logs — classical ML algorithms like XGBoost and Random Forests frequently outperform deep
          learning, train faster, and require far less data. DL dominates images, audio, and text. Classical ML
          dominates structured data. Both matter.
        </Callout>
      </div>

      {/* ── SECTION 6: Layer 4 — GenAI ─────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>Layer 4 of 4</span>
        <h2 style={h2}>Generative AI — from recognising to creating</h2>
        <p style={p}>
          Every AI system we have described so far is discriminative — it takes an input and makes a judgement.
          Is this email spam? What digit is in this image? Will this customer churn? The output is a classification,
          a number, or a decision.
        </p>
        <p style={p}>
          Generative AI does something fundamentally different: it creates. New text that has never been written.
          New images that have never been photographed. New code that has never been typed. The output is not a
          label — it is a new artefact.
        </p>
        <Highlight color="#7F77DD">
          <strong style={{ color: 'var(--text)' }}>The simplest way to think about it: </strong>
          all previous AI was a judge. You showed it something and it gave a verdict — real or fake, cat or dog,
          fraud or legitimate. Generative AI is a creator. You give it a prompt and it produces something that
          did not exist before. The shift from judging to creating is what makes GenAI a genuinely different category.
        </Highlight>
        <p style={p}>
          Large Language Models like Claude, GPT-4, and Gemini generate text one token at a time. A token is roughly
          a word or part of a word. Given everything that came before — your prompt plus its own previous output — the
          model predicts the most likely next token. It does this billions of times, very fast. What emerges reads
          like coherent thought.
        </p>
        <Callout type="info">
          LLM stands for Large Language Model. The architecture is called a Transformer (from the 2017 paper
          &quot;Attention Is All You Need&quot;). It is trained on hundreds of billions of tokens of text — books,
          websites, code, scientific papers — to predict the next token. At sufficient scale, this produces a model
          that can reason, translate, summarise, write code, and hold conversations. The mechanism is prediction.
          The emergent behaviour looks like understanding.
        </Callout>
        <p style={p}>
          And Generative AI is not only text. The same &quot;learn to generate from patterns&quot; principle applies
          to every medium: Midjourney and DALL-E generate images. Suno and Udio generate music. Sora and Runway
          generate video. ElevenLabs generates voice. The modality changes; the core idea — learn the distribution
          of real data and sample from it — does not.
        </p>
      </div>

      {/* ── SECTION 7: Timeline ────────────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>How we got here</span>
        <h2 style={h2}>The timeline — from concept to ChatGPT</h2>
        <p style={p}>
          These ideas did not arrive fully formed. Each breakthrough enabled the next. Understanding the sequence
          explains why we teach things in the order we do.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, margin: '32px 0', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 19, top: 0, bottom: 0, width: 2, background: 'var(--border)' }} />
          {[
            {
              year: '1950s',
              color: '#7F77DD',
              title: 'AI as a field is born',
              desc: 'Alan Turing asks "Can machines think?" and proposes the Turing Test. John McCarthy coins the term "Artificial Intelligence" at the 1956 Dartmouth Conference. The goal is set. The tools do not yet exist.',
            },
            {
              year: '1980s',
              color: '#888888',
              title: 'Neural networks — first wave',
              desc: 'Backpropagation is formalised, allowing neural networks to learn from errors. Early networks show promise on small problems. Limited data and weak hardware mean they cannot scale, and interest fades into the "AI winter."',
            },
            {
              year: '2001',
              color: '#1D9E75',
              title: 'Machine Learning goes mainstream',
              desc: 'Support Vector Machines, Random Forests, and boosting algorithms prove reliable on real problems. The internet generates data at scale for the first time. ML becomes an engineering discipline, not just an academic pursuit.',
            },
            {
              year: '2012',
              color: '#378ADD',
              title: 'Deep Learning breakthrough — AlexNet',
              desc: 'A deep convolutional neural network wins the ImageNet competition by a margin that shocks the field — 15.3% error vs 26.2% for the next best. GPU training makes it possible. The modern deep learning era begins.',
            },
            {
              year: '2017',
              color: '#D85A30',
              title: '"Attention Is All You Need" — the Transformer paper',
              desc: 'Google researchers publish a new neural network architecture that processes entire sequences in parallel rather than one token at a time. This architecture — the Transformer — becomes the foundation for every major language model that follows.',
            },
            {
              year: '2022',
              color: '#1D9E75',
              title: 'ChatGPT — Generative AI reaches everyone',
              desc: 'OpenAI releases ChatGPT. One million users in five days. One hundred million in two months. For the first time, a general-purpose AI system is accessible to anyone with a browser. The conversation about AI in everyday life begins in earnest.',
            },
          ].map((entry, i, arr) => (
            <div key={entry.year} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', paddingBottom: i < arr.length - 1 ? 32 : 0, position: 'relative' }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                background: `${entry.color}18`,
                border: `2px solid ${entry.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, color: entry.color,
                fontFamily: 'var(--font-mono)', zIndex: 1,
                letterSpacing: '-0.5px',
              }}>
                {entry.year}
              </div>
              <div style={{ paddingTop: 8, flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6, fontFamily: 'var(--font-display)', letterSpacing: '-0.3px' }}>
                  {entry.title}
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{entry.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 8: India examples ──────────────────────────────────────── */}
      <div style={sec}>
        <span style={tag}>Real world — India</span>
        <h2 style={h2}>Indian companies using each layer — right now</h2>
        <p style={p}>
          This is not theoretical. Every layer of the AI hierarchy is running in production at companies whose apps
          are on your phone right now.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14, margin: '24px 0' }}>
          {[
            {
              company: 'DoorDash',
              color: '#FF6B00',
              type: 'Classical ML',
              problem: 'How do you show a delivery time estimate the moment someone opens the app — before they have even chosen what to order?',
              approach: 'Gradient boosting models trained on millions of past deliveries, incorporating time of day, weather, kitchen prep patterns, and real-time traffic. No deep learning needed.',
            },
            {
              company: 'Stripe',
              color: '#2D9CDB',
              type: 'Classical ML + DL',
              problem: 'How do you detect fraudulent payments in under 100 milliseconds without blocking legitimate transactions?',
              approach: 'Two-stage system: XGBoost flags suspicious patterns from transaction metadata, a neural net analyses behavioural sequences. Each layer catches what the other misses.',
            },
            {
              company: 'Amazon',
              color: '#F7B731',
              type: 'Deep Learning',
              problem: 'How do you recommend relevant products to 300 million users across categories as different as groceries and laptops?',
              approach: 'A two-tower neural network learns separate embeddings for users and products. Similarity between embeddings determines recommendations. No explicit rules about what goes with what.',
            },
            {
              company: 'Instacart',
              color: '#9B59B6',
              type: 'Classical ML',
              problem: 'How do you stock the right products at each dark store without running out or overstocking perishables?',
              approach: 'Time series forecasting using gradient boosting on historical order data, local weather, local events, and day-of-week patterns. Getting this wrong costs money every hour.',
            },
            {
              company: 'HDFC Bank',
              color: '#D4A017',
              type: 'Generative AI',
              problem: 'How do you handle 10 million customer service queries per month in multiple Indian languages without proportional headcount growth?',
              approach: 'An LLM fine-tuned on banking knowledge with RAG (Retrieval Augmented Generation) pulling from live policy documents. The model cites sources. Humans review edge cases.',
            },
            {
              company: 'Shopify',
              color: '#F06292',
              type: 'Deep Learning',
              problem: 'How do you normalise and categorise 100 million product listings uploaded by small sellers who use inconsistent names, photos, and descriptions?',
              approach: 'Convolutional neural networks classify products from images. A separate NLP model standardises titles. The result is a searchable catalogue despite messy inputs.',
            },
          ].map((card) => (
            <div key={card.company} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderTop: `2px solid ${card.color}`,
              borderRadius: 10,
              padding: '16px 18px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{card.company}</div>
                <span style={{
                  fontSize: 10, padding: '2px 8px', borderRadius: 3,
                  background: `${card.color}18`, color: card.color,
                  fontWeight: 700, fontFamily: 'var(--font-mono)',
                  whiteSpace: 'nowrap' as const,
                }}>{card.type}</span>
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>The problem</div>
              <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 10 }}>{card.problem}</p>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>The approach</div>
              <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>{card.approach}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 9: Your path ───────────────────────────────────────────── */}
      <div style={{ ...sec, borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>
        <span style={tag}>Your path</span>
        <h2 style={h2}>Which one should you learn?</h2>
        <p style={p}>
          The answer is all of them — and in order. This is not arbitrary. Each layer genuinely depends on the one
          below it. You cannot understand why deep learning works without understanding what machine learning is
          trying to do. You cannot understand Generative AI without understanding Transformers, which are a deep
          learning architecture.
        </p>
        <p style={p}>
          The track is sequenced to respect these dependencies. Every section assumes you completed the one before it.
          Nothing is skippable without a cost.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10, margin: '24px 0', maxWidth: 600 }}>
          {[
            { nums: '01 – 03', color: '#7F77DD', title: 'Math, Python, Data', desc: 'The ground floor. Every ML algorithm is math. Every ML implementation is code. Every ML project starts with data.' },
            { nums: '04 – 05', color: '#378ADD', title: 'Classical ML & Evaluation', desc: 'The bread and butter. Linear regression to XGBoost. How to measure if a model is actually good. Most production ML lives here.' },
            { nums: '06',      color: '#D85A30', title: 'Deep Learning', desc: 'Neural networks from first principles to Transformers. The foundation for everything below.' },
            { nums: '07 – 08', color: '#D4537E', title: 'NLP & Computer Vision', desc: 'Deep learning applied to the two domains it transformed most completely. Text and images.' },
            { nums: '09',      color: '#7F77DD', title: 'Generative AI', desc: 'GANs, diffusion models, LLMs, RLHF, agents. Now you have the foundation to understand all of it.' },
            { nums: '10 – 11', color: '#639922', title: 'MLOps & Cloud', desc: 'How to ship models to production and keep them working. A model nobody uses is a hobby project.' },
          ].map((step) => (
            <div key={step.nums} style={{
              display: 'flex', gap: 14, alignItems: 'flex-start',
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderLeft: `3px solid ${step.color}`,
              borderRadius: 8, padding: '12px 16px',
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: step.color, fontFamily: 'var(--font-mono)', flexShrink: 0, paddingTop: 1 }}>{step.nums}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3, fontFamily: 'var(--font-display)' }}>{step.title}</div>
                <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Callout type="tip">
          The most common mistake in this field is skipping to Generative AI because it looks exciting — and then
          spending months confused about why anything works. The foundations are not slow. They are what make
          everything fast. Start at section 01.
        </Callout>
      </div>

      {/* ── KEY TAKEAWAYS ─────────────────────────────────────────────────── */}
      <KeyTakeaways items={[
        'AI is the universe — any technique that makes machines mimic human intelligence, including hand-coded rules.',
        'ML is a subset of AI where the machine learns rules from data instead of having rules written for it.',
        'Deep Learning is a subset of ML using stacked neural network layers to learn features automatically from raw data.',
        'Generative AI is a subset of DL where models create new content — text, images, audio — rather than just classifying inputs.',
        'They are nested, not parallel. Every GenAI model is a DL model. Every DL model is an ML model. The reverse is not true.',
        'This track teaches them in prerequisite order: each section depends on the one before it. Start from section 01.',
      ]} />

    </LearnLayout>
  )
}
