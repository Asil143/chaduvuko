import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function LanggraphWorkflows() {
  return (
    <LearnLayout
      title="Building Agent Workflows with LangGraph"
      description="Represent an agent as a graph of nodes and edges with typed state, conditional routing, checkpoints, and resumable runs."
      section="Agentic AI & Automation — Lesson 04"
      readTime="40 min"
    >
      <Part n={1} label="Why a graph?" title="Make Control Flow Visible">
        <P>
          A plain-Python loop is the right place to learn an agent. As the workflow grows to include retries, verification,
          approvals, and recovery, nested conditionals become harder to inspect. LangGraph lets you represent a run as a
          directed graph: nodes perform work, edges define transitions, and shared state carries the facts needed by the next
          step. The graph is still ordinary application code; a framework does not make model output trustworthy.
        </P>
        <P>
          Use a graph when you need explicit branching, loops, or resumable execution. For a fixed two-function pipeline, a
          direct Python function may be clearer and easier to maintain. Start with the simplest control flow that meets your
          product need, then introduce a graph when conditional paths or checkpoints provide real value.
        </P>
        <Table
          head={['Graph concept', 'Meaning', 'Example']}
          rows={[
            ['State', 'Shared structured data for this run', 'Question, tool observations, final answer'],
            ['Node', 'A function that reads state and returns updates', 'Search an approved knowledge source'],
            ['Edge', 'A transition from one node to another', 'After search, continue to answer'],
            ['Conditional edge', 'A transition chosen from a state-dependent route', 'Search if evidence is missing; otherwise finish'],
            ['Checkpointer', 'Persistence for graph state between invocations', 'Resume a waiting run by its thread ID'],
          ]}
        />
        <Callout type="info">
          A graph defines orchestration, not business authorization. Put permission checks in the tools and application service
          that perform the action, not only in a graph route or model instruction.
        </Callout>
      </Part>

      <Part n={2} label="Setup" title="Begin With the Stable Graph Primitives">
        <P>
          Add LangGraph to the project environment using its official installation guidance. The examples below use the
          well-established <code>StateGraph</code>, <code>START</code>, <code>END</code>, conditional-edge, and checkpointer
          APIs. Consult the current official docs for dependency setup and compatible package releases; this lesson does not
          pin a version or assume a provider model.
        </P>
        <Code lang="bash" code={`
python -m venv .venv
source .venv/bin/activate
pip install langgraph
`} />
        <P>
          Keep model and provider configuration in environment variables if you add an LLM node. No model is needed for the
          first examples: deterministic nodes make the graph easier to run, inspect, and test. Connect a tool-calling model
          only after its proposed actions are validated by the same safe boundaries from the earlier lessons.
        </P>
        <Callout type="tip">
          Framework APIs evolve. Prefer the official LangGraph Python documentation for imports and current checkpoint
          behavior, and avoid copying a snippet that depends on an unverified version-specific option.
        </Callout>
      </Part>

      <Part n={3} label="State and nodes" title="Define State, Then Write Small Nodes">
        <P>
          In a graph, nodes should be small and return state updates rather than mutating hidden globals. A TypedDict makes the
          fields visible to readers and type checkers. This first graph takes a question, performs a local lookup, and returns
          a brief answer. It is intentionally deterministic so you can focus on the path through the graph.
        </P>
        <Code file="basic_graph.py" code={`
from typing import TypedDict
from langgraph.graph import END, START, StateGraph

class SupportState(TypedDict):
    question: str
    order_status: str
    answer: str


def lookup_order(state: SupportState) -> dict[str, str]:
    order_id = state["question"].rsplit(" ", 1)[-1].strip("?.! ")
    orders = {"A104": "Out for delivery", "A105": "Delivered"}
    return {"order_status": orders.get(order_id, "Order not found")}


def write_answer(state: SupportState) -> dict[str, str]:
    return {"answer": "Order status: " + state["order_status"]}


builder = StateGraph(SupportState)
builder.add_node("lookup_order", lookup_order)
builder.add_node("write_answer", write_answer)
builder.add_edge(START, "lookup_order")
builder.add_edge("lookup_order", "write_answer")
builder.add_edge("write_answer", END)

graph = builder.compile()
result = graph.invoke({"question": "Check order A104", "order_status": "", "answer": ""})
print(result["answer"])
`} />
        <P>
          The node function returns only the fields it updates. The graph merges those updates into state and moves along the
          declared edges. Keep state limited to the information needed for routing, results, and recovery; large documents and
          secrets usually belong in external systems referenced by IDs.
        </P>
      </Part>

      <Part n={4} label="Routing" title="Use Conditional Edges for Decisions">
        <P>
          A conditional edge selects a path from the current state. The route function should return a known label, and the
          mapping should enumerate the destinations. This example searches only when the input contains an order reference;
          otherwise it asks for clarification. In an LLM agent, a model might propose whether to use a tool, but your graph
          still needs allowlisted destinations and bounded cycles.
        </P>
        <Code file="conditional_graph.py" code={`
from typing import TypedDict
from langgraph.graph import END, START, StateGraph

class LookupState(TypedDict):
    question: str
    answer: str
    found_reference: bool


def classify(state: LookupState) -> dict[str, bool]:
    found = any(
        token.startswith("A") and token[1:].isdigit()
        for part in state["question"].split()
        for token in [part.strip("?.!,")]
    )
    return {"found_reference": found}


def route(state: LookupState) -> str:
    return "lookup" if state["found_reference"] else "clarify"


def lookup(state: LookupState) -> dict[str, str]:
    return {"answer": "I would look up the order through the authorised order service."}


def ask_for_reference(state: LookupState) -> dict[str, str]:
    return {"answer": "Please share the order reference so I can check it."}


builder = StateGraph(LookupState)
builder.add_node("classify", classify)
builder.add_node("lookup", lookup)
builder.add_node("clarify", ask_for_reference)
builder.add_edge(START, "classify")
builder.add_conditional_edges("classify", route, {"lookup": "lookup", "clarify": "clarify"})
builder.add_edge("lookup", END)
builder.add_edge("clarify", END)
graph = builder.compile()

initial = {"question": "Where is order A104?", "answer": "", "found_reference": False}
print(graph.invoke(initial)["answer"])
`} />
        <P>
          This example does not call a real order service; it teaches graph routing only. A production lookup must also check
          that the authenticated user may access the requested order, handle missing records, and return a deliberately small
          result. Route labels are control-flow values, not permission grants.
        </P>
        <Callout type="warning">
          A conditional cycle can run forever if no branch changes the state needed to exit. Track attempts or progress and
          enforce a maximum iteration policy before connecting any model-driven route.
        </Callout>
      </Part>

      <Part n={5} label="Loops" title="Make Progress and Termination Explicit">
        <P>
          Agent graphs often cycle from a decision node to a tool node and back. A loop needs a measurable exit: a final
          answer, a completed plan, a human handoff, or an exhausted step budget. One safe design increments a counter in the
          node that actually performs the action and routes to a stop state after the limit. A repeated call should also be
          detected when it is identical and has no new evidence.
        </P>
        <Steps items={[
          'Define terminal states before wiring the graph: complete, needs input, waiting, and failed.',
          'Increment a step or retry counter at the action boundary.',
          'Route to a controlled stop when the budget is used up or no progress is made.',
          'Test both the happy path and a decision that keeps asking for the same action.',
        ]} />
        <P>
          Avoid relying solely on a model instruction such as &quot;stop after a few steps.&quot; Put limits in application state
          and runtime configuration, add request deadlines and tool timeouts, and provide an explicit response for an
          exhausted run. An outer service deadline remains useful even when the graph has its own counter.
        </P>
      </Part>

      <Part n={6} label="Checkpointing" title="Persist State for Recovery">
        <P>
          A checkpointer saves graph state associated with a thread so a later invocation can continue the same run. The
          in-memory saver is convenient for local learning and tests but is not durable across process restarts. Production
          persistence needs a supported durable backend, appropriate retention, access controls, and a strategy for state
          schema changes. The thread identifier must be generated and scoped by your application; do not let an untrusted
          user choose another person&apos;s run identifier.
        </P>
        <Code file="checkpoint_graph.py" code={`
from typing import TypedDict
from langgraph.checkpoint.memory import InMemorySaver
from langgraph.graph import END, START, StateGraph

class CounterState(TypedDict):
    count: int


def increment(state: CounterState) -> dict[str, int]:
    return {"count": state["count"] + 1}


builder = StateGraph(CounterState)
builder.add_node("increment", increment)
builder.add_edge(START, "increment")
builder.add_edge("increment", END)
checkpointer = InMemorySaver()
graph = builder.compile(checkpointer=checkpointer)
config = {"configurable": {"thread_id": "demo-run-1"}}

result = graph.invoke({"count": 0}, config)
snapshot = graph.get_state(config)
print(result["count"], snapshot.values["count"])
`} />
        <P>
          The checkpointer stores a snapshot for the thread, and <code>graph.get_state(config)</code> lets the application inspect
          that persisted graph state. The next lesson uses an interrupt to demonstrate continuation. In-memory data is
          process-local and suited to a demonstration, not a production durability promise. In a real
          application, persist only what the workflow needs, treat the checkpoint as sensitive data, and define ownership,
          expiry, deletion, and deployment behavior.
        </P>
        <Callout type="example">
          A checkpoint is useful for a lengthy IRCTC-style help workflow that pauses for a user response. It can preserve the
          current stage and evidence; it does not replace the booking system&apos;s authoritative reservation record.
        </Callout>
      </Part>

      <Part n={7} label="Testing and operating" title="Test Nodes and Whole Paths">
        <P>
          Test node functions independently with small state fixtures, then invoke the compiled graph to verify routing and
          end states. Include missing data, invalid actions, tool errors, exhausted retries, and checkpoint resume. For a
          model node, keep a set of representative test inputs and assert the resulting route or tool arguments rather than
          expecting exact prose from a generative response.
        </P>
        <Table
          head={['Test layer', 'Assert', 'Why']}
          rows={[
            ['Node unit test', 'Input state yields the expected update', 'Finds logic errors without orchestration noise'],
            ['Graph path test', 'Expected nodes run and terminal status is reached', 'Catches incorrect edge and route wiring'],
            ['Checkpoint test', 'A run resumes under its own thread context', 'Validates pause and recovery behavior'],
            ['Integration test', 'Tool permission, timeout, and response contract', 'Checks real boundaries without unsafe side effects'],
          ]}
        />
        <P>
          Trace node names, transition, timing, outcome, and a safe run identifier. Do not put API keys or full personal
          records in state merely because it is convenient. Monitor graph duration, repeated-node patterns, tool errors, and
          human handoffs; these often reveal a confusing route before users report it.
        </P>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Choosing a graph framework before understanding the control flow', cause: 'Framework structure can obscure simple logic and add maintenance burden.', fix: 'Prototype the loop in plain Python, then use a graph when branching or persistence justifies it.' },
          { mistake: 'Putting every object into graph state', cause: 'State becomes large, sensitive, difficult to checkpoint, and hard to migrate.', fix: 'Keep compact values and references; store large or authoritative data in its owning service.' },
          { mistake: 'Treating a route as authorization', cause: 'A valid graph edge does not prove a user may perform an action.', fix: 'Re-check identity and permissions inside the application tool or service.' },
          { mistake: 'Using an in-memory saver as production persistence', cause: 'Process memory can disappear on restart and is not shared across workers.', fix: 'Use a supported durable backend with access control, retention, and schema migration plans.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Build and Checkpoint a Support Graph">
        <Practice
          title="A small conditional graph with a testable stop path"
          tasks={[
            'Run the deterministic graph examples and draw each node and edge in order.',
            'Add a route for an unknown order reference that ends with a clear not-found result.',
            'Add a step counter to a looping graph and route to a stop status at its limit.',
            'Compile a graph with InMemorySaver and inspect the saved state for its thread.',
            'Write tests for a missing reference, a successful lookup, and a tool timeout; verify no path loops forever.',
          ]}
          hint="Keep this exercise deterministic. Follow current LangGraph docs if installed package behavior differs, and use the in-memory saver only for local testing."
        />
      </Part>

      <KeyTakeaways items={[
        'LangGraph models orchestration as state, nodes, ordinary edges, and conditional edges.',
        'Start with small deterministic nodes and make terminal paths, loops, and budgets explicit.',
        'A graph route is not an authorization check; tools must enforce access at execution time.',
        'A checkpointer supports recovery by thread, but the thread ID must be securely scoped.',
        'InMemorySaver is useful for demonstrations and tests, not durable production storage.',
        'Test node behavior, graph routes, failure paths, and resume behavior; monitor transitions without logging secrets.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/agentic-ai/human-in-the-loop"
        label="Lesson 05 · Human-in-the-Loop Approvals and Interrupts"
        text="Some graph paths must pause before acting. Next, add an approval gate, persist the pause, and resume safely with a human decision."
      />
    </LearnLayout>
  )
}
