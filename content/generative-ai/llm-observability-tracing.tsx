import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function LlmObservabilityTracing() {
  return (
    <LearnLayout
      title="Observability and Tracing for LLM Apps"
      description="Trace every model call, retrieval, and tool call with OpenTelemetry-style spans; track cost, latency, and quality in production."
      section="Generative AI & LLM Engineering — Lesson 10"
      readTime="30 min"
    >
      <Part n={1} label="Why observability" title="Answer the Question: What Happened to This Request?">
        <P>
          When an AI response is slow, incorrect, or unexpectedly expensive, the browser may show only one request and one
          error. The actual work can include authentication, retrieval, reranking, a model call, and one or more tool calls.
          Observability connects those steps so an engineer can follow a request from its entry point to its final response.
        </P>
        <P>
          A trace is the record of one end-to-end operation. It contains spans: timed units of work with a parent-child
          relationship. A span might represent a request, a vector search, an LLM call, or a tool execution. Attributes such as
          model configuration, status, token counts, and request identifiers help you investigate without needing to log the
          full prompt or answer.
        </P>
        <Table
          head={['Signal', 'What it tells you', 'LLM example']}
          rows={[
            ['Trace', 'How operations relate across a request', 'API request → retrieval → model → response'],
            ['Span', 'Duration and outcome of one operation', 'Search took longer than the generation call'],
            ['Metric', 'Aggregated behavior over time', 'p95 latency or requests with provider errors'],
            ['Log / event', 'A discrete fact tied to a request', 'Provider timeout with a correlation ID'],
          ]}
        />
        <Callout type="info">
          OpenTelemetry provides vendor-neutral concepts and interfaces for traces, metrics, and logs. A tracing backend stores,
          searches, and visualizes the data. Instrument once around meaningful operations, then choose a compatible backend.
        </Callout>
      </Part>

      <Part n={2} label="Trace structure" title="Give Every Request a Trace and Useful Spans">
        <P>
          Start a trace at the application boundary and propagate its context through internal calls. Give spans names that
          describe the operation rather than user content: <code>retrieval.search</code> or <code>llm.generate</code>. Record
          start time, end time, status, and a small set of bounded attributes. The parent-child structure exposes where total
          time was spent and which dependency failed.
        </P>
        <Steps items={[
          'Create or propagate a request correlation ID at the API boundary.',
          'Create child spans for retrieval, reranking, model calls, and tools.',
          'Attach safe attributes such as deployment environment, operation, and result status.',
          'Record durations and token usage when returned by the provider.',
          'Set an error status and preserve a safe error category when a step fails.',
        ]} />
        <Code file="trace_core.py" code={`
from contextlib import contextmanager
from dataclasses import dataclass, field
from time import perf_counter
from typing import Iterator

@dataclass
class Span:
    name: str
    attributes: dict[str, str | int | float] = field(default_factory=dict)
    started_at: float = field(default_factory=perf_counter)
    error_type: str | None = None

    def set_attribute(self, key: str, value: str | int | float) -> None:
        self.attributes[key] = value

@contextmanager
def span(name: str) -> Iterator[Span]:
    current = Span(name=name)
    try:
        yield current
    except Exception as error:
        current.error_type = type(error).__name__
        raise
    finally:
        elapsed_ms = (perf_counter() - current.started_at) * 1000
        print({"span": current.name, "duration_ms": round(elapsed_ms, 1),
               "error_type": current.error_type, "attributes": current.attributes})

with span("rag.answer") as request_span:
    with span("retrieval.search") as retrieval_span:
        retrieval_span.set_attribute("retrieval.top_k", 4)
    with span("llm.generate") as model_span:
        model_span.set_attribute("llm.provider", "configured-provider")
`} />
        <P>
          This standard-library example prints one span at a time; it is an observability concept, not a production tracing
          exporter. In an instrumented service, use OpenTelemetry APIs and an exporter supported by your chosen collector or
          backend so context and parent relationships are propagated automatically.
        </P>
      </Part>

      <Part n={3} label="Model-call spans" title="Record Usage and Latency Without Recording Everything">
        <P>
          Model-call spans are especially useful because generation time, token use, provider outcome, and configured model
          affect both experience and cost. Read the model name from configuration; do not bake a particular model version into
          instrumentation. Capture provider request IDs where available so an operations team can correlate an incident with a
          provider support request.
        </P>
        <Code file="instrumented_call.py" code={`
import os
from time import perf_counter
from openai import OpenAI

client = OpenAI(timeout=30.0)

def answer(question: str) -> tuple[str, dict[str, int | float | str]]:
    started = perf_counter()
    model = os.environ["LLM_MODEL"]
    try:
        response = client.responses.create(
            model=model,
            instructions="Answer briefly using the supplied application context.",
            input=question,
            max_output_tokens=300,
        )
        usage = response.usage
        attributes = {
            "llm.model_config": model,
            "llm.input_tokens": usage.input_tokens,
            "llm.output_tokens": usage.output_tokens,
            "llm.duration_ms": round((perf_counter() - started) * 1000, 1),
        }
        return response.output_text, attributes
    except Exception as error:
        # Production code should map known provider failures to safe categories.
        raise RuntimeError("Model operation failed") from error
`} />
        <P>
          Integrate those attributes with the active span rather than printing them in a real service. The example uses a
          familiar SDK response shape, but exact fields may vary by SDK version; follow the installed SDK’s current official
          documentation. Avoid catching every exception and converting it into success: record a safe failure status and let the
          API return an intentional error response.
        </P>
        <Callout type="warning">
          Prompts, completions, retrieved passages, and user identifiers can contain sensitive data. Disable content capture by
          default or apply a reviewed redaction and access policy before storing any content in a tracing product.
        </Callout>
      </Part>

      <Part n={4} label="Metrics" title="Use Metrics to See Patterns, Not Just Individual Requests">
        <P>
          A trace is excellent for debugging one request. Metrics help answer whether a service is getting worse across many
          requests. Track request volume, errors by safe category, provider timeouts, tokens, and end-to-end latency. Percentiles
          such as p50 and p95 show typical and tail experience better than a single mean that can hide slow requests.
        </P>
        <Table
          head={['Metric', 'Useful view', 'Question']}
          rows={[
            ['Request duration', 'p50, p95, and trend by route', 'Are users waiting longer?'],
            ['Model failures', 'Rate by provider and safe error class', 'Is a dependency unavailable or throttling?'],
            ['Token usage', 'Input/output distribution by feature', 'Did a prompt or history grow unexpectedly?'],
            ['Quality signal', 'Eval score, feedback, or escalation rate', 'Did a release change answer usefulness?'],
            ['Trace sampling', 'Representative traces by route/status', 'Can an engineer inspect the slow path?'],
          ]}
        />
        <P>
          Use consistent units and bounded dimensions. Route, deployment, provider, and outcome categories are usually more useful
          than raw user IDs, full prompts, or arbitrary query text. Unbounded metric labels can overwhelm a metrics system and
          create a privacy risk.
        </P>
      </Part>

      <Part n={5} label="OpenTelemetry" title="Understand the Concepts Before Choosing a Backend">
        <P>
          OpenTelemetry instrumentation creates telemetry signals and exports them to a collector or backend. A collector can
          receive, process, and route data; a backend stores and presents traces, metrics, and logs. This separation helps avoid
          coupling application code to one observability vendor. Configure sampling, redaction, and export credentials as part
          of the service deployment.
        </P>
        <P>
          LLM-focused products such as Langfuse and LangSmith provide workflows for inspecting model calls, prompt versions,
          evaluations, and traces. Their capabilities and interfaces change, so compare current documentation before selecting
          one. Treat any vendor as a data processor: review what is captured, where it is stored, who can access it, and how long
          it is retained.
        </P>
        <Callout type="tip">
          Keep the application’s tracing boundary small and vendor-neutral. Add backend-specific dashboards and evaluations
          without scattering vendor-specific calls across every business function.
        </Callout>
      </Part>

      <Part n={6} label="Redaction and sampling" title="Make Telemetry Useful Without Making It a Data Leak">
        <P>
          Observability needs enough detail to diagnose behavior, but raw content may include personal, financial, or confidential
          information. Prefer a request ID, operation name, token counts, latency, status, and a small category over complete
          input/output capture. If content is necessary for debugging, use a limited, approved sampling path with redaction,
          access restrictions, and a retention schedule.
        </P>
        <Code file="safe_event.py" code={`
from dataclasses import dataclass
from time import perf_counter

@dataclass
class CallSummary:
    request_id: str
    operation: str
    model_setting: str
    input_tokens: int
    output_tokens: int
    duration_ms: float
    outcome: str

def summarize(request_id: str, operation: str, model_setting: str,
              input_tokens: int, output_tokens: int,
              started: float, outcome: str) -> CallSummary:
    # Deliberately omit prompt, completion, email, phone, and account data.
    return CallSummary(
        request_id=request_id,
        operation=operation,
        model_setting=model_setting,
        input_tokens=input_tokens,
        output_tokens=output_tokens,
        duration_ms=round((perf_counter() - started) * 1000, 1),
        outcome=outcome,
    )

started = perf_counter()
summary = summarize("req-123", "support-answer", "configured-model", 90, 42, started, "ok")
print(summary)
`} />
        <P>
          Sampling can control volume, but do not sample away all errors. Consider retaining error traces more often and sampling
          healthy traces at a lower rate, subject to your privacy policy. Verify that debug modes cannot be enabled by an
          untrusted browser parameter or left on after an incident.
        </P>
      </Part>

      <Part n={7} label="Operational workflow" title="Turn Traces into a Debugging Habit">
        <P>
          When someone reports a bad answer, begin with a correlation ID and trace the request path. Check which context was
          retrieved, whether tool calls succeeded, how long the model call took, and whether the response passed validation.
          Compare the trace with an evaluation case or known-good request. Keep incident notes focused on the cause and the
          preventive test, not copied personal content.
        </P>
        <Steps items={[
          'Locate the trace by request ID or a privacy-safe time and route filter.',
          'Find the slowest or failed span and inspect its status and safe attributes.',
          'Separate retrieval, provider, application, and rendering failures.',
          'Check token and latency trends against a known baseline and recent deployment.',
          'Add a regression test or alert for the failure mode, then close the incident with data-retention rules intact.',
        ]} />
        <P>
          Alert on symptoms a team can act on, such as sustained error rate or tail latency, not every single unusual output.
          Pair operational monitoring with quality evaluation and user feedback: a fast, successful HTTP request can still
          contain a wrong answer.
        </P>
        <Callout type="example">
          If an assistant’s p95 response time rises after a release, a trace can show whether retrieval, provider generation, or
          an added validation step accounts for the change. The fix depends on the span, not on guessing from the final page.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Observability Mistakes">
        <Mistakes items={[
          { mistake: 'Logging every prompt and completion by default', cause: 'Content may contain personal or confidential data.', fix: 'Capture minimal metadata; make content capture a reviewed, restricted exception.' },
          { mistake: 'Recording a single end-to-end duration only', cause: 'The trace cannot show which dependency caused the delay.', fix: 'Create spans around retrieval, model calls, tools, and validation.' },
          { mistake: 'Using user text as metric labels', cause: 'Labels become unbounded and can expose sensitive information.', fix: 'Use low-cardinality categories and keep content out of metric dimensions.' },
          { mistake: 'Assuming an HTTP 200 means a useful answer', cause: 'Transport success does not measure factuality or policy compliance.', fix: 'Connect traces to evaluations, feedback, and human escalation signals.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Instrument a Small Retrieval Assistant">
        <Practice
          title="Trace the path while protecting user content"
          tasks={[
            'Add a request correlation ID and spans for retrieval, generation, and output validation in a local prototype.',
            'Record duration, token counts, operation, configured model setting, and safe outcome status for each model call.',
            'Write down which fields are sensitive and ensure prompt and completion text are absent from ordinary logs.',
            'Create a dashboard specification for request volume, errors, p50/p95 latency, and token usage by feature.',
            'Simulate a provider timeout and use the trace to identify the failed span and safe user-facing fallback.',
          ]}
          hint="Start with the trace tree and attributes you need to debug one request. Exporter and dashboard choices can follow."
        />
      </Part>

      <KeyTakeaways items={[
        'A trace connects a request; spans represent timed child operations such as retrieval, model generation, and tools.',
        'OpenTelemetry offers vendor-neutral concepts for traces, metrics, and logs, while a backend stores and displays them.',
        'Capture latency, token usage, outcome, and safe correlation metadata to investigate production behavior.',
        'Use p50 and p95 latency, error rates, and quality signals to see patterns across requests.',
        'Treat prompts and completions as potentially sensitive; minimise, redact, restrict, and retain telemetry deliberately.',
        'A successful request is not necessarily a good answer—combine operational traces with evaluation and user feedback.',
      ]} />

      <Bullets items={[
        <span key="ref">Consult OpenTelemetry documentation and the current Langfuse or LangSmith documentation for their supported integrations, data handling, and configuration options.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/generative-ai/llm-cost-latency"
        label="Lesson 11 · Cost and Latency Optimisation — Caching, Batching and Routing"
        text="You can now see where time and tokens go. Next, use that evidence to reduce cost and improve response speed without sacrificing quality."
      />
    </LearnLayout>
  )
}
