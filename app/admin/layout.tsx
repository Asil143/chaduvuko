import type { Metadata } from 'next'
import { sectionTitle } from '@/lib/site-title'

export const metadata: Metadata = { title: sectionTitle('Admin') }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
