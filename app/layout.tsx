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
  metadataBase: new URL('https://chaduvuko.com'),
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
    url: 'https://chaduvuko.com',
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
      <body id="top">
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
import { ServiceWorkerRegistration } from '@/components/ui/ServiceWorkerRegistration'
import { Navbar } from '@/components/layout/Navbar'
import { getTrackSummaries } from '@/lib/catalog'
import { Footer } from '@/components/layout/Footer'
import { themeInitScript } from '@/lib/theme'
import ChatBot from '@/components/ui/ChatBot'
import { TITLE_TEMPLATE } from '@/lib/site-title'

export const metadata: Metadata = {
  metadataBase: new URL('https://chaduvuko.com'),

  title: {
    default: 'Chaduvuko — Free IT Learning Platform',
    template: TITLE_TEMPLATE,
  },

  description:
    'Free structured learning for every branch of IT — Data Engineering, Python, Web Dev, AI/ML, DevOps and more. Built for the US job market.',

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

  authors: [{ name: 'Asil', url: 'https://chaduvuko.com' }],
  creator: 'Asil',
  publisher: 'Asil',

  // './' resolves against each page's own route at build time, so every page
  // is self-canonical. scripts/validate-seo.ts checks the built output.
  alternates: {
    canonical: './',
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
    title: 'Chaduvuko — Free IT Learning Platform',
    description:
      'Free structured learning for every branch of IT — Data Engineering, Python, SQL, Web Dev, AI/ML and more. Built for the US job market. No paywall, ever.',
    type: 'website',
    url: 'https://chaduvuko.com',
    siteName: 'Chaduvuko',
    locale: 'en_US',
    // No explicit `images` here — app/opengraph-image.tsx (the Next.js file
    // convention) generates and injects og:image automatically, and always
    // takes precedence over anything listed here, so keeping a stale/redundant
    // entry here in the future would just silently be ignored again.
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Chaduvuko — Free IT Learning Platform',
    description:
      'Free Data Engineering, Python, SQL, Web Dev, and AI/ML tutorials, real projects, and interview prep. Built by Asil — no paywall.',
    creator: '@Asil143',
    // No explicit `images` here either — see the openGraph comment above;
    // app/opengraph-image.tsx covers twitter:image too since no separate
    // twitter-image.tsx file exists.
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
    icon: [
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/icons/favicon-32.png',
    apple: '/icons/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body id="top">
        <ServiceWorkerRegistration />
        <Navbar tracks={getTrackSummaries()} />
        {/* Page top paddings assume a 32px band below the fixed header (formerly the announcement bar). */}
        <main id="main-content" style={{ paddingTop: '32px' }}>{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  )
}
