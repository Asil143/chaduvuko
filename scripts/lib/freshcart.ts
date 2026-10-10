/**
 * Runs SQL against the FreshCart database the way components/sql/SQLPlayground.tsx does in the
 * browser: sql.js, the same schema and seed, the first result set, NULL shown as "NULL".
 */
import initSqlJs, { type Database } from 'sql.js'
import { FRESHCART_SCHEMA_SQL, FRESHCART_SEED_SQL } from '@/data/sql-freshcart'

export interface FreshCartResult {
  columns: string[]
  rows: string[][]
}

let db: Promise<Database> | null = null

function database(): Promise<Database> {
  db ??= initSqlJs().then(SQL => {
    const fresh = new SQL.Database()
    fresh.run('PRAGMA foreign_keys = ON;')
    fresh.run(FRESHCART_SCHEMA_SQL)
    fresh.run(FRESHCART_SEED_SQL)
    return fresh
  })
  return db
}

/** A fresh copy per call, so a statement that writes cannot change the next query's data. */
export async function runFreshCart(sql: string): Promise<FreshCartResult> {
  const source = await database()
  const SQL = await initSqlJs()
  const copy = new SQL.Database(source.export())
  try {
    const res = copy.exec(sql)
    if (!res.length) return { columns: [], rows: [] }
    const { columns, values } = res[0]
    return { columns, rows: values.map(row => row.map(cell => (cell === null || cell === undefined ? 'NULL' : String(cell)))) }
  } finally {
    copy.close()
  }
}
