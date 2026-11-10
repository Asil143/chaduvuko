import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

function Code({ title, children }: { title: string; children: string }) {
  return <div style={{ margin: '20px 0', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}><div style={{ padding: '8px 14px', background: 'var(--surface)', color: 'var(--muted)', font: '12px var(--font-mono)' }}>{title} · C</div><pre style={{ margin: 0, padding: 18, overflowX: 'auto', background: '#0d0d0d', color: '#e0e0e0', font: '13px/1.7 var(--font-mono)' }}><code>{children}</code></pre></div>
}

const pStyle = { color: 'var(--text)', fontSize: 15, lineHeight: 1.85, marginBottom: 14 }
const hStyle = { color: 'var(--text)', fontSize: 22, fontWeight: 800, marginTop: 36, marginBottom: 12, fontFamily: 'var(--font-display)' }

export default function TwoPointersSlidingWindowPage() {
  return <LearnLayout title="Two Pointers and Sliding Window" description="Use monotone indices and maintained window state to replace many quadratic scans with linear passes." section="DSA — Lesson 25" readTime="90 min">
    <Callout type="info"><strong>Prerequisites:</strong> arrays and strings (Lessons 3–4), complexity analysis (Lesson 2), and basic loops. The code uses C arrays and indices.</Callout>
    <h2 style={hStyle}>What you will learn</h2>
    <p style={pStyle}>By the end, you can recognise when two indices can eliminate repeated work, state the invariant that makes pointer movement safe, and distinguish a fixed-size window from a variable-size window. We will build from sorted pair search to a maximum-sum window and then a minimum-length positive-sum window.</p>
    <Callout type="tip">The Interview Problem-Solving Patterns unit already collects interview prompts and dry runs. This lesson teaches the underlying techniques; continue with <Link href="/learn/dsa/interview-patterns" style={{ color: 'var(--green)' }}>Interview Problem-Solving Patterns →</Link> for practice sets instead of repeating them here.</Callout>

    <h2 style={hStyle}>1. Two pointers: preserve an invariant</h2>
    <p style={pStyle}>Two pointers are two indices that move through a sequence according to a rule. The useful question is not simply “can I use two indices?” but “what fact lets me discard all candidates between or beyond them?” A sorted array gives that fact: if the smallest remaining value plus the largest is too small, pairing the smallest with anything else cannot reach the target, so the left index can advance.</p>
    <Code title="Pair sum in a sorted array">{`#include <stdbool.h>

bool has_pair_sum(const int values[], int n, int target) {
    int left = 0;
    int right = n - 1;
    while (left < right) {
        long long sum = (long long)values[left] + values[right];
        if (sum == target) return true;
        if (sum < target) left++;
        else right--;
    }
    return false;
}`}</Code>
    <p style={pStyle}>For values <code>[1, 2, 4, 6, 10]</code> and target 8, the first sum is 11, so discard 10. The next is 7, so discard 1. Then 2 + 6 is 8. Each move rules out at least one endpoint, so the scan is O(n) time and O(1) extra space. The cast widens the addition before it happens, guarding against overflow when two <code>int</code> values are added.</p>

    <h2 style={hStyle}>2. Opposite-direction and same-direction pointers</h2>
    <p style={pStyle}>Opposite-direction pointers often start at both ends: palindrome checks, reversing in place, or two-sum on sorted data. Same-direction pointers include slow/fast scans and the left/right boundaries of a window. Pointer names should describe their role, not just their speed: <code>left</code> is the start of the active range and <code>right</code> is the newly included element.</p>
    <Code title="Palindrome check for a plain byte string">{`#include <stdbool.h>
#include <string.h>

bool is_palindrome(const char text[]) {
    size_t left = 0;
    size_t right = strlen(text);
    if (right == 0) return true;
    right--;
    while (left < right) {
        if (text[left] != text[right]) return false;
        left++;
        right--;
    }
    return true;
}`}</Code>
    <p style={pStyle}>This example compares bytes exactly; it does not ignore spaces, punctuation, or letter case. That is a deliberate contract. “Palindrome” requirements vary, so normalisation (lowercasing, filtering characters, or Unicode handling) must be specified and performed separately when required. For empty input, returning true is consistent with the usual definition that no pair contradicts the palindrome property.</p>

    <h2 style={hStyle}>3. Sliding windows: a range with maintained state</h2>
    <p style={pStyle}>A sliding window is a contiguous range <code>[left, right]</code>. Instead of recomputing a property for every range, add the new right element and remove elements from the left as the rule requires. For a fixed window of size k, each shift removes one value and adds one. The total work after initialization is O(n), not O(nk).</p>
    <Code title="Maximum sum of a fixed-size window">{`#include <stdbool.h>
#include <stddef.h>

bool max_window_sum(const int values[], int n, int k, long long *answer) {
    if (answer == NULL || k <= 0 || k > n) return false;
    long long window_sum = 0;
    for (int i = 0; i < k; i++) window_sum += values[i];
    *answer = window_sum;
    for (int right = k; right < n; right++) {
        window_sum += values[right];
        window_sum -= values[right - k];
        if (window_sum > *answer) *answer = window_sum;
    }
    return true;
}`}</Code>
    <p style={pStyle}>The invariant is that immediately before evaluating a candidate, <code>window_sum</code> equals the sum of exactly k elements ending at <code>right</code>. Using <code>long long</code> for the running total avoids assuming that many valid <code>int</code> values still fit in an <code>int</code> sum. For k equal to n, the initialization is the only candidate; for k outside 1…n, the function reports invalid input.</p>

    <h2 style={hStyle}>4. Variable windows and the condition that matters</h2>
    <p style={pStyle}>A variable window grows by advancing <code>right</code> and shrinks by advancing <code>left</code>. The common minimum-length-subarray pattern is correct when values are non-negative (strictly positive is a common simpler contract). Adding a new value can only increase the sum, and removing a value can only decrease it. That monotonicity means shrinking after the sum reaches the target cannot hide a shorter valid window.</p>
    <Code title="Shortest subarray with sum at least target (positive values)">{`#include <stdbool.h>
#include <limits.h>
#include <stddef.h>

bool min_length_at_least(const int values[], int n, long long target, int *length_out) {
    if (target <= 0 || length_out == NULL) return false;
    int left = 0;
    int best = INT_MAX;
    long long sum = 0;
    for (int right = 0; right < n; right++) {
        sum += values[right];
        while (sum >= target) {
            int length = right - left + 1;
            if (length < best) best = length;
            sum -= values[left++];
        }
    }
    if (best == INT_MAX) return false;
    *length_out = best;
    return true;
}`}</Code>
    <p style={pStyle}>Both indices only move forward. Although there is a nested <code>while</code>, each element enters once and leaves at most once, so total work is O(n). This API requires a positive target and a non-null output pointer. Negative values break the monotonicity: removing a negative number can increase a sum. For arbitrary signed values, use a different technique such as prefix sums with a monotonic deque; do not apply this window rule blindly.</p>

    <h2 style={hStyle}>5. Choose the pattern from the input constraints</h2>
    <div style={{ overflowX: 'auto', margin: '18px 0' }}><table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text)', fontSize: 14 }}><thead><tr>{['Signal', 'Technique', 'Invariant / requirement', 'Typical cost'].map(x => <th key={x} style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid var(--border)' }}>{x}</th>)}</tr></thead><tbody>{[
      ['Sorted input; pair from both ends', 'Opposite pointers', 'Every move rules out candidates using sorted order', 'O(n), O(1) extra'],
      ['Contiguous range of exactly k', 'Fixed window', 'State describes the current k values', 'O(n), O(1) extra'],
      ['Longest/shortest range with monotone constraint', 'Variable window', 'Expanding and shrinking changes validity predictably', 'Usually O(n), O(1) or O(k)'],
      ['Need all pairs without sorted order', 'Hashing or sort + pointers', 'Choose based on output, duplicates, and mutation rules', 'Often O(n) or O(n log n)'],
    ].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ padding: 10, borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{cell}</td>)}</tr>)}</tbody></table></div>
    <Callout type="example">For a delivery app, “largest number of orders in any 15-minute interval” is a fixed-window count if events are bucketed uniformly. “Shortest contiguous period reaching a cumulative target” is a variable window only if the increments are non-negative. State the modelling assumption before choosing the algorithm.</Callout>

    <h2 style={hStyle}>6. Common mistakes</h2>
    <ul style={{ ...pStyle, paddingLeft: 22 }}>
      <li><strong>Using two pointers on unsorted data:</strong> pointer moves may discard valid answers. Sort only if reordering is allowed, or retain original indices; otherwise choose hashing or another method.</li>
      <li><strong>Updating the answer before the window is valid:</strong> first establish the invariant and verify the constraints at each point where the result is recorded.</li>
      <li><strong>Applying positive-window logic to negative values:</strong> the expand/shrink monotonicity disappears. Use prefix sums or another suitable structure.</li>
      <li><strong>Off-by-one boundaries:</strong> decide whether your range is inclusive or half-open. Here it is inclusive, so length is <code>right - left + 1</code>; empty input needs separate handling.</li>
    </ul>

    <h2 style={hStyle}>7. Practice</h2>
    <ol style={{ ...pStyle, paddingLeft: 22 }}>
      <li>Return the pair of indices (not values) for a sorted array. Explain how duplicate values affect whether there may be multiple answers.</li>
      <li>Given a string, determine whether it is a palindrome after ignoring ASCII whitespace and case. Separate normalisation from the two-pointer scan.</li>
      <li>Find the average of every contiguous window of size k in one pass. What is the running sum invariant?</li>
      <li>Find the longest substring with at most two distinct characters. Describe the frequency-map state and when to shrink.</li>
      <li>Test the minimum-length positive-window function with an impossible target, one element, target met exactly, and an invalid negative value.</li>
    </ol>
    <p style={pStyle}><strong>Review checklist:</strong> Can you state why a pointer move is safe? Does every index advance only O(n) times? Are duplicates, empty input, overflow, and negative values covered by the problem contract?</p>
    <KeyTakeaways items={['Two pointers work because an invariant makes discarded candidates impossible.', 'A sliding window tracks a contiguous range and updates its state incrementally.', 'Fixed-size windows add one item and remove one item per step.', 'Variable windows need monotonicity; negative values often invalidate the simple shrink rule.', 'Inclusive window length is right − left + 1; boundary contracts must be explicit.', 'The Interview Problem-Solving Patterns unit provides separate interview drills for these techniques.']} />
    <h2 style={hStyle}>Next</h2>
    <p style={pStyle}>Continue to binary-level operations, or revisit the sequence if you want to strengthen your range-query structures.</p>
    <p><Link href="/learn/dsa/bit-manipulation" style={{ color: 'var(--green)' }}>Lesson 26 · Bit Manipulation →</Link></p>
  </LearnLayout>
}
