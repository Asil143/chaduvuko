import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function AgentFrameworksCompared() {
  return (
    <LearnLayout
      title="Agent Frameworks Compared — LangGraph, OpenAI Agents SDK and CrewAI"
      description="Build the same small agent three ways and compare control, state, tracing, lock-in and production readiness to choose a framework."
      section="Agentic AI & Automation — Lesson 08"
      readTime="35 min"
    >
      <Part n={1} label="The decision" title="Frameworks Organise the Loop; They Do Not Make It Safe">
        <P>
          An agent framework provides structure around a model, tools and control flow. It may make it easier to express a workflow,
          keep state, route work or inspect a run. It cannot decide whether a refund is authorised, guarantee that a model follows
          instructions, or make an unsafe tool safe. Those responsibilities remain in your application and backend.
        </P>
        <P>
          We will compare LangGraph, the OpenAI Agents SDK and CrewAI by implementing one bounded task: read a delivery status and
          explain it to a customer. The trusted order service supplies the status; the model must not invent it or choose a customer
          identity. This is intentionally small. A controlled workflow is a better comparison than a flashy multi-agent demo.
        </P>
        <Table
          head={['Choice', 'Useful when', 'Trade-off to inspect']}
          rows={[
            ['LangGraph', 'You need explicit state, graph control, branching and resumable workflow design', 'More concepts and graph code to own; persistence is a separate design concern'],
            ['OpenAI Agents SDK', 'You want a focused agent, typed tools, handoffs and tracing in an OpenAI-centered stack', 'Provider and SDK coupling; confirm your provider, deployment and data requirements'],
            ['CrewAI', 'Your problem maps naturally to role-oriented agents and assigned tasks', 'Role/task abstractions can obscure control flow if the workflow is actually deterministic'],
            ['Plain application code', 'A few predictable steps are enough', 'You own the orchestration and observability conventions'],
          ]}
          caption="These are design tendencies, not a feature guarantee. Check each framework's current documentation before selecting it."
        />
        <Callout type="tip">
          Start with a workflow diagram and failure cases, not a framework popularity poll. If a sequence of ordinary functions solves
          the problem, adding an agent framework creates another dependency without adding useful autonomy.
        </Callout>
      </Part>

      <Part n={2} label="Shared contract" title="Define the Work Before Comparing Implementations">
        <P>
          All three implementations should receive the same trusted inputs and return the same output shape. The authenticated server
          supplies the customer ID. A narrow read-only function retrieves status. The model can explain the result but cannot change
          delivery data, issue a refund or access another customer&apos;s record.
        </P>
        <Code file="support_contract.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class DeliveryFacts:
    order_id: str
    status: str
    eta: str | None

ORDERS = {
    "ORD-204": ("customer-7", DeliveryFacts("ORD-204", "in_transit", "2026-11-12")),
}

def lookup_delivery(order_id: str, authenticated_customer_id: str) -> DeliveryFacts | None:
    record = ORDERS.get(order_id.strip().upper())
    if record is None or record[0] != authenticated_customer_id:
        return None
    return record[1]

if __name__ == "__main__":
    print(lookup_delivery("ORD-204", "customer-7"))
`} />
        <P>
          This example runs with Python alone. In production, the order service should enforce tenant scoping in its query, not rely on
          a model-supplied identifier. Return the minimum facts needed for the task. Keep authentication, authorization and side effects
          outside model control.
        </P>
        <Callout type="warning">
          Do not evaluate frameworks by letting each one use different prompts, tools or data. That tests the setup, not the framework.
          Hold the task contract constant, then compare how clearly you can implement the required control and recovery behavior.
        </Callout>
      </Part>

      <Part n={3} label="LangGraph" title="Make State Transitions Visible">
        <P>
          A graph is useful when the next action depends on state: perhaps a lookup can fail, an approval can pause execution, or a retry
          must resume from a checkpoint. Nodes do work; edges express what happens next. The structure is explicit enough to inspect
          without asking the model to invent the process. Install the framework in an isolated environment and use the current official
          LangGraph documentation for the supported package API.
        </P>
        <Code lang="bash" code={`
python -m venv .venv
source .venv/bin/activate
pip install langgraph
`} />
        <P>
          The following is a minimal, runnable graph example using the stable StateGraph pattern. It deliberately keeps the response
          deterministic so that the example teaches orchestration rather than depending on a particular model provider.
        </P>
        <Code file="graph_delivery.py" code={`
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END

class State(TypedDict):
    order_id: str
    customer_id: str
    status: str
    answer: str

def load_status(state: State) -> dict:
    known = {"ORD-204": ("customer-7", "in_transit")}
    record = known.get(state["order_id"])
    if record is None or record[0] != state["customer_id"]:
        return {"status": "not_found"}
    return {"status": record[1]}

def explain(state: State) -> dict:
    if state["status"] == "not_found":
        return {"answer": "I could not find an order available to this account."}
    return {"answer": f"Your order is currently {state['status']}."}

graph = StateGraph(State)
graph.add_node("load_status", load_status)
graph.add_node("explain", explain)
graph.add_edge(START, "load_status")
graph.add_edge("load_status", "explain")
graph.add_edge("explain", END)
app = graph.compile()

if __name__ == "__main__":
    result = app.invoke({
        "order_id": "ORD-204", "customer_id": "customer-7",
        "status": "", "answer": "",
    })
    print(result["answer"])
`} />
        <P>
          A real model node can turn verified facts into natural language, but it should receive only the scoped result. Add a conditional
          edge for cases that need escalation or a human decision. Add a checkpointer only after you decide which state is safe to persist,
          how long to retain it and how to resume idempotently.
        </P>
      </Part>

      <Part n={4} label="OpenAI Agents SDK" title="Use Agent and Tool Abstractions Deliberately">
        <P>
          The OpenAI Agents SDK offers an agent-and-tool programming model, handoffs and tracing for supported workflows. Its fit is
          strongest when those abstractions match your stack and the provider constraints are acceptable. Keep the tool itself safe even
          if the model makes an unexpected call. Tool argument validation and authorization are application responsibilities.
        </P>
        <Code lang="bash" code={`
pip install openai-agents
`} />
        <P>
          This small example uses the SDK&apos;s familiar Agent, function_tool and Runner pattern. Configure the model through the
          environment; select a model your account and current SDK support. Never place a provider key in browser code.
        </P>
        <Code file="sdk_delivery.py" code={`
import asyncio
import os
from agents import Agent, Runner, function_tool

@function_tool
def delivery_status(order_id: str) -> str:
    """Return a demo status for a previously authorised order."""
    allowed = {"ORD-204": "in_transit; expected date 2026-11-12"}
    return allowed.get(order_id, "not_found")

async def main() -> None:
    model_name = os.environ.get("LLM_MODEL")
    if not model_name:
        raise RuntimeError("Set LLM_MODEL to a model supported by your account")
    agent = Agent(
        name="Delivery helper",
        instructions=(
            "Use delivery_status to check the supplied order. Explain only the returned facts. "
            "Never claim to change an order or issue a refund."
        ),
        tools=[delivery_status],
        model=model_name,
    )
    result = await Runner.run(agent, "Check order ORD-204 and explain its status.")
    print(result.final_output)

if __name__ == "__main__":
    asyncio.run(main())
`} />
        <P>
          This tool is intentionally read-only and demo-scoped. In a web service, bind an authenticated principal to tool execution in
          trusted server context. Do not accept the customer identity from the prompt. Confirm tracing data retention and redact sensitive
          inputs before enabling production traces.
        </P>
      </Part>

      <Part n={5} label="CrewAI" title="Map Roles and Tasks to Actual Responsibilities">
        <P>
          CrewAI expresses work using agents, tasks and a crew. Role language can be useful for a process with genuinely distinct
          responsibilities, such as a researcher gathering evidence followed by a reviewer checking a draft. It is not a reason to create
          several model calls for a simple status lookup. More agents mean additional latency, cost and failure surfaces.
        </P>
        <P>
          The same delivery task could be represented as one agent assigned one task. The precise configuration options evolve; follow the
          current CrewAI documentation for model configuration and supported kickoff behavior. The design invariant is more important than
          a particular constructor flag: the task must use verified data and the tools must remain narrowly scoped.
        </P>
        <Code lang="bash" code={`
pip install crewai
`} />
        <Code file="crewai_delivery.py" code={`
import os
from crewai import Agent, Crew, Process, Task
from crewai.tools import tool

@tool("Read delivery status")
def delivery_status(order_id: str) -> str:
    """Return a demo status for a previously authorised order."""
    return {"ORD-204": "in_transit; expected date from verified order data"}.get(
        order_id, "not_found"
    )

model_name = os.environ.get("LLM_MODEL")
if not model_name:
    raise RuntimeError("Set LLM_MODEL to a supported model configuration")

helper = Agent(
    role="Delivery support helper",
    goal="Explain a verified delivery status without changing an order",
    backstory="You are a careful assistant that uses only provided order facts.",
    tools=[delivery_status],
    llm=model_name,
    verbose=False,
)
explain_status = Task(
    description=(
        "Check order ORD-204 with the read-only tool. Explain only its returned "
        "status. Do not promise a change, refund, or fact the tool did not return."
    ),
    expected_output="A short explanation grounded in the delivery lookup result.",
    agent=helper,
)
crew = Crew(agents=[helper], tasks=[explain_status], process=Process.sequential)
print(crew.kickoff())
`} />
        <Callout type="info">
          CrewAI APIs and model configuration evolve. Verify the current official documentation for your selected release, especially how
          it configures providers and credentials. This one-agent example keeps the tool read-only; it does not make the model authoritative.
        </Callout>
      </Part>

      <Part n={6} label="Compare" title="Choose on Operational Fit, Not Demo Convenience">
        <P>
          A useful proof of concept answers more than &quot;can it call a tool?&quot; Ask how you will validate state, resume after a
          process restart, identify a failed node, control external calls, and upgrade the dependency. Run a small acceptance suite against
          each candidate with the same task and test fixtures.
        </P>
        <Table
          head={['Question', 'LangGraph', 'OpenAI Agents SDK', 'CrewAI']}
          rows={[
            ['Can I see and test the control flow?', 'Graph nodes and edges are explicit', 'Agent/tool/handoff structure is SDK-defined', 'Roles and tasks are the primary abstractions'],
            ['How will state survive a restart?', 'Design a checkpointer and persistence policy', 'Confirm the workflow and persistence facilities you need', 'Choose and validate persistence for the crew workflow'],
            ['How tightly coupled is the app?', 'Framework-specific graph model', 'OpenAI ecosystem APIs and concepts', 'CrewAI roles/tasks and execution APIs'],
            ['When can it be overkill?', 'A simple linear function sequence', 'A single provider call with no tools', 'One bounded task represented as a multi-agent crew'],
            ['What must still be yours?', 'Authorization, tests, budgets, deployment', 'Authorization, tests, budgets, deployment', 'Authorization, tests, budgets, deployment'],
          ]}
          caption="Use this as a review checklist, not a universal ranking. Validate current features and constraints in primary documentation."
        />
        <Steps items={[
          'Write down the user outcome, trusted inputs, permitted tools and prohibited side effects.',
          'Build the simplest deterministic baseline before introducing a model or framework.',
          'Implement one equivalent proof of concept per plausible framework and record setup effort.',
          'Test normal, missing-data, timeout, malformed-tool-input and restart scenarios.',
          'Compare traces, deployment complexity, data handling, dependency health and team familiarity.',
        ]} />
      </Part>

      <Part n={7} label="Production choice" title="Keep a Framework Boundary You Can Change">
        <P>
          Keep framework types inside an adapter layer. Your domain code should accept ordinary typed inputs and return ordinary typed
          outputs. Then a framework upgrade—or a decision to remove the framework—does not require changing your business rules and
          customer authorization logic at the same time.
        </P>
        <Code file="agent_port.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class DeliveryRequest:
    order_id: str
    customer_id: str

@dataclass(frozen=True)
class DeliveryReply:
    text: str
    status: str

def run_delivery(request: DeliveryRequest, graph_runner) -> DeliveryReply:
    state = graph_runner({
        "order_id": request.order_id,
        "customer_id": request.customer_id,
        "status": "",
        "answer": "",
    })
    return DeliveryReply(text=state["answer"], status=state["status"])

# The HTTP route authenticates the user, builds DeliveryRequest, then calls this port.
# The agent never decides which customer_id is authorised.
`} />
        <P>
          Also version prompts, tool schemas and state records. When changing a framework, compare old and new behavior with regression
          cases rather than assuming equivalent prompts produce equivalent trajectories. Preserve a deterministic fallback for important
          user journeys where it is feasible.
        </P>
        <Callout type="tip">
          For an Indian delivery-support experience, a status lookup followed by a clear next step may outperform a conversational agent.
          Use autonomy only where it measurably improves completion, not just because an agent can be built.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Framework Selection Mistakes">
        <Mistakes items={[
          { mistake: 'Choosing the framework with the flashiest demo', cause: 'A demo often omits deployment, permissions, state retention and failure handling.', fix: 'Run the same acceptance tests and operational review against every candidate.' },
          { mistake: 'Using multiple agents for one predictable task', cause: 'Extra model turns can add cost, delay and disagreement without improving the outcome.', fix: 'Start with one agent or a deterministic workflow; add roles only for clear separation of work.' },
          { mistake: 'Assuming framework tools enforce authorization', cause: 'A schema constrains argument shape, not whether the caller may access a record.', fix: 'Enforce identity and access in trusted service code for every invocation.' },
          { mistake: 'Persisting all agent state by default', cause: 'State can include personal data, untrusted text, stale facts or secrets.', fix: 'Define a minimal state schema, access controls, retention and deletion before enabling persistence.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Run a Small Framework Bake-Off">
        <Practice
          title="Compare frameworks using one delivery-support contract"
          tasks={[
            'Write a deterministic lookup baseline with customer scoping and a missing-order case.',
            'Implement that state transition in LangGraph; add a branch for not-found without asking a model to choose access policy.',
            'Create a one-agent, one-tool OpenAI Agents SDK proof of concept using a model name from LLM_MODEL.',
            'Document how the same job would map to one CrewAI agent and task; verify exact APIs using current official docs.',
            'Run identical tests for authorised lookup, another customer, malformed ID, model refusal and tool timeout.',
            'Write a short decision note naming the operational trade-off that matters most for your team.'
          ]}
          hint="Use fake data and credentials. Do not wire a write-capable production tool into a comparison demo."
        />
      </Part>

      <KeyTakeaways items={[
        'A framework organises control flow; it does not supply authorization, safety or correctness automatically.',
        'LangGraph makes state transitions and conditional routing explicit, while introducing graph concepts to own.',
        'The OpenAI Agents SDK packages agents, tools, handoffs and tracing for supported OpenAI-oriented workflows.',
        'CrewAI role and task abstractions help when responsibilities are distinct; they are unnecessary for every short task.',
        'Compare equivalent implementations with the same fixtures, prompts, tools and failure tests.',
        'Keep business contracts and permission checks independent of framework-specific state and types.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/agentic-ai/browser-computer-use-agents"
        label="Lesson 09 · Browser and Computer-Use Agents"
        text="You have compared orchestration choices. Next, learn how browser and desktop agents interact with visual interfaces, and when a direct Playwright workflow is a better tool."
      />
    </LearnLayout>
  )
}
