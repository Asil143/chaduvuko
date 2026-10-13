import type { TrackCheatSheet } from '@/lib/cheatsheet'

export const dbmsCheatSheet: TrackCheatSheet = {
  track: 'dbms',
  title: 'DBMS',
  trackHref: '/learn/dbms',
  accent: '#14b8a6',
  blurb: 'Relations, keys, normalization, transactions, indexes and joins — the DBMS ideas from the track, with just enough SQL to see them. Bookmark it.',
  sections: [
    {
      title: 'Relational model',
      entries: [
        { label: 'Relation, tuple, domain', code: `-- relation: a table\n-- tuple: one row; attribute: one column\n-- domain: the legal values of a column\nStudents(id, name, dept)` },
        { label: 'Schema vs instance', code: `-- schema: the structure (stable)\n-- instance: the rows right now\n-- degree: number of columns\n-- cardinality: number of rows` },
        { label: 'Integrity', code: `-- entity: primary key is never NULL\n-- referential: a foreign key matches\n--   a parent key, or is NULL\n-- domain: age is an integer >= 0` },
      ],
    },
    {
      title: 'Keys',
      entries: [
        { label: 'Super, candidate, primary', code: `-- super key: identifies a row (extras ok)\n-- candidate: a minimal super key\n-- primary: the candidate you pick\n-- alternate: every other candidate` },
        { label: 'Foreign and composite', code: `CREATE TABLE enroll (\n  student_id INT REFERENCES students(id),\n  course_id  INT,\n  PRIMARY KEY (student_id, course_id)\n);` },
        { label: 'Surrogate vs natural', code: `-- surrogate: an id the db generates\n--   no business meaning\n-- natural: email, isbn — meaningful,\n--   but the real world can change it` },
      ],
    },
    {
      title: 'ER model',
      entries: [
        { label: 'Pieces', code: `-- entity: a thing (Student, Course)\n-- attribute: a fact about it\n-- relationship: how entities connect\n-- key attribute is underlined` },
        { label: 'Cardinality', code: `-- 1:1  a person and a passport\n-- 1:N  a dept and its employees\n-- M:N  students and courses\n-- M:N becomes its own table` },
        { label: 'Weak entity', code: `-- no key of its own; needs the owner\n-- Section depends on Course\n-- partial key (room) plus Course id\n-- double rectangle, double diamond` },
      ],
    },
    {
      title: 'Normalization',
      entries: [
        { label: 'Anomalies', code: `-- one wide table of students and courses\n-- insert: no course without a student\n-- update: dept name copied on many rows\n-- delete: last student removes the course` },
        { label: '1NF, 2NF, 3NF', code: `-- 1NF  atomic cells, no repeating groups\n-- 2NF  no partial dependency\n--      on part of a composite key\n-- 3NF  no transitive: non-key → non-key` },
        { label: 'Functional dependencies', code: `-- student_id → name, dept\n-- Armstrong: reflexivity,\n--   augmentation, transitivity\n-- closure of X: all that X determines\n-- candidate key: closure is every column` },
        { label: 'BCNF and beyond', code: `-- BCNF: every determinant is a superkey\n-- 4NF: no multi-valued dependency\n-- 5NF: no hidden join dependency\n-- denormalize only for a measured join` },
      ],
    },
    {
      title: 'Joins',
      entries: [
        { label: 'Equijoin', code: `SELECT s.name, e.grade\nFROM students s\nJOIN enroll e\n  ON e.student_id = s.id;` },
        { label: 'Inner vs outer', code: `-- inner: only rows that match\n-- left:  every left row; NULL if none\n-- right: every right row\n-- full:  both sides, NULL where missing` },
        { label: 'Relational algebra', code: `-- σ grade > 80 (Enroll)   select rows\n-- π name (Student)         project cols\n-- Student ⋈ Enroll         join\n-- π ∪ π    same columns    union` },
      ],
    },
    {
      title: 'Indexes',
      entries: [
        { label: 'Why an index', code: `CREATE INDEX enroll_student_idx\n  ON enroll (student_id);\n-- lookups and joins speed up\n-- every insert and update pays` },
        { label: 'B+ tree vs hash', code: `-- B+ tree: keys in order, leaves linked\n--   equality and range (BETWEEN, ORDER)\n-- hash: equality only, not a range\n-- clustered: rows stored in key order` },
        { label: 'When to skip', code: `-- covering: the index holds every\n--   column this query needs\n-- skip: tiny tables, columns you\n--   rewrite constantly, a flag alone` },
      ],
    },
    {
      title: 'Transactions',
      entries: [
        { label: 'One unit of work', code: `BEGIN;\nUPDATE accounts SET bal = bal - 100\n  WHERE id = 1;\nUPDATE accounts SET bal = bal + 100\n  WHERE id = 2;\nCOMMIT;     -- or ROLLBACK` },
        { label: 'ACID', code: `-- atomicity    all of it, or none\n-- consistency  constraints hold after\n-- isolation    other work stays hidden\n-- durability   commit survives a crash` },
        { label: 'Isolation levels', code: `-- READ UNCOMMITTED  dirty reads\n-- READ COMMITTED    no dirty reads\n-- REPEATABLE READ   row stays put\n-- SERIALIZABLE      as if one by one\n-- engines differ on phantoms` },
      ],
    },
    {
      title: 'Concurrency',
      entries: [
        { label: 'The anomalies', code: `-- lost update: two writes, one vanishes\n-- dirty read: saw a value that rolled back\n-- non-repeatable: row changed mid-txn\n-- phantom: a new row appears in a range` },
        { label: 'Locks and 2PL', code: `-- shared (S): many readers\n-- exclusive (X): one writer\n-- 2PL: grow (acquire), then shrink\n-- no new lock after the first release` },
        { label: 'MVCC and deadlock', code: `-- MVCC: a reader sees a snapshot\n-- writers add a new version\n-- deadlock: each waits on the other\n-- detect it, abort one, let it retry` },
      ],
    },
    {
      title: 'Storage & query plans',
      entries: [
        { label: 'Pages and files', code: `-- page (often 8 KB) is the I/O unit\n-- buffer pool: those pages in memory\n-- heap: rows appended, no order\n-- sequential file: rows ordered by a key` },
        { label: 'Read the plan', code: `EXPLAIN ANALYZE\nSELECT * FROM enroll\nWHERE student_id = 42;\n-- seq scan reads the heap\n-- index scan walks the B+ tree first` },
        { label: 'What the planner uses', code: `-- parse → plan → execute\n-- cost ≈ pages read, not wall clock\n-- a stale statistic picks a bad plan\n-- selective predicates want an index` },
      ],
    },
    {
      title: 'Recovery & distribution',
      entries: [
        { label: 'WAL and ARIES', code: `-- log the change before the data page\n-- checkpoint: a shorter recovery start\n-- redo what committed\n-- undo what did not` },
        { label: 'CAP and 2PC', code: `-- partition: pick consistency or\n--   availability, not both\n-- CP waits or fails; AP answers, repairs\n-- 2PC: prepare, then commit\n-- a dead coordinator can stall everyone` },
        { label: 'View and grant', code: `CREATE VIEW dean_list AS\nSELECT student_id, grade FROM enroll\nWHERE grade >= 90;\n-- a view is a stored query\nGRANT SELECT ON dean_list TO advisor;` },
      ],
    },
  ],
  projects: [
    { title: 'Library on paper', level: 'Beginner', build: 'Draw an ER diagram for books, members and loans. Turn the many-to-many loan into tables and mark every primary and foreign key.', skills: ['ER model', 'keys', 'cardinality'] },
    { title: 'Two joins', level: 'Beginner', build: 'On a students-and-enrolments schema, write one inner join and one left join. Say which rows the left join keeps that the inner join drops.', skills: ['joins', 'foreign keys', 'nulls'] },
    { title: 'Normalize an orders sheet', level: 'Intermediate', build: 'Start from one wide orders table. Name the insert, update and delete anomalies, list the functional dependencies, and decompose to 3NF.', skills: ['anomalies', 'functional dependencies', '3NF'] },
    { title: 'Index before and after', level: 'Intermediate', build: 'Load a few thousand enrolment rows. Run EXPLAIN on a lookup by student_id before and after an index, and name one column you would leave unindexed and why.', skills: ['indexes', 'EXPLAIN', 'B+ trees'] },
    { title: 'Transfer, then a crash', level: 'Advanced', build: 'Write a two-account transfer as one transaction. Show which ACID property fails if only the debit commits, then say what WAL redo and undo do if the process dies after the log flush.', skills: ['ACID', 'isolation', 'WAL'] },
  ],
}
