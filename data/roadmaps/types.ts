export type NodeStatus = 'not-started' | 'in-progress' | 'done'
export type NodeType = 'required' | 'recommended' | 'optional' | 'chaduvuko'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type RoadmapCategory = 'role' | 'skill' | 'project' | 'best-practices'

export interface RoadmapNode {
  id: string
  title: string
  type: NodeType
  description: string
  time?: string
  difficulty?: Difficulty
  href?: string
  row: number
  col: number
}

export interface RoadmapSection {
  row: number
  label: string
  description?: string
  color?: string
}

export interface Roadmap {
  id: string
  slug: string
  title: string
  category: RoadmapCategory
  description: string
  totalTime: string
  guide?: {
    howToUse?: string
    commonMistakes?: string[]
  }
  sections?: RoadmapSection[]
  nodes: RoadmapNode[]
}

export interface RoadmapMeta {
  slug: string
  title: string
  category: RoadmapCategory
  description: string
  totalTime: string
  nodeCount: number
  hasLiveContent: boolean
}