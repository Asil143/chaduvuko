import type { LessonQuick } from '@/lib/lesson-quick'

const S = '/learn/sql'

// SQL examples run on FreshCart in the lesson's playground; their results are computed by
// scripts/quick-results.ts, never typed here.
export const SQL_QUICK: Record<string, LessonQuick> = {
  [`${S}/what-is-a-database`]: {
    answer: 'A database is an organised collection of data managed by a database management system (DBMS), which stores it safely, lets many people read and change it at once, and answers questions about it through a query language such as SQL.',
    points: [
      'Data lives in tables of rows and columns; a primary key identifies each row.',
      'Foreign keys link tables, so an order can point to the customer who placed it.',
      'A DBMS guarantees ACID: changes fully succeed or fully fail, and survive crashes.',
    ],
    example: {
      label: 'Ask the FreshCart database a question',
      lang: 'sql',
      code: `SELECT first_name, last_name, city, loyalty_tier
FROM customers
LIMIT 5;`,
    },
    check: {
      question: 'What does a primary key guarantee?',
      options: ['That the column is indexed for text search', 'That every row has a unique, non-null identifier', 'That the table can be joined to any other table', 'That the column is sorted on disk'],
      answer: 1,
      explanation: 'A primary key value is unique and never NULL, so it identifies exactly one row. The database enforces both rules for you.',
    },
  },

  [`${S}/how-databases-work`]: {
    answer: 'When you run a query, the database parses it, plans the cheapest way to answer it, and executes that plan, reading pages of table data from memory or disk, while a transaction manager keeps concurrent changes safe.',
    points: [
      'One table stores one kind of thing: customers in one table, orders in another.',
      'Each column holds one atomic value of a declared type, such as DECIMAL for money.',
      'Primary keys are indexed automatically, which is why lookups by id are fast.',
    ],
    example: {
      label: 'Typed columns in action: price, cost and margin',
      lang: 'sql',
      code: `SELECT product_name, unit_price, cost_price,
       unit_price - cost_price AS margin
FROM products
ORDER BY margin DESC
LIMIT 5;`,
    },
    check: {
      question: 'Which type should a column storing prices use?',
      options: ['FLOAT', 'VARCHAR', 'DECIMAL', 'INTEGER'],
      answer: 2,
      explanation: 'DECIMAL stores exact decimal values. FLOAT introduces binary rounding errors that add up in money calculations.',
    },
  },

  [`${S}/types-of-databases`]: {
    answer: 'Databases come in families built for different jobs: relational (PostgreSQL, MySQL) for structured data with relationships, document (MongoDB) for flexible JSON, key-value (Redis) for fast lookups, column-family (Cassandra) for huge write volumes, plus graph and time-series stores.',
    points: [
      'Relational databases are the default for structured data that must stay correct.',
      'Key-value stores like Redis answer exact-key lookups in under a millisecond, so they suit caches and sessions.',
      'In a distributed system you trade consistency against availability when the network splits (CAP).',
    ],
    example: {
      label: 'A relational question: join two tables and aggregate',
      lang: 'sql',
      code: `SELECT c.city, COUNT(o.order_id) AS orders
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
GROUP BY c.city
ORDER BY orders DESC
LIMIT 5;`,
    },
    check: {
      question: 'Which database type fits caching user sessions by session id?',
      options: ['Graph database', 'Key-value store', 'Column-family store', 'Data warehouse'],
      answer: 1,
      explanation: 'Sessions are read and written by an exact key. A key-value store such as Redis does exactly that, very fast.',
    },
  },

  [`${S}/setting-up`]: {
    answer: 'You can run every query in this course in the browser playground on each lesson, which runs SQLite over the FreshCart sample database. For a local setup, install PostgreSQL (or MySQL) and connect with a client such as DBeaver.',
    points: [
      'The playground needs no install and resets every time you reload.',
      'PostgreSQL is the most common choice at US tech companies; MySQL is the common alternative.',
      'SQLite runs from a single file with no server, which makes it ideal for learning.',
    ],
    example: {
      label: 'Check that the playground database is loaded',
      lang: 'sql',
      code: `SELECT COUNT(*) AS customers_loaded
FROM customers;`,
    },
    check: {
      question: 'Which database engine does the lesson playground run?',
      options: ['PostgreSQL', 'MySQL', 'SQLite', 'SQL Server'],
      answer: 2,
      explanation: 'The playground runs SQLite in your browser through sql.js, so no server or install is needed.',
    },
  },

  [`${S}/select-from`]: {
    answer: 'SELECT names the columns you want and FROM names the table to read them from. Together they form every query: SELECT first_name, city FROM customers returns those two columns for every customer.',
    points: [
      'The database runs FROM before SELECT, even though you write SELECT first.',
      'SELECT * returns every column; in real code, name the columns you need.',
      'SELECT can compute values, such as unit_price - cost_price, without changing the table.',
    ],
    example: {
      label: 'Two columns from one table',
      lang: 'sql',
      code: `SELECT first_name, city
FROM customers
LIMIT 5;`,
    },
    check: {
      question: 'In which order does the database process these clauses?',
      options: ['SELECT, then FROM', 'FROM, then SELECT', 'Both at the same time', 'It depends on the table size'],
      answer: 1,
      explanation: 'The database first finds the table (FROM) and only then picks the columns (SELECT). That is why the logical order is FROM → WHERE → … → SELECT.',
    },
  },

  [`${S}/where-clause`]: {
    answer: 'WHERE keeps only the rows for which a condition is true. WHERE city = \'Seattle\' returns Seattle customers; rows where the condition is false or NULL are dropped.',
    points: [
      'Comparison operators: =, <> (or !=), >, <, >=, <=.',
      'Text and dates go in single quotes; numbers do not: WHERE total_amount > 50.',
      'WHERE runs before SELECT, so it cannot use a column alias defined in SELECT.',
    ],
    example: {
      label: 'Only the Seattle customers',
      lang: 'sql',
      code: `SELECT first_name, last_name, loyalty_tier
FROM customers
WHERE city = 'Seattle';`,
    },
    check: {
      question: 'What happens to a row when the WHERE condition evaluates to NULL?',
      options: ['It is kept', 'It is dropped', 'It causes an error', 'It is kept with NULL in every column'],
      answer: 1,
      explanation: 'WHERE keeps only rows where the condition is TRUE. Both FALSE and NULL (unknown) drop the row.',
    },
  },

  [`${S}/and-or-not`]: {
    answer: 'AND requires both conditions to be true, OR requires at least one, and NOT reverses a condition. SQL evaluates NOT first, then AND, then OR, so use parentheses whenever you mix AND and OR.',
    points: [
      'Each AND narrows the result; each OR widens it.',
      'a OR b AND c means a OR (b AND c), which is rarely what you meant.',
      'NOT does not match NULLs: NOT (city = \'Seattle\') skips rows where city is NULL.',
    ],
    example: {
      label: 'Gold customers in Seattle: both conditions must hold',
      lang: 'sql',
      code: `SELECT first_name, last_name, city, loyalty_tier
FROM customers
WHERE loyalty_tier = 'Gold'
  AND city = 'Seattle';`,
    },
    check: {
      question: 'How does SQL read WHERE a OR b AND c?',
      options: ['(a OR b) AND c', 'a OR (b AND c)', 'Left to right, as written', 'It is a syntax error'],
      answer: 1,
      explanation: 'AND binds tighter than OR, so b AND c is evaluated first. Add parentheses to say what you mean.',
    },
  },

  [`${S}/order-by`]: {
    answer: 'ORDER BY sorts the result by one or more columns, ascending by default (ASC) or descending (DESC). Without ORDER BY, rows come back in no guaranteed order.',
    points: [
      'Sort by several columns: the second column breaks ties in the first.',
      'Each column takes its own direction: ORDER BY city ASC, total DESC.',
      'ORDER BY runs after SELECT, so it can use SELECT aliases.',
    ],
    example: {
      label: 'The five most expensive products',
      lang: 'sql',
      code: `SELECT product_name, unit_price
FROM products
ORDER BY unit_price DESC
LIMIT 5;`,
    },
    check: {
      question: 'What order do rows come back in when a query has no ORDER BY?',
      options: ['By primary key', 'Alphabetically', 'In insertion order', 'No guaranteed order'],
      answer: 3,
      explanation: 'Without ORDER BY the database may return rows in any order, and it can change between runs. Always sort explicitly when order matters.',
    },
  },

  [`${S}/limit-fetch`]: {
    answer: 'LIMIT n returns at most n rows; OFFSET m skips the first m. SQL Server writes it as TOP n and the SQL standard as FETCH FIRST n ROWS ONLY. Combine it with ORDER BY, or the rows you get are arbitrary.',
    points: [
      'LIMIT runs last, after ORDER BY.',
      'Page N of size S is LIMIT S OFFSET (N - 1) * S.',
      'Add the primary key as the last sort column so pages never repeat or skip rows.',
    ],
    example: {
      label: 'The three largest orders',
      lang: 'sql',
      code: `SELECT order_id, total_amount
FROM orders
ORDER BY total_amount DESC
LIMIT 3;`,
    },
    check: {
      question: 'Which OFFSET returns page 3 when each page has 10 rows?',
      options: ['OFFSET 3', 'OFFSET 10', 'OFFSET 20', 'OFFSET 30'],
      answer: 2,
      explanation: 'OFFSET = (page − 1) × page size = (3 − 1) × 10 = 20. Page 1 starts at OFFSET 0.',
    },
  },

  [`${S}/distinct`]: {
    answer: 'SELECT DISTINCT removes duplicate rows from the result, so each unique combination of the selected columns appears once. COUNT(DISTINCT column) counts unique values.',
    points: [
      'DISTINCT applies to the whole row of selected columns, not to one column.',
      'COUNT(*) counts rows, COUNT(col) counts non-NULL values, COUNT(DISTINCT col) counts unique ones.',
      'Use GROUP BY instead when you also need a count or total per value.',
    ],
    example: {
      label: 'Each customer city once',
      lang: 'sql',
      code: `SELECT DISTINCT city
FROM customers
ORDER BY city;`,
    },
    check: {
      question: 'SELECT DISTINCT city, loyalty_tier returns one row per…',
      options: ['City', 'Loyalty tier', 'Unique (city, loyalty_tier) pair', 'Customer'],
      answer: 2,
      explanation: 'DISTINCT deduplicates whole rows. With two columns selected, each unique pair of values appears once.',
    },
  },

  [`${S}/null-values`]: {
    answer: 'NULL means a value is missing or unknown; it is not zero or an empty string. Comparisons with NULL return unknown, so test for it with IS NULL or IS NOT NULL, never = NULL.',
    points: [
      'WHERE col = NULL matches no rows, ever. Use WHERE col IS NULL.',
      'Arithmetic with NULL gives NULL; aggregates such as SUM and AVG skip NULLs.',
      'COALESCE(col, default) substitutes a value when col is NULL.',
    ],
    example: {
      label: 'Orders not delivered yet have no delivery date',
      lang: 'sql',
      code: `SELECT order_id, order_status, delivery_date
FROM orders
WHERE delivery_date IS NULL;`,
    },
    check: {
      question: 'How many rows does WHERE delivery_date = NULL return?',
      options: ['Every row with no delivery date', 'Zero rows', 'Every row', 'It raises an error'],
      answer: 1,
      explanation: 'Any comparison with NULL is unknown, never true, so = NULL matches nothing. IS NULL is the correct test.',
    },
  },

  [`${S}/arithmetic-expressions`]: {
    answer: 'You can calculate in SELECT with +, -, *, / and %, creating computed columns without changing the table. Multiplication and division run before addition and subtraction; parentheses override that.',
    points: [
      'Integer division truncates: 7 / 2 is 3. Use 7.0 / 2 or CAST to get 3.5.',
      'Any calculation involving NULL returns NULL; wrap nullable columns in COALESCE.',
      'ROUND(value, 2) rounds to two decimal places for display.',
    ],
    example: {
      label: 'Margin per product, computed in the query',
      lang: 'sql',
      code: `SELECT product_name,
       ROUND(unit_price - cost_price, 2) AS margin,
       ROUND((unit_price - cost_price) * 100.0 / unit_price, 1) AS margin_pct
FROM products
LIMIT 5;`,
    },
    check: {
      question: 'In PostgreSQL, what does SELECT 7 / 2 return?',
      options: ['3.5', '3', '4', 'An error'],
      answer: 1,
      explanation: 'Both operands are integers, so the result is integer division and the fraction is dropped. Write 7.0 / 2 for 3.5.',
    },
  },

  [`${S}/aliases`]: {
    answer: 'AS gives a column or table a temporary name in the query. Column aliases make computed columns readable; table aliases shorten names in joins, such as orders AS o.',
    points: [
      'Aliases exist only in the result; the schema never changes.',
      'Column aliases work in ORDER BY but not in WHERE or GROUP BY in standard SQL.',
      'To filter on a computed value, repeat the expression in WHERE.',
    ],
    example: {
      label: 'Readable names for computed columns',
      lang: 'sql',
      code: `SELECT product_name AS product,
       unit_price - cost_price AS profit
FROM products
ORDER BY profit DESC
LIMIT 5;`,
    },
    check: {
      question: 'Which clause can use a column alias defined in SELECT?',
      options: ['WHERE', 'GROUP BY', 'ORDER BY', 'FROM'],
      answer: 2,
      explanation: 'ORDER BY runs after SELECT, so the alias already exists. WHERE and GROUP BY run before SELECT.',
    },
  },

  [`${S}/like-wildcards`]: {
    answer: 'LIKE matches text against a pattern: % stands for any run of characters (including none) and _ for exactly one character. WHERE product_name LIKE \'%Milk%\' finds names containing Milk.',
    points: [
      '\'abc%\' means starts with, \'%abc\' ends with, \'%abc%\' contains.',
      'LIKE is case-sensitive in PostgreSQL (use ILIKE there); SQLite ignores case for ASCII letters.',
      'Starts-with patterns can use an index; a leading % forces a full scan.',
    ],
    example: {
      label: 'Products whose name contains "Milk"',
      lang: 'sql',
      code: `SELECT product_name, brand, unit_price
FROM products
WHERE product_name LIKE '%Milk%';`,
    },
    check: {
      question: 'Which pattern matches exactly three characters?',
      options: ["'%%%'", "'___'", "'3%'", "'_%_'"],
      answer: 1,
      explanation: 'Each _ matches exactly one character, so three underscores match any three-character value.',
    },
  },

  [`${S}/in-between`]: {
    answer: 'IN tests whether a value is in a list, a shorter way to write several ORs. BETWEEN tests an inclusive range: price BETWEEN 5 AND 10 includes both 5 and 10.',
    points: [
      'city IN (\'Seattle\', \'Austin\') equals city = \'Seattle\' OR city = \'Austin\'.',
      'BETWEEN low AND high needs the smaller value first, or it matches nothing.',
      'NOT IN returns no rows if its list contains a NULL; prefer NOT EXISTS for subqueries.',
    ],
    example: {
      label: 'Products priced from $5 to $7, inclusive',
      lang: 'sql',
      code: `SELECT product_name, unit_price
FROM products
WHERE unit_price BETWEEN 5 AND 7
ORDER BY unit_price;`,
    },
    check: {
      question: 'Does price BETWEEN 5 AND 7 include a price of exactly 7?',
      options: ['Yes, both ends are included', 'No, the upper end is excluded', 'Only in PostgreSQL', 'Only if the column is an integer'],
      answer: 0,
      explanation: 'BETWEEN is inclusive on both ends: it equals price >= 5 AND price <= 7.',
    },
  },

  [`${S}/case-when`]: {
    answer: 'CASE WHEN is SQL\'s if/else: it checks conditions in order and returns the result of the first one that is true, or the ELSE value. Use it to label, bucket, or conditionally count rows.',
    points: [
      'The first matching WHEN wins, so put the most specific condition first.',
      'Without ELSE, unmatched rows get NULL.',
      'It works in SELECT, WHERE, ORDER BY, and inside aggregates such as SUM(CASE …).',
    ],
    example: {
      label: 'Bucket orders by size',
      lang: 'sql',
      code: `SELECT order_id, total_amount,
  CASE
    WHEN total_amount >= 60 THEN 'Large'
    WHEN total_amount >= 30 THEN 'Medium'
    ELSE 'Small'
  END AS size
FROM orders
LIMIT 5;`,
    },
    check: {
      question: 'What does a CASE expression return when no WHEN matches and there is no ELSE?',
      options: ['0', 'An empty string', 'NULL', 'An error'],
      answer: 2,
      explanation: 'With no ELSE, unmatched rows get NULL, which can silently break totals and reports. Always add ELSE.',
    },
  },

  [`${S}/complex-where`]: {
    answer: 'A complex WHERE combines many conditions with AND, OR and NOT. Because AND is evaluated before OR, wrap OR groups in parentheses so the filter means exactly what the business rule says.',
    points: [
      'tier = \'Gold\' OR tier = \'Platinum\' AND city = \'Seattle\' keeps Gold customers from every city.',
      'Write (tier = \'Gold\' OR tier = \'Platinum\') AND city = \'Seattle\' instead.',
      'De Morgan: NOT (a OR b) equals NOT a AND NOT b.',
    ],
    example: {
      label: 'Gold or Platinum customers, but only in Seattle',
      lang: 'sql',
      code: `SELECT first_name, city, loyalty_tier
FROM customers
WHERE (loyalty_tier = 'Gold' OR loyalty_tier = 'Platinum')
  AND city = 'Seattle';`,
    },
    check: {
      question: 'Which is equivalent to NOT (a OR b)?',
      options: ['NOT a OR NOT b', 'NOT a AND NOT b', 'a AND b', 'NOT a AND b'],
      answer: 1,
      explanation: 'By De Morgan\'s law, "neither a nor b" means both are false: NOT a AND NOT b.',
    },
  },

  [`${S}/data-types`]: {
    answer: 'A column\'s data type decides what it can store and how it behaves: INTEGER for whole numbers, DECIMAL for exact amounts such as money, VARCHAR or TEXT for text, DATE and TIMESTAMP for time, BOOLEAN for true/false.',
    points: [
      'Never store money as FLOAT; use DECIMAL(p, 2).',
      'Phone numbers and zip codes are text: they have leading zeros and no arithmetic.',
      'The wrong type causes silent bugs, such as text dates sorting alphabetically.',
    ],
    example: {
      label: 'The declared types of the orders table',
      lang: 'sql',
      code: `SELECT name, type
FROM pragma_table_info('orders');`,
    },
    check: {
      question: 'Which type fits a US zip code such as 02134?',
      options: ['INTEGER', 'DECIMAL', 'VARCHAR', 'FLOAT'],
      answer: 2,
      explanation: 'Stored as a number, 02134 loses its leading zero. Zip codes are identifiers, not quantities, so store them as text.',
    },
  },

  [`${S}/create-table`]: {
    answer: 'CREATE TABLE defines a new table: its columns, their data types, and the rules (constraints) every row must follow, such as PRIMARY KEY, NOT NULL, UNIQUE and FOREIGN KEY.',
    points: [
      'Columns are nullable unless you add NOT NULL.',
      'PRIMARY KEY means unique and not null, and identifies the row.',
      'FOREIGN KEY ensures a referenced row exists in the parent table.',
    ],
    example: {
      label: 'Create a table, add a row, read it back',
      lang: 'sql',
      code: `CREATE TABLE coupons (
  code     VARCHAR PRIMARY KEY,
  discount DECIMAL NOT NULL,
  expires  DATE
);
INSERT INTO coupons VALUES ('SPRING10', 10, '2024-04-30');
SELECT * FROM coupons;`,
    },
    check: {
      question: 'Which constraint stops two customers from sharing one email address?',
      options: ['NOT NULL', 'UNIQUE', 'CHECK', 'DEFAULT'],
      answer: 1,
      explanation: 'UNIQUE rejects a second row with a value that already exists in the column.',
    },
  },

  [`${S}/insert-into`]: {
    answer: 'INSERT INTO adds rows to a table: name the columns, then give the values in the same order. One statement can insert many rows, or insert the result of a SELECT.',
    points: [
      'Always list the columns: INSERT INTO t (a, b) VALUES (1, 2).',
      'A multi-row VALUES list is much faster than one INSERT per row.',
      'INSERT … ON CONFLICT DO UPDATE inserts new rows and updates existing ones (upsert).',
    ],
    example: {
      label: 'Add a customer, then read it back',
      lang: 'sql',
      code: `INSERT INTO customers (customer_id, first_name, last_name, city, loyalty_tier)
VALUES (21, 'Ava', 'Martinez', 'Denver', 'Bronze');

SELECT customer_id, first_name, city, loyalty_tier
FROM customers
WHERE customer_id = 21;`,
    },
    check: {
      question: 'Why should an INSERT list its column names?',
      options: ['It makes the insert faster', 'It keeps working when the table gains or reorders columns', 'Column names are required by every database', 'It skips constraint checks'],
      answer: 1,
      explanation: 'A positional INSERT breaks, or silently writes values into the wrong columns, when the table structure changes.',
    },
  },

  [`${S}/update`]: {
    answer: 'UPDATE changes values in existing rows: SET says what changes and WHERE says which rows. Without WHERE, every row in the table is updated.',
    points: [
      'Run a SELECT with the same WHERE first and check the rows it returns.',
      'SET can change several columns at once: SET a = 1, b = 2.',
      'SET can use the current value: SET salary = salary * 1.05.',
    ],
    example: {
      label: 'Promote one customer, then check',
      lang: 'sql',
      code: `UPDATE customers
SET loyalty_tier = 'Gold'
WHERE customer_id = 3;

SELECT customer_id, first_name, loyalty_tier
FROM customers
WHERE customer_id = 3;`,
    },
    check: {
      question: 'What does UPDATE products SET in_stock = 0 do?',
      options: ['Updates the first product', 'Updates nothing until you add WHERE', 'Marks every product out of stock', 'Raises an error'],
      answer: 2,
      explanation: 'With no WHERE, UPDATE applies to every row. Always write and test the WHERE clause first.',
    },
  },

  [`${S}/delete`]: {
    answer: 'DELETE FROM removes the rows that match its WHERE condition. Without WHERE it deletes every row, and outside a transaction that cannot be undone.',
    points: [
      'SELECT with the same WHERE first, to see exactly what will be removed.',
      'Many apps soft-delete instead: they set a flag such as is_deleted and keep the row.',
      'A foreign key with ON DELETE CASCADE also deletes the child rows.',
    ],
    example: {
      label: 'Delete a cancelled order\'s line items, then confirm',
      lang: 'sql',
      code: `DELETE FROM order_items
WHERE order_id = 1006;

SELECT COUNT(*) AS items_left
FROM order_items
WHERE order_id = 1006;`,
    },
    check: {
      question: 'Which removes all rows but keeps the table and its structure?',
      options: ['DROP TABLE', 'DELETE without WHERE', 'ALTER TABLE', 'DELETE with WHERE 1 = 0'],
      answer: 1,
      explanation: 'DELETE without WHERE removes every row; the table stays. DROP TABLE removes the table itself.',
    },
  },

  [`${S}/constraints`]: {
    answer: 'Constraints are rules the database enforces on every write: NOT NULL (must have a value), UNIQUE (no duplicates), PRIMARY KEY (unique row identifier), FOREIGN KEY (must match a parent row) and CHECK (must satisfy a condition).',
    points: [
      'Constraints hold even when application code has a bug.',
      'UNIQUE allows several NULLs; PRIMARY KEY allows none.',
      'CHECK lets NULL through, so pair it with NOT NULL when the value is required.',
    ],
    example: {
      label: 'Which customers columns are part of the primary key',
      lang: 'sql',
      code: `SELECT name, type, pk
FROM pragma_table_info('customers')
LIMIT 4;`,
    },
    check: {
      question: 'A CHECK (quantity > 0) constraint receives a NULL quantity. What happens?',
      options: ['The row is rejected', 'The row is accepted', 'The value becomes 0', 'The database raises a warning only'],
      answer: 1,
      explanation: 'CHECK rejects only FALSE. NULL > 0 is unknown, so the row passes. Add NOT NULL to block it.',
    },
  },

  [`${S}/alter-table`]: {
    answer: 'ALTER TABLE changes an existing table\'s structure: add, rename or drop columns, change a column\'s type or default, and add or drop constraints.',
    points: [
      'Adding a column with a default is fast in modern PostgreSQL and MySQL.',
      'Dropping a column is permanent; search for code that still uses it first.',
      'Rename safely with expand and contract: add the new column, backfill, switch code, then drop the old one.',
    ],
    example: {
      label: 'Add a column, then read it',
      lang: 'sql',
      code: `ALTER TABLE orders ADD COLUMN notes TEXT DEFAULT 'none';

SELECT order_id, order_status, notes
FROM orders
LIMIT 3;`,
    },
    check: {
      question: 'Why can ADD COLUMN … NOT NULL fail on a table that already has rows?',
      options: ['NOT NULL columns cannot be added later', 'The existing rows would have no value for the new column', 'The table must be empty to be altered', 'NOT NULL needs an index'],
      answer: 1,
      explanation: 'Existing rows would get NULL, which breaks the rule. Give the column a DEFAULT so existing rows get a value.',
    },
  },

  [`${S}/drop-truncate`]: {
    answer: 'DROP TABLE removes a table and all its data. TRUNCATE removes every row but keeps the table. DELETE removes chosen rows, one by one, and can be rolled back.',
    points: [
      'TRUNCATE is much faster than DELETE for emptying a table.',
      'TRUNCATE cannot be rolled back in MySQL; in PostgreSQL it is transactional.',
      'DROP … CASCADE also drops dependent objects such as views.',
    ],
    example: {
      label: 'Row counts you would lose',
      lang: 'sql',
      code: `SELECT 'orders' AS table_name, COUNT(*) AS row_count FROM orders
UNION ALL
SELECT 'order_items', COUNT(*) FROM order_items;`,
    },
    check: {
      question: 'Which command empties a table but keeps its structure?',
      options: ['DROP TABLE', 'TRUNCATE', 'ALTER TABLE', 'DROP DATABASE'],
      answer: 1,
      explanation: 'TRUNCATE removes every row and keeps the table, its columns and its constraints. DROP TABLE removes the table entirely.',
    },
  },

  [`${S}/normalization`]: {
    answer: 'Normalization organises tables so each fact is stored once. It prevents update, insert and delete anomalies by splitting data into related tables: 1NF (atomic values), 2NF (no partial dependencies), 3NF (no transitive dependencies).',
    points: [
      '1NF: one value per cell, no repeating column groups.',
      '2NF: with a composite key, every column depends on the whole key.',
      '3NF: non-key columns depend only on the key, not on each other.',
    ],
    example: {
      label: 'One order rebuilt from normalized tables',
      lang: 'sql',
      code: `SELECT oi.order_id, p.product_name, oi.quantity, oi.line_total
FROM order_items oi
JOIN products p ON p.product_id = oi.product_id
WHERE oi.order_id = 1001;`,
    },
    check: {
      question: 'A table stores customer_city next to every order. Changing a city means updating many rows. What is this called?',
      options: ['An insertion anomaly', 'An update anomaly', 'A deletion anomaly', 'A cartesian product'],
      answer: 1,
      explanation: 'The same fact is stored in many places, so an update has to change all of them or the data becomes inconsistent.',
    },
  },

  [`${S}/aggregate-functions`]: {
    answer: 'Aggregate functions turn many rows into one value: COUNT counts, SUM adds, AVG averages, MIN and MAX find the extremes. Without GROUP BY they summarise the whole table.',
    points: [
      'COUNT(*) counts rows; COUNT(col) counts non-NULL values.',
      'Every aggregate except COUNT(*) ignores NULLs.',
      'SUM over zero rows is NULL, not 0; use COALESCE(SUM(x), 0).',
    ],
    example: {
      label: 'Revenue summary of delivered orders',
      lang: 'sql',
      code: `SELECT COUNT(*) AS orders,
       ROUND(SUM(total_amount), 2) AS revenue,
       ROUND(AVG(total_amount), 2) AS avg_order,
       MAX(total_amount) AS largest
FROM orders
WHERE order_status = 'Delivered';`,
    },
    check: {
      question: 'A column has values 10, NULL, 20. What is AVG(column)?',
      options: ['10', '15', '30', 'NULL'],
      answer: 1,
      explanation: 'AVG ignores NULLs, so it averages 10 and 20: (10 + 20) / 2 = 15.',
    },
  },

  [`${S}/group-by`]: {
    answer: 'GROUP BY splits rows into groups that share a value, and aggregates run once per group. GROUP BY city with COUNT(*) gives one row per city with its count.',
    points: [
      'Every non-aggregated column in SELECT must be in GROUP BY.',
      'WHERE filters rows before grouping; HAVING filters groups after.',
      'Grouping by two columns makes one group per unique pair.',
    ],
    example: {
      label: 'Delivered revenue per payment method',
      lang: 'sql',
      code: `SELECT payment_method,
       COUNT(*) AS orders,
       ROUND(SUM(total_amount), 2) AS revenue
FROM orders
WHERE order_status = 'Delivered'
GROUP BY payment_method
ORDER BY revenue DESC;`,
    },
    check: {
      question: 'SELECT city, first_name, COUNT(*) FROM customers GROUP BY city fails in PostgreSQL. Why?',
      options: ['COUNT needs a column name', 'first_name is neither grouped nor aggregated', 'city must come last', 'GROUP BY needs ORDER BY'],
      answer: 1,
      explanation: 'A city group has many first names, so the database cannot pick one. Group by it too, or aggregate it.',
    },
  },

  [`${S}/having`]: {
    answer: 'HAVING filters groups after GROUP BY has computed their aggregates, the way WHERE filters rows before grouping. Use it for conditions on COUNT, SUM, AVG and the like.',
    points: [
      'WHERE cannot use aggregates; HAVING can.',
      'Put plain row conditions in WHERE so fewer rows reach GROUP BY.',
      'Order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.',
    ],
    example: {
      label: 'Cities with at least three customers',
      lang: 'sql',
      code: `SELECT city, COUNT(*) AS customers
FROM customers
GROUP BY city
HAVING COUNT(*) >= 3
ORDER BY customers DESC;`,
    },
    check: {
      question: 'Where does a condition like SUM(total_amount) > 100 belong?',
      options: ['WHERE', 'HAVING', 'ORDER BY', 'FROM'],
      answer: 1,
      explanation: 'The sum exists only after grouping, so the condition has to go in HAVING.',
    },
  },

  [`${S}/joins-intro`]: {
    answer: 'A JOIN combines rows from two tables where a condition matches, usually a foreign key equal to a primary key. INNER JOIN keeps only matches; LEFT JOIN keeps every row of the left table.',
    points: [
      'ON states how rows match: ON o.customer_id = c.customer_id.',
      'Table aliases (orders AS o) keep join queries readable.',
      'LEFT JOIN … WHERE right.id IS NULL finds rows with no match.',
    ],
    example: {
      label: 'Orders with the customer\'s name',
      lang: 'sql',
      code: `SELECT o.order_id, o.total_amount,
       c.first_name || ' ' || c.last_name AS customer
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
LIMIT 5;`,
    },
    check: {
      question: 'Which join keeps every customer, even those without orders?',
      options: ['customers INNER JOIN orders', 'customers LEFT JOIN orders', 'orders LEFT JOIN customers', 'customers CROSS JOIN orders'],
      answer: 1,
      explanation: 'LEFT JOIN keeps every row of the left table (customers). Customers with no orders get NULL order columns.',
    },
  },

  [`${S}/inner-join`]: {
    answer: 'INNER JOIN returns only the rows where the ON condition matches in both tables. It is the default: writing JOIN on its own means INNER JOIN.',
    points: [
      'Rows without a match on either side are left out.',
      'Chain joins to add more tables: orders → order_items → products.',
      'Joining one-to-many before summing inflates totals (fan-out); sum the many side.',
    ],
    example: {
      label: 'Line items with product names for one order',
      lang: 'sql',
      code: `SELECT oi.order_id, p.product_name, oi.quantity, oi.line_total
FROM order_items AS oi
INNER JOIN products AS p ON p.product_id = oi.product_id
WHERE oi.order_id = 1002;`,
    },
    check: {
      question: 'An order\'s customer_id has no match in customers. Does INNER JOIN return that order?',
      options: ['Yes, with NULL customer columns', 'No, it is left out', 'Yes, matched to every customer', 'Only if the order is delivered'],
      answer: 1,
      explanation: 'INNER JOIN keeps only rows with a match on both sides. An unmatched order disappears from the result.',
    },
  },

  [`${S}/left-right-join`]: {
    answer: 'LEFT JOIN keeps every row from the left table and fills the right table\'s columns with NULL where nothing matches. RIGHT JOIN is the mirror image and is usually rewritten as a LEFT JOIN.',
    points: [
      'LEFT JOIN … WHERE right.key IS NULL finds rows with no match (anti-join).',
      'A WHERE filter on a right-table column turns the LEFT JOIN into an INNER JOIN; put it in ON.',
      'After a LEFT JOIN, count with COUNT(right.key), not COUNT(*).',
    ],
    example: {
      label: 'Times each product was ordered, including products never ordered',
      lang: 'sql',
      code: `SELECT p.product_name, COUNT(oi.item_id) AS times_ordered
FROM products AS p
LEFT JOIN order_items AS oi ON oi.product_id = p.product_id
GROUP BY p.product_id, p.product_name
ORDER BY times_ordered, p.product_name
LIMIT 4;`,
    },
    check: {
      question: 'After products LEFT JOIN order_items, what does COUNT(*) give a product that was never ordered?',
      options: ['0', '1', 'NULL', 'The total number of orders'],
      answer: 1,
      explanation: 'The product still has one joined row (with NULL item columns), and COUNT(*) counts it. COUNT(oi.item_id) gives the correct 0.',
    },
  },

  [`${S}/full-outer-join`]: {
    answer: 'FULL OUTER JOIN keeps every row from both tables: matched rows are combined, and unmatched rows from either side appear with NULLs for the other. It is the join for reconciling two sources.',
    points: [
      'Rows that only exist on one side show NULLs for the other side.',
      'COALESCE(a.key, b.key) gives one key column for every row.',
      'Keep only the mismatches with WHERE a.key IS NULL OR b.key IS NULL.',
    ],
    example: {
      label: 'Customers who bought in January or March, but not both',
      lang: 'sql',
      code: `WITH jan AS (SELECT DISTINCT customer_id FROM orders WHERE order_date < '2024-02-01'),
     mar AS (SELECT DISTINCT customer_id FROM orders WHERE order_date >= '2024-03-01')
SELECT jan.customer_id AS january, mar.customer_id AS march
FROM jan
FULL OUTER JOIN mar ON mar.customer_id = jan.customer_id
WHERE jan.customer_id IS NULL OR mar.customer_id IS NULL
ORDER BY COALESCE(jan.customer_id, mar.customer_id)
LIMIT 6;`,
    },
    check: {
      question: 'What is FULL OUTER JOIN mainly used for?',
      options: ['Speeding up lookups', 'Comparing two sources to find rows missing from either', 'Generating every combination of rows', 'Removing duplicates'],
      answer: 1,
      explanation: 'Because it keeps unmatched rows from both sides, it shows exactly what each source has that the other lacks.',
    },
  },

  [`${S}/self-join`]: {
    answer: 'A self join joins a table to itself under two aliases, so you can compare rows of the same table, such as each employee with their manager when manager_id points to another employee_id.',
    points: [
      'Two different aliases are required: employees AS emp and employees AS mgr.',
      'Use LEFT JOIN to keep employees who have no manager.',
      'To list pairs once, add a.id < b.id to the join condition.',
    ],
    example: {
      label: 'Each employee with their manager',
      lang: 'sql',
      code: `SELECT emp.first_name AS employee, emp.role,
       mgr.first_name AS manager
FROM employees AS emp
LEFT JOIN employees AS mgr ON emp.manager_id = mgr.employee_id
LIMIT 5;`,
    },
    check: {
      question: 'Why use LEFT JOIN rather than INNER JOIN for an employee-manager list?',
      options: ['It runs faster', 'It keeps the top manager, whose manager_id is NULL', 'INNER JOIN cannot join a table to itself', 'It removes duplicate managers'],
      answer: 1,
      explanation: 'The top of the hierarchy has no manager, so INNER JOIN would drop them. LEFT JOIN keeps them with a NULL manager.',
    },
  },

  [`${S}/cross-join`]: {
    answer: 'CROSS JOIN pairs every row of one table with every row of another, the Cartesian product: M rows × N rows gives M × N rows. It has no join condition.',
    points: [
      'Use it to build a complete grid, such as every store × every category.',
      'LEFT JOIN real data onto the grid to show zeros instead of missing rows.',
      'A join with a forgotten ON condition becomes a cross join and explodes the row count.',
    ],
    example: {
      label: 'Every payment method paired with every order status',
      lang: 'sql',
      code: `SELECT pm.method, st.status
FROM (SELECT DISTINCT payment_method AS method FROM orders) AS pm
CROSS JOIN (SELECT DISTINCT order_status AS status FROM orders) AS st
ORDER BY pm.method, st.status
LIMIT 6;`,
    },
    check: {
      question: 'A 10-row table is cross joined with a 9-row table. How many rows result?',
      options: ['19', '10', '90', '9'],
      answer: 2,
      explanation: 'Every row pairs with every row: 10 × 9 = 90.',
    },
  },

  [`${S}/subqueries`]: {
    answer: 'A subquery is a SELECT inside another statement. The inner query runs first and its result is used as a single value, a list of values, or a table by the outer query.',
    points: [
      'A scalar subquery returns one value, as in WHERE amount > (SELECT AVG(amount) …).',
      'IN (SELECT …) filters against a list; prefer NOT EXISTS over NOT IN when NULLs are possible.',
      'A subquery in FROM is a derived table and needs an alias.',
    ],
    example: {
      label: 'Orders above the average order value',
      lang: 'sql',
      code: `SELECT order_id, total_amount
FROM orders
WHERE total_amount > (SELECT AVG(total_amount) FROM orders)
ORDER BY total_amount DESC
LIMIT 5;`,
    },
    check: {
      question: 'What must a subquery used with > return?',
      options: ['Any number of rows', 'Exactly one value', 'At least two columns', 'A table with an alias'],
      answer: 1,
      explanation: 'A comparison like > needs a single value on each side, so the subquery must return one row and one column.',
    },
  },

  [`${S}/correlated-subqueries`]: {
    answer: 'A correlated subquery refers to a column of the outer query, so it runs once for each outer row, for example comparing each product to the average price of its own category.',
    points: [
      'The link is a condition inside the subquery such as WHERE p2.category = p.category.',
      'N outer rows mean N inner runs, which gets slow on large tables.',
      'Rewrite with a JOIN to pre-aggregated data or a window function when it is slow.',
    ],
    example: {
      label: 'Products priced above their category\'s average',
      lang: 'sql',
      code: `SELECT p.product_name, p.category, p.unit_price
FROM products AS p
WHERE p.unit_price > (
  SELECT AVG(p2.unit_price)
  FROM products AS p2
  WHERE p2.category = p.category
)
LIMIT 5;`,
    },
    check: {
      question: 'What makes a subquery correlated?',
      options: ['It uses an aggregate', 'It references a column from the outer query', 'It appears in the FROM clause', 'It returns more than one row'],
      answer: 1,
      explanation: 'Referencing the outer row ties each run of the subquery to that row, so it runs once per outer row.',
    },
  },

  [`${S}/exists-not-exists`]: {
    answer: 'EXISTS is true when its subquery returns at least one row; NOT EXISTS is true when it returns none. It checks existence only and stops at the first match.',
    points: [
      'Write SELECT 1 inside EXISTS; the selected columns do not matter.',
      'NOT EXISTS handles NULLs correctly, unlike NOT IN.',
      'The subquery must reference the outer row, or it checks the whole table.',
    ],
    example: {
      label: 'Products nobody has ordered',
      lang: 'sql',
      code: `SELECT p.product_id, p.product_name, p.category
FROM products AS p
WHERE NOT EXISTS (
  SELECT 1 FROM order_items AS oi
  WHERE oi.product_id = p.product_id
);`,
    },
    check: {
      question: 'Why prefer NOT EXISTS over NOT IN (SELECT …)?',
      options: ['NOT IN is not valid SQL', 'NOT IN returns no rows if the subquery contains a NULL', 'NOT EXISTS returns more columns', 'NOT IN cannot use a subquery'],
      answer: 1,
      explanation: 'If the list contains a NULL, x NOT IN (…) is never true, so you silently get zero rows. NOT EXISTS has no such trap.',
    },
  },

  [`${S}/union-intersect-except`]: {
    answer: 'Set operations stack the results of two queries: UNION combines them without duplicates, UNION ALL keeps duplicates, INTERSECT keeps rows in both, and EXCEPT keeps rows in the first but not the second.',
    points: [
      'Both queries need the same number of columns, with compatible types.',
      'UNION ALL is faster; use UNION only when you need duplicates removed.',
      'ORDER BY goes once, at the end, and sorts the combined result.',
    ],
    example: {
      label: 'Cities that have customers and also have a store',
      lang: 'sql',
      code: `SELECT city FROM customers
INTERSECT
SELECT city FROM stores
ORDER BY city;`,
    },
    check: {
      question: 'Which keeps duplicate rows?',
      options: ['UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT'],
      answer: 1,
      explanation: 'UNION ALL appends the results as they are. UNION, INTERSECT and EXCEPT remove duplicates.',
    },
  },

  [`${S}/derived-tables`]: {
    answer: 'A derived table is a subquery in FROM that the outer query treats as a table. It lets you aggregate first and then join or filter the aggregated result.',
    points: [
      'Every derived table needs an alias.',
      'Pre-aggregating the many side before a join prevents inflated totals.',
      'To filter on a window function, compute it in a derived table and filter outside.',
    ],
    example: {
      label: 'Per-store revenue computed first, then joined to store names',
      lang: 'sql',
      code: `SELECT s.store_name, t.orders, t.revenue
FROM stores AS s
JOIN (
  SELECT store_id, COUNT(*) AS orders, ROUND(SUM(total_amount), 2) AS revenue
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY store_id
) AS t ON t.store_id = s.store_id
ORDER BY t.revenue DESC
LIMIT 5;`,
    },
    check: {
      question: 'What is required for every derived table?',
      options: ['An ORDER BY', 'An alias', 'A primary key', 'A GROUP BY'],
      answer: 1,
      explanation: 'The outer query has to refer to the derived table by name, so it must have an alias.',
    },
  },

  [`${S}/string-functions`]: {
    answer: 'String functions transform text in a query: || or CONCAT joins strings, UPPER and LOWER change case, LENGTH measures, TRIM removes spaces, SUBSTR extracts part of a string, REPLACE substitutes.',
    points: [
      'Normalise before comparing: LOWER(TRIM(email)).',
      'NULL || text is NULL; wrap nullable columns in COALESCE.',
      'Functions never change stored data, only the query result.',
    ],
    example: {
      label: 'Format names and initials',
      lang: 'sql',
      code: `SELECT first_name || ' ' || last_name AS full_name,
       UPPER(SUBSTR(first_name, 1, 1)) || '.' AS initial,
       LENGTH(email) AS email_length
FROM customers
LIMIT 4;`,
    },
    check: {
      question: "What does 'Hello ' || NULL return?",
      options: ["'Hello '", "'Hello NULL'", 'NULL', 'An error'],
      answer: 2,
      explanation: 'Concatenating NULL gives NULL. Use COALESCE(col, \'\') to treat a missing value as empty text.',
    },
  },

  [`${S}/date-time-functions`]: {
    answer: 'Date functions extract parts of a date, add or subtract time, and group by periods. PostgreSQL uses EXTRACT, DATE_TRUNC and INTERVAL; SQLite, used in the playground, uses strftime, date() and julianday().',
    points: [
      'Group time series by a truncated date (month start), not by month number alone.',
      'Subtracting dates gives days in PostgreSQL; in SQLite use julianday(a) - julianday(b).',
      'Store and compare dates as YYYY-MM-DD so they sort correctly.',
    ],
    example: {
      label: 'Orders per month (SQLite strftime)',
      lang: 'sql',
      code: `SELECT strftime('%Y-%m', order_date) AS month,
       COUNT(*) AS orders
FROM orders
GROUP BY month
ORDER BY month;`,
    },
    check: {
      question: 'Why is grouping by EXTRACT(MONTH FROM order_date) risky for multi-year data?',
      options: ['EXTRACT is slow', 'January of different years falls into one group', 'It returns text', 'It ignores NULL dates'],
      answer: 1,
      explanation: 'The month number drops the year, so 2023 and 2024 data mix. Truncate to the month start instead.',
    },
  },

  [`${S}/math-functions`]: {
    answer: 'Math functions do numeric work in a query: ROUND to a number of decimals, CEIL and FLOOR to whole numbers, ABS for magnitude, the % operator (MOD) for remainders, plus POWER, SQRT and LOG.',
    points: [
      'Always give ROUND the decimal places for money: ROUND(x, 2).',
      'Divide with NULLIF(denominator, 0) to avoid division-by-zero errors.',
      'Integer division truncates; multiply by 1.0 to get decimals.',
    ],
    example: {
      label: 'Rounding prices different ways',
      lang: 'sql',
      code: `SELECT unit_price,
       ROUND(unit_price) AS rounded,
       CEIL(unit_price) AS ceiling,
       FLOOR(unit_price) AS floor
FROM products
LIMIT 4;`,
    },
    check: {
      question: 'What does NULLIF(x, 0) return when x is 0?',
      options: ['0', '1', 'NULL', 'x'],
      answer: 2,
      explanation: 'NULLIF returns NULL when its two arguments are equal. Dividing by NULL gives NULL instead of an error.',
    },
  },

  [`${S}/cast-convert`]: {
    answer: 'CAST(value AS type) converts a value to another data type, such as text to an integer or a number to text. PostgreSQL also accepts value::type; MySQL and SQL Server have CONVERT.',
    points: [
      'CAST is standard SQL and works everywhere; :: is PostgreSQL and DuckDB only.',
      'Casting a decimal to an integer truncates; ROUND first if you want rounding.',
      'Text-to-number casts fail on bad input; validate imported data first.',
    ],
    example: {
      label: 'Casts and the types SQLite stores',
      lang: 'sql',
      code: `SELECT CAST('42' AS INTEGER) + 1 AS from_text,
       CAST(3.99 AS INTEGER) AS truncated,
       typeof(CAST(42 AS TEXT)) AS stored_as;`,
    },
    check: {
      question: 'What does CAST(3.99 AS INTEGER) return?',
      options: ['4', '3', '3.99', 'An error'],
      answer: 1,
      explanation: 'Casting to an integer drops the fraction rather than rounding it. Use ROUND(3.99) first to get 4.',
    },
  },

  [`${S}/views`]: {
    answer: 'A view is a saved query with a name. Querying it runs the underlying query, so it always shows current data. A materialized view stores the result and must be refreshed.',
    points: [
      'Views hide complex joins behind one name that reports can reuse.',
      'Granting access to a view, not its tables, can hide columns or rows.',
      'CREATE OR REPLACE VIEW updates a view without losing its permissions.',
    ],
    example: {
      label: 'Create a view, then query it like a table',
      lang: 'sql',
      code: `CREATE VIEW delivered_orders AS
SELECT order_id, customer_id, total_amount
FROM orders
WHERE order_status = 'Delivered';

SELECT COUNT(*) AS delivered, ROUND(SUM(total_amount), 2) AS revenue
FROM delivered_orders;`,
    },
    check: {
      question: 'Does a regular view store a copy of the data?',
      options: ['Yes, refreshed nightly', 'No, it runs its query each time it is used', 'Yes, but only the first 1,000 rows', 'Only if it has an index'],
      answer: 1,
      explanation: 'A regular view stores only the query. A materialized view is the kind that stores results.',
    },
  },

  [`${S}/indexes`]: {
    answer: 'An index is a separate structure, usually a B-tree, that lets the database find rows by a column\'s value without scanning the whole table. Queries are written the same way; the database decides to use the index.',
    points: [
      'B-tree indexes help =, <, >, BETWEEN, LIKE \'prefix%\' and ORDER BY.',
      'A function on the column, such as LOWER(email), needs a matching functional index.',
      'Every index speeds reads but slows writes, so add them for real queries.',
    ],
    example: {
      label: 'Create an index and see the plan use it',
      lang: 'sql',
      code: `CREATE INDEX idx_orders_date ON orders(order_date);

EXPLAIN QUERY PLAN
SELECT order_id FROM orders
WHERE order_date >= '2024-03-01';`,
    },
    check: {
      question: 'Which filter can a normal B-tree index on product_name speed up?',
      options: ["LIKE '%milk'", "LIKE 'Organic%'", "LOWER(product_name) = 'milk'", "LIKE '%milk%'"],
      answer: 1,
      explanation: 'A B-tree is sorted by the value from its start, so it can find a known prefix. Leading wildcards and functions on the column defeat it.',
    },
  },

  [`${S}/transactions`]: {
    answer: 'A transaction groups statements into one unit: BEGIN starts it, COMMIT makes every change permanent, and ROLLBACK undoes all of them. Other sessions never see a half-finished transaction.',
    points: [
      'Use one for any change that spans several statements, such as moving money.',
      'SAVEPOINT lets you roll back part of a transaction.',
      'Isolation levels decide what concurrent transactions can see of each other.',
    ],
    example: {
      label: 'Delete inside a transaction, then roll it back',
      lang: 'sql',
      code: `BEGIN;
DELETE FROM order_items WHERE order_id = 1001;
ROLLBACK;

SELECT COUNT(*) AS items_still_there
FROM order_items
WHERE order_id = 1001;`,
    },
    check: {
      question: 'A transfer debits one account, then fails before crediting the other. What should happen?',
      options: ['Keep the debit and retry the credit later', 'ROLLBACK, so neither change is kept', 'COMMIT the debit only', 'Nothing; each statement stands alone'],
      answer: 1,
      explanation: 'Atomicity: the transfer either happens completely or not at all. Rolling back undoes the debit.',
    },
  },

  [`${S}/acid-properties`]: {
    answer: 'ACID names the four guarantees of a reliable database transaction: Atomicity (all or nothing), Consistency (rules always hold), Isolation (concurrent transactions do not interfere) and Durability (committed data survives crashes).',
    points: [
      'Atomicity comes from transactions and rollback.',
      'Consistency comes from constraints such as NOT NULL, UNIQUE and FOREIGN KEY.',
      'Durability comes from the write-ahead log, flushed to disk before COMMIT returns.',
    ],
    example: {
      label: 'Consistency check: no order points to a missing customer',
      lang: 'sql',
      code: `SELECT COUNT(*) AS orders_with_unknown_customer
FROM orders AS o
LEFT JOIN customers AS c ON c.customer_id = o.customer_id
WHERE c.customer_id IS NULL;`,
    },
    check: {
      question: 'A server loses power right after COMMIT returns. Which property means the change is not lost?',
      options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
      answer: 3,
      explanation: 'Durability: once COMMIT returns, the change is on disk (through the write-ahead log) and survives the crash.',
    },
  },

  [`${S}/stored-procedures`]: {
    answer: 'A stored procedure is a named program stored in the database and run with CALL. It takes parameters and can run several statements with variables, conditions, loops and transaction control.',
    points: [
      'Functions return a value and work inside SELECT; procedures perform actions and are CALLed.',
      'Parameters can be IN, OUT or INOUT.',
      'In PostgreSQL only procedures can COMMIT or ROLLBACK inside their body.',
    ],
    example: {
      label: 'The calculation a loyalty procedure would run (SQLite has no procedures)',
      lang: 'sql',
      code: `SELECT c.first_name, c.loyalty_tier,
       ROUND(COALESCE(SUM(o.total_amount), 0), 2) AS spent
FROM customers AS c
LEFT JOIN orders AS o
  ON o.customer_id = c.customer_id AND o.order_status = 'Delivered'
GROUP BY c.customer_id, c.first_name, c.loyalty_tier
ORDER BY spent DESC
LIMIT 5;`,
    },
    check: {
      question: 'How do you run a stored procedure in PostgreSQL?',
      options: ['SELECT procedure_name()', 'CALL procedure_name()', 'EXEC TABLE procedure_name', 'RUN procedure_name'],
      answer: 1,
      explanation: 'Procedures are invoked with CALL. Functions are the ones you call inside SELECT.',
    },
  },

  [`${S}/user-defined-functions`]: {
    answer: 'A user-defined function packages a calculation under a name and returns a value, so you can use it inside SELECT, WHERE and JOIN like a built-in function.',
    points: [
      'Mark functions IMMUTABLE, STABLE or VOLATILE honestly; the planner caches based on it.',
      'STRICT functions return NULL automatically when any argument is NULL.',
      'Simple SQL-language functions can be inlined into the calling query.',
    ],
    example: {
      label: 'The expression a margin function would wrap',
      lang: 'sql',
      code: `SELECT product_name,
       ROUND((unit_price - cost_price) * 100.0 / NULLIF(unit_price, 0), 1) AS margin_pct
FROM products
ORDER BY margin_pct DESC
LIMIT 4;`,
    },
    check: {
      question: 'Which can be used inside a SELECT list?',
      options: ['A stored procedure', 'A user-defined function', 'A trigger', 'A transaction'],
      answer: 1,
      explanation: 'Functions return a value, so they work inline in SELECT. Procedures are run with CALL.',
    },
  },

  [`${S}/triggers`]: {
    answer: 'A trigger runs automatically when a row is inserted, updated or deleted. BEFORE triggers can change or reject the row; AFTER triggers react to the change, for example by writing an audit log.',
    points: [
      'NEW is the row after the change; OLD is the row before.',
      'FOR EACH ROW fires per row; FOR EACH STATEMENT fires once per statement.',
      'Triggers cannot be bypassed by clients, but they hide logic, so use them sparingly.',
    ],
    example: {
      label: 'An audit trigger records every status change',
      lang: 'sql',
      code: `CREATE TABLE status_log (order_id INTEGER, old_status TEXT, new_status TEXT);

CREATE TRIGGER log_status AFTER UPDATE OF order_status ON orders
BEGIN
  INSERT INTO status_log VALUES (OLD.order_id, OLD.order_status, NEW.order_status);
END;

UPDATE orders SET order_status = 'Delivered' WHERE order_id = 1003;
SELECT * FROM status_log;`,
    },
    check: {
      question: 'In a DELETE trigger, which record is available?',
      options: ['NEW only', 'OLD only', 'Both NEW and OLD', 'Neither'],
      answer: 1,
      explanation: 'A deleted row has no "after" state, so only OLD exists. INSERT has only NEW; UPDATE has both.',
    },
  },

  [`${S}/window-functions-intro`]: {
    answer: 'A window function computes a value across related rows without collapsing them. OVER (PARTITION BY …) defines the group, so every row keeps its detail and gains a value such as its group\'s average or a running total.',
    points: [
      'GROUP BY collapses rows; a window function keeps every row.',
      'PARTITION BY splits rows into groups; ORDER BY inside OVER orders them for running values.',
      'You cannot filter on a window function in the same WHERE; wrap it in a subquery or CTE.',
    ],
    example: {
      label: 'Each order next to its store\'s average',
      lang: 'sql',
      code: `SELECT order_id, store_id, total_amount,
       ROUND(AVG(total_amount) OVER (PARTITION BY store_id), 2) AS store_avg
FROM orders
WHERE store_id = 'ST001';`,
    },
    check: {
      question: 'How many rows does SUM(x) OVER (PARTITION BY g) return compared with the input?',
      options: ['One per group', 'The same number of rows', 'One row in total', 'Half as many'],
      answer: 1,
      explanation: 'Window functions add a value to each row and never collapse rows, so the row count is unchanged.',
    },
  },

  [`${S}/ranking-functions`]: {
    answer: 'Ranking functions number rows in order: ROW_NUMBER gives unique numbers, RANK gives ties the same rank and then skips (1, 1, 3), and DENSE_RANK gives ties the same rank without gaps (1, 1, 2).',
    points: [
      'Top N per group: ROW_NUMBER() OVER (PARTITION BY g ORDER BY x DESC), then keep rn <= N.',
      'PERCENT_RANK runs from 0 to 1; NTILE(n) splits rows into n equal buckets.',
      'Add a tiebreaker column to ORDER BY so ROW_NUMBER is stable.',
    ],
    example: {
      label: 'Lowest salaries first: watch the tie at 33000',
      lang: 'sql',
      code: `SELECT first_name, salary,
       ROW_NUMBER() OVER (ORDER BY salary, employee_id) AS row_num,
       RANK()       OVER (ORDER BY salary) AS rnk,
       DENSE_RANK() OVER (ORDER BY salary) AS dense
FROM employees
ORDER BY salary, employee_id
LIMIT 6;`,
    },
    check: {
      question: 'Two rows tie for first place. What rank does the next row get with RANK()?',
      options: ['1', '2', '3', 'NULL'],
      answer: 2,
      explanation: 'RANK skips after ties: 1, 1, then 3. DENSE_RANK would give 2.',
    },
  },

  [`${S}/analytics-lag-lead`]: {
    answer: 'LAG reads a value from an earlier row and LEAD from a later row in the window\'s order, so you can compare each row with its neighbour, such as each order with the customer\'s previous one. FIRST_VALUE and LAST_VALUE read the ends of the window.',
    points: [
      'Both need ORDER BY inside OVER to define before and after.',
      'PARTITION BY customer_id keeps comparisons within one customer.',
      'The first row has no previous row, so LAG returns NULL unless you give a default.',
    ],
    example: {
      label: 'Each order with the same customer\'s previous order date',
      lang: 'sql',
      code: `SELECT customer_id, order_id, order_date,
       LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) AS previous_order
FROM orders
WHERE customer_id IN (1, 2)
ORDER BY customer_id, order_date;`,
    },
    check: {
      question: 'What does LAG(amount) return on the first row of a partition?',
      options: ['0', 'The same row\'s amount', 'NULL', 'The last row\'s amount'],
      answer: 2,
      explanation: 'There is no earlier row, so LAG returns NULL, or the default you pass as its third argument.',
    },
  },

  [`${S}/cte-with-clause`]: {
    answer: 'A CTE (common table expression) names a query result with WITH name AS (…) so the main query can use it like a table. Chained CTEs read top to bottom, one step at a time.',
    points: [
      'A CTE can be referenced several times in the same query.',
      'Each CTE can use the ones defined before it.',
      'Run each CTE on its own while building, to check every step.',
    ],
    example: {
      label: 'Name the per-customer totals, then join them',
      lang: 'sql',
      code: `WITH spend AS (
  SELECT customer_id, ROUND(SUM(total_amount), 2) AS total
  FROM orders
  WHERE order_status = 'Delivered'
  GROUP BY customer_id
)
SELECT c.first_name, s.total
FROM spend AS s
JOIN customers AS c ON c.customer_id = s.customer_id
ORDER BY s.total DESC
LIMIT 5;`,
    },
    check: {
      question: 'What can a CTE do that a derived table in FROM cannot?',
      options: ['Use GROUP BY', 'Be referenced more than once in the same query', 'Return more columns', 'Run faster in every database'],
      answer: 1,
      explanation: 'A CTE is defined once and can be used several times. A derived table has to be written out again each time.',
    },
  },

  [`${S}/recursive-cte`]: {
    answer: 'A recursive CTE refers to itself: an anchor query produces starting rows, and a recursive query joined with UNION ALL keeps adding rows until it produces none. It walks hierarchies such as org charts and generates series.',
    points: [
      'Anchor and recursive parts are joined with UNION ALL.',
      'Each step sees only the rows added by the previous step.',
      'Always include a stop condition, such as WHERE depth < 10.',
    ],
    example: {
      label: 'Walk the management chain down from the top',
      lang: 'sql',
      code: `WITH RECURSIVE chain AS (
  SELECT employee_id, first_name, 1 AS level
  FROM employees WHERE manager_id IS NULL AND store_id = 'ST001'
  UNION ALL
  SELECT e.employee_id, e.first_name, c.level + 1
  FROM employees AS e
  JOIN chain AS c ON e.manager_id = c.employee_id
)
SELECT * FROM chain ORDER BY level;`,
    },
    check: {
      question: 'What stops a recursive CTE?',
      options: ['A LIMIT in the anchor', 'The recursive part returning no new rows', 'Reaching 100 rows', 'An ORDER BY'],
      answer: 1,
      explanation: 'Recursion ends when an iteration adds nothing. A WHERE condition such as depth < N makes sure that happens.',
    },
  },

  [`${S}/explain-analyze`]: {
    answer: 'EXPLAIN shows the plan the database will use to run a query; EXPLAIN ANALYZE (PostgreSQL) also runs it and reports real timings and row counts, so you can see where the time goes.',
    points: [
      'Read plans from the innermost step outward.',
      'Big gaps between estimated and actual rows point to stale statistics: run ANALYZE.',
      'A sequential scan that discards most rows is a candidate for an index.',
    ],
    example: {
      label: 'The plan for a filtered query (SQLite: EXPLAIN QUERY PLAN)',
      lang: 'sql',
      code: `EXPLAIN QUERY PLAN
SELECT o.order_id, c.first_name
FROM orders AS o
JOIN customers AS c ON c.customer_id = o.customer_id
WHERE o.total_amount > 50;`,
    },
    check: {
      question: 'What does EXPLAIN ANALYZE do that EXPLAIN does not?',
      options: ['Rewrites the query', 'Actually runs the query and reports real timings', 'Creates missing indexes', 'Shows the table schema'],
      answer: 1,
      explanation: 'EXPLAIN only predicts. EXPLAIN ANALYZE executes the query, so wrap data-changing statements in BEGIN … ROLLBACK.',
    },
  },

  [`${S}/index-strategies`]: {
    answer: 'Index strategy is choosing which indexes to build for the queries you actually run: the column order of composite indexes, covering indexes for index-only reads, and partial indexes for hot subsets, weighed against slower writes.',
    points: [
      'An index on (a, b) helps queries filtering on a, or a and b, but not b alone.',
      'Put equality columns before range columns in a composite index.',
      'Partial indexes (WHERE status = \'open\') stay small and fast.',
    ],
    example: {
      label: 'A composite index serving an equality and a range filter',
      lang: 'sql',
      code: `CREATE INDEX idx_store_date ON orders(store_id, order_date);

EXPLAIN QUERY PLAN
SELECT order_id FROM orders
WHERE store_id = 'ST001' AND order_date >= '2024-02-01';`,
    },
    check: {
      question: 'An index exists on (store_id, order_date). Which filter can it NOT use well?',
      options: ["store_id = 'ST001'", "store_id = 'ST001' AND order_date > '2024-01-01'", "order_date > '2024-01-01' alone", "store_id IN ('ST001', 'ST002')"],
      answer: 2,
      explanation: 'The leftmost column must be constrained. Filtering on order_date alone skips store_id, so the index cannot be entered.',
    },
  },

  [`${S}/query-best-practices`]: {
    answer: 'Good SQL names its columns, filters in ways indexes can use, handles NULLs explicitly, and is formatted so the next person can read it.',
    points: [
      'Avoid SELECT * in production code; list the columns.',
      'Keep functions off indexed columns: write col >= \'2024-01-01\', not YEAR(col) = 2024.',
      'Use EXISTS for existence checks instead of COUNT(*) > 0.',
    ],
    example: {
      label: 'An index-friendly date range instead of a function on the column',
      lang: 'sql',
      code: `SELECT order_id, order_date, total_amount
FROM orders
WHERE order_date >= '2024-03-01'
  AND order_date <  '2024-04-01'
ORDER BY order_date
LIMIT 5;`,
    },
    check: {
      question: 'Which filter lets an index on order_date be used?',
      options: ["strftime('%Y', order_date) = '2024'", "order_date >= '2024-01-01' AND order_date < '2025-01-01'", "order_date || '' = '2024-01-05'", "substr(order_date, 1, 4) = '2024'"],
      answer: 1,
      explanation: 'Comparing the bare column to constants keeps the filter "sargable". Wrapping the column in a function hides it from the index.',
    },
  },

  [`${S}/sql-for-data-analysis`]: {
    answer: 'SQL for analysis means answering business questions with aggregates, joins and window functions: revenue trends, top products, customer segments and cohorts.',
    points: [
      'Show each part\'s share of the total next to its absolute value.',
      'RFM scores customers on recency, frequency and monetary value.',
      'Cohorts group customers by first-order month and track who comes back.',
    ],
    example: {
      label: 'Revenue and share by category',
      lang: 'sql',
      code: `SELECT p.category,
       ROUND(SUM(oi.line_total), 2) AS revenue,
       ROUND(100.0 * SUM(oi.line_total) / SUM(SUM(oi.line_total)) OVER (), 1) AS share_pct
FROM order_items AS oi
JOIN products AS p ON p.product_id = oi.product_id
GROUP BY p.category
ORDER BY revenue DESC
LIMIT 5;`,
    },
    check: {
      question: 'What does the F in RFM stand for?',
      options: ['Fulfilment', 'Frequency', 'Forecast', 'Funnel'],
      answer: 1,
      explanation: 'RFM is Recency (how recently), Frequency (how often) and Monetary (how much) a customer buys.',
    },
  },

  [`${S}/interview-questions`]: {
    answer: 'SQL interviews test a small set of ideas again and again: WHERE versus HAVING, the join types, NULL behaviour, ranking functions, finding duplicates and top N per group, and why a query is slow.',
    points: [
      'WHERE filters rows before grouping; HAVING filters groups after.',
      'ROW_NUMBER, RANK and DENSE_RANK differ only in how they treat ties.',
      'NOT IN with a NULL in the list returns nothing; use NOT EXISTS.',
    ],
    example: {
      label: 'A classic: the second-highest salary',
      lang: 'sql',
      code: `SELECT MAX(salary) AS second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);`,
    },
    check: {
      question: 'Which finds duplicate emails in a users table?',
      options: ['SELECT DISTINCT email FROM users', 'SELECT email FROM users GROUP BY email HAVING COUNT(*) > 1', 'SELECT email FROM users WHERE COUNT(*) > 1', 'SELECT UNIQUE email FROM users'],
      answer: 1,
      explanation: 'Group by the email and keep groups with more than one row. WHERE cannot contain an aggregate.',
    },
  },

  [`${S}/sql-projects`]: {
    answer: 'The three projects apply the course to realistic work: a revenue report with anomaly flags, a customer lifecycle analysis that defines churn from the data, and a schema design built from business requirements.',
    points: [
      'Start every analysis with baseline numbers you can check against simpler queries.',
      'Define churn from customers\' real purchase gaps, not a fixed number of days.',
      'Score customers relative to each other (quintiles) rather than with fixed thresholds.',
    ],
    example: {
      label: 'Baseline numbers for the revenue project',
      lang: 'sql',
      code: `SELECT COUNT(*) AS delivered_orders,
       COUNT(DISTINCT customer_id) AS customers,
       ROUND(SUM(total_amount), 2) AS revenue,
       ROUND(SUM(total_amount) / COUNT(DISTINCT customer_id), 2) AS revenue_per_customer
FROM orders
WHERE order_status = 'Delivered';`,
    },
    check: {
      question: 'Why compute baseline totals before a complex analysis?',
      options: ['Baselines are required by SQL', 'They give simple numbers to check the complex query against', 'They make the query faster', 'They create indexes'],
      answer: 1,
      explanation: 'Join and fan-out bugs produce plausible but wrong numbers. A simple baseline catches them.',
    },
  },
}
