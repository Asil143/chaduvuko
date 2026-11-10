import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { AIMLCode, AIMLList, AIMLMistakes, AIMLNext, AIMLNote, AIMLParagraph, AIMLSection, AIMLTable } from '@/content/ai-ml/lesson-shared'

export default function EnsemblesStackingBlending() {
  return (
    <LearnLayout
      title="Ensembles — Stacking and Blending"
      description="Combine diverse models with out-of-fold stacking and a held-out blending set, while keeping evaluation leakage-free."
      section="Classical ML — Lesson 32"
      readTime="18–24 min"
    >
      <AIMLSection label="Prerequisites and goal" title="A team of imperfect models can make a stronger prediction">
        <AIMLParagraph>Before this lesson, you should know train/validation/test splits, cross-validation, classification probabilities, and how tree ensembles such as Random Forest and gradient boosting behave. You should also be able to compare a model against a simple baseline. The goal is to build two ways of combining independently trained models, then understand when the extra complexity is worth operating.</AIMLParagraph>
        <AIMLList items={['Explain why stacking uses out-of-fold predictions.', 'Build and compare a stack and a blend without using the final test set for model selection.', 'Assess whether diversity improves the operating decision enough to justify added complexity.']} />
        <AIMLParagraph>Imagine a delivery platform estimating whether an order will arrive late. A regularised linear model may capture broad trends; a tree model may capture interactions between distance, rain and time of day; a nearest-neighbour model may recognise unusual local patterns. If their errors are not identical, a second-stage model can learn how to combine their predictions. This is an ensemble of different model families, not just more trees in one forest.</AIMLParagraph>
        <AIMLNote title="The central requirement" tone="tip">Diversity helps only when individual models are competent and make meaningfully different errors. Combining several near-identical models often adds cost without adding useful information.</AIMLNote>
        <AIMLTable head={['Method', 'How combination weights are learned', 'Data used for the combiner']} rows={[
          ['Soft voting', 'Fixed average or explicit weights', 'No separate combiner training'],
          ['Stacking', 'A meta-model learns from out-of-fold predictions', 'Cross-validation predictions from training rows'],
          ['Blending', 'A meta-model learns from predictions on a holdout subset', 'A dedicated blending split'],
        ]} />
      </AIMLSection>

      <AIMLSection label="1 · Start with a baseline" title="Measure whether the extra models add value">
        <AIMLParagraph>First lock a test set away. Use only the development data to choose base learners, tune them and train the combiner. A good comparison includes a simple model, each base model by itself, and the final ensemble. On a fraud task, report precision-recall behaviour at an operating threshold as well as a threshold-independent summary; accuracy alone can conceal a model that misses almost every rare case.</AIMLParagraph>
        <AIMLCode label="python · baseline and data split" code={`from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score, average_precision_score
from sklearn.dummy import DummyClassifier

X, y = make_classification(
    n_samples=5000, n_features=20, n_informative=8,
    weights=[0.92, 0.08], class_sep=1.0, random_state=17,
)
X_dev, X_test, y_dev, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=17
)

baseline = DummyClassifier(strategy="prior")
baseline.fit(X_dev, y_dev)
prob = baseline.predict_proba(X_test)[:, 1]
print("baseline ROC-AUC:", roc_auc_score(y_test, prob))
print("baseline PR-AUC:", average_precision_score(y_test, prob))`} />
        <AIMLParagraph>The data here is synthetic so the example is runnable without downloads; in a real project, replace it with a properly split dataset. Keep the final test rows out of every preprocessing fit, feature decision, model choice and stacking step. If you repeatedly inspect test scores and revise the model, that set has become validation data.</AIMLParagraph>
      </AIMLSection>

      <AIMLSection label="2 · Stacking" title="Train the meta-model on predictions it did not train on">
        <AIMLParagraph>A tempting but incorrect workflow is to fit each base model on all development rows and then train the meta-model on those same rows' predictions. Those predictions are in-sample: a flexible learner may look unusually confident on rows it has already seen. The meta-model then learns from an easier problem than it will face at inference.</AIMLParagraph>
        <AIMLParagraph>Stacking avoids that mismatch with out-of-fold (OOF) predictions. For each fold, fit each base learner on the other folds and predict the held-out fold. Concatenate those held-out predictions into a new feature matrix. Every row in that matrix was predicted by a model that did not train on that row. Fit the final estimator on this matrix; then refit base estimators on all development data for production predictions.</AIMLParagraph>
        <AIMLCode label="python · leakage-aware stacking" code={`from sklearn.ensemble import RandomForestClassifier, HistGradientBoostingClassifier, StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=17)
base_models = [
    ("linear", make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))),
    ("forest", RandomForestClassifier(
        n_estimators=300, min_samples_leaf=3, random_state=17, n_jobs=-1
    )),
    ("boost", HistGradientBoostingClassifier(
        learning_rate=0.08, max_leaf_nodes=15, random_state=17
    )),
]
stack = StackingClassifier(
    estimators=base_models,
    final_estimator=LogisticRegression(max_iter=1000),
    cv=cv,
    stack_method="predict_proba",
    passthrough=False,
    n_jobs=-1,
)
stack.fit(X_dev, y_dev)
stack_prob = stack.predict_proba(X_test)[:, 1]
print("stack ROC-AUC:", roc_auc_score(y_test, stack_prob))
print("stack PR-AUC:", average_precision_score(y_test, stack_prob))`} />
        <AIMLNote title="Nested evaluation matters" tone="warning">The code's internal folds produce training features for the meta-model. If you use cross-validation to estimate the full stacking workflow, put the entire StackingClassifier inside the outer fold. Do not reuse the inner OOF score as an unbiased estimate of the whole procedure.</AIMLNote>
      </AIMLSection>

      <AIMLSection label="3 · Blending" title="A simpler alternative that spends a holdout split">
        <AIMLParagraph>Blending reserves part of development data for the meta-model. Fit base models on the base-training portion, predict the blend portion, then fit the combiner on those predictions and labels. It is easier to explain and inspect than folds, but base models see fewer examples and the combiner can overfit if the blend set is small. Never use the final test set as the blending set.</AIMLParagraph>
        <AIMLCode label="python · blend split" code={`from sklearn.base import clone
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import numpy as np

X_base, X_blend, y_base, y_blend = train_test_split(
    X_dev, y_dev, test_size=0.25, stratify=y_dev, random_state=23
)
models = [clone(estimator) for _, estimator in base_models]
for model in models:
    model.fit(X_base, y_base)

blend_features = [model.predict_proba(X_blend)[:, 1] for model in models]
Z_blend = np.column_stack(blend_features)
meta = LogisticRegression(max_iter=1000).fit(Z_blend, y_blend)

# At inference, apply the same fitted base models and feature order.
Z_test = np.column_stack(
    [model.predict_proba(X_test)[:, 1] for model in models]
)
blend_prob = meta.predict_proba(Z_test)[:, 1]
print("blend ROC-AUC:", roc_auc_score(y_test, blend_prob))`} />
        <AIMLParagraph>The example uses a small blend holdout only to demonstrate the data flow. In cross-validation or production, fit all data-dependent preprocessing inside each base-model pipeline. Keep feature columns, class ordering, calibration and missing-value handling identical between blend-time and inference-time predictions.</AIMLParagraph>
      </AIMLSection>

      <AIMLSection label="4 · Calibrate and decide" title="A better ranking is not automatically a better decision">
        <AIMLParagraph>Stacking can improve ranking while producing poorly calibrated probabilities. If a downstream system interprets 0.8 as an 80% event probability, evaluate calibration on data not used to fit the stack. Choose a decision threshold based on the cost of false positives and false negatives, capacity limits, and any policy constraints. Recheck that threshold when prevalence or costs change.</AIMLParagraph>
        <AIMLParagraph>In a delivery operation, the ensemble could trigger a proactive customer message or a courier reassignment. Those actions have different costs. A single global threshold may be wrong if service levels vary by region, and a model score should not be turned into an automatic punitive action without appropriate review.</AIMLParagraph>
        <AIMLTable head={['Question', 'Evidence to inspect', 'Decision']} rows={[
          ['Is the ensemble useful?', 'Out-of-fold or untouched-test metrics vs. each base model', 'Keep only if lift is stable and practically meaningful'],
          ['Is the gain robust?', 'Variation across folds, time periods and important groups', 'Prefer stable gains to one lucky split'],
          ['Does it fit operations?', 'Latency, memory, feature availability, failure modes', 'Account for serving and monitoring costs'],
        ]} />
      </AIMLSection>

      <AIMLSection label="5 · Common mistakes" title="Four ways a stack can look better than it is">
        <AIMLMistakes items={[
          { mistake: 'Training the meta-model on in-sample base predictions.', fix: 'Use cross-validated out-of-fold predictions, or a completely separate blending split.' },
          { mistake: 'Using the test set for model selection or blending.', fix: 'Keep one final test set untouched; use development folds for all choices.' },
          { mistake: 'Combining weak or highly correlated models just to increase model count.', fix: 'Inspect individual performance and error diversity; add a learner only when it contributes distinct signal.' },
          { mistake: 'Reporting only a single accuracy score.', fix: 'Choose metrics and operating thresholds from the task costs, prevalence, calibration and group-level behavior.' },
        ]} />
        <AIMLNote title="Operational reality">A stack is a system of multiple models, dependencies and outputs. A missing feature or model outage must have a documented fallback; do not silently substitute a different prediction path.</AIMLNote>
      </AIMLSection>

      <AIMLSection label="6 · Practice and takeaways" title="Build the comparison before you ship">
        <AIMLList ordered items={[
          'Train a logistic-regression baseline and two different tree-based models on a stratified split. Record PR-AUC and ROC-AUC for each.',
          'Fit a StackingClassifier with out-of-fold predictions. Compare it with the strongest base model using the same untouched test set.',
          'Implement blending with a development-only holdout, then describe the trade-off in training-data size and meta-model variance.',
          'Inspect false positives and false negatives by a business-relevant segment. Decide which error is more costly and propose a threshold-selection method.',
          'Measure inference latency and model size for base models versus the stack. Write a short keep-or-remove recommendation based on evidence.',
        ]} />
        <AIMLParagraph>Key takeaways: stacking learns a combiner from out-of-fold predictions; blending uses a dedicated holdout; both require leakage-safe boundaries; diversity and stable gains matter more than model count; evaluate threshold, calibration, fairness, latency and maintenance—not just a headline metric.</AIMLParagraph>
      </AIMLSection>

      <AIMLNext href="/learn/ai-ml/classical-ml/kmeans-clustering" number="33" section="Classical ML" title="K-Means Clustering" text="Move from supervised prediction to discovering structure when your data has no labels." />
      <KeyTakeaways items={[
        'A stack trains a meta-model on out-of-fold predictions so the combiner does not learn from in-sample overconfidence.',
        'Blending is conceptually simple but reserves data for the combiner and can be unstable when that holdout is small.',
        'Use a final test set only after every preprocessing, model, and threshold decision is fixed.',
        'Ensemble gains depend on competent models with complementary errors; more models do not guarantee improvement.',
        'Assess ranking, calibration, business thresholds, group performance, latency and operational fallbacks together.',
      ]} />
    </LearnLayout>
  )
}
