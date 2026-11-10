import { BulletList, Callout, CodeBox, Divider, HighlightBox, KeyTakeaways, LearnLayout, Para, SectionTag, SectionTitle, SubTitle, Table } from './_shared'

export default function SnowflakeCortexAIFunctions() {
  return (
    <LearnLayout
      title="Snowflake Cortex AI Functions"
      description="Use Snowflake Cortex AI SQL functions for classification, sentiment, summarization, and completion while accounting for access, evaluation, privacy, and cost."
      section="Snowflake — Lesson 19"
      readTime="40 min"
      breadcrumbs={[
        { label: 'Learn', href: '/learn' },
        { label: 'Snowflake', href: '/learn/snowflake' },
        { label: 'Snowflake Cortex AI Functions', href: '/learn/snowflake/snowflake-cortex-ai-functions' },
      ]}
    >
      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 01 — What Cortex AI functions do" />
        <SectionTitle>Apply Language Models from Governed SQL Workflows</SectionTitle>
        <Para><strong>Prerequisites:</strong> SQL, roles and grants, data classification, and a governed Snowflake account. <strong>Learning objective:</strong> select an AI function for a bounded task and add evaluation, privacy, access, and cost controls.</Para>
        <Para>
          Snowflake Cortex AI Functions expose selected AI capabilities through SQL functions, allowing an
          analyst or data engineer to classify, summarize, translate, extract information from, or generate
          text as part of a Snowflake workflow. This can remove the need to export a table to a separate
          application for a straightforward text-enrichment task. The function call still has latency, cost,
          regional availability, permissions, and quality considerations; it should be treated as a production
          dependency rather than a magic expression.
        </Para>
        <Para>
          Examples in this lesson use functions such as AI_CLASSIFY, AI_SENTIMENT, AI_SUMMARIZE, and
          AI_COMPLETE. Availability and exact input/output behavior can vary by function, account region, and
          product updates. Check current Snowflake documentation and your account's feature availability
          before selecting a function for production. Do not infer the result schema from a dashboard preview;
          inspect the returned value and validate it explicitly.
        </Para>
        <HighlightBox><Para><strong>Good fit:</strong> enrich a governed support-ticket table with a coarse category or draft summary for an analyst to review. <strong>Not a shortcut:</strong> make an unreviewed model response the authority for a payment, medical decision, eligibility decision, or security control.</Para></HighlightBox>
        <Callout title="Account and regional availability">Cortex functions and individual models can have account, cloud-region, access-control, or feature-status requirements. Confirm current availability, model options, and data-processing terms in Snowflake documentation and your organization's approved-service list before building dependencies.</Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 02 — Make the task explicit" />
        <SectionTitle>Start with a Bounded, Governed Dataset</SectionTitle>
        <Para>
          Consider a support team that wants to triage customer messages. The source table contains a stable
          ticket ID, text, created timestamp, and an approved subset of customer context. First choose a small
          set of labels that match a human workflow, define which columns may be sent to the function, and
          sample representative records. Remove unnecessary personal data before invoking the model. A smaller,
          clearer prompt is easier to evaluate and usually cheaper to operate.
        </Para>
        <CodeBox label="SQL — select only the approved text and identifiers">{`CREATE OR REPLACE TEMP TABLE TICKET_SAMPLE AS
SELECT
  TICKET_ID,
  CREATED_AT,
  LEFT(MESSAGE_TEXT, 4000) AS MESSAGE_TEXT
FROM ANALYTICS.SUPPORT.TICKETS
WHERE CREATED_AT >= DATEADD(day, -7, CURRENT_TIMESTAMP())
  AND MESSAGE_TEXT IS NOT NULL
QUALIFY ROW_NUMBER() OVER (ORDER BY CREATED_AT DESC) <= 500;`}</CodeBox>
        <Para>
          The row limit is an evaluation boundary, not a production sampling recipe. For a real evaluation set,
          include different channels, languages, message lengths, rare categories, and known difficult examples.
          Ensure your data policy permits the selected fields to be processed by the feature in the target
          account and region.
        </Para>
        <Table headers={['Function family', 'Useful for', 'Human review focus']} rows={[
          ['AI_CLASSIFY', 'Assign one or more task labels to text.', 'Label definitions, ambiguity, and rare classes.'],
          ['AI_SENTIMENT', 'Estimate sentiment for text.', 'Sarcasm, mixed sentiment, language, and confidence needs.'],
          ['AI_SUMMARIZE', 'Create a shorter representation of a passage.', 'Omitted caveats, names, dates, and unsupported claims.'],
          ['AI_COMPLETE', 'Generate a response from an instruction and input.', 'Grounding, format validation, and unsafe or invented content.'],
        ]} />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 03 — Classify and inspect" />
        <SectionTitle>Use Categories That Match the Work Queue</SectionTitle>
        <Para>
          Classification is most useful when the options are mutually understandable to the people who will
          act on them. If a team cannot explain the difference between “billing” and “payment,” a model will
          not repair that taxonomy. Begin with a small label set, include short definitions where supported by
          the current function syntax, and evaluate against examples labeled by a human reviewer.
        </Para>
        <CodeBox label="SQL — inspect a classification result before saving it">{`SELECT
  TICKET_ID,
  AI_CLASSIFY(
    MESSAGE_TEXT,
    ['delivery', 'payment', 'account access', 'other']
  ) AS CLASSIFICATION_RESULT
FROM TICKET_SAMPLE
LIMIT 20;`}</CodeBox>
        <Para>
          AI_CLASSIFY returns a serialized object whose labels field contains the classification labels. Inspect
          the complete result before selecting a field or casting it. Do not assume it includes a calibrated
          confidence score. If confidence thresholds are important, confirm the supported
          response format and define a fallback for uncertain or malformed outputs.
        </Para>
        <Callout title="Persist the model output with provenance">Store the source ticket ID, function/task version, run timestamp, selected model configuration where available, and review status with an enrichment result. This makes later audits and reprocessing possible when labels or prompts change.</Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 04 — Sentiment and summarization" />
        <SectionTitle>Separate Machine-Generated Signals from Facts</SectionTitle>
        <Para>
          Sentiment is a rough signal, not a verified fact about a person's intent or state of mind. A short
          “fine” can mean satisfaction, frustration, or neutral acknowledgment depending on context. Use
          sentiment to help prioritize a human queue, not to make a sensitive decision about an individual.
          Summaries are also lossy: a compact version can omit qualifiers or details that change meaning.
        </Para>
        <CodeBox label="SQL — compare source text with generated signals">{`SELECT
  TICKET_ID,
  AI_SENTIMENT(MESSAGE_TEXT) AS SENTIMENT_RESULT,
  AI_SUMMARIZE(MESSAGE_TEXT) AS SHORT_SUMMARY
FROM TICKET_SAMPLE
WHERE LENGTH(MESSAGE_TEXT) > 80
LIMIT 25;`}</CodeBox>
        <Para>
          AI_SENTIMENT returns an object with a categories field, including an overall sentiment record; when
          category arguments are supplied, the result also reports sentiment for those aspects. Validate the
          exact output types and function behavior for the account and version in use. Keep the original message
          available to authorized reviewers, render model-generated summaries as suggestions,
          and make it easy to open the full source text before a support agent acts. Never treat a summary as a
          replacement for the source record in an audit or dispute.
        </Para>
        <Callout title="Summaries can omit the important sentence" color="#29b5e8">For example, “The parcel arrived, but the seal was broken” cannot safely be reduced to “Parcel arrived.” Test whether the summary preserves negation, dates, quantities, and the reason a customer contacted support.</Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 05 — Constrained completion" />
        <SectionTitle>Generate Draft Text with Explicit Boundaries</SectionTitle>
        <Para>
          Completion is broader than classification: it generates text from an instruction and input. For
          support triage, a bounded use is drafting an internal summary from a ticket, not sending a customer
          response automatically. Keep model selection configurable so deployment can choose a model supported
          by the account and region, and verify current arguments in official docs rather than hard-coding an
          obsolete model name.
        </Para>
        <CodeBox label="SQL — use a deployment-managed model setting">{`-- The deployment runner sets the Snowflake session variable CORTEX_MODEL
-- from reviewed environment configuration and approved account options.
SELECT
  TICKET_ID,
  AI_COMPLETE(
    $CORTEX_MODEL,
    CONCAT(
      'Write a neutral one-sentence internal summary. ',
      'Do not invent facts. If details are unclear, say so. ',
      'Ticket: ', MESSAGE_TEXT
    )
  ) AS DRAFT_SUMMARY
FROM TICKET_SAMPLE
LIMIT 10;`}</CodeBox>
        <Para>
          Treat model output as untrusted text. If downstream software expects JSON, parse it with a real parser,
          validate required fields and allowed values, and route failures to review. Avoid asking a model to
          perform authorization or SQL construction. Parameterize application SQL and grant tools only the
          privileges their code needs.
        </Para>
        <Table headers={['Control', 'Implementation idea', 'Failure response']} rows={[
          ['Grounding', 'Prompt only with approved source text and clear instructions.', 'Show “needs review” when output adds unsupported claims.'],
          ['Format', 'Validate JSON or required fields after generation.', 'Reject invalid output; do not silently coerce it.'],
          ['Access', 'Use a role with access only to approved source columns.', 'Stop the task on privilege or policy errors.'],
          ['Human review', 'Keep a reviewer queue for consequential actions.', 'Do not auto-send or auto-decide on low-quality output.'],
        ]} />
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 06 — Evaluate, secure, and control cost" />
        <SectionTitle>Measure the Workflow Before Scaling It</SectionTitle>
        <Para>
          Create a held-out evaluation set labeled by people who understand the task. Measure category-level
          errors, false positives and false negatives, language or channel differences, and the percentage
          routed to human review. For summaries, review factual coverage and omissions. Track feature use,
          latency, failures, retries, and estimated spend using the currently supported account telemetry and
          usage views. Set a budget or row-volume limit before scheduling a large backfill.
        </Para>
        <SubTitle>Common Mistakes</SubTitle>
        <BulletList items={[
          'Assuming generated output is a verified fact or calibrated confidence score; inspect and validate the actual return value.',
          'Sending unnecessary identifiers or sensitive columns because the query runs inside Snowflake; minimize and approve input data.',
          'Promoting a prompt or taxonomy change without a fixed human-labeled regression set.',
          'Scaling a backfill without checking feature availability, model options, usage controls, and a bounded cost plan.',
        ]} />
        <BulletList items={[
          'Minimize input columns and redact direct identifiers unless the task demonstrably requires them.',
          'For Snowflake-hosted models, confirm the required SNOWFLAKE.CORTEX_USER database role and review feature-specific grants, availability, region, and data-processing requirements.',
          'Separate model-generated output from source facts and retain provenance for each result.',
          'Test prompt and taxonomy changes against a fixed regression set before promoting them.',
          'Use bounded batches, retries with limits, and a human fallback for ambiguous or failed records.',
          'Check current function limits, model options, and usage reporting in the official Snowflake docs before implementation.',
        ]} />
        <Callout title="Do not equate in-warehouse with risk-free">Running an AI function in Snowflake does not remove privacy, governance, model-quality, or regulatory obligations. Apply the same data classification and approval process you use for any external or managed data-processing feature.</Callout>
      </section>

      <Divider />

      <section style={{ marginBottom: 64 }}>
        <SectionTag text="// Part 07 — Practice and key takeaways" />
        <SubTitle>Practice: Support Ticket Triage Pilot</SubTitle>
        <Para>Use a synthetic or explicitly approved dataset. Begin with a small batch and ask a human reviewer to label the same records independently.</Para>
        <BulletList items={[
          'Define four ticket labels and write a one-sentence description for each label.',
          'Run a small classification query, inspect the full result type, and compare it with human labels.',
          'Find examples where sentiment or a summary loses context; add them to a regression test set.',
          'Draft an internal summary with AI_COMPLETE using a configured model value; validate and review every output.',
          'Write a production checklist covering data minimization, access, regional availability, evaluation, cost, and human escalation.',
        ]} />
        <KeyTakeaways items={[
          'Cortex AI Functions bring selected AI capabilities into Snowflake SQL workflows; they still need product and operations design.',
          'Choose a bounded task and approved dataset before calling a model.',
          'Inspect actual return values and validate them instead of assuming a schema or confidence score.',
          'Treat sentiment, summaries, and generated text as fallible signals that need evaluation and, where appropriate, human review.',
          'Availability, model choices, syntax, access, and usage controls can change; verify the current account documentation.',
          'Privacy, provenance, least privilege, cost limits, and quality monitoring are part of the implementation.',
        ]} />
      </section>
    </LearnLayout>
  )
}
