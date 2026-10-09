import type { Metadata } from 'next'
import { sectionTitle } from '@/lib/site-title'
import { trackIndexTitle } from '@/lib/catalog'

export const metadata: Metadata = { title: sectionTitle(trackIndexTitle('dbt')) }

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return children
}
