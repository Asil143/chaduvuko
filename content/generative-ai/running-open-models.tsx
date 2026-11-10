import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function RunningOpenModels() {
  return (
    <LearnLayout
      title="Running Open Models — Ollama, vLLM and Hugging Face"
      description="Run open-weight models locally with Ollama, serve them with vLLM, pick a model from Hugging Face, and compare cost, latency and quality with hosted APIs."
      section="Generative AI & LLM Engineering — Lesson 13"
      readTime="35 min"
    >
      <Part n={1} label="Concept" title="Open Weights Give You More Control—and More Responsibility">
        <P>
          A hosted API runs inference on a provider's infrastructure. With an open-weight model, you can obtain model weights
          under a particular licence and run inference on your own machine or infrastructure. That can improve control over
          deployment, data flow and hardware choices, but it does not mean the model is free to use for every purpose or that
          you own the training data. Read the model card and licence, evaluate acceptable use, and plan for updates and
          operational support.
        </P>
        <P>
          Ollama is convenient for local experiments and provides a local API. vLLM is an inference server often selected when
          throughput and GPU serving matter. Hugging Face is a model and tooling ecosystem where teams discover model cards,
          weights and libraries. These are complementary pieces, not interchangeable product guarantees: check current
          documentation, hardware compatibility and the model's own requirements before committing.
        </P>
        <Table
          head={['Path', 'Good first use', 'Trade-off to plan for']}
          rows={[
            ['Hosted model API', 'Prototype quickly without managing inference hardware', 'Provider terms, network dependency and usage charges'],
            ['Ollama locally', 'Private development experiments on a workstation', 'Local hardware, model storage and workstation availability'],
            ['vLLM server', 'Serve a compatible model on managed GPU infrastructure', 'GPU operations, scaling and model-specific tuning'],
            ['Hugging Face tooling', 'Inspect model cards and load supported checkpoints', 'Licence review, downloads, dependencies and memory needs'],
          ]}
        />
        <Callout type="info">
          &quot;Open-weight&quot; describes access to model weights, not necessarily open-source software or unrestricted use. Licence
          obligations and acceptable-use terms are model-specific.
        </Callout>
      </Part>

      <Part n={2} label="Select" title="Choose a Model by Requirements, Not Hype">
        <P>
          Start with a task and a baseline. A small instruction model may be enough for a fixed-format extraction task, while
          code or multilingual use may require different capabilities. Compare candidates on your own prompts and documents,
          not only public benchmark scores. Model IDs should live in environment configuration so an upgrade is deliberate and
          reversible.
        </P>
        <Code file=".env.example" lang="bash" code={`
# Copy these values from the chosen model card and local deployment configuration.
MODEL_ID=replace-with-an-approved-model-id
OLLAMA_MODEL=replace-with-a-model-available-in-your-local-install
LOCAL_API_BASE=http://localhost:11434
`} />
        <Steps items={[
          'Write down the quality, language, context, latency and privacy requirements for one representative task.',
          'Check the model card for licence, intended use, supported languages, context limits and known limitations.',
          'Estimate weight storage and inference memory from documented model requirements; include runtime overhead.',
          'Run a small, versioned evaluation set and compare quality with your hosted baseline.',
          'Pin an approved model revision for repeatable deployment and record who can change it.',
        ]} />
        <Callout type="tip">
          Use a configuration variable such as <code>MODEL_ID</code>, but do not assume any arbitrary repository ID will work
          with every runtime. Confirm model architecture and serving support first.
        </Callout>
      </Part>

      <Part n={3} label="Local" title="Try an Ollama Model Behind a Local API">
        <P>
          Install Ollama using its official instructions for your operating system, then choose a model available to your
          installation and put its exact identifier in configuration. The following Python example uses the local chat API;
          it does not require exposing a provider key. Keep the service bound to a trusted local interface while experimenting.
        </P>
        <Code file="ollama_chat.py" code={`
import json
import os
from urllib.request import Request, urlopen


base_url = os.environ.get("LOCAL_API_BASE", "http://localhost:11434").rstrip("/")
model = os.environ["OLLAMA_MODEL"]
payload = {
    "model": model,
    "messages": [
        {"role": "system", "content": "Explain clearly and say when you are uncertain."},
        {"role": "user", "content": "What is a database index?"},
    ],
    "stream": False,
}
request = Request(
    f"{base_url}/api/chat",
    data=json.dumps(payload).encode("utf-8"),
    headers={"Content-Type": "application/json"},
    method="POST",
)
with urlopen(request, timeout=60) as response:
    result = json.load(response)
print(result["message"]["content"])
`} />
        <P>
          This script is an experiment, not a production service. Add request validation and controlled error handling before
          using a local model from a web app. Never expose an unauthenticated inference endpoint to a public network: anyone
          who can reach it may consume your machine's resources or send prompts you did not intend to support.
        </P>
      </Part>

      <Part n={4} label="Serve" title="Use vLLM When You Need a Managed Inference Endpoint">
        <P>
          A serving engine loads a model onto suitable hardware and handles inference requests. vLLM can expose an
          OpenAI-compatible API for supported configurations. A basic launch is shown below; choose the model ID from your
          reviewed deployment configuration and follow the current vLLM installation and model-specific documentation for
          hardware, access and optional settings. Do not copy model-specific flags blindly.
        </P>
        <Code file="start_server.sh" lang="bash" code={`
# MODEL_ID is set by the deployment environment after licence and hardware review.
vllm serve "$MODEL_ID"
`} />
        <P>
          For a production deployment, package the exact runtime dependencies, place the server behind authentication and an
          application gateway, and configure health checks, timeouts and concurrency limits. A server that listens on a
          reachable interface needs network policy and access control. The application should send only authorized prompts and
          should never trust a model response as a command to run on the host.
        </P>
        <Code file="openai_compatible_client.py" code={`
import os
from openai import OpenAI


client = OpenAI(
    base_url=os.environ["LOCAL_OPENAI_BASE_URL"],
    api_key=os.environ.get("LOCAL_OPENAI_API_KEY", "local-only"),
)
response = client.chat.completions.create(
    model=os.environ["MODEL_ID"],
    messages=[{"role": "user", "content": "Summarize this public FAQ in two sentences."}],
)
print(response.choices[0].message.content)
`} />
        <P>
          The server and client must agree on the model identifier and request shape. Some compatible endpoints still differ in
          supported parameters, structured outputs, streaming or tool calling. Exercise each feature you rely on against the
          deployed version rather than assuming compatibility from the endpoint format alone.
        </P>
      </Part>

      <Part n={5} label="Hugging Face" title="Inspect the Model Card Before Loading Weights">
        <P>
          On Hugging Face, a model card is part of the selection process: review its intended use, licence, architecture,
          training context and limitations. The Transformers loading pattern below reads the repository ID from the
          environment. It assumes the selected checkpoint is supported by the installed Transformers version and that the
          machine has enough memory; installation details and optional acceleration vary across models and hardware.
        </P>
        <Code file="inspect_model.py" code={`
import os
from transformers import AutoConfig, AutoTokenizer


model_id = os.environ["MODEL_ID"]
config = AutoConfig.from_pretrained(model_id)
tokenizer = AutoTokenizer.from_pretrained(model_id)
print("architecture:", config.architectures)
print("tokenizer vocabulary:", len(tokenizer))
print("model type:", config.model_type)
`} />
        <P>
          Loading remote model code can execute code depending on library settings and repository contents. Prefer checkpoints
          that do not require custom code, inspect any custom code before enabling it, pin revisions, and run downloads and
          inference in an appropriately isolated environment. Do not send private customer data to an external model host unless
          your policies and agreements allow it.
        </P>
        <Callout type="warning">
          A model download is a software supply-chain event. Record the repository and revision, verify publisher and licence,
          scan dependencies, and promote an approved artifact rather than downloading a moving default on every production start.
        </Callout>
      </Part>

      <Part n={6} label="Quantisation" title="Trade Memory for Some Accuracy and Speed Changes">
        <P>
          Quantisation stores model weights at a lower numerical precision, often reducing memory requirements. The quality
          impact depends on the model, quantisation method and task. A smaller artifact can make local inference feasible, but
          latency also depends on the processor, memory bandwidth, batching and runtime. Benchmark the exact build you plan to
          operate; do not infer production performance from file size alone.
        </P>
        <Table
          head={['Measure', 'Question to answer', 'How to compare']}
          rows={[
            ['Quality', 'Does the model still answer the real task correctly?', 'Run the same reviewed eval set and inspect errors'],
            ['Latency', 'Can users wait for the response?', 'Measure time to first token and total response time'],
            ['Throughput', 'Can the service handle expected concurrency?', 'Load test with bounded, representative requests'],
            ['Resource use', 'Does the workload fit available hardware?', 'Observe memory, accelerator use and queue depth'],
            ['Operations', 'Can the team patch and recover the service?', 'Test restart, rollback, monitoring and capacity alerts'],
          ]}
        />
        <P>
          Select quantisation or batching only after collecting a baseline. Preserve the evaluated model artifact and settings,
          then rerun the evaluation whenever weights, runtime, prompt template or hardware changes.
        </P>
      </Part>

      <Part n={7} label="Decision" title="Compare Total Cost and Reliability with a Hosted API">
        <P>
          Local inference replaces some per-request provider expense with fixed and operational costs: hardware rental or
          purchase, power, storage, deployment work, monitoring, security and downtime. If requests are sporadic, a hosted API
          may be simpler. If workloads are steady and predictable, self-hosting may be worth measuring. Compare the same task,
          quality bar and reliability target on both paths.
        </P>
        <Code file="compare_runs.py" code={`
from dataclasses import dataclass


@dataclass(frozen=True)
class Run:
    system: str
    requests: int
    correct: int
    total_seconds: float
    estimated_cost_inr: float


def summarize(run: Run) -> dict[str, float]:
    if run.requests <= 0 or run.total_seconds <= 0:
        raise ValueError("requests and elapsed time must be positive")
    return {
        "accuracy_on_reviewed_set": run.correct / run.requests,
        "requests_per_second": run.requests / run.total_seconds,
        "estimated_cost_per_request_inr": run.estimated_cost_inr / run.requests,
    }

# Populate from the same evaluation set and measured infrastructure costs.
`} />
        <P>
          Cost estimates must include idle capacity and engineering operations, not only GPU time while generating. Track
          quality, errors, queueing and cost together: a low-cost model that repeatedly needs human correction may be the more
          expensive choice overall.
        </P>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Mistakes">
        <Mistakes items={[
          { mistake: 'Assuming open weights mean unrestricted commercial use', cause: 'Each model can have its own licence and use conditions.', fix: 'Review and record the licence and intended-use terms before evaluation or deployment.' },
          { mistake: 'Exposing a local inference port publicly', cause: 'A development server may have no authentication or resource limits.', fix: 'Bind to a trusted interface, use network controls and require application-level authorization.' },
          { mistake: 'Choosing a model from a benchmark headline', cause: 'General benchmarks may not match your languages, domain or failure costs.', fix: 'Compare candidates on a representative, versioned evaluation set.' },
          { mistake: 'Downloading a moving model revision on every deploy', cause: 'Weights or custom code may change without an application release.', fix: 'Pin and review the artifact, record dependencies, and test rollback.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Benchmark One Local Model Against Your Baseline">
        <Practice
          title="A repeatable model selection experiment"
          tasks={[
            'Choose a permitted, compatible open-weight model from its official model card and configure its exact ID in the environment.',
            'Run the same five public FAQ questions through a hosted baseline and a local Ollama or vLLM endpoint.',
            'Record response quality, errors, time to first token, total latency and measured resource usage.',
            'Compare a standard and quantized build only if both are supported, and rerun the same evaluation after every change.',
            'Write a deployment checklist covering licence, artifact revision, endpoint access, monitoring and rollback.',
          ]}
          hint="Do not use private customer data in a prototype. Keep prompts and expected outcomes in a small version-controlled evaluation file."
        />
      </Part>

      <KeyTakeaways items={[
        'Open-weight inference shifts responsibility for model selection, licence review, hardware, security and operations to your team.',
        'Ollama suits local experiments; vLLM serves compatible models; Hugging Face helps discover and load model artifacts.',
        'Read model cards, pin approved revisions and keep model identifiers in configuration rather than source code.',
        'Quantisation and batching can change quality, latency and resource use; measure the deployed configuration.',
        'Compare total cost and reliability on a representative evaluation set, including fixed infrastructure and engineering effort.',
        'Protect inference endpoints with authentication, network controls, bounded requests and safe failure behavior.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/generative-ai/shipping-ai-feature-fastapi"
        label="Lesson 14 · Shipping an AI Feature — FastAPI Backend and Chat UI"
        text="You have compared local and hosted inference. Next, wrap an AI feature in a service with streaming responses, a chat UI and deployment checks."
      />
    </LearnLayout>
  )
}
