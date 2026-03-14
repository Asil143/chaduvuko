// components/JsonLd.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Drop-in JSON-LD structured data component.
// Renders schema.org markup that Google reads for rich results.
// No visual change to the page — pure SEO signal.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = 'https://chaduvuko.com'

// ── WebSite schema — paste into app/page.tsx (homepage) ──────────────────────
export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Asil — Free Data Engineering & Cloud Learning',
    url: BASE_URL,
    description:
      'Free data engineering tutorials covering Azure, AWS, and GCP. Real-world projects, interview prep, and the full modern data stack. Built by Asil, free forever.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Person',
      name: 'Asil',
      url: BASE_URL,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── LearningResource schema — paste into each project page ───────────────────
// Usage in a project page:
//
//   import { LearningResourceJsonLd } from '@/components/JsonLd'
//   ...
//   <LearningResourceJsonLd
//     name="Azure Data Factory: Copy CSV to ADLS Gen2"
//     description="Build your first ADF pipeline..."
//     url={`${BASE_URL}/learn/projects/azure-batch-pipeline`}
//     datePublished="2026-03-01"
//     keywords={['azure data factory', 'adls gen2', 'data pipeline']}
//     timeRequired="PT75M"   ← ISO 8601 duration (PT60M = 60 min)
//   />

interface LearningResourceProps {
  name: string
  description: string
  url: string
  datePublished: string
  keywords: string[]
  timeRequired?: string  // ISO 8601 duration, e.g. "PT75M"
}

export function LearningResourceJsonLd({
  name,
  description,
  url,
  datePublished,
  keywords,
  timeRequired = 'PT60M',
}: LearningResourceProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name,
    description,
    url,
    datePublished,
    keywords: keywords.join(', '),
    timeRequired,
    educationalLevel: 'Beginner',
    learningResourceType: 'Tutorial',
    isAccessibleForFree: true,
    inLanguage: 'en',
    provider: {
      '@type': 'Person',
      name: 'Asil',
      url: BASE_URL,
    },
    teaches: keywords,
    about: {
      '@type': 'Thing',
      name: 'Data Engineering',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── BreadcrumbList schema — paste into each project page ─────────────────────
// Usage:
//   <BreadcrumbJsonLd
//     items={[
//       { name: 'Home', url: BASE_URL },
//       { name: 'Projects', url: `${BASE_URL}/learn/projects` },
//       { name: 'Project 01', url: `${BASE_URL}/learn/projects/azure-batch-pipeline` },
//     ]}
//   />

interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO USE IN EACH PROJECT PAGE
//
// 1. Import at the top of the page file:
//    import { LearningResourceJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd'
//
// 2. Inside the LearnLayout JSX, add both near the top:
//
//    <LearningResourceJsonLd
//      name="Azure Data Factory: Copy CSV to ADLS Gen2"
//      description="Build your first ADF pipeline from scratch..."
//      url="https://chaduvuko.com/learn/projects/azure-batch-pipeline"
//      datePublished="2026-03-01"
//      keywords={['azure data factory', 'adls gen2', 'csv pipeline']}
//      timeRequired="PT75M"
//    />
//    <BreadcrumbJsonLd
//      items={[
//        { name: 'Home', url: 'https://chaduvuko.com' },
//        { name: 'Projects', url: 'https://chaduvuko.com/learn/projects' },
//        { name: 'Project 01 — Copy CSV to ADLS', url: 'https://chaduvuko.com/learn/projects/azure-batch-pipeline' },
//      ]}
//    />
// ─────────────────────────────────────────────────────────────────────────────