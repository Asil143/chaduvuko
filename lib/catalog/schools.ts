import type { TrackArea } from './types'

export type SchoolArea = Exclude<TrackArea, 'practice'>

export interface School {
  slug: string
  area: SchoolArea
  title: string
  /** Short label for menus and card eyebrows. */
  short: string
  description: string
  /** Emoji shown beside the school name. */
  icon: string
  /** Accent colour for school badges and cards. */
  accent: string
}

/** The six schools, in display order. Each school is one track area. */
export const SCHOOLS: School[] = [
  {
    slug: 'ai',
    area: 'ai',
    title: 'School of AI',
    short: 'AI',
    description: 'Machine learning, deep learning, generative AI, LLM applications, and AI agents.',
    icon: '🤖',
    accent: '#8b5cf6',
  },
  {
    slug: 'data',
    area: 'data',
    title: 'School of Data',
    short: 'Data',
    description: 'SQL, data engineering, streaming, analytics engineering, and modern data platforms.',
    icon: '📊',
    accent: '#0ea5e9',
  },
  {
    slug: 'software-engineering',
    area: 'programming',
    title: 'School of Software Engineering',
    short: 'Software Engineering',
    description: 'Programming languages, web and full-stack development, testing, and building with AI.',
    icon: '💻',
    accent: '#10b981',
  },
  {
    slug: 'cloud',
    area: 'cloud',
    title: 'School of Cloud & Platforms',
    short: 'Cloud & Platforms',
    description: 'AWS, Azure, Google Cloud, DevOps, Kubernetes, MLOps, and reliability engineering.',
    icon: '☁️',
    accent: '#14b8a6',
  },
  {
    slug: 'security',
    area: 'security',
    title: 'School of Security',
    short: 'Security',
    description: 'Cybersecurity, application security, AI and LLM security, and governance.',
    icon: '🛡️',
    accent: '#ef4444',
  },
  {
    slug: 'computer-science',
    area: 'cs',
    title: 'School of Computer Science',
    short: 'Computer Science',
    description: 'Data structures and algorithms, databases, networking, systems, and system design.',
    icon: '🧮',
    accent: '#f59e0b',
  },
]

export const SCHOOL_BY_AREA = Object.fromEntries(SCHOOLS.map(school => [school.area, school])) as Record<SchoolArea, School>

export function getSchool(slug: string): School | undefined {
  return SCHOOLS.find(school => school.slug === slug)
}

/** Label for a track area; Projects ('practice') is not a school. */
export function areaLabel(area: TrackArea): string {
  return area === 'practice' ? 'Practice' : SCHOOL_BY_AREA[area].short
}
