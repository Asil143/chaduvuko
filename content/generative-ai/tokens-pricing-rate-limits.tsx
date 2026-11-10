import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function TokensPricingRateLimits() {
  return (
    <LearnLayout
      title="Tokens, Pricing and Rate Limits"
      description="Count tokens, estimate the cost of a feature in rupees and dollars, and design around rate limits and timeouts."
      section="Generative AI & LLM Engineering — Lesson 02"
      readTime="25 min"
    >
      <Part n={1} label="Mental model" title="A Token Is Not a Word">
        <P>
          Providers measure model input and output in <strong>tokens</strong>. A token may be a whole short word, part of a long
          word, punctuation, or a piece of a non-English script. The same sentence can use a different number of tokens with
          different tokenizers. Indian-language text, code, JSON punctuation, and repeated conversation history can all have
          token counts that surprise you if you estimate from word count alone.
        </P>
        <P>
          The request usually consumes input tokens for instructions, conversation, retrieved context, and tool results. The
          answer consumes output tokens. These quantities may have different prices. An API response often reports usage; log
          that observed count rather than relying on an estimate after the feature ships.
        </P>
        <Table
          head={['Input component', 'Example', 'Cost implication']}
          rows={[
            ['Instructions', 'Rules repeated on every request', 'Usually a stable input cost per call'],
            ['User content', 'A question, document or support message', 'Varies with user behaviour'],
            ['Conversation / retrieval', 'History or selected document chunks', 'Can grow unless explicitly bounded'],
            ['Generated answer', 'The model completion', 'Output pricing and latency; set a useful limit'],
          ]}
          caption="Think in measured tokens for each request, not in vague page or word counts."
        />
        <Callout type="info">
          Tokenisation is model-family dependent. Use the tokenizer or usage field associated with the provider and model you
          actually call; treat a different tokenizer&apos;s result as an estimate, not a billing record.
        </Callout>
      </Part>

      <Part n={2} label="Inspect" title="Count Tokens Before You Send a Request">
        <P>
          A local tokenizer is useful for prompt sizing, truncation checks, and comparing alternative templates. The following
          example uses <code>tiktoken</code> as an illustration. Choose the encoding documented for your model, and verify
          estimates against provider-reported usage because chat framing and provider-specific inputs may add tokens.
        </P>
        <Code lang="bash" code={`
python -m pip install tiktoken
`} />
        <Code file="count_tokens.py" code={`
import tiktoken

text = "Help a student understand why their UPI payment is pending."
encoding = tiktoken.get_encoding("cl100k_base")
tokens = encoding.encode(text)

print("token count:", len(tokens))
print("token pieces:", [encoding.decode([token]) for token in tokens])
`} />
        <P>
          Encoding names are tokenizer choices, not model names. If a provider offers a tokenizer endpoint or official counting
          helper for the selected model, prefer that for more accurate preflight checks. For actual billing, reconcile with
          usage reported by the API and your provider&apos;s current pricing page.
        </P>
        <Callout type="tip">
          Measure representative production-like examples, including long prompts, code, mixed English and Telugu, JSON, and
          empty or malformed inputs. A single short English sentence is not a useful sizing benchmark.
        </Callout>
      </Part>

      <Part n={3} label="Budget" title="Estimate Monthly Cost in Rupees">
        <P>
          Cost planning is multiplication, not guesswork. Estimate the number of calls per month and average input and output
          tokens per call; multiply each token count by its respective price per million tokens. For a rupee estimate, convert
          the resulting foreign-currency amount using an exchange rate that your finance configuration owns. Keep both prices
          and the exchange rate in deployment configuration so a pricing change does not require a code edit.
        </P>
        <Code file=".env.example" lang="bash" code={`
# Replace these placeholders with the current values for your selected model.
INPUT_USD_PER_MILLION=0.00
OUTPUT_USD_PER_MILLION=0.00
USD_TO_INR=0.00
MONTHLY_CALLS=10000
AVG_INPUT_TOKENS=1200
AVG_OUTPUT_TOKENS=250
`} />
        <Code file="estimate_cost.py" code={`
import os

calls = int(os.environ["MONTHLY_CALLS"])
input_tokens = int(os.environ["AVG_INPUT_TOKENS"])
output_tokens = int(os.environ["AVG_OUTPUT_TOKENS"])
input_price = float(os.environ["INPUT_USD_PER_MILLION"])
output_price = float(os.environ["OUTPUT_USD_PER_MILLION"])
usd_to_inr = float(os.environ["USD_TO_INR"])

monthly_input_tokens = calls * input_tokens
monthly_output_tokens = calls * output_tokens
usd = (
    monthly_input_tokens / 1_000_000 * input_price
    + monthly_output_tokens / 1_000_000 * output_price
)
print(f"Estimated monthly model cost: \${usd:.2f} / ₹{usd * usd_to_inr:,.2f}")
`} />
        <P>
          The zeroes above are deliberately placeholders, not quoted prices. Populate them from the current official pricing
          page for the chosen model, and keep an audit date with that configuration. Production estimates should also include
          retries, evaluation calls, embeddings, cached-input rules if applicable, and taxes or other platform costs where
          relevant. Add a safety margin based on observed variability, not an unexplained multiplier.
        </P>
        <Steps items={[
          'Measure prompt and answer token distributions from realistic examples.',
          'Estimate monthly calls by feature and include expected retries and background jobs.',
          'Read current input and output prices for the configured model into deployment config.',
          'Compare the estimate with provider usage and actual invoices after launch; update assumptions.',
        ]} />
      </Part>

      <Part n={4} label="Capacity" title="RPM and TPM Are Different Limits">
        <P>
          Rate limits protect shared infrastructure and are commonly expressed as requests per minute (RPM) and tokens per
          minute (TPM). A service can stay under its request quota while exceeding its token quota with a few very large
          prompts. Conversely, many tiny calls can exhaust RPM first. Providers can also apply other limits, such as concurrent
          requests, daily quotas, or model-specific capacity. Read the current account and model limits; do not assume one
          universal number.
        </P>
        <Table
          head={['Limit', 'What is counted', 'Useful response']}
          rows={[
            ['RPM', 'Requests during a time window', 'Queue work, reuse results, or safely combine small tasks'],
            ['TPM', 'Tokens sent and/or generated during a time window', 'Bound context and output; pace by token budget'],
            ['Concurrency', 'Requests in flight at once', 'Use a bounded worker pool and connection limits'],
            ['Quota / budget', 'Account-level spend or usage over a longer period', 'Alerts, budgets, graceful degradation, and owner escalation'],
          ]}
          caption="Exact limit dimensions and reset behaviour vary by provider and account."
        />
        <P>
          A useful scheduler reserves capacity before dispatch: estimate input plus a conservative output allowance, then update
          the estimate with actual usage. Keep a queue for work that can wait, and give interactive requests priority without
          allowing background jobs to starve them.
        </P>
        <Callout type="warning">
          A 429 response is not a cue to retry instantly in a tight loop. That creates more load, wastes quota, and can delay
          recovery. Honour provider retry guidance when available and apply exponential backoff with jitter.
        </Callout>
      </Part>

      <Part n={5} label="Efficiency" title="Batching, Caching and Context Budgets">
        <P>
          Batching can reduce per-request overhead when several independent tasks are ready, and some providers offer offline
          batch facilities with their own limits and latency trade-offs. Batch only requests whose results can be consumed
          together; one slow item should not hold an urgent interactive response hostage. Preserve an identifier for every
          input so results can be matched to the right record.
        </P>
        <P>
          Caching avoids repeating identical work. A deterministic exact-response cache can use a key derived from the model,
          normalized input, instructions, and relevant settings. Do not cache personalized or sensitive output across users.
          Set a suitable expiration, invalidate on source changes, and decide whether the quality and freshness trade-off is
          acceptable. Semantic caching is more complex and requires separate relevance checks.
        </P>
        <Code file="bounded_work.py" code={`
from collections.abc import Iterable

MAX_ITEMS = 20

def batches(items: Iterable[str], size: int = MAX_ITEMS):
    if size < 1:
        raise ValueError("size must be positive")
    batch = []
    for item in items:
        batch.append(item)
        if len(batch) == size:
            yield batch
            batch = []
    if batch:
        yield batch

for group in batches(["record-a", "record-b", "record-c"], size=2):
    print("submit a provider-supported batch:", group)
`} />
        <P>
          Reducing the request can improve quality as well as cost: retain only the conversation turns needed to answer the
          current question, retrieve a few relevant chunks instead of a whole document, and set an output limit appropriate
          for the task. Avoid silently dropping crucial policy or user-provided context just to hit a budget.
        </P>
      </Part>

      <Part n={6} label="Operations" title="Build a Budget and a Backpressure Plan">
        <P>
          Measure input tokens, output tokens, latency, retries, and 429s by feature and configured model. Aggregate these
          metrics rather than logging raw prompts by default; prompts may contain personal or confidential data. Set alerts
          for unusual spend and quota exhaustion, and decide what the product does when the provider is unavailable: queue,
          offer a non-AI fallback, or return a clear retry-later message.
        </P>
        <Code file="retry_after_rate_limit.py" code={`
import random
import time
from collections.abc import Callable

# The operation should raise the provider SDK's rate-limit exception on 429.
def with_backoff(operation: Callable[[], str], attempts: int = 4) -> str:
    for attempt in range(attempts):
        try:
            return operation()
        except Exception as error:
            # In a real adapter, catch only the provider's rate-limit and
            # transient server exceptions; let validation/auth errors surface.
            if not is_retryable_provider_error(error) or attempt == attempts - 1:
                raise
            delay = min(30.0, 2 ** attempt) + random.uniform(0, 0.5)
            time.sleep(delay)
    raise RuntimeError("unreachable")
`} />
        <P>
          <code>is_retryable_provider_error</code> is intentionally an adapter boundary: implement it with the exceptions from
          your installed SDK. Do not copy a made-up exception class. Also avoid retrying a request with a non-idempotent side
          effect unless your application has an idempotency strategy. Every retry consumes time and may consume tokens.
        </P>
        <Callout type="example">
          For an order-support feature, show the order status already stored in your own system if model capacity is exhausted.
          The model can explain the status when available; it should not be the only route for users to see critical account data.
        </Callout>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Cost and Capacity Mistakes">
        <Mistakes items={[
          { mistake: 'Estimate tokens by counting words', cause: 'Token boundaries vary across text, code, scripts, and tokenizers.', fix: 'Use an appropriate tokenizer for sizing and verify with provider-reported usage.' },
          { mistake: 'Use a price copied into source code', cause: 'Prices and model availability can change, and input/output may differ.', fix: 'Read placeholder values from deployment config populated from current official pricing.' },
          { mistake: 'Track RPM but ignore TPM', cause: 'A few long requests can exhaust a token budget even with low request volume.', fix: 'Budget both request count and token count, including output allowance.' },
          { mistake: 'Retry immediately forever', cause: 'Retries add load and spend while preventing the queue from recovering.', fix: 'Use bounded retries, jitter, provider guidance, and a fallback or queue policy.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Plan a UPI Support Assistant Budget">
        <Practice
          title="Estimate, load-test and control a monthly budget"
          tasks={[
            'Choose three realistic support prompts and count their input tokens with the tokenizer for your provider/model; compare estimates with API usage when safely available.',
            'Run the cost script with clearly labelled test configuration values, then replace them with prices from the selected model’s current official pricing page before making a real estimate.',
            'Estimate a month for low, expected and peak call volumes. Include input and output separately and state the assumptions.',
            'Design a request queue that limits both concurrent requests and token throughput; decide which work is interactive and which can wait.',
            'Describe an exact-cache key and expiration policy that cannot leak one customer’s answer to another customer.',
          ]}
          hint="Keep all numeric prices and exchange rates in configuration. A good estimate explains its assumptions and gets compared with measured usage."
        />
      </Part>

      <KeyTakeaways items={[
        'Tokens are model-specific units, not words; measure representative input and output.',
        'Use tokenizer counts for sizing and provider-reported usage for reconciliation.',
        'Estimate spend with calls × token counts × configured price per million, then convert to INR using a configured exchange rate.',
        'Prices in examples are placeholders; verify current official prices and account limits before deployment.',
        'RPM, TPM, concurrency, and account quotas are distinct constraints and need separate controls.',
        'Batch independent work, cache only safe and valid results, and apply bounded retries with backoff.',
      ]} />
      <H3>Next</H3>
      <NextLesson
        href="/learn/generative-ai/structured-outputs-pydantic"
        label="Lesson 03 · Structured Outputs with JSON Schema and Pydantic"
        text="Now that requests fit your budget, learn to turn model responses into validated data your application can safely use."
      />
    </LearnLayout>
  )
}
