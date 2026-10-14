import type { Metadata } from 'next'
import { CAREERS_EMAIL } from '@/data/careers'
import { JobBoard } from '@/components/careers/JobBoard'

export const metadata: Metadata = {
  title: 'Job openings',
  description:
    'Apply for the Agentic AI Engineer & Technical Instructor role at Chaduvuko. Remote in India, with practical agent projects, curriculum ownership, and clear English instruction.',
}

export default function CareersPage() {
  return (
    <div className="jobs-wrap">
      <h1 className="font-display">Job openings</h1>
      <p className="jobs-lead">
        We’re hiring an Agentic AI Engineer &amp; Technical Instructor to build our curriculum and teach
        practical agent engineering. Open the role for the full posting. Applications go to{' '}
        <a href={`mailto:${CAREERS_EMAIL}`}>{CAREERS_EMAIL}</a>.
      </p>
      <JobBoard />
    </div>
  )
}
