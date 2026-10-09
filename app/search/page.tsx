import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SearchResults } from '@/components/search/SearchResults'

// Results depend on ?q=, read on the client so this page stays static. Result pages are not
// indexed; the site's JSON-LD SearchAction points here.
export const metadata: Metadata = {
  title: 'Search',
  robots: { index: false, follow: true },
}

export default function SearchPage() {
  return (
    <div className="pt-16 min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
        <Suspense fallback={<h1 className="text-3xl font-extrabold" style={{ color: 'var(--text)' }}>Search</h1>}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  )
}
