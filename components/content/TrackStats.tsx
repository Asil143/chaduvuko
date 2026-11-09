import { BookOpen, Info, Layers3, ListTree, LockOpen } from 'lucide-react'
import styles from './TrackStats.module.css'

interface Props {
  lessons: number
  phases: number
  topics: number
}

export function TrackStats({ lessons, phases, topics }: Props) {
  const stats = [
    { value: String(lessons), label: 'Lessons', detail: 'Read, practice and build', icon: BookOpen },
    { value: String(phases), label: 'Phases', detail: 'Follow a structured path', icon: ListTree },
    { value: String(topics), label: 'Topic entries', detail: 'May overlap across lessons', icon: Layers3 },
    { value: '100%', label: 'Open access', detail: 'Published lessons are readable without payment', icon: LockOpen },
  ]

  return (
    <section className={styles.overview} aria-label="Course statistics">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Course overview</p>
          <h2 className={styles.heading}>Your learning path</h2>
        </div>
        <span className={styles.badge}>
          <span className={styles.dot} aria-hidden="true" />
          Self-paced
        </span>
      </div>

      <dl className={styles.grid}>
        {stats.map(({ value, label, detail, icon: Icon }, index) => (
          <div key={label} className={`${styles.card} ${index === stats.length - 1 ? styles.free : ''}`}>
            <dt className={styles.label}>
              <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>{label}</span>
            </dt>
            <dd className={styles.value}>{value}</dd>
            <dd className={styles.detail}>{detail}</dd>
          </div>
        ))}
      </dl>

      <p className={styles.note}>
        <Info size={14} aria-hidden="true" />
        <span>Topic entries can overlap; lesson pages identify prerequisites and any external setup.</span>
      </p>
    </section>
  )
}
