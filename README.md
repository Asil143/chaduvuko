# VedaEra — Data Engineering Learning Platform

Built with **Next.js 14 + TypeScript + Tailwind CSS + MDX + Framer Motion**

## 🚀 Tech Stack
- **Next.js 14** — App Router, SSR, SEO
- **TypeScript** — Type safety throughout
- **Tailwind CSS** — Utility-first styling
- **next-themes** — System-adaptive light/dark mode
- **Lucide React** — Icons
- **MDX** — Write tutorial content in Markdown files

## 📁 Project Structure

```
vedalera/
├── app/                        ← Next.js App Router pages
│   ├── page.tsx                ← Homepage
│   ├── layout.tsx              ← Root layout (Navbar + Footer)
│   └── learn/
│       ├── what-is-data-engineering/page.tsx
│       ├── roadmap/page.tsx
│       ├── foundations/
│       │   ├── sql/page.tsx
│       │   └── python/page.tsx
│       ├── azure/
│       │   ├── introduction/page.tsx
│       │   ├── adls-gen2/page.tsx
│       │   ├── adf/page.tsx
│       │   ├── databricks/page.tsx
│       │   └── synapse/page.tsx
│       ├── projects/page.tsx
│       └── interview/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          ← Responsive navbar with dropdown
│   │   ├── Footer.tsx          ← Footer with all links
│   │   └── ThemeProvider.tsx   ← next-themes wrapper
│   ├── ui/
│   │   └── ThemeToggle.tsx     ← Sun/Moon toggle button
│   └── content/
│       ├── LearnLayout.tsx     ← Shared layout for all tutorial pages
│       ├── Callout.tsx         ← Info/Tip/Warning/Example boxes
│       ├── CodeBlock.tsx       ← Code block with copy button
│       └── KeyTakeaways.tsx    ← Summary boxes
│
├── lib/
│   ├── utils.ts                ← cn() helper
│   └── content.ts              ← MDX file reading utilities
│
├── content/                    ← Edit tutorial content HERE
│   ├── foundations/
│   ├── azure/
│   ├── projects/
│   └── interview/
│
└── app/globals.css             ← CSS variables for light/dark theme
```

## ✏️ How to Update Content

**To edit a page:** go to `app/learn/[section]/page.tsx` and modify the text directly.

**To add a new page:** 
1. Create a new folder in `app/learn/your-topic/`
2. Create `page.tsx` inside it
3. Use `<LearnLayout>` component
4. Add the link to `components/content/LearnLayout.tsx` sidebar

## 🎨 Theme System

Two themes (light + dark) controlled by CSS custom properties in `app/globals.css`.
- Users can toggle with the Sun/Moon button in the navbar
- Default follows the system preference
- To change colors, edit the `:root` (light) and `.dark` (dark) blocks in `globals.css`

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 📦 Deploy to Vercel (Free)

1. Push this folder to GitHub
2. Go to vercel.com → Import your repo
3. Click Deploy → Done

Custom domain: Add your domain in Vercel Dashboard → Settings → Domains
