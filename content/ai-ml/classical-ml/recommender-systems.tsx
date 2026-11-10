import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata: Metadata = {
  title: 'Recommender Systems — Chaduvuko',
  description: 'Build intuition for popularity, content-based and collaborative recommenders, matrix factorization, implicit feedback, two-tower retrieval, cold start, and top-k evaluation.',
}

const S = {
  tag: { fontSize: 11, fontWeight: 700 as const, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--accent)', fontFamily: 'var(--font-mono)', display: 'block' as const, marginBottom: 10 },
  h2: { fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 900 as const, letterSpacing: '-1.2px', color: 'var(--text)', marginBottom: 14, lineHeight: 1.15 },
  h3: { fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700 as const, letterSpacing: '-0.4px', color: 'var(--text)', marginBottom: 10, marginTop: 28 },
  p: { fontSize: 15, color: 'var(--muted)', lineHeight: 1.9, marginBottom: 16 },
  ps: { fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 10 },
  sec: { paddingBottom: 56, paddingTop: 8, borderBottom: '1px solid var(--border)' },
}
function Div() { return <div style={{ height: 56 }} /> }
function CodeBlock({ code, label = 'python' }: { code: string; label?: string }) {
  return <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 24 }}><div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border)', background: 'var(--surface)', fontSize: 10, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div><pre style={{ padding: '18px 20px', margin: 0, overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.75, color: 'var(--text)' }}><code>{code}</code></pre></div>
}

export default function RecommenderSystemsPage() {
  return <LearnLayout title="Recommender Systems" description="Explore practical ways to rank movies or products using popularity, content, user-item interactions, matrix factorization, and retrieval—then evaluate what users actually see." section="Classical ML" readTime="25–32 min">
    <div style={S.sec}>
      <span style={S.tag}>From a catalogue to a useful shortlist</span>
      <h2 style={S.h2}>A recommender does not merely predict a rating; it ranks a small set of items that may be useful to a particular person now.</h2>
      <p style={S.p}>A movie service may have thousands of titles, while a shopper sees only a handful of product cards. The system must select candidates, rank them for a user and context, and balance relevance with freshness, availability, diversity, and business constraints. This lesson builds a movie and e-commerce example from simple baselines to modern retrieval ideas.</p>
      <p style={S.p}>The data is usually sparse: a user interacts with only a tiny fraction of the catalogue. A missing interaction does not mean a user disliked an item. A movie may never have been shown; a product may have been out of stock; a user may have watched without rating. Understanding the meaning and collection process of feedback is as important as choosing the algorithm.</p>
      <Callout type="tip">Prerequisite: vectors, similarity, classification/ranking metrics, and basic train/test evaluation. Think carefully about what an interaction means before converting it to a label.</Callout>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>01 — Start with a useful baseline</span>
      <h2 style={S.h2}>Popularity is simple, measurable, and a safe fallback for users without history.</h2>
      <p style={S.p}>Rank movies by recent watch or positive-rating count, or products by purchases and qualified engagement. Global popularity offers a baseline for new users and an operational fallback when a personalized model is unavailable. Raw counts favor items with more exposure, so consider recency, exposure, category, availability, and smoothing when comparing items with very different traffic.</p>
      <p style={S.p}>A practical e-commerce baseline can rank currently available products by recent purchase rate within a category. Filtering by inventory and policy before ranking avoids recommending an item that cannot be purchased. For a movie example, trending titles can be presented as one shelf alongside personalized shelves rather than pretending that every user has known preferences.</p>
      <CodeBlock code={`# Illustrative baseline: item-level counts from training interactions only
popular_items = (
    train_events.groupby("item_id")["positive_event"]
    .sum()
    .sort_values(ascending=False)
)

# At serving time, remove unavailable or ineligible items, then take top N.
recommendations = [item for item in popular_items.index
                   if item_is_eligible(item)][:20]`}/>
      <p style={S.p}>A popularity ranking must be computed using training-period data, not the held-out interactions later used for evaluation. If popularity is time-sensitive, calculate it using the history available at each evaluation point. Otherwise the baseline itself can leak future success.</p>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>02 — Content-based recommendation</span>
      <h2 style={S.h2}>Content-based systems recommend items similar to what a user has engaged with.</h2>
      <p style={S.p}>Represent items using attributes: movie genres, cast, language, release year, and text descriptions; or product category, brand, material, price band, and image/text embeddings. Build a user profile from the weighted combination of item representations they liked or purchased, then rank candidate items by similarity to that profile. This approach can recommend a new item if its content is available, even before it has many interactions.</p>
      <p style={S.p}>For numeric or vector features, cosine similarity is a common score when vector direction matters more than magnitude. For sparse categorical metadata, use a suitable encoding and weighting such as TF-IDF for text. Ensure feature scaling and representation choices do not let an arbitrary field dominate. Exclude items the user should not see, such as already-consumed titles if the product experience calls for discovery.</p>
      <CodeBlock code={`# Conceptual profile from item vectors, weighted by interaction strength
user_profile = sum(weight * item_vectors[item_id]
                   for item_id, weight in user_history)
user_profile = user_profile / (np.linalg.norm(user_profile) + 1e-12)

candidate_scores = item_vectors @ user_profile
ranked_ids = candidate_ids[np.argsort(candidate_scores)[::-1]]`}/>
      <p style={S.p}>Content-based recommendations can become narrow: the model repeatedly shows close variations of what the user already consumed. Add diversity and exploration carefully, measure their effect, and make the recommendation rationale understandable where it helps users make a choice.</p>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>03 — Collaborative filtering</span>
      <h2 style={S.h2}>Collaborative filtering learns from patterns of co-interest across users and items.</h2>
      <p style={S.p}>If users who watched the same dramas also watched a particular new series, that pattern can support a recommendation without relying on genre metadata. User-user methods find users with similar histories; item-item methods find items that attract similar users. Neighborhood approaches are easy to explain and can be strong baselines, but similarity becomes costly or noisy with many users and sparse observations.</p>
      <p style={S.p}>Collaborative signals can discover relationships that metadata misses, but a new user or new item has no interaction history. Moreover, exposure shapes the data: users can only click items they were shown. A click is not an unbiased measure of preference, and a non-click may mean the item was never noticed. Logging impressions and position, not only clicks, improves analysis of these selection effects.</p>
      <h3 style={S.h3}>Explicit ratings and implicit events are different problems</h3>
      <p style={S.p}>Explicit feedback—such as a star rating—directly states a preference on a scale, though only a selected subset of users supplies it. Implicit feedback includes views, dwell time, saves, add-to-cart events, purchases, skips, and dislikes. An implicit event indicates some interaction, but the strength and meaning differ: a purchase is not equivalent to a brief impression. Weight events according to product meaning and consider negative signals separately.</p>
      <Callout type="warning">Do not label every missing user-item pair as a negative. Most unobserved pairs were never exposed or evaluated by the user. For implicit-feedback training, use a documented sampling or weighting strategy and evaluate against appropriately constructed candidates.</Callout>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>04 — Matrix factorization</span>
      <h2 style={S.h2}>Factorization compresses interaction patterns into compact user and item embeddings.</h2>
      <p style={S.p}>For explicit ratings, a common latent-factor model approximates a rating as a global mean plus user and item biases and the dot product of user and item vectors. The vectors are learned so observed ratings are predicted well, usually with regularization to discourage extreme parameter values. A dot product gives a score; it is not automatically a calibrated probability that a user will enjoy the item.</p>
      <CodeBlock code={`# Explicit-rating model, written conceptually
predicted_rating = global_mean + user_bias[user_id] + item_bias[item_id]
predicted_rating += user_embedding[user_id] @ item_embedding[item_id]

# Train against observed ratings with regularization on learned factors.
# Split interactions by time or user/item protocol before fitting.`}/>
      <p style={S.p}>For implicit feedback, objectives often distinguish observed positive interactions from unobserved pairs and weight confidence rather than treating every absence as a verified dislike. Approaches include confidence-weighted factorization and sampled ranking losses. The appropriate method depends on whether the objective is to predict ratings, retrieve likely interactions, or optimize a ranked list.</p>
      <h3 style={S.h3}>Sparse data structures matter</h3>
      <p style={S.p}>A dense user-by-item matrix is usually wasteful: nearly every cell is empty. Store only observed interactions in a sparse representation or interaction table, and map external IDs to contiguous model indices. Keep that mapping with the model so training indices cannot be confused with production identifiers. Cold users and items need explicit fallback paths rather than invalid embedding lookups.</p>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>05 — Two-tower retrieval at a high level</span>
      <h2 style={S.h2}>Two-tower models encode users and items separately so candidate retrieval can scale.</h2>
      <p style={S.p}>A user tower maps user history and context to an embedding. An item tower maps item features to an embedding in a compatible space. The dot product or another similarity score ranks compatibility. Because item embeddings can be computed and indexed ahead of time, approximate nearest-neighbor search can retrieve a manageable candidate set from a large catalogue. A separate ranking model can then use richer, candidate-specific features to order those candidates.</p>
      <p style={S.p}>Training examples pair users and positive items with sampled or otherwise defined negatives. The sampling procedure shapes what the model learns: random negatives may be too easy, while in-batch or hard negatives can introduce their own biases. If the two towers use only independent features, the retrieval score must be computable from their separately produced embeddings. Features requiring a joint interaction are more naturally used in the ranking stage.</p>
      <CodeBlock code={`# Inference sketch; item vectors are precomputed and indexed.
user_vector = user_tower(user_features, recent_history)
candidate_ids = ann_index.search(user_vector, top_k=500)

# A reranker can use features available for this user-item-context tuple.
ranked = ranker.score(user_id, candidate_ids, request_context)
return apply_eligibility_and_diversity(ranked)[:20]`}/>
      <p style={S.p}>This retrieval-plus-ranking pattern separates scale from fine-grained decisions. It also creates multiple evaluation questions: did retrieval include relevant candidates, did ranking put them near the top, and did the final policy respect availability, safety, and diversity constraints? A strong ranker cannot recover a relevant item that retrieval omitted.</p>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>06 — Cold start and responsible fallback</span>
      <h2 style={S.h2}>New users and new items need a deliberate experience before collaborative history exists.</h2>
      <p style={S.p}><strong>User cold start:</strong> use popularity, onboarding preferences, session context, or a small number of explicitly chosen interests. Do not demand unnecessary personal information; let users skip personalization and provide controls to revise preferences. <strong>Item cold start:</strong> use content features, editorial metadata, or a controlled exploration policy to learn whether new items resonate. <strong>System cold start:</strong> use a robust popular or curated shelf while interaction logs are sparse.</p>
      <p style={S.p}>Cold-start fallbacks should preserve eligibility, privacy, and user expectations. A new product still needs inventory and policy checks. A new movie may be surfaced to a relevant cohort based on content before enough ratings accumulate. The system should not infer sensitive traits from weak behavioral evidence just to make a ranking appear personalized.</p>
      <h3 style={S.h3}>Feedback loops and exposure bias</h3>
      <p style={S.p}>Recommendations influence what users see, and what users see determines which interactions are observed. If the system only shows historically popular products, it may collect more interactions on those products and reinforce the original popularity advantage. Track impressions and position, preserve a safe amount of exploration where appropriate, and evaluate changes using online experiments or other causal methods when suitable. Offline metrics alone do not prove that a new ranking improves user outcomes.</p>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>07 — Evaluate the ranked list</span>
      <h2 style={S.h2}>Precision@k, Recall@k, and NDCG answer different questions about the first k recommendations.</h2>
      <p style={S.p}><strong>Precision@k</strong> is the fraction of the top-k recommendations that are relevant. It asks how many displayed items are useful. <strong>Recall@k</strong> is the fraction of relevant held-out items that appear in the top k. It asks how much of a user's relevant set was retrieved. They depend on the definition of relevant, the candidate set, and the number of held-out positives.</p>
      <p style={S.p}><strong>Discounted cumulative gain</strong> gives more credit to relevant items near the top; <strong>NDCG@k</strong> normalizes that gain against an ideal ordering. For graded feedback, relevance can have multiple levels, but mapping ratings or events to gains must be stated. A system with high offline recall may still have poor top-position quality; NDCG captures ranking position more directly.</p>
      <CodeBlock code={`def precision_at_k(recommended, relevant, k):
    top_k = recommended[:k]
    return sum(item in relevant for item in top_k) / k

def recall_at_k(recommended, relevant, k):
    if not relevant:
        return float("nan")  # document how empty-relevance users are handled
    top_k = recommended[:k]
    return sum(item in relevant for item in top_k) / len(relevant)

# NDCG: compute discounted gain for ranked items and divide by ideal DCG.
# Choose the gain mapping and the treatment of users with no positives explicitly.`}/>
      <p style={S.p}>Use a time-aware or otherwise deployment-aligned split. Avoid placing the same event in both train and test, and ensure the item universe and candidate generation match the evaluation claim. Report metrics across user cohorts, item age, popularity bands, and relevant business slices. Measure coverage and diversity alongside relevance when those properties matter to the product.</p>
      <Callout type="tip">A recommendation metric is only meaningful with its protocol: relevance rule, split, candidate set, k, and aggregation across users. Record all five so results can be reproduced and compared fairly.</Callout>
    </div>
    <Div />

    <div style={S.sec}>
      <span style={S.tag}>08 — From offline score to product quality</span>
      <h2 style={S.h2}>A technically accurate ranking still needs product constraints, monitoring, and user trust.</h2>
      <p style={S.p}>Filter candidates for availability, regional eligibility, content policy, and items already consumed when appropriate. Apply business rules transparently and do not let sponsored placement masquerade as organic relevance. Consider diversity, novelty, and repeated exposure so a ranking does not fill every slot with near-duplicates. Keep a fallback when user history or an embedding lookup is unavailable.</p>
      <p style={S.p}>Monitor input freshness, recommendation coverage, catalog changes, latency, error rates, and outcome metrics. Store model version and ranking context for diagnosis while respecting data minimization and retention policies. Provide a clear way to dismiss or tune recommendations where appropriate. A recommender is part of a user-facing decision system, not just an embedding model.</p>
    </div>
    <Div />

    <div style={{ paddingBottom: 48, paddingTop: 8 }}>
      <span style={S.tag}>What comes next</span>
      <h2 style={S.h2}>Evaluate models with metrics that match the decision, not just a single accuracy score.</h2>
      <p style={S.p}>Next, study evaluation metrics across classification and ranking. Build a careful measurement protocol, understand the limits of each score, and interpret performance in the context of users, candidates, and deployment.</p>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <div><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginBottom: 5 }}>Next — Evaluation and Optimisation</div><div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>Evaluation Metrics — Beyond Accuracy</div><p style={{ ...S.ps, marginBottom: 0, marginTop: 4 }}>Choose metrics and validation protocols that answer the right question.</p></div>
        <Link href="/learn/ai-ml/evaluation/evaluation-metrics" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, border: '1px solid var(--accent)', padding: '7px 14px', borderRadius: 6, fontFamily: 'var(--font-mono)', textDecoration: 'none', whiteSpace: 'nowrap' }}>Start →</Link>
      </div>
    </div>
    <KeyTakeaways items={[
      'Popularity is a valuable baseline and cold-start fallback; compute it from training history and apply eligibility filters.',
      'Content-based methods use item attributes and user profiles; collaborative filtering discovers patterns across interactions but is affected by sparse, exposure-biased data.',
      'Explicit ratings and implicit events carry different meanings. Missing interactions are not automatically negative feedback.',
      'Matrix factorization learns compact user and item factors; two-tower models support scalable retrieval before a richer ranking stage.',
      'New users and items need explicit cold-start paths. Use content, context, onboarding choices, popularity, or controlled exploration with user-respecting defaults.',
      'Precision@k measures relevant items among those shown; Recall@k measures relevant items retrieved; NDCG@k rewards higher-ranked relevant results.',
      'Document relevance, candidate generation, time split, k, and aggregation. Offline metrics do not alone establish product impact.',
      'Filter for availability and policy, monitor feedback loops and coverage, and preserve user trust with sensible controls and privacy-aware data handling.',
    ]} />
  </LearnLayout>
}
