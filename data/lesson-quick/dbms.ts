import type { LessonQuick } from '@/lib/lesson-quick'

const B = '/learn/dbms'

// SQL examples run on FreshCart and Python examples with python3; theory notation is shown as text.
export const DBMS_QUICK: Record<string, LessonQuick> = {
  [`${B}/introduction`]: {
    answer: 'A database management system (DBMS) is software that stores data and manages everything around it: integrity rules, queries, transactions, concurrent access, recovery after crashes and security. It replaced plain files, which suffer from redundancy, inconsistency, no concurrency control and no recovery.',
    points: [
      'Data is raw facts; information is data with context.',
      'File-based systems tie data layout to every program that reads it.',
      'The three-schema architecture separates user views, logical design and physical storage.',
    ],
    example: {
      label: 'One declarative question, answered by the DBMS',
      lang: 'sql',
      code: `SELECT loyalty_tier, COUNT(*) AS customers
FROM customers
GROUP BY loyalty_tier
ORDER BY customers DESC;`,
    },
    check: {
      question: 'Which problem of file-based systems does a DBMS solve with concurrency control?',
      options: ['Redundancy', 'Two users corrupting the same data at once', 'Slow disks', 'Large files'],
      answer: 1,
      explanation: 'Concurrency control lets many users read and write safely at the same time.',
    },
  },

  [`${B}/data-models`]: {
    answer: 'A data model defines how data is structured, what operations are allowed and which constraints must hold. Models evolved from hierarchical (trees, IBM IMS) and network (graphs of records) to relational (tables, Codd 1970), and later object, document, key-value and graph models.',
    points: [
      'Hierarchical models allow one parent per record, so many-to-many needs duplication.',
      'Network models allowed many parents but navigation was procedural.',
      'The relational model made queries declarative.',
    ],
    example: {
      label: 'A many-to-many relationship in the relational model',
      lang: 'sql',
      code: `-- orders ↔ products through order_items
SELECT p.product_name, COUNT(DISTINCT oi.order_id) AS orders_containing
FROM products AS p
JOIN order_items AS oi ON oi.product_id = p.product_id
GROUP BY p.product_name
ORDER BY orders_containing DESC
LIMIT 4;`,
    },
    check: {
      question: 'What was the key advantage of the relational model over the network model?',
      options: ['Faster disks', 'Declarative queries instead of navigating record pointers', 'No need for keys', 'Unlimited storage'],
      answer: 1,
      explanation: 'You say what you want; the system decides how to find it.',
    },
  },

  [`${B}/er-model`]: {
    answer: 'The entity-relationship (ER) model designs a database before any SQL: entities are things (Customer, Order), attributes describe them, and relationships connect them with a cardinality (1:1, 1:N, M:N) and participation (total or partial).',
    points: [
      'A weak entity depends on its owner: its key is the owner\'s key plus a partial key.',
      'Multi-valued attributes become separate tables.',
      'M:N relationships become a junction table.',
    ],
    example: {
      label: 'An ER design and the tables it becomes',
      lang: 'text',
      code: `Customer (customer_id, name)  1 ──< places >── N  Order (order_id, date)
Order   N ──< contains (qty) >── M  Product (product_id, name)

customers(customer_id PK, name)
orders(order_id PK, customer_id FK, order_date)
order_items(order_id FK, product_id FK, qty, PK(order_id, product_id))
products(product_id PK, name)`,
      static: true,
    },
    check: {
      question: 'How is an M:N relationship implemented in tables?',
      options: ['A foreign key on one side', 'A junction table with foreign keys to both sides', 'A multi-valued column', 'It cannot be'],
      answer: 1,
      explanation: 'A junction table such as order_items holds one row per pair, plus any relationship attributes.',
    },
  },

  [`${B}/relational-model`]: {
    answer: 'In the relational model a relation is a set of tuples: a table of rows with typed attributes (columns). Keys identify tuples: a super key determines a row, a candidate key is a minimal super key, one is chosen as the primary key, and a foreign key references another relation\'s key.',
    points: [
      'Relations are sets: no inherent row order.',
      'Entity integrity: primary keys are never NULL.',
      'Referential integrity: foreign keys match an existing key or are NULL.',
    ],
    example: {
      label: 'Checking referential integrity: does every order point to a real customer?',
      lang: 'sql',
      code: `SELECT COUNT(*) AS orphan_orders
FROM orders AS o
LEFT JOIN customers AS c ON c.customer_id = o.customer_id
WHERE c.customer_id IS NULL;   -- a FOREIGN KEY constraint would make this impossible`,
    },
    check: {
      question: 'What is a candidate key?',
      options: ['Any column', 'A minimal set of attributes that uniquely identifies a row', 'A foreign key', 'A non-unique index'],
      answer: 1,
      explanation: 'A candidate key is a super key with no redundant attributes; the primary key is one chosen candidate.',
    },
  },

  [`${B}/normalization`]: {
    answer: 'Normalization organises tables to remove insert, update and delete anomalies by following normal forms: 1NF (atomic values), 2NF (no partial dependency on a composite key), 3NF (no transitive dependency), BCNF (every determinant is a candidate key), and 4NF and 5NF for multi-valued and join dependencies.',
    points: [
      'Each step removes a specific kind of redundancy.',
      'BCNF is stricter than 3NF.',
      'Production systems sometimes denormalise deliberately for read speed.',
    ],
    example: {
      label: 'A transitive dependency, and the 3NF fix',
      lang: 'text',
      code: `orders(order_id, store_id, store_city, total)
  order_id → store_id → store_city      (transitive: city repeats per order)

3NF:
  orders(order_id, store_id, total)
  stores(store_id, store_city)`,
      static: true,
    },
    check: {
      question: 'Which normal form removes transitive dependencies?',
      options: ['1NF', '2NF', '3NF', '4NF'],
      answer: 2,
      explanation: '3NF requires non-key attributes to depend only on the key, not on other non-key attributes.',
    },
  },

  [`${B}/functional-dependencies`]: {
    answer: 'A functional dependency X → Y means any two rows that agree on X must agree on Y. Armstrong\'s axioms (reflexivity, augmentation, transitivity) derive every implied dependency, and the closure X⁺ (all attributes X determines) tests whether X is a key.',
    points: [
      'X is a super key when X⁺ contains every attribute.',
      'A minimal cover removes redundant dependencies.',
      'Dependencies come from the domain, not from sample data.',
    ],
    example: {
      label: 'Compute an attribute closure',
      lang: 'python',
      code: `fds = [({"A"}, {"B"}), ({"B"}, {"C"}), ({"C", "D"}, {"E"})]

def closure(attrs):
    result = set(attrs)
    changed = True
    while changed:
        changed = False
        for lhs, rhs in fds:
            if lhs <= result and not rhs <= result:
                result |= rhs
                changed = True
    return result

print("A+  =", sorted(closure({"A"})))
print("AD+ =", sorted(closure({"A", "D"})), "→ AD is a key of R(A,B,C,D,E)")`,
    },
    check: {
      question: 'If A → B and B → C hold, which axiom gives A → C?',
      options: ['Reflexivity', 'Augmentation', 'Transitivity', 'Union'],
      answer: 2,
      explanation: 'Transitivity: from X → Y and Y → Z, infer X → Z.',
    },
  },

  [`${B}/sql-complete`]: {
    answer: 'SQL is declarative: you describe the result and the optimiser decides how to compute it. Queries are logically evaluated in the order FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT, which explains rules such as aliases not working in WHERE.',
    points: [
      'WHERE filters rows; HAVING filters groups.',
      'Joins, subqueries, CTEs and window functions cover most needs.',
      'NULL needs IS NULL, never = NULL.',
    ],
    example: {
      label: 'WHERE, GROUP BY and HAVING together',
      lang: 'sql',
      code: `SELECT store_id, COUNT(*) AS delivered
FROM orders
WHERE order_status = 'Delivered'
GROUP BY store_id
HAVING COUNT(*) >= 3
ORDER BY delivered DESC;`,
    },
    check: {
      question: 'Which clause is evaluated first?',
      options: ['SELECT', 'WHERE', 'FROM', 'ORDER BY'],
      answer: 2,
      explanation: 'FROM (with joins) produces the rows that every later clause works on.',
    },
  },

  [`${B}/indexes`]: {
    answer: 'An index lets the database find rows without scanning the whole table. Databases read fixed-size pages, and a B+ tree index (wide and shallow, with linked leaves) reaches any key in three or four page reads, even for billions of rows, and supports range scans.',
    points: [
      'Clustered indexes order the table itself; secondary indexes point into it.',
      'Composite indexes work left to right.',
      'Every index slows writes and uses space.',
    ],
    example: {
      label: 'The plan changes once an index exists',
      lang: 'sql',
      code: `CREATE INDEX idx_orders_status ON orders(order_status);
EXPLAIN QUERY PLAN
SELECT order_id FROM orders WHERE order_status = 'Returned';`,
    },
    check: {
      question: 'Why are B+ trees good for database indexes?',
      options: ['They are binary', 'They are wide and shallow, so few page reads reach any key', 'They store data unsorted', 'They never change'],
      answer: 1,
      explanation: 'Hundreds of children per node keep the tree only a few levels deep, and linked leaves serve ranges.',
    },
  },

  [`${B}/transactions`]: {
    answer: 'A transaction is a unit of work that executes completely or not at all. It moves through states (active, partially committed, committed, or failed and aborted), and the database guarantees ACID: atomicity, consistency, isolation and durability.',
    points: [
      'Autocommit makes each statement its own transaction.',
      'Group multi-step changes between BEGIN and COMMIT.',
      'A failed transaction is rolled back completely.',
    ],
    example: {
      label: 'A transfer that rolls back as one unit',
      lang: 'sql',
      code: `BEGIN;
UPDATE products SET unit_price = unit_price - 1 WHERE product_id = 1;
UPDATE products SET unit_price = unit_price + 1 WHERE product_id = 2;
ROLLBACK;

SELECT product_id, unit_price FROM products WHERE product_id IN (1, 2);`,
    },
    check: {
      question: 'In autocommit mode, a two-statement transfer fails after the first statement. What remains?',
      options: ['Nothing; both are undone', 'The first statement\'s change', 'Neither statement ran', 'A locked table'],
      answer: 1,
      explanation: 'Each statement committed on its own, so the first change stays. Wrap both in BEGIN … COMMIT.',
    },
  },

  [`${B}/concurrency-control`]: {
    answer: 'Concurrency control lets many transactions run at once while producing a result equal to some serial order (serializability). Databases use locks with two-phase locking, timestamp ordering, or MVCC, and must detect or prevent deadlocks.',
    points: [
      'Two operations conflict if they touch the same item and one is a write.',
      'A schedule is conflict-serializable if its precedence graph has no cycle.',
      'MVCC lets readers see a snapshot without blocking writers.',
    ],
    example: {
      label: 'Test a schedule for conflict serializability',
      lang: 'python',
      code: `schedule = [("T1", "R", "A"), ("T2", "W", "A"), ("T2", "R", "B"), ("T1", "W", "B")]

edges = set()
for i, (ti, op_i, x) in enumerate(schedule):
    for tj, op_j, y in schedule[i + 1:]:
        if ti != tj and x == y and "W" in (op_i, op_j):
            edges.add((ti, tj))
print("edges:", sorted(edges))
cycle = ("T1", "T2") in edges and ("T2", "T1") in edges
print("conflict-serializable:", not cycle)`,
    },
    check: {
      question: 'Which pair of operations never conflicts?',
      options: ['Read and write of the same item', 'Write and write of the same item', 'Read and read of the same item', 'Write and read of the same item'],
      answer: 2,
      explanation: 'Two reads cannot change the outcome, so their order does not matter.',
    },
  },

  [`${B}/query-processing`]: {
    answer: 'A query passes through a pipeline: the parser checks syntax, semantic analysis checks names and permissions, the rewriter applies rules, the optimiser picks the cheapest plan using statistics, and the executor runs it. Plans are trees of relational algebra operators such as selection, projection and join.',
    points: [
      'Predicate pushdown filters before joins to shrink intermediate results.',
      'Join algorithms: nested loop, hash join, sort-merge.',
      'Stale statistics lead to bad plans.',
    ],
    example: {
      label: 'The plan SQLite chose for a join',
      lang: 'sql',
      code: `EXPLAIN QUERY PLAN
SELECT c.first_name, o.total_amount
FROM customers AS c
JOIN orders AS o ON o.customer_id = c.customer_id
WHERE c.city = 'Austin';`,
    },
    check: {
      question: 'What does predicate pushdown do?',
      options: ['Sorts the output', 'Applies filters as early as possible, before joins', 'Adds indexes', 'Caches results'],
      answer: 1,
      explanation: 'Filtering early means joins and later steps handle far fewer rows.',
    },
  },

  [`${B}/storage-file-organization`]: {
    answer: 'Databases store data in fixed-size pages on disk and cache hot pages in a memory buffer pool. Because sequential I/O is far faster than random I/O, file organisation (heap, sorted, hashed), page layout and buffer replacement policies are designed around reading pages efficiently.',
    points: [
      'Disk access time = seek + rotational latency + transfer.',
      'Slotted pages store variable-length records.',
      'The buffer pool evicts pages with policies such as LRU or clock.',
    ],
    example: {
      label: 'Pages needed for a table',
      lang: 'python',
      code: `rows = 50_000_000
row_bytes = 160
page_bytes = 8192
rows_per_page = page_bytes // row_bytes
pages = -(-rows // rows_per_page)          # ceiling division
print(f"{rows_per_page} rows per page, {pages:,} pages for a full scan")`,
    },
    check: {
      question: 'Why do databases favour sequential I/O?',
      options: ['It uses less disk space', 'It is much faster than random I/O', 'It is required by SQL', 'It avoids locks'],
      answer: 1,
      explanation: 'Reading consecutive pages avoids repeated seeks, which dominate random access time.',
    },
  },

  [`${B}/hashing-btrees`]: {
    answer: 'Hash indexes map keys to buckets with a hash function, giving O(1) equality lookups but no ordering. B+ trees keep keys sorted in a balanced tree, giving O(log n) lookups plus range scans, and stay balanced through node splits and merges.',
    points: [
      'Use hashing for exact matches; B+ trees for ranges and sorting.',
      'Extendible and linear hashing grow without full rebuilds.',
      'B+ tree leaves are linked for fast range scans.',
    ],
    example: {
      label: 'Static hashing into buckets with key mod N',
      lang: 'python',
      code: `keys = [15, 22, 8, 31, 40, 17, 9, 26]
N = 5
buckets = {b: [] for b in range(N)}
for k in keys:
    buckets[k % N].append(k)
for b, ks in buckets.items():
    print(f"bucket {b}: {ks}")`,
    },
    check: {
      question: 'Which index type supports WHERE price BETWEEN 10 AND 20 efficiently?',
      options: ['Hash index', 'B+ tree index', 'Bitmap of nothing', 'Neither'],
      answer: 1,
      explanation: 'Hashing destroys order; a B+ tree finds 10 and walks the linked leaves to 20.',
    },
  },

  [`${B}/relational-algebra`]: {
    answer: 'Relational algebra is the procedural language underneath SQL. Its operators take relations and return relations: selection σ (filter rows), projection π (choose columns), Cartesian product ×, union ∪, difference −, and rename ρ, with join ⋈ and intersection ∩ derived from them.',
    points: [
      'SQL WHERE is σ; the SELECT column list is π.',
      'Selection never increases the number of rows.',
      'Optimisers rewrite algebra trees into cheaper equivalents.',
    ],
    example: {
      label: 'π name ( σ city = \'Seattle\' (customers) ) in SQL',
      lang: 'sql',
      code: `SELECT DISTINCT first_name        -- π: projection (sets have no duplicates)
FROM customers
WHERE city = 'Seattle';           -- σ: selection`,
    },
    check: {
      question: 'Which operator corresponds to SQL\'s WHERE clause?',
      options: ['π (projection)', 'σ (selection)', '× (product)', 'ρ (rename)'],
      answer: 1,
      explanation: 'Selection filters rows by a condition; projection picks columns.',
    },
  },

  [`${B}/views-procedures-triggers`]: {
    answer: 'Views are stored queries that act as virtual tables, for abstraction and security. Stored procedures are named programs that run inside the database. Triggers run automatically on INSERT, UPDATE or DELETE. Materialised views store results for fast reads at the cost of staleness.',
    points: [
      'Simple single-table views can be updatable.',
      'WITH CHECK OPTION blocks updates that would leave the view.',
      'Refresh materialised views on a schedule or concurrently.',
    ],
    example: {
      label: 'A view that hides columns and rows',
      lang: 'sql',
      code: `CREATE VIEW seattle_customers AS
SELECT customer_id, first_name, loyalty_tier
FROM customers
WHERE city = 'Seattle';

SELECT * FROM seattle_customers ORDER BY customer_id;`,
    },
    check: {
      question: 'What does a regular view store?',
      options: ['A copy of the data', 'Only its query definition', 'An index', 'A trigger'],
      answer: 1,
      explanation: 'The query runs each time the view is used; a materialised view is the kind that stores rows.',
    },
  },

  [`${B}/crash-recovery`]: {
    answer: 'Crash recovery restores a consistent state after failure using the write-ahead log (WAL): log records reach disk before data pages do. ARIES recovery runs analysis (what was in flight), redo (repeat history to the crash) and undo (roll back uncommitted transactions).',
    points: [
      'Transaction failure needs undo; system failure needs redo and undo.',
      'Media failure needs a backup plus log replay.',
      'Checkpoints shorten recovery time.',
    ],
    example: {
      label: 'Redo committed work, undo the rest (simulation)',
      lang: 'python',
      code: `log = [("T1", "set", "A", 50), ("T2", "set", "B", 70), ("T1", "commit"),
       ("T3", "set", "C", 10)]                  # crash here

committed = {e[0] for e in log if e[1] == "commit"}
state = {}
for e in log:
    if e[1] == "set" and e[0] in committed:
        state[e[2]] = e[3]                       # redo committed changes
undone = sorted({e[0] for e in log if e[1] == "set"} - committed)
print("after recovery:", state, "| rolled back:", undone)`,
    },
    check: {
      question: 'What does the write-ahead rule require?',
      options: ['Data pages are written before log records', 'Log records are on disk before the data pages they describe', 'Logs are deleted at commit', 'No logging during peak hours'],
      answer: 1,
      explanation: 'With the log on disk first, recovery can always redo or undo what happened to a page.',
    },
  },

  [`${B}/distributed-databases`]: {
    answer: 'Distributed databases spread data over machines for capacity (sharding), throughput (replicas) and availability. The CAP theorem says that during a network partition a system must give up either consistency or availability; PACELC adds that, even without partitions, you trade latency against consistency.',
    points: [
      'Sharding splits data by key; replication copies it.',
      'Two-phase commit coordinates transactions across nodes.',
      'Replica reads can be stale.',
    ],
    example: {
      label: 'Range sharding by customer_id',
      lang: 'sql',
      code: `SELECT CASE WHEN customer_id <= 7 THEN 'shard_1'
            WHEN customer_id <= 14 THEN 'shard_2'
            ELSE 'shard_3' END AS shard,
       COUNT(*) AS customers
FROM customers
GROUP BY shard
ORDER BY shard;`,
    },
    check: {
      question: 'What does PACELC add to CAP?',
      options: ['Partitions never happen', 'Even without partitions, there is a latency vs consistency trade-off', 'Availability is free', 'Only consistency matters'],
      answer: 1,
      explanation: 'Keeping replicas strongly consistent costs latency all the time, not only during partitions.',
    },
  },

  [`${B}/nosql-databases`]: {
    answer: 'NoSQL databases relax parts of the relational model to scale out or fit specific shapes of data: key-value stores (Redis, DynamoDB) for fast lookups, document stores (MongoDB) for flexible JSON, column-family stores (Cassandra) for heavy writes, and graph databases (Neo4j) for connected data.',
    points: [
      'Model NoSQL data around the queries you will run.',
      'Most NoSQL systems trade joins and some consistency for scale.',
      'Redis data types include strings, hashes, lists, sets and sorted sets.',
    ],
    example: {
      label: 'A sorted set as a leaderboard (simulation)',
      lang: 'python',
      code: `scores = {}

def zincrby(member, amount):           # like Redis ZINCRBY
    scores[member] = scores.get(member, 0) + amount

for player, points in [("ava", 30), ("ben", 45), ("ava", 25), ("cy", 50)]:
    zincrby(player, points)
top = sorted(scores.items(), key=lambda kv: -kv[1])[:3]   # like ZREVRANGE 0 2
print(top)`,
    },
    check: {
      question: 'Which NoSQL family fits a social network\'s friend-of-friend queries?',
      options: ['Key-value', 'Document', 'Column-family', 'Graph'],
      answer: 3,
      explanation: 'Graph databases store relationships directly, so multi-hop traversals are cheap.',
    },
  },

  [`${B}/database-security`]: {
    answer: 'Database security has layers that all must hold: authentication (who you are), authorisation (what you may do, with least privilege), input safety (parameterised queries against SQL injection), encryption in transit and at rest, and auditing of who accessed what.',
    points: [
      'Use scram-sha-256 or certificates, never trust auth in production.',
      'Application accounts get only the privileges they need.',
      'Never build SQL by concatenating user input.',
    ],
    example: {
      label: 'SQL injection, and the parameterised fix',
      lang: 'python',
      code: `import sqlite3

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE users (name TEXT, role TEXT)")
db.executemany("INSERT INTO users VALUES (?, ?)", [("ava", "admin"), ("ben", "user")])

name = "nobody' OR '1'='1"
unsafe = db.execute(f"SELECT name FROM users WHERE name = '{name}'").fetchall()
safe = db.execute("SELECT name FROM users WHERE name = ?", (name,)).fetchall()
print("concatenated:", unsafe)
print("parameterised:", safe)`,
    },
    check: {
      question: 'What prevents SQL injection?',
      options: ['Escaping quotes by hand', 'Parameterised queries', 'Longer passwords', 'Encryption at rest'],
      answer: 1,
      explanation: 'Parameters are sent separately from the SQL text, so input can never change the query\'s structure.',
    },
  },

  [`${B}/interview-questions`]: {
    answer: 'DBMS interviews cover a fixed set of topics: what a DBMS adds over files, ER design, keys, normal forms, SQL, indexing, transactions and ACID, isolation levels and concurrency, recovery, and distributed trade-offs such as CAP. Clear definitions with a small example score best.',
    points: [
      'Explain each normal form with the anomaly it removes.',
      'Know dirty, non-repeatable and phantom reads.',
      'Contrast clustered and secondary indexes.',
    ],
    example: {
      label: 'A classic: the Nth highest value',
      lang: 'sql',
      code: `-- 3rd highest product price
SELECT DISTINCT unit_price
FROM products
ORDER BY unit_price DESC
LIMIT 1 OFFSET 2;`,
    },
    check: {
      question: 'Which isolation anomaly is "the same query returns new rows on re-run within a transaction"?',
      options: ['Dirty read', 'Non-repeatable read', 'Phantom read', 'Lost update'],
      answer: 2,
      explanation: 'Phantoms are new rows matching a condition; non-repeatable reads are changed values of the same row.',
    },
  },
}
