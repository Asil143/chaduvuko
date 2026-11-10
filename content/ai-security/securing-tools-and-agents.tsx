import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function SecuringToolsAndAgents() {
  return (
    <LearnLayout
      title="Securing Tools and Agents — Excessive Agency and Sandboxing"
      description="Least-privilege tool design, confirmation for risky actions, sandboxed execution, and limiting what a compromised agent can do."
      section="AI Security & LLM Security — Lesson 05"
      readTime="40 min"
    >
      <Part n={1} label="Agency and risk" title="A Tool Call Is a Request, Not an Authorization">
        <P>
          An agent combines model-generated decisions with tools such as search, ticket lookup, email drafting, or account
          changes. Every added tool expands the system’s capability and the possible impact of unexpected behavior. The model
          may select a tool or propose arguments, but the application and tool service must independently decide whether the
          current principal may perform that exact operation.
        </P>
        <P>
          OWASP’s 2025 LLM06 Excessive Agency describes risk from excessive functionality, permissions, or autonomy. In
          practical terms, do not give a course-answering assistant an account-deletion tool simply because another feature
          might use it later. Start with read-only, narrow capabilities; add write access only for a clear product need and
          protect it with authorization, approval, and audit controls.
        </P>
        <Callout type="warning">
          A tool name and schema are not a security boundary. Validate arguments and enforce authorization in the service that
          performs the operation, even if the agent framework says the model requested it.
        </Callout>
      </Part>

      <Part n={2} label="Capability design" title="Give Each Task the Minimum Useful Power">
        <P>
          Design tools around one bounded business operation rather than exposing a generic database, shell, or unrestricted
          HTTP client. Separate read from write permissions. Bind every call to the authenticated user or service identity,
          restrict records and fields, set limits, and define which actions require a person’s confirmation. Keep credentials
          short-lived and scoped to the specific integration where possible.
        </P>
        <Table
          head={['Design choice', 'Safer pattern', 'Riskier pattern']}
          rows={[
            ['Operation', 'get_order_status(order_id)', 'run_arbitrary_database_query(sql)'],
            ['Identity', 'Server injects verified actor context', 'Model supplies user_id or role as an argument'],
            ['Permission', 'Tool checks record ownership and role', 'Prompt says “only access authorized records”'],
            ['Writes', 'Narrow action with explicit approval', 'Agent can perform any account mutation autonomously'],
            ['Credentials', 'Scoped service identity for one operation', 'Shared administrator credential for all tools'],
          ]}
        />
        <P>
          Tool descriptions should be accurate and examples should avoid exposing secrets. Avoid overly broad tool responses:
          return only fields needed for the task, with clear provenance and error states. The model should not receive a
          credential merely to decide which API to call.
        </P>
      </Part>

      <Part n={3} label="Authorization" title="Validate the Actor, Arguments and Target">
        <P>
          The example below demonstrates a narrow tool that checks its caller and validates a requested delivery slot before
          returning a proposal. It uses a fictional in-memory record. The model is not allowed to supply the actor identity;
          production code would obtain it from a verified server-side session and perform the write through an authorized
          service after any required approval.
        </P>
        <Code file="delivery_tool.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class Actor:
    user_id: str
    role: str

@dataclass
class Order:
    order_id: str
    owner_id: str
    delivery_slot: str


def propose_delivery_change(actor: Actor, order: Order, slot: str) -> dict[str, str]:
    if actor.role != "customer" or actor.user_id != order.owner_id:
        raise PermissionError("not authorized for this order")
    if slot not in {"morning", "afternoon", "evening"}:
        raise ValueError("unsupported delivery slot")
    return {
        "status": "approval_required",
        "order_id": order.order_id,
        "requested_slot": slot,
    }

actor = Actor(user_id="customer-17", role="customer")
order = Order(order_id="order-42", owner_id="customer-17", delivery_slot="afternoon")
print(propose_delivery_change(actor, order, "evening"))
`} />
        <P>
          Returning a proposal is intentionally different from committing a change. A separate service can show the exact
          order and requested slot to the user, collect approval, and re-check current ownership and order state before
          writing. If approval expires or the state changes, ask the user again rather than assuming old consent still applies.
        </P>
        <Callout type="tip">
          Build tool authorization tests as if a model could choose any syntactically valid argument. Include wrong owners,
          invalid enums, oversized inputs, stale approvals, and permission changes.
        </Callout>
      </Part>

      <Part n={4} label="Human oversight" title="Make Approval Specific and Meaningful">
        <P>
          Human approval should be reserved for actions whose impact justifies the extra step. Show the proposed operation,
          affected record, and important consequences in a trusted UI—not only in model-generated prose. Bind consent to the
          exact operation and arguments, record who approved and when, and invalidate it if the target or amount changes.
          Do not use a generic &quot;continue&quot; click as approval for a different action.
        </P>
        <Steps items={[
          'Classify tools by impact, reversibility, and data sensitivity; default to no write capability.',
          'For approved actions, display the precise target and change using trusted application data.',
          'Bind approval to the specific user, operation, arguments, and expiry; prevent replay.',
          'Re-authorize and validate at commit time, then write an audit event with a correlation ID.',
          'Provide cancellation, rollback, or a support path appropriate to the action.',
        ]} />
        <P>
          A human-in-the-loop control only helps when the reviewer has context and meaningful choice. If a workflow presents
          dozens of vague alerts or hides the action details, approvals can become routine clicks rather than informed checks.
          Test usability and bypass paths, not just the presence of an approval screen.
        </P>
      </Part>

      <Part n={5} label="Sandboxing" title="Contain Code or External Execution">
        <P>
          Some agents analyze code, transform files, or run user-provided snippets. Do not execute untrusted code inside the
          main web application process. If execution is an essential product feature, use an isolated environment with a
          dedicated low-privilege identity, strict CPU and memory limits, timeouts, restricted filesystem access, and no
          network access unless the task specifically requires a controlled endpoint. Treat isolation as defense in depth,
          not proof that arbitrary code is safe.
        </P>
        <P>
          For ordinary business tools, prefer allowlisted APIs and structured inputs over a general command runner. Keep
          secrets outside the agent context and sandbox, avoid mounting production credentials, and destroy or reset the
          environment after each job. Validate outputs before they re-enter trusted systems.
        </P>
        <Table
          head={['Boundary', 'Control objective']}
          rows={[
            ['Process / container', 'Separate untrusted work from application and host processes'],
            ['Identity', 'Use a non-privileged, task-specific service identity'],
            ['Resources', 'Bound runtime, memory, CPU, output, concurrency, and cost'],
            ['Network', 'Deny by default; allow only reviewed destinations where required'],
            ['Filesystem', 'Expose only task files; prevent access to host or other users’ data'],
            ['Lifecycle', 'Reset state, remove temporary credentials, and preserve only approved outputs'],
          ]}
        />
        <Callout type="info">
          Sandbox features depend on the chosen platform and threat model. Consult that platform’s official isolation and
          networking documentation; do not assume a generic container is a complete boundary by itself.
        </Callout>
      </Part>

      <Part n={6} label="Reliability and monitoring" title="Bound Loops, Fail Closed and Keep Audit Evidence">
        <P>
          An agent may repeat tool calls, call a downstream service slowly, or return malformed arguments. Bound total steps,
          tool calls, elapsed time, retries, output size, and model requests. Give every call a deadline and idempotency strategy
          appropriate to its operation. If authorization or policy services are unavailable, do not fall back to a broader
          tool or skip the check.
        </P>
        <Code file="tool_budget.py" code={`
from dataclasses import dataclass

@dataclass
class ToolBudget:
    max_calls: int
    calls_used: int = 0

    def consume(self) -> None:
        if self.calls_used >= self.max_calls:
            raise RuntimeError("tool-call budget exhausted")
        self.calls_used += 1

budget = ToolBudget(max_calls=4)
for name in ["search_policy", "get_order_status"]:
    budget.consume()
    print("Allowed bounded call:", name)
print(f"Calls used: {budget.calls_used}/{budget.max_calls}")
`} />
        <P>
          Record the actor, tool name, authorization result, approval reference, target identifier, and outcome in protected
          audit events. Avoid logging credentials, full sensitive arguments, or full prompts unless there is a justified,
          controlled need. Monitoring should help detect unexpected volume, repeated denials, and unusual sequences without
          turning logs into another source of data exposure.
        </P>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Giving an agent a generic shell or database tool', cause: 'Broad capability creates a large blast radius and difficult-to-audit behavior.', fix: 'Expose narrow business operations with strict schemas and server-side checks.' },
          { mistake: 'Trusting model-supplied identity or tenant values', cause: 'Those fields are untrusted arguments and can differ from the authenticated caller.', fix: 'Inject principal context from the verified request and authorize every call.' },
          { mistake: 'Treating a confirmation prompt as the permission check', cause: 'The user may not see the exact effect, and authorization can change before execution.', fix: 'Bind approval to the action and repeat authorization at commit time.' },
          { mistake: 'Assuming a container makes code execution harmless', cause: 'Isolation depends on configuration, host, network, secrets, and resource boundaries.', fix: 'Use documented isolation controls, deny-by-default access, limits, and platform-specific review.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Reduce the Agency of a Delivery Assistant">
        <Practice
          title="Design least-privilege tools and an approval flow"
          tasks={[
            'List the assistant’s requested capabilities and divide them into read, propose, and commit operations.',
            'Replace one broad tool with two narrow typed operations and specify server-derived identity and authorization checks.',
            'Design an approval record bound to a specific order and delivery-slot change, including expiry and replay protection.',
            'Write tests for wrong owner, malformed input, changed order state, authorization outage, and exhausted tool budget.',
            'Specify an isolated execution profile for an optional document-conversion task without mounting production secrets.',
            'Define audit fields that support investigation while minimizing personal data and prompt retention.',
          ]}
          hint="Use a fake order and customer. The model can propose a change, but only a verified user approval plus a fresh server authorization can commit it."
        />
      </Part>

      <KeyTakeaways items={[
        'An agent’s tool call is an untrusted request; the tool service must validate arguments and authorize the actor independently.',
        'OWASP LLM06 Excessive Agency concerns excessive functionality, permissions, or autonomy.',
        'Prefer narrow, least-privilege tools and separate read, propose, and commit operations.',
        'Human approval should display and bind to the exact operation, target, and arguments, followed by authorization at commit time.',
        'Sandbox untrusted execution with documented isolation, resource limits, restricted network and filesystem, and no production secrets.',
        'Bound agent loops and record privacy-aware audit evidence; fail closed when critical policy checks are unavailable.',
      ]} />

      <Bullets items={[
        <span key="owasp">Reference: OWASP Top 10 for LLM Applications (2025), especially LLM06 Excessive Agency and LLM05 Improper Output Handling.</span>,
        <span key="atlas">Reference: MITRE ATLAS current knowledge base for AI adversary techniques and mitigations; adapt relevant scenarios to your agent’s actual tools.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/ai-security/ai-privacy-output-handling"
        label="Lesson 06 · Sensitive Data, Privacy and Output Handling"
        text="You have constrained the agent’s actions. Next, protect sensitive information in prompts, logs, and generated outputs."
      />
    </LearnLayout>
  )
}
