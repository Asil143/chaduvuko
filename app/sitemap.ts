import { MetadataRoute } from 'next'

const BASE = 'https://asil-site.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages = [
    { url: BASE,                              priority: 1.0,  changeFrequency: 'weekly'  as const },
    { url: BASE + '/learn/roadmap',           priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/what-is-data-engineering', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/foundations/sql',   priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/foundations/python',priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/azure/introduction',priority: 0.85, changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/azure/adls-gen2',   priority: 0.85, changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/azure/adf',         priority: 0.85, changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/azure/databricks',  priority: 0.85, changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/azure/synapse',     priority: 0.85, changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/aws/introduction',  priority: 0.85, changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/aws/s3',            priority: 0.85, changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/aws/glue',          priority: 0.85, changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/aws/redshift',      priority: 0.85, changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/aws/kinesis',       priority: 0.85, changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/gcp/introduction',  priority: 0.85, changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/gcp/bigquery',      priority: 0.85, changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/gcp/dataflow',      priority: 0.85, changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/gcp/pubsub',        priority: 0.85, changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/gcp/composer',      priority: 0.85, changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/interview',         priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/industry',          priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/projects',          priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: BASE + '/learn/projects/azure-batch-pipeline', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: BASE + '/blog',                    priority: 0.8,  changeFrequency: 'weekly'  as const },
    { url: BASE + '/blog/why-data-engineers-use-parquet',     priority: 0.75, changeFrequency: 'monthly' as const },
    { url: BASE + '/blog/medallion-architecture-explained',   priority: 0.75, changeFrequency: 'monthly' as const },
    { url: BASE + '/blog/delta-lake-vs-apache-iceberg',       priority: 0.75, changeFrequency: 'monthly' as const },
    { url: BASE + '/blog/how-to-get-h1b-data-engineering',    priority: 0.75, changeFrequency: 'monthly' as const },
    { url: BASE + '/blog/spark-interview-questions',          priority: 0.75, changeFrequency: 'monthly' as const },
    { url: BASE + '/blog/azure-vs-aws-data-engineering',      priority: 0.75, changeFrequency: 'monthly' as const },
    { url: BASE + '/dashboard',               priority: 0.6,  changeFrequency: 'monthly' as const },
  ]

  return staticPages.map(page => ({
    url: page.url,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}