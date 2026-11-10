import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function LlmEvaluation() {
  return (
    <LearnLayout
      title="Evaluating LLM Apps — Eval Sets, LLM-as-Judge and RAG Metrics"
      description="Build an evaluation set, score outputs with code checks and LLM judges, measure RAG faithfulness and relevance, and gate releases on results."
      section="Generative AI & LLM Engineering — Lesson 08"
      readTime="35 min"
    >
      <Part n={1} label="Why evaluate" title="A Fluent Answer Is Not Proof of a Correct Feature">
        <P>
          LLM output is probabilistic: the same request can produce different wording, and a polished response can still be
          incomplete, unsupported, or unsafe. A single manual demo tells you only that one input worked once. Evaluation is a
          repeatable way to ask whether a change improved the behavior you actually care about.
        </P>
        <P>
          Imagine a support assistant for an Indian payments app. A reply that sounds confident but invents a refund date can
          damage trust. Your test should check the facts, policy boundaries, and useful next step—not demand identical prose.
          Start by stating the user outcome and the failure that matters most.
        </P>
        <Table
          head={['Evaluation layer', 'Question it answers', 'Typical check']}
          rows={[
            ['Unit / contract', 'Did my code preserve its contract?', 'Schema, required fields, status values'],
            ['Example-based quality', 'Did representative requests get useful answers?', 'Golden cases scored with criteria'],
            ['System quality', 'Did the whole retrieval or tool path work?', 'Grounding, relevance, tool outcome'],
            ['Production monitoring', 'Is real traffic behaving as expected?', 'Feedback, latency, refusals, sampled review'],
          ]}
        />
        <Callout type="info">
          An evaluation score is evidence about a defined dataset and rubric, not a universal certificate that the model is
          &quot;correct&quot;. Keep the dataset, prompt, model configuration, and scoring rules versioned together.
        </Callout>
      </Part>

      <Part n={2} label="Build the dataset" title="Golden Examples Should Represent Real Use">
        <P>
          A golden dataset is a curated set of inputs with expected properties or reference answers. It should represent the
          traffic you expect, including normal questions, ambiguous requests, edge cases, and cases where the right answer is
          to ask a clarifying question or refuse. For a RAG feature, include the retrieved context as well as the question.
        </P>
        <Steps items={[
          'Collect a small, privacy-reviewed sample of real tasks or write realistic examples with domain reviewers.',
          'Label each case with an expected outcome, critical facts, and any prohibited behavior—not just a reference paragraph.',
          'Include hard negatives: missing evidence, conflicting documents, unclear intent, and out-of-scope requests.',
          'Separate a stable regression set from a rotating challenge set so you can compare releases without overfitting.',
          'Remove secrets and personal data; restrict dataset access and record who may use it.',
        ]} />
        <P>
          Store data in a simple JSONL file initially. A clear schema makes cases reviewable and helps a test runner report
          failures by ID. Keep reference answers concise and explain what must be true; several different phrasings may all be
          acceptable.
        </P>
        <Code file="eval_cases.jsonl" lang="json" code={`
{"id":"refund-status-known","question":"When will my eligible UPI refund arrive?","context":"Eligible refunds are processed according to the payment provider's timeline. Check the transaction status in the app.","must_include":["check the transaction status"],"must_not_claim":["a guaranteed arrival date"],"category":"grounded-support","fixture_answer":"Please check the transaction status in the app."}
{"id":"refund-status-unknown","question":"Where is my refund?","context":"No transaction details were provided.","must_include":["ask for transaction details"],"must_not_claim":["refund is approved"],"category":"clarification","fixture_answer":"Please share the transaction details so I can check."}
`} />
        <Callout type="tip">
          Review and refresh the golden set when product policy, retrieval sources, or user intent changes. If every issue found in
          production is added without deduplication, a few unusual themes can dominate your score.
        </Callout>
      </Part>

      <Part n={3} label="Choose a score" title="Use Exact Checks for Facts and Heuristics for Shape">
        <P>
          Exact checks are cheap, repeatable, and ideal for structured outputs or required identifiers. They are brittle for
          open-ended language. Heuristics such as required phrases, length bounds, or citation presence are useful guard checks,
          but they do not prove meaning. Pair several signals rather than letting one simplistic metric define quality.
        </P>
        <Code file="checks.py" code={`
from dataclasses import dataclass

@dataclass
class Case:
    case_id: str
    must_include: list[str]
    must_not_claim: list[str]

def check_answer(answer: str, case: Case) -> dict[str, object]:
    normalized = " ".join(answer.casefold().split())
    missing = [term for term in case.must_include if term.casefold() not in normalized]
    prohibited = [term for term in case.must_not_claim if term.casefold() in normalized]
    return {
        "case_id": case.case_id,
        "required_terms_present": not missing,
        "missing_terms": missing,
        "prohibited_claims_found": prohibited,
        "passed": not missing and not prohibited,
    }

case = Case("refund-status-known", ["check the transaction status"], ["guaranteed arrival date"])
print(check_answer("Please check the transaction status in the app.", case))
`} />
        <P>
          The example intentionally checks phrases, not semantic equivalence. If a valid response says &quot;look at your payment
          status&quot;, the exact phrase test may fail. Track that limitation and prefer schema checks, carefully written rules, or
          reviewer scoring for meaning-sensitive requirements.
        </P>
      </Part>

      <Part n={4} label="LLM as judge" title="Ask a Judge for Rubric-Based Comparisons">
        <P>
          An LLM judge can score qualities that are hard to express as code: whether an answer addresses the question, whether
          claims are supported by supplied context, or whether the tone is clear. Provide a narrow rubric, the question, relevant
          evidence, and candidate answer. Ask for structured labels with short evidence, not an unconstrained essay.
        </P>
        <P>
          A judge is another model with its own blind spots. It may prefer longer answers, miss subtle factual errors, or agree
          with a candidate's confident wording. Calibrate it against human-reviewed examples, inspect disagreements, and avoid
          using a judge as the sole gate for high-impact decisions. Keep the judge model configurable and log its version.
        </P>
        <Code file="judge_prompt.txt" lang="text" code={`
You are scoring a support answer. Use only the question and context below.
Return JSON with: relevance (0 or 1), grounded (0 or 1), safe (0 or 1),
reason (one short sentence). Do not reward style or answer length.

Question: {question}
Context: {context}
Candidate answer: {answer}

Grounded is 1 only when each factual claim is supported by context.
Safe is 0 for invented guarantees or requests for passwords / OTPs.
`} />
        <Callout type="warning">
          The placeholder syntax above describes a prompt template. In a real judge request, serialize user-controlled text as data
          and tell the judge to treat it as untrusted content; never concatenate it as new rubric instructions.
        </Callout>
      </Part>

      <Part n={5} label="RAG quality" title="Measure Retrieval and Generation Separately">
        <P>
          A weak RAG answer can come from missing evidence or from a generator that mishandles good evidence. Score retrieval
          (did the relevant passage appear?) separately from generation (did the answer use the passage faithfully?). Useful
          concepts include context recall, context precision, answer relevance, and faithfulness. Define each against your own
          task: a metric name alone does not settle what counts as success.
        </P>
        <Table
          head={['Signal', 'What it checks', 'Common blind spot']}
          rows={[
            ['Exact / schema', 'Required fields, IDs, numeric values, format', 'Does not capture paraphrases or usefulness'],
            ['Heuristic', 'Length, citation marker, required or banned phrase', 'Can be gamed; surface form is not meaning'],
            ['Human review', 'Domain correctness and user impact', 'Costs time; reviewers need a shared rubric'],
            ['LLM judge', 'Rubric-based relevance, grounding, clarity', 'Bias, inconsistency, model-specific preferences'],
          ]}
        />
        <P>
          A missing retrieved passage is an upstream failure; the model cannot cite evidence it never saw. Keep the retrieved
          chunks with each evaluation record so you can diagnose the pipeline instead of changing the prompt blindly.
        </P>
      </Part>

      <Part n={6} label="Regression tests" title="Run a Small Evaluation in Pytest">
        <P>
          A regression evaluation runs the same examples against the current implementation and highlights behavior changes.
          It can run with your normal test suite in CI. Keep network-dependent tests opt-in or mock the model boundary so a pull
          request test remains deterministic, quick, and free of provider credentials.
        </P>
        <Code file="test_evaluation.py" code={`
import json
from pathlib import Path

from checks import Case, check_answer

CASES = [json.loads(line) for line in Path("eval_cases.jsonl").read_text().splitlines()]

def answer_for(case: dict[str, object]) -> str:
    # Replace with a deterministic fixture or your application boundary.
    return str(case["fixture_answer"])

def test_golden_cases_have_no_missing_or_prohibited_claims() -> None:
    failures = []
    for item in CASES:
        result = check_answer(
            answer_for(item),
            Case(str(item["id"]), list(item["must_include"]), list(item["must_not_claim"])),
        )
        if not result["passed"]:
            failures.append(result)
    assert not failures, f"Golden evaluation failures: {failures}"
`} />
        <P>
          For a live-model evaluation, run a separate controlled job, pin the prompt and configuration, and report score changes
          with the case IDs. Avoid flaky pass/fail thresholds based on a single stochastic run. A review gate can require a
          human to approve a meaningful regression rather than hiding it inside an aggregate average.
        </P>
        <Callout type="example">
          A UPI help assistant may have a high overall pass rate while always failing the rare &quot;refund not found&quot; case.
          Report performance by category as well as the total, and treat critical policy failures as their own release blocker.
        </Callout>
      </Part>

      <Part n={7} label="Read results" title="Compare, Diagnose and Keep the Evaluation Honest">
        <P>
          Save a record for each run: dataset revision, prompt revision, model setting from configuration, scorer revision, and
          per-case results. Compare the candidate with a known baseline. The average can show direction, but inspect the cases
          behind a change and the distribution by category. A two-point improvement on easy examples may hide a serious failure
          on a safety case.
        </P>
        <Steps items={[
          'Run deterministic checks first, then the model-based judge where it adds value.',
          'Group failures by category and identify whether retrieval, prompt, parsing, or product policy caused them.',
          'Review a sample of judge decisions against human judgments and revise ambiguous rubric wording.',
          'Record both regressions and improvements; do not silently delete a difficult example to make a score rise.',
        ]} />
        <P>
          Evaluation quality depends on dataset quality. Watch for duplicate cases, leakage from training or prompt examples,
          stale policies, and a narrow set of writing styles. Add examples from support feedback only after privacy review and
          remove sensitive fields that are not essential to the test.
        </P>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Evaluation Mistakes">
        <Mistakes items={[
          { mistake: 'Comparing generated answers with exact string equality', cause: 'Correct answers can be phrased in many valid ways.', fix: 'Use exact checks for contracts and facts; use a clear semantic rubric or human review for meaning.' },
          { mistake: 'Trusting one aggregate score', cause: 'Averages hide rare but high-impact failures and category regressions.', fix: 'Report per-category results and make critical safety failures explicit gates.' },
          { mistake: 'Letting an LLM judge decide without calibration', cause: 'Judges have preferences and can miss the same errors as a generator.', fix: 'Compare against human-scored examples, inspect disagreements, and keep the rubric narrow.' },
          { mistake: 'Calling a live model in every ordinary unit test', cause: 'Network, model variation, rate limits, and credentials make tests slow and flaky.', fix: 'Mock the boundary for deterministic CI; use a separate, controlled evaluation job for live comparisons.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Create a Release Gate for a Support Assistant">
        <Practice
          title="A small, reviewable evaluation suite"
          tasks={[
            'Write 12–20 cases for a fictional order or payments assistant, including missing context, ambiguity, and out-of-scope requests.',
            'Add exact checks for structured fields and heuristic checks for required safety behavior; document each check’s blind spot.',
            'Define a short judge rubric for relevance and evidence support, then compare its scores with a human review of several cases.',
            'Run deterministic golden tests with pytest and confirm a deliberately broken fixture fails with its case ID.',
            'Produce a per-category report and decide which failures should block a release versus trigger a human review.',
          ]}
          hint="Keep the first iteration small. Make the dataset and scoring rules easy for another engineer or domain reviewer to inspect."
        />
      </Part>

      <KeyTakeaways items={[
        'A fluent response is not proof of quality; evaluate the user outcome and consequential failure modes.',
        'Golden datasets need representative normal cases, edge cases, hard negatives, and privacy review.',
        'Use exact checks for contracts, heuristics for inexpensive signals, and calibrated judges or human review for meaning.',
        'For RAG, score retrieval and generation separately and retain evidence for diagnosis.',
        'Run deterministic pytest regressions in CI; isolate live-model evaluation into a controlled job.',
        'Track per-case and per-category results alongside an overall score, and version the dataset, prompt, model config, and rubric.',
      ]} />

      <Bullets items={[
        <span key="ref">For current provider evaluation APIs and model guidance, consult the official provider documentation. Keep test prompts free of real personal or payment data.</span>,
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/generative-ai/guardrails-prompt-injection"
        label="Lesson 09 · Guardrails, Prompt Injection and PII Handling"
        text="You can measure response quality. Next, learn how to handle hostile instructions, validate inputs and outputs, and reduce sensitive-data exposure."
      />
    </LearnLayout>
  )
}
