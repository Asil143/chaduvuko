'use client'
import React from 'react'
import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import Link from 'next/link'

const CodeBlock = ({ code, language = 'c' }: { code: string; language?: string }) => {
  const [copied, setCopied] = React.useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  const renderCode = (raw: string) => {
    return raw.split('\n').map((line, i) => {
      const slashIdx = line.indexOf('//')
      const blockStart = line.indexOf('/*')
      const blockEnd = line.indexOf('*/')
      if (slashIdx !== -1) {
        return (
          <div key={i}>
            <span>{line.slice(0, slashIdx)}</span>
            <span style={{ color: '#6a9955', fontStyle: 'italic' }}>{line.slice(slashIdx)}</span>
          </div>
        )
      }
      if (blockStart !== -1 && blockEnd !== -1) {
        return (
          <div key={i}>
            <span>{line.slice(0, blockStart)}</span>
            <span style={{ color: '#6a9955', fontStyle: 'italic' }}>{line.slice(blockStart, blockEnd + 2)}</span>
            <span>{line.slice(blockEnd + 2)}</span>
          </div>
        )
      }
      return <div key={i}>{line || ' '}</div>
    })
  }
  return (
    <div style={{ background: '#0d0d0d', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', margin: '20px 0' }}>
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginLeft: 6 }}>{language}</span>
        </div>
        <button onClick={handleCopy} style={{ background: copied ? 'rgba(0,230,118,0.15)' : 'var(--bg2)', border: `1px solid ${copied ? 'rgba(0,230,118,0.4)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 12px', fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600, color: copied ? 'var(--green)' : 'var(--muted)', cursor: 'pointer', transition: 'all 0.2s' }}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre style={{ margin: 0, padding: '20px 24px', overflowX: 'auto', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.75, color: '#e0e0e0' }}>
        <code>{renderCode(code)}</code>
      </pre>
    </div>
  )
}

const SectionTag = ({ text }: { text: string }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
    // {text}
  </div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, letterSpacing: '-1px', color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
    {children}
  </h2>
)

const Divider = () => (
  <div style={{ height: 1, background: 'var(--border)', margin: '48px 0' }} />
)

const ComplexityBadge = ({ value, color }: { value: string; color: string }) => (
  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color, background: `${color}15`, border: `1px solid ${color}33`, borderRadius: 6, padding: '3px 10px' }}>
    {value}
  </span>
)

const ProblemHeader = ({ num, title, complexity, color = '#facc15' }: { num: string; title: string; complexity: string; color?: string }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 0, marginTop: 32 }}>
    <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '12px 20px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--green)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 4, padding: '2px 8px' }}>{num}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{title}</span>
      <ComplexityBadge value={complexity} color={color} />
    </div>
  </div>
)

export default function StringsPage() {
  return (
    <LearnLayout
      title="Unit 03 — Strings"
      description="Text is just an array of characters. Learn how computers store words, how to manipulate them in C, and solve the classic string problems that appear in every interview."
      section="DSA"
      readTime="60 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 03', green: true },
          { label: 'Prerequisite: Unit 02 — Arrays', green: false },
          { label: '60 min read', green: false },
        ].map((b) => (
          <span key={b.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600, color: b.green ? 'var(--green)' : 'var(--muted)', background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)', border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px' }}>
            {b.label}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Every piece of text your program ever handles — a name, a password, an email address,
        a sentence — is a string. And a string is nothing more than an array of characters
        sitting in memory, one after another, with a special signal at the end that says "stop here."
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85 }}>
        Because you already understand arrays from Unit 02, strings will feel natural.
        We just need to learn a few new rules — especially that special signal at the end —
        and then practise the classic problems that show up in almost every coding interview.
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — WHAT IS A STRING
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>What is a String?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        In C, a string is an array of <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>char</code> values
        — where each character is stored as a number according to the ASCII table.
        The letter <strong style={{ color: 'var(--green)' }}>'A'</strong> is stored as 65.
        <strong style={{ color: 'var(--green)' }}> 'a'</strong> is 97.
        <strong style={{ color: 'var(--green)' }}> '0'</strong> is 48.
        Your computer never stores letters — only numbers.
      </p>

      {/* ASCII visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // The string "HELLO" in memory — what C actually stores
        </div>
        <div style={{ display: 'flex', gap: 0, minWidth: 420 }}>
          {[
            { char: 'H', ascii: '72', idx: 0 },
            { char: 'E', ascii: '69', idx: 1 },
            { char: 'L', ascii: '76', idx: 2 },
            { char: 'L', ascii: '76', idx: 3 },
            { char: 'O', ascii: '79', idx: 4 },
            { char: '\\0', ascii: '0', idx: 5, special: true },
          ].map((cell, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', borderRight: i < 5 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ padding: '14px 4px', background: cell.special ? 'rgba(255,71,87,0.08)' : 'rgba(0,230,118,0.06)', border: `1px solid ${cell.special ? 'rgba(255,71,87,0.3)' : 'rgba(0,230,118,0.2)'}`, borderRight: 'none', fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 800, color: cell.special ? '#ff4757' : 'var(--green)' }}>
                {cell.char}
              </div>
              <div style={{ fontSize: 10, color: '#4285f4', marginTop: 6, fontFamily: 'var(--font-mono)' }}>{cell.ascii}</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>[{cell.idx}]</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 12, height: 12, background: 'rgba(0,230,118,0.3)', borderRadius: 2 }} />
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>visible characters</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 12, height: 12, background: 'rgba(255,71,87,0.3)', borderRadius: 2 }} />
            <span style={{ fontSize: 12, color: '#ff4757' }}>null terminator \0 — marks end of string</span>
          </div>
        </div>
      </div>

      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 12 }}>
        The Null Terminator — the most important rule in C strings
      </h3>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Every string in C ends with a special character called the <strong style={{ color: 'var(--green)' }}>null terminator</strong>,
        written as <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>'\0'</code>.
        Its ASCII value is 0. It is not a space — it is a completely invisible marker that tells
        every string function "the string ends here, stop reading."
      </p>

      <Callout type="warning">
        <strong>Critical rule:</strong> When you declare a char array to hold a string of n characters,
        you must declare it with size n+1 — the extra slot is for the null terminator.
        A string "HELLO" has 5 characters but needs a char array of size 6.
        Forgetting this causes some of the nastiest bugs in C.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 2 — STRINGS IN C
      ══════════════════════════════════════ */}
      <SectionTag text="Section 2" />
      <SectionTitle>Strings in C — Declaration and Input</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Let us see how to create, read, and print strings in C — with every detail explained.
      </p>

      <CodeBlock code={`#include <stdio.h>

int main() {
    /* Method 1: initialise directly — \0 added automatically */
    char name[6] = "HELLO";  /* size 6 = 5 chars + 1 for \\0 */

    /* Method 2: character by character — must add \\0 yourself */
    char city[7];
    city[0] = 'M';
    city[1] = 'U';
    city[2] = 'M';
    city[3] = 'B';
    city[4] = 'A';
    city[5] = 'I';
    city[6] = '\\0';  /* MUST add this — or the string has no end */

    /* Method 3: let C count the size */
    char lang[] = "Python";  /* compiler sets size to 7 automatically */

    printf("Name: %s\\n", name);    /* %s prints a string */
    printf("City: %s\\n", city);
    printf("Lang: %s\\n", lang);

    return 0;
}`} />

      <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 12, marginTop: 32 }}>
        Reading a string from the user
      </h3>

      <CodeBlock code={`#include <stdio.h>

int main() {
    char name[50];  /* enough space for the input */

    printf("Enter your name: ");
    scanf("%s", name);  /* no & needed — array name IS already an address */

    printf("Hello, %s!\\n", name);

    return 0;
}`} />

      <Callout type="warning">
        <strong>Important:</strong> <code style={{ fontFamily: 'var(--font-mono)' }}>scanf("%s")</code> stops reading at a space.
        So "Asil Khan" would only store "Asil". To read a full line including spaces, use{' '}
        <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>fgets(name, 50, stdin)</code> instead.
        We will use this in the examples below.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 3 — STRING FUNCTIONS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 3" />
      <SectionTitle>Built-in String Functions in C</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        C gives you a library called <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>string.h</code> with
        ready-made functions for common string operations. You include it the same way as stdio.h.
        Knowing these saves you from writing everything from scratch.
      </p>

      {/* Functions table */}
      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Function', 'What it does', 'Example', 'Returns'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['strlen(s)', 'Count characters (not including \\0)', 'strlen("HELLO")', '5'],
              ['strcpy(dest, src)', 'Copy src into dest', 'strcpy(a, "Hi")', 'void'],
              ['strcat(dest, src)', 'Append src to end of dest', 'strcat(a, " World")', 'void'],
              ['strcmp(s1, s2)', 'Compare two strings', 'strcmp("abc", "abc")', '0 if equal'],
              ['strchr(s, c)', 'Find first occurrence of char c', 'strchr("hello", \'l\')', 'pointer or NULL'],
              ['strstr(s1, s2)', 'Find s2 inside s1', 'strstr("hello world", "world")', 'pointer or NULL'],
              ['strupr(s)', 'Convert to uppercase', 'strupr("hello")', '"HELLO"'],
              ['strlwr(s)', 'Convert to lowercase', 'strlwr("HELLO")', '"hello"'],
            ].map(([fn, desc, ex, ret], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 700, whiteSpace: 'nowrap' }}>{fn}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)' }}>{desc}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{ex}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: '#4285f4', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{ret}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <string.h>  /* required for all string functions */

int main() {
    char s1[20] = "Hello";
    char s2[] = " World";

    printf("Length: %lu\\n", strlen(s1));    /* Length: 5 */

    strcat(s1, s2);                          /* s1 becomes "Hello World" */
    printf("After strcat: %s\\n", s1);

    printf("Compare: %d\\n", strcmp("abc", "abc"));  /* 0 — equal */
    printf("Compare: %d\\n", strcmp("abc", "abd"));  /* negative — abc comes before abd */

    return 0;
}`} />

      <Callout type="info">
        <strong>strcmp returns:</strong> 0 if both strings are identical,
        a negative number if s1 comes before s2 alphabetically,
        and a positive number if s1 comes after s2.
        Never use == to compare strings in C — it compares addresses, not content.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 4 — TRAVERSING A STRING
      ══════════════════════════════════════ */}
      <SectionTag text="Section 4" />
      <SectionTitle>Traversing a String — Character by Character</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Since a string is an array, you can loop through it just like any array.
        The trick is knowing when to stop — and the answer is the null terminator.
        When you hit <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontSize: 14 }}>'\0'</code>, you stop.
      </p>

      <CodeBlock code={`#include <stdio.h>

int main() {
    char str[] = "Chaduvuko";
    int i = 0;

    /* Method 1: use strlen to get the count */
    for (i = 0; str[i] != '\\0'; i++) {  /* stop when you hit the null terminator */
        printf("%c ", str[i]);
    }
    printf("\\n");
    /* Output: C h a d u v u k o */

    /* Method 2: count uppercase and lowercase letters */
    int upper = 0, lower = 0;
    for (i = 0; str[i] != '\\0'; i++) {
        if (str[i] >= 'A' && str[i] <= 'Z') {
            upper++;  /* ASCII range for uppercase: 65 to 90 */
        } else if (str[i] >= 'a' && str[i] <= 'z') {
            lower++;  /* ASCII range for lowercase: 97 to 122 */
        }
    }
    printf("Uppercase: %d, Lowercase: %d\\n", upper, lower);
    /* Output: Uppercase: 1, Lowercase: 8 */

    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 5 — CLASSIC PROBLEMS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 5" />
      <SectionTitle>Classic String Problems — With Full Solutions</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 8 }}>
        These are the exact problems that appear in every beginner and intermediate
        coding interview. Understand the logic — not just the code.
      </p>

      {/* Problem 1 — Reverse a string */}
      <ProblemHeader num="Problem 01" title="Reverse a String" complexity="O(n)" />
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '14px 20px', marginBottom: 0 }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>
          Same two-pointer technique as reversing an array from Unit 02. One pointer at the
          start, one at the end — swap and move inward until they meet.
        </p>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <string.h>

void reverseString(char str[]) {
    int left = 0;
    int right = strlen(str) - 1;  /* index of last character (before \\0) */
    char temp;

    while (left < right) {
        temp = str[left];          /* swap characters */
        str[left] = str[right];
        str[right] = temp;
        left++;
        right--;
    }
}

int main() {
    char str[] = "Chaduvuko";
    printf("Before: %s\\n", str);  /* Chaduvuko */

    reverseString(str);

    printf("After:  %s\\n", str);  /* okuvadhC */
    return 0;
}`} />

      {/* Problem 2 — Palindrome */}
      <ProblemHeader num="Problem 02" title="Check if a String is a Palindrome" complexity="O(n)" />
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '14px 20px' }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>
          A palindrome reads the same forwards and backwards — "madam", "racecar", "level".
          Compare characters from both ends — if any pair doesn't match, it's not a palindrome.
        </p>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <string.h>

int isPalindrome(char str[]) {
    int left = 0;
    int right = strlen(str) - 1;

    while (left < right) {
        if (str[left] != str[right]) {
            return 0;  /* mismatch found — not a palindrome */
        }
        left++;
        right--;
    }
    return 1;  /* all pairs matched — it is a palindrome */
}

int main() {
    char s1[] = "madam";
    char s2[] = "hello";

    if (isPalindrome(s1)) {
        printf("%s is a palindrome\\n", s1);      /* madam is a palindrome */
    }
    if (!isPalindrome(s2)) {
        printf("%s is NOT a palindrome\\n", s2);  /* hello is NOT a palindrome */
    }
    return 0;
}`} />

      {/* Problem 3 — Count vowels and consonants */}
      <ProblemHeader num="Problem 03" title="Count Vowels and Consonants" complexity="O(n)" />
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '14px 20px' }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>
          Walk through each character. If it is a, e, i, o, u (uppercase or lowercase) it
          is a vowel. If it is any other letter it is a consonant. Spaces and digits are neither.
        </p>
      </div>

      <CodeBlock code={`#include <stdio.h>

int main() {
    char str[] = "Chaduvuko Platform";
    int vowels = 0, consonants = 0;
    int i;

    for (i = 0; str[i] != '\\0'; i++) {
        char c = str[i];

        /* convert to lowercase for easier checking */
        if (c >= 'A' && c <= 'Z') {
            c = c + 32;  /* ASCII trick: 'A'(65) + 32 = 'a'(97) */
        }

        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            vowels++;
        } else if (c >= 'a' && c <= 'z') {
            consonants++;  /* it is a letter but not a vowel */
        }
        /* spaces, digits, symbols — ignored */
    }

    printf("Vowels: %d\\n", vowels);        /* Vowels: 7 */
    printf("Consonants: %d\\n", consonants);  /* Consonants: 10 */
    return 0;
}`} />

      {/* Problem 4 — Anagram check */}
      <ProblemHeader num="Problem 04" title="Check if Two Strings are Anagrams" complexity="O(n)" />
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '14px 20px' }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>
          Two strings are anagrams if they contain the exact same characters in any order.
          "listen" and "silent" are anagrams. The approach: count how many times each letter
          appears in string 1, then subtract for string 2. If all counts reach zero — anagram.
        </p>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <string.h>

int isAnagram(char s1[], char s2[]) {
    /* first check: if lengths differ they cannot be anagrams */
    if (strlen(s1) != strlen(s2)) {
        return 0;
    }

    int freq[26] = {0};  /* one slot for each letter a-z, all start at 0 */
    int i;

    /* count up for every character in s1 */
    for (i = 0; s1[i] != '\\0'; i++) {
        freq[s1[i] - 'a']++;  /* 'a'-'a'=0, 'b'-'a'=1, 'c'-'a'=2 ... */
    }

    /* count down for every character in s2 */
    for (i = 0; s2[i] != '\\0'; i++) {
        freq[s2[i] - 'a']--;
    }

    /* if any count is non-zero, the strings are not anagrams */
    for (i = 0; i < 26; i++) {
        if (freq[i] != 0) {
            return 0;
        }
    }
    return 1;  /* all counts are zero — anagram confirmed */
}

int main() {
    char s1[] = "listen";
    char s2[] = "silent";

    if (isAnagram(s1, s2)) {
        printf("'%s' and '%s' ARE anagrams\\n", s1, s2);  /* ARE anagrams */
    } else {
        printf("NOT anagrams\\n");
    }
    return 0;
}`} />

      <Callout type="tip">
        <strong>The freq[s1[i] - 'a'] trick</strong> is something you will use constantly in string problems.
        Since 'a' = 97 in ASCII, subtracting 'a' from any lowercase letter gives its position:
        'a' - 'a' = 0, 'b' - 'a' = 1, 'z' - 'a' = 25. This maps any letter to an array index cleanly.
      </Callout>

      {/* Problem 5 — Count words */}
      <ProblemHeader num="Problem 05" title="Count Words in a Sentence" complexity="O(n)" />
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '14px 20px' }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>
          A new word starts when you see a non-space character after a space (or at the very beginning).
          Track whether the previous character was a space — that is all you need.
        </p>
      </div>

      <CodeBlock code={`#include <stdio.h>

int countWords(char str[]) {
    int count = 0;
    int inWord = 0;  /* flag: are we currently inside a word? */
    int i;

    for (i = 0; str[i] != '\\0'; i++) {
        if (str[i] != ' ' && inWord == 0) {
            inWord = 1;  /* just entered a new word */
            count++;
        } else if (str[i] == ' ') {
            inWord = 0;  /* just left a word */
        }
    }
    return count;
}

int main() {
    char sentence[] = "Learn DSA on Chaduvuko";
    printf("Word count: %d\\n", countWords(sentence));  /* Word count: 4 */
    return 0;
}`} />

      {/* Problem 6 — Find and replace character */}
      <ProblemHeader num="Problem 06" title="Replace All Occurrences of a Character" complexity="O(n)" />
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTop: 'none', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '14px 20px' }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>
          Walk through the string once. Every time you find the target character, replace it.
          Single pass — O(n).
        </p>
      </div>

      <CodeBlock code={`#include <stdio.h>

void replaceChar(char str[], char find, char replace) {
    int i;
    for (i = 0; str[i] != '\\0'; i++) {
        if (str[i] == find) {
            str[i] = replace;
        }
    }
}

int main() {
    char str[] = "data engineering";
    printf("Before: %s\\n", str);       /* data engineering */

    replaceChar(str, 'a', '@');

    printf("After:  %s\\n", str);       /* d@t@ engineering */
    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 6 — ERRORS YOU WILL HIT
      ══════════════════════════════════════ */}
      <SectionTag text="Errors You Will Hit" />
      <SectionTitle>Real Mistakes — And Exactly How to Fix Them</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 24 }}>
        These are the three string mistakes that trip up almost every C beginner.
        Read them now so you do not waste hours debugging them later.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
        {[
          {
            error: 'Forgetting the null terminator',
            symptom: 'Your string prints garbage characters after the real content — like "hello@#%&"',
            fix: 'Always declare char arrays with size n+1. Always end manually built strings with \'\\0\'.',
            code: `char name[5] = "Hello";   /* WRONG — no room for \\0 */\nchar name[6] = "Hello";   /* CORRECT — 5 chars + 1 for \\0 */`,
          },
          {
            error: 'Using == to compare strings',
            symptom: 'Your if condition always returns false even when strings look identical',
            fix: 'Use strcmp(s1, s2) == 0 to compare. The == operator compares memory addresses, not content.',
            code: `if (s1 == s2) { }           /* WRONG — compares addresses */\nif (strcmp(s1, s2) == 0) { } /* CORRECT — compares content */`,
          },
          {
            error: 'Buffer overflow — writing past the array end',
            symptom: 'Program crashes or corrupts other variables unexpectedly',
            fix: 'Always make sure your destination array is large enough before strcpy or strcat. Check lengths first.',
            code: `char dest[5];\nstrcpy(dest, "Hello World"); /* WRONG — "Hello World" needs 12 bytes */\nchar dest[12];\nstrcpy(dest, "Hello World"); /* CORRECT */`,
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.25)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ background: 'rgba(255,71,87,0.06)', borderBottom: '1px solid rgba(255,71,87,0.15)', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#ff4757' }}>⚠ {item.error}</span>
            </div>
            <div style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 8 }}>
                <strong style={{ color: 'var(--text)' }}>Symptom:</strong> {item.symptom}
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 12 }}>
                <strong style={{ color: 'var(--green)' }}>Fix:</strong> {item.fix}
              </div>
              <div style={{ background: '#0d0d0d', borderRadius: 8, padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#e0e0e0', lineHeight: 1.75, whiteSpace: 'pre' }}>
                {item.code}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 7 — STRINGS VS CHAR ARRAYS
      ══════════════════════════════════════ */}
      <SectionTag text="Section 6" />
      <SectionTitle>Quick Reference — Operations Summary</SectionTitle>

      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Operation', 'Method', 'Time', 'Key point'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Get length', 'strlen(s)', 'O(n)', 'Walks to \\0 — not O(1)'],
              ['Copy string', 'strcpy(dest, src)', 'O(n)', 'dest must be large enough'],
              ['Concatenate', 'strcat(dest, src)', 'O(n)', 'dest must have room for both'],
              ['Compare', 'strcmp(s1, s2)', 'O(n)', 'Returns 0 if equal'],
              ['Reverse', 'Two pointer swap', 'O(n)', 'Works in-place, O(1) space'],
              ['Palindrome check', 'Two pointer compare', 'O(n)', 'Stop at first mismatch'],
              ['Anagram check', 'Frequency array', 'O(n)', '26-slot int array for a–z'],
              ['Traverse', 'Loop until \\0', 'O(n)', 'Use != \'\\0\' as stop condition'],
            ].map(([op, method, time, note], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontWeight: 600 }}>{op}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>{method}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: '#facc15', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{time}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontSize: 12 }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          WHAT'S NEXT
      ══════════════════════════════════════ */}
      <SectionTag text="What's Next" />
      <SectionTitle>You Are Ready for Unit 04</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now understand strings fully — how they sit in memory, how to manipulate them,
        and how to solve the classic problems. You have also seen the frequency array trick
        which appears constantly in string, array, and hashing problems.
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 04 we tackle <strong style={{ color: 'var(--text)' }}>Pointers</strong> — the concept
        that confuses most beginners but is the backbone of everything advanced in C.
        You have already seen pointers briefly with the <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>&</code> in
        scanf and with array names being addresses. Now we make it all explicit and clear.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 12, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>UP NEXT → UNIT 04</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Pointers — The Concept That Changes Everything</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Memory addresses, & and *, pointer arithmetic — explained simply.</div>
        </div>
        <Link href="/learn/dsa/pointers" style={{ background: 'var(--green)', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Coming Soon →
        </Link>
      </div>

      <KeyTakeaways items={[
        'A string in C is a char array that ends with a null terminator \\0 — without it, the string has no end',
        'Always declare char arrays with size n+1 — the extra slot is for \\0',
        'Use %s to print strings, strlen() to get length, strcpy() to copy, strcat() to join, strcmp() to compare',
        'Never use == to compare strings — use strcmp(s1, s2) == 0',
        'Traverse a string with a loop that stops when it hits \\0, not when it hits a fixed size',
        'The frequency array trick (int freq[26]) is the key to solving anagram, duplicate, and counting problems',
        'The two-pointer technique from arrays works perfectly for reversing strings and palindrome checks',
        'Lowercase letter to array index: use char - \'a\' (e.g. \'c\' - \'a\' = 2)',
      ]} />

    </LearnLayout>
  )
}