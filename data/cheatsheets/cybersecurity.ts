import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const cybersecurityCheatSheet: TrackCheatSheet = {
  track: 'cybersecurity',
  title: 'Cybersecurity',
  trackHref: '/learn/cybersecurity',
  accent: '#f43f5e',
  blurb: 'High-level definitions from the cybersecurity track — goals and models, identity, logging, the network ideas a defender needs, secure configuration, incident-response language, and the career facts named in the curriculum. Not attack steps.',
  sections: [
    {
      title: 'Goals and models',
      entries: [
        { label: 'CIA triad', code: `Confidentiality  only the right party can read it\nIntegrity        you can tell if it changed\nAvailability     it works when it is needed\nA control usually trades one of these off.` },
        { label: 'Design models', code: `Defense in depth\n  more than one control, so one miss is not the breach\nZero Trust\n  location is not trust; verify identity and device\n  least privilege; assume a breach is possible` },
        { label: 'Maps, not recipes', code: `Kill chain   named stages from recon through objectives\nATT&CK       a catalog of tactics and techniques\nUse them to place a detection.\nA name is not permission, and not a procedure.` },
        { label: 'Names defenders use', code: `Social engineering\n  phishing, spear phishing, vishing, smishing, pretexting\n  defense: verify out of band; report; ignore the link\nMalware categories\n  virus, worm, ransomware, spyware, rootkit, remote-access tool\n  question: what changed, and which log shows it?` },
      ],
    },
    {
      title: 'Cryptography in words',
      entries: [
        { label: 'Four tools', code: `Symmetric     one shared key; fast; bulk data\nAsymmetric    public key encrypts or verifies\n              private key decrypts or signs\nHash          one-way fingerprint; not encryption\nSignature     private key signs; public key checks origin` },
        { label: 'TLS', code: `TLS authenticates the name you asked for\nand encrypts the session after the handshake.\nHTTPS is HTTP inside TLS.\nA certificate is a signed claim about a name.` },
        { label: 'Password storage', code: `Store a slow hash plus a unique salt.\nDo not store the password.\nA fast hash is the wrong tool here.\nIdentical passwords must not share a hash.` },
      ],
    },
    {
      title: 'Identity',
      entries: [
        { label: 'Access words', code: `MFA     know + have, or know + are\nRBAC    rights come from a role\nABAC    rights also depend on context\nPAM     extra control on admin accounts\nSSO     one login, many apps\nLeast privilege   only the access the job needs` },
        { label: 'Federation', code: `OAuth 2.0   an app gets a token, not the password\nOIDC        identity layered on OAuth\nSAML        an identity provider asserts a login\nCheck on every token: issuer, audience, expiry.` },
        { label: 'Accounts', code: `A daily account is not an admin account.\nAdmin: MFA, short-lived, logged.\nA shared password is not a control.\nJoiner, mover, leaver: grant, change, remove.` },
      ],
    },
    {
      title: 'Logging',
      entries: [
        { label: 'Fields worth keeping', code: `timestamp\nhost\nuser\nsrc_ip\ndest_ip\naction\nobject\nresult\nauth_method` },
        { label: 'Sources', code: `auth logs\nfirewall and proxy\nDNS queries\nendpoint\napplication\ncloud audit: who called which API` },
        { label: 'SIEM words', code: `normalise   one field name across sources\ncorrelate   two events, one story\nbaseline    what usual looks like here\ntriage      real or not, and how bad\nAn alert with no fields is noise.` },
        { label: 'Defensive questions', code: `Same user, new source, success after many failures?\nPrivileged action outside the usual hours?\nA host that stopped sending logs?\nThese are questions for logs you are allowed to hold.` },
      ],
    },
    {
      title: 'Network ideas',
      entries: [
        { label: 'Layers', code: `link         local delivery\ninternet     addresses and routing\ntransport    TCP or UDP, and a port\napplication  DNS, HTTP, TLS\nSay which layer a control actually sees.` },
        { label: 'Names, HTTP, TLS', code: `DNS    a name resolves to an address\n       the log shows who looked up what\nHTTP   method, path, status\nHTTPS  the body is hidden; the handshake is not\nA cert binds a public key to a name.` },
        { label: 'Firewall, IDS, IPS', code: `Firewall   allow or deny by policy\n           stateful means it remembers the flow\nIDS        detect and alert\nIPS        can block in line\nSignature  a known pattern\nAnomaly    unlike the baseline\nDefault deny is the secure start.` },
        { label: 'Segmentation', code: `Users, servers, and admin paths are not one flat net.\nA DMZ is what the internet is allowed to touch.\nNAT hides inside addresses.\nNAT is not an access-control policy.` },
      ],
    },
    {
      title: 'Secure configuration',
      entries: [
        { label: 'Host goals', code: `Unique users. No shared root login.\nAdmin via sudo, and sudo is logged.\nMode bits: owner writes; others only if they must.\nr read, w write, x execute — owner, group, others.\nServices you do not need stay off.\nClocks agree, or the logs will not.` },
        { label: 'Remote login goals', code: `Prefer keys over passwords where you can.\nNo direct root login from the network.\nLimit which accounts may log in.\nKeep the service patched on a host you own.` },
        { label: 'Cloud and code checks', code: `Shared responsibility\n  the provider secures the platform\n  you secure identity, config, and data\nPrivate by default. No standing admin for daily work.\nValidate input on the server.\nParameterised data access. Encode output for its context.\nSecrets in a store, not in the repo.` },
        { label: 'Pipeline checks', code: `SAST                 read the code\nDAST                 test a running app you may test\nDependency scanning  known-bad libraries\nSecrets detection    keys that should not be committed\nImage scanning       what a container actually ships\nA gate can fail the build.` },
      ],
    },
    {
      title: 'Weaknesses and patches',
      entries: [
        { label: 'Words', code: `Vulnerability   a flaw that could be abused\nCVE             a public id: CVE-YEAR-NUMBER\nCVSS            a severity score, not the whole risk\nZero-day        no public patch yet\nPatch           the fix, once it exists` },
        { label: 'What to fix first', code: `Is it exposed, and is anything in front of it?\nThe score is an input, not the order by itself.\nRecord an exception and a review date.\nScanning belongs on systems you are allowed to scan.` },
        { label: 'Telling the owner', code: `Report to the owner or a published program.\nStay inside the scope they wrote down.\nPractice on a lab you own, or a range that invited you.\nResponsible disclosure is a process, not a workaround.` },
      ],
    },
    {
      title: 'Incident response language',
      entries: [
        { label: 'Phases the track names', code: `detect and triage\ncontain\npreserve evidence\neradicate\nrecover\npost-incident review\nPrepare before you need the list.` },
        { label: 'Evidence', code: `Write down time, system, and who touched it.\nCopy logs before they rotate.\nDo not wipe a host you still need to timeline.\nA lab timeline uses lab data only.` },
        { label: 'Intel words', code: `IOC   a concrete indicator: hash, domain, or address\nIOA   a behaviour, a pattern of actions\nTTP   a tactic, technique, and procedure, named in a catalog\nA hunt starts from a hypothesis on logs you hold.` },
      ],
    },
    {
      title: 'Career facts',
      entries: [
        { label: 'Roles the track maps', code: `The career module maps roles from SOC analyst to CISO.\nTopics it names:\n  role map\n  US salaries by role\n  top hiring companies\n  certifications, ranked\n  breaking in\nThis page does not add salary figures.` },
        { label: 'Certs and frameworks', code: `Certifications the track names\n  CompTIA Security+, CEH, OSCP, CISSP, CISM, AWS Security\nFrameworks the track names\n  NIST CSF, SOC 2 Type II, ISO 27001, PCI-DSS\n  HIPAA, at a basic level\nRank and cost live in those lessons.` },
        { label: 'Where practice is allowed', code: `A home lab: virtualisation on machines you control.\nRanges that invite you: TryHackMe, HackTheBox.\nA bug bounty only inside its written scope.\nInterview topics named here: networking, crypto,\nweb security, test process, incident response,\ncompliance, and behaviour.` },
      ],
    },
  ],
  projects: [
    { title: 'CIA notes for a home lab', level: 'Beginner', build: 'On a network you own, list three systems. For each, write which CIA property matters most and one control you already have. Do not probe anyone else’s hosts.', skills: ['CIA triad', 'trade-offs', 'asset list'] },
    { title: 'Lab identity table', level: 'Beginner', build: 'For a lab you control, write three accounts: everyday, admin, and a service. Note role, whether MFA is on, and the smallest permission each needs. Flag any shared password.', skills: ['RBAC', 'MFA', 'least privilege'] },
    { title: 'Log field card', level: 'Intermediate', build: 'From auth or app logs your own machines already write, copy ten lines into timestamp, user, source, action, and result. Describe what usual looked like that day.', skills: ['log fields', 'normalisation', 'baseline'] },
    { title: 'Incident timeline on lab data', level: 'Intermediate', build: 'Pick one real event on a host you own (a login, an install, a reboot). Write a one-page timeline using detect, contain, evidence, eradicate, recover, and review — only from those logs.', skills: ['IR phases', 'evidence', 'timeline'] },
    { title: 'Hardening baseline', level: 'Advanced', build: 'For one Linux VM you own, write a configuration baseline: accounts, admin access, remote-login goals, services you turned off, and which logs prove it. Map each line to a NIST CSF function in your own words. No scanners against systems you do not own.', skills: ['secure configuration', 'audit logs', 'NIST CSF'] },
  ],
}
