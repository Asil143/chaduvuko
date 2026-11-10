import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { AIMLCode, AIMLList, AIMLMistakes, AIMLNext, AIMLNote, AIMLParagraph, AIMLSection, AIMLTable } from '@/content/ai-ml/lesson-shared'

export default function ImbalancedData() {
  return (
    <LearnLayout
      title="Imbalanced Data — Class Weights, Resampling and SMOTE"
      description="Handle rare classes without leakage: compare class weighting, random resampling and SMOTE using suitable metrics and thresholds."
      section="Model Evaluation — Lesson 42"
      readTime="18–24 min"
    >
      <AIMLSection label="Prerequisites and goal" title="When a rare class matters, accuracy can reward failure">
        <AIMLParagraph>Before this lesson, understand confusion matrices, precision, recall, ROC-AUC, PR-AUC and train/validation/test splits. Imbalance means one class appears much less often than another. It is common in fraud, equipment failures and medical screening, but the ratio alone does not determine the right method. The costs of missed positives and unnecessary investigations matter just as much.</AIMLParagraph>
        <AIMLList items={['Establish a naturally distributed baseline using precision-recall metrics.', 'Compare weighting, random sampling and SMOTE without leakage.', 'Set a decision threshold from validation evidence and explain its operational trade-offs.']} />
        <AIMLParagraph>Imagine 10,000 payment attempts with 80 confirmed fraudulent transactions. A classifier that always says “legitimate” has 99.2% accuracy and catches no fraud. Start with a simple baseline, inspect the confusion matrix and choose a metric and threshold that reflect the operation. Then compare training-time interventions—class weights and resampling—under the same evaluation protocol.</AIMLParagraph>
        <AIMLTable head={['Approach', 'Changes', 'What it does not solve']} rows={[
          ['Class weights', 'Penalises mistakes on selected classes more during fitting', 'Does not create more information or choose a business threshold'],
          ['Random over/undersampling', 'Changes class frequencies in the training fold', 'Can duplicate examples or discard useful majority information'],
          ['SMOTE', 'Interpolates synthetic minority feature vectors', 'Does not guarantee realistic samples or fix label noise'],
        ]} />
        <AIMLNote title="Keep the evaluation population real" tone="warning">Validation and test data should preserve the natural class prevalence. Resampling the test set creates metrics that do not describe the traffic your model will face.</AIMLNote>
      </AIMLSection>

      <AIMLSection label="1 · Set a trustworthy baseline" title="Split first, then inspect the failure costs">
        <AIMLParagraph>Make a stratified random split for independent, identically distributed rows; for time-dependent events use a chronological split instead. Stratification approximately preserves the class ratio across folds but does not prevent temporal or entity leakage. Any imputation, scaling, feature selection or sampling must be learned from training data only.</AIMLParagraph>
        <AIMLCode label="python · baseline with suitable metrics" code={`from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.dummy import DummyClassifier
from sklearn.metrics import average_precision_score, confusion_matrix

X, y = make_classification(
    n_samples=6000, n_features=18, n_informative=7,
    weights=[0.97, 0.03], class_sep=1.0, random_state=41,
)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=41
)
X_fit, X_val, y_fit, y_val = train_test_split(
    X_train, y_train, test_size=0.25, stratify=y_train, random_state=41
)
base = DummyClassifier(strategy="prior").fit(X_fit, y_fit)
base_prob = base.predict_proba(X_val)[:, 1]
print("validation prevalence:", y_val.mean())
print("baseline average precision:", average_precision_score(y_val, base_prob))
print("default confusion matrix:", confusion_matrix(y_val, base.predict(X_val)))`} />
        <AIMLParagraph>For rare positives, PR-AUC (often reported as average precision) makes precision and recall explicit and can be more informative than ROC-AUC. Its baseline depends on the prevalence, so report prevalence beside it. Also report operating-point precision, recall, false-positive count and the review volume your team can handle.</AIMLParagraph>
      </AIMLSection>

      <AIMLSection label="2 · Class weighting" title="Make the learner pay more attention to costly mistakes">
        <AIMLParagraph>Many estimators accept class weights. With <code>class_weight=&quot;balanced&quot;</code>, scikit-learn computes weights inversely related to class frequencies in the training data. The loss assigns a larger penalty to errors on rare classes, encouraging a different decision boundary. Weighting changes the learning objective; it does not duplicate rows or change the evaluation distribution.</AIMLParagraph>
        <AIMLCode label="python · weighted logistic regression" code={`from sklearn.linear_model import LogisticRegression
from sklearn.metrics import average_precision_score, precision_recall_curve
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

weighted = make_pipeline(
    StandardScaler(),
    LogisticRegression(class_weight="balanced", max_iter=1000),
)
weighted.fit(X_fit, y_fit)
prob = weighted.predict_proba(X_val)[:, 1]
print("validation average precision:", average_precision_score(y_val, prob))

precision, recall, thresholds = precision_recall_curve(y_val, prob)
for target_recall in (0.70, 0.85):
    valid = (recall[:-1] >= target_recall).nonzero()[0]
    if len(valid):
        i = valid[-1]
        print(target_recall, thresholds[i], precision[i], recall[i])`} />
        <AIMLParagraph>Weighting is a strong first experiment because it avoids synthetic feature vectors. It can still change calibration, increase false positives and make the model sensitive to a few minority examples. Compare the default model, weighted model and a reasonable threshold adjustment; select the threshold on validation data using a stated cost or capacity constraint. Do not select the threshold on the final test set.</AIMLParagraph>
      </AIMLSection>

      <AIMLSection label="3 · Random resampling" title="Change the training fold, never the test population">
        <AIMLParagraph>Random oversampling repeats minority examples, which can help an estimator see them more often but may overfit duplicates. Random undersampling removes majority examples, reducing compute and shifting the class ratio but discarding potentially useful variation. Resampling should happen inside each training fold, after the split. Applying it before cross-validation lets near-duplicate or synthetic information leak into validation folds.</AIMLParagraph>
        <AIMLCode label="python · random over-sampling in a pipeline" code={`from imblearn.over_sampling import RandomOverSampler
from imblearn.pipeline import Pipeline as ImbPipeline
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import StratifiedKFold, cross_val_score

oversampled = ImbPipeline(steps=[
    ("scale", StandardScaler()),
    ("sample", RandomOverSampler(random_state=41)),
    ("model", LogisticRegression(max_iter=1000)),
])
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=41)
scores = cross_val_score(
    oversampled, X_train, y_train, scoring="average_precision", cv=cv
)
print("training-fold average-precision scores:", scores)`} />
        <AIMLNote title="Package note">This example uses the separate <code>imbalanced-learn</code> package, imported as <code>imblearn</code>. Install it in your project environment if needed. Its pipeline is designed to apply samplers during fitting and skip resampling when predicting.</AIMLNote>
      </AIMLSection>

      <AIMLSection label="4 · SMOTE" title="Interpolate minority neighbours—with domain checks">
        <AIMLParagraph>SMOTE selects a minority example, finds nearby minority examples in feature space, and creates a synthetic point along a line between neighbours. This can soften overfitting from exact duplicates, but it assumes that interpolation in the selected feature representation creates plausible examples. That assumption often fails for raw categorical codes, timestamps, text IDs, constrained financial quantities and structured sequences.</AIMLParagraph>
        <AIMLCode label="python · SMOTE inside cross-validation" code={`from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline as ImbPipeline
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.preprocessing import StandardScaler

smote_model = ImbPipeline(steps=[
    ("scale", StandardScaler()),
    ("smote", SMOTE(random_state=41, k_neighbors=3)),
    ("model", LogisticRegression(max_iter=1000)),
])
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=41)
scores = cross_val_score(
    smote_model, X_train, y_train,
    scoring="average_precision", cv=cv, n_jobs=-1,
)
print("fold average-precision scores:", scores)
print("mean:", scores.mean(), "std:", scores.std())

# Fit the selected pipeline on all training data before one final test evaluation.
smote_model.fit(X_train, y_train)
prob_smote = smote_model.predict_proba(X_test)[:, 1]
print("held-out average precision:", average_precision_score(y_test, prob_smote))`} />
        <AIMLParagraph>Scaling before SMOTE is important because nearest-neighbour calculations are distance-based. The imbalanced-learn pipeline ensures the scaler and sampler are fit separately within each cross-validation training fold. For mixed numeric and categorical data, use a method designed for that representation, such as a categorical-aware sampler, and confirm the generated combinations are valid for the domain.</AIMLParagraph>
      </AIMLSection>

      <AIMLSection label="5 · Choose and validate" title="Treat sampling as a hypothesis, not a guaranteed upgrade">
        <AIMLParagraph>Compare a baseline, class-weighted model, random sampler and SMOTE using identical development folds and metrics. Use a final naturally distributed test set once after model and threshold selection. Record fold variation: a method that wins on average by a tiny amount but varies dramatically may be less reliable than a stable baseline. Check calibration separately if predicted probabilities inform downstream risk or cost decisions.</AIMLParagraph>
        <AIMLTable head={['Check', 'Question to answer', 'Evidence']} rows={[
          ['Recall and precision', 'How many positives are caught and how many alerts are correct?', 'Threshold-specific confusion matrix and PR curve'],
          ['Workload', 'Can reviewers or downstream services handle the alert count?', 'Alerts per time period and operational capacity'],
          ['Calibration', 'Does a score correspond to an observed event rate?', 'Reliability plot and calibration metrics on natural prevalence'],
          ['Segments', 'Does performance vary across regions, products or user groups?', 'Slice-level metrics, sample counts and uncertainty'],
        ]} />
        <AIMLParagraph>On temporal or grouped data, use time-aware or group-aware splits. A transaction from the same account, patient or machine in both train and validation can make evaluation optimistic even if class proportions are balanced. Resampling cannot repair a bad split or a leaking feature.</AIMLParagraph>
      </AIMLSection>

      <AIMLSection label="6 · Common mistakes and practice" title="Keep every intervention inside the correct boundary">
        <AIMLMistakes items={[
          { mistake: 'Oversampling the complete dataset before splitting or cross-validation.', fix: 'Place the sampler inside an imbalanced-learn pipeline so it runs only on each training fold.' },
          { mistake: 'Treating SMOTE as realistic data generation for every feature type.', fix: 'Review domain constraints, feature representation and synthetic examples; prefer weighting if interpolation is not meaningful.' },
          { mistake: 'Optimising accuracy or reporting only ROC-AUC.', fix: 'Report prevalence, PR-AUC, precision/recall at a chosen threshold and the resulting alert workload.' },
          { mistake: 'Assuming balanced training makes output probabilities calibrated.', fix: 'Assess calibration on naturally distributed data and recalibrate only with a separate development set.' },
        ]} />
        <AIMLList ordered items={[
          'Measure the positive-class prevalence and majority-only baseline on a held-out split.',
          'Compare class_weight, random oversampling and SMOTE in the same stratified cross-validation folds.',
          'Plot precision and recall as the threshold changes. Choose a policy based on a minimum recall, false-positive budget or explicit cost.',
          'Review false positives and missed positives by a meaningful segment and identify any data leakage or proxy concerns.',
          'Write a short model card entry describing the sampling method, evaluation prevalence, intended use and known limits.'
        ]} />
      </AIMLSection>

      <AIMLNext href="/learn/ai-ml/evaluation/cross-validation" number="43" section="Evaluation" title="Cross-Validation and the Bias-Variance Tradeoff" text="Use robust splits to estimate how much your model and sampling choices vary across data." />
      <KeyTakeaways items={[
        'A rare positive class makes accuracy misleading; state prevalence and choose metrics around the cost of errors.',
        'Class weighting changes the training loss, while resampling changes training-fold examples; neither changes the real test population.',
        'Use samplers inside the cross-validation pipeline to prevent leakage.',
        'SMOTE interpolates minority neighbours and is only suitable when that feature-space interpolation is meaningful.',
        'Select thresholds and assess calibration using natural-prevalence validation data; report alert burden and group-level behavior.',
      ]} />
    </LearnLayout>
  )
}
