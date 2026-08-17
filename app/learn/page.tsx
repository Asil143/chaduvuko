'use client'

import { useState } from 'react'
import Link from 'next/link'

type Cat = 'all' | 'data' | 'ai' | 'prog' | 'web' | 'cs'

const CATS: { id: Cat; label: string }[] = [
  { id: 'all',  label: 'All Tracks'    },
  { id: 'data', label: 'Data & Cloud'  },
  { id: 'ai',   label: 'AI & ML'       },
  { id: 'prog', label: 'Programming'   },
  { id: 'web',  label: 'Web Dev'       },
  { id: 'cs',   label: 'CS Core'       },
]

const TRACKS = [
  // ── Data & Cloud ───────────────────────────────────────────────────────────
  {
    cat: 'data' as Cat,
    icon: '📁', color: '#00e676',
    name: 'Data Engineering',
    desc: 'From zero to production-grade DE — pipelines, architecture, and real patterns. 47 modules.',
    pills: ['Pipelines', 'Batch', 'Streaming', 'Medallion', 'SQL', 'Python'],
    jobs: 'Data Engineer · Analytics Engineer',
    status: 'live' as const,
    href: '/learn/data-engineering',
    modules: 47,
  },
  {
    cat: 'data' as Cat,
    icon: '☁️', color: '#0078d4',
    name: 'Microsoft Azure',
    desc: 'ADF, ADLS Gen2, Databricks, Synapse, Event Hubs, Key Vault, Fabric — the full cloud track.',
    pills: ['ADF', 'ADLS Gen2', 'Databricks', 'Synapse', 'Fabric'],
    jobs: 'Cloud Engineer · Azure Data Engineer',
    status: 'live' as const,
    href: '/learn/azure/introduction',
    modules: 8,
  },
  {
    cat: 'data' as Cat,
    icon: '🟠', color: '#ff9900',
    name: 'Amazon Web Services',
    desc: 'S3, Glue, Redshift, EMR, Kinesis, Athena, Step Functions, Lake Formation.',
    pills: ['S3', 'Glue', 'Redshift', 'EMR', 'Kinesis'],
    jobs: 'AWS Developer · Cloud Engineer',
    status: 'live' as const,
    href: '/learn/aws/introduction',
    modules: 9,
  },
  {
    cat: 'data' as Cat,
    icon: '🔵', color: '#4285f4',
    name: 'Google Cloud Platform',
    desc: 'BigQuery, Dataflow, Pub/Sub, Composer — the GCP data engineering stack.',
    pills: ['BigQuery', 'Dataflow', 'Pub/Sub', 'Composer'],
    jobs: 'GCP Engineer · Data Engineer',
    status: 'live' as const,
    href: '/learn/gcp/introduction',
    modules: 5,
  },
  {
    cat: 'data' as Cat,
    icon: '🗄️', color: '#7b61ff',
    name: 'SQL & Databases',
    desc: 'The one skill every tech role needs — 60+ lessons from SELECT to advanced window functions.',
    pills: ['JOINs', 'Window Functions', 'Indexes', 'CTEs', 'Stored Procs'],
    jobs: 'Data Analyst · Backend Dev · DBA',
    status: 'live' as const,
    href: '/learn/sql',
    modules: 60,
  },
  {
    cat: 'data' as Cat,
    icon: '📊', color: '#8b5cf6',
    name: 'Data Science',
    desc: 'Python, NumPy, pandas, statistics, and predictive modeling — one live in-browser dataset from Module 01 to your capstone.',
    pills: ['pandas', 'NumPy', 'Statistics', 'Visualization', 'ML Basics'],
    jobs: 'Data Scientist · Data Analyst · BI Analyst',
    status: 'live' as const,
    href: '/learn/data-science',
    modules: 53,
  },
  // ── AI & ML ────────────────────────────────────────────────────────────────
  {
    cat: 'ai' as Cat,
    icon: '🤖', color: '#a855f7',
    name: 'AI & Machine Learning',
    desc: 'Math → Classical ML → Deep Learning → GenAI → MLOps. One complete path from zero.',
    pills: ['Classical ML', 'Deep Learning', 'NLP', 'Generative AI', 'MLOps'],
    jobs: 'ML Engineer · Data Scientist · AI Engineer',
    status: 'live' as const,
    href: '/learn/ai-ml',
    modules: null,
  },
  // ── CS Core ────────────────────────────────────────────────────────────────
  {
    cat: 'cs' as Cat,
    icon: '🧮', color: '#f97316',
    name: 'Data Structures & Algorithms',
    desc: 'Crack every technical coding round — arrays to dynamic programming.',
    pills: ['Arrays', 'Trees', 'Graphs', 'DP', 'Sorting'],
    jobs: 'Big Tech · FAANG · Product Companies',
    status: 'live' as const,
    href: '/learn/dsa',
    modules: null,
  },
  {
    cat: 'cs' as Cat,
    icon: '💾', color: '#06b6d4',
    name: 'DBMS',
    desc: 'Database theory and design — ER diagrams, normalization, transactions, and concurrency.',
    pills: ['ER Model', 'Normalization', 'ACID', 'Transactions', 'Indexes'],
    jobs: 'DBA · Backend Dev · Technical Interviews',
    status: 'live' as const,
    href: '/learn/dbms',
    modules: 20,
  },
  {
    cat: 'cs' as Cat,
    icon: '🌐', color: '#10b981',
    name: 'Networking',
    desc: 'OSI model, TCP/IP, DNS, firewalls, VPNs, zero-trust — from fundamentals to security.',
    pills: ['OSI Model', 'TCP/IP', 'DNS', 'HTTP/S', 'Firewalls'],
    jobs: 'Network Engineer · Cloud Architect · SRE',
    status: 'live' as const,
    href: '/learn/networking',
    modules: null,
  },
  {
    cat: 'cs' as Cat,
    icon: '🔒', color: '#ef4444',
    name: 'Cybersecurity',
    desc: 'Penetration testing, OWASP Top 10, SIEM, threat modelling, and security ops.',
    pills: ['Pen Testing', 'OWASP', 'SIEM', 'Zero Trust', 'Incident Response'],
    jobs: 'Security Analyst · SOC Analyst · Pen Tester',
    status: 'live' as const,
    href: '/learn/cybersecurity',
    modules: null,
  },
  // ── Programming ────────────────────────────────────────────────────────────
  {
    cat: 'prog' as Cat,
    icon: '🐍', color: '#facc15',
    name: 'Python',
    desc: 'Zero to production Python — syntax, OOP, functional patterns, testing, concurrency.',
    pills: ['Basics', 'OOP', 'Decorators', 'Async', 'Testing'],
    jobs: 'Backend Dev · ML Engineer · Data Analyst',
    status: 'live' as const,
    href: '/learn/python',
    modules: 46,
  },
  {
    cat: 'prog' as Cat,
    icon: '☕', color: '#f97316',
    name: 'Java',
    desc: 'Core Java to Spring Boot microservices — collections, JPA, Kafka integration.',
    pills: ['OOP', 'Collections', 'Spring Boot', 'JPA', 'Kafka'],
    jobs: 'Java Dev · Backend Engineer',
    status: 'soon' as const,
    href: '#',
    modules: null,
  },
  {
    cat: 'prog' as Cat,
    icon: '💛', color: '#eab308',
    name: 'JavaScript',
    desc: 'Modern JS from fundamentals to async patterns and browser APIs.',
    pills: ['ES6+', 'Async/Await', 'DOM', 'Fetch API', 'Modules'],
    jobs: 'Frontend Dev · Full Stack Dev',
    status: 'soon' as const,
    href: '#',
    modules: null,
  },
  // ── Web Dev ────────────────────────────────────────────────────────────────
  {
    cat: 'web' as Cat,
    icon: '⚛️', color: '#38bdf8',
    name: 'React.js',
    desc: 'Component-based UI development — hooks, state, context, and production patterns.',
    pills: ['Hooks', 'Context', 'Redux', 'Testing', 'Performance'],
    jobs: 'Frontend Dev · React Developer',
    status: 'soon' as const,
    href: '#',
    modules: null,
  },
  {
    cat: 'web' as Cat,
    icon: '▲', color: '#ffffff',
    name: 'Next.js',
    desc: 'Full-stack React with App Router, SSR, SSG, and production deployment.',
    pills: ['App Router', 'SSR', 'SSG', 'API Routes', 'Vercel'],
    jobs: 'Full Stack Dev · Frontend Dev',
    status: 'soon' as const,
    href: '#',
    modules: null,
  },
  {
    cat: 'web' as Cat,
    icon: '🟢', color: '#6cc24a',
    name: 'Node.js',
    desc: 'Server-side JavaScript — Express, REST APIs, JWT auth, WebSockets.',
    pills: ['Express', 'REST APIs', 'JWT', 'WebSockets', 'Middleware'],
    jobs: 'Backend Dev · Full Stack Dev',
    status: 'soon' as const,
    href: '#',
    modules: null,
  },
]

// ─── BROWSE BY SKILL — granular, single-topic tutorials not already a Track above ──
const SKILLS = [
  // Programming
  { badge: 'TypeScript', title: 'TypeScript', status: 'soon' as const, href: '#', desc: 'Typed JavaScript for production apps — Types, Interfaces, Generics, Utility Types, strict mode.', pills: ['Types', 'Interfaces', 'Generics', 'Utility Types', 'Strict Mode'] },
  { badge: 'C / C++', title: 'C / C++', status: 'soon' as const, href: '#', desc: 'Systems programming and DSA foundation — Pointers, memory management, OOP, STL.', pills: ['Pointers', 'Memory Mgmt', 'OOP', 'STL', 'DSA'] },
  { badge: 'Go', title: 'Go (Golang)', status: 'soon' as const, href: '#', desc: 'High-performance microservices with Go — Goroutines, channels, REST APIs, concurrency patterns.', pills: ['Goroutines', 'Channels', 'REST APIs', 'Concurrency', 'Microservices'] },
  { badge: 'Kotlin', title: 'Kotlin', status: 'soon' as const, href: '#', desc: 'Android and JVM backend development — Coroutines, Jetpack Compose, Spring Boot with Kotlin.', pills: ['Coroutines', 'Jetpack', 'Spring Boot', 'Null Safety', 'Android'] },
  { badge: 'Bash', title: 'Bash / Shell Scripting', status: 'soon' as const, href: '#', desc: 'Automate everything on Linux — scripts, cron jobs, file operations, pipelines for DevOps.', pills: ['Scripts', 'Cron Jobs', 'File Ops', 'Pipelines', 'Automation'] },
  // Web Dev
  { badge: 'Web Dev', title: 'HTML & CSS', status: 'live' as const, href: '/learn/html-css', desc: 'Web foundations done right — Semantic HTML, Flexbox, CSS Grid, Responsive Design, animations.', pills: ['Semantic HTML', 'Flexbox', 'CSS Grid', 'Responsive', 'Animations'] },
  { badge: 'Web Dev', title: 'Angular', status: 'soon' as const, href: '#', desc: 'Enterprise-grade frontend framework — Components, Services, RxJS, NgRx, Dependency Injection.', pills: ['Components', 'Services', 'RxJS', 'NgRx', 'DI'] },
  { badge: 'Web Dev', title: 'Django', status: 'soon' as const, href: '#', desc: 'Python web framework for production — ORM, REST APIs, Auth, Celery, deployment on AWS.', pills: ['ORM', 'REST APIs', 'Auth', 'Celery', 'Deployment'] },
  { badge: 'Web Dev', title: 'Spring Boot', status: 'soon' as const, href: '#', desc: 'Java enterprise application framework — REST, JPA, Spring Security, Kafka, Microservices.', pills: ['REST', 'JPA', 'Security', 'Kafka', 'Microservices'] },
  { badge: 'Web Dev', title: 'GraphQL', status: 'soon' as const, href: '#', desc: 'API query language for modern apps — Schema, Resolvers, Apollo Client, Subscriptions.', pills: ['Schema', 'Resolvers', 'Apollo Client', 'Subscriptions', 'Federation'] },
  { badge: 'Web Dev', title: 'PHP & Laravel', status: 'soon' as const, href: '#', desc: 'Server-side web with Laravel framework — Eloquent ORM, Blade templates, REST APIs.', pills: ['Laravel', 'Eloquent ORM', 'Blade', 'REST APIs', 'Auth'] },
  // DevOps
  { badge: 'DevOps', title: 'Docker', status: 'soon' as const, href: '#', desc: 'Containerise every application — Images, Containers, Docker Compose, Registry, multi-stage builds.', pills: ['Images', 'Containers', 'Compose', 'Registry', 'Multi-stage'] },
  { badge: 'DevOps', title: 'Kubernetes', status: 'soon' as const, href: '#', desc: 'Container orchestration at scale — Pods, Deployments, Services, Helm, EKS/AKS/GKE.', pills: ['Pods', 'Deployments', 'Helm', 'EKS/AKS/GKE', 'Ingress'] },
  { badge: 'DevOps', title: 'Terraform', status: 'soon' as const, href: '#', desc: 'Infrastructure as Code — HCL, AWS/GCP/Azure, state management, modules, remote backends.', pills: ['HCL', 'AWS/GCP/Azure', 'State Mgmt', 'Modules', 'Remote Backend'] },
  { badge: 'DevOps', title: 'CI/CD Pipelines', status: 'soon' as const, href: '#', desc: 'GitHub Actions, Jenkins, ArgoCD, GitOps — automate every step from code to production.', pills: ['GitHub Actions', 'Jenkins', 'ArgoCD', 'GitOps', 'Pipelines'] },
  { badge: 'DevOps', title: 'Linux', status: 'soon' as const, href: '#', desc: 'Command line and system administration — Bash, file system, networking, permissions, processes.', pills: ['Bash', 'File System', 'Networking', 'Permissions', 'Processes'] },
  // Databases
  { badge: 'Database', title: 'PostgreSQL', status: 'soon' as const, href: '#', desc: 'Advanced relational database mastery — JSONB, Full Text Search, Partitioning, Extensions, PL/pgSQL.', pills: ['JSONB', 'Full Text Search', 'Partitioning', 'Extensions', 'PL/pgSQL'] },
  { badge: 'Database', title: 'MongoDB', status: 'soon' as const, href: '#', desc: 'NoSQL document database at scale — Aggregation Pipeline, Indexes, Atlas, Replication, Sharding.', pills: ['Aggregation', 'Indexes', 'Atlas', 'Replication', 'Sharding'] },
  { badge: 'Database', title: 'Redis', status: 'soon' as const, href: '#', desc: 'In-memory caching and queuing — Caching Patterns, Pub/Sub, Sessions, Lua Scripting.', pills: ['Caching Patterns', 'Pub/Sub', 'Sessions', 'Lua Scripting', 'Streams'] },
  { badge: 'Database', title: 'Snowflake', status: 'soon' as const, href: '#', desc: 'Cloud data warehouse platform — Schemas, Time Travel, Streams, Tasks, dbt Integration.', pills: ['Schemas', 'Time Travel', 'Streams', 'Tasks', 'dbt Integration'] },
  // CS Core
  { badge: 'CS Core', title: 'System Design', status: 'soon' as const, href: '#', desc: 'Design scalable systems like a senior — HLD, LLD, Scalability, CAP Theorem, Trade-offs, real production systems.', pills: ['HLD', 'LLD', 'Scalability', 'CAP Theorem', 'Trade-offs'] },
  { badge: 'CS Core', title: 'Operating Systems', status: 'soon' as const, href: '#', desc: 'Processes, memory management, CPU scheduling, concurrency, deadlock — for campus placements and interviews.', pills: ['Processes', 'Memory Mgmt', 'Scheduling', 'IPC', 'Deadlock'] },
  { badge: 'CS Core', title: 'Computer Networks', status: 'soon' as const, href: '#', desc: 'OSI and TCP/IP model, HTTP, DNS, routing, load balancers — for DevOps, backend, and campus prep.', pills: ['TCP/IP', 'HTTP/HTTPS', 'DNS', 'Load Balancers', 'Routing'] },
  // Mobile
  { badge: 'Mobile', title: 'Android Development', status: 'soon' as const, href: '#', desc: 'Native Android with Kotlin — Jetpack Compose, MVVM, Room DB, Navigation, Coroutines.', pills: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Room DB', 'Coroutines'] },
  { badge: 'Mobile', title: 'Flutter', status: 'soon' as const, href: '#', desc: 'Cross-platform iOS and Android with Dart — Widgets, BLoC, Provider, Firebase, animations.', pills: ['Dart', 'Widgets', 'BLoC', 'Firebase', 'Animations'] },
  { badge: 'Mobile', title: 'React Native', status: 'soon' as const, href: '#', desc: 'Mobile apps with JavaScript and React — Components, Navigation, Native Modules, Expo, Push Notifications.', pills: ['Components', 'Navigation', 'Native Modules', 'Expo', 'Push Notifications'] },
  // Testing
  { badge: 'Testing', title: 'Software Testing', status: 'soon' as const, href: '#', desc: 'Manual testing foundation and SDLC — Test Cases, Bug Reporting, STLC, Agile QA, defect lifecycle.', pills: ['Test Cases', 'Bug Reporting', 'STLC', 'Agile QA', 'Defect Lifecycle'] },
  { badge: 'Testing', title: 'Selenium', status: 'soon' as const, href: '#', desc: 'Web browser test automation — WebDriver, TestNG, Page Object Model, automation frameworks.', pills: ['WebDriver', 'TestNG', 'Page Object Model', 'Frameworks', 'CI Integration'] },
  { badge: 'Testing', title: 'API Testing', status: 'soon' as const, href: '#', desc: 'Postman, REST Assured, Newman, API automation — contract testing, performance, CI integration.', pills: ['Postman', 'REST Assured', 'Newman', 'Contract Testing', 'Performance'] },
  // Interview prep
  { badge: 'Interview', title: 'Campus Placements', status: 'soon' as const, href: '#', desc: 'Aptitude, Technical Round, HR Round, Group Discussion — the full entry-level interview loop.', pills: ['Aptitude', 'Technical Round', 'HR Round', 'Group Discussion', 'GD Tips'] },
  { badge: 'Interview', title: 'FAANG Prep', status: 'soon' as const, href: '#', desc: 'Google, Amazon, Microsoft, Meta, Apple — DSA patterns, System Design, Behavioural interviews.', pills: ['DSA Patterns', 'System Design', 'Behavioural', 'Coding Patterns', 'Mock Rounds'] },
  // Data & BI
  { badge: 'BI', title: 'Power BI & Tableau', status: 'soon' as const, href: '#', desc: 'Dashboards, DAX, data storytelling, Tableau Desktop — the two tools every data analyst needs.', pills: ['Power BI', 'Tableau', 'DAX', 'Reports', 'Data Storytelling'] },
  { badge: 'AI & ML', title: 'MLOps', status: 'soon' as const, href: '#', desc: 'Deploy and monitor ML models in production — MLflow, Docker, Kubeflow, CI/CD for ML pipelines.', pills: ['MLflow', 'Docker', 'Kubeflow', 'CI/CD', 'Model Registry'] },
]

const skillBadgeColor: Record<string, string> = {
  'TypeScript': '#0078d4',
  'C / C++': '#888888',
  'Go': '#06b6d4',
  'Kotlin': '#8b5cf6',
  'Bash': '#00e676',
  'Web Dev': '#06b6d4',
  'DevOps': '#f97316',
  'Database': '#00e676',
  'CS Core': '#f97316',
  'Mobile': '#ec4899',
  'Testing': '#84cc16',
  'Interview': '#00e676',
  'BI': '#f7c948',
  'AI & ML': '#7b61ff',
}

const QUICK_LINKS = [
  { icon: '🗺️', label: 'Career Roadmaps',    href: '/learn/roadmap',   desc: '20+ role-specific roadmaps' },
  { icon: '🏗️', label: 'Real Projects',       href: '/learn/projects',  desc: '6 Azure end-to-end builds'   },
  { icon: '🎯', label: 'Interview Prep',       href: '/learn/interview', desc: 'DE, ML, SQL, System Design'  },
  { icon: '✍️', label: 'Blog',                 href: '/blog',            desc: '27 in-depth articles'        },
]

export default function LearnPage() {
  const [cat, setCat] = useState<Cat>('all')

  const filtered = cat === 'all' ? TRACKS : TRACKS.filter(t => t.cat === cat)
  const liveCount = TRACKS.filter(t => t.status === 'live').length

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--green)',
          fontFamily: 'var(--font-mono)', marginBottom: 12,
        }}>
          // Learning Tracks
        </div>
        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900,
          color: 'var(--text)', letterSpacing: '-2px',
          fontFamily: 'var(--font-display)', lineHeight: 1.1, marginBottom: 16,
        }}>
          Everything you need.<br />
          <span style={{ color: 'var(--green)' }}>Free. Forever.</span>
        </h1>
        <p style={{
          fontSize: 16, color: 'var(--muted)', lineHeight: 1.75,
          maxWidth: 580, marginBottom: 32,
        }}>
          Structured paths across every branch of IT — built for the US job market.
          No login walls. No paywalls. Start anywhere.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {[
            { value: `${TRACKS.length}+`, label: 'Tracks'          },
            { value: `${liveCount}`,       label: 'Live now'        },
            { value: '100+',               label: 'Hours of content' },
            { value: '$0',                 label: 'Cost forever'    },
          ].map(s => (
            <div key={s.label}>
              <div style={{
                fontSize: 28, fontWeight: 900, color: 'var(--green)',
                fontFamily: 'var(--font-display)',
              }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick links ────────────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 10, marginBottom: 48,
      }}>
        {QUICK_LINKS.map(q => (
          <a
            key={q.label}
            href={q.href}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '14px 16px',
              textDecoration: 'none', transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--green)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <span style={{ fontSize: 22 }}>{q.icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{q.label}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{q.desc}</div>
            </div>
          </a>
        ))}
      </div>

      {/* ── Category filter ────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--muted)',
          fontFamily: 'var(--font-mono)', marginBottom: 10,
        }}>
          // Filter by category
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CATS.map(c => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              style={{
                fontSize: 12, fontWeight: 700, padding: '7px 16px',
                borderRadius: 20, cursor: 'pointer', border: '1px solid',
                fontFamily: 'var(--font-mono)', letterSpacing: '.04em',
                borderColor: cat === c.id ? 'var(--green)' : 'var(--border)',
                background: cat === c.id ? 'rgba(0,230,118,0.10)' : 'var(--surface)',
                color: cat === c.id ? 'var(--green)' : 'var(--muted)',
                transition: 'all 0.15s',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Track grid ─────────────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 14,
      }}>
        {filtered.map(t => {
          const isLive = t.status === 'live'
          const CardTag = (isLive ? Link : 'div') as React.ElementType
          const cardTagProps = isLive ? { href: t.href } : {}
          return (
            <CardTag
              key={t.name}
              {...cardTagProps}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                overflow: 'hidden',
                opacity: isLive ? 1 : 0.72,
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.2s, transform 0.2s',
                textDecoration: 'none',
                cursor: isLive ? 'pointer' : 'default',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
                if (isLive) {
                  (e.currentTarget as HTMLElement).style.borderColor = t.color + '55'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              {/* Color bar */}
              <div style={{ height: 3, background: t.color, opacity: 0.8 }} />

              <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Icon + name row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 26 }}>{t.icon}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                        {t.name}
                      </div>
                      {t.modules && (
                        <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                          {t.modules} modules
                        </div>
                      )}
                    </div>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '.06em',
                    borderRadius: 20, padding: '3px 10px',
                    background: isLive ? 'rgba(0,230,118,0.10)' : 'var(--bg2)',
                    color: isLive ? 'var(--green)' : 'var(--muted)',
                    border: `1px solid ${isLive ? 'rgba(0,230,118,0.25)' : 'var(--border)'}`,
                    flexShrink: 0,
                  }}>
                    {isLive ? '✓ LIVE' : 'SOON'}
                  </span>
                </div>

                {/* Description */}
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 14, flex: 1 }}>
                  {t.desc}
                </p>

                {/* Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
                  {t.pills.map(p => (
                    <span key={p} style={{
                      fontSize: 11, color: 'var(--muted)',
                      background: 'var(--bg2)', border: '1px solid var(--border)',
                      borderRadius: 20, padding: '2px 9px',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {p}
                    </span>
                  ))}
                </div>

                {/* Jobs */}
                <div style={{ fontSize: 11, color: t.color, fontWeight: 600, marginBottom: 16 }}>
                  {t.jobs}
                </div>

                {/* CTA — visual only; the whole card above is the actual link */}
                {isLive ? (
                  <div style={{
                    display: 'block', textAlign: 'center',
                    background: t.color, color: '#000',
                    fontWeight: 700, fontSize: 13,
                    borderRadius: 8, padding: '10px 0',
                    letterSpacing: '.02em',
                  }}>
                    Start Learning →
                  </div>
                ) : (
                  <div style={{
                    display: 'block', textAlign: 'center',
                    background: 'var(--bg2)', color: 'var(--muted)',
                    fontWeight: 600, fontSize: 13,
                    borderRadius: 8, padding: '10px 0',
                    border: '1px solid var(--border)', letterSpacing: '.02em',
                  }}>
                    Coming Soon
                  </div>
                )}
              </div>
            </CardTag>
          )
        })}
      </div>

      {/* ── Browse by Skill ────────────────────────────────────────────────── */}
      <div style={{ marginTop: 64 }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--green)',
          fontFamily: 'var(--font-mono)', marginBottom: 10,
        }}>
          // Browse by skill
        </div>
        <h2 style={{
          fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 900,
          color: 'var(--text)', fontFamily: 'var(--font-display)',
          letterSpacing: '-1px', marginBottom: 10,
        }}>
          Every individual skill, in one grid.
        </h2>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, maxWidth: 560, marginBottom: 28 }}>
          Beyond the structured tracks above — single-language and single-tool tutorials, added week by week.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
          {SKILLS.map((s, i) => {
            const color = skillBadgeColor[s.badge] || 'var(--muted)'
            return (
              <div
                key={i}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: '18px 16px',
                  background: 'var(--surface)',
                  opacity: 0.85,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 99,
                    background: `${color}18`, color: color,
                    textTransform: 'uppercase', letterSpacing: '.06em',
                  }}>
                    {s.badge}
                  </span>
                  <span style={{
                    fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 99,
                    textTransform: 'uppercase', letterSpacing: '.06em',
                    background: 'rgba(255,255,255,.06)', color: 'var(--muted)',
                  }}>
                    Soon
                  </span>
                </div>

                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6, lineHeight: 1.3 }}>
                  {s.title}
                </div>

                <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 10 }}>
                  {s.desc}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {s.pills.map(p => (
                    <span key={p} style={{
                      fontSize: 9, padding: '2px 7px', borderRadius: 3,
                      background: 'rgba(255,255,255,.05)', color: 'var(--muted)',
                      border: '1px solid var(--border)',
                    }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Bottom CTA ─────────────────────────────────────────────────────── */}
      <div style={{
        marginTop: 64,
        background: 'linear-gradient(135deg, rgba(0,230,118,0.05) 0%, rgba(123,97,255,0.05) 100%)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '40px 36px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--green)',
          fontFamily: 'var(--font-mono)', marginBottom: 14,
        }}>
          // New tracks every week
        </div>
        <h2 style={{
          fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 900,
          color: 'var(--text)', fontFamily: 'var(--font-display)',
          letterSpacing: '-1px', marginBottom: 12,
        }}>
          Not sure where to start?
        </h2>
        <p style={{
          fontSize: 14, color: 'var(--muted)', lineHeight: 1.75,
          maxWidth: 460, margin: '0 auto 28px',
        }}>
          If you want a job in data, start with Data Engineering. If you want to build things,
          start with SQL. Both are free, both are live now.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/learn/data-engineering" style={{
            display: 'inline-block', background: 'var(--green)',
            color: '#000', fontWeight: 700, fontSize: 13,
            borderRadius: 8, padding: '11px 28px', textDecoration: 'none',
          }}>
            Start Data Engineering →
          </Link>
          <Link href="/learn/sql" style={{
            display: 'inline-block', background: 'var(--surface)',
            color: 'var(--text)', fontWeight: 600, fontSize: 13,
            borderRadius: 8, padding: '11px 28px', textDecoration: 'none',
            border: '1px solid var(--border)',
          }}>
            Start with SQL
          </Link>
          <Link href="/learn/roadmap" style={{
            display: 'inline-block', background: 'var(--surface)',
            color: 'var(--text)', fontWeight: 600, fontSize: 13,
            borderRadius: 8, padding: '11px 28px', textDecoration: 'none',
            border: '1px solid var(--border)',
          }}>
            View Roadmaps
          </Link>
        </div>
      </div>
    </div>
  )
}
