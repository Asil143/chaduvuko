import type { LessonQuick } from '@/lib/lesson-quick'

const P = '/learn/python'

// Python examples are run by scripts/quick-results.ts; the output shown on the page is what
// they really print. Examples that need a network, a terminal or input are marked static.
export const PYTHON_QUICK: Record<string, LessonQuick> = {
  [`${P}/what-is-python-setup`]: {
    answer: 'Python is a general-purpose programming language that reads almost like English. You install Python 3 from python.org, write code in a .py file, and run it with python3 file.py; the interpreter compiles it to bytecode and executes it.',
    points: [
      'Always use Python 3; Python 2 has been unsupported since January 2020.',
      'On macOS and Linux, type python3 and pip3 to avoid an old system Python.',
      '"command not found" after installing usually means Python is not on your PATH.',
    ],
    example: {
      label: 'A first program, saved as hello.py',
      lang: 'python',
      code: `import sys

print("Hello, world!")
print("Running Python", sys.version_info.major)`,
    },
    check: {
      question: 'How does CPython run your .py file?',
      options: ['It compiles it to a native .exe first', 'It compiles it to bytecode and runs that on the Python virtual machine', 'It sends it to a server', 'It translates it to JavaScript'],
      answer: 1,
      explanation: 'There is no separate build step: CPython compiles source to bytecode on the fly and its virtual machine executes it.',
    },
  },

  [`${P}/variables-data-types`]: {
    answer: 'A variable is a name that points to a value (an object). Python\'s core types are int, float, str, bool and None; the type belongs to the value, not the name, and you convert between types with int(), float(), str() and bool().',
    points: [
      'type(x) tells you what kind of object x refers to.',
      'Floats are approximate: 0.1 + 0.2 is not exactly 0.3. Use decimal.Decimal for money.',
      'int, float, str and tuple are immutable; list, dict and set can change in place.',
    ],
    example: {
      label: 'Types, conversion, and float precision',
      lang: 'python',
      code: `age = "42"
print(type(age), int(age) + 1)
print(0.1 + 0.2)

from decimal import Decimal
print(Decimal("0.1") + Decimal("0.2"))`,
    },
    check: {
      question: 'What does int("7") + 1 return?',
      options: ['"71"', '8', '"8"', 'TypeError'],
      answer: 1,
      explanation: 'int("7") converts the text to the integer 7, and 7 + 1 is 8.',
    },
  },

  [`${P}/operators`]: {
    answer: 'Operators combine values: arithmetic (+ - * / // % **), comparison (== != < > <= >=), logical (and, or, not), membership (in) and identity (is). / always returns a float; // floors to a whole number.',
    points: [
      '7 / 2 is 3.5, 7 // 2 is 3, and -7 // 2 is -4 (it floors, not truncates).',
      '== compares values; is checks whether two names point to the same object.',
      'and / or return one of their operands, which is why name or "guest" gives a default.',
    ],
    example: {
      label: 'Division, floor division and short-circuit defaults',
      lang: 'python',
      code: `print(7 / 2, 7 // 2, -7 // 2, 7 % 2)
print(2 ** 10)

name = ""
print(name or "guest")`,
    },
    check: {
      question: 'What is -7 // 2 in Python?',
      options: ['-3', '-4', '-3.5', '3'],
      answer: 1,
      explanation: '// rounds down toward negative infinity, so -3.5 becomes -4, not -3.',
    },
  },

  [`${P}/strings`]: {
    answer: 'A string is an immutable sequence of characters. You index it (s[0]), slice it (s[1:4]), and transform it with methods such as upper(), replace() and split(); each method returns a new string.',
    points: [
      'Slices exclude the stop index, and never raise IndexError.',
      's[::-1] reverses a string.',
      'f-strings build text from values: f"{price:.2f}" shows two decimals.',
    ],
    example: {
      label: 'Indexing, slicing, methods and an f-string',
      lang: 'python',
      code: `word = "Seattle"
print(word[0], word[-1], word[1:4], word[::-1])
print(word.upper(), word.replace("tt", "TT"))

price = 1234.5
print(f"Total: \${price:,.2f}")`,
    },
    check: {
      question: 'What does "python"[1:4] return?',
      options: ['"pyt"', '"yth"', '"ytho"', '"pyth"'],
      answer: 1,
      explanation: 'The slice starts at index 1 (y) and stops before index 4, giving "yth".',
    },
  },

  [`${P}/control-flow`]: {
    answer: 'if, elif and else run a block only when its condition is true, checking conditions top to bottom and running the first match. Blocks are defined by indentation, and every condition line ends with a colon.',
    points: [
      'Only the first true branch runs; the rest are skipped.',
      'Falsy values: False, None, 0, 0.0, "", [], {}, (), set(). Everything else is truthy.',
      'Write if items: rather than if len(items) > 0:.',
    ],
    example: {
      label: 'Grade a score',
      lang: 'python',
      code: `def grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    else:
        return "C"

print(grade(95), grade(85), grade(70))
print(bool([]), bool([0]))`,
    },
    check: {
      question: 'Which of these values is truthy?',
      options: ['0', '""', '[0]', 'None'],
      answer: 2,
      explanation: '[0] is a list with one item, and any non-empty list is truthy, even if the item is 0.',
    },
  },

  [`${P}/loops`]: {
    answer: 'A for loop runs once for each item of an iterable, such as a list, string or range(). A while loop repeats while a condition stays true. break leaves the loop; continue skips to the next item.',
    points: [
      'range(5) gives 0 to 4; the stop value is never included.',
      'enumerate() gives index and value; zip() walks two lists together.',
      'A while loop must change something its condition depends on, or it never ends.',
    ],
    example: {
      label: 'range, enumerate and zip',
      lang: 'python',
      code: `for i in range(3):
    print("round", i)

cities = ["Austin", "Denver"]
temps = [91, 78]
for i, (city, temp) in enumerate(zip(cities, temps), start=1):
    print(i, city, temp)`,
    },
    check: {
      question: 'What numbers does range(2, 5) produce?',
      options: ['2, 3, 4, 5', '2, 3, 4', '3, 4, 5', '2, 5'],
      answer: 1,
      explanation: 'range starts at 2 and stops before 5.',
    },
  },

  [`${P}/functions`]: {
    answer: 'A function is a named, reusable block defined with def. It takes parameters, runs its body, and hands a value back with return; a function without return gives back None.',
    points: [
      'Parameters are names in the definition; arguments are the values you pass.',
      'Default values are created once, so never use a list or dict as a default.',
      'print() shows a value; return gives it back to the caller to use.',
    ],
    example: {
      label: 'Parameters, a default, and the mutable-default trap',
      lang: 'python',
      code: `def add_tax(price, rate=0.08):
    return round(price * (1 + rate), 2)

print(add_tax(100), add_tax(100, rate=0.1))

def remember(item, seen=[]):   # bug: one list shared by every call
    seen.append(item)
    return seen

print(remember("a"), remember("b"))`,
    },
    check: {
      question: 'What does a function return when it has no return statement?',
      options: ['0', 'An empty string', 'None', 'The last value it computed'],
      answer: 2,
      explanation: 'Every function returns something; without a return statement it returns None.',
    },
  },

  [`${P}/lists`]: {
    answer: 'A list is an ordered, changeable collection: [1, 2, 3]. You index and slice it like a string, change items in place, and grow or shrink it with methods such as append(), extend(), insert(), remove() and pop().',
    points: [
      'append() adds one item; extend() adds each item of another iterable.',
      'sort() changes the list and returns None; sorted() returns a new list.',
      'b = a does not copy; use a.copy() or a[:] (copy.deepcopy for nested lists).',
    ],
    example: {
      label: 'append vs extend, and aliasing',
      lang: 'python',
      code: `a = [3, 1, 2]
a.append([4, 5])
print(a)

b = [3, 1, 2]
b.extend([4, 5])
print(sorted(b), b)

c = b
c.append(99)
print(b[-1])`,
    },
    check: {
      question: 'What is x after x = [3, 1, 2]; x = x.sort()?',
      options: ['[1, 2, 3]', '[3, 1, 2]', 'None', 'An error'],
      answer: 2,
      explanation: 'sort() sorts in place and returns None, so the assignment replaces the list with None.',
    },
  },

  [`${P}/tuples-sets`]: {
    answer: 'A tuple is an ordered, unchangeable sequence, written (1, 2). A set is an unordered collection of unique values, written {1, 2}, with fast membership tests and set algebra: union, intersection and difference.',
    points: [
      'A one-item tuple needs a trailing comma: (42,).',
      'Unpack tuples into names: first, *rest = (1, 2, 3).',
      'x in a_set is fast even for huge sets; x in a_list scans the whole list.',
    ],
    example: {
      label: 'Unpacking and set operations',
      lang: 'python',
      code: `point = (3, 4)
x, y = point
first, *rest = (1, 2, 3, 4)
print(x, y, first, rest)

a = {"sql", "python", "git"}
b = {"python", "docker"}
print(sorted(a & b), sorted(a | b), sorted(a - b))`,
    },
    check: {
      question: 'What is type((42))?',
      options: ['tuple', 'int', 'list', 'set'],
      answer: 1,
      explanation: 'Parentheses alone just group an expression. A one-item tuple needs a comma: (42,).',
    },
  },

  [`${P}/io-formatting`]: {
    answer: 'input() reads a line typed by the user and always returns a string; print() writes values out, separated by sep (a space by default) and ended by end (a newline by default).',
    points: [
      'Convert input right away: age = int(input("Age: ")).',
      'Read several values from one line with a, b = input().split().',
      'Errors and diagnostics belong on stderr: print(msg, file=sys.stderr).',
    ],
    example: {
      label: 'What input() gives you, and print\'s sep and end',
      lang: 'python',
      code: `age = "29"            # what input() returns when someone types 29
print(type(age), int(age) + 1)

print("2024", "03", "15", sep="-")
print("Loading", end="... ")
print("done")`,
    },
    check: {
      question: 'What type does input() return when the user types 42?',
      options: ['int', 'float', 'str', 'It depends on what was typed'],
      answer: 2,
      explanation: 'input() always returns a str. Convert it with int() or float() before doing arithmetic.',
    },
  },

  [`${P}/dictionaries`]: {
    answer: 'A dictionary maps keys to values: {"name": "Ava", "age": 30}. You look values up by key, add or change them by assigning, and loop over pairs with .items(). Keys must be hashable, such as strings, numbers and tuples.',
    points: [
      'd[key] raises KeyError for a missing key; d.get(key, default) returns the default.',
      'Loop with for key, value in d.items().',
      'Dictionaries keep insertion order (guaranteed since Python 3.7).',
    ],
    example: {
      label: 'get, items and counting with a dict',
      lang: 'python',
      code: `prices = {"apple": 1.2, "milk": 3.5}
print(prices.get("bread", 0))
prices["bread"] = 2.75
for item, price in prices.items():
    print(item, price)

counts = {}
for word in "to be or not to be".split():
    counts[word] = counts.get(word, 0) + 1
print(counts)`,
    },
    check: {
      question: 'Which can be a dictionary key?',
      options: ['[1, 2]', '{"a": 1}', '(1, 2)', '{1, 2}'],
      answer: 2,
      explanation: 'Keys must be hashable. Tuples of hashable values are; lists, dicts and sets are not.',
    },
  },

  [`${P}/comprehensions`]: {
    answer: 'A comprehension builds a new collection in one expression: [expr for item in iterable if condition]. The same shape makes dicts ({k: v for …}) and sets ({x for …}).',
    points: [
      'A trailing if filters items out; a ternary in the expression transforms every item.',
      'Two for clauses flatten nested lists.',
      'If it no longer fits on one readable line, use a plain loop.',
    ],
    example: {
      label: 'List, dict and set comprehensions',
      lang: 'python',
      code: `nums = [1, 2, 3, 4, 5, 6]
print([n * n for n in nums if n % 2 == 0])
print(["even" if n % 2 == 0 else "odd" for n in nums[:3]])
print({n: n * n for n in nums[:3]})
print({len(w) for w in ["sql", "git", "python"]})`,
    },
    check: {
      question: 'What does [x for x in range(5) if x > 2] produce?',
      options: ['[3, 4]', '[2, 3, 4]', '[True, True]', '[0, 1, 2]'],
      answer: 0,
      explanation: 'range(5) gives 0 to 4 and the filter keeps values greater than 2: 3 and 4.',
    },
  },

  [`${P}/nested-data-structures`]: {
    answer: 'Real data is usually nested: a list of dicts (records) or a dict of lists (grouped records), as in JSON from an API. You reach inside with chained indexing, safely with .get(), and sort or group with key functions and defaultdict.',
    points: [
      'Use .get() with a default at each level: user.get("address", {}).get("city").',
      'Sort records with sorted(rows, key=lambda r: r["total"]).',
      'Group with collections.defaultdict(list).',
    ],
    example: {
      label: 'Safe access, sorting and grouping records',
      lang: 'python',
      code: `from collections import defaultdict

orders = [
    {"id": 1, "city": "Austin", "total": 40},
    {"id": 2, "city": "Denver", "total": 25},
    {"id": 3, "city": "Austin", "total": 15},
]
print(orders[0].get("customer", {}).get("name", "unknown"))
print([o["id"] for o in sorted(orders, key=lambda o: o["total"])])

by_city = defaultdict(int)
for o in orders:
    by_city[o["city"]] += o["total"]
print(dict(by_city))`,
    },
    check: {
      question: 'Why use data.get("address", {}).get("city") instead of data["address"]["city"]?',
      options: ['It is faster', 'It returns None instead of crashing when a level is missing', 'It sorts the result', 'It copies the dict'],
      answer: 1,
      explanation: 'Real data is often incomplete. Chained .get() with defaults handles missing levels without a KeyError.',
    },
  },

  [`${P}/string-manipulation-deep-dive`]: {
    answer: 'Cleaning text means normalising it before you compare or store it: strip() whitespace, lower() or casefold() case, split() and join() fields, and pad with ljust/rjust/zfill for aligned output.',
    points: [
      'Normalise before comparing: s.strip().casefold().',
      're.split() splits on a pattern when the delimiter varies.',
      'zfill pads numbers with zeros: "7".zfill(3) is "007".',
    ],
    example: {
      label: 'Normalise messy input and align a report',
      lang: 'python',
      code: `import re

raw = "  Seattle ,PORTLAND;  austin "
cities = [c.strip().title() for c in re.split(r"[,;]", raw)]
print(cities)

for code, qty in [("7", 120), ("42", 9)]:
    print(code.zfill(4), str(qty).rjust(5))`,
    },
    check: {
      question: 'What does "  hi  ".strip() return?',
      options: ['"  hi"', '"hi  "', '"hi"', '"  hi  "'],
      answer: 2,
      explanation: 'strip() removes whitespace from both ends; lstrip() and rstrip() do one end only.',
    },
  },

  [`${P}/reading-writing-files`]: {
    answer: 'open() gives you a file object; read it, iterate it line by line, or write to it, inside a with block so it is closed automatically. The mode says what you can do: "r" read, "w" write (erasing the file), "a" append.',
    points: [
      '"w" empties the file the moment it opens; use "a" to add to it.',
      'with open(...) as f: closes the file even if an error occurs.',
      'for line in f: reads one line at a time, so big files use little memory.',
    ],
    example: {
      label: 'Write, append and read back a file',
      lang: 'python',
      code: `from pathlib import Path

path = Path("notes.txt")
with open(path, "w") as f:
    f.write("first line\\n")
with open(path, "a") as f:
    f.write("second line\\n")

with open(path) as f:
    for number, line in enumerate(f, start=1):
        print(number, line.rstrip())`,
    },
    check: {
      question: 'You open an existing log file with mode "w". What happens to its contents?',
      options: ['New text is added at the end', 'They are erased immediately', 'Nothing until you call write()', 'Python refuses to open it'],
      answer: 1,
      explanation: '"w" truncates the file as soon as it is opened. Use "a" to append.',
    },
  },

  [`${P}/csv-json`]: {
    answer: 'The csv module reads and writes comma-separated files correctly, including quoted commas; csv.DictReader gives each row as a dict. The json module converts between JSON text and Python dicts and lists with json.loads/json.dumps (or load/dump for files).',
    points: [
      'Never split CSV lines on "," yourself; quoted fields break it.',
      'Open CSV files with newline="" and convert values: everything is a string.',
      'JSON objects become dicts, arrays become lists, null becomes None.',
    ],
    example: {
      label: 'A quoted comma in CSV, and JSON round-trips',
      lang: 'python',
      code: `import csv, io, json

text = 'name,city\\n"Lee, Ava",Austin\\n'
for row in csv.DictReader(io.StringIO(text)):
    print(row["name"], "|", row["city"])

data = json.loads('{"id": 7, "tags": ["a", "b"], "paid": null}')
print(data["tags"], data["paid"])
print(json.dumps(data))`,
    },
    check: {
      question: 'What Python value does JSON null become?',
      options: ['0', '"null"', 'None', 'False'],
      answer: 2,
      explanation: 'json.loads maps null to None, true/false to True/False, objects to dicts and arrays to lists.',
    },
  },

  [`${P}/exception-handling`]: {
    answer: 'try runs code that might fail; except catches a specific error so the program can recover; else runs only if nothing failed; finally always runs, for cleanup. raise signals an error yourself.',
    points: [
      'Catch specific exceptions (except ValueError), never a bare except:.',
      'else is for code that should run only on success.',
      'finally runs whether or not an exception happened.',
    ],
    example: {
      label: 'try, except, else and finally',
      lang: 'python',
      code: `def parse(text):
    try:
        number = int(text)
    except ValueError:
        print(f"not a number: {text!r}")
    else:
        print("parsed", number)
    finally:
        print("checked", text)

parse("42")
parse("4x")`,
    },
    check: {
      question: 'When does an else block after try/except run?',
      options: ['Always', 'Only when an exception was caught', 'Only when the try block raised no exception', 'Only after finally'],
      answer: 2,
      explanation: 'else runs only when the try block finished without an exception. finally is the one that always runs.',
    },
  },

  [`${P}/modules-packages-venv`]: {
    answer: 'A module is a .py file you can import; a package is a folder of modules. pip installs third-party packages, and a virtual environment (python3 -m venv .venv) gives each project its own isolated set of them, recorded in requirements.txt.',
    points: [
      'Do not name your file after a standard module (random.py, json.py); it shadows it.',
      'if __name__ == "__main__": runs code only when the file is run directly.',
      'Activate the venv before pip install, or packages land in the wrong Python.',
    ],
    example: {
      label: 'Create a project environment and pin its packages',
      lang: 'bash',
      code: `python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\\Scripts\\activate
pip install requests
pip freeze > requirements.txt`,
      static: true,
    },
    check: {
      question: 'What does if __name__ == "__main__": do?',
      options: ['Makes the module private', 'Runs the block only when the file is executed directly, not imported', 'Marks the file as a package', 'Speeds up imports'],
      answer: 1,
      explanation: 'When imported, __name__ is the module name; only a directly run file has __name__ == "__main__".',
    },
  },

  [`${P}/classes-objects`]: {
    answer: 'A class is a blueprint for objects: it bundles data (attributes) with the functions that use it (methods). Calling the class creates an object, and __init__ sets up that object\'s starting state through self.',
    points: [
      'self is the object the method was called on: rex.bark() is Dog.bark(rex).',
      'Each object has its own instance attributes, set as self.name = name.',
      '__init__ prepares the object and always returns None.',
    ],
    example: {
      label: 'A class with state and a method',
      lang: 'python',
      code: `class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self.balance

a = Account("Ava")
b = Account("Ben", 50)
a.deposit(20)
print(a.owner, a.balance, "|", b.owner, b.balance)`,
    },
    check: {
      question: 'What is self inside a method?',
      options: ['A reserved keyword', 'The class itself', 'The object the method was called on', 'A copy of the object'],
      answer: 2,
      explanation: 'Python passes the object automatically as the first argument; by convention that parameter is named self.',
    },
  },

  [`${P}/constructors-attributes`]: {
    answer: 'Instance attributes (self.x) belong to one object; class attributes, assigned in the class body, are shared by every object. __init__ is the place to validate input so that invalid objects are never created.',
    points: [
      'Raise in __init__ when input is invalid.',
      'obj.x = value creates an instance attribute; it never changes the class attribute.',
      'Mutating a shared class-level list changes it for every instance.',
    ],
    example: {
      label: 'Shared class attribute vs per-object attribute',
      lang: 'python',
      code: `class Order:
    tax_rate = 0.08          # shared by every order
    log = []                 # shared, mutable: a trap

    def __init__(self, total):
        if total < 0:
            raise ValueError("total cannot be negative")
        self.total = total   # this order only

a, b = Order(10), Order(20)
a.tax_rate = 0.1             # new attribute on a only
a.log.append("a")            # changes the shared list
print(a.tax_rate, b.tax_rate, b.log)`,
    },
    check: {
      question: 'a.items.append(1), where items is a class-level list. Who sees the change?',
      options: ['Only a', 'Every instance of the class', 'No one; it raises an error', 'Only new instances'],
      answer: 1,
      explanation: 'append mutates the one list stored on the class, so every instance sees it.',
    },
  },

  [`${P}/inheritance-polymorphism`]: {
    answer: 'Inheritance lets a class (the subclass) reuse and extend another (the parent): class Dog(Animal). Polymorphism means different classes answer the same method call in their own way, so calling code needs no type checks.',
    points: [
      'super().__init__(...) runs the parent\'s setup from the subclass.',
      'Defining a method with the same name overrides the parent\'s version.',
      'Prefer isinstance(x, Animal) to type(x) == Animal; it respects subclasses.',
    ],
    example: {
      label: 'One call, each class\'s own behaviour',
      lang: 'python',
      code: `class Shape:
    def __init__(self, name):
        self.name = name
    def area(self):
        return 0

class Square(Shape):
    def __init__(self, side):
        super().__init__("square")
        self.side = side
    def area(self):
        return self.side ** 2

class Circle(Shape):
    def __init__(self, r):
        super().__init__("circle")
        self.r = r
    def area(self):
        return round(3.14159 * self.r ** 2, 2)

for shape in [Square(3), Circle(1)]:
    print(shape.name, shape.area(), isinstance(shape, Shape))`,
    },
    check: {
      question: 'What does super().__init__(name) do inside a subclass __init__?',
      options: ['Creates a second object', 'Runs the parent class\'s __init__ on this object', 'Deletes the parent class', 'Calls the subclass recursively'],
      answer: 1,
      explanation: 'It reuses the parent\'s setup for the same object instead of duplicating that code.',
    },
  },

  [`${P}/encapsulation-dunder-methods`]: {
    answer: 'Python marks internals by convention: _name means "internal", __name triggers name mangling. Dunder (double-underscore) methods such as __repr__, __eq__, __len__ and __lt__ let your objects work with print, ==, len() and sorted() like built-in types.',
    points: [
      '__repr__ is the developer view and what lists show; define it first.',
      'If you define __eq__, also define __hash__ or the object cannot go in a set.',
      '__lt__ makes objects sortable.',
    ],
    example: {
      label: '__repr__, __eq__, __hash__ and __lt__',
      lang: 'python',
      code: `class Money:
    def __init__(self, cents):
        self.cents = cents
    def __repr__(self):
        return f"Money({self.cents / 100:.2f})"
    def __eq__(self, other):
        return self.cents == other.cents
    def __hash__(self):
        return hash(self.cents)
    def __lt__(self, other):
        return self.cents < other.cents

prices = [Money(250), Money(99), Money(250)]
print(sorted(prices))
print(len(set(prices)), Money(99) == Money(99))`,
    },
    check: {
      question: 'Which method decides what print(obj) shows when there is no __str__?',
      options: ['__init__', '__repr__', '__eq__', '__name__'],
      answer: 1,
      explanation: 'print uses __str__, which falls back to __repr__ when __str__ is not defined.',
    },
  },

  [`${P}/class-static-methods-properties`]: {
    answer: '@classmethod receives the class (cls) and is used for alternate constructors; @staticmethod receives neither the object nor the class and is a helper that lives in the class; @property makes a method read like an attribute, so you can add validation without changing callers.',
    points: [
      'Instance methods get self, class methods get cls, static methods get neither.',
      'A classmethod constructor respects subclasses: cls(...) builds the right type.',
      'A property setter validates assignments such as obj.price = -1.',
    ],
    example: {
      label: 'An alternate constructor, a helper, and a validated property',
      lang: 'python',
      code: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @classmethod
    def from_fahrenheit(cls, f):
        return cls(round((f - 32) * 5 / 9, 1))

    @staticmethod
    def is_freezing(celsius):
        return celsius <= 0

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("below absolute zero")
        self._celsius = value

t = Temperature.from_fahrenheit(212)
print(t.celsius, Temperature.is_freezing(t.celsius))`,
    },
    check: {
      question: 'Which decorator suits a method that never uses self or cls?',
      options: ['@property', '@classmethod', '@staticmethod', '@abstractmethod'],
      answer: 2,
      explanation: 'A method that touches neither instance nor class state is a plain helper: @staticmethod.',
    },
  },

  [`${P}/abstract-base-classes`]: {
    answer: 'An abstract base class (from the abc module) declares methods every subclass must implement, marked with @abstractmethod. Python refuses to create an object of a subclass that is missing any of them, so incomplete classes fail early.',
    points: [
      'Inherit from abc.ABC and mark required methods with @abstractmethod.',
      'The error appears when you create the object, not when you call the method.',
      'The abstract class itself can never be instantiated.',
    ],
    example: {
      label: 'A subclass that forgot a required method',
      lang: 'python',
      code: `from abc import ABC, abstractmethod

class Exporter(ABC):
    @abstractmethod
    def export(self, rows): ...

class CsvExporter(Exporter):
    def export(self, rows):
        return "\\n".join(",".join(map(str, r)) for r in rows)

class BrokenExporter(Exporter):
    pass

print(CsvExporter().export([(1, "a"), (2, "b")]))
try:
    BrokenExporter()
except TypeError as error:
    print("TypeError:", error)`,
    },
    check: {
      question: 'When does Python report a missing @abstractmethod implementation?',
      options: ['When the module is imported', 'When you try to create an instance', 'When the method is called', 'Never; it is only a hint'],
      answer: 1,
      explanation: 'Instantiating a class with unimplemented abstract methods raises TypeError straight away.',
    },
  },

  [`${P}/args-kwargs`]: {
    answer: '*args collects extra positional arguments into a tuple and **kwargs collects extra keyword arguments into a dict. At a call site the same symbols do the opposite: *list and **dict unpack into separate arguments.',
    points: [
      'A bare * in a signature makes the following parameters keyword-only.',
      'A / makes the preceding parameters positional-only (Python 3.8+).',
      'The names args and kwargs are convention; the asterisks do the work.',
    ],
    example: {
      label: 'Gathering and unpacking arguments',
      lang: 'python',
      code: `def report(title, *values, sep=", ", **labels):
    print(title, values, labels)
    return sep.join(map(str, values))

print(report("totals", 3, 5, 8, unit="USD"))

def area(width, height, *, unit="m"):
    return f"{width * height} {unit}²"

dims = {"width": 3, "height": 4}
print(area(**dims, unit="ft"))`,
    },
    check: {
      question: 'Inside def f(*args), what type is args?',
      options: ['list', 'tuple', 'dict', 'set'],
      answer: 1,
      explanation: 'Extra positional arguments are gathered into a tuple; **kwargs gathers keyword arguments into a dict.',
    },
  },

  [`${P}/lambda-map-filter-reduce`]: {
    answer: 'A lambda is a small anonymous function written as one expression: lambda x: x * 2. It is most useful as a key or callback, such as sorted(rows, key=lambda r: r[1]). map, filter and reduce apply functions across iterables, though a comprehension is usually clearer.',
    points: [
      'A lambda body is a single expression: no statements, no return keyword.',
      'map and filter return lazy iterators; wrap them in list() to see the values.',
      'reduce lives in functools; sum, max and min cover most of its uses.',
    ],
    example: {
      label: 'lambda as a key, map/filter, and the comprehension equivalent',
      lang: 'python',
      code: `from functools import reduce

people = [("Ava", 31), ("Ben", 25), ("Cy", 40)]
print(sorted(people, key=lambda p: p[1]))

nums = [1, 2, 3, 4]
print(list(map(lambda n: n * 10, filter(lambda n: n % 2, nums))))
print([n * 10 for n in nums if n % 2])
print(reduce(lambda a, b: a * b, nums))`,
    },
    check: {
      question: 'What does map(str, [1, 2]) return in Python 3?',
      options: ["['1', '2']", 'A lazy map iterator', "('1', '2')", 'None'],
      answer: 1,
      explanation: 'map returns an iterator that produces values on demand. list(map(str, [1, 2])) gives [\'1\', \'2\'].',
    },
  },

  [`${P}/iterators-iterables`]: {
    answer: 'An iterable is anything you can loop over (it has __iter__); an iterator is the object that hands out values one at a time with __next__ and raises StopIteration when done. A for loop calls iter() once, then next() until StopIteration.',
    points: [
      'Lists are iterables, not iterators; iter(list) creates a fresh iterator.',
      'An iterator is used up after one pass.',
      'Make your own class loopable by implementing __iter__.',
    ],
    example: {
      label: 'What a for loop does under the hood',
      lang: 'python',
      code: `letters = ["a", "b"]
it = iter(letters)
print(next(it), next(it))
try:
    next(it)
except StopIteration:
    print("StopIteration: the loop ends here")

class Countdown:
    def __init__(self, start):
        self.start = start
    def __iter__(self):
        return iter(range(self.start, 0, -1))

print(list(Countdown(3)))`,
    },
    check: {
      question: 'What tells a for loop to stop?',
      options: ['A None value', 'The iterator raising StopIteration', 'A break inside __next__', 'The length of the iterable'],
      answer: 1,
      explanation: 'The loop calls next() repeatedly and stops quietly when StopIteration is raised.',
    },
  },

  [`${P}/generators-yield`]: {
    answer: 'A generator function uses yield to produce values one at a time, pausing between them and keeping its local state. Calling it returns a generator (an iterator) without running the body, which makes it memory-efficient for large or endless sequences.',
    points: [
      'Each next() resumes right after the last yield.',
      'A generator expression (x * x for x in data) is the lazy form of a list comprehension.',
      'Generators can be consumed once.',
    ],
    example: {
      label: 'A generator pauses at yield',
      lang: 'python',
      code: `def countdown(n):
    print("starting")
    while n > 0:
        yield n
        n -= 1

gen = countdown(3)
print(type(gen).__name__)
print(next(gen), next(gen))
print(list(gen))

squares = (x * x for x in range(1_000_000))
print(next(squares), next(squares), next(squares))`,
    },
    check: {
      question: 'What happens when you call a generator function?',
      options: ['Its body runs to the end', 'It returns a generator object without running the body yet', 'It returns a list', 'It raises StopIteration'],
      answer: 1,
      explanation: 'The body starts running only when you ask for the first value with next() or a loop.',
    },
  },

  [`${P}/decorators`]: {
    answer: 'A decorator is a function that takes a function and returns a new function, usually a wrapper that adds behaviour before or after the call. @timed above def f is shorthand for f = timed(f).',
    points: [
      'The wrapper should accept *args, **kwargs and return the original result.',
      'Use functools.wraps so the wrapped function keeps its name and docstring.',
      'A decorator with arguments, such as @retry(3), needs one more level of nesting.',
    ],
    example: {
      label: 'A logging decorator',
      lang: 'python',
      code: `import functools

def logged(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"calling {func.__name__}{args}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

@logged
def add(a, b):
    return a + b

add(2, 3)
print(add.__name__)`,
    },
    check: {
      question: 'What is @logged above def add(...) equivalent to?',
      options: ['add = logged', 'add = logged(add)', 'logged = add(logged)', 'add(logged)'],
      answer: 1,
      explanation: 'The decorator receives the function and the name add is rebound to whatever it returns.',
    },
  },

  [`${P}/context-managers`]: {
    answer: 'A context manager sets something up and guarantees it is cleaned up: the with statement calls __enter__ at the start and __exit__ at the end, even if the block raises. contextlib.contextmanager lets you write one as a generator.',
    points: [
      'Code before yield is setup; code after yield, in finally, is cleanup.',
      'The value after as is what __enter__ returns, or what the generator yields.',
      'Returning True from __exit__ swallows the exception; you rarely want that.',
    ],
    example: {
      label: 'Cleanup runs even when the block fails',
      lang: 'python',
      code: `from contextlib import contextmanager

@contextmanager
def connection(name):
    print("open", name)
    try:
        yield name.upper()
    finally:
        print("close", name)

with connection("db") as conn:
    print("using", conn)

try:
    with connection("cache"):
        raise RuntimeError("boom")
except RuntimeError as error:
    print("caught", error)`,
    },
    check: {
      question: 'An exception is raised inside a with block. Does __exit__ run?',
      options: ['No', 'Yes, always', 'Only if the exception is caught inside the block', 'Only for file objects'],
      answer: 1,
      explanation: 'That guarantee is the point of with: cleanup runs on normal exit, return, or exception.',
    },
  },

  [`${P}/closures-scope`]: {
    answer: 'Python looks up a name in four scopes, in order: Local, Enclosing, Global, Built-in (LEGB). A closure is an inner function that keeps using a variable from its enclosing function after that function has returned.',
    points: [
      'Assigning to a name inside a function makes it local unless you declare nonlocal or global.',
      'Closures capture the variable, not its value at the time.',
      'Closures made in a loop all see the loop variable\'s final value; bind it with a default argument.',
    ],
    example: {
      label: 'A counter closure, and the late-binding loop trap',
      lang: 'python',
      code: `def make_counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment

tick = make_counter()
print(tick(), tick(), tick())

late = [lambda: i for i in range(3)]
bound = [lambda i=i: i for i in range(3)]
print([f() for f in late], [f() for f in bound])`,
    },
    check: {
      question: 'In what order does Python look up a variable name?',
      options: ['Global, Local, Built-in, Enclosing', 'Local, Enclosing, Global, Built-in', 'Built-in, Global, Enclosing, Local', 'Local, Global only'],
      answer: 1,
      explanation: 'LEGB: Local, then Enclosing functions, then Global, then Built-in. The first match wins.',
    },
  },

  [`${P}/regular-expressions`]: {
    answer: 'Regular expressions (the re module) describe text patterns: \\d is a digit, \\w a word character, + one or more, ? optional. re.search finds a match anywhere, re.match only at the start, re.findall returns every match.',
    points: [
      'Use raw strings for patterns: r"\\d+".',
      'Validate a whole string with both anchors: ^ … $ (or re.fullmatch).',
      'For a fixed substring, plain "abc" in text is simpler and faster.',
    ],
    example: {
      label: 'Find, extract with groups, and validate',
      lang: 'python',
      code: `import re

log = "2024-03-15 ERROR order=1042 took 812ms"
print(re.findall(r"\\d+", log))

m = re.search(r"order=(\\d+) took (\\d+)ms", log)
print(m.group(1), int(m.group(2)))

for zip_code in ["98101", "9810", "98101x"]:
    print(zip_code, bool(re.fullmatch(r"\\d{5}", zip_code)))`,
    },
    check: {
      question: 'Which function finds a pattern anywhere in the string?',
      options: ['re.match', 're.search', 're.fullmatch', 're.compile'],
      answer: 1,
      explanation: 're.match only checks the start of the string and re.fullmatch the whole string; re.search scans for the first match anywhere.',
    },
  },

  [`${P}/dates-times`]: {
    answer: 'The datetime module represents moments (date, time, datetime) and spans of time (timedelta). strftime formats a datetime as text, strptime parses text into one, and zoneinfo attaches real time zones.',
    points: [
      'datetime.now() is naive (no time zone); production code should use aware datetimes.',
      'Subtracting two datetimes gives a timedelta.',
      'Naive and aware datetimes cannot be compared; Python raises TypeError.',
    ],
    example: {
      label: 'Parse, add time, format, and convert time zones',
      lang: 'python',
      code: `from datetime import datetime, timedelta, timezone

order = datetime.strptime("2024-03-15 09:30", "%Y-%m-%d %H:%M")
due = order + timedelta(days=3, hours=2)
print(due.strftime("%a %b %d, %I:%M %p"))
print((due - order).total_seconds() / 3600, "hours")

utc = datetime(2024, 3, 15, 17, 0, tzinfo=timezone.utc)
pacific = utc.astimezone(timezone(timedelta(hours=-7)))
print(pacific.isoformat())`,
    },
    check: {
      question: 'What do you get by subtracting one datetime from another?',
      options: ['A datetime', 'A timedelta', 'An integer number of days', 'A string'],
      answer: 1,
      explanation: 'The difference between two points in time is a span, represented by timedelta.',
    },
  },

  [`${P}/multithreading-multiprocessing`]: {
    answer: 'Threads let a program overlap waiting, so they speed up I/O-bound work such as network calls; because of CPython\'s Global Interpreter Lock (GIL), they do not run Python code in parallel. For CPU-bound work, use multiple processes (multiprocessing or ProcessPoolExecutor).',
    points: [
      'Concurrency overlaps tasks; parallelism runs them at the same instant.',
      'The GIL is released while a thread waits on I/O.',
      'concurrent.futures gives one interface for both thread and process pools.',
    ],
    example: {
      label: 'Five 0.2-second waits, run in threads',
      lang: 'python',
      code: `import time
from concurrent.futures import ThreadPoolExecutor

def fetch(n):
    time.sleep(0.2)      # stands in for a network call
    return n * n

start = time.perf_counter()
with ThreadPoolExecutor(max_workers=5) as pool:
    results = list(pool.map(fetch, range(5)))
elapsed = time.perf_counter() - start
print(results)
print("about 0.2s, not 1.0s:", elapsed < 0.8)`,
    },
    check: {
      question: 'Which workload do threads speed up in CPython?',
      options: ['Pure number crunching', 'Waiting on network or disk I/O', 'Both equally', 'Neither'],
      answer: 1,
      explanation: 'The GIL lets only one thread run Python bytecode at a time, but it is released during I/O waits.',
    },
  },

  [`${P}/async-python`]: {
    answer: 'asyncio runs many I/O tasks concurrently on one thread. You define coroutines with async def, pause them with await while they wait, and run several together with asyncio.gather; asyncio.run starts the event loop.',
    points: [
      'Calling an async function only creates a coroutine; it runs when awaited.',
      'A single await does not create concurrency; gather does.',
      'Never call blocking functions such as time.sleep inside a coroutine.',
    ],
    example: {
      label: 'Three 0.2-second waits run together',
      lang: 'python',
      code: `import asyncio, time

async def fetch(name, delay):
    await asyncio.sleep(delay)   # stands in for a network call
    return f"{name} done"

async def main():
    start = time.perf_counter()
    results = await asyncio.gather(fetch("a", 0.2), fetch("b", 0.2), fetch("c", 0.2))
    print(results)
    print("about 0.2s, not 0.6s:", time.perf_counter() - start < 0.5)

asyncio.run(main())`,
    },
    check: {
      question: 'What does calling an async def function return?',
      options: ['Its result', 'A coroutine object that has not run yet', 'A thread', 'None'],
      answer: 1,
      explanation: 'The body runs only when the coroutine is awaited, gathered, or passed to asyncio.run().',
    },
  },

  [`${P}/type-hints-mypy`]: {
    answer: 'Type hints annotate what types a function expects and returns, such as def total(prices: list[float]) -> float. Python ignores them at runtime; a checker such as mypy reads them and reports mismatches before the code runs.',
    points: [
      'Hints do not change how the code runs.',
      'Optional[str] and str | None (3.10+) mean the same thing.',
      'Run mypy in CI so mistakes are caught on every change.',
    ],
    example: {
      label: 'Hints are not enforced at runtime',
      lang: 'python',
      code: `from typing import Optional

def find_user(user_id: int) -> Optional[str]:
    return {1: "ava"}.get(user_id)

print(find_user(1), find_user(2))
print(find_user("1"))   # wrong type: runs anyway; mypy would flag it
print(find_user.__annotations__)`,
    },
    check: {
      question: 'You call def f(x: int) with a string. What does Python do at runtime?',
      options: ['Raises TypeError', 'Converts it to int', 'Runs the function anyway', 'Refuses to start'],
      answer: 2,
      explanation: 'Hints are not checked at runtime. A static checker such as mypy is what catches the mismatch.',
    },
  },

  [`${P}/working-with-apis-python`]: {
    answer: 'The requests library calls web APIs: requests.get(url, params=..., headers=..., timeout=...) sends a request, response.raise_for_status() turns 4xx/5xx codes into exceptions, and response.json() parses the body.',
    points: [
      'Always pass timeout=; requests waits forever by default.',
      'Error status codes do not raise unless you call raise_for_status().',
      'Read API keys from environment variables, never from source code.',
    ],
    example: {
      label: 'A careful GET request',
      lang: 'python',
      code: `import os
import requests

response = requests.get(
    "https://api.example.com/v1/orders",
    params={"status": "open", "limit": 50},
    headers={"Authorization": f"Bearer {os.environ['API_TOKEN']}"},
    timeout=10,
)
response.raise_for_status()
orders = response.json()`,
      static: true,
    },
    check: {
      question: 'What happens when requests receives a 404 response and you do not call raise_for_status()?',
      options: ['It raises HTTPError', 'Nothing; your code continues with the error response', 'It retries automatically', 'It returns None'],
      answer: 1,
      explanation: 'Status codes are not exceptions by default. Without raise_for_status() an error page can be treated as data.',
    },
  },

  [`${P}/unit-testing-pytest`]: {
    answer: 'pytest finds functions named test_* in files named test_*.py and runs them; a plain assert checks the result, and pytest shows exactly which values differed. Fixtures provide setup, parametrize runs one test over many inputs, and pytest.raises checks for errors.',
    points: [
      'No classes or registration needed: write a test_ function with assert.',
      'with pytest.raises(ValueError): checks that code fails the right way.',
      '@pytest.mark.parametrize replaces near-duplicate tests.',
    ],
    example: {
      label: 'A test file pytest discovers on its own',
      lang: 'python',
      code: `# test_pricing.py
import pytest
from pricing import apply_discount

@pytest.mark.parametrize("price, pct, expected", [
    (100, 10, 90),
    (50, 0, 50),
])
def test_apply_discount(price, pct, expected):
    assert apply_discount(price, pct) == expected

def test_rejects_negative_percent():
    with pytest.raises(ValueError):
        apply_discount(100, -5)`,
      static: true,
    },
    check: {
      question: 'How does pytest find tests?',
      options: ['You register them in a config file', 'By naming: test_*.py files and test_* functions', 'Every function in the project runs', 'Only classes that inherit TestCase'],
      answer: 1,
      explanation: 'pytest discovers tests by naming convention, so a plain function with assert is a complete test.',
    },
  },

  [`${P}/debugging-techniques`]: {
    answer: 'Debugging starts with the traceback: read it from the bottom, where the exception type and message say what went wrong and the last frame says where. Use print for quick checks and breakpoint() to pause and inspect variables in the debugger.',
    points: [
      'The last line names the exception, such as KeyError: \'price\'.',
      'The frames above show the chain of calls that led there.',
      'In pdb: n next line, s step in, c continue, p x print a value.',
    ],
    example: {
      label: 'What the bottom of a traceback tells you',
      lang: 'python',
      code: `import traceback

def total(order):
    return order["qty"] * order["price"]

try:
    total({"qty": 2})
except KeyError as error:
    frame = traceback.extract_tb(error.__traceback__)[-1]
    print(f"where: line {frame.lineno}, in {frame.name}()")
    print(f"code:  {frame.line}")
    print(f"what:  {type(error).__name__}: {error}")`,
    },
    check: {
      question: 'Where in a traceback is the actual error?',
      options: ['The first line', 'The last line', 'The middle frame', 'It is not shown'],
      answer: 1,
      explanation: 'The last line names the exception and its message; the frames above it show how execution got there.',
    },
  },

  [`${P}/logging-best-practices`]: {
    answer: 'The logging module records what a program does, with levels (DEBUG, INFO, WARNING, ERROR, CRITICAL), timestamps and configurable destinations. Create one logger per module with logging.getLogger(__name__) and configure output once at startup.',
    points: [
      'Levels let you turn detail up or down without editing code.',
      'Loggers decide whether to record, handlers where it goes, formatters what it looks like.',
      'Never log passwords, tokens or full card numbers.',
    ],
    example: {
      label: 'Levels filter what gets recorded',
      lang: 'python',
      code: `import logging, sys

logging.basicConfig(stream=sys.stdout, level=logging.INFO,
                    format="%(levelname)s %(name)s: %(message)s")
log = logging.getLogger("orders")

log.debug("payload details")      # below INFO: not shown
log.info("order %s created", 1042)
log.warning("stock low for %s", "milk")`,
    },
    check: {
      question: 'With the level set to INFO, which message is dropped?',
      options: ['log.warning(...)', 'log.error(...)', 'log.debug(...)', 'log.critical(...)'],
      answer: 2,
      explanation: 'DEBUG is below INFO, so it is filtered out; INFO and everything more severe is kept.',
    },
  },

  [`${P}/packaging-distribution`]: {
    answer: 'To share code as an installable package, describe it in pyproject.toml (name, version, dependencies, build backend), build a wheel and a source distribution with python -m build, and upload them to PyPI with twine.',
    points: [
      'pyproject.toml replaces setup.py as the standard project file.',
      'The src/ layout keeps tests from importing your uninstalled source by accident.',
      'Version with semantic versioning: MAJOR.MINOR.PATCH.',
    ],
    example: {
      label: 'A minimal pyproject.toml',
      lang: 'toml',
      code: `[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"

[project]
name = "orderkit"
version = "1.2.0"
requires-python = ">=3.9"
dependencies = ["requests>=2.31"]`,
      static: true,
    },
    check: {
      question: 'Under semantic versioning, a breaking change moves 1.4.2 to…',
      options: ['1.4.3', '1.5.0', '2.0.0', '1.4.2-1'],
      answer: 2,
      explanation: 'Breaking changes bump MAJOR; new features bump MINOR; fixes bump PATCH.',
    },
  },

  [`${P}/performance-profiling`]: {
    answer: 'Measure before you optimise: cProfile shows which functions take the time across a whole program, and timeit compares small alternatives precisely. The biggest wins usually come from better data structures, such as a set instead of a list for lookups.',
    points: [
      'Sort cProfile output by cumulative time to find expensive call chains.',
      'x in a_list is O(n); x in a_set is O(1).',
      'timeit runs a snippet many times for a reliable comparison.',
    ],
    example: {
      label: 'List vs set membership, measured',
      lang: 'python',
      code: `import timeit

items = list(range(100_000))
as_set = set(items)

list_time = timeit.timeit(lambda: 99_999 in items, number=200)
set_time = timeit.timeit(lambda: 99_999 in as_set, number=200)
print("set lookup is faster:", set_time < list_time)`,
    },
    check: {
      question: 'Which tool finds where time goes across a whole program?',
      options: ['timeit', 'cProfile', 'pdb', 'mypy'],
      answer: 1,
      explanation: 'cProfile records every function call; timeit is for micro-benchmarks of small snippets.',
    },
  },

  [`${P}/numpy-pandas-intro`]: {
    answer: 'NumPy stores numbers in fast, uniformly typed arrays and applies operations to whole arrays at once (vectorisation). pandas builds on it with labelled tables: a Series is one column, a DataFrame a full table you can filter, group and join.',
    points: [
      'Vectorised NumPy operations run in C and are typically 10–100x faster than Python loops.',
      'df[df["col"] > x] filters rows; df.groupby("col").agg(...) summarises them.',
      'For a small row-by-row script, the csv module may be enough.',
    ],
    example: {
      label: 'Vectorised math and a group-by (example output from pandas)',
      lang: 'python',
      code: `import numpy as np
import pandas as pd

prices = np.array([3.5, 5.0, 2.25])
print(prices * 2)

df = pd.DataFrame({"city": ["Austin", "Denver", "Austin"], "total": [40, 25, 15]})
print(df.groupby("city")["total"].sum())`,
      static: true,
    },
    check: {
      question: 'What is a pandas Series?',
      options: ['A whole table', 'A single labelled column of values', 'A database connection', 'A NumPy function'],
      answer: 1,
      explanation: 'A DataFrame is a table; each of its columns is a Series.',
    },
  },

  [`${P}/building-a-cli-tool`]: {
    answer: 'argparse turns command-line arguments into validated Python values: declare positional and optional arguments with types, defaults and help text, and it generates --help, checks input, and reports usage errors for you.',
    points: [
      'Positional arguments are required; --options are optional with defaults.',
      'help= strings become the --help page automatically.',
      'Exit with sys.exit(code) and send errors to stderr.',
    ],
    example: {
      label: 'Parsing a command line',
      lang: 'python',
      code: `import argparse

parser = argparse.ArgumentParser(prog="convert", description="Convert a price.")
parser.add_argument("amount", type=float, help="amount in USD")
parser.add_argument("--rate", type=float, default=0.92, help="exchange rate")
parser.add_argument("--round", dest="places", type=int, default=2)

args = parser.parse_args(["120", "--rate", "0.9"])   # as if typed in a terminal
print(args)
print(round(args.amount * args.rate, args.places))`,
    },
    check: {
      question: 'Where does argparse\'s --help text come from?',
      options: ['A separate README file', 'The help= strings passed to add_argument', 'Docstrings only', 'You write it by hand in a function'],
      answer: 1,
      explanation: 'argparse builds --help from the arguments you declared, so it always matches what the tool accepts.',
    },
  },

  [`${P}/python-best-practices`]: {
    answer: 'Readable Python follows PEP 8 (four-space indents, snake_case for functions and variables, PascalCase for classes, UPPER_CASE for constants), keeps functions small with clear names, and documents each function\'s contract in a docstring.',
    points: [
      'PEP 8 is a style guide; tools such as ruff or black apply it for you.',
      'Return early with guard clauses instead of deep nesting.',
      'A docstring says what a function takes, returns and raises, not how it works.',
    ],
    example: {
      label: 'Naming, a guard clause and a docstring',
      lang: 'python',
      code: `MAX_RETRIES = 3

class OrderService:
    def shipping_cost(self, weight_lb: float) -> float:
        """Return the shipping cost in USD for a weight in pounds.

        Raises ValueError for a non-positive weight.
        """
        if weight_lb <= 0:
            raise ValueError("weight must be positive")
        return round(4.99 + 0.5 * weight_lb, 2)

print(OrderService().shipping_cost(3))
print(OrderService.shipping_cost.__doc__.splitlines()[0])`,
    },
    check: {
      question: 'Which name follows PEP 8 for a function?',
      options: ['CalculateTotal', 'calculateTotal', 'calculate_total', 'CALCULATE_TOTAL'],
      answer: 2,
      explanation: 'Functions and variables use snake_case; PascalCase is for classes and UPPER_CASE for constants.',
    },
  },

  [`${P}/python-interview-prep`]: {
    answer: 'Python interviews mix coding problems, which usually come down to a few patterns (hash maps, two pointers, sliding windows), with concept questions about mutability, copying, is versus ==, generators, decorators and the GIL. Explaining your reasoning matters as much as the final answer.',
    points: [
      'A dict or set turns many O(n²) searches into O(n).',
      'Know the classic gotchas: mutable defaults, shallow copies, is vs ==.',
      'Clarify the requirements and test edge cases out loud.',
    ],
    example: {
      label: 'Two-sum in one pass with a dict',
      lang: 'python',
      code: `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return seen[target - n], i
        seen[n] = i
    return None

print(two_sum([2, 7, 11, 15], 9))
print(two_sum([3, 2, 4], 6))

a = [1, 2]; b = [1, 2]
print(a == b, a is b)`,
    },
    check: {
      question: 'a = [1, 2]; b = [1, 2]. What do a == b and a is b give?',
      options: ['True, True', 'True, False', 'False, False', 'False, True'],
      answer: 1,
      explanation: '== compares values, which are equal; is compares identity, and these are two separate list objects.',
    },
  },
}
