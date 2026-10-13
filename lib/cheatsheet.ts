/** One reference snippet on a track's cheat sheet. */
export interface CheatEntry {
  label: string
  code: string
  /** Optional short note shown to the right of the label. */
  note?: string
}

/** A titled group of reference snippets. */
export interface CheatSection {
  title: string
  /** Accent colour for the section heading; defaults to the track accent. */
  color?: string
  entries: CheatEntry[]
}

export type ProjectLevel = 'Beginner' | 'Intermediate' | 'Advanced'

/** A project idea a learner can build to practise the track. */
export interface ProjectIdea {
  title: string
  level: ProjectLevel
  /** One or two sentences on what to build. */
  build: string
  /** The skills it exercises. */
  skills: string[]
}

/** A track's reference page: grouped snippets plus project ideas to build. */
export interface TrackCheatSheet {
  track: string
  title: string
  /** The track overview URL, for the back link. */
  trackHref: string
  accent: string
  blurb: string
  sections: CheatSection[]
  projects: ProjectIdea[]
}
