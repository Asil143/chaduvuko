'use client'

import { FormEvent, useRef, useState } from 'react'
import Link from 'next/link'

type ApplicationFormProps = {
  jobSlug: string
  jobTitle: string
}

type EmploymentEntry = {
  id: string
  employer: string
  title: string
  startDate: string
  endDate: string
  details: string
}

type ReviewItem = {
  label: string
  value: string
}

const APPLICATION_STEPS = [
  { title: 'Contact', description: 'Your details' },
  { title: 'Background', description: 'Education & work' },
  { title: 'Role fit', description: 'Skills & examples' },
  { title: 'Review', description: 'Check & submit' },
]

function displayValue(value: FormDataEntryValue | null) {
  return typeof value === 'string' && value.trim() ? value.trim() : 'Not provided'
}

export function ApplicationForm({ jobSlug, jobTitle }: ApplicationFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [step, setStep] = useState(0)
  const [employment, setEmployment] = useState<EmploymentEntry[]>([])
  const [review, setReview] = useState<ReviewItem[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function validateCurrentStep() {
    const form = formRef.current
    const section = form?.querySelector<HTMLElement>(`[data-application-step="${step}"]`)
    if (!section) return false
    const invalidField = section.querySelector<HTMLElement>('input:invalid, select:invalid, textarea:invalid')
    if (invalidField instanceof HTMLInputElement || invalidField instanceof HTMLSelectElement || invalidField instanceof HTMLTextAreaElement) {
      invalidField.reportValidity()
      return false
    }
    return true
  }

  function makeReview(form: HTMLFormElement) {
    const values = new FormData(form)
    const employmentCount = employment.filter(entry =>
      entry.employer.trim() || entry.title.trim() || entry.details.trim(),
    ).length
    setReview([
      { label: 'Email', value: displayValue(values.get('email')) },
      { label: 'Phone', value: displayValue(values.get('phone')) },
      { label: 'Location', value: displayValue(values.get('location')) },
      {
        label: 'Education',
        value: `${displayValue(values.get('highestQualification'))} · ${displayValue(values.get('fieldOfStudy'))} · ${displayValue(values.get('institution'))} (${displayValue(values.get('graduationYear'))})`,
      },
      { label: 'Relevant experience', value: `${displayValue(values.get('yearsExperience'))} years · ${employmentCount} work history ${employmentCount === 1 ? 'entry' : 'entries'}` },
      { label: 'Current or most recent role', value: displayValue(values.get('currentRole')) },
      { label: 'Engagement', value: displayValue(values.get('engagementPreference')) },
      { label: 'Technical skills', value: displayValue(values.get('skills')) },
      { label: 'Project evidence', value: displayValue(values.get('projectDetails')) },
      { label: 'Teaching approach', value: displayValue(values.get('teachingApproach')) },
      { label: 'Why this role', value: displayValue(values.get('motivation')) },
      {
        label: 'Resume',
        value: (() => {
          const resume = values.get('resume')
          return resume instanceof File && resume.size > 0 ? resume.name : 'No file attached'
        })(),
      },
    ])
  }

  function continueStep() {
    if (!validateCurrentStep()) return
    const nextStep = Math.min(step + 1, APPLICATION_STEPS.length - 1)
    if (nextStep === APPLICATION_STEPS.length - 1 && formRef.current) makeReview(formRef.current)
    setStep(nextStep)
    setError('')
    document.getElementById('application-title')?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  function previousStep() {
    setStep(current => Math.max(current - 1, 0))
    setError('')
    document.getElementById('application-title')?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  function addEmployment() {
    setEmployment(entries => [...entries, {
      id: crypto.randomUUID(),
      employer: '',
      title: '',
      startDate: '',
      endDate: '',
      details: '',
    }])
  }

  function updateEmployment(id: string, field: keyof Omit<EmploymentEntry, 'id'>, value: string) {
    setEmployment(entries => entries.map(entry => entry.id === id ? { ...entry, [field]: value } : entry))
  }

  function removeEmployment(id: string) {
    setEmployment(entries => entries.filter(entry => entry.id !== id))
  }

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validateCurrentStep()) return

    const form = event.currentTarget
    setSubmitting(true)
    setError('')
    setSuccess('')

    const payload = new FormData(form)
    payload.set('workHistory', JSON.stringify(employment.map(({ id: _id, ...entry }) => entry)))

    try {
      const response = await fetch('/api/careers/applications', {
        method: 'POST',
        body: payload,
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'We could not submit your application.')
      setSuccess(result.message)
      form.reset()
      setStep(0)
      setEmployment([])
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'We could not submit your application.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="apply" className="application-section" aria-labelledby="application-title">
      <div className="application-heading">
        <p className="application-eyebrow">YOUR NEXT STEP</p>
        <h2 id="application-title">Apply for {jobTitle}</h2>
        <p>Complete the application in a few focused steps. Your answers stay on this page until you submit.</p>
      </div>

      <ol className="application-stepper" aria-label="Application progress">
        {APPLICATION_STEPS.map((item, index) => (
          <li key={item.title} className={index === step ? 'is-current' : index < step ? 'is-complete' : ''} aria-current={index === step ? 'step' : undefined}>
            <span className="application-step-number">{index < step ? '✓' : String(index + 1).padStart(2, '0')}</span>
            <span className="application-step-copy">
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </span>
          </li>
        ))}
      </ol>

      <form ref={formRef} className="application-form" onSubmit={submitApplication} noValidate>
        <input type="hidden" name="jobSlug" value={jobSlug} />
        <input type="hidden" name="workHistory" value="" />
        <label className="application-honeypot" aria-hidden="true">
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <fieldset data-application-step="0" hidden={step !== 0}>
          <legend>Contact details</legend>
          <p className="application-step-intro">Start with the best way for our hiring team to reach you.</p>
          <div className="application-grid">
            <label>Full name <span>*</span><input name="fullName" required maxLength={120} autoComplete="name" /></label>
            <label>Email <span>*</span><input name="email" type="email" required maxLength={254} autoComplete="email" /></label>
            <label>Phone number <span>*</span><input name="phone" type="tel" required maxLength={40} autoComplete="tel" /></label>
            <label>City and country <span>*</span><input name="location" required maxLength={160} autoComplete="off" /></label>
          </div>
          <p className="application-field-note">We use these details only to review your application and contact you about this role.</p>
        </fieldset>

        <fieldset data-application-step="1" hidden={step !== 1}>
          <legend>Education and experience</legend>
          <p className="application-step-intro">Tell us about your education and the work most relevant to building AI applications.</p>
          <div className="application-subsection">
            <h3>Education</h3>
            <div className="application-grid">
              <label>Highest qualification <span>*</span><input name="highestQualification" required maxLength={120} placeholder="e.g. B.Tech, M.Sc, bootcamp" /></label>
              <label>Field of study <span>*</span><input name="fieldOfStudy" required maxLength={160} /></label>
              <label>Institution <span>*</span><input name="institution" required maxLength={200} /></label>
              <label>Graduation year <span>*</span><input name="graduationYear" type="number" required min="1950" max="2100" step="1" /></label>
            </div>
          </div>
          <div className="application-subsection">
            <h3>Professional experience</h3>
            <div className="application-grid">
              <label>Years of relevant experience <span>*</span><input name="yearsExperience" type="number" required min="0" max="60" step="1" /></label>
              <label>Current or most recent role<input name="currentRole" maxLength={160} /></label>
            </div>
            <div className="application-history-heading">
              <div>
                <h4>Relevant work history</h4>
                <p>Add roles that show relevant engineering, AI, or teaching experience. This section is optional.</p>
              </div>
              <button className="application-add-button" type="button" onClick={addEmployment} disabled={employment.length >= 20}>
                {employment.length >= 20 ? '20 positions added' : '+ Add position'}
              </button>
            </div>
            {employment.length === 0 ? (
              <p className="application-history-empty">No positions added. You can continue and describe relevant projects in the next step.</p>
            ) : employment.map((entry, index) => (
              <div className="application-employment-card" key={entry.id}>
                <div className="application-employment-heading">
                  <strong>Position {index + 1}</strong>
                  <button type="button" className="application-remove-button" onClick={() => removeEmployment(entry.id)}>Remove</button>
                </div>
                <div className="application-grid">
                  <label>Employer or organization <span>*</span><input required maxLength={160} value={entry.employer} onChange={event => updateEmployment(entry.id, 'employer', event.target.value)} /></label>
                  <label>Job title <span>*</span><input required maxLength={160} value={entry.title} onChange={event => updateEmployment(entry.id, 'title', event.target.value)} /></label>
                  <label>Start month<input type="month" value={entry.startDate} onChange={event => updateEmployment(entry.id, 'startDate', event.target.value)} /></label>
                  <label>End month <span className="application-optional">(leave blank if current)</span><input type="month" value={entry.endDate} onChange={event => updateEmployment(entry.id, 'endDate', event.target.value)} /></label>
                </div>
                <label>Relevant responsibilities or outcomes<textarea value={entry.details} onChange={event => updateEmployment(entry.id, 'details', event.target.value)} maxLength={1500} rows={3} placeholder="Briefly describe your work, contribution, or impact." /></label>
              </div>
            ))}
            <label>Certifications or relevant training <span className="application-optional">Optional</span><textarea name="certifications" maxLength={1500} rows={3} placeholder="List relevant certifications, courses, or professional training." /></label>
          </div>
        </fieldset>

        <fieldset data-application-step="2" hidden={step !== 2}>
          <legend>Skills and role fit</legend>
          <p className="application-step-intro">Use specific examples. We want to understand how you think, build, and teach—not just which tools you have used.</p>
          <div className="application-grid">
            <label>Preferred engagement <span>*</span>
              <select name="engagementPreference" required defaultValue="">
                <option value="" disabled>Select one</option>
                <option value="contract">Contract / milestone-based</option>
                <option value="part-time">Part-time</option>
                <option value="full-time">Full-time</option>
              </select>
            </label>
            <label>Availability to start <span className="application-optional">Optional</span><input name="availability" maxLength={160} placeholder="e.g. 2 weeks, immediately" /></label>
            <label>Expected compensation <span className="application-optional">Optional</span><input name="compensationExpectation" maxLength={160} placeholder="Range and preferred basis" /></label>
          </div>
          <label>Relevant technical skills <span>*</span><textarea name="skills" required maxLength={2000} rows={4} placeholder="Include agent frameworks, LLMs, APIs, RAG, evaluation, deployment, and other relevant skills." /></label>
          <label>Describe an AI or software system you helped build <span>*</span><textarea name="projectDetails" required maxLength={4000} rows={5} placeholder="What problem did it solve? What did you personally build? Describe one important design decision, challenge, or result." /></label>
          <div className="application-grid">
            <label>GitHub URL <span className="application-optional">Optional</span><input name="githubUrl" type="url" maxLength={500} placeholder="https://" /></label>
            <label>LinkedIn URL <span className="application-optional">Optional</span><input name="linkedinUrl" type="url" maxLength={500} placeholder="https://" /></label>
            <label>Portfolio URL <span className="application-optional">Optional</span><input name="portfolioUrl" type="url" maxLength={500} placeholder="https://" /></label>
            <label>Other project links <span className="application-optional">Optional</span><textarea name="projectLinks" maxLength={1200} rows={3} placeholder="One https:// URL per line" /></label>
          </div>
          <label>How would you teach one technical concept to a beginner? <span>*</span><textarea name="teachingApproach" required maxLength={2500} rows={4} placeholder="Choose a topic, describe the example or demonstration you would use, and explain how you would check learner understanding." /></label>
          <label>Teaching sample, video, or article URL <span className="application-optional">Optional</span><input name="teachingSampleUrl" type="url" maxLength={500} placeholder="https://" /></label>
          <label>Why are you interested in this role? <span>*</span><textarea name="motivation" required maxLength={3000} rows={4} /></label>
        </fieldset>

        <fieldset data-application-step="3" hidden={step !== 3}>
          <legend>Review and submit</legend>
          <p className="application-step-intro">Review your key details, attach a resume if you have one, and submit your application.</p>
          <dl className="application-review">
            {review.map(item => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
          <label className="application-resume-label">Resume or CV <span className="application-optional">Optional · PDF, DOC, or DOCX · max 5 MB</span>
            <input name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
          </label>
          <label className="application-consent">
            <input type="checkbox" name="consent" value="yes" required />
            <span>I agree that Chaduvuko may use the information I submit to assess my application for this role and contact me about the hiring process. <Link href="/privacy" target="_blank">Privacy information</Link>. <strong>*</strong></span>
          </label>
          <p className="application-privacy">Do not include identity documents, bank details, or other sensitive information. A resume and teaching sample are optional; you may submit without them.</p>
        </fieldset>

        {error && <p className="application-message application-error" role="alert">{error}</p>}
        {success && <p className="application-message application-success" role="status">{success}</p>}
        <div className="application-actions">
          {step > 0 && <button className="application-back-button" type="button" onClick={previousStep}>Back</button>}
          {step < APPLICATION_STEPS.length - 1 ? (
            <button className="job-apply application-submit" type="button" onClick={continueStep}>Continue <span aria-hidden="true">→</span></button>
          ) : (
            <button className="job-apply application-submit" type="submit" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit application'}
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
