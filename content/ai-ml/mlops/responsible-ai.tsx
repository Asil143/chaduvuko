import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { AIMLCode, AIMLList, AIMLMistakes, AIMLNext, AIMLNote, AIMLParagraph, AIMLSection, AIMLTable } from '@/content/ai-ml/lesson-shared'

export default function ResponsibleAI() {
  return (
    <LearnLayout
      title="Responsible AI — Fairness, Bias and Model Cards"
      description="Plan fairness checks, investigate bias across the model lifecycle, and document intended use and limitations with a model card."
      section="MLOps and Production — Lesson 85"
      readTime="18–24 min"
    >
      <AIMLSection label="Prerequisites and goal" title="A production metric is not a complete impact assessment">
        <AIMLParagraph>Before this lesson, understand supervised learning, evaluation metrics, threshold selection, model monitoring and basic deployment workflows. Responsible AI is not a final checkbox or a single fairness score. It is an engineering practice for identifying who can be affected, what harms are plausible, what evidence is available, and which safeguards must remain active after launch.</AIMLParagraph>
        <AIMLList items={['Trace likely sources of bias through data, labels, model design and deployment.', 'Calculate and interpret group-level performance with sample counts and uncertainty.', 'Draft a model card and production monitoring plan with owners and limits.']} />
        <AIMLParagraph>Imagine a model that prioritises applications for a training scholarship. The dataset may reflect past access gaps; a feature can act as a proxy for socioeconomic status; labels may encode previous human decisions; and a seemingly strong aggregate score can hide different error rates across groups. The team must understand the decision context before choosing a metric or mitigation.</AIMLParagraph>
        <AIMLNote title="Start with the use case" tone="warning">Document the decision being supported, affected people, human role, possible benefits and harms, available appeal or correction routes, and what the model must never be used to decide. Technical metrics cannot determine acceptable impacts on their own.</AIMLNote>
      </AIMLSection>

      <AIMLSection label="1 · Bias can enter at every stage" title="Trace the data and decision pathway">
        <AIMLParagraph>Bias can arise from under-representation, measurement error, historical outcomes, selective labels, inconsistent annotation, proxy variables, sampling choices, model objectives, thresholds and deployment feedback loops. For example, a system can only learn outcomes for applicants who were historically selected; treating the unobserved outcomes of rejected applicants as negative labels creates a misleading target.</AIMLParagraph>
        <AIMLTable head={['Lifecycle point', 'Possible failure', 'Engineering response']} rows={[
          ['Problem definition', 'The target encodes a poor or harmful proxy for success', 'Review the decision, target and alternatives with domain stakeholders'],
          ['Data collection', 'Some groups or contexts are missing or measured differently', 'Audit coverage, provenance, label quality and known limitations'],
          ['Training and evaluation', 'Aggregate metrics hide subgroup errors or uncertainty', 'Use documented slices, sample counts and uncertainty ranges'],
          ['Deployment', 'Workflow changes who is scored or how output is acted upon', 'Limit use, provide human review and monitor real outcomes'],
          ['Monitoring', 'Feedback loops or drift change performance over time', 'Track input, outcome and impact signals with escalation owners'],
        ]} />
        <AIMLParagraph>Fairness is contextual and values-based. A team may need to consider equal opportunity, error rates, access, harms, recourse and operational constraints together. Some metrics cannot all be equal at once when group base rates differ. The right conversation is not “Which one score proves fairness?” but “Which outcomes matter here, who decided, and what evidence and safeguards support the decision?”</AIMLParagraph>
      </AIMLSection>

      <AIMLSection label="2 · Measure slices carefully" title="Compare outcomes, errors and uncertainty">
        <AIMLParagraph>Choose a set of pre-defined, defensible slices based on the use case and permitted data access. For classification, compare selection rate, true-positive rate, false-positive rate, precision and calibration across groups. Always include sample counts and uncertainty: small groups can produce noisy ratios and unstable conclusions. Avoid inferring sensitive attributes from names or other proxies without a clear, reviewed basis.</AIMLParagraph>
        <AIMLCode label="python · transparent group metrics" code={`import pandas as pd
from sklearn.metrics import confusion_matrix

# y_true, y_pred and group are aligned rows from a held-out evaluation set.
eval_data = pd.DataFrame({
    "actual": y_true,
    "predicted": y_pred,
    "group": group,
})

def group_metrics(frame):
    tn, fp, fn, tp = confusion_matrix(
        frame["actual"], frame["predicted"], labels=[0, 1]
    ).ravel()
    return pd.Series({
        "n": len(frame),
        "selection_rate": frame["predicted"].mean(),
        "true_positive_rate": tp / (tp + fn) if tp + fn else float("nan"),
        "false_positive_rate": fp / (fp + tn) if fp + tn else float("nan"),
        "precision": tp / (tp + fp) if tp + fp else float("nan"),
    })

by_group = eval_data.groupby("group", observed=True).apply(group_metrics)
print(by_group)  # investigate gaps with counts and context, not just ranks`} />
        <AIMLParagraph>This example makes the calculation visible, but a production review should estimate uncertainty and consider sampling design, missing groups, multiple comparisons and data quality. Set thresholds on development data; evaluate the final policy on untouched data. A group metric is descriptive evidence, not proof that the model caused or resolved a disparity.</AIMLParagraph>
        <AIMLNote title="Privacy and data minimisation">Sensitive or demographic data can require strict access controls and careful handling. Collect or use only what is justified for the assessment, protect it, define retention and access, and involve the appropriate privacy, domain and legal reviewers for the actual deployment context.</AIMLNote>
        <AIMLCode label="python · bootstrap a selection-rate interval" code={`import numpy as np

def bootstrap_selection_rate(frame, samples=1000, seed=7):
    rng = np.random.default_rng(seed)
    values = frame["predicted"].to_numpy()
    estimates = np.empty(samples)
    for i in range(samples):
        draw = rng.choice(values, size=len(values), replace=True)
        estimates[i] = draw.mean()
    return np.quantile(estimates, [0.025, 0.975])

for name, frame in eval_data.groupby("group", observed=True):
    low, high = bootstrap_selection_rate(frame)
    print(name, "n=", len(frame), "selection-rate interval:", (low, high))`} />
        <AIMLParagraph>This simple bootstrap interval illustrates sampling variability for selection rate; it does not account for every data-collection or policy uncertainty. For small groups, sparse outcomes or clustered samples, use an evaluation design that matches how observations were collected and have the estimate reviewed before drawing conclusions.</AIMLParagraph>
      </AIMLSection>

      <AIMLSection label="3 · Mitigation is a measured trade-off" title="Change the system, then re-evaluate the whole workflow">
        <AIMLParagraph>Potential interventions include improving data coverage and label quality, changing a target or feature set, adjusting a threshold, adding human review, limiting a use case, or selecting an alternative model. Each can improve one outcome while worsening another. Record the hypothesis, affected groups, metrics, expected trade-offs and approval owner before testing a mitigation.</AIMLParagraph>
        <AIMLParagraph>Evaluate both model metrics and the end-to-end process: who receives a recommendation, whether a human can disagree, how errors are corrected, and whether feedback changes future training labels. A “human in the loop” is not a safeguard if the person has no time, information or authority to challenge the output.</AIMLParagraph>
        <AIMLTable head={['Intervention', 'Potential benefit', 'Trade-off to test']} rows={[
          ['Improve representative data', 'May reduce gaps caused by missing examples', 'New samples can be noisy, costly or still incomplete'],
          ['Adjust threshold or operating point', 'Can change recall/false-positive balance for a defined group or workflow', 'May alter workload, precision or group trade-offs'],
          ['Human review and recourse', 'Creates an opportunity to correct context and challenge mistakes', 'Can fail without authority, training, time and accountability'],
          ['Restrict or defer deployment', 'Avoids unsupported or high-impact use', 'Delays benefits; alternative processes may also have harms'],
        ]} />
      </AIMLSection>

      <AIMLSection label="4 · Model cards" title="Make the model's boundaries visible">
        <AIMLParagraph>A model card is a concise record that helps users, reviewers and operators understand a model's intended use, evaluation evidence and limitations. Keep it versioned with the artifact or release. The contents should be useful for the actual audience—not just a generic template with unsupported claims.</AIMLParagraph>
        <AIMLCode label="yaml · model card starter" code={`model:
  name: scholarship-priority-model
  version: "replace-with-release-id"
  owner: applied-learning-team
intended_use:
  task: rank applications for trained staff review
  prohibited_uses:
    - make final eligibility decisions without human review
    - infer protected or sensitive traits
  users: trained reviewers
  affected_people: scholarship applicants
training_and_evaluation:
  data_period: "describe the actual period and provenance"
  evaluation_split: "document whether split is time- or group-aware"
  metrics: [precision, recall, calibration, subgroup_error_rates]
limitations:
  - labels reflect the historical selection process
  - subgroup estimates may be uncertain for small samples
monitoring:
  owner: model-operations-team
  review_triggers: [data_drift, outcome_shift, subgroup_metric_change]
  fallback: manual review without model ranking`} />
        <AIMLParagraph>Replace placeholders with verified facts, not guesses. Document data provenance and consent or permitted-use review as applicable, the model and preprocessing versions, the evaluation design, known gaps, human oversight, recourse, monitoring, owners and the process for rollback or retirement. Do not claim fairness certification from a short metric table.</AIMLParagraph>
        <AIMLCode label="python · check required documentation fields" code={`model_card = {
    "intended_use": "rank applications for trained staff review",
    "prohibited_uses": ["make final eligibility decisions without human review"],
    "evaluation": {"metrics": ["precision", "recall", "group_error_rates"]},
    "limitations": ["historical labels may reflect past selection decisions"],
    "monitoring_owner": "model-operations-team",
    "fallback": "manual review without model ranking",
}
required = {"intended_use", "prohibited_uses", "evaluation", "limitations", "monitoring_owner", "fallback"}
missing = required - model_card.keys()
if missing:
    raise ValueError(f"Model card is missing: {sorted(missing)}")
print("documentation fields present; verify their values with owners")`} />
      </AIMLSection>

      <AIMLSection label="5 · Monitor after launch" title="A fairness review has a lifecycle">
        <AIMLParagraph>Production changes can invalidate pre-launch evidence: new populations arrive, product policies shift, human reviewers adapt their behavior, or a feature pipeline changes. Monitor data and outcome distributions, alert on meaningful changes, and schedule periodic reviews with teams who understand the context. Where outcome labels arrive late, track the delay and avoid treating missing labels as positive evidence.</AIMLParagraph>
        <AIMLList items={[
          'Assign an accountable owner for each monitoring signal and escalation path.',
          'Keep a versioned audit trail of model, data, threshold and policy changes.',
          'Provide a route for affected users or reviewers to report errors and request correction.',
          'Define conditions for rollback, restricted use, retraining or retirement before an incident occurs.',
          'Review subgroup metrics with adequate sample sizes, privacy safeguards and domain context.'
        ]} />
        <AIMLNote title="Do not use a dashboard as a substitute for governance" tone="tip">A metric only reduces risk when someone is responsible for interpreting it, can pause or change the system, and has a documented response when it crosses a meaningful boundary.</AIMLNote>
      </AIMLSection>

      <AIMLSection label="6 · Common mistakes and practice" title="Make responsible AI concrete and reviewable">
        <AIMLMistakes items={[
          { mistake: 'Claiming a model is fair because aggregate accuracy is high.', fix: 'Specify the decision context, affected groups, error types, uncertainty and mitigations that were actually assessed.' },
          { mistake: 'Treating one fairness metric as universally correct.', fix: 'Explain why selected outcomes matter for this use case and document trade-offs and stakeholder input.' },
          { mistake: 'Reporting subgroup percentages without sample counts or uncertainty.', fix: 'Show group sizes, confidence or uncertainty estimates, missingness and the limits of comparisons.' },
          { mistake: 'Assuming a model card or human review automatically makes deployment safe.', fix: 'Keep documentation current and verify that reviewers have time, authority, guidance and a recourse path.' },
        ]} />
        <AIMLList ordered items={[
          'Choose a decision supported by a model. List affected people, intended benefit, possible harms, and uses that should be prohibited.',
          'Calculate selection rate, true-positive rate and false-positive rate by a justified evaluation slice. Include counts and uncertainty.',
          'Compare at least two possible mitigations and state which metrics or operational outcomes may worsen.',
          'Draft a model card that includes the data, evaluation design, intended users, known limitations, monitoring owner and rollback plan.',
          'Create an incident scenario involving drift or a sudden group-metric change. Define who reviews, what evidence they need and how use can be paused.'
        ]} />
      </AIMLSection>

      <AIMLNext href="/learn/ai-ml/cloud-ml/azure-ml" number="86" section="Cloud ML" title="Azure ML — Studio, Pipelines and AutoML" text="Continue from production responsibilities to managed cloud training and deployment workflows." />
      <KeyTakeaways items={[
        'Bias can enter in problem framing, data, labels, features, training, thresholds and post-launch feedback—not only in the algorithm.',
        'Fairness is use-case dependent; evaluate relevant outcomes and trade-offs rather than relying on one universal score.',
        'Report subgroup sample counts, uncertainty and data limitations alongside metrics.',
        'Mitigations must be tested end to end and may trade one error type or group outcome for another.',
        'A model card documents intended use, boundaries, evidence, limitations, monitoring ownership and rollback conditions.',
        'Responsible operation requires accountable people, a recourse path and the authority to change or stop the system.',
      ]} />
    </LearnLayout>
  )
}
