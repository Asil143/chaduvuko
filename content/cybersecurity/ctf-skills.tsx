import { LearnLayout } from '@/components/content/LearnLayout'
import { KeyTakeaways } from '@/components/content/KeyTakeaways'
import { Callout } from '@/components/content/Callout'
import Link from 'next/link'

const C = '#ff4757'

const s = {
  p: { fontSize: 15, color: 'var(--text)', lineHeight: 1.9, marginBottom: 16 } as React.CSSProperties,
  h: { fontSize: 20, fontWeight: 700, color: 'var(--heading)', marginTop: 36, marginBottom: 12 } as React.CSSProperties,
  hl: { color: C, fontWeight: 600 } as React.CSSProperties,
  block: {
    background: 'var(--code-bg)', border: '1px solid var(--border)',
    borderRadius: 8, padding: '16px 20px', fontFamily: 'monospace',
    fontSize: 13, lineHeight: 1.8, marginBottom: 20, whiteSpace: 'pre-wrap' as const,
    overflowX: 'auto' as const,
  },
  table: { width: '100%', borderCollapse: 'collapse' as const, marginBottom: 24, fontSize: 14 },
  th: { background: 'var(--code-bg)', padding: '10px 14px', textAlign: 'left' as const, fontWeight: 600, borderBottom: '2px solid var(--border)' },
  td: { padding: '10px 14px', borderBottom: '1px solid var(--border)', verticalAlign: 'top' as const },
  divider: { border: 'none', borderTop: '1px solid var(--border)', margin: '40px 0' },
  iqBox: { background: 'var(--code-bg)', borderLeft: `4px solid ${C}`, borderRadius: 6, padding: '16px 20px', marginBottom: 20 },
  errBox: { background: '#1a0a0a', borderLeft: '4px solid #ff4757', borderRadius: 6, padding: '16px 20px', marginBottom: 20 },
}

function Part({ children }: { children: React.ReactNode }) { return <div style={{ marginBottom: 48 }}>{children}</div> }
function H({ children }: { children: React.ReactNode }) { return <h2 style={s.h}>{children}</h2> }
function P({ children }: { children: React.ReactNode }) { return <p style={s.p}>{children}</p> }
function Hl({ children }: { children: React.ReactNode }) { return <span style={s.hl}>{children}</span> }
function HR() { return <hr style={s.divider} /> }
function Block({ children }: { children: React.ReactNode }) { return <pre style={s.block}>{children}</pre> }
function IQ({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div style={s.iqBox}>
      <div style={{ fontWeight: 700, color: C, marginBottom: 8 }}>Q: {q}</div>
      <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}
function Err({ title, cause, fix }: { title: string; cause: string; fix: string }) {
  return (
    <div style={s.errBox}>
      <div style={{ color: '#ff4757', fontWeight: 700, marginBottom: 6 }}>✗ {title}</div>
      <div style={{ fontSize: 13, color: '#ccc', marginBottom: 4 }}><strong>Why it happens:</strong> {cause}</div>
      <div style={{ fontSize: 13, color: '#ccc' }}><strong>Fix:</strong> {fix}</div>
    </div>
  )
}
function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#0a1a0a', borderLeft: '4px solid #2ed573', borderRadius: 6, padding: '14px 18px', marginBottom: 20, fontSize: 14, color: '#ccc', lineHeight: 1.8 }}>
      <strong style={{ color: '#2ed573' }}>Pro tip:</strong> {children}
    </div>
  )
}

export default function Module27() {
  return (
    <LearnLayout
      title="CTF Skills — Categories, Methodology, and Getting Your First Flag"
      description="How Capture The Flag competitions work, the five challenge categories (web, crypto, pwn, reverse engineering, forensics), essential tools for each, and the systematic approach to solving challenges when you are completely stuck."
      section="Cybersecurity — Module 27"
      readTime="30 min"
      updatedAt="May 2026"
    >
      <Part>
        <P>
          Capture The Flag competitions are structured security competitions where participants solve isolated security challenges, each containing a hidden string called a <Hl>flag</Hl> (typically in the format <code>CTF{'{'}something_meaningful{'}'}</code>).
          CTFs are the fastest way to build practical security skills outside of professional engagements — they expose you to every category of vulnerability in a legal, controlled environment with clear objective feedback (either you get the flag or you do not).
        </P>
        <P>
          The security professionals who are most effective at penetration testing are almost universally CTF players, past or present. The skills transfer directly: the mindset of "how does this system work and how can I make it do something unexpected?" is identical in both contexts. Many professional pentesters first discovered their vocation through CTFs.
        </P>
        <Callout type="info">
          CTF challenges are run on isolated infrastructure specifically designed to be attacked. Applying CTF techniques to real-world systems without authorisation is illegal. The legal and ethical boundary discussed in Module 21 applies here too.
        </Callout>
      </Part>

      <HR />

      <Part>
        <H>CTF Platforms and Competition Types</H>
        <P>
          Two competition formats dominate:
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Format</th>
              <th style={s.th}>How it works</th>
              <th style={s.th}>Best for</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Jeopardy', 'Categories of challenges at different point values. Solve challenges, submit flags, earn points. No interaction with other teams.', 'All skill levels — beginners can focus on easy challenges in their strongest category'],
              ['Attack/Defense (A/D)', 'Each team runs a server with vulnerable services. Attack other teams\' services while defending your own.', 'Advanced players — requires both offensive and defensive skills simultaneously'],
              ['Boot-to-Root (B2R)', 'Machines with realistic vulnerabilities. Get user shell, then root. Persistent infrastructure, solve on your own timeline.', 'Pentest skill building — most similar to real-world assessments'],
            ].map(([f, h, b]) => (
              <tr key={f}>
                <td style={{ ...s.td, fontWeight: 600, color: C }}>{f}</td>
                <td style={s.td}>{h}</td>
                <td style={s.td}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <P>Platforms to start with, in recommended order for beginners:</P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Platform</th>
              <th style={s.th}>Format</th>
              <th style={s.th}>Best for</th>
              <th style={s.th}>Cost</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['PicoCTF', 'Jeopardy, guided', 'Absolute beginners — educational with hints', 'Free'],
              ['TryHackMe', 'Guided rooms + B2R', 'Beginners learning with structured learning paths', 'Free tier, $14/mo for premium'],
              ['HackTheBox (HTB)', 'B2R machines', 'Intermediate to advanced — real-world machines', 'Free (retired machines) / $14/mo'],
              ['CTFtime.org', 'Competition calendar', 'Finding and tracking live competitions', 'Free'],
              ['pwn.college', 'Progressive pwn/binary', 'Deep binary exploitation from beginner to expert', 'Free'],
              ['CryptoHack', 'Cryptography', 'Hands-on crypto challenges with excellent explanations', 'Free'],
            ].map(([p, f, b, c]) => (
              <tr key={p}>
                <td style={{ ...s.td, fontWeight: 600 }}>{p}</td>
                <td style={s.td}>{f}</td>
                <td style={s.td}>{b}</td>
                <td style={{ ...s.td, color: c === 'Free' ? '#2ed573' : 'inherit' }}>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Part>

      <HR />

      <Part>
        <H>Category 1 — Web Challenges</H>
        <P>
          Web challenges test exploitation of web vulnerabilities: SQL injection, XSS, SSRF, IDOR, authentication bypass, template injection, and logic flaws. These transfer most directly to professional web application pentesting.
        </P>
        <Block>{`# Essential web CTF tools:

# Burp Suite Community — proxy, repeater, intruder
# (covered in depth in Module 25)

# curl — quick request testing
curl -v http://challenge.ctf.com/flag.php
curl -b "session=admin" http://challenge.ctf.com/admin    # set cookie
curl -H "X-Forwarded-For: 127.0.0.1" http://challenge.ctf.com/  # set header
curl -X POST -d "username=admin'--&password=x" http://challenge.ctf.com/login

# Browser DevTools — essential for JavaScript analysis
# F12 → Sources → search all files for 'flag', 'secret', 'token', 'password'
# F12 → Network → look at XHR requests while using the app
# F12 → Console → test JavaScript expressions, find hidden functions

# Common web CTF patterns:
# 1. Source code comments with hints or flags
#    curl http://challenge.ctf.com/ | grep -i "flag\|ctf\|<!--"

# 2. robots.txt — always check
#    curl http://challenge.ctf.com/robots.txt

# 3. /backup, /.git, /.env — common misconfiguration challenges
#    curl http://challenge.ctf.com/.git/HEAD   # git repository exposed

# 4. SQL injection — login bypass:
#    username: ' OR 1=1--
#    username: admin'--

# 5. Cookies — decode and modify:
#    base64 decode → JSON, change role or isAdmin field → re-encode → submit

# 6. JWT challenges:
#    jwt.io — decode and inspect header/payload
#    Try alg: none, weak secret brute force with jwt_tool

# 7. PHP type juggling:
#    "0e462097431906509019562988736854" == "0e830400451993494058024219903391"
#    → Both are 0^large_number = 0 in loose comparison
#    strcmp("flag", []) → 0 in PHP (array passed instead of string)

# 8. SSTI detection:
#    Inject {{'{'}}{7*7{'}'}} in every input field
#    If rendered as 49 → template injection

# 9. LFI path traversal:
#    ?file=../../../../etc/passwd
#    ?file=....//....//....//etc/passwd  (filter bypass)`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Category 2 — Cryptography Challenges</H>
        <P>
          Crypto challenges range from classical ciphers (Caesar, Vigenère) to modern cryptography (RSA, AES, elliptic curves). They test whether you understand <em>how</em> cryptographic systems work, because breaking them requires exploiting the specific mathematical weakness.
        </P>
        <Block>{`# ━━ CLASSICAL CIPHERS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Caesar cipher — rotate alphabet by N positions
# Brute force all 25 rotations:
python3 -c "
text = 'Khoor Zruog'
for i in range(26):
    print(i, ''.join(chr((ord(c)-65+i)%26+65) if c.isupper() else c for c in text))
"

# Substitution cipher analysis — frequency analysis
# 'E' is most common letter in English (~12.7%), then T, A, O, I, N
# Use quipqiup.com for automated substitution cipher solving

# Vigenère cipher — polyalphabetic substitution with keyword
# Identify: Kasiski test (repeated ciphertext segments → key length)
# Solve: Index of Coincidence, then frequency analysis per offset
# Tools: CyberChef → Vigenère Decode, dcode.fr


# ━━ ENCODING (not encryption) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# These appear constantly — distinguish from real crypto:
import base64, binascii

# Base64
base64.b64decode("Q1RGe2hlbGxvX3dvcmxkfQ==").decode()
# → CTF{hello_world}

# Hex
bytes.fromhex("4354467b68656c6c6f5f776f726c647d").decode()
# → CTF{hello_world}

# Binary
"01000011 01010100 01000110"  # space-separated bytes → ASCII
int("01000011", 2)  # → 67 → chr(67) = 'C'

# ROT13 — Caesar with 26/2 = 13
import codecs
codecs.decode("PGS{uryyb}", 'rot_13')   # → CTF{hello}

# CyberChef — magic function identifies encoding automatically
# gchq.github.io/CyberChef → "Magic" recipe → detects and decodes


# ━━ RSA ATTACKS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# RSA basics: c = m^e mod n, m = c^d mod n
# n = p * q (two large primes)
# Break RSA if: n is small, n is factored (factordb.com), e is very small

# Small e with small message (e=3, m^3 < n → no modular reduction):
import gmpy2
m = gmpy2.iroot(c, 3)[0]   # integer cube root
print(bytes.fromhex(hex(m)[2:]).decode())

# Factor n using factordb.com:
# If p and q are known: d = pow(e, -1, (p-1)*(q-1)); m = pow(c, d, n)

# Common modulus attack (same n, different e):
# m^e1 mod n and m^e2 mod n with gcd(e1, e2) = 1
# → recover m via extended Euclidean algorithm

# Tools:
# RsaCtfTool — automates common RSA attacks
python3 RsaCtfTool.py --publickey public.pem --uncipher cipher.txt

# factordb.com — database of factored numbers


# ━━ HASH CHALLENGES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# MD5 length extension attack:
# If MAC = MD5(secret || message), compute valid MAC for message + extension
# Tool: hash_extender

# Hash collision (MD5):
# echo -n "d131dd02c5e6eec4..." | xxd -r -p | md5sum  # show known collision pair

# CrackStation.net — online hash lookup for common hashes`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Category 3 — Forensics and Steganography</H>
        <P>
          Forensics challenges involve analysing files, network captures, memory dumps, and disk images for hidden data. Steganography challenges hide data inside images, audio, or other media.
        </P>
        <Block>{`# ━━ FILE ANALYSIS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# First steps on any challenge file:
file mystery.bin          # identify file type by magic bytes (not extension)
xxd mystery.bin | head    # hex dump — look at magic bytes manually
strings mystery.bin       # extract printable strings
strings mystery.bin | grep -i "ctf\|flag\|{'"
binwalk mystery.bin       # find embedded files within a file
binwalk -e mystery.bin    # extract embedded files


# ━━ IMAGE STEGANOGRAPHY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Metadata analysis:
exiftool image.jpg             # all EXIF metadata (GPS, camera, software)
# Look for: comments, software fields, GPS coordinates

# LSB (Least Significant Bit) steganography — data hidden in pixel values
# Tool: zsteg (PNG, BMP)
zsteg image.png -a            # try all detection methods
zsteg image.png -e "b1,r,lsb,xy"  # specific channel and order

# Tool: steghide (JPEG, BMP)
steghide info image.jpg       # check for embedded data (may ask passphrase)
steghide extract -sf image.jpg -p "password"  # extract with passphrase

# Tool: stegsolve (Java GUI) — view image bit planes, LSB layers

# Pixel differences:
# If challenge says "before" and "after" images:
python3 -c "
from PIL import Image
img1 = Image.open('before.png').convert('RGB')
img2 = Image.open('after.png').convert('RGB')
diff = [(abs(a[0]-b[0]), abs(a[1]-b[1]), abs(a[2]-b[2]))
        for a,b in zip(img1.getdata(), img2.getdata())]
# Find non-zero differences → hidden data
"


# ━━ NETWORK FORENSICS — PCAP ANALYSIS ━━━━━━━━━━━━━━━━━━━━━

# Wireshark — GUI analysis
# Edit → Find Packet: search for "flag" or "CTF"
# Statistics → Protocol Hierarchy: see what protocols are in the capture
# Follow TCP Stream: reconstruct a session

# tshark — command line
tshark -r capture.pcap -T fields -e http.request.uri  # show HTTP URIs
tshark -r capture.pcap -T fields -e data              # show raw TCP data
tshark -r capture.pcap -Y "http.request" -T fields -e http.host -e http.request.uri

# Export files from pcap:
# Wireshark → File → Export Objects → HTTP (or other protocol)


# ━━ MEMORY FORENSICS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Volatility 3 — memory dump analysis
vol.py -f memory.vmem windows.info         # OS information
vol.py -f memory.vmem windows.pslist       # running processes
vol.py -f memory.vmem windows.cmdline      # command lines (look for suspicious)
vol.py -f memory.vmem windows.dumpfiles --pid 1234  # dump files for a process
vol.py -f memory.vmem windows.hashdump     # extract NTLM hashes
vol.py -f memory.vmem windows.clipboard    # clipboard contents`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Category 4 — Binary Exploitation (Pwn)</H>
        <P>
          Binary exploitation challenges provide a compiled binary with a vulnerability — typically a buffer overflow, format string bug, or use-after-free. The goal is to control execution and get a shell or read a flag file. This is the deepest technical category and the focus of the OSCP exam machines.
        </P>
        <Block>{`# ━━ ESSENTIAL TOOLS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# pwntools — Python library for exploit development
from pwn import *

# Connect to local binary or remote service:
p = process('./vulnerable')          # local
p = remote('challenge.ctf.com', 1337)  # remote

p.recvuntil(b"Enter input: ")
p.sendline(b"A" * 100)
print(p.recvall())


# GDB with pwndbg — enhanced debugger for exploit development
gdb ./vulnerable
(gdb) run
(gdb) disassemble main             # disassemble function
(gdb) info functions               # list all functions
(gdb) break *0x401234              # breakpoint at address
(gdb) x/20x $rsp                   # examine stack (20 hex words)


# checksec — see binary protections
checksec vulnerable
# Outputs:
# RELRO:    Partial RELRO
# Stack:    No canary found        ← buffer overflow likely possible
# NX:       NX enabled             ← can't execute shellcode on stack
# PIE:      No PIE                 ← code at fixed addresses (easier ROP)
# ASLR:     Enabled                ← stack/heap randomised


# ━━ BUFFER OVERFLOW (no protections) ━━━━━━━━━━━━━━━━━━━━━━━

# Step 1: Find offset to EIP/RIP
# Cyclic pattern:
from pwn import *
pattern = cyclic(200)               # generate unique pattern
# Run in GDB, crash → read value at EIP/RIP
# cyclic_find(0x61616167) → offset = 6 bytes (example)

# Step 2: Find ret2win function address
p.elf = ELF('./vulnerable')
win_addr = p.elf.symbols['flag']    # find 'flag' function address

# Step 3: Construct payload
offset = 40                          # bytes to reach saved RIP
payload = b'A' * offset + p64(win_addr)  # p64 = 64-bit little-endian pack
p.sendline(payload)
p.interactive()


# ━━ ROP CHAINS (NX enabled) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# ROPgadget — find useful instruction sequences
ROPgadget --binary vulnerable --rop     # list gadgets
ROPgadget --binary vulnerable --string "/bin/sh"  # find /bin/sh string

# ropper — alternative gadget finder
ropper -f vulnerable --chain execve    # auto-generate execve chain

# pwntools ROP:
from pwn import *
elf = ELF('./vulnerable')
rop = ROP(elf)
rop.call(elf.symbols['system'], [next(elf.search(b'/bin/sh'))])
payload = b'A' * 40 + rop.chain()


# ━━ FORMAT STRING ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Vulnerable code: printf(user_input)   ← no format string!
# Exploit: send "%p.%p.%p" to leak stack values
# Or: "%7$s" to print a specific stack slot as a string
# Write: "%n" writes the number of bytes printed to a pointer on stack

# pwntools fmtstr_payload:
from pwn import *
payload = fmtstr_payload(offset=6, writes={target_addr: value_to_write})`}</Block>
        <ProTip>
          Start with binary exploitation on pwn.college — it teaches buffer overflows progressively from the basics (no protections) through canaries, PIE, ASLR, and full RELRO. Each level explains the concept before the challenge. This structured progression is far more effective than random CTF binaries.
        </ProTip>
      </Part>

      <HR />

      <Part>
        <H>Category 5 — Reverse Engineering</H>
        <P>
          Reverse engineering challenges provide a binary and ask you to understand what it does without source code. The goal is usually to find what input produces the flag output, understand a serial/keygen scheme, or unpack obfuscated code.
        </P>
        <Block>{`# ━━ STATIC ANALYSIS TOOLS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Ghidra — free, NSA-developed disassembler and decompiler
# File → New Project → Import binary
# Double-click function → Decompiler shows pseudo-C code
# Best for: understanding what a function does without running it

# IDA Free — industry standard (limited functionality in free version)

# strings — find hardcoded strings
strings binary | grep -i "flag\|ctf\|correct\|wrong\|password"

# ltrace / strace — dynamic analysis (system/library call tracing)
ltrace ./crackme          # show library calls (strcmp("flag", input)!)
strace ./crackme          # show system calls (open, read, write)

# objdump — disassemble sections
objdump -d ./crackme | grep -A 20 "main>"


# ━━ COMMON RE CHALLENGE PATTERNS ━━━━━━━━━━━━━━━━━━━━━━━━━━

# 1. strcmp-based keygen:
# ltrace shows: strcmp("CTF{real_flag}", "your_input")
# → flag is the first argument

# 2. XOR encoding:
# Encoded bytes XORed with a key byte-by-byte
# If key is known: bytes([c ^ key for c in encoded])
# If key unknown: try all 256 possibilities

# 3. Custom hash check:
# Program hashes your input and compares to hardcoded hash
# Reverse the hash algorithm or find collision

# 4. Packed/obfuscated binary:
# UPX packer → check magic bytes: UPX!
upx -d packed_binary     # decompress UPX-packed binary
# Then analyze the unpacked version normally

# 5. Anti-debugging checks:
# ptrace() == -1 means debugger attached → returns wrong answer
# Patch the je/jne instruction: binary patch or NOP the check in GDB


# ━━ Python / JavaScript RE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Compiled Python (.pyc) → decompile with uncompyle6 or decompile3
uncompyle6 challenge.pyc

# Obfuscated JS → beautify then analyze
# js-beautify challenge.js
# Then trace execution logic manually or in browser debugger`}</Block>
      </Part>

      <HR />

      <Part>
        <H>The "Stuck" Protocol — What to Do When Nothing Works</H>
        <P>
          Every CTF player gets stuck. The difference between those who improve and those who quit is having a systematic protocol for when the obvious approaches fail.
        </P>
        <Block>{`When you are completely stuck — run through this checklist:

1. ENUMERATE MORE AGGRESSIVELY
   □ Have you checked every input parameter? Hidden fields, HTTP headers, cookies?
   □ Did you run directory brute force? Tried backup extensions (.bak, .old, ~)?
   □ Have you checked JavaScript source files for hidden endpoints or logic?
   □ Did you view page source directly (not rendered DOM)?
   □ robots.txt? sitemap.xml? /.well-known/?

2. CHECK YOUR ASSUMPTIONS
   □ Are you certain the input you're modifying reaches the vulnerable function?
   □ Did you verify the vulnerability class? (Maybe it's SSTI not SQLi)
   □ Are there multiple parameters? Have you tested ALL of them?
   □ Is there a filter? Have you tried encoding/obfuscation bypasses?

3. TRY THE UNEXPECTED
   □ Change HTTP method (GET → POST, POST → PUT)
   □ Change Content-Type header
   □ Try null bytes, newlines, unicode variants
   □ What happens with very long input? Zero-length input? Non-ASCII?

4. RESEARCH
   □ What exact software version is this? Google: "software version CTF" or "version exploit"
   □ Search CTFtime.org write-ups for similar challenge names
   □ Check the hint (if available) — often contains the category of vulnerability

5. TAKE A BREAK
   □ Seriously. Walk away for 30 minutes.
   □ The insight almost always comes when you stop forcing it.
   □ Write down your current understanding before you leave — it helps on return.

6. READ WRITE-UPS (not a failure — it's research)
   □ CTFtime.org write-ups for the specific competition
   □ GitHub: "CTF challenge name writeup"
   □ Read just enough to get unstuck, then solve it yourself
   □ After solving, read the full write-up to see better approaches`}</Block>
      </Part>

      <HR />

      <Part>
        <H>Building Your CTF Toolkit</H>
        <P>
          Professional CTF players maintain a curated toolkit. Building yours incrementally — adding tools as you encounter the problems they solve — is better than installing everything at once.
        </P>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Category</th>
              <th style={s.th}>Essential tools</th>
              <th style={s.th}>Online resources</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['All categories', 'CyberChef, file, strings, binwalk, xxd', 'CyberChef (gchq.github.io/CyberChef)'],
              ['Web', 'Burp Suite, curl, Firefox DevTools, sqlmap, ffuf', 'GTFOBins, HackTricks'],
              ['Cryptography', 'Python + pycryptodome, RsaCtfTool', 'CryptHack, factordb.com, dcode.fr'],
              ['Forensics', 'Wireshark, tshark, Volatility 3, exiftool, binwalk', 'CyberChef, Wireshark filters'],
              ['Steganography', 'steghide, zsteg, stegsolve, exiftool', 'Aperisolve.fr (runs many tools at once)'],
              ['Binary exploitation', 'pwntools, GDB + pwndbg, ROPgadget, checksec', 'pwn.college, pwndbg docs'],
              ['Reverse engineering', 'Ghidra, strings, ltrace, strace, upx', 'Ghidra docs, dogbolt.org (multi-decompiler)'],
            ].map(([cat, tools, online]) => (
              <tr key={cat}>
                <td style={{ ...s.td, fontWeight: 600 }}>{cat}</td>
                <td style={{ ...s.td, fontFamily: 'monospace', fontSize: 12 }}>{tools}</td>
                <td style={s.td}>{online}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <P>
          <Hl>Kali Linux</Hl> and <Hl>Parrot OS</Hl> come with most of these tools pre-installed. Running them in a VM prevents any accidental system damage and keeps your toolkit consistent. For CTF work specifically, a dedicated Kali VM or a cloud instance is the standard setup.
        </P>
      </Part>

      <HR />

      <Part>
        <H>Interview Questions — CTF Skills</H>
        <IQ q="Why do employers care whether you have done CTFs?">
          CTFs demonstrate that you can apply security knowledge to solve concrete problems under time pressure — not just pass multiple choice exams. The skills tested are identical to real penetration testing: understanding how systems work, identifying where they can be abused, and finding the specific input that achieves an attacker's goal. CTF rankings on HackTheBox or CTFtime.org provide verifiable, objective evidence of skill level. Employers in offensive security roles — penetration testing, red team, bug bounty — view a strong CTF track record as more predictive of job performance than most certifications. It also signals self-motivation: nobody forces you to spend weekends on CTF challenges.
        </IQ>
        <IQ q="What is checksec and what does it tell you about a binary?">
          checksec reports the security mitigations compiled into a binary. RELRO (Relocation Read-Only) controls whether the GOT is writable — Partial RELRO leaves it writable, Full RELRO makes it read-only after startup. Stack canary is a random value placed before the return address — if overwritten, execution is terminated. NX (No-eXecute) marks the stack non-executable — shellcode injected there will cause a fault instead of executing, forcing the use of ROP chains. PIE (Position Independent Executable) means the binary is loaded at a random base address (requires ASLR leak to defeat). Each protection must be overcome differently, so checksec tells you which exploitation techniques are viable before you start.
        </IQ>
        <IQ q="Explain what a format string vulnerability is and why printf(user_input) is dangerous.">
          printf uses its first argument as a format string — it interprets %s, %p, %d, etc. as format specifiers that consume additional arguments from the stack. If the attacker controls the format string (printf(user_input) instead of printf("%s", user_input)), they can use %p to print stack addresses and memory values, %s to read a pointer from the stack as a string, and %n to write the count of characters printed so far to an address on the stack. The %n write primitive is the exploit primitive: with careful position counting, an attacker can overwrite a function pointer (GOT entry), a return address, or any other writable memory location with an arbitrary value — leading to arbitrary code execution.
        </IQ>
        <IQ q="What is a ROP chain and when do you need one?">
          A Return Oriented Programming (ROP) chain is a technique for achieving code execution on binaries where the stack is marked non-executable (NX/DEP enabled). Instead of injecting shellcode, the attacker chains together small sequences of existing instructions in the binary that end with a ret instruction — called gadgets. By overwriting the stack with the addresses of these gadgets in sequence, the attacker can execute arbitrary logic using code that already exists in the binary and loaded libraries. You need ROP when NX is enabled (shellcode on the stack cannot execute). Common ROP objectives: call system("/bin/sh") by loading the string address into RDI and a system() address into the return chain, or call execve via a syscall gadget.
        </IQ>
        <IQ q="You find a PNG file in a forensics challenge. What do you do first?">
          Check magic bytes with file to confirm it is actually a PNG. Run exiftool for metadata — challenge authors hide data in EXIF comments. Run strings and grep for CTF or the flag format. Run binwalk to check for embedded files within the PNG. Use zsteg to check for LSB steganography in each colour channel and bit plane. Use stegsolve to visually inspect bit planes — data hidden in the LSB layer of the red channel looks like noise on the full image but reveals the hidden pattern at bit plane 0. If there is a passphrase hint in the challenge description, try steghide extract. Check Aperisolve.fr which runs multiple steg tools automatically and shows results side by side.
        </IQ>
      </Part>

      <HR />

      <Part>
        <H>Common Mistakes — CTF Challenges</H>
        <Err
          title="Jumping to complex techniques before checking obvious things"
          cause="Spending two hours on SQL injection when the flag is in an HTML comment, or trying crypto attacks when the challenge just needs a Base64 decode."
          fix="Follow the 10-minute rule: spend ten minutes on the obvious checks before trying anything sophisticated. File metadata, page source, robots.txt, URL manipulation, and string search in files catch 30% of beginner CTF challenges before any real hacking is needed."
        />
        <Err
          title="Not reading the challenge description carefully"
          cause="The description often contains the category hint, a clue about the vulnerability class, or a red herring you are supposed to ignore. Beginners skip it and start hacking immediately."
          fix="Read the description three times before opening any tools. Note the category, note any specific hints, note what information is provided (source code? binary? network capture?). The challenge author spent time writing it — it contains relevant information."
        />
        <Err
          title="Giving up before reading write-ups"
          cause="Spending hours on a challenge with no progress, then quitting and moving on without learning the solution. The learning opportunity from seeing the correct technique is wasted."
          fix="After spending a reasonable amount of time stuck (30 minutes to 2 hours depending on difficulty), read a write-up. But read it actively: understand each step, try to reproduce the solution yourself even after seeing it, and save notes on the technique used. The purpose of a write-up is learning, not just getting credit."
        />
        <Err
          title="Not saving your work between CTF sessions"
          cause="A CTF runs for 48 hours. You make progress on a challenge, close your terminal, and the next day cannot remember what you discovered or what commands you ran."
          fix="Keep a notes file for each challenge: what you have tried, what you have found, what you hypothesise the vulnerability is. The notes file also becomes the basis for your own write-up after the competition, which solidifies learning and builds your portfolio."
        />
        <Err
          title="Playing alone when team play is available"
          cause="CTF competitions allow teams of up to 4–8 people. Solo play means covering every category yourself, which is overwhelming for beginners and inefficient for intermediates."
          fix="Find or form a CTF team. Most CTF Discord servers have channels for team-finding. Working with more experienced players in categories you are weak in is the fastest way to learn — watching someone who knows what they are doing solve a binary exploitation challenge teaches you more in one hour than reading about it for a week."
        />
      </Part>

      <HR />

      <KeyTakeaways items={[
        'CTFs are the fastest way to build practical security skills legally — every challenge is a focused exercise in making a system do something unexpected, identical to real penetration testing.',
        'Start with PicoCTF (guided) → TryHackMe (structured rooms) → HackTheBox (real-world machines). Each platform builds on the skills developed in the previous one.',
        'The five CTF categories are: web (OWASP vulnerabilities), cryptography (encoding, classical ciphers, RSA attacks), forensics/steganography (file analysis, PCAP, memory), binary exploitation (buffer overflows, ROP), and reverse engineering (disassembly, decompilation).',
        'CyberChef is the universal first tool for unknown data — its Magic recipe automatically detects and decodes Base64, hex, ROT13, and dozens of other encodings.',
        'checksec before pwning: it tells you which mitigations (NX, canary, PIE, RELRO) are present and which exploitation techniques are viable.',
        'ROP chains are required when NX is enabled — instead of injecting shellcode, you chain existing code gadgets in the binary to achieve your exploit goal.',
        'Format string vulnerabilities (printf(user_input)) allow arbitrary memory reads (%p, %s) and writes (%n) — the write primitive enables full code execution.',
        'For steganography: file → exiftool → strings → binwalk → zsteg → stegsolve → steghide — run this sequence on every image challenge before trying anything more exotic.',
        'The "stuck protocol": enumerate more aggressively, check your assumptions, try unexpected inputs, research the specific version, take a break, then read a write-up actively.',
        'Reading write-ups after a challenge is not giving up — it is research. The goal is learning the technique, not scoring points. Save notes on every new technique encountered.',
      ]} />

      <HR />

      <Callout type="info">
        You have completed Phase 4 — the full offensive security toolkit. In{' '}
        <Link href="/learn/cybersecurity/security-architecture">
          Module 28: Security Architecture
        </Link>
        , Phase 5 begins: the defensive side. You will learn how to design systems that are resilient to the attacks you now know how to execute — zero trust architecture, defence in depth, security controls selection, and how to think like an architect rather than an attacker.
      </Callout>
    </LearnLayout>
  )
}
