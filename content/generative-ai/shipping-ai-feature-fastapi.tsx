import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function ShippingAiFeatureFastapi() {
  return (
    <LearnLayout
      title="Shipping an AI Feature — FastAPI Backend and Chat UI"
      description="Wrap a RAG assistant in a FastAPI service with streaming responses, a minimal chat UI, configuration, and deployment checks."
      section="Generative AI & LLM Engineering — Lesson 14"
      readTime="40 min"
    >
      <Part n={1} label="From prototype to service" title="A Shippable Feature Has More Than a Model Call">
        <P>
          A notebook proves that one model request can work. A production feature also needs an API contract, authentication,
          request validation, timeouts, error handling, observability, rate limits, tests, and a deployment path. Keep the
          provider key on the server. The browser sends the user’s request to your application; the application authorizes it,
          calls the provider, and returns a controlled response.
        </P>
        <P>
          This lesson builds a minimal FastAPI service for a study assistant. It demonstrates a streaming endpoint using
          <code> StreamingResponse</code> and server-sent events (SSE). The snippets show service boundaries; add your chosen
          provider adapter and identity system instead of copying credentials or provider-specific assumptions into the API.
        </P>
        <Table
          head={['Layer', 'Responsibility', 'Example']}
          rows={[
            ['HTTP boundary', 'Validate request and response contract', 'Pydantic request model and status codes'],
            ['Application service', 'Apply task rules and call the model', 'Study helper with configured model'],
            ['Infrastructure', 'Secrets, rate limits, telemetry, runtime', 'Environment settings and deployment'],
            ['Client', 'Show progress and handle partial output', 'SSE reader with disconnect/error states'],
          ]}
        />
        <Callout type="info">
          Keep the API contract independent from a provider SDK. The service can then be tested with a fake model and the
          provider adapter can be changed without rewriting the route.
        </Callout>
      </Part>

      <Part n={2} label="Configuration" title="Load Secrets and Model Settings at Runtime">
        <P>
          Configuration belongs to the deployment environment, not source code. Read the API key from the provider’s expected
          environment variable and the model identifier from an application setting. A local <code>.env</code> file can help
          development if it is excluded from version control. Production secrets should come from the deployment’s secret
          manager. Validate required values at startup so a misconfigured service fails clearly rather than after a user request.
        </P>
        <Code file=".env.example" lang="bash" code={`
LLM_API_KEY=replace-locally-do-not-commit
LLM_MODEL=choose-a-current-model-from-provider-configuration
APP_ENV=development
`} />
        <Code file="settings.py" code={`
import os
from dataclasses import dataclass

@dataclass(frozen=True)
class Settings:
    llm_api_key: str
    llm_model: str
    app_env: str

    @classmethod
    def from_environment(cls) -> "Settings":
        key = os.environ.get("LLM_API_KEY", "")
        model = os.environ.get("LLM_MODEL", "")
        if not key or not model:
            raise RuntimeError("LLM_API_KEY and LLM_MODEL must be configured")
        return cls(key, model, os.environ.get("APP_ENV", "development"))
`} />
        <P>
          This settings object deliberately avoids a model name or price in code. Keep the key out of error messages, logs,
          screenshots, and client-side bundles. Use separate credentials and permissions for local development and production.
        </P>
        <Callout type="warning">
          Do not commit a populated <code>.env</code> file. If a key is exposed, revoke it with the provider and rotate dependent
          deployments; deleting it from the latest source revision is not enough.
        </Callout>
      </Part>

      <Part n={3} label="Service boundary" title="Implement the Model Call Behind a Small Interface">
        <P>
          The application service should receive already validated input and return an iterable of text chunks. This keeps the
          HTTP endpoint from knowing SDK-specific response objects. Configure an explicit timeout, apply a bounded output limit,
          and map provider errors into safe application errors. Preserve provider request IDs in protected telemetry if the SDK
          exposes them; never return secrets or raw stack traces to a client.
        </P>
        <Code file="assistant.py" code={`
from collections.abc import Iterator
from typing import Protocol

class TextGenerator(Protocol):
    def stream(self, question: str) -> Iterator[str]: ...

class Assistant:
    def __init__(self, generator: TextGenerator) -> None:
        self.generator = generator

    def answer_stream(self, question: str) -> Iterator[str]:
        clean_question = question.strip()
        if not clean_question:
            raise ValueError("Question is required")
        yield from self.generator.stream(clean_question)
`} />
        <P>
          The interface makes streaming and tests explicit. Your provider adapter should translate its current SDK stream events
          into text chunks, handle cancellation and provider errors, and expose usage metadata when available. Check the installed
          SDK’s current official streaming documentation; provider event formats are not interchangeable.
        </P>
      </Part>

      <Part n={4} label="FastAPI and SSE" title="Stream Chunks as Server-Sent Events">
        <P>
          SSE is a simple server-to-client stream over HTTP. Each event is text framed with lines and terminated by a blank line.
          A JSON event payload safely transports a text chunk. The endpoint below uses FastAPI’s <code>StreamingResponse</code>
          and sends an explicit event-stream content type. Add a final event for completion and an error event that does not
          reveal internals. Handle client disconnects so upstream generation can be cancelled where supported.
        </P>
        <Code file="main.py" code={`
import json
from collections.abc import Iterator
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from assistant import Assistant

class AskRequest(BaseModel):
    question: str = Field(min_length=1, max_length=4000)

def encode_event(event: str, payload: dict[str, str]) -> str:
    data = json.dumps(payload, ensure_ascii=False)
    return f"event: {event}\\ndata: {data}\\n\\n"

def create_app(assistant: Assistant | None = None) -> FastAPI:
    app = FastAPI()
    service = assistant or build_assistant_from_settings()

    def answer_events(question: str) -> Iterator[str]:
        try:
            for chunk in service.answer_stream(question):
                yield encode_event("token", {"text": chunk})
            yield encode_event("done", {"status": "complete"})
        except Exception:
            # Log a safe error category and correlation ID server-side.
            yield encode_event("error", {"message": "The answer could not be completed."})

    @app.post("/v1/answer/stream")
    def stream_answer(request: AskRequest) -> StreamingResponse:
        if not request.question.strip():
            raise HTTPException(status_code=422, detail="Question is required")
        return StreamingResponse(
            answer_events(request.question),
            media_type="text/event-stream",
            headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
        )

    return app

app = create_app()
`} />
        <P>
          <code>build_assistant_from_settings()</code> is the composition point for your settings and provider adapter, not a
          built-in FastAPI function. Ensure exceptions are reported to server-side telemetry and not swallowed as successful
          completions. A reverse proxy may buffer streams; configure and test its behavior in the actual deployment path.
        </P>
        <Callout type="tip">
          Streaming can improve the time until a learner sees the first words. Still show a clear interrupted state: the user
          must not mistake a partial answer for a completed or verified response.
        </Callout>
      </Part>

      <Part n={5} label="Client behavior" title="Consume Events and Treat Partial Output as Partial">
        <P>
          The browser can read a streaming response with the Fetch API and its response body reader. A production client should
          decode UTF-8 chunks incrementally, parse SSE event boundaries even when they cross network chunks, append only token
          text, and handle done, error, abort, and reconnect behavior. Do not expose the provider key in JavaScript. For a first
          prototype, use an SSE-capable client library or implement the framing parser with tests rather than splitting arbitrary
          chunks on a newline.
        </P>
        <Code file="client-flow.ts" lang="typescript" code={`
async function requestAnswer(question: string, signal: AbortSignal) {
  const response = await fetch('/v1/answer/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
    signal,
  })
  if (!response.ok || !response.body) {
    throw new Error('Unable to start the answer stream')
  }
  // Decode and parse complete SSE events incrementally in the client.
  // Append token events to the UI; mark the message complete only on done.
  // On abort or error, show that the displayed text may be partial.
  return response.body
}
`} />
        <P>
          This browser example intentionally leaves SSE parsing to a tested helper. If your application uses cookies, configure
          same-site and CSRF protections for the endpoint as appropriate. Validate origins, authenticate users, and apply
          authorization server-side even when the interface is only available after sign-in.
        </P>
      </Part>

      <Part n={6} label="Rate limits and reliability" title="Bound Usage Before It Reaches the Provider">
        <P>
          Rate limiting protects user experience, provider quotas, and spend. Limit by authenticated user or another stable
          server-side identity, and also enforce service-wide concurrency and provider budget controls. An in-memory counter is
          useful for a local demonstration but does not work consistently across multiple workers or replicas. Use a shared
          store or gateway appropriate to your deployment and define how to handle its failure.
        </P>
        <Code file="rate_limit_policy.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class LimitDecision:
    allowed: bool
    retry_after_seconds: int | None = None

class RateLimiter:
    def allow(self, identity: str, cost_units: int = 1) -> LimitDecision:
        """Use a shared, atomic store in production; do not keep per-process counters."""
        raise NotImplementedError

def authorize_request(user_id: str, limiter: RateLimiter) -> None:
    decision = limiter.allow(user_id, cost_units=1)
    if not decision.allowed:
        raise RuntimeError("Request limit reached; retry later")
`} />
        <P>
          Decide whether the limit is based on requests, tokens, or concurrent streams. Streaming connections can consume
          resources after initial response headers are sent, so a client disconnect should release the relevant capacity. Set
          provider timeouts and bound retries; retrying a request after partial output can duplicate work and confuse the client.
        </P>
        <Table
          head={['Failure mode', 'Service behavior', 'Client behavior']}
          rows={[
            ['Invalid request', 'Reject before provider call', 'Show actionable validation message'],
            ['Rate limited', 'Return a suitable limit response before streaming', 'Wait or retry according to response guidance'],
            ['Provider timeout', 'Record safe failure and stop stream', 'Mark generated text as incomplete'],
            ['Client disconnect', 'Cancel upstream work when supported', 'Allow user to retry deliberately'],
          ]}
        />
      </Part>

      <Part n={7} label="Tests and container" title="Test the Contract and Build a Minimal Image">
        <P>
          Separate deterministic tests from live provider checks. Test request validation, event framing, completion and error
          events, and the behavior of a fake generator. A small Docker image should install declared dependencies, run as a
          non-root user, and read secrets only at runtime. Pin dependencies through a reviewed lock or constraint strategy for
          reproducible builds; do not invent version numbers in a lesson.
        </P>
        <Code file="test_api.py" code={`
from fastapi.testclient import TestClient

from main import create_app

class FakeAssistant:
    def answer_stream(self, question: str):
        yield "A "
        yield "short answer."

client = TestClient(create_app(FakeAssistant()))

def test_stream_endpoint_returns_sse_events() -> None:
    response = client.post("/v1/answer/stream", json={"question": "Explain indexes"})
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/event-stream")
    assert "event: token" in response.text
    assert "event: done" in response.text

def test_empty_question_is_rejected() -> None:
    response = client.post("/v1/answer/stream", json={"question": "   "})
    assert response.status_code == 422
`} />
        <Code file="Dockerfile" lang="dockerfile" code={`
FROM python:3-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt \\
    && useradd --create-home appuser
COPY . .
USER appuser
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
`} />
        <P>
          The image is a starting point. Use a reviewed base image and deployment-specific hardening; avoid baking credentials
          into build arguments or image layers. Add health checks, resource limits, TLS at the appropriate boundary, and
          dependency scanning in your normal release process. The test creates the app with a fake assistant—never make this ordinary
          test depend on a live provider key.
        </P>
        <Callout type="example">
          A CI pipeline can run unit tests, build the image, scan dependencies, and deploy to a staging environment where a
          safe smoke test validates the streaming path before gradual production rollout.
        </Callout>

        <P>
          Before release, confirm authentication and authorization, CORS and CSRF policy, input bounds, rate limits, secrets
          storage, provider timeouts, logging redaction, and incident ownership. Trace retrieval and provider calls; monitor
          error rate, p50/p95 latency, token usage, and stream disconnects. Use an evaluation set for answer quality and keep a
          rollback plan for prompt, model configuration, and application changes.
        </P>
        <Steps items={[
          'Verify the production environment supplies the expected key and configured model without exposing either to the client.',
          'Confirm limits and authorization work across all service replicas, not only one local process.',
          'Test proxy buffering, stream cancellation, disconnect handling, and safe error events in staging.',
          'Check that ordinary logs contain correlation metadata but not raw personal prompts or credentials.',
          'Review evaluation results, deployment health, and rollback criteria with the feature owner.',
        ]} />
        <Callout type="warning">
          A minimal demo is not automatically suitable for real customer data. Complete your organization’s privacy, security,
          accessibility, and operational review before opening the feature to users.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Shipping Mistakes">
        <Mistakes items={[
          { mistake: 'Calling the provider from the browser', cause: 'A bundled provider key can be copied and abused.', fix: 'Keep provider calls and credentials server-side behind authenticated application endpoints.' },
          { mistake: 'Returning a stack trace in an SSE error event', cause: 'Internal details and sensitive values can leak to clients.', fix: 'Return a generic message and log a safe error category with a correlation ID.' },
          { mistake: 'Using a process-local rate counter in a replicated service', cause: 'Each worker maintains a different limit state.', fix: 'Use a shared atomic limiter or an appropriate gateway and define store-failure behavior.' },
          { mistake: 'Treating any stream termination as success', cause: 'The client may have received only a partial answer.', fix: 'Use explicit done/error events and make aborts visible in the UI.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Ship a Safe Streaming Study Assistant">
        <Practice
          title="A deployable API slice with a testable model boundary"
          tasks={[
            'Create the FastAPI request model and a service interface that can be supplied with a fake generator.',
            'Implement SSE token, done, and safe error events, then test event framing and input validation.',
            'Read the provider key and model setting from environment configuration and verify missing settings fail at startup.',
            'Add a rate-limit interface scoped to authenticated users and explain why the production implementation needs shared state.',
            'Build a Docker image without secrets, run the tests, and document the staging checks for proxy buffering and disconnects.',
          ]}
          hint="Keep provider-specific streaming code in its adapter. Make endpoint and service tests deterministic with a fake generator."
        />
      </Part>

      <KeyTakeaways items={[
        'A production LLM feature needs an API contract, authorization, validation, timeouts, observability, limits, tests, and deployment controls.',
        'Keep provider keys server-side and load model identifiers and secrets from runtime configuration.',
        'FastAPI StreamingResponse can serve SSE; frame events deliberately and distinguish token, done, and error states.',
        'Treat partial streams and disconnects explicitly, and configure proxies so they do not unexpectedly buffer output.',
        'Use shared rate-limiting and concurrency controls in replicated deployments; process-local counters are only demonstrations.',
        'Test the service with a fake provider, build a non-root container, and validate privacy and quality before rollout.',
      ]} />

      <Bullets items={[
        <span key="ref">Check current FastAPI, Starlette, Uvicorn, Docker, and provider SDK documentation for streaming, deployment, and security details before shipping.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/generative-ai/genai-capstone-rag-assistant"
        label="Lesson 15 · Capstone — Production RAG Assistant"
        text="Plan, build, evaluate and deploy a RAG assistant over a real document set with structured outputs, guardrails, tracing and a cost budget."
      />
    </LearnLayout>
  )
}
