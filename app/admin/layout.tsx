import type { Metadata } from 'next'
import { sectionTitle } from '@/lib/site-title'

export const metadata: Metadata = {
  title: sectionTitle('Admin'),
  robots: { index: false, follow: false },
  alternates: { canonical: null },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
