'use client'

import { useEffect } from 'react'
import { syncLocalProgress } from '@/lib/learner-sync'
import { getSupabaseBrowserClient } from '@/lib/supabase-browser'

function updateStatus(status: 'syncing' | 'synced' | 'error', message?: string) {
  window.dispatchEvent(new CustomEvent('chaduvuko:sync-status', { detail: { status, message } }))
}

export function ProgressSync() {
  useEffect(() => {
    let active = true
    let syncing = false
    let pending = false
    let timer: ReturnType<typeof setTimeout> | undefined

    async function synchronize() {
      if (syncing) {
        pending = true
        return
      }
      syncing = true
      window.dispatchEvent(new Event('chaduvuko:sync-started'))
      updateStatus('syncing')
      try {
        await syncLocalProgress()
        if (active) updateStatus('synced')
      } catch (error) {
        console.error('Learner progress sync failed:', error)
        if (active) updateStatus('error', error instanceof Error ? error.message : 'Could not sync progress.')
      } finally {
        syncing = false
        if (pending && active) {
          pending = false
          void synchronize()
        }
      }
    }

    function scheduleSync() {
      clearTimeout(timer)
      timer = setTimeout(() => { void synchronize() }, 900)
    }

    let supabase: ReturnType<typeof getSupabaseBrowserClient>
    try {
      supabase = getSupabaseBrowserClient()
    } catch (error) {
      console.info(error instanceof Error ? error.message : 'Learner sync is not configured.')
      return
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED')) {
        queueMicrotask(() => { void synchronize() })
      }
      if (event === 'SIGNED_OUT') updateStatus('synced')
    })
    const onProgress = () => scheduleSync()
    const onRoadmap = () => scheduleSync()
    const onProjects = () => scheduleSync()
    const onPractice = () => scheduleSync()
    const onPreference = () => scheduleSync()
    const onStorage = (event: StorageEvent) => {
      if (!event.key || event.key.startsWith('chaduvuko_')) scheduleSync()
    }
    window.addEventListener('chaduvuko:progress-change', onProgress)
    window.addEventListener('chaduvuko:roadmap-progress-change', onRoadmap)
    window.addEventListener('chaduvuko:project-progress-change', onProjects)
    window.addEventListener('chaduvuko:practice-progress-change', onPractice)
    window.addEventListener('chaduvuko:sync-preference-change', onPreference)
    window.addEventListener('storage', onStorage)

    return () => {
      active = false
      clearTimeout(timer)
      subscription.unsubscribe()
      window.removeEventListener('chaduvuko:progress-change', onProgress)
      window.removeEventListener('chaduvuko:roadmap-progress-change', onRoadmap)
      window.removeEventListener('chaduvuko:project-progress-change', onProjects)
      window.removeEventListener('chaduvuko:practice-progress-change', onPractice)
      window.removeEventListener('chaduvuko:sync-preference-change', onPreference)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  return null
}
