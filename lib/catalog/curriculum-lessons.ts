import { PYTHON_CURRICULUM } from '@/data/python-curriculum'
import { HTML_CSS_CURRICULUM } from '@/data/html-css-curriculum'
import { DE_CURRICULUM } from '@/data/de-curriculum'
import { NETWORKING_CURRICULUM } from '@/data/networking-curriculum'
import { KAFKA_CURRICULUM } from '@/data/kafka-curriculum'
import { DBT_CURRICULUM } from '@/data/dbt-curriculum'
import { SNOWFLAKE_CURRICULUM } from '@/data/snowflake-curriculum'
import { SQL_CURRICULUM } from '@/data/sql-freshcart'
import { DS_CURRICULUM } from '@/data/datascience-streampulse'
import { AIML_SECTIONS } from '@/data/aiml-curriculum'
import { CYBER_MODULES, CYBER_PHASES } from '@/data/cybersecurity-curriculum'
import { DSA_UNITS } from '@/data/dsa-curriculum'
import { DBMS_MODULES, DBMS_SECTIONS } from '@/data/dbms-curriculum'
import type { Lesson, LessonStatus } from './types'

// Some curricula spell the unpublished state 'coming-soon'.
const normalizeStatus = (status: string): LessonStatus => (status === 'live' ? 'live' : 'soon')

interface SectionedCurriculum {
  title: string
  modules: { id: number; slug: string; title: string; status: string; readTime: string }[]
}

function fromSections(track: string, sections: SectionedCurriculum[]): Lesson[] {
  return sections.flatMap(section =>
    section.modules.map(module => ({
      href: `/learn/${track}/${module.slug}`,
      title: module.title,
      track,
      order: module.id,
      section: section.title,
      readTime: module.readTime,
      status: normalizeStatus(module.status),
    })),
  )
}

function aimlLessons(): Lesson[] {
  let order = 0
  return AIML_SECTIONS.flatMap(section =>
    section.topics.map(topic => ({
      // Introduction topics and ml-interview-prep are served without a section prefix.
      href: section.slug === 'introduction' || topic.slug === 'ml-interview-prep'
        ? `/learn/ai-ml/${topic.slug}`
        : `/learn/ai-ml/${section.slug}/${topic.slug}`,
      title: topic.title,
      track: 'ai-ml',
      order: ++order,
      section: section.title,
      status: normalizeStatus(topic.status),
    })),
  )
}

const cyberLessons = (): Lesson[] => CYBER_MODULES.map(module => ({
  href: `/learn/cybersecurity/${module.slug}`,
  title: module.title,
  track: 'cybersecurity',
  order: parseInt(module.num, 10),
  section: CYBER_PHASES.find(phase => phase.id === module.phase)?.title,
  readTime: module.readTime,
  status: normalizeStatus(module.status),
}))

const dsaLessons = (): Lesson[] => DSA_UNITS.map(unit => ({
  href: `/learn/dsa/${unit.slug}`,
  title: unit.title,
  track: 'dsa',
  order: parseInt(unit.number, 10),
  readTime: unit.time,
  status: normalizeStatus(unit.status),
}))

const dbmsLessons = (): Lesson[] => DBMS_MODULES.map(module => ({
  href: `/learn/dbms/${module.slug}`,
  title: module.title,
  track: 'dbms',
  order: parseInt(module.number, 10),
  section: DBMS_SECTIONS.find(section => section.id === module.section)?.title,
  readTime: module.time,
  status: normalizeStatus(module.status),
}))

export const curriculumLessons: Lesson[] = [
  ...fromSections('python', PYTHON_CURRICULUM),
  ...fromSections('html-css', HTML_CSS_CURRICULUM),
  ...fromSections('data-engineering', DE_CURRICULUM),
  ...fromSections('networking', NETWORKING_CURRICULUM),
  ...fromSections('apache-kafka', KAFKA_CURRICULUM),
  ...fromSections('dbt', DBT_CURRICULUM),
  ...fromSections('snowflake', SNOWFLAKE_CURRICULUM),
  ...fromSections('sql', SQL_CURRICULUM),
  ...fromSections('data-science', DS_CURRICULUM),
  ...aimlLessons(),
  ...cyberLessons(),
  ...dsaLessons(),
  ...dbmsLessons(),
]
