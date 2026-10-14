import { NextRequest, NextResponse } from 'next/server'
import { getCareerRole } from '@/data/careers'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

const MAX_RESUME_SIZE = 5 * 1024 * 1024
const RESUME_BUCKET = 'career-applications'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ALLOWED_RESUME_TYPES = new Map([
  ['application/pdf', 'pdf'],
  ['application/msword', 'doc'],
  ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'docx'],
])

function field(form: FormData, name: string, maxLength = 2000) {
  const value = form.get(name)
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export async function POST(req: NextRequest) {
  const contentLength = Number(req.headers.get('content-length'))
  if (Number.isFinite(contentLength) && contentLength > MAX_RESUME_SIZE + 64 * 1024)
    return NextResponse.json({ error: 'The application is too large. Keep your resume under 5 MB.' }, { status: 413 })

  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Could not read the application form.' }, { status: 400 })
  }

  if (field(form, 'website', 200)) return NextResponse.json({ ok: true })

  const jobSlug = field(form, 'jobSlug', 100)
  const role = getCareerRole(jobSlug)
  const fullName = field(form, 'fullName', 120)
  const email = field(form, 'email', 254).toLowerCase()
  const phone = field(form, 'phone', 40)
  const location = field(form, 'location', 160)
  const highestQualification = field(form, 'highestQualification', 120)
  const fieldOfStudy = field(form, 'fieldOfStudy', 160)
  const institution = field(form, 'institution', 200)
  const graduationYear = field(form, 'graduationYear', 4)
  const yearsExperience = field(form, 'yearsExperience', 4)
  const currentRole = field(form, 'currentRole', 160)
  const certifications = field(form, 'certifications', 1500)
  const rawWorkHistory = field(form, 'workHistory', 20000)
  const engagementPreference = field(form, 'engagementPreference', 40)
  const availability = field(form, 'availability', 160)
  const compensationExpectation = field(form, 'compensationExpectation', 160)
  const skills = field(form, 'skills')
  const projectDetails = field(form, 'projectDetails')
  const teachingApproach = field(form, 'teachingApproach', 2500)
  const projectLinks = field(form, 'projectLinks', 1200)
  const githubUrl = field(form, 'githubUrl', 500)
  const linkedinUrl = field(form, 'linkedinUrl', 500)
  const portfolioUrl = field(form, 'portfolioUrl', 500)
  const teachingSampleUrl = field(form, 'teachingSampleUrl', 500)
  const motivation = field(form, 'motivation')
  const consent = field(form, 'consent', 10)
  const resume = form.get('resume')

  if (!role) return NextResponse.json({ error: 'This job opening is not available.' }, { status: 400 })
  if (!fullName || !EMAIL_RE.test(email) || !phone || !location)
    return NextResponse.json({ error: 'Enter your name, a valid email, phone number, and location.' }, { status: 400 })
  if (
    !highestQualification ||
    !fieldOfStudy ||
    !institution ||
    !/^\d{4}$/.test(graduationYear) ||
    Number(graduationYear) < 1950 ||
    Number(graduationYear) > 2100
  )
    return NextResponse.json({ error: 'Complete your education details and enter a four-digit graduation year.' }, { status: 400 })
  if (!/^\d{1,2}$/.test(yearsExperience) || Number(yearsExperience) > 60)
    return NextResponse.json({ error: 'Enter a valid number of years of relevant experience.' }, { status: 400 })
  if (!['contract', 'part-time', 'full-time'].includes(engagementPreference))
    return NextResponse.json({ error: 'Choose a valid engagement preference.' }, { status: 400 })
  if (!skills || !projectDetails || !teachingApproach || !motivation || consent !== 'yes')
    return NextResponse.json({ error: 'Complete the required role questions and privacy consent.' }, { status: 400 })

  const optionalUrls = [githubUrl, linkedinUrl, portfolioUrl, teachingSampleUrl]
  if (optionalUrls.some(url => url && !/^https:\/\/\S+$/i.test(url)))
    return NextResponse.json({ error: 'Optional profile and sample links must be secure https:// URLs.' }, { status: 400 })

  const projectLinkList = projectLinks.split(/\r?\n/).map(link => link.trim()).filter(Boolean)
  if (projectLinkList.some(link => !/^https:\/\/\S+$/i.test(link)))
    return NextResponse.json({ error: 'Project links must be secure https:// URLs, one per line.' }, { status: 400 })

  let workHistory: {
    employer: string
    title: string
    startDate: string
    endDate: string
    details: string
  }[]
  try {
    const parsed: unknown = JSON.parse(rawWorkHistory || '[]')
    if (!Array.isArray(parsed) || parsed.length > 20) throw new Error('Invalid work history')
    workHistory = parsed.map(entry => {
      if (!entry || typeof entry !== 'object') throw new Error('Invalid work history entry')
      const record = entry as Record<string, unknown>
      const employer = typeof record.employer === 'string' ? record.employer.trim().slice(0, 160) : ''
      const title = typeof record.title === 'string' ? record.title.trim().slice(0, 160) : ''
      const startDate = typeof record.startDate === 'string' ? record.startDate.trim() : ''
      const endDate = typeof record.endDate === 'string' ? record.endDate.trim() : ''
      const details = typeof record.details === 'string' ? record.details.trim().slice(0, 1500) : ''
      if (!employer || !title) throw new Error('Each work history entry needs an employer and job title.')
      if ((startDate && !/^\d{4}-(0[1-9]|1[0-2])$/.test(startDate)) ||
          (endDate && !/^\d{4}-(0[1-9]|1[0-2])$/.test(endDate)) ||
          (startDate && endDate && endDate < startDate))
        throw new Error('Enter valid work history dates.')
      return { employer, title, startDate, endDate, details }
    })
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error && error.message !== 'Invalid work history' && error.message !== 'Invalid work history entry'
        ? error.message
        : 'Enter valid work history details.',
    }, { status: 400 })
  }

  let resumePath: string | null = null
  if (resume instanceof File && resume.size > 0) {
    const extension = ALLOWED_RESUME_TYPES.get(resume.type)
    if (!extension || resume.size > MAX_RESUME_SIZE)
      return NextResponse.json({ error: 'Upload a PDF, DOC, or DOCX resume no larger than 5 MB.' }, { status: 400 })

    resumePath = `${crypto.randomUUID()}.${extension}`
    const { error } = await supabaseAdmin.storage
      .from(RESUME_BUCKET)
      .upload(resumePath, new Uint8Array(await resume.arrayBuffer()), {
        contentType: resume.type,
        upsert: false,
      })
    if (error) {
      console.error('Career application resume upload failed:', error.message)
      return NextResponse.json({ error: 'We could not save your resume. Please try again.' }, { status: 500 })
    }
  }

  const { error } = await supabaseAdmin.from('career_applications').insert({
    job_slug: jobSlug,
    job_title: role.title,
    full_name: fullName,
    email,
    phone,
    location,
    highest_qualification: highestQualification,
    field_of_study: fieldOfStudy,
    institution,
    graduation_year: Number(graduationYear),
    years_experience: Number(yearsExperience),
    current_position: currentRole || null,
    work_history: workHistory,
    certifications: certifications || null,
    engagement_preference: engagementPreference,
    availability: availability || null,
    compensation_expectation: compensationExpectation || null,
    skills,
    project_details: projectDetails,
    teaching_approach: teachingApproach,
    project_links: projectLinks || null,
    github_url: githubUrl || null,
    linkedin_url: linkedinUrl || null,
    portfolio_url: portfolioUrl || null,
    teaching_sample_url: teachingSampleUrl || null,
    motivation,
    resume_path: resumePath,
  })

  if (error) {
    if (resumePath) {
      const { error: cleanupError } = await supabaseAdmin.storage.from(RESUME_BUCKET).remove([resumePath])
      if (cleanupError) console.error('Career application resume cleanup failed:', cleanupError.message)
    }
    console.error('Career application save failed:', error.message)
    return NextResponse.json({ error: 'We could not submit your application. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, message: `Your application was submitted. We will review it and contact you at ${email}.` })
}

export async function GET(req: NextRequest) {
  if (req.headers.get('x-admin-key') !== process.env.ADMIN_SECRET)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('career_applications')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Career applications retrieval failed:', error.message)
    return NextResponse.json({ error: 'Could not load applications.' }, { status: 500 })
  }

  try {
    const applications = await Promise.all((data || []).map(async application => {
      if (!application.resume_path) return { ...application, resume_url: null }
      const { data: signed, error: signedUrlError } = await supabaseAdmin.storage
        .from(RESUME_BUCKET)
        .createSignedUrl(application.resume_path, 60 * 60)
      if (signedUrlError) throw signedUrlError
      return { ...application, resume_url: signed.signedUrl }
    }))
    return NextResponse.json({ applications })
  } catch (error) {
    console.error('Career application resume link creation failed:', error)
    return NextResponse.json({ error: 'Could not prepare application attachments.' }, { status: 500 })
  }
}
