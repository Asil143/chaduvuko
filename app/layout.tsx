import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { ServiceWorkerRegistration } from '@/components/ui/ServiceWorkerRegistration'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: { default: 'Asil — Free Data Engineering & Cloud Learning', template: '%s · Asil' },
  description: 'Free, open data engineering and cloud education covering Azure, AWS, GCP, Apache Iceberg, Spark, Delta Lake, Data Mesh, and the full modern data stack.',
  keywords: ['data engineering', 'azure', 'aws', 'gcp', 'apache spark', 'databricks', 'data lake', 'free tutorials', 'h1b', 'data engineer salary'],
  authors: [{ name: 'Asil' }],
  metadataBase: new URL('https://asil-site.vercel.app'),
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Asil',
  },
  icons: {
    apple: '/icons/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Asil — Free Data Engineering & Cloud Learning',
    description: 'Master Data Engineering for free. Azure, AWS, GCP, Interview Prep, Real Projects. Built by Asil.',
    type: 'website',
    url: 'https://asil-site.vercel.app',
    siteName: 'Asil',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asil — Free Data Engineering & Cloud Learning',
    description: 'Free Azure, AWS, GCP tutorials + interview prep. Built by Asil.',
    creator: '@Asil143',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ServiceWorkerRegistration />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}