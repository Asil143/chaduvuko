import Link from 'next/link'

const links = {
  Learn: [
    { label: 'What is Data Engineering?', href: '/learn/what-is-data-engineering' },
    { label: 'Roadmap 2026', href: '/learn/roadmap' },
    { label: 'SQL for Data Engineers', href: '/learn/foundations/sql' },
    { label: 'Python for Data Engineers', href: '/learn/foundations/python' },
  ],
  Azure: [
    { label: 'Azure Introduction', href: '/learn/azure/introduction' },
    { label: 'ADLS Gen2', href: '/learn/azure/adls-gen2' },
    { label: 'Azure Data Factory', href: '/learn/azure/adf' },
    { label: 'Azure Databricks', href: '/learn/azure/databricks' },
    { label: 'Azure Synapse', href: '/learn/azure/synapse' },
  ],
  AWS: [
    { label: 'AWS Introduction', href: '/learn/aws/introduction' },
    { label: 'Amazon S3', href: '/learn/aws/s3' },
    { label: 'AWS Glue', href: '/learn/aws/glue' },
    { label: 'Amazon Redshift', href: '/learn/aws/redshift' },
    { label: 'Amazon Kinesis', href: '/learn/aws/kinesis' },
  ],
  Resources: [
    { label: 'End-to-End Projects', href: '/learn/projects' },
    { label: 'Interview Prep', href: '/learn/interview' },
    { label: 'Top Companies Hiring', href: '/learn/industry' },
    { label: 'Microsoft Learn ↗', href: 'https://learn.microsoft.com' },
  ],
}

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '20px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '8px',
      fontSize: '11px',
      color: 'var(--muted)',
    }}>
      <span>
        Chaduvuko · Built by Asil · Made with{' '}
        <span style={{ color: '#e25555' }}>❤️</span>
        {' '}in California for every student who deserved better learning tools
      </span>
      <span>© 2026 · No Ads · Built by Asil</span>
    </footer>
  )
}