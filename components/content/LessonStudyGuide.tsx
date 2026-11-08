import Link from 'next/link'

interface Props {
  title: string
  section: string
  next?: { href: string; title: string } | null
}

/** A consistent study loop for lessons whose authored body does not include one. */
export function LessonStudyGuide({ title, section, next }: Props) {
  return (
    <aside
      aria-labelledby="study-guide-title"
      className="mt-12 rounded-2xl p-5 sm:p-6"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--green)' }}>
        Study guide · {section}
      </div>
      <h2 id="study-guide-title" className="text-xl font-display font-semibold mb-3" style={{ color: 'var(--text)' }}>
        Complete this lesson: {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-3 text-sm" style={{ color: 'var(--muted)' }}>
        <div>
          <h3 className="font-semibold mb-1" style={{ color: 'var(--text)' }}>Before you start</h3>
          <p>Review the previous lesson in this track and write down one question you expect this lesson to answer.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1" style={{ color: 'var(--text)' }}>Do this now</h3>
          <p>Reproduce the main example, change one input or assumption, and record what changed and why.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1" style={{ color: 'var(--text)' }}>Prove it</h3>
          <p>Explain the idea in your own words, name one failure mode, and identify when you would not use it.</p>
        </div>
      </div>
      {next && (
        <p className="mt-5 pt-4 text-sm" style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
          When you can complete the exercise without copying, continue to{' '}
          <Link href={next.href} style={{ color: 'var(--accent)' }}>{next.title}</Link>.
        </p>
      )}
    </aside>
  )
}
