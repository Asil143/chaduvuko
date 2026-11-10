import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function FunctionToolCalling() {
  return (
    <LearnLayout
      title="Function and Tool Calling"
      description="Describe tools to a model, execute the calls it requests, return results, and keep the loop safe and bounded."
      section="Generative AI & LLM Engineering — Lesson 04"
      readTime="35 min"
    >
      <Part n={1} label="Concept" title="The Model Requests; Your Program Decides">
        <P>
          A language model cannot directly inspect your order database or issue a refund. With tool calling, your application
          describes a small set of functions and their input schemas to the model. The model may return a structured request
          to call one. Your server validates that request, checks authorization and business rules, executes the function, and
          sends the result back so the model can produce a final answer.
        </P>
        <P>
          The tool is ordinary application code. A tool call is not permission to run arbitrary code, SQL, shell commands, or
          URLs supplied by a model. Design tools as narrow capabilities: look up an order belonging to the authenticated user,
          rather than &quot;query any database table&quot;; request a refund review, rather than directly transferring money.
        </P>
        <Table
          head={['Stage', 'Owner', 'Control']}
          rows={[
            ['Describe tools', 'Application', 'Expose only needed functions and validated arguments'],
            ['Choose a call', 'Model', 'Treat the choice and arguments as untrusted input'],
            ['Authorize and execute', 'Application', 'Check identity, permissions, limits and side effects'],
            ['Return result', 'Application', 'Minimize data and pass structured tool output'],
            ['Explain result', 'Model / application', 'Do not claim success until the tool confirms it'],
          ]}
        />
        <Callout type="warning">
          Tool descriptions are not a security boundary. Enforce access control in the function implementation using the
          authenticated user and trusted backend state, never by trusting a user ID supplied by the model.
        </Callout>
      </Part>

      <Part n={2} label="Define" title="Use a Narrow Tool Schema">
        <P>
          Give the model a concise name, a description of when to use the tool, and a JSON Schema for its arguments. Use
          required fields and enums to reduce ambiguity, then validate again in your code. Keep the provider-specific wrapper
          thin because tool declaration shapes differ between SDKs and model APIs.
        </P>
        <Code file="tool_schema.py" code={`
ORDER_STATUS_TOOL = {
    "type": "function",
    "function": {
        "name": "get_order_status",
        "description": "Look up status for an order owned by the signed-in customer.",
        "parameters": {
            "type": "object",
            "properties": {
                "order_reference": {
                    "type": "string",
                    "description": "Customer-visible order reference",
                }
            },
            "required": ["order_reference"],
            "additionalProperties": False,
        },
    },
}
`} />
        <P>
          This example illustrates a common schema shape, not a promise that every provider accepts the same envelope. Read the
          selected provider&apos;s current tool-calling documentation and adapt the declaration at the provider boundary. Never
          place API keys, privileged database credentials, or unrestricted capabilities inside a tool definition.
        </P>
        <Callout type="tip">
          Tool descriptions should say what the tool can do and what it cannot do. A name like <code>get_order_status</code>
          is safer and easier to audit than a vague <code>do_action</code>.
        </Callout>
      </Part>

      <Part n={3} label="Loop" title="Call, Execute, Return, Continue">
        <P>
          A tool interaction is a loop. The first model response may contain one or more tool calls instead of a user-facing
          answer. Execute only registered functions, pass parsed arguments through validation, attach each result to the matching
          call ID in the provider&apos;s documented format, and ask the model to continue. Bound the number of rounds and total
          time; otherwise a faulty or adversarial request could keep the workflow running indefinitely.
        </P>
        <Code file="tool_loop.py" code={`
import json
from pydantic import BaseModel, ConfigDict, Field

class OrderLookup(BaseModel):
    model_config = ConfigDict(extra="forbid")
    order_reference: str = Field(min_length=1, max_length=40)


def execute_order_status(raw_arguments: str, *, user_id: str) -> dict:
    args = OrderLookup.model_validate_json(raw_arguments)
    # The repository function must enforce ownership using user_id.
    return order_service.status_for_customer(
        user_id=user_id,
        order_reference=args.order_reference,
    )


def run_assistant(messages, *, user_id: str, client, model: str):
    tools = [ORDER_STATUS_TOOL]
    for _round in range(3):
        response = provider_adapter.complete(
            client=client, model=model, messages=messages, tools=tools,
        )
        if not response.tool_calls:
            return response.text

        messages.append(response.as_assistant_message())
        for call in response.tool_calls:
            if call.name != "get_order_status":
                raise ValueError("unregistered tool")
            result = execute_order_status(call.arguments, user_id=user_id)
            messages.append(provider_adapter.tool_result(call.id, json.dumps(result)))
    raise RuntimeError("tool round limit reached")
`} />
        <P>
          <code>provider_adapter</code> and <code>order_service</code> mark integration boundaries: implement them using the
          installed SDK and your authenticated application services. This keeps the control flow readable without inventing
          SDK method names. Convert tool results to a minimal, well-defined schema; do not return full database rows.
        </P>
        <Steps items={[
          'Send the user request, tool declarations and conversation to the configured model.',
          'If the model requests a tool, check the tool name against an allowlist.',
          'Parse and validate arguments; authorize each action from trusted identity and backend data.',
          'Execute with timeouts, limits and idempotency where a side effect is possible.',
          'Return the result attached to the matching call, then ask for a final response within the round limit.',
        ]} />
      </Part>

      <Part n={4} label="Parallelism" title="Run Independent Calls Concurrently">
        <P>
          Some responses ask for multiple independent reads, such as delivery status and estimated arrival. Parallel execution
          can lower wait time, but only when calls do not depend on one another and the provider supports that interaction.
          Validate and authorize every call independently. Bound the worker count and per-call timeout, and preserve the call
          ID so each result is attached to the correct request even if completion order differs.
        </P>
        <Code file="parallel_reads.py" code={`
from concurrent.futures import ThreadPoolExecutor, as_completed

MAX_PARALLEL_TOOLS = 3


def run_parallel(read_calls, *, user_id: str):
    if len(read_calls) > MAX_PARALLEL_TOOLS:
        raise ValueError("too many tool calls")

    results = {}
    with ThreadPoolExecutor(max_workers=MAX_PARALLEL_TOOLS) as pool:
        futures = {
            pool.submit(
                dispatch_validated_read,
                call.name,
                call.arguments,
                user_id=user_id,
            ): call.id
            for call in read_calls
        }
        for future in as_completed(futures, timeout=10):
            call_id = futures[future]
            results[call_id] = future.result()
    return results
`} />
        <P>
          The dispatcher must validate each allowed tool and enforce customer ownership. This example is for read-only work;
          parallel writes can create race conditions, duplicate charges, or inconsistent state. Serialize dependent operations
          and use idempotency keys and explicit confirmation for important side effects.
        </P>
        <Callout type="info">
          A model can request a call more than once. Deduplicate or make operations idempotent when repeating a request could
          change state or incur a charge.
        </Callout>
      </Part>

      <Part n={5} label="Safety" title="Treat Tools as Least-Privilege Capabilities">
        <P>
          Every tool expands what a prompt can influence. Keep the tool inventory small, scope each function to a tenant and
          user, validate input lengths and formats, and apply business limits independently of model instructions. Treat
          retrieved documents and tool output as untrusted content: they can contain misleading instructions. Do not allow
          arbitrary URL fetching, shell execution, dynamic imports, or unrestricted SQL just because the model asks.
        </P>
        <Table
          head={['Risk', 'Safer pattern']}
          rows={[
            ['Cross-user data access', 'Derive identity from authenticated session and enforce ownership in the service'],
            ['Unapproved side effect', 'Require confirmation or human approval before money, account or order changes'],
            ['Repeated execution', 'Use idempotency controls and record operation outcomes'],
            ['Prompt-injected tool request', 'Allowlist tools, validate arguments and enforce policy outside the model'],
            ['Sensitive tool output', 'Return only fields required for the next step; redact logs'],
          ]}
        />
        <Code file="confirmation_gate.py" code={`
def request_refund(order_id: str, amount_minor: int, *, user_id: str) -> dict:
    order = order_service.get_owned_order(user_id=user_id, order_id=order_id)
    if amount_minor <= 0 or amount_minor > order.refundable_amount_minor:
        raise ValueError("refund amount is outside policy")
    return approval_queue.create(
        requested_by=user_id,
        order_id=order.id,
        amount_minor=amount_minor,
        status="awaiting_human_approval",
    )
`} />
        <P>
          A tool request that returns an approval record is intentionally different from issuing a refund. The trusted system
          owns the state transition, and a human or existing policy service can approve it. Keep the model&apos;s conversational
          description separate from evidence that the operation actually completed.
        </P>
        <Callout type="warning">
          Never interpret model-generated text such as &quot;I verified the customer&quot; as authentication. Identity and
          permission checks belong in the application layer on every tool invocation.
        </Callout>
      </Part>

      <Part n={6} label="Operate" title="Bound the Loop and Make Failures Recoverable">
        <P>
          Use explicit limits for rounds, calls per turn, concurrent work, argument size, response size, and wall-clock time.
          Distinguish invalid arguments, authorization failures, missing records, rate limits, and transient dependency errors.
          Return a safe, concise tool error to the model when it can recover; keep internal exception details and secrets out
          of model context and user responses.
        </P>
        <P>
          Record which tool was requested, whether it passed validation, its latency, and outcome category. Avoid raw prompts,
          full arguments, or full tool results in routine logs because they may include personal data. Add correlation IDs so a
          support engineer can trace the model request to a service call without over-collecting content.
        </P>
        <Code file="safe_tool_result.py" code={`
def public_tool_result(operation):
    try:
        value = operation()
        return {"ok": True, "result": value}
    except RecordNotFound:
        return {"ok": False, "error": "record_not_found"}
    except PermissionDenied:
        return {"ok": False, "error": "not_authorized"}
    except DependencyUnavailable:
        return {"ok": False, "error": "temporarily_unavailable"}
`} />
        <P>
          Map concrete exceptions from your own services at this boundary. Do not catch every exception and pretend it is a
          normal result; unexpected failures need monitoring and safe escalation.
        </P>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Tool-Calling Mistakes">
        <Mistakes items={[
          { mistake: 'Execute the model’s arguments without validation', cause: 'The model can return malformed, oversized or malicious values.', fix: 'Parse against a strict schema, validate again in the function and enforce limits.' },
          { mistake: 'Trust a user identifier in tool arguments', cause: 'A prompt can ask the model to act on another person’s account.', fix: 'Pass authenticated identity out-of-band and enforce ownership in the backend service.' },
          { mistake: 'Expose a general-purpose SQL or shell tool', cause: 'A broad capability can turn prompt manipulation into arbitrary access or side effects.', fix: 'Expose narrow allowlisted operations with least privilege.' },
          { mistake: 'Let tool calls loop without a budget', cause: 'Repeated calls increase latency, spend and the chance of runaway behaviour.', fix: 'Bound rounds, tool count, concurrency, timeouts and output size.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Build a Read-Only Order Assistant">
        <Practice
          title="Implement one narrow capability and test its boundaries"
          tasks={[
            'Define a tool schema that accepts only a customer-visible order reference and has no extra properties.',
            'Write a Pydantic argument model that rejects empty and oversized references.',
            'Implement a stub order service that checks authenticated ownership; test a known order, missing order and another customer’s order.',
            'Sketch the model call → tool request → service execution → tool result → final response sequence using your chosen provider’s documented format.',
            'Add a maximum round count, request timeout and a safe error mapping; verify unexpected exceptions are not hidden.',
            'Design a separate approval path for refunds and explain why it should not share the read-only status tool.',
          ]}
          hint="Begin with one read-only tool. Keep provider SDK details in an adapter and test authorization without a model call."
        />
      </Part>

      <KeyTakeaways items={[
        'The model proposes a tool call; the application validates, authorizes and executes it.',
        'Use provider-documented tool schemas, then validate arguments locally against strict types and limits.',
        'Derive identity from trusted authentication and enforce ownership inside each backend operation.',
        'Parallelize only independent calls, preserve call IDs, and bound concurrency and time.',
        'Protect side effects with confirmation, idempotency and business policy outside the model.',
        'Bound tool loops and log outcomes carefully without collecting unnecessary sensitive content.',
      ]} />
      <H3>Next</H3>
      <NextLesson
        href="/learn/generative-ai/multimodal-apis"
        label="Lesson 05 · Multimodal APIs — Vision, Audio and Speech"
        text="Send images and documents to vision-capable models, transcribe and generate speech, and design features that combine text, images and audio."
      />
    </LearnLayout>
  )
}
