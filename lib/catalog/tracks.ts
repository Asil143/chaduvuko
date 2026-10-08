import type { Track } from './types'

export const TRACKS: Track[] = [
  { slug: 'foundations',      title: 'Data Engineering Foundations', area: 'data',        indexHref: '/learn/what-is-data-engineering' },
  { slug: 'data-engineering', title: 'Data Engineering',             area: 'data',        indexHref: '/learn/data-engineering' },
  { slug: 'sql',              title: 'SQL',                          area: 'data',        indexHref: '/learn/sql' },
  { slug: 'apache-kafka',     title: 'Apache Kafka',                 area: 'data',        indexHref: '/learn/apache-kafka' },
  { slug: 'dbt',              title: 'dbt',                          area: 'data',        indexHref: '/learn/dbt' },
  { slug: 'snowflake',        title: 'Snowflake',                    area: 'data',        indexHref: '/learn/snowflake' },
  { slug: 'aws',              title: 'AWS',                          area: 'cloud',       indexHref: '/learn/aws/introduction' },
  { slug: 'azure',            title: 'Microsoft Azure',              area: 'cloud',       indexHref: '/learn/azure/introduction' },
  { slug: 'gcp',              title: 'Google Cloud',                 area: 'cloud',       indexHref: '/learn/gcp/introduction' },
  { slug: 'python',           title: 'Python',                       area: 'programming', indexHref: '/learn/python' },
  { slug: 'html-css',         title: 'HTML & CSS',                   area: 'programming', indexHref: '/learn/html-css' },
  { slug: 'dsa',              title: 'Data Structures & Algorithms', area: 'cs',          indexHref: '/learn/dsa' },
  { slug: 'dbms',             title: 'DBMS',                         area: 'cs',          indexHref: '/learn/dbms' },
  { slug: 'networking',       title: 'Networking',                   area: 'cs',          indexHref: '/learn/networking' },
  { slug: 'cybersecurity',    title: 'Cybersecurity',                area: 'security',    indexHref: '/learn/cybersecurity' },
  { slug: 'ai-ml',            title: 'AI & Machine Learning',        area: 'ai',          indexHref: '/learn/ai-ml' },
  { slug: 'data-science',     title: 'Data Science',                 area: 'ai',          indexHref: '/learn/data-science' },
  { slug: 'projects',         title: 'Projects',                     area: 'practice',    indexHref: '/learn/projects' },
]
