import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const htmlCssCheatSheet: TrackCheatSheet = {
  track: 'html-css',
  title: 'HTML & CSS',
  trackHref: '/learn/html-css',
  accent: '#e34c26',
  blurb: 'Semantic HTML, the box model, Flexbox, Grid, responsive design and modern CSS — the patterns you reach for on every page, on one sheet.',
  sections: [
    {
      title: 'Document & structure',
      entries: [
        { label: 'Page skeleton', code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport"\n        content="width=device-width, initial-scale=1">\n  <title>Page</title>\n</head>\n<body></body>\n</html>` },
        { label: 'Landmarks', code: `<header> <nav> <main> <article>\n<section> <aside> <footer>` },
        { label: 'Headings & text', code: `<h1>..<h6>   one <h1> per page\n<p> <strong> <em> <br> <hr>` },
      ],
    },
    {
      title: 'Links, images, lists',
      entries: [
        { label: 'Links', code: `<a href="/learn">internal</a>\n<a href="https://x.com"\n   target="_blank" rel="noopener noreferrer">ext</a>\n<a href="#section">in-page</a>` },
        { label: 'Image', code: `<img src="chart.png" width="800" height="450"\n     loading="lazy"\n     alt="Revenue rising Jan to Mar">` },
        { label: 'Lists', code: `<ul><li>item</li></ul>   unordered\n<ol><li>step</li></ol>   ordered` },
      ],
    },
    {
      title: 'Forms',
      entries: [
        { label: 'Input + label', code: `<label for="email">Email</label>\n<input id="email" name="email"\n       type="email" required>` },
        { label: 'Input types', code: `type="text" email tel number date\n       password search url checkbox radio` },
        { label: 'Select & textarea', code: `<select name="state">\n  <option value="WA">Washington</option>\n</select>\n<textarea name="note"></textarea>` },
      ],
    },
    {
      title: 'CSS basics',
      entries: [
        { label: 'Apply styles', code: `<link rel="stylesheet" href="styles.css">\n\nselector { property: value; }` },
        { label: 'Selectors', code: `.class   #id   element   *\na:hover   li:nth-child(odd)\nnav > a   (direct child)\n::before { content: ""; }` },
        { label: 'Specificity', code: `inline > #id > .class > element\n/* avoid !important */` },
      ],
    },
    {
      title: 'Box model & units',
      entries: [
        { label: 'Box model', code: `/* content → padding → border → margin */\n* { box-sizing: border-box; }\nmargin: 8px 16px;   padding: 1rem;` },
        { label: 'Units', code: `px   absolute\nrem  root font size (safe default)\nem   element font size\n%  vw  vh   relative to parent / viewport` },
        { label: 'Colours', code: `color: #1a1a1a;\nbackground: rgb(0 0 0 / 0.1);\ncolor: hsl(220 15% 20%);` },
      ],
    },
    {
      title: 'Flexbox',
      entries: [
        { label: 'Container', code: `display: flex;\nflex-direction: row | column;\njustify-content: space-between;\nalign-items: center;\ngap: 12px;\nflex-wrap: wrap;` },
        { label: 'Items', code: `flex: 1;          /* grow to fill */\nflex-shrink: 0;\nalign-self: flex-end;` },
        { label: 'Centre a box', code: `display: flex;\njustify-content: center;\nalign-items: center;\nmin-height: 100vh;` },
      ],
    },
    {
      title: 'Grid',
      entries: [
        { label: 'Columns', code: `display: grid;\ngrid-template-columns: 1fr 1fr 1fr;\ngap: 16px;` },
        { label: 'Responsive grid', code: `grid-template-columns:\n  repeat(auto-fill, minmax(220px, 1fr));` },
        { label: 'Named areas', code: `grid-template-areas:\n  "header header"\n  "nav    main";\n.nav { grid-area: nav; }` },
      ],
    },
    {
      title: 'Responsive',
      entries: [
        { label: 'Media query', code: `@media (min-width: 768px) {\n  .cols { grid-template-columns: 1fr 1fr; }\n}` },
        { label: 'Mobile-first', code: `/* base = phone */\n.nav { display: none; }\n@media (min-width: 768px) {\n  .nav { display: flex; }\n}` },
      ],
    },
    {
      title: 'Modern CSS',
      entries: [
        { label: 'Custom properties', code: `:root { --accent: #0a8c3e; --space: 16px; }\n.btn { color: var(--accent); }` },
        { label: 'Transition', code: `.card { transition: transform 200ms ease; }\n.card:hover { transform: translateY(-4px); }` },
        { label: 'New selectors', code: `.field:has(input:invalid) label { color: red; }\n:is(h1, h2, h3) { line-height: 1.2; }\n:where(ul, ol) { margin: 0; }` },
      ],
    },
    {
      title: 'Position & display',
      entries: [
        { label: 'Position', code: `position: relative | absolute | fixed | sticky;\ntop: 0; left: 0; z-index: 10;` },
        { label: 'Display', code: `display: block | inline | inline-block\n        | flex | grid | none;` },
        { label: 'Centre with transform', code: `position: absolute;\ntop: 50%; left: 50%;\ntransform: translate(-50%, -50%);` },
      ],
    },
  ],
  projects: [
    { title: 'Personal landing page', level: 'Beginner', build: 'A single semantic page about you: header, about, projects, contact form. No frameworks, mobile-first, one accent colour.', skills: ['semantic HTML', 'box model', 'responsive', 'forms'] },
    { title: 'Pricing page', level: 'Beginner', build: 'Three pricing cards of equal height that stack on phones and sit in a row on desktop, with a highlighted "popular" plan.', skills: ['Flexbox', 'media queries', 'custom properties'] },
    { title: 'Dashboard layout', level: 'Intermediate', build: 'A holy-grail layout — header, sidebar, main, footer — built with CSS Grid named areas that reflows to one column on phones.', skills: ['CSS Grid', 'grid-template-areas', 'responsive'] },
    { title: 'Image gallery', level: 'Intermediate', build: 'A responsive gallery with auto-fitting columns, a hover zoom, a lightbox using :target or a checkbox, and lazy-loaded images.', skills: ['Grid', 'transitions', 'responsive images'] },
    { title: 'Component library page', level: 'Advanced', build: 'A styled set of reusable components (buttons, cards, forms, alerts) with design tokens, dark mode via custom properties, and accessible focus states.', skills: ['custom properties', 'dark mode', 'accessibility', 'architecture'] },
  ],
}
