import Link from 'next/link'

export const metadata = {
  title: 'About Asil Kamepalli — Data Engineer',
  description: 'MS in Information Studies (4.0 GPA) · B.Tech CSE · Azure Certified · 5 production Azure ADF pipelines. Open to Data Engineer roles.',
}

const education = [
  {
    degree: 'Master of Science — Information Studies',
    school: 'Trine University, USA',
    year: '2022 – 2024',
    gpa: '4.0 / 4.0',
    badge: 'Perfect GPA',
    badgeColor: '#00e676',
    courses: ['Advanced Database', 'Data Science & Big Data', 'Data Mining & Data Visualization', 'Statistics & Quantitative Methods', 'Object Oriented Programming in Java', 'Cybersecurity', 'Network Management', 'Project Management'],
    color: '#00e676',
  },
  {
    degree: 'B.Tech — Computer Science & Engineering',
    school: 'Parul University, India',
    year: '2018 – 2022',
    gpa: '7.11 / 10',
    badge: 'First Class with Distinction',
    badgeColor: '#0078d4',
    courses: ['Data Mining', 'Data Science', 'Database Management System', 'Python Programming', 'Artificial Intelligence', 'Data Structures & Algorithms', 'Computer Networks', 'Software Engineering', 'Object Oriented Programming'],
    color: '#0078d4',
  },
]

const certifications = [
  {
    name: 'Microsoft Certified: Azure Data Fundamentals',
    issuer: 'Microsoft',
    issued: 'Dec 2025',
    credentialId: '28D73DF5699FDA34',
    icon: '☁️',
    color: '#0078d4',
    featured: true,
    desc: 'Validates core knowledge of Azure data services including Azure SQL, Cosmos DB, Azure Synapse Analytics, and Azure Data Factory. The official Microsoft certification confirming cloud data fundamentals.',
    verifyUrl: 'https://learn.microsoft.com/en-us/users/asilkamepalli-9260/credentials/28d73df5699fda34',
  },
  {
    name: 'Microsoft Power BI Data Analyst',
    issuer: 'Microsoft',
    issued: 'May 2025',
    credentialId: 'U4AORKA2JOA9',
    icon: '📊',
    color: '#0078d4',
    featured: false,
    verifyUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/U4AORKA2JOA9',
  },
  {
    name: 'Introduction to Data Engineering',
    issuer: 'IBM',
    issued: 'Sep 2025',
    credentialId: 'DB2AUG40Y5IR',
    icon: '🔧',
    color: '#7b61ff',
    featured: false,
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/DB2AUG40Y5IR',
  },
  {
    name: 'Data Warehouse Fundamentals',
    issuer: 'IBM',
    issued: 'Nov 2025',
    credentialId: 'FMEJZ54MD2EI',
    icon: '🏛️',
    color: '#7b61ff',
    featured: false,
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/FMEJZ54MD2EI',
  },
  {
    name: 'Relational Database Administration (DBA)',
    issuer: 'IBM',
    issued: 'Oct 2025',
    credentialId: 'RRADGH9JAV0E',
    icon: '🗄️',
    color: '#7b61ff',
    featured: false,
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/RRADGH9JAV0E',
  },
  {
    name: 'Google Data Analytics',
    issuer: 'Google',
    issued: 'Jun 2025',
    credentialId: 'K1VS6S4HBPFN',
    icon: '🔵',
    color: '#4285f4',
    featured: false,
    verifyUrl: 'https://www.coursera.org/account/accomplishments/specialization/K1VS6S4HBPFN',
  },
]

// FIX #5 — only DE-relevant skills, Java and TypeScript/Next.js removed
const skills = [
  {
    category: '☁️ Cloud Platforms',
    color: '#0078d4',
    items: [
      { name: 'Azure Data Factory',    level: 85 },
      { name: 'Azure Data Lake Gen2',  level: 85 },
      { name: 'Azure Blob Storage',    level: 80 },
      { name: 'Azure Databricks',      level: 60 },
      { name: 'AWS S3 / Glue',         level: 55 },
      { name: 'GCP BigQuery',          level: 45 },
    ],
  },
  {
    category: '💻 Programming & DB',
    color: '#7b61ff',
    items: [
      { name: 'Python (Pandas, PySpark)',  level: 75 },
      { name: 'SQL / PostgreSQL',          level: 80 },
      { name: 'MySQL',                     level: 75 },
      { name: 'Google BigQuery (SQL)',      level: 55 },
    ],
  },
  {
    category: '🔧 Data Engineering',
    color: '#ff9900',
    items: [
      { name: 'Medallion Architecture',    level: 80 },
      { name: 'ETL / Pipeline Design',     level: 80 },
      { name: 'Data Modeling',             level: 75 },
      { name: 'Data Warehousing',          level: 70 },
      { name: 'Power BI (DAX)',            level: 70 },
      { name: 'Delta Lake',                level: 55 },
    ],
  },
]

// FIX #6 — all 5 live projects added
const projects = [
  {
    num: '01',
    title: 'Copy a CSV File to Azure Data Lake',
    desc: 'Built a complete ADF pipeline from scratch — linked services, datasets, Copy activity, and ADLS Gen2 sink.',
    tags: ['ADF', 'ADLS Gen2', 'Blob Storage'],
    href: '/learn/projects/azure-batch-pipeline',
    color: '#0078d4',
  },
  {
    num: '02',
    title: 'Copy Multiple Files Using ForEach Loop',
    desc: 'Replaced 10 separate Copy activities with a single parameterized ForEach loop — 90% less pipeline complexity.',
    tags: ['ADF', 'ForEach', 'Dynamic Expressions'],
    href: '/learn/projects/azure-projects-02',
    color: '#0078d4',
  },
  {
    num: '03',
    title: 'Parameterized Pipeline with Run Date',
    desc: 'Pass run_date at trigger time — ADF expressions auto-construct file paths, enabling fully automated daily ingestion.',
    tags: ['ADF', 'Parameters', 'Schedule Trigger'],
    href: '/learn/projects/azure-project-03',
    color: '#0078d4',
  },
  {
    num: '04',
    title: 'HTTP Ingestion — Download from a Public URL',
    desc: 'Ingest external CSV data from public HTTP endpoints directly into ADLS Gen2 using a dynamic HTTP linked service.',
    tags: ['ADF', 'HTTP Ingestion', 'ADLS Gen2'],
    href: '/learn/projects/azure-project-04',
    color: '#0078d4',
  },
  {
    num: '05',
    title: 'Organize Files With Date Stamps',
    desc: 'Automated date-stamped folder partitioning using Get Metadata + ForEach + Copy + Delete activity chains.',
    tags: ['ADF', 'Get Metadata', 'File Management'],
    href: '/learn/projects/azure-project-05',
    color: '#0078d4',
  },
  {
    num: '06',
    title: 'Chaduvuko Learning Platform',
    desc: 'Built and deployed a full-stack DE learning platform from scratch covering Azure, AWS, and GCP tracks.',
    tags: ['Next.js', 'TypeScript', 'Vercel', 'Tailwind'],
    href: 'https://chaduvuko.com',
    color: '#00e676',
  },
]

const timeline = [
  { year: '2016', event: 'SSC — GPA 9.3/10',                         detail: 'Board of Secondary Education, Andhra Pradesh',                        color: 'var(--muted)' },
  { year: '2018', event: 'Intermediate — A Grade',                    detail: 'NRI Vidya Junior College, Guntur · 906/1000',                          color: 'var(--muted)' },
  { year: '2022', event: 'B.Tech CSE — First Class with Distinction', detail: 'Parul University · CGPA 7.11/10',                                      color: '#0078d4'      },
  { year: '2022', event: 'Moved to USA for Masters',                  detail: 'Trine University, Indiana',                                            color: '#7b61ff'      },
  { year: '2024', event: 'MS Information Studies — 4.0 GPA',         detail: 'Trine University · Perfect GPA · Dec 2024',                            color: '#00e676'      },
  { year: '2025', event: '6 Industry Certifications Earned',          detail: 'Microsoft Azure, Power BI · IBM Data Engineering · Google Analytics',  color: '#ff9900'      },
  { year: '2025', event: 'Built chaduvuko.com',                detail: '5 production Azure ADF pipelines — documented and publicly deployed',  color: '#00e676'      },
  { year: 'Now',  event: 'Open to Data Engineer Roles',               detail: 'Azure · Cloud · Entry Level / Junior · El Centro, CA',                 color: 'var(--accent)'},
]

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* ── Hero ── */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
            // About
          </div>
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div
              className="w-24 h-24 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl font-bold font-display"
              style={{ background: 'linear-gradient(135deg, #0078d4 0%, #7b61ff 100%)', color: '#fff' }}
            >
              AK
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold font-display mb-1" style={{ color: 'var(--text)' }}>
                Asil Kamepalli
              </h1>
              {/* FIX #1 — "Aspiring" removed */}
              <p className="text-base font-mono mb-3" style={{ color: 'var(--accent)' }}>
                Data Engineer · Azure Certified · Open to Opportunities
              </p>
              <p className="text-sm max-w-2xl mb-4" style={{ color: 'var(--text2)', lineHeight: 1.8 }}>
                B.Tech in Computer Science · MS in Information Studies from Trine University, USA (4.0 GPA) ·
                Microsoft Azure Data Fundamentals certified · 6 industry certifications across Microsoft, IBM, and Google.
                I build real data pipelines on Azure and document everything I learn — because the best way to
                master a skill is to teach it.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {[
                  { label: 'MS — 4.0 GPA',              color: '#00e676' },
                  { label: 'B.Tech CSE — Distinction',  color: '#0078d4' },
                  { label: 'Azure Certified ✓',         color: '#0078d4' },
                  // FIX #10 — ✓ added to certifications badge
                  { label: '6 Certifications ✓',        color: '#ff9900' },
                  { label: 'Open to Work',              color: '#00e676' },
                ].map(b => (
                  <span
                    key={b.label}
                    className="text-xs px-3 py-1 rounded-full font-mono font-semibold"
                    style={{ background: b.color + '15', color: b.color, border: `1px solid ${b.color}40` }}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/asil-kamepalli-095157197/"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                  style={{ background: '#0078d420', color: '#50b0ff', border: '1px solid #0078d440' }}
                >
                  LinkedIn →
                </a>
                <Link
                  href="/learn/projects"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                  style={{ background: '#00e67615', color: '#00e676', border: '1px solid #00e67630' }}
                >
                  View Projects →
                </Link>
                {/* FIX #2 — consistent email */}
                <a
                  href="mailto:asilkamepalli9@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                  style={{ background: 'var(--surface)', color: 'var(--text2)', border: '1px solid var(--border)' }}
                >
                  Email Me →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">

        {/* ── Why Me ── */}
        <section>
          <div className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: 'var(--muted)' }}>// Why Me</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '🏗️', title: 'Builder Mentality',     color: '#0078d4', desc: "I don't just study tools — I build with them. Every Azure project on this site is hands-on, real cloud infrastructure, fully documented." },
              { icon: '🎯', title: 'Problem-First Thinking', color: '#7b61ff', desc: 'In the AI era, knowing what to solve matters more than how to solve it. I focus on root cause analysis before reaching for a solution.' },
              { icon: '🤖', title: 'AI-Augmented',           color: '#ff9900', desc: 'Expert at leveraging AI tools to accelerate learning, debug problems, and build faster. This entire platform was built using AI as a co-pilot.' },
              { icon: '📚', title: 'Teach to Learn',         color: '#00e676', desc: 'Built chaduvuko.com — a free centralised DE learning platform covering Azure, AWS, and GCP. If I can explain it, I truly understand it.' },
            ].map(c => (
              <div key={c.title} className="p-5 rounded-xl" style={{ background: 'var(--surface)', border: `1px solid ${c.color}25` }}>
                <div className="text-2xl mb-3">{c.icon}</div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--text)' }}>{c.title}</h3>
                <p className="text-xs" style={{ color: 'var(--text2)', lineHeight: 1.7 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Certifications ── */}
        <section>
          <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>
            // Certifications
          </div>
          <p className="text-sm mb-6" style={{ color: 'var(--text2)' }}>
            6 industry certifications across Microsoft, IBM, and Google — all earned in 2025. Each one is verifiable.
          </p>

          {/* Featured cert */}
          <div className="mb-4 p-5 rounded-xl" style={{ background: 'var(--surface)', border: '2px solid #0078d440' }}>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: '#0078d420', border: '1px solid #0078d440' }}>☁️</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <h3 className="font-bold text-sm" style={{ color: 'var(--text)' }}>
                    Microsoft Certified: Azure Data Fundamentals
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full font-mono font-bold"
                    style={{ background: '#0078d420', color: '#50b0ff', border: '1px solid #0078d440' }}>
                    ★ Featured
                  </span>
                </div>
                <p className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
                  Microsoft · Issued Dec 2025 · Credential ID: 28D73DF5699FDA34
                </p>
              </div>
              <a
                href="https://learn.microsoft.com/en-us/users/asilkamepalli-9260/credentials/28d73df5699fda34"
                target="_blank" rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold"
                style={{ background: '#0078d420', color: '#50b0ff', border: '1px solid #0078d440', whiteSpace: 'nowrap' }}
              >
                Verify ↗
              </a>
            </div>
            <p className="text-xs" style={{ color: 'var(--text2)', lineHeight: 1.6 }}>
              Validates core knowledge of Azure data services including Azure SQL, Cosmos DB, Azure Synapse Analytics,
              and Azure Data Factory. The official Microsoft certification confirming cloud data fundamentals.
            </p>
          </div>

          {/* Rest of certs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certifications.filter(c => !c.featured).map(cert => (
              <div key={cert.name} className="p-4 rounded-xl"
                style={{ background: 'var(--surface)', border: `1px solid ${cert.color}25` }}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                    style={{ background: cert.color + '20', border: `1px solid ${cert.color}40` }}>
                    {cert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-xs mb-0.5" style={{ color: 'var(--text)' }}>{cert.name}</h3>
                    <p className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{cert.issuer} · {cert.issued}</p>
                    <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--border)' }}>ID: {cert.credentialId}</p>
                    <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-xs font-mono font-semibold"
                      style={{ color: cert.color, textDecoration: 'none' }}>
                      Verify credential ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: 'Microsoft', count: '2', color: '#0078d4' },
              { label: 'IBM',       count: '3', color: '#7b61ff' },
              { label: 'Google',    count: '1', color: '#4285f4' },
            ].map(s => (
              <div key={s.label} className="p-3 rounded-xl text-center"
                style={{ background: 'var(--surface)', border: `1px solid ${s.color}25` }}>
                <div className="text-xl font-bold font-mono" style={{ color: s.color }}>{s.count}</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education ── */}
        <section>
          <div className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: 'var(--muted)' }}>// Education</div>
          <div className="space-y-5">
            {education.map(edu => (
              <div key={edu.degree} className="p-6 rounded-xl"
                style={{ background: 'var(--surface)', border: `1px solid ${edu.color}30` }}>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-bold text-base" style={{ color: 'var(--text)' }}>{edu.degree}</h3>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--text2)' }}>{edu.school}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono px-2 py-1 rounded-lg"
                      style={{ background: 'var(--bg2)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                      {edu.year}
                    </span>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full"
                      style={{ background: edu.badgeColor + '15', color: edu.badgeColor, border: `1px solid ${edu.badgeColor}40` }}>
                      {edu.badge}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>GPA:</span>
                  <span className="text-sm font-bold font-mono" style={{ color: edu.color }}>{edu.gpa}</span>
                </div>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Relevant Coursework</p>
                <div className="flex flex-wrap gap-2">
                  {edu.courses.map(c => (
                    <span key={c} className="text-xs px-2 py-1 rounded font-mono"
                      style={{ background: 'var(--bg2)', color: 'var(--text2)', border: '1px solid var(--border)' }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills ── */}
        <section>
          <div className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: 'var(--muted)' }}>// Technical Skills</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map(group => (
              <div key={group.category} className="p-5 rounded-xl"
                style={{ background: 'var(--surface)', border: `1px solid ${group.color}25` }}>
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest mb-4" style={{ color: group.color }}>
                  {group.category}
                </h3>
                <div className="space-y-3">
                  {group.items.map(skill => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs" style={{ color: 'var(--text2)' }}>{skill.name}</span>
                        <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{skill.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg2)' }}>
                        <div className="h-full rounded-full"
                          style={{ width: `${skill.level}%`, background: `linear-gradient(90deg, ${group.color}80, ${group.color})` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-3 text-center" style={{ color: 'var(--muted)' }}>
            * Percentages reflect honest self-assessment. Learning in public, growing every day.
          </p>
        </section>

        {/* ── Projects ── */}
        <section>
          <div className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: 'var(--muted)' }}>// Projects</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map(p => (
              <Link
                key={p.num} href={p.href}
                className="block p-5 rounded-xl"
                style={{ background: 'var(--surface)', border: `1px solid ${p.color}30`, textDecoration: 'none' }}
                target={p.href.startsWith('http') ? '_blank' : undefined}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold" style={{ color: p.color }}>#{p.num}</span>
                  <span className="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full font-mono"
                    style={{ background: '#00e67615', color: '#00e676', border: '1px solid #00e67630' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                    Live
                  </span>
                </div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--text)' }}>{p.title}</h3>
                <p className="text-xs mb-3" style={{ color: 'var(--text2)', lineHeight: 1.6 }}>{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded font-mono"
                      style={{ background: 'var(--bg2)', color: 'var(--text2)', border: '1px solid var(--border)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/learn/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: '#0078d420', color: '#50b0ff', border: '1px solid #0078d440' }}>
              View All Projects →
            </Link>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section>
          <div className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: 'var(--muted)' }}>// My Journey</div>
          <div className="relative pl-6">
            <div className="absolute left-2 top-0 bottom-0 w-px" style={{ background: 'var(--border)' }} />
            <div className="space-y-6">
              {timeline.map((t, i) => (
                <div key={i} className="relative flex gap-4 items-start">
                  <div className="absolute -left-4 w-3 h-3 rounded-full flex-shrink-0 mt-1"
                    style={{ background: t.color, border: '2px solid var(--bg)', boxShadow: `0 0 8px ${t.color}60` }} />
                  <div className="font-mono text-xs pt-0.5 flex-shrink-0" style={{ color: 'var(--muted)', minWidth: 36 }}>
                    {t.year}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{t.event}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{t.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What I am looking for ── */}
        <section>
          <div className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: 'var(--muted)' }}>// What I Am Looking For</div>
          <div className="p-6 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: '#0078d4' }}>Target Roles</p>
                <div className="space-y-2">
                  {['Data Engineer', 'Cloud Data Engineer', 'Azure Data Engineer', 'Junior / Entry Level Data Engineer'].map(r => (
                    <div key={r} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text2)' }}>
                      <span style={{ color: '#00e676' }}>→</span> {r}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: '#7b61ff' }}>What I Bring</p>
                <div className="space-y-2">
                  {[
                    'US Masters degree — 4.0 GPA',
                    'Microsoft Azure Data Fundamentals certified',
                    '6 certifications — Microsoft, IBM & Google',
                    // FIX #7 — stronger phrasing
                    '5 production Azure ADF pipelines — built, deployed & documented',
                    'AI-augmented problem solving ability',
                    'Self-driven — built a full platform to prove it',
                  ].map(r => (
                    <div key={r} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text2)' }}>
                      <span style={{ color: '#00e676' }}>✓</span> {r}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section>
          <div className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: 'var(--muted)' }}>// Get In Touch</div>
          <div className="p-8 rounded-2xl text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            {/* FIX #8 — stronger title */}
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
              Ready to Contribute as a Data Engineer
            </h2>
            {/* FIX #3 & #4 — removed weak lines */}
            <p className="text-sm mb-6 max-w-lg mx-auto" style={{ color: 'var(--text2)', lineHeight: 1.7 }}>
              MS degree · Azure certified · 6 industry certifications · 5 production Azure ADF pipelines ·
              full-stack learning platform built and deployed. I am actively pursuing Data Engineer roles
              and ready to contribute from day one.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://www.linkedin.com/in/asil-kamepalli-095157197/"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                style={{ background: '#0078d420', color: '#50b0ff', border: '1px solid #0078d440' }}
              >
                Connect on LinkedIn →
              </a>
              {/* FIX #2 — consistent email */}
              <a
                href="mailto:asilkamepalli9@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                style={{ background: 'var(--bg2)', color: 'var(--text2)', border: '1px solid var(--border)' }}
              >
                asilkamepalli9@gmail.com
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}