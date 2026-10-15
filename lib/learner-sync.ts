import { PROGRESS_STORAGE_KEY, type ProgressRecord } from '@/lib/progress'
import { getSupabaseBrowserClient } from '@/lib/supabase-browser'

export const SYNC_KEYS = [
  PROGRESS_STORAGE_KEY,
  'chaduvuko_dashboard_weekly_goal',
  'chaduvuko_project_progress',
  'chaduvuko_practice_progress',
] as const

const ROADMAP_PREFIX = 'chaduvuko_rm_'
const MAX_SYNC_BYTES = 250_000

export type SyncState = Record<string, unknown>

export function readLocalSyncState(): SyncState {
  const values: SyncState = {}
  for (const key of SYNC_KEYS) {
    const raw = localStorage.getItem(key)
    if (raw === null) continue
    try { values[key] = JSON.parse(raw) } catch { values[key] = raw }
  }
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index)
    if (!key?.startsWith(ROADMAP_PREFIX)) continue
    const raw = localStorage.getItem(key)
    if (raw === null) continue
    try { values[key] = JSON.parse(raw) } catch { values[key] = raw }
  }
  return values
}

function latestMap<T extends string | null>(cloud: Record<string, T> = {}, local: Record<string, T> = {}) {
  const result = { ...cloud }
  for (const [key, value] of Object.entries(local)) {
    const current = result[key]
    if (typeof value === 'string' && typeof current === 'string') {
      result[key] = (new Date(value).getTime() >= new Date(current).getTime() ? value : current) as T
    } else if (!(key in result) || (current === null && value !== null)) {
      result[key] = value as T
    }
  }
  return result
}

function mergeProgress(cloud: unknown, local: unknown): ProgressRecord | unknown {
  if (!cloud || typeof cloud !== 'object' || !local || typeof local !== 'object') return local ?? cloud
  const c = cloud as Partial<ProgressRecord>
  const l = local as Partial<ProgressRecord>
  if (!c.completed || !l.completed || !c.quizzesPassed || !l.quizzesPassed) return { ...c, ...l }
  const cloudLast = c.lastVisited?.at ?? ''
  const localLast = l.lastVisited?.at ?? ''
  const completed = latestMap(c.completed, l.completed)
  const completedRemoved = latestMap(c.completedRemoved ?? {}, l.completedRemoved ?? {})
  Array.from(new Set([...Object.keys(completed), ...Object.keys(completedRemoved)])).forEach(href => {
    if ((completedRemoved[href] ?? '') >= (completed[href] ?? '')) delete completed[href]
    else delete completedRemoved[href]
  })
  return {
    version: 2,
    completed,
    completedRemoved,
    quizzesPassed: latestMap(c.quizzesPassed, l.quizzesPassed),
    lastVisited: localLast >= cloudLast ? l.lastVisited ?? c.lastVisited ?? null : c.lastVisited ?? null,
  }
}

function mergeManualStates(cloud: unknown, local: unknown): unknown {
  if (!cloud || typeof cloud !== 'object' || !local || typeof local !== 'object') return local ?? cloud
  const c = cloud as Record<string, unknown>
  const l = local as Record<string, unknown>
  if (c.states && l.states && typeof c.states === 'object' && typeof l.states === 'object') {
    const rank: Record<string, number> = { 'not-started': 0, 'in-progress': 1, done: 2 }
    const states: Record<string, unknown> = { ...(c.states as Record<string, unknown>) }
    const cloudUpdates = (c.stateUpdatedAt && typeof c.stateUpdatedAt === 'object' ? c.stateUpdatedAt : {}) as Record<string, string>
    const localUpdates = (l.stateUpdatedAt && typeof l.stateUpdatedAt === 'object' ? l.stateUpdatedAt : {}) as Record<string, string>
    const stateUpdatedAt = { ...cloudUpdates }
    for (const [id, status] of Object.entries(l.states as Record<string, unknown>)) {
      const localAt = localUpdates[id] ?? ''
      const cloudAt = cloudUpdates[id] ?? ''
      if (!(id in states) || (localAt && localAt >= cloudAt) || (!cloudAt && !localAt && (rank[String(status)] ?? 0) >= (rank[String(states[id])] ?? 0))) {
        states[id] = status
        if (localAt) stateUpdatedAt[id] = localAt
      }
    }
    return { ...c, ...l, states, stateUpdatedAt }
  }
  return { ...c, ...l }
}

function mergeTimestampedMap(cloud: unknown, local: unknown): unknown {
  if (!cloud || typeof cloud !== 'object' || !local || typeof local !== 'object') return local ?? cloud
  const result: Record<string, unknown> = { ...(cloud as Record<string, unknown>) }
  for (const [id, localValue] of Object.entries(local as Record<string, unknown>)) {
    const cloudValue = result[id]
    const localAt = localValue && typeof localValue === 'object' && 'updatedAt' in localValue ? String((localValue as { updatedAt: unknown }).updatedAt) : ''
    const cloudAt = cloudValue && typeof cloudValue === 'object' && 'updatedAt' in cloudValue ? String((cloudValue as { updatedAt: unknown }).updatedAt) : ''
    if (cloudValue === undefined || (localAt && localAt >= cloudAt)) result[id] = localValue
    else if (!localAt && !cloudAt && localValue && typeof localValue === 'object' && cloudValue && typeof cloudValue === 'object') {
      const a = localValue as Record<string, unknown>
      const b = cloudValue as Record<string, unknown>
      const localMilestones = a.milestones
      const cloudMilestones = b.milestones
      if (Array.isArray(localMilestones) && Array.isArray(cloudMilestones)) {
        result[id] = { ...b, milestones: localMilestones.map((value, index) => Boolean(value || cloudMilestones[index])) }
      }
    }
  }
  return result
}

function mergeValue(key: string, cloud: unknown, local: unknown): unknown {
  if (key === PROGRESS_STORAGE_KEY) return mergeProgress(cloud, local)
  if (key.startsWith(ROADMAP_PREFIX)) return mergeManualStates(cloud, local)
  if (key === 'chaduvuko_project_progress' || key === 'chaduvuko_practice_progress') return mergeTimestampedMap(cloud, local)
  if (!cloud || typeof cloud !== 'object' || !local || typeof local !== 'object') return local ?? cloud
  return { ...(cloud as Record<string, unknown>), ...(local as Record<string, unknown>) }
}

export function mergeSyncState(cloud: SyncState, local: SyncState): SyncState {
  const merged: SyncState = { ...cloud }
  for (const [key, value] of Object.entries(local)) merged[key] = mergeValue(key, cloud[key], value)
  return merged
}

function isAllowedKey(key: string) {
  return SYNC_KEYS.includes(key as typeof SYNC_KEYS[number]) || key.startsWith(ROADMAP_PREFIX)
}

export async function syncLocalProgress() {
  const supabase = getSupabaseBrowserClient()
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()
  if (sessionError) throw sessionError
  if (!session) return false

  const headers = { Authorization: `Bearer ${session.access_token}` }
  const response = await fetch('/api/learner/progress', { headers })
  const result = await response.json()
  if (!response.ok) throw new Error(result.error || 'Could not load your synced progress.')

  const local = readLocalSyncState()
  const merged = mergeSyncState(result.progress ?? {}, local)
  let changed = false
  for (const [key, value] of Object.entries(merged)) {
    if (!isAllowedKey(key)) continue
    const serialized = JSON.stringify(value)
    if (localStorage.getItem(key) !== serialized) {
      localStorage.setItem(key, serialized)
      changed = true
    }
  }
  if (changed) {
    window.dispatchEvent(new Event('chaduvuko:progress-change'))
    window.dispatchEvent(new Event('chaduvuko:roadmap-progress-change'))
    window.dispatchEvent(new Event('chaduvuko:project-progress-change'))
    window.dispatchEvent(new Event('chaduvuko:practice-progress-change'))
  }
  window.dispatchEvent(new Event('chaduvuko:sync-applied'))

  const body = JSON.stringify({ progress: merged })
  if (new Blob([body]).size > MAX_SYNC_BYTES) throw new Error('Your saved learning data is too large to sync.')
  const save = await fetch('/api/learner/progress', {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body,
  })
  const saveResult = await save.json()
  if (!save.ok) throw new Error(saveResult.error || 'Could not sync your learning progress.')
  return true
}
