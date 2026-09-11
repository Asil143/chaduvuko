import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { KAFKA_MODULE_BY_SLUG } from '@/data/kafka-curriculum'

const K = '#f97316'
const FONT_MONO = 'var(--font-mono)'
const FONT_DISPLAY = 'var(--font-display)'

function Chapter({ n, title, subtitle }: { n: string; title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 11, color: K, fontFamily: FONT_MONO, fontWeight: 800, margin: '0 0 8px', letterSpacing: '.12em', textTransform: 'uppercase' }}>
        Chapter {n}
      </p>
      <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', margin: '0 0 10px' }}>
        {title}
      </h2>
      {subtitle && <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75, margin: 0, maxWidth: 720 }}>{subtitle}</p>}
    </div>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.95, margin: '0 0 18px' }}>{children}</p>
}

function Divider() {
  return <div style={{ borderTop: '1px solid var(--border)', margin: '52px 0' }} />
}

function Callout({ title, tone = 'orange', children }: { title: string; tone?: 'orange' | 'blue' | 'green' | 'red'; children: React.ReactNode }) {
  const colors = {
    orange: K,
    blue: '#38bdf8',
    green: '#22c55e',
    red: '#ef4444',
  }
  const color = colors[tone]
  return (
    <div style={{ background: `${color}0d`, border: `1px solid ${color}33`, borderLeft: `4px solid ${color}`, borderRadius: '0 12px 12px 0', padding: '18px 22px', margin: '24px 0' }}>
      <p style={{ fontSize: 11, color, fontFamily: FONT_MONO, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', margin: '0 0 8px' }}>{title}</p>
      <div style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.9 }}>{children}</div>
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ display: 'grid', gap: 10, margin: '0 0 20px', paddingLeft: 0, listStyle: 'none' }}>
      {items.map(item => (
        <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14.5, color: 'var(--text)', lineHeight: 1.75 }}>
          <span style={{ color: K, fontWeight: 900, marginTop: 2 }}>✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function CodeBlock({ title, children }: { title: string; children: string }) {
  return (
    <div style={{ background: '#0d1117', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', margin: '24px 0' }}>
      <div style={{ padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: 12, color: 'var(--muted)', fontFamily: FONT_MONO }}>
        {title}
      </div>
      <pre style={{ margin: 0, padding: '18px 20px', fontSize: 13, color: '#e2e8f0', lineHeight: 1.8, overflowX: 'auto', fontFamily: FONT_MONO }}>
        {children}
      </pre>
    </div>
  )
}

function ConceptGrid({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, margin: '20px 0 28px' }}>
      {items.map((item, index) => (
        <div key={item} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
          <div style={{ fontSize: 11, color: K, fontFamily: FONT_MONO, fontWeight: 800, marginBottom: 8 }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>{item}</div>
        </div>
      ))}
    </div>
  )
}

function DeepExplain({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 34 }}>
      <h3 style={{ fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 900, color: 'var(--text)', fontFamily: FONT_DISPLAY, letterSpacing: '-0.6px', margin: '0 0 14px' }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: 'auto', margin: '22px 0 30px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header} style={{ padding: '11px 14px', textAlign: 'left', fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: K, fontFamily: FONT_MONO, borderBottom: `2px solid ${K}55`, background: `${K}0d` }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.join('|')} style={{ background: rowIndex % 2 === 0 ? 'var(--surface)' : 'var(--bg2)' }}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', color: cellIndex === 0 ? 'var(--text)' : 'var(--muted)', lineHeight: 1.65, verticalAlign: 'top', fontWeight: cellIndex === 0 ? 700 : 400 }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function NumberedFlow({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'grid', gap: 12, margin: '20px 0 30px' }}>
      {items.map((item, index) => (
        <div key={item} style={{ display: 'grid', gridTemplateColumns: '42px 1fr', gap: 14, alignItems: 'start', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${K}18`, border: `1px solid ${K}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: K, fontFamily: FONT_MONO, fontWeight: 900, fontSize: 12 }}>
            {index + 1}
          </div>
          <div style={{ fontSize: 14.5, lineHeight: 1.8, color: 'var(--text)' }}>{item}</div>
        </div>
      ))}
    </div>
  )
}

export function KafkaLesson({ slug }: { slug: string }) {
  const lesson = KAFKA_MODULE_BY_SLUG[slug]
  if (!lesson) return null

  const prev = KAFKA_MODULE_BY_SLUG[Object.values(KAFKA_MODULE_BY_SLUG).find(m => m.id === lesson.id - 1)?.slug ?? '']
  const next = KAFKA_MODULE_BY_SLUG[Object.values(KAFKA_MODULE_BY_SLUG).find(m => m.id === lesson.id + 1)?.slug ?? '']

  return (
    <LearnLayout
      title={lesson.title}
      description={lesson.description}
      section={`Apache Kafka — Module ${String(lesson.id).padStart(2, '0')}`}
      readTime={lesson.readTime}
      updatedAt="September 2026"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Apache Kafka', href: '/learn/apache-kafka' },
        { label: lesson.title, href: `/learn/apache-kafka/${lesson.slug}` },
      ]}
      prev={prev ? { title: prev.title, href: `/learn/apache-kafka/${prev.slug}` } : undefined}
      next={next ? { title: next.title, href: `/learn/apache-kafka/${next.slug}` } : undefined}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
        {lesson.tags.map(tag => (
          <span key={tag} style={{ fontSize: 11, color: 'var(--muted)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: '5px 10px', fontFamily: FONT_MONO }}>
            {tag}
          </span>
        ))}
      </div>

      <Chapter n="01" title="Plain-English Picture" subtitle="Start here even if you are not technical yet." />
      <P>{lesson.plainEnglish}</P>
      <Callout title="Everyday analogy" tone="blue">
        {lesson.analogy}
      </Callout>

      <DeepExplain title="The real problem this topic solves">
        <P>
          Kafka is easiest to learn when every concept is tied to a problem. The problem here is not
          "how do we use another tool?" The problem is how modern systems share facts without becoming
          tangled together. A checkout app, fraud detector, warehouse system, email service, analytics
          dashboard, and customer support screen may all need the same fact, but they should not all
          depend directly on one another.
        </P>
        <P>
          This lesson focuses on <strong>{lesson.title}</strong> because it is one of the pieces that makes
          that decoupled design possible. Do not memorize the vocabulary first. First understand the shape:
          an event happens, Kafka records it, and independent readers use that record when they are ready.
          Once that picture is stable, the technical details become much less intimidating.
        </P>
      </DeepExplain>

      <Divider />

      <Chapter n="02" title="The Core Ideas" subtitle="These are the words and mental model you need before the details." />
      <ConceptGrid items={lesson.coreIdeas} />

      <DeepExplain title="The vocabulary, translated">
        <Table
          headers={['Kafka word', 'Plain-English meaning', 'Why it matters']}
          rows={lesson.coreIdeas.slice(0, 5).map((idea, index) => [
            ['Fact', 'Stream', 'Storage', 'Reader', 'Reliability'][index] ?? `Concept ${index + 1}`,
            idea,
            [
              'Kafka is built around facts that already happened, not vague intentions.',
              'Streams let systems react continuously instead of waiting for a daily file.',
              'Durable storage lets consumers pause, fail, recover, and replay.',
              'Independent readers let multiple teams use the same data without changing the producer.',
              'Reliability comes from explicit design choices, not from the word Kafka alone.',
            ][index] ?? 'This concept affects how the system behaves in production.',
          ])}
        />
        <P>
          When beginners get confused, it is usually because they jump from one Kafka word to another without
          stopping to ask what job each word performs. Read the table as a system: producers create facts,
          Kafka stores those facts in an ordered structure, and consumers read them according to their own
          progress and reliability rules.
        </P>
      </DeepExplain>

      <Divider />

      <Chapter n="03" title="How It Works Step by Step" subtitle="Read this as a flow, not as isolated definitions." />
      <NumberedFlow items={lesson.walkthrough} />
      <CodeBlock title={lesson.exampleTitle}>{lesson.example}</CodeBlock>

      <DeepExplain title="What is happening behind the scenes">
        <P>
          The simple flow hides a lot of engineering. A Kafka client does not throw data into a mystery box.
          It discovers cluster metadata, chooses the right topic and partition, sends bytes to the broker
          currently responsible for that partition, waits for the configured acknowledgement, and records
          enough information for retries and error handling.
        </P>
        <P>
          On the read side, a consumer does not simply receive a push notification. Kafka consumers poll.
          That means the consumer asks for records, processes them, and decides when its progress should be
          saved. This pull-based design is one reason Kafka handles slow consumers well: the reader controls
          its own pace instead of forcing the broker to guess how much work it can accept.
        </P>
        <P>
          The important production lesson is that every arrow in the diagram has a failure mode. The producer
          can timeout. The broker can reject a write. A consumer can process a record and crash before saving
          its offset. A schema can change in a way old consumers do not understand. Kafka gives you strong
          building blocks, but you still design the safety of the full workflow.
        </P>
      </DeepExplain>

      <Callout title="Run this thought experiment" tone="green">
        Pick one event in your favorite app: a user signs up, an order is placed, a payment succeeds, or a
        support ticket is opened. Now name the producer, topic, key, consumer groups, retention need, and
        failure behavior. If you can answer those six questions, you are thinking like a Kafka designer.
      </Callout>

      <Divider />

      <Chapter n="04" title="Hands-On Mental Model" subtitle="A concrete way to reason about this topic before using a real cluster." />
      <DeepExplain title="A complete beginner-to-production walkthrough">
        <P>
          Start with the smallest version: one producer, one topic, one partition, one consumer. In that world,
          the producer writes records to the end of the log and the consumer reads them in order. This is the
          clean mental model. It is intentionally simple, and it is the model you should return to whenever
          Kafka feels too large.
        </P>
        <P>
          Then add scale: one topic can have multiple partitions. Partitions let Kafka store and read data in
          parallel, but they also change ordering rules. If two events must be processed in exact order, they
          need to land in the same partition, usually by using the same key. If they land in different
          partitions, Kafka does not promise which one a consumer will see first.
        </P>
        <P>
          Then add durability: important topics usually have multiple replicas. One broker leads a partition;
          other brokers copy it. Producer acknowledgements decide when a write is considered successful. For
          business-critical data, you normally want the producer to wait until the write is safely replicated
          enough for your risk tolerance.
        </P>
        <P>
          Finally add operations: real Kafka systems need retention policies, schema compatibility, monitoring,
          security, capacity planning, and replay procedures. The beginner idea and the advanced idea are the
          same system viewed at different zoom levels.
        </P>
      </DeepExplain>

      <Table
        headers={['Design question', 'Beginner answer', 'Production answer']}
        rows={[
          ['Where does data go?', 'Into a topic.', 'Into a carefully named topic with partitions, retention, ownership, schema rules, and access controls.'],
          ['How is order preserved?', 'Kafka stores messages in order.', 'Kafka preserves order only within a partition, so key choice determines practical ordering.'],
          ['Can messages be read again?', 'Yes, use replay.', 'Only if retention has not deleted them and the consumer offset strategy is controlled.'],
          ['What happens on failure?', 'Kafka retries or stores data.', 'Producers, brokers, consumers, schemas, and downstream systems each need explicit failure handling.'],
          ['Is Kafka exactly once?', 'Sometimes.', 'Kafka has exactly-once features inside Kafka workflows, but external systems still need idempotency and deduplication.'],
        ]}
      />

      <Divider />

      <Chapter n="05" title="Common Mistakes" subtitle="These are the traps that make Kafka feel harder than it is." />
      <Callout title="Watch for these" tone="red">
        <BulletList items={lesson.commonMistakes} />
      </Callout>

      <DeepExplain title="Why these mistakes mislead learners">
        <P>
          Most Kafka mistakes come from using a simple word too loosely. "Topic", "queue", "stream",
          "consumer", "offset", and "exactly once" sound smaller than they are. In production, each one
          represents a contract. A topic contract says what facts appear there. A key contract says what
          ordering is protected. An offset contract says what work a consumer may repeat after failure.
        </P>
        <P>
          If you remember only one rule, remember this: Kafka does not remove the need for careful system
          design. Kafka gives you a durable, scalable log. You still decide what goes into the log, who is
          allowed to read it, how duplicates are handled, how schemas evolve, and what happens when downstream
          systems are unavailable.
        </P>
      </DeepExplain>

      <Divider />

      <Chapter n="06" title="Advanced Depth" subtitle="The production nuance that matters after the basic idea clicks." />
      <BulletList items={lesson.advancedNotes} />

      <DeepExplain title="How senior engineers think about this">
        <P>
          Senior Kafka design starts with constraints, not tools. How many records per second? How large is
          each record? How long must data be retained? How many independent consumer groups need the same
          stream? Is ordering required per user, per account, per order, or globally? What data loss is
          acceptable? What duplicate rate is acceptable? What is the recovery plan if a bad deployment writes
          incorrect events for twenty minutes?
        </P>
        <P>
          Those questions decide the Kafka design. They influence topic count, partition count, key choice,
          replication factor, producer acknowledgements, schema compatibility, consumer commit strategy,
          dead-letter handling, monitoring, and cost. Kafka is powerful because it exposes these controls.
          It is dangerous when teams use the defaults without understanding which business promises the
          defaults do or do not satisfy.
        </P>
        <P>
          A mature Kafka system also has ownership. Every important topic should have an owner, a purpose,
          a schema policy, a retention policy, an access policy, and a runbook. Without ownership, Kafka
          becomes a dumping ground. With ownership, it becomes a reliable shared nervous system for the
          company.
        </P>
      </DeepExplain>

      <Callout title="Check yourself" tone="green">
        <BulletList items={lesson.checklist} />
      </Callout>

      <Divider />

      <Chapter n="07" title="Interview and Real-World Review" subtitle="Use this section to test whether the lesson actually clicked." />
      <DeepExplain title="Questions you should be able to answer out loud">
        <BulletList
          items={[
            `Explain ${lesson.title} to a non-technical product manager without using Kafka jargon.`,
            `Explain ${lesson.title} again to a backend engineer, including failure behavior.`,
            'Describe one situation where this concept prevents a real production incident.',
            'Describe one situation where misunderstanding this concept creates data loss, duplicates, lag, or broken ordering.',
            'Name the metric, log, or command you would inspect first when this part of Kafka behaves unexpectedly.',
          ]}
        />
      </DeepExplain>

      <DeepExplain title="A practical mini-project">
        <P>
          Design a small order-tracking pipeline. The checkout service emits order events. A notification
          service sends emails. A warehouse service prepares shipments. An analytics service builds a
          dashboard. For this lesson, write down the topic names, keys, consumer groups, retention settings,
          and duplicate-handling strategy you would choose.
        </P>
        <P>
          Then break your own design. What if the notification service is down for two hours? What if the
          producer sends the same order twice? What if a schema field is renamed? What if the analytics
          consumer needs to rebuild six months of history? These questions are not edge cases. They are the
          normal life of Kafka systems.
        </P>
      </DeepExplain>

      <KeyTakeaways items={lesson.takeaways} />
    </LearnLayout>
  )
}
