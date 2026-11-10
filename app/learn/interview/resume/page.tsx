import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { sectionTitle } from '@/lib/site-title'

export const metadata: Metadata = {
  title: sectionTitle('Tech Resume Guide — Get Past the Screen'),
  description: 'Write a one-page tech resume that passes recruiter and ATS screens: structure, impact bullets, projects for freshers, and a final checklist.',
  alternates: { canonical: '/learn/interview/resume' },
}

export default function ResumeGuidePage() {
  return (
    <LearnLayout
      title="Tech Resume Guide — Get Past the Screen"
      description="A recruiter decides in under a minute whether to keep reading. This guide shows how to structure a one-page resume for AI, data, software, cloud and security roles so the right evidence is impossible to miss."
      section="Career prep"
      readTime="15 min"
      updatedAt="November 2026"
      breadcrumbs={[
        { label: 'Career prep', href: '/learn/interview' },
        { label: 'Resume', href: '/learn/interview/resume' },
      ]}
    >
      <h2>What a resume is for</h2>
      <p>
        A resume does not get you a job. It gets you a conversation. Its only job is to make a recruiter or hiring manager think
        &ldquo;this person can probably do the work — let&apos;s talk.&rdquo; Everything on the page should serve that one goal.
      </p>
      <p>
        Many companies filter applications with an applicant tracking system (ATS) before a person skims them. You need a format that
        software can parse and a layout a busy human can scan in seconds.
      </p>

      <h2>The structure that works</h2>
      <ol>
        <li><strong>Header</strong> — name, city or &ldquo;Remote&rdquo;, email, phone, LinkedIn, GitHub or portfolio. No photo, date of birth, or full address.</li>
        <li><strong>Summary (2 lines, optional)</strong> — the role you want and your strongest proof. &ldquo;Data engineer with 2 years building Spark and Airflow pipelines on Azure; cut a daily batch from 4 hours to 35 minutes.&rdquo;</li>
        <li><strong>Skills</strong> — grouped by category (Languages, Data, Cloud, Tools). Only list what you could discuss in an interview.</li>
        <li><strong>Experience</strong> — reverse chronological, 3–5 bullets per role.</li>
        <li><strong>Projects</strong> — 2–3 projects with links. For freshers this section goes above Experience.</li>
        <li><strong>Education and certifications</strong> — degree, institution, year. Certifications only if relevant to the role.</li>
      </ol>
      <p>Keep it to one page early in your career. Use a plain single-column layout: no tables, text boxes, icons, or skill bars — ATS parsers often scramble them.</p>

      <h2>Write impact bullets, not duty lists</h2>
      <p>Each bullet should answer: <em>what did you do, with what, and what changed because of it?</em> A reliable pattern is <strong>action verb + what you built + tools + measurable result</strong>.</p>
      <ul>
        <li>Weak: &ldquo;Responsible for ETL pipelines.&rdquo;</li>
        <li>Strong: &ldquo;Rebuilt 12 nightly ETL jobs as incremental Spark pipelines on Databricks, cutting run time by 70%.&rdquo;</li>
        <li>Weak: &ldquo;Worked on a chatbot.&rdquo;</li>
        <li>Strong: &ldquo;Built a RAG support assistant (FastAPI, pgvector, an LLM API) with a 120-question evaluation set; answer accuracy rose from 61% to 84%.&rdquo;</li>
      </ul>
      <p>
        If you do not have exact numbers, use honest estimates you can explain (&ldquo;about 2 million rows a day&rdquo;) or scale words
        (users, rows, services, latency). Never invent numbers — interviewers will ask how you measured them.
      </p>

      <h2>No work experience yet?</h2>
      <p>Projects are your experience. Pick projects that look like the job:</p>
      <ul>
        <li>Finish the capstone from your <Link href="/learn/paths">career path</Link> and describe it like a job: problem, architecture, tools, result.</li>
        <li>Link the GitHub repository and a live demo or short video. A README with an architecture diagram matters more than extra projects.</li>
        <li>Include internships, freelance work, open-source contributions, hackathons, and teaching assistant roles.</li>
      </ul>
      <p>For a data-specific walkthrough, read <Link href="/blog/data-engineer-resume-without-experience">How to Write a Data Engineer Resume When You Have No Work Experience</Link>.</p>

      <h2>Tailor it for every application</h2>
      <ul>
        <li>Read the job description and highlight the skills it repeats. Use the same words where they are true for you (&ldquo;Azure Data Factory&rdquo;, not just &ldquo;ADF&rdquo;).</li>
        <li>Reorder bullets so the most relevant ones come first.</li>
        <li>Keep a long &ldquo;master resume&rdquo; and cut a one-page version per role family — AI, data, backend, and so on.</li>
      </ul>

      <h2>Final checklist</h2>
      <ul>
        <li>One page, single column, exported as PDF with a clear file name (Firstname-Lastname-Data-Engineer.pdf).</li>
        <li>Every bullet starts with an action verb and most include a result.</li>
        <li>Every skill listed is one you could answer questions about.</li>
        <li>Links work and the GitHub repositories have READMEs.</li>
        <li>No spelling mistakes — read it aloud and ask someone else to read it.</li>
        <li>Consistent dates, tense, and formatting throughout.</li>
      </ul>

      <h2>Next steps</h2>
      <p>
        Back up every resume claim with a project people can open — see the <Link href="/learn/interview/portfolio">portfolio guide</Link>.
        Then practise talking about each bullet with the <Link href="/learn/interview/mock-interviews">mock interview guide</Link>.
      </p>
    </LearnLayout>
  )
}
