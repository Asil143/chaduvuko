import { MetadataRoute } from 'next'

const BASE_URL = 'https://chaduvuko.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Static routes with their priorities and change frequencies
  const routes: MetadataRoute.Sitemap = [
    // Homepage — highest priority
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // Core learn pages
    {
      url: `${BASE_URL}/learn/roadmap`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/learn/what-is-data-engineering`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },

    // Projects listing
    {
      url: `${BASE_URL}/learn/projects`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Azure project pages — high priority (live content)
    {
      url: `${BASE_URL}/learn/projects/azure-batch-pipeline`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/learn/projects/azure-projects-02`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/learn/projects/azure-project-03`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/learn/projects/azure-project-04`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/learn/projects/azure-project-05`,
      lastModified: new Date('2026-03-01'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },

    // Azure track tutorials
    {
      url: `${BASE_URL}/learn/azure/introduction`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/learn/azure/adls-gen2`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/learn/azure/adf`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/learn/azure/databricks`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/learn/azure/synapse`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/learn/azure/event-hubs`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/learn/azure/key-vault`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/learn/azure/microsoft-fabric`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },

    // AWS track tutorials
    {
      url: `${BASE_URL}/learn/aws/introduction`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/learn/aws/s3`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/learn/aws/glue`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/learn/aws/redshift`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/learn/aws/kinesis`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/learn/aws/athena`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/learn/aws/emr`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/learn/aws/step-functions`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/learn/aws/lake-formation`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },

    // GCP track tutorials
    {
      url: `${BASE_URL}/learn/gcp/introduction`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/learn/gcp/bigquery`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/learn/gcp/dataflow`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/learn/gcp/pubsub`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/learn/gcp/composer`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },

    // Foundations
    {
      url: `${BASE_URL}/learn/foundations/sql`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/learn/foundations/python`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/learn/foundations/postgresql`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },

    // Career / interview
    {
      url: `${BASE_URL}/learn/interview`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/learn/industry`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Static pages
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  return routes
}