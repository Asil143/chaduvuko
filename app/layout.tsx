import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: { default: 'VedaEra — Free Data Engineering & Cloud Learning', template: '%s · VedaEra' },
  description: 'Free, open data engineering and cloud education covering Azure, AWS, GCP, Apache Iceberg, Spark, Delta Lake, Data Mesh, and the full modern data stack.',
  keywords: ['data engineering', 'azure', 'aws', 'gcp', 'apache spark', 'databricks', 'data lake', 'free tutorials'],
  authors: [{ name: 'VedaEra' }],
  openGraph: {
    title: 'VedaEra — Free Data Engineering & Cloud Learning',
    description: 'Master Data Engineering and Cloud from first principles. Free forever.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
