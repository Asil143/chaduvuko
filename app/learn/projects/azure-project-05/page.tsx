import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { LearningResourceJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd'

export const metadata = {
  title: 'Azure Data Factory File Management: Get Metadata, If Condition, Delete Activity — Project 05',
  description:
    'Build a production-grade ADF file management pipeline. Check file existence with Get Metadata, add date stamps, auto-clean the landing zone with Delete activity, and log missing files.',
  keywords: [
    'azure data factory get metadata activity',
    'adf if condition tutorial',
    'adf delete activity',
    'azure data factory file management',
    'adf date stamp file names',
    'landing zone cleanup adf',
    'production azure data factory pipeline',
    'adf file existence check',
  ],
  alternates: {
    canonical: 'https://chaduvuko.com/learn/projects/azure-project-05',
  },
  openGraph: {
    title: 'ADF File Management: Get Metadata, If Condition & Delete Activity — Free Tutorial',
    description:
      'Check file existence, date-stamp outputs, auto-clean the landing zone, and log errors. A complete production file management workflow in ADF.',
    url: 'https://chaduvuko.com/learn/projects/azure-project-05',
    type: 'article',
    images: [
      {
        url: 'https://chaduvuko.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Azure Data Factory File Management Tutorial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADF Get Metadata, If Condition & Delete Activity — Free Tutorial',
    description:
      'Production-grade ADF file management: check existence, date-stamp, auto-cleanup, log errors. Full walkthrough.',
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

function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="my-3 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      {label && (
        <div className="px-4 py-1.5" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{label}</span>
        </div>
      )}
      <pre className="px-4 py-3 overflow-x-auto text-sm leading-relaxed" style={{ background: 'var(--bg2)', color: 'var(--text2)', margin: 0 }}>
        <code>{children}</code>
      </pre>
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
        {result && <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>→ {result}</p>}
      </div>
    </div>
  )
}

const activitiesTable = [
  { activity: 'Get Metadata', purpose: 'Read file/folder properties', output: '.output.exists, .output.size, .output.lastModified' },
  { activity: 'If Condition',  purpose: 'Branch based on true/false',  output: 'Runs True OR False activities' },
  { activity: 'Delete',        purpose: 'Remove a file from storage',  output: 'File is permanently removed' },
  { activity: 'Set Variable (append)', purpose: 'Build a running log', output: 'Concatenates text across iterations' },
]

const expressionsTable = [
  { expr: '@and(condition1, condition2)',             desc: 'True only when BOTH conditions are true' },
  { expr: "activity('name').output.fieldname",       desc: 'Read the output of a previous activity' },
  { expr: 'greater(value, number)',                   desc: 'True if value is greater than number' },
  { expr: "@{replace(string, 'find', 'replace')}",   desc: 'Replace text within a string' },
  { expr: "@{variables('name')}existing@{item()}new", desc: 'Append text to a variable (concatenation)' },
]

const conceptsTable = [
  { concept: 'Get Metadata',          what: 'Reads file properties without reading file',   why: 'Check existence before copying — prevent crashes' },
  { concept: 'If Condition',          what: 'Branches pipeline based on true/false',        why: 'Handle missing files gracefully' },
  { concept: 'Delete Activity',       what: 'Permanently removes file from storage',        why: 'Clean landing zone after successful processing' },
  { concept: 'True branch',           what: 'Activities that run when condition is true',   why: 'The happy path' },
  { concept: 'False branch',          what: 'Activities that run when condition is false',  why: 'The error handling path' },
  { concept: 'Sequential ForEach',    what: 'One iteration at a time',                      why: 'Required when writing to shared variables' },
  { concept: 'Race condition',        what: 'Two iterations updating same variable at once',why: 'Why parallel ForEach breaks variable updates' },
  { concept: 'String concatenation',  what: 'Appending text to a variable each iteration', why: 'Build running logs across loop iterations' },
  { concept: "activity('name').output", what: "Read another activity's result",             why: 'Core pattern for connecting activity results' },
  { concept: '@and()',                what: 'Both conditions must be true',                  why: 'Safer than just checking exists alone' },
]

const mistakesTable = [
  { mistake: 'Activity name in expression does not match actual name',     fix: "Expression uses activity('get_metadata_store_file') — if the activity is named GetMetadata1 the expression fails. Names are case-sensitive." },
  { mistake: 'ForEach set to Parallel when writing to a variable',         fix: 'Set ForEach Sequential = ON whenever activities inside write to pipeline variables. Parallel causes race conditions.' },
  { mistake: 'Delete activity runs even when Copy failed',                  fix: 'Make sure Delete is connected to Copy with a success arrow (green), not always arrow (grey). Click the arrow to verify it shows "On success".' },
  { mistake: 'Get Metadata field list not configured',                      fix: 'Get Metadata → Field list tab → must explicitly add "exists" as a field. Without this, output.exists returns null.' },
  { mistake: 'Activities placed in wrong branch',                           fix: 'Click Activities tab on If Condition → verify Copy is in True branch and log_missing_file is in False branch.' },
  { mistake: 'Self-reference error on missing_files variable',              fix: 'Use a second variable (final_log) for the summary. missing_files is written inside ForEach, final_log reads it after. Never read and write the same variable in one Set Variable activity.' },
]

export default function Project05Page() {
  return (
    <LearnLayout
      title="Project 05 — Organize Files Automatically With Date Stamps"
      description="Stop overwriting files silently. Build a pipeline that checks if a file exists before copying, date-stamps the output, cleans the landing zone automatically, and logs what was missing — a complete production file management workflow."
      section="Projects"
      readTime="90–120 min"
      updatedAt="March 2026"
    >

      <LearningResourceJsonLd name="ADF File Management: Get Metadata, If Condition and Delete Activity" description="Build a production-grade ADF pipeline with file existence checks, date stamps, auto-cleanup, and error logging." url="https://chaduvuko.com/learn/projects/azure-project-05" datePublished="2026-03-01" keywords={['adf get metadata activity', 'adf if condition', 'adf delete activity', 'azure file management pipeline']} timeRequired="PT90M" />
      <BreadcrumbJsonLd items={[{ name: 'Home', url: 'https://chaduvuko.com' }, { name: 'Projects', url: 'https://chaduvuko.com/learn/projects' }, { name: 'Project 05 — File Management', url: 'https://chaduvuko.com/learn/projects/azure-project-05' }]} />

      {/* Series info */}
      <div className="not-prose mb-8 p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><span style={{ color: 'var(--muted)' }}>Series</span><br /><strong style={{ color: 'var(--text)' }}>Azure DE — Zero to Advanced</strong></div>
          <div><span style={{ color: 'var(--muted)' }}>Project</span><br /><strong style={{ color: 'var(--text)' }}>05 of 25</strong></div>
          <div><span style={{ color: 'var(--muted)' }}>Level</span><br /><strong style={{ color: '#ff9900' }}>Beginner+</strong></div>
          <div><span style={{ color: 'var(--muted)' }}>Time</span><br /><strong style={{ color: 'var(--text)' }}>90–120 min</strong></div>
        </div>
        <div className="mt-3 pt-3 text-sm" style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--text)' }}>Builds on:</strong> Projects 01–04 — same resource group, same storage account, same ADF
        </div>
      </div>

      {/* Real World Problem */}
      <h2>🏢 Real World Problem</h2>
      <p>FreshMart&apos;s data lake is growing. After Projects 01–04, files are landing in ADLS — but new problems are showing up.</p>

      <p><strong>Problem 1 — Files get overwritten silently</strong></p>
      <p>
        Every morning, <code>cities.csv</code> is downloaded and saved to <code>raw/external/cities/cities.csv</code>.
        But what happened to yesterday&apos;s file? Overwritten. Gone. No history. Three months later the data team asks
        what external price data looked like in January — the answer is: we don&apos;t know.
      </p>

      <p><strong>Problem 2 — Nobody knows if the source file actually arrived</strong></p>
      <p>
        The pipeline runs at midnight. What if the supplier server was down? ADF will try to copy a file that doesn&apos;t
        exist and fail with a cryptic error. Better behavior: check first, skip gracefully if missing — don&apos;t crash the whole pipeline.
      </p>

      <p><strong>Problem 3 — Landing zone is filling up with processed files</strong></p>
      <p>
        Files land in <code>landing/store_sales/</code> and stay there forever after being copied to <code>raw/</code>.
        The landing zone is a staging area, not permanent storage. Processed files should be deleted after a successful copy.
      </p>

      <p><strong>The solution — a production-grade file management pattern:</strong></p>
      <CodeBlock>{`Step 1: Check if file exists in landing zone (Get Metadata + If Condition)
Step 2: If file exists → copy it to ADLS with date stamp in the name
Step 3: After successful copy → delete file from landing zone
Step 4: If file does not exist → log warning, continue gracefully`}</CodeBlock>

      <Callout type="example">
        This is exactly how production pipelines are designed at companies like Flipkart, Zomato, and HDFC Bank.
      </Callout>

      {/* Concepts */}
      <h2>🧠 Concepts You Must Understand First</h2>

      <h3>What is the Get Metadata Activity?</h3>
      <p>
        Get Metadata reads information <strong>about</strong> a file or folder — without reading the file contents.
        Think of it like checking a package label before opening it.
      </p>
      <CodeBlock>{`Get Metadata can return:
  exists          → true or false
  size            → file size in bytes
  lastModified    → when the file was last changed
  itemName        → the file name
  itemType        → "File" or "Folder"
  childItems      → list of files inside a folder`}</CodeBlock>

      <h3>What is the If Condition Activity?</h3>
      <p>ADF&apos;s decision maker. It evaluates a TRUE/FALSE expression and runs different activities for each outcome.</p>
      <CodeBlock>{`IF (file exists AND size > 0)
  THEN → Copy the file + Delete original
  ELSE → Log a warning message, skip this file

In ADF:
  If Condition Activity
    ├── Expression:   @and(activity('get_metadata_store_file').output.exists, greater(...size, 0))
    ├── True branch:  Copy Activity → Delete Activity
    └── False branch: Set Variable Activity (log "file not found")`}</CodeBlock>

      <h3>What is the Delete Activity?</h3>
      <p>
        Deletes a file or folder from a storage location. After successfully copying a file from landing → ADLS,
        we use Delete to remove the original.
      </p>
      <Callout type="warning">
        <strong>Delete only runs AFTER Copy succeeds.</strong> If copying fails, Delete never runs and the original file is safe.
        Always connect Delete to Copy with a <strong>success arrow</strong> (green), not an always arrow (grey).
      </Callout>

      <h3>String Interpolation for Date-Stamped File Names</h3>
      <CodeBlock label="Building a dated file name">{`Original:   store_ST001_sales.csv
Stamped:    store_ST001_sales_20240115.csv

Expression:
@{replace(item(), '.csv', '')}_@{formatDateTime(pipeline().parameters.run_date, 'yyyyMMdd')}.csv

Breaking down:
  @{replace(item(), '.csv', '')}   → removes .csv → "store_ST001_sales"
  _                                → literal underscore
  @{formatDateTime(..., 'yyyyMMdd')} → "20240115"
  .csv                             → adds .csv back

Result: store_ST001_sales_20240115.csv`}</CodeBlock>

      <h3>What We Are Building — Visualized</h3>
      <CodeBlock>{`PIPELINE: pl_file_management_daily

FOR EACH store file:
  │
  ├─► GET METADATA
  │   "Does store_ST001_sales_20240115.csv exist in landing?"
  │
  ├─► IF CONDITION
  │   "output.exists = true AND size > 0?"
  │
  ├─► TRUE BRANCH:
  │   │
  │   ├─► COPY ACTIVITY
  │   │   landing/store_sales/date=2024-01-15/store_ST001_sales_20240115.csv
  │   │   → raw/sales/date=2024-01-15/store_ST001_sales_20240115.csv
  │   │
  │   └─► DELETE ACTIVITY
  │       Delete: landing/store_sales/date=2024-01-15/store_ST001_sales_20240115.csv
  │
  └─► FALSE BRANCH:
      SET VARIABLE: missing_files += "ST001 missing for 2024-01-15 | "
      (pipeline continues — does not crash)`}</CodeBlock>

      {/* Step overview */}
      <h2>📋 Step by Step Overview</h2>
      <CodeBlock>{`PHASE 1 — Prepare (10 min)
  Step 1:  Upload test files to landing zone

PHASE 2 — Create New Datasets (15 min)
  Step 2:  Confirm existing source dataset (reuse from Project 03)
  Step 3:  Create Delete activity dataset

PHASE 3 — Build the Pipeline (60 min)
  Step 4:  Create pipeline with parameters and variables
  Step 5:  Add Set Variable — build run_date_folder
  Step 6:  Add ForEach activity
  Step 7:  Inside ForEach — add Get Metadata activity
  Step 8:  Inside ForEach — add If Condition activity
  Step 9:  Inside True branch — add Copy activity
  Step 10: Inside True branch — add Delete activity
  Step 11: Inside False branch — add Set Variable (log missing files)
  Step 12: Add final summary log activity to main canvas
  Step 13: Validate and Debug — file exists scenario
  Step 14: Debug — file missing scenario
  Step 15: Publish`}</CodeBlock>

      {/* Phase 1 */}
      <h2>Phase 1 — Prepare</h2>

      <h3>Step 1 — Upload Test Files to Landing Zone</h3>
      <p>We need files in the landing zone to test both scenarios — exists AND missing.</p>
      <p>Azure Portal → Storage → <code>stfreshmartdev</code> → Containers → <strong>landing</strong> → <code>store_sales/</code></p>
      <p>Click <strong>&quot;+ Add Directory&quot;</strong></p>
      <CodeBlock>{`Directory name: date=2024-01-15`}</CodeBlock>
      <Screenshot caption="Add Directory dialog — date=2024-01-15 entered" />

      <p>Click into <code>date=2024-01-15</code> → click <strong>&quot;Upload&quot;</strong></p>
      <p>Upload only <strong>5 of the 10 store files</strong> (ST001–ST005). This lets us test the missing scenario for ST006–ST010.</p>
      <CodeBlock>{`store_ST001_sales_20240115.csv
store_ST002_sales_20240115.csv
store_ST003_sales_20240115.csv
store_ST004_sales_20240115.csv
store_ST005_sales_20240115.csv`}</CodeBlock>
      <Screenshot caption="Upload dialog — 5 files selected, ready to upload" />
      <Screenshot caption="landing/store_sales/date=2024-01-15/ — showing exactly 5 files (ST001 through ST005)" />

      {/* Phase 2 */}
      <h2>Phase 2 — Create New Datasets</h2>

      <h3>Step 2 — Reuse Existing Source Dataset</h3>
      <p>
        The Get Metadata activity will reuse <code>ds_src_blob_dated_store_sales</code> from Project 03 —
        it already has <code>run_date_folder</code> and <code>file_name</code> parameters. No new source dataset needed.
      </p>
      <Screenshot caption="Author → Datasets — ds_src_blob_dated_store_sales already exists from Project 03" />

      <h3>Step 3 — Create Delete Activity Dataset</h3>
      <p>In ADF Studio → <strong>Author</strong> → <strong>Datasets</strong> → <strong>&quot;+&quot;</strong> → <strong>&quot;New dataset&quot;</strong></p>
      <p>Search <strong>&quot;Azure Blob Storage&quot;</strong> → select → <strong>&quot;Continue&quot;</strong></p>
      <p>Select <strong>&quot;DelimitedText&quot;</strong> → <strong>&quot;Continue&quot;</strong></p>
      <CodeBlock>{`Name:            ds_delete_blob_landing
Linked service:  ls_blob_freshmart_landing
File path:       (leave all empty)
First row as header: ✅ Yes
Import schema:   None`}</CodeBlock>
      <p>Click <strong>&quot;OK&quot;</strong> → <strong>&quot;Parameters&quot;</strong> tab → add TWO parameters:</p>
      <CodeBlock>{`Parameter 1:
  Name:    run_date_folder
  Type:    String

Parameter 2:
  Name:    file_name
  Type:    String`}</CodeBlock>
      <Screenshot caption="ds_delete_blob_landing Parameters tab — run_date_folder and file_name parameters" />

      <p>Click <strong>&quot;Connection&quot;</strong> tab:</p>
      <p><strong>Container:</strong> <code>landing</code></p>
      <p><strong>Directory</strong> → <strong>&quot;Add dynamic content&quot;</strong>:</p>
      <ExprBox expr="store_sales/@{dataset().run_date_folder}" label="Directory" />
      <p><strong>File</strong> → <strong>&quot;Add dynamic content&quot;</strong>:</p>
      <ExprBox expr="@dataset().file_name" label="File" />
      <Screenshot caption="ds_delete_blob_landing Connection tab — landing/store_sales/@{dataset().run_date_folder}/@dataset().file_name" />
      <p>Click <strong>💾 Save</strong></p>

      {/* Phase 3 */}
      <h2>Phase 3 — Build the Pipeline</h2>

      <h3>Step 4 — Create Pipeline With Parameters and Variables</h3>
      <p>In ADF Studio → <strong>Author</strong> → <strong>&quot;+&quot;</strong> → <strong>&quot;New pipeline&quot;</strong></p>
      <CodeBlock>{`Name:        pl_file_management_daily
Description: Checks file existence, copies with date stamp, deletes from landing zone`}</CodeBlock>

      <p>Click <strong>empty canvas</strong> → <strong>&quot;Parameters&quot;</strong> tab → add TWO parameters:</p>
      <CodeBlock>{`Parameter 1:
  Name:    run_date
  Type:    String
  Default: 2024-01-15

Parameter 2:
  Name:    store_ids
  Type:    Array
  Default: ["ST001","ST002","ST003","ST004","ST005","ST006","ST007","ST008","ST009","ST010"]`}</CodeBlock>
      <Screenshot caption="Pipeline Parameters tab — run_date and store_ids parameters" />

      <p>Click <strong>&quot;Variables&quot;</strong> tab → add THREE variables:</p>
      <CodeBlock>{`Variable 1:
  Name:    run_date_folder
  Type:    String

Variable 2:
  Name:    missing_files
  Type:    String

Variable 3:
  Name:    final_log
  Type:    String`}</CodeBlock>

      <Callout type="warning">
        <strong>Why three variables?</strong><br />
        ADF does not allow a Set Variable activity to read and write the <strong>same variable</strong> in one step — it calls this a &quot;self-reference&quot; and throws an error.<br /><br />
        <code>missing_files</code> is written to <strong>inside</strong> the ForEach (appending each missing store).<br />
        <code>final_log</code> is written to <strong>after</strong> the ForEach (reads <code>missing_files</code> and builds the summary).<br />
        Two different variables = no self-reference = no error.
      </Callout>

      <Screenshot caption="Variables tab — three variables: run_date_folder, missing_files, final_log" />

      <h3>Step 5 — Add Set Variable: Build run_date_folder</h3>
      <p>From left panel → <strong>&quot;General&quot;</strong> → drag <strong>&quot;Set variable&quot;</strong> onto the canvas</p>
      <p>Click it → bottom panel:</p>
      <CodeBlock>{`General tab:
  Name:        set_run_date_folder
  Description: Formats run_date into Hive partition folder name`}</CodeBlock>
      <p>Click <strong>&quot;Variables&quot;</strong> tab:</p>
      <CodeBlock>{`Name:   run_date_folder
Value:  (Add dynamic content)`}</CodeBlock>
      <ExprBox expr="date=@{pipeline().parameters.run_date}" label="Value expression" />
      <Screenshot caption="Set variable activity — name 'set_run_date_folder', value showing date=@{pipeline().parameters.run_date}" />

      <h3>Step 6 — Add ForEach Activity</h3>
      <p>From left panel → <strong>&quot;Iteration &amp; conditionals&quot;</strong> → drag <strong>&quot;ForEach&quot;</strong> onto the canvas</p>
      <p>Connect: hover over <code>set_run_date_folder</code> → drag green arrow → connect to ForEach</p>
      <Screenshot caption="Canvas — set_run_date_folder connected to ForEach with green success arrow" />

      <p>Click the ForEach → bottom panel:</p>
      <CodeBlock>{`General tab:
  Name:        ForEach_stores
  Description: Loops through each store ID to check and copy files

Settings tab:
  Sequential:   ☑ Checked   ← IMPORTANT
  Items:        @pipeline().parameters.store_ids`}</CodeBlock>
      <Screenshot caption="ForEach Settings tab — Sequential CHECKED, Items showing @pipeline().parameters.store_ids" />

      <Callout type="warning">
        <strong>Why Sequential and not Parallel?</strong><br />
        Variables in ADF are shared across the pipeline. If two iterations run simultaneously and both try to update
        <code>missing_files</code> at the same time, one write overwrites the other — entries get lost. This is a
        <strong> race condition</strong>. Sequential solves it — each iteration waits its turn before writing.
        <br /><br />
        <CodeBlock>{`Parallel risk:   Iterations 4 and 6 both find missing files simultaneously
                 Both try to write to missing_files → one write lost ❌

Sequential:      Iteration 4 runs → writes → finishes
                 Iteration 6 runs → writes → finishes
                 All updates preserved ✅`}</CodeBlock>
      </Callout>

      <h3>Step 7 — Inside ForEach: Add Get Metadata Activity</h3>
      <p>Click the <strong>&quot;+&quot;</strong> button <strong>inside</strong> the ForEach box to enter the inner canvas</p>
      <Screenshot caption="ForEach box — '+' button inside, about to enter inner canvas" />

      <p>From left panel → <strong>&quot;General&quot;</strong> → drag <strong>&quot;Get Metadata&quot;</strong> onto the inner canvas</p>
      <Screenshot caption="Get Metadata activity placed on ForEach inner canvas" />

      <p>Click Get Metadata → bottom panel:</p>
      <CodeBlock>{`General tab:
  Name:        get_metadata_store_file
  Description: Checks if today's store file exists in landing zone`}</CodeBlock>

      <p>Click <strong>&quot;Dataset&quot;</strong> tab:</p>
      <CodeBlock>{`Dataset:  ds_src_blob_dated_store_sales`}</CodeBlock>

      <p><strong>run_date_folder</strong> → Add dynamic content:</p>
      <ExprBox expr="@variables('run_date_folder')" label="run_date_folder" />
      <p><strong>file_name</strong> → Add dynamic content:</p>
      <ExprBox expr="store_@{item()}_sales_@{formatDateTime(pipeline().parameters.run_date,'yyyyMMdd')}.csv" label="file_name" />
      <Screenshot caption="Dynamic content editor — full dated file name expression with @item() and formatDateTime" />

      <p>Click <strong>&quot;Field list&quot;</strong> tab → click <strong>&quot;+ New&quot;</strong> twice:</p>
      <CodeBlock>{`Field 1:  exists
Field 2:  size`}</CodeBlock>
      <Screenshot caption="Field list tab — 'exists' and 'size' added as fields to retrieve" />

      <Callout type="info">
        <code>exists</code> tells you if the file is there. <code>size</code> tells you if it is empty (0 bytes).
        In production you check both — a 0-byte file exists but contains no data.
      </Callout>

      <h3>Step 8 — Inside ForEach: Add If Condition Activity</h3>
      <p>From left panel → <strong>&quot;Iteration &amp; conditionals&quot;</strong> → drag <strong>&quot;If Condition&quot;</strong> onto the inner canvas</p>
      <p>Connect green arrow from <code>get_metadata_store_file</code> → connect to If Condition</p>
      <Screenshot caption="Inner canvas — get_metadata_store_file connected to If Condition with green arrow" />

      <p>Click If Condition → bottom panel:</p>
      <CodeBlock>{`General tab:
  Name:        if_file_exists
  Description: Checks if file exists AND has content (size > 0)`}</CodeBlock>

      <p>Click <strong>&quot;Activities&quot;</strong> tab → Expression field → <strong>&quot;Add dynamic content&quot;</strong>:</p>
      <ExprBox
        expr="@and(
  activity('get_metadata_store_file').output.exists,
  greater(activity('get_metadata_store_file').output.size, 0)
)"
        label="If Condition expression"
      />
      <Screenshot caption="Dynamic content editor — the full @and() expression with exists and greater() checks" />

      <CodeBlock label="Breaking down the expression">{`@and( ... , ... )
  → Returns true only if BOTH conditions are true

activity('get_metadata_store_file').output.exists
  → true if file exists, false if not
  → activity('name') reads output of a previous activity by name

greater(activity('get_metadata_store_file').output.size, 0)
  → true if file size is greater than 0 (not empty)

Combined:
  → true if file EXISTS and is NOT EMPTY ✅
  → false if file is missing OR is 0 bytes ❌`}</CodeBlock>
      <Screenshot caption="If Condition Activities tab — expression showing the @and() check with exists and size" />

      <h3>Step 9 — Inside True Branch: Add Copy Activity</h3>
      <p>Click the <strong>pencil icon</strong> next to <strong>&quot;True&quot;</strong> to enter the True branch canvas</p>
      <Screenshot caption="If Condition Activities tab — True and False sections, pencil icon next to True highlighted" />

      <p>Drag <strong>&quot;Copy data&quot;</strong> onto the True branch canvas</p>
      <Screenshot caption="Copy data activity placed on the True branch canvas" />

      <CodeBlock>{`General tab:
  Name:        copy_to_adls_with_datestamp
  Description: Copies store file from landing to ADLS raw/sales/ with date stamp`}</CodeBlock>

      <p><strong>Source tab:</strong></p>
      <CodeBlock>{`Source dataset:  ds_src_blob_dated_store_sales`}</CodeBlock>
      <p>run_date_folder → <code>@variables(&apos;run_date_folder&apos;)</code></p>
      <p>file_name → </p>
      <ExprBox expr="store_@{item()}_sales_@{formatDateTime(pipeline().parameters.run_date,'yyyyMMdd')}.csv" label="file_name" />
      <Screenshot caption="Source tab — both dataset properties filled, file_name showing the dated expression" />

      <p><strong>Sink tab:</strong></p>
      <CodeBlock>{`Sink dataset:  ds_sink_adls_dated_sales`}</CodeBlock>
      <p>run_date_folder → <code>@variables(&apos;run_date_folder&apos;)</code></p>
      <p>file_name → same dated expression as Source</p>
      <ExprBox expr="store_@{item()}_sales_@{formatDateTime(pipeline().parameters.run_date,'yyyyMMdd')}.csv" label="file_name" />
      <Screenshot caption="Sink tab — both dataset properties filled matching source" />

      <h3>Step 10 — Inside True Branch: Add Delete Activity</h3>
      <p>Still on the True branch canvas → from left panel → <strong>&quot;General&quot;</strong> → drag <strong>&quot;Delete&quot;</strong></p>
      <p>Connect green arrow from <code>copy_to_adls_with_datestamp</code> → connect to Delete</p>
      <Screenshot caption="True branch canvas — Copy activity connected to Delete activity with green success arrow" />

      <CodeBlock>{`General tab:
  Name:        delete_from_landing
  Description: Removes processed file from landing zone after successful copy`}</CodeBlock>

      <p>Click <strong>&quot;Dataset&quot;</strong> tab:</p>
      <CodeBlock>{`Dataset:  ds_delete_blob_landing`}</CodeBlock>
      <p>run_date_folder → <code>@variables(&apos;run_date_folder&apos;)</code></p>
      <p>file_name → dated file name expression</p>
      <ExprBox expr="store_@{item()}_sales_@{formatDateTime(pipeline().parameters.run_date,'yyyyMMdd')}.csv" label="file_name" />
      <Screenshot caption="Delete activity Dataset tab — ds_delete_blob_landing selected, both properties filled" />

      <p>Click <strong>&quot;Logging settings&quot;</strong> tab (optional but recommended):</p>
      <CodeBlock>{`Enable logging:    ✅ Yes
Linked service:    ls_adls_freshmart
Log folder path:   logs/delete_activity/`}</CodeBlock>
      <Screenshot caption="Delete activity Logging tab — enabled, log path set to logs/delete_activity/" />

      <Callout type="tip">
        Enable logging for Delete. It is irreversible — if a file gets deleted that shouldn&apos;t have been,
        the log tells you exactly what was deleted, when, and by which run. Your safety net.
      </Callout>

      <Screenshot caption="Complete True branch canvas — Copy → Delete connected with green arrow" />

      <h3>Step 11 — Inside False Branch: Add Set Variable</h3>
      <p>Click back arrow → return to If Condition Activities tab → click pencil next to <strong>&quot;False&quot;</strong></p>
      <Screenshot caption="If Condition — False section pencil icon highlighted" />

      <p>Drag <strong>&quot;Set variable&quot;</strong> onto the False branch canvas</p>
      <Screenshot caption="Set variable activity placed on False branch canvas" />

      <CodeBlock>{`General tab:
  Name:        log_missing_file
  Description: Appends missing store ID to missing_files variable for monitoring`}</CodeBlock>

      <p>Variables tab:</p>
      <CodeBlock>{`Name:   missing_files
Value:  (Add dynamic content)`}</CodeBlock>
      <ExprBox
        expr="@{variables('missing_files')}@{item()} missing for @{pipeline().parameters.run_date} | "
        label="Append expression"
        result={`After ST006 and ST007 missing: "ST006 missing for 2024-01-15 | ST007 missing for 2024-01-15 | "`}
      />
      <Screenshot caption="Set variable — Variables tab with the append expression for missing_files" />

      <CodeBlock label="How string concatenation works here">{`@{variables('missing_files')}        → current value (whatever was already logged)
@{item()}                             → current store ID, e.g. "ST006"
" missing for "                       → literal text
@{pipeline().parameters.run_date}    → "2024-01-15"
" | "                                 → separator between entries

Each iteration APPENDS — previous entries are preserved ✅`}</CodeBlock>
      <Screenshot caption="Complete False branch canvas — log_missing_file Set variable activity alone" />

      <h3>Step 12 — Add Final Summary Log to Main Canvas</h3>
      <p>Click back arrow until you are on the <strong>main pipeline canvas</strong>.</p>
      <p>From left panel → drag one more <strong>&quot;Set variable&quot;</strong> onto the <strong>main canvas</strong> (outside ForEach)</p>
      <p>Connect green arrow from <code>ForEach_stores</code> → connect to this new Set variable</p>

      <CodeBlock>{`General tab:
  Name:        output_missing_files_log
  Description: Final log of all missing files for this pipeline run`}</CodeBlock>

      <p>Variables tab:</p>
      <CodeBlock>{`Name:   final_log       ← write to final_log, NOT missing_files
Value:  Pipeline run complete. Missing files: @{variables('missing_files')}`}</CodeBlock>

      <Callout type="warning">
        <strong>Write to <code>final_log</code>, not <code>missing_files</code>.</strong><br />
        ADF throws a &quot;self-reference&quot; error if a Set Variable activity reads and writes the same variable.
        <code>missing_files</code> is appended to inside the ForEach. Here we read it and write the result to
        <code>final_log</code> — two different variables, no error.
      </Callout>

      <Screenshot caption="output_missing_files_log — Name shows 'final_log', value reads from missing_files" />
      <Screenshot caption="Main canvas — complete pipeline: set_run_date_folder → ForEach_stores → output_missing_files_log" />

      <CodeBlock label="Full pipeline structure">{`MAIN CANVAS:
  [set_run_date_folder] ──► [ForEach_stores] ──► [output_missing_files_log]

INSIDE ForEach_stores:
  [get_metadata_store_file] ──► [if_file_exists]
                                    │
                                    ├── TRUE:  [copy_to_adls_with_datestamp] ──► [delete_from_landing]
                                    │
                                    └── FALSE: [log_missing_file]`}</CodeBlock>

      {/* Step 13 */}
      <h3>Step 13 — Validate</h3>
      <p>Click <strong>&quot;Validate&quot;</strong> in the top toolbar</p>
      <Screenshot caption="Validation successful — no errors found" />

      <Callout type="warning">
        <strong>Common validation errors:</strong><br /><br />
        <strong>&quot;Activity not found&quot;</strong> → The If Condition expression uses <code>activity(&apos;get_metadata_store_file&apos;)</code> — the name in quotes must exactly match the activity&apos;s General tab name. Case-sensitive.<br /><br />
        <strong>&quot;Variable is read-only inside parallel ForEach&quot;</strong> → ForEach Sequential must be CHECKED ON.<br /><br />
        <strong>&quot;Delete activity dataset not configured&quot;</strong> → True branch → Delete → Dataset tab → confirm <code>ds_delete_blob_landing</code> is selected with both properties filled.
      </Callout>

      {/* Step 14 */}
      <h3>Step 14 — Debug: File Exists Scenario</h3>
      <p>Click <strong>&quot;Debug&quot;</strong></p>
      <CodeBlock>{`run_date:   2024-01-15
store_ids:  ["ST001","ST002","ST003","ST004","ST005","ST006","ST007","ST008","ST009","ST010"]`}</CodeBlock>
      <Screenshot caption="Debug parameter dialog — run_date 2024-01-15, full store_ids array" />
      <p>Click <strong>&quot;OK&quot;</strong> — pipeline runs sequentially through all 10 stores.</p>
      <p>ST001–ST005 go through TRUE branch. ST006–ST010 go through FALSE branch.</p>
      <Screenshot caption="Pipeline running — set_run_date_folder green, ForEach running with sequential progress" />
      <Screenshot caption="Pipeline completed — all activities green" />

      <p>Click <strong>👓 glasses icon</strong> on ForEach in Output tab:</p>
      <Screenshot caption="ForEach iteration list — 10 rows, showing each store ID, which branch ran (TRUE/FALSE), and duration" />

      <p>Verify in ADLS:</p>
      <CodeBlock>{`raw/sales/date=2024-01-15/
  ├── store_ST001_sales_20240115.csv  ✅
  ├── store_ST002_sales_20240115.csv  ✅
  ├── store_ST003_sales_20240115.csv  ✅
  ├── store_ST004_sales_20240115.csv  ✅
  └── store_ST005_sales_20240115.csv  ✅

Only 5 files — because only 5 existed in landing. Correct behavior.`}</CodeBlock>
      <Screenshot caption="raw/sales/date=2024-01-15/ — exactly 5 files, matching the stores uploaded" />

      <p>Verify landing zone is cleaned:</p>
      <CodeBlock>{`landing/store_sales/date=2024-01-15/
  (empty — all 5 processed files deleted) ✅`}</CodeBlock>
      <Screenshot caption="landing/store_sales/date=2024-01-15/ — empty folder, files deleted after copying" />

      <p>Check the missing files log — ADF Monitor → pipeline run → click <code>output_missing_files_log</code> → Output:</p>
      <CodeBlock>{`Pipeline run complete. Missing files: ST006 missing for 2024-01-15 | ST007 missing for 2024-01-15 | ST008 missing for 2024-01-15 | ST009 missing for 2024-01-15 | ST010 missing for 2024-01-15 |`}</CodeBlock>
      <Screenshot caption="output_missing_files_log activity output — showing the missing stores listed in final_log value" />

      <h3>Step 15 — Debug: All Files Present Scenario</h3>
      <p>Upload the remaining 5 store files (ST006–ST010) to <code>landing/store_sales/date=2024-01-15/</code></p>
      <Screenshot caption="landing/store_sales/date=2024-01-15/ — all 10 files now uploaded" />

      <p>Run Debug again with the same parameters. This time all 10 go through TRUE branch.</p>
      <Screenshot caption="ForEach iteration list — all 10 rows showing TRUE branch ran, all green" />
      <Screenshot caption="raw/sales/date=2024-01-15/ — all 10 files present" />
      <Screenshot caption="landing/store_sales/date=2024-01-15/ — empty, all files deleted" />
      <Screenshot caption="output_missing_files_log output — 'Pipeline run complete. Missing files: ' (empty — none missing)" />

      <h3>Step 16 — Publish</h3>
      <p>Click <strong>&quot;Publish all&quot;</strong></p>
      <CodeBlock>{`Publishing:
  pl_file_management_daily   (new)
  ds_delete_blob_landing     (new)`}</CodeBlock>
      <Screenshot caption="Publish panel — listing new pipeline and dataset" />
      <Screenshot caption="Successfully published notification" />

      {/* Summary */}
      <h2>🎯 What You Built — Summary</h2>
      <CodeBlock>{`BEFORE:
  Pipelines copied blindly — crashed if file was missing
  Files accumulated in landing zone forever
  No way to know which files were missing on any given day
  No history — files overwritten daily

AFTER:
  Pipeline checks file existence BEFORE attempting to copy
  Landing zone cleaned automatically after successful copy
  Missing files logged — you know exactly what did not arrive
  Files are date-stamped — full history preserved in ADLS
  Pipeline never crashes on missing files — handles gracefully`}</CodeBlock>

      <h3>New ADF Activities Learned</h3>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              {['Activity', 'Purpose', 'Key Output'].map(h => (
                <th key={h} className="px-4 py-2 text-left font-mono text-xs" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activitiesTable.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2 font-mono text-xs" style={{ color: '#7b61ff' }}>{r.activity}</td>
                <td className="px-4 py-2 text-xs" style={{ color: 'var(--text2)' }}>{r.purpose}</td>
                <td className="px-4 py-2 font-mono text-xs" style={{ color: 'var(--accent)' }}>{r.output}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>New Expressions Learned</h3>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              {['Expression', 'What It Does'].map(h => (
                <th key={h} className="px-4 py-2 text-left font-mono text-xs" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expressionsTable.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2 font-mono text-xs" style={{ color: '#7b61ff' }}>{r.expr}</td>
                <td className="px-4 py-2 text-xs" style={{ color: 'var(--text2)' }}>{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key concepts */}
      <h2>🧠 Key Concepts to Remember</h2>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              {['Concept', 'What It Is', 'Why It Matters'].map(h => (
                <th key={h} className="px-4 py-2 text-left font-mono text-xs" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {conceptsTable.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2 font-mono text-xs" style={{ color: '#7b61ff' }}>{r.concept}</td>
                <td className="px-4 py-2 text-xs" style={{ color: 'var(--text2)' }}>{r.what}</td>
                <td className="px-4 py-2 text-xs" style={{ color: 'var(--text2)' }}>{r.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Common mistakes */}
      <h2>⚠️ Common Mistakes in This Project</h2>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              {['Mistake', 'Fix'].map(h => (
                <th key={h} className="px-4 py-2 text-left font-mono text-xs" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mistakesTable.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2 text-xs font-semibold" style={{ color: '#ff6b6b' }}>{r.mistake}</td>
                <td className="px-4 py-2 text-xs" style={{ color: 'var(--text2)' }}>{r.fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tier 1 complete */}
      <h2>🏆 Tier 1 Complete — What You Have Built So Far</h2>
      <CodeBlock>{`PROJECT 01:  Copy a single file                     → ADF basics, linked services, datasets
PROJECT 02:  Copy multiple files with ForEach       → Loops, arrays, parallel execution
PROJECT 03:  Date-parameterized pipeline + trigger  → Parameters, dynamic expressions, scheduling
PROJECT 04:  Download from public HTTPS URL         → HTTP linked service, internet data sources
PROJECT 05:  File management with validation        → Get Metadata, If Condition, Delete, error handling`}</CodeBlock>

      <Callout type="tip">
        You now understand the complete ADF activity toolkit for file-based pipelines.
        Every data engineer at every company uses these exact patterns.
      </Callout>

      <KeyTakeaways items={[
        'Always use Get Metadata to check file existence before copying — prevents cryptic pipeline crashes',
        'If Condition branches your pipeline into happy path (True) and error path (False)',
        'Connect Delete to Copy with a success arrow — if Copy fails, Delete must NOT run',
        'Sequential ForEach is required when activities inside write to shared pipeline variables',
        'Use a separate variable for summaries — ADF blocks self-reference (read + write same variable in one step)',
        'Date-stamping files in ADLS preserves history — overwriting destroys it',
        'The landing zone is temporary — clean it after processing so it stays lean',
      ]} />

      <h2>🚀 What&apos;s Coming in Project 06 — Tier 2 Begins</h2>
      <p>
        So far, all data sources have been <strong>files</strong> — CSVs sitting somewhere waiting to be copied.
        In the real world, a huge portion of data comes from <strong>REST APIs</strong> — services you query
        with an HTTP request and get back structured JSON.
      </p>
      <p>In <strong>Project 06</strong>, FreshMart integrates with a live public REST API:</p>
      <ul>
        <li>Call a real API endpoint and receive a JSON response</li>
        <li>Extract data and land it in ADLS as a clean CSV</li>
        <li>Handle REST API pagination — when results come in pages</li>
        <li>API key authentication</li>
        <li>Parse nested JSON structures</li>
      </ul>

    </LearnLayout>
  )
}
