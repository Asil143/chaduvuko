import type { Metadata } from 'next'
import { sectionTitle } from '@/lib/site-title'
import { trackIndexTitle } from '@/lib/catalog'

// The Data Science track is hidden (see lib/catalog/tracks.ts): pages stay
// reachable by direct link but are not indexed or listed.
export const metadata: Metadata = {
  title: sectionTitle(trackIndexTitle('data-science')),
  robots: { index: false, follow: true },
}

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return children
}
