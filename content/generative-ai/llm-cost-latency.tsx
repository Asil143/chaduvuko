import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function LlmCostLatency() {
  return (
    <LearnLayout
      title="Cost and Latency Optimisation — Caching, Batching and Routing"
      description="Cut cost and response time with prompt caching, response caching, batching, smaller-model routing, and output limits."
      section="Generative AI & LLM Engineering — Lesson 11"
      readTime="30 min"
    >
      <Part n={1} label="Measure first" title="Optimise the Slow or Expensive Step, Not a Guess">
        <P>
          Cost and latency are related but not identical. A request can be slow because of retrieval, network time, queueing,
          provider generation, or a long output. It can be expensive because of repeated context, a high-volume route, or a model
          that is more capable than the task needs. Use traces and token usage to find the biggest contributor before changing
          behavior.
        </P>
        <P>
          Measure end-to-end response time and the duration of individual operations. Report p50 for the typical request and
          p95 for a slower tail experienced by a meaningful share of users. Compare like with like: streaming time-to-first
          token is different from time-to-complete. Track input and output tokens by feature and configured model, then estimate
          spend using current provider rates outside the application code.
        </P>
        <Table
          head={['Lever', 'Can reduce', 'Trade-off to measure']}
          rows={[
            ['Prompt trimming', 'Input tokens and time', 'May remove context needed for accuracy'],
            ['Caching', 'Repeated model calls', 'Staleness, privacy, and invalidation'],
            ['Model routing', 'Cost or latency for simple tasks', 'Quality variance and routing complexity'],
            ['Batching', 'Per-request overhead at volume', 'Waiting time and weaker interactivity'],
            ['Streaming', 'Perceived wait before first text', 'Does not guarantee shorter total generation'],
          ]}
        />
        <Callout type="info">
          Establish a quality baseline first. A cheaper answer that creates more support tickets or unsafe errors is not a real
          saving.
        </Callout>
      </Part>

      <Part n={2} label="Trim context" title="Send Only the Context the Task Needs">
        <P>
          LLM APIs are generally stateless: prior turns and retrieved passages are sent again when needed. Long conversation
          history, repeated system instructions, and irrelevant retrieval results can increase input tokens and slow processing.
          Keep the task-specific instructions, recent relevant turns, and evidence needed to answer. Summaries can compress old
          conversation, but verify that they preserve constraints and important entities.
        </P>
        <Code file="context_budget.py" code={`
from collections.abc import Sequence

Message = dict[str, str]

def select_recent_messages(history: Sequence[Message], max_messages: int) -> list[Message]:
    if max_messages < 0:
        raise ValueError("max_messages must not be negative")
    # Keep whole user/assistant turns in production; this simple version shows the bound.
    return list(history[-max_messages:]) if max_messages else []

def build_prompt(system: str, question: str, retrieved: Sequence[str], limit: int) -> str:
    selected = list(retrieved[:limit])
    evidence = "\\n\\n".join(selected)
    return f"{system}\\n\\nEvidence:\\n{evidence}\\n\\nQuestion:\\n{question}"

history = [{"role": "user", "content": "Where is my order?"}]
print(select_recent_messages(history, max_messages=8))
`} />
        <P>
          This is a structural illustration, not a token counter. Character count is not token count, and truncating arbitrary
          text can cut a sentence or remove a critical policy. Prefer retrieval limits, relevance thresholds, deduplication, and
          a documented conversation window. Keep output limits appropriate for the task as well.
        </P>
        <Callout type="tip">
          If you shorten a prompt, rerun the golden evaluation set and inspect cases where retrieval evidence was borderline.
          Token reduction is a metric, not the product goal.
        </Callout>
      </Part>

      <Part n={3} label="Exact cache" title="Cache Identical Requests with Safe Keys and Expiry">
        <P>
          Exact caching returns a previous result for an equivalent request. It works best for deterministic or repeated tasks,
          such as a stable public FAQ, but only when the full cache key captures all inputs that can affect the answer. Include
          prompt version, relevant user context, model configuration, and locale where needed. Never let one user receive another
          user’s private cached result.
        </P>
        <Code file="exact_cache.py" code={`
from hashlib import sha256
import json
from typing import Protocol

class Cache(Protocol):
    def get(self, key: str) -> str | None: ...
    def set(self, key: str, value: str, ttl_seconds: int) -> None: ...

def cache_key(question: str, locale: str, prompt_revision: str) -> str:
    payload = json.dumps(
        {"question": question.strip(), "locale": locale, "prompt": prompt_revision},
        sort_keys=True,
    )
    return sha256(payload.encode("utf-8")).hexdigest()

def answer_with_cache(question: str, locale: str, prompt_revision: str,
                      cache: Cache, generate) -> str:
    key = cache_key(question, locale, prompt_revision)
    cached = cache.get(key)
    if cached is not None:
        return cached
    result = generate(question, locale)
    cache.set(key, result, ttl_seconds=300)
    return result
`} />
        <P>
          The cache interface is intentionally generic. Use an actual shared cache appropriate to your deployment and establish
          TTL, invalidation, encryption, and access controls. Add tenant or permission scope to the key for private data, or do
          not cache that class of response. A hash hides the original text from the key but does not make the cached answer
          anonymous.
        </P>
      </Part>

      <Part n={4} label="Semantic cache" title="Use Similarity Carefully for Near-Duplicate Questions">
        <P>
          A semantic cache may reuse an answer when two inputs have similar embeddings even though their text differs. It can
          help with repeated paraphrases, but a similarity score is not a proof of equivalent intent. &quot;Where is my order?&quot;
          depends on a specific order and user; &quot;How do I return an item?&quot; may depend on date and policy. Do not reuse
          personalized or time-sensitive answers solely because questions sound alike.
        </P>
        <Steps items={[
          'Define which intents are safe to reuse and which always require fresh data or generation.',
          'Scope the cache by tenant, authorization context, locale, prompt revision, and relevant knowledge version.',
          'Use a conservative similarity threshold chosen from labeled examples, not an arbitrary guess.',
          'Set a short expiry for information that can change and invalidate entries after policy updates.',
          'Measure cache hit rate and quality regressions together; provide a bypass for uncertain matches.',
        ]} />
        <Callout type="warning">
          Similarity is a retrieval signal, not authorization. A match from another account or a stale policy must never be
          served because its embedding is close.
        </Callout>
      </Part>

      <Part n={5} label="Route models" title="Match Capability to the Task">
        <P>
          Model routing sends different task classes to different configured models: a simple classification may need less
          capability than complex reasoning over retrieved evidence. Begin with a transparent rule based on task, risk, and
          measured quality. A model name belongs in environment configuration, not as a claim about a fixed price or permanent
          capability. Re-evaluate the route whenever providers or models change.
        </P>
        <Code file="model_router.py" code={`
import os
from enum import Enum

class TaskKind(str, Enum):
    CLASSIFY = "classify"
    ANSWER_WITH_EVIDENCE = "answer_with_evidence"

def configured_model(task: TaskKind) -> str:
    variable = {
        TaskKind.CLASSIFY: "LLM_MODEL_FAST",
        TaskKind.ANSWER_WITH_EVIDENCE: "LLM_MODEL_QUALITY",
    }[task]
    return os.environ[variable]

for kind in TaskKind:
    print(kind.value, configured_model(kind))
`} />
        <P>
          Avoid routing based on user identity or sensitive traits. A low-confidence route can escalate to a more capable model or
          a human review, but confidence values need validation on your data. Add a fallback policy for unavailable models and
          compare task success—not only token cost—across routes.
        </P>
      </Part>

      <Part n={6} label="Batching and streaming" title="Choose Throughput or Interactivity Deliberately">
        <P>
          Batching groups independent work to reduce per-request overhead and is useful for offline tasks such as evaluating a
          dataset or processing a backlog. It can increase the time each item waits before work begins, so it is often a poor fit
          for an interactive chat turn. Use a provider’s documented batch capabilities when applicable; exact limits and
          completion timing depend on the service.
        </P>
        <P>
          Streaming returns output chunks as they are generated. It improves perceived responsiveness and lets a user begin
          reading sooner, but total generation time may be unchanged. Design the client to handle disconnects, partial output,
          and errors; do not treat an incomplete stream as a completed answer. For safety-sensitive workflows, consider whether
          content must be validated before it is shown or acted on.
        </P>
        <Code file="latency_summary.py" code={`
from statistics import median


def percentile(values: list[float], fraction: float) -> float:
    if not values:
        raise ValueError("Need at least one observation")
    ordered = sorted(values)
    index = min(int((len(ordered) - 1) * fraction), len(ordered) - 1)
    return ordered[index]

observed_ms = [420, 510, 610, 700, 1600, 2100, 2800]
print("p50_ms", median(observed_ms))
print("p95_ms", percentile(observed_ms, 0.95))
`} />
        <P>
          This simple nearest-rank-like helper is for explaining the idea, not a substitute for your metrics system’s documented
          histogram calculation. Use consistent histogram buckets and enough observations before interpreting a tail percentile.
        </P>
        <Callout type="example">
          In a Swiggy-style delivery assistant, status lookup may be fast while a long free-form explanation is slow. Show a
          useful status quickly, stream optional detail, and instrument both phases separately.
        </Callout>
      </Part>

      <Part n={7} label="Validate gains" title="Run a Controlled Before-and-After Comparison">
        <P>
          Change one optimization at a time and replay the same representative workload. Compare cost estimates using current
          provider rates, p50 and p95 latency, cache hit rate, failure rate, and evaluation quality. Separate cold and warm cache
          results. Include realistic concurrency if queueing or rate limits are part of the production concern.
        </P>
        <Steps items={[
          'Record a baseline for tokens, end-to-end and per-span latency, errors, and quality.',
          'Choose one lever and state the expected benefit and possible quality or freshness regression.',
          'Replay a fixed golden workload and a representative traffic pattern.',
          'Compare distributions and category-level evaluation results, not just averages.',
          'Roll out gradually with a rollback path and monitor real feedback and tail latency.',
        ]} />
        <P>
          Avoid claiming a fixed monetary saving without the current model rates, usage mix, and traffic volume. Convert provider
          charges to the business’s reporting currency using the accounting assumptions used by your team; do not hard-code
          exchange rates in an example or application.
        </P>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Cost and Latency Mistakes">
        <Mistakes items={[
          { mistake: 'Optimising only average response time', cause: 'A few very slow requests can dominate the user experience.', fix: 'Track p50 and p95 by route and inspect trace spans for the tail.' },
          { mistake: 'Caching every similar-looking question', cause: 'Intent, permissions, and source data may differ.', fix: 'Scope keys carefully, set expiry, and validate semantic reuse against labeled examples.' },
          { mistake: 'Choosing the cheapest model before measuring quality', cause: 'Lower capability can increase wrong answers and expensive follow-up work.', fix: 'Route by task and compare cost, latency, and evaluation results together.' },
          { mistake: 'Truncating prompt text at an arbitrary character count', cause: 'Important evidence or constraints can be removed.', fix: 'Control history and retrieval deliberately, then rerun the regression evaluation.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Optimise a Retrieval-Based Help Feature">
        <Practice
          title="Make one measurable improvement at a time"
          tasks={[
            'Record baseline input/output tokens, p50/p95 latency, error rate, and evaluation scores for a fixed set of support questions.',
            'Implement an exact cache for a public, stable FAQ and define its prompt revision, TTL, and invalidation behavior.',
            'Design a semantic-cache policy that explicitly excludes personalized order and payment requests.',
            'Add a configurable route for a simple classification and an evidence-based answer; compare both on the same golden set.',
            'Compare streaming for perceived time-to-first-token with batching for an offline evaluation job.',
          ]}
          hint="Do not assume the optimization helped. Keep the baseline and compare quality and tail latency after each change."
        />
      </Part>

      <KeyTakeaways items={[
        'Measure tokens and end-to-end plus per-operation latency before optimizing; inspect p50 and p95.',
        'Trim irrelevant context carefully and preserve evidence needed for correctness.',
        'Exact caches need complete keys, scope, expiry, and invalidation; semantic caches need conservative validated use.',
        'Route by task and measured quality, with model identifiers supplied through configuration.',
        'Batch independent offline work for throughput; stream interactive output for earlier feedback, not necessarily lower total time.',
        'Evaluate cost, latency, errors, cache behavior, and answer quality together before rollout.',
      ]} />

      <Bullets items={[
        <span key="ref">Check current provider documentation for supported caching, batching, streaming, rate limits, and pricing before designing a production cost estimate.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/generative-ai/llm-frameworks"
        label="Lesson 12 · LLM Frameworks — LangChain and LlamaIndex: When to Use Them"
        text="You have tools to measure and optimize a feature. Next, decide whether an LLM framework helps your architecture or adds more abstraction than you need."
      />
    </LearnLayout>
  )
}
