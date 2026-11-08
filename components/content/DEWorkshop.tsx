import type { ReactNode } from 'react'

/** Presentation only: each lesson authors its own case, explanation and answer. */
export function DEWorkshop({ title, objective, prerequisites, children }: {
  title: string
  objective: string
  prerequisites: string
  children: ReactNode
}) {
  return (
    <section id="guided-workshop" aria-labelledby="guided-workshop-title"
      className="my-12 rounded-xl p-5 sm:p-8 [&_p]:my-4 [&_p]:leading-8 [&_li]:my-2 [&_li]:leading-7 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_a]:underline"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}>
      <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--green)' }}>Guided workshop</p>
      <h2 id="guided-workshop-title" className="text-2xl font-display font-bold">{title}</h2>
      <p><strong>Learning objective:</strong> {objective}</p>
      <p><strong>Prerequisites:</strong> {prerequisites}</p>
      {children}
    </section>
  )
}

export function WorkshopCode({ children, language = 'text', expectedOutput }: {
  children: string
  language?: 'python' | 'sql' | 'bash' | 'text' | 'json'
  /** Present only for self-contained snippets that the content validator runs. */
  expectedOutput?: string
}) {
  return (
    <div className="my-5 min-w-0">
      <p className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{language}{expectedOutput !== undefined ? ' · self-contained example' : ''}</p>
      <pre className="overflow-x-auto rounded-lg p-4 text-sm leading-7" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}><code>{children}</code></pre>
      {expectedOutput !== undefined && <>
        <p className="text-sm font-semibold">Expected output</p>
        <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg p-4 text-sm" style={{ border: '1px dashed var(--border)' }}>{expectedOutput}</pre>
      </>}
    </div>
  )
}

export function WorkshopAnswer({ children }: { children: ReactNode }) {
  return (
    <details className="my-5 rounded-lg p-4" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
      <summary className="cursor-pointer font-semibold">Check your reasoning and compare the worked answer</summary>
      {children}
    </details>
  )
}
