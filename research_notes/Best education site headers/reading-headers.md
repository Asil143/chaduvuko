# Reading-mode headers on documentation and long-form lessons

Observed from live HTML fetched on 2026-10-09. `developer.mozilla.org` and MDN are the same site; a Learn lesson and an HTML reference page were both opened. Layout claims below come from elements, classes, and visible labels in that HTML, not from a rendered viewport. Where a behavior depends on CSS or JavaScript that was not in the document, it is listed as a gap.

Pages opened:

- MDN Learn: [Basic HTML syntax](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax)
- MDN reference: [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button) (the unversioned elements URL redirects here)
- web.dev Learn: [Document structure](https://web.dev/learn/html/document-structure)
- React Learn: [Describing the UI](https://react.dev/learn/describing-the-ui); header also checked on [useState](https://react.dev/reference/react/useState)
- Next.js docs: [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- Tailwind: [flex](https://tailwindcss.com/docs/flex)
- Stripe: [How Checkout works](https://docs.stripe.com/payments/checkout/how-checkout-works)
- Kubernetes: [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
- GitHub Docs: [Hello World](https://docs.github.com/en/get-started/using-github/hello-world) (requested `.../start-your-journey/hello-world`; the response URL is `.../using-github/hello-world`)
- Svelte: [`$state`](https://svelte.dev/docs/svelte/$state)
- Vercel: [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel)
- Course-style, written lessons: [javascript.info Variables](https://javascript.info/variables), [The Rust Programming Language, ch. 3.1](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html), [The Odin Project, How Does the Web Work?](https://www.theodinproject.com/lessons/foundations-how-does-the-web-work), [fast.ai Practical Deep Learning, lesson 1](https://course.fast.ai/Lessons/lesson1.html)

## What stays in the top bar during reading, and what moves into a sidebar, a footer, or a command palette?

### Takeaway

On these pages the resting top bar is product navigation plus search (and often theme, version, or account). The lesson or article title, the track outline, the in-page section list, and Next/Previous are not in that bar. Track outlines sit in a sidebar. In-page section lists sit in a second sidebar or a drawer. Next/Previous, when present, sit at the end of the article or as side arrows. Search is usually a header button that names a keyboard shortcut, not a results list in the bar.

### Cited Findings

- MDN’s global header (`header.page-layout__header`) contains a search button whose title is “Search the site”, a button labeled “Toggle navigation”, and section tabs labeled HTML, CSS, JavaScript, Web APIs, All, Learn, Tools, and About. The page title is not in that header. — [MDN Learn](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax); same header controls on [MDN `<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button)
- Under that header, a `div.breadcrumbs-bar` contains “Toggle sidebar”, the breadcrumb, theme choices “OS default”, “Light”, and “Dark”, and a language list. — [MDN Learn](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax)
- MDN’s left sidebar (`aside#main-sidebar`) is the section tree and includes an input with placeholder “Filter”. The right sidebar is labeled “In this article”. The site footer is a separate `footer.footer` (“Your blueprint for a better internet”) and does not contain the lesson pager. — [MDN Learn](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax)
- MDN’s own writing guide says every MDN page should have a sidebar, chosen with front matter such as `sidebar: mdnsidebar`, and that a section title in that sidebar links to the section landing page. It describes the sidebar, not the site header. The HTML element template says the title heading is “displayed at the top of the page.” — [Sidebars](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Page_structures/Sidebars); [HTML element page template](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Page_structures/Page_types/HTML_element_page_template)
- web.dev’s `devsite-header` holds the product menu: “Resources”, “Web Platform” (HTML, CSS, JavaScript), “User experience” (Performance, Accessibility, Identity), “Learn” (Learn HTML, Learn CSS, Learn JavaScript, Learn AI, Learn Performance, Learn Accessibility, “More courses”), plus Explore and About. Buttons in that header include “Open menu”, “Open search”, “Close search”, and “Close navigation”. The string “Sign in” is also in the page. — [web.dev Document structure](https://web.dev/learn/html/document-structure)
- web.dev course navigation is a `devsite-book-nav` with a “Close navigation” button, separate from the header. “On this page” is its own `nav`. Previous/Next use the class `steps-link` and are not in the header. — [web.dev Document structure](https://web.dev/learn/html/document-structure)
- React’s top `nav` is sticky (`z-40 sticky top-0`) and reads “React”, “v19.3” (href `/versions`), “Search” with “⌘” and “Ctrl K”, “Learn”, “Reference”, “Community”, “Blog”, plus icon links “Translations” and “Open on GitHub”, and theme buttons “Use Dark Mode” and “Use Light Mode”. A “Menu” button is `lg:hidden`. The same labels are on the useState reference page. — [Describing the UI](https://react.dev/learn/describing-the-ui); [useState](https://react.dev/reference/react/useState)
- On the React learn page, the track (“GET STARTED”, “Quick Start”, “LEARN REACT”, “Describing the UI”, and following lessons) is a sidebar inside the content grid, not the top nav. “On this page” is a later `nav` with class `hidden ... 2xl:block`. — [Describing the UI](https://react.dev/learn/describing-the-ui)
- Next.js has a resting header with class `sticky top-0 z-40 ... h-16` whose text includes “Docs”, “Learn”, “Showcase”, “Blog”, “Templates”, “Deploy”, “Search…⌘K”, and “Ask AI”. An “Open menu” button is `@min-[1024px]:hidden`. A second `header` in the DOM is full-height (`h-full w-full`, `z-1000`) and includes “Skip to content”, “Search documentation...⌘K”, “Feedback”, and “Learn”, plus an “open menu” button. — [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- On that Next.js page, the guide list (“Getting Started”, “Installation”, “Project Structure”, “Layouts and Pages”, …) is a scrollable `nav` (`h-[calc(100vh-260px)]`). “On this page” is `nav` with class `order-last hidden w-56 shrink-0 2xl:block`, and that block also contains “Edit this page on GitHub” and “Scroll to top”. Previous/Next are a `nav` with `aria-label="pagination"`. The site footer repeats Docs, Learn, Showcase, Blog, a newsletter (“Subscribe”), and legal links, and is marked © 2026. — [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- Tailwind’s bar is `div` class `fixed inset-x-0 top-0 z-10`. Its text starts “v4.3”, “⌘K”, “Ctrl K”, “Docs”, “Play”, “Blog”, “Showcase”, “Partners”, “Plus”. A control’s `aria-label` is “Select version of library”. Another button’s accessible name is “Open navigation menu”. The utility list (“Getting started”, “Installation”, “Layout”, …) is a separate sidebar `nav`. “On this page” is a right-hand list. The article footer links “flex-wrap” and “flex-grow” with no “Previous” or “Next” label. The site footer lists Documentation, Playground, Blog, Showcase, GitHub, and X. — [flex](https://tailwindcss.com/docs/flex)
- Stripe’s topic `nav` has `aria-label="Documentation topics"` and the links “Get started”, “Payments”, “Revenue”, “Risk”, “Data”, “Money management”, “Stablecoins”, “Embedded finance”, “Developer resources”, and “More”. Header test ids include `docs-header-logged-out-view` and tab selectors for those topics. Visible account text is “Create account” and “Sign in”. Search is a control whose text is “Search /” and an input with placeholder “Search”. A control is `data-testid="StripeAssistant--Header-AskAI"`. The docs tree is a sidebar (`data-testid="docs-sidebar-node-link"`) with a “Filter...” input. The footer text is “Was this page helpful?” with “Yes” and “No”, then “Contact Support”, “Discord”, “changelog”, “Contact Sales”, and “Read llms.txt”. No “On this page”, “Contents”, or “In this article” string is in the HTML. — [How Checkout works](https://docs.stripe.com/payments/checkout/how-checkout-works)
- Kubernetes’ top `nav` has class `js-navbar-scroll navbar navbar-expand flex-md-column flex-xl-row td-navbar`. Its text includes “Documentation”, “Blog”, “Training”, “Careers”, “Partners”, “Community”, “Versions” (v1.37, v1.36, v1.35, v1.34, v1.33), a language list, “Light”, “Dark”, “Auto”, and a KubeCon + CloudNativeCon North America 2026 promo. Search inputs use placeholder and `aria-label` “Search this site” and `data-search-page="/search"`. The section tree is `aside.td-sidebar`. A button `class="... td-sidebar__toggle d-md-none ..."` is “Toggle section navigation”. The in-page list begins “Print entire section” and then the headings (“What is a Pod?”, “Using Pods”, …). — [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
- GitHub Docs’ banner is `header` with `role="banner"` and Primer classes `SubdomainNavBar`. Visible labels are “GitHub Docs” (href `/en`, `aria-label="Docs home"`), a button “Search or ask Copilot” with “/”, and “Menu”. A sticky class `Header_stickyContainer` is on the page. A secondary bar has “Collapse sidebar” on a control classed `DocsSecondaryBar_desktopOnly` and “Expand sidebar” on `DocsSecondaryBar_mobileOnly`. The docs tree is `nav` `aria-label="Documentation navigation"`. “In this article” is both an `h2` and a `nav` (`aria-label="In this article"`, class includes `Minitocs_drawerDefault`). The footer includes “Back to top”, “Was this Doc helpful?”, “Yes”, “No”, “Make a contribution”, “Ask the GitHub community”, “Contact support”, and “GitHub Inc. © 2026”. — [Hello World](https://docs.github.com/en/get-started/using-github/hello-world)
- Svelte’s primary `nav` (`aria-label="Primary"`) contains “Docs”, “Svelte”, “SvelteKit”, “CLI”, “AI”, “Playground”, “Tutorial”, “Packages”, “Blog”, icon links for Discord, Bluesky, and GitHub, a search input (`type="search"`, placeholder “Search”, `aria-label="Search"`), “Toggle font”, “Toggle dark mode”, and “Toggle menu”. The docs tree is a `div.toc-container` (Overview, Getting started, Runes, `$state`, …). A lower `header` in the article holds the short trail “Svelte” / “Runes” and the title. “On this page” is `aside.on-this-page`, with a checkbox `aria-label="Toggle 'on this page' menu"`. — [`$state`](https://svelte.dev/docs/svelte/$state)
- Vercel’s `header#marketing-header` is `sticky top-0` and uses `data-[scrolled]:bg-background-200` and `data-[scrolled]:shadow-...`. Its controls include “Docs”, “Build”, “Learn”, “Ask AI”, “Log In”, “Sign Up”, and “Open menu”. The docs tree is an `aside` classed `hidden` and `lg:flex`, containing a button “Search Docs” with “⌘ K”. “On this page” is another `aside`, classed `hidden lg:block` and `sticky`. The marketing footer is a separate link list (products, frameworks, legal). — [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel)
- javascript.info’s toolbar element is `class="sitetoolbar sitetoolbar_tutorial"`. Confirmed controls in that page are a search field placeholder “Search on Javascript.info”, a theme-changer checkbox, and a language list exposed as `window.langs` (Arabic, Azerbaijani, Bulgarian, and others). A second search in the tablet menu has placeholder “Search in the tutorial”. The article’s own `header.main__header` holds the breadcrumb and the `h1`. Sidebar blocks list the article headings and “Tasks (3)” / “Comments”. — [Variables](https://javascript.info/variables)
- The Rust book’s menu is `div#mdbook-menu-bar` class `menu-bar sticky`, with “Change theme”, a search input placeholder “Search this book ...”, and a hidden checkbox `#mdbook-sidebar-toggle-anchor`. The book outline is `nav#mdbook-sidebar` `aria-label="Table of contents"`. Previous/Next are two navs, `aria-label="Page navigation"`: one class `nav-wide-wrapper`, one class `nav-wrapper` with links classed `mobile-nav-chapters`. — [Variables and Mutability](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html)
- The Odin Project’s top `nav` (`border-b`) includes “All Paths”, “About”, “Community”, “Support us”, “Sign in”, “Get Started”, a home link `aria-label="Return back home"`, and a button whose screen-reader text is “Open mobile menu” (`aria-controls="mobile-menu"`). An off-canvas `nav` `aria-label="Sidebar"` repeats Home, All Paths, About, Support Us, Community, Get started, Light mode, and Sign in. The lesson title is a content `header`, not that bar. “Lesson contents” is an `aside` classed `hidden xl:block`. A control is `aria-label="Toggle course contents"`. The course outline is requested in a `turbo-frame` whose `src` is `/lessons/foundations-how-does-the-web-work/course_contents`. — [How Does the Web Work?](https://www.theodinproject.com/lessons/foundations-how-does-the-web-work)
- fast.ai lesson 1 uses `header#quarto-header` class `headroom fixed-top`. The brand link is “Practical Deep Learning for Coders”. Buttons are “Toggle navigation” and “Toggle sidebar navigation”; both call `quartoToggleHeadroom`. There is a `quarto-reader-toggle` control. The lesson list is `nav#quarto-sidebar`. “On this page” is `nav#TOC` with `role="doc-toc"`. Previous/Next are `nav.page-navigation`. No search input was in the lesson HTML. — [Lesson 1](https://course.fast.ai/Lessons/lesson1.html)

### Inferences

- The stable split is identity and jump-anywhere tools in the top bar, and location-within-the-article tools outside it. Command-palette search (a button plus a shortcut glyph) is how React, Next.js, Tailwind, Vercel, GitHub Docs, and Stripe keep search in the bar without showing results there.
- Account controls are optional chrome, not part of reading: Stripe shows “Create account” / “Sign in” while logged out; Vercel shows “Log In” / “Sign Up”; Odin shows “Sign in” / “Get Started”; MDN, React, Next.js, Tailwind, Svelte, Kubernetes, the Rust book, and javascript.info do not put an account requirement in the reading header.
- A second bar under the product header is common when the product header is too coarse for the library: MDN’s `breadcrumbs-bar`, GitHub’s secondary sidebar toggle, Svelte’s in-article `header`.

### Gaps

- Stripe’s HTML has no “On this page” label. Whether a right-hand heading list exists under another name, or is absent, was not established.
- The Odin `course_contents` frame URL, fetched as a normal document, returned a full page shell rather than a clean lesson list, so the labels inside the course sidebar were not recorded.
- javascript.info’s `nav.sitetoolbar__sections` had no text in the fetched HTML, so the named section links in that toolbar (if any are visible) were not listed.
- For Next.js, both `header` elements are in the server HTML. Which one is hidden in the resting desktop layout is inferred from `h-16` versus `h-full`, not from a screenshot.

## How do they show location (product, section, page title)? Is the title in the header, a breadcrumb, or only in the page?

### Takeaway

The product name stays in the top bar. The section is a breadcrumb and/or the highlighted row in the sidebar. The page title is an `h1` in the article. A few sites also put the current title, or its ancestors, in a breadcrumb under the product bar. None of these pages put the lesson title in the product header as the main heading.

### Cited Findings

- MDN Learn breadcrumb text is “Learn / Core learning modules / HTML / Basic HTML syntax”, linking to `/en-US/docs/Learn_web_development`, `/Core`, `/Core/Structuring_content`, and the current lesson. The `h1` is “Basic HTML syntax”. The document `<title>` is “Basic HTML syntax - Learn web development | MDN”. — [Basic HTML syntax](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax)
- MDN reference breadcrumb text is “Web / HTML / Reference / Elements / `<button>`”, with those crumbs linked. The `h1` is “`<button>` HTML button element”. The global header still says HTML, CSS, JavaScript, and the other product tabs, not the element name. — [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button)
- web.dev breadcrumb text is “web.dev / Resources / HTML”, linking to `https://web.dev/`, `https://web.dev/learn`, and `https://web.dev/learn/html`. The `h1` is “Document structure”. The `<title>` is “Document structure | web.dev”. The header identifies the product, not this lesson. — [Document structure](https://web.dev/learn/html/document-structure)
- React has no breadcrumb on the learn page. Location in the product is the top-nav item “Learn” (href `/learn`) versus “Reference”. Location in the track is the sidebar. The `h1` is “Describing the UI”. The `<title>` is “Describing the UI – React”. “v19.3” in the header is a version link to `/versions`, not the page title. — [Describing the UI](https://react.dev/learn/describing-the-ui)
- Next.js breadcrumb `nav` has `aria-label="Breadcrumb"` and the text “App Router / Getting Started / Layouts and Pages”. Linked crumbs are “App Router” (`/docs/app`) and “Getting Started” (`/docs/app/getting-started`). The `h1` is “Layouts and Pages”. The `<title>` is “Getting Started: Layouts and Pages | Next.js”. — [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- Tailwind’s `h1` is “flex”. The `<title>` is “flex - Flexbox & Grid - Tailwind CSS”. There is no breadcrumb element. “Flexbox & Grid” and “flex” appear inside the fixed top element’s text, together with the mobile navigation list. The sidebar is the section index. — [flex](https://tailwindcss.com/docs/flex)
- Stripe breadcrumb `nav` has `aria-label="Breadcrumbs"` and the text “Home / Payments / Build a payments page”, linking to `/`, `/payments`, and `/payments/checkout`. The `h1` is “How Checkout works”, which is not one of those three links. The `<title>` is “How Checkout works | Stripe Documentation”. The header shows the product area (“Payments”), not the page title. — [How Checkout works](https://docs.stripe.com/payments/checkout/how-checkout-works)
- Kubernetes breadcrumb `nav.td-breadcrumbs` reads “Kubernetes Documentation / Concepts / Workloads / Pods”, linking to `/docs/`, `/docs/concepts/`, and `/docs/concepts/workloads/`. The page has an `h1` “Pods”. The `<title>` is “Pods | Kubernetes”. Version and language live in the navbar, separate from this trail. — [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
- GitHub Docs breadcrumb text is “Home / Get started / Using GitHub / Hello World”. Linked crumbs observed were “Home” (`/en`), “Get started” (`/en/get-started`), and “Using GitHub” (`/en/get-started/using-github`). The `h1` is “Hello World”. The `<title>` is “Hello World - GitHub Docs”. The banner title is “GitHub Docs”, not the article. — [Hello World](https://docs.github.com/en/get-started/using-github/hello-world)
- Svelte’s in-article trail reads “Svelte / Runes”, and the `h1` is “$state”. The `<title>` is “$state • Svelte Docs”. The primary nav marks the product area (“Docs”, then “Svelte” versus “SvelteKit”) and does not show “$state”. — [`$state`](https://svelte.dev/docs/svelte/$state)
- Vercel’s `h1` is “Getting started with Vercel”. “On this page” is an `h2` in the right aside. No breadcrumb `nav` was found. Product location is the header item “Docs” and the sidebar row “Getting started”. — [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel)
- javascript.info’s article header text is “Tutorial / The JavaScript language / JavaScript Fundamentals” and then the `h1` “Variables”. Crumb links are `/` (“Tutorial”), `/js`, and `/first-steps`. The `<title>` is “Variables”. The toolbar class `sitetoolbar_tutorial` marks the product area as the tutorial. — [Variables](https://javascript.info/variables)
- The Rust book’s `<title>` is “Variables and Mutability - The Rust Programming Language”. The headings in order are “Keyboard shortcuts”, `h1` “The Rust Programming Language”, and `h2` “Variables and Mutability”. The `h1` is the book title in the menu bar. There is no breadcrumb. Chapter location is the sidebar plus the previous/next chapter links. — [Variables and Mutability](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html)
- Odin’s content `header` contains only the `h1` “How Does the Web Work?”. The `<title>` is “How Does the Web Work? | The Odin Project”. The top nav does not include the path or lesson name. “All Paths” is the way back to the track list. — [How Does the Web Work?](https://www.theodinproject.com/lessons/foundations-how-does-the-web-work)
- fast.ai shows two breadcrumbs, both reading “Part 1 / 1: Getting started”. One has class `quarto-title-breadcrumbs d-none d-lg-block`. The `h1` is “1: Getting started”. The header brand is the course name, “Practical Deep Learning for Coders”. — [Lesson 1](https://course.fast.ai/Lessons/lesson1.html)

### Inferences

- Two breadcrumb styles appear. MDN includes the current page as the last crumb and still repeats a fuller title in the `h1`. Stripe, Kubernetes, and GitHub Docs stop the linked crumbs at the parent section and leave the current title to the `h1`.
- Reference and course pages on the same product share the header. React’s learn page and useState page use the same top labels; MDN’s learn page and `<button>` page use the same product header. The thing that changes is the breadcrumb and the sidebar, not the bar.

### Gaps

- Tailwind’s fixed element includes the strings “Flexbox & Grid” and “flex”, but the HTML does not show whether that pair is visible in the desktop bar or only inside the navigation drawer.
- Whether the Rust book’s `h2` “Variables and Mutability” is the only visible chapter title (with the `h1` reserved for the menu) matches mdBook’s usual structure; the heading order supports that, and no separate chapter `h1` was present.

## How do Next / Previous / On this page work, and are they in the header or at the bottom of the article?

### Takeaway

“On this page” is never a control in the product header. It is a sidebar list of in-page anchors, often hidden until a wide breakpoint, or a drawer. Next and Previous, when they move between lessons, are at the bottom of the article and name the neighbor. The Rust book instead uses previous/next chapter arrows outside the article text. Several reference pages have no cross-page Next/Previous at all.

### Cited Findings

- MDN Learn puts Previous/Next in `ul.prev-next`, twice in the HTML, outside the header. On Basic HTML syntax the labels are “Overview: Structuring content with HTML” (href the module page) and “Next” to “Webpage metadata” (`.../Webpage_metadata`). The right sidebar `h2` is “In this article”, with anchors such as “What is HTML?” and “Summary”. — [Basic HTML syntax](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax)
- The MDN `<button>` reference page has the “In this article” sidebar (Try it, Attributes, Notes, Accessibility, Examples, Technical summary, Specifications, Browser compatibility) and no `ul.prev-next`. — [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button)
- web.dev’s in-page nav has `aria-label="On this page"`. Previous/Next are links classed `steps-link`: “Previous” “Overview of HTML” (`/learn/html/overview`) and “Next” “Metadata” (`/learn/html/metadata`). They are not in `devsite-header`. — [Document structure](https://web.dev/learn/html/document-structure)
- React’s “On this page” is an `h2` inside `nav` class `pt-20 sticky top-0`, wrapped by `div` class `hidden -mt-16 lg:max-w-custom-xs 2xl:block`. On Describing the UI, a bottom link reads “Next” “Your First Component” (`/learn/your-first-component`). No matching “Previous” page link was in that extract. The useState page has buttons labeled “Next Example”, which sit on the in-page examples, plus “Scroll left” and “Scroll right”. — [Describing the UI](https://react.dev/learn/describing-the-ui); [useState](https://react.dev/reference/react/useState)
- Next.js “On this page” lists “Creating a page”, “Creating a layout”, and the other headings, in a nav hidden until `2xl`. The pager is `nav` `aria-label="pagination"` classed with `border-t` and `my-12`. Links: “Previous” “Project Structure” (`aria-label="Go to previous page: Project Structure"`) and “Next” “Linking and Navigating” (`aria-label="Go to next page: Linking and Navigating"`). — [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- Tailwind’s “On this page” label is present. The only adjacent-page links extracted at the bottom are “flex-wrap” and “flex-grow”, in `footer` class `mt-16`, with no Previous/Next text. The word “previous” does not occur on the page. — [flex](https://tailwindcss.com/docs/flex)
- Stripe has no Previous/Next page links in the extract and no “On this page” string. The end of the article is “Was this page helpful?” with “Yes” and “No”. Movement among pages is the left sidebar. — [How Checkout works](https://docs.stripe.com/payments/checkout/how-checkout-works)
- Kubernetes’ heading list is in the toc region and starts with “Print entire section”, then in-page anchors. No previous/next page link was found; “What’s next” on this URL is an in-page heading (`#what-s-next`), and another “previous” hit was a sidebar link titled “Previewing locally”. — [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
- GitHub Docs’ “In this article” nav lists “Introduction” through “Further reading”, all hash links. No previous/next article link was found. “Next steps” is a section inside the article (`#next-steps`). The footer has “Back to top” and the helpfulness question, not a neighbor page. — [Hello World](https://docs.github.com/en/get-started/using-github/hello-world)
- Svelte’s “On this page” aside lists “$state”, “Deep state”, “Classes”, and the other sections. A pager near the article reads “previous” / “next” and links “What are runes?” (`/docs/svelte/what-are-runes`) and “$derived” (`/docs/svelte/$derived`, class `next`). Those are neighbor reference pages, not header controls. — [`$state`](https://svelte.dev/docs/svelte/$state)
- Vercel’s right aside is “On this page” with anchors from “Prerequisites” through “Next steps”. At the bottom, links read “Previous” “Vercel Documentation” (`/docs`) and “Next” “Fundamentals” (`/docs/fundamentals`). A separate “Next steps” is also an in-page anchor (`#next-steps`). — [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel)
- javascript.info’s bottom nav uses “Previous lesson” (class `page__nav page__nav_prev`, href `/strict-mode`) and “Next lesson” (class `page__nav page__nav_next`, href `/types`). The sidebar, not the header, lists “A variable”, “Constants”, “Summary”, “Tasks (3)”, and “Comments”. There is no “On this page” phrase. — [Variables](https://javascript.info/variables)
- The Rust book does not use the words “On this page”. Previous/Next are icon links: `aria-label="Previous chapter"` to `ch03-00-common-programming-concepts.html` and `aria-label="Next chapter"` to `ch03-02-data-types.html`, duplicated as `mobile-nav-chapters` and as `nav-chapters` in `nav-wide-wrapper`. — [Variables and Mutability](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html)
- Odin’s bottom controls are an anchor `data-test-id="previous-lesson-btn"` whose SVG `<title>` is “Previous lesson” and whose visible text is “Previous”, href `/lessons/foundations-join-the-odin-community`, then the text “Sign in to track progress”, then “Next” to `/lessons/foundations-installations`. “Lesson contents” is the aside, hidden below `xl`. — [How Does the Web Work?](https://www.theodinproject.com/lessons/foundations-how-does-the-web-work)
- fast.ai’s `nav#TOC` is labeled “On this page” and lists “Video”, “How to complete lesson 1”, “Resources”, and “Links”. `nav.page-navigation` links back to “Practical Deep Learning” (`../index.html`) and forward to “2: Deployment” (`../Lessons/lesson2.html`). — [Lesson 1](https://course.fast.ai/Lessons/lesson1.html)

### Inferences

- Named Next/Previous at the bottom is the course and getting-started pattern (MDN Learn, web.dev Learn, React’s learn overview, Next.js getting started, Vercel getting started, javascript.info, Odin, fast.ai). The Rust book is the exception that keeps chapter arrows on the viewport edges, including a mobile pair.
- Reference pages that are not ordered as a lesson either drop the pager (MDN elements, Stripe, Kubernetes, GitHub Docs, Tailwind’s unlabeled neighbors) or keep a quiet previous/next between adjacent reference entries (Svelte runes).

### Gaps

- React’s useState page was not fully scanned for a cross-page pager. “Next Example” is confirmed; a Previous/Next page pair was not in the extracted buttons.
- MDN renders `ul.prev-next` twice. The HTML does not say which copy is desktop and which is mobile.
- Stripe may offer heading jumps without the label “On this page”. That was not confirmed.

## Do they hide the header on scroll down? Is there a reading-progress line? Where does search live, and what does it index?

### Takeaway

Hiding the header on scroll is not the normal pattern in this set. fast.ai is the only page that loads Headroom. The others use sticky or fixed bars, and Vercel only changes the bar’s background after scroll. A scroll-percentage reading line was not found. javascript.info shows a lesson-count meter (“Lesson 8 of 94”). Search lives in the header or, on Vercel, in the docs sidebar, and the control’s own words are the only reliable scope (“the site”, “documentation”, “this book”, “in the tutorial”).

### Cited Findings

- fast.ai’s header is `class="headroom fixed-top"`. The lesson loads `../site_libs/quarto-nav/headroom.min.js`. “Toggle navigation” and “Toggle sidebar navigation” call `window.quartoToggleHeadroom`. No `new Headroom(...)` options and no `tolerance` setting are in the lesson HTML. — [Lesson 1](https://course.fast.ai/Lessons/lesson1.html)
- React’s top nav includes `sticky top-0`. No `headroom`, `reading-progress`, or `scroll-progress` string is on the learn page. — [Describing the UI](https://react.dev/learn/describing-the-ui)
- Next.js’s resting header includes `sticky top-0 z-40` and `transition-shadow`. No reading-progress or headroom string was found. — [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- Tailwind’s top bar is `fixed inset-x-0 top-0`, so the class keeps it at the top rather than removing it. No reading-progress string was found. — [flex](https://tailwindcss.com/docs/flex)
- Vercel’s header stays `sticky top-0` and adds background and shadow when a `data-scrolled` state is set (`data-[scrolled]:bg-background-200` and a shadow utility). That is a style change on scroll, not a hide class. — [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel)
- The Rust book menu is `class="menu-bar sticky"`. No reading-progress string was found. — [Variables and Mutability](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html)
- GitHub Docs includes the class `Header_stickyContainer`. No reading-progress string was found. — [Hello World](https://docs.github.com/en/get-started/using-github/hello-world)
- Kubernetes’ navbar class includes `js-navbar-scroll` but the fetched HTML does not include that script’s body (the first script `src` values are Google Tag Manager). No element with a reading-progress class was found. Matches for “progress” on the Pods page are the words “in-progress” in the article body. — [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
- MDN’s header tag is `<header class="page-layout__header">` with no sticky or fixed class on that tag. The strings `reading-progress`, `scroll-progress`, `hide-on-scroll`, and `headroom` do not occur. The word “sticky” occurs twice in the Learn document; it is not on the header tag. — [Basic HTML syntax](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax)
- web.dev has an empty `<devsite-progress id="app-progress" class="devsite-progress">`. The strings `reading-progress`, `scroll-progress`, and `headroom` do not occur. The header element itself has no sticky or fixed class in the fetched tag. — [Document structure](https://web.dev/learn/html/document-structure)
- javascript.info has `<progress class="tutorial-progress" data-sticky value="8" max="94" data-tooltip="Lesson 8 of 94">`. That is a lesson index out of 94, marked `data-sticky`, not a 0–100 scroll percentage. No `reading-progress` string occurs. — [Variables](https://javascript.info/variables)
- Odin’s lesson HTML has no `progress` element and no headroom or reading-progress string. “Sign in to track progress” is a text label between Previous and Next, not a bar. — [How Does the Web Work?](https://www.theodinproject.com/lessons/foundations-how-does-the-web-work)
- Stripe, Svelte, and the fast.ai lesson likewise have no reading-progress element. Svelte and Stripe have no headroom class. — [`$state`](https://svelte.dev/docs/svelte/$state); [How Checkout works](https://docs.stripe.com/payments/checkout/how-checkout-works); [Lesson 1](https://course.fast.ai/Lessons/lesson1.html)
- Search placement and the scope the control itself states:
  - MDN: header button title “Search the site”, plus a skip link “Skip to search” (`#mdn-search`). The sidebar’s separate input is placeholder “Filter”. — [Basic HTML syntax](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax)
  - web.dev: header buttons “Open search” and “Close search”, and an input `name="q"` placeholder “Search” `aria-label="Search"` class `devsite-search-field`. A second input is placeholder “Filter”, `aria-label="Type to filter"`. — [Document structure](https://web.dev/learn/html/document-structure)
  - React: a button whose text is “Search” plus “⌘” “Ctrl K”, and another button `aria-label="Search"` classed `md:hidden`. The string “algolia” occurs in the HTML. — [Describing the UI](https://react.dev/learn/describing-the-ui)
  - Next.js: buttons “Search…⌘K” and “Search documentation...⌘K”, separate from “Ask AI”. The string “cmdk” occurs once. — [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
  - Tailwind: the fixed bar shows “⌘K” and “Ctrl K”. The string “algolia” occurs once. There is no always-visible search text field in the extract. — [flex](https://tailwindcss.com/docs/flex)
  - Stripe: button text “Search /” and input placeholder “Search”, plus Ask AI. The string “algolia” occurs many times. The sidebar input is “Filter...”. — [How Checkout works](https://docs.stripe.com/payments/checkout/how-checkout-works)
  - Kubernetes: input placeholder “Search this site”, `data-search-page="/search"`. The string “pagefind” occurs once. — [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
  - GitHub Docs: button “Search or ask Copilot” with the shortcut “/”. — [Hello World](https://docs.github.com/en/get-started/using-github/hello-world)
  - Svelte: `input type="search"` placeholder “Search” in the primary nav, and a button `aria-label="Search"`. — [`$state`](https://svelte.dev/docs/svelte/$state)
  - Vercel: “Ask AI” is in the marketing header. “Search Docs” with “⌘ K” is a button in the docs sidebar, whose `aria-label` is “Search Docs”. — [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel)
  - javascript.info: placeholder “Search on Javascript.info” in the main tools, and placeholder “Search in the tutorial” on `input.tablet-menu-search__input`. — [Variables](https://javascript.info/variables)
  - Rust book: placeholder “Search this book ...” on `#mdbook-searchbar`. The string “lunr” occurs once. — [Variables and Mutability](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html)
  - fast.ai lesson 1 and the Odin lesson have no search input. On the Odin page the word “search” appears in the lesson body (a link to an MDN page about pages, servers, and search engines), not as a site search field. — [Lesson 1](https://course.fast.ai/Lessons/lesson1.html); [How Does the Web Work?](https://www.theodinproject.com/lessons/foundations-how-does-the-web-work)

### Inferences

- “Ask AI” is a second header action beside search on Next.js, Stripe, and Vercel, and GitHub combines them into one control, “Search or ask Copilot”. The reading header is where that pair lives; the article footer is where “was this helpful?” lives.
- The only progress indicator that states what it measures is javascript.info’s lesson counter. web.dev’s empty `devsite-progress` element should not be treated as a reading line without its script.

### Gaps

- Headroom’s scroll direction is not configured in the fast.ai HTML. The library is loaded and the header has the `headroom` class; the pin/unpin rules live in the script, which was not read.
- `js-navbar-scroll` on Kubernetes may change the navbar on scroll. The behavior is not in the HTML.
- Whether MDN’s or web.dev’s header is `position: sticky` in an external stylesheet was not checked. Their header tags do not carry sticky or fixed classes.
- What each search index contains (headings only, full body, the whole product, or only the current track) is not stated, except for the labels quoted above. Algolia, Pagefind, cmdk, and Lunr names in the HTML identify an implementation, not the corpus.

## How does the small-screen header differ? What is the minimum set that remains visible?

### Takeaway

The small-screen header drops the section tree and the in-page list. What the classes keep available is a product mark, a menu button, and search. Sidebars and “On this page” become panels. Next/Previous stay at the bottom or, in the Rust book, switch to a mobile chapter pair. Exact pixels were not measured in a browser; the evidence is responsive classes and labeled menu buttons.

### Cited Findings

- React: “Menu” is `lg:hidden`. The icon button `aria-label="Search"` is `md:hidden`, while a separate button shows the text “Search” with “⌘” “Ctrl K”. “On this page” is inside `hidden ... 2xl:block`, so that list is not in the layout below the `2xl` breakpoint. The logo link “React” and the “v19.3” link are in the same top nav as the menu button. — [Describing the UI](https://react.dev/learn/describing-the-ui)
- Next.js: “Open menu” is `@min-[1024px]:hidden` (present below 1024px). “On this page” is `hidden ... 2xl:block`. The `h-16` header still contains “Search…⌘K” and “Ask AI”. — [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- Tailwind: a button accessible name is “Open navigation menu”. The fixed bar also contains the version control and “⌘K” / “Ctrl K”. The utility sidebar is a separate `nav` from that button. — [flex](https://tailwindcss.com/docs/flex)
- Vercel: the docs sidebar is `hidden` and `lg:flex`. The “On this page” aside is `hidden lg:block`. A dialog `aria-label="Navigation menu"` is shown when open below 880px (`max-[880px]:data-[open]:!visible`). “Ask AI”, “Log In”, and “Sign Up” are in the sticky header. “Search Docs” is in the sidebar that is hidden below `lg`. — [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel)
- GitHub Docs: the banner always includes “GitHub Docs”, “Search or ask Copilot”, and “Menu” in the HTML. The secondary bar splits “Collapse sidebar” (`DocsSecondaryBar_desktopOnly`) from “Expand sidebar” (`DocsSecondaryBar_mobileOnly`). Breadcrumb scroll buttons are “Scroll breadcrumbs left” and “Scroll breadcrumbs right”. — [Hello World](https://docs.github.com/en/get-started/using-github/hello-world)
- Svelte: “Toggle menu” is in the primary nav. “On this page” can be opened with a checkbox `aria-label="Toggle 'on this page' menu"`. Search, theme, and the Svelte home link stay in that primary nav’s HTML. — [`$state`](https://svelte.dev/docs/svelte/$state)
- web.dev: the header buttons include “Open menu” and “Open search” / “Close search”. Course navigation has “Close navigation”. Both a search field and an open-search button exist; the HTML does not assign them to breakpoints. — [Document structure](https://web.dev/learn/html/document-structure)
- Kubernetes: `#hamburger` is `class="btn fas fa-bars"` and calls `kub.toggleMenu()`. The section toggle is `d-md-none` (“Toggle section navigation”), which in Bootstrap is hidden from the `md` breakpoint up. The navbar also has `flex-md-column flex-xl-row`. — [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
- The Rust book duplicates page navigation: `mobile-nav-chapters previous` / `next` inside `nav.nav-wrapper`, and `nav-chapters` inside `nav.nav-wide-wrapper`. The sidebar is behind `#mdbook-sidebar-toggle-anchor`. The sticky menu bar keeps theme and “Search this book ...”. — [Variables and Mutability](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html)
- javascript.info has `button.sidebar__toggle` and a tablet search field “Search in the tutorial”, separate from “Search on Javascript.info”. The progress element is `data-sticky`. Previous lesson / Next lesson use `page__nav_prev` and `page__nav_next` and are not in the toolbar. — [Variables](https://javascript.info/variables)
- Odin: “Open mobile menu” controls `#mobile-menu`. The button’s own classes are `inline-flex ... p-2` and do not include a `md:hidden` or `lg:hidden` utility. “Lesson contents” is `hidden xl:block`. Previous / Next sit in a row that uses `md:items-center` and `md:justify-self-start`. — [How Does the Web Work?](https://www.theodinproject.com/lessons/foundations-how-does-the-web-work)
- fast.ai: `button.navbar-toggler` is “Toggle navigation”, and another button is “Toggle sidebar navigation”. One breadcrumb is `d-none d-lg-block` (hidden below the large breakpoint). The header remains `fixed-top`. There is a reader toggle (`quarto-reader-toggle`). — [Lesson 1](https://course.fast.ai/Lessons/lesson1.html)
- MDN: “Toggle navigation” is in the global header and “Toggle sidebar” is in the breadcrumbs bar, on both the Learn lesson and the `<button>` page. No `lg:hidden`-style utility on those buttons was recorded. Theme and language sit in the breadcrumbs bar, so they travel with the location trail rather than with the article. — [Basic HTML syntax](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax)

### Inferences

- The minimum set these layouts keep one click away on a small screen is product home, search, and a button that opens the track. “On this page” is the first thing removed (React and Next.js wait until `2xl`; Vercel until `lg`; Odin until `xl`; Svelte turns it into a checkbox).
- Previous/Next are not promoted into the small header, except the Rust book’s `mobile-nav-chapters` pair, which is page navigation rather than a product menu.

### Gaps

- No viewport was resized. Classes such as `lg:hidden` and `d-md-none` say when a node is hidden; they do not prove which siblings remain visually in the bar after CSS.
- Stripe’s small-screen header was not isolated. Topic links and “Search /” are in the header HTML; a menu-button label was not found.
- Tailwind’s “Open navigation menu” button class was truncated before a breakpoint utility could be confirmed.
- Odin’s “Open mobile menu” button is not itself `hidden` at a breakpoint. Whether the desktop links hide on small screens depends on a parent rule that was not extracted.

## Which pattern is used when the content is a course of many pages rather than an API reference?

### Takeaway

Course-shaped pages in this set do not put the lesson title or Next/Previous in the product header. They keep the header on the course or product name and on search, put the lesson title in the page, put the track in a sidebar, often add a short breadcrumb, and put a named Next and Previous after the lesson. API-reference pages keep that same kind of header and sidebar, and usually drop the sequential pager. The React and MDN pairs show the header staying the same while the sidebar and the pager change.

### Cited Findings

- Sequential written lessons, with neighbor links after the article or as chapter arrows:
  - MDN Learn: breadcrumb includes the lesson; sidebar is the curriculum; bottom `ul.prev-next` points at the module overview and the next lesson. — [Basic HTML syntax](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax)
  - web.dev Learn: breadcrumb is site / Resources / HTML; bottom steps are “Overview of HTML” and “Metadata”; header stays the product menu. — [Document structure](https://web.dev/learn/html/document-structure)
  - React Learn: no breadcrumb; sidebar is the course; bottom link is “Next” “Your First Component”; header is React / Learn / Reference / search. — [Describing the UI](https://react.dev/learn/describing-the-ui)
  - Next.js getting started: breadcrumb “App Router / Getting Started”; sidebar is the ordered guide; bottom pager names “Project Structure” and “Linking and Navigating”. — [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
  - Vercel getting started: sidebar plus bottom “Previous” “Vercel Documentation” and “Next” “Fundamentals”. — [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel)
  - javascript.info: breadcrumb is the tutorial part; bottom labels are “Previous lesson” and “Next lesson”; a sticky meter says “Lesson 8 of 94”. — [Variables](https://javascript.info/variables)
  - Rust book: menu shows the book title and “Search this book”; sidebar is the whole book; previous/next are “Previous chapter” and “Next chapter”, including `mobile-nav-chapters`. — [Variables and Mutability](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html)
  - Odin: top nav is the school (“All Paths”, “Sign in”), not the lesson; `h1` is the lesson; bottom controls are “Previous”, “Sign in to track progress”, and “Next”; course contents are a separate frame. — [How Does the Web Work?](https://www.theodinproject.com/lessons/foundations-how-does-the-web-work)
  - fast.ai: header is the course name and can collapse via Headroom; sidebar is every lesson; breadcrumb is “Part 1 / 1: Getting started”; bottom nav goes to the course index and “2: Deployment”; “On this page” includes “Video”. — [Lesson 1](https://course.fast.ai/Lessons/lesson1.html)
- Reference pages, same chrome family, weaker or absent sequence:
  - MDN `<button>`: same product header as the Learn lesson, breadcrumb through the reference tree, “In this article” in the right sidebar, no `prev-next`. — [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button)
  - React useState: same header as the learn page, including “Learn” and “Reference”; sidebar becomes the API list (Overview, Hooks, `useState`, …). — [useState](https://react.dev/reference/react/useState)
  - Tailwind `flex`: fixed docs bar with version v4.3 and search shortcut; sidebar of utilities; bottom links are the neighboring utilities “flex-wrap” and “flex-grow” without Previous/Next. — [flex](https://tailwindcss.com/docs/flex)
  - Stripe: topic tabs and a deep sidebar; breadcrumb stops at “Build a payments page”; no previous/next; end of page is “Was this page helpful?”. — [How Checkout works](https://docs.stripe.com/payments/checkout/how-checkout-works)
  - Kubernetes: version and language in the navbar, breadcrumb, deep sidebar, in-page toc with “Print entire section”, no page pager. — [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
  - GitHub Docs: product banner, breadcrumb, sidebar, “In this article”, no page pager, helpfulness in the footer. — [Hello World](https://docs.github.com/en/get-started/using-github/hello-world)
  - Svelte’s overview says “These pages serve as reference documentation” and points new readers to the tutorial. The `$state` page still has previous/next between “What are runes?” and “$derived”, plus “On this page”. — [Svelte docs overview](https://svelte.dev/docs/introduction); [`$state`](https://svelte.dev/docs/svelte/$state)

### Inferences

- For a long ordered track, these sites treat the header as stable course chrome and treat the lesson as a page in a sequence. The sequence is communicated three times, none of them by replacing the header title: sidebar position, sometimes a breadcrumb, and a labeled next page at the end.
- For an API reference, the same header still works because the sidebar is the index. Next/Previous is the part that reference pages most often remove, because the neighbor is not “the next lesson”.
- Progress, when a course shows it, is “lesson N of M” (javascript.info) or an explicit sign-in prompt (Odin), not a line that fills as the reader scrolls.
- fast.ai is the course page that also collapses the header (`headroom`) and offers a reader toggle. That is additional chrome on top of the same sidebar-plus-bottom-pager pattern, not a different information architecture.

### Gaps

- The sentence “These pages serve as reference documentation” is from [the Svelte overview](https://svelte.dev/docs/introduction), a different URL from the `$state` page whose header, pager, and “On this page” list were measured.
- React reference pages may still have a bottom neighbor link that was not extracted from useState.
- The Odin course sidebar’s lesson labels were not captured, because the frame request did not return a fragment.
- No claim is made about which of these patterns a new library should copy. The split above is what these pages do.
