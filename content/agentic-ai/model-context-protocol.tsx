import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function ModelContextProtocol() {
  return (
    <LearnLayout
      title="Model Context Protocol (MCP) — Connecting Agents to Tools and Data"
      description="How MCP clients and servers work, building a small MCP server in Python, and the security model for exposing tools."
      section="Agentic AI & Automation — Lesson 06"
      readTime="35 min"
    >
      <Part n={1} label="The connection model" title="MCP Is a Shared Contract, Not an Agent">
        <P>
          An agent needs access to capabilities outside its model: a ticket lookup, a policy document, or a request for a human
          to review. Without a common interface, every application needs a separate adapter for every tool provider. The Model
          Context Protocol (MCP) defines a standard way for an application to discover and use context and capabilities exposed
          by servers.
        </P>
        <P>
          Think in three roles. An <strong>MCP host</strong> is the user-facing AI application that owns the conversation and
          policy decisions. An <strong>MCP client</strong> lives inside that host and manages a connection to one server. An
          <strong>MCP server</strong> exposes a bounded set of capabilities. A host may run multiple clients, one per server;
          the model itself is not the client and should not receive credentials directly.
        </P>
        <Callout type="info">
          MCP standardises how capabilities are described and called. It does not make a tool trustworthy, grant the model
          permission to use every tool, or guarantee that returned content is safe.
        </Callout>
      </Part>

      <Part n={2} label="Three primitives" title="Tools, Resources and Prompts Have Different Jobs">
        <P>
          A useful server names each capability clearly and returns only what the host needs. These primitives are related, but
          they are not interchangeable. In particular, a tool call can change external state, while reading a resource should
          be treated as data retrieval.
        </P>
        <Table
          head={['Primitive', 'Purpose', 'Support-agent example', 'Design check']}
          rows={[
            ['Tool', 'A callable operation with a name, input and result', 'Look up an order by an authenticated order reference', 'Can this operation change state? What authorisation does it need?'],
            ['Resource', 'Addressable context the client can read', 'A versioned refund policy document', 'Is the content scoped, current and safe to expose?'],
            ['Prompt', 'A reusable prompt template a host may present or use', 'A template for summarising a delivery issue', 'Does it contain instructions only, or accidentally imply authority?'],
          ]}
        />
        <Callout type="tip">
          Prefer a small, purpose-built tool such as <code>lookup_order</code> over a general <code>query_database</code> tool.
          Narrow inputs are easier to explain, test, authorise and audit.
        </Callout>
      </Part>

      <Part n={3} label="Build a server" title="Expose a Small Python Server with FastMCP">
        <P>
          The official Python SDK provides a FastMCP-style API for declaring tools, resources and prompts. This example exposes
          fictional store support data only. It demonstrates the server shape; replace the in-memory records with an authorised
          service in a real deployment, not with a direct production database connection.
        </P>
        <Code lang="bash" code={`
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\\Scripts\\activate
pip install mcp
`} />
        <Code file="support_server.py" code={`
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("support-demo")

# Teaching fixture only. A real lookup must also verify the caller's access.
ORDERS = {
    "ORD-1001": {"status": "in_transit", "eta": "2026-11-12", "total_paise": 159900},
}
REFUND_POLICY = "Refunds are reviewed against the order status and payment history."

@mcp.tool()
def lookup_order(order_id: str) -> dict:
    """Return the status of a demo order by its reference."""
    order = ORDERS.get(order_id.strip().upper())
    if order is None:
        return {"found": False, "message": "No matching order."}
    return {"found": True, "order_id": order_id.upper(), **order}

@mcp.resource("store://policies/refunds")
def refund_policy() -> str:
    """Read the demo store's refund policy."""
    return REFUND_POLICY

@mcp.prompt()
def explain_delay(order_id: str, status: str) -> str:
    """Draft a concise, empathetic delivery update for a customer."""
    return (
        f"Explain that order {order_id} is currently {status}. "
        "Do not promise a delivery time beyond the verified ETA."
    )

if __name__ == "__main__":
    # The host configures the transport and starts this process.
    mcp.run()
`} />
        <P>
          A server declaration is not a full application: it does not authenticate a customer, prove order ownership, or
          decide whether a refund should be issued. Keep those responsibilities in trusted application services and pass a
          verified identity into the service boundary.
        </P>
      </Part>

      <Part n={4} label="The boundary" title="Keep Domain Rules Outside the MCP Wrapper">
        <P>
          MCP handlers should translate the protocol input into a narrow call to your application. Validate inputs and return
          structured, minimal results. Keep persistence and business policy in ordinary functions so you can test them without
          launching a protocol server.
        </P>
        <Code file="order_service.py" code={`
from dataclasses import dataclass

@dataclass(frozen=True)
class OrderSummary:
    order_id: str
    status: str
    total_paise: int

def get_order_summary(order_id: str, records: dict[str, dict]) -> OrderSummary | None:
    normalised = order_id.strip().upper()
    if not normalised.startswith("ORD-") or len(normalised) > 24:
        return None
    record = records.get(normalised)
    if record is None:
        return None
    return OrderSummary(
        order_id=normalised,
        status=str(record["status"]),
        total_paise=int(record["total_paise"]),
    )
`} />
        <Steps items={[
          'Validate the protocol input before calling a domain service.',
          'Derive customer identity from the authenticated host context, not a model-supplied argument.',
          'Return only fields required for the requested task; do not include addresses or payment credentials by default.',
          'Represent expected not-found or policy outcomes explicitly instead of leaking database exceptions.',
        ]} />
      </Part>

      <Part n={5} label="Discover and connect" title="A Host Chooses Which Servers and Capabilities to Trust">
        <P>
          At startup, a host connects to configured servers, negotiates protocol capabilities and discovers the tools,
          resources and prompts that are available. The host decides which discovered tools to offer to a model for a given
          conversation. That is a policy decision, not an automatic consequence of discovery.
        </P>
        <P>
          For local development, a host commonly launches a server process over a local transport. Remote deployments use a
          network transport supported by both the SDK and host. Host configuration formats and transport details vary, so use
          the current official MCP documentation and the particular host's configuration guide rather than copying a stale
          launch command from a blog post.
        </P>
        <Callout type="warning">
          Treat every connected server like a new integration vendor. Review its source, declared capabilities, permissions,
          update process and data handling before enabling it for real users.
        </Callout>
        <Bullets items={[
          <span key="host">Host: owns user consent, model context, policy, and the list of enabled integrations.</span>,
          <span key="client">Client: handles a particular server connection and the protocol exchange.</span>,
          <span key="server">Server: exposes only the operations and context it is designed and authorised to provide.</span>,
        ]} />
      </Part>

      <Part n={6} label="Production design" title="Expose Less, Observe More">
        <P>
          A useful tool schema tells the model when and how to call it, but a schema is not an access-control system. Enforce
          permissions in the server or downstream service on every call. Limit response size, set timeouts at the host boundary,
          validate output types and avoid returning secrets or raw internal errors.
        </P>
        <Code file="tool_input_checks.py" code={`
def validate_order_id(value: str) -> str:
    """Accept only the public reference shape used by this demo."""
    cleaned = value.strip().upper()
    if not cleaned.startswith("ORD-") or not cleaned[4:].isalnum() or len(cleaned) > 24:
        raise ValueError("Invalid order reference")
    return cleaned

# The authenticated application context supplies customer_id separately.
def lookup_for_customer(order_id: str, customer_id: str, repository):
    safe_id = validate_order_id(order_id)
    order = repository.find_order(order_id=safe_id, customer_id=customer_id)
    if order is None:
        return {"found": False}
    return {"found": True, "status": order.status, "eta": order.verified_eta}
`} />
        <P>
          Record the server name, operation, outcome category, duration and a correlation ID. Avoid logging full prompts,
          credentials, addresses or payment details. Track failures and latency, rotate credentials, and review newly added
          tools before the host makes them available to users.
        </P>
      </Part>

      <Part n={7} label="Common mistakes" title="MCP Mistakes to Catch Early">
        <Mistakes items={[
          { mistake: 'Assuming a discovered tool is safe because it uses MCP', cause: 'Protocol compatibility says nothing about the server owner, code or permissions.', fix: 'Review and approve each server, then apply host-side allowlists and server-side authorisation.' },
          { mistake: 'Letting the model supply customer identity', cause: 'A generated argument is not proof of who is signed in.', fix: 'Bind authenticated identity in trusted host context and scope every lookup to it.' },
          { mistake: 'Making one tool do anything the backend can do', cause: 'A broad interface increases impact if the model or server is misused.', fix: 'Expose narrow operations with explicit input schemas and read/write separation.' },
          { mistake: 'Returning raw database rows and errors', cause: 'Internal fields may contain personal data, secrets or implementation details.', fix: 'Map to a small response contract and return safe, classified errors.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Build and Review a Read-Only MCP Server">
        <Practice
          title="A safe first integration for a fictional store"
          tasks={[
            'Run the FastMCP server in a virtual environment and connect it to an MCP host using that host\'s official guide.',
            'Discover the tool, resource and prompt; explain which primitive fits each capability and why.',
            'Add a read-only tool that returns a fictional order status, with input validation and a minimal response.',
            'Write unit tests for valid, malformed and unknown order references without starting the MCP server.',
            'Make an access-control plan that scopes order lookups to the signed-in customer and lists fields the tool must not return.',
          ]}
          hint="Keep demo fixtures fictional. MCP SDK examples and host setup can change; verify the current official Python SDK and host documentation before deployment."
        />
      </Part>

      <KeyTakeaways items={[
        'MCP connects a host, its protocol client and one or more servers; the model is not a trusted protocol client.',
        'Tools perform operations, resources provide addressable context, and prompts provide reusable templates.',
        'The official Python SDK supports a FastMCP-style server with declared capabilities; check current docs for transport and host setup.',
        'A schema helps a model call a tool but does not authorise the caller or make returned content safe.',
        'Keep domain logic testable outside the protocol wrapper and scope every data operation to authenticated identity.',
        'Review each server, minimise capabilities and responses, and observe operations without logging sensitive payloads.',
      ]} />

      <Bullets items={[
        <span key="docs">References: official Model Context Protocol documentation and the official Python SDK documentation; verify API and transport details against their current examples.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/agentic-ai/multi-agent-systems"
        label="Lesson 07 · Multi-Agent Systems — Supervisors and Handoffs"
        text="You can connect an agent to external capabilities. Next, decide when to coordinate several specialist agents—and when one well-designed agent is better."
      />
    </LearnLayout>
  )
}
