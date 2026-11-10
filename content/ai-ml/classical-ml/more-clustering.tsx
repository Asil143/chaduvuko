import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { AIMLCode, AIMLList, AIMLMistakes, AIMLNext, AIMLNote, AIMLParagraph, AIMLSection, AIMLTable } from '@/content/ai-ml/lesson-shared'

export default function MoreClustering() {
  return (
    <LearnLayout
      title="More Clustering — Hierarchical and DBSCAN"
      description="Choose between hierarchical clustering and DBSCAN, interpret their assumptions, and build a scaling-aware workflow."
      section="Classical ML — Lesson 34"
      readTime="18–24 min"
    >
      <AIMLSection label="Prerequisites and goal" title="Clusters are assumptions about shape, distance and density">
        <AIMLParagraph>Before this lesson, understand K-Means, feature scaling, distance, and the difference between labelled and unlabelled learning. K-Means partitions points around a chosen number of centroids, which works well for compact, roughly spherical groups. It is not a universal definition of a cluster. Here you will learn two alternatives: hierarchical clustering, which builds a tree of nested merges, and DBSCAN, which groups dense regions and marks isolated points as noise.</AIMLParagraph>
        <AIMLList items={['Explain how linkage changes hierarchical merges.', 'Tune DBSCAN with its density assumptions and noise labels in mind.', 'Compare cluster stability, shape and practical usefulness rather than relying on one score.']} />
        <AIMLParagraph>Suppose a learning platform wants to understand usage patterns. Some behaviours may form nested groups: occasional learners inside broader study styles. Other patterns may be irregular: dense activity pockets separated by sparse areas. The method should match the geometry and the decision you need to make, rather than the algorithm you happen to know first.</AIMLParagraph>
        <AIMLNote title="No label means no automatic proof" tone="warning">An algorithm always returns a structure, even when the data has no meaningful groups. Validate clusters with domain knowledge, stability checks and a useful downstream question.</AIMLNote>
        <AIMLTable head={['Method', 'Cluster definition', 'Useful when', 'Main limitation']} rows={[
          ['K-Means', 'Near centroid under a distance metric', 'Compact groups and a defensible K', 'Sensitive to scale, outliers, and non-spherical shapes'],
          ['Agglomerative hierarchy', 'Repeatedly merge the nearest clusters', 'Nested structure or need to inspect multiple cuts', 'Can be expensive; linkage and distance change results'],
          ['DBSCAN', 'Connected regions of sufficient local density', 'Irregular shapes and meaningful noise points', 'One density setting may not fit varying-density groups'],
        ]} />
      </AIMLSection>

      <AIMLSection label="1 · Hierarchical clustering" title="A dendrogram records how groups combine">
        <AIMLParagraph>Agglomerative clustering starts with each row as its own cluster. At each step it merges the closest pair according to a linkage rule. Single linkage uses the nearest pair of points; complete linkage uses the farthest pair; average linkage averages pairwise distances; Ward linkage merges to minimise the increase in within-cluster variance. The sequence of merges forms a hierarchy.</AIMLParagraph>
        <AIMLParagraph>A dendrogram is a tree diagram of those merges. Cutting it at a selected height yields a number of clusters; the tree lets you inspect several plausible cuts without rerunning the merge procedure. A tall merge joins groups that were relatively far apart, which can suggest a cut—but it is evidence to investigate, not an objective answer to “the correct K”.</AIMLParagraph>
        <AIMLCode label="python · hierarchical clustering" code={`from sklearn.cluster import AgglomerativeClustering
from sklearn.datasets import make_blobs
from sklearn.preprocessing import StandardScaler

X, _ = make_blobs(
    n_samples=600, centers=4, cluster_std=[0.6, 1.0, 0.7, 1.1],
    random_state=21,
)
X_scaled = StandardScaler().fit_transform(X)

hierarchical = AgglomerativeClustering(
    n_clusters=4,
    linkage="ward",
)
labels = hierarchical.fit_predict(X_scaled)
print("cluster sizes:", __import__("numpy").bincount(labels))`} />
        <AIMLNote title="Distance and linkage must agree" tone="tip">Ward linkage is defined around variance and is intended for Euclidean geometry. Other linkages support different distance choices. Check the estimator's documented constraints before combining a linkage with a metric.</AIMLNote>
        <AIMLCode label="python · inspect a dendrogram" code={`from scipy.cluster.hierarchy import linkage, dendrogram, fcluster
import matplotlib.pyplot as plt

# X_scaled is the same scaled feature matrix from the previous example.
merge_tree = linkage(X_scaled, method="ward")
labels_from_tree = fcluster(merge_tree, t=4, criterion="maxclust")
print("cluster sizes:", __import__("numpy").bincount(labels_from_tree))

fig, ax = plt.subplots(figsize=(10, 4))
dendrogram(merge_tree, truncate_mode="lastp", p=20, ax=ax)
ax.set_title("Recent agglomerative merges")
ax.set_ylabel("Merge distance")
fig.tight_layout()
plt.show()`} />
        <AIMLParagraph>The truncated plot keeps the display readable; use the full tree for smaller datasets or inspect selected branches. <code>fcluster</code> returns a flat cut under a specified criterion. Compare a few cuts with profiles and stability rather than choosing a cut solely from the drawing.</AIMLParagraph>
      </AIMLSection>

      <AIMLSection label="2 · DBSCAN" title="Find dense regions without asking for K">
        <AIMLParagraph>DBSCAN uses two controls. <code>eps</code> is the neighbourhood radius; <code>min_samples</code> is the density threshold used to identify core points. A core point has at least that many neighbours in its radius (including itself in scikit-learn's convention). Points reachable from core points join their cluster. Points that cannot be reached are labelled noise with label <code>-1</code>.</AIMLParagraph>
        <AIMLParagraph>Unlike K-Means, DBSCAN can find non-convex shapes and does not require the number of clusters up front. It can also highlight unusual observations. But its density assumption is important: one global radius can merge dense regions or fragment sparse ones when cluster density varies. Scale numeric features first, because a large-unit feature can dominate neighbourhood distance.</AIMLParagraph>
        <AIMLCode label="python · DBSCAN and noise accounting" code={`from sklearn.cluster import DBSCAN
from sklearn.datasets import make_moons
from sklearn.preprocessing import StandardScaler
import numpy as np

X, _ = make_moons(n_samples=800, noise=0.07, random_state=21)
X_scaled = StandardScaler().fit_transform(X)

model = DBSCAN(eps=0.22, min_samples=8)
labels = model.fit_predict(X_scaled)
cluster_ids = set(labels) - {-1}
noise_count = int(np.sum(labels == -1))
print("clusters:", len(cluster_ids))
print("noise rows:", noise_count)
print("core samples:", len(model.core_sample_indices_))`} />
        <AIMLParagraph>The parameter values are starting points for this generated dataset, not reusable defaults. On real data, visualise nearest-neighbour distances, vary plausible settings, inspect cluster sizes, and test whether the resulting groups are stable and useful. For high-dimensional data, distance often becomes less informative, so consider representation, feature selection or dimensionality reduction before interpreting density results.</AIMLParagraph>
      </AIMLSection>

      <AIMLSection label="3 · Compare fairly" title="Preprocessing changes the geometry">
        <AIMLParagraph>Scaling is not a mechanical checkbox; it defines what “near” means. If distance in a feature is not meaningful in your application, rescaling it will not fix the concept. Remove identifiers, consider correlated features that unintentionally count the same information multiple times, and encode categories with an approach appropriate to the distance metric. Fit transformations only on the data being analysed and preserve the same pipeline for future assignments.</AIMLParagraph>
        <AIMLTable head={['Diagnostic', 'What to inspect', 'Why it matters']} rows={[
          ['Cluster sizes', 'Counts per label and proportion marked noise', 'Tiny groups may be fragments or genuinely rare patterns'],
          ['Geometry', 'Scatter plots or projections, with original features reviewed', 'A 2-D projection can hide or distort structure'],
          ['Stability', 'Labels under resampling or modest parameter changes', 'Fragile clusters may be artifacts of one sample'],
          ['Utility', 'A downstream action or meaningful profile per group', 'Clusters without a use case are not automatically valuable'],
        ]} />
        <AIMLParagraph>For usage segmentation, compare the distribution of study frequency, completion, device and time-of-day across clusters. Avoid naming a segment from one noisy feature. If groups are used to target learners, check whether a cluster is a proxy for a sensitive attribute and whether the action benefits the learner.</AIMLParagraph>
      </AIMLSection>

      <AIMLSection label="4 · Parameter selection" title="Use diagnostics to narrow choices, then check stability">
        <AIMLParagraph>For DBSCAN, inspect a sorted k-nearest-neighbour distance plot as one way to find candidate <code>eps</code> values; the bend is a heuristic, not a proof. Change <code>min_samples</code> and compare the number and size of clusters, noise rate and whether important neighborhoods remain together. For hierarchical clustering, compare plausible linkage/cut combinations and inspect the merge structure before naming segments.</AIMLParagraph>
        <AIMLParagraph>Silhouette scores can be useful when the distance assumptions fit, but they favor some compact shapes and are not a universal measure of clustering quality. Use bootstrap or repeated subsamples to test whether group membership is stable. If the clusters will trigger an action, test that action with domain experts and affected users before broad rollout.</AIMLParagraph>
        <AIMLNote title="No single best parameter">The same data can support multiple reasonable partitions. Write down what the grouping is for and compare a small, justified set of configurations instead of searching until one score looks impressive.</AIMLNote>
      </AIMLSection>

      <AIMLSection label="5 · Common mistakes" title="Avoid false certainty from an unsupervised result">
        <AIMLMistakes items={[
          { mistake: 'Comparing raw distance results across unscaled features.', fix: 'Choose a domain-meaningful feature representation and scale numeric columns within the workflow.' },
          { mistake: 'Treating DBSCAN label -1 as an ordinary cluster.', fix: 'Report noise separately and inspect what those rows have in common.' },
          { mistake: 'Selecting a cluster count from a dendrogram or silhouette score alone.', fix: 'Combine diagnostics with stability and a decision that the grouping should support.' },
          { mistake: 'Interpreting a 2-D projection as the full geometry.', fix: 'Validate profiles and distances in the original feature space; projections are exploratory views.' },
        ]} />
        <AIMLNote title="Production consideration">If clusters drive a product workflow, persist the preprocessing and model configuration, define how new points are assigned, and monitor changes in cluster sizes and input distributions. Agglomerative models do not provide a simple universal prediction rule for new observations; design that behavior deliberately.</AIMLNote>
      </AIMLSection>

      <AIMLSection label="6 · Practice and takeaways" title="Choose the method by the structure you expect">
        <AIMLList ordered items={[
          'Generate compact blobs and compare K-Means with Ward hierarchical clustering. Compare cluster sizes and profiles, not only label numbers.',
          'Fit DBSCAN to two-moons data. Vary eps and min_samples; record how many clusters and noise rows result.',
          'Create a dataset with features in different units. Run DBSCAN before and after scaling and explain why the partition changes.',
          'Apply a clustering method to a dataset you understand. Write a one-paragraph profile for each group and identify one limitation.',
          'Propose a stability test: resample the observations or perturb a parameter slightly, then compare the resulting assignments.'
        ]} />
        <AIMLParagraph>Clustering is a modelling choice about geometry. Hierarchical clustering provides a merge tree and flexible cuts; DBSCAN detects dense connected regions and noise without choosing K. Neither is automatically superior to K-Means. Scaling, parameter sensitivity, stability, interpretable profiles and responsible downstream use determine whether the structure is useful.</AIMLParagraph>
      </AIMLSection>

      <AIMLNext href="/learn/ai-ml/classical-ml/anomaly-detection" number="35" section="Classical ML" title="Anomaly Detection — Isolation Forest and Autoencoders" text="Learn how to flag unusual observations when labels are scarce, and how to evaluate alerts responsibly." />
      <KeyTakeaways items={[
        'Hierarchical clustering builds a sequence of merges; linkage controls the meaning of proximity.',
        'DBSCAN groups dense, connected regions and marks points that are not density-reachable as noise.',
        'Scale and feature representation define distance, so preprocessing is part of the clustering model.',
        'Inspect cluster sizes, profiles, parameter sensitivity and stability; do not infer truth from a plot alone.',
        'Plan how new observations are assigned and how cluster behavior is monitored before using groups in production.',
      ]} />
    </LearnLayout>
  )
}
