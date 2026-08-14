export type CurriculumSection = {
  title: string
  icon: string
  body: string
}

const ICONS: Record<string, string> = {
  'Technology Overview': '🧭',
  'Who This Is For & Prerequisites': '🎯',
  'Complete Learning Path': '🗺️',
  'What To Learn Now vs Later': '⏳',
  'Study Plan': '📅',
  'How To Learn Each Topic': '📚',
  'Practice Roadmap': '💪',
  'Project Roadmap': '🏗️',
  'Real-World Applications': '🌍',
  'Common Mistakes & Debugging': '🐛',
  'Tools & Environment': '🛠️',
  'Specialization Paths': '🎓',
  'Interview Preparation': '💼',
  'Job Readiness': '✅',
  'Skill Checkpoints & Final Checklist': '☑️',
  'Final Roadmap Summary': '🏁',
}

function iconFor(title: string): string {
  return ICONS[title.trim()] || '📄'
}

export function parseCurriculumSections(text: string): CurriculumSection[] {
  const lines = text.split('\n')
  const sections: CurriculumSection[] = []
  let currentTitle: string | null = null
  let currentBody: string[] = []

  function flush() {
    if (currentTitle === null) return
    sections.push({
      title: currentTitle,
      icon: iconFor(currentTitle),
      body: currentBody.join('\n').trim(),
    })
    currentBody = []
  }

  for (const rawLine of lines) {
    if (rawLine.trim().startsWith('# ')) {
      flush()
      currentTitle = rawLine.trim().slice(2).trim()
    } else {
      currentBody.push(rawLine)
    }
  }
  flush()

  return sections
}
