import type { Metadata } from 'next'
import { CAREERS_EMAIL } from '@/data/careers'
import { JobBoard } from '@/components/careers/JobBoard'

export const metadata: Metadata = {
  title: 'Job openings',
  description:
    'Open YouTube instructor roles at Chaduvuko. Teach AWS, data structures and algorithms, Python, mathematics, physics, Azure, Google Cloud, cybersecurity, or blockchain.',
}

export default function CareersPage() {
  return (
    <div className="jobs-wrap">
      <h1 className="font-display">Job openings</h1>
      <p className="jobs-lead">
        Instructor roles for the Chaduvuko YouTube channel. Open a title to read the full posting.
        Applications go to <a href={`mailto:${CAREERS_EMAIL}`}>{CAREERS_EMAIL}</a>.
      </p>
      <JobBoard />
    </div>
  )
}
