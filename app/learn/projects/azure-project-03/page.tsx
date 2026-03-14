import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { LearningResourceJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd'

export const metadata = {
  title: 'Azure Data Factory Parameterized Pipeline with Run Date & Trigger — Project 03',
  description:
    'Pass a run_date parameter to an ADF pipeline at runtime and build file names automatically. Add a scheduled trigger for fully automated nightly data ingestion. Free tutorial.',
  keywords: [
    'azure data factory parameters tutorial',
    'adf pipeline run date parameter',
    'azure data factory scheduled trigger',
    'adf date partitioning',
    'parameterized azure pipeline',
    'adf trigger tutorial',
    'date-based file ingestion adf',
  ],
  alternates: {
    canonical: 'https://chaduvuko.com/learn/projects/azure-project-03',
  },
  openGraph: {
    title: 'ADF Parameterized Pipeline with Run Date & Scheduled Trigger — Free Tutorial',
    description:
      'Pass a date at runtime and ADF builds the correct file names automatically. Add a midnight trigger for zero-touch nightly ingestion.',
    url: 'https://chaduvuko.com/learn/projects/azure-project-03',
    type: 'article',
    images: [
      {
        url: 'https://chaduvuko.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Azure Data Factory Parameterized Pipeline Tutorial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADF Parameterized Pipeline with Scheduled Trigger — Free Tutorial',
    description:
      'Pass a run_date parameter, build file names dynamically, and schedule nightly ingestion. Full walkthrough, no paywall.',
    images: ['https://chaduvuko.com/og-image.png'],
  },
}
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

function ExprBox({ expr, result, label }: { expr: string; result?: string; label?: string }) {
  return (
    <div className="my-3 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      {label && (
        <div className="px-4 py-1.5" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{label}</span>
        </div>
      )}
      <div className="px-4 py-3" style={{ background: 'var(--bg2)' }}>
        <code className="text-sm" style={{ color: '#7b61ff' }}>{expr}</code>
        {result && <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>→ produces: <span style={{ color: '#00e676' }}>{result}</span></p>}
      </div>
    </div>
  )
}

const expressions = [
  { expr: "@pipeline().parameters.run_date",                                  result: '"2024-01-15"  (exactly what you passed in)',          desc: 'Read the run_date parameter' },
  { expr: "@formatDateTime(pipeline().parameters.run_date, 'yyyyMMdd')",       result: '"20240115"  (no dashes — for file names)',             desc: 'Date formatted for file names' },
  { expr: "@formatDateTime(pipeline().parameters.run_date, 'yyyy-MM-dd')",     result: '"2024-01-15"  (with dashes — for folder names)',       desc: 'Date formatted for folder names' },
  { expr: "@formatDateTime(trigger().scheduledTime, 'yyyy-MM-dd')",            result: 'The night the trigger fired — e.g. "2024-01-16"',      desc: 'Used inside trigger parameters' },
]

const allExpressions = [
  { expr: "2024-01-15",                                                                              where: 'run_date parameter default (plain static — no expression allowed here)' },
  { expr: "date=@{pipeline().parameters.run_date}",                                                  where: 'Set Variable activity — builds the folder name' },
  { expr: "@pipeline().parameters.store_ids",                                                        where: 'ForEach Items — the list to loop through' },
  { expr: "@variables('run_date_folder')",                                                           where: 'Dataset property — passes folder to dataset' },
  { expr: "store_@{item()}_sales_@{formatDateTime(pipeline().parameters.run_date,'yyyyMMdd')}.csv",  where: 'Dataset property — builds the full file name' },
  { expr: "store_sales/@{dataset().run_date_folder}",                                               where: 'Source dataset Directory field' },
  { expr: "sales/@{dataset().run_date_folder}",                                                     where: 'Sink dataset Directory field' },
  { expr: "@{formatDateTime(trigger().scheduledTime,'yyyy-MM-dd')}",                                 where: 'Trigger parameter — passes the correct date nightly' },
]

const conceptsTable = [
  { concept: 'run_date parameter',          what: 'Date passed into the pipeline from outside',          why: 'Enables backfill, reprocessing, and idempotency' },
  { concept: 'Idempotency',                 what: 'Running the same date twice gives the same result',   why: 'Production pipelines must be safe to rerun' },
  { concept: 'formatDateTime()',            what: 'ADF function that formats a date into a string',       why: 'Builds file names and folder paths from dates' },
  { concept: 'String interpolation',        what: 'Embedding @{expressions} inside a text string',       why: 'Build dynamic strings like file names' },
  { concept: 'Set Variable activity',       what: 'Computes and stores a value during the pipeline run', why: 'Avoids repeating the same expression everywhere' },
  { concept: "@variables('name')",          what: 'Reads a variable value you set earlier',              why: 'Use one computed value in multiple places' },
  { concept: 'trigger().scheduledTime',     what: 'The time the trigger was scheduled to fire',          why: 'Safe, predictable way to get the date for a run' },
  { concept: 'Hive-style partitioning',     what: 'Folder naming like date=YYYY-MM-DD',                  why: 'Industry standard — analytics tools scan only what they need' },
  { concept: 'Schedule trigger',            what: 'Runs a pipeline on a fixed schedule',                  why: 'Automates nightly runs with zero human involvement' },
  { concept: 'Backfill',                    what: 'Running the pipeline for a past date',                 why: 'Fix failed runs without affecting other dates' },
]

const newItems = [
  { item: 'Dataset',   name: 'ds_src_blob_dated_store_sales', desc: 'Source with 2 parameters: run_date_folder + file_name' },
  { item: 'Dataset',   name: 'ds_sink_adls_dated_sales',      desc: 'Sink with 2 parameters: run_date_folder + file_name' },
  { item: 'Pipeline',  name: 'pl_copy_store_sales_by_date',   desc: 'Set Variable → ForEach → Copy, driven by run_date' },
  { item: 'Parameter', name: 'run_date (String)',              desc: 'Date to process — controls file names and folder' },
  { item: 'Parameter', name: 'store_ids (Array)',              desc: 'List of store IDs to loop through' },
  { item: 'Variable',  name: 'run_date_folder (String)',       desc: 'Computed folder name like date=2024-01-15' },
  { item: 'Activity',  name: 'set_run_date_folder',           desc: 'Set Variable — builds the date= folder name' },
  { item: 'Activity',  name: 'ForEach_store_ids',             desc: 'Loops through store IDs' },
  { item: 'Activity',  name: 'copy_dated_store_file',         desc: 'Copies one store file per iteration' },
  { item: 'Trigger',   name: 'trigger_daily_midnight',        desc: 'Fires every night at midnight, passes today as run_date' },
]

export default function Project03Page() {
  return (
    <LearnLayout
      title="Project 03 — Parameterized Pipeline with Run Date"
      description="Build a fully automated pipeline where you pass a date at runtime and ADF constructs the correct file names and folder paths automatically. Add a scheduled trigger and the pipeline runs every night at midnight with zero human involvement."
      section="Projects"
      readTime="75–90 min"
      updatedAt="March 2026"
      breadcrumbs={[
        { label: 'Projects', href: '/learn/projects/azure-batch-pipeline' },
        { label: 'Project 03 — Run Date Pipeline', href: '/learn/projects/azure-project-03' },
      ]}
      prev={{ title: 'Project 02 — ForEach Loop', href: '/learn/projects/azure-project-02' }}
    >

      <LearningResourceJsonLd name="ADF Parameterized Pipeline with Run Date and Trigger" description="Pass a run_date parameter at runtime and add a scheduled trigger for nightly ingestion." url="https://chaduvuko.com/learn/projects/azure-project-03" datePublished="2026-03-01" keywords={['azure data factory parameters', 'adf scheduled trigger', 'adf date partitioning']} timeRequired="PT75M" />
      <BreadcrumbJsonLd items={[{ name: 'Home', url: 'https://chaduvuko.com' }, { name: 'Projects', url: 'https://chaduvuko.com/learn/projects' }, { name: 'Project 03 — Parameterized Pipeline', url: 'https://chaduvuko.com/learn/projects/azure-project-03' }]} />

      {/* Meta bar */}
      <div className="flex flex-wrap gap-3 my-6">
        {[
          { label: 'Series',    value: 'Azure Data Engineering — Zero to Advanced' },
          { label: 'Project',   value: '03 of 25' },
          { label: 'Level',     value: 'Beginner' },
          { label: 'Builds on', value: 'Project 01 + 02 — same resources' },
          { label: 'Time',      value: '75–90 minutes' },
        ].map(item => (
          <div key={item.label} className="px-3 py-2 rounded-lg text-xs" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--muted)' }}>{item.label}: </span>
            <span className="font-semibold" style={{ color: 'var(--text)' }}>{item.value}</span>
          </div>
        ))}
      </div>

      <div className="my-6 p-5 rounded-xl" style={{ background: 'var(--surface)', border: '2px solid var(--accent)', borderLeft: '4px solid var(--accent)' }}>
        <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>What you will build</div>
        <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
          A pipeline that takes a date as input, builds the correct file names and folder paths automatically, and copies all 10 store files into date-partitioned ADLS folders — triggered automatically every night at midnight.
        </p>
      </div>

      {/* Real World Problem */}
      <h2>Real World Problem</h2>
      <p>Let's be honest about what Projects 01 and 02 did and did not solve:</p>
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid #00e67630' }}>
          <div className="text-xs font-mono font-bold mb-3" style={{ color: '#00e676' }}>✅ Already Solved</div>
          <ul className="space-y-1 text-xs" style={{ color: 'var(--text2)' }}>
            <li>Moving one file to the cloud</li>
            <li>Moving multiple files with ForEach</li>
          </ul>
        </div>
        <div className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid #ff6b6b30' }}>
          <div className="text-xs font-mono font-bold mb-3" style={{ color: '#ff6b6b' }}>❌ Still Not Solved</div>
          <ul className="space-y-1 text-xs" style={{ color: 'var(--text2)' }}>
            <li>Files are named the same every day</li>
            <li>Someone still presses Debug manually</li>
            <li>Miss a day and that data is gone</li>
            <li>No way to tell which file belongs to which day</li>
          </ul>
        </div>
      </div>

      <p>Here is what FreshMart's IT team actually needs:</p>
      <div className="my-4 p-4 rounded-xl text-sm italic" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent)' }}>
        <p style={{ color: 'var(--text2)' }}>"Every night at 11:30 PM the billing system exports files automatically. The file names include the date — like <code>store_ST001_sales_20240115.csv</code> for January 15th. We need a pipeline to run automatically at midnight, pick up that night's files, and copy them to ADLS — without anyone pressing a button."</p>
      </div>

      <p>This is how every production data pipeline in the real world works:</p>
      <div className="my-6 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        {[
          { time: '11:30 PM', color: '#ff9900', text: 'Billing system exports files with today\'s date in the name' },
          { time: '12:00 AM', color: '#7b61ff', text: 'ADF pipeline triggers automatically' },
          { time: '12:00 AM', color: '#7b61ff', text: 'Pipeline reads today\'s date, builds the correct file names' },
          { time: '12:01 AM', color: '#00c2ff', text: 'All 10 store files copied to ADLS' },
          { time: '12:05 AM', color: '#00e676', text: 'Data team wakes up to fresh data. Nobody pressed anything.' },
        ].map(row => (
          <div key={row.time + row.text} className="flex gap-4">
            <span className="flex-shrink-0 w-20" style={{ color: row.color }}>{row.time}</span>
            <span style={{ color: 'var(--text2)' }}>{row.text}</span>
          </div>
        ))}
      </div>

      {/* Concepts */}
      <h2>Concepts You Must Understand First</h2>

      <h3>Why Pass run_date as a Parameter?</h3>
      <p>The most important design decision in this project. Here is the problem with not using a parameter:</p>
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '2px solid #ff6b6b40' }}>
          <div className="text-xs font-mono font-bold mb-3" style={{ color: '#ff6b6b' }}>❌ Hardcode today's date inside pipeline</div>
          <ul className="space-y-2 text-xs" style={{ color: 'var(--text2)' }}>
            <li>Pipeline fails on Monday</li>
            <li>You rerun it on Tuesday</li>
            <li>It processes Tuesday's data again</li>
            <li className="font-semibold" style={{ color: '#ff6b6b' }}>Monday's data is lost forever</li>
            <li>Cannot reprocess historical dates</li>
          </ul>
        </div>
        <div className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '2px solid #00e67640' }}>
          <div className="text-xs font-mono font-bold mb-3" style={{ color: '#00e676' }}>✅ Pass run_date as a parameter</div>
          <ul className="space-y-2 text-xs" style={{ color: 'var(--text2)' }}>
            <li>Pipeline fails on Monday</li>
            <li>You rerun with run_date = "2024-01-15"</li>
            <li>It correctly reprocesses Monday's data</li>
            <li className="font-semibold" style={{ color: '#00e676' }}>No data lost. Full control.</li>
            <li>Backfill any past date anytime</li>
          </ul>
        </div>
      </div>
      <Callout type="info" label="💡 Idempotency — The Professional Standard">
        When a pipeline can be run multiple times for the same date and always produce the same correct result — that is called <strong>idempotency</strong>. Every production data pipeline you build from here should be idempotent. The <code>run_date</code> parameter is how you achieve it.
      </Callout>

      <h3>Important ADF Limitation — Parameter Defaults Cannot Be Expressions</h3>
      <Callout type="warning" label="⚠️ Read This Before You Build">
        This caught many people off guard. Pipeline parameter default values in ADF must be <strong>plain static text</strong> — ADF does not evaluate expressions there. This will NOT work as a default:
      </Callout>
      <ExprBox expr="@{formatDateTime(utcNow(), 'yyyy-MM-dd')}  ← ADF treats this as plain text, not an expression. You get an error." />
      <p>The fix is simple: use a plain static date as the default value, and let the <strong>trigger</strong> pass the real dynamic date at runtime.</p>
      <ExprBox expr='2024-01-15  ← plain static date. Works perfectly as a default.' result="Used during Debug. Trigger passes the real date when it fires." />

      <h3>How Do Dynamic Expressions Work with Dates?</h3>
      <p>ADF has built-in date formatting functions. These are the ones we use in this project:</p>
      <div className="my-4 space-y-2">
        {expressions.map(e => (
          <div key={e.expr} className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="text-xs font-mono mb-1" style={{ color: 'var(--muted)' }}>{e.desc}</div>
            <code className="text-xs" style={{ color: '#7b61ff' }}>{e.expr}</code>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>→ <span style={{ color: '#00e676' }}>{e.result}</span></p>
          </div>
        ))}
      </div>
      <p>The <code>@{`{ }`}</code> inside a text string is called <strong>string interpolation</strong>. ADF evaluates what is inside the braces and inserts the result:</p>
      <ExprBox
        label="How a file name gets built"
        expr={`store_@{item()}_sales_@{formatDateTime(pipeline().parameters.run_date,'yyyyMMdd')}.csv`}
        result="store_ST001_sales_20240115.csv  (when item()=ST001, run_date=2024-01-15)"
      />

      <h3>Hive-Style Partitioning — The Folder Structure We Are Building</h3>
      <p>Good data engineers organize ADLS by date. This makes it easy to find any day's data and lets analytics tools skip folders they do not need — dramatically faster and cheaper to query.</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs" style={{ background: 'var(--surface)', border: '1px solid var(--border)', lineHeight: 2 }}>
        <p style={{ color: '#00e676' }}>raw/sales/</p>
        <p className="pl-4" style={{ color: '#00c2ff' }}>├── date=2024-01-15/</p>
        <p className="pl-8" style={{ color: 'var(--text2)' }}>│   ├── store_ST001_sales_20240115.csv</p>
        <p className="pl-8" style={{ color: 'var(--text2)' }}>│   └── ... (10 files)</p>
        <p className="pl-4" style={{ color: '#00c2ff' }}>├── date=2024-01-16/</p>
        <p className="pl-8" style={{ color: 'var(--text2)' }}>│   └── ... (10 files)</p>
        <p className="pl-4" style={{ color: '#00c2ff' }}>└── date=2024-01-17/</p>
        <p className="pl-8" style={{ color: 'var(--text2)' }}>    └── ... (10 files)</p>
      </div>
      <p>The <code>date=YYYY-MM-DD</code> folder naming convention is the industry standard — called <strong>Hive-style partitioning</strong>. Databricks, Synapse, and Athena all understand it natively.</p>

      <h3>What is a Trigger?</h3>
      <div className="my-4 space-y-2">
        {[
          { type: 'Schedule Trigger',         color: '#ff9900', desc: 'Runs on a fixed schedule — every day at midnight, every hour, every Monday. Most common type. What we use in this project.' },
          { type: 'Tumbling Window Trigger',  color: '#7b61ff', desc: 'Like a schedule trigger but with built-in backfill. If the pipeline was down for 3 days, it automatically queues 3 missed runs.' },
          { type: 'Event Trigger',            color: '#00c2ff', desc: 'Fires when a file arrives in ADLS. "As soon as a new file lands, start the pipeline." We use this in Project 05.' },
        ].map(t => (
          <div key={t.type} className="flex gap-4 p-4 rounded-xl" style={{ background: 'var(--surface)', border: `1px solid ${t.color}30` }}>
            <span className="text-xs font-mono font-bold flex-shrink-0 w-44" style={{ color: t.color }}>{t.type}</span>
            <p className="text-xs" style={{ color: 'var(--text2)' }}>{t.desc}</p>
          </div>
        ))}
      </div>

      {/* Pipeline diagram */}
      <div className="my-6 p-5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>What we are building</div>
        <div className="flex flex-wrap gap-6 text-xs font-mono">
          <div>
            <div className="mb-2" style={{ color: '#ff9900' }}>landing/store_sales/date=2024-01-15/</div>
            <div style={{ color: 'var(--text2)' }}>store_ST001_sales_20240115.csv</div>
            <div style={{ color: 'var(--text2)' }}>store_ST002_sales_20240115.csv</div>
            <div style={{ color: 'var(--muted)' }}>... 8 more</div>
          </div>
          <div className="flex flex-col justify-center gap-1">
            <div className="text-2xl" style={{ color: 'var(--muted)' }}>→</div>
            <div style={{ color: '#7b61ff' }}>run_date</div>
            <div style={{ color: '#7b61ff' }}>parameter</div>
          </div>
          <div>
            <div className="mb-2" style={{ color: '#00e676' }}>raw/sales/date=2024-01-15/</div>
            <div style={{ color: 'var(--text2)' }}>store_ST001_sales_20240115.csv</div>
            <div style={{ color: 'var(--text2)' }}>store_ST002_sales_20240115.csv</div>
            <div style={{ color: 'var(--muted)' }}>... 8 more</div>
          </div>
        </div>
        <div className="mt-4 pt-4 text-xs" style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
          Pipeline: pl_copy_store_sales_by_date · Trigger: every night at midnight · Passes today as run_date automatically
        </div>
      </div>

      {/* ── PHASE 1 ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest" style={{ background: '#00c2ff15', color: '#00c2ff' }}>
        PHASE 1 — PREPARE DATA
      </div>

      <h2>Step 1 — Create Date-Based CSV Files</h2>
      <p>
        This time the file names include the date: <code>store_ST001_sales_20240115.csv</code>. We create files for <strong>two dates</strong> (January 15 and 16) so we can test backfill — running the pipeline for different dates without changing anything.
      </p>
      <p>On your Desktop create a folder called <code>freshmart_dated_files</code>. Inside it create two subfolders: <code>20240115</code> and <code>20240116</code>.</p>
      <Screenshot caption="Desktop folder 'freshmart_dated_files' — showing two subfolders: 20240115 and 20240116" />

      <p>Inside <code>20240115</code> — create all 10 files. Here are the first two as templates. Follow the same pattern for stores ST003–ST010.</p>

      {[
        { file: 'store_ST001_sales_20240115.csv', content: `order_id,store_id,product_name,category,quantity,unit_price,order_date
ORD1001,ST001,Basmati Rice 5kg,Grocery,12,299.00,2024-01-15
ORD1002,ST001,Samsung TV 43inch,Electronics,2,32000.00,2024-01-15
ORD1003,ST001,Amul Butter 500g,Dairy,25,240.00,2024-01-15
ORD1004,ST001,Colgate Toothpaste,Personal Care,30,89.00,2024-01-15
ORD1005,ST001,Nike Running Shoes,Apparel,5,4500.00,2024-01-15` },
        { file: 'store_ST002_sales_20240115.csv', content: `order_id,store_id,product_name,category,quantity,unit_price,order_date
ORD2001,ST002,Sunflower Oil 1L,Grocery,18,145.00,2024-01-15
ORD2002,ST002,iPhone 14,Electronics,1,75000.00,2024-01-15
ORD2003,ST002,Amul Milk 1L,Dairy,40,62.00,2024-01-15
ORD2004,ST002,Dove Soap 100g,Personal Care,50,65.00,2024-01-15
ORD2005,ST002,Levis Jeans,Apparel,8,2999.00,2024-01-15` },
      ].map(f => (
        <div key={f.file} className="my-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          <div className="px-4 py-2" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
            <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>{f.file}</span>
          </div>
          <pre className="p-4 text-xs overflow-x-auto" style={{ background: 'var(--bg2)', color: 'var(--text2)', lineHeight: 1.6 }}>{f.content}</pre>
        </div>
      ))}

      <p>Create stores ST003–ST010 with the same column structure, using their store IDs and <code>order_date = 2024-01-15</code>. Then for the <code>20240116</code> folder, duplicate all 10 files changing only the date in the file name, order IDs, and order_date column to <code>2024-01-16</code>.</p>
      <Screenshot caption="Inside the 20240115 folder — all 10 store CSV files with dates in their names" />

      <h2>Step 2 — Upload Files to Landing Container</h2>
      <p>Go to Azure Portal → <code>stfreshmartdev</code> → <strong>Containers</strong> → <strong>landing</strong> → click the <code>store_sales</code> folder.</p>
      <p>Click <strong>"+ Add Directory"</strong> → name it exactly: <code>date=2024-01-15</code></p>
      <Callout type="tip" label="🎯 Why This Exact Name?">
        The <code>date=</code> prefix is the Hive partition convention. Keep it exactly like this in both landing and raw containers so the folder structure mirrors across both sides.
      </Callout>
      <Screenshot caption="Add Directory dialog — 'date=2024-01-15' typed in" />
      <p>Click into <code>date=2024-01-15</code> → <strong>"Upload"</strong> → select all 10 files from your <code>20240115</code> local folder → <strong>"Upload"</strong>.</p>
      <Screenshot caption="landing/store_sales/date=2024-01-15/ — all 10 dated CSV files uploaded" />
      <p>Go back to <code>store_sales</code> → create another directory: <code>date=2024-01-16</code> → upload all 10 files from your <code>20240116</code> local folder.</p>
      <Screenshot caption="landing/store_sales/ — showing two date folders: date=2024-01-15 and date=2024-01-16" />

      {/* ── PHASE 2 ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest" style={{ background: '#0078d415', color: '#50b0ff' }}>
        PHASE 2 — CREATE PARAMETERIZED DATASETS
      </div>

      <p className="mt-4">These datasets need <strong>two parameters each</strong> — one for the date folder, one for the file name. Both values will be passed from the pipeline at runtime.</p>

      <h2>Step 3 — Create Source Dataset With Two Parameters</h2>
      <p>In ADF Studio → <strong>Author</strong> → <strong>Datasets</strong> → <strong>"+"</strong> → <strong>"New dataset"</strong> → <strong>"Azure Blob Storage"</strong> → <strong>"Continue"</strong> → <strong>"DelimitedText"</strong> → <strong>"Continue"</strong>.</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>ds_src_blob_dated_store_sales</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Linked service</span><span style={{ color: '#00e676' }}>ls_blob_freshmart_landing</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>File path</span><span style={{ color: '#ff9900' }}>leave ALL fields empty</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>First row as header</span><span style={{ color: '#00e676' }}>✅ Yes</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Import schema</span><span style={{ color: '#00e676' }}>None</span></div>
      </div>
      <p>Click <strong>"OK"</strong> → click the <strong>"Parameters"</strong> tab → <strong>"+ New"</strong> — add BOTH parameters:</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div>
          <div className="text-xs uppercase mb-1" style={{ color: 'var(--muted)' }}>Parameter 1</div>
          <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 80, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>run_date_folder</span></div>
          <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 80, flexShrink: 0 }}>Type</span><span style={{ color: '#00e676' }}>String</span></div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 8 }}>
          <div className="text-xs uppercase mb-1" style={{ color: 'var(--muted)' }}>Parameter 2</div>
          <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 80, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>file_name</span></div>
          <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 80, flexShrink: 0 }}>Type</span><span style={{ color: '#00e676' }}>String</span></div>
        </div>
      </div>
      <Screenshot caption="Dataset Parameters tab — both run_date_folder and file_name parameters listed" />
      <p>Click the <strong>"Connection"</strong> tab. Set the three path fields:</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Container</span><span style={{ color: '#00e676' }}>landing</span><span style={{ color: 'var(--muted)', marginLeft: 8 }}>← type directly</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Directory</span><span style={{ color: '#7b61ff' }}>store_sales/@{'{dataset().run_date_folder}'}</span><span style={{ color: 'var(--muted)', marginLeft: 8 }}>← Add dynamic content</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>File</span><span style={{ color: '#7b61ff' }}>@dataset().file_name</span><span style={{ color: 'var(--muted)', marginLeft: 8 }}>← Add dynamic content</span></div>
      </div>
      <p>For the <strong>Directory</strong> field: click <strong>"Add dynamic content"</strong> → in the editor, type the full expression: <code>{`store_sales/@{dataset().run_date_folder}`}</code> → click <strong>"OK"</strong>.</p>
      <p>For the <strong>File</strong> field: click <strong>"Add dynamic content"</strong> → under Parameters → click <strong>file_name</strong> → click <strong>"OK"</strong>.</p>
      <Screenshot caption="Connection tab fully configured — container 'landing', directory with dynamic expression, file with @dataset().file_name" />
      <p>Click <strong>💾 Save</strong>.</p>

      <h2>Step 4 — Create Sink Dataset With Two Parameters</h2>
      <p>Click <strong>"+"</strong> next to Datasets → <strong>"Azure Data Lake Storage Gen2"</strong> → <strong>"DelimitedText"</strong>.</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>ds_sink_adls_dated_sales</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Linked service</span><span style={{ color: '#00e676' }}>ls_adls_freshmart</span></div>
      </div>
      <p>Click <strong>"OK"</strong> → <strong>Parameters</strong> tab → add the same two parameters: <code>run_date_folder</code> (String) and <code>file_name</code> (String).</p>
      <Screenshot caption="Sink dataset Parameters tab — run_date_folder and file_name parameters added" />
      <p>Click <strong>Connection</strong> tab:</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Container</span><span style={{ color: '#00e676' }}>raw</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Directory</span><span style={{ color: '#7b61ff' }}>sales/@{'{dataset().run_date_folder}'}</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>File</span><span style={{ color: '#7b61ff' }}>@dataset().file_name</span></div>
      </div>
      <Screenshot caption="Sink dataset Connection tab — raw/sales/@{dataset().run_date_folder} for directory, @dataset().file_name for file" />
      <p>Click <strong>💾 Save</strong>.</p>

      {/* ── PHASE 3 ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest" style={{ background: '#7b61ff15', color: '#7b61ff' }}>
        PHASE 3 — BUILD THE PIPELINE
      </div>

      <h2>Step 5 — Create New Pipeline</h2>
      <p>In ADF Studio → <strong>Author</strong> → <strong>"+"</strong> next to Pipelines → <strong>"New pipeline"</strong>.</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>pl_copy_store_sales_by_date</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Description</span><span style={{ color: '#00e676' }}>Copies all store sales files for a given run_date into a date partition in ADLS</span></div>
      </div>
      <Screenshot caption="New blank pipeline canvas — name 'pl_copy_store_sales_by_date' in Properties panel" />

      <h2>Step 6 — Add the run_date Parameter</h2>
      <p>Click on <strong>empty canvas</strong> → <strong>Parameters</strong> tab at the bottom → <strong>"+ New"</strong>.</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>run_date</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Type</span><span style={{ color: '#00e676' }}>String</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Default</span><span style={{ color: '#ff9900' }}>2024-01-15</span><span style={{ color: 'var(--muted)', marginLeft: 8 }}>← plain static date — no expression syntax!</span></div>
      </div>
      <Callout type="warning" label="⚠️ Static Default Only">
        Remember: parameter default values must be plain text. Write <code>2024-01-15</code> — not <code>@{'{formatDateTime(...)}'}</code>. The trigger will pass the real dynamic date at runtime. The static default is just for when you manually Debug.
      </Callout>
      <Screenshot caption="run_date parameter — default value showing plain '2024-01-15' with no expression syntax" />

      <h2>Step 7 — Add the store_ids Array Parameter</h2>
      <p>Still in the <strong>Parameters</strong> tab → <strong>"+ New"</strong>.</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>store_ids</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Type</span><span style={{ color: '#00e676' }}>Array</span></div>
        <div className="flex gap-4 items-start"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Default</span><span style={{ color: '#7b61ff', wordBreak: 'break-all' }}>{"[\"ST001\",\"ST002\",\"ST003\",\"ST004\",\"ST005\",\"ST006\",\"ST007\",\"ST008\",\"ST009\",\"ST010\"]"}</span></div>
      </div>
      <p>Notice: in Project 02 the array stored full file names like <code>store_ST001_sales.csv</code>. Now we store just the store ID like <code>ST001</code>. The pipeline builds the full file name using run_date. This means the array never needs to change — even as dates change every night.</p>
      <Screenshot caption="Pipeline Parameters tab — both run_date (String) and store_ids (Array) parameters visible" />

      <h2>Step 8 — Add a Pipeline Variable</h2>
      <p>We need a variable to hold the computed folder name <code>date=2024-01-15</code>. Computing it once in a variable means we can use it in multiple places without repeating the expression.</p>
      <p>Click <strong>empty canvas</strong> → <strong>Variables</strong> tab → <strong>"+ New"</strong>.</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>run_date_folder</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Type</span><span style={{ color: '#00e676' }}>String</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Default</span><span style={{ color: 'var(--muted)' }}>leave empty</span></div>
      </div>
      <Screenshot caption="Variables tab — run_date_folder variable of type String added" />

      <h2>Step 9 — Add a Set Variable Activity</h2>
      <p>
        This activity runs first. It takes <code>run_date</code> (e.g. <code>2024-01-15</code>) and stores <code>date=2024-01-15</code> in the variable. Every other activity then reads this variable instead of re-computing it.
      </p>
      <p>Left panel → expand <strong>"General"</strong> → drag <strong>"Set variable"</strong> onto the canvas.</p>
      <Screenshot caption="Set variable activity placed on the main canvas" />
      <p>Click the Set variable activity → configure:</p>
      <h3>General Tab</h3>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>set_run_date_folder</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Description</span><span style={{ color: '#00e676' }}>Builds the date= folder name from run_date parameter</span></div>
      </div>
      <h3>Variables Tab (inside the activity)</h3>
      <p>Click the <strong>Variables</strong> tab in the <em>bottom properties panel</em> (this is the activity configuration, not the pipeline variables tab).</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 60, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>run_date_folder</span><span style={{ color: 'var(--muted)', marginLeft: 8 }}>← select from dropdown</span></div>
        <div className="flex gap-4 items-start"><span style={{ color: 'var(--muted)', width: 60, flexShrink: 0 }}>Value</span><span style={{ color: '#7b61ff' }}>date=@{'{pipeline().parameters.run_date}'}</span><span style={{ color: 'var(--muted)', marginLeft: 8 }}>← Add dynamic content</span></div>
      </div>
      <p>Click <strong>"Add dynamic content"</strong> for the Value field → type this expression in the editor:</p>
      <ExprBox
        expr="date=@{pipeline().parameters.run_date}"
        result="date=2024-01-15  (when run_date is 2024-01-15)"
        label="Expression for Set Variable value"
      />
      <p>This works because <code>run_date</code> already comes in as <code>yyyy-MM-dd</code> format — we just prepend <code>date=</code> to it. Simple and clean.</p>
      <Screenshot caption="Set variable activity Variables tab — name 'run_date_folder', value showing date=@{pipeline().parameters.run_date}" />

      <h2>Step 10 — Add ForEach and Connect it to Set Variable</h2>
      <p>Left panel → <strong>"Iteration & conditionals"</strong> → drag <strong>"ForEach"</strong> onto the canvas.</p>
      <p>Now <strong>connect the two activities</strong>: hover over <code>set_run_date_folder</code> → drag the green arrow on its right edge → drop it onto the ForEach. This forces Set Variable to finish before ForEach starts.</p>
      <Callout type="warning" label="⚠️ Connection Is Required">
        If you do not connect them with an arrow, both activities run at the same time (in parallel). The ForEach would start before the variable is set — and the folder name would be empty.
      </Callout>
      <Screenshot caption="Canvas — set_run_date_folder connected to ForEach_store_ids with a green arrow showing the execution order" />
      <p>Click the <strong>ForEach</strong> activity → configure:</p>
      <h3>General Tab</h3>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>ForEach_store_ids</span></div>
      </div>
      <h3>Settings Tab</h3>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Sequential</span><span style={{ color: '#ff9900' }}>☐ Unchecked</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Batch count</span><span style={{ color: '#00e676' }}>4</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Items</span><span style={{ color: '#7b61ff' }}>@pipeline().parameters.store_ids</span></div>
      </div>
      <Screenshot caption="ForEach Settings tab — Sequential off, Batch count 4, Items showing @pipeline().parameters.store_ids" />

      <h2>Step 11 — Add Copy Activity Inside ForEach</h2>
      <p>Click the <strong>"+"</strong> button <strong>inside</strong> the ForEach box → from the inner canvas left panel → drag <strong>"Copy data"</strong>.</p>
      <Screenshot caption="Copy data activity placed inside the ForEach inner canvas" />

      <h2>Step 12 — Configure Source With Date Expressions</h2>
      <p>Click the Copy activity → bottom panel:</p>
      <h3>General Tab</h3>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>copy_dated_store_file</span></div>
      </div>
      <h3>Source Tab</h3>
      <p>Select <code>ds_src_blob_dated_store_sales</code>. Two <strong>Dataset properties</strong> fields appear.</p>
      <Screenshot caption="Source tab — ds_src_blob_dated_store_sales selected, Dataset properties showing run_date_folder and file_name fields" />

      <p><strong>For <code>run_date_folder</code>:</strong> Click <strong>"Add dynamic content"</strong> → under <strong>Variables</strong> → click <code>run_date_folder</code>.</p>
      <ExprBox expr="@variables('run_date_folder')" result="date=2024-01-15" label="run_date_folder dataset property" />
      <Screenshot caption="Dynamic content editor — @variables('run_date_folder') expression with run_date_folder visible under Variables section" />

      <p><strong>For <code>file_name</code>:</strong> Click <strong>"Add dynamic content"</strong> → type this expression in the editor:</p>
      <ExprBox
        expr={`store_@{item()}_sales_@{formatDateTime(pipeline().parameters.run_date,'yyyyMMdd')}.csv`}
        result="store_ST001_sales_20240115.csv  (when item()=ST001, run_date=2024-01-15)"
        label="file_name dataset property — breaking it down"
      />
      <div className="my-4 p-4 rounded-xl text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="font-semibold mb-2" style={{ color: 'var(--text)' }}>How the file name expression builds the value:</p>
        {[
          ['store_',                                        '"store_"  — literal text'],
          ['@{item()}',                                     '"ST001"   — the current store ID from the ForEach loop'],
          ['_sales_',                                       '"_sales_" — literal text'],
          ["@{formatDateTime(pipeline().parameters.run_date,'yyyyMMdd')}", '"20240115" — date without dashes'],
          ['.csv',                                          '".csv"    — literal text'],
        ].map(([part, desc]) => (
          <div key={part} className="flex gap-3">
            <code className="flex-shrink-0 text-xs w-72" style={{ color: '#7b61ff' }}>{part}</code>
            <span style={{ color: 'var(--muted)' }}>→ {desc}</span>
          </div>
        ))}
      </div>
      <Screenshot caption="Source tab fully configured — run_date_folder showing @variables expression, file_name showing the full dynamic file name expression" />

      <h2>Step 13 — Configure Sink</h2>
      <p>Click <strong>Sink</strong> tab → select <code>ds_sink_adls_dated_sales</code>. Two Dataset properties appear — fill them with the exact same expressions as the source:</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 160, flexShrink: 0 }}>run_date_folder</span><span style={{ color: '#7b61ff' }}>@variables('run_date_folder')</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 160, flexShrink: 0 }}>file_name</span><span style={{ color: '#7b61ff' }}>store_@{'{item()}_sales_@{formatDateTime(pipeline().parameters.run_date,\'yyyyMMdd\')}.csv'}</span></div>
      </div>
      <Screenshot caption="Sink tab fully configured — same expressions as source, writing to raw/sales/date=2024-01-15/" />
      <p>Click the <strong>back arrow</strong> to return to the main pipeline canvas.</p>
      <Screenshot caption="Main canvas — set_run_date_folder → ForEach_store_ids connected in sequence" />

      <h2>Step 14 — Validate and Debug (Run for Jan 15)</h2>
      <p>Click <strong>"Validate"</strong> → should show no errors. Then click <strong>"Debug"</strong>.</p>
      <Screenshot caption="Validation successful — no errors found" />
      <p>The parameter dialog appears with the defaults pre-filled. Leave <code>run_date</code> as <code>2024-01-15</code> and click <strong>"OK"</strong>.</p>
      <Screenshot caption="Debug dialog — run_date = 2024-01-15, store_ids array pre-filled" />
      <p>Watch the canvas — Set Variable completes first (green), then ForEach starts and runs 10 iterations 4 at a time.</p>
      <Screenshot caption="Pipeline running — set_run_date_folder green, ForEach running with progress indicator" />
      <Screenshot caption="All completed — both activities showing green checkmarks" />
      <p>Verify in ADLS: Azure Portal → <code>stfreshmartdev</code> → Containers → <strong>raw</strong> → <strong>sales</strong>.</p>
      <Screenshot caption="raw/sales/date=2024-01-15/ — all 10 dated files visible with correct names and timestamps" />

      <h2>Step 15 — Test Backfill (Run for Jan 16 Without Changing Anything)</h2>
      <p>This is where parameters prove their value. Click <strong>"Debug"</strong> again → change only <code>run_date</code>:</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>run_date</span><span style={{ color: '#ff9900' }}>2024-01-16</span><span style={{ color: 'var(--muted)', marginLeft: 8 }}>← changed</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>store_ids</span><span style={{ color: 'var(--muted)' }}>leave the same</span></div>
      </div>
      <Screenshot caption="Debug dialog — run_date changed to 2024-01-16, everything else the same" />
      <p>Click <strong>"OK"</strong>. Check ADLS — you now have two date partitions:</p>
      <Screenshot caption="raw/sales/ — showing BOTH date=2024-01-15 and date=2024-01-16 folders side by side" />
      <p>This is backfill. If a pipeline fails on any day, rerun it with that date — it fills the missing data without touching any other day's folder.</p>

      {/* ── PHASE 4 ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest" style={{ background: '#ff990015', color: '#ff9900' }}>
        PHASE 4 — ADD SCHEDULED TRIGGER
      </div>

      <h2>Step 16 — Create the Schedule Trigger</h2>
      <p>Go back to the main pipeline canvas → click <strong>"Add trigger"</strong> in the top toolbar → <strong>"New/Edit"</strong> → <strong>"+ New"</strong>.</p>
      <Screenshot caption="Top toolbar — 'Add trigger' button highlighted, dropdown showing '+ New'" />
      <p>The New trigger panel opens. Fill in:</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 140, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>trigger_daily_midnight</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 140, flexShrink: 0 }}>Type</span><span style={{ color: '#00e676' }}>Schedule</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 140, flexShrink: 0 }}>Start date</span><span style={{ color: '#00e676' }}>today's date</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 140, flexShrink: 0 }}>Time zone</span><span style={{ color: '#00e676' }}>India Standard Time</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 140, flexShrink: 0 }}>Repeat every</span><span style={{ color: '#00e676' }}>1 Day</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 140, flexShrink: 0 }}>At</span><span style={{ color: '#00e676' }}>00:00  (midnight)</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 140, flexShrink: 0 }}>Activated</span><span style={{ color: '#00e676' }}>✅ Yes</span></div>
      </div>
      <Screenshot caption="New trigger panel — name, type Schedule, recurrence set to daily at 00:00 IST filled in" />
      <p>Click <strong>"OK"</strong>.</p>

      <h2>Step 17 — Set What the Trigger Passes to the Pipeline</h2>
      <p>After clicking OK, a <strong>"Trigger Run Parameters"</strong> dialog appears. This is where you tell the trigger what to send as <code>run_date</code> and <code>store_ids</code> each night.</p>
      <Screenshot caption="Trigger Run Parameters dialog — run_date and store_ids fields to fill" />

      <p><strong>For <code>run_date</code>:</strong> Click <strong>"Add dynamic content"</strong> and type this expression:</p>
      <ExprBox
        expr="@{formatDateTime(trigger().scheduledTime, 'yyyy-MM-dd')}"
        result="2024-01-16  (the date the trigger was scheduled to fire)"
        label="run_date trigger parameter value"
      />
      <div className="my-4 p-4 rounded-xl text-xs" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="font-semibold mb-2" style={{ color: 'var(--text)' }}>Why trigger().scheduledTime and not utcNow()?</p>
        <p style={{ color: 'var(--text2)' }}><code>trigger().scheduledTime</code> is the time ADF scheduled this trigger to fire — always exactly midnight on the right date. <code>utcNow()</code> is the actual clock time when the pipeline runs, which could be 12:00:03 AM — and in UTC that might be a different date than your local time. Always use <code>trigger().scheduledTime</code> in trigger parameters.</p>
        <p className="mt-2 font-mono text-xs" style={{ color: 'var(--muted)' }}>
          Trigger scheduled for 2024-01-16 00:00 IST<br />
          → trigger().scheduledTime = 2024-01-16T00:00:00<br />
          → formatDateTime result = "2024-01-16"  ✅ always correct
        </p>
      </div>
      <Screenshot caption="Trigger Run Parameters — run_date showing @{'{formatDateTime(trigger().scheduledTime,\'yyyy-MM-dd\')'}} expression" />

      <p><strong>For <code>store_ids</code>:</strong> Type the array directly:</p>
      <div className="my-3 p-3 rounded-xl font-mono text-xs" style={{ background: 'var(--bg2)', color: '#7b61ff', wordBreak: 'break-all' }}>
        {"[\"ST001\",\"ST002\",\"ST003\",\"ST004\",\"ST005\",\"ST006\",\"ST007\",\"ST008\",\"ST009\",\"ST010\"]"}
      </div>
      <Screenshot caption="Trigger Run Parameters fully filled — both run_date expression and store_ids array" />
      <p>Click <strong>"OK"</strong>.</p>

      <h2>Step 18 — Publish Everything</h2>
      <p>Click <strong>"Publish all"</strong>. The panel shows all 4 new items — click <strong>"Publish"</strong>.</p>
      <Screenshot caption="Publish panel — showing pipeline, 2 datasets, and trigger all listed" />
      <Screenshot caption="Successfully published — notification in top right corner" />

      <h2>Step 19 — Manually Trigger a Run Right Now</h2>
      <p>You do not need to wait until midnight to test the trigger. On the pipeline canvas → <strong>"Add trigger"</strong> → <strong>"Trigger now"</strong>.</p>
      <Screenshot caption="'Trigger now' option in the Add trigger dropdown" />
      <p>In the Run Parameters dialog, enter a date you have files for:</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>run_date</span><span style={{ color: '#00e676' }}>2024-01-15</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>store_ids</span><span style={{ color: '#7b61ff' }}>{"[\"ST001\",...,\"ST010\"]"}</span></div>
      </div>
      <Screenshot caption="Trigger now dialog — run_date and store_ids filled in" />
      <p>Click <strong>"OK"</strong> → go to <strong>Monitor → Pipeline runs</strong> to watch it execute.</p>
      <Screenshot caption="Monitor → Pipeline runs — pl_copy_store_sales_by_date showing In Progress" />
      <Screenshot caption="Pipeline run completed — status Succeeded, run_date visible in parameters, duration shown" />

      <h2>Step 20 — View the Trigger in Monitor</h2>
      <p>Click <strong>Monitor</strong> → <strong>Trigger runs</strong> in the left submenu.</p>
      <Screenshot caption="Monitor → Trigger runs — trigger_daily_midnight listed with its next scheduled run time and Active status" />
      <p>The trigger is now live. Every night at midnight IST it fires automatically, passes today's date as <code>run_date</code>, copies all 10 store files into <code>raw/sales/date=YYYY-MM-DD/</code>, and nobody needs to press anything.</p>

      {/* Summary */}
      <h2>Before and After</h2>
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid #ff6b6b30' }}>
          <div className="text-xs font-mono font-bold mb-3" style={{ color: '#ff6b6b' }}>Before This Project</div>
          <ul className="space-y-1 text-xs" style={{ color: 'var(--text2)' }}>
            <li>Ran only when you pressed Debug</li>
            <li>File names were static — same every day</li>
            <li>No way to reprocess a past date</li>
            <li>No date organization in ADLS</li>
          </ul>
        </div>
        <div className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid #00e67630' }}>
          <div className="text-xs font-mono font-bold mb-3" style={{ color: '#00e676' }}>After This Project</div>
          <ul className="space-y-1 text-xs" style={{ color: 'var(--text2)' }}>
            <li>Triggers automatically every night at midnight</li>
            <li>File names built from run_date parameter</li>
            <li>Backfill any past date anytime</li>
            <li>ADLS organized into date=YYYY-MM-DD/ partitions</li>
          </ul>
        </div>
      </div>

      {/* All expressions reference */}
      <h2>All Expressions Used in This Project</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th className="text-left py-3 px-4 font-mono uppercase" style={{ color: 'var(--muted)' }}>Expression</th>
              <th className="text-left py-3 px-4 font-mono uppercase" style={{ color: 'var(--muted)' }}>Where Used</th>
            </tr>
          </thead>
          <tbody>
            {allExpressions.map((e, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--surface)' : 'transparent' }}>
                <td className="py-2 px-4 font-mono" style={{ color: '#7b61ff', wordBreak: 'break-all', maxWidth: 320 }}>{e.expr}</td>
                <td className="py-2 px-4" style={{ color: 'var(--text2)' }}>{e.where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* What was added table */}
      <h2>What Was Added in Project 03</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              {['Item', 'Name', 'What It Does'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-mono uppercase" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {newItems.map((r, i) => (
              <tr key={r.name} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--surface)' : 'transparent' }}>
                <td className="py-3 px-4 text-xs font-semibold" style={{ color: 'var(--accent)' }}>{r.item}</td>
                <td className="py-3 px-4 font-mono text-xs" style={{ color: 'var(--text)' }}>{r.name}</td>
                <td className="py-3 px-4 text-xs" style={{ color: 'var(--text2)' }}>{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Concepts reference */}
      <h2>Key Concepts Reference</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              {['Concept', 'What It Is', 'Why It Matters'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-mono uppercase" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {conceptsTable.map((c, i) => (
              <tr key={c.concept} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--surface)' : 'transparent' }}>
                <td className="py-2 px-4 font-mono text-xs font-bold" style={{ color: 'var(--accent)' }}>{c.concept}</td>
                <td className="py-2 px-4 text-xs" style={{ color: 'var(--text2)' }}>{c.what}</td>
                <td className="py-2 px-4 text-xs" style={{ color: 'var(--text2)' }}>{c.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Common mistakes */}
      <h2>Common Mistakes</h2>
      <div className="space-y-3 my-6">
        {[
          { mistake: 'Using an expression as a parameter default value', fix: 'Parameter defaults must be plain static text — write 2024-01-15, not @{formatDateTime(...)}' },
          { mistake: 'Using utcNow() in trigger parameters instead of trigger().scheduledTime', fix: 'scheduledTime is always the correct scheduled date. utcNow() can be a different date due to timezone offset.' },
          { mistake: 'Wrong date format in formatDateTime', fix: 'Use \'yyyyMMdd\' (no dashes) for file names. Use \'yyyy-MM-dd\' (with dashes) for folder names and run_date.' },
          { mistake: 'Not connecting Set Variable → ForEach with an arrow', fix: 'Without the arrow they run in parallel. ForEach starts before the variable is set — folder name is empty.' },
          { mistake: 'Trigger created but never fires — forgot to publish', fix: 'Always Publish all after adding or changing a trigger. Triggers only activate after publishing.' },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid #ff6b6b30' }}>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0">⚠️</span>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>{item.mistake}</p>
                <p className="text-xs" style={{ color: 'var(--text2)' }}><span style={{ color: '#00e676' }}>Fix: </span>{item.fix}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next project */}
      <div className="my-8 p-6 rounded-xl" style={{ background: 'var(--surface)', border: '2px solid var(--accent2)' }}>
        <div className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--accent2)' }}>What is coming in Project 04</div>
        <p className="text-sm mb-3" style={{ color: 'var(--text)' }}>
          So far we have only worked with files you manually uploaded to Blob Storage. In the real world, data often lives on public internet URLs — government portals, supplier servers, weather APIs, open datasets.
        </p>
        <p className="text-sm" style={{ color: 'var(--text2)' }}>
          In <strong>Project 04</strong> you will build a pipeline that downloads a CSV file directly from a <strong>public HTTPS URL</strong> — no manual upload needed. ADF fetches the file from the internet and drops it straight into ADLS. Same FreshMart scenario. Zero manual work.
        </p>
      </div>

      <KeyTakeaways items={[
        'Pipeline parameter defaults must be plain static text — expressions like @{formatDateTime(...)} are not allowed there',
        'run_date as a parameter enables idempotency — rerun any past date safely without affecting other dates',
        'Set Variable activity runs before ForEach — always connect them with an arrow to enforce the order',
        '@variables(\'run_date_folder\') reads the computed folder name — one computation, used everywhere',
        'String interpolation: store_@{item()}_sales_@{formatDateTime(run_date,\'yyyyMMdd\')}.csv builds file names at runtime',
        'trigger().scheduledTime is the safe way to get the date in trigger parameters — not utcNow()',
        'Hive-style partitioning (date=YYYY-MM-DD) is the industry standard — analytics tools understand it natively',
        'After publishing the trigger, use "Trigger now" to test immediately without waiting for midnight',
      ]} />
    </LearnLayout>
  )
}