export interface LessonPractice {
  id: string
  lessonHref: string
  title: string
  prompt: string
  challengeId: string
  challengeLabel: string
}

export const LESSON_PRACTICE: Record<string, LessonPractice> = {
  '/learn/foundations/sql': {
    id: 'sql-customers-without-orders',
    lessonHref: '/learn/foundations/sql',
    title: 'Find customers who have never ordered',
    prompt: 'Use a LEFT JOIN and a NULL filter to find customers with no matching order. Sort the results by city.',
    challengeId: 'customers-zero-orders',
    challengeLabel: 'Customers with zero orders',
  },
  '/learn/sql/joins': {
    id: 'sql-customers-without-orders',
    lessonHref: '/learn/sql/joins',
    title: 'Find customers who have never ordered',
    prompt: 'Use a LEFT JOIN and a NULL filter to find customers with no matching order. Sort the results by city.',
    challengeId: 'customers-zero-orders',
    challengeLabel: 'Customers with zero orders',
  },
  '/learn/what-is-data-engineering': {
    id: 'data-engineering-pipeline-plan',
    lessonHref: '/learn/what-is-data-engineering',
    title: 'Sketch a reliable data pipeline',
    prompt: 'Choose a source and destination, then outline how data should be ingested, validated, transformed, and monitored.',
    challengeId: 'pipeline-plan',
    challengeLabel: 'Pipeline design brief',
  },
}
