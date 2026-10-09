import type { Metadata } from 'next'
import { sectionTitle } from '@/lib/site-title'

export const metadata: Metadata = { title: sectionTitle('Newsletter') }

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return children
}
