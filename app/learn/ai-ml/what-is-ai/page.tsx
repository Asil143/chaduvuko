import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import AIMLHierarchy from '@/components/ui/AIMLHierarchy'

export const metadata: Metadata = {
  title: 'What is AI? ML, Deep Learning & GenAI Explained — Chaduvuko',
  description:
    'AI, ML, Deep Learning, and Generative AI explained from scratch. No jargon. No assumptions. Real examples from Swiggy, Razorpay, Flipkart. The clearest explanation you will find.',
  openGraph: {
    title: 'What is AI? ML, DL & GenAI Explained — Chaduvuko',
    description:
      'The hierarchy of AI explained simply. Real Indian company examples. Interactive visual. Zero prerequisites.',
    url: 'https://chaduvuko.com/learn/ai-ml/what-is-ai',
  },
}

// ─── Shared style tokens ──────────────────────────────────────────────────────

const S = {
  sectionTag: {
    fontSize: 11,
    fontWeight: 700 as const,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: 'var(--accent)',
    fontFamily: 'var(--font-mono)',
    display: 'block' as const,
    marginBottom: 10,
  },
  h2: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(20px, 3vw, 30px)' as string,
    fontWeight: 900 as const,
    letterSpacing: '-1.2px',
    color: 'var(--text)',
    marginBottom: 14,
    lineHeight: 1.15,
  },
  h3: {
    fontFamily: 'var(--font-display)',
    fontSize: 18,
    fontWeight: 700 as const,
    letterSpacing: '-0.5px',
    color: 'var(--text)',
    marginBottom: 10,
  },
  p: {
    fontSize: 15,
    color: 'var(--muted)',
    lineHeight: 1.85,
    marginBottom: 16,
  },
  pSmall: {
    fontSize: 13,
    color: 'var(--muted)',
    lineHeight: 1.8,
    marginBottom: 12,
  },
  section: {
    paddingBottom: 56,
    marginBottom: 0,
    borderBottom: '1px solid var(--border)',
    paddingTop: 8,
  },
  card: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    padding: '18px 20px',
  },
  mono: {
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    color: 'var(--muted)',
  },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionDivider() {
  return <div style={{ height: 56 }} />
}

function HighlightBox({
  children,
  color = 'var(--accent)',
}: {
  children: React.ReactNode
  color?: string
}) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${color}`,
        borderRadius: 8,
        padding: '14px 18px',
        marginBottom: 20,
      }}
    >
      {children}
    </div>
  )
}

function ComparisonRow({
  label,
  old,
  ml,
  color,
}: {
  label: string
  old: string
  ml: string
  color: string
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '120px 1fr 1fr',
        gap: 12,
        padding: '12px 0',
        borderBottom: '1px solid var(--border)',
        alignItems: 'start',
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--muted)',
          fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          paddingTop: 2,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 13,
          color: 'var(--muted)',
          lineHeight: 1.6,
          padding: '6px 10px',
          background: 'var(--bg2)',
          borderRadius: 6,
          border: '1px solid var(--border)',
        }}
      >
        {old}
      </div>
      <div
        style={{
          fontSize: 13,
          color: 'var(--muted)',
          lineHeight: 1.6,
          padding: '6px 10px',
          background: `${color}0e`,
          borderRadius: 6,
          border: `1px solid ${color}30`,
        }}
      >
        {ml}
      </div>
    </div>
  )
}

function IndianCompanyCard({
  company,
  problem,
  approach,
  type,
  color,
}: {
  company: string
  problem: string
  approach: string
  type: string
  color: string
}) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '16px 18px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 2,
          background: color,
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--text)',
            fontFamily: 'var(--font-display)',
          }}
        >
          {company}
        </span>
        <span
          style={{
            fontSize: 10,
            padding: '2px 8px',
            borderRadius: 3,
            fontWeight: 600,
            background: `${color}15`,
            color: color,
            flexShrink: 0,
            marginLeft: 8,
          }}
        >
          {type}
        </span>
      </div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          marginBottom: 4,
          fontFamily: 'var(--font-mono)',
        }}
      >
        The problem
      </div>
      <p style={{ ...S.pSmall, marginBottom: 10 }}>{problem}</p>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: color,
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          marginBottom: 4,
          fontFamily: 'var(--font-mono)',
        }}
      >
        The approach
      </div>
      <p style={{ ...S.pSmall, marginBottom: 0 }}>{approach}</p>
    </div>
  )
}

function TimelineItem({
  year,
  event,
  detail,
  color,
  isLast = false,
}: {
  year: string
  event: string
  detail: string
  color: string
  isLast?: boolean
}) {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: `${color}15`,
            border: `1.5px solid ${color}60`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            fontWeight: 700,
            color: color,
            fontFamily: 'var(--font-mono)',
            flexShrink: 0,
          }}
        >
          {year}
        </div>
        {!isLast && (
          <div
            style={{
              width: 1,
              flex: 1,
              minHeight: 20,
              background: 'var(--border)',
              marginTop: 4,
            }}
          />
        )}
      </div>
      <div style={{ paddingTop: 6, paddingBottom: isLast ? 0 : 24 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: 4,
            fontFamily: 'var(--font-display)',
          }}
        >
          {event}
        </div>
        <p style={{ ...S.pSmall, marginBottom: 0 }}>{detail}</p>
      </div>
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

      {/* ── Track entry breadcrumb ──────────────────────────────────────────── */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          padding: '4px 12px',
          borderRadius: 5,
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          marginBottom: 32,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--accent)',
          }}
        />
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.09em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          AI &amp; ML Track · Introduction
        </span>
      </div>

      {/* ══ SECTION 1 — THE CONFUSION ══════════════════════════════════════════ */}
      <div style={S.section}>
        <span style={S.sectionTag}>Before we start</span>
        <h2 style={S.h2}>
          Everyone is confused. That's not your fault.
        </h2>

        <p style={S.p}>
          Open any job posting on Naukri or LinkedIn right now. You'll see roles titled
          "AI Engineer," "ML Scientist," "Deep Learning Developer," "GenAI Specialist,"
          and "Data Scientist" — all describing jobs that overlap by 80%.
          Open any YouTube channel or blog and you'll find "AI" and "ML" used
          interchangeably in the same sentence. Sometimes in the same breath.
        </p>

        <p style={S.p}>
          This isn't because the people writing those posts don't know what they're talking about.
          It's because these terms genuinely are related — and most platforms never bother
          to explain exactly how.
        </p>

        <HighlightBox>
          <p style={{ ...S.p, marginBottom: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              Here's the one thing this page will do:
            </span>{' '}
            by the time you finish reading, you'll understand exactly what each term means,
            how they relate to each other, and — most importantly — you'll be able to look
            at any AI product in the world and know which category it falls into.
            That clarity is the foundation everything else in this track builds on.
          </p>
        </HighlightBox>

        <Callout type="tip">
          This page has no code, no math, and no prerequisites. It's purely about building
          the right mental model before you touch a single algorithm. Don't skip it —
          the students who struggle most are usually the ones who skipped this step.
        </Callout>
      </div>

      <SectionDivider />

      {/* ══ SECTION 2 — THE HIERARCHY ══════════════════════════════════════════ */}
      <div style={S.section}>
        <span style={S.sectionTag}>The big picture</span>
        <h2 style={S.h2}>
          They're not separate subjects. They're nested.
        </h2>

        <p style={S.p}>
          The single biggest misconception beginners have is thinking AI, ML, Deep Learning,
          and Generative AI are four separate, parallel fields — like four different subjects
          you could study independently. They're not.
        </p>

        <p style={S.p}>
          They're a hierarchy. Each one lives inside the one before it — like Russian nesting dolls.
          Click each ring in the diagram below to see exactly what each term means and
          where it sits in the family.
        </p>

        {/* Interactive hierarchy component */}
        <div style={{ marginBottom: 32 }}>
          <AIMLHierarchy />
        </div>

        <HighlightBox>
          <p style={{ ...S.pSmall, marginBottom: 8 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>
              The one sentence that unlocks everything:
            </span>
          </p>
          <p style={{ ...S.p, marginBottom: 0, fontSize: 15 }}>
            Every GenAI model <em>is</em> a Deep Learning model.
            Every Deep Learning model <em>is</em> an ML model.
            Every ML model <em>is</em> an AI system.
            But the reverse is not true — not every AI system uses ML,
            and not every ML model uses deep learning.
          </p>
        </HighlightBox>
      </div>

      <SectionDivider />

      {/* ══ SECTION 3 — AI ═════════════════════════════════════════════════════ */}
      <div style={S.section}>
        <span style={S.sectionTag}>Layer 1 of 4</span>
        <h2 style={S.h2}>Artificial Intelligence — the universe</h2>

        <p style={S.p}>
          Artificial Intelligence is the broadest possible description: any technique that
          allows a machine to mimic behaviour we'd normally associate with human intelligence.
          Decision-making. Understanding language. Recognising patterns. Solving problems.
        </p>

        <p style={S.p}>
          The key word is <em>any technique</em>. AI doesn't specify how the machine becomes
          intelligent. It could be through rules written by a programmer. It could be through
          learning from data. It could be through searching through millions of possibilities.
          All of these are AI. They just take different approaches.
        </p>

        <h3 style={S.h3}>The old approach: rule-based AI</h3>

        <p style={S.p}>
          For most of computing history, AI meant writing rules. A programmer would sit down
          and manually encode every possible scenario. For a spam filter, that might look like:
        </p>

        <div
          style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '16px 20px',
            marginBottom: 20,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--muted)',
            lineHeight: 1.8,
          }}
        >
          IF email contains "lottery" AND "winner" AND "click here" → SPAM<br />
          IF sender not in contacts AND subject has "!!!" → SPAM<br />
          IF email has "bank account" AND "urgent" → SPAM<br />
          ...and 10,000 more rules
        </div>

        <p style={S.p}>
          This works — until it doesn't. Spammers change their words. New patterns emerge
          that no rule anticipates. The programmer can't possibly keep up. The system is
          brittle because it only knows what the programmer explicitly told it.
        </p>

        <Callout type="info">
          Rule-based AI still exists and is still used. Traffic lights, most ATM logic,
          chess engines — many are rule-based. But for complex, changing, unpredictable
          problems? Rules aren't enough. That's where ML enters.
        </Callout>
      </div>

      <SectionDivider />

      {/* ══ SECTION 4 — ML ═════════════════════════════════════════════════════ */}
      <div style={S.section}>
        <span style={S.sectionTag}>Layer 2 of 4</span>
        <h2 style={S.h2}>Machine Learning — let the data write the rules</h2>

        <p style={S.p}>
          Machine Learning is the idea that instead of writing the rules yourself,
          you show the machine a large number of examples with the right answers,
          and it figures out the rules on its own.
        </p>

        <p style={S.p}>
          For the spam filter: instead of writing thousands of "if this, then that" conditions,
          you give the model 10 million emails already labelled as spam or not spam.
          The model finds the patterns that separate them — patterns you'd never have thought
          to write as rules, and patterns that update automatically as spammers change tactics.
        </p>

        <HighlightBox color="#378ADD">
          <p style={{ ...S.pSmall, marginBottom: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>The core shift: </span>
            in rule-based AI, the programmer writes the logic.
            In ML, the programmer provides the data and the machine writes the logic.
            You go from "here are the rules" to "here are the examples — find the rules."
          </p>
        </HighlightBox>

        <h3 style={S.h3}>Old approach vs ML approach — side by side</h3>

        {/* Comparison table */}
        <div
          style={{
            border: '1px solid var(--border)',
            borderRadius: 10,
            overflow: 'hidden',
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr 1fr',
              gap: 12,
              padding: '10px 12px',
              background: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>&nbsp;</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>RULE-BASED AI</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#378ADD', fontFamily: 'var(--font-mono)' }}>MACHINE LEARNING</div>
          </div>
          <div style={{ padding: '0 12px' }}>
            <ComparisonRow
              label="Input"
              old="Rules written by a programmer"
              ml="Labelled examples (data)"
              color="#378ADD"
            />
            <ComparisonRow
              label="Spam filter"
              old='"If email contains lottery → spam"'
              ml="Show 10M emails, learn patterns automatically"
              color="#378ADD"
            />
            <ComparisonRow
              label="Delivery time"
              old='"If distance > 5km, add 15 mins"'
              ml="Learn from 1M past orders — distance, traffic, time of day, kitchen load"
              color="#378ADD"
            />
            <ComparisonRow
              label="Adapts to new data?"
              old="No — programmer must update rules manually"
              ml="Yes — retrain with new data, model updates automatically"
              color="#378ADD"
            />
            <ComparisonRow
              label="Works best when"
              old="Problem is well-defined with clear, stable rules"
              ml="Problem is complex, data is abundant, patterns aren't obvious"
              color="#378ADD"
            />
          </div>
        </div>

        <p style={S.p}>
          Machine Learning works because real-world problems have patterns buried in their data.
          Delivery times correlate with distance, time of day, weather, and restaurant type
          in ways a human couldn't fully articulate — but that a model trained on a million
          orders can capture extremely precisely.
        </p>

        <Callout type="tip">
          When people say "we trained a model," they mean: we fed the algorithm a large
          dataset with known answers, and it adjusted its internal parameters until its
          predictions matched those answers closely. The "training" is the learning process.
          After training, the model can make predictions on data it has never seen before.
        </Callout>
      </div>

      <SectionDivider />

      {/* ══ SECTION 5 — DEEP LEARNING ══════════════════════════════════════════ */}
      <div style={S.section}>
        <span style={S.sectionTag}>Layer 3 of 4</span>
        <h2 style={S.h2}>Deep Learning — ML with a brain-inspired twist</h2>

        <p style={S.p}>
          Deep Learning is a specific type of ML. All the same rules apply — you still
          learn from data, you still find patterns automatically. What changes is the
          architecture of the model doing the learning.
        </p>

        <p style={S.p}>
          Regular ML uses algorithms like decision trees, linear regression, or random forests.
          These are powerful but they require you to tell the model <em>what features to look at</em>.
          For a delivery time model, you'd tell it: look at distance, look at time of day,
          look at restaurant rating. You're manually specifying what's relevant.
        </p>

        <p style={S.p}>
          Deep Learning uses layers of artificial neurons — inspired loosely by how your
          brain works. Each layer transforms the input, extracting increasingly abstract
          patterns. And here's the critical difference: the model figures out which features
          matter entirely by itself. You don't tell a Deep Learning model what to look for.
          You just give it raw data — raw pixels, raw audio waveforms, raw text — and it
          builds its own internal understanding from scratch.
        </p>

        <HighlightBox color="#D85A30">
          <h3 style={{ ...S.h3, marginBottom: 8, fontSize: 15 }}>
            The "deep" in Deep Learning
          </h3>
          <p style={{ ...S.pSmall, marginBottom: 0 }}>
            "Deep" refers to the number of layers in the neural network. A shallow network
            might have 2–3 layers. A deep network might have 50–1,000 layers. Each layer
            learns a different level of abstraction. For image recognition: layer 1 detects
            edges. Layer 10 detects shapes. Layer 50 detects "cat face." The depth is what
            allows the model to learn genuinely complex patterns from raw input.
          </p>
        </HighlightBox>

        <h3 style={S.h3}>Why did Deep Learning become dominant?</h3>

        <p style={S.p}>
          Three things came together around 2012 and changed everything:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              num: '01',
              title: 'Data',
              desc: 'The internet created billions of labelled examples — photos with captions, emails labelled spam, purchases with ratings. Deep Learning eats data. The more you give it, the better it gets.',
              color: '#D85A30',
            },
            {
              num: '02',
              title: 'Compute — specifically GPUs',
              desc: "Graphics cards (GPUs), originally built for video games, turned out to be perfectly suited for the matrix multiplication that deep neural networks run on. Training a model that would've taken 10 years on a CPU takes days on a GPU cluster.",
              color: '#D85A30',
            },
            {
              num: '03',
              title: 'Better algorithms',
              desc: 'New techniques — batch normalisation, dropout, residual connections — solved problems that had kept neural networks from training reliably on very deep architectures. The math caught up with the ambition.',
              color: '#D85A30',
            },
          ].map((item) => (
            <div
              key={item.num}
              style={{
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '14px 16px',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: `${item.color}15`,
                  border: `1.5px solid ${item.color}50`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                  color: item.color,
                  fontFamily: 'var(--font-mono)',
                  flexShrink: 0,
                }}
              >
                {item.num}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginBottom: 5,
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {item.title}
                </div>
                <p style={{ ...S.pSmall, marginBottom: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Callout type="warning">
          Deep Learning is not always the right tool. For structured tabular data —
          spreadsheets, databases, business metrics — classical ML algorithms like
          XGBoost often outperform deep learning while being faster to train and easier
          to explain. Deep Learning shines on unstructured data: images, audio, raw text,
          video. The rest of this track will tell you exactly when to use which.
        </Callout>
      </div>

      <SectionDivider />

      {/* ══ SECTION 6 — GENERATIVE AI ══════════════════════════════════════════ */}
      <div style={S.section}>
        <span style={S.sectionTag}>Layer 4 of 4</span>
        <h2 style={S.h2}>Generative AI — from recognising to creating</h2>

        <p style={S.p}>
          Everything we've discussed so far — spam filters, delivery time predictions,
          image recognition — is about taking an input and producing a label or a number.
          Spam or not spam. 23 minutes or 41 minutes. Cat or dog.
          These models are <em>discriminative</em>. They discriminate between possibilities.
        </p>

        <p style={S.p}>
          Generative AI is different. These models don't output a label. They output new content.
          New text that has never been written. New images that have never been photographed.
          New code for a problem you just described. They generate.
        </p>

        <HighlightBox color="#7F77DD">
          <p style={{ ...S.pSmall, marginBottom: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 700 }}>The simplest way to think about it: </span>
            all previous AI was a judge — it evaluated what already existed.
            Generative AI is a creator — it produces what doesn't yet exist.
            The shift from "is this email spam?" to "write me an email" is the shift
            from discriminative to generative.
          </p>
        </HighlightBox>

        <h3 style={S.h3}>How does a language model "generate" anything?</h3>

        <p style={S.p}>
          When you type a question to ChatGPT or Claude, the model doesn't retrieve a stored answer.
          It generates the response token by token — one word (or word-piece) at a time —
          by predicting what comes next given everything that came before.
        </p>

        <p style={S.p}>
          It learned how to do this by being trained on an enormous amount of text — most
          of the publicly available internet, books, code repositories, scientific papers.
          During training, it predicted the next word in trillions of sentences. It got
          better and better at this prediction. At sufficient scale, "good at predicting
          the next word" turns out to be indistinguishable from "able to reason, explain,
          write, and code."
        </p>

        <Callout type="info">
          A Large Language Model (LLM) — like GPT-4, Claude, or Gemini — is a Deep Learning
          model (specifically a Transformer architecture) trained on massive text data to
          predict the next token. That's the whole mechanism. The emergent capabilities —
          reasoning, coding, translation, summarisation — are not explicitly programmed.
          They arise from doing next-token prediction at scale.
        </Callout>

        <h3 style={S.h3}>Generative AI is not just text</h3>

        <p style={S.p}>
          "Generative AI" as a category includes any model that creates new content —
          not just LLMs. Midjourney and Stable Diffusion generate images using diffusion models.
          Suno generates music. Sora generates video. ElevenLabs generates voice.
          All are Generative AI. All are Deep Learning models. All are ML systems. All are AI.
        </p>
      </div>

      <SectionDivider />

      {/* ══ SECTION 7 — TIMELINE ═══════════════════════════════════════════════ */}
      <div style={S.section}>
        <span style={S.sectionTag}>How we got here</span>
        <h2 style={S.h2}>The timeline — from concept to ChatGPT</h2>
        <p style={S.p}>
          AI didn't appear overnight. Each layer of the hierarchy was built on the one before it,
          over decades. Understanding this timeline helps you understand why these things are
          related — and why the recent acceleration feels so dramatic.
        </p>

        <div style={{ marginTop: 8 }}>
          <TimelineItem
            year="1950s"
            event="AI as a field is born"
            detail='Alan Turing asks "Can machines think?" The term "Artificial Intelligence" is coined at Dartmouth in 1956. Early AI: rules, logic, symbolic reasoning. Chess programs. Expert systems. Brittle but functional.'
            color="#888888"
          />
          <TimelineItem
            year="1980s"
            event="Neural networks — first wave"
            detail="Backpropagation is formalised, making it possible to train multi-layer neural networks. Promising research — but computers were too slow and data too scarce to make it practical. The first AI winter follows."
            color="#7F77DD"
          />
          <TimelineItem
            year="2001"
            event="Machine Learning goes mainstream"
            detail="The internet creates data at scale. Random Forests, SVMs, and Gradient Boosting become industry standard. ML starts powering spam filters, product recommendations, and fraud detection at companies like Google and Amazon."
            color="#378ADD"
          />
          <TimelineItem
            year="2012"
            event="Deep Learning breakthrough — AlexNet"
            detail="A deep neural network wins the ImageNet image recognition competition by a margin that shocks the field. GPUs make training viable. The modern era of Deep Learning begins. Computer vision is transformed within 3 years."
            color="#D85A30"
          />
          <TimelineItem
            year="2017"
            event='"Attention Is All You Need" — the Transformer paper'
            detail="Google researchers publish the architecture that will power every major LLM. Self-attention replaces recurrence. Transformers can be parallelised massively. The path to GPT-3, BERT, and ChatGPT is opened."
            color="#BA7517"
          />
          <TimelineItem
            year="2022"
            event="ChatGPT — Generative AI reaches everyone"
            detail="OpenAI releases ChatGPT. 100 million users in 2 months — faster than any technology in history. Suddenly, everyone is talking about AI. The field that took 70 years to build is now in every phone, every workplace, every news story."
            color="#7F77DD"
            isLast
          />
        </div>
      </div>

      <SectionDivider />

      {/* ══ SECTION 8 — INDIAN COMPANIES ═══════════════════════════════════════ */}
      <div style={S.section}>
        <span style={S.sectionTag}>Real world — India</span>
        <h2 style={S.h2}>
          Indian companies using each layer — right now
        </h2>
        <p style={S.p}>
          These aren't hypothetical. These are real systems running in production
          at companies you use daily.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 12,
            marginBottom: 8,
          }}
        >
          <IndianCompanyCard
            company="Swiggy"
            problem="Predict delivery time before the customer places an order — with enough accuracy that the displayed ETA matches reality 90%+ of the time."
            approach="Classical ML (gradient boosting) trained on millions of past orders. Features: distance, restaurant prep time, traffic density, time of day, weather, delivery partner availability."
            type="Classical ML"
            color="#378ADD"
          />
          <IndianCompanyCard
            company="Razorpay"
            problem="Detect fraudulent transactions in real time. Hundreds of thousands of payments per minute. False positives cost customers. False negatives cost money."
            approach="Ensemble ML models (XGBoost + neural net) scoring every transaction in milliseconds. Features: amount, merchant category, user behaviour history, device fingerprint, time patterns."
            type="Classical ML + DL"
            color="#D85A30"
          />
          <IndianCompanyCard
            company="Flipkart"
            problem="Show each of 300 million users the products they're most likely to buy — from a catalogue of 150 million items."
            approach="Deep Learning recommendation system. Two-tower neural network: one tower encodes user history, one encodes product attributes. Finds nearest neighbours in embedding space to rank recommendations."
            type="Deep Learning"
            color="#D85A30"
          />
          <IndianCompanyCard
            company="Zepto"
            problem="10-minute grocery delivery requires knowing exactly what stock is in each dark store and predicting which items will run out before the next restock."
            approach="Time-series ML forecasting on demand patterns per SKU per store. XGBoost and LightGBM on lag features, day-of-week seasonality, local events, promotional calendars."
            type="Classical ML"
            color="#378ADD"
          />
          <IndianCompanyCard
            company="HDFC Bank"
            problem="Serve millions of customer queries daily — loan enquiries, balance checks, card blocking — without hiring thousands of additional support staff."
            approach="LLM-powered conversational AI fine-tuned on banking domain. RAG pipeline pulls customer account data and product documentation. Handles 70%+ of queries without human intervention."
            type="Generative AI"
            color="#7F77DD"
          />
          <IndianCompanyCard
            company="Meesho"
            problem="Catalogue 200 million products uploaded by small sellers who often provide poor-quality images and vague descriptions. Make them searchable and recommendable."
            approach="Computer vision (CNN-based) for image quality scoring and attribute extraction. NLP for description standardisation. All Deep Learning, all running at massive scale on seller uploads."
            type="Deep Learning"
            color="#D85A30"
          />
        </div>
      </div>

      <SectionDivider />

      {/* ══ SECTION 9 — WHICH TO LEARN ═════════════════════════════════════════ */}
      <div style={S.section}>
        <span style={S.sectionTag}>Your path</span>
        <h2 style={S.h2}>Which one should you learn?</h2>

        <p style={S.p}>
          The honest answer: all of them, in order, starting from the inside of the hierarchy
          and working outward. Not because you'll use every technique in every job —
          you won't. But because each layer depends on the one below it.
        </p>

        <p style={S.p}>
          You cannot understand why a Transformer works without understanding neural networks.
          You cannot understand neural networks without understanding gradient descent.
          You cannot understand gradient descent without understanding derivatives.
          The hierarchy in the diagram isn't just conceptual — it's a prerequisite chain.
        </p>

        <HighlightBox>
          <p style={{ ...S.pSmall, marginBottom: 8, fontWeight: 600, color: 'var(--text)' }}>
            This track is built in that exact order:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { num: '01–03', label: 'Math, Python, Data', note: 'The foundation. Every algorithm builds on this.' },
              { num: '04–05', label: 'Classical ML & Evaluation', note: "Where 80% of real production ML still lives. Don't skip this." },
              { num: '06',    label: 'Deep Learning',              note: 'Neural networks, CNNs, RNNs, Transformers.' },
              { num: '07–08', label: 'NLP & Computer Vision',      note: 'Deep Learning applied to text and images.' },
              { num: '09',    label: 'Generative AI',              note: 'GANs, diffusion models, LLMs, agents.' },
              { num: '10–11', label: 'MLOps & Cloud',              note: 'Ship it. Monitor it. Keep it running.' },
            ].map((item) => (
              <div
                key={item.num}
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-mono)',
                    minWidth: 36,
                    paddingTop: 1,
                  }}
                >
                  {item.num}
                </span>
                <div>
                  <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>
                    {' '}— {item.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </HighlightBox>

        <Callout type="tip">
          If you're in a hurry and just want to use LLMs and GenAI tools today,
          sections 01–05 still matter — understanding Classical ML gives you the intuition
          to know when to use AI, when not to, and why a model is failing. Skipping to
          section 09 without the foundation is like trying to write a novel before
          learning to read.
        </Callout>
      </div>

      <SectionDivider />

      {/* ══ KEY TAKEAWAYS ══════════════════════════════════════════════════════ */}
      <KeyTakeaways
        items={[
          'AI is the broad field — any technique that gives machines human-like capabilities. ML, DL, and GenAI all live inside it.',
          'Machine Learning is a subset of AI where the machine learns rules from data instead of following rules a programmer wrote.',
          'Deep Learning is a subset of ML using layered neural networks. It learns its own features from raw input — no manual feature engineering required.',
          'Generative AI is a subset of Deep Learning where the model creates new content (text, images, code) rather than classifying existing content.',
          'These are NOT parallel subjects — they are nested. Every GenAI model is a DL model. Every DL model is an ML model. Every ML model is AI.',
          'This track teaches them in prerequisite order: math → classical ML → deep learning → GenAI. Each section builds on the previous one.',
        ]}
      />

    </LearnLayout>
  )
}