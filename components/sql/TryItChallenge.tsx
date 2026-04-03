'use client';

import { useState } from 'react';

interface Props {
  question: string;
  hint?: string;
  answer: string;         // The correct SQL query (shown as answer)
  explanation?: string;  // Why this is the right answer
}

export default function TryItChallenge({ question, hint, answer, explanation }: Props) {
  const [hintOpen, setHintOpen]     = useState(false);
  const [answerOpen, setAnswerOpen] = useState(false);
  const [copied, setCopied]         = useState(false);

  const copyAnswer = async () => {
    await navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const SQL_COLOR = '#06b6d4';

  return (
    <div style={{
      border: `1px solid ${SQL_COLOR}30`,
      borderRadius: 12,
      overflow: 'hidden',
      marginTop: 32,
      background: `${SQL_COLOR}06`,
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 20px',
        borderBottom: `1px solid ${SQL_COLOR}20`,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: `${SQL_COLOR}10`,
      }}>
        <span style={{
          fontSize: 10, fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: SQL_COLOR,
          fontFamily: 'var(--font-mono)',
        }}>
          Try It Yourself
        </span>
      </div>

      {/* Question */}
      <div style={{ padding: '16px 20px 0' }}>
        <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
          {question}
        </p>
      </div>

      {/* Buttons */}
      <div style={{ padding: '14px 20px 16px', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {hint && (
          <button
            onClick={() => setHintOpen(p => !p)}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
              borderRadius: 6,
              padding: '6px 14px',
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.15s',
            }}
          >
            {hintOpen ? '↑ Hide Hint' : '💡 Show Hint'}
          </button>
        )}
        <button
          onClick={() => setAnswerOpen(p => !p)}
          style={{
            background: answerOpen ? SQL_COLOR : 'none',
            border: `1px solid ${SQL_COLOR}`,
            color: answerOpen ? '#000' : SQL_COLOR,
            borderRadius: 6,
            padding: '6px 14px',
            fontSize: 12,
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            transition: 'all 0.15s',
          }}
        >
          {answerOpen ? '↑ Hide Answer' : '→ Reveal Answer'}
        </button>
      </div>

      {/* Hint */}
      {hint && hintOpen && (
        <div style={{
          margin: '0 20px 16px',
          padding: '12px 14px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          fontSize: 13,
          color: 'var(--text2)',
          lineHeight: 1.7,
        }}>
          <span style={{ color: '#facc15', marginRight: 6 }}>Hint:</span>
          {hint}
        </div>
      )}

      {/* Answer */}
      {answerOpen && (
        <div style={{ margin: '0 20px 20px' }}>
          <div style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            overflow: 'hidden',
          }}>
            {/* Answer code bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              background: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
            }}>
              <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Answer</span>
              <button
                onClick={copyAnswer}
                style={{
                  background: 'none', border: '1px solid var(--border)',
                  color: 'var(--muted)', borderRadius: 4,
                  padding: '2px 8px', fontSize: 10,
                  cursor: 'pointer', fontFamily: 'var(--font-mono)',
                }}
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <pre style={{
              margin: 0,
              padding: '14px 16px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: 13,
              lineHeight: 1.7,
              color: 'var(--text)',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {answer}
            </pre>
          </div>

          {/* Explanation */}
          {explanation && (
            <div style={{
              marginTop: 12,
              padding: '12px 14px',
              background: `${SQL_COLOR}08`,
              border: `1px solid ${SQL_COLOR}20`,
              borderRadius: 8,
              fontSize: 13,
              color: 'var(--text)',
              lineHeight: 1.8,
            }}>
              <span style={{ color: SQL_COLOR, fontWeight: 700, marginRight: 6 }}>Why this works:</span>
              {explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}