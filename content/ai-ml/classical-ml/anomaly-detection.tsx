import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { AIMLCode, AIMLList, AIMLMistakes, AIMLNext, AIMLNote, AIMLParagraph, AIMLSection, AIMLTable } from '@/content/ai-ml/lesson-shared'

export default function AnomalyDetection() {
  return (
    <LearnLayout
      title="Anomaly Detection — Isolation Forest and Autoencoders"
      description="Detect unusual observations with Isolation Forest and reconstruction error, then choose thresholds with labels and operational costs in mind."
      section="Classical ML — Lesson 35"
      readTime="18–24 min"
    >
      <AIMLSection label="Prerequisites and goal" title="An unusual point is not automatically a bad point">
        <AIMLParagraph>Before this lesson, know train/test splits, feature scaling, decision thresholds and basic classification metrics. Anomaly detection is useful when unusual events are rare, expensive to label or not fully known in advance. The model produces a score or flag—not a verified explanation. You still need a review process and evidence that alerts help.</AIMLParagraph>
        <AIMLList items={['Distinguish outlier detection, novelty detection and supervised rare-event classification.', 'Train Isolation Forest and an autoencoder without leaking held-out data.', 'Select an alert threshold using validation evidence and operational costs.']} />
        <AIMLParagraph>Examples include unexpected payment patterns, a sensor reading that departs from normal machine behavior, or a sudden shift in API latency. Some tasks have a clear normal-only training set; others include a mixture of normal and anomalous observations. That distinction changes the modelling approach and what the score means.</AIMLParagraph>
        <AIMLTable head={['Task framing', 'Training data', 'Typical question']} rows={[
          ['Outlier detection', 'A general dataset that may contain anomalies', 'Which rows look unusual relative to this sample?'],
          ['Novelty detection', 'A curated set of normal observations', 'Does this new row depart from the learned normal region?'],
          ['Supervised rare-event classification', 'Representative labelled examples of both classes', 'Which event is most likely to belong to a known positive class?'],
        ]} />
        <AIMLNote title="First decision" tone="tip">If representative labels exist, start with a supervised baseline and cost-aware evaluation. Unsupervised anomaly scores are not automatically better simply because the positive class is rare.</AIMLNote>
      </AIMLSection>

      <AIMLSection label="1 · Isolation Forest" title="Unusual points take fewer random splits to isolate">
        <AIMLParagraph>Isolation Forest repeatedly chooses a feature and a random split value. A point that differs strongly from the bulk of observations tends to be separated after fewer splits. Across many randomized trees, shorter average path lengths indicate more anomalous observations. The method is attractive for tabular data because it does not need labelled examples and can handle many feature dimensions.</AIMLParagraph>
        <AIMLParagraph>Scikit-learn's <code>IsolationForest</code> exposes scores with a sign convention worth checking: <code>decision_function</code> values below zero are classified as outliers by the fitted threshold; <code>predict</code> returns <code>-1</code> for outlier and <code>1</code> for inlier. A score is a ranking signal, not a probability that an event is malicious or erroneous.</AIMLParagraph>
        <AIMLCode label="python · train an Isolation Forest" code={`from sklearn.ensemble import IsolationForest
from sklearn.datasets import make_blobs
from sklearn.model_selection import train_test_split
import numpy as np

# Demonstration only: production features need domain-aware cleaning.
X_normal, _ = make_blobs(n_samples=1800, centers=3, random_state=31)
rng = np.random.default_rng(31)
X_rare = rng.uniform(low=-10, high=10, size=(45, 2))
X = np.vstack([X_normal, X_rare])
y = np.r_[np.zeros(len(X_normal)), np.ones(len(X_rare))]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, stratify=y, random_state=31
)
X_fit, X_val, y_fit, y_val = train_test_split(
    X_train, y_train, test_size=0.25, stratify=y_train, random_state=31
)

model = IsolationForest(
    n_estimators=300,
    max_samples="auto",
    contamination="auto",
    random_state=31,
    n_jobs=-1,
)
model.fit(X_fit)
val_score = -model.score_samples(X_val)  # larger means more anomalous
val_flag = model.predict(X_val) == -1
print("validation flags:", int(val_flag.sum()), "of", len(val_flag))`} />
        <AIMLNote title="Do not guess prevalence" tone="warning">Setting <code>contamination</code> to a guessed anomaly rate bakes that assumption into the default threshold. If the true rate is unknown or changes over time, keep scores, validate thresholds using reviewed examples, and track alert volume separately.</AIMLNote>
      </AIMLSection>

      <AIMLSection label="2 · Reconstruction error" title="An autoencoder learns to reconstruct familiar inputs">
        <AIMLParagraph>An autoencoder maps input features into a smaller representation and then reconstructs them. Train it primarily on normal examples. If the network captures normal structure, an unfamiliar example may have larger reconstruction error. The score for row <em>x</em> can be the mean squared difference between input and reconstruction, though feature scales and the loss definition matter.</AIMLParagraph>
        <AIMLParagraph>The network is powerful enough to reconstruct many inputs—including anomalies—if it is too wide, too deep, or trained too long. A high reconstruction error can also come from a valid but rare normal subgroup. The score is a triage signal, not a semantic explanation. We use a small scikit-learn MLP to demonstrate the architecture without assuming the later PyTorch lessons.</AIMLParagraph>
        <AIMLCode label="python · MLP autoencoder on normal rows" code={`from sklearn.neural_network import MLPRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import average_precision_score
import numpy as np

# Reserve normal rows from model-fitting data for threshold calibration.
X_train_normal, X_calibration = train_test_split(
    X_fit[y_fit == 0], test_size=0.2, random_state=31
)
autoencoder = make_pipeline(
    StandardScaler(),
    MLPRegressor(
        hidden_layer_sizes=(8, 3, 8),
        activation="relu",
        solver="adam",
        max_iter=500,
        early_stopping=True,
        random_state=31,
    ),
)
autoencoder.fit(X_train_normal, X_train_normal)
reconstructed = autoencoder.predict(X_calibration)
calibration_error = np.mean((X_calibration - reconstructed) ** 2, axis=1)
threshold = np.quantile(calibration_error, 0.99)
val_reconstruction = autoencoder.predict(X_val)
val_error = np.mean((X_val - val_reconstruction) ** 2, axis=1)
print("calibration threshold:", threshold)
print("validation average precision:", average_precision_score(y_val, val_error))`} />
        <AIMLParagraph>The code reserves a normal-only calibration subset and uses validation labels only to assess ranking. Keep the final test set untouched until the approach and threshold are chosen. Fit the scaler on normal training rows, not on future observations. A bottleneck and regularisation can encourage useful compression, but tune model capacity on development data and review false alarms, not just reconstruction loss.</AIMLParagraph>
      </AIMLSection>

      <AIMLSection label="3 · Thresholds and evaluation" title="Turn a ranking score into an alert policy">
        <AIMLParagraph>Both methods produce continuous scores. A threshold determines how many rows are raised for review. Choose it on validation or calibration data—not on the final test set. When you have labelled examples, plot precision and recall at candidate thresholds and estimate expected workload. When labels are unavailable, involve domain experts to review samples across score bands and document the uncertainty.</AIMLParagraph>
        <AIMLCode label="python · evaluate only after labels are available" code={`from sklearn.metrics import average_precision_score, precision_recall_curve, confusion_matrix

# y_val has 1 for a confirmed anomaly and 0 otherwise.
pr_auc = average_precision_score(y_val, val_score)
precision, recall, thresholds = precision_recall_curve(y_val, val_score)

# Example policy: meet a minimum recall on validation, then inspect precision.
required_recall = 0.80
valid = np.flatnonzero(recall[:-1] >= required_recall)
if len(valid):
    candidate = valid[-1]  # highest threshold that still meets the recall goal
    chosen_threshold = thresholds[candidate]
    print("threshold:", chosen_threshold)
    print("precision:", precision[candidate], "recall:", recall[candidate])
    test_score = -model.score_samples(X_test)
    test_prediction = (test_score >= chosen_threshold).astype(int)
    print("final test confusion matrix:", confusion_matrix(y_test, test_prediction))
else:
    print("No threshold meets the recall requirement on this validation set")`} />
        <AIMLParagraph>Average precision is often more informative than ROC-AUC when the positive class is very rare, but it still depends on prevalence. Report the test-set prevalence, confusion counts at the chosen threshold, precision-recall curve and relevant slice metrics. In a human-review workflow, also report alerts per day, average review time and the cost of missed events.</AIMLParagraph>
      </AIMLSection>

      <AIMLSection label="4 · Build a review workflow" title="An anomaly score should lead to a useful, safe next step">
        <AIMLParagraph>Decide whether each alert is automatically blocked, queued for human review, or simply logged for aggregate analysis. For high-impact actions, prefer review and recourse until evidence supports a narrower automation. Include enough context for an investigator to understand why a row was flagged, while limiting sensitive data and avoiding explanations that overstate what the detector learned.</AIMLParagraph>
        <AIMLParagraph>Monitor the fraction of traffic flagged, score distributions, input missingness and the rate at which reviewed cases are confirmed. If confirmed labels arrive later, track review delays. Set owners and response thresholds for sudden alert spikes or drops, and keep a fallback path when model features are unavailable. A model retrained on reviewed alerts can inherit selective-label bias, so audit which examples receive review.</AIMLParagraph>
        <AIMLNote title="Monitoring is part of the detector" tone="tip">A change in alert volume may indicate real incidents, a shifted population, a broken feature pipeline or a changed threshold. Investigate the cause before automatically retraining.</AIMLNote>
      </AIMLSection>

      <AIMLSection label="5 · Common mistakes" title="Treat anomaly flags as uncertain evidence">
        <AIMLMistakes items={[
          { mistake: 'Calling every flagged row fraud, failure or abuse.', fix: 'Describe the output as an anomaly score and route alerts through a context-aware investigation process.' },
          { mistake: 'Using the test labels to choose contamination or a threshold.', fix: 'Select operating rules on development data, then evaluate once on the held-out test set.' },
          { mistake: 'Training a reconstruction model on mixed data and assuming it learns normality.', fix: 'Curate the training set or explicitly assess contamination; compare against an Isolation Forest and simple baselines.' },
          { mistake: 'Ignoring feature scales, missingness and changing normal behavior.', fix: 'Fit preprocessing on training data and monitor input distributions, score distributions and reviewed outcomes over time.' },
        ]} />
        <AIMLNote title="Safety and operations">A false alarm can create real consequences: a payment may be blocked, a customer may be questioned, or an engineer may spend hours investigating. Build a review path, communicate uncertainty, support appeals where appropriate, and measure impact across affected groups.</AIMLNote>
      </AIMLSection>

      <AIMLSection label="6 · Practice and takeaways" title="Build an anomaly workflow, not just an estimator">
        <AIMLList ordered items={[
          'Create a normal-only training set and a separate labelled validation set. Fit Isolation Forest and compare its scores with a simple distance or rule-based baseline.',
          'Train a small autoencoder on normal rows. Plot reconstruction-error distributions for normal and known anomalous examples.',
          'Choose a threshold to meet a review capacity or recall objective. Report the corresponding precision and number of alerts.',
          'Inspect false positives and false negatives. Group the review by a relevant segment and note any sensitive proxies or data-quality patterns.',
          'Write a deployment checklist covering score logging, drift, model refresh, human review and a safe fallback when data is missing.'
        ]} />
        <AIMLParagraph>Isolation Forest isolates rare points with random partitions; autoencoders flag inputs that are hard to reconstruct from learned normal patterns. Both depend on representation, training data and threshold choices. Validate with labels where possible, report alert costs and limits, and never treat an anomaly score as proof of intent or harm.</AIMLParagraph>
      </AIMLSection>

      <AIMLNext href="/learn/ai-ml/classical-ml/pca" number="36" section="Classical ML" title="Principal Component Analysis" text="Next, reduce correlated dimensions and understand how variance-preserving projections affect analysis." />
      <KeyTakeaways items={[
        'Separate outlier detection from novelty detection and supervised rare-event classification; they make different assumptions about training data.',
        'Isolation Forest ranks unusual points by how easily random partitions isolate them.',
        'An autoencoder uses reconstruction error as a novelty signal, but can reconstruct anomalies and over-flag rare normal cases.',
        'Choose score thresholds using development evidence and operational costs; do not treat scores as probabilities.',
        'Monitor alert volume, input drift, reviewed outcomes and group-level effects after deployment.',
      ]} />
    </LearnLayout>
  )
}
