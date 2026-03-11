import { LearnLayout } from '@/components/content/LearnLayout'
import { Callout } from '@/components/content/Callout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'

export const metadata = { title: 'Project 06 — Pull Data From a REST API' }

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
        {result && <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>→ <span style={{ color: '#00e676' }}>{result}</span></p>}
      </div>
    </div>
  )
}

const expressionsTable = [
  { expr: '@{item().name}',     result: '"delhi", "mumbai", or "bangalore"',   desc: 'Read the "name" property from the current ForEach item' },
  { expr: '@{item().lat}',      result: '"28.6139", "19.0760", or "12.9716"',  desc: 'Read the "lat" property from the current ForEach item' },
  { expr: '@{item().lon}',      result: '"77.2090", "72.8777", or "77.5946"',  desc: 'Read the "lon" property from the current ForEach item' },
  { expr: "@formatDateTime(pipeline().parameters.run_date,'yyyyMMdd')", result: '"20240115"',  desc: 'Format run_date for use in the file name' },
  { expr: "@formatDateTime(trigger().scheduledTime,'yyyy-MM-dd')",      result: '"2024-01-15"', desc: 'Pass today\'s date from the trigger' },
]

const conceptsTable = [
  { concept: 'REST API',              what: 'A service you query with HTTP to get structured data',          why: 'Most real-world data sources are APIs, not files' },
  { concept: 'JSON',                  what: 'The format APIs use to return data',                            why: 'You need to read and store JSON in data engineering' },
  { concept: 'Query parameters',      what: 'Values after ? in a URL that customize the API response',      why: 'Control what data the API returns per city' },
  { concept: 'Object in array',       what: '{"name":"delhi","lat":"28.61"} — an item with properties',     why: 'Group related values together in ForEach items' },
  { concept: '@{item().property}',    what: 'Read one property from the current ForEach object',            why: 'Access name, lat, lon separately from one item' },
  { concept: 'Dot notation',          what: 'item().name reads the "name" field of the object',             why: 'Standard way to navigate JSON/objects in ADF' },
  { concept: 'JSON dataset format',   what: 'ADF dataset type for JSON files',                              why: 'Use this instead of DelimitedText for API responses' },
  { concept: 'Base URL + relative URL', what: 'Split between linked service and dataset',                   why: 'Base URL is the server, relative URL is the endpoint' },
]

const mistakesTable = [
  { mistake: 'Putting query parameters in the base URL', fix: 'Base URL must be only the domain: https://api.open-meteo.com — everything after including /v1/forecast?... goes in the relative URL dataset property.' },
  { mistake: 'Using @{item()} instead of @{item().lat} for object arrays', fix: '@{item()} gives the whole object: {"name":"delhi","lat":"28.61","lon":"77.20"}. Use @{item().lat} to get just the lat value. Symptom: URL becomes malformed.' },
  { mistake: 'Wrong format for cities array in parameter', fix: 'Must be valid JSON — property names in double quotes, no trailing commas. Wrong: [{name:\'delhi\'}]. Right: [{"name":"delhi","lat":"28.6139","lon":"77.2090"}].' },
  { mistake: 'Forgetting %2F in timezone URL parameter', fix: 'Asia/Kolkata has a slash that must be URL-encoded as %2F. Wrong: &timezone=Asia/Kolkata. Right: &timezone=Asia%2FKolkata. Symptom: API returns an error about invalid timezone.' },
  { mistake: 'Selecting wrong format (DelimitedText instead of JSON) for dataset', fix: 'ADF tries to parse the JSON response as CSV — output is empty or garbled. Delete the dataset, recreate it, and select JSON format.' },
]

const newItems = [
  { item: 'Linked Service', name: 'ls_http_openmeteo',          desc: 'HTTP connection to https://api.open-meteo.com, Anonymous auth' },
  { item: 'Dataset',        name: 'ds_src_http_weather_json',   desc: 'Source HTTP JSON dataset with relative_url parameter' },
  { item: 'Dataset',        name: 'ds_sink_adls_weather_json',  desc: 'Sink ADLS JSON dataset with date_folder and file_name parameters' },
  { item: 'Pipeline',       name: 'pl_ingest_weather_api',      desc: 'Set Variable → ForEach (3 cities) → Copy JSON to ADLS' },
  { item: 'Parameter',      name: 'run_date (String)',           desc: 'Date to process — controls folder and file names' },
  { item: 'Parameter',      name: 'cities (Array)',              desc: 'Array of objects with name, lat, lon for each city' },
  { item: 'Variable',       name: 'run_date_folder (String)',    desc: 'Computed folder name like date=2024-01-15' },
  { item: 'Trigger',        name: 'trigger_weather_6am',        desc: 'Fires every morning at 6 AM IST — passes today as run_date' },
]

export default function Project06Page() {
  return (
    <LearnLayout
      title="Project 06 — Pull Data From a REST API"
      description="Call a live weather API from ADF, receive JSON responses for three cities, save them to ADLS, and automate the pipeline to run every morning at 6 AM — no files, no uploads, pure API-driven ingestion."
      section="Projects"
      readTime="75–90 min"
      updatedAt="March 2026"
      breadcrumbs={[
        { label: 'Projects', href: '/learn/projects/azure-batch-pipeline' },
        { label: 'Project 06 — Pull Data From a REST API', href: '/learn/projects/azure-project-06' },
      ]}
      prev={{ title: 'Project 05 — Organize Files Automatically', href: '/learn/projects/azure-project-05' }}
    >

      {/* Series info */}
      <div className="not-prose mb-8 p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><span style={{ color: 'var(--muted)' }}>Series</span><br /><strong style={{ color: 'var(--text)' }}>Azure DE — Zero to Advanced</strong></div>
          <div><span style={{ color: 'var(--muted)' }}>Project</span><br /><strong style={{ color: 'var(--text)' }}>06 of 25</strong></div>
          <div><span style={{ color: 'var(--muted)' }}>Level</span><br /><strong style={{ color: '#ff9900' }}>Beginner+</strong></div>
          <div><span style={{ color: 'var(--muted)' }}>Time</span><br /><strong style={{ color: 'var(--text)' }}>75–90 min</strong></div>
        </div>
        <div className="mt-3 pt-3 text-sm" style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--text)' }}>Builds on:</strong> Projects 01–05 — same resource group, same storage account, same ADF
        </div>
      </div>

      {/* What you will build */}
      <div className="my-6 p-5 rounded-xl" style={{ background: 'var(--surface)', border: '2px solid var(--accent)', borderLeft: '4px solid var(--accent)' }}>
        <div className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>What you will build</div>
        <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
          A pipeline that calls a live REST API, receives a JSON response for each of FreshMart&apos;s three store cities, and saves the data to ADLS automatically every morning at 6 AM.
        </p>
      </div>

      {/* Real World Problem */}
      <h2>🏢 Real World Problem</h2>
      <p>
        FreshMart&apos;s category managers noticed something interesting. On rainy days, sales of umbrellas, instant
        noodles, and hot beverages spike. On hot summer days, ice cream, cold drinks, and fruits sell faster.
      </p>
      <p>
        The data team wants to <strong>combine sales data with weather data</strong> to help stores plan inventory
        better. If heavy rain is forecast for Delhi tomorrow, ST001 should stock more umbrellas tonight.
      </p>
      <p>But FreshMart has no weather data. They need to pull it from somewhere.</p>

      <div className="my-4 p-4 rounded-xl text-sm italic" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '3px solid var(--accent)' }}>
        <p style={{ color: 'var(--text2)' }}>
          <strong style={{ color: 'var(--text)' }}>Open-Meteo</strong> is a free, public weather API. Every day it
          provides temperature, rainfall, wind speed, and weather codes for any city in the world. No registration.
          No credit card. No API key.
        </p>
      </div>

      <CodeBlock label="FreshMart's 3 store cities">{`New Delhi    → lat=28.6139, lon=77.2090
Mumbai       → lat=19.0760, lon=72.8777
Bangalore    → lat=12.9716, lon=77.5946`}</CodeBlock>

      <p>We will build a pipeline that:</p>
      <ol>
        <li>Calls the Open-Meteo API for each city</li>
        <li>Receives weather data as JSON</li>
        <li>Saves each city&apos;s weather to ADLS</li>
        <li>Runs automatically every morning at 6 AM</li>
      </ol>

      {/* Architecture diagram */}
      <div className="my-6 p-5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>What we are building</div>
        <div className="font-mono text-xs space-y-1" style={{ color: 'var(--text2)', lineHeight: 1.9 }}>
          <p style={{ color: '#00c2ff' }}>Open-Meteo API → https://api.open-meteo.com</p>
          <p className="pl-2">ADF calls API 3 times (one per city):</p>
          <p className="pl-4" style={{ color: 'var(--muted)' }}>Call 1: ?latitude=28.6139&amp;longitude=77.2090  → Delhi weather JSON</p>
          <p className="pl-4" style={{ color: 'var(--muted)' }}>Call 2: ?latitude=19.0760&amp;longitude=72.8777  → Mumbai weather JSON</p>
          <p className="pl-4" style={{ color: 'var(--muted)' }}>Call 3: ?latitude=12.9716&amp;longitude=77.5946  → Bangalore weather JSON</p>
          <p className="mt-3">Each JSON saved to ADLS:</p>
          <p className="pl-2" style={{ color: '#00e676' }}>raw/weather/date=2024-01-15/</p>
          <p className="pl-4" style={{ color: 'var(--text2)' }}>├── weather_delhi_20240115.json</p>
          <p className="pl-4" style={{ color: 'var(--text2)' }}>├── weather_mumbai_20240115.json</p>
          <p className="pl-4" style={{ color: 'var(--text2)' }}>└── weather_bangalore_20240115.json</p>
        </div>
        <div className="mt-4 pt-4 text-xs" style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
          Pipeline: pl_ingest_weather_api · Trigger: every morning at 6 AM IST · 3 cities, 3 API calls, 3 JSON files
        </div>
      </div>

      {/* Step by step plan */}
      <div className="my-6 p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>Step by Step Plan</div>
        <div className="space-y-1 text-xs font-mono" style={{ color: 'var(--text2)', lineHeight: 2 }}>
          {[
            { part: 'PART 1', title: 'Test the API in browser', steps: 'Step 1', time: '10 min' },
            { part: 'PART 2', title: 'Create Linked Service', steps: 'Step 2', time: '10 min' },
            { part: 'PART 3', title: 'Create Datasets', steps: 'Steps 3–4', time: '15 min' },
            { part: 'PART 4', title: 'Build the Pipeline', steps: 'Steps 5–13', time: '40 min' },
            { part: 'PART 5', title: 'Add 6 AM Trigger', steps: 'Steps 14–15', time: '10 min' },
          ].map(r => (
            <div key={r.part} className="flex gap-4">
              <span className="w-16 flex-shrink-0" style={{ color: '#00e676' }}>{r.part}</span>
              <span className="flex-1">{r.title}</span>
              <span style={{ color: 'var(--muted)' }}>{r.steps}</span>
              <span className="w-14 text-right" style={{ color: 'var(--muted)' }}>{r.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONCEPTS ── */}
      <h2>🧠 Concepts You Must Understand First</h2>

      <h3>What is a REST API?</h3>
      <p>
        In Project 04 we used HTTP to <strong>download a file</strong> — like downloading a CSV from a website.
        The URL pointed directly to a file.
      </p>
      <p>
        A <strong>REST API</strong> is different. You do not download a file. Instead you <strong>ask a question</strong> and
        get a <strong>structured answer</strong>.
      </p>

      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid #ff9900' + '40' }}>
          <div className="text-xs font-mono font-bold mb-3" style={{ color: '#ff9900' }}>FILE DOWNLOAD (Project 04)</div>
          <ul className="space-y-1 text-xs" style={{ color: 'var(--text2)' }}>
            <li>URL points to a file</li>
            <li>Response IS the file</li>
            <li>Like downloading a PDF</li>
            <li>Same response every time</li>
            <li className="font-mono pt-1" style={{ color: 'var(--muted)' }}>GET /data/csv/cities.csv</li>
            <li className="font-mono" style={{ color: 'var(--muted)' }}>← returns the cities.csv file</li>
          </ul>
        </div>
        <div className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid #00e67640' }}>
          <div className="text-xs font-mono font-bold mb-3" style={{ color: '#00e676' }}>REST API (Project 06)</div>
          <ul className="space-y-1 text-xs" style={{ color: 'var(--text2)' }}>
            <li>URL is a question/request</li>
            <li>Response is structured data</li>
            <li>Like asking Google a question</li>
            <li>Response changes based on what you ask</li>
            <li className="font-mono pt-1" style={{ color: 'var(--muted)' }}>GET /v1/forecast?latitude=28.61</li>
            <li className="font-mono" style={{ color: 'var(--muted)' }}>← returns Delhi&apos;s temperature data</li>
          </ul>
        </div>
      </div>

      <p>Think of a REST API like a <strong>waiter at a restaurant</strong>:</p>
      <ul>
        <li>You (ADF) place an order (HTTP request) with specific details (parameters in the URL)</li>
        <li>The waiter (API) goes to the kitchen (server) and comes back with exactly what you asked for (JSON response)</li>
        <li>Different orders give different responses</li>
      </ul>

      <h3>What is JSON?</h3>
      <p>When you call a REST API, the response comes back as <strong>JSON</strong> — JavaScript Object Notation. It is the universal language APIs use to send data.</p>

      <CodeBlock label="Example JSON response from Open-Meteo">{`{
  "city": "New Delhi",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "daily": {
    "time": ["2024-01-15", "2024-01-16"],
    "temperature_2m_max": [22.5, 24.1],
    "precipitation_sum": [0.0, 2.3],
    "weathercode": [1, 61]
  }
}`}</CodeBlock>

      <CodeBlock label="Understanding JSON structure">{`{  }         → object (a thing with properties)
[ ]          → array (a list of items)
"key": value → a property with its value
"text"       → text value (always in double quotes)
22.5         → number value (no quotes)
true/false   → boolean value

In the example above:
  "city"      → text property    → "New Delhi"
  "latitude"  → number property  → 28.6139
  "daily"     → object           → contains arrays of values
  "time"      → array of dates   → ["2024-01-15", "2024-01-16", ...]`}</CodeBlock>

      <h3>What URL Do We Call?</h3>
      <p>The Open-Meteo API URL for Delhi looks like this:</p>

      <CodeBlock label="Delhi API URL — broken down">{`https://api.open-meteo.com/v1/forecast
  ?latitude=28.6139
  &longitude=77.2090
  &daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode
  &timezone=Asia/Kolkata
  &forecast_days=1

https://api.open-meteo.com   → base URL (goes in the Linked Service)
/v1/forecast                  → the specific API endpoint
?                             → starts the query parameters
latitude=28.6139              → first parameter (Delhi's latitude)
&longitude=77.2090            → second parameter (Delhi's longitude)
&daily=temperature_2m_max,... → which weather fields we want
&timezone=Asia/Kolkata        → time zone for the dates
&forecast_days=1              → only give me today's forecast`}</CodeBlock>

      <Callout type="info" label="💡 Base URL vs Relative URL">
        ADF splits the URL into two parts. The <strong>base URL</strong> (just the domain) lives in the Linked Service.
        The <strong>relative URL</strong> (the path and query parameters) goes in the dataset. This lets you reuse one
        linked service for many different API endpoints on the same server.
      </Callout>

      <h3>Object Arrays in ForEach — The Key New Concept</h3>
      <p>In Projects 02 and 03, the array contained simple strings:</p>
      <ExprBox expr='["ST001", "ST002", "ST003"]' label="Projects 02–03 — simple string array" />
      <p>This time each item is an <strong>object</strong> with three properties — name, lat, and lon:</p>
      <ExprBox expr='[{"name":"delhi","lat":"28.6139","lon":"77.2090"}, ...]' label="Project 06 — array of objects" />
      <p>
        This is because for each city we need three pieces of information — not just one. We pack all three into
        one object so the ForEach loop gets everything in one shot.
      </p>
      <p>Inside the ForEach you use <strong>dot notation</strong> to read individual properties:</p>
      <div className="my-4 space-y-2">
        {[
          { expr: '@{item()}',        result: '{"name":"delhi","lat":"28.6139","lon":"77.2090"}  — the whole object' },
          { expr: '@{item().name}',   result: '"delhi"  — just the city name' },
          { expr: '@{item().lat}',    result: '"28.6139"  — just the latitude' },
          { expr: '@{item().lon}',    result: '"77.2090"  — just the longitude' },
        ].map(e => (
          <div key={e.expr} className="p-3 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <code className="text-xs" style={{ color: '#7b61ff' }}>{e.expr}</code>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>→ <span style={{ color: '#00e676' }}>{e.result}</span></p>
          </div>
        ))}
      </div>

      {/* ── PART 1 ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest" style={{ background: '#00c2ff15', color: '#00c2ff' }}>
        PART 1 — Test the API in Browser
      </div>

      <h2>Step 1 — Open the API URL and See the Response</h2>
      <p>Before building anything, always test your API in the browser first.</p>
      <p>Open your browser and paste this URL exactly:</p>

      <CodeBlock>{`https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=Asia%2FKolkata&forecast_days=1`}</CodeBlock>

      <p>Your browser will show a JSON response similar to this:</p>

      <CodeBlock label="Expected response — Delhi weather">{`{
  "latitude": 28.625,
  "longitude": 77.1875,
  "timezone": "Asia/Kolkata",
  "timezone_abbreviation": "IST",
  "elevation": 216.0,
  "daily_units": {
    "time": "iso8601",
    "temperature_2m_max": "°C",
    "temperature_2m_min": "°C",
    "precipitation_sum": "mm",
    "weathercode": "wmo code"
  },
  "daily": {
    "time": ["2024-01-15"],
    "temperature_2m_max": [22.3],
    "temperature_2m_min": [9.1],
    "precipitation_sum": [0.0],
    "weathercode": [1]
  }
}`}</CodeBlock>

      <Screenshot caption="Browser showing the raw JSON response from Open-Meteo API — JSON text visible in the browser window" />

      <Callout type="tip" label="✅ If you see JSON data — the API is working">
        The browser is doing the same thing ADF will do: sending an HTTP GET request to the URL and receiving a JSON response.
      </Callout>

      <p>Now test for Mumbai:</p>
      <CodeBlock>{`https://api.open-meteo.com/v1/forecast?latitude=19.0760&longitude=72.8777&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=Asia%2FKolkata&forecast_days=1`}</CodeBlock>

      <Screenshot caption="Browser showing Mumbai weather JSON response — different temperature values than Delhi, confirming the API returns different data per location" />

      <p><strong>What does <code>weathercode</code> mean?</strong> Open-Meteo uses standard WMO weather codes:</p>
      <CodeBlock>{`0   → Clear sky
1   → Mainly clear
2   → Partly cloudy
3   → Overcast
51  → Light drizzle
61  → Slight rain
71  → Slight snowfall
95  → Thunderstorm`}</CodeBlock>

      {/* ── PART 2 ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest" style={{ background: '#00c2ff15', color: '#00c2ff' }}>
        PART 2 — Create Linked Service
      </div>

      <h2>Step 2 — Create HTTP Linked Service for Open-Meteo</h2>
      <p>
        In Project 04 we created <code>ls_http_public_data</code> pointing to <code>https://people.sc.fsu.edu</code>.
        Open-Meteo is a different server with a different base URL — we need a new linked service for it.
      </p>

      <p>In ADF Studio → <strong>Manage</strong> → <strong>Linked services</strong> → <strong>&quot;+ New&quot;</strong></p>
      <p>Search <strong>&quot;HTTP&quot;</strong> → select <strong>HTTP</strong> → <strong>Continue</strong></p>

      <Screenshot caption="New linked service — HTTP selected in the search results" />

      <p>Fill in:</p>
      <CodeBlock>{`Name:                    ls_http_openmeteo
Description:             Connection to Open-Meteo free weather API
Connect via:             AutoResolveIntegrationRuntime
Base URL:                https://api.open-meteo.com
Authentication type:     Anonymous`}</CodeBlock>

      <Screenshot caption="HTTP linked service form — name ls_http_openmeteo, Base URL https://api.open-meteo.com, Anonymous authentication" />

      <p>Click <strong>&quot;Test connection&quot;</strong></p>
      <Screenshot caption="Green 'Connection successful' message for ls_http_openmeteo" />

      <p>Click <strong>&quot;Create&quot;</strong></p>
      <Screenshot caption="Linked services list — ls_http_openmeteo visible alongside previous linked services" />

      {/* ── PART 3 ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest" style={{ background: '#00c2ff15', color: '#00c2ff' }}>
        PART 3 — Create Datasets
      </div>

      <h2>Step 3 — Source Dataset (HTTP → JSON)</h2>
      <p>
        In Project 04 we used <code>DelimitedText</code> (CSV) as the format for our HTTP dataset. This time the
        API returns <strong>JSON</strong>, so we pick <strong>JSON</strong> as the format.
      </p>

      <p><strong>Author</strong> → <strong>Datasets</strong> → <strong>&quot;+&quot;</strong> → <strong>&quot;New dataset&quot;</strong></p>
      <p>Search <strong>&quot;HTTP&quot;</strong> → select <strong>HTTP</strong> → <strong>Continue</strong></p>
      <p>For format — select <strong>&quot;JSON&quot;</strong> → <strong>Continue</strong></p>

      <Screenshot caption="Format selection step — JSON selected, not DelimitedText" />

      <CodeBlock>{`Name:            ds_src_http_weather_json
Linked service:  ls_http_openmeteo
Relative URL:    (leave empty — will be dynamic)
Request method:  GET`}</CodeBlock>

      <p>Click <strong>&quot;OK&quot;</strong></p>

      <p>Click <strong>&quot;Parameters&quot;</strong> tab → <strong>&quot;+ New&quot;</strong></p>
      <CodeBlock>{`Name:    relative_url
Type:    String`}</CodeBlock>

      <Screenshot caption="Dataset Parameters tab — relative_url parameter added" />

      <p>Click <strong>&quot;Connection&quot;</strong> tab</p>
      <p><strong>Relative URL</strong> → <strong>&quot;Add dynamic content&quot;</strong> → click <code>relative_url</code> under Parameters:</p>
      <ExprBox expr="@dataset().relative_url" />

      <Screenshot caption="Connection tab — Relative URL showing @dataset().relative_url" />

      <p>Click <strong>💾 Save</strong></p>

      <h2>Step 4 — Sink Dataset (ADLS → JSON)</h2>
      <p><strong>Datasets</strong> → <strong>&quot;+&quot;</strong> → <strong>&quot;New dataset&quot;</strong></p>
      <p>Search <strong>&quot;Azure Data Lake Storage Gen2&quot;</strong> → select → <strong>Continue</strong></p>
      <p>For format — select <strong>&quot;JSON&quot;</strong> → <strong>Continue</strong></p>

      <Screenshot caption="Format selection — JSON selected for ADLS sink dataset" />

      <CodeBlock>{`Name:            ds_sink_adls_weather_json
Linked service:  ls_adls_freshmart
File path:       (leave all empty)
Import schema:   None`}</CodeBlock>

      <p>Click <strong>&quot;OK&quot;</strong></p>

      <p>Click <strong>&quot;Parameters&quot;</strong> tab → add TWO parameters:</p>
      <CodeBlock>{`Parameter 1:
  Name:    date_folder
  Type:    String

Parameter 2:
  Name:    file_name
  Type:    String`}</CodeBlock>

      <Screenshot caption="Sink dataset Parameters tab — date_folder and file_name parameters both added" />

      <p>Click <strong>&quot;Connection&quot;</strong> tab:</p>
      <p><strong>Container:</strong> <code>raw</code></p>
      <p><strong>Directory</strong> → <strong>&quot;Add dynamic content&quot;</strong>:</p>
      <ExprBox expr="weather/@{dataset().date_folder}" />

      <p><strong>File</strong> → <strong>&quot;Add dynamic content&quot;</strong>:</p>
      <ExprBox expr="@dataset().file_name" />

      <Screenshot caption="Sink dataset Connection tab — Container: raw, Directory: weather/@{dataset().date_folder}, File: @dataset().file_name" />

      <p>Click <strong>💾 Save</strong></p>

      {/* ── PART 4 ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest" style={{ background: '#00c2ff15', color: '#00c2ff' }}>
        PART 4 — Build the Pipeline
      </div>

      <h2>Step 5 — Create New Pipeline</h2>
      <p><strong>Author</strong> → <strong>&quot;+&quot;</strong> next to Pipelines → <strong>&quot;New pipeline&quot;</strong></p>
      <CodeBlock>{`Name:        pl_ingest_weather_api
Description: Calls Open-Meteo API for each city and saves JSON to ADLS raw/weather/`}</CodeBlock>

      <Screenshot caption="Blank pipeline canvas — name pl_ingest_weather_api in Properties panel" />

      <h2>Step 6 — Add Parameters</h2>
      <p>Click <strong>blank canvas</strong> → <strong>&quot;Parameters&quot;</strong> tab → add parameters:</p>

      <CodeBlock>{`Parameter 1:
  Name:    run_date
  Type:    String
  Default: 2024-01-15

Parameter 2:
  Name:    cities
  Type:    Array
  Default: [
    {"name":"delhi","lat":"28.6139","lon":"77.2090"},
    {"name":"mumbai","lat":"19.0760","lon":"72.8777"},
    {"name":"bangalore","lat":"12.9716","lon":"77.5946"}
  ]`}</CodeBlock>

      <Screenshot caption="Pipeline Parameters tab — run_date and cities parameters visible" />

      <Callout type="info" label="💡 Why is each city an object instead of a plain string?">
        In Projects 02 and 03 we only needed one value per item (the store ID). Here we need three values per city —
        name, lat, and lon. Packing them into an object <code>{`{"name":"delhi","lat":"28.6139","lon":"77.2090"}`}</code> means
        the ForEach gets everything it needs in a single item, and we read each value with dot notation:
        <code>item().name</code>, <code>item().lat</code>, <code>item().lon</code>.
      </Callout>

      <h2>Step 7 — Add Variable + Set Variable Activity</h2>
      <p>Click <strong>blank canvas</strong> → <strong>&quot;Variables&quot;</strong> tab → <strong>&quot;+ New&quot;</strong></p>
      <CodeBlock>{`Name:    run_date_folder
Type:    String`}</CodeBlock>

      <Screenshot caption="Variables tab — run_date_folder variable added" />

      <p>From left panel → <strong>&quot;General&quot;</strong> → drag <strong>&quot;Set variable&quot;</strong> onto canvas</p>
      <p>Click it → bottom panel:</p>
      <CodeBlock>{`General tab:
  Name:  set_run_date_folder

Variables tab:
  Name:   run_date_folder
  Value:  (click "Add dynamic content")`}</CodeBlock>

      <p>In the dynamic content editor, type:</p>
      <ExprBox expr="date=@{pipeline().parameters.run_date}" result="date=2024-01-15" />

      <Screenshot caption="Set variable activity — value showing date=@{pipeline().parameters.run_date}" />

      <h2>Step 8 — Add ForEach Activity</h2>
      <p>From left panel → <strong>&quot;Iteration &amp; conditionals&quot;</strong> → drag <strong>&quot;ForEach&quot;</strong> onto canvas</p>
      <p>Connect: drag green arrow from <code>set_run_date_folder</code> → <strong>ForEach</strong></p>

      <Screenshot caption="Canvas — set_run_date_folder connected to ForEach with green arrow" />

      <p>Click ForEach → bottom panel:</p>
      <CodeBlock>{`General tab:
  Name:  ForEach_cities

Settings tab:
  Sequential:   ☐ Unchecked  (run all 3 cities in parallel)
  Batch count:  3
  Items:        (click "Add dynamic content")`}</CodeBlock>

      <p>Items value → click <code>cities</code> under Parameters:</p>
      <ExprBox expr="@pipeline().parameters.cities" />

      <Screenshot caption="ForEach Settings tab — Items showing @pipeline().parameters.cities, batch count 3, Sequential unchecked" />

      <h2>Step 9 — Add Copy Activity Inside ForEach</h2>
      <p>Click the <strong>&quot;+&quot; button INSIDE the ForEach box</strong></p>

      <Screenshot caption="ForEach activity — '+' button inside highlighted" />

      <p>You are on the inner canvas. Drag <strong>&quot;Copy data&quot;</strong> from the left panel onto the inner canvas.</p>
      <CodeBlock>{`General tab:
  Name:  copy_weather_json_to_adls`}</CodeBlock>

      <Screenshot caption="Copy data activity on ForEach inner canvas — named copy_weather_json_to_adls" />

      <h2>Step 10 — Configure Source</h2>
      <p>Click <strong>&quot;Source&quot;</strong> tab</p>
      <CodeBlock>{`Source dataset:  ds_src_http_weather_json`}</CodeBlock>

      <p>Dataset property <code>relative_url</code> appears → click <strong>&quot;Add dynamic content&quot;</strong></p>
      <p>Build the full API query URL for each city:</p>

      <ExprBox
        label="relative_url — builds a different URL for each city"
        expr="/v1/forecast?latitude=@{item().lat}&longitude=@{item().lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=Asia%2FKolkata&forecast_days=1"
      />

      <Screenshot caption="Dynamic content editor — the full API query URL expression with @{item().lat} and @{item().lon}" />

      <p>Click <strong>&quot;OK&quot;</strong></p>

      <p>What does this build for each city?</p>
      <CodeBlock label="When item() = {name:'delhi', lat:'28.6139', lon:'77.2090'}">{`/v1/forecast
  ?latitude=28.6139
  &longitude=77.2090
  &daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode
  &timezone=Asia%2FKolkata
  &forecast_days=1

ADF joins this with the base URL from the linked service:
→ https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090...

That is exactly the Delhi weather URL we tested in the browser! ✅

Next iteration (Mumbai): @{item().lat} → 19.0760, @{item().lon} → 72.8777
→ https://api.open-meteo.com/v1/forecast?latitude=19.0760&longitude=72.8777...`}</CodeBlock>

      <Screenshot caption="Source tab complete — relative_url dataset property showing the full API query expression" />

      <h2>Step 11 — Configure Sink</h2>
      <p>Click <strong>&quot;Sink&quot;</strong> tab</p>
      <CodeBlock>{`Sink dataset:  ds_sink_adls_weather_json`}</CodeBlock>

      <p>Dataset property <code>date_folder</code> → <strong>&quot;Add dynamic content&quot;</strong> → click <code>run_date_folder</code> under Variables:</p>
      <ExprBox expr="@variables('run_date_folder')" result="date=2024-01-15" />

      <p>Dataset property <code>file_name</code> → <strong>&quot;Add dynamic content&quot;</strong>:</p>
      <ExprBox
        label="file_name — builds a unique file name for each city"
        expr="weather_@{item().name}_@{formatDateTime(pipeline().parameters.run_date,'yyyyMMdd')}.json"
      />

      <p>What file name does this build?</p>
      <CodeBlock>{`weather_          → literal "weather_"
@{item().name}    → city name → "delhi"
_                 → literal "_"
@{formatDateTime(...,'yyyyMMdd')} → "20240115"
.json             → literal ".json"

Delhi:     weather_delhi_20240115.json     ✅
Mumbai:    weather_mumbai_20240115.json    ✅
Bangalore: weather_bangalore_20240115.json ✅`}</CodeBlock>

      <Screenshot caption="Sink tab — date_folder showing @variables('run_date_folder'), file_name showing weather_@{item().name}_ expression" />

      <p>Go back to the main canvas using the back arrow.</p>

      <Screenshot caption="Main canvas — set_run_date_folder → ForEach_cities, two activities connected with green arrow" />

      <h2>Step 12 — Validate and Debug</h2>
      <p>Click <strong>&quot;Validate&quot;</strong></p>
      <Screenshot caption="Validation successful — no errors" />

      <p>Click <strong>&quot;Debug&quot;</strong></p>
      <p>Parameters dialog:</p>
      <CodeBlock>{`run_date:  2024-01-15
cities:    [{"name":"delhi","lat":"28.6139","lon":"77.2090"},{"name":"mumbai","lat":"19.0760","lon":"72.8777"},{"name":"bangalore","lat":"12.9716","lon":"77.5946"}]`}</CodeBlock>

      <Screenshot caption="Debug dialog — run_date and cities array pre-filled with defaults from the pipeline parameters" />

      <p>Click <strong>&quot;OK&quot;</strong></p>
      <p>Watch the pipeline:</p>
      <ol>
        <li><code>set_run_date_folder</code> → green ✅</li>
        <li><code>ForEach_cities</code> → 3 iterations run in parallel</li>
      </ol>

      <Screenshot caption="Pipeline running — set_run_date_folder green, ForEach running with 3 cities in progress" />
      <Screenshot caption="Pipeline complete — both activities showing green checkmarks" />

      <p>Click the <strong>👓 glasses icon</strong> on the ForEach run:</p>
      <Screenshot caption="ForEach iteration details — 3 rows for delhi, mumbai, bangalore — all Succeeded" />

      <h2>Step 13 — Verify JSON Files in ADLS</h2>
      <p>Azure Portal → Storage → <code>stfreshmartdev</code> → Containers → <strong>raw</strong></p>
      <p>You should now see a new <code>weather</code> folder alongside <code>sales</code> and <code>external</code>:</p>

      <CodeBlock>{`raw/
├── sales/      ← Projects 01–03
├── external/   ← Project 04
└── weather/    ← NEW — Project 06
    └── date=2024-01-15/
        ├── weather_delhi_20240115.json
        ├── weather_mumbai_20240115.json
        └── weather_bangalore_20240115.json`}</CodeBlock>

      <Screenshot caption="raw container — three folders visible: sales, external, weather" />
      <Screenshot caption="raw/weather/date=2024-01-15/ — three JSON files for Delhi, Mumbai, Bangalore" />

      <p>Click on <strong>weather_delhi_20240115.json</strong> → click <strong>&quot;Edit&quot;</strong></p>
      <p>You should see the raw JSON from the API saved exactly as-is:</p>

      <CodeBlock label="weather_delhi_20240115.json — content saved in ADLS">{`{
  "latitude": 28.625,
  "longitude": 77.1875,
  "daily": {
    "time": ["2024-01-15"],
    "temperature_2m_max": [22.3],
    "temperature_2m_min": [9.1],
    "precipitation_sum": [0.0],
    "weathercode": [1]
  }
}`}</CodeBlock>

      <Screenshot caption="weather_delhi_20240115.json file open in Azure Portal — raw JSON content visible" />
      <Screenshot caption="weather_mumbai_20240115.json — different temperature values confirming it's a separate API call" />

      <Callout type="tip" label="✅ 3 API calls, 3 JSON responses, 3 separate files">
        The pipeline called the Open-Meteo API three times with different lat/lon values and saved three separate JSON files to ADLS — one per city.
      </Callout>

      {/* ── PART 5 ── */}
      <div className="mt-10 mb-2 px-4 py-2 rounded-lg inline-block text-xs font-mono font-bold uppercase tracking-widest" style={{ background: '#00c2ff15', color: '#00c2ff' }}>
        PART 5 — Add the 6 AM Trigger
      </div>

      <h2>Step 14 — Create Schedule Trigger</h2>
      <p>On the pipeline canvas → <strong>&quot;Add trigger&quot;</strong> → <strong>&quot;New/Edit&quot;</strong> → <strong>&quot;+ New&quot;</strong></p>

      <CodeBlock>{`Name:        trigger_weather_6am
Description: Pulls weather data every morning at 6 AM IST before store opening
Type:        Schedule
Start date:  today
Time zone:   India Standard Time
Repeat:      Every 1 Day
At time:     06:00`}</CodeBlock>

      <Screenshot caption="New trigger form — trigger_weather_6am, Schedule type, 06:00 IST, daily repeat" />

      <p>Click <strong>&quot;OK&quot;</strong></p>
      <p><strong>Trigger Run Parameters dialog:</strong></p>
      <p>For <code>run_date</code>:</p>
      <ExprBox expr="@formatDateTime(trigger().scheduledTime,'yyyy-MM-dd')" result="The date the trigger fires — e.g. 2024-01-15" />

      <p>For <code>cities</code>:</p>
      <ExprBox expr='[{"name":"delhi","lat":"28.6139","lon":"77.2090"},{"name":"mumbai","lat":"19.0760","lon":"72.8777"},{"name":"bangalore","lat":"12.9716","lon":"77.5946"}]' />

      <Screenshot caption="Trigger Run Parameters — run_date showing formatDateTime expression, cities showing the JSON array" />

      <Callout type="info" label="💡 Why 6 AM instead of midnight?">
        The sales pipeline runs at midnight copying yesterday&apos;s data. Weather data is more useful when it is fresh —
        today&apos;s forecast pulled in the morning before stores open. By 7 AM, the data team has both yesterday&apos;s sales
        AND today&apos;s weather in ADLS ready for analysis.
      </Callout>

      <p>Click <strong>&quot;OK&quot;</strong></p>

      <h2>Step 15 — Publish</h2>
      <p>Click <strong>&quot;Publish all&quot;</strong></p>
      <p>Items being published:</p>
      <CodeBlock>{`pl_ingest_weather_api
ds_src_http_weather_json
ds_sink_adls_weather_json
ls_http_openmeteo
trigger_weather_6am`}</CodeBlock>

      <Screenshot caption="Publish panel — all 5 new items listed" />

      <p>Click <strong>&quot;Publish&quot;</strong></p>
      <Screenshot caption="Successfully published notification" />

      <p>Check the trigger is active: <strong>Monitor</strong> → <strong>Trigger runs</strong></p>
      <Screenshot caption="Monitor Trigger runs — trigger_weather_6am showing Active, next run time showing tomorrow 6:00 AM" />

      {/* What you built summary */}
      <h2>What You Built — Summary</h2>

      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid #ff6b6b30' }}>
          <div className="text-xs font-mono font-bold mb-3" style={{ color: '#ff6b6b' }}>Before Project 06</div>
          <ul className="space-y-1 text-xs" style={{ color: 'var(--text2)' }}>
            <li>FreshMart had no weather data</li>
            <li>No way to link sales patterns to weather</li>
            <li>Analyst would visit a weather website manually</li>
          </ul>
        </div>
        <div className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid #00e67630' }}>
          <div className="text-xs font-mono font-bold mb-3" style={{ color: '#00e676' }}>After Project 06</div>
          <ul className="space-y-1 text-xs" style={{ color: 'var(--text2)' }}>
            <li>Weather API called at 6 AM every morning</li>
            <li>3 cities, 3 JSON files, landed in ADLS with date folders</li>
            <li>Data team can JOIN sales data with weather data</li>
            <li>Zero manual work — completely automated</li>
          </ul>
        </div>
      </div>

      <p>The ADLS raw layer now looks like this after Projects 01–06:</p>
      <CodeBlock>{`raw/
├── sales/                          ← store transaction data (Projects 01–03)
│   └── date=YYYY-MM-DD/
│       └── store_STXXX_sales_YYYYMMDD.csv
│
├── external/                       ← files downloaded from internet (Project 04)
│   ├── cities/
│   └── grades/
│
└── weather/                        ← REST API data (Project 06)
    └── date=YYYY-MM-DD/
        ├── weather_delhi_YYYYMMDD.json
        ├── weather_mumbai_YYYYMMDD.json
        └── weather_bangalore_YYYYMMDD.json`}</CodeBlock>

      {/* What was built */}
      <h2>Everything You Created</h2>
      <div className="my-4 overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              <th className="text-left px-4 py-3 font-mono" style={{ color: 'var(--muted)' }}>Type</th>
              <th className="text-left px-4 py-3 font-mono" style={{ color: 'var(--muted)' }}>Name</th>
              <th className="text-left px-4 py-3 font-mono" style={{ color: 'var(--muted)' }}>What it does</th>
            </tr>
          </thead>
          <tbody>
            {newItems.map((r, i) => (
              <tr key={r.name} style={{ borderTop: i > 0 ? '1px solid var(--border)' : undefined, background: i % 2 === 0 ? 'var(--bg2)' : undefined }}>
                <td className="px-4 py-3 font-mono" style={{ color: '#00c2ff' }}>{r.item}</td>
                <td className="px-4 py-3 font-mono font-semibold" style={{ color: 'var(--text)' }}>{r.name}</td>
                <td className="px-4 py-3" style={{ color: 'var(--text2)' }}>{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key expressions */}
      <h2>Key Expressions in This Project</h2>
      <div className="my-4 space-y-2">
        {expressionsTable.map(e => (
          <div key={e.expr} className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="text-xs font-mono mb-1" style={{ color: 'var(--muted)' }}>{e.desc}</div>
            <code className="text-xs" style={{ color: '#7b61ff' }}>{e.expr}</code>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>→ <span style={{ color: '#00e676' }}>{e.result}</span></p>
          </div>
        ))}
      </div>

      {/* Key concepts table */}
      <h2>🧠 Key Concepts to Remember</h2>
      <div className="my-4 overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              <th className="text-left px-4 py-3 font-mono" style={{ color: 'var(--muted)' }}>Concept</th>
              <th className="text-left px-4 py-3 font-mono" style={{ color: 'var(--muted)' }}>What It Is</th>
              <th className="text-left px-4 py-3 font-mono" style={{ color: 'var(--muted)' }}>Why It Matters</th>
            </tr>
          </thead>
          <tbody>
            {conceptsTable.map((r, i) => (
              <tr key={r.concept} style={{ borderTop: i > 0 ? '1px solid var(--border)' : undefined, background: i % 2 === 0 ? 'var(--bg2)' : undefined }}>
                <td className="px-4 py-3 font-mono font-semibold" style={{ color: '#7b61ff' }}>{r.concept}</td>
                <td className="px-4 py-3" style={{ color: 'var(--text2)' }}>{r.what}</td>
                <td className="px-4 py-3" style={{ color: 'var(--text2)' }}>{r.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Common mistakes */}
      <h2>⚠️ Common Mistakes in This Project</h2>
      <div className="my-4 space-y-3">
        {mistakesTable.map((m, i) => (
          <div key={i} className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid #ff6b6b30' }}>
            <div className="text-xs font-mono font-bold mb-2" style={{ color: '#ff6b6b' }}>❌ {m.mistake}</div>
            <p className="text-xs" style={{ color: 'var(--text2)' }}><strong style={{ color: '#00e676' }}>Fix: </strong>{m.fix}</p>
          </div>
        ))}
      </div>

      {/* What's coming */}
      <div className="my-8 p-5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>🚀 What&apos;s Coming in Project 07</div>
        <p className="text-sm mb-3" style={{ color: 'var(--text2)' }}>
          We now have data coming from three sources — store sales CSVs, public file downloads, and a weather REST
          API. All raw data is landing in ADLS.
        </p>
        <p className="text-sm mb-3" style={{ color: 'var(--text2)' }}>
          But all of it is raw and messy: inconsistent column names, null values, negative amounts, dates stored as
          text. In <strong style={{ color: 'var(--text)' }}>Project 07</strong> we connect Azure Databricks for the
          first time and write a Python notebook to clean, validate, and transform the raw sales data from Bronze into
          a clean Silver layer. Output is Parquet — the industry standard format for analytics.
        </p>
        <p className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
          First time writing actual Python/PySpark code — every concept explained from zero.
        </p>
      </div>

      <KeyTakeaways items={[
        'REST APIs return structured JSON data — you query them with a URL instead of downloading a file',
        'The cities array uses objects {"name":"delhi","lat":"28.61","lon":"77.20"} so one ForEach item carries all three values',
        'Use @{item().property} to read individual fields from an object — dot notation works the same as in JavaScript',
        'Base URL lives in the Linked Service, the relative URL and query parameters go in the dataset',
        'Always test your API in the browser before building the ADF pipeline',
        'The trigger uses @formatDateTime(trigger().scheduledTime,\'yyyy-MM-dd\') to pass today\'s date automatically',
      ]} />

    </LearnLayout>
  )
}
