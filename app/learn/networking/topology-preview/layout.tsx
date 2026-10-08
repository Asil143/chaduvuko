import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Network Topology Preview',
  robots: { index: false, follow: true },
}

export default function TopologyPreviewLayout({ children }: { children: React.ReactNode }) {
  return children
}
