import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function CallingLlmApis() {
  return (
    <LearnLayout
      title="Calling LLM APIs — SDKs, Messages and Streaming"
      description="Make your first model call from Python, structure system and user messages, stream tokens to the user, and handle errors and retries."
      section="Generative AI & LLM Engineering — Lesson 01"
      readTime="35 min"
    >
      <Part n={1} label="The big picture" title="An LLM API Is Just an HTTPS Request">
        <P>
          Every AI feature you have used — a support chatbot on a bank website, a resume reviewer, a code assistant — sends
          text to a model over HTTPS and gets text back. There is no magic in the transport. Your code builds a request
          containing <strong>instructions</strong>, the <strong>conversation so far</strong>, and some <strong>settings</strong>;
          the provider runs the model; you receive generated text plus usage information you will be billed for.
        </P>
        <P>
          The three providers you will meet most often are OpenAI, Anthropic, and Google (Gemini). Their request shapes differ
          slightly, but the ideas are identical. Learn the ideas once and switching providers becomes a small refactor rather
          than a rewrite.
        </P>
        <Table
          head={['Concept', 'What it means', 'Why you care']}
          rows={[
            ['Model', 'The specific model version you call', 'Decides quality, speed, and price per token'],
            ['System / instructions', 'Rules the model should follow for the whole conversation', 'Sets tone, scope, and output format'],
            ['Messages', 'The ordered list of user and assistant turns', 'Gives the model context; the API itself is stateless'],
            ['Max output tokens', 'Upper bound on the reply length', 'Caps cost and latency'],
            ['Usage', 'Input and output token counts returned with each reply', 'This is what you pay for'],
          ]}
        />
        <Callout type="info">
          <strong>The API is stateless.</strong> The model does not remember your previous request. A &quot;conversation&quot; is
          your code re-sending the earlier messages every time. That single fact explains most cost surprises in chat apps.
        </Callout>
      </Part>

      <Part n={2} label="Setup" title="Install an SDK and Keep Your Key Out of Your Code">
        <P>
          Official SDKs wrap the HTTP calls, add types, and handle retries. Create a virtual environment and install the SDK for
          the provider you have a key for. The examples use OpenAI and Anthropic; the pattern is the same for Gemini.
        </P>
        <Code lang="bash" code={`
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\\Scripts\\activate
pip install openai anthropic python-dotenv
`} />
        <P>
          API keys are passwords that spend money. Put them in an environment variable or a <code>.env</code> file that is listed
          in <code>.gitignore</code> — never in source code, screenshots, or a notebook you share.
        </P>
        <Code lang="bash" file=".env" code={`
OPENAI_API_KEY=sk-...your-key...
ANTHROPIC_API_KEY=sk-ant-...your-key...
LLM_MODEL=the-model-name-from-your-provider-docs
`} />
        <Callout type="warning">
          Leaked keys are found by automated scanners within minutes of being pushed to a public repository. If a key ever
          leaks, revoke it in the provider dashboard first, then rotate it everywhere it is used.
        </Callout>
        <Callout type="tip">
          Model names change often. Read the model name from configuration (<code>LLM_MODEL</code> above) instead of hard-coding
          it, so upgrading a model is a config change, not a code change.
        </Callout>
      </Part>

      <Part n={3} label="First call" title="Your First Request in Python">
        <P>Here is the smallest useful call with each SDK. Both send an instruction and one user message, then print the reply and token usage.</P>
        <Code file="first_call_openai.py" code={`
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()  # reads OPENAI_API_KEY from the environment

response = client.responses.create(
    model=os.environ["LLM_MODEL"],
    instructions="You are a concise assistant for Indian college students.",
    input="Explain what an API is in two sentences.",
    max_output_tokens=200,
)

print(response.output_text)
print(response.usage)  # input_tokens, output_tokens, total_tokens
`} />
        <Code file="first_call_anthropic.py" code={`
import os
from dotenv import load_dotenv
import anthropic

load_dotenv()
client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY

message = client.messages.create(
    model=os.environ["LLM_MODEL"],
    max_tokens=200,
    system="You are a concise assistant for Indian college students.",
    messages=[{"role": "user", "content": "Explain what an API is in two sentences."}],
)

print(message.content[0].text)
print(message.usage)  # input_tokens, output_tokens
`} />
        <P>Notice what is the same: a model name, an instruction, user content, a length limit, and usage in the response. Those five things are the whole contract.</P>
      </Part>

      <Part n={4} label="Conversations" title="Messages, Roles and Keeping History">
        <P>
          To hold a conversation, keep a list of messages and append each turn. Roles tell the model who said what:
          <code> user</code> for the person, <code>assistant</code> for earlier model replies, and a system or instructions field
          for standing rules.
        </P>
        <Code file="chat_loop.py" code={`
import os
import anthropic

client = anthropic.Anthropic()
SYSTEM = "You are a friendly tutor. Answer in at most 4 sentences."
history: list[dict] = []

while True:
    user_text = input("You: ").strip()
    if user_text.lower() in {"quit", "exit"}:
        break
    history.append({"role": "user", "content": user_text})

    reply = client.messages.create(
        model=os.environ["LLM_MODEL"],
        max_tokens=400,
        system=SYSTEM,
        messages=history,          # the WHOLE conversation, every time
    )
    answer = reply.content[0].text
    history.append({"role": "assistant", "content": answer})
    print("Tutor:", answer)
`} />
        <P>
          Because you resend history on every turn, input tokens grow with each message. Real apps trim or summarise old turns
          once the conversation gets long — you will learn budgeting in the next lesson.
        </P>
        <Callout type="example">
          A food-delivery support bot does not need the last 50 messages to answer &quot;where is my order?&quot;. It needs the
          system rules, the order details fetched from the database, and the last few turns. Sending less context is cheaper,
          faster, and often more accurate.
        </Callout>
      </Part>

      <Part n={5} label="Streaming" title="Stream Tokens So Users Are Not Staring at a Spinner">
        <P>
          A long answer can take several seconds to finish. Streaming sends tokens as they are generated, so the first words
          appear almost immediately. Perceived speed matters more to users than total time.
        </P>
        <Code file="stream_openai.py" code={`
import os
from openai import OpenAI

client = OpenAI()

stream = client.responses.create(
    model=os.environ["LLM_MODEL"],
    input="Give me 5 tips to prepare for a data engineering interview.",
    stream=True,
)

for event in stream:
    if event.type == "response.output_text.delta":
        print(event.delta, end="", flush=True)
print()
`} />
        <Code file="stream_anthropic.py" code={`
import os
import anthropic

client = anthropic.Anthropic()

with client.messages.stream(
    model=os.environ["LLM_MODEL"],
    max_tokens=600,
    messages=[{"role": "user", "content": "Give me 5 tips to prepare for a data engineering interview."}],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
print()
`} />
        <P>
          In a web app, your server forwards these chunks to the browser using server-sent events or a streaming HTTP response.
          You will build that in the final lesson of this course.
        </P>
      </Part>

      <Part n={6} label="Reliability" title="Errors, Timeouts and Retries">
        <P>Production calls fail for ordinary reasons. Handle each kind deliberately rather than wrapping everything in one bare <code>except</code>.</P>
        <Table
          head={['Failure', 'Typical status', 'What to do']}
          rows={[
            ['Rate limited', '429', 'Retry with exponential backoff and jitter; reduce concurrency'],
            ['Provider overloaded or server error', '500, 503, 529', 'Retry a few times, then fall back or show a friendly error'],
            ['Timeout', '—', 'Set an explicit timeout; retry once; stream long answers'],
            ['Bad request', '400', 'Do not retry — fix the request (often too many tokens or a bad parameter)'],
            ['Authentication', '401, 403', 'Do not retry — check the key and permissions'],
          ]}
        />
        <P>Both SDKs already retry some errors. Configure the limits explicitly so behaviour is predictable:</P>
        <Code file="reliable_client.py" code={`
import os
import time
import random
from openai import OpenAI, APIStatusError, APITimeoutError, RateLimitError

client = OpenAI(timeout=30.0, max_retries=2)   # SDK-level retries for transient errors

def ask(prompt: str, attempts: int = 3) -> str:
    for attempt in range(1, attempts + 1):
        try:
            response = client.responses.create(
                model=os.environ["LLM_MODEL"], input=prompt, max_output_tokens=300,
            )
            return response.output_text
        except (RateLimitError, APITimeoutError):
            if attempt == attempts:
                raise
            time.sleep(2 ** attempt + random.random())   # backoff with jitter
        except APIStatusError as error:
            if error.status_code >= 500 and attempt < attempts:
                time.sleep(2 ** attempt)
                continue
            raise   # 4xx errors are bugs in our request: surface them
    raise RuntimeError("unreachable")
`} />
        <Callout type="tip">
          Log the request ID that providers return with every response. When you raise a support ticket or debug a bad answer,
          that ID is the fastest way to find the exact call.
        </Callout>
      </Part>

      <Part n={7} label="Design" title="Keep Provider Code Behind One Function">
        <P>
          Wrap provider calls in a tiny module of your own. The rest of your app calls <code>generate()</code> and never imports
          an SDK directly. Swapping providers, adding logging, or recording cost then happens in one place.
        </P>
        <Code file="llm.py" code={`
import os
from dataclasses import dataclass
import anthropic

_client = anthropic.Anthropic(timeout=30.0, max_retries=2)

@dataclass
class LLMResult:
    text: str
    input_tokens: int
    output_tokens: int

def generate(system: str, messages: list[dict], max_tokens: int = 500) -> LLMResult:
    reply = _client.messages.create(
        model=os.environ["LLM_MODEL"], system=system, messages=messages, max_tokens=max_tokens,
    )
    return LLMResult(
        text=reply.content[0].text,
        input_tokens=reply.usage.input_tokens,
        output_tokens=reply.usage.output_tokens,
    )
`} />
        <Steps items={[
          'Read the model name and limits from configuration.',
          'Return your own result type, not the SDK object.',
          'Record token usage on every call — you will need it for cost tracking.',
          'Add tracing and evaluation hooks here later (lessons 7 and 9).',
        ]} />
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Hard-coding the API key in a script', cause: 'It is quick while experimenting, then gets committed.', fix: 'Load keys from environment variables and keep .env in .gitignore from day one.' },
          { mistake: 'Not setting a max output limit', cause: 'Defaults can allow very long replies.', fix: 'Always set max tokens for the use case; a classifier needs 10 tokens, not 4,000.' },
          { mistake: 'Retrying every error', cause: 'A loop that retries 400 errors burns money and never succeeds.', fix: 'Retry only rate limits, timeouts, and 5xx errors, with backoff.' },
          { mistake: 'Calling the provider from the browser', cause: 'Front-end code exposes the key to every visitor.', fix: 'Call LLM APIs only from your server, and let the browser talk to your server.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Build a Command-Line Study Buddy">
        <Practice
          title="A streaming CLI tutor with history and safe retries"
          tasks={[
            'Create llm.py with a generate() function like Part 7, reading the model from LLM_MODEL.',
            'Write a chat loop that keeps history and streams each answer to the terminal.',
            'Print input and output tokens after every turn, and a running total at the end.',
            'Keep only the last 6 messages in history and observe how input tokens stop growing.',
            'Turn off your network mid-conversation and confirm the app shows a friendly error instead of a stack trace.',
          ]}
          hint="Streaming and usage both exist in the SDKs: Anthropic exposes the final message (with usage) via stream.get_final_message()."
        />
      </Part>

      <KeyTakeaways items={[
        'An LLM API call is an HTTPS request with a model, instructions, messages, and limits; the response includes text and token usage.',
        'The API is stateless — conversations work because your code resends history, so input cost grows every turn.',
        'Keep API keys in environment variables and call providers only from server-side code.',
        'Stream long answers so users see output immediately.',
        'Retry rate limits, timeouts, and server errors with backoff; never retry 4xx request errors.',
        'Hide provider SDKs behind one function so switching models, logging, and cost tracking happen in one place.',
      ]} />

      <Bullets items={[
        <span key="ref">Official references: the OpenAI, Anthropic, and Google Gemini API documentation. Check them for current model names and prices before you ship.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/generative-ai/tokens-pricing-rate-limits"
        label="Lesson 02 · Tokens, Pricing and Rate Limits"
        text="You can call a model. Next, learn what a token is, how to estimate the monthly bill for a feature before you build it, and how to stay inside rate limits."
      />
    </LearnLayout>
  )
}
