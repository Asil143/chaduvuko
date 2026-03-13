import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { LearningResourceJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd'

export const metadata = {
  title: 'Azure Data Factory Tutorial: Copy CSV to ADLS Gen2 — Project 01',
  description:
    'Step-by-step Azure Data Factory tutorial. Build your first ADF pipeline to copy a CSV file from Azure Blob Storage into ADLS Gen2. Beginner-friendly, free, with full screenshots.',
  keywords: [
    'azure data factory tutorial',
    'copy csv to adls gen2',
    'azure data factory pipeline beginner',
    'adf linked service dataset',
    'azure blob storage to adls',
    'azure data engineering project',
    'data lake pipeline tutorial',
  ],
  alternates: {
    canonical: 'https://asil-site.vercel.app/learn/projects/azure-batch-pipeline',
  },
  openGraph: {
    title: 'Azure Data Factory: Copy CSV to ADLS Gen2 — Free Tutorial',
    description:
      'Build your first ADF pipeline from scratch. Copy a CSV file into Azure Data Lake — the foundation pattern of every data engineering project.',
    url: 'https://asil-site.vercel.app/learn/projects/azure-batch-pipeline',
    type: 'article',
    images: [
      {
        url: 'https://asil-site.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Azure Data Factory CSV to ADLS Gen2 Tutorial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azure Data Factory: Copy CSV to ADLS Gen2 — Free Tutorial',
    description:
      'Build your first ADF pipeline from scratch. The foundational pattern of every Azure data engineering project.',
    images: ['https://asil-site.vercel.app/og-image.png'],
  },
}

// Screenshot placeholder component
function Screenshot({ caption }: { caption: string }) {
  return (
    <div className="my-4 rounded-xl overflow-hidden" style={{ border: '2px dashed var(--border)' }}>
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: 'var(--surface)' }}>
        <span className="text-lg">📸</span>
        <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>SCREENSHOT</span>
      </div>
      <div className="px-4 py-3" style={{ background: 'var(--bg2)' }}>
        <p className="text-sm italic" style={{ color: 'var(--text2)' }}>{caption}</p>
      </div>
    </div>
  )
}

const csvData = `order_id,store_id,product_name,category,quantity,unit_price,order_date
ORD001,ST001,Basmati Rice 5kg,Grocery,3,299.00,2024-01-15
ORD002,ST001,Sunflower Oil 1L,Grocery,5,145.00,2024-01-15
ORD003,ST001,Samsung TV 43inch,Electronics,1,32000.00,2024-01-15
ORD004,ST002,Amul Butter 500g,Dairy,8,240.00,2024-01-15
ORD005,ST002,Basmati Rice 5kg,Grocery,2,299.00,2024-01-15
ORD006,ST002,Colgate Toothpaste,Personal Care,10,89.00,2024-01-15
ORD007,ST003,Lays Chips Family Pack,Snacks,15,99.00,2024-01-15
ORD008,ST003,Sony Headphones,Electronics,2,4500.00,2024-01-15
ORD009,ST003,Amul Milk 1L,Dairy,20,62.00,2024-01-15
ORD010,ST001,Dove Soap 100g,Personal Care,6,65.00,2024-01-15`

const resourcesCreated = [
  { resource: 'Resource Group',  name: 'rg-freshmart-dev',             purpose: 'Container for all project resources' },
  { resource: 'Storage Account', name: 'stfreshmartdev',               purpose: 'Holds all data (landing + raw)' },
  { resource: 'Container',       name: 'landing',                      purpose: 'Staging area for uploaded files' },
  { resource: 'Container',       name: 'raw',                          purpose: 'Destination — Bronze layer' },
  { resource: 'Data Factory',    name: 'adf-freshmart-dev',            purpose: 'Pipeline orchestration' },
  { resource: 'Linked Service',  name: 'ls_blob_freshmart_landing',    purpose: 'Connection to landing container' },
  { resource: 'Linked Service',  name: 'ls_adls_freshmart',            purpose: 'Connection to ADLS Gen2 raw container' },
  { resource: 'Dataset',         name: 'ds_src_blob_daily_sales',      purpose: 'Points to landing/daily_sales.csv' },
  { resource: 'Dataset',         name: 'ds_sink_adls_raw_sales',       purpose: 'Points to raw/sales/daily_sales.csv' },
  { resource: 'Pipeline',        name: 'pl_copy_daily_sales_csv',      purpose: 'Copies the file end-to-end' },
]

const conceptsTable = [
  { concept: 'Resource Group',        what: 'Logical folder for Azure resources',              analogy: 'Project folder on your computer' },
  { concept: 'ADLS Gen2',             what: 'Cloud data lake with real folder hierarchy',      analogy: 'Massive intelligent hard drive' },
  { concept: 'Hierarchical Namespace',what: 'What makes ADLS Gen2 different from Blob',       analogy: 'Real folders vs simulated ones' },
  { concept: 'ADF',                   what: 'Visual pipeline orchestration tool',              analogy: 'Automated courier service' },
  { concept: 'Linked Service',        what: 'Saved connection to a data source',              analogy: 'Contact saved in your phone' },
  { concept: 'Dataset',               what: 'Pointer to a specific file or table',            analogy: 'Address written on a package' },
  { concept: 'Copy Activity',         what: 'Single action that copies data',                 analogy: 'The delivery truck' },
  { concept: 'Pipeline',              what: 'Container of one or more activities',            analogy: 'The full delivery workflow' },
  { concept: 'Source',                what: 'Where data comes FROM',                          analogy: 'Pickup location' },
  { concept: 'Sink',                  what: 'Where data goes TO',                             analogy: 'Delivery destination' },
  { concept: 'Debug',                 what: 'Test run on a draft pipeline',                   analogy: 'Proofreading before sending' },
  { concept: 'Publish',               what: 'Make pipeline live and schedulable',             analogy: 'Clicking Send' },
  { concept: 'Monitor',               what: 'View all pipeline run logs',                     analogy: 'Delivery tracking dashboard' },
]

const phases = [
  { phase: 'PHASE 0 — Prepare', time: '15 min', steps: ['Create an Azure free account', 'Create a Resource Group', 'Create the CSV file on your computer'] },
  { phase: 'PHASE 1 — Storage', time: '15 min', steps: ['Create ADLS Gen2 storage account', 'Create container and folder structure'] },
  { phase: 'PHASE 2 — ADF Setup', time: '10 min', steps: ['Create Azure Data Factory', 'Open ADF Studio'] },
  { phase: 'PHASE 3 — Build the Pipeline', time: '30 min', steps: ['Create Linked Service — Blob (source)', 'Create Linked Service — ADLS Gen2 (destination)', 'Create Dataset — source CSV', 'Create Dataset — destination ADLS', 'Create Pipeline + Copy Activity', 'Configure Source and Sink', 'Debug (test run)', 'Publish', 'Verify file in ADLS'] },
]

export default function Project01Page() {
  return (
    <LearnLayout
      title="Project 01 — Copy a CSV File to Azure Data Lake"
      description="Build your first Azure data pipeline from scratch. Copy a CSV file from a local landing zone into ADLS Gen2 using Azure Data Factory — the foundational pattern behind every data engineering pipeline in Azure."
      section="Projects"
      readTime="60–90 min"
      updatedAt="March 2026"
      breadcrumbs={[
        { label: 'Projects', href: '/learn/projects/azure-batch-pipeline' },
        { label: 'Project 01 — Copy CSV to ADLS', href: '/learn/projects/azure-batch-pipeline' },
      ]}
    >
      <LearningResourceJsonLd
        name="Azure Data Factory Tutorial: Copy CSV to ADLS Gen2"
        description="Build your first ADF pipeline to copy a CSV file from Azure Blob Storage into ADLS Gen2. Beginner-friendly, free, with full screenshots."
        url="https://asil-site.vercel.app/learn/projects/azure-batch-pipeline"
        datePublished="2026-03-01"
        keywords={['azure data factory', 'adls gen2', 'csv pipeline', 'azure data engineering']}
        timeRequired="PT75M"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://asil-site.vercel.app' },
          { name: 'Projects', url: 'https://asil-site.vercel.app/learn/projects' },
          { name: 'Project 01 — Copy CSV to ADLS', url: 'https://asil-site.vercel.app/learn/projects/azure-batch-pipeline' },
        ]}
      />

      {/* Project meta bar */}
      <div className="flex flex-wrap gap-3 my-6">
        {[
          { label: 'Series', value: 'Azure Data Engineering — Zero to Advanced' },
          { label: 'Project', value: '01 of 25' },
          { label: 'Level', value: 'Absolute Beginner' },
          { label: 'Time', value: '60–90 minutes' },
        ].map(item => (
          <div key={item.label} className="px-3 py-2 rounded-lg text-xs" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--muted)' }}>{item.label}: </span>
            <span className="font-semibold" style={{ color: 'var(--text)' }}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* What you will build */}
      <div className="my-6 p-5 rounded-xl" style={{ background: 'var(--surface)', border: '2px solid var(--accent)', borderLeft: '4px solid var(--accent)' }}>
        <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>What you will build</div>
        <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
          A pipeline that automatically copies a CSV file from your local computer into Azure cloud storage — the foundational pattern of every data engineering project in the world.
        </p>
      </div>

      {/* Real World Problem */}
      <h2>Real World Problem</h2>
      <p>
        <strong>The Company: FreshMart</strong> — a grocery chain with 10 stores across India.
      </p>
      <p>
        Every day, each store manager exports a file called <code>daily_sales.csv</code> from their billing software and saves it on their computer. That file just sits there. The data team at FreshMart HQ has zero visibility into what is happening across stores. They cannot answer basic questions like:
      </p>
      <ul className="my-4 space-y-1 text-sm pl-4" style={{ color: 'var(--text2)', listStyle: 'disc' }}>
        <li>Which store sold the most today?</li>
        <li>Which product is running out of stock?</li>
        <li>Is store revenue growing or shrinking week over week?</li>
      </ul>
      <p>
        <strong>The root problem:</strong> Data is trapped on individual laptops. There is no central place to store it, no way to query it, no way to analyse it.
      </p>
      <p>
        <strong>What we are going to do:</strong> Take that CSV file sitting on a laptop → upload it to Azure cloud storage automatically using a pipeline. This is the very first step of every data engineering project in the world — get the data off the source and into a central location.
      </p>

      {/* Pipeline diagram */}
      <div className="my-6 p-5 rounded-xl font-mono text-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>What we are building</div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="p-3 rounded-lg text-center" style={{ background: 'var(--bg2)', border: '1px solid var(--border)', minWidth: 140 }}>
            <div className="text-lg mb-1">💻</div>
            <div className="text-xs font-bold" style={{ color: 'var(--text)' }}>Your Computer</div>
            <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>daily_sales.csv</div>
          </div>
          <div className="text-2xl" style={{ color: 'var(--muted)' }}>→</div>
          <div className="p-3 rounded-lg text-center" style={{ background: '#0078d415', border: '1px solid #0078d430', minWidth: 140 }}>
            <div className="text-lg mb-1">⚙️</div>
            <div className="text-xs font-bold" style={{ color: '#50b0ff' }}>ADF Pipeline</div>
            <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>pl_copy_sales_csv</div>
          </div>
          <div className="text-2xl" style={{ color: 'var(--muted)' }}>→</div>
          <div className="p-3 rounded-lg text-center" style={{ background: '#00e67615', border: '1px solid #00e67630', minWidth: 140 }}>
            <div className="text-lg mb-1">🏦</div>
            <div className="text-xs font-bold" style={{ color: '#00e676' }}>ADLS Gen2</div>
            <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>raw/sales/daily_sales.csv</div>
          </div>
        </div>
        <p className="text-xs mt-4" style={{ color: 'var(--muted)' }}>Simple. One file. One destination. One pipeline. But this exact pattern is the foundation of every data engineering project you will ever build.</p>
      </div>

      {/* Concepts */}
      <h2>Concepts You Must Understand First</h2>
      <p>Before touching Azure, read this section completely — it will make every step feel logical instead of confusing.</p>

      <h3>What is Azure?</h3>
      <p>
        Azure is Microsoft's cloud platform. Instead of buying physical servers and hard drives — you rent them from Microsoft and pay only for what you use.
      </p>
      <p>
        Think of it like electricity. You do not build a power plant to get electricity at home. You plug into the grid and pay a monthly bill. Azure is the same — you plug into Microsoft's infrastructure and pay for what you consume. For data engineering, Azure gives you cloud storage, compute, pipelines, and dashboards.
      </p>

      <h3>What is Azure Data Factory (ADF)?</h3>
      <p>
        ADF is a data pipeline orchestration tool. It answers the question: <em>how do I move data from A to B automatically?</em>
      </p>
      <p>
        Think of ADF like a courier service. You tell it: pick up from this location (source), deliver to that location (destination), run every day at midnight, and alert me if delivery fails. That is exactly what ADF does with data.
      </p>

      <div className="my-6 space-y-2">
        {[
          { term: 'Linked Service', color: '#0078d4', desc: 'The connection details to reach a data source — like saving a contact in your phone (name + number).' },
          { term: 'Dataset',        color: '#00c2ff', desc: 'Points to the specific file or table you want — like telling the courier: pick up the red box.' },
          { term: 'Activity',       color: '#7b61ff', desc: 'One single action — copy, transform, run code. Like one step in the delivery process.' },
          { term: 'Pipeline',       color: '#00e676', desc: 'A container that holds one or more activities — the complete delivery workflow from start to finish.' },
        ].map(item => (
          <div key={item.term} className="flex gap-4 p-4 rounded-xl" style={{ background: 'var(--surface)', border: `1px solid ${item.color}30` }}>
            <span className="font-mono text-xs font-bold flex-shrink-0 w-28 mt-0.5" style={{ color: item.color }}>{item.term}</span>
            <p className="text-sm" style={{ color: 'var(--text2)' }}>{item.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-sm" style={{ color: 'var(--text2)' }}>In this project we will create 2 Linked Services, 2 Datasets, 1 Activity, and 1 Pipeline.</p>

      <h3>What is ADLS Gen2?</h3>
      <p>
        ADLS stands for Azure Data Lake Storage Generation 2. It is cloud storage optimized for data analytics workloads — think of it as a massive intelligent hard drive in the cloud that can store any file type, never runs out of space, and is directly connected to every Azure analytics service.
      </p>

      <Callout type="warning" label="⚠️ Critical — Enable Hierarchical Namespace">
        ADLS Gen2 is created by enabling one checkbox — <strong>Hierarchical Namespace</strong> — during storage account creation. This cannot be enabled after creation. If you forget it, you must delete the storage account and start over. We will cover this in detail in Step 4.
      </Callout>

      {/* Step by step overview */}
      <h2>Step by Step Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {phases.map((p, pi) => (
          <div key={p.phase} className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold" style={{ color: 'var(--accent)' }}>{p.phase}</span>
              <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--bg2)', color: 'var(--muted)' }}>{p.time}</span>
            </div>
            <ul className="space-y-1">
              {p.steps.map((s, si) => (
                <li key={s} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text2)' }}>
                  <span className="font-mono flex-shrink-0" style={{ color: 'var(--muted)' }}>
                    {String(pi === 0 ? si + 1 : pi === 1 ? si + 4 : pi === 2 ? si + 6 : si + 8).padStart(2, '0')}
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── PHASE 0 ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest" style={{ background: '#00c2ff15', color: '#00c2ff' }}>
        PHASE 0 — PREPARE
      </div>

      <h2>Step 1 — Create an Azure Account</h2>
      <p>
        Go to <strong>https://azure.microsoft.com/en-in/free</strong> and click <strong>"Start free"</strong>.
      </p>
      <p>You will get $200 free credit valid for 30 days, 12 months of popular services free, and always-free services including limited ADF and storage. You will need a Microsoft account, a phone number for verification, and a credit card for identity only — you will NOT be charged for free tier usage.</p>
      <Screenshot caption="Azure free account signup page — showing the 'Start free' button and the $200 credit offer" />
      <p>After signing up → go to <strong>https://portal.azure.com</strong>. You will land on the Azure Portal homepage — your control centre for everything Azure.</p>
      <Screenshot caption="Azure Portal homepage after first login — showing the top search bar, left sidebar, and the main dashboard area" />
      <div className="my-4 p-4 rounded-xl text-sm space-y-1" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="font-semibold text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>What you are looking at</p>
        {[
          ['Top search bar', 'Search for any Azure service by name — use this constantly'],
          ['Left sidebar',   'Your recently used services'],
          ['Main area',      'Your dashboard — empty now, fills up as you create resources'],
          ['Top right',      'Your account name, subscription, notifications'],
        ].map(([label, desc]) => (
          <p key={label} className="text-xs" style={{ color: 'var(--text2)' }}>
            <span className="font-mono font-semibold" style={{ color: 'var(--text)' }}>{label}</span> — {desc}
          </p>
        ))}
      </div>

      <h2>Step 2 — Create a Resource Group</h2>
      <p>
        A Resource Group is a logical folder that holds all Azure resources belonging to one project. Instead of having ADF, ADLS, and Databricks scattered randomly — you put them all in one Resource Group called <code>rg-freshmart-dev</code>.
      </p>
      <div className="my-4 p-4 rounded-xl text-sm space-y-1" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="font-semibold text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--muted)' }}>Why use a Resource Group?</p>
        {[
          ['See all costs in one place', 'How much is this entire project costing me?'],
          ['Delete everything at once',  'Done with the project? Delete the group and everything inside is gone.'],
          ['Permissions once',           'Give a teammate access to the group and they get access to everything inside.'],
        ].map(([title, desc]) => (
          <p key={title} className="text-xs" style={{ color: 'var(--text2)' }}>
            <span className="font-semibold" style={{ color: 'var(--text)' }}>{title}</span> — {desc}
          </p>
        ))}
      </div>
      <p>In the Azure Portal search bar → type <strong>"Resource groups"</strong> → click it.</p>
      <Screenshot caption="Azure Portal — typing 'Resource groups' in the search bar, showing the suggestion dropdown" />
      <p>Click <strong>"+ Create"</strong> (top left button).</p>
      <Screenshot caption="Resource groups page — showing the '+ Create' button at top left" />
      <p>Fill in the form exactly as shown:</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Subscription</span><span style={{ color: 'var(--accent)' }}>your subscription name — e.g. "Azure subscription 1"</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Resource group</span><span style={{ color: '#00e676' }}>rg-freshmart-dev</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Region</span><span style={{ color: '#00e676' }}>East US 2</span></div>
      </div>
      <Callout type="tip" label="🎯 Naming Convention">
        We use: <code>rg</code> = resource group, <code>freshmart</code> = project name, <code>dev</code> = environment. Professional teams always follow naming conventions. Get in the habit now — all 25 projects will use this same pattern.
      </Callout>
      <Screenshot caption="Resource group creation form — all three fields filled in exactly as shown above" />
      <p>Click <strong>"Review + Create"</strong> → then <strong>"Create"</strong>. Wait 5 seconds — you will see a notification: "Resource group created".</p>
      <Screenshot caption="Resource group successfully created — showing the overview page with name 'rg-freshmart-dev' and region 'East US 2'" />

      <h2>Step 3 — Create the Sample CSV File</h2>
      <p>
        This represents the <code>daily_sales.csv</code> that FreshMart store managers export from their billing software every day. Open <strong>Notepad</strong> (Windows) or <strong>TextEdit</strong> (Mac) and paste exactly this:
      </p>
      <div className="my-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <div className="px-4 py-2 flex items-center gap-2" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>daily_sales.csv</span>
        </div>
        <pre className="p-4 text-xs overflow-x-auto" style={{ background: 'var(--bg2)', color: 'var(--text2)', lineHeight: 1.6 }}>{csvData}</pre>
      </div>
      <p>Save the file as <strong><code>daily_sales.csv</code></strong> somewhere easy to find — your Desktop is fine.</p>
      <Screenshot caption="Notepad with the CSV content pasted in — showing the file before saving" />
      <Screenshot caption="Save As dialog — showing filename 'daily_sales.csv' being saved to Desktop" />

      {/* ── PHASE 1 ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest" style={{ background: '#0078d415', color: '#50b0ff' }}>
        PHASE 1 — STORAGE
      </div>

      <h2>Step 4 — Create ADLS Gen2 Storage Account</h2>
      <p>In the Azure Portal search bar → type <strong>"Storage accounts"</strong> → click it → click <strong>"+ Create"</strong>.</p>
      <Screenshot caption="Storage accounts page — showing the '+ Create' button at top left" />

      <h3>Basics Tab</h3>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 140, flexShrink: 0 }}>Resource group</span><span style={{ color: '#00e676' }}>rg-freshmart-dev</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 140, flexShrink: 0 }}>Storage account</span><span style={{ color: '#00e676' }}>stfreshmartdev</span><span style={{ color: '#ff9900', marginLeft: 8 }}>← no hyphens!</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 140, flexShrink: 0 }}>Region</span><span style={{ color: '#00e676' }}>East US 2</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 140, flexShrink: 0 }}>Performance</span><span style={{ color: '#00e676' }}>Standard</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 140, flexShrink: 0 }}>Redundancy</span><span style={{ color: '#00e676' }}>Locally-redundant storage (LRS)</span></div>
      </div>
      <Screenshot caption="Storage account creation — Basics tab completely filled in with all values as shown above" />

      <h3>Advanced Tab — The Most Important Checkbox</h3>
      <p>Click the <strong>"Advanced"</strong> tab → find the section called <strong>"Data Lake Storage Gen2"</strong> → enable <strong>Hierarchical namespace</strong>.</p>
      <Callout type="warning" label="⚠️ Do Not Skip This">
        This single checkbox converts a regular Azure Blob Storage account into ADLS Gen2. Without it, analytics tools run 30× slower and you get simulated folders instead of real ones. <strong>You cannot enable this after creation.</strong> If you forget, delete the storage account and recreate it.
      </Callout>
      <Screenshot caption="Advanced tab — showing the 'Hierarchical namespace' checkbox being checked under the Data Lake Storage Gen2 section" />
      <p>Leave all other tabs as default. Click <strong>"Review"</strong> → <strong>"Create"</strong>. Deployment takes about 30–60 seconds.</p>
      <Screenshot caption="Deployment complete — showing 'Your deployment is complete' with the resource name stfreshmartdev" />
      <p>Click <strong>"Go to resource"</strong>.</p>
      <Screenshot caption="Storage account overview page — highlighting the 'Azure Data Lake Storage Gen2' label and the name stfreshmartdev" />

      <h2>Step 5 — Create Container and Folder Structure</h2>
      <p>
        A container is like a top-level folder inside a storage account. We will create one container called <code>raw</code> — this is where all raw, unprocessed data lands. In later projects we will also have <code>processed</code> and <code>curated</code> containers following the Medallion Architecture.
      </p>
      <p>On the storage account page → left sidebar → click <strong>"Containers"</strong> → <strong>"+ Container"</strong>.</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 140, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>raw</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 140, flexShrink: 0 }}>Public access</span><span style={{ color: '#00e676' }}>Private (no anonymous access)</span></div>
      </div>
      <Screenshot caption="New container dialog — name 'raw' entered, Private selected" />
      <Screenshot caption="Container 'raw' now visible in the containers list" />
      <p>Click on the <strong>"raw"</strong> container → click <strong>"+ Add Directory"</strong> → name it <code>sales</code>.</p>
      <Screenshot caption="raw container showing the 'sales' directory created inside it" />
      <Callout type="tip" label="🎯 Why This Folder Structure?">
        We are starting organized. In future projects we will add <code>raw/products/</code>, <code>raw/customers/</code>, <code>raw/inventory/</code> as FreshMart grows. Starting with a clean hierarchy now saves massive headaches later.
      </Callout>

      {/* ── PHASE 2 ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest" style={{ background: '#7b61ff15', color: '#7b61ff' }}>
        PHASE 2 — ADF SETUP
      </div>

      <h2>Step 6 — Create Azure Data Factory</h2>
      <p>In the Azure Portal search bar → type <strong>"Data factories"</strong> → click it → click <strong>"+ Create"</strong>.</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Resource group</span><span style={{ color: '#00e676' }}>rg-freshmart-dev</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>adf-freshmart-dev</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Region</span><span style={{ color: '#00e676' }}>East US 2</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Version</span><span style={{ color: '#00e676' }}>V2</span></div>
      </div>
      <Screenshot caption="Data Factory creation form — all fields filled in as shown above" />
      <p>Click the <strong>"Git configuration"</strong> tab → check <strong>"Configure Git later"</strong>. Git integration is important for production but adds complexity for beginners — we will cover it in a later project.</p>
      <Screenshot caption="Git configuration tab — 'Configure Git later' checkbox checked" />
      <p>Click <strong>"Review + create"</strong> → <strong>"Create"</strong>. Deployment takes 1–2 minutes.</p>
      <Screenshot caption="ADF deployment complete — showing 'adf-freshmart-dev' successfully created" />

      <h2>Step 7 — Open ADF Studio</h2>
      <p>Click <strong>"Go to resource"</strong> → on the ADF overview page → click <strong>"Launch studio"</strong>. ADF Studio opens in a new browser tab — this is where you will spend 90% of your time.</p>
      <Screenshot caption="ADF overview page — showing the 'Launch studio' button in the centre" />
      <Screenshot caption="ADF Studio homepage — label each section: (1) Left sidebar icons, (2) Main canvas area, (3) Top toolbar" />
      <div className="my-4 p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>ADF Studio Layout</p>
        {[
          ['🏠 Home',    'Welcome page'],
          ['✏️ Author',  'Where you BUILD pipelines, datasets, linked services'],
          ['📊 Monitor', 'Where you SEE pipeline runs, success/failure logs'],
          ['🔧 Manage',  'Where you set up linked services and integration runtimes'],
        ].map(([icon, desc]) => (
          <div key={icon} className="flex gap-3 text-xs py-1.5" style={{ borderBottom: '1px solid var(--border)', color: 'var(--text2)' }}>
            <span className="w-28 font-mono flex-shrink-0" style={{ color: 'var(--text)' }}>{icon}</span>
            <span>{desc}</span>
          </div>
        ))}
      </div>

      {/* ── PHASE 3 ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest" style={{ background: '#ff990015', color: '#ff9900' }}>
        PHASE 3 — BUILD THE PIPELINE
      </div>

      <h2>Step 8 — Create Linked Service for Source (Blob Storage)</h2>
      <p>
        ADF lives in the cloud and cannot directly reach into your laptop. The solution: we first upload the CSV to a <strong>landing container</strong> in the same storage account, then ADF copies it from there to the <code>raw/sales/</code> destination.
      </p>
      <p>Think of it like a courier — the courier cannot teleport to your home. You drop the package at a collection point, then the courier picks it up and delivers it.</p>

      <h3>Upload the CSV to a landing container</h3>
      <p>Go to Azure Portal → Storage account <code>stfreshmartdev</code> → <strong>Containers</strong> → <strong>"+ Container"</strong>.</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>landing</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Public access</span><span style={{ color: '#00e676' }}>Private</span></div>
      </div>
      <Screenshot caption="Creating 'landing' container — name and private access level set" />
      <p>Click on the <strong>"landing"</strong> container → click <strong>"Upload"</strong> → select your <code>daily_sales.csv</code> from your Desktop → click <strong>"Upload"</strong>.</p>
      <Screenshot caption="landing container after upload — daily_sales.csv visible with file size and last modified date" />

      <h3>Create the Linked Service</h3>
      <p>Go back to <strong>ADF Studio</strong> → click <strong>"Manage"</strong> (toolbox icon in left sidebar) → click <strong>"Linked services"</strong> → click <strong>"+ New"</strong>.</p>
      <Screenshot caption="Linked services page — empty list and '+ New' button visible" />
      <p>In the search box → type <strong>"Azure Blob"</strong> → select <strong>"Azure Blob Storage"</strong> → click <strong>"Continue"</strong>.</p>
      <Screenshot caption="New linked service panel — 'Azure Blob Storage' selected in search results" />
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>ls_blob_freshmart_landing</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Connect via</span><span style={{ color: '#00e676' }}>AutoResolveIntegrationRuntime</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Authentication</span><span style={{ color: '#00e676' }}>Account key</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Storage account</span><span style={{ color: '#00e676' }}>stfreshmartdev</span></div>
      </div>
      <p>Click <strong>"Test connection"</strong> at the bottom. You should see a green ✅ <strong>"Connection successful"</strong>.</p>
      <Screenshot caption="Green 'Connection successful' message at the bottom of the linked service form" />
      <p>Click <strong>"Create"</strong>.</p>
      <Screenshot caption="Linked services list — ls_blob_freshmart_landing now visible" />

      <h2>Step 9 — Create Linked Service for Destination (ADLS Gen2)</h2>
      <p>Still in <strong>Manage → Linked services</strong> → click <strong>"+ New"</strong> → search <strong>"Azure Data Lake Storage Gen2"</strong> → select it → <strong>"Continue"</strong>.</p>
      <Screenshot caption="New linked service — 'Azure Data Lake Storage Gen2' selected" />
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>ls_adls_freshmart</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Connect via</span><span style={{ color: '#00e676' }}>AutoResolveIntegrationRuntime</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Authentication</span><span style={{ color: '#00e676' }}>Account key</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Storage account</span><span style={{ color: '#00e676' }}>stfreshmartdev</span></div>
      </div>
      <Callout type="info" label="💡 Same Storage Account, Two Linked Services?">
        Yes — in this project both source and destination live in <code>stfreshmartdev</code>. We still create two separate linked services because one represents Blob Storage behaviour (landing) and one represents ADLS Gen2 behaviour (raw, with hierarchical namespace). In real projects these will be completely different accounts.
      </Callout>
      <p>Click <strong>"Test connection"</strong> → ✅ green → click <strong>"Create"</strong>.</p>
      <Screenshot caption="Linked services list — now showing both: ls_blob_freshmart_landing and ls_adls_freshmart" />

      <h2>Step 10 — Create Source Dataset</h2>
      <p>
        A Dataset tells ADF which specific file to work with. The Linked Service is <em>how to connect</em> to the storage — the Dataset is <em>what file specifically</em> to read or write.
      </p>
      <p>Click <strong>"Author"</strong> (pencil icon in left sidebar) → click <strong>"+"</strong> next to <strong>"Datasets"</strong> → <strong>"New dataset"</strong>.</p>
      <Screenshot caption="Author tab — showing Datasets section with the '+' button highlighted" />
      <p>Search <strong>"Azure Blob Storage"</strong> → select it → <strong>"Continue"</strong>. Select format: <strong>"DelimitedText"</strong> (this means CSV) → <strong>"Continue"</strong>.</p>
      <Screenshot caption="Format selection — DelimitedText/CSV selected" />
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>ds_src_blob_daily_sales</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Linked service</span><span style={{ color: '#00e676' }}>ls_blob_freshmart_landing</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Container</span><span style={{ color: '#00e676' }}>landing</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>File</span><span style={{ color: '#00e676' }}>daily_sales.csv</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>First row as header</span><span style={{ color: '#00e676' }}>✅ Yes</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Import schema</span><span style={{ color: '#00e676' }}>From connection/store</span></div>
      </div>
      <Screenshot caption="Dataset properties form — all fields filled in exactly as shown" />
      <p>Click <strong>"OK"</strong> → then click the <strong>"Preview data"</strong> tab at the bottom. You should see all 10 rows of FreshMart sales data — this confirms ADF can read your file.</p>
      <Screenshot caption="Dataset preview — showing all 10 rows of CSV data in a clean table format" />
      <p>Click <strong>💾 Save</strong> (or Ctrl+S).</p>
      <Screenshot caption="Dataset saved — ds_src_blob_daily_sales visible in the Datasets list on the left" />

      <h2>Step 11 — Create Destination Dataset</h2>
      <p>Click <strong>"+"</strong> next to <strong>"Datasets"</strong> → <strong>"New dataset"</strong> → search <strong>"Azure Data Lake Storage Gen2"</strong> → select it → <strong>"Continue"</strong>. Select format: <strong>"DelimitedText"</strong> → <strong>"Continue"</strong>.</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>ds_sink_adls_raw_sales</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Linked service</span><span style={{ color: '#00e676' }}>ls_adls_freshmart</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Container</span><span style={{ color: '#00e676' }}>raw</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Directory</span><span style={{ color: '#00e676' }}>sales</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>File</span><span style={{ color: '#00e676' }}>daily_sales.csv</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>First row as header</span><span style={{ color: '#00e676' }}>✅ Yes</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Import schema</span><span style={{ color: '#00e676' }}>None</span><span style={{ color: '#ff9900', marginLeft: 8 }}>← destination does not need a schema</span></div>
      </div>
      <Screenshot caption="Destination dataset form — all fields showing raw/sales/daily_sales.csv path" />
      <p>Click <strong>"OK"</strong> → <strong>💾 Save</strong>.</p>
      <Screenshot caption="Datasets list — now showing both ds_src_blob_daily_sales and ds_sink_adls_raw_sales" />

      <h2>Step 12 — Create the Pipeline</h2>
      <p>Click <strong>"+"</strong> next to <strong>"Pipelines"</strong> → <strong>"New pipeline"</strong>. A blank canvas opens.</p>
      <Screenshot caption="Author tab — Pipelines section with '+' button highlighted" />
      <p>In the <strong>Properties</strong> panel on the right, set the name and description:</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>pl_copy_daily_sales_csv</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Description</span><span style={{ color: '#00e676' }}>Copies daily_sales.csv from landing zone to ADLS raw/sales/</span></div>
      </div>
      <Screenshot caption="Pipeline canvas — Properties panel on right showing the name and description filled in" />
      <Screenshot caption="Empty pipeline canvas — labelling each area: top toolbar, left activities panel, centre canvas, bottom properties panel" />

      <h2>Step 13 — Add and Configure Copy Activity</h2>
      <p>
        The Copy Activity does one thing: read data from a source dataset and write it to a sink (destination) dataset. <em>Source</em> = where data comes FROM. <em>Sink</em> = where data goes TO. (Sink is standard data engineering terminology — like a kitchen sink where water flows into.)
      </p>
      <p>In the left activities panel → expand <strong>"Move & transform"</strong> → drag <strong>"Copy data"</strong> onto the canvas.</p>
      <Screenshot caption="Dragging 'Copy data' activity from the left panel onto the canvas" />
      <Screenshot caption="Copy data activity placed on the canvas — a blue box with 'Copy data' label" />
      <p>Click the Copy activity box to select it. The bottom panel shows configuration tabs. Set the following in each tab:</p>

      <h3>General Tab</h3>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>copy_daily_sales_to_adls</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Description</span><span style={{ color: '#00e676' }}>Reads daily_sales.csv from landing and writes to raw/sales/</span></div>
      </div>
      <Screenshot caption="General tab — activity name and description filled in" />

      <h3>Source Tab</h3>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Source dataset</span><span style={{ color: '#00e676' }}>ds_src_blob_daily_sales</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>File path type</span><span style={{ color: '#00e676' }}>File path in dataset</span></div>
      </div>
      <Screenshot caption="Source tab — ds_src_blob_daily_sales selected as source dataset" />

      <h3>Sink Tab</h3>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Sink dataset</span><span style={{ color: '#00e676' }}>ds_sink_adls_raw_sales</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Copy behavior</span><span style={{ color: '#00e676' }}>PreserveHierarchy</span></div>
      </div>
      <Screenshot caption="Sink tab — ds_sink_adls_raw_sales selected as sink dataset" />

      <h3>Mapping Tab</h3>
      <p>Click <strong>"Mapping"</strong> → click <strong>"Import schemas"</strong>. ADF will automatically detect all columns and map them 1:1.</p>
      <Screenshot caption="Mapping tab — all columns auto-mapped with arrows between source and destination" />
      <p>Click <strong>💾 Save</strong>.</p>
      <Screenshot caption="Saved pipeline — pl_copy_daily_sales_csv visible in the Pipelines list on the left" />

      <h2>Step 14 — Debug (Test Run)</h2>
      <p>
        Before scheduling or publishing anything, always run a <strong>Debug</strong> first. Debug runs the pipeline immediately using your current draft — no effect on production.
      </p>
      <p>Click <strong>"Debug"</strong> in the top toolbar. No parameters for this pipeline — click <strong>"OK"</strong>.</p>
      <Screenshot caption="Top toolbar — Debug button highlighted with cursor pointing to it" />
      <p>Watch the canvas. The Copy activity will show:</p>
      <div className="my-4 flex gap-4">
        {[['🟡 Yellow', 'Running'], ['✅ Green', 'Success'], ['🔴 Red', 'Failed']].map(([icon, label]) => (
          <div key={label} className="px-3 py-2 rounded-lg text-xs text-center flex-1" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="text-base mb-1">{icon.split(' ')[0]}</div>
            <div style={{ color: 'var(--text)' }}>{icon.split(' ')[1]}</div>
            <div style={{ color: 'var(--muted)' }}>{label}</div>
          </div>
        ))}
      </div>
      <Screenshot caption="Pipeline running — Copy activity showing yellow/spinning status" />
      <Screenshot caption="Pipeline succeeded — Copy activity showing green checkmark" />
      <p>At the bottom → <strong>"Output"</strong> tab → click the <strong>👓 glasses icon</strong> next to the run to see details.</p>
      <Screenshot caption="Copy activity run details — showing files read: 1, files written: 1, data read and written amounts" />

      <h2>Step 15 — Publish</h2>
      <p>
        In ADF, everything you build exists as a <strong>draft</strong> until published. Debug runs work on drafts. But triggers and scheduled runs only use <strong>published</strong> pipelines.
      </p>
      <Callout type="tip" label="🎯 Draft vs Published">
        Think of it like a Google Doc — you are editing a draft. Publishing is clicking "Share" so others and scheduled triggers can see and use the final version. Always publish after making changes.
      </Callout>
      <p>Click <strong>"Publish all"</strong> in the top toolbar. A panel shows everything that will be published — all 5 items we created. Click <strong>"Publish"</strong>.</p>
      <Screenshot caption="Publish panel — showing all 5 items: pipeline, 2 datasets, 2 linked services" />
      <Screenshot caption="'Successfully published' notification in the top right corner" />

      <h2>Step 16 — Verify File in ADLS</h2>
      <p>Go to Azure Portal → <strong>Storage accounts</strong> → <code>stfreshmartdev</code> → <strong>Containers</strong> → <strong>raw</strong> → <strong>sales</strong>.</p>
      <Screenshot caption="sales folder contents — showing daily_sales.csv file with file size and last modified timestamp" />
      <p>Click on <code>daily_sales.csv</code> → click <strong>"Edit"</strong> to preview its contents.</p>
      <Screenshot caption="File preview in Azure Portal — showing all 10 rows of FreshMart sales data confirming the copy was successful" />

      <Callout type="example" label="🎉 You did it">
        You just completed your first Azure Data Engineering pipeline. A CSV file that was sitting on a laptop is now safely stored in Azure Data Lake — accessible to Databricks, Synapse, and Power BI — copied by an automated pipeline that you built from scratch.
      </Callout>

      <h2>Step 17 — Check the Monitor Tab</h2>
      <p>Go back to ADF Studio → click <strong>"Monitor"</strong> (bar chart icon in the left sidebar). In production, this is where you check every morning that all pipelines ran successfully overnight.</p>
      <Screenshot caption="Monitor tab — showing the pipeline run for pl_copy_daily_sales_csv with status 'Succeeded', duration, and timestamp" />
      <p>Click on the pipeline run to see full details.</p>
      <Screenshot caption="Pipeline run detail — showing the copy activity, its duration, rows copied, and data volume" />

      {/* Resources Created Table */}
      <h2>Resources Created — Summary</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              {['Resource', 'Name', 'Purpose'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-mono uppercase" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resourcesCreated.map((r, i) => (
              <tr key={r.name} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--surface)' : 'transparent' }}>
                <td className="py-3 px-4 text-xs font-semibold" style={{ color: 'var(--accent)' }}>{r.resource}</td>
                <td className="py-3 px-4 font-mono text-xs" style={{ color: 'var(--text)' }}>{r.name}</td>
                <td className="py-3 px-4 text-xs" style={{ color: 'var(--text2)' }}>{r.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key Concepts Table */}
      <h2>Key Concepts Reference</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              {['Concept', 'What It Is', 'Analogy'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-mono uppercase" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {conceptsTable.map((c, i) => (
              <tr key={c.concept} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--surface)' : 'transparent' }}>
                <td className="py-2 px-4 font-mono text-xs font-bold" style={{ color: 'var(--accent)' }}>{c.concept}</td>
                <td className="py-2 px-4 text-xs" style={{ color: 'var(--text2)' }}>{c.what}</td>
                <td className="py-2 px-4 text-xs" style={{ color: 'var(--text2)' }}>{c.analogy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Common Mistakes */}
      <h2>Common Mistakes</h2>
      <div className="space-y-3 my-6">
        {[
          { mistake: 'Forgetting to enable Hierarchical Namespace', fix: 'Delete the storage account and recreate it — cannot be enabled after creation' },
          { mistake: 'Not testing connection before saving Linked Service', fix: 'Always click "Test connection" and wait for the green tick before saving' },
          { mistake: 'Forgetting to Publish after building', fix: 'Always click "Publish all" after making changes — triggers use published version only' },
          { mistake: 'Wrong file path in dataset', fix: 'Double-check container name, directory name, and filename in the dataset settings' },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid #ff6b6b30' }}>
            <div className="flex items-start gap-3">
              <span className="text-base flex-shrink-0">⚠️</span>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>{item.mistake}</p>
                <p className="text-xs" style={{ color: 'var(--text2)' }}><span style={{ color: '#00e676' }}>Fix: </span>{item.fix}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* What is next */}
      <div className="my-8 p-6 rounded-xl" style={{ background: 'var(--surface)', border: '2px solid var(--accent2)' }}>
        <div className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--accent2)' }}>What is coming in Project 02</div>
        <p className="text-sm mb-3" style={{ color: 'var(--text)' }}>
          Right now our pipeline copies <strong>one specific file</strong>. But FreshMart has 10 stores — that means 10 files: <code>store_ST001_sales.csv</code> through <code>store_ST010_sales.csv</code>.
        </p>
        <p className="text-sm" style={{ color: 'var(--text2)' }}>
          In Project 02, you will learn to use the <strong>ForEach activity</strong> to loop through all 10 files and copy them in one pipeline run — instead of creating 10 separate Copy activities. Same resources. Same storage account. Same ADF. Just smarter.
        </p>
      </div>

      <KeyTakeaways items={[
        'ADLS Gen2 requires the Hierarchical Namespace checkbox to be enabled at creation time — this cannot be changed later',
        'ADF cannot reach your local laptop — upload files to a landing container first, then ADF copies from there',
        'Always test connections on Linked Services before saving — catch errors early',
        'Debug runs use your draft pipeline — Publish to make the pipeline available to triggers and schedules',
        'Source = where data comes FROM. Sink = where data goes TO. These are standard data engineering terms',
        'The Monitor tab is your daily health check — every pipeline run is logged with status, duration, and row counts',
        'Resource Groups let you see all project costs together and delete everything with one click when done',
      ]} />
    </LearnLayout>
  )
}