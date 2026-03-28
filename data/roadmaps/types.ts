
export type NodeType = 'required' | 'optional' | 'chaduvuko'
export type NodeState = 'locked' | 'available' | 'in-progress' | 'done'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface RoadmapNode {
  id: string
  title: string
  type: NodeType
  xp: number
  prerequisites: string[]
  difficulty: Difficulty
  time?: string
  description: string
  href?: string
  x: number
  y: number
  width: number
  height: number
  row?: number
  col?: number
}

export interface RoadmapEdge {
  from: string
  to: string
}

export interface SalaryEntry {
  company: string
  range: string
  note: string
}

export interface RoadmapMeta {
  slug: string
  title: string
  category: 'role' | 'skill' | 'project' | 'practice' | 'best-practices'
  description: string
  totalTime: string
  nodeCount: number
  hasLiveContent: boolean
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
  subtitle: string
  category: 'role' | 'skill' | 'project' | 'practice' | 'best-practices'
  description: string
  level: Difficulty
  estimatedTime: string
  nodes: RoadmapNode[]
  edges: RoadmapEdge[]
  salaryData?: SalaryEntry[]
  sections?: RoadmapSection[]
}