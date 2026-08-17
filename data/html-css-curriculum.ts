// ─────────────────────────────────────────────────────────────────────────────
// HTML & CSS curriculum — shared source of truth for the track listing page and
// the per-lesson HtmlCssSectionNav. Mirrors data/python-curriculum.ts's shape.
// ─────────────────────────────────────────────────────────────────────────────

export type HtmlCssModuleStatus = 'live' | 'soon'

export interface HtmlCssModule {
  id: number
  slug: string
  title: string
  description: string
  tags: string[]
  status: HtmlCssModuleStatus
  readTime: string
  xp: number
}

export interface HtmlCssSection {
  id: number
  title: string
  color: string
  modules: HtmlCssModule[]
}

export const HTML_CSS_CURRICULUM: HtmlCssSection[] = [
  {
    id: 1, title: 'HTML Foundations', color: '#00e676',
    modules: [
      { id: 1, slug: 'what-is-html-how-the-web-works', title: 'What is HTML? How the Web Actually Works', description: 'Browsers, servers, the DOM, and the HTTP request/response cycle — the foundation every web page sits on, explained from first principles.', tags: ['HTML basics', 'Browsers & servers', 'The DOM', 'HTTP requests', 'How pages load'], status: 'live', readTime: '40 min', xp: 150 },
      { id: 2, slug: 'document-structure', title: 'Document Structure — DOCTYPE, html, head, body', description: 'Every HTML document follows the same skeleton. What each part actually does, and the mistakes that silently break rendering.', tags: ['DOCTYPE', 'html/head/body', 'Character encoding', 'Document skeleton'], status: 'live', readTime: '30 min', xp: 100 },
      { id: 3, slug: 'text-semantic-structure', title: 'Text Elements & Semantic Structure', description: 'Headings, paragraphs, and the semantic tags — header, nav, main, section, article, aside, footer — that give a page real meaning.', tags: ['Headings', 'Paragraphs', 'Semantic tags', 'header/nav/main', 'Document outline'], status: 'live', readTime: '40 min', xp: 150 },
      { id: 4, slug: 'links-navigation', title: 'Links and Navigation', description: 'The anchor tag in full — relative vs absolute paths, targets, anchor links within a page, and building real navigation.', tags: ['a tag', 'href', 'Relative vs absolute', 'target', 'Anchor links'], status: 'live', readTime: '35 min', xp: 100 },
      { id: 5, slug: 'images-media', title: 'Images and Media', description: 'img, alt text, figure/figcaption, audio, video, and the source element — plus lazy loading and why alt text is never optional.', tags: ['img & alt', 'figure/figcaption', 'audio/video', 'source', 'Lazy loading'], status: 'live', readTime: '40 min', xp: 150 },
      { id: 6, slug: 'lists', title: 'Lists — ul, ol, dl', description: 'Ordered, unordered, and description lists — nesting them correctly, and the semantic reasons to choose one over the other.', tags: ['ul/ol', 'dl/dt/dd', 'Nested lists', 'List semantics'], status: 'live', readTime: '25 min', xp: 100 },
      { id: 7, slug: 'tables', title: 'Tables — Structure and Correct Usage', description: 'table, thead/tbody/tfoot, th, td, colspan/rowspan — and exactly why tables should never be used for page layout.', tags: ['table structure', 'thead/tbody', 'colspan/rowspan', 'Table accessibility'], status: 'live', readTime: '35 min', xp: 150 },
      { id: 8, slug: 'forms-inputs-validation', title: 'HTML Forms — Inputs & Validation Basics', description: 'form, every common input type, labels, placeholder, and the built-in validation attributes browsers already give you for free.', tags: ['form element', 'Input types', 'Labels', 'required/pattern', 'Built-in validation'], status: 'live', readTime: '45 min', xp: 200 },
      { id: 9, slug: 'forms-advanced', title: 'HTML Forms — Advanced', description: 'select, textarea, fieldset/legend, radio and checkbox groups, and the form-submission details that trip up beginners.', tags: ['select/textarea', 'fieldset/legend', 'Radio/checkbox groups', 'Form submission'], status: 'live', readTime: '40 min', xp: 150 },
      { id: 10, slug: 'semantic-html-accessibility-basics', title: 'Semantic HTML & Accessibility Basics', description: 'Why semantics matter beyond styling — ARIA basics, accessible forms, and how screen readers and search engines actually read your page.', tags: ['ARIA basics', 'Screen readers', 'Accessible forms', 'SEO & semantics'], status: 'live', readTime: '40 min', xp: 200 },
    ],
  },
  {
    id: 2, title: 'HTML Deep Dive', color: '#7b61ff',
    modules: [
      { id: 11, slug: 'html5-apis-overview', title: 'HTML5 APIs Overview', description: 'data-* attributes, contenteditable, and the drag-and-drop API — the browser features beyond plain markup.', tags: ['data-* attributes', 'contenteditable', 'Drag and drop', 'HTML5 features'], status: 'live', readTime: '30 min', xp: 150 },
      { id: 12, slug: 'embedding-content', title: 'Embedding Content — iframe, embed, object', description: 'Embedding external content safely — iframe, embed, object, and the security considerations every embed introduces.', tags: ['iframe', 'embed/object', 'sandbox attribute', 'Embed security'], status: 'live', readTime: '30 min', xp: 100 },
      { id: 13, slug: 'metadata-seo-fundamentals', title: 'Metadata & SEO Fundamentals', description: 'meta tags, Open Graph, the viewport meta tag, and favicons — the head content that determines how your page is discovered and shared.', tags: ['meta tags', 'Open Graph', 'viewport', 'favicon', 'title/description'], status: 'live', readTime: '35 min', xp: 150 },
      { id: 14, slug: 'html-entities-special-characters', title: 'HTML Entities & Special Characters', description: 'Why some characters need to be escaped, the entities you will actually use, and the bugs that happen when you forget.', tags: ['HTML entities', 'Escaping characters', 'Unicode in HTML'], status: 'live', readTime: '20 min', xp: 100 },
      { id: 15, slug: 'html-best-practices-validation', title: 'HTML Best Practices & Validation', description: 'The W3C validator, void elements, self-closing tag myths, and the conventions that separate clean markup from markup that merely renders.', tags: ['W3C validator', 'Void elements', 'Markup conventions', 'Common mistakes'], status: 'live', readTime: '30 min', xp: 150 },
      { id: 16, slug: 'building-a-complete-static-page', title: 'Building a Complete Static Page', description: 'A full project pulling structure, semantics, media, and forms together into one real, complete HTML page — start to finish.', tags: ['Full project', 'Structure + semantics', 'Real page build'], status: 'live', readTime: '50 min', xp: 250 },
    ],
  },
  {
    id: 3, title: 'CSS Foundations', color: '#f97316',
    modules: [
      { id: 17, slug: 'what-is-css-syntax-selectors-cascade', title: 'What is CSS? Syntax, Selectors & the Cascade', description: 'How CSS actually applies styles — selectors, the cascade, inheritance, and the mental model everything else in CSS builds on.', tags: ['CSS syntax', 'Selectors', 'The cascade', 'Inheritance'], status: 'live', readTime: '40 min', xp: 150 },
      { id: 18, slug: 'the-box-model', title: 'The Box Model — Margin, Border, Padding, Content', description: 'Every element on the page is a box. Understanding the box model precisely is what makes every later layout concept make sense.', tags: ['Box model', 'Margin/border/padding', 'box-sizing', 'Content box'], status: 'live', readTime: '35 min', xp: 150 },
      { id: 19, slug: 'colors-units-typography', title: 'Colors, Units & Typography', description: 'px vs em vs rem vs %, every color format, font-family stacks, and web fonts — the values you will type in every single stylesheet.', tags: ['CSS units', 'Color formats', 'font-family', 'Web fonts'], status: 'live', readTime: '40 min', xp: 150 },
      { id: 20, slug: 'css-selectors-deep-dive', title: 'CSS Selectors Deep Dive', description: 'Combinators, pseudo-classes, pseudo-elements, and specificity — the rules that decide which style actually wins.', tags: ['Combinators', 'Pseudo-classes', 'Pseudo-elements', 'Specificity'], status: 'live', readTime: '40 min', xp: 200 },
      { id: 21, slug: 'display-positioning', title: 'Display & Positioning', description: 'display: block/inline/inline-block, and position: static/relative/absolute/fixed/sticky — with z-index and stacking contexts explained properly.', tags: ['display property', 'position property', 'z-index', 'Stacking contexts'], status: 'live', readTime: '45 min', xp: 200 },
      { id: 22, slug: 'backgrounds-borders', title: 'Backgrounds & Borders', description: 'Gradients, background-image, border-radius, and box-shadow — the visual polish tools used in almost every real design.', tags: ['Gradients', 'background-image', 'border-radius', 'box-shadow'], status: 'live', readTime: '30 min', xp: 150 },
    ],
  },
  {
    id: 4, title: 'CSS Layout', color: '#facc15',
    modules: [
      { id: 23, slug: 'flexbox-complete-guide', title: 'Flexbox — The Complete Guide', description: 'Every Flexbox property explained from first principles — the main axis, cross axis, and how flex-grow/shrink/basis actually work together.', tags: ['flex-direction', 'justify-content', 'align-items', 'flex-grow/shrink'], status: 'live', readTime: '50 min', xp: 250 },
      { id: 24, slug: 'flexbox-in-practice', title: 'Flexbox in Practice — Real Layouts', description: 'Building real, common UI patterns with Flexbox — navbars, card grids, centering, and the sticky-footer layout everyone eventually needs.', tags: ['Navbars', 'Card layouts', 'Centering', 'Sticky footer'], status: 'live', readTime: '40 min', xp: 200 },
      { id: 25, slug: 'css-grid-complete-guide', title: 'CSS Grid — The Complete Guide', description: 'Two-dimensional layout done right — grid-template-columns/rows, grid areas, and the mental model that makes Grid click.', tags: ['grid-template-columns', 'Grid areas', 'fr unit', 'Two-dimensional layout'], status: 'live', readTime: '50 min', xp: 250 },
      { id: 26, slug: 'css-grid-in-practice', title: 'CSS Grid in Practice — Real Layouts', description: 'Real page layouts built with Grid — holy grail layouts, image galleries, and dashboards that would be painful with Flexbox alone.', tags: ['Holy grail layout', 'Image galleries', 'Dashboard layouts'], status: 'live', readTime: '40 min', xp: 200 },
      { id: 27, slug: 'flexbox-vs-grid', title: 'Flexbox vs Grid — When to Use Each', description: 'The decision every layout starts with — one-dimensional vs two-dimensional thinking, and when to combine both in the same page.', tags: ['Flexbox vs Grid', 'Layout decisions', 'Combining both'], status: 'live', readTime: '25 min', xp: 100 },
      { id: 28, slug: 'responsive-design-media-queries', title: 'Responsive Design & Media Queries', description: 'Building layouts that adapt to any screen — media query syntax, common breakpoints, and testing responsively for real.', tags: ['Media queries', 'Breakpoints', 'Responsive units', 'Viewport testing'], status: 'live', readTime: '40 min', xp: 200 },
      { id: 29, slug: 'mobile-first-design', title: 'Mobile-First Design Principles', description: 'Why designing for the smallest screen first produces better layouts, and how to structure your CSS to make it painless.', tags: ['Mobile-first', 'Progressive enhancement', 'Touch targets'], status: 'live', readTime: '30 min', xp: 150 },
    ],
  },
  {
    id: 5, title: 'Advanced CSS', color: '#4285f4',
    modules: [
      { id: 30, slug: 'css-custom-properties', title: 'CSS Custom Properties (Variables)', description: 'Native CSS variables — scoping, fallbacks, and using them to build a real, maintainable design system without a preprocessor.', tags: ['CSS variables', '--custom-property', 'var()', 'Design tokens'], status: 'live', readTime: '35 min', xp: 150 },
      { id: 31, slug: 'css-transitions', title: 'CSS Transitions', description: 'Smooth, performant state changes — transition-property, timing functions, and the properties that animate cheaply vs expensively.', tags: ['transition property', 'Timing functions', 'Performant animation'], status: 'live', readTime: '30 min', xp: 150 },
      { id: 32, slug: 'css-animations-keyframes', title: 'CSS Animations & Keyframes', description: '@keyframes and the animation property in full — building genuinely custom motion beyond simple hover transitions.', tags: ['@keyframes', 'animation property', 'Animation timing', 'Iteration & direction'], status: 'live', readTime: '40 min', xp: 200 },
      { id: 33, slug: 'css-transforms', title: 'CSS Transforms (2D and 3D)', description: 'translate, rotate, scale, skew, and 3D transforms with perspective — how modern interfaces move without touching layout.', tags: ['transform property', '2D transforms', '3D transforms', 'perspective'], status: 'live', readTime: '35 min', xp: 150 },
      { id: 34, slug: 'modern-css-selectors', title: 'Modern Selectors — :has, :is, :where, Container Queries', description: 'The newest selectors that changed how CSS is written — the parent selector finally arrives, plus container queries for truly component-based responsive design.', tags: [':has()', ':is()/:where()', 'Container queries', 'Modern CSS'], status: 'live', readTime: '35 min', xp: 200 },
      { id: 35, slug: 'css-architecture-naming', title: 'CSS Architecture & Naming Conventions', description: 'BEM and other naming systems, organizing large stylesheets, and the patterns that keep CSS maintainable as a project grows.', tags: ['BEM', 'CSS organization', 'Naming conventions', 'Scaling stylesheets'], status: 'live', readTime: '35 min', xp: 150 },
      { id: 36, slug: 'intro-to-sass', title: 'Intro to Sass — Variables, Nesting, Mixins', description: 'The CSS preprocessor that came before CSS variables — nesting, mixins, and why many real codebases still use it today.', tags: ['Sass variables', 'Nesting', 'Mixins', 'Preprocessors'], status: 'live', readTime: '35 min', xp: 150 },
    ],
  },
  {
    id: 6, title: 'Production & Career Readiness', color: '#ff4757',
    modules: [
      { id: 37, slug: 'responsive-images-performance', title: 'Responsive Images & Performance', description: 'srcset, sizes, picture, and the image-loading techniques that keep a real page fast on real connections.', tags: ['srcset/sizes', 'picture element', 'Image optimisation', 'Core Web Vitals'], status: 'live', readTime: '35 min', xp: 200 },
      { id: 38, slug: 'css-accessibility-best-practices', title: 'CSS Accessibility Best Practices', description: 'Focus states, color contrast, prefers-reduced-motion, and the CSS-level decisions that make or break real accessibility.', tags: ['Focus states', 'Color contrast', 'prefers-reduced-motion', 'Accessible CSS'], status: 'live', readTime: '35 min', xp: 200 },
      { id: 39, slug: 'cross-browser-compatibility-debugging', title: 'Cross-Browser Compatibility & Debugging', description: 'Vendor prefixes, feature detection, DevTools workflows, and debugging the CSS bug that only shows up in one browser.', tags: ['Vendor prefixes', 'Feature detection', 'DevTools', 'Cross-browser bugs'], status: 'live', readTime: '35 min', xp: 150 },
      { id: 40, slug: 'building-a-responsive-website', title: 'Building a Complete Responsive Website', description: 'The capstone project — a full, real, responsive website built end-to-end using everything from this entire track.', tags: ['Capstone project', 'Full responsive build', 'Real project'], status: 'live', readTime: '60 min', xp: 300 },
      { id: 41, slug: 'css-best-practices-common-mistakes', title: 'CSS Best Practices & Common Mistakes', description: 'The conventions that separate maintainable CSS from a stylesheet nobody wants to touch — and the mistakes every beginner makes at least once.', tags: ['CSS conventions', 'Common mistakes', 'Maintainable CSS'], status: 'live', readTime: '30 min', xp: 150 },
      { id: 42, slug: 'html-css-interview-prep', title: 'HTML & CSS Interview Prep — Common Questions and Patterns', description: 'The HTML and CSS questions that come up in real front-end interviews, answered at senior-engineer depth.', tags: ['Common questions', 'Layout challenges', 'Gotchas', 'Practical patterns'], status: 'live', readTime: '55 min', xp: 250 },
    ],
  },
]
