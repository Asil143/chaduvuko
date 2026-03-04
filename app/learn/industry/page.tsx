import Link from 'next/link'
import { ArrowRight, TrendingUp, Users, DollarSign } from 'lucide-react'

export const metadata = { title: 'Top Companies Hiring Data Engineers — Asil' }

const companies = [
  {
    name: 'Microsoft', logo: '🪟', tier: 'FAANG+', color: '#0078d4', hq: 'Redmond, WA',
    sponsorsH1B: true, openRoles: '200+',
    problem: 'Processes petabytes of telemetry from Azure, Office 365, Xbox, and Bing daily to personalize products and detect security threats across 1 billion+ users.',
    tools: ['Azure Databricks', 'Microsoft Fabric', 'Azure Data Factory', 'Synapse', 'Spark'],
    why: 'Building the cloud platform means Microsoft is a data engineering organization at its core. Every Azure service generates data that needs to be processed.',
  },
  {
    name: 'Amazon / AWS', logo: '📦', tier: 'FAANG+', color: '#ff9900', hq: 'Seattle, WA',
    sponsorsH1B: true, openRoles: '500+',
    problem: 'Tracks every product view, add-to-cart, purchase, and return across 300 million customers to power recommendations, inventory forecasting, and same-day delivery logistics.',
    tools: ['Amazon S3', 'AWS Glue', 'Redshift', 'Kinesis', 'Apache Spark', 'Airflow'],
    why: 'Amazon processes more transactions per second than almost any other company on Earth. Each transaction generates dozens of events that feed downstream ML and analytics systems.',
  },
  {
    name: 'Google', logo: '🔍', tier: 'FAANG+', color: '#4285f4', hq: 'Mountain View, CA',
    sponsorsH1B: true, openRoles: '300+',
    problem: 'Indexes the entire internet, processes 8.5 billion searches daily, and monetizes via ads — all requiring massive real-time data pipelines to serve relevant results in under 100ms.',
    tools: ['BigQuery', 'Cloud Dataflow', 'Pub/Sub', 'Cloud Composer', 'Apache Beam'],
    why: 'Google invented much of modern data engineering (MapReduce, Dremel/BigQuery, Bigtable). Their data engineering teams run the infrastructure that the entire industry learned from.',
  },
  {
    name: 'Meta', logo: '👤', tier: 'FAANG+', color: '#1877F2', hq: 'Menlo Park, CA',
    sponsorsH1B: true, openRoles: '150+',
    problem: 'Processes 100+ petabytes of data daily from Facebook, Instagram, and WhatsApp to power ad targeting, content ranking, and detecting harmful content at global scale.',
    tools: ['Apache Spark', 'Apache Hive', 'Presto', 'Apache Airflow', 'Scuba', 'Hadoop'],
    why: 'Meta open-sourced many data engineering tools (React for the web, but also PyTorch, Prophet). Their scale — billions of users posting simultaneously — demands world-class data infrastructure.',
  },
  {
    name: 'Apple', logo: '🍎', tier: 'FAANG+', color: '#555555', hq: 'Cupertino, CA',
    sponsorsH1B: true, openRoles: '100+',
    problem: 'Collects device telemetry, App Store usage, Apple Music streams, and health data from 2 billion active devices while maintaining strict privacy — a uniquely complex data engineering challenge.',
    tools: ['Apache Spark', 'Presto', 'Internal tools', 'Python', 'SQL'],
    why: 'Apple processes more device telemetry than any other hardware company while complying with the strictest privacy standards globally. On-device ML requires clean, well-structured training data.',
  },
  {
    name: 'Netflix', logo: '🎬', tier: 'Top Tech', color: '#E50914', hq: 'Los Gatos, CA',
    sponsorsH1B: true, openRoles: '50+',
    problem: 'Analyzes viewing patterns across 260 million subscribers to decide what content to produce, how to optimize video streaming quality, and how to surface the right show to the right person.',
    tools: ['Apache Iceberg', 'Apache Spark', 'Flink', 'Druid', 'Metacat', 'Airflow'],
    why: 'Netflix invented Apache Iceberg. Their data engineering team is among the most influential in the industry — what Netflix publishes as best practice becomes industry standard within 2 years.',
  },
  {
    name: 'Uber', logo: '🚗', tier: 'Top Tech', color: '#000000', hq: 'San Francisco, CA',
    sponsorsH1B: true, openRoles: '80+',
    problem: 'Matches 25 million trips per day in real time — requiring millisecond-latency pipelines to calculate dynamic pricing, driver availability, ETAs, and fraud detection simultaneously.',
    tools: ['Apache Kafka', 'Apache Flink', 'Apache Hudi', 'Presto', 'Pinot', 'M3'],
    why: 'Uber created Apache Hudi. Their real-time matching problem at global scale is one of the hardest data engineering challenges in the industry.',
  },
  {
    name: 'Airbnb', logo: '🏠', tier: 'Top Tech', color: '#FF5A5F', hq: 'San Francisco, CA',
    sponsorsH1B: true, openRoles: '40+',
    problem: 'Processes search, booking, host, and pricing data across 5 million listings in 220 countries to personalize search results, detect fraud, and optimize dynamic pricing.',
    tools: ['Apache Airflow', 'Apache Spark', 'Druid', 'Superset', 'Hive', 'Presto'],
    why: 'Airbnb created Apache Airflow (the most widely used orchestration tool in the industry) and Apache Superset (open-source BI). Their data team sets patterns the entire industry follows.',
  },
  {
    name: 'Deloitte', logo: '🏢', tier: 'Consulting (H1B Sponsor)', color: '#86BC25', hq: 'New York, NY',
    sponsorsH1B: true, openRoles: '400+',
    problem: 'Builds data platforms for Fortune 500 clients across banking, healthcare, retail, and government — each project requires standing up complete Azure or AWS data stacks from scratch.',
    tools: ['Azure Databricks', 'Azure Data Factory', 'Snowflake', 'dbt', 'Terraform', 'Power BI'],
    why: 'Deloitte is one of the largest H1B sponsors in the US. They hire hundreds of data engineers annually for client delivery. Azure and Databricks certifications are highly valued here.',
  },
  {
    name: 'Accenture', logo: '🔷', tier: 'Consulting (H1B Sponsor)', color: '#A100FF', hq: 'New York, NY',
    sponsorsH1B: true, openRoles: '600+',
    problem: 'Migrates and modernizes legacy data warehouses for global enterprises, building cloud-native data platforms on Azure, AWS, and GCP for companies across every industry.',
    tools: ['Azure Synapse', 'AWS Glue', 'Google BigQuery', 'Apache Spark', 'dbt', 'Informatica'],
    why: 'Largest technology consulting firm in the world. Massive H1B sponsor. Multi-cloud data engineering roles across all three cloud platforms. Entry point for many engineers targeting the US market.',
  },
  {
    name: 'Cognizant', logo: '🔵', tier: 'Consulting (H1B Sponsor)', color: '#1A6296', hq: 'Teaneck, NJ',
    sponsorsH1B: true, openRoles: '500+',
    problem: 'Modernizes data infrastructure for healthcare, insurance, and banking clients — migrating petabytes from on-premises Oracle and Teradata systems to cloud-native platforms.',
    tools: ['Azure Data Factory', 'Azure Databricks', 'Synapse', 'SQL', 'Python', 'Spark'],
    why: 'One of the top H1B sponsors in the United States consistently. Strong hiring from Indian universities. Azure data engineering roles make up a large portion of their data practice.',
  },
  {
    name: 'JPMorgan Chase', logo: '🏦', tier: 'Finance', color: '#003DA5', hq: 'New York, NY',
    sponsorsH1B: true, openRoles: '200+',
    problem: 'Processes 6 billion transactions daily across retail banking, investment banking, and asset management — requiring real-time fraud detection, regulatory reporting, and risk analytics.',
    tools: ['Apache Spark', 'Kafka', 'Hadoop', 'Python', 'SQL', 'Hive', 'AWS'],
    why: 'JPMorgan is transforming into a technology company. Their data engineering team processes more financial transactions per day than almost any entity on Earth. Regulated data environments mean rigorous data quality is mandatory.',
  },
  {
    name: 'Walmart', logo: '🛒', tier: 'Retail', color: '#0071CE', hq: 'Bentonville, AR',
    sponsorsH1B: true, openRoles: '150+',
    problem: 'Analyzes 40 petabytes of transaction data from 10,000 stores and Walmart.com to optimize inventory, supply chain routing, personalized pricing, and checkout fraud prevention.',
    tools: ['Apache Spark', 'Azure', 'Kafka', 'Hadoop', 'Python', 'SQL', 'Hive'],
    why: 'Walmart is the largest private employer in the US and one of the largest data consumers in the world. Their tech arm Walmart Global Tech hires aggressively and sponsors H1B.',
  },
]

const tiers = ['FAANG+', 'Top Tech', 'Consulting (H1B Sponsor)', 'Finance', 'Retail']
const tierColors: Record<string, string> = {
  'FAANG+': '#f5c542', 'Top Tech': '#00c2ff', 'Consulting (H1B Sponsor)': '#00e676',
  'Finance': '#0078d4', 'Retail': '#ff9900',
}

export default function IndustryPage() {
  return (
    <div className="pt-16 min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="border-b py-16 px-4" style={{ borderColor: 'var(--border)', background: 'var(--bg2)' }}>
        <div className="max-w-5xl mx-auto">
          <span className="section-tag">// Industry</span>
          <h1 className="font-display font-extrabold tracking-tight mt-2 mb-3"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'var(--text)' }}>
            Top Companies Hiring Data Engineers
          </h1>
          <p className="text-base max-w-2xl" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif', fontStyle: 'italic' }}>
            What problem each company is solving with data engineering, which tools they use, and whether they sponsor H1B visas. Use this to target the right companies with the right skills.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {tiers.map(tier => (
              <span key={tier} className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full"
                style={{ background: `${tierColors[tier]}15`, color: tierColors[tier], border: `1px solid ${tierColors[tier]}30` }}>
                {tier}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-14">
          {[
            { icon: '🏢', stat: `${companies.length}`, label: 'Companies profiled' },
            { icon: '🇺🇸', stat: `${companies.filter(c => c.sponsorsH1B).length}/${companies.length}`, label: 'Sponsor H1B' },
            { icon: '💼', stat: '3,000+', label: 'Open roles tracked' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-5 text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-display font-black text-2xl" style={{ color: 'var(--accent)' }}>{s.stat}</div>
              <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {tiers.map(tier => {
          const tierCompanies = companies.filter(c => c.tier === tier)
          if (tierCompanies.length === 0) return null
          return (
            <div key={tier} className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-xs font-mono uppercase tracking-widest" style={{ color: tierColors[tier] }}>{tier}</div>
                <div className="flex-1 h-px" style={{ background: `${tierColors[tier]}30` }} />
              </div>
              <div className="space-y-4">
                {tierCompanies.map(company => (
                  <div key={company.name} className="rounded-2xl p-6"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: `${company.color}12`, border: `1px solid ${company.color}20` }}>
                        {company.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text)' }}>{company.name}</h3>
                              <span className="text-xs font-mono px-2 py-0.5 rounded"
                                style={{ background: `${tierColors[company.tier]}15`, color: tierColors[company.tier] }}>
                                {company.tier}
                              </span>
                              {company.sponsorsH1B && (
                                <span className="text-xs font-mono px-2 py-0.5 rounded"
                                  style={{ background: 'rgba(0,230,118,0.1)', color: 'var(--green)', border: '1px solid rgba(0,230,118,0.2)' }}>
                                  ✅ H1B Sponsor
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--muted)' }}>
                              {company.hq} · {company.openRoles} open data engineering roles
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 p-4 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                          <div className="text-xs font-mono uppercase tracking-wider mb-1.5" style={{ color: company.color }}>
                            Data engineering problem they are solving
                          </div>
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>
                            {company.problem}
                          </p>
                        </div>

                        <div className="mt-3 p-4 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                          <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: company.color }}>
                            Tools and technologies used
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {company.tools.map(tool => (
                              <span key={tool} className="text-xs font-mono px-2.5 py-1 rounded-lg"
                                style={{ background: `${company.color}10`, color: company.color, border: `1px solid ${company.color}20` }}>
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-3 p-4 rounded-xl" style={{ background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                          <div className="text-xs font-mono uppercase tracking-wider mb-1.5" style={{ color: company.color }}>
                            Why they hire data engineers
                          </div>
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)', fontFamily: 'Lora, serif' }}>
                            {company.why}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* CTA */}
        <div className="mt-10 rounded-2xl p-10 text-center"
          style={{ background: 'var(--accent-glow)', border: '1px solid rgba(0,120,212,0.15)' }}>
          <h2 className="font-display font-bold text-2xl mb-3" style={{ color: 'var(--text)' }}>
            Ready to target these companies?
          </h2>
          <p className="text-sm mb-6 max-w-lg mx-auto" style={{ color: 'var(--muted)', fontFamily: 'Lora, serif' }}>
            Build the skills these companies are hiring for. Start with the Azure track — it covers the tools used by Microsoft, Deloitte, Accenture, and Cognizant.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/learn/azure/introduction" className="btn-primary">Start Azure Track <ArrowRight size={14} /></Link>
            <Link href="/learn/projects/azure-batch-pipeline" className="btn-secondary">Build Project 1</Link>
          </div>
        </div>
      </div>
    </div>
  )
}