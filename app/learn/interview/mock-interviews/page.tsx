import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { sectionTitle } from '@/lib/site-title'

export const metadata: Metadata = {
  title: sectionTitle('Mock Interview Guide — Practise Every Round'),
  description: 'How tech interview rounds work and how to practise them: coding, SQL, system design, project deep dives, and behavioral answers with the STAR method.',
  alternates: { canonical: '/learn/interview/mock-interviews' },
}

export default function MockInterviewGuidePage() {
  return (
    <LearnLayout
      title="Mock Interview Guide — Practise Every Round"
      description="Knowing the answer and saying it well under time pressure are different skills. This guide explains the common interview rounds and gives you a practice routine for each one."
      section="Career prep"
      readTime="18 min"
      updatedAt="November 2026"
      breadcrumbs={[
        { label: 'Career prep', href: '/learn/interview' },
        { label: 'Mock interviews', href: '/learn/interview/mock-interviews' },
      ]}
    >
      <h2>The usual interview loop</h2>
      <p>Processes vary by company, but most technical hiring uses some mix of these rounds:</p>
      <ol>
        <li><strong>Recruiter screen</strong> — background, motivation, notice period, and expectations.</li>
        <li><strong>Online assessment or take-home</strong> — timed coding or SQL problems, or a small project.</li>
        <li><strong>Technical rounds</strong> — coding, SQL, or domain questions with an engineer.</li>
        <li><strong>System or solution design</strong> — design a service, pipeline, or ML system out loud.</li>
        <li><strong>Project deep dive</strong> — walk through something you built and defend your choices.</li>
        <li><strong>Behavioral / hiring manager</strong> — how you work with people, handle failure, and make decisions.</li>
      </ol>

      <h2>Coding and SQL rounds</h2>
      <ul>
        <li>Learn the patterns, not individual problems: <Link href="/learn/dsa/interview-patterns">DSA interview patterns</Link> and the <Link href="/learn/sql/interview-questions">top 50 SQL questions</Link>.</li>
        <li>Think out loud. State your approach and its complexity before you write code.</li>
        <li>Start with a simple correct solution, then optimise. Test with an edge case before saying &ldquo;done&rdquo;.</li>
        <li>Practise with a timer: 25–35 minutes per medium problem.</li>
      </ul>

      <h2>Design rounds</h2>
      <p>Use the same skeleton every time so you never freeze:</p>
      <ol>
        <li>Clarify requirements and scale (users, data volume, latency).</li>
        <li>Sketch the high-level components and the data flow.</li>
        <li>Go deep on one or two parts: storage, scaling, failure handling.</li>
        <li>Discuss trade-offs, monitoring, and what you would change at 10× scale.</li>
      </ol>
      <p>Practise with the <Link href="/learn/system-design/system-design-interview">system design interview framework</Link>.</p>

      <h2>Project deep dive</h2>
      <p>Prepare a three-minute story for your flagship project:</p>
      <ul>
        <li><strong>Problem</strong> — who had it and why it mattered.</li>
        <li><strong>Architecture</strong> — the components and why you chose them.</li>
        <li><strong>Hardest part</strong> — a real bug or design problem and how you solved it.</li>
        <li><strong>Results</strong> — numbers you can explain.</li>
        <li><strong>Next</strong> — what you would improve with more time.</li>
      </ul>

      <h2>Behavioral answers with STAR</h2>
      <p>Structure every story as <strong>Situation, Task, Action, Result</strong>, and spend most of the time on Action — what <em>you</em> did. Prepare five to six stories you can adapt:</p>
      <ul>
        <li>A time something you built failed, and what you changed.</li>
        <li>A disagreement with a teammate or manager and how it was resolved.</li>
        <li>A time you learned a new tool or topic quickly.</li>
        <li>A time you improved something nobody asked you to.</li>
        <li>A tight deadline and how you prioritised.</li>
        <li>Why this role and this company — specific, not generic.</li>
      </ul>

      <h2>How to run a mock interview</h2>
      <ul>
        <li><strong>Find a partner</strong> — a classmate, colleague, or study group. Take turns as interviewer and candidate.</li>
        <li><strong>Simulate the real thing</strong> — camera on, timer running, no notes.</li>
        <li><strong>Record yourself</strong> — watching the playback shows filler words and unclear explanations fast.</li>
        <li><strong>Score each round</strong> — problem solving, communication, correctness, and how you handled hints.</li>
        <li><strong>Practise solo</strong> — answer a question out loud from any interview prep lesson, then compare with the written answer.</li>
      </ul>

      <h2>On the day</h2>
      <ul>
        <li>Test your camera, microphone, and coding environment the day before.</li>
        <li>Ask clarifying questions before solving — it is expected, not a weakness.</li>
        <li>If you are stuck, say what you are thinking. Interviewers can only help if they can follow you.</li>
        <li>Prepare two or three thoughtful questions for the end of each round.</li>
      </ul>

      <h2>Next steps</h2>
      <p>
        Pick your role on the <Link href="/learn/interview">career prep hub</Link> to find its interview lessons, then read the{' '}
        <Link href="/learn/interview/job-search">job search and offers guide</Link>.
      </p>
    </LearnLayout>
  )
}
