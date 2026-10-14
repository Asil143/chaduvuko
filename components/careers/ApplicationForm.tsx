'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'

type ApplicationFormProps = {
  jobSlug: string
  jobTitle: string
}

export function ApplicationForm({ jobSlug, jobTitle }: ApplicationFormProps) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/careers/applications', {
        method: 'POST',
        body: new FormData(form),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'We could not submit your application.')
      setSuccess(result.message)
      form.reset()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'We could not submit your application.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="apply" className="application-section" aria-labelledby="application-title">
      <h2 id="application-title">Apply for {jobTitle}</h2>
      <p>Share the details below so we can review your fit for this role. Fields marked required must be completed.</p>
      <form className="application-form" onSubmit={submitApplication}>
        <input type="hidden" name="jobSlug" value={jobSlug} />
        <label className="application-honeypot" aria-hidden="true">
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <fieldset>
          <legend>Contact details</legend>
          <div className="application-grid">
            <label>Full name <span>*</span><input name="fullName" required maxLength={120} autoComplete="name" /></label>
            <label>Email <span>*</span><input name="email" type="email" required maxLength={254} autoComplete="email" /></label>
            <label>Phone number <span>*</span><input name="phone" type="tel" required maxLength={40} autoComplete="tel" /></label>
            <label>City and country <span>*</span><input name="location" required maxLength={160} autoComplete="off" /></label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Education</legend>
          <div className="application-grid">
            <label>Highest qualification <span>*</span><input name="highestQualification" required maxLength={120} placeholder="e.g. B.Tech, M.Sc, bootcamp" /></label>
            <label>Field of study <span>*</span><input name="fieldOfStudy" required maxLength={160} /></label>
            <label>Institution <span>*</span><input name="institution" required maxLength={200} /></label>
            <label>Graduation year <span>*</span><input name="graduationYear" type="number" required min="1950" max="2100" step="1" /></label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Experience and role fit</legend>
          <div className="application-grid">
            <label>Years of relevant experience <span>*</span><input name="yearsExperience" type="number" required min="0" max="60" step="1" /></label>
            <label>Current or most recent role<input name="currentRole" maxLength={160} /></label>
            <label>Preferred engagement <span>*</span>
              <select name="engagementPreference" required defaultValue="">
                <option value="" disabled>Select one</option>
                <option value="contract">Contract / milestone-based</option>
                <option value="part-time">Part-time</option>
                <option value="full-time">Full-time</option>
              </select>
            </label>
            <label>Availability to start<input name="availability" maxLength={160} placeholder="e.g. 2 weeks, immediately" /></label>
            <label>Expected compensation<input name="compensationExpectation" maxLength={160} placeholder="Range and preferred basis" /></label>
          </div>
          <label>Relevant technical skills <span>*</span><textarea name="skills" required maxLength={2000} rows={4} placeholder="Include agent frameworks, LLMs, APIs, RAG, evaluation, deployment, and other relevant skills." /></label>
          <label>Relevant projects and your contribution <span>*</span><textarea name="projectDetails" required maxLength={4000} rows={5} placeholder="Describe what you built, your specific contribution, and the technical decisions or outcomes." /></label>
          <label>Project links<textarea name="projectLinks" maxLength={1200} rows={3} placeholder="One URL per line" /></label>
          <div className="application-grid">
            <label>GitHub URL<input name="githubUrl" type="url" maxLength={500} placeholder="https://" /></label>
            <label>LinkedIn URL<input name="linkedinUrl" type="url" maxLength={500} placeholder="https://" /></label>
            <label>Portfolio URL<input name="portfolioUrl" type="url" maxLength={500} placeholder="https://" /></label>
            <label>Teaching sample, video, or article URL<input name="teachingSampleUrl" type="url" maxLength={500} placeholder="Optional — https://" /></label>
          </div>
          <label>Resume (PDF, DOC, or DOCX; max 5 MB)
            <input name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
          </label>
          <label>Why are you interested in this role? <span>*</span><textarea name="motivation" required maxLength={3000} rows={4} /></label>
        </fieldset>

        <label className="application-consent">
          <input type="checkbox" name="consent" value="yes" required />
          <span>I agree that Chaduvuko may use the information I submit to assess my application for this role and contact me about the hiring process. <Link href="/privacy" target="_blank">Privacy information</Link>. <strong>*</strong></span>
        </label>

        {error && <p className="application-message application-error" role="alert">{error}</p>}
        {success && <p className="application-message application-success" role="status">{success}</p>}
        <button className="job-apply application-submit" type="submit" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit application'}
        </button>
      </form>
      <p className="application-privacy">Please do not include identity documents, bank details, or other sensitive information. A teaching sample is optional; you can apply without one.</p>
    </section>
  )
}
