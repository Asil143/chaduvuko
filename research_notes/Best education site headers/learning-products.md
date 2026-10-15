# Learning-product headers (logged-out, observed 2026-10-09)

Observed logged out, in English, from the live pages. Server HTML was used when the header was in the document. Pages whose header is client-rendered were opened in headless Chrome at a 1440×900 window and the rendered DOM was read. No page was scrolled, so hide-on-scroll is unobserved everywhere. No account was signed in, so progress, resume, and true lesson players that require login were not visible unless the logged-out shell still rendered them. Labels below are quoted from those pages.

## For each site, what is in the header on the homepage or catalog, in this order: logo, primary links, search, progress, continue/resume, account, theme, language, announcements?

### Takeaway

Logged-out catalog headers split into two kinds: a short marketing bar (logo, a few links or menus, search, account) and, on the written-docs sites, a reference menu plus search and sometimes theme or language. Progress and continue/resume were not in any logged-out catalog header that rendered. Several client-rendered or bot-walled sites did not yield a header at all.

### Cited Findings

**Khan Academy** — [https://www.khanacademy.org/](https://www.khanacademy.org/)

- Rendered page text starts with a failure notice about `*.kastatic.org` / `*.kasandbox.org`, then “More for teachers: Sign up” linking to `/signup/teacher?continue=%2F`, then the header.
- Header nav `aria-label="page header"`: button “Explore” (`data-testid="learn-menu-button"`). Inside that menu markup: “Browse By Standards” and categories including “Math: Pre-K - 8th grade”, “Math: High school & college”, “Test prep”, “English language arts (ELA)”, “Science”, “Social studies”, “Computing”, “Economics”, “Life skills”, “Partner courses”, “Khan for educators”.
- A second nav repeats direct links: Math (`/math`), Test prep, English language arts (ELA), Science, Social studies, Computing, Economics, Life skills, Partner courses, Khan for educators.
- Logo link “Khan Academy” to `/`. “Donate” to `https://donate.khanacademy.org/campaign/580662/donate`. “Log in” (`/login?continue=%2F`). “Sign up” (`/signup?continue=%2F`). Search control “Search for courses, skills, and videos” to `/search`, plus a control with `data-testid="mobile-search-button"`. Button `aria-label="Open menu"` with `data-testid="mobile-header-menu-button"`.
- Not seen in that header: progress, continue, resume, theme, language switcher.

**Coursera** — [https://www.coursera.org/](https://www.coursera.org/)

- Audience row: “For Individuals”, “For Businesses”, “For Universities”, “For Governments”.
- Logo “Coursera” to `/`. Button “Explore” (`aria-label="Explore our catalog"`). Link “Degrees” (`/degrees`). Search input placeholder “What do you want to learn?” and button “Search”. Button “Ask Coursera”. “Log In” (`/#authMode=login`). “Join for Free” (`/#authMode=signup`). Button “Open Navigation Menu”.
- The same DOM also contains a shorter cluster: logo, “Ask Coursera”, “Search”, “Join for Free”.
- Not seen: progress, continue, theme, language. The course marketing page uses this same header (see next question).

**Duolingo** — [https://www.duolingo.com/](https://www.duolingo.com/)

- Server HTML is an empty app shell (title “Duolingo”, no header tags). A noscript meta refresh points at `/nojs/splash`, which is a different download-the-app page, not the product header. [https://www.duolingo.com/nojs/splash](https://www.duolingo.com/nojs/splash)
- Rendered header: logo to `/`. Control “Site language: English”. “Get started” to `/register`. “I ALREADY HAVE AN ACCOUNT”. The language control’s markup lists many languages (English, Chess, Math, Spanish, French, and others). Those names sit in the header element after the account control; they are the language menu contents, not a separate row of pinned primary links in the extracted text.
- Not seen in that logged-out header: search, progress, continue, theme, streak, gems, or hearts.
- Requesting [https://www.duolingo.com/learn](https://www.duolingo.com/learn) rendered the same marketing page and the same header, not a lesson.

**Brilliant** — [https://brilliant.org/](https://brilliant.org/) and [https://brilliant.org/courses/](https://brilliant.org/courses/)

- Homepage nav (`data-slot="lohp-nav"`): logo link `aria-label="Brilliant home"` to `/`, and a “Sign in” button. No other links were inside that nav. The nav uses a full pill radius and `xl:` padding utilities.
- Catalog page text starts “Topics Sign in Sign up Courses”, then topic chips: Math, Basic Algebra, Algebra, Adv Algebra, Adv Math, Logic, Everyday Math, Math Fun, CS, Python, Technology, Data, Science, and grade bands such as “GRADES 4–7”.
- Not seen on the homepage header: search, progress, continue, theme, language, primary course links.

**freeCodeCamp** — [https://www.freecodecamp.org/](https://www.freecodecamp.org/) and [https://www.freecodecamp.org/learn](https://www.freecodecamp.org/learn)

- Server HTML has no header (Gatsby shell). Rendered `header.site-header`: “Skip to content”. Search input placeholder “Search 13,000+ of our books and courses” and “Submit search terms”. Button “Change Language” with English, Español, 中文（简体字）, 中文（繁體字）, Italiano, Português, Українська, 日本語, Deutsch, Swahili, 한국어, العربية. “Menu” button. After it: Donate (`/donate`), Curriculum (`/learn`), Catalog (`/catalog`), Forum, News, Radio, Contribute, Podcast, and “Night Mode”. “Sign in” to `https://api.freecodecamp.org/signin`.
- Page CSS includes `@media (min-width:980px){.nav-list{max-width:15rem}}`, so the link list is a narrow panel at that width, not a full-width link row.
- `/learn` uses this same header. Body text on that page: “Welcome to freeCodeCamp's curriculum. Sign in to save your progress (it's free)”.
- Not seen in the header: progress meter, continue, resume, pricing.

**Codecademy** — [https://www.codecademy.com/](https://www.codecademy.com/) and [https://www.codecademy.com/resources/docs/python](https://www.codecademy.com/resources/docs/python)

- A cookie-consent dialog is the first content in the rendered DOM.
- Header text includes “For Individuals”, “For Students”, “For Business”, “Teams”, “Search”, “Log In”, “Sign Up” (the Search / Log In / Sign Up cluster appears twice).
- Menu buttons and links in the header: “Catalog”, “Course topics”, “Skill paths”, “Career paths”, “Certification paths”, “Live Courses”, “Resources”, “Docs”, “Learning tools”, “Practice tools”, “Community”, “Inspiration”, “Pricing”, “Site navigation”. Also “Codecademy Logo”.
- Docs page keeps that header and adds a “Topics →” control. Server HTML of [https://www.codecademy.com/resources/docs](https://www.codecademy.com/resources/docs) lists topic links under Topics, including AI, Blockchain, C, C#, C++, Cloud Computing, Command Line, CSS, Cybersecurity, and further languages.
- Not seen in the header: progress, continue, theme, language.

**DataCamp** — [https://www.datacamp.com/](https://www.datacamp.com/)

- Direct fetch and headless Chrome both received a Cloudflare “Just a moment…” challenge, so the rendered header was not observed that way.
- A separate fetch of the homepage markdown starts with “Skip to main content”, then links Python, R, SQL, ChatGPT, Power BI, Tableau, Excel, Docker, Databricks, Snowflake, Azure, Git, then “Why DataCamp for business?”, “DataCamp for Business”, and “Request Demo”.
- Logo alt text, search, account, theme, language, progress, and continue were not in that extraction. Whether the technology links are the header or the first in-page strip was not separable from the markdown.

**Scrimba** — [https://scrimba.com/](https://scrimba.com/)

- Server HTML is an ~8 KB app shell. Title “Learn to code with Scrimba”. `color-scheme` meta is `dark`. Headless Chrome still returned only the title after a longer wait. No header labels were in the DOM.
- A public data endpoint (`/op/pub/app01/data?v=1`) is binary and was not usable as a layout source.

**Master.dev (Frontend Masters)** — [https://frontendmasters.com/](https://frontendmasters.com/) redirects to [https://master.dev/](https://master.dev/)

- Header `FM-Header-Main`: “Master.dev” to `/`, “Paths” (`/learn/`), “Courses” (`/courses/`), “Blog”, “Features” with “Overview”, “For Teams”, “For Enterprise”, “Pricing” (`/join/`), “Live” (`/workshops/`), “Search” (`?q=`), “Join Now” (`/join/`), “Login” (`/login/`). A closable block includes “Contact: support@master.dev”.
- Homepage body, not the header bar, says “Today, Frontend Masters becomes Master.dev” and links `blog/today-frontend-masters-becomes-master-dev/`.
- Not seen in the header: progress, continue, theme, language.

**The Odin Project** — [https://www.theodinproject.com/](https://www.theodinproject.com/) and [https://www.theodinproject.com/paths](https://www.theodinproject.com/paths)

- Desktop nav: logo (`alt="Odin Logo"`, link “Return back home” to `/`), “All Paths”, “About”, “Community”, “Support us”, “Sign in” (`/sign_in`), a link whose visible text is “Light mode” and whose href is `/themes?theme=dark`, “Get Started” (`/sign_up`).
- Button text “Open mobile menu” is inside a container classed `md:hidden`. A sidebar duplicate is labeled “Sidebar” and includes “Close sidebar”, Home, All Paths, About, Support Us, Community, Get started, Light mode, Sign in.
- Paths catalog uses the same header.
- Not seen in the header: search, progress, continue, language, announcements.

**Boot.dev** — [https://www.boot.dev/](https://www.boot.dev/) and [https://www.boot.dev/courses/learn-python-beginners](https://www.boot.dev/courses/learn-python-beginners)

- Homepage bar, above the hero: “For Business” (`/for-business`) and “For Schools” (`/for-schools`), both classed `hidden` and `sm:block`, plus button “Sign In & Skip Demo →”. The image `alt="Boot.dev logo"` is in the hero under that bar, not in the bar.
- Course page bar is different. Visible text: “Open main menu”, “Courses” (All, Backend, DevOps, Data Analyst), “Training”, “Challenges”, “Search”, “Pricing” (Individuals, Organizations, Gifts, Redeem), “Leaderboard”, “Community” (Discord, Guilds, Blog), “Sound effects on”, “Sign In”. The Courses / Pricing / Community groups are repeated, consistent with a menu and a drawer.
- Not seen: progress, continue, theme, language. “← Prev” / “Next →” on the course page is a reviews pager (“Showing 1-9 of 5581”), not a lesson control.

**MDN Learn** — [https://developer.mozilla.org/en-US/docs/Learn_web_development](https://developer.mozilla.org/en-US/docs/Learn_web_development)

- `header.page-layout__header` contains `nav.navigation`. Logo links to `/en-US/`. A search slot uses `<mdn-search-button>` and is marked `data-view="mobile"` on that wrapper. Button `aria-label="Toggle navigation"` controls `#navigation__popup`.
- Top menu tab labels inside the popup: HTML, CSS, JavaScript, Web APIs, All, Learn, Tools, About. Each tab opens a panel (for example HTML → “HTML: Markup language”, Elements, Global attributes, Attributes).
- Rendered HTML contains the strings `user-menu` and `mdn-plus`. It does not contain the visible strings “Sign in” or “Log in”. No theme-control label was isolated. No progress, continue, or announcement bar was in the header text.

**DeepLearning.AI marketing site** — [https://www.deeplearning.ai/](https://www.deeplearning.ai/)

- Header classes include `sticky top-0 z-50 h-16 w-full border-b`. Logo image alt “DeepLearning.AI” to `/`.
- Links: “Courses”. “News” with “The Batch”, “Andrew's Letter”, “Data Points”, “ML Research”. “Blog”. “Community” with “Forum”. “Attend AI Dev”. “Resources”. “Membership”. “For Business” with “Overview”, “Plans & Pricing”, “Learning Tracks”, “Contact Us”. “Log In”.
- The link list is repeated in the header DOM.
- Not seen: search, progress, continue, theme, language.

**CS50** — [https://cs50.harvard.edu/](https://cs50.harvard.edu/) redirects to [https://www.edx.org/cs50](https://www.edx.org/cs50). The course site is [https://cs50.harvard.edu/x/](https://cs50.harvard.edu/x/) (“CS50x 2026”).

- edX page header (the redirect target): edX logo, button “Learn - Open navigation menu”, “edX For Business”, button “Search courses”, and a site banner “Build skills that create new career opportunities. Save up to 20% with code SUCCESS2026.” plus “Close site banner.”
- CS50x header: “This is CS50”, the line “CS50’s Introduction to Computer Science OpenCourseWare”, “Donate”, then “David J. Malan” and mailto / Facebook / GitHub / Instagram / LinkedIn / Reddit / X. Button “Menu”.
- `nav#nav` class `collapse d-lg-block` holds the course menu: CS50x Puzzle Day, CS50x em português, CS50x en español, CS50.ai, Ed Discussion, Visual Studio Code, CS50 Educator Workshop, Gallery of Final Projects, then Week 0 Scratch through Week 10, Additional Practice, Final Project, Seminars, Academic Honesty, CS50 Certificate, FAQs, Gradebook, Staff, Syllabus, and distribution links (Apple TV, edX, Google TV, Harvard Extension School, Harvard Summer School).
- Not seen: search field, progress, continue, theme toggle, account.

**Exercism** — [https://exercism.org/](https://exercism.org/)

- `header#site-header` begins with an announcement link: “Learning to code? Check out our new dedicated beginners platform - Jiki!” to `https://jiki.io`.
- Logo alt “Exercism” to `/`. “Learn” menu: Language Tracks (`/tracks`), Learn To Code with Jiki, Your Journey, Your Favorites (“New”). “Discover” menu: Exercism Perks, Community Videos, Brief Introduction Series, Interviews & Stories, Discord, Forum. “Contribute” menu: Getting started, Mentoring, Docs, Contributors, Translators (“New”). “More” menu includes Donate, About Exercism, Our Impact, GitHub Syncer, Insiders.
- Language links in the header: English, Deutsch, español de España, español latinoamericano, français, italiano, magyar, português do Brasil, português europeu, العربية, বাংলা, Ελληνικά, हिन्दी, 日本語, 한국어, فارسی, 简体中文, 繁體中文, українська, plus “Coming soon” entries.
- “Sign up” and “Log in” (`/users/sign_in`).
- Not seen in the header text: search field, progress, continue, theme.

**LeetCode** — [https://leetcode.com/](https://leetcode.com/)

- Both a direct fetch and headless Chrome received Cloudflare “Just a moment…” / “Performing security verification”. No header was observed.

**roadmap.sh** (extra; public roadmaps plus written guides) — [https://roadmap.sh/](https://roadmap.sh/) and [https://roadmap.sh/frontend](https://roadmap.sh/frontend)

- A cookie dialog (“Accept All”, “Reject All”, “Customise”) is the first content.
- Homepage nav: “Roadmap Logo” to `/`, “AI Tutor” (`/ai`), “Roadmaps”, “Packs”, “Newsletters”, button “Open Navigation Dropdown”, button “Menu”. `nav[aria-label="Main"]` is classed `hidden sm:block`. Search text in the page: “⌘ K Search available roadmaps or learn anything with AI.”
- On the frontend roadmap, top text before the title is: “Roadmaps AI Tutor Packs Newsletters Upgrade Login Sign Up ⌘ K”.
- Not seen in that top cluster: progress meter, continue, theme, language. Progress copy appears in the page body (“Join 146,905+ others tracking their progress on this roadmap” and “Sign up free”).

**javascript.info** (extra; written tutorial) — [https://javascript.info/](https://javascript.info/)

- Toolbar: language button “EN” and links AR عربي, CS Čeština, DA Dansk, EN English, ES Español, FA فارسی, FR Français, ID Indonesia, IT Italiano, JA 日本語, KO 한국어, RU Русский, TR Türkçe, UK Українська, UZ Oʻzbek, ZH 简体中文, plus “Help to translate”.
- “Buy EPUB/PDF” (`/ebook`). Inputs “Search on Javascript.info” and “Search in the tutorial”. “Tutorial map” (`/tutorial/map`). “Light theme”. “Dark theme”. “Share”.
- Not seen: account, progress, continue, announcements. The homepage also has in-page tabs “Part 1 The JavaScript language”, “Part 2 Browser: Document, Events, Interfaces”, “Part 3 Additional articles”; those are the tutorial map, not the toolbar.

**web.dev Learn** (extra; written courses) — [https://web.dev/learn](https://web.dev/learn)

- Button “Open menu”. “Resources” dropdown: HTML, CSS, JavaScript, Performance, Accessibility, Identity, Learn HTML / CSS / JavaScript / AI / Performance / Accessibility, More courses, plus “Additional resources” links. “More” dropdown: Blog, Case Studies. Button “Open search”, input “Search”, “Close search”.
- Language links from the header markup: English, Deutsch, Español – América Latina, Français, Indonesia, Italiano, Polski, Português – Brasil (list continues past the captured slice).
- A second tab row on `/learn` lists courses: AI, Privacy, Accessibility, HTML, Images, Responsive Design, Forms, PWA, CSS, Performance, Testing, JavaScript.
- Not confirmed inside the header text: account, theme, progress, continue. The homepage HTML contains the string “Sign in” later in the document; it was not tied to a header control.

### Inferences

- The written public libraries that rendered (MDN, javascript.info, Odin, freeCodeCamp, web.dev, Exercism, roadmap.sh) spend the header on wayfinding: logo, a taxonomy menu, and usually search. Account is a single logged-out action when it exists at all.
- Video and paid course marketers that rendered (Coursera, Codecademy, Master.dev, DeepLearning.AI) add an audience or offer menu and a join/login pair. Coursera and Codecademy also put search in the bar. Coursera is the only one in this set with an “Ask” control in the header.
- Brilliant’s homepage and Boot.dev’s homepage are deliberately thinner than their catalog or course pages: the homepage bar is account plus almost nothing else, and the denser navigation appears one level in.
- Duolingo’s logged-out site is a registration door, not a catalog. The header does not try to expose the lesson product.

### Gaps

- LeetCode: Cloudflare blocked every fetch. Header unknown.
- DataCamp: header labels for logo, search, and account were not visible. Only the leading technology links from one markdown extraction are recorded.
- Scrimba: client shell never hydrated. Header unknown.
- Khan, Codecademy, Coursera, and roadmap.sh show duplicate clusters in the DOM (desktop plus a shorter set). Which cluster is visible at a phone width was not measured, except where a class or test id says so (Odin `md:hidden`, Boot.dev `sm:block`, roadmap `hidden sm:block`, Khan `mobile-header-menu-button`, CS50 `d-lg-block`, freeCodeCamp 980px nav-list rule).
- MDN account and theme: `user-menu` and `mdn-plus` are in the HTML, but the visible labels were not extracted. No scroll behavior was tested on any site.

## What changes when the learner is inside a lesson, article, path, or exercise? Do they replace nav with a study bar, keep a second row, hide on scroll, or show next/previous?

### Takeaway

Where a logged-out lesson or article actually opened, the global header stayed, and next/previous lived at the edge of the article or in a course side list. The one clear replacement of the marketing header by a study bar was the DeepLearning.AI lesson player, which still gates the lesson behind login. True in-player chrome for Duolingo, Khan exercises, freeCodeCamp steps, Codecademy exercises, Coursera lectures, Master.dev videos, Brilliant lessons, Boot.dev exercises, Odin lessons, and LeetCode problems was not visible logged out.

### Cited Findings

**DeepLearning.AI lesson shell** — [https://learn.deeplearning.ai/courses/ai-python-for-beginners/lesson/z57gn/introduction](https://learn.deeplearning.ai/courses/ai-python-for-beginners/lesson/z57gn/introduction)

- The marketing header (Courses, News, Blog, Membership, For Business) is not this page’s header.
- Server HTML of the lesson header: “/ AI Python for Beginners / Module 1”, module links “Basics of AI Python Coding Module 1”, “Automating Tasks with Python Module 2”, “Working with Your Own Data and Documents in Python Module 3”, “Extending Python with Packages and APIs Module 4”, “Next lesson” to `.../lesson/fq15s/what-is-computer-programming%3F`, “Syllabus”, “Courses”, “Log In”. Buttons include `aria-label="Toggle sidebar"` and `aria-label="Previous lesson"`.
- The page contains the signal “log in to continue”. Rendered buttons also include “Continue with Google”, “Continue with LinkedIn”, “Sign up”, “Start 7-day Free Trial”, “Access as Audit”, and video controls “Play”, “Mute”, “Captions”, “1x”, “Auto”, “Chapters”, “Settings”, “Fullscreen”. A tips modal (“Quick Guide & Tips”) covers part of the rendered text.
- This is a study bar plus a module list, not the marketing nav, and not a second marketing row.

**javascript.info article** — [https://javascript.info/variables](https://javascript.info/variables)

- The same toolbar remains (language, Buy EPUB/PDF, search, Tutorial map, Light theme, Dark theme, Share).
- The article header text is the breadcrumb “Tutorial / The JavaScript language / JavaScript Fundamentals”, the date “February 25, 2026”, and the title “Variables”.
- Elsewhere on the article, not in the toolbar: “Previous lesson” and “Next lesson”. Rendered text near them includes “Previous lesson Ctrl + → Next lesson” and then Share, Tutorial map, and the comments block. That placement is the article footer area, not a sticky replacement bar.
- Hide-on-scroll was not tested.

**MDN article** — [https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website)

- The global MDN header is unchanged (logo, search button, Toggle navigation, HTML / CSS / JavaScript / Web APIs / All / Learn / Tools / About).
- The article adds “In this article” with “Prerequisites”, “Tutorials”, “See also”.
- A “Previous” link points at the Environment setup command-line page and is followed by “Overview: Getting started”. Next/previous are not in the site header.
- Hide-on-scroll was not tested.

**web.dev chapter** — [https://web.dev/learn/html/document-structure](https://web.dev/learn/html/document-structure)

- The site header is unchanged (Open menu, Resources, More, search, languages).
- The chapter adds button “Hide side navigation”, “On this page” with section links, and “Copy page as markdown”.
- End of the article, immediately before the Creative Commons line: “Previous” “Overview of HTML” and “Next” “Metadata”. Those are not in the site header.
- Course index [https://web.dev/learn/html](https://web.dev/learn/html) links the chapters (welcome, overview, document-structure, metadata, and others) but does not replace the site header.

**roadmap.sh roadmap** — [https://roadmap.sh/frontend](https://roadmap.sh/frontend)

- Top cluster stays: Roadmaps, AI Tutor, Packs, Newsletters, Upgrade, Login, Sign Up, ⌘ K.
- The roadmap page then has its own controls, in the body: “← All Roadmaps”, “Download”, “Weekly Newsletter”, and switches labeled “Roadmap”, “Projects”, “AI Tutor”, “Personalize”, plus “Share Roadmap” and “Add to favorites” among the buttons. “Join 146,905+ others tracking their progress on this roadmap” and “Sign up free” are body copy.
- This is a second set of page controls under the same header, not a replacement study bar. No next/previous lesson pair was the header.

**CS50x week** — [https://cs50.harvard.edu/x/weeks/0/](https://cs50.harvard.edu/x/weeks/0/) (“Week 0 Scratch - CS50x 2026”)

- Two lines sit above the header: “Lectures have now been dubbed into Portuguese and Spanish, thanks to lingopal.ai.” and “Interested in a verified certificate, a professional certificate, or transfer credit and accreditation?”
- The course header and the Menu / week list stay. Week 0 is a page inside that course nav, not a player bar with next/previous. Hide-on-scroll was not tested.

**Exercism track and exercise** — [https://exercism.org/tracks/javascript](https://exercism.org/tracks/javascript) and [https://exercism.org/tracks/javascript/exercises/hello-world](https://exercism.org/tracks/javascript/exercises/hello-world)

- Track page has a local header: “JavaScript”, “494,618 students”, “About JavaScript”, “Learn” (`/tracks/javascript/concepts`), “Practice” (`/tracks/javascript/exercises`).
- Exercise page keeps the site header (Jiki announcement, Learn, Discover, Contribute, More, languages, Sign up, Log in). Server HTML of the exercise header: “Tracks / JavaScript / Exercises / Hello World” and “Hello World Tutorial Exercise Overview”.
- The logged-out exercise HTML contains “Instructions” and does not contain “Editor” or “Your solution”. The in-browser editor was not shown.

**Khan Academy course page** — [https://www.khanacademy.org/math/algebra](https://www.khanacademy.org/math/algebra)

- Canonical URL is the algebra course. Body text includes “Algebra 1”, “17 units”, “Unit 1 Algebra foundations”, “Unit 2 Solving equations & inequalities”, and further units.
- The global header is still the one from the homepage (Explore, search, Donate, Log in, Sign up, Open menu), plus the external-resource warning and the teachers line. No exercise player, video chrome, or next/previous control was identified. A video or skill page was not opened.

**freeCodeCamp curriculum** — [https://www.freecodecamp.org/learn](https://www.freecodecamp.org/learn)

- Same site header as the homepage. The page is the curriculum catalog (“Sign in to save your progress” is body text). Certification links include `/learn/responsive-web-design-v9/`, `/learn/javascript-v9/`, `/learn/full-stack-developer-v9/`, and `/learn/daily-coding-challenge/10-09`. An individual step was not opened, so the step runner (check, previous, next, editor) was not observed.

**Coursera course marketing page** — [https://www.coursera.org/learn/machine-learning](https://www.coursera.org/learn/machine-learning)

- Same global header: For Individuals / For Businesses / For Universities / For Governments, Explore, Degrees, search, Log In, Join for Free, Open Navigation Menu.
- Page body is the course sales page: “Enroll for free”, “Starts Oct 9”, “1,258,088 already enrolled”, “3 modules”. Buttons “Previous” and “Next” are with “Categories” and instructor UI, not a lesson study bar. The lecture player was not shown logged out.

**Codecademy course marketing page** — [https://www.codecademy.com/learn/learn-python-3](https://www.codecademy.com/learn/learn-python-3)

- Title “Learn Python 3 | Codecademy”. Header buttons match the homepage (Catalog through Pricing, Search, Site navigation, Log In, Sign Up). The interactive lesson runner was not shown.

**Master.dev course page** — [https://master.dev/courses/next-js-v4/](https://master.dev/courses/next-js-v4/)

- Same marketing header: Paths, Courses, Blog, Features, Pricing, Live, Search, Join Now, Login.
- Body is a course description (“Next.js Fundamentals, v4”, “Scott Moss”, “6 hours, 41 minutes”) with a “Play video” button. The logged-in player was not shown.

**Boot.dev course page** — [https://www.boot.dev/courses/learn-python-beginners](https://www.boot.dev/courses/learn-python-beginners)

- Uses the fuller menu described above, not the homepage’s “For Business / For Schools / Sign In & Skip Demo” bar. No lesson exercise bar was rendered. A “WRITE SOME CODE” control and “Browse Lessons” are on the page. The Prev/Next control is the review carousel.

**Brilliant catalog** — [https://brilliant.org/courses/](https://brilliant.org/courses/)

- Header gains “Topics”, “Sign in”, and “Sign up” versus the homepage’s logo + Sign in. Topic chips sit with that bar. A lesson canvas was not opened.

**Odin paths** — [https://www.theodinproject.com/paths](https://www.theodinproject.com/paths)

- Same header as the homepage. The paths HTML that rendered contained no `/lessons/` links, so a lesson page was not opened.

**Duolingo** — [https://www.duolingo.com/learn](https://www.duolingo.com/learn) stayed on the marketing header. No lesson bar.

### Inferences

- For written technical reading, the stable pattern among pages that actually opened is: do not swap the global header for a study bar. Add a local trail (breadcrumb or side list) and put previous/next at the article boundary. javascript.info, MDN, and web.dev all do that.
- roadmap.sh keeps the global header on a roadmap and adds a second, page-level switcher (Roadmap / Projects / AI Tutor / Personalize) because the “lesson” is a diagram, not a chapter.
- CS50 treats the week list as the course chrome on every page, including the syllabus home and a week page. That menu is the study navigation. It is collapsed behind “Menu” below the `lg` breakpoint (`d-lg-block`) rather than removed.
- Products whose value is a player (DeepLearning.AI learn, and the unopened players for Coursera, Master.dev, Codecademy, Duolingo, Khan skills) either replace the marketing header once you are in the player, or they never let a logged-out visitor see the player. Only the DeepLearning.AI case was directly visible.
- Hide-on-scroll cannot be asserted for any of these. Nothing in the fetched DOM was a scroll position.

### Gaps

- No logged-out step/player was observed for freeCodeCamp steps, Khan videos or exercises, Duolingo lessons, Codecademy exercises, Coursera lectures, Master.dev or Frontend Masters video lessons, Brilliant lessons, Boot.dev exercises, Odin lessons, Scrimba lessons, DataCamp exercises, or LeetCode problems.
- Exercism’s editor after “start” was not in the logged-out HTML.
- Previous/next on javascript.info was located by text order (near comments), not by a screenshot, so a second copy at the top of the article is possible and was not separately confirmed.
- No scroll test, so sticky-hide behavior is unknown on every site.

## Which sites are the clearest reference for a public, self-paced, mostly written technical library (many lessons in tracks), as opposed to a video LMS or a gamified app?

### Takeaway

The pages that both read as written tracks and still showed their chrome logged out are javascript.info, MDN Learn, and web.dev Learn. The Odin Project, freeCodeCamp, roadmap.sh, and CS50x are the nearest public curriculum sites, with the caveats below. Coursera, Master.dev, and the DeepLearning.AI player are video or course-shell products. Duolingo, Brilliant, and Boot.dev present themselves as games or tutors, not as reading libraries.

### Cited Findings

- javascript.info calls itself “The Modern JavaScript Tutorial” and splits the tutorial into “Part 1 The JavaScript language”, “Part 2 Browser…”, and “Part 3 Additional articles”. An article such as Variables is a written page with “Previous lesson” and “Next lesson”. No account control is in the toolbar. [https://javascript.info/](https://javascript.info/) [https://javascript.info/variables](https://javascript.info/variables)
- MDN Learn is a set of written docs pages under the same MDN header as the reference. “Your first website” has “In this article” and a Previous link back to “Getting started”. [https://developer.mozilla.org/en-US/docs/Learn_web_development](https://developer.mozilla.org/en-US/docs/Learn_web_development) [https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website)
- web.dev Learn is a list of written courses (HTML, CSS, JavaScript, Accessibility, Performance, and others). A chapter has a side list, “On this page”, and Previous/Next. The chapter can be copied as markdown. [https://web.dev/learn](https://web.dev/learn) [https://web.dev/learn/html/document-structure](https://web.dev/learn/html/document-structure)
- The Odin Project homepage says “Our full stack curriculum is free” and the paths page is “All Paths”, including “Foundations” and “Full Stack JavaScript” (“7 Courses”). The header is paths, about, community, support, theme, sign in. A lesson body was not opened. [https://www.theodinproject.com/](https://www.theodinproject.com/) [https://www.theodinproject.com/paths](https://www.theodinproject.com/paths)
- freeCodeCamp’s public curriculum page lists multi-course certifications (Responsive Web Design, JavaScript, Front-End Development Libraries, Python, Relational Databases, Back End, Full Stack Developer) and says progress is saved by signing in, which is optional for reading the catalog. The step UI was not opened. Search placeholder says “books and courses”. [https://www.freecodecamp.org/learn](https://www.freecodecamp.org/learn)
- roadmap.sh is roadmaps and guides, not a chapter novel. The frontend page is “Step by step guide to becoming a modern frontend developer in 2026” with Roadmap / Projects / AI Tutor switches and optional progress (“Sign up free”). [https://roadmap.sh/frontend](https://roadmap.sh/frontend)
- CS50x 2026 is a public course outline of weeks (Scratch, C, Arrays, Algorithms, Memory, Data Structures, Python, SQL, HTML/CSS/JavaScript, Flask) plus written syllabus pages. It also points at lectures, Ed Discussion, and edX. It is mixed, not prose-only. [https://cs50.harvard.edu/x/](https://cs50.harvard.edu/x/)
- Exercism is tracks of exercises (“Practice”, “Learn” concepts) with a public exercise page and no logged-out editor. It is practice-first, not a long reading track. [https://exercism.org/tracks/javascript](https://exercism.org/tracks/javascript)
- Codecademy Docs is a written reference (“Topics”) under the course-marketing header, separate from the “Learn Python 3” sales page. The interactive course runner was not shown. [https://www.codecademy.com/resources/docs/python](https://www.codecademy.com/resources/docs/python) [https://www.codecademy.com/learn/learn-python-3](https://www.codecademy.com/learn/learn-python-3)
- Coursera’s machine-learning URL is a sales page (“Enroll for free”, modules, “16 hours to complete”) under the global marketing header. [https://www.coursera.org/learn/machine-learning](https://www.coursera.org/learn/machine-learning)
- Master.dev course pages are video-course marketing (“6 hours, 41 minutes”, “Play video”) under Paths / Courses / Pricing / Login. [https://master.dev/courses/next-js-v4/](https://master.dev/courses/next-js-v4/)
- DeepLearning.AI’s public marketing header sells courses; the learn host is a video/notebook player with Previous lesson, Syllabus, and a login wall. [https://www.deeplearning.ai/](https://www.deeplearning.ai/) [https://learn.deeplearning.ai/courses/ai-python-for-beginners/lesson/z57gn/introduction](https://learn.deeplearning.ai/courses/ai-python-for-beginners/lesson/z57gn/introduction)
- Duolingo’s rendered marketing copy says “game-like features” and the header is Get started / I already have an account. [https://www.duolingo.com/](https://www.duolingo.com/)
- Brilliant’s homepage title is “Your Personal Tutor for Math and Coding” and the hero text says “Meet Koji, your personal tutor”. The homepage header is logo and Sign in. [https://brilliant.org/](https://brilliant.org/)
- Boot.dev’s homepage says “Stay motivated with a game-like curriculum” and “WRITE SOME CODE”. The course page adds sound-effects and a game-like menu, not a reading header. [https://www.boot.dev/](https://www.boot.dev/) [https://www.boot.dev/courses/learn-python-beginners](https://www.boot.dev/courses/learn-python-beginners)
- DataCamp’s fetched homepage describes “Short videos are broken up by interactive exercises” and career tracks. Header itself was incomplete. [https://www.datacamp.com/](https://www.datacamp.com/)

### Inferences

- Clearest header references for a public written track library are javascript.info (reading chrome, no account), MDN Learn (docs header plus article trail), and web.dev Learn (course side list plus article trail, still the docs header).
- Odin and freeCodeCamp are the closest “many lessons in tracks, account optional” curricula, but their in-lesson headers were not observed, so they are references for the catalog header only.
- roadmap.sh is the reference for a roadmap surface that stays public and puts progress behind sign-up, not for long-form chapters.
- CS50x is the reference for a single-course outline that is always on screen, not for a multi-track reading library.
- Coursera, Master.dev, and DeepLearning.AI learn are the contrast class: catalog or player for video courses. Duolingo, Brilliant, and Boot.dev are the contrast class for game or tutor products.

### Gaps

- Scrimba, LeetCode, and DataCamp could not be classified from a real header. DataCamp’s body copy is enough to call the product video-plus-exercise, not enough to describe its header.
- Odin lesson pages and freeCodeCamp steps might still change the header once opened. That was not checked.
- “Mostly written” for Odin and freeCodeCamp is taken from their catalog copy and page type, not from reading a full lesson in this pass.

## What do the strongest sites refuse to put in the header?

### Takeaway

On the written public sites whose headers rendered, the header does not carry progress, streaks, continue/resume, pricing, or an AI chat. Next and previous are kept out of the global bar. Account is either absent or a single sign-in. The busy items show up instead on the video and marketplace sites, or one step inside the product.

### Cited Findings

- javascript.info’s toolbar has search, theme, language, ebook purchase, tutorial map, and share. It has no account, no progress, no continue, and no pricing. Previous/next are on the article, not the toolbar. [https://javascript.info/variables](https://javascript.info/variables)
- MDN’s header is logo, search, and the reference menu (HTML, CSS, JavaScript, Web APIs, All, Learn, Tools, About). No progress and no continue. No “Sign in” / “Log in” string in the rendered header. Previous is on the article. [https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website)
- web.dev Learn’s header is Resources, More, search, and language. The chapter’s previous/next and “On this page” are outside that header. No progress control was in the header. [https://web.dev/learn/html/document-structure](https://web.dev/learn/html/document-structure)
- Odin’s header is logo, All Paths, About, Community, Support us, Sign in, Light mode, Get Started. No search, no progress, no pricing, no language menu. [https://www.theodinproject.com/](https://www.theodinproject.com/)
- freeCodeCamp’s header is search, language, a menu (Donate, Curriculum, Catalog, Forum, News, Radio, Contribute, Podcast, Night Mode), and Sign in. Progress is mentioned only in the curriculum body (“Sign in to save your progress”), not as a header meter. [https://www.freecodecamp.org/learn](https://www.freecodecamp.org/learn)
- Exercism’s header is an announcement, Learn / Discover / Contribute / More, language, Sign up, Log in. No progress meter. [https://exercism.org/](https://exercism.org/)
- roadmap.sh’s header on a roadmap is section links, Upgrade, Login, Sign Up, and ⌘K search. The progress count and “Sign up free” are in the roadmap body, not a completion bar in the header. Personalize is a page switch, not a global progress control. [https://roadmap.sh/frontend](https://roadmap.sh/frontend)
- CS50x’s header is the course title, Donate, and the instructor, plus the week menu. It does not show a completion percent or a continue button. [https://cs50.harvard.edu/x/weeks/0/](https://cs50.harvard.edu/x/weeks/0/)
- By contrast, items those libraries leave out are present elsewhere: Coursera puts “Ask Coursera”, Explore, Degrees, search, Log In, and Join for Free in the header, plus an audience row. [https://www.coursera.org/](https://www.coursera.org/) Codecademy puts For Individuals / For Students / For Business, Catalog, Pricing, Search, Log In, and Sign Up in the header. [https://www.codecademy.com/](https://www.codecademy.com/) Master.dev puts Pricing, Live, Search, Join Now, and Login in the header. [https://master.dev/](https://master.dev/) Boot.dev’s course header includes Pricing, Leaderboard, sound effects, and Sign In. [https://www.boot.dev/courses/learn-python-beginners](https://www.boot.dev/courses/learn-python-beginners)
- Brilliant’s homepage header contains neither a catalog nor search: logo and “Sign in” only. [https://brilliant.org/](https://brilliant.org/) Duolingo’s logged-out header contains neither search nor a course list: language, “Get started”, “I ALREADY HAVE AN ACCOUNT”. [https://www.duolingo.com/](https://www.duolingo.com/)
- DeepLearning.AI removes Courses / News / Blog / Membership / For Business once the lesson URL is open, and does not put a progress percent in the study bar that rendered. The study bar has sidebar toggle, previous lesson, syllabus, and log in. [https://learn.deeplearning.ai/courses/ai-python-for-beginners/lesson/z57gn/introduction](https://learn.deeplearning.ai/courses/ai-python-for-beginners/lesson/z57gn/introduction)

### Inferences

- “Refuse” here is an absence across the written public headers, not a sentence any of these sites publishes. The repeated absences are: progress percent, streak or XP, continue/resume, hearts or energy, a pricing menu, and an AI assistant in the bar.
- Search is not refused. MDN, javascript.info, web.dev, freeCodeCamp, and roadmap.sh all put search in the header. Odin, Exercism, Brilliant’s homepage, and Duolingo’s logged-out page do not.
- Theme is not a rule. javascript.info puts Light theme and Dark theme in the toolbar. freeCodeCamp puts Night Mode inside the menu. Odin puts a theme link in the bar. MDN’s theme control was not labeled in this pass.
- Language is common on the international or docs sites (javascript.info, freeCodeCamp, Exercism, web.dev, Duolingo) and absent on the single-language curricula observed (Odin, CS50x’s main bar, Khan’s observed header, Master.dev, Coursera’s observed header).
- Announcements are rare in the header. Exercism pins one (Jiki). CS50x puts certificate and translation lines above the week page header. Khan puts a teachers line above the nav. The others that rendered keep promotions in the page, not the bar.
- Next/previous is refused as a global-header item on every written article that opened. It is article chrome. The DeepLearning.AI player is the exception that puts “Previous lesson” in the study bar, and that bar exists only because the marketing header is gone.

### Gaps

- Logged-out observation cannot show what these headers add after login (continue, avatar, progress). Absence of continue/progress is an absence in the logged-out header only.
- MDN theme and account labels, Scrimba, LeetCode, and DataCamp headers are unknown, so they are not evidence for this question.
- No site’s changelog or design post was needed; the absences are from the live headers. No source was found in which a product team states a header rule in prose, and none was sought beyond the pages themselves.
