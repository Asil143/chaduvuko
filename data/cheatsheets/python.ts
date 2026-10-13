import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const pythonCheatSheet: TrackCheatSheet = {
  track: 'python',
  title: 'Python',
  trackHref: '/learn/python',
  accent: '#3b82f6',
  blurb: 'Every core Python pattern from the track on one page — syntax, data structures, functions, classes, files and the standard library. Bookmark it.',
  sections: [
    {
      title: 'Basics',
      entries: [
        { label: 'Variables & types', code: `x = 42          # int\npi = 3.14       # float\nname = "Ava"    # str\nok = True       # bool\nnothing = None  # NoneType` },
        { label: 'Convert types', code: `int("7")      # 7\nfloat("3.5")  # 3.5\nstr(42)       # "42"\nbool("")      # False` },
        { label: 'f-string formatting', code: `f"{name} is {x}"\nf"{pi:.2f}"        # 3.14\nf"{1234567:,}"     # 1,234,567\nf"{0.25:.0%}"      # 25%` },
        { label: 'Comparison & logic', code: `a == b   a != b   a < b\nand   or   not\nx in items       # membership\na is None        # identity` },
      ],
    },
    {
      title: 'Strings',
      entries: [
        { label: 'Index & slice', code: `s[0]      # first char\ns[-1]     # last char\ns[1:4]    # chars 1,2,3\ns[::-1]   # reversed` },
        { label: 'Common methods', code: `s.upper()  s.lower()  s.strip()\ns.replace("a", "b")\ns.split(",")   ",".join(parts)\ns.startswith("http")  s.find("x")` },
      ],
    },
    {
      title: 'Lists',
      entries: [
        { label: 'Create & access', code: `nums = [3, 1, 2]\nnums[0]        # 3\nnums[-1]       # 2\nnums[1:3]      # [1, 2]` },
        { label: 'Modify', code: `nums.append(4)\nnums.extend([5, 6])\nnums.insert(0, 9)\nnums.remove(1)   nums.pop()` },
        { label: 'Sort', code: `nums.sort()              # in place\nsorted(nums, reverse=True)\nsorted(rows, key=lambda r: r[1])` },
        { label: 'Comprehension', code: `[n * n for n in nums]\n[n for n in nums if n > 1]\n["even" if n % 2 == 0 else "odd" for n in nums]` },
      ],
    },
    {
      title: 'Dicts, sets & tuples',
      entries: [
        { label: 'Dict', code: `d = {"a": 1, "b": 2}\nd["a"]            # 1\nd.get("x", 0)     # default\nfor k, v in d.items(): ...` },
        { label: 'Set', code: `s = {1, 2, 3}\ns.add(4)\na & b   a | b   a - b   # ∩ ∪ difference\nx in s            # O(1)` },
        { label: 'Tuple & unpack', code: `point = (3, 4)\nx, y = point\nfirst, *rest = [1, 2, 3, 4]` },
      ],
    },
    {
      title: 'Control flow',
      entries: [
        { label: 'if / elif / else', code: `if score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "C"` },
        { label: 'for / while', code: `for i in range(5): ...\nfor x in items: ...\nfor i, x in enumerate(items): ...\nwhile cond: ...` },
        { label: 'break / continue', code: `for x in items:\n    if x < 0:\n        continue   # skip\n    if x > 100:\n        break      # stop` },
      ],
    },
    {
      title: 'Functions',
      entries: [
        { label: 'Define & return', code: `def add(a, b=0):\n    return a + b\n\nadd(2)      # 2\nadd(2, 3)   # 5` },
        { label: '*args / **kwargs', code: `def f(*args, **kwargs):\n    print(args)    # tuple\n    print(kwargs)  # dict\nf(1, 2, x=3)` },
        { label: 'Lambda', code: `square = lambda n: n * n\nsorted(data, key=lambda r: r["age"])` },
        { label: 'Avoid mutable default', code: `def f(items=None):\n    items = [] if items is None else items\n    ...` },
      ],
    },
    {
      title: 'Classes',
      entries: [
        { label: 'Define a class', code: `class Account:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n    def deposit(self, amount):\n        self.balance += amount` },
        { label: 'Inheritance', code: `class Savings(Account):\n    def __init__(self, owner, rate):\n        super().__init__(owner)\n        self.rate = rate` },
        { label: 'Dunder methods', code: `def __repr__(self): return f"Account({self.owner})"\ndef __eq__(self, other): return self.id == other.id\ndef __len__(self): return len(self.items)` },
      ],
    },
    {
      title: 'Errors & files',
      entries: [
        { label: 'try / except', code: `try:\n    n = int(text)\nexcept ValueError:\n    n = 0\nelse:\n    print("ok")\nfinally:\n    cleanup()` },
        { label: 'Read & write files', code: `with open("data.txt") as f:\n    for line in f:\n        print(line.rstrip())\n\nwith open("out.txt", "w") as f:\n    f.write("hello\\n")` },
        { label: 'Raise', code: `if x < 0:\n    raise ValueError("x must be >= 0")` },
      ],
    },
    {
      title: 'Comprehensions & iterators',
      entries: [
        { label: 'Dict / set comp', code: `{n: n * n for n in range(3)}\n{len(w) for w in words}` },
        { label: 'Generator', code: `def squares(n):\n    for i in range(n):\n        yield i * i\n\ngen = (x * x for x in range(1000))` },
        { label: 'map / filter', code: `list(map(str, nums))\nlist(filter(lambda n: n > 0, nums))` },
      ],
    },
    {
      title: 'Standard library',
      entries: [
        { label: 'collections', code: `from collections import Counter, defaultdict\nCounter(words).most_common(3)\ndefaultdict(list)` },
        { label: 'json & csv', code: `import json, csv\njson.loads(text)   json.dumps(obj)\nfor row in csv.DictReader(f): ...` },
        { label: 'datetime', code: `from datetime import datetime, timedelta\ndatetime.now()\ndt + timedelta(days=3)\ndt.strftime("%Y-%m-%d")` },
        { label: 'pathlib', code: `from pathlib import Path\nPath("data") / "in.csv"\np.exists()   p.read_text()` },
      ],
    },
  ],
  projects: [
    { title: 'CSV cleaner CLI', level: 'Beginner', build: 'A command-line tool that reads a messy CSV, drops bad rows, normalises types, and writes a clean file. Report how many rows were dropped and why.', skills: ['argparse', 'csv', 'error handling', 'file I/O'] },
    { title: 'Expense tracker', level: 'Beginner', build: 'Store expenses in a JSON file; add, list, and total them by category from the command line. Persist between runs.', skills: ['json', 'dicts', 'functions', 'CLI'] },
    { title: 'Weather fetcher', level: 'Intermediate', build: 'Call a public weather API for several cities, handle timeouts and rate limits with retries, and print a formatted summary.', skills: ['requests', 'retries', 'f-strings', 'env vars'] },
    { title: 'Log analyser', level: 'Intermediate', build: 'Parse a web server log with a regex, count status codes and top URLs, and flag error spikes. Stream the file line by line for constant memory.', skills: ['regex', 'generators', 'Counter', 'performance'] },
    { title: 'Mini task queue', level: 'Advanced', build: 'A small library where tasks are functions registered with a decorator, run with retries and logging, and results tracked. Add unit tests.', skills: ['decorators', 'OOP', 'logging', 'pytest'] },
  ],
}
