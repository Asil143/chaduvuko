import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function AgentStateMemory() {
  return (
    <LearnLayout
      title="Agent State and Memory"
      description="Model agent state explicitly, manage short-term context, add long-term memory with retrieval, and avoid memory that leaks or drifts."
      section="Agentic AI & Automation — Lesson 02"
      readTime="30 min"
    >
      <Part n={1} label="Why state matters" title="A Run Needs More Than a Prompt">
        <P>
          In the previous lesson, a plain-Python loop kept an observations list while one request was running. That list was
          state: the information needed to decide what to do next. Real systems need a richer model of the current run, and
          often need to resume it after a timeout, a person&apos;s approval, or a server restart. If state is implicit in a long
          prompt or scattered through local variables, it is hard to test, save, redact, and recover.
        </P>
        <P>
          Separate three related ideas. <strong>State</strong> is the structured snapshot for one run. <strong>Short-term
          memory</strong> is context from the current conversation or task, such as recent messages and tool results.
          <strong>Long-term memory</strong> is selected information retained across runs and retrieved when relevant. They
          solve different problems and should not be stored or governed as one undifferentiated transcript.
        </P>
        <Table
          head={['Concept', 'Lifetime', 'Example']}
          rows={[
            ['Run state', 'One execution; may be checkpointed', 'Goal, current step, observations, pending approval'],
            ['Short-term context', 'Current conversation or task', 'Recent user and assistant messages, tool result summaries'],
            ['Long-term memory', 'Across conversations, under a retention policy', 'A user-approved preference or a retrieved support note'],
          ]}
        />
        <Callout type="info">
          An LLM API does not remember a previous call by itself. The application decides which state and history to send with
          each request, so memory design is also context, privacy, and cost design.
        </Callout>
      </Part>

      <Part n={2} label="State schema" title="Make the Run Explicit and Typed">
        <P>
          Give the run a small schema. Store the user goal, message history, observations, a step count, and a status. Avoid
          stuffing every field into an opaque dictionary passed around without validation. A Python dataclass gives an
          approachable starting point; a typed state schema is also useful when you later map the workflow into LangGraph.
        </P>
        <Code file="agent_state.py" code={`
from dataclasses import dataclass, field
from typing import Any, Literal

Role = Literal["user", "assistant", "tool"]

@dataclass
class Message:
    role: Role
    content: str

@dataclass
class AgentState:
    run_id: str
    user_id: str
    goal: str
    messages: list[Message] = field(default_factory=list)
    observations: list[dict[str, Any]] = field(default_factory=list)
    step_count: int = 0
    status: Literal["running", "waiting", "complete", "failed"] = "running"
`} />
        <P>
          Notice that identity is not inferred from the conversation text: <code>user_id</code> comes from authenticated
          application context. The model can help interpret <code>goal</code>; it cannot change the user identity or grant
          itself permission. Status values are explicit so callers can distinguish an answer from a waiting approval or a
          failed run.
        </P>
        <Callout type="tip">
          Store references and compact structured results when possible. A full tool response may contain sensitive fields
          or be far larger than the next decision needs.
        </Callout>
      </Part>

      <Part n={3} label="Short-term context" title="Keep Recent Messages Relevant">
        <P>
          Short-term memory commonly contains the current user request, the recent assistant turns, and concise tool
          observations. It gives the model local continuity while it works. But resending an entire conversation on every call
          increases context size and can bury the details needed for the current action. Choose a policy: retain recent turns,
          preserve essential facts separately, and summarise older context with a way to correct mistakes.
        </P>
        <Code file="context_window.py" code={`
def messages_for_model(history: list[dict[str, str]], summary: str, keep_recent: int = 6):
    recent = history[-keep_recent:]
    messages = []
    if summary:
        messages.append({"role": "system", "content": "Earlier context summary: " + summary})
    messages.extend(recent)
    return messages


history = [
    {"role": "user", "content": "My delivery is late."},
    {"role": "assistant", "content": "I can check the order."},
    {"role": "user", "content": "It is A104."},
]
print(messages_for_model(history, summary="Customer asks about delayed delivery."))
`} />
        <P>
          This helper illustrates selection, not a complete summariser: a summary should be generated or updated deliberately,
          and important identifiers should be validated against authoritative records. Do not rely on a model-generated summary
          as the only copy of a payment reference, safety instruction, or approval decision. Keep source records outside model
          context and retrieve them when needed.
        </P>
        <Table
          head={['Context item', 'Keep in prompt?', 'Better source of truth']}
          rows={[
            ['Recent conversation', 'Usually, within a chosen limit', 'Conversation store with access controls'],
            ['Order status', 'A concise current result may help', 'Order service or database'],
            ['User preference', 'Only when relevant and permitted', 'User-editable profile or consented memory store'],
            ['Approval to refund', 'Do not infer from a summary', 'Durable approval record with actor and timestamp'],
          ]}
        />
      </Part>

      <Part n={4} label="Long-term memory" title="Retrieve, Do Not Paste Everything">
        <P>
          Long-term memory lets an application bring forward selected facts across separate tasks. A vector index can retrieve
          semantically similar notes: convert a query and notes into embeddings, rank by similarity, and provide only a small,
          relevant set to the agent. A vector match is a retrieval hint, not proof that the note is correct, current, or
          authorised for this user. Filter by tenant and user before ranking, and retain an ordinary source record for facts
          that must be auditable.
        </P>
        <Code file="similarity_search.py" code={`
from math import sqrt


def cosine(a: list[float], b: list[float]) -> float:
    if len(a) != len(b) or not a:
        raise ValueError("Vectors must have the same non-zero length")
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = sqrt(sum(x * x for x in a))
    norm_b = sqrt(sum(y * y for y in b))
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


def retrieve(query_vector: list[float], notes: list[dict], user_id: str, limit: int = 3):
    owned = [note for note in notes if note["user_id"] == user_id]
    ranked = sorted(owned, key=lambda note: cosine(query_vector, note["vector"]), reverse=True)
    return ranked[:limit]


notes = [
    {"user_id": "u1", "text": "Prefers concise answers", "vector": [0.8, 0.2]},
    {"user_id": "u2", "text": "Uses a screen reader", "vector": [0.7, 0.3]},
]
print([note["text"] for note in retrieve([0.9, 0.1], notes, "u1")])
`} />
        <P>
          The tiny example uses hand-written vectors so the ranking mechanics run without an embedding service or vector
          database. In practice, the embedding model and vector storage are separate components. Apply tenant filters in the
          retrieval query itself, encrypt and restrict stored data, and include a deletion path for each memory record.
        </P>
        <Callout type="warning">
          Similarity is not authorization. Never query a shared index and hope that a prompt tells the model which customer
          results to ignore; apply ownership filters before any result is returned to the run.
        </Callout>
      </Part>

      <Part n={5} label="Memory lifecycle" title="Decide What May Be Remembered">
        <P>
          Persisting everything is rarely a good default. Decide what can be written, why it is useful, who can see it, how
          long it lasts, and how a person can correct or delete it. A preference such as &quot;show distances in kilometres&quot;
          might be useful across sessions; a one-time transaction reference probably belongs in a protected transaction
          system rather than conversational memory. Avoid inferring sensitive traits from conversation.
        </P>
        <Steps items={[
          'Select a candidate fact and its source; do not silently promote every chat message into memory.',
          'Check relevance, user consent, sensitivity, and whether an authoritative source already exists.',
          'Write a scoped record with provenance and a retention or expiry policy.',
          'Retrieve only when the current task needs it, then let the user inspect, correct, or delete it.',
        ]} />
        <P>
          A state object can also contain a pointer to a pending approval or a checkpoint identifier. Keep those operational
          records distinct from semantic memory: workflow state must survive reliably, while a vector memory is an optional
          candidate context. A retrieval miss should not prevent the agent from asking the user or using the authoritative
          service.
        </P>
      </Part>

      <Part n={6} label="Summaries and drift" title="Summarise With a Provenance Trail">
        <P>
          Summaries are lossy. They can omit a negation, blend two people&apos;s details, or preserve an assumption as if it were
          a verified fact. Keep the original source or a stable reference where appropriate, mark summaries as summaries, and
          refresh them when facts change. Use structured state for details that drive business rules; a prose summary should
          help the model orient itself, not replace the database.
        </P>
        <Code file="memory_record.py" code={`
from dataclasses import dataclass
from datetime import datetime

@dataclass
class MemoryRecord:
    owner_id: str
    text: str
    source_id: str
    created_at: datetime
    expires_at: datetime | None
    approved_by_user: bool


def may_retrieve(record: MemoryRecord, owner_id: str, now: datetime) -> bool:
    if record.owner_id != owner_id or not record.approved_by_user:
        return False
    return record.expires_at is None or now < record.expires_at
`} />
        <P>
          This policy check is illustrative and should be paired with storage-level access control and deletion handling.
          Production records often need more metadata: purpose, sensitivity classification, source, and a revocation state.
          Keep the schema as small as the product can responsibly support, and make the controls executable rather than
          relying on a prompt that says &quot;respect privacy.&quot;
        </P>
        <Callout type="example">
          In an Indian learning app, a learner&apos;s preferred explanation language could be a useful saved preference if the
          learner chooses it. Do not retain a payment UPI ID in an agent memory just because it appeared in a conversation.
        </Callout>
      </Part>

      <Part n={7} label="Production" title="Test State Transitions and Recovery">
        <P>
          State changes deserve tests just like functions. Check that a tool observation is appended once, a retry does not
          duplicate a side effect, an expired memory is not retrieved, and one user cannot access another user&apos;s notes.
          Also test what happens when a worker restarts halfway through the run. A saved state should have a versioned shape
          or a migration plan as the application evolves.
        </P>
        <Steps items={[
          'Create fixtures for an empty state, a long conversation, a tool failure, and a pending human approval.',
          'Assert which messages and observations are included in each model request.',
          'Test user and tenant isolation at the storage query boundary.',
          'Measure prompt size and retrieval relevance; inspect false matches, not only successful ones.',
        ]} />
        <P>
          Keep state transitions observable: record a run ID, transition name, timestamp, and result category. Redact personal
          data from logs, control who may inspect traces, and define a retention schedule. This lets a team diagnose drift
          without turning all customer conversations into permanent debugging data.
        </P>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Using one growing transcript as every kind of memory', cause: 'Run state, conversation context, and durable facts have different lifetimes and access rules.', fix: 'Separate typed run state, bounded short-term context, and intentionally retained memory.' },
          { mistake: 'Sending the full history on every model call', cause: 'Old turns consume context and can distract from the current task.', fix: 'Select recent messages, preserve essential structured facts, and summarise older context carefully.' },
          { mistake: 'Treating nearest vector results as verified facts', cause: 'Semantic similarity can return stale, ambiguous, or unrelated notes.', fix: 'Filter by ownership, inspect provenance, validate authoritative facts, and allow a retrieval miss.' },
          { mistake: 'Saving everything by default', cause: 'Unnecessary retention increases privacy risk and can make later answers worse.', fix: 'Define purpose, consent, retention, correction, and deletion before enabling persistent memory.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Add Safe Memory to the Support Agent">
        <Practice
          title="A stateful but scoped assistant"
          tasks={[
            'Create an AgentState instance for a delivery-support run and update its status through running and complete.',
            'Trim a conversation to a chosen number of recent turns while retaining a separate short summary.',
            'Use the cosine helper to retrieve one relevant note, then verify a different user cannot retrieve it.',
            'Add expiry and approval fields to memory records and write tests for expired and unapproved records.',
            'Document one fact that should live in an order system rather than agent memory, and explain why.',
          ]}
          hint="Use fake vectors and sample notes for the exercise. The goal is to test state boundaries and filtering, not to choose an embedding provider."
        />
      </Part>

      <KeyTakeaways items={[
        'Run state is a structured snapshot; short-term context is task history; long-term memory is selected information across runs.',
        'Keep identity and authorization from trusted application context, not model-generated conversation text.',
        'Bound short-term history and summarise carefully; summaries can lose facts and do not replace source records.',
        'Retrieve long-term memory only when relevant, with ownership filters applied before results enter model context.',
        'Set purpose, consent, provenance, retention, correction, and deletion rules for persistent memory.',
        'Test state transitions, recovery, isolation, expiry, and retrieval quality as part of the agent, not as an afterthought.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/agentic-ai/planning-and-reflection"
        label="Lesson 03 · Planning, Reflection and Error Recovery"
        text="With state and context made explicit, explore how to plan multi-step work, reflect on evidence, and recover without unbounded retries."
      />
    </LearnLayout>
  )
}
