import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function LlmFrameworks() {
  return (
    <LearnLayout
      title="LLM Frameworks — LangChain and LlamaIndex: When to Use Them"
      description="What LangChain and LlamaIndex give you, what they cost in complexity, and how to decide between a framework and plain SDK code."
      section="Generative AI & LLM Engineering — Lesson 11"
      readTime="25 min"
    >
      <Part n={1} label="Why frameworks" title="Frameworks Package Repeated LLM Application Patterns">
        <P>
          A provider SDK helps you call a model. An application framework can connect that call to prompts, structured
          outputs, retrieval, tools, memory, or orchestration. LangChain offers a broad set of components and orchestration
          patterns; LlamaIndex focuses on connecting data to LLM applications, including ingestion and retrieval workflows.
          Their exact features evolve, so compare current documentation before committing to an API.
        </P>
        <P>
          A framework is not automatically more reliable or more intelligent. It is an abstraction layer your team must
          understand, operate, test, and upgrade. For a single model call, the plain SDK may be clearer. For a pipeline with
          many reusable integrations, a framework can save implementation effort—if you need the features it provides.
        </P>
        <Table
          head={['Approach', 'Often a good fit when', 'Main trade-off']}
          rows={[
            ['Plain provider SDK', 'One or a few calls and a small explicit workflow', 'You implement integrations and composition yourself'],
            ['LangChain', 'You need its current integrations or composable orchestration patterns', 'More abstractions and version-sensitive behavior'],
            ['LlamaIndex', 'Data ingestion, indexing, and retrieval are central to the feature', 'Data framework concepts and configuration to learn'],
            ['Mixed / narrow use', 'One framework component solves a measured gap', 'Keep ownership boundaries and conversions explicit'],
          ]}
        />
        <Callout type="info">
          Choose the smallest abstraction that makes the important behavior explicit and testable. A familiar framework is not a
          requirement, and a plain SDK is not a sign of an immature design.
        </Callout>
      </Part>

      <Part n={2} label="Decision criteria" title="Start with the Workflow, Not the Library Name">
        <P>
          Describe the feature first: What data must be retrieved? Which steps call a model? Do you need branching, state,
          retries, evaluation hooks, or provider portability? Which component owns authorization and validation? Once these needs
          are clear, compare framework capabilities with the actual requirements and inspect whether the abstraction hides
          behavior you need to observe or control.
        </P>
        <Steps items={[
          'Write down the user workflow and data boundaries in plain language.',
          'Identify repeated plumbing you would otherwise implement: retrieval connectors, parsing, or orchestration.',
          'Check framework coverage, documentation, maintenance, and current provider support for your required path.',
          'Prototype the smallest representative slice and measure implementation effort and runtime behavior.',
          'Keep a thin application-owned interface around model, retrieval, and domain logic.',
        ]} />
        <P>
          For a small FAQ assistant, a direct SDK call plus a vector-store query may remain understandable. If the product grows
          into multiple document sources, transformations, and retrieval evaluation, a data-oriented framework may be useful.
          If the workflow becomes a multi-step orchestration with several model and tool integrations, a broader framework may
          reduce glue code. Those are starting hypotheses to test, not rules.
        </P>
        <Callout type="tip">
          Compare the implementation that would be maintained next year, not only the number of lines in a tutorial. Consider
          observability, testing, dependency upgrades, and how easily a new engineer can trace one request.
        </Callout>
      </Part>

      <Part n={3} label="Plain SDK" title="Keep a Direct Call When the Workflow Is Small">
        <P>
          A provider SDK makes the network boundary visible. You can own request construction, retry policy, context selection,
          and error mapping without learning a second abstraction. A small function is easy to unit test when you keep the
          provider client behind a boundary and return an application-level result rather than leaking SDK types everywhere.
        </P>
        <Code file="llm_boundary.py" code={`
from dataclasses import dataclass
from typing import Protocol

@dataclass(frozen=True)
class Generation:
    text: str
    input_tokens: int
    output_tokens: int

class TextModel(Protocol):
    def generate(self, system: str, user: str) -> Generation: ...

class StudyHelper:
    def __init__(self, model: TextModel) -> None:
        self.model = model

    def explain(self, topic: str) -> str:
        result = self.model.generate(
            "Explain accurately for a beginner. If unsure, say so.",
            topic,
        )
        return result.text.strip()
`} />
        <P>
          The protocol is application-owned, so a provider adapter or a fake test implementation can satisfy it. This example
          is not a provider SDK implementation; it shows the boundary to preserve. Read model IDs and credentials from runtime
          configuration, and keep timeout and retry behavior visible at the adapter.
        </P>
      </Part>

      <Part n={4} label="LangChain" title="Use a Broad Framework for Integrations You Actually Need">
        <P>
          LangChain can provide reusable integrations and abstractions for models, prompts, tools, retrieval, and orchestration.
          That can be useful when the application composes multiple parts or needs an integration already maintained by its
          ecosystem. Start with one path end-to-end and make sure you can identify the underlying request, inputs, outputs, and
          failures when debugging.
        </P>
        <P>
          The cost is a larger dependency surface and additional concepts between your code and the provider. APIs and package
          layouts can change; avoid copying an old code sample without checking the version you have installed. Keep business
          logic and permissions outside a chain so they remain ordinary testable application rules.
        </P>
        <Code file="framework_boundary.py" code={`
from dataclasses import dataclass
from typing import Protocol

@dataclass(frozen=True)
class Answer:
    text: str
    source_ids: tuple[str, ...]

class AnswerPipeline(Protocol):
    def run(self, question: str, user_id: str) -> Answer: ...

class HelpService:
    def __init__(self, pipeline: AnswerPipeline) -> None:
        self.pipeline = pipeline

    def respond(self, question: str, user_id: str) -> Answer:
        # Authorization happens before private retrieval inside the application.
        if not user_id:
            raise PermissionError("Sign in required")
        return self.pipeline.run(question, user_id)
`} />
        <P>
          The interface lets the service depend on a capability rather than a specific framework class. The framework adapter
          can handle composition, while your app keeps control over identity, policy, output validation, and error mapping.
        </P>
      </Part>

      <Part n={5} label="LlamaIndex" title="Use a Data-Oriented Framework When Retrieval Is the Hard Part">
        <P>
          LlamaIndex is designed around connecting data to LLM applications. Its ecosystem can help structure ingestion,
          indexing, retrieval, and query workflows across supported sources. If document processing and retrieval are your main
          complexity, its abstractions may be a closer fit than assembling every connector yourself.
        </P>
        <P>
          Retrieval frameworks do not remove the need to understand chunking, metadata, access filters, embedding behavior, and
          relevance evaluation. Confirm that retrieved records respect user permissions and that you can inspect the evidence
          behind an answer. Keep an escape hatch for provider-specific options you need to control.
        </P>
        <Table
          head={['Question', 'Plain SDK path', 'Framework path']}
          rows={[
            ['How much retrieval plumbing?', 'Own and test each integration', 'Reuse supported ingestion and retrieval components'],
            ['How visible is behavior?', 'Direct request and response path', 'May pass through several abstractions'],
            ['How are changes upgraded?', 'SDK and your adapter', 'Framework plus integration dependencies'],
            ['Where is it strongest?', 'Small explicit workflows', 'Repeated integrations or data orchestration'],
          ]}
        />
        <Callout type="example">
          A study-material search feature that imports documents, splits them, indexes metadata, and retrieves passages may
          benefit from a data framework. A static list of a few trusted FAQ entries may not need one.
        </Callout>
      </Part>

      <Part n={6} label="Testability and operations" title="Keep the Important Contract Independent of the Framework">
        <P>
          Regardless of library, preserve application-owned types for inputs and results. Test authorization, prompt inputs,
          expected output schemas, tool permissions, and failure handling separately. Add contract tests at framework adapters
          and end-to-end evaluation cases for retrieval quality. Instrument model and retrieval spans at stable boundaries so a
          framework upgrade does not erase operational visibility.
        </P>
        <Code file="test_service.py" code={`
from dataclasses import dataclass

@dataclass
class FakeModel:
    received_system: str = ""
    received_user: str = ""

    def generate(self, system: str, user: str):
        self.received_system = system
        self.received_user = user
        return type("Result", (), {"text": "A clear explanation.",
                                    "input_tokens": 12, "output_tokens": 5})()

def test_service_passes_question_through_boundary() -> None:
    fake = FakeModel()
    service = StudyHelper(fake)
    answer = service.explain("What is a database index?")
    assert answer == "A clear explanation."
    assert fake.received_user == "What is a database index?"
`} />
        <P>
          This small test verifies the domain boundary without a network call. Add separate tests for adapter behavior and use a
          controlled golden evaluation set to assess model output. A framework’s own example tests cannot guarantee your
          product-level behavior.
        </P>
      </Part>

      <Part n={7} label="Adopt or remove" title="Treat a Framework as a Reversible Decision">
        <P>
          Adopt a framework for a concrete reason: it removes repeated maintenance, provides a needed integration, or makes a
          complex workflow clearer. Define the boundary so the rest of the application does not depend on framework-specific
          objects. Record the version and configuration, and upgrade in a small step with regression tests and trace comparison.
        </P>
        <P>
          If a framework becomes difficult to reason about, trace the feature that causes pain. A narrow adapter can call the
          provider SDK directly for one specialized operation while leaving other framework integrations intact. If most of the
          framework is unused, compare the cost of migration with the ongoing dependency and debugging cost; do not rewrite
          solely for stylistic preference.
        </P>
        <Callout type="warning">
          Avoid stacking multiple orchestration frameworks without a clear boundary. Each layer adds concepts, failure modes,
          and upgrades that your team must own.
        </Callout>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Framework Mistakes">
        <Mistakes items={[
          { mistake: 'Choosing a framework before describing the product workflow', cause: 'A tutorial or trend can lead to abstractions the feature does not need.', fix: 'List requirements first and prototype the smallest representative path.' },
          { mistake: 'Passing framework objects across the whole application', cause: 'Business logic becomes coupled to a library and difficult to replace.', fix: 'Return application-owned types from a narrow adapter.' },
          { mistake: 'Assuming a retrieval abstraction guarantees relevant evidence', cause: 'Indexing configuration and data quality still determine results.', fix: 'Inspect retrieved chunks and evaluate recall, relevance, and access filtering.' },
          { mistake: 'Upgrading a framework without a regression check', cause: 'Transitive integrations and behavior may change across versions.', fix: 'Pin dependencies appropriately, read current release notes, and replay tests and traces.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Compare Two Implementations of One Feature">
        <Practice
          title="Choose based on maintenance and measurable fit"
          tasks={[
            'Sketch a small assistant that retrieves a learner’s course notes and answers with cited passages.',
            'Implement the model boundary and orchestration with a plain SDK adapter or a fake interface before adding a framework.',
            'Prototype the same representative flow with either LangChain or LlamaIndex after checking current official documentation.',
            'Compare dependencies, code ownership, trace visibility, authorization placement, test effort, and retrieval controls.',
            'Write a short decision note naming the chosen approach, what would cause reconsideration, and which behaviors your tests guarantee.',
          ]}
          hint="Do not compare only line count. Keep the same workflow, provider configuration, and evaluation cases for both prototypes."
        />
      </Part>

      <KeyTakeaways items={[
        'A plain provider SDK is often clearest for a small, explicit workflow.',
        'LangChain offers a broad set of integrations and orchestration abstractions; LlamaIndex emphasizes data and retrieval workflows.',
        'Framework features and APIs evolve, so verify current documentation for the installed version.',
        'Evaluate dependency surface, debuggability, testability, observability, maintenance, and authorization boundaries.',
        'Keep business rules and application-owned types outside framework-specific objects.',
        'Choose an abstraction for a concrete need and make it reversible with a narrow adapter and regression tests.',
      ]} />

      <Bullets items={[
        <span key="ref">Consult the current official LangChain and LlamaIndex documentation, especially integration support, version-specific APIs, and migration guidance.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/generative-ai/shipping-ai-feature-fastapi"
        label="Lesson 12 · Shipping an AI Feature — FastAPI Backend and Chat UI"
        text="You have chosen your application abstractions. Next, package a feature behind a FastAPI endpoint with streaming, configuration, tests, and deployment safeguards."
      />
    </LearnLayout>
  )
}
