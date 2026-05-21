<h1 align="center">
  <br>
  ⚡ Chaduvuko
  <br>
</h1>

<h3 align="center">Free, structured learning for data engineers and developers.</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ecf8e?style=flat-square&logo=supabase" />
  <img src="https://img.shields.io/badge/DuckDB-WebAssembly-f7c94b?style=flat-square" />
  <img src="https://img.shields.io/badge/Live-chaduvuko.com-0070f3?style=flat-square" />
</p>

<p align="center">
  Most learning platforms are either too expensive, too shallow, or just a pile of YouTube links.
  Chaduvuko is structured, free, and built by someone who went through the grind.
</p>

---

## What is Chaduvuko?

**Chaduvuko** (చదువుకో) means "study" in Telugu. It's a full-stack learning platform focused on practical, job-ready skills in data engineering, cloud, AI/ML, and software development.

No paywalls. No fluff. Just structured tracks that take you from zero to interview-ready.

Live at → **[chaduvuko.com](https://chaduvuko.com)**

---

## Learning Tracks

| Domain | Tracks |
|--------|--------|
| ☁️ Cloud | Azure (DP-900, AZ-900), AWS, GCP |
| 🗄️ Data | Data Engineering, SQL, DBMS |
| 🤖 AI/ML | Machine Learning, Deep Learning |
| 💻 Programming | Python, Java, JavaScript |
| 🌐 Web | React, Next.js, Node.js |
| 🔐 Systems | Networking, Cybersecurity, DSA |

**15+ tracks · 100+ hours of content · $0**

---

## Features

### 📚 Structured Learning Paths
Each track is broken into modules → lessons → exercises. No jumping around.

### 🏃 Interactive Playground
- **SQL Playground** — Run queries directly in the browser via DuckDB WebAssembly (zero backend needed)
- **Code Editor** — Monaco editor (same as VS Code) embedded in lessons

### 👤 Progress Tracking
- GitHub OAuth login via Supabase
- Lesson completion tracking
- Resume from where you left off across devices

### 🗺️ Roadmaps
Visual learning roadmaps for each career path — see the full journey before you start.

### 📝 Blog
Deep-dive articles on data engineering concepts, cloud certifications, and career advice.

### 🎯 Interview Prep
Curated question banks and topic walkthroughs for technical interviews.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + CSS Variables |
| Auth | Supabase (GitHub OAuth) |
| Database | Supabase Postgres |
| SQL Engine | DuckDB WebAssembly (browser-native) |
| Code Editor | Monaco Editor |
| 3D/Visuals | Three.js + React Three Fiber |
| Animations | Framer Motion |
| Content | MDX (Markdown + JSX components) |
| Deployment | Vercel |

---

## Project Structure

```
chaduvuko/
├── app/
│   ├── page.tsx              ← Landing page
│   ├── learn/
│   │   └── page.tsx          ← Learning hub (15+ track cards)
│   ├── playground/           ← Interactive SQL/code environment
│   ├── dashboard/            ← User progress dashboard
│   ├── blog/                 ← Articles
│   └── api/                  ← Route handlers
├── content/
│   ├── data-engineering/     ← ADF, Spark, Databricks, etc.
│   ├── networking/           ← TCP/IP, DNS, HTTP, protocols
│   ├── sql/                  ← Queries, joins, window functions
│   ├── ai-ml/                ← ML fundamentals
│   ├── cybersecurity/        ← Security concepts
│   └── dsa/                  ← Algorithms + data structures
├── components/               ← Reusable UI components
└── lib/                      ← Supabase client, helpers
```

---

## What Makes It Different

| Feature | Chaduvuko | Udemy | YouTube |
|---------|-----------|-------|---------|
| Free forever | ✅ | ❌ | ✅ |
| Structured paths | ✅ | ✅ | ❌ |
| In-browser SQL runner | ✅ | ❌ | ❌ |
| Progress tracking | ✅ | ✅ | ❌ |
| No ads | ✅ | ❌ | ❌ |
| Job-focused content | ✅ | Mixed | Mixed |

---

## Getting Started

```bash
git clone https://github.com/Asil143/chaduvuko.git
cd chaduvuko
npm install
```

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Contributing

Found a mistake? Want to add content for a track? PRs are welcome.

Each track lives in `content/<track-name>/` as `.tsx` MDX files. Follow the pattern of existing modules.

---

## License

MIT — free to use, fork, and learn from.

---

<p align="center">
  <strong>చదువుకో — Keep Learning.</strong>
</p>
