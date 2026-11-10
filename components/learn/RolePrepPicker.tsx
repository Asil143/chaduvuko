'use client'

import Link from 'next/link'
import { useState } from 'react'

export interface RolePrep {
  slug: string
  title: string
  icon: string
  school: string
  accent: string
  level: string
  interview: { title: string; href: string }[]
  capstone: { title: string; description: string; href?: string }
  roadmapHref?: string
}

export function RolePrepPicker({ roles }: { roles: RolePrep[] }) {
  const [selected, setSelected] = useState(roles[0]?.slug)
  const role = roles.find(item => item.slug === selected) ?? roles[0]
  if (!role) return null

  return (
    <div className="cprep-picker">
      <div className="cprep-roles" role="group" aria-label="Choose a role">
        {roles.map(item => (
          <button
            key={item.slug}
            type="button"
            aria-pressed={item.slug === role.slug}
            onClick={() => setSelected(item.slug)}
            className="cprep-role"
            style={{ '--pp-accent': item.accent } as React.CSSProperties}
          >
            <span aria-hidden="true">{item.icon}</span> {item.title}
          </button>
        ))}
      </div>

      <div className="cprep-kit" aria-live="polite" style={{ '--pp-accent': role.accent } as React.CSSProperties}>
        <div className="cprep-kit-head">
          <span className="pp-icon" aria-hidden="true">{role.icon}</span>
          <div>
            <p className="cprep-kit-kicker">{role.school} · {role.level}</p>
            <h3>{role.title} prep kit</h3>
          </div>
        </div>
        <ol className="cprep-steps">
          <li>
            <span className="cprep-step-label"><span aria-hidden="true">🧭</span> Learn the skills</span>
            <Link href={`/learn/paths/${role.slug}`}>Follow the {role.title} career path →</Link>
            {role.roadmapHref && <Link href={role.roadmapHref} className="cprep-secondary">See the full skills roadmap</Link>}
          </li>
          <li>
            <span className="cprep-step-label"><span aria-hidden="true">🏗️</span> Build the proof</span>
            {role.capstone.href
              ? <Link href={role.capstone.href}>{role.capstone.title} →</Link>
              : <span className="cprep-strong">{role.capstone.title}</span>}
            <span className="cprep-note">{role.capstone.description}</span>
          </li>
          <li>
            <span className="cprep-step-label"><span aria-hidden="true">🎯</span> Practise the questions</span>
            <ul>
              {role.interview.map(item => <li key={item.href}><Link href={item.href}>{item.title} →</Link></li>)}
            </ul>
          </li>
          <li>
            <span className="cprep-step-label"><span aria-hidden="true">🚀</span> Get hired</span>
            <Link href="/learn/interview/resume">Write the resume</Link>
            <Link href="/learn/interview/mock-interviews" className="cprep-secondary">Run mock interviews</Link>
            <Link href="/learn/interview/job-search" className="cprep-secondary">Apply and negotiate</Link>
          </li>
        </ol>
      </div>
    </div>
  )
}
