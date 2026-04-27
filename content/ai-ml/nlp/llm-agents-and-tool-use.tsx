import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import  { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'LLM Agents and Tool Use — Chaduvuko',
  description:
    'Function calling, memory, multi-agent coordination, and the architecture behind every production AI agent.',
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

function VisualBox({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: 10,
      overflow: 'hidden', marginBottom: 24,
    }}>
      <div style={{
        padding: '8px 14px', background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        fontSize: 11, fontWeight: 700, color: 'var(--muted)',
        fontFamily: 'var(--font-mono)', letterSpacing: '0.07em',
        textTransform: 'uppercase' as const,
      }}>
        {label}
      </div>
      <div style={{ padding: '20px', background: 'var(--bg2)' }}>
        {children}
      </div>
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

export default function LLMAgentsPage() {
  return (
    <LearnLayout
      title="LLM Agents and Tool Use"
      description="Function calling, memory, multi-agent coordination, and the architecture behind every production AI agent."
      section="Natural Language Processing"
      readTime="40–45 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="nlp" topic="llm-agents-and-tool-use" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — what an agent actually is</span>
        <h2 style={S.h2}>
          A chatbot answers questions. An agent takes actions —
          it calls APIs, runs code, searches the web, writes files,
          and coordinates with other agents to complete multi-step tasks.
        </h2>

        <p style={S.p}>
          Module 53 showed ReAct as a prompting pattern — manually parsing
          tool calls from LLM text output. That works but is fragile.
          Modern LLM APIs support native function calling: you define tools
          as JSON schemas, the LLM returns a structured tool call object
          (not text to parse), you execute the function, return the result,
          and the LLM continues. No regex. No parsing failures.
          The LLM decides which tool to call, with which arguments,
          at each step of a multi-step task.
        </p>

        <p style={S.p}>
          At Stripe, an agent handling merchant disputes can: look up
          transaction details in the database, check the dispute deadline,
          draft a response email, send it via the email API, and update
          the CRM — all from a single natural language request from
          a support engineer. What took 20 minutes of copy-pasting
          across four tabs takes 30 seconds.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            A chatbot is a knowledgeable advisor — they can tell you what to do
            but you have to do it yourself. An agent is a capable employee —
            you tell them what you want and they figure out the steps,
            use the right tools, and hand you the result.
            The difference is agency: the ability to act in the world,
            not just generate text about acting.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            The key constraint: agents are only as reliable as the LLM driving them.
            Every tool call is an LLM decision — and LLMs make mistakes.
            Production agents need guardrails, confirmation steps for
            irreversible actions, and human-in-the-loop for high-stakes decisions.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          This module uses the Groq API for the LLM and implements
          function calling from scratch before showing the OpenAI-compatible
          API format. Install: <span style={S.code as React.CSSProperties}>pip install groq</span>.
          The function calling format is identical across Groq, OpenAI, and Anthropic's
          tool use API.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — FUNCTION CALLING ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The foundation</span>
        <h2 style={S.h2}>Function calling — structured tool invocation without text parsing</h2>

        <p style={S.p}>
          Function calling lets you define tools as JSON schemas and pass them
          to the LLM alongside the user message. When the LLM decides to use
          a tool it returns a structured <span style={S.code as React.CSSProperties}>tool_call</span> object
          — not text. You execute the function with the provided arguments,
          return the result as a tool message, and the LLM generates
          its next response informed by the result.
        </p>

        <ConceptBox title="Function calling message flow — four message types">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.0 }}>
            <div style={{ color: '#7b61ff', marginBottom: 2 }}>1. user message      → "What is the settlement status for TXN123?"</div>
            <div style={{ color: '#D85A30', marginBottom: 2 }}>2. assistant message → tool_call: get_transaction(id="TXN123")</div>
            <div style={{ color: '#1D9E75', marginBottom: 2 }}>3. tool message      → {`{"status": "settled", "amount": 5000, "date": "2026-03-28"}`}</div>
            <div style={{ color: '#378ADD', marginBottom: 8 }}>4. assistant message → "Transaction TXN123 was settled on March 28 for Rs 5,000."</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>
              No text parsing. No regex. The LLM returns structured JSON for the tool call.
              You execute the real function. The result goes back as a tool message.
            </div>
          </div>
        </ConceptBox>

        <CodeBlock code={`import os, json
from groq import Groq

client = Groq(api_key=os.environ.get('GROQ_API_KEY'))

# ── Define tools as JSON schemas ──────────────────────────────────────
TOOLS = [
    {
        'type': 'function',
        'function': {
            'name': 'get_transaction',
            'description': 'Look up a Stripe transaction by ID. Returns status, amount, merchant, and settlement date.',
            'parameters': {
                'type': 'object',
                'properties': {
                    'transaction_id': {
                        'type': 'string',
                        'description': 'The Stripe transaction ID (e.g. TXN123456)',
                    },
                },
                'required': ['transaction_id'],
            },
        },
    },
    {
        'type': 'function',
        'function': {
            'name': 'get_settlement_status',
            'description': 'Check settlement status for a merchant. Returns pending and completed settlement amounts.',
            'parameters': {
                'type': 'object',
                'properties': {
                    'merchant_id': {
                        'type': 'string',
                        'description': 'The merchant ID',
                    },
                    'date_range': {
                        'type': 'string',
                        'description': 'Date range: "today", "last_7_days", "last_30_days"',
                        'enum': ['today', 'last_7_days', 'last_30_days'],
                    },
                },
                'required': ['merchant_id'],
            },
        },
    },
    {
        'type': 'function',
        'function': {
            'name': 'calculate_fee',
            'description': 'Calculate Stripe processing fee for a transaction amount.',
            'parameters': {
                'type': 'object',
                'properties': {
                    'amount': {'type': 'number', 'description': 'Amount in INR'},
                    'payment_type': {
                        'type': 'string',
                        'enum': ['domestic', 'international'],
                    },
                },
                'required': ['amount', 'payment_type'],
            },
        },
    },
]

# ── Real tool implementations ─────────────────────────────────────────
def get_transaction(transaction_id: str) -> dict:
    """Simulated transaction lookup."""
    mock_db = {
        'TXN123': {'status': 'settled', 'amount': 5000, 'merchant': 'DoorDash', 'date': '2026-03-28'},
        'TXN456': {'status': 'pending', 'amount': 12500, 'merchant': 'Amazon', 'date': None},
        'TXN789': {'status': 'failed',  'amount': 2499, 'merchant': 'Uber Eats', 'date': None},
    }
    return mock_db.get(transaction_id, {'error': 'Transaction not found'})

def get_settlement_status(merchant_id: str, date_range: str = 'last_7_days') -> dict:
    return {
        'merchant_id':  merchant_id,
        'date_range':   date_range,
        'pending_inr':  45000,
        'settled_inr':  230000,
        'next_settlement': '2026-03-30',
    }

def calculate_fee(amount: float, payment_type: str) -> dict:
    rate = 0.03 if payment_type == 'international' else 0.02
    return {'amount': amount, 'fee': amount * rate, 'rate_pct': rate * 100}

TOOL_FUNCTIONS = {
    'get_transaction':      get_transaction,
    'get_settlement_status': get_settlement_status,
    'calculate_fee':        calculate_fee,
}

# ── Agent loop with function calling ─────────────────────────────────
def run_agent(user_message: str, max_turns: int = 5) -> str:
    messages = [{'role': 'user', 'content': user_message}]
    print(f"User: {user_message}\n")

    for turn in range(max_turns):
        response = client.chat.completions.create(
            model='llama-3.3-70b-versatile',
            messages=messages,
            tools=TOOLS,
            tool_choice='auto',   # LLM decides when to call tools
            temperature=0,
            max_tokens=500,
        )
        msg = response.choices[0].message

        # ── No tool call — final answer ───────────────────────────────
        if not msg.tool_calls:
            print(f"Agent: {msg.content}")
            return msg.content

        # ── Execute each tool call ────────────────────────────────────
        messages.append({'role': 'assistant', 'content': msg.content,
                          'tool_calls': [tc.model_dump() for tc in msg.tool_calls]})

        for tool_call in msg.tool_calls:
            fn_name   = tool_call.function.name
            fn_args   = json.loads(tool_call.function.arguments)

            print(f"Tool call: {fn_name}({fn_args})")

            if fn_name in TOOL_FUNCTIONS:
                result = TOOL_FUNCTIONS[fn_name](**fn_args)
            else:
                result = {'error': f'Unknown tool: {fn_name}'}

            print(f"Result: {result}\n")

            messages.append({
                'role':         'tool',
                'tool_call_id': tool_call.id,
                'content':      json.dumps(result),
            })

    return "Max turns reached."

# ── Test the agent ────────────────────────────────────────────────────
run_agent("What is the status of transaction TXN456?")
print("=" * 60)
run_agent("I'm merchant MID789. How much will I pay in fees for a Rs 50,000 international payment, and what's my settlement status?")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — AGENT MEMORY ════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>State across turns</span>
        <h2 style={S.h2}>Agent memory — short-term, long-term, and semantic memory</h2>

        <p style={S.p}>
          A stateless agent forgets everything between conversations.
          Production agents need memory: what the user said earlier in
          this conversation, what this user has asked about in past sessions,
          and relevant facts retrieved from external storage.
          Three types of memory serve different purposes.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            {
              type: 'Short-term (conversation buffer)',
              color: '#7b61ff',
              what: 'The full message history of the current conversation. Passed in every API call.',
              limit: 'Context window limit — 8k to 128k tokens. Older messages must be summarised or dropped.',
              impl: 'messages = [] — append every user/assistant/tool message. Pass all to each API call.',
            },
            {
              type: 'Long-term (persistent storage)',
              color: '#1D9E75',
              what: 'Facts about the user, preferences, and important outcomes from past sessions. Stored in a database.',
              limit: 'Must decide what to store — everything is expensive. What is worth remembering?',
              impl: 'After each session, ask the LLM to summarise key facts. Store in Redis/Postgres. Retrieve at session start.',
            },
            {
              type: 'Semantic (vector memory)',
              color: '#D85A30',
              what: 'Past conversations and documents stored as embeddings. Retrieve by semantic similarity.',
              limit: 'Retrieval quality depends on embedding quality and chunking strategy (Module 52).',
              impl: 'Embed conversation turns. Store in FAISS/Chroma. Query with current message to find relevant history.',
            },
          ].map((item) => (
            <div key={item.type} style={{
              background: 'var(--surface)', border: `1px solid ${item.color}25`,
              borderRadius: 8, padding: '12px 14px',
              borderLeft: `4px solid ${item.color}`,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 6 }}>
                {item.type}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <p style={{ ...S.ps, marginBottom: 4 }}>{item.what}</p>
                  <div style={{ fontSize: 11, color: '#ff4757' }}>⚠ {item.limit}</div>
                </div>
                <div style={{ fontSize: 11, color: item.color, fontFamily: 'var(--font-mono)', background: `${item.color}10`, padding: '6px 8px', borderRadius: 4 }}>
                  {item.impl}
                </div>
              </div>
            </div>
          ))}
        </div>

        <CodeBlock code={`import os, json
from groq import Groq
from collections import deque

client = Groq(api_key=os.environ.get('GROQ_API_KEY'))

# ── Short-term memory — sliding window to stay within context limit ───
class ConversationMemory:
    def __init__(self, max_messages: int = 20, system_prompt: str = ''):
        self.system_prompt = system_prompt
        self.history       = deque(maxlen=max_messages)  # auto-drops oldest
        self.summary       = ''   # compressed summary of dropped messages

    def add(self, role: str, content: str):
        self.history.append({'role': role, 'content': content})

    def get_messages(self) -> list[dict]:
        msgs = []
        if self.system_prompt:
            msgs.append({'role': 'system', 'content': self.system_prompt})
        if self.summary:
            msgs.append({'role': 'system',
                          'content': f'Summary of earlier conversation: {self.summary}'})
        msgs.extend(list(self.history))
        return msgs

    def compress(self):
        """Summarise history when approaching context limit."""
        if len(self.history) < 15:
            return
        old_messages = list(self.history)[:10]
        summary_prompt = (
            'Summarise this conversation in 3 sentences, '
            'keeping all important facts:\n\n' +
            '\n'.join(f"{m['role']}: {m['content']}" for m in old_messages)
        )
        response = client.chat.completions.create(
            model='llama-3.3-70b-versatile',
            messages=[{'role': 'user', 'content': summary_prompt}],
            max_tokens=200, temperature=0,
        )
        self.summary = response.choices[0].message.content
        # Remove the messages we summarised
        for _ in range(10):
            self.history.popleft()

# ── Long-term memory — persist key facts across sessions ──────────────
class LongTermMemory:
    def __init__(self):
        self.facts = {}   # In production: Redis/Postgres

    def remember(self, user_id: str, key: str, value: str):
        if user_id not in self.facts:
            self.facts[user_id] = {}
        self.facts[user_id][key] = value

    def recall(self, user_id: str) -> str:
        if user_id not in self.facts:
            return ''
        facts = self.facts.get(user_id, {})
        return '\n'.join(f'- {k}: {v}' for k, v in facts.items())

    def extract_and_store(self, user_id: str, conversation: str):
        """Ask LLM to extract memorable facts from conversation."""
        prompt = f"""Extract key facts worth remembering about this user from the conversation.
Return as JSON: {{"facts": [{{"key": "...", "value": "..."}}]}}
Only extract genuinely useful facts (preferences, identity, recurring issues).

Conversation:
{conversation}"""
        response = client.chat.completions.create(
            model='llama-3.3-70b-versatile',
            messages=[{'role': 'user', 'content': prompt}],
            max_tokens=300, temperature=0,
        )
        try:
            data = json.loads(response.choices[0].message.content)
            for fact in data.get('facts', []):
                self.remember(user_id, fact['key'], fact['value'])
        except Exception:
            pass

# ── Demo: agent with memory ───────────────────────────────────────────
ltm  = LongTermMemory()
conv = ConversationMemory(
    max_messages=10,
    system_prompt='You are a Stripe support agent with memory of past interactions.',
)

# Simulate session 1
user_id = 'merchant_MID001'
turns = [
    "Hi, I'm Priya. I run an online saree store on my website.",
    "I process about 50 orders a day averaging Rs 2000 each.",
    "My biggest problem is international payment failures.",
]

print("Session 1:")
for user_msg in turns:
    conv.add('user', user_msg)
    response = client.chat.completions.create(
        model='llama-3.3-70b-versatile',
        messages=conv.get_messages(),
        max_tokens=100, temperature=0.3,
    )
    reply = response.choices[0].message.content
    conv.add('assistant', reply)
    print(f"  User:  {user_msg}")
    print(f"  Agent: {reply[:80]}...\n")

# Extract and store facts from this session
full_conv = '\n'.join(f"{m['role']}: {m['content']}" for m in list(conv.history))
ltm.extract_and_store(user_id, full_conv)

print("Stored facts about this merchant:")
print(ltm.recall(user_id))`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — MULTI-AGENT SYSTEMS ═════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Beyond single agents</span>
        <h2 style={S.h2}>Multi-agent coordination — orchestrator and specialist agents</h2>

        <p style={S.p}>
          Complex tasks exceed what a single agent can reliably handle.
          A multi-agent system uses an orchestrator agent that plans
          and delegates to specialist agents — each with its own tools,
          context, and expertise. The orchestrator never executes tools directly.
          It breaks the task into sub-tasks and routes each to the right specialist.
        </p>

        <VisualBox label="Multi-agent architecture — Stripe dispute resolution system">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{
              background: 'rgba(123,97,255,0.1)', border: '2px solid #7b61ff',
              borderRadius: 8, padding: '10px 14px', textAlign: 'center' as const,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#7b61ff', fontFamily: 'var(--font-mono)' }}>
                ORCHESTRATOR AGENT
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>
                Receives merchant request → plans sub-tasks → delegates → synthesises response
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', color: '#555', fontSize: 16 }}>↓ delegates to ↓</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {[
                { name: 'Transaction Agent', color: '#1D9E75', tools: 'get_transaction, check_dispute_status, get_evidence' },
                { name: 'Communication Agent', color: '#378ADD', tools: 'draft_email, send_email, update_crm' },
                { name: 'Compliance Agent', color: '#D85A30', tools: 'check_deadline, validate_evidence, flag_risk' },
              ].map((agent) => (
                <div key={agent.name} style={{
                  background: `${agent.color}10`, border: `1px solid ${agent.color}30`,
                  borderRadius: 7, padding: '10px 10px',
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: agent.color, fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                    {agent.name}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                    {agent.tools}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </VisualBox>

        <CodeBlock code={`import os, json
from groq import Groq
from dataclasses import dataclass
from typing import Callable

client = Groq(api_key=os.environ.get('GROQ_API_KEY'))

# ── Specialist agent factory ──────────────────────────────────────────
@dataclass
class SpecialistAgent:
    name:        str
    description: str
    system:      str
    tools:       list[dict]
    tool_fns:    dict[str, Callable]

    def run(self, task: str) -> str:
        messages = [
            {'role': 'system', 'content': self.system},
            {'role': 'user',   'content': task},
        ]
        for _ in range(5):
            response = client.chat.completions.create(
                model='llama-3.3-70b-versatile',
                messages=messages,
                tools=self.tools if self.tools else None,
                tool_choice='auto' if self.tools else None,
                temperature=0, max_tokens=400,
            )
            msg = response.choices[0].message
            if not msg.tool_calls:
                return msg.content or ''

            messages.append({
                'role': 'assistant', 'content': msg.content,
                'tool_calls': [tc.model_dump() for tc in msg.tool_calls],
            })
            for tc in msg.tool_calls:
                fn   = tc.function.name
                args = json.loads(tc.function.arguments)
                res  = self.tool_fns.get(fn, lambda **k: {'error': 'unknown'})(**args)
                messages.append({
                    'role': 'tool', 'tool_call_id': tc.id,
                    'content': json.dumps(res),
                })
        return 'Max steps reached.'

# ── Define specialist agents ──────────────────────────────────────────
transaction_agent = SpecialistAgent(
    name='Transaction Agent',
    description='Looks up transaction details and dispute status',
    system='You are a transaction lookup specialist. Use tools to find transaction data.',
    tools=[{
        'type': 'function',
        'function': {
            'name': 'get_transaction',
            'description': 'Get transaction details by ID',
            'parameters': {
                'type': 'object',
                'properties': {'txn_id': {'type': 'string'}},
                'required': ['txn_id'],
            },
        },
    }],
    tool_fns={
        'get_transaction': lambda txn_id: {
            'id': txn_id, 'amount': 5000, 'status': 'disputed',
            'merchant': 'DoorDash', 'customer': 'Rahul Kumar',
            'dispute_deadline': '2026-04-01',
        },
    },
)

compliance_agent = SpecialistAgent(
    name='Compliance Agent',
    description='Checks deadlines and evidence requirements',
    system='You are a compliance specialist. Assess dispute requirements and deadlines.',
    tools=[],
    tool_fns={},
)

communication_agent = SpecialistAgent(
    name='Communication Agent',
    description='Drafts customer and merchant communications',
    system='You are a communication specialist. Draft clear, professional messages.',
    tools=[],
    tool_fns={},
)

# ── Orchestrator ──────────────────────────────────────────────────────
def orchestrator(request: str) -> str:
    """
    Breaks a complex request into sub-tasks,
    delegates to specialists, and synthesises the final response.
    """
    plan_prompt = f"""You are an orchestrator for a Stripe dispute resolution system.

Available specialists:
- Transaction Agent: looks up transaction details and dispute status
- Compliance Agent: checks deadlines and evidence requirements
- Communication Agent: drafts responses and emails

For this request, create a plan as JSON:
{{"steps": [{{"agent": "...", "task": "..."}}]}}

Request: {request}"""

    plan_response = client.chat.completions.create(
        model='llama-3.3-70b-versatile',
        messages=[{'role': 'user', 'content': plan_prompt}],
        temperature=0, max_tokens=300,
    )
    plan_text = plan_response.choices[0].message.content
    try:
        import re
        json_match = re.search(r'\{.*\}', plan_text, re.DOTALL)
        plan = json.loads(json_match.group()) if json_match else {'steps': []}
    except Exception:
        plan = {'steps': []}

    agents = {
        'Transaction Agent':   transaction_agent,
        'Compliance Agent':    compliance_agent,
        'Communication Agent': communication_agent,
    }

    results = {}
    print(f"\nOrchestrator plan: {len(plan.get('steps', []))} steps")
    for step in plan.get('steps', []):
        agent_name = step.get('agent', '')
        task       = step.get('task', '')
        if agent_name in agents:
            print(f"  → {agent_name}: {task[:60]}...")
            results[agent_name] = agents[agent_name].run(task)

    # Synthesise final answer
    synthesis_prompt = (
        f"Original request: {request}\n\n"
        + '\n\n'.join(f"{name} result:\n{result}"
                       for name, result in results.items())
        + "\n\nSynthesise a clear, complete response:"
    )
    final = client.chat.completions.create(
        model='llama-3.3-70b-versatile',
        messages=[{'role': 'user', 'content': synthesis_prompt}],
        temperature=0.2, max_tokens=400,
    )
    return final.choices[0].message.content

result = orchestrator(
    "Transaction TXN999 is disputed. Check the details, "
    "verify the deadline, and draft a response to the customer."
)
print(f"\nFinal response:\n{result}")`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — GUARDRAILS AND SAFETY ═══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Production requirements</span>
        <h2 style={S.h2}>Guardrails — preventing agents from doing the wrong thing</h2>

        <p style={S.p}>
          Agents that can take real-world actions — send emails, call APIs,
          write to databases — need guardrails. Without them a hallucinating
          agent can send wrong emails to customers, corrupt database records,
          or call expensive APIs in loops. Three layers of protection
          are standard in production agent systems.
        </p>

        <CodeBlock code={`import os, json
from groq import Groq
from typing import Callable, Any
import logging

client = Groq(api_key=os.environ.get('GROQ_API_KEY'))
logger = logging.getLogger(__name__)

# ── Layer 1: Tool-level validation ────────────────────────────────────
def safe_tool(fn: Callable, max_calls: int = 3, dry_run: bool = False):
    """Wrapper that adds call counting, dry-run mode, and logging."""
    call_count = [0]

    def wrapper(**kwargs):
        call_count[0] += 1
        if call_count[0] > max_calls:
            return {'error': f'Tool call limit ({max_calls}) exceeded. Stopping.'}

        logger.info(f"Tool call {call_count[0]}/{max_calls}: {fn.__name__}({kwargs})")

        if dry_run:
            return {'dry_run': True, 'would_call': fn.__name__, 'with': kwargs}

        try:
            result = fn(**kwargs)
            logger.info(f"Tool result: {result}")
            return result
        except Exception as e:
            logger.error(f"Tool error: {e}")
            return {'error': str(e)}

    return wrapper

# ── Layer 2: Irreversible action confirmation ─────────────────────────
IRREVERSIBLE_TOOLS = {'send_email', 'delete_record', 'process_refund', 'send_sms'}

def requires_confirmation(tool_name: str, args: dict) -> bool:
    """Return True if this action requires human confirmation."""
    if tool_name in IRREVERSIBLE_TOOLS:
        return True
    # High-value transactions always need confirmation
    if tool_name == 'process_refund' and args.get('amount', 0) > 10_000:
        return True
    return False

def confirm_action(tool_name: str, args: dict) -> bool:
    """In production: show UI confirmation. Here: auto-approve for demo."""
    print(f"  ⚠ Confirmation required: {tool_name}({args})")
    # In production: return based on user UI input
    # For high-stakes: require manager approval
    return True   # auto-approve in demo

# ── Layer 3: Output validation ────────────────────────────────────────
def validate_agent_output(output: str, expected_format: str = None) -> dict:
    """Validate agent output before acting on it."""
    if not output or len(output.strip()) < 10:
        return {'valid': False, 'reason': 'Output too short or empty'}

    # Check for hallucination signals
    hallucination_phrases = [
        'I made up', 'I invented', 'fictional', 'hypothetical example',
    ]
    for phrase in hallucination_phrases:
        if phrase.lower() in output.lower():
            return {'valid': False, 'reason': f'Possible hallucination: "{phrase}"'}

    if expected_format == 'json':
        try:
            json.loads(output)
        except Exception:
            return {'valid': False, 'reason': 'Expected JSON but got invalid JSON'}

    return {'valid': True}

# ── Safe agent with all three layers ─────────────────────────────────
class SafeAgent:
    def __init__(self, tools: list[dict], tool_fns: dict,
                 dry_run: bool = False, max_tool_calls: int = 10):
        self.tools    = tools
        self.tool_fns = {
            name: safe_tool(fn, max_calls=3, dry_run=dry_run)
            for name, fn in tool_fns.items()
        }
        self.total_calls = 0
        self.max_calls   = max_tool_calls

    def run(self, task: str, system: str = '') -> str:
        messages = []
        if system:
            messages.append({'role': 'system', 'content': system})
        messages.append({'role': 'user', 'content': task})

        for turn in range(8):
            if self.total_calls >= self.max_calls:
                return f'Safety limit: max {self.max_calls} tool calls reached.'

            response = client.chat.completions.create(
                model='llama-3.3-70b-versatile',
                messages=messages,
                tools=self.tools,
                tool_choice='auto',
                temperature=0, max_tokens=500,
            )
            msg = response.choices[0].message
            if not msg.tool_calls:
                result = msg.content or ''
                validation = validate_agent_output(result)
                if not validation['valid']:
                    print(f"  ⚠ Output validation failed: {validation['reason']}")
                return result

            messages.append({
                'role': 'assistant', 'content': msg.content,
                'tool_calls': [tc.model_dump() for tc in msg.tool_calls],
            })

            for tc in msg.tool_calls:
                fn_name = tc.function.name
                fn_args = json.loads(tc.function.arguments)
                self.total_calls += 1

                # Confirmation for irreversible actions
                if requires_confirmation(fn_name, fn_args):
                    if not confirm_action(fn_name, fn_args):
                        result = {'cancelled': True, 'reason': 'User rejected action'}
                        messages.append({
                            'role': 'tool', 'tool_call_id': tc.id,
                            'content': json.dumps(result),
                        })
                        continue

                fn     = self.tool_fns.get(fn_name, lambda **k: {'error': 'unknown'})
                result = fn(**fn_args)
                messages.append({
                    'role': 'tool', 'tool_call_id': tc.id,
                    'content': json.dumps(result),
                })

        return 'Max turns reached.'

print("SafeAgent: production-ready agent with guardrails")
print("Layers: tool-level validation + confirmation + output validation")`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common agent mistake — explained and fixed</h2>

        <ErrorBlock
          error="Agent calls the same tool with the same arguments repeatedly — infinite loop"
          cause="The tool returned an error or unexpected result that the LLM does not know how to handle. Instead of changing strategy it retries the same call hoping for a different result. Also caused by the LLM not understanding that a null or empty result means the data does not exist — it keeps searching instead of concluding."
          fix="Track all tool calls in a set. Before executing, check if (tool_name, args_hash) was already called — if yes, inject a message: 'You already called this tool with these arguments. The result was X. Try a different approach or conclude with the available information.' Set max_steps=5-8 and enforce it strictly. Return structured errors from tools: {'error': 'not_found', 'message': 'Transaction TXN999 does not exist'} — explicit error types help the LLM decide to stop."
        />

        <ErrorBlock
          error="Agent hallucinates tool call arguments — passes fields that do not exist in the schema"
          cause="The LLM generates arguments based on what seems plausible rather than strictly following the schema. Common with optional fields — the LLM invents field names that sound reasonable but are not in the function definition. Also happens when the tool description is ambiguous about which arguments are required vs optional."
          fix="Make schemas explicit and strict: list all required fields in the 'required' array. Add 'additionalProperties: false' to the schema object to reject extra fields. Use enum constraints for categorical arguments. Validate tool call arguments against the schema before execution: import jsonschema; jsonschema.validate(args, tool_schema['parameters']). Return validation errors back to the LLM so it can correct itself."
        />

        <ErrorBlock
          error="Multi-agent system produces inconsistent results — agents contradict each other"
          cause="Specialist agents are running in parallel with independent context — they do not share information about what other agents discovered. Agent A finds that the transaction is settled. Agent B independently assumes it is pending. The orchestrator synthesises contradictory information from both."
          fix="Pass shared context between agents: after each specialist runs, add its key findings to a shared_context dict that is injected into subsequent specialist prompts. Run specialists sequentially when their tasks depend on each other. Have the orchestrator explicitly check for contradictions before synthesis: 'These results appear contradictory: [A says X, B says Y]. Identify the conflict and state which is more likely correct based on the task.'"
        />

        <ErrorBlock
          error="Agent takes irreversible actions (sends emails, processes refunds) based on hallucinated data"
          cause="The agent pipeline has no confirmation step between tool call decision and execution. The LLM decides to send an email to a customer, the tool executes immediately, and only then is the hallucination discovered. By then the customer has received a wrong email."
          fix="Classify all tools as reversible or irreversible. For irreversible tools, always add a confirmation step: stop the agent, show the planned action to a human operator, and only execute on explicit approval. Use dry_run=True during development — tools log what they would do without executing. In production, queue irreversible actions for async human review rather than executing synchronously."
        />
      </div>

      <Div />

      {/* ══ SECTION 7 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          The NLP section is complete. Section 9 — Computer Vision — begins next.
        </h2>

        <p style={S.p}>
          You have completed the full NLP section: tokenisation, BERT,
          PEFT/LoRA, RAG, prompt engineering, and agents.
          Section 9 goes deeper into computer vision beyond the CNNs
          of Module 46 — image fundamentals, data augmentation,
          object detection with YOLO, and semantic segmentation.
          Every module builds directly on the deep learning foundation
          from Section 7.
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
              Next — Section 9 · Computer Vision
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              Image Fundamentals — Pixels, Channels and Tensors
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              How computers see images. Pixel values, colour channels,
              image tensors, normalisation, and the preprocessing pipeline
              every vision model expects.
            </p>
          </div>
          <div style={{
            fontSize: 12, color: 'var(--muted)',
            border: '1px solid var(--border)',
            padding: '7px 14px', borderRadius: 6,
            fontFamily: 'var(--font-mono)',
          }}>
            coming soon
          </div>
        </div>
      </div>

      <KeyTakeaways
        items={[
          'An agent is an LLM that can take actions — call APIs, run code, write files — not just generate text. Function calling is the reliable way to implement this: define tools as JSON schemas, the LLM returns structured tool_call objects (not text to parse), you execute the function, return the result as a tool message, repeat.',
          'The function calling message loop has four message types: user (question), assistant with tool_calls (LLM decides to call a tool), tool (result of the function execution), assistant without tool_calls (final answer). Pass all messages in every API call — the full history is the agent\'s working memory.',
          'Three types of agent memory: short-term (conversation buffer — pass all messages each turn, compress when approaching context limit), long-term (persist key facts in a database across sessions, retrieve at session start), semantic (vector store of past conversations, retrieve by similarity to current query).',
          'Multi-agent systems use an orchestrator that plans and delegates to specialist agents. The orchestrator never calls tools directly — it breaks the task into sub-tasks and routes each to the right specialist. Pass shared context between specialists so they do not contradict each other.',
          'Production agents need three guardrail layers: tool-level validation (max call counts, logging, dry-run mode), confirmation for irreversible actions (send email, process refund, delete record — always require human approval), and output validation (check for hallucination signals before acting on agent output).',
          'The biggest agent failure mode is irreversible actions based on hallucinated data. Classify every tool as reversible or irreversible. Queue irreversible actions for human review rather than executing synchronously. In development, always use dry_run=True. Never ship an agent that can take irreversible real-world actions without a confirmation step.',
        ]}
      />
    </LearnLayout>
  )
}
