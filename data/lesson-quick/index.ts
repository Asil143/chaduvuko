import type { LessonQuick } from '@/lib/lesson-quick'
import { SQL_QUICK } from './sql'

/** Every lesson's quick answer and check, keyed by lesson URL. Server-only; see lib/lesson-quick-data.ts. */
export const LESSON_QUICK: Record<string, LessonQuick> = {
  ...SQL_QUICK,
}
