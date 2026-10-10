'use client'
import { useState } from 'react'
import { Check, X } from 'lucide-react'
import type { QuickCheck as QuickCheckData } from '@/lib/lesson-quick'

const eyebrow = 'font-mono text-[11px] font-semibold uppercase tracking-[0.12em]'

/** One question at the end of a lesson, answered on the page. A correct answer counts as passing the lesson's check. */
export function QuickCheck({ check, onPass }: { check: QuickCheckData; onPass?: () => void }) {
  const [chosen, setChosen] = useState<number | null>(null)
  const answered = chosen !== null
  const correct = chosen === check.answer

  function choose(index: number) {
    if (answered) return
    setChosen(index)
    if (index === check.answer) onPass?.()
  }

  return (
    <section aria-labelledby="quick-check" className="mt-12 rounded-2xl px-5 py-5 sm:px-6" style={{ background: 'var(--surface)', border: '1px solid var(--border2)' }}>
      <h2 id="quick-check" className={eyebrow} style={{ color: 'var(--accent)' }}>Quick check</h2>
      <p className="mt-2.5 text-[16px] font-semibold leading-snug" style={{ color: 'var(--text)' }}>{check.question}</p>
      <div className="mt-4 flex flex-col gap-2">
        {check.options.map((option, index) => {
          const isAnswer = index === check.answer
          const isChosen = index === chosen
          const border = answered && isAnswer ? 'var(--green)' : answered && isChosen ? 'var(--danger)' : 'var(--border)'
          return (
            <button
              key={option}
              type="button"
              onClick={() => choose(index)}
              aria-disabled={answered}
              className="flex items-center gap-3 min-h-12 px-4 py-2.5 rounded-xl text-left text-[15px] transition-colors"
              style={{ border: `1.5px solid ${border}`, background: answered && (isAnswer || isChosen) ? 'var(--bg2)' : 'var(--bg)', color: 'var(--text)', cursor: answered ? 'default' : 'pointer' }}
            >
              <span className="flex-1">{option}</span>
              {answered && isAnswer && <Check size={16} aria-label="Correct answer" style={{ color: 'var(--green)', flexShrink: 0 }} />}
              {answered && isChosen && !isAnswer && <X size={16} aria-label="Your answer" style={{ color: 'var(--danger)', flexShrink: 0 }} />}
            </button>
          )
        })}
      </div>
      <div aria-live="polite">
        {answered && (
          <div className="mt-4">
            <p className="text-[15px] font-semibold" style={{ color: correct ? 'var(--green)' : 'var(--danger)' }}>
              {correct ? 'Correct.' : 'Not quite.'}
            </p>
            <p className="mt-1 text-[14px] leading-relaxed" style={{ color: 'var(--text2)' }}>{check.explanation}</p>
            {!correct && (
              <button type="button" onClick={() => setChosen(null)} className="mt-3 min-h-10 px-4 rounded-lg text-sm font-semibold" style={{ border: '1px solid var(--border2)', color: 'var(--text)' }}>
                Try again
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
