import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { sectionTitle } from '@/lib/site-title'

export const metadata: Metadata = {
  title: sectionTitle('Job Search and Offers Guide — From Applications to Negotiation'),
  description: 'Run a focused tech job search: target roles, LinkedIn, referrals, tracking applications, following up, and evaluating and negotiating offers.',
  alternates: { canonical: '/learn/interview/job-search' },
}

export default function JobSearchGuidePage() {
  return (
    <LearnLayout
      title="Job Search and Offers Guide — From Applications to Negotiation"
      description="A job search is a pipeline: targeted applications in, conversations out. This guide shows how to run it deliberately, track it, and handle offers with confidence."
      section="Career prep"
      readTime="15 min"
      updatedAt="November 2026"
      breadcrumbs={[
        { label: 'Career prep', href: '/learn/interview' },
        { label: 'Job search and offers', href: '/learn/interview/job-search' },
      ]}
    >
      <h2>Pick a target before you apply</h2>
      <p>
        &ldquo;Any IT job&rdquo; is the hardest search to run. Choose one or two role titles — for example AI Engineer and Backend Developer —
        and make your resume, projects, and LinkedIn tell that story. Your <Link href="/learn/paths">career path</Link> already defines the
        skills those roles expect.
      </p>

      <h2>Get your profiles ready</h2>
      <ul>
        <li><strong>LinkedIn headline</strong> — the role you want plus your core stack: &ldquo;Data Engineer · Python, SQL, Spark, Azure&rdquo;.</li>
        <li><strong>About section</strong> — three short paragraphs: what you do, your best project with a result, what you are looking for.</li>
        <li><strong>Featured</strong> — link your flagship project, demo video, or write-up.</li>
        <li><strong>GitHub</strong> — pinned repositories with READMEs (see the <Link href="/learn/interview/portfolio">portfolio guide</Link>).</li>
      </ul>

      <h2>Where interviews actually come from</h2>
      <ul>
        <li><strong>Referrals</strong> — often the highest response rate. Message people in the role you want with a specific, short request and your resume.</li>
        <li><strong>Direct applications</strong> — company career pages and job boards. Apply early; many roles fill from the first wave of applicants.</li>
        <li><strong>Recruiters</strong> — keep your profile open to opportunities and reply promptly and professionally.</li>
        <li><strong>Community</strong> — meetups, hackathons, open source, and posting about what you build.</li>
      </ul>

      <h2>Run it like a pipeline</h2>
      <ul>
        <li>Track every application in a spreadsheet: company, role, date, source, contact, stage, next action.</li>
        <li>Set a weekly target — for example 10 tailored applications and 3 referral requests — rather than mass-applying.</li>
        <li>Follow up once, about a week after applying or interviewing, with a short polite note.</li>
        <li>Review your numbers every two weeks. Few screens means the resume needs work; screens without offers means interview practice.</li>
      </ul>

      <h2>Spot recruitment scams</h2>
      <ul>
        <li>Legitimate employers do not charge fees for applications, training, or onboarding.</li>
        <li>Be cautious of offers without an interview, or requests for bank details or ID documents before a written offer.</li>
        <li>Check that the email domain and job posting match the company&apos;s official website.</li>
      </ul>

      <h2>Evaluating an offer</h2>
      <p>Compare the whole package, not just the headline number:</p>
      <ul>
        <li>Fixed pay, variable or bonus pay, and any equity — and how each is paid out.</li>
        <li>Role, team, tech stack, and who you will learn from.</li>
        <li>Location, remote policy, working hours, and notice period.</li>
        <li>Benefits such as insurance, leave, and learning budgets.</li>
        <li>Employment type — full-time employee or contractor — and what that means for benefits and taxes.</li>
      </ul>
      <p>Always get the final terms in writing before you resign from a current job.</p>

      <h2>Negotiating respectfully</h2>
      <ul>
        <li>Research the market range for the role, level, and city before the conversation.</li>
        <li>Let the company make the first offer when you can; respond with a reasoned range, not a single number.</li>
        <li>Anchor your case on evidence: skills that match the role, competing offers, or relevant projects.</li>
        <li>Be polite and specific: &ldquo;I&apos;m excited about the role. Based on X and Y, is there flexibility to reach Z?&rdquo;</li>
        <li>If pay cannot move, ask about joining bonus, review timing, title, or learning budget.</li>
      </ul>

      <h2>Next steps</h2>
      <p>
        Prepare for the conversations your search creates with the <Link href="/learn/interview/mock-interviews">mock interview guide</Link>,
        and use the <Link href="/learn/interview">career prep hub</Link> to find interview lessons for your role.
      </p>
    </LearnLayout>
  )
}
