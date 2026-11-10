import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

function Code({ title, children }: { title: string; children: string }) { return <div style={{ margin: '20px 0', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}><div style={{ padding: '8px 14px', background: 'var(--surface)', color: 'var(--muted)', font: '12px var(--font-mono)' }}>{title} · C</div><pre style={{ margin: 0, padding: 18, overflowX: 'auto', background: '#0d0d0d', color: '#e0e0e0', font: '13px/1.7 var(--font-mono)' }}><code>{children}</code></pre></div> }
const p = { color: 'var(--text)', fontSize: 15, lineHeight: 1.85, marginBottom: 14 }
const h = { color: 'var(--text)', fontSize: 22, fontWeight: 800, marginTop: 36, marginBottom: 12, fontFamily: 'var(--font-display)' }

export default function TriesPage() {
  return <LearnLayout title="Tries" description="Build prefix trees for dictionary lookup, autocomplete, and prefix queries." section="DSA — Lesson 17" readTime="75 min">
    <Callout type="info"><strong>Prerequisites:</strong> trees, pointers, arrays, and strings. This implementation deliberately supports lowercase English letters <code>a</code>–<code>z</code>; define a different alphabet and input policy for other text.</Callout>
    <h2 style={h}>Objectives: share work between common prefixes</h2>
    <p style={p}>A trie (pronounced “try”) is a rooted tree in which each edge represents one character. A path from the root spells a prefix, and a marker on a node says whether that path is a complete stored word. Words such as <code>car</code>, <code>card</code>, and <code>care</code> reuse their common <code>car</code> path. This makes lookup proportional to query length rather than the number of stored words, at the cost of memory for child links.</p>
    <Callout type="tip">Tries appear in autocomplete, prefix filtering, and dictionary lookups. The recently added <Link href="/learn/dsa/interview-patterns" style={{ color: 'var(--green)' }}>Interview Problem-Solving Patterns →</Link> unit covers interview-style application and dry runs; this lesson focuses on the structure and its operations.</Callout>

    <h2 style={h}>1. Node model and representation trade-offs</h2>
    <p style={p}>For a fixed alphabet of 26 lowercase letters, each node can hold 26 child pointers and a Boolean terminal flag. The edge for letter c is stored at index c−'a'. A terminal flag is necessary because both <code>car</code> and <code>card</code> can exist: the node for <code>car</code> is a word and also has a child. Without the flag, a prefix and a complete key become indistinguishable.</p>
    <Code title="Trie node, initialization, and validated index">{`#include <stdbool.h>
#include <stdlib.h>

#define ALPHABET 26

typedef struct TrieNode {
    struct TrieNode *child[ALPHABET];
    bool is_word;
} TrieNode;

TrieNode *trie_node_create(void) {
    return calloc(1, sizeof(TrieNode));
}

int letter_index(char ch) {
    if (ch < 'a' || ch > 'z') return -1;
    return ch - 'a';
}`}</Code>
    <p style={p}>Zero-initializing with <code>calloc</code> sets children to null and <code>is_word</code> to false. An array representation is fast and simple, but every node reserves space for all 26 links even if it has one child. A map or sorted edge list saves memory for sparse nodes, but adds lookup overhead. Choose from expected alphabet size, word count, and memory constraints.</p>

    <h2 style={h}>2. Insert a word</h2>
    <p style={p}>Start at the root and follow or create one edge per character. Mark the final node as a word. Inserting a word that is already present is idempotent: it ends by setting a flag that is already true. Empty strings can be represented by marking the root itself terminal, if the application allows them.</p>
    <Code title="Insert lowercase words; failure leaves a valid partial trie">{`bool trie_insert(TrieNode *root, const char *word) {
    if (root == NULL || word == NULL) return false;
    TrieNode *node = root;
    for (size_t i = 0; word[i] != '\\0'; i++) {
        int index = letter_index(word[i]);
        if (index < 0) return false;
        if (node->child[index] == NULL) {
            node->child[index] = trie_node_create();
            if (node->child[index] == NULL) return false;
        }
        node = node->child[index];
    }
    node->is_word = true;
    return true;
}`}</Code>
    <p style={p}>If allocation fails after part of a path is created, the trie remains structurally valid but may contain nonterminal prefix nodes. Retrying insertion can complete it. If atomic insertion is required, allocate the missing path separately and attach it only after every allocation succeeds. The exact memory-failure guarantee belongs in the API contract.</p>

    <h2 style={h}>3. Search words and prefixes</h2>
    <p style={p}>A word search must reach the final node and see <code>is_word</code>. A prefix search only needs to reach the final node, even if it is not terminal. This difference is a frequent source of errors. For example, after inserting <code>card</code>, the query <code>car</code> is a valid prefix, but it is a stored word only if it was inserted separately.</p>
    <Code title="Exact lookup and prefix lookup">{`TrieNode *trie_walk(TrieNode *root, const char *text) {
    if (root == NULL || text == NULL) return NULL;
    TrieNode *node = root;
    for (size_t i = 0; text[i] != '\\0'; i++) {
        int index = letter_index(text[i]);
        if (index < 0 || node->child[index] == NULL) return NULL;
        node = node->child[index];
    }
    return node;
}

bool trie_contains(TrieNode *root, const char *word) {
    TrieNode *node = trie_walk(root, word);
    return node != NULL && node->is_word;
}

bool trie_has_prefix(TrieNode *root, const char *prefix) {
    return trie_walk(root, prefix) != NULL;
}`}</Code>
    <p style={p}>Both lookup operations take O(L) time for a query of length L. They do not scan every stored word. This complexity assumes indexing into a child array is O(1); map-based children may have different costs. An empty prefix reaches the root, so it is present whenever the root exists, even when no words are stored.</p>

    <h2 style={h}>4. Autocomplete and delete semantics</h2>
    <p style={p}>Autocomplete first walks to the prefix node, then performs a DFS below it, adding characters to a working buffer and emitting words when a terminal node is reached. To cap results at k, stop after k matches; to return results in alphabetical order, visit child indices from 0 to 25. Listing all matches necessarily costs at least the number of characters emitted. Deletion clears the terminal flag; it should prune a node only if it is nonterminal and has no children, otherwise another word still depends on that path.</p>
    <div style={{ overflowX: 'auto', margin: '18px 0' }}><table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text)', fontSize: 14 }}><thead><tr>{['Operation', 'Work', 'Important condition'].map(x => <th key={x} style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid var(--border)' }}>{x}</th>)}</tr></thead><tbody>{[
      ['Insert / exact search', 'O(L)', 'Every character must fit the chosen alphabet'],
      ['Prefix lookup', 'O(L)', 'The path may exist without being a complete word'],
      ['Enumerate suggestions', 'O(L + output size)', 'Bound results to control latency and memory'],
      ['Space', 'O(total nodes × alphabet)', 'Array child pointers may be wasteful for sparse tries'],
    ].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ padding: 10, borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{cell}</td>)}</tr>)}</tbody></table></div>
    <Callout type="example">A delivery app can use a trie to suggest neighbourhoods as someone types. Real systems also need ranking, locale-aware text normalization, result limits, and protection against very long or adversarial inputs; the bare trie solves prefix retrieval, not those product concerns.</Callout>

    <h2 style={h}>5. Free every allocated node</h2>
    <p style={p}>Each created node owns all descendants reachable from it. A postorder traversal frees children before the parent. Call it once on the root when the complete dictionary is no longer needed; never free a child separately and then traverse it again from the root.</p>
    <Code title="Postorder destruction">{`void trie_destroy(TrieNode *node) {
    if (node == NULL) return;
    for (int i = 0; i < ALPHABET; i++)
        trie_destroy(node->child[i]);
    free(node);
}`}</Code>
    <p style={p}>The recursive version is clear for ordinary word depths. If inputs can contain extremely long strings, recursion depth itself becomes a resource concern; use an explicit stack or a bounded input policy. In a long-running service, also consider whether the entire vocabulary fits in memory and how updates are published safely to readers.</p>

    <h2 style={h}>6. Capacity planning and text policy</h2>
    <p style={p}>A trie’s node count depends on the number of distinct prefixes, not simply the number of words. If a million words share a long prefix, that prefix is stored once; if the words diverge immediately, many branches are needed. A fixed child array allocates 26 pointers for every node, including leaves. For a large dictionary, measure node count and memory before choosing this representation, and consider a compact edge vector, radix/compressed trie, or memory-mapped static index.</p>
    <p style={p}>Text policy is part of correctness. This lesson treats input as lowercase single-byte English letters. To support case-insensitive search, normalize before insertion and lookup using the same rules. To support Unicode, code points or grapheme clusters need a deliberate encoding and normalization strategy; a byte-by-byte trie can split a multibyte character and does not automatically implement human-language prefix semantics.</p>
    <Callout type="warning">Limit word length and request size in services that accept user input. A logically correct trie can still use unbounded memory or recursion depth when an attacker supplies extremely long strings.</Callout>

<h2 style={h}>7. Common mistakes</h2>
    <ul style={{ ...p, paddingLeft: 22 }}><li><strong>Confusing a prefix with a stored key:</strong> exact search checks the terminal marker; prefix search does not.</li><li><strong>Forgetting to validate characters:</strong> indexing <code>ch - 'a'</code> without checking bounds can read or write outside the child array.</li><li><strong>Assuming tries are always smaller or faster:</strong> a dense child array can consume far more memory than the raw words; benchmark the actual alphabet and workload.</li><li><strong>Deleting shared paths:</strong> clear the terminal marker and prune only nodes that have no children and are not another word.</li></ul>

    <h2 style={h}>8. Practice</h2>
    <ol style={{ ...p, paddingLeft: 22 }}><li>Insert <code>car</code>, <code>card</code>, and <code>care</code>. Trace the shared path and answer exact-word and prefix queries.</li><li>Implement a recursive suggestion collector that writes at most k lowercase words into a caller-provided result buffer.</li><li>Implement deletion and explain why deleting <code>car</code> must not erase the path needed by <code>card</code>.</li><li>Extend the input alphabet to digits as well as letters. Update the index function and memory analysis.</li><li>Compare a trie to sorting a word array and binary-searching prefixes. Which workload makes each design attractive?</li></ol>
    <KeyTakeaways items={['A trie stores shared prefixes as shared paths in a rooted tree.', 'A terminal marker distinguishes a complete word from a prefix.', 'Insert and lookup take O(L) time for input length L under fixed-array child access.', 'Alphabet design affects validation, lookup, and memory per node.', 'Autocomplete cost includes enumerating and returning the results.', 'Use the Interview Problem-Solving Patterns unit for separate interview-oriented practice.']} />
    <h2 style={h}>Next</h2><p style={p}>Track connected components efficiently as undirected edges are added.</p><p><Link href="/learn/dsa/union-find" style={{ color: 'var(--green)' }}>Lesson 18 · Union-Find (Disjoint Set Union) →</Link></p>
  </LearnLayout>
}
