import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Agents and Tool Use — Building Autonomous AI Systems — Chaduvuko',
  description:
    'LLMs that plan, use tools, and execute multi-step tasks autonomously. ReAct, tool calling, memory, and the architecture patterns behind production AI agents.',
}

const S = {
  tag: {
    fontSize: 11, fontWeight: 700 as const, letterSpacing: '0.1em',
    textTransform: 'uppercase' as const, color: 'var(--accent)',
    fontFamily: 'var(--font-mono)', display: 'block' as const, marginBottom: 10,
  },
  h2: {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)',
    fontWeight: 900 as const, letterSpacing: '-1.2px',
    color: 'var(--text)', marginBottom: 14, lineHeight: 1.15,
  },
  h3: {
    fontFamily: 'var(--font-display)', fontSize: 17,
    fontWeight: 700 as const, letterSpacing: '-0.4px',
    color: 'var(--text)', marginBottom: 10, marginTop: 28,
  },
  p: { fontSize: 15, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 16 },
  ps: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 10 },
  sec: { paddingBottom: 56, paddingTop: 8, borderBottom: '1px solid var(--border)' },
  code: {
    fontFamily: 'var(--font-mono)', fontSize: 12,
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: 4, padding: '1px 6px', color: 'var(--accent)',
  },
}

function Div() { return <div style={{ height: 56 }} /> }

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, overflow: 'hidden', marginBottom: 24,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 16px', borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
      }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
        }}>
          {label ?? 'python'}
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
      </div>
      <pre style={{
        padding: '18px 20px', margin: 0, overflowX: 'auto',
        fontFamily: 'var(--font-mono)', fontSize: 13,
        lineHeight: 1.75, color: 'var(--text)',
      }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

function AnalogyBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(0,230,118,0.04)',
      border: '1px solid rgba(0,230,118,0.2)',
      borderRadius: 8, padding: '16px 20px', marginBottom: 20,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase' as const, color: '#00e676',
        fontFamily: 'var(--font-mono)', marginBottom: 10,
      }}>
        🧠 Analogy — read this first
      </div>
      {children}
    </div>
  )
}


function ConceptBox({ title, children, color = '#7b61ff' }: {
  title: string; children: React.ReactNode; color?: string
}) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid ${color}30`,
      borderLeft: `4px solid ${color}`,
      borderRadius: 8, padding: '16px 20px', marginBottom: 20,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase' as const, color,
        fontFamily: 'var(--font-mono)', marginBottom: 10,
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function ErrorBlock({ error, cause, fix }: { error: string; cause: string; fix: string }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 8, overflow: 'hidden', marginBottom: 12,
    }}>
      <div style={{
        padding: '9px 14px', background: 'rgba(226,75,74,0.08)',
        borderBottom: '1px solid var(--border)',
        fontFamily: 'var(--font-mono)', fontSize: 12,
        color: '#ff4757', fontWeight: 600,
      }}>
        {error}
      </div>
      <div style={{ padding: '12px 14px' }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
          textTransform: 'uppercase' as const, color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', marginBottom: 4,
        }}>Why it happens</div>
        <p style={{ ...S.ps, marginBottom: 10 }}>{cause}</p>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
          textTransform: 'uppercase' as const, color: '#00e676',
          fontFamily: 'var(--font-mono)', marginBottom: 4,
        }}>Fix</div>
        <p style={{ ...S.ps, marginBottom: 0 }}>{fix}</p>
      </div>
    </div>
  )
}

export default function AgentsToolUsePage() {
  return (
    <LearnLayout
      title="Agents and Tool Use — Building Autonomous AI Systems"
      description="LLMs that plan, use tools, and execute multi-step tasks autonomously. ReAct, tool calling, memory, and the architecture patterns behind production AI agents."
      section="Generative AI"
      readTime="36–46 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="generative-ai" topic="agents-tool-use" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — what agents are beyond Module 54</span>
        <h2 style={S.h2}>
          Module 54 built a toy ReAct agent with text parsing.
          This module builds production agents — structured tool calling,
          persistent memory, failure recovery, and the architectural patterns
          top tech teams actually ship.
        </h2>

        <p style={S.p}>
          The gap between a demo agent and a production agent is enormous.
          A demo agent works when everything goes right. A production agent
          handles tool failures gracefully, detects when it is stuck in a loop,
          maintains context across sessions, asks for clarification instead of
          hallucinating, and refuses irreversible actions without confirmation.
          These are not edge cases — they are the majority of real interactions.
        </p>

        <p style={S.p}>
          Stripe's internal dispute resolution agent handles merchant queries
          that span 8–12 tool calls: look up transaction, check dispute status,
          retrieve relevant policy, draft response, validate response, send email,
          update CRM, close ticket. Any step can fail. Any step can return
          unexpected data. The agent must handle all of this without a human
          in the loop on every call. Getting this right is an engineering problem
          as much as an ML problem.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A junior employee (chatbot) answers questions.
            A senior employee (basic agent) uses tools when needed.
            A reliable professional (production agent) uses tools correctly,
            handles failures without panicking, escalates when genuinely stuck,
            keeps records of what they did and why, and never sends an important
            email without double-checking the draft. The gap between junior and
            reliable professional is not knowledge — it is judgment, error handling,
            and knowing when to stop and ask.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            Production agents are not smarter LLMs. They are better-engineered
            systems around the same LLMs. The reliability comes from the
            scaffolding — structured tool schemas, retry logic, loop detection,
            confirmation gates, and comprehensive logging.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          All code uses Groq API (free tier, fast) for the LLM and implements
          everything from scratch before showing production patterns.
          Install: <span style={S.code as React.CSSProperties}>pip install groq</span>.
          The function calling format shown is identical across Groq, OpenAI,
          and Anthropic tool use APIs.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — STRUCTURED TOOL CALLING ═════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The foundation</span>
        <h2 style={S.h2}>Structured tool calling — JSON schemas, not text parsing</h2>

        <p style={S.p}>
          Module 54 parsed tool calls by extracting text between
          "Action:" and "(" with regex. This breaks constantly — the LLM
          formats output slightly differently each run, adds punctuation,
          or skips the format entirely. Structured tool calling solves this:
          you define tools as JSON schemas, the API enforces that the LLM
          returns a structured tool_call object, and you execute the
          corresponding function with validated arguments. No regex. No parsing.
        </p>

        <CodeBlock code={`import os, json
from groq import Groq

client = Groq(api_key=os.environ.get('GROQ_API_KEY'))

# ── Define production Stripe agent tools ────────────────────────────
STRIPE_TOOLS = [
    {
        'type': 'function',
        'function': {
            'name': 'get_transaction',
            'description': (
                'Fetch full details of a Stripe transaction by ID. '
                'Returns status, amount, merchant, customer, payment method, '
                'and timeline. Use this whenever a transaction ID is mentioned.'
            ),
            'parameters': {
                'type': 'object',
                'properties': {
                    'transaction_id': {
                        'type': 'string',
                        'description': 'Stripe transaction ID (e.g. pay_ABC123)',
                    },
                },
                'required': ['transaction_id'],
            },
        },
    },
    {
        'type': 'function',
        'function': {
            'name': 'get_merchant_account',
            'description': (
                'Fetch merchant account details including settlement cycle, '
                'enabled payment methods, KYC status, and account limits.'
            ),
            'parameters': {
                'type': 'object',
                'properties': {
                    'merchant_id': {'type': 'string'},
                },
                'required': ['merchant_id'],
            },
        },
    },
    {
        'type': 'function',
        'function': {
            'name': 'search_knowledge_base',
            'description': (
                'Search Stripe documentation and policy knowledge base. '
                'Use for questions about fees, error codes, integration steps, '
                'settlement policies, or any technical or policy question.'
            ),
            'parameters': {
                'type': 'object',
                'properties': {
                    'query': {
                        'type': 'string',
                        'description': 'Search query in plain English',
                    },
                },
                'required': ['query'],
            },
        },
    },
    {
        'type': 'function',
        'function': {
            'name': 'create_support_ticket',
            'description': (
                'Create a support ticket for issues requiring human review. '
                'Use when you cannot resolve the issue with available tools, '
                'or when the issue requires manual account intervention.'
            ),
            'parameters': {
                'type': 'object',
                'properties': {
                    'merchant_id':  {'type': 'string'},
                    'issue_type':   {
                        'type': 'string',
                        'enum': ['technical', 'payment', 'settlement', 'account', 'dispute'],
                    },
                    'description':  {'type': 'string', 'description': 'Detailed issue description'},
                    'priority':     {
                        'type': 'string',
                        'enum': ['low', 'medium', 'high', 'critical'],
                    },
                },
                'required': ['merchant_id', 'issue_type', 'description', 'priority'],
            },
        },
    },
    {
        'type': 'function',
        'function': {
            'name': 'initiate_refund',
            'description': (
                'IRREVERSIBLE: Initiate a refund for a transaction. '
                'Only call this after confirming with the user. '
                'Cannot be cancelled once initiated.'
            ),
            'parameters': {
                'type': 'object',
                'properties': {
                    'transaction_id': {'type': 'string'},
                    'amount':         {'type': 'number', 'description': 'Refund amount in USD'},
                    'reason':         {'type': 'string'},
                },
                'required': ['transaction_id', 'amount', 'reason'],
            },
        },
    },
]

# ── Tool implementations ───────────────────────────────────────────────
MOCK_DB = {
    'pay_ABC123': {
        'id': 'pay_ABC123', 'status': 'captured', 'amount': 4999,
        'currency': 'USD', 'merchant_id': 'MID001',
        'customer': 'Sarah Chen', 'method': 'ach',
        'created_at': '2026-03-28T14:23:00Z',
    },
    'pay_XYZ789': {
        'id': 'pay_XYZ789', 'status': 'failed', 'amount': 12500,
        'currency': 'USD', 'merchant_id': 'MID002',
        'customer': 'Michael Brown', 'method': 'card',
        'error_code': 'GATEWAY_ERROR',
        'created_at': '2026-03-29T09:11:00Z',
    },
}

def get_transaction(transaction_id: str) -> dict:
    txn = MOCK_DB.get(transaction_id)
    if txn:
        return txn
    return {'error': 'not_found', 'message': f'Transaction {transaction_id} not found'}

def get_merchant_account(merchant_id: str) -> dict:
    return {
        'id': merchant_id, 'name': 'Demo Merchant',
        'settlement_cycle': 'T+2', 'kyc_status': 'verified',
        'enabled_methods': ['ach', 'card', 'wire'],
        'monthly_limit_usd': 500000,
    }

def search_knowledge_base(query: str) -> dict:
    kb = {
        'gateway error': 'GATEWAY_ERROR means the bank gateway timed out. The payment can be retried after 5 minutes.',
        'settlement': 'Domestic payments settle T+2 business days. Minimum settlement amount $100.',
        'refund': 'Refunds take 2-3 days for ACH, 5-7 days for credit cards. No fee charged.',
        'instant transfer': 'Instant transfers are processed immediately. Instant transfer limit is $1,000 per transaction.',
    }
    query_lower = query.lower()
    for key, answer in kb.items():
        if key in query_lower:
            return {'result': answer, 'source': 'stripe-docs'}
    return {'result': 'No specific information found. Please contact support.', 'source': 'none'}

def create_support_ticket(merchant_id, issue_type, description, priority) -> dict:
    import random
    ticket_id = f'TKT{random.randint(10000, 99999)}'
    return {'ticket_id': ticket_id, 'status': 'created', 'eta': '2-4 business hours'}

IRREVERSIBLE_TOOLS = {'initiate_refund'}

TOOL_FUNCTIONS = {
    'get_transaction':      get_transaction,
    'get_merchant_account': get_merchant_account,
    'search_knowledge_base': search_knowledge_base,
    'create_support_ticket': create_support_ticket,
}

print("Tool schemas defined:")
for tool in STRIPE_TOOLS:
    fn   = tool['function']
    req  = fn['parameters'].get('required', [])
    irr  = '⚠ IRREVERSIBLE' if fn['name'] in IRREVERSIBLE_TOOLS else ''
    print(f"  {fn['name']:<30} required={req}  {irr}")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — PRODUCTION AGENT LOOP ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The agent loop</span>
        <h2 style={S.h2}>Production agent — loop detection, failure recovery, confirmation gates</h2>

        <CodeBlock code={`import os, json, hashlib
from groq import Groq
from dataclasses import dataclass, field
from typing import Callable

client = Groq(api_key=os.environ.get('GROQ_API_KEY'))

SYSTEM_PROMPT = """You are a Stripe merchant support agent.

CAPABILITIES: You can look up transactions, merchant accounts, search documentation,
create support tickets, and (with explicit confirmation) initiate refunds.

BEHAVIOUR RULES:
1. Always look up transaction/account data before answering questions about specific cases.
2. For IRREVERSIBLE actions (initiate_refund): state exactly what you will do and ask for confirmation before calling the tool. Never call initiate_refund without user confirmation in the current message.
3. If a tool returns an error, try once with corrected parameters. If it fails again, create a support ticket.
4. If you cannot resolve the issue after 3 tool calls, create a support ticket and explain why.
5. Be concise. Merchants are busy. Lead with the answer, then the detail.
"""

@dataclass
class AgentState:
    messages:       list[dict] = field(default_factory=list)
    tool_call_log:  list[dict] = field(default_factory=list)
    call_hashes:    set        = field(default_factory=set)   # for loop detection
    total_calls:    int        = 0
    max_calls:      int        = 10

class ProductionAgent:
    def __init__(self, tools, tool_fns, irreversible, max_calls=10):
        self.tools        = tools
        self.tool_fns     = tool_fns
        self.irreversible = irreversible
        self.max_calls    = max_calls

    def _call_hash(self, name: str, args: dict) -> str:
        """Hash a tool call to detect identical repeated calls."""
        return hashlib.md5(f"{name}:{json.dumps(args, sort_keys=True)}".encode()).hexdigest()

    def _execute_tool(self, name: str, args: dict) -> dict:
        """Execute a tool with error handling."""
        if name not in self.tool_fns:
            return {'error': 'unknown_tool', 'message': f'Tool {name} not available'}
        try:
            return self.tool_fns[name](**args)
        except TypeError as e:
            return {'error': 'invalid_args', 'message': str(e)}
        except Exception as e:
            return {'error': 'execution_error', 'message': str(e)}

    def run(self, user_message: str,
             history: list[dict] = None,
             confirmation_fn: Callable = None) -> dict:
        """
        Run the agent loop for a single user message.
        Returns: {'answer': str, 'tool_calls': list, 'requires_confirmation': bool}
        """
        state = AgentState(max_calls=self.max_calls)
        state.messages = [{'role': 'system', 'content': SYSTEM_PROMPT}]
        if history:
            state.messages.extend(history)
        state.messages.append({'role': 'user', 'content': user_message})

        for turn in range(self.max_calls):
            # Call LLM
            response = client.chat.completions.create(
                model='openai/gpt-oss-120b',
                messages=state.messages,
                tools=self.tools,
                tool_choice='auto',
                temperature=0,
                max_tokens=600,
            )
            msg = response.choices[0].message

            # No tool call — final answer
            if not msg.tool_calls:
                return {
                    'answer':                msg.content or '',
                    'tool_calls':            state.tool_call_log,
                    'requires_confirmation': False,
                    'turns':                 turn + 1,
                }

            # Process tool calls
            state.messages.append({
                'role': 'assistant',
                'content': msg.content,
                'tool_calls': [tc.model_dump() for tc in msg.tool_calls],
            })

            for tc in msg.tool_calls:
                fn_name = tc.function.name
                fn_args = json.loads(tc.function.arguments)
                state.total_calls += 1

                # ── Loop detection ────────────────────────────────────
                call_hash = self._call_hash(fn_name, fn_args)
                if call_hash in state.call_hashes:
                    result = {
                        'error': 'loop_detected',
                        'message': f'{fn_name} was already called with these arguments. Try a different approach.',
                    }
                    print(f"  ⚠ Loop detected: {fn_name}({fn_args})")
                else:
                    state.call_hashes.add(call_hash)

                    # ── Confirmation gate for irreversible actions ────
                    if fn_name in self.irreversible:
                        confirm_msg = (
                            f"About to execute IRREVERSIBLE action: "
                            f"{fn_name}({json.dumps(fn_args)}). "
                            f"Confirm? This cannot be undone."
                        )
                        if confirmation_fn:
                            confirmed = confirmation_fn(confirm_msg)
                        else:
                            confirmed = False   # default: deny irreversible

                        if not confirmed:
                            result = {'cancelled': True, 'message': 'Action cancelled — requires explicit confirmation'}
                            print(f"  ⛔ Irreversible action blocked: {fn_name}")
                        else:
                            result = self._execute_tool(fn_name, fn_args)
                    else:
                        result = self._execute_tool(fn_name, fn_args)

                state.tool_call_log.append({
                    'tool': fn_name, 'args': fn_args, 'result': result,
                })
                print(f"  → {fn_name}({fn_args}) = {str(result)[:80]}...")

                state.messages.append({
                    'role': 'tool',
                    'tool_call_id': tc.id,
                    'content': json.dumps(result),
                })

        return {
            'answer':                'Maximum tool calls reached. Creating support ticket.',
            'tool_calls':            state.tool_call_log,
            'requires_confirmation': False,
            'turns':                 self.max_calls,
        }

# ── Initialise and run ─────────────────────────────────────────────────
agent = ProductionAgent(
    tools=STRIPE_TOOLS,
    tool_fns=TOOL_FUNCTIONS,
    irreversible=IRREVERSIBLE_TOOLS,
    max_calls=8,
)

test_queries = [
    "Transaction pay_ABC123 — what's the status?",
    "What does GATEWAY_ERROR mean and how do I fix it?",
    "Transaction pay_XYZ789 failed — can you look into it?",
]

for query in test_queries:
    print(f"\n{'='*55}")
    print(f"User: {query}")
    result = agent.run(query)
    print(f"Agent: {result['answer'][:200]}")
    print(f"Tools used: {len(result['tool_calls'])}, Turns: {result['turns']}")`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — AGENT MEMORY ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Persistence across turns</span>
        <h2 style={S.h2}>Three memory types — conversation, episodic, and semantic</h2>

        <p style={S.p}>
          A stateless agent forgets every conversation the moment it ends.
          Production agents need three types of memory working together.
          Conversation memory is the message history within the current session —
          the agent knows what was said earlier in this conversation.
          Episodic memory stores summaries of past sessions — the agent knows
          this merchant called last week about the same issue.
          Semantic memory is the knowledge base (RAG from Module 67) —
          the agent knows Stripe's policies and documentation.
        </p>

        <CodeBlock code={`import json
from dataclasses import dataclass, field
from collections import deque
from sentence_transformers import SentenceTransformer
import faiss, numpy as np, time

embedder = SentenceTransformer('all-MiniLM-L6-v2')

# ── Memory 1: Conversation buffer (short-term) ────────────────────────
@dataclass
class ConversationMemory:
    max_turns:    int = 20
    system:       str = ''
    history:      deque = field(default_factory=lambda: deque(maxlen=20))
    summary:      str = ''

    def add(self, role: str, content: str):
        self.history.append({'role': role, 'content': content})

    def get_messages(self) -> list[dict]:
        msgs = []
        if self.system:
            msgs.append({'role': 'system', 'content': self.system})
        if self.summary:
            msgs.append({'role': 'system',
                          'content': f'Previous conversation summary: {self.summary}'})
        msgs.extend(list(self.history))
        return msgs

    def compress(self, llm_fn):
        """Summarise old messages when approaching context limit."""
        if len(self.history) < 15:
            return
        old = list(self.history)[:10]
        prompt = (
            'Summarise this support conversation in 2-3 sentences, '
            'keeping all important facts, transaction IDs, and outcomes:\n\n' +
            '\n'.join(f"{m['role']}: {m['content']}" for m in old)
        )
        self.summary = llm_fn(prompt)
        for _ in range(10):
            self.history.popleft()

# ── Memory 2: Episodic memory (long-term) ────────────────────────────
@dataclass
class EpisodicMemory:
    """
    Stores summaries of past conversations per merchant.
    In production: persisted in Redis or Postgres.
    """
    store: dict = field(default_factory=dict)   # merchant_id → list of episodes

    def save_episode(self, merchant_id: str, summary: str, metadata: dict):
        if merchant_id not in self.store:
            self.store[merchant_id] = []
        self.store[merchant_id].append({
            'summary':   summary,
            'timestamp': time.time(),
            'metadata':  metadata,
        })

    def get_context(self, merchant_id: str, n_recent: int = 3) -> str:
        episodes = self.store.get(merchant_id, [])
        if not episodes:
            return ''
        recent = sorted(episodes, key=lambda e: e['timestamp'], reverse=True)[:n_recent]
        return '\n'.join([
            f"[{i+1}] {ep['summary']}"
            for i, ep in enumerate(recent)
        ])

    def extract_and_save(self, merchant_id: str,
                          conversation: str, llm_fn) -> str:
        """Ask LLM to summarise the conversation for future retrieval."""
        prompt = (
            f"Summarise this support conversation in 1-2 sentences for future reference. "
            f"Include: issue type, resolution, any transaction IDs, outcome:\n\n"
            f"{conversation}"
        )
        summary = llm_fn(prompt)
        self.save_episode(merchant_id, summary,
                           {'source': 'conversation'})
        return summary

# ── Memory 3: Semantic memory (knowledge base) ────────────────────────
class SemanticMemory:
    """Vector store for Stripe documentation — same as RAG Module 67."""
    def __init__(self):
        self.chunks = []
        self.index  = None

    def add_documents(self, documents: list[str]):
        self.chunks = documents
        embs = embedder.encode(documents, normalize_embeddings=True)
        dim  = embs.shape[1]
        self.index = faiss.IndexFlatIP(dim)
        self.index.add(embs)

    def retrieve(self, query: str, k: int = 3) -> list[str]:
        if self.index is None:
            return []
        q = embedder.encode([query], normalize_embeddings=True)
        _, idxs = self.index.search(q, k)
        return [self.chunks[i] for i in idxs[0] if i >= 0]

# ── Demonstrate memory system ─────────────────────────────────────────
episodic = EpisodicMemory()

# Simulate past conversation
episodic.save_episode(
    'MID001',
    'Merchant reported GATEWAY_ERROR on transaction pay_XYZ789. Issue was bank-side timeout. Advised retry after 5 minutes. Resolved.',
    {'issue': 'GATEWAY_ERROR', 'resolution': 'retry'},
)
episodic.save_episode(
    'MID001',
    'Merchant asked about settlement cycle. Confirmed T+2 for domestic. No action required.',
    {'issue': 'settlement_inquiry', 'resolution': 'information_provided'},
)

context = episodic.get_context('MID001')
print("Episodic context for MID001 (injected into system prompt):")
print(context)

# In production: inject this context into the agent's system prompt
merchant_system = SYSTEM_PROMPT + f"\n\nPAST INTERACTIONS WITH THIS MERCHANT:\n{context}"
print(f"\nSystem prompt now includes {len(context.split())} words of merchant history.")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — PLANNING AND MULTI-STEP TASKS ═══════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Complex task execution</span>
        <h2 style={S.h2}>Task decomposition and planning — breaking multi-step work into reliable steps</h2>

        <p style={S.p}>
          Simple queries need one tool call. Complex tasks — "process this batch
          of 50 dispute emails and resolve what you can, escalate the rest" —
          need a plan. Planning separates the reasoning about what to do
          from the execution of doing it. A planner LLM call generates the
          sequence of steps. Each step is then executed independently with
          its own error handling. This separation makes complex tasks more
          reliable because each step can be retried or skipped without
          re-planning the entire task.
        </p>

        <CodeBlock code={`import os, json
from groq import Groq
from dataclasses import dataclass
from typing import Callable

client = Groq(api_key=os.environ.get('GROQ_API_KEY'))

@dataclass
class TaskStep:
    step_id:     int
    description: str
    tool:        str
    args:        dict
    depends_on:  list[int]   # step IDs that must complete first
    status:      str = 'pending'   # pending, running, done, failed, skipped
    result:      dict = None

def plan_task(task_description: str) -> list[TaskStep]:
    """
    Ask LLM to decompose a complex task into executable steps.
    Returns a list of TaskStep objects with dependency relationships.
    """
    planning_prompt = f"""Break this task into 3-6 sequential steps.
For each step specify: step_id, description, tool (from: get_transaction,
get_merchant_account, search_knowledge_base, create_support_ticket),
args (dict), depends_on (list of step_ids that must complete first).

Return JSON: {{"steps": [...]}}

Task: {task_description}"""

    response = client.chat.completions.create(
        model='openai/gpt-oss-120b',
        messages=[{'role': 'user', 'content': planning_prompt}],
        temperature=0, max_tokens=600,
        response_format={'type': 'json_object'},
    )

    try:
        plan_data = json.loads(response.choices[0].message.content)
        steps = []
        for s in plan_data.get('steps', []):
            steps.append(TaskStep(
                step_id     = s.get('step_id', len(steps)+1),
                description = s.get('description', ''),
                tool        = s.get('tool', ''),
                args        = s.get('args', {}),
                depends_on  = s.get('depends_on', []),
            ))
        return steps
    except (json.JSONDecodeError, KeyError):
        return []

def execute_plan(steps: list[TaskStep],
                  tool_fns: dict,
                  max_retries: int = 2) -> dict:
    """
    Execute a plan step by step, handling dependencies and failures.
    Returns summary of execution results.
    """
    results = {}
    completed = set()
    failed    = set()

    for step in steps:
        # Check dependencies
        deps_met = all(d in completed for d in step.depends_on)
        if not deps_met:
            step.status = 'skipped'
            print(f"  Step {step.step_id} skipped: dependencies not met")
            continue

        print(f"  Step {step.step_id}: {step.description}")

        # Execute with retry
        success = False
        for attempt in range(max_retries):
            if step.tool not in tool_fns:
                step.result = {'error': f'Unknown tool: {step.tool}'}
                break
            try:
                result = tool_fns[step.tool](**step.args)
                if 'error' not in result:
                    step.status = 'done'
                    step.result = result
                    completed.add(step.step_id)
                    success = True
                    break
                else:
                    print(f"    Attempt {attempt+1} failed: {result['error']}")
                    step.args['_retry'] = attempt + 1   # signal retry to tool
            except Exception as e:
                print(f"    Exception: {e}")

        if not success:
            step.status = 'failed'
            failed.add(step.step_id)

        results[step.step_id] = step

    return {
        'total':     len(steps),
        'completed': len(completed),
        'failed':    len(failed),
        'skipped':   len(steps) - len(completed) - len(failed),
        'steps':     results,
    }

# ── Example: complex dispute handling task ────────────────────────────
complex_task = (
    "Merchant MID001 reports that transaction pay_ABC123 was charged to the customer "
    "but the merchant did not receive settlement. Look up the transaction, check the "
    "merchant account status, search for settlement policy, and if unresolved create "
    "a high priority support ticket."
)

print("Planning complex task:")
print(f"Task: {complex_task[:80]}...")
plan = plan_task(complex_task)

if plan:
    print(f"\nGenerated {len(plan)}-step plan:")
    for step in plan:
        print(f"  Step {step.step_id}: {step.description}")
        print(f"    Tool: {step.tool}({step.args})")
        print(f"    Depends on: {step.depends_on}")

    print("\nExecuting plan:")
    summary = execute_plan(plan, TOOL_FUNCTIONS)
    print(f"\nExecution summary:")
    print(f"  Completed: {summary['completed']}/{summary['total']}")
    print(f"  Failed:    {summary['failed']}/{summary['total']}")
else:
    print("Planning failed — LLM did not return valid JSON plan")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — PRODUCTION PATTERNS ════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What production systems look like</span>
        <h2 style={S.h2}>Observability, rate limiting, and graceful degradation</h2>

        <CodeBlock code={`import time, json, logging, hashlib
from functools import wraps
from collections import defaultdict
from dataclasses import dataclass, field
from typing import Callable, Any

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s %(levelname)s %(message)s')
logger = logging.getLogger('agent')

# ── 1. Comprehensive logging — every tool call is an audit trail ──────
def logged_tool(fn: Callable) -> Callable:
    """Decorator: log every tool call with inputs, outputs, and latency."""
    @wraps(fn)
    def wrapper(*args, **kwargs):
        start  = time.time()
        logger.info(f"TOOL_CALL  fn={fn.__name__} args={kwargs}")
        try:
            result  = fn(*args, **kwargs)
            latency = (time.time() - start) * 1000
            logger.info(f"TOOL_OK    fn={fn.__name__} latency={latency:.1f}ms "
                         f"result={str(result)[:100]}")
            return result
        except Exception as e:
            logger.error(f"TOOL_ERROR fn={fn.__name__} error={e}")
            return {'error': 'execution_error', 'message': str(e)}
    return wrapper

# ── 2. Rate limiting — prevent runaway API calls ──────────────────────
class RateLimiter:
    def __init__(self, max_calls: int, window_seconds: int):
        self.max_calls  = max_calls
        self.window     = window_seconds
        self.timestamps = defaultdict(list)

    def is_allowed(self, key: str) -> bool:
        now    = time.time()
        calls  = self.timestamps[key]
        # Remove calls outside the window
        calls  = [t for t in calls if now - t < self.window]
        self.timestamps[key] = calls

        if len(calls) >= self.max_calls:
            return False
        self.timestamps[key].append(now)
        return True

    def wait_time(self, key: str) -> float:
        calls = self.timestamps.get(key, [])
        if not calls or len(calls) < self.max_calls:
            return 0.0
        oldest = min(calls)
        return max(0.0, self.window - (time.time() - oldest))

tool_limiter = RateLimiter(max_calls=30, window_seconds=60)
llm_limiter  = RateLimiter(max_calls=10, window_seconds=60)

def rate_limited_tool(tool_name: str, fn: Callable, args: dict) -> dict:
    if not tool_limiter.is_allowed(tool_name):
        wait = tool_limiter.wait_time(tool_name)
        return {
            'error': 'rate_limited',
            'message': f'Tool {tool_name} rate limit exceeded. Wait {wait:.0f}s.',
        }
    return fn(**args)

# ── 3. Caching — avoid redundant tool calls ───────────────────────────
class ToolCache:
    """Cache tool results to avoid identical calls within a session."""
    def __init__(self, ttl_seconds: int = 300):
        self.cache = {}
        self.ttl   = ttl_seconds

    def _key(self, tool: str, args: dict) -> str:
        return hashlib.md5(f"{tool}:{json.dumps(args, sort_keys=True)}".encode()).hexdigest()

    def get(self, tool: str, args: dict) -> Any:
        key    = self._key(tool, args)
        entry  = self.cache.get(key)
        if entry and time.time() - entry['ts'] < self.ttl:
            logger.info(f"CACHE_HIT  fn={tool}")
            return entry['value']
        return None

    def set(self, tool: str, args: dict, value: Any):
        key = self._key(tool, args)
        self.cache[key] = {'value': value, 'ts': time.time()}

cache = ToolCache(ttl_seconds=60)

def cached_tool(tool_name: str, fn: Callable, args: dict) -> dict:
    cached = cache.get(tool_name, args)
    if cached is not None:
        return cached
    result = fn(**args)
    if 'error' not in result:   # only cache successful results
        cache.set(tool_name, args, result)
    return result

# ── 4. Graceful degradation ───────────────────────────────────────────
def with_fallback(primary_fn: Callable, fallback_fn: Callable,
                   *args, **kwargs) -> dict:
    """Try primary tool, fall back if it fails."""
    result = primary_fn(*args, **kwargs)
    if 'error' in result:
        logger.warning(f"Primary tool failed, using fallback")
        return fallback_fn(*args, **kwargs)
    return result

# ── 5. Agent health metrics ───────────────────────────────────────────
@dataclass
class AgentMetrics:
    sessions_total:         int = 0
    sessions_successful:    int = 0
    tool_calls_total:       int = 0
    tool_calls_failed:      int = 0
    loop_detections:        int = 0
    irreversible_blocked:   int = 0
    avg_turns_per_session:  float = 0.0
    avg_latency_ms:         float = 0.0
    _latencies:             list = field(default_factory=list)

    def record_session(self, turns: int, latency_ms: float, success: bool):
        self.sessions_total += 1
        if success:
            self.sessions_successful += 1
        self._latencies.append(latency_ms)
        self.avg_latency_ms = sum(self._latencies) / len(self._latencies)

    def report(self) -> dict:
        success_rate = (self.sessions_successful / max(1, self.sessions_total) * 100)
        tool_success = (1 - self.tool_calls_failed / max(1, self.tool_calls_total)) * 100
        return {
            'sessions':        self.sessions_total,
            'success_rate':    f"{success_rate:.1f}%",
            'tool_call_success': f"{tool_success:.1f}%",
            'loop_detections': self.loop_detections,
            'avg_latency_ms':  f"{self.avg_latency_ms:.0f}",
        }

metrics = AgentMetrics()

# Simulate a few sessions
for i in range(5):
    metrics.record_session(
        turns=3+i, latency_ms=800+i*100,
        success=(i != 2),   # one failure
    )
metrics.tool_calls_total = 18
metrics.tool_calls_failed = 2
metrics.loop_detections   = 1

print("Agent health metrics:")
for k, v in metrics.report().items():
    print(f"  {k:<25}: {v}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common production agent mistake — explained and fixed</h2>

        <ErrorBlock
          error="Agent loops on the same tool call 5+ times — runaway API costs"
          cause="The tool returns an error or an unexpected result that the LLM does not know how to handle. Instead of changing strategy it retries the same call hoping for a different result — especially common when a tool returns 'not found' and the LLM is certain the resource exists. Also caused by not tracking what was already called — the LLM has no memory of previous turns within the same message history if the tool result was not surfaced clearly."
          fix="Hash every (tool_name, args) pair and check before executing. If the same hash appears twice, inject a hard-coded message: 'You already called this tool with these arguments. The result was [X]. Do not call it again. Either use the existing result or try a completely different approach.' Set a hard max_calls limit (8–10) and enforce it unconditionally — never let the loop run forever. Log all tool calls so you can identify which tools trigger loops in production."
        />

        <ErrorBlock
          error="Agent calls initiate_refund without user confirmation — irreversible action taken"
          cause="The agent decided a refund was appropriate based on the conversation context and called the tool directly. Without a confirmation gate, the function calling API executes whatever the LLM decides — including irreversible actions. The LLM has no concept of irreversibility — to it, initiate_refund is just another function call like get_transaction."
          fix="Classify every tool as reversible or irreversible at definition time. Before executing any irreversible tool, stop the agent loop, surface the planned action to the user with exact parameters, and require explicit confirmation in the next user message. The confirmation must come from a human turn, not from the LLM itself. In the tool description, add: 'IRREVERSIBLE: Only call after user has explicitly confirmed in the current message with the exact parameters.' Never rely on the LLM to self-moderate — enforce the gate in code."
        />

        <ErrorBlock
          error="Agent produces correct answers in testing but wrong answers in production — distribution shift"
          cause="Test cases were hand-crafted to be clear and well-formed. Production queries from real merchants contain abbreviations, typos, code-mixed Hindi-English, merchant-specific terminology, and ambiguous references. The agent's tool selection logic works on clear queries but fails on ambiguous ones — calling the wrong tool, passing wrong arguments, or misinterpreting what the user needs."
          fix="Build your test set from real production queries, not synthetic ones. Log every production query and agent response for the first two weeks — review every case where the agent created a support ticket (indicating it failed to resolve) or where merchants followed up. Add those cases to your test suite. For ambiguous queries, add a clarification step: if the LLM's confidence in its tool selection is low (detectable via asking it to rate confidence), have it ask for clarification instead of guessing."
        />

        <ErrorBlock
          error="Latency is 8–15 seconds per agent turn — too slow for real-time chat"
          cause="Each turn in the agent loop requires one LLM API call. If the agent takes 5 turns to resolve a query and each LLM call takes 2 seconds plus tool execution time, the total latency is 10+ seconds. Users in a chat interface experience this as an unresponsive system. Using GPT-4 or Claude Opus amplifies this — larger models are slower."
          fix="Use a fast model for tool selection (LLaMA-3-70B via Groq: ~0.3s per call) and reserve larger models for final answer generation only. Cache tool results within and across sessions — get_transaction for the same ID should only hit the database once per session. Stream the final answer token by token so users see output immediately while the full response generates. Add a typing indicator and progress updates ('Looking up your transaction...') to manage perceived latency. Target: first visible output in under 2 seconds even if full answer takes 10."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT THIS LOOKS LIKE AT WORK ═══════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>What this looks like at work</span>
        <h2 style={S.h2}>Graduated autonomy — how production teams decide what an agent is allowed to do on its own</h2>

        <p style={S.p}>
          No serious engineering team ships an agent with full autonomy on day
          one. The universal rollout pattern is a ladder: an agent earns more
          autonomy as its track record on real traffic accumulates, and every
          rung on the ladder is tied to how reversible the action is and how
          expensive a mistake would be — not to how capable the underlying
          model seems in a demo.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            {
              level: 'Level 0 — Shadow mode',
              color: '#888',
              desc: 'Agent runs on real traffic but every action is logged, never executed. Engineers compare what it would have done against what a human actually did. Runs for weeks before anyone trusts the numbers.',
            },
            {
              level: 'Level 1 — Read-only autonomy',
              color: '#378ADD',
              desc: 'Tools that only fetch data (get_transaction, search_knowledge_base) execute automatically. Nothing the agent does can change any system of record, so mistakes cost a wrong answer, not a wrong action.',
            },
            {
              level: 'Level 2 — Reversible writes, confirmed irreversible actions',
              color: '#BA7517',
              desc: 'Low-risk writes (create_support_ticket) execute automatically. Anything irreversible (initiate_refund, send an email to a customer) still stops the loop and requires an explicit human confirmation before it runs.',
            },
            {
              level: 'Level 3 — Bounded full autonomy',
              color: '#1D9E75',
              desc: 'Irreversible actions execute without a human in the loop, but only within a hard budget: a capped dollar amount per action, a capped number of actions per session, and a capped blast radius (for example, refunds under $50 only).',
            },
          ].map((item) => (
            <div key={item.level} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 7, padding: '10px 14px',
              borderLeft: `3px solid ${item.color}`,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                {item.level}
              </div>
              <p style={{ ...S.ps, marginBottom: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <p style={S.p}>
          Stripe's dispute agent, Intercom's Fin, and GitHub's Copilot Workspace
          all follow some version of this ladder publicly. The reason is not
          caution for its own sake — it is that agent failures are usually not
          dramatic, they are quiet and cumulative. A support agent that
          occasionally sends a slightly-too-generous refund does not trigger an
          outage page; it shows up three weeks later as a line item in a
          finance review. The ladder exists to catch that kind of failure while
          it is still cheap.
        </p>

        <CodeBlock code={`# ── Autonomy gate — the actual code that enforces the ladder ───────────
from dataclasses import dataclass

@dataclass
class AutonomyBudget:
    """Enforced per session, independent of what the LLM 'decides' to do."""
    max_actions_per_session:    int   = 8
    max_irreversible_per_session: int = 1
    max_dollar_value_per_action: float = 50.0
    autonomy_level:              int   = 2   # see ladder above

def gate_irreversible_action(tool_name: str, args: dict,
                              budget: AutonomyBudget,
                              session_state: dict) -> tuple[bool, str]:
    """Returns (allowed, reason). Runs BEFORE any irreversible tool call."""
    if budget.autonomy_level < 3:
        return False, 'requires_human_confirmation'

    if session_state['irreversible_count'] >= budget.max_irreversible_per_session:
        return False, 'irreversible_budget_exhausted'

    amount = args.get('amount', 0)
    if amount > budget.max_dollar_value_per_action:
        return False, f'exceeds_per_action_limit(\${budget.max_dollar_value_per_action})'

    return True, 'within_budget'

# On-call reality: what actually gets paged when this fails
# Slack alert your on-call rotation will see at 2am if the gate is missing:
#
#   [PagerDuty] agent-fraud-review: 47 refunds initiated in 6 minutes
#   by session sess_8f2a — total exposure $12,400 — investigate before
#   the next batch job runs.
#
# The gate above is the difference between that page happening or not.`} />
      </div>

      <Div />

      {/* ══ SECTION 9 — MISCONCEPTIONS ═══════════════════════════════════════════ */}
      <div style={S.sec} data-toc-kind="myth">
        <span style={S.tag}>Misconceptions</span>
        <h2 style={S.h2}>Five things people get wrong about agents and tool use</h2>

        <ConceptBox title="Myth: An 'agent' is fundamentally different technology from function calling" color="#ff4757">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            Mechanically, an agent is the same structured tool-calling API this module opened with,
            called repeatedly inside a loop that feeds each tool's result back in as context for the
            next decision. Nothing about the underlying model changes between 'a chatbot that calls
            one function' and 'an agent that resolves an eight-step dispute.' What actually
            distinguishes a production agent is the engineering wrapped around that loop — state
            tracking across turns, loop detection, retry logic, confirmation gates, and budget
            enforcement. Calling it a different kind of AI obscures the fact that the reliability
            work is ordinary software engineering, not a smarter model.
          </p>
        </ConceptBox>

        <ConceptBox title="Myth: More autonomy makes an agent strictly more useful" color="#ff4757">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            Autonomy and reliability trade against each other, they do not both increase together. An
            agent that can act without any confirmation gate resolves simple cases faster, but it
            also executes its mistakes just as fast — an incorrect refund amount or a wrongly closed
            ticket happens instantly instead of being caught by a human glancing at a proposed action
            first. The right amount of autonomy is not the maximum available; it is whatever amount
            matches how reversible the action is and how expensive a mistake would be. A ticket
            creation and a wire transfer do not deserve the same autonomy level even if the same
            model is choosing both.
          </p>
        </ConceptBox>

        <ConceptBox title="Myth: An agent that writes out 'Thought: ... Action: ...' step by step is actually reasoning the way a human would" color="#ff4757">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            The ReAct-style thought text is still next-token generation, conditioned to look like
            reasoning because that format was reinforced during training — it is not a guarantee the
            underlying decision process is logically sound, only that the output resembles a chain of
            reasoning. A model can produce a perfectly coherent-sounding 'Thought:' that leads to
            calling the wrong tool, and it can arrive at a correct action with a thought paragraph
            that does not actually justify it. The reliability of a production agent comes from
            validating outcomes and gating risky actions in code, not from trusting that fluent
            intermediate reasoning implies a correct final decision.
          </p>
        </ConceptBox>

        <ConceptBox title="Myth: Hashing tool calls and capping max_calls fully solves the infinite-loop risk" color="#ff4757">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            Identical-call loop detection, shown earlier in this module, only catches the exact same
            (tool, arguments) pair repeating — it does nothing about a semantic loop, where the agent
            cycles through slightly different but equally unproductive calls (searching the knowledge
            base with five different phrasings of the same question, for instance). A hard max_calls
            ceiling stops the runaway cost eventually, but by then the session has already burned
            through its full budget without making progress. Real loop protection needs a second
            signal beyond exact-match hashing: is the agent's state actually changing between calls,
            or is it just varying its inputs while making zero forward progress on the task.
          </p>
        </ConceptBox>

        <ConceptBox title="Myth: Giving an agent more tools makes it strictly more capable" color="#ff4757">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            Tool selection accuracy degrades as the number of available tools grows, especially when
            several tools have overlapping or ambiguous descriptions — the model has to pick correctly
            from a longer, more confusing menu on every single turn, and each wrong pick either wastes
            a call or produces a wrong answer. A twenty-tool agent is not automatically more capable
            than a six-tool agent covering the same use case; it is often less reliable, because the
            LLM's tool-selection step is itself a classification problem that gets harder as the
            number of plausible-looking options increases. Curating a small, clearly-distinguished
            tool set usually beats exposing everything the backend can technically do.
          </p>
        </ConceptBox>
      </div>

      <Div />

      {/* ══ SECTION 10 — INTERVIEW PREP ═══════════════════════════════════════════ */}
      <div style={S.sec} data-toc-kind="prep">
        <span style={S.tag}>Interview prep</span>
        <h2 style={S.h2}>Agents and tool use — 5 questions interviewers actually ask</h2>

        <ConceptBox title="Q1 — Explain the ReAct pattern and how it differs from a single function-calling turn">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            ReAct interleaves reasoning and acting in a loop: the model generates a short thought
            about what it needs to find out, takes an action (a tool call), observes the result, and
            repeats until it has enough information to answer. A single function-calling turn is just
            one iteration of that loop — the model decides once whether to call a tool, gets a result,
            and answers. ReAct is what turns that one-shot capability into something that can handle a
            multi-step task: look something up, decide the next step based on what it learned, look up
            something else, and only answer once the accumulated observations actually support a
            conclusion.
          </p>
        </ConceptBox>

        <ConceptBox title="Q2 — How do you bound the cost and autonomy of an agent running in production?">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            Several layers, enforced in code rather than left to the model's judgment: a hard cap on
            tool calls per session so a stuck agent cannot loop indefinitely, a classification of every
            tool as reversible or irreversible with irreversible actions gated behind explicit human
            confirmation, a per-action and per-session dollar or resource budget for anything that
            spends money or changes state, and rate limiting on both the LLM calls and the downstream
            tools it invokes. None of these live inside the prompt — a prompt instruction like 'do not
            call this more than 3 times' is a suggestion the model can ignore under the wrong
            conditions; the budget has to be enforced by the code executing the tool calls.
          </p>
        </ConceptBox>

        <ConceptBox title="Q3 — How would you evaluate whether an agent is reliable enough to ship?">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            Start with an offline evaluation set built from real production-style queries, not
            synthetic ones, scored on task success rate, not just whether it produced an answer. Track
            secondary signals: how many turns it took to resolve, how often it escalated to a human
            ticket instead of resolving, and how often loop detection or a confirmation gate fired.
            Before full rollout, run it in shadow mode against live traffic so its proposed actions can
            be compared to what a human actually did, without it executing anything. Once live, sample
            a percentage of real sessions for human review every week, and treat any case where a
            confirmation gate blocked a mistaken irreversible action as a near-miss worth analysing,
            not just a system working as intended.
          </p>
        </ConceptBox>

        <ConceptBox title="Q4 — Design a confirmation gate for an irreversible action like a refund. What does it actually need to do?">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            It needs to stop the agent loop entirely before the tool executes, surface the exact
            parameters of the planned action to the user in plain language — the transaction, the
            amount, the reason — and require an explicit confirming response in the next human turn,
            not an inference from the LLM about whether the user seemed to agree. Critically, the
            enforcement has to live in the code path that executes the tool, checking a boolean that
            was only set by a genuine human turn, not inside the prompt asking the model to 'confirm
            before acting' — a model can be talked out of that instruction by an adversarial or
            just oddly-phrased user message, but a code-level gate cannot be talked out of anything.
          </p>
        </ConceptBox>

        <ConceptBox title="Q5 — A stakeholder asks why the agent took a specific action last week. How do you answer that?">
          <p style={{ ...S.ps, marginBottom: 0 }}>
            This is only answerable if every tool call was logged with its inputs, its result, the
            reasoning turn that preceded it, and a session identifier — which is why comprehensive
            logging is treated as a first-class production requirement, not optional observability.
            I would pull the full message history and tool call log for that session, reconstruct the
            sequence of decisions, and check whether any gate (loop detection, confirmation, budget)
            fired along the way. If the logs show the action was reasonable given what the agent knew
            at the time, the fix is usually a tool description or system prompt change; if the logs
            show a gate should have caught it and did not, that is a code bug in the scaffolding, not a
            model problem.
          </p>
        </ConceptBox>
      </div>

      <Div />

      {/* ══ SECTION 11 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>Section 10 complete</span>
        <h2 style={S.h2}>
          The Generative AI section is complete.
          Section 11 — MLOps and Production — begins next.
        </h2>

        <p style={S.p}>
          You have now covered the full generative AI landscape across
          9 modules: what generative AI is, GANs, VAEs, diffusion models,
          LLM pretraining and RLHF, LLM fine-tuning, multimodal models,
          advanced RAG, and production agents. Each module built on the last.
          Section 11 shifts from building models to shipping them —
          ML pipelines, experiment tracking, model deployment, monitoring,
          and the full MLOps lifecycle that keeps production models healthy
          over time.
        </p>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '16px 20px',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 14,
        }}>
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase' as const, color: '#7b61ff',
              fontFamily: 'var(--font-mono)', marginBottom: 5,
            }}>
              Next — Section 11 · MLOps and Production
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              ML Pipelines and Feature Stores
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Feature pipelines, training pipelines, inference pipelines.
              Feast and Tecton for feature stores. Airflow, Kubeflow, and Prefect
              for orchestration.
            </p>
          </div>
          <Link href="/learn/ai-ml/mlops/ml-pipelines-feature-stores" style={{
            fontSize: 12, color: '#7b61ff', fontWeight: 700,
            border: '1px solid #7b61ff',
            padding: '7px 14px', borderRadius: 6,
            fontFamily: 'var(--font-mono)', textDecoration: 'none', whiteSpace: 'nowrap',
          }}>
            Start →
          </Link>
        </div>
      </div>

      <KeyTakeaways
        items={[
          'Production agents differ from demo agents in error handling, not capability. The gap is: loop detection (hash every tool call, break on repetition), confirmation gates (irreversible actions must pause for explicit human approval), retry logic with backoff, hard max_calls enforcement, and comprehensive logging of every decision for debugging.',
          'Structured tool calling via JSON schemas eliminates text parsing failures. Define tools as OpenAI-compatible function schemas — the API returns structured tool_call objects with validated arguments. Never parse tool calls from LLM text output. The tool description must be precise: what the tool does, what arguments it needs, and whether it is irreversible.',
          'Three memory types work together: conversation buffer (deque of recent messages, compressed to summary when full), episodic memory (per-user summaries of past sessions stored in Redis/Postgres, injected into system prompt), semantic memory (RAG knowledge base, retrieved per query). Each addresses a different temporal scale of context.',
          'Task planning separates reasoning from execution. A planner LLM call generates a dependency graph of steps. Each step executes independently with its own retry logic. Failed steps mark dependent steps as skipped. This structure makes complex multi-step tasks debuggable — you can see exactly which step failed and why, and retry it without re-planning.',
          'Four production infrastructure requirements: logging (every tool call is an audit trail with inputs, outputs, and latency), rate limiting (prevent runaway costs from looping agents), caching (identical tool calls within a session hit the database once), and metrics (success rate, tool failure rate, loop detection rate, latency percentiles).',
          'Latency management: use a fast model for tool selection (Groq LLaMA-3: 300ms), reserve slower models for final generation only. Cache tool results across turns. Stream final answers token by token. Show progress indicators during multi-step execution. Target first visible output under 2 seconds even when full resolution takes 10+ seconds.',
        ]}
      />
    </LearnLayout>
  )
}
