import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function VectorDatabases() {
  return (
    <LearnLayout
      title="Vector Databases — pgvector, Chroma, Pinecone and FAISS"
      description="Store and query embeddings at scale: indexes (HNSW, IVF), metadata filters, hybrid search, and how to choose a vector store."
      section="Generative AI & LLM Engineering — Lesson 06"
      readTime="35 min"
    >
      <Part n={1} label="Purpose" title="Store Vectors Beside the Data Needed to Use Them">
        <P>
          A vector database stores numeric embeddings and finds nearby vectors for a query. A useful retrieval record also
          carries a stable chunk ID, source text or a secure pointer, document version, title, access scope, and other metadata.
          Without that information, a nearest-neighbour result is just a row of numbers with no safe way to cite, filter,
          refresh, or delete its source.
        </P>
        <P>
          A vector store is one part of a retrieval system, not a complete RAG solution. You still need ingestion, permissions,
          chunking, model versioning, query construction, evaluation, monitoring, and deletion workflows. For a small corpus,
          exact NumPy search may be enough; adopt a database when scale, filtering, operations, or shared access justify it.
        </P>
        <Table
          head={['Option', 'Good fit', 'Trade-off to consider']}
          rows={[
            ['PostgreSQL + pgvector', 'Existing PostgreSQL stack and relational metadata', 'Index and query tuning; extension availability on your service'],
            ['Chroma', 'Local development and straightforward vector collections', 'Operational and scaling characteristics for your deployment'],
            ['Qdrant', 'Purpose-built vector search with payload filtering', 'Another service and its backup, access and monitoring needs'],
            ['Pinecone', 'Managed vector database workflows', 'Provider-specific operations, cost and data-location review'],
            ['FAISS', 'Local or embedded nearest-neighbour search library', 'You provide persistence, metadata, API and access-control layers'],
          ]}
        />
        <Callout type="info">
          Select based on workload, data governance, deployment constraints, filtering needs and team operations—not a benchmark
          headline alone. Confirm current product capabilities in official documentation before committing.
        </Callout>
      </Part>

      <Part n={2} label="Relational storage" title="Create a pgvector Table with Metadata">
        <P>
          pgvector adds vector types and similarity operators to PostgreSQL. It lets an application keep vectors, chunk text,
          and relational metadata together, and combine semantic search with SQL filters. Install or enable the extension in a
          database environment that supports it; the SQL below assumes the extension is already available.
        </P>
        <Code file="schema.sql" lang="sql" code={`
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE document_chunks (
    id text PRIMARY KEY,
    document_id text NOT NULL,
    content text NOT NULL,
    embedding vector(3) NOT NULL,
    track text NOT NULL,
    visibility text NOT NULL,
    model_key text NOT NULL,
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX document_chunks_track_idx ON document_chunks (track);
`} />
        <P>
          <code>vector(3)</code> is only a tiny illustrative dimension so the schema example is readable. Set the dimension to
          the value returned by the embedding model you configure, and keep it consistent within an index. Keep secrets and
          database connection strings outside source code. Apply ordinary row-level or application-level access controls to
          the text and metadata; vector similarity is not authorization.
        </P>
        <Callout type="tip">
          A <code>model_key</code> can identify the embedding configuration used for a row. It helps prevent accidental queries
          across incompatible vector spaces and supports controlled re-indexing.
        </Callout>
      </Part>

      <Part n={3} label="Query" title="Use SQL for Similarity and Metadata Filters">
        <P>
          pgvector provides distance operators. The cosine distance operator <code>&lt;=&gt;</code> orders closest rows first;
          one minus cosine distance can be presented as a similarity-like value when that matches the operator semantics.
          Confirm operator details for the installed extension version and use the same vector model and dimension for query
          and stored embeddings.
        </P>
        <Code file="search.sql" lang="sql" code={`
-- :query_embedding is bound by the database driver, not concatenated into SQL.
SELECT id, document_id, content,
       1 - (embedding <=> :query_embedding) AS cosine_similarity
FROM document_chunks
WHERE track = :track
  AND visibility = 'published'
  AND model_key = :model_key
ORDER BY embedding <=> :query_embedding
LIMIT :top_k;
`} />
        <P>
          Bind parameters using your database driver instead of interpolating user or model text into SQL. Restrict results
          with trusted filters before building model context. For multi-tenant data, include tenant and authorization constraints
          in every retrieval path, and test that a user cannot access another tenant&apos;s chunks.
        </P>
        <Code file="upsert.sql" lang="sql" code={`
INSERT INTO document_chunks
    (id, document_id, content, embedding, track, visibility, model_key)
VALUES
    (:id, :document_id, :content, :embedding, :track, :visibility, :model_key)
ON CONFLICT (id) DO UPDATE SET
    content = EXCLUDED.content,
    embedding = EXCLUDED.embedding,
    track = EXCLUDED.track,
    visibility = EXCLUDED.visibility,
    model_key = EXCLUDED.model_key,
    updated_at = now();
`} />
        <P>
          Use transactions to keep text, vector, and metadata updates consistent. A document edit may affect many chunks; mark
          old chunks stale or replace them as one coordinated ingestion operation so users do not search a mixture of versions.
        </P>
      </Part>

      <Part n={4} label="Index" title="Approximate Nearest Neighbour: HNSW and IVFFlat">
        <P>
          Exact search compares the query with every eligible vector. An approximate nearest-neighbour (ANN) index trades some
          recall for faster search as collections grow. HNSW organizes a navigable graph; IVFFlat groups vectors into lists
          and searches selected lists. The right choice depends on collection size, update patterns, memory, latency goals,
          filter selectivity, and the database version and configuration available to you.
        </P>
        <Code file="indexes.sql" lang="sql" code={`
-- Example index forms; check pgvector documentation for current options and tuning.
CREATE INDEX document_chunks_hnsw_idx
ON document_chunks USING hnsw (embedding vector_cosine_ops);

-- Alternative family: IVFFlat. Build and tune for your corpus and query pattern.
CREATE INDEX document_chunks_ivf_idx
ON document_chunks USING ivfflat (embedding vector_cosine_ops);
`} />
        <P>
          These are alternative index examples; do not create both automatically without measuring. Some index families have
          build-time requirements or parameters that depend on the data. Benchmark with representative queries, filters, and
          concurrent load. Compare recall against exact search on a manageable sample and monitor index size and maintenance.
        </P>
        <Table
          head={['Approach', 'Strength', 'Cost / concern']}
          rows={[
            ['Exact scan', 'Strong baseline and exact ranking', 'Work grows with the number of vectors'],
            ['HNSW', 'Graph-based search can offer strong recall/latency trade-offs', 'Memory and index-build/maintenance costs'],
            ['IVFFlat', 'Partitioned search can be compact and configurable', 'Needs representative data and query-time tuning'],
          ]}
          caption="These are conceptual trade-offs. Measure on your own data and deployment."
        />
        <Callout type="warning">
          An ANN index may return different candidates than an exact scan. Do not trade away access filters or acceptable recall
          for speed without evaluating the impact on the user experience.
        </Callout>
      </Part>

      <Part n={5} label="Filters" title="Metadata Is Part of Search Quality and Security">
        <P>
          Filters can constrain results by track, language, publication state, tenant, document type, or date. Apply them using
          trusted application context, not a filter expression generated unchecked by a model. Highly selective filters can
          change index behaviour and result quality; test them with the actual distribution. If the database cannot apply a
          security predicate efficiently, choose an architecture that does not expose unauthorized text to the model.
        </P>
        <Code file="scoped_query.sql" lang="sql" code={`
SELECT id, content
FROM document_chunks
WHERE tenant_id = :authenticated_tenant_id
  AND visibility = 'published'
  AND track = :allowed_track
ORDER BY embedding <=> :query_embedding
LIMIT :top_k;
`} />
        <P>
          <code>authenticated_tenant_id</code> must come from verified server-side identity. Test data isolation, deletion, and
          permission revocation in the retrieval layer, not only in the user interface. Keep document IDs stable so deletion
          requests can remove both source text and corresponding vectors from every index or cache.
        </P>
        <Callout type="example">
          For a course assistant, constrain search to published lessons in the current track. Draft content and staff notes
          should not become retrievable merely because they share similar wording with a learner&apos;s question.
        </Callout>
      </Part>

      <Part n={6} label="Hybrid search" title="Combine Semantic and Lexical Retrieval">
        <P>
          Vector similarity is good at semantic paraphrase; lexical search is useful for exact identifiers, product names,
          error codes and uncommon terms. Hybrid retrieval combines both candidate sets, then merges or reranks them. A
          weighted score is one simple approach, but raw lexical and vector scores may have different scales. Reciprocal rank
          fusion combines rankings without requiring their scores to be directly comparable.
        </P>
        <Code file="rank_fusion.py" code={`
def reciprocal_rank_fusion(result_lists, constant: int = 60):
    scores = {}
    for results in result_lists:
        for rank, item in enumerate(results, start=1):
            key = item["id"]
            scores[key] = scores.get(key, 0.0) + 1 / (constant + rank)
    return sorted(scores.items(), key=lambda pair: pair[1], reverse=True)

# result_lists can contain a vector ranking and a lexical/BM25 ranking.
`} />
        <P>
          This small function demonstrates ranking fusion, not a full search engine. Deduplicate by stable chunk ID, preserve
          source metadata, and evaluate retrieval using queries that include exact identifiers as well as paraphrases. A reranker
          can reorder a small combined candidate list, but adds latency and cost and still needs evaluation.
        </P>
        <Steps items={[
          'Retrieve candidates using both vector similarity and lexical search.',
          'Apply permission and metadata filters before results are merged.',
          'Merge candidate rankings with a tested fusion or reranking strategy.',
          'Return a small, diverse set with source IDs and citation metadata.',
          'Evaluate recall, ranking quality, latency and cost on representative queries.',
        ]} />
      </Part>

      <Part n={7} label="Choose and operate" title="Know What Each Tool Owns">
        <P>
          Chroma and Qdrant provide purpose-built vector storage and filtering capabilities; managed services such as Pinecone
          provide a hosted operational model; FAISS is a library for similarity search rather than a complete multi-user
          database service. pgvector is attractive when PostgreSQL is already part of the application and relational joins
          matter. Compare persistence, backups, tenant isolation, metadata filters, hybrid search, index controls, regional
          availability, and operational cost using your requirements.
        </P>
        <P>
          Regardless of store, manage an ingestion lifecycle: idempotent upserts, model/schema versioning, retries, stale
          chunk cleanup, backup and restore, and a deletion path for source changes. Monitor query latency, empty-result rate,
          index errors, filter selectivity, and retrieval quality. Review provider documentation for current product features
          rather than relying on a feature list that may have changed.
        </P>
        <Code file="store_interface.py" code={`
from typing import Protocol

class VectorStore(Protocol):
    def upsert(self, *, id: str, vector: list[float], metadata: dict) -> None: ...
    def search(self, *, vector: list[float], limit: int, filters: dict) -> list[dict]: ...
    def delete(self, *, ids: list[str]) -> None: ...

# Keep the rest of the application independent of a single vendor SDK.
`} />
        <P>
          An application-owned interface makes it possible to test retrieval and swap a backend without rewriting every caller.
          Do not hide important differences behind a lowest-common-denominator API: expose capabilities and document behavior
          where filters, hybrid search, or index operations vary.
        </P>
      </Part>

      <Part n={8} label="Pitfalls" title="Common Vector-Database Mistakes">
        <Mistakes items={[
          { mistake: 'Choose a store before measuring the workload', cause: 'A benchmark may not reflect your filters, update pattern, scale or team operations.', fix: 'Start with requirements and compare candidates using representative queries and deployment constraints.' },
          { mistake: 'Build an ANN index and assume it is exact', cause: 'Approximate search can omit relevant neighbours and index defaults vary.', fix: 'Compare recall and latency against exact search and tune with an evaluation set.' },
          { mistake: 'Trust a client-provided tenant filter', cause: 'Users can alter requests and retrieve another tenant’s documents.', fix: 'Derive tenant identity from authenticated server context and enforce it in every query.' },
          { mistake: 'Forget source updates and deletions', cause: 'Stale vectors can continue exposing content that changed or should be removed.', fix: 'Track chunk-to-source relationships and make reindexing and deletion part of ingestion operations.' },
        ]} />
      </Part>

      <Part n={9} label="Practice" title="Build a Filtered pgvector Search Prototype">
        <Practice
          title="Compare exact and approximate retrieval with access controls"
          tasks={[
            'Create a local test schema with a vector dimension taken from your chosen embedding model; do not use the three-dimensional illustrative schema as production configuration.',
            'Insert a small synthetic dataset with stable IDs, source IDs, model keys, tracks and tenant metadata.',
            'Write a parameterized cosine-distance query and verify that the tenant filter comes from authenticated server context.',
            'Compare exact results with an ANN index on a representative query set and record recall, latency and index-size trade-offs.',
            'Add a lexical candidate list and merge rankings with reciprocal rank fusion; include exact error-code and semantic-paraphrase queries.',
            'Test updating and deleting a source document so no stale chunk remains searchable.',
          ]}
          hint="Begin small and measurable. Index parameters and extension capabilities depend on the installed database version and data distribution."
        />
      </Part>

      <KeyTakeaways items={[
        'A vector database stores embeddings with metadata needed for filtering, citations, updates and deletion.',
        'pgvector combines vector search with PostgreSQL SQL; bind parameters and enforce tenant access in every query.',
        'HNSW and IVFFlat are ANN index families that trade exactness, memory, build work and latency differently.',
        'Chroma, Qdrant, managed vector services and FAISS have different operational responsibilities; compare against requirements.',
        'Hybrid retrieval combines semantic and lexical strengths, with rank fusion or reranking evaluated on real queries.',
        'Version embedding models, monitor retrieval quality, and make source updates and deletions part of the ingestion lifecycle.',
      ]} />
      <H3>Next</H3>
      <NextLesson
        href="/learn/generative-ai/llm-evaluation"
        label="Lesson 07 · Evaluating LLM Apps — Eval Sets, LLM-as-Judge and RAG Metrics"
        text="Your retrieval pipeline can now return filtered candidates. Next, build evaluation sets and measure whether the whole LLM feature works reliably."
      />
    </LearnLayout>
  )
}
