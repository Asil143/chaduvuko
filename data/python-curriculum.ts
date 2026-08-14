// ─────────────────────────────────────────────────────────────────────────────
// Python curriculum — shared source of truth for the track listing page and
// the per-lesson PythonSectionNav. Mirrors data/de-curriculum.ts's shape.
// ─────────────────────────────────────────────────────────────────────────────

export type PythonModuleStatus = 'live' | 'soon'

export interface PythonModule {
  id: number
  slug: string
  title: string
  description: string
  tags: string[]
  status: PythonModuleStatus
  readTime: string
  xp: number
}

export interface PythonSection {
  id: number
  title: string
  color: string
  modules: PythonModule[]
}

export const PYTHON_CURRICULUM: PythonSection[] = [
  {
    id: 1, title: 'Python Foundations', color: '#00e676',
    modules: [
      { id: 1, slug: 'what-is-python-setup', title: 'What is Python? Setup & Your First Program', description: 'Why Python is the most in-demand language in the US job market, how it actually runs, and getting a real environment set up — no confusion, no skipped steps.', tags: ['Why Python', 'Interpreter vs compiler', 'Installing Python', 'venv', 'pip & PyPI', 'Your first script'], status: 'live', readTime: '55 min', xp: 150 },
      { id: 2, slug: 'variables-data-types', title: 'Variables, Data Types & Type Conversion', description: 'Every value in Python is an object. Variables, the core data types, mutability, object identity, dynamic typing, and how to convert safely between them without silent bugs.', tags: ['Variables', 'int/float/str/bool', 'Mutability', 'Object identity', 'Dynamic typing', 'Type conversion'], status: 'live', readTime: '60 min', xp: 150 },
      { id: 3, slug: 'operators', title: 'Operators — Arithmetic, Comparison, Logical', description: 'Every operator Python has — including bitwise and membership operators — what each actually does under the hood, and the precedence rules that cause real bugs when ignored.', tags: ['Arithmetic', 'Comparison', 'Logical', 'Bitwise', 'Precedence', 'Walrus operator'], status: 'live', readTime: '50 min', xp: 150 },
      { id: 4, slug: 'strings', title: 'Strings — Creation, Indexing, Slicing, Methods', description: 'Strings are the data type you will touch the most. Indexing, slicing, the methods that matter, Unicode and encoding, and f-strings done right.', tags: ['Indexing', 'Slicing', 'String methods', 'Unicode & encoding', 'f-strings', 'Immutability'], status: 'live', readTime: '65 min', xp: 200 },
      { id: 5, slug: 'control-flow', title: 'Control Flow — if / elif / else', description: 'How Python actually evaluates truthiness, every form of conditional logic, structural pattern matching, and the readability patterns senior engineers actually use.', tags: ['if/elif/else', 'Truthy/falsy', 'match/case', 'Ternary expressions', 'Guard clauses'], status: 'live', readTime: '55 min', xp: 150 },
      { id: 6, slug: 'loops', title: 'Loops — for / while, break / continue', description: 'for vs while, iterating over every kind of collection, and the loop control keywords that trip up beginners.', tags: ['for loops', 'while loops', 'range()', 'break/continue', 'else on loops'], status: 'soon', readTime: '35 min', xp: 100 },
      { id: 7, slug: 'functions', title: 'Functions — Defining, Parameters, Return Values', description: 'Functions are how you stop repeating yourself. Parameters, defaults, return values, and scope, explained from first principles.', tags: ['def', 'Parameters', 'Return values', 'Default args', 'Scope basics'], status: 'soon', readTime: '40 min', xp: 150 },
      { id: 8, slug: 'lists', title: 'Lists — Creation, Indexing, Methods', description: 'The workhorse data structure of Python. Every list method, when to use each, and how lists actually behave in memory.', tags: ['Creating lists', 'Indexing/slicing', 'List methods', 'Mutability', 'Copying lists'], status: 'soon', readTime: '40 min', xp: 150 },
      { id: 9, slug: 'tuples-sets', title: 'Tuples and Sets', description: 'Immutable sequences and unordered unique collections — what they are for and why choosing the right structure matters.', tags: ['Tuples', 'Unpacking', 'Sets', 'Set operations', 'When to use each'], status: 'soon', readTime: '30 min', xp: 100 },
      { id: 10, slug: 'io-formatting', title: 'Input/Output & f-string Formatting', description: 'Reading user input, printing output the right way, and every f-string formatting trick you will actually use.', tags: ['input()', 'print()', 'f-string specs', 'String formatting', 'sep/end'], status: 'soon', readTime: '25 min', xp: 100 },
    ],
  },
  {
    id: 2, title: 'Core Data Structures & Logic', color: '#7b61ff',
    modules: [
      { id: 11, slug: 'dictionaries', title: 'Dictionaries', description: 'Key-value storage, the most-used data structure in real Python code — methods, iteration patterns, and performance characteristics.', tags: ['Creating dicts', 'Dict methods', 'Iteration', 'get() vs []', 'Nested dicts'], status: 'soon', readTime: '40 min', xp: 150 },
      { id: 12, slug: 'comprehensions', title: 'List, Dict and Set Comprehensions', description: 'The Pythonic way to build collections — when comprehensions make code clearer, and when they make it worse.', tags: ['List comprehensions', 'Dict comprehensions', 'Set comprehensions', 'Nested comprehensions'], status: 'soon', readTime: '35 min', xp: 150 },
      { id: 13, slug: 'nested-data-structures', title: 'Nested Data Structures', description: 'Lists of dicts, dicts of lists, and the real-world JSON-shaped data you will actually work with.', tags: ['Lists of dicts', 'Dicts of lists', 'Deep access patterns', 'Real-world shapes'], status: 'soon', readTime: '30 min', xp: 100 },
      { id: 14, slug: 'string-manipulation-deep-dive', title: 'String Manipulation Deep Dive', description: 'Parsing, cleaning, and transforming text at a level beyond the basics — the patterns every data-facing script needs.', tags: ['Splitting/joining', 'Cleaning text', 'Regex preview', 'Encoding basics'], status: 'soon', readTime: '35 min', xp: 150 },
      { id: 15, slug: 'reading-writing-files', title: 'Reading & Writing Files', description: 'File handles, context managers, text vs binary mode, and the mistakes that cause data loss.', tags: ['open()', 'with statement', 'Read/write modes', 'Encoding'], status: 'soon', readTime: '30 min', xp: 100 },
      { id: 16, slug: 'csv-json', title: 'Working with CSV and JSON', description: 'The two formats every Python script touches. The csv and json modules, and the gotchas that break real pipelines.', tags: ['csv module', 'json module', 'Serialization', 'Nested JSON'], status: 'soon', readTime: '35 min', xp: 150 },
      { id: 17, slug: 'exception-handling', title: 'Exception Handling', description: 'try/except/finally, catching the right exceptions, and writing your own — so your programs fail safely, not silently.', tags: ['try/except', 'finally', 'Custom exceptions', 'Exception hierarchy'], status: 'soon', readTime: '40 min', xp: 150 },
      { id: 18, slug: 'modules-packages-venv', title: 'Modules, Packages & Virtual Environments', description: 'import, pip, requirements.txt, and virtual environments — how real Python projects are actually structured.', tags: ['import', 'pip', 'Virtual environments', 'requirements.txt', 'Package structure'], status: 'soon', readTime: '35 min', xp: 150 },
    ],
  },
  {
    id: 3, title: 'Object-Oriented Python', color: '#f97316',
    modules: [
      { id: 19, slug: 'classes-objects', title: 'Classes and Objects — The Basics', description: 'The core idea of OOP in Python — classes as blueprints, objects as instances, from first principles.', tags: ['class keyword', 'Objects', '__init__', 'self'], status: 'soon', readTime: '40 min', xp: 150 },
      { id: 20, slug: 'constructors-attributes', title: 'Constructors, Instance vs Class Attributes', description: 'The difference between data that belongs to an instance and data shared across a whole class — and the bugs that come from confusing them.', tags: ['Constructors', 'Instance attributes', 'Class attributes', 'Mutable default gotcha'], status: 'soon', readTime: '35 min', xp: 150 },
      { id: 21, slug: 'inheritance-polymorphism', title: 'Inheritance and Polymorphism', description: 'Building class hierarchies, overriding methods, and writing code that works across related types.', tags: ['Inheritance', 'super()', 'Method overriding', 'Polymorphism'], status: 'soon', readTime: '45 min', xp: 200 },
      { id: 22, slug: 'encapsulation-dunder-methods', title: 'Encapsulation and Magic/Dunder Methods', description: 'Python\'s convention-based privacy, and the dunder methods that make your objects behave like built-in types.', tags: ['Encapsulation', '__str__/__repr__', '__eq__', 'Operator overloading'], status: 'soon', readTime: '40 min', xp: 150 },
      { id: 23, slug: 'class-static-methods-properties', title: 'Class Methods, Static Methods and Properties', description: '@classmethod, @staticmethod, and @property — what each is actually for, with real examples of when to reach for each.', tags: ['@classmethod', '@staticmethod', '@property', 'Getters/setters'], status: 'soon', readTime: '35 min', xp: 150 },
      { id: 24, slug: 'abstract-base-classes', title: 'Abstract Base Classes and Interfaces', description: 'Enforcing a contract across subclasses with the abc module — how larger Python codebases stay consistent.', tags: ['abc module', 'Abstract methods', 'Interfaces in Python', 'Duck typing'], status: 'soon', readTime: '30 min', xp: 150 },
    ],
  },
  {
    id: 4, title: 'Intermediate & Functional Python', color: '#facc15',
    modules: [
      { id: 25, slug: 'args-kwargs', title: '*args, **kwargs and Function Arguments Deep Dive', description: 'Every way Python lets you pass arguments — positional, keyword, variadic — and how to design flexible function signatures.', tags: ['*args', '**kwargs', 'Keyword-only args', 'Unpacking'], status: 'soon', readTime: '35 min', xp: 150 },
      { id: 26, slug: 'lambda-map-filter-reduce', title: 'Lambda Functions and Functional Tools', description: 'Anonymous functions and the functional-programming toolkit — map, filter, reduce — and when they help vs hurt readability.', tags: ['lambda', 'map()', 'filter()', 'functools.reduce'], status: 'soon', readTime: '30 min', xp: 150 },
      { id: 27, slug: 'iterators-iterables', title: 'Iterators and Iterables — Building Your Own', description: 'What actually happens when you write a for loop, and how to build objects that support iteration.', tags: ['Iterable protocol', '__iter__/__next__', 'iter()/next()', 'Custom iterators'], status: 'soon', readTime: '35 min', xp: 150 },
      { id: 28, slug: 'generators-yield', title: 'Generators and yield', description: 'Lazy evaluation that saves memory at scale — how generators work internally and when to use them over lists.', tags: ['yield', 'Generator functions', 'Generator expressions', 'Memory efficiency'], status: 'soon', readTime: '40 min', xp: 200 },
      { id: 29, slug: 'decorators', title: 'Decorators — Writing and Using Them', description: 'Functions that wrap functions. How decorators actually work, and writing your own from scratch.', tags: ['Decorator syntax', 'functools.wraps', 'Decorators with args', 'Real-world uses'], status: 'soon', readTime: '45 min', xp: 200 },
      { id: 30, slug: 'context-managers', title: 'Context Managers and the with Statement', description: 'What with is actually doing, and building your own context managers for resource management.', tags: ['with statement', '__enter__/__exit__', 'contextlib', 'Resource management'], status: 'soon', readTime: '30 min', xp: 150 },
      { id: 31, slug: 'closures-scope', title: 'Closures and Scope — The LEGB Rule', description: 'How Python resolves variable names, what a closure actually captures, and the scoping bugs that confuse everyone once.', tags: ['LEGB rule', 'Closures', 'nonlocal', 'global'], status: 'soon', readTime: '35 min', xp: 150 },
    ],
  },
  {
    id: 5, title: 'Advanced Python', color: '#4285f4',
    modules: [
      { id: 32, slug: 'regular-expressions', title: 'Regular Expressions with re', description: 'Pattern matching for text — the syntax that looks intimidating but follows a small set of real rules.', tags: ['re module', 'Patterns', 'Groups', 'Common patterns'], status: 'soon', readTime: '45 min', xp: 200 },
      { id: 33, slug: 'dates-times', title: 'Working with Dates and Times', description: 'datetime, timezones, and formatting — the module every real application needs and everyone gets wrong at least once.', tags: ['datetime module', 'Timezones', 'strftime/strptime', 'timedelta'], status: 'soon', readTime: '35 min', xp: 150 },
      { id: 34, slug: 'multithreading-multiprocessing', title: 'Multithreading and Multiprocessing Basics', description: 'The GIL, when threads actually help, and when you need real parallelism with processes instead.', tags: ['threading module', 'multiprocessing', 'The GIL', 'When to use each'], status: 'soon', readTime: '45 min', xp: 200 },
      { id: 35, slug: 'async-python', title: 'Async Python — asyncio, async/await', description: 'Asynchronous programming for I/O-bound work — coroutines, the event loop, and where async actually pays off.', tags: ['async/await', 'asyncio', 'Coroutines', 'Event loop'], status: 'soon', readTime: '50 min', xp: 250 },
      { id: 36, slug: 'type-hints-mypy', title: 'Type Hints and Static Typing with mypy', description: 'Adding types to Python without losing what makes it Python — annotations, generics, and catching bugs before runtime.', tags: ['Type annotations', 'typing module', 'mypy', 'Optional/Union'], status: 'soon', readTime: '35 min', xp: 150 },
      { id: 37, slug: 'working-with-apis-python', title: 'Working with APIs in Python', description: 'The requests library, REST calls, authentication, and error handling for talking to real-world APIs.', tags: ['requests library', 'GET/POST', 'Auth headers', 'Error handling'], status: 'soon', readTime: '40 min', xp: 200 },
      { id: 38, slug: 'unit-testing-pytest', title: 'Unit Testing with pytest', description: 'Writing tests that actually catch bugs — fixtures, assertions, mocking, and testing as a habit, not an afterthought.', tags: ['pytest basics', 'Fixtures', 'Assertions', 'Mocking'], status: 'soon', readTime: '45 min', xp: 200 },
    ],
  },
  {
    id: 6, title: 'Production & Career Readiness', color: '#ff4757',
    modules: [
      { id: 39, slug: 'debugging-techniques', title: 'Debugging Techniques and Tools', description: 'Systematic debugging beyond print statements — pdb, tracebacks, and reading errors like a senior engineer.', tags: ['Reading tracebacks', 'pdb', 'Debugging strategy', 'IDE debuggers'], status: 'soon', readTime: '30 min', xp: 150 },
      { id: 40, slug: 'logging-best-practices', title: 'Logging Best Practices', description: 'Why print() is not logging — the logging module, levels, and structuring logs for production systems.', tags: ['logging module', 'Log levels', 'Handlers', 'Structured logging'], status: 'soon', readTime: '35 min', xp: 150 },
      { id: 41, slug: 'packaging-distribution', title: 'Packaging and Distributing Python Projects', description: 'Turning a script into a real installable package — project structure, pyproject.toml, and publishing to PyPI.', tags: ['Project structure', 'pyproject.toml', 'Building packages', 'PyPI'], status: 'soon', readTime: '35 min', xp: 150 },
      { id: 42, slug: 'performance-profiling', title: 'Python Performance — Profiling and Optimisation', description: 'Finding real bottlenecks before optimising anything — profiling tools and the optimisations that actually matter.', tags: ['cProfile', 'Big O in practice', 'Common bottlenecks', 'Optimisation strategy'], status: 'soon', readTime: '40 min', xp: 200 },
      { id: 43, slug: 'numpy-pandas-intro', title: 'Intro to NumPy and pandas', description: 'The bridge from core Python into data work — arrays, DataFrames, and why these libraries exist at all.', tags: ['NumPy arrays', 'pandas DataFrames', 'Vectorisation', 'When you need them'], status: 'soon', readTime: '45 min', xp: 200 },
      { id: 44, slug: 'building-a-cli-tool', title: 'Building a CLI Tool', description: 'A complete, real command-line tool built from scratch using argparse — start to finish, project-style.', tags: ['argparse', 'CLI design', 'Packaging a CLI', 'Full project'], status: 'soon', readTime: '50 min', xp: 250 },
      { id: 45, slug: 'python-best-practices', title: 'Python Best Practices — PEP 8, Clean Code', description: 'The conventions that separate readable, maintainable Python from code that works but nobody wants to touch.', tags: ['PEP 8', 'Naming conventions', 'Clean code', 'Docstrings'], status: 'soon', readTime: '30 min', xp: 150 },
      { id: 46, slug: 'python-interview-prep', title: 'Python Interview Prep — Common Questions and Patterns', description: 'The Python questions that come up in real technical interviews, answered at senior-engineer depth.', tags: ['Common questions', 'Coding patterns', 'Gotchas', 'Behavioural prep'], status: 'soon', readTime: '60 min', xp: 250 },
    ],
  },
]
