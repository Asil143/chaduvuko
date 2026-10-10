'use client'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Play } from 'lucide-react'
import type { LessonQuickView, QuickResult } from '@/lib/lesson-quick'

// Loaded only when the reader asks to run the example.
const SQLPlayground = dynamic(() => import('@/components/sql/SQLPlayground'), { ssr: false })

const eyebrow = 'font-mono text-[11px] font-semibold uppercase tracking-[0.12em]'

function ResultTable({ result }: { result: Extract<QuickResult, { kind: 'table' }> }) {
  return (
    <div className="mt-3">
      <p className={eyebrow} style={{ color: 'var(--muted)' }}>
        Result · {result.rows.length} row{result.rows.length === 1 ? '' : 's'}
      </p>
      <div className="mt-1.5 overflow-x-auto rounded-lg" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full text-[13px] font-mono" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg2)' }}>
              {result.columns.map(column => (
                <th key={column} scope="col" className="text-left font-semibold px-3 py-1.5 whitespace-nowrap" style={{ color: 'var(--text2)', borderBottom: '1px solid var(--border)' }}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row, i) => (
              <tr key={i} style={{ borderTop: i ? '1px solid var(--border)' : undefined }}>
                {row.map((cell, j) => (
                  <td key={j} className="px-3 py-1.5 whitespace-nowrap" style={{ color: cell === 'NULL' ? 'var(--muted)' : 'var(--text)', fontStyle: cell === 'NULL' ? 'italic' : undefined }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/**
 * The answer a reader arriving from search came for, before the full lesson: a direct answer,
 * three points, and one example with its real result. SQL examples can be run and edited in place.
 */
export function QuickAnswer({ quick }: { quick: LessonQuickView }) {
  const [running, setRunning] = useState(false)
  const { example, result } = quick

  return (
    <section aria-labelledby="quick-answer" className="mb-10 rounded-2xl px-5 py-5 sm:px-6" style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}>
      <h2 id="quick-answer" className={eyebrow} style={{ color: 'var(--accent)' }}>Quick answer</h2>
      <p className="mt-2.5 text-[16px] leading-relaxed" style={{ color: 'var(--text)' }}>{quick.answer}</p>
      <ul className="mt-3 flex flex-col gap-1.5">
        {quick.points.map(point => (
          <li key={point} className="flex gap-2.5 text-[14px] leading-relaxed" style={{ color: 'var(--text2)' }}>
            <span aria-hidden="true" className="mt-[9px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {example && (
        <div className="mt-4">
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-3 min-h-10 pl-3.5 pr-1.5" style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
              <span className="flex-1 min-w-0 text-[13px] truncate" style={{ color: 'var(--text2)' }}>{example.label}</span>
              {example.lang === 'sql' && !example.static && !running && (
                <button
                  type="button"
                  onClick={() => setRunning(true)}
                  className="flex items-center gap-1.5 min-h-9 px-3 rounded-lg text-[13px] font-semibold flex-shrink-0"
                  style={{ background: '#06b6d4', color: '#001016' }}
                >
                  <Play size={12} aria-hidden="true" /> Run and edit
                </button>
              )}
            </div>
            {!running && (
              <pre className="m-0 px-4 py-3 text-[13px] leading-6 font-mono overflow-x-auto" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
                <code>{example.code}</code>
              </pre>
            )}
          </div>
          {running && (
            <div className="mt-3">
              <SQLPlayground initialQuery={example.code} height={Math.min(260, 24 * example.code.split('\n').length + 24)} showSchema={false} />
            </div>
          )}
          {!running && result?.kind === 'table' && <ResultTable result={result} />}
          {result?.kind === 'text' && (
            <div className="mt-3">
              <p className={eyebrow} style={{ color: 'var(--muted)' }}>Output</p>
              <pre className="mt-1.5 m-0 px-4 py-3 rounded-lg text-[13px] leading-6 font-mono overflow-x-auto" style={{ background: 'var(--bg2)', color: 'var(--text)', border: '1px solid var(--border)' }}>{result.text}</pre>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
