
import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness } from 'lucide-react'
import { notFound } from 'next/navigation'
import SkillTree from '@/components/roadmap/SkillTree'
import { ROLE_ROADMAPS as ROADMAPS } from '@/data/roadmaps/role-registry'
import { dataEngineerCurriculum } from '@/data/roadmaps/curriculum/data-engineer'
import { mlEngineerCurriculum } from '@/data/roadmaps/curriculum/ml-engineer'
import { aiEngineerCurriculum } from '@/data/roadmaps/curriculum/ai-engineer'
import { genaiDeveloperCurriculum } from '@/data/roadmaps/curriculum/genai-developer'
import { dataScientistCurriculum } from '@/data/roadmaps/curriculum/data-scientist'
import { analyticsEngineerCurriculum } from '@/data/roadmaps/curriculum/analytics-engineer'
import { fullstackCurriculum } from '@/data/roadmaps/curriculum/fullstack'
import { mobileAppDeveloperCurriculum } from '@/data/roadmaps/curriculum/mobile-app-developer'
import { siteReliabilityEngineerCurriculum } from '@/data/roadmaps/curriculum/site-reliability-engineer'
import { cybersecurityAnalystCurriculum } from '@/data/roadmaps/curriculum/cybersecurity-analyst'
import { cloudSecurityEngineerCurriculum } from '@/data/roadmaps/curriculum/cloud-security-engineer'
import { backendDevCurriculum } from '@/data/roadmaps/curriculum/backend-dev'
import { cloudArchitectCurriculum } from '@/data/roadmaps/curriculum/cloud-architect'
import { databaseAdministratorCurriculum } from '@/data/roadmaps/curriculum/database-administrator'
import { devopsCurriculum } from '@/data/roadmaps/curriculum/devops'
import { frontendCurriculum } from '@/data/roadmaps/curriculum/frontend'
import { javaDeveloperCurriculum } from '@/data/roadmaps/curriculum/java-developer'
import { platformEngineerCurriculum } from '@/data/roadmaps/curriculum/platform-engineer'
import { pythonDeveloperCurriculum } from '@/data/roadmaps/curriculum/python-developer'
import { softwareArchitectCurriculum } from '@/data/roadmaps/curriculum/software-architect'
import { CurriculumGuide } from '@/components/roadmap/CurriculumGuide'
import type { TopicLesson } from '@/components/roadmap/TopicDrawer'
import { isPlannedTopic, lessonsForTopic } from '@/data/roadmaps/topic-lessons'
import { CAREER_PATHS } from '@/data/career-paths'
import { SCHOOL_BY_AREA } from '@/lib/catalog/schools'
import { getLiveLesson, getTrack } from '@/lib/catalog'
import type { Roadmap } from '@/data/roadmaps/types'

/** The Chaduvuko lessons for each topic on this roadmap, with titles, for the topic drawer. */
function topicLessons(roadmap: Roadmap): Record<string, TopicLesson[]> {
  return Object.fromEntries(
    roadmap.nodes.map(node => [
      node.id,
      lessonsForTopic(roadmap.slug, node.id).flatMap(href => {
        const lesson = getLiveLesson(href)
        return lesson ? [{ href, title: lesson.title, track: getTrack(lesson.track)?.title ?? '' }] : []
      }),
    ]),
  )
}


const CURRICULUM: Record<string, string> = {
  'data-engineer':             dataEngineerCurriculum,
  'ml-engineer':               mlEngineerCurriculum,
  'ai-engineer':               aiEngineerCurriculum,
  'genai-developer':           genaiDeveloperCurriculum,
  'data-scientist':            dataScientistCurriculum,
  'analytics-engineer':        analyticsEngineerCurriculum,
  'fullstack':                 fullstackCurriculum,
  'mobile-app-developer':      mobileAppDeveloperCurriculum,
  'site-reliability-engineer': siteReliabilityEngineerCurriculum,
  'cybersecurity-analyst':     cybersecurityAnalystCurriculum,
  'cloud-security-engineer':   cloudSecurityEngineerCurriculum,
  'backend-dev':               backendDevCurriculum,
  'cloud-architect':           cloudArchitectCurriculum,
  'database-administrator':    databaseAdministratorCurriculum,
  'devops':                    devopsCurriculum,
  'frontend':                  frontendCurriculum,
  'java-developer':            javaDeveloperCurriculum,
  'platform-engineer':         platformEngineerCurriculum,
  'python-developer':          pythonDeveloperCurriculum,
  'software-architect':        softwareArchitectCurriculum,
}

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const roadmap = ROADMAPS[params.slug]
  if (!roadmap) return {}
  return {
    title: `${roadmap.title} Roadmap`,
    description: roadmap.description,
    alternates: { canonical: `/learn/roadmap/${roadmap.slug}` },
  }
}

export function generateStaticParams() {
  return Object.keys(ROADMAPS).map(slug => ({ slug }))
}

export default function RoadmapPage({ params }: Props) {
  const roadmap = ROADMAPS[params.slug]
  if (!roadmap) notFound()

  const path = CAREER_PATHS.find(item => item.roadmap === roadmap.slug)
  const school = path ? SCHOOL_BY_AREA[path.school] : undefined
  const accent = school?.accent ?? 'var(--brand-green)'
  const lessons = topicLessons(roadmap)
  const lessonCount = new Set(Object.values(lessons).flat().map(lesson => lesson.href)).size
  const stageCount = new Set(roadmap.nodes.map(node => node.row ?? node.y)).size
  const level = roadmap.level ? roadmap.level.charAt(0).toUpperCase() + roadmap.level.slice(1) : null
  const plannedTopics = roadmap.nodes.filter(node => isPlannedTopic(roadmap.slug, node.id)).map(node => node.id)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '48px 20px 80px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="no-print" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 20 }}>
          <Link href="/learn/roadmap" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Roadmaps</Link>
          <span aria-hidden="true" style={{ margin: '0 8px' }}>›</span>
          <span aria-current="page" style={{ color: 'var(--text)' }}>{roadmap.title}</span>
        </nav>

        {/* Header */}
        <header className="pp-hero rm-hero" style={{ '--pp-accent': accent } as CSSProperties}>
          <div className="rm-hero-top">
            <span className="pp-icon" aria-hidden="true">{path?.icon ?? '🧭'}</span>
            <div>
              <p className="pp-eyebrow">{roadmap.category === 'role' ? 'Role roadmap' : 'Skill roadmap'}{school ? ` · ${school.title}` : ''}</p>
              {level && <span className="pp-badge">{level}</span>}
            </div>
          </div>
          <h1>{roadmap.title} Roadmap</h1>
          <p className="pp-lead">{roadmap.description}</p>
          <ul className="pp-stats-strip" aria-label="Roadmap at a glance">
            <li><strong>{roadmap.nodes.length}</strong> topics</li>
            <li><strong>{stageCount}</strong> stages</li>
            <li><strong>{lessonCount}</strong> Chaduvuko lessons</li>
            <li><strong>{roadmap.estimatedTime}</strong></li>
          </ul>
          <div className="pp-actions no-print">
            {path && (
              <Link href={`/learn/paths/${path.slug}`} className="pp-btn pp-btn-primary">
                Follow the {path.title} career path <ArrowRight size={16} aria-hidden="true" />
              </Link>
            )}
            <Link href="/learn/interview#by-role" className="pp-btn">
              <BriefcaseBusiness size={16} aria-hidden="true" /> Career prep kit
            </Link>
          </div>
        </header>

        {/* Skill tree */}
        <SkillTree roadmap={roadmap} topicLessons={lessons} plannedTopics={plannedTopics} />

        {/* Complete curriculum guide */}
        {CURRICULUM[params.slug] && (
          <div
            className="no-print"
            style={{
              marginTop: 40,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: '28px 26px',
            }}
          >
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 7 }}>
                📖 Complete Curriculum Guide
              </div>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13, lineHeight: 1.6, maxWidth: 640 }}>
                Explore the topics, practice ideas, and milestones behind this roadmap. Expand any section when you want more detail.
              </p>
            </div>
            <CurriculumGuide markdown={CURRICULUM[params.slug]} />
          </div>
        )}

        {/* Footer note */}
        <div className="no-print" style={{ marginTop: 28, fontSize: 12, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.7 }}>
          Progress saves automatically in your browser. No account needed.
        </div>

      </div>
    </div>
  )
}
