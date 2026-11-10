import { LearnLayout } from '@/components/content/LearnLayout'
import { Bullets, Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Table } from '@/components/content/LessonKit'

export default function GenaiInterviewPrep() {
  return (
    <LearnLayout
      title="Generative AI Interview Prep"
      description="The LLM engineering questions interviewers ask most — RAG design, evaluation, cost, safety and system design — with model answers."
      section="Generative AI & LLM Engineering — Lesson 16"
      readTime="45 min"
    >
      <Part n={1} label="Prepare" title="Answer with a Clear Engineering Story">
        <P>
          Explain the problem, constraints, alternatives, decision and evidence. Be clear about what the model does and what
          application code guarantees. Use a project you actually built; state what you measured instead of inventing results.
        </P>
        <Table
          head={['Question type', 'A useful answer shape', 'Avoid']}
          rows={[
            ['Concept', 'Define it, give a use and a limitation', 'A memorized definition'],
            ['Design', 'Clarify needs and trade-offs', 'Starting with a tool name'],
            ['Debugging', 'Trace evidence and propose a test', 'Blaming the model'],
            ['Experience', 'Describe your role, result and lesson', 'Unmeasured claims'],
          ]}
        />
        <Callout type="tip">
          Interviewers are often testing judgment: can you distinguish a probabilistic model output from a deterministic product
          requirement, and can you explain what happens when the model is wrong?
        </Callout>
      </Part>

      <Part n={2} label="Foundations" title="Explain the Model Boundary and Tool Use">
        <P><strong>1. What is an LLM API call, and why is a chat API usually stateless?</strong></P>
        <P>
          A model API call sends instructions, input and settings to a provider and returns generated output plus usage or
          status information. The API is generally stateless from one request to the next, so a chat application includes the
          needed conversation history or a selected summary on each call. That makes context selection an application concern:
          it affects relevance, privacy, latency and token cost.
        </P>
        <Bullets items={[
          'What interviewers look for: understands the request/response boundary and conversation state.',
          'Strong signal: mentions history trimming, data minimization, timeouts and usage tracking.',
        ]} />
        <P><strong>2. When should you use structured output instead of asking for JSON in a prompt?</strong></P>
        <P>
          If downstream code needs fields, I would use a provider-supported structured-output mode or constrained schema where
          available, then validate the result with an application schema. A prompt request alone does not guarantee valid JSON.
          I would handle refusal, truncation and validation failure explicitly rather than passing untrusted text into business
          logic.
        </P>
        <Bullets items={[
          'What interviewers look for: separates format guidance from enforcement and validates at the boundary.',
          'Strong signal: accounts for malformed, incomplete or semantically invalid fields.',
        ]} />
        <P><strong>3. What is tool calling, and how do you keep a tool loop safe?</strong></P>
        <P>
          Tool calling lets a model propose a structured request to an application-defined function. The application—not the
          model—validates the arguments, authenticates the user, checks authorization, executes an allowlisted action and
          returns a bounded result. I would set limits on iterations and execution time, and require human confirmation for
          consequential operations.
        </P>
        <Bullets items={[
          'What interviewers look for: recognizes that a tool request is untrusted input, not an instruction to execute blindly.',
          'Strong signal: covers least privilege, validation, auditability and idempotency.',
        ]} />
        <Code file="safe_tool_boundary.py" code={`
ALLOWED_ACTIONS = {"lookup_order"}


def dispatch(name: str, arguments: dict, *, user_id: str):
    if name not in ALLOWED_ACTIONS:
        raise ValueError("Unsupported action")
    if not user_id:
        raise PermissionError("Authentication required")
    order_id = arguments.get("order_id")
    if not isinstance(order_id, str) or not order_id:
        raise ValueError("Invalid order_id")
    return lookup_order_for_user(order_id, user_id)
`} />
      </Part>

      <Part n={3} label="RAG design" title="Diagnose Retrieval Before Blaming Generation">
        <P><strong>4. What is RAG, and when would you use it?</strong></P>
        <P>
          Retrieval-augmented generation searches an external knowledge source for relevant passages and supplies those
          passages as context to a model. It is useful when answers should draw on private or changing documents without
          retraining the base model. It does not guarantee correctness: indexing, retrieval, permissions, context selection and
          generation can each fail, so I would preserve citations and evaluate each stage.
        </P>
        <Bullets items={[
          'What interviewers look for: knows RAG is a pipeline, not simply a vector database.',
          'Strong signal: mentions source freshness, authorization, citations and abstention.',
        ]} />
        <P><strong>5. How would you choose a chunking strategy?</strong></P>
        <P>
          I would preserve meaningful document structure first—headings, paragraphs, tables and code—then measure how chunk
          boundaries affect retrieval and answer quality. Chunks need enough context to be interpretable without combining
          unrelated sections. I would retain source IDs, offsets and versions, and compare token-aware overlap or parent-child
          retrieval only when the evaluation shows a need.
        </P>
        <Bullets items={[
          'What interviewers look for: connects chunking choices to task-specific retrieval results.',
          'Strong signal: keeps provenance and handles updates and deletion.',
        ]} />
        <P><strong>6. How do you protect multi-tenant RAG data?</strong></P>
        <P>
          Resolve identity and document permissions in trusted application code, then apply those scopes in the retrieval query
          before passage text is returned. Do not rely on the model to hide a passage or filter citations after generation.
          I would add adversarial tests proving that one user cannot retrieve another user's content, including through cached
          results or shared indexes.
        </P>
        <Bullets items={[
          'What interviewers look for: places access control before retrieval and model context construction.',
          'Strong signal: considers cache keys, deletion, logs and tests at the storage boundary.',
        ]} />
        <Code file="authorized_retrieval.py" code={`
def answer_question(user, question, index, model):
    scopes = permissions_for(user)
    passages = index.search(question, allowed_scopes=scopes, limit=5)
    if not passages:
        return {"answer": "I could not find an authorized source.", "citations": []}
    draft = model.generate(question=question, evidence=passages)
    return validate_citations(draft, passages)
`} />
      </Part>

      <Part n={4} label="Quality" title="Build Evaluation That Can Block a Bad Release">
        <P><strong>7. How would you evaluate a RAG assistant?</strong></P>
        <P>
          I would create a reviewed set of questions with expected source passages, acceptable answer points and unanswerable
          cases. Evaluate retrieval recall and relevance separately from answer correctness, citation support and abstention.
          Combine deterministic checks with human review for a sample; an LLM judge can help triage but should be calibrated
          against human judgments and should not be the only release gate.
        </P>
        <Bullets items={[
          'What interviewers look for: a repeatable dataset, stage-specific metrics and human-validated judgments.',
          'Strong signal: includes regressions, edge cases and evaluation-set versioning.',
        ]} />
        <P><strong>8. What is the difference between retrieval recall and answer faithfulness?</strong></P>
        <P>
          Retrieval recall asks whether the needed evidence appeared among retrieved results. Faithfulness asks whether the
          answer's claims are supported by the evidence given to generation. High recall does not guarantee a faithful answer,
          and a faithful answer can still omit important information. I would inspect retrieval and generated claims separately
          to localize failures.
        </P>
        <Bullets items={[
          'What interviewers look for: distinguishes retrieval quality from generation quality.',
          'Strong signal: can explain a failure analysis rather than quoting a single aggregate score.',
        ]} />
        <P><strong>9. How would you use an LLM-as-judge?</strong></P>
        <P>
          I would define a narrow rubric, provide the question, evidence, candidate answer and reference criteria, and ask for
          structured scores with rationale. I would compare judge outputs with a human-labeled sample, check disagreement and
          bias across relevant languages or groups, and use the judge for trend detection—not as unquestioned ground truth.
        </P>
        <Bullets items={[
          'What interviewers look for: understands judge reliability, calibration and evaluation leakage.',
          'Strong signal: keeps independent human review and a fixed rubric.',
        ]} />
        <Code file="evaluation_gate.py" code={`
def release_allowed(results, minimum_recall, maximum_unsupported_rate):
    return (
        results["retrieval_recall"] >= minimum_recall
        and results["unsupported_claim_rate"] <= maximum_unsupported_rate
        and results["unauthorized_retrievals"] == 0
    )
`} />
        <Callout type="example">
          If a new embedding configuration improves retrieval recall but increases unsupported answers, do not call the release
          a win based on one metric. Inspect changed cases, adjust context or prompts, and rerun the complete suite.
        </Callout>
      </Part>

      <Part n={5} label="Production" title="Design for Latency, Cost and Failure">
        <P><strong>10. How do you estimate the cost of an LLM feature?</strong></P>
        <P>
          I estimate input and output usage per request, expected request volume and the current provider rates for the
          configured model, then add embeddings, retries, storage and supporting services. I distinguish average from peak
          usage and include caching assumptions. Before launch, I verify current pricing and set budgets, alerts and limits;
          I do not hard-code price assumptions into the model-selection decision.
        </P>
        <Bullets items={[
          'What interviewers look for: a transparent usage model and current, verifiable rate assumptions.',
          'Strong signal: considers retries, long contexts, traffic growth and non-model costs.',
        ]} />
        <P><strong>11. How would you reduce latency without quietly lowering quality?</strong></P>
        <P>
          First measure time to first token, retrieval, model time and tail latency separately. Then test bounded changes such
          as parallel independent retrieval calls, smaller context, streaming, caching or routing simple requests to a smaller
          model. I would compare quality and cost against the same evaluation set and roll back any optimization that misses
          the product's quality bar.
        </P>
        <Bullets items={[
          'What interviewers look for: measurement before optimization and quality-aware trade-offs.',
          'Strong signal: considers p95 behavior, cache correctness and invalidation.',
        ]} />
        <P><strong>12. What should happen when a provider times out or returns an error?</strong></P>
        <P>
          Set a timeout and retry only transient failures with bounded exponential backoff and jitter; do not retry invalid
          requests as if they were transient. Return a clear recoverable response, keep a request ID for support and avoid
          leaking provider details or prompts. For long work, use a job or streaming interface and make cancellation and
          duplicate submissions safe.
        </P>
        <Bullets items={[
          'What interviewers look for: bounded retries, error classification and graceful degradation.',
          'Strong signal: understands idempotency, cancellation and user-visible status.',
        ]} />
      </Part>

      <Part n={6} label="Safety" title="Protect Data and Treat Retrieved Content as Untrusted">
        <P><strong>13. What is prompt injection in a RAG application?</strong></P>
        <P>
          Prompt injection is untrusted input that tries to override the intended instructions or influence downstream actions.
          In RAG, an injected instruction can be hidden in a retrieved document. Prompt wording alone cannot establish a
          security boundary. Keep authorization and action policy in code, minimize privileges, treat retrieved text as data,
          validate outputs and test direct and indirect attacks.
        </P>
        <Bullets items={[
          'What interviewers look for: recognizes model instructions are not an access-control mechanism.',
          'Strong signal: uses least privilege, tool isolation, monitoring and adversarial tests.',
        ]} />
        <P><strong>14. How do you handle personal data in prompts and traces?</strong></P>
        <P>
          I identify which fields the task actually needs, remove or redact unnecessary personal data before provider calls,
          review applicable provider terms and retention settings, restrict trace access and set deletion rules. I avoid logging
          raw prompts by default; when debugging requires examples, I use an approved, minimized and access-controlled sample.
          Derived embeddings and generated answers can remain sensitive too.
        </P>
        <Bullets items={[
          'What interviewers look for: data minimization across prompts, vectors, outputs and logs.',
          'Strong signal: understands consent, retention, access and deletion as system requirements.',
        ]} />
        <P><strong>15. How would you keep a model from taking an unsafe business action?</strong></P>
        <P>
          The model can propose an action, but the application decides whether the authenticated user is authorized and whether
          the action satisfies business rules. I would use a narrow allowlist, validate inputs, make writes idempotent, record an
          audit event and ask for human confirmation for high-impact actions. The system should fail closed if validation or
          policy evaluation fails.
        </P>
        <Bullets items={[
          'What interviewers look for: clear separation between probabilistic suggestions and deterministic enforcement.',
          'Strong signal: covers authorization, confirmation, audit and safe failure.',
        ]} />
      </Part>

      <Part n={7} label="System design" title="Walk Through an AI Feature End to End">
        <P>
          A system-design answer should begin by clarifying who uses the feature, what data is allowed, what a correct result
          means, how much latency is acceptable and what happens on uncertainty. Then draw the request path, name trust
          boundaries, identify bottlenecks and explain monitoring. A concise answer can show the flow before diving into model
          choice.
        </P>
        <P><strong>Follow-up: Design an internal assistant for a delivery support team.</strong></P>
        <P>
          I would authenticate the agent, retrieve only policy and order data they are authorized to see, and distinguish
          verified order state from policy text. The model can draft a response with citations, but refund eligibility and
          account changes stay in existing business services with authorization and confirmation. I would measure retrieval
          relevance, supported response rate, agent edits, response time and escalation rate, then run a limited pilot before
          broad rollout.
        </P>
        <Bullets items={[
          'What interviewers look for: requirement discovery, data boundaries, observability and a staged launch.',
          'Strong signal: keeps irreversible or financial actions outside free-form generation.',
        ]} />
        <P>
          For an architecture sketch, label the browser, authenticated API, authorization service, retrieval/index, model
          provider, authoritative business systems and trace store. Draw personal data and trust boundaries explicitly. Explain
          one failure path—such as the model provider timing out—and one quality gate that would stop a risky release.
        </P>
      </Part>

      <Part n={8} label="Pitfalls" title="Interview Mistakes to Avoid">
        <Mistakes items={[
          { mistake: 'Listing libraries instead of explaining the design', cause: 'Tool names do not show whether you understand requirements or failure modes.', fix: 'Start with the user need, boundaries and trade-offs, then mention a tool only when relevant.' },
          { mistake: 'Claiming that RAG prevents hallucinations', cause: 'Retrieval can be irrelevant, stale or misinterpreted.', fix: 'Explain evaluation, citations, abstention and the remaining uncertainty.' },
          { mistake: 'Presenting an LLM judge score as ground truth', cause: 'Judges can share model biases and disagree with human reviewers.', fix: 'Calibrate against human judgments and report limitations and disagreement.' },
          { mistake: 'Inventing performance or cost numbers', cause: 'Unmeasured figures undermine technical credibility.', fix: 'State what you measured, describe the method, and label estimates as estimates.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Rehearse with Evidence, Not Memorized Scripts">
        <Practice
          title="A focused interview rehearsal"
          tasks={[
            'Answer questions 4–6 using one RAG project, including how permissions are enforced before retrieval.',
            'Sketch an end-to-end support assistant and explain one privacy boundary and one timeout fallback.',
            'Describe an evaluation set with answerable, unanswerable and adversarial cases; say which metrics would gate release.',
            'Explain a real quality or reliability failure you observed, the evidence you gathered and the change you would test.',
            'For every project claim, separate your direct contribution, measured result, estimate and future improvement.',
          ]}
          hint="Record a two-minute answer, remove framework name-dropping, and check whether you clearly stated the constraint, trade-off and evidence."
        />
      </Part>

      <KeyTakeaways items={[
        'Explain LLM systems as pipelines with explicit trust, data and application-policy boundaries.',
        'RAG quality depends on retrieval, authorization, generation, citations and abstention—not on a vector database alone.',
        'Evaluate retrieval and answer quality separately with reviewed cases and release gates.',
        'Discuss cost, latency and reliability using measured inputs and current provider information.',
        'Keep tool authorization and consequential business rules in deterministic application code.',
        'Use honest project evidence and state uncertainty rather than inventing results.',
      ]} />

      <H3>Next</H3>
      <NextLesson
        href="/learn/agentic-ai"
        label="Next course · Agentic AI & Automation"
        text="You have reviewed the core LLM engineering interview topics. Continue into the advanced Agentic AI path to design systems that plan, call tools and manage state."
      />
    </LearnLayout>
  )
}
