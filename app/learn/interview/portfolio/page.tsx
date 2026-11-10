import type { Metadata } from 'next'
import Link from 'next/link'
import { LearnLayout } from '@/components/content/LearnLayout'
import { sectionTitle } from '@/lib/site-title'

export const metadata: Metadata = {
  title: sectionTitle('Portfolio and Projects Guide — Prove You Can Do the Job'),
  description: 'Choose, build, and present portfolio projects that hiring managers open: project selection by role, README template, GitHub hygiene, and demos.',
  alternates: { canonical: '/learn/interview/portfolio' },
}

export default function PortfolioGuidePage() {
  return (
    <LearnLayout
      title="Portfolio and Projects Guide — Prove You Can Do the Job"
      description="Certificates say you studied. Projects show you can build. This guide covers which projects to build for your target role and how to present them so a reviewer understands them in two minutes."
      section="Career prep"
      readTime="15 min"
      updatedAt="November 2026"
      breadcrumbs={[
        { label: 'Career prep', href: '/learn/interview' },
        { label: 'Portfolio', href: '/learn/interview/portfolio' },
      ]}
    >
      <h2>Two or three strong projects beat ten tutorials</h2>
      <p>
        Reviewers rarely look at more than two projects. A small number of complete, well-explained projects that look like real work
        will do more for you than a long list of tutorial clones. Aim for:
      </p>
      <ul>
        <li><strong>One flagship project</strong> — end to end, deployed or runnable, close to the job you want. Your career path capstone is designed for this.</li>
        <li><strong>One or two supporting projects</strong> — each showing a different skill (for example streaming, evaluation, infrastructure as code, or a polished UI).</li>
      </ul>

      <h2>What to build for your role</h2>
      <ul>
        <li><strong>AI / Generative AI engineer</strong> — a RAG assistant with citations and an evaluation set; a tool-using agent with human approval. See the <Link href="/learn/generative-ai/genai-capstone-rag-assistant">RAG capstone</Link> and <Link href="/learn/agentic-ai/agent-capstone-support-agent">agent capstone</Link>.</li>
        <li><strong>Data engineer</strong> — a batch plus streaming pipeline with orchestration, data quality checks, and a dashboard. See the <Link href="/learn/data-engineering/data-engineering-capstone">data engineering capstone</Link>.</li>
        <li><strong>Data analyst / scientist</strong> — an analysis of a real public dataset with a clear question, SQL, a model or experiment, and a written recommendation.</li>
        <li><strong>Full-stack / backend / frontend</strong> — a deployed app with authentication, a database, tests, and CI. See the <Link href="/learn/full-stack-ai/full-stack-capstone">full-stack capstone</Link>.</li>
        <li><strong>Cloud / DevOps / SRE</strong> — an app deployed with Terraform, containers, CI/CD, and monitoring dashboards. See the <Link href="/learn/devops-mlops/devops-capstone">DevOps capstone</Link>.</li>
        <li><strong>Security</strong> — a home lab write-up with detections, or a red-team report on a sample LLM app.</li>
      </ul>

      <h2>The README is the project</h2>
      <p>Most reviewers read the README and never open the code. Use this outline:</p>
      <ol>
        <li><strong>One-line summary</strong> — what it does and for whom.</li>
        <li><strong>Demo</strong> — live link, screenshots, or a 2-minute video.</li>
        <li><strong>Architecture</strong> — a diagram and a short explanation of the data or request flow.</li>
        <li><strong>Tech stack and why</strong> — the choices you made and the alternatives you rejected.</li>
        <li><strong>How to run it</strong> — copy-paste setup steps that actually work.</li>
        <li><strong>Results</strong> — numbers: latency, accuracy, rows processed, cost, test coverage.</li>
        <li><strong>What I would do next</strong> — honest limits and improvements. This shows engineering judgement.</li>
      </ol>

      <h2>GitHub hygiene</h2>
      <ul>
        <li>Pin your best repositories on your profile and write a short profile README.</li>
        <li>Never commit secrets. Use environment variables and a <code>.env.example</code> file.</li>
        <li>Meaningful commit messages and a clean folder structure — reviewers notice.</li>
        <li>Add basic tests and a CI workflow so the green check mark is visible.</li>
      </ul>

      <h2>Show your work in public</h2>
      <ul>
        <li>Write a short post about one hard problem you solved in each project.</li>
        <li>Share a demo video on LinkedIn with what you learned — not just &ldquo;I built X&rdquo;.</li>
        <li>Contribute small fixes to open-source tools you use; they make strong resume bullets.</li>
      </ul>

      <h2>Next steps</h2>
      <p>
        Put your projects on your <Link href="/learn/interview/resume">resume</Link>, then practise explaining each one in three
        minutes using the <Link href="/learn/interview/mock-interviews">mock interview guide</Link>.
      </p>
    </LearnLayout>
  )
}
