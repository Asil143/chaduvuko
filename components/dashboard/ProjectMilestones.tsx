'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Clipboard, ExternalLink } from 'lucide-react'
import { LEARNING_PROJECTS } from '@/data/learning-projects'

interface ProjectEntry {
  milestones: boolean[]
  updatedAt: string
}

type ProjectState = Record<string, ProjectEntry>
const STORAGE_KEY = 'chaduvuko_project_progress'

export function ProjectMilestones() {
  const [states, setStates] = useState<ProjectState>({})
  const [loaded, setLoaded] = useState(false)
  const [selectedId, setSelectedId] = useState(LEARNING_PROJECTS[0].id)
  const [copiedProject, setCopiedProject] = useState<string | null>(null)
  const [copyError, setCopyError] = useState('')

  useEffect(() => {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        const migrated: ProjectState = {}
        for (const [id, value] of Object.entries(parsed as Record<string, unknown>)) {
          if (Array.isArray(value)) migrated[id] = { milestones: value.map(Boolean), updatedAt: '' }
          else if (value && typeof value === 'object' && Array.isArray((value as ProjectEntry).milestones)) {
            const entry = value as ProjectEntry
            migrated[id] = { milestones: entry.milestones.map(Boolean), updatedAt: typeof entry.updatedAt === 'string' ? entry.updatedAt : '' }
          }
        }
        setStates(migrated)
      }
    } catch (error) {
      console.error('Could not read saved project milestones:', error)
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(states))
      window.dispatchEvent(new Event('chaduvuko:project-progress-change'))
    } catch (error) {
      console.error('Could not save project milestones:', error)
    }
  }, [states, loaded])

  const active = useMemo(() => LEARNING_PROJECTS
    .map(project => ({
      ...project,
      checked: states[project.id]?.milestones ?? [],
      complete: (states[project.id]?.milestones ?? []).filter(Boolean).length,
    }))
    .filter(project => project.complete > 0)
    .sort((a, b) => b.complete / b.milestones.length - a.complete / a.milestones.length), [states])
  const project = LEARNING_PROJECTS.find(item => item.id === selectedId) ?? LEARNING_PROJECTS[0]
  const checked = states[project.id]?.milestones ?? []
  const complete = checked.filter(Boolean).length

  function toggleMilestone(index: number) {
    setStates(current => {
      const milestones = [...(current[project.id]?.milestones ?? [])]
      milestones[index] = !milestones[index]
      return { ...current, [project.id]: { milestones, updatedAt: new Date().toISOString() } }
    })
  }

  async function copySummary() {
    const completedMilestones = project.milestones.filter((_, index) => checked[index])
    const text = [
      `Project: ${project.title}`,
      `Learning path: ${project.track}`,
      `Milestones completed: ${completedMilestones.length}/${project.milestones.length}`,
      ...completedMilestones.map(item => `- ${item}`),
      `Project guide: ${window.location.origin}${project.href}`,
      '',
      'Progress is self-reported; link your own repository or demo to show your work.',
    ].join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopiedProject(project.id)
      setCopyError('')
      window.setTimeout(() => setCopiedProject(null), 2200)
    } catch {
      setCopyError('Could not copy the project summary. Check browser clipboard permissions and try again.')
    }
  }

  return (
    <section className="dashboard-track-panel dashboard-project-panel" aria-labelledby="dashboard-project-title">
      <div className="dashboard-section-heading">
        <div>
          <h2 id="dashboard-project-title">Build a portfolio project</h2>
          <p>Track real project checkpoints; progress is saved in this browser and syncs when signed in.</p>
        </div>
        <Link href="/learn/projects" className="dashboard-text-link">All projects <ArrowRight size={14} aria-hidden="true" /></Link>
      </div>
      <article className="dashboard-project-card">
        <div className="dashboard-project-heading">
          <div>
            <span>{project.track} · Guided project</span>
            <h3>{project.title}</h3>
          </div>
          <label className="dashboard-project-select-label">
            <span className="sr-only">Choose a project</span>
            <select value={selectedId} onChange={event => setSelectedId(event.target.value)}>
              {LEARNING_PROJECTS.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
            </select>
          </label>
          <span className="dashboard-project-count">{complete}/{project.milestones.length}</span>
        </div>
        <div className="dashboard-track-bar" role="progressbar" aria-label={`${project.title} milestones`} aria-valuemin={0} aria-valuemax={project.milestones.length} aria-valuenow={complete}>
          <div style={{ width: `${complete / project.milestones.length * 100}%` }} />
        </div>
        <ul className="dashboard-project-milestones">
          {project.milestones.map((milestone, index) => (
            <li key={milestone}>
              <label>
                <input type="checkbox" checked={Boolean(checked[index])} onChange={() => toggleMilestone(index)} />
                <span aria-hidden="true">{checked[index] && <Check size={13} />}</span>
                <span>{milestone}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="dashboard-project-actions">
          <Link href={project.href}>Continue project <ExternalLink size={14} aria-hidden="true" /></Link>
          <button type="button" onClick={copySummary} disabled={complete === 0}>
            <Clipboard size={14} aria-hidden="true" /> {copiedProject === project.id ? 'Summary copied' : 'Copy progress summary'}
          </button>
        </div>
        {copyError && <p className="dashboard-account-message" role="alert">{copyError}</p>}
        {active.length > 1 && <p className="dashboard-project-also-active">Also in progress: {active.slice(1, 3).map(item => item.title).join(' · ')}</p>}
      </article>
    </section>
  )
}
