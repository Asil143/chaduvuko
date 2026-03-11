import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Project 02 — Copy Multiple CSV Files Using ForEach Loop' }

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

const storeFiles = [
  { file: 'store_ST001_sales.csv', store: 'ST001', city: 'New Delhi' },
  { file: 'store_ST002_sales.csv', store: 'ST002', city: 'Mumbai' },
  { file: 'store_ST003_sales.csv', store: 'ST003', city: 'Bangalore' },
  { file: 'store_ST004_sales.csv', store: 'ST004', city: 'Chennai' },
  { file: 'store_ST005_sales.csv', store: 'ST005', city: 'Hyderabad' },
  { file: 'store_ST006_sales.csv', store: 'ST006', city: 'Pune' },
  { file: 'store_ST007_sales.csv', store: 'ST007', city: 'Kolkata' },
  { file: 'store_ST008_sales.csv', store: 'ST008', city: 'Ahmedabad' },
  { file: 'store_ST009_sales.csv', store: 'ST009', city: 'Jaipur' },
  { file: 'store_ST010_sales.csv', store: 'ST010', city: 'Chandigarh' },
]

const csvFiles: Record<string, string> = {
  'store_ST001_sales.csv': `order_id,store_id,product_name,category,quantity,unit_price,order_date
ORD1001,ST001,Basmati Rice 5kg,Grocery,12,299.00,2024-01-15
ORD1002,ST001,Samsung TV 43inch,Electronics,2,32000.00,2024-01-15
ORD1003,ST001,Amul Butter 500g,Dairy,25,240.00,2024-01-15
ORD1004,ST001,Colgate Toothpaste,Personal Care,30,89.00,2024-01-15
ORD1005,ST001,Nike Running Shoes,Apparel,5,4500.00,2024-01-15`,
  'store_ST002_sales.csv': `order_id,store_id,product_name,category,quantity,unit_price,order_date
ORD2001,ST002,Sunflower Oil 1L,Grocery,18,145.00,2024-01-15
ORD2002,ST002,iPhone 14,Electronics,1,75000.00,2024-01-15
ORD2003,ST002,Amul Milk 1L,Dairy,40,62.00,2024-01-15
ORD2004,ST002,Dove Soap 100g,Personal Care,50,65.00,2024-01-15
ORD2005,ST002,Levis Jeans,Apparel,8,2999.00,2024-01-15`,
}

const defaultArray = `["store_ST001_sales.csv","store_ST002_sales.csv","store_ST003_sales.csv","store_ST004_sales.csv","store_ST005_sales.csv","store_ST006_sales.csv","store_ST007_sales.csv","store_ST008_sales.csv","store_ST009_sales.csv","store_ST010_sales.csv"]`

const conceptsTable = [
  { concept: 'ForEach Activity',         what: 'Loops through a list of items',                     when: 'When you have multiple files/tables to process' },
  { concept: 'Array Parameter',           what: 'A list of values passed to a pipeline',             when: 'When the list of files may change' },
  { concept: '@item()',                   what: 'Current item in a ForEach loop',                    when: 'Inside ForEach — to get the current loop value' },
  { concept: '@pipeline().parameters.X', what: 'Read a pipeline parameter',                          when: 'Anywhere in the pipeline' },
  { concept: '@dataset().X',             what: 'Pass a value to a dataset parameter',                when: 'In Copy activity Source/Sink dataset properties' },
  { concept: 'Dynamic expression',        what: '@{ } syntax — evaluated at runtime',               when: 'Whenever a value needs to be dynamic, not fixed' },
  { concept: 'Batch count',               what: 'How many ForEach iterations run in parallel',       when: 'Balance speed vs resource usage' },
  { concept: 'Parameterized dataset',     what: 'Dataset where the file path uses parameters',      when: 'When same dataset is used for many different files' },
]

const newItems = [
  { item: 'Dataset',   name: 'ds_src_blob_store_sales',  desc: 'Parameterized source — file name is dynamic' },
  { item: 'Dataset',   name: 'ds_sink_adls_store_sales', desc: 'Parameterized sink — file name is dynamic' },
  { item: 'Pipeline',  name: 'pl_copy_all_store_sales',  desc: 'Contains ForEach + Copy' },
  { item: 'Parameter', name: 'store_files (Array)',       desc: 'List of filenames to process' },
  { item: 'Activity',  name: 'ForEach_store_files',       desc: 'Loops through the file list' },
  { item: 'Activity',  name: 'copy_store_file',           desc: 'Copies one file per iteration — inside ForEach' },
]

export default function Project02Page() {
  return (
    <LearnLayout
      title="Project 02 — Copy Multiple CSV Files Using ForEach Loop"
      description="Stop creating one Copy activity per file. Use the ForEach activity to loop through a list of files and copy all of them in a single pipeline run. Add a new store tomorrow — just update the array, no pipeline changes needed."
      section="Projects"
      readTime="60–90 min"
      updatedAt="March 2026"
      breadcrumbs={[
        { label: 'Projects', href: '/learn/projects' },
        { label: 'Project 02 — ForEach Loop', href: '/learn/projects/azure-projects-02' },
      ]}
      prev={{ title: 'Project 01 — Copy CSV to ADLS', href: '/learn/projects/azure-batch-pipeline' }}
      next={{ title: 'Project 03 — Parameterized Pipeline with Run Date', href: '/learn/projects/azure-project-03' }}
    >

      {/* Project meta */}
      <div className="flex flex-wrap gap-3 my-6">
        {[
          { label: 'Series',    value: 'Azure Data Engineering — Zero to Advanced' },
          { label: 'Project',   value: '02 of 25' },
          { label: 'Level',     value: 'Beginner' },
          { label: 'Builds on', value: 'Project 01 — same resources, same ADF' },
          { label: 'Time',      value: '60–90 minutes' },
        ].map(item => (
          <div key={item.label} className="px-3 py-2 rounded-lg text-xs"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--muted)' }}>{item.label}: </span>
            <span className="font-semibold" style={{ color: 'var(--text)' }}>{item.value}</span>
          </div>
        ))}
      </div>

      <div className="my-6 p-5 rounded-xl"
        style={{ background: 'var(--surface)', border: '2px solid var(--accent)', borderLeft: '4px solid var(--accent)' }}>
        <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
          What you will build
        </div>
        <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
          A pipeline that loops through 10 store CSV files and copies all of them to ADLS in a single run — using one ForEach activity instead of 10 Copy activities.
        </p>
      </div>

      {/* Real World Problem */}
      <h2>Real World Problem</h2>
      <p>
        In Project 01 we solved the first problem — we moved a single CSV file from a laptop to Azure automatically. But here is where the real world gets complicated.
      </p>
      <p>
        FreshMart does not have 1 store. They have <strong>10 stores</strong>. Every night, each store manager exports their own sales file:
      </p>

      <div className="my-6 overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)', background: 'var(--surface)' }}>
              <th className="text-left py-2 px-4 font-mono uppercase" style={{ color: 'var(--muted)' }}>File</th>
              <th className="text-left py-2 px-4 font-mono uppercase" style={{ color: 'var(--muted)' }}>Store</th>
              <th className="text-left py-2 px-4 font-mono uppercase" style={{ color: 'var(--muted)' }}>City</th>
            </tr>
          </thead>
          <tbody>
            {storeFiles.map((s, i) => (
              <tr key={s.file} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                <td className="py-2 px-4 font-mono" style={{ color: 'var(--accent)' }}>{s.file}</td>
                <td className="py-2 px-4" style={{ color: 'var(--text2)' }}>{s.store}</td>
                <td className="py-2 px-4" style={{ color: 'var(--text2)' }}>{s.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>Imagine solving this the <strong>wrong way</strong> — creating 10 separate Copy activities, one per store file:</p>

      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '2px solid #ff6b6b40' }}>
          <div className="text-xs font-mono font-bold mb-3" style={{ color: '#ff6b6b' }}>❌ WRONG APPROACH</div>
          <div className="space-y-1 text-xs font-mono" style={{ color: 'var(--text2)' }}>
            <p>Copy Activity 1 → store_ST001</p>
            <p>Copy Activity 2 → store_ST002</p>
            <p>Copy Activity 3 → store_ST003</p>
            <p style={{ color: 'var(--muted)' }}>... 7 more activities ...</p>
            <p>Copy Activity 10 → store_ST010</p>
          </div>
          <div className="mt-3 pt-3 text-xs space-y-1" style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
            <p>New store opens → manually add an activity</p>
            <p>File renamed → manually update each activity</p>
            <p>10 separate failure points</p>
          </div>
        </div>
        <div className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '2px solid #00e67640' }}>
          <div className="text-xs font-mono font-bold mb-3" style={{ color: '#00e676' }}>✅ RIGHT APPROACH</div>
          <div className="text-xs font-mono" style={{ color: 'var(--text2)' }}>
            <p>ForEach Activity</p>
            <p className="pl-4" style={{ color: 'var(--muted)' }}>└── For each file in list</p>
            <p className="pl-8" style={{ color: 'var(--accent)' }}>Copy Activity</p>
            <p className="pl-12" style={{ color: 'var(--muted)' }}>(runs once per file)</p>
          </div>
          <div className="mt-3 pt-3 text-xs space-y-1" style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
            <p>New store opens → just add to the array</p>
            <p>Tomorrow: 50 stores → same pipeline</p>
            <p>1 activity, 1 failure point</p>
          </div>
        </div>
      </div>

      {/* Concepts */}
      <h2>Concepts You Must Understand First</h2>

      <h3>What is a ForEach Activity?</h3>
      <p>
        A ForEach activity is a loop inside ADF. It takes a list of items and runs one or more activities for each item in that list.
      </p>
      <p>
        Real analogy: You have 10 packages to deliver. Instead of making 10 separate trips, you load all packages into one truck and deliver them one by one on a single route. The ForEach activity is the truck route.
      </p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)', lineHeight: 2 }}>
        <p style={{ color: 'var(--accent)' }}>ForEach Activity</p>
        <p className="pl-4" style={{ color: 'var(--muted)' }}>├── Items: ["ST001", "ST002", ... "ST010"]</p>
        <p className="pl-4" style={{ color: 'var(--muted)' }}>│             ↑ this is the list it loops through</p>
        <p className="pl-4" style={{ color: 'var(--muted)' }}>└── Activities inside the loop:</p>
        <p className="pl-12" style={{ color: '#00e676' }}>Copy Activity (runs once per item)</p>
      </div>
      <div className="my-4 flex gap-4">
        {[
          { mode: 'Sequential', color: '#f5c542', desc: 'Copies file 1, then file 2, then file 3. Safer. Slower.' },
          { mode: 'Parallel',   color: '#00e676', desc: 'Copies multiple files at the same time. Faster. We use this with batch count 4.' },
        ].map(m => (
          <div key={m.mode} className="flex-1 p-3 rounded-xl text-xs"
            style={{ background: 'var(--surface)', border: `1px solid ${m.color}30` }}>
            <div className="font-mono font-bold mb-1" style={{ color: m.color }}>{m.mode}</div>
            <p style={{ color: 'var(--text2)' }}>{m.desc}</p>
          </div>
        ))}
      </div>

      <h3>What is a Pipeline Parameter?</h3>
      <p>
        A parameter is a value you pass <strong>into</strong> a pipeline from outside — before it starts running.
        In Project 02 we use an Array parameter called <code>store_files</code> to pass the list of file names.
      </p>
      <div className="my-4 p-4 rounded-xl text-xs"
        style={{ background: 'var(--surface)', border: '1px solid #0078d430' }}>
        <div className="text-xs font-mono font-bold mb-3" style={{ color: '#0078d4' }}>PARAMETER</div>
        <ul className="space-y-1">
          {[
            'Set FROM OUTSIDE the pipeline',
            'Set before the pipeline starts — cannot change during a run',
            'Example: store_files = ["ST001.csv", "ST002.csv", ...] passed when triggering',
          ].map(p => (
            <li key={p} className="text-xs" style={{ color: 'var(--text2)' }}>— {p}</li>
          ))}
        </ul>
      </div>

      <Callout type="info">
        Variables are a separate concept — they are set <strong>inside</strong> a pipeline during a run and can change as activities execute. You will use variables properly in <strong>Project 03</strong> where they are genuinely needed. For Project 02, a parameter is all you need.
      </Callout>

      <h3>What is a Dynamic Expression?</h3>
      <p>
        In Project 01, our dataset had a hardcoded file name: <code>daily_sales.csv</code> — fixed, never changes.
        In Project 02, the file name changes on every loop iteration. This is where dynamic expressions come in.
      </p>
      <p>
        The <code>@{`{ }`}</code> syntax tells ADF: this is not a static value — evaluate this expression right now.
      </p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>Common dynamic expressions</div>
        {[
          ['@item()',                                 'Current item in a ForEach loop ← what we use in this project'],
          ['@pipeline().parameters.store_files',     'Value of the store_files array parameter'],
          ['@utcNow()',                               'Current date and time'],
          ["@formatDateTime(utcNow(),'yyyy-MM-dd')", "Today's date formatted"],
        ].map(([expr, desc]) => (
          <div key={expr} className="flex gap-4 flex-wrap">
            <span className="flex-shrink-0" style={{ color: '#00e676', minWidth: 280 }}>{expr}</span>
            <span style={{ color: 'var(--muted)' }}>→ {desc}</span>
          </div>
        ))}
      </div>

      {/* Pipeline diagram */}
      <div className="my-6 p-5 rounded-xl font-mono text-xs"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>What we are building</div>
        <div className="flex flex-wrap gap-6">
          <div>
            <div className="text-xs mb-2" style={{ color: '#ff9900' }}>Blob (landing/store_sales/)</div>
            {storeFiles.slice(0, 5).map(s => <div key={s.file} style={{ color: 'var(--text2)' }}>{s.file}</div>)}
            <div style={{ color: 'var(--muted)' }}>... 5 more</div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-2xl" style={{ color: 'var(--muted)' }}>→</div>
            <div className="text-xs mt-1 text-center" style={{ color: '#7b61ff' }}>ForEach</div>
          </div>
          <div>
            <div className="text-xs mb-2" style={{ color: '#00e676' }}>ADLS (raw/sales/)</div>
            {storeFiles.slice(0, 5).map(s => <div key={s.file} style={{ color: 'var(--text2)' }}>{s.file}</div>)}
            <div style={{ color: 'var(--muted)' }}>... 5 more</div>
          </div>
        </div>
        <p className="text-xs mt-4" style={{ color: 'var(--muted)' }}>One pipeline. One ForEach. Ten files copied.</p>
      </div>

      {/* ── PHASE 1 ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest"
        style={{ background: '#00c2ff15', color: '#00c2ff' }}>
        PHASE 1 — PREPARE SAMPLE DATA
      </div>

      <h2>Step 1 — Create 10 Store CSV Files</h2>
      <p>
        Each file represents one store's daily sales. Open Notepad (Windows) or TextEdit (Mac) and create each file below.
        Save them all in a folder on your Desktop called <code>freshmart_store_files</code>.
      </p>

      {Object.entries(csvFiles).map(([filename, content]) => (
        <div key={filename} className="my-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          <div className="px-4 py-2 flex items-center gap-2"
            style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
            <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>{filename}</span>
          </div>
          <pre className="p-4 text-xs overflow-x-auto"
            style={{ background: 'var(--bg2)', color: 'var(--text2)', lineHeight: 1.6 }}>{content}</pre>
        </div>
      ))}

      <p>
        Create files 3–10 with the same structure, using the store IDs ST003 through ST010 and their respective city product data.
        Save all 10 as <code>store_ST00X_sales.csv</code>.
      </p>
      <Screenshot caption="Desktop folder 'freshmart_store_files' — showing all 10 CSV files listed" />

      <h2>Step 2 — Upload All 10 Files to Landing Container</h2>
      <p>Go to Azure Portal → <strong>Storage accounts</strong> → <code>stfreshmartdev</code> → <strong>Containers</strong> → <strong>landing</strong>.</p>
      <p>Click <strong>"+ Add Directory"</strong> → name it <code>store_sales</code>.</p>
      <Screenshot caption="Add Directory dialog — 'store_sales' entered as directory name" />
      <p>
        Click into the <strong>store_sales</strong> directory → click <strong>"Upload"</strong> → hold Ctrl and select all 10 CSV files at once → click <strong>"Upload"</strong>.
      </p>
      <Screenshot caption="Upload dialog — all 10 files selected, showing their names in the file list before uploading" />
      <Screenshot caption="landing/store_sales/ directory after upload — all 10 CSV files visible with file sizes" />

      {/* ── PHASE 2 ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest"
        style={{ background: '#0078d415', color: '#50b0ff' }}>
        PHASE 2 — CREATE PARAMETERIZED DATASETS
      </div>

      <p className="mt-4">
        In Project 01, our datasets had a hardcoded file path: <code>File: daily_sales.csv</code>. That worked for one file.
        Now the file name needs to change on each loop iteration. We do this by adding <strong>parameters to the dataset</strong> — a placeholder instead of a fixed value.
      </p>
      <Callout type="info" label="💡 Think of it like a form letter">
        "Dear [NAME], your order [ORDER_ID] has been shipped." — instead of writing 1000 separate letters, you write one template and fill in the parameters for each person. A parameterized dataset is the same idea.
      </Callout>

      <h2>Step 3 — Create Parameterized Source Dataset</h2>
      <p>
        In ADF Studio → <strong>Author</strong> → <strong>Datasets</strong> → <strong>"+"</strong> → <strong>"New dataset"</strong>
        → <strong>"Azure Blob Storage"</strong> → <strong>"Continue"</strong> → <strong>"DelimitedText"</strong> → <strong>"Continue"</strong>.
      </p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>ds_src_blob_store_sales</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Linked service</span><span style={{ color: '#00e676' }}>ls_blob_freshmart_landing</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>File path</span><span style={{ color: '#ff9900' }}>leave ALL THREE fields empty for now</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>First row as header</span><span style={{ color: '#00e676' }}>✅ Yes</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Import schema</span><span style={{ color: '#00e676' }}>None</span></div>
      </div>
      <Screenshot caption="Dataset form — name filled, linked service selected, file path fields left empty" />
      <p>Click <strong>"OK"</strong>. You are now in the dataset editor. Click the <strong>"Parameters"</strong> tab at the bottom.</p>
      <Screenshot caption="Dataset editor — Parameters tab highlighted at the bottom" />
      <p>Click <strong>"+ New"</strong>:</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>file_name</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Type</span><span style={{ color: '#00e676' }}>String</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Default</span><span style={{ color: 'var(--muted)' }}>leave empty</span></div>
      </div>
      <Screenshot caption="Parameters tab — new parameter 'file_name' of type String added" />
      <p>
        Now click the <strong>"Connection"</strong> tab → click inside the <strong>"File"</strong> field
        → click <strong>"Add dynamic content"</strong> (blue link below the field).
      </p>
      <Screenshot caption="Connection tab — 'Add dynamic content' blue link visible below the File field" />
      <p>The dynamic content editor opens. Under <strong>"Parameters"</strong> on the right → click <strong>file_name</strong>. The expression becomes:</p>
      <div className="my-3 p-3 rounded-xl font-mono text-sm"
        style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: '#00e676' }}>
        @dataset().file_name
      </div>
      <Screenshot caption="Dynamic content editor — @dataset().file_name expression in the box, file_name parameter visible in the right panel" />
      <p>Click <strong>"OK"</strong>. Set the full path:</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Container</span><span style={{ color: '#00e676' }}>landing</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Directory</span><span style={{ color: '#00e676' }}>store_sales</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>File</span><span style={{ color: '#7b61ff' }}>@dataset().file_name</span><span style={{ color: '#ff9900', marginLeft: 8 }}>← dynamic</span></div>
      </div>
      <Screenshot caption="Connection tab fully configured — container 'landing', directory 'store_sales', file showing the dynamic expression" />
      <p>Click <strong>💾 Save</strong>.</p>

      <h2>Step 4 — Create Parameterized Sink Dataset</h2>
      <p>
        Click <strong>"+"</strong> next to Datasets → <strong>"New dataset"</strong>
        → <strong>"Azure Data Lake Storage Gen2"</strong> → <strong>"Continue"</strong>
        → <strong>"DelimitedText"</strong> → <strong>"Continue"</strong>.
      </p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>ds_sink_adls_store_sales</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>Linked service</span><span style={{ color: '#00e676' }}>ls_adls_freshmart</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 180, flexShrink: 0 }}>File path</span><span style={{ color: '#ff9900' }}>leave ALL THREE fields empty</span></div>
      </div>
      <p>Click <strong>"OK"</strong> → <strong>Parameters</strong> tab → <strong>"+ New"</strong> → <code>file_name</code>, type String.</p>
      <Screenshot caption="Sink dataset Parameters tab — file_name parameter added" />
      <p>
        Click <strong>Connection</strong> tab → <strong>File</strong> field → <strong>"Add dynamic content"</strong>
        → click <strong>file_name</strong> → expression: <code>@dataset().file_name</code> → <strong>"OK"</strong>.
      </p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Container</span><span style={{ color: '#00e676' }}>raw</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Directory</span><span style={{ color: '#00e676' }}>sales</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>File</span><span style={{ color: '#7b61ff' }}>@dataset().file_name</span></div>
      </div>
      <Screenshot caption="Sink dataset Connection tab — raw/sales/@dataset().file_name" />
      <p>Click <strong>💾 Save</strong>.</p>

      {/* ── PHASE 3 ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest"
        style={{ background: '#ff990015', color: '#ff9900' }}>
        PHASE 3 — BUILD THE PIPELINE
      </div>

      <h2>Step 5 — Create New Pipeline</h2>
      <p>In ADF Studio → <strong>Author</strong> → <strong>"+"</strong> next to Pipelines → <strong>"New pipeline"</strong>.</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>pl_copy_all_store_sales</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Description</span><span style={{ color: '#00e676' }}>Loops through all store CSV files and copies each one to ADLS raw/sales/</span></div>
      </div>
      <Screenshot caption="New blank pipeline canvas — name 'pl_copy_all_store_sales' in the Properties panel on the right" />

      <h2>Step 6 — Add Pipeline Parameter</h2>
      <p>
        Click on the <strong>empty canvas background</strong> (not on any activity) → at the bottom
        → click the <strong>"Parameters"</strong> tab.
      </p>
      <Screenshot caption="Pipeline canvas — empty background clicked, Parameters tab visible at bottom" />
      <p>Click <strong>"+ New"</strong>:</p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>store_files</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Type</span><span style={{ color: '#00e676' }}>Array</span></div>
        <div className="flex gap-4 items-start"><span style={{ color: 'var(--muted)', width: 100, flexShrink: 0 }}>Default</span><span style={{ color: '#7b61ff', wordBreak: 'break-all' }}>{defaultArray}</span></div>
      </div>
      <Callout type="warning" label="⚠️ Array Format Must Be Exact JSON">
        The default value must be a valid JSON array: strings in <strong>double quotes</strong>, separated by commas,
        wrapped in square brackets. Copy the value above exactly — no trailing commas, no single quotes.
      </Callout>
      <Screenshot caption="Pipeline Parameters tab — store_files parameter with Array type and the full JSON array as default value" />

      <h2>Step 7 — Add ForEach Activity</h2>
      <p>
        In the left activities panel → expand <strong>"Iteration &amp; conditionals"</strong>
        → drag <strong>"ForEach"</strong> onto the canvas.
      </p>
      <Screenshot caption="Left activities panel — 'Iteration & conditionals' section expanded, ForEach being dragged to canvas" />
      <Screenshot caption="ForEach activity placed on the canvas — a larger box with 'ForEach' label and a '+' icon in the centre" />
      <p>Click on the ForEach activity → configure the bottom panel:</p>

      <h3>General Tab</h3>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>ForEach_store_files</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Description</span><span style={{ color: '#00e676' }}>Loops through each store CSV file name</span></div>
      </div>
      <Screenshot caption="ForEach General tab — name and description filled in" />

      <h3>Settings Tab</h3>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Sequential</span><span style={{ color: '#ff9900' }}>☐ Unchecked ← we want parallel</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Batch count</span><span style={{ color: '#00e676' }}>4</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Items</span><span style={{ color: '#7b61ff' }}>@pipeline().parameters.store_files</span><span style={{ color: 'var(--muted)', marginLeft: 8 }}>← add via dynamic content</span></div>
      </div>
      <p>
        For <strong>Items</strong> field → click <strong>"Add dynamic content"</strong>
        → under <strong>"Parameters"</strong> → click <strong>store_files</strong>.
        Expression becomes <code>@pipeline().parameters.store_files</code>.
      </p>
      <Screenshot caption="Dynamic content editor — @pipeline().parameters.store_files expression, store_files parameter highlighted on the right" />
      <Screenshot caption="ForEach Settings tab — Sequential unchecked, Batch count 4, Items showing @pipeline().parameters.store_files" />

      <div className="my-4 p-4 rounded-xl text-xs space-y-2"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p style={{ color: 'var(--text)' }}><strong>Sequential OFF</strong> — run multiple iterations at the same time (parallel). Faster but uses more resources.</p>
        <p style={{ color: 'var(--text)' }}><strong>Batch count 4</strong> — run maximum 4 iterations simultaneously: files 1,2,3,4 → then 5,6,7,8 → then 9,10. Prevents overloading the system.</p>
      </div>

      <h2>Step 8 — Add Copy Activity INSIDE the ForEach</h2>
      <Callout type="warning" label="⚠️ Most Common Mistake in This Step">
        Do NOT drag a Copy activity from the left panel onto the main canvas. You must click the <strong>"+"</strong>
        that is <strong>inside</strong> the ForEach box. This is the mistake beginners make most often.
      </Callout>
      <p>Click the <strong>"+ (Add activity)"</strong> button that is <strong>inside</strong> the ForEach box on the canvas.</p>
      <Screenshot caption="ForEach activity box — showing the '+' button inside the box (not on the main canvas)" />
      <p>You are now inside the loop — a new blank canvas area opens labeled with the ForEach name.</p>
      <Screenshot caption="ForEach inner canvas — a new blank canvas area showing you are inside the loop" />
      <p>From the left panel → drag a <strong>"Copy data"</strong> activity onto this inner canvas.</p>
      <Screenshot caption="Copy data activity placed inside the ForEach inner canvas" />

      <h2>Step 9 — Configure Source with @item()</h2>
      <p>Click the Copy activity inside the ForEach → configure:</p>
      <h3>General Tab</h3>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Name</span><span style={{ color: '#00e676' }}>copy_store_file</span></div>
        <div className="flex gap-4"><span style={{ color: 'var(--muted)', width: 120, flexShrink: 0 }}>Description</span><span style={{ color: '#00e676' }}>Copies current store file from landing to ADLS raw/sales/</span></div>
      </div>
      <h3>Source Tab</h3>
      <p>
        Select <code>ds_src_blob_store_sales</code>. A <strong>Dataset properties</strong> section appears.
        Click inside the <strong>file_name</strong> value field → <strong>"Add dynamic content"</strong>.
      </p>
      <Screenshot caption="Source tab — ds_src_blob_store_sales selected, Dataset properties section showing file_name field with 'Add dynamic content' link" />
      <p>Under <strong>"ForEach iterator"</strong> on the right → click <strong>"Item"</strong>. Expression becomes:</p>
      <div className="my-3 p-3 rounded-xl font-mono text-sm"
        style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: '#00e676' }}>
        @item()
      </div>
      <Screenshot caption="Dynamic content editor — @item() expression, 'Item' option highlighted under ForEach iterator section" />
      <p>Click <strong>"OK"</strong>.</p>
      <div className="my-4 p-4 rounded-xl text-xs" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="font-semibold mb-2" style={{ color: 'var(--text)' }}>What does @item() mean?</p>
        <p style={{ color: 'var(--text2)' }}>
          <code>@item()</code> only works inside a ForEach loop. It returns the current item being processed.
        </p>
        <div className="mt-2 font-mono space-y-1" style={{ color: 'var(--muted)' }}>
          <p>Iteration 1: @item() = "store_ST001_sales.csv"</p>
          <p>Iteration 2: @item() = "store_ST002_sales.csv"</p>
          <p>Iteration 3: @item() = "store_ST003_sales.csv" ... and so on</p>
        </div>
      </div>
      <Screenshot caption="Source tab complete — file_name Dataset property showing @item() value" />

      <h2>Step 10 — Configure Sink with @item()</h2>
      <p>
        Click <strong>Sink</strong> tab → select <code>ds_sink_adls_store_sales</code>
        → in the <strong>file_name</strong> Dataset property → <strong>"Add dynamic content"</strong>
        → click <strong>"Item"</strong> → expression: <code>@item()</code> → <strong>"OK"</strong>.
      </p>
      <Screenshot caption="Sink tab — ds_sink_adls_store_sales selected, file_name Dataset property showing @item()" />
      <p>
        Both source and sink now use <code>@item()</code> — the same file name is used for reading and writing:
      </p>
      <div className="my-4 p-4 rounded-xl font-mono text-xs space-y-2"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex gap-4">
          <span style={{ color: 'var(--muted)', width: 60, flexShrink: 0 }}>Source</span>
          <span style={{ color: 'var(--text2)' }}>reads from</span>
          <span className="ml-2" style={{ color: '#ff9900' }}>landing/store_sales/store_ST001_sales.csv</span>
        </div>
        <div className="flex gap-4">
          <span style={{ color: 'var(--muted)', width: 60, flexShrink: 0 }}>Sink</span>
          <span style={{ color: 'var(--text2)' }}>writes to</span>
          <span className="ml-2" style={{ color: '#00e676' }}>raw/sales/store_ST001_sales.csv</span>
        </div>
        <p className="text-xs pt-1" style={{ color: 'var(--muted)' }}>Same file name — different container and folder. Clean.</p>
      </div>

      <h2>Step 11 — Validate and Return to Main Canvas</h2>
      <p>
        Click the <strong>back arrow</strong> at the top left of the inner canvas to return to the main pipeline canvas.
      </p>
      <Screenshot caption="Back arrow at top left — returning to main pipeline canvas from ForEach inner canvas" />
      <Screenshot caption="Main pipeline canvas — ForEach_store_files activity showing '1 activity' label inside it" />
      <p>Click <strong>"Validate"</strong> in the top toolbar.</p>
      <Screenshot caption="Validation successful message — 'Your pipeline has been validated. No errors were found.'" />

      <div className="my-4 p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid #ff6b6b30' }}>
        <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text)' }}>If you see errors:</p>
        <div className="space-y-2 text-xs" style={{ color: 'var(--text2)' }}>
          <p><span style={{ color: '#ff6b6b' }}>Dataset property file_name is not set</span> → Copy activity → Source or Sink tab → add @item() to the file_name property</p>
          <p><span style={{ color: '#ff6b6b' }}>Items expression is required</span> → ForEach activity → Settings tab → Items field → add @pipeline().parameters.store_files</p>
        </div>
      </div>

      <h2>Step 12 — Debug</h2>
      <p>
        Click <strong>"Debug"</strong>. A dialog appears asking for parameter values — the default array should be pre-filled. If not, paste it:
      </p>
      <div className="my-3 p-3 rounded-xl font-mono text-xs"
        style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: '#7b61ff', wordBreak: 'break-all' }}>
        {defaultArray}
      </div>
      <Screenshot caption="Debug parameter dialog — store_files parameter with the JSON array value pre-filled" />
      <p>
        Click <strong>"OK"</strong>. Watch the ForEach run. Click the <strong>👓 glasses icon</strong> next to the ForEach
        in the Output tab to see individual iterations.
      </p>
      <Screenshot caption="ForEach run details — showing all 10 iterations, each with status, file name, and duration" />
      <Screenshot caption="All 10 iterations completed — every row showing green checkmark and duration" />

      <h2>Step 13 — Verify All 10 Files in ADLS</h2>
      <p>Go to Azure Portal → <code>stfreshmartdev</code> → <strong>Containers</strong> → <strong>raw</strong> → <strong>sales</strong>.</p>
      <Screenshot caption="raw/sales/ directory — showing all 10 store CSV files listed with file sizes and timestamps" />
      <p>Click on any file → <strong>"Edit"</strong> to preview the data.</p>
      <Screenshot caption="One store file open in preview — showing the 5 rows of data for that store" />

      <h2>Step 14 — Publish</h2>
      <p>Click <strong>"Publish all"</strong> → the panel shows 3 new items: pipeline, 2 datasets → click <strong>"Publish"</strong>.</p>
      <Screenshot caption="Successfully published message — 3 new items published" />

      {/* Bonus */}
      <div className="my-8 p-5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--accent2)' }}>
        <div className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--accent2)' }}>
          💡 Bonus — Test With Only 3 Files
        </div>
        <p className="text-sm mb-3" style={{ color: 'var(--text2)' }}>
          Click <strong>Debug</strong> → change the <code>store_files</code> value to just 3 files.
          The pipeline runs only 3 iterations. This is how professionals test with a subset before running the full load.
        </p>
        <div className="p-3 rounded-lg font-mono text-xs"
          style={{ background: 'var(--bg2)', color: '#7b61ff', wordBreak: 'break-all' }}>
          {`["store_ST001_sales.csv","store_ST002_sales.csv","store_ST003_sales.csv"]`}
        </div>
        <Screenshot caption="Debug dialog — store_files with only 3 files in the array for a quick test run" />
        <Screenshot caption="ForEach showing only 3 iterations — faster test run completed" />
      </div>

      {/* Summary table */}
      <h2>What Was Added in Project 02</h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              {['Item', 'Name', 'What It Does'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-mono uppercase"
                  style={{ color: 'var(--muted)' }}>{h}</th>
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
              {['Concept', 'What It Is', 'When You Use It'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-mono uppercase"
                  style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {conceptsTable.map((c, i) => (
              <tr key={c.concept} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--surface)' : 'transparent' }}>
                <td className="py-2 px-4 font-mono text-xs font-bold" style={{ color: 'var(--accent)' }}>{c.concept}</td>
                <td className="py-2 px-4 text-xs" style={{ color: 'var(--text2)' }}>{c.what}</td>
                <td className="py-2 px-4 text-xs" style={{ color: 'var(--text2)' }}>{c.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Common mistakes */}
      <h2>Common Mistakes</h2>
      <div className="space-y-3 my-6">
        {[
          { mistake: 'Placing Copy activity OUTSIDE the ForEach',              fix: 'Delete it, click the "+" INSIDE the ForEach box, re-add it' },
          { mistake: 'Forgetting to set Dataset properties in Source or Sink', fix: 'Copy activity → Source tab → Dataset properties → set file_name to @item()' },
          { mistake: 'Wrong Array format in parameter default',                fix: 'Must be: ["file1.csv","file2.csv"] — double quotes, square brackets, no trailing comma' },
          { mistake: 'Sequential = ON with large file lists',                  fix: 'Turn Sequential OFF and set Batch count to 4 or 5' },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid #ff6b6b30' }}>
            <div className="flex items-start gap-3">
              <span className="text-base flex-shrink-0">⚠️</span>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>{item.mistake}</p>
                <p className="text-xs" style={{ color: 'var(--text2)' }}>
                  <span style={{ color: '#00e676' }}>Fix: </span>{item.fix}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next project teaser */}
      <div className="my-8 p-6 rounded-xl" style={{ background: 'var(--surface)', border: '2px solid var(--accent2)' }}>
        <div className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--accent2)' }}>
          What is coming in Project 03
        </div>
        <p className="text-sm mb-3" style={{ color: 'var(--text)' }}>
          Right now you pass the file list as a hardcoded default array parameter. What if the file name includes today's date?
        </p>
        <div className="font-mono text-xs mb-3 p-3 rounded-lg space-y-1" style={{ background: 'var(--bg2)', color: 'var(--muted)' }}>
          <p>store_ST001_sales_20240115.csv</p>
          <p>store_ST001_sales_20240116.csv  ← tomorrow</p>
          <p>store_ST001_sales_20240117.csv  ← day after</p>
        </div>
        <p className="text-sm" style={{ color: 'var(--text2)' }}>
          In <strong>Project 03</strong> you will learn <strong>Parameterized Pipelines with Variables</strong> — pass <code>run_date</code> at trigger time,
          use a <strong>Set Variable activity</strong> to build the folder path, and ADF constructs the correct file names automatically every night.
        </p>
      </div>

      <KeyTakeaways items={[
        'ForEach loops through an array — one Copy activity handles all files instead of duplicating activities per file',
        '@item() returns the current loop value — it only works inside a ForEach activity',
        'Parameterized datasets use @dataset().file_name so the same dataset works for any file',
        'The store_files Array parameter holds the list of files — passed from outside the pipeline before it runs',
        'Sequential OFF + Batch count 4 runs 4 files simultaneously — much faster than sequential for large lists',
        'Pass a smaller test array at Debug time to validate the pipeline on 3 files before running all 10',
        'Adding a new store? Just add the filename to the array parameter — the pipeline never needs to change',
        'Variables are different from parameters — you will use them properly in Project 03 where they are genuinely needed',
      ]} />
    </LearnLayout>
  )
}