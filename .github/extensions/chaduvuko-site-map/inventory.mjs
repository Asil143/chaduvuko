import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
export const INVENTORY_PATH = path.join(REPO_ROOT, 'docs', 'chaduvuko', 'site-inventory.json')

export async function loadInventory() {
  let raw
  try {
    raw = await fs.readFile(INVENTORY_PATH, 'utf8')
  } catch {
    throw new Error('docs/chaduvuko/site-inventory.json not found. Run `npm run build` then `npx tsx scripts/site-inventory.ts`.')
  }
  const data = JSON.parse(raw)
  if (!data || typeof data !== 'object' || !Array.isArray(data.rows) || !data.summary?.totals) {
    throw new Error('site-inventory.json has an unrecognized shape. Regenerate it with scripts/site-inventory.ts.')
  }
  return data
}

export function findRows(rows, { query = '', kind, status, track } = {}) {
  const q = query.trim().toLowerCase()
  return rows.filter(row =>
    (!kind || row.kind === kind) &&
    (!status || row.status === status) &&
    (!track || row.track === track) &&
    (!q || [row.url, row.trackTitle, row.section, row.sourceFile].some(v => String(v).toLowerCase().includes(q))))
}
