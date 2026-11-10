import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function WhatIsAnAiAgent() {
  return (
    <LearnLayout
      title="What Is an AI Agent? The Plan–Act–Observe Loop"
      description="Workflows versus agents, the reasoning-and-acting loop, when an agent is the wrong tool, and building a minimal agent from scratch."
      section="Agentic AI & Automation — Lesson 01"
      readTime="30 min"
    >
      <Part n={1} label="Mental model" title="An Agent Chooses What Happens Next">
        <P>
          A chatbot answers a message. An agent is a system that pursues a goal through a sequence of decisions and actions.
          It observes information, chooses an action, calls a tool or asks for more information, observes the result, and
          decides what to do next. The model may help choose an action, but the application owns the tools, permissions,
          state, and stopping rules.
        </P>
        <P>
          Think of a delivery-support assistant asked, &quot;Where is my order?&quot; It might look up the order, inspect the
          latest status, then explain the result. The model should not invent a delivery status: an order tool supplies the
          source of truth. If the customer asks for a refund, the system may need an approval step rather than an automatic
          action.
        </P>
        <Table
          head={['System', 'Who chooses the next step?', 'Good fit']}
          rows={[
            ['Fixed workflow', 'Your code follows a predetermined sequence', 'Form validation, invoice generation, known support scripts'],
            ['Agent', 'A model selects among a bounded set of allowed actions', 'Requests that need flexible tool selection or iterative search'],
            ['Unbounded automation', 'The model can keep acting without explicit limits', 'Not a safe production design'],
          ]}
        />
        <Callout type="info">
          An agent is not &quot;an LLM with a prompt.&quot; It is a controlled software system around a model: tools, state,
          limits, error handling, and evaluation are part of the design.
        </Callout>
      </Part>

      <Part n={2} label="Prerequisites" title="Tool Calling Is the Bridge from Text to Action">
        <P>
          This lesson assumes you know how an LLM requests a tool and how your application validates and executes that request.
          If you have not built that yet, complete <a href="/learn/generative-ai/function-tool-calling">Function and Tool Calling</a>
          first. An agent loop repeats that familiar hand-off: provide context and available tools, receive a proposed action,
          validate it, execute it, and send the result back into the next model turn.
        </P>
        <P>
          A model response is untrusted input even when it follows a schema. Validate names and arguments, check the current
          user&apos;s authorization, and return a narrow result. Never treat model-generated text as Python code or let a model
          invent a URL, SQL query, or tool name that your program executes directly.
        </P>
        <Steps items={[
          'Observe the user request and the current application state.',
          'Think: select a permitted action, ask a clarifying question, or finish.',
          'Act through one validated tool call, then record its result.',
          'Observe the result and continue only while a stop condition has not been met.',
        ]} />
        <Callout type="tip">
          We will first use a small deterministic policy as the &quot;think&quot; step. It makes the control flow runnable without
          provider credentials. In a real app, a tool-calling LLM proposes the same structured action; the rest of the loop
          still belongs to your code.
        </Callout>
      </Part>

      <Part n={3} label="The loop" title="Observe, Think, Act — Then Observe Again">
        <P>
          Keep the model-facing decision separate from tool execution. A useful decision has an action name and structured
          arguments, or a final answer. The program checks that decision against an allowlist before executing anything. This
          separation lets you test the policy, swap model providers, and apply authorization in one predictable place.
        </P>
        <Code file="agent_loop.py" code={`
from typing import Any


def lookup_order(order_id: str) -> dict[str, str]:
    orders = {"A104": "Out for delivery", "A105": "Delivered"}
    status = orders.get(order_id)
    if status is None:
        return {"error": "Order not found"}
    return {"order_id": order_id, "status": status}


def think(request: str, observations: list[dict[str, Any]]) -> dict[str, Any]:
    if observations:
        result = observations[-1]["result"]
        return {"type": "final", "text": f"Order status: {result.get('status', result.get('error'))}"}
    order_id = request.rsplit(" ", 1)[-1].strip("?.! ")
    return {"type": "tool", "name": "lookup_order", "args": {"order_id": order_id}}


def run_agent(request: str, max_steps: int = 4) -> str:
    observations: list[dict[str, Any]] = []
    tools = {"lookup_order": lookup_order}
    for _ in range(max_steps):
        decision = think(request, observations)
        if decision["type"] == "final":
            return decision["text"]
        name = decision.get("name")
        if name not in tools:
            raise ValueError("Tool is not allowed")
        result = tools[name](**decision["args"])
        observations.append({"tool": name, "result": result})
    raise RuntimeError("Agent reached its step limit")


print(run_agent("Check order A104"))
`} />
        <P>
          Run it with <code>python agent_loop.py</code>. The first decision requests <code>lookup_order</code>; the program
          executes that function, adds its result to observations, and calls the decision function again. The second decision
          returns a final answer. The loop is deliberately tiny, but its boundaries are the same ones a model-driven loop needs.
        </P>
      </Part>

      <Part n={4} label="Tools" title="Treat Actions as Typed, Narrow Capabilities">
        <P>
          A tool should do one job and accept only the fields needed for that job. For example, a read-only order lookup should
          take an order identifier, not arbitrary SQL or a complete database connection. The tool layer must still check that
          the signed-in customer owns that order; hiding records in a prompt is not authorization.
        </P>
        <Code file="tool_boundary.py" code={`
from typing import Any


def execute_tool(
    name: str,
    args: dict[str, Any],
    user_id: str,
    tools: dict[str, Any],
) -> dict[str, Any]:
    if name not in tools:
        return {"ok": False, "error": "Unknown tool"}
    if set(args) != {"order_id"}:
        return {"ok": False, "error": "Invalid arguments"}

    order_id = args["order_id"]
    if not isinstance(order_id, str) or not order_id:
        return {"ok": False, "error": "Invalid order identifier"}

    # The real database query must include both order_id and user_id.
    result = tools[name](order_id=order_id, user_id=user_id)
    return {"ok": True, "result": result}


def lookup_order(order_id: str, user_id: str) -> dict[str, str]:
    return {"order_id": order_id, "status": "Out for delivery"}
`} />
        <P>
          In a real application, the lookup function would scope its query by <code>user_id</code> as shown in the comment.
          Validate types and expected keys before the call, then normalise errors into a result the next model turn can
          understand. Do not expose secrets, full database rows, or internal exception details in tool results.
        </P>
        <Callout type="warning">
          Model choice is not permission. Check identity and authorization in server-side tool code immediately before each
          sensitive operation, and require a human for consequential or irreversible actions.
        </Callout>
      </Part>

      <Part n={5} label="Stopping" title="Bound the Loop Before Connecting a Model">
        <P>
          Agents can repeat a tool call, misread a result, or keep asking for work. A production loop needs several exits:
          a clear final-answer signal, a maximum number of steps, a request deadline, per-tool timeouts, and a graceful path
          for failures. A step cap is a circuit breaker, not proof that the task is complete. If the cap is reached, tell the
          user the task stopped and preserve enough trace data to investigate.
        </P>
        <Code file="bounded_runner.py" code={`
from time import monotonic


def run_bounded(request: str, decide, execute, max_steps: int = 6, timeout: float = 20.0):
    started = monotonic()
    observations = []

    for step in range(max_steps):
        if monotonic() - started > timeout:
            return {"status": "timed_out", "steps": step}
        decision = decide(request, observations)
        if decision["type"] == "final":
            return {"status": "complete", "answer": decision["text"], "steps": step}
        if decision["type"] != "tool":
            return {"status": "needs_clarification", "steps": step}
        try:
            result = execute(decision["name"], decision["args"])
        except TimeoutError:
            result = {"error": "Tool timed out"}
        except ValueError:
            result = {"error": "Tool request was invalid"}
        observations.append({"action": decision, "result": result})

    return {"status": "step_limit", "steps": max_steps}
`} />
        <P>
          The sample gives the caller a structured status rather than silently pretending the last tool output is a completed
          task. A web service should also enforce a request-level deadline, because a blocking tool might not return in time
          for the loop to check its clock. Apply rate limits and concurrency limits outside the agent as well.
        </P>
      </Part>

      <Part n={6} label="Choose the right shape" title="Do Not Use an Agent for Every Task">
        <P>
          If the steps are known and predictable, write a workflow. It is cheaper to test and easier to explain. Use an agent
          when the request genuinely requires flexible choice among tools or iterative gathering of evidence. Many products
          use a hybrid: deterministic code handles permissions and business rules while an agent chooses which read-only
          search or retrieval step to try.
        </P>
        <Table
          head={['Question', 'Prefer a fixed workflow', 'An agent may help']}
          rows={[
            ['Are the steps known?', 'Yes; inputs map to the same sequence', 'No; the next useful search depends on results'],
            ['What is the impact of an error?', 'High and deterministic controls are needed', 'Low-risk, reversible exploration with oversight'],
            ['Can a normal function solve it?', 'A direct rule or query is sufficient', 'Tool choice needs flexible interpretation'],
            ['Can you verify completion?', 'A clear programmatic condition exists', 'Evidence can be checked after each action'],
          ]}
        />
        <Callout type="example">
          For a UPI dispute, a fixed workflow can collect a transaction reference and open a case reliably. An agent might
          summarize the customer&apos;s description or search approved help articles, but it should not independently transfer
          money or close a dispute based on its own summary.
        </Callout>
      </Part>

      <Part n={7} label="Production" title="Observe Decisions, Not Just Final Answers">
        <P>
          Keep a trace of the request identifier, selected tool name, validated argument summary, duration, result category,
          and stop reason. Avoid logging access tokens, raw payment details, or unnecessary personal data. A useful trace lets
          an engineer answer: Did the agent choose the wrong tool, did the tool fail, or did the model fail to understand the
          observation?
        </P>
        <Steps items={[
          'Write scenarios for successful completion, missing data, tool errors, and a request that needs clarification.',
          'Assert tool calls and arguments as well as the final response.',
          'Measure steps, latency, failure rate, and the number of tasks that need a person.',
          'Review traces with personal data minimised and access controlled.',
        ]} />
        <P>
          Before giving the loop write access, simulate actions and inspect what it would do. Then add narrow permissions,
          idempotency for retryable operations, approval gates, and a way to stop a run. A model can propose a correct action
          twice after a timeout; the tool must be designed for that possibility.
        </P>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Calling every LLM workflow an agent', cause: 'The label hides whether the model actually chooses actions.', fix: 'Use a deterministic workflow when the sequence is known; use agent loops only for flexible decisions.' },
          { mistake: 'Executing arbitrary model output', cause: 'Text that looks like a tool call is still untrusted input.', fix: 'Parse a typed action, allowlist the tool, validate arguments, and authorize in the tool layer.' },
          { mistake: 'Letting the loop run until it feels done', cause: 'The model can repeat actions or fail to recognise completion.', fix: 'Add step and time limits plus explicit completion and escalation states.' },
          { mistake: 'Giving a demo agent broad write access', cause: 'A short happy-path demo does not cover mistakes or prompt injection.', fix: 'Start read-only, scope data to the user, simulate changes, and gate consequential actions.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Build a Read-Only Delivery Support Agent">
        <Practice
          title="A bounded observe–think–act loop"
          tasks={[
            'Run the local loop and trace each decision, tool call, result, and final answer.',
            'Add a second read-only tool that returns the delivery estimate for an order.',
            'Reject an unknown tool and malformed arguments without calling either function.',
            'Add a maximum-step test in which the decision function never returns final.',
            'Write a scenario for an order that is not found and make the agent ask for clarification instead of guessing.',
          ]}
          hint="Keep the mock tool data in memory for this exercise. In an application, enforce the customer-to-order relationship in the database query, not in the model prompt."
        />
      </Part>

      <KeyTakeaways items={[
        'An agent is an application that repeatedly observes, selects a bounded action, and uses the result to pursue a goal.',
        'Tool calling connects model decisions to functions; validate and authorize every call in application code.',
        'Start with plain Python to understand the loop before introducing orchestration frameworks.',
        'Use a fixed workflow when the steps are predictable; agents add flexibility and failure modes.',
        'Bound execution with step limits, deadlines, tool timeouts, explicit stop reasons, and escalation paths.',
        'Trace decisions and tool outcomes, minimise sensitive logs, and test failure paths before enabling writes.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/agentic-ai/agent-state-memory"
        label="Lesson 02 · Agent State and Memory"
        text="The loop needs more than a request string. Next, model its state, conversation context, and carefully scoped long-term memory."
      />
    </LearnLayout>
  )
}
