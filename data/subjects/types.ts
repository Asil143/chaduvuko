export interface Chapter {
  title: string
  topics: string[]
  live?: boolean
}

export interface Subject {
  slug: string
  name: string
  description: string
  category: 'school' | 'intermediate' | 'competitive' | 'btech' | 'tech'
  classSlug?: string       // e.g. 'class-10'
  className?: string       // e.g. 'Class 10'
  branch?: string          // for btech: 'cs' | 'ece' | 'mech' | 'common'
  exam?: string            // for competitive: 'jee' | 'neet' | 'upsc' | 'ssc' | 'cat' | 'gate'
  board?: string           // 'CBSE' | 'ICSE' | 'State board'
  color: string
  live: boolean
  chapters: Chapter[]
  totalTopics?: number
  level: string
  comingSoonNote?: string
}