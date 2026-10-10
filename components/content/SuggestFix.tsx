'use client'
import { PencilLine } from 'lucide-react'

const ISSUES = 'https://github.com/Asil143/chaduvuko/issues/new'
const EMAIL = 'hello@chaduvuko.com'
const SITE = 'https://chaduvuko.com'

/** Text the reader selected inside the article, trimmed for a URL. */
function selectedLessonText(): string {
  const selection = window.getSelection()
  const article = document.querySelector('.prose-chaduvuko')
  if (!selection || selection.isCollapsed || !article?.contains(selection.anchorNode)) return ''
  return selection.toString().trim().replace(/\s+/g, ' ').slice(0, 500)
}

function report(title: string, href: string, quote: string) {
  const lines = [
    `Lesson: ${title}`,
    `Page: ${SITE}${href}`,
    '',
    'What is wrong:',
    quote ? `> ${quote}` : '',
    '',
    'What it should say:',
    '',
  ]
  return lines.join('\n')
}

/**
 * A link that opens a GitHub issue about the lesson, quoting any text the reader selected in it,
 * with email for readers without a GitHub account. The links are complete on the server; the
 * selected text is added when the link is used.
 */
export function SuggestFix({ title, href, variant }: { title: string; href: string; variant: 'meta' | 'footer' }) {
  const issueUrl = (quote: string) =>
    `${ISSUES}?${new URLSearchParams({ title: `Fix: ${title}`, body: report(title, href, quote) })}`
  const mailUrl = (quote: string) =>
    `mailto:${EMAIL}?${new URLSearchParams({ subject: `Fix: ${title}`, body: report(title, href, quote) }).toString().replace(/\+/g, '%20')}`

  // The selection is read on pointerdown (before the click can clear it) or on Enter.
  const quoting = (build: (quote: string) => string) => {
    const apply = (link: HTMLAnchorElement) => {
      const quote = selectedLessonText()
      if (quote) link.href = build(quote)
    }
    return {
      onPointerDown: (event: React.PointerEvent<HTMLAnchorElement>) => apply(event.currentTarget),
      onKeyDown: (event: React.KeyboardEvent<HTMLAnchorElement>) => { if (event.key === 'Enter') apply(event.currentTarget) },
    }
  }

  if (variant === 'meta') {
    return (
      <a
        href={issueUrl('')}
        target="_blank"
        rel="noreferrer"
        {...quoting(issueUrl)}
        className="flex items-center gap-1 hover:underline"
        style={{ color: 'var(--muted)' }}
      >
        <PencilLine size={11} aria-hidden="true" /> Suggest a fix
      </a>
    )
  }

  return (
    <p className="mt-10 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
      Spotted a mistake or something unclear?{' '}
      <a href={issueUrl('')} target="_blank" rel="noreferrer" {...quoting(issueUrl)} className="font-semibold underline underline-offset-2" style={{ color: 'var(--text)' }}>
        Suggest a fix on GitHub
      </a>{' '}
      or{' '}
      <a href={mailUrl('')} {...quoting(mailUrl)} className="font-semibold underline underline-offset-2" style={{ color: 'var(--text)' }}>
        email us
      </a>
      . Select the text first and it is quoted for you.
    </p>
  )
}
