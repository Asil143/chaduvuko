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

const ProblemHeader = ({ num, title, time, space }: { num: string; title: string; time: string; space: string }) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginTop: 32, marginBottom: 0 }}>
    <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '14px 20px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--green)', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: 4, padding: '2px 8px' }}>{num}</span>
      <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{title}</span>
      <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
        <ComplexityBadge value={`Time: ${time}`} color="#facc15" />
        <ComplexityBadge value={`Space: ${space}`} color="#4285f4" />
      </div>
    </div>
  </div>
)

/* ── Grid cell for maze/board visuals ── */
const GridCell = ({ value, color, bg, size = 40 }: { value: string; color?: string; bg?: string; size?: number }) => (
  <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: size > 36 ? 14 : 11, fontWeight: 800, color: color || 'var(--text)', background: bg || 'var(--bg2)', border: '1px solid var(--border)', flexShrink: 0 }}>
    {value}
  </div>
)

export default function BacktrackingPage() {
  return (
    <LearnLayout
      title="Unit 18 — Backtracking"
      description="Try a path. Hit a dead end. Undo. Try another. Backtracking is how computers solve puzzles — N-Queens, Sudoku, mazes, and subset problems. Brute force made smart by pruning impossible paths early."
      section="DSA"
      readTime="90 min"
      updatedAt="March 2026"
    >

      {/* ── Badges ── */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'UNIT 18', green: true },
          { label: 'Prerequisite: Unit 08 — Recursion', green: false },
          { label: '90 min read', green: false },
        ].map((b) => (
          <span key={b.label} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: b.green ? 700 : 600, color: b.green ? 'var(--green)' : 'var(--muted)', background: b.green ? 'rgba(0,230,118,0.1)' : 'var(--surface)', border: `1px solid ${b.green ? 'rgba(0,230,118,0.3)' : 'var(--border)'}`, borderRadius: 6, padding: '4px 10px' }}>
            {b.label}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        Some problems cannot be solved by a formula, a greedy choice, or a simple DP table.
        They require exploration — trying combinations until you find one that works.
        Backtracking is the systematic way to do this exploration without wasting effort
        on paths that are guaranteed to fail.
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85 }}>
        Think of it as navigating a maze. You walk forward until you hit a wall,
        then step back and try a different direction. You keep doing this until you
        either find the exit or prove there is no way through. Backtracking is
        exactly this — recursion plus an undo step.
      </p>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 1 — WHAT IS BACKTRACKING
      ══════════════════════════════════════ */}
      <SectionTag text="Section 1" />
      <SectionTitle>What is Backtracking?</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Backtracking is a recursive algorithm that builds a solution incrementally,
        one step at a time. At each step it tries all possible choices.
        If a choice leads to a valid partial solution it continues.
        If it leads to a dead end — a point where no valid completion exists —
        it <strong style={{ color: 'var(--green)' }}>undoes that choice</strong> (backtracks)
        and tries the next alternative.
      </p>

      {/* The three phases */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {[
          { phase: 'Choose', icon: '✅', desc: 'Pick a candidate for the current position. Add it to your partial solution.', color: 'var(--green)' },
          { phase: 'Explore', icon: '🔍', desc: 'Recurse — try to build the rest of the solution on top of this choice.', color: '#4285f4' },
          { phase: 'Unchoose', icon: '↩️', desc: 'If the recursion fails (dead end), remove your choice. The state goes back to what it was before. Then try the next candidate.', color: '#f97316' },
        ].map((item) => (
          <div key={item.phase} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'var(--surface)', border: `1px solid ${item.color}33`, borderRadius: 10, padding: '16px 20px' }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: item.color, fontFamily: 'var(--font-display)', marginBottom: 4 }}>{item.phase}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Backtracking template */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
          Universal backtracking template — every backtracking problem follows this skeleton:
        </div>
        <CodeBlock code={`void backtrack(state, choices[]) {
    if (is_solution(state)) {
        record or print the solution;
        return;
    }

    for each choice in choices[] {
        if (is_valid(state, choice)) {
            make(choice);         /* add choice to state */
            backtrack(state, remaining_choices);
            undo(choice);         /* remove choice from state */
        }
    }
}`} />
        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
          The <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>undo(choice)</code> step
          is what makes it backtracking — not just recursion. Without undo,
          choices accumulate and corrupt future attempts. With undo, the state
          is always clean when you try the next option.
        </div>
      </div>

      <Callout type="info">
        <strong>Backtracking vs Brute Force:</strong> Pure brute force tries every possible
        combination regardless of validity. Backtracking prunes — it stops exploring a path
        the moment it becomes impossible. This pruning is called a
        <strong> constraint check</strong> and is what makes backtracking practical
        where brute force would be impossibly slow.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          PROBLEM 1 — N-QUEENS
      ══════════════════════════════════════ */}
      <SectionTag text="Problem 1" />

      <ProblemHeader num="Problem 01" title="N-Queens — Place N Queens With No Attacks" time="O(N!)" space="O(N)" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>
          Place N chess queens on an N×N board such that no two queens attack each other.
          Two queens attack if they share the same row, column, or diagonal.
          For N=4 there are 2 solutions. For N=8 there are 92 solutions.
          This is the most famous backtracking problem in computer science.
        </p>
      </div>

      {/* N=4 solution visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // One valid solution for N=4 — queens at columns [1,3,0,2]
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Board */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 44px)', gap: 0 }}>
              {[
                [0,1,0,0],
                [0,0,0,1],
                [1,0,0,0],
                [0,0,1,0],
              ].map((row, ri) =>
                row.map((cell, ci) => (
                  <div key={`${ri}-${ci}`} style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: cell ? 'rgba(0,230,118,0.15)' : (ri + ci) % 2 === 0 ? 'var(--surface)' : 'var(--bg2)', border: `1px solid ${cell ? 'rgba(0,230,118,0.4)' : 'var(--border)'}`, fontSize: 20 }}>
                    {cell ? '♛' : ''}
                  </div>
                ))
              )}
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 8, fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
              queens at col: [1, 3, 0, 2]
            </div>
          </div>
          {/* Rules */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Constraints checked at each placement:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { rule: 'No two in same column', check: 'col[i] ≠ col[j] for all i≠j' },
                { rule: 'No two in same row', check: 'Only one queen per row (place one per row)' },
                { rule: 'No two on same diagonal ↘', check: '|row_i - row_j| ≠ |col_i - col_j|' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', marginBottom: 3 }}>✓ {item.rule}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{item.check}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Backtracking trace for N=4 */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
          // Partial trace — placing queens row by row for N=4
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 2.2 }}>
          Row 0: try col 0 → place queen at (0,0)<br />
          {'  '}Row 1: try col 0 → same col → skip<br />
          {'  '}Row 1: try col 1 → diagonal attack → skip<br />
          {'  '}Row 1: try col 2 → place queen at (1,2)<br />
          {'    '}Row 2: all columns blocked → <span style={{ color: '#f97316' }}>BACKTRACK</span><br />
          {'  '}Row 1: try col 3 → place queen at (1,3)<br />
          {'    '}Row 2: try col 1 → place queen at (2,1)<br />
          {'      '}Row 3: try col 0,1,2 blocked → col 3 blocked → <span style={{ color: '#f97316' }}>BACKTRACK</span><br />
          {'    '}Row 2: ... continue until (2,0) → (3,2) → <span style={{ color: 'var(--green)', fontWeight: 700 }}>SOLUTION! [0,3,1,2... wait checking]</span><br />
          {'  '}Eventually finds: cols = [1, 3, 0, 2] ✓
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <stdlib.h>

int N;
int queens[20];  /* queens[row] = column where queen is placed in that row */
int solutions = 0;

/* check if placing a queen at (row, col) is safe */
int isSafe(int row, int col) {
    int i;
    for (i = 0; i < row; i++) {
        /* same column */
        if (queens[i] == col) return 0;

        /* same diagonal — difference in rows equals difference in cols */
        if (abs(queens[i] - col) == abs(i - row)) return 0;
    }
    return 1;  /* safe to place */
}

void printBoard() {
    int r, c;
    printf("Solution %d:\\n", solutions);
    for (r = 0; r < N; r++) {
        for (c = 0; c < N; c++) {
            printf("%s ", queens[r] == c ? "Q" : ".");
        }
        printf("\\n");
    }
    printf("\\n");
}

/* place queens row by row using backtracking */
void solveNQueens(int row) {
    /* base case: all N queens placed successfully */
    if (row == N) {
        solutions++;
        printBoard();
        return;
    }

    int col;
    for (col = 0; col < N; col++) {
        if (isSafe(row, col)) {
            queens[row] = col;       /* CHOOSE: place queen */
            solveNQueens(row + 1);   /* EXPLORE: try next row */
            queens[row] = -1;        /* UNCHOOSE: remove queen (backtrack) */
        }
    }
}

int main() {
    N = 4;
    int i;
    for (i = 0; i < N; i++) queens[i] = -1;

    solveNQueens(0);
    printf("Total solutions for N=%d: %d\\n", N, solutions);  /* 2 */

    /* Try N=8 */
    N = 8; solutions = 0;
    for (i = 0; i < N; i++) queens[i] = -1;
    solveNQueens(0);
    printf("Total solutions for N=%d: %d\\n", N, solutions);  /* 92 */

    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time:</span>
          <ComplexityBadge value="O(N!)" color="#facc15" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(pruning makes it much faster in practice)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Space:</span>
          <ComplexityBadge value="O(N)" color="#4285f4" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(queens array + call stack)</span>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          PROBLEM 2 — RAT IN A MAZE
      ══════════════════════════════════════ */}
      <SectionTag text="Problem 2" />

      <ProblemHeader num="Problem 02" title="Rat in a Maze — Find a Path Through a Grid" time="O(2^(N²))" space="O(N²)" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>
          Given an N×N grid where 1 = open cell and 0 = blocked wall,
          find a path from the top-left corner (0,0) to the bottom-right corner (N-1, N-1).
          The rat can move right or down only. Print the solution path.
          Classic backtracking — try a direction, if blocked backtrack and try another.
        </p>
      </div>

      {/* Maze visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-mono)' }}>
          // 4×4 maze — 1=open, 0=wall. Find path from (0,0) to (3,3)
        </div>
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          {/* Input maze */}
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>Input maze</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 40px)', gap: 2 }}>
              {[
                [1,0,0,0],
                [1,1,0,1],
                [0,1,0,0],
                [1,1,1,1],
              ].map((row, ri) =>
                row.map((cell, ci) => (
                  <GridCell key={`${ri}-${ci}`} value={String(cell)} color={cell ? 'var(--green)' : '#ff4757'} bg={cell ? 'rgba(0,230,118,0.08)' : 'rgba(255,71,87,0.08)'} />
                ))
              )}
            </div>
          </div>
          {/* Solution path */}
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>Solution path (1=visited)</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 40px)', gap: 2 }}>
              {[
                [1,0,0,0],
                [1,1,0,0],
                [0,1,0,0],
                [0,1,1,1],
              ].map((row, ri) =>
                row.map((cell, ci) => (
                  <GridCell key={`${ri}-${ci}`} value={cell ? '✓' : '·'} color={cell ? '#000' : 'var(--border)'} bg={cell ? 'var(--green)' : 'var(--bg2)'} />
                ))
              )}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--green)', marginTop: 14, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
          Path: (0,0) → (1,0) → (1,1) → (2,1) → (3,1) → (3,2) → (3,3) ✓
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

#define N 4

int maze[N][N] = {
    {1, 0, 0, 0},
    {1, 1, 0, 1},
    {0, 1, 0, 0},
    {1, 1, 1, 1}
};

int solution[N][N];  /* stores the path — 1 = part of path */

int isSafeCell(int row, int col) {
    return (row >= 0 && row < N &&
            col >= 0 && col < N &&
            maze[row][col] == 1 &&
            solution[row][col] == 0);  /* not already visited */
}

void printSolution() {
    int i, j;
    for (i = 0; i < N; i++) {
        for (j = 0; j < N; j++) {
            printf("%d ", solution[i][j]);
        }
        printf("\\n");
    }
    printf("\\n");
}

int solveMaze(int row, int col) {
    /* base case: reached destination */
    if (row == N-1 && col == N-1) {
        solution[row][col] = 1;
        return 1;  /* found a path */
    }

    if (isSafeCell(row, col)) {
        solution[row][col] = 1;  /* CHOOSE: mark cell as visited */

        /* EXPLORE: try moving down first */
        if (solveMaze(row + 1, col)) return 1;

        /* EXPLORE: try moving right */
        if (solveMaze(row, col + 1)) return 1;

        /* UNCHOOSE: neither direction worked — backtrack */
        solution[row][col] = 0;
        return 0;
    }

    return 0;  /* this cell is not safe */
}

int main() {
    int i, j;
    for (i = 0; i < N; i++)
        for (j = 0; j < N; j++)
            solution[i][j] = 0;

    if (solveMaze(0, 0)) {
        printf("Path found:\\n");
        printSolution();
    } else {
        printf("No path exists\\n");
    }

    return 0;
}`} />

      <Callout type="tip">
        <strong>Extending to all 4 directions:</strong> The code above only moves right or down.
        To allow all 4 directions (up, down, left, right), add two more recursive calls:
        <code style={{ fontFamily: 'var(--font-mono)' }}> solveMaze(row-1, col)</code> and
        <code style={{ fontFamily: 'var(--font-mono)' }}> solveMaze(row, col-1)</code>.
        The visited check in <code style={{ fontFamily: 'var(--font-mono)' }}>isSafeCell</code> prevents infinite loops.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          PROBLEM 3 — SUDOKU SOLVER
      ══════════════════════════════════════ */}
      <SectionTag text="Problem 3" />

      <ProblemHeader num="Problem 03" title="Sudoku Solver — Fill the Grid" time="O(9^m)" space="O(1)" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>
          Fill a 9×9 grid with digits 1-9 such that every row, every column, and every
          3×3 subgrid contains each digit exactly once. Empty cells are represented by 0.
          m is the number of empty cells. This is the most complex backtracking problem
          we cover — but the code structure is identical to N-Queens.
        </p>
      </div>

      {/* Sudoku visual */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
          // Partial sudoku grid — 0 = empty cell to fill
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 36px)', gap: 1, width: 'fit-content' }}>
          {[
            [5,3,0,0,7,0,0,0,0],
            [6,0,0,1,9,5,0,0,0],
            [0,9,8,0,0,0,0,6,0],
            [8,0,0,0,6,0,0,0,3],
            [4,0,0,8,0,3,0,0,1],
            [7,0,0,0,2,0,0,0,6],
            [0,6,0,0,0,0,2,8,0],
            [0,0,0,4,1,9,0,0,5],
            [0,0,0,0,8,0,0,7,9],
          ].map((row, ri) =>
            row.map((cell, ci) => {
              const isBox = Math.floor(ri/3) * 3 + Math.floor(ci/3)
              const boxColor = isBox % 2 === 0 ? 'rgba(0,230,118,0.04)' : 'var(--bg2)'
              return (
                <div key={`${ri}-${ci}`} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: cell ? 800 : 400, color: cell ? 'var(--text)' : 'var(--green)', background: cell ? boxColor : 'rgba(0,230,118,0.1)', border: `1px solid ${cell ? 'var(--border)' : 'rgba(0,230,118,0.3)'}` }}>
                  {cell || '·'}
                </div>
              )
            })
          )}
        </div>
        <div style={{ fontSize: 12, color: 'var(--green)', marginTop: 12, fontFamily: 'var(--font-mono)' }}>
          Green cells = empty (to be filled by backtracking)
        </div>
      </div>

      <CodeBlock code={`#include <stdio.h>

int board[9][9] = {
    {5,3,0,0,7,0,0,0,0},
    {6,0,0,1,9,5,0,0,0},
    {0,9,8,0,0,0,0,6,0},
    {8,0,0,0,6,0,0,0,3},
    {4,0,0,8,0,3,0,0,1},
    {7,0,0,0,2,0,0,0,6},
    {0,6,0,0,0,0,2,8,0},
    {0,0,0,4,1,9,0,0,5},
    {0,0,0,0,8,0,0,7,9}
};

/* check if placing num at (row, col) is valid */
int isValid(int row, int col, int num) {
    int i, j;

    /* check the row */
    for (i = 0; i < 9; i++) {
        if (board[row][i] == num) return 0;
    }

    /* check the column */
    for (i = 0; i < 9; i++) {
        if (board[i][col] == num) return 0;
    }

    /* check the 3x3 subgrid */
    int startRow = row - row % 3;  /* top-left row of this subgrid */
    int startCol = col - col % 3;  /* top-left col of this subgrid */
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] == num) return 0;
        }
    }

    return 1;  /* valid placement */
}

void printBoard() {
    int i, j;
    for (i = 0; i < 9; i++) {
        if (i % 3 == 0 && i != 0) printf("------+-------+------\\n");
        for (j = 0; j < 9; j++) {
            if (j % 3 == 0 && j != 0) printf("| ");
            printf("%d ", board[i][j]);
        }
        printf("\\n");
    }
}

int solveSudoku() {
    int row, col, num;

    /* find the next empty cell */
    for (row = 0; row < 9; row++) {
        for (col = 0; col < 9; col++) {
            if (board[row][col] == 0) {

                /* try digits 1 to 9 */
                for (num = 1; num <= 9; num++) {
                    if (isValid(row, col, num)) {
                        board[row][col] = num;   /* CHOOSE */

                        if (solveSudoku()) return 1; /* EXPLORE — solved! */

                        board[row][col] = 0;     /* UNCHOOSE — backtrack */
                    }
                }

                return 0; /* no valid digit found — backtrack further */
            }
        }
    }

    return 1;  /* no empty cells left — puzzle solved */
}

int main() {
    printf("Solving sudoku...\\n\\n");

    if (solveSudoku()) {
        printBoard();
    } else {
        printf("No solution exists\\n");
    }

    return 0;
}`} />

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Time:</span>
          <ComplexityBadge value="O(9^m)" color="#facc15" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(m = empty cells, pruning makes it fast)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Space:</span>
          <ComplexityBadge value="O(1)" color="#00e676" />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>(modifies board in-place)</span>
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          PROBLEM 4 — SUBSET SUM
      ══════════════════════════════════════ */}
      <SectionTag text="Problem 4" />

      <ProblemHeader num="Problem 04" title="Subset Sum — Find All Subsets That Sum to Target" time="O(2^n)" space="O(n)" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>
          Given a set of numbers and a target sum, find all subsets that add up to the target.
          Set: {'{'}3, 1, 4, 2{'}'}, Target: 5.
          Valid subsets: {'{'}3,2{'}'} and {'{'}1,4{'}'}.
          This generalises to many real problems — portfolio selection, partition problems,
          resource allocation.
        </p>
      </div>

      <CodeBlock code={`#include <stdio.h>

int arr[] = {3, 1, 4, 2};
int n = 4;
int target = 5;
int subset[10];
int subsetSize = 0;
int solutionsFound = 0;

void printSubset() {
    int i;
    printf("  { ");
    for (i = 0; i < subsetSize; i++) printf("%d ", subset[i]);
    printf("}\\n");
}

void findSubsets(int index, int currentSum) {
    /* base case: found a valid subset */
    if (currentSum == target) {
        solutionsFound++;
        printSubset();
        return;
    }

    /* pruning: sum already exceeds target — stop this path */
    if (currentSum > target || index == n) return;

    /* CHOICE 1: include arr[index] */
    subset[subsetSize++] = arr[index];       /* CHOOSE */
    findSubsets(index + 1, currentSum + arr[index]); /* EXPLORE */
    subsetSize--;                             /* UNCHOOSE */

    /* CHOICE 2: exclude arr[index] */
    findSubsets(index + 1, currentSum);      /* EXPLORE without this element */
}

int main() {
    printf("Subsets of {3,1,4,2} that sum to %d:\\n", target);
    findSubsets(0, 0);
    printf("Total: %d subset(s) found\\n", solutionsFound);
    /* Output:
       { 3 2 }
       { 1 4 }
       Total: 2 subset(s) found
    */
    return 0;
}`} />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>
          The decision tree — at each element, include or exclude:
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', lineHeight: 2.2 }}>
          start(sum=0)<br />
          ├── include 3 (sum=3)<br />
          │   ├── include 1 (sum=4)<br />
          │   │   ├── include 4 (sum=8 {'>'} 5) → <span style={{ color: '#f97316' }}>PRUNE</span><br />
          │   │   └── include 2 (sum=6 {'>'} 5) → <span style={{ color: '#f97316' }}>PRUNE</span><br />
          │   └── exclude 1 (sum=3)<br />
          │{'       '}├── include 4 (sum=7 {'>'} 5) → <span style={{ color: '#f97316' }}>PRUNE</span><br />
          │{'       '}└── include 2 (sum=5) → <span style={{ color: 'var(--green)', fontWeight: 700 }}>FOUND {'{'}3,2{'}'}</span><br />
          └── exclude 3 (sum=0)<br />
          {'    '}├── include 1 (sum=1)<br />
          {'    '}│   ├── include 4 (sum=5) → <span style={{ color: 'var(--green)', fontWeight: 700 }}>FOUND {'{'}1,4{'}'}</span><br />
          {'    '}│   └── ...<br />
          {'    '}└── ...
        </div>
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          PROBLEM 5 — GENERATE ALL PERMUTATIONS
      ══════════════════════════════════════ */}
      <SectionTag text="Problem 5" />

      <ProblemHeader num="Problem 05" title="Generate All Permutations of a String" time="O(n × n!)" space="O(n)" />

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, margin: 0 }}>
          Generate all possible arrangements of characters in a string.
          "ABC" has 6 permutations: ABC, ACB, BAC, BCA, CAB, CBA.
          Used in: password recovery, anagram generation, combinatorics problems.
        </p>
      </div>

      <CodeBlock code={`#include <stdio.h>
#include <string.h>

void swap(char *a, char *b) {
    char t = *a; *a = *b; *b = t;
}

void permutations(char str[], int start, int end) {
    /* base case: single character remaining — print the permutation */
    if (start == end) {
        printf("%s\\n", str);
        return;
    }

    int i;
    for (i = start; i <= end; i++) {
        swap(&str[start], &str[i]);       /* CHOOSE: bring char i to front */
        permutations(str, start + 1, end); /* EXPLORE: permute the rest */
        swap(&str[start], &str[i]);       /* UNCHOOSE: restore original order */
    }
}

int main() {
    char str[] = "ABC";
    int n = strlen(str);

    printf("All permutations of '%s':\\n", str);
    permutations(str, 0, n - 1);
    /* Output:
       ABC  ACB  BAC  BCA  CBA  CAB
    */
    return 0;
}`} />

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 6 — PRUNING
      ══════════════════════════════════════ */}
      <SectionTag text="Section 6" />
      <SectionTitle>Pruning — The Key to Making Backtracking Practical</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 20 }}>
        Without pruning, backtracking is just brute force — trying every possible combination.
        <strong style={{ color: 'var(--green)' }}> Pruning</strong> is when you detect early
        that a partial solution cannot possibly lead to a valid complete solution
        and cut off the entire subtree of possibilities without exploring it.
        Good pruning can reduce an exponential search to something practical.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {[
          {
            problem: 'N-Queens',
            prune: 'If a column, row, or diagonal is already occupied, skip that position entirely — do not recurse',
            savings: 'For N=8: reduces 8⁸ = 16M positions to just 92 solutions explored in thousands of checks',
            color: 'var(--green)',
          },
          {
            problem: 'Subset Sum',
            prune: 'If current sum already exceeds target, stop — adding more positive numbers will never bring it back down',
            savings: 'With sorted input + pruning, eliminates most branches for large inputs',
            color: '#4285f4',
          },
          {
            problem: 'Sudoku',
            prune: 'If a digit already appears in the same row, column, or box — skip it. This eliminates most candidates immediately',
            savings: 'A hard sudoku typically requires only a few hundred recursive calls with pruning vs millions without',
            color: '#7b61ff',
          },
        ].map((item) => (
          <div key={item.problem} style={{ background: 'var(--surface)', border: `1px solid ${item.color}33`, borderRadius: 12, padding: '16px 20px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: item.color, marginBottom: 8 }}>{item.problem}</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75, marginBottom: 6 }}>
              <strong>Prune when:</strong> {item.prune}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--green)' }}>Impact:</strong> {item.savings}
            </div>
          </div>
        ))}
      </div>

      <Callout type="info">
        <strong>The best pruning strategy:</strong> Check constraints as early as possible —
        at the moment you make a choice, before recursing. Never enter a subtree
        that you can already prove is invalid. The earlier you prune, the more
        you save because each pruned node eliminates all its descendants.
      </Callout>

      <Divider />

      {/* ══════════════════════════════════════
          SECTION 7 — COMPARISON TABLE
      ══════════════════════════════════════ */}
      <SectionTag text="Section 7" />
      <SectionTitle>Backtracking vs Other Approaches</SectionTitle>

      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Approach', 'How it works', 'When to use', 'Example'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, background: 'var(--surface)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Greedy', 'Pick best option now, never undo', 'Single optimal choice at each step', 'Activity selection, Huffman'],
              ['DP', 'Store all subproblem answers', 'Overlapping subproblems, optimal value', 'Knapsack, LCS, coin change'],
              ['Backtracking', 'Try all, undo on failure, prune early', 'Constraints, enumerate solutions', 'N-Queens, Sudoku, subsets'],
              ['BFS/DFS', 'Traverse graph systematically', 'Reachability, shortest path', 'Maze, connected components'],
            ].map(([approach, how, when, ex], ri) => (
              <tr key={ri}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--green)', fontWeight: 700 }}>{approach}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontSize: 12 }}>{how}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontSize: 12 }}>{when}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted)', fontSize: 12 }}>{ex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Common errors */}
      <SectionTag text="Errors You Will Hit" />
      <SectionTitle>Common Backtracking Mistakes</SectionTitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {[
          {
            title: 'Forgetting to undo the choice (missing backtrack step)',
            symptom: 'Partial solutions accumulate — later attempts start with corrupted state and produce wrong results',
            fix: 'Every make(choice) must have a corresponding undo(choice) after the recursive call returns. They always come in pairs.',
          },
          {
            title: 'Not checking visited cells in maze/grid problems',
            symptom: 'Infinite recursion — the rat walks in circles forever and the program crashes with stack overflow',
            fix: 'Mark a cell as visited before recursing. Check isSafe includes a visited check. Unmark when backtracking.',
          },
          {
            title: 'Missing pruning — valid check too late',
            symptom: 'Correct results but takes forever — exploring millions of invalid combinations',
            fix: 'Check constraints BEFORE recursing, not after. The constraint check should be the first thing inside the loop — skip the candidate immediately if it violates a rule.',
          },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ background: 'rgba(255,71,87,0.06)', borderBottom: '1px solid rgba(255,71,87,0.15)', padding: '12px 20px' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#ff4757' }}>⚠ {item.title}</span>
            </div>
            <div style={{ padding: '14px 20px' }}>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}><strong style={{ color: 'var(--text)' }}>Symptom:</strong> {item.symptom}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}><strong style={{ color: 'var(--green)' }}>Fix:</strong> {item.fix}</div>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ══════════════════════════════════════
          WHAT'S NEXT
      ══════════════════════════════════════ */}
      <SectionTag text="What's Next" />
      <SectionTitle>You Are Ready for Unit 19</SectionTitle>

      <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.85, marginBottom: 16 }}>
        You now understand backtracking completely — the choose-explore-unchoose pattern,
        five classic problems, pruning strategies, and the mistakes to avoid.
        Backtracking + pruning is how every Sudoku app, chess engine, and
        constraint solver you have ever used works under the hood.
      </p>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 32 }}>
        In Unit 19 — the final unit — we cover
        <strong style={{ color: 'var(--text)' }}> Advanced Topics</strong>: Segment Trees,
        Fenwick Trees (BIT), Tries, Union-Find (DSU), Sliding Window, Two Pointers,
        and Bit Manipulation. These are the techniques that separate good engineers
        from great ones in FAANG and product company interviews.
      </p>

      <div style={{ background: 'linear-gradient(135deg, rgba(0,230,118,0.06) 0%, rgba(0,230,118,0.02) 100%)', border: '1px solid rgba(0,230,118,0.25)', borderRadius: 12, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 700, marginBottom: 6 }}>UP NEXT → UNIT 19</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: 4 }}>Advanced Topics — The Final Level</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Segment Tree, Trie, DSU, Sliding Window, Two Pointers, Bit Manipulation — all in C.</div>
        </div>
        <Link href="/learn/dsa/advanced" style={{ background: 'var(--green)', color: '#000', fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '10px 22px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Coming Soon →
        </Link>
      </div>

      <KeyTakeaways items={[
        'Backtracking = recursion + undo. Try a choice, explore, and if it fails undo that choice and try the next one',
        'Three phases: Choose (make a decision), Explore (recurse with that decision), Unchoose (undo before trying next)',
        'Every make(choice) must be paired with an undo(choice) after the recursive call — always in pairs',
        'N-Queens: place queens row by row, check column and diagonal safety before placing, backtrack when blocked',
        'Rat in a Maze: mark cell visited before recursing, unmark on backtrack, check bounds and walls',
        'Sudoku: find empty cell, try digits 1-9, check row+column+box validity, backtrack when no digit fits',
        'Subset Sum: at each element choose include or exclude, prune when sum exceeds target',
        'Permutations: swap current with each remaining, recurse on rest, swap back to restore',
        'Pruning = detecting impossible paths early and stopping without exploring them — makes backtracking practical',
        'Without pruning = brute force. With pruning = backtracking. The earlier you prune, the more you save',
      ]} />

    </LearnLayout>
  )
}