'use client'
import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Trophy, RefreshCw, ChevronRight, Zap } from 'lucide-react'
import { QUIZZES, Question } from '@/data/quizzes'

interface Props {
  pageHref: string
  onPass?: (xp: number) => void
}

const PASS_SCORE = 0.6  // 60% to pass

export function QuizSection({ pageHref, onPass }: Props) {
  const questions = QUIZZES[pageHref]
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | boolean | null)[]>([])
  const [revealed, setRevealed] = useState(false)
  const [done, setDone] = useState(false)
  const [xpAwarded, setXpAwarded] = useState(false)
  const QUIZ_XP = 50

  if (!questions || questions.length === 0) return null

  const q = questions[current]
  const totalQ = questions.length
  const score = done ? answers.filter((a, i) => a === questions[i].answer).length : 0
  const pct = done ? Math.round((score / totalQ) * 100) : 0
  const passed = pct >= PASS_SCORE * 100

  useEffect(() => {
    if (done && passed && !xpAwarded) {
      setXpAwarded(true)
      onPass?.(QUIZ_XP)
      try {
        const key = 'vedalera_quiz_pass'
        const existing = JSON.parse(localStorage.getItem(key) || '[]')
        if (!existing.includes(pageHref)) {
          localStorage.setItem(key, JSON.stringify([...existing, pageHref]))
        }
      } catch {}
    }
  }, [done, passed])

  function selectAnswer(val: number | boolean) {
    if (revealed) return
    const next = [...answers]
    next[current] = val
    setAnswers(next)
  }

  function reveal() {
    if (answers[current] === undefined || answers[current] === null) return
    setRevealed(true)
  }

  function nextQ() {
    setRevealed(false)
    if (current + 1 >= totalQ) {
      setDone(true)
    } else {
      setCurrent(current + 1)
    }
  }

  function reset() {
    setStarted(false)
    setCurrent(0)
    setAnswers([])
    setRevealed(false)
    setDone(false)
    setXpAwarded(false)
  }

  const isCorrect = revealed && answers[current] === q.answer

  if (!started) {
    return (
      <div className="mt-12 rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="p-6 text-center" style={{ background: 'var(--bg2)' }}>
          <div className="text-3xl mb-3">🧠</div>
          <h3 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--text)' }}>
            Knowledge Check
          </h3>
          <p className="text-sm mb-5" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>
            {totalQ} questions · Earn {QUIZ_XP} XP for passing · Score 60% or more to pass
          </p>
          <button onClick={() => setStarted(true)} className="btn-primary">
            Start Quiz <ChevronRight size={14} />
          </button>
        </div>
      </div>
    )
  }

  if (done) {
    return (
      <div className="mt-12 rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="p-8 text-center" style={{ background: 'var(--bg2)' }}>
          <div className="text-5xl mb-4">{passed ? '🏆' : '📚'}</div>
          <h3 className="font-display font-bold text-2xl mb-1" style={{ color: 'var(--text)' }}>
            {passed ? 'Quiz Passed!' : 'Keep Studying'}
          </h3>
          <div className="text-4xl font-display font-black my-3"
            style={{ color: passed ? 'var(--green)' : '#ff6b6b' }}>{pct}%</div>
          <p className="text-sm mb-2" style={{ color: 'var(--muted)' }}>
            {score} of {totalQ} correct
          </p>
          {passed && (
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-mono mb-5"
              style={{ background: 'rgba(0,230,118,0.1)', color: 'var(--green)', border: '1px solid rgba(0,230,118,0.2)' }}>
              <Zap size={13} /> +{QUIZ_XP} XP earned
            </div>
          )}
          {!passed && (
            <p className="text-sm mb-5" style={{ color: 'var(--muted)' }}>
              Review the lesson above and try again — you need 60% to pass.
            </p>
          )}
          <div className="space-y-2 text-left mb-6">
            {questions.map((question, i) => {
              const correct = answers[i] === question.answer
              return (
                <div key={question.id} className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: correct ? 'rgba(0,230,118,0.06)' : 'rgba(255,107,107,0.06)', border: `1px solid ${correct ? 'rgba(0,230,118,0.15)' : 'rgba(255,107,107,0.15)'}` }}>
                  {correct
                    ? <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--green)' }} />
                    : <XCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#ff6b6b' }} />}
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: 'var(--text)' }}>{question.question}</div>
                    <div className="text-xs" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>{question.explanation}</div>
                  </div>
                </div>
              )
            })}
          </div>
          <button onClick={reset} className="btn-secondary">
            <RefreshCw size={13} /> Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-12 rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3"
        style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono" style={{ color: 'var(--muted)' }}>Question {current + 1} of {totalQ}</span>
        </div>
        <div className="flex gap-1.5">
          {questions.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full" style={{
              background: i < current
                ? (answers[i] === questions[i].answer ? 'var(--green)' : '#ff6b6b')
                : i === current ? 'var(--accent)' : 'var(--border2)'
            }} />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="p-6" style={{ background: 'var(--surface)' }}>
        <div className="text-xs font-mono uppercase tracking-widest mb-3"
          style={{ color: q.type === 'truefalse' ? '#f5c542' : '#00c2ff' }}>
          {q.type === 'truefalse' ? 'True / False' : 'Multiple Choice'}
        </div>
        <p className="font-display font-semibold text-base mb-5 leading-snug" style={{ color: 'var(--text)' }}>
          {q.question}
        </p>

        {/* Options */}
        <div className="space-y-2">
          {q.type === 'truefalse'
            ? [true, false].map((val, i) => {
                const selected = answers[current] === val
                const correct = revealed && val === q.answer
                const wrong = revealed && selected && val !== q.answer
                return (
                  <button key={i} onClick={() => selectAnswer(val)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition-all"
                    style={{
                      border: `1px solid ${correct ? 'rgba(0,230,118,0.4)' : wrong ? 'rgba(255,107,107,0.4)' : selected ? 'var(--accent)' : 'var(--border2)'}`,
                      background: correct ? 'rgba(0,230,118,0.08)' : wrong ? 'rgba(255,107,107,0.08)' : selected ? 'var(--accent-glow)' : 'var(--bg)',
                      color: 'var(--text)',
                    }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono flex-shrink-0"
                      style={{ background: selected ? 'var(--accent)' : 'var(--bg2)', color: selected ? '#fff' : 'var(--muted)' }}>
                      {val ? 'T' : 'F'}
                    </span>
                    {val ? 'True' : 'False'}
                    {correct && <CheckCircle size={14} className="ml-auto" style={{ color: 'var(--green)' }} />}
                    {wrong && <XCircle size={14} className="ml-auto" style={{ color: '#ff6b6b' }} />}
                  </button>
                )
              })
            : q.options!.map((opt, i) => {
                const selected = answers[current] === i
                const correct = revealed && i === q.answer
                const wrong = revealed && selected && i !== q.answer
                return (
                  <button key={i} onClick={() => selectAnswer(i)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition-all"
                    style={{
                      border: `1px solid ${correct ? 'rgba(0,230,118,0.4)' : wrong ? 'rgba(255,107,107,0.4)' : selected ? 'var(--accent)' : 'var(--border2)'}`,
                      background: correct ? 'rgba(0,230,118,0.08)' : wrong ? 'rgba(255,107,107,0.08)' : selected ? 'var(--accent-glow)' : 'var(--bg)',
                      color: 'var(--text)',
                    }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
                      style={{ background: selected ? 'var(--accent)' : 'var(--bg2)', color: selected ? '#fff' : 'var(--muted)' }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                    {correct && <CheckCircle size={14} className="ml-auto flex-shrink-0" style={{ color: 'var(--green)' }} />}
                    {wrong && <XCircle size={14} className="ml-auto flex-shrink-0" style={{ color: '#ff6b6b' }} />}
                  </button>
                )
              })}
        </div>

        {/* Explanation */}
        {revealed && (
          <div className="mt-4 p-4 rounded-xl"
            style={{ background: isCorrect ? 'rgba(0,230,118,0.06)' : 'rgba(255,107,107,0.06)', border: `1px solid ${isCorrect ? 'rgba(0,230,118,0.2)' : 'rgba(255,107,107,0.2)'}` }}>
            <div className="flex items-center gap-2 mb-1.5">
              {isCorrect
                ? <CheckCircle size={14} style={{ color: 'var(--green)' }} />
                : <XCircle size={14} style={{ color: '#ff6b6b' }} />}
              <span className="text-xs font-mono font-semibold" style={{ color: isCorrect ? 'var(--green)' : '#ff6b6b' }}>
                {isCorrect ? 'Correct!' : 'Not quite'}
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>
              {q.explanation}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mt-5">
          <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
            {answers[current] === undefined || answers[current] === null ? 'Select an answer' : revealed ? '' : 'Ready to check'}
          </span>
          {!revealed
            ? <button onClick={reveal}
                disabled={answers[current] === undefined || answers[current] === null}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                Check Answer
              </button>
            : <button onClick={nextQ} className="btn-primary">
                {current + 1 >= totalQ ? 'See Results' : 'Next Question'} <ChevronRight size={14} />
              </button>}
        </div>
      </div>
    </div>
  )
}
