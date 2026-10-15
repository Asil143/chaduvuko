# Live structure of one enterprise job page at Google, Microsoft, Amazon, and Meta (October 2026)

Fetched 13 October 2026. One open posting per company. Salary figures are omitted on purpose: each note says only whether a range is shown. Nothing here is proposed Chaduvuko copy.

## Which live job URL was opened at each company?

### Takeaway
Google, Microsoft, and Amazon each had an open software-engineering posting on 13 October 2026. Meta’s official job hosts returned an error to a direct fetch; the same requisition was still indexed, and that index text is the only Meta outline below.

### Cited Findings
- Google’s public job host `careers.google.com` redirects to `www.google.com/about/careers/applications/...`. The first software posting opened, Software Engineer III, Embedded Systems/Firmware, Pixel, was gone on re-fetch: the page said “Job not found. This job may have been taken down.” — [Google Careers, removed Pixel posting](https://www.google.com/about/careers/applications/jobs/results/87101482792297158-software-engineer-iii-embedded-systemsfirmware-pixel)
- The next public Google posting used is Staff Software Engineer, Data Processing Platform, San Francisco, CA, USA. The same URL still listed “3,442 jobs matched,” so the requisition was open at fetch time. No posted date is on the page. — [Google Careers, Staff Software Engineer, Data Processing Platform](https://www.google.com/about/careers/applications/jobs/results/109329274653024966-staff-software-engineer-data-processing-platform)
- Microsoft’s live job host for this posting is `apply.careers.microsoft.com`, not the bare `careers.microsoft.com` path. Canonical URL: Software Engineer, United States, Washington, Redmond. The page label “Date posted” is Oct 09, 2026. Job number 200061216. The job JSON `t_create` matches 9 October 2026. — [Microsoft Careers, Software Engineer](https://apply.careers.microsoft.com/careers/job/1970393557037774); job JSON at [Microsoft apply API for that id](https://apply.careers.microsoft.com/api/apply/v2/jobs/1970393557037774?domain=microsoft.com)
- Amazon’s official host is `www.amazon.jobs`. The posting fetched as HTML on 13 October 2026 is Software Development Engineer, Amazon Fulfillment Technologies (AFT) - Platform Engineering & Services. Header line: “Job ID: 10575919 | Amazon.com Services LLC.” The detail HTML has no posted-date string. — [Amazon.jobs, job 10575919](https://www.amazon.jobs/en/jobs/10575919/software-development-engineer-amazon-fulfillment-technologies-aft-platform-engineering-services)
- A search-index extract of that same Amazon URL added “Posted: October 13, 2026 (Updated about 1 hour ago),” a Seattle location, and the title “Software Development Engineer, Special Projects.” Those strings are not in the detail HTML (location in the page is USA, WA, Bellevue only). The search-card date is treated as conflicting, not as a visible detail-page field. — [Amazon.jobs search-index extract of job 10575919](https://www.amazon.jobs/en/jobs/10575919/software-development-engineer-amazon-fulfillment-technologies-aft-platform-engineering-services); contradicted by the HTML of that URL, fetched 13 October 2026
- Meta official URLs for requisition 1187958502273564 returned HTTP 400 to a direct request. `https://www.metacareers.com/jobs/1187958502273564` returned an error document titled “Error” with “Sorry, something went wrong.” A reader fetch of the same jobs URL returned only “Meta Careers.” `https://www.facebook.com/careers/v2/jobs/1187958502273564/` returned HTTP 404. — [Meta Careers jobs URL](https://www.metacareers.com/jobs/1187958502273564); [Meta Careers profile job URL](https://www.metacareers.com/profile/job_details/1187958502273564)
- The indexer still returned text for that Meta requisition on 13 October 2026. No posted date appears in those extracts. Aggregator copies (a March 2026 board and a November 2025 board) were not used for the outline. — [Meta Careers profile extract](https://www.metacareers.com/profile/job_details/1187958502273564)

### Inferences
- The durable public URL patterns on this date are Google `.../jobs/results/{id}-{slug}`, Microsoft `apply.careers.microsoft.com/careers/job/{id}`, Amazon `www.amazon.jobs/en/jobs/{id}/{slug}`, and Meta `www.metacareers.com/profile/job_details/{id}` plus `www.metacareers.com/jobs/{id}`.
- Microsoft’s rendered job text is loaded from the apply API. The HTML shell alone does not contain the posting.

### Gaps
- Meta could not be opened as a full page. Header chrome, the Apply control, and column layout for Meta are unseen.
- Two indexer extracts of the same Meta profile URL name different single locations (Sunnyvale, CA in one extract, Bellevue, WA in another). Which location the page shows by default was not resolved.
- Amazon’s detail page does not show a posted date, so “posted October 13, 2026” is not confirmed on the posting itself.
- Google’s selected posting has no posted date, so “opened in October 2026” means only that it was live on 13 October 2026.

## What headings and meta fields appear, top to bottom?

### Takeaway
The four postings do not share one outline. Qualifications are headings at all four, but the order differs, and compensation, company, and equal-opportunity text are often unlabeled paragraphs rather than headings. Meta’s list is reconstructed from truncated index extracts of a page that would not load.

### Cited Findings

Google, in the order the selected-job page rendered. Site chrome first, then the results list, then the posting. — [Google Careers, Staff Software Engineer, Data Processing Platform](https://www.google.com/about/careers/applications/jobs/results/109329274653024966-staff-software-engineer-data-processing-platform)

- Nav links, not job sections: “Home,” “Jobs,” “Students,” “How we work,” “How we hire,” “Your career.”
- Page heading: “job details.”
- Link: “Back to jobs search.”
- Heading: “Jobs search results.” Count line: “3,442 jobs matched.” Then 20 result cards (title and location only in the extract) and “Showing 1 to 20 of 3442 rows” / “1‑20 of 3442.”
- “Back to jobs search” repeats, then the selected posting.
- Heading: “Staff Software Engineer, Data Processing Platform.”
- Share control, repeated later: “Share Staff Software Engineer, Data Processing Platform,” with “Copy link” and “Email a friend.”
- Meta line, unlabeled: company “Google,” place “San Francisco, CA, USA.”
- Heading: “Advanced.” Body under it: “Experience owning outcomes and decision making, solving ambiguous problems and influencing stakeholders; deep expertise in domain.”
- Action: “Apply.”
- Note, not a heading: “In most instances, this position requires in-person interviews as part of the hiring process.”
- Location-specific note, not a heading: “Applicants in San Francisco: Qualified applications with arrest or conviction records will be considered...”
- Heading: “Minimum qualifications:”
- Heading: “Preferred qualifications:”
- Heading: “About the job.” The prose names the Detection and Response Platform Organization and the Core team. There is no separate team field.
- Unlabeled pay paragraph. A US range is shown, plus a bonus target, equity, and benefits. Link text: “benefits at Google.”
- Heading: “Responsibilities.”
- Unlabeled closers, in this order: applicant privacy (“Applicant and Candidate Privacy Policy”); equal-opportunity paragraph beginning “Google is proud to be an equal opportunity and affirmative action employer,” with links “Google's EEO Policy,” “Know your rights: workplace discrimination is illegal,” “Belonging at Google,” and “How we hire”; accommodations (“Accommodations for Applicants form”); English-proficiency sentence; “To all recruitment agencies: Google does not accept agency resumes...”; equity-grant paragraph naming Alphabet Inc.
- Not present as labels on this page: posted date, job id (the id is only in the URL), employment type, a heading “About the company,” a heading “Compensation,” a heading “Equal opportunity,” “How to apply,” or “Similar jobs.”

An earlier index extract of the Pixel posting, before it was removed, started the body the same way: “Minimum qualifications:”, “Preferred qualifications:”, “About the job,” then a US pay sentence. Responsibilities were not in that truncated extract. — [Google Careers, removed Pixel posting](https://www.google.com/about/careers/applications/jobs/results/87101482792297158-software-engineer-iii-embedded-systemsfirmware-pixel)

Microsoft, Software Engineer, Redmond. The HTML shell is client-rendered. Field order below is the rendered extract plus the job JSON. Tab and perk labels are from the configuration embedded in that same page, not from a second visual pass. — [Microsoft Careers, Software Engineer](https://apply.careers.microsoft.com/careers/job/1970393557037774); [job JSON](https://apply.careers.microsoft.com/api/apply/v2/jobs/1970393557037774?domain=microsoft.com)

- Nav links in the page config: “Careers,” “Dashboard,” “Profile,” “Join Talent Network.”
- Extract labels above the posting: “Single Position” and “View All Jobs.”
- Heading: “Software Engineer.”
- Unlabeled location: “United States, Washington, Redmond.”
- Actions, in extract order: “Apply now,” “Add to cart,” “Find out how well you match with this job,” “Upload your resume.”
- Fact labels, in this order, each with a value: “Job number” 200061216; “Date posted” Oct 09, 2026; “Work site” “3 days / week in-office”; “Travel” “Less than 25%”; “Profession” “Software Engineering”; “Discipline” “Software Engineering”; “Role type” “Individual Contributor”; “Employment type” “Full-Time.”
- The same eight labels are the page’s configured position fields, in that order: “Job number,” “Date posted,” “Work site,” “Travel,” “Profession,” “Discipline,” “Role type,” “Employment type.”
- Bold section labels inside the description, in JSON order: “Overview,” “Responsibilities,” “Qualifications.”
- Inside Qualifications: “Required Qualifications,” then “Other Requirements:” (a Microsoft Cloud Background Check), then “Preferred Qualifications.”
- Unlabeled pay sentence after the qualifications. It names “Software Engineering IC2.” A US base range is shown, and the sentence says a different range applies in the San Francisco Bay area and New York City. No figures copied here.
- Link line: “Find additional benefits and pay information here” pointing at `https://careers.microsoft.com/us/en/us-corporate-pay`.
- Sentence: “This position will be open for a minimum of 5 days, with applications accepted on an ongoing basis until the position is filled.”
- A horizontal rule, then an unlabeled equal-opportunity paragraph beginning “Microsoft is an equal opportunity employer,” plus a “requesting accommodations” link.
- Configured tabs on this page: “Job description” (position fields, job description, insights widget) and “Company and benefits” (perks, blogs, videos). Perk titles in that config: “Flexibility,” “Growth,” “Wellbeing,” “Community PCS.”
- Not present as headings in the job JSON or the rendered extract: “About the job,” “Minimum qualifications,” “About the company” (the company material is the other tab), “How to apply,” or “Similar jobs.” The page config turns similar-position lookup on; no similar-jobs heading was in the text extract.

Amazon, job 10575919, from the HTML on 13 October 2026. — [Amazon.jobs, job 10575919](https://www.amazon.jobs/en/jobs/10575919/software-development-engineer-amazon-fulfillment-technologies-aft-platform-engineering-services)

- Nav: “Home,” “Teams,” “Locations,” “Job categories,” “My career” (with “My applications,” “My profile,” “Account security,” “Settings,” “Sign out”), “Resources” (with “Accommodations,” “Benefits,” “Inclusive experiences,” “How We Hire,” “Leadership principles,” “Working at Amazon,” “FAQ”).
- Heading: “Software Development Engineer, Amazon Fulfillment Technologies (AFT) - Platform Engineering & Services.”
- Meta line: “Job ID: 10575919 | Amazon.com Services LLC.”
- Button: “Apply now,” linking to `https://www.amazon.jobs/applicant/jobs/10575919/apply`.
- Heading: “Description.” No separate responsibilities heading. The work is inside this prose.
- Heading: “Basic Qualifications.”
- Heading: “Preferred Qualifications.”
- Still inside the lower body, not under new headings: an equal-opportunity sentence (“Amazon is an equal opportunity employer and does not discriminate on the basis of protected veteran status, disability, or other legally protected status.”); an accommodations paragraph linking to `https://amazon.jobs/content/en/how-we-hire/accommodations`; a compensation paragraph that says a base range is listed below, mentions sign-on payments and restricted stock units, names benefit categories, and links to `https://amazon.jobs/en/benefits`.
- Unlabeled range line. A range is shown, tied to “USA, WA, Bellevue,” in USD annually. No figures copied here.
- Sidebar heading: “Job details.” Items: location “USA, WA, Bellevue”; category link “Software Development” (`aria-label` “Job category Software Development”).
- A related-jobs component is mounted in the sidebar (client-rendered, limited to 5, filtered to Seattle, Bellevue & Greater Seattle, and Software Development). Its heading is not in the static HTML.
- Sidebar heading: “Share this job,” with Facebook, LinkedIn, Instagram, and X share links.
- Footer groups: “Find Careers” (“Job Categories,” “Teams,” “Locations,” “Military careers,” “Hourly”); “Working At Amazon” (“Culture,” “Benefits,” “Amazon Newsletter,” “Inclusive experiences,” “Leadership Principles”); “Help” (“FAQ,” “How We Hire,” “Application status,” “Accommodations,” “Legal disclosures and notices”). The equal-opportunity sentence repeats in the footer. Then “Privacy and Data,” “Impressum,” and “© 1996-2026, Amazon.com, Inc. or its affiliates.”
- Not present as visible fields in the HTML: posted date, employment type (the words “full-time” appear only in the site meta description, not on the job), a team name (analytics script has `division: operations`, which is not displayed), “About the company,” “Responsibilities,” “Compensation,” or “How to apply.”

The Amazon search index, separate from this detail page, is a list with category filters, “Sort by,” and cards. A card shows title, “Locations,” “Job ID,” “Posted” date, “(Updated ...),” and a “Basic qualifications:” preview. — [Amazon.jobs software-engineer search](https://www.amazon.jobs/en/search?base_query=software+engineer&category%5B%5D=software-development&country%5B%5D=USA)

Meta, requisition 1187958502273564. Direct fetch failed. Order below is only what indexer extracts of the profile URL showed, with gaps where an extract skipped lines. — [Meta Careers profile extract](https://www.metacareers.com/profile/job_details/1187958502273564)

- Page title line: “Meta Careers.” Skip link: “Skip to main content.”
- Heading: “Software Engineer (Technical Leadership).”
- A single location line. One extract says “Sunnyvale, CA.” Another extract of the same URL says “Bellevue, WA.”
- Unlabeled line: “Engineering.”
- Intro prose with no “About the job” heading. It starts “Meta is seeking a Software Engineer to join our engineering team.”
- A divider, then heading: “Software Engineer (Technical Leadership) Responsibilities.”
- Heading: “Minimum Qualifications.”
- Heading: “Preferred Qualifications.” One visible bullet begins “Experience in shipping products to millions of customers...”
- A divider, then heading: “About Meta.” Visible opening: “Meta builds technologies that help people connect, find communities, and grow businesses.”
- The profile extracts do not show the pay line as its own heading. One extract reaches “In addition to base compensation, Meta offers benefits. Learn more about benefits at Meta.” and then the next heading. The skipped middle of that extract may contain the range; that was not visible.
- Heading: “Equal Employment Opportunity.” Opening: “Meta is proud to be an Equal Employment Opportunity employer.”
- A second URL for the same id, which also would not load directly, shows a different header in the index and is not folded into the list above. That extract lists “Sunnyvale, CA,” “Bellevue, WA,” “Menlo Park, CA,” “Seattle, WA,” “Washington, DC,” “New York, NY,” “Remote, US,” “Full Time,” and “+ 6 more,” then a “Hide” control, then the lines “Meta,” “AI Infrastructure,” “Software Engineering,” and “Engineering.” It also shows a compensation range (a range is shown) plus bonus, equity, and benefits, and the sentences “Individual compensation is determined by skills, qualifications, experience, and location” and “Compensation details listed in this posting reflect the base hourly rate, monthly rate, or annual salary only, and do not include bonus, equity or sales incentives, if applicable.” — [Meta Careers jobs extract](https://www.metacareers.com/jobs/1187958502273564)
- Not seen in any extract of this requisition: posted date, a visible job-id label, “How to apply,” or “Similar jobs.” Apply was not in the extracted text.

### Inferences
- Heading names are company-specific. Google says “Minimum qualifications:” and “Preferred qualifications:.” Amazon says “Basic Qualifications” and “Preferred Qualifications.” Microsoft says “Required Qualifications” and “Preferred Qualifications” under “Qualifications.” Meta says “Minimum Qualifications” and “Preferred Qualifications,” and names the responsibilities heading after the job title.
- Google puts qualifications before “About the job,” and puts “Responsibilities” after the pay paragraph. Meta puts responsibilities before qualifications, then “About Meta.” Amazon and Microsoft put the narrative first (“Description” / “Overview”), then qualifications, and do not use an “About the job” heading.
- Equal opportunity is a heading only on the Meta extract (“Equal Employment Opportunity”). On the Google, Microsoft, and Amazon pages it is a closing paragraph. Amazon’s copy sits in the qualifications region, before the range line, and repeats in the footer.
- Compensation is never its own heading on these four pages. It is a paragraph or a single location line, and a range is shown on the Google page, the Microsoft page, the Amazon page, and the Meta `/jobs/` extract.

### Gaps
- Meta’s middle, between “About Meta” and “Equal Employment Opportunity,” was truncated in the profile extracts. Whether the range sits there, and the exact benefits wording on that template, was not fully visible. The `/jobs/` extract should not be assumed to be the same template.
- Meta site-footer blocks (accommodations form, New York City automated-decision notice) appear on other Meta Careers pages. They were not confirmed on this job extract, so they are not listed as part of this posting.
- Amazon’s related-jobs widget has no heading in the static HTML, so it is not recorded as “Similar jobs.”
- Microsoft’s “Company and benefits” perk titles and videos come from the page configuration payload. They were not read as rendered text on the default tab.
- No second live posting was fully fetched at Microsoft, Amazon, or Meta, so heading order is for the one page named above. Google’s removed Pixel extract only corroborates the start of the body.

## What is the layout, and which facts stay present when the prose is long?

### Takeaway
Google’s job URL is the search-results page with one job selected. Amazon is a two-column page: prose on the left, a facts sidebar on the right, Apply at the top right from medium widths up. Microsoft’s extracted reading order is one column, with Apply and eight fact labels above the prose and a second tab for company and benefits. Meta’s layout was not visible.

### Cited Findings
- Google: the fetched job URL contains both “Jobs search results” (20 of 3,442, with next-page paging) and the selected posting. “Apply” sits in the posting header after the company, the location, and the “Advanced” level, and before the qualifications. Share sits above and again beside that header. No facts sidebar was in the extract. A different Google results URL’s extract included a heading “Search sidebar” plus “Jobs search results”; that heading was not on the selected-job page fetched here. — [Google Careers, Staff Software Engineer, Data Processing Platform](https://www.google.com/about/careers/applications/jobs/results/109329274653024966-staff-software-engineer-data-processing-platform); [Google Careers results URL that included “Search sidebar”](https://careers.google.com/jobs/results/?jobId=CiUAL2FckWCPqe7idirPeMz7suv6ePyjEPWEKYxK_vGJgl1ABTtEEjsA7mFcrCoAJ36bdgIdi3QG_S8hOy0hy4zlFWYoac8A7WPq_fF-8ycdwBRRYkW1SUfAJq-EvHj3YlHGGg%3D%3D_V2&loc=IN&title=Software+Engineer+III)
- On that Google posting, these items sit outside the long “About the job” prose: title, “Google,” location, level “Advanced,” “Apply,” share, the in-person-interview note, and the San Francisco fair-chance note. After the prose, the pay paragraph, “Responsibilities,” privacy, the equal-opportunity paragraph, accommodations, the English-proficiency line, the agency disclaimer, and the equity paragraph are still present. The fair-chance note is tied to San Francisco, so it is not a general field.
- Microsoft’s rendered extract reads top to bottom as one column: title, location, “Apply now,” “Add to cart,” match prompt, then the eight fact labels, then Overview / Responsibilities / Qualifications, then pay, the five-day sentence, and the equal-opportunity paragraph. The facts are not inside the prose. The page config adds a second tab, “Company and benefits,” rather than a second column of facts. Search filters configured for the Microsoft index include remote, distance, work site, seniority, profession, and career discipline, plus role type, employment type, skills, and hiring title. — [Microsoft Careers, Software Engineer](https://apply.careers.microsoft.com/careers/job/1970393557037774)
- Amazon’s header row is `col-md-7` for the title and “Job ID” line, and `col-md-5` for “Apply now,” aligned to the end from the `md` breakpoint (`justify-content-md-end`). The body row is `col-md-7 col-lg-8 col-xl-9` for Description and both qualification headings, and `col-md-5 col-lg-4 col-xl-3` with `class="sidebar"` for “Job details,” the related-jobs mount, and “Share this job.” Below `md` those columns are `col-12`, so they stack. — [Amazon.jobs, job 10575919](https://www.amazon.jobs/en/jobs/10575919/software-development-engineer-amazon-fulfillment-technologies-aft-platform-engineering-services)
- On that Amazon page, title, “Job ID: 10575919 | Amazon.com Services LLC,” “Apply now,” sidebar location, and sidebar category stay outside the Description. “Basic Qualifications” and “Preferred Qualifications” remain headings after a long description. The equal-opportunity sentence, accommodations link, benefits paragraph, and the Bellevue range line follow the preferred-qualifications list. The search index, not the detail page, is where “Posted” and “(Updated ...)” were visible on cards.
- Meta layout, Apply placement, and any sidebar were not in the extracts and could not be checked because the page returned an error. What the extracts do put above the prose is the title, one location, and “Engineering.” The named sections “Software Engineer (Technical Leadership) Responsibilities,” “Minimum Qualifications,” “Preferred Qualifications,” “About Meta,” and “Equal Employment Opportunity” still appear after the intro. — [Meta Careers profile extract](https://www.metacareers.com/profile/job_details/1187958502273564)

### Inferences
- The facts that survive a long description are the ones outside the prose: a title, a place, an apply action, and a short fact row or sidebar. Google’s short facts are company, location, and level. Microsoft’s are the eight configured labels (job number through employment type). Amazon’s sidebar facts on this page are only location and job category; job id and legal entity sit in the header instead.
- A searchable index exists at Google (results list on the job URL, with a match count and paging), Microsoft (search config with the filters named above), and Amazon (filterable, sortable card list). Meta’s jobs index was not opened; only single-job extracts came back.
- “Always” is not proven across every role. It is proven for the Microsoft field list because those eight labels are the page template’s position fields, and for Amazon’s sidebar because location and category are template associations, not sentences in the description. Google’s qualification headings matched a second, now-removed posting’s indexed start, which is weaker evidence.

### Gaps
- No screenshot was taken. Google’s list-then-detail extract is consistent with a results page that has a job selected; CSS column widths for Google were not measured. Microsoft’s one-column description is the text order, not a measured layout.
- Meta’s Apply control, column count, and index were not observable after HTTP 400 / the error page.
- Amazon related jobs may show a heading after JavaScript runs. That heading was not in the fetched HTML.
- One posting each cannot show which notes are location-only. The San Francisco fair-chance paragraph and the Bellevue range line are specific to those pages.
