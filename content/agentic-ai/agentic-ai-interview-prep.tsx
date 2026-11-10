import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function AgenticAiInterviewPrep() {
  return (
    <LearnLayout
      title="Agentic AI Interview Prep"
      description="Agent architecture, tool design, memory, evaluation and security questions from agentic AI interviews, with model answers and design exercises."
      section="Agentic AI & Automation — Lesson 14"
      readTime="45 min"
    >
      <Part n={1} label="How to answer" title="Show Engineering Judgment, Not Framework Vocabulary">
        <P>
          Agentic AI interviews test whether you can build a system that completes a useful task under real constraints. Explain the goal,
          trusted inputs, allowed tools, state, failure behavior and measurement before naming a framework. A strong answer is specific
          about what the model may decide and what ordinary application code must enforce.
        </P>
        <Table
          head={['Interview signal', 'What a convincing answer includes']}
          rows={[
            ['Problem framing', 'User outcome, constraints and a simple baseline'],
            ['Architecture', 'State, tool contracts, routing and trust boundaries'],
            ['Reliability', 'Timeouts, retries, idempotency, fallback and resume strategy'],
            ['Evaluation', 'Representative scenarios, measurable success and regression tests'],
            ['Production thinking', 'Privacy, access control, monitoring, cost and human escalation'],
          ]}
          caption="Use a consistent structure: objective → design → failure modes → evaluation → trade-offs."
        />
        <Callout type="tip">
          If you do not know a framework API detail, say how you would verify it in the official documentation. Accurate uncertainty is
          better than inventing a method name or claiming a feature you have not tested.
        </Callout>
      </Part>

      <Part n={2} label="Architecture and control" title="Questions 1–3: What Makes a System Agentic?">
        <H3>1. What distinguishes an agent from a workflow?</H3>
        <P>
          A workflow follows control flow chosen in advance: a set of steps and branches. An agent uses model output to select or adapt
          actions toward a goal, often by choosing among tools and observing results. The distinction is about who selects the next step,
          not whether a product uses an LLM. I would prefer a workflow when the path is known and reserve model autonomy for the parts that
          genuinely need flexible interpretation.
        </P>
        <Bullets items={['What interviewers look for: sound trade-offs and safe, testable design.']} />

        <H3>2. Describe the plan–act–observe loop.</H3>
        <P>
          The system receives a goal and scoped context, chooses an allowed action, executes it through a tool, and incorporates the result
          into state before deciding whether to continue or finish. The loop needs a step limit, a deadline and a terminal condition. I
          would log the action and outcome, but filter secrets and personal data. Tool results are observations, not trusted instructions.
        </P>
        <Bullets items={['What interviewers look for: sound trade-offs and safe, testable design.']} />

        <H3>3. When would you use a deterministic workflow instead?</H3>
        <P>
          I would use ordinary code when the steps are predictable, rules are auditable or side effects are high impact. A model can still
          classify an ambiguous request or draft text inside that workflow, while code controls authorization, validation and execution.
          This reduces model calls and makes behavior easier to test. I would add autonomy only when it improves a measured outcome enough
          to justify the extra variability and operational effort.
        </P>
        <Bullets items={['What interviewers look for: sound trade-offs and safe, testable design.']} />
      </Part>

      <Part n={3} label="Tools and state" title="Questions 4–6: Make Capabilities Narrow and Explicit">
        <H3>4. How would you design a tool for an agent?</H3>
        <P>
          Give the tool one clear purpose, a typed input schema and a bounded result. Validate inputs in the tool handler, bind access to a
          verified user or service identity, and return only the facts needed for the next decision. Keep read and write capabilities
          separate. A model proposing a valid order ID does not prove that the current user owns that order.
        </P>
        <Bullets items={['What interviewers look for: sound trade-offs and safe, testable design.']} />

        <H3>5. How do you handle agent memory?</H3>
        <P>
          I separate the current run&apos;s state from durable user memory. Run state may include the request, completed steps and references
          to tool results. Long-term memory should be added only for a clear product need, with user-appropriate consent, access controls,
          retention and correction or deletion paths. Retrieval results may be stale or untrusted, so I would keep their source and date and
          avoid treating them as policy.
        </P>
        <Bullets items={['What interviewers look for: sound trade-offs and safe, testable design.']} />

        <H3>6. What is context engineering, and how would you control context growth?</H3>
        <P>
          Context engineering means selecting and structuring the instructions, conversation, retrieved evidence and tool outputs that a
          model receives. I would set a task-specific context budget, remove irrelevant history, summarize only where meaning can be
          preserved, and retrieve focused evidence with provenance. I would measure quality after each truncation strategy rather than
          assuming a shorter prompt is always better.
        </P>
        <Bullets items={['What interviewers look for: sound trade-offs and safe, testable design.']} />

        <Code file="scoped_tool.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class UserContext:
    customer_id: str

ORDERS = {"ORD-204": ("customer-7", "in_transit")}

def get_status(order_id: str, user: UserContext) -> dict:
    if len(order_id) > 24 or not order_id.startswith("ORD-"):
        return {"found": False}
    record = ORDERS.get(order_id)
    if record is None or record[0] != user.customer_id:
        return {"found": False}
    return {"found": True, "status": record[1]}

if __name__ == "__main__":
    print(get_status("ORD-204", UserContext("customer-7")))
`} />
      </Part>

      <Part n={4} label="Orchestration and reliability" title="Questions 7–9: Keep Control Observable">
        <H3>7. When would you use a multi-agent design?</H3>
        <P>
          I would consider multiple agents when responsibilities are meaningfully distinct and can be evaluated independently—for example,
          a research step gathering cited evidence followed by a reviewer checking evidence coverage. I would compare it with a single agent
          or deterministic pipeline first. Handoffs add latency, cost and failure points, so role labels alone are not a reason to split work.
        </P>
        <Bullets items={['What interviewers look for: sound trade-offs and safe, testable design.']} />

        <H3>8. How do you choose an agent framework?</H3>
        <P>
          I would start from control-flow needs, persistence, tracing, provider constraints, team familiarity and deployment requirements.
          Then I would prototype the same task and acceptance tests in a simple baseline and the plausible frameworks. I would assess lock-in,
          upgrade path and failure visibility, not only how quickly a demo works. I would verify current APIs and feature claims in primary
          documentation before committing.
        </P>
        <Bullets items={['What interviewers look for: sound trade-offs and safe, testable design.']} />

        <H3>9. What happens when a tool times out or returns an error?</H3>
        <P>
          The tool should have an explicit timeout and typed error categories. Retry transient failures only, with bounded exponential
          backoff and jitter; do not retry invalid input or authorization failures. Before retrying an uncertain write, check its status or
          use an idempotency key. If recovery is exhausted, stop and return a clear partial result or escalate instead of inventing success.
        </P>
        <Bullets items={['What interviewers look for: sound trade-offs and safe, testable design.']} />

        <Code file="bounded_loop.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class Action:
    name: str
    arguments: dict

def run_agent(goal: str, choose_action, execute_tool, max_steps: int = 5) -> str:
    history: list[dict] = []
    for _ in range(max_steps):
        action = choose_action(goal, history)
        if action.name == "finish":
            return str(action.arguments.get("answer", "Task complete."))
        if action.name != "lookup_status":
            raise ValueError("Tool is not permitted")
        observation = execute_tool(action.arguments)
        history.append({"action": action.name, "observation": observation})
    return "I could not finish within the allowed steps; please try again or contact support."

if __name__ == "__main__":
    def choose(_goal, history):
        return Action("finish", {"answer": f"Observed {len(history)} step(s)."})
    print(run_agent("Check a demo order", choose, lambda args: args))
`} />
      </Part>

      <Part n={5} label="Evaluation and operations" title="Questions 10–12: Prove the System Works">
        <H3>10. How would you evaluate an agent?</H3>
        <P>
          I would define task-level success and safety criteria, then build representative scenarios that include normal, ambiguous, missing
          data and adversarial inputs. Measure outcome correctness, tool selection, unsupported claims, completion rate and cost or latency.
          Review trajectories for failures and maintain regression tests for known issues. Human review remains important for qualitative
          quality and high-impact tasks.
        </P>
        <Bullets items={['What interviewers look for: sound trade-offs and safe, testable design.']} />

        <H3>11. What is the difference between outcome evaluation and trajectory evaluation?</H3>
        <P>
          Outcome evaluation asks whether the final result meets the user goal and policy. Trajectory evaluation inspects how the system
          reached that result: whether tools were appropriate, permissions were respected, evidence supported the answer and unnecessary
          actions were avoided. A correct answer reached through an unauthorized lookup is still a failure. I would use both, with human
          review for ambiguous judgment calls.
        </P>
        <Bullets items={['What interviewers look for: sound trade-offs and safe, testable design.']} />

        <H3>12. What would you monitor in production?</H3>
        <P>
          I would monitor completion and escalation rates, latency by step, tool errors, retries, model usage, queue age and safety events.
          Traces should connect model calls and tools to a run ID while redacting sensitive data. I would establish alert thresholds based
          on the service&apos;s normal behavior and investigate shifts by prompt, tool, model configuration and deployment version.
        </P>
        <Bullets items={['What interviewers look for: sound trade-offs and safe, testable design.']} />

        <Code file="score_cases.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class CaseResult:
    expected_status: str
    actual_status: str
    used_permitted_tool: bool
    unsupported_claim: bool

def score(results: list[CaseResult]) -> dict[str, float]:
    total = max(len(results), 1)
    return {
        "status_accuracy": sum(r.expected_status == r.actual_status for r in results) / total,
        "permitted_tool_rate": sum(r.used_permitted_tool for r in results) / total,
        "unsupported_claim_rate": sum(r.unsupported_claim for r in results) / total,
    }

if __name__ == "__main__":
    examples = [CaseResult("in_transit", "in_transit", True, False)]
    print(score(examples))
`} />
      </Part>

      <Part n={6} label="Security and human control" title="Questions 13–15: Protect the Trust Boundaries">
        <H3>13. How do you defend against prompt injection?</H3>
        <P>
          Treat user input, retrieved documents, web pages and tool results as untrusted data. Prompt instructions can help the model
          recognize quoted or retrieved content, but they are not the security boundary. Enforce tool allowlists, authorization, output
          validation and network or filesystem limits outside the model. Test indirect injection through realistic documents and pages.
        </P>
        <Bullets items={['What interviewers look for: sound trade-offs and safe, testable design.']} />

        <H3>14. Where should human approval be required?</H3>
        <P>
          Require approval when an action is high-impact, difficult to reverse or outside the system&apos;s established authority—such as
          issuing a refund, changing account ownership or sending a binding communication. The approval should show the exact proposed
          operation and relevant evidence, bind to an authenticated reviewer and expire. The backend should re-check permission when
          executing the approved action.
        </P>
        <Bullets items={['What interviewers look for: sound trade-offs and safe, testable design.']} />

        <H3>15. How would you limit sensitive data exposure?</H3>
        <P>
          Minimize data before it reaches the model, redact identifiers where possible, restrict logs and traces, and define retention and
          deletion. Separate secrets from prompts and checkpoint data. Use a provider and deployment configuration approved for the data
          classification, and review access to both production and evaluation datasets. If the task does not need a data field, do not send
          it.
        </P>
        <Bullets items={['What interviewers look for: sound trade-offs and safe, testable design.']} />
        <Callout type="warning">
          A model&apos;s refusal is not authorization. A tool call must independently check whether this principal may perform this operation
          on this record.
        </Callout>
      </Part>

      <Part n={7} label="System design" title="Questions 16–18: Design for Real Workloads">
        <H3>16. Design an agent for delayed delivery support.</H3>
        <P>
          I would authenticate the customer first and provide a narrow order lookup that scopes results to that customer. The model can
          explain verified status and cite the current delivery policy. For a refund request, it can collect missing facts and create a
          pending review request, but an authorised employee or deterministic policy service decides eligibility. I would test missing and
          conflicting order data, prompt injection in policy text and tool timeouts.
        </P>
        <Bullets items={['What interviewers look for: sound trade-offs and safe, testable design.']} />

        <H3>17. How would you deploy an agent that may run for several minutes?</H3>
        <P>
          I would turn the request into a durable job, return a job ID and process it in a worker. Persist minimal, versioned checkpoints
          between steps, use leases or queue visibility to recover abandoned work, and assume delivery may repeat. Add a deadline, step and
          usage budgets, cancellation, status polling and structured traces. Make side effects idempotent and send unrecoverable failures to
          an operator or dead-letter flow.
        </P>
        <Bullets items={['What interviewers look for: sound trade-offs and safe, testable design.']} />

        <H3>18. How do you choose what to build first?</H3>
        <P>
          I would establish a non-agent baseline and a small set of user-representative cases. Then I would identify where flexible
          interpretation changes the outcome and prototype only that part. I would add features in order of measured user value and risk,
          keeping a rollback path and a human escalation route. This lets the team learn without committing to a broad autonomous system
          before it has evidence of usefulness.
        </P>
        <Bullets items={['What interviewers look for: sound trade-offs and safe, testable design.']} />

      </Part>

      <Part n={8} label="Interview pitfalls" title="Answers That Sound Confident but Miss the Engineering">
        <Mistakes items={[
          { mistake: 'Saying an agent will decide and execute the whole task autonomously', cause: 'It ignores authorization, uncertainty, irreversible actions and user trust.', fix: 'Specify the allowed actions, external checks, escalation conditions and stop rules.' },
          { mistake: 'Naming a vector database or framework before defining the problem', cause: 'A technology list does not show why the architecture meets requirements.', fix: 'Start with data, latency, correctness, privacy and operational constraints.' },
          { mistake: 'Evaluating only whether the final answer looks good', cause: 'A plausible answer may have used the wrong tool or exposed data.', fix: 'Evaluate outcomes, trajectories, tool permissions and unsupported claims.' },
          { mistake: 'Claiming retries make every failure reliable', cause: 'Retries can repeat a side effect or amplify an outage.', fix: 'Classify failures, bound retries, use idempotency and reconcile uncertain writes.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Rehearse a Structured Interview Answer">
        <Practice
          title="Design a safe delivery-support agent in five minutes"
          tasks={[
            'State the user goal and the simplest non-agent baseline.',
            'Draw the components and mark where identity, policy and customer data are trusted.',
            'Define one read-only tool contract and one action that must require a human.',
            'Explain how you handle a timeout, duplicate job, prompt injection and missing order.',
            'Name three outcome metrics and two safety checks you would evaluate before release.',
            'Explain one trade-off and what evidence would make you change your design.'
          ]}
          hint="Answer in a clear sequence: requirements, design, failure modes, evaluation, trade-offs. State assumptions rather than hiding them."
        />
      </Part>

      <KeyTakeaways items={[
        'Explain the user outcome and a deterministic baseline before proposing an agent.',
        'Keep identity, authorization, validation and side effects in trusted application code.',
        'Use bounded loops, narrow tools, explicit state and well-defined stopping conditions.',
        'Evaluate both final outcomes and action trajectories with realistic failure and abuse cases.',
        'Design retries, checkpoints, idempotency and human approval for the actual risk level.',
        'Monitor quality, latency, usage and safety while minimizing sensitive trace data.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/generative-ai"
        label="Next course · Generative AI & LLM Engineering"
        text="You have completed the Agentic AI & Automation track. Continue with the Generative AI foundations and engineering journey to strengthen model, retrieval and evaluation fundamentals."
      />
    </LearnLayout>
  )
}
