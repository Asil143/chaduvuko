import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Project 04 — HTTP Ingestion from a Public URL' }

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

const conceptsTable = [
  { concept: 'HTTP Linked Service',      what: 'Connection to an internet server',                    when: 'Downloading files from public URLs' },
  { concept: 'Base URL',                 what: 'Root domain in HTTP linked service',                  when: 'Set once, shared by all datasets using that server' },
  { concept: 'Relative URL',             what: 'File path after the base URL',                        when: 'Specific file on the server' },
  { concept: 'Anonymous auth',           what: 'No login needed',                                     when: 'Public datasets with no access control' },
  { concept: 'Parallel activities',      what: 'Two activities with no arrow between them',           when: 'When tasks are independent, run simultaneously' },
  { concept: 'Sequential activities',    what: 'Two activities connected with arrow',                  when: 'When task B needs task A to finish first' },
  { concept: 'Pipeline time (parallel)', what: 'Max of all parallel activity durations',              when: 'Faster than sequential for independent tasks' },
  { concept: 'external/ folder',         what: 'Separate folder for internet-sourced data',           when: 'Keep internal and external data organized' },
]

const mistakesTable = [
  { mistake: 'Full URL in linked service base URL',       fix: 'Base URL is domain only — no file path. Wrong: https://fsu.edu/file.csv Right: https://fsu.edu' },
  { mistake: 'Missing leading slash in relative URL',     fix: 'Relative URL must start with / — Wrong: ~jburkardt/data.csv  Right: /~jburkardt/data.csv' },
  { mistake: 'Connecting parallel activities with arrow', fix: 'Delete the arrow — activities without arrows run in parallel automatically' },
  { mistake: 'Using POST instead of GET',                 fix: 'For file downloads always use GET as the request method' },
  { mistake: 'HTTPS vs HTTP mismatch',                    fix: 'Make sure the base URL protocol matches the actual server — use https:// for secure sites' },
]

const resourceTable = [
  { type: 'Linked Service', name: 'ls_blob_freshmart_landing',    purpose: 'Azure Blob (landing zone)' },
  { type: 'Linked Service', name: 'ls_adls_freshmart',            purpose: 'ADLS Gen2 (raw/processed/curated)' },
  { type: 'Linked Service', name: 'ls_http_public_data',          purpose: 'Public internet HTTP/HTTPS' },
  { type: 'Dataset',        name: 'ds_src_blob_daily_sales',       purpose: 'Single static CSV from Blob' },
  { type: 'Dataset',        name: 'ds_src_blob_store_sales',       purpose: 'Parameterized store files from Blob' },
  { type: 'Dataset',        name: 'ds_src_blob_dated_store_sales', purpose: 'Date-parameterized store files' },
  { type: 'Dataset',        name: 'ds_src_http_csv',               purpose: 'Public HTTP CSV — relative URL is dynamic' },
  { type: 'Dataset',        name: 'ds_sink_adls_raw_sales',        purpose: 'ADLS sink for sales data' },
  { type: 'Dataset',        name: 'ds_sink_adls_dated_sales',      purpose: 'ADLS sink with date partitioning' },
  { type: 'Dataset',        name: 'ds_sink_adls_external',         purpose: 'ADLS sink for external downloads' },
  { type: 'Pipeline',       name: 'pl_copy_daily_sales_csv',       purpose: 'Project 01 — single file' },
  { type: 'Pipeline',       name: 'pl_copy_all_store_sales',       purpose: 'Project 02 — ForEach loop' },
  { type: 'Pipeline',       name: 'pl_copy_store_sales_by_date',   purpose: 'Project 03 — date parameterized' },
  { type: 'Pipeline',       name: 'pl_download_external_data',     purpose: 'Project 04 — HTTP download' },
]

export default function Project04Page() {
  return (
    <LearnLayout
      title="Project 04 — Download Files From a Public HTTPS URL"
      description="Stop uploading files manually. Build a pipeline that goes directly to a public internet URL, downloads the CSV, and saves it to ADLS — automatically, every morning. No analyst involvement required."
      section="Projects"
      readTime="60–75 min"
      updatedAt="March 2025"
    >

      {/* Series info */}
      <div className="not-prose mb-8 p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><span style={{ color: 'var(--muted)' }}>Series</span><br /><strong style={{ color: 'var(--text)' }}>Azure DE — Zero to Advanced</strong></div>
          <div><span style={{ color: 'var(--muted)' }}>Project</span><br /><strong style={{ color: 'var(--text)' }}>04 of 25</strong></div>
          <div><span style={{ color: 'var(--muted)' }}>Level</span><br /><strong style={{ color: '#00e676' }}>Beginner</strong></div>
          <div><span style={{ color: 'var(--muted)' }}>Time</span><br /><strong style={{ color: 'var(--text)' }}>60–75 min</strong></div>
        </div>
        <div className="mt-3 pt-3 text-sm" style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--text)' }}>Builds on:</strong> Projects 01, 02, 03 — same resource group, same storage account, same ADF
        </div>
      </div>

      {/* Real World Problem */}
      <h2>🏢 Real World Problem</h2>
      <p>
        FreshMart&apos;s data team now works with an external supplier — <strong>AgriPrice India</strong> — a government-backed
        organization that publishes daily wholesale vegetable and fruit prices across Indian cities.
      </p>
      <p>FreshMart&apos;s category managers need this data to:</p>
      <ul>
        <li>Compare what they paid suppliers vs the wholesale market price</li>
        <li>Spot overpriced procurement deals</li>
        <li>Adjust store pricing based on commodity fluctuations</li>
      </ul>
      <p>
        AgriPrice India publishes their data every morning as a CSV file on their public website. Right now,
        FreshMart&apos;s analyst manually opens the browser every morning, downloads the file, and uploads it to Azure.
        <strong> 20 minutes every single day. If the analyst is on leave, it doesn&apos;t happen at all.</strong>
      </p>

      <CodeBlock>{`BEFORE:
  Analyst → opens browser → downloads file → uploads to Azure → 20 min/day

AFTER:
  ADF Pipeline → hits the URL → saves to ADLS → 0 human minutes`}</CodeBlock>

      {/* Concepts */}
      <h2>🧠 Concepts You Must Understand First</h2>

      <h3>What is an HTTP Linked Service?</h3>
      <p>
        In Projects 01–03, our source was always Azure Blob Storage — files sitting inside Azure. But data sources
        in the real world are everywhere: government portals, supplier servers, financial data providers, open datasets.
        All accessible via <strong>HTTP or HTTPS</strong> — the same protocol your browser uses.
      </p>
      <p>An <strong>HTTP Linked Service</strong> tells ADF:</p>
      <Callout type="info">
        &quot;I want to connect to this base URL on the internet. Here are the connection details.&quot;
      </Callout>

      <CodeBlock label="How base URL + relative URL combine">{`HTTP Linked Service:   https://people.sc.fsu.edu
                       ↑ the base server address

HTTP Dataset:          /~jburkardt/data/csv/cities.csv
                       ↑ the specific file path on that server

Together they form:    https://people.sc.fsu.edu/~jburkardt/data/csv/cities.csv
                       ↑ the full URL ADF fetches`}</CodeBlock>

      <h3>HTTP File Download vs REST API</h3>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-2 text-left font-mono text-xs" style={{ color: 'var(--muted)' }}>HTTP (File Download)</th>
              <th className="px-4 py-2 text-left font-mono text-xs" style={{ color: 'var(--muted)' }}>REST API (Data Service)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Downloads a static file', 'Returns structured data (JSON/XML)'],
              ['URL points to a file', 'URL is an endpoint that processes requests'],
              ['Response is the file itself', 'Response is data (often paginated)'],
              ['No authentication usually', 'Usually requires API key or OAuth token'],
              ['Example: CSV on government website', 'Example: Twitter API, Weather API'],
              ['This project →', 'Project 06 →'],
            ].map(([a, b], i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2" style={{ color: 'var(--text2)' }}>{a}</td>
                <td className="px-4 py-2" style={{ color: 'var(--text2)' }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Public Datasets We Are Using</h3>
      <p>We will use two stable, public CSVs hosted by Florida State University — available for 10+ years:</p>
      <CodeBlock label="Primary dataset">{`URL: https://people.sc.fsu.edu/~jburkardt/data/csv/cities.csv

LatD,LatM,LatS,NS,LonD,LonM,LonS,EW,City,State
41,5,59,N,80,39,0,W,Youngstown,OH
42,52,48,N,97,23,23,W,Yankton,SD
...`}</CodeBlock>
      <CodeBlock label="Secondary dataset">{`URL: https://people.sc.fsu.edu/~jburkardt/data/csv/grades.csv`}</CodeBlock>

      <Callout type="info">
        Government URLs change. A university dataset URL is stable. We treat this as AgriPrice India&apos;s data
        for the scenario — the pipeline pattern is identical regardless of URL.
      </Callout>

      <h3>What We Are Building</h3>
      <CodeBlock>{`INTERNET (Public URLs)                ADF Pipeline               ADLS Gen2

https://fsu.edu/.../cities.csv  ──►   HTTP Linked Service  ──►   raw/
                                       Copy Activity              └── external/
https://fsu.edu/.../grades.csv  ──►   Copy Activity                  ├── cities/
                                                                      │   └── cities.csv
                                       pl_download_external_data      └── grades/
                                                                          └── grades.csv`}</CodeBlock>

      {/* Step by step overview */}
      <h2>📋 Step by Step Overview</h2>
      <CodeBlock>{`PHASE 1 — Understand the Source URLs (5 min)
  Step 1: Open and inspect the public CSV URLs in your browser

PHASE 2 — Create HTTP Linked Service (15 min)
  Step 2: Create Linked Service for the FSU data server
  Step 3: Test the connection

PHASE 3 — Create Datasets (15 min)
  Step 4: Create parameterized HTTP source dataset
  Step 5: Create ADLS sink dataset with dynamic path

PHASE 4 — Build the Pipeline (30 min)
  Step 6:  Create new pipeline
  Step 7:  Add parameters — source_relative_url, destination_folder, file_name
  Step 8:  Add Copy activity
  Step 9:  Configure HTTP Source
  Step 10: Configure ADLS Sink
  Step 11: Debug and verify
  Step 12: Add second Copy activity for parallel download
  Step 13: Debug parallel run
  Step 14: Publish`}</CodeBlock>

      {/* Phase 1 */}
      <h2>Phase 1 — Understand the Source URLs</h2>

      <h3>Step 1 — Open and Inspect the URLs in Your Browser</h3>
      <p>Before building anything in ADF, always verify the source URL works.</p>
      <p>Open your browser and go to:</p>
      <CodeBlock>{`https://people.sc.fsu.edu/~jburkardt/data/csv/cities.csv`}</CodeBlock>
      <p>Your browser should display or download the CSV. You should see data starting with:</p>
      <CodeBlock>{`LatD,LatM,LatS,NS,LonD,LonM,LonS,EW,City,State
41,5,59,N,80,39,0,W,Youngstown,OH`}</CodeBlock>
      <Screenshot caption="Browser showing the cities.csv file content at the FSU URL — raw CSV text visible" />

      <p>Now open the second URL:</p>
      <CodeBlock>{`https://people.sc.fsu.edu/~jburkardt/data/csv/grades.csv`}</CodeBlock>
      <Screenshot caption="Browser showing the grades.csv file content — raw CSV text visible" />

      <Callout type="info">
        If a URL is broken, you want to know <strong>before</strong> spending 30 minutes building ADF pipelines. This 30-second check saves hours of debugging.
      </Callout>

      <p>Notice the split between base URL and file path:</p>
      <CodeBlock>{`Base URL:  https://people.sc.fsu.edu
File path: /~jburkardt/data/csv/cities.csv
File path: /~jburkardt/data/csv/grades.csv`}</CodeBlock>
      <p>This separation matters — the Linked Service stores the <strong>base URL</strong>, the Dataset stores the <strong>file path</strong>.</p>

      {/* Phase 2 */}
      <h2>Phase 2 — Create HTTP Linked Service</h2>

      <h3>Step 2 — Create the HTTP Linked Service</h3>
      <p>In ADF Studio → <strong>Manage</strong> (toolbox icon) → <strong>Linked services</strong> → <strong>&quot;+ New&quot;</strong></p>
      <p>In the search box → type <strong>&quot;HTTP&quot;</strong> → select <strong>&quot;HTTP&quot;</strong> → click <strong>&quot;Continue&quot;</strong></p>
      <Screenshot caption="New linked service search — 'HTTP' typed, HTTP connector highlighted in results" />
      <Screenshot caption="HTTP linked service form — blank, ready to fill" />

      <p>Fill in the form exactly:</p>
      <CodeBlock>{`Name:                    ls_http_public_data
Description:             HTTP connection to public data sources on the internet
Connect via:             AutoResolveIntegrationRuntime
Base URL:                https://people.sc.fsu.edu
Authentication type:     Anonymous`}</CodeBlock>

      <Callout type="info">
        <strong>Base URL</strong> is the root domain only — no file path, no trailing slash.<br />
        <strong>Authentication type: Anonymous</strong> means no login required. In Project 06 when we connect to a REST API, you will see how to add API keys and Bearer tokens here.
      </Callout>

      <Screenshot caption="HTTP linked service form fully filled — name, base URL, anonymous authentication all set" />

      <h3>Step 3 — Test the Connection</h3>
      <p>Click <strong>&quot;Test connection&quot;</strong> at the bottom of the form</p>
      <Screenshot caption="Test connection button being clicked" />

      <p>You should see:</p>
      <CodeBlock>{`✅ Connection successful`}</CodeBlock>
      <Screenshot caption="Green 'Connection successful' message" />

      <Callout type="warning">
        <strong>If the connection test fails:</strong><br />
        &quot;Could not connect to host&quot; → Check the base URL spelling — no trailing slash, no file path<br />
        &quot;SSL certificate error&quot; → Try changing https:// to http://<br />
        &quot;Timeout&quot; → Azure&apos;s outbound internet may be blocked in your subscription — check network policies
      </Callout>

      <p>Click <strong>&quot;Create&quot;</strong></p>
      <Screenshot caption="Linked services list — ls_http_public_data now visible alongside previous blob and ADLS linked services" />

      {/* Phase 3 */}
      <h2>Phase 3 — Create Datasets</h2>

      <h3>Step 4 — Create Parameterized HTTP Source Dataset</h3>
      <p>
        This dataset will be reusable — instead of creating one dataset per URL, we create one dataset with a
        <code>relative_url</code> parameter. Different pipelines can pass different file paths to the same dataset.
      </p>

      <p>In ADF Studio → <strong>Author</strong> → <strong>Datasets</strong> → <strong>&quot;+&quot;</strong> → <strong>&quot;New dataset&quot;</strong></p>
      <p>Search <strong>&quot;HTTP&quot;</strong> → select <strong>&quot;HTTP&quot;</strong> → click <strong>&quot;Continue&quot;</strong></p>
      <Screenshot caption="New dataset — HTTP connector selected" />

      <p>Select format: <strong>&quot;DelimitedText&quot;</strong> (CSV) → <strong>&quot;Continue&quot;</strong></p>
      <Screenshot caption="Format selection — DelimitedText selected" />

      <CodeBlock>{`Name:            ds_src_http_csv
Linked service:  ls_http_public_data
Relative URL:    (leave empty — we will make this dynamic)
Request method:  GET
First row as header: ✅ Yes
Import schema:   None`}</CodeBlock>

      <Screenshot caption="HTTP dataset form — name filled, linked service selected, relative URL left empty" />
      <p>Click <strong>&quot;OK&quot;</strong></p>

      <p>Now add a parameter. Click <strong>&quot;Parameters&quot;</strong> tab → <strong>&quot;+ New&quot;</strong></p>
      <CodeBlock>{`Name:    relative_url
Type:    String
Default: (empty)`}</CodeBlock>
      <Screenshot caption="Dataset Parameters tab — relative_url parameter of type String" />

      <p>Click <strong>&quot;Connection&quot;</strong> tab → click inside <strong>&quot;Relative URL&quot;</strong> field → click <strong>&quot;Add dynamic content&quot;</strong></p>
      <p>In the expression editor → click <code>relative_url</code> under Parameters</p>
      <ExprBox expr="@dataset().relative_url" label="Expression" />
      <Screenshot caption="Dynamic content editor — @dataset().relative_url expression" />
      <p>Click <strong>&quot;OK&quot;</strong></p>
      <Screenshot caption="Connection tab — Relative URL showing @dataset().relative_url dynamic expression" />

      <Callout type="info">
        ADF joins the base URL and relative URL automatically.<br />
        Linked Service: <code>https://people.sc.fsu.edu</code><br />
        Dataset relative URL: <code>/~jburkardt/data/csv/cities.csv</code><br />
        ADF fetches: <code>https://people.sc.fsu.edu/~jburkardt/data/csv/cities.csv</code>
      </Callout>

      <p>Click <strong>💾 Save</strong></p>

      <h3>Step 5 — Create ADLS Sink Dataset With Dynamic Path</h3>
      <p>In ADF Studio → <strong>Datasets</strong> → <strong>&quot;+&quot;</strong> → <strong>&quot;New dataset&quot;</strong></p>
      <p>Search <strong>&quot;Azure Data Lake Storage Gen2&quot;</strong> → select → <strong>&quot;Continue&quot;</strong></p>
      <p>Select <strong>&quot;DelimitedText&quot;</strong> → <strong>&quot;Continue&quot;</strong></p>

      <CodeBlock>{`Name:            ds_sink_adls_external
Linked service:  ls_adls_freshmart
File path:       (leave all empty)
First row as header: ✅ Yes
Import schema:   None`}</CodeBlock>

      <p>Click <strong>&quot;OK&quot;</strong></p>
      <p>Click <strong>&quot;Parameters&quot;</strong> tab → add TWO parameters:</p>
      <CodeBlock>{`Parameter 1:
  Name:    destination_folder
  Type:    String

Parameter 2:
  Name:    file_name
  Type:    String`}</CodeBlock>
      <Screenshot caption="Dataset Parameters tab — destination_folder and file_name parameters listed" />

      <p>Click <strong>&quot;Connection&quot;</strong> tab → configure each field:</p>
      <p><strong>Container:</strong></p>
      <CodeBlock>{`raw`}</CodeBlock>
      <p><strong>Directory</strong> → <strong>&quot;Add dynamic content&quot;</strong>:</p>
      <ExprBox expr="external/@{dataset().destination_folder}" label="Directory expression" />
      <p><strong>File</strong> → <strong>&quot;Add dynamic content&quot;</strong>:</p>
      <ExprBox expr="@dataset().file_name" label="File expression" />

      <Callout type="info">
        <strong>Why <code>external/</code> as a top-level folder?</strong><br />
        Keeps internet-sourced data separate from internal store sales data.
        <pre className="mt-2 text-xs">{`raw/
├── sales/          ← internal store sales (Projects 01–03)
└── external/       ← data downloaded from internet (this project)
    ├── cities/
    └── grades/`}</pre>
      </Callout>

      <Screenshot caption="Sink dataset Connection tab — raw/external/@{dataset().destination_folder}/@dataset().file_name" />
      <p>Click <strong>💾 Save</strong></p>

      {/* Phase 4 */}
      <h2>Phase 4 — Build the Pipeline</h2>

      <h3>Step 6 — Create New Pipeline</h3>
      <p>In ADF Studio → <strong>Author</strong> → <strong>&quot;+&quot;</strong> next to Pipelines → <strong>&quot;New pipeline&quot;</strong></p>
      <CodeBlock>{`Name:        pl_download_external_data
Description: Downloads CSV files from public HTTPS URLs into ADLS raw/external/`}</CodeBlock>
      <Screenshot caption="New blank pipeline — name in Properties panel on the right" />

      <h3>Step 7 — Add Pipeline Parameters</h3>
      <p>Click <strong>empty canvas</strong> → <strong>&quot;Parameters&quot;</strong> tab at the bottom → add THREE parameters:</p>
      <CodeBlock>{`Parameter 1:
  Name:    source_relative_url
  Type:    String
  Default: /~jburkardt/data/csv/cities.csv

Parameter 2:
  Name:    destination_folder
  Type:    String
  Default: cities

Parameter 3:
  Name:    file_name
  Type:    String
  Default: cities.csv`}</CodeBlock>
      <Screenshot caption="Pipeline Parameters tab — all three parameters listed with their defaults" />

      <Callout type="info">
        One pipeline, infinite files. Controlled entirely by parameters:<br />
        Run 1 → downloads cities.csv to <code>raw/external/cities/cities.csv</code><br />
        Run 2 → downloads grades.csv to <code>raw/external/grades/grades.csv</code>
      </Callout>

      <h3>Step 8 — Add Copy Activity</h3>
      <p>From left activities panel → <strong>&quot;Move &amp; transform&quot;</strong> → drag <strong>&quot;Copy data&quot;</strong> onto the canvas</p>
      <Screenshot caption="Copy data activity dragged onto the pipeline canvas" />

      <p>Click the Copy activity → bottom panel → <strong>General</strong> tab:</p>
      <CodeBlock>{`Name:        copy_http_to_adls
Description: Downloads file from HTTP source URL and saves to ADLS raw/external/`}</CodeBlock>
      <Screenshot caption="General tab — name and description filled" />

      <h3>Step 9 — Configure HTTP Source</h3>
      <p>Click <strong>&quot;Source&quot;</strong> tab</p>
      <CodeBlock>{`Source dataset:  ds_src_http_csv`}</CodeBlock>
      <p>The <strong>Dataset properties</strong> section appears with the <code>relative_url</code> field.</p>
      <p>Click inside <code>relative_url</code> → <strong>&quot;Add dynamic content&quot;</strong> → click <code>source_relative_url</code> under Parameters:</p>
      <ExprBox expr="@pipeline().parameters.source_relative_url" label="relative_url expression" />
      <Screenshot caption="Dynamic content editor — @pipeline().parameters.source_relative_url expression" />
      <p>Click <strong>&quot;OK&quot;</strong></p>

      <CodeBlock>{`Additional Source settings:
  Request method:         GET
  Additional headers:     (leave empty)
  Pagination rules:       (leave empty)`}</CodeBlock>
      <Screenshot caption="Source tab fully configured — ds_src_http_csv selected, relative_url showing pipeline parameter expression" />

      <h3>Step 10 — Configure ADLS Sink</h3>
      <p>Click <strong>&quot;Sink&quot;</strong> tab</p>
      <CodeBlock>{`Sink dataset:  ds_sink_adls_external`}</CodeBlock>
      <p>Two dataset properties appear. Fill both:</p>
      <p><strong>destination_folder</strong> → <strong>&quot;Add dynamic content&quot;</strong>:</p>
      <ExprBox expr="@pipeline().parameters.destination_folder" label="destination_folder" />
      <p><strong>file_name</strong> → <strong>&quot;Add dynamic content&quot;</strong>:</p>
      <ExprBox expr="@pipeline().parameters.file_name" label="file_name" />
      <Screenshot caption="Sink tab — both destination_folder and file_name properties filled with pipeline parameter expressions" />

      <h3>Step 11 — Debug and Verify</h3>
      <p>Click <strong>&quot;Validate&quot;</strong> in the top toolbar</p>
      <Screenshot caption="Validation successful — no errors message" />

      <p>Click <strong>&quot;Debug&quot;</strong> → the parameter dialog appears pre-filled with your defaults:</p>
      <CodeBlock>{`source_relative_url:  /~jburkardt/data/csv/cities.csv
destination_folder:   cities
file_name:            cities.csv`}</CodeBlock>
      <Screenshot caption="Debug parameter dialog — all three parameters showing their default values" />
      <p>Click <strong>&quot;OK&quot;</strong></p>
      <Screenshot caption="Pipeline running — copy_http_to_adls activity showing yellow/running status" />
      <Screenshot caption="Pipeline succeeded — copy_http_to_adls activity showing green checkmark" />

      <p>Click the <strong>👓 glasses icon</strong> next to the run in the Output tab:</p>
      <CodeBlock>{`Data read:      X bytes
Data written:   X bytes
Files read:     1
Files written:  1
Source:         https://people.sc.fsu.edu/~jburkardt/data/csv/cities.csv
Destination:    raw/external/cities/cities.csv`}</CodeBlock>
      <Screenshot caption="Copy activity run details — showing source URL and destination path, files read and written = 1" />

      <p>Verify in ADLS: Azure Portal → Storage → <code>stfreshmartdev</code> → Containers → <strong>raw</strong></p>
      <CodeBlock>{`raw/
├── sales/          ← from Projects 01–03
└── external/       ← NEW — created by this pipeline
    └── cities/
        └── cities.csv  ✅`}</CodeBlock>
      <Screenshot caption="raw container — showing both 'sales' and 'external' folders" />
      <Screenshot caption="raw/external/cities/ — cities.csv visible with file size" />
      <Screenshot caption="cities.csv preview in Azure Portal — CSV data with LatD, LatM, City, State columns" />

      <h3>Step 12 — Download the Second File (grades.csv)</h3>
      <p>Run the same pipeline again with different parameters — no code changes.</p>
      <p>Click <strong>&quot;Debug&quot;</strong> again → change all three parameters:</p>
      <CodeBlock>{`source_relative_url:  /~jburkardt/data/csv/grades.csv
destination_folder:   grades
file_name:            grades.csv`}</CodeBlock>
      <Screenshot caption="Debug dialog — all three parameters changed to grades values" />
      <p>Click <strong>&quot;OK&quot;</strong> → wait for green ✅</p>
      <Screenshot caption="Pipeline succeeded again — same pipeline, different parameters" />

      <CodeBlock>{`raw/external/
├── cities/
│   └── cities.csv   ✅  (from first run)
└── grades/
    └── grades.csv   ✅  (from second run)`}</CodeBlock>
      <Screenshot caption="raw/external/ — both cities and grades folders visible" />

      <Callout type="tip">
        This is the power of parameterized pipelines. One pipeline downloaded two completely different files from
        two different URLs into two different folders — zero changes to the pipeline itself.
      </Callout>

      <h3>Step 13 — Add a Second Copy Activity for Parallel Download</h3>
      <p>
        Right now you run the pipeline twice manually. In production you want both files in a single run.
        Let&apos;s redesign the pipeline to download both files <strong>simultaneously</strong>.
      </p>

      <p>First — update pipeline parameters to handle two files. Click empty canvas → <strong>Parameters</strong> tab → replace with 6 parameters:</p>
      <CodeBlock>{`file1_url:          /~jburkardt/data/csv/cities.csv
file1_folder:       cities
file1_name:         cities.csv
file2_url:          /~jburkardt/data/csv/grades.csv
file2_folder:       grades
file2_name:         grades.csv`}</CodeBlock>
      <Screenshot caption="Pipeline Parameters tab — six parameters, three for each file" />

      <p>Rename the existing Copy activity → General tab: <code>copy_file1_http_to_adls</code></p>
      <p>Update its Source dataset property:</p>
      <ExprBox expr="@pipeline().parameters.file1_url" label="relative_url" />
      <p>Update its Sink dataset properties:</p>
      <ExprBox expr="@pipeline().parameters.file1_folder" label="destination_folder" />
      <ExprBox expr="@pipeline().parameters.file1_name" label="file_name" />
      <Screenshot caption="First copy activity — Source showing file1_url parameter, Sink showing file1_folder and file1_name" />

      <p>Drag another <strong>&quot;Copy data&quot;</strong> onto the canvas — place it beside the first — <strong>do NOT connect them with an arrow</strong></p>
      <Screenshot caption="Canvas with TWO Copy activities side by side — no arrow connecting them, they run in parallel" />

      <Callout type="warning">
        <strong>No arrow = parallel.</strong> Activities without an arrow connecting them run at the same time.
        An arrow creates a dependency — meaning sequential execution. Do NOT connect them.
      </Callout>

      <p>Click the second Copy activity → General tab:</p>
      <CodeBlock>{`Name:        copy_file2_http_to_adls
Description: Downloads grades.csv from HTTP source`}</CodeBlock>

      <p><strong>Source tab</strong> → <code>ds_src_http_csv</code> → relative_url:</p>
      <ExprBox expr="@pipeline().parameters.file2_url" label="relative_url" />
      <Screenshot caption="Second Copy activity Source tab — file2_url parameter used" />

      <p><strong>Sink tab</strong> → <code>ds_sink_adls_external</code></p>
      <ExprBox expr="@pipeline().parameters.file2_folder" label="destination_folder" />
      <ExprBox expr="@pipeline().parameters.file2_name" label="file_name" />
      <Screenshot caption="Second Copy activity Sink tab — file2_folder and file2_name parameters used" />

      <h3>Step 14 — Debug the Parallel Pipeline and Publish</h3>
      <p>Click <strong>&quot;Validate&quot;</strong> → should pass with no errors</p>
      <Screenshot caption="Validation successful" />

      <p>Click <strong>&quot;Debug&quot;</strong> → all 6 parameters show their defaults → click <strong>&quot;OK&quot;</strong></p>
      <Screenshot caption="Debug dialog — all 6 parameters visible with default values pre-filled" />
      <Screenshot caption="Both copy activities running simultaneously — both showing yellow/spinning at the same time" />
      <Screenshot caption="Both activities completed — both showing green checkmarks" />

      <p>Both ran in parallel. Total time ≈ the slower activity, not the sum:</p>
      <CodeBlock>{`copy_file1_http_to_adls:  ~5 seconds
copy_file2_http_to_adls:  ~4 seconds
Total pipeline time:       ~5 seconds (parallel!)

If sequential:             ~9 seconds
Time saved:                ~4 seconds`}</CodeBlock>
      <Screenshot caption="Output tab — both activities showing individual durations, total pipeline duration is the max not the sum" />

      <CodeBlock>{`raw/external/
├── cities/
│   └── cities.csv   ✅
└── grades/
    └── grades.csv   ✅`}</CodeBlock>
      <Screenshot caption="raw/external/ folder — both cities and grades folders side by side" />

      <p>Click <strong>&quot;Publish all&quot;</strong></p>
      <CodeBlock>{`Publishing:
  pl_download_external_data   (new)
  ds_src_http_csv             (new)
  ds_sink_adls_external       (new)
  ls_http_public_data         (new)`}</CodeBlock>
      <Screenshot caption="Publish panel — all new items listed" />
      <Screenshot caption="Successfully published notification" />

      {/* Summary */}
      <h2>🎯 What You Built — Summary</h2>
      <CodeBlock>{`BEFORE:
  Analyst manually downloads file from browser every morning
  Uploads to Azure manually — 20 minutes per day
  If analyst is on leave — data is missing

AFTER:
  ADF fetches directly from URL — zero human involvement
  Two files downloaded in parallel in a single pipeline run
  Same pipeline handles any public CSV by changing parameters
  raw/external/ folder organized for all internet-sourced data`}</CodeBlock>

      <h3>Full ADF Resource Inventory After Project 04</h3>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              {['Resource Type', 'Name', 'Purpose'].map(h => (
                <th key={h} className="px-4 py-2 text-left font-mono text-xs" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resourceTable.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2 font-mono text-xs" style={{ color: 'var(--accent)' }}>{r.type}</td>
                <td className="px-4 py-2 font-mono text-xs" style={{ color: 'var(--text)' }}>{r.name}</td>
                <td className="px-4 py-2 text-xs" style={{ color: 'var(--text2)' }}>{r.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key concepts table */}
      <h2>🧠 Key Concepts to Remember</h2>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              {['Concept', 'What It Is', 'When You Use It'].map(h => (
                <th key={h} className="px-4 py-2 text-left font-mono text-xs" style={{ color: 'var(--muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {conceptsTable.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-2 font-mono text-xs" style={{ color: '#7b61ff' }}>{r.concept}</td>
                <td className="px-4 py-2 text-xs" style={{ color: 'var(--text2)' }}>{r.what}</td>
                <td className="px-4 py-2 text-xs" style={{ color: 'var(--text2)' }}>{r.when}</td>
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

      <KeyTakeaways items={[
        'The HTTP Linked Service stores only the base URL — the file path goes in the Dataset as a dynamic parameter',
        'Always verify public URLs work in your browser BEFORE building the ADF pipeline',
        'Anonymous authentication is used for public datasets — no login required',
        'Activities without an arrow between them run in parallel — no arrow needed, no configuration required',
        'Parallel pipeline time = the slowest activity, not the sum of all activities',
        'The external/ folder keeps internet-sourced data organized separately from internal store data',
        'One parameterized pipeline can download any file from any URL on the same server — just change the parameters',
      ]} />

      {/* What's next */}
      <h2>🚀 What&apos;s Coming in Project 05</h2>
      <p>
        So far our files land in ADLS with generic names like <code>cities.csv</code>. In production, you need
        to know <strong>when</strong> a file was downloaded — was it today&apos;s data or last week&apos;s?
      </p>
      <p>In <strong>Project 05</strong> you will learn to:</p>
      <ul>
        <li>Automatically add today&apos;s date to downloaded file names: <code>cities_20240115.csv</code></li>
        <li>Organize files into date folders automatically: <code>raw/external/cities/date=2024-01-15/</code></li>
        <li>Rename and move files after copying using the <strong>Get Metadata</strong> and <strong>Delete</strong> activities</li>
        <li>Combine everything from Projects 01–04 into one clean, organized pipeline</li>
      </ul>

    </LearnLayout>
  )
}
