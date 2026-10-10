import type { LessonQuick } from '@/lib/lesson-quick'
import { SQL_QUICK } from './sql'
import { PYTHON_QUICK } from './python'
import { HTML_CSS_QUICK } from './html-css'
import { DSA_QUICK } from './dsa'
import { DE_QUICK } from './data-engineering'
import { KAFKA_QUICK } from './apache-kafka'
import { DBT_QUICK } from './dbt'

/** Every lesson's quick answer and check, keyed by lesson URL. Server-only; see lib/lesson-quick-data.ts. */
export const LESSON_QUICK: Record<string, LessonQuick> = {
  ...SQL_QUICK,
  ...PYTHON_QUICK,
  ...HTML_CSS_QUICK,
  ...DSA_QUICK,
  ...DE_QUICK,
  ...KAFKA_QUICK,
  ...DBT_QUICK,
}
