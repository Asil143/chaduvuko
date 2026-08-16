import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const moduleMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'what-is-python-setup':            () => import('@/content/python/what-is-python-setup'),
  'variables-data-types':            () => import('@/content/python/variables-data-types'),
  'operators':                       () => import('@/content/python/operators'),
  'strings':                         () => import('@/content/python/strings'),
  'control-flow':                    () => import('@/content/python/control-flow'),
  'loops':                           () => import('@/content/python/loops'),
  'functions':                       () => import('@/content/python/functions'),
  'lists':                           () => import('@/content/python/lists'),
  'tuples-sets':                     () => import('@/content/python/tuples-sets'),
  'io-formatting':                   () => import('@/content/python/io-formatting'),
  'dictionaries':                    () => import('@/content/python/dictionaries'),
  'comprehensions':                  () => import('@/content/python/comprehensions'),
  'nested-data-structures':          () => import('@/content/python/nested-data-structures'),
  'string-manipulation-deep-dive':   () => import('@/content/python/string-manipulation-deep-dive'),
  'reading-writing-files':           () => import('@/content/python/reading-writing-files'),
  'csv-json':                        () => import('@/content/python/csv-json'),
  'exception-handling':              () => import('@/content/python/exception-handling'),
  'modules-packages-venv':           () => import('@/content/python/modules-packages-venv'),
  'classes-objects':                 () => import('@/content/python/classes-objects'),
  'constructors-attributes':         () => import('@/content/python/constructors-attributes'),
  'inheritance-polymorphism':        () => import('@/content/python/inheritance-polymorphism'),
  'encapsulation-dunder-methods':    () => import('@/content/python/encapsulation-dunder-methods'),
  'class-static-methods-properties': () => import('@/content/python/class-static-methods-properties'),
  'abstract-base-classes':           () => import('@/content/python/abstract-base-classes'),
  'args-kwargs':                     () => import('@/content/python/args-kwargs'),
  'lambda-map-filter-reduce':        () => import('@/content/python/lambda-map-filter-reduce'),
  'iterators-iterables':             () => import('@/content/python/iterators-iterables'),
  'generators-yield':                () => import('@/content/python/generators-yield'),
  'decorators':                      () => import('@/content/python/decorators'),
  'context-managers':                () => import('@/content/python/context-managers'),
  'closures-scope':                  () => import('@/content/python/closures-scope'),
  'regular-expressions':             () => import('@/content/python/regular-expressions'),
  'dates-times':                     () => import('@/content/python/dates-times'),
  'multithreading-multiprocessing':  () => import('@/content/python/multithreading-multiprocessing'),
  'async-python':                    () => import('@/content/python/async-python'),
  'type-hints-mypy':                 () => import('@/content/python/type-hints-mypy'),
  'working-with-apis-python':        () => import('@/content/python/working-with-apis-python'),
  'unit-testing-pytest':             () => import('@/content/python/unit-testing-pytest'),
  'debugging-techniques':            () => import('@/content/python/debugging-techniques'),
  'logging-best-practices':          () => import('@/content/python/logging-best-practices'),
  'packaging-distribution':          () => import('@/content/python/packaging-distribution'),
  'performance-profiling':           () => import('@/content/python/performance-profiling'),
  'numpy-pandas-intro':              () => import('@/content/python/numpy-pandas-intro'),
  'building-a-cli-tool':             () => import('@/content/python/building-a-cli-tool'),
  'python-best-practices':           () => import('@/content/python/python-best-practices'),
  'python-interview-prep':           () => import('@/content/python/python-interview-prep'),
};

const moduleMeta: Record<string, { title: string; description: string }> = {
  'what-is-python-setup':            { title: 'What is Python? Setup & Your First Program', description: 'Why Python is the most in-demand language in the US job market, how it actually runs, and getting a real environment set up.' },
  'variables-data-types':            { title: 'Variables, Data Types & Type Conversion',     description: 'Every value in Python is an object. Variables, core data types, dynamic typing, and safe type conversion.' },
  'operators':                       { title: 'Operators — Arithmetic, Comparison, Logical', description: 'Every operator Python has, what it does under the hood, and the precedence rules that cause real bugs.' },
  'strings':                         { title: 'Strings — Creation, Indexing, Slicing, Methods', description: 'Indexing, slicing, the string methods that matter, and f-strings done right.' },
  'control-flow':                    { title: 'Control Flow — if / elif / else',             description: 'How Python evaluates truthiness, every form of conditional logic, and real readability patterns.' },
  'loops':                           { title: 'Loops — for / while, break / continue',       description: 'for vs while, iterating over every kind of collection, and the loop control keywords that trip up beginners.' },
  'functions':                       { title: 'Functions — Defining, Parameters, Return Values', description: 'Parameters, defaults, return values, and scope, explained from first principles.' },
  'lists':                           { title: 'Lists — Creation, Indexing, Methods',          description: 'The workhorse data structure of Python — every list method and how lists actually behave in memory.' },
  'tuples-sets':                     { title: 'Tuples and Sets',                              description: 'Immutable sequences and unordered unique collections — what they are for and when to use each.' },
  'io-formatting':                   { title: 'Input/Output & f-string Formatting',           description: 'Reading user input, printing output the right way, and every f-string formatting trick you will actually use.' },
  'dictionaries':                    { title: 'Dictionaries',                                 description: 'Key-value storage, the most-used data structure in real Python code.' },
  'comprehensions':                  { title: 'List, Dict and Set Comprehensions',            description: 'The Pythonic way to build collections — when comprehensions help, and when they hurt.' },
  'nested-data-structures':          { title: 'Nested Data Structures',                       description: 'Lists of dicts, dicts of lists, and the real-world JSON-shaped data you will actually work with.' },
  'string-manipulation-deep-dive':   { title: 'String Manipulation Deep Dive',                description: 'Parsing, cleaning, and transforming text at a level beyond the basics.' },
  'reading-writing-files':           { title: 'Reading & Writing Files',                      description: 'File handles, context managers, text vs binary mode, and the mistakes that cause data loss.' },
  'csv-json':                        { title: 'Working with CSV and JSON',                    description: 'The two formats every Python script touches, and the gotchas that break real pipelines.' },
  'exception-handling':              { title: 'Exception Handling',                           description: 'try/except/finally, catching the right exceptions, and writing your own.' },
  'modules-packages-venv':           { title: 'Modules, Packages & Virtual Environments',     description: 'import, pip, requirements.txt, and virtual environments — how real Python projects are structured.' },
  'classes-objects':                 { title: 'Classes and Objects — The Basics',             description: 'The core idea of OOP in Python — classes as blueprints, objects as instances.' },
  'constructors-attributes':         { title: 'Constructors, Instance vs Class Attributes',   description: 'The difference between data on an instance and data shared across a whole class.' },
  'inheritance-polymorphism':        { title: 'Inheritance and Polymorphism',                 description: 'Building class hierarchies, overriding methods, and writing code that works across related types.' },
  'encapsulation-dunder-methods':    { title: 'Encapsulation and Magic/Dunder Methods',       description: "Python's convention-based privacy, and the dunder methods that make objects behave like built-ins." },
  'class-static-methods-properties': { title: 'Class Methods, Static Methods and Properties', description: '@classmethod, @staticmethod, and @property — what each is actually for.' },
  'abstract-base-classes':           { title: 'Abstract Base Classes and Interfaces',         description: 'Enforcing a contract across subclasses with the abc module.' },
  'args-kwargs':                     { title: '*args, **kwargs and Function Arguments Deep Dive', description: 'Every way Python lets you pass arguments to a function.' },
  'lambda-map-filter-reduce':        { title: 'Lambda Functions and Functional Tools',        description: 'Anonymous functions and the functional-programming toolkit — map, filter, reduce.' },
  'iterators-iterables':             { title: 'Iterators and Iterables — Building Your Own',  description: 'What actually happens when you write a for loop, and building objects that support iteration.' },
  'generators-yield':                { title: 'Generators and yield',                         description: 'Lazy evaluation that saves memory at scale.' },
  'decorators':                      { title: 'Decorators — Writing and Using Them',           description: 'Functions that wrap functions. How decorators actually work, and writing your own.' },
  'context-managers':                { title: 'Context Managers and the with Statement',      description: 'What with is actually doing, and building your own for resource management.' },
  'closures-scope':                  { title: 'Closures and Scope — The LEGB Rule',            description: 'How Python resolves variable names, and what a closure actually captures.' },
  'regular-expressions':             { title: 'Regular Expressions with re',                  description: 'Pattern matching for text — intimidating-looking syntax that follows a small set of real rules.' },
  'dates-times':                     { title: 'Working with Dates and Times',                 description: 'datetime, timezones, and formatting — the module everyone gets wrong at least once.' },
  'multithreading-multiprocessing':  { title: 'Multithreading and Multiprocessing Basics',    description: 'The GIL, when threads actually help, and when you need real parallelism instead.' },
  'async-python':                    { title: 'Async Python — asyncio, async/await',          description: 'Asynchronous programming for I/O-bound work — coroutines and the event loop.' },
  'type-hints-mypy':                 { title: 'Type Hints and Static Typing with mypy',        description: 'Adding types to Python without losing what makes it Python.' },
  'working-with-apis-python':        { title: 'Working with APIs in Python',                  description: 'The requests library, REST calls, authentication, and error handling.' },
  'unit-testing-pytest':             { title: 'Unit Testing with pytest',                      description: 'Writing tests that actually catch bugs — fixtures, assertions, and mocking.' },
  'debugging-techniques':            { title: 'Debugging Techniques and Tools',               description: 'Systematic debugging beyond print statements — pdb and reading tracebacks like a senior engineer.' },
  'logging-best-practices':          { title: 'Logging Best Practices',                       description: 'Why print() is not logging — levels, handlers, and structuring logs for production.' },
  'packaging-distribution':          { title: 'Packaging and Distributing Python Projects',   description: 'Turning a script into a real installable package and publishing to PyPI.' },
  'performance-profiling':           { title: 'Python Performance — Profiling and Optimisation', description: 'Finding real bottlenecks before optimising anything.' },
  'numpy-pandas-intro':              { title: 'Intro to NumPy and pandas',                    description: 'The bridge from core Python into data work — arrays, DataFrames, and vectorisation.' },
  'building-a-cli-tool':             { title: 'Building a CLI Tool',                          description: 'A complete, real command-line tool built from scratch using argparse.' },
  'python-best-practices':           { title: 'Python Best Practices — PEP 8, Clean Code',    description: 'The conventions that separate readable, maintainable Python from code that merely works.' },
  'python-interview-prep':           { title: 'Python Interview Prep — Common Questions and Patterns', description: 'The Python questions that come up in real technical interviews, answered at senior-engineer depth.' },
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
  if (!meta) return { title: 'Python | Chaduvuko' };
  return {
    title: `${meta.title} | Python | Chaduvuko`,
    description: meta.description,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function PythonModulePage({
  params,
}: {
  params: { topic: string };
}) {
  const loader = moduleMap[params.topic];
  if (!loader) notFound();

  const { default: Content } = await loader();
  return <Content />;
}
