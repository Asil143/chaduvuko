import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

function Code({ title, children }: { title: string; children: string }) { return <div style={{ margin: '20px 0', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}><div style={{ padding: '8px 14px', background: 'var(--surface)', color: 'var(--muted)', font: '12px var(--font-mono)' }}>{title} · C</div><pre style={{ margin: 0, padding: 18, overflowX: 'auto', background: '#0d0d0d', color: '#e0e0e0', font: '13px/1.7 var(--font-mono)' }}><code>{children}</code></pre></div> }
const p = { color: 'var(--text)', fontSize: 15, lineHeight: 1.85, marginBottom: 14 }
const h = { color: 'var(--text)', fontSize: 22, fontWeight: 800, marginTop: 36, marginBottom: 12, fontFamily: 'var(--font-display)' }

export default function BitManipulationPage() {
  return <LearnLayout title="Bit Manipulation" description="Use binary representations and bitwise operators for masks, flags, and compact state." section="DSA — Lesson 26" readTime="75 min">
    <Callout type="info"><strong>Prerequisites:</strong> integer types, arrays, loops, and basic binary place values. Examples use C’s <code>uint32_t</code> from <code>stdint.h</code>; this makes the width explicit and avoids many surprises from signed shifts.</Callout>
    <h2 style={h}>Objectives: represent and update compact flags</h2>
    <p style={p}>A bit is a binary digit, either zero or one. In an unsigned integer, bitwise operations act independently on corresponding bit positions. Bitmasks are useful for compact flags, small sets of options, subset enumeration, and state compression. They are not automatically faster or clearer than an array or set—use them when the finite domain and width make the representation appropriate.</p>
    <Callout type="tip">The Interview Problem-Solving Patterns unit already covers common interview prompts. This lesson builds the underlying operator model; use <Link href="/learn/dsa/interview-patterns" style={{ color: 'var(--green)' }}>Interview Problem-Solving Patterns →</Link> for separate pattern practice.</Callout>

    <h2 style={h}>1. Binary place values and core operators</h2>
    <p style={p}>For an unsigned value, bit position 0 is the least significant bit and has value 2⁰; position 1 has value 2¹, and so on. AND (<code>&amp;</code>) keeps a bit only when both inputs have it set. OR (<code>|</code>) sets a bit when either input has it set. XOR (<code>^</code>) sets a bit when the inputs differ. NOT (<code>~</code>) flips every bit in the integer type’s width, so it is often best used with an explicit mask.</p>
    <div style={{ overflowX: 'auto', margin: '18px 0' }}><table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text)', fontSize: 14 }}><thead><tr>{['Operator', 'Meaning', 'Common use'].map(x => <th key={x} style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid var(--border)' }}>{x}</th>)}</tr></thead><tbody>{[
      ['a & b', 'Set only where both bits are 1', 'Test selected bits or keep a mask'],
      ['a | b', 'Set where either bit is 1', 'Set one or more flags'],
      ['a ^ b', 'Set where bits differ', 'Toggle a bit; parity/XOR reductions'],
      ['a << k', 'Shift bits left by k positions', 'Form a bit mask or scale unsigned values'],
      ['a >> k', 'Shift bits right by k positions', 'Inspect lower/higher portions of unsigned values'],
    ].map(row => <tr key={row[0]}>{row.map(cell => <td key={cell} style={{ padding: 10, borderBottom: '1px solid var(--border)', lineHeight: 1.6 }}>{cell}</td>)}</tr>)}</tbody></table></div>

    <h2 style={h}>2. Set, clear, toggle, and test one bit</h2>
    <p style={p}>Build a one-bit mask by shifting the unsigned value 1 to the desired position. OR sets that bit; AND with the complement clears it; XOR toggles it. AND with the mask tests whether it is set. The caller must guarantee that the bit index is in the valid range 0 through 31.</p>
    <Code title="Small, explicit bit operations">{`#include <stdbool.h>
#include <stdint.h>

uint32_t set_bit(uint32_t value, unsigned bit) {
    return value | (UINT32_C(1) << bit);
}

uint32_t clear_bit(uint32_t value, unsigned bit) {
    return value & ~(UINT32_C(1) << bit);
}

uint32_t toggle_bit(uint32_t value, unsigned bit) {
    return value ^ (UINT32_C(1) << bit);
}

bool is_bit_set(uint32_t value, unsigned bit) {
    return (value & (UINT32_C(1) << bit)) != 0;
}`}</Code>
    <p style={p}>For production interfaces, validate <code>bit &lt; 32</code> before shifting. In C, shifting by a count greater than or equal to the operand width is undefined behavior. Use unsigned fixed-width values for masks; right-shifting a negative signed integer can be implementation-defined, and left-shifting signed values can overflow with undefined behavior.</p>

    <h2 style={h}>3. Masks as small sets</h2>
    <p style={p}>When there are at most 32 distinct options, bit i can represent whether option i is present. A subset can be inserted or removed with the same set/clear operations. To check whether all required flags are set, compare <code>(mask & required) == required</code>; to check whether any are set, compare the result to zero. This representation makes union and intersection direct, but it does not preserve order or repeated items.</p>
    <Code title="Subset checks and a single-occurrence XOR reduction">{`#include <stdbool.h>
#include <stdint.h>

bool contains_all(uint32_t flags, uint32_t required) {
    return (flags & required) == required;
}

bool contains_any(uint32_t flags, uint32_t choices) {
    return (flags & choices) != 0;
}

uint32_t find_unique_value(const uint32_t values[], int n) {
    uint32_t answer = 0;
    for (int i = 0; i < n; i++) answer ^= values[i];
    return answer;
}`}</Code>
    <p style={p}>The XOR reduction returns the unique value only under a precise contract: exactly one unsigned value appears once and every other value appears exactly twice; XOR is bitwise, so cancellation is exact. It does not solve the same task when duplicates appear arbitrary numbers of times. For sets with a larger or dynamic universe, use an appropriate set or bitset abstraction rather than overflowing this fixed-width mask.</p>

    <h2 style={h}>4. Count set bits and test powers of two</h2>
    <p style={p}>Kernighan’s identity clears the lowest set bit each iteration: for nonzero unsigned x, <code>x &amp; (x − 1)</code> is x with its least significant 1 removed. Therefore the loop count equals the number of set bits, also called the population count. A nonzero power of two has exactly one set bit; this identity gives a compact test.</p>
    <Code title="Population count and power-of-two check">{`#include <stdbool.h>
#include <stdint.h>

unsigned count_set_bits(uint32_t value) {
    unsigned count = 0;
    while (value != 0) {
        value &= value - 1;
        count++;
    }
    return count;
}

bool is_power_of_two(uint32_t value) {
    return value != 0 && (value & (value - 1)) == 0;
}`}</Code>
    <p style={p}>The count runs in O(number of set bits), at most 32 iterations for a 32-bit value. Some platforms provide hardware-backed population-count instructions or compiler/library helpers; use a portable interface appropriate for the project instead of assuming a non-standard builtin exists.</p>

    <h2 style={h}>5. Enumerate subsets with a bitmask</h2>
    <p style={p}>For n options, each integer mask from zero through 2ⁿ−1 represents one subset. If bit i is set, item i is included. This technique is useful for exhaustive search when n is deliberately small; the number of subsets doubles each time n increases by one, so it does not make an exponential problem scalable by itself. Keep the number of bits within the mask width.</p>
    <Code title="Iterate subsets for at most 20 options">{`#include <stdint.h>
#include <stdio.h>

void print_subsets(const int items[], unsigned n) {
    if (n > 20) return; /* keep exhaustive work bounded */
    uint32_t limit = UINT32_C(1) << n;
    for (uint32_t mask = 0; mask < limit; mask++) {
        printf("{");
        for (unsigned i = 0; i < n; i++)
            if ((mask & (UINT32_C(1) << i)) != 0) printf(" %d", items[i]);
        printf(" }\n");
    }
}`}</Code>
    <p style={p}>The guard makes both the shift and the amount of work explicit. This example uses a smaller limit than the full type width because generating millions of subsets quickly becomes impractical. Empty mask zero represents the empty subset; the final mask has every option present.</p>

<h2 style={h}>6. Precedence and signedness deserve attention</h2>
    <p style={p}>Parenthesize bitwise expressions even when operator precedence is known. In C, equality operators bind more tightly than bitwise AND, so <code>value &amp; mask == mask</code> is parsed differently from the intended all-bits test. Write <code>(value &amp; mask) == mask</code>. Also prefer explicit unsigned constants and types; integer promotions can make small integer operands behave as <code>int</code>.</p>
    <p style={p}>For a collection of named flags, declare the position and construct masks once instead of scattering numeric literals. Keep unrelated flag groups separate, define which bits may be set, and mask off reserved bits when importing a value from a file or network packet. This makes changes easier to review and prevents an unknown flag from silently changing behavior.</p>
    <Callout type="example">For feature flags in a compact configuration, define a named mask for each feature and use helper functions that validate indices. That is clearer and safer than scattering raw shifts such as <code>1 &lt;&lt; 17</code> throughout application code.</Callout>

    <h2 style={h}>7. Common mistakes</h2>
    <ul style={{ ...p, paddingLeft: 22 }}><li><strong>Shifting a signed 1:</strong> high-bit shifts can overflow or be undefined. Use a fixed-width unsigned value and a valid shift count.</li><li><strong>Forgetting to parenthesize a test:</strong> equality binds tighter than bitwise AND in C; write <code>(x &amp; mask) != 0</code>.</li><li><strong>Assuming NOT flips only meaningful flags:</strong> <code>~mask</code> flips every bit in the type. AND with an explicit allowed-bits mask when needed.</li><li><strong>Using a bitmask for an unbounded set:</strong> a fixed-width integer has a strict limit and no duplicate/order semantics.</li></ul>

    <h2 style={h}>8. Practice</h2>
    <ol style={{ ...p, paddingLeft: 22 }}><li>Implement a helper that toggles a validated flag and returns an error for an index outside 0…31.</li><li>Given two permission masks, determine whether the user has every required permission and whether any optional permission is granted.</li><li>Count set bits using the simple shift-and-test loop; compare its iteration count to Kernighan’s method for sparse and dense inputs.</li><li>Enumerate all subsets of a collection of n ≤ 20 items using a mask. Explain the time and memory growth.</li><li>Prove why XOR cancels paired values, then construct a counterexample when one duplicate occurs three times.</li></ol>
    <KeyTakeaways items={['Bitwise operators work on individual positions of integer representations.', 'A mask lets an unsigned integer represent a fixed set of flags.', 'Set, clear, toggle, and test use OR, AND, XOR, and AND respectively.', 'Validate shift width and use explicit unsigned types to avoid undefined behavior.', 'Parenthesize expressions because C operator precedence can change their meaning.', 'Bitmasks are effective only when the domain fits and their semantics stay clear.']} />
    <h2 style={h}>Next</h2><p style={p}>Move from compact state to range queries with dedicated tree structures.</p><p><Link href="/learn/dsa/advanced" style={{ color: 'var(--green)' }}>Lesson 27 · Advanced Topics →</Link></p>
  </LearnLayout>
}
