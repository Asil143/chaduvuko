export const CAREERS_EMAIL = 'hello@chaduvuko.com'

export function careerApplyHref(title: string) {
  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`YouTube — ${title}`)}`
}

export function getCareerRole(slug: string) {
  return CAREER_ROLES.find(role => role.slug === slug)
}

export type CareerTrack = {
  href: string
  label: string
}

export type CareerRole = {
  slug: string
  title: string
  subject: string
  summary: string
  /** Written Chaduvuko track this series should sit beside, when one exists. */
  track: CareerTrack | null
  make: string[]
  bring: string[]
  preferred: string[]
}

export const CAREER_ROLES: CareerRole[] = [
  {
    slug: 'aws',
    title: 'AWS Instructor',
    subject: 'Amazon Web Services',
    summary:
      'Teach AWS from a new account through a system you deploy, explain, and tear down. The series is the course, not a tour of service names.',
    track: { href: '/learn/aws/introduction', label: 'the AWS lessons' },
    make: [
      'A lesson sequence that starts with an account, a billing alarm, and IAM, then earns each later service.',
      'Networking a beginner can follow: VPC, subnets, routing, and security groups, shown in the console and checked from the CLI.',
      'Compute and storage with EC2 and S3, including what you are paying for and what happens when access is wrong.',
      'One database you provision, connect to, and protect, with the reason you chose it over a file in a bucket.',
      'A serverless path, including Lambda and a way to call it, plus the logs and metrics you read when it fails.',
      'One end-to-end project a viewer can rebuild: a small application or a data job, narrated service by service.',
      'For every video: a title, a short description, chapter times, and a one-page outline of what the viewer should be able to do afterward.',
    ],
    bring: [
      'You have built on AWS yourself and can teach from an empty account, not from a diagram of the product catalog.',
      'You say why a service exists before you click it, and you can slow down on identity, networking, and cost.',
      'You record a screen a student can read and a voice they can follow for a full lesson.',
      'You correct a changed console label on camera instead of reciting a stale script.',
    ],
    preferred: [
      'A Solutions Architect certification, or an equal amount of project work you can walk through.',
      'Infrastructure as code, with CloudFormation or Terraform, taught after the console path is clear.',
      'A public write-up, repo, or video of something you shipped on AWS.',
    ],
  },
  {
    slug: 'dsa',
    title: 'Data Structures and Algorithms Instructor',
    subject: 'DSA',
    summary:
      'Teach the structures and algorithms a student meets in class and in interviews, with the picture, the code, and the cost of each choice.',
    track: { href: '/learn/dsa', label: 'the DSA lessons' },
    make: [
      'A series that starts with how to reason about a solution, then complexity in plain language, before the catalog of structures.',
      'Arrays, strings, linked lists, stacks, queues, hash tables, trees, heaps, and graphs, each with a diagram before the code.',
      'Sorting, searching, recursion, greedy methods, backtracking, and dynamic programming, each with one worked problem.',
      'The time and space cost spoken out loud, including why a different structure changed it.',
      'The approach that fails, then the repair. Viewers should hear the decision, not only see a finished function.',
      'Code in one language you can teach cleanly. Python is the best fit for this channel. Say so in your application if you use another.',
      'For every video: a title, a short description, chapter times, and the problem the viewer should try before the next lesson.',
    ],
    bring: [
      'You can solve the problems you teach and explain why that structure was the one to reach for.',
      'You draw or animate the data. A pasted solution with no picture is not a lesson.',
      'You are patient on recursion, references, and graphs, which is where viewers get lost.',
      'You record an editor and a board or diagram the viewer can read, with clear audio.',
    ],
    preferred: [
      'Tutoring, a course you have taught, or interview coaching with real students.',
      'A public set of explained solutions, not only accepted submissions.',
      'Comfort stating when a solution is correct but not the one an interview is asking for.',
    ],
  },
  {
    slug: 'python',
    title: 'Python Instructor',
    subject: 'Python',
    summary:
      'Teach Python from a working installation through the core language, and finish with a small program a beginner can change on their own.',
    track: { href: '/learn/python', label: 'the Python lessons' },
    make: [
      'A first video that installs Python, creates an environment, and runs a real file. No skipped setup.',
      'Lessons on values and types, strings, decisions, loops, functions, lists, dictionaries, files, modules, and errors.',
      'A practical introduction to objects: enough to read and write a small class, not a tour of every language feature.',
      'Programs run on screen, including the error message, what it means, and the fix.',
      'One closing project a viewer can finish in a few sittings: a data script, a command-line tool, or a file processor that uses the earlier lessons.',
      'Short pauses where the viewer tries a change before you show the answer.',
      'For every video: a title, a short description, chapter times, and a one-page outline.',
    ],
    bring: [
      'You write Python and can teach it from a blank file.',
      'You explain what a line does, not only the keys to press.',
      'Your examples are small enough to finish inside the lesson and realistic enough to be worth finishing.',
      'You record the editor and the terminal so both are readable, with a voice a student can follow.',
    ],
    preferred: [
      'One next step you can teach after the core language: the standard library, pandas, automation, or a very small web app.',
      'Tutoring, a workshop, or a public notebook or video in your own voice.',
      'Habit of showing the traceback instead of cutting it out of the edit.',
    ],
  },
  {
    slug: 'mathematics',
    title: 'Mathematics Instructor',
    subject: 'Mathematics',
    summary:
      'Teach the mathematics a programming, data, or machine-learning student needs, from algebra through probability, linear algebra, and the idea of a derivative.',
    track: null,
    make: [
      'A series a motivated beginner can start without a classroom. Each video states what is about to be used and what can wait.',
      'Algebra, functions, exponents, and logarithms, with numbers worked on screen.',
      'Sets, counting, and the discrete ideas that show up when students later study algorithms.',
      'Probability and introductory statistics, including expectation and a plain account of Bayes, with the assumption of each formula named.',
      'Vectors, matrices, and the dot product, tied to a small table of data the viewer can compute by hand.',
      'The derivative and the gradient as “what changes when this number changes,” connected to one learning example. Mark clearly where you are giving intuition instead of a proof.',
      'One problem at the end of each video, with the worked answer in a later chapter or a short follow-up.',
      'For every video: a title, a short description, chapter times, and a one-page outline.',
    ],
    bring: [
      'You can teach this span correctly, and you can say when a picture is only an intuition.',
      'Your board, slides, or notebook stay readable. Equations are large enough to follow.',
      'You connect a formula to a computing example without skipping the mathematics that makes the example true.',
      'You record clear audio and write slowly enough that a viewer can copy a step.',
    ],
    preferred: [
      'Teaching or tutoring at school, early university, or with adult learners changing careers.',
      'Linear algebra or probability you have used in code, so the computing examples are real.',
      'A sample lesson, even a short one, that works a problem from the question to the last line.',
    ],
  },
  {
    slug: 'physics',
    title: 'Physics Instructor',
    subject: 'Physics',
    summary:
      'Teach introductory physics as a course: motion, forces, energy, waves, electricity and magnetism, and a first look at modern physics.',
    track: null,
    make: [
      'An ordered series, not a set of unrelated clips. Each video names the idea it depends on.',
      'Motion, forces, energy, and momentum, with free-body diagrams and numericals worked in full, including units.',
      'Waves, then electricity and magnetism, at an introductory level a student can use in a later engineering class.',
      'A first look at modern physics that says what the earlier mechanics can no longer explain.',
      'The reason for a formula before it is used, and the assumption that makes it fail.',
      'A demonstration the viewer can follow on a screen: a simple experiment, a simulation, or a carefully drawn sequence.',
      'For every video: a title, a short description, chapter times, and a one-page outline.',
    ],
    bring: [
      'You know this physics and can teach it without skipping the step where students usually stall.',
      'You check units on camera and keep equations large enough to read.',
      'You can hold one problem from the diagram to the final number without jumping to the answer.',
      'You record a board or tablet and clear audio. Phone-quality sound with a careful explanation beats a studio with a rushed one.',
    ],
    preferred: [
      'Teaching or tutoring physics.',
      'A sample numerical you are willing to put in the application.',
      'Comfort repairing the algebra a problem needs, in a short aside, instead of waving it through.',
    ],
  },
  {
    slug: 'azure',
    title: 'Azure Instructor',
    subject: 'Microsoft Azure',
    summary:
      'Teach Azure as a platform a beginner can operate: identity, a network, compute, storage, a database, and one system they deploy and remove.',
    track: { href: '/learn/azure/introduction', label: 'the Azure lessons' },
    make: [
      'A series that starts with a tenant, Entra ID, a subscription, and a resource group, before any product tour.',
      'Networking, compute, storage, and one database, each created, used, and priced in the portal.',
      'Identity and role-based access shown inside the lesson that needs them, not saved for a final video.',
      'One application path with App Service or Functions, including the log you open when the request fails.',
      'A closing project the viewer deploys and deletes, with a check of what the subscription was charged for.',
      'For every video: a title, a short description, chapter times, and a one-page outline.',
    ],
    bring: [
      'You have built on Azure and can teach both the portal and the CLI.',
      'You explain regions, resource groups, and identity before the service names pile up.',
      'You record a readable screen and a steady explanation.',
      'You notice when the portal has renamed a blade and you teach the screen in front of you.',
    ],
    preferred: [
      'A data path you can demonstrate: Data Factory, Synapse, Databricks, or Microsoft Fabric, taught only as far as you have used it.',
      'A Microsoft certification or an equal project you can show.',
      'A habit of stating the shared-responsibility line: what Azure runs, and what the viewer still has to configure.',
    ],
  },
  {
    slug: 'gcp',
    title: 'Google Cloud Instructor',
    subject: 'Google Cloud',
    summary:
      'Teach Google Cloud from a project and a bill through compute, storage, data, and one service the viewer deploys.',
    track: { href: '/learn/gcp/introduction', label: 'the Google Cloud lessons' },
    make: [
      'A first stretch on projects, IAM, and billing, which is the model the rest of the platform hangs on.',
      'VPC networking, Compute Engine, and Cloud Storage, with access shown rather than described.',
      'One database path, and BigQuery taught as a warehouse a beginner can load and query.',
      'Cloud Run or Cloud Functions, and Cloud Logging when the deploy fails.',
      'One small project the viewer can rebuild and shut off, including how they confirm it is no longer costing money.',
      'For every video: a title, a short description, chapter times, and a one-page outline.',
    ],
    bring: [
      'You have built on Google Cloud and can teach the console and the gcloud CLI.',
      'You can explain a project, a service account, and a role without treating them as the same idea.',
      'You record a screen a student can read and audio they can follow.',
      'You would rather show a failed deploy and the log than cut to a working one.',
    ],
    preferred: [
      'Deeper BigQuery or data work you can teach after the warehouse introduction.',
      'An Associate-level certification or a public project of similar depth.',
      'Comfort comparing a Google Cloud choice with the AWS or Azure idea a viewer may already know, without turning the video into a vendor argument.',
    ],
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity Instructor',
    subject: 'Cybersecurity',
    summary:
      'Teach security from the goals of the field through how a defender works. Practice stays on systems you own or on labs built for training.',
    track: { href: '/learn/cybersecurity', label: 'the cybersecurity lessons' },
    make: [
      'A series from what security is protecting (confidentiality, integrity, availability) through identity, logging, and a first response to an incident.',
      'The networking and operating-system basics a security learner needs, taught before product names.',
      'Common attacks explained at a defender’s level: what the attacker is trying to achieve, what evidence it leaves, and which control would have mattered. Demonstrations stay inside a lab you control or a purpose-built practice environment.',
      'Identity, phishing as a human problem, web risk at the level of the main weakness classes, and how a log line tells you something happened.',
      'A home lab or free-tier lab the viewer can build, and one short incident walkthrough that uses lab data only.',
      'Career context after the skills: what a first security job tends to ask for, without pretending a certificate replaces practice.',
      'For every video: a title, a short description, chapter times, and a one-page outline. State the legal boundary in any video where a viewer might be tempted to try a technique outside a lab.',
    ],
    bring: [
      'You have done security work, or serious lab work, and you can tell study from theater.',
      'You teach defense and legal practice. You say, on camera, when something must not be run against a system the viewer does not own.',
      'You can explain a control, a configuration mistake, and a log line in ordinary language.',
      'You record clear audio and a screen where command output is readable.',
    ],
    preferred: [
      'Experience in a SOC, incident response, cloud security, or security engineering.',
      'Security+ or a harder practical certification, or a public lab write-up.',
      'A home lab you can show in the application.',
    ],
  },
  {
    slug: 'blockchain',
    title: 'Blockchain Instructor',
    subject: 'Blockchain',
    summary:
      'Teach how a chain works, how a person uses one, and what a small smart contract can and cannot promise. This is a technical series, not an investment show.',
    track: null,
    make: [
      'A picture of the mechanism: hashes, blocks, transactions, wallets, and consensus, including who is trusted to do what.',
      'How a person sends value or data, what a key and an address are, and what is lost when a key is lost.',
      'One small smart contract the viewer can read, deployed on a test network, with each important line explained.',
      'A clear split between the mechanism and the market. No price predictions, no urging viewers to buy a token, and no second product pitched inside the lesson.',
      'The failures a learner must recognize as concepts: lost keys, fake applications, and the risk in a contract or a bridge. Explain what to check before signing. Do not turn the lesson into a catalog of attack steps.',
      'For every video: a title, a short description, chapter times, and a one-page outline.',
    ],
    bring: [
      'You can draw the mechanism and correct a common myth without sneering at the viewer who believed it.',
      'You have used a test network or written a small contract you can explain line by line.',
      'You will keep the series educational. You will not sell a token, a trading system, or a paid funnel from these videos.',
      'You record diagrams and a screen that stay readable, with clear audio.',
    ],
    preferred: [
      'A public educational repo or a lecture you can link.',
      'Care around keys, approvals, and what a signature actually authorizes.',
      'Comfort teaching why a design costs money and time without sliding into investment advice.',
    ],
  },
]
