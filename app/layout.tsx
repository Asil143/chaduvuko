/*
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
  */

import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { ServiceWorkerRegistration } from '@/components/ui/ServiceWorkerRegistration'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://asil-site.vercel.app'),

  title: {
    default: 'Asil — Free Data Engineering & Cloud Learning',
    template: '%s | Asil — Data Engineering',
  },

  description:
    'Free data engineering tutorials covering Azure Data Factory, ADLS Gen2, AWS Glue, BigQuery, Apache Spark, dbt, and the full modern data stack. Real-world projects, interview prep, no paywall.',

  keywords: [
    'data engineering',
    'data engineering tutorial',
    'azure data factory tutorial',
    'adls gen2',
    'aws glue tutorial',
    'bigquery tutorial',
    'apache spark',
    'dbt tutorial',
    'data engineering projects',
    'azure data engineering',
    'cloud data engineering',
    'medallion architecture',
    'data lake tutorial',
    'etl pipeline tutorial',
    'free data engineering course',
    'data engineering interview questions',
    'apache iceberg',
    'delta lake tutorial',
    'azure synapse analytics',
    'azure databricks',
    'data engineering roadmap 2026',
    'data engineer salary',
    'modern data stack',
  ],

  authors: [{ name: 'Asil', url: 'https://asil-site.vercel.app' }],
  creator: 'Asil',
  publisher: 'Asil',

  alternates: {
    canonical: 'https://asil-site.vercel.app',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: 'Asil — Free Data Engineering & Cloud Learning',
    description:
      'Master Data Engineering for free. Azure, AWS, GCP tutorials, real-world projects, and interview prep. Built by Asil — no paywall, ever.',
    type: 'website',
    url: 'https://asil-site.vercel.app',
    siteName: 'Asil — Free Data Engineering Learning',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Asil — Free Data Engineering & Cloud Learning',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Asil — Free Data Engineering & Cloud Learning',
    description:
      'Free Azure, AWS, GCP tutorials + real projects + interview prep. Built by Asil — no paywall.',
    creator: '@Asil143',
    images: ['/og-image.png'],
  },

  verification: {
    google: 'BEhYuLSGgqccQ3x6uc2CzQGmmYiZ5HhXV5lhS8GW1fc',
  },

  manifest: '/manifest.webmanifest',

  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Asil',
  },

  icons: {
    apple: '/icons/apple-touch-icon.png',
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




