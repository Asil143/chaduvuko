import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const moduleMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'what-is-html-how-the-web-works':      () => import('@/content/html-css/what-is-html-how-the-web-works'),
  'document-structure':                  () => import('@/content/html-css/document-structure'),
  'text-semantic-structure':             () => import('@/content/html-css/text-semantic-structure'),
  'links-navigation':                    () => import('@/content/html-css/links-navigation'),
  'images-media':                        () => import('@/content/html-css/images-media'),
  'lists':                               () => import('@/content/html-css/lists'),
  'tables':                              () => import('@/content/html-css/tables'),
  'forms-inputs-validation':             () => import('@/content/html-css/forms-inputs-validation'),
  'forms-advanced':                      () => import('@/content/html-css/forms-advanced'),
  'semantic-html-accessibility-basics':  () => import('@/content/html-css/semantic-html-accessibility-basics'),
  'html5-apis-overview':                 () => import('@/content/html-css/html5-apis-overview'),
  'embedding-content':                   () => import('@/content/html-css/embedding-content'),
  'metadata-seo-fundamentals':           () => import('@/content/html-css/metadata-seo-fundamentals'),
  'html-entities-special-characters':    () => import('@/content/html-css/html-entities-special-characters'),
  'html-best-practices-validation':      () => import('@/content/html-css/html-best-practices-validation'),
  'building-a-complete-static-page':     () => import('@/content/html-css/building-a-complete-static-page'),
  'what-is-css-syntax-selectors-cascade': () => import('@/content/html-css/what-is-css-syntax-selectors-cascade'),
  'the-box-model':                       () => import('@/content/html-css/the-box-model'),
  'colors-units-typography':             () => import('@/content/html-css/colors-units-typography'),
  'css-selectors-deep-dive':             () => import('@/content/html-css/css-selectors-deep-dive'),
  'display-positioning':                 () => import('@/content/html-css/display-positioning'),
  'backgrounds-borders':                 () => import('@/content/html-css/backgrounds-borders'),
  'flexbox-complete-guide':              () => import('@/content/html-css/flexbox-complete-guide'),
  'flexbox-in-practice':                 () => import('@/content/html-css/flexbox-in-practice'),
  'css-grid-complete-guide':             () => import('@/content/html-css/css-grid-complete-guide'),
  'css-grid-in-practice':                () => import('@/content/html-css/css-grid-in-practice'),
  'flexbox-vs-grid':                     () => import('@/content/html-css/flexbox-vs-grid'),
  'responsive-design-media-queries':     () => import('@/content/html-css/responsive-design-media-queries'),
  'mobile-first-design':                 () => import('@/content/html-css/mobile-first-design'),
  'css-custom-properties':               () => import('@/content/html-css/css-custom-properties'),
  'css-transitions':                     () => import('@/content/html-css/css-transitions'),
  'css-animations-keyframes':            () => import('@/content/html-css/css-animations-keyframes'),
  'css-transforms':                      () => import('@/content/html-css/css-transforms'),
  'modern-css-selectors':                () => import('@/content/html-css/modern-css-selectors'),
  'css-architecture-naming':             () => import('@/content/html-css/css-architecture-naming'),
  'intro-to-sass':                       () => import('@/content/html-css/intro-to-sass'),
  'responsive-images-performance':       () => import('@/content/html-css/responsive-images-performance'),
  'css-accessibility-best-practices':    () => import('@/content/html-css/css-accessibility-best-practices'),
  'cross-browser-compatibility-debugging': () => import('@/content/html-css/cross-browser-compatibility-debugging'),
  'building-a-responsive-website':       () => import('@/content/html-css/building-a-responsive-website'),
  'css-best-practices-common-mistakes':  () => import('@/content/html-css/css-best-practices-common-mistakes'),
  'html-css-interview-prep':             () => import('@/content/html-css/html-css-interview-prep'),
};

const moduleMeta: Record<string, { title: string; description: string }> = {
  'what-is-html-how-the-web-works':      { title: 'What is HTML? How the Web Actually Works',      description: 'Browsers, servers, the DOM, and the HTTP request/response cycle — the foundation every web page sits on.' },
  'document-structure':                  { title: 'Document Structure — DOCTYPE, html, head, body', description: 'Every HTML document follows the same skeleton. What each part actually does.' },
  'text-semantic-structure':             { title: 'Text Elements & Semantic Structure',              description: 'Headings, paragraphs, and the semantic tags that give a page real meaning.' },
  'links-navigation':                    { title: 'Links and Navigation',                            description: 'The anchor tag in full — paths, targets, and building real navigation.' },
  'images-media':                        { title: 'Images and Media',                                description: 'img, alt text, figure/figcaption, audio, video, and lazy loading.' },
  'lists':                               { title: 'Lists — ul, ol, dl',                              description: 'Ordered, unordered, and description lists, nested correctly.' },
  'tables':                              { title: 'Tables — Structure and Correct Usage',            description: 'Table structure done right, and why tables are never for layout.' },
  'forms-inputs-validation':             { title: 'HTML Forms — Inputs & Validation Basics',         description: 'form, input types, labels, and built-in browser validation.' },
  'forms-advanced':                      { title: 'HTML Forms — Advanced',                           description: 'select, textarea, fieldset, radio/checkbox groups, and submission details.' },
  'semantic-html-accessibility-basics':  { title: 'Semantic HTML & Accessibility Basics',            description: 'Why semantics matter — ARIA, accessible forms, screen readers, SEO.' },
  'html5-apis-overview':                 { title: 'HTML5 APIs Overview',                             description: 'data-* attributes, contenteditable, and drag-and-drop.' },
  'embedding-content':                   { title: 'Embedding Content — iframe, embed, object',       description: 'Embedding external content safely, and the security considerations.' },
  'metadata-seo-fundamentals':           { title: 'Metadata & SEO Fundamentals',                     description: 'meta tags, Open Graph, viewport, and favicons.' },
  'html-entities-special-characters':    { title: 'HTML Entities & Special Characters',              description: 'Escaping characters correctly, and the bugs when you forget.' },
  'html-best-practices-validation':      { title: 'HTML Best Practices & Validation',                description: 'The W3C validator, void elements, and clean markup conventions.' },
  'building-a-complete-static-page':     { title: 'Building a Complete Static Page',                 description: 'A full project pulling everything together into one real page.' },
  'what-is-css-syntax-selectors-cascade': { title: 'What is CSS? Syntax, Selectors & the Cascade',    description: 'How CSS applies styles — selectors, the cascade, and inheritance.' },
  'the-box-model':                       { title: 'The Box Model — Margin, Border, Padding, Content', description: 'Every element is a box. Understanding it precisely.' },
  'colors-units-typography':             { title: 'Colors, Units & Typography',                      description: 'px vs em vs rem vs %, color formats, and web fonts.' },
  'css-selectors-deep-dive':             { title: 'CSS Selectors Deep Dive',                         description: 'Combinators, pseudo-classes, pseudo-elements, and specificity.' },
  'display-positioning':                 { title: 'Display & Positioning',                           description: 'display and position properties, z-index, and stacking contexts.' },
  'backgrounds-borders':                 { title: 'Backgrounds & Borders',                           description: 'Gradients, background-image, border-radius, and box-shadow.' },
  'flexbox-complete-guide':              { title: 'Flexbox — The Complete Guide',                    description: 'Every Flexbox property explained from first principles.' },
  'flexbox-in-practice':                 { title: 'Flexbox in Practice — Real Layouts',              description: 'Building real UI patterns — navbars, card grids, centering.' },
  'css-grid-complete-guide':             { title: 'CSS Grid — The Complete Guide',                   description: 'Two-dimensional layout done right.' },
  'css-grid-in-practice':                { title: 'CSS Grid in Practice — Real Layouts',             description: 'Real page layouts built with Grid.' },
  'flexbox-vs-grid':                     { title: 'Flexbox vs Grid — When to Use Each',              description: 'The decision every layout starts with.' },
  'responsive-design-media-queries':     { title: 'Responsive Design & Media Queries',               description: 'Building layouts that adapt to any screen.' },
  'mobile-first-design':                 { title: 'Mobile-First Design Principles',                 description: 'Why designing for the smallest screen first produces better layouts.' },
  'css-custom-properties':               { title: 'CSS Custom Properties (Variables)',               description: 'Native CSS variables and building a real design system.' },
  'css-transitions':                     { title: 'CSS Transitions',                                 description: 'Smooth, performant state changes.' },
  'css-animations-keyframes':            { title: 'CSS Animations & Keyframes',                      description: '@keyframes and the animation property in full.' },
  'css-transforms':                      { title: 'CSS Transforms (2D and 3D)',                      description: 'translate, rotate, scale, skew, and 3D transforms.' },
  'modern-css-selectors':                { title: 'Modern Selectors — :has, :is, :where, Container Queries', description: 'The newest selectors that changed how CSS is written.' },
  'css-architecture-naming':             { title: 'CSS Architecture & Naming Conventions',           description: 'BEM and the patterns that keep CSS maintainable.' },
  'intro-to-sass':                       { title: 'Intro to Sass — Variables, Nesting, Mixins',       description: 'The CSS preprocessor that came before CSS variables.' },
  'responsive-images-performance':       { title: 'Responsive Images & Performance',                 description: 'srcset, sizes, picture, and image-loading techniques.' },
  'css-accessibility-best-practices':    { title: 'CSS Accessibility Best Practices',                description: 'Focus states, color contrast, and prefers-reduced-motion.' },
  'cross-browser-compatibility-debugging': { title: 'Cross-Browser Compatibility & Debugging',        description: 'Vendor prefixes, feature detection, and DevTools workflows.' },
  'building-a-responsive-website':       { title: 'Building a Complete Responsive Website',          description: 'The capstone project — a full real responsive website.' },
  'css-best-practices-common-mistakes':  { title: 'CSS Best Practices & Common Mistakes',            description: 'The conventions that separate maintainable CSS from a mess.' },
  'html-css-interview-prep':             { title: 'HTML & CSS Interview Prep',                       description: 'The questions that come up in real front-end interviews.' },
};

// ─── Generate static paths for all live modules ───────────────────────────────
export function generateStaticParams() {
  return Object.keys(moduleMap).map(topic => ({ topic }));
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { topic: string };
}): Promise<Metadata> {
  const meta = moduleMeta[params.topic];
  if (!meta) return { title: 'HTML & CSS | Chaduvuko' };
  return {
    title: `${meta.title} | HTML & CSS | Chaduvuko`,
    description: meta.description,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function HtmlCssModulePage({
  params,
}: {
  params: { topic: string };
}) {
  const loader = moduleMap[params.topic];
  if (!loader) notFound();

  const { default: Content } = await loader();
  return <Content />;
}
