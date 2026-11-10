import type { Metadata } from 'next'
import Link from 'next/link'
import { CAREER_PATHS } from '@/data/career-paths'
import { ROLE_ROADMAPS } from '@/data/roadmaps/role-registry'
import { LIVE_LESSONS, getTrack } from '@/lib/catalog'
import { SCHOOLS, SCHOOL_BY_AREA } from '@/lib/catalog/schools'
import { pageShell } from '@/components/learn/PathCard'
import { RolePrepPicker, type RolePrep } from '@/components/learn/RolePrepPicker'

export const metadata: Metadata = {
  title: 'Career Prep — Interviews, Projects & Job Search',
  description: 'Interview prep for every role: role-based prep kits, interview lessons for every course, resume, portfolio and mock interview guides, and question banks.',
  alternates: { canonical: '/learn/interview' },
}

const TOOLKIT = [
  { icon: '📄', title: 'Resume', href: '/learn/interview/resume', desc: 'A one-page resume that passes ATS and recruiter screens, with impact bullets.' },
  { icon: '🗂️', title: 'Portfolio and projects', href: '/learn/interview/portfolio', desc: 'Which projects to build for your role and how to present them.' },
  { icon: '🎤', title: 'Mock interviews', href: '/learn/interview/mock-interviews', desc: 'Every interview round explained, plus STAR answers and a practice routine.' },
  { icon: '🤝', title: 'Job search and offers', href: '/learn/interview/job-search', desc: 'LinkedIn, referrals, tracking applications, and negotiating offers.' },
]

const READING = [
  { title: 'How to write a data engineer resume with no experience', href: '/blog/data-engineer-resume-without-experience' },
  { title: 'The data engineering career path — junior to senior', href: '/blog/data-engineering-career-path' },
  { title: '15 PySpark interview questions from real roles', href: '/blog/spark-interview-questions' },
]

const QUESTION_BANKS = [
  { icon: '🏗️', title: 'Data engineering — 50 questions', href: '/learn/interview/data-engineering-questions', desc: 'SQL, PySpark, cloud, pipelines, design and behavioral, with difficulty ratings.' },
  { icon: '🗃️', title: 'SQL — top 50 questions', href: '/learn/sql/interview-questions', desc: 'Joins, window functions, and query-writing patterns.' },
  { icon: '🤖', title: 'Machine learning — 50 answers', href: '/learn/ai-ml/ml-interview-prep', desc: 'Models, evaluation, deep learning, and ML system questions.' },
  { icon: '🛡️', title: 'Security — 60 answers', href: '/learn/cybersecurity/interview-prep-security', desc: 'SOC, networking, attacks, and defensive security.' },
  { icon: '🧮', title: 'DBMS — 60 questions', href: '/learn/dbms/interview-questions', desc: 'Normalisation, transactions, indexing, and internals.' },
  { icon: '📊', title: 'Data engineering — 60 answers', href: '/learn/data-engineering/de-interview-questions', desc: 'Complete answers for data engineering technical rounds.' },
]

const PLAN = [
  { icon: '🧭', title: 'Pick a role', text: 'Choose one target job and follow its career path.' },
  { icon: '🏗️', title: 'Build the capstone', text: 'Finish one project that looks like the real work.' },
  { icon: '🎯', title: 'Practise by topic', text: 'Work through the interview lessons for your stack.' },
  { icon: '🎤', title: 'Mock, apply, negotiate', text: 'Rehearse out loud, then run a focused job search.' },
]

const INTERVIEW_LESSON = /interview/i

export default function CareerPrepPage() {
  const roles: RolePrep[] = CAREER_PATHS.map(path => {
    const school = SCHOOL_BY_AREA[path.school]
    return {
      slug: path.slug,
      title: path.title,
      icon: path.icon,
      school: school.short,
      accent: school.accent,
      level: path.level,
      interview: path.interview,
      capstone: path.capstone,
      roadmapHref: path.roadmap && ROLE_ROADMAPS[path.roadmap] ? `/learn/roadmap/${path.roadmap}` : undefined,
    }
  })

  const topicLessons = LIVE_LESSONS.filter(lesson => INTERVIEW_LESSON.test(lesson.href)).flatMap(lesson => {
    const track = getTrack(lesson.track)
    if (!track || track.area === 'practice') return []
    return [{ href: lesson.href, title: lesson.title, track: track.title, area: track.area }]
  })
  const topicGroups = SCHOOLS
    .map(school => ({ school, lessons: topicLessons.filter(lesson => lesson.area === school.area) }))
    .filter(group => group.lessons.length)

  const stats = [
    { icon: '🧭', value: roles.length, label: 'role prep kits' },
    { icon: '🎯', value: topicLessons.length, label: 'interview lessons' },
    { icon: '📘', value: TOOLKIT.length, label: 'career guides' },
    { icon: '❓', value: QUESTION_BANKS.length, label: 'question banks' },
  ]

  return (
    <div style={pageShell}>
      <section className="pp-hero" aria-labelledby="prep-title">
        <p className="pp-eyebrow"><span aria-hidden="true">🚀</span> Career prep</p>
        <h1 id="prep-title">Interviews, projects and job search</h1>
        <p className="pp-lead">
          Everything between finishing your courses and accepting an offer: a prep kit for your role, interview lessons for every
          course, guides for your resume and portfolio, and question banks to practise out loud.
        </p>
        <div className="pp-actions">
          <a href="#by-role" className="pp-btn pp-btn-primary"><span aria-hidden="true">🧭</span> Get my role&apos;s prep kit</a>
          <a href="#toolkit" className="pp-btn"><span aria-hidden="true">📄</span> Resume and job search guides</a>
        </div>
        <ul className="pp-stats-strip" aria-label="Career prep at a glance">
          {stats.map(stat => (
            <li key={stat.label}><span aria-hidden="true">{stat.icon}</span> <strong>{stat.value}</strong> {stat.label}</li>
          ))}
        </ul>
      </section>

      <nav className="pp-jump" aria-label="Jump to a section">
        {[
          ['by-role', '🧭', 'By role'],
          ['by-topic', '🎯', 'By topic'],
          ['toolkit', '🧰', 'Career toolkit'],
          ['question-banks', '❓', 'Question banks'],
        ].map(([id, icon, label]) => (
          <a key={id} href={`#${id}`} style={{ '--pp-accent': '#10b981' } as React.CSSProperties}><span aria-hidden="true">{icon}</span> {label}</a>
        ))}
      </nav>

      <section aria-labelledby="plan-title" className="pp-school">
        <h2 id="plan-title" className="cprep-h2">Your prep plan</h2>
        <ol className="cprep-plan">
          {PLAN.map((step, index) => (
            <li key={step.title}>
              <span className="cprep-plan-num">{index + 1}</span>
              <span className="cprep-plan-icon" aria-hidden="true">{step.icon}</span>
              <strong>{step.title}</strong>
              <span>{step.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section id="by-role" aria-labelledby="by-role-title" className="pp-school">
        <h2 id="by-role-title" className="cprep-h2">Prep by role</h2>
        <p className="cprep-sub">Pick your target job to see the path, capstone, interview lessons and guides for it.</p>
        <RolePrepPicker roles={roles} />
      </section>

      <section id="by-topic" aria-labelledby="by-topic-title" className="pp-school">
        <h2 id="by-topic-title" className="cprep-h2">Prep by topic</h2>
        <p className="cprep-sub">Every course ends with an interview lesson. Practise the ones for your stack.</p>
        {topicGroups.map(({ school, lessons }) => (
          <div key={school.slug} className="cprep-topic-group" style={{ '--pp-accent': school.accent } as React.CSSProperties}>
            <h3><span className="cprep-topic-icon" aria-hidden="true">{school.icon}</span> {school.title}</h3>
            <ul className="cprep-topic-grid">
              {lessons.map(lesson => (
                <li key={lesson.href}>
                  <Link href={lesson.href} className="cprep-topic">
                    <span className="cprep-topic-track">{lesson.track}</span>
                    <span className="cprep-topic-title">{lesson.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section id="toolkit" aria-labelledby="toolkit-title" className="pp-school">
        <h2 id="toolkit-title" className="cprep-h2">Career toolkit</h2>
        <p className="cprep-sub">Turn your skills into interviews and offers.</p>
        <ul className="pp-grid">
          {TOOLKIT.map(item => (
            <li key={item.href}>
              <Link href={item.href} className="pp-card" style={{ '--pp-accent': '#10b981' } as React.CSSProperties}>
                <span className="pp-icon" aria-hidden="true">{item.icon}</span>
                <span className="pp-title">{item.title}</span>
                <span className="pp-summary">{item.desc}</span>
                <span className="pp-cta">Read the guide <span aria-hidden="true">→</span></span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="cprep-reading">
          <h3>Further reading</h3>
          <ul>
            {READING.map(item => <li key={item.href}><Link href={item.href}>{item.title} →</Link></li>)}
          </ul>
        </div>
      </section>

      <section id="question-banks" aria-labelledby="banks-title" className="pp-school">
        <h2 id="banks-title" className="cprep-h2">Question banks</h2>
        <p className="cprep-sub">Large sets of real questions with model answers. Read each answer out loud, then say it in your own words.</p>
        <ul className="pp-grid">
          {QUESTION_BANKS.map(item => (
            <li key={item.href}>
              <Link href={item.href} className="pp-card" style={{ '--pp-accent': '#0ea5e9' } as React.CSSProperties}>
                <span className="pp-icon" aria-hidden="true">{item.icon}</span>
                <span className="pp-title">{item.title}</span>
                <span className="pp-summary">{item.desc}</span>
                <span className="pp-cta">Practise <span aria-hidden="true">→</span></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
