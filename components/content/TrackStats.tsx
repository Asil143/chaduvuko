import { BookOpen, Clock3, Info, Layers3, ListTree } from 'lucide-react'
import styles from './TrackStats.module.css'

interface Props {
  lessons: number
  phases: number
  topics: number
}

export function TrackStats({ lessons, phases, topics }: Props) {
  const stats = [
    { value: String(lessons), label: 'Published lessons', detail: 'Guided explanations, practice and workshops', icon: BookOpen },
    { value: String(phases), label: 'Learning phases', detail: 'Progress from fundamentals to production', icon: ListTree },
    { value: String(topics), label: 'Topic entries', detail: 'Mapped across lessons; some topics overlap', icon: Layers3 },
    { value: 'Self-paced', label: 'Your schedule', detail: 'Reading and practice time varies by learner', icon: Clock3, compact: true },
  ]

  return (
    <section className={styles.overview} aria-label="Course statistics">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Course overview</p>
          <h2 className={styles.heading}>A clear path from foundations to production</h2>
        </div>
        <span className={styles.badge}>
          <span className={styles.dot} aria-hidden="true" />
          Start with the foundations
        </span>
      </div>

      <dl className={styles.grid}>
        {stats.map(({ value, label, detail, icon: Icon, compact }, index) => (
          <div key={label} className={`${styles.card} ${compact ? styles.schedule : ''}`}>
            <dt className={styles.label}>
              <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>{label}</span>
            </dt>
            <dd className={`${styles.value} ${compact ? styles.compactValue : ''}`}>{value}</dd>
            <dd className={styles.detail}>{detail}</dd>
          </div>
        ))}
      </dl>

      <p className={styles.note}>
        <Info size={14} aria-hidden="true" />
        <span>
          Topic counts are curriculum labels, not unique concepts. Published lessons are currently free to read;
          optional cloud tools may have separate provider costs. Lesson times are estimates, not a promised completion time.
        </span>
      </p>
    </section>
  )
}
