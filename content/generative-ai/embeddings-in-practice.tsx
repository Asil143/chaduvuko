import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout, Code, H3, KeyTakeaways, Mistakes, NextLesson, P, Part, Practice, Steps, Table } from '@/components/content/LessonKit'

export default function EmbeddingsInPractice() {
  return (
    <LearnLayout
      title="Embeddings in Practice — Chunking and Similarity Search"
      description="Generate embeddings, choose a chunking strategy, and run cosine-similarity search over your own documents."
      section="Generative AI & LLM Engineering — Lesson 06"
      readTime="30 min"
    >
      <Part n={1} label="Concept" title="An Embedding Maps Meaning to a Vector">
        <P>
          An embedding model maps text into a numeric vector. Text with related meaning may land near one another in the
          embedding space, which makes semantic search possible: a learner can search &quot;my payment is stuck&quot; and find a
          help article titled &quot;Pending UPI transactions&quot; even when the words differ. The vector is a representation for
          retrieval, not a human-readable explanation or a truth score.
        </P>
        <P>
          Similarity depends on the embedding model and its training. Use a compatible model for documents and queries, and
          check the provider guidance for normalization and dimensions. Never compare vectors produced by unrelated models as
          though their coordinates had the same meaning.
        </P>
        <Table
          head={['Step', 'Input / output', 'Decision to make']}
          rows={[
            ['Prepare', 'Source documents → clean text', 'Which content is current, allowed and searchable?'],
            ['Chunk', 'Text → small overlapping passages', 'How much context should each result contain?'],
            ['Embed', 'Passage text → vector', 'Which configured model and batching limits?'],
            ['Retrieve', 'Question vector → nearest chunks', 'Which similarity, filters and top-k?'],
          ]}
        />
        <Callout type="info">
          An embedding can encode sensitive text just as the original passage does. Apply data minimization, access controls,
          retention limits and deletion handling to both text and vectors.
        </Callout>
      </Part>

      <Part n={2} label="Prepare" title="Chunk Documents at Meaningful Boundaries">
        <P>
          A vector represents the passage you embed. If a chunk is too large, it may combine unrelated topics; if too small,
          it may lose the context that makes an answer useful. Begin with paragraph or heading boundaries, preserve useful
          titles, and use modest overlap only when a sentence or concept may cross a boundary. Token limits depend on your
          embedding provider and model, so consult its current documentation rather than assuming a universal chunk size.
        </P>
        <Code file="chunk_text.py" code={`
from collections.abc import Iterator


def paragraph_chunks(text: str, max_chars: int = 1200) -> Iterator[str]:
    """A simple baseline that keeps paragraphs together when possible."""
    if max_chars < 1:
        raise ValueError("max_chars must be positive")
    paragraphs = [part.strip() for part in text.split("\\n\\n") if part.strip()]
    current = ""
    for paragraph in paragraphs:
        if current and len(current) + 2 + len(paragraph) > max_chars:
            yield current
            current = ""
        if len(paragraph) > max_chars:
            # Production code should split long paragraphs on sentence/token boundaries.
            if current:
                yield current
                current = ""
            for start in range(0, len(paragraph), max_chars):
                yield paragraph[start:start + max_chars]
        else:
            current = f"{current}\\n\\n{paragraph}" if current else paragraph
    if current:
        yield current
`} />
        <P>
          Character count is only a simple demonstration. Production chunkers should consider tokenizer limits, headings,
          tables, code blocks, document structure, and whether the content can be shown as a coherent excerpt. Store the source
          document ID, version, section, and offsets so a retrieved passage can be cited and refreshed later.
        </P>
        <Callout type="tip">
          Keep metadata with each chunk. If a learner asks about a specific module, a track or lesson filter can improve
          relevance and prevent unrelated content from appearing in the result list.
        </Callout>
      </Part>

      <Part n={3} label="Generate" title="Embed in Batches and Keep an Index">
        <P>
          Embedding calls can be network-bound and quota-limited. Send small batches supported by your provider, retain a stable
          chunk identifier, and persist the embedding model/configuration alongside each vector. If the source text or model
          changes, re-embed the affected records. Do not silently mix vector spaces in one index.
        </P>
        <Code file="embed_batch.py" code={`
from dataclasses import dataclass
from collections.abc import Sequence

@dataclass
class Chunk:
    chunk_id: str
    text: str
    metadata: dict


def embed_chunks(chunks: Sequence[Chunk], *, client, model: str, batch_size: int = 64):
    for start in range(0, len(chunks), batch_size):
        batch = chunks[start:start + batch_size]
        # Implement this adapter using the selected provider's documented SDK.
        response = embedding_adapter.create(
            client=client,
            model=model,
            inputs=[chunk.text for chunk in batch],
        )
        for chunk, vector in zip(batch, response.vectors, strict=True):
            vector_store.upsert(
                id=chunk.chunk_id,
                vector=vector,
                metadata={**chunk.metadata, "embedding_model": model},
            )
`} />
        <P>
          <code>embedding_adapter</code> is intentionally provider-neutral: SDK method names and batching limits vary. Keep
          credentials server-side, obey request and token limits, and implement bounded retry handling for transient errors.
          Use a stable content hash to skip unchanged chunks, but do not expose that hash as an access-control mechanism.
        </P>
        <Steps items={[
          'Normalize and version source text while preserving its attribution and permissions.',
          'Chunk by document structure and record chunk IDs, source IDs, headings and offsets.',
          'Request vectors in supported batches using one configured embedding model.',
          'Persist vectors, metadata, model identity and an index version atomically where possible.',
          'Re-embed on source or model changes and remove deleted or unauthorized content from the index.',
        ]} />
      </Part>

      <Part n={4} label="Similarity" title="Compute Cosine Similarity with NumPy">
        <P>
          Cosine similarity compares the angle between two vectors. A score closer to one means the vectors point in a more
          similar direction; the useful score distribution depends on the embedding model and dataset. Normalize vectors or
          divide by their norms in the formula, and handle zero vectors explicitly.
        </P>
        <Code file="cosine_search.py" code={`
import numpy as np


def cosine_similarity(query: np.ndarray, matrix: np.ndarray) -> np.ndarray:
    query_norm = np.linalg.norm(query)
    row_norms = np.linalg.norm(matrix, axis=1)
    if query_norm == 0 or np.any(row_norms == 0):
        raise ValueError("cosine similarity is undefined for zero vectors")
    return (matrix @ query) / (row_norms * query_norm)

# Demonstration vectors only. Replace these with vectors from one embedding model.
query = np.array([0.8, 0.2, 0.1], dtype=np.float32)
documents = np.array([
    [0.7, 0.3, 0.1],
    [0.1, 0.8, 0.4],
    [0.6, 0.2, 0.2],
], dtype=np.float32)
scores = cosine_similarity(query, documents)
for index in np.argsort(scores)[::-1]:
    print(index, float(scores[index]))
`} />
        <P>
          This brute-force matrix comparison is a useful baseline for a small collection and for validating a future index.
          It costs work proportional to the number of vectors, so large corpora use a vector database or an approximate nearest
          neighbour index. Measure recall and latency against this exact baseline before choosing index settings.
        </P>
        <Callout type="example">
          Searching course material can return a Python lesson for &quot;how do I repeat an operation for each row?&quot; even if
          the lesson uses the word &quot;loop&quot; rather than the phrase in the question. Retrieval still needs filters and
          evaluation to keep the result relevant.
        </Callout>
      </Part>

      <Part n={5} label="Retrieve" title="Embed the Query and Return Useful Context">
        <P>
          At query time, embed the question with the same model family and compatible settings used for the indexed chunks.
          Retrieve more candidates than you will finally show, apply access and metadata filters, then select a small number of
          useful passages. Include source titles and citation metadata in the context passed to a generation step so the answer
          can point back to evidence.
        </P>
        <Code file="retrieve.py" code={`
def retrieve(question: str, *, user, index, embed_query, top_k: int = 5):
    query_vector = embed_query(question)
    candidates = index.search(
        vector=query_vector,
        limit=top_k,
        filters={"visibility": "published", "track": "generative-ai"},
    )
    # Apply user- and document-level access checks before constructing context.
    allowed = [item for item in candidates if can_read(user, item.metadata)]
    return [
        {
            "text": item.text,
            "source": item.metadata["source_title"],
            "chunk_id": item.id,
            "score": item.score,
        }
        for item in allowed
    ]
`} />
        <P>
          Do access filtering as part of retrieval whenever the store supports a secure metadata predicate, and still enforce
          it in application logic where appropriate. Filtering after retrieving an unbounded set may be inefficient; returning
          a forbidden passage to a prompt is a data leak even if the final answer is hidden from the user.
        </P>
        <Table
          head={['Choice', 'Trade-off to test']}
          rows={[
            ['Chunk length', 'Context completeness versus topical focus'],
            ['Overlap', 'Boundary continuity versus duplicate results and index size'],
            ['Top-k', 'Evidence coverage versus prompt size and irrelevant passages'],
            ['Metadata filters', 'Precision and access safety versus fewer candidates'],
          ]}
        />
      </Part>

      <Part n={6} label="Quality" title="Inspect Retrieval Before Tuning Generation">
        <P>
          If an answer is wrong, first inspect which chunks were retrieved. Keep a small evaluation set of realistic questions
          with expected source documents and measure whether the right evidence appears near the top. Review failures caused by
          stale content, bad chunk boundaries, missing metadata, vocabulary mismatch, or access filters. Only after retrieval
          is sound should you change the answer prompt or model.
        </P>
        <Code file="inspect_results.py" code={`
def inspect_query(question, results):
    print("QUESTION:", question)
    for rank, item in enumerate(results, start=1):
        print(f"\\n{rank}. score={item['score']:.3f} source={item['source']}")
        print(item["text"][:400])

# Add representative queries and have a reviewer compare these results to expected sources.
`} />
        <P>
          Similarity scores are not probabilities of correctness. A score threshold that works for one domain or model may not
          work for another. Use a validation set and look at ranking and answer quality together. Track changes to the embedding
          model, chunker, and index configuration so retrieval regressions can be reproduced.
        </P>
        <Callout type="warning">
          Re-embedding with a new model creates a new vector space. Do not query old vectors with a new model and assume nearest
          neighbours remain meaningful; migrate and validate the index as a coordinated change.
        </Callout>
      </Part>

      <Part n={7} label="Pitfalls" title="Common Embedding Mistakes">
        <Mistakes items={[
          { mistake: 'Treat an embedding as a summary or factual answer', cause: 'A vector is a numeric representation used for similarity, not explanatory text.', fix: 'Retrieve source passages and let downstream logic or generation use the evidence.' },
          { mistake: 'Embed an entire long document as one vector', cause: 'Unrelated topics blur together and the best passage may not match the query.', fix: 'Chunk by structure, preserve metadata, and evaluate chunk boundaries.' },
          { mistake: 'Mix vectors from different embedding models', cause: 'Coordinates from distinct models do not necessarily share a vector space.', fix: 'Store model identity and re-index when changing embedding models.' },
          { mistake: 'Use a high similarity score as proof of relevance', cause: 'Score scale and ranking quality vary by model and corpus.', fix: 'Evaluate against real queries, inspect results and tune with measured evidence.' },
        ]} />
      </Part>

      <Part n={8} label="Practice" title="Create a Mini Course Search Index">
        <Practice
          title="Build and inspect a small semantic retrieval pipeline"
          tasks={[
            'Choose a few public or synthetic course paragraphs, add a title and source ID, then create chunks that preserve heading context.',
            'Use one configured embedding provider to create vectors in batches; store the model identifier with each chunk.',
            'Implement cosine similarity in NumPy and rank a small set of vectors, including a test for a zero vector.',
            'Try a question that uses different words from the source and inspect the top results and metadata.',
            'Add a track filter and a user access check; verify an unauthorized chunk never enters the prompt context.',
            'Write three retrieval evaluation questions with expected source IDs and record where chunking or ranking fails.',
          ]}
          hint="Keep a brute-force exact search for the small demo. It gives you a reference when you later add an approximate index."
        />
      </Part>

      <KeyTakeaways items={[
        'Embeddings are numeric representations that make semantic similarity search possible; they are not answers or truth scores.',
        'Use compatible embedding models for query and document vectors and record the model identity.',
        'Chunk by structure, preserve source metadata and batch embedding requests within provider limits.',
        'Cosine similarity is a useful baseline; brute-force search does not scale to every corpus.',
        'Apply access controls and metadata filters before retrieved text reaches a model.',
        'Evaluate retrieval with representative queries and inspect evidence before tuning generation.',
      ]} />
      <H3>Next</H3>
      <NextLesson
        href="/learn/generative-ai/vector-databases"
        label="Lesson 07 · Vector Databases — pgvector, Chroma, Pinecone and FAISS"
        text="You can embed and rank a small collection. Next, move storage and nearest-neighbour search into vector database systems."
      />
    </LearnLayout>
  )
}
