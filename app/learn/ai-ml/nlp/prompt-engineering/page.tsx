import type { Metadata } from 'next'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import MLPageHeader from '@/components/content/MLPageHeader'

export const metadata: Metadata = {
  title: 'Prompt Engineering — Chaduvuko',
  description:
    'Zero-shot, few-shot, chain-of-thought, ReAct — the patterns that consistently improve LLM outputs. With real before/after examples for every technique.',
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

function BeforeAfter({ before, after, improvement }: {
  before: string; after: string; improvement: string
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
      <div style={{
        background: 'rgba(255,71,87,0.05)', border: '1px solid rgba(255,71,87,0.2)',
        borderRadius: 8, padding: '12px 14px',
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#ff4757', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
          ✗ WEAK PROMPT
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, whiteSpace: 'pre-wrap' as const, fontFamily: 'var(--font-mono)' }}>
          {before}
        </div>
      </div>
      <div style={{
        background: 'rgba(29,158,117,0.05)', border: '1px solid rgba(29,158,117,0.2)',
        borderRadius: 8, padding: '12px 14px',
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#1D9E75', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
          ✓ STRONG PROMPT
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, whiteSpace: 'pre-wrap' as const, fontFamily: 'var(--font-mono)' }}>
          {after}
        </div>
      </div>
      <div style={{ gridColumn: '1 / -1', fontSize: 11, color: '#1D9E75', fontStyle: 'italic', marginTop: -4 }}>
        Improvement: {improvement}
      </div>
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

export default function PromptEngineeringPage() {
  return (
    <LearnLayout
      title="Prompt Engineering"
      description="Zero-shot, few-shot, chain-of-thought, ReAct — the patterns that consistently improve LLM outputs. With real before/after examples for every technique."
      section="Natural Language Processing"
      readTime="30–35 min"
      updatedAt="March 2026"
    >
      <MLPageHeader section="nlp" topic="prompt-engineering" />

      {/* ══ SECTION 1 — PLAIN ENGLISH ══════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Before any code — what prompt engineering actually is</span>
        <h2 style={S.h2}>
          The same LLM gives completely different answers to the same question
          depending on how the question is phrased.
          Prompt engineering is the discipline of phrasing questions
          to get reliably correct answers.
        </h2>

        <p style={S.p}>
          An LLM is a function that maps text to text. The input is the prompt.
          The output quality depends almost entirely on the prompt quality.
          A vague prompt produces a vague answer. A specific, structured
          prompt with context, examples, and output format constraints
          produces a specific, structured, correct answer.
        </p>

        <p style={S.p}>
          This is not about tricks or jailbreaks. It is about understanding
          how LLMs process instructions and giving them what they need
          to perform well: role context, task clarity, examples of desired
          output, constraints on format, and explicit reasoning instructions
          for complex tasks. Every pattern in this module has been tested
          in production NLP systems across Indian tech companies.
        </p>

        <AnalogyBox>
          <p style={{ ...S.p, marginBottom: 8 }}>
            You hire a brilliant new analyst at Razorpay. On day one you ask:
            "analyse the data." They stare at you. Which data? What kind of analysis?
            What format should the output be? The analyst is capable —
            your instruction was the problem.
          </p>
          <p style={{ ...S.ps, marginBottom: 0, color: '#00e676' }}>
            A good manager says: "Analyse last month's payment failure rates
            by city. I need a table with city, failure rate, and top failure reason.
            Flag anything above 5%. Here is an example of what I expect: [example]."
            Same analyst, dramatically better output. That is prompt engineering.
          </p>
        </AnalogyBox>

        <Callout type="tip">
          All code in this module uses the Groq API (free tier, fast).
          Get your key at console.groq.com.
          Install: <span style={S.code as React.CSSProperties}>pip install groq</span>.
          Every pattern works identically with OpenAI, Anthropic, or any
          OpenAI-compatible API — just swap the client.
        </Callout>
      </div>

      <Div />

      {/* ══ SECTION 2 — ZERO-SHOT AND FEW-SHOT ══════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Technique 1 and 2</span>
        <h2 style={S.h2}>Zero-shot vs few-shot — when examples make all the difference</h2>

        <p style={S.p}>
          Zero-shot prompting gives the LLM a task with no examples —
          just a description of what to do. It works for common, well-defined tasks
          where the LLM has strong priors. Few-shot prompting adds 2–5 examples
          of (input, desired output) pairs before the actual query.
          The model infers the pattern from the examples and applies it.
        </p>

        <p style={S.p}>
          Few-shot is dramatically more effective than zero-shot for tasks
          with specific output formats, domain-specific terminology,
          or nuanced classification boundaries that are hard to describe in words.
          At Swiggy, classifying complaint severity (P1/P2/P3) requires
          the exact boundary definition — examples teach it faster than descriptions.
        </p>

        <BeforeAfter
          before={`Classify this complaint:
"Order arrived 2 hours late and food was cold"

Category:`}
          after={`Classify complaint severity. Use ONLY P1/P2/P3.
P1 = safety risk or complete order failure
P2 = significant quality/delay issue
P3 = minor inconvenience

Examples:
Input: "Found glass in food"
Output: P1

Input: "Arrived 45 min late, lukewarm"
Output: P2

Input: "Packaging slightly damaged"
Output: P3

Now classify:
Input: "Order arrived 2 hours late and food was cold"
Output:`}
          improvement="Clear boundaries + examples → consistent P2 instead of random classification"
        />

        <CodeBlock code={`import os
from groq import Groq

client = Groq(api_key=os.environ.get('GROQ_API_KEY'))

def call_llm(prompt: str, system: str = '', temperature: float = 0) -> str:
    messages = []
    if system:
        messages.append({'role': 'system', 'content': system})
    messages.append({'role': 'user', 'content': prompt})

    response = client.chat.completions.create(
        model='llama-3.3-70b-versatile',
        messages=messages,
        temperature=temperature,
        max_tokens=500,
    )
    return response.choices[0].message.content.strip()

# ── Zero-shot: works for simple, well-defined tasks ───────────────────
zero_shot = """Classify the sentiment of this Flipkart review.
Answer with exactly one word: positive, negative, or neutral.

Review: "The product quality is excellent but delivery was very slow."
Sentiment:"""

# ── Few-shot: necessary for nuanced or domain-specific tasks ──────────
few_shot = """Classify Swiggy complaint severity as P1, P2, or P3.

P1 = safety issue or complete failure (food poisoning, wrong order entirely)
P2 = significant quality/service issue (very late, bad quality, missing items)
P3 = minor issue (packaging, small delay, missing cutlery)

Examples:
Complaint: "Found a cockroach in my biryani"
Severity: P1

Complaint: "Order arrived 90 minutes late, food was completely cold"
Severity: P2

Complaint: "Missing a straw with my juice"
Severity: P3

Complaint: "Received Dal Makhni instead of ordered Paneer Butter Masala"
Severity:"""

print("Zero-shot result:", call_llm(zero_shot))
print("Few-shot result: ", call_llm(few_shot))

# ── Few-shot for structured extraction ────────────────────────────────
extraction_prompt = """Extract payment details from support tickets.
Return as JSON only. No explanation.

Example 1:
Ticket: "I paid Rs 2500 to Swiggy on March 15 but got no confirmation"
JSON: {"amount": 2500, "merchant": "Swiggy", "date": "March 15", "issue": "no confirmation"}

Example 2:
Ticket: "Razorpay charged my card twice for Rs 899 yesterday"
JSON: {"amount": 899, "merchant": "Razorpay", "date": "yesterday", "issue": "duplicate charge"}

Now extract:
Ticket: "I made a payment of Rs 4999 to Flipkart on Sunday but the order shows pending"
JSON:"""

import json
result = call_llm(extraction_prompt)
print(f"\nExtraction result: {result}")
try:
    parsed = json.loads(result)
    print(f"Parsed: {parsed}")
except:
    print("Parse failed — add explicit JSON instruction")`} />
      </div>

      <Div />

      {/* ══ SECTION 3 — CHAIN-OF-THOUGHT ════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Technique 3</span>
        <h2 style={S.h2}>Chain-of-thought — tell the model to think before answering</h2>

        <p style={S.p}>
          Chain-of-thought (CoT) prompting asks the LLM to show its reasoning
          step by step before giving the final answer. This dramatically
          improves performance on tasks that require multi-step reasoning —
          maths, logic, policy interpretation, risk assessment.
          Without CoT, the LLM jumps directly to an answer and often
          gets complex reasoning wrong. With CoT, it works through the
          problem systematically.
        </p>

        <BeforeAfter
          before={`A Razorpay merchant processes 
Rs 50,000 in payments. 
International rate is 3%, 
domestic rate is 2%.
60% are domestic payments.
What are total fees?

Answer:`}
          after={`A Razorpay merchant processes 
Rs 50,000. International rate 
is 3%, domestic is 2%. 
60% are domestic.
What are total fees?

Let's think step by step:
1. Calculate domestic amount
2. Calculate international amount
3. Apply respective rates
4. Sum both fees

Answer:`}
          improvement="Step-by-step reasoning → correct Rs 1,600 instead of wrong answer"
        />

        <CodeBlock code={`import os
from groq import Groq

client = Groq(api_key=os.environ.get('GROQ_API_KEY'))

def call_llm(prompt, system='', temperature=0):
    msgs = []
    if system: msgs.append({'role':'system','content':system})
    msgs.append({'role':'user','content':prompt})
    r = client.chat.completions.create(
        model='llama-3.3-70b-versatile',
        messages=msgs, temperature=temperature, max_tokens=600,
    )
    return r.choices[0].message.content.strip()

# ── CoT for fee calculation ───────────────────────────────────────────
without_cot = """A Razorpay merchant processes Rs 50,000 in total payments.
International payments: 3% fee. Domestic payments: 2% fee.
60% of payments are domestic. What are total fees?
Answer with just the number in rupees:"""

with_cot = """A Razorpay merchant processes Rs 50,000 in total payments.
International payments: 3% fee. Domestic payments: 2% fee.
60% of payments are domestic. What are total fees?

Let's work through this step by step:"""

print("Without CoT:", call_llm(without_cot))
print("\nWith CoT:")
print(call_llm(with_cot))

# ── CoT for policy interpretation ─────────────────────────────────────
policy_cot = """You are a Razorpay compliance officer.

Policy: Transactions above Rs 50,000 require KYC verification.
Transactions from new merchants (< 30 days old) require manual review
regardless of amount. Repeat customers with good history get auto-approval
for amounts up to Rs 1,00,000.

Case: A merchant registered 45 days ago with 50 successful transactions
wants to process Rs 75,000 from a returning customer.

Reason through this step by step, then give APPROVE or MANUAL REVIEW:"""

print("\nPolicy CoT:")
print(call_llm(policy_cot))

# ── Zero-shot CoT — just add "Let's think step by step" ───────────────
def add_cot(prompt: str) -> str:
    """The simplest CoT technique — append this to any complex prompt."""
    return prompt + "\n\nLet's think step by step:"

complex_question = """Swiggy wants to rank restaurants for a user in Bangalore.
Factors: distance (closer = better), rating (higher = better),
delivery time (lower = better), order count (higher = better).
User is 3km from restaurant A (4.2 stars, 35 min, 5000 orders)
and 1km from restaurant B (3.8 stars, 20 min, 800 orders).
Which restaurant should rank higher and why?"""

print("\nRanking with CoT:")
print(call_llm(add_cot(complex_question))[:400])`} />
      </div>

      <Div />

      {/* ══ SECTION 4 — STRUCTURED OUTPUT ═══════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Technique 4</span>
        <h2 style={S.h2}>Structured output — get JSON every time, not sometimes</h2>

        <p style={S.p}>
          Production systems need machine-readable output from LLMs —
          JSON that can be parsed, validated, and inserted into a database.
          Asking for JSON without enforcement produces JSON sometimes
          and prose sometimes. Three techniques make it reliable:
          explicit format instruction, a JSON example in the prompt,
          and output parsing with retry on failure.
        </p>

        <CodeBlock code={`import os, json, re
from groq import Groq

client = Groq(api_key=os.environ.get('GROQ_API_KEY'))

# ── Technique 1: Explicit JSON instruction with schema ────────────────
def extract_structured(text: str) -> dict:
    prompt = f"""Extract information from this payment dispute.
Return ONLY valid JSON matching this exact schema:
{{
  "merchant": string,
  "amount_inr": number,
  "issue_type": "wrong_charge" | "duplicate" | "not_received" | "other",
  "urgency": "high" | "medium" | "low",
  "summary": string (max 20 words)
}}

No explanation. No markdown. Pure JSON only.

Dispute: {text}"""

    response = client.chat.completions.create(
        model='llama-3.3-70b-versatile',
        messages=[{'role': 'user', 'content': prompt}],
        temperature=0,
        max_tokens=300,
    )
    raw = response.choices[0].message.content.strip()

    # Strip markdown fences if model adds them
    raw = re.sub(r'\`\`\`json\\s*', '', raw)
    raw = re.sub(r'\`\`\`\\s*', '', raw)

    return json.loads(raw)

disputes = [
    "I was charged Rs 4999 twice by Flipkart for the same order on Monday",
    "Zepto debited Rs 850 but my order never arrived",
    "Amazon India charged Rs 12,500 but I returned the item last week",
]

print("Structured extraction:")
for dispute in disputes:
    try:
        result = extract_structured(dispute)
        print(f"\n  Input:  '{dispute[:50]}...'")
        print(f"  Output: {json.dumps(result, indent=2)}")
    except json.JSONDecodeError as e:
        print(f"  Parse error: {e}")

# ── Technique 2: Retry on parse failure ──────────────────────────────
def extract_with_retry(text: str, max_retries: int = 3) -> dict:
    last_error = None
    for attempt in range(max_retries):
        try:
            return extract_structured(text)
        except json.JSONDecodeError as e:
            last_error = e
            print(f"  Attempt {attempt+1} failed: {e}")
    raise ValueError(f"Failed after {max_retries} attempts: {last_error}")

# ── Technique 3: System prompt for consistent JSON output ─────────────
def structured_with_system(text: str) -> dict:
    response = client.chat.completions.create(
        model='llama-3.3-70b-versatile',
        messages=[
            {
                'role': 'system',
                'content': (
                    'You are a JSON extraction API. '
                    'Always respond with valid JSON only. '
                    'Never include explanation or markdown formatting.'
                ),
            },
            {
                'role': 'user',
                'content': f'Extract: merchant, amount, issue from: "{text}"',
            },
        ],
        temperature=0,
        max_tokens=200,
        response_format={'type': 'json_object'},  # enforces JSON (OpenAI/Groq)
    )
    return json.loads(response.choices[0].message.content)`} />
      </div>

      <Div />

      {/* ══ SECTION 5 — REACT ═══════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Technique 5</span>
        <h2 style={S.h2}>ReAct — Reasoning + Acting — the pattern behind AI agents</h2>

        <p style={S.p}>
          ReAct (Reasoning + Acting) interleaves the LLM's reasoning with
          tool calls. The LLM thinks about what to do, calls a tool to get
          information, observes the result, then thinks about the next step.
          This loop continues until the LLM has enough information to answer.
          ReAct is the foundation of every AI agent —
          the pattern behind LangChain, LlamaIndex, and production
          agentic systems.
        </p>

        <VisualBox label="ReAct loop — Thought → Action → Observation → repeat">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.0 }}>
            <div style={{ color: '#7b61ff' }}>Thought: I need to check Razorpay's current settlement rate for international payments.</div>
            <div style={{ color: '#D85A30' }}>Action: search_knowledge_base("international settlement rate")</div>
            <div style={{ color: '#1D9E75' }}>Observation: "International payments settle within T+7 business days at prevailing forex rate."</div>
            <div style={{ color: '#7b61ff' }}>Thought: I have the settlement time. Now I need to calculate the fee for Rs 10,000.</div>
            <div style={{ color: '#D85A30' }}>Action: calculate_fee(amount=10000, payment_type="international")</div>
            <div style={{ color: '#1D9E75' }}>Observation: Fee = Rs 300 (3% international rate)</div>
            <div style={{ color: '#7b61ff' }}>Thought: I now have both pieces of information needed to answer the question.</div>
            <div style={{ color: '#378ADD' }}>Final Answer: Your Rs 10,000 international payment will settle in T+7 days with a fee of Rs 300.</div>
          </div>
        </VisualBox>

        <CodeBlock code={`import os, json, re
from groq import Groq

client = Groq(api_key=os.environ.get('GROQ_API_KEY'))

# ── Define tools (actions the LLM can call) ───────────────────────────
KNOWLEDGE_BASE = {
    'settlement_domestic':      'Domestic payments settle in T+2 business days. Fee: 2%.',
    'settlement_international': 'International payments settle in T+7 business days. Fee: 3%.',
    'refund_policy':            'Refunds take 2-3 days for UPI, 5-7 days for credit cards.',
    'dispute_deadline':         'Disputes must be responded to within 7 days.',
}

def search_kb(query: str) -> str:
    """Search the Razorpay knowledge base."""
    query_lower = query.lower()
    for key, value in KNOWLEDGE_BASE.items():
        if any(word in query_lower for word in key.split('_')):
            return value
    return "No information found."

def calculate_fee(amount: float, payment_type: str) -> str:
    """Calculate Razorpay processing fee."""
    rate = 0.03 if payment_type == 'international' else 0.02
    fee  = amount * rate
    return f"Fee for Rs {amount:,.0f} {payment_type} payment: Rs {fee:,.0f} ({rate*100:.0f}%)"

TOOLS = {
    'search_knowledge_base': search_kb,
    'calculate_fee':         calculate_fee,
}

SYSTEM_PROMPT = """You are a Razorpay support assistant that uses tools to answer questions.

Available tools:
- search_knowledge_base(query: str) -> Search Razorpay documentation
- calculate_fee(amount: float, payment_type: str) -> Calculate fees ("domestic" or "international")

Follow this EXACT format for every response:
Thought: [your reasoning about what to do next]
Action: tool_name(arg1, arg2)

OR if you have enough information:
Thought: [final reasoning]
Final Answer: [your complete answer to the user]

Never skip the Thought. Never call a tool without a Thought first."""

def parse_action(text: str):
    """Parse 'Action: tool_name(args)' from LLM output."""
    match = re.search(r'Action:\s*(\w+)\(([^)]*)\)', text)
    if not match:
        return None, None
    tool_name = match.group(1)
    args_str  = match.group(2)
    # Parse args — simple approach
    args = [a.strip().strip('"\'') for a in args_str.split(',')]
    return tool_name, args

def react_agent(question: str, max_steps: int = 5) -> str:
    """Run the ReAct loop until Final Answer or max_steps."""
    messages = [
        {'role': 'system', 'content': SYSTEM_PROMPT},
        {'role': 'user',   'content': question},
    ]
    print(f"Q: {question}\n{'─'*50}")

    for step in range(max_steps):
        response = client.chat.completions.create(
            model='llama-3.3-70b-versatile',
            messages=messages,
            temperature=0,
            max_tokens=400,
            stop=['Observation:'],  # stop before generating fake observations
        )
        llm_output = response.choices[0].message.content.strip()
        print(f"Step {step+1}:\n{llm_output}\n")

        # Check for final answer
        if 'Final Answer:' in llm_output:
            return llm_output.split('Final Answer:')[-1].strip()

        # Parse and execute tool call
        tool_name, args = parse_action(llm_output)
        if tool_name and tool_name in TOOLS:
            try:
                if tool_name == 'calculate_fee':
                    obs = TOOLS[tool_name](float(args[0]), args[1] if len(args) > 1 else 'domestic')
                else:
                    obs = TOOLS[tool_name](args[0] if args else '')
            except Exception as e:
                obs = f"Error: {e}"
        else:
            obs = "Tool not found or no action specified."

        print(f"Observation: {obs}\n")

        # Add to conversation history
        messages.append({'role': 'assistant', 'content': llm_output})
        messages.append({'role': 'user',      'content': f"Observation: {obs}"})

    return "Max steps reached without final answer."

# Test the ReAct agent
answer = react_agent(
    "I need to process a Rs 25,000 international payment. "
    "What fee will I pay and when will it settle?"
)`} />
      </div>

      <Div />

      {/* ══ SECTION 6 — SYSTEM PROMPTS AND ROLES ════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>The meta-technique</span>
        <h2 style={S.h2}>System prompts — set role, tone, constraints, and output format once</h2>

        <p style={S.p}>
          The system prompt runs before every user message.
          It sets the LLM's persona, constraints, output format,
          and domain knowledge once — rather than repeating instructions
          in every user prompt. A well-written system prompt is the
          single highest-leverage prompt engineering investment
          for any production application.
        </p>

        <CodeBlock code={`import os
from groq import Groq

client = Groq(api_key=os.environ.get('GROQ_API_KEY'))

# ── Production system prompt for Razorpay support bot ─────────────────
RAZORPAY_SYSTEM_PROMPT = """You are Razorpay's intelligent support assistant.

ROLE: Help merchants and customers resolve payment, settlement, and integration issues.

PERSONALITY:
- Professional but conversational
- Concise — never more than 3 sentences unless absolutely necessary
- Empathetic — acknowledge frustration before solving
- Confident — give direct answers, not hedged maybes

CONSTRAINTS:
- Only discuss Razorpay products and payment-related topics
- Never quote specific fee percentages (policies change — refer to docs)
- Never ask for card numbers, CVV, or full bank account numbers
- If a question requires account-specific data, direct to dashboard or support@razorpay.com

OUTPUT FORMAT:
- For factual questions: direct answer in 1-2 sentences
- For troubleshooting: numbered steps
- For complaints: acknowledge → explain → resolve/escalate
- Always end with: "Is there anything else I can help you with?"

ESCALATION TRIGGERS:
If user mentions: fraud, legal, RBI complaint, large transaction failure (>Rs 1L)
→ Respond: "This requires urgent attention from our specialist team.
   Please email priority@razorpay.com with your merchant ID and transaction details."
"""

def support_bot(user_message: str) -> str:
    response = client.chat.completions.create(
        model='llama-3.3-70b-versatile',
        messages=[
            {'role': 'system', 'content': RAZORPAY_SYSTEM_PROMPT},
            {'role': 'user',   'content': user_message},
        ],
        temperature=0.3,   # slight creativity for empathetic responses
        max_tokens=300,
    )
    return response.choices[0].message.content.strip()

# Test different message types
test_messages = [
    "My payment failed but money was deducted",
    "How do I integrate Razorpay with my React app?",
    "I think someone made a fraudulent transaction of Rs 2 lakh on my account",
    "What is the settlement cycle?",
]

print("Razorpay Support Bot:")
for msg in test_messages:
    print(f"\nUser: {msg}")
    print(f"Bot:  {support_bot(msg)}")
    print("─" * 60)

# ── Prompt template pattern — reusable for many inputs ────────────────
CLASSIFICATION_TEMPLATE = """Classify the following {domain} {input_type}.

Categories: {categories}

Rules:
{rules}

{examples}

Now classify:
{input_type}: "{input_text}"
Category:"""

def build_classification_prompt(
    domain, input_type, categories, rules, examples, input_text
):
    example_str = '\n'.join([
        f'Example: "{ex[0]}"\nCategory: {ex[1]}'
        for ex in examples
    ])
    return CLASSIFICATION_TEMPLATE.format(
        domain=domain, input_type=input_type,
        categories=', '.join(categories),
        rules='\n'.join(f'- {r}' for r in rules),
        examples=example_str,
        input_text=input_text,
    )

# Build a complaint classifier prompt
prompt = build_classification_prompt(
    domain      = 'Swiggy customer',
    input_type  = 'complaint',
    categories  = ['Delivery', 'Food Quality', 'Payment', 'App Issue'],
    rules       = [
        'Choose the PRIMARY category only',
        'Payment issues take priority over delivery issues',
        'App crashes are always App Issue',
    ],
    examples    = [
        ('Order never arrived and I was charged', 'Payment'),
        ('Food was cold and tasted stale', 'Food Quality'),
        ('App kept crashing during checkout', 'App Issue'),
    ],
    input_text  = 'Driver marked order delivered but I never received it',
)
print(f"\nGenerated prompt:\n{prompt}")`} />
      </div>

      <Div />

      {/* ══ SECTION 7 — ERRORS ═════════════════════════════════════════════════ */}
      <div style={S.sec}>
        <span style={S.tag}>Errors you will hit</span>
        <h2 style={S.h2}>Every common prompt engineering mistake — explained and fixed</h2>

        <ErrorBlock
          error="LLM output format is inconsistent — sometimes JSON, sometimes prose, sometimes both"
          cause="The output format instruction is ambiguous or too weak. 'Return JSON' is insufficient — the model sometimes adds explanation before or after, wraps in markdown code fences, or mixes JSON with prose. Temperature above 0 increases this variability. Without a concrete JSON schema example the model guesses the structure."
          fix="Use three reinforcing instructions: (1) 'Return ONLY valid JSON, no other text' in the system prompt, (2) provide the exact JSON schema with field names and types, (3) show a complete example output. Set temperature=0 for structured output tasks. Post-process: strip markdown fences with regex before json.loads(). Add retry logic — if parsing fails, resend with 'Your previous response was not valid JSON. Return only JSON:'"
        />

        <ErrorBlock
          error="Chain-of-thought produces verbose reasoning but still gets the wrong answer"
          cause="The reasoning steps are plausible-sounding but contain an error in step 2 that cascades through subsequent steps. LLMs are confident — they write authoritative-sounding reasoning even when wrong. This is common for multi-step arithmetic, date calculations, and constraint satisfaction problems where one wrong premise invalidates the whole chain."
          fix="For arithmetic and calculations, ask the LLM to verify its work: add 'Check: verify your answer by working backwards' at the end of the CoT prompt. For critical calculations, use the LLM only for the reasoning structure and call actual code for the arithmetic — extract the numbers from the LLM's output and compute the result in Python. Never trust LLM arithmetic in production without verification."
        />

        <ErrorBlock
          error="Few-shot examples cause the model to copy the output format of examples instead of the correct answer"
          cause="The examples are too similar to each other — the model pattern-matches to the examples rather than understanding the underlying task. If all 3 examples return 'P2', the model learns to predict P2 regardless of input. Also: if example outputs have a specific length or format, the model mirrors that format even when inappropriate."
          fix="Use diverse few-shot examples that cover edge cases and boundary conditions, not just typical cases. Include at least one example of each possible output class. Order examples randomly — models sometimes weight the last example most heavily. If the model is still pattern-matching, switch to zero-shot with explicit rules instead of examples — sometimes rules are clearer than implicit demonstrations."
        />

        <ErrorBlock
          error="ReAct agent loops forever — calls the same tool repeatedly without reaching a final answer"
          cause="The LLM is stuck in a loop because the tool observation does not provide enough information to resolve the question, but the LLM keeps trying the same tool anyway. Also caused by the stop sequence not being set correctly — the LLM generates its own fake 'Observation:' continuing the loop indefinitely without calling a real tool."
          fix="Always set max_steps and enforce it strictly. Use stop=['Observation:'] to prevent the LLM from generating fake observations. After each tool call, check if the same tool was called with the same arguments as the previous step — if yes, inject 'This tool was already called with these arguments. Try a different approach or state what you cannot find.' After 3 failed steps, inject a hint or force a final answer."
        />
      </div>

      <Div />

      {/* ══ SECTION 8 — WHAT'S NEXT ════════════════════════════════════════════ */}
      <div style={{ paddingBottom: 48, paddingTop: 8 }}>
        <span style={S.tag}>What comes next</span>
        <h2 style={S.h2}>
          You can prompt any LLM effectively. Next: build LLMs
          that use tools autonomously to complete multi-step tasks.
        </h2>

        <p style={S.p}>
          Module 53 showed ReAct as a prompting pattern — manually implemented
          in Python. Module 54 covers LLM Agents properly:
          function calling (structured tool use), memory across turns,
          multi-agent coordination, and the frameworks (LangChain, LlamaIndex)
          that make building agents practical in production.
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
              Next — Module 54 · NLP
            </div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'var(--text)',
              fontFamily: 'var(--font-display)', letterSpacing: '-0.3px',
            }}>
              LLM Agents and Tool Use
            </div>
            <p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>
              Function calling, memory, multi-agent coordination,
              and the architecture behind every production AI agent.
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
          'Zero-shot prompting works for simple, well-defined tasks. Few-shot adds 2–5 (input, output) examples for tasks with specific output formats, domain terminology, or nuanced boundaries. Use 3–5 diverse examples covering edge cases — not just typical cases.',
          'Chain-of-thought (CoT) dramatically improves multi-step reasoning. Add "Let\'s think step by step:" to any complex prompt. For arithmetic, always verify with code — LLM arithmetic is unreliable in production. CoT is most valuable for policy interpretation, risk assessment, and constraint satisfaction.',
          'Structured output requires three reinforcements: explicit "return ONLY JSON" instruction, a complete schema with field names and types, and a concrete example output. Set temperature=0. Always strip markdown fences before parsing. Add retry logic — resend with correction message on parse failure.',
          'ReAct (Reasoning + Acting) interleaves LLM reasoning with tool calls. The loop: Thought → Action → Observation → repeat until Final Answer. Always set max_steps. Use stop=["Observation:"] to prevent the LLM from generating fake observations. Detect and break loops when the same tool is called with same args twice.',
          'The system prompt is the highest-leverage prompt engineering investment. Set role, persona, output format, constraints, and escalation rules once in the system prompt rather than repeating in every user prompt. A well-crafted system prompt eliminates the need for most per-request instructions.',
          'Prompt templates with named placeholders make prompts reusable, testable, and maintainable. Store templates separately from code. Version them like code. Test them with a diverse evaluation set before deploying. Small prompt changes can have large output effects — always A/B test prompt changes before full rollout.',
        ]}
      />
    </LearnLayout>
  )
}
