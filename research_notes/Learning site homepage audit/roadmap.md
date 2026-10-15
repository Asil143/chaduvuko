# roadmap.sh homepage body (logged out, 2026-10-09)

Observed on the live homepage only, [https://roadmap.sh/](https://roadmap.sh/), title "Developer Roadmaps - roadmap.sh". Headless Chrome, logged out, CSS viewports 1440×900, 390×844, and 320×700. A CookieYes dialog covered the lower left of the first 1440 paint ("We value your privacy", buttons Customise, Reject All, Accept All). It was dismissed with Reject All before the clean shots. The 390 and 320 shots in the same profile were taken after that consent was stored, so they are not covered. Shots are in `research_notes/Learning site homepage audit/roadmap-shots/`. This note is the body under the header. It does not re-audit the header, the Data Engineer graph, or the Git pack.

Default document height on the Roadmaps tab: 5293px at 1440, 8765px at 390, 9102px at 320. There is no "Start learning" control and no written lesson in the hero.

## What are the homepage sections in order, with the actual headings and counts?

### Takeaway

The default page is a hero, then one tablist named "Browse", then three counted roadmap groups, then Guides, then a changelog, then a registration pitch. Lesson packs and project ideas are not sections in that scroll. They are hidden panels of the same tablist. Role roadmaps, skill roadmaps, and best-practice roadmaps share one card style. Packs and guides do not.

### Cited Findings

- Order on the default Roadmaps tab, from the rendered DOM. Hero H1 "Developer Roadmaps". Dek "Skill up with community created roadmaps, guides, and courses." Search placeholder "What do you want to learn today?" Helper "Search available roadmaps or learn anything with AI." Tablist `aria-label="Browse"`: "Roadmaps" (`aria-selected="true"`, `aria-controls="browse-panel-roadmaps"`), "Lesson Packs" with a yellow "New" badge (`browse-tab-packs`), "Project Ideas" (`browse-panel-projects`). Then H2 "Role-based" with the count 31, H2 "Skill-based" with 59, H2 "Best Practices" with 5, H2 "Guides", then "Actively Maintained", then "Join the Community", then the footer. Heading positions at 1440: Role-based y=482, Skill-based y=1236, Best Practices y=2548, Guides y=2808. — [roadmap.sh](https://roadmap.sh/), `roadmap-shots/home-1440.png`, `home-1440-roles.png`, `home-1440-skills.png`, `home-1440-practices.png`, `home-1440-guides.png`, `home-1440-community.png`
- "Role-based" is 31 links and no sentences. The count 31 matches the links, not the purple button in front of them. Order: Frontend (`/frontend`), Backend, Full Stack, Android, DevOps, DevSecOps, Data Analyst, SEO (New), Inference Engineering (New), AI Engineer (`/ai-engineer`), AI and Data Scientist, Data Engineer (`/data-engineer`), Machine Learning (`/machine-learning`), Product Design, PostgreSQL (`/postgresql-dba`), iOS, Blockchain, QA, Software Architect, Cyber Security (`/cyber-security`), UX Design, Technical Writer, Game Developer, Server Side Game Developer, MLOps, Product Manager, Engineering Manager, Developer Relations, BI Analyst, Network Engineer, Forward Deployed Engineer. Each visible card is a title plus a 14×14 "Add to favorites" control. PostgreSQL is in this role list, not under Skill-based. — [roadmap.sh](https://roadmap.sh/), `home-1440-roles.png`
- "Skill-based" is 59 title-only links, same card chrome, counted 59. It starts Claude Code, Vibe Coding, Python, Python for Data Analysis, R Programming, Computer Science, SQL, OpenClaw, React, and ends Ruby, Ruby on Rails, Scala. "Best Practices" is 5 title-only links, counted 5: AWS (`/aws-best-practices`), API Security, Backend Performance, Frontend Performance, Code Review. Those five use the same dark title card as the roles. Nothing on the card says "best practice" except the heading above the group. — [roadmap.sh](https://roadmap.sh/), `home-1440-skills.png`, `home-1440-practices.png`
- Lesson packs are panel `#browse-panel-packs`, `hidden` while Roadmaps is selected. The panel's own intro, read from the DOM at 1440, is "Short lessons, hands-on projects and an AI tutor, written by the roadmap.sh team. Every pack starts with free lessons." Six real links, each with a one-line dek: Git Fundamentals (`/packs/git`, "Learn enough Git to work confidently on real projects with a team.", "New", "Added Sep 14", "14" lessons, "Explore pack"); Internet Fundamentals (`/packs/internet`, "How the internet actually works: DNS, HTTP, hosting, and browsers.", 6 lessons); HTML Fundamentals (8 lessons, 6 projects, "Enough HTML to read, write, inspect, and understand real web pages."); CSS Fundamentals (20 lessons, 6 projects); JavaScript Foundations (15 lessons, 15 projects); Build CLI Apps with Node.js (21 lessons, 9 projects, "Learn how to build practical CLI apps with Node.js and npm"). Four more are text only, labeled "Coming soon", and are not links: Linux and the Command Line, Docker Fundamentals, Build APIs with Node.js, RegEx for Everyone. At 390 and 320, after the tab is selected, the visible line above the cards is different: "Included with Pro. Every pack starts with free lessons, so you can try before you upgrade." — [roadmap.sh](https://roadmap.sh/), `home-390-tab-lesson.png`, `home-320-tab-lesson.png`
- Project ideas are panel `#browse-panel-projects`, also hidden on the default tab. Seven title-only links, no count, no dek, no H2: Frontend (`/frontend/projects`), Backend, DevOps, HTML, CSS, JavaScript, Node.js. The words Frontend, HTML, CSS, JavaScript, and Node.js are the same words used for roadmaps. — [roadmap.sh](https://roadmap.sh/), `home-390-tab-project.png`
- "Guides" is an H2 under whichever panel is open, not a fourth tab. Fourteen links, then "View All Guides →" (`/guides`). Seven are articles tagged "Textual" and seven are tagged "Question". The tag node is `class="hidden text-xs text-gray-500 capitalize sm:block"`. At 1440 those words are `display:block` (Textual about 40×16, Question about 51×16). At a 390-wide viewport they are `display:none`. Desktop rows, in order: "How to Set Environment Variables in Python (Step-by-Step)" with "NEW · SEPTEMBER" and Textual (`/python/set-environment-variable`); "Linked Lists vs Python Lists: When to Use Each"; "Merge Sort in Python: Step-by-Step Guide + Code"; "Claude Cowork vs. Code vs. Chat: When to use each"; "OpenClaw vs. Claude Code: Which AI agent fits your workflow?"; "Claude Code vs GitHub Copilot: Which Should You Pick?"; "Python Remove from List: Full Guide + Examples"; then Question rows "Top 60+ Angular Interview Questions (and answers)" (`/questions/angular`), "Top 60+ Spring Boot Interview Questions and Answers", "Top 50 Kubernetes Interview Questions and Answers", "30 C++ Interview Questions and Answers (+Quiz!)", "Top 30 System Design Interview Questions (+ Quiz!)", "Top 37 REST API Interview Questions (and Answers)", "Top 20 Python Interview Questions and Answers". No count sits next to the Guides heading. — [roadmap.sh](https://roadmap.sh/), `home-1440-guides.png`, `home-390-guides.png`, `home-320-guides.png`
- "Actively Maintained" then "We are always improving our content, adding new resources and adding features to enhance your learning experience." Ten dated rows, newest first: "17 Sep, 2026 New Roadmaps, Lesson Packs and UX/UI updates"; "17 Aug, 2026 2 Roadmaps, Newsletter Page"; "13 Jul, 2026 Lesson Packs, 4 new Roadmaps, Cyber Newsletter"; "25 May, 2026 Network Engineer, Python Guides, Newsletters"; "28 Apr, 2026 OpenClaw, LeetCode and Newsletters"; "26 Mar, 2026 Scala Roadmap, AI Engineer Review"; "27 Feb, 2026 Claude Code, Vibe Coding and AI in Guides"; "30 Jan, 2026 Ruby, Rails, Django and Reviews"; "31 Dec, 2025 Elasticsearch, WordPress, DevsecOps and AI in Guides"; "18 Nov, 2025 Swift & SwiftUI, Shell/Bash, Laravel and Feedback Button". Then "View Full Changelog" (`/changelog`) and "Subscribe for Notifications". — [roadmap.sh](https://roadmap.sh/), `home-390-guides.png`
- "Join the Community" says roadmap.sh is "the 6th most starred project on GitHub" and "is visited by hundreds of thousands of developers every month." The same block then says "Rank 7th out of 28M!" The three figures are "369K GitHub Stars" ("+90k every month", "Star us on GitHub / Help us reach #1"), "+3.2M Registered Users" ("+2k every month", "Register yourself / Commit to your growth", `/signup`), and "52K Discord Members" ("Join on Discord / Join the community"). Footer links under that: Roadmaps, Guides, FAQs, YouTube, then "roadmap.sh by @nilbuild" and "Community created roadmaps, best practices, projects, articles, resources and journeys to help you choose your path and grow in your career." — [roadmap.sh](https://roadmap.sh/), `home-1440-community.png`

### Inferences

- The page uses four objects and only labels them if you already know where to look. A role roadmap, a skill roadmap, and a best-practice roadmap are the same title card. A pack is a different object, but only inside a hidden panel: a sentence, a lesson count, sometimes a project count. A guide is a third object, an article or an interview list, and it sits under the panel rather than in the tablist. Project ideas are a fourth list that reuses roadmap names with no word "project" on the card.
- A counted list of 31 roles is the whole of the Role-based section. The count is honest and still does not pick a job. SEO, PostgreSQL, Product Manager, and Data Engineer are the same kind of row.

### Gaps

- The Lesson Packs and Project Ideas tabs did not switch in headless Chrome at 1440. `aria-selected` stayed on Roadmaps after a hit-tested click, Enter on the focused tab, and `HTMLElement.click()`. The same buttons did switch at 390 and 320, and the desktop panels were read while `hidden`. Desktop column layout of the pack panel was not screenshotted.
- "Add to favorites" was not clicked, so it is unknown whether that icon asks for an account.
- "Learn with AI" is a `<button>` with no `href`. A click in the last session returned no page result, so where that button goes was not observed.

## What is on the first screen, and is the first action "search", "pick a role", or "start a written lesson"?

### Takeaway

The first action is search. There is no control that starts a written lesson. Picking a role is the grid under the search, and the first cell of that grid is "Learn with AI", not a job.

### Cited Findings

- At 1440×900, after Reject All, the first screen is the header, then H1 "Developer Roadmaps" (y=148, 48px tall), the dek, a search field 834×32 (y=268) whose placeholder is "What do you want to learn today?" with a "⌘ K" badge inside the field, the line "Search available roadmaps or learn anything with AI.", the three tabs (Roadmaps underlined, y=396), H2 "Role-based" and the count 31, the purple "Learn with AI" button (307×54), and a 3-column grid of 307px title cards. Readable cards reach the PostgreSQL / iOS / Blockchain row (y=824). The next row starts at y=886, so only about 14px of it is inside the 900px viewport. — [roadmap.sh](https://roadmap.sh/), `home-1440.png`
- Before Reject All, the same 1440 viewport has the cookie card over the lower left, covering the left column of the grid. Data Engineer is the left card of the row at y=762, so the dialog sits on that card until it is dismissed. — [roadmap.sh](https://roadmap.sh/), `home-1440-cookie.png`
- The search field is a real input, `data-site-search="true"`, placeholder "What do you want to learn today?", not read-only. Typing "data engineer" with key events left those words in the field and left the full Role-based grid in place, including Frontend and Backend. Pressing Enter stayed on `https://roadmap.sh/`. No result dialog appeared. Meta+K in the same session also did not open a dialog. The only `[role=dialog]` node present was the empty CookieYes preference center. — [roadmap.sh](https://roadmap.sh/), `home-1440-search2.png`, `home-1440-cmdk.png`, `home-1440-search-enter.png`
- "Learn with AI" is the only filled button in the catalog. It is the first cell of Role-based, wider treatment than the role cards, and it is not one of the 31. The role cards on the first screen have no second line. — [roadmap.sh](https://roadmap.sh/), `home-1440.png`
- The header nav is `position: static`. It is not what sticks. The Browse tablist is `position: sticky; top: 0`. At scrollY 0 it sits at y=384, height 50. At scrollY 600, 1400, and 2600 it is pinned at y=0 while the nav is off the top (y=-568 at scrollY 600). The pinned text is "Roadmaps Lesson Packs NEW Project Ideas". — [roadmap.sh](https://roadmap.sh/), `home-1440-roles.png`, `home-1440-skills.png`

### Inferences

- Someone landing here is asked to search, or to scan a catalog, or to tap "Learn with AI". They are not asked to start reading. The dek names "roadmaps, guides, and courses" in one breath, and the first screen shows only role titles.
- The sticky tablist becomes a second bar. The header leaves, and this bar takes the top. That is the opposite of a single header that stays put.

### Gaps

- Key events were dispatched from Chrome DevTools, not from a physical keyboard. The field showed "data engineer" and the page did not respond. It is still possible a human ⌘K, which did not open anything in this session, opens a palette on a normal browser. That was not observed on this homepage load.
- Where "Learn with AI" goes was not observed.

## Where do Data Engineer, AI Engineer, Machine Learning, and Cyber Security sit?

### Takeaway

All four are ordinary cells in the Role-based list of 31. None is featured, none has a sentence, and none is named the way Chaduvuko names the job. On a 1440×900 screen, Data Engineer, AI Engineer, and Machine Learning are on the first screen only because the grid is three columns. Cyber Security is not readable there. On a phone all four are below the first screen.

### Cited Findings

- Names and URLs, in list order. AI Engineer is the 10th role link, `/ai-engineer`. Data Engineer is the 12th, `/data-engineer`. Machine Learning is the 13th, `/machine-learning`, not "ML Engineer". Cyber Security is the 20th, `/cyber-security`, not "Cybersecurity Analyst". The only "New" marks in the role grid are SEO and Inference Engineering. These four have none. — [roadmap.sh](https://roadmap.sh/), `home-1440-roles.png`
- At 1440 the grid is three columns. AI Engineer is y=700, center column, same row as Inference Engineering and AI and Data Scientist, fully inside the 900px viewport. Data Engineer and Machine Learning are the next row, y=762, left and center, with Product Design on the right. That row ends at y=816, so it is fully on the first screen. Cyber Security is y=886, right column, same row as QA and Software Architect. A 900px viewport shows about 14px of that row. The clean first-screen shot does not show the words Cyber Security. — [roadmap.sh](https://roadmap.sh/), `home-1440.png`, `home-1440-roles.png`
- At 390 the list is one column, cards about 358×46. First screen (844px tall) runs through the hero, "Role-based" and 31, "Learn with AI", Frontend, Backend, Full Stack, Android, DevOps, DevSecOps, and Data Analyst (y=808). AI Engineer is y=970. Data Engineer is y=1078. Machine Learning is y=1132. Cyber Security is y=1510. A shot scrolled to the role heading shows Data Engineer as a plain row under "AI and Data Scientist", with Machine Learning cut off at the bottom. — [roadmap.sh](https://roadmap.sh/), `home-390.png`, `home-390-roles.png`
- At 320 the same column is about 288px wide. The first screen (700px) stops at Android (y=666). AI Engineer is y=990, Data Engineer y=1098, Machine Learning y=1152, Cyber Security y=1530. — [roadmap.sh](https://roadmap.sh/), `home-320.png`
- Nothing in these cards says what the person would read, how long it is, or that the next click is a graph rather than a lesson. The href is the only distinction. — [roadmap.sh](https://roadmap.sh/)

### Inferences

- Being on the desktop first screen is an accident of a 3-column sort. Data Engineer is twelfth of 31, after Frontend, Backend, Full Stack, Android, DevOps, DevSecOps, Data Analyst, SEO, Inference Engineering, AI Engineer, and AI and Data Scientist. That is not a featured job. Cyber Security is further down, paired visually with QA and Software Architect.
- Chaduvuko's four named jobs with one line each are a different object from this grid. Copying the grid would bury the job the person already chose inside titles that have nothing to do with it.

### Gaps

- The favorite control on these cards was not clicked.
- The cards were not followed. This note stops at the homepage href.

## At 390px and 320px, what remains of that structure, and does the page still tell you the difference between a roadmap, a pack, and a guide?

### Takeaway

The headings and the three tabs survive. The difference does not, unless the person switches tabs. On the default tab a phone is a single column of title cards, Guides is thousands of pixels down, and the Textual / Question labels are removed. At 320 the third tab is clipped to "Projec".

### Cited Findings

- At 390×844 the first screen still shows H1 "Developer Roadmaps", the dek wrapping to two lines, the full placeholder "What do you want to learn today?", the helper on one line, and all three tabs: Roadmaps (underlined), Lesson Packs with NEW, Project Ideas. Then "Role-based" and 31, "Learn with AI", and title rows from Frontend through Data Analyst. No pack sentence and no Guides heading. The "⌘ K" badge is not in that field. — [roadmap.sh](https://roadmap.sh/), `home-390.png`
- At 320×700 the same stack is tighter. The placeholder is visually cut off ("What do you want to learn today" with no room for the question mark; the DOM placeholder is still the full string). The helper wraps to two lines and is 40px tall, against 20px at 1440 and 390. The tab row is `overflow-x-auto`, `whitespace-nowrap`, `shrink-0` buttons. Measured buttons: Roadmaps x=16 w=68, Lesson Packs x=108 w=132, Project Ideas x=264 w=84. The third button's right edge is x=348 on a 320px screen. The shots show the label cut to "Projec" both at the top of the page and in the sticky bar. Role cards are x=16 w=288, so the cards themselves fit. The first screen ends at Android. — [roadmap.sh](https://roadmap.sh/), `home-320.png`, `home-320-skills.png`, `home-320-guides.png`, `home-320-tab-project.png`
- Default-tab heading positions. At 390: Role-based y=390, Skill-based y=2190, Best Practices y=5440, Guides y=5794, page height 8765. At 320: Role-based y=410, Skill-based y=2210, Best Practices y=5460, Guides y=5814, page height 9102. The counts 31, 59, and 5 still sit on the right of those headings. Skill cards remain title plus bookmark. A 320 shot of Skill-based shows "Skill-based" and 59, then Claude Code through Angular, one per row, while the sticky tabs still read "Projec". — [roadmap.sh](https://roadmap.sh/), `home-320-skills.png`, `home-390-roles.png`
- Switching tabs does change the body, and it was screenshotted at both phone widths. Lesson Packs at 390 and 320 replaces the role list with the Pro sentence and pack cards. Git Fundamentals is on that first screen: yellow "NEW", "Added Sep 14", the dek "Learn enough Git to work confidently on real projects with a team.", "14 lessons", and "Explore pack →". Internet Fundamentals follows with its dek and "6 lessons". Page height drops (5346 at 390, 5708 at 320). Guides then sits at y=2375 (390) or y=2420 (320), still below the packs, not on that first screen. — [roadmap.sh](https://roadmap.sh/), `home-390-tab-lesson.png`, `home-320-tab-lesson.png`
- Project Ideas at 390 shows seven title rows and then the word "Guides" at the bottom edge (Guides H2 y=820 in an 844px viewport; page height 3791). At 320 the first screen of that tab shows Frontend, Backend, DevOps, HTML, and CSS, with JavaScript cut off. Node.js and the Guides heading (y=840) are below the 700px viewport. The cards do not say "project". — [roadmap.sh](https://roadmap.sh/), `home-390-tab-project.png`, `home-320-tab-project.png`
- Guides on a phone keep the H2 "Guides" and the article titles, a green "NEW" on the first row, a chevron, and "View All Guides →". They drop the words that tell the rows apart. "Textual" and "Question" are `display:none` at width 390. The 320 guides shot shows the same chevron rows and the clipped "Projec" tab, with titles wrapping to two or three lines. — [roadmap.sh](https://roadmap.sh/), `home-390-guides.png`, `home-320-guides.png`
- The sticky tab bar is the top of the scrolled phone shots. The logo row is gone. At 390 the scrolled bar has room for "Project Ideas". At 320 it does not. — [roadmap.sh](https://roadmap.sh/), `home-390-roles.png`, `home-320-skills.png`

### Inferences

- A phone can still see that three catalogs exist, but only as tab labels, and at 320 one of those labels is cut off. It cannot see, on the default first screen, a pack's sentence or a guide's type. The structural difference is real in the DOM and invisible until a tab is hit or until the person scrolls past about 31 + 59 + 5 title rows.
- Reusing Frontend, HTML, and Node.js as project cards, with no dek, means the Project Ideas panel does not explain itself. The underlined tab is the only label, and at 320 that label does not fit.

### Gaps

- The tab strip was not dragged sideways at 320. The buttons extend past the viewport and the strip is `overflow-x-auto`, but a finger scroll of that strip was not performed.
- Desktop width of the pack and project panels was not screenshotted, as recorded above.
- A real phone browser chrome (Safari toolbars) was not added on top of these CSS viewports. The page area would be shorter than 844 and 700.

## What would someone who already chose Data Engineer do in the first 10 seconds?

### Takeaway

On a wide screen they can click the title if they spot it in the grid, after moving the cookie dialog that covers it. On a phone the title is not on the first screen, and the search box did not bring it up. Nothing in those 10 seconds opens a written Data Engineer lesson, because the homepage has no such control.

### Cited Findings

- The only Data Engineer object on the page is the Role-based card, href `/data-engineer`, title "Data Engineer", no dek. It is twelfth of the 31 role links. At 1440 it is on the first screen at y=762, left column, same weight as Product Design beside it, and the cookie dialog covers that column until Reject All. — [roadmap.sh](https://roadmap.sh/), `home-1440.png`, `home-1440-cookie.png`
- Putting "data engineer" in the hero field did not filter the 31, did not scroll to the card, and did not open a result list. Enter left the URL at `https://roadmap.sh/`. The helper still said "Search available roadmaps or learn anything with AI." — [roadmap.sh](https://roadmap.sh/), `home-1440-search2.png`, `home-1440-search-enter.png`
- At 390 the card is at y=1078. The first screen is search, "Learn with AI", and Frontend through Data Analyst. Reaching Data Engineer means scrolling past those titles. The scrolled shot shows it as one more full-width row. At 320 it is at y=1098, and the first screen stops at Android, so the scroll is longer. The search placeholder is clipped, and it is the same field that did not isolate the role at desktop width. — [roadmap.sh](https://roadmap.sh/), `home-390.png`, `home-390-roles.png`, `home-320.png`
- "Learn with AI", the purple first cell, is above Data Engineer at every width. SEO and Inference Engineering, the rows with "New", are also above it. The page gives those more ink than the job this person already named. — [roadmap.sh](https://roadmap.sh/), `home-390-roles.png`
- A written-lesson card for Data Engineer is not on the homepage. The written-lesson cards that exist are in the hidden Lesson Packs panel, and they are Git, Internet, HTML, CSS, JavaScript, and a Node CLI, plus four "Coming soon" titles. None is Data Engineer. — [roadmap.sh](https://roadmap.sh/), `home-390-tab-lesson.png`

### Inferences

- Ten seconds on a phone is a scroll through other people's job titles, or a search box that did not answer. Ten seconds on a desktop can be a click, but only after the cookie card is gone, and the click target looks like every other role. The homepage treats "I already chose Data Engineer" as "scan 31 titles."
- The pack panel shows the pattern this person actually needs, a named sequence with one sentence and a lesson count, and then withholds it from the job they chose. Data Engineer is filed with the posters, not with the lessons.

### Gaps

- Search behavior is from DevTools key events in headless Chrome. A human ⌘K was not shown to open a palette on this page. If that palette lists the Data Engineer roadmap first, the 10-second path on a desktop with a keyboard would be shorter than the grid scan observed here. It was not observed.
- The Data Engineer card was not clicked, on purpose. What `/data-engineer` opens is outside this homepage note.

### What Chaduvuko should take and refuse

Take:

- Lesson Packs: a card that is a written sequence, with the title, one sentence, and a lesson count, as on "Git Fundamentals" / "Learn enough Git to work confidently on real projects with a team." / "14 lessons". That is the object already in Chaduvuko's first card, and it should stay the first action.
- Roadmaps, the headings rather than the grid: "Role-based", "Skill-based", and "Best Practices" are labeled and counted separately (31, 59, and 5). Chaduvuko should keep a role roadmap from looking like a skill roadmap. It should not pour both into one list.
- Guides: the section is its own H2, under the catalog, and each desktop row is marked "Textual" or "Question" instead of pretending to be a roadmap. Keep a guide out of the role cards.

Refuse:

- Role-based: the flat 31 title-only cards, with "Learn with AI" in the first cell and Data Engineer as the twelfth link. A counted list of 31 jobs is not a start for someone who already named the job. Do not replace Chaduvuko's four one-line job cards with this grid.
- The Browse tablist (Roadmaps / Lesson Packs / Project Ideas): it is a second bar, `sticky` at `top: 0`, 50px, and on scroll it replaces the header. At 320 it clips "Project Ideas" to "Projec", and on the default tab it hides packs so the word Guides sits near y=5800. Do not add that bar.
- Join the Community: "+3.2M Registered Users" and "Register yourself / Commit to your growth" (`/signup`), plus the Lesson Packs line "Included with Pro." Chaduvuko has no accounts. Do not put a registration pitch under the lessons.
